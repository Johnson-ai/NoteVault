// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-all">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          NoteVault
        </Link>

        <div className="hidden md:flex gap-8 font-medium">
          <a href="#about" className="hover:text-indigo-500 transition">About</a>
          <a href="#features" className="hover:text-indigo-500 transition">Features</a>
          <a href="#contact" className="hover:text-indigo-500 transition">Contact</a>
          <Link to="/login" className="hover:text-indigo-500 transition">Login</Link>
          <Link to="/signup" className="hover:text-indigo-500 transition">Signup</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow">
          <a href="#about" className="block py-2">About</a>
          <a href="#features" className="block py-2">Features</a>
          <a href="#contact" className="block py-2">Contact</a>
          <Link to="/login" className="block py-2">Login</Link>
          <Link to="/signup" className="block py-2">Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
