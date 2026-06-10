# Modularchitektur-Konzept: Förderrechner BEG

Letzte Aktualisierung: 2026-06-10

---

## Vorbemerkung

Dieses Konzept ist eine **Architekturskizze für ein zukünftiges, optionales/Premium-Modul**.
Es beschreibt KEINE Implementierung und führt zu KEINEN Änderungen an bestehendem
App-Code (index.html, js/, css/ bleiben unangetastet).

---

## 1. Bewertung der vorgeschlagenen Strukturen

### Option A: `modules/beg/{beg-data.js, beg-rules.js, beg-calculator.js, beg-ui.js, beg-tests.md}`

**Vorteile:**
- Klare Kapselung als eigenständiges "Modul" – signalisiert schon im Pfad, dass es sich um
  eine separierbare/optionale Komponente handelt (passt zum "Premium-Modul"-Gedanken)
- Erleichtert späteres Auslagern in ein eigenes Repository/npm-Paket, falls gewünscht
- `beg-tests.md` als lebendes Dokument für manuelle/fachliche Testfälle (gerade bei
  Förderregeln mit vielen Sonderfällen wertvoll, auch ohne Test-Framework)

**Nachteile:**
- Setzt eine `modules/`-Konvention voraus, die in der heutigen Vanilla-App vermutlich
  nicht existiert (zu prüfen: aktuelle Ordnerstruktur)
- Mehr "neue Konzepte" für eine Vanilla-App ohne Build-Step

### Option B: `js/foerderung-beg-{data,rules,calculator,ui}.js`

**Vorteile:**
- Fügt sich nahtlos in eine vermutlich bereits flache `js/`-Struktur der heutigen App ein
- Naming-Konvention `foerderung-beg-*` macht Zugehörigkeit und Trennung von der
  Heizlast-/Erfassungslogik klar erkennbar, ohne neue Ordnerebene

**Nachteile:**
- Geringere visuelle/strukturelle Trennung – Risiko, dass das Modul im Laufe der Zeit
  "informell" mit der Kernlogik verschmilzt (Datei-Imports, gemeinsame globale Variablen)
- Schwerer als rein optionales Paket auszulagern, falls später ein echtes Premium-Gating
  gewünscht ist

### Empfehlung

**Option A (`modules/beg/...`)** wird empfohlen, ABER nur wenn das Repo bereits eine
modulartige Struktur kennt oder eine solche Struktur als generelles Architekturziel für
zukünftige optionale Funktionen sinnvoll ist (nicht nur für BEG). Falls die App aktuell
strikt flach (`js/*.js`, kein Modul-Loader, keine ES-Module) aufgebaut ist, ist die
pragmatischere Wahl eine **Hybridlösung**:

```
js/foerderung-beg/
  beg-data.js        (Stammdaten: Fördersätze, Höchstgrenzen, TMA-Werte, mit Stand-Metadaten)
  beg-rules.js        (Regelwerk / Entscheidungsbaum gem. regelmodell.md)
  beg-calculator.js   (Berechnungslogik: Zuschuss, Höchstgrenzen-Anwendung)
  beg-ui.js           (eigene UI-Komponenten/Views, lose gekoppelt an Haupt-UI)
  beg-tests.md        (fachliche Testfälle)
```

Damit bleibt die bestehende `js/`-Konvention gewahrt, aber durch den Unterordner und
das einheitliche Präfix `beg-*` ist die fachliche und technische Trennung klar sichtbar.
**Diese Entscheidung sollte vor Implementierungsbeginn anhand der tatsächlichen
aktuellen Ordnerstruktur der App verifiziert werden** (in dieser Session bewusst nicht
geprüft, da "nicht an der App weiterbauen" – auch keine strukturelle Untersuchung über
das Nötigste hinaus).

---

## 2. Trennungsprinzipien

### 2.1 Was passt zur heutigen Vanilla-App?

- Reine `.js`-Dateien ohne Build-Step, globale Funktionen/Namespaces (z. B.
  `window.BEGFoerderrechner = {...}`) statt ES-Module mit `import`/`export`,
  falls die App aktuell kein Bundling nutzt
- Datenhaltung als JS-Objekte/JSON (analog zu evtl. bereits vorhandenen
  Stammdaten-Dateien für U-Werte etc.)
