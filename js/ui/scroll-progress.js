/* =========================================================
   SCROLL PROGRESS
   Controla la barra superior de progreso del scroll. Calcula
   el avance vertical de la página, actualiza la escala de la
   barra con requestAnimationFrame y activa un estado visual
   reforzado cuando detecta scroll rápido, cuidando fluidez y
   compatibilidad con reduced motion.
   ========================================================= */

(function() {
    "use strict";

    function initScrollProgress() {
        if (window.__scrollProgressInitialized) {
            return;
        }

        const progressBar = document.getElementById("scrollProgressBar");

        if (!progressBar) {
            return;
        }

        const scrollingElement = document.scrollingElement || document.documentElement;
        const FAST_SCROLL_CLASS = "fast-scroll";
        const FAST_SCROLL_ENTER_VELOCITY = 1.6;
        const FAST_SCROLL_EXIT_VELOCITY = 0.9;
        const FAST_SCROLL_CLASS_DURATION = 180;
        const MIN_PROGRESS_DELTA = 0.0015;

        let isTicking = false;
        let lastProgress = -1;
        let lastScrollTop = window.scrollY || scrollingElement.scrollTop || 0;
        let lastTimestamp = performance.now();
        let fastScrollTimeoutId = 0;
        let isFastScrollActive = false;

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function clearFastScrollTimeout() {
            if (fastScrollTimeoutId) {
                window.clearTimeout(fastScrollTimeoutId);
                fastScrollTimeoutId = 0;
            }
        }

        function deactivateFastScroll() {
            if (!isFastScrollActive) {
                return;
            }

            isFastScrollActive = false;
            progressBar.classList.remove(FAST_SCROLL_CLASS);
        }

        function applyFastScrollState(velocity) {
            if (prefersReducedMotion()) {
                clearFastScrollTimeout();
                deactivateFastScroll();
                return;
            }

            if (velocity >= FAST_SCROLL_ENTER_VELOCITY) {
                if (!isFastScrollActive) {
                    isFastScrollActive = true;
                    progressBar.classList.add(FAST_SCROLL_CLASS);
                }

                clearFastScrollTimeout();

                fastScrollTimeoutId = window.setTimeout(function() {
                    fastScrollTimeoutId = 0;
                    deactivateFastScroll();
                }, FAST_SCROLL_CLASS_DURATION);

                return;
            }

            if (!isFastScrollActive || velocity > FAST_SCROLL_EXIT_VELOCITY) {
                return;
            }

            clearFastScrollTimeout();
            deactivateFastScroll();
        }

        function updateScrollProgress(timestamp) {
            const scrollTop = window.scrollY || scrollingElement.scrollTop || 0;
            const scrollableHeight = Math.max(scrollingElement.scrollHeight - window.innerHeight, 0);
            const progress = scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

            if (lastProgress < 0 || Math.abs(progress - lastProgress) >= MIN_PROGRESS_DELTA) {
                progressBar.style.transform = "scaleX(" + progress + ") translateZ(0)";
                lastProgress = progress;
            }

            const deltaScroll = Math.abs(scrollTop - lastScrollTop);
            const deltaTime = Math.max(timestamp - lastTimestamp, 16);
            const velocity = deltaScroll / deltaTime;

            applyFastScrollState(velocity);

            lastScrollTop = scrollTop;
            lastTimestamp = timestamp;
            isTicking = false;
        }

        function requestProgressUpdate() {
            if (isTicking) {
                return;
            }

            isTicking = true;
            window.requestAnimationFrame(updateScrollProgress);
        }

        window.addEventListener("scroll", requestProgressUpdate, { passive: true });
        window.addEventListener("resize", requestProgressUpdate);
        window.addEventListener("orientationchange", requestProgressUpdate);
        window.addEventListener("load", requestProgressUpdate, { once: true });

        if (document.fonts && typeof document.fonts.ready === "object") {
            document.fonts.ready.then(requestProgressUpdate);
        }

        updateScrollProgress(performance.now());
        window.__scrollProgressInitialized = true;
    }

    window.initScrollProgress = initScrollProgress;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollProgress, { once: true });
    } else {
        initScrollProgress();
    }
})();
