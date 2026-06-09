// App-Version & Build-Datum: zentrale Anzeige in der Projektübersicht, damit beim
// Testen über den iPhone-Home-Bildschirm erkennbar ist, ob die aktuellste Version
// geladen wurde (siehe refresh-bar in index.html). Bei jedem relevanten Update
// hier anpassen.
const APP_VERSION = "v0.2.42-dev";
const APP_BUILD_DATE = "2026-06-10";

// Erlaubte Detailtypen je Sanierungsma\xdfnahme (aus js/uwerte-bundesanzeiger.js).
// Steuert, welche Optionen im Detailtyp-Dropdown der Sanierungskarte sichtbar sind.
// Ma\xdfnahmen ohne Eintrag haben keinen U-Wert-Bezug -> kein Dropdown.
const MASSNAHME_DETAILTYPEN = {
  'Dach':        ['dach_massiv', 'dach_holz', 'oberste_geschossdecke_massiv'],
  'Fenster':     ['fenster_kunststoff_isolierverglasung', 'fenster_holz_zwei_scheiben'],
  'Fassade':     ['aw_massiv_poroes', 'aw_sonstige_ueber20'],
  'Bodenplatte': ['boden_erdreich_stahlbeton'],
  'Kellerdecke': ['kellerdecke_stahlbeton'],
  // T\xfcren: tu\xefren_* vorhanden, aber kein eigener Ma\xdfnahmen-Key geplant -> nicht aufgef\xfchrt
  // Heizung, Heizk\xf6rper, L\xfcftung, PV, Sonstiges: kein U-Wert-Bezug
};

const GESCHOSS_OPTIONEN = [
  { name: 'KG',         label: 'Kellergeschoss',      icon: '⬇' },
  { name: 'EG',         label: 'Erdgeschoss',         icon: '🏠' },
  { name: '1.OG',       label: '1. Obergeschoss',     icon: '⬆' },
  { name: '2.OG',       label: '2. Obergeschoss',     icon: '⬆' },
  { name: '3.OG',       label: '3. Obergeschoss',     icon: '⬆' },
  { name: 'DG',         label: 'Dachgeschoss',        icon: '🔺' },
  { name: 'DG 1',       label: 'Dachgeschoss 1',      icon: '🔺' },
  { name: 'DG 2',       label: 'Dachgeschoss 2',      icon: '🔺' },
  { name: 'Spitzboden', label: 'Spitzboden',          icon: '△' },
];

const FX = {
  'aussen':       { label: 'Außenluft',              fx: 1.0 },
  'erdreich':     { label: 'Erdreich',               fx: 0.45 },
  'keller':       { label: 'Unbeheizter Keller',     fx: 0.5 },
  'dach_kalt':    { label: 'Kalter Dachraum',        fx: 0.5 },
  'treppenhaus':  { label: 'Unbeh. Treppenhaus',     fx: 0.4 },
  'garage':       { label: 'Garage/Carport',         fx: 0.5 },
  'beheizt':      { label: 'Beheizter Raum (gleich)',fx: 0.0 },
  'beheizt_kalt': { label: 'Beheizter Raum (kälter)',fx: 0.2 },
};
const THETA_E = -12; // Frankfurt DIN EN 12831 Anhang NA

const NORMTEMPS = {'Wohnen':20,'Schlafen':18,'Bad':24,'Küche':20,'Flur':15,'Büro':20,'Keller':10,'Abstellraum':10,'Sonstiges':20};

// Sortierindex fuer Geschoss-Anzeige (oben nach unten: Spitzboden zuerst, KG zuletzt)
function getGeschossSortIndex(name) {
  if (!name) return -1;
  var n = String(name).trim();
  if (n === 'Spitzboden') return 60;
  if (n === 'DG 2')       return 52;
  if (n === 'DG 1')       return 51;
  if (n === 'DG')         return 50;
  if (n === '3.OG')       return 40;
  if (n === '2.OG')       return 30;
  if (n === '1.OG')       return 20;
  if (n === 'EG')         return 10;
  if (n === 'KG')         return 0;
  // Generisch: X.OG
  var ogMatch = n.match(/^(\d+)\.OG$/);
  if (ogMatch) return 10 + parseInt(ogMatch[1], 10) * 10;
  // Generisch: DG X
  var dgMatch = n.match(/^DG\s+(\d+)$/);
  if (dgMatch) return 50 + parseInt(dgMatch[1], 10);
  return -1;
}

// Gibt Kopie des Arrays sortiert von oben (Spitzboden) nach unten (KG) zurueck
function sortiereGeschosseFuerAnzeige(geschosse) {
  return (geschosse || []).slice().sort(function(a, b) {
    return getGeschossSortIndex(b.name) - getGeschossSortIndex(a.name);
  });
}
