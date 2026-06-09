// ============================================================
//  FLÄCHEN & HEIZLAST BERECHNUNG (DIN EN 12831)
// ============================================================

// Robuste Zahl-Auswertung für Messwerte: Disto-/Lasergeräte können je nach
// Geräte-/Spracheinstellung Werte mit Komma als Dezimaltrennzeichen liefern
// (z.B. "2,55"). parseFloat allein würde "2,55" als 2 interpretieren und
// dadurch zu falschen Flächen führen. Komma wird daher defensiv in Punkt
// umgewandelt, bevor geparst wird. Bestehende Werte mit Punkt bleiben unverändert.
function parseMesswert(v) {
  if (v === null || v === undefined || v === '') return NaN;
  return parseFloat(String(v).trim().replace(',', '.'));
}

function cm(v) { const n = parseMesswert(v); return (isNaN(n) ? 0 : n) / 100; }

// Felder, die direkt in Meter erfasst werden (Disto-/Laserwerte, z.B. "2.50"
// oder "2,50" für 2,50 m). Im Unterschied zu cm() KEINE Division durch 100 -
// eine Umrechnung würde Meterwerte fälschlich als Zentimeter behandeln.
function meter(v) { const n = parseMesswert(v); return isNaN(n) ? 0 : n; }

function berechneRaumGeometrie(r) {
  const hRaw = parseMesswert(r.deckenhoehe);
  const h = isNaN(hRaw) ? 0 : hRaw;
  // Wandlängen N/O/S/W (inkl. Segmente) werden als Meterwerte erfasst
  // (Disto-/Laserwerte, z.B. "4.00" = 4,00 m) - keine cm-Umrechnung.
  const n1=meter(r.wand_n1), n2=meter(r.wand_n2);
  const o1=meter(r.wand_o1), o2=meter(r.wand_o2);
  const s1=meter(r.wand_s1), s2=meter(r.wand_s2);
  const w1=meter(r.wand_w1), w2=meter(r.wand_w2);

  // Excel-Formel B56: =((B8+D8)/2)*((C8+E8)/2)  [N1,O1,S1,W1]
  const A_boden = ((n1+s1)/2) * ((o1+w1)/2);

  // Wandflächen: h × (seg1 + seg2)
  const A_wN = h*(n1+n2), A_wO = h*(o1+o2);
  const A_wS = h*(s1+s2), A_wW = h*(w1+w2);

  // AW/IW-Klassifizierung je Himmelsrichtung auswerten und Brutto-Wandflächen
  // entsprechend zuordnen. Unbekannte/leere Klassifizierung wird NICHT
  // stillschweigend als Außenwand gerechnet, sondern separat ausgewiesen
  // ("unbekannt") - siehe known-issues KI-006.
  const wandKlass = [
    { art: r.wand_n_art, A: A_wN }, { art: r.wand_o_art, A: A_wO },
    { art: r.wand_s_art, A: A_wS }, { art: r.wand_w_art, A: A_wW }
  ];
  const A_wand_aw = wandKlass.filter(w => w.art === 'AW').reduce((s,w) => s + w.A, 0);
  const A_wand_iw = wandKlass.filter(w => w.art === 'IW').reduce((s,w) => s + w.A, 0);
  const A_wand_unbekannt = wandKlass.filter(w => w.art !== 'AW' && w.art !== 'IW').reduce((s,w) => s + w.A, 0);

  // Öffnungen: Disto liefert Meterwerte (z.B. "1.20" = 1,20 m) - keine cm-Umrechnung
  // (siehe known-issues: Einheiten von Fenster/Tür/Heizkörper/Nischen/Vorsprüngen/
  // Dachschräge/Gaube wurden auf Meter vereinheitlicht).
  const A_fenster = (r.fenster||[]).reduce((s,f) => s + meter(f.breite)*meter(f.hoehe), 0);
  const A_tuer_aussen = (r.tueren||[]).filter(t=>t.art==='aussen'||t.art==='keller').reduce((s,t) => s + meter(t.breite)*meter(t.hoehe), 0);
  const A_tuer_innen  = (r.tueren||[]).filter(t=>t.art!=='aussen'&&t.art!=='keller').reduce((s,t) => s + meter(t.breite)*meter(t.hoehe), 0);

  // Nieschen-Volumen: Σ(B×H×T) - Meterwerte
  const V_nieschen = (r.nieschen||[]).reduce((s,ni) => s + meter(ni.breite)*meter(ni.hoehe)*meter(ni.tiefe), 0);

  // Vorsprünge-Fläche: Σ(B×T) über alle Vorsprünge, Volumen × h - Meterwerte
  const A_vsp = (r.vorspruenge||[]).reduce((s,v) => s + meter(v.breite)*meter(v.tiefe), 0);
  const V_vorsprunge = A_vsp * h;

  // Schräge: Excel B63 = ((h−kniestock)² × tan(α)) / 2 - Kniestock in Meter
  const kniestock = meter(r.sch_kniestock);
  const winkel    = parseFloat(r.sch_winkel) || 0;
  const richtung  = r.sch_richtung || 'N';
  let A_schraege_proj = 0, A_schraege_real = 0, V_schraege = 0;
  if (kniestock > 0 && winkel > 0 && h > kniestock) {
    const h_rel = h - kniestock;
    const tanA  = Math.tan(winkel * Math.PI / 180);
    const cosA  = Math.cos(winkel * Math.PI / 180);
    A_schraege_proj = (h_rel * tanA * h_rel) / 2; // Excel-Projektionsfläche
    // Länge der Schräge (Hypothenuse): h_rel / sin(α), mal Wandlänge → Heizlastfläche
    const wandLen = richtung==='N'?(n1+n2):richtung==='O'?(o1+o2):richtung==='S'?(s1+s2):(w1+w2);
    A_schraege_real = (h_rel / (cosA > 0.01 ? cosA : 1)) * wandLen; // tatsächliche Fläche
    V_schraege = A_schraege_proj * wandLen; // Excel E58
  }

  // Gaube-Volumen: Excel E59 = (((C51−B47)×(tan(α)×(h−B47)))/2)×B51
  let V_gaube = 0;
  const gaube_b = meter(r.gaube_breite);
  const gaube_h = meter(r.gaube_lichtehoehe);
  if (gaube_b>0 && gaube_h>0 && kniestock>0 && winkel>0 && h>kniestock) {
    const tanA = Math.tan(winkel * Math.PI / 180);
    V_gaube = (((gaube_h - kniestock) * (tanA * (h - kniestock))) / 2) * gaube_b;
  }

  const V_brutto   = A_boden * h;
  const V_abzgl    = V_vorsprunge + V_schraege;
  const V_zusaetzl = V_gaube + V_nieschen;
  const V_netto    = V_brutto - V_abzgl + V_zusaetzl;

  return { h, A_boden, A_fenster, A_tuer_aussen, A_tuer_innen,
           A_wN, A_wO, A_wS, A_wW, A_wand_aw, A_wand_iw, A_wand_unbekannt,
           A_schraege_proj, A_schraege_real,
           A_vsp, V_nieschen, V_vorsprunge, V_schraege, V_gaube,
           V_brutto, V_abzgl, V_zusaetzl, V_netto };
}

