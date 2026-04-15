import axiosInstance from '../utils/axiosInstance';

const userService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users/list');
      return response.data.data; // BE returns { status: 200, data: [...] }
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  updateUserRole: async (id, role) => {
    try {
      const response = await axiosInstance.put(`/users/update-role/${id}`, { role });
      return response.data;
    } catch (error) {
      console.error(`Error updating role for user ${id}:`, error);
      throw error;
    }
  },

  updateUserStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/users/update-status/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for user ${id}:`, error);
      throw error;
    }
  }
};

export default userService;
