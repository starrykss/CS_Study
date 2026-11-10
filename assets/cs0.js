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
    el(key, p) { const e = Object.assign({ key, x: 0, y: 0, cls: '', html: '', s: {}, st: {} }, p); e.html = bi(e.html); if (!/\bcz-/.test(e.cls) && /border:/.test(e.css || '') && (+e.w || 0) * (+e.h || 0) <= 36) e.cls = (e.cls + ' cz-bd').trim(); els.push(e); by[key] = e; return S; },
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
.cz .cz-ar.r,.cz .cz-ar.l{border-radius:0;border-width:0;box-shadow:none}
.cz .e[class*="-tiny"]>.in{font-size:.5em!important}
.cz .cz-c,.cz .cz-bd,.cz .cz-pill,.cz .cz-bx{z-index:2}
.cz .cz-ar{z-index:1}
.cz .cz-t>.in{text-shadow:0 0 .1em var(--stage),0 0 .1em var(--stage),0 0 .18em var(--stage),0 0 .18em var(--stage)}
.cz .e[class*="-c2"]>.in{font-size:.55em!important}
.cz-ar::after{content:"";position:absolute;top:50%;width:.55em;height:.55em;border-style:solid;border-color:inherit;border-width:.14em .14em 0 0;margin-top:-.29em}
.cz-ar.r::after{right:0;transform:rotate(45deg)}
.cz-ar.l::after{left:0;transform:rotate(-135deg)}
.cz-al{text-align:center}
.cz-al .in{font-size:.62em;font-weight:600;color:var(--ink);white-space:nowrap}
.cz-act{display:grid!important;place-items:center;border-radius:.7em;background:var(--ui);border:.12em solid var(--rule);box-shadow:0 .3em 1em -.4em rgba(0,27,55,.15)}
.cz-act .in{font-size:.72em;font-weight:700;text-align:center;line-height:1.25}
.cz-ll{border-left:.12em dashed var(--line)}
.cz-mono .in{font-family:var(--f-mono)}
.cz .cz-math .in,body[data-page=calc] .cz :is(.cz-mono,.cz-c,.cz-b) .in,body[data-page=linalg] .cz :is(.cz-mono,.cz-c,.cz-b) .in,body[data-page=prob] .cz :is(.cz-mono,.cz-c,.cz-b) .in,body[data-page=numer] .cz :is(.cz-mono,.cz-c,.cz-b) .in,body[data-page=phys] .cz :is(.cz-mono,.cz-c,.cz-b) .in,body[data-page=info] .cz :is(.cz-mono,.cz-c,.cz-b) .in{font-family:"CZ Serif","CZ Symbols",var(--f-txt,"Noto Sans KR"),serif;letter-spacing:0;font-kerning:normal}
.cz .mi{font-style:italic;padding-right:.03em}
.cz .in.m-grid{font-family:var(--f-mono)!important}
.cz .mi,.cz .m-up,.cz .m-dn{font-family:"CZ Serif","CZ Symbols",var(--f-txt,"Noto Sans KR"),serif}
.cz .m-in .mi,.cz .m-in .m-up,.cz .m-in .m-dn{font-size-adjust:.53}
.cz .m-up,.cz .m-dn{position:relative;font-size:.68em;line-height:0}
.cz .m-up{top:-.52em}
.cz .m-dn{top:.24em}
.cz-bx{display:grid!important;place-items:center;text-align:center}
.cz-bx .in{font-size:.72em;font-weight:700;line-height:1.25}
.cz-dot{border-radius:50%;display:grid!important;place-items:center;z-index:4;border:.12em solid transparent}
.cz-dot .in{font-size:.56em;font-weight:800;white-space:nowrap}
.cz-sm .in{font-size:.6em}
.cz-lg .in{font-size:.9em}
html[lang=en] .cz .zk,html:not([lang=en]) .cz .ze{display:none}
`;
})();

/* runtime math typesetting. Formula text (math pages' .cz-mono, or .cz-math anywhere) is set in a serif face with italic
   variables, upright function names, units and acronyms, and real raised/lowered scripts for Unicode super/subscripts.
   Other labels on math pages keep their sans face; only the variables and scripts inside them get the math style. */
(function () {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
  const PAGES = ['calc', 'linalg', 'prob', 'numer', 'phys', 'info'];
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱʲˣˢᵀᵇᵉᵏᵐᵖᶜᴺʰᵃᵈᶠᵍˡᵒʳᵗᵘᵛʷʸᶻᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴼᴾᴿᵁⱽᵂ', SUPB = '0123456789+−=()nijxsTbekmpcNhadfglortuvwyzABDEGHIJKLMOPRUVW';
  const SUB = '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₒₓₕₖₗₘₙₚₛₜᵢᵣᵤᵥⱼᵦᵧᵨᵩᵪ', SUBB = '0123456789+−=()aeoxhklmnpstiruvjβyρφχ';
  const set = s => new Set(s.split(' '));
  const FN = set('sin cos tan cot sec csc arcsin arccos arctan sinh cosh tanh sech csch coth log ln lg exp lim max min sup inf arg argmax argmin rms det dim rank nullity span diag tr Tr ker Im Re Col Row Nul Var Cov Corr Cor gcd lcm mod deg sgn sign erf proj adj softmax');
  const UNIT = set('m s g kg N J W V A K C Hz kHz MHz GHz Pa kPa mol L h min km cm mm nm μm ms μs ns ps kWh Wh eV keV MeV T Wb F H rad sr dB lx lm cd Sv Gy Bq mA kV mV kW MW kN mF μF nF pF kΩ MΩ B KB MB GB TB bps kbps Mbps Gbps bit bits kbit Mbit Gbit byte bytes px AU au yr ly atm bar');
  const ACR = set('LU QR SVD PCA RK RK4 ODE ODEs PDE PDF PDFs CDF PMF MLE MAP FFT DFT IV CLT LLN MSE RMSE MAE KL IQR SD SE CI NP SNR DC AC RC RL RLC LC EMF CPU GPU NaN ULP IEEE FP OK OR AND XOR NOT IID iid SST SSE SSR IG IQ II III VI UV PC IP ID AI TV CD DVD CRC DCT SNR RGB DNA QAM PSK FSK USB');
  const EN2 = set('to of in is on at by as if or an be it we no so up do am my ok vs go me us he wi fi');
  const CHEM = set('He Li Be Ne Na Mg Al Si Cl Ar Ca Fe Cu Zn Ag Au Hg Pb Sn Ni Co Mn Cr Ti');
  const NOVOW = set('why try fly dry sky shy spy cry gym nth myth rhythm lynx');
  const MARK = /[̀-ͯ]/g, OP = /[+−\-=×·\/<>≤≥≈]/;
  const vowel = w => /[aeiou]/.test(w.toLowerCase());
  const isWord = w => w.length > 2 && /^[A-Z]?[a-z]+$/.test(w) && (vowel(w) || (w.length > 3 && /y/.test(w))) && !FN.has(w);
  const greekLow = c => /[α-ωϑϕϵϱϖ]/.test(c), digit = c => /[0-9]/.test(c);
  // ctx: p1/p2 = previous two chars, unit = a unit chain is open, full = formula text, prose = the text reads as words
  function fmt(t, frag, ctx) {
    let buf = '';
    const flush = () => { if (buf) { frag.appendChild(document.createTextNode(buf)); buf = ''; } };
    const it = s => { flush(); const e = document.createElement('i'); e.className = 'mi'; e.textContent = s; frag.appendChild(e); };
    const step = c => { ctx.p2 = ctx.p1; ctx.p1 = c; };
    for (let i = 0; i < t.length;) {
      const c = t[i], m = /^(?:[A-Za-z][̀-ͯ]*)+/.exec(t.slice(i));
      if (m) {
        const raw = m[0], w = raw.replace(MARK, ''), p1 = ctx.p1, p2 = ctx.p2, nx = t.slice(i + raw.length);
        const marked = raw !== w;
        const afterNum = (p1 === ' ' && (digit(p2) || p2 === '°')) || p1 === '°' || (digit(p1) && w.length > 1) || p1 === 'μ';
        const chained = ctx.unit && /[\/·⋅]/.test(p1);
        const inParens = p1 === '(' && p2 === ' ' && /^[\/·⋅)]/.test(nx);
        const nextWord = (nx.match(/^ ([a-z]+)/) || [])[1] || '';
        let up = false, unit = false;
        if (marked) up = false;
        else if (ctx.label && w.length > 1) up = true;
        else if ((afterNum || chained || inParens) && UNIT.has(w)) up = unit = true;
        else if (digit(p1) && /^(st|nd|rd|th)$/.test(w)) up = true;
        else if (digit(p1) && /^[23]D$/.test(p1 + w)) up = true;
        else if (/['’]/.test(p1) || (p1 === '.' && /[A-Za-z]/.test(p2)) || (w.length === 1 && /^\.[a-z]\./.test(nx)) || (w.length === 1 && p1 === '.' && /[a-z]/.test(p2) && nx[0] === '.')) up = true;
        else if (FN.has(w) || ACR.has(w) || CHEM.has(w) || (w.length > 3 && w === w.toUpperCase())) up = true;
        else if (!ctx.full && digit(p1) && /^[2-6]G$/.test(w)) up = true;
        else if (!ctx.full && /^[A-Z]+$/.test(w) && (/^[0-9]/.test(nx) || /^(-ray|선)/.test(nx))) up = true;
        else if (w === 'e' && /^-[a-z]{2,}/.test(nx)) up = true;
        else if (!ctx.full && /^[A-Z]{2,}s?$/.test(w) && (w.length > 2 || /s$/.test(w)) && !digit(p1) && !(nx === '' && ctx.script)) up = true;
        else if (w.length > 1 && UNIT.has(w) && (!ctx.full || !/^[a-z]{2}$/.test(w))) up = true;
        else if (isWord(w) || /^[A-Z][a-z]+[A-Z][a-z]+$/.test(w)) up = true;
        else if (EN2.has(w.toLowerCase()) && (!ctx.full || ctx.prose || /^ [A-Za-z가-힣]/.test(nx) || (p1 === ' ' && nx[0] === ' ' && !OP.test(p2) && !OP.test(nx[1] || '')))) up = true;
        else if (!ctx.full && NOVOW.has(w.toLowerCase())) up = true;
        else if ((w === 'a' || (w === 'A' && (!p1 || /[.:!?] ?$/.test(p2 + p1)))) && nextWord.length > 1 && (isWord(nextWord) || EN2.has(nextWord))) up = true;
        else if (!ctx.full && w === 'a' && (!p1 || p1 === ' ') && /^ [A-Za-z]/.test(nx) && !FN.has((nx.match(/^ ([A-Za-z]+)/) || [])[1])) up = true;
        else if (w === 'd' && (greekLow(nx[0] || '') || /^\/d/.test(nx))) up = true;
        else if (/^d[A-Za-z]$/.test(w)) { buf += 'd'; it(w[1]); for (const ch of w) step(ch); i += 2; ctx.unit = false; continue; }
        if (up) buf += raw; else it(raw);
        for (const ch of w) step(ch);
        i += raw.length; ctx.unit = unit; continue;
      }
      if (greekLow(c)) {
        const unitPfx = c === 'μ' && ((ctx.p1 === ' ' && digit(ctx.p2)) || digit(ctx.p1)) && /^[A-Za-zΩ]/.test(t.slice(i + 1));
        let j = i + 1; while (j < t.length && /[̀-ͯ]/.test(t[j])) j++;
        if (unitPfx) buf += t.slice(i, j); else it(t.slice(i, j));
        step(c); i = j; if (!unitPfx) ctx.unit = false; continue;
      }
      buf += c; step(c); i++;
      if (c === 'Ω') ctx.unit = digit(ctx.p2) || ctx.p2 === ' ';
      else if (!/[\/·⋅0-9]/.test(c)) ctx.unit = false;
    }
    flush();
  }
  const isScript = c => SUP.includes(c) || SUB.includes(c);
  function typeset(tn, full) {
    const t = tn.nodeValue;
    if (!/[A-Za-zα-ωϑϕϵϱϖ]/.test(t) && ![...t].some(isScript)) return;
    const words = (t.match(/[A-Za-z]{3,}/g) || []).filter(w => isWord(w));
    const frag = document.createDocumentFragment(), ctx = { p1: '', p2: '', unit: false, full, prose: /[가-힣]/.test(t) || words.length > 0 };
    const us = new Map(); for (const m of t.matchAll(/(^|[^A-Za-z0-9_.])([A-Za-zα-ω]{1,2}[′″⁰¹²³⁴⁵⁶⁷⁸⁹]?)_([A-Za-z0-9]{1,4})(?![A-Za-z0-9_])/g)) us.set(m.index + m[1].length + m[2].length, m[3]);
    let i = 0;
    while (i < t.length) {
      if (us.has(i)) {
        const s = us.get(i), span = document.createElement('span'); span.className = 'm-dn';
        fmt(s, span, { p1: '', p2: '', unit: false, full: true, prose: false, label: true });
        frag.appendChild(span); ctx.p2 = ctx.p1; ctx.p1 = s[s.length - 1]; i += s.length + 1; continue;
      }
      if (isScript(t[i])) {
        const kind = SUP.includes(t[i]) ? 'up' : 'dn', K = kind === 'up' ? SUP : SUB, B = kind === 'up' ? SUPB : SUBB;
        let j = i, s = '';
        while (j < t.length && K.includes(t[j])) { s += B[K.indexOf(t[j])]; j++; }
        const span = document.createElement('span'); span.className = 'm-' + kind;
        if (kind === 'up' && s === 'T') span.textContent = 'T';
        else fmt(s, span, { p1: '', p2: '', unit: ctx.unit, full: true, prose: false });
        frag.appendChild(span); ctx.p2 = ctx.p1; ctx.p1 = s[s.length - 1]; i = j; continue;
      }
      let j = i; while (j < t.length && !isScript(t[j]) && !us.has(j)) j++;
      ctx.script = j < t.length && !us.has(j); fmt(t.slice(i, j), frag, ctx); i = j;
    }
    tn.parentNode.replaceChild(frag, tn);
  }
  const FULL = '.cz .cz-math .in', MATHP = () => PAGES.includes(document.body.dataset.page);
  function run(n) {
    if (n.dataset.mt) return; n.dataset.mt = 1;
    const full = n.closest('.cz-math') || (MATHP() && n.closest('.cz-mono,.cz-c,.cz-b'));
    if (full && /^\s*([A-Za-z0-9]{1,2} ){3,}[A-Za-z0-9]{1,2}\s*$/.test(n.textContent)) { n.classList.add('m-grid'); return; }
    if (n.closest('.cz-c,.cz-b') && /^\s*[A-Z]\s*$/.test(n.textContent)) return;
    if (!full) n.classList.add('m-in');
    const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT, { acceptNode: x => x.parentElement.closest('.mi,.m-up,.m-dn') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const list = []; while (w.nextNode()) list.push(w.currentNode);
    list.forEach(x => typeset(x, !!full));
  }
  function scan(root) { const S = MATHP() ? '.cz .e > .in' : FULL; if (root.matches && root.matches(S)) run(root); if (root.querySelectorAll) root.querySelectorAll(S).forEach(run); }
  const start = () => {
    new MutationObserver(rs => rs.forEach(r => r.addedNodes.forEach(x => { if (x.nodeType === 1) scan(x); }))).observe(document.body, { childList: true, subtree: true });
    scan(document.body);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* runtime auto-fit: shrink box labels that don't fit their box and texts that run past the stage edge (layout sizes, ignoring transforms) */
(function () {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
  const BOX = '.cz-c,.cz-n,.cz-pill,.cz-bx,.cz-act,.cz-dot';
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'ko';
  const target = n => { const zk = n.querySelector(':scope > .zk'); if (!zk) return n; return lang() === 'en' ? n.querySelector(':scope > .ze') : zk; };
  const scale = (t, f) => { const cur = parseFloat(getComputedStyle(t).fontSize), base = parseFloat(getComputedStyle(t.parentElement).fontSize); t.style.setProperty('font-size', (cur / base * f).toFixed(3) + 'em', 'important'); t.dataset.fz = 1; };
  const left = (t, el) => t === el ? 0 : (t.offsetParent === el ? t.offsetLeft : t.offsetLeft + (t.offsetParent && t.offsetParent !== el ? left(t.offsetParent, el) : 0));
  function fit(root) {
    const L = lang(), todo = [];
    root.querySelectorAll('.cz').forEach(cz => {
      const CW = cz.clientWidth; if (!CW) return;
      const em = parseFloat(getComputedStyle(cz).fontSize);
      cz.querySelectorAll(':scope > .e').forEach(el => {
        if (el.dataset['fit' + L]) return;
        const n = el.querySelector(':scope > .in'); if (!n || !n.textContent.trim()) return;
        const t = target(n); if (!t) return;
        const W = el.clientWidth, H = el.clientHeight, tw = t.offsetWidth, th = t.offsetHeight;
        if (!tw) return;
        el.dataset['fit' + L] = 1;
        if (el.matches(BOX)) { if (!W) return; const lh = parseFloat(getComputedStyle(t).fontSize) * 1.6; if (tw > W * .96 || th > Math.max(H * .98, lh)) todo.push(['box', t, W, H]); }
        else if (el.classList.contains('cz-t')) { const right = el.offsetLeft + left(t, el) + tw; if (right > CW - .1 * em) todo.push(['out', t, CW - .2 * em - el.offsetLeft - left(t, el), tw]); }
      });
    });
    todo.forEach(([k, t, a, b]) => {
      if (k === 'box') { const ws = t.style.whiteSpace; t.style.whiteSpace = 'nowrap'; const w = t.offsetWidth, h = t.offsetHeight; t.style.whiteSpace = ws; const f = Math.max(.7, Math.min(1, a * .9 / w, b * .9 / h)); if (f < .995) scale(t, f); }
      else { const f = Math.max(.72, a / b); if (f < .995) scale(t, f); }
    });
  }
  let q = 0; const run = () => { if (q) return; q = requestAnimationFrame(() => { q = 0; fit(document); }); };
  const start = () => { new MutationObserver(run).observe(document.body, { childList: true, subtree: true }); new MutationObserver(run).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] }); run(); const refit = () => { document.querySelectorAll('[data-fz]').forEach(t => { t.style.removeProperty('font-size'); delete t.dataset.fz; }); document.querySelectorAll('.cz .e[data-fitko],.cz .e[data-fiten]').forEach(e => { delete e.dataset.fitko; delete e.dataset.fiten; }); run(); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(refit); let ft = 0; document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', () => { clearTimeout(ft); ft = setTimeout(refit, 60); }); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* runtime player: a play/pause button and a scrubbable progress bar on every animated stage */
(function () {
  if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined' || typeof Element === 'undefined' || !Element.prototype.getAnimations) return;
  const TX = { ko: { play: '재생', pause: '일시정지' }, en: { play: 'Play', pause: 'Pause' } };
  const tx = () => TX[document.documentElement.lang === 'en' ? 'en' : 'ko'];
  const ICON = { play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>', pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg>' };
  const CSS = '.stage .pl{position:absolute;left:0;right:0;bottom:0;height:clamp(22px,6.4cqw,44px);z-index:30;display:flex;align-items:center;gap:clamp(5px,1.4cqw,10px);padding:0 clamp(5px,1.3cqw,10px) 0 clamp(8px,2cqw,16px);opacity:.55;transition:opacity .2s;pointer-events:none}' +
    '.stage:hover .pl,.stage .pl:focus-within,.stage .pl.drag{opacity:1}@media (hover:none){.stage .pl{opacity:.9}}' +
    '.pl-bar{position:relative;flex:1;align-self:stretch;cursor:pointer;pointer-events:auto;touch-action:none}' +
    '.pl-tr{position:absolute;left:0;right:0;top:calc(50% - 2px);height:4px;border-radius:4px;background:color-mix(in srgb,var(--ink) 18%,transparent);overflow:hidden;transition:top .12s,height .12s}' +
    '.pl-bar:hover .pl-tr,.pl.drag .pl-tr{top:calc(50% - 3px);height:6px}' +
    '.pl-fi{position:absolute;inset:0;background:var(--accent);transform-origin:0 50%;transform:scaleX(0)}' +
    '.pl-tk{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:var(--surface)}' +
    '.pl-th{position:absolute;top:calc(50% - 6px);left:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 2px var(--surface);transform:scale(0);transition:transform .12s}' +
    '.pl-bar:hover .pl-th,.pl.drag .pl-th{transform:scale(1)}' +
    '.pl-bt{flex:none;width:clamp(20px,4.8cqw,34px);height:clamp(20px,4.8cqw,34px);margin:0;border:0;padding:0;border-radius:50%;display:grid;place-items:center;background:var(--surface);color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.2);cursor:pointer;pointer-events:auto}' +
    '.pl-bt svg{width:48%;height:48%;fill:currentColor}.pl-bt:focus-visible{outline:2px solid var(--accent);outline-offset:2px}';
  const S = new Map(), vis = new Set();
  const czOf = s => s.el.querySelector('.cz');
  function anims(s) {
    const cz = czOf(s);
    if (!cz) return [];
    if (s.cz !== cz) { s.cz = cz; s.list = null; s.user = null; s.api = false; s.off = false; ticks(s); }
    if (!s.list || !s.list.length) s.list = cz.getAnimations({ subtree: true });
    return s.list;
  }
  function ticks(s) {
    const n = s.cz.querySelectorAll('.cz-cap').length, seg = .86 / Math.max(n, 1);
    s.tks.innerHTML = n > 1 ? Array.from({ length: n - 1 }, (_, k) => `<i class="pl-tk" style="left:${((.05 + (k + 1) * seg) * 100).toFixed(2)}%"></i>`).join('') : '';
  }
  const dur = a => { const d = a.effect && a.effect.getTiming().duration; return typeof d === 'number' && d > 0 ? d : 0; };
  function frac(a) { const d = dur(a), t = a.currentTime; return d && t != null ? (((t % d) + d) % d) / d : 0; }
  function show(s, f) { s.fi.style.transform = `scaleX(${f})`; s.th.style.left = `${f * 100}%`; }
  function icon(s, running) {
    const L = tx(), key = running + document.documentElement.lang;
    if (s.shown === key) return;
    s.shown = key;
    s.bt.innerHTML = running ? ICON.pause : ICON.play;
    s.bt.setAttribute('aria-label', running ? L.pause : L.play);
    s.bt.title = running ? L.pause : L.play;
  }
  function seek(s, f) {
    const list = anims(s);
    if (!list.length) return;
    const t = Math.min(Math.max(f, 0), .999) * dur(list[0]);
    list.forEach(a => { a.currentTime = t; });
    show(s, t / dur(list[0]));
  }
  function toggle(s) {
    const list = anims(s);
    if (!list.length) return;
    const run = list[0].playState === 'running';
    list.forEach(a => run ? a.pause() : a.play());
    s.user = run ? 'pause' : 'play'; s.api = true; s.off = false;
    icon(s, !run);
  }
  function attach(el) {
    if (!el.querySelector('.cz') || el.querySelector(':scope > .pl')) return;
    const ui = document.createElement('div');
    ui.className = 'pl';
    ui.innerHTML = '<div class="pl-bar" aria-hidden="true"><div class="pl-tr"><div class="pl-fi"></div><div class="pl-tks"></div></div><div class="pl-th"></div></div><button class="pl-bt" type="button"></button>';
    el.appendChild(ui);
    const s = { el, ui, bar: ui.firstChild, fi: ui.querySelector('.pl-fi'), tks: ui.querySelector('.pl-tks'), th: ui.querySelector('.pl-th'), bt: ui.querySelector('.pl-bt') };
    if (!el.closest('.d-st')) s.bt.tabIndex = -1;
    S.set(el, s);
    ['click', 'dblclick', 'mousedown', 'touchstart'].forEach(ev => ui.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
    ui.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') e.stopPropagation(); });
    s.bt.addEventListener('click', () => toggle(s));
    const at = e => { const r = s.bar.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    s.bar.addEventListener('pointerdown', e => {
      const list = anims(s);
      if (!list.length) return;
      e.preventDefault(); e.stopPropagation();
      s.bar.setPointerCapture(e.pointerId);
      s.drag = true; s.was = list[0].playState === 'running'; s.api = true; s.off = false;
      ui.classList.add('drag');
      list.forEach(a => a.pause());
      seek(s, at(e));
    });
    s.bar.addEventListener('pointermove', e => { if (s.drag) seek(s, at(e)); });
    const end = () => {
      if (!s.drag) return;
      s.drag = false; ui.classList.remove('drag');
      if (s.was) anims(s).forEach(a => a.play());
    };
    s.bar.addEventListener('pointerup', end); s.bar.addEventListener('pointercancel', end);
    io.observe(el);
    anims(s); icon(s, true);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    const s = S.get(e.target);
    if (!s) return;
    if (e.isIntersecting) vis.add(s); else vis.delete(s);
    if (s.api && s.user !== 'pause') {
      const list = anims(s);
      if (!e.isIntersecting && list.length && list[0].playState === 'running') { list.forEach(a => a.pause()); s.off = true; }
      else if (e.isIntersecting && s.off) { list.forEach(a => a.play()); s.off = false; }
    }
    loop();
  }), { rootMargin: '120px 0px' });
  let raf = 0;
  function frame() {
    raf = 0;
    vis.forEach(s => {
      if (!s.el.isConnected) { vis.delete(s); return; }
      const list = anims(s);
      if (!list.length) return;
      if (!s.drag) show(s, frac(list[0]));
      icon(s, s.drag ? s.was : list[0].playState === 'running');
    });
    if (vis.size) raf = requestAnimationFrame(frame);
  }
  function loop() { if (!raf && vis.size) raf = requestAnimationFrame(frame); }
  function scan() { document.querySelectorAll('.stage').forEach(attach); }
  let q = 0;
  const start = () => {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    scan();
    new MutationObserver(() => { if (q) return; q = requestAnimationFrame(() => { q = 0; scan(); loop(); }); }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
