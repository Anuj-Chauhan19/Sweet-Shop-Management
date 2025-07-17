const request = require("supertest");
const app = require("../../src/app");

const createSweet = async (data) => {
  
  const { id, ...payload } = data;
  const res = await request(app).post("/api/sweets").send(payload);
  return res; 
};
const viewAllSweets = () => request(app).get("/api/sweets");
const viewSweetById = (id) => request(app).get(`/api/sweets/${id}`);
const deleteSweet = (id) => request(app).delete(`/api/sweets/${id}`);
const purchaseSweet = (id, quantity) =>
  request(app).post(`/api/sweets/${id}/purchase`).send({ quantity });
const restockSweet = (id, quantity) =>
  request(app).post(`/api/sweets/${id}/restock`).send({ quantity });
const searchSweetByName = (name) =>
  request(app).get(`/api/sweets/search?name=${name}`);
const sortSweetsByPrice = () => request(app).get("/api/sweets/sort/price");

module.exports = {
  createSweet,
  viewAllSweets,
  viewSweetById,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweetByName,
  sortSweetsByPrice,
};
