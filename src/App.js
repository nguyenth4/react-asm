import React, { useState } from 'react';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Nếu URL có /admin thì mặc định vào Dashboard
    if (window.location.pathname.includes('/admin')) {
      return 'admin_dashboard';
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
        />
      )}
    </div>
  );
}

export default App;
