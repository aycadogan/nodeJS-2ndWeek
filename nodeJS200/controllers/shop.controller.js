const Product = require('../models/product.model')


exports.getProducts = (req,res,next) => {

    Product.fetchAll().then(([rowData, fieldData])=> {
        // console.log(rowData)
    res.render('shop/product-list.ejs', {
        pageTitle: 'All Products',
        products: rowData
    })
}).catch(err=> console.log(err))
}