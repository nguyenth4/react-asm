import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../../shared/utils/format';
import orderService from '../../../../shared/services/orderService';

const STATUS_CONFIG = {
  pending:   { label: 'Chờ xử lý',  cls: 's-pending'   },
  shipping:  { label: 'Đang giao',  cls: 's-shipping'  },
  done:      { label: 'Hoàn thành', cls: 's-done'      },
  cancelled: { label: 'Đã hủy',    cls: 's-cancelled' },
};

const formatPrice = (v) =>
  Number(v).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const UserModal = ({ customer, isOpen, onClose }) => {
  const [orders, setOrders]       = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedId, setExpandedId]       = useState(null);

  // Fetch đơn hàng khi modal mở (chỉ cho khách hàng, không phải admin)
  useEffect(() => {
    if (!isOpen || !customer?.id || customer.role === 'admin') {
      setOrders([]);
      return;
    }
    setOrders([]);
    setExpandedId(null);
    setLoadingOrders(true);
    orderService.getMyOrders(customer.id)
      .then((data) => setOrders(data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [isOpen, customer?.id, customer?.role]);

  if (!isOpen || !customer) return null;

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const totalSpent = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total_price), 0);

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="mhead" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)', marginBottom: '4px' }}>HỒ SƠ NGƯỜI DÙNG</div>
            <div className="mtitle" style={{ fontSize: '20px', fontWeight: '700' }}>{customer.name}</div>
          </div>
          <div
            className="mclose"
            style={{ background: '#f3f4f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={onClose}
          >×</div>
        </div>

        {/* ── Body ── */}
        <div className="mbody">

          {/* Avatar + info */}
          <div className="cust-det-head">
            <div className="cust-det-av" style={{ background: customer.color }}>{customer.avatar}</div>
            <div className="cust-det-info">
              <h3>{customer.name}</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>Gia nhập từ {formatDate(customer.joined)}</span>
              </div>
            </div>
            {customer.role !== 'admin' && (
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Tổng chi tiêu</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#4f46e5' }}>{formatPrice(totalSpent)}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-soft)' }}>{orders.filter(o => o.status !== 'cancelled').length} đơn thành công</div>
              </div>
            )}
          </div>

          {/* Thông tin liên lạc */}
          <div className="det-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '20px' }}>
            <div className="det-box">
              <div className="det-box__title">Liên lạc &amp; Vai trò</div>
              <div className="det-item"><span className="det-lbl">Họ và tên</span><span className="det-val">{customer.name}</span></div>
              <div className="det-item"><span className="det-lbl">Email</span><span className="det-val">{customer.email}</span></div>
              <div className="det-item"><span className="det-lbl">Số điện thoại</span><span className="det-val">{customer.phone || 'Chưa cập nhật'}</span></div>
              <div className="det-item" style={{ borderBottom: 'none' }}>
                <span className="det-lbl">Vai trò</span>
                <span className="det-val" style={{
                  fontWeight: 600,
                  color: customer.role === 'admin' ? '#991B1B' : '#0369A1',
                  background: customer.role === 'admin' ? '#FEE2E2' : '#E0F2FE',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px'
                }}>
                  {customer.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                </span>
              </div>
            </div>
          </div>

          {/* ── Lịch sử đơn hàng (Chỉ hiện cho khách hàng) ── */}
          {customer.role !== 'admin' && (
            <>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                  Lịch sử đơn hàng
                </div>
                {!loadingOrders && (
                  <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: '600', borderRadius: '99px', padding: '2px 8px' }}>
                    {orders.length} đơn
                  </span>
                )}
              </div>

              {loadingOrders ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[1, 2].map((i) => (
                    <div key={i} style={{
                      height: '56px', borderRadius: '10px',
                      background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.4s infinite'
                    }} />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-soft)', fontSize: '14px' }}>
                  🛍️ Khách hàng chưa có đơn hàng nào
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {orders.map((order) => {
                    const cfg   = STATUS_CONFIG[order.status] || { label: order.status, cls: '' };
                    const items = order.OrderItems || [];
                    const isOpen = expandedId === order.id;

                    return (
                      <div key={order.id} style={{
                        border: `1.5px solid ${isOpen ? '#c7d2fe' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#fff',
                        boxShadow: isOpen ? '0 4px 16px rgba(99,102,241,0.08)' : 'none',
                        transition: 'all 0.2s'
                      }}>
                        {/* Row header */}
                        <button
                          onClick={() => toggle(order.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', padding: '12px 16px',
                            background: 'none', border: 'none', cursor: 'pointer', gap: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>#{order.id}</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                              {new Date(order.created_at).toLocaleDateString('vi-VN')}
                            </span>
                            <span className={`status-badge ${cfg.cls}`}>{cfg.label}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#4f46e5', fontVariantNumeric: 'tabular-nums' }}>
                              {formatPrice(order.total_price)}
                            </span>
                            <span style={{ fontSize: '18px', color: '#94a3b8', transform: isOpen ? 'rotate(-90deg)' : 'rotate(90deg)', display: 'inline-block', transition: 'transform 0.2s', lineHeight: 1 }}>›</span>
                          </div>
                        </button>

                        {/* Expandable items */}
                        {isOpen && (
                          <div style={{ borderTop: '1px solid #f1f5f9', padding: '12px 16px', background: '#fafbff' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                              Địa chỉ: {order.shipping_address || '—'}
                            </div>
                            {items.length === 0 ? (
                              <div style={{ color: '#94a3b8', fontSize: '13px' }}>Không có sản phẩm</div>
                            ) : (
                              <table className="det-table" style={{ margin: 0 }}>
                                <thead>
                                  <tr>
                                    <th>Sản phẩm</th>
                                    <th style={{ textAlign: 'center' }}>SL</th>
                                    <th style={{ textAlign: 'right' }}>Thành tiền</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.Product?.name || 'Sản phẩm'}</td>
                                      <td style={{ textAlign: 'center' }}>×{item.quantity}</td>
                                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                                        {formatPrice(item.price * item.quantity)}
                                      </td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td colSpan={2} style={{ borderBottom: 'none', fontWeight: 700, color: '#1e293b' }}>Tổng</td>
                                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#4f46e5', borderBottom: 'none' }}>
                                      {formatPrice(order.total_price)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mfoot" style={{ borderTop: '1px solid #edf2f7', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="bk-btn" style={{ height: '40px' }} onClick={onClose}>Đóng</button>
        </div>
      </div>

      {/* shimmer keyframe (inline để không cần file CSS riêng) */}
      <style>{`
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default UserModal;
