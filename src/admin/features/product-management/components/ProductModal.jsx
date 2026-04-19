import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  brand: yup.string(),
  category_id: yup.string().required('Vui lòng chọn danh mục'),
  price: yup.number().typeError('Giá gốc phải là số').required('Vui lòng nhập giá').min(0, 'Giá không thể âm'),
  price_sale: yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).typeError('Giá khuyến mãi phải là số').min(0, 'Giá KM không thể âm')
     .test('is-less-than-price', 'Giá khuyến mãi không được lớn hơn giá gốc', function(value) {
         if (!value) return true;
         return value <= this.parent.price;
     }),
  stock: yup.number().typeError('Số lượng phải là số').required('Vui lòng nhập số lượng').min(0, 'Số lượng không thể âm'),
  isVisible: yup.boolean()
});

const ProductModal = ({ isOpen, onClose, onSave, editingProduct, categories = [] }) => {
  const [imagePreview, setImagePreview] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema)
  });

  useEffect(() => {
    if (isOpen) {
      setImagePreview(editingProduct?.image || '');
      reset({
        name: editingProduct?.name || '',
        brand: editingProduct?.brand || '',
        category_id: editingProduct?.category_id?.toString() || '',
        price: editingProduct?.price || 0,
        price_sale: editingProduct?.price_sale || null,
        stock: editingProduct?.stock || 0,
        isVisible: editingProduct ? editingProduct.isVisible : true
      });
    }
  }, [isOpen, editingProduct, reset]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    onSave({
      ...data,
      category_id: Number(data.category_id),
      image: imagePreview
    });
  };

  return (
    <div className="modal-overlay show">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mhead">
            <div className="mtitle">{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</div>
            <div className="mclose" onClick={onClose}>×</div>
          </div>
          
          <div className="mbody">
            <div className={`img-upload ${!imagePreview ? 'has-error' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                  opacity: 0, cursor: 'pointer', zIndex: 2 
                }} 
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
              ) : (
                <>
                  <div style={{ fontSize: '32px', color: 'var(--pink-400)', marginBottom: '10px' }}>
                    <i className="bi bi-cloud-arrow-up"></i>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Nhấn vào đây để tải ảnh lên
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                    Định dạng JPG, PNG, WEBP
                  </div>
                </>
              )}
            </div>

            <div className="m-group">
              <label className="m-label">Tên sản phẩm *</label>
              <input 
                className={`m-input ${errors.name ? 'input-error' : ''}`} 
                name="name" 
                placeholder="Nhập tên sản phẩm..." 
                {...register('name')}
              />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Thương hiệu</label>
                <input 
                  className={`m-input ${errors.brand ? 'input-error' : ''}`} 
                  name="brand" 
                  placeholder="Ví dụ: MAC, Dior..." 
                  {...register('brand')}
                />
                {errors.brand && <span className="field-error">{errors.brand.message}</span>}
              </div>
              <div className="m-group">
                <label className="m-label">Danh mục *</label>
                <select 
                  className={`m-select ${errors.category_id ? 'input-error' : ''}`} 
                  name="category_id" 
                  {...register('category_id')}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.category_id && <span className="field-error">{errors.category_id.message}</span>}
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Giá gốc (VND) *</label>
                <input 
                  className={`m-input ${errors.price ? 'input-error' : ''}`} 
                  type="number" 
                  name="price" 
                  {...register('price')}
                />
                {errors.price && <span className="field-error">{errors.price.message}</span>}
              </div>
              <div className="m-group">
                <label className="m-label">Giá khuyến mãi (nếu có)</label>
                <input 
                  className={`m-input ${errors.price_sale ? 'input-error' : ''}`} 
                  type="number" 
                  name="price_sale" 
                  placeholder="Khuyến mãi phải nhỏ hơn giá gốc" 
                  {...register('price_sale')}
                />
                {errors.price_sale && <span className="field-error">{errors.price_sale.message}</span>}
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Số lượng tồn kho *</label>
                <input 
                  className={`m-input ${errors.stock ? 'input-error' : ''}`} 
                  type="number" 
                  name="stock" 
                  {...register('stock')}
                />
                {errors.stock && <span className="field-error">{errors.stock.message}</span>}
              </div>
              <div className="m-group" style={{ justifyContent: 'center' }}>
                <label className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '12px' }}>
                  <input 
                    type="checkbox" 
                    name="isVisible" 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--pink-500)' }} 
                    {...register('isVisible')}
                  />
                  <span>Hiển thị trên cửa hàng</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mfoot">
            <button type="button" className="btn-cancel2" onClick={onClose}>Hủy bỏ</button>
            <button type="submit" className="btn-save2">
              <i className="bi bi-save" style={{ marginRight: '8px' }}></i>
              {editingProduct ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
