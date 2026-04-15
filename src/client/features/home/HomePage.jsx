import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import SaleBanner from './components/SaleBanner';
import Newsletter from './components/Newsletter';
import productService from '../../../shared/services/productService';
import './styles/home.css';

const HomePage = ({ onShopClick, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products for home page:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <HeroSection onShopClick={onShopClick} />
      <Categories onCategoryClick={onShopClick} />
      {loading ? (
        <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải sản phẩm nổi bật...</div>
      ) : (
        <FeaturedProducts 
          products={products} 
          onProductClick={onProductClick} 
          onSeeAllClick={onShopClick}
        />
      )}
      <SaleBanner onShopClick={onShopClick} />
      <Newsletter />
    </div>
  );
};

export default HomePage;
