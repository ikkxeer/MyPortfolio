export type PortfolioLanguage = 'es' | 'ca' | 'en'

interface Translation {
  es: string
  ca: string
  en: string
}

function localized(es: string, ca: string, en: string): Translation {
  return { es, ca, en }
}

const profile = {
  name: 'Iker Aramburu Muñoz',
  github: 'https://github.com/ikkxeer',
  linkedin: 'https://www.linkedin.com/in/iker-aramburu/',
  role: localized(
    'Desarrollador de aplicaciones multiplataforma',
    'Desenvolupador d’aplicacions multiplataforma',
    'Cross-platform application developer',
  ),
  bio: localized(
    '¡Hola! Soy Iker. Me encanta la tecnología y todo lo que tiene que ver con el desarrollo de software. Disfruto creando soluciones nuevas y siempre estoy aprendiendo para mejorar mis habilidades.',
    'Hola! Soc l’Iker. M’encanta la tecnologia i tot el que està relacionat amb el desenvolupament de programari. M’agrada crear solucions noves i aprendre constantment per millorar les meves habilitats.',
    'Hi! I’m Iker. I love technology and everything related to software development. I enjoy creating new solutions and I’m constantly learning to improve my skills.',
  ),
}

const projects = [
  {
    name: 'PSCacheCleaner',
    tags: ['PowerShell'],
    url: 'https://github.com/ikkxeer/PSCacheCleaner',
    description: localized(
      'Este script de PowerShell limpia las carpetas temporales y las cachés de aplicaciones, DNS y Microsoft Store en Windows. Incluye una barra de progreso, elevación de privilegios y opciones para actualizar con WinGet o Windows Update. Lo creé para automatizar tareas que repetía a mano en soporte técnico.',
      'Aquest script de PowerShell neteja les carpetes temporals i les memòries cau de les aplicacions, del DNS i de la Microsoft Store al Windows. Inclou una barra de progrés, elevació de privilegis i opcions per actualitzar amb WinGet o Windows Update. Va néixer de la necessitat d’automatitzar tasques repetitives que feia a mà en entorns de suport.',
      'This PowerShell script cleans Windows temporary folders, application caches, the DNS cache and the Microsoft Store cache. It includes a progress bar, privilege elevation and options to update via WinGet or Windows Update. I built it to automate repetitive tasks I used to perform manually in support environments.',
    ),
  },
  {
    name: 'Gestor-Alumnos',
    tags: ['Java', 'SQL'],
    url: 'https://github.com/ikkxeer/Gestor-Alumnos',
    description: localized(
      'Aplicación de consola en Java conectada a una base de datos SQL. Permite dar de alta, consultar, modificar y eliminar alumnos. El proyecto pone en práctica la programación orientada a objetos, las consultas parametrizadas y el diseño de un pequeño sistema de gestión educativa.',
      'Aplicació de consola en Java connectada a una base de dades SQL. Permet donar d’alta, consultar, modificar i eliminar alumnes. El projecte posa en pràctica la programació orientada a objectes, les consultes parametritzades i el disseny d’un petit sistema de gestió educativa.',
      'A Java console application connected to an SQL database. It lets you create, look up, update and delete student records. The project puts object-oriented programming and parameterized queries into practice in a small school management system.',
    ),
  },
  {
    name: 'CraftCoding',
    tags: ['Python'],
    url: 'https://github.com/ikkxeer/CraftCoding',
    description: localized(
      'CraftCoding propone retos para practicar programación sin depender de asistentes de IA. Su entorno invita a pensar una solución, experimentar y aprender del proceso. El objetivo es reforzar el razonamiento lógico y la creatividad antes de buscar respuestas automáticas.',
      'CraftCoding proposa reptes per practicar programació sense dependre d’assistents d’IA. El seu entorn anima a pensar una solució, experimentar i aprendre del procés. L’objectiu és reforçar el raonament lògic i la creativitat abans de buscar respostes automàtiques.',
      'CraftCoding offers challenges for practicing programming without relying on AI assistants. Its environment encourages you to work out a solution, experiment and learn from the process. The goal is to develop logical reasoning and creativity before turning to automated answers.',
    ),
  },
  {
    name: 'NE-Launcher',
    tags: ['Python'],
    url: 'https://github.com/ikkxeer/NE-Launcher',
    description: localized(
      'NE-Launcher automatiza la creación de proyectos con Node.js y Express. Prepara las carpetas, instala las dependencias esenciales y crea los archivos de configuración iniciales. Así cada nueva API REST o prototipo parte de una estructura conocida.',
      'NE-Launcher automatitza la creació de projectes amb Node.js i Express. Prepara les carpetes, instal·la les dependències essencials i crea els fitxers de configuració inicials. Així cada nova API REST o prototip parteix d’una estructura coneguda.',
      'NE-Launcher automates the setup of Node.js and Express projects. It prepares the folders, essential dependencies and initial configuration files, saving time and providing a consistent starting point for REST APIs and prototypes.',
    ),
  },
  {
    name: 'MultiTool-Virtualbox',
    tags: ['Python'],
    url: 'https://github.com/ikkxeer/MultiTool-Virtualbox',
    description: localized(
      'MultiTool-Virtualbox reúne tareas repetitivas de VirtualBox como crear discos, asignarlos a máquinas virtuales y ejecutar operaciones por lotes. Está pensado para laboratorios y entornos de pruebas en los que hay que desplegar varias máquinas con la misma configuración.',
      'MultiTool-Virtualbox centralitza tasques repetitives de VirtualBox com ara crear discs, assignar-los a màquines virtuals i executar operacions per lots. S’adreça a laboratoris i entorns de prova on cal desplegar diverses màquines amb la mateixa configuració.',
      'MultiTool-Virtualbox brings together repetitive VirtualBox tasks such as creating disks, attaching them to virtual machines and running batch operations. It is designed for labs and test environments that need to deploy several machines with the same configuration.',
    ),
  },
  {
    name: 'PS-SilentInstallerDetector',
    tags: ['PowerShell'],
    url: 'https://github.com/ikkxeer/PS-SilentInstallerDetector',
    description: localized(
      'PS-SilentInstallerDetector supervisa las instalaciones de software en Windows y avisa cuando detecta instaladores silenciosos o comportamientos sospechosos. Ayuda a los equipos de soporte y administración de sistemas a auditar qué se instala sin intervención del usuario.',
      'PS-SilentInstallerDetector supervisa les instal·lacions de programari al Windows i avisa quan detecta instal·ladors silenciosos o comportaments sospitosos. Ajuda els equips de suport i administració de sistemes a auditar què s’instal·la sense intervenció de l’usuari.',
      'PS-SilentInstallerDetector monitors software installations on Windows and alerts you when it detects silent installers or suspicious behavior. It helps support teams and system administrators audit what is installed without user interaction.',
    ),
  },
]

