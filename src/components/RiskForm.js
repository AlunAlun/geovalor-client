// src/components/RiskForm.js
import React from "react";

function RiskForm({ lat, lon, setLat, setLon, fetchRiskData }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Latitude:
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          style={{ marginLeft: "0.5rem", marginRight: "1rem" }}
          placeholder="41.3879"
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
          placeholder="2.1699"
        />
      </label>
      <button onClick={() => fetchRiskData(lat, lon)} style={{ marginLeft: "1rem" }}>
        Get Risk
      </button>
    </div>
  );
}

export default RiskForm;