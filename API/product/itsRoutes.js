const express = require("express");
const router = express.Router();
// Importing the create function from product Controller
const {
  productCreate,
  getProductsList,
  deleteProduct,
  updateProduct,
  getProductsByID,
} = require("./itsControllers");

// Get products list
router.get("/", getProductsList);

// Get product by ID
router.get("/:productId", getProductsByID);

// Delete a product
router.delete("/:productId", deleteProduct);

// Add-Create a product
router.post("/", productCreate);

// Update a product
router.put("/:productId", updateProduct);

module.exports = router;
