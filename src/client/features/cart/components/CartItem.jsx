import React from 'react';

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
          <span className="qty-val">{qty}</span>
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
          🗑
        </button>
        <div className="cart-item__price">${(price * qty).toFixed(2)}</div>
        {oldPrice && (
          <div className="cart-item__price-old">
            ${(oldPrice * qty).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
