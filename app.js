// import express from "express";
// const { req, res } = require("express");
// Importing body parser
// const bodyParser = require("body-parser"); // Now no need for this and line 14, only use line 15
// Importing products routes
const express = require("express");
const cors = require("cors");
const path = require("path");
const productsRoutes = require("./API/product/itsRoutes");
const storesRoutes = require("./API/store/storeRoute");
const usersRoutes = require("./API/user/userRoutes");
const db = require("./db/models");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleweres/passport");

const app = express();

app.use(express.json());
app.use(cors()); // for security

// Importing images
app.use(
  "/media/Images",
  express.static(path.join(__dirname, "./media/Images"))
);

// Passport Middlewear
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Users routes
app.use(usersRoutes);

// Stores router
app.use("/stores", storesRoutes);

// Products routes
app.use("/products", productsRoutes);

// Errors middlewear has to be above the run
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Servier Error" });
});

const run = async () => {
  try {
    // await db.sequelize.sync({ force: true });
    await db.sequelize.sync();
    console.log("Connection to the database was successful!");
    await app.listen(8000, () => {
      console.log("Server is runinng good");
    });
  } catch (error) {
    console.log("Error connecting to the db", error);
  }
};

run();

// Static path
// app.use("/Images", express.static("Images"));
