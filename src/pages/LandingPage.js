import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/geovalor_logo_256.png"; 

function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-beige flex flex-col items-center justify-center text-center px-4">
      <img src={logo} alt="Geovalor logo" className="w-32 h-32 mb-6" />
      <h1 className="text-4xl font-bold text-brand-dark mb-4">
        Welcome to Geovalor
      </h1>
      <p className="text-lg text-brand-dark max-w-xl mb-6">
        Know the risks before you build. Geovalor combines official flood, fire,
        seismic, and desertification data into a single environmental risk platform.
      </p>
      <Link
        to="/login"
        className="bg-brand-green text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition"
      >
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