// Liefert für eine Wandart ('AW'/'IW') den direkt erfassten "angrenzenden Bereich"
// (wand_*_grenzt) der ersten passenden Wandrichtung mit gesetztem Wert - als
// Vorbelegungs-Vorschlag für die aggregierte U-Wert/Heizlast-Auswahl. Rein
// informativ abgeleitet aus der neuen, granuleren Wanderfassung; baut KEINE
// neue, eigenständige Heizlastmethodik (die bestehende AW/IW-Berechnung mit
// fester Bauteilgruppen-Auswahl bleibt unverändert führend).
function wandGrenztDefault(r, art) {
  const dirs = [['n','wand_n_art','wand_n_grenzt'],['o','wand_o_art','wand_o_grenzt'],
                ['s','wand_s_art','wand_s_grenzt'],['w','wand_w_art','wand_w_grenzt']];
  for (const [,artKey,grenztKey] of dirs) {
    if (r[artKey] === art && r[grenztKey]) return r[grenztKey];
  }
  return null;
}

// ============================================================
//  HEIZLAST-DEFAULTS: effektiver Wert nach Prioritätskette
// ============================================================
// Priorität: 1. Raum-Override (heizlastOverrides) > 2. projektweiter
// Heizlast-Default (heizlastDefaults) > 3. bestehender Fallbackwert
// (z.B. r.u_werte je Bauteilfläche) > 4. leer/unbekannt.
// Liefert { wert: number|null, quelle: string } - keine stillschweigend
// erfundenen Werte: bleibt der Wert unbekannt, wird das transparent gemeldet.
function getEffektiverHeizlastWert(r, p, feldKey, fallbackUWerteKey) {
  const ov = (r && r.heizlastOverrides) ? r.heizlastOverrides[feldKey] : undefined;
  if (ov !== undefined && ov !== null && ov !== '' && !isNaN(parseFloat(ov))) {
    return { wert: parseFloat(ov), quelle: 'Raum-Override' };
  }
  const def = (p && p.heizlastDefaults) ? p.heizlastDefaults[feldKey] : undefined;
  if (def !== undefined && def !== null && def !== '' && !isNaN(parseFloat(def))) {
    return { wert: parseFloat(def), quelle: 'Projekt-Standard' };
  }
  if (fallbackUWerteKey && r && r.u_werte) {
    const alt = r.u_werte[fallbackUWerteKey];
    if (alt !== undefined && alt !== null && alt !== '' && !isNaN(parseFloat(alt))) {
      return { wert: parseFloat(alt), quelle: 'Bestandswert (Raum)' };
    }
  }
  return { wert: null, quelle: 'unbekannt' };
}

