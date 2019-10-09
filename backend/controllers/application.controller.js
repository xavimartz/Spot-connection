const Application = require('../models/Application')

exports.showApplication = async (req, res) => {
  const { id } = req.params
  await Application.find({ applicantId: id })
    .then((response) => {
      console.log(response)
      res.status(201).json(response)
    })
    .catch((err) => res.status(500).json({ err }));
}

exports.showRequest = (req, res) => {
  const { id } = req.params
  Application.find({ ownId: id })
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