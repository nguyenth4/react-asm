import React from 'react';

const AdminTopbar = ({ title, subTitle, user }) => {
  const getTodayString = () => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const d = new Date();
    const dayName = days[d.getDay()];
    const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${dayName}, ${dateStr}`;
  };

  const displayName = user ? `${user.first_name} ${user.last_name}` : 'Kiều Biên';
  const displayInitials = user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : 'KB';

  return (
    <div className="admin-topbar">
      <div>
        <div className="admin-topbar__title">{title || 'Dashboard'}</div>
        <div className="admin-topbar__sub">
          {subTitle || `Xin chào, ${displayName} · ${getTodayString()}`}
        </div>
      </div>
      <div className="admin-topbar__right">
        <div className="admin-topbar__search">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
        <button className="admin-topbar__ic"><i className="bi bi-bell"></i></button>
        <button className="admin-topbar__ic"><i className="bi bi-envelope"></i></button>
        <div className="admin-topbar__user-av">{displayInitials}</div>
      </div>
    </div>
  );
};

export default AdminTopbar;
