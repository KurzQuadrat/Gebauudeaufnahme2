# Regelmodell BEG-Förderrechner (fachliches Modell, kein Code)

Letzte Aktualisierung: 2026-06-10

---

## Vorbemerkung

Dieses Dokument beschreibt ein **fachliches Datenmodell** für ein zukünftiges
BEG-Förderrechner-Modul. Es enthält **keine Implementierung** und **keine
abschließende Aussage zur Förderfähigkeit konkreter Fälle**. Es dient als
Grundlage für eine spätere, getrennte Modul-Entwicklung (siehe
`foerderrechner-konzept.md`).

Strikte Trennung (lt. Auftrag):
- **Heizlast/U-Wert-Bestand** → bestehende Erfassungslogik der App (NICHT Teil dieses Modells)
- **GEG-Mindestanforderungen** → `docs/quellen/enev-geg/` (separates Quellenregister)
- **BEG-Förderfähigkeit/Zuschüsse** → dieses Dokument

---

## 1. Eingabedaten (fachliches Datenmodell)

| # | Feld | Beispielwerte / Typ | Bemerkung |
|---|---|---|---|
| 1 | Gebäudetyp | Einfamilienhaus, Zweifamilienhaus, Mehrfamilienhaus, Nichtwohngebäude | bestimmt WG/NWG-Zweig |
| 2 | WG/NWG | Wohngebäude / Nichtwohngebäude | gem. §3 Abs. 1 Nr. 33 GEG, steuert Höchstgrenzen-Logik |
| 3 | Anzahl Wohneinheiten (WE) | Zahl ≥ 1 | für Höchstgrenzen 5.1/5.2/5.4 (€/WE) und 5.3 (gestaffelt) |
| 4 | Baujahr / Datum Bauantrag | Datum | für Bestandsgebäude-Definition (§3 Bst. b: Bauantrag ≥ 5 Jahre zurückliegend) |
| 5 | Eigentümer-/Nutzungsart | selbstnutzender Eigentümer, vermietender Eigentümer, Wohnungseigentümergemeinschaft, Contractor, Unternehmen, Kommune, ... | beeinflusst Antragsberechtigung (§6) und Einkommensbonus (nur selbstnutzend) |
| 6 | Maßnahmentyp | Einzelmaßnahme (BEG EM) / Effizienzhaus-Sanierung (BEG WG) / Effizienzgebäude (BEG NWG) | bestimmt grundsätzlichen Förderpfad |
| 7 | Bauteil/Maßnahmengruppe | Außenwand, Dach, Fenster/Außentüren, Kellerdecke/Bodenfläche, Vorhangfassade, Tor, Lüftung, Smart Home, MSR, Kälte, Wärmeerzeuger (a–j), Heizungsoptimierung (a/b), Fachplanung/Baubegleitung, sommerlicher Wärmeschutz | Schlüssel für Zuordnung zu §5-Maßnahmengruppe und TMA-Abschnitt |
| 8 | Investitionskosten brutto | € | Ausgangsgröße für Wirtschaftlichkeit, NICHT identisch mit förderfähigen Kosten |
| 9 | Investitionskosten netto | € | bei Vorsteuerabzugsberechtigung relevant |
| 10 | Förderfähige Kosten | € | nach Abzug nicht förderfähiger Positionen (Infoblatt §9), ggf. gedeckelt durch Höchstgrenzen |
| 11 | iSFP vorhanden | ja/nein | Voraussetzung für iSFP-Bonus |
| 12 | Maßnahme im iSFP enthalten | ja/nein/unbekannt | zusätzliche Voraussetzung für iSFP-Bonus (§8.4.2), Frist 15 Jahre seit Erstellung |
| 13 | Technischer Zielwert (z. B. U-Wert geplant) | W/(m²K) bzw. λ-Wert | Abgleich gegen TMA-Tabelle (§1.1 Anlage) |
| 14 | Heizungstyp (bei 5.3) | Wärmepumpe, Biomasse, Solarthermie, Brennstoffzelle, Wasserstoff-Heizung, Gebäudenetz, Wärmenetzanschluss, provisorische Heiztechnik, ... | bestimmt Bonus-Logik (Effizienzbonus, Emissionsminderungszuschlag) und Fördergeber-Zuständigkeit |
| 15 | Erneuerbare Energien | Art/Anteil | gem. §3 Abs. 2 GEG, relevant für Wärmeerzeuger-Förderung |
| 16 | Antragsteller | natürliche Person, Unternehmen, Kommune, ... | Kommune → höhere Kumulierungsgrenze (90 % statt 60 %) |
| 17 | Eigenleistung | ja/nein, Materialkostenanteil | Eigenleistung i. d. R. nur Materialkosten förderfähig (Detailregel separat zu prüfen, NICHT abschließend modelliert) |
| 18 | Vorhabensbeginn / Status Angebot/Vertrag/Bewilligung | Datum, Status | kritisch: Antrag muss VOR Vorhabensbeginn gestellt sein (§9.2.1); Planungs-/Beratungsleistungen vor Antragstellung unschädlich |
| 19 | Fachplanung/Baubegleitung gebucht | ja/nein, Kosten | eigene Maßnahmengruppe 5.5, Höchstgrenze separat |
| 20 | Kombination mehrerer Maßnahmen | Liste von Maßnahmengruppen | für Kumulierungs- und Höchstgrenzen-Prüfung über mehrere Bauteile/Gewerke |

