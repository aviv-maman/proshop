const express = require('express');
const productController = require('../controllers/productController');
// const Product = require('../models/productModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// router.get(
//   '/',
//   catchAsync(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// router.get('/:id', async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new AppError('No product found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     product: product,
//   });
// });

router.route('/').get(productController.getAllProducts);

router.route('/:id').get(productController.getProduct);

module.exports = router;
