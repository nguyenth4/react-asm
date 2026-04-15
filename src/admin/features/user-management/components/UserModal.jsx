import React, { useState } from 'react';
import { formatPrice, formatDate } from '../../../../shared/utils/format';

const UserModal = ({ customer, isOpen, onClose, onUpdateRole }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !customer) return null;

  const handleSave = () => {
    const newRole = document.getElementById('role_select').value;
    onUpdateRole(customer.id, newRole);
    setIsEditing(false);
  };

  const tierLabels = { gold: '★ Vàng', silver: '◆ Bạc', bronze: '▲ Đồng' };
  const tierClass = { gold: 'tier-gold', silver: 'tier-silver', bronze: 'tier-bronze' };

  return (
    <div className={`modal-overlay show`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mhead" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)', marginBottom: '4px' }}>HỒ SƠ KHÁCH HÀNG</div>
            <div className="mtitle" style={{ fontSize: '20px', fontWeight: '700' }}>{customer.name}</div>
          </div>
          <div className="mclose" style={{ background: '#f3f4f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { setIsEditing(false); onClose(); }}>×</div>
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
              <div className="det-box__title">Liên lạc & Vai trò</div>
              <div className="det-item"><span className="det-lbl">Email</span><span className="det-val">{customer.email}</span></div>
              <div className="det-item"><span className="det-lbl">Số điện thoại</span><span className="det-val">{customer.phone}</span></div>
              <div className="det-item">
                <span className="det-lbl">Vai trò</span>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select id="role_select" defaultValue={customer.role} className="su-sel" style={{ padding: '6px 12px', height: '38px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <option value="user">Người dùng (User)</option>
                      <option value="admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                ) : (
                  <span className="det-val" style={{ 
                    fontWeight: 600, 
                    color: customer.role === 'admin' ? '#991B1B' : '#0369A1',
                    background: customer.role === 'admin' ? '#FEE2E2' : '#E0F2FE',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {customer.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                  </span>
                )}
              </div>
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
        <div className="mfoot" style={{ borderTop: '1px solid #edf2f7', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="bk-btn" style={{ height: '40px' }} onClick={() => { setIsEditing(false); onClose(); }}>Đóng</button>
          
          {isEditing ? (
            <button 
              className="btn-upd" 
              onClick={handleSave}
              style={{ background: 'var(--blue)', padding: '0 20px', height: '40px', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)' }}
            >
              Lưu vai trò
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-upd" 
                style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb', height: '40px' }} 
                onClick={() => alert('Đã gửi email khách hàng!')}
              >
                Gửi Voucher
              </button>
              <button 
                className="btn-upd" 
                onClick={() => setIsEditing(true)}
                style={{ 
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
                  padding: '0 20px',
                  height: '40px',
                  boxShadow: '0 4px 10px rgba(219, 39, 119, 0.2)'
                }}
              >
                <i className="bi bi-shield-lock" style={{ marginRight: '8px' }}></i> Sửa vai trò
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
