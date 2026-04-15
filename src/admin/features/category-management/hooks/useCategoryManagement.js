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

  const toggleStatus = async (id) => {
    // Tạm thời chỉ cập nhật UI, thực tế sẽ gọi API cập nhật status
    setCategories(categories.map(c => 
      c.id === id ? { ...c, status: !c.status } : c
    ));
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        // Gọi API xóa ở đây (giả định)
        // await categoryService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        alert('Không thể xóa danh mục!');
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
    // Chức năng thêm/sửa thực tế sẽ được làm sau, hiện chỉ cập nhật UI
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...catData } : c));
    } else {
      setCategories([...categories, { ...catData, id: Date.now(), count: 0, status: true }]);
    }
    closeModal();
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
