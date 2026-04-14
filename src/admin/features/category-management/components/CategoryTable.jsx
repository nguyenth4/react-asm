import React from 'react';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="data-table">
      <div className="data-table__head">
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Danh sách hạng mục</span>
        <div className="bulk-actions">
          <button className="bk-btn">Ẩn</button>
          <button className="bk-btn bk-btn--danger">Xóa đã chọn</button>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '36px' }}><input type="checkbox" /></th>
              <th>Tên Danh Mục</th>
              <th>Slug</th>
              <th>Số SP</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.slug}</td>
                <td style={{ fontWeight: 600 }}>{c.count}</td>
                <td>
                  <span className="status-dot">
                    <span className={`sdot ${c.status ? 'on' : 'off'}`}></span>
                    {c.status ? 'Đang hiện' : 'Tạm ẩn'}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <div className="abt edit" title="Sửa" onClick={() => onEdit(c)}>
                      <i className="bi bi-pencil"></i>
                    </div>
                    <div className="abt del" title="Xóa" onClick={() => onDelete(c.id)}>
                      <i className="bi bi-trash"></i>
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

export default CategoryTable;
