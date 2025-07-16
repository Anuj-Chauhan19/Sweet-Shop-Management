class InvalidDataException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDataException';
  }
}

class DuplicateSweetException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateSweetException';
  }
}

class SweetNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'SweetNotFoundException';
  }
}

class InsufficientStockException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InsufficientStockException';
  }
}

module.exports = {
  InvalidDataException,
  DuplicateSweetException,
  SweetNotFoundException,
  InsufficientStockException
};