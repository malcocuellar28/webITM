/* =========================================================
   NEWS
   Renderiza la sección de noticias de la home: aplica el
   contenido destacado y las cards secundarias desde
   configuración, incluyendo iconos, fechas y enlaces.
   ========================================================= */

(function() {
    "use strict";

    function initNews() {
        if (window.__newsInitialized) {
            return;
        }

        const section = document.getElementById("news");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.news
                ? window.SITE_SECTIONS_CONFIG.news
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("newsLogo");
        const kicker = document.getElementById("newsKicker");
        const title = document.getElementById("newsTitle");
        const description = document.getElementById("newsDescription");
        const cta = document.getElementById("newsCta");

        const featuredCard = document.getElementById("newsFeaturedCard");
        const featuredImage = document.getElementById("newsFeaturedImage");
        const featuredNewBadge = document.getElementById("newsFeaturedNewBadge");
        const featuredCategory = document.getElementById("newsFeaturedCategory");
        const featuredDateIcon = document.getElementById("newsFeaturedDateIcon");
        const featuredDate = document.getElementById("newsFeaturedDate");
        const featuredTitle = document.getElementById("newsFeaturedTitle");
        const featuredText = document.getElementById("newsFeaturedText");
        const featuredLink = document.getElementById("newsFeaturedLink");
        const featuredLinkLabel = document.getElementById("newsFeaturedLinkLabel");
        const featuredLinkIcon = document.getElementById("newsFeaturedLinkIcon");

        const stack = document.getElementById("newsStack");

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

        if (cta && config.cta) {
            cta.textContent = config.cta.label || "Ir al centro de noticias";
            cta.href = config.cta.href || "news-center.html";
        }

        const icons = config.icons || {};

        function applyDateIcon(imageElement) {
            if (!imageElement) {
                return;
            }

            if (typeof icons.dateIconSrc === "string" && icons.dateIconSrc.trim()) {
                imageElement.src = icons.dateIconSrc;
            }

            imageElement.alt = typeof icons.dateIconAlt === "string" ? icons.dateIconAlt : "";
        }

        function applyReadMoreIcon(imageElement) {
            if (!imageElement) {
                return;
            }

            if (typeof icons.readMoreIconSrc === "string" && icons.readMoreIconSrc.trim()) {
                imageElement.src = icons.readMoreIconSrc;
            }

            imageElement.alt = typeof icons.readMoreIconAlt === "string" ? icons.readMoreIconAlt : "";
        }

        if (config.featured && featuredCard) {
            const item = config.featured;

            if (featuredImage) {
                if (typeof item.imageSrc === "string" && item.imageSrc.trim()) {
                    featuredImage.src = item.imageSrc;
                }

                if (typeof item.imageAlt === "string") {
                    featuredImage.alt = item.imageAlt;
                }
            }

            if (featuredNewBadge) {
                featuredNewBadge.hidden = item.showNewBadge !== true;
                featuredNewBadge.textContent = item.newBadgeLabel || "Nuevo";
            }

            if (featuredCategory) {
                featuredCategory.textContent = item.categoryLabel || "Institucional";
            }

            applyDateIcon(featuredDateIcon);

            if (featuredDate) {
                featuredDate.textContent = item.date || "";
            }

            if (featuredTitle) {
                featuredTitle.textContent = item.title || "";
            }

            if (featuredText) {
                featuredText.textContent = item.text || "";
            }

            if (featuredLink) {
                featuredLink.href = item.linkHref || "news-center.html";
            }

            if (featuredLinkLabel) {
                featuredLinkLabel.textContent = item.linkLabel || "Leer más";
            }

            applyReadMoreIcon(featuredLinkIcon);
        }

        function createNewsCard(item) {
            const showNewBadge = item.showNewBadge === true;

            return [
                '<article class="news-card">',
                '<div class="news-card__media">',
                '<img src="', item.imageSrc || "", '" alt="', item.imageAlt || "", '" class="news-card__image" loading="lazy">',
                '</div>',
                '<div class="news-card__content">',
                '<div class="news-card__meta-row">',
                '<div class="news-card__badges">',
                showNewBadge
                    ? '<span class="news-card__badge news-card__badge--new">' + (item.newBadgeLabel || "Nuevo") + '</span>'
                    : '',
                '<span class="news-card__badge news-card__badge--category">' + (item.categoryLabel || "Institucional") + '</span>',
                '</div>',
                '<div class="news-card__date-group">',
                '<span class="news-card__date-icon-slot">',
                '<img src="', icons.dateIconSrc || "", '" alt="', icons.dateIconAlt || "", '" class="news-card__date-icon">',
                '</span>',
                '<span class="news-card__date">', item.date || "", '</span>',
                '</div>',
                '</div>',
                '<h3 class="news-card__title">', item.title || "", '</h3>',
                '<p class="news-card__text">', item.text || "", '</p>',
                '<a href="', item.linkHref || "news-center.html", '" class="news-card__link">',
                '<span>', item.linkLabel || "Leer más", '</span>',
                '<span class="news-card__link-icon-slot">',
                '<img src="', icons.readMoreIconSrc || "", '" alt="', icons.readMoreIconAlt || "", '" class="news-card__link-icon">',
                '</span>',
                '</a>',
                '</div>',
                '</article>'
            ].join("");
        }

        if (stack && Array.isArray(config.items)) {
            stack.innerHTML = config.items.map(createNewsCard).join("");
        }

        window.__newsInitialized = true;
    }

    window.initNews = initNews;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNews, { once: true });
    } else {
        initNews();
    }
})();
