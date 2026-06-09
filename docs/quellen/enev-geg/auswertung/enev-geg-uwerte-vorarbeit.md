# Vorarbeit: Gesetzliche U-Wert-Anforderungen bei Sanierung/Änderung von Außenbauteilen

Stand: 2026-06-09 | Kontext: Heizlastmodul Gebäudeaufnahme-App  
Bearbeitung: Quellen- und Dokumentationsagent  
Status: Vorarbeit abgeschlossen – keine App-Integration

---

## Ziel

Belastbare Quellen für die gesetzlichen U-Wert-Anforderungen bei **Änderung von Außenbauteilen**
bestehender Gebäude nach EnEV (2002–2016) und GEG (ab 2020) zusammenstellen und auswerten.

Diese Vorarbeit soll später ermöglichen, in der App einem erfassten Sanierungsjahr den gesetzlich
damals gültigen Mindest-U-Wert zuzuordnen.

---

## Abgegrenzte Zeiträume und Zuordnung zu Regelwerken

| Zeitraum | Regelwerk | Anlage | Anmerkung |
|----------|-----------|--------|-----------|
| 01.02.2002 – 07.12.2004 | EnEV 2002 | Anlage 3 | BGBl. I 2001, S. 3085 |
| 08.12.2004 – 30.09.2007 | EnEV 2004 | Anlage 3 | BGBl. I 2004, S. 3144. Anlage 3 unverändert ggü. 2002. |
| 01.10.2007 – 30.09.2009 | EnEV 2007 | Anlage 3 | BGBl. I 2007, S. 1519. Anlage 3 unverändert ggü. 2002. |
| 01.10.2009 – 30.04.2014 | EnEV 2009 | Anlage 3 | BGBl. I 2009, S. 954. ERHEBLICHE VERSCHÄRFUNG. |
| 01.05.2014 – 31.12.2015 | EnEV 2013 | Anlage 3 | BGBl. I 2013, S. 3951. Außentüren verschärft. |
| 01.01.2016 – 31.10.2020 | EnEV 2016 | Anlage 3 | BGBl. I 2015, S. 1789. Anlage 3 UNVERÄNDERT ggü. 2013. |
| ab 01.11.2020 | GEG 2020/2023/2026 | Anlage 7 | BGBl. I 2020, S. 1728. Werte identisch EnEV 2013/2016. Anlage 7 in keiner Novelle geändert (geprüft bis 09.01.2026). |

**Vereinfachung für die Praxis:** Drei relevante Perioden mit unterschiedlichen Werten:
1. **Periode A:** 01.02.2002 – 30.09.2009 (EnEV 2002/2004/2007 – gleiche Tabellenwerte)
2. **Periode B:** 01.10.2009 – 30.04.2014 (EnEV 2009 – erheblich verschärft)
3. **Periode C:** ab 01.05.2014 (EnEV 2013/2016/GEG – Außentüren auf 1,8; sonst wie B)

---

## Strukturierte Übernahmetabelle

> **Kontext ausschließlich:** Änderung/Sanierung/Ersatz/Ersteinbau von Außenbauteilen in
> **bestehenden Gebäuden** nach EnEV Anlage 3 / GEG Anlage 7. Keine Neubauanforderungen.

