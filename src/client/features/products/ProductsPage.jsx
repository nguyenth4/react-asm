import React, { useState, useEffect } from 'react';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import './styles/products.css';

import productService from '../../../shared/services/productService';

const ProductsPage = ({ onProductClick, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="products-loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="products-error">{error}</div>;

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
