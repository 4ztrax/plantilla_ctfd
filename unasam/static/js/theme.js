console.log("Theme Cargado");

// scroll suave
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]'); if(!a) return;
  const el = document.querySelector(a.getAttribute('href')); if(!el) return;
  e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'});
});

// contadores
fetch('/api/v1/users?per_page=1').then(r=>r.json()).then(d=>{
  const total = d.meta?.pagination?.total || d.data?.meta?.pagination?.total || 0;
  const el = document.getElementById('stat-users'); if(el) el.textContent = `${total}+`;
});
fetch('/api/v1/challenges').then(r=>r.json()).then(d=>{
  const cats = new Set((d.data||[]).map(c=>c.category));
  const el = document.getElementById('stat-cats'); if(el) el.textContent = cats.size;
});

// Navbar: blur y padding dinámico
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  // 1) cuerpo con padding para no tapar contenido
  document.body.classList.add('has-fixed-nav');

  // 2) altura real de la nav -> CSS var
  const setNavHeight = () => {
    const h = nav.offsetHeight || 56;
    document.documentElement.style.setProperty('--nav-h', `${h}px`);
  };
  setNavHeight();
  window.addEventListener('resize', setNavHeight, { passive: true });

  // 3) estado “is-scrolled”
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
