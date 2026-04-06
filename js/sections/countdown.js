/* =========================================================
   COUNTDOWN
   Renderiza la cuenta regresiva del próximo evento definido en
   configuración. Calcula la siguiente ocurrencia, actualiza los
   valores numéricos cada segundo y aplica labels dinámicos para
   graduaciones o inicio de clases.
   ========================================================= */

(function() {
    "use strict";

    function initCountdown() {
        if (window.__countdownInitialized) {
            return;
        }

        const section = document.getElementById("countdown");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.countdown
                ? window.SITE_SECTIONS_CONFIG.countdown
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("countdownLogo");
        const kicker = document.getElementById("countdownKicker");
        const title = document.getElementById("countdownTitle");
        const description = document.getElementById("countdownDescription");
        const eventBadge = document.getElementById("countdownEventBadge");
        const eventMessage = document.getElementById("countdownEventMessage");
        const eventDate = document.getElementById("countdownEventDate");

        const daysElement = document.getElementById("countdownDays");
        const hoursElement = document.getElementById("countdownHours");
        const minutesElement = document.getElementById("countdownMinutes");
        const secondsElement = document.getElementById("countdownSeconds");

        const labelElements = section.querySelectorAll(".countdown-card__label");

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

        if (labelElements.length === 4 && config.labels) {
            labelElements[0].textContent = config.labels.days || "Días";
            labelElements[1].textContent = config.labels.hours || "Horas";
            labelElements[2].textContent = config.labels.minutes || "Minutos";
            labelElements[3].textContent = config.labels.seconds || "Segundos";
        }

        function createEventDate(year, eventConfig) {
            return new Date(
                year,
                Number(eventConfig.month) - 1,
                Number(eventConfig.day),
                Number(eventConfig.hour || 0),
                Number(eventConfig.minute || 0),
                Number(eventConfig.second || 0),
                0
            );
        }

        function getNextOccurrence(eventConfig, now) {
            const currentYear = now.getFullYear();
            let eventDate = createEventDate(currentYear, eventConfig);

            if (eventDate.getTime() <= now.getTime()) {
                eventDate = createEventDate(currentYear + 1, eventConfig);
            }

            return eventDate;
        }

        function resolveNextEvent(now) {
            const graduationConfig = config.events && config.events.graduation ? config.events.graduation : null;
            const classStartConfig = config.events && config.events.classStart ? config.events.classStart : null;

            if (!graduationConfig || !classStartConfig) {
                return null;
            }

            const nextGraduation = getNextOccurrence(graduationConfig, now);
            const nextClassStart = getNextOccurrence(classStartConfig, now);

            if (nextGraduation.getTime() <= nextClassStart.getTime()) {
                return {
                    type: "graduation",
                    date: nextGraduation
                };
            }

            return {
                type: "classStart",
                date: nextClassStart
            };
        }

        function formatDate(date) {
            return new Intl.DateTimeFormat("es-HN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(date);
        }

        function pad(value, length) {
            return String(value).padStart(length, "0");
        }

        function updateCounter() {
            const now = new Date();
            const nextEvent = resolveNextEvent(now);

            if (!nextEvent) {
                return;
            }

            const remainingMs = Math.max(0, nextEvent.date.getTime() - now.getTime());
            const totalSeconds = Math.floor(remainingMs / 1000);

            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            if (daysElement) {
                daysElement.textContent = pad(days, 3);
            }

            if (hoursElement) {
                hoursElement.textContent = pad(hours, 2);
            }

            if (minutesElement) {
                minutesElement.textContent = pad(minutes, 2);
            }

            if (secondsElement) {
                secondsElement.textContent = pad(seconds, 2);
            }

            if (nextEvent.type === "graduation") {
                if (eventBadge) {
                    eventBadge.textContent = config.labels.graduationBadge || "Graduaciones";
                }

                if (eventMessage) {
                    eventMessage.textContent = config.labels.graduationMessage || "Faltan para la próxima graduación.";
                }
            } else {
                if (eventBadge) {
                    eventBadge.textContent = config.labels.classStartBadge || "Inicio de clases";
                }

                if (eventMessage) {
                    eventMessage.textContent = config.labels.classStartMessage || "Faltan para el inicio de clases.";
                }
            }

            if (eventDate) {
                eventDate.textContent = formatDate(nextEvent.date);
            }
        }

        updateCounter();
        window.setInterval(updateCounter, 1000);

        window.__countdownInitialized = true;
    }

    window.initCountdown = initCountdown;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCountdown, { once: true });
    } else {
        initCountdown();
    }
})();
