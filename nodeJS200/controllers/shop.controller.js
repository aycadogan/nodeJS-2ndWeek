const Product = require('../models/product.model')
const Cart = require('../models/cart.model')

const getById = (productId) => {

    return Product.findById(productId, (err,data) => {
        if(err) console.log(err)
        return data
    }).clone()
}

exports.getProducts = (req,res,next) => {

    Product.find((err,data) => {

        if(err) console.log(err)
        res.render('shop/product-list.ejs', {
            pageTitle: 'Home - All Products',
            products:data
        })
    })
}

exports.getProductById = async (req,res,next) => {
    const {params:{productId}} =req
    
    const product = await getById(productId)
    // console.log(product);
    res.render('shop/product-detail.ejs',{
        pageTitle: product.title,
        product: product
    })
}

exports.postCart = async (req,res,next) => {

    const {productId} = req.body

    const product = await getById(productId)
    await req.user.addToCart(product)
    res.redirect('/cart');
}

exports.getCart = async (req,res,next) => {
    
    req.user.populate('cart.items.productId').then((user) => {
        
        const products = user.cart.items
        console.log(products);

        res.render('shop/cart.ejs', {
        pageTitle: 'Your Cart',
        products: products,
        totalPrice: products.reduce((acc, curr) => acc + curr.quantity * curr.productId.price,
        0)
    })
    })

    //Alternative Solution
    // const cartItems= req.user.cart.items

    // const mappedCart = await Promise.all((cartItems.map( async (ci) => {
    //     const product = {}
    //     const productDetail = await getById(ci.productId)

    //     product.title = productDetail.title
    //     product.imageUrl = productDetail.imageUrl
    //     product.description = productDetail.description
    //     product.price = productDetail.price
    //     product.id = ci.id
    //     product.quantity = ci.quantity
    //     product.subTotal = ci.quantity * productDetails.price

    //     return product
    // })))

    // res.render('shop/cart.ejs', {
    //     pageTitle: 'Your Cart',
    //     products: mappedCart,
    //     totalPrice: mappedCart.reduce((acc,curr) => acc + curr.subTotal, 0)
    // })

}

exports.postCartDeleteProduct = async (req,res,next) => {
    const {productId} = req.body
    req.user.removeFromCart(productId).then(() => {
        res.redirect('/cart')
    });
    
}