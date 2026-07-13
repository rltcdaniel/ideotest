/**
 * cookie-consent.js — Banner de consentimiento de cookies para Test Político
 * ---------------------------------------------------------------------------
 * Qué hace:
 *  - Muestra un banner la primera vez que alguien visita el sitio.
 *  - Guarda la elección del usuario en localStorage (no se envía a ningún servidor).
 *  - Si el usuario acepta, y ya has configurado tu ID de AdSense abajo, carga el
 *    script de AdSense de forma dinámica. Si rechaza, no se carga nunca.
 *
 * IMPORTANTE — esto es una solución básica, no un CMP certificado por Google:
 *  Este banner cumple el requisito general del RGPD de pedir consentimiento antes
 *  de cargar cookies no esenciales. PERO Google exige, además, una plataforma de
 *  consentimiento certificada (CMP) para servir anuncios personalizados a usuarios
 *  de la UE/Reino Unido. En cuanto tengas la cuenta de AdSense aprobada:
 *    1. Ve a AdSense → Privacy & messaging → Crea un mensaje de consentimiento (GDPR).
 *    2. Google te dará un snippet con tu ID real (algo como
 *       <script async src="https://fundingchoicesmessages.google.com/i/pub-XXXX...">).
 *    3. Añade ese snippet en el <head> de cada página, junto a este script (no en
 *       lugar de él: puedes mantener este banner para cookies de analítica y dejar
 *       que el de Google gestione el consentimiento específico de anuncios).
 *
 * Configuración:
 *  - Cambia ADSENSE_CLIENT_ID más abajo cuando tengas tu ID de AdSense (ca-pub-...).
 *    Mientras sea null, el banner funciona pero no carga ningún anuncio.
 */

(function () {
  "use strict";

  // TODO: sustituye por tu ID real, p. ej. "ca-pub-1234567890123456", cuando
  // tengas la cuenta de AdSense aprobada. Mientras sea null, no se carga AdSense.
  const ADSENSE_CLIENT_ID = null;

  const STORAGE_KEY = "tp_cookie_consent";

  function getStoredConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...value, timestamp: new Date().toISOString() })
      );
    } catch (e) {
      /* localStorage no disponible: el banner volverá a aparecer, no es grave */
    }
  }

  function loadAdSense() {
    if (!ADSENSE_CLIENT_ID) return;
    if (document.querySelector('script[data-adsense-loaded="true"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      ADSENSE_CLIENT_ID;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-adsense-loaded", "true");
    document.head.appendChild(script);
  }

  function removeBanner() {
    const el = document.getElementById("tp-cookie-banner");
    if (el) el.remove();
  }

  function renderBanner() {
    if (document.getElementById("tp-cookie-banner")) return;

    const banner = document.createElement("div");
    banner.id = "tp-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML = `
      <div class="tp-cookie-inner">
        <p class="tp-cookie-text">
          Usamos cookies propias necesarias para el funcionamiento del sitio y,
          si las aceptas, cookies de analítica y publicidad (Google AdSense).
          Puedes leer más en nuestra <a href="cookies.html">política de cookies</a>.
        </p>
        <div class="tp-cookie-actions">
          <button type="button" class="tp-cookie-btn tp-cookie-reject">Solo necesarias</button>
          <button type="button" class="tp-cookie-btn tp-cookie-accept">Aceptar todo</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector(".tp-cookie-accept").addEventListener("click", function () {
      storeConsent({ necessary: true, analytics: true, ads: true });
      removeBanner();
      loadAdSense();
    });

    banner.querySelector(".tp-cookie-reject").addEventListener("click", function () {
      storeConsent({ necessary: true, analytics: false, ads: false });
      removeBanner();
    });
  }

  function init() {
    const consent = getStoredConsent();
    if (!consent) {
      renderBanner();
      return;
    }
    if (consent.ads) {
      loadAdSense();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expone una función global sencilla por si en el futuro añades un enlace
  // "Cambiar preferencias de cookies" en el footer.
  window.tpReopenCookieBanner = function () {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    renderBanner();
  };
})();
