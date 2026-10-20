(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects = [
    { title: '¿Dónde comemos hoy?', category: 'SOCIOTECHNICAL INTERACTION · UX RESEARCH', badge: 'UX RESEARCH', desc: 'An exploration of everyday food decisions through a sociotechnical lens, where human behavior, context, and design meet.', img: 'assets/donde-comemos.webp', alt: 'Burgundy ¿Dónde comemos hoy? project cover', url: 'https://www.behance.net/gallery/250954473/Donde-comemos-hoy-Sociotechnical-Interaction-Case' },
    { title: 'Solar Lens', category: 'COMMUNICATION PORTAL · UX/UI', badge: 'PRODUCT DESIGN', desc: 'A digital communication-portal concept exploring accessible information, intuitive interfaces and visual clarity in a solar-energy context.', img: 'assets/solar-lens.webp', alt: 'Solar Lens project cover with blue sky and solar panels', url: 'https://www.behance.net/gallery/250722963/Solar-lens-Communication-portal-GdO-UXUI' },
    { title: 'RideVibe', category: 'NAVIGATION · INTERACTION DESIGN', badge: 'UX/UI', desc: 'A road-trip navigation concept that turns travel into a more immersive and shareable experience.', img: 'assets/ridevibe.webp', alt: 'RideVibe road-trip concept project cover', url: 'https://www.behance.net/gallery/228080019/RideVibe' },
    { title: 'NutriDog', category: 'MOBILE APP · UX/UI', badge: 'MOBILE PRODUCT', desc: 'A pet-care app concept bringing everyday information and veterinary support together in an approachable mobile experience.', img: 'assets/nutridog.webp', alt: 'NutriDog mobile app screens', url: 'https://www.behance.net/gallery/224947049/NutriDog-Mobile-App' },
    { title: 'Saltín Noel', category: 'BRAND IDENTITY · VISUAL DESIGN', badge: 'BRANDING', desc: 'A brand-identity and visual-guidelines project built around cohesive communication, typography and graphic details.', img: 'assets/saltin-noel.webp', alt: 'Saltín Noel visual brand manual cover', url: 'https://www.behance.net/gallery/165738273/saltin-noelcito' }
  ];
  let activeProject = 0;
  const dotsRoot = $('#carouselDots');
  projects.forEach((p, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show featured project ${i + 1}: ${p.title}`);
    dot.addEventListener('click', () => selectProject(i));
    dotsRoot.appendChild(dot);
  });
  function selectProject(number) {
    activeProject = (number + projects.length) % projects.length;
    const p = projects[activeProject];
    const image = $('#featureImage');
    image.style.opacity = '.45';
    image.src = p.img;
    image.alt = p.alt;
    image.style.opacity = '1';
    $('#featureImageCategory').textContent = p.badge;
    $('#projectCategory').textContent = p.category;
    $('#projectTitle').textContent = p.title;
    $('#projectDescription').textContent = p.desc;
    $('#featureLink').href = p.url;
    $('#projectIndex').innerHTML = `${String(activeProject + 1).padStart(2,'0')} <small>/ 05</small>`;
    $$('#carouselDots button').forEach((dot, i) => {
      dot.classList.toggle('active', i === activeProject);
      dot.setAttribute('aria-current', i === activeProject ? 'true' : 'false');
    });
  }
  selectProject(0);
  $('#prevProject').addEventListener('click', () => selectProject(activeProject - 1));
  $('#nextProject').addEventListener('click', () => selectProject(activeProject + 1));
  // Pointer swipe / drag. A touch swipe still permits normal vertical scrolling.
  let pointerStart = null;
  let suppressClick = false;
  const visual = $('#carouselVisual');
  visual.addEventListener('pointerdown', event => { pointerStart = { x: event.clientX, y: event.clientY }; });
  visual.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) { suppressClick = true; selectProject(activeProject + (dx < 0 ? 1 : -1)); }
    pointerStart = null;
  });
  visual.addEventListener('pointercancel', () => { pointerStart = null; });
  $('#carousel').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); selectProject(activeProject - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); selectProject(activeProject + 1); }
  });
  // Click the featured visual itself to open the real Behance page.
  visual.addEventListener('click', () => { if (suppressClick) { suppressClick = false; return; } window.open(projects[activeProject].url, '_blank', 'noopener,noreferrer'); });
  visual.setAttribute('role', 'link');
  visual.tabIndex = 0;
  visual.setAttribute('aria-label', 'Open current project on Behance');
  visual.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); window.open(projects[activeProject].url, '_blank', 'noopener,noreferrer'); }
  });

  $$('.filter-chip').forEach(button => button.addEventListener('click', () => {
    const { filter } = button.dataset;
    $$('.filter-chip').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    $$('.project-tile').forEach(tile => tile.classList.toggle('hidden', filter !== 'all' && tile.dataset.type !== filter));
  }));

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('nayo-theme', next); } catch (_) { /* optional preference */ }
    $('#themeBtn').setAttribute('aria-label', next === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'light' ? '#f4ede6' : '#18131a');
  };
  $('#themeBtn').addEventListener('click', toggleTheme);

  const menu = $('#menuBtn');
  const links = $('#navLinks');
  const closeMenu = () => { links.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); };
  menu.addEventListener('click', () => {
    const open = !links.classList.contains('menu-open');
    links.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    $$('.reveal').forEach(element => observer.observe(element));
  } else { $$('.reveal').forEach(element => element.classList.add('in-view')); }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      $('#progress').style.width = max > 0 ? `${(scrollY / max) * 100}%` : '100%';
      ticking = false;
    });
  }, { passive: true });

  const ideas = [
    'Design a tiny world where every button has a personality.',
    'Make a mood tracker for people who love rainy days.',
    'Invent a digital garden that grows when you learn something.',
    'Create a playlist interface inspired by another planet.',
    'Design a cozy app for finding new creative hobbies.',
    'Turn everyday routines into a tiny pixel-art adventure.',
    'Build a digital postcard that reacts to the weather.',
    'Imagine a brand for a magical midnight café.'
  ];
  let count = 0;
  $('#ideaButton').addEventListener('click', () => {
    count++;
    $('#ideaText').textContent = ideas[(count - 1) % ideas.length];
    $('#questCount').textContent = String(count).padStart(2, '0');
    if (!reducedMotion) {
      const card = $('.play-card');
      card.animate([{ transform: 'translateY(0) rotate(0deg)' }, { transform: 'translateY(-9px) rotate(-1deg)' }, { transform: 'translateY(0) rotate(0deg)' }], { duration: 430, easing: 'ease-out' });
    }
  });

  const toast = $('#surpriseToast');
  let toastTimer;
  $('#pixelStar').addEventListener('click', () => {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  });

  $('#currentYear').textContent = new Date().getFullYear();
})();
