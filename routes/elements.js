const express = require('express')
const router = express.Router()
const Improvisation = require('../models/improvisation');
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateImprovisation } = require('../middleware')
const elementsController = require('../controllers/elements_controller')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route

router.route('/')
    .get(catchAsync(elementsController.elements))

router.route('/time')
    .get(catchAsync(elementsController.time))

module.exports = router;