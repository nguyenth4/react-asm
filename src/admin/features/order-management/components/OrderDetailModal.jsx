import React, { useState } from 'react';
import { formatPrice, formatDateTime } from '../../../../shared/utils/format';

const OrderDetailModal = ({ order, isOpen, onClose, onUpdateStatus, getStatusLabel, getStatusClass }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !order) return null;

  const handleUpdate = () => {
    onUpdateStatus(order.id, document.getElementById('status_update_select').value);
    setIsEditing(false);
  };

  return (
    <div className={`modal-overlay show`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mhead" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)', marginBottom: '4px' }}>{isEditing ? 'ĐANG CHỈNH SỬA' : 'CHI TIẾT ĐƠN HÀNG'}</div>
            <div className="mtitle" style={{ fontSize: '20px', fontWeight: '700' }}>#{order.id}</div>
          </div>
          <div className="mclose" style={{ background: '#f3f4f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { setIsEditing(false); onClose(); }}>×</div>
        </div>
        
        <div className="mbody">
          <div className="det-grid">
            <div className="det-box">
              <div className="det-box__title">Khách hàng</div>
              <div className="det-item"><span className="det-lbl">Họ tên</span><span className="det-val">{order.customerName}</span></div>
              <div className="det-item"><span className="det-lbl">Điện thoại</span><span className="det-val">{order.phone}</span></div>
              <div className="det-item"><span className="det-lbl">Địa chỉ</span><span className="det-val">{order.address}</span></div>
            </div>
            
            <div className="det-box">
              <div className="det-box__title">Thanh toán & Giao hàng</div>
              <div className="det-item"><span className="det-lbl">Phương thức</span><span className="det-val">{order.payment}</span></div>
              <div className="det-item"><span className="det-lbl">Ngày đặt</span><span className="det-val">{formatDateTime(order.createdAt)}</span></div>
              <div className="det-item">
                <span className="det-lbl">Trạng thái</span>
                <span className={`status-badge ${getStatusClass(order.status)}`}>{getStatusLabel(order.status)}</span>
              </div>
            </div>
          </div>

          <div className="det-box" style={{ marginBottom: '24px' }}>
            <div className="det-box__title">Danh sách sản phẩm</div>
            <table className="det-table">
              <thead>
                <tr><th>Sản phẩm</th><th style={{ textAlign: 'right' }}>Số lượng</th></tr>
              </thead>
              <tbody>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => {
                    const [name, qty] = item.split(' ×');
                    return (
                      <tr key={idx}>
                        <td>{name}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>×{qty}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', py: 3, color: 'var(--text-soft)' }}>
                      Không có thông tin sản phẩm
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Tổng thanh toán:</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--blue)' }}>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '20px', marginTop: '10px' }}>
            {isEditing ? (
              <div className="su-box" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div className="det-box__title" style={{ color: 'var(--blue)', fontWeight: '600' }}>Cập nhật trạng thái đơn hàng</div>
                <div className="su-row" style={{ marginTop: '12px' }}>
                  <select 
                    className="su-sel" 
                    defaultValue={order.status} 
                    id="status_update_select"
                    style={{ flex: 1, height: '42px', borderRadius: '8px', border: '1px solid #cbd5e1', padding: '0 12px' }}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="shipping">Đang giao</option>
                    <option value="done">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                  <button 
                    className="btn-upd" 
                    onClick={handleUpdate}
                    style={{ background: 'var(--blue)', padding: '0 20px', height: '42px', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)' }}
                  >
                    Lưu trạng thái
                  </button>
                  <button 
                    className="bk-btn" 
                    onClick={() => setIsEditing(false)}
                    style={{ height: '42px', padding: '0 15px' }}
                  > 
                    Hủy 
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  className="btn-prt" 
                  onClick={() => window.print()}
                  style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb' }}
                >
                  <i className="bi bi-printer" style={{ marginRight: '6px' }}></i> In hóa đơn
                </button>
                <button 
                  className="btn-upd" 
                  onClick={() => setIsEditing(true)}
                  style={{ 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                    padding: '0 24px',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                  }}
                >
                  <i className="bi bi-pencil-square" style={{ marginRight: '8px' }}></i> Cập nhật trạng thái
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mfoot">
          <button className="bk-btn" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
