import React from "react";
import SeismicRiskMap from "./SeismicRiskMap";

function SeismicRisk({ seismicData, lat, lon }) {

  if (!seismicData || !seismicData["HazardArea2002.NCSE-02"]) {
    return <div>No hay datos sísmicos disponibles.</div>;
  }

  const features = seismicData["HazardArea2002.NCSE-02"].features;

  if (!features || features.length === 0) {
    return <div>No se encontraron zonas sísmicas para esta ubicación.</div>;
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
    <div className="mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
      <h3>Peligro sísmico (Norma NCSE-02)</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties)
            .filter(([key]) => !["gid", "x", "y"].includes(key))
            .map(([key, value]) => (
              <tr key={key}>
                <td>{propertyLabels[key] || key}</td>
                <td>
                  {key === "aceleracion" ? renderAceleracion(value) : value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <p><strong>Interpretación de la aceleración sísmica:</strong></p>
        <ul>
          <li style={{ color: "green" }}>
            <strong>&lt; 0.04g:</strong> Zona de peligro sísmico bajo
          </li>
          <li style={{ color: "orange" }}>
            <strong>0.04g – 0.08g:</strong> Zona de peligro sísmico medio
          </li>
          <li style={{ color: "red" }}>
            <strong>&gt;= 0.08g:</strong> Zona de peligro sísmico alto
          </li>
        </ul>
        <p>
          Estos valores indican la aceleración máxima del terreno (g) esperada
          en un evento sísmico. Se utilizan para el diseño estructural según la norma NCSE-02.
        </p>
      </div>
    
    <SeismicRiskMap seismicData={seismicData} lat={lat} lon={lon} />
    </div>
    </>
  );
}

export default SeismicRisk;
