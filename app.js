// import express from "express";
// const { req, res } = require("express");
// Importing body parser
// const bodyParser = require("body-parser"); // Now no need for this and line 14, only use line 15
// Importing products routes
const express = require("express");
const cors = require("cors");
const path = require("path");
const productsRoutes = require("./API/product/itsRoutes");
const db = require("./db/models");
const app = express();

// app.use(bodyParser.json());

// Middlewear
app.use(express.json());
app.use(cors()); // for security
// Static path
// app.use("/Images", express.static("Images"));
app.use(
  "/media/Images",
  express.static(path.join(__dirname, "./media/Images"))
);
app.use((req, res, next) => {
  console.log("I'm a middleware method");
  next();
});
app.use("/products", productsRoutes); // path route

// this is always at the bottom of the file
// 8000 represent the port that the app is listening to
// app.listen(8001, () => {
//   console.log("Server is runinng good");
// });

const run = async () => {
  try {
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
