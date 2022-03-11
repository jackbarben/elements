const User = require('../models/user')


module.exports.userForm = (req, res) => {
    res.render('users/register');
}

module.exports.userPreRegister = (req, res) => {
    res.render('users/preregister')
}

module.exports.userRegister = (async(req, res, next) => {
    if (req.body.email === "jbarben@gmail.com") {
        try {
            const { email, username, password, musicImage } = req.body;
            const user = new User({ email, username, musicImage });

            user.musicImage = {
                url: req.file.path,
                filename: req.file.filename
            }
            const registeredUser = await User.register(user, password, musicImage);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'Welcome!');
                res.redirect('/improvisations');
            })
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('register');
        }
    } else {
        req.flash('error', 'You must preregister! If you have already preregistered, please use the email address you used during that process.')
        res.redirect('preregister')
    }
})

module.exports.userRenderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.userLogin = (req, res) => {
    req.flash('success', 'Let\'s go make some music');
    const redirectUrl = req.session.returnTo || '/improvisations';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res) => {
    req.logout();
    req.flash('success', "See you next time!");
    res.redirect('/improvisations');
}