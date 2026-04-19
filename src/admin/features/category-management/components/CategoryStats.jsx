import React from 'react';

const CategoryStats = ({ categories, boxFilter, setBoxFilter }) => {
  const total = categories.length;
  const active = categories.filter(c => c.status).length;
  const hidden = categories.filter(c => !c.status).length;
  const hasProducts = categories.filter(c => c.count > 0).length;

  const handleBoxClick = (f) => {
    if (boxFilter === f) {
      setBoxFilter('all');
    } else {
      setBoxFilter(f);
    }
  };

  const getStyle = (f) => {
    return boxFilter === f 
      ? { cursor: 'pointer', outline: '2px solid var(--pink-500)', outlineOffset: '-2px' } 
      : { cursor: 'pointer' };
  };

  return (
    <div className="mini-stats">
      <div className="ms" onClick={() => handleBoxClick('all')} style={getStyle('all')}>
        <div className="ms__icon" style={{ background: '#F5F3FF' }}><i className="bi bi-grid-3x3-gap"></i></div>
        <div>
          <div className="ms__label">Tổng danh mục</div>
          <div className="ms__val">{total}</div>
        </div>
      </div>
      <div className="ms" onClick={() => handleBoxClick('active')} style={getStyle('active')}>
        <div className="ms__icon" style={{ background: '#F0F9FF' }}><i className="bi bi-eye"></i></div>
        <div>
          <div className="ms__label">Đang hiện</div>
          <div className="ms__val" style={{ color: 'var(--blue-500)' }}>{active}</div>
        </div>
      </div>
      <div className="ms" onClick={() => handleBoxClick('hidden')} style={getStyle('hidden')}>
        <div className="ms__icon" style={{ background: '#FFF1F2' }}><i className="bi bi-eye-slash"></i></div>
        <div>
          <div className="ms__label">Đang ẩn</div>
          <div className="ms__val" style={{ color: 'var(--red)' }}>{hidden}</div>
        </div>
      </div>
      <div className="ms" onClick={() => handleBoxClick('hasProducts')} style={getStyle('hasProducts')}>
        <div className="ms__icon" style={{ background: '#F0FDF4' }}><i className="bi bi-box-seam"></i></div>
        <div>
          <div className="ms__label">Có sản phẩm</div>
          <div className="ms__val" style={{ color: 'var(--green)' }}>{hasProducts}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
