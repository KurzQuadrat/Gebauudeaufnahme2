// ============================================================
//  U-WERTE NACH BAUALTERSKLASSE – QUELLE: BUNDESANZEIGER
//  BAnz AT 04.12.2020 B1 "Bekanntmachung der Regeln zur
//  Datenaufnahme und Datenverwendung im Wohngebäudebestand"
//  vom 8. Oktober 2020 (siehe docs/quellen/README.md)
// ============================================================
//
// WICHTIG: Diese Werte sind Pauschal-/Erfahrungswerte aus einer
// amtlichen Bekanntmachung für die überschlägige Datenaufnahme im
// Wohngebäudebestand - KEIN normativer Heizlastnachweis nach DIN EN
// 12831 und KEIN Bauteilnachweis im Einzelfall. Sie dienen hier
// ausschließlich als optionale, transparent gekennzeichnete
// Vorschlagswerte für die überschlägige Heizlast-Vorabschätzung
// dieser App.
//
// Es wurden AUSSCHLIESSLICH Werte übernommen, die eindeutig aus der
// abgelegten PDF (docs/quellen/BAnz-AT-04-12-2020-B1-Wohngebaeudebestand.pdf,
// Tabelle 2 "Opake Bauteile" und Tabelle 3 "Transparente Bauteile")
// entnommen werden konnten. Es wurde NICHTS geschätzt oder ergänzt.
// Kategorien, die nicht eindeutig zuordenbar gewesen wären, wurden
// hier bewusst nicht aufgenommen.

// Baualtersklassen Tabelle 2 (opake Bauteile: Wände, Dach, Decken, Türen)
const BAUALTERSKLASSEN_OPAK = [
  { key: 'bis1918',    label: 'bis 1918',     von: -Infinity, bis: 1918 },
  { key: '1919-1948',  label: '1919–1948',    von: 1919,      bis: 1948 },
  { key: '1949-1957',  label: '1949–1957',    von: 1949,      bis: 1957 },
  { key: '1958-1968',  label: '1958–1968',    von: 1958,      bis: 1968 },
  { key: '1969-1978',  label: '1969–1978',    von: 1969,      bis: 1978 },
  { key: '1979-1983',  label: '1979–1983',    von: 1979,      bis: 1983 },
  { key: '1984-1994',  label: '1984–1994',    von: 1984,      bis: 1994 },
  { key: '1995-2001',  label: '1995–2001',    von: 1995,      bis: 2001 },
  { key: 'ab2002',     label: 'ab 2002',      von: 2002,      bis: Infinity },
];

// Baualtersklassen Tabelle 3 (transparente Bauteile: Fenster)
const BAUALTERSKLASSEN_TRANSPARENT = [
  { key: 'bis1978',   label: 'bis 1978',  von: -Infinity, bis: 1978 },
  { key: '1979-1983', label: '1979–1983', von: 1979,      bis: 1983 },
  { key: '1984-1994', label: '1984–1994', von: 1984,      bis: 1994 },
  { key: '1995-2001', label: '1995–2001', von: 1995,      bis: 2001 },
  { key: 'ab2002',    label: 'ab 2002',   von: 2002,      bis: Infinity },
];

// Opake Bauteile (Tabelle 2) - U-Werte in W/(m²K), Reihenfolge entspricht
// BAUALTERSKLASSEN_OPAK. "gruppe" ordnet die Kategorie einem der
// Heizlast-Standardwert-Felder zu (aw = Außenwand, dach, og = oberste
// Geschossdecke / Boden-Kellerdecke, tuer = Türen).
const UWERTE_OPAK = {
  aw_massiv_poroes: {
    label: 'Außenwand massiv – poröse oder gelochte Materialien',
    quelle: 'Tabelle 2: „Massivwand aus Hochlochziegeln, Bimsbeton-Hohlsteinen oder vergleichbaren porösen oder stark gelochten Materialien“',
    gruppe: 'aw',
    werte: [1.4, 1.4, 1.4, 1.4, 1.0, 0.80, 0.60, 0.50, 0.40],
  },
  aw_sonstige_ueber20: {
    label: 'Außenwand – sonstige massive Wandaufbauten über 20 cm',
    quelle: 'Tabelle 2: „Sonstige Wandaufbauten über 20 cm Wandstärke über alle Schichten, gegebenenfalls mit ursprünglicher Dämmung“',
    gruppe: 'aw',
    werte: [2.2, 2.2, 2.2, 1.4, 1.0, 0.80, 0.60, 0.50, 0.40],
  },
  dach_massiv: {
    label: 'Dach – massive Konstruktion',
    quelle: 'Tabelle 2: „Dach, Massive Konstruktion“',
    gruppe: 'dach',
    werte: [2.1, 2.1, 2.1, 1.3, 1.3, 0.60, 0.40, 0.30, 0.20],
  },
  dach_holz: {
    label: 'Dach – Holzkonstruktion',
    quelle: 'Tabelle 2: „Dach, Holzkonstruktion“',
    gruppe: 'dach',
    werte: [2.6, 1.4, 1.4, 1.4, 0.80, 0.70, 0.50, 0.30, 0.20],
  },
  oberste_geschossdecke_massiv: {
    label: 'Oberste Geschossdecke – massive Decke',
    quelle: 'Tabelle 2: „Oberste Geschossdecke, Massive Decke“',
    gruppe: 'og',
    werte: [2.1, 2.1, 2.1, 2.1, 0.60, 0.60, 0.30, 0.30, 0.20],
  },
  kellerdecke_stahlbeton: {
    label: 'Kellerdecke – Stahlbeton massiv',
    quelle: 'Tabelle 2: „Kellerdecke, Stahlbeton massiv“',
    gruppe: 'og',
    werte: [1.6, 1.6, 2.3, 1.0, 1.0, 0.80, 0.60, 0.60, 0.50],
  },
  boden_erdreich_stahlbeton: {
    label: 'Boden gegen Erdreich – Stahlbeton massiv',
    quelle: 'Tabelle 2: „Boden gegen Erdreich, Stahlbeton massiv“',
    gruppe: 'og',
    werte: [1.6, 1.6, 2.3, 1.2, 1.2, 0.80, 0.60, 0.60, 0.50],
  },
  tueren_holz_kunststoff: {
    label: 'Türen – im Wesentlichen aus Holz, Holzwerkstoffen oder Kunststoff',
    quelle: 'Tabelle 2: „Türen, Im Wesentlichen aus Holz, Holzwerkstoffen oder Kunststoff“ (für alle Baualtersklassen identischer Wert)',
    gruppe: 'tuer',
    // Quelle weist für diese Kategorie über alle Baualtersklassen denselben
    // Wert aus - daher konstantes Array (kein erfundener Verlauf).
    werte: [2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9],
  },
  tueren_metall: {
    label: 'Türen – im Wesentlichen aus Metall',
    quelle: 'Tabelle 2: „Türen, Im Wesentlichen aus Metall“ (für alle Baualtersklassen identischer Wert)',
    gruppe: 'tuer',
    werte: [4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0],
  },
};

