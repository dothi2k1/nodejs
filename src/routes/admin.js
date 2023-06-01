const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController')

router.use('/product/:id', productController.editProduct)
router.use('/product', productController.product)

module.exports = router;