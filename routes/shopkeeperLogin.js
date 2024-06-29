const express = require('express');
const router = express.Router();
const Shopkeeper = require('../models/shopkeeper');

// Serve the shopkeeper login page
router.get('/', (req, res) => {
  res.sendFile('shopkeeperlogin.html', { root: 'views' });
});

// Handle shopkeeper login
router.post('/', async (req, res) => {
  try {
    const { ownerName, password } = req.body;

    // Find the shopkeeper by ownerName and password
    const shopkeeper = await Shopkeeper.findOne({ ownerName, password });
    if (shopkeeper) {
      req.session.shopkeeperId = shopkeeper._id; // Set session data
      res.redirect('/shopkeeperInterface'); // Redirect to shopkeeper interface
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during shopkeeper login:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
