import axios from "axios";

const BASE = "http://localhost:5000/api/sweets";

export const SweetsAPI = {
  getAll: async () => (await axios.get(BASE)).data,
  getSortedByPrice: async () => (await axios.get(`${BASE}/sort/price`)).data,
  search: async (term) => (await axios.get(`${BASE}/search?name=${term}`)).data,
  create: async (sweet) => await axios.post(BASE, sweet),
  purchase: async (id, qty) => await axios.post(`${BASE}/${id}/purchase`, { quantity:  Number(qty) }),
  restock: async (id, qty) => await axios.post(`${BASE}/${id}/restock`, { quantity: qty }),
   delete: async (id) => await axios.delete(`${BASE}/${id}`),
};
