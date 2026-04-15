import React from 'react';

const DashboardStats = ({ data }) => {
  const stats = [
    { label: 'Doanh thu (Done)', val: data?.revenue || '0đ', icon: 'bi-cash-stack', color: '#059669', bg: '#ecfdf5', trend: '+12.5% từ tháng trước' },
    { label: 'Tổng đơn hàng', val: data?.orders || '0', icon: 'bi-cart-check', color: '#2563eb', bg: '#eff6ff', trend: '+5.2% từ tuần trước' },
    { label: 'Khách hàng', val: data?.customers || '0', icon: 'bi-people', color: '#d946ef', bg: '#fdf4ff', trend: '+18 thành viên mới' },
    { label: 'Sản phẩm', val: data?.products || '0', icon: 'bi-box-seam', color: '#f59e0b', bg: '#fffbeb', trend: 'Trong kho' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((s, idx) => (
        <div className="stat-card" key={idx}>
          <div className="stat-card__icon" style={{ backgroundColor: s.bg }}>
            <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__label">{s.label}</div>
            <div className="stat-card__val">{s.val}</div>
            <div className="stat-card__trend">{s.trend}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
