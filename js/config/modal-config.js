window.SITE_MODAL_CONFIG = {
    /* =====================================================
       CONTROL GENERAL
       ===================================================== */
    enabled: true,
    version: "1.0.0",
    resetOnVersionChange: true,

    /* =====================================================
       CONTENIDO
       ===================================================== */
    content: {
        eyebrow: "Instituto Técnico Morazán",
        title: "Admisiones 2026",
        description: "Conoce nuestros programas académicos, requisitos de ingreso y fechas importantes para el próximo período.",
        image: {
            enabled: true,
            src: "img/modal/modal-default.jpg",
            alt: "Promoción de admisiones 2026 del Instituto Técnico Morazán"
        },
        primaryButton: {
            enabled: true,
            label: "Solicitar información",
            href: "#contact"
        },
        secondaryButton: {
            enabled: true,
            label: "Ver programas",
            href: "#education-levels"
        },
        closeText: "Cerrar"
    },

    /* =====================================================
       APARICIÓN
       trigger:
       - "load"
       - "delay"
       - "scroll"
       - "exit-intent"
       - "inactivity"
       ===================================================== */
    appearance: {
        trigger: "delay",
        delayMs: 2500,
        showOnLoad: false,
        showAfterScrollPercent: 35,
        showOnExitIntent: false,
        showOnInactivityMs: 20000
    },

    /* =====================================================
       FRECUENCIA
       ===================================================== */
    frequency: {
        showEveryMs: 0,
        showOncePerSession: true,
        showOncePerDays: 0,
        maxDisplaysPerSession: 1,
        maxDisplaysLifetime: 0,
        cooldownMs: 0
    },

    /* =====================================================
       PERSISTENCIA
       storageMode:
       - "sessionStorage"
       - "localStorage"
       ===================================================== */
    persistence: {
        storageKey: "siteModalState",
        storageMode: "localStorage"
    },

    /* =====================================================
       PRUEBAS / DESARROLLO
       ===================================================== */
    debug: {
        debugMode: true,
        forceEnabled: true,
        showOnEveryReload: true,
        ignoreFrequencyRules: true,
        ignorePersistence: true
    }
};
