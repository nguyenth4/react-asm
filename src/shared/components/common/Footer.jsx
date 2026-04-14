import React from 'react';

const Footer = ({ onNavigate }) => {
  const handleNav = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="footer">
      <div className="footer__main">
        <div>
          <div className="footer__logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            Blush<span>&amp;</span>Bloom
          </div>
          <p className="footer__desc">
            Cửa hàng mỹ phẩm cao cấp online hàng đầu Việt Nam. Chuyên son môi &amp; make-up chính hãng từ các thương hiệu nổi tiếng thế giới.
          </p>
          <div className="footer__socials">
            <div className="footer__social-btn">f</div>
            <div className="footer__social-btn">ig</div>
            <div className="footer__social-btn">tt</div>
            <div className="footer__social-btn">yt</div>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Sản phẩm</div>
          <div className="footer__links">
            <a href="/products" onClick={(e) => handleNav(e, 'products')}>Son môi</a>
            <a href="/products" onClick={(e) => handleNav(e, 'products')}>Phấn má</a>
            <a href="/products" onClick={(e) => handleNav(e, 'products')}>Mắt</a>
            <a href="/products" onClick={(e) => handleNav(e, 'products')}>Dưỡng da</a>
            <a href="/products" onClick={(e) => handleNav(e, 'products')}>Gift Set</a>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Hỗ trợ</div>
          <div className="footer__links">
            <a href="#!" onClick={(e) => e.preventDefault()}>Hướng dẫn mua hàng</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Chính sách đổi trả</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Vận chuyển</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Tích điểm</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Liên hệ</a>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Công ty</div>
          <div className="footer__links">
            <a href="#!" onClick={(e) => e.preventDefault()}>Về chúng tôi</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Blog làm đẹp</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Thương hiệu</a>
            <a href="#!" onClick={(e) => e.preventDefault()}>Tuyển dụng</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__copy">© 2026 Blush &amp; Bloom. Bảo lưu mọi quyền.</span>
        <span className="footer__contact">Hotline: <strong>1800 1234</strong> · contact@blushbloom.vn</span>
        <div class="footer__payments">
          <span className="footer__pay-badge">VISA</span>
          <span className="footer__pay-badge">Master</span>
          <span className="footer__pay-badge">MoMo</span>
          <span className="footer__pay-badge">ZaloPay</span>
          <span className="footer__pay-badge">COD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
