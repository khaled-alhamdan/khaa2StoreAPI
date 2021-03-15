// importing products list
let products = require("../../productsData");
// Importing slugify
const slugify = require("slugify");

// Get products list function
exports.getProductsList = (_, res) => {
  // If no request can put "_"
  // {request, res} can be {tomato, apple}
  // JS logic here
  res.json(products);
};

// Get product by ID function
exports.getProductsByID = (req, res) => {
  const productId = req.params.productId;
  const foundProduct = products.find((product) => product.id === +productId);
  foundProduct
    ? res.json(foundProduct)
    : res.status(404).json({ error: "product was not found" });
};

// Delete function
exports.deleteProduct = (req, res) => {
  // :id is the req.param
  // const { productId } = req.params; // lines 23 and 24 are equivelent to each other
  const productId = req.params.productId;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    // .json(`this is the new array after deleting the desired id`); // Will be displayed in raw
    res.status(204).json(products);
  } else {
    // res.json(` This is the current array ${products}`); // Will be displayed in raw
    res.status(404).json({ error: "product was not found" });
  }
};

// Create function
exports.productCreate = (req, res) => {
  const id = products[products.length - 1].id + 1; // go in prodcts, specify the requested item using [], .id to give me the id of the requested item

  const slug = slugify(req.body.productName, { lower: true });
  // const newProduct = { ...req.body, id, slug }; // in this form it will print everything in the added body first then the id and slug
  const newProduct = { id, slug, ...req.body }; // in this form it will print the id and slug first then print whats in the added body
  products.push(newProduct);
  res.status(201).json(newProduct); // 201: created
};

// Update function
exports.updateProduct = (req, res) => {
  // const productId = req.params.productId;
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const eachItemInsideTheObject in req.body)
      foundProduct[eachItemInsideTheObject] = req.body[eachItemInsideTheObject];
    res.status(204).json(foundProduct); // 204: update was received
  } else {
    res.status(404).json({ error: "product was not found" });
  }
};
