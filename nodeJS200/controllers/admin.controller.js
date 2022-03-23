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
    .then((product) => {
        res.render('shop/add-edit-product.ejs', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        })
    })
}

exports.postEditProduct = (req,res,next) => {

    const {productId, title, imageUrl,description,price} = req.body
    const updatedProduct = new Product( title, imageUrl,description,price)
    updatedProduct.edit(productId).then(() => res.redirect('/')).catch(err=> console.log(err))
    
}

exports.postDeleteProduct = ( req,res,next) => {

    const prodId = req.body.productId
    Product.deleteById(prodId).then(() => {
        res.redirect('/')
    }).catch((err) => console.log(err))

}