- UI-Integration als zusätzlicher Tab/Abschnitt, der NUR sichtbar wird, wenn das
  Modul aktiviert ist (Feature-Flag), keine Änderung an bestehenden Views

### 2.2 Was ist später als Premium-Modul trennbar?

- Gesamter `foerderung-beg/`-Ordner (oder `modules/beg/`) sollte **keine Abhängigkeiten
  in Richtung** der Heizlast-/Erfassungslogik haben – nur lesend (z. B. Gebäudetyp,
  Baujahr, Bauteil-Maßnahme als Eingabe), niemals umgekehrt
- Eine einzige, klar definierte "Schnittstellen-Datei" (z. B. `beg-input-adapter.js`),
  die Daten aus der Erfassung in das BEG-Eingabedatenmodell (siehe `regelmodell.md`,
  Abschnitt 1) übersetzt – das ist die EINZIGE Kopplungsstelle
- Premium-Gating (Lizenzprüfung, Freischaltung) kann an genau dieser Schnittstelle
  oder am Modul-Einstiegspunkt ansetzen, ohne den Rest der App zu berühren

### 2.3 Wie bleibt das Modul updatefähig?

- **Trennung von Stammdaten und Regeln**: Fördersätze, Höchstgrenzen, TMA-Werte als
  versionierte Datenobjekte (`beg-data.js` o. ä.) mit Metadaten (`gueltigAb`,
  `gueltigBis`, `quelle`, `stand`) – Updates = Datenaustausch, kein Logik-Refactoring
- **Regelwerk als deklarative Struktur** (Tabellen/Objekte gem. `regelmodell.md`
  Abschnitt 2/4), nicht als verschachtelte if/else-Ketten – erleichtert gezielte
  Einzelregel-Updates bei Richtlinien-Änderungen
- **Versionierung über Datum**: jede Stammdaten-Version trägt ein `stand`-Datum;
  der Rechner kann (perspektivisch) je nach "Antragsdatum" des Nutzers die passende
  Regelversion wählen (relevant, da Übergangsfristen bei Richtlinienwechseln üblich sind)

### 2.4 Wie werden Quellenstände versioniert?

- Jede Stammdaten-/Regeldatei referenziert die Einträge aus `quellenregister.md` über
  eine Quellen-ID (z. B. `BEG-RICHTLINIE-20231221`, `BEG-INFOBLATT-V10-20250701`)
- Empfehlung: ein `beg-quellen-meta.json` (oder `.js`) als zentrales Mapping
  Quellen-ID → {Dokument, Stand, URL, lokaler Pfad, geprüft am}
- Bei jeder inhaltlichen Änderung der Stammdaten: Eintrag in einem Änderungsprotokoll
  (`docs/quellen/beg/auswertung/aenderungsprotokoll.md`, perspektivisch) mit Datum,
  geänderter Wert, neue Quelle

### 2.5 Wie verhindert man falsche Förderaussagen?

- Striktes Ergebnisstatus-Set (siehe `regelmodell.md` Abschnitt 3) – `foerderfaehig`
  wird NIE als alleiniger Output ausgegeben, sondern immer mit Disclaimer-Text
  (Vorlage in Abschnitt "Risiken" dieses Berichts)
- Jede Regel mit `Unsicherheitsgrad`-Feld (siehe Regelmetadaten) – bei "hoch" wird
  automatisch `manuell_pruefen` statt `foerderfaehig` ausgegeben
- Kein "Silent Fallback": fehlt eine Regel/ein Stammdatensatz für eine Konstellation,
  ist der Status zwingend `nicht_bewertbar`, NIE eine geratene Annahme
- UI zeigt IMMER Quellenangabe + Stand zu jedem ausgegebenen Wert an (Transparenz)

### 2.6 Wie kann später API/MCP/Cloud/Datenbank angebunden werden?

- Die strikte Trennung "Daten ↔ Regeln ↔ Berechnung ↔ UI" erlaubt, `beg-data.js`
  später durch einen API-Client zu ersetzen (z. B. Abruf aktueller Fördersätze von
  einem zentralen Dienst), ohne `beg-rules.js`/`beg-calculator.js` anzufassen,
  solange das Datenformat stabil bleibt
