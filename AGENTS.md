# AGENTS.md — uniwersalne instrukcje projektu

> Skopiuj ten plik do **katalogu głównego repozytorium**. Obowiązują dodatkowo globalne instrukcje agentów. Niniejszy szablon jest celowo niezależny od języka programowania, frameworka i nazwy projektu.

## 0. Pierwsze uruchomienie nowego projektu (PowerToys New+)

Ten katalog mógł zostać utworzony z uniwersalnego szablonu. `README.md`, `GLOSSARY.md`, `HANDOFF.md`, `TODO.md` i dokumenty w `docs/` są wtedy **pustymi szkieletami** — nie stanowią dowodu istnienia funkcji, technologii ani decyzji.

- Najpierw ustal cel projektu na podstawie polecenia użytkownika. Jeśli nie został podany, zapytaj o cel zamiast wymyślać wymagania.
- Sprawdź, czy repozytorium Git w ogóle istnieje. Jeśli nie, nie traktuj braku `git status` lub `main` jako błędu; uzgodnij z użytkownikiem inicjalizację repozytorium i zdalny GitHub.
- Na podstawie zatwierdzonego zakresu uzupełniaj szkielety dokumentów **wyłącznie faktami**: cele, wymagania, architekturę, sposób uruchomienia i testy. Nie wymyślaj stacku ani poleceń build/test.
- Sprawdź przez Obsidian MCP, czy istnieje już dokumentacja tego projektu. Jeżeli tak — korzystaj z niej zamiast zakładać nowe wiki.
- Jeżeli to rzeczywiście nowy, jednoznacznie nazwany projekt i brak jego wiki, Lead może utworzyć odpowiedni indeks i notatki w uzgodnionej konwencji Vault (`wiki/projects/<slug>/`) **przez Obsidian MCP**; upewnij się najpierw, że ścieżka nie koliduje z istniejącym projektem. W razie niejednoznaczności zapytaj.
- Nie zamieniaj instrukcji `AUTO_DISCOVER` na zgadywane wartości. Gdy ustalenia wymagają zmiany plików, pracuj zgodnie z polityką gałęzi i worktrees.

## Szkielety dokumentów repozytorium

- `README.md` — cel, instalacja, użycie i punkt wejścia.
- `GLOSSARY.md` — słownik pojęć domenowych.
- `HANDOFF.md` — aktualny stan i przekazanie kontekstu pomiędzy sesjami.
- `TODO.md` — backlog i priorytety.
- `docs/requirements.md` — wymagania i kryteria akceptacji.
- `docs/architecture.md` — architektura i granice modułów.
- `docs/testing.md` — strategia testów i rzeczywiste komendy.
- `docs/operations.md` — instalacja, utrzymanie i procedury, jeżeli dotyczą projektu.
- `docs/decisions/` — decyzje architektoniczne (ADR).

Nie zastępuj synchronizacji kanonicznego Obsidian wiki jedynie aktualizacją tych plików.

## 1. Ustal tożsamość i stan projektu

Na początku nowej sesji lub po istotnej zmianie kontekstu:

1. Ustal nazwę projektu, jego cel i aktualny stan z `README`, manifestów, dokumentacji, konfiguracji i historii Git — nie zgaduj.
2. Jeśli projekt korzysta z Git, sprawdź `git status`, bieżącą gałąź/worktree oraz ostatnie istotne zmiany. Nie nadpisuj niezatwierdzonych modyfikacji.
3. Zidentyfikuj moduły, granice między nimi, zależności, sposób build/test i główne punkty uruchomienia.
4. Wykryj obowiązujące konwencje (`CONTRIBUTING`, `docs/`, CI, formatery, skrypty) i stosuj je zamiast narzucać nowy stack.
5. Znajdź odpowiednią dokumentację w Obsidian przez MCP. Traktuj kod i zweryfikowane testy jako źródło prawdy o bieżącej implementacji, a wiki aktualizuj, gdy jest niezgodne.

Nie twórz od nowa architektury ani dokumentacji, jeśli wystarcza aktualizacja istniejących elementów.

