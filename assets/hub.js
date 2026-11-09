(() => {
  const root = document.documentElement, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  let lang = 'ko';
  try { const v = localStorage.getItem('uxdex-lang'); if (v === 'en' || v === 'ko') lang = v; } catch (e) {}
  const tt = $('#tt'), lg = $('#lg');
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  try { const s = localStorage.getItem('uxdex-theme'); if (s === 'light' || s === 'dark') root.dataset.theme = s; } catch (e) {}
  const isDark = () => (root.dataset.theme || (mq.matches ? 'dark' : 'light')) === 'dark';
  function paint() {
    root.lang = lang;
    $$('[data-en]').forEach(el => {
      if (el.dataset.ko === undefined) el.dataset.ko = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.ko;
    });
    const l = isDark() ? (lang === 'en' ? 'Switch to light mode' : '라이트 모드로 보기') : (lang === 'en' ? 'Switch to dark mode' : '다크 모드로 보기');
    tt.setAttribute('aria-label', l); tt.title = l;
    lg.querySelector('span').textContent = lang === 'en' ? '한' : 'EN';
    lg.setAttribute('aria-label', lang === 'en' ? '한국어로 보기' : 'Switch to English');
    document.title = lang === 'en' ? 'Developer Knowledge Atlas' : '개발자 지식 도감';
  }
  tt.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('uxdex-theme', root.dataset.theme); } catch (e) {}
    paint();
  });
  lg.addEventListener('click', () => {
    lang = lang === 'en' ? 'ko' : 'en';
    try { localStorage.setItem('uxdex-lang', lang); } catch (e) {}
    paint();
  });
  const cards = $$('.card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '120px 0px' });
    cards.forEach(c => io.observe(c));
  } else cards.forEach(c => c.classList.add('on'));
  paint();
})();
