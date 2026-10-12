const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const isOpen = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const cards = [...document.querySelectorAll('.project-card')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
  let count = 0;
  cards.forEach(card => { const visible = button.dataset.filter === 'all' || card.dataset.category.split(' ').includes(button.dataset.filter); card.hidden = !visible; if (visible) count++; });
  document.querySelector('#filter-status').textContent = `${count} projects shown.`;
}));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const roles = ['SOC & detection automation', 'Threat hunting & incident response', 'Application & AI security'];
let roleIndex = 0;
setInterval(() => { if (!reducedMotion.matches && !document.hidden) { roleIndex = (roleIndex + 1) % roles.length; document.querySelector('#rotating-role').textContent = roles[roleIndex]; } }, 3500);
const progress = document.querySelector('.scroll-progress');
let scrollPending = false;
function updateProgress() { const total = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${total > 0 ? window.scrollY / total * 100 : 0}%`; scrollPending = false; }
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { if (!reducedMotion.matches) entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
  document.querySelectorAll('.section-heading,.about-copy,.project-card,.timeline article,.skill-grid article').forEach(element => observer.observe(element));
  const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('aminetrabelssi14@gmail.com'); status.textContent = 'Email copied to clipboard.'; }
  catch { status.textContent = 'Select and copy: aminetrabelssi14@gmail.com'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
