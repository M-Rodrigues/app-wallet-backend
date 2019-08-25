const { model, Schema } = require('mongoose');

const AuthSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = model('Auth', AuthSchema);