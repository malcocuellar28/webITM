(function() {
    "use strict";

    function initHomePage() {
        if (typeof window.initTheme === "function") {
            window.initTheme();
        }

        if (typeof window.initNav === "function") {
            window.initNav();
        }

        if (typeof window.initHeaderScroll === "function") {
            window.initHeaderScroll();
        }

        if (typeof window.initScrollProgress === "function") {
            window.initScrollProgress();
        }

        if (typeof window.initLoader === "function") {
            window.initLoader();
        }

        if (typeof window.initHero === "function") {
            window.initHero();
        }

        if (typeof window.initBreadcrumb === "function") {
            window.initBreadcrumb();
        }

        if (typeof window.initModal === "function") {
            window.initModal();
        }

        if (typeof window.initScrollTop === "function") {
            window.initScrollTop();
        }

        if (typeof window.initToast === "function") {
            window.initToast();
        }

        if (typeof window.initThemeFeedback === "function") {
            window.initThemeFeedback();
        }

        if (typeof window.initAboutStats === "function") {
            window.initAboutStats();
        }

        if (typeof window.initAbout === "function") {
            window.initAbout();
        }

        if (typeof window.initFaq === "function") {
            window.initFaq();
        }

        if (typeof window.initEducationLevels === "function") {
            window.initEducationLevels();
        }

        if (typeof window.initTechCareers === "function") {
            window.initTechCareers();
        }

        if (typeof window.initGallery === "function") {
            window.initGallery();
        }

        if (typeof window.initCountdown === "function") {
            window.initCountdown();
        }

        if (typeof window.initNotices === "function") {
            window.initNotices();
        }

        if (typeof window.initEvents === "function") {
            window.initEvents();
        }

        if (typeof window.initTestimonials === "function") {
            window.initTestimonials();
        }

        if (typeof window.initNews === "function") {
            window.initNews();
        }

        if (typeof window.initContact === "function") {
            window.initContact();
        }

        if (typeof window.initFooter === "function") {
            window.initFooter();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHomePage, { once: true });
    } else {
        initHomePage();
    }
})();

(function() {
    "use strict";

    let temporizadorResize = null;

    function activarModoResize() {
        document.documentElement.classList.add("is-resizing");

        window.clearTimeout(temporizadorResize);
        temporizadorResize = window.setTimeout(function() {
            document.documentElement.classList.remove("is-resizing");
        }, 180);
    }

    window.addEventListener("resize", activarModoResize, { passive: true });
    window.addEventListener("orientationchange", activarModoResize, { passive: true });
})();
