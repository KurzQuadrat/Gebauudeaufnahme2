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

Hinweis Heizlast-Modul: Das Heizlast-Modul ist eine überschlägige Erfassungshilfe / Vorabschätzung (Φ_T = Σ A·U·fx·ΔT je Bauteil) und kein normativer Heizlastnachweis nach DIN EN 12831. U-Werte und Temperaturannahmen (Norm-Außentemperatur, Temperatur unbeheizter Bereich) werden zentral je Projekt in den „Heizlast-Standardwerten" gepflegt (`p.heizlastDefaults`: U-Werte für Außenwand, Innenwand, Dach, Bodenplatte, Boden/Decke, Fenster, Türen, Norm-Außentemperatur, Standard-Temperatur unbeheizter Bereich, Quelle, Schalter für eine Baujahres-Ableitung) und gelten als Standard für alle Räume. Je Raum können diese Werte überschrieben werden: bestehende U-Wert-Eingaben je Bauteil (`r.u_werte`) haben Vorrang vor dem Projekt-Standard, und zusätzlich kann je Raum eine abweichende Temperatur des angrenzenden unbeheizten Bereichs hinterlegt werden (`r.heizlastOverrides.tempUnbeheizt`). Die Datenstruktur `r.heizlastOverrides` enthält zusätzlich vorbereitete (aktuell nicht über eine eigene UI bedienbare) Felder für künftige raumweise U-Wert-Overrides – das bestehende `r.u_werte` deckt diesen Bedarf praktisch bereits ab, sodass hier bewusst keine zweite, parallele Eingabe-UI ergänzt wurde (Risiko von Verwirrung/Inkonsistenz). Die Prioritätskette für U-Werte und Temperaturen lautet: 1. Raum-Override, 2. projektweiter Heizlast-Standard, 3. bestehender Wert je Raum (`r.u_werte`), 4. unbekannt (mit Hinweis in der Heizlastanzeige) – es werden keine stillschweigend erfundenen Werte verwendet.

