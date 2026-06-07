# Version 1 Scope

## Ziel Version 1

Version 1 ist eine stabile, anonymisierte Vor-Ort-Erfassungs-App für Gebäudeaufnahmen. Nach dem Termin sollen alle relevanten Daten strukturiert vorliegen, sodass die weitere Bearbeitung am PC deutlich einfacher wird.

## Hauptoutputs Version 1

1. PDF-Erfassungsbericht inklusive Bilder
2. Raum-/Bauteilliste
3. JSON-Projektdatei zur Sicherung und Wiederaufnahme

## Pflichtdaten Projekt

- Projekt-ID oder anonymer Projektname
- PLZ
- Gebäudetyp: EFH, ZFH, MFH
- Anzahl Wohneinheiten, falls relevant
- Baujahr
- Auftragsart
- offene Punkte

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
