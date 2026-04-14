import React from 'react';

const HeroSection = ({ onShopClick }) => {
  return (
    <section className="hero">
      <div className="hero__left">
        <div className="hero__pill">✦ Bộ sưu tập Xuân 2025</div>
        <h1 className="hero__title">
          Vẻ đẹp <em>ngọt ngào</em><br />của riêng bạn
        </h1>
        <p className="hero__desc">
          Khám phá hơn 500+ sản phẩm son & mỹ phẩm chính hãng. 
          Từ màu hồng pastel dịu dàng đến đỏ kiêu sa — tìm màu của bạn.
        </p>
        <div className="hero__btns">
          <button className="btn-primary" onClick={onShopClick}>Mua sắm ngay →</button>
          <button className="btn-outline" onClick={onShopClick}>Xem bộ sưu tập</button>
        </div>
        <div className="hero__stats">
          <div><span className="hero__stat-num">500+</span><span className="hero__stat-label">Sản phẩm</span></div>
          <div><span className="hero__stat-num">50+</span><span className="hero__stat-label">Thương hiệu</span></div>
          <div><span className="hero__stat-num">20K+</span><span className="hero__stat-label">Khách hàng</span></div>
        </div>
      </div>
      <div className="hero__right">
        <div className="hero__illustration">💄</div>
        <div className="hero__floating-card">
          <div className="hero__floating-card__icon">★</div>
          <div>
            <div className="hero__floating-card__title">4.9 / 5.0</div>
            <div className="hero__floating-card__sub">20.000+ đánh giá</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
