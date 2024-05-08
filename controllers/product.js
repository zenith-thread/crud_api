const ProductModel = require("../model/product");

// Create and Save a new product
exports.create = async (req, res) => {
  if (!req.body.name && !req.body.price) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const product = new ProductModel({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  });

  await product
    .save()
    .then((data) => {
      res.send({
        message: "product created successfully!!",
        product: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating product",
      });
    });
};

// Retrieve all products from the database.
exports.findAll = async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single product with an id
exports.findOne = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a product by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await ProductModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `product not found.`,
        });
      } else {
        res.send({ message: "product updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a product with the specified id in the request
exports.destroy = async (req, res) => {
  try {
    const data = await ProductModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Product not found.`,
      });
    } else {
      res.send({
        message: "Product deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
