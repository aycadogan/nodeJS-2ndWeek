const db = require('../util/database')

module.exports = class Products{

    constructor(id,title,imageUrl,description,price){
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    
    save(){
        return db.execute('INSERT INTO products (title,description,imageUrl,price) VALUES (?,?,?,?)',[this.title, this.description,this.imageUrl,this.price])
    }

    //fetch all products
    static fetchAll(){
        return db.execute('SELECT * FROM products')
    }
}