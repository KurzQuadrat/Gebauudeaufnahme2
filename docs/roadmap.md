# Roadmap Gebäudeerfassung

Stand: 2026-06-09

---

## Überblick

Die Gebäudeerfassungs-App wird in mehreren Stufen entwickelt. Version 1 ist ein internes
Werkzeug für Kurz Quadrat. Perspektivisch soll die App als kostenpflichtiges Produkt auch
anderen Energieberatern zur Verfügung stehen.

```
V1 intern  →  V1.5 Pilot  →  V2 Produktfähigkeit  →  V3 SaaS / kommerziell  →  V3+ LiDAR / Grundriss
```

---

## V1 — Interne Nutzung Kurz Quadrat

**Status:** In Entwicklung

**Ziel:** Stabile, vollständige Gebäudeerfassungs-App für den internen Einsatz vor Ort.

**Enthält:**

- Vollständige Gebäudeaufnahme (Räume, Bauteile, Heizung, Warmwasser, Fotos)
- Anonymisierte Projektführung (keine Kundennamen, keine Adressen)
- JSON-Export und JSON-Import als Projektsicherung
- Raum-/Bauteilliste
- PDF-Erfassungsbericht mit Bildern
- Heizlast-Standardwerte (überschlägig, kein DIN-EN-12831-Nachweis)
- Lokale Speicherung im Browser (localStorage)
- Mobile Nutzung auf iPhone
- Keine Cloud, kein Login, kein Server
- Datenerfassung und Ausgabe so strukturiert, dass die spätere Weiterverarbeitung in
  Hottgenroth mit möglichst geringem Aufwand möglich ist (Hottgenroth-vorbereitende
  Erfassung als ausdrückliches V1-Ziel)

**Nicht in V1:**

- Bezahlfunktion
- Login / Benutzerverwaltung
- Cloud-Synchronisation
- Mehrbenutzerbetrieb
- öffentlicher SaaS-Betrieb
- automatische oder direkte Hottgenroth-Befüllung über eine Schnittstelle
  (Hottgenroth-Unterstützung als langfristiges Ziel bleibt im Scope)
- automatisierte Rechts- oder Förderprüfung
- KI-Fotoanalyse als produktive Pflichtfunktion
- LiDAR-gestützte Raumerfassung
- interaktive Grundrissfläche
- automatische Raum-Nachbarschaftslogik

**Primärnutzer:** Kurz Quadrat (Referenzpilotkunde)

---

## V1.5 — Pilotphase mit ausgewählten externen Energieberatern

**Status:** Geplant, nach stabiler V1

**Ziel:** Rückmeldungen aus realen Einsätzen durch externe Energieberater sammeln. Die App
bleibt in dieser Phase ausdrücklich eine Testversion.

**Enthält:**

- Ausgewählte externe Energieberater als Pilot-/Betatester (keine öffentliche Freigabe)
- Klar kommunizierter Beta-Status; keine Gewähr für fachliche Vollständigkeit
- Feedbackprozess zu Bedienbarkeit, Datenfeldern, Exporten, Vor-Ort-Nutzung
- Stabilere Exportpakete (versioniertes Format, Fotoexport als ZIP mit manifest.json)
- Verbesserte Foto-/Speicherarchitektur (Fotomigration localStorage → IndexedDB)
- Dokumentierte Grenzen und bekannte Einschränkungen

**Voraussetzungen vor externer Pilotnutzung:**

- Kein produktives Kundendaten-Cloud-System ohne Datenschutz- und Rechtsprüfung
- Kein AV-Vertrag = keine echten Kundendaten in Cloud-Umgebungen
- Klare schriftliche Kommunikation: Testversion, kein Support-SLA, keine Haftung
- Feedback-Kanal definieren (z. B. E-Mail oder einfaches Formular)

**Technische Schritte (geplant):**

- IndexedDB-Layer für Fotospeicherung (js/photodb.js)
- ZIP-Export mit Fotos und manifest.json
- Fotomigration alter Base64-Daten aus localStorage
- Exportformat-Versionsfeld und Importvalidierung

---

## V2 — Produktfähigkeit

**Status:** Konzept

**Ziel:** App ist stabil genug für einen breiteren Einsatz. Datenmodell und Exportformat
sind eingefroren und dokumentiert.

**Enthält:**

