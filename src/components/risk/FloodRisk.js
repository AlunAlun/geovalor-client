// src/components/risk/FloodRisk.js
import React from "react";
import GoogleMapWithOverlay from "./GoogleMapWithOverlay";
import RiskSlider from "./RiskSlider";

function FloodRisk({ fluvial, coastal, lat, lon }) {
  console.log("fV")
  console.log(fluvial)
  let isValidFluvial =
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
    <>
    <h2>
        Riesgo de Inundación
    </h2>
    <div className="page-break-after mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      {/* Fluvial Flood Risk */}
      <h3>Riesgo de Inundación Fluvial</h3>
      {fluvialError ? (
        <p className="text-red-600 italic mb-4">{fluvialError}</p>
      ) : isValidFluvial ? (
        <>
        <div className="w-full px-4 py-8">          {/* remove max-w-* and extra padding here */}
          <RiskSlider
            min={0}
            max={100}
            value={fluvial.overall}
            className="block w-full"      // stretch inside parent
            borderClassName="border border-brand-green/40"
          />
        </div>
          <table className="w-full text-sm text-left border border-collapse border-gray-300 mb-6">
            <thead className="">
              <tr>
                <th className="px-3 py-2 font-medium text-brand-white">Periodo Retorno (años)</th>
                <th className="px-3 py-2 font-medium text-brand-white">Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fluvial).filter(([key]) => key !== "overall").map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="px-3 py-2">{key}</td>
                  <td className="px-3 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </>
      ) : (
        <p className="text-red-600 italic mb-4">
          El servicio MITECO de inundación fluvial no está 100% disponible.
        </p>
      )}
      <GoogleMapWithOverlay
            lat={lat}
            lng={lon}
            showCoastal={false}
            showFluvial={true}
          />
      </div>
      <div className="mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">

      {/* Coastal Flood Risk */}
      <h3>Riesgo de Inundación Costera</h3>

      {isValidCoastal ? (
        <>
          <div className="w-full px-4 py-8">
            <RiskSlider
              min={0}
              max={100}
              value={coastal["overall"]}
              className="block w-full"
              borderClassName="border border-brand-green/40"
            />
          </div>

          {["100", "500"].map((key) => {
            const value = coastal[key];
            return (
              <div key={key} className="mb-6">
                <h5>Periodo de Retorno: {key} años</h5>
                <table className="w-full text-sm text-left border border-collapse border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 font-medium text-brand-white">Cota Máx (m)</th>
                      <th className="px-3 py-2 font-medium text-brand-white">Cota Media (m)</th>
                      <th className="px-3 py-2 font-medium text-brand-white">Área (km²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-3 py-2">{value.cota_max}</td>
                      <td className="px-3 py-2">{value.cota_media}</td>
                      <td className="px-3 py-2">{value.area_km2}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-red-600 italic mb-4">
          El servicio MITECO de inundación costera no está disponible.
        </p>
      )}


      {/* Combined Coastal Map View */}
      {/* {isValidCoastal && ( */}
        <GoogleMapWithOverlay
          lat={lat}
          lng={lon}
          showCoastal={true}
          showFluvial={false}
        />
      {/* )} */}
    </div>
    </>
  );
}

export default FloodRisk;