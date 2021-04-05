// Connecting database
const { Product, Store } = require("../../db/models");

// Get products list function
exports.getProductsList = async (_, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "storeId"] },
      include: [
        {
          model: Store,
          as: "store",
          attributes: ["name", "id"],
        },
      ],
    });
    res.json(products);
  } catch (catError) {
    next(catError);
  }
};

// Get product by ID function
exports.getProductsByID = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    res.status(200).json(foundProduct);
  } catch (err) {
    next(err);
  }
};

// Delete function
exports.deleteProduct = async (req, res, next) => {
  // :id is the req.param
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    await foundProduct.destroy();
    res.status(204).end();
  } catch (catError) {
    next(catError);
  }
};

// Update function
exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    const foundProduct = await Product.findByPk(productId);
    await foundProduct.update(req.body);
    res.status(204).end(); // 204: update was received
  } catch (catError) {
    next(catError);
  }
};

// Create new product
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
    // 201: created
  } catch (catError) {
    next(catError);
  }
};
