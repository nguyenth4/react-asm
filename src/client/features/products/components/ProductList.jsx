import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductClick, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
