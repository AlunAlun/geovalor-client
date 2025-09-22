import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../img/geovalor_logo_256.png";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between">
        {/* LEFT: Brand + (desktop) primary links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <img src={logo} alt="Geovalor Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-brand-dark">GeoTasa</span>
          </Link>

          {/* Desktop left links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/producto" className="font-semibold text-brand-dark hover:text-brand-green">
              Producto
            </Link>
            <Link to="/contacto" className="font-semibold text-brand-dark hover:text-brand-green">
              Contacto
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-dark"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* RIGHT: Desktop auth + dashboard */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && (
            <Link
              to="/buscar"
              className="rounded-xl px-4 py-2 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white"
            >
              Panel de Control
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
                closeMenu();
              }}
              className="bg-brand-green text-white px-4 py-2 ring-1 ring-brand-green rounded-xl hover:bg-brand-dark"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-brand-green text-white px-4 py-2 ring-1 ring-brand-green rounded-xl hover:bg-brand-dark"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 items-center text-center">
          <Link to="/producto" className="font-semibold text-brand-green hover:text-brand-dark" onClick={closeMenu}>
            Producto
          </Link>
          <Link to="/contacto" className="font-semibold text-brand-green hover:text-brand-dark" onClick={closeMenu}>
            Contacto
          </Link>

          {isAuthenticated && (
            <Link
              to="/buscar"  // unified with desktop
              onClick={closeMenu}
              className="w-full rounded-xl px-4 py-2 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white"
            >
              Panel de Control
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
                closeMenu();
              }}
              className="w-full bg-brand-green text-white px-4 py-2 ring-1 ring-brand-green rounded-xl hover:bg-brand-dark"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={() => {
                loginWithRedirect();
                closeMenu();
              }}
              className="w-full bg-brand-green text-white px-4 py-2 ring-1 ring-brand-green rounded-xl hover:bg-brand-dark"
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
