import React, { useState } from "react";

const faqs = [
  {
    q: "¿Qué hace falta para cumplir con la Orden ECM/599/2025 en mis tasaciones?",
    a: "Identificar y clasificar los 6 riesgos medioambientales exigidos para cada inmueble, usando fuentes oficiales y dejando trazabilidad (fuente, fecha y versión). GeoTasa genera esta evidencia en minutos y lista para adjuntar al informe ECO."
  },
  {
    q: "¿Qué riesgos medioambientales exige la normativa en España?",
    a: "Inundación fluvial, inundación costera, incendio forestal, desertificación, riesgo sísmico y riesgo volcánico. GeoTasa calcula la exposición del inmueble a cada uno y lo documenta."
  },
  {
    q: "¿Qué documentación debo adjuntar al informe ECO para demostrar el cumplimiento?",
    a: "Una ficha por riesgo con mapa, nivel de exposición/clasificación, criterios aplicados y cita de la fuente oficial (MITECO/IGN) con fecha, escala y versión. GeoTasa exporta este dossier en PDF y datos en CSV/JSON."
  },
  {
    q: "¿Cómo compruebo si un inmueble está en zona inundable o con otros riesgos?",
    a: "Introduce dirección, coordenadas o referencia catastral y obtén el análisis automático. También puedes usar la API para integrarlo en tu flujo interno."
  },
  {
    q: "¿Cómo cito correctamente las fuentes oficiales en mi informe?",
    a: "Incluye organismo publicador, nombre de la capa, fecha de actualización, escala y número/ID de versión. GeoTasa añade la cita formateada y los metadatos necesarios para auditoría AEV."
  },
  {
    q: "¿Cada cuánto se actualizan los datos y cómo sé la versión utilizada?",
    a: "Se sincroniza cuando MITECO/IGN publican nuevas capas. Cada resultado muestra el identificador de versión y la fecha exacta utilizada para garantizar la trazabilidad."
  },
  {
    q: "¿Cuál es la cobertura geográfica de los riesgos?",
    a: "España completa: Península, Baleares y Canarias. La resolución depende de cada organismo; GeoTasa muestra la escala de la capa y posibles limitaciones."
  },
  {
    q: "¿Cómo integro los resultados en mis plantillas sin rehacer el flujo?",
    a: "Exporta PDF para anexar al ECO, o datos CSV/JSON para tu ERP. Con la API REST puedes automatizar la inserción en tus informes y paneles."
  },
  {
    q: "¿Puedo cumplir si gestiono una cartera grande de inmuebles?",
    a: "Sí. GeoTasa admite cargas por lotes (CSV/GeoJSON) y API para procesar carteras con estado de trabajos y descargas cuando finalizan."
  },
  {
    q: "¿Cómo se gestiona la privacidad y el RGPD?",
    a: "Tratamos datos mínimos (ubicación) y los protegemos con cifrado en tránsito. Ofrecemos control de acceso, registro de actividad y acuerdos de tratamiento; cumplimos RGPD."
  },
  {
    q: "¿Qué precios y licencias hay para sociedades de tasación?",
    a: "Modelo por uso (por informe): pagas solo por los informes que generes. También ofrecemos planes anuales con descuento que incluyen usuarios ilimitados. Los planes Empresa incluyen SLA y soporte prioritario."
  },
  {
    q: "¿Hay demo o prueba gratuita para validar con mi auditoría interna?",
    a: "Sí. Dispones de demo y acceso de prueba para verificar integración y formato de evidencias antes de contratar."
  },
  {
    q: "¿Qué hago si detecto una discrepancia o la capa oficial no cubre mi caso?",
    a: "GeoTasa muestra avisos de calidad y límites de la fuente. Puedes solicitar revisión; te indicaremos alternativas oficiales o próxima actualización disponible."
  }
];

export default function PreFooter() {
  const cutoff = 8; // visible items before "Mostrar más"
  const [expanded, setExpanded] = useState(false);

  // Keep original indices to split into 2 columns while knowing which are extras.
  const indexed = faqs.map((item, i) => ({ ...item, _i: i }));
  const colA = indexed.filter((x) => x._i % 2 === 0);
  const colB = indexed.filter((x) => x._i % 2 === 1);

  const renderItem = (item) => (
    <div key={item.q} className="rounded-xl ring-1 ring-gray-200">
      <details className="group">
        <summary className="cursor-pointer list-none p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-medium text-gray-900">{item.q}</h3>
            <span className="shrink-0 rounded-full p-1 ring-1 ring-gray-200 transition group-open:rotate-180">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600" aria-hidden="true">
                <path d="M12 15.5 5.5 9h13L12 15.5Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </summary>
        <div className="px-4 pb-4 text-gray-600 sm:px-5 sm:pb-5">{item.a}</div>
      </details>
    </div>
  );

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl border border-gray-100 p-8 shadow-sm md:p-12">
          {/* Header */}
          <header className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Preguntas frecuentes sobre la Orden ECM/599/2025 y los 6 riesgos medioambientales
            </h2>
            <p className="mt-2 text-gray-600">
              Cumplimiento y evidencias listas para informes ECO, con fuentes oficiales MITECO e IGN.
            </p>
          </header>

          {/* Two-column grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Column A */}
            <dl className="space-y-4">
              {/* Visible items in this column */}
              {colA.filter((x) => x._i < cutoff).map(renderItem)}

              {/* Extras: stay in DOM, visually collapsed for SEO */}
              <div
                aria-hidden={!expanded}
                className={`overflow-hidden transition-all duration-300 ${
                  expanded ? "max-h-[9999px]" : "max-h-0"
                }`}
              >
                {colA.filter((x) => x._i >= cutoff).map(renderItem)}
              </div>
            </dl>

            {/* Column B */}
            <dl className="space-y-4">
              {colB.filter((x) => x._i < cutoff).map(renderItem)}
              <div
                aria-hidden={!expanded}
                className={`overflow-hidden transition-all duration-300 ${
                  expanded ? "max-h-[9999px]" : "max-h-0"
                }`}
              >
                {colB.filter((x) => x._i >= cutoff).map(renderItem)}
              </div>
            </dl>
          </div>

          {/* Toggle */}
          {faqs.length > cutoff && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setExpanded((s) => !s)}
                className="rounded-xl bg-[#65B37A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#549968] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65B37A]"
              >
                {expanded ? "Mostrar menos" : "Mostrar más preguntas"}
              </button>
            </div>
          )}

          {/* FAQPage JSON-LD for SEO/AI */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a }
                }))
              }),
            }}
          />
        </div>
      </div>
    </section>
  );
}
