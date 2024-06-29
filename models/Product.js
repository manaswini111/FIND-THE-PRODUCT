const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  
  productName: {
    type: String,
    required: true,
  },
  productCount: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
