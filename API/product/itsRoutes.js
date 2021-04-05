// Importing express
const express = require("express");
// Imorting router
const router = express.Router();
// Importing passport
const passport = require("passport");
// Importing multer middlewear
const upload = require("../../middleweres/multer");

// Importing products controllers
const {
  getProductsList,
  deleteProduct,
  updateProduct,
  getProductsByID,
  productCreate,
} = require("./itsControllers");

// Get products list
router.get("/", getProductsList);

// Get product by ID
router.get("/:productId", getProductsByID);

// Delete a product
router.delete("/:productId", deleteProduct);

// Update a product
router.put(
  "/:productId",
  upload.single("image"),
  // passport.authenticate("jwt", { session: false }),
  updateProduct
);

// Create product
router.post("/", upload.single("image"), productCreate);

module.exports = router;
