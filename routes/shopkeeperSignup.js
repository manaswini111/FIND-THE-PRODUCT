const express = require('express');
const router = express.Router();
const Shopkeeper = require('../models/shopkeeper');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.sendFile('shopkeeperSignup.html', { root: 'views' });
});

router.post('/', upload.single('shopImage'), async (req, res) => {
  const { shopName, ownerName, password, area } = req.body;
  const shopImage = req.file ? req.file.filename : '';

  const newShopkeeper = new Shopkeeper({
    shopName,
    ownerName,
    password,
    area,
    shopImage
  });

  try {
    await newShopkeeper.save();
    res.redirect('/shopkeeperLogin');
  } catch (err) {
    res.status(500).send('Error signing up');
  }
});

module.exports = router;
