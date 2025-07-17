import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddSweetPage from "./pages/AddSweetPage";
import ViewAllSweets from "./pages/ViewAllSweets";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewAllSweets />} />
        <Route path="/add" element={<AddSweetPage />} />
      </Routes>
    </BrowserRouter>
  );
}
