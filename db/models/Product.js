const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      uniqe: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    // storeName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  return Product;
};

// Or do the below method which is basically the same

// const ProductModal = (sequelize, DataTypes) => {
//   const Product = sequelize.define("Product", {
//     name: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     price: {
//       type: DataTypes.INTEGER,
//     },
//     image: {
//       type: DataTypes.STRING,
//     },
//   });
//   return Product;
// };

// module.exports = ProductModal;
