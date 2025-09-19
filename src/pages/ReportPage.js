// src/pages/ReportPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import FireRisk from "../components/risk/FireRisk";
import FloodRisk from "../components/risk/FloodRisk";
import SeismicRisk from "../components/risk/SeismicRisk";
import DesertificationRisk from "../components/risk/DesertificationRisk";

const API_BASE_URL = process.env.REACT_APP_GEOVALOR_API_URL;
const riskTypes = ["flood", "fire", "seismic", "desert"];

const mapContainerStyle = { width: "100%", height: "200px" };

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const lat = location.state?.lat;
  const lon = location.state?.lon;
  const address = location.state?.address;

  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});

  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    id: "google-map-script",
  });

  useEffect(() => {
    if (!lat || !lon) navigate("/");
  }, [lat, lon, navigate]);

  useEffect(() => {
    const fetchRisk = async (type) => {
      try {
        setLoading((prev) => ({ ...prev, [type]: true }));
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/risk/${type}?lat=${lat}&lon=${lon}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch ${type}`);
        const json = await res.json();
        setResults((prev) => ({ ...prev, [type]: json }));

      } catch (err) {
        console.error(err);
        setErrors((prev) => ({ ...prev, [type]: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    };

    riskTypes.forEach((type) => fetchRisk(type));
  }, [lat, lon, getAccessTokenSilently]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 mt-10">
      <h1 className="text-center mb-6">Informe de Riesgos Ambientales</h1>

      {/* === Summary Box (full width) === */}
      <div className="mb-8 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-dark mb-2">Resumen de la Consulta</h2>
        {address && (
          <p className="text-sm text-brand-dark">
            <span className="font-medium">Dirección:</span> {address}
          </p>
        )}
        <p className="text-sm text-brand-dark">
          <span className="font-medium">Coordenadas:</span> {lat}, {lon}
        </p>

        {mapsLoaded && (
          <div className="mt-4 rounded overflow-hidden">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat, lng: lon }} zoom={15}>
              <Marker position={{ lat, lng: lon }} />
            </GoogleMap>
          </div>
        )}
      </div>

      {/* === Risk Boxes Grid === */}
      <div className="grid grid-cols-1 gap-6">
        {riskTypes.map((type) => (
          <div
            key={type}
            className="rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm h-full"
          >
            {loading[type] && (
              <p className="text-gray-500 italic">Cargando datos de {type}...</p>
            )}

            {errors[type] && <p className="text-red-600">❌ Error: {errors[type]}</p>}

            {results[type] && type === "fire" && (
              <FireRisk fireData={results["fire"].fire} forestData={results["fire"].forest} lat={lat} lon={lon} />
            )}

            {results[type] && type === "flood" && (
              <FloodRisk
                fluvial={results["flood"].fluvial_flood}
                coastal={results["flood"].coastal_flood}
                lat={lat}
                lon={lon}
              />
            )}

            {results[type] && type === "seismic" && (
              <SeismicRisk seismicData={results["seismic"].seismic} lat={lat} lon={lon} />
            )}

            {results[type] && type === "desert" && (
              <DesertificationRisk desertData={results["desert"].desertification} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportPage;


