/* =========================================================
   CONTACT
   Renderiza la sección de contacto: aplica contenido desde
   configuración, resuelve estado de atención, redes, acciones
   de compartir, formulario y mapa institucional.
   ========================================================= */

(function() {
    "use strict";

    function initContact() {
        if (window.__contactInitialized) {
            return;
        }

        const section = document.getElementById("contact");
        const config =
            window.SITE_SECTIONS_CONFIG &&
            window.SITE_SECTIONS_CONFIG.contact
                ? window.SITE_SECTIONS_CONFIG.contact
                : null;

        if (!section || !config) {
            return;
        }

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        const logo = document.getElementById("contactLogo");
        const kicker = document.getElementById("contactKicker");
        const title = document.getElementById("contactTitle");
        const description = document.getElementById("contactDescription");

        const contactInfoTitle = document.getElementById("contactInfoTitle");
        const contactInfoDescription = document.getElementById("contactInfoDescription");
        const contactStatus = document.getElementById("contactStatus");
        const contactStatusText = document.getElementById("contactStatusText");
        const contactAddressLabel = document.getElementById("contactAddressLabel");
        const contactScheduleLabel = document.getElementById("contactScheduleLabel");
        const contactPhonesLabel = document.getElementById("contactPhonesLabel");
        const contactEmailLabel = document.getElementById("contactEmailLabel");
        const contactFollowLabel = document.getElementById("contactFollowLabel");
        const contactShareLabel = document.getElementById("contactShareLabel");
        const contactAddress = document.getElementById("contactAddress");
        const contactSchedule = document.getElementById("contactSchedule");
        const contactPhones = document.getElementById("contactPhones");
        const contactEmail = document.getElementById("contactEmail");
        const contactFacebookLink = document.getElementById("contactFacebookLink");
        const contactInstagramLink = document.getElementById("contactInstagramLink");
        const shareFacebook = document.getElementById("shareFacebook");
        const shareInstagram = document.getElementById("shareInstagram");
        const shareX = document.getElementById("shareX");
        const shareWhatsapp = document.getElementById("shareWhatsapp");

        const contactFormTitle = document.getElementById("contactFormTitle");
        const contactFormDescription = document.getElementById("contactFormDescription");
        const contactForm = document.getElementById("contactForm");
        const contactNameLabel = document.getElementById("contactNameLabel");
        const contactPhoneLabel = document.getElementById("contactPhoneLabel");
        const contactEmailInputLabel = document.getElementById("contactEmailInputLabel");
        const contactMessageLabel = document.getElementById("contactMessageLabel");
        const contactName = document.getElementById("contactName");
        const contactPhone = document.getElementById("contactPhone");
        const contactEmailInput = document.getElementById("contactEmailInput");
        const contactMessage = document.getElementById("contactMessage");
        const contactNameError = document.getElementById("contactNameError");
        const contactPhoneError = document.getElementById("contactPhoneError");
        const contactEmailInputError = document.getElementById("contactEmailInputError");
        const contactMessageError = document.getElementById("contactMessageError");
        const contactSubmitButton = document.getElementById("contactSubmitButton");

        const contactMapTitle = document.getElementById("contactMapTitle");
        const contactMapDescription = document.getElementById("contactMapDescription");
        const contactMapFrame = document.getElementById("contactMapFrame");
        const contactMapButton = document.getElementById("contactMapButton");

        if (config.enabled === false) {
            section.hidden = true;
            return;
        }

        function showToast(pTitle, pMessage, pType) {
            if (typeof window.showSiteToast === "function") {
                window.showSiteToast({
                    tipo: pType,
                    titulo: pTitle,
                    mensaje: pMessage
                });
            }
        }

        function setLabelWithIcon(labelElement, labelText) {
            if (!labelElement) {
                return;
            }

            const iconElement = labelElement.querySelector(".contact-form__label-icon");

            if (iconElement) {
                labelElement.innerHTML = iconElement.outerHTML + String(labelText || "");
            } else {
                labelElement.textContent = String(labelText || "");
            }
        }

        function getPageUrl() {
            const shareConfig = config.infoCard && config.infoCard.share ? config.infoCard.share : null;

            if (shareConfig && typeof shareConfig.url === "string" && shareConfig.url.trim()) {
                return shareConfig.url;
            }

            return window.location.href;
        }

        function getShareText() {
            const shareConfig = config.infoCard && config.infoCard.share ? config.infoCard.share : null;

            if (shareConfig && typeof shareConfig.text === "string" && shareConfig.text.trim()) {
                return shareConfig.text;
            }

            return document.title || "Instituto Técnico Morazán";
        }

        function buildFacebookShareUrl() {
            return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(getPageUrl());
        }

        function buildXShareUrl() {
            return "https://twitter.com/intent/tweet?url=" + encodeURIComponent(getPageUrl()) + "&text=" + encodeURIComponent(getShareText());
        }

        function buildWhatsappShareUrl() {
            return "https://wa.me/?text=" + encodeURIComponent(getShareText() + " " + getPageUrl());
        }

        function copyTextToClipboard(textValue) {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                return navigator.clipboard.writeText(textValue);
            }

            return Promise.reject(new Error("Clipboard no disponible"));
        }

        if (logo) {
            if (typeof config.logoSrc === "string" && config.logoSrc.trim()) {
                logo.src = config.logoSrc;
            }

            if (typeof config.logoAlt === "string") {
                logo.alt = config.logoAlt;
            }
        }

        if (kicker && typeof config.kicker === "string") {
            kicker.textContent = config.kicker;
        }

        if (title && typeof config.title === "string") {
            title.textContent = config.title;
        }

        if (description && typeof config.description === "string") {
            description.textContent = config.description;
        }

        const infoCard = config.infoCard || {};
        const formCard = config.formCard || {};
        const mapCard = config.mapCard || {};
        const labels = infoCard.labels || {};
        const shareConfig = infoCard.share || {};
        const formFields = formCard.fields || {};
        const formToast = formCard.toast || {};

        if (contactInfoTitle && typeof infoCard.title === "string") {
            contactInfoTitle.textContent = infoCard.title;
        }

        if (contactInfoDescription && typeof infoCard.description === "string") {
            contactInfoDescription.textContent = infoCard.description;
        }

        if (contactAddressLabel) {
            contactAddressLabel.textContent = labels.address || "Dirección:";
        }

        if (contactScheduleLabel) {
            contactScheduleLabel.textContent = labels.schedule || "Horario:";
        }

        if (contactPhonesLabel) {
            contactPhonesLabel.textContent = labels.phones || "Teléfonos:";
        }

        if (contactEmailLabel) {
            contactEmailLabel.textContent = labels.email || "Email:";
        }

        if (contactFollowLabel) {
            contactFollowLabel.textContent = labels.follow || "Síguenos:";
        }

        if (contactShareLabel) {
            contactShareLabel.textContent = labels.share || shareConfig.label || "Compartir:";
        }

        if (contactAddress && typeof infoCard.address === "string") {
            contactAddress.textContent = infoCard.address;
        }

        if (contactSchedule) {
            if (Array.isArray(infoCard.scheduleText)) {
                contactSchedule.innerHTML = infoCard.scheduleText.join("<br>");
            } else if (typeof infoCard.scheduleText === "string") {
                contactSchedule.innerHTML = infoCard.scheduleText.replace(/\n/g, "<br>");
            }
        }

        if (contactPhones && Array.isArray(infoCard.phones)) {
            contactPhones.textContent = infoCard.phones.join(", ");
        }

        if (contactEmail && typeof infoCard.email === "string") {
            contactEmail.textContent = infoCard.email;
            contactEmail.href = "mailto:" + infoCard.email;
        }

        if (contactFacebookLink && infoCard.socialLinks && infoCard.socialLinks.facebook) {
            const socialFacebook = infoCard.socialLinks.facebook;
            contactFacebookLink.hidden = socialFacebook.enabled === false;
            contactFacebookLink.href = socialFacebook.url || "#";
            contactFacebookLink.target = "_blank";
            contactFacebookLink.rel = "noopener";

            const socialFacebookImage = contactFacebookLink.querySelector("img");

            if (socialFacebookImage && typeof socialFacebook.iconSrc === "string") {
                socialFacebookImage.src = socialFacebook.iconSrc;
            }
        }

        if (contactInstagramLink && infoCard.socialLinks && infoCard.socialLinks.instagram) {
            const socialInstagram = infoCard.socialLinks.instagram;
            contactInstagramLink.hidden = socialInstagram.enabled === false;
            contactInstagramLink.href = socialInstagram.url || "#";
            contactInstagramLink.target = "_blank";
            contactInstagramLink.rel = "noopener";

            const socialInstagramImage = contactInstagramLink.querySelector("img");

            if (socialInstagramImage && typeof socialInstagram.iconSrc === "string") {
                socialInstagramImage.src = socialInstagram.iconSrc;
            }
        }

        if (shareFacebook) {
            shareFacebook.hidden = !(shareConfig.facebook && shareConfig.facebook.enabled !== false);
            shareFacebook.href = buildFacebookShareUrl();
            shareFacebook.target = "_blank";
            shareFacebook.rel = "noopener";
        }

        if (shareX) {
            shareX.hidden = !(shareConfig.x && shareConfig.x.enabled !== false);
            shareX.href = buildXShareUrl();
            shareX.target = "_blank";
            shareX.rel = "noopener";
        }

        if (shareWhatsapp) {
            shareWhatsapp.hidden = !(shareConfig.whatsapp && shareConfig.whatsapp.enabled !== false);
            shareWhatsapp.href = buildWhatsappShareUrl();
            shareWhatsapp.target = "_blank";
            shareWhatsapp.rel = "noopener";
        }

        if (shareInstagram) {
            shareInstagram.hidden = !(shareConfig.instagram && shareConfig.instagram.enabled !== false);
            shareInstagram.href = "https://www.instagram.com/";
            shareInstagram.target = "_blank";
            shareInstagram.rel = "noopener";

            shareInstagram.addEventListener("click", function() {
                copyTextToClipboard(getPageUrl())
                    .then(function() {
                        showToast(
                            "Enlace copiado",
                            "Se copió el enlace para compartirlo en Instagram.",
                            "success"
                        );
                    })
                    .catch(function() {
                        showToast(
                            "Comparte este enlace",
                            getPageUrl(),
                            "error"
                        );
                    });
            });
        }

        if (contactFormTitle && typeof formCard.title === "string") {
            contactFormTitle.textContent = formCard.title;
        }

        if (contactFormDescription && typeof formCard.description === "string") {
            contactFormDescription.textContent = formCard.description;
        }

        if (contactName && formFields.name) {
            contactName.placeholder = formFields.name.placeholder || "";
        }

        if (contactPhone && formFields.phone) {
            contactPhone.placeholder = formFields.phone.placeholder || "";
        }

        if (contactEmailInput && formFields.email) {
            contactEmailInput.placeholder = formFields.email.placeholder || "";
        }

        if (contactMessage && formFields.message) {
            contactMessage.placeholder = formFields.message.placeholder || "";
        }

        setLabelWithIcon(contactNameLabel, formFields.name && formFields.name.label ? formFields.name.label : "Nombre");
        setLabelWithIcon(contactPhoneLabel, formFields.phone && formFields.phone.label ? formFields.phone.label : "Celular");
        setLabelWithIcon(contactEmailInputLabel, formFields.email && formFields.email.label ? formFields.email.label : "Correo");
        setLabelWithIcon(contactMessageLabel, formFields.message && formFields.message.label ? formFields.message.label : "Mensaje");

        if (contactSubmitButton && typeof formCard.submitButtonLabel === "string") {
            contactSubmitButton.textContent = formCard.submitButtonLabel;
        }

        if (contactMapTitle && typeof mapCard.title === "string") {
            contactMapTitle.textContent = mapCard.title;
        }

        if (contactMapDescription && typeof mapCard.description === "string") {
            contactMapDescription.textContent = mapCard.description;
        }

        if (contactMapFrame && typeof mapCard.embedUrl === "string") {
            contactMapFrame.src = mapCard.embedUrl;
        }

        if (contactMapButton) {
            contactMapButton.href = mapCard.mapsUrl || "#";
            contactMapButton.textContent = mapCard.buttonLabel || "Ver en Google Maps";
        }

        function getWeekdayKey(dateObject) {
            const weekdayKeys = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday"
            ];

            return weekdayKeys[dateObject.getDay()];
        }

        function parseTimeToMinutes(timeText) {
            if (typeof timeText !== "string" || !timeText.includes(":")) {
                return null;
            }

            const timeParts = timeText.split(":");
            const hours = Number(timeParts[0]);
            const minutes = Number(timeParts[1]);

            if (Number.isNaN(hours) || Number.isNaN(minutes)) {
                return null;
            }

            return (hours * 60) + minutes;
        }

        function formatTimeText(timeText) {
            if (typeof timeText !== "string" || !timeText.includes(":")) {
                return "";
            }

            const timeParts = timeText.split(":");
            const hours24 = Number(timeParts[0]);
            const minutes = Number(timeParts[1]);

            if (Number.isNaN(hours24) || Number.isNaN(minutes)) {
                return timeText;
            }

            const suffix = hours24 >= 12 ? "p.m." : "a.m.";
            let hours12 = hours24 % 12;

            if (hours12 === 0) {
                hours12 = 12;
            }

            return String(hours12) + ":" + String(minutes).padStart(2, "0") + " " + suffix;
        }

        function parseExceptionDate(dateText) {
            if (typeof dateText !== "string") {
                return null;
            }

            const matchResult = dateText.trim().match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);

            if (!matchResult) {
                return null;
            }

            return new Date(
                Number(matchResult[1]),
                Number(matchResult[2]) - 1,
                Number(matchResult[3]),
                Number(matchResult[4]),
                Number(matchResult[5]),
                0,
                0
            );
        }

        function getCurrentDateInTimezone(timezoneText) {
            const formatter = new Intl.DateTimeFormat("en-CA", {
                timeZone: timezoneText,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23"
            });

            const parts = formatter.formatToParts(new Date());
            const map = {};

            parts.forEach(function(part) {
                if (part.type !== "literal") {
                    map[part.type] = part.value;
                }
            });

            return new Date(
                Number(map.year),
                Number(map.month) - 1,
                Number(map.day),
                Number(map.hour),
                Number(map.minute),
                Number(map.second),
                0
            );
        }

        function findActiveException(nowDate, exceptionsList) {
            return exceptionsList.find(function(exceptionItem) {
                if (!exceptionItem || exceptionItem.enabled === false) {
                    return false;
                }

                const startDate = parseExceptionDate(exceptionItem.start);
                const endDate = parseExceptionDate(exceptionItem.end);

                if (!startDate || !endDate) {
                    return false;
                }

                return nowDate.getTime() >= startDate.getTime() && nowDate.getTime() <= endDate.getTime();
            }) || null;
        }

        function findNextOpenDay(nowDate, weeklySchedule, exceptionsList) {
            for (let offset = 0; offset < 8; offset += 1) {
                const testDate = new Date(nowDate);
                testDate.setDate(nowDate.getDate() + offset);

                const weekdayKey = getWeekdayKey(testDate);
                const dayConfig = weeklySchedule[weekdayKey];

                if (!dayConfig || dayConfig.enabled !== true || !dayConfig.open) {
                    continue;
                }

                const openMinutes = parseTimeToMinutes(dayConfig.open);

                if (openMinutes === null) {
                    continue;
                }

                const openDate = new Date(
                    testDate.getFullYear(),
                    testDate.getMonth(),
                    testDate.getDate(),
                    Math.floor(openMinutes / 60),
                    openMinutes % 60,
                    0,
                    0
                );

                const blockedByException = exceptionsList.some(function(exceptionItem) {
                    if (!exceptionItem || exceptionItem.enabled === false || exceptionItem.type !== "closed") {
                        return false;
                    }

                    const startDate = parseExceptionDate(exceptionItem.start);
                    const endDate = parseExceptionDate(exceptionItem.end);

                    if (!startDate || !endDate) {
                        return false;
                    }

                    return openDate.getTime() >= startDate.getTime() && openDate.getTime() <= endDate.getTime();
                });

                if (!blockedByException) {
                    return {
                        date: testDate,
                        open: dayConfig.open
                    };
                }
            }

            return null;
        }

        function updateStatus() {
            const scheduleConfig = infoCard.schedule || {};
            const weeklySchedule = scheduleConfig.weekly || {};
            const exceptions = Array.isArray(scheduleConfig.exceptions) ? scheduleConfig.exceptions : [];
            const messages = scheduleConfig.messages || {};
            const timezone = scheduleConfig.timezone || "America/Tegucigalpa";
            const now = getCurrentDateInTimezone(timezone);

            let statusClass = "contact-status--closed";
            let statusMessage = messages.noSchedule || "Horario no disponible";

            const activeException = findActiveException(now, exceptions);

            if (activeException && activeException.type === "closed") {
                statusClass = "contact-status--closed";
                statusMessage = activeException.reason || "Cerrado temporalmente";
            } else {
                const weekdayKey = getWeekdayKey(now);
                const dayConfig = weeklySchedule[weekdayKey];
                const currentMinutes = (now.getHours() * 60) + now.getMinutes();

                if (dayConfig && dayConfig.enabled === true) {
                    const openMinutes = parseTimeToMinutes(dayConfig.open);
                    const closeMinutes = parseTimeToMinutes(dayConfig.close);

                    if (openMinutes !== null && closeMinutes !== null && currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
                        statusClass = "contact-status--open";
                        statusMessage = messages.openNow || "Abierto ahora";
                    } else if (openMinutes !== null && currentMinutes < openMinutes) {
                        statusClass = "contact-status--closed";
                        statusMessage = (messages.closedNowOpensLaterToday || "Cerrado en este momento. Abrimos hoy a las") + " " + formatTimeText(dayConfig.open);
                    } else {
                        const nextOpen = findNextOpenDay(now, weeklySchedule, exceptions);

                        if (nextOpen) {
                            if (now.getDay() === 0) {
                                statusMessage = messages.sundayClosed || "Cerrado hoy. Abrimos el lunes.";
                            } else {
                                statusMessage = (messages.closedUntilPrefix || "Cerrado. Abrimos a las") + " " + formatTimeText(nextOpen.open);
                            }
                        }
                    }
                } else {
                    const nextOpen = findNextOpenDay(now, weeklySchedule, exceptions);

                    if (now.getDay() === 0) {
                        statusMessage = messages.sundayClosed || "Cerrado hoy. Abrimos el lunes.";
                    } else if (nextOpen) {
                        statusMessage = (messages.closedUntilPrefix || "Cerrado. Abrimos a las") + " " + formatTimeText(nextOpen.open);
                    }
                }
            }

            if (contactStatus) {
                contactStatus.classList.remove("contact-status--open", "contact-status--closed");
                contactStatus.classList.add(statusClass);
            }

            if (contactStatusText) {
                contactStatusText.textContent = statusMessage;
            }
        }

        function setFieldError(fieldElement, errorElement, messageText) {
            const fieldWrapper = fieldElement ? fieldElement.closest(".contact-form__field") : null;

            if (fieldWrapper) {
                fieldWrapper.classList.add("has-error");
            }

            if (errorElement) {
                errorElement.textContent = messageText || "";
            }
        }

        function clearFieldError(fieldElement, errorElement) {
            const fieldWrapper = fieldElement ? fieldElement.closest(".contact-form__field") : null;

            if (fieldWrapper) {
                fieldWrapper.classList.remove("has-error");
            }

            if (errorElement) {
                errorElement.textContent = "";
            }
        }

        function validateEmail(valueText) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueText);
        }

        function validatePhone(valueText) {
            return /^[0-9+\-\s()]{7,}$/.test(valueText);
        }

        function validateForm() {
            let isValid = true;
            let firstInvalidField = null;

            clearFieldError(contactName, contactNameError);
            clearFieldError(contactPhone, contactPhoneError);
            clearFieldError(contactEmailInput, contactEmailInputError);
            clearFieldError(contactMessage, contactMessageError);

            const nameValue = contactName ? contactName.value.trim() : "";
            const phoneValue = contactPhone ? contactPhone.value.trim() : "";
            const emailValue = contactEmailInput ? contactEmailInput.value.trim() : "";
            const messageValue = contactMessage ? contactMessage.value.trim() : "";

            if (!nameValue) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactName;
                setFieldError(contactName, contactNameError, formFields.name && formFields.name.requiredMessage ? formFields.name.requiredMessage : "Por favor escribe tu nombre.");
            }

            if (!phoneValue) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactPhone;
                setFieldError(contactPhone, contactPhoneError, formFields.phone && formFields.phone.requiredMessage ? formFields.phone.requiredMessage : "Por favor escribe tu número de celular.");
            } else if (!validatePhone(phoneValue)) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactPhone;
                setFieldError(contactPhone, contactPhoneError, formFields.phone && formFields.phone.invalidMessage ? formFields.phone.invalidMessage : "Escribe un número de celular válido.");
            }

            if (!emailValue) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactEmailInput;
                setFieldError(contactEmailInput, contactEmailInputError, formFields.email && formFields.email.requiredMessage ? formFields.email.requiredMessage : "Por favor escribe tu correo.");
            } else if (!validateEmail(emailValue)) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactEmailInput;
                setFieldError(contactEmailInput, contactEmailInputError, formFields.email && formFields.email.invalidMessage ? formFields.email.invalidMessage : "Escribe un correo electrónico válido.");
            }

            if (!messageValue) {
                isValid = false;
                firstInvalidField = firstInvalidField || contactMessage;
                setFieldError(contactMessage, contactMessageError, formFields.message && formFields.message.requiredMessage ? formFields.message.requiredMessage : "Por favor escribe tu mensaje.");
            }

            if (!isValid && firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "center"
                });

                showToast(
                    formToast.errorTitle || "Formulario incompleto",
                    formToast.errorMessage || "Revisa los campos marcados en rojo.",
                    "error"
                );
            }

            return isValid;
        }

        if (contactForm) {
            contactForm.addEventListener("submit", function(event) {
                event.preventDefault();

                const isValid = validateForm();

                if (!isValid) {
                    return;
                }

                showToast(
                    formToast.successTitle || "Solicitud enviada",
                    formToast.successMessage || "Tu mensaje fue enviado correctamente.",
                    "success"
                );

                contactForm.reset();
            });
        }

        [contactName, contactPhone, contactEmailInput, contactMessage].forEach(function(fieldElement) {
            if (!fieldElement) {
                return;
            }

            fieldElement.addEventListener("input", function() {
                const errorElement = document.getElementById(fieldElement.id + "Error");
                clearFieldError(fieldElement, errorElement);
            });
        });

        updateStatus();
        window.setInterval(updateStatus, 60000);

        window.__contactInitialized = true;
    }

    window.initContact = initContact;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initContact, { once: true });
    } else {
        initContact();
    }
})();
