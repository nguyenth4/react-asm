import React from 'react';

const SaleBanner = ({ onShopClick }) => {
  return (
    <div className="sale-banner">
      <div>
        <h2 className="sale-banner__title">Flash Sale <em>Cuối tuần</em></h2>
        <p className="sale-banner__desc">
          Hàng trăm sản phẩm son & mỹ phẩm chính hãng giảm giá sâu. 
          Chỉ trong 48 giờ — số lượng có hạn!
        </p>
        <button className="btn-white" onClick={onShopClick}>Xem ưu đãi ngay →</button>
      </div>
      <div className="sale-banner__right">
        <div className="discount-badge">
          <span className="discount-badge__num">30%</span>
          <span className="discount-badge__label">Son môi</span>
        </div>
        <div className="discount-badge">
          <span className="discount-badge__num">50%</span>
          <span className="discount-badge__label">Mắt</span>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
