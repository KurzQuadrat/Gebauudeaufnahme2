# Regelsatz MVP1 – BEG EM Gebäudehülle Wohngebäude

Letzte Aktualisierung: 2026-06-10

---

## Wichtiger Hinweis

Dieser Regelsatz ist eine **fachliche Vorbereitung**, kein Code, keine rechtsverbindliche
Förderaussage. Quelle ist primär die BEG-EM-Richtlinie vom 21.12.2023 (Anlage TMA §1,
§5.1, §8) sowie ergänzend `markdown/beg-technische-faq-auszug.md` (Technische FAQ
Version 6.1, Inkrafttreten 18.07.2024) und das Infoblatt förderfähige Kosten v10.0
(Stand 01.07.2025). Bei abweichenden Ständen gilt: Fördersätze/Höchstgrenzen aus der
Richtlinie 21.12.2023 (älteste, aber als Rechtsgrundlage durch KfW 458/12-2025 bestätigt
weiterhin gültig), Detailregelungen zu förderfähigen Einzelleistungen aus dem Infoblatt
v10.0, technische Klarstellungen aus der TFAQ.

Geltungsbereich MVP1: **Wohngebäude (WG)**, Maßnahmengruppe **5.1 Gebäudehülle**
(Fördergeber BAFA, Fördersatz 15 %), zzgl. 5.5 Fachplanung/Baubegleitung (50 %) und
iSFP-Bonus (8.4.2, +5 pp). Nichtwohngebäude (NWG)-Sonderwerte sind in der Spalte
"Bedingung"/"Nutzerhinweis" als Zusatzinfo angegeben, aber nicht Kern von MVP1.

---

## Allgemeine Grundvoraussetzungen (gelten für alle Zeilen, nicht einzeln wiederholt)

- Antragsteller antragsberechtigt (§6, keine Ausschlussgründe §6.2)
- Antrag VOR Vorhabenbeginn gestellt (§9.2.1), Liefer-/Leistungsvertrag mit
  aufschiebender/auflösender Bedingung der Förderzusage
- Bauteil gehört zur thermischen Gebäudehülle (wärmeübertragende Umfassungsfläche)
- Wärmebrückenreduzierte und luftdichte Ausführung (§1.1 TMA)
- Bei luftdichtheitserhöhenden Maßnahmen: Lüftungskonzept (z. B. nach DIN 1946-6)
- Mindestinvestition 300 € brutto je Maßnahme (laut regelmodell.md, Schritt 2)

---

## Regelsatz-Tabelle

