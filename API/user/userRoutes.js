// Importing express and its router
const express = require("express");
const router = express.Router();

// Importing the controllers
const { signup, signin, decodeToken } = require("./userControllers");

// Importing passport
const passport = require("passport");

// Signup route
router.post("/signup", signup);

// Signin route
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// Decode token route
router.get(
  "/decodeToken",
  passport.authenticate("jwt", { session: false }),
  decodeToken
);

module.exports = router;
