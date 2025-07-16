const mongoose = require("mongoose");

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
  await mongoose.connection.dropDatabase(); // ✅ clean DB
  await mongoose.connection.close();
});
