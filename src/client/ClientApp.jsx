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
  selectedProductId,
  selectedProductData,
  products,
  onProductsUpdate,
  user,
  onLogout,
  onLoginSuccess,
  onClearCart
}) => {
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const renderClientPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            initialProducts={products}
            onProductsUpdate={onProductsUpdate}
            onShopClick={() => onNavigate('products')}
            onProductClick={(id, data) => onNavigate('detail', id, data)}
            onAddToCart={addToCart}
            user={user}
          />
        );
      case 'products':
        return (
          <ProductsPage
            initialProducts={products}
            onProductsUpdate={onProductsUpdate}
            onProductClick={(id, data) => onNavigate('detail', id, data)}
            onAddToCart={addToCart}
            user={user}
          />
        );
      case 'detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            initialData={selectedProductData}
            onBack={() => onNavigate('products')}
            onAddToCart={addToCart}
            user={user}
          />
        );
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onContinueShopping={() => onNavigate('products')}
            onNavigate={onNavigate}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            onNavigate={onNavigate} 
            cartItems={cartItems} 
            user={user}
            onClearCart={() => onClearCart && onClearCart()} 
          />
        );
      case 'login':
        return <LoginPage onNavigate={onNavigate} onLoginSuccess={onLoginSuccess} />;
      case 'register':
        return <RegisterPage onNavigate={onNavigate} />;
      default:
        return (
          <HomePage
            onShopClick={() => onNavigate('products')}
            onProductClick={(id) => onNavigate('detail', id)}
            onAddToCart={addToCart}
            user={user}
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
        user={user}
        onLogout={onLogout}
      />
      
      <main>
        {renderClientPage()}
      </main>

      <Footer onNavigate={onNavigate} />
    </>
  );
};

export default ClientApp;
