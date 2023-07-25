const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderProductSchema = new Schema({
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },

  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
  },

  purchaseDate: {
    type: Date,
    default: Date.now,
  },

  products: [orderProductSchema],

  total: {
    type: Number,
    required: true,
  },
});

// calculate the total from the size price and quantity
