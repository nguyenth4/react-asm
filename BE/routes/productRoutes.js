const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { checkJWT, isAdmin } = require('../controllers/authCheck');
const upload = require('../middlewares/upload');

router.get('/products/list', ProductController.list);
router.get('/products/:id', ProductController.getById);

router.post('/products/add', upload.single('image'), ProductController.create);
router.put('/products/:id', upload.single('image'), ProductController.update);
router.delete('/products/:id', ProductController.delete);

module.exports = router;
