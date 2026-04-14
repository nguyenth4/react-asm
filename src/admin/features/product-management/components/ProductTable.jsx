import React from 'react';
import { formatPrice } from '../../../../shared/utils/format';

const ProductTable = ({ 
  products, 
  selectedIds, 
  onToggleSelectAll, 
  onToggleSelectOne, 
  onEdit, 
  onDelete,
  onDeleteSelected 
}) => {
  return (
    <div className="data-table">
      <div className="data-table__head">
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Đã chọn <strong>{selectedIds.length}</strong> sản phẩm
        </span>
        <div className="bulk-actions">
          <button className="bk-btn">Ẩn</button>
          <button 
            className="bk-btn bk-btn--danger" 
            onClick={onDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            Xóa đã chọn
          </button>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '36px' }}>
                <input 
                  type="checkbox" 
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                  checked={products.length > 0 && selectedIds.length === products.length} 
                />
              </th>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Đã bán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
              const stockClass = p.stock === 0 ? 'out' : p.stock <= 20 ? 'low' : 'ok';
              return (
                <tr key={p.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(p.id)} 
                      onChange={() => onToggleSelectOne(p.id)} 
                    />
                  </td>
                  <td>
                    <div className="prod-cell">
                      <div className="prod-thumb"><i className="bi bi-box-seam"></i></div>
                      <div>
                        <div className="prod-name">{p.name}</div>
                        <div className="prod-meta">{p.brand} · SKU: {p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="cat-tag">{p.category}</span></td>
                  <td>
                    <span className="price-val">{formatPrice(p.price)}</span>
                    {discount > 0 && <span className="discount-tag">-{discount}%</span>}
                  </td>
                  <td><span className={`stock-val ${stockClass}`}>{p.stock}</span></td>
                  <td className="sold-val">{p.soldCount.toLocaleString()}</td>
                  <td>
                    <span className="status-dot">
                      <span className={`sdot ${p.isVisible ? 'on' : 'off'}`}></span>
                      {p.isVisible ? 'Đang bán' : 'Tạm ẩn'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <div className="abt edit" title="Sửa" onClick={() => onEdit(p)}>
                        <i className="bi bi-pencil"></i>
                      </div>
                      <div className="abt del" title="Xóa" onClick={() => onDelete(p.id)}>
                        <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
