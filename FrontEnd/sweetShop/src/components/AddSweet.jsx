import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";

const categories = ["chocolate", "candy", "pastry", "Nut-Based", "others"];

export const AddSweet = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setSuccess("✅ Sweet added successfully!");
      setError("");
      setForm({ name: "", category: "", price: "", quantity: "" });
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-center mb-6 text-[#9B2D0B]">Add New Sweet</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="e.g., Kaju Katli"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-amber-400 outline-none"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Price (₹)</label>
            <input
              type="number"
              placeholder="e.g., 120"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              placeholder="e.g., 10"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-amber-300 text-[#A31149] text-lg rounded-md hover:bg-amber-600 transition"
          >
            ➕ Add Sweet
          </button>

          {/* Notification Centered */}
          <Notification message={success || error} type={success ? "success" : "error"} />

        </form>
      </div>
    </div>
  );
};
