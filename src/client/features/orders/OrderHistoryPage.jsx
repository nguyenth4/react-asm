import React, { useState, useEffect } from 'react';
import orderService from '../../../shared/services/orderService';
import './styles/orderHistory.css';

const STATUS_CONFIG = {
  pending:   { label: 'Chờ xử lý',  cls: 'oh-badge--pending'   },
  shipping:  { label: 'Đang giao',  cls: 'oh-badge--shipping'  },
  done:      { label: 'Hoàn thành', cls: 'oh-badge--done'      },
  cancelled: { label: 'Đã hủy',    cls: 'oh-badge--cancelled' },
};

const formatPrice = (v) =>
  Number(v).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const formatDate = (d) => {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const OrderHistoryPage = ({ user, onNavigate }) => {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user) {
      onNavigate('login');
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders(user.id);
        setOrders(data || []);
      } catch (err) {
        setError('Không thể tải lịch sử đơn hàng. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filtered =
    filterStatus === 'all'
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="oh-page">
        <div className="oh-skeleton-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="oh-skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="oh-page">
        <div className="oh-empty">
          <div className="oh-empty__icon">⚠️</div>
          <p className="oh-empty__text">{error}</p>
          <button className="oh-btn-primary" onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="oh-page">
      {/* ── Header ── */}
      <div className="oh-header">
        <button className="oh-back-btn" onClick={() => onNavigate('home')}>
          ← Tiếp tục mua sắm
        </button>
        <div className="oh-title-wrap">
          <h1 className="oh-title">Lịch sử đơn hàng</h1>
          <span className="oh-subtitle">{user.name || user.email}</span>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="oh-filters">
        {['all', 'pending', 'shipping', 'done', 'cancelled'].map((s) => (
          <button
            key={s}
            className={`oh-filter-tab${filterStatus === s ? ' oh-filter-tab--active' : ''}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === 'all' ? 'Tất cả' : STATUS_CONFIG[s]?.label}
            {s === 'all' && <span className="oh-filter-count">{orders.length}</span>}
          </button>
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 ? (
        <div className="oh-empty">
          <div className="oh-empty__icon">🛍️</div>
          <p className="oh-empty__text">
            {filterStatus === 'all'
              ? 'Bạn chưa có đơn hàng nào.'
              : `Không có đơn hàng nào ở trạng thái "${STATUS_CONFIG[filterStatus]?.label}".`}
          </p>
          <button className="oh-btn-primary" onClick={() => onNavigate('products')}>
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div className="oh-list">
          {filtered.map((order) => {
            const isOpen = expandedId === order.id;
            const items  = order.OrderItems || [];
            const cfg    = STATUS_CONFIG[order.status] || { label: order.status, cls: '' };

            return (
              <div key={order.id} className={`oh-card${isOpen ? ' oh-card--open' : ''}`}>
                {/* ── Card header ── */}
                <button className="oh-card__head" onClick={() => toggle(order.id)}>
                  <div className="oh-card__meta">
                    <span className="oh-order-id">
                      {items.map(i => i.Product?.name).filter(Boolean).join(', ') || `Đơn hàng #${order.id}`}
                    </span>
                    <span className="oh-order-date">{formatDate(order.created_at || order.createdAt)}</span>
                  </div>
                  <div className="oh-card__right">
                    <span className={`oh-badge ${cfg.cls}`}>{cfg.label}</span>
                    <span className="oh-total">{formatPrice(order.total_price)}</span>
                    <span className={`oh-chevron${isOpen ? ' oh-chevron--up' : ''}`}>›</span>
                  </div>
                </button>

                {/* ── Expandable details ── */}
                {isOpen && (
                  <div className="oh-card__body">
                    {/* Info row */}
                    <div className="oh-info-grid">
                      <div className="oh-info-item">
                        <span className="oh-info-label">👤 Người nhận</span>
                        <span className="oh-info-value">{order.customer_name || '—'}</span>
                      </div>
                      <div className="oh-info-item">
                        <span className="oh-info-label">📞 SĐT</span>
                        <span className="oh-info-value">{order.phone || '—'}</span>
                      </div>
                      <div className="oh-info-item">
                        <span className="oh-info-label">📍 Địa chỉ</span>
                        <span className="oh-info-value">{order.shipping_address || '—'}</span>
                      </div>
                      <div className="oh-info-item">
                        <span className="oh-info-label">💳 Thanh toán</span>
                        <span className="oh-info-value">{order.payment_method || 'COD'}</span>
                      </div>
                    </div>

                    {/* Product list */}
                    <div className="oh-products">
                      <p className="oh-products__title">Sản phẩm ({items.length})</p>
                      {items.map((item) => (
                        <div key={item.id} className="oh-product-row">
                          <div className="oh-product-info">
                            <span className="oh-product-name">
                              {item.Product?.name || 'Sản phẩm'}
                            </span>
                            <span className="oh-product-qty">× {item.quantity}</span>
                          </div>
                          <span className="oh-product-price">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="oh-card__total-row">
                      <span>Tổng cộng</span>
                      <span className="oh-card__total-val">{formatPrice(order.total_price)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
