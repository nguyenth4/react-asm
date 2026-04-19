import React, { useState, useEffect } from 'react';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import './index.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('bb_user');
      if (savedUser === null || savedUser === 'undefined') return null;
      return JSON.parse(savedUser);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  /* const isAdmin = () => {
    return user && user.role === 'admin';
  }; */

  const handleLogout = () => {
    localStorage.removeItem('bb_user');
    localStorage.removeItem('token');
    setUser(null);
    navigateTo('home');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    alert('Đăng nhập thành công!');
    
    // Chuyển hướng ngay lập tức dựa trên userData mới
    if (userData.role === 'admin') {
      setCurrentPage('admin_dashboard');
      window.history.pushState({}, '', '/admin');
    } else {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
    }
  };

  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    const isPathAdmin = path.includes('/admin');

    if (isPathAdmin) {
      if (!user) return 'login';
      if (user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        window.history.replaceState({}, '', '/');
        return 'home';
      }
      
      // Phân tích sâu hơn cho sub-pages của admin
      if (path.includes('/admin/orders')) return 'admin_orders';
      if (path.includes('/admin/products')) return 'admin_products';
      if (path.includes('/admin/categories')) return 'admin_categories';
      if (path.includes('/admin/customers')) return 'admin_customers';
      if (path.includes('/admin/dashboard')) return 'admin_dashboard';
      
      return 'admin_dashboard';
    }

    if (path.includes('/products')) return 'products';
    if (path.includes('/cart')) return 'cart';
    if (path.includes('/checkout')) return 'checkout';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/login')) return 'login';
    if (path.includes('/register')) return 'register';
    return 'home';
  });

  // Xử lý nút Back/Forward của trình duyệt
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('/admin')) {
        if (!user) {
          setCurrentPage('login');
        } else if (user.role !== 'admin') {
          alert('Bạn không có quyền truy cập trang quản trị!');
          window.history.replaceState({}, '', '/');
          setCurrentPage('home');
        } else {
          // Phân tích sub-page cho admin
          if (path.includes('/admin/orders')) setCurrentPage('admin_orders');
          else if (path.includes('/admin/products')) setCurrentPage('admin_products');
          else if (path.includes('/admin/categories')) setCurrentPage('admin_categories');
          else if (path.includes('/admin/customers')) setCurrentPage('admin_customers');
          else setCurrentPage('admin_dashboard');
        }
      } else if (path.includes('/products')) {
        setCurrentPage('products');
      } else if (path.includes('/cart')) {
        setCurrentPage('cart');
      } else if (path.includes('/checkout')) {
        setCurrentPage('checkout');
      } else if (path.includes('/orders')) {
        setCurrentPage('orders');
      } else if (path.includes('/login')) {
        setCurrentPage('login');
      } else if (path.includes('/register')) {
        setCurrentPage('register');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user]);
  
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [globalProducts, setGlobalProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_cart');
      if (saved === null || saved === 'undefined') return [];
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ── Cart logic ──────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigateTo('login');
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      // Calculate effective price once
      const hasSale = product.price_sale && Number(product.price_sale) < Number(product.price);
      const effectivePrice = hasSale ? product.price_sale : product.price;

      if (existing) {
        const newQty = existing.qty + qty;
        if (product.stock && newQty > product.stock) {
           alert(`Lỗi: Không thể vượt quá số lượng tồn kho (Còn ${product.stock} sản phẩm)`);
           return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: newQty, price: effectivePrice, original_price: product.price } : item
        );
      } else {
        if (product.stock && qty > product.stock) {
           alert(`Lỗi: Không thể vượt quá số lượng tồn kho (Còn ${product.stock} sản phẩm)`);
           return prev;
        }
        return [...prev, { ...product, qty: qty, price: effectivePrice, original_price: product.price }];
      }
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
  const navigateTo = (page, productId = null, productData = null) => {
    if (page.startsWith('admin_')) {
      if (!user) {
        setCurrentPage('login');
        window.history.pushState({}, '', '/login');
        return;
      }
      if (user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        window.history.pushState({}, '', '/');
        setCurrentPage('home');
        return;
      }
    }

    // Cập nhật URL trình duyệt cho khớp với state
    let targetPath = '/';
    if (page.startsWith('admin_')) {
      const sub = page.replace('admin_', '');
      targetPath = `/admin/${sub}`;
    } else if (page === 'login') {
      targetPath = '/login';
    } else if (page === 'register') {
      targetPath = '/register';
    } else if (page === 'products') {
      targetPath = '/products';
    } else if (page === 'cart') {
      targetPath = '/cart';
    } else if (page === 'checkout') {
      if (!user) {
        alert('Vui lòng đăng nhập để tiến hành thanh toán!');
        navigateTo('login');
        return;
      }
      targetPath = '/checkout';
    } else if (page === 'orders') {
      if (!user) {
        alert('Vui lòng đăng nhập để xem lịch sử đơn hàng!');
        navigateTo('login');
        return;
      }
      targetPath = '/orders';
    } else if (page === 'detail' && productId) {
      targetPath = `/products-detail`; // Đường dẫn ảo để khớp logic detail
    }

    window.history.pushState({}, '', targetPath);
    
    setCurrentPage(page);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
    // Lưu trữ dữ liệu sơ bộ nếu có
    if (productData !== null) {
      setSelectedProductData(productData);
    } else {
      setSelectedProductData(null);
    }
  };

  const isAdminPage = currentPage && currentPage.startsWith('admin_');

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('bb_cart');
  };

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
          selectedProductData={selectedProductData}
          products={globalProducts}
          onProductsUpdate={setGlobalProducts}
          user={user}
          onLogout={handleLogout}
          onLoginSuccess={handleLoginSuccess}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
}

export default App;
