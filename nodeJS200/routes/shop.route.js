const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop.controller')

//regular user
router.get('/', shopController.getProducts)
router.get('/products/:productId', shopController.getProductById)
router.get('/cart',shopController.getCart)

router.post('/cart', shopController.postCart)
router.post('/cart-delete-item', shopController.postCartDeleteProduct)
module.exports = router