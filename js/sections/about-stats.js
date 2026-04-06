/* =========================================================
   ABOUT STATS
   Renderiza la sección "Nuestro Colegio en Cifras": aplica
   contenido desde configuración, construye las cards, asigna
   CTAs y anima los contadores cuando la sección entra en vista.
   ========================================================= */

(function() {
    "use strict";

    function initAboutStats() {
        if (window.__aboutStatsInitialized) {
            return;
        }

        const section = document.getElementById("about-stats");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.aboutStats
                ? window.SITE_SECTIONS_CONFIG.aboutStats
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("aboutStatsLogo");
        const kicker = document.getElementById("aboutStatsKicker");
        const title = document.getElementById("aboutStatsTitle");
        const description = document.getElementById("aboutStatsDescription");
        const grid = document.getElementById("aboutStatsGrid");
        const actions = document.getElementById("aboutStatsActions");
        const primaryCta = document.getElementById("aboutStatsPrimaryCta");
        const secondaryCta = document.getElementById("aboutStatsSecondaryCta");

        let hasAnimatedCounters = false;

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
                    const target = Number(card.target || 0);
                    const prefix = typeof card.prefix === "string" ? card.prefix : "";
                    const suffix = typeof card.suffix === "string" ? card.suffix : "";
                    const iconSrc = typeof card.iconSrc === "string" ? card.iconSrc : "";
                    const iconAlt = typeof card.iconAlt === "string" ? card.iconAlt : "";

                    return [
                        '<article class="about-stats-card">',
                        '<div class="about-stats-card__icon-slot">',
                        '<img src="', iconSrc, '" alt="', iconAlt, '" class="about-stats-card__icon" loading="lazy">',
                        "</div>",
                        '<p class="about-stats-card__value" data-count-target="', target, '" data-count-prefix="', prefix, '" data-count-suffix="', suffix, '">', prefix, '0', suffix, "</p>",
                        '<h3 class="about-stats-card__title">', card.title || "", "</h3>",
                        '<p class="about-stats-card__text">', card.text || "", "</p>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        if (actions) {
            actions.hidden = config.showCta === false;
        }

        if (primaryCta && config.primaryCta) {
            if (config.primaryCta.enabled === false) {
                primaryCta.hidden = true;
            } else {
                primaryCta.hidden = false;
                primaryCta.textContent = config.primaryCta.label || "Solicitar información";
                primaryCta.href = config.primaryCta.href || "#contact";
            }
        }

        if (secondaryCta && config.secondaryCta) {
            if (config.secondaryCta.enabled === false) {
                secondaryCta.hidden = true;
            } else {
                secondaryCta.hidden = false;
                secondaryCta.textContent = config.secondaryCta.label || "Conocer programas";
                secondaryCta.href = config.secondaryCta.href || "#education-levels";
            }
        }

        function formatCount(value, prefix, suffix) {
            const roundedValue = Math.round(value);
            return prefix + roundedValue.toLocaleString("es-HN") + suffix;
        }

        function animateCounter(counterElement) {
            const target = Number(counterElement.dataset.countTarget || 0);
            const prefix = counterElement.dataset.countPrefix || "";
            const suffix = counterElement.dataset.countSuffix || "";
            const durationMs = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / durationMs, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = target * easedProgress;

                counterElement.textContent = formatCount(currentValue, prefix, suffix);

                if (progress < 1) {
                    window.requestAnimationFrame(updateCounter);
                } else {
                    counterElement.textContent = formatCount(target, prefix, suffix);
                }
            }

            window.requestAnimationFrame(updateCounter);
        }

        function startCounters() {
            if (hasAnimatedCounters) {
                return;
            }

            hasAnimatedCounters = true;

            const counters = section.querySelectorAll(".about-stats-card__value");
            counters.forEach(animateCounter);
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            startCounters();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.35
                }
            );

            observer.observe(section);
        } else {
            startCounters();
        }

        window.__aboutStatsInitialized = true;
    }

    window.initAboutStats = initAboutStats;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAboutStats, { once: true });
    } else {
        initAboutStats();
    }
})();
