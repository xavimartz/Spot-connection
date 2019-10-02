const { Schema, model } = require('mongoose')

const placeSchema = new Schema(
  {
    suburb: String,
    delegation: String,
    location: {
      address: {
        type: String,
        default: "Point"
      },
      coordinates: [Number]
    },
    images: [String],
    description: String,
    services: [String],
    rules: [String],
    ocupationDate: Date,
    evictionDate: Date,
    reviews: [{
      ref: 'Review',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Place', placeSchema)