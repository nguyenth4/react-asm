const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Sử dụng memory storage để upload file vào bộ nhớ
// Sau đó image processing bằng sharp sẽ xử lý ảnh từ bộ nhớ trước khi ghi ra disk
const storage = multer.memoryStorage();

// Kiểm tra định dạng file
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Chỉ hỗ trợ upload các định dạng ảnh (jpeg, jpg, png, webp, gif)!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Tăng giới hạn lên 10MB để nhận ảnh gốc to, sau đó sharp nén lại
    fileFilter: fileFilter
});

module.exports = upload;
