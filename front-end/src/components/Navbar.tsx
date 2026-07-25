import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">
            L
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">LeadDesk</h1>
            <p className="-mt-1 text-xs text-gray-500">Mini CRM</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            Contact
          </a>

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Admin Login
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-4 px-6 py-5">
            <a
              href="#features"
              className="block font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>

            <a
              href="#contact"
              className="block font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Admin Login
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;