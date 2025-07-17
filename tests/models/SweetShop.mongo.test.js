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





