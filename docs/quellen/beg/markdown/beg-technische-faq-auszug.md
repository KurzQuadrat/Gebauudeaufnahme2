# Auszug Technische FAQ BEG EM – relevant für Förderrechner-Modul (MVP1 Gebäudehülle)

Letzte Aktualisierung: 2026-06-10

---

## Vorab-Prüfung der Quelle

- **Dokument**: „Bundesförderung für effiziente Gebäude – Liste der technischen FAQ – Einzelmaßnahmen"
- **Version**: 6.1, Inkrafttreten 18.07.2024 (KfW-Bestellnummer 600 000 4864)
- **Quelle**: User-Datei `original/beg_liste_technische_faq.pdf` (11 von vermutlich mehr Seiten geliefert – Versionshistorie zeigt Stand 6.1, Volltext umfasst 39 Seiten lt. Inhaltsverzeichnis, extrahiert wurden 2713 Zeilen)
- **Gültigkeitshinweis im Dokument selbst**: "Dieses Informationsblatt wird regelmäßig überarbeitet und ist jeweils nur in seiner zum Zeitpunkt der Antragstellung aktuellen Fassung gültig." → **Stand-Disclaimer zwingend bei jeder Ausgabe**
- **Passung zur verwendeten BEG-EM-Fassung**: Version 6.1 (07/2024) ist **jünger** als die Richtlinie (12/2023) und **älter** als das Infoblatt förderfähige Kosten (v10.0, 07/2025). Die TFAQ konkretisieren TMA-Anforderungen der Richtlinie 21.12.2023 – inhaltlich kompatibel, aber eine neuere TFAQ-Version (≥6.2) könnte zwischenzeitlich existieren und wurde nicht recherchiert.
- **Wichtiger Befund**: Die TFAQ enthalten **keine** Aussagen zu iSFP-Bonus oder Fachplanung/Baubegleitung (Suche nach "iSFP"/"Baubegleitung"/"Sanierungsfahrplan" ergab keine Treffer) – diese Themen sind ausschließlich in der Richtlinie selbst (§8.4.2, §5.5) geregelt.

---

## FAQ-Punkt / Thema: 2.01 Allgemeine Anforderungen Gebäudehülle

- **Quelle/Fundstelle**: TFAQ 2.01, S. 11
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: alle Einzelmaßnahmen Gebäudehülle (WG/NWG)
- **Regelinhalt**: Bei jeder Einzelmaßnahme an der Gebäudehülle ist zu prüfen, ob Maßnahmen zum Feuchteschutz (Tauwasser, Schimmelpilz) durch Mindestluftwechsel und Mindestwärmeschutz erforderlich sind. Zusätzlich: wärmebrückenreduzierte und luftdichte Ausführung. Anforderungen beziehen sich NUR auf die geplante Einzelmaßnahme, nicht auf das Gesamtgebäude.
- **Relevanz für Förderrechner**: Grundvoraussetzung, die bei jeder Gebäudehülle-Maßnahme als Hinweis/Checkliste ausgegeben werden sollte
- **mögliche Eingabefelder**: Bauteil/Maßnahme, ggf. Flag „Lüftungskonzept erstellt (ja/nein)"
- **Ergebnislogik**: kein eigener Förderfähigkeits-Ausschluss, aber Pflichthinweis im Nachweis-Abschnitt
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: "Bei dieser Maßnahme ist zu prüfen, ob ein Lüftungskonzept und ein Wärmebrücken-/Luftdichtheitskonzept erforderlich sind. Dies betrifft nur die durchgeführte Maßnahme, nicht das Gesamtgebäude."

---

## FAQ-Punkt / Thema: 2.02 Mindestwärmeschutz

- **Quelle/Fundstelle**: TFAQ 2.02, S. 11
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: alle opaken und transparenten Bauteile (WG/NWG)
- **Regelinhalt**: Mindestwärmeschutz nach DIN 4108-2:2013-02 dient der Vermeidung von Schimmelpilzbildung an Innenoberflächen sowie an Wärmebrücken (Kanten/Ecken) unter Norm-Randbedingungen.
- **Relevanz für Förderrechner**: Hintergrundregel, primär für Nachweis-Texte
- **mögliche Eingabefelder**: keine zusätzlichen
- **Ergebnislogik**: kein direkter Förderfähigkeits-Filter
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: "Der bauphysikalische Mindestwärmeschutz nach DIN 4108-2 ist unabhängig von der BEG-Förderung einzuhalten."

