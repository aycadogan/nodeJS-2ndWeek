const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop.controller')

router.get('/', shopController.getProducts)
router.get('/add-product', shopController.getAddProduct)
router.post('/add-product', shopController.postAddProduct)

module.exports = router