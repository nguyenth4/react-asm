import React, { useState } from 'react';
import Header from './shared/components/common/Header';
import Footer from './shared/components/common/Footer';
import HomePage from './client/features/home/HomePage';
import ProductsPage from './client/features/products/ProductsPage';
import ProductDetailPage from './client/features/products/ProductDetailPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'detail'
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onShopClick={() => navigateTo('products')}
            onProductClick={(id) => navigateTo('detail', id)}
          />
        );
      case 'products':
        return (
          <ProductsPage 
            onProductClick={(id) => navigateTo('detail', id)} 
          />
        );
      case 'detail':
        return (
          <ProductDetailPage 
            productId={selectedProductId} 
            onBack={() => navigateTo('products')} 
          />
        );
      default:
        return <HomePage onShopClick={() => navigateTo('products')} onProductClick={(id) => navigateTo('detail', id)} />;
    }
  };

  return (
    <div className="App">
      <Header activePage={currentPage} onNavigate={navigateTo} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
