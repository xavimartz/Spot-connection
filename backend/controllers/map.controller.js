const Place = require('../models/Place')
const User = require('../models/User')

exports.addPlace = async (req, res, next) => {
  const { lat, lng, suburb, delegation, country, address, description,
    services,
    rules,
    ocupationDate,
    evictionDate } = req.body
  const location = { coordinates: [lat, lng] }
  const n = { ...location, coordinates: [Number(location.coordinates[0]), Number(location.coordinates[1])] }

  await Place.create({
    suburb, delegation, country, address, description,
    services,
    rules,
    ocupationDate,
    evictionDate, n
  })
    .then((place) => res.status(201).json({ place }))
    .catch((err) => res.status(500).json({ err }));
}

exports.showAllPlaces = (req, res) => {
  Place.find()
    .then((users) => res.status(201).json(users))
    .catch((err) => res.status(500).json({ err }));
}

exports.showPlace = (req, res) => {

  const { id } = req.params
  const user = User.findById(id).populate('homeLocation')
    //console.log(findPlace)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
}

exports.editPlace = async (req, res, next) => {
  const { id } = req.params
  const {
    lat,
    lng,
    suburb,
    delegation,
    country,
    address,
    description,
    services,
    rules,
    ocupationDate,
    evictionDate
  } = req.body
  let place = {
    suburb, delegation, country, address, description,
    services,
    rules,
    ocupationDate,
    evictionDate,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    }
  };
  Place.findByIdAndUpdate(id, place)
    .then((place) => res.status(200).json({ place, msg: 'Place edited' }))
    .catch((err) => res.status(500).json({ err }));
}

exports.deletePlace = async (req, res, next) => {
  await Place.findByIdAndDelete(req.params.id)
    .then((place) => res.status(200).json({ place, msg: 'Place deleted' }))
    .catch((err) => res.status(500).json({ err }));
}