| ruleId | Bereich | Bedingung | Eingabedaten | Ergebnis | Quelle | Stand | Unsicherheitsgrad | Nutzerhinweis |
|---|---|---|---|---|---|---|---|---|
| BEG-EM-5.1-UWERT-AUSSENWAND | Außenwand/Fassade | U-Wert_geplant ≤ 0,20 W/(m²K) (WG, beheizt ≥19°C) | U-Wert geplant, Bauteiltyp=Außenwand, Gebäudezone-Temperatur | `wahrscheinlich_foerderfaehig` (Förderquote 15 %, ggf. +5 pp iSFP) wenn U-Wert eingehalten; sonst `nicht_foerderfaehig` (TMA nicht erfüllt) | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1, Tabelle "Außenwände" | 21.12.2023 | niedrig | Wert gilt für Zonen ≥19°C. Für Zonen 12-<19°C (nur NWG) gilt 0,25 W/(m²K). |
| BEG-EM-5.1-UWERT-AUSSENWAND-EINBLAS | Außenwand – Einblas-/Kerndämmung zweischal. Mauerwerk | λ-Wert_geplant ≤ 0,035 W/(m·K) (WG, ≥19°C) | Wärmeleitfähigkeit Dämmstoff, Bauteiltyp=Einblas-/Kerndämmung | `wahrscheinlich_foerderfaehig` wenn λ eingehalten; sonst `nicht_foerderfaehig` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Sonderfall bei bestehendem zweischaligem Mauerwerk – λ-Wert statt U-Wert maßgeblich. Zonen 12-<19°C (NWG): 0,040 W/(m·K). |
| BEG-EM-5.1-UWERT-AUSSENWAND-DENKMAL | Außenwand – Baudenkmal/erhaltenswerte Bausubstanz | U-Wert_geplant ≤ 0,45 W/(m²K) (WG; bei NWG nur Baudenkmal) | U-Wert geplant, Denkmalschutz-Status (§105 GEG) bzw. "erhaltenswerte Bausubstanz" (nur WG) | `manuell_pruefen` – angepasste TMA-Werte nur bei nachgewiesenem Status | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1; TFAQ 2.09 | 21.12.2023 / TFAQ Inkrafttreten 18.07.2024 | mittel | TFAQ 2.09: Bei NWG sind angepasste Werte NUR für Baudenkmale zulässig, nicht für "sonstige erhaltenswerte Bausubstanz". Status muss dokumentiert/nachgewiesen sein – Status-Prüfung selbst nicht regelseitig automatisierbar. |
| BEG-EM-5.1-UWERT-AUSSENWAND-SICHTFACHWERK | Außenwand – Sichtfachwerk (Innendämmung/Ausfachung) | U-Wert_geplant ≤ 0,65 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Sichtfachwerk-Außenwand | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,80 W/(m²K). |
| BEG-EM-5.1-UWERT-DACH-SCHRAEG | Dach – Schrägdach inkl. Kehlbalkenlage | U-Wert_geplant ≤ 0,14 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Schrägdach/Kehlbalkenlage | `wahrscheinlich_foerderfaehig` wenn eingehalten; sonst `nicht_foerderfaehig` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,25 W/(m²K). |
| BEG-EM-5.1-UWERT-DACHGAUBE | Dach – Dachgaube | U-Wert_geplant ≤ 0,20 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Dachgaube | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,25 W/(m²K). |
| BEG-EM-5.1-UWERT-OBERSTE-GESCHOSSDECKE | Oberste Geschossdecke / oberste Geschossdecke-Wände (Abseitenwände) gegen unbeheizten Dachraum | U-Wert_geplant ≤ 0,14 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=oberste Geschossdecke / Abseitenwand | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,25 W/(m²K). |
| BEG-EM-5.1-UWERT-FLACHDACH | Dach – Flachdach mit Abdichtung | U-Wert_geplant ≤ 0,14 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Flachdach | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,20 W/(m²K). |
| BEG-EM-5.1-UWERT-DACH-DENKMAL | Dach – Baudenkmal/erhaltenswerte Bausubstanz (alle Dachformen + oberste Geschossdecke) | λ-Wert der gewählten Dämmstoffdicke ≤ 0,040 W/(m·K), "höchstmögliche Dämmstoffdicke" | λ-Wert Dämmstoff, Dämmstoffdicke, Denkmalschutz-/erhaltenswert-Status (nur WG bei "sonstige erhaltenswerte Bausubstanz") | `manuell_pruefen` – "höchstmögliche Dämmstoffdicke" ist kein fixer Zahlenwert, erfordert Einzelfallprüfung | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | hoch | Begriff "höchstmögliche Dämmstoffdicke" ist auslegungsbedürftig (baukonstruktive Grenzen) – nicht pauschal regelbar. |
| BEG-EM-5.1-UWERT-WAND-ERDREICH | Wände gegen Erdreich/unbeheizte Räume/Kellerräume | U-Wert_geplant ≤ 0,25 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Wand gegen Erdreich/unbeheizten Raum | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): ebenfalls 0,25 W/(m²K) (kein Unterschied). |
| BEG-EM-5.1-UWERT-KELLERDECKE | Kellerdecke / Decke gegen unbeheizten Raum | U-Wert_geplant ≤ 0,25 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Kellerdecke/Decke gegen unbeheizten Raum | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1; TFAQ 3.07 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): ebenfalls 0,25 W/(m²K). TFAQ 3.07: Klärungen zu Bodenflächen/Gefälledämmung beachten (siehe BEG-EM-5.1-BODENFLAECHE-SONDERFALL). |
| BEG-EM-5.1-UWERT-GESCHOSSDECKE-AUSSENLUFT | Geschossdecke gegen Außenluft von unten (z. B. auskragender Erker, Durchfahrt) | U-Wert_geplant ≤ 0,20 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Geschossdecke gegen Außenluft | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 0,25 W/(m²K). |
| BEG-EM-5.1-UWERT-BODENFLAECHE | Bodenfläche gegen Erdreich | U-Wert_geplant ≤ 0,25 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Bodenplatte gegen Erdreich | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): ebenfalls 0,25 W/(m²K). NWG-Sonderfall "neuer Fußbodenaufbau bei bestehender Bodenfläche": 0,35 W/(m²K) – nicht relevant für WG/MVP1. |
| BEG-EM-5.1-BODENFLAECHE-SONDERFALL | Bodenfläche – hinterlüftete Fassaden / Gefälledämmung | abhängig vom konkreten Aufbau, siehe TFAQ 3.07/3.09 | Bauteilaufbau-Details (hinterlüftete Fassade, Gefälledämmung Flachdach) | `manuell_pruefen` | TFAQ 3.07/3.09 | TFAQ Inkrafttreten 18.07.2024 | mittel | Auszug `markdown/beg-technische-faq-auszug.md` enthält Klarstellungen, aber keine eigenständige neue U-Wert-Zeile – Einzelfallabgleich mit TMA-Tabelle nötig. |
| BEG-EM-5.1-UWERT-FENSTER | Fenster, Balkon-/Terrassentüren (Standard) | U-Wert_geplant (UW) ≤ 0,95 W/(m²K) (WG, ≥19°C) | U-Wert (UW) geplant, Bauteiltyp=Fenster/Balkontür/Terrassentür | `wahrscheinlich_foerderfaehig` wenn eingehalten; sonst `nicht_foerderfaehig` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 (Fußnote 1: Bezug UW-Wert) | 21.12.2023 | niedrig | Zonen 12-<19°C (NWG): 1,3 W/(m²K). |
| BEG-EM-5.1-UWERT-FENSTER-ERTUECHTIGUNG | Ertüchtigung von Fenstern/Balkon-/Terrassentüren, Kastenfenstern, Fenstern mit Sonderverglasung | U-Wert_geplant (UW) ≤ 1,3 W/(m²K) (WG, ≥19°C) | U-Wert nach Ertüchtigung, Bauteiltyp=Ertüchtigung Fenster/Kastenfenster/Sonderverglasung | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1; TFAQ 4.04/4.06 | 21.12.2023 / TFAQ 18.07.2024 | mittel | Zonen 12-<19°C (NWG): 1,6 W/(m²K). TFAQ 4.04/4.06: bei Ertüchtigung von Sonderverglasungen (Schall-/Brandschutz, Durchschuss-/Durchbruch-/Sprengwirkungshemmung gem. Fußnote 15 Anlage 7 GEG) gelten ggf. Pflicht-Mindestmaßnahmen – siehe BEG-EM-5.1-FENSTER-SONDERVERGLASUNG. |
| BEG-EM-5.1-UWERT-FENSTER-BARRIEREARM | Barrierearme oder einbruchhemmende Fenster/Balkon-/Terrassentüren | U-Wert_geplant (UW) ≤ 1,1 W/(m²K) (WG, ≥19°C) UND funktionale Anforderungen (Bedienkraft, RC2 bei Einbruchhemmung) | U-Wert geplant, Ausstattungsmerkmal=barrierearm/einbruchhemmend, Widerstandsklasse | `wahrscheinlich_foerderfaehig` wenn U-Wert UND funktionale Anforderung erfüllt; `manuell_pruefen` wenn funktionale Anforderung nicht eindeutig nachgewiesen | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 (inkl. Bedienkraft-/RC2-Anforderungen) | 21.12.2023 | mittel | Zonen 12-<19°C (NWG): 1,4 W/(m²K). Barrierearm: Drehmoment <5 Nm, Kraft <30 N, Griffhöhe ≤1,05 m, Schwellenhöhe Balkon-/Terrassentür ≤2,0 cm. Einbruchhemmend: mind. RC2 nach DIN EN 1627. |
| BEG-EM-5.1-FENSTER-SONDERVERGLASUNG | Fenster/Balkon-/Terrassentüren mit Sonderverglasung (Schall-/Brandschutz, Durchschuss-/Durchbruch-/Sprengwirkungshemmung gem. Fußnote 15 Anlage 7 GEG) | U-Wert_geplant (UW) ≤ 1,1 W/(m²K) (WG, ≥19°C); Sonderverglasung muss aufgrund Landesbauordnung/Vorschrift einzubauen sein | U-Wert geplant, Sonderverglasungstyp, Rechtsgrundlage für Pflichteinbau (z. B. Landesbauordnung) | `manuell_pruefen` – Pflichtgrundlage des Sonderverglasungseinbaus muss im Einzelfall nachgewiesen werden | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 (Verweis Fußnote 15 Anlage 7 GEG); TFAQ 4.04/4.06; Querverweis `docs/quellen/enev-geg/` (Anlage 7 GEG Fußnote 15) | 21.12.2023 / TFAQ 18.07.2024 | hoch | Zonen 12-<19°C (NWG): 1,4 W/(m²K). Diese Zeile ist die wichtigste Schnittstelle zwischen BEG-Förderrechner und GEG-Quellenregister – Sonderverglasungsdefinition (Schallschutz RW,R≥40dB, Brand-/Durchschuss-/Durchbruch-/Sprengwirkungshemmung, Brandschutzglas ≥18mm) liegt im GEG-Register. |
| BEG-EM-5.1-UWERT-FENSTER-DENKMAL | Fenster/Balkon-/Terrassentüren bei Baudenkmal/erhaltenswerter Bausubstanz | U-Wert_geplant (UW) ≤ 1,4 W/(m²K) (WG; bei NWG nur Baudenkmal) | U-Wert geplant, Denkmalschutz-/erhaltenswert-Status | `manuell_pruefen` – Status-Nachweis nötig, siehe TFAQ 2.09 | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1; TFAQ 2.09 | 21.12.2023 / TFAQ 18.07.2024 | mittel | Zonen 12-<19°C (NWG): 1,7 W/(m²K). |
| BEG-EM-5.1-UWERT-FENSTER-GLASTEILENDE-SPROSSEN | Fenster/Balkon-/Terrassentüren mit echten glasteilenden Sprossen bei Baudenkmal/erhaltenswerter Bausubstanz | U-Wert_geplant (UW) ≤ 1,6 W/(m²K) (WG; bei NWG nur Baudenkmal) | U-Wert geplant, Sprossentyp=echte glasteilende Sprossen, Denkmalschutz-/erhaltenswert-Status | `manuell_pruefen` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | mittel | Zonen 12-<19°C (NWG): 1,7 W/(m²K) (gleicher Wert wie Standard-Denkmalfenster). |
| BEG-EM-5.1-UWERT-FENSTER-ERTUECHTIGUNG-DENKMAL | Ertüchtigung von Fenstern/Balkon-/Terrassentüren bei Baudenkmal/erhaltenswerter Bausubstanz | U-Wert_geplant (UW) ≤ 1,6 W/(m²K) (WG; bei NWG nur Baudenkmal) | U-Wert nach Ertüchtigung, Denkmalschutz-/erhaltenswert-Status | `manuell_pruefen` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 | 21.12.2023 | mittel | Zonen 12-<19°C (NWG): 1,9 W/(m²K). |
| BEG-EM-5.1-UWERT-DACHFLAECHENFENSTER | Dachflächenfenster | U-Wert_geplant ≤ 1,0 W/(m²K) (WG, ≥19°C) | U-Wert geplant, Bauteiltyp=Dachflächenfenster | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1; TFAQ 4.09-4.11 | 21.12.2023 / TFAQ 18.07.2024 | niedrig | Zonen 12-<19°C (NWG): 1,1 W/(m²K). TFAQ 4.09-4.11: Abgrenzung Dachflächenfenster vs. Glasdach/Lichtband/Lichtkuppel beachten – Bauteildefinition kann im Einzelfall unklar sein. |
| BEG-EM-5.1-UWERT-AUSSENTUEREN | Außentüren beheizter Räume, Hauseingangstüren | U-Wert_geplant (UD) ≤ 1,3 W/(m²K) (WG, ≥19°C) | U-Wert (UD) geplant, Bauteiltyp=Außentür/Hauseingangstür | `wahrscheinlich_foerderfaehig` wenn eingehalten; sonst `nicht_foerderfaehig` | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 (Fußnote 3: Bezug UD-Wert); TFAQ 5.01/5.02 | 21.12.2023 / TFAQ 18.07.2024 | niedrig | Zonen 12-<19°C (NWG): 1,6 W/(m²K). TFAQ 5.01/5.02 bestätigt diese Werte. |
| BEG-EM-5.1-VORHANGFASSADE | Vorhangfassade (DIN EN 13830/ISO 12631) | U-Wert_geplant (UCW) ≤ 1,3 W/(m²K) (WG, ≥19°C) | U-Wert (UCW) geplant, Bauteiltyp=Vorhangfassade | `wahrscheinlich_foerderfaehig` wenn eingehalten | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1 (Fußnote 2: Bezug UCW-Wert); TFAQ 4.07 | 21.12.2023 / TFAQ 18.07.2024 | niedrig | Zonen 12-<19°C (NWG): 1,6 W/(m²K). TFAQ 4.07: Denkmalschutz-Ausnahme bei Vorhangfassaden – `manuell_pruefen` falls Denkmal. |
| BEG-EM-5.1-SOMMERWAERMESCHUTZ | Sommerlicher Wärmeschutz – außenliegender Sonnenschutz | DIN 4108-2:2013-02 Tabelle 7, Zeile 3.1-3.3 erfüllt; Zeile 3.4 (Vordächer/Markisen allgemein/freistehende Lamellen) ausgeschlossen; Installation parallel zur Verglasungsfläche an thermischer Hülle | Sonnenschutztyp, DIN-4108-2-Zeile, Anbringungsort | `foerderfaehig` (Förderquote 15 % wie 5.1) wenn Zeile 3.1-3.3 UND parallel zur Verglasung; `nicht_foerderfaehig` wenn Zeile 3.4 | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.2; TFAQ 2.08 | 21.12.2023 / TFAQ 18.07.2024 | niedrig | TFAQ 2.08 Sonderregel: Wird der Sonnenschutz als Umfeldmaßnahme zu einem Fenstertausch errichtet, entfällt der gesonderte Nachweis. Nachweis grundsätzlich: Bestätigung Energieeffizienz-Experte + Herstellernachweis + DIN-4108-2-Nachweis. |
| BEG-EM-5.5-FACHPLANUNG-BAUBEGLEITUNG | Fachplanung/Baubegleitung (Maßnahmengruppe 5.5) | Energetische Fachplanung/Baubegleitung im Zusammenhang mit förderfähiger Maßnahme; bei Baubegleitung: Energieeffizienz-Experte vorhabenbezogen unabhängig (§9.3) | Fachplanung/Baubegleitung gebucht (ja/nein), Kosten, Unabhängigkeit Energieeffizienz-Experte (ja/nein/unbekannt) | `foerderfaehig` (50 % Förderquote) wenn unabhängig UND Kosten ≤ Höchstgrenze; `manuell_pruefen` wenn Unabhängigkeit unklar (→ ggf. nur §8.4.1-Satz, keine separaten Fachplanungskosten) | BEG-EM-Richtlinie 21.12.2023, §5.5, §8.2b, §8.3.1b, §8.4.7, §9.3 | 21.12.2023 | niedrig | Höchstgrenze: 5.000 €/Vorhaben bei EFH/ZFH, 2.000 €/WE bei MFH ≥3 WE, insgesamt max. 20.000 €. NWG: 5 €/m² Nettogrundfläche, max. 20.000 €. |
| BEG-EM-8.4.2-ISFP-BONUS | iSFP-Bonus für 5.1-Maßnahmen | iSFP vorhanden UND Maßnahme im iSFP enthalten (keine wesentliche Untererfüllung) UND Umsetzung innerhalb 15 Jahre nach iSFP-Erstellung; Bestätigung durch Energieeffizienz-Experten | iSFP vorhanden (ja/nein), Maßnahme im iSFP enthalten (ja/nein/unbekannt), Erstellungsdatum iSFP, Bestätigung Energieeffizienz-Experte | `foerderfaehig` (Bonus +5 pp, Gesamtquote 5.1 dann 20 %) wenn alle Bedingungen erfüllt; `wahrscheinlich_foerderfaehig` wenn iSFP vorhanden aber Enthalten-Status unbekannt; `nicht_foerderfaehig` (kein Bonus) wenn iSFP fehlt oder Frist abgelaufen | BEG-EM-Richtlinie 21.12.2023, §8.4.2, §9.2.4 | 21.12.2023 | niedrig | Übergangsregelung: auch BAFA-geförderte Vor-Ort-Beratungsberichte (kein iSFP) aus dem Zeitraum 01.07.2017-31.12.2020 sind zugelassen. Erhöht zugleich die Höchstgrenze 5.1/5.2/5.4 von 30.000 € auf 60.000 €/WE (§8.3.1a). |
| BEG-EM-8.3.1A-HOECHSTGRENZE-WG | Höchstgrenze förderfähige Ausgaben 5.1 (+5.2+5.4) je WE, Wohngebäude | Summe förderfähiger Ausgaben 5.1+5.2+5.4 pro WE und Kalenderjahr ≤ 30.000 € (60.000 € bei iSFP-Bonus oder Nicht-Antragsberechtigung EBW-iSFP) | Förderfähige Ausgaben 5.1/5.2/5.4 (Summe), Anzahl WE, iSFP-Bonus-Status | `foerderfaehig` (volle Kosten anrechenbar) wenn Summe ≤ Grenze; `manuell_pruefen` wenn Summe > Grenze (Kappung anzuwenden, ggf. mehrere Maßnahmen/Jahre zu verteilen) | BEG-EM-Richtlinie 21.12.2023, §8.3.1a | 21.12.2023 | niedrig | Gilt PRO GEBÄUDE UND KALENDERJAHR (unabhängig von Anzahl Anträge). Bei Maßnahmen, die nicht alle WE betreffen: anteilige Höchstgrenze. |
| BEG-EM-8.3.2A-HOECHSTGRENZE-NWG | Höchstgrenze förderfähige Ausgaben 5.1 (+5.2+5.4), Nichtwohngebäude | Summe förderfähiger Ausgaben 5.1+5.2+5.4 ≤ 500 €/m² Nettogrundfläche (thermisch konditioniertes Gebäudevolumen) | Förderfähige Ausgaben 5.1/5.2/5.4 (Summe), Nettogrundfläche | `foerderfaehig` wenn Summe ≤ Grenze; `manuell_pruefen` wenn Summe > Grenze | BEG-EM-Richtlinie 21.12.2023, §8.3.2a | 21.12.2023 | niedrig | Nicht Kern von MVP1 (WG-Fokus), aber für gemischt genutzte Gebäude relevant (§9.2.3). |
| BEG-EM-9.1-NACHWEIS-WAERMEBRUECKEN | Nachweis wärmebrückenreduzierte/luftdichte Ausführung | Für jede 5.1-Maßnahme erforderlich | Nachweisdokument vorhanden (ja/nein) | `manuell_pruefen` falls Nachweis fehlt – Förderfähigkeit selbst unverändert, aber Auszahlungsvoraussetzung fehlt | BEG-EM-Richtlinie 21.12.2023, Anlage TMA §1.1.1 | 21.12.2023 | niedrig | Nachweise: Bestätigung/Dokumentation Dämmaufbau bzw. U-Wert-Bestätigung bei Fenstern/Türen, Herstellernachweise (λ-Wert/U-Wert), Lüftungskonzept (bei luftdichtheitserhöhenden Maßnahmen), Rechnungen/Zahlungsnachweise. |

