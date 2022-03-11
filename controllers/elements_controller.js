const Improvisation = require('../models/improvisation');
const { cloudinary } = require('../cloudinary')

module.exports.elements = async (req, res) => {
    res.render("elements/elements")
}

module.exports.time = async (req, res) => {
    res.render('elements/time')
}