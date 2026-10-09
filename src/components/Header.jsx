import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/#home" },
  { label: "Schedule", to: "/#schedule" },
  { label: "Register", to: "/register" },
  { label: "Student Portal", to: "/student-portal" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/#home"
        aria-label="Tech Kriti home"
        onClick={closeMenu}
      >
        <span className="brand-mark">TK</span>
        <span className="brand-name">
          TECH
          <br />
          <span className="brand-kriti">KRITI</span>
        </span>
      </Link>

      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "×" : "☰"}
      </button>

      <nav
        className={`nav-links${isOpen ? " open" : ""}`}
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="admin-link" to="/admin" onClick={closeMenu}>
          Admin
        </Link>
      </nav>
    </header>
  );
}
