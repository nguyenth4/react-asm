import React from 'react';

const ProductModal = ({ isOpen, onClose, onSave, editingProduct }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('name'),
      sku: formData.get('sku'),
      brand: formData.get('brand'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      originalPrice: Number(formData.get('originalPrice')) || null,
      stock: Number(formData.get('stock')),
      isVisible: formData.get('isVisible') === 'on'
    };
    onSave(productData);
  };

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="mhead">
            <div className="mtitle">{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</div>
            <div className="mclose" onClick={onClose}>×</div>
          </div>
          
          <div className="mbody">
            <div className="img-upload" onClick={() => alert('Chọn ảnh từ máy tính...')}>
              <div style={{ fontSize: '32px', color: 'var(--pink-400)', marginBottom: '10px' }}>
                <i className="bi bi-cloud-arrow-up"></i>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>
                Chọn ảnh sản phẩm hoặc kéo thả vào đây
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                Định dạng JPG, PNG, WEBP (Tối đa 5MB)
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Tên sản phẩm *</label>
                <input className="m-input" name="name" defaultValue={editingProduct?.name} placeholder="Nhập tên sản phẩm..." required />
              </div>
              <div className="m-group">
                <label className="m-label">Mã SKU *</label>
                <input className="m-input" name="sku" defaultValue={editingProduct?.sku} placeholder="Ví dụ: LIPS-001" required />
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Thương hiệu</label>
                <input className="m-input" name="brand" defaultValue={editingProduct?.brand} placeholder="Ví dụ: MAC, Dior..." />
              </div>
              <div className="m-group">
                <label className="m-label">Danh mục</label>
                <select className="m-select" name="category" defaultValue={editingProduct?.category || 'Son môi'}>
                  <option value="Son môi">Son môi</option>
                  <option value="Phấn má">Phấn má</option>
                  <option value="Mắt">Mắt</option>
                  <option value="Dưỡng da">Dưỡng da</option>
                </select>
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Giá bán hiện tại (VND) *</label>
                <input className="m-input" type="number" name="price" defaultValue={editingProduct?.price} required />
              </div>
              <div className="m-group">
                <label className="m-label">Giá gốc (nếu có)</label>
                <input className="m-input" type="number" name="originalPrice" defaultValue={editingProduct?.originalPrice} placeholder="Dùng để tính giảm giá" />
              </div>
            </div>

            <div className="m-row">
              <div className="m-group">
                <label className="m-label">Số lượng tồn kho *</label>
                <input className="m-input" type="number" name="stock" defaultValue={editingProduct?.stock} required />
              </div>
              <div className="m-group" style={{ justifyContent: 'center' }}>
                <label className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '12px' }}>
                  <input type="checkbox" name="isVisible" defaultChecked={editingProduct ? editingProduct.isVisible : true} style={{ width: '18px', height: '18px', accentColor: 'var(--pink-500)' }} />
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
