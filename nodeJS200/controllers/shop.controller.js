const Product = require('../models/product.model')


exports.getProducts = (req,res,next) => {

//     Product.fetchAll().then(([rowData, fieldData])=> {
//         // console.log(rowData)
//     res.render('shop/product-list.ejs', {
//         pageTitle: 'All Products',
//         products: rowData
//     })
// }).catch(err=> console.log(err))

    Product.fetchAll().then((products)=> {
        console.log(products);
    res.render('shop/product-list.ejs', {
        pageTitle: 'All Products',
        products: products
    })
    }).catch(err=> console.log(err))
}

exports.getProductById = (req,res,next) => {
    const prodId = req.params.productId
    Product.findById(prodId)
     .then((product) => {
        //  console.log(rowData[0].title);
         res.render('shop/product-detail.ejs',{
             pageTitle: product.title,
             product: product
         })
     })
     .catch(err => console.log(err))
    
}

