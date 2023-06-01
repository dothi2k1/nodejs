const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController')

router.use('/product/detail', productController.detail)
router.use('/editProduct', productController.editProduct)
router.use('/product', productController.product)

module.exports = router;