(function() {
    "use strict";

    function initThemeFeedback() {
        if (window.__themeFeedbackInitialized) {
            return;
        }

        function handleThemeChanged(event) {
            const theme =
                event &&
                event.detail &&
                event.detail.theme
                    ? event.detail.theme
                    : "light";

            if (typeof window.showSiteToast === "function") {
                window.showSiteToast({
                    tipo: "success",
                    titulo: "Tema actualizado",
                    mensaje: theme === "dark"
                        ? "Tema oscuro activado correctamente."
                        : "Tema claro activado correctamente."
                });
            }
        }

        document.addEventListener("theme:changed", handleThemeChanged);
        window.__themeFeedbackInitialized = true;
    }

    window.initThemeFeedback = initThemeFeedback;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initThemeFeedback, { once: true });
    } else {
        initThemeFeedback();
    }
})();
