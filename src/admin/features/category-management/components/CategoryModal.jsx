import React from 'react';

const CategoryModal = ({ isOpen, onClose, onSave, editingCategory }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      name: formData.get('name'),
      slug: formData.get('slug'),
      status: formData.get('status') === 'on'
    });
  };

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="mhead">
            <div className="mtitle">{editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}</div>
            <div className="mclose" onClick={onClose}>×</div>
          </div>
          <div className="mbody">
            <div className="m-group" style={{ marginBottom: '20px' }}>
              <label className="m-label">Tên danh mục *</label>
              <input className="m-input" name="name" defaultValue={editingCategory?.name} placeholder="Ví dụ: Nước hoa..." required />
            </div>
            <div className="m-group" style={{ marginBottom: '20px' }}>
              <label className="m-label">Đường dẫn (Slug)</label>
              <input className="m-input" name="slug" defaultValue={editingCategory?.slug} placeholder="nuoc-hoa" />
            </div>
            <div className="m-group">
              <label className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="status"
                  defaultChecked={editingCategory ? editingCategory.status : true} 
                  style={{ width: '17px', height: '17px' }} 
                />
                <span>Kích hoạt danh mục</span>
              </label>
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
