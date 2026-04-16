import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '../../../shared/services/authService';
import './styles/Auth.css';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Vui lòng nhập họ'),
  lastName: yup.string().required('Vui lòng nhập tên'),
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Số điện thoại chỉ bao gồm chữ số'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu tối thiểu 8 ký tự'),
  agree: yup.boolean().oneOf([true], 'Bạn cần đồng ý điều khoản để tiếp tục'),
  newsletter: yup.boolean()
});

const RegisterPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      newsletter: true
    }
  });

  const watchPassword = watch('password', '');
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

  const strengthScore = calculateStrength(watchPassword);
  const pcts = ['0%', '25%', '50%', '75%', '100%'];
  const colors = ['', '#E24B4A', '#BA7517', '#378ADD', '#1D9E75'];
  const labels = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError('');
      setSuccessMsg('');
      
      const userData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        newsletter: data.newsletter
      };
      
      await authService.register(userData);
      
      setSuccessMsg(`Đăng ký thành công! Chào mừng ${data.firstName}!`);
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-left__brand">Blush<span>&amp;</span>Bloom</div>
        <p className="auth-left__tagline">Tạo tài khoản và nhận ngay<br />voucher 50K cho đơn hàng đầu tiên!</p>
        <div className="auth-perk"><i className="bi bi-gift" style={{ color: 'var(--pink-400)', marginRight: '6px' }}></i>Voucher 50.000đ chào mừng</div>
        <div className="auth-perk"><i className="bi bi-star-fill" style={{ color: 'var(--gold)', marginRight: '6px' }}></i>Tích điểm mỗi đơn hàng</div>
        <div className="auth-perk"><i className="bi bi-bell" style={{ color: 'var(--gold)', marginRight: '6px' }}></i>Ưu đãi độc quyền thành viên</div>
        <div className="auth-perk"><i className="bi bi-truck" style={{ color: 'var(--green)', marginRight: '6px' }}></i>Miễn phí ship từ 300.000đ</div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <a className="auth-tab" onClick={() => onNavigate('login')}>Đăng nhập</a>
            <a className="auth-tab active" onClick={() => onNavigate('register')}>Đăng ký</a>
          </div>
          <h2 className="auth-title">Tạo tài khoản mới <i className="bi bi-stars" style={{ color: 'var(--gold)' }}></i></h2>
          <p className="auth-sub">Nhận ngay voucher 50.000đ khi đăng ký!</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button className="social-btn"><i className="bi bi-google" style={{ marginRight: '8px' }}></i> Google</button>
            <button className="social-btn"><i className="bi bi-facebook" style={{ marginRight: '8px' }}></i> Facebook</button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--pink-100)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--text-soft)', whiteSpace: 'nowrap' }}>hoặc đăng ký với email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--pink-100)' }}></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {serverError && <div className="error-msg" style={{ marginBottom: '14px' }}>{serverError}</div>}
            {successMsg && (
              <div style={{ background: '#ECFDF5', color: '#10B981', fontSize: '13px', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', border: '1px solid #A7F3D0' }}>
                {successMsg}
              </div>
            )}

            <div className="form-row" style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label className="form-label">Họ *</label>
                <input 
                  className={`form-input ${errors.firstName ? 'input-error' : ''}`} 
                  type="text" 
                  placeholder="Nguyễn" 
                  {...register('firstName')} 
                />
                {errors.firstName && <span className="field-error">{errors.firstName.message}</span>}
              </div>
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label className="form-label">Tên *</label>
                <input 
                  className={`form-input ${errors.lastName ? 'input-error' : ''}`} 
                  type="text" 
                  placeholder="Lan Anh" 
                  {...register('lastName')} 
                />
                {errors.lastName && <span className="field-error">{errors.lastName.message}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input 
                className={`form-input ${errors.email ? 'input-error' : ''}`} 
                type="email" 
                placeholder="lananh@email.com" 
                {...register('email')} 
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Số điện thoại *</label>
              <input 
                className={`form-input ${errors.phone ? 'input-error' : ''}`} 
                type="tel" 
                placeholder="0912 345 678" 
                {...register('phone')} 
              />
              {errors.phone && <span className="field-error">{errors.phone.message}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Mật khẩu *</label>
              <div className="form-input-wrap">
                <input 
                  className={`form-input ${errors.password ? 'input-error' : ''}`} 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Tối thiểu 8 ký tự" 
                  style={{ paddingRight: '44px' }}
                  {...register('password')}
                />
                <button type="button" className="toggle-pw" onClick={togglePw}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {watchPassword && (
                <div className="strength-bar" style={{ marginTop: '8px' }}>
                  <div className="strength-track" style={{ height: '4px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      className="strength-fill" 
                      style={{ width: pcts[strengthScore], background: colors[strengthScore], height: '100%', transition: 'all 0.3s' }}
                    ></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span className="strength-label" style={{ color: colors[strengthScore], fontSize: '11px', fontWeight: 600 }}>
                      Độ mạnh: {labels[strengthScore]}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </div>
            
            <div className="checkbox-row" style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <input type="checkbox" id="agree" {...register('agree')} style={{ marginTop: '4px' }} />
                <label htmlFor="agree" style={{ fontSize: '13px', color: 'var(--text-dark)' }}>
                  Tôi đồng ý với <a href="#!" style={{ color: 'var(--pink-400)', textDecoration: 'underline' }}>Điều khoản dịch vụ</a> và <a href="#!" style={{ color: 'var(--pink-400)', textDecoration: 'underline' }}>Chính sách bảo mật</a>
                </label>
              </div>
              {errors.agree && <span className="field-error">{errors.agree.message}</span>}
            </div>
            
            <div className="checkbox-row" style={{ marginTop: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="newsletter" {...register('newsletter')} />
                <label htmlFor="newsletter" style={{ fontSize: '13px', color: 'var(--text-dark)' }}>Nhận thông báo ưu đãi &amp; sản phẩm mới qua email</label>
              </div>
            </div>
            
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký miễn phí'} 
              <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
          <p className="auth-switch">Đã có tài khoản? <a onClick={() => onNavigate('login')}>Đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
