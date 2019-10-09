const express = require('express');
const router = express.Router();
const { showApplication, showRequest, createApplication, changeStatus } = require('../controllers/application.controller')

router.get('/application/:id', showApplication) //las solicitudes de otro usuario que se van a aceptar o negar

router.get('/request/:id', showRequest) //LAS SOLICITUDES QUE REALIZÓ EL USUARIO

router.post('/application', createApplication)

router.put('/application/:id', changeStatus) //aceptar o declinar las solicitudes llegadas

module.exports = router