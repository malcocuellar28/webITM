/* =========================================================
   NOTICES
   Renderiza la sección de avisos importantes: aplica el
   contenido desde configuración y construye la lista de avisos
   con fecha y mensaje institucional.
   ========================================================= */

(function() {
    "use strict";

    function initNotices() {
        if (window.__noticesInitialized) {
            return;
        }

        const section = document.getElementById("notices");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.notices
                ? window.SITE_SECTIONS_CONFIG.notices
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("noticesLogo");
        const kicker = document.getElementById("noticesKicker");
        const title = document.getElementById("noticesTitle");
        const description = document.getElementById("noticesDescription");
        const list = document.getElementById("noticesList");

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
                        '<article class="notice-card">',
                        '<span class="notice-card__dot" aria-hidden="true"></span>',
                        '<p class="notice-card__date">', item.date || "", "</p>",
                        '<p class="notice-card__text">', item.text || "", "</p>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        window.__noticesInitialized = true;
    }

    window.initNotices = initNotices;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNotices, { once: true });
    } else {
        initNotices();
    }
})();
