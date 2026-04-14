import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div>
          <div className="footer__logo" onClick={() => onNavigate && onNavigate('home')}>
            Blush<span>&</span>Bloom
          </div>
          <p className="footer__desc">
            Cửa hàng mỹ phẩm cao cấp online hàng đầu Việt Nam. Chuyên son môi & make-up chính hãng từ các thương hiệu nổi tiếng thế giới.
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
            <button onClick={() => onNavigate && onNavigate('products')}>Son môi</button>
            <button onClick={() => onNavigate && onNavigate('products')}>Phấn má</button>
            <button onClick={() => onNavigate && onNavigate('products')}>Mắt</button>
            <button onClick={() => onNavigate && onNavigate('products')}>Dưỡng da</button>
            <button onClick={() => onNavigate && onNavigate('products')}>Gift Set</button>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Hỗ trợ</div>
          <div className="footer__links">
            <a href="#">Hướng dẫn mua hàng</a>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Vận chuyển</a>
            <a href="#">Tích điểm</a>
            <a href="#">Liên hệ</a>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Công ty</div>
          <div className="footer__links">
            <a href="#">Về chúng tôi</a>
            <a href="#">Blog làm đẹp</a>
            <a href="#">Thương hiệu</a>
            <a href="#">Tuyển dụng</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__copy">© 2026 Blush & Bloom. Bảo lưu mọi quyền.</span>
        <span className="footer__contact">Hotline: <strong>1800 1234</strong> · contact@blushbloom.vn</span>
        <div className="footer__payments">
          <span className="footer__pay-badge">VISA</span>
          <span className="footer__pay-badge">Master</span>
          <span className="footer__pay-badge">MoMo</span>
          <span className="footer__pay-badge">ZaloPay</span>
          <span className="footer__pay-badge">COD</span>
        </div>
      </div>
      <style jsx>{`
        .footer__links button {
          font-family: inherit;
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: rgba(255,255,255,.65);
          transition: color .2s;
          cursor: pointer;
          text-align: left;
        }
        .footer__links button:hover {
          color: var(--pink-200);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
