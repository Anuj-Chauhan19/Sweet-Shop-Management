const Sweet = require("../models/Sweet.mongo");
const getNextId = require("../utils/getNextId");
const addSweet = async (req, res, next) => {
  try {
    const {  name, category, price, quantity } = req.body;
    const id = await getNextId();
    const sweet = await Sweet.create({ id, name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

const viewAllSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find({});
    res.status(200).json(sweets);
  } catch (err) {
    next(err);
  }
};

const viewSweetById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const sweet = await Sweet.findOne({ id});
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res.status(200).json(sweet);
  } catch (err) {
    next(err);
  }
};

const deleteSweetById = async (req, res, next) => {
  try {
    const sweet = await Sweet.findOneAndDelete({ id: req.params.id });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const purchaseSweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweet.findOne({ id });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (err) {
    next(err);
  }
};

const restockSweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ error: "Invalid restock quantity" });
    }

    const sweet = await Sweet.findOne({ id });
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (err) {
    next(err);
  }
};

const searchSweetsByName = async (req, res, next) => {
  try {
    const nameQuery = req.query.name || "";
    const sweets = await Sweet.find({
      name: { $regex: nameQuery, $options: "i" },
    });

    res.status(200).json(sweets);
  } catch (err) {
    next(err);
  }
};

const sortSweetsByPrice = async (req, res, next) => {
  try {
    const sweets = await Sweet.find().sort({ price: 1 });
    res.status(200).json(sweets);
  } catch (err) {
    next(err);
  }
};


module.exports = { addSweet, viewAllSweets, viewSweetById , deleteSweetById, purchaseSweet, restockSweet, searchSweetsByName, sortSweetsByPrice };