const technologies = [
  {
    name: 'React',
    symbol: '⚛',
    description: localized(
      'Componentes reutilizables para interfaces interactivas.',
      'Components reutilitzables per a interfícies interactives.',
      'Reusable components for interactive interfaces.',
    ),
  },
  {
    name: 'TypeScript',
    symbol: 'TS',
    description: localized(
      'Tipos para definir los datos y detectar errores de JavaScript antes de ejecutar el código.',
      'Tipus per definir dades i detectar errors de JavaScript abans d’executar el codi.',
      'Types for describing data and catching JavaScript errors before the code runs.',
    ),
  },
  {
    name: 'Java',
    symbol: '☕',
    description: localized(
      'Programación orientada a objetos, lógica de negocio y acceso a datos.',
      'Programació orientada a objectes, lògica de negoci i accés a dades.',
      'Object-oriented programming, business logic and data access.',
    ),
  },
  {
    name: 'Python',
    symbol: 'Py',
    description: localized(
      'Scripts y utilidades para automatizar tareas y crear herramientas.',
      'Scripts i utilitats per automatitzar tasques i crear eines.',
      'Scripts and utilities for automating tasks and building tools.',
    ),
  },
  {
    name: 'PowerShell',
    symbol: '>_',
    description: localized(
      'Automatización de tareas de soporte y administración en Windows.',
      'Automatització de tasques de suport i administració al Windows.',
      'Automation for Windows support and administration tasks.',
    ),
  },
  {
    name: 'SQL',
    symbol: '▤',
    description: localized(
      'Consultas para organizar, leer y actualizar datos relacionales.',
      'Consultes per organitzar, llegir i actualitzar dades relacionals.',
      'Queries for organizing, reading and updating relational data.',
    ),
  },
  {
    name: 'JavaScript',
    symbol: 'JS',
    description: localized(
      'Lógica e interacciones que responden a las acciones del visitante.',
      'Lògica i interaccions que responen a les accions del visitant.',
      'Logic and interactions that respond to visitor actions.',
    ),
  },
  {
    name: 'HTML',
    symbol: '</>',
    description: localized(
      'Estructura semántica del contenido de una página web.',
      'Estructura semàntica del contingut d’una pàgina web.',
      'Semantic structure for the content of a web page.',
    ),
  },
  {
    name: 'CSS',
    symbol: '{}',
    description: localized(
      'Composición visual, animación y diseño adaptable para la web.',
      'Composició visual, animació i disseny adaptable per al web.',
      'Visual layout, animation and responsive web design.',
    ),
  },
  {
    name: 'Node.js',
    symbol: '⬡',
    description: localized(
      'Entorno para ejecutar JavaScript en el servidor.',
      'Entorn per executar JavaScript al servidor.',
      'A runtime for running JavaScript on the server.',
    ),
  },
  {
    name: 'Express',
    symbol: 'ex',
    description: localized(
      'Rutas y servicios HTTP para construir API con Node.js.',
      'Rutes i serveis HTTP per crear API amb Node.js.',
      'Routes and HTTP services for building APIs with Node.js.',
    ),
  },
  {
    name: 'Angular',
    symbol: 'A',
    description: localized(
      'Componentes y herramientas para desarrollar aplicaciones web.',
      'Components i eines per desenvolupar aplicacions web.',
      'Components and tools for developing web applications.',
    ),
  },
]

