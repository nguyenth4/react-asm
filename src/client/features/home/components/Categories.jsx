import React, { useState, useEffect } from 'react';
import categoryService from '../../../../shared/services/categoryService';

const Categories = ({ onCategorySelect, selectedCategory, onSeeAllClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories for home page:', error);
      }
    };
    fetchCategories();
  }, []);

  const getTheme = (index) => {
    const themes = ['cat--pink', 'cat--gold', 'cat--blue', 'cat--green', 'cat--purple'];
    return themes[index % themes.length];
  };

  const getIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('son') || lower.includes('môi')) return <i className="bi bi-palette"></i>;
    if (lower.includes('má') || lower.includes('hồng')) return <i className="bi bi-stars"></i>;
    if (lower.includes('mắt')) return <i className="bi bi-eye"></i>;
    if (lower.includes('dưỡng')) return <i className="bi bi-leaf"></i>;
    return <i className="bi bi-gift"></i>;
  };

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <div className="section-label">✦ Khám phá</div>
          <h2 className="section-title">Danh mục <em>sản phẩm</em></h2>
        </div>
        <button className="see-all" onClick={onSeeAllClick}>Xem tất cả →</button>
      </div>
      <div className="cat-grid">
        {categories.map((cat, index) => (
          <div 
            key={cat.id} 
            className={`cat-card ${getTheme(index)} ${selectedCategory === cat.slug ? 'is-selected' : ''}`} 
            onClick={() => onCategorySelect(cat.slug)}
          >
            <span className="cat-card__icon">{getIcon(cat.name)}</span>
            <div className="cat-card__name">{cat.name}</div>
            <div className="cat-card__count">{cat.product_count || 0} sản phẩm</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