## 2. Powiązanie z Obsidian — automatyczne odkrywanie

**Brak sztywnej ścieżki wiki w szablonie jest zamierzony.** Dla każdego repozytorium odkryj ją osobno.

1. Ustal identyfikację projektu z repozytorium (`README`, remote Git, dokumentacja, wcześniejsze ustalenia).
2. Użyj aktywnego Obsidian MCP, np. `vault_list`, `search_simple` i `vault_read`, aby znaleźć jego istniejący indeks i notatki.
3. Preferuj **potwierdzony, kanoniczny folder projektu w `wiki/`**, nie katalog kodu w `projects/`. Ścieżki podobne do `wiki/projects/<slug>/` są wyłącznie konwencją, nie automatycznym założeniem.
4. Zweryfikuj wybrany folder przez odczyt istniejącego indeksu lub dokumentacji. Gdy istnieją dwie możliwe lokalizacje — zapytaj użytkownika; nie twórz drugiego wiki.
5. Po potwierdzeniu można dopisać poniżej faktyczne wartości w **konkretnej kopii projektowej** pliku, w zmianie poddanej review. W szablonie pozostaw `AUTO_DISCOVER`.

### Metadane projektu (uzupełniaj po pierwszej weryfikacji)

| Pole | Wartość |
|---|---|
| Nazwa projektu | `AUTO_DISCOVER` |
| Repozytorium / root | `AUTO_DISCOVER` |
| Główna gałąź | `AUTO_DISCOVER` |
| Kanoniczny katalog wiki (vault-relative) | `AUTO_DISCOVER` |
| Indeks wiki | `AUTO_DISCOVER` |
| Podstawowe komendy testowe | `AUTO_DISCOVER` |

**Nie modyfikuj automatycznie tych pól na chronionym `main`.** Jeżeli trwa praca z ORCA, konfigurację projektu aktualizuj przez odpowiednie child worktree i przyjętą zmianę.

## 3. Organizacja pracy w ORCA

Wykorzystuj reguły globalne oraz aktualną instrukcję `orchestration` ze środowiska. Nazwa agenta/modelu nie przesądza o roli — rozpoznawaj ją z aktywnego Run/Task/Dispatch.

### Lead (Coordinator)

- Gdy zostaniesz uruchomiony jako Lead w primary/main worktree, analizuj cel i planuj pracę. Deleguj implementację w niezależnych child worktrees; nie edytuj chronionego `main` bez odrębnej zgody.
- Sam twórz odpowiednie ORCA Runs, Tasks, Dispatches i nazwy child worktrees, jeśli funkcje orkiestracji są dostępne. Nie wymagaj od użytkownika ręcznego zakładania Workera, worktree ani sluga.
- Rozdzielaj pracę według niezależnych modułów i granic plików. Jeśli zadania obejmują wspólny protokół, schemat danych, interfejs lub konfigurację, uzgodnij kontrakt **przed** równoległą implementacją.
- Po pracy Workerów sprawdź diff, wyniki testów i kompatybilność. Integruj tylko zmiany zaakceptowane w obowiązującym procesie.
- Po zaakceptowanej integracji dopilnuj aktualizacji powiązanych notatek przez **Obsidian MCP** i odczytu kontrolnego. To część zakończenia zadania, nie osobna prośba użytkownika.

### Worker (Dispatched Agent)

- Pracuj wyłącznie w przydzielonym child worktree i w granicach zadania; nie twórz konkurencyjnych modyfikacji poza zakresem.
- Przed pracą odczytaj odpowiednie pliki i dokumentację wiki przez MCP.
- Po implementacji wykonaj odpowiednie testy. W wyniku zadania przekaż Leadowi zmiany, wyniki i dokładny **wiki update proposal**: które notatki i jakie fakty wymagają aktualizacji.
- Nie wykonuj samowolnego merge ani nie zapisuj kanonicznego wiki, jeśli Lead pełni rolę jedynego zapisującego.

### Bez uruchomionej orkiestracji

