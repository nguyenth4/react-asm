import React from 'react';
import AdminLayout from '../shared/components/common/AdminLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import CategoryPage from './features/category-management/CategoryPage';
import ProductManagementPage from './features/product-management/ProductManagementPage';
import OrderManagementPage from './features/order-management/OrderManagementPage';
import CustomerManagementPage from './features/user-management/CustomerManagementPage';

const AdminApp = ({ currentPage, onNavigate, user, onLogout }) => {
  const renderAdminPage = () => {
    switch (currentPage) {
      case 'admin_dashboard':
        return <DashboardPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
      case 'admin_categories':
        return <CategoryPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
      case 'admin_products':
        return <ProductManagementPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
      case 'admin_orders':
        return <OrderManagementPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
      case 'admin_customers':
        return <CustomerManagementPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
      default:
        return <DashboardPage onNavigate={onNavigate} user={user} onLogout={onLogout} />;
    }
  };

  return (
    <>
      {renderAdminPage()}
    </>
  );
};

export default AdminApp;
