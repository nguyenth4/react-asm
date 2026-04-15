import axiosInstance from '../utils/axiosInstance';

const productService = {
  getAllProducts: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/products/list', { params });
      return response.data.data; // Trả về mảng products từ { status: 200, data: [...] }
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data.data; // Trả về thông tin product từ { status: 200, data: {...} }
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
