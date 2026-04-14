import React from 'react';
import { formatPrice, formatDateTime } from '../../../../shared/utils/format';

const OrderDetailModal = ({ order, isOpen, onClose, onUpdateStatus, getStatusLabel, getStatusClass }) => {
  if (!isOpen || !order) return null;

  return (
    <div className={`modal-overlay show`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mhead">
          <div className="mtitle">Chi tiết đơn hàng #{order.id}</div>
          <div className="mclose" onClick={onClose}>×</div>
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
                {order.items.map((item, idx) => {
                  const [name, qty] = item.split(' ×');
                  return (
                    <tr key={idx}>
                      <td>{name}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>×{qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Tổng thanh toán:</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--blue)' }}>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="su-box">
            <div className="det-box__title">Cập nhật trạng thái</div>
            <div className="su-row">
              <select className="su-sel" defaultValue={order.status} id="status_update_select">
                <option value="pending">Chờ xử lý</option>
                <option value="shipping">Đang giao</option>
                <option value="done">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <button 
                className="btn-upd" 
                onClick={() => onUpdateStatus(order.id, document.getElementById('status_update_select').value)}
              >
                Cập nhật
              </button>
              <button className="btn-prt" onClick={() => window.print()}>
                <i className="bi bi-printer" style={{ marginRight: '6px' }}></i> In đơn
              </button>
            </div>
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
