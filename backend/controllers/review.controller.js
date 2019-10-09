const Review = require('../models/Review')

exports.showReviews = (req, res) => {
  Review.find().populate("author")
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ err }));
}

exports.createReview = async (req, res) => {
  const { review, id } = req.body
  const newReview = await Review.create(review, { author: id })
    .then((data) => res.statur(201).json({ data, msg: 'Review created' }))
    .catch((err) => res.status(500).json({ err }))
}