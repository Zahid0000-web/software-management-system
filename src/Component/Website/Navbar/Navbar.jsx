import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-[#f8fafc] border-b border-gray-200"
      }`}
    >
<div className="w-full flex justify-between items-center px-4 lg:px-16 py-3.5">        <Logo />

        {/* Desktop Menu */}
        <Menu />

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <MobileMenu onClose={() => setMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;

/* ─── Mobile Menu (inline, no new routes) ─── */
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Training", to: "/traninig" },
  { label: "Fee", to: "/fee" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Apply", to: "/apply" },
];

const MobileMenu = ({ onClose }) => {
  const location = useLocation();
  return (
    <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
      {navLinks.map(({ label, to }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors duration-150 ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};