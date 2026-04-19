import React from 'react';

const CategoryTable = ({ categories, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="data-table">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>TÊN DANH MỤC</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>SỐ SP</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Chưa có danh mục nào
                </td>
              </tr>
            ) : (
              categories.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500, color: '#333', padding: '16px 20px' }}>{c.name}</td>
                  <td style={{ padding: '16px 20px', color: '#555' }}>{c.count}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div className="action-btns" style={{ display: 'flex', gap: '8px' }}>
                      <div 
                        className="abt edit" 
                        title="Sửa" 
                        onClick={() => onEdit(c)}
                        style={{ 
                          width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1px solid #ffb3c6', borderRadius: '4px', color: '#666', cursor: 'pointer'
                        }}
                      >
                        <i className="bi bi-pencil" style={{ fontSize: '14px' }}></i>
                      </div>
                      <div 
                        className="abt del" 
                        title="Xóa" 
                        onClick={() => onDelete(c.id)}
                        style={{ 
                          width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1px solid #ffb3c6', borderRadius: '4px', color: '#e91e63', cursor: 'pointer'
                        }}
                      >
                        <i className="bi bi-trash" style={{ fontSize: '14px' }}></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
