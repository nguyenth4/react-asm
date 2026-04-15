import { useState, useEffect } from 'react';
import userService from '../../../../shared/services/userService';

export const useUserManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      // Map data to match UI expectations if needed
      const mappedData = data.map(u => ({
        ...u,
        name: u.lastName ? `${u.firstName} ${u.lastName}` : (u.firstName || 'Không rõ'),
        avatar: (u.firstName?.charAt(0) || 'U').toUpperCase(),
        color: '#378ADD',
        joined: u.createdAt || u.created_at
      }));
      setCustomers(mappedData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredCustomers = customers.filter(c => {
    const mq = !searchTerm || 
               c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
               c.email?.includes(searchTerm) || 
               c.phone?.includes(searchTerm);
    const mt = !tierFilter || c.role === tierFilter; // Using role as tier for now
    return mq && mt;
  });

  const openProfile = (customer) => setSelectedCustomer(customer);
  const closeProfile = () => setSelectedCustomer(null);

  const updateUserRole = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole);
      setCustomers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      // Cập nhật luôn selectedCustomer để Modal thay đổi thông tin ngay lập tức
      if (selectedCustomer && selectedCustomer.id === userId) {
        setSelectedCustomer(prev => ({ ...prev, role: newRole }));
      }
      alert('Cập nhật vai trò thành công!');
    } catch (error) {
      alert('Lỗi khi cập nhật vai trò: ' + (error.response?.data?.message || error.message));
    }
  };

  return {
    customers,
    loading,
    filteredCustomers,
    searchTerm,
    setSearchTerm,
    tierFilter,
    setTierFilter,
    selectedCustomer,
    openProfile,
    closeProfile,
    updateUserRole
  };
};
