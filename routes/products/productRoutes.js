const express = require('express');
const productController = require('../../features/products/index');
const middleware = require('../../config/authMiddleware');

const router = express.Router();

router.post('/products', middleware.authenticateToken, productController.createProduct);
router.get('/products', middleware.authenticateToken, productController.getAllProduct);
router.get('/product/:id', middleware.authenticateToken, productController.getProductById);
router.put('/edit/:id', middleware.authenticateToken, productController.editProduct);
router.delete('/delete/:id', middleware.authenticateToken, productController.deleteProduct);

module.exports = router;
