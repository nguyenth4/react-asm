import React from 'react';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đăng ký thành công! 🎉');
  };

  return (
    <div className="newsletter">
      <div className="section-label" style={{ color: 'rgba(255,255,255,.7)' }}>✦ Cộng đồng làm đẹp</div>
      <h2 className="newsletter__title">Nhận <em>ưu đãi độc quyền</em></h2>
      <p className="newsletter__desc">
        Đăng ký nhận bản tin để không bỏ lỡ deal hot, sản phẩm mới và mẹo làm đẹp.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input 
          className="newsletter__input" 
          type="email" 
          placeholder="Nhập email của bạn..." 
          required 
        />
        <button className="newsletter__btn" type="submit">Đăng ký ngay</button>
      </form>
      <p className="newsletter__note">Không spam. Huỷ đăng ký bất kỳ lúc nào.</p>
    </div>
  );
};

export default Newsletter;
