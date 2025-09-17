import React, { useState } from "react";
import { Link } from "react-router-dom";
import screen4 from "../img/screen4.jpg"; // preview/poster image

export default function SampleReportPage({ submitEndpoint = process.env.REACT_APP_GEOVALOR_API_URL + "/sample-report" }) {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: bots tend to fill this
    if (form.company.value) return;

    const email = form.email.value.trim();
    const name = form.name.value.trim();
    const consent = form.consent.checked;

    if (!email) {
      setStatus({ state: "error", message: "Introduce tu email." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: "error", message: "Introduce un email válido." });
      return;
    }
    if (!consent) {
      setStatus({ state: "error", message: "Debes aceptar la Política de Privacidad." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, consent }),
      });
      if (res.ok) {
        setStatus({
          state: "success",
          message: "¡Listo! Te hemos enviado el informe de muestra por email. Revisa también la carpeta de spam.",
        });
        form.reset();
      } else {
        const txt = await res.text();
        setStatus({
          state: "error",
          message: txt || "No se pudo enviar el informe. Inténtalo de nuevo.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Error de red. Inténtalo de nuevo en unos minutos.",
      });
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Descarga un informe de muestra
              </h1>
              <p className="mt-4 text-lg leading-7 text-gray-600">
                Te enviamos un PDF real con el dossier de riesgos exigidos por la Orden ECM/599/2025
                (MITECO/IGN), listo para adjuntar a tu informe ECO.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/producto"
                  className="rounded-xl px-5 py-3 font-semibold ring-1 ring-gray-300 text-gray-900 hover:bg-white"
                >
                  Ver el producto
                </Link>
              </div>
            </div>

            {/* Right: form card + preview */}
            <div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Envía el PDF a tu correo
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Sin coste y sin compromiso.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="company" tabIndex="-1" className="hidden" aria-hidden="true" />

                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-900">Nombre (opcional)</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-900">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="tu@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#65B37A] focus:ring-[#65B37A]"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      Acepto la{" "}
                      <a href="/privacidad" className="underline hover:text-gray-900">Política de Privacidad</a>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#65B37A] px-6 py-3 text-white font-semibold hover:bg-[#549968] disabled:opacity-70"
                  >
                    {status.state === "loading" && (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-20" />
                        <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" />
                      </svg>
                    )}
                    Enviarme el PDF
                  </button>

                  {!!status.message && (
                    <p
                      className={`text-sm ${status.state === "success" ? "text-emerald-700" : "text-red-600"}`}
                      aria-live="polite"
                    >
                      {status.message}
                    </p>
                  )}
                </form>
              </div>

              {/* Small preview */}
              <div className="mt-4 rounded-xl ring-1 ring-gray-200 overflow-hidden">
                <img
                  src={screen4}
                  alt="Vista previa del informe de muestra"
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* <p className="mt-2 text-xs text-gray-500">Ejemplo ilustrativo de un dossier PDF.</p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
