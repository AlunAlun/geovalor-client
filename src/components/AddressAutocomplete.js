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
      const res = await fetch(
        `https://autosuggest.search.hereapi.com/v1/autosuggest?${params.toString()}`
      );
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
    <div className="mb-4 w-full max-w-md mx-auto relative">
      <label className="block text-sm font-medium text-brand-dark mb-1">
        Dirección:
      </label>

      <input
        type="text"
        value={address}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="e.g. Calle Mallorca 401, Barcelona"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto w-full z-50">
          {suggestions.map((item) => (
            <li
              key={item.id || item.title}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
