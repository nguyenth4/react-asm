import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import OrderStrip from './components/OrderStrip';
import OrderTable from './components/OrderTable';
import OrderDetailModal from './components/OrderDetailModal';
import { useOrderManagement } from './hooks/useOrderManagement';

const OrderManagementPage = ({ onNavigate }) => {
  const {
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
  } = useOrderManagement();

  return (
    <AdminLayout 
      activePage="admin_orders" 
      onNavigate={onNavigate} 
      title="Quản lý đơn hàng"
      subTitle={`Hiển thị ${filteredOrders.length} đơn hàng`}
    >
      {/* DẢI TRẠNG THÁI (UI) */}
      <OrderStrip 
        orders={orders} 
        filterStatus={filterStatus} 
        onFilterChange={setFilterStatus} 
      />

      {/* BẢNG ĐƠN HÀNG (UI) */}
      <OrderTable 
        orders={filteredOrders} 
        onSelectOrder={openOrderDetail}
        getStatusLabel={getStatusLabel}
        getStatusClass={getStatusClass}
      />

      {/* CHI TIẾT ĐƠN HÀNG (UI) */}
      <OrderDetailModal 
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={closeOrderDetail}
        onUpdateStatus={updateOrderStatus}
        getStatusLabel={getStatusLabel}
        getStatusClass={getStatusClass}
      />
    </AdminLayout>
  );
};

export default OrderManagementPage;
