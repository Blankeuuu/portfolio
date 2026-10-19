---
title: Strategia testów — Szymon Potyra Portfolio
tags: [portfolio, testy, vitest]
aliases: [testing]
updated: 2026-10-20
status: active
---

# Strategia testów

## Rzeczywiste komendy testowe

```bash
# Sprawdzenie typów Astro i TypeScript
npm run check

# Uruchomienie testów jednostkowych i integracyjnych Vitest
npm test

# Budowanie produkcyjne
npm run build

# Pełny potok walidacyjny (typy + testy + build + walidacja wygenerowanego HTML)
npm run validate
```

## Zakres testów automatycznych (`tests/`)

- `tests/github-client.test.ts` — weryfikacja filtrowania forków i archiwów, normalizacji pól, sortowania (`activity`, `stars`, `name`), stronicowania API, obsługi limitów `403`/`429`, błędów sieciowych oraz łączenia ostatnich projektów (`buildRecentWorkItems`).
- `tests/models-schema.test.ts` — walidacja schematu Zod modeli 3D, blokowania niebezpiecznych ścieżek (`..`), warunkowego udostępniania plików do pobrania (`resolveAvailableDownloads`) oraz izolacji obiektów testowych (`isDevFixture`).
- `tests/i18n-routing.test.ts` — weryfikacja 100% zgodności kluczy słownika EN i PL, zachowania ukośników końcowych (`trailingSlash: 'always'`) oraz mapowania tras EN↔PL również w podkatalogu GitHub Pages.
- `tests/build-output.test.ts` — inspekcja wygenerowanego katalogu `dist/`: obecność wszystkich wymaganych tras EN i PL, brak wycieku obiektu testowego (`dev-calibration-block`), brak sekcji klientów, poprawność atrybutów `lang`, `canonical`, `hreflang`, pojedynczego nagłówka `<h1>` oraz wewnętrznych linków.
