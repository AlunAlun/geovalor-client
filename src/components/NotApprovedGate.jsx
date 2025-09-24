import { useEffect, useState } from "react";
import NotApprovedModal from "./NotApprovedModal";

export default function NotApprovedGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("reason") === "not-approved") {
      setOpen(true);
      url.searchParams.delete("reason");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return <NotApprovedModal open={open} onClose={() => setOpen(false)} />;
}
