const { Store, Product } = require("../../db/models");

// fetch stores controller
exports.fetchStors = async (storeId, next) => {
  try {
    const store = Store.findByPk(storeId);
    return store;
  } catch (error) {
    next(error);
  }
};

// Get stores list controller
exports.getStoresList = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name", "id", "image"],
        },
      ],
    });
    console.log(req.get("host"));
    res.status(200).json(stores);
  } catch (error) {
    next(error);
  }
};

// Get store by Id
exports.getStoreById = async (req, res, next) => {
  const { storeId } = req.params;
  try {
    const foundStore = await Store.findByPk(storeId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name", "id", "image"],
        },
      ],
    });
    res.status(200).json(foundStore);
  } catch (error) {
    const err = new Error({ Error: "Store not found" });
    er.status = 404;
    next(err);
  }
};

// Add store
exports.addStore = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/media/Images/${req.file.filename}`;
    }
    const foundStore = await Store.findOne({
      where: { userId: req.user.id },
    });
    if (foundStore) {
      const err = new Error({ Error: "You already have a store" });
      err.status = 400;
      next(err);
    }
    req.body.userId = req.user.id;
    const newStore = await Store.create(req.body);
    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};

// Update Store
exports.updateStore = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/media/Images/${req.file.filename}`;
    }
    await req.store.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Delete store
exports.deleteStore = async (req, res, next) => {
  try {
    await req.store.destroy(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create new product
exports.productCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.store.userId) {
      if (req.file) {
        // req.body.image = `http://${req.get("host")}/media/Images/${
        req.body.image = `/media/Images/${req.file.filename}`;
      }
      req.body.storeId = req.store.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct); // 201: created
    } else {
      const err = new Error("Unauthorized user");
      err.status = 401;
      next(err);
    }
  } catch (catError) {
    next(catError);
  }
};
