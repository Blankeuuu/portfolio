---
title: Wymagania i kryteria akceptacji — Szymon Potyra Portfolio
tags: [portfolio, wymagania, dod]
aliases: [requirements]
updated: 2026-10-20
status: active
---

# Wymagania i kryteria akceptacji

## Wymagania funkcjonalne

1. **Tożsamość**: Szymon Potyra — Maker (`potyraszymon@gmail.com`, GitHub `Blankeuu` / `Blankeuuu`). Brak sekcji klientów i brak zmyślonych projektów.
2. **Architektura informacji**:
   - Trasy angielskie: `/`, `/repos/`, `/models/`, `/models/[slug]/`, `/about/`.
   - Trasy polskie: `/pl/`, `/pl/repos/`, `/pl/models/`, `/pl/models/[slug]/`, `/pl/about/`.
   - Kompatybilność z domeną główną oraz podkatalogiem projektu na GitHub Pages.
3. **Repozytoria GitHub**:
   - Pobierane automatycznie w czasie budowania przez GitHub REST API.
   - Wykluczenie repozytoriów z `fork === true` oraz `archived === true`.
   - Wyszukiwanie po nazwie/opisie/tagach, filtrowanie po języku programowania i sortowanie (ostatnia aktywność `pushed_at`, gwiazdki, nazwa A–Z).
4. **Modele 3D**:
   - Lokalna kolekcja z walidacją Zod (`src/content.config.ts`).
   - Interaktywny podgląd GLB (`<model-viewer>`) z kontrolą kamery, auto-obrotem i resetem widoku, ładowany leniwie tylko na stronie modelu.
   - Niezależna kontrola pobrań (`downloadEnabled`) z weryfikacją istnienia plików.
5. **Dwujęzyczność (EN / PL)**:
   - Domyślny język angielski przy pierwszej wizycie, zapamiętywanie wyboru w `localStorage`, zachowanie bieżącej podstrony przy przełączaniu języka.
6. **Dostępność i wydajność**:
   - Semantyczny HTML, obsługa klawiatury, widoczny focus, pełne wsparcie `prefers-reduced-motion: reduce`.
