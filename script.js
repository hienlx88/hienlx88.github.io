document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const path = window.location.pathname;
const isVietnamese = path === "/vi/" || path.startsWith("/vi/");
const isHub = path.includes("research-hub");

// Shared component styles added here so both language versions stay synchronized.
const uiStyle = document.createElement("style");
uiStyle.textContent = `
  .lang-switch{display:flex;align-items:center;gap:6px;margin-left:2px;padding:5px 8px;border:1px solid var(--line);border-radius:999px;background:#fff;white-space:nowrap}
  .lang-switch a{font-size:.72rem!important;font-weight:800!important;letter-spacing:.04em;color:var(--muted)!important;padding:2px 4px}
  .lang-switch a.active{color:var(--navy)!important;background:var(--mint);border-radius:999px}
  .lang-switch span{font-size:.7rem;color:#9badb6}
  .hub-teaser-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .hub-mini{border-radius:20px;padding:28px;color:white;min-height:210px;box-shadow:0 15px 38px rgba(8,47,73,.08)}
  .hub-mini span{font-size:.72rem;letter-spacing:.11em;text-transform:uppercase;font-weight:800;opacity:.85}
  .hub-mini h3{color:white;margin:9px 0 8px;font-size:1.125rem}
  .hub-mini p{margin:0;color:rgba(255,255,255,.86);font-size:.875rem}
  .hub-mini-blue{background:linear-gradient(145deg,#0b3150,#195d89)}
  .hub-mini-teal{background:linear-gradient(145deg,#0d5968,#1b9897)}
  .hub-mini-gold{background:linear-gradient(145deg,#8e6a2d,#c69a4f)}
  @media(max-width:900px){.hub-teaser-grid{grid-template-columns:1fr}.lang-switch{margin-top:4px}}
`;
document.head.appendChild(uiStyle);

// Ensure Research Hub appears in the navigation of the academic homepage.
if (nav && !isHub && !nav.querySelector(".research-hub-nav")) {
  const hubLink = document.createElement("a");
  hubLink.className = "research-hub-nav";
  hubLink.href = isVietnamese ? "/vi/research-hub.html" : "/research-hub.html";
  hubLink.textContent = isVietnamese ? "Góc Nghiên cứu" : "Research Hub";
  const contactLink = nav.querySelector('a[href="#contact"]');
  if (contactLink) nav.insertBefore(hubLink, contactLink);
  else nav.appendChild(hubLink);
}

// EN / VI language switcher. Each page has a paired equivalent.
if (nav && !nav.querySelector(".lang-switch")) {
  const enHref = isHub ? "/research-hub.html" : "/";
  const viHref = isHub ? "/vi/research-hub.html" : "/vi/";
  const switcher = document.createElement("div");
  switcher.className = "lang-switch";
  switcher.setAttribute("aria-label", isVietnamese ? "Chọn ngôn ngữ" : "Language selector");
  switcher.innerHTML = `
    <a href="${enHref}" class="${isVietnamese ? "" : "active"}" lang="en">EN</a>
    <span aria-hidden="true">/</span>
    <a href="${viHref}" class="${isVietnamese ? "active" : ""}" lang="vi">VI</a>
  `;
  nav.appendChild(switcher);
}

// Add a localized Research Hub teaser before Contact on the homepage only.
const contactSection = document.querySelector("#contact");
if (contactSection && !isHub && !document.querySelector("#research-hub-teaser")) {
  const teaser = document.createElement("section");
  teaser.id = "research-hub-teaser";
  teaser.className = "section";
  teaser.innerHTML = isVietnamese ? `
    <div class="container">
      <p class="section-kicker">Góc Nghiên cứu</p>
      <div class="section-heading">
        <h2>Tips nghiên cứu, cơ hội học thuật & câu chuyện khoa học</h2>
        <p>Một phần mở rộng thực hành của website học thuật: kinh nghiệm nghiên cứu chuyên ngành nước, cơ hội xuất bản, cập nhật khoa học và các câu chuyện ngắn bằng tiếng Việt.</p>
      </div>
      <div class="hub-teaser-grid">
        <article class="hub-mini hub-mini-blue"><span>Research Tips</span><h3>Từ kiểm định mô hình đến reproducibility</h3><p>Các ghi chú ngắn, thực tế cho thủy văn, thủy lực, viễn thám, mô hình hóa và AI.</p></article>
        <article class="hub-mini hub-mini-teal"><span>Guest Editor</span><h3>Hai bộ sưu tập tạp chí quốc tế</h3><p>Applied Water Science (Springer Nature) và Environmental Research Communications (IOP Publishing).</p></article>
        <article class="hub-mini hub-mini-gold"><span>Câu chuyện khoa học</span><h3>Giải thích nghiên cứu theo cách dễ tiếp cận hơn</h3><p>Các ý tưởng và bài học khoa học được trình bày ngắn, rõ và gắn với thực hành.</p></article>
      </div>
      <div class="center"><a class="button primary" href="/vi/research-hub.html">Mở Góc Nghiên cứu</a></div>
    </div>` : `
    <div class="container">
      <p class="section-kicker">Research Hub</p>
      <div class="section-heading">
        <h2>Research tips, opportunities & science stories</h2>
        <p>A practical extension of this academic profile, with research tips, selected water-science updates, publishing opportunities and short science stories.</p>
      </div>
      <div class="hub-teaser-grid">
        <article class="hub-mini hub-mini-blue"><span>Research Tips</span><h3>From validation to reproducibility</h3><p>Short, practical notes for hydrology, hydraulics, remote sensing, modelling and AI research.</p></article>
        <article class="hub-mini hub-mini-teal"><span>Guest Editor</span><h3>Two international journal collections</h3><p>Applied Water Science (Springer Nature) and Environmental Research Communications (IOP Publishing).</p></article>
        <article class="hub-mini hub-mini-gold"><span>Science Stories · Tiếng Việt</span><h3>Research explained more simply</h3><p>Scientific ideas and research lessons presented in a shorter, more accessible format.</p></article>
      </div>
      <div class="center"><a class="button primary" href="/research-hub.html">Open Research Hub</a></div>
    </div>`;
  contactSection.parentNode.insertBefore(teaser, contactSection);
}

if (toggle && nav) {
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
}
