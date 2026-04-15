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

/**
 * Tạo đường dẫn thân thiện từ chuỗi văn bản (ví dụ: "Sản phẩm A" -> "san-pham-a")
 * @param {string} text 
 * @returns {string}
 */
export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu (cho tiếng Việt)
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Thay thế khoảng trắng và ký tự đặc biệt bằng gạch ngang
    .replace(/^-+|-+$/g, ''); // Loại bỏ gạch ngang thừa ở đầu/cuối
};
