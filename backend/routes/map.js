const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const { addPlace, showAllPlaces, showPlace, editPlace, deletePlace } = require('../controllers/map.controller')

router.get('/dashboard', isAuth, showAllPlaces)

router.post('/place/new', addPlace)

router.get('/place/:id', showPlace)

router.put('/place/edit/:id', isAuth, editPlace)

router.delete('/place/delete/:id', isAuth, deletePlace)

module.exports = router