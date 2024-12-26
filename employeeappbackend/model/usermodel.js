const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  email: { type: String, required: true },
  phone: { type: Number, required: true }
});

const usermodel = mongoose.model('user', userSchema);

module.exports = usermodel;
