import React, { useState } from 'react';
import Header from './shared/components/common/Header';
import Footer from './shared/components/common/Footer';
import HomePage from './client/features/home/HomePage';
import ProductsPage from './client/features/products/ProductsPage';
import ProductDetailPage from './client/features/products/ProductDetailPage';
import CartPage from './client/features/cart/CartPage';
import CheckoutPage from './client/features/checkout/CheckoutPage';
import LoginPage from './client/features/auth/LoginPage';
import RegisterPage from './client/features/auth/RegisterPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'detail' | 'cart'
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Cart state ──────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // ── Navigation ──────────────────────────────────────────
  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // ── Page render ──────────────────────────────────────────
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onShopClick={() => navigateTo('products')}
            onProductClick={(id) => navigateTo('detail', id)}
            onAddToCart={addToCart}
          />
        );
      case 'products':
        return (
          <ProductsPage
            onProductClick={(id) => navigateTo('detail', id)}
            onAddToCart={addToCart}
          />
        );
      case 'detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => navigateTo('products')}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onContinueShopping={() => navigateTo('products')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage onNavigate={navigateTo} />
        );
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'register':
        return <RegisterPage onNavigate={navigateTo} />;
      default:
        return (
          <HomePage
            onShopClick={() => navigateTo('products')}
            onProductClick={(id) => navigateTo('detail', id)}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header
        activePage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartCount}
      />
      {renderPage()}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
