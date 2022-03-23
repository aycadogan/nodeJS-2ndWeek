const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop.controller')

//regular user
router.get('/', shopController.getProducts)
router.get('/products/:productId', shopController.getProductById)



module.exports = router