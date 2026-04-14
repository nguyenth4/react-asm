import React from 'react';

const Categories = ({ onCategoryClick }) => {
  const cats = [
    { id: 'lips', name: 'Son môi', icon: <i className="bi bi-palette"></i>, count: '128 sản phẩm', theme: 'cat--pink' },
    { id: 'face', name: 'Má hồng', icon: <i className="bi bi-stars"></i>, count: '64 sản phẩm', theme: 'cat--gold' },
    { id: 'eyes', name: 'Mắt & Kẻ mắt', icon: <i className="bi bi-eye"></i>, count: '96 sản phẩm', theme: 'cat--blue' },
    { id: 'skincare', name: 'Dưỡng da', icon: <i className="bi bi-leaf"></i>, count: '85 sản phẩm', theme: 'cat--green' },
    { id: 'gift', name: 'Gift Set', icon: <i className="bi bi-gift"></i>, count: '32 sản phẩm', theme: 'cat--purple' },
  ];

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <div className="section-label">✦ Khám phá</div>
          <h2 className="section-title">Danh mục <em>sản phẩm</em></h2>
        </div>
        <button className="see-all" onClick={onCategoryClick}>Xem tất cả →</button>
      </div>
      <div className="cat-grid">
        {cats.map(cat => (
          <div 
            key={cat.id} 
            className={`cat-card ${cat.theme}`} 
            onClick={onCategoryClick}
          >
            <span className="cat-card__icon">{cat.icon}</span>
            <div className="cat-card__name">{cat.name}</div>
            <div className="cat-card__count">{cat.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
