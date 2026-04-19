const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const OrderItemModel = require('../models/orderItem');

class ProductController {
    static async list(req, res) {
        try {
            const { category, brand, min_price, max_price, sort } = req.query;
            let whereClause = {};

            if (category) {
                whereClause.category_id = Number(category);
            }

            if (brand) {
                whereClause.brand = brand;
            }

            // Xử lý lọc giá (ví dụ)
            // if (min_price || max_price) { ... }

            const products = await ProductModel.findAll({
                where: whereClause,
                attributes: [
                    'id', 'name', 'brand', 'price', 'price_sale', 
                    'stock', 'status', 'image', 'category_id', 
                    'description', 'badge', 'review_count', 'created_at', 'updated_at'
                ],
                include: [{ 
                    model: CategoryModel,
                    attributes: ['id', 'name', 'icon', 'description', 'product_count', 'created_at']
                }]
            });

            res.status(200).json({
                status: 200,
                data: products
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async getById(req, res) {
        try {
            const product = await ProductModel.findByPk(req.params.id, {
                include: [{ 
                    model: CategoryModel,
                    attributes: ['id', 'name', 'icon', 'description', 'product_count', 'created_at']
                }]
            });
            if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            res.status(200).json({ status: 200, data: product });
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async create(req, res) {
        try {
            const productData = { ...req.body };
            const product = await ProductModel.create(productData);
            res.status(201).json({ status: 201, message: 'Thêm sản phẩm thành công', data: product });
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Tên sản phẩm này đã tồn tại' });
            }
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async update(req, res) {
        try {
            const product = await ProductModel.findByPk(req.params.id);
            if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            
            const updateData = { ...req.body };
            
            await product.update(updateData);
            res.status(200).json({ status: 200, message: 'Cập nhật thành công', data: product });
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Tên sản phẩm này đã tồn tại' });
            }
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async delete(req, res) {
        try {
            const product = await ProductModel.findByPk(req.params.id);
            if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

            // Xoá sản phẩm trong các đơn hàng trước (cascade delete thủ công) để tránh lỗi khoá ngoại
            await OrderItemModel.destroy({ where: { product_id: product.id } });

            await product.destroy();
            res.status(200).json({ status: 200, message: 'Xoá thành công' });
        } catch (error) {
            console.error('Error deleting product:', error);
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }
}

module.exports = ProductController;