Hinweis Baualtersklassen-Vorschlagswerte (Bundesanzeiger) – seit v0.2.1 vereinfacht: Für die Heizlast-Standardwerte stehen optionale U-Wert-Vorschläge aus der „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung im Wohngebäudebestand" vom 8. Oktober 2020 (BAnz AT 04.12.2020 B1, Tabelle 2 „Opake Bauteile" / Tabelle 3 „Transparente Bauteile") zur Verfügung. Quelle, übernommene Kategorien und der ausdrückliche Hinweis, dass es sich um Pauschal-/Erfahrungswerte und keinen normativen Heizlastnachweis handelt, sind in `docs/quellen/README.md` dokumentiert; die kontrolliert erzeugte Datenstruktur liegt in `js/uwerte-bundesanzeiger.js` (ausschließlich Werte, die eindeutig aus der Quelle entnommen werden konnten – nichts geschätzt oder ergänzt). Um die zuvor doppelte Pflege von Sanierungsjahren (einmal in der Sanierungshistorie, einmal je Bauteil bei den Heizlast-Standardwerten) zu vermeiden, ist die Sanierungshistorie (`p.sanierungen[]`) jetzt die zentrale Quelle für bauteilspezifische Sanierungsjahre: Jeder Sanierungseintrag kann zusätzlich zu Maßnahme/Jahr/Details einen „Detailtyp / Aufbau" wählen (eine der in `js/uwerte-bundesanzeiger.js` hinterlegten Bauteilkategorien, Feld `detailtyp`); dieser ordnet den Eintrag eindeutig genau einem Heizlast-U-Wert-Feld zu (z. B. „Dach – massive Konstruktion" → Dach-U-Wert), sodass z. B. eine Dach-Sanierung nie den Fenster-U-Wert beeinflusst und umgekehrt. Die „Baualtersklasse Gebäude" wird automatisch und rein informativ aus dem Gebäude-Baujahr angezeigt (kein manuelles Auswahlfeld mehr). Über den Button „U-Werte aus Baujahr/Sanierung ableiten" (`leiteUWerteAusBaujahrUndSanierungAb()`) bzw. automatisch bei Änderung des Baujahrs (sofern die Checkbox „baujahresabhängige U-Wert-Vorschläge nutzen" aktiv ist, `pruefeAutoUWerteAusBaujahr()`) gilt je U-Wert-Feld folgende Prioritätslogik: 1. Raum-Override, 2. Projektwert manuell gesetzt (Feld bleibt unverändert, wird in der Rückmeldung als „nicht verändert" ausgewiesen), 3. automatisch abgeleiteter Wert aus der Sanierungshistorie (jüngster Sanierungseintrag mit passendem Detailtyp + Jahr für GENAU dieses Bauteil), 4. automatisch abgeleiteter Wert aus dem Baujahr des Gebäudes (mit fest hinterlegtem Standard-Detailtyp je Bauteil), 5. keine Ableitung möglich → Feld bleibt leer, transparente Meldung. Es wird also NIE in bereits gefüllte Felder geschrieben – manuelle Projektwerte und Raum-Overrides haben weiterhin Vorrang. Die zuvor ergänzten, separaten Bauteilart-/Sanierungsjahr-Eingabefelder je Bauteil wurden aus der UI entfernt (Datenfelder bleiben zur Vermeidung von Datenverlust in `heizlastDefaults` erhalten, werden aber nicht mehr angezeigt/ausgewertet); die U-Wert-Zahlenfelder selbst sind zur Übersichtlichkeit in einen ausklappbaren „U-Wert-Details"-Bereich verschoben.

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

Hinweis Versionsanzeige: In der Projektübersicht wird eine sichtbare App-Version samt Build-Datum angezeigt (`APP_VERSION`/`APP_BUILD_DATE` in `js/config.js`), damit beim Testen über den iPhone-Home-Bildschirm erkennbar ist, ob die aktuellste Version geladen wurde.

## Raumaufnahme & Heizlastanzeige (Aktualisierung)

- Disto-Werte (Raummaße, lichte Höhe, Wandlängen, Fenster-, Tür-, Heizkörper-, Nischen-, Vorsprung- und Dachschrägen-/Gaubenmaße) werden einheitlich in Metern erfasst und angezeigt; Eingaben mit Komma oder Punkt (z.B. „1,20" oder „1.20") werden gleichermaßen als Meter interpretiert.
- Die separate Segment-2-Eingabe für Wandlängen wurde aus der Bedienoberfläche entfernt; je Wandrichtung gibt es ein eindeutiges Längenfeld. Vorhandene Alt-Daten in Segment-2-Feldern bleiben erhalten und fließen weiterhin in die Flächenberechnung ein (mit Hinweis in der Wandliste, falls vorhanden).
- Wände erhalten neben der Einstufung Außenwand/Innenwand zusätzlich einen direkt erfassten „angrenzenden Bereich" (Außenluft, Erdreich, unbeheizter Raum, beheizter Raum, unbekannt) je Himmelsrichtung; dieser dient als Vorbelegung für die bestehende AW/IW-Heizlastlogik, ohne diese zu ersetzen.
- Die Vor-Ort-Fotodokumentation eines Raumes umfasst ein allgemeines Raumfoto sowie ein Foto je Tür - jeweils über die bestehende Foto-Komprimierung mit Vorschau, ohne KI-Fotoanalyse. Eine kurz zuvor ergänzte Wandfoto-Möglichkeit je Himmelsrichtung wurde auf ausdrücklichen Wunsch wieder entfernt (siehe known-issues KI-009): Wände benötigen keine eigene Foto-Funktion. Die zugrunde liegenden Datenfelder (`wand_*_foto`) bleiben zur Vermeidung von Datenverlust bestehen, sind in der UI aber nicht mehr bedienbar.
- Die Feldweiterschaltung im Messworkflow reagiert zusätzlich zu Enter auch zuverlässig auf Tab und springt entlang der festen Reihenfolge (lichte Höhe → Wandlängen N/O/S/W) zum nächsten Messfeld, statt z. B. in ein Dropdown zu wechseln (siehe known-issues KI-009). Es gibt weiterhin keine Bluetooth-/Geräteanbindung – ausschließlich Tastatur-/Fokusverhalten.
- Die Heizlastanzeige zeigt die berechnete Heizlast (Φ_T) prominent in Watt an; Berechnungsdetails (Wandflächen/Volumen, U-Werte, ΔT, Bauteilbeiträge) sind ausklappbar, während Warnhinweise (z.B. fehlende U-Werte oder unklare Wandart) weiterhin standardmäßig sichtbar bleiben.

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
