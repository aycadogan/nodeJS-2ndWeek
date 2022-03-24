const fs = require('fs')
const path = require('path')

const cartPath = path.join(path.dirname(process.mainModule.filename),'data','cart.json')

module.exports = class Cart{

    static getCart(callback){
        fs.readFile(cartPath, (err, content) => {
            const cart = JSON.parse(content)

            if(err){
                callback(null)
            }else{
                callback(cart)
            }
        })
    }

    static addProduct(id, price){

        fs.readFile(path.join(cartPath),(err,content) => {
            let cart = {
                products: [],
                totalPrice:0
            }

            if(!err){
                cart = JSON.parse(content)
            }

            const existingProductIndex = cart.products.findIndex(c => c.id === id)
            const existingProduct = cart.products[existingProductIndex]
            
            let updatedProduct

            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.quantity = updatedProduct.quantity + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else{
                updatedProduct = { id, quantity:1}
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + price

            fs.writeFile(cartPath,JSON.stringify(cart,null,4), err => { console.log(err)})
        })

    }

    static deleteProduct(id,price){

        fs.readFile(cartPath, (err,content) => {

            if(err){
                return
            }

            const updatedCart = { ...JSON.parse(content)}
            const product = updatedCart.products.find(p => p.id === id)
            
            if(!product){
                return
            }

            const productQty = product.quantity
            updatedCart.products = updatedCart.products.filter(p => p.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty

            fs.writeFile(cartPath,JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })

    }


}
