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

## KI-006: Innenwände (IW) wurden in der Heizlastberechnung wie Außenwände gegen Außenluft gerechnet

* Status: behoben
* Priorität: falscher Export oder Bericht
* Bereich: Raumaufnahme / Heizlastberechnung (`index.html`, `js/heizlast.js`, `js/state.js`)
* Blockiert Nutzung: nein, führte aber zu spürbar überhöhter Heizlastanzeige bei Räumen mit Innenwänden
* Seit wann bekannt: bei fachlicher Durchsicht der Heizlast-Vorabschätzung aufgefallen
* Reproduktionsschritte:

  1. Raum öffnen, Wandlängen N/O/S/W erfassen und mindestens eine Wand als „IW" (Innenwand) klassifizieren.
  2. Bereich „Flächen & Heizlast" aufrufen, U-Werte eingeben, „Berechnen" tippen.
  3. Beobachtung: Die als „IW" klassifizierte Wandfläche wurde zusammen mit den Außenwänden in einer einzigen Gruppe „Außenwand" gegen Außenluft (Normaußentemperatur) gerechnet.
* Erwartetes Verhalten:
  Außenwände (AW) werden gegen Außenluft / Normaußentemperatur gerechnet. Innenwände (IW) werden NICHT gegen Außenluft gerechnet: bei Angrenzung an einen beheizten Bereich entsteht keine bzw. nur vernachlässigbare Transmissionsheizlast, bei Angrenzung an einen unbeheizten Bereich wird eine eigene Temperaturannahme verwendet (Default 7 °C, projektweit und je Raum überschreibbar). Wände mit unbekannter Klassifizierung werden weder stillschweigend als Außenwand gerechnet noch in die Summe einbezogen, sondern transparent als „Art unbekannt" ausgewiesen.
* Tatsächliches Verhalten (vor der Korrektur):
  Die Klassifizierung „AW"/„IW" je Himmelsrichtung (`r.wand_n_art` usw.) wurde zwar erfasst und angezeigt, in `renderUWertInputs()`/`renderHeizlastErgebnis()` jedoch nicht ausgewertet – die gesamte Wandfläche (`A_wN+A_wO+A_wS+A_wW`) floss ungeachtet ihrer Klassifizierung in eine einzige Gruppe „Außenwand" mit `grenzt_an = 'aussen'` (fx = 1,0) ein.
* Vermutung:
  Die AW/IW-Klassifizierung wurde zunächst nur als Erfassungsfeld angelegt; die Verknüpfung mit der Heizlastberechnung war ein separater, noch ausstehender Schritt.
* Behebung:
  `berechneRaumGeometrie()` (`js/heizlast.js`) ermittelt nun je Himmelsrichtung anhand von `wand_*_art` die Brutto-Wandflächen für „AW", „IW" und „Art unbekannt" (`A_wand_aw`, `A_wand_iw`, `A_wand_unbekannt`). `renderUWertInputs()`/`renderHeizlastErgebnis()` (`index.html`) führen Außenwand und Innenwand als getrennte Bauteilgruppen: Außenwand wird weiterhin gegen Außenluft/Normaußentemperatur gerechnet (ΔT = t_i − θ_e), Innenwand erhält eine eigene, reduzierte Auswahl „angrenzend beheizt" (≈ keine Heizlast, fx = 0) oder „angrenzend unbeheizt" (eigene ΔT = t_i − Temperatur unbeheizter Bereich). Wandflächen mit unbekannter Klassifizierung werden separat als „Wand – Art unbekannt" mit Flächenangabe und Hinweistext ausgewiesen, gehen aber nicht in die Heizlastsumme ein und werden nicht als Außenwand behandelt. Die Norm-Außentemperatur und die Temperatur des unbeheizten Bereichs stammen nun primär aus den neuen projektweiten Heizlast-Standardwerten (`p.heizlastDefaults.tempAussenNorm` / `tempUnbeheiztDefault`, Defaults −12 °C / 7 °C); die bisherige feste Konstante `THETA_E` bleibt als Fallback für Bestandsprojekte ohne `heizlastDefaults` erhalten. Bestehende Projekte/Räume erhalten die neue Struktur defensiv über `load()`; vorhandene `u_werte`/`grenzt_an`-Werte bleiben als Fallback in der U-Wert-Prioritätskette (Raum-Override > Projekt-Standard > Bestandswert > unbekannt) erhalten, sodass keine Daten verloren gehen.
