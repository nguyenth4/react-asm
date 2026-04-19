import React, { useState, useEffect } from 'react';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import './styles/products.css';

import productService from '../../../shared/services/productService';
import categoryService from '../../../shared/services/categoryService';

const ProductsPage = ({ initialProducts, onProductsUpdate, onProductClick, onAddToCart, user }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(products.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Chỉ hiện loading nếu danh sách rỗng
        if (products.length === 0) setLoading(true);
        
        const params = { status: 'active' };
        if (selectedCategory !== 'all') {
            params.category = selectedCategory;
        }
        const data = await productService.getAllProducts(params);
        const activeData = data.filter(p => p.status === 'active');
        
        setProducts(activeData);
        // Đồng bộ ngược lại App.js
        if (selectedCategory === 'all' && onProductsUpdate) {
          onProductsUpdate(activeData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
  };

  if (loading) return <div className="products-loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="products-error">{error}</div>;

  return (
    <div className="products-layout">
      <aside className="products-sidebar">
        <ProductFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </aside>
      
      <main className="products-main">
        <div className="products-header">
          <h1>Tất Cả Sản Phẩm</h1>
          <span className="products-count">{products.length} sản phẩm</span>
        </div>
        
        <ProductList products={products} onProductClick={onProductClick} onAddToCart={onAddToCart} user={user} />
      </main>
    </div>
  );
};

export default ProductsPage;