- `beg-rules.js` könnte perspektivisch durch eine MCP-Anbindung an ein
  "Förder-Wissens-Repo" (vgl. `C:\Claude\BEG-Wissen\`) ergänzt/aktualisiert werden –
  d. h. das Modul liest Regelversionen aus einer gepflegten externen Quelle
- Eine lokale "Offline-first"-Variante (statische JS-Daten, wie heute üblich) sollte
  als Fallback erhalten bleiben, da die App offenbar primär clientseitig läuft

---

## 3. Zusammenfassung Architekturentscheidung

| Frage | Empfehlung |
|---|---|
| Ordnerstruktur | `js/foerderung-beg/` (Hybrid aus Option A/B), Bestätigung anhand realer Struktur ausstehend |
| Kopplung an Bestandslogik | Nur über eine einzige Adapter-Datei, nur lesend |
| Datenhaltung | Versionierte, deklarative Stammdaten mit Quellen-Metadaten |
| Regelwerk | Deklarativ (Tabellen/Objekte), nicht hartkodierte if/else-Bäume |
| Ergebnis-Disziplin | Festes Status-Enum + Pflicht-Disclaimer + Quellenangabe |
| Erweiterbarkeit | Datenquelle später austauschbar (API/MCP), Logik bleibt stabil |

---

# Berechnungslogik

Dieser Abschnitt beschreibt die fachliche Berechnungslogik (Formeln, Reihenfolge,
Abhängigkeiten) für eine spätere Implementierung. Es handelt sich um **Pseudologik**,
keinen Code. Grundlage: BEG-EM-Richtlinie 21.12.2023 §8 + KfW-Merkblatt 458 (Stand
12/2025) für die Boni-Logik bei 5.3 (Heizung – außerhalb MVP1, aber strukturell
mitgedacht für spätere Erweiterung).

## Eingangsgrößen je Maßnahme

1. **Investitionskosten brutto**: Gesamtbetrag laut Angebot/Rechnung inkl. USt.
2. **Förderfähige Kosten**: Teilmenge der Investitionskosten, die laut Infoblatt
   förderfähige Maßnahmen/Leistungen (v10.0, Stand 01.07.2025) als förderfähig gilt
   (z. B. Material + Einbau, OHNE z. B. rein dekorative Bestandteile, OHNE
   Eigenleistungs-Lohnkosten). Nie automatisch = Investitionskosten brutto.
3. **Nicht förderfähige Kosten** = Investitionskosten brutto − förderfähige Kosten
   (informativ für Eigenanteilsdarstellung, separat auszuweisen).

## Schritt 1: Förderfähige Kosten ermitteln

```
foerderfaehige_Kosten(Maßnahme) =
    Investitionskosten_brutto(Maßnahme)
    − nicht_foerderfaehige_Bestandteile(Maßnahme)   [Infoblatt §9 / regelsatz-mvp1, Status-Logik]
    − Eigenleistungsanteil_Lohnkosten(Maßnahme)     [falls Eigenleistung = ja, nur Material zählt]
```

Status `nicht_bewertbar`, falls keine Regel zur Abgrenzung förderfähig/nicht
förderfähig für die konkrete Leistungsposition vorliegt (kein Raten).

## Schritt 2: Zuschussquote ermitteln

```
Grundquote(Maßnahmengruppe)        # z. B. 5.1 = 15 %, 5.5 = 50 %, 5.3 = 30 % (KfW 458)
+ iSFP_Bonus                        # +5 pp, nur wenn Bedingungen BEG-EM-8.4.2-ISFP-BONUS erfüllt;
                                     #   Ausschluss bei 5.3, 5.4b, 5.5
+ Effizienzbonus(5.3)               # +5 pp, nur Wärmepumpe mit best. Wärmequelle/Kältemittel (KfW 458)
+ Klimageschwindigkeitsbonus(5.3)   # 20 % bzw. 17 % gestaffelt, nur selbstnutzende Eigentümer,
                                     #   Austausch funktionsfähiger fossiler Heizung (KfW 458)
+ Einkommensbonus(5.3)              # +30 pp, zvE ≤ 40.000 € (KfW 458)
= Zuschussquote_vor_Kappung

Zuschussquote = MIN(Zuschussquote_vor_Kappung, 70 %)   # Gesamtdeckel §8.4.1 / KfW 458
```

Bei 5.3 zusätzlich: **Emissionsminderungszuschlag** (Biomasse, Staub ≤2,5 mg/m³) ist
EIN PAUSCHALBETRAG (2.500 €), der NICHT die Quote erhöht, sondern VOR der
Prozentrechnung von den förderfähigen Kosten abgezogen/separat verrechnet wird
(Reihenfolge gemäß KfW 458 zu verifizieren – aktuell `manuell_pruefen`, da exakte
Verrechnungsreihenfolge nicht abschließend aus dem Merkblatt extrahiert).

## Schritt 3: Förderhöchstgrenze anwenden

```
Foerderhoechstbetrag(Maßnahmengruppe, WE/m²) =
    z. B. 5.1+5.2+5.4 zusammen: 30.000 €/WE (60.000 € bei iSFP-Bonus), §8.3.1a
    5.5: 5.000 €/Vorhaben (EFH/ZFH) bzw. 2.000 €/WE (MFH ≥3 WE), max. 20.000 €, §8.3.1b
    5.3 (KfW 458): 30.000 € (1. WE) + 15.000 € (2.-6. WE je) + 8.000 € (ab 7. WE je)

Zuschussbetrag(Maßnahme) =
    MIN(
        foerderfaehige_Kosten(Maßnahme) × Zuschussquote,
        Foerderhoechstbetrag(Maßnahmengruppe, WE/m²) − bereits_ausgeschoepfter_Betrag(Maßnahmengruppe, Kalenderjahr)
    )
```

Wichtig: Höchstgrenzen 5.1/5.2/5.4 gelten **gemeinsam, pro Gebäude und Kalenderjahr**
(§8.3.1a) – bei mehreren Maßnahmen in dieser Gruppe muss die Summe geprüft werden,
nicht jede Maßnahme isoliert.

## Schritt 4: Eigenanteil nach Förderung

```
Eigenanteil(Maßnahme) =
    Investitionskosten_brutto(Maßnahme) − Zuschussbetrag(Maßnahme)
```

Fachplanung/Baubegleitung (5.5) wird **separat** berechnet (eigene Quote 50 %, eigene
Höchstgrenze) und NICHT mit der Hauptmaßnahme (z. B. 5.1) vermischt – getrennte
Ausgabe von Zuschuss und Eigenanteil je Position.

## Schritt 5: Mehrere Maßnahmen + Höchstgrenzen

```
für jede Maßnahmengruppe G in {5.1+5.2+5.4 (gemeinsam), 5.3, 5.5}:
    Summe_foerderfaehige_Kosten(G) = Σ foerderfaehige_Kosten(Maßnahme) für Maßnahme ∈ G
    Summe_Zuschuss(G) = MIN(Summe_foerderfaehige_Kosten(G) × Quote(G), Hoechstgrenze(G))
    falls Summe_foerderfaehige_Kosten(G) × Quote(G) > Hoechstgrenze(G):
        Status = manuell_pruefen   # Kappung greift, Verteilung auf Maßnahmen ggf. anteilig
```

## Szenarienvergleich

```
Szenario A (ohne iSFP):  Zuschussquote ohne +5 pp, Höchstgrenze 5.1/5.2/5.4 = 30.000 €/WE
Szenario B (mit iSFP):   Zuschussquote mit +5 pp,  Höchstgrenze 5.1/5.2/5.4 = 60.000 €/WE
→ Differenz = zusätzlicher Zuschuss + ggf. zusätzlich anrechenbare Kosten durch höhere Grenze

Szenario C (ohne Baubegleitung): kein 5.5-Zuschuss, kein zusätzlicher Eigenanteil für Fachplanung
Szenario D (mit Baubegleitung):  5.5-Zuschuss (50 %, gedeckelt), zusätzlicher Eigenanteil = 50 % der
                                  Fachplanungskosten bis zur Höchstgrenze
```

Beide Szenarienpaare sind **unabhängig kombinierbar** (2×2-Matrix möglich), sofern
Eingabedaten für iSFP-Status UND Baubegleitung-Status vorliegen.

## Kundenbetrag nach Förderung

```
Kundenbetrag_gesamt =
    Σ Eigenanteil(Maßnahme) über alle Maßnahmen
    + Eigenanteil(Fachplanung/Baubegleitung), falls gebucht
```

## Amortisation

Eine Amortisationsrechnung (Kundenbetrag / jährliche Energiekosteneinsparung) wird
**NUR** ausgegeben, wenn:
- eine belastbare Energieeinsparung vorliegt (z. B. aus Heizlast-/Verbrauchsanalyse der
  bestehenden Gebäudeerfassungs-App, GEG-Modul – **außerhalb dieses Förderrechner-Moduls**), ODER
- der Nutzer manuell eine geschätzte jährliche Einsparung (€) eingibt, mit deutlichem
  Hinweis "Schätzung durch Nutzer, keine Berechnung durch dieses Modul".

Ohne eine dieser beiden Quellen: KEINE Amortisationsangabe (Status `nicht_bewertbar`
für diesen Teilaspekt) – verhindert das Vorgaukeln einer Wirtschaftlichkeitsprognose
ohne fachliche Grundlage.

---

# Ergebnisdarstellung

Jedes Berechnungsergebnis MUSS folgende Bestandteile enthalten (Pflichtfelder):

| Feld | Inhalt | Beispiel |
|---|---|---|
| Disclaimer | "Unverbindliche Einschätzung, keine Förderzusage" | immer am Anfang/Ende der Ausgabe |
| Quellenstand | Datum/Version der zugrunde liegenden Quelle(n) | "BEG-EM-Richtlinie 21.12.2023, KfW-Merkblatt 458 Stand 12/2025" |
| Fördergeber | BAFA / KfW (je Maßnahme) | "BAFA" |
| Maßnahme | Bauteil/Maßnahmengruppe | "Außenwanddämmung (5.1)" |
| Förderfähigkeit | Status aus Enum (Abschnitt 3 regelmodell.md) | `wahrscheinlich_foerderfaehig` |
| Voraussichtlicher Zuschuss | € (gerundet), inkl. Quote | "4.500 € (15 % von 30.000 €)" |
| Eigenanteil | € (gerundet) | "25.500 €" |
| Offene Prüfpunkte | Liste der `manuell_pruefen`/`nicht_bewertbar`-Punkte | "U-Wert-Nachweis Sonderverglasung noch zu klären" |
| Benötigte Nachweise | Liste gem. Regelsatz/Antragsprozess | "Herstellernachweis U-Wert, Wärmebrücken-Bestätigung" |
| Nächster Schritt | Handlungsempfehlung | "Energieeffizienz-Experten einbinden, BzA/Fachunternehmererklärung klären" |

Darstellungsprinzip: **Keine einzelne Zahl ohne Kontext**. Jeder Zuschussbetrag wird
immer zusammen mit Status, Quelle/Stand und mindestens einem "nächsten Schritt"
ausgegeben. Bei `nicht_bewertbar` wird KEIN Zahlenwert angezeigt, sondern nur der
Hinweis "mit aktuellem Datenstand nicht bewertbar – [Grund]".

---

# Standalone-Webrechner / Website-Einbindung

## Unabhängiger Lauf möglich?

Ja – der Förderrechner (zumindest MVP1 Gebäudehülle) benötigt nur wenige Eingaben
(Bauteil, U-Wert geplant, WG/NWG, Zonentemperatur, Anzahl WE, iSFP-Status,
Baubegleitung-Status, Investitionskosten). Diese Daten liegen NICHT zwingend in der
Gebäudeerfassungs-App vor (die primär Heizlast/Bestand erfasst) – ein Standalone-Modul
kann eigenständig funktionieren, ohne Abhängigkeit von Bestandsdaten.

## Minimale Eingabedaten (Webrechner-MVP)

- Gebäudetyp (WG/NWG), Anzahl WE
- Maßnahme(n) (Bauteil-Auswahl aus Liste, siehe regelsatz-mvp1)
- U-Wert geplant (oder "weiß ich nicht" → Status `nicht_bewertbar` mit Hinweis,
  Energieberater hinzuzuziehen)
- Investitionskosten brutto (geschätzt oder aus Angebot)
- iSFP vorhanden? (ja/nein/weiß ich nicht)
- Baubegleitung gebucht/geplant? (ja/nein)

## Unverbindliche Ergebnisse / Haftungshinweise

- Pflichttext (sichtbar vor JEDER Ergebnisanzeige): "Diese Berechnung ist eine
  unverbindliche Schätzung auf Basis der BEG-EM-Richtlinie vom 21.12.2023 / KfW-Merkblatt
  458 (Stand 12/2025). Sie ersetzt keine Energieberatung und keine verbindliche
  Förderzusage durch BAFA oder KfW."
- Footer-Hinweis: Kontaktaufnahme zu Kurz Quadrat für individuelle Beratung
  (Lead-Generierung, siehe unten).
- Bei `manuell_pruefen`/`nicht_bewertbar`: explizite Aufforderung "Bitte lassen Sie
  diesen Punkt durch eine Energieberaterin/einen Energieberater prüfen."

## Lead-Generierung

- Nach Ausgabe des Ergebnisses: optionales Kontaktformular ("Möchten Sie eine
  Einschätzung durch Kurz Quadrat erhalten? Ergebnis wird per E-Mail mitgesendet.")
- KEINE Pflichtangabe von Kontaktdaten zur Nutzung des Rechners (sonst Gefahr,
  als "verstecktes Lead-Formular" wahrgenommen zu werden – Vertrauensverlust).
- Ergebnis-PDF/E-Mail enthält denselben Disclaimer + Quellenstand wie die
  Bildschirmanzeige.

## Datenübergabe an Gebäudeerfassungs-App

- Standalone-Webrechner und Gebäudeerfassungs-App-Modul sollten **dasselbe
  Eingabedatenmodell** nutzen (siehe `regelmodell.md` Abschnitt 1), damit ein Nutzer,
  der zunächst den Webrechner nutzt und später Kunde wird, seine Eingaben
  (mit Zustimmung) in die App übernehmen kann (z. B. via Export/Import-Datei oder
  QR-Code/Link mit codierten Parametern). Kein direkter Datenbankzugriff zwischen
  Website und App nötig – lose Kopplung über Datenformat.

## Architektur (Widget/separate Seite/Mini-Repo/API)

| Variante | Beschreibung | Eignung |
|---|---|---|
| Eingebettetes Widget (iframe/Web Component) auf bestehender Kurz-Quadrat-Website | Schnell integrierbar, isoliertes CSS/JS | Gut für schnellen Start, aber zusätzliche Build-/Hosting-Frage |
| Separate Unterseite (z. B. kurz-quadrat.de/foerderrechner) | Eigenständige Seite mit eigenem Layout | Gut für SEO/Lead-Generierung, einfache Wartung |
| Eigenständiges Mini-Repo (statisches HTML/JS, kein Build-Step) | Analog zur heutigen Vanilla-App-Philosophie | Empfehlung für MVP – siehe Repository-Strategie |
| API/Backend-Service | Zentrale Regel-/Datenhaltung, mehrere Frontends (App, Website) konsumieren dieselbe API | Langfristig sinnvoll, aber Mehraufwand (Hosting, Versionierung) – nicht für MVP |

**Empfehlung für MVP**: eigenständiges, statisches Mini-Repo (HTML/CSS/Vanilla-JS,
kein Build-Step), das die Datenmodelle aus `regelmodell.md` und
`regelsatz-mvp1-gebaeudehuelle.md` 1:1 übernimmt. Spätere Integration in die
Gebäudeerfassungs-App (Premium-Modul) und/oder eine zentrale API ist dadurch nicht
ausgeschlossen, da Daten/Regeln/Berechnung bereits von Anfang an getrennt gehalten
werden (siehe Abschnitt 2.3 oben).

---

# Repository-Strategie

## Variante A: Bestehendes Repo weiterführen (alles in `Gebauudeaufnahme2`)

| Kriterium | Bewertung |
|---|---|
| Entwicklungsaufwand | Niedrig (kein neues Setup) |
| Trennbarkeit Premium-Modul | Schlecht – ohne klare Ordnergrenze faktisch nicht trennbar |
| Wiederverwendung Website-Rechner | Schlecht – Website bräuchte Teil-Checkout/Kopie |
| Updatefähigkeit | Mittel – Änderungen an Förderdaten vermischen sich im Commit-Verlauf mit App-Änderungen |
| Testbarkeit | Mittel | 
| Risiko für bestehende App | Hoch – jede Änderung im selben Repo erhöht Risiko versehentlicher Kopplung |
| API/MCP-Fähigkeit | Schlecht ohne weitere Strukturierung |
| GitHub-/Deployment-Struktur | Einfach (ein Repo, ein Deployment) |
| Daten-/Quellenversionierung | Möglich, aber vermischt mit App-Historie |

## Variante B: Getrenntes Modul `modules/beg/` im bestehenden Repo

| Kriterium | Bewertung |
|---|---|
| Entwicklungsaufwand | Niedrig-mittel (neue Ordnerkonvention, aber kein neues Repo-Setup) |
| Trennbarkeit Premium-Modul | Gut – klare Ordnergrenze, Feature-Flag-Aktivierung möglich |
| Wiederverwendung Website-Rechner | Mittel – Code könnte per Copy/Subtree in Website-Projekt übernommen werden, aber keine echte Trennung |
| Updatefähigkeit | Gut, wenn Daten/Regeln/Code wie in `foerderrechner-konzept.md` Abschnitt 2.3 getrennt gehalten werden |
| Testbarkeit | Gut – Modul kann isoliert getestet werden (z. B. eigene `beg-tests.md`) |
| Risiko für bestehende App | Mittel – sofern strikt "nur lesend" über Adapter gekoppelt (Abschnitt 2.2) |
| API/MCP-Fähigkeit | Mittel – Modul könnte später als eigenständiger Service extrahiert werden |
| GitHub-/Deployment-Struktur | Ein Repo, aber potenziell zwei Deploy-Ziele (App + ggf. Website-Build aus demselben Modul-Ordner) |
| Daten-/Quellenversionierung | Gut – `docs/quellen/beg/` bereits als eigener Bereich etabliert (dieses Projekt) |

## Variante C: Neues Repository `foerderrechner-beg`

| Kriterium | Bewertung |
|---|---|
| Entwicklungsaufwand | Mittel (neues Repo-Setup, CI/Deployment, ggf. Lizenz/Readme) |
| Trennbarkeit Premium-Modul | Sehr gut – physisch getrenntes Repo, ideal für Lizenzierung/Gating |
| Wiederverwendung Website-Rechner | Sehr gut – ein Repo kann sowohl Standalone-Website-Build als auch (per Submodule/NPM-Paket/Copy) das App-Premium-Modul beliefern |
| Updatefähigkeit | Sehr gut – eigener Versions-/Release-Zyklus, unabhängig von App-Releases |
| Testbarkeit | Sehr gut – eigene Test-Pipeline möglich |
| Risiko für bestehende App | Sehr gering – komplette Entkopplung |
| API/MCP-Fähigkeit | Sehr gut – natürlicher Ort für späteren API-Service oder MCP-Server ("Förder-Wissens-Repo") |
| GitHub-/Deployment-Struktur | Mehr Aufwand (zwei+ Repos, ggf. zwei Deployments), aber klar trennbar |
| Daten-/Quellenversionierung | Sehr gut – `docs/quellen/beg/` könnte 1:1 in das neue Repo umziehen und dort eigenständig weitergepflegt werden |

## Empfehlung

- **Jetzt (Status quo dieser Vorbereitungsphase)**: Quellen/Regelmodell/Konzept bleiben
  in `docs/quellen/beg/` im bestehenden Repo `Gebauudeaufnahme2` – kein Mehraufwand,
  keine App-Änderung, gemäß Auftrag.
- **Mittelfristig (Beginn der Implementierung von MVP1)**: **Variante B**
  (`modules/beg/` bzw. `js/foerderung-beg/` gemäß Abschnitt 1) – ermöglicht eine erste
  lauffähige Premium-Modul-Variante in der bestehenden App MIT minimalem Risiko, sofern
  die Adapter-Regel (Abschnitt 2.2) strikt eingehalten wird. Der Standalone-Webrechner
  kann in dieser Phase als einfache Kopie/Export des Moduls in ein separates,
  schlankes Mini-Repo (statisches HTML/JS) realisiert werden.
- **Langfristig (sobald Website-Rechner produktiv UND/ODER weitere Förderprogramme
  jenseits BEG hinzukommen)**: **Variante C** (`foerderrechner-beg` als eigenes
  Repository) – `docs/quellen/beg/` zieht dorthin um (inkl. Versionsgeschichte, falls
  gewünscht via `git subtree`/`git filter-repo`), das Modul wird von dort aus sowohl in
  die Gebäudeerfassungs-App (als Paket/Submodule) als auch in die Website
  eingebunden. Dieser Schritt sollte erst erfolgen, wenn der Aufwand für ein
  zweites Repo (CI, Versionierung) durch tatsächlichen Mehrfach-Einsatz
  gerechtfertigt ist – nicht vorab "auf Vorrat".

---
