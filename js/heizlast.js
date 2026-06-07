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

function berechneRaumGeometrie(r) {
  const hRaw = parseMesswert(r.deckenhoehe);
  const h = isNaN(hRaw) ? 0 : hRaw;
  const n1=cm(r.wand_n1), n2=cm(r.wand_n2);
  const o1=cm(r.wand_o1), o2=cm(r.wand_o2);
  const s1=cm(r.wand_s1), s2=cm(r.wand_s2);
  const w1=cm(r.wand_w1), w2=cm(r.wand_w2);

  // Excel-Formel B56: =((B8+D8)/2)*((C8+E8)/2)  [N1,O1,S1,W1]
  const A_boden = ((n1+s1)/2) * ((o1+w1)/2);

  // Wandflächen: h × (seg1 + seg2)
  const A_wN = h*(n1+n2), A_wO = h*(o1+o2);
  const A_wS = h*(s1+s2), A_wW = h*(w1+w2);

  // Öffnungen (cm → m²)
  const A_fenster = (r.fenster||[]).reduce((s,f) => s + cm(f.breite)*cm(f.hoehe), 0);
  const A_tuer_aussen = (r.tueren||[]).filter(t=>t.art==='aussen'||t.art==='keller').reduce((s,t) => s + cm(t.breite)*cm(t.hoehe), 0);
  const A_tuer_innen  = (r.tueren||[]).filter(t=>t.art!=='aussen'&&t.art!=='keller').reduce((s,t) => s + cm(t.breite)*cm(t.hoehe), 0);

  // Nieschen-Volumen: Σ(B×H×T)
  const V_nieschen = (r.nieschen||[]).reduce((s,ni) => s + cm(ni.breite)*cm(ni.hoehe)*cm(ni.tiefe), 0);

  // Vorsprünge-Fläche: Σ(B×T) über alle Vorsprünge, Volumen × h
  const A_vsp = (r.vorspruenge||[]).reduce((s,v) => s + cm(v.breite)*cm(v.tiefe), 0);
  const V_vorsprunge = A_vsp * h;

  // Schräge: Excel B63 = ((h−kniestock)² × tan(α)) / 2
  const kniestock = cm(r.sch_kniestock);
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
  const gaube_b = cm(r.gaube_breite);
  const gaube_h = cm(r.gaube_lichtehoehe);
  if (gaube_b>0 && gaube_h>0 && kniestock>0 && winkel>0 && h>kniestock) {
    const tanA = Math.tan(winkel * Math.PI / 180);
    V_gaube = (((gaube_h - kniestock) * (tanA * (h - kniestock))) / 2) * gaube_b;
  }

  const V_brutto   = A_boden * h;
  const V_abzgl    = V_vorsprunge + V_schraege;
  const V_zusaetzl = V_gaube + V_nieschen;
  const V_netto    = V_brutto - V_abzgl + V_zusaetzl;

  return { h, A_boden, A_fenster, A_tuer_aussen, A_tuer_innen,
           A_wN, A_wO, A_wS, A_wW, A_schraege_proj, A_schraege_real,
           A_vsp, V_nieschen, V_vorsprunge, V_schraege, V_gaube,
           V_brutto, V_abzgl, V_zusaetzl, V_netto };
}
