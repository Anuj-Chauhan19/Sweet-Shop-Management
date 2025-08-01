const Sweet = require("../../src/models/Sweet");
const SweetShop = require("../../src/models/SweetShop");
describe("addSweet", () => {
  test("should add sweet successfully", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-based", 50, 20);

    // Act
    const result = shop.addSweet(sweet);

    // Assert
    expect(result).toBe(true);
    expect(shop.getTotalSweets()).toBe(1);
  });

  test("should throw error for duplicate sweet ID", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const sweet2 = new Sweet(1001, "Duplicate", "Others", 30, 10);
    shop.addSweet(sweet1);

    // Act & Assert
    expect(() => {
      shop.addSweet(sweet2);
    }).toThrow("Sweet with ID 1001 already exists");
  });
});

describe("deleteSweet", () => {
  test("should delete sweet successfully", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    shop.addSweet(sweet);

    // Act
    const result = shop.deleteSweet(1001);

    // Assert
    expect(result).toBe(true);
    expect(shop.getTotalSweets()).toBe(0);
  });

  test("should throw error for non-existent sweet", () => {
    // Arrange
    const shop = new SweetShop();

    // Act & Assert
    expect(() => {
      shop.deleteSweet(9999);
    }).toThrow("Sweet with ID 9999 not found");
  });
});

describe("viewAllSweets", () => {
  test("should return all sweets", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const sweet2 = new Sweet(1002, "Gajar Halwa", "Chocolate", 30, 15);
    shop.addSweet(sweet1);
    shop.addSweet(sweet2);

    // Act
    const result = shop.viewAllSweets();

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(sweet1);
    expect(result).toContainEqual(sweet2);
  });

  test("should return empty array when no sweets", () => {
    // Arrange
    const shop = new SweetShop();

    // Act
    const result = shop.viewAllSweets();

    // Assert
    expect(result).toHaveLength(0);
  });
});

describe("searchByName", () => {
  test("should find sweets by partial name match", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet1 = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    const sweet2 = new Sweet(1002, "Gajar Halwa", "Chocolate", 30, 15);
    shop.addSweet(sweet1);
    shop.addSweet(sweet2);

    // Act
    const result = shop.searchByName("Kaju");

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Kaju Katli");
  });

  test("should return empty array when no match found", () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
    shop.addSweet(sweet);

    // Act
    const result = shop.searchByName("NonExistent");

    // Assert
    expect(result).toHaveLength(0);
  });
});

describe('purchaseSweet', () => {
  test('should purchase sweet successfully', () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    shop.addSweet(sweet);

    // Act
    const result = shop.purchaseSweet(1001, 5);

    // Assert
    expect(result).toBe(true);
    expect(shop.viewAllSweets()[0].quantity).toBe(15);
  });

  test('should throw error for insufficient stock', () => {
    // Arrange
    const shop = new SweetShop();
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    shop.addSweet(sweet);

    // Act & Assert
    expect(() => {
      shop.purchaseSweet(1001, 25);
    }).toThrow('Insufficient stock');
  });
});
