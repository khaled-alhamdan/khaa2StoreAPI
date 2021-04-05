// Importing express and its router
const express = require("express");
const router = express.Router();

// Importing upload
const upload = require("../../middleweres/multer");

//Importing passport
const passport = require("passport");

// Importing store controllers
const {
  fetchStors,
  getStoresList,
  getStoreById,
  addStore,
  updateStore,
  deleteStore,
  productCreate,
} = require("./storeController");

// param middlewear
router.param("storeId", async (req, res, next, storeId) => {
  const store = await fetchStors(storeId, next);
  if (store) {
    req.store = store;
    next();
  } else {
    const err = new Error({ error: "store Not Found" });
    err.status = 404;
    next(err);
  }
});

// Get stores list
router.get("/", getStoresList);

// Get store by Id
router.get("/:storeId", getStoreById);

// Add Store
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addStore
);

// Update Store
router.put(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateStore
);

// Delete store
router.delete("/:storeId", deleteStore);

// Add-Create a product in a store
router.post(
  "/:storeId/products",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  productCreate
);

module.exports = router;
