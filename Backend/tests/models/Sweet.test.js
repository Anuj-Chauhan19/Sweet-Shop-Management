const Sweet = require("../../src/models/Sweet");

describe("Sweet", () => {
  describe("constructor", () => {
    test("should create sweet with valid parameters", () => {
      // Arrange
      const id = 1001;
      const name = "Kaju Katli";
      const category = "Chocolate";
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

  test('should allow "others" as a valid category', () => {
    // Arrange
    const id = 1005;
    const name = "Imarti";
    const category = "others";
    const price = 25;
    const quantity = 12;

    // Act
    const sweet = new Sweet(id, name, category, price, quantity);

    // Assert
    expect(sweet.category).toBe("others");
  });
});

describe("toString", () => {
  test("should return formatted string representation", () => {
    // Arrange
    const sweet = new Sweet(1001, "Kaju Katli", "others", 50, 20);
    const expected = "Sweet(1001, Kaju Katli, others, ₹50, Stock: 20)";

    // Act
    const result = sweet.toString();

    // Assert
    expect(result).toBe(expected);
  });
});

describe("equals", () => {
  test("should return true for identical sweets", () => {
    // Arrange
    const sweet1 = new Sweet(1001, "Kaju Katli", "Chocolate", 50, 20);
    const sweet2 = new Sweet(1001, "Kaju Katli", "Chocolate", 50, 20);

    // Act
    const result = sweet1.equals(sweet2);

    // Assert
    expect(result).toBe(true);
  });

  test("should return false for different sweets", () => {
    // Arrange
    const sweet1 = new Sweet(1001, "Kaju Katli", "Chocolate", 50, 20);
    const sweet2 = new Sweet(1002, "Gajar Halwa", "Candy", 30, 15);

    // Act
    const result = sweet1.equals(sweet2);

    // Assert
    expect(result).toBe(false);
  });
});
