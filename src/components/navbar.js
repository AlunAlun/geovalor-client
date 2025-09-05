import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../img/geovalor_logo_256.png";
import { Menu, X } from "lucide-react"; // ✅ install lucide-react if not already

function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <img src={logo} alt="Geovalor Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-brand-dark">GeoTasa</span>
        </Link>

        {/* Hamburger Icon (only on mobile) */}
        <button
          className="md:hidden text-brand-dark"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/buscar" className="hover:text-brand-green">
            Panel de Control
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-dark"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-dark"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 items-center text-center">
          <Link to="/dashboard" onClick={closeMenu} className="hover:text-brand-green">
            Panel de Control
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout({ returnTo: window.location.origin });
                closeMenu();
              }}
              className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-dark"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={() => {
                loginWithRedirect();
                closeMenu();
              }}
              className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-dark"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
