import React from 'react';

const ProductFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-card">
      <div className="filter-section">
        <span className="filter-title">Danh Mục</span>
        <div className="filter-list">
          <label className="filter-item">
            <input 
              type="radio" 
              name="category"
              checked={selectedCategory === 'all'} 
              onChange={() => onCategoryChange('all')}
            /> Tất cả
          </label>
          {categories.map((cat) => (
            <label className="filter-item" key={cat.id}>
              <input 
                type="radio" 
                name="category"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
              /> {cat.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
