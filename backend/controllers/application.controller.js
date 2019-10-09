const Application = require('../models/Application')

exports.showApplicantions = (req, res) => {
  const { id } = req.params
  Application.find({ apliccantId: id })
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => res.status(500).json({ err }));
}

exports.showRequest = (req, res) => {
  const { id } = req.params
  Application.find({ ownerId: id })
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ err }));
}

exports.createApplication = async (req, res) => {
  await Application.create(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(500).json({ err }))
}

exports.changeStatus = async (req, res) => {
  const { status } = req.body
  await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ err }))
}