| Zeitraum | Regelwerk | Anlage | Bauteil | Umax / Anforderung [W/(m²K)] ≥19 °C | Umax 12–<19 °C | Kontext | Quelle / Fundstelle | Sicherheit |
|----------|-----------|--------|---------|--------------------------------------|----------------|---------|---------------------|------------|
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 1a | Außenwand: Ersatz, Ersteinbau, innenseitige Maßnahmen | **0,45** | 0,75 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002; BGBl. I 2001, S. 3085 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 1b | Außenwand: Bekleidungen, Vorsatzschalen, Dämmschichten außen | **0,35** | 0,75 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 2a | Fenster / Fenstertüren (Uw) | **1,70** | 2,80 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 2b | Dachflächenfenster (Uw) | **1,70** | 2,80 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2007 (keine sep. Zeile 2002) | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 4a | Dachflächen, Decken gegen Dachraum, oberste Geschossdecke (opak) | **0,30** | 0,40 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 4b | Flachdach / Dach mit Abdichtung | **0,25** | 0,40 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 5a | Wände/Decken gegen Erdreich oder unbeheizte Räume | **0,40** | keine | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 5b | Fußbodenaufbauten auf beheizter Seite | **0,50** | keine | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Zeile 5c | Decken nach unten an Außenluft | **0,30** | 0,40 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2007 | hoch |
| Periode A 2002–2009 | EnEV 2002/2004/2007 | Anlage 3, Nr. 3 (Fließtext) | Außentüren (Türfläche) | **2,9** | 2,9 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2002 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 1 | Außenwand (alle Maßnahmen) | **0,24** | 0,35 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009; BGBl. I 2009, S. 954 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 2a | Fenster / Fenstertüren (Uw) | **1,30** | 1,90 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 2b | Dachflächenfenster (Uw) | **1,40** | 1,90 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 4a | Dachflächen, Decken/Wände gegen Dachraum, oberste Geschossdecke | **0,24** | 0,35 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 4b | Flachdach / Dach mit Abdichtung | **0,20** | 0,35 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 5a | Wände/Decken gegen Erdreich oder unbeheizte Räume | **0,30** | keine | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 5b | Fußbodenaufbauten auf beheizter Seite | **0,50** | keine | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Zeile 5c | Decken nach unten an Außenluft | **0,24** | 0,35 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode B 2009–2014 | EnEV 2009 | Anlage 3, Nr. 3 (Fließtext) | Außentüren (Türfläche) | **2,9** | 2,9 | Sanierung § 9 EnEV | BBSR-Lesefassung EnEV 2009 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 1a | Außenwand: Ersatz oder Ersteinbau | **0,24** | 0,35 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; gesetze-im-internet.de GEG 2020; BGBl. I 2013, S. 3951 / BGBl. I 2020, S. 1783 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 1b | Außenwand: Bekleidungen, Vorsatzschalen, Dämmschichten außen | **0,24** | 0,35 | Sanierung § 9 EnEV / § 48 GEG | wie oben | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 2a | Fenster / Fenstertüren (Uw) | **1,3** | 1,9 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 2b | Dachflächenfenster (Uw) | **1,4** | 1,9 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 5a | Dachflächen, Decken/Wände gegen Dachraum, oberste Geschossdecke (opak) | **0,24** | 0,35 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 5c | Flachdach / Dach mit Abdichtung | **0,20** | 0,35 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 6a | Wände/Decken gegen Erdreich oder unbeheizte Räume (Ersatz/Ersteinbau) | **0,30** | keine | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 6c | Fußbodenaufbauten auf beheizter Seite | **0,50** | keine | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 6d/6e | Decken nach unten an Außenluft | **0,24** | 0,35 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |
| Periode C ab 2014 | EnEV 2013/2016, GEG 2020 ff. | Anlage 3/7, Nr. 4 | Außentüren (Türfläche, ohne rahmenlose Glastüren, Karusselltüren, kraftbetätigt) | **1,8** | 1,8 | Sanierung § 9 EnEV / § 48 GEG | BMWK-Lesefassung EnEV 2013; GEG Anlage 7 | hoch |

> **Querverweis GEG-Spalten:** Für GEG Periode C gelten die identischen Werte. Die GEG-Anlage 7-Nummern
> weichen von EnEV-2013-Anlage-3-Zeilennummern ab; inhaltlich aber gleich. Details in
> `markdown/geg-2020-anlage7-lesefassung.md`.

---

## Wichtige Warnhinweise und Abgrenzungen

### 1. Sanierungsanforderungen ≠ Neubauanforderungen

Diese Tabelle enthält **ausschließlich** die Anforderungen für die **Änderung von Außenbauteilen**
(Sanierung, Ersatz, erstmaliger Einbau) nach EnEV Anlage 3 / GEG Anlage 7.
Neubauanforderungen sind deutlich strenger und hier nicht enthalten.

### 2. Bestandserfahrungswerte (BAnz 2020) ≠ gesetzliche Mindeststandards

