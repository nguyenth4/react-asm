import axiosInstance from '../utils/axiosInstance';

const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/orders/checkout', orderData);
      return response.data;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders/list');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
  }
};

export default orderService;
