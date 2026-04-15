import { useState, useEffect } from 'react';
import productService from '../../../../shared/services/productService';

export const useProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', brand: '', status: '', sort: 'newest' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      
      // Map data to match UI expectations
      const mappedData = data.map(p => ({
        ...p,
        brand: p.brand_name || 'N/A',
        category: p.category_name || 'N/A',
        originalPrice: p.original_price,
        soldCount: p.sold_count || 0,
        isVisible: p.status === 'active'
      }));

      setProducts(mappedData);
      setFilteredProducts(mappedData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(p => 
        (p.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (p.sku?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filters.category) result = result.filter(p => p.category_name === filters.category);
    if (filters.brand) result = result.filter(p => p.brand_name === filters.brand);
    if (filters.status) {
      result = result.filter(p => filters.status === 'active' ? p.status === 'active' : p.status !== 'active');
    }
    
    // Sort logic
    if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
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

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm: ' + (error.response?.data?.error || error.message));
      }
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

  const saveProduct = async (productData) => {
    // Chức năng lưu thực tế sẽ được làm sau, hiện tại reload lại danh sách
    await fetchProducts();
    closeModal();
  };

  const deleteSelected = async () => {
    if (window.confirm(`Xóa ${selectedIds.length} sản phẩm đã chọn?`)) {
       // Loop delete logic or batch delete API call
       alert('Chức năng xóa nhiều đang phát triển');
    }
  };

  return {
    products,
    loading,
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
