import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import SaleBanner from './components/SaleBanner';
import Newsletter from './components/Newsletter';
import productService from '../../../shared/services/productService';
import './styles/home.css';

const HomePage = ({ initialProducts, onProductsUpdate, onShopClick, onProductClick, onAddToCart, user }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(products.length === 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Chỉ hiện loading nếu chưa có dữ liệu gì
        if (products.length === 0) setLoading(true);
        
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const data = await productService.getAllProducts(params);
        
        setProducts(data);
        // Đồng bộ ngược lại App.js nếu đang ở chế độ "all"
        if (selectedCategory === 'all' && onProductsUpdate) {
          onProductsUpdate(data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products for home page:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategorySelect = (id) => {
    // If clicking the same category, deselect it (toggle behavior)
    if (selectedCategory === id) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(id);
    }
  };

  return (
    <div className="home-page">
      <HeroSection onShopClick={onShopClick} />
      <Categories 
        onCategorySelect={handleCategorySelect} 
        selectedCategory={selectedCategory}
        onSeeAllClick={onShopClick}
      />
      {loading ? (
        <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải sản phẩm nổi bật...</div>
      ) : (
        <FeaturedProducts 
          products={products} 
          onProductClick={onProductClick} 
          onSeeAllClick={onShopClick}
          selectedCategory={selectedCategory}
          onAddToCart={onAddToCart}
          user={user}
        />
      )}
      <SaleBanner onShopClick={onShopClick} />
      <Newsletter />
    </div>
  );
};

export default HomePage;
