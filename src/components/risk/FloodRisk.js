import React from "react";
import GoogleMapWithOverlay from "./GoogleMapWithOverlay";

function FloodRisk({ fluvial, coastal, lat, lon }) {
  console.log(lat, lon);

  const isValidFluvial =
    fluvial &&
    typeof fluvial === "object" &&
    !Array.isArray(fluvial) &&
    !("error" in fluvial) &&
    Object.keys(fluvial).length > 0;

  const fluvialError = fluvial?.error;

  const isValidCoastal =
    coastal &&
    ["100", "500"].some(
      (key) => typeof coastal[key] === "object" && coastal[key] !== null
    );

  return (
    <div className="mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      {/* Fluvial Flood Risk */}
      <h3>Riesgo Inundación Fluvial</h3>
      {fluvialError ? (
        <p style={{ fontStyle: "italic", color: "red" }}>{fluvialError}</p>
      ) : isValidFluvial ? (
        <>
          <table style={{marginBottom:"20px"}} border="1" cellPadding="6">
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
          <GoogleMapWithOverlay
            lat={lat}
            lng={lon}
            showCoastal={false}
            showFluvial={true}
          />
        </>
      ) : (
        <p style={{ fontStyle: "italic", color: "red" }}>
          MITECO service is offline or unavailable.
        </p>
      )}

      {/* Coastal Flood Risk */}
      <h3 className="mt-10">Riesgo Inundación Costera</h3>
      {isValidCoastal ? (
        ["100", "500"].map((key) => {
          const value = coastal[key];
          return (
            <div key={key} style={{ marginBottom: "2rem" }}>
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
          );
        })
      ) : (
        <p style={{ fontStyle: "italic", color: "red" }}>
          MITECO service is offline or unavailable.
        </p>
      )}

      {/* Combined Coastal Map View */}
      {isValidCoastal && (
        <GoogleMapWithOverlay
          lat={lat}
          lng={lon}
          showCoastal={true}
          showFluvial={false}
        />
      )}
    </div>
  );
}

export default FloodRisk;
