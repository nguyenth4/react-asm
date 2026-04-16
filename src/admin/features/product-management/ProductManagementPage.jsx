import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import ProductStats from './components/ProductStats';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import Toast from '../../../shared/components/common/Toast';
import { useProductManagement } from './hooks/useProductManagement';

const ProductManagementPage = ({ onNavigate }) => {
  const {
    products,
    categories,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    boxFilter,
    setBoxFilter,
    selectedIds,
    showModal,
    editingProduct,
    toggleSelectAll,
    toggleSelectOne,
    handleDelete,
    openModal,
    closeModal,
    saveProduct,
    deleteSelected,
    toast,
    setToast
  } = useProductManagement();

  return (
    <AdminLayout 
      activePage="admin_products" 
      onNavigate={onNavigate} 
      title="Quản lý sản phẩm" 
      subTitle={`Có tổng cộng ${products.length} sản phẩm`}
    >
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <ProductStats 
        products={products} 
        boxFilter={boxFilter}
        setBoxFilter={setBoxFilter}
      />

      {/* BỘ LỌC (UI) */}
      <ProductFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={setFilters}
        onAddClick={() => openModal()}
        categories={categories}
      />

      {/* BẢNG DỮ LIỆU (UI) */}
      <ProductTable 
        products={filteredProducts}
        selectedIds={selectedIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectOne={toggleSelectOne}
        onEdit={openModal}
        onDelete={handleDelete}
        onDeleteSelected={deleteSelected}
      />

      {/* MODAL THÊM/SỬA (UI) */}
      <ProductModal 
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveProduct}
        editingProduct={editingProduct}
        categories={categories}
      />
    </AdminLayout>
  );
};

export default ProductManagementPage;
