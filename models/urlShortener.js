const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortenerSchema = new Schema({
  originalUrl: String,
  shortId: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('urlShortener', urlShortenerSchema)