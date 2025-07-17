import { useEffect, useState } from "react";
import { getAllSweets, deleteSweet, searchSweet } from "../lib/api";
import SweetCard from "../components/SweetCard";
import AddSweet from "../components/AddSweet";
import SearchSort from "../components/SearchAndSort";

export default function Home() {
  const [sweets, setSweets] = useState([]);

  const fetchSweets = async () => {
    const data = await getAllSweets();
    setSweets(data);
  };

  const handleDelete = async (id) => {
    await deleteSweet(id);
    fetchSweets();
  };

  const handleSearch = async (name) => {
    if (name.trim() === "") return fetchSweets();
    const results = await searchSweet(name);
    setSweets(results);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center text-sweet">Sweet Shop</h1>
      <AddSweet onAdded={fetchSweets} />
      <SearchSort onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard key={sweet.id} sweet={sweet} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
