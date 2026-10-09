document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const hideLoader = () => loader.classList.add('hidden');
  window.addEventListener('load', () => setTimeout(hideLoader, 300));
  setTimeout(hideLoader, 4000);

  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll);

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const setNavOpen = (open) => {
    navToggle.classList.toggle('open', open);
    navMobile.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  navToggle.addEventListener('click', () => setNavOpen(!navToggle.classList.contains('open')));
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setNavOpen(false));
  });

  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(`.menu-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.min = today;

  const form = document.getElementById('reserveForm');
  const success = document.getElementById('reserveSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 4500);
  });
});
