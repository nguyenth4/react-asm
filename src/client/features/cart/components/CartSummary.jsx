import React from 'react';
import { formatCurrency } from '../../../../shared/utils/format';

const VALID_COUPONS = {
  BLOOM10: 0.10,
  BLUSH20: 0.20,
  SALE30:  0.30,
};

const CartSummary = ({
  subtotal,
  discount,
  shippingFee,
  total,
  couponCode,
  couponMsg,
  couponStatus,
  onCouponChange,
  onApplyCoupon,
  onCheckout,
}) => {
  return (
    <div className="summary-box">
      <div className="summary-box__title">Tóm tắt đơn hàng</div>

      <div className="summary-row">
        <span>Tạm tính</span>
        <span id="subtotal-val">{formatCurrency(subtotal)}</span>
      </div>

      {discount > 0 && (
        <div className="summary-row">
          <span>Giảm giá</span>
          <span id="discount-val" className="discount-val">
            -{formatCurrency(discount)}
          </span>
        </div>
      )}

      <div className="summary-row">
        <span>Phí vận chuyển</span>
        <span id="ship-val">
          {shippingFee === 0 ? <>Miễn phí <i className="bi bi-check2"></i></> : formatCurrency(shippingFee)}
        </span>
      </div>

      <div className="summary-total">
        <span className="summary-total__label">Tổng cộng</span>
        <span className="summary-total__val" id="total-val">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Coupon inside summary */}
      <div className="coupon-row">
        <div className="coupon-input-wrap" style={{ position: 'relative', flex: 1 }}>
          <i className="bi bi-ticket-perforated" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-soft)' }}></i>
          <input
            id="coupon-input"
            className="coupon-input"
            type="text"
            placeholder="Nhập mã giảm giá..."
            style={{ paddingLeft: '36px' }}
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onApplyCoupon()}
          />
        </div>
        <button id="coupon-apply-btn" className="coupon-btn" onClick={onApplyCoupon}>
          Áp dụng
        </button>
      </div>

      {couponMsg && (
        <div className={`coupon-msg ${couponStatus}`}>{couponMsg}</div>
      )}

      <button id="checkout-btn" className="btn-checkout" onClick={onCheckout}>
        Đặt hàng ngay <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i>
      </button>

      <p className="secure-note"><i className="bi bi-shield-lock-fill" style={{ marginRight: '6px' }}></i> Thanh toán được bảo mật SSL</p>

      <div className="pay-icons">
        {['VISA', 'Master', 'MoMo', 'ZaloPay', 'COD'].map((m) => (
          <span key={m} className="pay-icon">{m}</span>
        ))}
      </div>
    </div>
  );
};

export { VALID_COUPONS };
export default CartSummary;
