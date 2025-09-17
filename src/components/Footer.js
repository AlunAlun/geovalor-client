import React, { useState } from "react";
import logo from "../img/geovalor_logo_256.png";

const Footer = ({ subscribeEndpoint = "/api/newsletter/subscribe" }) => {
  const year = new Date().getFullYear();
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const trap = form.company.value; // honeypot

    if (trap) return; // likely a bot, silently ignore

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: "error", message: "Introduce un email válido." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(subscribeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus({
          state: "success",
          message:
            "¡Gracias! Revisa tu correo para confirmar la suscripción.",
        });
        form.reset();
      } else {
        const txt = await res.text();
        setStatus({
          state: "error",
          message: txt || "No se pudo completar la suscripción.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Error de red. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <footer className="border-t border-gray-100 bg-gradient-to-tr from-[#65B37A]/10 to-emerald-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Newsletter */}
        <section className="mb-12 rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-gray-200 backdrop-blur-sm">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Suscríbete al boletín
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Novedades de producto, guías de cumplimiento y actualizaciones.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl md:w-auto md:min-w-[520px]"
              noValidate
            >
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="flex rounded-xl ring-1 ring-gray-300 bg-white focus-within:ring-[#65B37A]">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="inline-flex items-center gap-2 rounded-r-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.state === "loading" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-20"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                    </svg>
                  )}
                  Suscribirme
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Al suscribirte aceptas nuestra{" "}
                <a href="/privacidad" className="underline hover:text-gray-700">
                  Política de Privacidad
                </a>
                .
              </p>
              {!!status.message && (
                <p
                  className={`mt-2 text-sm ${
                    status.state === "success"
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="GeoTasa" className="h-8 w-8 rounded-full" />
              <span className="text-xl font-semibold text-gray-900">GeoTasa</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Tasaciones con sostenibilidad y cumplimiento inmediato.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:justify-self-center">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900">Enlaces</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/producto" className="text-gray-600 hover:text-gray-900">Producto</a></li>
              <li><a href="/sobre-nosotros" className="text-gray-600 hover:text-gray-900">Sobre Nosotros</a></li>
              <li><a href="/privacidad" className="text-gray-600 hover:text-gray-900">Privacidad</a></li>
              <li><a href="/aviso-legal" className="text-gray-600 hover:text-gray-900">Aviso Legal</a></li>
            </ul>
          </nav>

          {/* Contact + Social */}
          <div className="md:justify-self-end">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:info@geotasa.es" className="text-gray-600 hover:text-gray-900">
                  info@geotasa.es
                </a>
              </li>
              <li>
                <a href="tel:+34XXXXXXXXX" className="text-gray-600 hover:text-gray-900">
                  +34 XXX XXX XXX
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:ring-[#65B37A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65B37A]"
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
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:ring-[#65B37A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65B37A]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.2c3.2 0 3.6.01 4.9.07 1.2.06 1.9.25 2.3.42.6.23 1 .5 1.4.94.43.43.7.87.94 1.44.17.4.36 1.02.42 2.24.06 1.3.07 1.7.07 4.9s-.01 3.6-.07 4.9c-.06 1.2-.25 1.9-.42 2.3a3.6 3.6 0 0 1-.94 1.4c-.44.43-.87.7-1.44.94-.4.17-1.02.36-2.24.42-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-1.2-.06-1.9-.25-2.3-.42a3.6 3.6 0 0 1-1.4-.94 3.6 3.6 0 0 1-.94-1.44c-.17-.4-.36-1.02-.42-2.24C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.9c.06-1.2.25-1.9.42-2.3.23-.6.5-1 .94-1.44.43-.43.87-.7 1.44-.94.4-.17 1.02-.36 2.24-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 2.7a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8Zm0 2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm5.2-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p>© {year} GeoTasa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
