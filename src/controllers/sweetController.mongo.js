const Sweet = require("../models/Sweet.mongo");

const addSweet = async (req, res, next) => {
  try {
    const { id, name, category, price, quantity } = req.body;
    const sweet = await Sweet.create({ id, name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

module.exports = { addSweet };
