const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Users', UserSchema);
