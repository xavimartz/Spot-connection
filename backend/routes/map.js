const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const { addPlace, showAllPlaces, showPlace, editPlace, deletePlace } = require('../controllers/map.controller')

//RUTAS PARA LAS LOCALIZACIONES AGREGADAS POR LOS USUARIOS
router.get('/dashboard', showAllPlaces)

router.post('/place/new', addPlace)

router.get('/place/:id', showPlace)

router.put('/place/edit/:id', editPlace)

router.delete('/place/delete/:id', deletePlace)

module.exports = router