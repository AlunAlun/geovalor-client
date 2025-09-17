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

// onClick={() => logout({ returnTo: window.location.origin })}

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
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
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/producto" className="font-semibold text-brand-green hover:text-brand-dark">
            Producto
          </Link>
          <Link to="/contacto" className="font-semibold text-brand-green hover:text-brand-dark">
            Contacto
          </Link>
          {/* <Link to="/buscar" className="text-brand-green font-bold hover:underline"> */}
          <Link to="/buscar" className="rounded-xl px-4 py-2 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white">
            Panel de Control
          </Link>
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
          <Link to="/producto" className="font-semibold text-brand-green hover:text-brand-dark">
            Producto
          </Link>
          <Link to="/contacto" className="font-semibold text-brand-green hover:text-brand-dark">
            Contacto
          </Link>
          <Link to="/dashboard" onClick={closeMenu} className="w-full rounded-xl px-4 py-2 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white">
            Panel de Control
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout({ returnTo: window.location.origin });
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
