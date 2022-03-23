const db = require('../util/database')

module.exports = class Products{

    constructor(id,title,imageUrl,description,price){
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    //fetch all products
    static fetchAll(){
        return db.execute('SELECT * FROM products')
    }
}