Die BAnz-Bekanntmachung AT 04.12.2020 B1 enthält Pauschalwerte für typische Bestandswerte
nach Baualtersklassen. Das ist **nicht**, was bei Sanierung vorgeschrieben ist. Beide Größen
dürfen nicht verwechselt oder vermischt werden.

### 3. 10-Prozent-Regel

Die Anforderungen greifen nur, wenn die Fläche der geänderten Bauteile mehr als **10 %** der
gesamten jeweiligen Bauteilfläche des Gebäudes betrifft (§ 11 Abs. 1 S. 3 EnEV / § 48 Abs. 1 S. 3 GEG).

### 4. Außentüren-Unterschied

Außentüren wurden erst mit EnEV 2013 (gültig ab 01.05.2014) von 2,9 auf **1,8 W/(m²K)** verschärft.
Sanierungsjahr vor 2014: 2,9 W/(m²K). Ab 2014: 1,8 W/(m²K).

### 5. Außenwand-Besonderheit Periode A

EnEV 2002–2009: Zwei Außenwand-Werte (0,45 allgemein / 0,35 für außenseitige Maßnahmen).
Ab EnEV 2009: Einheitlich 0,24 W/(m²K) für alle Außenwand-Maßnahmen.

### 6. Vorhangfassaden

In allen Zeiträumen geregelt, aber für typische Wohngebäude-Kategorien dieser App nicht relevant.

### 7. EnEV 2016 – nur Neubau betroffen

Die Novelle 2016 verschärfte ausschließlich den Neubau-Primärenergiestandard. Anlage 3 Tabelle 1
blieb unverändert gegenüber EnEV 2013.

### 8. GEG Anlage 7 unverändert seit 2020 (verifiziert)

Anlage 7 wurde in keiner GEG-Novelle (Osterpaket 2022, Heizungsgesetz 2023, Novelle 2026)
geändert. Detaillierter Nachweis in `markdown/geg-anlage7-aenderungen-2023-2024.md`.

---

## Entscheidungsvorlage für App-Übernahme

> **Status:** Vorarbeit abgeschlossen. Die folgende Einschätzung ist ausschließlich für die
> interne Entscheidungsfindung gedacht. Keine Rechtsberatung, keine Aussage „rechtssicher".

### Kernergebnis

Die gesetzlichen U-Wert-Anforderungen bei Sanierung lassen sich auf **drei Perioden** reduzieren,
die mit je einer Tabellenspalte in der App abgebildet werden können. Die Quellenlage ist
für alle Perioden durch offizielle Bundesbehörden-Lesefassungen belegt.

### Entscheidungsmatrix: Welche Werte können übernommen werden?

| Bauteil | Periode A (2002–2009) | Periode B (2009–2014) | Periode C (ab 2014) | Übernahme empfohlen? | Begründung |
|---------|----------------------|----------------------|---------------------|----------------------|------------|
| Außenwand (allgemein) | 0,45 | 0,24 | 0,24 | **Ja** | Alle drei Werte aus BBSR/BMWK-Lesefassungen eindeutig extrahiert |
| Außenwand (außenseitige Maßnahmen) | 0,35 | 0,24 | 0,24 | **Ja** | Wie oben; Periodenunterschied A beachten |
| Fenster / Fenstertüren (Uw) | 1,70 | 1,30 | 1,30 | **Ja** | Eindeutig, alle Perioden belegt |
| Dachflächenfenster (Uw) | 1,70 | 1,40 | 1,40 | **Ja** | Wie Fenster |
| Dach / Decken gegen Dachraum (opak) | 0,30 | 0,24 | 0,24 | **Ja** | Eindeutig, alle Perioden belegt |
| Flachdach / Abdichtung | 0,25 | 0,20 | 0,20 | **Ja** | Eindeutig, alle Perioden belegt |
| Wände/Decken gegen unbeheizte Räume | 0,40 | 0,30 | 0,30 | **Ja** | Eindeutig, alle Perioden belegt |
| Fußbodenaufbauten (beheizt) | 0,50 | 0,50 | 0,50 | **Ja** | Unverändert über alle Perioden |
| Decken nach unten an Außenluft | 0,30 | 0,24 | 0,24 | **Ja** | Eindeutig, alle Perioden belegt |
| Außentüren | 2,9 | 2,9 | **1,8** | **Ja** | Verschärfung ab 01.05.2014 eindeutig dokumentiert |

