import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const categorySchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên danh mục'),
});

const CategoryModal = ({ isOpen, onClose, onSave, editingCategory }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(categorySchema)
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: editingCategory?.name || '',
      });
    }
  }, [isOpen, editingCategory, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave({
      ...data,
      status: true // Mặc định luôn kích hoạt vì checkbox đã bị ẩn đi
    });
  };

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mhead">
            <div className="mtitle">{editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}</div>
            <div className="mclose" onClick={onClose}>×</div>
          </div>
          <div className="mbody">
            <div className="m-group" style={{ marginBottom: '20px' }}>
              <label className="m-label">Tên danh mục *</label>
              <input 
                className={`m-input ${errors.name ? 'input-error' : ''}`} 
                name="name" 
                placeholder="Ví dụ: Nước hoa..." 
                {...register('name')}
              />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </div>
          </div>
          <div className="mfoot">
            <button type="button" className="btn-cancel2" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-save2">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
