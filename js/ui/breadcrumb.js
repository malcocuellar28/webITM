/* =========================================================
   BREADCRUMB
   Controla la ruta contextual del sitio. Detecta la sección
   activa en la página principal según la posición de scroll,
   actualiza el label actual y activa un pulso breve en el dot
   del breadcrumb cuando cambia de sección.
   ========================================================= */

(function() {
    "use strict";

    function initBreadcrumb() {
        if (window.__breadcrumbInitialized) {
            return;
        }

        const breadcrumbCurrent = document.getElementById("siteBreadcrumbCurrent");

        if (!breadcrumbCurrent) {
            return;
        }

        const sectionLabelMap = {
            home: "Inicio",
            "about-stats": "Nosotros",
            about: "Sobre Nosotros",
            faq: "Preguntas Frecuentes",
            "education-levels": "Niveles",
            "tech-careers": "Carreras",
            gallery: "Galería",
            countdown: "Cuenta Regresiva",
            notices: "Avisos",
            events: "Eventos",
            testimonials: "Egresados",
            news: "Noticias",
            contact: "Contacto",
            "news-center": "Centro de noticias"
        };

        const trackedSections = Object.keys(sectionLabelMap)
            .map(function(sectionId) {
                return document.getElementById(sectionId);
            })
            .filter(Boolean);

        if (!trackedSections.length) {
            return;
        }

        const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const CLASS_UPDATING = "is-updating";
        const DOT_ANIMATION_DURATION = 220;
        const DEFAULT_SECTION_OFFSET = 88;
        const breadcrumbCurrentChip = breadcrumbCurrent.parentElement;

        let currentLabel = breadcrumbCurrent.textContent.trim();
        let isTicking = false;
        let clearAnimationTimeoutId = 0;

        breadcrumbCurrent.setAttribute("aria-live", "polite");
        breadcrumbCurrent.setAttribute("aria-atomic", "true");

        function clearUpdatingClass() {
            if (breadcrumbCurrentChip) {
                breadcrumbCurrentChip.classList.remove(CLASS_UPDATING);
            }

            if (clearAnimationTimeoutId) {
                window.clearTimeout(clearAnimationTimeoutId);
                clearAnimationTimeoutId = 0;
            }
        }

        function playLabelUpdate() {
            if (reduceMotionQuery.matches) {
                return;
            }

            clearUpdatingClass();

            window.requestAnimationFrame(function() {
                window.requestAnimationFrame(function() {
                    if (breadcrumbCurrentChip) {
                        breadcrumbCurrentChip.classList.add(CLASS_UPDATING);
                    }

                    clearAnimationTimeoutId = window.setTimeout(
                        clearUpdatingClass,
                        DOT_ANIMATION_DURATION + 40
                    );
                });
            });
        }

        function setBreadcrumbLabel(nextLabel) {
            if (!nextLabel || nextLabel === currentLabel) {
                return;
            }

            currentLabel = nextLabel;
            breadcrumbCurrent.textContent = nextLabel;
            playLabelUpdate();
        }

        function getHeaderOffset() {
            const inlineOffset = document.documentElement.style.getPropertyValue("--site-header-current-height");
            const computedOffset = getComputedStyle(document.documentElement)
                .getPropertyValue("--site-header-current-height")
                .trim();
            const parsedOffset = parseFloat(inlineOffset || computedOffset || "");
            return Number.isFinite(parsedOffset) ? parsedOffset : 0;
        }

        function getActivationLine() {
            return getHeaderOffset() + DEFAULT_SECTION_OFFSET;
        }

        function resolveActiveSection() {
            const activationLine = getActivationLine();
            let activeSection = trackedSections[0];
            let closestDistance = Number.POSITIVE_INFINITY;

            trackedSections.forEach(function(sectionElement) {
                const rect = sectionElement.getBoundingClientRect();
                const sectionTop = rect.top;
                const sectionBottom = rect.bottom;
                const intersectsActivationLine = sectionTop <= activationLine && sectionBottom >= activationLine;
                const distanceToActivationLine = Math.abs(sectionTop - activationLine);

                if (intersectsActivationLine) {
                    if (distanceToActivationLine < closestDistance) {
                        closestDistance = distanceToActivationLine;
                        activeSection = sectionElement;
                    }
                    return;
                }

                if (sectionTop < activationLine && distanceToActivationLine < closestDistance) {
                    closestDistance = distanceToActivationLine;
                    activeSection = sectionElement;
                }
            });

            return activeSection;
        }

        function updateBreadcrumb() {
            const activeSection = resolveActiveSection();

            if (activeSection && sectionLabelMap[activeSection.id]) {
                setBreadcrumbLabel(sectionLabelMap[activeSection.id]);
            }

            isTicking = false;
        }

        function requestUpdate() {
            if (isTicking) {
                return;
            }

            isTicking = true;
            window.requestAnimationFrame(updateBreadcrumb);
        }

        if (typeof reduceMotionQuery.addEventListener === "function") {
            reduceMotionQuery.addEventListener("change", clearUpdatingClass);
        } else if (typeof reduceMotionQuery.addListener === "function") {
            reduceMotionQuery.addListener(clearUpdatingClass);
        }

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        window.addEventListener("orientationchange", requestUpdate);
        window.addEventListener("hashchange", requestUpdate);

        updateBreadcrumb();
        window.__breadcrumbInitialized = true;
    }

    window.initBreadcrumb = initBreadcrumb;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBreadcrumb, { once: true });
    } else {
        initBreadcrumb();
    }
})();
