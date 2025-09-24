// src/pages/ReportPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FireRisk from "../components/risk/FireRisk";
import FloodRisk from "../components/risk/FloodRisk";
import SeismicRisk from "../components/risk/SeismicRisk";
import DesertificationRisk from "../components/risk/DesertificationRisk";
import RiskSlider from "../components/risk/RiskSlider";
import logo from "../img/geovalor_logo_256.png";

const API_BASE_URL = process.env.REACT_APP_GEOVALOR_API_URL;
const riskTypes = ["flood", "fire", "seismic", "desert"];

const riskTextLabel = (p) =>
  p <= 20 ? "Bajo" :
  p <= 40 ? "Medio-bajo" :
  p <= 60 ? "Medio" :
  p <= 80 ? "Medio-alto" : "Alto";

function RiskBadge({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const label = riskTextLabel(v);
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
      style={{
        background: "rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {v}% · {label}
    </span>
  );
}

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

  // Summary risk states (populate after API returns)
  const [riskFluvial, setRiskFluvial] = useState(null);
  const [riskCoastal, setRiskCoastal] = useState(null);
  const [riskFireHistoric, setRiskFireHistoric] = useState(null);
  const [riskFireForest, setRiskFireForest] = useState(null);
  const [riskFire, setRiskFire] = useState(null);
  const [riskSeismic, setRiskSeismic] = useState(null);
  const [riskDesert, setRiskDesert] = useState(null);

  const clamp01 = (x) => Math.max(0, Math.min(1, Number(x) || 0));
  const clamp100 = (x) => Math.max(0, Math.min(100, Number(x) || 0));
  const pickFirst = (...vals) => vals.find(v => v !== undefined && v !== null && !Number.isNaN(Number(v)));


  useEffect(() => {
    if (!lat || !lon) navigate("/");
  }, [lat, lon, navigate]);

  // fetch all risk types
  useEffect(() => {
    const fetchRisk = async (type) => {
      try {
        setLoading((prev) => ({ ...prev, [type]: true }));
        const token = await getAccessTokenSilently();
        const res = await fetch(
          `${API_BASE_URL}/risk/${type}?lat=${lat}&lon=${lon}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
    riskTypes.forEach((t) => fetchRisk(t));
  }, [lat, lon, getAccessTokenSilently]);

  useEffect(() => {
    // ---- Flood
    const fluvial = pickFirst(
      results.flood?.fluvial_flood?.overall
    );
    if (fluvial !== undefined) setRiskFluvial(clamp100(fluvial));

    const coastal = pickFirst(
      results.flood?.coastal_flood?.overall
    );
    if (coastal !== undefined) setRiskCoastal(clamp100(coastal));

    // ---- Fire (composite)
    const hist01 =
      results.fire?.fire?.overall !== undefined
        ? clamp01(results.fire.fire.overall / 1511)
        : undefined;

    const forest01 =
      results.fire?.forest?.risk_overall !== undefined
        ? clamp01(results.fire.forest.risk_overall)
        : undefined;

    if (hist01 !== undefined) setRiskFireHistoric(hist01 / 2);
    if (forest01 !== undefined) setRiskFireForest(forest01 / 2);

    if (hist01 !== undefined || forest01 !== undefined) {
      const h = hist01 !== undefined ? hist01 / 2 : (riskFireHistoric ?? 0);
      const f = forest01 !== undefined ? forest01 / 2 : (riskFireForest ?? 0);
      setRiskFire(Math.round((h + f) * 100));
    }

    // ---- Seismic (support both shapes)
    const seismicOverall = pickFirst(
      results.seismic?.overall,
      results.seismic?.seismic?.overall
    );
    if (seismicOverall !== undefined) setRiskSeismic(clamp100(seismicOverall));

    // ---- Desertification (support both shapes)
    const desertOverall = pickFirst(
      results.desert?.overall,
      results.desert?.desertification?.overall
    );
    if (desertOverall !== undefined) setRiskDesert(clamp100(desertOverall));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, riskFireHistoric, riskFireForest]);


  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 mt-10">

      {/* Header with logo, title, URL, and download (button hidden on print) */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="GeoTasa"
            className="h-10 w-10 rounded-md object-contain print:h-12 print:w-12"
          />
          <div className="leading-tight">
            <h1 className="m-0 text-xl md:text-2xl font-semibold text-brand-dark">
              Informe de Riesgos Ambientales
            </h1>
            <a
              href="https://geotasa.es"
              className="text-xs md:text-sm text-brand-dark/70 no-underline"
            >
              https://geotasa.es
            </a>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="ml-4 shrink-0 rounded-xl bg-brand-green px-4 py-2 text-white shadow hover:bg-brand-dark print:hidden"
        >
          Descargar PDF
        </button>
      </header>


      {/* PRINTABLE REGION ONLY */}
      <section id="report-print" className="print:a4-surface">

        {/* === Summary Box (no map; uses RiskSlider) === */}
        <div className="mb-8 w-full rounded-xl border border-brand-green bg-brand-beige p-4 shadow-sm avoid-break">
          <h2 className="text-lg font-semibold text-brand-dark mb-2">Resumen de la Consulta</h2>

          {address && (
            <p className="text-sm text-brand-dark">
              <span className="font-medium">Dirección:</span> {address}
            </p>
          )}
          <p className="text-sm text-brand-dark">
            <span className="font-medium">Coordenadas:</span> {lat}, {lon}
          </p>

          {/* Small explainer */}
          <p className="mt-3 text-xs text-brand-dark/80 leading-snug">
            Este resumen muestra el nivel de riesgo (0–100) para cada categoría.
            Todos los datos proceden de fuentes oficiales de la Administración
            (p. ej., MITECO, IGN y otras IDE públicas).
          </p>

          {/* Risk grid */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Fluvial */}
            <div className="rounded-lg border border-brand-green/40 bg-white/70 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-brand-dark">Inundación Fluvial</h3>
                <span className="relative z-10">
                  {riskFluvial != null ? (
                    <RiskBadge value={Number(riskFluvial)} />
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Cargando…</span>
                  )}
                </span>
              </div>
              {riskFluvial != null ? (
                <RiskSlider
                  min={0}
                  max={100}
                  value={Number(riskFluvial)}
                  height={18}
                  showExplanation={false}
                  indicator="inline"
                />
              ) : (
                <div className="h-[18px] w-full bg-gray-200/60 rounded" />
              )}
            </div>

            {/* Costera */}
            <div className="rounded-lg border border-brand-green/40 bg-white/70 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-brand-dark">Inundación Costera</h3>
                <span className="relative z-10">
                  {riskCoastal != null ? (
                    <RiskBadge value={Number(riskCoastal)} />
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Cargando…</span>
                  )}
                </span>
              </div>
              {riskCoastal != null ? (
                <RiskSlider
                  min={0}
                  max={100}
                  value={Number(riskCoastal)}
                  height={18}
                  showExplanation={false}
                  indicator="inline"
                />
              ) : (
                <div className="h-[18px] w-full bg-gray-200/60 rounded" />
              )}
            </div>

            {/* Incendios */}
            <div className="rounded-lg border border-brand-green/40 bg-white/70 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-brand-dark">Incendios Forestales</h3>
                <span className="relative z-10">
                  {riskFire != null ? (
                    <RiskBadge value={Number(riskFire)} />
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Cargando…</span>
                  )}
                </span>
              </div>
              {riskFire != null ? (
                <RiskSlider
                  min={0}
                  max={100}
                  value={Number(riskFire)}
                  height={18}
                  showExplanation={false}
                  indicator="inline"
                />
              ) : (
                <div className="h-[18px] w-full bg-gray-200/60 rounded" />
              )}
              <p className="mt-2 text-[11px] text-brand-dark/70 leading-snug">
                Índice combinado de histórico de incendios y continuidad/proximidad forestal.
              </p>
            </div>

            {/* Sísmico */}
            <div className="rounded-lg border border-brand-green/40 bg-white/70 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-brand-dark">Riesgo Sísmico</h3>
                <span className="relative z-10">
                  {riskSeismic != null ? (
                    <RiskBadge value={Number(riskSeismic)} />
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Cargando…</span>
                  )}
                </span>
              </div>
              {riskSeismic != null ? (
                <RiskSlider
                  min={0}
                  max={100}
                  value={Number(riskSeismic)}
                  height={18}
                  showExplanation={false}
                  indicator="inline"
                />
              ) : (
                <div className="h-[18px] w-full bg-gray-200/60 rounded" />
              )}
            </div>

            {/* Desertificación */}
            <div className="rounded-lg border border-brand-green/40 bg-white/70 p-3 shadow-sm sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-brand-dark">Riesgo de Desertificación</h3>
                <span className="relative z-10">
                  {riskDesert != null ? (
                    <RiskBadge value={Number(riskDesert)} />
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">Cargando…</span>
                  )}
                </span>
              </div>
              {riskDesert != null ? (
                <RiskSlider
                  min={0}
                  max={100}
                  value={Number(riskDesert)}
                  height={18}
                  showExplanation={false}
                  indicator="inline"
                />
              ) : (
                <div className="h-[18px] w-full bg-gray-200/60 rounded" />
              )}
            </div>
          </div>

          {/* Legal-ish footer line */}
          <p className="mt-4 text-[11px] text-brand-dark/60 leading-snug">
            Nota: valores normalizados para facilitar la comparación. La interpretación y uso final
            corresponde al profesional que emite la tasación o informe.
          </p>
        </div>

        {/* === Risk Boxes === */}
        <div className="grid grid-cols-1 gap-6 print:block">
          {riskTypes.map((type) => (
            <div
              key={type}
              className="rounded-xl print:border-0 border border-brand-green bg-brand-beige p-4 shadow-sm h-full avoid-break"
            >
              {loading[type] && <p className="text-gray-500 italic">Cargando datos de {type}...</p>}
              {errors[type] && <p className="text-red-600">❌ Error: {errors[type]}</p>}

              {results[type] && type === "fire" && (
                <FireRisk
                  fireData={results["fire"].fire}
                  forestData={results["fire"].forest}
                  lat={lat}
                  lon={lon}
                />
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
      </section>
    </div>
  );
}

export default ReportPage;
