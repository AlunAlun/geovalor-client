import React from "react";

// Hero component simplified: two-line headline.
// Requires Tailwind CSS. Responsive and accessible.

export default function Hero({
  isAuthenticated, 
  eyebrow = null,
  line1 = "Tasaciones con sostenibilidad",
  line2 = "y cumplimiento inmediato",
  tagline = "",
  subtag = "GeoTasa integra automáticamente en tus informes ECO la información oficial sobre riesgos de inundación fluvial, inundación costera, incendios forestales, desertificación, riesgo sísmico y riesgo volcánico.",
  ctaPrimary = { label: "Solicita demo gratuito", onClick: null, href: "mailto:rupert@geotasa.es" },
  ctaSecondary = { label: "Empieza ahora", onClick: null, href: "/login" },
  ctaSecondaryAuth = { label: "Panel de Control", onClick: null, href: "/buscar" },
  className = "",
}) {
  return (
    <section className={"relative isolate overflow-hidden bg-white shadow-md " + className}>

      {/* Soft radial backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2 rounded-[60px] bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent blur-2xl" />
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-[60px] bg-emerald-50/50 blur-3xl" />
        </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
            {eyebrow}
          </p>
        )}

        {/* Main heading */}
        <h1 className="mx-auto  text-balance text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          <span className="block">{line1}</span>
          <span className="block mt-2 sm:mt-3">{line2}</span>
        </h1>

        {/* Tagline with accented underline */}
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
          Cumple <Accent>desde hoy</Accent> con la nueva normativa de sostenibilidad en tasaciones
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-sm sm:text-base text-gray-500">
          {subtag}
        </p>

        {/* CTAs */}
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <CTAButton variant="soft" {...ctaPrimary} />
          {isAuthenticated ? (
            <CTAButton variant="solid" {...ctaSecondaryAuth} />
          ) : (
            <CTAButton variant="solid" {...ctaSecondary} />
          )}
          
        </div>
      </div>
    </section>
  );
}

function Accent({ children }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-[1] font-semibold text-gray-900">{children}</span>
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 right-0 z-0 h-2 rounded-full bg-gradient-to-r from-[#65B37A]/60 to-[#65B37A]/40"
        />

    </span>
  );
}

function CTAButton({ label, href, onClick, variant = "solid" }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";
  const styles =
    variant === "solid"
      ? "bg-[#65B37A] text-white shadow-lg hover:bg-[#549968] active:translate-y-[1px]"

      : "bg-white text-gray-900 ring-1 ring-gray-200 hover:ring-gray-300 shadow-sm";

  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button", onClick };

  return (
    <Comp className={`${base} ${styles}`} {...props}>
      {label}
    </Comp>
  );
}