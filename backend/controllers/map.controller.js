const Place = require('../models/Place')
const User = require('../models/User')

exports.addPlace = async (req, res, next) => {
  const { //lat, lng, 
    suburb, delegation, country, address, description,
    services, rules, ocupationDate, evictionDate, id } = req.body
  let place = {
    suburb, delegation, country, address, description,
    services, rules, ocupationDate, evictionDate,
    // location: {
    //   type: "Point",
    //   coordinates: [lng, lat]
    // },
    owner: id
  }
  await Place.create(place)
    .then((place) => {
      console.log('entrooo', place)
      // const user = Place.findByIdAndUpdate(id, { $set: { owner: place._id } })
      //   .then(res => console.log('que paso', res))
      //   .catch(err => console.log('error', err))
      // const profile = User.findByIdAndUpdate(id, { $set: { homeLocation: place._id } }).then(res => console.log('que paso', res)).catch(err => console.log('daadadad', err))

      return res.status(201).json({ place })
    })
    .catch((err) => {
      console.log('el error', err)
      return res.status(500).json({ err })
    });
}

exports.showAllPlaces = (req, res) => {
  Place.find()
    .then((users) => res.status(201).json(users))
    .catch((err) => res.status(500).json({ err }));
}

exports.showPlace = (req, res) => {
  const { id } = req.params
  console.log('este es el params para mostrar', req.params)
  const place = Place.findOne({ owner: id }).populate('owner')
    .then((place) => res.status(200).json({ place }))
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