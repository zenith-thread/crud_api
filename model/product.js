var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
});
var product = new mongoose.model("Product", schema);
module.exports = product;
