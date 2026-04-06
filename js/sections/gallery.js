/* =========================================================
   GALLERY
   Renderiza la galería institucional: aplica contenido desde
   configuración, construye el layout destacado + stack y
   controla la apertura/cierre del lightbox de imágenes.
   ========================================================= */

(function() {
    "use strict";

    function initGallery() {
        if (window.__galleryInitialized) {
            return;
        }

        const section = document.getElementById("gallery");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.gallery
                ? window.SITE_SECTIONS_CONFIG.gallery
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("galleryLogo");
        const kicker = document.getElementById("galleryKicker");
        const title = document.getElementById("galleryTitle");
        const description = document.getElementById("galleryDescription");
        const layout = document.getElementById("galleryLayout");

        const lightbox = document.getElementById("galleryLightbox");
        const lightboxImage = document.getElementById("galleryLightboxImage");
        const lightboxTitle = document.getElementById("galleryLightboxTitle");
        const lightboxCaption = document.getElementById("galleryLightboxCaption");
        const lightboxClose = document.getElementById("galleryLightboxClose");
        const LIGHTBOX_CLOSE_FALLBACK_MS = 360;

        if (config.enabled === false) {
            section.hidden = true;

            if (lightbox) {
                lightbox.hidden = true;
            }

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

        const items = Array.isArray(config.items) ? config.items.slice() : [];

        if (!items.length || !layout) {
            return;
        }

        const featuredItem = items.find(function(item) {
            return item.featured === true;
        }) || items[0];

        const stackItems = items.filter(function(item) {
            return item !== featuredItem;
        });

        const allItems = [featuredItem].concat(stackItems);

        function createCardMarkup(item, index, isFeatured) {
            return [
                '<article class="gallery-card',
                isFeatured ? ' gallery-card--featured' : '',
                '" data-gallery-index="', index, '">',
                '<button class="gallery-card__button" type="button" aria-label="Ver imagen ampliada">',
                '<img src="', item.src || "", '" alt="', item.alt || "", '" class="gallery-card__image" loading="lazy">',
                '<span class="gallery-card__overlay">',
                '<span class="gallery-card__overlay-copy">',
                '<span class="gallery-card__title">', item.title || "", "</span>",
                '<span class="gallery-card__subtitle">', item.subtitle || "", "</span>",
                "</span>",
                '<span class="gallery-card__zoom" aria-hidden="true">',
                '<svg class="gallery-card__zoom-icon" viewBox="0 0 24 24" fill="none">',
                '<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"></circle>',
                '<path d="M20 20L16.2 16.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>',
                '<path d="M11 8.4V13.6M8.4 11H13.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>',
                "</svg>",
                "</span>",
                "</span>",
                "</button>",
                "</article>"
            ].join("");
        }

        layout.innerHTML = [
            createCardMarkup(featuredItem, 0, true),
            '<div class="gallery-section__stack">',
            stackItems.map(function(item, stackIndex) {
                return createCardMarkup(item, stackIndex + 1, false);
            }).join(""),
            "</div>"
        ].join("");

        let lastFocusedElement = null;
        let previousBodyOverflow = "";

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function openLightbox(item) {
            if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCaption) {
                return;
            }

            lastFocusedElement = document.activeElement;
            lightbox.hidden = false;
            lightbox.setAttribute("aria-hidden", "false");
            lightbox.classList.add("is-open");
            previousBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            lightboxImage.src = item.src || "";
            lightboxImage.alt = item.alt || "";
            lightboxTitle.textContent = item.title || "";
            lightboxCaption.textContent = item.subtitle || "";

            if (prefersReducedMotion()) {
                if (lightboxClose) {
                    lightboxClose.focus({ preventScroll: true });
                }
            } else {
                window.requestAnimationFrame(function() {
                    if (lightboxClose) {
                        lightboxClose.focus({ preventScroll: true });
                    }
                });
            }
        }

        function closeLightbox() {
            if (!lightbox) {
                return;
            }

            lightbox.classList.remove("is-open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = previousBodyOverflow;

            if (prefersReducedMotion()) {
                lightbox.hidden = true;

                if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                    lastFocusedElement.focus({ preventScroll: true });
                }
                return;
            }

            window.setTimeout(function() {
                if (!lightbox.classList.contains("is-open")) {
                    lightbox.hidden = true;
                }
            }, LIGHTBOX_CLOSE_FALLBACK_MS);

            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus({ preventScroll: true });
            }
        }

        layout.addEventListener("click", function(event) {
            const card = event.target.closest(".gallery-card");

            if (!card) {
                return;
            }

            const itemIndex = Number(card.dataset.galleryIndex || 0);
            const item = allItems[itemIndex];

            if (!item) {
                return;
            }

            openLightbox(item);
        });

        if (lightbox) {
            lightbox.addEventListener("click", function(event) {
                const shouldClose = event.target.closest("[data-gallery-close='true']");

                if (shouldClose) {
                    closeLightbox();
                }
            });
        }

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        document.addEventListener("keydown", function(event) {
            if (!lightbox || !lightbox.classList.contains("is-open")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }
        });

        window.__galleryInitialized = true;
    }

    window.initGallery = initGallery;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGallery, { once: true });
    } else {
        initGallery();
    }
})();
