import React from 'react';

const RecentActivity = () => {
  const activities = [
    { type: 'order', user: 'Kiều Biên', action: 'đặt đơn hàng mới #BB2601', time: '5 phút trước', icon: 'bi-bag-plus', color: '#blue' },
    { type: 'user', user: 'Trần Minh Thư', action: 'đã đăng ký thành viên', time: '12 phút trước', icon: 'bi-person-plus', color: '#pink' },
    { type: 'product', user: 'Hệ thống', action: 'MAC Ruby Woo đã hết hàng', time: '45 phút trước', icon: 'bi-exclamation-triangle', color: '#orange' },
    { type: 'order', user: 'Phạm Hồng Nhung', action: 'đã thanh toán đơn hàng #BB2599', time: '1 giờ trước', icon: 'bi-check2-circle', color: '#green' }
  ];

  return (
    <div className="activity-list">
      {activities.map((act, idx) => (
        <div className="activity-item" key={idx}>
          <div className="activity-item__icon"><i className={`bi ${act.icon}`}></i></div>
          <div className="activity-item__content">
            <div className="activity-item__text"><strong>{act.user}</strong> {act.action}</div>
            <div className="activity-item__time">{act.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
