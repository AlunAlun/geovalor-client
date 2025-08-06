import React from "react";
import GoogleMapWithOverlay from "./GoogleMapWithOverlay";

function FloodRisk({ fluvial, coastal, lat, lon}) {
  console.log(lat, lon)
  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Fluvial Flood Risk */}
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
      <GoogleMapWithOverlay lat={lat} lng={lon} showCoastal={false} showFluvial={true} />

      {/* Coastal Flood Risk */}
      <h3>Coastal Flood Risk</h3>
      {["100", "500"].map((key) => {
        const value = coastal[key];
        return (
          <div key={key} style={{ marginBottom: "2rem" }}>
            <h4>Return Period: {key} years</h4>
            {value ? (
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
            ) : (
              <p style={{ fontStyle: "italic" }}>No flood risk detected at this return period.</p>
            )}
          </div>
        );
      })}

      {/* Combined Map View */}
      <GoogleMapWithOverlay lat={lat} lng={lon} showCoastal={true} showFluvial={false} />
    </div>
  );
}

export default FloodRisk;
