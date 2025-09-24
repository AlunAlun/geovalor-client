// LogoutProbe.jsx
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutProbe() {
  const { logout } = useAuth0();

  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN ||
    import.meta?.env?.VITE_AUTH0_DOMAIN;

  const clientId =
    process.env.REACT_APP_AUTH0_CLIENT_ID ||
    import.meta?.env?.VITE_AUTH0_CLIENT_ID;

  const returnTo = `${window.location.origin}/login`;

  const manualUrl =
    `https://${domain}/v2/logout?client_id=${encodeURIComponent(clientId)}&returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <div className="p-3 border rounded">
      <div><b>domain:</b> {String(domain)}</div>
      <div><b>clientId:</b> {String(clientId)}</div>
      <div><b>returnTo:</b> {returnTo}</div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => logout({ logoutParams: { returnTo } })}
          className="px-3 py-2 rounded bg-black text-white"
        >
          SDK logout
        </button>
        <a
          href={manualUrl}
          className="px-3 py-2 rounded border"
          target="_blank" rel="noreferrer"
        >
          Manual /v2/logout
        </a>
      </div>
    </div>
  );
}
