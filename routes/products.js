const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Product model
const Product = mongoose.model('Product', new mongoose.Schema({
  productName: String,
  productCount: Number,
  productImage: String,
}));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Handle POST request to add a new product
router.post('/', upload.single('productImage'), async (req, res) => {
  const { productName, productCount } = req.body;
  const productImage = req.file.path;

  try {
    const newProduct = new Product({ productName, productCount, productImage });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
