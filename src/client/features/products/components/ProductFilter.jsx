import React from 'react';

const ProductFilter = () => {
  return (
    <div className="filter-card">
      <div className="filter-section">
        <span className="filter-title">Danh Mục</span>
        <div className="filter-list">
          <label className="filter-item">
            <input type="checkbox" defaultChecked /> Tất cả
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Chăm sóc da (Skincare)
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Nước hoa (Fragrance)
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Son môi (Lips)
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Đánh mắt (Eyes)
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Kem nền (Face)
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <span className="filter-title">Khoảng Giá</span>
        <div className="filter-list">
          <label className="filter-item">
            <input type="checkbox" /> Dưới $30
          </label>
          <label className="filter-item">
            <input type="checkbox" /> $30 - $60
          </label>
          <label className="filter-item">
            <input type="checkbox" /> $60 - $100
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Trên $100
          </label>
        </div>
      </div>

      <div className="filter-section">
        <span className="filter-title">Khác</span>
        <div className="filter-list">
          <label className="filter-item">
            <input type="checkbox" /> Khuyến mãi (Sale)
          </label>
          <label className="filter-item">
            <input type="checkbox" /> Hàng mới (New)
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
