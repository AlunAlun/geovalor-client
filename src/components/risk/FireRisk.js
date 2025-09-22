// src/components/risk/FireRisk.js
import React from "react";
import RiskSlider from "./RiskSlider";
import FireRiskMap from "./FireRiskMap";

function toSpanishDecimal(value, decimals = 2) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function FireRisk({ fireData, forestData, lat, lon }) {
  if (!fireData) {
    return <p className="text-gray-500 italic">No hay datos de incendio disponibles.</p>;
  }
  const historicString = toSpanishDecimal(fireData.overall, 0);
  // const forestString = toSpanishDecimal(forestData?.risk_overall);

  const historicRisk = (fireData.overall/1511) / 2
  console.log(historicRisk)
  const forestRisk = forestData?.risk_overall / 2
  const overallRisk = ((historicRisk + forestRisk) * 100).toFixed(0)

  // utils/forestRiskText.js
  function getForestRiskText(risk) {
    const r = Number.isFinite(risk) ? Math.max(0, Math.min(1, risk)) : 0;

    if (r === 0) {
      return {
        level: "Muy bajo",
        color: "#2e7d32",
        message:
          "No se detectan masas forestales relevantes en el entorno consultado. Riesgo por proximidad prácticamente nulo.",
      };
    } else if (r < 0.20) {
      return {
        level: "Bajo",
        color: "#43a047",
        message:
          "Existen pequeñas masas forestales o algo alejadas. El riesgo por proximidad y tamaño es reducido.",
      };
    } else if (r < 0.40) {
      return {
        level: "Moderado",
        color: "#f57c00",
        message:
          "Hay masas forestales cercanas de tamaño medio. Vigilar condiciones locales (viento, pendientes, sequedad).",
      };
    } else if (r < 0.70) {
      return {
        level: "Alto",
        color: "#e65100",
        message:
          "La ubicación está próxima a masas forestales significativas.",
      };
    } else {
      return {
        level: "Muy alto",
        color: "#c62828",
        message:
          "La ubicación se encuentra dentro o junto a una gran masa forestal. Riesgo elevado por proximidad y tamaño.",
      };
    }
  }

  const { level, color, message } = getForestRiskText(forestRisk);
  const pct = (Math.round((Math.min(1, Math.max(0, forestRisk)) || 0) * 1000) / 10).toFixed(1); // e.g., 34.6%

  return (
    <>
    <h2>
        Riesgo de Incendio Forestal
    </h2>
    <div className="w-full px-4 py-8">
      <RiskSlider
        min={0}
        max={100}
        value={overallRisk}
        className="block w-full"
        borderClassName="border border-brand-green/40"
      />
    </div>
    <div className="mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Riesgo general: </h3>
      <div className="mt-2 mb-2 text-sm text-brand-dark/80 leading-snug">
      Según fuentes oficiales, el inmueble se encuentra en un término municipal que ha registrado un promedio de <span className="font-bold"> {historicString}</span> incendios (o conatos) en los datos históricos. El valor máximo registrado en el país durante este período es de 1.511.
      </div>
      <div style={{ border: `1px solid ${color}`, borderRadius: 8, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
          }}
        />
        <strong>Riesgo por proximidad a masas forestales: {level}</strong>
        <span style={{ marginLeft: "auto", color: "#666" }}>{pct}%</span>
      </div>
      <div style={{ color: "#333" }}>{message}</div>
      <div style={{ marginTop: 8, fontSize: 12, color: "#777" }}>
        <em>Nota:</em> Este indicador usa únicamente distancia a masas forestales y tamaño del parche.
      </div>
    </div>
    </div>
    <div className="mb-4 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Mapa forestal: </h3>
      <div className="mt-2 mb-1 text-sm text-brand-dark/80 leading-snug">
      {message}
      </div>
        <FireRiskMap data={forestData} lat={lat} lon={lon} />
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
