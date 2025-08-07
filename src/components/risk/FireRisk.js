// src/components/risk/FireRisk.js
import React from "react";

function FireRisk({ fireData }) {
  return (
    <div className="mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Riesgo de Incendio Forestal</h3>
      {["96_05", "06_15"].map((period) => {
        const periodData = fireData[period];
        const imageKey = `image_${period}`;
        const image = fireData[imageKey];

        return (
          <div key={period} style={{ marginBottom: "2rem" }}>
            <h4>Period: {period}</h4>

            {typeof periodData === "string" ? (
              <p>{periodData}</p>
            ) : (
              <table border="1" cellPadding="6">
                <tbody>
                  {Object.entries(periodData.data).map(([label, val]) => (
                    <tr key={label}>
                      <td><strong>{label}</strong></td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={image}
                  alt={`Fire Risk Map ${period}`}
                  style={{ maxWidth: "100%", border: "1px solid #ccc" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FireRisk;