---

## FAQ-Punkt / Thema: 2.03/2.04 Mindestluftwechsel, Lüftungskonzept (WG/NWG)

- **Quelle/Fundstelle**: TFAQ 2.03 (S. 12, WG), 2.04 (S. 12, NWG)
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Maßnahmen, die die Luftdichtheit erhöhen (z. B. Fenstertausch, Dachdämmung)
- **Regelinhalt**: Bei luftdichtheitserhöhenden Maßnahmen ist die Notwendigkeit lüftungstechnischer Maßnahmen zu prüfen (Lüftungskonzept, z. B. nach DIN 1946-6 für WG, DIN EN 16798-1/-3 für NWG). Hilfsmittel: "OnlineCheck Wohnungslüftung" (VdZ). Die **Veranlassung der Umsetzung verantwortet der Förderempfänger** (nicht Kurz Quadrat – relevant für Haftungsabgrenzung).
- **Relevanz für Förderrechner**: Pflichthinweis bei Fenster-/Dach-/Fassadenmaßnahmen, KEINE Förderfähigkeitsbedingung selbst, aber Nachweispflicht
- **mögliche Eingabefelder**: Maßnahme erhöht Luftdichtheit (ja/nein – kann aus Bauteil/Maßnahmentyp abgeleitet werden), Lüftungskonzept vorhanden (ja/nein)
- **Ergebnislogik**: bei "Lüftungskonzept erforderlich, aber nicht vorhanden" → Status `manuell_pruefen` mit Hinweis auf fehlenden Nachweis
- **Unsicherheit**: mittel (Einzelfallprüfung nötig, Modul kann nur auf Notwendigkeit hinweisen)
- **Hinweistext für Nutzer**: "Diese Maßnahme erhöht die Luftdichtheit des Gebäudes. Es ist zu prüfen, ob ein Lüftungskonzept erforderlich ist. Die Umsetzung verantwortet der Eigentümer/Antragsteller."

---

## FAQ-Punkt / Thema: 2.05–2.07 Wärmebrücken- und Luftdichtheitskonzept

- **Quelle/Fundstelle**: TFAQ 2.05–2.07, S. 13
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: alle Einzelmaßnahmen Gebäudehülle (WG/NWG)
- **Regelinhalt**: Mindestwärmeschutz im Bereich von Wärmebrücken nach DIN 4108-2 Abschnitt 6 (fRsi ≥ 0,70 bzw. Oberflächentemperatur ≥ 12,6 °C). Für Bauteilanschlüsse gemäß DIN 4108 Beiblatt 2 gilt die Anforderung ohne weiteren Nachweis als erfüllt. Bei Fenstertausch kann VFF-Merkblatt ES.06 als Arbeitshilfe dienen. **Ausnahme**: gilt nicht für Räume mit Beheizung ≤12 °C und <19 °C. Für betroffene Bauteilanschlüsse sind Konstruktionsprinzipien zur wärmebrücken- und luftdichtheitsreduzierten Ausführung zu dokumentieren (grafisch/bildhaft zulässig).
- **Relevanz für Förderrechner**: Nachweispflicht-Information, kein eigenständiges Förderfähigkeitskriterium
- **mögliche Eingabefelder**: Raumtemperatur-Kategorie des betroffenen Bereichs (≥19 °C / 12-<19 °C / <12 °C) – relevant auch für TMA-Werte (s. regelmodell.md)
- **Ergebnislogik**: kein Statuswechsel, aber Pflicht-Nachweis im Ausgabeprotokoll
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: "Für die betroffenen Bauteilanschlüsse ist ein Wärmebrücken-/Luftdichtheitskonzept zu dokumentieren (z. B. anhand DIN 4108 Beiblatt 2 oder VFF-Merkblatt ES.06)."

---

## FAQ-Punkt / Thema: 2.08 Sommerlicher Wärmeschutz – Nachweispflicht

