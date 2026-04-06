window.SITE_SECTIONS_CONFIG = window.SITE_SECTIONS_CONFIG || {};

window.SITE_SECTIONS_CONFIG.newsCenter = {
    enabled: true,

    parameters: {
        pageParam: "page",
        newsParam: "news"
    },

    intro: {
        backLabel: "Volver al inicio",
        backHref: "index.html#news",
        logoSrc: "img/icons/section/news-center.svg",
        logoAlt: "Centro de noticias",
        kicker: "Actualidad institucional",
        title: "Centro de Noticias",
        description: "Un espacio editorial para presentar la actualidad del Instituto Técnico Morazán con una lectura clara, ordenada y visualmente sólida.",
        meta: {
            editionLabel: "Edición activa",
            visibleCountLabel: "Publicaciones visibles",
            updatedLabel: "Actualizado"
        }
    },

    viewer: {
        primaryBadgeLabel: "Destacada",
        share: {
            label: "Compartir noticia:",
            facebook: {
                enabled: true,
                label: "Facebook"
            },
            x: {
                enabled: true,
                label: "X"
            },
            whatsapp: {
                enabled: true,
                label: "WhatsApp"
            }
        }
    },

    editorial: {
        kicker: "Línea editorial",
        title: "Una lectura clara de la actualidad institucional",
        text: "El visor superior siempre muestra la noticia activa de la página actual para que el lector no pierda contexto."
    },

    pagination: {
        kicker: "Archivo",
        title: "Paginación editorial",
        prevLabel: "Anterior",
        nextLabel: "Siguiente"
    },

    pageList: {
        kicker: "Noticias de esta página",
        title: "Selecciona una noticia",
        description: "Elige una publicación y el visor superior cambiará a esa noticia sin sacarte de la página actual.",
        cardLinkLabel: "Leer en el visor"
    },

    pages: [
        {
            pageNumber: 1,
            label: "Página 1",
            updatedAt: "15 Ene 2026",
            items: [
                {
                    id: "evento-deportivo-escolar-2026",
                    badgeLabel: "Destacada",
                    category: "Institucional",
                    date: "15 Ene 2026",
                    title: "Evento deportivo escolar",
                    excerpt: "Participación estudiantil en actividades deportivas intercolegiales que fortalecen el trabajo en equipo, la disciplina y el orgullo institucional.",
                    body: [
                        "El Instituto Técnico Morazán continúa impulsando experiencias formativas que fortalecen la disciplina, el compañerismo y la representación institucional.",
                        "La jornada deportiva reunió a estudiantes de distintas áreas académicas en una agenda que integró competencia, convivencia y representación del instituto en un entorno dinámico.",
                        "Además del componente recreativo, la actividad fue concebida como una extensión de la formación integral, destacando valores como liderazgo, compromiso, respeto y trabajo colaborativo."
                    ],
                    image: {
                        src: "img/news/noticia-principal.jpg",
                        alt: "Evento deportivo escolar"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-2.jpg",
                            alt: "Participación de estudiantes en jornada deportiva"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-3.jpg",
                            alt: "Delegación estudiantil en actividad intercolegial"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-4.jpg",
                            alt: "Encuentro deportivo institucional"
                        }
                    ]
                },
                {
                    id: "feria-academica-2026",
                    badgeLabel: "Nueva",
                    category: "Institucional",
                    date: "10 Ene 2026",
                    title: "Feria académica",
                    excerpt: "Presentación de proyectos desarrollados por estudiantes de distintas áreas formativas.",
                    body: [
                        "La feria académica permitió mostrar proyectos, ejercicios técnicos y propuestas desarrolladas por el estudiantado en distintas áreas del instituto.",
                        "Cada exposición fue preparada para comunicar ideas con claridad, evidenciar dominio conceptual y fortalecer la relación entre teoría, práctica y comunicación pública.",
                        "La actividad también funcionó como una vitrina institucional del esfuerzo docente y del nivel de compromiso que sostiene el trabajo académico dentro del colegio."
                    ],
                    image: {
                        src: "img/news/noticia-2.jpg",
                        alt: "Feria académica"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-2.jpg",
                            alt: "Muestra principal de feria académica"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "jornada-cultural-2026",
                    badgeLabel: "Especial",
                    category: "Cultura",
                    date: "07 Ene 2026",
                    title: "Jornada cultural",
                    excerpt: "Actividades artísticas y expresivas que fortalecen identidad, creatividad y participación.",
                    body: [
                        "La jornada cultural reunió expresiones artísticas y espacios de participación que fortalecen la identidad institucional y el desarrollo creativo del estudiantado.",
                        "Las presentaciones y actividades promovieron una experiencia formativa orientada al aprecio por el arte, la comunicación y la construcción de comunidad.",
                        "El evento confirmó que la vida cultural también es parte esencial de una formación educativa amplia, sensible y conectada con el entorno."
                    ],
                    image: {
                        src: "img/news/noticia-3.jpg",
                        alt: "Jornada cultural"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-3.jpg",
                            alt: "Actividad cultural institucional"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-2.jpg",
                            alt: "Participación artística estudiantil"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "reconocimiento-academico-2026",
                    badgeLabel: "Destacado",
                    category: "Logros",
                    date: "04 Ene 2026",
                    title: "Reconocimiento académico",
                    excerpt: "Estudiantes destacados reciben reconocimiento por su rendimiento y compromiso institucional.",
                    body: [
                        "El reconocimiento académico destacó el esfuerzo sostenido, la constancia y el compromiso de estudiantes con excelente desempeño dentro del instituto.",
                        "La actividad también permitió resaltar el acompañamiento de familias y docentes, subrayando que el rendimiento sobresaliente es resultado de una construcción compartida.",
                        "Más allá de la premiación, esta publicación busca poner en valor la cultura de mérito, disciplina y visión de futuro que impulsa la institución."
                    ],
                    image: {
                        src: "img/news/noticia-4.jpg",
                        alt: "Reconocimiento académico"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-4.jpg",
                            alt: "Entrega de reconocimiento académico"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "visita-educativa-2026",
                    badgeLabel: "Cobertura",
                    category: "Visitas",
                    date: "02 Ene 2026",
                    title: "Visita educativa",
                    excerpt: "Espacios de aprendizaje fuera del aula que conectan teoría, práctica y contexto real.",
                    body: [
                        "Las visitas educativas continúan ampliando la experiencia académica mediante escenarios reales de observación, análisis y aplicación práctica.",
                        "Estas actividades permiten relacionar contenidos curriculares con contextos concretos, fortaleciendo la comprensión y la motivación del estudiantado.",
                        "La publicación recoge el valor institucional de aprender fuera del aula sin perder el sentido pedagógico y formativo de cada salida."
                    ],
                    image: {
                        src: "img/news/noticia-5.jpg",
                        alt: "Visita educativa"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-5.jpg",
                            alt: "Grupo en visita educativa"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-3.jpg",
                            alt: "Recorrido formativo"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "vida-estudiantil-2025",
                    badgeLabel: "Vida estudiantil",
                    category: "Vida estudiantil",
                    date: "28 Dic 2025",
                    title: "Vida estudiantil",
                    excerpt: "Actividades institucionales continúan fortaleciendo participación, identidad y convivencia.",
                    body: [
                        "La vida estudiantil del Instituto Técnico Morazán se construye día a día mediante actividades que fortalecen convivencia, participación e identidad colectiva.",
                        "Cada jornada institucional ofrece oportunidades para relacionarse, compartir experiencias y consolidar el sentido de pertenencia a la comunidad educativa.",
                        "Esta noticia resume una visión más amplia del ambiente estudiantil y del valor que tienen estos espacios dentro de una formación integral."
                    ],
                    image: {
                        src: "img/news/noticia-6.jpg",
                        alt: "Vida estudiantil"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-6.jpg",
                            alt: "Actividad de vida estudiantil"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                }
            ]
        },
        {
            pageNumber: 2,
            label: "Página 2",
            updatedAt: "20 Dic 2025",
            items: [
                {
                    id: "comunidad-educativa-2025",
                    badgeLabel: "Archivo",
                    category: "Comunidad",
                    date: "20 Dic 2025",
                    title: "Comunidad educativa",
                    excerpt: "Encuentros y jornadas que consolidan el vínculo entre estudiantes, familias y docentes.",
                    body: [
                        "Las jornadas de comunidad educativa fortalecen la relación entre estudiantes, familias y personal docente en espacios de cercanía y comunicación institucional.",
                        "Estas actividades permiten compartir avances, experiencias y perspectivas que enriquecen la vida escolar y refuerzan el acompañamiento educativo.",
                        "La noticia documenta uno de los pilares del instituto: construir una comunidad sólida, cercana y comprometida con el desarrollo formativo del estudiantado."
                    ],
                    image: {
                        src: "img/news/noticia-7.jpg",
                        alt: "Comunidad educativa"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-7.jpg",
                            alt: "Encuentro de comunidad educativa"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "cierre-academico-2025",
                    badgeLabel: "Cierre",
                    category: "Institucional",
                    date: "18 Dic 2025",
                    title: "Cierre académico del período",
                    excerpt: "El instituto concluye el período lectivo con balance positivo en formación, actividades y rendimiento.",
                    body: [
                        "El cierre académico del período permitió realizar un balance general del trabajo desarrollado durante el año lectivo en los distintos espacios institucionales.",
                        "La evaluación integró resultados académicos, actividades complementarias y procesos formativos que reflejan el compromiso del colegio con una educación integral.",
                        "La publicación busca resumir los principales logros del período y proyectar con claridad los siguientes pasos del trabajo institucional."
                    ],
                    image: {
                        src: "img/news/noticia-2.jpg",
                        alt: "Cierre académico del período"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-2.jpg",
                            alt: "Momento de cierre institucional"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-4.jpg",
                            alt: "Resumen visual del cierre académico"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "proyecto-tecnologico-2025",
                    badgeLabel: "Proyecto",
                    category: "Tecnología",
                    date: "14 Dic 2025",
                    title: "Proyecto tecnológico estudiantil",
                    excerpt: "Estudiantes presentan soluciones aplicadas con enfoque técnico, creativo y funcional.",
                    body: [
                        "El proyecto tecnológico estudiantil puso en evidencia la capacidad del alumnado para desarrollar propuestas aplicadas con enfoque técnico y visión práctica.",
                        "El ejercicio integró creatividad, presentación formal y dominio de herramientas, reforzando competencias clave para su formación académica y profesional.",
                        "La noticia presenta el proyecto como parte de la cultura institucional de aprender haciendo y comunicar resultados con claridad."
                    ],
                    image: {
                        src: "img/news/noticia-principal.jpg",
                        alt: "Proyecto tecnológico estudiantil"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-principal.jpg",
                            alt: "Presentación de proyecto tecnológico"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-2.jpg",
                            alt: "Estudiantes junto a prototipo tecnológico"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-3.jpg",
                            alt: "Detalle del trabajo técnico presentado"
                        }
                    ]
                }
            ]
        },
        {
            pageNumber: 3,
            label: "Página 3",
            updatedAt: "10 Dic 2025",
            items: [
                {
                    id: "acto-civico-2025",
                    badgeLabel: "Archivo",
                    category: "Cívica",
                    date: "10 Dic 2025",
                    title: "Acto cívico institucional",
                    excerpt: "Una jornada orientada al fortalecimiento de valores, identidad nacional y participación estudiantil.",
                    body: [
                        "El acto cívico institucional reunió a la comunidad educativa en una jornada dedicada al fortalecimiento de valores, respeto y sentido de identidad nacional.",
                        "La actividad integró participación estudiantil, orden ceremonial y una puesta en escena coherente con el carácter formativo del instituto.",
                        "La publicación busca registrar el valor simbólico y pedagógico de estos encuentros dentro de la vida escolar."
                    ],
                    image: {
                        src: "img/news/noticia-3.jpg",
                        alt: "Acto cívico institucional"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-3.jpg",
                            alt: "Momento del acto cívico"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                },
                {
                    id: "semana-tecnica-2025",
                    badgeLabel: "Especial",
                    category: "Carreras técnicas",
                    date: "06 Dic 2025",
                    title: "Semana técnica",
                    excerpt: "Actividades y demostraciones que visibilizan el trabajo formativo de las carreras técnicas del instituto.",
                    body: [
                        "La semana técnica permitió visibilizar proyectos, demostraciones y experiencias vinculadas con las diferentes áreas de formación técnica del instituto.",
                        "Cada espacio fue pensado para mostrar capacidades, fortalecer la proyección académica y acercar a la comunidad a los procesos formativos que desarrolla el colegio.",
                        "Esta cobertura editorial presenta la semana técnica como una síntesis del espíritu práctico, profesional y formativo que distingue a la institución."
                    ],
                    image: {
                        src: "img/news/noticia-5.jpg",
                        alt: "Semana técnica"
                    },
                    gallery: [
                        {
                            enabled: true,
                            src: "img/news/noticia-5.jpg",
                            alt: "Demostración de semana técnica"
                        },
                        {
                            enabled: true,
                            src: "img/news/noticia-principal-4.jpg",
                            alt: "Actividad técnica institucional"
                        },
                        {
                            enabled: false,
                            src: "",
                            alt: ""
                        }
                    ]
                }
            ]
        }
    ]
};
