import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Geovalor</h1>

      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-brand-green text-white px-6 py-3 rounded-xl text-lg hover:bg-brand-dark transition"
        >
          Iniciar Sesión
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-xl font-semibold">Welcome, {user.name}</p>
          <button
            onClick={() => navigate("/buscar")}
            className="bg-brand-green text-white px-6 py-3 rounded-xl text-lg hover:bg-brand-dark transition"
          >
            Panel de Control
          </button>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-800 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
