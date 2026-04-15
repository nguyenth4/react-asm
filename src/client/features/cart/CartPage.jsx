import React, { useState } from 'react';
import CheckoutStepper from './components/CheckoutStepper';
import CartItem from './components/CartItem';
import CartSummary, { VALID_COUPONS } from './components/CartSummary';
import './styles/cart.css';

const SHIPPING_FEE = 30000;
const FREE_SHIP_THRESHOLD = 500000;

const CartPage = ({ cartItems, onUpdateQty, onRemove, onContinueShopping, onNavigate }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');
  const [couponStatus, setCouponStatus] = useState('');

  // ── Calculations ──────────────────────────────────────────
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const afterDiscount = subtotal - discount;
  const shippingFee = afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = afterDiscount + shippingFee;

  // ── Coupon handler ────────────────────────────────────────
  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMsg(<><i className="bi bi-check2"></i> Áp dụng mã "{code}" thành công! Giảm {VALID_COUPONS[code] * 100}%</>);
      setCouponStatus('success');
    } else {
      setAppliedCoupon(null);
      setCouponMsg(<><i className="bi bi-x-lg"></i> Mã giảm giá không hợp lệ.</>);
      setCouponStatus('error');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }
    onNavigate('checkout');
  };

  return (
    <>
      {/* Step bar */}
      <CheckoutStepper activeStep={0} />

      <div className="cart-layout">
        {/* ── Left: Cart items ── */}
        <div>
          <div className="cart-box">
            {/* Header */}
            <div className="cart-box__head">
              <div className="cart-box__title">Giỏ hàng của bạn</div>
              <span className="cart-box__count">{cartItems.length} sản phẩm</span>
            </div>

            {/* Empty state */}
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty__icon"><i className="bi bi-bag-x" style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem' }}></i></div>
                <p className="cart-empty__text">Giỏ hàng trống</p>
                <button
                  id="btn-go-shopping"
                  className="btn-primary"
                  onClick={onContinueShopping}
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              <>
                {/* Item list */}
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQty={onUpdateQty}
                    onRemove={onRemove}
                  />
                ))}

                {/* Footer */}
                <div className="cart-footer">
                  <button
                    id="btn-continue-shopping"
                    className="continue-btn"
                    onClick={onContinueShopping}
                  >
                    <i className="bi bi-arrow-left" style={{ marginRight: '8px' }}></i>Tiếp tục mua sắm
                  </button>
                  <span className="free-ship-note">
                    Miễn phí ship đơn từ 500.000đ <i className="bi bi-check2" style={{ marginLeft: '4px' }}></i>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Right: Summary ── */}
        <div>
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            total={total}
            couponCode={couponCode}
            couponMsg={couponMsg}
            couponStatus={couponStatus}
            onCouponChange={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </>
  );
};

export default CartPage;
