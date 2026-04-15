import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';

import productService from '../../../shared/services/productService';
import categoryService from '../../../shared/services/categoryService';
import orderService from '../../../shared/services/orderService';
import userService from '../../../shared/services/userService';

const DashboardPage = ({ onNavigate, user, onLogout }) => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [products, categories, orders, users] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories(),
          orderService.getAllOrders(),
          userService.getAllUsers()
        ]);

        const totalRevenue = orders.reduce((sum, order) => {
           if(order.status === 'done') return sum + parseFloat(order.total_price || 0);
           return sum;
        }, 0);

        setStats({
          products: products.length,
          categories: categories.length,
          orders: orders.length,
          customers: users.length,
          revenue: totalRevenue
        });

        // Lấy 5 đơn mới nhất
        setRecentOrders(orders.slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const dashboardData = {
    products: stats.products,
    orders: stats.orders,
    customers: stats.customers,
    revenue: formatPrice(stats.revenue)
  };

  return (
    <AdminLayout activePage="admin_dashboard" onNavigate={onNavigate} title="Tổng quan" subTitle="Chào mừng bạn quay lại trang quản trị">
      
      {/* ── Thống kê tổng quát ── */}
      <DashboardStats data={dashboardData} />

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
        
        {/* BẢNG ĐƠN HÀNG MỚI NHẤT */}
        <div className="data-table" style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div className="data-table__head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Đơn hàng mới nhất</span>
            <button 
              className="bk-btn" 
              style={{ background: '#fdf2f4', color: '#C95E85', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
              onClick={() => onNavigate('admin_orders')}
            >
              Xem tất cả
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px 10px' }}>Mã đơn</th>
                  <th style={{ padding: '12px 10px' }}>Khách hàng</th>
                  <th style={{ padding: '12px 10px' }}>Tổng tiền</th>
                  <th style={{ padding: '12px 10px' }}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={{ padding: '12px 10px' }}>#BB{order.id}</td>
                    <td style={{ padding: '12px 10px' }}>{order.customer_name}</td>
                    <td style={{ padding: '12px 10px' }}>{formatPrice(order.total_price)}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={`status-badge s-${order.status}`} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Chưa có đơn hàng nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* HOẠT ĐỘNG GẦN ĐÂY */}
        <div className="recent-activity-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div className="data-table__head" style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Hoạt động gần đây</span>
          </div>
          <RecentActivity />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
