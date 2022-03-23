const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
require('dotenv').config()

let db

//for server connection
exports.mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_URL)
     .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('nodeshop')
        callback()
    })
    .catch(err => {
        console.log('Error in mongo connect: ', err);
    })
}

//for models
exports.getDB = () => {
    if(db){
        return db
    }
    throw 'No database found'
}