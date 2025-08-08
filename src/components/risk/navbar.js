import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../img/geovalor_logo_256.png"

function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo} // Update this path if your logo is somewhere else
          alt="Geovalor Logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-bold text-brand-dark">Geovalor</span>
      </Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-brand-green">
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
    </nav>
  );
}

export default Navbar;
