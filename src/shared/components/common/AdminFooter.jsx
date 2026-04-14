import React from 'react';

const AdminFooter = () => {
  return (
    <footer style={{ 
      padding: '16px 26px', 
      background: '#fff', 
      borderTop: '1px solid var(--admin-border)', 
      fontSize: '12px', 
      color: 'var(--text-muted)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>© 2026 <strong>Blush & Bloom</strong> — Admin Control Panel</div>
      <div>Version 1.0.0 (Stable)</div>
    </footer>
  );
};

export default AdminFooter;
