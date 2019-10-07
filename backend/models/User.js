const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone: {
      type: Number,
      default: ''
    },
    image: {
      type: String,
      default: 'http://pluspng.com/img-png/png-user-icon-account-friend-human-man-member-person-profile-user-256.png'
    }
    // homeLocation: {
    //   ref: 'Place',
    //   type: Schema.Types.ObjectId
    // }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
