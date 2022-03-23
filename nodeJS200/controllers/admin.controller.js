const Product = require('../models/product.model')


exports.getAddProduct = (req,res,next) => {
    res.render('shop/add-edit-product.ejs', {
        pageTitle: 'Add Product',
        editing: false
    })
}

exports.postAddProduct = (req,res,next) => {
    const { title, imageUrl, description, price} = req.body
    
    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if(!editMode) res.redirect('/')

    const proId = req.params.productId
    Product.findById(proId)
    .then(([rowData, fieldData]) => {
        res.render('shop/add-edit-product.ejs', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: rowData[0]
        })
    })
}

exports.postEditProduct = (req,res,next) => {

    const {title, imageUrl,description,price} = req.body
    const updatedProduct = new Product( title, imageUrl,description,price)

    updatedProduct.edit()
    res.redirect('/')
}

exports.postDeleteProduct = ( req,res,next) => {

    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/')
}