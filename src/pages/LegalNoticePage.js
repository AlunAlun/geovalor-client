import React from "react";

export default function LegalNoticePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Aviso Legal y Condiciones de Uso
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Información del titular, condiciones de uso, propiedad intelectual y limitación de responsabilidad.
            </p>
            <p className="mt-2 text-sm text-gray-500">Última actualización: 17/09/2025</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Titular del sitio</h2>
            <p className="mt-2 text-gray-700">
              <strong>GeoTasa</strong>, titular del dominio <span className="underline">geotasa.es</span>, con domicilio en Barcelona (España). 
              Contacto: <a href="mailto:rupert@geotasa.es" className="underline">rupert@geotasa.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Objeto y ámbito</h2>
            <p className="mt-2 text-gray-700">
              Este sitio ofrece información y acceso a la plataforma que permite localizar inmuebles y generar informes de exposición a riesgos medioambientales con base en datos oficiales. 
              El acceso y uso implican la aceptación de este Aviso Legal y, en su caso, de los Términos del Servicio aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Propiedad intelectual e industrial</h2>
            <p className="mt-2 text-gray-700">
              El software, diseño, logotipos, textos e imágenes del sitio son titularidad de GeoTasa o de terceros licenciantes. 
              Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización, salvo los usos permitidos por ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Condiciones de uso</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-1">
              <li>No realizar usos ilícitos, dañinos o que afecten a la disponibilidad y seguridad del servicio.</li>
              <li>No acceder o intentar acceder a áreas restringidas sin autorización.</li>
              <li>Proporcionar datos veraces y actualizados cuando el servicio lo requiera.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Datos de fuentes oficiales y exención de responsabilidad</h2>
            <p className="mt-2 text-gray-700">
              GeoTasa <strong>integra datos de fuentes oficiales</strong> (p. ej., MITECO e IGN) y los presenta con fines informativos y de apoyo a la elaboración de informes. 
              Aunque aplicamos controles de calidad y mostramos metadatos (fuente, fecha y versión), <strong>no garantizamos</strong> la exactitud, integridad, disponibilidad continua o actualización en tiempo real de dichas fuentes externas. 
              En la medida permitida por la ley, GeoTasa y sus proveedores <strong>no serán responsables</strong> de cualquier daño, pérdida o perjuicio derivados de decisiones adoptadas en base a la información mostrada.
            </p>
            <p className="mt-3 text-gray-700">
              La <strong>sociedad de tasación</strong> que utilice los resultados es la única responsable de revisar, validar y asumir la idoneidad legal y técnica de los informes que entregue a sus clientes, debiendo verificar la vigencia y suficiencia de los datos en la fuente oficial antes de su emisión.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Enlaces y servicios de terceros</h2>
            <p className="mt-2 text-gray-700">
              El sitio puede contener enlaces a páginas o APIs de terceros. GeoTasa no controla ni responde de sus contenidos o políticas. 
              El uso de dichos servicios se rige por sus propios términos y políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Disponibilidad del servicio</h2>
            <p className="mt-2 text-gray-700">
              GeoTasa procura la continuidad del servicio, si bien puede interrumpirse por mantenimiento, actualizaciones o causas ajenas (p. ej., caída de fuentes oficiales).
              Implementaremos esfuerzos razonables para restablecerlo con prontitud.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Ley aplicable y jurisdicción</h2>
            <p className="mt-2 text-gray-700">
              Este Aviso Legal se rige por la legislación española. Salvo derecho imperativo del usuario, las partes se someten a los Juzgados y Tribunales de Barcelona.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <h3 className="font-semibold">Nota</h3>
            <p className="mt-1 text-sm">
              Este texto tiene carácter informativo. Te recomendamos revisar estos documentos con tu asesoría jurídica para adecuarlos a tu estructura societaria (razón social, NIF, domicilio) y a tus flujos de tratamiento.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
