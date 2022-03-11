const express = require('express')
const router = express.Router()
const Improvisation = require('../models/improvisation');
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateImprovisation } = require('../middleware')
const improvisationsController = require('../controllers/improvisations_controller')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route

router.route('/')
    .get(catchAsync(improvisationsController.index))
    .post(isLoggedIn, upload.single('songUpload'), validateImprovisation, catchAsync(improvisationsController.createImprovisation))


router.route('/new')
    .get(isLoggedIn, improvisationsController.renderNewForm)

router.route('/:id')
    .get(catchAsync(improvisationsController.showImprovisation))
    .put(isLoggedIn, isAuthor, upload.single('songUpload'), validateImprovisation, catchAsync(improvisationsController.updateImprovisation))
    .delete(isLoggedIn, isAuthor, improvisationsController.deleteImprovisation)


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(improvisationsController.renderEditForm))

module.exports = router;