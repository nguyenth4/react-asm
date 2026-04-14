/**
 * Formats a number as Vietnamese Dong (VNĐ / Đ)
 * Example: 320000 -> 320.000đ
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '0đ';
  
  // Use Intl.NumberFormat for Vietnamese locale
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};
