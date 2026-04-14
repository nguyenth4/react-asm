import { useState } from 'react';

const CUSTOMERS = [
  { id: 1, name: 'Kiều Biên', email: 'kieubien@email.com', phone: '0912345678', tier: 'gold', points: 5000, orders: 12, spent: 14800000, joined: '2024-01-01', avatar: 'KB', color: '#C95E85' },
  { id: 2, name: 'Nguyễn Lan Anh', email: 'lananh@email.com', phone: '0987654321', tier: 'gold', points: 1250, orders: 5, spent: 4200000, joined: '2024-06-15', avatar: 'LA', color: '#E88DAE' },
  { id: 3, name: 'Trần Minh Thư', email: 'minhthu@email.com', phone: '0901234567', tier: 'silver', points: 620, orders: 3, spent: 2800000, joined: '2024-08-20', avatar: 'TM', color: '#C8963E' },
  { id: 4, name: 'Phạm Hồng Nhung', email: 'hongnhung@email.com', phone: '0934567890', tier: 'silver', points: 380, orders: 2, spent: 1960000, joined: '2025-01-10', avatar: 'PH', color: '#A060C0' },
  { id: 5, name: 'Võ Thị Thu', email: 'vothu@email.com', phone: '0965432109', tier: 'bronze', points: 120, orders: 1, spent: 980000, joined: '2025-03-05', avatar: 'VT', color: '#378ADD' },
  { id: 6, name: 'Ngô Thị Tuyết', email: 'ngothuyet@email.com', phone: '0978901234', tier: 'bronze', points: 0, orders: 1, spent: 0, joined: '2026-03-15', avatar: 'NT', color: '#E24B4A' },
];

export const useUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = CUSTOMERS.filter(c => {
    const mq = !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.includes(searchTerm) || c.phone.includes(searchTerm);
    const mt = !tierFilter || c.tier === tierFilter;
    return mq && mt;
  });

  const openProfile = (customer) => setSelectedCustomer(customer);
  const closeProfile = () => setSelectedCustomer(null);

  return {
    customers: CUSTOMERS,
    filteredCustomers: filtered,
    searchTerm,
    setSearchTerm,
    tierFilter,
    setTierFilter,
    selectedCustomer,
    openProfile,
    closeProfile
  };
};
