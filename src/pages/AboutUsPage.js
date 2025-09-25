// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/geovalor_logo_256.png";

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex items-center gap-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            <img src={logo} alt="GeoTasa" className="h-[1.5em] object-contain" />
            <h1 className="text-[1em] leading-none m-0 p-0">Sobre GeoTasa</h1>
          </div>
          <p className="mt-4 max-w-3xl text-gray-700">
            Ayudamos a los equipos de tasación a cumplir con los requisitos de riesgo ambiental en minutos.
            GeoTasa convierte datasets oficiales de España (MITECO, IGN, IDE) en evidencias claras y listas
            para auditoría que puedes adjuntar directamente a informes ECO o integrar vía API.
          </p>
        </div>
      </section>

      {/* Qué hacemos */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-xl font-semibold text-gray-900">Qué hacemos</h2>
          <p className="mt-2 text-gray-700">
            Nuestra app analiza la exposición de un inmueble a inundación fluvial y costera, incendio forestal,
            desertificación, riesgo sísmico y volcánico, y genera un informe conciso con citas, mapas y metadatos
            de fuente.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Fuentes oficiales</h3>
              <p className="mt-1 text-sm text-gray-700">
                Datos directamente de MITECO, IGN y las infraestructuras públicas (WMS/WFS/NCD).
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Cumplimiento ágil</h3>
              <p className="mt-1 text-sm text-gray-700">
                PDFs listos para ECO, además de CSV/JSON para ERPs y plantillas.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">API primero</h3>
              <p className="mt-1 text-sm text-gray-700">
                Endpoints REST para incorporar las comprobaciones de riesgo a tu flujo actual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-xl font-semibold text-gray-900">Cómo trabajamos</h2>
          <p className="mt-2 text-gray-700">
            Prácticos, transparentes y centrados en lo que importa a los profesionales de la tasación:
            trazabilidad, clasificaciones claras y mínima fricción.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#65B37A]/10 to-emerald-50 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">¿Quieres una demostración rápida?</h3>
            <p className="mt-1 text-gray-700">
              Te mostramos el flujo completo y compartimos un informe de ejemplo.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link to="/descargar-ejemplo" className="rounded-xl bg-brand-green px-5 py-3 text-white font-semibold hover:bg-brand-dark">
                Descargar ejemplo
              </Link>
              <Link to="/contacto" className="rounded-xl px-5 py-3 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                Habla con el equipo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
