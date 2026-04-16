import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '../../../shared/services/authService';
import './styles/Auth.css';

const loginSchema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});

const LoginPage = ({ onNavigate, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const togglePw = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError('');
      const response = await authService.login(data.email, data.password);
      
      const { user } = response;
      localStorage.setItem('bb_user', JSON.stringify(user));
      
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-left__brand">Blush<span>&amp;</span>Bloom</div>
        <p className="auth-left__tagline">Chào mừng đến với thế giới làm đẹp —<br />nơi mỗi sắc màu kể một câu chuyện</p>
        <div className="auth-left__perks">
          <div className="auth-perk"><i className="bi bi-gift" style={{ color: 'var(--pink-400)', marginRight: '6px' }}></i>Tặng voucher 50.000đ khi đăng ký</div>
          <div className="auth-perk"><i className="bi bi-star-fill" style={{ color: 'var(--gold)', marginRight: '6px' }}></i>Tích điểm mỗi đơn hàng</div>
          <div className="auth-perk"><i className="bi bi-bell" style={{ color: 'var(--gold)', marginRight: '6px' }}></i>Nhận ưu đãi độc quyền thành viên</div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <a className="auth-tab active" onClick={() => onNavigate('login')}>Đăng nhập</a>
            <a className="auth-tab" onClick={() => onNavigate('register')}>Đăng ký</a>
          </div>
          <h2 className="auth-title">Chào mừng trở lại <i className="bi bi-emoji-smile" style={{ color: 'var(--pink-400)' }}></i></h2>
          <p className="auth-sub">Đăng nhập để tiếp tục mua sắm nhé!</p>
          
          <div className="social-btns">
            <button className="social-btn"><i className="bi bi-google" style={{ marginRight: '8px' }}></i> Google</button>
            <button className="social-btn"><i className="bi bi-facebook" style={{ marginRight: '8px' }}></i> Facebook</button>
          </div>
          
          <div className="divider">
            <span className="divider__line"></span>
            <span className="divider__text">hoặc đăng nhập với email</span>
            <span className="divider__line"></span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {serverError && <div className="error-msg" style={{ marginBottom: '15px' }}>{serverError}</div>}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                type="email" 
                placeholder="lananh@email.com"
                {...register('email')}
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <div className="form-input-wrap">
                <input 
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  style={{ paddingRight: '44px' }}
                  {...register('password')}
                />
                <button type="button" className="toggle-pw" onClick={togglePw}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </div>

            <div style={{ textAlign: 'right', marginBottom: '18px' }}>
              <a className="forgot-link" href="#!">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng nhập'} 
              <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
          
          <p className="auth-switch">Chưa có tài khoản? <a onClick={() => onNavigate('register')}>Đăng ký ngay</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
