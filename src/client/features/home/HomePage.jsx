import React from 'react';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import SaleBanner from './components/SaleBanner';
import Newsletter from './components/Newsletter';
import { MOCK_PRODUCTS } from '../../../shared/constants/mockProducts';
import './styles/home.css';

const HomePage = ({ onShopClick, onProductClick }) => {
  return (
    <div className="home-page">
      <HeroSection onShopClick={onShopClick} />
      <Categories onCategoryClick={onShopClick} />
      <FeaturedProducts 
        products={MOCK_PRODUCTS} 
        onProductClick={onProductClick} 
        onSeeAllClick={onShopClick}
      />
      <SaleBanner onShopClick={onShopClick} />
      <Newsletter />
    </div>
  );
};

export default HomePage;
