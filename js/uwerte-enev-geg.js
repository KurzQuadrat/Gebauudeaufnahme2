// ============================================================
//  U-WERT-ANFORDERUNGEN SANIERUNG/AENDERUNG – ENEV / GEG
//  Quellen:
//    – EnEV 2002 Anlage 3: BBSR-Lesefassung (BGBl. I 2001, S. 3085)
//    – EnEV 2009 Anlage 3: BBSR-Lesefassung (BGBl. I 2009, S. 954)
//    – EnEV 2013 Anlage 3: BMWK-Lesefassung (BGBl. I 2013, S. 3951)
//    – GEG 2020 Anlage 7:  gesetze-im-internet.de (konsolidiert bis 09.01.2026)
//  Auswertung: docs/quellen/enev-geg/auswertung/enev-geg-uwerte-vorarbeit.md
// ============================================================
//
// WICHTIG: Diese Werte sind gesetzliche Hoechstanforderungen (Umax) fuer die
// AENDERUNG/SANIERUNG von Aussenbauteilen bestehender Gebaeude nach
// § 9 EnEV bzw. § 48 GEG (Anlage 3 / Anlage 7).
//
// KEINE Neubauanforderungen. KEINE Bestandserfahrungswerte (BAnz 2020).
// 10-Prozent-Regel (§ 11 Abs. 1 S. 3 EnEV / § 48 Abs. 1 S. 3 GEG):
//   Anforderungen greifen nur wenn mehr als 10 % der jeweiligen
//   Bauteilflaeche eines Gebaeudes geaendert werden.
//
// Alle Umax-Werte fuer beheizte Raeume mit Normtemperatur >= 19 degC.
// Alle Sicherheitsstufen "hoch" (BBSR/BMWK-Lesefassungen, s. Quellenregister).

// ============================================================
//  PERIODEN
// ============================================================
// Drei Perioden mit unterschiedlichen Anforderungswerten:
//   Periode A: EnEV 2002/2004/2007 (01.02.2002 - 30.09.2009)
//   Periode B: EnEV 2009           (01.10.2009 - 30.04.2014)
//   Periode C: EnEV 2013/2016, GEG (ab 01.05.2014, unveraendert bis mind. 09.01.2026)
//
// Schluessel der bauteile-Objekte (Umax_19 in W/(m2K)):
//   aw_ersatz    – Aussenwand: Ersatz, Ersteinbau, innenseitige Massnahmen
//   aw_aussen    – Aussenwand: Bekleidungen, Vorsatzschalen, Daemmschichten aussen
//   fenster      – Fenster / Fenstertueren (Uw-Wert)
//   dachfenster  – Dachflaechenfenster (Uw-Wert)
//   dach         – Dachflaechen, Decken gegen Dachraum, oberste Geschossdecke (opak)
//   flachdach    – Flachdach / Dach mit Abdichtung
//   wand_keller  – Waende/Decken gegen Erdreich oder unbeheizte Raeume
//   boden        – Fussbodenaufbauten auf beheizter Seite
//   decke_aussen – Decken nach unten an Aussenluft
//   tuer         – Aussentueren (ohne rahmenlose Glastueren, Karusselltüren, kraftbetaetigt)
const PERIODEN_ENEV_GEG = [
  {
    id: 'A',
    label: 'Periode A (EnEV 2002/2004/2007)',
    regelwerk: 'EnEV 2002/2004/2007',
    anlage: 'Anlage 3',
    von_datum: '01.02.2002',
    bis_datum: '30.09.2009',
    bauteile: {
      aw_ersatz:    0.45,
      aw_aussen:    0.35,
      fenster:      1.70,
      dachfenster:  1.70,
      dach:         0.30,
      flachdach:    0.25,
      wand_keller:  0.40,
      boden:        0.50,
      decke_aussen: 0.30,
      tuer:         2.9,
    },
  },
  {
    id: 'B',
    label: 'Periode B (EnEV 2009)',
    regelwerk: 'EnEV 2009',
    anlage: 'Anlage 3',
    von_datum: '01.10.2009',
    bis_datum: '30.04.2014',
    bauteile: {
      aw_ersatz:    0.24,
      aw_aussen:    0.24,
      fenster:      1.30,
      dachfenster:  1.40,
      dach:         0.24,
      flachdach:    0.20,
      wand_keller:  0.30,
      boden:        0.50,
      decke_aussen: 0.24,
      tuer:         2.9,
    },
  },
  {
    id: 'C',
    label: 'Periode C (EnEV 2013/2016, GEG 2020+)',
    regelwerk: 'EnEV 2013/GEG',
    anlage: 'Anlage 3 / Anlage 7',
    von_datum: '01.05.2014',
    bis_datum: null,
    bauteile: {
      aw_ersatz:    0.24,
      aw_aussen:    0.24,
      fenster:      1.30,
      dachfenster:  1.40,
      dach:         0.24,
      flachdach:    0.20,
      wand_keller:  0.30,
      boden:        0.50,
      decke_aussen: 0.24,
      tuer:         1.8,
    },
  },
];

