/* =========================================================
   NAV
   Controla la navegación principal del sitio: apertura y
   cierre del menú móvil, sincronización de altura con el
   header, manejo de foco accesible y bloqueo de interacción
   inicial hasta que el componente esté listo.
   ========================================================= */

(function() {
    "use strict";

    function initNav() {
        if (window.__navInitialized) {
            return;
        }

        const siteHeader = document.querySelector(".site-header");
        const nav = document.querySelector(".site-nav");
        const toggleButton = document.querySelector(".site-nav__toggle");
        const panel = document.querySelector(".site-nav__panel");
        const navLinks = Array.from(document.querySelectorAll(".site-nav__link"));

        if (!siteHeader || !nav || !toggleButton || !panel) {
            return;
        }

        const mobileMediaQuery = window.matchMedia("(max-width: 960px)");
        const CLASS_NAV_OPEN = "is-open";
        const CLASS_BODY_NAV_OPEN = "has-nav-open";
        const CLASS_NAV_READY = "nav-is-ready";
        const FOCUSABLE_SELECTOR = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled]):not([type="hidden"])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(",");

        let resizeObserver = null;
        let animationFrameId = 0;
        let lastKnownHeaderHeight = -1;
        let lastFocusedElement = null;

        function isMobileView() {
            return mobileMediaQuery.matches;
        }

        function isNavOpen() {
            return nav.classList.contains(CLASS_NAV_OPEN);
        }

        function getFocusablePanelElements() {
            return Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(function(element) {
                return !element.hasAttribute("hidden") &&
                    element.getAttribute("aria-hidden") !== "true" &&
                    element.tabIndex !== -1;
            });
        }

        function applyHeaderHeight() {
            animationFrameId = 0;

            const nextHeaderHeight = Math.round(siteHeader.getBoundingClientRect().height);

            if (nextHeaderHeight <= 0 || nextHeaderHeight === lastKnownHeaderHeight) {
                return;
            }

            lastKnownHeaderHeight = nextHeaderHeight;
            document.documentElement.style.setProperty(
                "--site-header-current-height",
                nextHeaderHeight + "px"
            );
        }

        function scheduleHeaderHeightUpdate() {
            if (animationFrameId) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(applyHeaderHeight);
        }

        function syncPanelState() {
            panel.setAttribute("aria-hidden", String(!isNavOpen()));
        }

        function moveFocusIntoPanel() {
            const focusableElements = getFocusablePanelElements();

            if (focusableElements.length > 0) {
                focusableElements[0].focus({ preventScroll: true });
                return;
            }

            panel.focus({ preventScroll: true });
        }

        function openNav() {
            if (!isMobileView()) {
                return;
            }

            lastFocusedElement = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : toggleButton;

            scheduleHeaderHeightUpdate();
            nav.classList.add(CLASS_NAV_OPEN);
            toggleButton.setAttribute("aria-expanded", "true");
            document.body.classList.add(CLASS_BODY_NAV_OPEN);
            syncPanelState();

            window.requestAnimationFrame(moveFocusIntoPanel);
        }

        function closeNav(options) {
            const config = options || {};
            const shouldRestoreFocus = Boolean(config.restoreFocus);

            nav.classList.remove(CLASS_NAV_OPEN);
            toggleButton.setAttribute("aria-expanded", "false");
            document.body.classList.remove(CLASS_BODY_NAV_OPEN);
            syncPanelState();

            if (
                shouldRestoreFocus &&
                lastFocusedElement &&
                typeof lastFocusedElement.focus === "function"
            ) {
                lastFocusedElement.focus({ preventScroll: true });
            }
        }

        function toggleNav() {
            if (isNavOpen()) {
                closeNav({ restoreFocus: true });
            } else {
                openNav();
            }
        }

        function handleToggleClick() {
            if (!isMobileView()) {
                return;
            }

            toggleNav();
        }

        function handleLinkClick() {
            if (!isMobileView()) {
                return;
            }

            closeNav({ restoreFocus: false });
        }

        function handleDocumentClick(event) {
            if (!isMobileView() || !isNavOpen()) {
                return;
            }

            if (nav.contains(event.target)) {
                return;
            }

            closeNav({ restoreFocus: true });
        }

        function handleDocumentKeydown(event) {
            if (!isNavOpen()) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                closeNav({ restoreFocus: true });
                return;
            }

            if (event.key !== "Tab" || !isMobileView()) {
                return;
            }

            const focusableElements = getFocusablePanelElements();

            if (focusableElements.length === 0) {
                event.preventDefault();
                toggleButton.focus({ preventScroll: true });
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus({ preventScroll: true });
                return;
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus({ preventScroll: true });
            }
        }

        function handleViewportChange() {
            scheduleHeaderHeightUpdate();
            closeNav({ restoreFocus: false });
        }

        function bindHeaderObserver() {
            if (typeof ResizeObserver !== "function") {
                return;
            }

            resizeObserver = new ResizeObserver(function() {
                scheduleHeaderHeightUpdate();
            });

            resizeObserver.observe(siteHeader);
        }

        toggleButton.addEventListener("click", handleToggleClick);

        navLinks.forEach(function(link) {
            link.addEventListener("click", handleLinkClick);
        });

        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleDocumentKeydown);

        window.addEventListener("resize", scheduleHeaderHeightUpdate, { passive: true });
        window.addEventListener("orientationchange", scheduleHeaderHeightUpdate);
        window.addEventListener("load", scheduleHeaderHeightUpdate, { once: true });

        if (typeof mobileMediaQuery.addEventListener === "function") {
            mobileMediaQuery.addEventListener("change", handleViewportChange);
        } else if (typeof mobileMediaQuery.addListener === "function") {
            mobileMediaQuery.addListener(handleViewportChange);
        }

        if (document.fonts && typeof document.fonts.ready === "object") {
            document.fonts.ready.then(scheduleHeaderHeightUpdate);
        }

        panel.tabIndex = -1;
        bindHeaderObserver();
        syncPanelState();
        scheduleHeaderHeightUpdate();
        closeNav({ restoreFocus: false });
        document.documentElement.classList.add(CLASS_NAV_READY);
        window.__navInitialized = true;
    }

    window.initNav = initNav;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNav, { once: true });
    } else {
        initNav();
    }
})();
