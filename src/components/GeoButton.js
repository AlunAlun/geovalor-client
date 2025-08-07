// src/components/GeoButton.js
import React from "react";

function GeoButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-geovalor-primary text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-geovalor-accent transition ${className}`}
    >
      {children}
    </button>
  );
}

export default GeoButton;
