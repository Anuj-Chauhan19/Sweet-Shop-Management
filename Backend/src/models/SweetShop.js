const {
  DuplicateSweetException,
  SweetNotFoundException,
  InsufficientStockException,
} = require("../../src/exceptions/CustomExceptions");

class SweetShop {
  constructor() {
    this._sweets = new Map();
  }

  addSweet(sweet) {
    if (this._sweets.has(sweet.id)) {
      throw new DuplicateSweetException(
        `Sweet with ID ${sweet.id} already exists`
      );
    }
    this._sweets.set(sweet.id, sweet);
    return true;
  }

  deleteSweet(id) {
    if (!this._sweets.has(id)) {
      throw new SweetNotFoundException(`Sweet with ID ${id} not found`);
    }
    this._sweets.delete(id);
    return true;
  }

  viewAllSweets() {
    return Array.from(this._sweets.values());
  }

  searchByName(name) {
    const searchTerm = name.toLowerCase();
    return this.viewAllSweets().filter((sweet) =>
      sweet.name.toLowerCase().includes(searchTerm)
    );
  }

  purchaseSweet(id, quantity) {
    if (!this._sweets.has(id)) {
      throw new SweetNotFoundException(`Sweet with ID ${id} not found`);
    }

    const sweet = this._sweets.get(id);
    if (sweet.quantity < quantity) {
      throw new InsufficientStockException(
        `Insufficient stock. Available: ${sweet.quantity}, Requested: ${quantity}`
      );
    }
    sweet.quantity -= quantity;
    return true;
  }

  getTotalSweets() {
    return this._sweets.size;
  }
}

module.exports = SweetShop;
