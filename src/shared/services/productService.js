import axiosInstance from '../utils/axiosInstance';

const productCache = new Map();
const listCache = new Map(); // Cache cho kết quả getAllProducts

const productService = {
  getAllProducts: async (params = {}, forceRefresh = false) => {
    const cacheKey = JSON.stringify(params);
    
    if (!forceRefresh && listCache.has(cacheKey)) {
      return listCache.get(cacheKey);
    }

    try {
      const response = await axiosInstance.get('/products/list', { params });
      const products = response.data.data;
      
      // Đồng bộ vào cache cá nhân
      if (Array.isArray(products)) {
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
      const product = response.data.data;
      
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
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
};

export default productService;
