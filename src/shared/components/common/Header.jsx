import React from 'react';

const Header = ({ activePage, onNavigate, cartCount = 0 }) => {
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
            Son môi
          </a>
        </li>
        <li>
          <a
            href="/products"
            onClick={(e) => handleNav(e, 'products')}
            className={activePage === 'products' ? 'active' : ''}
          >
            Mắt
          </a>
        </li>
        <li>
          <a
            href="/products"
            onClick={(e) => handleNav(e, 'products')}
            className={activePage === 'products' ? 'active' : ''}
          >
            Má hồng
          </a>
        </li>
        <li>
          <a
            href="/products"
            onClick={(e) => handleNav(e, 'products')}
            className={activePage === 'products' ? 'active' : ''}
          >
            Dưỡng da
          </a>
        </li>
        <li>
          <a href="#!" onClick={(e) => e.preventDefault()}>
            Thương hiệu
          </a>
        </li>
        <li>
          <a href="/checkout" onClick={(e) => handleNav(e, 'checkout')} className={activePage === 'checkout' ? 'active' : ''}>
            Thanh toán
          </a>
        </li>
      </ul>

      {/* Actions */}
      <div className="navbar__actions">
        <button className="navbar__icon-btn" title="Tìm kiếm" aria-label="Tìm kiếm">
          <i className="bi bi-search"></i>
        </button>
        <button className="navbar__icon-btn" title="Tài khoản" aria-label="Tài khoản" onClick={() => onNavigate('login')}>
          <i className="bi bi-person"></i>
        </button>

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

        <button className="btn-register" onClick={() => onNavigate('register')}>Đăng ký</button>
      </div>
    </nav>
  );
};

export default Header;
