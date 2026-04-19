import { useState, useEffect } from 'react';
import categoryService from '../../../../shared/services/categoryService';

export const useCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await categoryService.updateCategory(id, { status: currentStatus ? 'hidden' : 'active' });
      fetchCategories();
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
        fetchCategories();
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
      const payload = {
        name: catData.name,
        status: catData.status ? 'active' : 'hidden'
      };

      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, payload);
        alert('Cập nhật thành công!');
      } else {
        await categoryService.createCategory(payload);
        alert('Thêm mới thành công!');
      }
      
      fetchCategories();
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
    openModal,
    closeModal,
    saveCategory,
    deleteCategory,
    toggleStatus
  };
};
