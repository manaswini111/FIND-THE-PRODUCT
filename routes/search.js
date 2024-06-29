const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/Product');
const Shopkeeper = require('../models/shopkeeper');

// Route to display search interface
router.get('/', (req, res) => {
  res.sendFile('search.html', { root: 'views' });
});

// Route to handle search logic
router.post('/', async (req, res) => {
  const { area, productName } = req.body;

  // Find shopkeepers in the specified area
  const shopkeepers = await Shopkeeper.find({ shopLocation: area });

  // Get shopkeeper IDs
  const shopkeeperIds = shopkeepers.map(shopkeeper => shopkeeper._id);

  // Find products with the specified name available in the shops in the specified area
  const products = await Product.find({
    shopkeeperId: { $in: shopkeeperIds },
    productName: new RegExp(productName, 'i') // Case-insensitive search
  });

  // Render the HTML with the products data
  res.render('searchResults', { products });
});

module.exports = router;
