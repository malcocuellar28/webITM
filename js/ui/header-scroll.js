/* =========================================================
   HEADER SCROLL
   Controla el estado visual del header al hacer scroll,
   activa la clase is-scrolled cuando corresponde y mantiene
   actualizada la variable --site-header-current-height para
   que el nav móvil y otros componentes dependientes se
   posicionen correctamente.
   ========================================================= */

(function() {
    "use strict";

    function initHeaderScroll() {
        if (window.__headerScrollInitialized) {
            return;
        }

        const siteHeader = document.querySelector(".site-header");
        const siteHeaderInner = document.querySelector(".site-header__inner");

        if (!siteHeader) {
            return;
        }

        const CLASS_SCROLLED = "is-scrolled";
        const ENTER_SCROLL_THRESHOLD = 12;
        const EXIT_SCROLL_THRESHOLD = 2;

        let isTickingState = false;
        let isTickingHeight = false;
        let isScrolled = siteHeader.classList.contains(CLASS_SCROLLED);
        let lastHeaderHeight = 0;

        function applyHeaderHeight() {
            const nextHeight = Math.round(siteHeader.getBoundingClientRect().height);

            if (nextHeight <= 0 || nextHeight === lastHeaderHeight) {
                isTickingHeight = false;
                return;
            }

            lastHeaderHeight = nextHeight;
            document.documentElement.style.setProperty(
                "--site-header-current-height",
                nextHeight + "px"
            );
            isTickingHeight = false;
        }

        function requestHeaderHeightUpdate() {
            if (isTickingHeight) {
                return;
            }

            isTickingHeight = true;
            window.requestAnimationFrame(applyHeaderHeight);
        }

        function applyHeaderState() {
            const currentScrollY = window.scrollY || window.pageYOffset || 0;
            let shouldBeScrolled;

            if (currentScrollY <= EXIT_SCROLL_THRESHOLD) {
                shouldBeScrolled = false;
            } else {
                shouldBeScrolled = isScrolled
                    ? currentScrollY > EXIT_SCROLL_THRESHOLD
                    : currentScrollY > ENTER_SCROLL_THRESHOLD;
            }

            if (shouldBeScrolled !== isScrolled) {
                isScrolled = shouldBeScrolled;
                siteHeader.classList.toggle(CLASS_SCROLLED, shouldBeScrolled);
            }

            requestHeaderHeightUpdate();
            isTickingState = false;
        }

        function requestHeaderStateUpdate() {
            if (isTickingState) {
                return;
            }

            isTickingState = true;
            window.requestAnimationFrame(applyHeaderState);
        }

        window.addEventListener("scroll", requestHeaderStateUpdate, { passive: true });
        window.addEventListener("resize", requestHeaderStateUpdate, { passive: true });
        window.addEventListener("orientationchange", requestHeaderStateUpdate, { passive: true });
        window.addEventListener("load", requestHeaderStateUpdate, { once: true });

        if (typeof ResizeObserver === "function") {
            const headerResizeObserver = new ResizeObserver(function() {
                requestHeaderHeightUpdate();
            });

            headerResizeObserver.observe(siteHeader);
        } else if (siteHeaderInner) {
            siteHeaderInner.addEventListener("transitionend", function(event) {
                if (
                    event.propertyName === "min-height" ||
                    event.propertyName === "padding-top" ||
                    event.propertyName === "padding-bottom"
                ) {
                    requestHeaderHeightUpdate();
                }
            });
        }

        if (document.fonts && typeof document.fonts.ready === "object") {
            document.fonts.ready.then(function() {
                requestHeaderStateUpdate();
                requestHeaderHeightUpdate();
            });
        }

        requestHeaderStateUpdate();
        requestHeaderHeightUpdate();
        window.__headerScrollInitialized = true;
    }

    window.initHeaderScroll = initHeaderScroll;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHeaderScroll, { once: true });
    } else {
        initHeaderScroll();
    }
})();