---

## 2. Entscheidungsbaum pro Maßnahmengruppe

Allgemeines Schema (gilt für jede Maßnahmengruppe gleich, Reihenfolge ist
fachlich sinnvoll, NICHT als Code-Kontrollfluss zu verstehen):

```
1. Fördergeber bestimmen
   → BAFA oder KfW (abhängig von Maßnahmengruppe, s. Tabelle unten)
   → bei 5.3: Sonderfall g (Gebäudenetz-Errichtung/Umbau) = BAFA, a-f/h-j = KfW

2. Förderfähigkeit prüfen (Grundvoraussetzungen)
   → Antragsteller antragsberechtigt? (§6.2 Ausschlüsse: Bund/Länder, Parteien,
     Mieter bei 5.3 außer g, Insolvenz)
   → Bestandsgebäude-Kriterium erfüllt (Bauantrag ≥ 5 Jahre)?
   → Mindestinvestitionsvolumen erreicht (5.1-5.4: 300 € brutto)?
   → Maßnahme grundsätzlich förderfähig lt. §5 / Infoblatt §1-§8?
   → Ausschlussliste Infoblatt §9 geprüft (z. B. Gas-/Ölheizungen, bestimmte
     Sonnenschutzvorrichtungen)?

3. Technische Mindestanforderungen (TMA) prüfen
   → Bauteilspezifischer U-Wert/λ-Wert/Kennwert aus Anlage TMA §1 (Gebäudehülle)
     bzw. §2 (Anlagentechnik) bzw. §3/§4 (Wärmeerzeuger/Heizungsoptimierung,
     NICHT vollständig extrahiert) erreicht?
   → bei Sonderfällen (Baudenkmal, Sichtfachwerk, Sonderverglasung) abweichende
     TMA-Werte berücksichtigen

4. Zuschussquote ermitteln
   → Grundförderung je Maßnahmengruppe (§8.1)
   → ggf. Boni: iSFP-Bonus (+5pp, Schritt 5), Klimageschwindigkeits-Bonus,
     Einkommens-Bonus, Effizienzbonus (nur 5.3)
   → Kappung Gesamtfördersatz bei 70 %

5. iSFP-Bonus-Prüfung
   → iSFP vorhanden UND Maßnahme dort enthalten UND Umsetzung innerhalb 15 Jahre
     nach Erstellung (ggf. Übergangsregelung 01.07.2017-31.12.2020)?
   → Ausnahme: 5.3, 5.4b, 5.5 → kein iSFP-Bonus

6. Fachplanung/Baubegleitung-Prüfung
   → grundsätzlich förderfähig (50 %), eigene Höchstgrenze (5.5)
   → ggf. Pflicht zur Einbindung Energieeffizienz-Experte (abhängig von
     Maßnahmengruppe, §9.3 – nicht abschließend modelliert)

7. Höchstgrenzen anwenden
   → je Maßnahmengruppe und WG/NWG unterschiedliche €-Grenzen je WE bzw. je m²
     Nettogrundfläche (vgl. §8.2)
   → bei mehreren Maßnahmen: Summe je Maßnahmengruppe gegen Höchstgrenze prüfen

8. Ausschlüsse/Sonderregeln
   → Kumulierungsverbot (§8.6): Gesamtförderquote öffentlicher Mittel ≤ 60 %
     (90 % bei kommunalen Antragstellern), kein Doppelantrag KfW/BAFA für
     gleiche Ausgaben, kein Parallelbezug §35a/§35c EStG
   → 10-Jahres-Nutzungspflicht (§7) bei Veräußerung beachten

9. Nachweise bestimmen
   → bauteilspezifische Nachweise (z. B. Wärmebrücken-/Luftdichtheitsnachweis,
     Herstellernachweise U-Wert, Rechnungen)
   → Fachunternehmererklärung vs. Energieeffizienz-Experten-Bestätigung
   → Verwendungsnachweis-Frist (6 Monate nach Vorhabensabschluss),
     Bewilligungszeitraum 36 Monate

10. Ergebnisstatus ableiten (siehe Abschnitt 3)
```

