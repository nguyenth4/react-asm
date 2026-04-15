import React from 'react';
import { formatPrice, formatDate } from '../../../../shared/utils/format';

const UserTable = ({ customers, onViewProfile }) => {
  const tierLabels = { gold: '★ Vàng', silver: '◆ Bạc', bronze: '▲ Đồng' };
  const tierClass = { gold: 'tier-gold', silver: 'tier-silver', bronze: 'tier-bronze' };

  return (
    <div className="data-table">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th>Hạng</th>
              <th>Điểm</th>
              <th>Tổng đơn</th>
              <th>Chi tiêu</th>
              <th>Ngày gia nhập</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="cust-av2" style={{ background: c.color }}>{c.avatar}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{c.email}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{c.phone}</td>
                <td>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '2px 8px', 
                    borderRadius: '10px', 
                    backgroundColor: c.role === 'admin' ? '#FEE2E2' : '#E0F2FE',
                    color: c.role === 'admin' ? '#991B1B' : '#0369A1',
                    fontWeight: 600
                  }}>
                    {c.role === 'admin' ? 'Quản trị' : 'Thành viên'}
                  </span>
                </td>
                <td><span className={`tier-badge ${tierClass[c.tier]}`}>{tierLabels[c.tier]}</span></td>
                <td style={{ fontWeight: 600 }}>{c.points.toLocaleString()}</td>
                <td style={{ fontWeight: 600, color: 'var(--blue)' }}>{c.orders}</td>
                <td style={{ fontWeight: 600, color: 'var(--pink-500)' }}>{formatPrice(c.spent)}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDate(c.joined)}</td>
                <td>
                  <div className="action-btns">
                    <div className="abt" title="Xem" onClick={() => onViewProfile(c)}>
                      <i className="bi bi-eye"></i>
                    </div>
                    <div className="abt" title="Email"><i className="bi bi-envelope"></i></div>
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

export default UserTable;
