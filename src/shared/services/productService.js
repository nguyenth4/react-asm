import axiosInstance from '../utils/axiosInstance';

const productCache = new Map();
const listCache = new Map(); // Cache cho kết quả getAllProducts

/**
 * Ánh xạ dữ liệu từ backend (MySQL) sang định dạng frontend (UI)
 */
const transformProduct = (p) => {
  if (!p) return p;
  
  // Xác định giá hiển thị và giá cũ
  // Backend: price = giá gốc, price_sale = giá khuyến mãi (nếu có)
  const price = p.price_sale && parseFloat(p.price_sale) > 0 
    ? parseFloat(p.price_sale) 
    : parseFloat(p.price);
    
  const oldPrice = p.price_sale && parseFloat(p.price_sale) > 0 
    ? parseFloat(p.price) 
    : null;

  return {
    ...p,
    price,
    oldPrice,
    isNew: p.badge === 'new',
    isSale: (p.badge === 'sale') || (p.price_sale && parseFloat(p.price_sale) > 0),
    category: p.Category ? p.Category.name : p.category,
    // Đảm bảo có mảng hình ảnh cho chi tiết sản phẩm
    images: p.image ? [p.image] : (p.images || ['https://via.placeholder.com/800']),
    // Đồng bộ số lượng đánh giá
    reviews: p.review_count || 0,
    rating: p.rating || 5.0,
    ingredients: p.ingredients || 'Thông tin thành phần đang được cập nhật...'
  };
};

const productService = {
  getAllProducts: async (params = {}, forceRefresh = false) => {
    const cacheKey = JSON.stringify(params);
    
    if (!forceRefresh && listCache.has(cacheKey)) {
      return listCache.get(cacheKey);
    }

    try {
      const response = await axiosInstance.get('/products/list', { params });
      let products = response.data.data;
      
      if (Array.isArray(products)) {
        products = products.map(transformProduct);
        // Đồng bộ vào cache cá nhân
        products.forEach(p => productCache.set(p.id, p));
      }
      
      // Lưu vào cache danh sách
      listCache.set(cacheKey, products);
      
      return products;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },

  getProductById: async (id, forceRefresh = false) => {
    // Nếu có trong cache và không ép buộc tải lại
    if (!forceRefresh && productCache.has(id)) {
      return productCache.get(id);
    }

    try {
      const response = await axiosInstance.get(`/products/${id}`);
      const product = transformProduct(response.data.data);
      
      // Lưu vào cache
      productCache.set(id, product);
      
      return product;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/products/add', productData);
      listCache.clear(); // Clear cache to force refresh
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData);
      productCache.delete(id); // Clear specific product cache
      listCache.clear();      // Clear list cache
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      productCache.delete(id);
      listCache.clear();
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
};

export default productService;
