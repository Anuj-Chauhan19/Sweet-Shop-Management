const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app.js");

describe("POST /api/sweets", () => {
  test("should create a sweet with valid data", async () => {
    // Arrange
    const sweetData = {
      id: 1001,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };

    // Act
    const res = await request(app).post("/api/sweets").send(sweetData);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Kaju Katli");
  });
});

describe("GET /api/sweets", () => {
  test("should return all sweets", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 2001,
      name: "Ladoo",
      category: "others",
      price: 25,
      quantity: 10,
    });

    await request(app).post("/api/sweets").send({
      id: 2002,
      name: "Barfi",
      category: "Candy",
      price: 30,
      quantity: 5,
    });

    // Act
    const res = await request(app).get("/api/sweets");

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
    const sweetData = {
      id: 3001,
      name: "Jalebi",
      category: "candy",
      price: 40,
      quantity: 15,
    };
    await request(app).post("/api/sweets").send(sweetData);

    // Act
    const res = await request(app).get("/api/sweets/3001");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jalebi");
  });
});

describe("DELETE /api/sweets/:id", () => {
  test("should delete sweet by ID", async () => {
    // Arrange
    const sweetData = {
      id: 4001,
      name: "Gulab Jamun",
      category: "chocolate",
      price: 60,
      quantity: 25,
    };
    await request(app).post("/api/sweets").send(sweetData);

    // Act
    const res = await request(app).delete("/api/sweets/4001");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");

    const check = await request(app).get("/api/sweets/4001");
    expect(check.statusCode).toBe(404);
  });
});

describe("POST /api/sweets/:id/purchase", () => {
  test("should decrease stock if quantity is available", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 3001,
      name: "Gulab Jamun",
      category: "Pastry",
      price: 40,
      quantity: 10,
    });

    // Act
    const res = await request(app)
      .post("/api/sweets/3001/purchase")
      .send({ quantity: 4 });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(6);
  });

  test("should return 400 if insufficient stock", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 3002,
      name: "Rasgulla",
      category: "Candy",
      price: 35,
      quantity: 3,
    });

    // Act
    const res = await request(app)
      .post("/api/sweets/3002/purchase")
      .send({ quantity: 5 });

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/insufficient stock/i);
  });

  test("should return 404 if sweet not found", async () => {
    // Act
    const res = await request(app)
      .post("/api/sweets/9999/purchase")
      .send({ quantity: 2 });

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /api/sweets/:id/restock", () => {
  test("should increase stock by given quantity", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 4001,
      name: "Peda",
      category: "Chocolate",
      price: 20,
      quantity: 10,
    });

    // Act
    const res = await request(app)
      .post("/api/sweets/4001/restock")
      .send({ quantity: 5 });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  test("should return 400 if restock quantity is zero or negative", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 4002,
      name: "Soan Papdi",
      category: "Pastry",
      price: 15,
      quantity: 5,
    });

    // Act
    const res = await request(app)
      .post("/api/sweets/4002/restock")
      .send({ quantity: 0 });

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid restock quantity/i);
  });

  test("should return 404 if sweet not found", async () => {
    // Act
    const res = await request(app)
      .post("/api/sweets/9999/restock")
      .send({ quantity: 3 });

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/sweet not found/i);
  });
});


describe("GET /api/sweets/search?name=", () => {
  test("should return sweets matching name query (case-insensitive)", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 7001,
      name: "Gulab Jamun",
      category: "Pastry",
      price: 45,
      quantity: 10,
    });

    await request(app).post("/api/sweets").send({
      id: 7002,
      name: "Barfi",
      category: "Candy",
      price: 30,
      quantity: 15,
    });

    // Act
    const res = await request(app).get("/api/sweets/search?name=bar");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Barfi");
  });

  test("should return empty array if no sweets match", async () => {
    // Act
    const res = await request(app).get("/api/sweets/search?name=xyz");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("GET /api/sweets/sort/price", () => {
  test("should return sweets sorted by price ascending", async () => {
    // Arrange
    await request(app).post("/api/sweets").send({
      id: 9001,
      name: "Milk Cake",
      category: "Pastry",
      price: 50,
      quantity: 10,
    });

    await request(app).post("/api/sweets").send({
      id: 9002,
      name: "Peda",
      category: "Candy",
      price: 30,
      quantity: 15,
    });

    await request(app).post("/api/sweets").send({
      id: 9003,
      name: "Soan Papdi",
      category: "Others",
      price: 40,
      quantity: 20,
    });

    // Act
    const res = await request(app).get("/api/sweets/sort/price");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].name).toBe("Peda");
    expect(res.body[1].name).toBe("Soan Papdi");
    expect(res.body[2].name).toBe("Milk Cake");
  });
});





