const User = require('../models/User')

exports.signup = (req, res, next) => {
  const user = User.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
}

exports.login = (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
}

exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
}

exports.showProfile = (req, res, next) => {
  const { id } = req.params
  const user = User.findById(id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
}

exports.editProfile = async (req, res, next) => {
  const { name, email, gender, phone, image } = req.body
  const profile = await User.findByIdAndUpdate(req.params.id, { name, email, gender, phone, image })
    .then((data) => res.status(200).json({ data, msg: 'Profile edited' }))
    .catch((err) => res.status(500).json({ err }));
}