### Zuständigkeits-Übersicht (Fördergeber je Maßnahmengruppe)

| Maßnahmengruppe | Fördergeber Zuschuss | Fördergeber Kredit |
|---|---|---|
| 5.1 Gebäudehülle | BAFA | KfW |
| 5.2 Anlagentechnik außer Heizung | BAFA | KfW |
| 5.3 a-f, h-j (Wärmeerzeuger, außer Gebäudenetz-Errichtung) | KfW | KfW |
| 5.3 g (Gebäudenetz Errichtung/Umbau) | BAFA | KfW |
| 5.4 a/b Heizungsoptimierung | BAFA | KfW |
| 5.5 Fachplanung/Baubegleitung | BAFA | – |

---

## 3. Ergebnisstatus

Festgelegtes, abschließendes Set von Statuswerten (Enum):

| Status | Bedeutung |
|---|---|
| `foerderfaehig` | Alle geprüften Bedingungen erfüllt, keine offenen/unbewertbaren Kriterien |
| `nicht_foerderfaehig` | Mindestens ein Ausschlusskriterium eindeutig erfüllt (z. B. Gasheizung, fehlende Antragsberechtigung) |
| `wahrscheinlich_foerderfaehig` | Kernkriterien erfüllt, aber mindestens ein Kriterium nicht abschließend prüfbar (z. B. TMA-Wert nicht final nachgewiesen) |
| `manuell_pruefen` | Komplexer/uneindeutiger Fall, der über reine Regelanwendung hinausgeht (z. B. Kombination mehrerer Maßnahmen mit Höchstgrenzen-Konflikt, Sonderfälle Baudenkmal) |
| `nicht_bewertbar` | Eingabedaten unvollständig oder Regelgrundlage für diese Konstellation fehlt im Modul |

**Wichtig**: `foerderfaehig` darf NIE eine rechtsverbindliche Förderzusage
implizieren – immer mit Hinweistext "vorbehaltlich Prüfung durch BAFA/KfW und
Bewilligung" auszugeben.

---

## 4. Regelmetadaten (pro Einzelregel)

