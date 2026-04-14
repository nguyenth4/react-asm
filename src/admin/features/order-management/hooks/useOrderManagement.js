import { useState } from 'react';

const INITIAL_ORDERS = [
  { id: 'BB2601', customerName: 'Kiều Biên', phone: '0912345678', items: ['MAC Lipstick Ruby Woo ×2'], total: 894000, payment: 'MoMo', status: 'done', createdAt: '2026-03-18T09:14:00Z', address: '123 Nguyễn Huệ, Quận 1, TP. HCM' },
  { id: 'BB2600', customerName: 'Trần Minh Thư', phone: '0987654321', items: ['Rouge Dior Satin 999 ×1'], total: 1250000, payment: 'VISA', status: 'shipping', createdAt: '2026-03-18T08:30:00Z', address: '456 Lê Lợi, Quận 1, TP. HCM' },
  { id: 'BB2599', customerName: 'Phạm Hồng Nhung', phone: '0901234567', items: ['NARS Velvet Matte Pencil ×3'], total: 2160000, payment: 'ZaloPay', status: 'pending', createdAt: '2026-03-17T21:05:00Z', address: '789 Điện Biên Phủ, Bình Thạnh' },
  { id: 'BB2598', customerName: 'Võ Thị Thu', phone: '0934567890', items: ['YSL Rouge Pur Couture ×1'], total: 980000, payment: 'COD', status: 'done', createdAt: '2026-03-17T15:42:00Z', address: '321 Nguyễn Thị Minh Khai, Quận 3' },
  { id: 'BB2597', customerName: 'Ngô Thị Tuyết', phone: '0978901234', items: ['Chanel Rouge Allure Velvet ×1'], total: 1480000, payment: 'MoMo', status: 'cancelled', createdAt: '2026-03-17T11:18:00Z', address: '654 Cách Mạng Tháng Tám, Quận 10' },
];

export const useOrderManagement = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = filterStatus ? orders.filter(o => o.status === filterStatus) : orders;

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    alert('Đã cập nhật trạng thái!');
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
