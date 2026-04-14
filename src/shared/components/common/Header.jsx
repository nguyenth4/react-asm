import React from 'react';

const Header = ({ activePage, onNavigate }) => {
  const handleNav = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        Blush<span>&amp;</span>Bloom
      </div>
      <ul className="navbar__links">
        <li>
          <a href="/" onClick={(e) => handleNav(e, 'home')} className={activePage === 'home' ? 'active' : ''}>
            Trang chủ
          </a>
        </li>
        <li>
          <a href="/products" onClick={(e) => handleNav(e, 'products')} className={activePage === 'products' ? 'active' : ''}>
            Son môi
          </a>
        </li>
        <li>
          <a href="/products" onClick={(e) => handleNav(e, 'products')} className={activePage === 'products' ? 'active' : ''}>
            Mắt
          </a>
        </li>
        <li>
          <a href="/products" onClick={(e) => handleNav(e, 'products')} className={activePage === 'products' ? 'active' : ''}>
            Má hồng
          </a>
        </li>
        <li>
          <a href="/products" onClick={(e) => handleNav(e, 'products')} className={activePage === 'products' ? 'active' : ''}>
            Dưỡng da
          </a>
        </li>
        <li>
          <a href="#!" onClick={(e) => e.preventDefault()}>
            Thương hiệu
          </a>
        </li>
      </ul>
      <div className="navbar__actions">
        <button className="navbar__icon-btn" title="Tìm kiếm">🔍</button>
        <button className="navbar__icon-btn" title="Tài khoản">👤</button>
        <button className="navbar__icon-btn" title="Giỏ hàng" style={{ position: 'relative' }}>
          🛒
          <span className="navbar__badge" style={{ display: 'none' }}>0</span>
        </button>
        <button className="btn-register">Đăng ký</button>
      </div>
    </nav>
  );
};

export default Header;
