# Refactoring-Stand

## Ausgangslage

Das Projekt bestand ursprünglich im Wesentlichen aus einer großen index.html mit HTML, CSS und JavaScript in einer Datei. Ziel des Refactorings war, den Monolithen zu entschärfen, ohne Funktionalität zu verändern.

## Ausgelagerte Dateien

- css/style.css: gesamtes Styling
- js/config.js: statische Konstanten und Konfigurationswerte
- js/heizlast.js: Geometrie- und Heizlast-Berechnungsgrundlagen
- js/state.js: Datenmodell, Getter/Setter, localStorage-Persistenz
- js/export.js: Exporttext, JSON-Export und JSON-Import
- js/api.js: Anthropic-API-Aufruf und Fotoanalyse-Code
- js/ui.js: allgemeine UI-Helfer

## Verbleibende Verantwortung von index.html

index.html enthält weiterhin:

- HTML-Grundstruktur
- zentrale Navigation / showView
- CRUD-nahe UI-Funktionen
- Modal- und Settings-Funktionen
- verbleibende Render-Funktionen
- Init-Block

## Bewusst noch nicht ausgelagert

Die Render- und View-Funktionen wurden noch nicht nach views.js verschoben, weil sie stark mit onclick-Strings, globalen Funktionsnamen, CRUD-Funktionen und showView verflochten sind. Eine Auslagerung wäre möglich, aber riskanter als die bisherigen Schritte.

## Aktuelle Bewertung

Das Ziel „Monolith entschärfen ohne Funktionsänderung“ ist im Kern erreicht. Die fachlich klar abgrenzbaren Bereiche sind ausgelagert. Die verbleibende index.html enthält die am stärksten verflochtene UI-/Render-/Navigationsschicht.

## Empfohlene nächste Schritte

1. Manuellen Smoke-Test durchführen.
2. Bekannte Fehler dokumentieren.
3. Produktziel und MVP konkretisieren.
4. Bugfix-Phase priorisieren.
5. views.js-Auslagerung nur später und in kleinen Teilgruppen prüfen.
