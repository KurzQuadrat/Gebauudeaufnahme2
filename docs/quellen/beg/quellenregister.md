# Quellenregister BEG – Förderrechner-Modul (Vorarbeit)

Letzte Aktualisierung: 2026-06-10

---

## Wichtiger Hinweis

Dieses Register dokumentiert ausschließlich **Quellenlage und Stand**. Es enthält **keine
rechtsverbindliche Förderaussage**. Förderprogramme ändern sich häufig (siehe
`auswertung/risiken-haftung.md` – noch zu erstellen / Abschnitt "Risiken" im Abschlussbericht).
Maßgeblich sind immer die jeweils aktuellen Richtlinien/Merkblätter von BAFA und KfW zum
Zeitpunkt der Antragstellung.

---

## Register

| Bereich | Fördergeber | Dokument | Stand/Gültig ab | Quelle/URL | Lokaler Pfad | Regelrelevanz | Status | Notiz |
|---|---|---|---|---|---|---|---|---|
| BEG EM Gebäudehülle | BAFA | Richtlinie für die Bundesförderung für effiziente Gebäude – Einzelmaßnahmen (BEG EM) vom 21.12.2023 (BAnz AT 29.12.2023 B1) | gültig 01.01.2024–31.12.2030 (lt. Webrecherche 2026 weiterhin in Kraft, nur einzelne technische Anpassungen, z. B. Schallanforderungen Wärmepumpen ab 2026) | https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Downloads/F/foerderrichtlinie-beg-em.html | `original/beg_richtline_beg_em_20231221_PDF.pdf` (User-Datei, 19/32 S.) / `text/beg-richtlinie-em-20231221.txt` | Hoch – Hauptregelwerk §5 (Maßnahmengruppen), §8 (Fördersätze, Höchstgrenzen), Anlage TMA Gebäudehülle §1.1 | umgewandelt (Volltext extrahiert, 2480 Zeilen) | Stand 21.12.2023 – **Aktualität für 2026 nicht abschließend verifiziert** (siehe Offene Punkte). Technische Detailanpassungen (z. B. Wärmepumpen-Schall) seit 2025/2026 möglich, nicht im Dokument enthalten. |
| BEG EM Anlagentechnik außer Heizung | BAFA | dieselbe Richtlinie (§5.2, §2 Anlage TMA) | wie oben | wie oben | wie oben | Mittel – §2.1–2.4 TMA (Lüftung, Smart Home, MSR, Kälte) extrahiert | umgewandelt | wie oben |
| BEG EM Heizungsoptimierung | BAFA | dieselbe Richtlinie (§5.4 a/b, §8 Fördersätze) | wie oben | wie oben | wie oben | Mittel – Fördersätze (15 %+iSFP / 50 % Emissionsminderung) bekannt, technische Detailanforderungen TMA §3/§4 NICHT extrahiert | teilweise erfasst | TMA-Abschnitte zu Heizungsoptimierung (vermutlich §3 ff. der Anlage) noch nicht gelesen |
| BEG Fachplanung/Baubegleitung | BAFA | dieselbe Richtlinie (§5.5, §8 Höchstgrenzen 5.000 €/2.000 € je WE) | wie oben | wie oben | wie oben | Hoch – Fördersatz 50 %, Höchstgrenzen extrahiert | umgewandelt | Detailanforderungen an Energieeffizienz-Experten (§9.3) nur grob erfasst |
| KfW Heizungsförderung Wohngebäude (KfW 458) | KfW | Merkblatt "BEG Heizungsförderung für Privatpersonen – Wohngebäude" (Zuschuss), Programmnummer 458, Bestellnummer 600 000 5131 | Gültig ab 10.12.2025 (Antragseingang), Stand 12/2025; Rechtsgrundlage = BAFA/BMWE-Richtlinie BEG EM vom 21.12.2023 (bestätigt weiterhin gültig) | https://www.kfw.de/458 (Direktdownload via PDF-Link kfw.de) | `original/kfw-merkblatt-458.pdf` / `text/kfw-merkblatt-458.txt` (672 Zeilen, vollständig extrahiert und gelesen) | Hoch für spätere MVP-Stufe „Heizung" – bestätigt: KfW hat KEINE eigenen TMA, nutzt TMA der BAFA-Richtlinie 1:1; regelt Zuschussabwicklung (BzA→Vertrag→Antrag→Durchführung→BnD→Auszahlung), Grundförderung 30 %, Effizienzbonus +5 %, Klimageschwindigkeitsbonus 20 %/17 % (gestaffelt bis 2030), Einkommensbonus +30 % (zvE ≤40.000 €), Emissionsminderungszuschlag 2.500 € pauschal, Förderhöchstbeträge 30.000/15.000/8.000 € je WE, Gesamtdeckel 70 % | umgewandelt (Volltext extrahiert, vollständig gelesen) | Auftraggeber jetzt BMWE (vormals BMWK). Bewilligungszeitraum 36 Monate, Nachweisfrist 6 Monate nach Vorhabenabschluss. Kombination mit BEG WG (Effizienzhaus) möglich, aber nicht für dieselben Kosten; Kombination mit BAFA BEG EM für dieselbe Maßnahme ausgeschlossen (nur ein Antrag je förderfähige Gesamtkosten). |
| KfW Effizienzhaus-Zuschuss (Wohngebäude, Sanierung) | KfW | Merkblatt "BEG Wohngebäude Zuschuss Effizienzhaus", Programmnummer 461, Bestellnummer 600 000 4858 | **Gültig ab 20.04.2022, Stand 04/2022** – Rechtsgrundlage Richtlinie BEG WG vom 7.12.2021 | https://www.kfw.de/461 | `original/kfw-merkblatt-461.pdf` / `text/kfw-merkblatt-461.txt` (2118 Zeilen, Struktur/Kernwerte gesichtet, nicht vollständig Zeile für Zeile gelesen) | Mittel/Niedrig für MVP1 (Gebäudehülle/BEG EM = BAFA-Zuständigkeit) – für spätere MVP-Stufe „Effizienzhaus" relevant, aber Zahlen veraltet | **veraltet – manuell prüfen** | Stand 04/2022 ist fast 4 Jahre alt (heute 2026-06-10), während das ebenfalls beschaffte Kreditmerkblatt 261 bereits Stand 08/2025 hat (Richtlinie BEG WG vom 9.12.2022). Hohe Wahrscheinlichkeit, dass eine neuere 461-Fassung existiert. Enthält in der vorliegenden Fassung: Effizienzhaus-Stufen (Denkmal/100/85/70/55/40, je mit EE/NH-Variante), Zuschusssätze 25–45 % je Stufe + 2,5–5 PP EE/NH-Bonus + iSFP-Bonus, Höchstbeträge 30.000–54.000 €/WE. **Diese Werte NICHT als aktuell gültig übernehmen** – vor Verwendung aktuelle Fassung von kfw.de/461 beschaffen. |
| KfW Effizienzhaus-Kredit (Wohngebäude, Sanierung) | KfW | Merkblatt "BEG Wohngebäude Kredit Effizienzhaus", Programmnummer 261, Bestellnummer 600 000 4854 | Gültig ab 01.01.2023 (Antragseingang), Stand 08/2025 – Rechtsgrundlage Richtlinie BEG WG vom 9.12.2022 | https://www.kfw.de/261 | `original/kfw-merkblatt-261.pdf` / `text/kfw-merkblatt-261.txt` (668 Zeilen, Struktur/Kernwerte gesichtet, nicht vollständig Zeile für Zeile gelesen) | Mittel/Niedrig für MVP1 (Gebäudehülle/BEG EM = BAFA-Zuständigkeit) – für spätere MVP-Stufe „Effizienzhaus/Kredit" relevant | teilweise erfasst | Aktuellerer Stand als 461 (08/2025 vs. 04/2022) – Effizienzhaus-Stufen (Denkmal/85/70/55/40, je EE/NH/WPB/SerSan-Varianten), Tilgungszuschuss 5–20 % je Stufe + 5 PP EE/NH-Bonus + 10 PP WPB-Bonus + 15 PP SerSan-Bonus (WPB+SerSan zusammen max. +20 PP), Fachplanung/Baubegleitung/Nachhaltigkeitszertifizierung je 50 % Tilgungszuschuss, Kreditbetrag max. 150.000 €/WE (EE/NH-Klasse). Diskrepanz zu 461 (unterschiedlicher Stand) spricht dafür, dass 461 ebenfalls eine 2025er-Fassung haben müsste – nicht gefunden/nicht verifiziert. |
| Technische Mindestanforderungen (TMA) Gebäudehülle | BAFA/BMWE | Anlage zur BEG-EM-Richtlinie 21.12.2023, §1.1 (U-Werte, sommerlicher Wärmeschutz) | Stand 21.12.2023 | s. o. | `text/beg-richtlinie-em-20231221.txt` (Zeilen ca. 1750 ff.) | Sehr hoch – vollständige U-Wert-Tabelle für MVP1 extrahiert | umgewandelt | Querverweis auf „Anlage 7 GEG" (Sonderverglasungen-Fußnote) – Verbindung zum GEG-Quellenregister `docs/quellen/enev-geg/` |
| Technische FAQ | BAFA/KfW | „Liste technische FAQ BEG" (User-Datei, 11 S.) | unbekannt – Stand-Datum im Dokument noch nicht geprüft | – (User-Datei) | `original/beg_liste_technische_faq.pdf` / `text/beg-technische-faq.txt` | Mittel – Detailklärungen zu Einzelfällen | Volltext extrahiert (2713 Zeilen), **inhaltlich noch nicht ausgewertet** | Nächster Schritt: Stand-Datum prüfen + relevante FAQ zu Gebäudehülle/iSFP/Fachplanung extrahieren |
| Antragstellung/Vorhabensbeginn | BAFA/KfW | dieselbe Richtlinie §9.2 (Vorhabenbeginn-Definition) | Stand 21.12.2023 | s. o. | `text/beg-richtlinie-em-20231221.txt` | Hoch – Definition Vorhabenbeginn extrahiert | umgewandelt | Zweistufiges Verfahren (§9) grob erfasst, Detail-Workflow noch nicht ausformuliert |
| iSFP-Bonus | BAFA | dieselbe Richtlinie §8.4.2 | Stand 21.12.2023 | s. o. | `text/beg-richtlinie-em-20231221.txt` | Hoch – Bonusregel (+5 pp, 15-Jahres-Frist, Ausnahmen 5.3/5.4b/5.5) extrahiert | umgewandelt | Programm „Energieberatung für Wohngebäude" (EBW) selbst nicht vertieft recherchiert |
| Förderfähige Kosten / Höchstgrenzen | BAFA/KfW | „Infoblatt zu den förderfähigen Maßnahmen und Leistungen – Sanieren", Version 10.0 (Stand 01.07.2025) | **Stand 01.07.2025 – NEUER als die Richtlinie (21.12.2023)** | – (User-Datei) | `original/beg_infoblatt_foerderfaehige_kosten.pdf` / `text/beg-infoblatt-foerderfaehige-kosten.txt` | Sehr hoch – §2.1–2.5 Gebäudehülle (förderfähige Maßnahmen) und §9.1 (ausgeschlossene Kosten) extrahiert | umgewandelt | **Stand-Diskrepanz**: Infoblatt v10.0 (07/2025) ist 19 Monate jünger als Richtlinie (12/2023). Versionshistorie 0.0 (01/2021) bis 10.0 (07/2025) im Dokument enthalten – zeigt iterative Detailänderungen. Höchstgrenzen (€-Beträge, Fördersätze) stammen weiterhin aus der Richtlinie; das Infoblatt regelt NUR, welche Einzelleistungen als „förderfähige Kosten" zählen. Beide Quellen mit eigenem Stand zu zitieren. |
| Ausschlüsse/Sonderregeln | BAFA/KfW | Richtlinie §6.2 (Förderausschlüsse Antragsteller), §7 (10-Jahres-Nutzungspflicht), Infoblatt §9 (nicht förderfähige Kosten, u. a. §9.1 Gebäudehülle, §9.2 Wärmeerzeuger) | Stand 21.12.2023 (Richtlinie) / 01.07.2025 (Infoblatt) | s. o. | beide Dateien | Hoch | umgewandelt | Kumulierungsverbot §8.6 (max. 60 %/90 % öffentliche Mittel, kein §35a/§35c EStG parallel) extrahiert |
| BEG-Wissens-Repo (Kurz Quadrat) | – | `C:\Claude\BEG-Wissen\` (Konvention des bafa-kfw-experte-Skills) | – | – | `C:\Claude\BEG-Wissen\` | Organisatorisch relevant (geplante Pflegestelle für aktuelle Sätze/Fristen) | **leer/Template** | Repo enthält nur Vorlagen, keine befüllten aktuellen Werte. Kein Rückgriff für dieses Projekt möglich. Empfehlung: nach Projektabschluss dieses Quellenregister als Startpunkt für die Befüllung von `BEG-Wissen` nutzen. |
| Excel-Förderrechner BAFA/KfW v10 (2024) | BAFA/KfW (offiziell, als Tool) | `Foerderrechner_BEG_EM_Heizung_3.5.xlsx`, `BEG-EM_2024_Foerderrechner_v10.xlsx` | Stand 2024 (lt. Dateiname) | – (User-Datei) | `...\BEG-EM_2024_Foerderrechner_v10\*.xlsx` (liegen außerhalb des Repos im OneDrive, NICHT kopiert) | Potenziell hoch – könnten Berechnungslogik/Fördersätze als Referenz enthalten | **noch nicht ausgewertet** | Für spätere Aufgabe: Struktur/Formeln sichten, mit Richtlinie 21.12.2023 abgleichen, NICHT 1:1 als Code übernehmen ohne Quellenprüfung |

---

## Nicht gefundene / nicht zugängliche Primärquellen

| Quelle | Grund | Alternative |
|---|---|---|
| Aktuelle BEG-EM-Richtlinie 2025/2026 (falls existent, novelliert) | nicht recherchiert/gefunden | KfW-Merkblatt 458 (Stand 12/2025) bestätigt: Richtlinie vom 21.12.2023 weiterhin Rechtsgrundlage, keine Novelle gefunden |
| KfW-Merkblatt 461 (Effizienzhaus-Zuschuss), aktuelle Fassung | vorliegende Fassung Stand 04/2022 vermutlich veraltet | aktuelle Fassung über kfw.de/461 zu beschaffen, sobald MVP-Stufe „Effizienzhaus" relevant wird |
| TFAQ Abschnitt 8 (Wärmeerzeugung, Detailfragen) | noch nicht ausgewertet | `text/beg-technische-faq.txt` enthält den Text, Auswertung für spätere MVP-Stufe „Heizung" vorgesehen |

---

## Quellen-Hierarchie für dieses Projekt (BEG)

1. **Vom Nutzer bereitgestellte Originaldokumente** (Richtlinie, Infoblatt, technische FAQ, Excel-Rechner) – höchste Priorität, da geprüft und versioniert
2. **BAFA** (bafa.de) – offizielle Verfahrens-/Förderseiten Gebäudehülle, Anlagentechnik, Heizungsoptimierung, Fachplanung/Baubegleitung
3. **KfW** (kfw.de) – offizielle Merkblätter Heizungsförderung, Effizienzhaus
4. **energiewechsel.de / BMWE** – offizielle Übersichts- und FAQ-Seiten
5. Sekundärquellen (Blogs, Energieberater-Webseiten, Förder-Wikis) – **nur zur Plausibilisierung, nicht als Regelgrundlage**, in diesem Register entsprechend gekennzeichnet

---

## Status-Legende

- **umgewandelt**: Originaldokument vorhanden und in Text/Markdown überführt, inhaltlich ausgewertet
- **teilweise erfasst**: Dokument vorhanden, relevanter Abschnitt nur teilweise gelesen
- **fehlt**: kein Originaldokument vorhanden, Regelgrundlage offen
- **geprüft**: Aussage anhand mehrerer Quellen verifiziert

---

*Erstellt: 2026-06-10 im Rahmen der Vorbereitung „Förderrechner BEG" (Quellen-, Analyse- und Architekturphase). Keine App-Änderung, kein Commit/Push gemäß Auftrag.*
