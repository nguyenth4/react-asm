import React from 'react';

const Header = ({ activePage, onNavigate, cartCount = 0, user, onLogout }) => {

  const handleNav = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div
        className="navbar__logo"
        onClick={() => onNavigate('home')}
        style={{ cursor: 'pointer' }}
      >
        Blush &amp; <span>Bloom</span>
      </div>

      {/* Nav links */}
      <ul className="navbar__links">
        <li>
          <a
            href="/"
            onClick={(e) => handleNav(e, 'home')}
            className={activePage === 'home' ? 'active' : ''}
          >
            Trang chủ
          </a>
        </li>
        <li>
          <a
            href="/products"
            onClick={(e) => handleNav(e, 'products')}
            className={activePage === 'products' ? 'active' : ''}
          >
            Sản phẩm
          </a>
        </li>
      </ul>

      {/* Actions */}
      <div className="navbar__actions">
        <button className="navbar__icon-btn" title="Tìm kiếm" aria-label="Tìm kiếm">
          <i className="bi bi-search"></i>
        </button>
        
        {user ? (
          <div className="navbar__user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user.role === 'admin' && (
              <button 
                className="navbar__icon-btn admin-btn" 
                title="Trang quản trị" 
                onClick={() => onNavigate('admin_dashboard')}
                style={{ color: 'var(--pink-400)' }}
              >
                <i className="bi bi-shield-check"></i>
              </button>
            )}
            <span className="user-name" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', cursor: 'default' }}>
              Chào, {user.first_name}
            </span>
            <button className="navbar__icon-btn" title="Đăng xuất" onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        ) : (
          <button className="navbar__icon-btn" title="Đăng nhập" aria-label="Đăng nhập" onClick={() => onNavigate('login')}>
            <i className="bi bi-person"></i>
          </button>
        )}

        {/* Cart button với badge */}
        <button
          id="nav-cart-btn"
          className="navbar__icon-btn"
          title="Giỏ hàng"
          aria-label="Giỏ hàng"
          onClick={() => onNavigate('cart')}
          style={{ position: 'relative' }}
        >
          <i className="bi bi-bag"></i>
          {cartCount > 0 && (
            <span className="navbar__badge">{cartCount}</span>
          )}
        </button>

        {!user && (
          <button className="btn-register" onClick={() => onNavigate('register')}>Đăng ký</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
