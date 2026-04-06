window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.hero = {
    enabled: true,

    background: {
        useImage: false,
        imageSrc: "img/hero/background/hero-background-default.png"
        /*imageSrc: "img/hero/background/sun-tornado.svg",*/
    },

    studentAmbient: {
        imageSrc: "img/hero/estudiante.png",
        imageAlt: ""
    },

    intro: {
        kicker: "Instituto Técnico Morazán",
        title: "Educación integral que forma estudiantes con visión, carácter y proyección real.",
        tagline: "Excelencia Educativa Técnica Empresarial",
        subtitle: "Descubre una propuesta educativa sólida, cercana y moderna, diseñada para acompañar el crecimiento académico y humano de cada estudiante."
    },

    actions: [
        {
            enabled: true,
            label: "Solicitar información",
            href: "#contact",
            variant: "action"
        },
        {
            enabled: true,
            label: "Ver programas",
            href: "#education-levels",
            variant: "glass"
        }
    ],

    highlights: [
        "Formación integral",
        "Programas técnicos",
        "Actividades extracurriculares"
    ],

    slides: [
        {
            imageSrc: "img/hero/slides/hero-slide-default.jpg",
            imageAlt: "Vista principal del Instituto Técnico Morazán",
            note: "Formación integral con identidad institucional, acompañamiento cercano y visión de futuro para cada estudiante."
        },
        {
            imageSrc: "img/hero/slides/slide-1.jpg",
            imageAlt: "Actividad institucional destacada del Instituto Técnico Morazán",
            note: "Admisiones 2026: conoce nuestros programas y prepárate con tiempo para el próximo período académico."
        },
        {
            imageSrc: "img/hero/slides/slide-2.jpg",
            imageAlt: "Vida estudiantil en el Instituto Técnico Morazán",
            note: "Vida estudiantil: experiencias que fortalecen la convivencia, la identidad y el sentido de pertenencia institucional."
        },
        {
            imageSrc: "img/hero/slides/slide-3.jpg",
            imageAlt: "Proyección académica del Instituto Técnico Morazán",
            note: "Proyección académica: una formación que impulsa metas universitarias, técnicas y profesionales con bases sólidas."
        }
    ],

    supportCard: {
        imageSrc: "img/hero/support/hero-support-default.jpg",
        imageAlt: "Promoción institucional del Instituto Técnico Morazán",
        label: "Semana Santa 2026",
        title: "Una temporada para reflexionar, renovarte y proyectar tu futuro académico",
        text: "Conoce nuestras actividades institucionales, orientación para estudiantes y novedades para el próximo período académico."
    },

    autoplay: {
        enabled: true,
        intervalMs: 5200
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.aboutStats = {
    enabled: true,
    showCta: true,
    logoSrc: "img/icons/section/school-figures.svg",
    logoAlt: "Nuestro Colegio en Cifras",
    kicker: "Instituto Técnico Morazán",
    title: "Nuestro Colegio en Cifras",
    description: "Somos una institución comprometida con la formación integral de cada estudiante, fortaleciendo conocimientos, valores y competencias técnicas para un futuro sólido y exitoso.",
    cards: [
        {
            iconSrc: "img/icons/section/active-students.svg",
            iconAlt: "",
            target: 1200,
            prefix: "+",
            suffix: "",
            title: "Estudiantes activos",
            text: "Una comunidad educativa dinámica, diversa y en constante crecimiento."
        },
        {
            iconSrc: "img/icons/section/years-experience.svg",
            iconAlt: "",
            target: 35,
            prefix: "",
            suffix: "",
            title: "Años de experiencia",
            text: "Trayectoria institucional formando generaciones con excelencia académica."
        },
        {
            iconSrc: "img/icons/section/tech-programs.svg",
            iconAlt: "",
            target: 4,
            prefix: "",
            suffix: "",
            title: "Carreras técnicas",
            text: "Programas orientados al desarrollo profesional y técnico de alto nivel."
        },
        {
            iconSrc: "img/icons/section/successful-graduates.svg",
            iconAlt: "",
            target: 92,
            prefix: "",
            suffix: "%",
            title: "Egresados exitosos",
            text: "Estudiantes que continúan estudios superiores o se insertan con éxito al entorno laboral."
        }
    ],
    primaryCta: {
        enabled: true,
        label: "Solicitar información",
        href: "#contact"
    },
    secondaryCta: {
        enabled: true,
        label: "Conocer programas",
        href: "#education-levels"
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.about = {
    enabled: true,
    showCta: true,
    showMedia: true,
    logoSrc: "img/icons/section/about.svg",
    logoAlt: "Sobre Nosotros",
    kicker: "Instituto Técnico Morazán",
    title: "Sobre Nosotros",
    description: "Formamos estudiantes con visión humana, académica y técnica, fortaleciendo valores, disciplina y compromiso con su futuro.",
    supportNote: "Educación con propósito, acompañamiento cercano y enfoque en la excelencia integral.",
    mission: {
        iconSrc: "img/icons/ui/mission.svg",
        iconAlt: "",
        eyebrow: "Misión",
        title: "Formación integral con excelencia",
        text: "Brindar una educación de calidad que fortalezca conocimientos, valores y competencias para la vida académica, técnica y profesional."
    },
    vision: {
        iconSrc: "img/icons/ui/vision.svg",
        iconAlt: "",
        eyebrow: "Visión",
        title: "Proyección educativa con liderazgo",
        text: "Ser una institución referente por su compromiso con la innovación educativa, la formación humana y el desarrollo técnico de sus estudiantes."
    },
    highlights: [
        "Acompañamiento cercano al estudiante",
        "Formación académica y técnica equilibrada",
        "Valores, disciplina y sentido institucional"
    ],
    media: {
        mode: "image",
        imageSrc: "img/about/about-default.jpg",
        imageAlt: "Comunidad educativa del Instituto Técnico Morazán",
        youtubeEmbed: "https://www.youtube.com/embed/VIDEO_ID",
        videoSrc: "media/about/about-video.mp4",
        caption: "Conozca nuestra identidad institucional, el ambiente formativo y el compromiso que nos distingue."
    },
    primaryCta: {
        enabled: true,
        label: "Solicitar información",
        href: "#contact"
    },
    secondaryCta: {
        enabled: true,
        label: "Explorar programas",
        href: "#education-levels"
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.faq = {
    enabled: true,
    showCta: true,
    logoSrc: "img/icons/section/faq.svg",
    logoAlt: "Preguntas Frecuentes",
    kicker: "Instituto Técnico Morazán",
    title: "Preguntas Frecuentes",
    description: "Resolvemos las consultas más comunes sobre matrícula, niveles educativos, carreras, horarios, procesos de admisión y atención institucional.",
    items: [
        {
            question: "¿Cuáles son los requisitos de matrícula?",
            answer: "Para el proceso de matrícula se solicita la documentación académica correspondiente, datos del estudiante, información del encargado y requisitos administrativos establecidos por la institución."
        },
        {
            question: "¿Qué niveles y carreras se ofrecen?",
            answer: "Ofrecemos niveles académicos y opciones técnicas orientadas a fortalecer la formación integral y profesional del estudiante según el programa institucional vigente."
        },
        {
            question: "¿Cuáles son los horarios de atención?",
            answer: "Nuestro equipo atiende consultas administrativas y académicas en horarios establecidos por la institución, los cuales pueden actualizarse en temporada de matrícula o procesos especiales."
        },
        {
            question: "¿Cómo puedo solicitar información sobre el proceso de admisión?",
            answer: "Puede solicitar información mediante nuestros canales de contacto, formulario institucional, atención presencial o comunicación directa con el área administrativa."
        },
        {
            question: "¿Dónde están ubicados?",
            answer: "Nuestra ubicación puede consultarse en la sección de contacto, donde encontrará referencia, dirección institucional y vías de comunicación disponibles."
        },
        {
            question: "¿Se realizan actividades académicas y extracurriculares?",
            answer: "Sí, promovemos actividades académicas, culturales, formativas y complementarias que fortalecen la experiencia estudiantil y el sentido de pertenencia institucional."
        },
        {
            question: "¿Cómo se da seguimiento al progreso académico del estudiante?",
            answer: "El seguimiento académico se realiza mediante evaluación continua, comunicación institucional, acompañamiento docente y orientación oportuna según las necesidades del estudiante."
        }
    ],
    aside: {
        kicker: "Atención y orientación",
        title: "¿Tiene otra consulta?",
        text: "Si su pregunta no aparece aquí, nuestro equipo puede orientarle con información actualizada sobre procesos, requisitos y atención institucional."
    },
    primaryCta: {
        enabled: true,
        label: "Solicitar información",
        href: "#contact"
    },
    secondaryCta: {
        enabled: true,
        label: "Ver más detalles",
        href: "#contact"
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.educationLevels = {
    enabled: true,
    logoSrc: "img/icons/section/education-levels.svg",
    logoAlt: "Niveles Educativos",
    kicker: "Instituto Técnico Morazán",
    title: "Niveles Educativos",
    description: "Ofrecemos una formación progresiva y sólida que acompaña al estudiante desde la educación básica hasta la educación media, con enfoque humano, académico y técnico.",
    cards: [
        {
            variant: "third-cycle",
            imageSrc: "img/levels/tercerCiclo.jpg",
            imageAlt: "Estudiantes de Tercer Ciclo",
            highlight: "Educación básica",
            title: "Tercer Ciclo",
            description: "Fortalece conocimientos fundamentales, hábitos de estudio, pensamiento crítico y preparación académica para las etapas superiores.",
            chips: [
                { label: "7mo", variant: "default" },
                { label: "8vo", variant: "default" },
                { label: "9no", variant: "default" }
            ]
        },
        {
            variant: "bachillerato",
            imageSrc: "img/levels/bachillerato.jpg",
            imageAlt: "Estudiantes de Bachillerato",
            highlight: "Educación media",
            title: "Bachillerato",
            description: "Prepara al estudiante para la vida universitaria, técnica y profesional mediante una formación integral con orientación académica y de modalidad.",
            chips: [
                { label: "10mo grado", variant: "secondary" },
                { label: "11vo grado", variant: "secondary" },
                { label: "12vo grado", variant: "secondary" }
            ]
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.techCareers = {
    enabled: true,
    logoSrc: "img/icons/section/tech-careers.svg",
    logoAlt: "Carreras Técnicas",
    kicker: "Instituto Técnico Morazán",
    title: "Carreras Técnicas",
    description: "Descubra programas formativos diseñados para impulsar habilidades reales, visión profesional y oportunidades concretas para la universidad, el trabajo y el crecimiento personal.",
    assistant: {
        enabled: true,
        robotSvgSrc: "img/icons/ui/bot.svg",
        robotAlt: "Asistente institucional",
        bubble: "Estudia en una institución que te prepara para avanzar con seguridad, descubrir tu vocación y construir un futuro con más oportunidades desde hoy."
    },
    cards: [
        {
            topTag: "Alta demanda",
            imageSrc: "img/levels/careers/inf.jpg",
            imageAlt: "Bachiller Técnico en Informática",
            areaTag: "Área tecnológica",
            title: "Bachiller Técnico en Informática",
            description: "Convierte tu interés por la tecnología en una preparación real para la universidad, el trabajo y los retos del mundo digital.",
            features: [
                "Comienzas con una base académica fuerte y avanzas hacia formación técnica especializada.",
                "Desarrollas habilidades prácticas en entornos tecnológicos actuales y de alta demanda.",
                "Aprendes en laboratorios climatizados con acompañamiento docente constante."
            ],
            quote: "Si sueñas con destacar en el área digital, esta carrera te abre puertas desde el aula hacia oportunidades reales.",
            duration: "Duración: 3 años",
            primaryCta: {
                enabled: true,
                label: "Solicitar información",
                href: "#contact"
            },
            secondaryCta: {
                enabled: true,
                label: "Hablar con admisiones",
                href: "#contact"
            }
        },
        {
            topTag: "Alta demanda",
            imageSrc: "img/levels/careers/cf.jpg",
            imageAlt: "Bachiller Técnico en Contaduría y Finanzas",
            areaTag: "Área administrativa",
            title: "Bachiller Técnico en Contaduría y Finanzas",
            description: "Prepárate para comprender cómo funcionan las empresas, las finanzas y la administración con una formación útil, práctica y con visión de crecimiento.",
            features: [
                "Fortaleces disciplina, criterio profesional y organización desde una base común sólida.",
                "Te preparas para desenvolverte en áreas contables, financieras y administrativas.",
                "Impulsa tanto la continuidad universitaria como la visión emprendedora."
            ],
            quote: "Es una carrera para quienes quieren avanzar con seguridad hacia el mundo empresarial y tomar decisiones con visión.",
            duration: "Duración: 3 años",
            primaryCta: {
                enabled: true,
                label: "Solicitar información",
                href: "#contact"
            },
            secondaryCta: {
                enabled: true,
                label: "Hablar con admisiones",
                href: "#contact"
            }
        },
        {
            topTag: "Alta demanda",
            imageSrc: "img/levels/careers/cchh.jpg",
            imageAlt: "Bachiller Técnico en Ciencias y Humanidades",
            areaTag: "Formación general",
            title: "Bachiller Técnico en Ciencias y Humanidades",
            description: "Construye una base académica de alto valor para avanzar con confianza hacia la universidad y proyectarte en distintas áreas del conocimiento.",
            features: [
                "Refuerza pensamiento lógico, análisis crítico y comprensión científica del entorno.",
                "Desarrolla una base integral para continuar estudios superiores con mejores herramientas.",
                "Incluye acompañamiento para orientar decisiones vocacionales y metas futuras."
            ],
            quote: "Si buscas una formación que te impulse hacia la universidad con bases firmes, esta es una de las mejores decisiones para tu futuro.",
            duration: "Duración: 2 años",
            primaryCta: {
                enabled: true,
                label: "Solicitar información",
                href: "#contact"
            },
            secondaryCta: {
                enabled: true,
                label: "Hablar con admisiones",
                href: "#contact"
            }
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.gallery = {
    enabled: true,
    logoSrc: "img/icons/section/photo-gallery.svg",
    logoAlt: "Galería de Fotos",
    kicker: "Instituto Técnico Morazán",
    title: "Galería de Fotos",
    description: "Descubra momentos, espacios y experiencias que reflejan la vida académica, técnica y formativa de nuestra comunidad educativa.",
    items: [
        {
            featured: true,
            src: "img/gallery/galeria-1.jpg",
            alt: "Actividad institucional destacada",
            title: "Actividades académicas",
            subtitle: "Experiencias que fortalecen el aprendizaje."
        },
        {
            featured: false,
            src: "img/gallery/galeria-2.jpg",
            alt: "Momentos de aula",
            title: "Momentos de aula",
            subtitle: "Espacios donde el conocimiento cobra vida."
        },
        {
            featured: false,
            src: "img/gallery/galeria-3.jpg",
            alt: "Vida estudiantil",
            title: "Vida estudiantil",
            subtitle: "Experiencias que fortalecen identidad y convivencia."
        },
        {
            featured: false,
            src: "img/gallery/galeria-4.jpg",
            alt: "Participación institucional",
            title: "Participación institucional",
            subtitle: "Proyectos y actividades que dejan huella."
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.countdown = {
    enabled: true,
    logoSrc: "img/icons/section/countdown.svg",
    logoAlt: "Próximo evento institucional",
    kicker: "Próximo evento institucional",
    title: "Cuenta regresiva institucional",
    description: "Manténgase al tanto de los momentos más importantes del calendario académico institucional.",
    labels: {
        graduationBadge: "Graduaciones",
        classStartBadge: "Inicio de clases",
        graduationMessage: "Faltan para la próxima graduación.",
        classStartMessage: "Faltan para el inicio de clases.",
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos"
    },
    events: {
        graduation: {
            month: 11,
            day: 30,
            hour: 23,
            minute: 59,
            second: 59
        },
        classStart: {
            month: 2,
            day: 2,
            hour: 6,
            minute: 0,
            second: 0
        }
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.notices = {
    enabled: true,
    logoSrc: "img/icons/section/important-notices.svg",
    logoAlt: "Avisos Importantes",
    kicker: "Instituto Técnico Morazán",
    title: "Avisos Importantes",
    description: "Consulte avisos rápidos y relevantes de la semana para mantenerse informado sobre actividades, recordatorios y comunicaciones institucionales recientes.",
    items: [
        {
            date: "12 de abril",
            text: "Entrega de documentos administrativos para estudiantes de último año."
        },
        {
            date: "14 de abril",
            text: "Reunión informativa con padres de familia en horario matutino."
        },
        {
            date: "16 de abril",
            text: "Recordatorio de pago correspondiente al mes en curso."
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.events = {
    enabled: true,
    logoSrc: "img/icons/section/upcoming-events.svg",
    logoAlt: "Próximos Eventos",
    kicker: "Instituto Técnico Morazán",
    title: "Próximos Eventos",
    description: "Consulte actividades programadas y fechas importantes para mantenerse al día con la agenda institucional.",
    items: [
        {
            day: "10",
            monthShort: "Mar",
            fullDate: "10 de marzo de 2026",
            title: "Feria académica",
            text: "Exposición de proyectos estudiantiles de las carreras técnicas."
        },
        {
            day: "18",
            monthShort: "Abr",
            fullDate: "18 de abril de 2026",
            title: "Reunión institucional",
            text: "Encuentro informativo con padres de familia y personal docente."
        },
        {
            day: "25",
            monthShort: "May",
            fullDate: "25 de mayo de 2026",
            title: "Jornada cultural",
            text: "Actividades artísticas y presentaciones preparadas por la comunidad educativa."
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.testimonials = {
    enabled: true,
    autoplay: true,
    autoplayDelayMs: 5000,
    pauseOnHover: true,
    logoSrc: "img/icons/section/alumni-testimonials.svg",
    logoAlt: "Lo que dicen nuestros egresados",
    kicker: "Instituto Técnico Morazán",
    title: "Lo que dicen nuestros egresados",
    description: "Conozca experiencias reales de egresados que hoy avanzan con seguridad gracias a la formación académica, técnica y humana recibida en nuestra institución.",
    items: [
        {
            text: "El Instituto Técnico Morazán me dio las herramientas necesarias para insertarme en el mundo laboral. Hoy trabajo como contador en una empresa importante y sigo aplicando lo aprendido cada día.",
            avatarMode: "initials",
            initials: "CM",
            imageSrc: "img/testimonials/avatars/carlos-mendoza.jpg",
            imageAlt: "Carlos Mendoza",
            name: "Carlos Mendoza",
            meta: "Egresado 2020 - Informática"
        },
        {
            text: "Mi paso por la institución me ayudó a fortalecer disciplina, confianza y visión profesional. Gracias a esa base pude continuar mis estudios universitarios con mucha más seguridad.",
            avatarMode: "initials",
            initials: "LP",
            imageSrc: "img/testimonials/avatars/lucia-pineda.jpg",
            imageAlt: "Lucía Pineda",
            name: "Lucía Pineda",
            meta: "Egresada 2021 - Contaduría y Finanzas"
        },
        {
            text: "Los docentes siempre nos impulsaron a dar más. Esa exigencia positiva fue clave para desarrollar habilidades que hoy me ayudan en la universidad y en mi vida profesional.",
            avatarMode: "initials",
            initials: "JR",
            imageSrc: "img/testimonials/avatars/jose-rivera.jpg",
            imageAlt: "José Rivera",
            name: "José Rivera",
            meta: "Egresado 2019 - Ciencias y Humanidades"
        },
        {
            text: "Estudiar aquí fue una experiencia que marcó mi camino. No solo aprendí contenidos técnicos, también aprendí a trabajar con responsabilidad, constancia y metas claras.",
            avatarMode: "initials",
            initials: "AG",
            imageSrc: "img/testimonials/avatars/ana-garcia.jpg",
            imageAlt: "Ana García",
            name: "Ana García",
            meta: "Egresada 2022 - Informática"
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.news = {
    enabled: true,
    logoSrc: "img/icons/section/news-center.svg",
    logoAlt: "Noticias",
    kicker: "Instituto Técnico Morazán",
    title: "Noticias",
    description: "Manténgase al tanto de las novedades, actividades y logros que forman parte de la vida institucional de nuestra comunidad educativa.",
    cta: {
        label: "Ir al centro de noticias",
        href: "news-center.html"
    },
    icons: {
        dateIconSrc: "img/icons/ui/news-date.svg",
        dateIconAlt: "",
        readMoreIconSrc: "img/icons/ui/read-more.svg",
        readMoreIconAlt: ""
    },
    featured: {
        showNewBadge: true,
        newBadgeLabel: "Nuevo",
        categoryLabel: "Institucional",
        date: "15 Ene 2026",
        title: "Evento deportivo escolar",
        text: "Participación estudiantil en actividades deportivas intercolegiales que fortalecen el trabajo en equipo, la disciplina y el orgullo institucional.",
        imageSrc: "img/news/noticia-1.jpg",
        imageAlt: "Evento deportivo escolar",
        linkLabel: "Leer más",
        linkHref: "news-center.html"
    },
    items: [
        {
            showNewBadge: true,
            newBadgeLabel: "Nuevo",
            categoryLabel: "Institucional",
            date: "10 Ene 2026",
            title: "Feria académica",
            text: "Presentación de proyectos desarrollados por estudiantes de distintas áreas formativas.",
            imageSrc: "img/news/noticia-2.jpg",
            imageAlt: "Feria académica",
            linkLabel: "Leer más",
            linkHref: "news-center.html"
        },
        {
            showNewBadge: false,
            newBadgeLabel: "Nuevo",
            categoryLabel: "Cultura",
            date: "07 Ene 2026",
            title: "Jornada cultural",
            text: "Actividades artísticas y expresivas que fortalecen identidad, creatividad y participación.",
            imageSrc: "img/news/noticia-3.jpg",
            imageAlt: "Jornada cultural",
            linkLabel: "Leer más",
            linkHref: "news-center.html"
        },
        {
            showNewBadge: false,
            newBadgeLabel: "Nuevo",
            categoryLabel: "Logros",
            date: "04 Ene 2026",
            title: "Reconocimiento académico",
            text: "Estudiantes destacados reciben reconocimiento por su rendimiento y compromiso institucional.",
            imageSrc: "img/news/noticia-4.jpg",
            imageAlt: "Reconocimiento académico",
            linkLabel: "Leer más",
            linkHref: "news-center.html"
        },
        {
            showNewBadge: true,
            newBadgeLabel: "Nuevo",
            categoryLabel: "Visitas",
            date: "02 Ene 2026",
            title: "Visita educativa",
            text: "Espacios de aprendizaje fuera del aula que conectan teoría, práctica y contexto real.",
            imageSrc: "img/news/noticia-5.jpg",
            imageAlt: "Visita educativa",
            linkLabel: "Leer más",
            linkHref: "news-center.html"
        }
    ]
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.contact = {
    enabled: true,
    logoSrc: "img/icons/section/contact.svg",
    logoAlt: "Contáctanos",
    kicker: "Instituto Técnico Morazán",
    title: "Contáctanos",
    description: "Comunícate con nosotros, programa tu visita o solicita orientación sobre admisiones, horarios y programas académicos.",

    infoCard: {
        title: "Información de contacto",
        description: "Comunícate con nosotros, programa tu visita o solicita orientación sobre admisiones, horarios y programas académicos.",

        labels: {
            address: "Dirección:",
            schedule: "Horario:",
            phones: "Teléfonos:",
            email: "Email:",
            follow: "Síguenos:",
            share: "Compartir:"
        },

        address: "Bo Guamilito, 2 ave., 5-6 cll., San Pedro Sula, Cortés, Honduras",

        scheduleText: [
            "Lunes a Viernes: 7:00 a.m. - 4:00 p.m.",
            "Sábados: 7:00 a.m. - 12:00 m."
        ],

        phones: [
            "2557-2360",
            "8802-5206"
        ],

        email: "info@tecmorazan.edu.hn",

        schedule: {
            timezone: "America/Tegucigalpa",

            weekly: {
                monday: {
                    enabled: true,
                    open: "07:00",
                    close: "16:00"
                },
                tuesday: {
                    enabled: true,
                    open: "07:00",
                    close: "16:00"
                },
                wednesday: {
                    enabled: true,
                    open: "07:00",
                    close: "16:00"
                },
                thursday: {
                    enabled: true,
                    open: "07:00",
                    close: "16:00"
                },
                friday: {
                    enabled: true,
                    open: "07:00",
                    close: "16:00"
                },
                saturday: {
                    enabled: true,
                    open: "07:00",
                    close: "12:00"
                },
                sunday: {
                    enabled: false,
                    open: "",
                    close: ""
                }
            },

            exceptions: [
                {
                    enabled: true,
                    start: "2026-04-01 00:00",
                    end: "2026-04-06 23:59",
                    type: "closed",
                    reason: "Cerrado por asueto de Semana Santa."
                },
                {
                    enabled: true,
                    start: "2026-09-15 00:00",
                    end: "2026-09-15 23:59",
                    type: "closed",
                    reason: "Cerrado por celebración de fiestas patrias."
                },
                {
                    enabled: false,
                    start: "2026-10-10 07:00",
                    end: "2026-10-10 16:00",
                    type: "closed",
                    reason: "Cerrado por fumigación."
                },
                {
                    enabled: false,
                    start: "2026-11-20 07:00",
                    end: "2026-11-20 16:00",
                    type: "closed",
                    reason: "Cerrado por mantenimiento."
                }
            ],

            messages: {
                openNow: "Abierto ahora",
                closedNowOpensLaterToday: "Cerrado en este momento. Abrimos hoy a las",
                closedUntilPrefix: "Cerrado. Abrimos a las",
                sundayClosed: "Cerrado hoy. Abrimos el lunes.",
                noSchedule: "Horario no disponible"
            }
        },

        socialLinks: {
            facebook: {
                enabled: true,
                iconSrc: "img/icons/social/facebook.svg",
                url: "https://www.facebook.com/tecnicomorazanhn/"
            },
            instagram: {
                enabled: true,
                iconSrc: "img/icons/social/instagram.svg",
                url: "https://www.instagram.com/tecnicomorazan/"
            }
        },

        share: {
            label: "Compartir:",
            url: "",
            text: "Instituto Técnico Morazán",
            facebook: {
                enabled: true
            },
            instagram: {
                enabled: true
            },
            x: {
                enabled: true
            },
            whatsapp: {
                enabled: true
            }
        }
    },

    formCard: {
        title: "Solicita información",
        description: "Completa el formulario y nos pondremos en contacto contigo para brindarte más detalles sobre admisiones, carreras y matrícula.",

        fields: {
            name: {
                label: "Nombre",
                placeholder: "Escribe tu nombre completo",
                requiredMessage: "Por favor escribe tu nombre."
            },
            phone: {
                label: "Celular",
                placeholder: "Escribe tu número de celular",
                requiredMessage: "Por favor escribe tu número de celular.",
                invalidMessage: "Escribe un número de celular válido."
            },
            email: {
                label: "Correo",
                placeholder: "Escribe tu correo electrónico",
                requiredMessage: "Por favor escribe tu correo.",
                invalidMessage: "Escribe un correo electrónico válido."
            },
            message: {
                label: "Mensaje",
                placeholder: "Cuéntanos qué información necesitas",
                requiredMessage: "Por favor escribe tu mensaje."
            }
        },

        submitButtonLabel: "Enviar solicitud",

        toast: {
            errorTitle: "Formulario incompleto",
            errorMessage: "Revisa los campos marcados en rojo.",
            successTitle: "Solicitud enviada",
            successMessage: "Tu mensaje fue enviado correctamente."
        }
    },

    mapCard: {
        title: "Ubicación",
        description: "Encuentra fácilmente nuestras instalaciones y accede a la ubicación oficial del Instituto Técnico Morazán en Google Maps.",
        embedUrl: "https://www.google.com/maps?q=Instituto%20Tecnico%20Morazan%20San%20Pedro%20Sula&output=embed",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Instituto%20Tecnico%20Morazan%20San%20Pedro%20Sula",
        buttonLabel: "Ver en Google Maps"
    }
};

window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.footer = {
    enabled: true,

    logoSrc: "img/branding/itm-logo.png",
    logoAlt: "Instituto Técnico Morazán",

    brand: {
        title: "Instituto Técnico Morazán",
        motto: "Formando jóvenes con visión, disciplina y futuro."
    },

    contact: {
        title: "Contacto",
        address: "Bo Guamilito, 2 ave., 5-6 cll., San Pedro Sula, Cortés, Honduras",
        phones: "2557-2360, 8802-5206",
        email: "info@tecmorazan.edu.hn"
    },

    links: {
        title: "Enlaces",
        items: [
            {
                label: "Inicio",
                href: "#home"
            },
            {
                label: "Nosotros",
                href: "#about-stats"
            },
            {
                label: "Niveles",
                href: "#education-levels"
            },
            {
                label: "Galería",
                href: "#gallery"
            },
            {
                label: "Avisos",
                href: "#notices"
            },
            {
                label: "Noticias",
                href: "#news"
            },
            {
                label: "Contacto",
                href: "#contact"
            }
        ]
    },

    social: {
        title: "Síguenos",
        facebook: {
            enabled: true,
            label: "Facebook",
            href: "https://www.facebook.com/tecnicomorazanhn/",
            iconSrc: "img/icons/social/facebook.svg"
        },
        instagram: {
            enabled: true,
            label: "Instagram",
            href: "https://www.instagram.com/tecnicomorazan/",
            iconSrc: "img/icons/social/instagram.svg"
        }
    },

    morazan: {
        imageSrc: "img/branding/morazan-portrait.png",
        imageAlt: "Gral. Francisco Morazán"
    },

    copyright: "© 2026 Instituto Técnico Morazán. Todos los derechos reservados."
};
