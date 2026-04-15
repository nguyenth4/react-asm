import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../shared/utils/format';
import productService from '../../../shared/services/productService';
import './styles/product-detail.css';

const ProductDetailPage = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Không tìm thấy mã sản phẩm');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        
        // Map backend data to frontend format
        const mappedProduct = {
          ...data,
          category: data.Category?.name || 'Uncategorized',
          images: data.image ? [data.image] : ['https://via.placeholder.com/800'], // Fallback image if none
          rating: 5.0, // Default rating as BE doesn't have it yet
          reviews: data.review_count || 0,
          ingredients: 'Thông tin thành phần đang được cập nhật...' // Default as BE doesn't have it yet
        };
        
        setProduct(mappedProduct);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product detail:', err);
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  if (loading) return <div className="product-detail-loading">Đang tải thông tin sản phẩm...</div>;
  if (error) return (
    <div className="product-detail-error">
      <p>{error}</p>
      <button onClick={onBack} className="btn-back">Quay lại</button>
    </div>
  );
  if (!product) return null;

  return (
    <div className="product-detail-layout">
      {/* Nút quay lại */}
      <button className="btn-back" onClick={onBack}>
        <i className="bi bi-arrow-left" style={{ marginRight: '8px' }}></i>
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
              <span className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </span>
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
              <span className="perk-icon"><i className="bi bi-arrow-counterclockwise"></i></span>
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
