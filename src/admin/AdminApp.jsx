import React from 'react';
import AdminLayout from '../shared/components/common/AdminLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import CategoryPage from './features/category-management/CategoryPage';
import ProductManagementPage from './features/product-management/ProductManagementPage';
import OrderManagementPage from './features/order-management/OrderManagementPage';
import CustomerManagementPage from './features/user-management/CustomerManagementPage';

const AdminApp = ({ currentPage, onNavigate }) => {
  const renderAdminPage = () => {
    switch (currentPage) {
      case 'admin_dashboard':
        return <DashboardPage onNavigate={onNavigate} />;
      case 'admin_categories':
        return <CategoryPage onNavigate={onNavigate} />;
      case 'admin_products':
        return <ProductManagementPage onNavigate={onNavigate} />;
      case 'admin_orders':
        return <OrderManagementPage onNavigate={onNavigate} />;
      case 'admin_customers':
        return <CustomerManagementPage onNavigate={onNavigate} />;
      default:
        return <DashboardPage onNavigate={onNavigate} />;
    }
  };

  return (
    <>
      {renderAdminPage()}
    </>
  );
};

export default AdminApp;