Jede Regel im späteren Regelwerk sollte folgende Metadaten tragen:

| Feld | Beschreibung | Beispiel |
|---|---|---|
| `ruleId` | eindeutige ID | `BEG-EM-5.1-UWERT-AUSSENWAND` |
| Quelle | Dokument + Abschnitt | "BEG EM Richtlinie 21.12.2023, Anlage TMA §1.1" |
| Stand/Gültig ab | Datum | "21.12.2023, gültig ab 01.01.2024" |
| Fördergeber | BAFA / KfW | "BAFA" |
| Programm | BEG EM / BEG WG / BEG NWG / KfW 458 / ... | "BEG EM" |
| Maßnahmengruppe | gem. §5 | "5.1 Gebäudehülle – Außenwand" |
| Bedingung | maschinenlesbare/-nahe Beschreibung | "U-Wert_geplant ≤ 0,20 W/(m²K)" |
| Ergebnis | Auswirkung bei Erfüllung/Nichterfüllung | "TMA erfüllt → Fördervoraussetzung TMA = true" |
| Unsicherheitsgrad | hoch/mittel/niedrig | "niedrig (direkt aus Anlage TMA)" |
| Hinweistext | für Endnutzer/Berater | "Wert gilt für WG und NWG ≥19°C; abweichende Werte für NWG 12-<19°C, Baudenkmal, Sichtfachwerk siehe Sonderzeilen" |

---

## 5. Technische Mindestanforderungen Wärmeerzeugung und Heizungsoptimierung (Anlage TMA §3/§4)

**Wichtiger Hinweis vorab**: Diese Maßnahmengruppe (5.3 Wärmeerzeugung) wird seit 01.01.2024
für die Zuschussförderung überwiegend von der **KfW** abgewickelt (Ausnahme: 5.3g
Gebäudenetz-Errichtung/Umbau = BAFA). Die hier ausgewerteten TMA §3/§4 stammen aus der
**BAFA/BMWE-Richtlinie vom 21.12.2023** und beschreiben die fachlich-technischen
Anforderungen, die der Förderung zugrunde liegen – sie ersetzen NICHT das KfW-Merkblatt 458,
das für die konkrete Antragstellung bei der KfW maßgeblich ist und in diesem Projekt noch
nicht vorliegt (siehe `quellenregister.md`). Eine vollständige Modellierung der
Förderfähigkeit für 5.3 ist daher **erst nach Beschaffung des KfW-Merkblatts 458 sinnvoll**.

Die folgenden TMA-Inhalte werden als **fachliche Vorbereitung** dokumentiert, NICHT als
fertiges Regelwerk für 5.3.

### 5.1 Übergreifende technische Mindestanforderungen (TMA §3.1, gilt für 3.2–3.9)

| Aspekt | Inhalt | Quelle |
|---|---|---|
| Heizlastermittlung | Auslegung der Anlage anhand Heizlastermittlung nach DIN EN 12831 (Vereinfachungen über VdZ-Bestätigungsformular möglich) | TMA §3.1 |
| Messtechnik | Energieverbrauch und erzeugte Wärmemengen müssen messtechnisch erfasst werden; Energieverbrauchs-/Effizienzanzeige Pflicht (Ausnahmen: Biomasse nur Wärmemengen, keine Effizienzanzeigepflicht; Wärme-/Gebäudenetzanschluss keine Pflicht) | TMA §3.1 |
| Hydraulischer Abgleich | Verfahren B nach VdZ-Bestätigungsformular Pflicht; bei luftgeführten Systemen Anpassung Luftvolumenströme | TMA §3.1 |
| Rohrleitungsdämmung | mindestens nach geltendem GEG | TMA §3.1 |
| Heizkurve | Anpassung an Gebäude Pflicht | TMA §3.1 |
| Internetanbindung | bei verfügbarer Verbindung/Schnittstelle Pflicht zur Vernetzung | TMA §3.1 |
| 65 %-EE-Pflicht | bei Biomasse, Wärmepumpen, Brennstoffzellen, Wasserstoff-Heizungen, innovativer Heiztechnik (auch bivalent): versorgte WE/Flächen müssen nach Maßnahme zu ≥65 % durch erneuerbare Energien beheizt werden | TMA §3.1 |
| Wärmenetz-Vorrang | in Gebieten mit Anschluss-/Benutzungszwang für Wärmenetz: nur Anschluss (TMA 3.9) förderfähig, keine Einzelheizungen (3.2-3.8) | TMA §3.1 |

