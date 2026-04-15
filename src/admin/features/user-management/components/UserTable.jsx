import React from 'react';

const UserTable = ({ customers, onViewProfile }) => {
  return (
    <div className="data-table">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>Họ Tên</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>Email</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>Vai trò</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="cust-av2" style={{ background: c.color }}>{c.avatar}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{c.email}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    padding: '4px 10px', 
                    borderRadius: '12px', 
                    backgroundColor: c.role === 'admin' ? '#FEE2E2' : '#E0F2FE',
                    color: c.role === 'admin' ? '#991B1B' : '#0369A1',
                    fontWeight: 600
                  }}>
                    {c.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                  </span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div className="action-btns">
                    <button 
                      title="Xem chi tiết" 
                      onClick={() => onViewProfile(c)}
                      style={{
                         background: '#f8fafc', border: '1px solid #cbd5e1',
                         padding: '6px 12px', borderRadius: '6px', color: '#334155', cursor: 'pointer',
                         fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
                      }}
                    >
                      <i className="bi bi-eye"></i> Xem
                    </button>
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
