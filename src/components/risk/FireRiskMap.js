import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "../../utils/loadGoogleMaps";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * FireRiskMap
 * Props:
 * - data: either the full /risk/fire payload ({ fire, forest:{geojson,hits...} })
 *         or just the forest payload ({ geojson, hits, ... })
 * - lat, lon: numbers/strings
 * - zoom: initial zoom (default 11)
 */
function FireRiskMap({ data, lat, lon, zoom = 11 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const dataLayerRef = useRef(null);
  const [isError, setIsError] = useState(false);

  // pick the forest payload regardless of nesting
  const forest = data?.forest ?? data ?? {};
  const fc = forest?.geojson; // FeatureCollection expected here
  // const hits = forest?.hits ?? [];
  const risk_overall = forest?.risk_overall ?? 0;
  console.log("Overall: " + risk_overall);

  // === color helpers ===
  // function colorForRisk(risk) {
  //   if (risk == null) return "#2e7d32";
  //   if (risk < 0.33) return "#2e7d32";
  //   if (risk < 0.66) return "#f57c00";
  //   return "#c62828";
  // }
  // function colorForDistance(meters) {
  //   if (meters == null) return "#2e7d32";
  //   if (meters < 200) return "#c62828";
  //   if (meters < 600) return "#f57c00";
  //   return "#2e7d32";
  // }

  useEffect(() => {
    const init = () => {
      if (!window.google?.maps) {
        setIsError(true);
        console.error("Google Maps API failed to load.");
        return;
      }

      const center = { lat: parseFloat(lat), lng: parseFloat(lon) };

      // Create/recenter map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: "hybrid",
        });
      } else {
        mapInstanceRef.current.setCenter(center);
      }

      const map = mapInstanceRef.current;

      // Reset previous data layer
      if (dataLayerRef.current) {
        dataLayerRef.current.setMap(null);
        dataLayerRef.current = null;
      }

      // New Data layer
      const layer = new window.google.maps.Data({ map });
      dataLayerRef.current = layer;

      // Build a quick lookup (forest_type + zone) -> hit
      // const keyFor = (obj) => `${obj?.forest_type ?? ""}::${obj?.zone ?? ""}`;
      // const hitByKey = new Map(hits.map((h) => [keyFor(h), h]));

      const ORANGE = "#ff9800";
      // Style by risk (if available), else distance
      layer.setStyle((feature) => {
        const forestType = feature.getProperty("forest_type");
        const zone = feature.getProperty("zone");
        // const dist = feature.getProperty("distance_m");
        const kind = feature.getProperty("kind"); // "patch" | "component"

        // const hit = hitByKey.get(`${forestType ?? ""}::${zone ?? ""}`);
        // const risk = hit?.risk ?? null;
        // const color = risk != null ? colorForRisk(risk) : colorForDistance(dist);

        return {
          fillColor: ORANGE,
          fillOpacity: kind === "patch" ? 0.30 : 0.15,
          strokeColor: ORANGE,
          strokeOpacity: 0.9,
          strokeWeight: kind === "patch" ? 2 : 1,
          zIndex: kind === "patch" ? 2 : 1,
        };
      });

      // Add GeoJSON (EPSG:4326)
      if (fc && fc.type === "FeatureCollection" && Array.isArray(fc.features)) {
        try {
          const added = layer.addGeoJson(fc);
          console.log(`[FireRiskMap] Added ${added?.length ?? 0} features to Data layer.`);

          // Fit bounds if we actually drew something
          if (added && added.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            let hasGeom = false;

            const walk = (geom) => {
              const type = geom.getType();
              if (type === "Point") {
                bounds.extend(geom.get()); hasGeom = true;
              } else if (type === "MultiPoint") {
                geom.getArray().forEach((p) => { bounds.extend(p.get()); hasGeom = true; });
              } else if (type === "LineString" || type === "LinearRing") {
                geom.getArray().forEach((p) => { bounds.extend(p); hasGeom = true; });
              } else if (type === "MultiLineString" || type === "Polygon") {
                geom.getArray().forEach((part) => walk(part));
              } else if (type === "MultiPolygon") {
                geom.getArray().forEach((poly) => walk(poly));
              } else if (type === "GeometryCollection") {
                geom.getArray().forEach((g) => walk(g));
              }
            };

            added.forEach((f) => {
              const g = f.getGeometry?.();
              if (g) walk(g);
            });

            if (hasGeom) {
              try { map.fitBounds(bounds); } catch {}
            }
          }
        } catch (e) {
          console.error("Failed to add GeoJSON to map:", e);
        }
      } else {
        console.warn("No forest.geojson FeatureCollection found in response.", fc);
      }

      // Marker at query point
      new window.google.maps.Marker({
        position: center,
        map,
        title: "Ubicación consultada",
      });
    };

    // need data + coords + google maps loaded
    if (!data || !lat || !lon) return;

    loadGoogleMapsScript(API_KEY)
      .then(init)
      .catch((err) => {
        console.error("Error loading Google Maps script:", err);
        setIsError(true);
      });
  }, [data, lat, lon, zoom]); // rerun when payload or coords change

  return (
    <div>
      {isError ? (
        <div>Failed to load the map. Please try again later.</div>
      ) : (
        <div ref={mapRef} style={{ height: "500px", width: "100%"}} />
      )}
    </div>
  );
}

export default FireRiskMap;
