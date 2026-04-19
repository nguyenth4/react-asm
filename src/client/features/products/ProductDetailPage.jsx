import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../shared/utils/format';
import productService from '../../../shared/services/productService';
import './styles/product-detail.css';

const ProductDetailPage = ({ productId, initialData, onBack, onAddToCart }) => {
  // Rely on the central mapper in productService
  const mapProductData = (data) => data;

  const [product, setProduct] = useState(() => {
    return initialData ? mapProductData(initialData) : null;
  });
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    if (onAddToCart && product) {
      onAddToCart(product, quantity);
      alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Không tìm thấy mã sản phẩm');
        setLoading(false);
        return;
      }

      try {
        // Nếu chưa có dữ liệu ban đầu, hiện loading
        if (!product) setLoading(true);
        
        // Vẫn gọi API để đồng bộ dữ liệu mới nhất từ DB
        const data = await productService.getProductById(productId, true);
        const mappedProduct = mapProductData(data);
        
        setProduct(mappedProduct);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product detail:', err);
        // Nếu đã có product (từ initialData), không hiện lỗi nặng
        if (!product) {
          setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
        }
        setLoading(false);
      }
    };

    fetchProduct();
    // Scroll to top when productId changes
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <div className="product-actions-group">
            <div className="quantity-row">
              <span className="qty-label">Số lượng:</span>
              <div className="quantity-selector">
                <button onClick={handleDecrease} className="btn-qty">-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={handleIncrease} className="btn-qty">+</button>
              </div>
              <span className="stock-info">Còn {product.stock || 46} sản phẩm</span>
            </div>

            <div className="main-actions">
              <button className="btn-add-cart-alt" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus"></i> THÊM VÀO GIỎ
              </button>
              <button className="btn-buy-now" onClick={() => alert('Chức năng mua ngay đang phát triển')}>
                MUA NGAY
              </button>
              <button className="btn-action-icon">
                <i className="bi bi-share"></i>
              </button>
            </div>
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
