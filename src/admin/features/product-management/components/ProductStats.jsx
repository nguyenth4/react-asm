import React from 'react';

const ProductStats = ({ products }) => {
  const total = products.length;
  const active = products.filter(p => p.isVisible).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 20).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="mini-stats">
      <div className="ms">
        <div className="ms__icon" style={{ background: '#F0FDF4' }}><i className="bi bi-box-seam"></i></div>
        <div>
          <div className="ms__label">Tổng sản phẩm</div>
          <div className="ms__val">{total}</div>
        </div>
      </div>
      <div className="ms">
        <div className="ms__icon" style={{ background: '#F0F9FF' }}><i className="bi bi-check2-circle"></i></div>
        <div>
          <div className="ms__label">Đang bán</div>
          <div className="ms__val" style={{ color: 'var(--green)' }}>{active}</div>
        </div>
      </div>
      <div className="ms">
        <div className="ms__icon" style={{ background: '#FFFBEB' }}><i className="bi bi-exclamation-triangle"></i></div>
        <div>
          <div className="ms__label">Sắp hết hàng</div>
          <div className="ms__val" style={{ color: 'var(--gold)' }}>{lowStock}</div>
        </div>
      </div>
      <div className="ms">
        <div className="ms__icon" style={{ background: '#FFF1F2' }}><i className="bi bi-x-circle"></i></div>
        <div>
          <div className="ms__label">Hết hàng</div>
          <div className="ms__val" style={{ color: 'var(--red)' }}>{outOfStock}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;
