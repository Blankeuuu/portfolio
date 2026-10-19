---
title: Architektura systemu — Szymon Potyra Portfolio
tags: [portfolio, architektura, astro, i18n, github-api]
aliases: [architecture]
updated: 2026-10-20
status: active
---

# Architektura

## Przegląd

Strona jest w pełni statyczną aplikacją generowaną w czasie budowania (SSG) przy użyciu **Astro 5**, **TypeScript (strict)** oraz **Tailwind CSS v4**. Nie wymaga serwera backendowego, bazy danych ani uwierzytelniania po stronie odwiedzającego.

## Struktura katalogów

```text
/
├── .github/workflows/deploy.yml   # CI/CD: build, testy, cron 24h i deploy na GitHub Pages
├── public/
│   ├── favicon.svg                # Minimalistyczny sygnet SP
│   ├── robots.txt                 # Reguły indeksowania + link do sitemap
│   ├── images/                    # Zasoby graficzne i opcjonalne zdjęcie profilowe
│   └── models/                    # Pliki .glb, .webp i paczki do pobrania dla modeli 3D
├── src/
│   ├── components/
│   │   ├── layout/Footer.astro
│   │   ├── navigation/Header.astro
│   │   ├── models/                # ModelCard.astro, ModelViewer.astro
│   │   ├── pages/                 # Współdzielone widoki stron dla EN i PL
│   │   └── projects/              # RecentWorkCard.astro, RepositoryCard.astro
│   ├── content/
│   │   └── models/                # Kolekcja YAML modeli 3D (_template.yaml, dev-fixture.yaml)
│   ├── data/site.ts               # Centralna konfiguracja tożsamości i linków
│   ├── i18n/
│   │   ├── routing.ts             # Mapowanie ścieżek EN/PL, obsługa base path i dat
│   │   └── translations.ts        # Centralny słownik tłumaczeń EN i PL
│   ├── layouts/BaseLayout.astro   # Główny szablon HTML, SEO, JSON-LD, View Transitions
│   ├── lib/
│   │   ├── github/                # Klient GitHub REST API, filtrowanie, sortowanie i cache
│   │   ├── models/                # Schemat Zod modeli 3D i weryfikacja plików do pobrania
│   │   └── projects/recent.ts     # Normalizacja i łączenie ostatnich projektów
│   ├── pages/                     # Trasy angielskie (/) oraz polskie (/pl/)
│   └── styles/global.css          # Tokeny projektu, fonty Geist, animacje i reduced-motion
└── tests/                         # Testy automatyczne Vitest
```

## Kluczowe moduły i granice

1. **Warstwa danych GitHub (`src/lib/github/`)**:
   - Pobiera publiczne repozytoria przez REST API w czasie budowania (`fetchPublicRepositories`).
   - Odrzuca repozytoria będące forkami (`fork === true`) oraz zarchiwizowane (`archived === true`).
   - Obsługuje paginację (`per_page=100`), błędy sieciowe oraz limity zapytań (`403`/`429`), zwracając jawny status bez fabrykowania danych.
2. **Kolekcja modeli 3D (`src/lib/models/`, `src/content.config.ts`)**:
   - Waliduje każdy model schematem Zod (`ModelProjectSchema`).
   - Chroni przed przypadkową publikacją obiektów testowych (`isDevFixture: true` i `draft: true` są odfiltrowywane w `filterPublishedModels`).
   - Funkcja `resolveAvailableDownloads` sprawdza flagę `downloadEnabled` oraz fizyczną obecność pliku w `public/`.
3. **Internacjonalizacja (`src/i18n/`)**:
   - Wszystkie trasy EN (`/`, `/repos/`, `/models/`, `/models/[slug]/`, `/about/`) i PL (`/pl/`, `/pl/repos/`, `/pl/models/`, `/pl/models/[slug]/`, `/pl/about/`) korzystają z tych samych komponentów widoków w `src/components/pages/`.
   - Wybór języka jest zapisywany w `localStorage` (`szp-preferred-locale`), przy czym pierwsza wizyta zawsze domyślnie otwiera wersję angielską bez automatycznego przekierowania na podstawie języka przeglądarki.
