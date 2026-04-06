(function() {
    "use strict";

    function initNewsCenter() {
        if (window.__newsCenterInitialized) {
            return;
        }

        const page = document.querySelector(".news-center-page");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.newsCenter
                ? window.SITE_SECTIONS_CONFIG.newsCenter
                : null;

        if (!page || !config || config.enabled === false) {
            return;
        }

        const parameters = config.parameters || {};
        const pageParamName = parameters.pageParam || "page";
        const newsParamName = parameters.newsParam || "news";

        const intro = config.intro || {};
        const viewer = config.viewer || {};
        const editorial = config.editorial || {};
        const pagination = config.pagination || {};
        const pageList = config.pageList || {};
        const pages = Array.isArray(config.pages) ? config.pages : [];

        const backLink = document.getElementById("newsCenterBackLink");
        const backLabel = document.getElementById("newsCenterBackLabel");
        const logo = document.getElementById("newsCenterLogo");
        const kicker = document.getElementById("newsCenterKicker");
        const title = document.getElementById("newsCenterTitle");
        const description = document.getElementById("newsCenterDescription");
        const editionLabel = document.getElementById("newsCenterEditionLabel");
        const editionValue = document.getElementById("newsCenterEdition");
        const visibleCountLabel = document.getElementById("newsCenterVisibleCountLabel");
        const visibleCountValue = document.getElementById("newsCenterVisibleCount");
        const updatedTextLabel = document.getElementById("newsCenterUpdatedTextLabel");
        const updatedValue = document.getElementById("newsCenterUpdatedLabel");

        const viewerBadge = document.getElementById("newsViewerBadge");
        const viewerCategory = document.getElementById("newsViewerCategory");
        const viewerDate = document.getElementById("newsViewerDate");
        const viewerTitle = document.getElementById("newsViewerTitle");
        const viewerExcerpt = document.getElementById("newsViewerExcerpt");
        const viewerBody = document.getElementById("newsViewerBody");
        const viewerImage = document.getElementById("newsViewerImage");
        const viewerShare = document.getElementById("newsViewerShare");
        const viewerGallery = document.getElementById("newsViewerGallery");

        const editorialKicker = document.getElementById("newsCenterEditorialKicker");
        const editorialTitle = document.getElementById("newsCenterEditorialTitle");
        const editorialText = document.getElementById("newsCenterEditorialText");

        const paginationKicker = document.getElementById("newsCenterPaginationKicker");
        const paginationTitle = document.getElementById("newsCenterPaginationTitle");
        const prevPage = document.getElementById("newsCenterPrevPage");
        const nextPage = document.getElementById("newsCenterNextPage");
        const pagesContainer = document.getElementById("newsCenterPages");

        const pageListKicker = document.getElementById("newsPageListKicker");
        const pageListTitle = document.getElementById("newsPageListTitle");
        const pageListDescription = document.getElementById("newsPageListDescription");
        const pageListGrid = document.getElementById("newsPageListGrid");

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        if (!pages.length) {
            return;
        }

        function escapeHtml(text) {
            return String(text || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function setText(element, value) {
            if (element) {
                element.textContent = value || "";
            }
        }

        function buildNewsUrl(pageNumber, newsId) {
            const url = new URL(window.location.href);
            url.searchParams.set(pageParamName, String(pageNumber));
            url.searchParams.set(newsParamName, String(newsId));
            return url.pathname.split("/").pop() + url.search;
        }

        function getPageNumberFromUrl() {
            const searchParams = new URLSearchParams(window.location.search);
            const pageNumber = Number(searchParams.get(pageParamName));

            if (Number.isNaN(pageNumber) || pageNumber < 1) {
                return pages[0].pageNumber;
            }

            return pageNumber;
        }

        function getNewsIdFromUrl() {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(newsParamName) || "";
        }

        function getPageByNumber(pageNumber) {
            const matchedPage = pages.find(function(pageItem) {
                return pageItem && pageItem.pageNumber === pageNumber;
            });

            return matchedPage || pages[0];
        }

        function getPageItems(activePage) {
            return Array.isArray(activePage.items) ? activePage.items : [];
        }

        function getActiveNews(activePage, newsId) {
            const pageItems = getPageItems(activePage);

            if (!pageItems.length) {
                return null;
            }

            if (newsId) {
                const matchedNews = pageItems.find(function(newsItem) {
                    return newsItem && newsItem.id === newsId;
                });

                if (matchedNews) {
                    return matchedNews;
                }
            }

            return pageItems[0];
        }

        function renderIntro(activePage, activeNews) {
            if (backLink) {
                backLink.href = intro.backHref || "index.html#news";
            }

            setText(backLabel, intro.backLabel || "Volver al inicio");

            if (logo) {
                logo.src = intro.logoSrc || "img/icons/section/news-center.svg";
                logo.alt = intro.logoAlt || "Centro de noticias";
            }

            setText(kicker, intro.kicker || "");
            setText(title, intro.title || "");
            setText(description, intro.description || "");

            setText(editionLabel, intro.meta && intro.meta.editionLabel ? intro.meta.editionLabel : "Edición activa");
            setText(editionValue, activePage.label || ("Página " + String(activePage.pageNumber)));

            setText(
                visibleCountLabel,
                intro.meta && intro.meta.visibleCountLabel ? intro.meta.visibleCountLabel : "Publicaciones visibles"
            );
            setText(visibleCountValue, String(getPageItems(activePage).length).padStart(2, "0") + " noticias");

            setText(updatedTextLabel, intro.meta && intro.meta.updatedLabel ? intro.meta.updatedLabel : "Actualizado");
            setText(updatedValue, activePage.updatedAt || (activeNews ? activeNews.date : ""));
        }

        function renderShareButtons(activePage, activeNews) {
            if (!viewerShare) {
                return;
            }

            const shareConfig = viewer.share || {};
            const shareText = [
                activeNews.title || "",
                "-",
                "Centro de Noticias | Instituto Técnico Morazán"
            ].join(" ").trim();

            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set(pageParamName, String(activePage.pageNumber));
            currentUrl.searchParams.set(newsParamName, String(activeNews.id));
            const shareUrl = currentUrl.toString();

            const buttons = [];

            if (shareConfig.facebook && shareConfig.facebook.enabled !== false) {
                buttons.push(
                    '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl) + '" class="btn btn-glass" target="_blank" rel="noopener">' +
                        escapeHtml(shareConfig.facebook.label || "Facebook") +
                    "</a>"
                );
            }

            if (shareConfig.x && shareConfig.x.enabled !== false) {
                buttons.push(
                    '<a href="https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl) + "&text=" + encodeURIComponent(shareText) + '" class="btn btn-glass" target="_blank" rel="noopener">' +
                        escapeHtml(shareConfig.x.label || "X") +
                    "</a>"
                );
            }

            if (shareConfig.whatsapp && shareConfig.whatsapp.enabled !== false) {
                buttons.push(
                    '<a href="https://wa.me/?text=' + encodeURIComponent(shareText + " " + shareUrl) + '" class="btn btn-glass" target="_blank" rel="noopener">' +
                        escapeHtml(shareConfig.whatsapp.label || "WhatsApp") +
                    "</a>"
                );
            }

            viewerShare.innerHTML = buttons.join("");
        }

        function renderGallery(activeNews) {
            if (!viewerGallery) {
                return;
            }

            const galleryItems = Array.isArray(activeNews.gallery)
                ? activeNews.gallery.filter(function(item) {
                    return item && item.enabled !== false && item.src;
                })
                : [];

            if (!galleryItems.length) {
                viewerGallery.hidden = true;
                viewerGallery.innerHTML = "";
                return;
            }

            viewerGallery.hidden = false;
            viewerGallery.innerHTML = galleryItems.map(function(item) {
                return [
                    '<article class="news-viewer-gallery__item">',
                    '<img src="', escapeHtml(item.src), '" alt="', escapeHtml(item.alt || ""), '" class="news-viewer-gallery__image" loading="lazy">',
                    "</article>"
                ].join("");
            }).join("");
        }

        function renderViewer(activePage, activeNews) {
            setText(viewerBadge, activeNews.badgeLabel || viewer.primaryBadgeLabel || "");
            setText(viewerCategory, activeNews.category || "");
            setText(viewerDate, activeNews.date || "");
            setText(viewerTitle, activeNews.title || "");
            setText(viewerExcerpt, activeNews.excerpt || "");

            if (viewerBody) {
                const paragraphs = Array.isArray(activeNews.body) ? activeNews.body : [];
                viewerBody.innerHTML = paragraphs.map(function(paragraph) {
                    return "<p>" + escapeHtml(paragraph) + "</p>";
                }).join("");
            }

            if (viewerImage) {
                viewerImage.src = activeNews.image && activeNews.image.src ? activeNews.image.src : "";
                viewerImage.alt = activeNews.image && activeNews.image.alt ? activeNews.image.alt : "";
            }

            renderShareButtons(activePage, activeNews);
            renderGallery(activeNews);
        }

        function renderEditorial() {
            setText(editorialKicker, editorial.kicker || "");
            setText(editorialTitle, editorial.title || "");
            setText(editorialText, editorial.text || "");

            setText(paginationKicker, pagination.kicker || "");
            setText(paginationTitle, pagination.title || "");

            setText(pageListKicker, pageList.kicker || "");
            setText(pageListTitle, pageList.title || "");
            setText(pageListDescription, pageList.description || "");
        }

        function renderPagination(activePage) {
            if (pagesContainer) {
                pagesContainer.innerHTML = pages.map(function(pageItem) {
                    const isCurrent = pageItem.pageNumber === activePage.pageNumber;
                    const firstNewsItem = getPageItems(pageItem)[0];
                    const href = firstNewsItem
                        ? buildNewsUrl(pageItem.pageNumber, firstNewsItem.id)
                        : "#";

                    if (isCurrent) {
                        return '<span class="news-pagination-card__page is-active" aria-current="page">' +
                            String(pageItem.pageNumber).padStart(2, "0") +
                        "</span>";
                    }

                    return '<a href="' + href + '" class="news-pagination-card__page" data-page-number="' + String(pageItem.pageNumber) + '">' +
                        String(pageItem.pageNumber).padStart(2, "0") +
                    "</a>";
                }).join("");
            }

            const currentPageIndex = pages.findIndex(function(pageItem) {
                return pageItem.pageNumber === activePage.pageNumber;
            });

            const previousPage = currentPageIndex > 0 ? pages[currentPageIndex - 1] : null;
            const nextPageConfig = currentPageIndex < pages.length - 1 ? pages[currentPageIndex + 1] : null;

            if (prevPage) {
                prevPage.textContent = pagination.prevLabel || "Anterior";

                if (previousPage && getPageItems(previousPage)[0]) {
                    prevPage.classList.remove("is-disabled");
                    prevPage.removeAttribute("aria-disabled");
                    prevPage.href = buildNewsUrl(previousPage.pageNumber, getPageItems(previousPage)[0].id);
                } else {
                    prevPage.classList.add("is-disabled");
                    prevPage.setAttribute("aria-disabled", "true");
                    prevPage.href = "#";
                }
            }

            if (nextPage) {
                nextPage.textContent = pagination.nextLabel || "Siguiente";

                if (nextPageConfig && getPageItems(nextPageConfig)[0]) {
                    nextPage.classList.remove("is-disabled");
                    nextPage.removeAttribute("aria-disabled");
                    nextPage.href = buildNewsUrl(nextPageConfig.pageNumber, getPageItems(nextPageConfig)[0].id);
                } else {
                    nextPage.classList.add("is-disabled");
                    nextPage.setAttribute("aria-disabled", "true");
                    nextPage.href = "#";
                }
            }
        }

        function renderPageList(activePage, activeNews) {
            if (!pageListGrid) {
                return;
            }

            const pageItems = getPageItems(activePage);

            pageListGrid.innerHTML = pageItems.map(function(newsItem) {
                const isActive = newsItem.id === activeNews.id;
                const href = buildNewsUrl(activePage.pageNumber, newsItem.id);

                return [
                    '<article class="news-page-card', isActive ? ' is-active' : '', '" data-news-id="', escapeHtml(newsItem.id), '">',
                    '<div class="news-page-card__media">',
                    '<img src="', escapeHtml(newsItem.image && newsItem.image.src ? newsItem.image.src : ""), '" alt="', escapeHtml(newsItem.image && newsItem.image.alt ? newsItem.image.alt : ""), '" class="news-page-card__image" loading="lazy">',
                    "</div>",
                    '<div class="news-page-card__content">',
                    '<div class="news-page-card__meta">',
                    '<span class="news-page-card__category">', escapeHtml(newsItem.category || ""), "</span>",
                    '<span class="news-page-card__date">', escapeHtml(newsItem.date || ""), "</span>",
                    "</div>",
                    '<h3 class="news-page-card__title">', escapeHtml(newsItem.title || ""), "</h3>",
                    '<p class="news-page-card__excerpt">', escapeHtml(newsItem.excerpt || ""), "</p>",
                    '<a href="', href, '" class="news-page-card__link" data-news-link="true" data-news-id="', escapeHtml(newsItem.id), '">',
                    escapeHtml(pageList.cardLinkLabel || "Leer en el visor"),
                    "</a>",
                    "</div>",
                    "</article>"
                ].join("");
            }).join("");
        }

        function applyState(pageNumber, newsId, replaceHistory, scrollToViewer) {
            const activePage = getPageByNumber(pageNumber);
            const activeNews = getActiveNews(activePage, newsId);

            if (!activeNews) {
                return;
            }

            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.set(pageParamName, String(activePage.pageNumber));
            nextUrl.searchParams.set(newsParamName, String(activeNews.id));

            if (replaceHistory) {
                window.history.replaceState(
                    { page: activePage.pageNumber, news: activeNews.id },
                    "",
                    nextUrl.toString()
                );
            } else {
                window.history.pushState(
                    { page: activePage.pageNumber, news: activeNews.id },
                    "",
                    nextUrl.toString()
                );
            }

            renderIntro(activePage, activeNews);
            renderViewer(activePage, activeNews);
            renderEditorial();
            renderPagination(activePage);
            renderPageList(activePage, activeNews);

            if (scrollToViewer) {
                const viewerCard = document.getElementById("newsViewerCard");

                if (viewerCard) {
                    viewerCard.scrollIntoView({
                        behavior: prefersReducedMotion() ? "auto" : "smooth",
                        block: "start"
                    });
                }
            }
        }

        function handleDelegatedClick(event) {
            const newsLink = event.target.closest("[data-news-link='true']");
            const pageLink = event.target.closest("[data-page-number]");
            const prevLink = event.target.closest("#newsCenterPrevPage:not(.is-disabled)");
            const nextLink = event.target.closest("#newsCenterNextPage:not(.is-disabled)");

            if (newsLink) {
                event.preventDefault();
                applyState(getPageNumberFromUrl(), newsLink.getAttribute("data-news-id") || "", false, true);
                return;
            }

            if (pageLink) {
                event.preventDefault();

                const targetPage = getPageByNumber(Number(pageLink.getAttribute("data-page-number")));
                const firstNewsItem = getPageItems(targetPage)[0];

                if (firstNewsItem) {
                    applyState(targetPage.pageNumber, firstNewsItem.id, false, true);
                }
                return;
            }

            if (prevLink) {
                event.preventDefault();

                const currentPage = getPageByNumber(getPageNumberFromUrl());
                const currentIndex = pages.findIndex(function(item) {
                    return item.pageNumber === currentPage.pageNumber;
                });

                if (currentIndex > 0) {
                    const targetPage = pages[currentIndex - 1];
                    const firstNewsItem = getPageItems(targetPage)[0];

                    if (firstNewsItem) {
                        applyState(targetPage.pageNumber, firstNewsItem.id, false, true);
                    }
                }
                return;
            }

            if (nextLink) {
                event.preventDefault();

                const currentPage = getPageByNumber(getPageNumberFromUrl());
                const currentIndex = pages.findIndex(function(item) {
                    return item.pageNumber === currentPage.pageNumber;
                });

                if (currentIndex < pages.length - 1) {
                    const targetPage = pages[currentIndex + 1];
                    const firstNewsItem = getPageItems(targetPage)[0];

                    if (firstNewsItem) {
                        applyState(targetPage.pageNumber, firstNewsItem.id, false, true);
                    }
                }
            }
        }

        function handlePopState() {
            applyState(getPageNumberFromUrl(), getNewsIdFromUrl(), true, false);
        }

        page.addEventListener("click", handleDelegatedClick);
        window.addEventListener("popstate", handlePopState);

        applyState(getPageNumberFromUrl(), getNewsIdFromUrl(), true, false);

        window.__newsCenterInitialized = true;
    }

    window.initNewsCenter = initNewsCenter;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNewsCenter, { once: true });
    } else {
        initNewsCenter();
    }
})();
