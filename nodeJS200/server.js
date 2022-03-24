const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoConnect = require('./util/db-mongo').mongoConnect

const shopRoute = require('./routes/shop.route')
const adminRoute = require('./routes/admin.route')
const User = require('./models/user.model')

const app = express()

app.set('view-engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
// app.use('public',express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))


app.use((req,res,next) => {

//     const user = new User('admin', 'admin@admin.com')
//     user.save().then(result => {
//         console.log(result);
//         next()
//     }).catch(err => console.log(err))
    User.findById('623c253cf02901e133b7e588')
    .then(user => {
        console.log(user);
        req.user = user
        next()
    })
})

app.use('/admin', adminRoute)
app.use(shopRoute)

app.use((req,res,next) => {
    res.status(404).render('404.ejs', {pageTitle: 'Page Not Found'})
})

const PORT = process.env.PORT || 8009
// app.listen(PORT)

mongoConnect(() => {
    app.listen(PORT)
})

