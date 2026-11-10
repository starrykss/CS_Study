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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'emx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono emx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono emx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c emx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono emx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c emx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'emx-s emx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono emx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono emx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono emx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono emx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono emx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'emx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'emx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'emx-xs emx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono emx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'emx-a', g: 'emx-g', r: 'emx-r', w: 'emx-w', m: 'cz-mono', s: 'emx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'emx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono emx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono emx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'emx-xs ') + clsOf(c) + (o.w ? ' emx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.emx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.emx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.emx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.emx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.emx-r .in{color:var(--danger);font-weight:800}
.emx-g .in{color:var(--ok);font-weight:800}
.emx-a .in{color:var(--accent);font-weight:800}
.emx-w .in{color:var(--warn);font-weight:800}
.emx-c .in{font-size:.6em;font-weight:700}
.emx-c2 .in{font-size:.5em;font-weight:700}
.emx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.emx-wr .in{white-space:normal!important}
.emx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.emx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Embedded systems · 1. basics, 2. I/O and peripherals ===== */
const CSSY = '';
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* digital waveform from a bit string: '1' high, '0' low */
const wave = (S, k, x, y, w, h, bits, st, o = {}) => { const n = bits.length, dx = w / n, c = o.color || 'accent', hh = o.h || .09; let prev = null; [...bits].forEach((b, i) => { const yy = b === '1' ? y : y + h; if (prev !== null && prev !== b) seg(S, k + 'v' + i, [x + i * dx, y], [x + i * dx, y + h], st, c, hh, { off: o.off }); seg(S, k + 'h' + i, [x + i * dx, yy], [x + (i + 1) * dx, yy], st, c, hh, { off: o.off }); prev = b; }); };
const W = s => s.replace(/-/g, '');

function sMcu() {
  return CW('em-mcu', {
    draw: (S) => {
      tbox(S, 'mc', 1, .8, 14.6, 6.6, ['MCU (마이크로컨트롤러)', 'MCU (microcontroller)'], 'accent', 1, { tc: 'a' });
      nd(S, 'mc1', 1.5, 2.1, 6.6, 'Cortex-M4 168MHz', 'accent', 1, { pct: 22 });
      nd(S, 'mc2', 8.6, 2.1, 6.5, 'Flash 512KB', 'warn', 1, { pct: 20 }); nd(S, 'mc3', 8.6, 3.5, 6.5, 'SRAM 128KB', 'warn', 1, { pct: 20 });
      ['GPIO', 'UART', 'ADC', 'TIM', 'SPI', 'I2C'].forEach((t, i) => nd(S, 'mp' + i, 1.5 + (i % 3) * 2.3, 3.5 + (i >> 1 >> 0 > 2 ? 0 : 0) + Math.floor(i / 3) * 1.4, 2.1, t, 'ok', 1, { pct: 16 }));
      lbl(S, 'mcn', 1.4, 6.3, ['모든 게 칩 하나에 · 펌웨어를 바로 실행', 'everything on one chip, running firmware directly'], '', 1, { w: 14 });
      tbox(S, 'mpu', 16.8, .8, 14.6, 4.6, ['MPU · SoC (응용 프로세서)', 'MPU · SoC (application processor)'], 'warn', 2, { tc: 'w' });
      nd(S, 'pu1', 17.3, 2.1, 6.6, 'Cortex-A76 ×4', 'warn', 2, { pct: 22 }); nd(S, 'pu2', 24.4, 2.1, 6.6, 'MMU · 캐시', 'warn', 2, { pct: 14 });
      nd(S, 'pu3', 17.3, 3.5, 13.7, ['GPU · 디스플레이 · USB · PCIe', 'GPU · display · USB · PCIe'], 'line', 2);
      nd(S, 'ex1', 17.3, 6.2, 6.6, 'DRAM 4GB', 'line', 2); nd(S, 'ex2', 24.4, 6.2, 6.6, 'eMMC / SD', 'line', 2);
      vl(S, 'el1', 20.6, 5.45, 6.15, 'ink-3', 2, { w: .1 }); vl(S, 'el2', 27.7, 5.45, 6.15, 'ink-3', 2, { w: .1 });
      lines(S, 'cm', 1, 8.6, [[['항목            MCU            MPU', 'item            MCU            MPU'], 'm a'], [['클럭            수십~수백 MHz  GHz', 'clock           10s–100s MHz   GHz'], 'm'], [['메모리          KB~MB          GB', 'memory          KB–MB          GB'], 'm'], [['부팅            ms             수 초', 'boot time       ms             seconds'], 'm'], [['대기 전력       µA             수백 mW', 'idle power      µA             100s of mW'], 'm'], [['OS              없음·RTOS       리눅스', 'OS              none or RTOS   Linux'], 'm']], 3, 0);
      lbl(S, 'ex', 16.8, 8.6, ['MCU: STM32, ESP32, nRF52, RP2040', 'MCU: STM32, ESP32, nRF52, RP2040'], 'a', 4, { w: 14.6 });
      lbl(S, 'ex2b', 16.8, 9.8, ['MPU: 라즈베리 파이, 스마트폰, 공유기', 'MPU: Raspberry Pi, phones, routers'], 'w', 4, { w: 14.6 });
      lbl(S, 'ex3', 16.8, 11.0, ['실시간 제어·저전력 → MCU · 화면·네트워크·리눅스 앱 → MPU', 'hard timing and low power → MCU; screens, networking and Linux apps → MPU'], 'g', 4, { w: 14.6 });
    },
    notes: [['MCU는 CPU, 플래시, RAM, 주변장치를 칩 하나에 담아요 · 전원을 넣으면 플래시의 펌웨어가 바로 실행돼요', 'an MCU packs CPU, flash, RAM and peripherals onto one chip, running firmware from flash the moment power arrives'], ['MPU(응용 프로세서)는 빠른 코어와 MMU를 갖고, 메모리와 저장소는 칩 밖에 붙여요 · 보통 리눅스를 올려요', 'an MPU (application processor) has fast cores and an MMU, with memory and storage outside the chip, and usually runs Linux'], ['MCU는 느리고 메모리가 작지만 ms 단위로 부팅하고 µA 수준으로 잠들어요 · 동작 시간도 예측하기 쉬워요', 'an MCU is slower with less memory, but boots in milliseconds, sleeps at microamps and has predictable timing'], ['모터 제어나 센서 노드처럼 시간이 중요하고 배터리로 도는 곳은 MCU, 화면과 네트워크가 많은 곳은 MPU를 골라요', 'pick an MCU for timing-critical, battery-powered jobs like motor control and sensor nodes, an MPU for screens and heavy networking']],
    fin: [['MCU vs MPU: 칩 하나로 끝나는 실시간 제어기와, 외부 메모리를 붙인 범용 컴퓨터', 'MCU vs MPU: a self-contained real-time controller vs a general computer with external memory', 'emx-xs emx-a'], ['둘을 함께 쓰는 제품도 많아요 (리눅스 + 보조 MCU)', 'many products pair them: Linux plus a helper MCU'], ['ESP32처럼 무선까지 품은 MCU도 흔해요', 'MCUs with built-in radios, like the ESP32, are common']],
    caps: [['MCU', 'MCU'], ['MPU · SoC', 'MPU · SoC'], ['비교', 'Comparison'], ['어떤 걸 고를까', 'Which to choose'], ['MCU와 MPU', 'MCU vs MPU']]
  });
}

function sMemmap() {
  const X = 18.7;
  const MAP = [['0xE000_0000', ['코어: NVIC', 'core: NVIC'], 'line'], ['0x4000_0000', ['주변장치', 'peripherals'], 'ok'], ['0x2000_0000', 'SRAM', 'warn'], ['0x0800_0000', 'Flash', 'accent']];
  return CW('em-memmap', {
    code: ['volatile uint32_t *odr =', '    (volatile uint32_t *)0x40020014;', ['// GPIOA 출력 레지스터(ODR)', '// GPIOA output data register (ODR)'], ['*odr |=  (1u << 5);   // PA5 = 1, LED 켜기', '*odr |=  (1u << 5);   // PA5 = 1, LED on'], '*odr &= ~(1u << 5);   // PA5 = 0', ['GPIOA->BSRR = 1u << 5;   // 원자적 set', 'GPIOA->BSRR = 1u << 5;   // atomic set']],
    hl: [[0, 3], [2, 1, 'warn'], [3, 2, 'ok'], [5, 1, 'accent']],
    draw: (S) => {
      MAP.forEach(([a, t, c], i) => { rect(S, 'mr' + i, X + .2, .8 + i * 1.5, 7.2, 1.3, c, 18, 1, { cls: 'cz-c emx-c', html: t }); T(S, 'ma' + i, X + 7.6, 1.15 + i * 1.5, a, 'cz-mono emx-xs', 1); });
      lbl(S, 'n1', X, 7.0, ['주소 공간 하나에 메모리와 장치가 함께 놓여요', 'memory and devices share one address space'], '', 1, { off: 2, w: 12.7 });
      lines(S, 'rg', X, 7.0, [[['GPIOA = 0x4002_0000', 'GPIOA = 0x4002_0000'], 'm a'], [['+0x00  MODER  모드', '+0x00  MODER  mode'], 'm'], [['+0x10  IDR    입력', '+0x10  IDR    input'], 'm'], [['+0x14  ODR    출력', '+0x14  ODR    output'], 'm w'], [['+0x18  BSRR   set/reset', '+0x18  BSRR   set/reset'], 'm']], 2, 0);
      [...Array(16)].forEach((_, i) => { const b = 15 - i; rect(S, 'bt' + i, X + .1 + i * .78, 12.7, .7, .9, b === 5 ? 'ok' : 'line', b === 5 ? 34 : 8, 3, { cls: 'cz-c emx-c2', html: b === 5 ? '1' : '0' }); });
      lbl(S, 'b5', X + .1 + 10 * .78 - .3, 13.7, ['비트 5 → PA5 핀', 'bit 5 → pin PA5'], 'g', 3);
      lbl(S, 'n4', 1, 8.8, ['|=는 읽고-바꾸고-쓰기라 중간에 인터럽트가 끼면 다른 비트를 덮어쓸 수 있어요 · BSRR은 쓰기 한 번으로 해당 비트만 바꿔요', '|= is read-modify-write, so an interrupt in between can clobber other bits; BSRR changes only the chosen bit in a single write'], '', 4, { w: 16.5 });
    },
    notes: [['MCU는 메모리 맵 I/O를 써요 · 플래시, RAM, 주변장치 레지스터가 모두 하나의 주소 공간에 있어요', 'MCUs use memory-mapped I/O: flash, RAM and peripheral registers all sit in one address space'], ['GPIOA 같은 장치는 정해진 주소부터 레지스터가 늘어서 있어요 · 출력 레지스터 ODR은 0x4002_0014예요', 'a device like GPIOA has registers laid out from a base address, with the output register ODR at 0x4002_0014'], ['그 주소에 값을 쓰면 핀 전압이 바뀌어요 · 비트 5를 1로 쓰면 PA5에 연결된 LED가 켜져요', 'writing to that address changes the pin voltage: setting bit 5 lights the LED on PA5'], ['volatile은 컴파일러가 접근을 생략하거나 합치지 못하게 해요 · 비트 하나만 바꿀 땐 BSRR처럼 원자적 레지스터가 안전해요', 'volatile stops the compiler from skipping or merging accesses, and atomic registers like BSRR are safer for single-bit changes']],
    fin: [['메모리 맵 I/O: 장치 제어 = 정해진 주소에 읽고 쓰기', 'memory-mapped I/O: controlling a device means reading and writing fixed addresses', 'emx-xs emx-a'], ['주소와 비트 의미는 칩의 레퍼런스 매뉴얼에 있어요', 'addresses and bit meanings live in the chip’s reference manual'], ['보통은 벤더 헤더의 GPIOA->ODR 같은 구조체로 접근해요', 'vendor headers expose them as structs like GPIOA->ODR']],
    caps: [['메모리 맵', 'The memory map'], ['레지스터 블록', 'A register block'], ['비트 하나 = 핀 하나', 'One bit, one pin'], ['원자적 쓰기', 'Atomic writes'], ['메모리 맵과 레지스터', 'Memory map and registers']]
  });
}

