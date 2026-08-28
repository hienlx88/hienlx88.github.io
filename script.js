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
// Keep the research overview visually consistent and concise on both pages.
const path = window.location.pathname;
const isVi = path === '/' || (path.endsWith('/index.html') && !path.startsWith('/en/'));
const isEn = path.startsWith('/en/');

if (isVi || isEn) {
  const research = document.querySelector('#research');
  if (research) {
    const kicker = research.querySelector('.section-kicker');
    const secondaryHeading = research.querySelector('h2');
    const intro = research.querySelector('.overview-intro, .plain-note');

    if (secondaryHeading) secondaryHeading.remove();
    if (intro) intro.remove();

    if (kicker) {
      kicker.style.fontSize = '32px';
      kicker.style.lineHeight = '1.2';
      kicker.style.fontWeight = '800';
      kicker.style.letterSpacing = '-0.015em';
      kicker.style.textTransform = 'none';
      kicker.style.color = '#12344d';
      kicker.style.marginBottom = '18px';
    }

    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
      @media (max-width: 560px) {
        .hero-overview .section-kicker {
          font-size: 27px !important;
          margin-bottom: 14px !important;
        }
      }
    `;
    document.head.appendChild(responsiveStyle);
  }
}

if (isEn) {
  const overviewImage = document.querySelector('#research img');
  if (overviewImage) {
    // Until a pixel-matched English artwork is approved, use the exact approved VI artwork.
    overviewImage.src = '../assets/research-overview-hero-vi.png?v=20260828-shared';
    overviewImage.alt = 'Research overview: water science, modelling, data and AI';
    overviewImage.loading = 'eager';
    overviewImage.decoding = 'sync';
  }
}
