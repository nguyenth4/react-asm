/**
 * Chuyển đổi một chuỗi văn bản thành slug (đường dẫn thân thiện)
 * Hỗ trợ xử lý tiếng Việt có dấu.
 * 
 * @param {string} text - Chuỗi cần chuyển đổi
 * @returns {string} - Chuỗi slug kết quả
 */
function slugify(text) {
    if (!text) return '';
    
    let slug = text.toString().toLowerCase();

    // Chuyển ký tự có dấu thành không dấu
    slug = slug.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a');
    slug = slug.replace(/[éèẻẽẹêếềểễệ]/g, 'e');
    slug = slug.replace(/[íìỉĩị]/g, 'i');
    slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o');
    slug = slug.replace(/[úùủũụưứừửữự]/g, 'u');
    slug = slug.replace(/[ýỳỷỹỵ]/g, 'y');
    slug = slug.replace(/đ/g, 'd');

    // Xóa ký tự đặc biệt
    slug = slug.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    slug = slug.replace(/(\s+)/g, '-');

    // Xóa ký tự - ở đầu và cuối
    slug = slug.replace(/^-+/g, '');
    slug = slug.replace(/-+$/g, '');

    return slug;
}

module.exports = slugify;