function sBoot() {
  const X = 18.7;
  return CW('em-boot', {
    code: ['void Reset_Handler(void) {', '    uint32_t *s = &_sidata, *d = &_sdata;', '    while (d < &_edata) *d++ = *s++; // .data', '    d = &_sbss;', '    while (d < &_ebss) *d++ = 0;     // .bss', ['    SystemInit();                    // 클럭', '    SystemInit();                    // clocks'], '    main();', '}'],
    hl: [[0, 1], [1, 2, 'warn'], [3, 2, 'ok'], [5, 2, 'accent']],
    draw: (S) => {
      lines(S, 'vt', X, .8, [[['벡터 테이블 (Flash 맨 앞)', 'vector table (start of flash)'], 'a'], ['0x00  초기 SP = 0x2002_0000', 'm'], ['0x04  Reset_Handler', 'm w'], ['0x08  NMI_Handler', 'm'], ['0x0C  HardFault_Handler', 'm']], 1, 2);
      tbox(S, 'fl', X + .2, .8, 5.8, 6.4, 'Flash', 'accent', 2, { tc: 'a' });
      [['.text', 'accent'], ['.rodata', 'accent'], ['.data 초깃값', 'warn']].forEach(([t, c], i) => nd(S, 'f' + i, X + .5, 2.0 + i * 1.5, 5.2, i === 2 ? ['.data 초깃값', '.data init'] : t, c, 2, { pct: 18 }));
      tbox(S, 'rm', X + 6.6, .8, 5.8, 6.4, 'RAM', 'warn', 2, { tc: 'w' });
      nd(S, 'r0', X + 6.9, 2.0, 5.2, '.data', 'warn', 2, { pct: 22 });
      nd(S, 'r1', X + 6.9, 3.5, 5.2, '.bss', 'line', 2);
      nd(S, 'r1z', X + 6.9, 3.5, 5.2, '.bss = 0', 'ok', 3, { pct: 26 });
      nd(S, 'r2', X + 6.9, 5.0, 5.2, ['힙 · 스택', 'heap · stack'], 'line', 2);
      arw(S, 'cp', [X + 5.75, 5.55], [X + 6.85, 2.55], 2, { color: 'warn' });
      lbl(S, 'n2', X, 7.6, ['.data의 초깃값을 Flash에서 RAM으로 복사', 'copy .data initial values from flash to RAM'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 7.6, ['.bss(초깃값 없는 전역 변수)를 0으로', 'zero .bss, the uninitialized globals'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'tl', X, 7.6, [[['SystemInit: PLL로 16 → 168 MHz', 'SystemInit: PLL takes 16 → 168 MHz'], 'a'], [['그다음에야 main() 호출', 'only then is main() called'], ''], [['전원부터 main까지 보통 수 ms', 'power-on to main: a few ms'], 'g']], 4, 0);
    },
    notes: [['리셋되면 CPU는 벡터 테이블의 첫 두 워드를 읽어요 · 0번지 값으로 스택 포인터를, 4번지 값으로 Reset_Handler 주소를 정해요', 'on reset the CPU reads the first two words of the vector table: the initial stack pointer, then the address of Reset_Handler'], ['초깃값이 있는 전역 변수(.data)는 Flash에 저장돼 있다가 RAM으로 복사돼요', 'initialized globals (.data) are stored in flash and copied into RAM'], ['초깃값이 없는 전역 변수(.bss)는 RAM에서 0으로 채워요 · C 언어가 약속한 동작이에요', 'uninitialized globals (.bss) are zero-filled in RAM, as the C language promises'], ['SystemInit이 클럭을 설정하고 나서야 main()이 불려요 · 이 부분을 시작 코드(startup code)라고 해요', 'SystemInit configures the clocks before main() runs; together this is the startup code']],
    fin: [['부팅: 벡터 테이블 → Reset_Handler → .data 복사·.bss 초기화 → 클럭 → main', 'boot: vector table → Reset_Handler → copy .data, zero .bss → clocks → main', 'emx-xs emx-a'], ['main 전에 일어나는 일이라 디버거로 따라가 봐야 보여요', 'it all happens before main, visible only in a debugger'], ['C++이면 전역 생성자 호출도 여기서 해요', 'in C++ global constructors run here too']],
    caps: [['벡터 테이블', 'The vector table'], ['.data 복사', 'Copying .data'], ['.bss 초기화', 'Zeroing .bss'], ['클럭과 main', 'Clocks, then main'], ['리셋에서 main까지', 'From reset to main']]
  });
}

function sToolchain() {
  const X = 18.7;
  const P = [['main.c', 'line'], ['arm-none-eabi-gcc', 'accent'], ['main.o', 'line'], [['ld + 링커 스크립트', 'ld + linker script'], 'warn'], ['firmware.elf', 'line'], ['objcopy → .bin', 'accent'], [['SWD로 굽기', 'flash via SWD'], 'ok']];
  return CW('em-toolchain', {
    code: ['MEMORY {', '  FLASH : ORIGIN = 0x08000000, LENGTH = 512K', '  RAM   : ORIGIN = 0x20000000, LENGTH = 128K', '}', 'SECTIONS {', '  .text : { *(.isr_vector) *(.text*) } > FLASH', '  .data : { *(.data*) } > RAM AT > FLASH', '  .bss  : { *(.bss*) } > RAM', '}'],
    hl: [[5, 1], [0, 4, 'warn'], [6, 1, 'ok'], [5, 3, 'accent']],
    draw: (S) => {
      P.forEach(([t, c], i) => { const st = i < 3 ? 1 : i < 5 ? 2 : 4; nd(S, 'p' + i, X + .2, .7 + i * 1.6, 7.6, t, c, st, { pct: c === 'line' ? 8 : 20 }); if (i) arw(S, 'pa' + i, [X + 4.0, .7 + i * 1.6 - .45], [X + 4.0, .7 + i * 1.6 - .05], st); });
      lbl(S, 'n1', X + 8.2, .9, ['PC(x86)에서 ARM용 코드 생성 = 크로스 컴파일', 'build ARM code on an x86 PC: cross-compiling'], 'a', 1, { w: 4.5 });
      lbl(S, 'n2', X + 8.2, 5.7, ['섹션을 어느 주소에 놓을지 정해요', 'decides which address each section lands at'], 'w', 2, { w: 4.5 });
      lines(S, 'sz', 1, 11.0, [['$ arm-none-eabi-size firmware.elf', 'm'], ['   text   data    bss    dec', 'm'], ['  14260    312   4096  18668', 'm a']], 3, 0);
      lbl(S, 'n3', 1, 14.4, ['Flash 사용 = text + data · RAM 사용 = data + bss', 'flash used = text + data; RAM used = data + bss'], 'g', 3, { w: 16.5 });
      lbl(S, 'n4', X + 8.2, 10.6, ['ST-LINK·J-Link 프로브로 Flash에 써요', 'an ST-LINK or J-Link probe writes the flash'], 'g', 4, { w: 4.5 });
    },
    notes: [['개발 PC와 다른 CPU용 코드를 만드는 크로스 컴파일러를 써요 · arm-none-eabi-gcc는 OS 없는 ARM용이에요', 'a cross compiler builds code for a different CPU than the PC; arm-none-eabi-gcc targets bare-metal ARM'], ['링커 스크립트가 Flash와 RAM의 주소와 크기를 알려 주고, 각 섹션을 어디에 둘지 정해요', 'the linker script describes flash and RAM addresses and sizes and places each section'], ['.data는 RAM에서 쓰지만 초깃값은 Flash에 두는 AT > FLASH가 핵심이에요 · size 명령으로 Flash와 RAM 사용량을 봐요', 'the key is .data living in RAM with its initial values stored in flash (AT > FLASH); the size tool reports flash and RAM use'], ['objcopy로 순수 바이너리를 뽑아 디버그 프로브로 Flash에 써요 · ELF는 디버깅용 심볼을 담고 있어요', 'objcopy extracts a raw binary that a debug probe writes to flash, while the ELF keeps symbols for debugging']],
    fin: [['툴체인: 크로스 컴파일 → 링커 스크립트로 배치 → 바이너리 → 굽기', 'toolchain: cross-compile → place with a linker script → binary → flash', 'emx-xs emx-a'], ['-Os로 크기, -O2로 속도를 우선해요', '-Os favors size, -O2 favors speed'], ['맵 파일(.map)로 무엇이 공간을 먹는지 확인해요', 'the .map file shows what eats the space']],
    caps: [['크로스 컴파일', 'Cross-compiling'], ['링커 스크립트', 'The linker script'], ['크기 확인', 'Checking the size'], ['굽기', 'Flashing'], ['툴체인과 링커', 'Toolchain and linker']]
  });
}

function sSuperloop() {
  const X = 18.7, s = .22, y0 = 2.0;
  const seq = [['read', 2, 'accent'], ['ctl', 1, 'ok'], ['disp', 30, 'warn'], ['read', 2, 'accent'], ['ctl', 1, 'ok'], ['disp', 20, 'warn']];
  let t = 0; const bars = seq.map(([n, d, c]) => { const b = [t, d, c, n]; t += d; return b; });
  return CW('em-superloop', {
    code: ['int main(void) {', '    init();', '    while (1) {', '        read_sensors();     // 2 ms', '        update_control();   // 1 ms', ['        refresh_display();  // 30 ms ← 느림', '        refresh_display();  // 30 ms ← slow'], '    }', '}'],
    hl: [[2, 4], [5, 1, 'warn'], [3, 1, 'danger'], [2, 5, 'ok']],
    draw: (S) => {
      hl(S, 'ax', X + .2, 31.2, y0 + 1.25, 'ink-3', 1, { w: .06 });
      bars.forEach(([t0, d, c, n], i) => rect(S, 'b' + i, X + .2 + t0 * s, y0, Math.max(d * s, .2), 1.1, c, 40, 1, { r: .1 }));
      lbl(S, 'lg', X, .6, ['읽기 2 ms · 제어 1 ms · 화면 30 ms', 'read 2 ms · control 1 ms · display 30 ms'], '', 1, { w: 12.7 });
      lbl(S, 'n1', X, 4.0, ['한 바퀴 33 ms를 계속 반복해요', 'one 33 ms lap, over and over'], '', 1, { off: 2, w: 12.7 });
      const ev = X + .2 + 6 * s;
      arw(S, 'ev', [ev, 4.6], [ev, 3.3], 2, { color: 'danger' });
      lbl(S, 'evl', ev - .5, 4.7, ['버튼 눌림!', 'button!'], 'r', 2);
      seg(S, 'wt', [ev, 3.6], [X + .2 + 33 * s, 3.6], 2, 'danger', .12);
      lbl(S, 'n2', X, 6.0, ['화면을 그리는 중이면 다음 read까지 최대 30 ms 넘게 기다려요', 'during the display refresh it waits up to 30+ ms for the next read'], 'r', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 6.0, ['최악 응답 시간 = 루프 한 바퀴 · 느린 작업 하나가 모두를 늦춰요', 'worst-case response = one full lap; one slow job delays everyone'], 'w', 3, { off: 4, w: 12.7 });
      lines(S, 'fx', X, 6.0, [[['느린 일은 상태 머신으로 잘게 쪼개기', 'split slow work into state-machine steps'], 'g emx-wr', { lh: 1.7 }], [['급한 이벤트는 인터럽트로', 'handle urgent events in interrupts'], 'g emx-wr', { lh: 1.7 }], [['작업이 많아지면 RTOS로', 'move to an RTOS as tasks multiply'], 'g emx-wr', { lh: 1.7 }]], 4, 0, { w: 12.7 });
    },
    notes: [['OS 없는 펌웨어는 보통 초기화 후 무한 루프 안에서 할 일을 차례로 불러요 · 이걸 슈퍼 루프라고 해요', 'firmware without an OS usually initializes, then calls each job in turn inside an endless loop: the superloop'], ['버튼이 화면 갱신 도중에 눌리면 루프가 돌아올 때까지 아무도 확인하지 않아요', 'if the button is pressed mid-refresh, nobody looks until the loop comes back around'], ['응답 시간은 루프에서 가장 느린 작업에 끌려가요 · 기능이 늘수록 타이밍을 예측하기 어려워져요', 'response time is dragged down by the slowest job, and timing grows harder to predict as features pile up'], ['긴 작업은 조금씩 나눠 상태 머신으로 만들고, 급한 일은 인터럽트에 맡기고, 복잡해지면 RTOS로 넘어가요', 'break long jobs into state-machine steps, give urgent work to interrupts, and move to an RTOS when it gets complex']],
    fin: [['슈퍼 루프: 단순하고 예측 쉬운 구조, 단 가장 느린 작업이 응답 시간을 정해요', 'superloop: simple and predictable, but the slowest job sets the response time', 'emx-xs emx-a'], ['작은 장치의 대부분이 이 구조예요', 'most small devices are built this way'], ['delay()로 기다리는 코드는 루프 전체를 멈춰요', 'busy-waiting with delay() stalls the whole loop']],
    caps: [['무한 루프', 'The endless loop'], ['이벤트가 기다려요', 'An event waits'], ['최악 응답 시간', 'Worst-case response'], ['개선 방법', 'Ways out'], ['슈퍼 루프', 'The superloop']]
  });
}

function sGpio() {
  const X = 18.7;
  return CW('em-gpio', {
    code: [['GPIOA->MODER |= 1u << 10;    // PA5 출력', 'GPIOA->MODER |= 1u << 10;    // PA5 output'], ['GPIOC->PUPDR |= 1u << 26;    // PC13 풀업', 'GPIOC->PUPDR |= 1u << 26;    // PC13 pull-up'], ['if (!(GPIOC->IDR & 1u << 13))  // 눌림 = 0', 'if (!(GPIOC->IDR & 1u << 13))  // pressed = 0'], ['    GPIOA->BSRR = 1u << 5;    // LED 켜기', '    GPIOA->BSRR = 1u << 5;    // LED on']],
    hl: [[0, 1], [2, 1, 'warn'], [1, 2, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      box(S, 'mcu', X + .2, 3.0, 4.2, 6.0, 'MCU', 'accent', 0);
      nd(S, 'pa', X + 4.5, 3.6, 2.2, 'PA5', 'accent', 0, { pct: 22 }); nd(S, 'pc', X + 4.5, 6.8, 2.2, 'PC13', 'warn', 0, { pct: 22 });
      hl(S, 'w1', X + 6.8, X + 8.6, 4.15, 'ink-2', 1, { w: .1 }); box(S, 'res', X + 8.6, 3.65, 2.0, 1.0, '330Ω', 'line', 1);
      hl(S, 'w2', X + 10.6, X + 11.4, 4.15, 'ink-2', 1, { w: .1 }); nd(S, 'led', X + 11.4, 3.6, 1.4, 'LED', 'ok', 1, { pct: 30 });
      F(S, 'iled', X + 6.8, 2.5, '(3.3 − 2.0) V / 330 Ω ≈ 4 mA', 'a', 1);
      hl(S, 'w3', X + 6.8, X + 9.4, 7.35, 'ink-2', 2, { w: .1 });
      nd(S, 'btn', X + 9.4, 6.8, 2.6, ['버튼', 'button'], 'line', 2); vl(S, 'gnd', X + 10.7, 7.95, 9.2, 'ink-2', 2, { w: .1 }); lbl(S, 'gl', X + 10.0, 9.3, 'GND', 'm', 2);
      lbl(S, 'fl', X, 10.4, ['풀업 없이 떼면 핀이 떠서 0과 1을 오가요 (플로팅)', 'released with no pull-up, the pin floats between 0 and 1'], 'r', 2, { off: 3, w: 12.7 });
      vl(S, 'pu', X + 8.0, 5.8, 7.35, 'ink-2', 3, { w: .1 }); box(S, 'rpu', X + 7.0, 5.1, 2.0, .9, '10kΩ', 'ok', 3); lbl(S, 'vcc', X + 5.1, 5.25, '3.3V', 'm g', 3);
      lbl(S, 'pl', X, 10.4, ['풀업: 평소 1, 누르면 GND로 0 (액티브 로우)', 'pull-up: idle 1, pressed pulls it to 0 (active low)'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'od', X, 10.4, [[['푸시풀: 0과 1을 직접 구동', 'push-pull: actively drives 0 and 1'], ''], [['오픈 드레인: 0만 당김 → 여러 장치가 한 선 공유 (I2C)', 'open-drain: only pulls low → many devices share a line (I2C)'], 'a emx-wr', { lh: 1.8 }], [['핀 하나 전류는 보통 수~20 mA까지', 'a pin sources only a few to 20 mA'], 'w']], 4, 0, { w: 12.7 });
    },
    notes: [['GPIO 핀은 레지스터로 입력·출력을 정해요 · 출력이면 ODR/BSRR로 3.3V나 0V를 내보내 LED를 켜요', 'a GPIO pin is set to input or output by registers; as an output, ODR or BSRR drives 3.3 V or 0 V to light an LED'], ['입력 핀이 아무 데도 연결되지 않으면 떠 있어서 잡음에 따라 0과 1을 오가요', 'an input connected to nothing floats, flipping between 0 and 1 with noise'], ['풀업 저항이 평소엔 1로 붙잡고, 버튼이 GND로 당기면 0이 돼요 · 그래서 “눌림 = 0”으로 읽어요', 'a pull-up holds it at 1 until the button pulls it to ground, so “pressed” reads as 0'], ['출력 방식은 푸시풀과 오픈 드레인이 있고, 핀 전류에 한계가 있어 모터 같은 부하는 트랜지스터로 구동해요', 'outputs can be push-pull or open-drain, and pin current is limited, so loads like motors go through a transistor']],
    fin: [['GPIO: 핀마다 방향·풀업·출력 방식을 레지스터로 정하고 비트로 읽고 써요', 'GPIO: registers set each pin’s direction, pull and drive, and bits read and write it', 'emx-xs emx-a'], ['LED에는 전류 제한 저항이 꼭 필요해요', 'an LED always needs a current-limiting resistor'], ['많은 MCU가 내부 풀업을 켤 수 있어요', 'most MCUs offer internal pull-ups']],
    caps: [['출력으로 LED', 'Output drives an LED'], ['떠 있는 입력', 'A floating input'], ['풀업 저항', 'The pull-up'], ['출력 방식', 'Output types'], ['GPIO', 'GPIO']]
  });
}

function sDebounce() {
  const X = 18.7, raw = '1111111110100110100000000000000000000000', n = raw.length, dx = 12.4 / n;
  return CW('em-debounce', {
    code: ['static uint8_t cnt;', 'static bool state = 1;', ['void tick_1ms(void) {          // 1 ms마다', 'void tick_1ms(void) {          // every 1 ms'], '    bool raw = read_pin();', '    if (raw == state) cnt = 0;', ['    else if (++cnt >= 20) {     // 20 ms 유지', '    else if (++cnt >= 20) {     // held 20 ms'], '        state = raw; cnt = 0;', '        on_change(state);', '    }', '}'],
    hl: [[3, 1], [4, 1, 'warn'], [5, 3, 'ok'], [0, 2]],
    draw: (S) => {
      lbl(S, 'l1', X, .6, ['핀 원래 신호', 'raw pin signal'], 'a', 1);
      wave(S, 'r', X + .2, 1.6, 12.4, 1.4, raw, 1, { color: 'accent' });
      lbl(S, 'n1', X, 3.6, ['누르는 순간 접점이 수 ms 동안 튀어요 (채터링)', 'contacts bounce for a few ms when pressed'], 'r', 1, { off: 2, w: 12.7 });
      frame(S, 'bz', X + .2 + 9 * dx, 1.4, 6 * dx, 1.8, 'danger', 1, { w: .08, dash: 1 });
      lbl(S, 'n2', X, 3.6, ['그대로 세면 한 번 누름이 여러 번으로 잡혀요', 'counting raw edges turns one press into several'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'l2', X, 5.0, ['디바운스 후', 'after debouncing'], 'g', 3);
      wave(S, 'd', X + .2, 6.0, 12.4, 1.4, '1'.repeat(35) + '0'.repeat(5), 3, { color: 'ok' });
      seg(S, 'win', [X + .2 + 15 * dx, 8.0], [X + .2 + 35 * dx, 8.0], 3, 'warn', .12);
      lbl(S, 'wl', X + .2 + 15 * dx, 8.3, ['20 ms 동안 그대로면 인정', 'accepted after 20 ms stable'], 'w', 3);
      lines(S, 'hw', X, 9.8, [[['하드웨어 방법: RC 필터 + 슈미트 트리거', 'hardware fix: an RC filter + Schmitt trigger'], 'a'], [['인터럽트로 받으면 튀는 만큼 ISR이 여러 번 불려요', 'interrupt-driven input fires the ISR once per bounce'], 'r emx-wr', { lh: 1.8 }], [['보통은 1~10 ms 타이머로 샘플링해요', 'sampling on a 1–10 ms timer is the usual cure'], 'g']], 4, 0, { w: 12.7 });
    },
    notes: [['기계식 스위치는 누르는 순간 접점이 수 ms 동안 붙었다 떨어지기를 반복해요 · 이걸 채터링(바운스)이라 해요', 'a mechanical switch’s contacts make and break for a few milliseconds when pressed: contact bounce'], ['에지를 그대로 세면 한 번 누른 게 여러 번으로 잡혀요 · 메뉴가 두 칸씩 넘어가는 버그가 생겨요', 'counting raw edges registers one press as several, the bug where a menu skips two items'], ['1 ms마다 핀을 읽어 새 값이 20 ms 동안 그대로일 때만 상태를 바꿔요', 'read the pin every millisecond and change state only after the new value holds for 20 ms'], ['RC 필터와 슈미트 트리거로 하드웨어에서 거르거나, 타이머 기반 샘플링으로 소프트웨어에서 걸러요', 'filter in hardware with an RC network and Schmitt trigger, or in software with timer-based sampling']],
    fin: [['디바운싱: 일정 시간 안정된 뒤에만 입력 변화를 인정해요', 'debouncing: accept an input change only after it has been stable for a while', 'emx-xs emx-a'], ['스위치마다 튀는 시간이 달라 데이터시트를 확인해요', 'bounce time varies by switch, so check the datasheet'], ['길게 누름·두 번 누름 판정도 같은 타이머로 해요', 'long-press and double-press detection use the same timer']],
    caps: [['접점이 튀어요', 'Contacts bounce'], ['여러 번 눌린 것처럼', 'One press, many edges'], ['20 ms 기다리기', 'Wait 20 ms'], ['다른 방법들', 'Other fixes'], ['디바운싱', 'Debouncing']]
  });
}

function sPwm() {
  const X = 18.7, w = 12.4;
  const pw = (k, y, d, st, c, off) => { const n = 40, per = 10, bits = [...Array(n)].map((_, i) => (i % per) < per * d ? '1' : '0').join(''); wave(S0, k, X + .2, y, w, 1.0, bits, st, { color: c, off }); hl(S0, k + 'av', X + .2, X + .2 + w, y + 1.0 - d * 1.0, 'danger', st, { w: .07, dash: 1, off }); };
  let S0;
  return CW('em-pwm', {
    code: ['TIM2->PSC  = 84 - 1;     // 84 MHz → 1 MHz', 'TIM2->ARR  = 1000 - 1;   // 1 MHz → 1 kHz', ['TIM2->CCR1 = 250;        // 듀티 25%', 'TIM2->CCR1 = 250;        // 25% duty'], ['// 평균 전압 = 0.25 × 3.3 V ≈ 0.83 V', '// average = 0.25 × 3.3 V ≈ 0.83 V'], ['// 서보: 50 Hz, 1~2 ms 펄스', '// servo: 50 Hz, 1–2 ms pulse']],
    hl: [[0, 3], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      lbl(S, 'l25', X, .5, ['듀티 25%', '25% duty'], 'a', 1); pw('p25', 1.3, .25, 1, 'accent');
      lbl(S, 'l50', X, 3.0, ['듀티 50%', '50% duty'], 'w', 2); pw('p50', 3.8, .5, 2, 'warn');
      lbl(S, 'l75', X, 5.5, ['듀티 75%', '75% duty'], 'g', 2); pw('p75', 6.3, .75, 2, 'ok');
      lbl(S, 'n1', X, 8.0, ['1 kHz로 켰다 껐다 · 켜진 비율이 듀티', 'switch at 1 kHz; the on fraction is the duty'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 8.0, ['빨간 점선 = 평균 전압', 'red dashes = the average voltage'], 'r', 2, { off: 3, w: 12.7 });
      lines(S, 'av', X, 8.0, [['0.25 × 3.3 V ≈ 0.83 V', 'f'], ['0.50 × 3.3 V ≈ 1.65 V', 'f'], ['0.75 × 3.3 V ≈ 2.48 V', 'f']], 3, 4);
      lbl(S, 'n3', X, 11.4, ['LED는 눈이, 모터는 관성이 평균만 느껴요', 'eyes and motor inertia only feel the average'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'sv', X, 8.0, [[['서보 모터: 20 ms(50 Hz)마다 펄스', 'servo: a pulse every 20 ms (50 Hz)'], 'a'], [['1 ms → 0°,  1.5 ms → 90°,  2 ms → 180°', '1 ms → 0°,  1.5 ms → 90°,  2 ms → 180°'], 'm'], [['모터 구동은 귀에 안 들리게 20 kHz 이상', 'motor drives run above 20 kHz to stay silent'], 'w emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['PWM은 디지털 핀을 빠르게 켰다 껐다 하는 신호예요 · 한 주기에서 켜진 비율이 듀티 사이클이에요', 'PWM switches a digital pin on and off quickly, and the fraction of each period spent on is the duty cycle'], ['타이머의 ARR이 주기를, CCR이 켜진 길이를 정해요 · 듀티를 바꾸면 펄스 폭만 바뀌어요', 'the timer’s ARR sets the period and CCR the on-time, so changing duty only changes the pulse width'], ['LED의 밝기나 모터 속도는 평균 전압을 따라가요 · 듀티 25%면 3.3V의 4분의 1 정도예요', 'LED brightness and motor speed follow the average voltage: at 25% duty, about a quarter of 3.3 V'], ['서보는 50 Hz 펄스의 폭으로 각도를 받고, 모터 드라이버는 소리가 안 나게 20 kHz 이상으로 돌려요', 'servos read their angle from the width of a 50 Hz pulse, and motor drivers run above 20 kHz to stay inaudible']],
    fin: [['PWM: 펄스 폭으로 평균 출력을 조절하는 디지털 방식의 아날로그', 'PWM: analog-like output from a digital pin by varying pulse width', 'emx-xs emx-a'], ['분해능 = ARR + 1 단계 (여기선 1000단계)', 'resolution = ARR + 1 steps (1,000 here)'], ['RC 필터를 붙이면 진짜 아날로그 전압이 돼요', 'an RC filter turns it into a true analog voltage']],
    caps: [['듀티 25%', '25% duty'], ['듀티를 바꾸면', 'Changing the duty'], ['평균 전압', 'The average voltage'], ['서보와 모터', 'Servos and motors'], ['PWM', 'PWM']]
  });
}

function sAdc() {
  const X = 18.7, x0 = 19.0, w = 12.2, yb = 9.0, H = 7.6, N = 16;
  const f = t => .5 + .42 * Math.sin(2 * Math.PI * t * 1.2 + .3);
  const P = (t, v) => [x0 + t * w, yb - v * H];
  return CW('em-adc', {
    code: ['uint16_t raw = adc_read(CH0);     // 0..4095', ['float v = raw * 3.3f / 4095.0f;   // 전압', 'float v = raw * 3.3f / 4095.0f;   // volts'], ['// 12비트: 1 LSB = 3.3 V / 4096 ≈ 0.8 mV', '// 12-bit: 1 LSB = 3.3 V / 4096 ≈ 0.8 mV'], '// 1.65 V → 2048', ['// 여러 번 평균 내면 잡음이 줄어요', '// averaging several reads cuts noise']],
    hl: [[0, 1], [0, 2, 'warn'], [2, 2, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      vl(S, 'ay', x0, .8, yb + .05, 'ink-3', 0, { w: .07 }); hl(S, 'ax', x0, 31.3, yb, 'ink-3', 0, { w: .07 });
      pplot(S, 'sg', t => P(t, f(t)), 0, 1, { st: 0, color: 'ink-3', h: .08, n: 40 });
      for (let i = 0; i < N; i++) { const t = (i + .5) / N, [px, py] = P(t, f(t)); vl(S, 'sl' + i, px, py, yb, 'accent', 1, { w: .05 }); pt(S, 'sp' + i, px, py, 1, C.cur, .17); }
      for (let l = 1; l < 8; l++) hl(S, 'lv' + l, x0, 31.2, yb - l / 8 * H, 'line', 2, { w: .04 });
      const q = []; for (let i = 0; i < N; i++) { const t = (i + .5) / N, lev = Math.min(7, Math.round(f(t) * 8)) / 8; q.push([x0 + i / N * w, yb - lev * H], [x0 + (i + 1) / N * w, yb - lev * H]); }
      poly(S, 'qs', q, { st: 2, color: 'warn', h: .1 });
      lbl(S, 'n1', X, 9.6, ['일정한 간격으로 전압을 찍어요 (샘플링)', 'measure the voltage at a fixed rate (sampling)'], 'a', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 9.6, ['가장 가까운 단계로 반올림 (양자화) · 여기선 3비트 = 8단계', 'round to the nearest level (quantization); here 3 bits = 8 levels'], 'w', 2, { off: 3, w: 12.7 });
      F(S, 'f3', X, 9.6, 'code = round(V / 3.3 × 4095)', 'g', 3);
      lbl(S, 'n3', X, 10.7, ['12비트면 4096단계 · 1.65 V → 2048', '12 bits = 4096 levels; 1.65 V → 2048'], '', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 10.7, [[['샘플링은 신호 최고 주파수의 2배 넘게 (나이퀴스트)', 'sample above twice the highest frequency (Nyquist)'], 'w emx-wr', { lh: 1.8 }], [['기준 전압 잡음·핀 임피던스가 정확도를 좌우해요', 'reference noise and source impedance set the accuracy'], 'emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['ADC는 연속적인 전압을 일정한 시간 간격으로 측정해요 · 초당 측정 횟수가 샘플링 속도예요', 'an ADC measures a continuous voltage at fixed intervals; the number per second is the sampling rate'], ['측정값은 가장 가까운 단계로 반올림돼요 · 비트 수가 늘면 단계가 촘촘해져 오차가 줄어요', 'each reading is rounded to the nearest level, and more bits mean finer levels and smaller errors'], ['12비트 ADC는 0~3.3V를 4096단계로 나눠요 · 한 단계(LSB)는 약 0.8 mV이고 1.65V는 2048이에요', 'a 12-bit ADC divides 0–3.3 V into 4096 steps, about 0.8 mV each, so 1.65 V reads 2048'], ['신호의 최고 주파수보다 2배 넘게 빨리 찍어야 왜곡(에일리어싱)이 없어요 · 여러 번 평균 내면 잡음도 줄어요', 'sampling faster than twice the highest frequency avoids aliasing, and averaging several readings reduces noise']],
    fin: [['ADC: 샘플링(언제)과 양자화(얼마나 촘촘히)로 아날로그를 숫자로 바꿔요', 'ADC: sampling (when) and quantization (how finely) turn analog into numbers', 'emx-xs emx-a'], ['입력 앞에 저역통과 필터를 둬서 에일리어싱을 막아요', 'an anti-aliasing low-pass filter sits in front of the input'], ['DMA와 타이머 트리거로 정확한 간격을 지켜요', 'timer triggers plus DMA keep the spacing exact']],
    caps: [['샘플링', 'Sampling'], ['양자화', 'Quantization'], ['분해능', 'Resolution'], ['정확도와 나이퀴스트', 'Accuracy and Nyquist'], ['ADC', 'ADC']]
  });
}

function sTimer() {
  const X = 18.7, x0 = 19.0, w = 12.2, yb = 7.0, H = 5.4;
  const saw = []; for (let c = 0; c < 3; c++) { saw.push([x0 + c * w / 3, yb], [x0 + (c + 1) * w / 3 - .02, yb - H], null); }
  return CW('em-timer', {
    code: [['// 84 MHz → PSC 8400 → 10 kHz로 셈', '// 84 MHz → PSC 8400 → count at 10 kHz'], 'TIM3->PSC = 8400 - 1;', ['TIM3->ARR = 10000 - 1;  // 1초마다 넘침', 'TIM3->ARR = 10000 - 1;  // overflow every 1 s'], ['TIM3->DIER |= TIM_DIER_UIE;  // 인터럽트', 'TIM3->DIER |= TIM_DIER_UIE;  // interrupt'], 'void TIM3_IRQHandler(void) {', '    TIM3->SR = 0;  toggle_led();   // 1 Hz', '}'],
    hl: [[0, 2], [2, 2, 'warn'], [4, 3, 'ok'], [0, 1]],
    draw: (S) => {
      vl(S, 'ay', x0, .9, yb + .05, 'ink-3', 0, { w: .07 }); hl(S, 'ax', x0, 31.3, yb, 'ink-3', 0, { w: .07 });
      lbl(S, 'yl', x0 + .3, .3, ['카운터 값', 'counter'], '', 0);
      poly(S, 'sw', saw, { st: 1, color: 'accent', h: .1 });
      hl(S, 'arr', x0, 31.2, yb - H, 'warn', 1, { w: .07, dash: 1 }); lbl(S, 'arl', 27.6, yb - H - .9, 'ARR = 9999', 'm w', 1);
      [1, 2, 3].forEach(c => { const x = x0 + c * w / 3; arw(S, 'ov' + c, [x - .1, yb + 1.3], [x - .1, yb + .2], 2, { color: 'danger' }); });
      lbl(S, 'ovl', X, yb + 1.5, ['넘칠 때마다 업데이트 인터럽트 → LED 토글', 'each overflow raises an update interrupt → toggle the LED'], 'r', 2, { off: 3, w: 12.7 });
      hl(S, 'cmp', x0, 31.2, yb - H * .3, 'ok', 3, { w: .07, dash: 1 }); lbl(S, 'cml', x0 + .3, yb - H * .3 + .1, 'CCR = 3000', 'm g', 3);
      lbl(S, 'cmn', X, yb + 1.5, ['비교 일치: 카운터 < CCR이면 1 → 듀티 30% PWM', 'compare match: counter < CCR gives 1 → a 30% PWM'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'ic', X, yb + 1.5, [[['입력 캡처: 에지가 오면 카운터 값을 저장', 'input capture: store the count on an edge'], 'a emx-wr', { lh: 1.8 }], [['상승 3200, 하강 3700 → 폭 500틱 = 50 ms', 'rise 3200, fall 3700 → 500 ticks = 50 ms'], 'm'], [['초음파 거리 센서, 회전수 측정에 써요', 'used for ultrasonic ranging and RPM'], '']], 4, 0, { w: 12.7 });
    },
    notes: [['하드웨어 타이머는 CPU와 상관없이 클럭에 맞춰 카운터를 올려요 · 프리스케일러로 84 MHz를 10 kHz로 나눠요', 'a hardware timer counts with the clock independently of the CPU, and the prescaler divides 84 MHz down to 10 kHz'], ['카운터가 ARR에 닿으면 0으로 돌아가며 인터럽트를 내요 · 10000틱이니 정확히 1초마다예요', 'reaching ARR, the counter wraps to 0 and raises an interrupt, exactly every second at 10,000 ticks'], ['비교 레지스터 CCR과 일치할 때 핀을 바꾸면 CPU 없이 PWM이 나와요', 'toggling a pin when the count matches the compare register CCR produces PWM with no CPU involvement'], ['입력 캡처는 핀에 에지가 들어온 순간의 카운터 값을 기록해서 펄스 폭이나 주파수를 재요', 'input capture records the count at the instant an edge arrives, measuring pulse widths and frequencies']],
    fin: [['타이머: 클럭을 세는 하드웨어로 주기 인터럽트·PWM·시간 측정을 해요', 'timers: clock-counting hardware for periodic interrupts, PWM and time measurement', 'emx-xs emx-a'], ['delay 루프보다 정확하고 CPU를 놀게 해요', 'more precise than delay loops, and the CPU stays free'], ['SysTick은 RTOS의 기본 틱에 쓰는 코어 타이머예요', 'SysTick is the core timer behind RTOS ticks']],
    caps: [['카운터', 'The counter'], ['넘침 인터럽트', 'Overflow interrupts'], ['비교 출력', 'Compare output'], ['입력 캡처', 'Input capture'], ['하드웨어 타이머', 'Hardware timers']]
  });
}

function sWatchdog() {
  const X = 18.7, x0 = 19.0, yb = 7.0, H = 5.4;
  const pts = [[x0, yb - H], [x0 + 2.2, yb - H * .55], [x0 + 2.2, yb - H], [x0 + 4.4, yb - H * .55], [x0 + 4.4, yb - H], [x0 + 6.6, yb - H * .55], [x0 + 6.6, yb - H], [x0 + 11.4, yb]];
  return CW('em-watchdog', {
    code: [['IWDG->KR = 0xCCCC;      // 시작 (약 1초)', 'IWDG->KR = 0xCCCC;      // start (about 1 s)'], 'while (1) {', '    do_work();', ['    IWDG->KR = 0xAAAA;  // 킥: 다시 채우기', '    IWDG->KR = 0xAAAA;  // kick: reload'], '}', ['// 멈추면 1초 뒤 칩이 리셋돼요', '// if it hangs, the chip resets in 1 s']],
    hl: [[0, 1], [3, 1, 'ok'], [2, 1, 'danger'], [5, 1, 'warn']],
    draw: (S) => {
      vl(S, 'ay', x0, .9, yb + .05, 'ink-3', 0, { w: .07 }); hl(S, 'ax', x0, 31.3, yb, 'ink-3', 0, { w: .07 });
      lbl(S, 'yl', x0 + .3, .3, ['남은 카운트', 'count left'], '', 0);
      poly(S, 'w1', pts.slice(0, 7), { st: 1, color: 'ok', h: .1 });
      [2.2, 4.4, 6.6].forEach((x, i) => lbl(S, 'kk' + i, x0 + x - .6, yb - H * .55 + .25, ['킥', 'kick'], 'g', 2));
      poly(S, 'w2', pts.slice(6), { st: 3, color: 'danger', h: .1 });
      lbl(S, 'hang', x0 + 7.0, yb - H - .1, ['무한 루프에 갇힘', 'stuck in a loop'], 'r', 3);
      nd(S, 'rst', x0 + 10.0, yb + .4, 2.3, 'RESET', 'danger', 3, { pct: 30 });
      lbl(S, 'n1', X, yb + 1.9, ['독립 클럭으로 계속 줄어드는 카운터', 'a counter running down on its own clock'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, yb + 1.9, ['정상이면 주기적으로 킥해서 0에 닿지 않아요', 'healthy code kicks it before it reaches 0'], 'g', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, yb + 1.9, ['멈추면 킥이 없어 0 → 칩 리셋 → 다시 동작', 'a hang means no kick → 0 → reset → running again'], 'r', 3, { off: 4, w: 12.7 });
      lines(S, 'tp', X, yb + 1.9, [[['ISR에서 킥하면 main이 멈춰도 못 잡아요', 'kicking from an ISR misses a dead main loop'], 'r emx-wr', { lh: 1.8 }], [['윈도 워치독: 너무 일찍 킥해도 리셋', 'window watchdog: kicking too early also resets'], 'w'], [['재시작 원인(RCC_CSR)을 기록해 두기', 'log the reset cause (RCC_CSR)'], 'g']], 4, 0, { w: 12.7 });
    },
    notes: [['워치독은 CPU와 다른 클럭으로 혼자 줄어드는 카운터예요 · 0에 닿으면 칩을 리셋해요', 'a watchdog is a counter running down on its own clock, resetting the chip when it reaches zero'], ['정상 동작하는 코드는 주기적으로 킥(재충전)해서 0에 닿지 않게 해요', 'healthy code kicks (reloads) it periodically so it never reaches zero'], ['버그로 무한 루프에 갇히거나 하드웨어가 멈추면 킥이 끊겨 1초 뒤 자동으로 재시작돼요', 'if a bug traps the code in a loop or hardware hangs, the kicks stop and the chip restarts itself after a second'], ['킥은 모든 중요 작업이 돌았다는 확인 뒤에 해야 해요 · ISR이나 타이머에서 기계적으로 킥하면 의미가 없어요', 'kick only after confirming every critical task ran; kicking mechanically from an ISR or timer defeats the purpose']],
    fin: [['워치독: 멈추면 스스로 리셋하는 마지막 안전망', 'watchdog: the last safety net that resets a hung device', 'emx-xs emx-a'], ['디버깅 중에는 멈춤 상태에서 워치독을 정지시켜요', 'freeze the watchdog while halted in the debugger'], ['리셋 후 안전한 상태로 시작하도록 설계해요', 'design the reset path to start in a safe state']],
    caps: [['줄어드는 카운터', 'A counter running down'], ['주기적인 킥', 'Regular kicks'], ['멈추면 리셋', 'Hang, then reset'], ['주의할 점', 'Pitfalls'], ['워치독 타이머', 'Watchdog timer']]
  });
}
/* ===== Embedded systems · 3. interrupts, 4. communication ===== */
function sIsr() {
  const X = 18.7, x0 = 19.2, s = 1.0;
  const bar = (k, t0, t1, y, c, st, lab) => rect(S0, k, x0 + t0 * s, y, (t1 - t0) * s, 1.0, c, 40, st, { r: .1, cls: lab ? 'cz-c emx-c2' : '', html: lab || '' });
  let S0;
  return CW('em-isr', {
    code: [['void EXTI0_IRQHandler(void) { // 벡터 등록', 'void EXTI0_IRQHandler(void) { // vector'], ['    EXTI->PR = 1;     // 플래그 지우기', '    EXTI->PR = 1;     // clear the flag'], ['    btn_flag = 1;     // 표시만 하고 끝', '    btn_flag = 1;     // just set a marker'], '}', ['// main: if (btn_flag) { 할 일 }', '// main: if (btn_flag) { do the work }']],
    hl: [[0, 1], [0, 1, 'warn'], [1, 2, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      lbl(S, 'lm', X, 1.75, 'main', 'm', 0); lbl(S, 'li', X, 3.55, 'ISR', 'm', 0);
      hl(S, 'ax', x0, 31.3, 5.0, 'ink-3', 0, { w: .06 });
      bar('m1', 0, 5, 1.5, 'accent', 1);
      arw(S, 'irq', [x0 + 5, .3], [x0 + 5, 1.4], 1, { color: 'danger' }); lbl(S, 'irql', x0 + 5.3, .2, 'IRQ', 'm r', 1);
      bar('st', 5, 5.7, 3.3, 'warn', 2); lbl(S, 'stl', x0 + 2.0, 5.4, ['레지스터 8개 자동 저장 (약 12사이클)', 'hardware stacks 8 registers (~12 cycles)'], 'w', 2, { off: 3, w: 10 });
      bar('is', 5.7, 7.5, 3.3, 'ok', 3, 'ISR');
      lbl(S, 'isl', x0 + 2.0, 5.4, ['ISR은 짧게: 플래그 지우고 표시만', 'keep the ISR short: clear the flag, set a marker'], 'g', 3, { off: 4, w: 10 });
      bar('us', 7.5, 8.2, 3.3, 'warn', 4); bar('m2', 8.2, 12, 1.5, 'accent', 4);
      lbl(S, 'n1', X, 6.8, ['폴링은 계속 확인하느라 CPU를 쓰지만, 인터럽트는 일이 생기면 하드웨어가 불러 줘요', 'polling burns CPU checking; an interrupt has the hardware call you when something happens'], '', 1, { off: 2, w: 12.7 });
      lines(S, 'rl', X, 6.8, [[['ISR 안에서 하지 말 것', 'never inside an ISR'], 'r'], [['오래 기다리기, printf, malloc', 'long waits, printf, malloc'], ''], [['플래그 안 지우기 → 무한 재진입', 'forgetting the flag → endless re-entry'], ''], [['진입 지연 = 하드웨어 저장 + 더 높은 ISR', 'latency = stacking + any higher ISR'], 'a emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['인터럽트는 하드웨어 사건(버튼, 수신, 타이머)이 생기면 CPU가 하던 일을 멈추고 정해진 함수를 부르는 장치예요', 'an interrupt makes the CPU drop what it is doing and call a designated function when a hardware event (button, received byte, timer) occurs'], ['Cortex-M은 레지스터 8개를 스택에 자동으로 저장하고 벡터 테이블에서 ISR 주소를 찾아요 · 약 12사이클이에요', 'a Cortex-M automatically stacks eight registers and fetches the ISR address from the vector table in about 12 cycles'], ['ISR은 플래그를 지우고 표시만 남긴 채 빨리 끝내요 · 무거운 처리는 main이나 태스크가 해요', 'the ISR clears the flag, leaves a marker and returns quickly, leaving heavy work to main or a task'], ['ISR이 끝나면 저장한 레지스터를 되살려 main이 멈춘 자리부터 이어 가요', 'on return the saved registers are restored and main continues exactly where it stopped']],
    fin: [['인터럽트: 사건이 생길 때만 짧게 끼어드는 함수 · 빠르고 짧게', 'interrupts: brief functions that cut in only when events occur, so keep them fast', 'emx-xs emx-a'], ['ISR과 main이 공유하는 변수는 volatile로', 'variables shared with an ISR must be volatile'], ['인터럽트를 오래 막으면 다른 사건을 놓쳐요', 'masking interrupts for long misses other events']],
    caps: [['사건 발생', 'An event'], ['문맥 저장', 'Saving context'], ['ISR 실행', 'Running the ISR'], ['복귀와 규칙', 'Return, and the rules'], ['인터럽트와 ISR', 'Interrupts and ISRs']]
  });
}

function sNvic() {
  const X = 18.7, x0 = 21.0, s = .85;
  const bar = (k, t0, t1, lane, c, st) => rect(S0, k, x0 + t0 * s, 1.4 + lane * 1.6, (t1 - t0) * s, 1.0, c, 40, st, { r: .1 });
  let S0;
  return CW('em-nvic', {
    code: ['NVIC_SetPriority(USART2_IRQn, 5);', ['NVIC_SetPriority(TIM2_IRQn,   1);  // 높음', 'NVIC_SetPriority(TIM2_IRQn,   1);  // higher'], 'NVIC_EnableIRQ(USART2_IRQn);', 'NVIC_EnableIRQ(TIM2_IRQn);', ['// 숫자가 작을수록 우선순위가 높아요', '// a smaller number means higher priority']],
    hl: [[0, 4], [0, 1, 'warn'], [1, 1, 'danger'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      lbl(S, 'l0', X, 1.65, 'main', 'm', 0); lbl(S, 'l1', X, 3.25, 'UART·5', 'm w', 0); lbl(S, 'l2', X, 4.85, 'TIM·1', 'm r', 0);
      hl(S, 'ax', x0, 31.3, 6.6, 'ink-3', 0, { w: .06 });
      bar('a0', 0, 2, 0, 'accent', 1);
      bar('b0', 2, 4, 1, 'warn', 2); arw(S, 'ia', [x0 + 2 * s, .3], [x0 + 2 * s, 1.3], 2, { color: 'warn' });
      bar('c0', 4, 6.5, 2, 'danger', 3); arw(S, 'ib', [x0 + 4 * s, .3], [x0 + 4 * s, 1.3], 3, { color: 'danger' });
      bar('b1', 6.5, 8, 1, 'warn', 3); bar('a1', 8, 12, 0, 'accent', 3);
      lbl(S, 'n1', X, 7.4, ['평소엔 main이 돌아요', 'main runs normally'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 7.4, ['UART 수신 → 우선순위 5 ISR 시작', 'a UART byte arrives → the priority-5 ISR starts'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 7.4, ['UART 처리 중 타이머(1)가 끼어들어요 → 끝나면 UART로 복귀 (중첩)', 'mid-UART, the timer (1) preempts, then UART resumes (nesting)'], 'r', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 7.4, [[['같은 순위끼리는 끼어들지 않고 줄 서요', 'equal priorities queue, they never preempt'], 'emx-wr', { lh: 1.8 }], [['연속 인터럽트는 복원 없이 바로 이어요 (테일 체이닝)', 'back-to-back interrupts skip the restore (tail-chaining)'], 'a emx-wr', { lh: 1.8 }], [['RTOS 함수를 부르는 ISR은 정해진 순위보다 낮게', 'ISRs that call RTOS APIs must sit below a set priority'], 'w emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['NVIC는 인터럽트마다 우선순위를 둬요 · Cortex-M에서는 숫자가 작을수록 우선순위가 높아요', 'the NVIC gives each interrupt a priority, and on Cortex-M a smaller number means higher priority'], ['UART 수신 인터럽트가 오면 main을 멈추고 우선순위 5짜리 ISR이 시작돼요', 'when the UART interrupt fires, main pauses and the priority-5 ISR starts'], ['그 도중 더 높은 타이머 인터럽트(1)가 오면 UART ISR마저 멈추고 먼저 처리해요 · 끝나면 UART ISR로 돌아가요', 'if the higher-priority timer interrupt (1) arrives meanwhile, it preempts even the UART ISR and then returns to it'], ['같은 우선순위끼리는 차례를 기다리고, 연달아 오면 저장·복원을 건너뛰는 테일 체이닝으로 빨라져요', 'equal priorities wait their turn, and back-to-back interrupts chain without restoring context']],
    fin: [['NVIC: 우선순위가 높은 인터럽트가 낮은 ISR까지 선점해요', 'NVIC: higher-priority interrupts preempt even running ISRs of lower priority', 'emx-xs emx-a'], ['시간에 민감한 일(모터 제어)에 가장 높은 순위를', 'give the most time-critical work (motor control) the top priority'], ['우선순위 비트 수는 칩마다 달라요 (보통 4비트)', 'the number of priority bits varies by chip, often 4']],
    caps: [['main 실행', 'main running'], ['UART 인터럽트', 'The UART interrupt'], ['더 높은 타이머가 선점', 'The timer preempts'], ['같은 순위와 테일 체이닝', 'Equal priority and tail-chaining'], ['우선순위와 중첩', 'Priorities and nesting']]
  });
}

function sVolatile() {
  const X = 18.7;
  return CW('em-volatile', {
    code: ['volatile bool ready;', 'volatile uint32_t count;', 'void EXTI0_IRQHandler(void) {', '    ready = true;  count++;', '}', ['while (!ready) { }  // volatile 없으면 무한', 'while (!ready) { }  // forever w/o volatile'], '__disable_irq(); count += n; __enable_irq();'],
    hl: [[5, 1, 'danger'], [0, 1, 'ok'], [3, 1, 'warn'], [6, 1, 'ok']],
    draw: (S) => {
      lines(S, 'nv', X, .8, [[['volatile 없이 최적화하면', 'optimized without volatile'], 'r'], ['  ldr  r0, [ready]', 'm'], ['loop:', 'm'], ['  cmp  r0, #0', 'm'], ['  beq  loop      ; r0만 계속 봄', 'm r']], 1, 2);
      lines(S, 'vv', X, .8, [[['volatile이면 매번 메모리에서 읽어요', 'with volatile, memory is read every time'], 'g'], ['loop:', 'm'], ['  ldr  r0, [ready]', 'm g'], ['  cmp  r0, #0', 'm'], ['  beq  loop', 'm']], 2, 3);
      lines(S, 'rc', X, .8, [[['count++는 세 단계라 끼어들 틈이 있어요', 'count++ takes three steps, leaving a gap'], 'w'], [['main: 읽기 count = 5', 'main: load count = 5'], 'm'], [['   ISR: count = 6', '   ISR: count = 6'], 'm a'], [['main: 5 + 1 = 6 저장 → ISR 증가가 사라짐', 'main: store 5 + 1 = 6 → the ISR’s increment is lost'], 'm r emx-wr', { lh: 1.8 }]], 3, 4, { w: 12.7 });
      lines(S, 'fx', X, .8, [[['해결', 'fixes'], 'g'], [['짧게 인터럽트 끄기 (임계 구역)', 'briefly mask interrupts (a critical section)'], ''], [['LDREX/STREX 원자적 연산 · C11 atomic', 'LDREX/STREX atomics, C11 atomic'], ''], [['ISR은 쓰기만, main은 읽기만 하게 나누기', 'one writer: ISR writes, main only reads'], '']], 4, 0);
      lbl(S, 'nt', X, 6.6, ['volatile은 “매번 읽고 쓰기”만 보장 · 원자성은 아니에요', 'volatile only forces every access; it is not atomicity'], 'a', 2, { w: 12.7 });
    },
    notes: [['ISR이 바꾸는 변수를 main이 기다리면, 컴파일러는 값이 안 바뀐다고 보고 레지스터에 한 번만 읽어 둬요 · 루프가 영원히 돌아요', 'when main waits on a variable the ISR changes, the compiler assumes it never changes, loads it once into a register, and loops forever'], ['volatile을 붙이면 접근할 때마다 메모리에서 다시 읽고 써요 · 하드웨어 레지스터와 ISR 공유 변수에 필요해요', 'volatile forces a fresh memory access every time, needed for hardware registers and variables shared with ISRs'], ['하지만 count++는 읽기, 더하기, 쓰기 세 단계예요 · 사이에 ISR이 끼면 한쪽 증가가 사라져요', 'but count++ is load, add and store, and an ISR between them makes one increment vanish'], ['짧게 인터럽트를 막거나 원자적 명령을 쓰고, 가능하면 쓰는 쪽을 하나로 정해요', 'mask interrupts briefly or use atomic instructions, and where possible give each variable a single writer']],
    fin: [['volatile은 가시성, 원자성은 따로: 공유 변수에는 둘 다 챙겨요', 'volatile gives visibility, not atomicity; shared variables need both', 'emx-xs emx-a'], ['32비트 정렬 읽기·쓰기 한 번은 Cortex-M에서 원자적이에요', 'a single aligned 32-bit load or store is atomic on Cortex-M'], ['임계 구역은 몇 줄로 짧게 유지해요', 'keep critical sections a few lines long']],
    caps: [['사라진 읽기', 'The vanishing read'], ['volatile', 'volatile'], ['읽고-수정-쓰기 경쟁', 'The read-modify-write race'], ['해결 방법', 'Fixes'], ['volatile과 공유 변수', 'volatile and shared variables']]
  });
}

function sDma() {
  const X = 18.7;
  return CW('em-dma', {
    code: ['DMA2_Stream0->PAR  = (uint32_t)&ADC1->DR;', 'DMA2_Stream0->M0AR = (uint32_t)buf;', ['DMA2_Stream0->NDTR = 512;    // 512개', 'DMA2_Stream0->NDTR = 512;    // 512 items'], ['// 순환 모드 + 절반/완료 인터럽트', '// circular mode + half/complete IRQs'], 'void DMA2_Stream0_IRQHandler(void) {', '    if (half) process(buf, 256);', '    else      process(buf + 256, 256);', '}'],
    hl: [[0, 3], [0, 2, 'warn'], [3, 4, 'ok'], [4, 4, 'accent']],
    draw: (S) => {
      lbl(S, 'l1', X, .6, ['CPU가 직접 복사', 'the CPU copies'], 'r', 1);
      for (let i = 0; i < 12; i++) rect(S, 'c' + i, 19.0 + i * 1.03, 1.5, .9, .9, i % 2 ? 'danger' : 'warn', 30, 1, { r: .1 });
      lbl(S, 'l1b', X, 2.6, ['읽고 쓰느라 CPU가 계속 바빠요', 'busy reading and writing the whole time'], '', 1, { w: 12.7 });
      lbl(S, 'l2', X, 3.8, ['DMA가 옮기는 동안', 'while DMA moves the data'], 'g', 2);
      rect(S, 'dm', 19.0, 4.7, 12.3, .9, 'ok', 30, 2, { cls: 'cz-c emx-c2', html: ['DMA: ADC → RAM', 'DMA: ADC → RAM'], r: .1 });
      rect(S, 'cp', 19.0, 5.8, 12.3, .9, 'accent', 30, 2, { cls: 'cz-c emx-c2', html: ['CPU: 다른 계산', 'CPU: other work'], r: .1 });
      rect(S, 'h0', 19.0, 7.6, 6.1, 1.1, 'warn', 30, 3, { cls: 'cz-c emx-c2', html: ['앞 절반: CPU 처리', 'first half: CPU'], r: .1, off: 4 });
      rect(S, 'h1', 25.2, 7.6, 6.1, 1.1, 'ok', 30, 3, { cls: 'cz-c emx-c2', html: ['뒤 절반: DMA 채움', 'second half: DMA'], r: .1, off: 4 });
      rect(S, 'h0b', 19.0, 7.6, 6.1, 1.1, 'ok', 30, 4, { cls: 'cz-c emx-c2', html: ['앞 절반: DMA 채움', 'first half: DMA'], r: .1 });
      rect(S, 'h1b', 25.2, 7.6, 6.1, 1.1, 'warn', 30, 4, { cls: 'cz-c emx-c2', html: ['뒤 절반: CPU 처리', 'second half: CPU'], r: .1 });
      lbl(S, 'n3', X, 9.1, ['절반 인터럽트 때 앞쪽을 처리 (더블 버퍼)', 'process the first half on the half-transfer interrupt'], 'w', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 9.1, [[['완료 인터럽트 때 뒤쪽 처리 · DMA는 쉬지 않아요', 'process the second half on completion; DMA never stops'], 'g emx-wr', { lh: 1.8 }], [['캐시가 있는 칩은 캐시 정리/무효화 필수', 'chips with caches need clean/invalidate'], 'r emx-wr', { lh: 1.8 }], [['처리가 절반 시간 안에 끝나야 해요', 'processing must finish within half a buffer'], 'w']], 4, 0, { w: 12.7 });
    },
    notes: [['CPU가 데이터를 하나씩 옮기면 그동안 다른 일을 못 해요 · 512개면 512번 읽고 쓰기예요', 'when the CPU moves data item by item it can do nothing else: 512 items means 512 loads and stores'], ['DMA는 주변장치와 메모리 사이를 CPU 없이 옮겨 주는 전용 하드웨어예요 · 출발지, 목적지, 개수만 알려 주면 돼요', 'DMA is dedicated hardware that moves data between peripherals and memory without the CPU, given a source, destination and count'], ['순환 모드로 버퍼를 반으로 나눠, DMA가 한쪽을 채우는 동안 CPU가 다른 쪽을 처리해요', 'in circular mode the buffer is split in half, and the CPU processes one half while DMA fills the other'], ['절반·완료 인터럽트마다 역할이 바뀌어요 · 처리가 늦으면 덮어쓰이고, 캐시가 있으면 일관성을 맞춰야 해요', 'the roles swap on each half and complete interrupt; slow processing gets overwritten, and caches need explicit coherency']],
    fin: [['DMA: 데이터 이동을 하드웨어에 맡겨 CPU를 계산에 쓰게 해요', 'DMA hands data movement to hardware so the CPU can compute', 'emx-xs emx-a'], ['ADC 연속 측정, 오디오, SPI 디스플레이에 많이 써요', 'common for continuous ADC, audio and SPI displays'], ['DMA가 접근할 수 있는 RAM 영역인지 확인해요', 'make sure the buffer is in DMA-reachable RAM']],
    caps: [['CPU가 복사하면', 'When the CPU copies'], ['DMA가 대신', 'DMA does it instead'], ['더블 버퍼', 'Double buffering'], ['교대와 주의점', 'Swapping, and caveats'], ['DMA', 'DMA']]
  });
}

function sRing() {
  const cx = 25.0, cy = 5.4, r = 3.3, N = 8;
  const pos = (i, rr = r) => { const a = i * 2 * Math.PI / N; return [cx + rr * Math.sin(a), cy - rr * Math.cos(a)]; };
  const cell = (k, i, t, c, st, off) => { const [x, y] = pos(i); rect(S0, k, x - .8, y - .5, 1.6, 1.0, c, c === 'line' ? 6 : 26, st, { cls: 'cz-c emx-c', html: t, off }); };
  const mark = (k, i, t, c, st, off) => { const [x, y] = pos(i, r + 1.55); T(S0, k, x - 1.2, y - .45, t, 'cz-mono cz-tc emx-xs emx-' + c, st, { w: 2.4, off }); };
  let S0;
  return CW('em-ringbuf', {
    code: ['#define N 8', 'static volatile uint8_t buf[N], head, tail;', ['void USART2_IRQHandler(void) {   // 생산자', 'void USART2_IRQHandler(void) {   // producer'], '    buf[head++ & (N-1)] = USART2->DR;', '}', ['int getc(void) {                  // 소비자', 'int getc(void) {                  // consumer'], ['    if (tail == head) return -1;  // 빔', '    if (tail == head) return -1;  // empty'], '    return buf[tail++ & (N-1)];', '}'],
    hl: [[2, 3], [5, 4, 'ok'], [3, 1, 'warn'], [1, 1, 'danger']],
    draw: (S) => {
      S0 = S;
      for (let i = 0; i < N; i++) cell('e' + i, i, '·', 'line', 0);
      ['H', 'E', 'L'].forEach((t, i) => cell('a' + i, i, t, 'accent', 1, i < 2 ? 2 : undefined));
      mark('h1', 3, 'head', 'a', 1, 2); mark('t1', 0, 'tail', 'g', 1, 2);
      ['H', 'E'].forEach((t, i) => cell('rd' + i, i, '✓', 'line', 2, 3));
      mark('t2', 2, 'tail', 'g', 2, 4); mark('h2', 3, 'head', 'a', 2, 3);
      ['L', 'O', '!', 'A', 'B', 'C'].forEach((t, j) => { const i = (3 + j) % N; cell('w' + j, i, t, 'warn', 3); });
      mark('h3', 1, 'head', 'a', 3, 4);
      lbl(S, 'n3', 18.7, 11.0, ['끝에 닿으면 처음으로 돌아가요 · & (N−1)로 빠르게', 'it wraps to the start; & (N−1) makes that cheap'], 'w', 3, { off: 4, w: 12.7 });
      cell('full', 1, 'D', 'danger', 4); { const [x, y] = pos(2, r + 1.7); T(S, 'h4', x - 1.6, y - .45, 'tail = head', 'cz-mono cz-tc emx-xs emx-r', 4, { w: 4.2 }); }
      lbl(S, 'n4', 18.7, 11.0, ['head − tail = 8 → 가득 참 · 다음 바이트는 버리거나 오류 처리', 'head − tail = 8 → full; the next byte is dropped or flagged'], 'r', 4, { w: 12.7 });
      lbl(S, 'n1', 18.7, 11.0, ['ISR이 받은 바이트를 head 자리에 넣어요', 'the ISR stores each byte at head'], 'a', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', 18.7, 11.0, ['main은 tail 자리에서 꺼내요 · 둘이 서로 다른 변수만 바꿔요', 'main takes from tail; each side updates only its own index'], 'g', 2, { off: 3, w: 12.7 });
    },
    notes: [['UART 바이트는 아무 때나 도착하니 ISR이 받은 즉시 링 버퍼의 head 자리에 넣어 둬요', 'UART bytes arrive at any moment, so the ISR drops each one into the ring buffer at head right away'], ['main은 여유 있을 때 tail 자리에서 꺼내요 · 생산자는 head만, 소비자는 tail만 바꿔서 잠금 없이 안전해요', 'main takes bytes from tail when it has time; the producer touches only head and the consumer only tail, so no lock is needed'], ['인덱스가 끝에 닿으면 처음으로 돌아가요 · 크기를 2의 거듭제곱으로 하면 & (N − 1)로 나머지를 싸게 구해요', 'indices wrap around at the end, and a power-of-two size turns the modulo into a cheap & (N − 1)'], ['head − tail이 N이면 가득 찬 거예요 · 더 오면 버리거나 오류로 알리고, 자주 넘치면 버퍼를 키우거나 DMA를 써요', 'when head − tail reaches N the buffer is full; extra bytes are dropped or flagged, and frequent overflow calls for a bigger buffer or DMA']],
    fin: [['링 버퍼: ISR(생산자)과 main(소비자)을 잠금 없이 잇는 고정 크기 큐', 'ring buffer: a fixed-size, lock-free queue between an ISR producer and a main-loop consumer', 'emx-xs emx-a'], ['인덱스는 volatile, 크기는 2의 거듭제곱', 'volatile indices, power-of-two size'], ['생산자·소비자가 여럿이면 잠금이나 원자적 연산이 필요해요', 'multiple producers or consumers need locks or atomics']],
    caps: [['ISR이 넣기', 'The ISR pushes'], ['main이 꺼내기', 'Main pops'], ['한 바퀴 돌기', 'Wrapping around'], ['가득 참', 'Full'], ['링 버퍼', 'The ring buffer']]
  });
}

function sUart() {
  const X = 18.7, x0 = 19.0, w = 12.4, bits = '11010000010111', n = bits.length, dx = w / n;
  const labs = ['', '', 'S', '0', '1', '2', '3', '4', '5', '6', '7', 'E', '', ''];
  return CW('em-uart', {
    code: ['USART2->BRR = 84000000 / 115200;   // ≈ 729', 'USART2->CR1 = USART_CR1_TE | USART_CR1_UE;', 'while (!(USART2->SR & USART_SR_TXE));', "USART2->DR = 'A';                  // 0x41"],
    hl: [[3, 1], [0, 1, 'warn'], [0, 1, 'danger'], [1, 1, 'accent']],
    draw: (S) => {
      lbl(S, 'tx', X, .5, ['TX 선: \'A\' = 0x41 = 01000001', 'TX line: \'A\' = 0x41 = 01000001'], 'a', 1);
      wave(S, 'w', x0, 1.6, w, 1.6, bits, 1, { color: 'accent' });
      labs.forEach((t, i) => { if (t) T(S, 'b' + i, x0 + i * dx, 3.5, t, 'cz-mono cz-tc emx-xs ' + (t === 'S' || t === 'E' ? 'emx-w' : ''), 1, { w: dx }); });
      lbl(S, 'n1', X, 4.6, ['쉬는 동안 1 → 시작 비트 0 → 데이터 8비트(LSB 먼저) → 정지 비트 1', 'idle 1 → start bit 0 → 8 data bits, LSB first → stop bit 1'], '', 1, { off: 2, w: 12.7 });
      F(S, 'bt', X, 4.6, '1 / 115200 ≈ 8.68 µs', 'w', 2);
      lbl(S, 'bt2', X, 5.6, ['프레임 10비트 → 초당 약 11,520바이트', '10-bit frames → about 11,520 bytes per second'], '', 2, { off: 3, w: 12.7 });
      for (let i = 0; i < 10; i++) { const good = x0 + (2.5 + i) * dx, bad = x0 + (2.5 + i) * dx * 1.06; vl(S, 'sg' + i, good, 1.2, 3.4, 'ok', 3, { w: .05, off: 4 }); vl(S, 'sb' + i, bad, 1.2, 3.4, 'danger', 3, { w: .05, off: 4 }); }
      lbl(S, 'n3', X, 5.6, ['수신 쪽은 비트 한가운데를 읽어요 · 클럭이 6% 빠르면(빨강) 뒤로 갈수록 엇나가 프레이밍 오류', 'the receiver samples mid-bit; a 6% fast clock (red) drifts until a framing error'], 'r', 3, { off: 4, w: 12.7 });
      lines(S, 'lv', X, 5.6, [[['전기 규격은 따로', 'electrical levels differ'], 'a'], [['TTL: 0 / 3.3 V', 'TTL: 0 / 3.3 V'], 'm'], [['RS-232: ±12 V, 논리 반전', 'RS-232: ±12 V, inverted'], 'm'], [['RS-485: 차동 쌍, 1 km, 다중 장치', 'RS-485: differential, 1 km, multi-drop'], 'm']], 4, 0);
    },
    notes: [['UART는 클럭 선 없이 두 장치가 미리 정한 속도(보드레이트)로 비트를 보내요 · 쉬는 동안 선은 1이에요', 'UART sends bits with no clock wire, both sides agreeing on a speed (baud rate) in advance, and the line idles at 1'], ['115200 보드면 비트 하나가 8.68 µs · 시작·정지 비트를 합쳐 한 바이트에 10비트가 들어요', 'at 115200 baud each bit lasts 8.68 µs, and with start and stop bits every byte costs 10 bits'], ['수신 쪽은 시작 비트에 맞춰 각 비트의 한가운데를 읽어요 · 양쪽 클럭이 2~3% 넘게 다르면 뒤쪽 비트를 잘못 읽어요', 'the receiver syncs on the start bit and samples mid-bit, so clocks differing by more than 2–3% misread the later bits'], ['신호 프레임은 같아도 전압 규격은 TTL, RS-232, RS-485로 달라요 · PC와는 USB-UART 변환기로 이어요', 'the framing stays the same while voltage standards differ (TTL, RS-232, RS-485), and PCs connect through USB-UART adapters']],
    fin: [['UART: 시작·정지 비트로 바이트마다 다시 맞추는 비동기 직렬 통신', 'UART: asynchronous serial that resynchronizes on every byte with start and stop bits', 'emx-xs emx-a'], ['TX는 상대의 RX에 교차해서 연결해요', 'cross TX to the other side’s RX'], ['디버그 로그와 GPS·블루투스 모듈에 많이 써요', 'the workhorse for debug logs and GPS or Bluetooth modules']],
    caps: [['프레임', 'The frame'], ['비트 시간', 'Bit timing'], ['보드레이트 불일치', 'Baud mismatch'], ['전기 규격', 'Electrical levels'], ['UART', 'UART']]
  });
}

function sSpi() {
  const X = 18.7, x0 = 20.6, w = 10.7;
  const dbl = s => [...s].map(b => b + b).join('');
  const cs = '1' + '0'.repeat(34) + '1', sclk = '00' + '01'.repeat(16) + '00', mosi = '00' + dbl('1001111100000000') + '00', miso = '11' + dbl('1111111111101111') + '11';
  return CW('em-spi', {
    code: ['cs_low();', ['spi_xfer(0x9F);             // ID 읽기 명령', 'spi_xfer(0x9F);             // read-ID command'], ['uint8_t id = spi_xfer(0);   // 보내며 받기', 'uint8_t id = spi_xfer(0);   // send + receive'], 'cs_high();', ['// 모드 0: 클럭 상승 에지에서 샘플', '// mode 0: sample on the rising edge']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      [['CS', 1.0], ['SCLK', 2.8], ['MOSI', 4.6], ['MISO', 6.4]].forEach(([t, y], i) => lbl(S, 'l' + i, X, y + .2, t, 'm', 1));
      wave(S, 'cs', x0, 1.0, w, 1.0, cs, 1, { color: 'danger' });
      wave(S, 'ck', x0, 2.8, w, 1.0, sclk, 2, { color: 'ink-2' });
      wave(S, 'mo', x0, 4.6, w, 1.0, mosi, 2, { color: 'accent' });
      wave(S, 'mi', x0, 6.4, w, 1.0, miso, 3, { color: 'ok' });
      lbl(S, 'h1', x0 + 1.2, 5.75, '0x9F', 'm a', 2); lbl(S, 'h2', x0 + 6.0, 7.55, '0xEF', 'm g', 3);
      lbl(S, 'n1', X, 8.8, ['CS를 0으로 내려 대화할 장치를 골라요', 'pull CS low to select the device'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 8.8, ['마스터가 클럭을 주며 MOSI로 명령 0x9F를 보내요', 'the master clocks out the command 0x9F on MOSI'], 'a', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 8.8, ['동시에 MISO로 답이 들어와요 · 0xEF = 제조사 ID (전이중)', 'the reply arrives on MISO at the same time: 0xEF, the maker ID (full duplex)'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 8.8, [[['CPOL·CPHA로 4가지 모드 · 장치와 맞춰야 해요', 'CPOL and CPHA give 4 modes that must match'], 'emx-wr', { lh: 1.8 }], [['장치마다 CS 선이 하나씩 필요해요', 'every device needs its own CS line'], ''], [['수십 MHz까지 · Flash, 디스플레이, SD 카드', 'tens of MHz: flash, displays, SD cards'], 'g']], 4, 0, { w: 12.7 });
    },
    notes: [['SPI는 클럭(SCLK), 마스터 출력(MOSI), 마스터 입력(MISO), 칩 선택(CS) 네 선을 써요 · CS를 0으로 내리면 그 장치가 응답해요', 'SPI uses four wires: clock (SCLK), master out (MOSI), master in (MISO) and chip select (CS); pulling CS low wakes the chosen device'], ['마스터가 클럭을 만들고, 클럭마다 MOSI로 한 비트씩 보내요 · 여기선 Flash의 ID 읽기 명령 0x9F예요', 'the master drives the clock and shifts one bit out on MOSI per tick, here the flash read-ID command 0x9F'], ['보내는 동안 같은 클럭으로 MISO에서 받아요 · 송수신이 동시에 일어나는 전이중이에요', 'on the same clock it shifts bits in from MISO, sending and receiving at once (full duplex)'], ['클럭 극성과 위상(CPOL, CPHA)을 장치와 맞추고, 장치가 여럿이면 CS를 각각 둬요 · 수십 MHz까지 빨라요', 'match the clock polarity and phase (CPOL, CPHA) to the device and give each device its own CS; speeds reach tens of MHz']],
    fin: [['SPI: 클럭을 함께 보내는 빠른 전이중 직렬 통신 · 선은 많지만 단순해요', 'SPI: fast full-duplex serial with a shared clock; more wires, but simple', 'emx-xs emx-a'], ['주소가 없어서 CS로 장치를 고르는 방식이에요', 'there are no addresses; CS picks the device'], ['QSPI는 데이터 선 4개로 Flash를 더 빨리 읽어요', 'QSPI reads flash faster over four data lines']],
    caps: [['칩 선택', 'Chip select'], ['명령 보내기', 'Sending a command'], ['동시에 받기', 'Receiving at the same time'], ['모드와 여러 장치', 'Modes and multiple devices'], ['SPI', 'SPI']]
  });
}

function sI2c() {
  const X = 18.7, x0 = 20.4, w = 10.9;
  const ab = [1, 0, 0, 1, 0, 0, 0, 0, 0];
  let scl = '11' + '1', sda = '11' + '0';
  ab.forEach(b => { scl += '01'; sda += String(b) + String(b); });
  scl += '011'; sda += '001';
  const n = scl.length, dx = w / n;
  return CW('em-i2c', {
    code: ['i2c_start();', ['i2c_write(0x48 << 1 | 0);   // 주소 + 쓰기', 'i2c_write(0x48 << 1 | 0);   // address + write'], ['i2c_write(0x00);            // 온도 레지스터', 'i2c_write(0x00);            // temp register'], ['i2c_start();                // 반복 시작', 'i2c_start();                // repeated start'], ['i2c_write(0x48 << 1 | 1);   // 읽기', 'i2c_write(0x48 << 1 | 1);   // read'], 'uint8_t hi = i2c_read(ACK);', 'uint8_t lo = i2c_read(NACK);', 'i2c_stop();'],
    hl: [[0, 1], [1, 1, 'warn'], [1, 1, 'ok'], [3, 5, 'accent']],
    draw: (S) => {
      lbl(S, 'ls', X, 1.2, 'SCL', 'm', 1); lbl(S, 'ld', X, 3.2, 'SDA', 'm', 1);
      wave(S, 'c', x0, 1.0, w, 1.0, scl, 1, { color: 'ink-2' });
      wave(S, 'd', x0, 3.0, w, 1.0, sda, 1, { color: 'accent' });
      lbl(S, 'st', x0, 4.3, 'S', 'm w', 1); lbl(S, 'sp', x0 + (n - 1) * dx, 4.3, 'P', 'm w', 1);
      lbl(S, 'n1', X, 5.6, ['두 선 모두 풀업 저항 + 오픈 드레인 · 여러 장치가 함께 써요', 'both lines are open-drain with pull-ups, shared by many devices'], '', 1, { off: 2, w: 12.7 });
      frame(S, 'af', x0 + 3 * dx - .05, 2.85, 16 * dx + .1, 1.3, 'warn', 2, { w: .08, r: .15 });
      lbl(S, 'al', x0 + 3 * dx, 4.3, '1001000 + W', 'm w', 2);
      lbl(S, 'n2', X, 5.6, ['시작(S): SCL이 1일 때 SDA가 떨어짐 → 주소 0x48 + 쓰기(0)', 'start (S): SDA falls while SCL is high → address 0x48 + write (0)'], 'w', 2, { off: 3, w: 12.7 });
      frame(S, 'kf', x0 + 19 * dx - .05, 2.85, 2 * dx + .1, 1.3, 'ok', 3, { w: .1, r: .15 });
      lbl(S, 'kl', x0 + 18.5 * dx, .1, 'ACK', 'm g', 3);
      lbl(S, 'n3', X, 5.6, ['9번째 클럭에 장치가 SDA를 0으로 당기면 ACK · 없으면 NACK', 'on the 9th clock the device pulls SDA low to ACK; silence means NACK'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 5.6, [[['반복 시작 후 읽기 → 0x19 0x00', 'repeated start, then read → 0x19 0x00'], 'm a'], ['0x190 × 0.0625 = 25.0 °C', 'f g'], [['100 kHz / 400 kHz · 느린 장치는 SCL을 잡고 기다리게 해요 (클럭 스트레칭)', '100 or 400 kHz; slow devices hold SCL low to make the master wait (clock stretching)'], 'emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['I2C는 SDA(데이터)와 SCL(클럭) 두 선을 여러 장치가 공유해요 · 오픈 드레인이라 0만 당기고 1은 풀업 저항이 만들어요', 'I2C shares two lines, SDA (data) and SCL (clock), among many devices; they are open-drain, so devices only pull low and pull-ups make the 1s'], ['SCL이 1인 동안 SDA가 떨어지면 시작 신호예요 · 이어서 7비트 주소와 읽기/쓰기 비트를 보내요', 'SDA falling while SCL is high marks a start, followed by a 7-bit address and a read/write bit'], ['주소가 맞는 장치는 9번째 클럭에 SDA를 0으로 당겨 ACK해요 · 아무도 안 당기면 NACK이라 장치가 없다는 뜻이에요', 'the device with that address pulls SDA low on the ninth clock to acknowledge; if nobody does, it is a NACK and no device answered'], ['레지스터 번호를 쓰고 반복 시작으로 읽기로 바꿔 데이터를 받아요 · 온도 센서 TMP102는 0x19 0x00 → 25.0 °C예요', 'write a register number, switch to reading with a repeated start and receive the data: a TMP102 returns 0x19 0x00 for 25.0 °C']],
    fin: [['I2C: 두 선, 주소, ACK로 여러 장치를 연결하는 느리지만 간편한 버스', 'I2C: a slower but convenient bus linking many devices with two wires, addresses and ACKs', 'emx-xs emx-a'], ['같은 주소 장치 두 개는 함께 못 써요 (주소 핀으로 변경)', 'two devices with one address clash; address pins fix it'], ['선이 길면 정전용량 때문에 풀업 값을 조정해요', 'long wires add capacitance, so tune the pull-ups']],
    caps: [['두 선 버스', 'A two-wire bus'], ['시작과 주소', 'Start and address'], ['ACK', 'ACK'], ['레지스터 읽기', 'Reading a register'], ['I2C', 'I2C']]
  });
}

function sCan() {
  const X = 18.7, x0 = 20.9, dx = .93;
  const A = '00011110011', B = '00011110101', Cc = '00110100000', BUS = '00011110011';
  return CW('em-can', {
    code: ['msg = can.Message(arbitration_id=0x0F3,', '                  data=[0x12, 0x34])', ['bus.send(msg)        # 500 kbit/s', 'bus.send(msg)        # 500 kbit/s'], ['# ID가 작을수록 우선순위가 높아요', '# a smaller ID wins arbitration'], ['# 0 = 우성(dominant), 1 = 열성', '# 0 = dominant, 1 = recessive']],
    hl: [[4, 1], [0, 2, 'warn'], [3, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      lbl(S, 'w1', X, .6, ['CAN_H·CAN_L 차동 선 · 0이 1을 이겨요 (wired-AND)', 'differential CAN_H/CAN_L; a 0 overrides a 1 (wired-AND)'], 'a', 1, { w: 12.7 });
      [['A', A], ['B', B], ['C', Cc]].forEach(([n, s], r) => {
        lbl(S, 'rl' + r, X, 2.15 + r * 1.2, n, 'm', 2);
        const lose = r === 2 ? 2 : r === 1 ? 8 : 99;
        [...s].forEach((b, i) => { chip(S, `r${r}b${i}`, x0 + i * dx, 2.0 + r * 1.2, .82, b, i > lose ? 'line' : b === '0' ? 'accent' : 'line', i < 9 ? 2 : 3, { h: .95, pct: i > lose ? 4 : b === '0' ? 26 : 8 }); });
      });
      lbl(S, 'rb', X, 5.95, 'bus', 'm g', 2);
      [...BUS].forEach((b, i) => chip(S, 'bb' + i, x0 + i * dx, 5.8, .82, b, 'ok', i < 3 ? 2 : 3, { h: .95, pct: b === '0' ? 30 : 10 }));
      frame(S, 'xc', x0 + 2 * dx - .07, 4.3, .96, 1.15, 'danger', 2, { w: .1, r: .15 });
      lbl(S, 'n2', X, 7.3, ['세 노드가 동시에 ID 전송 · C는 3번째 비트에 1을 보냈는데 버스는 0 → 즉시 물러남', 'three nodes send IDs at once; C sent 1 on bit 3 but the bus shows 0, so it backs off'], 'r', 2, { off: 3, w: 12.7 });
      frame(S, 'xb', x0 + 8 * dx - .07, 3.1, .96, 1.15, 'danger', 3, { w: .1, r: .15 });
      lbl(S, 'n3', X, 7.3, ['B도 9번째 비트에서 물러나고 0x0F3(A)이 끝까지 · 충돌로 잃는 데이터가 없어요', 'B drops out at bit 9 and 0x0F3 (A) finishes; no data is lost to the collision'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'fr', X, 7.3, [[['프레임', 'frame'], 'a'], ['SOF│ID 11│RTR│DLC│0–8 B│CRC 15│ACK│EOF', 'm'], [['자동차 ECU 수십 개가 한 버스에 · 500 kbit/s', 'dozens of car ECUs on one bus at 500 kbit/s'], 'emx-wr', { lh: 1.8 }], [['CAN FD: 최대 64바이트, 더 빠른 데이터 구간', 'CAN FD: up to 64 bytes, a faster data phase'], 'g']], 4, 0, { w: 12.7 });
    },
    notes: [['CAN은 두 선의 전압 차이로 신호를 보내 잡음에 강해요 · 버스에서는 0(우성)이 1(열성)을 이겨요', 'CAN signals with the voltage difference between two wires, shrugging off noise, and on the bus a 0 (dominant) beats a 1 (recessive)'], ['여러 노드가 동시에 보내기 시작하면 ID를 한 비트씩 내보내며 버스를 읽어요 · 1을 보냈는데 0이 보이면 바로 멈춰요', 'when several nodes start at once, each sends its ID bit by bit while reading the bus, and stops the moment it sends 1 but sees 0'], ['그래서 ID가 가장 작은 메시지가 손실 없이 끝까지 가요 · ID 자체가 우선순위예요', 'so the message with the lowest ID completes without loss: the ID is the priority'], ['프레임에는 CRC와 ACK가 있어 오류를 바로 잡아요 · 자동차, 산업 기계에서 표준처럼 쓰여요', 'frames carry a CRC and ACK so errors are caught at once, making CAN the standard in cars and industrial machines']],
    fin: [['CAN: 비트 단위 중재로 충돌 없이 우선순위대로 보내는 차동 버스', 'CAN: a differential bus where bitwise arbitration sends by priority with no lost collisions', 'emx-xs emx-a'], ['오류가 잦은 노드는 스스로 버스에서 빠져요 (bus-off)', 'error-prone nodes remove themselves (bus-off)'], ['양 끝에 120 Ω 종단 저항이 필요해요', 'each end needs a 120 Ω terminator']],
    caps: [['차동 신호와 우성 비트', 'Differential signaling, dominant bits'], ['동시 전송', 'Simultaneous starts'], ['가장 작은 ID가 승리', 'The lowest ID wins'], ['프레임과 쓰임', 'Frames and uses'], ['CAN 버스', 'The CAN bus']]
  });
}

function sBle() {
  const X = 18.7, x0 = 19.0;
  return CW('em-ble', {
    code: ['# 의사 코드', ['svc = Service(0x180D)            # 심박', 'svc = Service(0x180D)            # heart rate'], ['hr  = svc.add(0x2A37, NOTIFY)    # 측정값', 'hr  = svc.add(0x2A37, NOTIFY)    # measurement'], "advertise(name='HRM', interval_ms=100)", ['on_connect(set_interval_ms=30)', 'on_connect(set_interval_ms=30)'], ['hr.notify(bytes([0x00, 72]))     # 72 bpm', 'hr.notify(bytes([0x00, 72]))     # 72 bpm']],
    hl: [[3, 1], [4, 1, 'warn'], [1, 2, 'ok'], [5, 1, 'accent']],
    draw: (S) => {
      hl(S, 'ax', x0, 31.3, 3.0, 'ink-3', 0, { w: .06 });
      [0, 4.2, 8.4].forEach((t, j) => [0, 1, 2].forEach(c => rect(S, `ad${j}${c}`, x0 + t + c * .45, 1.8 + c * .35, .35, .6, 'accent', 60, 1, { r: .05 })));
      lbl(S, 'adl', X, .4, ['광고: 채널 37·38·39에 100 ms마다', 'advertising on channels 37, 38, 39 every 100 ms'], 'a', 1, { w: 12.7 });
      lbl(S, 'n1', X, 3.6, ['스캐너가 광고를 듣고 연결을 요청해요', 'a scanner hears the advert and requests a connection'], '', 1, { off: 2, w: 12.7 });
      for (let i = 0; i < 7; i++) { rect(S, 'ce' + i, x0 + 1.0 + i * 1.6, 4.5, .35, .6, 'warn', 60, 2, { r: .05 }); rect(S, 'cr' + i, x0 + 1.4 + i * 1.6, 4.5, .35, .6, 'ok', 60, 2, { r: .05 }); }
      hl(S, 'ax2', x0, 31.3, 5.2, 'ink-3', 2, { w: .06 });
      lbl(S, 'n2', X, 5.6, ['연결 후 30 ms마다 잠깐 깨서 주고받아요 · 채널은 계속 바꿔요', 'once connected, both wake every 30 ms for a brief exchange, hopping channels'], 'w', 2, { off: 3, w: 12.7 });
      lines(S, 'gt', X, 5.6, [[['GATT 서버', 'GATT server'], 'a'], [['└ 서비스 0x180D (심박)', '└ service 0x180D (heart rate)'], 'm'], [['   └ 특성 0x2A37 (측정값, notify)', '   └ characteristic 0x2A37 (notify)'], 'm'], [['      └ 값: 00 48 → 72 bpm', '      └ value: 00 48 → 72 bpm'], 'm g']], 3, 4);
      lines(S, 'pw', X, 5.6, [[['라디오는 1% 남짓만 켜져요', 'the radio is on about 1% of the time'], 'g'], [['코인 전지로 수개월~수년', 'months to years on a coin cell'], ''], [['BLE 5: 2M PHY, 장거리 Coded PHY', 'BLE 5: 2M PHY and long-range Coded PHY'], 'a emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['BLE 장치는 광고 채널 3개에 짧은 광고 패킷을 주기적으로 뿌려요 · 스마트폰이 스캔하다 듣고 연결해요', 'a BLE device broadcasts short advertising packets on three channels, and a scanning phone hears one and connects'], ['연결되면 둘은 정해진 간격(여기선 30 ms)마다 잠깐 깨어 데이터를 주고받고, 채널을 바꿔 가며 간섭을 피해요', 'once connected, both wake briefly at a set interval, here 30 ms, to exchange data, hopping channels to dodge interference'], ['데이터는 GATT라는 서비스·특성 트리로 정리돼요 · 심박 서비스 0x180D의 측정값 0x2A37을 notify로 보내요', 'data is organized as a GATT tree of services and characteristics; the heart rate service 0x180D sends measurement 0x2A37 as notifications'], ['나머지 시간엔 라디오를 끄고 잠들어서 코인 전지로도 오래 버텨요', 'the radio sleeps the rest of the time, so a coin cell lasts a long while']],
    fin: [['BLE: 광고로 찾고, 짧은 연결 이벤트로 주고받고, 대부분 잠들어 전력을 아껴요', 'BLE: discover by advertising, talk in brief connection events, sleep the rest', 'emx-xs emx-a'], ['표준 서비스 UUID 덕분에 앱이 장치를 바로 알아봐요', 'standard service UUIDs let apps recognize devices instantly'], ['페어링으로 링크를 암호화해요 (LE Secure Connections)', 'pairing encrypts the link (LE Secure Connections)']],
    caps: [['광고', 'Advertising'], ['연결 이벤트', 'Connection events'], ['GATT', 'GATT'], ['저전력의 비결', 'Why it sips power'], ['BLE', 'Bluetooth Low Energy']]
  });
}
/* ===== Embedded systems · 5. RTOS, 6. hardware and reliability ===== */
const gbar = (S, k, x0, s, t0, t1, y, c, st, o = {}) => rect(S, k, x0 + t0 * s, y, (t1 - t0) * s, .95, c, o.pct || 42, st, { r: .1, off: o.off, cls: o.t ? 'cz-c emx-c2' : '', html: o.t || '' });

function sRtos() {
  const X = 18.7, x0 = 20.8, s = .43, L = [1.4, 2.8, 4.2];
  const H = [[0, 2], [10, 12], [20, 22]], M = [[2, 5], [12, 15]], Lo = [[5, 10], [15, 20], [22, 24]];
  return CW('em-rtos', {
    code: ['void sensor_task(void *p) {', '    for (;;) {', '        read_sensor();', ['        vTaskDelay(10);    // 10 ms 블록', '        vTaskDelay(10);    // block 10 ms'], '    }', '}', ['xTaskCreate(sensor_task, "s", 256, 0, 3, 0);', 'xTaskCreate(sensor_task, "s", 256, 0, 3, 0);'], ['// 우선순위 3 (높음)', '// priority 3 (high)']],
    hl: [[6, 2], [2, 1, 'warn'], [3, 1, 'ok'], [0, 6]],
    draw: (S) => {
      [['H·3', 'r'], ['M·2', 'w'], ['L·1', 'a']].forEach(([t, c], i) => lbl(S, 'ln' + i, X, L[i] + .2, t, 'm ' + c, 0));
      hl(S, 'ax', x0, 31.3, 5.4, 'ink-3', 0, { w: .06 });
      H.forEach(([a, b], i) => gbar(S, 'h' + i, x0, s, a, b, L[0], 'danger', 1));
      M.forEach(([a, b], i) => gbar(S, 'm' + i, x0, s, a, b, L[1], 'warn', 1));
      Lo.forEach(([a, b], i) => gbar(S, 'o' + i, x0, s, a, b, L[2], 'accent', 1));
      lbl(S, 'n1', X, 6.2, ['준비된 태스크 중 우선순위가 가장 높은 것이 CPU를 가져요', 'the highest-priority ready task gets the CPU'], '', 1, { off: 2, w: 12.7 });
      arw(S, 'pe', [x0 + 10 * s, 5.2], [x0 + 10 * s, 1.5], 2, { color: 'danger' });
      lbl(S, 'n2', X, 6.2, ['10 ms가 되면 H가 깨어나 L을 즉시 선점해요', 'at 10 ms H wakes and preempts L immediately'], 'r', 2, { off: 3, w: 12.7 });
      [[2, 10], [12, 20]].forEach(([a, b], i) => frame(S, 'bk' + i, x0 + a * s, L[0], (b - a) * s, .95, 'danger', 3, { w: .07, dash: 1, r: .1 }));
      lbl(S, 'n3', X, 6.2, ['vTaskDelay 동안 H는 블록 상태 · CPU를 양보해요', 'during vTaskDelay H is blocked and yields the CPU'], 'w', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 6.2, [[['틱 인터럽트(보통 1 ms)가 깨울 시점을 세요', 'a tick interrupt (often 1 ms) counts down delays'], 'emx-wr', { lh: 1.8 }], [['할 일이 없으면 idle 태스크 → 저전력 모드', 'with nothing to do the idle task can sleep'], 'g emx-wr', { lh: 1.8 }], [['문맥 전환은 수백 사이클 · 너무 잦으면 손해', 'a context switch costs hundreds of cycles'], 'w emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['RTOS는 일을 태스크로 나누고 우선순위를 줘요 · 스케줄러는 준비된 태스크 중 가장 높은 것을 실행해요', 'an RTOS splits work into tasks with priorities, and the scheduler always runs the highest-priority ready task'], ['높은 태스크가 준비되면 낮은 태스크를 그 자리에서 멈추고 바로 바꿔요 · 선점형 스케줄링이에요', 'when a higher task becomes ready, the lower one is stopped on the spot: preemptive scheduling'], ['vTaskDelay나 큐 대기 중인 태스크는 블록 상태라 CPU를 쓰지 않아요 · 그래서 낮은 태스크도 돌아요', 'tasks waiting in vTaskDelay or on a queue are blocked and use no CPU, which lets lower tasks run'], ['틱 인터럽트가 시간을 세고, 할 일이 없으면 idle 태스크가 저전력 모드로 들어가요', 'a tick interrupt keeps time, and when nothing is ready the idle task can enter low-power mode']],
    fin: [['RTOS: 우선순위 선점 스케줄링으로 급한 일을 제때 처리해요', 'RTOS: preemptive priority scheduling gets urgent work done on time', 'emx-xs emx-a'], ['FreeRTOS, Zephyr, ThreadX가 대표적이에요', 'FreeRTOS, Zephyr and ThreadX are common choices'], ['태스크마다 스택이 따로 있어 RAM을 고려해요', 'every task has its own stack, so budget the RAM']],
    caps: [['태스크와 우선순위', 'Tasks and priorities'], ['선점', 'Preemption'], ['블록 상태', 'The blocked state'], ['틱과 idle', 'Ticks and idle'], ['RTOS 스케줄러', 'The RTOS scheduler']]
  });
}

function sRms() {
  const X = 18.7, x0 = 20.8, s = .85, L = [1.4, 2.8, 4.2];
  return CW('em-rms', {
    code: [['# (실행 시간 C, 주기 T) · 주기가 짧을수록 우선', '# (run time C, period T); shorter period wins'], 'tasks = [(1, 4), (2, 6), (3, 12)]', 'U = sum(c / t for c, t in tasks)     # 0.833', 'n = len(tasks)', 'bound = n * (2 ** (1 / n) - 1)       # 0.780', ['# U > bound → 보장 못 함 → 응답 시간 분석', '# U > bound → no guarantee → check responses']],
    hl: [[1, 1], [2, 1, 'warn'], [3, 2, 'danger'], [5, 1, 'ok']],
    draw: (S) => {
      [['T1', 'r'], ['T2', 'w'], ['T3', 'a']].forEach(([t, c], i) => lbl(S, 'ln' + i, X, L[i] + .2, t, 'm ' + c, i < 2 ? 1 : 3));
      hl(S, 'ax', x0, 31.2, 5.4, 'ink-3', 0, { w: .06 });
      for (let t = 0; t <= 12; t += 2) T(S, 'tk' + t, x0 + t * s - .5, 5.5, String(t), 'cz-mono cz-tc emx-tiny', 0, { w: 1 });
      [[0, 1], [4, 5], [8, 9]].forEach(([a, b], i) => gbar(S, 'a' + i, x0, s, a, b, L[0], 'danger', 1));
      [[1, 3], [6, 8]].forEach(([a, b], i) => gbar(S, 'b' + i, x0, s, a, b, L[1], 'warn', 1));
      [0, 4, 8].forEach((t, i) => arw(S, 'ra' + i, [x0 + t * s, .5], [x0 + t * s, 1.3], 1, { color: 'danger', h: .07 }));
      lbl(S, 'n1', X, 6.6, ['주기가 짧은 T1(4)이 T2(6)보다 우선 · 둘 다 마감 전에 끝나요', 'shorter-period T1 (4) outranks T2 (6), and both meet their deadlines'], '', 1, { off: 2, w: 12.7 });
      F(S, 'u', X, 6.6, 'U = 1/4 + 2/6 ≈ 0.583 ≤ 2(√2 − 1) ≈ 0.828 ✓', 'g', 2, { off: 3 });
      lbl(S, 'n2', X, 7.6, ['리우-레일랜드 상한 이하면 무조건 스케줄 가능', 'under the Liu–Layland bound, always schedulable'], '', 2, { off: 3, w: 12.7 });
      [[3, 4], [5, 6], [9, 10]].forEach(([a, b], i) => gbar(S, 'c' + i, x0, s, a, b, L[2], 'accent', 3));
      F(S, 'u3', X, 6.6, 'U ≈ 0.833 > 0.780', 'r', 3);
      lbl(S, 'n3', X, 7.6, ['상한은 넘지만 빈칸에 T3가 들어가 10에 끝나요 (마감 12) · 상한은 충분조건일 뿐', 'over the bound, yet T3 fits the gaps and ends at 10 (deadline 12): the bound is only sufficient'], 'w', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 7.6, [[['EDF(마감이 가까운 것 먼저)는 U ≤ 1까지 가능', 'EDF (earliest deadline first) reaches U ≤ 1'], 'g emx-wr', { lh: 1.8 }], [['과부하면 RM은 낮은 태스크가 먼저 놓쳐요', 'under overload RM drops the lowest tasks first'], 'emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['주기적인 태스크는 주기가 짧을수록 높은 우선순위를 주는 게 최적이에요 · Rate Monotonic(RM) 스케줄링이에요', 'for periodic tasks, giving shorter periods higher priority is optimal among fixed priorities: Rate Monotonic scheduling'], ['CPU 사용률 U = ΣC/T가 n(2^(1/n) − 1) 이하면 모든 마감을 지킬 수 있다고 보장돼요 · 태스크 2개면 0.828', 'if utilization U = ΣC/T stays under n(2^(1/n) − 1), every deadline is guaranteed; for two tasks that is 0.828'], ['T3를 더하면 0.833으로 상한 0.780을 넘지만, 직접 그려 보면 T3는 빈칸에서 10에 끝나요 · 상한은 충분조건이라 넘으면 응답 시간 분석으로 확인해요', 'adding T3 gives 0.833, above the 0.780 bound, yet drawing it out shows T3 finishing at 10; the bound is only sufficient, so check response times when it is exceeded'], ['마감이 가까운 순으로 매번 정하는 EDF는 100%까지 가능하지만, 과부하에서는 어떤 태스크가 놓칠지 예측하기 어려워요', 'EDF, which always runs the nearest deadline, works up to 100%, but under overload it is harder to predict which task misses']],
    fin: [['RM 스케줄링: 짧은 주기에 높은 우선순위 · U가 상한 이하면 마감 보장', 'rate monotonic: shorter periods get higher priority, and U below the bound guarantees deadlines', 'emx-xs emx-a'], ['태스크가 많아지면 상한은 ln 2 ≈ 0.693으로 수렴해요', 'with many tasks the bound approaches ln 2 ≈ 0.693'], ['실행 시간 C에는 최악의 경우(WCET)를 써야 해요', 'C must be the worst-case execution time']],
    caps: [['짧은 주기 우선', 'Shorter periods first'], ['사용률 상한', 'The utilization bound'], ['상한을 넘으면', 'Past the bound'], ['EDF와 과부하', 'EDF and overload'], ['Rate Monotonic 스케줄링', 'Rate monotonic scheduling']]
  });
}

function sInversion() {
  const X = 18.7, x0 = 20.8, s = .85, L = [1.4, 2.8, 4.2];
  return CW('em-inversion', {
    code: [['// L(낮음): 버스를 쓰려고 mutex 획득', '// L (low): takes the mutex for the bus'], 'take(mutex); write_bus(); give(mutex);', ['// H(높음): 같은 mutex를 기다림', '// H (high): waits for the same mutex'], ['// M(중간): L을 선점해 오래 실행 ✗', '// M (mid): preempts L and runs long ✗'], ['m = xSemaphoreCreateMutex(); // 우선순위 상속', 'm = xSemaphoreCreateMutex(); // inheritance']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      [['H', 'r'], ['M', 'w'], ['L', 'a']].forEach(([t, c], i) => lbl(S, 'ln' + i, X, L[i] + .2, t, 'm ' + c, 0));
      hl(S, 'ax', x0, 31.2, 5.4, 'ink-3', 0, { w: .06 });
vl(S, 'dln', x0 + 8 * s, .6, 5.4, 'danger', 1, { dash: 1, w: .07 }); lbl(S, 'dll', x0 + 8 * s + .2, .1, ['H 마감', 'H deadline'], 'r', 1);
      gbar(S, 'l0', x0, s, 0, 2, L[2], 'accent', 1, { off: 4 }); lbl(S, 'lk', x0 + .2, 5.6, ['mutex 획득', 'takes the mutex'], 'a', 1, { off: 4 });
      gbar(S, 'h0', x0, s, 2, 3, L[0], 'danger', 2, { off: 4 }); frame(S, 'hw', x0 + 3 * s, L[0], 8 * s, .95, 'danger', 2, { w: .08, dash: 1, r: .1, off: 4 });
      gbar(S, 'l1', x0, s, 3, 4, L[2], 'accent', 2, { off: 4 });
      gbar(S, 'm0', x0, s, 4, 10, L[1], 'warn', 3, { off: 4 }); gbar(S, 'l2', x0, s, 10, 11, L[2], 'accent', 3, { off: 4 }); gbar(S, 'h1', x0, s, 11, 12, L[0], 'danger', 3, { off: 4 });
      lbl(S, 'n1', X, 6.4, ['L이 mutex를 잡고 버스를 쓰는 중', 'L holds the mutex while using the bus'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 6.4, ['H가 깨어나 L을 선점했지만 mutex를 못 얻어 기다려요', 'H wakes and preempts L, but must wait for the mutex'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 6.4, ['M이 L을 선점해 오래 돌아요 → L이 mutex를 못 놓고 H는 마감을 놓쳐요 (우선순위 역전)', 'M preempts L and runs long, so L cannot release and H misses its deadline: priority inversion'], 'r', 3, { off: 4, w: 12.7 });
      gbar(S, 'l0b', x0, s, 0, 2, L[2], 'accent', 4); gbar(S, 'h0b', x0, s, 2, 3, L[0], 'danger', 4);
      gbar(S, 'l1b', x0, s, 3, 5, L[2], 'danger', 4, { t: 'L→H' }); gbar(S, 'h1b', x0, s, 5, 6.5, L[0], 'danger', 4); gbar(S, 'm0b', x0, s, 6.5, 12, L[1], 'warn', 4);
      lbl(S, 'n4', X, 6.4, ['우선순위 상속: mutex를 쥔 L을 잠시 H 순위로 올려 빨리 놓게 해요 → H는 6.5에 끝', 'priority inheritance lifts L to H’s priority while it holds the mutex, so H finishes at 6.5'], 'g', 4, { w: 12.7 });
      lbl(S, 'mp', 1, 8.6, ['1997년 화성 탐사선 패스파인더가 이 문제로 계속 재부팅됐어요 · 지구에서 우선순위 상속 옵션을 켜서 고쳤어요', 'in 1997 Mars Pathfinder kept rebooting from exactly this, fixed from Earth by enabling priority inheritance'], '', 3, { w: 16.5 });
    },
    notes: [['낮은 태스크 L이 공유 버스를 쓰려고 mutex를 잡았어요', 'the low-priority task L takes a mutex to use a shared bus'], ['높은 태스크 H가 깨어나 L을 선점하지만, 같은 mutex가 필요해서 L이 놓을 때까지 블록돼요 · 여기까지는 정상이에요', 'the high-priority task H wakes and preempts L but needs the same mutex, so it blocks until L lets go; so far, normal'], ['그런데 mutex와 상관없는 중간 태스크 M이 L을 선점해 오래 돌면, L이 mutex를 못 놓아 H가 M보다 늦어져요 · 우선순위가 뒤집힌 거예요', 'but a medium task M, unrelated to the mutex, preempts L and runs on, so L never releases and H ends up behind M: the priorities are inverted'], ['우선순위 상속은 mutex를 쥔 태스크를 기다리는 태스크의 순위로 잠시 올려요 · M이 끼어들지 못해 H가 제때 끝나요', 'priority inheritance temporarily raises the holder to the waiter’s priority, so M cannot cut in and H finishes in time']],
    fin: [['우선순위 역전: 낮은 태스크가 쥔 자원 때문에 높은 태스크가 중간 태스크에 밀리는 현상', 'priority inversion: a high task stalls behind a medium one because a low task holds its resource', 'emx-xs emx-a'], ['RTOS의 mutex는 보통 우선순위 상속을 지원해요 (세마포어는 아님)', 'RTOS mutexes usually support inheritance; plain semaphores do not'], ['임계 구역을 짧게 유지하는 게 가장 좋은 예방이에요', 'short critical sections are the best prevention']],
    caps: [['L이 mutex 획득', 'L takes the mutex'], ['H가 기다림', 'H waits'], ['M이 끼어듦', 'M cuts in'], ['우선순위 상속', 'Priority inheritance'], ['우선순위 역전', 'Priority inversion']]
  });
}

function sSync() {
  const X = 18.7;
  return CW('em-sync', {
    code: ['q = xQueueCreate(8, sizeof(int));', 'void ADC_IRQHandler(void) {', '    int v = ADC1->DR;', ['    xQueueSendFromISR(q, &v, NULL);  // 넣기', '    xQueueSendFromISR(q, &v, NULL);  // push'], '}', 'void proc_task(void *p) {', '    int v;', '    for (;;) {', ['        xQueueReceive(q, &v, portMAX_DELAY);', '        xQueueReceive(q, &v, portMAX_DELAY);'], '        use(v);', '    }', '}'],
    hl: [[1, 4], [3, 1, 'ok'], [8, 2, 'warn'], [0, 1]],
    draw: (S) => {
      box(S, 'isr', X + .2, .8, 3.4, 1.4, 'ISR', 'danger', 1); box(S, 'tsk', X + 9.0, .8, 3.4, 1.4, ['태스크', 'task'], 'accent', 1);
      nd(S, 'sem', X + 4.1, 1.0, 4.3, ['세마포어', 'semaphore'], 'ok', 1, { pct: 24, off: 2 });
      arw(S, 'sa', [X + 3.65, 1.5], [X + 4.05, 1.5], 1, { off: 2 }); arw(S, 'sb', [X + 8.45, 1.5], [X + 8.95, 1.5], 1, { off: 2 });
      lbl(S, 'n1', X, 2.8, ['이진 세마포어: ISR이 주면(give) 기다리던 태스크가 깨어나요 (신호)', 'binary semaphore: the ISR gives, and the waiting task wakes (a signal)'], 'g', 1, { off: 2, w: 12.7 });
      ['812', '809', '815', '·', '·', '·', '·', '·'].forEach((t, i) => rect(S, 'qs' + i, X + 3.9 + i * .66, 1.0, .6, 1.0, t === '·' ? 'line' : 'warn', t === '·' ? 6 : 30, 2, { cls: 'cz-c emx-c2', html: t }));
      arw(S, 'qa', [X + 3.7, 1.5], [X + 3.85, 1.5], 2); arw(S, 'qb', [X + 9.25 - .4, 2.25], [X + 9.25, 2.25], 2);
      lbl(S, 'n2', X, 2.8, ['큐: 값을 복사해 순서대로 전달 · 가득 차면 넣는 쪽, 비면 꺼내는 쪽이 블록', 'queue: copies values in order; a full queue blocks senders, an empty one blocks receivers'], 'w', 2, { off: 3, w: 12.7 });
      nd(S, 'mx', X + .2, 4.8, 7.0, ['mutex · 주인: T1', 'mutex · owner: T1'], 'accent', 3, { pct: 24 });
      lbl(S, 'n3', X, 6.3, ['mutex: 잡은 태스크만 놓을 수 있고 우선순위 상속이 있어요 · 공유 자원 보호용', 'mutex: only the owner releases it, and it has priority inheritance; used to guard resources'], 'a', 3, { w: 12.7 });
      lines(S, 'tb', X, 8.2, [[['도구        용도', 'tool        use'], 'm a'], [['세마포어    사건 알림 · 개수 세기', 'semaphore   signal events, count'], 'm'], [['mutex       자원 독점 (ISR 불가)', 'mutex       own a resource (no ISR)'], 'm'], [['큐          데이터 전달', 'queue       pass data'], 'm'], [['교착 상태: 잠금 순서를 정해 피하기', 'deadlock: avoid with a fixed lock order'], 'r']], 4, 0);
    },
    notes: [['ISR은 오래 일할 수 없으니 태스크를 깨워 넘겨요 · 이진 세마포어는 “일이 생겼다”는 신호로 써요', 'ISRs cannot do long work, so they wake a task to take over, and a binary semaphore serves as the “something happened” signal'], ['큐는 값 자체를 복사해 순서대로 넘겨요 · 비어 있으면 꺼내는 태스크가 블록돼서 바쁘게 기다리지 않아요', 'a queue copies the values themselves in order, and an empty queue blocks the receiver instead of busy-waiting'], ['mutex는 공유 자원을 한 번에 한 태스크만 쓰게 해요 · 잡은 태스크만 놓을 수 있고 우선순위 상속이 붙어요', 'a mutex lets one task at a time use a shared resource; only the owner releases it, and it carries priority inheritance'], ['용도에 맞게 골라 쓰고, 여러 잠금을 쓸 땐 항상 같은 순서로 잡아 교착 상태를 피해요', 'pick the tool to match the job, and when taking several locks always take them in the same order to avoid deadlock']],
    fin: [['RTOS 동기화: 신호는 세마포어, 데이터는 큐, 자원 보호는 mutex', 'RTOS sync: semaphores signal, queues carry data, mutexes guard resources', 'emx-xs emx-a'], ['ISR에서는 FromISR 버전 API만 불러요', 'ISRs may call only the FromISR API variants'], ['타임아웃을 줘서 영원히 기다리지 않게 해요', 'give waits a timeout so nothing blocks forever']],
    caps: [['세마포어', 'Semaphores'], ['큐', 'Queues'], ['mutex', 'Mutexes'], ['언제 무엇을', 'When to use which'], ['세마포어·mutex·큐', 'Semaphores, mutexes, queues']]
  });
}

function sRealtime() {
  const X = 18.7, x0 = 19.2, yb = 7.0, bw = .95;
  const bins = [3, 18, 30, 12, 4, 1, 0, 0, 0, 0, 1];
  return CW('em-realtime', {
    code: ['uint32_t t0 = DWT->CYCCNT;', 'control_step();', ['uint32_t dt = DWT->CYCCNT - t0;   // 사이클', 'uint32_t dt = DWT->CYCCNT - t0;   // cycles'], ['if (dt > worst) worst = dt;   // 최악 기록', 'if (dt > worst) worst = dt;   // track worst'], ['// 168 MHz: 168 사이클 = 1 µs', '// 168 MHz: 168 cycles = 1 µs']],
    hl: [[0, 3], [3, 1, 'warn'], [3, 1, 'danger'], [4, 1]],
    draw: (S) => {
      hl(S, 'ax', x0, 31.3, yb, 'ink-3', 0, { w: .06 });
      bins.forEach((v, i) => { if (v) rect(S, 'hb' + i, x0 + i * 1.1, yb - v * .18, bw, v * .18, i === 10 ? 'danger' : 'accent', 50, 1, { r: .05 }); });
      [40, 60, 80, 100, 120, 140].forEach((u, j) => T(S, 'tx' + j, x0 + (u - 40) / 10 * 1.1 - .6, yb + .15, String(u), 'cz-mono cz-tc emx-tiny', 0, { w: 1.2 }));
      lbl(S, 'ul', 29.0, yb + .7, 'µs', 'm', 0);
      lbl(S, 'n1', X, 8.4, ['제어 루프 응답 시간을 사이클 카운터로 수천 번 측정', 'thousands of loop response times from the cycle counter'], '', 1, { off: 2, w: 12.7 });
      vl(S, 'dl', x0 + 8 * 1.1, .9, yb, 'danger', 2, { dash: 1, w: .08 }); lbl(S, 'dll', x0 + 8 * 1.1 - 4.5, .5, ['마감 120 µs', 'deadline 120 µs'], 'r', 2);
      lbl(S, 'avg', x0 + .2, .5, ['평균 63 µs', 'mean 63 µs'], 'a', 2);
      lbl(S, 'n2', X, 8.4, ['평균은 넉넉하지만 드물게 145 µs → 마감 초과 · 실시간에선 최악(WCET)이 기준', 'the mean is comfortable, but a rare 145 µs breaks the deadline; real time is judged by the worst case (WCET)'], 'r', 2, { off: 3, w: 12.7 });
      lines(S, 'kd', X, 8.4, [[['경성: 놓치면 실패 (에어백, 브레이크)', 'hard: a miss is a failure (airbag, brakes)'], 'r'], [['준경성: 늦은 결과는 버림 (센서 융합)', 'firm: late results are discarded (sensor fusion)'], 'w'], [['연성: 늦어도 품질만 떨어짐 (영상)', 'soft: lateness just lowers quality (video)'], 'g']], 3, 4);
      lines(S, 'js', X, 8.4, [[['꼬리를 만드는 것: 캐시 미스, Flash 대기, 인터럽트', 'tails come from cache misses, flash wait states, interrupts'], 'emx-wr', { lh: 1.8 }], [['대책: 중요한 코드는 RAM에서, 인터럽트 우선순위 정리', 'fixes: run critical code from RAM, tidy interrupt priorities'], 'g emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['실시간 시스템은 계산 결과가 맞는 것뿐 아니라 정해진 시간 안에 나와야 해요 · 먼저 실제 응답 시간을 측정해요', 'a real-time system must produce correct results within a fixed time, so first measure the actual response times'], ['평균이 63 µs여도 드물게 145 µs가 나오면 120 µs 마감을 놓쳐요 · 실시간에서는 최악 실행 시간(WCET)이 기준이에요', 'a 63 µs mean still misses a 120 µs deadline when a rare 145 µs appears; real time is judged by the worst-case execution time'], ['놓치면 사고인 경성, 늦은 결과는 버리는 준경성, 품질만 떨어지는 연성으로 나눠요', 'hard real time treats a miss as failure, firm discards late results, and soft merely degrades quality'], ['드문 꼬리는 캐시 미스, Flash 대기, 다른 인터럽트에서 와요 · 핵심 코드를 RAM에 두고 우선순위를 정리해 줄여요', 'rare tails come from cache misses, flash wait states and other interrupts; placing critical code in RAM and sorting priorities trims them']],
    fin: [['실시간: “빨리”가 아니라 “항상 제때” · 최악의 경우로 설계해요', 'real time means always on time, not just fast, so design for the worst case', 'emx-xs emx-a'], ['지터: 응답 시간이 흔들리는 폭', 'jitter: how much response time wobbles'], ['정적 WCET 분석 도구로 상한을 증명하기도 해요', 'static WCET analysis tools can prove upper bounds']],
    caps: [['응답 시간 측정', 'Measuring response'], ['평균과 최악', 'Mean vs worst case'], ['경성·준경성·연성', 'Hard, firm and soft'], ['꼬리 줄이기', 'Trimming the tail'], ['실시간과 WCET', 'Real time and WCET']]
  });
}

function sStatic() {
  const X = 18.7;
  return CW('em-static', {
    code: [['static uint8_t pool[16][64];   // 고정 블록', 'static uint8_t pool[16][64];   // fixed blocks'], ['static StackType_t stk[256];   // 정적 스택', 'static StackType_t stk[256];   // static stack'], ['// 스택을 0xA5로 채워 두고 최고 수위 확인', '// paint stacks with 0xA5, read the high mark'], ['uxTaskGetStackHighWaterMark(0);  // 남은 양', 'uxTaskGetStackHighWaterMark(0);  // headroom'], ['// MPU 가드: 넘치면 바로 폴트', '// MPU guard: overflow faults at once']],
    hl: [[0, 1, 'danger'], [0, 1, 'ok'], [2, 2, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      lbl(S, 'h1', X, .6, ['malloc/free를 반복한 힙', 'a heap after malloc/free churn'], 'r', 1, { off: 2 });
      [[2, 'accent'], [1, 'line'], [3, 'accent'], [1, 'line'], [2, 'accent'], [1, 'line'], [2, 'accent']].reduce((x, [w, c], i) => { rect(S, 'hp' + i, x, 1.5, w * .95 - .05, 1.0, c, c === 'line' ? 6 : 30, 1, { r: .1, off: 2 }); return x + w * .95; }, X + .2);
      lbl(S, 'h1b', X, 2.9, ['빈 공간은 합쳐 3칸인데 3칸짜리 요청 실패 ✗ (단편화)', '3 free slots in total, yet a 3-slot request fails ✗ (fragmentation)'], 'r', 1, { off: 2, w: 12.7 });
      lbl(S, 'p1', X, .6, ['고정 크기 블록 풀', 'a fixed-size block pool'], 'g', 2, { off: 3 });
      for (let i = 0; i < 12; i++) rect(S, 'pl' + i, X + .2 + i * 1.03, 1.5, .95, 1.0, i < 7 ? 'ok' : 'line', i < 7 ? 30 : 6, 2, { r: .1, off: 3 });
      lbl(S, 'p1b', X, 2.9, ['크기가 같아서 단편화가 없고 할당 시간이 일정', 'equal sizes: no fragmentation, constant-time allocation'], 'g', 2, { off: 3, w: 12.7 });
      lbl(S, 's1', X, .6, ['태스크 스택 (0xA5로 칠해 둠)', 'a task stack, painted with 0xA5'], 'w', 3);
      for (let i = 0; i < 10; i++) rect(S, 'st' + i, X + .2 + i * 1.24, 1.5, 1.18, 1.0, i < 7 ? 'warn' : 'line', i < 7 ? 34 : 6, 3, { cls: 'cz-c emx-c2', html: i < 7 ? '' : 'A5', r: .1 });
      lbl(S, 's1b', X, 2.9, ['한 번이라도 쓴 곳은 0xA5가 지워져요 → 최고 수위 70%', 'used words lose their 0xA5 → high-water mark 70%'], 'w', 3, { w: 12.7 });
      frame(S, 'gd', X + .1, 4.4, 12.6, 1.1, 'danger', 4, { w: .12, r: .15 }); lbl(S, 'gdl', X + .4, 4.55, ['MPU 가드 영역 (접근 금지)', 'MPU guard region (no access)'], 'r', 4);
      lbl(S, 'g2', X, 5.9, ['넘치면 이웃 메모리를 몰래 망가뜨리는 대신 바로 폴트', 'overflow faults at once instead of silently corrupting neighbors'], 'g', 4, { w: 12.7 });
    },
    notes: [['동적 할당을 오래 반복하면 빈 공간이 조각나서, 합치면 충분해도 큰 블록을 못 얻어요 · 실패 시점도 예측하기 어려워요', 'long-running malloc and free fragment the heap, so a large block can fail even when enough total space is free, at an unpredictable moment'], ['그래서 펌웨어는 정적 배열이나 같은 크기 블록 풀을 써요 · 단편화가 없고 할당 시간이 일정해요', 'firmware therefore uses static arrays or fixed-size block pools, with no fragmentation and constant-time allocation'], ['태스크 스택을 0xA5로 칠해 두면 덮어쓰인 깊이로 최대 사용량(최고 수위)을 알 수 있어요', 'painting task stacks with 0xA5 reveals peak usage, the high-water mark, from how deep the pattern was overwritten'], ['스택이 넘치면 옆 메모리를 조용히 망가뜨려요 · MPU 가드 영역을 두면 넘치는 순간 폴트로 잡혀요', 'a stack overflow silently corrupts neighboring memory, while an MPU guard region turns it into an immediate fault']],
    fin: [['정적 메모리: 필요한 메모리를 빌드 때 정해 두면 실행 중 실패가 없어요', 'static memory: decide every buffer at build time and nothing fails at run time', 'emx-xs emx-a'], ['링커 맵에서 RAM 여유를 확인해요', 'check RAM headroom in the linker map'], ['재귀와 큰 지역 배열은 스택을 순식간에 써요', 'recursion and large local arrays eat stacks fast']],
    caps: [['힙 단편화', 'Heap fragmentation'], ['고정 블록 풀', 'Fixed-size pools'], ['스택 최고 수위', 'Stack high-water mark'], ['MPU 가드', 'MPU guards'], ['정적 메모리와 스택', 'Static memory and stacks']]
  });
}

function sPower() {
  const X = 18.7, x0 = 19.2, yb = 6.6;
  return CW('em-power', {
    code: ['while (1) {', ['    measure_and_send();   // 10 mA × 10 ms', '    measure_and_send();   // 10 mA × 10 ms'], ['    enter_stop(990);      // 5 µA × 990 ms', '    enter_stop(990);      // 5 µA × 990 ms'], '}', ['// 평균 = 10 × 0.01 + 0.005 × 0.99', '// average = 10 × 0.01 + 0.005 × 0.99'], '//      ≈ 0.105 mA'],
    hl: [[0, 4], [4, 2, 'warn'], [4, 2, 'ok'], [1, 2, 'accent']],
    draw: (S) => {
      hl(S, 'ax', x0, 31.3, yb, 'ink-3', 0, { w: .06 });
      hl(S, 'base', x0, 31.3, yb - .12, 'ok', 1, { w: .1 });
      [0, 3, 6, 9].forEach((t, i) => rect(S, 'sp' + i, x0 + .4 + t, 1.4, .35, yb - 1.4, 'danger', 55, 1, { r: .05 }));
      lbl(S, 'l1', x0 + .9, 1.3, '10 mA · 10 ms', 'm r', 1); lbl(S, 'l2', x0 + 1.0, yb - .9, ['잠자기 5 µA', 'sleep 5 µA'], 'g', 1);
      lbl(S, 'n1', X, 7.4, ['1초마다 잠깐 깨서 측정·전송하고 다시 잠들어요', 'wake briefly each second to measure and send, then sleep'], '', 1, { off: 2, w: 12.7 });
      F(S, 'f2', X, 7.4, 'I_avg = 10 × 0.01 + 0.005 × 0.99 ≈ 0.105 mA', 'w', 2);
      lbl(S, 'n2', X, 8.4, ['깨어 있는 1%가 전력의 95%를 써요', 'the 1% awake uses 95% of the energy'], '', 2, { w: 12.7 });
      F(S, 'f3', X, 9.6, '220 mAh / 0.105 mA ≈ 2100 h ≈ 87일', 'a', 3);
      lbl(S, 'n3', X, 10.6, ['동전 전지 CR2032 하나로 약 3개월', 'about three months on one CR2032 coin cell'], 'a', 3, { w: 12.7 });
      F(S, 'f4', X, 11.8, '10 s마다 5 ms → ≈ 0.01 mA → 약 2.5년', 'g', 4);
      lbl(S, 'n4', X, 12.8, ['깨는 횟수·시간을 줄이고, 안 쓰는 주변장치 클럭을 끄고, 클럭을 낮춰요', 'wake less and for shorter, gate unused peripheral clocks, and lower the clock'], 'g', 4, { w: 12.7 });
    },
    notes: [['배터리 장치는 대부분 잠들어 있다가 잠깐 깨서 일해요 · 깨어 있을 때 10 mA, 잘 때 5 µA처럼 수천 배 차이가 나요', 'battery devices sleep most of the time and wake briefly to work, drawing 10 mA awake versus 5 µA asleep, a thousandfold difference'], ['평균 전류는 시간 가중 평균이에요 · 1%만 깨어 있어도 그 1%가 전력 대부분을 써요', 'average current is the time-weighted mean, and even at 1% awake time that 1% dominates'], ['220 mAh 코인 전지를 0.105 mA로 나누면 약 2100시간, 87일 정도 가요', 'dividing a 220 mAh coin cell by 0.105 mA gives about 2,100 hours, roughly 87 days'], ['10초에 한 번 5 ms만 깨면 평균이 0.01 mA로 떨어져 2년 넘게 가요 · 줄이는 건 깨어 있는 시간이에요', 'waking for 5 ms every 10 s drops the average to about 0.01 mA and stretches it past two years; awake time is the lever']],
    fin: [['저전력: 평균 전류 = Σ(전류 × 시간 비율) · 깨어 있는 시간을 줄이는 게 핵심', 'low power: average current = Σ(current × time share), so shrink the awake time', 'emx-xs emx-a'], ['누설 전류·LED·전압 레귤레이터의 대기 전류도 따져요', 'count leakage, LEDs and regulator quiescent current too'], ['전류 프로파일러로 실제 파형을 측정해요', 'measure the real profile with a current profiler']],
    caps: [['전류 파형', 'The current profile'], ['평균 전류', 'Average current'], ['배터리 수명', 'Battery life'], ['더 오래 가게', 'Lasting longer'], ['저전력 설계', 'Low-power design']]
  });
}

function sFixed() {
  const X = 18.7, x0 = 19.6, w = 11.0;
  const NX = v => x0 + (v + 1) / 2 * w;
  return CW('em-fixed', {
    code: [['typedef int16_t q15;    // 값 = x / 32768', 'typedef int16_t q15;    // value = x/32768'], 'q15 a = 16384, b = 8192;     // 0.5, 0.25', 'q15 m = (int32_t)a * b >> 15;  // 4096 = 0.125', ['q15 s = sat16(24576 + 16384);  // 포화', 'q15 s = sat16(24576 + 16384);  // saturate'], ['// FPU 없는 MCU에서 정수 연산만으로', '// integer math on MCUs without an FPU']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'danger'], [4, 1]],
    draw: (S) => {
      hl(S, 'nl', x0, x0 + w, 2.2, 'ink-3', 1, { w: .08 });
      [[-1, '−1', '−32768'], [0, '0', '0'], [.25, '¼', '8192'], [.5, '½', '16384'], [1, '1', '32767']].forEach(([v, t, c], i) => { vl(S, 'tk' + i, NX(v), 1.9, 2.5, 'ink-2', 1, { w: .06 }); T(S, 'tv' + i, NX(v) - .8, 1.0, t, 'cz-math cz-tc emx-xs', 1, { w: 1.6 }); T(S, 'tc' + i, NX(v) - 1.3, 2.7, c, 'cz-mono cz-tc emx-tiny', 1, { w: 2.6 }); });
      lbl(S, 'n1', X, 3.8, ['부호 1비트 + 소수 15비트 · 간격 1/32768 ≈ 0.00003', '1 sign bit + 15 fraction bits; step 1/32768 ≈ 0.00003'], '', 1, { w: 12.7 });
      F(S, 'm1', X, 5.2, '0.5 × 0.25: 16384 × 8192 = 134217728', '', 2);
      F(S, 'm2', X, 6.2, '134217728 >> 15 = 4096 = 0.125 ✓', 'g', 2);
      lbl(S, 'm3', X, 7.2, ['곱하면 Q30이 되니 15비트 오른쪽으로 밀어요', 'the product is Q30, so shift right by 15'], '', 2, { w: 12.7 });
      F(S, 'o1', X, 8.6, '0.75 + 0.5: 24576 + 16384 = 40960', '', 3);
      F(S, 'o2', X, 9.6, 'int16로 넘치면 −24576 = −0.75 ✗', 'r', 3);
      F(S, 'o3', X, 10.6, '포화: 32767 ≈ 0.99997 ✓', 'g', 3);
      lbl(S, 'u4', X, 12.0, ['FPU 없는 Cortex-M0, 오디오 필터, DSP 명령(SMLAD)에 써요', 'used on FPU-less Cortex-M0, in audio filters and with DSP instructions like SMLAD'], 'a', 4, { w: 12.7 });
    },
    notes: [['FPU가 없는 MCU에서 실수 연산은 느려요 · Q15는 16비트 정수를 32768로 나눈 값으로 보고 −1 이상 1 미만을 표현해요', 'floating point is slow on MCUs without an FPU; Q15 treats a 16-bit integer as the integer over 32768, covering −1 up to just below 1'], ['곱하면 소수 자리가 30비트가 되니 32비트로 곱한 뒤 15비트 오른쪽으로 밀어요 · 0.5 × 0.25 = 0.125가 정수로 계산돼요', 'a product has 30 fraction bits, so multiply in 32 bits and shift right by 15: 0.5 × 0.25 = 0.125 in pure integers'], ['더해서 범위를 넘으면 부호가 뒤집혀 0.75 + 0.5가 −0.75가 돼요 · 그래서 최댓값에서 멈추는 포화 연산을 써요', 'overflowing the range flips the sign, turning 0.75 + 0.5 into −0.75, so saturating arithmetic clamps at the maximum instead'], ['오디오 필터나 제어기처럼 범위가 정해진 계산에 잘 맞고, ARM의 DSP 명령이 Q15 곱셈-누산을 한 번에 해요', 'it suits bounded calculations like audio filters and controllers, and ARM DSP instructions do Q15 multiply-accumulate in one step']],
    fin: [['고정소수점: 정수에 소수점 위치를 약속해 두고 정수 연산으로 실수를 흉내 내요', 'fixed point: agree where the binary point sits and do real-number math with integers', 'emx-xs emx-a'], ['Q 형식은 범위와 정밀도를 맞바꿔요 (Q15, Q31, Q16.16)', 'Q formats trade range for precision (Q15, Q31, Q16.16)'], ['곱셈 후 시프트와 포화를 빼먹지 마세요', 'never forget the shift after multiplying, or saturation']],
    caps: [['Q15 표현', 'The Q15 format'], ['곱셈', 'Multiplication'], ['넘침과 포화', 'Overflow and saturation'], ['어디에 쓰나', 'Where it is used'], ['고정소수점', 'Fixed-point arithmetic']]
  });
}

function sOta() {
  const X = 18.7, Y = 1.4;
  const slot = (k, x, w, t, c, st, off) => rect(S0, k, x, Y, w, 1.6, c, 26, st, { cls: 'cz-c emx-c2', html: t, off, r: .15 });
  let S0;
  return CW('em-ota', {
    code: [['download(slot_b, image)       # v2를 B에', 'download(slot_b, image)       # v2 into B'], ['if not verify_sig(image, pubkey):  # 서명', 'if not verify_sig(image, pubkey):  # signature'], '    abort()', 'set_pending(slot_b); reboot()', ['# 새 펌웨어가 정상이면 confirm()', '# the new firmware calls confirm() if healthy'], ['# 확인 없이 재부팅되면 A로 롤백', '# no confirm before reboot → roll back to A']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'accent'], [4, 2, 'ok']],
    draw: (S) => {
      S0 = S;
      slot('bl', X + .2, 2.4, 'boot', 'line', 0);
      slot('a1', X + 2.8, 4.6, ['A: v1 실행 중', 'A: v1 running'], 'ok', 0, 4);
      slot('b0', X + 7.6, 4.6, ['B: 비어 있음', 'B: empty'], 'line', 0, 1);
      slot('b1', X + 7.6, 4.6, ['B ← v2 수신', 'B ← v2'], 'warn', 1, 3);
      lbl(S, 'n1', X, 3.6, ['v1을 계속 돌리면서 B에 새 이미지를 받아요', 'download the new image into B while v1 keeps running'], '', 1, { off: 2, w: 12.7 });
      F(S, 'sig', X, 3.6, 'verify(sig, SHA-256(v2), pubkey) ✓', 'g', 2, { off: 3 });
      lbl(S, 'n2', X, 4.6, ['제조사 개인 키로 서명된 이미지만 받아들여요', 'only images signed with the vendor’s private key are accepted'], 'w', 2, { off: 3, w: 12.7 });
      slot('b2', X + 7.6, 4.6, ['B: v2 시험', 'B: v2 trial'], 'warn', 3, 4);
      lbl(S, 'n3', X, 3.6, ['pending 표시 후 재부팅 → 부트로더가 B를 시험 실행', 'mark pending and reboot → the bootloader trial-runs B'], 'a', 3, { off: 4, w: 12.7 });
      slot('a4', X + 2.8, 4.6, ['A: v1 백업', 'A: v1 backup'], 'line', 4);
      slot('b4', X + 7.6, 4.6, ['B: v2 확정 ✓', 'B: v2 ✓'], 'ok', 4);
      lines(S, 'n4', X, 3.6, [[['v2가 정상 동작을 확인하면 confirm → B 확정', 'v2 confirms once healthy → B becomes permanent'], 'g emx-wr', { lh: 1.8 }], [['확인 전에 멈추거나 워치독 리셋 → A로 롤백', 'a hang or watchdog reset before confirming → roll back to A'], 'r emx-wr', { lh: 1.8 }], [['도중에 전원이 꺼져도 A가 남아 있어 벽돌이 안 돼요', 'losing power midway still leaves A, so the device never bricks'], 'emx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['A/B 방식은 Flash를 두 슬롯으로 나눠요 · 지금 버전이 A에서 돌아가는 동안 새 버전을 B에 받아요', 'the A/B scheme splits flash into two slots, downloading the new version into B while the current one keeps running from A'], ['받은 이미지는 해시와 제조사 서명을 확인해요 · 서명이 없으면 누구나 악성 펌웨어를 심을 수 있어요', 'the image is checked against its hash and the vendor’s signature; without signatures anyone could plant malicious firmware'], ['B를 “시험 중”으로 표시하고 재부팅하면 부트로더가 B를 한 번 실행해 봐요', 'B is marked as pending and the device reboots, and the bootloader runs B on trial'], ['새 펌웨어가 스스로 정상임을 확인(confirm)해야 확정되고, 그 전에 멈추면 A로 돌아가요 · 전원이 끊겨도 벽돌이 되지 않아요', 'only when the new firmware confirms itself healthy does B become permanent; a failure before that rolls back to A, and power loss never bricks the device']],
    fin: [['OTA: 두 슬롯 + 서명 검증 + 시험 부팅 + 롤백으로 안전하게 업데이트', 'OTA: two slots, signature checks, trial boots and rollback make updates safe', 'emx-xs emx-a'], ['MCUboot, ESP-IDF OTA가 이 구조를 제공해요', 'MCUboot and ESP-IDF OTA implement this design'], ['구버전으로 되돌리는 공격을 막는 버전 카운터도 둬요', 'a version counter blocks downgrade attacks']],
    caps: [['B에 받기', 'Downloading into B'], ['서명 확인', 'Checking the signature'], ['시험 부팅', 'The trial boot'], ['확정 또는 롤백', 'Confirm or roll back'], ['부트로더와 OTA', 'Bootloaders and OTA']]
  });
}

function sDebug() {
  const X = 18.7;
  return CW('em-debug', {
    code: ['$ openocd -f stlink.cfg -f stm32f4x.cfg', '(gdb) target extended-remote :3333', '(gdb) break HardFault_Handler', ['(gdb) watch ticks          # 바뀌면 멈춤', '(gdb) watch ticks          # stop on change'], ['(gdb) x/4x 0x40020014      # 레지스터', '(gdb) x/4x 0x40020014      # registers'], ['(gdb) bt                   # 호출 스택', '(gdb) bt                   # call stack']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'ok'], [4, 2, 'accent']],
    draw: (S) => {
      [[['PC: GDB', 'PC: GDB'], 'line'], ['OpenOCD', 'accent'], [['프로브 (ST-LINK)', 'probe (ST-LINK)'], 'warn'], ['MCU', 'ok']].forEach(([t, c], i) => { nd(S, 'p' + i, X + .2, .8 + i * 1.6, 6.2, t, c, 1, { pct: c === 'line' ? 8 : 22 }); if (i) arw(S, 'pa' + i, [X + 3.3, .8 + i * 1.6 - .45], [X + 3.3, .8 + i * 1.6 - .05], 1); });
      lbl(S, 'sw', X + 6.8, 5.75, ['SWD: SWDIO + SWCLK 두 선', 'SWD: just SWDIO and SWCLK'], 'w', 1, { w: 5.8 });
      lbl(S, 'n1', X, 7.4, ['디버그 포트로 CPU를 멈추고 메모리를 읽고 써요', 'the debug port halts the CPU and reads and writes memory'], '', 1, { off: 2, w: 12.7 });
      lines(S, 'bp', X, 7.4, [[['중단점: 하드웨어 비교기 6개 (Cortex-M4)', 'breakpoints: 6 hardware comparators (Cortex-M4)'], 'w emx-wr', { lh: 1.8 }], ['pc  0x08001a3c  r0 0x00000005', 'm'], ['lr  0x08000f11  sp 0x2001ff70', 'm']], 2, 3, { w: 12.7 });
      lines(S, 'wp', X, 7.4, [[['감시점: ticks에 쓰는 순간 멈춤 → 누가 바꿨나', 'watchpoint: halt the moment ticks is written → who changed it?'], 'g emx-wr', { lh: 1.8 }], [['Flash에서 실행 중이어도 RAM 값을 실시간으로 봐요', 'live RAM values even while running from flash'], 'emx-wr', { lh: 1.8 }]], 3, 4, { w: 12.7 });
      lbl(S, 'la', X, 7.4, ['로직 분석기: 핀 파형을 그대로 기록해 UART·SPI를 해석', 'logic analyzer: record pin waveforms and decode UART or SPI'], 'a', 4, { w: 12.7 });
      wave(S, 'lw', X + .2, 9.2, 12.4, 1.0, '11010000010111', 4, { color: 'accent' });
      lbl(S, 'lwd', X + .2, 10.6, ['디코드: 0x41 \'A\' · 115200 8N1', 'decoded: 0x41 \'A\' · 115200 8N1'], 'm g', 4);
    },
    notes: [['디버그 프로브가 SWD 두 선으로 MCU의 디버그 포트에 붙고, OpenOCD가 이를 GDB 서버로 열어 줘요', 'a debug probe attaches to the MCU’s debug port over the two SWD wires, and OpenOCD exposes it as a GDB server'], ['중단점을 걸면 그 주소에서 CPU가 멈춰서 레지스터, 변수, 호출 스택을 볼 수 있어요 · Flash 코드엔 하드웨어 중단점을 써요', 'a breakpoint halts the CPU at that address so registers, variables and the call stack can be inspected; code in flash uses hardware breakpoints'], ['감시점은 특정 변수에 쓰는 순간 멈춰서, 값을 망가뜨리는 범인을 찾는 데 좋아요', 'a watchpoint halts the moment a variable is written, ideal for catching whatever corrupts it'], ['타이밍 문제나 통신 오류는 로직 분석기로 실제 핀 파형을 기록해 프로토콜을 해석해서 봐요', 'timing and communication bugs call for a logic analyzer that records real pin waveforms and decodes the protocol']],
    fin: [['디버깅: SWD 프로브 + GDB로 멈추고 들여다보고, 로직 분석기로 선 위의 진실을 봐요', 'debugging: halt and inspect via an SWD probe and GDB, and see the truth on the wire with a logic analyzer', 'emx-xs emx-a'], ['printf 대신 SWO·RTT로 빠르게 로그를 뽑아요', 'SWO or RTT logs beat printf for speed'], ['양산 제품은 디버그 포트를 잠가요 (읽기 보호)', 'production units lock the debug port (read-out protection)']],
    caps: [['연결 구성', 'The setup'], ['중단점', 'Breakpoints'], ['감시점', 'Watchpoints'], ['로직 분석기', 'Logic analyzers'], ['JTAG·SWD 디버깅', 'JTAG and SWD debugging']]
  });
}

function sFault() {
  const X = 18.7;
  const FR = ['R0', 'R1', 'R2', 'R3', 'R12', 'LR', 'PC', 'xPSR'];
  return CW('em-fault', {
    code: ['void HardFault_Handler(void) {', '    uint32_t *sp = (uint32_t *)__get_MSP();', '    log("PC=%08x CFSR=%08x BFAR=%08x",', '        sp[6], SCB->CFSR, SCB->BFAR);', ['    NVIC_SystemReset();     // 안전하게 재시작', '    NVIC_SystemReset();     // restart safely'], '}'],
    hl: [[0, 2], [3, 1, 'warn'], [2, 2, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      F(S, 'cz', X, .6, '*(uint32_t *)0x60000000 = 1;', 'r', 1);
      lbl(S, 'czn', X, 1.6, ['없는 주소에 쓰기 → 버스 폴트 → HardFault', 'writing to an unmapped address → bus fault → HardFault'], 'r', 1, { w: 12.7 });
      FR.forEach((t, i) => rect(S, 'fr' + i, X + .2 + (i % 4) * 3.1, 3.0 + Math.floor(i / 4) * 1.2, 2.95, 1.0, t === 'PC' ? 'warn' : 'line', t === 'PC' ? 34 : 8, 1, { cls: 'cz-c emx-c2', html: t === 'PC' ? 'PC 0800_1a3c' : t }));
      lbl(S, 'frl', X, 5.5, ['CPU가 자동으로 쌓은 예외 프레임 (sp[0]~sp[7])', 'the exception frame the CPU stacked automatically (sp[0]…sp[7])'], '', 1, { w: 12.7 });
      lines(S, 'pc', X, 7.2, [['$ addr2line -e fw.elf 0x08001a3c', 'm'], ['sensor.c:42', 'm w'], [['→ 문제가 난 바로 그 줄', '→ the exact line that faulted'], 'w']], 2, 3);
      lines(S, 'cf', X, 7.2, [['CFSR = 0x00008200', 'm'], [['비트 9 PRECISERR: 정확한 버스 오류', 'bit 9 PRECISERR: precise bus error'], 'm r'], [['비트 15 BFARVALID → BFAR가 유효', 'bit 15 BFARVALID → BFAR is valid'], 'm'], ['BFAR = 0x6000_0000', 'm r']], 3, 4);
      lines(S, 'rc', X, 7.2, [[['로그를 리셋 후에도 남는 RAM에 저장', 'store the log in RAM that survives reset'], 'g'], [['모터·히터는 먼저 안전 상태로', 'drive motors and heaters to a safe state first'], 'w'], [['브라운아웃 감지: 전압 2.7 V 아래면 리셋', 'brown-out detector: reset below 2.7 V'], 'a'], [['그다음 시스템 리셋', 'then reset the system'], '']], 4, 0);
    },
    notes: [['잘못된 포인터로 없는 주소에 쓰면 버스 폴트가 나고, 처리기가 없으면 HardFault로 올라가요', 'writing through a bad pointer to an unmapped address raises a bus fault, which escalates to HardFault if unhandled'], ['CPU는 예외 직전 레지스터 8개를 스택에 쌓아요 · 그중 sp[6]의 PC를 addr2line에 넣으면 문제의 소스 줄이 나와요', 'the CPU stacks eight registers just before the exception, and feeding the PC at sp[6] to addr2line names the faulting source line'], ['CFSR 레지스터는 원인을 비트로 알려 줘요 · PRECISERR와 BFARVALID가 켜졌으니 BFAR의 0x6000_0000이 문제의 주소예요', 'the CFSR register reports the cause in bits; PRECISERR and BFARVALID are set, so BFAR’s 0x6000_0000 is the bad address'], ['현장에서는 로그를 남기고 출력을 안전 상태로 둔 뒤 리셋해요 · 전압이 떨어지면 브라운아웃 감지가 칩을 리셋해요', 'in the field, log it, put outputs in a safe state and reset, while a brown-out detector resets the chip on low voltage']],
    fin: [['HardFault 분석: 쌓인 PC + CFSR + BFAR이면 원인과 위치가 보여요', 'HardFault analysis: the stacked PC plus CFSR and BFAR reveal the cause and the place', 'emx-xs emx-a'], ['MemManage·BusFault·UsageFault 처리기를 켜면 더 자세해요', 'enabling the MemManage, BusFault and UsageFault handlers gives more detail'], ['0으로 나누기·비정렬 접근도 폴트로 잡게 설정할 수 있어요', 'divide-by-zero and unaligned access can be made to fault too']],
    caps: [['폴트 발생', 'A fault'], ['쌓인 PC 찾기', 'Finding the stacked PC'], ['원인 레지스터', 'The cause registers'], ['복구와 안전', 'Recovery and safety'], ['HardFault와 고장 대응', 'HardFaults and failure handling']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('em-basics', '임베디드 기초', 'Foundations', '칩 하나 위의 컴퓨터', 'A computer on one chip', 'MCU와 MPU의 차이, 메모리 맵과 레지스터, 리셋에서 main까지의 부팅 과정, 크로스 컴파일과 링커 스크립트, 그리고 슈퍼 루프까지, 펌웨어가 칩 위에서 어떻게 돌아가는지부터 봐요.', 'MCUs versus MPUs, memory maps and registers, the boot path from reset to main, cross-compiling and linker scripts, and the superloop: how firmware actually runs on a chip.', [
    item('em-mcu', 'MCU와 MPU', 'MCU vs MPU',
      'MCU는 CPU·메모리·주변장치를 칩 하나에 담아 펌웨어를 바로 돌리고, MPU는 외부 메모리를 붙여 리눅스 같은 OS를 돌려요.',
      'MCU(마이크로컨트롤러)는 CPU 코어, 수백 KB의 Flash, 수십~수백 KB의 SRAM, GPIO·UART·ADC·타이머 같은 주변장치를 칩 하나에 담아요. 전원을 넣으면 ms 안에 Flash의 펌웨어를 실행하고, 잠들면 µA 수준만 써서 배터리 기기에 맞아요. MPU나 SoC는 GHz급 코어와 MMU, 캐시를 갖고 DRAM과 eMMC를 칩 밖에 붙여 리눅스를 돌려요. 화면, 네트워크, 복잡한 앱이 필요하면 MPU를, 정확한 타이밍과 저전력이 필요하면 MCU를 고르고, 둘을 함께 쓰는 제품도 많아요.',
      'An MCU packs CPU, memory and peripherals onto one chip and runs firmware directly; an MPU adds external memory and runs an OS such as Linux.',
      'An MCU (microcontroller) puts a CPU core, hundreds of KB of flash, tens to hundreds of KB of SRAM and peripherals such as GPIO, UART, ADC and timers on one chip. It runs firmware from flash within milliseconds of power-on and sleeps at microamps, ideal for battery devices. An MPU or SoC has GHz cores with an MMU and caches and attaches DRAM and eMMC externally to run Linux. Choose an MPU for screens, networking and complex apps and an MCU for precise timing and low power; many products use both.', sMcu()),
    item('em-memmap', '메모리 맵과 레지스터', 'Memory maps and registers',
      'Flash, RAM, 주변장치 레지스터가 하나의 주소 공간에 있어요. 장치 제어는 정해진 주소에 값을 읽고 쓰는 일이에요.',
      'MCU는 메모리 맵 I/O를 써서 Flash는 0x0800_0000, SRAM은 0x2000_0000, 주변장치는 0x4000_0000 근처처럼 하나의 주소 공간에 배치해요. GPIOA의 출력 레지스터 ODR이 0x4002_0014에 있다면 그 주소의 비트 5를 1로 쓰는 것만으로 PA5 핀이 3.3V가 돼요. 하드웨어 레지스터는 컴파일러가 접근을 없애거나 합치지 못하게 volatile 포인터로 다뤄요. |=처럼 읽고-수정-쓰기를 하면 중간에 인터럽트가 끼어 다른 비트를 덮어쓸 수 있어서, 비트 하나를 바꿀 때는 BSRR 같은 원자적 set/reset 레지스터를 써요.',
      'Flash, RAM and peripheral registers share one address space, so controlling a device means reading and writing fixed addresses.',
      'MCUs use memory-mapped I/O, placing flash near 0x0800_0000, SRAM at 0x2000_0000 and peripherals around 0x4000_0000 in one address space. If GPIOA’s output register ODR sits at 0x4002_0014, setting bit 5 at that address drives pin PA5 to 3.3 V. Hardware registers are accessed through volatile pointers so the compiler cannot drop or merge accesses. A read-modify-write such as |= can be interrupted and clobber other bits, so single-bit changes use atomic set/reset registers like BSRR.', sMemmap()),
    item('em-boot', '리셋에서 main까지', 'From reset to main',
      '리셋되면 벡터 테이블에서 스택과 시작 주소를 읽고, .data 복사와 .bss 초기화, 클럭 설정을 마친 뒤 main을 불러요.',
      'Cortex-M은 리셋되면 벡터 테이블의 첫 워드를 스택 포인터로, 두 번째 워드를 Reset_Handler 주소로 읽어요. 시작 코드는 초깃값이 있는 전역 변수(.data)를 Flash에서 RAM으로 복사하고, 초깃값이 없는 전역 변수(.bss)를 0으로 채워 C 언어의 약속을 지켜요. 이어서 SystemInit이 PLL을 설정해 내부 16 MHz 클럭을 168 MHz 등으로 올리고, C++이면 전역 생성자까지 부른 다음에야 main()이 실행돼요. 이 과정은 main 이전이라 눈에 안 띄지만, 전역 변수가 이상하거나 부팅이 멈출 때 가장 먼저 확인할 곳이에요.',
      'On reset the CPU reads the stack pointer and start address from the vector table, copies .data, zeroes .bss, sets up clocks and only then calls main.',
      'On reset a Cortex-M reads the first word of the vector table as the stack pointer and the second as the address of Reset_Handler. The startup code copies initialized globals (.data) from flash to RAM and zero-fills uninitialized ones (.bss), keeping the promises of the C language. SystemInit then programs the PLL to raise the internal 16 MHz clock to something like 168 MHz, C++ global constructors run, and only then does main() start. It all happens before main and goes unnoticed, but it is the first place to look when globals misbehave or boot hangs.', sBoot()),
    item('em-toolchain', '크로스 컴파일과 링커 스크립트', 'Cross-compiling and linker scripts',
      'PC에서 ARM용 코드를 만들고, 링커 스크립트로 각 섹션을 Flash와 RAM의 어느 주소에 둘지 정해요.',
      '임베디드 개발은 x86 PC에서 arm-none-eabi-gcc 같은 크로스 컴파일러로 대상 CPU용 코드를 만들어요. 링커 스크립트는 MEMORY 블록에 Flash와 RAM의 시작 주소와 크기를 적고, SECTIONS에서 벡터 테이블과 코드(.text)는 Flash에, 변수(.data, .bss)는 RAM에 놓아요. .data는 RAM에서 쓰지만 초깃값은 Flash에 둬야 해서 “> RAM AT > FLASH”처럼 실행 주소와 적재 주소를 나눠요. 만들어진 ELF는 size로 Flash·RAM 사용량을 확인하고, objcopy로 순수 바이너리를 뽑아 디버그 프로브로 Flash에 써요.',
      'Build ARM code on a PC with a cross compiler, and use a linker script to place each section at an address in flash or RAM.',
      'Embedded development builds code for the target CPU on an x86 PC with a cross compiler such as arm-none-eabi-gcc. A linker script lists the start and size of flash and RAM in its MEMORY block, and SECTIONS places the vector table and code (.text) in flash and variables (.data, .bss) in RAM. Because .data runs from RAM but its initial values must live in flash, “> RAM AT > FLASH” separates the run address from the load address. The size tool reports flash and RAM usage of the ELF, and objcopy extracts a raw binary that a debug probe writes to flash.', sToolchain()),
    item('em-superloop', '슈퍼 루프', 'The superloop',
      'OS 없는 펌웨어의 기본 구조로, 무한 루프 안에서 할 일을 차례로 불러요. 가장 느린 작업이 응답 시간을 정해요.',
      '슈퍼 루프는 초기화 후 while(1) 안에서 센서 읽기, 제어, 화면 갱신 같은 함수를 차례로 부르는 구조예요. 단순하고 디버깅하기 쉬워 작은 장치의 대부분이 이렇게 만들어져요. 하지만 화면 갱신처럼 30 ms 걸리는 작업이 있으면 그 도중에 눌린 버튼은 루프가 한 바퀴 돌아올 때까지 확인되지 않아, 최악 응답 시간이 루프 전체 길이가 돼요. 긴 작업은 상태 머신으로 잘게 나누고, 급한 사건은 인터럽트에 맡기고, 작업이 많아지면 RTOS로 옮겨 가요.',
      'The basic shape of firmware without an OS: an endless loop calling each job in turn, where the slowest job sets the response time.',
      'A superloop initializes and then calls functions such as reading sensors, running control and refreshing a display in turn inside while(1). It is simple and easy to debug, which is why most small devices are built this way. But with a 30 ms display refresh, a button pressed meanwhile is not noticed until the loop comes back around, so the worst-case response becomes the length of the whole loop. Break long jobs into state-machine steps, hand urgent events to interrupts, and move to an RTOS as tasks multiply.', sSuperloop())
  ]),
  sec('em-io', '입출력과 주변장치', 'I/O and peripherals', '핀과 신호 다루기', 'Working with pins and signals', 'GPIO와 풀업 저항, 스위치 채터링을 거르는 디바운싱, PWM으로 밝기와 속도 조절하기, ADC의 샘플링과 양자화, 하드웨어 타이머, 그리고 멈춘 장치를 살리는 워치독까지 다뤄요.', 'GPIO and pull-up resistors, debouncing switch contacts, controlling brightness and speed with PWM, ADC sampling and quantization, hardware timers, and the watchdog that revives a hung device.', [
    item('em-gpio', 'GPIO와 풀업 저항', 'GPIO and pull-ups',
      '핀마다 입력·출력과 풀업을 레지스터로 정해요. 떠 있는 입력은 풀업 저항으로 붙잡고, 버튼은 “눌림 = 0”으로 읽어요.',
      'GPIO 핀은 모드 레지스터로 입력이나 출력을 정하고, 출력이면 3.3V나 0V를 내보내 LED 같은 부하를 구동해요. LED에는 (3.3 − 2.0) V / 330 Ω ≈ 4 mA처럼 전류 제한 저항이 필요하고, 핀 하나가 낼 수 있는 전류는 보통 수~20 mA라 모터는 트랜지스터로 구동해요. 아무 데도 연결되지 않은 입력은 떠서 잡음에 따라 0과 1을 오가므로, 풀업 저항으로 평소 1로 붙잡고 버튼이 GND로 당기면 0이 되게 해요. 출력은 0과 1을 모두 구동하는 푸시풀과 0만 당기는 오픈 드레인이 있고, 오픈 드레인은 I2C처럼 여러 장치가 한 선을 공유할 때 써요.',
      'Registers set each pin’s direction and pull. A pull-up holds a floating input steady, so a button reads as “pressed = 0”.',
      'A GPIO pin is configured as input or output through its mode register; as an output it drives 3.3 V or 0 V to loads such as LEDs. An LED needs a current-limiting resistor, for example (3.3 − 2.0) V / 330 Ω ≈ 4 mA, and since a pin sources only a few to 20 mA, motors go through a transistor. An input connected to nothing floats between 0 and 1 with noise, so a pull-up holds it at 1 until a button pulls it to ground. Outputs are push-pull, driving both levels, or open-drain, pulling only low, which lets many devices share one line as in I2C.', sGpio()),
    item('em-debounce', '스위치 채터링과 디바운싱', 'Contact bounce and debouncing',
      '기계식 스위치는 누르는 순간 수 ms 동안 튀어요. 일정 시간 안정된 뒤에만 변화를 인정해 한 번 누름을 한 번으로 세요.',
      '버튼을 누르거나 뗄 때 금속 접점은 수 ms 동안 붙었다 떨어지기를 반복해서, 에지를 그대로 세면 한 번 누름이 여러 번으로 잡혀요. 소프트웨어 디바운싱은 1 ms마다 핀을 읽고, 새 값이 20 ms처럼 정한 시간 동안 그대로일 때만 상태를 바꿔요. 인터럽트로 버튼을 받으면 튈 때마다 ISR이 불리므로 타이머 기반 샘플링이 더 안정적이에요. 하드웨어로는 RC 저역통과 필터와 슈미트 트리거 입력으로 걸러요.',
      'Mechanical switches bounce for a few milliseconds. Accept a change only after it has been stable for a while, so one press counts once.',
      'When a button is pressed or released, its metal contacts make and break for several milliseconds, so counting raw edges registers one press as several. Software debouncing samples the pin every millisecond and changes state only when the new value has held for a set time such as 20 ms. Interrupt-driven buttons fire the ISR on every bounce, so timer-based sampling is more robust. In hardware, an RC low-pass filter and a Schmitt-trigger input clean up the signal.', sDebounce()),
    item('em-pwm', 'PWM', 'PWM',
      '핀을 빠르게 켰다 껐다 하며 켜진 비율로 평균 출력을 조절해요. LED 밝기, 모터 속도, 서보 각도를 PWM으로 다뤄요.',
      'PWM은 일정한 주기로 핀을 켰다 끄고, 한 주기에서 켜진 비율인 듀티 사이클로 평균 전압을 정해요. 타이머의 ARR이 주기를, CCR이 켜진 길이를 정해서 84 MHz 클럭을 1 MHz로 나누고 ARR을 999로 두면 1 kHz PWM이 되고, CCR 250이면 듀티 25%로 평균 약 0.83 V예요. LED의 밝기나 모터 속도는 이 평균을 따르고, 모터 드라이버는 소리가 안 들리게 20 kHz 이상을 써요. 서보 모터는 20 ms 주기의 펄스 폭 1~2 ms로 각도를 받아요.',
      'Switch a pin quickly and set the average output by the on fraction. LED brightness, motor speed and servo angles all use PWM.',
      'PWM switches a pin on and off at a fixed period, and the duty cycle, the fraction of each period spent on, sets the average voltage. A timer’s ARR sets the period and CCR the on-time: dividing 84 MHz to 1 MHz with ARR = 999 gives 1 kHz, and CCR = 250 gives 25% duty, about 0.83 V on average. LED brightness and motor speed follow that average, and motor drivers run above 20 kHz to stay inaudible. Servos read their angle from a 1–2 ms pulse in a 20 ms period.', sPwm()),
    item('em-adc', 'ADC', 'Analog-to-digital conversion',
      '정해진 간격으로 전압을 찍고(샘플링) 가장 가까운 단계로 반올림해(양자화) 숫자로 바꿔요.',
      'ADC는 아날로그 전압을 일정한 시간 간격으로 측정하고 2ⁿ개의 단계 중 가장 가까운 값으로 바꿔요. 12비트 ADC는 0~3.3V를 4096단계로 나눠 한 단계가 약 0.8 mV이고, 1.65V는 2048이 돼요. 신호의 최고 주파수보다 2배 넘게 빨리 샘플링해야 에일리어싱이 없어서, 입력 앞에 저역통과 필터를 두기도 해요. 실제 정확도는 기준 전압의 잡음과 신호원 임피던스에 좌우되고, 여러 번 평균 내거나 오버샘플링하면 잡음이 줄어요.',
      'Measure the voltage at fixed intervals (sampling) and round to the nearest level (quantization) to turn it into numbers.',
      'An ADC measures an analog voltage at regular intervals and maps it to the nearest of 2ⁿ levels. A 12-bit ADC divides 0–3.3 V into 4096 steps of about 0.8 mV, so 1.65 V reads 2048. Sampling must run faster than twice the signal’s highest frequency to avoid aliasing, which is why a low-pass filter often precedes the input. Real accuracy depends on reference noise and source impedance, and averaging or oversampling reduces noise.', sAdc()),
    item('em-timer', '하드웨어 타이머', 'Hardware timers',
      '클럭을 세는 하드웨어로 정확한 주기 인터럽트, PWM 출력, 펄스 폭 측정을 CPU 부담 없이 해요.',
      '타이머는 프리스케일러로 나눈 클럭에 맞춰 카운터를 올리고, ARR에 닿으면 0으로 돌아가며 업데이트 인터럽트를 내요. 84 MHz를 8400으로 나눠 10 kHz로 세고 ARR을 9999로 두면 정확히 1초마다 인터럽트가 와요. 카운터를 비교 레지스터 CCR과 비교해 핀을 바꾸면 CPU 개입 없이 PWM이 나오고, 입력 캡처는 에지가 들어온 순간의 카운터 값을 기록해 펄스 폭이나 주파수를 재요. delay 루프보다 정확하고 CPU를 다른 일에 쓸 수 있어요.',
      'Clock-counting hardware delivers precise periodic interrupts, PWM output and pulse measurement without loading the CPU.',
      'A timer counts a prescaled clock and, on reaching ARR, wraps to zero and raises an update interrupt. Dividing 84 MHz by 8400 to count at 10 kHz with ARR = 9999 yields an interrupt exactly every second. Comparing the count with a compare register CCR and toggling a pin produces PWM with no CPU involvement, while input capture records the count when an edge arrives to measure pulse widths and frequencies. It is far more precise than delay loops and frees the CPU.', sTimer()),
    item('em-watchdog', '워치독 타이머', 'Watchdog timers',
      '주기적으로 킥하지 않으면 칩을 리셋하는 카운터예요. 펌웨어가 멈춰도 스스로 다시 살아나게 하는 마지막 안전망이에요.',
      '워치독은 CPU와 별개의 클럭으로 줄어드는 카운터이고, 0에 닿으면 칩을 리셋해요. 정상 동작하는 코드는 주 루프에서 주기적으로 키 값을 써서 카운터를 다시 채우고, 무한 루프나 하드웨어 멈춤으로 킥이 끊기면 정해진 시간 뒤 자동으로 재시작돼요. ISR이나 타이머에서 기계적으로 킥하면 main이 멈춰도 잡지 못하므로, 중요한 작업이 모두 돌았는지 확인한 뒤에 킥해요. 너무 일찍 킥해도 리셋하는 윈도 워치독도 있고, 리셋 후에는 원인 레지스터를 기록해 두면 현장 문제를 추적하기 쉬워요.',
      'A counter that resets the chip unless it is kicked regularly: the last safety net that brings hung firmware back to life.',
      'A watchdog is a counter running down on a clock separate from the CPU, resetting the chip when it reaches zero. Healthy code writes a key value from the main loop to reload it, and if an endless loop or hardware hang stops the kicks, the chip restarts after a set time. Kicking mechanically from an ISR or timer misses a dead main loop, so kick only after confirming every critical task ran. Window watchdogs also reset on kicks that come too early, and logging the reset-cause register afterward makes field failures traceable.', sWatchdog())
  ]),
  sec('em-interrupt', '인터럽트와 동시성', 'Interrupts and concurrency', '사건에 반응하기', 'Reacting to events', 'ISR이 불리는 과정, 우선순위와 중첩, volatile과 공유 변수의 경쟁 조건, CPU 대신 데이터를 옮기는 DMA, 그리고 ISR과 main을 잇는 링 버퍼까지, 펌웨어의 동시성을 다뤄요.', 'How an ISR is invoked, priorities and nesting, volatile and race conditions on shared variables, DMA moving data instead of the CPU, and the ring buffer that links an ISR to the main loop: concurrency in firmware.', [
    item('em-isr', '인터럽트와 ISR', 'Interrupts and ISRs',
      '하드웨어 사건이 생기면 CPU가 하던 일을 멈추고 ISR을 불러요. ISR은 짧게 끝내고 무거운 일은 main이나 태스크에 넘겨요.',
      '인터럽트가 걸리면 Cortex-M은 R0~R3, R12, LR, PC, xPSR 8개 레지스터를 스택에 자동으로 저장하고 벡터 테이블에서 ISR 주소를 찾아 약 12사이클 만에 실행을 시작해요. ISR은 인터럽트 플래그를 지우고 표시만 남긴 뒤 빨리 끝내야 해요. 오래 기다리기, printf, malloc을 ISR에서 하면 다른 인터럽트가 늦어지고, 플래그를 안 지우면 ISR이 끝나자마자 다시 불려요. 끝나면 저장한 레지스터가 복원되어 main은 멈춘 자리부터 이어 가요.',
      'A hardware event makes the CPU stop and call an ISR. Keep the ISR short and leave heavy work to main or a task.',
      'When an interrupt fires, a Cortex-M automatically stacks eight registers (R0–R3, R12, LR, PC, xPSR), fetches the ISR address from the vector table and starts executing in about 12 cycles. The ISR should clear the interrupt flag, leave a marker and return quickly. Long waits, printf or malloc inside an ISR delay other interrupts, and forgetting to clear the flag re-enters the ISR immediately. On return the saved registers are restored and main resumes exactly where it stopped.', sIsr()),
    item('em-nvic', '우선순위와 중첩', 'Priorities and nesting',
      '인터럽트마다 우선순위를 둬서 더 급한 인터럽트가 실행 중인 낮은 ISR까지 선점해요.',
      'Cortex-M의 NVIC는 인터럽트마다 우선순위를 두고, 숫자가 작을수록 높아요. 우선순위 5인 UART ISR이 실행 중일 때 우선순위 1인 타이머 인터럽트가 오면 UART ISR을 멈추고 먼저 처리한 뒤 돌아가는데, 이를 중첩이라고 해요. 같은 우선순위끼리는 선점하지 않고 차례를 기다리고, 연달아 오면 복원과 저장을 건너뛰는 테일 체이닝으로 빨라져요. RTOS를 쓸 때는 RTOS API를 부르는 ISR의 우선순위를 정해진 값보다 낮게 둬야 해요.',
      'Each interrupt has a priority, and a more urgent one preempts even a running lower-priority ISR.',
      'The Cortex-M NVIC assigns each interrupt a priority, with smaller numbers meaning higher priority. If a priority-1 timer interrupt arrives while a priority-5 UART ISR runs, the UART ISR is suspended, the timer is served, and then the UART ISR resumes: nesting. Equal priorities never preempt each other but queue, and back-to-back interrupts chain without restoring and re-saving context. With an RTOS, ISRs that call RTOS APIs must sit below a configured priority.', sNvic()),
    item('em-volatile', 'volatile과 공유 변수', 'volatile and shared variables',
      'ISR과 공유하는 변수는 volatile로 매번 메모리에서 읽게 해요. 하지만 volatile만으로는 읽고-수정-쓰기 경쟁을 못 막아요.',
      '컴파일러는 루프 안에서 바뀌지 않는 것처럼 보이는 변수를 레지스터에 한 번만 읽어 두는데, ISR이 바꾸는 플래그라면 루프가 영원히 끝나지 않아요. volatile은 접근할 때마다 실제 메모리를 읽고 쓰게 해서 이 문제를 막아요. 하지만 count++는 읽기, 더하기, 쓰기 세 단계라 그 사이에 ISR이 같은 변수를 바꾸면 한쪽 증가가 사라져요. 짧게 인터럽트를 막는 임계 구역, LDREX/STREX나 C11 atomic 같은 원자적 연산, 또는 쓰는 쪽을 하나로 정하는 설계로 해결해요.',
      'Mark variables shared with an ISR volatile so they are re-read every time, but volatile alone does not stop read-modify-write races.',
      'Compilers cache a variable that seems not to change inside a loop in a register, so a flag set by an ISR can leave the loop spinning forever. volatile forces every access to go to real memory, fixing that. But count++ is a load, an add and a store, and an ISR touching the same variable in between makes one increment vanish. Short critical sections that mask interrupts, atomic operations such as LDREX/STREX or C11 atomics, or a design with a single writer solve it.', sVolatile()),
    item('em-dma', 'DMA', 'DMA',
      '주변장치와 메모리 사이의 데이터 이동을 CPU 대신 하드웨어가 해요. 더블 버퍼로 받으면서 처리할 수 있어요.',
      'DMA 컨트롤러는 출발지, 목적지, 개수만 설정하면 ADC 결과나 UART 수신 바이트를 CPU 없이 메모리로 옮겨요. 그동안 CPU는 계산을 계속하고, 전송이 끝나면 인터럽트로 알려 줘요. 순환 모드로 버퍼를 둘로 나누면 DMA가 뒤쪽을 채우는 동안 CPU가 앞쪽을 처리하는 더블 버퍼링이 되어 끊김 없이 연속 처리할 수 있어요. 처리가 절반 시간 안에 끝나야 덮어쓰이지 않고, 캐시가 있는 칩에서는 캐시 정리와 무효화로 일관성을 맞춰야 해요.',
      'Hardware moves data between peripherals and memory instead of the CPU, and double buffering processes data while it streams in.',
      'Given a source, destination and count, a DMA controller moves ADC results or received UART bytes into memory without the CPU, which keeps computing and is notified by an interrupt when the transfer completes. Splitting a circular buffer in two gives double buffering: DMA fills one half while the CPU processes the other, allowing seamless continuous processing. Processing must finish within half a buffer or data is overwritten, and chips with caches need explicit clean and invalidate operations for coherency.', sDma()),
    item('em-ringbuf', '링 버퍼', 'Ring buffers',
      'ISR이 넣고 main이 꺼내는 고정 크기 원형 큐예요. 생산자와 소비자가 각자 인덱스만 바꿔 잠금 없이 안전해요.',
      'UART 바이트처럼 아무 때나 들어오는 데이터는 ISR이 받은 즉시 링 버퍼의 head 자리에 넣고, main은 여유가 있을 때 tail 자리에서 꺼내요. 생산자는 head만, 소비자는 tail만 바꾸므로 생산자와 소비자가 하나씩이면 잠금 없이 안전하고, 인덱스는 volatile로 선언해요. 크기를 2의 거듭제곱으로 하면 인덱스를 끝없이 늘리고 & (N − 1)로 위치를 구할 수 있어 빈 상태(head == tail)와 가득 찬 상태(head − tail == N)를 쉽게 구분해요. 가득 차면 새 바이트를 버리거나 오류로 알리고, 자주 넘치면 버퍼를 키우거나 DMA를 써요.',
      'A fixed-size circular queue that an ISR fills and main drains, lock-free because each side updates only its own index.',
      'Data that arrives at any moment, like UART bytes, is stored by the ISR at head right away, and main takes bytes from tail when it has time. The producer touches only head and the consumer only tail, so with one of each no lock is needed, as long as the indices are volatile. A power-of-two size lets the indices grow freely with & (N − 1) giving the position, which cleanly separates empty (head == tail) from full (head − tail == N). When full, new bytes are dropped or flagged, and frequent overflow calls for a larger buffer or DMA.', sRing())
  ]),
  sec('em-comm', '통신 프로토콜', 'Communication protocols', '칩과 칩이 대화하는 법', 'How chips talk', 'UART의 프레임과 보드레이트, SPI의 전이중 전송, I2C의 주소와 ACK, CAN의 비트 단위 중재, 그리고 BLE의 광고와 GATT까지, 임베디드에서 매일 쓰는 통신을 파형으로 봐요.', 'UART frames and baud rates, SPI’s full-duplex transfers, I2C addresses and ACKs, CAN’s bitwise arbitration, and BLE advertising and GATT: everyday embedded communication, seen as waveforms.', [
    item('em-uart', 'UART', 'UART',
      '클럭 선 없이 미리 정한 속도로 시작 비트, 데이터 8비트, 정지 비트를 보내는 비동기 직렬 통신이에요.',
      'UART는 쉬는 동안 선을 1로 두고, 시작 비트 0, 데이터 8비트(LSB 먼저), 정지 비트 1로 한 바이트를 보내요. 115200 보드면 비트 하나가 약 8.68 µs이고 한 바이트에 10비트가 들어 초당 약 11,520바이트를 보내요. 수신 쪽은 시작 비트에 맞춰 각 비트의 한가운데를 읽기 때문에 양쪽 클럭이 2~3% 넘게 다르면 뒤쪽 비트를 잘못 읽어 프레이밍 오류가 나요. 프레임은 같아도 전압 규격은 TTL(0/3.3V), RS-232(±12V), RS-485(차동, 장거리)로 달라요.',
      'Asynchronous serial with no clock wire: a start bit, 8 data bits and a stop bit at a pre-agreed speed.',
      'UART holds the line at 1 when idle and sends each byte as a 0 start bit, eight data bits least significant first, and a 1 stop bit. At 115200 baud a bit lasts about 8.68 µs, and with 10 bits per byte that is about 11,520 bytes per second. The receiver syncs on the start bit and samples mid-bit, so clocks that differ by more than 2–3% misread later bits and cause framing errors. The framing stays the same while voltage standards differ: TTL (0/3.3 V), RS-232 (±12 V) and differential, long-range RS-485.', sUart()),
    item('em-spi', 'SPI', 'SPI',
      '클럭, MOSI, MISO, CS 네 선으로 보내면서 동시에 받는 빠른 전이중 직렬 통신이에요.',
      'SPI는 마스터가 만드는 클럭(SCLK)에 맞춰 MOSI로 보내고 MISO로 받으며, CS를 0으로 내려 대화할 장치를 골라요. 클럭마다 한 비트씩 양방향으로 동시에 이동하는 전이중 방식이라, Flash에 ID 읽기 명령 0x9F를 보내는 동안 이어지는 클럭에서 제조사 ID 0xEF가 들어와요. 클럭의 기본 극성과 샘플링 에지(CPOL, CPHA)에 따라 4가지 모드가 있어 장치와 맞춰야 하고, 주소가 없어서 장치마다 CS 선이 따로 필요해요. 수십 MHz까지 빨라서 Flash, 디스플레이, SD 카드에 많이 써요.',
      'Fast full-duplex serial over four wires, clock, MOSI, MISO and CS, sending and receiving at once.',
      'SPI sends on MOSI and receives on MISO in step with a clock (SCLK) driven by the master, which selects a device by pulling its CS low. One bit moves each way on every clock, so while the flash read-ID command 0x9F goes out, the manufacturer ID 0xEF comes back on the following clocks. Four modes follow from the clock’s idle polarity and sampling edge (CPOL, CPHA) and must match the device, and since there are no addresses each device needs its own CS line. Speeds of tens of MHz make it the choice for flash, displays and SD cards.', sSpi()),
    item('em-i2c', 'I2C', 'I2C',
      '두 선을 여러 장치가 공유하고, 7비트 주소와 ACK로 상대를 골라 대화하는 버스예요.',
      'I2C는 SDA(데이터)와 SCL(클럭) 두 선만 쓰고, 오픈 드레인이라 장치는 0만 당기고 1은 풀업 저항이 만들어요. SCL이 1일 때 SDA가 떨어지면 시작 신호이고, 이어서 7비트 주소와 읽기/쓰기 비트를 보내면 주소가 맞는 장치가 9번째 클럭에 SDA를 0으로 당겨 ACK해요. 레지스터 번호를 쓰고 반복 시작으로 읽기로 바꿔 데이터를 받는데, 온도 센서 TMP102는 0x19 0x00을 돌려줘 25.0 °C를 뜻해요. 보통 100 kHz나 400 kHz로 느리지만 선 두 개로 센서 여러 개를 붙일 수 있고, 느린 장치는 SCL을 붙잡아 기다리게 할 수 있어요.',
      'A bus where many devices share two wires and pick each other out with 7-bit addresses and ACKs.',
      'I2C uses just SDA (data) and SCL (clock); lines are open-drain, so devices only pull low and pull-up resistors make the 1s. SDA falling while SCL is high is the start condition, followed by a 7-bit address and a read/write bit, and the device with that address pulls SDA low on the ninth clock to acknowledge. Writing a register number and switching to read with a repeated start returns data; a TMP102 temperature sensor returns 0x19 0x00, meaning 25.0 °C. It is slow, usually 100 or 400 kHz, but hangs many sensors off two wires, and slow devices may hold SCL low to make the master wait.', sI2c()),
    item('em-can', 'CAN 버스', 'The CAN bus',
      '차동 두 선으로 여러 노드가 연결되고, ID를 비트 단위로 비교해 충돌 없이 우선순위대로 보내요.',
      'CAN은 CAN_H와 CAN_L 두 선의 전압 차로 신호를 보내 잡음에 강하고, 버스에서는 0(우성)이 1(열성)을 이겨요. 여러 노드가 동시에 보내기 시작하면 각자 ID를 한 비트씩 내보내며 버스를 읽고, 1을 보냈는데 0이 보이면 즉시 물러나요. 그래서 ID가 가장 작은 메시지가 손실 없이 끝까지 전송되고, ID 자체가 우선순위가 돼요. 프레임에는 0~8바이트 데이터와 CRC, ACK가 있어 오류를 바로 잡고, 자동차 ECU 수십 개가 500 kbit/s 버스 하나를 공유해요. CAN FD는 최대 64바이트와 더 빠른 데이터 구간을 지원해요.',
      'Nodes share two differential wires and compare IDs bit by bit, so messages go out by priority without collisions.',
      'CAN signals with the voltage difference between CAN_H and CAN_L, which shrugs off noise, and on the bus a 0 (dominant) overrides a 1 (recessive). When several nodes start at once, each sends its ID bit by bit while reading the bus and backs off the moment it sends 1 but sees 0. The message with the lowest ID therefore completes without loss, making the ID itself the priority. Frames carry 0–8 data bytes plus a CRC and ACK so errors are caught at once, and dozens of car ECUs share one 500 kbit/s bus; CAN FD extends this to 64 bytes and a faster data phase.', sCan()),
    item('em-ble', 'BLE', 'Bluetooth Low Energy',
      '광고로 찾고 짧은 연결 이벤트로 주고받은 뒤 대부분의 시간을 잠들어 지내는 저전력 무선이에요.',
      'BLE 장치는 광고 채널 37, 38, 39에 짧은 광고 패킷을 수십 ms~수 초마다 뿌리고, 스캔하던 스마트폰이 연결을 요청해요. 연결되면 둘은 7.5 ms~4 s 사이의 연결 간격마다 잠깐 깨어 데이터를 주고받고, 데이터 채널을 바꿔 가며 간섭을 피해요. 데이터는 GATT의 서비스와 특성 트리로 정리되어, 심박 서비스 0x180D의 측정값 특성 0x2A37을 notify로 보내면 표준 앱이 바로 알아봐요. 라디오가 켜진 시간이 1% 남짓이라 코인 전지로도 수개월에서 수년을 버텨요.',
      'Low-power radio that discovers by advertising, exchanges data in brief connection events and sleeps the rest of the time.',
      'A BLE device broadcasts short advertising packets on channels 37, 38 and 39 every tens of milliseconds to several seconds, and a scanning phone requests a connection. Once connected, both wake briefly at each connection interval, between 7.5 ms and 4 s, to exchange data, hopping data channels to avoid interference. Data is organized as a GATT tree of services and characteristics; sending the heart rate service 0x180D’s measurement characteristic 0x2A37 as notifications lets standard apps recognize it instantly. With the radio on about 1% of the time, a coin cell lasts months to years.', sBle())
  ]),
  sec('em-rtos', '실시간 운영체제', 'Real-time operating systems', '제때 끝내는 스케줄링', 'Scheduling to meet deadlines', 'RTOS의 우선순위 선점 스케줄링, Rate Monotonic 스케줄링과 사용률 상한, 우선순위 역전과 상속, 세마포어·mutex·큐, 경성·연성 실시간과 WCET, 그리고 정적 메모리와 스택 관리까지 다뤄요.', 'Preemptive priority scheduling in an RTOS, rate monotonic scheduling and utilization bounds, priority inversion and inheritance, semaphores, mutexes and queues, hard versus soft real time and WCET, and static memory and stack management.', [
    item('em-rtos', 'RTOS 스케줄러', 'The RTOS scheduler',
      '일을 우선순위가 있는 태스크로 나누고, 준비된 태스크 중 가장 높은 것을 항상 먼저 실행해요.',
      'RTOS는 펌웨어를 태스크로 나누고 각 태스크에 우선순위와 자기 스택을 줘요. 스케줄러는 준비된 태스크 중 우선순위가 가장 높은 것을 실행하고, 더 높은 태스크가 준비되면 실행 중인 낮은 태스크를 그 자리에서 선점해요. vTaskDelay나 큐 대기 중인 태스크는 블록 상태라 CPU를 쓰지 않아서 낮은 태스크도 실행 기회를 얻어요. 틱 인터럽트가 시간을 세고, 할 일이 없으면 idle 태스크가 저전력 모드에 들어가며, FreeRTOS, Zephyr, ThreadX가 대표적이에요.',
      'Work is split into prioritized tasks, and the highest-priority ready task always runs first.',
      'An RTOS splits firmware into tasks, each with a priority and its own stack. The scheduler runs the highest-priority ready task and, when a higher one becomes ready, preempts the running lower task on the spot. Tasks waiting in vTaskDelay or on a queue are blocked and use no CPU, giving lower tasks their chance. A tick interrupt keeps time, the idle task can enter low-power mode when nothing is ready, and FreeRTOS, Zephyr and ThreadX are common choices.', sRtos()),
    item('em-rms', 'Rate Monotonic 스케줄링', 'Rate monotonic scheduling',
      '주기가 짧은 태스크에 높은 우선순위를 줘요. 사용률이 상한 이하면 모든 마감이 보장돼요.',
      '주기적인 태스크들에 고정 우선순위를 줄 때는 주기가 짧을수록 높게 주는 Rate Monotonic이 최적이에요. 리우와 레일랜드는 CPU 사용률 U = ΣC/T가 n(2^(1/n) − 1) 이하면 모든 마감을 지킨다는 걸 증명했고, 태스크 2개면 0.828, 많아지면 ln 2 ≈ 0.693으로 줄어요. 이 상한은 충분조건일 뿐이라 넘어도 스케줄 가능할 수 있어서, 이때는 각 태스크의 최악 응답 시간을 직접 계산해 확인해요. 마감이 가까운 순으로 매번 정하는 EDF는 U ≤ 1까지 가능하지만 과부하 때 어떤 태스크가 놓칠지 예측하기 어려워요.',
      'Give shorter-period tasks higher priority; below the utilization bound every deadline is guaranteed.',
      'Among fixed-priority assignments for periodic tasks, rate monotonic, giving shorter periods higher priority, is optimal. Liu and Layland proved that if utilization U = ΣC/T stays below n(2^(1/n) − 1), every deadline is met; the bound is 0.828 for two tasks and approaches ln 2 ≈ 0.693 as tasks multiply. The bound is only sufficient, so a task set above it may still be schedulable, which is checked by computing each task’s worst-case response time. EDF, which always runs the nearest deadline, reaches U ≤ 1, but under overload it is harder to predict which task misses.', sRms()),
    item('em-inversion', '우선순위 역전', 'Priority inversion',
      '낮은 태스크가 쥔 자원 때문에 높은 태스크가 중간 태스크에 밀려요. 우선순위 상속으로 막아요.',
      '낮은 태스크 L이 mutex를 잡은 상태에서 높은 태스크 H가 같은 mutex를 기다리면, H는 L이 놓을 때까지 블록돼요. 여기까지는 정상이지만, mutex와 상관없는 중간 태스크 M이 L을 선점해 오래 돌면 L이 mutex를 놓지 못해 H가 M보다 늦게 실행되는 역전이 일어나요. 1997년 화성 탐사선 패스파인더가 이 문제로 워치독 리셋을 반복했고, 지구에서 우선순위 상속 옵션을 켜서 고쳤어요. 우선순위 상속은 mutex를 쥔 태스크를 기다리는 태스크의 순위로 잠시 올려 빨리 놓게 하고, 임계 구역을 짧게 유지하는 것도 중요해요.',
      'A high-priority task stalls behind a medium one because a low task holds its resource; priority inheritance prevents it.',
      'When a low task L holds a mutex and a high task H waits for it, H blocks until L releases it, which is normal. But if a medium task M, unrelated to the mutex, preempts L and runs on, L cannot release and H ends up running after M: priority inversion. In 1997 Mars Pathfinder kept resetting through its watchdog because of exactly this, and engineers fixed it from Earth by enabling priority inheritance. Inheritance temporarily raises the holder to the waiter’s priority so it releases quickly, and short critical sections matter as well.', sInversion()),
    item('em-sync', '세마포어·mutex·큐', 'Semaphores, mutexes and queues',
      '신호는 세마포어, 데이터 전달은 큐, 공유 자원 보호는 mutex로 해요.',
      'ISR은 오래 일할 수 없으니 이진 세마포어를 give해서 기다리던 태스크를 깨우고 일을 넘겨요. 값 자체를 넘길 때는 큐를 쓰며, 큐는 데이터를 복사해 순서대로 전달하고 비어 있으면 받는 태스크를 블록시켜 바쁜 대기를 없애요. mutex는 공유 자원을 한 번에 한 태스크만 쓰게 하는데, 잡은 태스크만 놓을 수 있고 우선순위 상속이 붙어 있어서 ISR에서는 쓰지 않아요. 여러 잠금을 쓸 때는 항상 같은 순서로 잡아 교착 상태를 피하고, 기다림에는 타임아웃을 줘요.',
      'Semaphores signal, queues carry data, and mutexes guard shared resources.',
      'Since ISRs cannot do long work, they give a binary semaphore to wake a waiting task and hand off. To pass values, use a queue, which copies data in order and blocks the receiver when empty instead of busy-waiting. A mutex lets one task at a time use a shared resource; only the owner can release it and it carries priority inheritance, so it is not used from ISRs. When taking several locks, always take them in the same order to avoid deadlock, and give waits a timeout.', sSync()),
    item('em-realtime', '실시간과 WCET', 'Real time and WCET',
      '실시간은 빠른 게 아니라 항상 제때 끝나는 거예요. 평균이 아니라 최악 실행 시간으로 설계해요.',
      '제어 루프의 응답 시간을 사이클 카운터로 수천 번 재면 평균은 63 µs여도 드물게 145 µs가 나와 120 µs 마감을 넘길 수 있어요. 실시간 시스템은 이런 꼬리까지 포함한 최악 실행 시간(WCET)으로 설계해요. 마감을 놓치면 사고인 에어백·브레이크는 경성, 늦은 결과를 버리는 센서 융합은 준경성, 품질만 떨어지는 영상은 연성 실시간이에요. 꼬리는 캐시 미스, Flash 대기 상태, 다른 인터럽트에서 오므로 핵심 코드를 RAM에서 실행하고 인터럽트 우선순위를 정리해 줄여요.',
      'Real time means always on time, not just fast, so design for the worst-case execution time, not the average.',
      'Timing a control loop thousands of times with the cycle counter may show a 63 µs mean yet a rare 145 µs that breaks a 120 µs deadline. Real-time systems are designed around the worst-case execution time (WCET), tails included. Airbags and brakes, where a miss is an accident, are hard real time; sensor fusion that discards late results is firm; video that merely degrades is soft. Tails come from cache misses, flash wait states and other interrupts, so critical code runs from RAM and interrupt priorities are tidied up.', sRealtime()),
    item('em-static', '정적 메모리와 스택', 'Static memory and stacks',
      '동적 할당 대신 정적 배열과 고정 블록 풀을 쓰고, 스택 사용량을 측정해 넘침을 막아요.',
      'malloc과 free를 오래 반복하면 빈 공간이 조각나서 합계는 충분해도 큰 블록 요청이 예측할 수 없는 순간에 실패해요. 그래서 펌웨어는 필요한 메모리를 빌드 때 정하는 정적 배열이나 같은 크기 블록 풀을 써서 단편화를 없애고 할당 시간을 일정하게 해요. 태스크 스택은 0xA5 같은 패턴으로 칠해 두고, 덮어쓰인 깊이로 최대 사용량(최고 수위)을 확인해 크기를 정해요. 스택이 넘치면 옆 메모리를 조용히 망가뜨리므로 MPU 가드 영역이나 카나리로 넘치는 순간 폴트가 나게 해요.',
      'Use static arrays and fixed-size pools instead of dynamic allocation, and measure stack usage to stop overflows.',
      'Long-running malloc and free fragment the heap, so a large request can fail at an unpredictable moment even with enough total space. Firmware therefore fixes its memory at build time with static arrays or pools of equal-size blocks, eliminating fragmentation and making allocation time constant. Task stacks are painted with a pattern such as 0xA5, and the depth of overwriting reveals peak usage, the high-water mark, used to size them. A stack overflow silently corrupts neighboring memory, so an MPU guard region or canary makes it fault the moment it happens.', sStatic())
  ]),
  sec('em-hw', '하드웨어와 신뢰성', 'Hardware and reliability', '오래, 안전하게 동작하기', 'Running long and safely', '배터리 수명을 계산하는 저전력 설계, FPU 없는 칩의 고정소수점 연산, 안전한 펌웨어 업데이트(OTA), JTAG·SWD 디버깅과 로직 분석기, 그리고 HardFault 분석과 고장 대응까지 다뤄요.', 'Low-power design with battery-life math, fixed-point arithmetic on chips without an FPU, safe firmware updates (OTA), JTAG/SWD debugging and logic analyzers, and HardFault analysis and failure handling.', [
    item('em-power', '저전력 설계', 'Low-power design',
      '대부분 잠들고 잠깐 깨서 일해요. 평균 전류는 시간 가중 평균이라 깨어 있는 시간을 줄이는 게 핵심이에요.',
      '배터리 장치는 깨어 있을 때 10 mA, 잘 때 5 µA처럼 수천 배 차이가 나는 상태를 오가요. 평균 전류는 각 상태의 전류에 시간 비율을 곱해 더한 값이라, 1초에 10 ms 깨면 10 × 0.01 + 0.005 × 0.99 ≈ 0.105 mA가 되고 220 mAh 코인 전지로 약 2100시간, 87일을 가요. 10초에 한 번 5 ms만 깨면 평균이 약 0.01 mA로 떨어져 2년 넘게 버텨요. 깨는 빈도와 시간을 줄이고, 안 쓰는 주변장치의 클럭을 끄고, 레귤레이터의 대기 전류와 누설까지 따져야 실제 수명이 나와요.',
      'Sleep most of the time and wake briefly. Average current is time-weighted, so cutting awake time is what matters.',
      'Battery devices alternate between states thousands of times apart, such as 10 mA awake and 5 µA asleep. Average current is each state’s current times its share of time, so waking 10 ms per second gives 10 × 0.01 + 0.005 × 0.99 ≈ 0.105 mA, about 2,100 hours or 87 days from a 220 mAh coin cell. Waking for 5 ms every 10 s drops the average to about 0.01 mA and stretches it past two years. Real lifetimes also depend on gating unused peripheral clocks and on regulator quiescent current and leakage.', sPower()),
    item('em-fixed', '고정소수점', 'Fixed-point arithmetic',
      '정수에 소수점 위치를 약속해 두고 정수 연산만으로 실수를 계산해요. FPU가 없는 MCU에서 빠르고 정확해요.',
      'Q15 형식은 16비트 정수를 32768로 나눈 값으로 보고 −1 이상 1 미만을 1/32768 간격으로 표현해요. 0.5는 16384, 0.25는 8192이고, 곱하면 소수 자리가 30비트가 되니 32비트로 곱한 뒤 15비트 오른쪽으로 밀어 4096, 즉 0.125를 얻어요. 더해서 범위를 넘으면 0.75 + 0.5가 −0.75로 뒤집히므로 최댓값에서 멈추는 포화 연산을 써요. FPU가 없는 Cortex-M0, 오디오 필터, 제어기에 쓰이고, ARM의 DSP 명령은 Q15 곱셈-누산을 한 번에 처리해요.',
      'Agree on where the binary point sits and compute with integers only; fast and exact on MCUs without an FPU.',
      'The Q15 format treats a 16-bit integer as that integer divided by 32768, covering −1 up to just below 1 in steps of 1/32768. 0.5 is 16384 and 0.25 is 8192, and since their product has 30 fraction bits, multiplying in 32 bits and shifting right by 15 yields 4096, which is 0.125. Overflowing the range flips the sign, turning 0.75 + 0.5 into −0.75, so saturating arithmetic clamps at the maximum. It is used on FPU-less Cortex-M0 parts, in audio filters and controllers, and ARM DSP instructions do Q15 multiply-accumulate in one step.', sFixed()),
    item('em-ota', '부트로더와 OTA', 'Bootloaders and OTA updates',
      'Flash를 두 슬롯으로 나눠 새 펌웨어를 받고, 서명을 확인한 뒤 시험 부팅해서 문제가 있으면 롤백해요.',
      'A/B 방식은 현재 펌웨어가 슬롯 A에서 돌아가는 동안 새 이미지를 슬롯 B에 받아요. 부트로더나 업데이트 코드는 이미지의 해시와 제조사 서명을 공개 키로 확인해서 서명이 없는 악성 펌웨어를 거부해요. B를 시험 중으로 표시하고 재부팅하면 부트로더가 B를 실행해 보고, 새 펌웨어가 스스로 정상임을 확인(confirm)해야 확정돼요. 확인 전에 멈추거나 워치독 리셋이 일어나면 A로 롤백하므로 도중에 전원이 꺼져도 장치가 벽돌이 되지 않고, 버전 카운터로 구버전으로 되돌리는 공격도 막아요.',
      'Split flash into two slots, download into one, verify the signature, trial-boot it and roll back on failure.',
      'In an A/B scheme the new image downloads into slot B while the current firmware keeps running from slot A. The bootloader or updater checks the image’s hash and the vendor’s signature with a public key, rejecting unsigned, malicious firmware. B is marked as pending and the device reboots into it, and only when the new firmware confirms itself healthy does it become permanent. A hang or watchdog reset before confirmation rolls back to A, so even a power cut midway never bricks the device, and a version counter blocks downgrade attacks.', sOta()),
    item('em-debug', 'JTAG·SWD 디버깅', 'JTAG and SWD debugging',
      '디버그 프로브와 GDB로 CPU를 멈추고 레지스터와 메모리를 보며, 로직 분석기로 실제 파형을 확인해요.',
      'ST-LINK나 J-Link 같은 디버그 프로브가 SWD의 두 선(SWDIO, SWCLK)으로 MCU의 디버그 포트에 붙고, OpenOCD가 이를 GDB 서버로 열어 줘요. Flash에서 실행되는 코드에는 하드웨어 중단점을 쓰는데 Cortex-M4에는 비교기가 6개 있고, 멈추면 레지스터, 변수, 호출 스택을 볼 수 있어요. 감시점은 특정 변수에 쓰는 순간 멈춰서 값을 망가뜨리는 코드를 찾는 데 좋아요. 타이밍이나 통신 문제는 로직 분석기로 핀 파형을 기록해 UART나 SPI를 해석해 보고, 양산 제품은 디버그 포트를 읽기 보호로 잠가요.',
      'Halt the CPU and inspect registers and memory with a debug probe and GDB, and check real waveforms with a logic analyzer.',
      'A debug probe such as an ST-LINK or J-Link attaches to the MCU’s debug port over the two SWD wires (SWDIO, SWCLK), and OpenOCD exposes it as a GDB server. Code running from flash uses hardware breakpoints, of which a Cortex-M4 has six comparators, and a halted CPU reveals registers, variables and the call stack. Watchpoints halt the moment a variable is written, ideal for catching whatever corrupts it. Timing and communication bugs call for a logic analyzer that records pin waveforms and decodes UART or SPI, and production units lock the debug port with read-out protection.', sDebug()),
    item('em-fault', 'HardFault와 고장 대응', 'HardFaults and failure handling',
      '폴트가 나면 스택에 쌓인 PC와 원인 레지스터로 위치와 이유를 찾고, 안전한 상태로 만든 뒤 재시작해요.',
      '잘못된 포인터로 없는 주소에 쓰면 버스 폴트가 나고, 처리기가 없으면 HardFault로 올라가요. CPU는 예외 직전에 레지스터 8개를 스택에 쌓으므로 sp[6]의 PC 값을 addr2line에 넣으면 문제가 된 소스 줄이 나와요. CFSR 레지스터는 원인을 비트로 알려 주는데, PRECISERR와 BFARVALID가 켜져 있으면 BFAR에 문제의 주소가 들어 있어요. 현장에서는 리셋 후에도 남는 RAM에 로그를 남기고, 모터나 히터 같은 출력을 안전 상태로 둔 뒤 재시작하며, 전압이 떨어지면 브라운아웃 감지가 칩을 리셋해요.',
      'On a fault, the stacked PC and the cause registers reveal where and why; make outputs safe, then restart.',
      'Writing through a bad pointer to an unmapped address raises a bus fault, which escalates to HardFault if no handler is enabled. The CPU stacks eight registers just before the exception, so passing the PC at sp[6] to addr2line names the faulting source line. The CFSR register reports the cause in bits; with PRECISERR and BFARVALID set, BFAR holds the offending address. In the field, log to RAM that survives reset, put outputs such as motors and heaters in a safe state and restart, while a brown-out detector resets the chip when the supply sags.', sFault())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
