// Connecting database
const { Product } = require("../../db/models");

// Get products list function
exports.getProductsList = async (_, res) => {
  try {
    const products = await Product.findAll({
      // attributes: ["id", "name"], // Include these only
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude these only
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "error fetching the list" });
  }
};

// Get product by ID function
exports.getProductsByID = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res.status(404).json({ error: "product was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal servier error" });
  }
};

// Delete function
exports.deleteProduct = async (req, res) => {
  // :id is the req.param
  const { productId } = req.params; // lines 23 and 24 are equivelent to each other
  // const productId = req.params.productId;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Product was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal servier error" });
  }
};

// Create function
exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body); // in this form it will print the id and slug first then print whats in the added body
    res.status(201).json(newProduct);
  } catch (error) {
    // 201: created
    res.status(500).json({ error: "product could not be created" });
  }
  // const id = products[products.length - 1].id + 1; // go in prodcts, specify the requested item using [], .id to give me the id of the requested item

  // products.push(newProduct);
  // const slug = slugify(req.body.name, { lower: true });
};

// Update function
exports.updateProduct = async (req, res) => {
  // const productId = req.params.productId;
  const { productId } = req.params;

  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end(); // 204: update was received
    } else {
      res.status(404).json({ error: "Product was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "product could not be updated" });
  }
};