// ============================================================
//  HEIZLAST-HILFSKONSTANTEN (verschoben aus index.html)
// ============================================================
// Zuordnung Bauteilflaeche-Key -> Feld in heizlastDefaults/heizlastOverrides
// (Prioritaetskette: Raum-Override > Projekt-Standard > Bestandswert).
// Wand "Art unbekannt" konservativ wie Aussenwand (transparent gekennzeichnet,
// nicht stillschweigend - damit Berechnung fuer Bestandsraeume ohne AW/IW-
// Zuordnung nicht lautlos 0 wird - siehe known-issues KI-007).
const HL_FELD_MAP = {
  aw: 'awUwert', iw: 'iwUwert', wand_unbekannt: 'awUwert',
  fenster: 'fensterUwert', tuer_a: 'tuerUwert', tuer_i: 'tuerUwert',
  boden: 'bodenplatteUwert', decke: 'bodenUwert', schraege: 'dachUwert',
};

// Bestandswert-Fallback je Bauteilflaeche (Stufe 3 der Prioritaetskette):
// "Wand Art unbekannt" nutzt den bisherigen gemeinsamen Wand-U-Wert (u_werte.aw),
// da diese Flaeche vor der AW/IW-Trennung dort gepflegt wurde.
function hlFallbackKey(surfaceKey) {
  return surfaceKey === 'wand_unbekannt' ? 'aw' : surfaceKey;
}

// ============================================================
//  BAUTEILFLAECHEN (reine Datenfunktion)
// ============================================================
// Liefert die relevanten Bauteilflaechen eines Raums als Array von
// {key, label, A, ga_def, vis, typ} – identische Logik wie der
// bisherige surfaces-Array in renderUWertInputs().
// Kein DOM-Zugriff, keine Seiteneffekte, kein window._lastSurfaces.
// Liefert nur Flaechen mit A > 0.001 und vis === true.
function berechneRaumFlaechen(r, geo) {
  var awGrenzt = wandGrenztDefault(r, 'AW');
  var awGaVorschlag = (awGrenzt && FX[awGrenzt]) ? awGrenzt : 'aussen';
  var iwGrenzt = wandGrenztDefault(r, 'IW');
  var iwGaVorschlag = (iwGrenzt === 'beheizt' || iwGrenzt === 'unbeheizt') ? iwGrenzt : 'beheizt';
  var A_aw_netto = Math.max(0, geo.A_wand_aw - geo.A_fenster - geo.A_tuer_aussen);
  return [
    { key: 'aw',            label: 'Au\xdfenwand (AW)',          A: A_aw_netto,          ga_def: awGaVorschlag, vis: true,                          typ: 'aw' },
    { key: 'iw',            label: 'Innenwand (IW)',              A: geo.A_wand_iw,        ga_def: iwGaVorschlag, vis: geo.A_wand_iw > 0.001,         typ: 'iw' },
    { key: 'wand_unbekannt',label: 'Wand – Art unbekannt', A: geo.A_wand_unbekannt, ga_def: 'aussen',      vis: geo.A_wand_unbekannt > 0.001,  typ: 'unbekannt' },
    { key: 'fenster',       label: 'Fenster',                    A: geo.A_fenster,        ga_def: 'aussen',      vis: geo.A_fenster > 0.001,         typ: 'aussen' },
    { key: 'tuer_a',        label: 'Au\xdfent\xfcr',              A: geo.A_tuer_aussen,    ga_def: 'aussen',      vis: geo.A_tuer_aussen > 0.001,     typ: 'aussen' },
    { key: 'tuer_i',        label: 'Innent\xfcr',                A: geo.A_tuer_innen,     ga_def: 'beheizt',     vis: geo.A_tuer_innen > 0.001,      typ: 'aussen' },
    { key: 'boden',         label: 'Boden',                      A: geo.A_boden,          ga_def: 'erdreich',    vis: true,                          typ: 'aussen' },
    { key: 'decke',         label: 'Decke',                      A: geo.A_boden,          ga_def: 'dach_kalt',   vis: true,                          typ: 'aussen' },
    { key: 'schraege',      label: 'Dachschr\xe4ge',             A: geo.A_schraege_real,  ga_def: 'aussen',      vis: geo.A_schraege_real > 0.001,   typ: 'aussen' },
  ].filter(function(s) { return s.vis && s.A > 0.001; });
}

