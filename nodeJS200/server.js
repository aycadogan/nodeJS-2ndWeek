require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const shopRoute = require('./routes/shop.route')
const adminRoute = require('./routes/admin.route')
const authRoute = require('./routes/auth.route')

const User = require('./models/user.model')

const app = express()
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection:'sessions'
})

app.set('view-engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
// app.use('public',express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'thisIsaSuperSecretString',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req,res,next) => {
    res.locals.isAuth = req.session.isLoggedIn
    next()
})

// app.use((req,res,next) => {

// // //     const user = new User('admin', 'admin@admin.com')
// // //     user.save().then(result => {
// // //         console.log(result);
// // //         next()
// // //     }).catch(err => console.log(err))
//     User.findOne('623c253cf02901e133b7e588', (err,user) => {
//         if (err) console.log(err);

//         if(!user){
//             const user = new User({
//                 username:'hoge',
//                 email: 'user@hoge.com',
//                 cart: {
//                     items:[]
//                 }
//             })
//             user.save()
//         }
//         req.user = user
//         next()
//     })
    
// })

app.use('/admin', adminRoute)
app.use(shopRoute)
app.use(authRoute)

app.use((req,res,next) => {
    res.status(404).render('404.ejs', {pageTitle: 'Page Not Found'})
})

const PORT = process.env.PORT || 8014

mongoose.connect(process.env.MONGODB_URL,()=>{
    app.listen(PORT)
})