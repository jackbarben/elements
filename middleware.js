const { improvisationSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Improvisation = require('./models/improvisation');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateImprovisation = (req, res, next) => {
    const { error } = improvisationSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const improvisation = await Improvisation.findById(id);
    if (!improvisation.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/improvisations/${id}`);
    }
    next();
}