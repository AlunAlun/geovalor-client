import React, { useRef } from "react";

function RiskSlider({
  min,
  max,
  value,
  height = 18, // a touch taller so the inline badge fits nicely
  borderClassName = "border border-brand-dark/30",
  className = "",
  showExplanation = true,
  indicator = "above", // "inline" => on the bar, "above" => above the bar
}) {
  const containerRef = useRef(null);

  // Green → Yellow → Red
  const getTrafficLightColor = (pct) => {
    const p = Math.max(0, Math.min(100, pct));
    if (p <= 50) {
      const t = p / 50;
      const r = Math.round(255 * t);
      const g = Math.round(128 + (255 - 128) * t);
      return `rgb(${r},${g},0)`;
    } else {
      const t = (p - 50) / 50;
      const g = Math.round(255 - 255 * t);
      return `rgb(255,${g},0)`;
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
        {/* SVG gradient bar (prints reliably) */}
        <div
          className={`h-full w-full ${borderClassName}`}
          style={{ position: "relative", borderRadius: 6, overflow: "hidden" }}
        >
          <svg
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(0,128,0)" />
                <stop offset="50%" stopColor="rgb(255,255,0)" />
                <stop offset="100%" stopColor="rgb(255,0,0)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="1" fill="url(#riskGrad)" />
          </svg>
        </div>

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
            zIndex: 1,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.85), 0 0 0 2px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
          aria-hidden="true"
        />

        {/* Value badge — inline on the bar or above it */}
        <div
          className="absolute flex"
          style={
            indicator === "inline"
              ? {
                  left: `${clampedPercent}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }
              : {
                  left: `${clampedPercent}%`,
                  transform: "translateX(-50%)",
                  bottom: "calc(100% + 8px)",
                  zIndex: 2,
                }
          }
        >
          <div
            className="text-xs font-semibold rounded-md px-2 py-[2px] shadow-md"
            style={{
              backgroundColor: markerColor,
              color: "black",
              lineHeight: 1.1,
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
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
            Valor de Riesgo: {riskLabel}
          </p>
          <p className="mt-1 text-xs text-brand-dark/80 leading-snug">
            El indicador muestra el nivel de riesgo en una escala de {min} (mínimo) a {max} (máximo).
          </p>
        </div>
      )}
    </div>
  );
}

export default RiskSlider;
