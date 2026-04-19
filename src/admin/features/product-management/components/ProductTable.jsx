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
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
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
              const displayPrice = p.price_sale ? p.price_sale : p.price;
              const hasSale = p.price_sale && Number(p.price_sale) < Number(p.price);
              const discount = hasSale ? Math.round((1 - p.price_sale / p.price) * 100) : 0;
              const stockClass = p.stock === 0 ? 'out' : p.stock <= 20 ? 'low' : 'ok';
              return (
                <tr key={p.id}>
                  <td>
                    <div>
                      <div className="prod-name" style={{ fontWeight: '500', color: 'var(--text-dark)', marginBottom: '4px' }}>{p.name}</div>
                      <div className="prod-meta" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.brand}</div>
                    </div>
                  </td>
                  <td style={{ width: '85px' }}>
                    <div className="prod-thumb" style={{ width: '72px', height: '72px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                      {p.image ? (
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-box-seam"></i>
                        </div>
                      )}
                    </div>
                  </td>
                  <td><span className="cat-tag">{p.category?.name || p.category}</span></td>
                  <td>
                    <span className="price-val">{formatPrice(displayPrice)}</span>
                    {discount > 0 && <span className="discount-tag">-{discount}%</span>}
                  </td>
                  <td><span className={`stock-val ${stockClass}`}>{p.stock}</span></td>
                  <td className="sold-val">{(p.sold_count || 0).toLocaleString()}</td>
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
