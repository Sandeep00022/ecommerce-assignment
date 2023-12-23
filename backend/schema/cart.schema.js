const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    categoryName: [ { type : String } ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    count: {
        type: Number,
        default: 1, 
      },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);

  module.exports = Cart;
  