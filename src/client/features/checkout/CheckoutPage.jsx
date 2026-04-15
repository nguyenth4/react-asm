import React, { useState } from 'react';
import orderService from '../../../shared/services/orderService';

const CheckoutPage = ({ onNavigate, cartItems = [] }) => {
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

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

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

      await orderService.createOrder(orderData);
      
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Blush & Bloom. 🎉');
      // Xóa giỏ hàng sau khi đặt hàng (Cần được xử lý ở App.js thông qua một prop callback nếu muốn triệt để)
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
                <label className="checkout-form-label">Địa chỉ email *</label>
                <input 
                  type="email" 
                  name="email"
                  className="checkout-form-input" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                />
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
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Vui lòng nhập địa chỉ giao hàng chi tiết bên dưới.</p>
                  <div className="checkout-form-group" style={{ marginTop: '10px' }}>
                     <input type="text" className="checkout-form-input" placeholder="Địa chỉ giao hàng khác..." />
                  </div>
                </div>
              )}
            </div>

            {/* Cột Phải: Order Summary */}
            <div className="checkout-summary">
              <div className="checkout-cart-total">
                <h4 className="checkout-title">Đơn hàng của bạn <span>Tổng cộng</span></h4>
                
                <ul>
                  <li>Teritory Quentily X 01 <span>480.000đ</span></li>
                  <li>Adurite Silocone X 02 <span>720.000đ</span></li>
                  <li>Baizidale Momone X 01 <span>1.250.000đ</span></li>
                </ul>

                <div className="checkout-cart-summary-line" style={{ marginTop: '20px' }}>
                  <span>Tạm tính</span>
                  <span>2.450.000đ</span>
                </div>
                <div className="checkout-cart-summary-line">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                
                <div className="checkout-cart-summary-line grand-total">
                  <span>Tổng tiền</span>
                  <span>2.450.000đ</span>
                </div>

                <div className="checkout-payment-method">
                  <h4 className="checkout-title" style={{ border: 'none', marginBottom: '15px' }}>Phương thức thanh toán</h4>
                  
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
                    {formData.paymentMethod === 'bank' && (
                      <p>Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ được giao sau khi tiền đã chuyển.</p>
                    )}
                  </div>

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
                      id="payment_paypal" 
                      name="paymentMethod" 
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment_paypal">Cổng thanh toán MoMo / ZaloPay</label>
                  </div>
                </div>

                <div className="checkout-terms">
                  <input type="checkbox" id="accept_terms" required />
                  <label htmlFor="accept_terms">Tôi đã đọc và đồng ý với điều khoản & điều kiện của website *</label>
                </div>

                <button type="submit" className="place-order">XÁC NHẬN ĐẶT HÀNG</button>
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
      `}</style>
    </div>
  );
};

export default CheckoutPage;
