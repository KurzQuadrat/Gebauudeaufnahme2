let state = {
  projekte: [],
  aktivesProjektId: null,
  aktivesGeschossId: null,
  aktivesRaumId: null,
  aktivesView: 'projekte'
};

function save() {
  localStorage.setItem('gebaeudeaufnahme_v1', JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem('gebaeudeaufnahme_v1');
  if (raw) {
    try { state = JSON.parse(raw); } catch(e) {}
  }
  if (!state.projekte) state.projekte = [];
  // Rückwärtskompatibilität: fehlende Felder ergänzen
  state.projekte.forEach(p => {
    p.geschosse.forEach(g => {
      if (!g.gauben) g.gauben = [];
      if (!g.dachfenster) g.dachfenster = [];
      if (g.isDG === undefined) g.isDG = (g.name === 'DG');
      if (!g.dach_kniestock) g.dach_kniestock = '';
      if (!g.dach_winkel) g.dach_winkel = '';
      g.raeume.forEach(r => {
        if (!r.iw_dicke) r.iw_dicke = '';
        if (!r.iw_typ) r.iw_typ = '';
        if (!r.nieschen) r.nieschen = [];
        if (!r.u_werte) r.u_werte = {};
        if (!r.grenzt_an) r.grenzt_an = {};
        ['wand_n1','wand_n2','wand_o1','wand_o2','wand_s1','wand_s2','wand_w1','wand_w2',
         'vsp_n_b','vsp_n_t','vsp_o_b','vsp_o_t','vsp_s_b','vsp_s_t','vsp_w_b','vsp_w_t',
         'sch_kniestock','sch_winkel','sch_richtung','gaube_breite','gaube_lichtehoehe'].forEach(f => {
          if (r[f] === undefined) r[f] = f === 'sch_richtung' ? 'N' : '';
        });
      });
    });
  });
}

function uuid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getProjekt() {
  return state.projekte.find(p => p.id === state.aktivesProjektId);
}

function saveProjektField(field, value) {
  const p = getProjekt();
  if (!p) return;
  p[field] = value;
  save();
}

function saveHeizanlageField(field, value) {
  const p = getProjekt();
  if (!p) return;
  p.heizanlage[field] = value;
  save();
}

function saveSchornsteinField(field, value) {
  const p = getProjekt();
  if (!p) return;
  p.schornstein[field] = value;
  save();
}

function saveSanierungField(id, field, value) {
  const p = getProjekt();
  const s = p.sanierungen.find(s => s.id === id);
  if (s) { s[field] = value; save(); }
}

function getGeschoss() {
  const p = getProjekt();
  if (!p) return null;
  return p.geschosse.find(g => g.id === state.aktivesGeschossId);
}

function saveLastIW() {
  const r = getRaum();
  if (!r) return;
  if (r.iw_dicke || r.iw_typ) {
    state.last_iw = { dicke: r.iw_dicke, typ: r.iw_typ };
    save();
  }
}

function saveGeschossField(field, value) {
  const g = getGeschoss();
  if (!g) return;
  g[field] = value;
  save();
}

function getRaum() {
  const g = getGeschoss();
  if (!g) return null;
  return g.raeume.find(r => r.id === state.aktivesRaumId);
}

function saveNiescheField(id, field, value) {
  const r = getRaum();
  const n = (r.nieschen || []).find(x => x.id === id);
  if (n) { n[field] = value; save(); }
}

function saveFensterField(id,field,value) { const r=getRaum(); const f=r.fenster.find(f=>f.id===id); if(f){f[field]=value;save();} }

function saveTuerField(id,field,value) { const r=getRaum(); const t=r.tueren.find(t=>t.id===id); if(t){t[field]=value;save();} }

function saveHKField(id,field,value) { const r=getRaum(); const hk=r.heizkoerper.find(h=>h.id===id); if(hk){hk[field]=value;save();} }

function saveGaubeField(id,field,value) { const g=getGeschoss(); const ga=(g.gauben||[]).find(x=>x.id===id); if(ga){ga[field]=value;save();} }

function saveDachfensterField(id,field,value) { const g=getGeschoss(); const df=(g.dachfenster||[]).find(x=>x.id===id); if(df){df[field]=value;save();} }

