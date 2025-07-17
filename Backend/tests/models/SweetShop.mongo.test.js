const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app.js");
const {
  createSweet,
  viewSweetById,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweetByName,
  sortSweetsByPrice,
  viewAllSweets,
} = require("../utils/SweetsHelper.js");

describe("POST /api/sweets", () => {
  test("should create a sweet with valid data", async () => {
    // Arrange
    const sweet = {
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };

    // Act
    const res = await createSweet(sweet);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Kaju Katli");
  });
});

describe("GET /api/sweets", () => {
  test("should return all sweets", async () => {
    // Arrange
    await createSweet({
      name: "Ladoo",
      category: "Others",
      price: 25,
      quantity: 10,
    });
    await createSweet({
      name: "Barfi",
      category: "Candy",
      price: 30,
      quantity: 5,
    });

    // Act
    const res = await viewAllSweets();

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe("Ladoo");
    expect(res.body[1].name).toBe("Barfi");
  });
});

describe("GET /api/sweets/:id", () => {
  test("should return sweet by ID", async () => {
    // Arrange
    const sweet = {
      name: "Jalebi",
      category: "Candy",
      price: 40,
      quantity: 15,
    };
    const createRes = await createSweet(sweet);
    const id = createRes.body.id;

    // Act
    const res = await viewSweetById(id);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jalebi");
  });
});

describe("DELETE /api/sweets/:id", () => {
  test("should delete sweet by ID", async () => {
    // Arrange
    const sweet = {
      name: "Gulab Jamun",
      category: "Chocolate",
      price: 60,
      quantity: 25,
    };
    const created = await createSweet(sweet);
    const id = created.body.id;

    // Act
    const res = await deleteSweet(id);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");

    const check = await viewSweetById(id);
    expect(check.statusCode).toBe(404);
  });
});

describe("POST /api/sweets/:id/purchase", () => {
  test("should decrease stock if quantity is available", async () => {
    // Arrange
    const created = await createSweet({
      name: "Halwa",
      category: "Pastry",
      price: 30,
      quantity: 10,
    });
    const id = created.body.id;

    // Act
    const res = await purchaseSweet(id, 5);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(5);
  });

  test("should return 400 if insufficient stock", async () => {
    // Arrange
    const created = await createSweet({
      name: "Rasgulla",
      category: "Candy",
      price: 30,
      quantity: 3,
    });
    const id = created.body.id;

    // Act
    const res = await purchaseSweet(id, 5);

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/insufficient stock/i);
  });

  test("should return 404 if sweet not found", async () => {
    // Act
    const res = await purchaseSweet(9999, 45);

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /api/sweets/:id/restock", () => {
  test("should increase stock by given quantity", async () => {
    // Arrange
    const created = await createSweet({
      name: "Peda",
      category: "Candy",
      price: 20,
      quantity: 10,
    });
    const id = created.body.id;

    // Act
    const res = await restockSweet(id, 5);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  test("should return 400 if restock quantity is zero or negative", async () => {
    // Arrange
    const created = await createSweet({
      name: "Peda",
      category: "Candy",
      price: 20,
      quantity: 10,
    });
    const id = created.body.id;

    // Act
    const res = await restockSweet(id, 0);

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid restock quantity/i);
  });

  test("should return 404 if sweet not found", async () => {
    // Act
    const res = await restockSweet(9999, 5);

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/sweet not found/i);
  });
});

describe("GET /api/sweets/search?name=", () => {
  test("should return sweets matching name query (case-insensitive)", async () => {
    // Arrange
    await createSweet({
      name: "Barfi",
      category: "Candy",
      price: 25,
      quantity: 10,
    });
    await createSweet({
      name: "Penda",
      category: "Others",
      price: 40,
      quantity: 10,
    });

    // Act
    const res = await searchSweetByName("bar");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Barfi");
  });

  test("should return empty array if no sweets match", async () => {
    // Act
    const res = await searchSweetByName("xyz");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("GET /api/sweets/sort/price", () => {
  test("should return sweets sorted by price ascending", async () => {
    // Arrange
    await createSweet({
      name: "Peda",
      category: "Candy",
      price: 30,
      quantity: 15,
    });
    await createSweet({
      name: "Soan Papdi",
      category: "Pastry",
      price: 40,
      quantity: 10,
    });
    await createSweet({
      name: "Milk Cake",
      category: "Others",
      price: 50,
      quantity: 5,
    });

    // Act
    const res = await sortSweetsByPrice();
    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].name).toBe("Peda");
    expect(res.body[1].name).toBe("Soan Papdi");
    expect(res.body[2].name).toBe("Milk Cake");
  });
});