### Bedingungen für eine App-Übernahme

Folgende Voraussetzungen sollten vor App-Integration erfüllt sein:

1. **Quellenangabe in der UI:** Wenn Werte angezeigt werden, muss ersichtlich sein: Regelwerk,
   Anlage, Zeitraum. Kein Wert ohne Fundstelle.

2. **10-Prozent-Regel kommunizieren:** Die Anforderungen gelten nicht für Kleinstmaßnahmen
   (< 10 % der Bauteilfläche). Die App muss diesen Kontext transportieren oder den Nutzer warnen.

3. **Keine Vermischung mit Bestandswerten:** Die Anlage-3/7-Werte nicht zusammen mit den
   BAnz-2020-Erfahrungswerten in einer UI-Komponente anzeigen ohne klare Unterscheidung.

4. **Neubau-Abgrenzung:** Falls die App auch Neubau-Szenarien abbildet, müssen die
   Kategorien klar getrennt sein. Die hier dokumentierten Werte gelten nur für Änderungen/Sanierung.

5. **Außenwand Periode A:** Die zwei Werte (0,45 / 0,35) für verschiedene Maßnahmenarten
   in Periode A erfordern eine Fallunterscheidung in der App-Logik.

6. **Kein „rechtssicher":** Die App darf nicht behaupten, dass eingehaltene Werte „rechtssicher"
   sind. Formulierungsvorschlag: „entspricht dem gesetzlichen Höchstwert nach EnEV/GEG bei
   Bauteiländerung (§ 9 EnEV / § 48 GEG), Stand [Periode]."

### Nicht empfohlene Übernahmen

| Wert / Kategorie | Begründung für Nicht-Übernahme |
|-----------------|-------------------------------|
| Vorhangfassaden (Uc) | Spezialfall, für Wohngebäude-Standarderfassung nicht relevant |
| Glasdächer | Spezialfall; kaum praxisrelevant für typische Wohngebäudeaufnahme |
| Sonderverglasungen | Spezialfall (Schallschutz, Einbruchhemmung, Brandschutz); eigene Anforderungszeilen |
| Werte vor 2002 | Keine gesetzliche Normierung für diesen Zweck; BAnz-Erfahrungswerte separat |
| BEG-/Förderanforderungen | Außerhalb des Scope dieser Auswertung |

---

## Offene Punkte (Stand 2026-06-09)

| Punkt | Priorität | Status | Beschreibung |
|-------|-----------|--------|--------------|
| BGBl-Originale EnEV (2002/2007/2009/2013) | mittel | offen | Nicht frei zugänglich; BBSR/BMWK-Lesefassungen verwendet. Für App-Zwecke ausreichend. |
| Innendämmungsbesonderheit EnEV 2009 | niedrig | offen | EnEV 2009 hat Sonderregel für innenseitige Dämmung: Umax = 0,35 W/(m²K) statt 0,24, wenn Schichtdicke aus technischen Gründen begrenzt. Relevant für App-Logik klären. |
| GEG 2023/2024 Anlage 7 | — | **abgeschlossen** | Anlage 7 in keiner GEG-Novelle geändert. Nachweis in `markdown/geg-anlage7-aenderungen-2023-2024.md`. |
| GEG 2026-Änderung (BGBl. 2026 I Nr. 4) | niedrig | offen | Inhalt der 2026-Änderung nicht vollständig bekannt; Anlage 7 per gesetze-im-internet.de-Konsolidierung als unverändert bestätigt. |

---

*Erstellt: 2026-06-09 – Quellen- und Dokumentationsagent (Claude Sonnet 4.6)*  
*Basis: BBSR-Lesefassungen (EnEV 2002/2007/2009), BMWK-Lesefassung (EnEV 2013),*
*GEG gesetze-im-internet.de (konsolidiert bis 09.01.2026), BBSR-Lesefassung GEG 2023*  
*Alle Werte aus lokalen Textextraktionen der heruntergeladenen PDFs verifiziert.*
