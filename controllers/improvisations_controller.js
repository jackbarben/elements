const Improvisation = require('../models/improvisation');
const { cloudinary } = require('../cloudinary');
const user = require('../models/user');

module.exports.index = async (req, res) => {
    const improv = await Improvisation.find({}).populate('author')
    const musicImage = await user.find({})
    res.render("improvisations/index", { improv, musicImage })
}

module.exports.renderNewForm = (req, res) => {
    res.render('improvisations/new');
}

module.exports.createImprovisation = (async (req, res, next) => {
    const improvisation = new Improvisation(req.body.improvisation);
    improvisation.link = { url: req.file.path, filename: req.file.filename }
    improvisation.author = req.user._id
    improvisation.musicImage = req.user.musicImage
    await improvisation.save();
    req.flash('success', 'Successfully made a new Improvisation!')
    res.redirect('/improvisations')
})

module.exports.showImprovisation = (async (req, res) => {
    const improvisation = await Improvisation.findById(req.params.id).populate('author')
    const musicImage = await user.findById(improvisation.author._id)
    if (!improvisation) {
        req.flash('error', 'Cannot find that Improvisation')
        return res.redirect('/improvisations')
    }
    res.render("improvisations/show", { improvisation, musicImage })
})

module.exports.renderEditForm = (async (req, res) => {
    const { id } = req.params
    const improvisation = await Improvisation.findById(id);
    if (!improvisation) {
        req.flash('error', 'Cannot find that Improvisation')
        return res.redirect('/improvisations')
    }
    if (!improvisation.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.')
        return res.redirect(`/ improvisations / ${id}`)
    }
    res.render('improvisations/edit', { improvisation });
})

module.exports.updateImprovisation = (async (req, res) => {
    const { id } = req.params;
    const improv = await Improvisation.findByIdAndUpdate(id, { ...req.body.improv });
    const linkDelete = improv.link.filename
    improv.link = { url: req.file.path, filename: req.file.filename }

    improv.author = (req.user._id)
    await improv.save();
    cloudinary.uploader.destroy(linkDelete, { resource_type: 'video' })
    req.flash('success', "Successfully updated Improvisation!")
    res.redirect('/improvisations')
})

module.exports.deleteImprovisation = async (req, res) => {
    const { id } = req.params;
    const improvisation = await Improvisation.findById(id);
    const linkDelete = improvisation.link.filename
    if (!improvisation.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.')
        return res.redirect(`/ improvisations / ${id}`)
    }
    cloudinary.uploader.destroy(linkDelete, { resource_type: 'video' })
    await Improvisation.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Improvisation!')
    res.redirect('/improvisations');
}