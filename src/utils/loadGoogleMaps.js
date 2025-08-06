let isScriptLoaded = false;

export function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded) {
      resolve(window.google);
      return;
    }

    window.initMap = () => {
      isScriptLoaded = true;
      resolve(window.google);
    };

    const existingScript = document.getElementById("google-maps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      document.body.appendChild(script);
    }
  });
}
