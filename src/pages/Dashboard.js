// src/App.js
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react";
import AddressAutocomplete from "../components/AddressAutocomplete";
import RiskForm from "../components/RiskForm";
import RiskResults from "../components/RiskResults";

const DEBUG_LOCAL_API = true;

const API_BASE_URL = DEBUG_LOCAL_API
  ? "http://127.0.0.1:8000"
  : process.env.REACT_APP_GEOVALOR_API_URL;

function App() {
  const [lat, setLat] = useState("41.27270457818908");
  const [lon, setLon] = useState("2.0520473550222307");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const fetchRiskData = async (latitude, longitude, type = "") => {
    try {
      setError(null);
      setLoading(true);
      const suffix = type ? `/risk/${type}` : "/risk";
      const token = await getAccessTokenSilently();
      console.log("🔐 Access Token:", token);
      const response = await fetch(
        `${API_BASE_URL}${suffix}?lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Risk API response was not OK");
      const json = await response.json();
      console.log(json)
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>GeoValor Risk Lookup</h1>
      <AddressAutocomplete
        onSelect={(lat, lon) => {
          setLat(lat);
          setLon(lon);
          fetchRiskData(lat, lon);
        }}
      />

      <RiskForm
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
        fetchRiskData={fetchRiskData}
      />

      {/* Debug Buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Debug Risk Types:</strong>
        <button onClick={() => fetchRiskData(lat, lon)}>All</button>
        <button onClick={() => fetchRiskData(lat, lon, "fire")}>Fire</button>
        <button onClick={() => fetchRiskData(lat, lon, "flood")}>Flood</button>
        <button onClick={() => fetchRiskData(lat, lon, "desert")}>Desertification</button>
        <button onClick={() => fetchRiskData(lat, lon, "seismic")}>Seismic</button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <ClipLoader color="#007bff" size={40} />
          <p>Loading risk data...</p>
        </div>
      )}

      {error && <div style={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>}

      {data && <RiskResults data={data} lat={lat} lon={lon} />}
    </div>
  );
}

export default App;