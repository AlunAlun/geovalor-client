//  const [lat, setLat] = useState("41.27270457818908");
//   const [lon, setLon] = useState("2.0520473550222307");
  // const [refCat, setRefCat] = useState("1132008DF4913S0001OA");
// import proj4 from "proj4";
import React, { useState } from "react";

function App() {
  const [lat, setLat] = useState("41.409794716611216");
  const [lon, setLon] = useState("2.180390277774108");
  const [address, setAddress] = useState("");
  // const [refCat, setRefCat] = useState("1132008DF4913S0001OA");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchRiskData = async (latitude, longitude) => {
    try {
      setError(null);
      const response = await fetch(
        // `http://localhost:8000/risk?lat=${latitude}&lon=${longitude}`
        `https://geovaloralpha-brjuk.ondigitalocean.app/risk?lat=${latitude}&lon=${longitude}`
      );
      if (!response.ok) throw new Error("Risk API response was not OK");
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const geocodeAndFetch = async () => {
    try {
      setError(null);
      const query = encodeURIComponent(address);
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=es&limit=1`;
      const response = await fetch(url, {
        headers: { "User-Agent": "geovalor-app/1.0" },
      });
      if (!response.ok) throw new Error("Geocoding failed");

      const results = await response.json();
      if (results.length === 0) throw new Error("Address not found");

      const { lat, lon } = results[0];
      setLat(lat);
      setLon(lon);
      fetchRiskData(lat, lon);
    } catch (err) {
      setError(err.message);
    }
  };

  // const fetchCoordsFromCadastral = async () => {
  //   try {
  //     setError(null);
  //     const prov = "BARCELONA";
  //     const muni = "VILADECANS"; // or ask the user to provide
  //     const rc = refCat.toUpperCase().replace(/\s+/g, "");

  //     const url = `https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx/Consulta_RCCOOR?Provincia=${prov}&Municipio=${muni}&RC=${rc}`;
  //     const response = await fetch(url);
  //     const xml = await response.text();

  //     const xcen = parseFloat(xml.match(/<xcen>(.*?)<\/xcen>/)?.[1]);
  //     const ycen = parseFloat(xml.match(/<ycen>(.*?)<\/ycen>/)?.[1]);

  //     if (!xcen || !ycen) throw new Error("Could not extract coordinates from response");

  //     // Convert UTM (zone 31N) to WGS84
  //     const [lng, lat] = proj4("EPSG:25831", "WGS84", [xcen, ycen]);
  //     setLat(lat.toFixed(8));
  //     setLon(lng.toFixed(8));
  //     fetchRiskData(lat, lng);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>GeoValor Risk Lookup</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Address (Spain):
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginLeft: "0.5rem", width: "300px" }}
            placeholder="e.g. Calle Mallorca 401, Barcelona"
          />
        </label>
        <button onClick={geocodeAndFetch} style={{ marginLeft: "1rem" }}>
          Get Risk from Address
        </button>
      </div>

      {/* <div style={{ marginBottom: "1rem" }}>
        <label>
          Referencia Catastral:
          <input
            type="text"
            value={refCat}
            onChange={(e) => setRefCat(e.target.value)}
            style={{ marginLeft: "0.5rem", width: "250px" }}
            placeholder="e.g. 1234567DF3813S"
          />
        </label>
        <button onClick={fetchCoordsFromCadastral} style={{ marginLeft: "1rem" }}>
          Get Risk from Ref. Catastral
        </button>
      </div> */}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Latitude:
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ marginLeft: "0.5rem", marginRight: "1rem" }}
            placeholder="41.3879"
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
            placeholder="2.1699"
          />
        </label>
        <button onClick={() => fetchRiskData(lat, lon)} style={{ marginLeft: "1rem" }}>
          Fetch Risk
        </button>
      </div>

      {error && <div style={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>}

      {data && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Risk Assessment Results</h2>
  
        {/* Fire Risk */}
        <h3>Fire Risk (by Period)</h3>

        {["96_05", "06_15"].map((period) => {
          const periodData = data.fire[period];
          const imageKey = `image_${period}`;
          const image = data.fire[imageKey];

          return (
            <div key={period} style={{ marginBottom: "2rem" }}>
              <h4>Period: {period}</h4>

              {typeof periodData === "string" ? (
                <p>{periodData}</p>
              ) : (
                <table border="1" cellPadding="6">
                  <tbody>
                    {Object.entries(periodData.data).map(([label, val]) => (
                      <tr key={label}>
                        <td><strong>{label}</strong></td>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {image && (
                <div style={{ marginTop: "1rem" }}>
                  <img
                    src={image}
                    alt={`Fire Risk Map ${period}`}
                    style={{ maxWidth: "100%", border: "1px solid #ccc" }}
                  />
                </div>
              )}
            </div>
          );
        })}



          {/* Desertification */}
          <h3>Desertification Risk</h3>
          <p><strong>Risk Level:</strong> {data.desertification.risk}</p>
          {data.desertification.img && (
            <img
              src={data.desertification.img}
              alt="Desertification Risk"
              style={{ maxWidth: "100%", border: "1px solid #ccc", marginTop: "1rem" }}
            />
          )}

          {/* Fluvial Flood */}
          <h3>Fluvial Flood Risk</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Return Period (years)</th>
                <th>Flood Probability</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.fluvial_flood).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Coastal Flood */}
          <h3>Coastal Flood Risk</h3>
          {Object.entries(data.coastal_flood).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "1rem" }}>
              <h4>Return Period: {key} years</h4>
              <table border="1" cellPadding="6">
                <thead>
                  <tr>
                    <th>Max Height (m)</th>
                    <th>Mean Height (m)</th>
                    <th>Area (km²)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{value.cota_max}</td>
                    <td>{value.cota_media}</td>
                    <td>{value.area_km2}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default App;
