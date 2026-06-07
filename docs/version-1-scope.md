# Version 1 Scope

## Ziel Version 1

Version 1 ist eine stabile, anonymisierte Vor-Ort-Erfassungs-App für Gebäudeaufnahmen. Nach dem Termin sollen alle relevanten Daten strukturiert vorliegen, sodass die weitere Bearbeitung am PC deutlich einfacher wird.

## Hauptoutputs Version 1

1. PDF-Erfassungsbericht inklusive Bilder
2. Raum-/Bauteilliste
3. JSON-Projektdatei zur Sicherung und Wiederaufnahme

Hinweis Raum-/Bauteilliste: Als Zwischenschritt vor dem PDF-Bericht ist die Raum-/Bauteilliste zunächst als strukturierte App-Ansicht umgesetzt (eigene Ansicht „Raum-/Bauteilliste“, erreichbar aus der Projektansicht). Sie fasst je Geschoss und Raum die vorhandenen Daten read-only zusammen (Nutzungsart, Temperaturen, lichte Höhe, Wandlängen, Anzahl Fenster/Türen/Heizkörper/Nischen/Vorsprünge, Dachschräge/Gaube vorhanden ja/nein, Notiz, kurze Bauteilübersicht) und bietet zusätzlich „Als Text kopieren“. Sie ist reine Anzeige ohne Eingabe und ohne PDF-Erzeugung; der PDF-Erfassungsbericht folgt als eigener, späterer Schritt.

## Pflichtdaten Projekt

- Projekt-ID oder anonymer Projektname
- PLZ
- Gebäudetyp: EFH, ZFH, MFH
- Anzahl Wohneinheiten, falls relevant
- Baujahr
- Auftragsart
- offene Punkte

Hinweis: Projektstammdaten in der App sind anonymisiert. Statt einer echten Adresse wird eine anonyme Projektkennung / ein Lagehinweis erfasst (intern weiterhin im Feld `adresse` gespeichert, in der UI klar als anonymes Feld beschriftet). Auftragsart und Anzahl Wohneinheiten sind seit diesem Schritt als Stammdatenfelder umgesetzt.

Hinweis offene Punkte: „Offene Punkte“ sind als strukturierte Liste je Projekt umgesetzt (`p.offenePunkte[]`, Karten-/Listenmuster wie bei der Sanierungshistorie). Jeder Punkt enthält `text`, `status` (offen/in Prüfung/erledigt/zurückgestellt, Standard „offen“), `prioritaet` (niedrig/mittel/hoch, Standard „mittel“), `bereich` (Allgemein/Projekt/Geschoss/Raum/Wand/Fenster/Tür/Dach/Heizung/Warmwasser/Foto/Export/Sonstiges, Standard „Allgemein“) und `notiz`. Die Erfassung ist rein manuell, ohne automatische Prüfung oder Generierung und ohne Anbindung an PDF/Bericht. Bestehende Projekte ohne `offenePunkte` erhalten defensiv eine leere Liste; JSON-Export/-Import bleibt unverändert, da die gesamte Projektstruktur inklusive `offenePunkte` übernommen wird.

## Pflichtstruktur

- Geschosse
- Räume
- Raummaße
- Bauteile je Raum
- Fotos mit Zuordnung

## Pflichtdaten je Raum

- Raumname
- Geschosszuordnung
- Länge
- Breite
- Höhe
- optional abweichende Geometrie
- Notizen
- Fotos

## Pflichtdaten Wände

Je Wand sollen erfasst werden können:

- Außenwand oder Innenwand
- angrenzender Bereich oben: beheizt, unbeheizt, außen, Erdreich, unbekannt
- angrenzender Bereich unten: beheizt, unbeheizt, Erdreich, unbekannt
- Wandstärke
- vermuteter Wandaufbau
- Foto
- Notiz

Hinweis: In der Wandlängen-Erfassung je Raum kann zu jeder Himmelsrichtung (N/O/S/W) zusätzlich eine AW/IW-Klassifizierung ("Außenwand"/"Innenwand"/unbekannt) hinterlegt werden. Bestehende Räume erhalten dabei defensiv den Wert "unbekannt", bis die Klassifizierung nachgetragen wird.

