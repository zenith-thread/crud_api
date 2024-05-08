var mongoose = require("mongoose");

var schema = new mongoose.Schema({
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
