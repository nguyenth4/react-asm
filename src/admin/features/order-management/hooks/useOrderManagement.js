import { useState, useEffect } from 'react';
import orderService from '../../../../shared/services/orderService';

export const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      
      // Map data to match UI expectations
      const mappedData = data.map(o => ({
        ...o,
        customerName: o.customer_name || 'Khách vãng lai',
        address: o.shipping_address,
        payment: o.payment_method,
        createdAt: o.created_at,
        total: o.total_price,
        // Chuyển danh sách món hàng thành dạng chuỗi để UI hiển thị dễ dàng hơn
        items: (o.OrderItems || []).map(item => `${item.Product?.name || 'Sản phẩm'} ×${item.quantity}`)
      }));

      setOrders(mappedData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filterStatus ? orders.filter(o => o.status === filterStatus) : orders;

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Gọi API cập nhật status thực tế nếu có
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      // Cập nhật luôn selectedOrder để Modal thay đổi thông tin ngay lập tức
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      alert('Đã cập nhật trạng thái!');
    } catch (error) {
      alert('Lỗi khi cập nhật trạng thái: ' + (error.response?.data?.message || error.message));
    }
  };

  const openOrderDetail = (order) => setSelectedOrder(order);
  const closeOrderDetail = () => setSelectedOrder(null);

  const getStatusLabel = (s) => {
    switch (s) {
      case 'done': return 'Hoàn thành';
      case 'shipping': return 'Đang giao';
      case 'pending': return 'Chờ xử lý';
      case 'cancelled': return 'Đã hủy';
      default: return 'Mới';
    }
  };

  const getStatusClass = (s) => {
    switch (s) {
      case 'done': return 's-done';
      case 'shipping': return 's-shipping';
      case 'pending': return 's-pending';
      case 'cancelled': return 's-cancelled';
      default: return '';
    }
  };

  return {
    orders,
    loading,
    filteredOrders,
    filterStatus,
    setFilterStatus,
    selectedOrder,
    openOrderDetail,
    closeOrderDetail,
    updateOrderStatus,
    getStatusLabel,
    getStatusClass
  };
};
