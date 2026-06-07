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
