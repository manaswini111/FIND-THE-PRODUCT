const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure the correct relative path

router.get('/', (req, res) => {
  res.sendFile('signup.html', { root: 'views' });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  res.sendFile('userInterface.html', { root: 'views' });
});

module.exports = router;
