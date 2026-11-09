/* CS atlas engine: build looping step animations from state snapshots.
   A scene is a set of absolutely positioned elements on the 32 x 24em stage.
   Each element can change style at numbered steps; the engine writes one @keyframes per element. */
(() => {
const R = n => Math.round(n * 1000) / 1000;
const DEF = { transform: 'none', opacity: '1', background: 'var(--ui)', color: 'var(--ink)', 'border-color': 'var(--line)', 'box-shadow': 'none', width: 'auto', height: 'auto' };
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* bilingual text: [ko, en] arrays, or plain Korean strings found in the dictionary registered by tr() */
const DICT = {};
const tr = d => Object.assign(DICT, d);
const bi = t => {
  if (Array.isArray(t)) return t[1] == null ? t[0] : `<span class="zk">${t[0]}</span><span class="ze">${t[1]}</span>`;
  if (typeof t === 'string' && t && DICT[t] != null) return `<span class="zk">${t}</span><span class="ze">${DICT[t]}</span>`;
  return t;
};

/* state palette (works in light and dark) */
const C = {
  cur: { background: 'var(--accent)', color: 'var(--accent-ink)', 'border-color': 'var(--accent)' },
  soft: { background: 'var(--accent-soft)', color: 'var(--ink)', 'border-color': 'var(--accent)' },
  cmp: { background: 'var(--warn-soft)', color: 'var(--ink)', 'border-color': 'var(--warn)' },
  warn: { background: 'var(--warn)', color: '#fff', 'border-color': 'var(--warn)' },
  ok: { background: 'color-mix(in srgb,var(--ok) 20%,var(--ui))', color: 'var(--ink)', 'border-color': 'var(--ok)' },
  okf: { background: 'var(--ok)', color: '#fff', 'border-color': 'var(--ok)' },
  bad: { background: 'var(--danger-soft)', color: 'var(--danger)', 'border-color': 'var(--danger)' },
  badf: { background: 'var(--danger)', color: '#fff', 'border-color': 'var(--danger)' },
  idle: { background: 'var(--ui)', color: 'var(--ink)', 'border-color': 'var(--line)' },
  dim: { opacity: '.3' }, show: { opacity: '1' }, hide: { opacity: '0' }
};

/* class-specific starting values for animated props (so an edge or arrow keeps its look until it changes) */
const CLSDEF = [['cz-ed', { background: 'var(--line)' }], ['cz-ar', { background: 'var(--ink-2)', 'border-color': 'var(--ink-2)' }], ['cz-b', { background: 'var(--line)' }], ['cz-box', { 'border-color': 'var(--rule)' }], ['cz-ll', { 'border-color': 'var(--line)' }]];
const clsDef = cls => { const o = {}; const c = ' ' + (cls || '') + ' '; CLSDEF.forEach(([k, v]) => { if (c.includes(' ' + k + ' ')) Object.assign(o, v); }); return o; };
function scene(o) {
  const els = [], by = {}, caps = [];
  const n = o.steps;
  const S = {
    n, id: o.id,
    el(key, p) { const e = Object.assign({ key, x: 0, y: 0, cls: '', html: '', s: {}, st: {} }, p); e.html = bi(e.html); els.push(e); by[key] = e; return S; },
    set(key, step, st) { const e = by[key]; if (!e) throw new Error('no el ' + key + ' in ' + o.id); e.st[step] = Object.assign(e.st[step] || {}, st); return S; },
    move(key, step, x, y, extra) { const e = by[key]; return S.set(key, step, Object.assign({ transform: `translate(${R(x - e.x)}em,${R(y - e.y)}em)` }, extra || {})); },
    has: key => !!by[key],
    get: key => by[key],
    cap(step, text, en) { caps.push([step, en != null ? [text, en] : text]); return S; },
    /* a label whose text changes over time: list of [step, text] */
    label(key, p, list) {
      list.forEach(([st, txt], i) => {
        const k = `${key}~${i}`;
        S.el(k, Object.assign({}, p, { html: txt, s: Object.assign({}, p.s || {}, { opacity: st === 0 ? '1' : '0' }) }));
        if (st > 0) S.set(k, st, { opacity: '1' });
        const nx = list[i + 1];
        if (nx) S.set(k, nx[0], { opacity: '0' });
      });
      return S;
    },
    build() {
      caps.sort((a, b) => a[0] - b[0]);
      if (caps.length) S.label('cap', { cls: 'cz-cap', x: 1, y: o.capY || 21.3, w: 30 }, caps);
      const dur = o.dur || Math.max(4, n * (o.per || .9) + 2);
      const seg = .86 / Math.max(n, 1), d = Math.min(seg * .55, .06);
      const tAt = k => .05 + (k - 1) * seg;
      let css = '', html = '';
      els.forEach((e, i) => {
        const name = `${o.id}-k${i}`;
        const steps = Object.keys(e.st).map(Number).sort((a, b) => a - b);
        const props = new Set();
        steps.forEach(k => Object.keys(e.st[k]).forEach(p => props.add(p)));
        const base = {};
        const cd = clsDef(e.cls);
        props.forEach(p => { base[p] = e.s[p] != null ? e.s[p] : cd[p] != null ? cd[p] : DEF[p]; });
        const st0 = steps.includes(0) ? Object.assign({}, base, e.st[0]) : base;
        const pts = [[0, st0]];
        let cur = st0;
        steps.filter(k => k > 0).forEach(k => {
          const nxt = Object.assign({}, cur, e.st[k]);
          const t = tAt(k);
          pts.push([t, cur], [t + (e.snap ? .002 : d), nxt]);
          cur = nxt;
        });
        pts.push([1, cur]);
        const style = Object.assign({}, e.s, st0);
        const pos = `left:${R(e.x)}em;top:${R(e.y)}em;${e.w != null ? `width:${R(e.w)}em;` : ''}${e.h != null ? `height:${R(e.h)}em;` : ''}`;
        const inl = Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';');
        const anim = props.size ? `animation:${name} ${R(dur)}s infinite;` : '';
        html += `<i class="e ${e.cls}" style="${pos}${inl};${anim}${e.css || ''}">${e.html === '' ? '' : `<span class="in">${e.html}</span>`}</i>`;
        if (props.size) {
          css += `@keyframes ${name}{` + pts.map(([t, s]) => `${R(t * 100)}%{${[...props].map(p => `${p}:${s[p]}`).join(';')}}`).join('') + '}\n';
        }
      });
      return { html: `<div class="cz">${html}</div>`, css };
    }
  };
  return S;
}

/* helpers ------------------------------------------------------------- */
function edge(S, key, x1, y1, x2, y2, p) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return S.el(key, Object.assign({ cls: 'cz-ed', x: x1, y: y1 - .07, w: len, h: .14, css: `transform:rotate(${R(ang)}deg)` }, p || {}));
}
function node(S, key, cx, cy, label, p) {
  const r = (p && p.r) || 1.15;
  return S.el(key, Object.assign({ cls: 'cz-n', x: cx - r, y: cy - r, w: r * 2, h: r * 2, html: label }, p || {}));
}
function cell(S, key, x, y, label, p) {
  return S.el(key, Object.assign({ cls: 'cz-c', x, y, w: 2.2, h: 2.2, html: label }, p || {}));
}
function text(S, key, x, y, label, p) {
  return S.el(key, Object.assign({ cls: 'cz-t', x, y, html: label }, p || {}));
}

