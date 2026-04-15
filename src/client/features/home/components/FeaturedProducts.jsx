import React from 'react';
import ProductCard from '../../products/components/ProductCard';

const FeaturedProducts = ({ products, onProductClick, onSeeAllClick }) => {
  // Hiển thị tối đa 8 sản phẩm trên trang chủ mà không cần lọc
  const displayProducts = products.slice(0, 8);

  return (
    <section className="section" style={{ background: '#fff', paddingLeft: '52px', paddingRight: '52px' }}>
      <div className="section-header">
        <div>
          <div className="section-label">✦ Gợi ý cho bạn</div>
          <h2 className="section-title">Sản phẩm</h2>
        </div>
        <button className="see-all" onClick={onSeeAllClick}>Xem tất cả →</button>
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
