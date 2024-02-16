const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "What Boba would you like to add?"]
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
    }
  },
)

const Boba = mongoose.model('Boba', productSchema);

module.exports = Boba;