/* sorting: trace of snapshots {order:[ids], hi:{id:state}} */
function sortScene(id, vals, trace, o = {}) {
  const n = vals.length, W = o.w || 2.6, G = o.g || .5, H = o.hMax || 11, base = o.base || 17;
  const x0 = (32 - (n * W + (n - 1) * G)) / 2, max = Math.max(...vals);
  const S = scene({ id, steps: trace.length, per: o.per || .55 });
  vals.forEach((v, i) => {
    const h = 1.6 + (H - 1.6) * v / max;
    S.el('b' + i, { cls: 'cz-b', x: x0 + i * (W + G), y: base - h, w: W, h, html: `<b>${v}</b>`, s: { background: 'var(--line)', color: 'var(--ink)' } });
  });
  const colors = { cmp: { background: 'var(--warn)', color: '#fff' }, swap: { background: 'var(--danger)', color: '#fff' }, piv: { background: 'var(--accent)', color: '#fff' }, done: { background: 'var(--ok)', color: '#fff' }, rng: { background: 'var(--accent-soft)', color: 'var(--ink)' }, none: { background: 'var(--line)', color: 'var(--ink)' } };
  let prev = { order: vals.map((_, i) => i), hi: {} };
  trace.forEach((t, k) => {
    const step = k + 1;
    t.order.forEach((bi, slot) => {
      if (prev.order.indexOf(bi) !== slot) S.move('b' + bi, step, x0 + slot * (W + G), S.get('b' + bi).y);
    });
    for (let bi = 0; bi < n; bi++) {
      const a = t.hi[bi] || 'none', b = prev.hi[bi] || 'none';
      if (a !== b) S.set('b' + bi, step, colors[a]);
    }
    if (t.cap) S.cap(step, t.cap);
    prev = t;
  });
  if (o.cap0) S.cap(0, o.cap0);
  return S;
}


