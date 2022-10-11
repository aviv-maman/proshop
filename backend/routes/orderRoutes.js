const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/').post(orderController.setUserIds, orderController.createOrder);

router.route('/:id').get(orderController.getOrder);
router.route('/:id/pay').patch(orderController.updateOrder);
module.exports = router;
