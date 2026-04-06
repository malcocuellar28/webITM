(function() {
    "use strict";

    function initNewsCenterView() {
        if (typeof window.initTheme === "function") {
            window.initTheme();
        }

        if (typeof window.initThemeFeedback === "function") {
            window.initThemeFeedback();
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

        if (typeof window.initBreadcrumb === "function") {
            window.initBreadcrumb();
        }

        if (typeof window.initScrollTop === "function") {
            window.initScrollTop();
        }

        if (typeof window.initToast === "function") {
            window.initToast();
        }

        if (typeof window.initNewsCenter === "function") {
            window.initNewsCenter();
        }

        if (typeof window.initFooter === "function") {
            window.initFooter();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNewsCenterView, { once: true });
    } else {
        initNewsCenterView();
    }
})();
