import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import CategoryTable from './components/CategoryTable';
import CategoryModal from './components/CategoryModal';
import CategoryStats from './components/CategoryStats';
import Toast from '../../../shared/components/common/Toast';
import { useCategoryManagement } from './hooks/useCategoryManagement';

const CategoryPage = ({ onNavigate }) => {
  const {
    categories,
    filteredCategories,
    searchTerm,
    setSearchTerm,
    boxFilter,
    setBoxFilter,
    filters,
    setFilters,
    toast,
    setToast,
    showModal,
    editingCategory,
    openModal,
    closeModal,
    saveCategory,
    deleteCategory,
    toggleStatus
  } = useCategoryManagement();

  return (
    <AdminLayout 
      activePage="admin_categories" 
      onNavigate={onNavigate} 
      title="Danh mục" 
      subTitle={`Quản lý ${categories.length} danh mục`}
    >
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      <CategoryStats 
        categories={categories} 
        boxFilter={boxFilter}
        setBoxFilter={setBoxFilter}
      />

      <div className="filter-bar">
        <input 
          type="text" 
          className="m-input" 
          style={{ width: '250px' }} 
          placeholder="Tìm tên danh mục..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="m-select"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hiện</option>
          <option value="hidden">Đang ẩn</option>
        </select>
        <div style={{ flex: 1 }}></div>
        <button className="btn-add" onClick={() => openModal()}>+ Thêm danh mục</button>
      </div>

      {/* BẢNG DỮ LIỆU (UI) */}
      <CategoryTable 
        categories={filteredCategories}
        onEdit={openModal}
        onDelete={deleteCategory}
        onToggleStatus={toggleStatus}
      />

      {/* MODAL THÊM/SỬA (UI) */}
      <CategoryModal 
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveCategory}
        editingCategory={editingCategory}
      />
    </AdminLayout>
  );
};

export default CategoryPage;
