/**
 * Định dạng số thành tiền tệ VNĐ
 * @param {number} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

export const formatCurrency = formatPrice;


/**
 * Định dạng ngày tháng năm giờ phút (dd/mm/yyyy hh:mm)
 * @param {string|Date} dateString 
 * @returns {string}
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${d}/${m}/${y} ${h}:${min}`;
};

/**
 * Định dạng ngày tháng (dd/mm/yyyy)
 * @param {string|Date} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

