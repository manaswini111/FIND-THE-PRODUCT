const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Routes
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const shopkeeperSignupRoute = require('./routes/shopkeeperSignup');
const shopkeeperLoginRoute = require('./routes/shopkeeperLogin');
const productRoute = require('./routes/products');
const searchRoute = require('./routes/search');
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/shopkeeperSignup', shopkeeperSignupRoute);
app.use('/shopkeeperLogin', shopkeeperLoginRoute);
app.use('/products', productRoute);
app.use('/search', searchRoute);

// Serve the views
app.get('/userInterface', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userInterface.html'));
});

app.get('/userInterface1', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userInterface1.html'));
});

app.get('/shopkeeperInterface', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'shopkeeperInterface.html'));
});

// Default route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