### 5.2 Maßnahmengruppen 5.3 a–j im Überblick (TMA §3.2–§3.9)

| TMA-Nr. | Maßnahme | Kernanforderungen (Auszug) | Fördergeber | Nachweise (Auszug) |
|---|---|---|---|---|
| 3.2 | Solarthermische Anlagen | Solar-Keymark-Zertifizierung (ISO 17025); Jahreskollektorertrag QkOl ≥ 525 kWh/m² (flüssigkeitsdurchströmt); Funktionskontrollgerät Pflicht; ab bestimmter Kollektorgröße Ertragserfassung | KfW (Zuschuss) | Fachunternehmererklärung, hydraulischer Abgleich, Solar-Keymark-Zertifikat+Prüfbericht, Herstellernachweise |
| 3.3 | Biomasseheizungen | Kessel/Pelletöfen/Scheitholzvergaser/Kombikessel gem. Detailspezifikation (automatische Beschickung, Pufferspeicher ≥30-55 l/kW, Prüfung nach EN 303-5/EN 14785); Jahresnutzungsgrad ηs ≥81 %; Emissionsgrenzwerte CO 200/250 mg/m³, Staub 2,5 mg/m³ bei Emissionsminderungs-Zuschlag (sonst lt. 1. BImSchV, Evaluation BEG/GEG 2026 vorbehalten); NICHT gefördert: luftgeführte Pelletöfen, handbeschickte Einzelöfen, bestimmte Abfallverbrennung | KfW (Zuschuss) | Fachunternehmererklärung, hydraulischer Abgleich, Prüfbericht EN 303-5/EN 14785, ggf. Emissionsprüfbericht |
| 3.4 | Elektrisch angetriebene Wärmepumpen | nicht gasbetrieben, nicht Raumluft als alleinige Quelle (außer Sonderfälle); Zertifizierung nach EN 14511/EN 14825 (ISO 17025); ηs-Mindestwerte gestaffelt nach Wärmequelle (Luft 145%/125%, Erdwärme/Wasser/Sonstige 180%/140% bei 35°C/55°C); Luft-Luft-Sonderwerte (≤12kW: ηs≥181% + Effizienzklasse A++/A+++; >12kW: ηs,h≥150%); **Netzdienlichkeit Pflicht ab 01.01.2025** (SG Ready/VHP Ready); **ab 01.01.2028 nur natürliche Kältemittel** (R290, R600a, R1270, R717, R718, R744); **Geräuschemissionen**: ab sofort -5dB ggü. EU 813/2013, **ab 01.01.2026 -10dB**; JAZ ≥3,0 (VDI 4650); bei Erdwärmesondenbohrung: DVGW W120-2-zertifizierte Bohrfirma + Versicherung | KfW (Zuschuss) | Fachunternehmererklärung, hydraulischer Abgleich, JAZ-Nachweis (VDI 4650), Prüfzertifikat, Herstellernachweis Netzdienlichkeit, ggf. DVGW-Zertifikat+Versicherungsschein |
| 3.5 | Brennstoffzellenheizungen | nur grüner/blauer Wasserstoff (§3 Abs.1 GEG) oder Biomethan; Elektrolyseur-Kosten NICHT förderfähig; Gesamtwirkungsgrad ≥0,82, elektrischer Wirkungsgrad ≥0,32 bei Inbetriebnahme; Vollwartung ≥10 Jahre mit Garantie ηel≥0,26 | KfW (Zuschuss) | Fachunternehmererklärung, hydraulischer Abgleich, Herstellernachweise |
| 3.6 | Wasserstofffähige Heizungsanlagen | gefördert werden Investitionsmehrausgaben ggü. nicht-wasserstofffähiger Heizung; 100% wasserstoffbetreibbar bei Inbetriebnahme oder durch geringinvestive Maßnahmen; Fristen/Anforderungen gem. §71k GEG bei noch fehlender H2-Belieferung; ηs ≥92% (≤70kW) bzw. 87%/96% (>70kW), Nachweis im Erdgas-/Biomethanbetrieb | KfW (Zuschuss) | Fachunternehmererklärung, hydraulischer Abgleich, Konformitätserklärung Hersteller, Investitionsmehrausgaben-Nachweis |
| 3.7 | Innovative Heiztechnik auf Basis erneuerbarer Energien | Anlagen außerhalb 3.2-3.6, EE-Anteil ≥80% der Gebäudeheizlast UND ≥80% der Nennleistung; nur Anlagen aus veröffentlichter Anlagenliste der Durchführer förderfähig | KfW (Zuschuss) | Heizlastberechnung + Nachweis EE-Anteil ≥80%, Fachunternehmererklärung, hydraulischer Abgleich |
| 3.8 | Errichtung/Umbau/Erweiterung Gebäudenetz | Wärmeerzeugung des Netzes nach Maßnahme zu ≥65% aus 3.2-3.7 und/oder unvermeidbarer Abwärme; förderfähige Komponenten: Wärmeverteilung, ggf. Erzeugung/Speicherung/MSR/Übergabestationen; bei Biomasse+Klimageschwindigkeitsbonus: Kombinationspflicht mit Solarthermie/PV-Strom-WW/Wärmepumpe (Alternative: ≥25% EE-Anteil aus 3.2/3.4/Abwärme); Mess-/Effizienzanzeigepflicht (Biomasse: ab 01.01.2025) | **BAFA** (Zuschuss, Sonderfall 5.3g) | Bilanzierung n. DIN V 18599 / AGFW FW 309-5+7, Bestätigung Energieeffizienz-Experte, Bestätigung EEE-Liste |
| 3.9 | Anschluss an Gebäude-/Wärmenetz | Anschluss förderfähig, wenn Netz-Wärmeerzeugung zu ≥25% aus EE und/oder unvermeidbarer Abwärme erfolgt (bei Wärmenetz keine 25%-Schwelle explizit genannt – **zu prüfen**) | BAFA (bei Gebäudenetz) / KfW (sonst, lt. Zuständigkeitstabelle Abschnitt 2 – **abzugleichen**) | Bilanzierung n. DIN V 18599 / AGFW FW 309-5+7, Bestätigung Fachunternehmer |

