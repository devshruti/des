// productModel.js

const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  stock_quantity: { type: Number },
  categories: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = {ProductModel};