- **Quelle/Fundstelle**: TFAQ 2.08, S. 14
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Einzelmaßnahme „Sommerlicher Wärmeschutz" (5.1)
- **Regelinhalt**: Förderfähig sind ausschließlich außenliegende Sonnenschutzvorrichtungen nach DIN 4108-2 Tabelle 7 Zeilen 3.1–3.3, parallel zur Verglasungsfläche installiert (Zeile 3.4 – Vordächer, Markisen allgemein, freistehende Lamellen – ausgeschlossen). Nachweis nach DIN 4108-2 für den Raum mit den höchsten Anforderungen; bei gleichen Fenstern/Bauweise/Sonnenschutzsystemen kann die Einhaltung für andere Räume übernommen werden. **Wird Sonnenschutz als Umfeldmaßnahme zu Fenstertausch/Dachflächenfenster/Vorhangfassade mitgefördert, entfällt der Nachweis des sommerlichen Wärmeschutzes.**
- **Relevanz für Förderrechner**: wichtig zur Unterscheidung "eigenständige Maßnahme Sommerlicher Wärmeschutz" vs. "Umfeldmaßnahme zu Fenstertausch"
- **mögliche Eingabefelder**: Sommerlicher Wärmeschutz als eigenständige Maßnahme (ja/nein), Sonnenschutzart (außenliegend/innenliegend), DIN-4108-2-Zeile (3.1-3.3 / 3.4)
- **Ergebnislogik**: Zeile 3.4 oder innenliegend → `nicht_foerderfaehig`; Zeile 3.1-3.3 außenliegend, eigenständig → `foerderfaehig` (vorbehaltlich Nachweis); als Umfeldmaßnahme zu Fenster/Dach → `foerderfaehig` ohne separaten Nachweis
- **Unsicherheit**: niedrig (Regel ist eindeutig formuliert)
- **Hinweistext für Nutzer**: "Nur außenliegende Sonnenschutzvorrichtungen (Rollläden, Jalousien, Markisen parallel zu Fenstern) sind förderfähig. Innenliegende Vorrichtungen, Vordächer, Pergolen und freistehende Lamellen sind ausgeschlossen."

---

## FAQ-Punkt / Thema: 2.09 Bauteilanforderungen Baudenkmal/erhaltenswerte Bausubstanz

- **Quelle/Fundstelle**: TFAQ 2.09, S. 14
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: alle Bauteile der Gebäudehülle
- **Regelinhalt**: Die TMA-Tabelle enthält angepasste (weniger strenge) Anforderungswerte für Baudenkmale und sonstige besonders erhaltenswerte Bausubstanz. **Bei "sonstiger besonders erhaltenswerter Bausubstanz" gelten die angepassten Werte NUR bei Wohngebäuden.** Bei Nichtwohngebäuden gelten angepasste Werte ausschließlich für Baudenkmale (nicht für "erhaltenswerte Bausubstanz" allgemein).
- **Relevanz für Förderrechner**: wichtige Differenzierung für TMA-Anwendung bei Sonderfällen
- **mögliche Eingabefelder**: Status Baudenkmal (ja/nein), Status "besonders erhaltenswerte Bausubstanz" (ja/nein), WG/NWG
- **Ergebnislogik**: bestimmt, welche TMA-Tabellenzeile angewendet wird (Standard vs. Baudenkmal/erhaltenswert); bei NWG + "erhaltenswerte Bausubstanz" (kein Baudenkmal) → Standardwerte, NICHT die angepassten Werte
- **Unsicherheit**: mittel (Einstufung "Baudenkmal" vs. "besonders erhaltenswerte Bausubstanz" erfordert ggf. externe Bestätigung, z. B. Denkmalschutzbehörde)
- **Hinweistext für Nutzer**: "Bei Baudenkmalen und (nur bei Wohngebäuden) besonders erhaltenswerter Bausubstanz gelten abweichende, weniger strenge U-Wert-Anforderungen. Der Status sollte durch eine Bestätigung der zuständigen Stelle belegt sein."

---

## FAQ-Punkt / Thema: 3.07/3.09 U-Wert Bodenflächen gegen Erdreich, Gefälledämmung, hinterlüftete Fassaden

- **Quelle/Fundstelle**: TFAQ 3.07/3.09, S. 16
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Bodenflächen gegen Erdreich, Flachdach-Gefälledämmung, vorgehängte hinterlüftete Fassaden
- **Regelinhalt**: Bei U-Wert-Berechnung von Bodenflächen bleiben Schüttlagen und Erdreich unberücksichtigt; Dämmschichten unterhalb der Bodenplatte zählen nur, wenn als Perimeterdämmung normgerecht zugelassen. Bei Gefälledämmung (Flachdach) vereinfachte Ermittlung über mittlere Höhe möglich, Mindestwärmeschutz muss am niedrigsten Punkt eingehalten werden. Effektiver/dynamischer U-Wert ist als Nachweiswert NICHT zulässig. Mineralische Brandriegel in WDVS bleiben bei U-Wert-Berechnung der Außenwand unberücksichtigt.
- **Relevanz für Förderrechner**: technische Detailregel für die Plausibilisierung eingegebener U-Werte, nicht für Förderfähigkeit selbst
- **mögliche Eingabefelder**: keine zusätzlichen für MVP1 (Detailregel für Energieberater/Nachweis, nicht für Endkunden-Eingabe)
- **Ergebnislogik**: kein Statuswechsel
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: "Der U-Wert ist nach Normverfahren (DIN EN ISO 6946) ohne Erdreich-/Schüttlagenschichten zu berechnen; ein dynamischer/effektiver U-Wert ist nicht als Nachweis zulässig."