### 5.3 Heizungsoptimierung (TMA §4, Maßnahmengruppe 5.4)

| TMA-Nr. | Maßnahme | Kernanforderungen | Fördergeber | Nachweise |
|---|---|---|---|---|
| §4.1 | Effizienzverbesserung Anlage (5.4a) | Heizungsanlage >2 Jahre alt (bei fossilen Brennstoffen <20 Jahre alt); hydraulischer Abgleich Verfahren B Pflicht (sofern nicht bereits abgeglichen); Pumpenanforderungen: Nassläufer-Umwälzpumpen EEI≤0,2, Trinkwarmwasser-Zirkulationspumpen EEI≤0,2, Trockenläufer-Umwälzpumpen IE4+MEI≥0,6; **NICHT förderfähig: Austausch/Einbau von Wärmeerzeugern** (das ist 5.3); auch geringinvestive Umstellung wasserstofffähiger Heizungen auf 100% H2-Betrieb förderfähig | BAFA | Fachunternehmererklärung (inkl. Bestätigung Luftvolumenströme bei Luftheizung), hydraulischer Abgleich, Herstellernachweise |
| §4.2 | Emissionsminderung Biomasse (5.4b) | Anlage zur Staubreduzierung an Feuerungsanlagen fester Biomasse ≥4 kW, >2 Jahre alt (außer Einzelraumfeuerungsanlagen); Reduzierung Staubemission ≥80% ggü. Ausgangswert; Einhaltung §25 Abs.1 i.V.m. §5 1.BImSchV-Grenzwerte, vorher bereits Stufe-1-Werte nach §5 1.BImSchV erfüllt | BAFA | Emissionsmessungen vor/nach Maßnahme, Fachunternehmererklärung |
| §4.3 | Allgemeine Nachweise Heizungsoptimierung | Herstellernachweise, Fachunternehmererklärung, bei 4.1: hydraulischer Abgleich, bei 4.2: Emissionsnachweise vor/nach | BAFA | s. o. |

