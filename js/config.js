const GESCHOSS_OPTIONEN = [
  { name: 'KG',         label: 'Kellergeschoss',      icon: '⬇' },
  { name: '1.OG',       label: '1. Obergeschoss',     icon: '⬆' },
  { name: '2.OG',       label: '2. Obergeschoss',     icon: '⬆' },
  { name: '3.OG',       label: '3. Obergeschoss',     icon: '⬆' },
  { name: 'DG',         label: 'Dachgeschoss',        icon: '🔺' },
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
