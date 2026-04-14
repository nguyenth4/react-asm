import React from 'react';
import AdminLayout from '../../../shared/components/common/AdminLayout';
import ProductStats from './components/ProductStats';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import { useProductManagement } from './hooks/useProductManagement';

const ProductManagementPage = ({ onNavigate }) => {
  const {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedIds,
    showModal,
    editingProduct,
    toggleSelectAll,
    toggleSelectOne,
    handleDelete,
    openModal,
    closeModal,
    saveProduct,
    deleteSelected
  } = useProductManagement();

  return (
    <AdminLayout 
      activePage="admin_products" 
      onNavigate={onNavigate} 
      title="Quản lý sản phẩm" 
      subTitle={`Có tổng cộng ${products.length} sản phẩm`}
    >
      {/* GIAO DIỆN THỐNG KÊ (UI) */}
      <ProductStats products={products} />

      {/* BỘ LỌC (UI) */}
      <ProductFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={setFilters}
        onAddClick={() => openModal()}
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
      />
    </AdminLayout>
  );
};

export default ProductManagementPage;
