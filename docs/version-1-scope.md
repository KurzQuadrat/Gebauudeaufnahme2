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
- Gebäudetyp: EFH oder MFH (seit v0.2.27-dev vereinfacht; alte Werte ZFH/RH/DHH bleiben
  im Datenmodell erhalten und brechen bestehende Projekte nicht)
- Gebäudeart: freistehend / Reihenendhaus / Reihenmittelhaus (seit v0.2.27-dev, Feld
  `gebaeudeArt`, unabhängig vom Gebäudetyp; alte Projekte erhalten leeren Defaultwert)
- Anzahl Wohneinheiten, nur bei MFH sichtbar
- Baujahr
- offene Punkte

Hinweis: Projektstammdaten in der App sind anonymisiert. Das Feld heißt in der UI seit v0.2.14 "Projektnummer" (intern weiterhin `adresse`). Anzahl Wohneinheiten wird nur angezeigt, wenn Gebäudetyp MFH ausgewählt ist. Ein Hausfoto (Gebäudefoto) kann in der Gebäude-Karte erfasst werden (komprimiert als `gebaeude_foto` gespeichert) und wird in der Projektübersicht als kleines Thumbnail angezeigt.

Hinweis Auftragsart (seit v0.2.27-dev): Das Feld `auftragsart` wird in der Gebäude-Karte nicht mehr angezeigt. Bestehende Daten im Feld bleiben im Datenmodell erhalten und gehen nicht verloren; das Feld wird nur nicht mehr in der UI bedient.

Hinweis Initialzustand Projektkarten (seit v0.2.28-dev): Beim Oeffnen eines Projekts sind die Karten "Gebaude" und "Geschosse" initial aufgeklappt. Alle weiteren Projektkarten sind initial geschlossen. Der Nutzer kann Gebaude und Geschosse manuell schliessen; der Zustand wird nicht dauerhaft gespeichert. Plus-Button-Logik bleibt erhalten: Wenn ein Eintrag erstellt wird, oeffnet sich die jeweilige Karte; wenn der letzte Eintrag geloescht wird, schliesst sie sich.

Hinweis offene Punkte (aktualisiert v0.2.21-dev): “Offene Punkte” sind einfache interne Notizen des Beraters – keine Aufgabenverwaltung. Jeder Punkt enthalt ein Freitextfeld (“Beschreibung / Offener Punkt”), ein optionales Falligkeitsdatum (“Bis wann”, `bisWann`, Typ date, YYYY-MM-DD), eine optionale browser-native Diktierfunktion (Web Speech API, de-DE, kein Kundenzustimmungs-Checkbox noetig da interne Notiz) sowie nach Diktat-Stopp automatische Absatztrennung. Neue Punkte erhalten das heutige Datum als Voreinstellung. Im Textexport erscheinen offene Punkte unter “8. OFFENE PUNKTE / NOTIZEN” mit Text und Datum. Das Datenmodell enthaelt weiterhin die Felder `status`, `prioritaet`, `bereich` und `notiz` (Rueckwaertskompatibilitaet; werden in Version 1 nicht angezeigt). Diese Felder koennen spaeter fuer ein eigenstaendiges “Baubesprechung”-Feature genutzt werden. Bestehende Projekte ohne `offenePunkte` erhalten defensiv eine leere Liste; `bisWann` wird bei Altdaten auf leer gesetzt.

## Reihenfolge Projektbereiche (ab v0.2.4)

1. Gebäude
2. Sanierungshistorie
3. Geschosse
4. Heizung
5. Warmwasser
6. Schornsteine
7. Heizlast-Standardwerte
8. Offene Punkte
9. Raum-/Bauteilliste

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

