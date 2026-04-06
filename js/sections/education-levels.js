/* =========================================================
   EDUCATION LEVELS
   Renderiza la sección de niveles educativos: aplica el
   contenido desde configuración y construye las cards con su
   imagen, descripción y chips de información.
   ========================================================= */

(function() {
    "use strict";

    function initEducationLevels() {
        if (window.__educationLevelsInitialized) {
            return;
        }

        const section = document.getElementById("education-levels");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.educationLevels
                ? window.SITE_SECTIONS_CONFIG.educationLevels
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("educationLevelsLogo");
        const kicker = document.getElementById("educationLevelsKicker");
        const title = document.getElementById("educationLevelsTitle");
        const description = document.getElementById("educationLevelsDescription");
        const grid = document.getElementById("educationLevelsGrid");

        if (config.enabled === false) {
            section.hidden = true;
            return;
        }

        if (logo) {
            if (typeof config.logoSrc === "string" && config.logoSrc.trim()) {
                logo.src = config.logoSrc;
            }

            if (typeof config.logoAlt === "string") {
                logo.alt = config.logoAlt;
            }
        }

        if (kicker && typeof config.kicker === "string") {
            kicker.textContent = config.kicker;
        }

        if (title && typeof config.title === "string") {
            title.textContent = config.title;
        }

        if (description && typeof config.description === "string") {
            description.textContent = config.description;
        }

        if (grid && Array.isArray(config.cards) && config.cards.length) {
            grid.innerHTML = config.cards
                .map(function(card) {
                    const chips = Array.isArray(card.chips) ? card.chips : [];

                    return [
                        '<article class="education-level-card education-level-card--', card.variant || "default", '">',
                        '<div class="education-level-card__media">',
                        '<img src="', card.imageSrc || "", '" alt="', card.imageAlt || "", '" class="education-level-card__image" loading="lazy">',
                        "</div>",
                        '<div class="education-level-card__body">',
                        '<p class="education-level-card__highlight">', card.highlight || "", "</p>",
                        '<h3 class="education-level-card__title">', card.title || "", "</h3>",
                        '<p class="education-level-card__description">', card.description || "", "</p>",
                        '<div class="education-level-card__chips">',
                        chips.map(function(chip) {
                            return [
                                '<span class="education-level-chip',
                                chip.variant === "secondary" ? ' education-level-chip--secondary' : "",
                                '">',
                                chip.label || "",
                                "</span>"
                            ].join("");
                        }).join(""),
                        "</div>",
                        "</div>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        window.__educationLevelsInitialized = true;
    }

    window.initEducationLevels = initEducationLevels;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initEducationLevels, { once: true });
    } else {
        initEducationLevels();
    }
})();
