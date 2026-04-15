import React, { useState } from 'react';
import authService from '../../../shared/services/authService';
import './styles/Auth.css';

const LoginPage = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePw = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      const response = await authService.login(trimmedEmail, trimmedPass);
      
      const { user } = response;
      localStorage.setItem('bb_user', JSON.stringify(user));
      
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      doLogin();
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

          {errorMsg && <div className="error-msg">{errorMsg}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="lananh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="form-input-wrap">
              <input 
                className="form-input" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                style={{ paddingRight: '44px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="toggle-pw" onClick={togglePw}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '18px' }}>
            <a className="forgot-link" href="#!">Quên mật khẩu?</a>
          </div>

          <button className="btn-submit" onClick={doLogin}>Đăng nhập <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i></button>
          
          <p className="auth-switch">Chưa có tài khoản? <a onClick={() => onNavigate('register')}>Đăng ký ngay</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
