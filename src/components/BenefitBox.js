import React from "react";

// Flexible promo card with hover background effect.
// TailwindCSS required.

export default function BenefitsBox({
  imageSrc,
  title = "Application Dashboard",
  subtitle = "The end-user portal with the core features of your SaaS.",
  showHours = true,
  hoursSaved = "40 hours saved",
  features = [
    "Dashboard",
    "Members & Subscription",
    "User & Account Settings",
  ],
  useCross = false,
  className = "",
}) {
  return (
    <div
      className={
        "rounded-3xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-100 p-4 flex flex-col transition-colors duration-300 bg-white hover:bg-gray-50 " +
        className
      }
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-gray-900 truncate">
            {title}
          </h1>
          <p className="mt-1 text-[11px] leading-snug text-gray-500 line-clamp-2">
            {subtitle}
          </p>
        </div>

        {showHours && (
          <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200">
            {hoursSaved}
          </span>
        )}
      </div>

      {/* Preview image */}
      <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-gray-200 bg-gray-50">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Dashboard preview"
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="h-40 w-full bg-gray-100" />
        )}
      </div>

      {/* Feature ticks or crosses */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {features.map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-colors duration-200 hover:bg-gray-100"
          >
            {useCross ? (
              <CrossIcon className="size-4 text-red-500" />
            ) : (
              <TickIcon className="size-4 text-emerald-600" />
            )}
            <span className="text-[12px] font-medium text-gray-800 truncate">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="mt-auto" />
    </div>
  );
}

function TickIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CrossIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}