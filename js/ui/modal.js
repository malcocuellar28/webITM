(function() {
    "use strict";

    function initModal(attemptCount) {
        if (window.__modalInitialized) {
            return;
        }

        const modal = document.getElementById("siteModal");

        if (!modal) {
            return;
        }

        const config = window.SITE_MODAL_CONFIG;

        if (!config) {
            const nextAttempt = (attemptCount || 0) + 1;

            if (nextAttempt <= 40) {
                window.requestAnimationFrame(function() {
                    initModal(nextAttempt);
                });
            }

            return;
        }

        const modalDialog = modal.querySelector(".site-modal__dialog");
        const modalBackdrop = modal.querySelector(".site-modal__backdrop");
        const modalCloseButton = document.getElementById("siteModalClose");
        const modalDismissButton = document.getElementById("siteModalDismiss");
        const modalEyebrow = document.getElementById("siteModalEyebrow");
        const modalTitle = document.getElementById("siteModalTitle");
        const modalDescription = document.getElementById("siteModalDescription");
        const modalMedia = document.getElementById("siteModalMedia");
        const modalImage = document.getElementById("siteModalImage");
        const modalPrimaryButton = document.getElementById("siteModalPrimaryButton");
        const modalSecondaryButton = document.getElementById("siteModalSecondaryButton");

        if (!modalDialog) {
            return;
        }

        const CLASS_OPEN = "is-open";
        const CLASS_BODY_OPEN = "has-modal-open";
        const STORAGE_KEY = (config.persistence && config.persistence.storageKey) || "siteModalState";
        const SESSION_KEY = STORAGE_KEY + "__session";
        const CLOSE_FALLBACK_MS = 320;
        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        let isModalOpen = false;
        let lastFocusedElement = null;
        let inactivityTimerId = null;
        let showTimerId = null;
        let closeFallbackTimerId = null;
        let scrollTriggerHandled = false;
        let exitIntentHandled = false;
        let previousBodyOverflow = "";

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function getDebugConfig() {
            return config.debug || {};
        }

        function shouldIgnorePersistence() {
            const debug = getDebugConfig();
            return Boolean(debug.debugMode && debug.ignorePersistence);
        }

        function shouldIgnoreFrequencyRules() {
            const debug = getDebugConfig();
            return Boolean(debug.debugMode && debug.ignoreFrequencyRules);
        }

        function shouldShowOnEveryReload() {
            const debug = getDebugConfig();
            return Boolean(debug.debugMode && debug.showOnEveryReload);
        }

        function isModalEnabled() {
            const debug = getDebugConfig();

            if (debug.debugMode && debug.forceEnabled) {
                return true;
            }

            return Boolean(config.enabled);
        }

        function getStorage(mode) {
            try {
                return mode === "sessionStorage" ? window.sessionStorage : window.localStorage;
            } catch (error) {
                return null;
            }
        }

        function getPersistentStorage() {
            const mode = (config.persistence && config.persistence.storageMode) || "localStorage";
            return getStorage(mode);
        }

        function getSessionStorageSafe() {
            return getStorage("sessionStorage");
        }

        function readJson(storage, key, fallbackValue) {
            if (!storage) {
                return fallbackValue;
            }

            try {
                const rawValue = storage.getItem(key);

                if (!rawValue) {
                    return fallbackValue;
                }

                return JSON.parse(rawValue);
            } catch (error) {
                return fallbackValue;
            }
        }

        function writeJson(storage, key, value) {
            if (!storage || shouldIgnorePersistence()) {
                return;
            }

            try {
                storage.setItem(key, JSON.stringify(value));
            } catch (error) {
                /* Sin acción */
            }
        }

        function getPersistentState() {
            if (shouldIgnorePersistence()) {
                return {
                    version: config.version || "1.0.0",
                    lastShownAt: 0,
                    lifetimeCount: 0
                };
            }

            return readJson(getPersistentStorage(), STORAGE_KEY, {
                version: config.version || "1.0.0",
                lastShownAt: 0,
                lifetimeCount: 0
            });
        }

        function setPersistentState(nextState) {
            writeJson(getPersistentStorage(), STORAGE_KEY, nextState);
        }

        function getSessionState() {
            if (shouldIgnorePersistence()) {
                return {
                    displays: 0,
                    dismissed: false
                };
            }

            return readJson(getSessionStorageSafe(), SESSION_KEY, {
                displays: 0,
                dismissed: false
            });
        }

        function setSessionState(nextState) {
            writeJson(getSessionStorageSafe(), SESSION_KEY, nextState);
        }

        function resetStateOnVersionChange() {
            if (!config.resetOnVersionChange || shouldIgnorePersistence()) {
                return;
            }

            const sessionStorageSafe = getSessionStorageSafe();
            const currentVersion = config.version || "1.0.0";
            const persistentState = getPersistentState();

            if (persistentState.version === currentVersion) {
                return;
            }

            setPersistentState({
                version: currentVersion,
                lastShownAt: 0,
                lifetimeCount: 0
            });

            if (sessionStorageSafe) {
                try {
                    sessionStorageSafe.removeItem(SESSION_KEY);
                } catch (error) {
                    /* Sin acción */
                }
            }
        }

        function ensureCloseButtonIcon() {
            if (!modalCloseButton) {
                return;
            }

            modalCloseButton.setAttribute("data-modal-close", "true");

            if (modalCloseButton.querySelector(".site-modal__close-icon")) {
                return;
            }

            modalCloseButton.innerHTML = [
                '<svg class="site-modal__close-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">',
                '    <path class="site-modal__close-line" d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
                '    <path class="site-modal__close-line" d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
                '</svg>'
            ].join("");
        }

        function configureEyebrow(content) {
            if (!modalEyebrow) {
                return;
            }

            if (typeof content.eyebrow === "string" && content.eyebrow.trim()) {
                modalEyebrow.textContent = content.eyebrow.trim();
                modalEyebrow.removeAttribute("hidden");
                return;
            }

            modalEyebrow.textContent = "";
            modalEyebrow.setAttribute("hidden", "");
        }

        function configureModalContent() {
            const content = config.content || {};
            const imageConfig = content.image || {};
            const primaryButtonConfig = content.primaryButton || {};
            const secondaryButtonConfig = content.secondaryButton || {};

            configureEyebrow(content);

            if (modalTitle) {
                modalTitle.textContent = typeof content.title === "string" ? content.title : "";
            }

            if (modalDescription) {
                modalDescription.textContent = typeof content.description === "string" ? content.description : "";
            }

            if (modalDismissButton) {
                modalDismissButton.setAttribute("data-modal-close", "true");
                modalDismissButton.textContent = typeof content.closeText === "string" ? content.closeText : "";
            }

            if (modalBackdrop) {
                modalBackdrop.setAttribute("data-modal-close", "true");
            }

            if (modalMedia && modalImage) {
                if (imageConfig.enabled === false) {
                    modalMedia.setAttribute("hidden", "");
                    modalImage.removeAttribute("src");
                    modalImage.alt = "";
                } else {
                    modalMedia.removeAttribute("hidden");

                    if (typeof imageConfig.src === "string" && imageConfig.src.trim()) {
                        modalImage.src = imageConfig.src;
                    } else {
                        modalImage.removeAttribute("src");
                    }

                    modalImage.alt = typeof imageConfig.alt === "string" ? imageConfig.alt : "";
                }
            }

            if (modalPrimaryButton) {
                if (primaryButtonConfig.enabled === false) {
                    modalPrimaryButton.setAttribute("hidden", "");
                    modalPrimaryButton.textContent = "";
                    modalPrimaryButton.removeAttribute("href");
                } else {
                    modalPrimaryButton.removeAttribute("hidden");
                    modalPrimaryButton.textContent =
                        typeof primaryButtonConfig.label === "string" ? primaryButtonConfig.label : "";

                    if (typeof primaryButtonConfig.href === "string" && primaryButtonConfig.href.trim()) {
                        modalPrimaryButton.href = primaryButtonConfig.href;
                    } else {
                        modalPrimaryButton.removeAttribute("href");
                    }
                }
            }

            if (modalSecondaryButton) {
                if (secondaryButtonConfig.enabled === false) {
                    modalSecondaryButton.setAttribute("hidden", "");
                    modalSecondaryButton.textContent = "";
                    modalSecondaryButton.removeAttribute("href");
                } else {
                    modalSecondaryButton.removeAttribute("hidden");
                    modalSecondaryButton.textContent =
                        typeof secondaryButtonConfig.label === "string" ? secondaryButtonConfig.label : "";

                    if (typeof secondaryButtonConfig.href === "string" && secondaryButtonConfig.href.trim()) {
                        modalSecondaryButton.href = secondaryButtonConfig.href;
                    } else {
                        modalSecondaryButton.removeAttribute("href");
                    }
                }
            }
        }

        function getAppearanceConfig() {
            return config.appearance || {};
        }

        function getFrequencyConfig() {
            return config.frequency || {};
        }

        function hasReachedScrollPercent(targetPercent) {
            const documentElement = document.documentElement;
            const scrollTop = window.scrollY || documentElement.scrollTop || 0;
            const scrollableHeight = documentElement.scrollHeight - window.innerHeight;

            if (scrollableHeight <= 0) {
                return false;
            }

            return (scrollTop / scrollableHeight) * 100 >= targetPercent;
        }

        function canShowModalByFrequency() {
            if (shouldShowOnEveryReload() || shouldIgnoreFrequencyRules()) {
                return true;
            }

            const frequency = getFrequencyConfig();
            const persistentState = getPersistentState();
            const sessionState = getSessionState();
            const now = Date.now();

            if (frequency.showOncePerSession && sessionState.displays >= 1) {
                return false;
            }

            if (frequency.maxDisplaysPerSession > 0 && sessionState.displays >= frequency.maxDisplaysPerSession) {
                return false;
            }

            if (frequency.maxDisplaysLifetime > 0 && persistentState.lifetimeCount >= frequency.maxDisplaysLifetime) {
                return false;
            }

            if (frequency.showOncePerDays > 0 && persistentState.lastShownAt > 0) {
                const requiredMs = frequency.showOncePerDays * 24 * 60 * 60 * 1000;

                if (now - persistentState.lastShownAt < requiredMs) {
                    return false;
                }
            }

            if (frequency.cooldownMs > 0 && persistentState.lastShownAt > 0) {
                if (now - persistentState.lastShownAt < frequency.cooldownMs) {
                    return false;
                }
            }

            if (frequency.showEveryMs > 0 && persistentState.lastShownAt > 0) {
                if (now - persistentState.lastShownAt < frequency.showEveryMs) {
                    return false;
                }
            }

            return true;
        }

        function registerDisplay() {
            if (shouldShowOnEveryReload() || shouldIgnorePersistence()) {
                return;
            }

            const now = Date.now();
            const persistentState = getPersistentState();
            const sessionState = getSessionState();

            persistentState.version = config.version || "1.0.0";
            persistentState.lastShownAt = now;
            persistentState.lifetimeCount = (persistentState.lifetimeCount || 0) + 1;

            sessionState.displays = (sessionState.displays || 0) + 1;
            sessionState.dismissed = false;

            setPersistentState(persistentState);
            setSessionState(sessionState);
        }

        function registerDismiss() {
            if (shouldIgnorePersistence()) {
                return;
            }

            const sessionState = getSessionState();
            sessionState.dismissed = true;
            setSessionState(sessionState);
        }

        function getFocusableElements() {
            return Array.from(modal.querySelectorAll(focusableSelector)).filter(function(element) {
                return !element.hasAttribute("hidden") && !element.closest("[hidden]");
            });
        }

        function trapFocus(event) {
            if (!isModalOpen || event.key !== "Tab") {
                return;
            }

            const focusableElements = getFocusableElements();

            if (!focusableElements.length) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        function getTransitionMs(element) {
            if (!element) {
                return CLOSE_FALLBACK_MS;
            }

            const styles = window.getComputedStyle(element);
            const durations = styles.transitionDuration.split(",");
            const delays = styles.transitionDelay.split(",");

            function parseTime(value) {
                const trimmedValue = value.trim();

                if (!trimmedValue) {
                    return 0;
                }

                if (trimmedValue.endsWith("ms")) {
                    return parseFloat(trimmedValue);
                }

                if (trimmedValue.endsWith("s")) {
                    return parseFloat(trimmedValue) * 1000;
                }

                return 0;
            }

            let maxMs = 0;
            const longestLength = Math.max(durations.length, delays.length);

            for (let index = 0; index < longestLength; index += 1) {
                const durationMs = parseTime(durations[index] || durations[durations.length - 1] || "0s");
                const delayMs = parseTime(delays[index] || delays[delays.length - 1] || "0s");
                maxMs = Math.max(maxMs, durationMs + delayMs);
            }

            return Math.max(maxMs, CLOSE_FALLBACK_MS);
        }

        function clearCloseFallbackTimer() {
            if (closeFallbackTimerId !== null) {
                window.clearTimeout(closeFallbackTimerId);
                closeFallbackTimerId = null;
            }
        }

        function finalizeClose(restoreFocus) {
            clearCloseFallbackTimer();

            if (isModalOpen) {
                return;
            }

            modal.hidden = true;
            modal.setAttribute("hidden", "");
            modal.scrollTop = 0;
            document.body.classList.remove(CLASS_BODY_OPEN);
            document.body.style.overflow = previousBodyOverflow;

            if (
                restoreFocus !== false &&
                lastFocusedElement &&
                document.contains(lastFocusedElement) &&
                typeof lastFocusedElement.focus === "function"
            ) {
                lastFocusedElement.focus({ preventScroll: true });
            }
        }

        function openModal() {
            if (isModalOpen || !isModalEnabled() || !canShowModalByFrequency()) {
                return;
            }

            lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            registerDisplay();

            modal.hidden = false;
            modal.removeAttribute("hidden");
            modal.setAttribute("aria-hidden", "false");
            modal.scrollTop = 0;
            document.body.classList.add(CLASS_BODY_OPEN);
            previousBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            isModalOpen = true;

            if (prefersReducedMotion()) {
                modal.classList.add(CLASS_OPEN);

                const preferredFocusTarget =
                    modalCloseButton ||
                    modalPrimaryButton ||
                    modalSecondaryButton ||
                    modalDismissButton ||
                    modalDialog;

                if (preferredFocusTarget && typeof preferredFocusTarget.focus === "function") {
                    preferredFocusTarget.focus({ preventScroll: true });
                }
                return;
            }

            window.requestAnimationFrame(function() {
                modal.classList.add(CLASS_OPEN);

                window.requestAnimationFrame(function() {
                    const preferredFocusTarget =
                        modalCloseButton ||
                        modalPrimaryButton ||
                        modalSecondaryButton ||
                        modalDismissButton ||
                        modalDialog;

                    if (preferredFocusTarget && typeof preferredFocusTarget.focus === "function") {
                        preferredFocusTarget.focus({ preventScroll: true });
                    }
                });
            });
        }

        function closeModal(options) {
            if (!isModalOpen) {
                return;
            }

            const restoreFocus = !options || options.restoreFocus !== false;

            registerDismiss();
            isModalOpen = false;
            modal.classList.remove(CLASS_OPEN);
            modal.setAttribute("aria-hidden", "true");

            if (prefersReducedMotion()) {
                finalizeClose(restoreFocus);
                return;
            }

            function handleTransitionEnd(event) {
                if (event.target !== modalDialog && event.target !== modal) {
                    return;
                }

                modal.removeEventListener("transitionend", handleTransitionEnd, true);
                finalizeClose(restoreFocus);
            }

            modal.addEventListener("transitionend", handleTransitionEnd, true);

            clearCloseFallbackTimer();
            closeFallbackTimerId = window.setTimeout(function() {
                modal.removeEventListener("transitionend", handleTransitionEnd, true);
                finalizeClose(restoreFocus);
            }, Math.max(getTransitionMs(modal), getTransitionMs(modalDialog)) + 60);
        }

        function requestOpenModal() {
            if (showTimerId !== null) {
                window.clearTimeout(showTimerId);
                showTimerId = null;
            }

            openModal();
        }

        function scheduleOpen(delayMs) {
            if (showTimerId !== null) {
                window.clearTimeout(showTimerId);
            }

            showTimerId = window.setTimeout(requestOpenModal, Math.max(0, delayMs || 0));
        }

        function setupLoadTrigger() {
            scheduleOpen(0);
        }

        function setupDelayTrigger() {
            const appearance = getAppearanceConfig();
            scheduleOpen(appearance.delayMs || 0);
        }

        function setupScrollTrigger() {
            const appearance = getAppearanceConfig();
            const targetPercent = appearance.showAfterScrollPercent || 35;

            function handleScrollTrigger() {
                if (scrollTriggerHandled) {
                    return;
                }

                if (hasReachedScrollPercent(targetPercent)) {
                    scrollTriggerHandled = true;
                    window.removeEventListener("scroll", handleScrollTrigger);
                    requestOpenModal();
                }
            }

            window.addEventListener("scroll", handleScrollTrigger, { passive: true });
            handleScrollTrigger();
        }

        function setupExitIntentTrigger() {
            function handleExitIntent(event) {
                if (exitIntentHandled || window.innerWidth < 960) {
                    return;
                }

                if (event.clientY > 0 || event.relatedTarget) {
                    return;
                }

                exitIntentHandled = true;
                document.removeEventListener("mouseout", handleExitIntent);
                requestOpenModal();
            }

            document.addEventListener("mouseout", handleExitIntent);
        }

        function setupInactivityTrigger() {
            const appearance = getAppearanceConfig();
            const inactivityMs = appearance.showOnInactivityMs || 20000;

            function clearInactivityTimer() {
                if (inactivityTimerId !== null) {
                    window.clearTimeout(inactivityTimerId);
                    inactivityTimerId = null;
                }
            }

            function restartInactivityTimer() {
                if (isModalOpen) {
                    return;
                }

                clearInactivityTimer();
                inactivityTimerId = window.setTimeout(requestOpenModal, inactivityMs);
            }

            window.addEventListener("mousemove", restartInactivityTimer, { passive: true });
            window.addEventListener("mousedown", restartInactivityTimer);
            window.addEventListener("keydown", restartInactivityTimer);
            window.addEventListener("touchstart", restartInactivityTimer, { passive: true });
            window.addEventListener("scroll", restartInactivityTimer, { passive: true });

            restartInactivityTimer();
        }

        function setupConfiguredTrigger() {
            const appearance = getAppearanceConfig();

            if (shouldShowOnEveryReload()) {
                setupDelayTrigger();
                return;
            }

            if (appearance.showOnLoad || appearance.trigger === "load") {
                setupLoadTrigger();
                return;
            }

            if (appearance.trigger === "delay") {
                setupDelayTrigger();
                return;
            }

            if (appearance.trigger === "scroll") {
                setupScrollTrigger();
                return;
            }

            if (appearance.trigger === "exit-intent" || appearance.showOnExitIntent) {
                setupExitIntentTrigger();
                return;
            }

            if (appearance.trigger === "inactivity") {
                setupInactivityTrigger();
                return;
            }

            setupDelayTrigger();
        }

        function handleModalClick(event) {
            const closeTarget = event.target.closest("[data-modal-close='true']");

            if (closeTarget) {
                closeModal();
            }
        }

        function handleKeydown(event) {
            if (!isModalOpen) {
                return;
            }

            if (event.key === "Escape") {
                closeModal();
                return;
            }

            trapFocus(event);
        }

        function handleActionClick() {
            closeModal({ restoreFocus: false });
        }

        resetStateOnVersionChange();
        ensureCloseButtonIcon();
        configureModalContent();

        modal.addEventListener("click", handleModalClick);
        document.addEventListener("keydown", handleKeydown);

        if (modalPrimaryButton) {
            modalPrimaryButton.addEventListener("click", handleActionClick);
        }

        if (modalSecondaryButton) {
            modalSecondaryButton.addEventListener("click", handleActionClick);
        }

        setupConfiguredTrigger();
        window.__modalInitialized = true;
    }

    window.initModal = initModal;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            initModal(0);
        }, { once: true });
    } else {
        initModal(0);
    }
})();