interface JourneyEntry {
  date: Translation | string
  title: Translation
  description: Translation
  place?: string
}

const journey: JourneyEntry[] = [
  {
    date: '2022',
    title: localized('Hola, mundo', 'Hola, món', 'Hello, world'),
    description: localized(
      'En el grado medio de Sistemas Microinformáticos y Redes empecé a programar en Python con los retos de mi profesor Raul López. Mi tutor de prácticas, Marc Vidal, me enseñó PowerShell y escribí scripts para automatizar tareas de la empresa.',
      'Al grau mitjà de Sistemes Microinformàtics i Xarxes vaig començar a programar en Python amb els reptes del meu professor Raul López. El meu tutor de pràctiques, Marc Vidal, em va ensenyar PowerShell i vaig escriure scripts per automatitzar tasques de l’empresa.',
      'During my vocational course in microcomputer systems and networks, my teacher Raul López helped me start programming through Python challenges. My internship tutor, Marc Vidal, introduced me to PowerShell, and I wrote scripts to automate tasks for the company.',
    ),
  },
  {
    date: localized(
      'Junio de 2023 – marzo de 2024',
      'Juny de 2023 – març de 2024',
      'June 2023 – March 2024',
    ),
    place: 'Col·legi Oficial de Metges de Barcelona',
    title: localized(
      'Estudiante en prácticas',
      'Estudiant en pràctiques',
      'Intern',
    ),
    description: localized(
      'Soporte técnico centrado en Windows Server y la gestión de sistemas de impresión.',
      'Suport tècnic centrat en Windows Server i la gestió de sistemes d’impressió.',
      'Technical support focused on Windows Server and print systems management.',
    ),
  },
  {
    date: localized(
      'Julio – agosto de 2024',
      'Juliol – agost de 2024',
      'July – August 2024',
    ),
    place: 'Col·legi Oficial de Metges de Barcelona',
    title: localized(
      'Administrador de sistemas y redes',
      'Administrador de sistemes i xarxes',
      'Systems and network administrator',
    ),
    description: localized(
      'Administración de entornos Ubuntu y virtualización de sistemas operativos en un entorno corporativo.',
      'Administració d’entorns Ubuntu i virtualització de sistemes operatius en un entorn corporatiu.',
      'Ubuntu administration and operating system virtualization in a corporate environment.',
    ),
  },
  {
    date: '2024/25',
    title: localized(
      'Desarrollo de Aplicaciones Multiplataforma (DAM)',
      'Desenvolupament d’Aplicacions Multiplataforma (DAM)',
      'Cross-platform application development (DAM)',
    ),
    description: localized(
      'Empecé el grado superior de DAM, donde profundicé en la lógica de programación con Java y en las bases de datos.',
      'Vaig començar el grau superior de DAM, on vaig aprofundir en la lògica de programació amb Java i en les bases de dades.',
      'I started the higher vocational qualification in cross-platform application development, studying programming logic with Java and working with databases.',
    ),
  },
  {
    date: localized(
      'Septiembre de 2025 – mayo de 2026',
      'Setembre de 2025 – maig de 2026',
      'September 2025 – May 2026',
    ),
    place: 'FLUGE AUDIOVISUALES',
    title: localized(
      'Estudiante en prácticas',
      'Estudiant en pràctiques',
      'Intern',
    ),
    description: localized(
      'Especialización en Clonezilla, virtualización de sistemas operativos y soporte técnico audiovisual.',
      'Especialització en Clonezilla, virtualització de sistemes operatius i suport tècnic audiovisual.',
      'Specialized in Clonezilla, operating system virtualization and audiovisual technical support.',
    ),
  },
  {
    // The original portfolio lists this position as ongoing.
    date: localized(
      'Enero de 2026 – actualidad',
      'Gener de 2026 – actualitat',
      'January 2026 – present',
    ),
    place: 'NARGY',
    title: localized('Acomodador', 'Acomodador', 'Usher'),
    description: localized(
      'Trabajo en equipo y comunicación directa en eventos presenciales.',
      'Treball en equip i comunicació directa en esdeveniments presencials.',
      'Teamwork and direct communication at live events.',
    ),
  },
  {
    date: '2026',
    title: localized(
      'Descubrir el desarrollo web',
      'Descobrir el desenvolupament web',
      'Discovering web development',
    ),
    description: localized(
      'En el segundo año de DAM descubrí el desarrollo web. Exploré el frontend con React y Angular y el backend con Node.js y Express.',
      'Al segon any de DAM vaig descobrir el desenvolupament web. Vaig explorar el frontend amb React i Angular i el backend amb Node.js i Express.',
      'In my second year of DAM, I discovered web development. I explored frontend development with React and Angular and backend development with Node.js and Express.',
    ),
  },
]

