/* =========================================================
   FAQ
   Renderiza la sección de preguntas frecuentes: aplica el
   contenido desde configuración, construye el acordeón y
   controla la apertura/cierre de cada ítem.
   ========================================================= */

(function() {
    "use strict";

    function initFaq() {
        if (window.__faqInitialized) {
            return;
        }

        const section = document.getElementById("faq");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.faq
                ? window.SITE_SECTIONS_CONFIG.faq
                : null;

        if (!section || !config) {
            return;
        }

        const logo = document.getElementById("faqLogo");
        const kicker = document.getElementById("faqKicker");
        const title = document.getElementById("faqTitle");
        const description = document.getElementById("faqDescription");
        const accordion = document.getElementById("faqAccordion");
        const asideKicker = document.getElementById("faqAsideKicker");
        const asideTitle = document.getElementById("faqAsideTitle");
        const asideText = document.getElementById("faqAsideText");
        const actions = document.getElementById("faqActions");
        const primaryCta = document.getElementById("faqPrimaryCta");
        const secondaryCta = document.getElementById("faqSecondaryCta");

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

        if (accordion && Array.isArray(config.items) && config.items.length) {
            accordion.innerHTML = config.items
                .map(function(item, index) {
                    const itemIndex = index + 1;
                    const isOpen = index === 0;

                    return [
                        '<article class="faq-item', isOpen ? ' is-open' : '', '">',
                        '<h3 class="faq-item__heading">',
                        '<button class="faq-item__trigger" type="button" aria-expanded="', isOpen ? 'true' : 'false', '" aria-controls="faqPanel', itemIndex, '" id="faqTrigger', itemIndex, '">',
                        '<span class="faq-item__question">', item.question || "", "</span>",
                        '<span class="faq-item__icon" aria-hidden="true"></span>',
                        "</button>",
                        "</h3>",
                        '<div class="faq-item__panel" id="faqPanel', itemIndex, '" role="region" aria-labelledby="faqTrigger', itemIndex, '"', isOpen ? "" : " hidden", ">",
                        '<div class="faq-item__answer">', item.answer || "", "</div>",
                        "</div>",
                        "</article>"
                    ].join("");
                })
                .join("");
        }

        if (config.aside) {
            if (asideKicker && typeof config.aside.kicker === "string") {
                asideKicker.textContent = config.aside.kicker;
            }

            if (asideTitle && typeof config.aside.title === "string") {
                asideTitle.textContent = config.aside.title;
            }

            if (asideText && typeof config.aside.text === "string") {
                asideText.textContent = config.aside.text;
            }
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
                secondaryCta.textContent = config.secondaryCta.label || "Ver más detalles";
                secondaryCta.href = config.secondaryCta.href || "#contact";
            }
        }

        function closeItem(itemElement) {
            const trigger = itemElement.querySelector(".faq-item__trigger");
            const panel = itemElement.querySelector(".faq-item__panel");

            itemElement.classList.remove("is-open");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }

            if (panel) {
                panel.hidden = true;
            }
        }

        function openItem(itemElement) {
            const trigger = itemElement.querySelector(".faq-item__trigger");
            const panel = itemElement.querySelector(".faq-item__panel");

            itemElement.classList.add("is-open");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "true");
            }

            if (panel) {
                panel.hidden = false;
            }
        }

        function handleAccordionClick(event) {
            const trigger = event.target.closest(".faq-item__trigger");

            if (!trigger || !accordion.contains(trigger)) {
                return;
            }

            const currentItem = trigger.closest(".faq-item");

            if (!currentItem) {
                return;
            }

            const isCurrentlyOpen = currentItem.classList.contains("is-open");
            const allItems = accordion.querySelectorAll(".faq-item");

            allItems.forEach(function(itemElement) {
                closeItem(itemElement);
            });

            if (!isCurrentlyOpen) {
                openItem(currentItem);
            }
        }

        accordion.addEventListener("click", handleAccordionClick);

        window.__faqInitialized = true;
    }

    window.initFaq = initFaq;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFaq, { once: true });
    } else {
        initFaq();
    }
})();
