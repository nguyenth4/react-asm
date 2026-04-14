import React, { useState } from 'react';
import './styles/Auth.css';

const RegisterPage = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const togglePw = () => setShowPassword(!showPassword);

  const calculateStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strengthScore = calculateStrength(password);
  
  const pcts = ['0%', '25%', '50%', '75%', '100%'];
  const colors = ['', '#E24B4A', '#BA7517', '#378ADD', '#1D9E75'];
  const labels = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];

  const doRegister = () => {
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    const ph = phone.trim();

    setErrorMsg('');
    setSuccessMsg('');

    if (!fn || !ln || !em || !ph || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    if (!agree) {
      setErrorMsg('Bạn cần đồng ý điều khoản để tiếp tục.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Mật khẩu tối thiểu 8 ký tự.');
      return;
    }

    localStorage.setItem('bb_user', JSON.stringify({ name: `${fn} ${ln}`, role: 'user', email: em }));
    setSuccessMsg(`Đăng ký thành công! 🎉 Chào mừng ${fn}!`);
    setTimeout(() => {
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-left__brand">Blush<span>&amp;</span>Bloom</div>
        <p className="auth-left__tagline">Tạo tài khoản và nhận ngay<br />voucher 50K cho đơn hàng đầu tiên!</p>
        <div className="auth-perk">🎁 Voucher 50K chào mừng</div>
        <div className="auth-perk">⭐ Tích điểm mỗi đơn hàng</div>
        <div className="auth-perk">🔔 Ưu đãi độc quyền thành viên</div>
        <div className="auth-perk">🚚 Miễn phí ship từ 299K</div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <a className="auth-tab" onClick={() => onNavigate('login')}>Đăng nhập</a>
            <a className="auth-tab active" onClick={() => onNavigate('register')}>Đăng ký</a>
          </div>
          <h2 className="auth-title">Tạo tài khoản mới ✨</h2>
          <p className="auth-sub">Nhận ngay voucher 50K khi đăng ký!</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button className="social-btn"><span style={{ fontSize: '18px', fontWeight: 700 }}>G</span> Google</button>
            <button className="social-btn"><span style={{ fontSize: '18px', fontWeight: 700 }}>f</span> Facebook</button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--pink-100)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--text-soft)', whiteSpace: 'nowrap' }}>hoặc đăng ký với email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--pink-100)' }}></div>
          </div>

          {errorMsg && <div className="error-msg">{errorMsg}</div>}
          {successMsg && (
            <div style={{ background: '#ECFDF5', color: '#10B981', fontSize: '13px', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', border: '1px solid #A7F3D0' }}>
              {successMsg}
            </div>
          )}

          <div className="form-row" style={{ marginBottom: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Họ *</label>
              <input className="form-input" type="text" placeholder="Nguyễn" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Tên *</label>
              <input className="form-input" type="text" placeholder="Lan Anh" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" type="email" placeholder="lananh@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Số điện thoại *</label>
            <input className="form-input" type="tel" placeholder="0912 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mật khẩu *</label>
            <div className="form-input-wrap">
              <input 
                className="form-input" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Tối thiểu 8 ký tự" 
                style={{ paddingRight: '44px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="toggle-pw" onClick={togglePw}>👁</button>
            </div>
            {password && (
              <div className="strength-bar">
                <div className="strength-track">
                  <div 
                    className="strength-fill" 
                    style={{ width: pcts[strengthScore], background: colors[strengthScore] }}
                  ></div>
                </div>
                <span className="strength-label" style={{ color: colors[strengthScore] }}>
                  {labels[strengthScore]}
                </span>
              </div>
            )}
          </div>
          
          <div className="checkbox-row">
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label htmlFor="agree">Tôi đồng ý với <a href="#!">Điều khoản dịch vụ</a> và <a href="#!">Chính sách bảo mật</a></label>
          </div>
          
          <div className="checkbox-row">
            <input type="checkbox" id="newsletter" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            <label htmlFor="newsletter">Nhận thông báo ưu đãi &amp; sản phẩm mới qua email</label>
          </div>
          
          <button className="btn-submit" onClick={doRegister}>Đăng ký miễn phí →</button>
          <p className="auth-switch">Đã có tài khoản? <a onClick={() => onNavigate('login')}>Đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
