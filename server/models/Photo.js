const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  size: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;