* Wichtiger Hinweis zu Bundesanzeiger-Tabellenwerten:
  Die in `heizlastDefaults` vorbereitete Möglichkeit einer baujahresabhängigen U-Wert-Ableitung (`baujahrAbleitungAktiv`) ist als Struktur angelegt, aber inhaltlich noch nicht befüllt: Die konkreten Tabellenwerte aus der „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung im Wohngebäudebestand" vom 8. Oktober 2020 liegen im Repository noch nicht vor und wurden bewusst nicht erfunden oder geschätzt. Sie müssen in einem späteren Schritt aus der Originalquelle ergänzt werden.

---

## KI-007: Regression - Wandflächenanzeige und Raum-Wattzahl nach Heizlast-Umbau (KI-006) nicht sichtbar

* Status: behoben
* Priorität: wichtige Anzeige verschwunden
* Bereich: Raumaufnahme / Heizlastberechnung (`index.html`)
* Blockiert Nutzung: nein, machte die Heizlast-Vorabschätzung für die meisten Bestandsräume aber unbrauchbar (keine Wattzahl, keine Wandfläche/-U-Werte sichtbar)
* Seit wann bekannt: direkt nach dem Commit „Add project heating load defaults and wall type logic" (095e965) vom Nutzer gemeldet
* Reproduktionsschritte:

  1. Einen bereits bestehenden Raum öffnen, dessen Wände noch keine AW/IW-Klassifizierung je Himmelsrichtung besitzen (`wand_*_art` leer/„unbekannt" – das ist bei allen vor KI-006 erfassten Räumen der Fall).
  2. Bereich „Flächen & Heizlast" aufrufen, „Berechnen" tippen.
  3. Beobachtung: Die Wandfläche(n) erscheinen nicht mehr als editierbares U-Wert-Feld (nur ein Hinweistext „nicht in der Summe enthalten"), die wirksamen U-Werte sind nicht erkennbar/überschreibbar, und die berechnete Raum-Wattzahl (Φ_T) fällt deutlich niedriger aus oder verschwindet faktisch, weil die komplette Wandfläche aus der Summe ausgeschlossen wird.
* Erwartetes Verhalten:
  Die Heizlastanzeige im Raum zeigt weiterhin transparent: berechnete Wandflächen (inkl. Flächen mit unbekannter AW/IW-Zuordnung), die wirksamen U-Werte je Bauteil mit Quelle (Projektstandard/Override/Bestandswert), die Möglichkeit, U-Werte je Raum zu überschreiben, sowie die berechnete Wattzahl (Φ_T) je Raum.
* Tatsächliches Verhalten (vor der Korrektur):
  Die mit KI-006 eingeführte Behandlung von Wandflächen mit unbekannter AW/IW-Klassifizierung („Art unbekannt") schloss diese Flächen vollständig aus: `renderUWertInputs()` zeigte für sie nur eine reine Infobox ohne Eingabefeld, und `renderHeizlastErgebnis()` nahm sie über ein frühes `return` aus der Φ_T-Summe heraus („… nicht in der Summe enthalten, nicht als Außenwand gerechnet"). Da nahezu alle Bestandsräume noch keine Klassifizierung je Himmelsrichtung besitzen, fiel dadurch praktisch die gesamte Wandfläche dieser Räume aus Anzeige und Berechnung heraus – die Wandflächenanzeige wirkte „verschwunden" und die Raum-Wattzahl war nicht mehr aussagekräftig sichtbar.
* Vermutung:
  Die in KI-006 gewählte strikte Auslegung von „keine stillschweigend erfundenen Werte" (unbekannte Klassifizierung weder als AW noch als IW rechnen) wurde zu einem vollständigen Ausschluss aus Anzeige und Summe verschärft, ohne zu berücksichtigen, dass dies für nahezu alle Bestandsräume zum Totalausfall der Anzeige führt.
* Behebung:
  Wandflächen mit unbekannter Klassifizierung („Wand – Art unbekannt") erhalten in `renderUWertInputs()` wieder dasselbe editierbare U-Wert-Feld samt „grenzt an"-Auswahl wie Außenwände (Default-Quelle: `awUwert`, Bestandsfallback `u_werte.aw` über die neue Hilfsfunktion `hlFallbackKey()`), ergänzt um einen sichtbaren, nicht-stillschweigenden Warnhinweis „Art unbekannt – vorläufig wie Außenwand gerechnet, bitte AW/IW zuordnen". `renderHeizlastErgebnis()` bezieht diese Flächen entsprechend konservativ wie Außenwand (ΔT gegen Normaußentemperatur) in die Φ_T-Summe ein und weist dies zusätzlich transparent in den Hinweisen aus („… wird vorläufig konservativ wie Außenwand (Normaußentemperatur) gerechnet. Bitte AW/IW zuordnen."). Damit sind Wandflächen, wirksame U-Werte (mit Quellenangabe), deren Überschreibbarkeit je Raum und die berechnete Raum-Wattzahl wieder wie vor dem Umbau sichtbar – und zwar auch für Bestandsräume ohne nachträgliche AW/IW-Zuordnung. Die in KI-006 eingeführte AW/IW-Trennung bleibt für tatsächlich klassifizierte Wände unverändert erhalten (AW gegen Normaußentemperatur, IW gegen „beheizt"/„unbeheizt" mit eigener ΔT-Logik) – es wird nicht „wieder alles wie AW gerechnet", sondern nur die bislang komplett ausgeschlossene Restmenge unklassifizierter Wände transparent und konservativ in die bestehende Berechnung eingegliedert.

---

## KI-008: Uneinheitliche Maßeinheiten in der Raumaufnahme (cm/m gemischt) und verwirrender Heizlast-Override

* Status: behoben
* Priorität: Verwechslungsgefahr bei der Eingabe / unklare Heizlast-Eingaben
* Bereich: Raumaufnahme / Heizlastanzeige (`index.html`, `js/heizlast.js`, `js/export.js`, `js/state.js`)
* Blockiert Nutzung: nein, führte aber zu Verwechslungsgefahr zwischen cm- und m-Eingaben (Disto liefert durchgehend Meterwerte) und zu einer schwer verständlichen Override-Eingabe im Raum
* Tatsächliches Verhalten (vor der Korrektur):
  Disto-/Lasermesswerte wurden je nach Feld unterschiedlich interpretiert: Wandlängen bereits als Meter (siehe KI-005), Fenster-, Tür-, Heizkörper-, Nischen-, Vorsprung- und Dachschrägen-/Gaubenmaße dagegen weiterhin mit „cm"-Beschriftung und Umrechnung über `cm()` (Division durch 100) ausgewertet – obwohl auch hier durchgehend Meterwerte vom Messgerät kommen bzw. eingegeben werden. Zusätzlich enthielt die Raumansicht einen schwer verständlichen Block „Heizlast-Override (Raum)" mit der Eingabe „Temperatur unbeheizter angrenzender Bereich", dessen Wirkung in der Praxis unklar war. Außerdem gab es je Wandrichtung zwei Längenfelder („Segment 1"/„Segment 2"), was die Eingabe unnötig verkomplizierte.
* Behebung:
  Alle Disto-gemessenen Felder der Raumaufnahme (Fenster-, Tür-, Heizkörper-, Nischen-, Vorsprung- und Dachschrägen-/Gaubenmaße) werden jetzt einheitlich als Meterwerte erfasst und angezeigt (UI-Beschriftung „m", Eingabe mit Komma oder Punkt wird über `parseMesswert()`/`meter()` gleich behandelt; siehe `js/heizlast.js`, `index.html`, `js/export.js`). Die Wandlängen-Eingabe wurde auf ein eindeutiges Längenfeld je Himmelsrichtung reduziert (`renderWandlaengen()`); vorhandene Alt-Werte in den bisherigen Segment-2-Feldern (`wand_*2`) bleiben unverändert erhalten und fließen weiterhin in die Flächenberechnung ein – mit einem sichtbaren Hinweis in der Wandliste, falls solche Alt-Daten vorhanden sind (kein Datenverlust). Der verwirrende Block „Heizlast-Override (Raum)" wurde aus der Bedienoberfläche entfernt; die zugrundeliegende Datenstruktur (`r.heizlastOverrides.tempUnbeheizt`) bleibt bestehen und wird weiterhin in der Heizlast-Prioritätskette berücksichtigt, falls Altwerte vorhanden sind. Zusätzlich wurde je Wandrichtung ein direkt erfassbarer „angrenzender Bereich" (`wand_*_grenzt`: Außenluft/Erdreich/unbeheizter Raum/beheizter Raum/unbekannt) ergänzt, der als Vorbelegung für die bestehende AW/IW-Heizlastauswahl dient (`wandGrenztDefault()`), ohne die bestehende Berechnungsmethodik zu ändern.
* Hinweis zur Datenmigration:
  Es wurde **keine automatische Massenmigration** bestehender Werte durchgeführt – die Anwendung war zum Zeitpunkt der Korrektur nicht produktiv im Einsatz und enthielt ausschließlich Testwerte (vom Nutzer bestätigt), sodass eine vollständige Umstellung auf Meter ohne Altdaten-Risiko möglich war. Es wurden keine Daten gelöscht.

## KI-009: Wandfoto-Buttons entfernt (Korrektur einer kurz zuvor ergänzten Funktion) und Tab-Fokus im Messworkflow ergänzt

* Status: behoben
* Priorität: Bedienbarkeit Raumaufnahme
* Bereich: Raumaufnahme (`index.html`: `renderWandlaengen()`, `handleMessfeldKeydown()`)
* Blockiert Nutzung: nein
* Hintergrund:
  Im unmittelbar vorausgegangenen Schritt wurde je Wandrichtung ein Wandfoto-Button (`triggerWandFoto`) ergänzt. Auf ausdrücklichen Wunsch wurde diese Funktion direkt danach wieder zurückgenommen: „Wände brauchen keine Foto-Möglichkeit mehr.“ Dies ist eine bewusste, kurzfristige Korrektur und keine schleichende Inkonsistenz.
* Behebung:
  Die Wandfoto-Buttons inkl. Vorschau wurden aus `renderWandlaengen()` entfernt, ebenso die Funktion `triggerWandFoto()`. Die zugrunde liegenden Datenfelder (`wand_n_foto`/`wand_o_foto`/`wand_s_foto`/`wand_w_foto`, inkl. defensiver Migration in `js/state.js`) bleiben unverändert bestehen – es gehen dadurch keine ggf. bereits erfassten Fotos verloren, sie werden in der UI nur nicht mehr angezeigt oder neu erfassbar gemacht.
* Zusätzlich:
  Die Feldweiterschaltung im Messworkflow (`handleMessfeldKeydown`/`focusNextMessfeld`/`MESSFELD_REIHENFOLGE`) reagiert jetzt zusätzlich zu Enter auch auf Tab (vorwärts) und springt zuverlässig zum nächsten Messfeld in der festen Reihenfolge (lichte Höhe → Wandlängen N/O/S/W), statt z. B. in ein Dropdown zu springen. Shift+Tab (rückwärts) folgt bewusst dem Standard-Browserverhalten, um die Navigation nicht zu verwirren. Es gibt weiterhin keine Bluetooth-/Geräteanbindung – ausschließlich Tastatur-/Fokusverhalten.

## KI-010: Heizlast-Standardwerte – Baualtersklassen-Vorschlagswerte aus dem Bundesanzeiger ergänzt

* Status: behoben (als optionale Vorbelegungshilfe; keine Änderung der Heizlastmethodik)
* Priorität: Erfassungshilfe / Datenqualität
* Bereich: Projektansicht Heizlast-Standardwerte (`index.html`, `js/uwerte-bundesanzeiger.js`, `docs/quellen/`)
* Blockiert Nutzung: nein
* Hintergrund:
  Die in KI-008 vorbereitete, aber damals noch leere Struktur für eine baujahresabhängige U-Wert-Ableitung (`heizlastDefaults.baujahrAbleitungAktiv`) wurde nun mit echten, eindeutig aus der Quelle „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung im Wohngebäudebestand“ vom 8. Oktober 2020 (BAnz AT 04.12.2020 B1) entnommenen Werten hinterlegt – siehe `docs/quellen/README.md` und `js/uwerte-bundesanzeiger.js`.
* Umsetzung:
  Es wurde eine Auswahl „Baualtersklasse Gebäude“ ergänzt (mit Ableitungs-Button aus dem Baujahr), je U-Wert-Bauteilgruppe (Außenwand, Dach, Bodenplatte, Boden/Decke, Fenster, Türen) eine Auswahl der konkreten Quellen-Bauteilkategorie sowie ein optionales Sanierungsjahr. Logik: Ist für ein Bauteil ein Sanierungsjahr hinterlegt, wird die Baualtersklasse für DIESES Bauteil aus dem Sanierungsjahr abgeleitet; ohne Sanierungsjahr gilt die Baualtersklasse des Gebäudes (aus Baujahr abgeleitet oder manuell gewählt). Der Button „U-Werte aus Baualtersklasse übernehmen“ überträgt Vorschlagswerte AUSSCHLIESSLICH in aktuell leere U-Wert-Felder; vorhandene manuelle Werte werden nicht überschrieben (siehe `uebernehmeUWerteAusBaualtersklasse()`). Es werden ausschließlich Werte verwendet, die eindeutig aus Tabelle 2/3 der Quelle entnommen wurden – nichts wurde geschätzt oder ergänzt.
* Wichtige Einordnung:
  Diese Werte sind Pauschal-/Erfahrungswerte für die überschlägige Datenaufnahme, KEIN normativer Heizlastnachweis nach DIN EN 12831 und ersetzen keine Bauteilaufnahme im Einzelfall. Die bestehende Heizlast-Methodik (Φ_T = Σ A·U·fx·ΔT, Prioritätskette Raum-Override → Projekt-Standard → Bestandswert → unbekannt) bleibt unverändert; die Baualtersklassen-Werte fließen lediglich als optionaler Vorschlag in den Projekt-Standard ein.

## KI-011: Heizlast-Standardwerte – U-Wert-Ableitung vereinfacht und mit Sanierungshistorie verknüpft (Korrektur einer kurz zuvor ergänzten, zu großen UI)

* Status: behoben
* Priorität: Erfassungshilfe / Übersichtlichkeit
* Bereich: Projektansicht Heizlast-Standardwerte und Sanierungshistorie (`index.html`)
* Blockiert Nutzung: nein
* Hintergrund:
  Die in KI-010 ergänzte UI (separate Auswahl „Baualtersklasse Gebäude“, je Bauteil eine „Bauteilart“-Auswahl UND ein eigenes „Sanierungsjahr“-Feld) war sehr groß, unübersichtlich und verdoppelte Informationen, die im Projekt bereits über die Sanierungshistorie (`p.sanierungen[]`) erfasst werden konnten (Jahr + Maßnahme/Details).
* Umsetzung:
  Die separaten Bauteilart-/Sanierungsjahr-Felder je Bauteil wurden aus der UI entfernt (Datenfelder bleiben in `heizlastDefaults` zur Vermeidung von Datenverlust erhalten, werden aber nicht mehr angezeigt/ausgewertet). Stattdessen wurde die Sanierungshistorie um ein optionales Auswahlfeld „Detailtyp / Aufbau“ ergänzt (`s.detailtyp`, ein flaches Dropdown mit allen in `js/uwerte-bundesanzeiger.js` hinterlegten U-Wert-Kategorien – bewusst EIN gemeinsames Dropdown statt von der Maßnahme abhängiger Listen, weil das bestehende `massnahme`-Feld keine stabile 1:1-Bauteilstruktur abbildet, z. B. fehlt dort „Türen“). Jeder Detailtyp ist eindeutig genau einem Heizlast-U-Wert-Feld zugeordnet (`DETAILTYP_ZU_HEIZLASTFELD`), sodass z. B. eine Dach-Sanierung nie den Fenster-U-Wert beeinflusst. Die „Baualtersklasse Gebäude“ wird jetzt automatisch und rein informativ aus dem Baujahr angezeigt (`aktualisiereBaualtersklasseAnzeige()`, kein manuelles Auswahlfeld mehr). Eine neue zentrale Funktion `leiteUWerteAusBaujahrUndSanierungAb()` ersetzt die früheren getrennten Funktionen `leiteBaualtersklasseAusBaujahrAb()`/`uebernehmeUWerteAusBaualtersklasse()` und wendet je U-Wert-Feld folgende Prioritätslogik an: 1. Raum-Override, 2. manuell gesetzter Projektwert (wird nie überschrieben), 3. jüngster passender Sanierungseintrag (Detailtyp + Jahr) für GENAU dieses Bauteil, 4. Baujahr Gebäude mit fest hinterlegtem Standard-Detailtyp, 5. keine Ableitung möglich (transparente Meldung). Die Ableitung läuft automatisch bei Änderung des Baujahrs (`pruefeAutoUWerteAusBaujahr()`, sofern die Checkbox „baujahresabhängige U-Wert-Vorschläge nutzen“ aktiv ist) sowie über den Button „U-Werte aus Baujahr/Sanierung ableiten“. Die U-Wert-Zahlenfelder selbst wurden zur Übersichtlichkeit in einen ausklappbaren `<details>`-Bereich „U-Wert-Details anzeigen / manuell bearbeiten“ verschoben; im sichtbaren Bereich verbleiben nur Quelle, Checkbox, automatisch angezeigte Baualtersklasse, Hinweistext und Ableitungs-Button.
* Wichtige Einordnung:
  Es wurden keine neuen Bundesanzeiger-Werte erfunden oder ergänzt – die Datenstruktur `js/uwerte-bundesanzeiger.js` und `docs/quellen/README.md` bleiben unverändert die einzige Quelle. Die Heizlast-Methodik (Φ_T = Σ A·U·fx·ΔT) und die übergeordnete Prioritätskette (Raum-Override → Projekt-Standard → Bestandswert → unbekannt) bleiben unverändert; die hier beschriebene Logik bestimmt lediglich, WIE der „Projekt-Standard“-Wert optional automatisch vorbelegt wird. Manuell erfasste oder abweichende Werte haben weiterhin in jedem Fall Vorrang.

## Noch nicht bewertete Themen

* Fotoanalyse ist im Code vorhanden, wurde aber noch nicht aktiv genutzt oder fachlich getestet.
* PDF-Erfassungsbericht mit Bildern ist Ziel für Version 1, aber noch nicht als bestehende Funktion validiert.
* Disto-X6-Workflow ist Zielbild, aber noch nicht umgesetzt.

## KI-012: U-Wert-Ableitungsbutton – kein sichtbares Feedback nach Heizlastmodul-Toggle-Umbau (v0.2.9-dev)

* Status: behoben (v0.2.10-dev)
* Priorität: Bedienbarkeit
* Bereich: Projektansicht Heizlast-Standardwerte (`index.html`)
* Blockiert Nutzung: nein (Ableitung lief intern korrekt)
* Ursache:
  Nach dem Umbau des Heizlastmoduls in v0.2.9-dev (Details per Toggle ausblendbar) startete `hl-details-panel` mit `display:none`. Die Funktion `leiteUWerteAusBaujahrUndSanierungAb()` lief korrekt und schrieb Werte in den Speicher, aber die Werte blieben unsichtbar weil der Detailbereich geschlossen war. Der Toast-Text war lang und technisch – auf Mobilgeraeten schwer lesbar in 3 Sekunden.
* Behobene Punkte:
  1. Nach erfolgreicher Ableitung oeffnet sich `hl-details-panel` automatisch, Togglebutton wechselt auf "U-Wert-Details ausblenden".
  2. Toast-Meldung ist kurz und klar: z.B. "5 U-Werte aus Baujahr 1974/Sanierung abgeleitet."
  3. Explizite Pruefung auf fehlendes Baujahr: Toast "Bitte zuerst ein Baujahr eintragen."
  4. Klare Meldung wenn alle Felder bereits gefuellt sind.
  5. Fachlogik (Ableitungsregeln, Schutz manueller Werte, Bundesanzeiger-Werte) unveraendert.