const subjects = [
  {
    title: localized(
      '0488 · Desarrollo de interfaces',
      '0488 · Desenvolupament d’interfícies',
      '0488 · Interface development',
    ),
    description: localized(
      'Diseño de interfaces gráficas, usabilidad, componentes personalizados, pruebas con NUnit y generación de informes y documentación de ayuda.',
      'Disseny d’interfícies gràfiques, usabilitat, components personalitzats, proves amb NUnit i generació d’informes i documentació d’ajuda.',
      'Graphical interface design, usability, custom components, NUnit testing, reports and help documentation.',
    ),
  },
  {
    title: localized(
      '0489 · Programación multimedia y dispositivos móviles',
      '0489 · Programació multimèdia i dispositius mòbils',
      '0489 · Multimedia programming and mobile devices',
    ),
    description: localized(
      'Aplicaciones nativas para Android, recursos multimedia, motores de juegos y sensores.',
      'Aplicacions natives per a Android, recursos multimèdia, motors de jocs i sensors.',
      'Native Android applications, multimedia resources, game engines and sensors.',
    ),
  },
  {
    title: localized('0492 · Proyecto', '0492 · Projecte', '0492 · Project'),
    description: localized(
      'Planificación, diseño y ejecución de un proyecto de software integrando tecnologías, metodologías ágiles y gestión del ciclo de vida.',
      'Planificació, disseny i execució d’un projecte de programari integrant tecnologies, metodologies àgils i gestió del cicle de vida.',
      'Planning, designing and carrying out a software project using multiple technologies, agile methods and lifecycle management.',
    ),
  },
  {
    title: localized(
      '0490 · Programación de servicios y procesos',
      '0490 · Programació de serveis i processos',
      '0490 · Services and processes programming',
    ),
    description: localized(
      'Programación multihilo y multiproceso, comunicación mediante sockets, servicios de red, protocolos de seguridad y criptografía.',
      'Programació multifil i multiprocés, comunicació mitjançant sòcols, serveis de xarxa, protocols de seguretat i criptografia.',
      'Multithreading, multiprocessing, socket communication, network services, security protocols and cryptography.',
    ),
  },
  {
    title: localized(
      'OPT · Desarrollo web en entorno cliente',
      'OPT · Desenvolupament web en entorn client',
      'OPT · Client-side web development',
    ),
    description: localized(
      'Aplicaciones web con React o Angular, manipulación del DOM y consumo de API.',
      'Aplicacions web amb React o Angular, manipulació del DOM i consum d’API.',
      'Web applications with React or Angular, DOM manipulation and working with APIs.',
    ),
  },
]

