import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import SaleBanner from './components/SaleBanner';
import Newsletter from './components/Newsletter';
import productService from '../../../shared/services/productService';
import './styles/home.css';

const HomePage = ({ onShopClick, onProductClick, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const data = await productService.getAllProducts(params);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products for home page:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategorySelect = (slug) => {
    // If clicking the same category, deselect it (toggle behavior)
    if (selectedCategory === slug) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(slug);
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
        />
      )}
      <SaleBanner onShopClick={onShopClick} />
      <Newsletter />
    </div>
  );
};

export default HomePage;
