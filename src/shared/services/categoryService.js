import axiosInstance from '../utils/axiosInstance';

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories/list');
      return response.data.data; // { status: 200, data: [...] }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post('/categories/add', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category with id ${id}:`, error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error);
      throw error;
    }
  }
};

export default categoryService;
