# Produktziel Gebäudeerfassung

## 1. Kurzbeschreibung

Die Anwendung „Gebäudeerfassung" ist ein iPhone-Tool für die strukturierte, anonymisierte Vor-Ort-Aufnahme von Gebäudedaten durch einen Energieberater. Ziel ist, nach dem Termin sicher zu sein, dass alle relevanten Daten vollständig aufgenommen wurden und diese am PC strukturiert für die weitere Bearbeitung zur Verfügung stehen.

Die App soll insbesondere das Zeichnen, Erfassen und Nacharbeiten des Gebäudes am PC vereinfachen.

## 2. Hauptnutzen

* Vor Ort keine relevanten Gebäudedaten vergessen
* Gebäudedaten strukturiert statt in losen Notizen/Fotos erfassen
* Fotos eindeutig dem Entstehungsort zuordnen
* Raum-, Bauteil-, Heizungs- und Warmwasserdaten vollständig erfassen
* Nacharbeit am PC reduzieren
* Grundlage für spätere auftragsbezogene Auswertungen schaffen

## 3. Grundprinzipien

* Projekte werden anonymisiert geführt.
* Es werden keine Kundennamen, vollständigen Adressen, Telefonnummern oder E-Mail-Adressen gespeichert.
* Erfasst werden nur technische und projektrelevante Gebäudedaten.
* Die App ist ein Erfassungs- und Vorbereitungswerkzeug, keine vollständige Energieberatungssoftware.
* Manuelle Eingabe muss jederzeit möglich bleiben.
* Fotos werden aufgenommen und dem jeweiligen Entstehungsort zugeordnet.
* Analysefunktionen und KI-Auswertungen sind spätere Erweiterungen.

## 4. Vor-Ort-Workflow

Der bevorzugte Ablauf ist:

Projekt → Gebäude → Geschoss → Raum → Bauteile/Fotos/Maße → nächste Einheit

Die App muss aber schnelle Sprünge zwischen Projekt, Geschoss, Raum, Bauteilen, Heizung, Warmwasser, Dach, offenen Punkten und Export ermöglichen.

Der Nutzer soll vor Ort flexibel im Gebäude springen können, ohne die Struktur zu verlieren.

## 5. Muss-Funktionen Version 1

Version 1 muss folgende Funktionen unterstützen:

* anonymes Projekt anlegen
* PLZ erfassen
* Gebäudetyp erfassen: EFH, ZFH, MFH
* Anzahl Wohneinheiten erfassen, wenn relevant
* Baujahr erfassen
* Sanierungsjahre erfassen
* Geschosse anlegen
* Räume anlegen
* schnell zwischen Geschossen und Räumen wechseln
* Raummaße erfassen
* nächstes benötigtes Maß gut sichtbar anzeigen
* automatische Feldweiterschaltung nach Maßeingabe, soweit sinnvoll
* manuelle Eingabe jederzeit ermöglichen
* Wände erfassen
* je Wand erfassen:

  * Außenwand oder Innenwand
  * angrenzender Bereich oben beheizt oder unbeheizt
  * angrenzender Bereich unten beheizt oder unbeheizt
  * Wandstärke
  * möglicher Wandaufbau
* Fenster erfassen
* Türen erfassen
* Nischen erfassen
* Vorsprünge erfassen
* Dachschrägen erfassen
* Gauben erfassen, falls vorhanden
* Dachfenster erfassen, falls vorhanden
* Fotos aufnehmen und dem jeweiligen Ort zuordnen
* Heizungsanlage erfassen
* Warmwasserbereitung erfassen
* offene Punkte dokumentieren
* JSON-Export und JSON-Import als Projektsicherung
* Raum-/Bauteilliste erzeugen
* PDF-Erfassungsbericht inklusive Bilder erzeugen

## 6. Bedingte Funktionen Version 1

Folgende Funktionen sind nur dann Pflicht, wenn der jeweilige Auftrag sie benötigt:

* Heizkörper erfassen bei Auftrag „hydraulischer Abgleich"
* zusätzliche Heizflächeninformationen bei hydraulischem Abgleich
* spezifische Auftragsnotizen je nach Projektart

## 7. Jahr-Auswahl

* Baujahr-Auswahl soll sinnvoll starten, aktuelle Arbeitshypothese: 1977
* Sanierungsjahr-Auswahl soll sinnvoll starten, aktuelle Arbeitshypothese: 2000
* schnelles Hoch-/Runterscrollen muss möglich sein
* manuelle Eingabe soll möglich bleiben

## 8. Disto-/Messworkflow

Version 1 soll die Messung vor Ort unterstützen, aber nicht zwingend eine direkte Geräteintegration voraussetzen.

MVP:

* App zeigt das nächste benötigte Maß groß und klar sichtbar an
* nach Eingabe springt die App automatisch ins nächste sinnvolle Feld
* manuelle Korrektur bleibt jederzeit möglich

Später:

* direkte Integration eines Disto X6 oder vergleichbarer Messgeräte
* automatische Messwertübernahme
* Plausibilitätsprüfung von Messketten

## 9. Hauptoutputs Version 1

Version 1 soll vor allem diese Outputs liefern:

1. PDF-Erfassungsbericht inklusive Bilder
2. Raum-/Bauteilliste
3. JSON-Projektdatei als Sicherung und Wiederaufnahme des Projekts

Der PDF-Bericht dient der nachvollziehbaren Dokumentation der Vor-Ort-Aufnahme. Die Raum-/Bauteilliste dient der strukturierten Weiterverarbeitung am PC.

## 10. Spätere Ausbaustufen

Folgende Funktionen sind wichtig, aber nicht Bestandteil von Version 1:

* KI-Fotoanalyse
* automatische Analysefunktionen
* automatische Internetrecherche zu Heizgeräten
* Hottgenroth-Texte
* Hottgenroth-spezifische Eingabehilfen
* iSFP-Varianten
* iSFP-Maßnahmenreihenfolge
* vorbereitete iSFP-Textbausteine
* Heizlastberechnung
* hydraulischer Abgleich als vollständige Berechnung
* Plausibilitätsprüfung von Messketten
* direkte Integration eines Disto X6
* direkte Hottgenroth-Befüllung

## 11. Nicht-Ziele Version 1

Version 1 soll nicht:

* Hottgenroth direkt automatisch befüllen
* eine vollständige Energieberatung ersetzen
* normativ belastbare Heizlastnachweise erzeugen
* Förderfähigkeit rechtssicher prüfen
* Kundendaten cloudbasiert synchronisieren
* mehrere Nutzer verwalten
* eine vollständige Fotodokumentationssoftware sein
* KI-Fotoanalyse produktiv voraussetzen
* iSFP-Maßnahmen final automatisch festlegen

## 12. Entscheidungsregel für neue Funktionen

Eine neue Funktion wird nur aufgenommen, wenn sie mindestens eines dieser Ziele erfüllt:

* sie verhindert, dass vor Ort wichtige Daten vergessen werden
* sie reduziert Nacharbeit am PC
* sie verbessert die Struktur der späteren Eingabe
* sie erhöht die Datenqualität
* sie reduziert Fehler bei Erfassung, Übertragung oder Auswertung
* sie verbessert die Nachvollziehbarkeit der Vor-Ort-Aufnahme

Funktionen, die nur Komfort bieten oder technisch interessant sind, aber keinen dieser Punkte erfüllen, werden zurückgestellt.
