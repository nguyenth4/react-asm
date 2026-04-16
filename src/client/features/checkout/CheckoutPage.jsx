import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import orderService from '../../../shared/services/orderService';

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Số điện thoại chỉ bao gồm chữ số'),
  address: yup.string().required('Vui lòng nhập địa chỉ nhận hàng'),
  shippingAddress: yup.boolean(),
  otherAddress: yup.string().when('shippingAddress', {
    is: true,
    then: (schema) => schema.required('Vui lòng nhập địa chỉ giao hàng khác'),
    otherwise: (schema) => schema.notRequired()
  }),
  paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
  acceptTerms: yup.boolean().oneOf([true], 'Bạn cần đồng ý với điều khoản của chúng tôi')
});

const CheckoutPage = ({ onNavigate, cartItems = [], user, onClearCart }) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash',
      shippingAddress: false,
      acceptTerms: false
    }
  });

  const watchShippingAddress = watch('shippingAddress');

  // Tự động điền thông tin user khi có dữ liệu
  useEffect(() => {
    if (user) {
      reset({
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone || '',
        paymentMethod: 'cash',
        shippingAddress: false,
        acceptTerms: false
      });
    }
  }, [user, reset]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      setServerError('Giỏ hàng của bạn đang trống.');
      return;
    }

    try {
      setLoading(true);
      setServerError('');

      const orderData = {
        user_id: user ? user.id : null,
        customer_name: data.fullName,
        email: data.email,
        phone: data.phone,
        shipping_address: data.shippingAddress ? data.otherAddress : data.address,
        payment_method: data.paymentMethod,
        total_price: totalPrice,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price
        }))
      };

      await orderService.createOrder(orderData);
      
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Blush & Bloom. 🎉');
      
      if (onClearCart) onClearCart();
      onNavigate('home');
    } catch (error) {
      console.error('Checkout failed:', error);
      setServerError(error.response?.data?.error || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="page-banner-section">
        <div className="container">
          <div className="page-banner">
            <h1>Thanh toán</h1>
            <ul className="page-breadcrumb">
              <li><button onClick={() => onNavigate('home')}>Trang chủ</button></li>
              <li>Thanh toán</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="checkout-section">
        <div className="container">
          <form className="checkout-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="checkout-billing">
              <h4 className="checkout-title">Thông tin giao hàng</h4>
              
              {serverError && (
                <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                  {serverError}
                </div>
              )}

              <div className="checkout-form-group">
                <label className="checkout-form-label">Họ và tên *</label>
                <input 
                  type="text" 
                  className={`checkout-form-input ${errors.fullName ? 'input-error' : ''}`} 
                  placeholder="Nhập họ và tên của bạn" 
                  {...register('fullName')}
                />
                {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Địa chỉ email (Tự động) *</label>
                <input 
                  type="email" 
                  className="checkout-form-input" 
                  placeholder="name@example.com" 
                  readOnly
                  style={{ background: '#f8f8f8', cursor: 'not-allowed' }}
                  {...register('email')}
                />
                <small style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Email được lấy từ tài khoản của bạn.</small>
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Số điện thoại *</label>
                <input 
                  type="tel" 
                  className={`checkout-form-input ${errors.phone ? 'input-error' : ''}`} 
                  placeholder="09xx xxx xxx" 
                  {...register('phone')}
                />
                {errors.phone && <span className="field-error">{errors.phone.message}</span>}
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Địa chỉ nhận hàng *</label>
                <input 
                  type="text" 
                  className={`checkout-form-input ${errors.address ? 'input-error' : ''}`} 
                  placeholder="Số nhà, tên đường, phường/xã..." 
                  {...register('address')}
                />
                {errors.address && <span className="field-error">{errors.address.message}</span>}
              </div>

              <div className="checkout-terms">
                <input 
                  type="checkbox" 
                  id="shiping_address" 
                  {...register('shippingAddress')}
                />
                <label htmlFor="shiping_address">Giao hàng đến địa chỉ khác?</label>
              </div>

              {watchShippingAddress && (
                <div style={{ marginTop: '20px', padding: '20px', background: '#fdf2f4', borderRadius: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Vui lòng nhập ghi chú địa chỉ giao hàng chi tiết bên dưới.</p>
                  <div className="checkout-form-group" style={{ marginTop: '10px' }}>
                     <input 
                      type="text" 
                      className={`checkout-form-input ${errors.otherAddress ? 'input-error' : ''}`} 
                      placeholder="Địa chỉ giao hàng khác..." 
                      {...register('otherAddress')}
                    />
                    {errors.otherAddress && <span className="field-error">{errors.otherAddress.message}</span>}
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-summary">
              <div className="checkout-cart-total">
                <h4 className="checkout-title">Đơn hàng của bạn <span>Thành tiền</span></h4>
                
                <ul className="checkout-items-list">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} <strong style={{color: 'var(--pink-400)'}}>x {item.qty}</strong> 
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </li>
                  ))}
                  {cartItems.length === 0 && (
                    <li style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Giỏ hàng trống</li>
                  )}
                </ul>

                <div className="checkout-cart-summary-line" style={{ marginTop: '20px' }}>
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="checkout-cart-summary-line">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                
                <div className="checkout-cart-summary-line grand-total">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="checkout-payment-method">
                  <h4 className="checkout-title" style={{ border: 'none', marginBottom: '15px' }}>Phương thức thanh toán</h4>
                  
                  <div className="single-method">
                    <input 
                      type="radio" 
                      id="payment_cash" 
                      value="cash"
                      {...register('paymentMethod')}
                    />
                    <label htmlFor="payment_cash">Thanh toán khi nhận hàng (COD)</label>
                    {watch('paymentMethod') === 'cash' && (
                      <p style={{ fontSize: '12px', color: 'var(--text-soft)', marginLeft: '25px' }}>Trả tiền mặt khi giao hàng tận nơi.</p>
                    )}
                  </div>

                  <div className="single-method">
                    <input 
                      type="radio" 
                      id="payment_bank" 
                      value="bank"
                      {...register('paymentMethod')}
                    />
                    <label htmlFor="payment_bank">Chuyển khoản ngân hàng</label>
                  </div>

                  <div className="single-method">
                    <input 
                      type="radio" 
                      id="payment_paypal" 
                      value="paypal"
                      {...register('paymentMethod')}
                    />
                    <label htmlFor="payment_paypal">Thanh toán qua Ví điện tử</label>
                  </div>
                  {errors.paymentMethod && <span className="field-error">{errors.paymentMethod.message}</span>}
                </div>

                <div className="checkout-terms">
                  <input type="checkbox" id="accept_terms" {...register('acceptTerms')} />
                  <label htmlFor="accept_terms" style={{fontSize: '13px'}}>Tôi đã đọc và đồng ý với điều khoản & điều kiện của website *</label>
                  {errors.acceptTerms && <span className="field-error">{errors.acceptTerms.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="place-order" 
                  disabled={loading || cartItems.length === 0}
                  style={{ opacity: (loading || cartItems.length === 0) ? 0.6 : 1 }}
                >
                  {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .page-breadcrumb button {
          font-family: inherit;
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: var(--text-muted);
          cursor: pointer;
        }
        .page-breadcrumb button:hover {
          color: var(--pink-400);
        }
        .checkout-items-list {
          margin: 0;
          padding: 0;
          list-style: none;
          max-height: 250px;
          overflow-y: auto;
        }
        .checkout-items-list li {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #eee;
          font-size: 14px;
        }
        .checkout-items-list li span {
          font-weight: 600;
        }
        .field-error {
          color: #e24b4a;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }
        .input-error {
          border-color: #e24b4a !important;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
