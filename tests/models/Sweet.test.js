const Sweet = require('../../src/models/Sweet');

describe('Sweet', () => {
  describe('constructor', () => {
    test('should create sweet with valid parameters', () => {
      // Arrange
      const id = 1001;
      const name = 'Kaju Katli';
      const category = 'Nut-Based';
      const price = 50;
      const quantity = 20;

      // Act
      const sweet = new Sweet(id, name, category, price, quantity);

      // Assert
      expect(sweet.id).toBe(id);
      expect(sweet.name).toBe(name);
      expect(sweet.category).toBe(category);
      expect(sweet.price).toBe(price);
      expect(sweet.quantity).toBe(quantity);
    });
  });
});