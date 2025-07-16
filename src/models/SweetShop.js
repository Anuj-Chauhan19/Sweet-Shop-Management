const {
  DuplicateSweetException,
  SweetNotFoundException,
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

  getTotalSweets() {
    return this._sweets.size;
  }
}

module.exports = SweetShop;
