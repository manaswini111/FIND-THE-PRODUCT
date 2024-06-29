const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (user) {
    req.session.userId = user._id;
    res.redirect('/userInterface');
  } else {
    res.send('Invalid credentials');
  }
});

module.exports = router;
