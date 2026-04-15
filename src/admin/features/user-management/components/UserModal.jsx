import React from 'react';
import { formatDate } from '../../../../shared/utils/format';

const UserModal = ({ customer, isOpen, onClose }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className={`modal-overlay show`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mhead" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)', marginBottom: '4px' }}>HỒ SƠ NGƯỜI DÙNG</div>
            <div className="mtitle" style={{ fontSize: '20px', fontWeight: '700' }}>{customer.name}</div>
          </div>
          <div className="mclose" style={{ background: '#f3f4f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClose}>×</div>
        </div>
        <div className="mbody">
          <div className="cust-det-head">
            <div className="cust-det-av" style={{ background: customer.color }}>{customer.avatar}</div>
            <div className="cust-det-info">
              <h3>{customer.name}</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>Gia nhập từ {formatDate(customer.joined)}</span>
              </div>
            </div>
          </div>

          <div className="det-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="det-box">
              <div className="det-box__title">Liên lạc & Vai trò</div>
              <div className="det-item"><span className="det-lbl">Họ và tên</span><span className="det-val">{customer.name}</span></div>
              <div className="det-item"><span className="det-lbl">Email</span><span className="det-val">{customer.email}</span></div>
              <div className="det-item"><span className="det-lbl">Số điện thoại</span><span className="det-val">{customer.phone || 'Chưa cập nhật'}</span></div>
              <div className="det-item" style={{ borderBottom: 'none' }}>
                <span className="det-lbl">Vai trò</span>
                <span className="det-val" style={{ 
                  fontWeight: 600, 
                  color: customer.role === 'admin' ? '#991B1B' : '#0369A1',
                  background: customer.role === 'admin' ? '#FEE2E2' : '#E0F2FE',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px'
                }}>
                  {customer.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mfoot" style={{ borderTop: '1px solid #edf2f7', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="bk-btn" style={{ height: '40px' }} onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
