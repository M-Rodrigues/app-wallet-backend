const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true
  },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);