/* =========================================================
   THEME
   Controla el tema activo del sitio. Lee el estado guardado,
   sincroniza el botón del toggle, persiste la preferencia en
   localStorage y emite un evento cuando el tema cambia.
   ========================================================= */

(function() {
    "use strict";

    function initTheme() {
        if (window.__themeInitialized) {
            return;
        }

        const STORAGE_KEY = "theme";
        const ATTRIBUTE_NAME = "data-theme";
        const DEFAULT_THEME = "light";
        const VALID_THEMES = ["light", "dark"];
        const themeToggleButton = document.getElementById("themeToggle");

        function isValidTheme(theme) {
            return VALID_THEMES.includes(theme);
        }

        function getStoredTheme() {
            try {
                const storedTheme = localStorage.getItem(STORAGE_KEY);
                return isValidTheme(storedTheme) ? storedTheme : null;
            } catch (error) {
                return null;
            }
        }

        function getDocumentTheme() {
            const documentTheme = document.documentElement.getAttribute(ATTRIBUTE_NAME);
            return isValidTheme(documentTheme) ? documentTheme : null;
        }

        function getActiveTheme() {
            return getDocumentTheme() || getStoredTheme() || DEFAULT_THEME;
        }

        function syncThemeToggle(theme) {
            if (!themeToggleButton) {
                return;
            }

            const isDarkTheme = theme === "dark";
            const nextThemeLabel = isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

            themeToggleButton.setAttribute("aria-label", nextThemeLabel);
            themeToggleButton.setAttribute("title", nextThemeLabel);
            themeToggleButton.setAttribute("aria-pressed", String(isDarkTheme));
        }

        function applyTheme(theme) {
            const nextTheme = isValidTheme(theme) ? theme : DEFAULT_THEME;

            document.documentElement.setAttribute(ATTRIBUTE_NAME, nextTheme);
            syncThemeToggle(nextTheme);

            try {
                localStorage.setItem(STORAGE_KEY, nextTheme);
            } catch (error) {
                /* No hacer nada si localStorage no está disponible */
            }

            document.dispatchEvent(
                new CustomEvent("theme:changed", {
                    detail: {
                        theme: nextTheme
                    }
                })
            );
        }

        function toggleTheme() {
            const currentTheme = getActiveTheme();
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
        }

        if (themeToggleButton) {
            themeToggleButton.addEventListener("click", toggleTheme);
        }

        applyTheme(getActiveTheme());

        window.getActiveTheme = getActiveTheme;
        window.applyTheme = applyTheme;
        window.toggleTheme = toggleTheme;
        window.__themeInitialized = true;
    }

    window.initTheme = initTheme;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTheme, { once: true });
    } else {
        initTheme();
    }
})();
