import React from 'react';

const CategoryTable = ({ categories, onEdit, onDelete, onToggleStatus }) => {
  const getParentName = (parentId) => {
    if (!parentId) return '-';
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : '-';
  };

  return (
    <div className="data-table">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>TÊN DANH MỤC</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>DANH MỤC CHA</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>SỐ SP</th>
              <th style={{ textTransform: 'uppercase', fontSize: '13px', padding: '16px 20px', color: '#888' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Chưa có danh mục nào
                </td>
              </tr>
            ) : (
              categories.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500, color: '#333', padding: '16px 20px' }}>{c.name}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #eee',
                      backgroundColor: '#fafafa',
                      fontSize: '12px',
                      color: '#555'
                    }}>
                      {getParentName(c.parent_id)}
                    </span>
                  </td>
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
