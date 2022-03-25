const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId:{
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                required: true
            }
        }]
    }
})

//custom methods of mongoose

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString())

    let newQuantity = 1

    const updatedCartItems = [...this.cart.items]

    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    }else{
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart
    return this.save()
}
userSchema.methods.removeFromCart = function(productId){

    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString())
    this.cart.items = updatedCartItems
    return this.save()
}

module.exports = mongoose.model('User', userSchema)



//--------------- MONGODB------------------------
// const mongodb = require('mongodb')
// const getDB = require('../util/db-mongo').getDB

// module.exports = class User{

//     constructor(username, email){
//         this.username = username
//         this.email = email
//     }

//     save(){
//         const db = getDB()
//         return db.collection('users').insertOne(this)
//     }

//     edit(id){
//         const db = getDB()
//         return db.collection('users').updateOne({_id: new mongodb.ObjectId(id)}, {$set:this})
//     }

//     static fetchAll(){
//         const db = getDB()
//         return db.collection('users').find().toArray()
//     }

//     static findById(id){
//         const db = getDB()
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(id)})
//     }

//     static deleteById(){
//         const db = getDB()
//         return db.collection('users').deleteOne({_id: new mongodb.ObjectId(id)})
//     }
// }