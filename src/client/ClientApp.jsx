import React from 'react';
import Header from '../shared/components/common/Header';
import Footer from '../shared/components/common/Footer';
import HomePage from './features/home/HomePage';
import ProductsPage from './features/products/ProductsPage';
import ProductDetailPage from './features/products/ProductDetailPage';
import CartPage from './features/cart/CartPage';
import CheckoutPage from './features/checkout/CheckoutPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

const ClientApp = ({ 
  currentPage, 
  onNavigate, 
  cartItems, 
  addToCart, 
  updateQty, 
  removeFromCart,
  selectedProductId 
}) => {
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const renderClientPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onShopClick={() => onNavigate('products')}
            onProductClick={(id) => onNavigate('detail', id)}
            onAddToCart={addToCart}
          />
        );
      case 'products':
        return (
          <ProductsPage
            onProductClick={(id) => onNavigate('detail', id)}
            onAddToCart={addToCart}
          />
        );
      case 'detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => onNavigate('products')}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onContinueShopping={() => onNavigate('products')}
          />
        );
      case 'checkout':
        return <CheckoutPage onNavigate={onNavigate} cartItems={cartItems} />;
      case 'login':
        return <LoginPage onNavigate={onNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={onNavigate} />;
      default:
        return (
          <HomePage
            onShopClick={() => onNavigate('products')}
            onProductClick={(id) => onNavigate('detail', id)}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <>
      <Header
        activePage={currentPage}
        onNavigate={onNavigate}
        cartCount={cartCount}
      />
      
      <main>
        {renderClientPage()}
      </main>

      <Footer onNavigate={onNavigate} />
    </>
  );
};

export default ClientApp;
