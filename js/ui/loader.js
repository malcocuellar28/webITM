/* =========================================================
   LOADER
   Controla la pantalla de carga inicial del sitio. Espera el
   evento load, aplica un retraso breve para evitar un corte
   abrupto y fuerza el cierre con un timeout de seguridad si
   la carga se alarga más de lo esperado.
   ========================================================= */

(function() {
    "use strict";

    function initLoader() {
        if (window.__loaderInitialized) {
            return;
        }

        const loader = document.getElementById("siteLoader");

        if (!loader) {
            return;
        }

        const CLASS_HIDDEN = "is-hidden";
        const HIDE_DELAY_MS = 120;
        const FALLBACK_TIMEOUT_MS = 4000;
        const TRANSITIONEND_FALLBACK_MS = 900;

        let isLoaderHidden = false;
        let hideRequestTimeoutId = 0;
        let emergencyHideTimeoutId = 0;
        let transitionFallbackTimeoutId = 0;

        function finalizeLoaderHidden() {
            if (loader.hasAttribute("hidden")) {
                return;
            }

            loader.setAttribute("hidden", "");
        }

        function clearPendingTimers() {
            if (hideRequestTimeoutId) {
                window.clearTimeout(hideRequestTimeoutId);
                hideRequestTimeoutId = 0;
            }

            if (emergencyHideTimeoutId) {
                window.clearTimeout(emergencyHideTimeoutId);
                emergencyHideTimeoutId = 0;
            }

            if (transitionFallbackTimeoutId) {
                window.clearTimeout(transitionFallbackTimeoutId);
                transitionFallbackTimeoutId = 0;
            }
        }

        function hideLoader() {
            if (isLoaderHidden) {
                return;
            }

            isLoaderHidden = true;
            clearPendingTimers();
            loader.classList.add(CLASS_HIDDEN);

            loader.addEventListener("transitionend", function handleTransitionEnd(event) {
                if (event.target !== loader) {
                    return;
                }

                finalizeLoaderHidden();
            }, { once: true });

            transitionFallbackTimeoutId = window.setTimeout(finalizeLoaderHidden, TRANSITIONEND_FALLBACK_MS);
        }

        function requestHideLoader() {
            if (isLoaderHidden || hideRequestTimeoutId) {
                return;
            }

            hideRequestTimeoutId = window.setTimeout(hideLoader, HIDE_DELAY_MS);
        }

        if (document.readyState === "complete") {
            requestHideLoader();
        } else {
            window.addEventListener("load", requestHideLoader, { once: true });
        }

        emergencyHideTimeoutId = window.setTimeout(hideLoader, FALLBACK_TIMEOUT_MS);

        window.__loaderInitialized = true;
    }

    window.initLoader = initLoader;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLoader, { once: true });
    } else {
        initLoader();
    }
})();
