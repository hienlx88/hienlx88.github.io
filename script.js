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
if(backToTop)backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));

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

const publicationRecords=Array.isArray(window.PUBLICATIONS)?window.PUBLICATIONS:[];
const publicationContainers=[...document.querySelectorAll('[data-publications]')];
const english=document.documentElement.lang.startsWith('en');
const categoryKeys=['international','vietnam','korea'];
const categoryLabels=english
  ?{all:'All journals',international:'International journals',vietnam:'Vietnamese journals',korea:'Korean journals'}
  :{all:'Tất cả tạp chí',international:'Tạp chí quốc tế',vietnam:'Tạp chí Việt Nam',korea:'Tạp chí Hàn Quốc'};
const emptyLabels=english
  ?{all:'No matching publications found.',international:'No matching international journal papers found.',vietnam:'No Vietnamese journal papers have been added yet.',korea:'No Korean journal papers have been added yet.'}
  :{all:'Không tìm thấy công bố phù hợp.',international:'Không tìm thấy bài báo quốc tế phù hợp.',vietnam:'Chưa có bài báo tạp chí Việt Nam trong danh sách.',korea:'Chưa có bài báo tạp chí Hàn Quốc trong danh sách.'};
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalizeDoi=doi=>!doi?'':(String(doi).startsWith('http')?String(doi):'https://doi.org/'+String(doi).replace(/^doi:\s*/i,''));
const makePublicationHtml=(paper)=>{
  const year=Number(paper.year)||'';
  const title=escapeHtml(paper.title);
  const authors=escapeHtml(paper.authors||'Xuan-Hien Le');
  const journal=escapeHtml(paper.journal||'');
  const badge=paper.editorChoice?'<span class="badge">Editor’s Choice</span>':'';
  const doi=normalizeDoi(paper.doi);
  const doiLink=doi?'<a href="'+escapeHtml(doi)+'" target="_blank" rel="noopener">DOI ↗</a>':'';
  const video=paper.video?'<a href="'+escapeHtml(paper.video)+'" target="_blank" rel="noopener">Video abstract ↗</a>':'';
  const category=categoryKeys.includes(paper.category)?paper.category:'international';
  return '<article class="publication" data-year="'+escapeHtml(year)+'" data-category="'+category+'"><div class="pub-year">'+escapeHtml(year)+'</div><div><h3>'+title+(badge?' '+badge:'')+'</h3><p><strong>'+authors+'</strong> · <em>'+journal+'</em>.</p>'+doiLink+(doiLink&&video?' · ':'')+video+'</div></article>';
};
const hasFeaturedOnly=publicationContainers.some(container=>container.hasAttribute('data-featured-only'));
const displayedRecords=hasFeaturedOnly?publicationRecords.filter(paper=>paper.featured):publicationRecords;
publicationContainers.forEach(container=>{
  const rows=container.hasAttribute('data-featured-only')?publicationRecords.filter(paper=>paper.featured):publicationRecords;
  container.innerHTML=rows.map(makePublicationHtml).join('');
});
document.querySelectorAll('.year-filters[data-auto-years]').forEach(group=>{
  const allButton=group.querySelector('[data-year-filter="all"]');
  if(allButton)allButton.textContent=english?'All years':'Tất cả';
  const years=[...new Set(displayedRecords.map(paper=>String(paper.year)).filter(Boolean))]
    .sort((a,b)=>Number(b)-Number(a));
  years.forEach(value=>{
    const button=document.createElement('button');
    button.type='button';
    button.dataset.yearFilter=value;
    button.setAttribute('aria-pressed','false');
    button.textContent=value;
    group.appendChild(button);
  });
});
const categoryCounts=Object.fromEntries(categoryKeys.map(key=>[key,displayedRecords.filter(paper=>paper.category===key).length]));
document.querySelectorAll('.publication-tools').forEach(tools=>{
  if(tools.querySelector('[data-auto-categories]'))return;
  const categoryGroup=document.createElement('div');
  categoryGroup.className='publication-categories';
  categoryGroup.dataset.autoCategories='';
  categoryGroup.setAttribute('role','group');
  categoryGroup.setAttribute('aria-label',english?'Filter publications by journal category':'Lọc công bố theo loại tạp chí');
  const allButton=document.createElement('button');
  allButton.type='button';
  allButton.dataset.categoryFilter='all';
  allButton.className='is-active';
  allButton.setAttribute('aria-pressed','true');
  allButton.textContent=categoryLabels.all+' ('+displayedRecords.length+')';
  categoryGroup.appendChild(allButton);
  categoryKeys.forEach(key=>{
    const button=document.createElement('button');
    button.type='button';
    button.dataset.categoryFilter=key;
    button.setAttribute('aria-pressed','false');
    button.textContent=categoryLabels[key]+' ('+(categoryCounts[key]||0)+')';
    categoryGroup.appendChild(button);
  });
  const note=document.createElement('p');
  note.className='publication-category-note';
  note.textContent=english
    ?'Categories follow the journal group; the list currently contains international journal papers.'
    :'Danh sách được phân nhóm theo loại tạp chí; hiện có các bài thuộc nhóm tạp chí quốc tế.';
  tools.prepend(note);
  tools.prepend(categoryGroup);
});

const publicationTools=document.querySelector('.publication-tools');
if(publicationTools){
  const papers=[...document.querySelectorAll('.publication[data-year]')];
  const search=publicationTools.querySelector('[data-publication-search]');
  const yearFilters=[...publicationTools.querySelectorAll('[data-year-filter]')];
  const categoryFilters=[...publicationTools.querySelectorAll('[data-category-filter]')];
  const count=publicationTools.querySelector('[data-publication-count]');
  const empty=publicationTools.querySelector('[data-publication-empty]');
  let selectedYear='all';
  let selectedCategory='all';
  const applyFilters=()=>{
    const query=(search?.value||'').trim().toLocaleLowerCase();
    let visible=0;
    papers.forEach(paper=>{
      const matchesYear=selectedYear==='all'||paper.dataset.year===selectedYear;
      const matchesCategory=selectedCategory==='all'||paper.dataset.category===selectedCategory;
      const matchesText=!query||paper.textContent.toLocaleLowerCase().includes(query);
      const show=matchesYear&&matchesCategory&&matchesText;
      paper.hidden=!show;
      if(show)visible++;
    });
    if(count)count.textContent=visible===1?count.dataset.single:count.dataset.plural.replace('{n}',visible);
    if(empty){
      empty.hidden=visible!==0;
      if(visible===0)empty.textContent=emptyLabels[(selectedCategory==='all'&&categoryCounts[selectedCategory]===undefined)?'all':selectedCategory]||emptyLabels.all;
    }
  };
  yearFilters.forEach(button=>button.addEventListener('click',()=>{
    selectedYear=button.dataset.yearFilter||'all';
    yearFilters.forEach(item=>{
      const active=item===button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    applyFilters();
  }));
  categoryFilters.forEach(button=>button.addEventListener('click',()=>{
    selectedCategory=button.dataset.categoryFilter||'all';
    categoryFilters.forEach(item=>{
      const active=item===button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    applyFilters();
  }));
  if(search)search.addEventListener('input',applyFilters);
  applyFilters();
}
