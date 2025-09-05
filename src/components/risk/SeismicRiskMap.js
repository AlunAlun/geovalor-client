import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "../../utils/loadGoogleMaps";

// === EPSG:3857 to EPSG:4326 ===
function fromEPSG3857ToLatLng(x, y) {
  const lon = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return { lat, lng: lon };
}

// === Extract polygon ===
function extractPolygons(feature) {
  if (!feature || !feature.geometry || feature.geometry.type !== "MultiPolygon") {
    return [];
  }
  return feature.geometry.coordinates.map((poly) =>
    poly[0].map(([x, y]) => fromEPSG3857ToLatLng(x, y))
  );
}

function getPolygonColor(acelValue) {
  const acel = parseFloat(acelValue);
  if (acel < 0.04) return "#00cc00"; // green
  if (acel < 0.08) return "#ff9900"; // orange
  return "#cc0000"; // red
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function SeismicRiskMap({ seismicData, lat, lon }) {
  const mapRef = useRef(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!seismicData || !seismicData["HazardArea2002.NCSE-02"]) return;

    const initializeMap = () => {
      if (!window.google || !window.google.maps) {
        setIsError(true);
        console.error("Google Maps API failed to load.");
        return;
      }

      const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 11,
        mapTypeId: "roadmap",
      });

      const feature = seismicData["HazardArea2002.NCSE-02"].features[0];
      const polygons = extractPolygons(feature);
      const color = getPolygonColor(feature.properties.aceleracion);

      polygons.forEach((path) => {
        new window.google.maps.Polygon({
          paths: path,
          map,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
        });
      });

      // Optional: Marker at query point
      new window.google.maps.Marker({
        position: center,
        map,
        title: "Ubicación consultada",
      });
    };

    loadGoogleMapsScript(API_KEY).then(() => {
      // Try to initialize the map
      initializeMap();
    }).catch((error) => {
      console.error("Error loading Google Maps script:", error);
      setIsError(true);
    });
  }, [seismicData, lat, lon]); // Now we no longer need to worry about 'initializeMap' as it's inside useEffect

  return (
    <div>
      {isError ? (
        <div>Failed to load the map. Please try again later.</div>
      ) : (
        <div ref={mapRef} style={{ height: "500px", width: "100%", marginTop: "2rem" }} />
      )}
    </div>
  );
}

export default SeismicRiskMap;
