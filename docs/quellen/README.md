# Quellen für Heizlast-Standardwerte

Dieses Verzeichnis enthält Quelldokumente, aus denen Standard-/Vorschlagswerte
für die Heizlast-Vorabschätzung der App kontrolliert übernommen werden dürfen.

**Grundregel: U-Werte dürfen ausschließlich aus den hier abgelegten Quellen
übernommen werden – niemals frei geschätzt, „über den Daumen“ angenommen oder
aus dem Gedächtnis ergänzt.** Ist ein Wert in der Quelle nicht eindeutig zu
finden, bleibt das entsprechende Feld leer und wird mit TODO markiert, statt
einen plausiblen Wert zu erfinden.

## Bundesanzeiger BAnz AT 04.12.2020 B1

- **Datei:** `BAnz-AT-04-12-2020-B1-Wohngebaeudebestand.pdf`
- **Quelle:** Bundesanzeiger, Veröffentlichung BAnz AT 04.12.2020 B1
- **Titel:** „Bekanntmachung der Regeln zur Datenaufnahme und Datenverwendung
  im Wohngebäudebestand“
- **Datum der Bekanntmachung:** 8. Oktober 2020
- **Veröffentlichung:** Freitag, 4. Dezember 2020 (ersetzt die entsprechende
  Bekanntmachung vom 7. April 2015, BAnz AT 21.05.2015 B2)
- **Relevante Tabellen:**
  - Tabelle 2 – U-Werte opaker Bauteile (Außenwände, Dach, Geschossdecken,
    Kellerdecke, Boden gegen Erdreich, Türen) je Baualtersklasse des Gebäudes
    bzw. Bauteils
  - Tabelle 3 – U-Werte (U_W) transparenter Bauteile (Fenster) je
    Baualtersklasse

### Hinweis zur fachlichen Einordnung (wichtig)

Die in dieser Bekanntmachung enthaltenen U-Werte sind **Pauschal- bzw.
Erfahrungswerte für die überschlägige Datenaufnahme im Wohngebäudebestand**.
Sie sind ausdrücklich **kein normativer Heizlastnachweis nach DIN EN 12831**
und ersetzen keine Bauteilaufnahme oder rechnerische Nachweisführung im
Einzelfall. In dieser App werden sie ausschließlich als optionale, transparent
gekennzeichnete Vorschlagswerte für die Heizlast-Vorabschätzung verwendet
(Quelle wird in der UI als „Bundesanzeiger BAnz AT 04.12.2020 B1“ ausgewiesen);
manuell erfasste oder abweichende Werte haben weiterhin Vorrang.

### Hinweis zur Werteübernahme (verbindlich für diese App)

U-Werte aus dieser Quelle dürfen **nur** in der kontrolliert erzeugten
Datenstruktur `js/uwerte-bundesanzeiger.js` hinterlegt werden, und auch dort
nur dann, wenn die Zuordnung Bauteilkategorie → Tabellenzeile eindeutig ist.
Es werden keine Werte interpoliert, hochgerechnet oder für nicht in der
Quelle enthaltene Kategorien ergänzt.

### Übernommene Kategorien (Stand: siehe `js/uwerte-bundesanzeiger.js`)

Aus Tabelle 2 (opake Bauteile):

- Außenwand massiv – poröse oder gelochte Materialien
- Außenwand – sonstige massive Wandaufbauten über 20 cm Wandstärke
- Dach – massive Konstruktion
- Dach – Holzkonstruktion
- Oberste Geschossdecke – massive Decke
- Kellerdecke – Stahlbeton massiv
- Boden gegen Erdreich – Stahlbeton massiv
- Türen – im Wesentlichen aus Holz, Holzwerkstoffen oder Kunststoff
- Türen – im Wesentlichen aus Metall

Aus Tabelle 3 (transparente Bauteile):

- Fenster – Kunststofffenster, Isolierverglasung
- Fenster – Holzfenster, zwei Scheiben

Alle übrigen Zeilen der Tabellen 2/3 wurden bewusst **nicht** übernommen, da
sie für die in dieser App vorgesehenen Standardkategorien nicht benötigt
wurden bzw. eine eindeutige Zuordnung zu einer App-Kategorie weiteren
fachlichen Abgleich erfordert hätte.

### Footnote zur Baualtersklasse (Tabelle 2, sinngemäß übernommen)

„Baualtersklasse des Gebäudes (bzw. des Bauteils bei nachträglich eingebauten
Bauteilen). Maßgebend für die Einordnung ist in Zweifelsfällen das Jahr der
Fertigstellung des Gebäudes oder des Gebäudeteils, zu dem das Bauteil gehört.
Die Baualtersklasse 1984 bis 1994 betrifft Gebäude, die nach der
Wärmeschutzverordnung vom 24. Februar 1982 (Inkrafttreten 1. Januar 1984)
errichtet wurden.“

Diese App leitet die Baualtersklasse je Bauteil daher wahlweise aus dem
Baujahr des Gebäudes ab oder – falls für das jeweilige Bauteil ein
Sanierungsjahr hinterlegt ist – aus diesem Sanierungsjahr (siehe
`docs/version-1-scope.md`).