---

## FAQ-Punkt / Thema: 4.04/4.06 Sonderverglasung und Ertüchtigung von Fenstern (Verbindung zu Anlage 7 GEG)

- **Quelle/Fundstelle**: TFAQ 4.04 (S. 19), TFAQ 4.06 (S. 19-20)
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Fenster, Fenstertüren, Balkon-/Terrassentüren mit Sonderverglasung; Ertüchtigung (Neuverglasung im Bestandsrahmen)
- **Regelinhalt**: 
  - **Sonderverglasung**: Definiert ausschließlich nach **Fußnote 15 der Anlage 7 GEG** – Schallschutzverglasung (RW,R ≥ 40 dB nach DIN EN ISO 717-1), Isolierglas-Sonderaufbauten zur Durchschuss-/Durchbruch-/Sprengwirkungshemmung, Brandschutzglas (Isolierglas-Sonderaufbau, Einzelelementdicke ≥18 mm nach DIN 4102-13) – jeweils wenn aufgrund Landesbauordnung/anderer Vorschriften zwingend einzubauen.
  - **Ertüchtigung**: = Einbau neuer Verglasung in bestehenden Rahmen, Austausch eines Flügels, Erneuerung eines Fensters in Kastenfenstern, oder Herstellung eines Kastenfensters durch zusätzliches Fenster. Anforderung an UW-Wert gilt für das GESAMTE Fenster (Rahmen+Verglasung+Glasrandverbund), nicht nur die Scheibe.
  - **Pflicht-Mindestmaßnahmen bei Ertüchtigung**: Überarbeitung Rahmen/Flügel, Herstellung Gang-/Schließbarkeit, Erneuerung/Einbau Dichtungen, Dämmung Einbaufuge, luftdichter Anschluss innen, schlagregendichter Anschluss außen.
- **Relevanz für Förderrechner**: **SEHR HOCH** – direkte fachliche Brücke zum GEG-Quellenregister (`docs/quellen/enev-geg/`); bestätigt, dass die TMA-Sonderzeilen für Sonderverglasung (1,1 W/(m²K) WG, vgl. regelmodell.md) nur bei Vorliegen einer öffentlich-rechtlichen Pflicht zur Sonderverglasung greifen
- **mögliche Eingabefelder**: Maßnahmenart (Austausch komplettes Fenster / Ertüchtigung im Bestandsrahmen), Sonderverglasung erforderlich (ja/nein, mit Grund: Schallschutz/Brandschutz/Einbruch/Durchschuss), bei Ertüchtigung: alle Pflicht-Mindestmaßnahmen durchgeführt (ja/nein)
- **Ergebnislogik**: 
  - "Sonderverglasung" ohne nachweisbare öffentlich-rechtliche Pflicht → `manuell_pruefen` (TMA-Sonderwert nicht automatisch anwendbar)
  - "Ertüchtigung" ohne vollständige Pflicht-Mindestmaßnahmen → `nicht_foerderfaehig` bzw. `manuell_pruefen`
- **Unsicherheit**: mittel (Nachweis der "Pflicht" zur Sonderverglasung erfordert Einzelfallprüfung, ggf. Bauordnungsamt)
- **Hinweistext für Nutzer**: "Abweichende U-Wert-Anforderungen für Sonderverglasungen gelten nur, wenn diese aufgrund gesetzlicher Vorgaben (z. B. Landesbauordnung, Schallschutzauflage) zwingend erforderlich sind (Definition gemäß Fußnote 15, Anlage 7 GEG). Bei Ertüchtigung im Bestandsrahmen müssen alle in der Richtlinie genannten Mindestmaßnahmen durchgeführt werden."

---

## FAQ-Punkt / Thema: 4.07 Vorhangfassaden – Denkmalschutz-Ausnahme

