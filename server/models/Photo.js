const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
