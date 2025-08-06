// src/components/risk/DesertificationRisk.js
import React from "react";

function DesertificationRisk({ desertData }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Desertification Risk</h3>
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