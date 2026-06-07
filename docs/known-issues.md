# Known Issues

Diese Datei dokumentiert bekannte Fehler und Auffälligkeiten, die nach dem Refactoring-Stand bekannt sind. Ziel ist, Refactoring, Produktdefinition und Bugfixing sauber zu trennen.

## Prioritätslogik

Fehler werden in folgender Reihenfolge priorisiert:

1. Datenverlust
2. falsche Zuordnung von Daten oder Fotos
3. unvollständige Erfassung
4. falscher Export oder Bericht
5. blockierende Bedienfehler
6. Bedienbarkeit / UI
7. Komfort / Schönheitsfehler

## Statuswerte

* offen
* in Prüfung
* behoben
* zurückgestellt

---

## KI-001: App startet beim Öffnen nicht in der Projektübersicht

* Status: behoben
* Priorität: niedrig
* Bereich: UI / Navigation / Startzustand
* Blockiert Nutzung: nein
* Seit wann bekannt: nach Refactoring-Stand dokumentiert, Fehler bestand bereits vorher
* Reproduktionsschritte:

  1. Link zur App öffnen.
  2. App lädt.
  3. Statt der Projektübersicht wird direkt ein Geschoss angezeigt.
* Erwartetes Verhalten:
  Beim Öffnen der App soll die Projektübersicht angezeigt werden.
* Tatsächliches Verhalten:
  Beim Öffnen landet der Nutzer in einem Geschoss.
* Vermutung:
  Der zuletzt gespeicherte View- oder Geschosszustand wird aus dem localStorage wiederhergestellt und direkt geöffnet.
* Behebung:
  Die App setzt beim Start nun immer `state.aktivesView` auf `'projekte'`, sodass beim Öffnen zuverlässig die Projektübersicht angezeigt wird. Gespeicherte Projekte und Daten bleiben dabei unverändert erhalten.

---

## KI-002: Jahreszahlen starten bei Eingabe über Pfeiltasten bei 0

* Status: offen
* Priorität: niedrig
* Bereich: UI / Eingabefelder / Jahresauswahl
* Blockiert Nutzung: nein
* Seit wann bekannt: nach Refactoring-Stand dokumentiert, Fehler bestand bereits vorher
* Reproduktionsschritte:

  1. Ein Jahresfeld öffnen, z. B. Baujahr oder Sanierungsjahr.
  2. Pfeiltasten hoch/runter bzw. die Zahlensteuerung verwenden.
  3. Jahreswert startet bei 0.
* Erwartetes Verhalten:
  Baujahre sollen bei einem realistischen Baujahr starten, aktuelle Arbeitshypothese: 1977.
  Sanierungsjahre sollen bei einem realistischen Sanierungsjahr starten, aktuelle Arbeitshypothese: 2000.
* Tatsächliches Verhalten:
  Die Jahreszahl startet bei 0.
* Vermutung:
  Das Eingabefeld hat keinen sinnvollen Default-/Min-Wert oder ein leerer Wert wird als 0 interpretiert.
* Entscheidung:
  Nicht im Refactoring beheben. In separater Bugfix-Phase prüfen.

---

## Noch nicht bewertete Themen

* Fotoanalyse ist im Code vorhanden, wurde aber noch nicht aktiv genutzt oder fachlich getestet.
* PDF-Erfassungsbericht mit Bildern ist Ziel für Version 1, aber noch nicht als bestehende Funktion validiert.
* Disto-X6-Workflow ist Zielbild, aber noch nicht umgesetzt.
