import React, { useState } from 'react';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import './styles/products.css';

import { MOCK_PRODUCTS } from '../../../shared/constants/mockProducts';

const ProductsPage = ({ onProductClick, onAddToCart }) => {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div className="products-layout">
      <aside className="products-sidebar">
        <ProductFilter />
      </aside>
      
      <main className="products-main">
        <div className="products-header">
          <h1>Tất Cả Sản Phẩm</h1>
          <span className="products-count">{products.length} sản phẩm</span>
        </div>
        
        <ProductList products={products} onProductClick={onProductClick} onAddToCart={onAddToCart} />
      </main>
    </div>
  );
};

export default ProductsPage;
