const mongoose = require('mongoose');

const portfoliosSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name : String,
  author : String,
  image_url: String,
  user_url: String,
  desc: String
})

module.exports = mongoose.model('Portfolios', portfoliosSchema);
