const express = require("express");
const {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../services/productService');

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validators/productValidator')

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(createProductValidator, createProduct)

router.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct)

module.exports = router;