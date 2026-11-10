(() => {
const { item, sec, page, C } = CZ;
const XT = (() => {
const ex = t => Array.isArray(t) ? t.map(ex) : (typeof t === 'string' ? t.replace(/</g, '&lt;') : t);
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { t = ex(t); const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'jsx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */


/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono jsx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono jsx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c jsx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono jsx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c jsx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'jsx-s jsx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono jsx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono jsx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono jsx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono jsx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono jsx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'jsx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'jsx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'jsx-xs jsx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono jsx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'jsx-a', g: 'jsx-g', r: 'jsx-r', w: 'jsx-w', m: 'cz-mono', s: 'jsx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'jsx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono jsx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono jsx-cw', o.cst || 0, { off: o.coff }));
    (o.hl || []).forEach((h, i) => { if (!h) return; const [a, n, c] = h; rect(S, 'hl' + i, cx + .15, cy + .27 + a * lh, cw - .3, (n || 1) * lh, c || 'accent', 20, i + 1, { r: .15, off: (o.hlKeep && o.hlKeep.includes(i + 1)) ? 0 : i + 2 }); });
  }
  const R = o.R ?? (code.length ? cx + cw + .7 : 1), RW = o.RW ?? (31.4 - R);
  (o.side || []).forEach((list, i) => { if (!list) return; const keep = o.keep && o.keep.includes(i + 1); lines(S, 's' + i + '_', R, o.sy ?? .6, list, i + 1, keep ? 0 : i + 2, { w: RW }); });
  if (o.draw) o.draw(S, { R, RW, lh, cx, cy, cw });
  notesSplit(S, 'k', 15.6, o.notes);
  fin(S, 'z', 15.6, o.fin);
  o.caps.forEach((c, i) => S.cap(i + 1, c[0], c[1]));
  return S;
}
/* small helpers for diagrams */
const chip = (S, k, x, y, w, label, color, st, o = {}) => cell(S, k, x, y, w, o.h || 1.1, label, color, o.pct ?? 24, st, { off: o.off, css: o.css });
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'jsx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.jsx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.jsx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.jsx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.jsx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.jsx-r .in{color:var(--danger);font-weight:800}
.jsx-g .in{color:var(--ok);font-weight:800}
.jsx-a .in{color:var(--accent);font-weight:800}
.jsx-w .in{color:var(--warn);font-weight:800}
.jsx-c .in{font-size:.6em;font-weight:700}
.jsx-c2 .in{font-size:.5em;font-weight:700}
.jsx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.jsx-wr .in{white-space:normal!important}
.jsx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.jsx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== JavaScript · 1. values and syntax ===== */
function sTypes() {
  return CW('js-types', {
    code: ['let a = 1;', 'let b = a;        // 값 복사', 'b = 2;            // a는 그대로 1', 'const o = { n: 1 };', 'const p = o;      // 참조 복사', 'p.n = 2;          // o.n도 2'].map((t, i) => [t, ['let a = 1;', 'let b = a;        // copies the value', 'b = 2;            // a stays 1', 'const o = { n: 1 };', 'const p = o;      // copies the reference', 'p.n = 2;          // o.n is 2 too'][i]]),
    hl: [[0, 2], [2, 1], [3, 2], [5, 1]],
    draw: (S) => {
      const X = 18.4;
      lbl(S, 'st', X, .4, ['스택 (변수)', 'stack (variables)'], 'a', 0); lbl(S, 'hp', 26.0, .4, ['힙 (객체)', 'heap (objects)'], 'a', 0);
      chip(S, 'va', X, 1.6, 3.2, 'a = 1', 'line', 1); chip(S, 'vb', X + 3.6, 1.6, 3.2, 'b = 1', 'line', 1, { off: 2 }); chip(S, 'vb2', X + 3.6, 1.6, 3.2, 'b = 2', 'warn', 2);
      lbl(S, 'n1', X, 3.0, ['서로 다른 칸에 따로 저장', 'stored in separate slots'], 'g', 2, { off: 3 });
      chip(S, 'vo', X, 4.6, 3.2, 'o', 'accent', 3); chip(S, 'vp', X, 6.2, 3.2, 'p', 'accent', 3);
      chip(S, 'obj', 26.0, 5.2, 5.0, '{ n: 1 }', 'ok', 3, { h: 1.4, off: 4 }); chip(S, 'obj2', 26.0, 5.2, 5.0, '{ n: 2 }', 'danger', 4, { h: 1.4 });
      arw(S, 'ao', [X + 3.3, 5.15], [26.0, 5.6], 3); arw(S, 'ap', [X + 3.3, 6.75], [26.0, 6.2], 3);
      lbl(S, 'n3', X, 8.0, ['두 변수가 같은 객체를 가리켜요', 'both variables point at one object'], 'w', 3, { off: 4 });
      lbl(S, 'n4', X, 8.0, ['p로 바꾸면 o로 봐도 바뀌어 있어요', 'a change through p shows through o'], 'r', 4);
      lbl(S, 'n5', X, 9.1, 'o === p  // true', 'm', 4);
    },
    notes: [['원시 값(숫자, 문자열 등)은 변수에 값 자체가 들어가서, 대입하면 값이 복사돼요', 'primitives (numbers, strings and so on) live in the variable itself, so assignment copies the value'], ['b를 바꿔도 a는 그대로예요 · 둘은 서로 다른 칸이에요', 'changing b leaves a alone; they are separate slots'], ['객체를 대입하면 객체가 아니라 “가리키는 주소(참조)”가 복사돼요', 'assigning an object copies a reference to it, not the object'], ['그래서 p로 고친 내용이 o에도 보여요 · ===도 같은 객체인지만 비교해요', 'so changes through p show up through o, and === only asks whether it is the same object']],
    fin: [['원시 타입 7가지(string, number, bigint, boolean, undefined, null, symbol)는 값으로, 나머지는 모두 참조로 다뤄요', 'the seven primitives (string, number, bigint, boolean, undefined, null, symbol) behave as values; everything else is handled by reference', 'jsx-xs jsx-a'], ['배열·함수·Date도 객체라 참조로 전달돼요 · 함수 인자로 넘긴 객체를 고치면 원본이 바뀌어요', 'arrays, functions and dates are objects too, so mutating an object passed to a function changes the caller’s copy'], ['typeof null === "object"는 언어 초기의 버그가 굳은 것 · null 검사는 === null로 해요', 'typeof null === "object" is a historic bug kept for compatibility; test for null with === null']],
    caps: [['원시 값은 값 복사', 'Primitives copy values'], ['서로 독립', 'Independent copies'], ['객체는 참조 복사', 'Objects copy references'], ['같은 객체를 공유', 'Sharing one object'], ['원시 값과 참조', 'Values and references']]
  });
}

function sLetConst() {
  return CW('js-letconst', {
    code: ['for (var i = 0; i < 3; i++)', '  setTimeout(() => log(i));    // 3 3 3', '', 'for (let j = 0; j < 3; j++)', '  setTimeout(() => log(j));    // 0 1 2', '', 'const arr = [1];', 'arr.push(2);   // OK: 내용은 바꿀 수 있어요', 'arr = [];      // TypeError: 재할당 불가'].map((t, i) => i === 7 ? [t, 'arr.push(2);   // OK: contents can change'] : i === 8 ? [t, 'arr = [];      // TypeError: no reassignment'] : t),
    hl: [[0, 2, 'danger'], [3, 2, 'ok'], [6, 3, 'warn'], null],
    side: [
      [[['var는 함수 단위 스코프', 'var is function-scoped'], 'a'], [['반복문 전체가 i 하나를 공유', 'the whole loop shares one i'], ''], [['타이머가 돌 땐 이미 i = 3', 'by the time timers run, i = 3'], 'r']],
      [[['let은 블록 단위 스코프', 'let is block-scoped'], 'a'], [['반복마다 새 j가 생겨요', 'each iteration gets a fresh j'], ''], [['각 콜백이 자기 j를 기억', 'each callback remembers its own j'], 'g']],
      [[['const는 “다시 대입 금지”', 'const forbids reassignment'], 'a'], [['객체 안의 내용은 바뀔 수 있어요', 'the object’s contents can still change'], 'w'], [['내용까지 막으려면 Object.freeze', 'to lock contents, use Object.freeze'], '']],
      [[['기본은 const', 'default to const'], 'g s'], [['다시 대입할 때만 let', 'let only when reassigning'], 'a s'], [['var는 쓰지 않기', 'avoid var'], 'r s']]
    ],
    notes: [['var로 만든 i는 함수 전체에 하나뿐이라, 나중에 실행되는 콜백 셋이 모두 마지막 값 3을 봐요', 'a var-declared i is a single variable for the whole function, so three later callbacks all see the final 3'], ['let은 블록마다, 반복문에서는 반복마다 새 변수를 만들어 0, 1, 2가 나와요', 'let creates a variable per block, and per iteration in loops, printing 0, 1, 2'], ['const는 변수에 다른 값을 다시 넣는 것만 막아요 · 배열과 객체의 내용은 바꿀 수 있어요', 'const only blocks reassignment; array and object contents can still change'], ['기본은 const, 바뀌어야 하면 let, var는 쓰지 않는 것이 요즘 관례예요', 'the modern habit: const by default, let when it must change, never var']],
    fin: [['var는 함수 스코프 + 호이스팅, let·const는 블록 스코프 + TDZ', 'var is function-scoped and hoisted; let and const are block-scoped with a temporal dead zone', 'jsx-xs jsx-a'], ['const가 많을수록 “이 값은 안 바뀐다”는 정보가 코드에 남아 읽기 쉬워요', 'more const means more “this never changes” signals, making code easier to read'], ['ESLint의 prefer-const, no-var 규칙으로 자동으로 지킬 수 있어요', 'ESLint’s prefer-const and no-var rules enforce it automatically']],
    caps: [['var와 반복문', 'var in a loop'], ['let은 반복마다 새로', 'let: fresh each time'], ['const의 의미', 'What const means'], ['언제 무엇을', 'Which to use'], ['var·let·const', 'var, let and const']]
  });
}

function sHoisting() {
  return CW('js-hoisting', {
    code: ['console.log(x);   // undefined', 'var x = 5;', '', 'console.log(y);   // ReferenceError', 'let y = 5;', '', 'hello();          // "hi"', 'function hello() { log("hi"); }', '', 'bye();            // TypeError', 'var bye = () => log("bye");'],
    hl: [[0, 2, 'warn'], [3, 2, 'danger'], [6, 2, 'ok'], [9, 2, 'danger']],
    draw: (S) => {
      const X = 18.2;
      lbl(S, 't0', X, .4, ['실행 전 준비 단계에서 미리 등록', 'registered before any line runs'], 'a', 0);
      const R = [['x', 'undefined', 'warn', 1], ['y', ['(초기화 전 · TDZ)', '(uninitialized · TDZ)'], 'danger', 2], ['hello', ['함수 전체', 'the whole function'], 'ok', 3], ['bye', 'undefined', 'warn', 4]];
      R.forEach(([n, v, c, st], i) => { chip(S, 'rn' + i, X, 1.6 + i * 1.5, 3.6, n, 'line', 0); chip(S, 'rv' + i, X + 3.9, 1.6 + i * 1.5, 9.0, v, c, st); });
      lbl(S, 'n1', X, 8.0, ['var는 선언만 끌어올리고 undefined로 시작', 'var hoists the declaration, starting as undefined'], 'w', 1, { off: 2 });
      lbl(S, 'n2', X, 8.0, ['let·const도 등록되지만 선언 줄 전엔 접근 금지', 'let and const are registered but untouchable before their line'], 'r', 2, { off: 3, w: 13 });
      lbl(S, 'n3', X, 8.0, ['함수 선언은 본문까지 통째로 끌어올려요', 'function declarations are hoisted whole'], 'g', 3, { off: 4 });
      lbl(S, 'n4', X, 8.0, ['함수 표현식은 변수 규칙을 따라요', 'function expressions follow variable rules'], 'r', 4);
    },
    notes: [['코드를 실행하기 전에 엔진은 선언을 먼저 훑어 등록해요 · var x는 undefined로 시작해요', 'before running code the engine registers every declaration first; var x starts as undefined'], ['let·const도 등록은 되지만 선언 줄에 닿기 전엔 TDZ라서 읽으면 ReferenceError예요', 'let and const are registered too but sit in a temporal dead zone until their line, so reading them throws'], ['function 선언은 본문까지 미리 만들어져서 위에서 호출해도 돼요', 'function declarations are created in full, so they can be called above their definition'], ['변수에 담은 함수(표현식·화살표)는 변수 규칙대로라 위에서 부르면 실패해요', 'functions stored in variables follow variable rules and fail when called too early']],
    fin: [['호이스팅: 선언이 스코프의 맨 위로 끌어올려진 것처럼 동작하는 현상', 'hoisting: declarations behave as if moved to the top of their scope', 'jsx-xs jsx-a'], ['TDZ 덕분에 let·const는 “선언 전에 쓰는” 실수를 바로 오류로 알려줘요', 'the TDZ turns use-before-declaration mistakes into immediate errors'], ['읽기 쉽게 하려면 변수는 쓰기 전에, 맨 위 가까이 선언하세요', 'for readability, declare variables before use, near the top']],
    caps: [['var 호이스팅', 'Hoisting var'], ['TDZ', 'The TDZ'], ['함수 선언', 'Function declarations'], ['함수 표현식', 'Function expressions'], ['호이스팅과 TDZ', 'Hoisting and the TDZ']]
  });
}

function sEquality() {
  return CW('js-equality', {
    code: ['0 == ""                  // true', '0 == "0"                 // true', '"" == "0"                // false', 'null == undefined        // true', 'null == 0                // false', 'NaN === NaN              // false', 'Object.is(NaN, NaN)      // true', 'Object.is(0, -0)         // false'],
    hl: [[0, 2], [2, 1, 'danger'], [3, 2, 'warn'], [5, 3, 'warn']],
    side: [
      [[['==는 타입이 다르면 변환 후 비교', '== converts types before comparing'], 'a'], ['"" → 0,  "0" → 0', 'm'], [['그래서 둘 다 true', 'so both are true'], '']],
      [[['그런데 "" == "0"은 false', 'yet "" == "0" is false'], 'r'], [['같은 타입끼리는 변환 없이 비교', 'same types compare without conversion'], ''], [['→ == 는 전이적이지 않아요', '→ == is not transitive'], 'r']],
      [[['null과 undefined는 서로만 같아요', 'null and undefined equal only each other'], 'w'], [['x == null 은 둘을 한 번에 검사', 'x == null checks both at once'], 'm']],
      [[['NaN은 자기 자신과도 달라요', 'NaN is unequal even to itself'], 'w'], ['Number.isNaN(x)', 'm g'], [['Object.is: NaN은 같고 0과 −0은 달라요', 'Object.is: NaN equals NaN, 0 and −0 differ'], '']]
    ],
    notes: [['==는 양쪽 타입이 다르면 숫자 쪽으로 변환해 비교해요 · 빈 문자열과 "0"이 모두 0이 돼요', '== converts mismatched types, usually toward numbers, so both "" and "0" become 0'], ['그래서 a == b, b == c여도 a == c가 아닐 수 있어요 · 예측하기 어려워요', 'so a == b and b == c do not imply a == c; it is hard to predict'], ['null과 undefined는 ==로 서로만 같아요 · x == null은 둘을 함께 거르는 유일한 관용구예요', 'null and undefined are == only to each other; x == null is the one common idiom that uses it'], ['=== 는 변환 없이 비교하지만 NaN은 예외 · Number.isNaN이나 Object.is를 써요', '=== never converts, but NaN is the exception; use Number.isNaN or Object.is']],
    fin: [['기본은 === (엄격한 같음) · 타입 변환 없이 타입과 값이 모두 같아야 true', 'default to === (strict equality): true only when type and value both match, with no conversion', 'jsx-xs jsx-a'], ['객체는 ===도 같은 객체인지(참조)만 비교해요 · 내용 비교는 직접 하거나 라이브러리로', 'objects compare by reference even with ===; compare contents yourself or with a library'], ['ESLint eqeqeq 규칙이 == 사용을 막아 줘요', 'ESLint’s eqeqeq rule flags ==']],
    caps: [['==의 타입 변환', 'Coercion in =='], ['전이적이지 않은 ==', '== is not transitive'], ['null과 undefined', 'null and undefined'], ['NaN과 Object.is', 'NaN and Object.is'], ['== 와 ===', '== versus ===']]
  });
}

function sTruthy() {
  return CW('js-truthy', {
    code: [],
    draw: (S) => {
      lbl(S, 'h0', 1, .4, ['if 안에서 false로 취급되는 값은 딱 8개 (falsy)', 'exactly eight values count as false in an if (falsy)'], 'a', 0);
      ['false', '0', '-0', '0n', '""', 'null', 'undefined', 'NaN'].forEach((v, i) => chip(S, 'f' + i, 1 + i * 3.8, 1.6, 3.4, v, 'danger', 0));
      lbl(S, 'h1', 1, 3.4, ['나머지는 모두 truthy · 헷갈리는 것들', 'everything else is truthy, including these'], 'g', 1);
      ['"0"', '"false"', '" "', '[]', '{}', '-1', 'Infinity'].forEach((v, i) => chip(S, 't' + i, 1 + i * 3.8, 4.6, 3.4, v, 'ok', 1));
      codeLines(S, 'c2', 1, 6.6, ['const n = count || 10;   // count가 0이면 10이 돼요 ✗'].map(t => [t, 'const n = count || 10;   // count 0 becomes 10 ✗']), 2, 0, { cls: 'jsx-r' });
      lbl(S, 'c2n', 1, 7.7, ['|| 는 falsy면 오른쪽 값 · 0과 ""도 “없음” 취급', '|| falls back on any falsy value, treating 0 and "" as missing'], '', 2);
      codeLines(S, 'c3', 1, 9.2, ['const n = count ?? 10;   // null·undefined일 때만 10 ✓'].map(t => [t, 'const n = count ?? 10;   // 10 only for null/undefined ✓']), 3, 0, { cls: 'jsx-g' });
      lbl(S, 'c3n', 1, 10.3, ['?? 는 진짜로 값이 없을 때만 기본값', '?? defaults only when the value is truly absent'], 'g', 3);
      codeLines(S, 'c4', 1, 11.8, ['if (items.length) …      // 0이면 건너뜀', 'if (user) …              // null·undefined 거르기', '!!value                  // 불리언으로 바꾸기'].map((t, i) => [t, ['if (items.length) …      // skipped when 0', 'if (user) …              // filters null/undefined', '!!value                  // convert to boolean'][i]]), 4, 0);
    },
    notes: [['조건문은 값을 불리언으로 바꿔 판단해요 · false로 바뀌는 값은 이 8개뿐이에요', 'conditions convert values to booleans, and only these eight become false'], ['"0", "false", 빈 배열, 빈 객체는 모두 true예요 · 다른 언어와 달라 자주 헷갈려요', '"0", "false", empty arrays and empty objects are all true, unlike several other languages'], ['|| 로 기본값을 주면 0이나 빈 문자열 같은 정상 값도 덮어써요', 'defaulting with || overwrites legitimate values such as 0 or ""'], ['??는 null·undefined일 때만 기본값을 줘요 · 길이·존재 검사는 truthy를 짧게 활용해요', '?? defaults only for null and undefined; truthiness still makes length and existence checks concise']],
    fin: [['falsy 8개: false, 0, −0, 0n, "", null, undefined, NaN · 그 밖은 모두 truthy', 'the eight falsy values: false, 0, −0, 0n, "", null, undefined, NaN; everything else is truthy', 'jsx-xs jsx-a'], ['기본값은 ??, 존재 여부가 아니라 “참·거짓”이 필요할 때만 ||', 'use ?? for defaults and || only when you really mean any falsy value'], ['빈 배열 검사는 if (arr) 가 아니라 if (arr.length)', 'test for empty arrays with if (arr.length), not if (arr)']],
    caps: [['falsy 값 8개', 'The eight falsy values'], ['헷갈리는 truthy', 'Surprising truthy values'], ['||의 함정', 'The || trap'], ['??와 활용', '?? and everyday checks'], ['truthy와 falsy', 'Truthy and falsy']]
  });
}

function sDestructure() {
  return CW('js-destructure', {
    code: ['const user = { name: "Kim", age: 30,', '  address: { city: "Seoul" } };', '', 'const { name, age: years = 0 } = user;', 'const { address: { city } } = user;', 'const [first, , third = "c"] = ["a", "b"];', 'function greet({ name, lang = "ko" }) { … }', '[a, b] = [b, a];          // 값 바꾸기'].map((t, i) => i === 7 ? [t, '[a, b] = [b, a];          // swap'] : t),
    hl: [[3, 1], [4, 1], [5, 1], [6, 2]],
    side: [
      [[['객체에서 이름으로 꺼내기', 'pull properties out by name'], 'a'], ['name  → "Kim"', 'm'], [['years → 30 (이름을 바꿔 받기)', 'years → 30 (renamed)'], 'm'], [['없으면 = 뒤의 기본값', 'missing → the default after ='], '']],
      [[['중첩된 객체도 한 번에', 'nested objects in one go'], 'a'], ['city → "Seoul"', 'm'], [['address 자체는 변수로 안 생겨요', 'address itself is not bound'], 'w']],
      [[['배열은 위치로 꺼내기', 'arrays destructure by position'], 'a'], ['first → "a"', 'm'], [['빈칸(,)으로 건너뛰기', 'skip with an empty slot'], ''], [['third → "c" (기본값)', 'third → "c" (default)'], 'm']],
      [[['함수 인자에서 바로 · 옵션 객체에 딱', 'right in parameters: ideal for option objects'], 'a'], [['임시 변수 없이 두 값 교환', 'swap two values with no temp variable'], 'g']]
    ],
    notes: [['구조 분해는 객체·배열에서 원하는 값만 골라 변수로 만들어요 · 이름을 바꾸고 기본값도 줄 수 있어요', 'destructuring pulls chosen values out of objects and arrays into variables, with renaming and defaults'], ['중첩된 구조도 모양 그대로 써서 한 번에 꺼내요', 'nested structures are unpacked in one go by writing their shape'], ['배열은 위치로 꺼내고, 쉼표로 건너뛰고, 기본값을 줄 수 있어요', 'arrays unpack by position, with commas to skip and defaults for missing items'], ['함수 매개변수에 쓰면 옵션 객체를 받기 편하고, 배열로 두 값을 바로 바꿀 수 있어요', 'in parameters it makes option objects easy, and arrays swap two values in one line']],
    fin: [['구조 분해 할당: 값의 모양을 그대로 적어 필요한 부분만 꺼내는 문법', 'destructuring assignment unpacks the parts you need by writing the value’s shape', 'jsx-xs jsx-a'], ['없는 깊은 경로를 꺼내면 TypeError · 기본값 = {}로 막을 수 있어요', 'unpacking a missing nested path throws; a default of = {} guards it'], ['React의 const [state, setState] = useState()도 배열 구조 분해예요', 'React’s const [state, setState] = useState() is array destructuring']],
    caps: [['객체 구조 분해', 'Object destructuring'], ['중첩 구조', 'Nested shapes'], ['배열 구조 분해', 'Array destructuring'], ['함수 인자와 교환', 'Parameters and swaps'], ['구조 분해 할당', 'Destructuring assignment']]
  });
}

function sSpread() {
  return CW('js-spread', {
    code: ['const nums = [3, 1, 4];', 'Math.max(...nums);           // 4', 'const copy = [...nums, 5];   // [3, 1, 4, 5]', 'const base = { theme: "light", size: 14 };', 'const cfg = { ...base, theme: "dark" };', 'function sum(...xs) {', '  return xs.reduce((a, b) => a + b, 0);', '}', 'const { password, ...safe } = user;'],
    hl: [[1, 1], [2, 1], [3, 2], [5, 4]],
    side: [
      [[['... 가 배열을 낱개로 펼쳐요', '... spreads an array into items'], 'a'], ['Math.max(3, 1, 4)', 'm']],
      [[['새 배열로 복사하며 추가', 'copy into a new array and add'], 'a'], [['원본 nums는 그대로', 'nums is untouched'], 'g']],
      [[['객체 합치기: 뒤에 온 값이 이겨요', 'merge objects: later keys win'], 'a'], ['{ theme: "dark", size: 14 }', 'm'], [['한 단계만 복사(얕은 복사)', 'only one level deep (shallow)'], 'w']],
      [[['나머지(...rest): 남은 것을 모으기', 'rest (...rest) gathers what is left'], 'a'], ['xs = [1, 2, 3]', 'm'], [['password만 빼고 나머지를 safe로', 'safe gets everything except password'], 'g']]
    ],
    notes: [['함수 호출에서 ...은 배열을 인자 여러 개로 펼쳐요', 'in a call, ... spreads an array into separate arguments'], ['배열 리터럴 안에서는 원본을 바꾸지 않고 새 배열을 만들어요', 'inside an array literal it builds a new array without touching the original'], ['객체도 펼쳐서 합칠 수 있어요 · 같은 키는 뒤의 것이 이기고, 안쪽 객체는 공유돼요', 'objects spread and merge too; later keys win and nested objects stay shared'], ['같은 ...이 매개변수나 구조 분해에서는 반대로 “나머지를 모으는” 역할을 해요', 'the same ... in parameters or destructuring does the opposite, gathering the rest']],
    fin: [['전개(spread)는 펼치고, 나머지(rest)는 모아요 · 위치에 따라 역할이 정해져요', 'spread expands and rest collects; where ... appears decides which', 'jsx-xs jsx-a'], ['React·Redux의 불변 업데이트({ ...state, count: 1 })의 기본 도구예요', 'it is the basic tool for immutable updates in React and Redux ({ ...state, count: 1 })'], ['큰 배열을 함수 인자로 펼치면 인자 개수 한계에 걸릴 수 있어요', 'spreading huge arrays into a call can hit argument-count limits']],
    caps: [['호출에서 펼치기', 'Spread in calls'], ['배열 복사', 'Copying arrays'], ['객체 합치기', 'Merging objects'], ['나머지 모으기', 'Gathering the rest'], ['전개와 나머지', 'Spread and rest']]
  });
}

function sOptional() {
  return CW('js-optional', {
    code: ['user.address.city', '// TypeError: Cannot read … of undefined', '', 'user.address?.city     // undefined', 'user.getName?.()       // 없으면 호출 안 함', 'list?.[0]', '', 'const size = opts.size ?? 16;', 'const name = user?.profile?.nick ?? "익명";'].map((t, i) => i === 4 ? [t, 'user.getName?.()       // no call if missing'] : i === 8 ? [t, 'const name = user?.profile?.nick ?? "anon";'] : t),
    hl: [[0, 2, 'danger'], [3, 3, 'ok'], [7, 1], [8, 1, 'ok']],
    side: [
      [[['중간이 없으면 바로 터져요', 'a missing link throws immediately'], 'r'], [['API 응답이 비었을 때 흔한 오류', 'a classic when an API omits a field'], '']],
      [[['?. 앞이 null·undefined면', 'if what precedes ?. is null/undefined'], 'a'], [['거기서 멈추고 undefined', 'stop and return undefined'], 'g'], [['함수 호출 ?.(), 인덱스 ?.[] 도 가능', 'also for calls ?.() and indexes ?.[]'], '']],
      [[['??: null·undefined일 때만 오른쪽 값', '??: right side only for null/undefined'], 'a'], [['size가 0이면 0 그대로 ✓', 'a size of 0 stays 0 ✓'], 'g']],
      [[['둘을 함께: 안전하게 꺼내고 기본값', 'together: read safely, then default'], 'a'], [['남발하면 진짜 버그도 조용히 숨어요', 'overuse hides real bugs silently'], 'w']]
    ],
    notes: [['중간 객체가 없을 때 속성을 읽으면 TypeError로 프로그램이 멈춰요', 'reading through a missing intermediate object throws a TypeError'], ['?.는 앞의 값이 null이나 undefined면 더 가지 않고 undefined를 돌려줘요', '?. stops and returns undefined when the value before it is null or undefined'], ['??는 왼쪽이 null·undefined일 때만 오른쪽 기본값을 써요 · 0과 ""는 지켜요', '?? uses the default only for null and undefined, keeping 0 and ""'], ['둘을 합치면 깊은 경로를 안전하게 읽고 기본값까지 한 줄에 · 단, 꼭 있어야 할 값엔 쓰지 마세요', 'combined they read deep paths safely with a default in one line, but do not use them where a value must exist']],
    fin: [['옵셔널 체이닝 ?. 과 null 병합 ?? : “없을 수도 있는 값”을 짧고 안전하게 다루는 문법(ES2020)', 'optional chaining ?. and nullish coalescing ?? handle possibly missing values concisely and safely (ES2020)', 'jsx-xs jsx-a'], ['?.는 단락 평가라 뒤의 함수 호출·계산도 함께 건너뛰어요', '?. short-circuits, skipping any calls or computation after it'], ['?? 와 || 를 괄호 없이 섞으면 문법 오류예요', 'mixing ?? with || without parentheses is a syntax error']],
    caps: [['깊은 속성의 함정', 'The deep-property trap'], ['?. 로 안전하게', 'Safe with ?.'], ['?? 기본값', 'Defaults with ??'], ['함께 쓰기', 'Using them together'], ['옵셔널 체이닝과 ??', 'Optional chaining and ??']]
  });
}
/* ===== JavaScript · 2. functions ===== */
function sScope() {
  return CW('js-scope', {
    code: ['const g = "전역";', 'function outer() {', '  const o = "바깥";', '  function inner() {', '    const i = "안쪽";', '    console.log(i, o, g);', '  }', '  inner();', '}', 'console.log(o);   // ReferenceError'].map((t, i) => i === 0 ? [t, 'const g = "global";'] : i === 2 ? [t, '  const o = "outer";'] : i === 4 ? [t, '    const i = "inner";'] : t),
    hl: [[4, 2], [2, 1], [0, 1], [9, 1, 'danger']],
    draw: (S) => {
      const X = 19.0;
      frame(S, 'fg', X, .6, 12.2, 11.0, 'ink-3', 0, { w: .1 }); lbl(S, 'fgl', X + .3, .7, ['전역 스코프', 'global scope'], 'a', 0); chip(S, 'vg', X + 9.0, .8, 2.8, 'g', 'line', 0);
      frame(S, 'fo', X + .6, 2.4, 11.0, 8.6, 'warn', 0, { w: .1 }); lbl(S, 'fol', X + .9, 2.5, 'outer', 'm w', 0); chip(S, 'vo', X + 6.6, 2.6, 2.8, 'o', 'line', 0);
      frame(S, 'fi', X + 1.2, 4.2, 9.8, 6.2, 'accent', 0, { w: .1 }); lbl(S, 'fil', X + 1.5, 4.3, 'inner', 'm a', 0); chip(S, 'vi', X + 3.8, 4.4, 3.0, 'i', 'line', 0);
      chip(S, 'q', X + 1.6, 8.4, 8.8, 'console.log(i, o, g)', 'accent', 0, { pct: 14 });
      tsets(S, 'vi', [[1, 'ok', 40]]); tsets(S, 'vo', [[2, 'ok', 40]]); tsets(S, 'vg', [[3, 'ok', 40]]);
      arw(S, 'a1', [X + 4.8, 8.4], [X + 5.3, 5.5], 1, { color: 'ok' }); arw(S, 'a2', [X + 7.6, 8.4], [X + 8.0, 3.7], 2, { color: 'ok' }); arw(S, 'a3', [X + 10.0, 8.4], [X + 10.4, 1.9], 3, { color: 'ok' });
      lbl(S, 'n4', X, 12.2, ['밖에서는 안쪽 이름을 볼 수 없어요', 'outer code cannot see inner names'], 'r', 4);
    },
    notes: [['변수를 찾을 때는 먼저 지금 함수의 스코프에서 찾아요 · i는 바로 inner 안에 있어요', 'a variable is looked up first in the current function’s scope; i is right there in inner'], ['없으면 한 겹 바깥 스코프로 올라가요 · o는 outer에서 찾아요', 'if missing, the search moves one scope outward; o is found in outer'], ['끝까지 올라가 전역에서 g를 찾아요 · 이 연결이 스코프 체인이에요', 'it climbs all the way to the global scope for g; this chain of scopes is the scope chain'], ['방향은 안 → 밖으로만 · 바깥 코드는 안쪽 변수를 볼 수 없어요', 'lookup only goes inside-out, so outer code never sees inner variables']],
    fin: [['렉시컬 스코프: 함수가 “어디서 호출됐나”가 아니라 “어디에 작성됐나”로 보이는 변수가 정해져요', 'lexical scope: which variables a function sees depends on where it is written, not where it is called', 'jsx-xs jsx-a'], ['안쪽에서 같은 이름을 선언하면 바깥 변수를 가려요(섀도잉)', 'declaring the same name inside hides the outer variable (shadowing)'], ['이 규칙 덕분에 클로저가 바깥 변수를 기억할 수 있어요', 'this rule is what lets closures remember outer variables']],
    caps: [['자기 스코프에서 찾기', 'Look in the own scope'], ['한 겹 바깥으로', 'One scope outward'], ['전역까지', 'Up to global'], ['안에서 밖으로만', 'Inside-out only'], ['렉시컬 스코프와 스코프 체인', 'Lexical scope and the scope chain']]
  });
}

function sClosure() {
  return CW('js-closure', {
    code: ['function makeCounter() {', '  let count = 0;', '  return () => ++count;', '}', 'const c1 = makeCounter();', 'c1();  c1();         // 1, 2', 'const c2 = makeCounter();', 'c2();                // 1 (따로 세요)'].map((t, i) => i === 7 ? [t, 'c2();                // 1 (counts separately)'] : t),
    hl: [[0, 2], [2, 1], [4, 2], [6, 2]],
    draw: (S) => {
      const X = 19.0;
      chip(S, 'e1', X + 4.0, 1.4, 8.0, 'count = 0', 'warn', 1, { h: 1.4, off: 3 }); chip(S, 'e1b', X + 4.0, 1.4, 8.0, 'count = 2', 'ok', 3, { h: 1.4 });
      lbl(S, 'e1l', X + 4.0, .3, ['makeCounter 실행 환경', 'makeCounter’s environment'], 'w', 1);
      chip(S, 'f1', X, 4.4, 3.4, 'c1', 'accent', 2, { h: 1.4 }); arw(S, 'af1', [X + 1.7, 4.4], [X + 6.0, 2.85], 2, { color: 'accent' });
      lbl(S, 'f1l', X + 3.8, 4.6, ['함수가 환경을 붙잡고 있어요', 'the function holds on to the environment'], 'a', 2, { off: 3 });
      lbl(S, 'f1m', X + 3.8, 4.6, ['c1()을 부를 때마다 같은 count', 'every c1() call shares one count'], 'g', 3, { off: 4 });
      chip(S, 'e2', X + 4.0, 7.4, 8.0, 'count = 1', 'ok', 4, { h: 1.4 }); chip(S, 'f2', X, 10.4, 3.4, 'c2', 'accent', 4, { h: 1.4 }); arw(S, 'af2', [X + 1.7, 10.4], [X + 6.0, 8.85], 4, { color: 'accent' });
      lbl(S, 'f2l', X + 3.8, 10.6, ['호출마다 새 환경 → 따로 세요', 'a new environment per call → separate counts'], 'g', 4);
    },
    notes: [['makeCounter를 실행하면 count = 0을 담은 실행 환경이 생겨요', 'calling makeCounter creates an environment holding count = 0'], ['돌려준 화살표 함수가 그 환경을 계속 참조해요 · 함수가 끝나도 환경이 사라지지 않아요', 'the returned arrow function keeps a reference to it, so the environment survives after the call ends'], ['c1을 부를 때마다 같은 count를 올려요 · 밖에서는 count에 직접 손댈 수 없어요', 'each c1() increments that same count, and nothing outside can touch count directly'], ['makeCounter를 다시 부르면 새 환경이 생겨 c2는 c1과 따로 세요', 'calling makeCounter again creates a fresh environment, so c2 counts independently']],
    fin: [['클로저: 함수 + 그 함수가 만들어질 때의 바깥 변수 환경', 'a closure is a function together with the outer variables it was created with', 'jsx-xs jsx-a'], ['비공개 상태, 함수 공장, 이벤트 핸들러, 메모이제이션, React 훅이 모두 클로저 위에 서 있어요', 'private state, function factories, event handlers, memoization and React hooks all rely on closures'], ['큰 데이터를 붙잡은 클로저가 오래 살면 메모리가 해제되지 않아요', 'a long-lived closure holding big data keeps that memory alive']],
    caps: [['실행 환경이 생겨요', 'An environment is created'], ['환경을 붙잡은 함수', 'A function holding its environment'], ['같은 상태를 공유', 'Sharing one state'], ['호출마다 새 환경', 'A new environment per call'], ['클로저', 'Closures']]
  });
}

function sThis() {
  return CW('js-this', {
    code: ['const obj = {', '  name: "A",', '  hi() { return this.name; }', '};', 'obj.hi();              // "A"', 'const f = obj.hi;', 'f();                   // undefined', 'f.call({ name: "B" }); // "B"', 'const g = f.bind(obj); g();  // "A"', 'new Person("C");       // 새 객체'].map((t, i) => i === 9 ? [t, 'new Person("C");       // a new object'] : t),
    hl: [[4, 1, 'ok'], [5, 2, 'danger'], [7, 2], [9, 1, 'warn']],
    side: [
      [[['메서드 호출: 점 앞의 객체', 'method call: the object before the dot'], 'a'], ['obj.hi() → this = obj', 'm g']],
      [[['꺼내서 그냥 부르면 점이 없어요', 'detached, the call has no dot'], 'r'], [['this = undefined (엄격 모드)', 'this = undefined (strict mode)'], 'm'], [['콜백으로 넘길 때 흔한 실수', 'a classic when passing callbacks'], 'w']],
      [[['call·apply: 이번 호출의 this를 지정', 'call / apply: set this for one call'], 'a'], [['bind: this가 고정된 새 함수', 'bind: a new function with this fixed'], 'a']],
      [[['new: 새로 만든 객체가 this', 'new: the freshly created object'], 'w'], [['화살표 함수: 자기 this 없음 → 바깥 것', 'arrow functions: no own this, use the outer one'], 'g']]
    ],
    notes: [['this는 함수를 “어떻게 호출했나”로 정해져요 · obj.hi()처럼 부르면 점 앞의 obj예요', 'this is decided by how a function is called; obj.hi() makes it the obj before the dot'], ['같은 함수를 변수에 꺼내 f()로 부르면 점이 없어 this가 사라져요', 'the same function called bare as f() has no dot, so this is lost'], ['call·apply는 한 번의 호출에, bind는 새 함수에 this를 정해 줘요', 'call and apply set this for one call; bind returns a new function with it fixed'], ['new로 부르면 새 객체가 this가 되고, 화살표 함수는 자기 this 없이 바깥 것을 써요', 'new makes the fresh object this, and arrow functions have no this of their own, using the outer one']],
    fin: [['우선순위: new > bind·call·apply > 메서드 호출(점) > 일반 호출(undefined)', 'priority: new > bind/call/apply > method call (dot) > plain call (undefined)', 'jsx-xs jsx-a'], ['이벤트 핸들러에 메서드를 넘길 땐 bind하거나 화살표 함수로 감싸요', 'when passing a method as a handler, bind it or wrap it in an arrow function'], ['엄격 모드가 아니면 일반 호출의 this는 전역 객체(window)라 버그가 숨어요', 'outside strict mode a plain call’s this is the global object, which hides bugs']],
    caps: [['메서드 호출', 'Method calls'], ['잃어버린 this', 'A lost this'], ['call·apply·bind', 'call, apply and bind'], ['new와 화살표', 'new and arrows'], ['this가 정해지는 규칙', 'How this is decided']]
  });
}

function sArrow() {
  return CW('js-arrow', {
    code: ['class Timer {', '  count = 0;', '  start() {', '    setInterval(function () {', '      this.count++;      // ✗ this 없음', '    }, 1000);', '    setInterval(() => this.count++, 1000);', '  }', '}', 'const sq = x => x * x;', 'const mk = () => ({ ok: true });'].map((t, i) => i === 4 ? [t, '      this.count++;      // ✗ no this'] : t),
    hl: [[3, 3, 'danger'], [6, 1, 'ok'], [9, 2], null],
    side: [
      [[['일반 함수는 호출될 때 this가 정해져요', 'a regular function gets this at call time'], 'a'], [['타이머가 부르면 this는 Timer가 아님', 'called by the timer, this is not the Timer'], 'r']],
      [[['화살표 함수는 자기 this가 없어요', 'an arrow function has no this of its own'], 'a'], [['감싼 start()의 this를 그대로 써요', 'it uses the enclosing start()’s this'], 'g']],
      [[['식 하나면 { } 와 return 생략', 'one expression: drop { } and return'], 'a'], [['객체를 돌려줄 땐 ( ) 로 감싸요', 'wrap returned objects in ( )'], 'w']],
      [[['화살표 함수가 못 하는 것', 'what arrows cannot do'], 'r'], [['new로 생성자 호출 ✗', 'be called with new ✗'], ''], [['arguments 객체 ✗ → ...args', 'use arguments ✗ → ...args'], ''], [['메서드로 쓰면 this가 객체가 아님', 'serve as methods needing this'], '']]
    ],
    notes: [['콜백으로 넘긴 일반 함수는 타이머가 호출하니, this가 우리 객체가 아니에요', 'a regular function passed as a callback is called by the timer, so this is not our object'], ['화살표 함수는 자기 this를 만들지 않고 바깥 함수의 this를 그대로 써요', 'an arrow function creates no this and uses the enclosing function’s'], ['식 하나짜리 함수는 짧게 · 객체 리터럴을 돌려줄 땐 괄호가 필요해요', 'single-expression functions are concise, but returning an object literal needs parentheses'], ['생성자, arguments, this가 필요한 메서드에는 일반 함수를 써요', 'use regular functions for constructors, arguments and methods that need this']],
    fin: [['화살표 함수: 짧은 문법 + 렉시컬 this(바깥 this를 그대로 사용)', 'arrow functions: a short syntax plus lexical this (the outer this)', 'jsx-xs jsx-a'], ['콜백·배열 메서드·Promise 체인에 잘 맞아요', 'they suit callbacks, array methods and promise chains'], ['객체의 메서드 정의에는 hi() { } 축약 문법이 맞아요', 'for object methods, the shorthand hi() { } is the right choice']],
    caps: [['콜백에서 잃는 this', 'this lost in a callback'], ['바깥 this를 쓰는 화살표', 'Arrows use the outer this'], ['짧은 문법', 'Short syntax'], ['못 하는 것', 'What arrows cannot do'], ['화살표 함수', 'Arrow functions']]
  });
}

function sCallBind() {
  return CW('js-callbind', {
    code: ['function greet(greeting, mark) {', '  return `${greeting}, ${this.name}${mark}`;', '}', 'const kim = { name: "Kim" };', 'greet.call(kim, "Hi", "!");     // "Hi, Kim!"', 'greet.apply(kim, ["Hi", "!"]);', 'const hiKim = greet.bind(kim, "Hi");', 'hiKim("?");                     // "Hi, Kim?"', 'btn.onclick = view.render.bind(view);'],
    hl: [[4, 1], [5, 1], [6, 2], [8, 1, 'ok']],
    side: [
      [[['call(this값, 인자1, 인자2…)', 'call(thisArg, arg1, arg2…)'], 'm a'], [['지금 바로 한 번 호출', 'calls it right now, once'], '']],
      [[['apply(this값, [인자 배열])', 'apply(thisArg, [args array])'], 'm a'], [['인자가 배열로 있을 때 · 요즘은 call(kim, ...arr)', 'for args in an array; today call(kim, ...arr)'], '']],
      [[['bind는 호출하지 않고 새 함수를 돌려줘요', 'bind does not call; it returns a new function'], 'a'], [['this와 앞쪽 인자("Hi")가 고정', 'this and the leading arg ("Hi") are fixed'], 'g']],
      [[['메서드를 콜백으로 넘길 때 this 고정', 'fix this when passing a method as a callback'], 'g'], [['bind한 함수는 다시 bind해도 안 바뀌어요', 'a bound function cannot be re-bound'], 'w']]
    ],
    notes: [['call은 this로 쓸 객체와 인자를 받아 함수를 즉시 실행해요', 'call runs the function immediately with a chosen this and arguments'], ['apply는 같지만 인자를 배열로 받아요 · 지금은 전개 연산자로 call을 더 많이 써요', 'apply does the same with an argument array; spread with call is more common today'], ['bind는 실행하지 않고, this와 일부 인자를 고정한 새 함수를 만들어요(부분 적용)', 'bind does not run anything; it makes a new function with this and some arguments preset (partial application)'], ['메서드를 이벤트 핸들러로 넘길 때 bind로 this를 지켜요', 'binding keeps this intact when handing a method to an event handler']],
    fin: [['call·apply는 지금 호출, bind는 나중에 부를 함수를 만들기', 'call and apply invoke now; bind prepares a function for later', 'jsx-xs jsx-a'], ['화살표 함수에는 call·bind로도 this를 바꿀 수 없어요', 'call and bind cannot change an arrow function’s this'], ['클래스 필드 화살표(handle = () => {…})도 같은 문제를 푸는 흔한 방법이에요', 'class-field arrows (handle = () => {…}) are another common fix for the same problem']],
    caps: [['call', 'call'], ['apply', 'apply'], ['bind와 부분 적용', 'bind and partial application'], ['콜백에서 쓰기', 'Using it for callbacks'], ['call·apply·bind', 'call, apply and bind']]
  });
}

function sHof() {
  return CW('js-hof', {
    code: ['const total = orders', '  .filter(o => o.qty > 0)', '  .map(o => o.price * o.qty)', '  .reduce((sum, x) => sum + x, 0);  // 21'],
    hl: [null, [1, 1], [2, 1], [3, 1, 'ok']],
    draw: (S) => {
      const Y0 = 7.2, cols = [1.0, 9.2, 16.8, 24.4];
      lbl(S, 'h0', cols[0], Y0 - 1.1, 'orders', 'm a', 0);
      [['pen  2 × 3', 'line'], ['book 15 × 1', 'line'], ['bag 30 × 0', 'line']].forEach(([t, c], i) => chip(S, 'o' + i, cols[0], Y0 + i * 1.5, 6.6, t, c, 0));
      lbl(S, 'h1', cols[1], Y0 - 1.1, 'filter', 'm a', 2); arw(S, 'a1', [7.7, Y0 + 1.5], [cols[1] - .2, Y0 + 1.5], 2);
      chip(S, 'f0', cols[1], Y0, 6.0, 'pen  2 × 3', 'ok', 2); chip(S, 'f1', cols[1], Y0 + 1.5, 6.0, 'book 15 × 1', 'ok', 2); chip(S, 'fx', cols[1], Y0 + 3.0, 6.0, ['bag ✗ (qty 0)', 'bag ✗ (qty 0)'], 'danger', 2);
      lbl(S, 'h2', cols[2], Y0 - 1.1, 'map', 'm a', 3); arw(S, 'a2', [15.3, Y0 + .8], [cols[2] - .2, Y0 + .8], 3);
      chip(S, 'm0', cols[2], Y0, 5.6, '6', 'accent', 3); chip(S, 'm1', cols[2], Y0 + 1.5, 5.6, '15', 'accent', 3);
      lbl(S, 'h3', cols[3], Y0 - 1.1, 'reduce', 'm a', 4); arw(S, 'a3', [22.5, Y0 + .8], [cols[3] - .2, Y0 + .8], 4);
      ['0', '0 + 6 = 6', '6 + 15 = 21'].forEach((t, i) => chip(S, 'r' + i, cols[3], Y0 + i * 1.5, 6.8, t, i === 2 ? 'ok' : 'line', 4, { pct: i === 2 ? 34 : 14 }));
      lbl(S, 'd0', 18.6, .6, ['배열 메서드에 함수를 넘겨요', 'pass functions to array methods'], 'a', 0); lbl(S, 'd1', 18.6, 1.7, ['원본 orders는 바뀌지 않아요', 'orders itself never changes'], 'g', 1);
    },
    notes: [['주문 세 개에서 수량이 있는 것만 골라 금액을 합하려 해요 · 원본 배열은 그대로 둬요', 'from three orders we want the total of those with quantity, leaving the original array intact'], ['filter는 조건 함수가 true를 돌려준 원소만 모은 새 배열을 만들어요', 'filter builds a new array of the items for which the predicate returns true'], ['map은 원소마다 함수를 적용해 같은 길이의 새 배열을 만들어요', 'map applies a function to every item, producing a new array of the same length'], ['reduce는 누적값과 원소를 받아 하나의 값으로 접어요 · 초기값 0을 꼭 주세요', 'reduce folds items into one value with an accumulator; always give it an initial value such as 0']],
    fin: [['고차 함수: 함수를 인자로 받거나 함수를 돌려주는 함수', 'a higher-order function takes functions as arguments or returns one', 'jsx-xs jsx-a'], ['반복문 대신 “무엇을” 하는지가 드러나 읽기 쉽고, 원본을 바꾸지 않아요', 'compared with loops they state what is done, read clearly and leave the source untouched'], ['아주 큰 배열에서는 중간 배열이 여러 번 생기니 한 번의 for나 reduce로 합치기도 해요', 'on huge arrays the intermediate arrays add up, so a single loop or reduce may be faster']],
    caps: [['원본 데이터', 'The source data'], ['filter', 'filter'], ['map', 'map'], ['reduce', 'reduce'], ['map·filter·reduce', 'map, filter and reduce']]
  });
}
/* ===== JavaScript · 3. objects ===== */
function sProto() {
  return CW('js-proto', {
    code: ['const animal = {', '  eats: true,', '  walk() { return "walk"; }', '};', 'const dog = Object.create(animal);', 'dog.barks = true;', 'dog.barks     // true  (자기 속성)', 'dog.eats      // true  (animal에서)', 'dog.toString  // Object.prototype에서', 'dog.fly       // undefined'].map((t, i) => i === 6 ? [t, 'dog.barks     // true  (own property)'] : i === 7 ? [t, 'dog.eats      // true  (from animal)'] : i === 8 ? [t, 'dog.toString  // from Object.prototype'] : t),
    hl: [[6, 1, 'ok'], [7, 1], [8, 1, 'warn'], [9, 1, 'danger']],
    draw: (S) => {
      const X = 20.0, W = 10.6, B = [['dog', '{ barks }', 'accent', 1.0], ['animal', '{ eats, walk() }', 'ok', 3.8], ['Object.prototype', '{ toString, hasOwnProperty… }', 'warn', 6.6], ['null', ['(끝)', '(end)'], 'line', 9.4]];
      B.forEach(([n, f, c, y], i) => { lbl(S, 'bn' + i, X, y - .9, n, 'm', 0); chip(S, 'b' + i, X, y, W, f, c, 0, { h: 1.3, pct: 18 }); if (i < 3) arw(S, 'ba' + i, [X + W / 2, y + 1.3], [X + W / 2, y + 1.9], 0, { color: 'ink-3' }); });
      tsets(S, 'b0', [[1, 'ok', 40]]); tsets(S, 'b1', [[2, 'ok', 40]]); tsets(S, 'b2', [[3, 'ok', 40]]); tsets(S, 'b3', [[4, 'danger', 30]]);
      ['b0', 'b1', 'b2'].forEach((k, i) => tsets(S, k, [[i + 2, i === 0 ? 'accent' : i === 1 ? 'ok' : 'warn', 18]]));
    },
    notes: [['속성을 읽으면 먼저 그 객체 자신에서 찾아요 · barks는 dog에 직접 있어요', 'reading a property looks at the object itself first; barks is on dog'], ['없으면 [[Prototype]] 링크를 따라 animal로 올라가 eats를 찾아요', 'if missing, the [[Prototype]] link leads up to animal, where eats is found'], ['계속 올라가 모든 객체의 조상 Object.prototype에서 toString을 찾아요', 'the climb continues to Object.prototype, the ancestor of all objects, for toString'], ['null에 닿을 때까지 없으면 undefined · 이 연결이 프로토타입 체인이에요', 'reaching null without a match gives undefined; this linked path is the prototype chain']],
    fin: [['프로토타입 체인: 객체가 다른 객체에 속성 찾기를 위임하는 연결 · 자바스크립트 상속의 본체', 'the prototype chain lets objects delegate property lookup to other objects; it is how JavaScript inheritance works', 'jsx-xs jsx-a'], ['쓰기는 체인을 타지 않아요 · dog.eats = false는 dog에 새 속성을 만들어요', 'writes do not walk the chain: dog.eats = false creates a new property on dog'], ['배열 메서드도 Array.prototype에 있어서 모든 배열이 공유해요', 'array methods live on Array.prototype and are shared by every array']],
    caps: [['자기 속성', 'Own properties'], ['한 단계 위로', 'One level up'], ['Object.prototype까지', 'Up to Object.prototype'], ['끝은 null', 'The end is null'], ['프로토타입 체인', 'The prototype chain']]
  });
}

function sClass() {
  return CW('js-class', {
    code: ['class Animal {', '  #secret = 42;           // 비공개 필드', '  static count = 0;', '  constructor(name) {', '    this.name = name; Animal.count++;', '  }', '  speak() { return `${this.name} …`; }', '}', 'class Dog extends Animal {', '  speak() { return super.speak() + " woof"; }', '}', 'typeof Animal            // "function"'].map((t, i) => i === 1 ? [t, '  #secret = 42;           // private field'] : t),
    hl: [[3, 4], [8, 3], [1, 2, 'warn'], [11, 1]],
    side: [
      [[['constructor: new로 만들 때 실행', 'constructor runs on new'], 'a'], [['speak는 Animal.prototype에 하나', 'speak lives once on Animal.prototype'], ''], [['모든 인스턴스가 공유해요', 'shared by every instance'], 'g']],
      [[['extends: 프로토타입 체인 연결', 'extends links the prototype chain'], 'a'], ['Dog.prototype → Animal.prototype', 'm'], [['super.speak(): 부모 메서드 호출', 'super.speak() calls the parent method'], '']],
      [[['#필드: 클래스 밖에서 접근 불가', '#fields: unreachable outside the class'], 'w'], [['static: 인스턴스가 아닌 클래스 자체에', 'static: on the class, not instances'], 'w']],
      [[['클래스는 생성자 함수 + 프로토타입의', 'a class is a constructor function plus'], ''], [['더 깔끔한 문법(문법 설탕)', 'prototypes, in cleaner syntax'], 'a']]
    ],
    notes: [['class의 constructor는 new로 객체를 만들 때 실행되고, 메서드는 프로토타입에 한 번만 저장돼요', 'a class constructor runs on new, and methods are stored once on the prototype'], ['extends는 프로토타입 체인을 이어 주고, super로 부모의 메서드와 생성자를 불러요', 'extends links the prototype chain, and super calls the parent’s methods and constructor'], ['#으로 시작하는 필드는 진짜 비공개, static은 인스턴스가 아닌 클래스에 붙어요', 'fields starting with # are truly private, and static members belong to the class itself'], ['내부는 여전히 함수와 프로토타입이에요 · typeof로 보면 function', 'underneath it is still functions and prototypes; typeof says function']],
    fin: [['클래스: 생성자·프로토타입 메서드·상속을 한곳에 선언하는 문법(ES2015)', 'classes declare a constructor, prototype methods and inheritance in one place (ES2015)', 'jsx-xs jsx-a'], ['상속은 얕게 · 깊은 상속 계층보다 합성(객체를 조합)을 먼저 고려해요', 'keep inheritance shallow and consider composition before deep hierarchies'], ['메서드를 콜백으로 넘기면 this가 사라지는 문제는 클래스에서도 그대로예요', 'methods passed as callbacks still lose this, classes or not']],
    caps: [['생성자와 메서드', 'Constructor and methods'], ['extends와 super', 'extends and super'], ['비공개와 static', 'Private and static'], ['문법 설탕', 'Syntactic sugar'], ['클래스', 'Classes']]
  });
}

function sCopy() {
  return CW('js-copy', {
    code: ['const a = { name: "Kim", tags: ["x"] };', 'const b = { ...a };           // 얕은 복사', 'b.name = "Lee";              // a는 "Kim"', 'b.tags.push("y");            // a.tags도!', 'const c = structuredClone(a); // 깊은 복사', 'c.tags.push("z");            // a는 안전'].map((t, i) => [t, ['const a = { name: "Kim", tags: ["x"] };', 'const b = { ...a };           // shallow copy', 'b.name = "Lee";              // a stays "Kim"', 'b.tags.push("y");            // a.tags too!', 'const c = structuredClone(a); // deep copy', 'c.tags.push("z");            // a is safe'][i]]),
    hl: [[1, 1], [2, 2, 'danger'], [4, 2, 'ok'], null],
    draw: (S) => {
      const X = 19.2;
      chip(S, 'oa', X, .8, 5.0, 'a { name }', 'accent', 0); chip(S, 'ta', X + 7.0, 2.8, 5.0, '["x"]', 'ok', 0, { off: 2 }); chip(S, 'ta2', X + 7.0, 2.8, 5.0, '["x", "y"]', 'danger', 2);
      arw(S, 'aa', [X + 5.0, 1.35], [X + 7.0, 3.1], 0, { color: 'ok' });
      chip(S, 'ob', X, 4.6, 5.0, 'b { name }', 'warn', 1); arw(S, 'ab', [X + 5.0, 5.15], [X + 7.0, 3.6], 1, { color: 'danger' });
      lbl(S, 'nb', X, 6.0, ['겉 객체는 새로, 안쪽 배열은 공유', 'new outer object, shared inner array'], 'w', 1, { off: 3 });
      chip(S, 'oc', X, 7.8, 5.0, 'c { name }', 'ok', 3); chip(S, 'tc', X + 7.0, 7.8, 5.0, '["x", "y", "z"]', 'ok', 3); arw(S, 'ac', [X + 5.0, 8.35], [X + 7.0, 8.35], 3, { color: 'ok' });
      lbl(S, 'nc', X, 9.3, ['안쪽까지 모두 새로 만들어요', 'everything is rebuilt, inner levels too'], 'g', 3, { off: 4 });
      lines(S, 'w', X, 9.3, [[['깊은 복사의 한계', 'deep-copy limits'], 'a'], ['structuredClone: Date·Map ✓ 함수 ✗', 'm'], ['JSON 왕복: Date→문자열, undefined 사라짐', 'm']], 4, 0, { w: 12.2 });
    },
    notes: [['{ ...a }는 겉 객체만 새로 만들고, 안쪽 배열·객체는 같은 것을 가리켜요', '{ ...a } creates a new outer object, but nested arrays and objects are still shared'], ['그래서 b.name은 독립적이지만 b.tags를 고치면 a.tags도 바뀌어요', 'so b.name is independent, yet editing b.tags also changes a.tags'], ['structuredClone은 안쪽까지 전부 새로 만들어 원본과 완전히 끊어요', 'structuredClone rebuilds every level, fully detaching the copy'], ['깊은 복사도 한계가 있어요 · 함수는 복사 못 하고, JSON 왕복은 Date와 undefined를 망가뜨려요', 'deep copies have limits: functions cannot be cloned, and a JSON round trip mangles dates and drops undefined']],
    fin: [['얕은 복사는 한 단계만, 깊은 복사는 모든 단계를 새로 만들어요', 'a shallow copy duplicates one level; a deep copy duplicates them all', 'jsx-xs jsx-a'], ['상태를 불변으로 다룰 때는 바꾸는 경로만 새로 만들어요: { ...s, user: { ...s.user, name } }', 'immutable updates copy only the changed path: { ...s, user: { ...s.user, name } }'], ['Immer 같은 라이브러리는 “고치듯 쓰면” 알아서 복사해 줘요', 'libraries such as Immer let you write mutations and produce copies for you']],
    caps: [['얕은 복사', 'A shallow copy'], ['공유된 안쪽', 'Shared nested data'], ['깊은 복사', 'A deep copy'], ['깊은 복사의 한계', 'Deep-copy limits'], ['얕은 복사와 깊은 복사', 'Shallow and deep copies']]
  });
}

function sJson() {
  return CW('js-json', {
    code: ['const data = { id: 1, at: new Date(),', '  fn() {}, x: undefined, n: NaN };', 'JSON.stringify(data)', '// {"id":1,"at":"2026-11-10T…Z","n":null}', 'JSON.parse(text, (k, v) =>', '  k === "at" ? new Date(v) : v);', 'JSON.stringify(obj, null, 2)  // 들여쓰기', 'JSON.stringify(a)  // a.self = a → TypeError'].map((t, i) => i === 6 ? [t, 'JSON.stringify(obj, null, 2)  // indented'] : t),
    hl: [[2, 2], [4, 2], [6, 1], [7, 1, 'danger']],
    side: [
      [[['JSON으로 바꿀 때의 규칙', 'conversion rules'], 'a'], [['Date → ISO 문자열', 'Date → ISO string'], ''], [['함수·undefined → 사라짐', 'functions, undefined → dropped'], 'w'], [['NaN·Infinity → null', 'NaN, Infinity → null'], 'w']],
      [[['parse는 문자열 → 값', 'parse turns text into values'], 'a'], [['리바이버로 날짜를 다시 Date로', 'a reviver restores dates'], 'g']],
      [[['두 번째 인자: 필드 고르기·바꾸기', 'second arg: pick or transform fields'], 'a'], [['세 번째 인자: 들여쓰기 칸 수', 'third arg: indentation'], '']],
      [[['순환 참조는 직렬화 불가', 'circular references cannot be serialized'], 'r'], [['BigInt도 TypeError', 'BigInt throws too'], 'r'], [['2^53을 넘는 숫자는 정밀도 손실', 'numbers beyond 2^53 lose precision'], 'w']]
    ],
    notes: [['JSON.stringify는 값을 문자열로 바꿔요 · Date는 문자열이 되고 함수와 undefined는 빠져요', 'JSON.stringify turns a value into text: dates become strings, functions and undefined vanish'], ['JSON.parse는 문자열을 값으로 · 날짜는 그냥 문자열이라 리바이버로 되살려요', 'JSON.parse turns text back into values; dates stay strings unless a reviver restores them'], ['replacer로 필드를 고르거나 바꾸고, 세 번째 인자로 사람이 읽기 좋게 들여써요', 'a replacer picks or transforms fields, and the third argument pretty-prints'], ['자기 자신을 가리키는 객체, BigInt, 아주 큰 정수는 JSON으로 안전하게 못 옮겨요', 'self-referencing objects, BigInt and very large integers do not survive JSON safely']],
    fin: [['JSON: 문자열·숫자·불리언·null·배열·객체만 담는 데이터 교환 형식', 'JSON is a data-exchange format holding only strings, numbers, booleans, null, arrays and objects', 'jsx-xs jsx-a'], ['객체에 toJSON() 메서드가 있으면 stringify가 그 결과를 써요', 'if an object has toJSON(), stringify uses its result'], ['서버에서 받은 JSON은 믿지 말고 Zod 같은 스키마로 검증하세요', 'validate JSON from servers with a schema library such as Zod']],
    caps: [['stringify의 규칙', 'stringify rules'], ['parse와 리바이버', 'parse and revivers'], ['replacer와 들여쓰기', 'Replacers and indentation'], ['직렬화할 수 없는 것', 'What cannot be serialized'], ['JSON 직렬화', 'JSON serialization']]
  });
}

function sMapSet() {
  return CW('js-mapset', {
    code: ['const roles = new Map();', 'roles.set(userObj, "admin");   // 객체도 키', 'roles.get(userObj);            // "admin"', 'roles.size;                    // 1', 'const s = new Set([1, 2, 2, 3]);  // {1, 2, 3}', 's.has(2);                      // true', '[...new Set(arr)]              // 중복 제거', 'const meta = new WeakMap();    // 약한 참조'].map((t, i) => i === 1 ? [t, 'roles.set(userObj, "admin"); // object keys'] : i === 6 ? [t, '[...new Set(arr)]              // dedupe'] : i === 7 ? [t, 'const meta = new WeakMap();    // weak keys'] : t),
    hl: [[0, 4], [4, 2], [6, 1, 'ok'], [7, 1, 'warn']],
    side: [
      [[['Map: 무엇이든 키로', 'Map: any value as a key'], 'a'], [['객체 {}는 키가 문자열로 바뀌어요', 'plain objects turn keys into strings'], 'w'], [['넣은 순서 유지 · size로 개수', 'keeps insertion order · size counts'], '']],
      [[['Set: 중복 없는 값의 모음', 'Set: a collection of unique values'], 'a'], [['has는 배열 includes보다 빨라요 (O(1))', 'has is O(1), faster than includes'], 'g']],
      [[['배열 중복 제거의 한 줄 관용구', 'the one-line dedupe idiom'], 'g'], ['[1,2,2,3] → [1,2,3]', 'm']],
      [[['WeakMap: 키 객체가 사라지면 함께 정리', 'WeakMap: entries go when the key object dies'], 'w'], [['DOM 노드에 데이터 붙이기에 좋아요', 'good for attaching data to DOM nodes'], '']]
    ],
    notes: [['Map은 객체·함수 등 어떤 값이든 키로 쓰고, 넣은 순서를 지키며 size로 개수를 바로 알려줘요', 'a Map accepts any value as a key, keeps insertion order and reports its size directly'], ['Set은 같은 값을 한 번만 담아요 · 포함 여부를 빠르게 확인해요', 'a Set holds each value once and checks membership quickly'], ['배열을 Set으로 바꿨다 펼치면 중복이 사라져요', 'turning an array into a Set and spreading it back removes duplicates'], ['WeakMap·WeakSet은 키를 약하게 잡아, 키 객체가 사라지면 항목도 GC로 정리돼요', 'WeakMap and WeakSet hold keys weakly, so entries are collected along with their key objects']],
    fin: [['키-값 사전이 필요하면 Map, 고유 값 모음이면 Set', 'use a Map for key-value dictionaries and a Set for unique values', 'jsx-xs jsx-a'], ['JSON으로 바꿀 땐 Object.fromEntries(map), [...set]처럼 변환이 필요해요', 'converting to JSON needs Object.fromEntries(map) or [...set]'], ['ES2025부터 Set에 union, intersection, difference 메서드가 생겼어요', 'ES2025 added union, intersection and difference to Set']],
    caps: [['Map', 'Map'], ['Set', 'Set'], ['중복 제거', 'Deduplication'], ['WeakMap', 'WeakMap'], ['Map과 Set', 'Map and Set']]
  });
}

function sIter() {
  return CW('js-iter', {
    code: ['for (const x of [10, 20]) …       // 값', 'for (const ch of "안녕") …  // 글자', 'for (const [k, v] of map) …', 'const range = { from: 1, to: 3,', '  [Symbol.iterator]() {', '    let n = this.from; const to = this.to;', '    return { next: () => n <= to', '      ? { value: n++, done: false }', '      : { value: undefined, done: true } };', '  } };', '[...range]                       // [1, 2, 3]'].map((t, i) => i === 0 ? [t, 'for (const x of [10, 20]) …       // values'] : i === 1 ? [t, 'for (const ch of "안녕") …  // characters'] : t),
    hl: [[0, 3], [3, 2], [6, 3], [10, 1, 'ok']],
    side: [
      [[['for…of는 이터러블이면 무엇이든', 'for…of works on any iterable'], 'a'], [['배열, 문자열, Map, Set, NodeList', 'arrays, strings, Map, Set, NodeList'], ''], [['for…in은 키(속성 이름)를 돌아요', 'for…in walks keys instead'], 'w']],
      [[['이터러블 = Symbol.iterator 메서드가 있는 객체', 'iterable = has a Symbol.iterator method'], 'a']],
      [[['이터레이터는 next()를 부를 때마다', 'each next() call on the iterator'], ''], ['{ value, done }', 'm a'], [['done이 true면 끝', 'done: true means finished'], '']],
      [[['직접 만든 객체도 전개·for…of 가능', 'custom objects now spread and loop'], 'g'], [['제너레이터 function*로 더 짧게', 'generators (function*) make it shorter'], '']]
    ],
    notes: [['for…of는 배열·문자열·Map·Set처럼 “이터러블”이면 무엇이든 순서대로 돌아요', 'for…of walks anything iterable, such as arrays, strings, maps and sets'], ['이터러블은 Symbol.iterator 메서드로 이터레이터를 돌려주는 객체예요', 'an iterable is an object whose Symbol.iterator method returns an iterator'], ['이터레이터는 next()마다 { value, done }을 돌려주고, done이 true면 멈춰요', 'an iterator returns { value, done } from each next() and stops when done is true'], ['이 약속만 지키면 직접 만든 객체도 전개, 구조 분해, for…of에 쓸 수 있어요', 'any object honouring the protocol works with spread, destructuring and for…of']],
    fin: [['이터레이션 프로토콜: Symbol.iterator → next() → { value, done }', 'the iteration protocol: Symbol.iterator → next() → { value, done }', 'jsx-xs jsx-a'], ['제너레이터(function*, yield)는 이 프로토콜을 자동으로 구현해 줘요', 'generators (function*, yield) implement the protocol for you'], ['for await…of는 비동기 이터러블(스트림 등)을 같은 방식으로 돌아요', 'for await…of walks asynchronous iterables such as streams the same way']],
    caps: [['for…of', 'for…of'], ['이터러블', 'Iterables'], ['이터레이터와 next()', 'Iterators and next()'], ['직접 만든 이터러블', 'A custom iterable'], ['이터러블과 이터레이터', 'Iterables and iterators']]
  });
}

function sArrayMut() {
  return CW('js-array', {
    code: ['const a = [3, 1, 2];', 'a.sort();       // a 자체가 [1, 2, 3]', 'a.push(4); a.reverse(); a.splice(0, 1);', 'const b = a.toSorted();     // 새 배열', 'const c = a.map(x => x * 2); // 새 배열', 'a.with(0, 9)                // 새 배열', '[10, 1, 2].sort()           // [1, 10, 2] !', '[10, 1, 2].sort((x, y) => x - y)'].map((t, i) => i === 1 ? [t, 'a.sort();       // a itself becomes [1, 2, 3]'] : i === 3 ? [t, 'const b = a.toSorted();     // a new array'] : i === 4 ? [t, 'const c = a.map(x => x * 2); // new array'] : i === 5 ? [t, 'a.with(0, 9)                // new array'] : t),
    hl: [[1, 2, 'danger'], [3, 3, 'ok'], [6, 1, 'danger'], [7, 1, 'ok']],
    side: [
      [[['원본을 바꾸는 메서드', 'methods that mutate'], 'r'], ['sort reverse splice', 'm'], ['push pop shift unshift fill', 'm'], [['React 상태에 쓰면 화면이 안 바뀌어요', 'on React state, the UI will not update'], 'w']],
      [[['새 배열을 돌려주는 메서드', 'methods returning a new array'], 'g'], ['map filter slice concat', 'm'], ['toSorted toReversed toSpliced with', 'm g'], [['(ES2023)', '(ES2023)'], '']],
      [[['기본 sort는 문자열로 비교해요', 'default sort compares as strings'], 'r'], ['"10" < "2"', 'm']],
      [[['숫자는 비교 함수를 넘겨요', 'pass a comparator for numbers'], 'g'], [['음수면 x 먼저, 양수면 y 먼저', 'negative: x first, positive: y first'], '']]
    ],
    notes: [['sort, reverse, splice, push 같은 메서드는 배열 자체를 바꿔요 · 공유된 배열이면 다른 곳도 바뀌어요', 'sort, reverse, splice and push change the array itself, so shared arrays change everywhere'], ['map, filter, slice와 ES2023의 toSorted·with는 새 배열을 돌려주고 원본은 그대로예요', 'map, filter, slice and ES2023’s toSorted and with return new arrays and leave the original alone'], ['비교 함수 없는 sort는 원소를 문자열로 바꿔 비교해서 10이 2보다 앞에 와요', 'sort without a comparator compares strings, so 10 lands before 2'], ['숫자 정렬은 (x, y) => x − y를 넘겨요 · 한국어 문자열은 localeCompare로', 'sort numbers with (x, y) => x − y and Korean strings with localeCompare']],
    fin: [['변경 메서드와 비변경 메서드를 구분하는 습관이 버그를 크게 줄여요', 'knowing which methods mutate prevents a whole class of bugs', 'jsx-xs jsx-a'], ['React·Redux 상태는 항상 새 배열로: [...a, x], a.filter(...), a.toSorted()', 'React and Redux state always needs new arrays: [...a, x], a.filter(...), a.toSorted()'], ['sort는 안정 정렬(같은 값의 순서 유지)이 보장돼요(ES2019)', 'sort is guaranteed stable since ES2019']],
    caps: [['원본을 바꾸는 메서드', 'Mutating methods'], ['새 배열을 주는 메서드', 'Non-mutating methods'], ['기본 sort의 함정', 'The default sort trap'], ['비교 함수', 'Comparators'], ['배열 메서드: 바꾸기와 새로 만들기', 'Array methods: mutate or copy']]
  });
}
/* ===== JavaScript · 4. asynchronous code ===== */
function sEventLoop() {
  return CW('js-eventloop', {
    code: ['console.log("A");', 'setTimeout(() => console.log("B"), 0);', 'console.log("C");'],
    cw: 17.4, hl: [[0, 1], [1, 1, 'warn'], [2, 1], null],
    draw: (S) => {
      const Y = 5.4, H = 8.6, cols = [[.6, 7.0, ['콜 스택', 'call stack'], 'accent'], [8.2, 7.4, ['Web API (타이머)', 'Web API (timer)'], 'warn'], [16.2, 7.4, ['태스크 큐', 'task queue'], 'ok'], [24.2, 7.0, ['출력', 'output'], 'line']];
      cols.forEach(([x, w, l, c], i) => { frame(S, 'col' + i, x, Y, w, H, c, 0, { w: .1 }); lbl(S, 'cl' + i, x + .3, Y + .15, l, 'a', 0); });
      const box = (k, col, row, t, c, st, off) => chip(S, k, cols[col][0] + .4, Y + H - 1.6 - row * 1.4, cols[col][1] - .8, t, c, st, { off });
      box('s1', 0, 0, 'log("A")', 'accent', 1, 2); box('o1', 3, 4, 'A', 'line', 1, 0);
      box('s2', 0, 0, 'setTimeout(…)', 'warn', 2, 3); box('w1', 1, 0, ['타이머 0ms', 'timer 0 ms'], 'warn', 2, 3);
      box('s3', 0, 0, 'log("C")', 'accent', 3, 4); box('o2', 3, 3, 'C', 'line', 3, 0); box('q1', 2, 0, '() => log("B")', 'ok', 3, 4);
      box('s4', 0, 0, '() => log("B")', 'ok', 4, 0); box('o3', 3, 2, 'B', 'ok', 4, 0);
      arw(S, 'r1', [cols[2][0] + 3.7, Y + H - 2.2], [cols[0][0] + 3.5, Y + H - 2.2], 4, { color: 'ok' });
      lbl(S, 'r1l', 18.8, 3.2, ['스택이 비면 큐에서 꺼내요', 'an empty stack pulls from the queue'], 'g', 4);
      lbl(S, 'side', 18.8, .6, ['출력 순서: A → C → B', 'output order: A → C → B'], 's a', 0);
      lbl(S, 'side2', 18.8, 2.0, ['0ms여도 B는 마지막이에요', 'B comes last despite 0 ms'], 'w', 0);
    },
    notes: [['자바스크립트는 콜 스택 하나로 한 번에 한 가지만 실행해요 · 먼저 log("A")가 실행돼요', 'JavaScript runs one thing at a time on a single call stack; log("A") runs first'], ['setTimeout은 타이머를 브라우저(Web API)에 맡기고 바로 끝나요 · 기다리지 않아요', 'setTimeout hands the timer to the browser (a Web API) and returns at once, without waiting'], ['그동안 log("C")가 실행되고, 타이머가 끝난 콜백은 태스크 큐에서 차례를 기다려요', 'meanwhile log("C") runs, and the finished timer’s callback waits in the task queue'], ['콜 스택이 비면 이벤트 루프가 큐의 콜백을 스택에 올려요 · 그래서 B가 마지막이에요', 'once the stack is empty, the event loop moves the callback onto it, so B prints last']],
    fin: [['이벤트 루프: 스택이 비면 큐에서 다음 작업을 꺼내 실행하는 반복', 'the event loop: whenever the stack is empty, take the next task from a queue and run it', 'jsx-xs jsx-a'], ['긴 동기 코드는 스택을 막아 클릭·렌더링·타이머가 모두 밀려요', 'long synchronous code blocks the stack, delaying clicks, rendering and timers alike'], ['setTimeout의 지연은 “최소” 대기 시간이지 정확한 실행 시각이 아니에요', 'a setTimeout delay is a minimum wait, not an exact run time']],
    caps: [['동기 코드 실행', 'Running synchronous code'], ['타이머는 브라우저에게', 'Timers go to the browser'], ['큐에서 기다리는 콜백', 'The callback waits in the queue'], ['스택이 비면 꺼내기', 'Dequeue when the stack empties'], ['이벤트 루프', 'The event loop']]
  });
}

function sMicrotask() {
  return CW('js-microtask', {
    code: ['console.log(1);', 'setTimeout(() => console.log(2), 0);', 'Promise.resolve().then(() => console.log(3));', 'queueMicrotask(() => console.log(4));', 'console.log(5);', '// 1 5 3 4 2'],
    hl: [[0, 1], [1, 3, 'warn'], [2, 2, 'ok'], [1, 1, 'accent']],
    draw: (S) => {
      const X = 19.2;
      lbl(S, 'mq', X, .5, ['마이크로태스크 큐', 'microtask queue'], 'g', 0); frame(S, 'mqf', X, 1.5, 12.0, 1.6, 'ok', 0, { w: .1 });
      lbl(S, 'tq', X, 3.8, ['태스크(매크로태스크) 큐', 'task (macrotask) queue'], 'w', 0); frame(S, 'tqf', X, 4.8, 12.0, 1.6, 'warn', 0, { w: .1 });
      chip(S, 'm3', X + .3, 1.75, 3.4, 'log(3)', 'ok', 2, { off: 3 }); chip(S, 'm4', X + 4.0, 1.75, 3.4, 'log(4)', 'ok', 2, { off: 3 }); chip(S, 't2', X + .3, 5.05, 3.4, 'log(2)', 'warn', 2, { off: 4 });
      lbl(S, 'out', X, 7.2, ['출력', 'output'], 'a', 0);
      [['1', 1], ['5', 1], ['3', 3], ['4', 3], ['2', 4]].forEach(([v, st], i) => chip(S, 'o' + i, X + i * 2.4, 8.3, 2.0, v, st === 4 ? 'warn' : st === 3 ? 'ok' : 'line', st));
      lbl(S, 'r3', X, 10.0, ['스택이 비면 마이크로태스크를 모두 먼저 비워요', 'when the stack empties, all microtasks run first'], 'g', 3, { off: 4, w: 12.2 });
      lbl(S, 'r4', X, 10.0, ['그다음 태스크 하나를 실행하고', 'then one task runs,'], 'w', 4); lbl(S, 'r5', X, 11.1, ['다시 마이크로태스크 → 렌더링 → 반복', 'then microtasks → render → repeat'], 'w', 4);
    },
    notes: [['동기 코드 1과 5가 먼저 출력돼요', 'the synchronous logs 1 and 5 print first'], ['setTimeout 콜백은 태스크 큐로, then과 queueMicrotask 콜백은 마이크로태스크 큐로 가요', 'the setTimeout callback goes to the task queue; then and queueMicrotask callbacks go to the microtask queue'], ['스택이 비면 이벤트 루프는 마이크로태스크 큐를 완전히 비워요 · 3, 4', 'when the stack empties, the event loop drains the entire microtask queue: 3, 4'], ['그다음에야 태스크 하나(2)를 실행해요 · 그래서 0ms 타이머보다 Promise가 먼저예요', 'only then does it run one task (2), which is why promises beat a 0 ms timer']],
    fin: [['우선순위: 동기 코드 → 마이크로태스크 전부 → 태스크 하나 → (렌더링) → 반복', 'order: synchronous code → every microtask → one task → (render) → repeat', 'jsx-xs jsx-a'], ['마이크로태스크: Promise 콜백, queueMicrotask, MutationObserver · 태스크: 타이머, 이벤트, 메시지', 'microtasks: promise callbacks, queueMicrotask, MutationObserver; tasks: timers, events, messages'], ['마이크로태스크가 끝없이 새로 생기면 렌더링이 멈춰 화면이 굳어요', 'endlessly scheduling microtasks starves rendering and freezes the page']],
    caps: [['동기 코드 먼저', 'Synchronous code first'], ['두 개의 큐', 'Two queues'], ['마이크로태스크를 모두', 'All microtasks'], ['그다음 태스크', 'Then a task'], ['마이크로태스크와 태스크', 'Microtasks and tasks']]
  });
}

function sPromise() {
  return CW('js-promise', {
    code: ['const p = new Promise((resolve, reject) => {', '  setTimeout(() => resolve(42), 1000);', '});', 'p.then(v => v * 2)', ' .then(v => console.log(v))     // 84', ' .catch(err => showError(err))', ' .finally(() => hideSpinner());'],
    hl: [[0, 3], [3, 2, 'ok'], [5, 1, 'danger'], [6, 1]],
    draw: (S) => {
      const P = [23.0, 3.0], F = [20.4, 9.0], Rj = [28.0, 9.0];
      stt(S, 'sp', ...P, 'pending', 'warn', 0, { r: 1.5, start: 1 }); stt(S, 'sf', ...F, 'fulfilled', 'ok', 0, { r: 1.5 }); stt(S, 'sr', ...Rj, 'rejected', 'danger', 0, { r: 1.5 });
      trn(S, 'tf', P, F, 'resolve(42)', 0, { r: 1.5, ld: 2.0 }); trn(S, 'tr', P, Rj, 'reject(err)', 0, { r: 1.5, ld: -2.0 });
      tsets(S, 'sp', [[1, 'warn', 45], [2, 'warn', 14]]); tsets(S, 'sf', [[2, 'ok', 45], [3, 'ok', 14], [4, 'ok', 30]]); tsets(S, 'sr', [[3, 'danger', 45], [4, 'danger', 30]]);
      lbl(S, 'n1', 19.0, 12.0, ['한 번 정해지면 다시 바뀌지 않아요', 'once settled, it never changes again'], 'a', 1, { off: 2 });
      lbl(S, 'n2', 19.0, 12.0, ['then은 새 Promise를 돌려줘 이어 붙여요', 'then returns a new promise, so calls chain'], 'g', 2, { off: 3 });
      lbl(S, 'n3', 19.0, 12.0, ['어디서 실패해도 아래의 catch로 건너뛰어요', 'a failure anywhere skips down to catch'], 'r', 3, { off: 4 });
      lbl(S, 'n4', 19.0, 12.0, ['finally는 성공·실패 상관없이 실행', 'finally runs either way'], 'w', 4);
    },
    notes: [['Promise는 아직 끝나지 않은 작업의 결과를 대신하는 객체예요 · 처음엔 pending 상태예요', 'a promise stands in for the result of unfinished work; it starts out pending'], ['resolve되면 fulfilled가 되고 then 콜백이 값을 받아요 · then은 새 Promise라 계속 이어져요', 'resolving makes it fulfilled and then callbacks receive the value; each then returns a new promise, so they chain'], ['reject되거나 중간에 예외가 나면 rejected · 아래쪽 then은 건너뛰고 catch가 받아요', 'rejection or a thrown error makes it rejected, skipping later thens until a catch'], ['finally는 결과와 상관없이 정리 작업을 해요 · 상태는 한 번 정해지면 바뀌지 않아요', 'finally does cleanup regardless of outcome; a settled promise never changes state']],
    fin: [['Promise: pending → fulfilled 또는 rejected로 딱 한 번 바뀌는 미래 값', 'a promise is a future value that moves once from pending to fulfilled or rejected', 'jsx-xs jsx-a'], ['then 안에서 Promise를 return하면 그 결과를 기다렸다가 다음 then으로 넘겨요', 'returning a promise inside then waits for it before the next then'], ['catch 없는 rejected Promise는 unhandledrejection 경고가 돼요', 'a rejected promise with no catch triggers an unhandledrejection warning']],
    caps: [['pending', 'Pending'], ['fulfilled와 then 체인', 'Fulfilled and then chains'], ['rejected와 catch', 'Rejected and catch'], ['finally', 'finally'], ['Promise의 세 상태', 'The three states of a promise']]
  });
}

function sAsyncAwait() {
  return CW('js-async', {
    code: ['async function loadUser(id) {', '  try {', '    const res = await fetch(`/users/${id}`);', '    if (!res.ok) throw new Error(res.status);', '    return await res.json();', '  } catch (e) {', '    showError(e);', '  }', '}', 'const [a, b] = await Promise.all([f(), g()]);'],
    hl: [[0, 1], [2, 1, 'warn'], [5, 2, 'danger'], [9, 1, 'ok']],
    draw: (S) => {
      const X = 19.2;
      lbl(S, 'h1', X, .6, ['async 함수는 항상 Promise를 돌려줘요', 'an async function always returns a promise'], 'a', 1, { off: 2, w: 12.2 });
      lbl(S, 'h2', X, .6, ['await: 이 함수만 잠시 멈춤', 'await pauses only this function'], 'w', 2, { off: 3 });
      lbl(S, 'h2b', X, 1.7, ['그동안 다른 코드는 계속 실행', 'other code keeps running meanwhile'], 'g', 2, { off: 3 });
      lbl(S, 'h3', X, .6, ['reject는 try/catch로 잡아요', 'rejections land in try/catch'], 'r', 3, { off: 4 });
      lbl(S, 'h4', X, .6, ['서로 무관한 작업은 동시에', 'run unrelated work concurrently'], 'g', 4);
      const T0 = X + 3.4, U = 2.6;
      lbl(S, 'sq', X, 4.2, ['차례로', 'in turn'], 'r', 4); chip(S, 'q1', T0, 4.0, U * 1, 'f() 1s', 'warn', 4); chip(S, 'q2', T0 + U, 4.0, U * 1, 'g() 1s', 'warn', 4); lbl(S, 'sqt', T0 + 2 * U + .3, 4.2, '2s', 'm r', 4);
      lbl(S, 'pa', X, 5.8, 'all', 'm g', 4); chip(S, 'p1', T0, 5.6, U, 'f() 1s', 'ok', 4); chip(S, 'p2', T0, 6.9, U, 'g() 1s', 'ok', 4); lbl(S, 'pat', T0 + U + .3, 6.2, '1s', 'm g', 4);
      lbl(S, 'ex', X, 2.9, ['await f(); await g(); → 2초', 'await f(); await g(); → 2 s'], 'm', 4);
    },
    notes: [['async를 붙인 함수는 무엇을 return하든 Promise로 감싸서 돌려줘요', 'an async function wraps whatever it returns in a promise'], ['await는 Promise가 끝날 때까지 그 함수만 멈추고, 이벤트 루프는 다른 일을 계속해요', 'await suspends only that function until the promise settles, while the event loop carries on'], ['await한 Promise가 reject되면 예외처럼 던져져서 try/catch로 잡아요', 'if an awaited promise rejects, it throws like an exception and try/catch handles it'], ['서로 기다릴 필요 없는 작업을 하나씩 await하면 느려요 · Promise.all로 동시에 시작해요', 'awaiting independent work one by one is slow; start it together with Promise.all']],
    fin: [['async/await: Promise를 동기 코드처럼 위에서 아래로 읽히게 쓰는 문법', 'async/await writes promise-based code that reads top to bottom like synchronous code', 'jsx-xs jsx-a'], ['forEach 안의 await는 기다려 주지 않아요 · for…of나 Promise.all을 써요', 'await inside forEach does not wait; use for…of or Promise.all'], ['모듈 최상위에서는 async 없이도 await를 쓸 수 있어요(top-level await)', 'modules allow await at the top level without async']],
    caps: [['async 함수', 'Async functions'], ['await의 의미', 'What await does'], ['try/catch로 오류 처리', 'Errors with try/catch'], ['차례로 vs 동시에', 'Sequential versus concurrent'], ['async/await', 'async/await']]
  });
}

function sCombinators() {
  return CW('js-promiseall', {
    code: [],
    draw: (S) => {
      const X0 = 9.0, U = 3.8, rows = [['A', 1, 'ok', ['성공', 'ok']], ['B', 2, 'danger', ['실패', 'fails']], ['C', 3, 'ok', ['성공', 'ok']]];
      lbl(S, 'h', 1, .4, ['세 작업: A 1초 성공 · B 2초 실패 · C 3초 성공', 'three tasks: A ok at 1 s · B fails at 2 s · C ok at 3 s'], 'a', 0);
      rows.forEach(([n, t, c, l], i) => { lbl(S, 'n' + i, 1, 1.8 + i * 1.4, n, 'm', 0); chip(S, 'b' + i, X0, 1.6 + i * 1.4, t * U, [l[0] + ' ' + t + 's', l[1] + ' ' + t + 's'], c, 0); });
      [0, 1, 2, 3].forEach(t => { vl(S, 'g' + t, X0 + t * U, 5.9, 13.6, 'ink-3', 0, { w: .04, dash: 1 }); lbl(S, 'gt' + t, X0 + t * U - .6, 13.7, t + 's', 'm', 0, { w: 1.2 }); });
      const R = [['Promise.all', 2, 'danger', ['B의 오류로 바로 reject', 'rejects at once with B’s error']], ['Promise.allSettled', 3, 'ok', ['모두 끝나면 결과 배열', 'array of outcomes when all finish']], ['Promise.race', 1, 'accent', ['가장 먼저 끝난 A', 'the first to settle: A']], ['Promise.any', 1, 'ok', ['가장 먼저 성공한 A', 'the first to succeed: A']]];
      R.forEach(([n, t, c, l], i) => { const y = 6.4 + i * 1.8; lbl(S, 'rn' + i, 1, y + .15, n, 'm a', i + 1); arw(S, 'ra' + i, [X0, y + .55], [X0 + t * U, y + .55], i + 1, { color: c, h: .12 }); lbl(S, 'rl' + i, X0 + 3 * U + 1.0, y + .15, l, c === 'danger' ? 'r' : c === 'ok' ? 'g' : 'a', i + 1); });
    },
    notes: [['all: 모두 성공해야 성공 · 하나라도 실패하면 그 순간 실패해요(나머지는 계속 돌지만 무시)', 'all succeeds only if every promise does, and fails the moment one fails (the rest keep running, ignored)'], ['allSettled: 실패와 상관없이 모두 끝날 때까지 기다려 { status, value | reason } 배열을 줘요', 'allSettled waits for everything and returns an array of { status, value | reason }'], ['race: 성공이든 실패든 가장 먼저 끝난 결과를 따라가요 · 타임아웃 구현에 써요', 'race follows whichever settles first, success or failure; handy for timeouts'], ['any: 가장 먼저 성공한 결과 · 모두 실패해야 AggregateError로 실패해요', 'any takes the first success and fails with an AggregateError only if all fail']],
    fin: [['여러 Promise를 동시에 시작하고, 어떻게 기다릴지 고르는 네 가지 조합기', 'four combinators start promises together and choose how to wait for them', 'jsx-xs jsx-a'], ['서로 의존하는 화면 데이터는 all, 일부 실패를 허용하면 allSettled', 'use all for interdependent data and allSettled when partial failure is acceptable'], ['여러 서버 중 빠른 응답은 any, 제한 시간은 race(fetch, timeout)', 'use any for the fastest of several mirrors and race(fetch, timeout) for deadlines']],
    caps: [['Promise.all', 'Promise.all'], ['Promise.allSettled', 'Promise.allSettled'], ['Promise.race', 'Promise.race'], ['Promise.any', 'Promise.any'], ['Promise 조합기', 'Promise combinators']]
  });
}

function sAbort() {
  return CW('js-abort', {
    code: ['let ctrl;', 'input.oninput = async () => {', '  ctrl?.abort();           // 이전 요청 취소', '  ctrl = new AbortController();', '  const res = await fetch(`/search?q=${q}`,', '    { signal: ctrl.signal });', '};', 'fetch(url, {signal: AbortSignal.timeout(5e3)});', 'el.addEventListener("click", f, { signal });'].map((t, i) => i === 2 ? [t, '  ctrl?.abort();           // cancel the old'] : t),
    hl: [null, [2, 4, 'ok'], [7, 1, 'warn'], [8, 1]],
    draw: (S) => {
      const X = 19.0, U = 1.4;
      lbl(S, 'h0', X, .5, ['검색어를 빠르게 입력하면', 'typing quickly fires requests'], 'a', 0);
      [['"r"', 0, 7, 'warn', '700'], ['"re"', 1, 3, 'ok', '300']].forEach(([q, s, d, c, ms], i) => { lbl(S, 'q' + i, X, 1.9 + i * 1.6, q, 'm', 0); chip(S, 'b' + i, X + 2.4 + s * U, 1.7 + i * 1.6, d * U, ['응답 ' + ms + 'ms', 'reply ' + ms + ' ms'], c, 0, { off: i === 0 ? 2 : 0 }); });
      lbl(S, 'r1', X, 5.4, ['늦게 온 "r" 결과가 "re" 결과를 덮어써요 ✗', 'the late "r" reply overwrites "re" ✗'], 'r', 1, { off: 2, w: 12.2 });
      chip(S, 'b0x', X + 2.4, 1.7, 1.6 * U, ['취소됨', 'aborted'], 'line', 2, { pct: 10 }); lbl(S, 'r2', X, 5.4, ['새 입력이 오면 이전 요청을 abort ✓', 'abort the previous request on new input ✓'], 'g', 2, { off: 3, w: 12.2 });
      lbl(S, 'r3', X, 5.4, ['제한 시간이 지나면 자동으로 취소', 'cancel automatically after a deadline'], 'w', 3, { off: 4, w: 12.2 });
      lbl(S, 'r4', X, 5.4, ['signal 하나로 리스너 여러 개를 한 번에 해제', 'one signal removes many listeners at once'], 'g', 4, { w: 12.2 });
      lbl(S, 'r5', X, 6.6, ['취소된 fetch는 AbortError로 reject', 'an aborted fetch rejects with AbortError'], 'm', 2);
    },
    notes: [['빠르게 입력하면 요청이 여러 개 동시에 나가고, 늦게 도착한 옛 응답이 최신 결과를 덮어쓸 수 있어요', 'fast typing sends overlapping requests, and a late old reply can overwrite the newest result'], ['AbortController를 만들어 signal을 fetch에 넘기고, 새 입력이 오면 이전 것을 abort해요', 'create an AbortController, pass its signal to fetch, and abort the previous one on new input'], ['AbortSignal.timeout(ms)은 시간이 지나면 저절로 취소되는 signal을 만들어요', 'AbortSignal.timeout(ms) gives a signal that cancels itself after the deadline'], ['addEventListener에 signal을 주면 abort 한 번으로 리스너들이 함께 해제돼요', 'passing a signal to addEventListener lets one abort remove all those listeners']],
    fin: [['AbortController: 진행 중인 비동기 작업에 “그만”을 전달하는 표준 방법', 'AbortController is the standard way to tell in-flight async work to stop', 'jsx-xs jsx-a'], ['React의 useEffect 정리 함수에서 abort하면 언마운트 뒤 상태 갱신 경고를 막아요', 'aborting in a React useEffect cleanup prevents updates after unmount'], ['직접 만든 비동기 함수도 signal.aborted를 확인해 취소를 지원할 수 있어요', 'your own async functions can support cancellation by checking signal.aborted']],
    caps: [['경쟁 상태', 'A race condition'], ['이전 요청 취소', 'Cancel the previous request'], ['제한 시간', 'Timeouts'], ['리스너 한 번에 해제', 'Removing listeners at once'], ['AbortController로 취소', 'Cancelling with AbortController']]
  });
}
/* ===== JavaScript · 5. modules, the browser and the runtime ===== */
function sModules() {
  return CW('js-modules', {
    code: ['// math.js', 'export const add = (a, b) => a + b;', 'export default function mul(a, b) {…}', '// app.js', 'import mul, { add } from "./math.js";', '', 'const { readFile } = require("fs");', 'module.exports = { add };', '', 'const { draw } = await import("./chart.js");'],
    hl: [[1, 2], [4, 1, 'ok'], [6, 2, 'warn'], [9, 1]],
    side: [
      [[['export: 밖에 내보낼 것을 표시', 'export marks what leaves the file'], 'a'], [['이름 있는 export 여러 개 + default 하나', 'many named exports, one default'], '']],
      [[['import는 파일 맨 위에서 정적으로', 'import is static, at the top'], 'a'], [['실행 전에 의존 관계를 알 수 있어', 'dependencies are known before running'], ''], [['쓰지 않는 코드 제거(트리 셰이킹) ✓', 'enables tree shaking ✓'], 'g']],
      [[['CommonJS: Node.js의 옛 방식', 'CommonJS: Node.js’s older system'], 'w'], [['require는 실행 중에 동기로 불러와요', 'require loads synchronously at run time'], ''], [['package.json "type": "module"로 ESM 사용', '"type": "module" in package.json opts into ESM'], '']],
      [[['import(): 필요할 때 불러오기', 'import(): load on demand'], 'a'], [['Promise를 돌려줘 코드 스플리팅에 써요', 'returns a promise; used for code splitting'], 'g']]
    ],
    notes: [['ES 모듈은 파일 하나가 하나의 스코프예요 · export한 것만 다른 파일에서 볼 수 있어요', 'an ES module is a file with its own scope; only what it exports is visible elsewhere'], ['import는 정적이라 번들러가 실행 전에 의존 관계를 읽고, 안 쓰는 export를 빼요', 'import is static, so bundlers read the dependency graph before running and drop unused exports'], ['Node.js의 CommonJS(require)는 실행 중에 불러오는 옛 방식이에요 · 지금은 ESM으로 넘어가는 중', 'Node.js’s CommonJS (require) loads at run time; the ecosystem is moving to ESM'], ['import()는 함수처럼 필요한 순간에 모듈을 불러와 Promise로 돌려줘요', 'import() loads a module at the moment it is needed and returns a promise']],
    fin: [['ES 모듈(ESM): import·export로 파일 사이의 의존을 선언하는 표준 모듈 시스템', 'ES modules declare dependencies between files with import and export; they are the standard module system', 'jsx-xs jsx-a'], ['모듈은 한 번만 실행되고 캐시돼요 · 여러 곳에서 import해도 같은 인스턴스', 'a module runs once and is cached, so every importer shares the same instance'], ['브라우저는 <script type="module">로 바로 ESM을 실행해요', 'browsers run ESM directly with <script type="module">']],
    caps: [['export', 'export'], ['정적 import', 'Static import'], ['CommonJS', 'CommonJS'], ['동적 import()', 'Dynamic import()'], ['ES 모듈과 CommonJS', 'ES modules and CommonJS']]
  });
}

function sDelegation() {
  return CW('js-delegation', {
    code: ['list.addEventListener("click", (e) => {', '  const li = e.target.closest("li");', '  if (!li || !list.contains(li)) return;', '  remove(li.dataset.id);', '});', '', 'e.stopPropagation();  // 위로 전파 중단', 'e.preventDefault();   // 기본 동작 막기'].map((t, i) => i === 6 ? [t, 'e.stopPropagation();  // stop bubbling'] : i === 7 ? [t, 'e.preventDefault();   // block the default'] : t),
    hl: [null, [0, 1], [1, 3, 'ok'], [6, 2, 'warn']],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'ulf', X, .6, 7.8, 7.4, 'accent', 0, { w: .1 }); lbl(S, 'ull', X + .3, .7, '<ul id="list">', 'm a', 0);
      [1, 2, 3].forEach((n, j) => { chip(S, 'li' + j, X + .4, 2.0 + j * 1.9, 7.0, '', 'line', 0, { pct: 10 }); lbl(S, 'lt' + j, X + .8, 2.15 + j * 1.9, 'li data-id=' + n, 'm', 0); chip(S, 'bt' + j, X + 5.6, 2.1 + j * 1.9, 1.6, '✕', 'danger', 0, { pct: 18, h: .9 }); });
      tsets(S, 'bt1', [[2, 'danger', 50]]);
      const BX = X + 8.4; ['document', 'ul', 'li', 'button'].forEach((t, j) => chip(S, 'bp' + j, BX, .6 + j * 1.9, 3.6, t, 'line', 2, { pct: 10 }));
      [1, 2, 3].forEach(j => arw(S, 'bu' + j, [BX + 1.8, .6 + j * 1.9], [BX + 1.8, .6 + (j - 1) * 1.9 + 1.15], 2, { color: 'warn' }));
      tsets(S, 'bp3', [[2, 'danger', 40]]); tsets(S, 'bp1', [[3, 'ok', 40]]);
      lbl(S, 'bl', X, 9.4, ['클릭은 버튼 → li → ul → document로 올라가요(버블링)', 'a click bubbles: button → li → ul → document'], 'w', 2, { off: 3, w: 12.0 });
      lbl(S, 'dl', X, 9.4, ['ul 리스너 하나가 모든 항목을 처리', 'one listener on ul handles every item'], 'g', 3, { off: 4, w: 12.0 });
      lbl(S, 'dl2', X, 10.5, ['나중에 추가된 li도 자동으로 ✓', 'items added later work too ✓'], 'g', 3, { off: 4 });
      lbl(S, 'cl', X, 11.6, ['closest: 클릭한 곳에서 가장 가까운 li', 'closest: the nearest li to the click'], 'a', 3, { off: 4 });
      lbl(S, 'sl', X, 9.4, ['전파 중단·기본 동작 막기는 꼭 필요할 때만', 'stop propagation or defaults only when needed'], 'w', 4, { w: 12.0 });
    },
    notes: [['항목마다 리스너를 다는 대신, 부모 하나에 다는 방법이 있어요', 'instead of a listener per item, one listener on the parent can do the job'], ['이벤트는 클릭한 요소에서 부모 쪽으로 차례로 올라가요(버블링) · 그래서 ul도 클릭을 받아요', 'events bubble from the clicked element up through its ancestors, so ul hears the click too'], ['e.target.closest("li")로 어느 항목인지 찾고 data-id로 대상을 알아내요', 'e.target.closest("li") finds which item it was, and data-id identifies it'], ['stopPropagation은 위로 가는 것을, preventDefault는 링크 이동 같은 기본 동작을 막아요', 'stopPropagation halts bubbling; preventDefault blocks defaults such as following a link']],
    fin: [['이벤트 위임: 공통 부모 하나에 리스너를 달아 자식들의 이벤트를 처리하는 방법', 'event delegation handles children’s events with one listener on a common parent', 'jsx-xs jsx-a'], ['리스너 수가 줄어 메모리가 적고, 동적으로 추가된 항목도 따로 연결할 필요가 없어요', 'fewer listeners use less memory, and dynamically added items need no wiring'], ['focus·blur처럼 버블링하지 않는 이벤트는 focusin·focusout을 써요', 'for non-bubbling events such as focus and blur, use focusin and focusout']],
    caps: [['항목이 많은 목록', 'A list with many items'], ['버블링', 'Bubbling'], ['위임으로 처리', 'Handling by delegation'], ['전파와 기본 동작 제어', 'Controlling propagation and defaults'], ['이벤트 위임', 'Event delegation']]
  });
}

function sFetch() {
  return CW('js-fetch', {
    code: ['const res = await fetch("/api/todos", {', '  method: "POST",', '  headers: {', '    "Content-Type": "application/json",', '  },', '  body: JSON.stringify({ title: "공부" }),', '  credentials: "include",', '});', 'if (!res.ok)', '  throw new Error(`HTTP ${res.status}`);', 'const todo = await res.json();'].map((t, i) => i === 5 ? [t, '  body: JSON.stringify({ title: "study" }),'] : t),
    hl: [[0, 6], [8, 2, 'danger'], [10, 1, 'ok'], [6, 1, 'warn']],
    side: [
      [[['메서드·헤더·본문을 옵션으로', 'method, headers and body as options'], 'a'], [['본문은 문자열이라 JSON.stringify', 'the body is text, hence JSON.stringify'], '']],
      [[['404·500에도 fetch는 성공해요!', 'fetch resolves even on 404 or 500!'], 'r'], [['네트워크 오류일 때만 reject', 'it rejects only on network errors'], ''], [['res.ok(200~299)를 직접 확인', 'check res.ok (200–299) yourself'], 'g']],
      [[['본문 읽기도 비동기 · 한 번만', 'reading the body is async, and once only'], 'a'], ['res.json() res.text() res.blob()', 'm']],
      [[['다른 도메인이면 CORS 규칙', 'cross-origin calls follow CORS'], 'w'], [['쿠키를 보내려면 credentials', 'cookies need credentials'], '']]
    ],
    notes: [['fetch는 URL과 옵션을 받아 Promise<Response>를 돌려줘요 · POST 본문은 JSON 문자열로 보내요', 'fetch takes a URL and options and returns a Promise<Response>; POST bodies go as JSON strings'], ['서버가 404나 500을 돌려줘도 fetch는 reject하지 않아요 · res.ok를 꼭 확인해요', 'fetch does not reject on 404 or 500, so always check res.ok'], ['본문은 res.json()으로 한 번 더 기다려 읽어요 · 같은 응답 본문은 두 번 읽을 수 없어요', 'the body is read with another await, res.json(), and can be read only once'], ['다른 출처에 요청하면 CORS가 적용되고, 쿠키를 보내려면 credentials를 설정해요', 'cross-origin requests follow CORS, and sending cookies needs the credentials option']],
    fin: [['fetch: Promise 기반의 표준 HTTP 요청 API · 브라우저와 Node.js 18+에 내장', 'fetch is the standard promise-based HTTP API, built into browsers and Node.js 18+', 'jsx-xs jsx-a'], ['기본 타임아웃이 없어요 · AbortSignal.timeout으로 제한 시간을 두세요', 'there is no default timeout; set one with AbortSignal.timeout'], ['재시도·캐시·로딩 상태 관리는 TanStack Query 같은 라이브러리가 편해요', 'libraries such as TanStack Query handle retries, caching and loading state']],
    caps: [['요청 옵션', 'Request options'], ['res.ok 확인', 'Checking res.ok'], ['본문 읽기', 'Reading the body'], ['CORS와 쿠키', 'CORS and cookies'], ['fetch로 HTTP 요청', 'HTTP requests with fetch']]
  });
}

function sErrors() {
  return CW('js-errors', {
    code: ['try {', '  JSON.parse("{bad json");', '} catch (e) {', '  if (e instanceof SyntaxError) showHint();', '  else throw e;', '} finally {', '  setLoading(false);', '}', 'class InputError extends Error {}', 'throw new InputError("email", { cause: e });', 'addEventListener("unhandledrejection", log);'],
    hl: [[0, 8], [8, 2, 'warn'], [10, 1, 'danger'], null],
    side: [
      [[['try에서 던져지면 catch로', 'a throw in try goes to catch'], 'a'], [['모르는 오류는 다시 던지기', 'rethrow what you cannot handle'], 'w'], [['finally는 항상 실행 · 정리 작업', 'finally always runs: cleanup'], '']],
      [[['Error를 상속해 오류 종류를 구분', 'extend Error to classify failures'], 'a'], [['cause로 원래 오류를 연결', 'link the original error via cause'], 'g']],
      [[['catch 없는 Promise 실패는', 'a promise failure with no catch'], 'r'], [['unhandledrejection으로만 보여요', 'surfaces only as unhandledrejection'], ''], [['전역 핸들러로 모아 보고(Sentry 등)', 'collect it globally (Sentry, etc.)'], '']],
      [[['좋은 습관', 'good habits'], 'a'], [['조용히 삼키지 않기: catch {}', 'never swallow: catch {}'], 'r'], [['사용자 메시지와 로그를 분리', 'separate user messages from logs'], 'g'], [['경계에서 한 번에 처리', 'handle at boundaries'], 'g']]
    ],
    notes: [['try 블록에서 예외가 나면 catch로 넘어가요 · 처리할 수 없는 종류는 다시 던져요', 'an exception in try jumps to catch; rethrow kinds you cannot handle'], ['Error를 상속한 클래스로 종류를 나누고, cause로 원인을 연결하면 디버깅이 쉬워요', 'subclassing Error classifies failures, and cause links the root problem for easier debugging'], ['await 없이 버려진 Promise의 실패는 try/catch에 안 잡히고 unhandledrejection으로만 나타나요', 'a failing promise that nobody awaits escapes try/catch and appears only as unhandledrejection'], ['빈 catch로 오류를 삼키지 말고, 경계(API 호출부, 화면 단위)에서 모아 처리해요', 'do not swallow errors with empty catches; handle them at boundaries such as API calls or screens']],
    fin: [['에러 처리: 실패를 감지하고, 복구하거나 알리고, 원인을 남기는 일', 'error handling detects failure, recovers or reports it, and records the cause', 'jsx-xs jsx-a'], ['finally는 return보다도 나중에 실행돼요 · 로딩 상태 해제에 딱이에요', 'finally runs even after a return, ideal for clearing loading state'], ['React는 Error Boundary로 화면 일부의 렌더링 오류를 격리해요', 'React isolates rendering errors in part of the screen with error boundaries']],
    caps: [['try·catch·finally', 'try, catch and finally'], ['사용자 정의 오류', 'Custom errors'], ['처리되지 않은 Promise 실패', 'Unhandled rejections'], ['좋은 습관', 'Good habits'], ['에러 처리', 'Error handling']]
  });
}

function sNumber() {
  return CW('js-number', {
    code: ['0.1 + 0.2               // 0.30000000000000004', '0.1 + 0.2 === 0.3       // false', 'Math.abs(a - b) < Number.EPSILON', 'Number.MAX_SAFE_INTEGER // 2^53 − 1', '2 ** 53 + 1             // 9007199254740992', '9007199254740993n + 1n  // BigInt ✓', 'parseInt("08px")        // 8', '(1.005).toFixed(2)      // "1.00"'],
    hl: [[0, 3], [3, 2, 'danger'], [5, 1, 'ok'], [6, 2, 'warn']],
    side: [
      [[['모든 number는 64비트 부동소수점', 'every number is a 64-bit float'], 'a'], [['0.1은 2진수로 딱 떨어지지 않아요', '0.1 has no exact binary form'], ''], [['같음 비교는 오차 범위로', 'compare within a tolerance'], 'g']],
      [[['2^53을 넘으면 정수도 부정확', 'beyond 2^53 even integers blur'], 'r'], [['DB의 64비트 ID를 숫자로 받으면 위험', 'risky for 64-bit IDs from databases'], 'w']],
      [[['BigInt: 크기 제한 없는 정수', 'BigInt: integers of any size'], 'g'], [['number와 섞어 계산은 안 돼요', 'cannot mix with number in arithmetic'], 'w']],
      [[['돈은 원·센트 단위 정수로 계산', 'compute money in integer units'], 'g'], [['표시는 Intl.NumberFormat', 'display with Intl.NumberFormat'], ''], [['parseInt는 기수 10을 명시', 'give parseInt a radix of 10'], '']]
    ],
    notes: [['자바스크립트의 숫자는 64비트 부동소수점이라 0.1 + 0.2가 정확히 0.3이 아니에요', 'JavaScript numbers are 64-bit floats, so 0.1 + 0.2 is not exactly 0.3'], ['2^53보다 큰 정수는 정확히 표현되지 않아 +1을 해도 같은 값이 나와요', 'integers beyond 2^53 cannot all be represented, so adding 1 may change nothing'], ['큰 정수는 끝에 n을 붙인 BigInt로 · 단 number와 섞어 계산할 수는 없어요', 'large integers use BigInt (a trailing n), which cannot be mixed with numbers in arithmetic'], ['금액은 원이나 센트 단위 정수로 계산하고, 표시할 때 Intl.NumberFormat으로 바꿔요', 'compute money in integer units such as won or cents, and format it with Intl.NumberFormat']],
    fin: [['IEEE 754 배정밀도: 유효 숫자 약 15~17자리, 안전한 정수는 ±(2^53 − 1)까지', 'IEEE 754 double precision: about 15–17 significant digits, safe integers up to ±(2^53 − 1)', 'jsx-xs jsx-a'], ['NaN, Infinity, −0도 숫자예요 · Number.isNaN, Number.isFinite로 검사', 'NaN, Infinity and −0 are numbers too; test with Number.isNaN and Number.isFinite'], ['toFixed는 반올림이 부정확할 수 있어 화면 표시용으로만 써요', 'toFixed can round unexpectedly, so keep it for display only']],
    caps: [['0.1 + 0.2', '0.1 + 0.2'], ['안전한 정수의 한계', 'The safe-integer limit'], ['BigInt', 'BigInt'], ['돈과 표시', 'Money and display'], ['숫자의 함정', 'Number pitfalls']]
  });
}

function sGc() {
  return CW('js-gc', {
    code: [],
    draw: (S) => {
      const N = { root: [3.0, 3.0], a: [9.0, 2.0], b: [9.0, 5.4], c: [15.0, 2.0], d: [15.0, 5.4], x: [21.0, 3.6], y: [26.4, 3.6] };
      const E = [['root', 'a'], ['root', 'b'], ['a', 'c'], ['b', 'd'], ['x', 'y'], ['y', 'x']];
      E.forEach(([p, q], i) => arw(S, 'e' + i, [N[p][0] + 1.1, N[p][1]], [N[q][0] - 1.1, N[q][1]], 0, { color: 'ink-3' }));
      Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k === 'root' ? ['루트', 'roots'] : k, k === 'root' ? 'accent' : 'line', 0, { r: 1.0, pct: 18 }));
      ['a', 'b', 'c', 'd'].forEach(k => tsets(S, 'n' + k, [[2, 'ok', 40]])); ['x', 'y'].forEach(k => { tsets(S, 'n' + k, [[2, 'danger', 30]]); S.set('n' + k, 3, { opacity: '.15' }); });
      ['e4', 'e5'].forEach(k => S.set(k, 3, { opacity: '.15' }));
      lbl(S, 'rt', 1, 5.0, ['전역·스택 변수', 'globals, stack'], '', 0, { w: 4.2 });
      lbl(S, 'm1', 1, 8.0, ['1. 루트에서 닿는 객체에 표시(mark)', '1. mark everything reachable from the roots'], 'g', 2);
      lbl(S, 'm2', 1, 9.1, ['2. 표시 안 된 객체를 치워요(sweep) · 서로 가리켜도 닿지 않으면 정리', '2. sweep the unmarked, even objects pointing at each other'], 'r', 3, { w: 30 });
      codeLines(S, 'lk', 1, 10.6, ['setInterval(() => update(bigData), 1000);   // 멈추지 않으면 영원히', 'el.addEventListener("scroll", onScroll);   // 제거 안 하면 계속', 'cache[userId] = hugeObject;               // 커지기만 하는 캐시'].map((t, i) => [t, ['setInterval(() => update(bigData), 1000);   // alive forever if never cleared', 'el.addEventListener("scroll", onScroll);   // stays unless removed', 'cache[userId] = hugeObject;               // a cache that only grows'][i]]), 4, 5, { cls: 'jsx-r' });
      lbl(S, 'l0', 1, 14.0, ['누수: 더 이상 안 쓰지만 루트에서 닿는 객체', 'a leak: unused yet still reachable from a root'], 'w', 4, { off: 5 });
      codeLines(S, 'fx', 1, 10.6, ['clearInterval(id);  ctrl.abort();', 'const meta = new WeakMap();   // 키가 사라지면 정리', 'DevTools → Memory → 힙 스냅숏 비교'].map((t, i) => [t, ['clearInterval(id);  ctrl.abort();', 'const meta = new WeakMap();   // cleared with its keys', 'DevTools → Memory → compare heap snapshots'][i]]), 5, 0, { cls: 'jsx-g' });
    },
    notes: [['자바스크립트는 메모리를 직접 해제하지 않아요 · 가비지 컬렉터가 안 쓰는 객체를 찾아 치워요', 'JavaScript never frees memory by hand; the garbage collector finds and removes unused objects'], ['기준은 “루트(전역 변수, 실행 중인 함수의 변수)에서 닿을 수 있는가”예요 · 닿는 객체에 표시해요', 'the test is reachability from the roots (globals and live variables); reachable objects are marked'], ['표시되지 않은 객체는 서로 가리키고 있어도 함께 치워져요', 'unmarked objects are swept, even if they reference each other'], ['누수는 안 쓰는데 여전히 닿는 객체예요 · 멈추지 않은 타이머, 떼지 않은 리스너, 끝없이 크는 캐시', 'a leak is an object no longer used but still reachable: uncleared timers, unremoved listeners, ever-growing caches']],
    fin: [['가비지 컬렉션: 도달할 수 없는 객체의 메모리를 자동으로 회수 · V8은 세대별 GC를 써요', 'garbage collection reclaims unreachable objects automatically; V8 uses a generational collector', 'jsx-xs jsx-a'], ['SPA는 페이지를 오래 유지하니 작은 누수도 쌓여요 · 컴포넌트 정리 함수에서 해제하세요', 'single-page apps live long, so small leaks accumulate; release resources in cleanup functions'], ['DevTools의 힙 스냅숏을 비교하면 늘어나기만 하는 객체를 찾을 수 있어요', 'comparing DevTools heap snapshots reveals objects that only grow']],
    caps: [['루트에서 닿는가', 'Reachable from the roots?'], ['표시하기', 'Mark'], ['치우기', 'Sweep'], ['메모리 누수', 'Memory leaks'], ['가비지 컬렉션과 메모리 누수', 'Garbage collection and leaks']]
  });
}

