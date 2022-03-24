const mongodb = require('mongodb')
const getDB = require('../util/db-mongo').getDB

module.exports = class User{

    constructor(username, email){
        this.username = username
        this.email = email
    }

    save(){
        const db = getDB()
        return db.collection('users').insertOne(this)
    }

    edit(id){
        const db = getDB()
        return db.collection('users').updateOne({_id: new mongodb.ObjectId(id)}, {$set:this})
    }

    static fetchAll(){
        const db = getDB()
        return db.collection('users').find().toArray()
    }

    static findById(id){
        const db = getDB()
        return db.collection('users').findOne({_id: new mongodb.ObjectId(id)})
    }

    static deleteById(){
        const db = getDB()
        return db.collection('users').deleteOne({_id: new mongodb.ObjectId(id)})
    }
}