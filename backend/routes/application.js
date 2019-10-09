const express = require('express');
const router = express.Router();
const { showApplicantions, showRequest, createApplication, changeStatus } = require('../controllers/application.controller')

router.get('/applications/:id', showApplicantions)

router.get('/requests/:id', showRequest)

router.post('/application', createApplication)

router.put('/application/:id', changeStatus)

module.exports = router