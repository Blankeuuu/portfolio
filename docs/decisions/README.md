---
title: Decyzje architektoniczne (ADR) — Szymon Potyra Portfolio
tags: [portfolio, adr, decyzje]
aliases: [decisions]
updated: 2026-10-20
status: active
---

# Decyzje techniczne (ADR)

## ADR-001: Astro 5 + Tailwind CSS v4 (SSG)

- **Kontekst:** Portfolio musi być bardzo szybkie, łatwe w utrzymaniu, działać na GitHub Pages bez backendu i umożliwiać integrację z lokalną kolekcją modeli 3D oraz GitHub API.
- **Decyzja:** Wybrano Astro 5 w trybie `output: 'static'` z natywnymi kolekcjami treści (`astro:content`) oraz integracją Vite dla Tailwind CSS v4 (`@tailwindcss/vite`).
- **Skutki:** Zerowy narzut frameworka JS dla treści statycznych, pełne bezpieczeństwo typów i bardzo szybki czas ładowania.

## ADR-002: Leniwe ładowanie `<model-viewer>` wyłącznie na podstronach modeli 3D

- **Kontekst:** Biblioteka renderowania WebGL/Three.js (`@google/model-viewer`) ma znaczny rozmiar i nie powinna obciążać strony głównej ani galerii modeli.
- **Decyzja:** Komponent `ModelViewer.astro` jest używany wyłącznie na trasach `/models/[slug]/` oraz `/pl/models/[slug]/`, a skrypt `@google/model-viewer` jest ładowany dynamicznie przez `import('@google/model-viewer')` oraz sprzątany przy nawigacji View Transitions (`astro:before-swap`).

## ADR-003: Automatyczny fallback nazwy użytkownika GitHub (`Blankeuu` -> `Blankeuuu`)

- **Kontekst:** W specyfikacji podano nazwę `Blankeuu` (0 publicznych repozytoriów na GitHubie), natomiast rzeczywiste konto właściciela w zdalnym repozytorium Git (`https://github.com/Blankeuuu/Blankeuu.github.io.git`) to `Blankeuuu` (zawierające projekty `cyd-deck`, `Server-Helper`, `Blankeuu.github.io`).
- **Decyzja:** Klient GitHub REST API odpytuje domyślnie `Blankeuu`, a gdy konto zwraca 0 repozytoriów, automatycznie sprawdza zweryfikowane konto właściciela `Blankeuuu`.
