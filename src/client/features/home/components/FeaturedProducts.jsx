import React, { useState } from 'react';
import ProductCard from '../../products/components/ProductCard';

const FeaturedProducts = ({ products, onProductClick, onSeeAllClick }) => {
  const [activeTab, setActiveTab] = useState('featured');

  let filtered = [...products];
  if (activeTab === 'newest') {
    filtered = filtered.slice().reverse();
  } else if (activeTab === 'sale') {
    filtered = filtered.filter(p => p.isSale);
  } else {
    // assume featured logic simply means the first ones, 
    // or you could add 'isFeatured' to the mock data.
    filtered = filtered.filter(p => p.isNew || p.isSale); // Demo logic
  }

  // Lấy 4 sản phẩm hiển thị trên trang chủ
  const displayProducts = filtered.slice(0, 4);

  return (
    <section className="section" style={{ background: '#fff', paddingLeft: '52px', paddingRight: '52px' }}>
      <div className="section-header">
        <div>
          <div className="section-label">✦ Nổi bật</div>
          <h2 className="section-title">Sản phẩm <em>bán chạy</em></h2>
        </div>
        <button className="see-all" onClick={onSeeAllClick}>Xem tất cả →</button>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'featured' ? 'active' : ''}`} 
          onClick={() => setActiveTab('featured')}
        >
          Bán chạy
        </button>
        <button 
          className={`tab ${activeTab === 'newest' ? 'active' : ''}`} 
          onClick={() => setActiveTab('newest')}
        >
          Mới nhất
        </button>
        <button 
          className={`tab ${activeTab === 'sale' ? 'active' : ''}`} 
          onClick={() => setActiveTab('sale')}
        >
          Khuyến mãi
        </button>
      </div>
      
      <div className="product-grid">
        {displayProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