Hinweis Raumdetails: Norm-Solltemperatur und Kundenwunsch-Temperatur können je Raum erfasst werden (reine Erfassungsfelder, ohne eigene Berechnungslogik in Version 1).

Hinweis Heizlast-Modul: Das Heizlast-Modul ist eine überschlägige Erfassungshilfe / Vorabschätzung (Φ_T = Σ A·U·fx·ΔT je Bauteil) und kein normativer Heizlastnachweis nach DIN EN 12831. U-Werte und Temperaturannahmen (Norm-Außentemperatur, Temperatur unbeheizter Bereich) werden zentral je Projekt in den „Heizlast-Standardwerten" gepflegt (`p.heizlastDefaults`: U-Werte für Außenwand, Innenwand, Dach, Bodenplatte, Boden/Decke, Fenster, Türen, Norm-Außentemperatur, Standard-Temperatur unbeheizter Bereich, Quelle, Schalter für eine künftige Baujahres-Ableitung) und gelten als Standard für alle Räume. Je Raum können diese Werte überschrieben werden: bestehende U-Wert-Eingaben je Bauteil (`r.u_werte`) haben Vorrang vor dem Projekt-Standard, und zusätzlich kann je Raum eine abweichende Temperatur des angrenzenden unbeheizten Bereichs hinterlegt werden (`r.heizlastOverrides.tempUnbeheizt`). Die Datenstruktur `r.heizlastOverrides` enthält zusätzlich vorbereitete (aktuell nicht über eine eigene UI bedienbare) Felder für künftige raumweise U-Wert-Overrides – das bestehende `r.u_werte` deckt diesen Bedarf praktisch bereits ab, sodass hier bewusst keine zweite, parallele Eingabe-UI ergänzt wurde (Risiko von Verwirrung/Inkonsistenz). Die Prioritätskette für U-Werte und Temperaturen lautet: 1. Raum-Override, 2. projektweiter Heizlast-Standard, 3. bestehender Wert je Raum (`r.u_werte`), 4. unbekannt (mit Hinweis in der Heizlastanzeige) – es werden keine stillschweigend erfundenen Werte verwendet. Baujahresabhängige U-Wert-Annahmen aus der „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung im Wohngebäudebestand" vom 8. Oktober 2020 sind als Struktur vorbereitet (`heizlastDefaults.baujahrAbleitungAktiv`), die konkreten Tabellenwerte sind jedoch noch nicht hinterlegt, da sie nicht erfunden oder geschätzt werden dürfen; sie folgen in einem späteren Schritt, sobald die Werte aus der Quelle vorliegen.

Hinweis Messworkflow Raummaße: Die Erfassung der Raummaße (lichte Höhe, Wandlängen N/O/S/W je Segment) unterstützt eine zuverlässige Feldweiterschaltung per Enter (z. B. bei Übertragung durch ein Disto-/Lasermessgerät) entlang einer festen Reihenfolge. Die Brutto-Wandflächen werden aus Wandlänge (Summe der Segmente) × lichte Höhe berechnet.

Hinweis Einheiten Raummaße: Lichte Höhe und Wandlängen N/O/S/W (inkl. Segmente) werden einheitlich in Meter erfasst und in der UI entsprechend mit „m" beschriftet (Disto-/Laserwerte wie „2.50" oder „2,50" werden als 2,50 m verstanden, ohne Umrechnung in Zentimeter). Wandflächen werden aus Wandlänge in m × lichte Höhe in m berechnet. Bauteilmaße wie Fenster, Türen, Nischen, Vorsprünge, Dachschräge/Gaube bleiben weiterhin gesondert in Zentimeter geführt und entsprechend „cm" beschriftet — hier erfolgt keine Einheitenumstellung.

Hinweis Nischen: Je Niesche kann zusätzlich eine Wandzuordnung (N/O/S/W bzw. unbekannt) hinterlegt werden. Bestehende Nischen erhalten dabei defensiv den Wert "unbekannt" (leere Zuordnung), bis sie nachgetragen wird.

