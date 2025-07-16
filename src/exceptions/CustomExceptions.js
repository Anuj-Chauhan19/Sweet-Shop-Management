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

module.exports = {
  InvalidDataException,
  DuplicateSweetException
};