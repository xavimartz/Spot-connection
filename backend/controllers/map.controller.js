const Place = require('../models/Place')

exports.addPlace = async (req, res, next) => {
  const {//lat, lng, 
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
      return res.status(201).json({ place })
    })
    .catch((err) => {
      console.log('el error', err)
      return res.status(500).json({ err })
    });
}

exports.showAllPlaces = (req, res) => {
  Place.find().populate("owner")
    .then((users) => res.status(201).json(users))
    .catch((err) => res.status(500).json({ err }));
}

exports.showPlace = (req, res) => {
  const { id } = req.params
  const place = Place.findOne({ owner: id })
    .then((place) => res.status(200).json({ place }))
    .catch((err) => res.status(500).json({ err }));
}

exports.editPlace = async (req, res, next) => {
  const {// lat, lng,
    suburb, delegation, country, description,
    services, rules, ocupationDate, evictionDate
  } = req.body
  let place = {
    suburb, delegation, country, description,
    services, rules, ocupationDate, evictionDate
    // location: {
    //   type: "Point",
    //   coordinates: [lng, lat]
    // }
  };
  console.log('llegan bien los valores del nuevo place', place)
  const modPlace = await Place.findByIdAndUpdate(req.params.id, place)
    .then((place) => {
      console.log('realmente paso el update??')
      res.status(200).json({ place, msg: 'Place edited' })
    })
    .catch((err) => {
      console.log('gimme the error', err);
      res.status(500).json({ err })
    });
}

exports.deletePlace = async (req, res, next) => {
  await Place.findByIdAndDelete(req.params.id)
    .then((place) => res.status(200).json({ place, msg: 'Place deleted' }))
    .catch((err) => res.status(500).json({ err }));
}