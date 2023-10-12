const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    name: String,
    email: String,
    userType: String,
    password: { type: String, bcrypt: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
)

schema.plugin(require('mongoose-bcrypt'))

module.exports = mongoose.model('users', schema)