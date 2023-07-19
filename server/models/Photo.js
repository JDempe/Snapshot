const mongoose = require('mongoose');
const { Schema } = mongoose;

const sizeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { _id : false });


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

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sizes: {
    type: [sizeSchema],
    required: true
  },
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;