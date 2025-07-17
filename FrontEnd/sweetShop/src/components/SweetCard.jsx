import { useState, useEffect } from "react";
import { SweetsAPI } from "../lib/api";
import Notification from "../components/Notification";

export default function SweetCard({ sweet, onActionDone }) {
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [restockQty, setRestockQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const purchase = async () => {
    if (purchaseQty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      await SweetsAPI.purchase(sweet.id, purchaseQty);
      setError("");
      onActionDone();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong!";
      setError(`❌ ${errorMsg}`);
    }
  };

  const restock = async () => {
    if (restockQty <= 0) {
      setError("❌ Restock quantity must be at least 1");
      return;
    }

    try {
      await SweetsAPI.restock(sweet.id, restockQty);
      setError("");
      onActionDone();
    } catch (err) {
      setError("❌ Failed to restock");
    }
  };

  const deleteSweet = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${sweet.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await SweetsAPI.delete(sweet.id);
      setSuccess("🗑️ Sweet deleted successfully!");
      setError("");
      onActionDone();
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.error || "❌ Failed to delete");
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
    <div className="bg-white p-5 rounded-lg shadow-lg border border-[#f0d5cb]">
      <h3 className="text-lg font-bold text-[#9B2D0B] mb-1">
        {sweet.name} <span className="text-sm text-gray-500">#{sweet.id}</span>
      </h3>
      <p className="text-gray-700">
        Category: <span className="font-medium">{sweet.category}</span>
      </p>
      <p className="text-gray-700">Price: ₹{sweet.price}</p>
      <p className="text-gray-700">Stock: {sweet.quantity}</p>

     {(success || error) && (
        <Notification message={success || error} type={success ? "success" : "error"} />
      )}

      <div className="mt-4 space-y-3">
        {/* Purchase Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={sweet.quantity}
              value={purchaseQty}
              onChange={(e) => setPurchaseQty(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
            <button
              onClick={purchase}
              className="bg-[#9B2D0B] text-white px-4 py-1 rounded hover:bg-[#7e2309]"
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Restock Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restock:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              value={restockQty}
              onChange={(e) => setRestockQty(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
            <button
              onClick={restock}
              className="bg-[#EFCFC2] text-[#9B2D0B] px-4 py-1 rounded hover:bg-[#f0bfb0]"
            >
              Restock
            </button>
          </div>
        </div>
        <div className="mt-4 text-right">
        <button
          onClick={deleteSweet}
          className="bg-[#9b2d0b] hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
        >
          Delete
        </button>
        </div>
      </div>
    </div>
  );
}
