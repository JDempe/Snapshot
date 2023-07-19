const mongoose = require('mongoose');

const { Schema } = mongoose;

const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
    trim: true,
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 5.0,
  },
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