/* sequence diagram: actors across the top, messages appear one per step */
function seq(id, actors, msgs, o = {}) {
  const S = scene({ id, steps: msgs.length, per: o.per || 1.1, dur: o.dur });
  const n = actors.length, W = o.aw || 7, top = o.top || 1, ah = 2.3;
  const span = 32 - 2 * (o.mx || 2.5) - W;
  const cx = i => (o.mx || 2.5) + W / 2 + (n === 1 ? 0 : span * i / (n - 1));
  actors.forEach((a, i) => {
    S.el('a' + i, { cls: 'cz-act', x: cx(i) - W / 2, y: top, w: W, h: ah, html: a });
    S.el('l' + i, { cls: 'cz-ll', x: cx(i), y: top + ah, w: .1, h: (o.bottom || 21) - top - ah });
  });
  const y0 = top + ah + 1.2, gap = Math.min(o.gap || 2.3, ((o.bottom || 21) - y0 - .6) / Math.max(msgs.length, 1));
  msgs.forEach((m, i) => {
    const y = y0 + i * gap + .9, st = i + 1;
    if (m.f === m.t) {
      const rt = cx(m.f) > 21; S.el('m' + i, { cls: 'cz-al', x: rt ? cx(m.f) - 11.4 : cx(m.f) + .4, y: y - .9, w: 11, html: Array.isArray(m.l) ? ['↻ ' + m.l[0], '↻ ' + m.l[1]] : '↻ ' + m.l, s: { opacity: '0' }, css: rt ? 'text-align:right' : 'text-align:left' }).set('m' + i, st, { opacity: '1' });
    } else {
      const x1 = Math.min(cx(m.f), cx(m.t)), x2 = Math.max(cx(m.f), cx(m.t)), right = m.t > m.f;
      S.el('m' + i, { cls: 'cz-ar ' + (right ? 'r' : 'l'), x: x1, y, w: x2 - x1, h: .14, s: { opacity: '0', transform: 'scaleX(0)' }, css: `transform-origin:${right ? '0' : '100%'} 50%;${m.c ? `background:var(--${m.c});border-color:var(--${m.c})` : ''}` })
        .set('m' + i, st, { opacity: '1', transform: 'scaleX(1)' });
      S.el('t' + i, { cls: 'cz-al', x: (x1 + x2) / 2 - 7, y: y - 1.05, w: 14, html: m.l, s: { opacity: '0' } }).set('t' + i, st, { opacity: '1' });
    }
    if (m.cap) S.cap(st, m.cap);
  });
  return S;
}

/* grid of cells: values(r,c) -> label */
function grid(S, pfx, x, y, rows, cols, cw, ch, val, p) {
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    S.el(`${pfx}${r}_${c}`, Object.assign({ cls: 'cz-c', x: x + c * cw, y: y + r * ch, w: cw - .2, h: ch - .2, html: val ? val(r, c) : '' }, p || {}));
  return S;
}


/* straight arrow from (x1,y1) to (x2,y2); animate opacity only */
function arrow(S, key, x1, y1, x2, y2, p) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return S.el(key, Object.assign({ cls: 'cz-ar r', x: x1, y: y1 - .07, w: len, h: .14, css: `transform:rotate(${R(ang)}deg);transform-origin:0 50%` }, p || {}));
}
function link(S, key, a, b, ra, rb, p) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  return arrow(S, key, a[0] + dx * ra / L, a[1] + dy * ra / L, b[0] - dx * rb / L, b[1] - dy * rb / L, p);
}
const AR = { ink: { background: 'var(--ink-2)', 'border-color': 'var(--ink-2)' }, red: { background: 'var(--danger)', 'border-color': 'var(--danger)' }, ok: { background: 'var(--ok)', 'border-color': 'var(--ok)' }, acc: { background: 'var(--accent)', 'border-color': 'var(--accent)' }, warn: { background: 'var(--warn)', 'border-color': 'var(--warn)' } };
function pill(S, key, x, y, label, p) {
  return S.el(key, Object.assign({ cls: 'cz-pill', x, y, w: 4.4, h: 1.8, html: label, s: { background: 'var(--accent-soft)', color: 'var(--ink)' } }, p || {}));
}

