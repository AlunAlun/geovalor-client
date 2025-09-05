// src/components/risk/FireRisk.js
import React from "react";
import RiskSlider from "./RiskSlider";

function toSpanishDecimal(value, decimals = 2) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function FireRisk({ fireData }) {
  if (!fireData) {
    return <p className="text-gray-500 italic">No hay datos de incendio disponibles.</p>;
  }
  const overallString = toSpanishDecimal(fireData.overall);

  return (
    <>
    <h2>
        Riesgo de Incendio Forestal
    </h2>
    <div className="w-full px-4 py-8">
      <RiskSlider
        min={0}
        max={1500}
        value={fireData.overall}
        className="block w-full"
        borderClassName="border border-brand-green/40"
      />
    </div>
    <div className="mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Riesgo general: </h3>
      <div className="mt-2 mb-2 text-sm text-brand-dark/80 leading-snug">
      El inmueble se encuentra en un término municipal que ha registrado un promedio de <span className="font-bold"> {overallString}</span> incendios (o conatos) en los datos históricos. El valor máximo registrado en el país durante este período es de 1.511.
      </div>
    </div>
      {["96_05", "06_15"].map((period) => {
        const periodString = period === "96_05" ? "1996 - 2005" : "2006 - 2015"
        const periodData = fireData[period];
        const imageKey = `image_${period}`;
        const image = fireData[imageKey];

        const hasData = periodData && periodData.data && Object.keys(periodData.data).length > 0;

        if (!hasData && !image) {
          return null; // Nothing to show for this period
        }

        return (
          <div key={period} className="mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
            
            <h3>Datos Históricos: {periodString}</h3>
            {hasData ? (
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
            ) : (
              <div>No hay riesgo de incendio forestal en periodo {period}</div>
            )}
            
            

            {image && (
              <div className="border w-3/4 max-w-full rounded overflow-hidden mx-auto">
                <img
                  src={image}
                  alt={`Mapa de incendio ${period}`}
                  className="w-full"
                />
              </div>
            )}

          </div>
        );
      })}

    </>
  );
}

export default FireRisk;
