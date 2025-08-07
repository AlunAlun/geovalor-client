// src/components/RiskResults.js
import React from "react";
import FireRisk from "./risk/FireRisk";
import FloodRisk from "./risk/FloodRisk";
import DesertificationRisk from "./risk/DesertificationRisk";
import SeismicRisk from "./risk/SeismicRisk";

function RiskResults({ data, lat, lon }) {
    console.log(data.seismic_risk)
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Risk Assessment Results</h2>

      {data.fire && <FireRisk fireData={data.fire} />}

      {data.desertification && (
        <DesertificationRisk desertData={data.desertification} />
      )}

      {data.fluvial_flood && data.coastal_flood && (
        <FloodRisk
          fluvial={data.fluvial_flood}
          coastal={data.coastal_flood}
          lat={lat}
          lon={lon}
        />
      )}

      {data.seismic && (
        <SeismicRisk seismicData={data.seismic}
        lat={lat}
        lon={lon}
        />
      )}
    </div>
  );
}

export default RiskResults;
