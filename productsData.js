const slugify = require("slugify");

const products = [
  {
    id: 1,
    slug: "calculator",
    productName: "Calculator",
    // slug: slugify(productName, { lower: true }),
    productPrice: "5 K.D.",
    productPic: "/Images/calculator.jpeg",
    productDescription: "World best calculator",
  },
  {
    id: 2,
    slug: "The -special Eye Mask",
    productName: "The special Eye Mask",
    slug: "the-special-eye-mask",
    productPrice: "2 K.D.",
    productPic: "/Images/eyemask.jpeg",
    productDescription: "Sleep well",
  },
  {
    id: 3,
    slug: "tabasco",
    productName: "Tabasco",
    productPrice: "7 K.D.",
    productPic: "/Images/download.jpeg",
    productDescription: "Incredibly HOT!",
  },
];

module.exports = products;
