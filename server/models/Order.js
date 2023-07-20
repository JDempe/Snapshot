const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo',
        required: true,
      },
      // size and price are static because they can't be linked to the size collection or it may change over time
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.'],
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

// calculate the total from the size price and quantity
orderSchema.pre('save', async function (next) {
  this.total = this.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
