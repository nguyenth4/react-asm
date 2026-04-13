import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductClick }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
      ))}
    </div>
  );
};

export default ProductList;
