(() => {
  const S = window.UX || [];
  const EN = window.UXEN || {};
  const ENS = window.UXEN_SEC || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const title = k => String(k).split(' vs ').map(esc).join('<i>vs</i>');
  const norm = t => String(t).toLowerCase().replace(/\s+/g, '');
  const root = document.documentElement;

  /* language */
  const T = {
    ko: {
      all: '전체', pick: '주제 선택', popT: '주제를 골라 보세요', q: '토스트, 스켈레톤, Fitts…', qL: '개념 검색', nav: '분류와 검색',
      when: '언제 쓰나요', more: '자세히 보기', close: '닫기', prev: '이전 개념', next: '다음 개념',
      toDark: '다크 모드로 보기', toLight: '라이트 모드로 보기', lang: 'Switch to English', langTxt: 'EN', cnt: n => `${n}개`
    },
    en: {
      all: 'All', pick: 'Topics', popT: 'Pick a topic', q: 'Toast, skeleton, Fitts…', qL: 'Search concepts', nav: 'Topics and search',
      when: 'When to use', more: 'Open details', close: 'Close', prev: 'Previous concept', next: 'Next concept',
      toDark: 'Switch to dark mode', toLight: 'Switch to light mode', lang: '한국어로 보기', langTxt: '한', cnt: n => `${n}`
    }
  };
  let lang = 'ko';
  try { const v = localStorage.getItem('uxdex-lang'); if (v === 'en' || v === 'ko') lang = v; } catch (e) {}
  const L = () => T[lang];
  const sTitle = s => lang === 'en' ? (s.titleEn || (ENS[s.id] || [])[1] || s.title) : s.title;
  const sSub = s => lang === 'en' ? (s.subEn || (ENS[s.id] || [])[2] || s.sub) : s.sub;
  const sShort = s => lang === 'en' ? (s.shortEn || (ENS[s.id] || [])[0] || s.en) : s.short;
  const sEye = s => lang === 'en' ? s.short : s.en;
  const iT = it => lang === 'en' ? it.e : it.k;
  const iAlt = it => lang === 'en' ? it.k : it.e;
  const iD = it => lang === 'en' ? (it.de || (EN[it.id] || [])[0] || it.d) : it.d;
  const iU = it => lang === 'en' ? (it.ue || (EN[it.id] || [])[1] || it.u) : it.u;

  const style = document.createElement('style');
  style.textContent = S.map(s => s.css || '').join('\n');
  document.head.appendChild(style);

  const all = [];
  S.forEach(s => s.items.forEach(it => {
    it.sec = s;
    const en = EN[it.id] || [];
    const es = ENS[s.id] || [];
    it.hay = norm([it.k, it.e, it.d, it.u, it.de, it.ue, en[0], en[1], s.title, s.short, s.en, s.titleEn, es[0], es[1]].filter(Boolean).join(' '));
    all.push(it);
  }));
  $('#n-items').textContent = all.length;
  $('#n-cats').textContent = S.length;

  const list = $('#list');
  list.innerHTML = S.map(s => `
    <section class="sec" id="${s.id}" data-sec="${s.id}">
      <header class="sec-h"><p class="eyebrow"></p><h2></h2><p class="sec-sub"></p></header>
      <div class="grid">${s.items.map(it => `
        <article class="card" tabindex="0" role="button" data-id="${it.id}">
          <div class="stage" aria-hidden="true"><div class="sc ${it.id}">${it.html}</div></div>
          <div class="cb"><h3></h3><p class="en"></p><p class="ds"></p></div>
        </article>`).join('')}
      </div>
    </section>`).join('');

  const cardOf = id => list.querySelector(`.card[data-id="${id}"]`);

  /* light / dark */
  const tt = $('#tt');
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  try { const saved = localStorage.getItem('uxdex-theme'); if (saved === 'light' || saved === 'dark') root.dataset.theme = saved; } catch (e) {}
  const isDark = () => (root.dataset.theme || (mq.matches ? 'dark' : 'light')) === 'dark';
  const syncTT = () => { const l = isDark() ? L().toLight : L().toDark; tt.setAttribute('aria-label', l); tt.title = l; };
  tt.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('uxdex-theme', root.dataset.theme); } catch (e) {}
    syncTT();
  });

  /* topic picker */
  const cAll = $('#c-all'), pk = $('#pk'), pkL = $('#pk-l'), pop = $('#pop'), popG = $('#pop-g'), barIn = $('.bar-in');
  popG.innerHTML = S.map(s => `<button class="opt" type="button" data-c="${s.id}" aria-pressed="false"><b></b><span>${s.items.length}</span></button>`).join('');
  let cat = 'all';
  const q = $('#q');

  function apply() {
    const term = norm(q.value);
    let shown = 0;
    S.forEach(s => {
      let n = 0;
      s.items.forEach(it => {
        const ok = (cat === 'all' || cat === s.id) && (!term || it.hay.includes(term));
        cardOf(it.id).hidden = !ok;
        if (ok) n++;
      });
      list.querySelector(`[data-sec="${s.id}"]`).hidden = n === 0;
      shown += n;
    });
    $('#empty').hidden = shown > 0;
  }
  function syncPick() {
    const s = S.find(x => x.id === cat);
    cAll.setAttribute('aria-pressed', String(cat === 'all'));
    pk.classList.toggle('sel', !!s);
    pkL.textContent = s ? sShort(s) : L().pick;
    $$('.opt', popG).forEach(o => o.setAttribute('aria-pressed', String(o.dataset.c === cat)));
  }
  function toListTop() {
    const bar = $('.bar');
    const y = list.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - 8;
    if (Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  function placePop() {
    const b = pk.getBoundingClientRect(), r = barIn.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(barIn).paddingLeft) || 16;
    const w = Math.min(560, r.width - pad * 2);
    let left = b.left - r.left;
    left = Math.max(pad, Math.min(left, r.width - pad - w));
    pop.style.width = w + 'px';
    pop.style.left = left + 'px';
    pop.style.top = (b.bottom - r.top + 8) + 'px';
    pop.style.transformOrigin = `${b.left - r.left - left + b.width / 2}px 0`;
  }
  function openPop() {
    pop.hidden = false;
    pk.setAttribute('aria-expanded', 'true');
    placePop();
    const a = popG.querySelector('[aria-pressed="true"]') || popG.querySelector('.opt');
    if (a) a.focus({ preventScroll: true });
  }
  function closePop(focusBack) {
    if (pop.hidden) return;
    pop.hidden = true;
    pk.setAttribute('aria-expanded', 'false');
    if (focusBack) pk.focus();
  }
  function pick(c) {
    cat = c;
    syncPick();
    apply();
    toListTop();
  }
  cAll.addEventListener('click', () => { closePop(); pick('all'); });
  pk.addEventListener('click', () => pop.hidden ? openPop() : closePop());
  popG.addEventListener('click', e => {
    const o = e.target.closest('.opt');
    if (!o) return;
    closePop(true);
    pick(o.dataset.c);
  });
  document.addEventListener('click', e => { if (!pop.hidden && !e.target.closest('#pop') && !e.target.closest('#pk')) closePop(); });
  pop.addEventListener('keydown', e => {
    const os = $$('.opt', popG), i = os.indexOf(document.activeElement);
    if (e.key === 'Escape') { e.stopPropagation(); closePop(true); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); os[(i + 1) % os.length].focus(); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); os[(i - 1 + os.length) % os.length].focus(); }
    else if (e.key === 'Tab') closePop();
  });
  window.addEventListener('resize', () => { if (!pop.hidden) placePop(); });
  q.addEventListener('input', apply);

  /* play only cards on screen */
  const cards = list.querySelectorAll('.card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '120px 0px' });
    cards.forEach(c => io.observe(c));
  } else cards.forEach(c => c.classList.add('on'));

  /* detail dialog */
  const ov = $('#ov'), dSc = $('#d-sc');
  let cur = null, back = null;
  const visible = () => all.filter(it => !cardOf(it.id).hidden && !cardOf(it.id).closest('.sec').hidden);

  function fillDialog() {
    const it = cur;
    $('#d-cat').textContent = sTitle(it.sec);
    $('#d-t').innerHTML = title(iT(it));
    $('#d-e').textContent = iAlt(it);
    $('#d-d').textContent = iD(it);
    $('#d-u').textContent = iU(it);
    const v = visible(), i = v.indexOf(it);
    $('#d-pos').textContent = `${i + 1} / ${v.length}`;
  }
  function open(id) {
    const it = all.find(x => x.id === id);
    if (!it) return;
    cur = it;
    dSc.className = 'sc ' + it.id;
    dSc.innerHTML = it.html;
    fillDialog();
    if (ov.hidden) {
      back = document.activeElement;
      ov.hidden = false;
      root.classList.add('lock');
      $('#d-x').focus();
    }
  }
  function close() {
    ov.hidden = true;
    dSc.innerHTML = '';
    root.classList.remove('lock');
    if (back && back.focus) back.focus();
  }
  function step(d) {
    const v = visible();
    if (!v.length) return;
    const i = v.indexOf(cur);
    open(v[(i + d + v.length) % v.length].id);
  }

  list.addEventListener('click', e => {
    const c = e.target.closest('.card');
    if (c) open(c.dataset.id);
  });
  list.addEventListener('keydown', e => {
    const c = e.target.closest('.card');
    if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(c.dataset.id); }
  });
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  $('#d-x').addEventListener('click', close);
  $('#d-p').addEventListener('click', () => step(-1));
  $('#d-n').addEventListener('click', () => step(1));
  document.addEventListener('keydown', e => {
    if (!pop.hidden && e.key === 'Escape') { closePop(true); return; }
    if (ov.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      const f = [...ov.querySelectorAll('button')];
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* paint all text for the current language */
  const lg = $('#lg');
  function paint() {
    const t = L();
    root.lang = lang;
    $$('[data-en]').forEach(el => {
      if (el.dataset.ko === undefined) el.dataset.ko = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.ko;
    });
    $$('[data-en-ph]').forEach(el => {
      if (el.dataset.koPh === undefined) el.dataset.koPh = el.placeholder;
      el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.koPh;
    });
    S.forEach(s => {
      const sec = list.querySelector(`[data-sec="${s.id}"]`);
      sec.querySelector('.sec-h .eyebrow').textContent = `${sEye(s)} · ${s.items.length}`;
      sec.querySelector('.sec-h h2').textContent = sTitle(s);
      sec.querySelector('.sec-h .sec-sub').textContent = sSub(s);
      s.items.forEach(it => {
        const c = cardOf(it.id);
        c.querySelector('.cb h3').innerHTML = title(iT(it));
        c.querySelector('.cb .en').textContent = iAlt(it);
        c.querySelector('.cb .ds').textContent = iD(it);
        c.setAttribute('aria-label', `${iT(it)} · ${t.more}`);
      });
      const o = popG.querySelector(`[data-c="${s.id}"] b`);
      if (o) o.textContent = sShort(s);
    });
    cAll.innerHTML = `${t.all} <span>${all.length}</span>`;
    $('#pop-t').textContent = t.popT;
    q.placeholder = q.dataset[lang === 'en' ? 'qEn' : 'qKo'] || t.q;
    $('#q-l').textContent = t.qL;
    $('.bar').setAttribute('aria-label', t.nav);
    $('#d-x').setAttribute('aria-label', t.close);
    $('#d-p').setAttribute('aria-label', t.prev);
    $('#d-n').setAttribute('aria-label', t.next);
    $('#d-ul').textContent = t.when;
    lg.querySelector('span').textContent = t.langTxt;
    lg.setAttribute('aria-label', t.lang);
    lg.title = t.lang;
    syncPick();
    syncTT();
    if (!ov.hidden && cur) fillDialog();
  }
  const curPage = document.querySelector('.pages a[aria-current="page"]');
  if (curPage) { const pg = curPage.parentElement; pg.scrollLeft = Math.max(0, curPage.offsetLeft - pg.offsetLeft - 8); }
  lg.addEventListener('click', () => {
    lang = lang === 'en' ? 'ko' : 'en';
    try { localStorage.setItem('uxdex-lang', lang); } catch (e) {}
    paint();
  });
  paint();
})();
