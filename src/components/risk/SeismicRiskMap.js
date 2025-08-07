import React from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";

// EPSG:3857 to EPSG:4326 conversion
function fromEPSG3857ToLatLng(x, y) {
  const lon = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return { lat, lng: lon };
}

function extractPolygon(feature) {
  if (
    !feature ||
    !feature.geometry ||
    feature.geometry.type !== "MultiPolygon"
  ) {
    return [];
  }

  // Assuming only the first outer ring is needed
  return feature.geometry.coordinates.map((multiPoly) =>
    multiPoly[0].map(([x, y]) => fromEPSG3857ToLatLng(x, y))
  );
}

function getPolygonColor(acelValue) {
  const acel = parseFloat(acelValue);
  if (acel < 0.04) return "#00cc00"; // green
  if (acel < 0.08) return "#ff9900"; // orange
  return "#cc0000"; // red
}

const SeismicRiskMap = ({ seismicData, lat, lon }) => {
console.log(lat, lon)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  if (!seismicData || !seismicData["HazardArea2002.NCSE-02"]) {
    return <div>No hay datos sísmicos para mostrar en el mapa.</div>;
  }

  const feature = seismicData["HazardArea2002.NCSE-02"].features[0];
  const { properties } = feature;
  const paths = extractPolygon(feature);
  const fillColor = getPolygonColor(properties.aceleracion);

  const lati = parseFloat(lat);
  const lngi = parseFloat(lon);
  const center = { lat: lati, lng: lngi }

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "2rem" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={11}
      >
        {paths.map((polygon, idx) => (
          <Polygon
            key={idx}
            paths={polygon}
            options={{
              fillColor,
              fillOpacity: 0.35,
              strokeColor: fillColor,
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default SeismicRiskMap;
