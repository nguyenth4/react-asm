import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductClick, onAddToCart, user }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id, product)}
          onAddToCart={onAddToCart}
          user={user}
        />
      ))}
    </div>
  );
};

export default ProductList;
