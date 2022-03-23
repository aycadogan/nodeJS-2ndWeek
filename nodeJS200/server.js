const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoConnect = require('./util/db-mongo').mongoConnect

const shopRoute = require('./routes/shop.route')
const adminRoute = require('./routes/admin.route')

const app = express()

app.set('view-engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
// app.use('public',express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoute)
app.use(shopRoute)

const PORT = process.env.PORT || 8003
// app.listen(PORT)

mongoConnect(() => {
    app.listen(PORT)
})

