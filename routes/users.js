const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const userController = require('../controllers/users_controller')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/register')
    .get(userController.userForm)
    .post(upload.single('musicImage'), catchAsync(userController.userRegister));

router.route('/preregister')
    .get(userController.userPreRegister)

router.route('/login')
    .get(userController.userRenderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.userLogin)

router.get('/logout', userController.userLogout)

module.exports = router;