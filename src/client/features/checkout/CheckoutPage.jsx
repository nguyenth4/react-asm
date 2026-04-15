import React, { useState, useEffect } from 'react';
import orderService from '../../../shared/services/orderService';

const CheckoutPage = ({ onNavigate, cartItems = [], user, onClearCart }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    shippingAddress: false,
    paymentMethod: 'cash'
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tự động điền thông tin user khi có dữ liệu
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setErrorMsg('Giỏ hàng của bạn đang trống.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const orderData = {
        user_id: user ? user.id : null,
        customer_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shipping_address: formData.address,
        payment_method: formData.paymentMethod,
        total_price: totalPrice,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price
        }))
      };

      const response = await orderService.createOrder(orderData);
      
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Blush & Bloom. 🎉');
      
      // Xóa giỏ hàng
      if (onClearCart) onClearCart();
      
      onNavigate('home');
    } catch (error) {
      console.error('Checkout failed:', error);
      setErrorMsg(error.response?.data?.error || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      {/* Page Banner */}
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
          {errorMsg && (
            <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}
          
          <form className="checkout-grid" onSubmit={handleSubmit}>
            {/* Cột Trái: Billing Details */}
            <div className="checkout-billing">
              <h4 className="checkout-title">Thông tin giao hàng</h4>
              
              <div className="checkout-form-group">
                <label className="checkout-form-label">Họ và tên *</label>
                <input 
                  type="text" 
                  name="fullName"
                  className="checkout-form-input" 
                  placeholder="Nhập họ và tên của bạn" 
                  required 
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Địa chỉ email (Tự động) *</label>
                <input 
                  type="email" 
                  name="email"
                  className="checkout-form-input" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  readOnly
                  style={{ background: '#f8f8f8', cursor: 'not-allowed' }}
                />
                <small style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Email được lấy từ tài khoản của bạn.</small>
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Số điện thoại *</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="checkout-form-input" 
                  placeholder="09xx xxx xxx" 
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-form-group">
                <label className="checkout-form-label">Địa chỉ nhận hàng *</label>
                <input 
                  type="text" 
                  name="address"
                  className="checkout-form-input" 
                  placeholder="Số nhà, tên đường, phường/xã..." 
                  required 
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-terms">
                <input 
                  type="checkbox" 
                  id="shiping_address" 
                  name="shippingAddress"
                  checked={formData.shippingAddress}
                  onChange={handleInputChange}
                />
                <label htmlFor="shiping_address">Giao hàng đến địa chỉ khác?</label>
              </div>

              {formData.shippingAddress && (
                <div style={{ marginTop: '20px', padding: '20px', background: '#fdf2f4', borderRadius: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Vui lòng nhập ghi chú địa chỉ giao hàng chi tiết bên dưới.</p>
                  <div className="checkout-form-group" style={{ marginTop: '10px' }}>
                     <input type="text" className="checkout-form-input" placeholder="Địa chỉ giao hàng khác..." />
                  </div>
                </div>
              )}
            </div>

            {/* Cột Phải: Order Summary */}
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
                    <li>Giỏ hàng trống</li>
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
                      name="paymentMethod" 
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment_cash">Thanh toán khi nhận hàng (COD)</label>
                    {formData.paymentMethod === 'cash' && (
                      <p>Trả tiền mặt khi giao hàng tận nơi.</p>
                    )}
                  </div>

                  <div className="single-method">
                    <input 
                      type="radio" 
                      id="payment_bank" 
                      name="paymentMethod" 
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment_bank">Chuyển khoản ngân hàng</label>
                  </div>

                  <div className="single-method">
                    <input 
                      type="radio" 
                      id="payment_paypal" 
                      name="paymentMethod" 
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment_paypal">Thanh toán qua Ví điện tử</label>
                  </div>
                </div>

                <div className="checkout-terms">
                  <input type="checkbox" id="accept_terms" required />
                  <label htmlFor="accept_terms" style={{fontSize: '13px'}}>Tôi đã đọc và đồng ý với điều khoản & điều kiện của website *</label>
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
      `}</style>
    </div>
  );
};

export default CheckoutPage;
