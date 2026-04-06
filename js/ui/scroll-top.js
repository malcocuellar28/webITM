/* =========================================================
   SCROLL TOP
   Controla la visibilidad del botón flotante para volver al
   inicio. Se activa después de cierto umbral de scroll,
   optimiza la actualización con requestAnimationFrame y usa
   scroll suave solo cuando reduced motion no lo desaconseja.
   ========================================================= */

(function() {
    "use strict";

    function initScrollTop() {
        if (window.__scrollTopInitialized) {
            return;
        }

        const button = document.getElementById("floatingScrollTop");

        if (!button) {
            return;
        }

        const CLASS_VISIBLE = "is-visible";
        const SCROLL_THRESHOLD = 220;
        const HIDE_TRANSITION_FALLBACK_MS = 360;
        let hideTimerId = null;
        let isTicking = false;

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function updateVisibility() {
            const shouldShow = window.scrollY > SCROLL_THRESHOLD;

            if (shouldShow) {
                if (hideTimerId !== null) {
                    window.clearTimeout(hideTimerId);
                    hideTimerId = null;
                }

                button.hidden = false;
                button.classList.add(CLASS_VISIBLE);
            } else {
                button.classList.remove(CLASS_VISIBLE);

                if (hideTimerId !== null) {
                    window.clearTimeout(hideTimerId);
                    hideTimerId = null;
                }

                if (prefersReducedMotion()) {
                    button.hidden = true;
                    isTicking = false;
                    return;
                }

                hideTimerId = window.setTimeout(function() {
                    if (!button.classList.contains(CLASS_VISIBLE)) {
                        button.hidden = true;
                    }
                }, HIDE_TRANSITION_FALLBACK_MS);
            }

            isTicking = false;
        }

        function requestUpdate() {
            if (isTicking) {
                return;
            }

            isTicking = true;
            window.requestAnimationFrame(updateVisibility);
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth"
            });
        }

        button.addEventListener("click", scrollToTop);
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        window.addEventListener("orientationchange", requestUpdate);

        updateVisibility();
        window.__scrollTopInitialized = true;
    }

    window.initScrollTop = initScrollTop;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollTop, { once: true });
    } else {
        initScrollTop();
    }
})();
