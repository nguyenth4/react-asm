import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';
import { formatPrice } from '../../../shared/utils/format';

const DashboardPage = ({ onNavigate }) => {
  return (
    <AdminLayout activePage="admin_dashboard" onNavigate={onNavigate} title="Dashboard">
      {/* STATS (UI) */}
      <DashboardStats />

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
        {/* RECENT ORDERS TABLE (UI partially extracted) */}
        <div className="data-table">
          <div className="data-table__head">
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Đơn hàng mới nhất</span>
            <button className="bk-btn" onClick={() => onNavigate('admin_orders')}>Xem tất cả</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#BB2601</td><td>Kiều Biên</td><td>MAC Lipstick ×2</td><td>{formatPrice(894000)}</td>
                  <td><span className="status-badge s-done">Hoàn thành</span></td>
                </tr>
                <tr>
                  <td>#BB2600</td><td>Trần Minh Thư</td><td>Rouge Dior ×1</td><td>{formatPrice(1250000)}</td>
                  <td><span className="status-badge s-shipping">Đang giao</span></td>
                </tr>
                <tr>
                  <td>#BB2599</td><td>Phạm Hồng Nhung</td><td>NARS Pencil ×3</td><td>{formatPrice(2160000)}</td>
                  <td><span className="status-badge s-pending">Chờ xử lý</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT ACTIVITY (UI) */}
        <div className="recent-activity-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div className="data-table__head" style={{ marginBottom: '20px', padding: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Hoạt động gần đây</span>
          </div>
          <RecentActivity />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
