import React, { useRef } from "react";

function RiskSlider({
  min,
  max,
  value,
  height = 16,
  borderClassName = "border border-brand-dark/30",
  className = "",
  showExplanation = true,
}) {
  const containerRef = useRef(null);

  // Green → Yellow → Red
  const getTrafficLightColor = (pct) => {
    const p = Math.max(0, Math.min(100, pct));
    if (p <= 50) {
      // Green (0,128,0) → Yellow (255,255,0)
      const t = p / 50;
      const r = Math.round(0 + (255 - 0) * t);
      const g = Math.round(128 + (255 - 128) * t);
      const b = 0;
      return `rgb(${r},${g},${b})`;
    } else {
      // Yellow (255,255,0) → Red (255,0,0)
      const t = (p - 50) / 50;
      const r = 255;
      const g = Math.round(255 - 255 * t);
      const b = 0;
      return `rgb(${r},${g},${b})`;
    }
  };

  const getRiskLabel = (pct) => {
    if (pct <= 20) return "Bajo";
    if (pct <= 40) return "Medio-bajo";
    if (pct <= 60) return "Medio";
    if (pct <= 80) return "Medio-alto";
    return "Alto";
  };

  const range = Math.max(0.000001, max - min);
  const percent = ((value - min) / range) * 100;
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const markerColor = getTrafficLightColor(clampedPercent);
  const riskLabel = getRiskLabel(clampedPercent);

  return (
    <div
      className={`relative block w-full ${className}`}
      ref={containerRef}
      aria-label={`Risk indicator: ${value} en una escala de ${min} a ${max}`}
    >
      {/* Bar container */}
      <div className="relative w-full" style={{ height }}>
        {/* Gradient bar */}
        <div
          className={`h-full w-full ${borderClassName}`}
          style={{
            position: "relative",
            borderRadius: 0,
            background:
              "linear-gradient(to right, rgb(0,128,0) 0%, rgb(255,255,0) 50%, rgb(255,0,0) 100%)",
          }}
        />

        {/* Marker line */}
        <div
          className="absolute"
          style={{
            left: `${clampedPercent}%`,
            transform: "translateX(-50%)",
            top: 0,
            height: "100%",
            width: 4,
            backgroundColor: markerColor,
            zIndex: 2,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.85), 0 0 0 2px rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Value label */}
        <div
          className="absolute flex justify-center"
          style={{
            left: `${clampedPercent}%`,
            transform: "translateX(-50%)",
            bottom: "calc(100% + 8px)",
          }}
        >
          <div
            className="text-xs font-semibold rounded-lg px-2 py-1 shadow-md"
            style={{
              backgroundColor: markerColor,
              color: "white",
              minWidth: 28,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            {value}
          </div>
        </div>
      </div>

      {/* Risk label title + explanation */}
      {showExplanation && (
        <div className="mt-3">
          <p className="text-sm font-semibold text-brand-dark">
            Valor de Riesgo:{" "}
            <span style={{ color: markerColor }}>{riskLabel}</span>
          </p>
          <p className="mt-1 text-xs text-brand-dark/80 leading-snug">
            El indicador muestra el nivel de riesgo en una escala de {min}{" "}
            (riesgo mínimo) a {max} (riesgo máximo). Los colores van del verde
            (bajo riesgo), pasando por amarillo (riesgo medio), hasta rojo
            (alto riesgo).
          </p>
        </div>
      )}
    </div>
  );
}

export default RiskSlider;
