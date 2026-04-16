import React from 'react';

const ProductFilters = ({ searchTerm, onSearchChange, filters, onFilterChange, onAddClick, categories = [] }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <div className="search-wrap">
          <span className="search-ico">🔍</span>
          <input 
            type="text" 
            className="fsel" 
            placeholder="Tìm tên, SKU..." 
            value={searchTerm} 
            onChange={(e) => onSearchChange(e.target.value)} 
          />
        </div>
        
        <select 
          className="fsel" 
          value={filters.category} 
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        
        <select 
          className="fsel" 
          value={filters.status} 
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="hidden">Tạm ẩn</option>
        </select>
        
        <select 
          className="fsel" 
          value={filters.sort} 
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
        >
          <option value="newest">Mới nhất</option>
          <option value="bestseller">Bán chạy</option>
          <option value="price_asc">Giá tăng</option>
          <option value="price_desc">Giá giảm</option>
          <option value="stock_asc">Tồn kho ít</option>
        </select>
      </div>
      
      <button className="btn-add" onClick={onAddClick}>
        <span>+</span> Thêm sản phẩm
      </button>
    </div>
  );
};

export default ProductFilters;
