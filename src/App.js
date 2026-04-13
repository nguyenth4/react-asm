import React, { useState } from 'react';
import ProductsPage from './client/features/products/ProductsPage';
import ProductDetailPage from './client/features/products/ProductDetailPage';
import './index.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="App">
      {selectedProductId ? (
        <ProductDetailPage 
          productId={selectedProductId} 
          onBack={() => setSelectedProductId(null)} 
        />
      ) : (
        <ProductsPage onProductClick={(id) => setSelectedProductId(id)} />
      )}
    </div>
  );
}

export default App;
