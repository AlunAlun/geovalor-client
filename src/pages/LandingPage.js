import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../img/geovalor_logo_256.png"; 

function LandingPage() {
  const { isAuthenticated} = useAuth0();

  return (
    <div className="bg-brand-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center">
        <img src={logo} alt="Geovalor logo" className="w-32 h-32 mb-6" />
        <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Evaluación de Riesgos Ambientales en Tasaciones Inmobiliarias
        </h1>
        <p className="text-lg text-brand-dark max-w-lg mb-6">
            Anticípate a los nuevos requisitos regulatorios con GeoValor, la plataforma digital que automatiza el análisis de riesgos de sostenibilidad y la generación de informes.
        </p>
        {isAuthenticated ? (
            <Link
                to="/dashboard"
                className="bg-brand-green text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition"
            >
                <span>Panel de Control</span>

            </Link> 
            ) : (
            <Link
                to="/login"
                className="bg-brand-green text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition"
            >
                <span>Empieza Ahora</span>
            </Link>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
