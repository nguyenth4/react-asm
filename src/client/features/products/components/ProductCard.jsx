import React from 'react';
import { formatCurrency } from '../../../../shared/utils/format';

const ProductCard = ({ product, onClick, onAddToCart, user }) => {
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
          <span className="product-price">{formatCurrency(price)}</span>
          {oldPrice && (
            <span className="product-price-old">{formatCurrency(oldPrice)}</span>
          )}
        </div>
        
        {(!user || (user.role !== 'admin' && user.role !== 1)) && (
          <button 
            className="btn-add-cart" 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product);
            }}
          >
            <i className="bi bi-bag-plus" style={{ fontSize: '1.1rem' }}></i>
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
