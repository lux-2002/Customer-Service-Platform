const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: String,
  category: String,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
