const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopkeeperSchema = new Schema({
  shopName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  shopImage: {
    type: String,
    required: true
  }
}, { collection: 'details' });

module.exports = mongoose.model('Shopkeeper', shopkeeperSchema);
