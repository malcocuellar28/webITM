/* =========================================================
   EVENTS
   Renderiza la sección de próximos eventos: aplica el
   contenido desde configuración y construye la lista con fecha
   destacada, título y descripción de cada evento.
   ========================================================= */

(function() {
    "use strict";

    function initEvents() {
        if (window.__eventsInitialized) {
            return;
        }

        const section = document.getElementById("events");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.events
                ? window.SITE_SECTIONS_CONFIG.events
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("eventsLogo");
        const kicker = document.getElementById("eventsKicker");
        const title = document.getElementById("eventsTitle");
        const description = document.getElementById("eventsDescription");
        const list = document.getElementById("eventsList");

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

        if (list && Array.isArray(config.items) && config.items.length) {
            list.innerHTML = config.items
                .map(function(item) {
                    return [
                        '<article class="event-card">',
                        '<div class="event-card__date-box">',
                        '<span class="event-card__day">', item.day || "", "</span>",
                        '<span class="event-card__month">', item.monthShort || "", "</span>",
                        "</div>",
                        '<div class="event-card__content">',
                        '<p class="event-card__date">', item.fullDate || "", "</p>",
                        '<h3 class="event-card__title">', item.title || "", "</h3>",
                        '<p class="event-card__text">', item.text || "", "</p>",
                        "</div>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        window.__eventsInitialized = true;
    }

    window.initEvents = initEvents;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initEvents, { once: true });
    } else {
        initEvents();
    }
})();
