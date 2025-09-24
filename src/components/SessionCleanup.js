// SessionCleanup.jsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SessionCleanup() {
  const { logout } = useAuth0();

  useEffect(() => {
    // also check the hash in case your router or Auth0 put params there
    const url = new URL(window.location.href);
    const searchErr = url.searchParams.get("error");
    const hashParams = new URLSearchParams((window.location.hash || "").replace(/^#/, ""));
    const hashErr = hashParams.get("error");

    const err = searchErr || hashErr;

    if (err === "access_denied") {
      const returnTo = `${window.location.origin}/?reason=not-approved`;

      // clean the URL first so we don't get into loops
      url.searchParams.delete("error");
      url.searchParams.delete("error_description");
      window.history.replaceState({}, "", url.toString());

      // this calls https://<domain>/v2/logout with the correct client_id
      logout({ logoutParams: { returnTo } });
    }
  }, [logout]);

  return null;
}