Hinweis Vorsprünge: Vorsprünge wurden auf das Listen-/Karten-Muster wie bei Fenster, Türen oder Heizkörpern umgestellt – es können nun mehrere Vorsprünge je Raum erfasst werden (jeweils mit Wandzuordnung N/O/S/W, Breite, Tiefe und Notiz). Bestehende, gerichtete Einzelwerte (`vsp_n_b`/`vsp_n_t` usw.) wurden defensiv in die neue Liste überführt (ein Listeneintrag je vorhandener Richtung); die alten Felder bleiben zusätzlich erhalten, sodass keine Daten verloren gehen. Die Flächenberechnung in `berechneRaumGeometrie` (Σ Breite × Tiefe) wurde unverändert auf die neue Liste übertragen.

Hinweis Dachschräge/Gaube (Raum): Dachschräge und Gaube sind fachlich getrennt dargestellt; eine Gaube kann nur über das Kontrollkästchen "Gaube vorhanden" an einer bestehenden Dachschräge erfasst werden – eine freistehende Gaube ohne Dachschräge ist im Raum nicht vorgesehen. Bestehende Gaube-Altdaten (`gaube_breite`/`gaube_lichtehoehe`) wurden defensiv übernommen und als vorhanden markiert, sodass keine Daten verloren gehen. Mehrere Dachschrägen je Raum wurden bewusst nicht als Liste umgesetzt: Die Heizlastberechnung (`berechneRaumGeometrie`) berechnet eine einzelne geneigte Fläche anhand von Kniestock, Neigungswinkel und Richtung (trigonometrische Formeln). Eine Liste mehrerer Dachschrägen würde eine fachliche Entscheidung erfordern, wie mehrere geneigte Flächen in der Berechnung kombiniert werden – das wäre eine inhaltliche Änderung der Heizlastberechnung und wurde daher nicht vorgenommen. Stattdessen wurde nur das Layout der Einzel-Dachschräge (Karte mit Abschnittskopf, ohne Auf-/Zuklapp-Button) an die übrigen Bauteilbereiche angeglichen. Die Geschoss-Gauben (`g.gauben[]`) bleiben davon unabhängig eine eigene Liste.

## Pflichtbauteile je Raum

- Fenster
- Türen
- Nischen
- Vorsprünge
- Dachschrägen
- Gauben, falls vorhanden
- Dachfenster, falls vorhanden

## Bedingt Pflicht

Heizkörper sind nur Pflicht, wenn der Auftrag einen hydraulischen Abgleich umfasst.

## Pflichtdaten Heizung

- Wärmeerzeuger
- Hersteller
- Typ
- Baujahr
- Energieträger
- Leistung, falls bekannt
- Foto Typenschild
- Notiz

## Pflichtdaten Warmwasser

- zentrale oder dezentrale Warmwasserbereitung
- Speicher vorhanden ja/nein
- Speichergröße, falls bekannt
- Energieträger
- Foto
- Notiz

Hinweis: Die Datenstruktur `warmwasser` (Art, Speicher vorhanden, Speichervolumen, Energieträger, Versorgung, Baujahr, Hersteller, Typ, Notiz) ist umgesetzt. Eine Foto-Erfassung für Warmwasser ist noch nicht enthalten und folgt ggf. in einem späteren Schritt.

Hinweis Foto-Komprimierung: Neue Fotos werden vor dem Speichern skaliert und komprimiert, um localStorage, JSON-Export und spätere PDF-Berichte stabiler zu halten.

## Nicht Bestandteil Version 1

- direkte Hottgenroth-Befüllung
- vollständige Energieberatung
- normativer Heizlastnachweis
- rechtssichere Förderprüfung
- Cloud-Synchronisation
- Mehrbenutzerbetrieb
- vollständige Fotodokumentationssoftware
- KI-Fotoanalyse als produktive Pflichtfunktion
- automatische Internetrecherche
- iSFP-Variantenlogik
- Hottgenroth-Texte
- vollständige Heizlastberechnung

## Spätere Funktionen

- KI-Fotoanalyse mit manueller Bestätigung
- Disto-X6-Integration
- Hottgenroth-Texte
- iSFP-Textbausteine
- Variantenlogik
- projektübergreifende Analysen
- Datenbank
- SaaS-/Abo-Modell
