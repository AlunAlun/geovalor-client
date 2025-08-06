import React, { useState } from "react";

const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

export default function AddressAutocomplete({ onSelect }) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchHereSuggestions = async (query) => {
    if (!query || query.trim().length < 10) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
    }

    const params = new URLSearchParams({
        apiKey: HERE_API_KEY,
        q: query,
        at: "40.4168,-3.7038",
        in: "countryCode:ESP",
        limit: 5,
        lang: "es",
    });

    try {
        const res = await fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!Array.isArray(data.items)) throw new Error("No suggestions returned");

        const filtered = data.items.filter((item) => item.position);
        setSuggestions(filtered);
        setShowSuggestions(true);
    } catch (err) {
        console.error("HERE autosuggest error:", err);
        setSuggestions([]);
        setShowSuggestions(false);
    }
  };


  const handleChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    fetchHereSuggestions(value);
  };

  const handleSuggestionClick = (item) => {
    setAddress(item.title);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(item.position.lat, item.position.lng, item.title);
    }
  };

  return (
    <div style={{ marginBottom: "1rem", position: "relative" }}>
      <label>
        Address (Spain):
        <input
          type="text"
          value={address}
          onChange={handleChange}
          placeholder="e.g. Calle Mallorca 401, Barcelona"
          style={{ marginLeft: "0.5rem", width: "300px" }}
          onFocus={() => setShowSuggestions(true)}
        />
      </label>

      {/* Helper text when query is too short */}
  {address.length > 0 && address.length < 10 && (
    <div style={{ display:"inline", marginLeft:"5px", marginTop: "0.5rem", color: "#888", fontSize: "0.9rem" }}>
      Keep typing to see suggestions...
    </div>
  )}

      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "0.5rem 0 0 0",
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            width: "300px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id || item.title}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
