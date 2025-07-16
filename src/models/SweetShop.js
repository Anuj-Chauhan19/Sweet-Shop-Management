const { DuplicateSweetException } = require('../../src/exceptions/CustomExceptions');

class SweetShop {
  constructor() {
    this._sweets = new Map();
  }

  addSweet(sweet) {
    if (this._sweets.has(sweet.id)) {
      throw new DuplicateSweetException(`Sweet with ID ${sweet.id} already exists`);
    }
    this._sweets.set(sweet.id, sweet);
    return true;
  }

  getTotalSweets() {
    return this._sweets.size;
  }
}

module.exports = SweetShop;