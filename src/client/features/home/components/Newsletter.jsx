import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const newsletterSchema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ')
});

const Newsletter = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(newsletterSchema)
  });

  const onSubmit = (data) => {
    alert('Đăng ký thành công! 🎉');
    reset();
  };

  return (
    <div className="newsletter">
      <div className="section-label" style={{ color: 'rgba(255,255,255,.7)' }}>✦ Cộng đồng làm đẹp</div>
      <h2 className="newsletter__title">Nhận <em>ưu đãi độc quyền</em></h2>
      <p className="newsletter__desc">
        Đăng ký nhận bản tin để không bỏ lỡ deal hot, sản phẩm mới và mẹo làm đẹp.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <input 
            className={`newsletter__input ${errors.email ? 'input-error' : ''}`} 
            type="email" 
            placeholder="Nhập email của bạn..." 
            {...register('email')}
          />
          {errors.email && <span className="field-error" style={{ color: '#fff', fontSize: '11px', marginTop: '5px' }}>{errors.email.message}</span>}
        </div>
        <button className="newsletter__btn" type="submit">Đăng ký ngay</button>
      </form>
      <p className="newsletter__note">Không spam. Huỷ đăng ký bất kỳ lúc nào.</p>
    </div>
  );
};

export default Newsletter;
