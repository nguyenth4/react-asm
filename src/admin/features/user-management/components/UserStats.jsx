import React from 'react';

const UserStats = ({ customers }) => {
  return (
    <div className="stats-row">
      <div className="sc">
        <div className="sc__icon" style={{ background: '#F0F9FF' }}>
          <i className="bi bi-people" style={{ color: '#3B82F6' }}></i>
        </div>
        <div>
          <div className="sc__label">Tổng khách hàng</div>
          <div className="sc__val">{customers.length}</div>
        </div>
      </div>
      <div className="sc">
        <div className="sc__icon" style={{ background: '#ECFDF5' }}>
          <i className="bi bi-person-plus" style={{ color: '#10B981' }}></i>
        </div>
        <div>
          <div className="sc__label">Mới tháng này</div>
          <div className="sc__val" style={{ color: 'var(--green)' }}>2</div>
        </div>
      </div>
      <div className="sc">
        <div className="sc__icon" style={{ background: '#FFFBEB' }}>
          <i className="bi bi-star-fill" style={{ color: '#D97706' }}></i>
        </div>
        <div>
          <div className="sc__label">Hạng Vàng</div>
          <div className="sc__val" style={{ color: 'var(--gold)' }}>2</div>
        </div>
      </div>
      <div className="sc">
        <div className="sc__icon" style={{ background: '#FDF2F8' }}>
          <i className="bi bi-cash-stack" style={{ color: '#DB2777' }}></i>
        </div>
        <div>
          <div className="sc__label">Doanh thu TB</div>
          <div className="sc__val">1.3M</div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
