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

* Status: behoben
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
* Behebung:
  Leere Jahresfelder erhalten beim Fokussieren einen sinnvollen Startwert (`onfocus`): Baujahr Projekt startet bei 1977, Baujahr Heizungsanlage und Sanierungsjahr starten bei 2000. Das `min`-Attribut wurde auf 1800 gesetzt, sodass weiterhin ältere Jahreszahlen eingegeben und per Pfeiltaste angefahren werden können. Bestehende gespeicherte Werte bleiben unverändert, manuelle Eingabe bleibt weiterhin möglich.
  Korrektur: Defaultwerte sind keine Mindestwerte; kleinere Jahreszahlen bleiben möglich.

---

## KI-003: Messworkflow Raummaße – Enter/Fokus springt nicht zuverlässig ins nächste Feld

* Status: behoben
* Priorität: blockierende Bedienfehler
* Bereich: Raumaufnahme / Raummaße / Disto-Messworkflow
* Blockiert Nutzung: teilweise (erschwert zügige Vor-Ort-Erfassung mit Laser-/Distogerät)
* Seit wann bekannt: beim Test mit einem Disto-/Laser-Messgerät aufgefallen
* Reproduktionsschritte:

  1. Raum öffnen, Bereich „Raummaße“ (lichte Höhe, Wandlängen N/O/S/W) aufrufen.
  2. Messwert per Disto-/Lasergerät übertragen (Gerät sendet den Wert inkl. Enter).
  3. Beobachtung: Der Fokus blieb teils im aktuellen Feld stehen oder sprang in ein fachlich falsches Feld.
* Erwartetes Verhalten:
  Nach Enter (bzw. Übertragung vom Messgerät) springt der Fokus zuverlässig zum logisch nächsten Messfeld in der Reihenfolge: lichte Höhe → Wand N Segment 1 → Segment 2 → Wand O Segment 1 → Segment 2 → Wand S Segment 1 → Segment 2 → Wand W Segment 1 → Segment 2 → danach kein automatischer Sprung mehr.
* Tatsächliches Verhalten (vor der Korrektur):
  Es existierte keinerlei Enter-/Fokus-Weiterschaltung für die Raummaß-Felder; der Browser blieb beim Standardverhalten, das je nach Tastatur/Gerät uneinheitlich reagiert.
* Vermutung:
  Es fehlte eine zentrale, definierte Fokus-Reihenfolge mit Enter-Behandlung für die Messfelder.
* Behebung:
  Eine feste Fokus-Reihenfolge (`MESSFELD_REIHENFOLGE`) sowie die Funktionen `focusNextMessfeld()` und `handleMessfeldKeydown()` wurden ergänzt (`index.html`). Bei Enter in einem der neun Raummaß-Felder (lichte Höhe, Wand N/O/S/W je Segment 1/2) springt der Fokus gezielt zum nächsten Feld in der definierten Reihenfolge und der bisherige Wert wird zur Überschreibung markiert (`select()`); danach erfolgt kein weiterer automatischer Sprung. Tabulator-, Maus- und Touch-Bedienung sowie manuelle Eingabe bleiben unverändert nutzbar, da nur die Enter-Taste abgefangen wird.

---

## KI-004: Wandflächenberechnung lieferte bei Komma-Messwerten falsche Ergebnisse

* Status: behoben
* Priorität: falscher Export oder Bericht
* Bereich: Raumaufnahme / Heizlastberechnung (`js/heizlast.js`)
* Blockiert Nutzung: nein, verfälscht aber Flächen- und Heizlastanzeige
* Seit wann bekannt: beim Test mit einem Disto-/Laser-Messgerät aufgefallen
* Reproduktionsschritte:

  1. Raum öffnen, lichte Höhe bzw. Wandlänge per Disto-/Lasergerät oder manuell mit Komma als Dezimaltrennzeichen eingeben (z. B. „2,50“ statt „2.50“).
  2. Berechnung ausführen / Flächen unten ansehen.
  3. Beobachtung: Die berechneten Wandflächen (und davon abgeleitet U-Wert-Flächen sowie Heizlast) stimmten nicht mit „Wandlänge × lichte Höhe“ überein.
* Erwartetes Verhalten:
  Brutto-Wandfläche je Wand = Wandlänge (Summe der vorhandenen Segmente) × lichte Raumhöhe. Beispiel: lichte Höhe 2,50 m, Wand N 4,00 m → 10,00 m²; lichte Höhe 2,40 m, Wand O 3,50 m → 8,40 m².
* Tatsächliches Verhalten (vor der Korrektur):
  `parseFloat()` wertete Werte mit Komma als Dezimaltrennzeichen (z. B. „2,50“) nur bis zum Komma aus (Ergebnis 2 statt 2,5), wodurch lichte Höhe und/oder Wandlängen falsch interpretiert und die Wandflächen (und nachgelagert die Heizlast) verfälscht wurden.
* Vermutung:
  Disto-/Lasergeräte können Messwerte je nach Geräte-/Spracheinstellung mit Komma als Dezimaltrennzeichen liefern; eine robuste Zahlinterpretation fehlte.
