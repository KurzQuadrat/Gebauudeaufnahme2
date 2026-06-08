# Design-System: Kurz Quadrat Corporate Design

## Überblick

Die Gebäudeerfassungs-App nutzt das Corporate Design von Kurz Quadrat als reine
CSS-Schicht. Fachlogik, Datenmodell, Heizlast-Berechnung und LocalStorage bleiben
vollständig unberührt.

**v0.2.5-dev — Designbasis stabilisiert:**
In v0.2.4-dev hatten verschiedene `--kq-*`-Token-Mappings zu visuellen Inkonsistenzen
geführt (rosa-getönte Borders `#e6d8dc`, bordeaux-getönte Sekundärtexte `#5a3742`,
weiße Inputs auf weißen Karten, 8px-Radien). Ab v0.2.5 gilt:
- `css/brand.css` bleibt Design-Tokens-Quelle (Schrift, --kq-Tokens)
- `css/style.css` ist maßgeblich für App-Layout und verwendet überwiegend
  hardcodierte neutrale Werte statt rosa-getönter KQ-Token
- Bordeaux (`#780129`) NUR für Buttons, Fokus-Ringe, Akzentlinien
- Neutrale Arbeitsflächen: `--border: #d2d2d7`, `--text-sec: #6e6e73`,
  `--input-bg: #f5f5f7`, Seitenhintergrund `#f5f5f7`
- Mobile Nutzbarkeit und Lesbarkeit haben Vorrang vor Brand-Vollintegration

## Dateien und Schichten

| Datei | Zweck |
|---|---|
| `css/brand.css` | **Zentrale Design-Quelle.** Kurz-Quadrat-Design-Tokens (`--kq-*`), CD-Klassen, Reset. Enthält keine App-Logik. |
| `css/style.css` | **App-spezifisches Layout.** Bindet Brand-Tokens ein, definiert App-Klassen (`.card`, `.btn`, `.list-item` …). |
| `design-system/kurz-quadrat/demo.html` | **Referenz-Datei** (nicht produktiv). Zeigt alle brand.css-Klassen in einer eigenständigen Demo. |

### Ladereihenfolge in `index.html`

```html
<link rel="stylesheet" href="css/brand.css">   <!-- 1. Design-Tokens zuerst -->
<link rel="stylesheet" href="css/style.css">   <!-- 2. App-Layout darüber -->
```

`brand.css` muss immer **vor** `style.css` geladen werden, da style.css via
`var(--kq-*)` auf die Tokens verweist.

## Token-Mapping: App-intern → Brand

`css/style.css` setzt die App-internen Variablen auf KQ-Token-Werte:

| App-Variable | KQ-Token | Wert | Bedeutung |
|---|---|---|---|
| `--bg` | — | `#f0f0f0` | Seitenhintergrund (neutrales Hellgrau) |
| `--card` | `--kq-surface` | `#ffffff` | Kartenoberflächen |
| `--primary` | `--kq-bordeaux` | `#780129` | Primäraktionen, Headlines |
| `--primary-dark` | `--kq-bordeaux-700` | `#5c0020` | Hover/Active auf Primary |
| `--danger` | `--kq-danger` | `#e7024e` | Fehler, Löschen |
| `--success` | `--kq-success` | `#2bb775` | Erfolgsstatus |
| `--warning` | `--kq-warning` | `#b8860b` | Warnstatus |
| `--text` | `--kq-fg` | `#1a0009` | Fließtext |
| `--text-sec` | `--kq-fg-muted` | `#5a3742` | Sekundärtext |
| `--border` | `--kq-border` | `#e6d8dc` | Haarlinien |
| `--input-bg` | `--kq-surface` | `#ffffff` | Eingabehintergründe |
| `--radius` | `--kq-radius-3` | `8px` | Standardradius |
| `--radius-sm` | `--kq-radius-2` | `4px` | Kleiner Radius |

## Kurz-Quadrat-CD-Regeln (Kurzfassung)

- **Primärfarbe:** Bordeaux `#780129` — Buttons, Headlines, Linien, aktive Zustände (keine großen Hintergrundflächen)
- **Akzent:** Amaranth `#e7024e` — Störer, Fokus-Ringe, Disto-/Messfeld-Rahmen (kein Flächenfüll)
- **Akzent:** Mint `#8effb9` — Erfolgs-/Förderstatus, Spinner-Akzent
- **Schrift:** Scandia (Bold + Regular); Fallback: `-apple-system, BlinkMacSystemFont, …`
- **Headlines:** uppercase, tracking ~0.08em, Bordeaux
- **Eckradien:** knapp (8px Standard, 4px klein) — keine weichen Rundungen
- **Schatten:** sparsam, bordeaux-getönt, kein Blur/Glas
- **Keine Verläufe** auf Flächen

## Schrift: Scandia

`brand.css` enthält `@font-face`-Regeln für `fonts/Scandia-Regular.ttf` und
`fonts/Scandia-Bold.ttf`. Die Schriftdateien sind **nicht** im Repository
(lizenzrechtlich zu klären). Ohne lokale Fontdateien greift die Fallback-Kette:

```
"Scandia", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif
```

Die App ist auch ohne Scandia vollständig nutzbar.

## Logos

Noch nicht eingebunden. Logo-Einbindung ist ein separater, späterer Schritt:

- Logos nur aus `assets/logos/` verwenden (nicht nachzeichnen, nicht umfärben)
- Kein SVG selbst erfinden
- Kein Logo im App-Header bis zur ausdrücklichen Freigabe

## Referenz-Demo

`design-system/kurz-quadrat/demo.html` zeigt alle brand.css-Klassen mit
Beispielinhalten. Der Link in der Demo verweist relativ auf `../../css/brand.css`.

**Wichtig:** Die demo.html ist eine **reine Referenz** — nicht produktiv, nicht
Teil der Navigation, kein Start-Ersatz für `index.html`.

Über die Demo wurden folgende Muster auf die Gebäudeerfassung übertragen:

| Muster | Übertragen als |
|---|---|
| `.kq-btn` mit Pfeilform | _nicht übernommen_ — App nutzt `.btn` (rechteckig, mobile-freundlich) |
| `.kq-card` | Card-Basis-Token (shadow, border, radius) |
| `.kq-badge--soft/.--mint` | Badge-Farben remapped |
| `.kq-note` | Basis für `.info-box`: weiß, bordeaux-Linie links (kein Hintergrundton) |
| `.kq-table` | Basis für Tabellenstile (falls vorhanden) |
| Fokusring Amaranth | `box-shadow: 0 0 0 3px rgba(120, 1, 41, 0.15)` auf Inputs |
| Disto-Messfelder | Amaranth als Akzent (war Apple-Blau) |

Die Pfeilform-Buttons (`.kq-btn` mit `clip-path`) wurden bewusst **nicht**
auf die App-Buttons übertragen: Die `.btn`-Klasse der App ist kompakt,
mobile-optimiert und benötigt keine Clip-Path-Logik.

## Änderungen an der Fachlogik

**Keine.** Dieses Dokument beschreibt ausschließlich die Design-Schicht.
Heizlast-Berechnung, Raumaufnahme, Datenmodell, Export, Fotos und LocalStorage
wurden nicht verändert.
