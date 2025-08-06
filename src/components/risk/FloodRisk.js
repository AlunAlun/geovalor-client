// src/components/risk/FloodRisk.js
import React from "react";

function FloodRisk({ fluvial, coastal }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Fluvial Flood */}
      <h3>Fluvial Flood Risk</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Return Period (years)</th>
            <th>Flood Probability</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(fluvial).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coastal Flood */}
      <h3>Coastal Flood Risk</h3>
      {Object.entries(coastal).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "1rem" }}>
          <h4>Return Period: {key} years</h4>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Max Height (m)</th>
                <th>Mean Height (m)</th>
                <th>Area (km²)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{value.cota_max}</td>
                <td>{value.cota_media}</td>
                <td>{value.area_km2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default FloodRisk;