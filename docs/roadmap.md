# Roadmap Gebäudeerfassung

Stand: 2026-06-09

---

## Überblick

Die Gebäudeerfassungs-App wird in mehreren Stufen entwickelt. Version 1 ist ein internes
Werkzeug für Kurz Quadrat. Perspektivisch soll die App als kostenpflichtiges Produkt auch
anderen Energieberatern zur Verfügung stehen.

```
V1 intern  →  V1.5 Pilot  →  V2 Produktfähigkeit  →  V3 SaaS / kommerziell
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

**Nicht in V1:**

- Bezahlfunktion
- Login / Benutzerverwaltung
- Cloud-Synchronisation
- Mehrbenutzerbetrieb
- öffentlicher SaaS-Betrieb
- vollständige Hottgenroth-Integration
- automatisierte Rechts- oder Förderprüfung
- KI-Fotoanalyse als produktive Pflichtfunktion

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

**Nicht in V2:**

- Produktiver Cloud-Betrieb
- Login und Authentifizierung
- Bezahlfunktion
- Mehrmandantenbetrieb (noch Konzept, kein produktiver Betrieb)

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

**Voraussetzungen:**

- Alle Punkte aus V2 stabil und abgeschlossen
- Rechtliche Prüfung (DSGVO, Haftung, Nutzungsbedingungen)
- Datenschutzkonzept und AV-Vertrag abgeschlossen
- Hosting-Entscheidung getroffen
- Betriebsprozesse (Monitoring, Backup, Incident-Response) definiert

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

- Projekt-IDs und Foto-IDs als UUIDs, ohne Kundendaten im Schlüssel.
- Exportformat mit Versionsfeld (damit Importer rückwärtskompatibel sein können).
- Datenmodellerweiterungen defensiv laden (kein Hard-Fail bei unbekannten Feldern).
- Keine fest einkodierte Kurz-Quadrat-Logik in Fachfunktionen.
- Brand-CSS als austauschbare Schicht (css/brand.css).
- Keine kurzfristigen Lösungen, die Mehrbenutzerfähigkeit massiv erschweren.
- Keine Kundendaten in Dateinamen oder globalen IDs.
