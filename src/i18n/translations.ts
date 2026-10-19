import type { Locale } from '@/data/site';

export interface TranslationDictionary {
  meta: {
    siteTitle: string;
    homeTitle: string;
    homeDescription: string;
    reposTitle: string;
    reposDescription: string;
    modelsTitle: string;
    modelsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
  };
  nav: {
    home: string;
    repos: string;
    models: string;
    about: string;
    skipToContent: string;
    mainNavAria: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
    languageSwitchAria: string;
    switchToEnglish: string;
    switchToPolish: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    role: string;
    statement: string;
    substatement: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disciplines: readonly string[];
  };
  home: {
    recentWorkTitle: string;
    recentWorkSubtitle: string;
    viewAllRepos: string;
    viewAllModels: string;
    badgeRepo: string;
    badgeModel: string;
    emptyRecentTitle: string;
    emptyRecentDescription: string;
    focusAreasTitle: string;
    focusAreasSubtitle: string;
    focusAreas: readonly {
      code: string;
      title: string;
      description: string;
    }[];
  };
  repos: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchAria: string;
    filterLanguageLabel: string;
    filterAllLanguages: string;
    sortLabel: string;
    sortActivity: string;
    sortStars: string;
    sortName: string;
    resultsCount: string;
    noDescription: string;
    languageFallback: string;
    lastPushLabel: string;
    createdLabel: string;
    starsLabel: string;
    openRepoAria: string;
    viewOnGithub: string;
    emptySearchTitle: string;
    emptySearchDescription: string;
    resetFilters: string;
    emptyReposTitle: string;
    emptyReposDescription: string;
    apiWarningBanner: string;
    syncNote: string;
  };
  models: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterCategoryLabel: string;
    allCategories: string;
    publishedLabel: string;
    viewDetails: string;
    interactiveBadge: string;
    downloadBadge: string;
    emptyTitle: string;
    emptyDescription: string;
    emptyHint: string;
    backToModels: string;
    viewerSectionTitle: string;
    viewerInstructions: string;
    viewerResetCamera: string;
    viewerAutoRotate: string;
    viewerFullscreen: string;
    viewerLoading: string;
    viewerErrorTitle: string;
    viewerErrorDescription: string;
    gallerySectionTitle: string;
    galleryThumbnailAria: string;
    galleryPrevAria: string;
    galleryNextAria: string;
    specsSectionTitle: string;
    specSoftware: string;
    specPrinter: string;
    specMaterial: string;
    specPrintTime: string;
    specVersion: string;
    specLicense: string;
    specPublished: string;
    specExternalRepo: string;
    downloadsSectionTitle: string;
    downloadsSubtitle: string;
    downloadFileAria: string;
    relatedModelsTitle: string;
  };
  about: {
    eyebrow: string;
    title: string;
    role: string;
    introLead: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    areasTitle: string;
    areas: readonly {
      title: string;
      items: readonly string[];
    }[];
    principlesTitle: string;
    principles: readonly {
      title: string;
      description: string;
    }[];
    contactTitle: string;
    contactSubtitle: string;
    emailLabel: string;
    githubLabel: string;
    sendEmailCta: string;
    openGithubCta: string;
  };
  footer: {
    tagline: string;
    navigationHeading: string;
    contactHeading: string;
    rights: string;
    builtWith: string;
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en: {
    meta: {
      siteTitle: 'Szymon Potyra — Maker',
      homeTitle: 'Szymon Potyra — Maker | Software, Electronics & 3D Design',
      homeDescription:
        'Personal portfolio of Szymon Potyra — Maker building digital tools, embedded electronics, CAD models, and 3D-printed objects.',
      reposTitle: 'Repositories — Szymon Potyra',
      reposDescription:
        'Open-source software, firmware, and hardware utility repositories by Szymon Potyra.',
      modelsTitle: '3D Models & CAD — Szymon Potyra',
      modelsDescription:
        'Functional CAD designs, enclosures, mechanical parts, and 3D printing projects by Szymon Potyra.',
      aboutTitle: 'About — Szymon Potyra',
      aboutDescription:
        'About Szymon Potyra — independent maker exploring software engineering, embedded hardware, CAD, and physical fabrication.',
    },
    nav: {
      home: 'Home',
      repos: 'Repositories',
      models: '3D Models',
      about: 'About',
      skipToContent: 'Skip to main content',
      mainNavAria: 'Primary navigation',
      mobileMenuOpen: 'Open navigation menu',
      mobileMenuClose: 'Close navigation menu',
      languageSwitchAria: 'Language selector',
      switchToEnglish: 'Switch language to English',
      switchToPolish: 'Przełącz język na polski',
    },
    hero: {
      eyebrow: 'PORTFOLIO // DIGITAL & PHYSICAL FABRICATION',
      heading: 'Szymon Potyra.',
      role: 'Maker',
      statement: 'Building things, digital and physical.',
      substatement:
        'Exploring the intersection of software, embedded electronics, parametric CAD, and 3D printing — turning ideas into working tools and tangible objects.',
      ctaPrimary: 'Explore Work',
      ctaSecondary: 'GitHub Profile',
      disciplines: ['Software', 'Electronics', 'Parametric CAD', '3D Printing'],
    },
    home: {
      recentWorkTitle: 'Recent Work',
      recentWorkSubtitle:
        'Latest public code repositories and 3D design projects, sorted chronologically.',
      viewAllRepos: 'All Repositories',
      viewAllModels: '3D Models Gallery',
      badgeRepo: 'Repository',
      badgeModel: '3D Model',
      emptyRecentTitle: 'No published projects found right now',
      emptyRecentDescription:
        'Public repositories and 3D models will appear here automatically once synchronized.',
      focusAreasTitle: 'Craft & Disciplines',
      focusAreasSubtitle:
        'Working across code, circuit boards, and mechanical tolerances.',
      focusAreas: [
        {
          code: '01',
          title: 'Software & Tooling',
          description:
            'Desktop utilities, web interfaces, automation scripts, and system tools built for reliability and clarity.',
        },
        {
          code: '02',
          title: 'Embedded & Electronics',
          description:
            'Microcontroller firmware (ESP32, RP2040), serial protocols, sensors, displays, and custom hardware interfaces.',
        },
        {
          code: '03',
          title: 'CAD & 3D Fabrication',
          description:
            'Functional enclosures, mechanical mounts, and precision-fitted parts designed for FDM additive manufacturing.',
        },
      ],
    },
    repos: {
      eyebrow: 'OPEN SOURCE // CODE & FIRMWARE',
      title: 'Repositories',
      subtitle:
        'Public non-forked repositories fetched automatically from GitHub at build time.',
      searchPlaceholder: 'Search by name, description, or topic...',
      searchAria: 'Search repositories by name, description, or topic',
      filterLanguageLabel: 'Language',
      filterAllLanguages: 'All languages',
      sortLabel: 'Sort by',
      sortActivity: 'Recent activity',
      sortStars: 'Most stars',
      sortName: 'Name (A–Z)',
      resultsCount: 'repositories shown',
      noDescription: 'No repository description provided.',
      languageFallback: 'Code',
      lastPushLabel: 'Last push',
      createdLabel: 'Created',
      starsLabel: 'Stars',
      openRepoAria: 'Open repository on GitHub:',
      viewOnGithub: 'View on GitHub',
      emptySearchTitle: 'No matching repositories',
      emptySearchDescription:
        'No repositories match your current search query or language filter.',
      resetFilters: 'Reset filters',
      emptyReposTitle: 'No public repositories available',
      emptyReposDescription:
        'Public repositories could not be retrieved right now or none have been published yet.',
      apiWarningBanner:
        'GitHub API was unreachable during the last build. Showing verified fallback state.',
      syncNote: 'Synchronized automatically via GitHub REST API.',
    },
    models: {
      eyebrow: 'PARAMETRIC CAD // ADDITIVE MANUFACTURING',
      title: '3D Models',
      subtitle:
        'CAD designs, hardware enclosures, and functional 3D-printed objects with interactive GLB inspection.',
      filterCategoryLabel: 'Category',
      allCategories: 'All categories',
      publishedLabel: 'Published',
      viewDetails: 'Inspect 3D Model',
      interactiveBadge: 'Interactive 3D',
      downloadBadge: 'Files Available',
      emptyTitle: '3D model archive is being prepared',
      emptyDescription:
        'CAD enclosures, functional prints, and interactive GLB previews are currently being documented for publication. No placeholder or fabricated models are shown.',
      emptyHint:
        'Meanwhile, explore hardware-related firmware and companion software in the Repositories section.',
      backToModels: 'Back to 3D Models',
      viewerSectionTitle: 'Interactive 3D Preview',
      viewerInstructions:
        'Drag to orbit · Scroll or pinch to zoom · Right-drag to pan',
      viewerResetCamera: 'Reset View',
      viewerAutoRotate: 'Auto-Rotate',
      viewerFullscreen: 'Fullscreen',
      viewerLoading: 'Loading 3D geometry...',
      viewerErrorTitle: '3D preview unavailable',
      viewerErrorDescription:
        'The GLB model file could not be loaded in this browser context. You can still inspect the gallery renders and technical specifications below.',
      gallerySectionTitle: 'Project Gallery',
      galleryThumbnailAria: 'Select gallery image',
      galleryPrevAria: 'Previous image',
      galleryNextAria: 'Next image',
      specsSectionTitle: 'Technical Specifications',
      specSoftware: 'CAD Software',
      specPrinter: 'Printer',
      specMaterial: 'Material',
      specPrintTime: 'Print Time',
      specVersion: 'Revision',
      specLicense: 'License',
      specPublished: 'Published',
      specExternalRepo: 'Companion Repository',
      downloadsSectionTitle: 'Downloadable Files',
      downloadsSubtitle:
        'Geometry and source files verified for printing and modification.',
      downloadFileAria: 'Download file',
      relatedModelsTitle: 'More 3D Models',
    },
    about: {
      eyebrow: 'IDENTITY // MAKER',
      title: 'Szymon Potyra',
      role: 'Maker',
      introLead:
        'I build digital software and physical objects — combining code, electronics, and 3D design to solve practical problems and explore how things work.',
      bioParagraph1:
        'My projects start from curiosity or a concrete everyday need: a custom macro controller on the desk, a lightweight monitoring tool for a home server, a firmware interface for an embedded display, or a 3D-printed enclosure tailored to a specific circuit board.',
      bioParagraph2:
        'Working across software and hardware lets me treat a project as a complete system rather than isolated layers. Writing the microcontroller firmware, building the desktop companion app, and modeling the mechanical housing in CAD all feed into the same object.',
      bioParagraph3:
        'This website is a living catalog of my public code repositories, CAD designs, and hardware experiments.',
      areasTitle: 'What I Work With',
      areas: [
        {
          title: 'Software Development',
          items: [
            'TypeScript, Python, C#, C/C++',
            'Desktop utilities & system companions',
            'Web interfaces & static tooling',
            'Linux & Windows workflows',
          ],
        },
        {
          title: 'Electronics & Embedded',
          items: [
            'ESP32, Raspberry Pi Pico (RP2040)',
            'MicroPython & C++ embedded firmware',
            'USB Serial, Wi-Fi & OTA provisioning',
            'Displays, sensors & custom controllers',
          ],
        },
        {
          title: 'CAD & 3D Printing',
          items: [
            'Parametric mechanical modeling',
            'Electronics enclosures & mounts',
            'Design for FDM 3D printing tolerances',
            'Functional prototypes & repairs',
          ],
        },
      ],
      principlesTitle: 'Approach',
      principles: [
        {
          title: 'Function Before Ornament',
          description:
            'Whether designing a UI or a 3D-printed bracket, clarity, ergonomics, and mechanical honesty come first.',
        },
        {
          title: 'End-to-End Ownership',
          description:
            'Bridging the gap between physical hardware, embedded code, and host software without unnecessary abstraction.',
        },
        {
          title: 'Iterative Craft',
          description:
            'Prototyping fast, measuring real behavior, refining tolerances, and documenting what works.',
        },
      ],
      contactTitle: 'Get in Touch',
      contactSubtitle:
        'Have a question about a repository, a hardware project, or want to exchange notes on making? Reach out directly via email or inspect my work on GitHub.',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
      sendEmailCta: 'Send Email',
      openGithubCta: 'GitHub Profile',
    },
    footer: {
      tagline: 'Building things, digital and physical.',
      navigationHeading: 'Navigation',
      contactHeading: 'Contact',
      rights: 'Szymon Potyra. All rights reserved.',
      builtWith: 'Statically generated with Astro.',
    },
  },
  pl: {
    meta: {
      siteTitle: 'Szymon Potyra — Maker',
      homeTitle: 'Szymon Potyra — Maker | Oprogramowanie, Elektronika i Projekty 3D',
      homeDescription:
        'Osobiste portfolio Szymona Potyry — Makera tworzącego oprogramowanie, elektronikę wbudowaną, modele CAD oraz przedmioty drukowane w 3D.',
      reposTitle: 'Repozytoria — Szymon Potyra',
      reposDescription:
        'Publiczne repozytoria kodu, firmware oraz narzędzi sprzętowych autorstwa Szymona Potyry.',
      modelsTitle: 'Modele 3D i CAD — Szymon Potyra',
      modelsDescription:
        'Funkcjonalne projekty CAD, obudowy elektroniki, części mechaniczne oraz wydruki 3D autorstwa Szymona Potyry.',
      aboutTitle: 'O mnie — Szymon Potyra',
      aboutDescription:
        'O Szymonie Potyrze — niezależnym twórcy łączącym programowanie, elektronikę wbudowaną, projektowanie CAD i druk 3D.',
    },
    nav: {
      home: 'Start',
      repos: 'Repozytoria',
      models: 'Modele 3D',
      about: 'O mnie',
      skipToContent: 'Przejdź do głównej treści',
      mainNavAria: 'Główna nawigacja',
      mobileMenuOpen: 'Otwórz menu nawigacji',
      mobileMenuClose: 'Zamknij menu nawigacji',
      languageSwitchAria: 'Wybór języka',
      switchToEnglish: 'Switch language to English',
      switchToPolish: 'Przełącz język na polski',
    },
    hero: {
      eyebrow: 'PORTFOLIO // PROJEKTY CYFROWE I FIZYCZNE',
      heading: 'Szymon Potyra.',
      role: 'Maker',
      statement: 'Tworzę rzeczy — cyfrowe i fizyczne.',
      substatement:
        'Na styku oprogramowania, elektroniki wbudowanej, parametrycznego CAD i druku 3D — zamieniam pomysły w działające narzędzia oraz namacalne przedmioty.',
      ctaPrimary: 'Zobacz projekty',
      ctaSecondary: 'Profil GitHub',
      disciplines: ['Oprogramowanie', 'Elektronika', 'Parametryczny CAD', 'Druk 3D'],
    },
    home: {
      recentWorkTitle: 'Ostatnie projekty',
      recentWorkSubtitle:
        'Najnowsze publiczne repozytoria kodu oraz projekty 3D, uporządkowane chronologicznie.',
      viewAllRepos: 'Wszystkie repozytoria',
      viewAllModels: 'Galeria modeli 3D',
      badgeRepo: 'Repozytorium',
      badgeModel: 'Model 3D',
      emptyRecentTitle: 'Brak opublikowanych projektów w tej chwili',
      emptyRecentDescription:
        'Publiczne repozytoria i modele 3D pojawią się tutaj automatycznie po synchronizacji.',
      focusAreasTitle: 'Obszary pracy',
      focusAreasSubtitle:
        'Praca łącząca kod, płytki drukowane i tolerancje mechaniczne.',
      focusAreas: [
        {
          code: '01',
          title: 'Oprogramowanie i narzędzia',
          description:
            'Aplikacje desktopowe, interfejsy webowe, skrypty automatyzacji i narzędzia systemowe projektowane z naciskiem na czytelność i niezawodność.',
        },
        {
          code: '02',
          title: 'Systemy wbudowane i elektronika',
          description:
            'Firmware mikrokontrolerów (ESP32, RP2040), komunikacja szeregowa, czujniki, wyświetlacze oraz dedykowane kontrolery sprzętowe.',
        },
        {
          code: '03',
          title: 'CAD i druk 3D',
          description:
            'Funkcjonalne obudowy, uchwyty montażowe i dopasowane elementy mechaniczne projektowane pod technologię FDM.',
        },
      ],
    },
    repos: {
      eyebrow: 'OPEN SOURCE // KOD I FIRMWARE',
      title: 'Repozytoria',
      subtitle:
        'Publiczne repozytoria (z pominięciem forków i archiwów) pobierane automatycznie z GitHuba podczas budowania strony.',
      searchPlaceholder: 'Szukaj po nazwie, opisie lub tagu...',
      searchAria: 'Szukaj repozytoriów po nazwie, opisie lub temacie',
      filterLanguageLabel: 'Język',
      filterAllLanguages: 'Wszystkie języki',
      sortLabel: 'Sortowanie',
      sortActivity: 'Ostatnia aktywność',
      sortStars: 'Liczba gwiazdek',
      sortName: 'Nazwa (A–Z)',
      resultsCount: 'wyświetlonych repozytoriów',
      noDescription: 'Brak opisu repozytorium.',
      languageFallback: 'Kod',
      lastPushLabel: 'Ostatni push',
      createdLabel: 'Utworzono',
      starsLabel: 'Gwiazdki',
      openRepoAria: 'Otwórz repozytorium na GitHubie:',
      viewOnGithub: 'Zobacz na GitHubie',
      emptySearchTitle: 'Brak pasujących repozytoriów',
      emptySearchDescription:
        'Żadne repozytorium nie spełnia obecnych kryteriów wyszukiwania lub filtra języka.',
      resetFilters: 'Resetuj filtry',
      emptyReposTitle: 'Brak dostępnych repozytoriów publicznych',
      emptyReposDescription:
        'Nie udało się pobrać publicznych repozytoriów lub żadne nie zostało jeszcze opublikowane.',
      apiWarningBanner:
        'API GitHuba było niedostępne podczas ostatniego budowania. Wyświetlany jest zweryfikowany stan awaryjny.',
      syncNote: 'Synchronizowane automatycznie przez GitHub REST API.',
    },
    models: {
      eyebrow: 'PARAMETRYCZNY CAD // DRUK 3D',
      title: 'Modele 3D',
      subtitle:
        'Projekty CAD, obudowy urządzeń i funkcjonalne wydruki 3D z interaktywnym podglądem GLB.',
      filterCategoryLabel: 'Kategoria',
      allCategories: 'Wszystkie kategorie',
      publishedLabel: 'Opublikowano',
      viewDetails: 'Otwórz model 3D',
      interactiveBadge: 'Podgląd 3D',
      downloadBadge: 'Pliki do pobrania',
      emptyTitle: 'Archiwum modeli 3D jest w przygotowaniu',
      emptyDescription:
        'Obudowy CAD, funkcjonalne wydruki oraz interaktywne podglądy GLB są obecnie opracowywane do publikacji. Strona nie wyświetla sztucznych ani przykładowych projektów.',
      emptyHint:
        'W międzyczasie możesz sprawdzić firmware i oprogramowanie powiązane ze sprzętem w sekcji Repozytoria.',
      backToModels: 'Powrót do modeli 3D',
      viewerSectionTitle: 'Interaktywny podgląd 3D',
      viewerInstructions:
        'Przeciągnij, aby obrócić · Scroll lub gest uszczypnięcia, aby przybliżyć · Prawy przycisk, aby przesunąć',
      viewerResetCamera: 'Resetuj kamerę',
      viewerAutoRotate: 'Auto-obrót',
      viewerFullscreen: 'Pełny ekran',
      viewerLoading: 'Ładowanie geometrii 3D...',
      viewerErrorTitle: 'Podgląd 3D niedostępny',
      viewerErrorDescription:
        'Nie udało się wczytać pliku GLB w tej przeglądarce. Poniżej nadal możesz przejrzeć galerię zdjęć oraz specyfikację techniczną.',
      gallerySectionTitle: 'Galeria projektu',
      galleryThumbnailAria: 'Wybierz zdjęcie z galerii',
      galleryPrevAria: 'Poprzednie zdjęcie',
      galleryNextAria: 'Następne zdjęcie',
      specsSectionTitle: 'Specyfikacja techniczna',
      specSoftware: 'Oprogramowanie CAD',
      specPrinter: 'Drukarka',
      specMaterial: 'Materiał',
      specPrintTime: 'Czas druku',
      specVersion: 'Wersja',
      specLicense: 'Licencja',
      specPublished: 'Data publikacji',
      specExternalRepo: 'Powiązane repozytorium',
      downloadsSectionTitle: 'Pliki do pobrania',
      downloadsSubtitle:
        'Zweryfikowane pliki geometryczne i źródłowe przeznaczone do druku oraz modyfikacji.',
      downloadFileAria: 'Pobierz plik',
      relatedModelsTitle: 'Inne modele 3D',
    },
    about: {
      eyebrow: 'TOŻSAMOŚĆ // MAKER',
      title: 'Szymon Potyra',
      role: 'Maker',
      introLead:
        'Tworzę oprogramowanie i fizyczne przedmioty — łącząc kod, elektronikę oraz projektowanie 3D przy rozwiązywaniu praktycznych problemów i poznawaniu tego, jak działają rzeczy.',
      bioParagraph1:
        'Moje projekty rodzą się z ciekawości albo konkretnej potrzeby: własny kontroler makr na biurko, lekkie narzędzie do monitorowania domowego serwera, interfejs firmware dla wbudowanego wyświetlacza czy drukowana w 3D obudowa dopasowana do konkretnej płytki PCB.',
      bioParagraph2:
        'Praca na styku software’u i hardware’u pozwala traktować projekt jako spójną całość zamiast osobnych warstw. Pisanie firmware na mikrokontroler, budowa aplikacji towarzyszącej na komputer i modelowanie obudowy w CAD składają się na jeden gotowy przedmiot.',
      bioParagraph3:
        'Ta strona jest żywym katalogiem moich publicznych repozytoriów kodu, modeli CAD oraz eksperymentów sprzętowych.',
      areasTitle: 'Czym się zajmuję',
      areas: [
        {
          title: 'Programowanie',
          items: [
            'TypeScript, Python, C#, C/C++',
            'Narzędzia desktopowe i aplikacje towarzyszące',
            'Interfejsy webowe i narzędzia statyczne',
            'Środowiska Linux oraz Windows',
          ],
        },
        {
          title: 'Elektronika i Embedded',
          items: [
            'ESP32, Raspberry Pi Pico (RP2040)',
            'Firmware w MicroPython oraz C++',
            'USB Serial, Wi-Fi oraz aktualizacje OTA',
            'Wyświetlacze, czujniki i własne kontrolery',
          ],
        },
        {
          title: 'CAD i druk 3D',
          items: [
            'Parametryczne modelowanie mechaniczne',
            'Obudowy elektroniki i uchwyty montażowe',
            'Projektowanie pod tolerancje druku FDM',
            'Funkcjonalne prototypy i części zamienne',
          ],
        },
      ],
      principlesTitle: 'Podejście',
      principles: [
        {
          title: 'Funkcja przed ozdobnikami',
          description:
            'Zarówno w interfejsie użytkownika, jak i w części mechanicznej liczy się przejrzystość, ergonomia i uczciwa konstrukcja.',
        },
        {
          title: 'Kompletne systemy',
          description:
            'Łączenie fizycznego sprzętu, kodu wbudowanego i oprogramowania komputerowego bez zbędnych warstw abstrakcji.',
        },
        {
          title: 'Iteracyjne rzemiosło',
          description:
            'Szybkie prototypowanie, weryfikacja w praktyce, dopracowywanie tolerancji i dokumentowanie sprawdzonych rozwiązań.',
        },
      ],
      contactTitle: 'Kontakt',
      contactSubtitle:
        'Masz pytanie dotyczące repozytorium, projektu sprzętowego lub chcesz wymienić doświadczenia? Napisz bezpośrednio wiadomość e-mail lub sprawdź mój profil na GitHubie.',
      emailLabel: 'E-mail',
      githubLabel: 'GitHub',
      sendEmailCta: 'Wyślij e-mail',
      openGithubCta: 'Profil GitHub',
    },
    footer: {
      tagline: 'Tworzę rzeczy — cyfrowe i fizyczne.',
      navigationHeading: 'Nawigacja',
      contactHeading: 'Kontakt',
      rights: 'Szymon Potyra. Wszelkie prawa zastrzeżone.',
      builtWith: 'Statycznie generowane w Astro.',
    },
  },
};

export function getTranslations(locale: Locale): TranslationDictionary {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}