---

## Zusammenfassung: Was ist für MVP1 vollständig modellierbar?

| Baugruppe | Modellierbarkeit | Unsicherheit |
|---|---|---|
| Außenwand (Standard, Einblas/Kern, Sichtfachwerk) | vollständig | niedrig |
| Außenwand Baudenkmal/erhaltenswerte Bausubstanz | bedingt (Status-Nachweis nicht automatisierbar) | mittel |
| Dach (Schrägdach, Flachdach, Gaube, oberste Geschossdecke) | vollständig | niedrig |
| Dach Baudenkmal | bedingt ("höchstmögliche Dämmstoffdicke" nicht quantifiziert) | hoch |
| Kellerdecke/Bodenflächen/Wände gegen Erdreich | vollständig (Standardfälle); Sonderfälle (hinterlüftete Fassade, Gefälledämmung) `manuell_pruefen` | niedrig/mittel |
| Fenster/Balkon-/Terrassentüren (Standard, Ertüchtigung, barrierearm/einbruchhemmend) | vollständig (U-Wert), funktionale Zusatzkriterien teils `manuell_pruefen` | niedrig/mittel |
| Fenster mit Sonderverglasung | bedingt (Pflichtgrundlage Einzelfall, Verbindung zu GEG-Register) | hoch |
| Fenster Baudenkmal (inkl. Sprossen, Ertüchtigung) | bedingt (Status-Nachweis) | mittel |
| Dachflächenfenster/Glasdach/Lichtband/Lichtkuppel | vollständig (U-Wert), Bauteilabgrenzung teils `manuell_pruefen` | niedrig/mittel |
| Außentüren/Hauseingangstüren | vollständig | niedrig |
| Vorhangfassade | vollständig (Standard), Denkmal `manuell_pruefen` | niedrig/mittel |
| Sommerlicher Wärmeschutz | vollständig | niedrig |
| Fachplanung/Baubegleitung (5.5) | vollständig (Förderquote/Höchstgrenze), Unabhängigkeitsprüfung Experte `manuell_pruefen` | niedrig/mittel |
| iSFP-Bonus | vollständig regelseitig abbildbar, inhaltliche "Enthalten im iSFP"-Prüfung bleibt manuell | niedrig |
| Höchstgrenzen (WG/NWG, Kappung bei mehreren Maßnahmen) | vollständig (Formel), Kappungsfälle bei Überschreitung `manuell_pruefen` | niedrig |

**Fazit**: MVP1 Gebäudehülle ist zu ca. 80-85 % regelseitig mit Unsicherheitsgrad
"niedrig" modellierbar (alle Standard-U-Wert-Vergleiche + Förderquoten + Höchstgrenzen +
iSFP-Bonus). Die verbleibenden 15-20 % betreffen Sonderfälle (Baudenkmal/erhaltenswerte
Bausubstanz, Sonderverglasung, funktionale Zusatzkriterien, Bauteilabgrenzungen) und
münden konsequent in `manuell_pruefen` mit erläuterndem Nutzerhinweis – kein
"Silent Fallback" auf `foerderfaehig`.

---

*Erstellt im Rahmen der Vorbereitung „Förderrechner BEG" (Aufgabe 5). Keine App-Änderung,
kein Commit/Push gemäß Auftrag.*
