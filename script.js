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
