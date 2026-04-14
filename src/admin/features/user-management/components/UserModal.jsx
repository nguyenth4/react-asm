import React from 'react';
import { formatPrice, formatDate } from '../../../../shared/utils/format';

const UserModal = ({ customer, isOpen, onClose }) => {
  if (!isOpen || !customer) return null;

  const tierLabels = { gold: '★ Vàng', silver: '◆ Bạc', bronze: '▲ Đồng' };
  const tierClass = { gold: 'tier-gold', silver: 'tier-silver', bronze: 'tier-bronze' };

  return (
    <div className={`modal-overlay show`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mhead">
          <div className="mtitle">Hồ sơ khách hàng</div>
          <div className="mclose" onClick={onClose}>×</div>
        </div>
        <div className="mbody">
          <div className="cust-det-head">
            <div className="cust-det-av" style={{ background: customer.color }}>{customer.avatar}</div>
            <div className="cust-det-info">
              <h3>{customer.name}</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={`tier-badge ${tierClass[customer.tier]}`}>{tierLabels[customer.tier]}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-soft)' }}>Gia nhập từ {formatDate(customer.joined)}</span>
              </div>
            </div>
          </div>

          <div className="det-grid">
            <div className="det-box">
              <div className="det-box__title">Liên lạc</div>
              <div className="det-item"><span className="det-lbl">Email</span><span className="det-val">{customer.email}</span></div>
              <div className="det-item"><span className="det-lbl">Số điện thoại</span><span className="det-val">{customer.phone}</span></div>
            </div>
            <div className="det-box">
              <div className="det-box__title">Thống kê mua sắm</div>
              <div className="det-item">
                <span className="det-lbl">Tổng số đơn</span>
                <span className="det-val" style={{ color: 'var(--blue)' }}>{customer.orders} đơn</span>
              </div>
              <div className="det-item">
                <span className="det-lbl">Tổng chi tiêu</span>
                <span className="det-val" style={{ color: 'var(--pink-500)' }}>{formatPrice(customer.spent)}</span>
              </div>
              <div className="det-item">
                <span className="det-lbl">Điểm tích lũy</span>
                <span className="det-val">{customer.points.toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mfoot">
          <button className="bk-btn" onClick={onClose}>Đóng</button>
          <button className="btn-upd" onClick={() => alert('Đã gửi email khách hàng!')}>Gửi Voucher</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
