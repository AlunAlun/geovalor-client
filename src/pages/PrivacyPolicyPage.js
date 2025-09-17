import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Tratamos tus datos de forma lícita, leal y transparente, conforme al Reglamento (UE) 2016/679 (RGPD) y la normativa española aplicable.
            </p>
            <p className="mt-2 text-sm text-gray-500">Última actualización: 17/09/2025</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Responsable del tratamiento</h2>
            <p className="mt-2 text-gray-700">
              <strong>GeoTasa</strong> (titular de <span className="underline">geotasa.es</span>), con domicilio en Barcelona (España).
              Contacto: <a href="mailto:rupert@geotasa.es" className="underline">rupert@geotasa.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Datos que tratamos</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-1">
              <li>Identificativos y de contacto: nombre, email, teléfono, empresa.</li>
              <li>Datos de uso del servicio: dirección o coordenadas del inmueble, referencia catastral, resultados de análisis de riesgos.</li>
              <li>Datos técnicos: logs, IP, dispositivo, navegador (de forma agregada/estadística).</li>
              <li>Preferencias de comunicación y consentimientos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Finalidades y bases jurídicas</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Atender solicitudes y contacto</strong> (formularios, soporte, demo) — base: <em>consentimiento</em> y/o <em>medidas precontractuales</em>.
              </li>
              <li>
                <strong>Prestar el servicio</strong> (generar análisis/dossier, descargar informes, API) — base: <em>ejecución de contrato</em>.
              </li>
              <li>
                <strong>Comunicaciones comerciales</strong> (newsletter, novedades) — base: <em>consentimiento</em> (revocable en cualquier momento).
              </li>
              <li>
                <strong>Seguridad y calidad</strong> (prevención de abusos, logs, métricas) — base: <em>interés legítimo</em>.
              </li>
              <li>
                <strong>Cumplimiento legal</strong> (requerimientos de autoridades, facturación) — base: <em>obligación legal</em>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Destinatarios y encargados</h2>
            <p className="mt-2 text-gray-700">
              Podemos compartir datos con proveedores que nos prestan servicios (alojamiento, correo transaccional, analítica, soporte), actuando como <em>encargados del tratamiento</em> bajo contrato (art. 28 RGPD). Por ejemplo, plataforma de email transaccional (p. ej., Mailgun), hosting e infraestructura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Transferencias internacionales</h2>
            <p className="mt-2 text-gray-700">
              Si algún proveedor procesa datos fuera del EEE, garantizamos un nivel adecuado mediante
              <em> Cláusulas Contractuales Tipo</em> u otros mecanismos válidos (arts. 44–49 RGPD).
              Informaremos en caso de cambios materiales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Plazos de conservación</h2>
            <p className="mt-2 text-gray-700">
              Conservamos los datos mientras dure la relación y, tras ello, durante los plazos necesarios para atender responsabilidades legales.
              Los datos comerciales se conservan hasta que retires tu consentimiento o solicites supresión.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Derechos de las personas</h2>
            <p className="mt-2 text-gray-700">
              Puedes ejercer los derechos de <strong>acceso</strong>, <strong>rectificación</strong>, <strong>supresión</strong>, <strong>oposición</strong>,
              <strong> limitación</strong> y <strong>portabilidad</strong>, así como retirar el consentimiento, enviando un email a{" "}
              <a href="mailto:rupert@geotasa.es" className="underline">rupert@geotasa.es</a>.
              Tienes derecho a reclamar ante la <strong>AEPD</strong> (<a className="underline" href="https://www.aepd.es" target="_blank" rel="noreferrer">aepd.es</a>).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Seguridad</h2>
            <p className="mt-2 text-gray-700">
              Aplicamos medidas técnicas y organizativas adecuadas (cifrado en tránsito, control de accesos, registros, minimización de datos) para proteger la información frente a accesos no autorizados, pérdida o alteración.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Cookies</h2>
            <p className="mt-2 text-gray-700">
                No utilizamos cookies.
              {/* Utilizamos cookies técnicas y, en su caso, analíticas. Consulta la <a href="/cookies" className="underline">Política de Cookies</a> para más detalle y opciones. */}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Datos de fuentes oficiales y responsabilidad</h2>
            <p className="mt-2 text-gray-700">
              GeoTasa integra y presenta datos procedentes de fuentes oficiales (p. ej., MITECO e IGN). No alteramos su contenido sustantivo y mostramos metadatos de fuente, fecha y versión para trazabilidad. 
              No podemos garantizar la exactitud, disponibilidad continua o actualización permanente de dichas fuentes externas. En la medida permitida por la ley, 
              GeoTasa no asume responsabilidad por decisiones o daños derivados del uso de la información proporcionada. La <strong>sociedad de tasación</strong> es la responsable final de revisar, validar y soportar legalmente los informes que emita a sus clientes, debiendo verificar, cuando proceda, la vigencia de la información en la fuente oficial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">11. Cambios en esta política</h2>
            <p className="mt-2 text-gray-700">
              Podemos actualizar esta Política para reflejar cambios normativos o de servicio. Publicaremos la versión vigente con su fecha de actualización.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
