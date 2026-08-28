const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// VI and EN are the two primary versions of the site.
// Keep the research overview visually identical and concise on both pages.
const path = window.location.pathname;
const isVi = path === '/' || path.endsWith('/index.html') && !path.startsWith('/en/');
const isEn = path.startsWith('/en/');

if (isVi || isEn) {
  const research = document.querySelector('#research');
  if (research) {
    const secondaryHeading = research.querySelector('h2');
    const intro = research.querySelector('.overview-intro, .plain-note');
    if (secondaryHeading) secondaryHeading.remove();
    if (intro) intro.remove();
  }
}

if (isEn) {
  const overviewImage = document.querySelector('#research img');
  if (overviewImage) {
    // Use the exact same approved artwork as the Vietnamese homepage.
    overviewImage.src = '../assets/research-overview-hero-vi.png?v=20260828-shared';
    overviewImage.alt = 'Research overview: water science, modelling, data and AI';
    overviewImage.loading = 'eager';
    overviewImage.decoding = 'sync';
  }
}
