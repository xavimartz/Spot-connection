const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const uploadCloud = require('../config/cloudinary')
const isAuth = require('../middleware/isAuth')
const { signup, login, logout, showProfile, editProfile } = require('../controllers/auth.controller')

router.post('/signup', signup);

router.post('/login', passport.authenticate('local'), login);

router.get('/logout', logout);

router.get('/profile/:id', showProfile);

router.put('/profile/:id', uploadCloud.single('photoURL'), editProfile)

module.exports = router;