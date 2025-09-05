// src/components/risk/SeismicRisk.js
import React from "react";
import SeismicRiskMap from "./SeismicRiskMap";
import RiskSlider from "./RiskSlider";

function SeismicRisk({ seismicData, lat, lon }) {
  if (!seismicData || !seismicData["HazardArea2002.NCSE-02"]) {
    return <p className="text-gray-500 italic">No hay datos sísmicos disponibles.</p>;
  }

  const features = seismicData["HazardArea2002.NCSE-02"].features;

  if (!features || features.length === 0) {
    return <p className="text-gray-500 italic">No se encontraron zonas sísmicas para esta ubicación.</p>;
  }

  const feature = features[0];
  const { properties } = feature;

  const propertyLabels = {
    nombre: "Municipio",
    ine_pro: "Código de provincia",
    ine_mun: "Código de municipio",
    aceleracion: "Aceleración sísmica esperada (g)",
    coeficient: "Coeficiente estructural",
  };

  const renderAceleracion = (value) => {
    const accel = parseFloat(value);
    let color = "gray";
    let label = "Desconocido";

    if (accel < 0.04) {
      color = "green";
      label = "Zona de peligro sísmico bajo";
    } else if (accel < 0.08) {
      color = "orange";
      label = "Zona de peligro sísmico medio";
    } else {
      color = "red";
      label = "Zona de peligro sísmico alto";
    }

    return (
      <span style={{ color, fontWeight: "bold" }}>
        {accel}g – {label}
      </span>
    );
  };

  return (
    <>
    <h2>Peligro sísmico (Norma NCSE-02)</h2>
    <div className="w-full px-4 py-8">
      <RiskSlider
        min={0}
        max={100}
        value={seismicData["overall"]}
        className="block w-full"
        borderClassName="border border-brand-green/40"
      />
    </div>

      <table className="w-full text-sm text-left border border-collapse border-gray-300 mb-6 mt-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 font-medium text-brand-dark">Descripción</th>
            <th className="px-3 py-2 font-medium text-brand-dark">Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties)
            .filter(([key]) => !["gid", "x", "y"].includes(key))
            .map(([key, value]) => (
              <tr key={key} className="border-b border-gray-200">
                <td className="px-3 py-2">{propertyLabels[key] || key}</td>
                <td className="px-3 py-2">
                  {key === "aceleracion" ? renderAceleracion(value) : value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="text-sm text-brand-dark space-y-2 mb-6">
        <p><strong>Interpretación de la aceleración sísmica:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li className="text-green-700">
            <strong>&lt; 0.04g:</strong> Zona de peligro sísmico bajo
          </li>
          <li className="text-orange-600">
            <strong>0.04g – 0.08g:</strong> Zona de peligro sísmico medio
          </li>
          <li className="text-red-600">
            <strong>&gt;= 0.08g:</strong> Zona de peligro sísmico alto
          </li>
        </ul>
        <p>
          Estos valores indican la aceleración máxima del terreno (g) esperada en un evento sísmico.
          Se utilizan para el diseño estructural según la norma NCSE-02.
        </p>
      </div>

      <SeismicRiskMap seismicData={seismicData} lat={lat} lon={lon} />

    </>
  );
}

export default SeismicRisk;