- **Quelle/Fundstelle**: TFAQ 4.07, S. 20
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Vorhangfassaden (Ucw-Wert)
- **Regelinhalt**: Von den Mindestanforderungen an Vorhangfassaden kann abgewichen werden, wenn diese **belegbar** Anforderungen des Denkmalschutzes zuwiderlaufen.
- **Relevanz für Förderrechner**: Sonderfall-Regel, analog zu 2.09
- **mögliche Eingabefelder**: Denkmalschutzkonflikt belegt (ja/nein)
- **Ergebnislogik**: bei belegtem Konflikt → `manuell_pruefen` (Abweichung möglich, aber nicht automatisch quantifizierbar)
- **Unsicherheit**: mittel
- **Hinweistext für Nutzer**: "Bei nachgewiesenem Konflikt mit Denkmalschutzauflagen kann von den U-Wert-Mindestanforderungen für Vorhangfassaden abgewichen werden – im Einzelfall mit der zuständigen Stelle abzustimmen."

---

## FAQ-Punkt / Thema: 4.09–4.11 Glasdächer, Lichtbänder, Lichtkuppeln, Dachflächenfenster – Definitionsabgrenzung

- **Quelle/Fundstelle**: TFAQ 4.09–4.11, S. 20-21
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: transparente Dachbauteile
- **Regelinhalt**: Abgrenzung gemäß GEG-Auslegung zu Anlage 1-3 und 7 GEG 2020: "Lichtbänder" = Dachlichtbänder aus Kunststoff nach DIN EN 14963; "Lichtkuppeln" = nach DIN EN 1873; "Glasdächer" = übrige transparente Dachflächen außer Dachflächenfenstern. U-Wert-Ermittlung: Lichtkuppeln nach DIN V 4108-4 Abschnitt 6.1 (DIN EN 1873), Dachflächenfenster nach Herstellerangabe (DIN EN ISO 12567), Glasdächer nach DIN EN ISO 10077-1.
- **Relevanz für Förderrechner**: nötig zur korrekten Zuordnung des Bauteils zur richtigen TMA-Tabellenzeile (Dachflächenfenster 1,0 / Glasdächer 1,6 / Lichtbänder/-kuppeln 1,5, vgl. regelmodell.md)
- **mögliche Eingabefelder**: Bauteiltyp transparentes Dach (Dachflächenfenster / Glasdach / Lichtband / Lichtkuppel) – ggf. als Auswahlfeld mit Erklärtext
- **Ergebnislogik**: steuert Auswahl der TMA-Zeile, kein eigener Statuswechsel
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: "Die Einordnung als Dachflächenfenster, Glasdach, Lichtband oder Lichtkuppel bestimmt den anzuwendenden U-Wert-Grenzwert."

---

## FAQ-Punkt / Thema: 5.01/5.02 UD-Wert Türen, U-Wert Tore

- **Quelle/Fundstelle**: TFAQ 5.01/5.02, S. 21
- **Stand**: Version 6.1 (07/2024)
- **betrifft**: Außentüren, Tore (nur NWG förderfähig als eigenständige Maßnahme)
- **Regelinhalt**: UD-Wert von Türen wird analog zum UW-Wert für Fenster bestimmt (Standardgröße 1,23 m × 2,8 m gem. DIN V 41084 / DIN EN 14351-1). Für Tore gilt UD-Wert nach DIN V 41084.
- **Relevanz für Förderrechner**: Bestätigung der Werte aus regelmodell.md (Außentüren 1,3 WG / 1,6 NWG; Tore nur NWG 1,0/2,0)
- **mögliche Eingabefelder**: keine zusätzlichen
- **Ergebnislogik**: kein Statuswechsel, Bestätigung bestehender Regel
- **Unsicherheit**: niedrig
- **Hinweistext für Nutzer**: keiner zusätzlich erforderlich

---

## Themen ohne Treffer in der TFAQ (zur Kenntnis)

- **iSFP-Bonus**: keine Erwähnung – Regelung ausschließlich in Richtlinie §8.4.2
- **Fachplanung/Baubegleitung**: keine Erwähnung – Regelung ausschließlich in Richtlinie §5.5/§8
- **Förderfähige Kosten (€-Beträge)**: keine Erwähnung – Regelung im Infoblatt v10.0
- **KfW-Heizungsförderung**: keine Erwähnung – TFAQ deckt nur BAFA-Maßnahmengruppen technisch ab

→ Für diese Themen bleibt die Richtlinie (bzw. künftig KfW-Merkblätter) die alleinige Quelle.
