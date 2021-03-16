// import express from "express";
// const { req, res } = require("express");
const express = require("express");
const cors = require("cors");
// Importing body parser
// const bodyParser = require("body-parser"); // Now no need for this and line 14, only use line 15
// Importing products routes
const productsRoutes = require("./API/product/itsRoutes");

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes); // path route

// this is always at the bottom of the file
app.listen(8001, () => {
  console.log("Server is runinng good");
}); // 8000 represent the port that the app is listening to
