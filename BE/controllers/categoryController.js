const CategoryModel = require('../models/category');
const ProductModel = require('../models/product');
const sequelize = require('../database');
const { Op } = require('sequelize');

class CategoryController {

    static async get(req, res) {
        try {
            const categories = await CategoryModel.findAll({
                attributes: [
                    'id', 'name', 'icon', 'description', 'status',
                    [sequelize.literal('(SELECT COUNT(*) FROM products WHERE products.category_id = Category.id)'), 'product_count'],
                    'created_at'
                ]
            });
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công",
                "data": categories,  
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id, {
                attributes: [
                    'id', 'name', 'icon', 'description', 'status',
                    [sequelize.literal('(SELECT COUNT(*) FROM products WHERE products.category_id = Category.id)'), 'product_count'],
                    'created_at'
                ]
            });

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "data": category
            });
        } catch (error) {
            console.error('Error fetching category by ID:', error);
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async create(req, res) {
        try {
            const { name, icon, description, status, product_count } = req.body;
            
            if (!name || name.trim() === "") {
                return res.status(400).json({ error: 'Tên danh mục không được để trống' });
            }

            // Normalize: trim and replace multiple spaces with a single space
            const normalizedName = name.trim().replace(/\s+/g, ' ');
            const existing = await CategoryModel.findOne({ 
                where: { name: normalizedName } 
            });

            if (existing) {
                return res.status(400).json({ error: 'Tên danh mục này đã tồn tại' });
            }

            const categoryData = { 
                name: normalizedName, 
                icon, 
                description, 
                status: status || 'active',
                product_count: 0 // Resetting to 0 as it will be calculated
            };
            const category = await CategoryModel.create(categoryData);

            res.status(201).json({
                message: "Thêm mới thành công",
                category
            });
        } catch (error) {
            console.error('Error creating category:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Tên danh mục này đã tồn tại' });
            }
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, icon, description, status, product_count } = req.body;

            const category = await CategoryModel.findByPk(id, {
                attributes: ['id', 'name', 'icon', 'description', 'status', 'product_count', 'created_at']
            });
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            if (name) {
                if (name.trim() === "") {
                    return res.status(400).json({ error: 'Tên danh mục không được để trống' });
                }

                // Normalize: trim and replace multiple spaces with a single space
                const normalizedName = name.trim().replace(/\s+/g, ' ');

                // Check for duplicate name excluding current category
                const existing = await CategoryModel.findOne({
                    where: {
                        name: normalizedName,
                        id: { [Op.ne]: id }
                    }
                });

                if (existing) {
                    return res.status(400).json({ error: 'Tên danh mục này đã tồn tại' });
                }
                category.name = normalizedName;
            }
            if (icon !== undefined) category.icon = icon;
            if (description !== undefined) category.description = description;
            if (status !== undefined) category.status = status;
            if (product_count !== undefined) category.product_count = product_count;

            await category.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                category
            });
        } catch (error) {
            console.error('Error updating category:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Tên danh mục này đã tồn tại' });
            }
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id, {
                attributes: ['id', 'name', 'icon', 'description', 'product_count', 'created_at']
            });
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            // Kiểm tra xem có sản phẩm nào thuộc danh mục này không
            const productCount = await ProductModel.count({ where: { category_id: id } });
            if (productCount > 0) {
                return res.status(400).json({ 
                    message: `Không thể xóa danh mục này vì vẫn còn ${productCount} sản phẩm bên trong. Vui lòng xóa hoặc di chuyển sản phẩm trước!` 
                });
            }

            await category.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            console.error('Error deleting category:', error);
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: "Không thể xóa do ràng buộc dữ liệu với sản phẩm." });
            }
            const message = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
            res.status(500).json({ error: message });
        }
    }
}

module.exports = CategoryController;
