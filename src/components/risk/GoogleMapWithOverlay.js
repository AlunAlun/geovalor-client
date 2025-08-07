// src/components/risk/GoogleMapWithOverlay.js
import React, { useEffect, useRef } from "react";
import { loadGoogleMapsScript } from "../../utils/loadGoogleMaps";

const ZOOM = 16;
const TILE_SIZE = 256;
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function createWmsLayer({ baseUrl, layerName }) {
  return new window.google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const proj = Math.pow(2, zoom);
      const lonLeft = (coord.x / proj) * 360 - 180;
      const lonRight = ((coord.x + 1) / proj) * 360 - 180;

      const n = Math.PI - (2 * Math.PI * coord.y) / proj;
      const latTop = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));

      const n2 = Math.PI - (2 * Math.PI * (coord.y + 1)) / proj;
      const latBottom = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n2) - Math.exp(-n2)));

      const bbox = `${lonLeft},${latBottom},${lonRight},${latTop}`;

      const url = `${baseUrl}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=${layerName}` +
        `&STYLES=&FORMAT=image/png&TRANSPARENT=true&SRS=EPSG:4326` +
        `&WIDTH=${TILE_SIZE}&HEIGHT=${TILE_SIZE}&BBOX=${bbox}`
      return (
        url
      );
    },
    tileSize: new window.google.maps.Size(TILE_SIZE, TILE_SIZE),
    name: layerName,
    opacity: 0.5,
  });
}

function GoogleMapWithOverlay({ lat, lng, showFluvial, showCoastal }) {
  const mapRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript(API_KEY).then(() => {
      const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: ZOOM,
        mapTypeId: "roadmap",
      });

      // === Coastal Overlays ===
      if (showCoastal) {
        const overlay100 = createWmsLayer({
          baseUrl: "https://wmts.mapama.gob.es/sig/costas/zim_laminas_q100/ows",
          layerName: "zim_laminas_q100",
        });
        const overlay500 = createWmsLayer({
          baseUrl: "https://wmts.mapama.gob.es/sig/costas/zim_laminas_q500/ows",
          layerName: "zim_laminas_q500",
        });

        map.overlayMapTypes.insertAt(0, overlay100);
        map.overlayMapTypes.insertAt(1, overlay500);
      }

      // === Fluvial Overlays ===
      if (showFluvial) {
        const fluvialLayers = [
          "NZ.Flood.FluvialT10",
          "NZ.Flood.FluvialT100",
          "NZ.Flood.FluvialT500",
        ];

        fluvialLayers.forEach((layerName, index) => {
          const fluvialOverlay = createWmsLayer({
            baseUrl:
              "https://servicios.idee.es/wms-inspire/riesgos-naturales/inundaciones",
            layerName,
          });
          console.log("bob" + fluvialOverlay)
          map.overlayMapTypes.insertAt(0 + index, fluvialOverlay);
        });
      }

      // === Legend (only coastal for now) ===
      if (showCoastal) {
        const legendDiv = document.createElement("div");
        legendDiv.style.background = "white";
        legendDiv.style.padding = "10px";
        legendDiv.style.margin = "10px";
        legendDiv.style.border = "1px solid #ccc";
        legendDiv.style.fontSize = "12px";
        legendDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        legendDiv.innerHTML = `
          <div><strong>Legend</strong></div>
          <div style="margin-top: 6px;">
            <img 
              src="https://wmts.mapama.gob.es/sig/costas/zim_laminas_q100/ows?REQUEST=GetLegendGraphic&SERVICE=WMS&SLD_VERSION=1.1.0&SCALE=1731.6462417455396&VERSION=1.3.0&LEGEND_OPTIONS=fontAntiAliasing:true;forceTitles:on&FORMAT=image/png&LAYER=zim_laminas_q100&TRANSPARENT=true&"
              alt="100‑year legend"
              style="width: 60px; height: auto; display: block; margin-bottom: 2px;"
            />
            <span>Riesgo medio u ocasional (100 años)</span>
          </div>
          <div style="margin-top: 10px;">
            <img 
              src="https://wmts.mapama.gob.es/sig/costas/zim_laminas_q500/ows?REQUEST=GetLegendGraphic&SERVICE=WMS&SLD_VERSION=1.1.0&SCALE=1731.6462417455396&VERSION=1.3.0&LEGEND_OPTIONS=fontAntiAliasing:true;forceTitles:on&FORMAT=image/png&LAYER=zim_laminas_q500&TRANSPARENT=true&"
              alt="500‑year legend"
              style="width: 60px; height: auto; display: block; margin-bottom: 2px;"
            />
            <span>Riesgo bajo o excepcional (500 años)</span>
          </div>
        `;
        map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
      }
    });
  }, [lat, lng, showFluvial, showCoastal]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default GoogleMapWithOverlay;
