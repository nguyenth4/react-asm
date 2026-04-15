import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import AdminFooter from './AdminFooter';
import '../../../admin/styles/Admin.css';

const AdminLayout = ({ activePage, onNavigate, title, subTitle, children, user, onLogout }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="admin-main">
        <AdminTopbar title={title} subTitle={subTitle} user={user} />
        <div className="admin-content" style={{ flex: 1 }}>
          {children}
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
