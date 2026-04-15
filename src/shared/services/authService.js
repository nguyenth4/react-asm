import axiosInstance from '../utils/axiosInstance';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Lưu thông tin user (giả định nội dung payload token được trả về hoặc fetch profile sau)
        // BE trả về { message: "...", token: "..." }
        // Ta có thể lưu thêm thông tin từ việc decode token nếu cần
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bb_user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('bb_user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
