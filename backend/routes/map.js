const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const { addPlace, showAllPlaces, showPlace, editPlace, deletePlace } = require('../controllers/map.controller')

router.post('/new', addPlace)

router.get('/all', showAllPlaces)

router.get('/place/:id', showPlace)

router.post('/place/edit/:id', editPlace)

router.delete('/place/delete/:id', deletePlace)

module.exports = router