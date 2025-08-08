// src/pages/SearchPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "../components/AddressAutocomplete";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  marginTop: "1rem",
};

const center = {
  lat: 41.27270457818908,
  lng: 2.0520473550222307,
};

function SearchPage() {
  const navigate = useNavigate();
  const [lat, setLat] = useState(center.lat);
  const [lng, setLng] = useState(center.lng);
  const [selectedAddress, setSelectedAddress] = useState("");


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleGenerateReport = () => {
    navigate("/informe", {
      state: { lat, lon: lng, address: selectedAddress },
    });
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl mb-2 rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-brand-dark">
          Consulta de Riesgo Ambiental
        </h1>

        <AddressAutocomplete
          onSelect={(lat, lon, address) => {
            setLat(lat);
            setLng(lon);
            setSelectedAddress(address);
          }}
        />

        <div className="mt-4">
          <label className="block text-sm font-semibold text-brand-dark mb-2">
            O introduce coordenadas manualmente:
          </label>
          <div className="grid grid-cols-2 gap-4 justify-center mt-2">
            <div className="flex flex-col items-start">
              <label htmlFor="latitude" className="text-sm font-medium text-brand-dark mb-1">
                Latitud
              </label>
              <input
                id="latitude"
                type="number"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="border rounded px-2 py-1 w-full"
                placeholder="Ej. 41.3851"
              />
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="longitude" className="text-sm font-medium text-brand-dark mb-1">
                Longitud
              </label>
              <input
                id="longitude"
                type="number"
                value={lng}
                onChange={(e) => setLng(parseFloat(e.target.value))}
                className="border rounded px-2 py-1 w-full"
                placeholder="Ej. 2.1734"
              />
            </div>
          </div>

        </div>

        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={15}
          >
            <Marker position={{ lat, lng }} />
          </GoogleMap>
        )}

        <button
          onClick={handleGenerateReport}
          className="mt-6 bg-brand-green hover:bg-brand-dark text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Generar Informe
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
