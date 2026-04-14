import { useState, useEffect } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'MAC Ruby Woo', sku: 'MAC001', brand: 'MAC Cosmetics', category: 'Son môi', price: 480000, originalPrice: 600000, stock: 45, soldCount: 1250, isVisible: true, isFeatured: true },
  { id: 2, name: 'Dior Satin 999', sku: 'DIOR001', brand: 'Dior Beauty', category: 'Son môi', price: 1250000, originalPrice: 1450000, stock: 12, soldCount: 840, isVisible: true, isFeatured: false },
  { id: 3, name: 'NARS Lipstick', sku: 'NARS002', brand: 'NARS Cosmetics', category: 'Son môi', price: 720000, originalPrice: null, stock: 85, soldCount: 520, isVisible: true, isFeatured: true },
  { id: 4, name: 'YSL Couture', sku: 'YSL005', brand: 'YSL Beauty', category: 'Son môi', price: 980000, originalPrice: 1150000, stock: 0, soldCount: 310, isVisible: false, isFeatured: false },
  { id: 5, name: 'Chanel Velvet', sku: 'CHA012', brand: 'Chanel', category: 'Son môi', price: 1450000, originalPrice: null, stock: 22, soldCount: 150, isVisible: true, isFeatured: false },
  { id: 6, name: 'Pillow Talk', sku: 'CT001', brand: 'Charlotte Tilbury', category: 'Phấn má', price: 850000, originalPrice: 950000, stock: 8, soldCount: 95, isVisible: true, isFeatured: true },
];

export const useProductManagement = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', brand: '', status: '', sort: 'newest' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.brand) result = result.filter(p => p.brand === filters.brand);
    if (filters.status) {
      result = result.filter(p => filters.status === 'active' ? p.isVisible : !p.isVisible);
    }
    if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'bestseller') result.sort((a, b) => b.soldCount - a.soldCount);
    else if (filters.sort === 'stock_asc') result.sort((a, b) => a.stock - b.stock);

    setFilteredProducts(result);
  }, [products, searchTerm, filters]);

  const toggleSelectAll = (checked) => {
    if (checked) setSelectedIds(filteredProducts.map(p => p.id));
    else setSelectedIds([]);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const saveProduct = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      setProducts([{ ...productData, id: Date.now(), soldCount: 0, isFeatured: false }, ...products]);
    }
    closeModal();
  };

  const deleteSelected = () => {
    if (window.confirm(`Xóa ${selectedIds.length} sản phẩm đã chọn?`)) {
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  return {
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
  };
};
