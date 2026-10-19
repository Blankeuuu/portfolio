---
title: Przekazanie stanu projektu — Szymon Potyra Portfolio
tags: [portfolio, handoff, status]
aliases: [handoff, project status]
updated: 2026-10-20
status: active
---

# HANDOFF — bieżący stan

## Stan projektu

Kompletna, produkcyjna strona portfolio (**Szymon Potyra — Maker**) zbudowana w Astro 5, TypeScript (strict) oraz Tailwind CSS v4.

## Ostatnio wykonane zmiany

- Zaimplementowano system projektowy w ciemnej estetyce inspirowanej precyzją Vercel (`#09090B`, `#111115`, `#18181B`, akcent `#A855F7`, fonty Geist Variable i Geist Mono Variable).
- Zbudowano pełną architekturę tras w języku angielskim (`/`, `/repos/`, `/models/`, `/models/[slug]/`, `/about/`) oraz polskim (`/pl/`, `/pl/repos/`, `/pl/models/`, `/pl/models/[slug]/`, `/pl/about/`) z obsługą `localStorage` i podkatalogów GitHub Pages.
- Wdrożono klienta GitHub REST API (`src/lib/github/client.ts`) z obsługą stronicowania, wykluczaniem forków i archiwów, sortowaniem, wyszukiwaniem i automatycznym odpytywaniem konta właściciela (`Blankeuu` / `Blankeuuu`).
- Wdrożono kolekcję modeli 3D (`src/content.config.ts`, `src/lib/models/schema.ts`) z interaktywnym komponentem `<model-viewer>` (GLB), galerią zdjęć i warunkową sekcją pobrań (`downloadEnabled`).
- Przygotowano workflow `.github/workflows/deploy.yml` (push na `main`, harmonogram dzienny `cron`, `workflow_dispatch`).

## Wyniki testów i weryfikacji

- `npm run check` (`astro check && tsc --noEmit`): PASS (0 błędów, 0 ostrzeżeń).
- `npm test` (`vitest run`): PASS (wszystkie testy jednostkowe, schematów, i18n oraz wyjścia buildu).
- `npm run build`: PASS (wygenerowano statyczne strony EN i PL oraz mapę witryny `sitemap-index.xml`).

## Otwarte problemy / ograniczenia

- Na GitHubie nazwa repozytorium to `Blankeuu.github.io` pod kontem `Blankeuuu` (trzy litery `u`). Klient API oraz konfiguracja Astro automatycznie obsługują oba warianty (`Blankeuu` oraz `Blankeuuu`), a zmiana nazwy repozytorium na `Blankeuuu.github.io` pozwoli na serwowanie bezpośrednio pod `https://blankeuuu.github.io/`.

## Następne kroki

- Publikacja pierwszego rzeczywistego modelu 3D w `src/content/models/<slug>.yaml` wraz z plikiem `.glb` w `public/models/<slug>/`.
- Włączenie źródła **GitHub Actions** w zakładce **Settings → Pages** na GitHubie.

## Status synchronizacji Obsidian wiki

- Zsynchronizowano notatkę projektową `wiki/projects/portfolio.md` oraz indeks `wiki/index.md` przez Obsidian MCP (`vault_read` PASS).
