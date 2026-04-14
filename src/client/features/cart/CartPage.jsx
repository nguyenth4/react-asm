import React, { useState } from 'react';
import CheckoutStepper from './components/CheckoutStepper';
import CartItem from './components/CartItem';
import CartSummary, { VALID_COUPONS } from './components/CartSummary';
import './styles/cart.css';

const SHIPPING_FEE = 5.99;
const FREE_SHIP_THRESHOLD = 50;

const CartPage = ({ cartItems, onUpdateQty, onRemove, onContinueShopping }) => {
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
      setCouponMsg(`✓ Áp dụng mã "${code}" thành công! Giảm ${VALID_COUPONS[code] * 100}%`);
      setCouponStatus('success');
    } else {
      setAppliedCoupon(null);
      setCouponMsg('✗ Mã giảm giá không hợp lệ.');
      setCouponStatus('error');
    }
  };

  const handleCheckout = () => {
    alert('🎉 Chức năng thanh toán đang được phát triển!');
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
                <div className="cart-empty__icon">🛒</div>
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
                    ← Tiếp tục mua sắm
                  </button>
                  <span className="free-ship-note">
                    Miễn phí ship đơn từ ${FREE_SHIP_THRESHOLD} ✓
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