- Stabiles, versioniertes Datenmodell (keine Breaking Changes ohne Migrationspfad)
- Vollständige Projektpakete für PC-Transfer (JSON + Fotos + Bericht)
- Verbesserte Speicherarchitektur (IndexedDB produktiv)
- Erste Konzepte für Nutzerverwaltung (noch nicht implementiert, aber dokumentiert)
- Vorbereitung Lizenz- oder Abo-Modell (Konzept, kein Code)
- Dokumentierte Fachgrenzen (was berechnet die App, was nicht)
- Optional: Disto-X6-Integration oder vergleichbare Messgeräteanbindung
- Konzept interaktive Raumpositionierung (Vorstufe Grundriss): Raum-Koordinaten und
  Nachbarschaftsreferenzen im Datenmodell vorbereiten, noch ohne UI
- Verbesserte Hottgenroth-Exportstruktur: Prüfung und Dokumentation eines Mappings der
  App-Datenfelder auf Hottgenroth-Felder; strukturierter Export als Grundlage für
  spätere teilautomatische Übernahme
- Prüfung eines tabellarischen Exports für andere Software (z. B. EVEbi-kompatible
  Struktur); Exportformate versioniert und maschinenlesbar

**Nicht in V2:**

- Produktiver Cloud-Betrieb
- Login und Authentifizierung
- Bezahlfunktion
- Mehrmandantenbetrieb (noch Konzept, kein produktiver Betrieb)
- LiDAR-gestützte Raumerfassung
- interaktive Grundriss-Canvas-Ansicht (Konzept ja, UI-Umsetzung nein)

---

## V3 — SaaS / kommerzieller Betrieb

**Status:** Langfristige Perspektive

**Ziel:** Die App ist als kostenpflichtiges Produkt für externe Energieberater verfügbar.

**Enthält:**

- Login und Authentifizierung
- Mandantenfähigkeit (jeder Nutzer sieht nur eigene Projekte)
- Cloud-Synchronisation (Offline-first plus Sync)
- Sichere Fotodatenhaltung (Cloud-Speicher, Zugriffskontrolle)
- Rollen- und Rechtemodell
- Projekt-Dashboard und Teamfähigkeit
- Abo-Modell oder Lizenzmodell
- Abrechnung und Abo-Verwaltung
- Support- und Onboarding-Prozess
- DSGVO-Konzept, Datenschutzerklärung, AV-Vertrag
- Backup- und Exportstrategie
- Hosting- und Betriebskonzept
- Nutzungsbedingungen und rechtliche Rahmenbedingungen
- Updateprozess und Versionsverwaltung
- Prüfung und ggf. Umsetzung einer teilautomatisierten oder direkten
  Hottgenroth-Befüllung (setzt verfügbare Schnittstelle und technische Klärung
  mit Hottgenroth voraus; nicht vollständige Automation ohne Prüfung)

**Voraussetzungen:**

- Alle Punkte aus V2 stabil und abgeschlossen
- Rechtliche Prüfung (DSGVO, Haftung, Nutzungsbedingungen)
- Datenschutzkonzept und AV-Vertrag abgeschlossen
- Hosting-Entscheidung getroffen
- Betriebsprozesse (Monitoring, Backup, Incident-Response) definiert

---

## Langfristige Fachmodule (V2 bis V3+)

**Status:** Konzept / Perspektive

Diese Fachmodule sind nicht Bestandteil von Version 1. Version 1 soll aber Gebäudedaten
so strukturiert erfassen, dass diese Module später ohne grundlegende Datenmodell-Umbauten
realisierbar sind.

### Heizlast (DIN-konform)

- Langfristiges Ziel: DIN-EN-12831-konforme Heizlastberechnung als eigenständiges Modul
- Klare Trennung zwischen der heutigen uberschlagigen Vorabschatzung (Phi_T = A x U x fx x DeltaT,
  kein DIN-Nachweis) und einem spateren normativen Nachweis
- Datenmodell-Voraussetzungen (in V1 bereits vorhanden oder vorzubereiten):
  Raumflachen, Bauteilmasse, U-Werte, angrenzende Bereiche je Wandseite,
  Norm-Aussentemperatur, Raumsolltemperaturen
- Ergebnis eines spateren Moduls muss sauber als normativ gekennzeichnet und methodisch
  getrennt von den heutigen uberschlagigen Werten gespeichert werden

### Hydraulischer Abgleich

- Langfristiges Ziel: vollstandiger hydraulischer Abgleich als eigenes Modul
- Perspektivisch: Ausgabe des VdZ-Formulars (Vereinigung der deutschen Zentralheizungswirtschaft)
- Voraussetzungen: Heizkorperdaten (Typ, Grosse, Anschlussart, Ventil), Raumheizlasten,
  Anlagenparameter (Vorlauf-/Rucklauftemperatur, Pumpenleistung)
- Heutige Heizkorpererfassung in V1 ist Grundlage; spatere Erweiterung um
  Auslegungsparameter und Berechnungslogik muss moglich bleiben

### Sanierungsvarianten

