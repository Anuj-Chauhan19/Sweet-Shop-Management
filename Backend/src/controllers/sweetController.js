const Sweet = require('../models/Sweet');
const {
  DuplicateSweetException,
  SweetNotFoundException,
  InsufficientStockException
} = require('../exceptions/CustomExceptions');

// Add sweet
const addSweet = async (req, res, next) => {
  try {
    const existing = await Sweet.findOne({ id: req.body.id });
    if (existing) throw new DuplicateSweetException(`Sweet with ID ${req.body.id} already exists`);

    const sweet = new Sweet(req.body);
    await sweet.save();

    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

// Delete sweet
const deleteSweet = async (req, res, next) => {
  try {
    const result = await Sweet.findOneAndDelete({ id: req.params.id });
    if (!result) throw new SweetNotFoundException(`Sweet with ID ${req.params.id} not found`);
    res.json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// View all sweets
const viewAllSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

// Search by name
const searchByName = async (req, res, next) => {
  try {
    const searchTerm = req.query.name?.toLowerCase() || '';
    const sweets = await Sweet.find({
      name: { $regex: new RegExp(searchTerm, 'i') }
    });
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

// Purchase sweet
const purchaseSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findOne({ id: req.params.id });

    if (!sweet) throw new SweetNotFoundException(`Sweet with ID ${req.params.id} not found`);
    if (sweet.quantity < quantity) {
      throw new InsufficientStockException(
        `Insufficient stock. Available: ${sweet.quantity}, Requested: ${quantity}`
      );
    }

    sweet.quantity -= quantity;
    await sweet.save();
    res.json({ message: 'Purchase successful', sweet });
  } catch (err) {
    next(err);
  }
};

// Get total sweets count
const getTotalSweets = async (req, res, next) => {
  try {
    const count = await Sweet.countDocuments();
    res.json({ total: count });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addSweet,
  deleteSweet,
  viewAllSweets,
  searchByName,
  purchaseSweet,
  getTotalSweets
};
