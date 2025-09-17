import React, { useState } from "react";

export default function ContactPage({ submitEndpoint = process.env.REACT_APP_GEOVALOR_API_URL + "/contact" }) {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot (bots will fill this)
    if (form.website.value) return;

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      topic: form.topic.value,
      message: form.message.value.trim(),
      consent: form.consent.checked,
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      setStatus({ state: "error", message: "Por favor rellena los campos obligatorios." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus({ state: "error", message: "Introduce un email válido." });
      return;
    }
    if (!data.consent) {
      setStatus({ state: "error", message: "Debes aceptar la Política de Privacidad." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({
          state: "success",
          message: "¡Gracias! Te contactaremos en breve.",
        });
        form.reset();
      } else {
        const txt = await res.text();
        setStatus({
          state: "error",
          message: txt || "No se pudo enviar el formulario. Inténtalo de nuevo.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message:
          "Error de red. Si el problema persiste, escríbenos a rupert@geotasa.es.",
      });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Contacto
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              ¿Tienes dudas sobre el cumplimiento, la API o necesitas una demo?
              Envíanos un mensaje y te respondemos cuanto antes.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Side info */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">Datos de contacto</h2>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>
                    <a className="hover:text-gray-900" href="mailto:rupert@geotasa.es">
                      rupert@geotasa.es
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-gray-900" href="tel:+34XXXXXXXXX">
                      +34 XXX XXX XXX
                    </a>
                  </li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:ring-[#65B37A]"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0zM8 8h4.8v2.1h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.67V23H18v-6.8c0-1.62-.03-3.7-2.25-3.7-2.25 0-2.6 1.76-2.6 3.58V23H8z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:ring-[#65B37A]"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 2.2c3.2 0 3.6.01 4.9.07 1.2.06 1.9.25 2.3.42.6.23 1 .5 1.4.94.43.43.7.87.94 1.44.17.4.36 1.02.42 2.24.06 1.3.07 1.7.07 4.9s-.01 3.6-.07 4.9c-.06 1.2-.25 1.9-.42 2.3a3.6 3.6 0 0 1-.94 1.4c-.44.43-.87.7-1.44.94-.4.17-1.02.36-2.24.42-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-1.2-.06-1.9-.25-2.3-.42a3.6 3.6 0 0 1-1.4-.94 3.6 3.6 0 0 1-.94-1.44c-.17-.4-.36-1.02-.42-2.24C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.9c.06-1.2.25-1.9.42-2.3.23-.6.5-1 .94-1.44.43-.43.87-.7 1.44-.94.4-.17 1.02-.36 2.24-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 2.7a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8Zm0 2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm5.2-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                      />
                    </svg>
                  </a>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Horario: 9:00–18:00 CET (L–V)
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                {/* Honeypot */}
                <input type="text" name="website" tabIndex="-1" className="hidden" aria-hidden="true" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Nombre y apellidos *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-900">
                      Email *
                    </label>
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

                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-900">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="text-sm font-medium text-gray-900">
                      Empresa
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="Nombre de la sociedad"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="topic" className="text-sm font-medium text-gray-900">
                      Motivo
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 focus:outline-none focus:ring-[#65B37A]"
                      defaultValue="demo"
                    >
                      <option value="demo">Solicitar demo</option>
                      <option value="integracion">Integración / API</option>
                      <option value="soporte">Soporte</option>
                      <option value="facturacion">Facturación</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-900">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      className="mt-1 w-full rounded-xl border-0 ring-1 ring-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-[#65B37A]"
                      placeholder="Cuéntanos brevemente tu caso…"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#65B37A] focus:ring-[#65B37A]"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      Acepto la{" "}
                      <a href="/privacidad" className="underline hover:text-gray-900">
                        Política de Privacidad
                      </a>
                      .
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status.state === "loading"}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#65B37A] px-6 py-3 text-white font-semibold hover:bg-brand-dark disabled:opacity-70"
                    >
                      {status.state === "loading" && (
                        <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-20" />
                          <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                      )}
                      Enviar
                    </button>

                    {!!status.message && (
                      <p
                        className={`mt-3 text-sm ${
                          status.state === "success" ? "text-emerald-700" : "text-red-600"
                        }`}
                        aria-live="polite"
                      >
                        {status.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
