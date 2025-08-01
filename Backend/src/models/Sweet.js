

const {
  InvalidDataException,
} = require("../exceptions/CustomExceptions");

class Sweet {
  constructor(id, name, category, price, quantity) {
    this._validateInput(id, name, category, price, quantity);
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }
  toString() {
    return `Sweet(${this.id}, ${this.name}, ${this.category}, ₹${this.price}, Stock: ${this.quantity})`;
  }
  equals(other) {
    if (!(other instanceof Sweet)) {
      return false;
    }
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.category === other.category &&
      this.price === other.price &&
      this.quantity === other.quantity
    );
  }
  _validateInput(id, name, category, price, quantity) {
    const allowedCategories = ["chocolate", "candy", "pastry", "nut-based", "others"];

    if (!id) {
      throw new InvalidDataException("ID is required");
    }
    if (!name || name.trim() === "") {
      throw new InvalidDataException("Name is required");
    }
    if (!category || category.trim() === "") {
      throw new InvalidDataException("Category is required");
    }
    if (price < 0) {
      throw new InvalidDataException("Price must be positive");
    }
    if (quantity < 0) {
      throw new InvalidDataException("Quantity must be non-negative");
    }
    if (!allowedCategories.includes(category.toLowerCase())) {
      throw new InvalidDataException(
        `Category must be one of: ${allowedCategories.join(", ")}`
      );
    }
  }
}

module.exports = Sweet;
