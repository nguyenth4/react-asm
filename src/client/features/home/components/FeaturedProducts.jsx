import React from 'react';
import ProductCard from '../../products/components/ProductCard';

const FeaturedProducts = ({ products, onProductClick, onSeeAllClick, selectedCategory, onAddToCart }) => {
  // If a category is selected, show more products, otherwise limit to 8 for featured section
  const displayLimit = selectedCategory !== 'all' ? products.length : 8;
  const displayProducts = products.slice(0, displayLimit);

  return (
    <section className="section" style={{ background: '#fff', paddingLeft: '52px', paddingRight: '52px' }}>
      <div className="section-header">
        <div>
          <div className="section-label">✦ Gợi ý cho bạn</div>
          <h2 className="section-title">
            {selectedCategory === 'all' ? (
              <>Sản phẩm <em>nổi bật</em></>
            ) : (
              <>Sản phẩm <em>{selectedCategory}</em></>
            )}
          </h2>
        </div>
        <button className="see-all" onClick={onSeeAllClick}>Xem tất cả →</button>
      </div>
      
      <div className="product-grid">
        {displayProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product.id, product)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
