---
title: Utrzymanie i operacje — Szymon Potyra Portfolio
tags: [portfolio, operacje, github-pages, ci-cd, glb]
aliases: [operations]
updated: 2026-10-20
status: active
---

# Utrzymanie i operacje

## Cykl publikacji i synchronizacji GitHub

Strona jest wdrażana automatycznie przez workflow `.github/workflows/deploy.yml`:

- **Push na `main`**: pełne sprawdzenie typów (`npm run check`), testy (`npm test`), budowanie (`npm run build`) i publikacja artefaktu na GitHub Pages.
- **Harmonogram dzienny (`cron: '25 4 * * *'`)**: raz na dobę odświeża listę publicznych repozytoriów, gwiazdek i dat ostatniej aktywności (`pushed_at`).
- **Ręczne wyzwolenie (`workflow_dispatch`)**: pozwala wymusić przebudowanie strony w dowolnym momencie z zakładki **Actions**.

### Wznawianie wygaszonego harmonogramu po 60 dniach

GitHub automatycznie wstrzymuje wyzwalacze `schedule` w publicznych repozytoriach, w których przez 60 dni nie wykonano żadnego commita. Aby przywrócić codzienne odświeżanie:

1. Otwórz repozytorium na GitHubie i przejdź do zakładki **Actions**.
2. Wybierz workflow **Deploy Portfolio to GitHub Pages**.
3. Kliknij żółty baner **Enable workflow** lub uruchom przebudowanie ręcznie przyciskiem **Run workflow**.

## Eksport modeli CAD do formatu GLB

Komponent `<model-viewer>` wymaga plików `.glb` (binarny glTF 2.0):

1. W programie CAD (**FreeCAD**, **Fusion**, **SolidWorks**) wyeksportuj model do formatu `.step` lub gęstej siatki `.stl` / `.obj`.
2. Zaimportuj plik do **Blendera**.
3. Wyśrodkuj geometrię względem początku układu współrzędnych (`Origin to Geometry`) i zastosuj skalę (`Ctrl+A -> Scale`).
4. Przypisz materiał PBR (np. matowy ciemny lub jasnoszary plastik) i wyeksportuj przez `File -> Export -> glTF 2.0 (.glb)`.
5. Umieść plik w `public/models/<slug>/preview.glb` oraz dodaj wpis w `src/content/models/<slug>.yaml`.
