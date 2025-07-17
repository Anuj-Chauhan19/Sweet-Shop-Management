import { useEffect, useState } from "react";
import axios from "axios";
import SweetCard from "../components/SweetCard";

export default function ViewAllSweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);

  const fetchSweets = async () => {
    const url = sort
      ? "http://localhost:5000/api/sweets/sort/price"
      : "http://localhost:5000/api/sweets";
    const res = await axios.get(url);
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, [sort]);

  const filtered = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-[#fff5f1] min-h-screen">
      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search for sweets by name..."
          className="w-full md:w-2/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B2D0B] bg-white shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSort(!sort)}
          className="bg-[#EFCFC2] text-[#A31149] font-medium px-4 py-2 rounded-md hover:bg-[#f0bfb0] transition"
        >
          Sort by Price {sort ? "↓" : "↑"}
        </button>
      </div>

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((sweet) => (
          <SweetCard key={sweet.id} sweet={sweet} onActionDone={fetchSweets} />
        ))}
      </div>
    </div>
  );
}
