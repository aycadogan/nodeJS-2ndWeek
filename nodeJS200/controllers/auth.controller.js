

exports.getLogin = (req,res,next) => {
    res.render('auth/login.ejs'),{
        pageTitle: 'Login'
    }
}

exports.postLogin = (req,res,next) => {
    res.redirect('/')
}

exports.postLogout = (req,res,next) => {
    res.redirect('/')
}