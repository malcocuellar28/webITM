(function() {
    "use strict";

    function esObjetoPlano(pValor) {
        return pValor !== null
            && typeof pValor === "object"
            && !Array.isArray(pValor);
    }

    function esTextoValido(pValor) {
        return typeof pValor === "string" && pValor.trim() !== "";
    }

    function obtenerConfiguracionHero() {
        if (!esObjetoPlano(window.SITE_SECTIONS_CONFIG)) {
            return null;
        }

        if (!esObjetoPlano(window.SITE_SECTIONS_CONFIG.hero)) {
            return null;
        }

        return window.SITE_SECTIONS_CONFIG.hero;
    }

    function actualizarTexto(pElemento, pTexto) {
        if (!pElemento || !esTextoValido(pTexto)) {
            return;
        }

        pElemento.textContent = pTexto.trim();
    }

    function actualizarImagen(pElemento, pSrc, pAlt) {
        if (!pElemento || !esTextoValido(pSrc)) {
            return;
        }

        pElemento.src = pSrc.trim();
        pElemento.alt = typeof pAlt === "string" ? pAlt.trim() : "";

        if (pElemento.alt === "") {
            pElemento.setAttribute("aria-hidden", "true");
        } else {
            pElemento.removeAttribute("aria-hidden");
        }
    }

    function obtenerClaseBotonPorVariante(pVariante) {
        return pVariante === "glass" ? "btn btn-glass" : "btn btn-action";
    }

    function renderizarAcciones(pContenedor, pAcciones) {
        if (!pContenedor || !Array.isArray(pAcciones)) {
            return;
        }

        const accionesValidas = pAcciones.filter(function(pAccion) {
            return esObjetoPlano(pAccion)
                && pAccion.enabled !== false
                && esTextoValido(pAccion.label)
                && esTextoValido(pAccion.href);
        });

        if (accionesValidas.length === 0) {
            return;
        }

        pContenedor.innerHTML = "";

        accionesValidas.forEach(function(pAccion) {
            const enlace = document.createElement("a");
            enlace.href = pAccion.href.trim();
            enlace.className = obtenerClaseBotonPorVariante(pAccion.variant);
            enlace.textContent = pAccion.label.trim();
            pContenedor.appendChild(enlace);
        });
    }

    function renderizarHighlights(pContenedor, pHighlights) {
        if (!pContenedor || !Array.isArray(pHighlights)) {
            return;
        }

        const highlightsValidos = pHighlights.filter(function(pHighlight) {
            return esTextoValido(pHighlight);
        });

        if (highlightsValidos.length === 0) {
            return;
        }

        pContenedor.innerHTML = "";

        highlightsValidos.forEach(function(pHighlight) {
            const item = document.createElement("li");
            item.className = "hero-section__highlight";
            item.textContent = pHighlight.trim();
            pContenedor.appendChild(item);
        });
    }

    function aplicarModoFondoHero(pHeroSection, pBackground) {
        if (!pHeroSection) {
            return;
        }

        const imagenFondo = pHeroSection.querySelector("#heroBackgroundImage");

        if (!imagenFondo) {
            pHeroSection.classList.remove("hero-section--image");
            pHeroSection.classList.add("hero-section--color");
            return;
        }

        const usarImagen = esObjetoPlano(pBackground)
            && pBackground.useImage === true
            && esTextoValido(pBackground.imageSrc);

        pHeroSection.classList.toggle("hero-section--image", usarImagen);
        pHeroSection.classList.toggle("hero-section--color", !usarImagen);

        if (!usarImagen) {
            imagenFondo.removeAttribute("src");
            imagenFondo.hidden = true;
            return;
        }

        imagenFondo.src = pBackground.imageSrc.trim();
        imagenFondo.alt = "";
        imagenFondo.hidden = false;
        imagenFondo.setAttribute("aria-hidden", "true");
    }

    function aplicarContenidoHero(pHeroSection, pConfiguracionHero) {
        const kicker = pHeroSection.querySelector("#heroKicker");
        const title = pHeroSection.querySelector("#heroTitleIntro");
        const tagline = pHeroSection.querySelector("#heroLema");
        const subtitle = pHeroSection.querySelector("#heroSubtitle");
        const actions = pHeroSection.querySelector("#heroActions");
        const highlights = pHeroSection.querySelector("#heroHighlights");
        const studentImage = pHeroSection.querySelector("#heroStudentFigureImage");
        const supportImage = pHeroSection.querySelector("#heroSupportCardImage");
        const supportLabel = pHeroSection.querySelector("#heroSupportCardLabel");
        const supportTitle = pHeroSection.querySelector("#heroSupportCardTitle");
        const supportText = pHeroSection.querySelector("#heroSupportCardText");

        if (esObjetoPlano(pConfiguracionHero.intro)) {
            actualizarTexto(kicker, pConfiguracionHero.intro.kicker);
            actualizarTexto(title, pConfiguracionHero.intro.title);
            actualizarTexto(tagline, pConfiguracionHero.intro.tagline);
            actualizarTexto(subtitle, pConfiguracionHero.intro.subtitle);
        }

        if (esObjetoPlano(pConfiguracionHero.studentAmbient)) {
            actualizarImagen(
                studentImage,
                pConfiguracionHero.studentAmbient.imageSrc,
                pConfiguracionHero.studentAmbient.imageAlt
            );
        }

        renderizarAcciones(actions, pConfiguracionHero.actions);
        renderizarHighlights(highlights, pConfiguracionHero.highlights);

        if (esObjetoPlano(pConfiguracionHero.supportCard)) {
            actualizarImagen(
                supportImage,
                pConfiguracionHero.supportCard.imageSrc,
                pConfiguracionHero.supportCard.imageAlt
            );
            actualizarTexto(supportLabel, pConfiguracionHero.supportCard.label);
            actualizarTexto(supportTitle, pConfiguracionHero.supportCard.title);
            actualizarTexto(supportText, pConfiguracionHero.supportCard.text);
        }

        aplicarModoFondoHero(pHeroSection, pConfiguracionHero.background);
    }

    function obtenerSlidesValidos(pSlides) {
        if (!Array.isArray(pSlides)) {
            return [];
        }

        return pSlides.filter(function(pSlide) {
            return esObjetoPlano(pSlide)
                && esTextoValido(pSlide.imageSrc)
                && esTextoValido(pSlide.imageAlt)
                && esTextoValido(pSlide.note);
        });
    }

    function initHero() {
        const heroSection = document.querySelector(".hero-section");

        if (!heroSection) {
            return;
        }

        const configuracionHero = obtenerConfiguracionHero();

        if (!configuracionHero || configuracionHero.enabled === false) {
            return;
        }

        aplicarContenidoHero(heroSection, configuracionHero);

        const contenedorSlides = heroSection.querySelector("#heroSlides");
        const contenedorDots = heroSection.querySelector("#heroMainDots");
        const panelNota = heroSection.querySelector("#heroSlideNote");

        if (!contenedorSlides || !contenedorDots || !panelNota) {
            return;
        }

        const slidesData = obtenerSlidesValidos(configuracionHero.slides);

        if (slidesData.length === 0) {
            return;
        }

        if (heroSection.dataset.heroSlidesInitialized === "true") {
            aplicarModoFondoHero(heroSection, configuracionHero.background);
            return;
        }

        heroSection.dataset.heroSlidesInitialized = "true";

        const intervaloAutoplay = esObjetoPlano(configuracionHero.autoplay)
            && Number.isFinite(Number(configuracionHero.autoplay.intervalMs))
            && Number(configuracionHero.autoplay.intervalMs) > 0
            ? Number(configuracionHero.autoplay.intervalMs)
            : 5200;

        const autoplayHabilitado = !(
            esObjetoPlano(configuracionHero.autoplay)
            && configuracionHero.autoplay.enabled === false
        );

        let viIndiceActivo = 0;
        let viTemporizador = null;
        let viSlides = [];
        let viDots = [];
        const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        function crearSlide(pSlide, pIndice) {
            const figure = document.createElement("figure");
            figure.className = "hero-section__slide";
            figure.dataset.slideIndex = String(pIndice);
            figure.setAttribute("aria-hidden", "true");

            const imagen = document.createElement("img");
            imagen.className = "hero-section__slide-image";
            imagen.src = pSlide.imageSrc.trim();
            imagen.alt = pSlide.imageAlt.trim();
            imagen.loading = pIndice === 0 ? "eager" : "lazy";
            imagen.decoding = "async";

            const figcaption = document.createElement("figcaption");
            figcaption.className = "hero-section__slide-note-source";
            figcaption.dataset.heroNote = "true";
            figcaption.textContent = pSlide.note.trim();

            figure.appendChild(imagen);
            figure.appendChild(figcaption);

            return figure;
        }

        function crearDot(pSlide, pIndice) {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "hero-section__dot";
            boton.dataset.slideIndex = String(pIndice);
            boton.setAttribute(
                "aria-label",
                "Mostrar imagen " + (pIndice + 1) + ": " + pSlide.imageAlt.trim()
            );
            boton.setAttribute("aria-pressed", "false");

            boton.addEventListener("click", function() {
                mostrarSlide(pIndice);
                reiniciarAutoplay();
            });

            return boton;
        }

        function renderizarSlides() {
            contenedorSlides.innerHTML = "";
            contenedorDots.innerHTML = "";

            viSlides = slidesData.map(function(pSlide, pIndice) {
                const slide = crearSlide(pSlide, pIndice);
                contenedorSlides.appendChild(slide);
                return slide;
            });

            viDots = slidesData.map(function(pSlide, pIndice) {
                const dot = crearDot(pSlide, pIndice);
                contenedorDots.appendChild(dot);
                return dot;
            });
        }

        function actualizarPanelNota(pIndice) {
            const slideActual = slidesData[pIndice];

            if (!slideActual) {
                return;
            }

            panelNota.textContent = slideActual.note.trim();
            panelNota.dataset.slideIndex = String(pIndice);
            panelNota.setAttribute(
                "aria-label",
                "Mensaje destacado de la imagen " + (pIndice + 1)
            );
        }

        function actualizarEstados(pIndice) {
            viSlides.forEach(function(pSlide, pPosicion) {
                const esActivo = pPosicion === pIndice;
                pSlide.classList.toggle("is-active", esActivo);
                pSlide.setAttribute("aria-hidden", esActivo ? "false" : "true");
            });

            viDots.forEach(function(pDot, pPosicion) {
                const esActivo = pPosicion === pIndice;
                pDot.classList.toggle("is-active", esActivo);
                pDot.setAttribute("aria-pressed", esActivo ? "true" : "false");
            });
        }

        function mostrarSlide(pIndice) {
            if (viSlides.length === 0) {
                return;
            }

            const totalSlides = viSlides.length;
            viIndiceActivo = ((pIndice % totalSlides) + totalSlides) % totalSlides;

            actualizarEstados(viIndiceActivo);
            actualizarPanelNota(viIndiceActivo);
        }

        function avanzarSlide() {
            mostrarSlide(viIndiceActivo + 1);
        }

        function detenerAutoplay() {
            if (viTemporizador !== null) {
                window.clearInterval(viTemporizador);
                viTemporizador = null;
            }
        }

        function iniciarAutoplay() {
            if (!autoplayHabilitado) {
                return;
            }

            if (reduceMotionQuery.matches || viSlides.length <= 1) {
                return;
            }

            detenerAutoplay();
            viTemporizador = window.setInterval(avanzarSlide, intervaloAutoplay);
        }

        function reiniciarAutoplay() {
            detenerAutoplay();
            iniciarAutoplay();
        }

        function configurarInteracciones() {
            const bloqueHero = contenedorSlides.closest(".hero-section__visual-stack");

            if (!bloqueHero) {
                return;
            }

            bloqueHero.addEventListener("mouseenter", detenerAutoplay);
            bloqueHero.addEventListener("mouseleave", iniciarAutoplay);
            bloqueHero.addEventListener("focusin", detenerAutoplay);
            bloqueHero.addEventListener("focusout", iniciarAutoplay);
        }

        renderizarSlides();
        configurarInteracciones();
        mostrarSlide(0);
        iniciarAutoplay();

        window.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                detenerAutoplay();
                return;
            }

            iniciarAutoplay();
        });
    }

    window.initHero = initHero;

})();
