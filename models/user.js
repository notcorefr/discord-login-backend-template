const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  discriminator: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
});

module.exports = mongoose.model('User', UserSchema);
