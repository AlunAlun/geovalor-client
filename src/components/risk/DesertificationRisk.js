// src/components/risk/DesertificationRisk.js
import React from "react";
import RiskSlider from "./RiskSlider";

function DesertificationRisk({ desertData }) {
  return (
    <>
    <h2>Riesgo Desertificación</h2>
    <div className="w-full px-4 py-8">
      <RiskSlider
        min={0}
        max={100}
        value={desertData.overall}
        className="block w-full"
        borderClassName="border border-brand-green/40"
      />
    </div>
      <p><strong>Clasificación oficial de riesgo según <a href="https://www.miteco.gob.es/">MITECO</a>:</strong> {desertData.risk}</p>
      {desertData.img && (
        <img
          src={desertData.img}
          alt="Desertification Risk"
          style={{ maxWidth: "100%", border: "1px solid #ccc", marginTop: "1rem" }}
        />
      )}
    </>
  );
}

export default DesertificationRisk;