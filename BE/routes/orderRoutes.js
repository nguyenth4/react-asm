const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { checkJWT, isAdmin } = require('../controllers/authCheck');

router.post('/orders/checkout', checkJWT, OrderController.create);
router.get('/orders/list', OrderController.list);
router.get('/orders/my/:userId', OrderController.getByUser);
router.get('/orders/:id', OrderController.getById);
router.put('/orders/:id/status', OrderController.updateStatus);

module.exports = router;
