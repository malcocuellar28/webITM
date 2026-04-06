/* =========================================================
   TECH CAREERS
   Renderiza la sección de carreras técnicas: aplica contenido
   desde configuración, construye las cards y muestra un único
   bloque final de assistant con bot y mensaje destacado.
   ========================================================= */

(function() {
    "use strict";

    function initTechCareers() {
        if (window.__techCareersInitialized) {
            return;
        }

        const section = document.getElementById("tech-careers");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.techCareers
                ? window.SITE_SECTIONS_CONFIG.techCareers
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("techCareersLogo");
        const kicker = document.getElementById("techCareersKicker");
        const title = document.getElementById("techCareersTitle");
        const description = document.getElementById("techCareersDescription");
        const grid = document.getElementById("techCareersGrid");
        const sectionAssistant = document.getElementById("techCareersAssistant");
        const sectionAssistantBubble = document.getElementById("techCareersAssistantBubble");
        const sectionAssistantIcon = document.getElementById("techCareersAssistantIcon");

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
                    const features = Array.isArray(card.features) ? card.features : [];
                    const primaryCta = card.primaryCta || {};
                    const secondaryCta = card.secondaryCta || {};

                    return [
                        '<article class="tech-career-card">',
                        '<p class="tech-career-card__top-tag">', card.topTag || "", "</p>",
                        '<div class="tech-career-card__media">',
                        '<img src="', card.imageSrc || "", '" alt="', card.imageAlt || "", '" class="tech-career-card__image" loading="lazy">',
                        "</div>",
                        '<div class="tech-career-card__body">',
                        '<p class="tech-career-card__area-tag">', card.areaTag || "", "</p>",
                        '<h3 class="tech-career-card__title">', card.title || "", "</h3>",
                        '<p class="tech-career-card__description">', card.description || "", "</p>",
                        '<ul class="tech-career-card__features">',
                        features.map(function(feature) {
                            return "<li>" + (feature || "") + "</li>";
                        }).join(""),
                        "</ul>",
                        '<div class="tech-career-card__quote">', card.quote || "", "</div>",
                        '<p class="tech-career-card__duration">', card.duration || "", "</p>",
                        '<div class="tech-career-card__actions">',
                        primaryCta.enabled === false
                            ? ""
                            : '<a href="' + (primaryCta.href || "#contact") + '" class="btn btn-action">' + (primaryCta.label || "Solicitar información") + "</a>",
                        secondaryCta.enabled === false
                            ? ""
                            : '<a href="' + (secondaryCta.href || "#contact") + '" class="btn btn-glass">' + (secondaryCta.label || "Más información") + "</a>",
                        "</div>",
                        "</div>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        if (sectionAssistant && config.assistant) {
            if (config.assistant.enabled === false) {
                sectionAssistant.hidden = true;
            } else {
                sectionAssistant.hidden = false;

                if (sectionAssistantBubble) {
                    sectionAssistantBubble.textContent = config.assistant.bubble || "";
                }

                if (sectionAssistantIcon) {
                    sectionAssistantIcon.src = config.assistant.robotSvgSrc || "";
                    sectionAssistantIcon.alt = config.assistant.robotAlt || "";
                }
            }
        }

        window.__techCareersInitialized = true;
    }

    window.initTechCareers = initTechCareers;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTechCareers, { once: true });
    } else {
        initTechCareers();
    }
})();
