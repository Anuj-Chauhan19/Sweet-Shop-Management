import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchAndSort({ onSearch, onSort }) {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white border rounded shadow-sm">
      {/* Search input with icon */}
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search sweets..."
          className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-1/3">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full border rounded py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="quantity-asc">Quantity: Low to High</option>
          <option value="quantity-desc">Quantity: High to Low</option>
        </select>
      </div>
    </div>
  );
}
