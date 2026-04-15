import React from 'react';

const AdminSidebar = ({ activePage, onNavigate, onLogout, user }) => {
  const items = [
    { label: 'Dashboard', icon: <i className="bi bi-speedometer2"></i>, key: 'admin_dashboard' },
    { label: 'Đơn hàng', icon: <i className="bi bi-cart3"></i>, key: 'admin_orders', badge: '5' },
    { label: 'Sản phẩm', icon: <i className="bi bi-box-seam"></i>, key: 'admin_products' },
    { label: 'Danh mục', icon: <i className="bi bi-collection"></i>, key: 'admin_categories' },
    { label: 'Thương hiệu', icon: <i className="bi bi-tags"></i>, key: 'admin_brands' },
    { label: 'Khách hàng', icon: <i className="bi bi-people"></i>, key: 'admin_customers' },
    { label: 'Cài đặt', icon: <i className="bi bi-gear"></i>, key: 'admin_settings' },
  ];

  const renderNav = (navItems) => {
    return navItems.map(i => (
      <a
        key={i.key}
        className={`admin-sidebar__item ${activePage === i.key ? 'active' : ''}`}
        onClick={() => onNavigate(i.key)}
      >
        <span className="admin-sidebar__ico">{i.icon}</span>
        {i.label}
        {i.badge && <span className="admin-sidebar__badge">{i.badge}</span>}
      </a>
    ));
  };

  const displayName = user ? `${user.first_name} ${user.last_name}` : 'Kiều Biên';
  const displayInitials = user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : 'KB';

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__top">
        <div className="admin-sidebar__brand">Blush<span>&amp;</span>Bloom</div>
        <div className="admin-sidebar__sub">Admin Dashboard</div>
      </div>
      <div className="admin-sidebar__profile">
        <div className="admin-sidebar__avatar">{displayInitials}</div>
        <div>
          <div className="admin-sidebar__name">{displayName}</div>
          <div className="admin-sidebar__role">{user ? user.role : 'Super Admin'}</div>
        </div>
        <div className="online-dot"></div>
      </div>
      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__section">Tổng quan</div>
        {renderNav(items.slice(0, 2))}
        <div className="admin-sidebar__section">Quản lý</div>
        {renderNav(items.slice(2, 6))}
        <div className="admin-sidebar__section">Hệ thống</div>
        {renderNav(items.slice(6))}
      </nav>
      <div className="admin-sidebar__foot" onClick={onLogout} style={{ cursor: 'pointer' }}>
        <i className="bi bi-box-arrow-left" style={{ marginRight: '8px' }}></i> Đăng xuất
      </div>
    </aside>
  );
};

export default AdminSidebar;
