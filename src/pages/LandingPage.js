import React from "react";
import BenefitBox from "../components/BenefitBox";
import Hero from "../components/Hero";
import { useAuth0 } from "@auth0/auth0-react";

import screen1 from "../img/screen1.jpg"
import screen2 from "../img/screen2.jpg"
import screen3 from "../img/screen3.jpg"
import screen4 from "../img/screen4.jpg"
import screen5 from "../img/screen5.jpg"
import screen6 from "../img/screen6.jpg"

function LandingPage() {
  const { isAuthenticated} = useAuth0();

  return (
    <>


      <Hero isAuthenticated={isAuthenticated}/>
      

    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen1}
            title="Normativa Nueva"
            subtitle="La Orden ECM/599/2025 requiere la identificación de riesgos medioambientales para cada tasación."
            showHours={false}
            hoursSaved="40 hours saved"
            features={[
              "Ya en vigor",
              "Seis riesgos",
              "Desarrollo y tiempo",
            ]}
            useCross={true}
          />
        </div>
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen2}
            title="GeoTasa"
            subtitle="Cumplimiento inmediato con la Orden ECM/599/2025 y directrices AEV. Identificación y clasificación de los 6 riesgos necesarios."
            showHours={false}
            hoursSaved="10 horas ahorradas"
            features={[
              "Fácil de Usar",
              "Rápido",
              "Datos oficiales de MITECO e IGN",
              "Resultados claros",
            ]}
          />
        </div>
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen3}
            title="Riesgos"
            subtitle="GeoValor localiza automáticamente la exposición de cualquier inmueble a seis riesgos medioambientales."
            showHours={false}
            hoursSaved="40 hours saved"
            features={[
              "Inundación fluvial",
              "Inundación costera",
              "Incendio forestal",
              "Desertificación",
              "Riesgo sísmico",
              "Riesgo volcánico",
            ]}
          />
        </div>
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen4}
            title="Características clave"
            subtitle="Cumplimiento normativo adaptado a la Orden ECO/805/2003 y su modificación ECM/599/2025."
            showHours={false}
            hoursSaved="40 hours saved"
            features={[
              "Cobertura oficial",
              "Fuentes verificables",
              "Los 6 riesgos exigidos.",
            ]}
          />
        </div>
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen5}
            title="Beneficios para tu sociedad"
            subtitle="Homogeneidad en la documentación frente a auditorías, con informes 100% alineados con la AEV."
            showHours={false}
            hoursSaved="40 hours saved"
            features={[
              "Ahorro de tiempo",
              "Seguridad jurídica",
              "Escalable",
            ]}
          />
        </div>
        <div className="w-full max-w-[400px] aspect-[1/1]">
          <BenefitBox
            imageSrc={screen6}
            title="Un click"
            subtitle="Genera toda la documentación necesaria con un click - solo require la dirección o referencia castastral del inmueble."
            showHours={false}
            hoursSaved="40 hours saved"
            features={[
              "Un click",
              "Generación instantanea",
              "Descarga de documentación",
            ]}
          />
        </div>

      </div>
    </div>
    <section className="relative isolate bg-gradient-to-r from-[#65B37A]/10 to-emerald-50 py-16 sm:py-20 lg:py-24 border-t border-gray-100">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Actualiza tus tasaciones hoy, sin complicaciones
    </h2>
    <p className="mt-4 text-lg leading-7 text-gray-600">
      GeoValor es la forma más sencilla y rápida de cumplir con la normativa vigente y
      responder a los nuevos estándares de sostenibilidad.
    </p>

    <div className="mt-8 flex justify-center">
      <a
        href="mailto:rupert@geotasa.es"
        className="inline-flex items-center justify-center rounded-xl bg-[#65B37A] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#65B37A]/20 hover:bg-[#549968] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65B37A] transition"
      >
        Solicita tu demo gratuita
      </a>
    </div>
  </div>
</section>

    </>
  );
}

export default LandingPage;