const skills = [
  {
    title: localized(
      'Resolución de problemas',
      'Resolució de problemes',
      'Problem solving',
    ),
    description: localized(
      'Cuando encuentro un fallo, me gusta investigar qué lo causa. Descompongo los problemas complejos en partes pequeñas hasta dar con una solución limpia.',
      'Quan trobo un error, m’agrada investigar què el provoca. Descomponc els problemes complexos en parts petites fins que trobo una solució neta.',
      'When I run into a bug, I like to find out what caused it. I break complex problems into smaller parts and look for a clean solution.',
    ),
  },
  {
    title: localized('Trabajo en equipo', 'Treball en equip', 'Teamwork'),
    description: localized(
      'Cada compañero ve el código desde un ángulo distinto. Me gusta explicar mis ideas con claridad, escuchar sugerencias y ayudar cuando alguien lo necesita.',
      'Cada company veu el codi des d’un angle diferent. M’agrada explicar les meves idees amb claredat, escoltar suggeriments i ajudar quan algú ho necessita.',
      'Each teammate sees the code from a different angle. I enjoy explaining my ideas clearly, listening to feedback and helping when someone needs a hand.',
    ),
  },
  {
    title: localized(
      'Aprendizaje continuo',
      'Aprenentatge continu',
      'Continuous learning',
    ),
    description: localized(
      'Disfruto aprendiendo a usar herramientas, lenguajes y entornos nuevos y adaptándome a los cambios de la tecnología.',
      'Gaudeixo aprenent a fer servir eines, llenguatges i entorns nous i adaptant-me als canvis de la tecnologia.',
      'I enjoy learning my way around new tools, languages and environments as technology changes.',
    ),
  },
]

interface Entry {
  title: string
  description: string
}

export interface Portfolio {
  name: string
  bio: string
  role: string
  github: string
  linkedin: string
  projects: { name: string; description: string; tags: string[]; url: string }[]
  tech: { name: string; symbol: string; description: string }[]
  journey: (Entry & { date: string; place?: string })[]
  subjects: Entry[]
  skills: Entry[]
}

export function portfolio(lang: PortfolioLanguage): Portfolio {
  const entry = (item: { title: Translation; description: Translation }) => ({
    title: item.title[lang],
    description: item.description[lang],
  })
  return {
    ...profile,
    bio: profile.bio[lang],
    role: profile.role[lang],
    projects: projects.map((project) => ({
      ...project,
      description: project.description[lang],
    })),
    tech: technologies.map((technology) => ({
      ...technology,
      description: technology.description[lang],
    })),
    journey: journey.map((item) => ({
      ...entry(item),
      date: typeof item.date === 'string' ? item.date : item.date[lang],
      place: item.place,
    })),
    subjects: subjects.map(entry),
    skills: skills.map(entry),
  }
}