Jeżeli sesja nie pracuje jako Lead/Worker ORCA, wykonuj zadanie samodzielnie. Wtedy ten sam agent odpowiada za review, testy i aktualizację wiki po zaakceptowanej zmianie. Nie deklaruj istnienia Run ani Workera, jeśli ich nie uruchomiono.

## 4. Reguły implementacji

- Zachowuj obecny styl kodu, strukturę katalogów, zależności i publiczne kontrakty, o ile zadanie nie wymaga świadomej zmiany.
- Preferuj minimalne, czytelne diffy; nie wykonuj niepowiązanych refaktoryzacji.
- Przy naprawianiu błędów twórz lub rozszerzaj test regresyjny tam, gdzie jest to wykonalne.
- Dla zmian interfejsu dbaj o spójność wyglądu, responsywność, dostępność i zgodność z istniejącymi wzorcami.
- Przy zmianach w API, schemacie danych lub protokole oceń kompatybilność, migrację i wpływ na inne komponenty.
- Komendy build/test/deploy znajdź w repozytorium i najpierw zweryfikuj ich działanie. Nie wymyślaj skryptów, ścieżek i wersji.
- Nie zmieniaj sekretów, danych użytkownika ani produkcyjnego środowiska bez jawnej autoryzacji.

## 5. Aktualizowanie dokumentacji projektu

Po zaakceptowanej i zintegrowanej zmianie ustal, czy wpływa ona na:

- architekturę, moduły lub zależności;
- API, protokoły, formaty konfiguracji i dane;
- funkcje widoczne dla użytkownika, interfejs lub obsługę;
- build, instalację, testy, wdrażanie lub diagnostykę;
- decyzje techniczne, rozwiązane błędy lub znane ograniczenia.

Jeżeli tak, **Lead** aktualizuje istniejące, właściwe notatki w potwierdzonym katalogu wiki przez `vault_patch`/`vault_write` i sprawdza wynik `vault_read`. Dokumentacja jest pisana po polsku, z poprawnym YAML frontmatter, linkami i tagami zgodnie z instrukcjami globalnymi.

Nie traktuj modyfikacji `README.md`, `docs/` ani `HANDOFF.md` w Git worktree jako zastępstwa za aktualizację Obsidian wiki. Dokumentacja repozytorium i wiki mogą wymagać **obu** zmian, jeżeli służą różnym odbiorcom.

Jeżeli aktualizacja nie była potrzebna, zanotuj dlaczego. Jeśli wiki jest niedostępne, zgłoś `Wiki: BLOCKED` i konkretne czynności do dokończenia; nie deklaruj pełnej synchronizacji.

## 6. Definition of Done (DoD)

Zadanie można zamknąć, gdy:

- [ ] Zrealizowano zaakceptowany zakres bez niezamierzonych zmian.
- [ ] Wykonano odpowiednie testy i podano ich **rzeczywiste wyniki** (lub wyjaśniono ograniczenia).
- [ ] Przeprowadzono review, a zmiany są zintegrowane tylko wtedy, gdy zostało to zatwierdzone.
- [ ] Sprawdzono wpływ na dokumentację repozytorium i Obsidian wiki.
- [ ] Wiki: zapis przez MCP + odczyt kontrolny, albo `bez zmian — powód`, albo jawne `BLOCKED`.
- [ ] Raport końcowy zawiera zmienione pliki, wyniki testów, stan wiki oraz pozostałe ryzyka.

## 7. Ochrona stanu projektu

- Nie wykonuj bez zgody `git reset --hard`, `git clean -fd`, force push, usuwania branchy/worktrees, flashowania urządzeń, resetu konfiguracji, migracji produkcyjnych ani publikacji release.
- Nie wykonuj merge do chronionej gałęzi `main` bez akceptacji użytkownika.
- Nie umieszczaj sekretów w kodzie, logach, commitach ani notatkach Obsidian.
- Po wykonaniu zadania proponuj kolejne usprawnienia, ale nie rozpoczynaj samoczynnie nieograniczonej serii zmian poza uzgodnionym celem.
