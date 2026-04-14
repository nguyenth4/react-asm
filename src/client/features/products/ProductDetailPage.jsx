import React, { useState } from 'react';
import { formatCurrency } from '../../../shared/utils/format';
import './styles/product-detail.css';

const ProductDetailPage = ({ productId, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Lấy dữ liệu mock tạm thời (sau này thay bằng API fetch)
  const product = {
    id: productId || 1,
    name: 'Velvet Rose Matte Lipstick',
    category: 'Lips',
    price: 320000,
    oldPrice: null,
    rating: 4.8,
    reviews: 124,
    description: 'Một thỏi son lì mang lại màu sắc tươi tắn, kết cấu mịn màng và không làm khô môi. Velvet Rose Matte Lipstick chứa chiết xuất hoa hồng ngọt ngào cùng Vitamin E để duy trì độ ẩm cả ngày dài. Thiết kế vỏ nhôm mạ vàng hồng sang trọng, đem lại cảm giác cao cấp khi cầm trên tay.',
    ingredients: 'Dimethicone, Bis-Diglyceryl Polyacyladipate-2, Hydrogenated Polyisobutene, Phenyl Trimethicone, Tridecyl Trimellitate, Ozokerite, Hydrogenated Jojoba Oil...',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625025732168-52fb983637e1?q=80&w=800&auto=format&fit=crop'
    ]
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <div className="product-detail-layout">
      {/* Nút quay lại */}
      <button className="btn-back" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Quay lại danh sách
      </button>

      <div className="product-detail-main">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={product.images[0]} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, idx) => (
              <div key={idx} className={`thumbnail ${idx === 0 ? 'active' : ''}`}>
                <img src={img} alt={`${product.name} view ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info-section">
          <span className="product-category">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviews} đánh giá)</span>
            </div>
            <span className="stock-status in-stock">Còn hàng</span>
          </div>

          <div className="product-price-large">
            <span className="price">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <span className="old-price">{formatCurrency(product.oldPrice)}</span>
            )}
          </div>

          <p className="product-short-desc">
            {product.description}
          </p>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={handleDecrease} className="btn-qty">-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={handleIncrease} className="btn-qty">+</button>
            </div>
            <button className="btn-add-to-cart-large">
              Thêm vào giỏ - {formatCurrency(product.price * quantity)}
            </button>
          </div>

          <div className="product-perks">
            <div className="perk">
              <span className="perk-icon"><i className="bi bi-truck"></i></span>
              <span className="perk-text">Miễn phí giao hàng cho đơn từ 500.000đ</span>
            </div>
            <div className="perk">
              <span className="perk-icon">↩️</span>
              <span className="perk-text">Đổi trả miễn phí trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="tab-headers">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Mô tả sản phẩm
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Thành phần
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Đánh giá ({product.reviews})
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <h3>Thông tin chi tiết</h3>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <div className="tab-pane">
              <h3>Thành phần chính</h3>
              <p>{product.ingredients}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <h3>Đánh giá từ khách hàng</h3>
              <p>Chức năng đánh giá đang được cập nhật...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
