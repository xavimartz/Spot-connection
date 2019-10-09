const { Schema, model } = require('mongoose')

const applicationSchema = new Schema(
  {
    ownerId: String,
    apliccantId: String,
    address: {
      suburb: String,
      delegation: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Acepted', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Application', applicationSchema)