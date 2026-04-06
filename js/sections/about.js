/* =========================================================
   ABOUT
   Renderiza la sección "Sobre Nosotros": aplica contenido
   desde configuración, rellena misión/visión, highlights,
   CTAs y media según el modo configurado.
   ========================================================= */

(function() {
    "use strict";

    function initAbout() {
        if (window.__aboutInitialized) {
            return;
        }

        const section = document.getElementById("about");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.about
                ? window.SITE_SECTIONS_CONFIG.about
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("aboutLogo");
        const kicker = document.getElementById("aboutKicker");
        const title = document.getElementById("aboutTitle");
        const description = document.getElementById("aboutDescription");
        const supportNote = document.getElementById("aboutSupportNote");

        const missionCard = document.getElementById("aboutMissionCard");
        const missionIcon = document.getElementById("aboutMissionIcon");
        const missionTitle = document.getElementById("aboutMissionTitle");
        const missionText = document.getElementById("aboutMissionText");

        const visionCard = document.getElementById("aboutVisionCard");
        const visionIcon = document.getElementById("aboutVisionIcon");
        const visionTitle = document.getElementById("aboutVisionTitle");
        const visionText = document.getElementById("aboutVisionText");

        const highlightsContainer = section.querySelector(".about-section__highlights");
        const actions = document.getElementById("aboutActions");
        const primaryCta = document.getElementById("aboutPrimaryCta");
        const secondaryCta = document.getElementById("aboutSecondaryCta");

        const mediaCard = document.getElementById("aboutMediaCard");
        const mediaImage = document.getElementById("aboutMediaImage");
        const mediaEmbed = document.getElementById("aboutMediaEmbed");
        const mediaVideo = document.getElementById("aboutMediaVideo");
        const mediaCaption = document.getElementById("aboutMediaCaption");

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

        if (supportNote) {
            if (typeof config.supportNote === "string" && config.supportNote.trim()) {
                supportNote.hidden = false;
                supportNote.textContent = config.supportNote;
            } else {
                supportNote.hidden = true;
            }
        }

        if (missionCard && config.mission) {
            const missionEyebrow = missionCard.querySelector(".about-feature-card__eyebrow");

            if (missionIcon && typeof config.mission.iconSrc === "string") {
                missionIcon.src = config.mission.iconSrc;
                missionIcon.alt = typeof config.mission.iconAlt === "string" ? config.mission.iconAlt : "";
            }

            if (missionEyebrow && typeof config.mission.eyebrow === "string") {
                missionEyebrow.textContent = config.mission.eyebrow;
            }

            if (missionTitle && typeof config.mission.title === "string") {
                missionTitle.textContent = config.mission.title;
            }

            if (missionText && typeof config.mission.text === "string") {
                missionText.textContent = config.mission.text;
            }
        }

        if (visionCard && config.vision) {
            const visionEyebrow = visionCard.querySelector(".about-feature-card__eyebrow");

            if (visionIcon && typeof config.vision.iconSrc === "string") {
                visionIcon.src = config.vision.iconSrc;
                visionIcon.alt = typeof config.vision.iconAlt === "string" ? config.vision.iconAlt : "";
            }

            if (visionEyebrow && typeof config.vision.eyebrow === "string") {
                visionEyebrow.textContent = config.vision.eyebrow;
            }

            if (visionTitle && typeof config.vision.title === "string") {
                visionTitle.textContent = config.vision.title;
            }

            if (visionText && typeof config.vision.text === "string") {
                visionText.textContent = config.vision.text;
            }
        }

        if (highlightsContainer && Array.isArray(config.highlights) && config.highlights.length) {
            highlightsContainer.innerHTML = config.highlights
                .map(function(highlightText) {
                    return [
                        '<div class="about-highlight">',
                        '<span class="about-highlight__dot" aria-hidden="true"></span>',
                        '<span class="about-highlight__text">', highlightText || "", "</span>",
                        "</div>"
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
                secondaryCta.textContent = config.secondaryCta.label || "Explorar programas";
                secondaryCta.href = config.secondaryCta.href || "#education-levels";
            }
        }

        if (mediaCard) {
            if (config.showMedia === false || !config.media) {
                mediaCard.hidden = true;
            } else {
                const mediaConfig = config.media;
                const mediaMode = mediaConfig.mode || "image";

                mediaCard.hidden = false;

                if (mediaCaption && typeof mediaConfig.caption === "string") {
                    mediaCaption.textContent = mediaConfig.caption;
                }

                if (mediaImage) {
                    mediaImage.hidden = mediaMode !== "image";

                    if (mediaMode === "image") {
                        if (typeof mediaConfig.imageSrc === "string") {
                            mediaImage.src = mediaConfig.imageSrc;
                        }

                        mediaImage.alt = typeof mediaConfig.imageAlt === "string" ? mediaConfig.imageAlt : "";
                    }
                }

                if (mediaEmbed) {
                    mediaEmbed.hidden = mediaMode !== "youtube";

                    if (mediaMode === "youtube") {
                        mediaEmbed.src = typeof mediaConfig.youtubeEmbed === "string" ? mediaConfig.youtubeEmbed : "";
                    } else {
                        mediaEmbed.src = "";
                    }
                }

                if (mediaVideo) {
                    mediaVideo.hidden = mediaMode !== "video";

                    if (mediaMode === "video") {
                        mediaVideo.src = typeof mediaConfig.videoSrc === "string" ? mediaConfig.videoSrc : "";
                    } else {
                        mediaVideo.removeAttribute("src");
                        mediaVideo.load();
                    }
                }
            }
        }

        window.__aboutInitialized = true;
    }

    window.initAbout = initAbout;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAbout, { once: true });
    } else {
        initAbout();
    }
})();
