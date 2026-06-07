function closeAllModals() {
  document.getElementById('modal-overlay').classList.remove('open');
  ['modal-geschoss','modal-copy-room','modal-settings'].forEach(id => {
    document.getElementById(id).classList.remove('open');
  });
}
// Legacy alias
const closeModal = closeAllModals;

function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// Toggle optionaler Raum-Sektionen (Vorsprünge, Dachschräge)
function toggleRaumSection(key) {
  const card = document.getElementById('r-' + key + '-card');
  const btn  = document.getElementById('r-' + key + '-toggle-btn');
  if (!card || !btn) return;
  const open = card.style.display !== 'none';
  const labels = {
    vsp:      { plus: '+ Vorsprünge erfassen',    minus: '− Vorsprünge' },
    schraege: { plus: '+ 🔺 Dachschräge / Gaube', minus: '− 🔺 Dachschräge / Gaube' }
  };
  card.style.display = open ? 'none' : 'block';
  const lbl = labels[key] || { plus: '+', minus: '−' };
  btn.innerHTML = open
    ? '<span style="font-size:18px;line-height:1;">+</span> ' + lbl.plus.replace(/^\+ /, '')
    : '<span style="font-size:18px;line-height:1;">−</span> ' + lbl.minus.replace(/^− /, '');
}
