import React from 'react';
import { formatCurrency } from '../../../../shared/utils/format';

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const { id, name, category, price, oldPrice, image, qty } = item;

  return (
    <div className="cart-item">
      <div className="cart-item__img">
        <img src={image} alt={name} />
      </div>

      <div className="cart-item__info">
        <div className="cart-item__brand">{category}</div>
        <div className="cart-item__name">{name}</div>

        <div className="qty-ctrl">
          <button
            id={`qty-decrease-${id}`}
            className="qty-btn"
            onClick={() => onUpdateQty(id, qty - 1)}
            aria-label="Giảm số lượng"
          >
            −
          </button>
          <input
            type="number"
            className="qty-input-small"
            value={qty}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= 1) {
                onUpdateQty(id, val);
              }
            }}
            onBlur={(e) => {
               const val = parseInt(e.target.value);
               if (isNaN(val) || val < 1) onUpdateQty(id, 1);
            }}
            min="1"
          />
          <button
            id={`qty-increase-${id}`}
            className="qty-btn"
            onClick={() => onUpdateQty(id, qty + 1)}
            aria-label="Tăng số lượng"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item__right">
        <button
          id={`delete-item-${id}`}
          className="del-btn"
          onClick={() => onRemove(id)}
          aria-label="Xóa sản phẩm"
          title="Xóa"
        >
          <i className="bi bi-trash"></i>
        </button>
        <div className="cart-item__price">{formatCurrency(price * qty)}</div>
        {oldPrice && (
          <div className="cart-item__price-old">
            {formatCurrency(oldPrice * qty)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
