const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

const header=document.querySelector('.site-header');
const backToTop=document.querySelector('.back-to-top');
const updateScrollControls=()=>{
  const scrolled=window.scrollY>32;
  if(header)header.classList.toggle('is-scrolled',scrolled);
  if(backToTop){
    backToTop.classList.toggle('is-visible',window.scrollY>520);
    backToTop.setAttribute('aria-hidden',String(window.scrollY<=520));
    backToTop.tabIndex=window.scrollY>520?0:-1;
  }
};
window.addEventListener('scroll',updateScrollControls,{passive:true});
updateScrollControls();
if(backToTop)backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver'in window&&sections.length){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      navLinks.forEach(link=>{
        const active=link.getAttribute('href')==='#'+entry.target.id;
        if(active)link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    });
  },{rootMargin:'-25% 0px -65% 0px',threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));
}

const publicationTools=document.querySelector('.publication-tools');
if(publicationTools){
  const papers=[...document.querySelectorAll('.publication[data-year]')];
  const search=publicationTools.querySelector('[data-publication-search]');
  const filters=[...publicationTools.querySelectorAll('[data-year-filter]')];
  const count=publicationTools.querySelector('[data-publication-count]');
  const empty=publicationTools.querySelector('[data-publication-empty]');
  let selectedYear='all';
  const applyFilters=()=>{
    const query=(search?.value||'').trim().toLocaleLowerCase();
    let visible=0;
    papers.forEach(paper=>{
      const matchesYear=selectedYear==='all'||paper.dataset.year===selectedYear;
      const matchesText=!query||paper.textContent.toLocaleLowerCase().includes(query);
      const show=matchesYear&&matchesText;
      paper.hidden=!show;
      if(show)visible++;
    });
    if(count)count.textContent=visible===1?count.dataset.single:count.dataset.plural.replace('{n}',visible);
    if(empty)empty.hidden=visible!==0;
  };
  filters.forEach(button=>button.addEventListener('click',()=>{
    selectedYear=button.dataset.yearFilter||'all';
    filters.forEach(item=>{
      const active=item===button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    applyFilters();
  }));
  if(search)search.addEventListener('input',applyFilters);
  applyFilters();
}
