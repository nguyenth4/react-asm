import React from 'react';

const STEPS = ['Giỏ hàng', 'Giao hàng', 'Thanh toán', 'Xác nhận'];

const CheckoutStepper = ({ activeStep = 0 }) => {
  return (
    <div className="checkout-stepper">
      {STEPS.map((label, idx) => (
        <React.Fragment key={label}>
          <div className={`step ${idx === activeStep ? 'step--active' : ''}`}>
            <div className="step__circle">{idx + 1}</div>
            <span className="step__label">{label}</span>
          </div>
          {idx < STEPS.length - 1 && <div className="step__line" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutStepper;