- Langfristiges Ziel: Planung und Vergleich von Sanierungsvarianten
- Massnahmenpakete, Reihenfolgen, Investitionskosten, Einsparungen und Foderoptionen
  sollen spater verknupfbar werden
- Der heutige Kundenwunsch / Gesprachsnotiz-Bereich kann als Grundlage fur spatere
  Variantenpriorisierung dienen
- Sanierungshistorie (p.sanierungen[]) ist bereits strukturiert; spatere Variantenlogik
  konnte darauf aufbauen

### Software-Exporte

- Tabellarische Exporte fur andere Softwareprodukte vorbereiten
- Konkret zu prufen: EVEbi-kompatible Tabellenstruktur (Energieberatungssoftware)
- Konkret zu prufen: Hottgenroth-Feld-Mapping (siehe eigener Abschnitt Architektur-
  Leitplanken)
- Exportformate sollen versioniert, stabil und maschinenlesbar sein
- Kein Software-Export wird jetzt gebaut; Voraussetzung ist ein stabiles, dokumentiertes
  Quell-Datenmodell

---

## V3+ — LiDAR-Raumerfassung und interaktiver Grundriss

**Status:** Langfristige Perspektive / Forschungsphase

**Ziel:** Schnellere Vor-Ort-Erfassung durch gerategestutzte Geometrieerfassung und
interaktive Grundrisserstellung mit automatischer Raum-Nachbarschaftslogik.

### LiDAR-gestutzte Raumerfassung

- Nutzung des iPhone-LiDAR-Scanners (iPhone 12 Pro+) fur grobe Raumgeometrie
- Keine millimetergenaue Vermessung erwartet; Lasermessung bleibt erganzend moglich
- Laser-/Disto-Messwerte haben Vorrang vor LiDAR-Schatzwerten (manuelle Override-Logik)
- Technische Voraussetzung: WebXR Depth Sensing API oder native iOS-App/Bridge;
  aktuell nicht uber reinen Mobile-Browser erreichbar (Stand 2026)

### Interaktive Grundrissflache

- Raume sollen auf einer 2D-Flache platzierbar und relativ zueinander ausrichtbar sein
- Beispiel: Kuche rechts neben Flur, Wohnzimmer sudlich der Kuche
- Raume sollen verschiebbar und drehbar sein
- Daraus soll ein einfacher Grundriss-Export entstehen (SVG, PNG oder PDF)
- Technische Umsetzung: Canvas- oder SVG-basiertes Modul (noch nicht begonnen)

### Automatische Raum-Nachbarschaften

- Raume sollen wissen, woran ihre Wande grenzen (nicht nur Freitext, sondern strukturierte
  Referenzen)
- Mogliche Werte je Wandseite: Aussenluft, Erdreich, unbeheizter Bereich,
  Nachbarraum (Referenz auf Raum-ID), unbekannt
- Diese Information ergibt sich teils aus der Grundrisspositionierung und teils aus
  manueller Eingabe
- Nutzung der Nachbarschaftsdaten fur: Heizlastberechnung, Hottgenroth-Vorbereitung,
  Plausibilitatsprufung

### Zielnutzen

- schnellere Vor-Ort-Erfassung
- weniger manuelle Wandzuordnung
- bessere Plausibilitat der Raumdaten
- Grundlage fur automatischen Grundriss-Export
- bessere Vorbereitung fur Hottgenroth und andere Energieberatungstools

### Voraussetzungen / offene Fragen

- WebXR/LiDAR-Verfugbarkeit im Browser vs. native iOS-App-Entscheidung
- Genauigkeit des iPhone-LiDAR fur Energieberatungs-Zwecke prufen
- Canvas/SVG-Modul-Konzept und Datenspeicherung entwerfen
- Datenmodell-Erweiterung fur Raumkoordinaten und Wandreferenzen definieren
- Abwartskompatibilitat mit V1-Projekten sicherstellen

---

## Fotospeicher-Migrationspfad (technisch)

Unabhängig von der Versionsstufe ist folgende technische Migrationsreihenfolge geplant:

1. **V1:** Fotos als Base64 in localStorage (aktuell), Größenwarnung ab 2 MB
2. **V1.5:** IndexedDB-Layer (`js/photodb.js`), neue Fotos direkt als Blob,
   Lazy-Migration alter Base64-Fotos beim Laden, ZIP-Export mit Fotos
3. **V2:** IndexedDB produktiv und stabil, Exportformat versioniert
4. **V3:** Cloud-Speicher (z. B. S3-kompatibel), photoIds bleiben als Konzept erhalten,
   nur Speicherort wechselt