Hinweis Sanierungs-U-Wert in Heizlast-Prioritätslogik (seit v0.2.41-dev): Die Funktion `leiteUWerteAusBaujahrUndSanierungAb()` nutzt jetzt ein erweitertes Ebenenmodell: 1. Manuell gesetzte Heizlast-Projektwerte (geschützt, nur durch aktives Löschen überschreibbar). 2. Sanierung mit direkt hinterlegtem bekannten U-Wert (`s.uWert`, numerisch, >0, ≤20 W/(m²K)) — Vorrang vor Sanierungsjahr und Baujahr. Bei Fenster nur wenn `s.uWertArt === 'Uw - Gesamtfenster'`; Ug-Glaswert (`'Ug - Glaswert/Verglasung'`) wird nicht als Fenster-Uw verwendet. 3. Sanierung ohne direkten U-Wert, aber mit Detailtyp und Jahr — Ableitung aus Baualtersklasse (Bundesanzeiger). 4. Gebäude-Baujahr als unterste automatische Ebene. 5. Kein Ergebnis möglich — Feld bleibt leer. Alle Ebenen werden durch `_ableitungsquelle = 'Sanierung'` bzw. `'Baujahr'` und `_manuell = false` dokumentiert.

Hinweis Sanierungskarte strukturierter U-Wert (seit v0.2.40-dev): Jeder Sanierungseintrag kann optional einen bekannten U-Wert nach Sanierung enthalten (`s.uWert`, W/(m²K)). Das Feld erscheint nur bei Maßnahmen mit U-Wert-Bezug (Dach, Fenster, Fassade, Bodenplatte, Kellerdecke). Bei Fenster-Maßnahmen wird zusätzlich die Art des U-Werts unterschieden (`s.uWertArt`: 'Uw - Gesamtfenster' oder 'Ug - Glaswert/Verglasung'). Ug ist der Glaswert und darf NICHT automatisch als Uw (Gesamtfenster-U-Wert) verwendet werden — ein entsprechender Hinweis erscheint in der UI. Weitere Fenster-Zusatzfelder (Rahmenmaterial, Anzahl Scheiben) werden in `s.zusatz` gespeichert und dienen vorerst nur der Datenerfassung ohne Auswirkung auf Heizlastlogik. Das geplante Ebenenmodell (1. manuell, 2. Sanierung mit bekanntem U-Wert, 3. Sanierung mit Jahr/Detailtyp, 4. Baujahr, 5. unbekannt) wird in einem separaten Commit in die U-Wert-Ableitungslogik integriert.

Hinweis Sanierungskarte bauteilspezifische Detailtypen (seit v0.2.39-dev): Das Detailtyp-Dropdown in der Sanierungskarte zeigt je nach gewählter Maßnahme nur fachlich passende Optionen aus `js/uwerte-bundesanzeiger.js` (gesteuert über `MASSNAHME_DETAILTYPEN` in `js/config.js`). Maßnahmen ohne U-Wert-Bezug (Heizung, Lüftung, PV, Sonstiges, Heizkörper) zeigen kein Dropdown. Bei Maßnahmenwechsel wird ein nicht mehr passender Detailtyp automatisch zurückgesetzt. Das Feld `s.details` (vormals „Details", jetzt als „Notiz" gekennzeichnet) ist reines Freitextfeld ohne Auswirkung auf U-Wert-Ableitung. Ein im Glas ablesbarer Wert (Ug/Glaswert) darf nicht automatisch als Gesamtfenster-U-Wert (Uw) verwendet werden – strukturierte Fenster-Zusatzfelder sind für einen späteren Schritt vorgesehen. `DETAILTYP_ZU_HEIZLASTFELD.oberste_geschossdecke_massiv` wurde korrigiert: wirkt jetzt auf `dachUwert` (nicht mehr `bodenUwert`), da die Oberste Geschossdecke den oberen Gebäudehüllenabschluss darstellt.

