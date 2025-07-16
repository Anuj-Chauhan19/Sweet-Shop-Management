const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app.js");

describe("POST /api/sweets", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/sweetshop-test");
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

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
