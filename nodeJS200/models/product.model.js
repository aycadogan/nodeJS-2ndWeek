// const db = require('../util/db-mysql')
const mongodb = require('mongodb')
const getDB = require('../util/db-mongo').getDB
module.exports = class Products{

    constructor(title,imageUrl,description,price){
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    
    save(){
        // return db.execute('INSERT INTO products (title,description,imageUrl,price) VALUES (?,?,?,?)',[this.title, this.description,this.imageUrl,this.price])
        const db = getDB()
        return db.collection('products').insertOne(this)
    }

    edit(){
        // return db.execute('UPDATE products SET title=?, description=?, imageUrl=?, price=? WHERE id=?', [this.title,this.description,this.imageUrl,this.price,this.id])
    }

    static deleteById(id){
        // return db.execute('DELETE FROM products WHERE products.id = ?', [id])
    }

    //fetch all products
    static fetchAll(){
        // return db.execute('SELECT * FROM products')
        const db = getDB()
        return db.collection('products').find().toArray()
    }

    static findById(id){
        // return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
        const db = getDB()
        const objectId = new mongodb.ObjectId(id)
        return db.collection('products').find({_id: objectId}).next()
    }
}