Hinweis Baualtersklassen-Vorschlagswerte (Bundesanzeiger) – seit v0.2.1 vereinfacht: Für die Heizlast-Standardwerte stehen optionale U-Wert-Vorschläge aus der „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung im Wohngebäudebestand" vom 8. Oktober 2020 (BAnz AT 04.12.2020 B1, Tabelle 2 „Opake Bauteile" / Tabelle 3 „Transparente Bauteile") zur Verfügung. Quelle, übernommene Kategorien und der ausdrückliche Hinweis, dass es sich um Pauschal-/Erfahrungswerte und keinen normativen Heizlastnachweis handelt, sind in `docs/quellen/README.md` dokumentiert; die kontrolliert erzeugte Datenstruktur liegt in `js/uwerte-bundesanzeiger.js` (ausschließlich Werte, die eindeutig aus der Quelle entnommen werden konnten – nichts geschätzt oder ergänzt). Um die zuvor doppelte Pflege von Sanierungsjahren (einmal in der Sanierungshistorie, einmal je Bauteil bei den Heizlast-Standardwerten) zu vermeiden, ist die Sanierungshistorie (`p.sanierungen[]`) jetzt die zentrale Quelle für bauteilspezifische Sanierungsjahre: Jeder Sanierungseintrag kann zusätzlich zu Maßnahme/Jahr/Details einen „Detailtyp / Aufbau" wählen (eine der in `js/uwerte-bundesanzeiger.js` hinterlegten Bauteilkategorien, Feld `detailtyp`); dieser ordnet den Eintrag eindeutig genau einem Heizlast-U-Wert-Feld zu (z. B. „Dach – massive Konstruktion" → Dach-U-Wert), sodass z. B. eine Dach-Sanierung nie den Fenster-U-Wert beeinflusst und umgekehrt. Die „Baualtersklasse Gebäude" wird automatisch und rein informativ aus dem Gebäude-Baujahr angezeigt (kein manuelles Auswahlfeld mehr). Über den Button „U-Werte aus Baujahr/Sanierung ableiten" (`leiteUWerteAusBaujahrUndSanierungAb()`) bzw. automatisch bei Änderung des Baujahrs (sofern die Checkbox „baujahresabhängige U-Wert-Vorschläge nutzen" aktiv ist, `pruefeAutoUWerteAusBaujahr()`) gilt je U-Wert-Feld folgende Prioritätslogik: 1. Raum-Override, 2. Projektwert manuell gesetzt (Feld bleibt unverändert, wird in der Rückmeldung als „nicht verändert" ausgewiesen), 3. automatisch abgeleiteter Wert aus der Sanierungshistorie (jüngster Sanierungseintrag mit passendem Detailtyp + Jahr für GENAU dieses Bauteil), 4. automatisch abgeleiteter Wert aus dem Baujahr des Gebäudes (mit fest hinterlegtem Standard-Detailtyp je Bauteil), 5. keine Ableitung möglich → Feld bleibt leer, transparente Meldung. Es wird also NIE in bereits gefüllte Felder geschrieben – manuelle Projektwerte und Raum-Overrides haben weiterhin Vorrang. Die zuvor ergänzten, separaten Bauteilart-/Sanierungsjahr-Eingabefelder je Bauteil wurden aus der UI entfernt (Datenfelder bleiben zur Vermeidung von Datenverlust in `heizlastDefaults` erhalten, werden aber nicht mehr angezeigt/ausgewertet); die U-Wert-Zahlenfelder selbst sind zur Übersichtlichkeit in einen ausklappbaren „U-Wert-Details"-Bereich verschoben. Seit v0.2.9-dev ist die Card kompakter: Der Button „U-Werte aus Baujahr/Sanierung ableiten" ist direkt sichtbar; Quelle, Checkbox, Baualtersklasse und U-Wert-Felder sind über einen separaten Toggle-Button „U-Wert-Details anzeigen/ausblenden" erreichbar.

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

Hinweis Kundenwunsch / Gesprächsnotiz (seit v0.2.18-dev, aktualisiert v0.2.20-dev): Auf der Projektseite gibt es eine optionale Card "Kundenwunsch / Gesprächsnotiz". Der Berater kann Ziele, Wünsche, Bedenken, Budgetrahmen, Komfortanforderungen und Prioritäten des Kunden als Freitext erfassen. Das Textfeld (`p.kundenwunsch_text`) ist für längere Gespräche geeignet (9 Zeilen Anfangshöhe, min. 200 px, vertikal vergrößerbar). Optional steht eine browser-native Diktierfunktion (Web Speech API, `de-DE`) bereit – sie ist nur aktiv, wenn der Browser SpeechRecognition unterstützt (Chrome/Edge auf Desktop; Safari 14.1+ auf iOS). Es wird ausschließlich der erkannte Text gespeichert; Audio wird weder aufgezeichnet noch übertragen. Nach dem Stoppen des Diktats wird automatisch ein doppelter Zeilenumbruch angehängt, sodass ein erneutes Diktat als eigener Absatz beginnt (nur wenn Text vorhanden und noch kein Absatzende vorhanden). Die Diktierfunktion ist erst aktivierbar, wenn der Nutzer die Checkbox "Zustimmung des Kunden liegt vor" gesetzt hat (`p.kundenwunsch_zustimmung`). Ein sichtbarer Hinweis in der Card informiert, dass kein Audio gespeichert wird. Der Kundenwunsch-Text erscheint im Textexport unter der Überschrift "KUNDENWUNSCH / GESPRAECHSNOTIZ" und ist Bestandteil des vollständigen JSON-Exports. Bestehende Projekte ohne dieses Feld werden beim Laden defensiv ergänzt.

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

Hinweis Hottgenroth: Version 1 ist ausdrücklich darauf ausgerichtet, Gebäudedaten so zu
erfassen und aufzubereiten, dass die spätere Weiterverarbeitung in Hottgenroth erleichtert
wird. Eine automatische Befüllung über eine direkte Schnittstelle ist nicht Bestandteil
von Version 1, bleibt aber langfristiges Ziel.

- automatische oder direkte Hottgenroth-Befüllung über eine Schnittstelle
- vollständige Energieberatung
- normativer Heizlastnachweis
- rechtssichere Förderprüfung
- Cloud-Synchronisation
- Mehrbenutzerbetrieb
- öffentlicher SaaS-Betrieb
- Login / Benutzerverwaltung
- Bezahlfunktion / Abo-Verwaltung
- vollständige Fotodokumentationssoftware
- KI-Fotoanalyse als produktive Pflichtfunktion
- automatische Internetrecherche
- iSFP-Variantenlogik
- Hottgenroth-Texte
- normative DIN-EN-12831-Heizlastberechnung (heutiges Modul ist überschlägige Vorab-
  schätzung; normativer Nachweis ist nicht Bestandteil V1, bleibt aber Modul-Ziel)
- vollständiger hydraulischer Abgleich
- VdZ-Formularerstellung
- Planung oder automatischer Vergleich von Sanierungsvarianten
- tabellarischer Software-Export (z. B. EVEbi, Hottgenroth-Mapping)
- automatisierte Rechts- oder Förderprüfung
- LiDAR-gestützte Raumerfassung
- interaktive Grundrissfläche / Canvas-Modul
- automatische Raum-Nachbarschaftslogik aus Raumposition

Diese Punkte sind nicht Bestandteil von Version 1. Viele davon sind ausdrücklich
langfristige Ziele und dürfen durch heutige Entscheidungen nicht dauerhaft verbaut werden:

- Hottgenroth-Unterstützung und spätere Schnittstelle bleiben im langfristigen Scope.
- DIN-konforme Heizlast, hydraulischer Abgleich und VdZ-Formular bleiben im Scope.
- Sanierungsvariantenplanung und Software-Exporte (EVEbi) bleiben im Scope.

Sie können in späteren Versionen folgen, erfordern aber jeweils eigene Konzepte
(technische Schnittstellen, normative Anforderungen, Datenschutz, Hosting).

## Architekturhinweis: Erweiterbarkeit

Version 1 ist intern und lokal. Trotzdem sollen technische Entscheidungen so getroffen
werden, dass spätere externe Nutzung und spätere Funktionserweiterungen nicht massiv
erschwert werden:

- Projekt-IDs und Foto-IDs als UUIDs, ohne Kundendaten im Schlüssel.
- Exportformat mit Versionsfeld, damit spätere Importer rueckwaertskompatibel sein koennen.
  Es gibt zwei klar getrennte Exportformate (seit v0.2.30-dev):

  Textbericht-Export (`exportAll()`, Button "Export" im Header):
  Lesbarer Strukturtext aller Projekte, Dateiendung .txt.
  Dient der menschlichen Lesbarkeit und als Eingabehilfe fuer Hottgenroth.
  Kann nicht mit importJSON() importiert werden und ist nicht dafuer vorgesehen.

  JSON-Daten-Export (`downloadJSON()`, Button "JSON sichern" in der Datei-Karte):
  Maschinenlesbares JSON, Dateiendung .json.
  Wrapper-Format ab v0.2.32-dev:
    { "_schemaVersion": 1, "exportedAt": "ISO-8601", "appVersion": "vX.Y.Z-dev", "projekt": {...} }
  Kann mit importJSON() wieder eingelesen werden.

  JSON-Import (`importJSON()`, Button "JSON laden" in der Datei-Karte):
  Ab v0.2.32-dev wird ausschliesslich das Wrapper-Format akzeptiert.
  Alte Formate (Array von Projekten oder einzelnes Projektobjekt ohne Wrapper) werden
  nicht mehr unterstuetzt. Begruendung: App ist noch nicht produktiv genutzt, es gibt
  keine externen Nutzer und keine produktiv relevanten Altdaten.
  Bei falschem Format erscheint: "Importfehler: Diese Datei entspricht nicht dem aktuellen
  Gebaeudeerfassung-JSON-Format."

  `createdAt` (ISO-8601) wird auf Projekt-Ebene sowie bei neuen Geschossen, Raeumen,
  Sanierungen, Heizanlagen, Warmwasser, Schornsteinen und Offenen Punkten gesetzt.
  Bestehende Projekte erhalten `createdAt: ''` (defensive Initialisierung, kein erfundenes Datum).
  `uuid()` verwendet `crypto.randomUUID()` wenn verfuegbar (UUID v4), sonst den bisherigen
  timestamp-basierten Fallback.
- Datenmodellerweiterungen defensiv laden (kein Hard-Fail bei unbekannten Feldern).
- Fotostruktur perspektivisch von localStorage zu IndexedDB und später zu Cloud-Speicher
  migrierbar halten (siehe docs/roadmap.md Etappe Fotomigration).
- Brand-CSS als eigene Schicht (css/brand.css), die austauschbar bleibt.
- Keine fest einkodierte Kurz-Quadrat-Logik in Fachfunktionen; Kurz Quadrat ist
  Referenznutzer, nicht einziger denkbarer Nutzer.

Speziell für spätere Fachmodule (Heizlast, hydraulischer Abgleich, Sanierungsvarianten):

- Daten müssen strukturiert bleiben, nicht nur Freitext. Bauteilarten, Energieträger,
  Wandzuordnungen und angrenzende Bereiche brauchen typisierte Werte, damit spätere
  Berechnungsmodule und Software-Mappings darauf aufbauen können.
- Alle IDs (Räume, Bauteile, Fenster, Türen, Heizkörper, Heizanlagen, Warmwasser-
  bereiter) müssen stabil bleiben und dürfen bei Exporten oder Datenmodell-Umbauten
  nicht verloren gehen.
- Manuelle Eingaben und spätere Berechnungsergebnisse müssen getrennt gespeichert
  werden. Das heutige überschlägige Heizlastmodul darf später nicht mit einem
  normativen DIN-Nachweis vermischt werden.
- Exportformate sollen versioniert sein. Maschinenlesbarkeit ist Grundvoraussetzung
  für spätere Software-Exporte (Hottgenroth, EVEbi, andere).

Speziell für spätere Grundriss- und LiDAR-Erweiterbarkeit:

- Raum-IDs (`r.id`) sind stabile UUIDs und dürfen bei Exporten, Importen oder
  Datenmodell-Umbauten nicht verloren gehen. Sie sind die spätere Grundlage für
  Raum-Nachbarschafts-Referenzen.
- Wandrichtungen sind heute als Felder je Raum geführt (`wand_n`, `wand_o`, usw.).
  Dieses Modell ist für V1 ausreichend; für spätere Grundrisslogik sollten Wände
  eigene IDs erhalten können. Das ist keine V1-Aufgabe, darf aber durch heutige
  Entscheidungen nicht dauerhaft verbaut werden.
- Wandgrenzen sind heute einfache Enum-Werte oder Freitext. Sie sollen langfristig
  auf strukturierte Referenzen erweiterbar sein: Außenluft, Erdreich, unbeheizter
  Bereich, oder Raum-ID des Nachbarraums. Heutiges Modell verbaut das nicht.
- Räume sollen später optionale Positionsfelder (`r.position`) aufnehmen können,
  ohne bestehende Projekte zu brechen (defensive Initialisierung auf null/undefined).
- Wenn LiDAR-Messwerte hinzukommen, müssen sie als separate, überschreibbare Felder
  gespeichert werden. Manuelle Laser-/Disto-Messwerte haben immer Vorrang.
  Kein stilles Überschreiben manueller Eingaben durch automatische Schätzwerte.

## JSON-Projektformat (ab v0.2.32-dev)

### Gueltig-Exportformat

Ab v0.2.32-dev ist das einzig gueltige JSON-Export- und Importformat:

```json
{
  "_schemaVersion": 1,
  "exportedAt": "2026-06-09T12:00:00.000Z",
  "appVersion": "v0.2.32-dev",
  "projekt": { ... }
}
```

- `_schemaVersion`: Ganzzahl, aktuell immer 1. Ermoeglicht spaetere Importer-Rueckwaertskompatibilitaet.
- `exportedAt`: ISO-8601-Zeitstempel des Exports.
- `appVersion`: App-Version zum Zeitpunkt des Exports (aus `js/config.js`).
- `projekt`: Das Projektobjekt (siehe Mindeststruktur unten).

### Rückwärtskompatibilität

Die App ist noch nicht produktiv genutzt. Es gibt keine externen Nutzer und keine
produktiv relevanten Altdaten. Deshalb ist Rueckwaertskompatibilitaet zu alten
Entwicklungsformaten (Array von Projekten, Einzelobjekt ohne Wrapper) nicht verpflichtend.

Der Import akzeptiert ab v0.2.32-dev ausschliesslich das Wrapper-Format.

### Mindeststruktur Projektobjekt

Pflichtfelder (werden beim Import defensiv gesetzt, falls fehlend):

| Feld               | Typ     | Default | Hinweis                                    |
|--------------------|---------|---------|---------------------------------------------|
| `id`               | string  | uuid()  | UUID v4 per crypto.randomUUID()             |
| `name`             | string  | —       | Anonyme Projektkennung                      |
| `createdAt`        | string  | ''      | ISO-8601 bei Neuerstellung                  |
| `geschosse`        | array   | []      | Liste der Geschoss-Objekte                  |
| `sanierungen`      | array   | []      | Liste der Sanierungseintraege               |
| `heizanlagen`      | array   | []      | Liste der Heizanlagen-Eintraege             |
| `warmwasserEintraege` | array | []     | Liste der Warmwasser-Eintraege              |
| `schornsteine`     | array   | []      | Liste der Schornstein-Eintraege             |
| `offenePunkte`     | array   | []      | Liste der offenen Punkte / Notizen          |

Weitere Felder werden in `load()` (js/state.js) defensiv ergaenzt.

### Technische Schuld (dokumentiert, nicht entfernt)

Die folgenden Altstrukturen existieren noch im Datenmodell und in `neuesProjekt()`,
weil die UI sie noch direkt beschreibt (via `saveHeizanlageField()` etc.):

- `p.heizanlage` (Einzelobjekt) — Ziel: mittelfristig durch `p.heizanlagen[0]` ersetzen
- `p.warmwasser` (Einzelobjekt) — Ziel: mittelfristig durch `p.warmwasserEintraege[0]` ersetzen
- `p.schornstein` (Einzelobjekt) — Ziel: mittelfristig durch `p.schornsteine[0]` ersetzen

Die Migrations-Logik in `load()` (Einzelobjekt zu Array) bleibt erhalten, da sie
eigene Testdaten in localStorage schuetzt. Sie kann entfernt werden, sobald der
Wechsel zur Array-only-UI vollzogen ist.

## Corporate Design (Kurz Quadrat)

Seit v0.2.2-dev ist das Kurz-Quadrat-Corporate-Design als reine CSS-Schicht eingebunden:

- `css/brand.css` enthält alle Design-Tokens (`--kq-*`) und CD-Klassen (Quelle: Brand Style Guide Kurz Quadrat).
- `css/style.css` bindet die Tokens via `var(--kq-*)` ein und enthält app-spezifisches Layout.
- `brand.css` wird vor `style.css` geladen (siehe `index.html` `<head>`).
- Primärfarbe: Bordeaux `#780129`. Akzent: Amaranth `#e7024e`. Signature: Bordeaux + Mint.
- Schrift: Scandia (Fallback auf System-UI-Kette, falls Schriftdateien nicht lokal vorhanden).
- Keine Änderung an Fachlogik, Heizlast, Raumaufnahme, Datenmodell, Export, Fotos oder LocalStorage.
- Referenz-Demo und Dokumentation: `design-system/kurz-quadrat/demo.html` und `docs/design-system.md`.
- Logo-Einbindung ist ein separater, späterer Schritt.

## Spätere Funktionen

- KI-Fotoanalyse mit manueller Bestätigung
- Disto-X6-Integration
- Hottgenroth-Texte
- iSFP-Textbausteine
- Variantenlogik
- projektübergreifende Analysen
- Datenbank
- SaaS-/Abo-Modell

Hinweis Projektkarten-Initialzustand (seit v0.2.25-dev): Beim Oeffnen eines Projekts ist nur die Karte "Geschosse" initial aufgeklappt. EG wird bei neuen Projekten automatisch angelegt und ist sofort bearbeitbar. Jahresfelder (Baujahr, Sanierungsjahr, Heizanlage/Warmwasser-Baujahr) verwenden ausschliesslich Placeholder-Werte als Beispiele -- keine onfocus-Vorbesetzung, keine versteckten Defaultwerte. Der Button "U-Werte aus Baujahr/Sanierung ableiten" bleibt im Heizlastmodul immer sichtbar (ausserhalb des einklappbaren Detailbereichs).

Hinweis Geschossdetails (seit v0.2.12-dev): Jedes Geschoss hat ein Feld "Lichte Höhe Standard (m)" (`g.lichteHoeheStandard`), das als Startwert für neu angelegte Räume dieses Geschosses übernommen wird. Die Raumhöhe bleibt danach unabhängig und manuell überschreibbar; bestehende Raumwerte werden nicht automatisch geändert. Als Dachgeschosse gelten: DG (Bestand), DG 1, DG 2, Spitzboden – diese erhalten im Geschossdetail ein Dachwinkel-Feld und die Dachschrägen-/Gauben-Sektion. Nicht-Dachgeschosse (KG, EG, 1.OG, 2.OG, 3.OG) zeigen dieses Feld nicht. Das Anlegen mehrerer Dachgeschosse (DG 1, DG 2) ist über GESCHOSS_OPTIONEN möglich.
