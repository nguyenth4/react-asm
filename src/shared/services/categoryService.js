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

  getCategoryBySlug: async (slug) => {
    try {
      const response = await axiosInstance.get(`/categories/slug/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw error;
    }
  }
};

export default categoryService;
