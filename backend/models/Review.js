const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
  {
    review: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Review', reviewSchema)