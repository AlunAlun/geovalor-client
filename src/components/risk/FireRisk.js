// src/components/risk/FireRisk.js
import React from "react";

function FireRisk({ fireData }) {
  if (!fireData) {
    return <p className="text-gray-500 italic">No hay datos de incendio disponibles.</p>;
  }

  return (
    <>
    <h2>
        Riesgo de Incendio Forestal
    </h2>
      {["96_05", "06_15"].map((period) => {
        const periodData = fireData[period];
        const imageKey = `image_${period}`;
        const image = fireData[imageKey];

        return (
          <div key={period} className="mb-4 w-full max-w-2xl rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
            <h3>Periodo: {period}</h3>
            <table className="w-full text-sm text-left border border-collapse border-gray-300 mb-4">
              <tbody>
                {Object.entries(periodData.data).map(([label, val]) => (
                  <tr key={label} className="border-b border-gray-200">
                    <td className="px-3 py-2 font-medium text-brand-dark">{label}</td>
                    <td className="px-3 py-2">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            

            {image && (
              <div className="border rounded overflow-hidden max-w-full">
                <img src={image} alt={`Mapa de incendio ${period}`} className="w-full" />
              </div>
            )}

          </div>
        );
      })}

    </>
  );
}

export default FireRisk;