Der Vorteil dieses Pfades: Das Datenmodell (photoId statt Base64) bleibt über alle Stufen
gleich. Nur das Backend (localStorage → IndexedDB → Cloud) wechselt.

---

## Architektur-Leitplanken (gilt ab sofort)

Diese Prinzipien gelten bereits in V1 und sollen sicherstellen, dass spätere Stufen
keine Grundsanierung erfordern:

**Hottgenroth-Kompatibilität:**

- Das Datenmodell soll langfristig Hottgenroth-fähig bleiben. Raum-, Bauteil-, Wand-,
  Fenster-, Tür-, Heizungs- und Warmwasserdaten sollen strukturiert, eindeutig
  referenzierbar und exportierbar bleiben, damit später ein Mapping auf Hottgenroth-
  Felder möglich ist.
- Keine Datenmodell-Entscheidung treffen, die ein späteres Hottgenroth-Mapping dauerhaft
  unmöglich macht (z. B. unstrukturierte Freitextfelder statt klar typisierter Werte
  für Bauteilarten, Energieträger, Wandzuordnungen).
- Exportformate sollen stabil und versioniert sein; ein zukünftiges Hottgenroth-Mapping
  setzt ein stabiles Quellformat voraus.

**Fachmodule und Berechnungen:**

- Daten müssen strukturiert bleiben, nicht nur Freitext. Bauteilarten, Energieträger,
  Wandzuordnungen und angrenzende Bereiche brauchen typisierte Werte, damit spätere
  Berechnungsmodule und Software-Mappings darauf aufbauen können.
- Räume, Bauteile, Wandseiten, Fenster, Türen, Heizkörper, Heizanlagen und
  Warmwasserbereiter brauchen stabile IDs (UUIDs), die bei Exporten, Importen und
  Datenmodell-Umbauten erhalten bleiben.
- Raum-/Bauteiltabellen sollen langfristig maschinenlesbar und exportierbar bleiben.
- Manuelle Eingaben und spätere Berechnungsergebnisse müssen getrennt gespeichert
  werden (z. B. manuell eingetragener U-Wert vs. später berechneter Normwert).
- Überschlägige Werte dürfen nicht mit normativen Nachweisen verwechselt werden.
  Normative Berechnungen müssen sauber gekennzeichnet und methodisch getrennt sein.
- Exportformate sollen versioniert werden. Maschinenlesbarkeit ist Voraussetzung für
  spätere Hotgenroth-, EVEbi- oder andere Software-Mappings.

**Allgemein:**

- Projekt-IDs und Foto-IDs als UUIDs, ohne Kundendaten im Schlüssel.
- Exportformat mit Versionsfeld (damit Importer rückwärtskompatibel sein können).
- Datenmodellerweiterungen defensiv laden (kein Hard-Fail bei unbekannten Feldern).
- Keine fest einkodierte Kurz-Quadrat-Logik in Fachfunktionen.
- Brand-CSS als austauschbare Schicht (css/brand.css).
- Keine kurzfristigen Lösungen, die Mehrbenutzerfähigkeit massiv erschweren.
- Keine Kundendaten in Dateinamen oder globalen IDs.

**Speziell für spätere Grundriss- und LiDAR-Erweiterbarkeit:**

- Räume haben stabile UUIDs (bereits in V1 umgesetzt via `r.id`). Diese IDs dürfen
  nicht bei Umbaumaßnahmen oder Exporten verloren gehen.
- Wände sollten langfristig eindeutig pro Raum und Richtung referenzierbar sein.
  Heute: `wand_n`, `wand_o`, `wand_s`, `wand_w` als Felder je Raum. Das reicht
  für V1; für spätere Grundrisslogik sollte jede Wand eine eigene ID erhalten
  können (kein Breaking Change nötig, erweiterbar).
- Wandgrenzen sind heute Freitext oder einfache Enum-Werte. Langfristig sollen sie
  strukturierte Referenzen werden: Außenluft, Erdreich, unbeheizter Bereich, oder
  eine Raum-ID als Nachbarraum-Referenz. Das heutige Modell verbaut das nicht.
- Räume sollten später optionale Koordinaten/Positionsfelder bekommen können
  (`r.position: { x, y, rotation }`). Diese Felder existieren noch nicht und
  sind nicht nötig für V1; sie sollten aber beim nächsten größeren Datenmodell-
  Update ergänzbar sein, ohne bestehende Projekte zu brechen.
- Laser-/Disto-Messwerte sind heute die einzige Quelle. Wenn LiDAR-Schätzwerte
  hinzukommen, müssen sie als separate, überschreibbare Felder gespeichert werden:
  Messwert (manuell/Disto) hat Vorrang vor LiDAR-Schätzwert. Kein stilles
  Überschreiben manueller Eingaben.
