/* =========================================================
   TESTIMONIALS
   Renderiza la sección de testimonios: aplica contenido desde
   configuración, construye el carrusel, ajusta la altura del
   viewport y controla navegación, dots y autoplay.
   ========================================================= */

(function() {
    "use strict";

    function initTestimonials() {
        if (window.__testimonialsInitialized) {
            return;
        }

        const section = document.getElementById("testimonials");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.testimonials
                ? window.SITE_SECTIONS_CONFIG.testimonials
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("testimonialsLogo");
        const kicker = document.getElementById("testimonialsKicker");
        const title = document.getElementById("testimonialsTitle");
        const description = document.getElementById("testimonialsDescription");
        const viewport = section.querySelector(".testimonials-section__viewport");
        const track = document.getElementById("testimonialsTrack");
        const prevButton = document.getElementById("testimonialsPrev");
        const nextButton = document.getElementById("testimonialsNext");
        const dotsContainer = document.getElementById("testimonialsDots");

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

        const items = Array.isArray(config.items) ? config.items : [];

        if (!track || !items.length) {
            return;
        }

        track.innerHTML = items
            .map(function(item, index) {
                const useImage = item.avatarMode === "image" && typeof item.imageSrc === "string" && item.imageSrc.trim();
                const initials = typeof item.initials === "string" ? item.initials : "";
                const imageSrc = typeof item.imageSrc === "string" ? item.imageSrc : "";
                const imageAlt = typeof item.imageAlt === "string" ? item.imageAlt : "";
                const name = typeof item.name === "string" ? item.name : "";
                const meta = typeof item.meta === "string" ? item.meta : "";
                const text = typeof item.text === "string" ? item.text : "";

                return [
                    '<article class="testimonial-card',
                    index === 0 ? ' is-active' : '',
                    '">',
                    '<span class="testimonial-card__quote-mark" aria-hidden="true">“</span>',
                    '<p class="testimonial-card__text">', text, '</p>',
                    '<div class="testimonial-card__author">',
                    '<div class="testimonial-card__avatar">',
                    '<span class="testimonial-card__initials"', useImage ? ' hidden' : '', '>', initials, '</span>',
                    '<img src="', imageSrc, '" alt="', imageAlt, '" class="testimonial-card__avatar-image"', useImage ? '' : ' hidden', '>',
                    '</div>',
                    '<div class="testimonial-card__author-copy">',
                    '<p class="testimonial-card__name">', name, '</p>',
                    '<p class="testimonial-card__meta">', meta, '</p>',
                    '</div>',
                    '</div>',
                    '</article>'
                ].join("");
            })
            .join("");

        if (dotsContainer) {
            dotsContainer.innerHTML = items
                .map(function(_, index) {
                    return [
                        '<button class="testimonials-section__dot',
                        index === 0 ? ' is-active' : '',
                        '" type="button" aria-label="Ir al testimonio ',
                        String(index + 1),
                        '" data-testimonial-dot="',
                        String(index),
                        '"></button>'
                    ].join("");
                })
                .join("");
        }

        const slides = Array.from(track.querySelectorAll(".testimonial-card"));
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll(".testimonials-section__dot")) : [];

        let currentIndex = 0;
        let autoplayTimerId = null;
        let isPaused = false;
        let resizeRafId = null;

        function syncViewportHeight() {
            if (!viewport || !slides.length) {
                return;
            }

            const activeSlide = slides[currentIndex];

            if (!activeSlide) {
                return;
            }

            viewport.style.height = activeSlide.offsetHeight + "px";
        }

        function updateCarousel() {
            const activeSlide = slides[currentIndex];

            if (!activeSlide) {
                return;
            }

            track.style.transform = "translateX(-" + String(activeSlide.offsetLeft) + "px)";

            slides.forEach(function(slide, index) {
                slide.classList.toggle("is-active", index === currentIndex);
            });

            dots.forEach(function(dot, index) {
                dot.classList.toggle("is-active", index === currentIndex);
            });

            syncViewportHeight();
        }

        function goToSlide(index) {
            if (!slides.length) {
                return;
            }

            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            updateCarousel();
        }

        function goToNext() {
            goToSlide(currentIndex + 1);
        }

        function goToPrev() {
            goToSlide(currentIndex - 1);
        }

        function clearAutoplay() {
            if (autoplayTimerId !== null) {
                window.clearInterval(autoplayTimerId);
                autoplayTimerId = null;
            }
        }

        function startAutoplay() {
            clearAutoplay();

            if (config.autoplay === false || slides.length <= 1 || isPaused) {
                return;
            }

            autoplayTimerId = window.setInterval(function() {
                goToNext();
            }, Number(config.autoplayDelayMs) || 5000);
        }

        function requestResizeSync() {
            if (resizeRafId !== null) {
                window.cancelAnimationFrame(resizeRafId);
            }

            resizeRafId = window.requestAnimationFrame(function() {
                updateCarousel();
                resizeRafId = null;
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function() {
                goToPrev();
                startAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function() {
                goToNext();
                startAutoplay();
            });
        }

        if (dots.length) {
            dots.forEach(function(dot) {
                dot.addEventListener("click", function() {
                    const index = Number(dot.dataset.testimonialDot || 0);
                    goToSlide(index);
                    startAutoplay();
                });
            });
        }

        if (config.pauseOnHover !== false) {
            section.addEventListener("mouseenter", function() {
                isPaused = true;
                clearAutoplay();
            });

            section.addEventListener("mouseleave", function() {
                isPaused = false;
                startAutoplay();
            });
        }

        window.addEventListener("resize", requestResizeSync);
        window.addEventListener("orientationchange", requestResizeSync);
        window.addEventListener("load", requestResizeSync);

        updateCarousel();
        startAutoplay();

        window.__testimonialsInitialized = true;
    }

    window.initTestimonials = initTestimonials;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTestimonials, { once: true });
    } else {
        initTestimonials();
    }
})();
