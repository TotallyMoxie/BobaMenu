const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "What Boba would you like to have?"]
    },
    menu: {
      type: String,
      required: true,
    },
  },
)

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;