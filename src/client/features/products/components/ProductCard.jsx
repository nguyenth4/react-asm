import React from 'react';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const { name, category, price, oldPrice, image, isNew, isSale } = product;
  
  return (
    <div className="product-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" loading="lazy" />
        <div className="product-badges">
          {isNew && <span className="badge badge-new">New</span>}
          {isSale && <span className="badge badge-sale">Sale</span>}
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        
        <div className="product-price-row">
          <span className="product-price">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="product-price-old">${oldPrice.toFixed(2)}</span>
          )}
        </div>
        
        <button 
          className="btn-add-cart" 
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(product);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
