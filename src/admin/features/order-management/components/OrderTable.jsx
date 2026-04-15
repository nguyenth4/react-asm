import React from 'react';
import { formatPrice, formatDateTime } from '../../../../shared/utils/format';

const OrderTable = ({ orders, onSelectOrder, getStatusLabel, getStatusClass }) => {
  return (
    <div className="data-table">
      <div className="data-table__head">
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Hiển thị <strong>{orders.length}</strong> đơn hàng
        </span>
        <button className="bk-btn" onClick={() => alert('Xuất file thành công!')}>
          <i className="bi bi-file-earmark-excel" style={{ marginRight: '6px' }}></i> Xuất Excel
        </button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>
                  <span className="order-id-link" onClick={() => onSelectOrder(o)}>
                    #{o.id}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div className="cust-av" style={{ background: '#3b82f6' }}>
                      {o.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="cust-name">{o.customerName}</div>
                      <div className="cust-phone">{o.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{o.items.join(', ')}</td>
                <td className="order-total">{formatPrice(o.total)}</td>
                <td className="pay-method">{o.payment}</td>
                <td className="order-date">{formatDateTime(o.createdAt)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(o.status)}`}>
                    {getStatusLabel(o.status)}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <div className="abt view" onClick={() => onSelectOrder(o)} title="Chi tiết">
                      <i className="bi bi-eye"></i>
                    </div>
                    <div className="abt edit-btn" title="Sửa">
                      <i className="bi bi-pencil"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
