import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import UserStats from './components/UserStats';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import { useUserManagement } from './hooks/useUserManagement';

const CustomerManagementPage = ({ onNavigate }) => {
  const {
    customers,
    filteredCustomers,
    searchTerm,
    setSearchTerm,
    tierFilter,
    setTierFilter,
    selectedCustomer,
    openProfile,
    closeProfile
  } = useUserManagement();

  return (
    <AdminLayout activePage="admin_customers" onNavigate={onNavigate} title="Quản lý khách hàng">
      {/* THỐNG KÊ (UI) */}
      <UserStats customers={customers} />

      {/* BỘ LỌC (UI) */}
      <div className="filter-bar">
        <input 
          type="text" 
          className="fsel" 
          style={{ width: '250px' }} 
          placeholder="Tìm tên, email, SĐT..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select className="fsel" value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
          <option value="">Tất cả hạng</option>
          <option value="gold">Vàng</option>
          <option value="silver">Bạc</option>
          <option value="bronze">Đồng</option>
        </select>
        <div style={{ flex: 1 }}></div>
        <button 
          className="bk-btn" 
          style={{ background: '#378ADD', color: '#fff', border: 'none' }} 
          onClick={() => alert('Đã xuất Excel!')}
        >
          <i className="bi bi-file-earmark-excel" style={{ marginRight: '6px' }}></i> Xuất Excel
        </button>
      </div>

      {/* BẢNG DỮ LIỆU (UI) */}
      <UserTable 
        customers={filteredCustomers} 
        onViewProfile={openProfile} 
      />

      {/* MODAL HỒ SƠ (UI) */}
      <UserModal 
        customer={selectedCustomer} 
        isOpen={!!selectedCustomer} 
        onClose={closeProfile} 
      />
    </AdminLayout>
  );
};

export default CustomerManagementPage;
