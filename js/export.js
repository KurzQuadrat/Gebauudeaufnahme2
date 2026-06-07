// ============================================================
//  EXPORT
// ============================================================
function generateExportText(p) {
  let out=''; const L=t=>out+=t+'\n'; const H=t=>{out+='\n'+'='.repeat(50)+'\n';L(t);out+='='.repeat(50)+'\n';}; const S=t=>{out+='\n'+'-'.repeat(35)+'\n';L(t);out+='-'.repeat(35)+'\n';};
  H('GEBAUDEAUFNAHME: '+p.name); L('Adresse: '+(p.adresse||'-')); L('Datum:   '+(p.datum||'-')); L('Baujahr: '+(p.baujahr||'-')); L('Typ:     '+(p.typ||'-')); L('PLZ:     '+(p.plz||'-'));
  H('1. PROJEKTEINGABE'); L('-> PLZ/Klimadaten: '+(p.plz||'___'));
  H('2. SANIERUNGSHISTORIE'); if(p.sanierungen.length)p.sanierungen.forEach(s=>L('  '+(s.massnahme||'-')+' - '+(s.jahr||'????')+(s.details?' - '+s.details:''))); else L('  Keine Sanierungen');
  H('3. HEIZANLAGE'); L('  '+(p.heizanlage.hersteller||'-')+' / '+(p.heizanlage.typ||'-')+' / BJ '+(p.heizanlage.baujahr||'-'));
  H('4. GEBAEUDE IN HottCAD');
  p.geschosse.forEach((g,gi)=>{
    S('GESCHOSS '+(gi+1)+': '+g.name+' ['+g.beheizung+']'); L('  Bodendicke: '+(g.bodendicke?g.bodendicke+' cm':'-'));
    if(g.isDG||g.name==='DG'){L('  Kniestock: '+(g.dach_kniestock||'-')+' cm / Neigung: '+(g.dach_winkel||'-')+'°');(g.gauben||[]).forEach((ga,i)=>L('  Gaube '+(i+1)+': B='+ga.lichte_breite+' UK='+ga.boden_uk+' KS='+ga.kniestock+' H='+ga.lichte_hoehe+' cm'));}
    g.raeume.forEach((r,ri)=>{
      L(''); L('  RAUM '+(ri+1)+': '+r.name+(r.nutzung?' ['+r.nutzung+']':'')+(r.beheizt?'':' [UNBEHEIZT]'));
      L('    h='+(r.deckenhoehe||'-')+'m / '+(r.bodenbelag||'-')+(r.normtemp?' / '+r.normtemp+'°C':''));
      if(r.aw_dicke)L('    AW: '+r.aw_dicke+' cm'+(r.aw_typ?' / '+r.aw_typ:'')+(r.aw_daemmung?' / gedammt':''));
      if(r.iw_dicke)L('    IW: '+r.iw_dicke+' cm'+(r.iw_typ?' / '+r.iw_typ:''));
      try{if(r.wand_n1||r.wand_o1){const geo=berechneRaumGeometrie(r);L('    A_Boden='+geo.A_boden.toFixed(2)+'m2 / V_Netto='+geo.V_netto.toFixed(2)+'m3');}}catch(e){}
      if(r.fenster.length){L('    FENSTER ('+r.fenster.length+'):');r.fenster.forEach((f,fi)=>L('      F'+(fi+1)+': '+(f.breite&&f.hoehe?f.breite+'x'+f.hoehe:'-x-')+' cm'+(f.verglasung?' / '+f.verglasung:'')+(f.uw?' Uw='+f.uw:'')));}
      if(r.tueren.length){L('    TUEREN ('+r.tueren.length+'):');r.tueren.forEach((t,ti)=>L('      T'+(ti+1)+': '+(t.breite&&t.hoehe?t.breite+'x'+t.hoehe:'-x-')+' cm / '+t.art));}
      if(r.heizkoerper.length){L('    HEIZKOERPER ('+r.heizkoerper.length+'):');r.heizkoerper.forEach((hk,hi)=>L('      HK'+(hi+1)+': Typ '+hk.typ+(hk.breite&&hk.hoehe?' / '+hk.breite+'x'+hk.hoehe+' cm':'')+(hk.hersteller?' / '+hk.hersteller:'')+(hk.ventil_hersteller?' Ventil: '+hk.ventil_hersteller:'')+(hk.ventil_voreinstellung?' V='+hk.ventil_voreinstellung:'')));}
    });
  });
  H('5. FENSTERLISTE'); let fn=1; p.geschosse.forEach(g=>g.raeume.forEach(r=>r.fenster.forEach(f=>L('  F'+(fn++)+': '+g.name+' / '+r.name+' | '+(f.breite&&f.hoehe?f.breite+'x'+f.hoehe:'-x-')+' | '+(f.verglasung||'-')+(f.uw?' Uw='+f.uw:'')))));
  H('6. HEIZKOERPERLISTE'); let hn=1; p.geschosse.forEach(g=>g.raeume.forEach(r=>r.heizkoerper.forEach(hk=>L('  HK'+(hn++)+': '+g.name+' / '+r.name+' | Typ '+hk.typ+(hk.breite&&hk.hoehe?' | '+hk.breite+'x'+hk.hoehe:'')+(hk.hersteller?' | '+hk.hersteller:'')+(hk.ventil_hersteller?' Ventil: '+hk.ventil_hersteller:'')+(hk.ventil_voreinstellung?' V='+hk.ventil_voreinstellung:'')))));
  H('7. CHECKLISTE'); [['Baujahr',!!p.baujahr],['Heizanlage',!!p.heizanlage.typ],['PLZ',!!p.plz],['Geschosse',p.geschosse.length>0],['Alle Deckenhoehen',p.geschosse.every(g=>g.raeume.every(r=>r.deckenhoehe))]].forEach(([l,ok])=>L('  '+(ok?'OK':'XX')+' '+l));
  return out;
}

function exportProjekt() { const p=getProjekt(); document.getElementById('export-content').textContent=generateExportText(p); document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById('view-export').classList.add('active'); window.scrollTo(0,0); }
function exportAll() { if(!state.projekte.length){alert('Keine Projekte');return;} const all=state.projekte.map(p=>generateExportText(p)).join('\n\n'+'X'.repeat(60)+'\n\n'); const blob=new Blob([all],{type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob),a=document.createElement('a'); a.href=url;a.download='aufnahme_alle.txt';a.click(); }
function copyExport() { const text=document.getElementById('export-content').textContent; if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>showToast('Kopiert'));}else{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('Kopiert');} }
function downloadJSON() { const p=getProjekt()||state.projekte[0]; if(!p){alert('Kein Projekt');return;} const blob=new Blob([JSON.stringify(p,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob),a=document.createElement('a'); a.href=url;a.download=(p.name||'projekt').replace(/[^a-zA-Z0-9]/g,'_')+'.json';a.click(); }
function importJSON(input) { const file=input.files[0]; if(!file) return; const rd=new FileReader(); rd.onload=e=>{try{const data=JSON.parse(e.target.result);const pjs=Array.isArray(data)?data:[data];pjs.forEach(p=>{if(!p.id)p.id=uuid();const idx=state.projekte.findIndex(ex=>ex.id===p.id);if(idx>=0){if(confirm('Projekt "'+p.name+'" ueberschreiben?'))state.projekte[idx]=p;}else state.projekte.push(p);});save();renderProjektliste();showToast('Importiert: '+pjs.map(p=>p.name).join(', '));}catch(err){alert('Importfehler: '+err.message);}};rd.readAsText(file);input.value=''; }
