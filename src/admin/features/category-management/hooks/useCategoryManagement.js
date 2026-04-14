import { useState } from 'react';

const mockCategories = [
  { id: 1, name: 'Son môi', slug: 'son-moi', count: 124, status: true },
  { id: 2, name: 'Phấn má', slug: 'phan-ma', count: 45, status: true },
  { id: 3, name: 'Mắt & Kẻ mắt', slug: 'mat-ke-mat', count: 72, status: true },
  { id: 4, name: 'Dưỡng da', slug: 'duong-da', count: 86, status: true },
  { id: 5, name: 'Nước hoa', slug: 'nuoc-hoa', count: 30, status: false },
];

export const useCategoryManagement = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const toggleStatus = (id) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, status: !c.status } : c
    ));
  };

  const deleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
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

  const saveCategory = (catData) => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...catData } : c));
    } else {
      setCategories([...categories, { ...catData, id: Date.now(), count: 0 }]);
    }
    closeModal();
  };

  return {
    categories,
    showModal,
    editingCategory,
    openModal,
    closeModal,
    saveCategory,
    deleteCategory,
    toggleStatus
  };
};
