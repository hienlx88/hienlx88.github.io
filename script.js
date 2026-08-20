document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

// Add a dedicated Research Hub entry without overloading the academic homepage.
if (nav && !nav.querySelector('a[href="research-hub.html"]')) {
  const hubLink = document.createElement("a");
  hubLink.href = "research-hub.html";
  hubLink.textContent = "Research Hub";
  const contactLink = nav.querySelector('a[href="#contact"]');
  if (contactLink) nav.insertBefore(hubLink, contactLink);
  else nav.appendChild(hubLink);
}

// Add a compact Research Hub teaser before Contact.
const contactSection = document.querySelector("#contact");
if (contactSection && !document.querySelector("#research-hub-teaser")) {
  const teaser = document.createElement("section");
  teaser.id = "research-hub-teaser";
  teaser.className = "section";
  teaser.innerHTML = `
    <div class="container">
      <p class="section-kicker">Research Hub</p>
      <div class="section-heading">
        <h2>Research tips, opportunities & science stories</h2>
        <p>A practical extension of this academic profile, with Vietnamese research tips, selected water-science updates, publishing opportunities and short science stories.</p>
      </div>
      <div class="hub-teaser-grid">
        <article class="hub-mini hub-mini-blue">
          <span>Research Tips</span>
          <h3>From validation to reproducibility</h3>
          <p>Short, practical notes for hydrology, hydraulics, remote sensing, modelling and AI research.</p>
        </article>
        <article class="hub-mini hub-mini-teal">
          <span>Guest Editor</span>
          <h3>Two international journal collections</h3>
          <p>Applied Water Science (Springer Nature) and Environmental Research Communications (IOP Publishing).</p>
        </article>
        <article class="hub-mini hub-mini-gold">
          <span>Science Stories · Tiếng Việt</span>
          <h3>Research explained more simply</h3>
          <p>Scientific ideas and research lessons presented in a shorter, more accessible format.</p>
        </article>
      </div>
      <div class="center"><a class="button primary" href="research-hub.html">Open Research Hub</a></div>
    </div>`;
  contactSection.parentNode.insertBefore(teaser, contactSection);

  const style = document.createElement("style");
  style.textContent = `
    .hub-teaser-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .hub-mini{border-radius:20px;padding:28px;color:white;min-height:210px;box-shadow:0 15px 38px rgba(8,47,73,.08)}
    .hub-mini span{font-size:.72rem;letter-spacing:.11em;text-transform:uppercase;font-weight:800;opacity:.85}
    .hub-mini h3{color:white;margin:9px 0 8px;font-size:1.1rem}
    .hub-mini p{margin:0;color:rgba(255,255,255,.86);font-size:.92rem}
    .hub-mini-blue{background:linear-gradient(145deg,#0b3150,#195d89)}
    .hub-mini-teal{background:linear-gradient(145deg,#0d5968,#1b9897)}
    .hub-mini-gold{background:linear-gradient(145deg,#8e6a2d,#c69a4f)}
    @media(max-width:900px){.hub-teaser-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});