* Behebung:
  Eine zentrale Hilfsfunktion `parseMesswert()` wurde ergänzt (`js/heizlast.js`), die ein Komma defensiv in einen Punkt umwandelt, bevor der Wert geparst wird. `cm()` und die Auswertung der lichten Höhe (`h`) nutzen nun `parseMesswert()`. Die fachliche Formel selbst (Brutto-Wandfläche = Summe der Wandsegmente × lichte Höhe, `A_wN = h*(n1+n2)` usw.) war bereits korrekt und wurde unverändert beibehalten – korrigiert wurde ausschließlich die Zahlinterpretation der Eingabewerte. Bestehende, bereits korrekt mit Punkt gespeicherte Werte bleiben unverändert nutzbar.

---

## KI-005: Einheitenfehler – Disto-Werte in Meter wurden bei Wandlängen als Zentimeter interpretiert

* Status: behoben (für neue Eingaben ab sofort)
* Priorität: falscher Export oder Bericht
* Bereich: Raumaufnahme / Raummaße / Wandlängen / Heizlastberechnung (`index.html`, `js/heizlast.js`)
* Blockiert Nutzung: nein, verfälscht aber Flächen- und Heizlastanzeige erheblich
* Seit wann bekannt: beim Test mit einem Disto-/Laser-Messgerät aufgefallen
* Reproduktionsschritte:

  1. Raum öffnen, Bereich „Wandlängen" aufrufen (Felder waren bisher mit „cm" beschriftet und mit `cm()` in Meter umgerechnet, also ÷100).
  2. Disto-/Lasergerät überträgt einen Messwert in Meter, z. B. „4.00" für 4,00 m.
  3. Beobachtung: Der Wert „4.00" wurde von der App als 4,00 cm interpretiert (`cm("4.00")` = 0,04 m), wodurch die berechnete Wandfläche um den Faktor 100 zu klein ausfiel.
* Erwartetes Verhalten:
  Disto-Werte in Meter (z. B. „2.50", „2,50" oder „2.5") werden als Meter behandelt. Wandfläche = Wandlänge in m × lichte Höhe in m. Beispiel: lichte Höhe 2,50 m, Wand N 4,00 m → 10,00 m²; lichte Höhe 2,40 m, Wand O 3,50 m → 8,40 m².
* Tatsächliches Verhalten (vor der Korrektur):
  Die Felder „Wandlängen N/O/S/W" (inkl. Segmente) waren in der UI mit „cm" beschriftet und wurden in `berechneRaumGeometrie()` über `cm(v)` (Division durch 100) ausgewertet – obwohl das Disto-/Lasergerät die Werte in Meter überträgt. Dadurch wurden Wandlängen faktisch um den Faktor 100 zu klein in die Flächen- und Heizlastberechnung übernommen.
* Vermutung:
  Uneinheitliche Annahme zur Maßeinheit: Wandlängen wurden wie Bauteilmaße (Fenster, Türen, Nischen, Vorsprünge – dort weiterhin korrekt in cm per Maßband erfasst) behandelt, obwohl sie von einem Disto-/Lasergerät in Meter geliefert werden.
* Behebung:
  Die Felder „Wandlängen N/O/S/W" (inkl. Segmente, `wand_n1`…`wand_w2`) werden jetzt eindeutig als Meterfelder geführt: UI-Beschriftung auf „m" geändert (Card-Titel, Spaltenköpfe „Segment 1 (m)"/„Segment 2 (m)", Platzhalter „m"), und in `js/heizlast.js` wertet eine neue Hilfsfunktion `meter()` diese Felder direkt als Meterwert aus (keine Division durch 100, im Unterschied zu `cm()`). Die lichte Höhe war bereits korrekt als Meterfeld geführt und bleibt unverändert. Bauteilmaße (Fenster, Türen, Nischen, Vorsprünge, Dachschräge/Gaube) bleiben unverändert in Zentimeter (`cm()`), da diese fachlich weiterhin per Maßband in cm erfasst werden.
* Wichtiger Hinweis zu Bestandsdaten:
  Es erfolgt **keine automatische Migration** bestehender, bereits gespeicherter Wandlängen-Werte. Da nicht zuverlässig erkennbar ist, ob ein gespeicherter Wert wie „400" nach alter Annahme als 400 cm (= 4 m, bisherige Interpretation) oder bereits als 400 m (fehlerhafte Eingabe) gemeint war, würde eine automatische Umrechnung das Risiko falscher Daten lediglich verschieben statt beheben. **Bei Räumen, deren Wandlängen vor dieser Korrektur erfasst wurden, sollten die Werte „Wandlängen N/O/S/W" geprüft und ggf. neu (in Meter, z. B. „4.00" für 4 m) eingegeben werden.** Neue Erfassungen ab sofort sind korrekt, sofern Werte in Meter eingegeben bzw. vom Disto-/Lasergerät übertragen werden.

---

## Noch nicht bewertete Themen

* Fotoanalyse ist im Code vorhanden, wurde aber noch nicht aktiv genutzt oder fachlich getestet.
* PDF-Erfassungsbericht mit Bildern ist Ziel für Version 1, aber noch nicht als bestehende Funktion validiert.
* Disto-X6-Workflow ist Zielbild, aber noch nicht umgesetzt.