/* labelled box (centered text) and small moving token */
function box(S, key, x, y, w, h, label, p) {
  return S.el(key, Object.assign({ cls: 'cz-box cz-bx', x, y, w, h, html: label }, p || {}));
}
function dot(S, key, x, y, label, p) {
  const r = (p && p.r) || .75;
  return S.el(key, Object.assign({ cls: 'cz-dot', x: x - r, y: y - r, w: r * 2, h: r * 2, html: label, s: C.cur }, p || {}));
}
/* gantt bars that grow in: segs [[label, start, end, stateStyle, step]] */
function gantt(S, pfx, segs, x0, y, unit, h, o = {}) {
  segs.forEach(([lab, a, b, st, step], i) => {
    S.el(pfx + i, { cls: 'cz-c', x: x0 + a * unit, y, w: (b - a) * unit, h, html: lab, css: 'transform-origin:0 50%;border-radius:.3em', s: Object.assign({ transform: 'scaleX(0)' }, st) });
    S.set(pfx + i, step, { transform: 'none' });
  });
  if (o.ticks) o.ticks.forEach(t => S.el(pfx + 't' + t, { cls: 'cz-t cz-tc', x: x0 + t * unit - 1, y: y + h + .2, w: 2, html: String(t) }));
  return S;
}
/* items, sections and pages */
function item(id, k, e, d, u, de, ue, demo, extraCss) {
  let html = '', css = extraCss || '';
  if (typeof demo === 'string') html = demo;
  else if (demo && demo.build) { const r = demo.build(); html = r.html; css += r.css; }
  return { id, k, e, d, u, de, ue, html, css };
}
function sec(id, short, shortEn, title, titleEn, sub, subEn, items, baseCss) {
  return { id, short, en: shortEn, shortEn, title, titleEn, sub, subEn, baseCss: baseCss || '', css: (baseCss || '') + '\n' + items.map(i => i.css || '').join('\n'), items };
}
function page(secs) { secs[0].css = window.CZ_CSS + '\n' + secs[0].css; return secs; }

window.CZ = { tr, bi, box, dot, gantt, link, AR, scene, edge, node, cell, text, arrow, pill, sortScene, seq, grid, item, sec, page, C, R, esc };

/* shared css for the CS page */
window.CZ_CSS = `
.cz{position:absolute;inset:0}
.cz .e{position:absolute;display:block;font-style:normal;box-sizing:border-box;font-size:1em}
.cz .in{display:block}
.cz-c{display:grid!important;place-items:center;border-radius:.5em;background:var(--ui);border:.12em solid var(--line);color:var(--ink)}
.cz-c .in{font-family:var(--f-mono);font-size:.85em;font-weight:600}
.cz-n{display:grid!important;place-items:center;border-radius:50%;background:var(--ui);border:.14em solid var(--line);color:var(--ink);z-index:2;text-align:center}
.cz-n .in{font-size:.82em;font-weight:700;line-height:1.1}
.cz-b{border-radius:.35em .35em 0 0;background:var(--line);display:flex!important;align-items:flex-end;justify-content:center}
.cz-b .in{font-family:var(--f-mono);font-size:.8em;font-weight:600;padding-bottom:.3em}
.cz-ed{background:var(--line);transform-origin:0 50%;z-index:1;border-radius:1em}
.cz-t .in{font-size:.7em;color:var(--ink-2);white-space:nowrap;line-height:1.3}
.cz-tc{text-align:center}
.cz-cap{text-align:center}
.cz-cap .in{font-size:.78em;font-weight:600;color:var(--ink-2);white-space:nowrap}
.cz-box{border-radius:.8em;background:var(--ui);border:.12em solid var(--rule);box-shadow:0 .3em 1em -.4em rgba(0,27,55,.15)}
.cz-pill{border-radius:2em;display:grid!important;place-items:center}
.cz-pill .in{font-size:.68em;font-weight:700;white-space:nowrap}
.cz-ar{height:.14em;background:var(--ink-2);border-color:var(--ink-2)}
.cz-ar::after{content:"";position:absolute;top:50%;width:.55em;height:.55em;border-style:solid;border-color:inherit;border-width:.14em .14em 0 0;margin-top:-.29em}
.cz-ar.r::after{right:0;transform:rotate(45deg)}
.cz-ar.l::after{left:0;transform:rotate(-135deg)}
.cz-al{text-align:center}
.cz-al .in{font-size:.62em;font-weight:600;color:var(--ink);white-space:nowrap}
.cz-act{display:grid!important;place-items:center;border-radius:.7em;background:var(--ui);border:.12em solid var(--rule);box-shadow:0 .3em 1em -.4em rgba(0,27,55,.15)}
.cz-act .in{font-size:.72em;font-weight:700;text-align:center;line-height:1.25}
.cz-ll{border-left:.12em dashed var(--line)}
.cz-mono .in{font-family:var(--f-mono)}
.cz-bx{display:grid!important;place-items:center;text-align:center}
.cz-bx .in{font-size:.72em;font-weight:700;line-height:1.25}
.cz-dot{border-radius:50%;display:grid!important;place-items:center;z-index:4;border:.12em solid transparent}
.cz-dot .in{font-size:.56em;font-weight:800;white-space:nowrap}
.cz-sm .in{font-size:.6em}
.cz-lg .in{font-size:.9em}
html[lang=en] .cz .zk,html:not([lang=en]) .cz .ze{display:none}
`;
})();