// Transparente Bauteile (Tabelle 3) - U_W-Werte in W/(m²K), Reihenfolge
// entspricht BAUALTERSKLASSEN_TRANSPARENT.
const UWERTE_TRANSPARENT = {
  fenster_kunststoff_isolierverglasung: {
    label: 'Fenster – Kunststofffenster, Isolierverglasung',
    quelle: 'Tabelle 3: „Kunststofffenster, Isolierverglasung“ (U_W)',
    gruppe: 'fenster',
    werte: [3.0, 3.0, 3.0, 1.9, 1.5],
  },
  fenster_holz_zwei_scheiben: {
    label: 'Fenster – Holzfenster, zwei Scheiben',
    quelle: 'Tabelle 3: „Holzfenster, zwei Scheiben“ (U_W)',
    gruppe: 'fenster',
    werte: [2.7, 2.7, 2.7, 1.6, 1.5],
  },
};

// Liefert den Index der Baualtersklasse für ein gegebenes Jahr, oder -1
// wenn kein Jahr (leer/ungültig) übergeben wurde. Keine Schätzung - bei
// fehlendem Jahr bleibt die Ableitung schlicht aus.
function findeBaualtersklasseIndex(jahr, klassen) {
  const j = parseInt(jahr, 10);
  if (isNaN(j)) return -1;
  for (let i = 0; i < klassen.length; i++) {
    if (j >= klassen[i].von && j <= klassen[i].bis) return i;
  }
  return -1;
}

function baualtersklasseOpakFuerJahr(jahr) {
  const idx = findeBaualtersklasseIndex(jahr, BAUALTERSKLASSEN_OPAK);
  return idx === -1 ? null : BAUALTERSKLASSEN_OPAK[idx];
}

function baualtersklasseTransparentFuerJahr(jahr) {
  const idx = findeBaualtersklasseIndex(jahr, BAUALTERSKLASSEN_TRANSPARENT);
  return idx === -1 ? null : BAUALTERSKLASSEN_TRANSPARENT[idx];
}

// Liefert { wert, klasse, kategorie } für eine opake Bauteilkategorie und
// ein Bezugsjahr (Sanierungsjahr falls vorhanden, sonst Baujahr Gebäude).
// Liefert null, wenn Kategorie unbekannt oder Jahr nicht zuordenbar -
// es wird NICHTS geschätzt.
function ermittleUwertOpak(kategorieKey, jahr) {
  const kat = UWERTE_OPAK[kategorieKey];
  if (!kat) return null;
  const idx = findeBaualtersklasseIndex(jahr, BAUALTERSKLASSEN_OPAK);
  if (idx === -1) return null;
  return { wert: kat.werte[idx], klasse: BAUALTERSKLASSEN_OPAK[idx], kategorie: kat };
}

function ermittleUwertTransparent(kategorieKey, jahr) {
  const kat = UWERTE_TRANSPARENT[kategorieKey];
  if (!kat) return null;
  const idx = findeBaualtersklasseIndex(jahr, BAUALTERSKLASSEN_TRANSPARENT);
  if (idx === -1) return null;
  return { wert: kat.werte[idx], klasse: BAUALTERSKLASSEN_TRANSPARENT[idx], kategorie: kat };
}
