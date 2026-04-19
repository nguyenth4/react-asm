import { useState, useEffect } from 'react';
import categoryService from '../../../../shared/services/categoryService';

export const useCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxFilter, setBoxFilter] = useState('all'); // all | active | hidden | hasProducts
  const [filters, setFilters] = useState({ status: '' });
  const [toast, setToast] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      
      // Map data for UI
      const mappedData = data.map(c => ({
        ...c,
        status: c.status === 'active',
        count: c.product_count || 0
      }));

      setCategories(mappedData);
      setFilteredCategories(mappedData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    let result = [...categories];

    // Search filter
    if (searchTerm) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status dropdown filter
    if (filters.status) {
      const isActive = filters.status === 'active';
      result = result.filter(c => c.status === isActive);
    }

    // Box filter (Cards)
    if (boxFilter === 'active') {
      result = result.filter(c => c.status);
    } else if (boxFilter === 'hidden') {
      result = result.filter(c => !c.status);
    } else if (boxFilter === 'hasProducts') {
      result = result.filter(c => c.count > 0);
    }

    setFilteredCategories(result);
  }, [categories, searchTerm, filters, boxFilter]);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await categoryService.updateCategory(id, { status: currentStatus ? 'hidden' : 'active' });
      await fetchCategories();
      setToast('Cập nhật trạng thái thành công!');
    } catch (error) {
      alert('Không thể cập nhật trạng thái!');
    }
  };

  const deleteCategory = async (id) => {
    const category = categories.find(c => c.id === id);
    if (category && category.count > 0) {
      alert('Không thể xóa danh mục đã có sản phẩm!');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await categoryService.deleteCategory(id);
        await fetchCategories();
        setToast('Xóa danh mục thành công!');
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
        alert('Lỗi khi xóa: ' + errorMsg);
      }
    }
  };

  const openModal = (cat = null) => {
    setEditingCategory(cat);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const saveCategory = async (catData) => {
    try {
      const name = catData.name?.trim();
      
      if (!name) {
        alert('Vui lòng nhập tên danh mục!');
        return;
      }

      // Normalize internal spaces
      const normalizedName = name.replace(/\s+/g, ' ');

      // Local check for duplicates (case-insensitive)
      const isDuplicate = categories.some(c => 
        c.name.toLowerCase() === normalizedName.toLowerCase() && 
        c.id !== editingCategory?.id
      );

      if (isDuplicate) {
        alert('Tên danh mục này đã tồn tại!');
        return;
      }

      const payload = {
        name: normalizedName,
        status: catData.status ? 'active' : 'hidden'
      };

      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, payload);
        setToast('Cập nhật thành công!');
      } else {
        await categoryService.createCategory(payload);
        setToast('Thêm mới thành công!');
      }
      
      await fetchCategories();
      closeModal();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
      alert('Lỗi: ' + errorMsg);
    }
  };

  return {
    categories,
    loading,
    showModal,
    editingCategory,
    filteredCategories,
    searchTerm,
    setSearchTerm,
    boxFilter,
    setBoxFilter,
    filters,
    setFilters,
    toast,
    setToast,
    openModal,
    closeModal,
    saveCategory,
    deleteCategory,
    toggleStatus
  };
};
