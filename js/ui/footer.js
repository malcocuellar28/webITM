/* =========================================================
   FOOTER
   Renderiza el footer institucional: aplica marca, contacto,
   enlaces rápidos, redes sociales y bloque visual inferior
   desde la configuración central del sitio.
   ========================================================= */

(function() {
    "use strict";

    function initFooter() {
        if (window.__footerInitialized) {
            return;
        }

        const footer = document.getElementById("footer");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.footer
                ? window.SITE_SECTIONS_CONFIG.footer
                : null;

        if (!footer || !config) {
            return;
        }

        const footerLogo = document.getElementById("footerLogo");
        const footerBrandTitle = document.getElementById("footerBrandTitle");
        const footerMotto = document.getElementById("footerMotto");

        const footerContactTitle = document.getElementById("footerContactTitle");
        const footerAddress = document.getElementById("footerAddress");
        const footerPhones = document.getElementById("footerPhones");
        const footerEmail = document.getElementById("footerEmail");

        const footerLinksTitle = document.getElementById("footerLinksTitle");
        const footerMenu = document.getElementById("footerMenu");

        const footerSocialTitle = document.getElementById("footerSocialTitle");
        const footerFacebook = document.getElementById("footerFacebook");
        const footerInstagram = document.getElementById("footerInstagram");

        const footerMorazanImage = document.getElementById("footerMorazanImage");
        const footerCopyright = document.getElementById("footerCopyright");

        if (config.enabled === false) {
            footer.hidden = true;
            return;
        }

        if (footerLogo) {
            if (typeof config.logoSrc === "string" && config.logoSrc.trim()) {
                footerLogo.src = config.logoSrc;
            }

            if (typeof config.logoAlt === "string") {
                footerLogo.alt = config.logoAlt;
            }
        }

        if (config.brand) {
            if (footerBrandTitle && typeof config.brand.title === "string") {
                footerBrandTitle.textContent = config.brand.title;
            }

            if (footerMotto && typeof config.brand.motto === "string") {
                footerMotto.textContent = config.brand.motto;
            }
        }

        if (config.contact) {
            if (footerContactTitle && typeof config.contact.title === "string") {
                footerContactTitle.textContent = config.contact.title;
            }

            if (footerAddress && typeof config.contact.address === "string") {
                footerAddress.textContent = config.contact.address;
            }

            if (footerPhones && typeof config.contact.phones === "string") {
                footerPhones.textContent = config.contact.phones;
            }

            if (footerEmail && typeof config.contact.email === "string") {
                footerEmail.textContent = config.contact.email;
                footerEmail.href = "mailto:" + config.contact.email;
            }
        }

        if (config.links) {
            if (footerLinksTitle && typeof config.links.title === "string") {
                footerLinksTitle.textContent = config.links.title;
            }

            if (footerMenu && Array.isArray(config.links.items) && config.links.items.length) {
                const iconMarkupByTarget = {
                    home: '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><path d="M4 10.5 12 4l8 6.5V20h-5.5v-5h-5v5H4v-9.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
                    "about-stats": '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><circle cx="12" cy="8" r="3.1" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.8 18.4c1.1-2.9 3.8-4.4 6.2-4.4s5.1 1.5 6.2 4.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
                    "education-levels": '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><path d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6.5 10.5V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
                    gallery: '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><rect x="4" y="5" width="16" height="14" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 15-4.5-4.5L8 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
                    notices: '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><path d="M12 5.5a5.5 5.5 0 0 1 5.5 5.5v2.5l1.5 2v1H5v-1l1.5-2V11A5.5 5.5 0 0 1 12 5.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 18a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
                    news: '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><path d="M6 6h10.5A1.5 1.5 0 0 1 18 7.5v10a1.5 1.5 0 0 1-1.5 1.5H8a2 2 0 0 1-2-2V6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9h7M8 12h7M8 15h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
                    contact: '<svg viewBox="0 0 24 24" class="site-footer__inline-icon"><path d="M4.5 7.2 12 12l7.5-4.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="3.5" y="6" width="17" height="12" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
                };

                footerMenu.innerHTML = config.links.items
                    .map(function(item) {
                        const label = typeof item.label === "string" ? item.label : "";
                        const href = typeof item.href === "string" ? item.href : "#";
                        const target = href.includes("#") ? href.split("#")[1] : "";
                        const iconMarkup = iconMarkupByTarget[target] || iconMarkupByTarget.contact;

                        return [
                            '<li class="site-footer__menu-item">',
                            '<a href="', href, '" class="site-footer__menu-link">',
                            '<span class="site-footer__menu-icon" aria-hidden="true">',
                            iconMarkup,
                            '</span>',
                            '<span>', label, '</span>',
                            '</a>',
                            '</li>'
                        ].join("");
                    })
                    .join("");
            }
        }

        if (config.social) {
            if (footerSocialTitle && typeof config.social.title === "string") {
                footerSocialTitle.textContent = config.social.title;
            }

            if (footerFacebook && config.social.facebook) {
                footerFacebook.hidden = config.social.facebook.enabled === false;
                footerFacebook.href = config.social.facebook.href || "#";

                const facebookText = footerFacebook.querySelector("span");
                const facebookIcon = footerFacebook.querySelector("img");

                if (facebookText && typeof config.social.facebook.label === "string") {
                    facebookText.textContent = config.social.facebook.label;
                }

                if (facebookIcon && typeof config.social.facebook.iconSrc === "string") {
                    facebookIcon.src = config.social.facebook.iconSrc;
                }
            }

            if (footerInstagram && config.social.instagram) {
                footerInstagram.hidden = config.social.instagram.enabled === false;
                footerInstagram.href = config.social.instagram.href || "#";

                const instagramText = footerInstagram.querySelector("span");
                const instagramIcon = footerInstagram.querySelector("img");

                if (instagramText && typeof config.social.instagram.label === "string") {
                    instagramText.textContent = config.social.instagram.label;
                }

                if (instagramIcon && typeof config.social.instagram.iconSrc === "string") {
                    instagramIcon.src = config.social.instagram.iconSrc;
                }
            }
        }

        if (config.morazan && footerMorazanImage) {
            if (typeof config.morazan.imageSrc === "string" && config.morazan.imageSrc.trim()) {
                footerMorazanImage.src = config.morazan.imageSrc;
            }

            if (typeof config.morazan.imageAlt === "string") {
                footerMorazanImage.alt = config.morazan.imageAlt;
            }
        }

        if (footerCopyright && typeof config.copyright === "string") {
            footerCopyright.textContent = config.copyright;
        }

        window.__footerInitialized = true;
    }

    window.initFooter = initFooter;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFooter, { once: true });
    } else {
        initFooter();
    }
})();
