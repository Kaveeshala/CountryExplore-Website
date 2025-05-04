// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  countryCode: { type: String, required: true }, // e.g., "US"
  countryName: { type: String, required: true },
  flag: { type: String },
  capital: { type: String },
  currency: { type: String },
  language: { type: String }
});

module.exports = mongoose.model('Favorite', favoriteSchema);