// ============================================================
//  HEIZLAST-MAPPING
// ============================================================
// Ordnet Heizlast-Felder (p.heizlastDefaults) den EnEV/GEG-Bauteilschluesseln zu.
// iwUwert (Innenwand) hat keine EnEV/GEG-Entsprechung und entfaellt.
// Fuer Periode A werden zwei Aussenwand-Werte unterschieden (aw_ersatz allgemein /
// aw_aussen fuer aussenseitige Massnahmen); im Heizlast-Kontext steht aw_ersatz
// fuer den typischen Sanierungsfall.
const ENEV_GEG_HEIZLAST_MAPPING = {
  awUwert:          'aw_ersatz',
  dachUwert:        'dach',
  bodenplatteUwert: 'wand_keller',
  bodenUwert:       'wand_keller',
  fensterUwert:     'fenster',
  tuerUwert:        'tuer',
};

// ============================================================
//  HILFSFUNKTIONEN
// ============================================================

// Liefert die Periode fuer ein gegebenes Sanierungsjahr oder null.
// Jahresgrenzen konservativ (auf ganzes Jahr gerundet):
//   bis 2009  -> Periode A  (enthielt bis Sept. 2009 gueltigen Wert)
//   2010-2013 -> Periode B
//   ab 2014   -> Periode C  (ab Mai 2014; fuer ganzes Jahr C verwendet)
// Vor 2002 keine EnEV-Anforderungen: liefert null.
function findeEnEvGegPeriode(sanierungsjahr) {
  var j = parseInt(sanierungsjahr, 10);
  if (isNaN(j) || j < 2002) return null;
  if (j <= 2009) return PERIODEN_ENEV_GEG[0];
  if (j <= 2013) return PERIODEN_ENEV_GEG[1];
  return PERIODEN_ENEV_GEG[2];
}

// Liefert { wert, bauteilKey, periode, quelleKurz } fuer ein Heizlast-Feld
// und ein Sanierungsjahr, oder null wenn kein Wert ableitbar.
// "wert" ist der gesetzliche Hoechst-U-Wert Umax in W/(m2K) fuer >= 19 degC.
function ermittleEnEvGegWert(heizlastFeldKey, sanierungsjahr) {
  var bauteilKey = ENEV_GEG_HEIZLAST_MAPPING[heizlastFeldKey];
  if (!bauteilKey) return null;
  var periode = findeEnEvGegPeriode(sanierungsjahr);
  if (!periode) return null;
  var uMax = periode.bauteile[bauteilKey];
  if (uMax === undefined || uMax === null) return null;
  var bis = periode.bis_datum ? periode.bis_datum : 'heute';
  return {
    wert: uMax,
    bauteilKey: bauteilKey,
    periode: periode,
    quelleKurz: periode.regelwerk + ' ' + periode.anlage + ' (' + periode.von_datum + '–' + bis + ')',
  };
}