### 5.4 Eingabefelder, die für 5.3/5.4 zusätzlich benötigt würden (vorbereitend, nicht final)

- Alter der bestehenden Heizungsanlage (Jahre) – für 5.4a Mindestalter-Prüfung
- Energieträger Bestandsheizung (Öl/Gas/Biomasse/Strom/Fernwärme) – für 5.4a Plausibilität und 5.3-Ausschlüsse
- Wärmequelle geplante Wärmepumpe (Luft/Erdwärme/Wasser/Sonstige) – für ηs-Anforderung
- Heizleistung geplante Wärmepumpe (kW) – für Schwellenwert 12 kW (Luft-Wärmepumpen)
- Kältemittel geplante Wärmepumpe – für Anforderung ab 2028
- Geplantes Inbetriebnahmedatum – für zeitlich gestaffelte Anforderungen (Netzdienlichkeit ab 2025, Schall ab 2026, Kältemittel ab 2028)
- EE-Deckungsanteil nach Maßnahme (%) – für 65%-Pflicht (TMA §3.1)
- Vorhandensein/Planung Gebäudenetz bzw. Wärmenetzanschluss – für Zuständigkeit BAFA vs. KfW (5.3g vs. 5.3a-f/h-j)

### 5.5 Ausschlüsse / Sonderbedingungen 5.3/5.4

- Gas-Wärmepumpen und Wärmepumpen mit Raumluft als alleiniger Wärmequelle: nicht förderfähig (Ausnahme Luft/Luft-Wärmepumpen mit Sonderanforderungen, TFAQ 8.21 – nicht ausgewertet)
- Heizungsoptimierung (5.4a) deckt NICHT den Austausch/Einbau von Wärmeerzeugern (Abgrenzung zu 5.3)
- Zeitlich gestaffelte Verschärfungen (Wärmepumpen): Netzdienlichkeit ab 01.01.2025, Geräuschemission ab 01.01.2026, Kältemittel ab 01.01.2028 – **Antragsdatum/Inbetriebnahmedatum entscheidet, welche Fassung gilt**
- Emissionsgrenzwert Staub 2,5 mg/m³ nur bei Inanspruchnahme des Emissionsminderungs-Zuschlags (§8.4.6) – sonst gelten reguläre 1.BImSchV-Werte, vorbehaltlich Evaluation 2026

### 5.6 Unsicherheiten / offene Prüfpunkte (TMA §3/§4)

