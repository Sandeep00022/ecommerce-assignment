const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  });
  
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
  