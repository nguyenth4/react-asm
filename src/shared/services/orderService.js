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
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating order status for id ${id}:`, error);
      throw error;
    }
  },

  getMyOrders: async (userId) => {
    try {
      const response = await axiosInstance.get(`/orders/my/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
      throw error;
    }
  }
};

export default orderService;