// ============================================================
//  HEIZLASTSUMME PROJEKT (reine Datenfunktion)
// ============================================================
// Berechnet die ueberschlaegige Heizlastsumme eines Projekts ueber alle
// Geschosse und Raeume. Reine Datenfunktion – kein DOM-Zugriff, keine
// Speicherung. Verwendet dieselbe Berechnungslogik wie renderHeizlastErgebnis()
// in der Einzelraum-Ansicht (Phi_T = Sigma A * U * fx * DeltaT je Bauteil).
// Liefert { phi_gesamt, raeume_gesamt, raeume_mit_wert }.
//   phi_gesamt       – Summe aller Raum-Heizlasten in W
//   raeume_gesamt    – Anzahl aller gefundenen Raeume
//   raeume_mit_wert  – Raeume mit mindestens einer Bauteilflaeche mit U-Wert
// Raeume ohne verwertbare U-Werte tragen 0 bei und werden nicht mitgezaehlt.
// Kein normativer Heizlastnachweis nach DIN EN 12831.
function berechneHeizlastProjekt(p) {
  if (!p || !p.geschosse) return { phi_gesamt: 0, raeume_gesamt: 0, raeume_mit_wert: 0 };
  var hd = p.heizlastDefaults || {};
  var tAussenParsed = parseFloat(hd.tempAussenNorm);
  var thetaE = (!isNaN(tAussenParsed)) ? tAussenParsed : THETA_E;
  var defTU = hd.tempUnbeheiztDefault;
  var tUnbeheiztProjekt = (defTU !== undefined && defTU !== null && defTU !== '' && !isNaN(parseFloat(defTU))) ? parseFloat(defTU) : 7;
  var phi_gesamt = 0;
  var raeume_gesamt = 0;
  var raeume_mit_wert = 0;
  (p.geschosse || []).forEach(function(g) {
    (g.raeume || []).forEach(function(r) {
      raeume_gesamt++;
      var geo = berechneRaumGeometrie(r);
      var surfaces = berechneRaumFlaechen(r, geo);
      var ti = parseFloat(r.normtemp) || 20;
      var dT = ti - thetaE;
      var ovTU = (r.heizlastOverrides || {}).tempUnbeheizt;
      var tUnbeheizt = (ovTU !== undefined && ovTU !== null && ovTU !== '' && !isNaN(parseFloat(ovTU))) ? parseFloat(ovTU) : tUnbeheiztProjekt;
      var dT_unbeheizt = ti - tUnbeheizt;
      var phi_raum = 0;
      var hat_wert = false;
      var ga = r.grenzt_an || {};
      surfaces.forEach(function(s) {
        var feldKey = HL_FELD_MAP[s.key];
        var eff = getEffektiverHeizlastWert(r, p, feldKey, hlFallbackKey(s.key));
        var U = eff.wert;
        if (U === null || U <= 0) return;
        var fx, dTs;
        if (s.typ === 'iw') {
          var gk = ga[s.key] || s.ga_def;
          if (gk === 'unbeheizt') { fx = 1; dTs = dT_unbeheizt; }
          else { fx = FX.beheizt.fx; dTs = dT; }
        } else {
          var gk2 = ga[s.key] || s.ga_def;
          fx = FX[gk2] ? FX[gk2].fx : 1.0;
          dTs = dT;
        }
        phi_raum += s.A * U * fx * dTs;
        hat_wert = true;
      });
      phi_gesamt += phi_raum;
      if (hat_wert) raeume_mit_wert++;
    });
  });
  return { phi_gesamt: phi_gesamt, raeume_gesamt: raeume_gesamt, raeume_mit_wert: raeume_mit_wert };
}
