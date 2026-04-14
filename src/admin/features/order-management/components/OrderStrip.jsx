import React from 'react';

const OrderStrip = ({ orders, filterStatus, onFilterChange }) => {
  const getCount = (status) => status === '' ? orders.length : orders.filter(o => o.status === status).length;

  return (
    <div className="status-strip">
      <div 
        className={`ss all ${filterStatus === '' ? 'active-strip' : ''}`} 
        onClick={() => onFilterChange('')} 
        style={filterStatus === '' ? { borderTopColor: '#6B7280' } : {}}
      >
        <div className="ss__icon" style={{ background: '#F3F4F6' }}><i className="bi bi-receipt"></i></div>
        <div>
          <div className="ss__num">{getCount('')}</div>
          <div className="ss__lbl">Tất cả đơn</div>
        </div>
      </div>

      <div 
        className={`ss pend ${filterStatus === 'pending' ? 'active-strip' : ''}`} 
        onClick={() => onFilterChange('pending')} 
        style={filterStatus === 'pending' ? { borderTopColor: '#D97706' } : {}}
      >
        <div className="ss__icon" style={{ background: '#FFFBEB' }}><i className="bi bi-clock-history"></i></div>
        <div>
          <div className="ss__num" style={{ color: 'var(--gold)' }}>{getCount('pending')}</div>
          <div className="ss__lbl">Chờ xử lý</div>
        </div>
      </div>

      <div 
        className={`ss ship ${filterStatus === 'shipping' ? 'active-strip' : ''}`} 
        onClick={() => onFilterChange('shipping')} 
        style={filterStatus === 'shipping' ? { borderTopColor: '#3B82F6' } : {}}
      >
        <div className="ss__icon" style={{ background: '#EBF4FF' }}><i className="bi bi-truck"></i></div>
        <div>
          <div className="ss__num" style={{ color: 'var(--blue)' }}>{getCount('shipping')}</div>
          <div className="ss__lbl">Đang giao</div>
        </div>
      </div>

      <div 
        className={`ss done ${filterStatus === 'done' ? 'active-strip' : ''}`} 
        onClick={() => onFilterChange('done')} 
        style={filterStatus === 'done' ? { borderTopColor: '#10B981' } : {}}
      >
        <div className="ss__icon" style={{ background: '#E8F8F2' }}><i className="bi bi-check2-all"></i></div>
        <div>
          <div className="ss__num" style={{ color: 'var(--green)' }}>{getCount('done')}</div>
          <div className="ss__lbl">Hoàn thành</div>
        </div>
      </div>

      <div 
        className={`ss canc ${filterStatus === 'cancelled' ? 'active-strip' : ''}`} 
        onClick={() => onFilterChange('cancelled')} 
        style={filterStatus === 'cancelled' ? { borderTopColor: '#EF4444' } : {}}
      >
        <div className="ss__icon" style={{ background: '#FEF2F2' }}><i className="bi bi-x-circle"></i></div>
        <div>
          <div className="ss__num" style={{ color: 'var(--red)' }}>{getCount('cancelled')}</div>
          <div className="ss__lbl">Đã huỷ</div>
        </div>
      </div>
    </div>
  );
};

export default OrderStrip;
