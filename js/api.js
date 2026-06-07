function handleFoto(input, key) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const b64 = e.target.result;
    if (key === 'heizanlage') {
      const p = getProjekt();
      p.heizanlage_foto = b64;
      save();
      document.getElementById('foto-heizanlage-label').classList.add('has-photo');
      document.getElementById('foto-heizanlage-label').querySelector('span').textContent = '✓';
      const prev = document.getElementById('foto-heizanlage-preview');
      prev.src = b64; prev.style.display = 'block';
      // KI-Analyse
      const res = await analyzePhoto(b64, 'heizanlage');
      if (res) {
        if (res.hersteller) { p.heizanlage.hersteller = res.hersteller; document.getElementById('p-hz-hersteller').value = res.hersteller; }
        if (res.typ) { p.heizanlage.typ = res.typ; document.getElementById('p-hz-typ').value = res.typ; }
        if (res.modell) { p.heizanlage.modell = res.modell; document.getElementById('p-hz-modell').value = res.modell; }
        if (res.baujahr) { p.heizanlage.baujahr = res.baujahr; document.getElementById('p-hz-baujahr').value = res.baujahr; }
        save();
        showToast('✓ Heizanlage erkannt: ' + Object.values(res).filter(Boolean).join(' · '));
      }
    }
    const cb = window._fotoCallback;
    if (cb) { cb(b64); window._fotoCallback = null; }
  };
  reader.readAsDataURL(file);
}

function showAnalyzing(on) {
  document.getElementById('analyzing-overlay').classList.toggle('show', on);
}

// ============================================================
//  KI-FOTO-ANALYSE
// ============================================================
async function analyzePhoto(base64DataUrl, context) {
  const apiKey = localStorage.getItem('anthropic_key') || '';
  if (!apiKey) return null;
  const prompts = {
    heizanlage: 'Du siehst eine Heizanlage oder deren Typenschild. Extrahiere als JSON: {"hersteller":null,"modell":null,"typ":null,"baujahr":null}. Typ muss einer sein von: Gas-Brennwert, Gas-Therme, Öl-Brennwert, Öl-Therme, Wärmepumpe, Pellet, Fernwärme, Elektro. Nur JSON ausgeben.',
    heizkoerper: 'Du siehst einen Heizkörper oder dessen Typenschild. Extrahiere als JSON: {"hersteller":null,"typ":null,"breite_cm":null,"hoehe_cm":null}. Typ ist eine Zahl wie 10,11,20,21,22,33 etc. Nur JSON.',
    ventil: 'Du siehst ein Heizkörperventil. Extrahiere als JSON: {"hersteller":null,"ventil_typ":null,"voreinstellung":null}. ventil_typ: thermostat|hand|durchgang. Nur JSON.',
    fenster: 'Du siehst ein Fenster oder Fenster-Typenschild. Extrahiere als JSON: {"verglasung":null,"uw":null,"rahmen":null,"notiz":null}. verglasung: 1-fach|2-fach|3-fach. rahmen: kunststoff|holz|alu|holz-alu. Nur JSON.'
  };
  try {
    showAnalyzing(true);
    const imgData = base64DataUrl.split(',')[1];
    const mtype = base64DataUrl.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-allow-browser': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: mtype, data: imgData } },
          { type: 'text', text: prompts[context] || prompts.heizanlage }
        ]}]
      })
    });
    showAnalyzing(false);
    if (!resp.ok) { showToast('Analyse fehlgeschlagen (' + resp.status + ')'); return null; }
    const data = await resp.json();
    const text = (data.content[0].text || '').trim();
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const result = JSON.parse(match[0]);
    // Remove null values
    Object.keys(result).forEach(k => { if (result[k] === null || result[k] === '') delete result[k]; });
    return Object.keys(result).length ? result : null;
  } catch(e) {
    showAnalyzing(false);
    showToast('Analyse-Fehler: ' + e.message);
    return null;
  }
}
