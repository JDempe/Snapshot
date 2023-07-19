const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    products: [
      {
        photo: {
          type: Schema.Types.ObjectId,
          ref: 'Photo',
          required: true
        },
        size: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity can not be less then 1.']
        }
      }
    ],
    total: {
      type: Number,
      required: true
    }
  });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;