function sWorker() {
  return CW('js-worker', {
    code: ['// main.js', 'const w = new Worker("hash.js");', 'w.postMessage(file);', 'w.onmessage = (e) => show(e.data);', '// hash.js', 'onmessage = (e) => {', '  postMessage(heavyHash(e.data));', '};'],
    hl: [null, [1, 3], [4, 4, 'ok'], null],
    draw: (S) => {
      const X0 = 1, Y = 10.0, U = 2.4;
      lbl(S, 'mt', X0, Y, ['메인 스레드', 'main thread'], 'a', 0); lbl(S, 'wt', X0, Y + 2.6, ['워커 스레드', 'worker thread'], 'g', 2);
      chip(S, 'm0', X0 + 4.6, Y - .2, 3 * U, ['UI', 'UI'], 'ok', 0, { pct: 20 }); chip(S, 'hv', X0 + 4.6 + 3 * U, Y - .2, 5 * U, ['heavyHash 2초 · 화면 멈춤', 'heavyHash 2 s · page frozen'], 'danger', 1, { off: 2 });
      chip(S, 'm1', X0 + 4.6 + 3 * U, Y - .2, 5 * U, ['클릭·스크롤 계속 반응', 'clicks and scrolls stay responsive'], 'ok', 2, { pct: 20 });
      chip(S, 'wk', X0 + 4.6 + 3 * U, Y + 2.4, 5 * U, 'heavyHash', 'warn', 2);
      arw(S, 'pm', [X0 + 4.6 + 3 * U, Y + .9], [X0 + 4.6 + 3 * U + .6, Y + 2.4], 2, { color: 'accent' }); arw(S, 'pb', [X0 + 4.6 + 8 * U - .6, Y + 2.4], [X0 + 4.6 + 8 * U, Y + .9], 2, { color: 'accent' });
      lbl(S, 'pml', 19.2, .6, ['postMessage: 데이터를 복사해서 전달', 'postMessage copies the data across'], 'a', 3, { off: 4 }); lbl(S, 'pml2', 19.2, 1.7, ['큰 버퍼는 transfer로 소유권 이전', 'transfer large buffers instead'], '', 3, { off: 4 });
      lbl(S, 'lim', 19.2, .6, ['워커는 DOM에 접근할 수 없어요', 'workers cannot touch the DOM'], 'r', 4); lbl(S, 'lim2', 19.2, 1.7, ['계산·파싱·압축·이미지 처리에', 'for computing, parsing, compressing, images'], 'g', 4);
    },
    notes: [['메인 스레드에서 2초짜리 계산을 돌리면 그동안 클릭도, 스크롤도, 렌더링도 멈춰요', 'a two-second computation on the main thread freezes clicks, scrolling and rendering'], ['Worker를 만들어 무거운 계산을 다른 스레드에서 돌리면 화면은 계속 반응해요', 'running the heavy work in a Worker on another thread keeps the page responsive'], ['둘은 postMessage로만 대화해요 · 데이터는 복사되고, 큰 버퍼는 transfer로 넘겨요', 'they talk only through postMessage; data is copied, and big buffers can be transferred'], ['워커는 DOM을 못 만지니 계산만 맡기고 결과로 화면은 메인 스레드가 그려요', 'workers cannot touch the DOM, so they compute and the main thread draws the results']],
    fin: [['웹 워커: 메인 스레드와 메모리를 공유하지 않는 별도 스레드에서 스크립트를 실행', 'a web worker runs scripts on a separate thread that shares no memory with the main thread', 'jsx-xs jsx-a'], ['Comlink 같은 라이브러리는 postMessage를 함수 호출처럼 감싸 줘요', 'libraries such as Comlink wrap postMessage to look like function calls'], ['Node.js에는 worker_threads, 서비스 워커는 네트워크 프록시라는 다른 역할이에요', 'Node.js has worker_threads, and service workers play a different role as network proxies']],
    caps: [['멈추는 메인 스레드', 'A blocked main thread'], ['워커로 옮기기', 'Moving work to a worker'], ['postMessage', 'postMessage'], ['워커의 한계', 'What workers cannot do'], ['웹 워커', 'Web workers']]
  });
}
return { css: CSSX, secs: [
  sec('js-basic', '값과 문법', 'Values & syntax', '값과 기본 문법', 'Values and core syntax', '변수에 무엇이 담기고, 문법이 값을 어떻게 다루는지예요. 자바스크립트에서 가장 자주 헷갈리는 규칙들을 모았어요.', 'What variables hold and how the syntax treats values, collecting the rules that trip people up most often.', [
    item('js-types', '원시 값과 참조', 'Values and references', '숫자·문자열 같은 원시 값은 대입할 때 값이 복사되고, 객체·배열·함수는 “가리키는 참조”가 복사돼요.', 'let b = a로 숫자를 복사한 뒤 b를 바꿔도 a는 그대로예요. 반면 const p = o로 객체를 대입하면 o와 p가 같은 객체 하나를 가리켜서, p.n을 바꾸면 o.n도 바뀌어요. 함수에 객체를 넘겨 안에서 고치면 호출한 쪽의 원본이 바뀌는 것도 같은 이유예요. ===로 객체를 비교하면 내용이 아니라 같은 객체인지만 따져요. 원시 타입은 string, number, bigint, boolean, undefined, null, symbol 7가지예요.', 'Primitives such as numbers and strings are copied by value on assignment, while objects, arrays and functions copy a reference to the same object.', 'After let b = a copies a number, changing b leaves a alone. Assigning an object with const p = o makes o and p point at one object, so changing p.n changes o.n too. The same reason explains why a function that mutates an object argument changes the caller’s original. === on objects asks whether they are the same object, not whether their contents match. The seven primitives are string, number, bigint, boolean, undefined, null and symbol.', sTypes()),
    item('js-letconst', 'var·let·const', 'var, let and const', 'var는 함수 단위, let·const는 블록 단위 스코프예요. const는 재할당만 막고 내용 변경은 막지 않아요.', 'var i로 반복문을 돌며 setTimeout을 걸면, 반복문 전체가 i 하나를 공유해 콜백 셋이 모두 3을 출력해요. let j는 반복마다 새 변수가 생겨서 0, 1, 2가 나와요. const arr = [1]에 push는 되지만 arr = []처럼 다시 넣으면 TypeError예요. 요즘은 기본은 const, 값이 바뀌어야 할 때만 let을 쓰고 var는 쓰지 않아요. 객체 자체를 얼리고 싶다면 Object.freeze를 써요(얕게만 얼어요).', 'var is scoped to the function, let and const to the block; const blocks reassignment but not changes to contents.', 'Looping with var i and scheduling setTimeout makes the whole loop share one i, so all three callbacks print 3. let j creates a fresh variable per iteration, printing 0, 1 and 2. const arr = [1] still allows push, but arr = [] throws a TypeError. Modern style uses const by default, let only when a value must change, and no var. To freeze the object itself, use Object.freeze, which is shallow.', sLetConst()),
    item('js-hoisting', '호이스팅과 TDZ', 'Hoisting and the TDZ', '엔진은 실행 전에 선언을 먼저 등록해요. var는 undefined로 시작하고, let·const는 선언 줄 전까지 TDZ라 접근하면 오류예요.', '선언보다 위에서 var x를 읽으면 오류 없이 undefined가 나와 버그를 숨겨요. let·const도 미리 등록되지만 선언 줄에 닿기 전까지는 일시적 사각지대(TDZ)라 ReferenceError를 내요. function 선언은 본문까지 통째로 올라가 파일 위쪽에서 호출해도 돼요. 반면 const f = () => {} 같은 함수 표현식은 변수 규칙을 따라서 선언 전에 부르면 실패해요. 선언은 쓰는 곳보다 위에 두는 습관이 가장 안전해요.', 'Before running, the engine registers declarations first: var starts as undefined, while let and const sit in the temporal dead zone until their line.', 'Reading var x above its declaration silently yields undefined, which hides bugs. let and const are registered too, but touching them before their line throws a ReferenceError because they are in the temporal dead zone. Function declarations are hoisted with their bodies, so they can be called from the top of the file. Function expressions such as const f = () => {} follow variable rules and fail if called early. Declaring things before using them is the safest habit.', sHoisting()),
    item('js-equality', '== 와 ===', '== versus ===', '==는 타입이 다르면 변환한 뒤 비교하고, ===는 변환 없이 타입과 값이 모두 같아야 true예요.', '"" == 0과 "0" == 0은 true지만 "" == "0"은 false라서, ==는 전이 법칙조차 성립하지 않아요. 그래서 거의 항상 ===를 써요. 예외로 x == null은 null과 undefined만 함께 거르는 관용구로 쓰여요. NaN은 자기 자신과도 같지 않아서 NaN === NaN이 false예요. Number.isNaN이나 Object.is(NaN, NaN)로 검사하고, Object.is는 +0과 −0도 구분해요.', '== converts mismatched types before comparing; === requires the same type and value without conversion.', '"" == 0 and "0" == 0 are true but "" == "0" is false, so == is not even transitive. That is why === is the default almost everywhere. The exception is x == null, an idiom that catches both null and undefined. NaN is not equal even to itself, so NaN === NaN is false. Use Number.isNaN or Object.is(NaN, NaN), and note that Object.is also tells +0 from −0.', sEquality()),
    item('js-truthy', 'truthy와 falsy', 'Truthy and falsy', '조건문은 값을 불리언으로 바꿔 판단해요. false가 되는 값은 false, 0, −0, 0n, "", null, undefined, NaN 8개뿐이에요.', '“0”, “false”, 빈 배열 [], 빈 객체 {}는 모두 truthy라서 다른 언어에 익숙하면 자주 헷갈려요. count || 10처럼 ||로 기본값을 주면 0이나 빈 문자열 같은 정상 값도 기본값으로 덮어써요. ??는 null과 undefined일 때만 기본값을 줘서 0과 “”를 지켜요. if (list.length)처럼 truthy를 짧게 쓰는 건 좋지만, 0이 의미 있는 값이면 명시적으로 비교하세요.', 'Conditions convert values to booleans, and only eight values become false: false, 0, −0, 0n, "", null, undefined and NaN.', '"0", "false", an empty array and an empty object are all truthy, which surprises people coming from other languages. A default written as count || 10 overwrites legitimate values such as 0 or an empty string. ?? supplies the default only for null and undefined, so 0 and "" survive. Short truthy checks such as if (list.length) are fine, but compare explicitly when 0 is a meaningful value.', sTruthy()),
    item('js-destructure', '구조 분해 할당', 'Destructuring', '객체나 배열에서 필요한 값만 골라 변수로 꺼내는 문법이에요. 이름 바꾸기, 기본값, 중첩까지 한 줄로 해요.', 'const { name, age: years = 0 } = user는 name을 꺼내고 age를 years라는 이름으로, 없으면 0으로 받아요. 중첩된 객체도 모양 그대로 써서 깊은 값을 한 번에 꺼내요. 배열은 위치로 꺼내며 쉼표로 건너뛸 수 있어요. 함수 매개변수에 쓰면 옵션 객체를 받기 편하고, [a, b] = [b, a]로 임시 변수 없이 두 값을 바꿔요. 없는 중첩 객체를 분해하면 TypeError이니 기본값 = {}을 함께 줘요.', 'Syntax that pulls just the values you need out of objects and arrays into variables, with renaming, defaults and nesting in one line.', 'const { name, age: years = 0 } = user takes name, renames age to years, and falls back to 0. Nested objects can be unpacked by writing the same shape. Arrays unpack by position, and commas skip items. In parameters it makes option objects easy to accept, and [a, b] = [b, a] swaps two values without a temporary. Destructuring a missing nested object throws a TypeError, so pair it with a default of {}.', sDestructure()),
    item('js-spread', '전개와 나머지', 'Spread and rest', '...은 놓인 자리에 따라 반대 역할을 해요. 값 쪽에서는 펼치고(전개), 받는 쪽에서는 남은 것을 모아요(나머지).', 'Math.max(...nums)는 배열을 인자 여러 개로 펼쳐요. [...a, 4]는 원본을 바꾸지 않은 새 배열이고, { ...base, theme: "dark" }는 객체를 합치되 같은 키는 뒤의 것이 이겨요. 이 복사는 얕아서 안쪽 객체는 여전히 공유돼요. 매개변수의 (...args)나 const [first, ...rest] = arr에서는 나머지를 배열로 모아요. 나머지는 항상 마지막 자리에만 올 수 있어요.', 'The same ... does opposite jobs depending on position: it expands values where they are used and gathers the rest where they are received.', 'Math.max(...nums) expands an array into separate arguments. [...a, 4] builds a new array without touching the original, and { ...base, theme: "dark" } merges objects with later keys winning. The copy is shallow, so nested objects are still shared. In parameters such as (...args) or in const [first, ...rest] = arr, it gathers the remaining items into an array. A rest element must always come last.', sSpread()),
    item('js-optional', '옵셔널 체이닝과 ??', 'Optional chaining and ??', '?.는 앞의 값이 null·undefined면 멈추고 undefined를 돌려주고, ??는 null·undefined일 때만 기본값을 써요.', 'user.address.city는 address가 없으면 TypeError로 멈춰요. user?.address?.city는 중간이 비어도 undefined로 끝나고, obj.method?.()나 arr?.[0]처럼 호출과 인덱스에도 써요. 여기에 ?? "미정"을 붙이면 깊은 경로 읽기와 기본값이 한 줄이에요. ||와 달리 ??는 0과 빈 문자열을 지켜요. 다만 반드시 있어야 할 값에 ?.를 쓰면 버그가 조용히 숨으니, 정말 없을 수 있는 값에만 쓰세요.', '?. stops and returns undefined when the value before it is null or undefined, and ?? applies a default only for null or undefined.', 'user.address.city throws a TypeError when address is missing. user?.address?.city ends quietly with undefined, and the same works for calls and indexes, as in obj.method?.() and arr?.[0]. Adding ?? "unknown" reads a deep path and supplies a default in one line. Unlike ||, ?? keeps 0 and empty strings. Using ?. on values that must exist hides bugs, so keep it for values that can genuinely be absent.', sOptional()),
  ]),
  sec('js-func', '함수', 'Functions', '함수와 스코프', 'Functions and scope', '변수가 어디서 보이는지, 함수가 무엇을 기억하는지, this가 어떻게 정해지는지예요.', 'Where variables are visible, what functions remember, and how this gets decided.', [
    item('js-scope', '렉시컬 스코프와 스코프 체인', 'Lexical scope and the scope chain', '변수가 보이는 범위는 코드를 “어디에 썼는지”로 정해져요. 찾을 때는 안쪽 스코프에서 바깥쪽으로 차례로 올라가요.', 'inner 함수 안에서 i를 쓰면 먼저 자기 스코프를 보고, 없으면 감싸는 outer에서 o를, 그래도 없으면 전역에서 g를 찾아요. 이렇게 이어진 사슬이 스코프 체인이에요. 방향은 안에서 밖으로만이라 바깥 코드는 안쪽 변수를 볼 수 없어요. 함수를 어디서 호출했는지가 아니라 어디서 정의했는지가 기준이라서 렉시컬(어휘적) 스코프라고 불러요. 안쪽에서 같은 이름을 다시 선언하면 바깥 변수를 가려요(섀도잉).', 'Where a variable is visible is decided by where the code is written, and lookups climb from the inner scope outward.', 'Using i inside inner checks inner’s own scope first, then finds o in the enclosing outer, then g in the global scope. That chain of scopes is the scope chain. Lookups go only from inside to outside, so outer code cannot see inner variables. Because the rule depends on where a function is defined, not where it is called, it is called lexical scope. Redeclaring the same name inside hides the outer variable, which is called shadowing.', sScope()),
    item('js-closure', '클로저', 'Closures', '함수가 자신이 만들어진 환경(바깥 변수)을 기억해, 바깥 함수가 끝난 뒤에도 그 변수를 쓰는 것이에요.', 'makeCounter()를 실행하면 count = 0을 담은 환경이 생기고, 돌려준 화살표 함수가 그 환경을 계속 참조해요. 그래서 c1()을 부를 때마다 같은 count가 1, 2, 3으로 올라가지만 밖에서는 count에 직접 손댈 수 없어요. makeCounter를 다시 부르면 새 환경이 생겨 c2는 c1과 따로 세요. 클로저는 비공개 상태, 이벤트 핸들러, 메모이제이션, React 훅의 바탕이에요. 큰 객체를 붙잡은 클로저가 오래 살아 있으면 메모리가 풀리지 않는 점은 주의해요.', 'A function remembers the environment it was created in, so it can keep using outer variables after the outer function has returned.', 'Calling makeCounter() creates an environment holding count = 0, and the returned arrow function keeps a reference to it. Each call to c1() raises the same count to 1, 2, 3, yet nothing outside can touch count directly. Calling makeCounter again creates a new environment, so c2 counts independently of c1. Closures underpin private state, event handlers, memoization and React hooks. A long-lived closure that holds a large object also keeps that memory from being freed.', sClosure()),
    item('js-this', 'this가 정해지는 규칙', 'How this is decided', 'this는 함수를 정의한 곳이 아니라 “어떻게 호출했는지”로 정해져요. 화살표 함수만 예외로 바깥의 this를 써요.', 'obj.hi()처럼 점을 찍어 부르면 this는 점 앞의 obj예요. 같은 함수를 const f = obj.hi로 꺼내 f()로 부르면 점이 없어 this가 undefined(엄격 모드)가 되어 오류가 나요. call·apply·bind로 this를 직접 정할 수 있고, new로 부르면 새로 만든 객체가 this예요. 화살표 함수는 자기 this가 없어 정의된 곳 바깥의 this를 그대로 써요. 우선순위는 new > bind·call > 메서드 호출 > 일반 호출 순이에요.', 'this is set by how a function is called, not where it is defined; arrow functions are the exception and use the outer this.', 'Calling obj.hi() with a dot makes this the object before the dot. Pulling the same function out with const f = obj.hi and calling f() has no dot, so this is undefined in strict mode and the call fails. call, apply and bind set this explicitly, and calling with new makes the newly created object this. Arrow functions have no this of their own and use the one from where they were defined. The precedence is new, then bind or call, then a method call, then a plain call.', sThis()),
    item('js-arrow', '화살표 함수', 'Arrow functions', '(x) => x * 2처럼 짧게 쓰는 함수예요. 자기 this·arguments가 없고 바깥 것을 그대로 써서 콜백에 잘 맞아요.', 'setTimeout에 일반 함수를 넘기면 타이머가 호출하므로 this가 우리 객체가 아니에요. 화살표 함수는 바깥 메서드의 this를 그대로 써서 this.count가 제대로 올라가요. 식 하나면 중괄호와 return을 생략하고, 객체 리터럴을 돌려줄 때는 () => ({ id: 1 })처럼 괄호로 감싸요. new로 생성자를 만들 수 없고 arguments도 없으며, 객체의 메서드로 쓰면 this가 객체가 아니게 돼요. 그런 곳엔 일반 함수나 메서드 문법을 써요.', 'A short function syntax such as (x) => x * 2 that has no this or arguments of its own and borrows the outer ones, which suits callbacks.', 'Passing a regular function to setTimeout means the timer calls it, so this is not our object. An arrow function uses the enclosing method’s this, so this.count increments correctly. A single expression drops the braces and return, and an object literal needs parentheses, as in () => ({ id: 1 }). Arrows cannot be constructors, have no arguments, and as object methods their this is not the object. Use regular functions or method syntax there.', sArrow()),
    item('js-callbind', 'call·apply·bind', 'call, apply and bind', '함수의 this를 직접 정해 주는 세 메서드예요. call·apply는 바로 실행하고, bind는 this를 고정한 새 함수를 만들어요.', 'greet.call(kim, "안녕")은 this를 kim으로 정해 즉시 실행하고, apply는 같은 일을 인자 배열로 받아요(지금은 call과 전개 연산자를 더 많이 써요). bind는 실행하지 않고 this와 앞쪽 인자 일부를 고정한 새 함수를 돌려줘서 부분 적용에도 써요. 클래스 메서드를 이벤트 핸들러로 넘길 때 this.onClick.bind(this)로 this를 지켜요. 한 번 bind한 함수는 다시 bind해도 this가 바뀌지 않아요.', 'Three methods that set a function’s this explicitly: call and apply run it immediately, while bind returns a new function with this fixed.', 'greet.call(kim, "hi") runs the function at once with this set to kim, and apply does the same with an array of arguments (call plus spread is more common today). bind runs nothing; it returns a new function with this and some leading arguments fixed, which also gives partial application. When handing a class method to an event handler, this.onClick.bind(this) keeps this intact. A bound function ignores later attempts to rebind this.', sCallBind()),
    item('js-hof', 'map·filter·reduce', 'map, filter and reduce', '함수를 인자로 받는 고차 함수로 배열을 다루는 대표 3종이에요. 원본은 그대로 두고 새 결과를 만들어요.', '주문 배열에서 filter(o => o.qty > 0)로 수량 있는 주문만 고르고, map(o => o.qty * o.price)로 금액 배열을 만든 뒤, reduce((sum, x) => sum + x, 0)로 하나의 합계로 접어요. filter는 조건이 true인 원소만, map은 같은 길이의 변환 결과를, reduce는 누적값 하나를 돌려줘요. reduce에 초기값을 빼면 빈 배열에서 TypeError가 나니 꼭 넣어요. 반복문보다 의도가 잘 드러나고, 체인으로 이어 쓰기 좋아요.', 'The three classic higher-order functions for arrays; each takes a function and builds a new result without touching the original.', 'From an order list, filter(o => o.qty > 0) keeps orders with quantity, map(o => o.qty * o.price) builds an array of amounts, and reduce((sum, x) => sum + x, 0) folds it into one total. filter returns the elements that pass, map returns a same-length transformed array, and reduce returns a single accumulated value. Omitting reduce’s initial value throws a TypeError on an empty array, so always pass one. They state intent more clearly than loops and chain naturally.', sHof()),
  ]),
  sec('js-obj', '객체', 'Objects', '객체와 자료 구조', 'Objects and data structures', '객체가 속성을 찾는 방식, 클래스, 복사와 직렬화, 그리고 Map·Set·이터러블 같은 내장 자료 구조예요.', 'How objects find properties, classes, copying and serialization, and built-in structures such as Map, Set and iterables.', [
    item('js-proto', '프로토타입 체인', 'The prototype chain', '객체에 없는 속성을 읽으면 [[Prototype]] 링크를 따라 위 객체로 올라가며 찾아요. 자바스크립트 상속의 실체예요.', 'dog.barks는 dog 자신에 있어 바로 찾고, dog.eats는 없으니 프로토타입인 animal로 올라가 찾아요. dog.toString은 계속 올라가 모든 객체의 조상인 Object.prototype에서 찾아요. 끝인 null까지 없으면 undefined예요. 메서드를 프로토타입에 두면 인스턴스 수천 개가 함수 하나를 공유해 메모리를 아껴요. Object.create(proto)로 직접 연결하고, Object.getPrototypeOf로 확인해요.', 'Reading a property an object lacks follows its [[Prototype]] link upward; this chain is how inheritance actually works in JavaScript.', 'dog.barks is found on dog itself, while dog.eats is missing there and is found one level up on its prototype, animal. dog.toString climbs further to Object.prototype, the ancestor of all ordinary objects. If even null at the end is reached, the result is undefined. Putting methods on the prototype lets thousands of instances share one function and saves memory. Object.create(proto) links objects directly, and Object.getPrototypeOf inspects the link.', sProto()),
    item('js-class', '클래스', 'Classes', 'class는 생성자와 메서드를 한데 묶어 쓰는 문법이에요. 내부적으로는 여전히 함수와 프로토타입으로 동작해요.', 'constructor는 new로 객체를 만들 때 실행되고, 메서드는 프로토타입에 한 번만 저장돼요. extends로 프로토타입 체인을 잇고 super로 부모의 생성자와 메서드를 불러요. #으로 시작하는 필드는 클래스 밖에서 절대 접근할 수 없는 진짜 비공개이고, static 멤버는 인스턴스가 아니라 클래스 자체에 붙어요. typeof Dog이 "function"인 것처럼 문법 설탕이지만, 엄격 모드와 new 강제 등 몇 가지 안전장치가 더해져요.', 'class bundles a constructor and methods into one syntax; underneath, it still works through functions and prototypes.', 'The constructor runs when new creates an object, and methods are stored once on the prototype. extends links the prototype chain, and super calls the parent’s constructor and methods. Fields starting with # are truly private and unreachable from outside the class, while static members belong to the class rather than its instances. typeof Dog is "function", so it is syntactic sugar, but it adds safeguards such as strict mode and a required new.', sClass()),
    item('js-copy', '얕은 복사와 깊은 복사', 'Shallow and deep copies', '얕은 복사는 겉 객체만 새로 만들어 안쪽은 공유하고, 깊은 복사는 안쪽까지 전부 새로 만들어요.', 'b = { ...a }로 복사하면 b.name을 바꿔도 a는 그대로지만, b.tags.push("x")는 a.tags도 바꿔요. 안쪽 배열은 같은 것을 가리키기 때문이에요. structuredClone(a)은 Date, Map, Set, 순환 참조까지 안쪽 끝까지 새로 만들어요. JSON.parse(JSON.stringify(a))는 Date를 문자열로 바꾸고 undefined와 함수를 지워 버려서 권하지 않아요. 함수나 클래스 인스턴스의 메서드는 structuredClone으로도 복사되지 않아요.', 'A shallow copy rebuilds only the outer object and shares what is inside; a deep copy rebuilds everything all the way down.', 'After b = { ...a }, changing b.name leaves a alone, but b.tags.push("x") changes a.tags too, because the inner array is shared. structuredClone(a) rebuilds everything, including dates, maps, sets and circular references. JSON.parse(JSON.stringify(a)) turns dates into strings and drops undefined and functions, so it is not recommended. Functions and class methods cannot be copied even by structuredClone.', sCopy()),
    item('js-json', 'JSON 직렬화', 'JSON serialization', 'JSON.stringify는 값을 문자열로, JSON.parse는 문자열을 값으로 바꿔요. 네트워크와 저장소에서 데이터를 주고받는 표준 형식이에요.', 'stringify하면 Date는 ISO 문자열이 되고, 함수와 undefined 속성은 빠지며, NaN은 null이 돼요. parse로 되돌리면 날짜는 그냥 문자열이라 리바이버 함수로 Date 객체로 되살려요. 두 번째 인자 replacer로 필드를 고르거나 바꾸고, 세 번째 인자 2로 사람이 읽기 좋게 들여써요. 자기 자신을 가리키는 객체는 TypeError, BigInt도 그대로는 직렬화되지 않아요. 클래스에 toJSON 메서드를 두면 직렬화 모양을 직접 정할 수 있어요.', 'JSON.stringify turns values into a string and JSON.parse turns a string back into values; JSON is the standard format for data over the network and in storage.', 'stringify turns a Date into an ISO string, drops functions and undefined properties, and turns NaN into null. When parsed, dates come back as plain strings, so a reviver function restores Date objects. The second argument, a replacer, picks or transforms fields, and a third argument of 2 indents the output for humans. Circular objects throw a TypeError, and BigInt does not serialize as is. A toJSON method on a class controls its serialized shape.', sJson()),
    item('js-mapset', 'Map과 Set', 'Map and Set', 'Map은 어떤 값이든 키로 쓰는 키-값 저장소이고, Set은 중복 없는 값의 모음이에요.', '일반 객체의 키는 문자열·심볼뿐이지만 Map은 객체나 함수도 키로 쓰고, 넣은 순서를 지키며 size로 개수를 바로 알려줘요. 자주 넣고 빼는 사전에는 Map이 더 빠르고 안전해요. Set은 같은 값을 한 번만 담고 has로 포함 여부를 빠르게 확인해요. [...new Set(arr)]는 배열의 중복을 없애는 관용구예요. WeakMap·WeakSet은 키를 약하게 잡아서, 키 객체가 다른 곳에서 사라지면 항목도 함께 정리돼요.', 'Map is a key-value store that accepts any value as a key, and Set is a collection of unique values.', 'Plain object keys are only strings and symbols, but a Map accepts objects or functions as keys, keeps insertion order, and reports its size directly. For dictionaries with frequent inserts and deletes, Map is faster and safer. A Set holds each value once and checks membership quickly with has. [...new Set(arr)] is the idiom for removing duplicates. WeakMap and WeakSet hold keys weakly, so entries disappear once their key objects are gone elsewhere.', sMapSet()),
    item('js-iter', '이터러블과 이터레이터', 'Iterables and iterators', '이터러블은 Symbol.iterator로 이터레이터를 돌려주는 객체이고, 이터레이터는 next()마다 { value, done }을 주는 객체예요.', '배열, 문자열, Map, Set, NodeList는 모두 이터러블이라 for…of, 전개 연산자, 구조 분해, Array.from에 쓸 수 있어요. 이터레이터의 next()는 { value: 1, done: false }처럼 값을 하나씩 주다가 done: true로 끝을 알려요. 이 약속만 지키면 직접 만든 범위 객체도 for…of로 돌 수 있어요. 제너레이터 함수(function*)와 yield를 쓰면 이터레이터를 훨씬 짧게 만들어요. 일반 객체는 이터러블이 아니라서 Object.entries로 바꿔 돌아요.', 'An iterable returns an iterator from Symbol.iterator, and an iterator hands out { value, done } on each next() call.', 'Arrays, strings, maps, sets and NodeLists are all iterable, so they work with for…of, spread, destructuring and Array.from. An iterator’s next() returns values one at a time, such as { value: 1, done: false }, and signals the end with done: true. Any object that keeps this protocol, such as a custom range, works with for…of. Generator functions (function*) with yield make iterators much shorter. Plain objects are not iterable, so loop over Object.entries instead.', sIter()),
    item('js-array', '배열 메서드: 바꾸기와 새로 만들기', 'Array methods: mutate or copy', 'sort·reverse·splice·push는 원본 배열을 바꾸고, map·filter·slice·toSorted는 새 배열을 돌려줘요.', '공유하는 배열에 sort를 부르면 그 배열을 쓰는 다른 곳도 함께 바뀌어 버그가 돼요. React 상태처럼 원본을 지켜야 할 땐 ES2023의 toSorted, toReversed, toSpliced, with를 써요. 비교 함수 없는 sort는 원소를 문자열로 바꿔 비교해서 [10, 2, 1]이 [1, 10, 2]로 정렬돼요. 숫자는 (x, y) => x − y, 한국어 문자열은 (a, b) => a.localeCompare(b, "ko")를 넘겨요. 지금의 sort는 같은 값의 순서를 지키는 안정 정렬이에요.', 'sort, reverse, splice and push change the original array, while map, filter, slice and toSorted return new ones.', 'Calling sort on a shared array changes it for everyone else using it, which becomes a bug. When the original must stay intact, as with React state, use ES2023’s toSorted, toReversed, toSpliced and with. sort without a comparator compares elements as strings, so [10, 2, 1] becomes [1, 10, 2]. Pass (x, y) => x − y for numbers and (a, b) => a.localeCompare(b, "ko") for Korean strings. Today’s sort is stable, keeping equal elements in order.', sArrayMut()),
  ]),
  sec('js-concurrency', '비동기', 'Async', '이벤트 루프와 비동기', 'The event loop and async code', '스레드 하나로 기다림을 처리하는 방법이에요. 이벤트 루프, Promise, async/await, 그리고 취소까지 다뤄요.', 'How a single thread handles waiting: the event loop, promises, async/await and cancellation.', [
    item('js-eventloop', '이벤트 루프', 'The event loop', '자바스크립트는 콜 스택 하나로 한 번에 한 가지만 실행해요. 기다리는 일은 브라우저에 맡기고, 끝난 콜백은 큐에서 차례를 기다려요.', 'log("A"), setTimeout(() => log("B"), 0), log("C")를 실행하면 A, C, B 순서로 찍혀요. setTimeout은 타이머를 브라우저(Web API)에 맡기고 바로 끝나서 C가 먼저 실행돼요. 타이머가 끝난 콜백은 태스크 큐에서 기다리다가, 콜 스택이 완전히 비었을 때 이벤트 루프가 스택에 올려요. 그래서 0ms 타이머도 “최소 0ms 뒤”일 뿐이에요. 스택을 오래 붙잡는 계산이 있으면 클릭과 렌더링도 모두 멈춰요.', 'JavaScript runs one thing at a time on a single call stack; waiting is handed to the browser, and finished callbacks wait in a queue.', 'Running log("A"), setTimeout(() => log("B"), 0) and log("C") prints A, C, B. setTimeout hands the timer to the browser’s Web APIs and returns immediately, so C runs first. When the timer fires, the callback waits in the task queue until the call stack is empty, and then the event loop pushes it onto the stack. A 0 ms timer therefore means “no sooner than 0 ms”. Any computation that holds the stack for long freezes clicks and rendering too.', sEventLoop()),
    item('js-microtask', '마이크로태스크와 태스크', 'Microtasks and tasks', '큐는 두 개예요. Promise 콜백은 마이크로태스크 큐로, 타이머·이벤트 콜백은 태스크 큐로 가고, 마이크로태스크가 항상 먼저 다 비워져요.', '1을 찍고, setTimeout으로 2, Promise.then으로 3, queueMicrotask로 4를 예약하고, 5를 찍으면 출력은 1, 5, 3, 4, 2예요. 동기 코드가 끝나 스택이 비면 이벤트 루프는 마이크로태스크 큐를 끝까지 비운 뒤에야 태스크 하나를 꺼내요. 그래서 0ms 타이머보다 Promise가 먼저예요. 마이크로태스크 안에서 계속 새 마이크로태스크를 만들면 태스크와 렌더링이 영영 밀릴 수 있어요. 렌더링은 보통 태스크 사이에 일어나요.', 'There are two queues: promise callbacks go to the microtask queue and timer or event callbacks to the task queue, and microtasks always drain first.', 'Logging 1, scheduling 2 with setTimeout, 3 with Promise.then and 4 with queueMicrotask, then logging 5 prints 1, 5, 3, 4, 2. Once synchronous code ends and the stack is empty, the event loop drains the entire microtask queue before taking a single task. That is why a promise beats a 0 ms timer. Microtasks that keep queuing more microtasks can starve tasks and rendering indefinitely. Rendering normally happens between tasks.', sMicrotask()),
    item('js-promise', 'Promise의 세 상태', 'The three states of a promise', 'Promise는 아직 끝나지 않은 작업의 결과를 대신하는 객체예요. pending에서 fulfilled나 rejected 중 하나로 단 한 번 바뀌어요.', '처음엔 pending이고, resolve되면 fulfilled가 되어 then 콜백이 값을 받아요. then은 새 Promise를 돌려주므로 .then().then()으로 이어 쓰고, 콜백이 돌려준 값이 다음 단계로 넘어가요. reject되거나 중간 then에서 예외가 나면 rejected가 되어 아래쪽 then들은 건너뛰고 catch가 받아요. finally는 성공·실패와 상관없이 로딩 해제 같은 정리 작업을 해요. 한 번 정해진 상태는 다시 바뀌지 않아요.', 'A promise stands in for the result of unfinished work and settles exactly once, from pending to either fulfilled or rejected.', 'It starts pending; once resolved it is fulfilled and then callbacks receive the value. then returns a new promise, so calls chain as .then().then(), with each callback’s return value passed to the next step. A rejection, or an exception inside any then, makes it rejected, skipping later thens until a catch receives it. finally runs cleanup such as clearing a loading flag regardless of the outcome. Once settled, the state never changes.', sPromise()),
    item('js-async', 'async/await', 'async/await', 'async 함수는 항상 Promise를 돌려주고, 그 안의 await는 Promise가 끝날 때까지 그 함수만 잠시 멈춰요. 비동기 코드를 동기 코드처럼 읽게 해 줘요.', 'async function load() { return 1 }은 1이 아니라 Promise<1>을 돌려줘요. await fetch(url)는 응답이 올 때까지 load 함수만 멈추고, 그동안 이벤트 루프는 다른 일을 계속해요. await한 Promise가 reject되면 그 줄에서 예외가 던져져 try/catch로 잡아요. 서로 기다릴 필요 없는 요청 두 개를 차례로 await하면 시간이 두 배라서, Promise.all로 동시에 시작해요. 반복문 안의 await도 같은 이유로 느려질 수 있어요.', 'An async function always returns a promise, and await inside it pauses just that function until a promise settles, so asynchronous code reads like synchronous code.', 'async function load() { return 1 } returns Promise<1>, not 1. await fetch(url) pauses only load until the response arrives while the event loop keeps doing other work. If the awaited promise rejects, that line throws, and try/catch catches it. Awaiting two independent requests one after another doubles the time, so start them together with Promise.all. Awaiting inside a loop can be slow for the same reason.', sAsyncAwait()),
    item('js-promiseall', 'Promise 조합기', 'Promise combinators', '여러 Promise를 하나로 묶는 네 가지 방법이에요. all은 모두 성공, allSettled는 모두 끝, race는 먼저 끝난 것, any는 먼저 성공한 것을 기다려요.', 'Promise.all은 모두 성공하면 결과 배열을 주지만 하나라도 실패하면 그 즉시 실패해요(나머지 작업은 계속 돌지만 결과는 버려요). allSettled는 실패와 상관없이 모두 끝날 때까지 기다려 { status, value 또는 reason } 배열을 줘서 일괄 처리 보고에 좋아요. race는 성공이든 실패든 가장 먼저 끝난 것을 따라가 타임아웃 구현에 쓰여요. any는 가장 먼저 성공한 결과를 주고, 모두 실패해야 AggregateError로 실패해요.', 'Four ways to combine promises: all waits for every success, allSettled for everything to finish, race for the first to settle, and any for the first success.', 'Promise.all yields an array of results when all succeed but fails the moment any one fails (the others keep running, but their results are discarded). allSettled waits for everything regardless of failures and returns { status, value or reason } entries, which suits batch reports. race follows whichever settles first, success or failure, and is used for timeouts. any yields the first success and fails with an AggregateError only if all fail.', sCombinators()),
    item('js-abort', 'AbortController로 취소', 'Cancelling with AbortController', 'AbortController의 signal을 fetch나 리스너에 넘겨 두면, abort() 한 번으로 진행 중인 작업을 취소해요.', '검색창에 빠르게 입력하면 요청이 여러 개 나가고, 늦게 도착한 옛 응답이 최신 결과를 덮어쓰는 경쟁 상태가 생겨요. 새 입력마다 이전 컨트롤러를 abort하면 옛 요청은 AbortError로 끝나 화면을 덮지 않아요. AbortSignal.timeout(5000)은 5초 뒤 저절로 취소되는 signal을 만들어요. addEventListener에 { signal }을 주면 abort 한 번으로 여러 리스너를 함께 해제해요. React의 useEffect 정리 함수에서 abort하는 패턴이 흔해요.', 'Pass an AbortController’s signal to fetch or listeners, and one abort() call cancels the work in progress.', 'Typing quickly into a search box sends several requests, and a stale response that arrives late can overwrite the newest result, a race condition. Aborting the previous controller on each new input ends old requests with an AbortError so they never touch the screen. AbortSignal.timeout(5000) creates a signal that cancels itself after five seconds. Passing { signal } to addEventListener lets one abort remove many listeners at once. Aborting in a React useEffect cleanup function is a common pattern.', sAbort()),
  ]),
  sec('js-runtime', '런타임', 'Runtime', '모듈, 브라우저, 런타임', 'Modules, the browser and the runtime', '코드를 파일로 나누는 법, 브라우저 이벤트와 네트워크, 오류 처리, 숫자와 메모리, 그리고 스레드까지예요.', 'Splitting code into files, browser events and the network, error handling, numbers and memory, and threads.', [
    item('js-modules', 'ES 모듈과 CommonJS', 'ES modules and CommonJS', 'ES 모듈은 import·export로 파일 사이의 의존을 선언하는 표준이에요. Node.js의 옛 방식인 CommonJS는 require로 실행 중에 불러와요.', 'export로 내보낸 것만 다른 파일에서 import할 수 있고, 파일 하나가 자기만의 스코프를 가져요. import는 파일 맨 위에서 정적으로 선언되어, 번들러가 실행 전에 의존 관계를 읽고 안 쓰는 코드를 빼는 트리 셰이킹이 가능해요. require는 실행 중에 동기로 불러오는 CommonJS 방식이고, package.json에 "type": "module"을 주면 Node.js도 ESM으로 동작해요. import()는 필요한 순간에 모듈을 불러와 Promise로 돌려줘 코드 스플리팅에 써요. 모듈은 한 번만 실행되고 캐시돼요.', 'ES modules are the standard way to declare dependencies between files with import and export; CommonJS, Node.js’s older system, loads with require at run time.', 'Only what a file exports can be imported elsewhere, and each file has its own scope. import is declared statically at the top, so bundlers read the dependency graph before running and drop unused code, which is tree shaking. require is CommonJS’s synchronous run-time loader, and "type": "module" in package.json switches Node.js to ESM. import() loads a module when needed and returns a promise, enabling code splitting. A module runs once and is cached.', sModules()),
    item('js-delegation', '이벤트 위임', 'Event delegation', '자식마다 리스너를 다는 대신 공통 부모에 하나만 달아, 버블링으로 올라온 이벤트를 처리하는 방법이에요.', '목록의 ✕ 버튼을 누르면 클릭 이벤트가 버튼 → li → ul → document로 차례로 올라가요(버블링). 그래서 ul에 리스너 하나만 달고, e.target.closest("li")로 어느 항목인지 찾아 data-id로 대상을 지워요. 리스너 수가 줄어 메모리를 아끼고, 나중에 추가된 항목도 따로 연결할 필요가 없어요. stopPropagation은 위로 올라가는 것을, preventDefault는 링크 이동 같은 기본 동작을 막는데 꼭 필요할 때만 써요. focus처럼 버블링하지 않는 이벤트는 focusin을 써요.', 'Instead of a listener on every child, one listener on a common parent handles the events that bubble up to it.', 'Clicking a ✕ button in a list sends the click up through button, li, ul and document, which is bubbling. So one listener on ul suffices: e.target.closest("li") finds the item and its data-id identifies what to remove. Fewer listeners save memory, and items added later need no extra wiring. stopPropagation halts bubbling and preventDefault blocks defaults such as following a link; use them only when needed. For non-bubbling events such as focus, use focusin.', sDelegation()),
    item('js-fetch', 'fetch로 HTTP 요청', 'HTTP requests with fetch', 'fetch는 Promise 기반의 표준 HTTP API예요. 404·500 응답에도 reject하지 않으니 res.ok를 직접 확인해야 해요.', 'POST 요청은 method, headers, body 옵션을 주고, 본문은 JSON.stringify로 문자열로 만들어요. 서버가 404나 500을 돌려줘도 fetch는 성공으로 끝나고, 네트워크가 끊겼을 때만 reject해요. 그래서 if (!res.ok) throw로 직접 실패를 처리해요. 본문은 await res.json()으로 한 번 더 기다려 읽고, 같은 본문은 두 번 읽을 수 없어요. 다른 출처로 보내면 CORS 규칙이 적용되고 쿠키를 보내려면 credentials: "include"가 필요해요. 기본 타임아웃이 없으니 AbortSignal.timeout을 함께 써요.', 'fetch is the standard promise-based HTTP API; it does not reject on 404 or 500 responses, so you must check res.ok yourself.', 'A POST passes method, headers and body options, with the body turned into a string by JSON.stringify. Even if the server returns 404 or 500, fetch resolves; it rejects only when the network fails. So handle failures explicitly with if (!res.ok) throw. The body is read with another await, res.json(), and can be read only once. Cross-origin requests follow CORS, and sending cookies needs credentials: "include". There is no default timeout, so pair it with AbortSignal.timeout.', sFetch()),
    item('js-errors', '에러 처리', 'Error handling', 'try·catch·finally로 실패를 잡고, Error를 상속해 종류를 구분하며, 처리되지 않은 Promise 실패는 전역 이벤트로 모아요.', 'try 안에서 예외가 나면 catch로 넘어가고, 처리할 수 없는 종류는 throw e로 다시 던져요. finally는 성공·실패·return과 상관없이 항상 실행돼 로딩 해제 같은 정리에 좋아요. class InputError extends Error로 오류 종류를 나누고 { cause: e }로 원래 오류를 연결하면 디버깅이 쉬워요. await 없이 버려진 Promise의 실패는 try/catch에 잡히지 않고 unhandledrejection 이벤트로만 나타나요. 빈 catch로 오류를 삼키지 말고, API 호출부나 화면 단위 같은 경계에서 모아 처리해요.', 'Catch failures with try, catch and finally, classify them by extending Error, and collect unhandled promise rejections through a global event.', 'An exception inside try jumps to catch, and kinds you cannot handle are rethrown with throw e. finally always runs, after success, failure or a return, which suits cleanup such as clearing a loading flag. class InputError extends Error classifies failures, and { cause: e } links the original error for easier debugging. A failing promise that nobody awaits escapes try/catch and surfaces only as an unhandledrejection event. Do not swallow errors with empty catches; handle them at boundaries such as API calls or screens.', sErrors()),
    item('js-number', '숫자의 함정', 'Number pitfalls', '자바스크립트의 number는 모두 64비트 부동소수점이에요. 그래서 0.1 + 0.2가 0.3이 아니고, 2^53보다 큰 정수는 정확하지 않아요.', '0.1은 2진수로 딱 떨어지지 않아 0.1 + 0.2는 0.30000000000000004가 되고, 같음 비교는 Number.EPSILON 같은 오차 범위로 해요. Number.MAX_SAFE_INTEGER(2^53 − 1)를 넘으면 2 ** 53 + 1이 2 ** 53과 같아질 만큼 정수도 부정확해서, DB의 64비트 ID는 문자열로 받아요. 큰 정수는 끝에 n을 붙인 BigInt로 다루지만 number와 섞어 계산할 수는 없어요. 금액은 원·센트 단위 정수로 계산하고 Intl.NumberFormat으로 표시해요. NaN은 Number.isNaN으로 검사해요.', 'Every JavaScript number is a 64-bit float, so 0.1 + 0.2 is not 0.3 and integers beyond 2^53 lose precision.', '0.1 has no exact binary form, so 0.1 + 0.2 gives 0.30000000000000004, and equality checks need a tolerance such as Number.EPSILON. Beyond Number.MAX_SAFE_INTEGER (2^53 − 1), even integers blur, so 2 ** 53 + 1 equals 2 ** 53; receive 64-bit database IDs as strings. Large integers use BigInt with a trailing n, which cannot mix with numbers in arithmetic. Compute money in integer units such as won or cents and display it with Intl.NumberFormat. Test for NaN with Number.isNaN.', sNumber()),
    item('js-gc', '가비지 컬렉션과 메모리 누수', 'Garbage collection and memory leaks', '가비지 컬렉터는 루트(전역·실행 중인 변수)에서 닿지 않는 객체를 자동으로 치워요. 누수는 안 쓰는데도 여전히 닿는 객체예요.', '마크 앤 스윕은 루트에서 출발해 닿는 객체에 표시하고, 표시되지 않은 객체를 치워요. 서로를 가리키는 두 객체라도 루트에서 닿지 않으면 함께 정리돼요. 멈추지 않은 setInterval, 떼지 않은 이벤트 리스너, 끝없이 커지는 캐시는 안 쓰는 객체를 계속 붙잡아 누수가 돼요. clearInterval, abort, removeEventListener로 해제하고, 객체에 덧붙일 정보는 WeakMap에 둬요. DevTools의 Memory 탭에서 힙 스냅숏을 비교하면 늘어나기만 하는 객체를 찾을 수 있어요.', 'The garbage collector automatically removes objects unreachable from the roots (globals and live variables); a leak is an object that is unused yet still reachable.', 'Mark-and-sweep starts at the roots, marks every reachable object and sweeps the rest. Two objects that reference each other are still collected if no root reaches them. An uncleared setInterval, a listener never removed or a cache that only grows keeps unused objects alive, which is a leak. Release them with clearInterval, abort or removeEventListener, and keep side data about objects in a WeakMap. Comparing heap snapshots in the DevTools Memory panel reveals objects that only grow.', sGc()),
    item('js-worker', '웹 워커', 'Web workers', '웹 워커는 무거운 계산을 메인 스레드와 별도의 스레드에서 돌려 화면이 멈추지 않게 해요. 둘은 postMessage로만 대화해요.', '메인 스레드에서 2초짜리 해시 계산을 돌리면 그동안 클릭, 스크롤, 렌더링이 모두 멈춰요. new Worker("hash.js")로 워커를 만들어 데이터를 postMessage로 보내면, 워커가 계산하고 결과를 다시 postMessage로 돌려줘요. 데이터는 복사되어 전달되고, 큰 ArrayBuffer는 transfer로 소유권을 넘겨 복사 비용을 없애요. 워커는 DOM에 접근할 수 없어 계산·파싱·압축·이미지 처리를 맡아요. Node.js에는 worker_threads가 있어요.', 'A web worker runs heavy computation on a thread separate from the main thread so the page stays responsive; the two talk only through postMessage.', 'Running a two-second hash on the main thread freezes clicks, scrolling and rendering for those two seconds. Creating new Worker("hash.js") and sending it data with postMessage lets the worker compute and post the result back. Data is copied across, while a large ArrayBuffer can be transferred to avoid the copy. Workers cannot touch the DOM, so they take on computing, parsing, compression and image processing. Node.js offers worker_threads.', sWorker()),
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
