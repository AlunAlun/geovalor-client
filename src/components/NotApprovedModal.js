import { Link } from "react-router-dom";

export default function NotApprovedModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="not-approved-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="not-approved-title" className="text-xl font-semibold">
          Aún no estás dado de alta
        </h2>
        <p className="mt-3 text-sm text-gray-700">
          Tu correo todavía no está habilitado para usar la aplicación. Por
          favor,{" "}
          <Link to="/contacto" className="underline font-medium">
            ponte en contacto con nosotros
          </Link>{" "}
          para empezar.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cerrar
          </button>
          <Link
            to="/contacto"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            onClick={onClose}
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
