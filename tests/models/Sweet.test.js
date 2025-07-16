const Sweet = require("../../src/models/Sweet");

describe("Sweet", () => {
  describe("constructor", () => {
    test("should create sweet with valid parameters", () => {
      // Arrange
      const id = 1001;
      const name = "Kaju Katli";
      const category = "Nut-Based";
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

describe("validation", () => {
  test("should throw error for invalid id", () => {
    // Arrange
    const invalidId = null;
    const name = "Kaju Katli";
    const category = "Nut-Based";
    const price = 50;
    const quantity = 20;

    // Act & Assert
    expect(() => {
      new Sweet(invalidId, name, category, price, quantity);
    }).toThrow("ID is required");
  });

  test("should throw error for empty name", () => {
    // Arrange
    const id = 1001;
    const name = "";
    const category = "Nut-Based";
    const price = 50;
    const quantity = 20;

    // Act & Assert
    expect(() => {
      new Sweet(id, name, category, price, quantity);
    }).toThrow("Name is required");
  });

  test("should throw error for negative price", () => {
    // Arrange
    const id = 1001;
    const name = "Kaju Katli";
    const category = "Nut-Based";
    const price = -10;
    const quantity = 20;

    // Act & Assert
    expect(() => {
      new Sweet(id, name, category, price, quantity);
    }).toThrow("Price must be positive");
  });

  test("should throw error for negative quantity", () => {
    // Arrange
    const id = 1001;
    const name = "Kaju Katli";
    const category = "Nut-Based";
    const price = 50;
    const quantity = -5;

    // Act & Assert
    expect(() => {
      new Sweet(id, name, category, price, quantity);
    }).toThrow("Quantity must be non-negative");
  });

  test("should throw error for invalid category", () => {
    // Arrange
    const id = 1001;
    const name = "Kaju Katli";
    const category = "Invalid-Type";
    const price = 50;
    const quantity = 20;

    // Act & Assert
    expect(() => {
      new Sweet(id, name, category, price, quantity);
    }).toThrow("Category must be one of: chocolate, candy, pastry");
  });

  test("should allow only valid categories: chocolate, candy, pastry", () => {
    const validCategories = ["chocolate", "candy", "pastry"];

    validCategories.forEach((category) => {
      // Arrange
      const id = Math.floor(Math.random() * 10000);
      const name = "Test Sweet";
      const price = 10;
      const quantity = 5;

      // Act
      const sweet = new Sweet(id, name, category, price, quantity);

      // Assert
      expect(sweet.category).toBe(category);
    });
  });
});
