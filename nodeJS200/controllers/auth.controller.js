const User = require('../models/user.model')

exports.getLogin = (req,res,next) => {
    res.render('auth/login.ejs'),{
        pageTitle: 'Login'
    }
}

exports.postLogin = (req,res,next) => {
    const { username, password } = req.body

    User.findOne({ username: username }, (err, user) => {
        if(err) console.log(err)

        if(!user){
            return res.redirect('/login')
        }
        
        bcrypt.compare(password, user.password).then((isMatching) => {
            if(isMatching){
                req.session.user = user
                req.session.isLoggedIn = true
                return req.session.save(err => {
                    if(err) console.log(err)
        
                    res.redirect('/')
                })
            }

            res.redirect('/login')
        }).catch(err => {
            console.log(err)
        })

    } )
}




exports.getSignUp = (req,res,next) => {

    res.render('auth/signup',{
        pageTitle: 'Sign Up'
    })
}

exports.postSignUp = async (req,res,next) => {

    const { username, email, password, confirmPassword } = req.body

    const passwordMatch = password === confirmPassword ? password : null

    if(passwordMatch){

        await bcrypt.hash(password, 12).then((hashedPassword) => {

            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            })
            return user.save()
        }).then(() => {
            res.redirect('/login')
        }).catch(err => {
            console.log(err)
        })

    }else{
        res.redirect('/signup')

    }
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        if(err) console.log(err)
        res.redirect('/')
    })
}
