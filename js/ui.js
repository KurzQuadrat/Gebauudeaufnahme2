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

// Toggle optionaler Raum-Sektionen (Vorsprünge, Dachschräge / Gaube)
function toggleRaumSection(key) {
  const card = document.getElementById('r-' + key + '-card');
  const btn  = document.getElementById('r-' + key + '-toggle-btn');
  if (!card || !btn) return;
  const open = card.style.display !== 'none';
  card.style.display = open ? 'none' : 'block';
  btn.textContent = open ? '+ Erfassen' : '− Ausblenden';
}
