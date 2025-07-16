const Sweet = require("../../src/models/Sweet");
const SweetShop = require("../../src/models/SweetShop");
describe('addSweet', () => {
  test('should add sweet successfully', () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-based', 50, 20);

    // Act
    const result = shop.addSweet(sweet);

    // Assert
    expect(result).toBe(true);
    expect(shop.getTotalSweets()).toBe(1);
  });

  test('should throw error for duplicate sweet ID', () => {
    // Arrange
    const shop = new SweetShop();
    const sweet1 = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const sweet2 = new Sweet(1001, 'Duplicate', 'Others', 30, 10);
    shop.addSweet(sweet1);

    // Act & Assert
    expect(() => {
      shop.addSweet(sweet2);
    }).toThrow('Sweet with ID 1001 already exists');
  });
});

describe('deleteSweet', () => {
  test('should delete sweet successfully', () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    shop.addSweet(sweet);

    // Act
    const result = shop.deleteSweet(1001);

    // Assert
    expect(result).toBe(true);
    expect(shop.getTotalSweets()).toBe(0);
  });

  test('should throw error for non-existent sweet', () => {
    // Arrange
    const shop = new SweetShop();

    // Act & Assert
    expect(() => {
      shop.deleteSweet(9999);
    }).toThrow('Sweet with ID 9999 not found');
  });
});