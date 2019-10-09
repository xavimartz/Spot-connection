const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
  {
    review: String,
    author: {
      ref: "User",
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Review', reviewSchema)