import React, { useState } from 'react';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import './index.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const handleLogout = () => {
    localStorage.removeItem('bb_user');
    localStorage.removeItem('token');
    setUser(null);
    navigateTo('home');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const [currentPage, setCurrentPage] = useState(() => {
    const isPathAdmin = window.location.pathname.includes('/admin');
    if (isPathAdmin) {
      if (isAdmin()) {
        return 'admin_dashboard';
      } else {
        return 'login';
      }
    }
    return 'home';
  });
  
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ── Cart logic ──────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty: qty }];
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

  // ── Navigation logic ──────────────────────────────────────────
  const navigateTo = (page, productId = null) => {
    if (page.startsWith('admin_') && !isAdmin()) {
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
  };

  const isAdminPage = currentPage && currentPage.startsWith('admin_');

  return (
    <div className="App">
      {isAdminPage ? (
        <AdminApp 
          currentPage={currentPage} 
          onNavigate={navigateTo} 
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <ClientApp 
          currentPage={currentPage} 
          onNavigate={navigateTo}
          cartItems={cartItems}
          addToCart={addToCart}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          selectedProductId={selectedProductId}
          user={user}
          onLogout={handleLogout}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;
