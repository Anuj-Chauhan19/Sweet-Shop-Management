import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-5 py-2 rounded-md text-lg transition duration-200 font-semibold ${
      location.pathname === path
        ? "bg-white/70 text-pink-700 shadow-sm"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <nav className="bg-orange-800 p-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo/Brand */}
        <div className="text-4xl font-bold text-white tracking-wide text-center md:text-left">
          🟠🧆 Sweet Shop 🍩🍯
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link to="/" className={linkStyle("/")}>
            View Sweets
          </Link>
          <Link to="/add" className={linkStyle("/add")}>
            Add Sweet
          </Link>
        </div>
      </div>
    </nav>
  );
}
