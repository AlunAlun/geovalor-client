// src/components/risk/FloodRisk.js
import React from "react";
import GoogleMapWithOverlay from "./GoogleMapWithOverlay";

function FloodRisk({ fluvial, coastal, lat, lon }) {
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
    <>
    <h2>
        Riesgo de Inundación
    </h2>
    <div className="mb-4 w-full max-w-2xl rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      {/* Fluvial Flood Risk */}
      <h3>Riesgo de Inundación Fluvial</h3>

      {fluvialError ? (
        <p className="text-red-600 italic mb-4">{fluvialError}</p>
      ) : isValidFluvial ? (
        <>
          <table className="w-full text-sm text-left border border-collapse border-gray-300 mb-6">
            <thead className="">
              <tr>
                <th className="px-3 py-2 font-medium text-brand-white">Periodo Retorno (años)</th>
                <th className="px-3 py-2 font-medium text-brand-white">Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fluvial).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="px-3 py-2">{key}</td>
                  <td className="px-3 py-2">{value}</td>
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
        <p className="text-red-600 italic mb-4">
          El servicio MITECO de inundación fluvial no está disponible.
        </p>
      )}
      </div>
      <div className="mb-4 w-full max-w-2xl rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">

      {/* Coastal Flood Risk */}
      <h3>Riesgo de Inundación Costera</h3>

      {isValidCoastal ? (
        ["100", "500"].map((key) => {
          const value = coastal[key];
          return (
            <div key={key} className="mb-6">
              <h5>Periodo de Retorno: {key} años</h5>
              <table className="w-full text-sm text-left border border-collapse border-gray-300">
                <thead className="">
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
        })
      ) : (
        <p className="text-red-600 italic mb-4">
          El servicio MITECO de inundación costera no está disponible.
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
    </>
  );
}

export default FloodRisk;



// import React from "react";
// import GoogleMapWithOverlay from "./GoogleMapWithOverlay";

// function FloodRisk({ fluvial, coastal, lat, lon }) {
//   console.log(lat, lon);

//   const isValidFluvial =
//     fluvial &&
//     typeof fluvial === "object" &&
//     !Array.isArray(fluvial) &&
//     !("error" in fluvial) &&
//     Object.keys(fluvial).length > 0;

//   const fluvialError = fluvial?.error;

//   const isValidCoastal =
//     coastal &&
//     ["100", "500"].some(
//       (key) => typeof coastal[key] === "object" && coastal[key] !== null
//     );

//   return (
//     <div className="mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
//       {/* Fluvial Flood Risk */}
//       <h3>Riesgo Inundación Fluvial</h3>
//       {fluvialError ? (
//         <p style={{ fontStyle: "italic", color: "red" }}>{fluvialError}</p>
//       ) : isValidFluvial ? (
//         <>
//           <table style={{marginBottom:"20px"}} border="1" cellPadding="6">
//             <thead>
//               <tr>
//                 <th>Return Period (years)</th>
//                 <th>Flood Probability</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(fluvial).map(([key, value]) => (
//                 <tr key={key}>
//                   <td>{key}</td>
//                   <td>{value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <GoogleMapWithOverlay
//             lat={lat}
//             lng={lon}
//             showCoastal={false}
//             showFluvial={true}
//           />
//         </>
//       ) : (
//         <p style={{ fontStyle: "italic", color: "red" }}>
//           MITECO service is offline or unavailable.
//         </p>
//       )}

//       {/* Coastal Flood Risk */}
//       <h3 className="mt-10">Riesgo Inundación Costera</h3>
//       {isValidCoastal ? (
//         ["100", "500"].map((key) => {
//           const value = coastal[key];
//           return (
//             <div key={key} style={{ marginBottom: "2rem" }}>
//               <h4>Return Period: {key} years</h4>
//               <table border="1" cellPadding="6">
//                 <thead>
//                   <tr>
//                     <th>Max Height (m)</th>
//                     <th>Mean Height (m)</th>
//                     <th>Area (km²)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{value.cota_max}</td>
//                     <td>{value.cota_media}</td>
//                     <td>{value.area_km2}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           );
//         })
//       ) : (
//         <p style={{ fontStyle: "italic", color: "red" }}>
//           MITECO service is offline or unavailable.
//         </p>
//       )}

//       {/* Combined Coastal Map View */}
//       {isValidCoastal && (
//         <GoogleMapWithOverlay
//           lat={lat}
//           lng={lon}
//           showCoastal={true}
//           showFluvial={false}
//         />
//       )}
//     </div>
//   );
// }

// export default FloodRisk;
