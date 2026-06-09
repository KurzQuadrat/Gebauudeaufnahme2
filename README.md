# Gebäudeerfassung

## Zweck

Strukturierte Vor-Ort-Erfassung von Gebäudedaten auf dem iPhone durch Energieberater. Die App
unterstützt die vollständige Aufnahme von Räumen, Bauteilen, Heizung, Warmwasser und Fotos vor
Ort und stellt die Daten anschließend strukturiert für die Weiterverarbeitung am PC bereit.

## Aktueller Status

Aktive Entwicklung. Clientseitige Web-App (Vanilla HTML/CSS/JavaScript, ohne Framework, ohne
Build-Tool, ohne Cloud-Abhängigkeit). Primär nutzbar auf dem iPhone via “Zum Home-Bildschirm
hinzufügen”, auch im Desktop-Browser testbar.

## Nutzung

Im mobilen Browser nutzbar, über “Zum Home-Bildschirm hinzufügen” als App-ähnliche Anwendung
auf dem iPhone. Alle Daten werden lokal im Browser gespeichert (localStorage). Kein Account,
kein Login, kein Server erforderlich.

## Produkt-Perspektive

Version 1 ist primär für die interne Nutzung durch Kurz Quadrat entwickelt. Kurz Quadrat ist
erster Nutzer und Referenzpilotkunde. Die technische Architektur ist jedoch so gestaltet, dass
sie spätere externe Nutzung durch andere Energieberater nicht verbaut.

Perspektivisch kann die App als Pilot- oder SaaS-Produkt für andere Energieberater
bereitgestellt werden. Siehe docs/roadmap.md und docs/produktziel.md.

## Abgrenzung

Dies ist keine vollständige Energieberatungssoftware. Ziel ist die strukturierte Datenerfassung
vor Ort. Die exportierten Daten dienen als Grundlage für die Weiterverarbeitung in
Energieberatungstools wie Hottgenroth. Eine direkte automatische Befüllung von Hottgenroth ist
kein Ziel von Version 1.

## Datenschutz

**Keine echten Kundendaten und keine echten API-Keys in dieses Repository committen.**

Projekte werden anonymisiert geführt: keine Kundennamen, keine vollständigen Adressen, keine
Kontaktdaten. Nur technische und projektrelevante Gebäudedaten.

## Hinweis zum Refactoring

Die Struktur des Projekts wird schrittweise überarbeitet (z. B. Aufteilung der bisher
monolithischen `index.html` in HTML/CSS/JS-Module), ohne die bestehende Funktionalität zu
verändern.
