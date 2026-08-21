const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Make the research overview a first-screen element on the Vietnamese homepage.
// It is moved inside the hero so visitors see the research identity without opening another page.
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
  const hero = document.querySelector(".hero");
  const research = document.querySelector("#research");
  if (hero && research) {
    research.classList.remove("section", "alt");
    research.classList.add("hero-research");
    hero.appendChild(research);

    const overviewStyle = document.createElement("style");
    overviewStyle.textContent = `
      .hero{padding-bottom:42px}
      .hero-research{position:relative;margin-top:38px;padding:0 0 10px}
      .hero-research .container{width:min(1440px,calc(100% - 44px))}
      .hero-research .section-kicker{margin-bottom:6px}
      .hero-research h2{margin-bottom:8px}
      .hero-research .plain-note{max-width:980px;margin-bottom:18px}
      .hero-research .research-map{margin-top:0;background:#fff;border:1px solid rgba(216,227,233,.95);border-radius:24px;overflow:hidden;box-shadow:0 22px 54px rgba(18,52,77,.10)}
      .hero-research .research-map img{display:block;width:100%;height:auto}
      @media(max-width:900px){
        .hero-research{margin-top:30px}
        .hero-research .container{width:min(1440px,calc(100% - 28px))}
        .hero-research .research-map{border-radius:16px}
      }
    `;
    document.head.appendChild(overviewStyle);
  }
}

// Keep conceptual diagrams consistent with the selected language.
if (window.location.pathname.startsWith("/en/")) {
  document.querySelectorAll('img[src*="research-map.svg"]').forEach(img => {
    img.src = img.src.replace("research-map.svg", "research-map-en.svg");
  });
  document.querySelectorAll('img[src*="hybrid-water-intelligence.svg"]').forEach(img => {
    img.src = img.src.replace("hybrid-water-intelligence.svg", "hybrid-water-intelligence-en.svg");
  });
  document.querySelectorAll('img[src*="surrogate-modelling.svg"]').forEach(img => {
    img.src = img.src.replace("surrogate-modelling.svg", "surrogate-modelling-en.svg");
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(item => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });

  revealItems.forEach(item => observer.observe(item));
}
