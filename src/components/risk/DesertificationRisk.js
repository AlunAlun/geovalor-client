// src/components/risk/DesertificationRisk.js
import React from "react";

function DesertificationRisk({ desertData }) {
  return (
    <div className="mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Riesgo Desertificación</h3>
      <p><strong>Risk Level:</strong> {desertData.risk}</p>
      {desertData.img && (
        <img
          src={desertData.img}
          alt="Desertification Risk"
          style={{ maxWidth: "100%", border: "1px solid #ccc", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}

export default DesertificationRisk;