- **KfW-Merkblatt 458 liegt jetzt vor** (Stand 12/2025, gültig ab 10.12.2025, `text/kfw-merkblatt-458.txt`). Es bestätigt: Rechtsgrundlage bleibt die BAFA/BMWE-Richtlinie vom 21.12.2023 inkl. TMA – **keine eigenen, abweichenden technischen Mindestanforderungen** der KfW für 5.3. Die KfW regelt ausschließlich die Zuschussabwicklung (Portal "Meine KfW", BzA/BnD, Fristen, Boni-Prozentsätze, Höchstbeträge). Damit kann 5.3 grundsätzlich modelliert werden – TMA-Inhalte aus Abschnitt 5.1/5.2 gelten unverändert. Offen bleibt: granulare Boni-Logik (Effizienzbonus, Klimageschwindigkeitsbonus, Einkommensbonus, Emissionsminderungszuschlag) ist in `foerderrechner-konzept.md` Abschnitt "Berechnungslogik" zu integrieren (Aufgabe 6), aber NICHT Teil von MVP1 (Gebäudehülle).
- **KfW-Merkblätter 461 (Effizienzhaus-Zuschuss) und 261 (Effizienzhaus-Kredit) liegen ebenfalls vor**, sind aber für MVP1 (Gebäudehülle/BEG EM) NICHT relevant, da MVP1 sich auf BAFA-Einzelmaßnahmen beschränkt. Wichtiger Befund: Merkblatt 461 hat Stand 04/2022 (gültig ab 20.04.2022, Bestellnummer 600 000 4858) und basiert auf der Richtlinie BEG WG vom 7.12.2021 – das ist **fast 4 Jahre alt** und mit hoher Wahrscheinlichkeit durch neuere Fassungen ersetzt (Merkblatt 261/Kredit liegt bereits in einer neueren Fassung vor: Stand 08/2025, Richtlinie BEG WG vom 9.12.2022). Vor jeder Verwendung von 461-Inhalten: aktuelle Fassung über kfw.de/461 verifizieren – als `manuell_pruefen` markieren.
- TMA §3.9 (Netzanschluss): Schwellenwert „≥25% EE/Abwärme" wird nur für Gebäudenetz explizit genannt, für reinen Wärmenetzanschluss unklar, ob dieselbe Schwelle gilt – Formulierung im Original mehrdeutig, als `manuell_pruefen` zu behandeln
- TFAQ 8.08-8.37 (65%-EE-Nachweis, Klimageschwindigkeitsbonus-Details, Wärmepumpen-Sonderfälle, Gebäudenetz-Bilanzierung) wurden noch NICHT ausgewertet (siehe `markdown/beg-technische-faq-auszug.md` – Fokus lag auf Gebäudehülle)
- "Evaluation der BEG und des GEG im Jahr 2026" (TMA §3.3.3, Staubgrenzwert) – möglicherweise mit Auswirkung auf aktuelle Werte, Ergebnis dieser Evaluation nicht recherchiert (Datum "heute" = 10.06.2026, Evaluation könnte gerade laufen oder bereits Ergebnisse haben)

---

## Offene Modellierungslücken (für Folgearbeit)

- KfW 458 jetzt mit Primärquelle hinterlegt (siehe 5.6) – Boni-/Höchstbetrags-Logik noch in Berechnungslogik zu integrieren (Aufgabe 6), nicht Teil von MVP1
- KfW-Merkblatt 461 (Effizienzhaus-Zuschuss) hat veralteten Stand (04/2022) – vor Nutzung aktuelle Fassung beschaffen; für MVP1 nicht relevant
- Eigenleistung-Regelung (Materialkosten vs. Lohnkosten) nicht abschließend recherchiert (für KfW 458: Eigenleistung nur Materialkosten förderfähig, mit Bestätigung durch Energieeffizienz-Experte/Fachunternehmen – für BAFA-Seite noch offen)
- Energieeffizienz-Experten-Pflicht je Maßnahmengruppe (§9.3) nicht vollständig granular modelliert
- TFAQ-Abschnitt 8 (Wärmeerzeugung, Detailfragen) nicht ausgewertet
- "Evaluation BEG/GEG 2026" (TMA §3.3.3) – Ergebnis/Auswirkung nicht recherchiert
