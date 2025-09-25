import React, { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../img/geovalor_logo_256.png";
import screen1 from "../img/screen1.jpg";
import screen2 from "../img/screen2.jpg";
import screen3 from "../img/screen3.jpg";
import screen4 from "../img/screen4.jpg";
import screen5 from "../img/screen5.jpg";
import screen6 from "../img/screen6.jpg";

export default function ProductPage() {
  const videoRef = useRef(null);

  const steps = [
    { title: "1) Localiza el inmueble", desc: "Introduce dirección, coordenadas o referencia catastral.", img: screen2 },
    { title: "2) Calcula los riesgos", desc: "Inundación fluvial y costera, incendio forestal, desertificación, sismo y volcán.", img: screen3 },
    { title: "3) Descarga el informe", desc: "Exporta dossier PDF listo para ECO + datos CSV/JSON para tu ERP.", img: screen4 },
  ];

  const gallery = [screen4, screen5, screen6, screen2, screen3, screen1];

//   const playVideo = () => {
//     if (!videoRef.current) return;
//     videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//     // try to play; some browsers require user gesture—this is from a click
//     videoRef.current.play?.();
//   };

  return (
    <>
      {/* HERO with video */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Copy + CTAs */}
            <div>
            {/* Flex row: logo sized to text height and vertically centered */}
            <div className="flex items-center gap-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                <img
                src={logo}
                alt="GeoTasa"
                className="h-[1.5em] shrink-0 object-contain"
                />
                <h1 className="text-[1em] leading-none p-0 m-0">GeoTasa</h1>
            </div>

            <p className="mt-4 text-lg leading-7 text-gray-600">
                Cumplimiento inmediato con la Orden ECM/599/2025 y directrices AEV.
                Evidencias oficiales (MITECO, IGN) listas para auditoría y anexar al informe ECO.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                to="/descargar-ejemplo"
                className="rounded-xl bg-brand-green px-6 py-3 text-white font-semibold shadow-lg shadow-[#65B37A]/20 hover:bg-brand-dark"
                >
                Descargar ejemplo
                </Link>
                <Link
                to="/contacto"
                className="rounded-xl px-6 py-3 font-semibold ring-1 ring-brand-green text-brand-green bg-transparent hover:bg-brand-green hover:text-white"
                >
                Habla con el equipo
                </Link>
                {/* <button
                onClick={playVideo}
                className="rounded-xl px-6 py-3 font-semibold ring-1 ring-brand-green text-brand-green bg-transparent hover:bg-brand-green hover:text-white"
                >
                Ver video (90s)
                </button> */}
            </div>
            </div>



            

            {/* Video pane */}
            <div className="relative rounded-2xl ring-1 ring-gray-200 shadow-lg bg-black">
              <div className="relative aspect-[16/9]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full rounded-2xl"
                  poster={screen4}
                  controls
                >
                  {/* Replace with your real video when ready */}
                  <source src="/videos/geotasa-demo-720p.mp4" type="video/mp4" />
                </video>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Cómo funciona</h2>
          <p className="mt-2 text-center text-gray-600">De dirección a dossier de riesgos en minutos.</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <article key={s.title} className="rounded-2xl border border-gray-100 p-5 shadow-sm">
                <img src={s.img} alt={s.title} className="h-40 w-full rounded-xl object-cover ring-1 ring-gray-200" />
                <h3 className="mt-4 font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Qué incluye</h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#65B37A] text-white">✓</span>
                  Dossier por riesgo con mapa, clasificación y cita oficial (MITECO/IGN).
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#65B37A] text-white">✓</span>
                  Exportación en PDF + CSV/JSON, con metadatos de fuente, fecha y versión.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#65B37A] text-white">✓</span>
                  API REST para integrar en tus plantillas o ERP sin rehacer el flujo.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#65B37A] text-white">✓</span>
                  Modelo por uso (por informe) con planes anuales con descuento y usuarios ilimitados.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/descargar-ejemplo" className="rounded-xl bg-brand-green px-5 py-3 text-white font-semibold hover:bg-brand-dark">
                  Descarga un informe de ejemplo
                </Link>
                <Link to="/privacidad" className="rounded-xl px-5 py-3 font-semibold ring-1 ring-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  Ver trazabilidad y RGPD
                </Link>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Captura de producto ${i + 1}`}
                    className="h-44 w-full rounded-xl object-cover ring-1 ring-gray-200"
                    loading="lazy"
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">Capturas reales del panel y de los informes exportados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Cumple hoy con la Orden ECM/599/2025</h2>
          <p className="mt-3 text-lg text-gray-600">Prueba el flujo completo y descarga un informe con evidencias oficiales.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/buscar" className="rounded-xl bg-brand-green px-6 py-3 text-white font-semibold shadow-lg shadow-[#65B37A]/20 hover:bg-brand-dark">
              Hablar con el equipo
            </Link>
            {/* <Link to="/sobre-nosotros" className="rounded-xl px-6 py-3 font-semibold ring-1 ring-gray-300 text-gray-900 hover:bg-white">
              Hablar con el equipo
            </Link> */}
          </div>
        </div>
      </section>
    </>
  );
}
