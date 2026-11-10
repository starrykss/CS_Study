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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'nxx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono nxx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono nxx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c nxx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono nxx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c nxx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'nxx-s nxx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono nxx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono nxx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono nxx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono nxx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono nxx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'nxx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'nxx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'nxx-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono nxx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'nxx-a', g: 'nxx-g', r: 'nxx-r', w: 'nxx-w', m: 'cz-mono', s: 'nxx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'nxx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono nxx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono nxx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'nxx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.nxx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.nxx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.nxx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.nxx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.nxx-r .in{color:var(--danger);font-weight:800}
.nxx-g .in{color:var(--ok);font-weight:800}
.nxx-a .in{color:var(--accent);font-weight:800}
.nxx-w .in{color:var(--warn);font-weight:800}
.nxx-c .in{font-size:.6em;font-weight:700}
.nxx-c2 .in{font-size:.5em;font-weight:700}
.nxx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.nxx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.nxx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Next.js · 1. routing ===== */
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc nxx-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
/* a mock browser address bar */
const urlBar = (S, k, x, y, w, url, st, o = {}) => { sw(S, k, x, y, w, 1.1, 'var(--ui)', st, { off: o.off, r: .55, css: 'border:.08em solid var(--line)' }); T(S, k + 't', x + .5, y + .2, url, 'cz-mono nxx-xs', st, { off: o.off }); };

function sAppRouter() {
  return CW('next-approuter', {
    code: ['app/', '├─ page.tsx            →  /', '├─ about/page.tsx      →  /about', '├─ blog/', '│  ├─ page.tsx         →  /blog', '│  └─ [slug]/page.tsx  →  /blog/:slug', '└─ api/hello/route.ts  →  /api/hello', 'export default function Page() {', '  return <h1>About</h1>;', '}'],
    hl: [[1, 2], [3, 3, 'ok'], [6, 1, 'warn'], [7, 3]],
    draw: (S) => {
      const X = 19.4;
      urlBar(S, 'u1', X, .8, 12.0, 'example.com/about', 1, { off: 2 }); nd(S, 'p1', X, 2.4, 12.0, 'app/about/page.tsx', 'accent', 1, { off: 2 });
      urlBar(S, 'u2', X, .8, 12.0, 'example.com/blog/hello', 2, { off: 3 }); nd(S, 'p2', X, 2.4, 12.0, 'app/blog/[slug]/page.tsx', 'ok', 2, { off: 3 }); lbl(S, 'p2l', X, 3.9, 'slug = "hello"', 'm g', 2, { off: 3 });
      urlBar(S, 'u3', X, .8, 12.0, 'GET /api/hello', 3, { off: 4 }); nd(S, 'p3', X, 2.4, 12.0, ['route.ts → JSON 응답', 'route.ts → a JSON response'], 'warn', 3, { off: 4 });
      lbl(S, 'n1', X, 5.4, ['폴더 = URL 경로 · page.tsx가 있어야 공개돼요', 'folders are paths; page.tsx makes one public'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 5.4, ['[대괄호] 폴더는 그 자리의 값을 받아요', '[bracket] folders capture that segment'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.4, ['route.ts는 화면 대신 HTTP 응답', 'route.ts answers with HTTP, not a page'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 1.0, ['page는 기본이 서버 컴포넌트', 'pages are server components by default'], 'a', 4); lbl(S, 'n5', X, 2.1, ['default export 하나가 그 화면', 'its default export is the screen'], '', 4);
    },
    notes: [['App Router에서는 app 폴더 구조가 곧 URL이에요 · 폴더에 page.tsx가 있어야 그 경로가 공개돼요', 'in the App Router, the app folder structure is the URL, and a folder becomes public only with a page.tsx'], ['폴더를 중첩하면 경로도 중첩되고, [slug]처럼 대괄호 폴더는 그 자리에 오는 값을 받아요', 'nested folders nest paths, and bracketed folders such as [slug] capture whatever value sits there'], ['route.ts는 화면 대신 HTTP 요청에 응답하는 API 엔드포인트예요', 'route.ts is an API endpoint that answers HTTP requests instead of rendering a page'], ['page.tsx의 default export가 그 경로의 화면이고, 기본적으로 서버 컴포넌트예요', 'page.tsx’s default export is the screen for that path, a server component by default']],
    fin: [['파일 기반 라우팅: 라우터 설정 대신 폴더와 파일 이름 규칙으로 경로를 정의해요', 'file-based routing defines routes through folder and file naming conventions instead of router configuration', 'nxx-xs nxx-a'], ['page·layout·loading·error·route 같은 특수 파일 이름이 정해져 있어요', 'special file names such as page, layout, loading, error and route have fixed roles'], ['컴포넌트나 유틸 파일을 같은 폴더에 둬도 page가 아니면 공개되지 않아요', 'components and utilities can live alongside; without page they are never public']],
    caps: [['폴더 = 경로', 'Folders are paths'], ['동적 세그먼트', 'Dynamic segments'], ['route.ts', 'route.ts'], ['page 컴포넌트', 'Page components'], ['파일 기반 라우팅', 'File-based routing']]
  });
}

function sLayout() {
  return CW('next-layout', {
    code: [['// app/layout.tsx · 루트 레이아웃(필수)', '// app/layout.tsx · root layout (required)'], 'export default function Root({ children }) {', '  return (<html><body>', '    <Nav />{children}', '  </body></html>);', '}', '// app/dashboard/layout.tsx', 'export default function Dash({ children }) {', '  return <><Sidebar />{children}</>;', '}'],
    hl: [[0, 6], [6, 4, 'ok'], null, null],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'rt', X, .8, 12.0, 8.4, 'accent', 0, { w: .1 }); lbl(S, 'rtl', X + .3, .9, 'RootLayout', 'm a', 0); nd(S, 'nav', X + .4, 1.8, 11.2, 'Nav', 'accent', 0, { h: 1.0 });
      frame(S, 'dl', X + .4, 3.2, 11.2, 5.6, 'ok', 2, { w: .1 }); lbl(S, 'dll', X + .7, 3.3, 'Dash layout', 'm g', 2); nd(S, 'sb', X + .8, 4.2, 3.0, 'Sidebar', 'ok', 2, { h: 4.2 });
      nd(S, 'pg1', X + 4.2, 4.2, 7.0, ['page: /dashboard', 'page: /dashboard'], 'line', 1, { off: 3, h: 4.2 });
      nd(S, 'pg2', X + 4.2, 4.2, 7.0, ['page: /settings', 'page: /settings'], 'warn', 3, { h: 4.2 });
      lbl(S, 'n1', X, 9.8, ['모든 페이지를 감싸는 틀 · html과 body를 여기서', 'wraps every page; html and body live here'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 9.8, ['폴더마다 레이아웃을 겹겹이 중첩해요', 'layouts nest folder by folder'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 9.8, ['이동하면 page만 바뀌고 레이아웃은 그대로', 'navigating swaps only the page'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.8, ['Sidebar의 상태·스크롤이 유지돼요', 'Sidebar keeps its state and scroll'], 'g', 4, { w: 12 }); lbl(S, 'n5', X, 10.9, ['매번 새로 만들려면 template.tsx', 'use template.tsx to remount each time'], '', 4, { w: 12 });
    },
    notes: [['루트 layout.tsx는 모든 페이지를 감싸는 틀이에요 · <html>과 <body>, 공통 내비게이션을 여기에 둬요', 'the root layout.tsx wraps every page and holds <html>, <body> and shared navigation'], ['폴더마다 layout.tsx를 두면 레이아웃이 겹겹이 중첩돼요 · dashboard 아래에는 Sidebar가 추가돼요', 'a layout.tsx in each folder nests another layer, adding a Sidebar under dashboard'], ['같은 레이아웃 아래에서 이동하면 page 부분만 바뀌고 레이아웃은 다시 렌더되지 않아요', 'navigating within a layout swaps only the page; the layout does not re-render'], ['그래서 Sidebar의 입력값이나 스크롤 위치가 유지돼요 · 매번 새로 만들고 싶다면 template.tsx를 써요', 'so the Sidebar keeps its inputs and scroll position; template.tsx remounts on every navigation instead']],
    fin: [['레이아웃: 여러 페이지가 공유하는 UI 틀 · 내비게이션 사이에 상태를 유지하고 다시 렌더되지 않아요', 'layouts are UI shells shared by several pages, keeping state across navigations without re-rendering', 'nxx-xs nxx-a'], ['레이아웃은 현재 경로의 params는 받지만 searchParams는 받지 않아요', 'layouts receive params but not searchParams'], ['공유 레이아웃은 프리페치 때 한 번만 내려받아요(Next 16)', 'shared layouts download once during prefetching (Next 16)']],
    caps: [['루트 레이아웃', 'The root layout'], ['중첩 레이아웃', 'Nested layouts'], ['page만 교체', 'Swapping only the page'], ['유지되는 상태', 'Preserved state'], ['레이아웃', 'Layouts']]
  });
}

function sDynamic() {
  return CW('next-dynamic', {
    code: ['// app/blog/[slug]/page.tsx', 'export default async function Post(props) {', '  const { slug } = await props.params;', '  const post = await getPost(slug);', '  if (!post) notFound();', '  return <Article post={post} />;', '}', 'export async function generateStaticParams() {', '  const posts = await getPosts();', '  return posts.map((p) => ({ slug: p.slug }));', '}', ['// [...slug] 여러 단계 · [[...slug]] 선택적', '// [...slug] many · [[...slug]] optional']],
    hl: [[0, 3], [3, 2, 'warn'], [7, 4, 'ok'], [11, 1]],
    draw: (S) => {
      const X = 19.4;
      urlBar(S, 'u1', X, .8, 12.0, '/blog/hello-next', 1, { off: 2 }); lbl(S, 'v1', X, 2.4, 'params = Promise<{ slug: "hello-next" }>', 'm g', 1, { off: 2 });
      lbl(S, 'n1', X, 3.6, ['Next 15부터 params는 await해서 꺼내요', 'since Next 15, params is awaited'], 'a', 1, { off: 2 });
      urlBar(S, 'u2', X, .8, 12.0, '/blog/no-such-post', 2, { off: 3 }); nd(S, 'nf', X, 2.4, 12.0, '404 · not-found.tsx', 'danger', 2, { off: 3 });
      ['hello', 'react', 'css'].forEach((t, i) => nd(S, 'g' + i, X + i * 4.1, 1.0, 3.8, '/blog/' + t, 'ok', 3, { off: 4 }));
      lbl(S, 'n3', X, 2.6, ['빌드 때 미리 HTML로 만들어 둬요', 'prebuilt as HTML at build time'], 'g', 3, { off: 4 });
      [['/docs/a/b/c', '[...slug] → ["a","b","c"]'], ['/docs', '[[...slug]] → undefined']].forEach(([u, v], i) => { urlBar(S, 'cu' + i, X, .8 + i * 2.6, 5.4, u, 4); lbl(S, 'cv' + i, X, 2.1 + i * 2.6, v, 'm', 4); });
    },
    notes: [['[slug] 폴더는 URL의 그 자리 값을 params로 받아요 · Next 15부터 params는 Promise라 await해서 꺼내요', 'a [slug] folder receives that part of the URL in params, which since Next 15 is a promise to await'], ['데이터가 없으면 notFound()를 불러 404 화면(not-found.tsx)을 보여줘요', 'when there is no data, calling notFound() shows the 404 screen from not-found.tsx'], ['generateStaticParams로 가능한 slug 목록을 알려 주면 빌드 때 미리 HTML을 만들어 둬요', 'listing the possible slugs in generateStaticParams prebuilds their HTML at build time'], ['[...slug]는 여러 단계를 배열로 받고, [[...slug]]는 세그먼트가 없어도 매칭돼요', '[...slug] captures several levels as an array, and [[...slug]] also matches with no segment']],
    fin: [['동적 라우트: [이름] 폴더로 URL의 일부를 매개변수로 받는 라우트', 'dynamic routes capture part of the URL as a parameter through [name] folders', 'nxx-xs nxx-a'], ['searchParams(?q=)도 Promise로 받아요 · 쓰면 그 페이지는 동적 렌더링이 돼요', 'searchParams (?q=) also arrives as a promise, and using it makes the page dynamic'], ['dynamicParams = false면 목록에 없는 경로는 404', 'with dynamicParams = false, paths not listed return 404']],
    caps: [['params', 'params'], ['notFound()', 'notFound()'], ['generateStaticParams', 'generateStaticParams'], ['catch-all', 'Catch-all segments'], ['동적 라우트', 'Dynamic routes']]
  });
}

function sLink() {
  return CW('next-link', {
    code: ['import Link from "next/link";', ['<Link href="/blog/hello">글 보기</Link>', '<Link href="/blog/hello">Read</Link>'], ['// 화면에 보이면 미리 가져와요(prefetch)', '// prefetched once visible'], '"use client";', 'const router = useRouter();', 'router.push("/login");', ['const path = usePathname();   // 현재 경로', 'const path = usePathname();   // current path'], 'const sp = useSearchParams(); // ?q=…'],
    hl: [[0, 2], [2, 1, 'ok'], [1, 1], [3, 5]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'a0', X, .7, ['<a> 태그로 이동하면', 'with a plain <a>'], 'r', 1, { off: 2 }); sw(S, 'wh', X, 1.7, 12.0, 4.0, 'var(--ui)', 1, { off: 2, css: 'border:.1em solid var(--line)' }); cl(S, 'whl', X, 3.3, 12.0, ['페이지 전체 새로고침 · JS 다시 실행', 'full reload, JS runs again'], 'r', 1, { off: 2 });
      ['/', '/blog', '/about'].forEach((t, i) => { nd(S, 'l' + i, X + i * 4.1, 1.0, 3.8, t, 'line', 2, { off: 3 }); });
      tsets(S, 'l1', [[2, 'ok', 40]]); tsets(S, 'l2', [[2, 'ok', 40]]); lbl(S, 'n2', X, 2.6, ['보이는 링크의 데이터를 미리 받아 둬요', 'visible links are fetched ahead'], 'g', 2, { off: 3 });
      frame(S, 'lay', X, 1.0, 12.0, 5.0, 'accent', 3, { w: .1, off: 4 }); lbl(S, 'layl', X + .3, 1.1, ['레이아웃 유지', 'layout kept'], 'a', 3, { off: 4 }); nd(S, 'np', X + .6, 2.2, 10.8, ['바뀐 부분만 교체', 'only the changed part swaps'], 'ok', 3, { off: 4, h: 3.2 });
      lbl(S, 'n4', X, 1.0, ['코드에서 이동: router.push', 'navigate in code with router.push'], 'a', 4); lbl(S, 'n5', X, 2.1, ['훅은 클라이언트 컴포넌트에서만', 'hooks only in client components'], 'w', 4);
    },
    notes: [['<Link>는 <a> 태그를 그리되, 클릭하면 새로고침 없이 클라이언트에서 이동해요', '<Link> renders an <a>, but clicking it navigates on the client without a reload'], ['화면에 보이는 Link는 이동할 페이지 데이터를 미리 받아 둬서 클릭하면 바로 열려요(프리페치)', 'links in the viewport prefetch their destination so clicks open instantly'], ['이동할 때는 공유 레이아웃은 그대로 두고 바뀐 세그먼트만 받아서 교체해요', 'on navigation, shared layouts stay and only the changed segments are fetched and swapped'], ['코드에서 이동할 땐 useRouter().push, 현재 경로는 usePathname, 쿼리는 useSearchParams를 써요', 'navigate in code with useRouter().push, and read the path with usePathname and the query with useSearchParams']],
    fin: [['Link: 클라이언트 측 내비게이션과 프리페치를 해 주는 Next.js의 링크 컴포넌트', 'Link is Next.js’s link component providing client-side navigation and prefetching', 'nxx-xs nxx-a'], ['외부 사이트 링크는 평범한 <a>를 써요', 'use a plain <a> for external sites'], ['서버에서는 redirect()로 이동시켜요', 'on the server, redirect() sends users elsewhere']],
    caps: [['a 태그와의 차이', 'Unlike a plain anchor'], ['프리페치', 'Prefetching'], ['부분 교체', 'Partial swaps'], ['코드로 이동', 'Navigating in code'], ['Link와 내비게이션', 'Link and navigation']]
  });
}

function sSpecial() {
  return CW('next-special', {
    code: ['app/dashboard/', '├─ layout.tsx', '├─ loading.tsx     // <Suspense fallback>', '├─ error.tsx       // <ErrorBoundary>', ['├─ not-found.tsx   // notFound() 때', '├─ not-found.tsx   // on notFound()'], '└─ page.tsx', ['// error.tsx는 클라이언트 컴포넌트', '// error.tsx must be a client component'], '"use client";', 'export default function Error({ reset }) {'],
    hl: [[0, 6], [2, 1, 'ok'], [3, 1, 'danger'], [4, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'f0', X, .8, 12.0, 7.6, 'accent', 1, { w: .1 }); lbl(S, 'f0l', X + .3, .9, 'layout', 'm a', 1);
      frame(S, 'f1', X + .5, 1.9, 11.0, 6.1, 'danger', 1, { w: .1, dash: 1 }); lbl(S, 'f1l', X + .8, 2.0, ['error.tsx = ErrorBoundary', 'error.tsx = ErrorBoundary'], 'm r', 1);
      frame(S, 'f2', X + 1.0, 3.0, 10.0, 4.6, 'ok', 1, { w: .1, dash: 1 }); lbl(S, 'f2l', X + 1.3, 3.1, ['loading.tsx = Suspense', 'loading.tsx = Suspense'], 'm g', 1);
      nd(S, 'pg', X + 1.5, 4.2, 9.0, 'page', 'line', 1, { h: 3.0 });
      nd(S, 'ld', X + 1.5, 4.2, 9.0, ['⏳ 로딩 중…', '⏳ Loading…'], 'ok', 2, { off: 3, h: 3.0 });
      nd(S, 'er', X + 1.5, 4.2, 9.0, ['⚠ 오류 · 다시 시도(reset)', '⚠ Error · retry (reset)'], 'danger', 3, { off: 4, h: 3.0 });
      nd(S, 'nf', X + 1.5, 4.2, 9.0, ['404 · 찾을 수 없어요', '404 · not found'], 'warn', 4, { h: 3.0 });
      lbl(S, 'n1', X, 9.0, ['특수 파일이 자동으로 감싸는 순서', 'how special files wrap the page'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 9.0, ['데이터를 기다리는 동안 loading 화면', 'loading shows while data is awaited'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 9.0, ['오류가 나면 레이아웃은 살리고 그 안만 교체', 'on error, only the inside is replaced'], 'r', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.0, ['notFound()를 부르면 404 화면', 'notFound() shows the 404 screen'], 'w', 4);
    },
    notes: [['폴더에 특수 파일을 두면 Next.js가 page를 layout > error > loading 순서로 자동으로 감싸요', 'special files in a folder make Next.js wrap the page as layout > error > loading automatically'], ['loading.tsx는 Suspense의 fallback이 되어, 데이터를 기다리는 동안 바로 보여줘요', 'loading.tsx becomes the Suspense fallback, shown immediately while data loads'], ['error.tsx는 Error Boundary가 되어 오류가 난 부분만 대체하고, reset()으로 다시 시도해요 · 클라이언트 컴포넌트여야 해요', 'error.tsx becomes an error boundary that replaces just the failing part and retries with reset(); it must be a client component'], ['notFound()를 부르면 가장 가까운 not-found.tsx가 404 화면으로 보여요', 'calling notFound() renders the nearest not-found.tsx as the 404 screen']],
    fin: [['특수 파일: 로딩·오류·404 처리를 파일 이름 규칙으로 선언하는 App Router의 기능', 'special files declare loading, error and 404 handling through file naming conventions', 'nxx-xs nxx-a'], ['루트 레이아웃 자체의 오류는 global-error.tsx로 잡아요', 'errors in the root layout itself are caught by global-error.tsx'], ['세그먼트마다 따로 두면 화면 일부만 로딩·오류 상태가 돼요', 'per-segment files keep loading and errors local to that part of the screen']],
    caps: [['감싸는 순서', 'The wrapping order'], ['loading.tsx', 'loading.tsx'], ['error.tsx', 'error.tsx'], ['not-found.tsx', 'not-found.tsx'], ['loading·error·not-found', 'loading, error and not-found']]
  });
}

function sGroups() {
  return CW('next-groups', {
    code: ['app/', '├─ (marketing)/about/page.tsx  →  /about', '├─ (shop)/cart/page.tsx        →  /cart', ['├─ _components/Button.tsx  // 라우트 아님', '├─ _components/Button.tsx  // not a route'], '├─ @modal/(.)photo/[id]/page.tsx', '├─ photo/[id]/page.tsx', ['└─ layout.tsx  // { children, modal }', '└─ layout.tsx  // { children, modal }']],
    hl: [[1, 2, 'ok'], [3, 1], [4, 1, 'warn'], [4, 2, 'warn']],
    side: [
      [[['(괄호) 폴더는 URL에 안 나타나요', '(parens) folders stay out of the URL'], 'a'], [['영역별로 다른 레이아웃 적용', 'different layouts per area'], 'g']],
      [[['_밑줄 폴더는 라우팅에서 제외', '_underscore folders are not routed'], 'a'], [['컴포넌트를 가까이 두기 좋아요', 'keep components close by'], '']],
      [[['@슬롯: 한 화면에 여러 페이지를', '@slots render several pages at once'], 'w'], [['레이아웃이 children, modal로 받아요', 'the layout receives children and modal'], '']],
      [[['(.) 가로채기: 목록에서 누르면 모달', '(.) intercepts: a modal from the list'], 'w'], [['새로고침·공유 링크는 전체 페이지', 'refresh or shared links: full page'], 'g']]
    ],
    notes: [['괄호로 감싼 폴더는 라우트 그룹이라 URL에 나타나지 않아요 · 마케팅과 쇼핑 영역에 다른 레이아웃을 줄 때 써요', 'folders in parentheses are route groups that never appear in the URL, useful for giving marketing and shop areas different layouts'], ['밑줄로 시작하는 폴더는 라우팅에서 빠져서, 컴포넌트를 라우트 가까이 정리해 두기 좋아요', 'folders starting with an underscore are excluded from routing, handy for keeping components near their routes'], ['@로 시작하는 슬롯은 병렬 라우트예요 · 레이아웃이 children과 modal을 동시에 받아 함께 그려요', 'slots starting with @ are parallel routes; the layout receives children and modal and renders both'], ['(.)photo 같은 가로채기 라우트는 앱 안에서 누르면 모달로, 새로고침하면 전체 페이지로 보여줘요', 'intercepting routes such as (.)photo show a modal on in-app navigation and the full page on refresh']],
    fin: [['라우트 그룹·비공개 폴더·병렬 라우트·가로채기 라우트: URL과 화면 구성을 분리하는 고급 라우팅 도구', 'route groups, private folders, parallel routes and intercepting routes separate URLs from screen composition', 'nxx-xs nxx-a'], ['Next 16부터 병렬 라우트 슬롯에는 default.tsx가 필수예요', 'since Next 16, parallel route slots require a default.tsx'], ['사진 갤러리, 로그인 모달처럼 URL로 공유 가능한 모달에 잘 맞아요', 'they suit shareable-URL modals such as photo galleries and login dialogs']],
    caps: [['라우트 그룹', 'Route groups'], ['비공개 폴더', 'Private folders'], ['병렬 라우트', 'Parallel routes'], ['가로채기 라우트', 'Intercepting routes'], ['그룹·병렬·가로채기 라우트', 'Groups, parallel and intercepting routes']]
  });
}

function sProxy() {
  return CW('next-proxy', {
    code: [['// proxy.ts (Next 16, 옛 middleware.ts)', '// proxy.ts (Next 16, was middleware.ts)'], 'export function proxy(req: NextRequest) {', '  const token = req.cookies.get("session");', '  if (!token && req.nextUrl.pathname', '      .startsWith("/dashboard")) {', '    return NextResponse.redirect(', '      new URL("/login", req.url));', '  }', '  return NextResponse.next();', '}', 'export const config = {', '  matcher: ["/dashboard/:path*"] };'],
    hl: [[0, 2], [2, 1], [3, 4, 'warn'], [10, 2, 'ok']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'br', X, 1.0, 3.2, ['브라우저', 'browser'], 'line', 0); nd(S, 'px', X + 4.4, 1.0, 3.2, 'proxy', 'accent', 0); nd(S, 'rt', X + 8.8, 1.0, 3.2, ['라우트', 'route'], 'ok', 0);
      ar(S, 'a1', [X + 3.3, 1.55], [X + 4.3, 1.55], 'ink-3', 0, { h: .1 }); ar(S, 'a2', [X + 7.7, 1.55], [X + 8.7, 1.55], 'ok', 0, { h: .1 });
      lbl(S, 'n1', X, 2.8, ['요청이 라우트에 닿기 전에 먼저 실행', 'runs before the request reaches a route'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 2.8, ['쿠키·헤더·경로를 읽을 수 있어요', 'it can read cookies, headers and paths'], 'a', 2, { off: 3, w: 12 });
      nd(S, 'lg', X + 4.4, 3.4, 3.2, '/login', 'warn', 3); ar(S, 'a3', [X + 6.0, 2.2], [X + 6.0, 3.3], 'warn', 3, { h: .1 }); lbl(S, 'n3', X, 5.0, ['세션이 없으면 /login으로 돌려보내요', 'no session: redirect to /login'], 'w', 3, { off: 4 });
      lbl(S, 'n4', X, 5.0, ['matcher로 필요한 경로에만 실행', 'matcher limits which paths run it'], 'g', 4); lbl(S, 'n5', X, 6.1, ['빠른 1차 검사일 뿐 · 진짜 권한 확인은 서버에서', 'a quick first check; verify again on the server'], 'r', 4, { w: 12 });
    },
    notes: [['proxy.ts는 요청이 페이지나 API에 닿기 전에 먼저 실행돼요 · Next 16에서 middleware.ts의 새 이름이에요', 'proxy.ts runs before requests reach pages or APIs; it is Next 16’s new name for middleware.ts'], ['요청의 쿠키, 헤더, 경로를 읽어 무엇을 할지 정해요', 'it reads the request’s cookies, headers and path to decide what to do'], ['세션 쿠키가 없으면 /login으로 리다이렉트하고, 있으면 NextResponse.next()로 통과시켜요 · rewrite로 다른 경로를 보여줄 수도 있어요', 'without a session cookie it redirects to /login, otherwise NextResponse.next() lets it through; rewrite can serve another path'], ['matcher로 실행 범위를 좁혀요 · proxy 검사는 빠른 1차 관문일 뿐, 데이터 접근 시 서버에서 다시 확인해야 해요', 'matcher narrows where it runs; the proxy check is only a quick first gate, and data access must verify again on the server']],
    fin: [['proxy(미들웨어): 모든 요청 앞에서 리다이렉트·리라이트·헤더 수정을 하는 네트워크 경계', 'the proxy (formerly middleware) is a network boundary that redirects, rewrites and edits headers ahead of every request', 'nxx-xs nxx-a'], ['proxy.ts는 Node.js 런타임에서 실행돼요', 'proxy.ts runs on the Node.js runtime'], ['무거운 작업이나 DB 조회는 피해요 · 모든 요청을 느리게 만들어요', 'avoid heavy work or database calls, which slow every request']],
    caps: [['요청 앞에서 실행', 'Running before requests'], ['요청 읽기', 'Reading the request'], ['리다이렉트', 'Redirecting'], ['matcher와 한계', 'matcher and limits'], ['proxy(미들웨어)', 'The proxy (middleware)']]
  });
}
/* ===== Next.js · 2. rendering strategies ===== */
/* a horizontal timeline row: segments [[label, color, width]] */
const tl = (S, p, X, y, segs, st, off) => { let x = X; segs.forEach(([t, c, w], i) => { chip(S, p + i, x, y, w, t, c, st, { off, h: 1.0, pct: c === 'line' ? 10 : 30 }); x += w + .1; }); };

function sRendering() {
  return CW('next-rendering', {
    code: [['// CSR: 빈 HTML → JS 실행 → 데이터 → 화면', '// CSR: empty HTML → JS → data → screen'], ['// SSR: 요청마다 서버에서 HTML 생성', '// SSR: HTML built on the server per request'], ['// SSG: 빌드 때 HTML을 미리 생성', '// SSG: HTML generated at build time'], ['// ISR: SSG + 주기적으로 다시 생성', '// ISR: SSG regenerated periodically'], 'export const revalidate = 3600;', 'export const dynamic = "force-dynamic";'],
    hl: [[0, 1, 'warn'], [1, 1, 'ok'], [2, 2, 'ok'], [4, 2]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'c0', X, .6, 'CSR', 'm w', 1); tl(S, 'c', X, 1.6, [[['빈 화면', 'blank'], 'line', 3.2], ['JS', 'warn', 2.6], [['데이터', 'data'], 'warn', 2.6], [['화면', 'page'], 'ok', 3.2]], 1);
      lbl(S, 's0', X, 3.2, 'SSR', 'm g', 2); tl(S, 's', X, 4.2, [[['서버 렌더', 'server render'], 'accent', 4.0], [['HTML 화면', 'HTML page'], 'ok', 7.6]], 2);
      lbl(S, 'g0', X, 5.8, 'SSG', 'm a', 3); tl(S, 'g', X, 6.8, [['CDN', 'accent', 1.6], [['미리 만든 HTML 화면', 'prebuilt HTML page'], 'ok', 10.0]], 3);
      lbl(S, 'n1', X, 8.6, ['JS가 다 받아져야 내용이 보여요 · SEO 약함', 'nothing shows until JS loads; weak SEO'], 'w', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 8.6, ['요청마다 최신 데이터로 HTML을 만들어요', 'fresh HTML built for every request'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 8.6, ['가장 빠름 · 데이터는 빌드 시점 기준', 'fastest, with data as of the build'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 8.6, ['App Router는 페이지마다 알아서 골라요', 'the App Router picks per route'], 'g', 4, { w: 12 }); lbl(S, 'n5', X, 9.7, ['데이터가 요청에 따라 다르면 동적, 아니면 정적', 'request-specific data means dynamic, else static'], '', 4, { w: 12 });
    },
    notes: [['CSR은 빈 HTML을 받은 뒤 JS가 실행되고 데이터를 가져와야 화면이 보여요 · 첫 화면이 늦고 검색 엔진에 불리해요', 'with CSR, an empty HTML page waits for JavaScript and data before anything shows, slowing the first view and hurting SEO'], ['SSR은 요청이 올 때마다 서버에서 최신 데이터로 HTML을 만들어 보내요', 'SSR builds HTML on the server with fresh data for every request'], ['SSG는 빌드 때 HTML을 미리 만들어 CDN에서 바로 보내요 · 가장 빠르지만 데이터는 빌드 시점 기준이에요', 'SSG generates HTML at build time and serves it straight from a CDN; it is fastest, but its data is as of the build'], ['App Router는 페이지가 요청별 데이터(쿠키, 검색어 등)를 쓰는지 보고 정적·동적을 스스로 정해요', 'the App Router decides static or dynamic per route based on whether it uses request-specific data such as cookies or search params']],
    fin: [['렌더링 전략: HTML을 언제(빌드·요청·브라우저), 어디서(서버·클라이언트) 만들지의 선택', 'rendering strategies choose when (build, request, browser) and where (server, client) HTML is made', 'nxx-xs nxx-a'], ['ISR은 정적 페이지를 주기적으로 다시 만들어 SSG와 SSR의 중간을 줘요', 'ISR regenerates static pages periodically, sitting between SSG and SSR'], ['한 페이지 안에서도 정적 셸과 동적 부분을 섞을 수 있어요(PPR)', 'a single page can mix a static shell with dynamic parts (PPR)']],
    caps: [['CSR', 'CSR'], ['SSR', 'SSR'], ['SSG', 'SSG'], ['자동 선택', 'Automatic choice'], ['CSR·SSR·SSG', 'CSR, SSR and SSG']]
  });
}

function sStaticDynamic() {
  return CW('next-static-dynamic', {
    code: [['// 기본: 빌드 때 렌더 → CDN에서 응답', '// default: render at build, serve from CDN'], 'export default async function Page(props) {', ['  const posts = await getPosts();   // 정적', '  const posts = await getPosts();   // static'], ['  const jar = await cookies();      // 동적', '  const jar = await cookies();      // dynamic'], ['  const sp = await props.searchParams; // 동적', '  const sp = await props.searchParams; // dyn.'], '  …', '}', ['// next build: ○ 정적   ƒ 동적', '// next build: ○ static   ƒ dynamic']],
    hl: [[0, 3, 'ok'], [3, 2, 'warn'], [7, 1], null],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'bd', X, 1.0, 4.0, ['빌드', 'build'], 'accent', 1, { off: 2 }); ar(S, 'ba', [X + 4.1, 1.55], [X + 5.1, 1.55], 'ink-3', 1, { h: .1, off: 2 }); nd(S, 'cd', X + 5.2, 1.0, 6.8, ['HTML을 CDN에 저장', 'HTML stored on a CDN'], 'ok', 1, { off: 2 });
      lbl(S, 'n1', X, 2.8, ['요청별 데이터가 없으면 정적 · 모두 같은 HTML', 'no request data: static, same HTML for all'], 'g', 1, { off: 2, w: 12 });
      nd(S, 'rq', X, 1.0, 4.0, ['요청', 'request'], 'warn', 2, { off: 3 }); ar(S, 'ra', [X + 4.1, 1.55], [X + 5.1, 1.55], 'ink-3', 2, { h: .1, off: 3 }); nd(S, 'sr', X + 5.2, 1.0, 6.8, ['그 사람용 HTML 렌더', 'render HTML for that user'], 'warn', 2, { off: 3 });
      lbl(S, 'n2', X, 2.8, ['cookies·headers·searchParams를 쓰면 동적', 'cookies, headers or searchParams make it dynamic'], 'w', 2, { off: 3, w: 12 });
      [['○', '/', 'ok'], ['○', '/about', 'ok'], ['ƒ', '/dashboard', 'warn'], ['ƒ', '/search', 'warn']].forEach(([s, r, c], i) => { lbl(S, 'bs' + i, X, 1.0 + i * 1.1, s, 'm ' + (c === 'ok' ? 'g' : 'w'), 3, { off: 4 }); lbl(S, 'br' + i, X + 1.0, 1.0 + i * 1.1, r, 'm', 3, { off: 4 }); });
      lbl(S, 'n3', X, 5.6, ['빌드 결과에서 경로마다 확인할 수 있어요', 'the build output shows each route’s mode'], 'a', 3, { off: 4, w: 12 });
      nd(S, 'sh', X, 1.0, 12.0, '', 'ok', 4, { h: 1.6 }); lbl(S, 'shl', X + .4, 1.45, ['정적 셸 (즉시)', 'static shell (instant)'], 'g', 4); nd(S, 'dh', X + 6.4, 1.3, 5.2, ['동적 구멍', 'dynamic hole'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 3.0, ['한 페이지 안에서 섞기 → PPR', 'mixing within one page → PPR'], 'a', 4);
    },
    notes: [['쿠키나 검색어 같은 요청별 데이터를 쓰지 않는 페이지는 빌드 때 한 번 렌더해 모든 사용자에게 같은 HTML을 보내요(정적)', 'pages that use no request-specific data render once at build and send the same HTML to everyone: static'], ['cookies(), headers(), searchParams처럼 요청마다 다른 값을 읽으면 그 페이지는 요청 때 렌더돼요(동적)', 'reading per-request values such as cookies(), headers() or searchParams renders the page at request time: dynamic'], ['next build 결과에서 ○는 정적, ƒ는 동적 경로를 뜻해요', 'in next build output, ○ marks static routes and ƒ dynamic ones'], ['페이지 전체를 동적으로 만들지 않고, 정적 셸 안에 동적 부분만 끼워 넣는 방식이 PPR이에요', 'rather than making a whole page dynamic, PPR slots dynamic parts into a static shell']],
    fin: [['정적 렌더링은 빠르고 저렴, 동적 렌더링은 개인화 가능 · 요청별 API 사용 여부가 둘을 가르는 기준', 'static rendering is fast and cheap, dynamic rendering personalizes; per-request APIs decide which you get', 'nxx-xs nxx-a'], ['동적 API는 가능한 한 아래쪽 컴포넌트에서 쓰면 정적인 부분이 넓어져요', 'using dynamic APIs as deep in the tree as possible keeps more of the page static'], ['export const dynamic으로 강제할 수도 있어요', 'export const dynamic can force either mode']],
    caps: [['정적 렌더링', 'Static rendering'], ['동적 렌더링', 'Dynamic rendering'], ['빌드 출력', 'Build output'], ['섞어 쓰기', 'Mixing both'], ['정적 vs 동적 렌더링', 'Static versus dynamic rendering']]
  });
}

function sIsr() {
  return CW('next-isr', {
    code: ['export const revalidate = 60;   // 60s', ['// 첫 요청: 캐시된 HTML을 즉시', '// first request: cached HTML at once'], ['// 60초 뒤 요청: 옛 HTML을 주고', '// after 60s: serve the old HTML'], ['//   백그라운드에서 새로 생성', '//   and regenerate in the background'], ['// 그다음 요청: 새 HTML', '// next request: the new HTML'], ['revalidatePath("/blog");   // 즉시 무효화', 'revalidatePath("/blog");   // invalidate now'], ['revalidateTag("posts", "max"); // 태그', 'revalidateTag("posts", "max"); // by tag']],
    hl: [[0, 2], [2, 2, 'warn'], [4, 1, 'ok'], [5, 2]],
    draw: (S) => {
      const X = 19.4;
      hl(S, 'ax', X, X + 12.0, 4.0, 'ink-3', 1, { w: .06 }); [0, 60, 120].forEach((t, i) => lbl(S, 'tk' + i, X + i * 5.6, 4.3, t + 's', 'm', 1));
      nd(S, 'v1', X, 1.2, 5.4, ['HTML v1 (신선)', 'HTML v1 (fresh)'], 'ok', 1, { h: 1.1 }); tsets(S, 'v1', [[2, 'warn', 30]]);
      ar(S, 'r1', [X + 6.4, .4], [X + 6.4, 1.1], 'ink-3', 2, { h: .1 }); lbl(S, 'r1l', X + 7.0, .3, ['요청', 'request'], 'm', 2); nd(S, 'bg', X + 5.8, 2.6, 6.2, ['백그라운드 재생성', 'regenerate in background'], 'accent', 2, { h: 1.0 });
      lbl(S, 'n2', X, 5.4, ['기다리지 않게 옛 버전을 먼저 줘요', 'the old version is served without waiting'], 'w', 2, { off: 3, w: 12 });
      nd(S, 'v2', X + 5.8, 1.2, 6.2, ['HTML v2 (신선)', 'HTML v2 (fresh)'], 'ok', 3, { h: 1.1 }); lbl(S, 'n3', X, 5.4, ['다음 요청부터 새 버전 · stale-while-revalidate', 'new version from the next request on'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 5.4, ['글을 발행하면 바로 무효화도 가능', 'invalidate on demand when you publish'], 'a', 4, { w: 12 });
    },
    notes: [['revalidate = 60이면 정적 HTML을 캐시해 두고, 60초 동안은 그대로 바로 보내요', 'with revalidate = 60, the static HTML is cached and served as is for 60 seconds'], ['60초가 지난 뒤의 요청에도 기다리게 하지 않고 옛 HTML을 먼저 주면서, 뒤에서 새로 만들어요', 'a request after 60 seconds still gets the old HTML immediately while a new version is built in the background'], ['다음 요청부터는 새 HTML이 나가요 · 이 방식을 stale-while-revalidate라고 해요', 'from the next request on, the new HTML is served; this is stale-while-revalidate'], ['revalidatePath·revalidateTag로 글을 발행하는 순간 원하는 캐시를 바로 무효화할 수도 있어요', 'revalidatePath and revalidateTag can invalidate the right cache the moment you publish']],
    fin: [['ISR(점진적 정적 재생성): 정적 페이지를 배포 없이 시간 기반·요청 기반으로 다시 만드는 방식', 'ISR regenerates static pages on a timer or on demand, without redeploying', 'nxx-xs nxx-a'], ['Next 16에서는 revalidateTag에 cacheLife 프로필("max" 등)을 함께 넘겨요', 'in Next 16, revalidateTag takes a cacheLife profile such as "max"'], ['서버 액션에서 바로 새 값을 보여야 하면 updateTag를 써요', 'use updateTag in server actions for read-your-writes freshness']],
    caps: [['캐시된 HTML', 'Cached HTML'], ['옛 버전 먼저', 'Old version first'], ['새 버전', 'The new version'], ['온디맨드 재검증', 'On-demand revalidation'], ['ISR과 재검증', 'ISR and revalidation']]
  });
}

function sStreaming() {
  return CW('next-streaming', {
    code: ['export default function Page() {', '  return (<>', ['    <ProductInfo />          // 빠름', '    <ProductInfo />          // fast'], '    <Suspense fallback={<Skel />}>', ['      <Reviews />            // 3초', '      <Reviews />            // 3 s'], '    </Suspense>', '  </>);', '}'],
    hl: [[2, 1], [3, 3, 'ok'], null, null],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'h1', X, .6, ['스트리밍 없이', 'without streaming'], 'r', 1, { off: 2 }); tl(S, 'a', X, 1.6, [[['3초 동안 빈 화면', '3 s of nothing'], 'line', 8.4], [['전체 HTML', 'all HTML'], 'ok', 3.4]], 1, 2);
      lbl(S, 'n1', X, 3.4, ['가장 느린 데이터가 전체를 붙잡아요', 'the slowest data holds everything back'], 'r', 1, { off: 2 });
      lbl(S, 'h2', X, .6, ['스트리밍', 'streaming'], 'g', 2); tl(S, 'b', X, 1.6, [[['셸+상품', 'shell+info'], 'ok', 2.6], [['스켈레톤 표시 중', 'skeleton showing'], 'line', 5.8], [['리뷰 도착', 'reviews'], 'ok', 3.4]], 2);
      lbl(S, 'n2', X, 3.4, ['준비된 부분부터 HTML을 흘려보내요', 'HTML flows as each part becomes ready'], 'g', 2, { off: 3 });
      sw(S, 'pg', X + 2.0, 4.6, 8.0, 5.2, 'var(--ui)', 3, { css: 'border:.1em solid var(--line)', r: .4 }); nd(S, 'pi', X + 2.4, 5.0, 7.2, 'ProductInfo', 'ok', 3, { h: 1.6 }); nd(S, 'rv', X + 2.4, 7.0, 7.2, 'Skeleton → Reviews', 'line', 3, { h: 2.4 }); tsets(S, 'rv', [[4, 'ok', 30]]);
      lbl(S, 'n4', X, 10.2, ['loading.tsx도 같은 원리예요', 'loading.tsx works the same way'], 'a', 4);
    },
    notes: [['한 페이지가 느린 데이터(리뷰 3초)를 기다리면, 스트리밍 없이는 3초 동안 아무것도 보이지 않아요', 'if a page waits on slow data such as 3-second reviews, nothing appears for 3 seconds without streaming'], ['Suspense로 느린 부분을 감싸면 준비된 셸과 상품 정보를 먼저 보내고, 리뷰 자리에는 스켈레톤을 둬요', 'wrapping the slow part in Suspense sends the ready shell and product info first, with a skeleton where the reviews go'], ['리뷰가 준비되면 같은 응답에 이어서 HTML 조각을 흘려보내 스켈레톤을 바꿔요', 'when reviews are ready, more HTML streams down the same response and replaces the skeleton'], ['폴더의 loading.tsx도 페이지 전체를 Suspense로 감싸는 같은 원리예요', 'a folder’s loading.tsx applies the same idea by wrapping the whole page in Suspense']],
    fin: [['스트리밍: HTML을 한 번에 보내지 않고 준비된 조각부터 순서대로 보내는 서버 렌더링 방식', 'streaming sends server-rendered HTML in pieces as they become ready instead of all at once', 'nxx-xs nxx-a'], ['첫 바이트(TTFB)와 첫 화면이 빨라지고, 느린 데이터가 전체를 막지 않아요', 'time to first byte and first paint improve, and slow data no longer blocks everything'], ['검색 엔진도 스트리밍된 HTML을 끝까지 읽어요', 'search engines read the full streamed HTML']],
    caps: [['한꺼번에 기다리기', 'Waiting for everything'], ['조각으로 보내기', 'Sending pieces'], ['스켈레톤 교체', 'Replacing skeletons'], ['loading.tsx', 'loading.tsx'], ['스트리밍', 'Streaming']]
  });
}

function sHydration() {
  return CW('next-hydration', {
    code: [['// 서버 HTML:    <p>12:00:00</p>', '// server HTML:  <p>12:00:00</p>'], ['// 브라우저 첫 렌더: <p>12:00:03</p> ✗', '// first client render: <p>12:00:03</p> ✗'], '"use client";', 'function Clock() {', '  const [t, setT] = useState<Date|null>(null);', '  useEffect(() => setT(new Date()), []);', '  return <p>{t?.toLocaleTimeString()}</p>;', '}'],
    hl: [null, null, [0, 2, 'danger'], [3, 5, 'ok']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 12.0, 4.6, 'var(--ui)', 1, { css: 'border:.1em solid var(--line)', r: .4 }); nd(S, 'bt', X + 3.0, 2.4, 6.0, ['구매 버튼', 'Buy button'], 'line', 1, { h: 1.4 });
      lbl(S, 'n1', X, 6.0, ['HTML은 보이지만 아직 클릭이 안 돼요', 'the HTML is visible but not yet clickable'], 'w', 1, { off: 2, w: 12 });
      chip(S, 'js', X, 6.0, 4.0, 'JS ↓', 'accent', 2, { off: 3, h: 1.0 }); tsets(S, 'bt', [[2, 'ok', 40]]); lbl(S, 'n2', X + 4.4, 6.15, ['이벤트를 붙여 살아나요', 'events attach; it comes alive'], 'g', 2, { off: 3 });
      tsets(S, 'bt', [[3, 'danger', 40]]); lbl(S, 'n3', X, 6.0, ['서버와 첫 렌더 결과가 다르면 오류', 'a server/client mismatch is an error'], 'r', 3, { off: 4, w: 12 }); lbl(S, 'n3b', X, 7.1, 'Date · Math.random · window · localStorage', 'm', 3, { off: 4 });
      tsets(S, 'bt', [[4, 'ok', 40]]); lbl(S, 'n4', X, 6.0, ['브라우저 전용 값은 마운트 뒤 이펙트에서', 'browser-only values go in an effect after mount'], 'g', 4, { w: 12 });
    },
    notes: [['서버가 보낸 HTML은 바로 보이지만, JS가 붙기 전까지는 버튼을 눌러도 아무 일도 일어나지 않아요', 'server HTML shows right away, but buttons do nothing until JavaScript attaches'], ['JS가 내려오면 React가 같은 컴포넌트를 렌더해 기존 HTML에 이벤트를 붙여요 · 이것이 하이드레이션이에요', 'once JavaScript arrives, React renders the same components and attaches events to the existing HTML: hydration'], ['서버와 브라우저의 첫 렌더 결과가 다르면 하이드레이션 오류가 나요 · 시간, 난수, window, localStorage가 흔한 원인이에요', 'if the first client render differs from the server HTML, a hydration error occurs; time, random numbers, window and localStorage are common causes'], ['브라우저에서만 알 수 있는 값은 마운트 뒤 useEffect에서 채워요', 'fill in browser-only values in useEffect after mounting']],
    fin: [['하이드레이션: 서버에서 만든 정적 HTML에 브라우저가 JS 동작을 입히는 과정', 'hydration is the browser attaching JavaScript behavior to server-rendered static HTML', 'nxx-xs nxx-a'], ['어쩔 수 없는 차이는 suppressHydrationWarning이나 dynamic(…, { ssr: false })로 처리해요', 'unavoidable differences use suppressHydrationWarning or dynamic(…, { ssr: false })'], ['서버 컴포넌트는 하이드레이션할 JS가 없어 그만큼 빨라요', 'server components ship no JavaScript to hydrate, which is part of their speed']],
    caps: [['보이지만 멈춘 화면', 'Visible but inert'], ['하이드레이션', 'Hydration'], ['불일치 오류', 'Mismatch errors'], ['마운트 뒤에 채우기', 'Filling in after mount'], ['하이드레이션', 'Hydration']]
  });
}

function sPpr() {
  return CW('next-ppr', {
    code: ['// next.config.ts: cacheComponents: true', 'export default function Page() {', '  return (<>', ['    <Header />           // 정적 셸', '    <Header />           // static shell'], '    <Suspense fallback={<CartSkel />}>', ['      <Cart />           // 요청 때(쿠키)', '      <Cart />           // per request'], '    </Suspense>', '  </>);', '}', 'async function getProducts() {', ['  "use cache";          // 결과를 캐시', '  "use cache";          // cache the result'], '  cacheLife("hours"); …'],
    hl: [[3, 1, 'ok'], [4, 3, 'warn'], [10, 3, 'ok'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 12.0, 7.6, 'var(--ui)', 0, { css: 'border:.1em solid var(--line)', r: .4 });
      nd(S, 'hd', X + .4, 1.2, 11.2, 'Header', 'ok', 1, { h: 1.1 }); nd(S, 'pl', X + .4, 2.6, 6.8, ['상품 목록', 'products'], 'ok', 1, { h: 5.4 });
      nd(S, 'ct', X + 7.6, 2.6, 4.0, ['장바구니…', 'cart…'], 'line', 1, { h: 5.4 }); tsets(S, 'ct', [[2, 'warn', 40]]);
      lbl(S, 'n1', X, 9.0, ['정적 셸은 CDN에서 즉시 보여요', 'the static shell shows instantly from a CDN'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 9.0, ['사람마다 다른 부분만 요청 때 채워 넣어요', 'only per-user parts are filled at request time'], 'w', 2, { off: 3, w: 12 });
      tsets(S, 'pl', [[3, 'accent', 40]]); lbl(S, 'n3', X, 9.0, ['"use cache": 함수·컴포넌트 결과를 캐시', '"use cache" caches a function’s or component’s result'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.0, ['Next 16: 캐시는 명시적으로 켤 때만', 'Next 16: caching only where you opt in'], 'g', 4, { w: 12 });
    },
    notes: [['부분 사전 렌더링(PPR)은 한 페이지의 정적인 부분을 미리 만들어 둔 셸로 즉시 보내요', 'Partial Prerendering sends a page’s static parts instantly as a prebuilt shell'], ['쿠키를 읽는 장바구니처럼 사람마다 다른 부분은 Suspense 경계로 남겨 두었다가 요청 때 스트리밍으로 채워요', 'per-user parts such as a cookie-reading cart stay behind Suspense boundaries and stream in at request time'], ['"use cache"를 붙인 함수나 컴포넌트는 결과가 캐시되고, cacheLife로 얼마나 오래 둘지 정해요', 'functions and components marked "use cache" have their results cached, with cacheLife setting how long'], ['Next 16의 Cache Components에서는 동적 코드가 기본이고, 캐시는 명시적으로 켠 곳에만 적용돼요', 'with Next 16’s Cache Components, code is dynamic by default and caching applies only where you opt in']],
    fin: [['PPR과 Cache Components: 정적 셸 + 동적 구멍 + 명시적 캐시로 한 페이지를 구성하는 Next.js의 렌더링 모델', 'PPR and Cache Components build a page from a static shell, dynamic holes and explicit caching', 'nxx-xs nxx-a'], ['next.config의 cacheComponents: true로 켜요(Next 16)', 'enable it with cacheComponents: true in next.config (Next 16)'], ['cacheTag로 태그를 달고 revalidateTag로 무효화해요', 'tag cached entries with cacheTag and invalidate with revalidateTag']],
    caps: [['정적 셸', 'The static shell'], ['동적 구멍', 'Dynamic holes'], ['"use cache"', '"use cache"'], ['명시적 캐시', 'Explicit caching'], ['PPR과 Cache Components', 'PPR and Cache Components']]
  });
}

function sBoundary() {
  return CW('next-boundary', {
    code: ['// page.tsx (서버)', 'import LikeButton from "./LikeButton";', 'const post = await getPost(id);', ['<LikeButton postId={post.id} />  // ✓ 값', '<LikeButton postId={post.id} />  // ✓ data'], ['<LikeButton onLike={() => …} />  // ✗ 함수', '<LikeButton onLike={() => …} />  // ✗ function'], '// LikeButton.tsx', ['"use client";  // 이 파일 아래 import 전부', '"use client";  // and everything it imports'], ['import "server-only";  // 서버 전용 표시', 'import "server-only";  // server-only marker']],
    hl: [[0, 3], [3, 2, 'warn'], [5, 2, 'warn'], [7, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pg', X + 3.6, .8, 4.8, ['page (서버)', 'page (server)'], 'ok', 0);
      nd(S, 'ar', X, 3.0, 5.4, ['Article (서버)', 'Article (server)'], 'ok', 0); nd(S, 'lb', X + 6.6, 3.0, 5.4, ['LikeButton (클라)', 'LikeButton (client)'], 'warn', 0);
      ed(S, 'e1', [X + 5.0, 1.9], [X + 2.7, 3.0], 0); ed(S, 'e2', [X + 7.0, 1.9], [X + 9.3, 3.0], 0);
      lbl(S, 'p1', X + 6.6, 4.3, 'postId: 42 ✓', 'm g', 2, { off: 3 }); lbl(S, 'p2', X + 6.6, 5.4, 'onLike: fn ✗', 'm r', 2, { off: 3 });
      lbl(S, 'n2', X, 6.8, ['경계를 넘는 props는 직렬화 가능한 값만', 'props crossing the boundary must be serializable'], 'w', 2, { off: 3, w: 12 });
      frame(S, 'cb', X + 6.2, 2.6, 6.0, 4.6, 'warn', 3, { w: .08, dash: 1 }); nd(S, 'ic', X + 6.6, 4.6, 5.0, 'Icon · lib', 'warn', 3);
      lbl(S, 'n3', X, 7.6, ['"use client" 아래로 import한 모든 것이 번들에', 'everything imported below "use client" ships'], 'w', 3, { off: 4, w: 12 }); lbl(S, 'n3b', X, 8.7, ['경계는 잎(leaf) 쪽에 작게', 'keep boundaries small, at the leaves'], 'g', 3, { off: 4 });
      lbl(S, 'n4', X, 7.6, ['server-only: 실수로 클라이언트에서 쓰면 빌드 오류', 'server-only fails the build if imported on the client'], 'a', 4, { w: 12 });
    },
    notes: [['App Router의 컴포넌트는 기본이 서버 컴포넌트이고, 클릭이 필요한 LikeButton만 클라이언트 컴포넌트예요', 'App Router components are server components by default, and only interactive pieces such as LikeButton are client components'], ['서버에서 클라이언트로 넘기는 props는 JSON처럼 직렬화할 수 있어야 해요 · 일반 함수는 넘길 수 없어요(서버 액션은 예외)', 'props passed from server to client must be serializable like JSON; plain functions cannot cross, except server actions'], ['"use client" 파일이 import하는 모든 모듈도 브라우저 번들에 들어가요 · 경계는 트리의 잎 쪽에 작게 둬요', 'every module imported by a "use client" file joins the browser bundle, so keep boundaries small and near the leaves'], ['비밀 키를 쓰는 모듈에 import "server-only"를 넣으면 클라이언트에서 가져올 때 빌드가 실패해요', 'adding import "server-only" to modules with secrets makes the build fail if they are imported on the client']],
    fin: [['서버·클라이언트 경계: "use client"가 표시하는 지점 · 위는 서버에서, 아래는 브라우저에서도 실행돼요', 'the server/client boundary is where "use client" sits: above it runs on the server, below it in the browser as well', 'nxx-xs nxx-a'], ['클라이언트 컴포넌트 안에 서버 컴포넌트를 넣으려면 children으로 전달해요', 'to put server components inside client components, pass them as children'], ['Context Provider도 클라이언트 컴포넌트라 레이아웃에서 감싸 쓰는 패턴이 흔해요', 'Context providers are client components, commonly wrapped around layouts']],
    caps: [['서버가 기본', 'Server by default'], ['직렬화 가능한 props', 'Serializable props'], ['번들에 들어가는 범위', 'What ends up in the bundle'], ['server-only', 'server-only'], ['서버·클라이언트 경계', 'The server/client boundary']]
  });
}
/* ===== Next.js · 3. data ===== */
function sFetching() {
  return CW('next-fetching', {
    code: ['export default async function Page() {', ['  const user = await getUser();    // 1초', '  const user = await getUser();    // 1 s'], ['  const posts = await getPosts();  // 1초', '  const posts = await getPosts();  // 1 s'], ['  // 차례로: 2초 (워터폴)', '  // sequential: 2 s (a waterfall)'], '  const [u, p] = await Promise.all([', ['    getUser(), getPosts()]);       // 1초', '    getUser(), getPosts()]);       // 1 s'], '  return <Feed user={u} posts={p} />;', '}', 'const getUser = cache(async () => …);', ['// 같은 요청 안에서는 한 번만 실행', '// runs once per request, however often called']],
    hl: [[0, 1, 'ok'], [1, 3, 'danger'], [4, 2, 'ok'], [8, 2]],
    draw: (S) => {
      const X = 19.4, U = 4.6;
      lbl(S, 'n1', X, 1.0, ['서버 컴포넌트는 async 함수 · 바로 await', 'server components are async: just await'], 'a', 1, { off: 2, w: 12 }); lbl(S, 'n1b', X, 2.1, ['DB·API를 직접 호출, useEffect 없음', 'call DBs and APIs directly, no useEffect'], 'g', 1, { off: 2, w: 12 });
      chip(S, 'w1', X, 1.0, U, 'getUser', 'warn', 2, { off: 3, h: 1.0 }); chip(S, 'w2', X + U + .2, 2.3, U, 'getPosts', 'warn', 2, { off: 3, h: 1.0 }); lbl(S, 'wt', X, 3.8, ['2초 · 서로 기다릴 필요가 없는데도', '2 s, although neither needs the other'], 'r', 2, { off: 3 });
      chip(S, 'p1', X, 1.0, U, 'getUser', 'ok', 3, { off: 4, h: 1.0 }); chip(S, 'p2', X, 2.3, U, 'getPosts', 'ok', 3, { off: 4, h: 1.0 }); lbl(S, 'pt', X, 3.8, ['1초 · 동시에 시작', '1 s, started together'], 'g', 3, { off: 4 });
      [0, 1, 2].forEach(i => nd(S, 'c' + i, X + i * 4.1, 1.0, 3.8, ['Header', 'Sidebar', 'Page'][i], 'line', 4)); ['c0', 'c1', 'c2'].forEach((k, i) => lbl(S, k + 'g', X + i * 4.1, 2.4, 'getUser()', 'm', 4));
      chip(S, 'one', X, 3.6, 12.0, ['실제 호출은 한 번', 'only one real call'], 'ok', 4, { h: 1.0 });
    },
    notes: [['App Router의 서버 컴포넌트는 async 함수라 DB나 API를 바로 await해요 · useEffect도 로딩 상태 코드도 필요 없어요', 'App Router server components are async functions that await databases and APIs directly, with no useEffect or loading-state code'], ['서로 관계없는 요청을 차례로 await하면 시간이 더해져요 · 이것을 워터폴이라 해요', 'awaiting unrelated requests one after another adds up their time; this is a waterfall'], ['Promise.all로 동시에 시작하면 가장 느린 것만큼만 걸려요', 'starting them together with Promise.all takes only as long as the slowest'], ['React의 cache()로 감싼 함수는 한 요청 안에서 여러 컴포넌트가 불러도 한 번만 실행돼요', 'a function wrapped in React’s cache() runs once per request even when several components call it']],
    fin: [['서버에서 데이터 가져오기: 데이터가 필요한 컴포넌트가 직접 가져오고, 중복은 요청 단위 메모이제이션이 막아요', 'server-side data fetching lets each component fetch what it needs, with per-request memoization removing duplicates', 'nxx-xs nxx-a'], ['느린 데이터는 Suspense로 감싸 나머지를 먼저 보여줘요', 'wrap slow data in Suspense to show the rest first'], ['같은 URL의 fetch는 한 렌더 안에서 자동으로 중복 제거돼요', 'fetches to the same URL are deduplicated automatically within a render']],
    caps: [['async 서버 컴포넌트', 'Async server components'], ['워터폴', 'Waterfalls'], ['병렬로 가져오기', 'Fetching in parallel'], ['요청 단위 중복 제거', 'Per-request deduplication'], ['서버에서 데이터 가져오기', 'Fetching data on the server']]
  });
}

function sCaching() {
  return CW('next-caching', {
    code: [['// 1. 요청 메모이제이션: 같은 fetch 1번', '// 1. request memoization: one fetch'], ['// 2. 데이터 캐시: 요청을 넘어 저장', '// 2. data cache: kept across requests'], 'fetch(url, { next: { revalidate: 60 } });', 'fetch(url, { cache: "no-store" });', ['// 3. 전체 라우트 캐시: 정적 HTML·RSC', '// 3. full route cache: static HTML, RSC'], ['// 4. 라우터 캐시: 브라우저 메모리', '// 4. router cache: in browser memory'], ['// Next 16: "use cache"로 명시적으로', '// Next 16: explicit, with "use cache"']],
    hl: [[0, 1], [1, 3, 'ok'], [4, 2, 'warn'], [6, 1, 'ok']],
    draw: (S) => {
      const X = 19.4, L = [[['라우터 캐시 (브라우저)', 'router cache (browser)'], 'accent'], [['전체 라우트 캐시', 'full route cache'], 'warn'], [['데이터 캐시', 'data cache'], 'ok'], [['요청 메모이제이션', 'request memoization'], 'line'], [['데이터 원본 (DB·API)', 'data source (DB, API)'], 'line']];
      L.forEach(([t, c], i) => nd(S, 'l' + i, X + i * .4, .8 + i * 1.7, 12.0 - i * .8, t, c, 0, { h: 1.2 }));
      [0, 1, 2, 3].forEach(i => ar(S, 'd' + i, [X + 6.0, .8 + i * 1.7 + 1.25], [X + 6.0, .8 + (i + 1) * 1.7 - .05], 'ink-3', 0, { h: .08 }));
      tsets(S, 'l3', [[1, 'accent', 40], [2, 'line', 14]]); tsets(S, 'l2', [[2, 'ok', 50], [3, 'ok', 14]]); tsets(S, 'l1', [[3, 'warn', 50], [4, 'warn', 14]]); tsets(S, 'l0', [[3, 'accent', 50], [4, 'accent', 14]]);
      lbl(S, 'n1', X, 9.6, ['한 렌더 안의 같은 요청은 한 번만', 'identical requests run once per render'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 9.6, ['요청을 넘어 결과를 저장 · revalidate로 수명', 'results stored across requests, with a lifetime'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 9.6, ['정적 페이지 결과와 방문한 화면을 기억', 'static output and visited screens are remembered'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.6, ['Next 15부터 fetch는 기본 캐시 안 함', 'since Next 15, fetch is not cached by default'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 10.7, ['Next 16: "use cache"로 원하는 곳만 캐시', 'Next 16: cache only where you write "use cache"'], 'g', 4, { w: 12 });
    },
    notes: [['요청 메모이제이션: 한 번의 렌더 안에서 같은 fetch는 여러 번 불러도 한 번만 실행돼요', 'request memoization: identical fetches within one render run only once'], ['데이터 캐시: fetch 결과를 요청을 넘어 서버에 저장해요 · revalidate로 수명을, no-store로 캐시 안 함을 정해요', 'the data cache stores fetch results on the server across requests, with revalidate setting a lifetime and no-store opting out'], ['전체 라우트 캐시는 정적 페이지의 HTML·RSC 결과를, 라우터 캐시는 브라우저가 방문한 화면을 메모리에 기억해요', 'the full route cache keeps static pages’ HTML and RSC output, and the router cache remembers visited screens in browser memory'], ['예전의 암묵적 캐시가 혼란을 줘서 Next 15부터 fetch는 기본 캐시하지 않고, Next 16은 "use cache"로 명시하는 방식을 도입했어요', 'implicit caching confused people, so Next 15 stopped caching fetch by default and Next 16 introduced explicit "use cache"']],
    fin: [['Next.js 캐시 계층: 요청 메모이제이션 → 데이터 캐시 → 전체 라우트 캐시 → 라우터 캐시', 'Next.js cache layers: request memoization, the data cache, the full route cache and the router cache', 'nxx-xs nxx-a'], ['“왜 데이터가 안 바뀌지?”의 답은 대개 어느 계층에 캐시됐는지에 있어요', '“why is my data stale?” is usually answered by finding which layer cached it'], ['개발 모드에서는 캐시 동작이 프로덕션과 다를 수 있어 next build && next start로 확인해요', 'caching can differ in development, so verify with next build && next start']],
    caps: [['요청 메모이제이션', 'Request memoization'], ['데이터 캐시', 'The data cache'], ['라우트·라우터 캐시', 'Route and router caches'], ['명시적 캐시로', 'Toward explicit caching'], ['Next.js의 캐시 계층', 'Next.js cache layers']]
  });
}

function sRevalidate() {
  return CW('next-revalidate', {
    code: ['const posts = await fetch(API, {', '  next: { tags: ["posts"] },', '});', '"use server";', 'export async function publish(form) {', '  await db.post.create(…);', ['  revalidateTag("posts", "max"); // 뒤에서', '  revalidateTag("posts", "max"); // later'], ['  // updateTag("posts");  즉시 새 값', '  // updateTag("posts");  fresh right away'], '  // revalidatePath("/blog");', '}'],
    hl: [[0, 3], [5, 2, 'ok'], [7, 1, 'warn'], [8, 1]],
    draw: (S) => {
      const X = 19.4;
      ['/blog', '/', '/rss'].forEach((t, i) => { nd(S, 'pg' + i, X + i * 4.1, 1.0, 3.8, t, 'line', 1); });
      chip(S, 'tg', X + 2.0, 2.8, 8.0, 'tag: "posts"', 'accent', 1, { h: 1.0 }); [0, 1, 2].forEach(i => ed(S, 'te' + i, [X + i * 4.1 + 1.9, 2.1], [X + 6.0, 2.8], 1));
      lbl(S, 'n1', X, 4.4, ['데이터에 태그를 달아 두면', 'tag the data once,'], 'a', 1, { off: 2 }); lbl(S, 'n1b', X, 5.5, ['그 데이터를 쓰는 모든 페이지를 한 번에', 'and every page using it is reachable'], '', 1, { off: 2 });
      ['pg0', 'pg1', 'pg2'].forEach(k => tsets(S, k, [[2, 'warn', 40], [3, 'ok', 40]])); lbl(S, 'n2', X, 4.4, ['새 글을 쓰면 태그로 무효화', 'publishing invalidates the tag'], 'w', 2, { off: 3 });
      lbl(S, 'n3', X, 4.4, ['revalidateTag: 다음 방문 때 뒤에서 갱신', 'revalidateTag refreshes in the background'], 'a', 3, { off: 4, w: 12 }); lbl(S, 'n3b', X, 5.5, ['updateTag: 이 요청에서 바로 새 값', 'updateTag shows fresh data immediately'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.4, ['revalidatePath: 경로 단위로 무효화', 'revalidatePath invalidates a route'], 'a', 4);
    },
    notes: [['fetch나 "use cache" 데이터에 tags로 이름표를 달면, 그 데이터를 쓰는 모든 페이지를 한 번에 찾을 수 있어요', 'tagging fetches or "use cache" data lets you reach every page that uses it at once'], ['서버 액션에서 글을 저장한 뒤 그 태그를 무효화하면, 관련된 페이지가 모두 새 데이터를 쓰게 돼요', 'invalidating the tag after saving in a server action makes every related page use the new data'], ['revalidateTag(tag, "max")는 다음 요청 때 옛 값을 주며 뒤에서 갱신하고, updateTag는 같은 요청 안에서 바로 새 값을 읽어요', 'revalidateTag(tag, "max") serves the old value while refreshing in the background, whereas updateTag reads fresh data within the same request'], ['revalidatePath("/blog")는 태그 대신 경로를 기준으로 무효화해요', 'revalidatePath("/blog") invalidates by route instead of by tag']],
    fin: [['온디맨드 재검증: 시간이 아니라 “데이터가 바뀌었을 때” 캐시를 무효화하는 방식', 'on-demand revalidation invalidates caches when data changes rather than on a timer', 'nxx-xs nxx-a'], ['CMS 웹훅이 Route Handler를 불러 revalidateTag하는 패턴이 흔해요', 'a common pattern is a CMS webhook calling a route handler that revalidates a tag'], ['Next 16부터 revalidateTag는 두 번째 인자(cacheLife 프로필)가 필요해요', 'since Next 16, revalidateTag takes a second cacheLife profile argument']],
    caps: [['태그 달기', 'Tagging data'], ['태그로 무효화', 'Invalidating by tag'], ['revalidateTag와 updateTag', 'revalidateTag and updateTag'], ['경로로 무효화', 'Invalidating by path'], ['온디맨드 재검증', 'On-demand revalidation']]
  });
}

function sServerActions() {
  return CW('next-server-actions', {
    code: ['// actions.ts', '"use server";', 'export async function addTodo(fd: FormData) {', '  const title = String(fd.get("title"));', '  await db.todo.create({ data: { title } });', '  revalidatePath("/todos");', '}', '// page.tsx', '<form action={addTodo}>', ['  <input name="title" /> <button>추가</button>', '  <input name="title" /> <button>Add</button>'], '</form>'],
    hl: [[1, 6], [8, 3, 'ok'], [3, 2, 'warn'], [5, 1, 'ok']],
    draw: (S) => {
      const X = 19.4, P = [[['폼 제출', 'form submit'], 'accent'], ['POST', 'line'], ['addTodo()', 'warn'], ['DB', 'line'], [['새 화면', 'new UI'], 'ok']];
      P.forEach(([t, c], i) => { nd(S, 'p' + i, X, .8 + i * 1.6, 5.0, t, c, 1, { h: 1.1 }); if (i) ar(S, 'pa' + i, [X + 2.5, .8 + i * 1.6 - .45], [X + 2.5, .8 + i * 1.6 - .05], 'ink-3', 1, { h: .08 }); });
      lbl(S, 'n1', X + 5.6, 1.0, ['서버 함수를 직접 부르는', 'calling a server function'], 'a', 1, { off: 2, w: 6.4 }); lbl(S, 'n1b', X + 5.6, 2.1, ['것처럼 쓰는 RPC', 'like a local function'], '', 1, { off: 2, w: 6.4 });
      lbl(S, 'n2', X + 5.6, 1.0, ['JS 로드 전에도 동작', 'works before JS loads'], 'g', 2, { off: 3, w: 6.4 }); lbl(S, 'n2b', X + 5.6, 2.1, ['(점진적 향상)', '(progressive enhancement)'], '', 2, { off: 3, w: 6.4 });
      tsets(S, 'p2', [[3, 'danger', 40]]); lbl(S, 'n3', X + 5.6, 4.2, ['누구나 부를 수 있는', 'a public endpoint anyone'], 'r', 3, { off: 4, w: 6.4 }); lbl(S, 'n3b', X + 5.6, 5.3, ['공개 엔드포인트예요', 'can call'], 'r', 3, { off: 4, w: 6.4 }); lbl(S, 'n3c', X + 5.6, 6.4, ['검증·권한 확인 필수', 'validate and authorize'], 'w', 3, { off: 4, w: 6.4 });
      lbl(S, 'n4', X + 5.6, 7.3, ['캐시를 갱신해', 'refresh the cache'], 'g', 4, { w: 6.4 }); lbl(S, 'n4b', X + 5.6, 8.4, ['바뀐 화면을 돌려줘요', 'and return the new UI'], 'g', 4, { w: 6.4 });
    },
    notes: [['"use server"를 단 함수는 서버 액션이에요 · 클라이언트에서 부르면 Next.js가 POST 요청으로 바꿔 서버에서 실행해요', 'a function marked "use server" is a server action; calling it from the client becomes a POST request that runs on the server'], ['<form action={addTodo}>에 넘기면 JS가 아직 로드되지 않아도 일반 폼처럼 제출돼요(점진적 향상)', 'passed to <form action={addTodo}>, it submits like a normal form even before JavaScript loads: progressive enhancement'], ['서버 액션은 누구나 호출할 수 있는 공개 엔드포인트라, 안에서 입력 검증(zod)과 권한 확인을 꼭 해야 해요', 'server actions are public endpoints anyone can call, so validate input (for example with zod) and check permissions inside'], ['저장 후 revalidatePath나 updateTag로 캐시를 갱신하면 같은 응답에서 바뀐 화면이 내려와요', 'refreshing the cache with revalidatePath or updateTag after saving returns the updated UI in the same response']],
    fin: [['서버 액션: 폼 제출과 데이터 변경을 별도 API 없이 서버 함수로 처리하는 Next.js·React의 기능', 'server actions handle form submissions and mutations with server functions instead of a separate API', 'nxx-xs nxx-a'], ['useActionState로 pending·오류 상태를 다뤄요', 'useActionState handles pending and error states'], ['다른 앱이나 외부에서 부를 API가 필요하면 Route Handler를 써요', 'use route handlers when other apps or third parties need an API']],
    caps: [['"use server"', '"use server"'], ['form action', 'form action'], ['보안: 검증과 권한', 'Security: validate and authorize'], ['재검증으로 화면 갱신', 'Refreshing via revalidation'], ['서버 액션', 'Server actions']]
  });
}

function sRouteHandlers() {
  return CW('next-route-handlers', {
    code: ['// app/api/posts/route.ts', 'export async function GET(req: NextRequest) {', '  const q = req.nextUrl.searchParams.get("q");', '  return Response.json(await search(q));', '}', 'export async function POST(req: Request) {', '  const body = await req.json();', '  const post = await create(body);', '  return Response.json(post, { status: 201 });', '}'],
    hl: [[0, 1], [1, 4, 'ok'], [5, 5, 'ok'], null],
    draw: (S) => {
      const X = 19.4;
      urlBar(S, 'u1', X, .8, 12.0, 'GET /api/posts?q=next', 2, { off: 3 }); nd(S, 'r1', X, 2.4, 12.0, '200 [{ id: 1, title: … }]', 'ok', 2, { off: 3 });
      urlBar(S, 'u2', X, .8, 12.0, 'POST /api/posts  { title }', 3, { off: 4 }); nd(S, 'r2', X, 2.4, 12.0, '201 { id: 7, title: … }', 'ok', 3, { off: 4 });
      lbl(S, 'n1', X, 1.0, ['route.ts: 메서드 이름으로 함수를 export', 'route.ts exports functions named after methods'], 'a', 1, { off: 2, w: 12 }); lbl(S, 'n1b', X, 2.1, ['웹 표준 Request·Response', 'standard Web Request and Response'], 'g', 1, { off: 2 });
      lbl(S, 'n2', X, 4.0, ['쿼리는 nextUrl.searchParams로', 'read queries from nextUrl.searchParams'], '', 2, { off: 3 }); lbl(S, 'n3', X, 4.0, ['본문은 await req.json()', 'read the body with await req.json()'], '', 3, { off: 4 });
      [[['웹훅 · 외부 앱 · 모바일', 'webhooks, other apps'], 'ok'], [['내 화면의 폼', 'forms in your own UI'], 'warn']].forEach(([t, c], i) => nd(S, 'w' + i, X, 1.0 + i * 1.6, 7.0, t, c, 4)); lbl(S, 'w0l', X + 7.4, 1.15, 'Route Handler', 'm g', 4); lbl(S, 'w1l', X + 7.4, 2.75, 'Server Action', 'm w', 4);
    },
    notes: [['app 아래 route.ts에서 GET, POST 같은 HTTP 메서드 이름으로 함수를 export하면 API 엔드포인트가 돼요', 'exporting functions named after HTTP methods such as GET and POST from a route.ts under app creates an API endpoint'], ['웹 표준 Request·Response를 써요 · 쿼리는 req.nextUrl.searchParams, JSON 응답은 Response.json으로', 'they use standard Web Request and Response objects: queries come from req.nextUrl.searchParams and JSON replies from Response.json'], ['POST는 await req.json()으로 본문을 읽고, 상태 코드를 함께 돌려줘요', 'POST reads the body with await req.json() and returns a status code'], ['웹훅, 모바일 앱, 외부 서비스가 부를 API는 Route Handler로, 내 화면의 폼은 서버 액션으로 나눠 써요', 'use route handlers for APIs called by webhooks, mobile apps and other services, and server actions for your own UI’s forms']],
    fin: [['Route Handler: App Router에서 HTTP 엔드포인트를 만드는 파일(route.ts)', 'route handlers are route.ts files that create HTTP endpoints in the App Router', 'nxx-xs nxx-a'], ['같은 폴더에 page.tsx와 route.ts를 함께 둘 수는 없어요', 'a folder cannot contain both page.tsx and route.ts'], ['GET도 기본으로 캐시하지 않아요(Next 15+)', 'GET handlers are not cached by default (Next 15+)']],
    caps: [['route.ts', 'route.ts'], ['GET', 'GET'], ['POST', 'POST'], ['언제 쓰나', 'When to use them'], ['Route Handler', 'Route handlers']]
  });
}

function sEnv() {
  return CW('next-env', {
    code: [['# .env.local  (git에 올리지 않기)', '# .env.local  (never commit it)'], 'DATABASE_URL=postgres://…', 'NEXT_PUBLIC_API_URL=https://api.example.com', ['// 서버 코드: 둘 다 읽을 수 있어요', '// server code can read both'], 'process.env.DATABASE_URL', ['// 브라우저 코드: NEXT_PUBLIC_만', '// browser code: NEXT_PUBLIC_ only'], 'process.env.NEXT_PUBLIC_API_URL', ['// 빌드 때 값이 JS 코드에 박혀요', '// the value is inlined at build time']],
    hl: [[0, 3], [3, 2, 'ok'], [5, 2, 'warn'], [7, 1, 'danger']],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'sv', X, .8, 5.8, 5.0, 'ok', 0, { w: .1 }); lbl(S, 'svl', X + .3, .9, ['서버', 'server'], 'g', 0);
      frame(S, 'br', X + 6.2, .8, 5.8, 5.0, 'warn', 0, { w: .1 }); lbl(S, 'brl', X + 6.5, .9, ['브라우저', 'browser'], 'w', 0);
      nd(S, 's1', X + .4, 2.0, 5.0, 'DATABASE_URL', 'ok', 2); nd(S, 's2', X + .4, 3.4, 5.0, 'NEXT_PUBLIC_…', 'accent', 2);
      nd(S, 'b2', X + 6.6, 3.4, 5.0, 'NEXT_PUBLIC_…', 'accent', 3); nd(S, 'b1', X + 6.6, 2.0, 5.0, 'DATABASE_URL ✗', 'line', 3, { pct: 6 });
      lbl(S, 'n1', X, 6.4, ['.env 파일 · 비밀 값은 저장소에 올리지 않아요', '.env files; secrets stay out of git'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.4, ['서버에서는 모든 변수를 읽어요', 'the server reads every variable'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.4, ['브라우저엔 NEXT_PUBLIC_ 접두사만 전달', 'only NEXT_PUBLIC_ reaches the browser'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['NEXT_PUBLIC_ 값은 누구나 볼 수 있어요', 'anyone can see NEXT_PUBLIC_ values'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 7.5, ['비밀 키에 절대 붙이지 마세요', 'never put secrets in them'], 'r', 4);
    },
    notes: [['환경 변수는 .env.local 같은 파일에 두고, 비밀 값이 든 파일은 git에 올리지 않아요', 'environment variables live in files such as .env.local, and files with secrets stay out of git'], ['서버 코드(서버 컴포넌트, 액션, Route Handler)는 모든 환경 변수를 읽을 수 있어요', 'server code (server components, actions, route handlers) can read every variable'], ['브라우저에서 쓰는 코드에는 NEXT_PUBLIC_로 시작하는 변수만 전달돼요', 'browser code receives only variables starting with NEXT_PUBLIC_'], ['NEXT_PUBLIC_ 값은 빌드 때 JS 번들에 그대로 박혀 누구나 볼 수 있으니 비밀 키에는 절대 쓰지 않아요', 'NEXT_PUBLIC_ values are inlined into the JavaScript bundle at build time and visible to anyone, so never use them for secrets']],
    fin: [['환경 변수: 서버 전용 값과 공개 값을 NEXT_PUBLIC_ 접두사로 구분해요', 'environment variables split server-only values from public ones with the NEXT_PUBLIC_ prefix', 'nxx-xs nxx-a'], ['.env.development, .env.production처럼 환경별 파일이 있고 .env.local이 우선해요', 'per-environment files such as .env.development exist, with .env.local taking precedence'], ['시작할 때 zod로 필수 변수를 검증하면 배포 실수를 빨리 찾아요', 'validating required variables with zod at startup catches deployment mistakes early']],
    caps: [['.env 파일', '.env files'], ['서버에서', 'On the server'], ['NEXT_PUBLIC_', 'NEXT_PUBLIC_'], ['공개되는 값', 'Values made public'], ['환경 변수', 'Environment variables']]
  });
}
/* ===== Next.js · 4. optimization ===== */
function sImage() {
  return CW('next-image', {
    code: ['import Image from "next/image";', ['<Image src="/hero.jpg" alt="산" width={1200}', '<Image src="/hero.jpg" alt="Hill" width={1200}'], '  height={600} priority />', '<Image src={photo} alt="" fill', '  sizes="(max-width: 768px) 100vw, 50vw" />', ['// 자동: WebP·AVIF, srcset, 지연 로딩', '// automatic: WebP/AVIF, srcset, lazy loading']],
    hl: [[1, 2], [5, 1, 'ok'], [2, 1, 'warn'], [3, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'ph', X, .8, 12.0, 4.4, 'transparent', 1, { off: 2, css: 'border:.1em dashed var(--accent)' }); cl(S, 'phl', X, 2.6, 12.0, ['1200 × 600 자리를 미리 확보', 'space for 1200 × 600 reserved first'], 'a', 1, { off: 2 });
      lbl(S, 'n1', X, 5.8, ['크기를 알려 주면 이미지가 늦게 와도 밀리지 않아요(CLS)', 'known sizes stop layout shift (CLS)'], 'g', 1, { off: 2, w: 12 });
      [['📱', '640w · AVIF', 4.4], ['💻', '1200w · WebP', 6.8]].forEach(([d, t, w], i) => { lbl(S, 'dv' + i, X, 1.0 + i * 2.0, d, '', 2, { off: 3 }); nd(S, 'iv' + i, X + 1.4, .8 + i * 2.0, w, t, 'ok', 2, { off: 3, h: 1.4 }); });
      lbl(S, 'n2', X, 5.8, ['기기 폭에 맞는 크기와 최신 포맷으로 변환', 'resized and converted per device'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'lcp', X, .8, 12.0, ['priority: 첫 화면의 큰 이미지(LCP)', 'priority: the large above-the-fold image (LCP)'], 'warn', 3, { off: 4 });
      lbl(S, 'n3', X, 2.4, ['나머지는 화면에 가까워질 때 지연 로딩', 'the rest lazy-load as they near the viewport'], 'a', 3, { off: 4, w: 12 });
      frame(S, 'fc', X, .8, 12.0, 4.4, 'ink-3', 4, { w: .08 }); sw(S, 'fi', X + .1, .9, 11.8, 4.2, tint('ok', 30), 4); cl(S, 'fil', X, 2.6, 12.0, 'fill + sizes', 'm', 4);
      lbl(S, 'n4', X, 5.8, ['부모 크기를 채우고 sizes로 알맞은 후보 선택', 'fills the parent; sizes picks the right file'], 'a', 4, { w: 12 });
    },
    notes: [['width·height를 알려 주면 이미지가 늦게 와도 자리를 미리 잡아 두어 레이아웃이 밀리지 않아요(CLS 방지)', 'giving width and height reserves space so late images never shift the layout, preventing CLS'], ['next/image는 기기 폭에 맞는 크기와 AVIF·WebP 같은 최신 포맷으로 자동 변환해 srcset을 만들어요', 'next/image resizes per device and converts to modern formats such as AVIF and WebP, generating a srcset'], ['기본은 지연 로딩이고, 첫 화면의 가장 큰 이미지에는 priority를 줘서 먼저 받아요(LCP 개선)', 'images lazy-load by default, and priority fetches the main above-the-fold image first to improve LCP'], ['크기를 모르는 이미지는 fill로 부모를 채우고, sizes로 화면별 실제 표시 폭을 알려 줘요', 'for unknown sizes, fill covers the parent and sizes states the displayed width per screen']],
    fin: [['next/image: 크기 예약·반응형 srcset·포맷 변환·지연 로딩을 자동으로 해 주는 이미지 컴포넌트', 'next/image handles size reservation, responsive srcsets, format conversion and lazy loading automatically', 'nxx-xs nxx-a'], ['외부 이미지는 next.config의 images.remotePatterns에 허용해야 해요', 'remote images must be allowed in images.remotePatterns in next.config'], ['alt는 꼭 써요 · 장식용이면 alt=""', 'always write alt, or alt="" for decorative images']],
    caps: [['자리 예약', 'Reserving space'], ['반응형 크기와 포맷', 'Responsive sizes and formats'], ['priority와 지연 로딩', 'priority and lazy loading'], ['fill과 sizes', 'fill and sizes'], ['next/image', 'next/image']]
  });
}

function sFont() {
  return CW('next-font', {
    code: ['import { Noto_Sans_KR }', '  from "next/font/google";', 'const noto = Noto_Sans_KR({', '  weight: ["400", "700"],', '  display: "swap",', '  variable: "--font-sans",', '});', '<html className={noto.variable}>', 'import localFont from "next/font/local";'],
    hl: [[0, 7], [4, 1, 'ok'], [7, 1], [8, 1]],
    side: [
      [[['빌드 때 글꼴을 내려받아', 'fonts download at build time'], 'a'], [['내 도메인에서 직접 제공', 'and are served from your domain'], 'g'], [['브라우저가 Google에 요청 안 함', 'no browser request to Google'], '']],
      [[['대체 글꼴 크기를 자동 보정', 'fallback metrics are auto-adjusted'], 'g'], [['글꼴이 바뀌어도 밀림 없음', 'no shift when the font swaps'], '']],
      [[['CSS 변수로 연결', 'exposed as a CSS variable'], 'a'], [['Tailwind: font-sans에 연결', 'wire it to font-sans in Tailwind'], '']],
      [[['직접 가진 글꼴 파일은 localFont', 'your own files use localFont'], 'a'], [['한글은 woff2·가변 글꼴로', 'Korean: woff2 and variable fonts'], 'w']]
    ],
    notes: [['next/font는 빌드할 때 글꼴을 내려받아 내 사이트에서 직접 제공해요 · 사용자의 브라우저가 Google에 요청하지 않아요', 'next/font downloads fonts at build time and serves them from your own site, so browsers never request Google'], ['대체 글꼴의 크기를 실제 글꼴에 맞게 보정해서, 글꼴이 바뀌는 순간에도 레이아웃이 밀리지 않아요', 'fallback font metrics are adjusted to match, so swapping fonts causes no layout shift'], ['variable 옵션으로 CSS 변수를 만들어 Tailwind나 CSS에서 font-family로 연결해요', 'the variable option creates a CSS variable to wire into Tailwind or CSS font-family'], ['직접 가진 글꼴 파일은 next/font/local로 같은 최적화를 받아요', 'local font files get the same treatment through next/font/local']],
    fin: [['next/font: 글꼴의 자체 호스팅, 레이아웃 이동 방지, 미리 불러오기를 자동으로 처리해요', 'next/font automates self-hosting, layout-shift prevention and preloading of fonts', 'nxx-xs nxx-a'], ['쓰는 굵기만 지정해야 용량이 줄어요', 'specify only the weights you use to keep files small'], ['가변 글꼴이면 weight 없이 모든 굵기를 한 파일로 써요', 'variable fonts cover every weight in one file']],
    caps: [['자체 호스팅', 'Self-hosting'], ['밀림 없는 교체', 'Swapping without shift'], ['CSS 변수', 'CSS variables'], ['로컬 글꼴', 'Local fonts'], ['next/font', 'next/font']]
  });
}

function sMetadata() {
  return CW('next-metadata', {
    code: ['export const metadata = {', ['  title: "블로그 | 내 사이트",', '  title: "Blog | My site",'], ['  description: "개발 기록",', '  description: "Dev notes",'], '};', 'export async function generateMetadata(p) {', '  const { slug } = await p.params;', '  const post = await getPost(slug);', '  return { title: post.title,', '    openGraph: { images: [post.cover] } };', '}', '// opengraph-image · sitemap.ts · robots.ts'],
    hl: [[0, 4], [4, 6, 'ok'], [8, 1, 'ok'], [10, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'tab', X, .8, 8.0, 1.1, 'var(--ui)', 1, { off: 2, r: .4, css: 'border:.08em solid var(--line)' }); T(S, 'tabt', X + .4, 1.0, ['블로그 | 내 사이트', 'Blog | My site'], 'nxx-xs', 1, { off: 2 });
      lbl(S, 'n1', X, 2.6, ['<head>의 title·description이 돼요', 'becomes the <head> title and description'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 1.0, ['글마다 다른 제목을 데이터로 만들어요', 'per-post titles from data'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'og', X, .8, 12.0, 6.0, 'var(--ui)', 3, { off: 4, r: .5, css: 'border:.08em solid var(--line)' }); sw(S, 'ogi', X + .2, 1.0, 11.6, 3.6, tint('accent', 30), 3, { off: 4, r: .4 }); cl(S, 'ogil', X, 2.4, 12.0, 'og:image', 'm', 3, { off: 4 });
      T(S, 'ogt', X + .5, 4.9, ['Next.js 16 정리', 'Next.js 16 in review'], 'nxx-xs', 3, { off: 4 }); T(S, 'ogd', X + .5, 5.7, 'example.com', 'cz-mono nxx-xs', 3, { off: 4 });
      lbl(S, 'n3', X, 7.4, ['메신저·SNS 링크 미리보기 카드', 'link previews in chats and social media'], 'a', 3, { off: 4, w: 12 });
      ['opengraph-image.tsx', 'sitemap.ts', 'robots.ts', 'icon.png'].forEach((t, i) => nd(S, 'f' + i, X, .8 + i * 1.4, 6.4, t, 'line', 4, { h: 1.1 }));
      lbl(S, 'n4', X + 6.8, 1.0, ['파일만 두면', 'just add the file'], 'g', 4, { w: 5.2 }); lbl(S, 'n4b', X + 6.8, 2.1, ['자동으로 연결', 'and it is wired up'], 'g', 4, { w: 5.2 });
    },
    notes: [['page나 layout에서 metadata 객체를 export하면 <head>의 title, description 같은 태그가 돼요', 'exporting a metadata object from a page or layout becomes <head> tags such as title and description'], ['글마다 달라지는 값은 generateMetadata에서 데이터를 가져와 만들어요', 'values that differ per post are built from data in generateMetadata'], ['openGraph 정보는 메신저와 SNS에 링크를 붙일 때 보이는 미리보기 카드가 돼요', 'openGraph data becomes the preview card shown when a link is shared in chats and social media'], ['opengraph-image.tsx, sitemap.ts, robots.ts, icon 파일을 두면 Next.js가 자동으로 연결해요', 'opengraph-image.tsx, sitemap.ts, robots.ts and icon files are wired up automatically']],
    fin: [['Metadata API: 검색 엔진과 공유 미리보기를 위한 <head> 정보를 코드와 파일 규칙으로 관리해요', 'the Metadata API manages <head> data for search engines and share previews through code and file conventions', 'nxx-xs nxx-a'], ['layout의 메타데이터는 하위 페이지로 이어지고 page에서 덮어써요', 'layout metadata cascades to child pages, which can override it'], ['title.template으로 “%s | 사이트명” 같은 형식을 한 번에 정해요', 'title.template sets formats such as “%s | Site name” once']],
    caps: [['정적 메타데이터', 'Static metadata'], ['generateMetadata', 'generateMetadata'], ['Open Graph', 'Open Graph'], ['파일 기반 메타데이터', 'File-based metadata'], ['Metadata API', 'The Metadata API']]
  });
}

function sBundle() {
  return CW('next-bundle', {
    code: ['const Chart = dynamic(() => import("./Chart"),', '  { loading: () => <Spinner /> });', ['// "use client"는 잎 컴포넌트에만', '// "use client" only on leaf components'], ['// 무거운 라이브러리는 서버 컴포넌트에서', '// heavy libraries in server components'], ['import { marked } from "marked"; // 서버 0KB', 'import { marked } from "marked"; // 0 KB'], ['// @next/bundle-analyzer로 번들 분석', '// inspect with @next/bundle-analyzer']],
    hl: [[0, 2, 'ok'], [2, 1], [3, 2, 'ok'], [5, 1]],
    draw: (S) => {
      const X = 19.4, bar = (p, y, segs, st, off) => { let x = X; segs.forEach(([t, w, c], i) => { chip(S, p + i, x, y, w, t, c, st, { off, h: 1.1, pct: 30 }); x += w + .1; }); };
      lbl(S, 'h0', X, .6, ['처음 받는 JS', 'first-load JS'], 'a', 0);
      bar('a', 1.6, [['app', 3.0, 'accent'], ['chart', 4.6, 'danger'], ['markdown', 4.2, 'danger']], 0, 1);
      bar('b', 1.6, [['app', 3.0, 'accent'], ['markdown', 4.2, 'danger']], 1, 3); chip(S, 'bc', X + 7.4, 3.2, 4.6, ['chart (나중에)', 'chart (later)'], 'warn', 1, { off: 3, h: 1.1 });
      lbl(S, 'n1', X, 4.8, ['필요할 때 내려받도록 쪼개요', 'split it to load on demand'], 'g', 1, { off: 2 });
      lbl(S, 'n2', X, 4.8, ['경계 아래 import는 모두 클라이언트 번들로', 'imports below a boundary join the client bundle'], 'w', 2, { off: 3, w: 12 });
      bar('c', 1.6, [['app', 3.0, 'accent']], 3); lbl(S, 'n3', X, 4.8, ['마크다운 변환은 서버에서 · 브라우저는 결과만', 'convert markdown on the server; ship results'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.8, ['번들 분석기로 큰 덩어리를 찾아요', 'find big chunks with the bundle analyzer'], 'a', 4, { w: 12 });
    },
    notes: [['당장 필요 없는 무거운 컴포넌트는 dynamic(() => import())로 분리해 필요할 때 내려받아요', 'heavy components not needed right away split out with dynamic(() => import()) and load on demand'], ['"use client" 파일 아래로 import한 것은 모두 브라우저 번들에 들어가요 · 경계를 잎 쪽에 작게 둬요', 'everything imported below a "use client" file joins the browser bundle, so keep boundaries small at the leaves'], ['마크다운 변환이나 날짜 처리처럼 무거운 일은 서버 컴포넌트에서 하고 결과만 보내면 브라우저 JS가 0KB예요', 'doing heavy work such as markdown conversion in server components and sending only the result costs the browser 0 KB of JavaScript'], ['번들 분석기로 어떤 라이브러리가 큰지 눈으로 확인하고 줄여요', 'a bundle analyzer shows which libraries are large so you can trim them']],
    fin: [['번들 최적화: 처음 받는 JS를 줄여 로딩과 반응 속도(INP)를 개선하는 일', 'bundle optimization trims first-load JavaScript to speed up loading and responsiveness (INP)', 'nxx-xs nxx-a'], ['next build 결과의 First Load JS 크기를 꾸준히 확인해요', 'keep an eye on First Load JS in next build output'], ['아이콘·유틸 라이브러리는 필요한 것만 import해요', 'import only what you need from icon and utility libraries']],
    caps: [['동적 import', 'Dynamic imports'], ['클라이언트 경계', 'Client boundaries'], ['서버로 옮기기', 'Moving work to the server'], ['번들 분석', 'Bundle analysis'], ['번들 최적화', 'Bundle optimization']]
  });
}

function sCwv() {
  return CW('next-cwv', {
    code: [['// LCP: 가장 큰 콘텐츠 표시 ≤ 2.5초', '// LCP: largest content shown ≤ 2.5 s'], ['// INP: 입력에 대한 반응 ≤ 200ms', '// INP: response to input ≤ 200 ms'], ['// CLS: 레이아웃 밀림 ≤ 0.1', '// CLS: layout shift ≤ 0.1'], '"use client";', 'useReportWebVitals((m) => send(m));'],
    hl: [[0, 1], [1, 1], [2, 1], [3, 2, 'ok']],
    draw: (S) => {
      const X = 19.4, gauge = (p, y, a, b, mark, st, off) => { chip(S, p + 'g', X, y, a, 'good', 'ok', st, { off, h: .9, pct: 34 }); chip(S, p + 'n', X + a, y, b - a, '', 'warn', st, { off, h: .9, pct: 34 }); chip(S, p + 'p', X + b, y, 12.0 - b, 'poor', 'danger', st, { off, h: .9, pct: 34 }); vl(S, p + 'm', X + mark, y - .3, y + 1.2, 'ink', st, { off, w: .12 }); };
      gauge('l', 1.6, 5.0, 8.0, 3.4, 1, 2); lbl(S, 'l0', X, .6, 'LCP  2.5s · 4s', 'm a', 1, { off: 2 }); lbl(S, 'n1', X, 3.2, ['큰 이미지·제목이 보이기까지 · priority, 스트리밍', 'until the hero shows: priority, streaming'], 'a', 1, { off: 2, w: 12 });
      gauge('i', 1.6, 4.0, 8.0, 6.0, 2, 3); lbl(S, 'i0', X, .6, 'INP  200ms · 500ms', 'm w', 2, { off: 3 }); lbl(S, 'n2', X, 3.2, ['클릭 후 화면이 반응하기까지 · JS 줄이기', 'click to next paint: ship less JS'], 'w', 2, { off: 3, w: 12 });
      gauge('c', 1.6, 4.0, 10.0, 1.6, 3, 4); lbl(S, 'c0', X, .6, 'CLS  0.1 · 0.25', 'm g', 3, { off: 4 }); lbl(S, 'n3', X, 3.2, ['읽는 중 화면이 밀리는 정도 · 크기 예약', 'unexpected shifts: reserve sizes'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 1.0, ['실제 사용자 데이터로 측정해요', 'measure with real-user data'], 'a', 4); lbl(S, 'n5', X, 2.1, ['75번째 백분위수가 기준', 'judged at the 75th percentile'], '', 4);
    },
    notes: [['LCP는 화면에서 가장 큰 콘텐츠(대표 이미지, 제목)가 보이기까지의 시간이에요 · 2.5초 이내가 좋음', 'LCP is the time until the largest content, such as a hero image or headline, appears; under 2.5 s is good'], ['INP는 클릭·입력 뒤 화면이 다음으로 그려지기까지의 반응 시간이에요 · 200ms 이내가 좋음', 'INP measures the delay from a click or input to the next paint; under 200 ms is good'], ['CLS는 읽는 도중 레이아웃이 갑자기 밀리는 정도예요 · 0.1 이하가 좋음', 'CLS measures unexpected layout shifts while reading; 0.1 or less is good'], ['useReportWebVitals로 실제 사용자의 값을 모아 분석 도구로 보내요 · 75번째 백분위수로 판단해요', 'useReportWebVitals collects real users’ values for analytics, judged at the 75th percentile']],
    fin: [['Core Web Vitals: 로딩(LCP), 반응성(INP), 시각 안정성(CLS)을 재는 구글의 사용자 경험 지표', 'Core Web Vitals are Google’s user-experience metrics for loading (LCP), responsiveness (INP) and visual stability (CLS)', 'nxx-xs nxx-a'], ['검색 순위 신호 중 하나라 SEO에도 영향을 줘요', 'they are one of the search ranking signals'], ['Lighthouse는 실험실 값, CrUX는 실제 사용자 값이에요', 'Lighthouse gives lab values, CrUX real-user field data']],
    caps: [['LCP', 'LCP'], ['INP', 'INP'], ['CLS', 'CLS'], ['측정하기', 'Measuring'], ['Core Web Vitals', 'Core Web Vitals']]
  });
}

/* ===== Next.js · 5. build and operations ===== */
function sBuild() {
  return CW('next-build', {
    code: ['$ next build', 'Route (app)              Size', '┌ ○ /                    1.2 kB', '├ ○ /about               0.8 kB', '├ ● /blog/[slug]         2.1 kB', '├ ƒ /dashboard           3.4 kB', ['○ 정적  ● SSG(params)  ƒ 동적', '○ static  ● SSG (params)  ƒ dynamic'], '// next.config.ts', 'output: "standalone",'],
    hl: [[0, 1], [2, 5, 'ok'], [5, 1, 'warn'], [7, 2]],
    side: [
      [[['컴파일 · 타입 검사 · 사전 렌더', 'compile, type-check, prerender'], 'a'], [['Next 16: Turbopack이 기본', 'Next 16: Turbopack by default'], '']],
      [[['○ 빌드 때 HTML 완성', '○ HTML finished at build'], 'g'], [['● generateStaticParams로 생성', '● generated from generateStaticParams'], 'g']],
      [[['ƒ 요청 때마다 서버 렌더', 'ƒ server-rendered per request'], 'w'], [['의도치 않은 ƒ는 원인 찾기', 'investigate unexpected ƒ routes'], '']],
      [[['standalone: 필요한 파일만 모아', 'standalone bundles only what is needed'], 'a'], [['작은 Docker 이미지로', 'for small Docker images'], 'g']]
    ],
    notes: [['next build는 코드를 컴파일하고 타입을 검사한 뒤, 가능한 페이지를 미리 렌더해요 · Next 16부터 Turbopack이 기본 번들러예요', 'next build compiles, type-checks and prerenders what it can; since Next 16, Turbopack is the default bundler'], ['○는 빌드 때 HTML이 완성된 정적 페이지, ●는 generateStaticParams로 미리 만든 동적 경로예요', '○ marks static pages finished at build, and ● dynamic routes prebuilt via generateStaticParams'], ['ƒ는 요청마다 서버에서 렌더하는 페이지예요 · 정적이어야 할 페이지가 ƒ라면 동적 API를 썼는지 찾아봐요', 'ƒ marks routes rendered per request; if a page that should be static shows ƒ, look for a dynamic API'], ['output: "standalone"은 실행에 필요한 파일만 모아 작은 Docker 이미지를 만들게 해 줘요', 'output: "standalone" gathers only the files needed to run, enabling small Docker images']],
    fin: [['next build: 프로덕션 빌드 · 경로별 렌더링 방식과 크기를 보여줘 성능 점검의 출발점이에요', 'next build produces the production build and reports each route’s rendering mode and size, a starting point for performance checks', 'nxx-xs nxx-a'], ['next start로 빌드 결과를 실행해 프로덕션 동작을 확인해요', 'next start runs the build to check production behavior'], ['Next 16부터 next build는 린트를 실행하지 않아요 · ESLint·Biome을 따로 돌려요', 'since Next 16, next build no longer lints; run ESLint or Biome separately']],
    caps: [['빌드 과정', 'The build process'], ['정적 경로', 'Static routes'], ['동적 경로', 'Dynamic routes'], ['standalone 출력', 'Standalone output'], ['빌드와 출력', 'Builds and output']]
  });
}

function sDeploy() {
  return CW('next-deploy', {
    code: [['// 1. Vercel: git push → 자동 배포', '// 1. Vercel: git push → auto deploy'], '// 2. Node: next build && next start', '// 3. Docker: output: "standalone"', ['// 4. 정적: output: "export"', '// 4. static: output: "export"'], ['//    (SSR·액션·proxy 사용 불가)', '//    (no SSR, actions or proxy)'], ['export const runtime = "edge"; // 기본 nodejs', 'export const runtime = "edge"; // or nodejs']],
    hl: [[0, 1, 'ok'], [1, 2], [3, 2, 'warn'], [5, 1]],
    side: [
      [[['Vercel: 커밋마다 미리보기 URL', 'Vercel: a preview URL per commit'], 'g'], [['CDN·서버리스 자동 구성', 'CDN and serverless set up for you'], '']],
      [[['Node 서버나 Docker로 어디서나', 'run anywhere with Node or Docker'], 'a'], [['AWS·GCP·자체 서버', 'AWS, GCP, your own servers'], '']],
      [[['export: 순수 정적 파일만', 'export: purely static files'], 'w'], [['S3·GitHub Pages에 올려요', 'host on S3 or GitHub Pages'], ''], [['서버 기능은 못 써요', 'no server features'], 'r']],
      [[['edge: 사용자 가까이, 빠른 시작', 'edge: near users, fast cold starts'], 'a'], [['Node API 일부 제한', 'some Node APIs unavailable'], 'w']]
    ],
    notes: [['Vercel에 연결하면 git push마다 자동으로 빌드·배포하고, 브랜치마다 미리보기 URL을 만들어 줘요', 'connected to Vercel, every git push builds and deploys automatically with a preview URL per branch'], ['어디서든 next build 후 next start로 Node 서버를 띄우거나, standalone 출력으로 Docker 이미지를 만들어요', 'anywhere else, run next start after next build on a Node server, or build a Docker image from standalone output'], ['output: "export"는 순수 정적 파일만 만들어요 · S3나 GitHub Pages에 올릴 수 있지만 SSR, 서버 액션, proxy는 못 써요', 'output: "export" produces only static files for hosts such as S3 or GitHub Pages, without SSR, server actions or the proxy'], ['라우트별로 runtime을 edge로 정하면 사용자 가까운 곳에서 빠르게 시작하지만 일부 Node API는 쓸 수 없어요', 'setting a route’s runtime to edge starts quickly near users but loses some Node APIs']],
    fin: [['Next.js 배포: 관리형 플랫폼(Vercel 등), Node 서버, Docker, 정적 내보내기 중 앱이 쓰는 기능에 맞춰 골라요', 'Next.js deploys to managed platforms, Node servers, Docker or static export, chosen by the features the app uses', 'nxx-xs nxx-a'], ['이미지 최적화와 ISR 캐시는 자체 호스팅 시 설정이 더 필요해요', 'image optimization and ISR caching need extra setup when self-hosting'], ['Build Adapters API로 다른 플랫폼도 맞춤 지원해요(Next 16, 알파)', 'the Build Adapters API lets other platforms customize builds (Next 16, alpha)']],
    caps: [['Vercel', 'Vercel'], ['Node와 Docker', 'Node and Docker'], ['정적 내보내기', 'Static export'], ['런타임 선택', 'Choosing a runtime'], ['배포와 런타임', 'Deployment and runtimes']]
  });
}

function sAuth() {
  return CW('next-auth', {
    code: ['"use server";', 'export async function login(fd: FormData) {', '  const user = await verify(fd);', '  const jar = await cookies();', '  jar.set("session", sign(user), {', '    httpOnly: true, secure: true });', '}', ['// proxy: 쿠키 없으면 /login (1차 검사)', '// proxy: no cookie → /login (first pass)'], ['// 데이터 접근 계층에서 다시 확인', '// verify again at the data access layer'], 'const s = await getSession();', 'if (!s) redirect("/login");'],
    hl: [[0, 7, 'ok'], [7, 1], [8, 3, 'warn'], null],
    draw: (S) => {
      const X = 19.4, L = [['proxy', 'accent', ['쿠키 있나? (빠른 1차)', 'cookie? (quick first pass)']], ['page · action', 'warn', ['세션 검증 (진짜 검사)', 'verify session (the real check)']], ['DB', 'ok', ['권한 있는 데이터만', 'only authorized data']]];
      L.forEach(([t, c, d], i) => { nd(S, 'g' + i, X, .8 + i * 2.0, 4.4, t, c, i ? 2 : 1, { h: 1.2 }); lbl(S, 'gd' + i, X + 4.8, 1.0 + i * 2.0, d, '', i ? 2 : 1, { w: 7.2 }); if (i) ar(S, 'ga' + i, [X + 2.2, .8 + i * 2.0 - .75], [X + 2.2, .8 + i * 2.0 - .05], 'ink-3', 2, { h: .08 }); });
      lbl(S, 'n1', X, 7.0, ['httpOnly 쿠키: JS로 읽을 수 없어 XSS에 강해요', 'httpOnly cookies resist XSS: JS cannot read them'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 7.0, ['proxy만 믿으면 우회될 수 있어요', 'relying on the proxy alone can be bypassed'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 7.0, ['데이터를 읽는 곳에서 매번 권한 확인', 'check permissions wherever data is read'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.0, ['Auth.js · Better Auth · Clerk 같은 도구', 'tools such as Auth.js, Better Auth and Clerk'], 'a', 4, { w: 12 });
    },
    notes: [['로그인은 서버 액션에서 사용자를 확인하고 httpOnly 세션 쿠키를 발급해요 · JS로 읽을 수 없어 XSS에 강해요', 'logging in verifies the user in a server action and issues an httpOnly session cookie, which JavaScript cannot read'], ['proxy는 쿠키가 없으면 /login으로 보내는 빠른 1차 관문이에요 · 하지만 이것만으로는 안전하지 않아요', 'the proxy is a quick first gate that redirects to /login without a cookie, but it is not enough on its own'], ['데이터를 읽거나 바꾸는 서버 컴포넌트·액션·Route Handler에서 매번 세션과 권한을 다시 확인해요', 'server components, actions and route handlers that read or change data must re-check the session and permissions every time'], ['직접 만들기보다 Auth.js, Better Auth, Clerk 같은 검증된 도구를 쓰는 편이 안전해요', 'proven tools such as Auth.js, Better Auth or Clerk are safer than rolling your own']],
    fin: [['Next.js 인증: 쿠키 기반 세션 + 데이터 접근 지점마다 권한 확인이 기본 원칙이에요', 'Next.js authentication rests on cookie sessions plus authorization at every data access point', 'nxx-xs nxx-a'], ['2025년 미들웨어 우회 취약점(CVE-2025-29927)이 “proxy만 믿지 말라”는 교훈을 줬어요', 'the 2025 middleware bypass (CVE-2025-29927) taught not to rely on the proxy alone'], ['데이터 접근 계층(DAL)에 권한 확인을 모아 두면 빠뜨리지 않아요', 'centralizing checks in a data access layer keeps them from being missed']],
    caps: [['세션 쿠키 발급', 'Issuing a session cookie'], ['proxy 1차 검사', 'The proxy’s first pass'], ['데이터 접근에서 확인', 'Checking at data access'], ['인증 도구', 'Auth tools'], ['인증 패턴', 'Authentication patterns']]
  });
}

function sI18n() {
  return CW('next-i18n', {
    code: ['app/[lang]/layout.tsx', 'app/[lang]/page.tsx        →  /ko, /en', 'export async function generateStaticParams() {', '  return [{ lang: "ko" }, { lang: "en" }];', '}', 'const dict = await getDictionary(lang);', '<h1>{dict.home.title}</h1>', ['// proxy: Accept-Language 보고 /ko로', '// proxy: Accept-Language → /ko']],
    hl: [[0, 2], [2, 3, 'ok'], [5, 2, 'ok'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      urlBar(S, 'u1', X, .8, 5.8, '/ko/about', 1); urlBar(S, 'u2', X + 6.2, .8, 5.8, '/en/about', 1);
      lbl(S, 'n1', X, 2.4, ['언어가 URL의 첫 세그먼트', 'the language is the first segment'], 'a', 1, { off: 2 });
      ['ko', 'en'].forEach((l, i) => nd(S, 'b' + i, X + i * 6.2, 2.4, 5.8, l + ' ✓ build', 'ok', 2, { off: 3 })); lbl(S, 'n2', X, 3.9, ['언어별로 미리 정적 생성', 'prebuilt statically per language'], 'g', 2, { off: 3 });
      nd(S, 'dk', X, 2.4, 5.8, ['{ title: "안녕" }', '{ title: "안녕" }'], 'accent', 3, { off: 4 }); nd(S, 'de', X + 6.2, 2.4, 5.8, '{ title: "Hello" }', 'accent', 3, { off: 4 });
      lbl(S, 'n3', X, 3.9, ['사전은 서버에서만 읽어 번들에 안 들어가요', 'dictionaries load on the server, out of the bundle'], 'g', 3, { off: 4, w: 12 });
      chip(S, 'al', X, 2.4, 12.0, 'Accept-Language: ko-KR → /ko', 'warn', 4, { h: 1.1 }); lbl(S, 'n4', X, 3.9, ['첫 방문은 브라우저 언어로 안내', 'first visits follow the browser language'], 'w', 4);
    },
    notes: [['[lang] 동적 세그먼트를 맨 앞에 두면 /ko/about, /en/about처럼 언어가 URL에 들어가요', 'a leading [lang] dynamic segment puts the language in the URL, as in /ko/about and /en/about'], ['generateStaticParams로 지원 언어를 알려 주면 언어별 페이지를 빌드 때 미리 만들어요', 'listing supported languages in generateStaticParams prebuilds every language’s pages'], ['번역 사전은 서버 컴포넌트에서 읽어서 브라우저 번들에는 들어가지 않아요', 'translation dictionaries are read in server components and stay out of the browser bundle'], ['첫 방문자는 proxy가 Accept-Language 헤더를 보고 알맞은 언어 경로로 보내요', 'for first visits, the proxy reads the Accept-Language header and redirects to the right language path']],
    fin: [['국제화 라우팅: 언어를 URL 세그먼트로 두고, 사전은 서버에서, 첫 언어 선택은 proxy에서', 'internationalized routing keeps the language in a URL segment, dictionaries on the server and first-visit detection in the proxy', 'nxx-xs nxx-a'], ['next-intl 같은 라이브러리가 복수형·날짜·숫자 형식까지 도와줘요', 'libraries such as next-intl handle plurals, dates and number formats'], ['<html lang>과 hreflang 링크도 언어별로 맞춰요', 'set <html lang> and hreflang links per language']],
    caps: [['언어 세그먼트', 'The language segment'], ['언어별 정적 생성', 'Static pages per language'], ['서버에서 읽는 사전', 'Server-side dictionaries'], ['언어 감지', 'Language detection'], ['국제화 라우팅', 'Internationalized routing']]
  });
}

function sPagesVsApp() {
  return CW('next-pages-vs-app', {
    code: ['// pages/blog/[slug].tsx (Pages Router)', 'export async function getServerSideProps() {', '  return { props: { post: await getPost() } };', '}', ['// 컴포넌트는 모두 클라이언트로 하이드레이션', '// every component hydrates on the client'], '// app/blog/[slug]/page.tsx (App Router)', 'export default async function Page(props) {', '  const { slug } = await props.params;', '  return <Post post={await getPost(slug)} />;', '}'],
    hl: [[0, 5, 'warn'], [5, 5, 'ok'], null, null],
    side: [
      [[['Pages Router (2016~)', 'Pages Router (2016–)'], 'w'], [['데이터는 페이지 단위 함수로', 'data through page-level functions'], ''], ['getServerSideProps · getStaticProps', 'm']],
      [[['App Router (13~)', 'App Router (13–)'], 'g'], [['컴포넌트가 직접 await', 'components await directly'], ''], [['레이아웃·스트리밍·서버 컴포넌트', 'layouts, streaming, server components'], '']],
      [[['두 라우터는 함께 쓸 수 있어요', 'both routers can coexist'], 'a'], [['페이지 단위로 천천히 이전', 'migrate page by page'], 'g']],
      [[['새 프로젝트는 App Router', 'new projects use the App Router'], 'g'], [['Pages Router도 계속 지원돼요', 'the Pages Router remains supported'], '']]
    ],
    notes: [['Pages Router는 pages 폴더의 파일이 경로가 되고, getServerSideProps 같은 페이지 단위 함수로 데이터를 넘겨요 · 컴포넌트는 모두 클라이언트에서 하이드레이션돼요', 'in the Pages Router, data flows through page-level functions such as getServerSideProps, and every component hydrates'], ['App Router는 서버 컴포넌트가 기본이라 필요한 컴포넌트가 직접 데이터를 await하고, 중첩 레이아웃과 스트리밍을 지원해요', 'the App Router defaults to server components that await their own data, with nested layouts and streaming'], ['두 라우터는 한 프로젝트에 공존할 수 있어서 페이지 단위로 천천히 옮길 수 있어요', 'the two routers can coexist in one project, allowing gradual page-by-page migration'], ['새 프로젝트는 App Router로 시작하고, 기존 Pages Router 프로젝트도 계속 지원돼요', 'start new projects with the App Router, while existing Pages Router apps remain supported']],
    fin: [['Pages Router vs App Router: 페이지 단위 데이터 함수 vs 컴포넌트 단위 서버 렌더링', 'Pages Router versus App Router: page-level data functions versus component-level server rendering', 'nxx-xs nxx-a'], ['같은 경로를 두 라우터에 동시에 둘 수는 없어요', 'the same path cannot exist in both routers'], ['_app·_document의 역할은 App Router의 루트 레이아웃이 맡아요', 'the App Router’s root layout takes over the roles of _app and _document']],
    caps: [['Pages Router', 'The Pages Router'], ['App Router', 'The App Router'], ['함께 쓰기', 'Coexisting'], ['무엇을 고를까', 'Which to choose'], ['Pages Router와 App Router', 'Pages Router and App Router']]
  });
}
return { css: CSSX, secs: [
  sec('next-routing', '라우팅', 'Routing', 'App Router 라우팅', 'App Router routing', '폴더와 파일 이름으로 경로와 화면 구조를 정의하는 App Router의 규칙이에요.', 'The App Router conventions that define paths and screen structure through folders and file names.', [
    item('next-approuter', '파일 기반 라우팅', 'File-based routing', 'App Router에서는 app 폴더의 구조가 곧 URL이에요. 폴더에 page.tsx가 있어야 그 경로가 화면으로 공개돼요.', 'app/about/page.tsx는 /about, app/blog/[slug]/page.tsx는 /blog/hello 같은 동적 경로가 돼요. page.tsx의 default export가 그 경로의 화면이고 기본적으로 서버 컴포넌트예요. app/api/hello/route.ts처럼 route.ts를 두면 화면 대신 HTTP 요청에 응답하는 API 엔드포인트가 돼요. 같은 폴더에 컴포넌트나 유틸 파일을 함께 둬도 page가 아니면 공개되지 않아서 관련 파일을 가까이 모아 둘 수 있어요. layout, loading, error처럼 정해진 특수 파일 이름이 각자의 역할을 해요.', 'In the App Router, the structure of the app folder is the URL, and a folder becomes a public page only when it contains page.tsx.', 'app/about/page.tsx becomes /about, and app/blog/[slug]/page.tsx a dynamic route such as /blog/hello. The default export of page.tsx is that route’s screen, a server component by default. A route.ts, as in app/api/hello/route.ts, becomes an API endpoint that answers HTTP requests instead of rendering a page. Components and utilities can sit in the same folder without becoming public unless they are pages, keeping related files together. Special file names such as layout, loading and error each have a fixed role.', sAppRouter()),
    item('next-layout', '레이아웃', 'Layouts', 'layout.tsx는 여러 페이지가 공유하는 UI 틀이에요. 폴더마다 겹겹이 중첩되고, 페이지를 옮겨 다녀도 다시 렌더되지 않아 상태가 유지돼요.', '루트 app/layout.tsx는 필수이며 <html>과 <body>, 공통 내비게이션을 담아 모든 페이지를 감싸요. app/dashboard/layout.tsx를 두면 그 아래 페이지들에 Sidebar가 한 겹 더 추가돼요. /dashboard에서 /dashboard/settings로 이동하면 page 부분만 바뀌고 레이아웃은 다시 렌더되지 않아서, 사이드바의 입력값이나 스크롤 위치가 그대로 남아요. 이동할 때마다 새로 만들어야 하는 경우엔 template.tsx를 써요. 레이아웃은 params는 받지만 searchParams는 받지 않고, Next 16에서는 공유 레이아웃을 프리페치 때 한 번만 내려받아요.', 'layout.tsx is a UI shell shared by several pages; layouts nest folder by folder and do not re-render during navigation, so their state persists.', 'The root app/layout.tsx is required and wraps every page with <html>, <body> and shared navigation. Adding app/dashboard/layout.tsx layers a Sidebar onto every page below it. Navigating from /dashboard to /dashboard/settings swaps only the page, and the layout does not re-render, so the sidebar keeps its inputs and scroll position. When something must be recreated on every navigation, use template.tsx. Layouts receive params but not searchParams, and in Next 16 shared layouts download only once during prefetching.', sLayout()),
    item('next-dynamic', '동적 라우트', 'Dynamic routes', '[slug] 같은 대괄호 폴더는 URL의 그 자리 값을 params로 받아요. generateStaticParams로 가능한 값을 알려 주면 빌드 때 미리 만들어요.', '/blog/hello-next 요청이 오면 app/blog/[slug]/page.tsx가 실행되고, Next 15부터 Promise가 된 params를 await해 slug를 꺼내요. 해당 글이 없으면 notFound()를 불러 404 화면을 보여줘요. generateStaticParams가 글 목록의 slug들을 돌려주면 그 페이지들은 빌드 때 HTML로 미리 생성돼요. [...slug]는 /docs/a/b/c처럼 여러 단계를 배열로 받고, [[...slug]]는 세그먼트가 없는 /docs까지 매칭해요. ?q= 같은 쿼리는 searchParams로 받는데, 이를 쓰면 그 페이지는 동적 렌더링이 돼요.', 'Bracketed folders such as [slug] receive that part of the URL as params; listing possible values in generateStaticParams prebuilds them at build time.', 'A request for /blog/hello-next runs app/blog/[slug]/page.tsx, which awaits params, a promise since Next 15, to read slug. If the post does not exist, notFound() shows the 404 screen. When generateStaticParams returns the list of slugs, those pages are generated as HTML at build time. [...slug] captures several levels as an array, as in /docs/a/b/c, and [[...slug]] also matches /docs with no segment. Query strings such as ?q= arrive as searchParams, and using them makes the page dynamically rendered.', sDynamic()),
    item('next-link', 'Link와 내비게이션', 'Link and navigation', '<Link>는 새로고침 없이 클라이언트에서 페이지를 이동하고, 화면에 보이는 링크의 대상을 미리 가져와(prefetch) 클릭하면 바로 열려요.', '평범한 <a>로 이동하면 페이지 전체를 다시 받고 JS도 다시 실행되지만, <Link href="/blog/hello">는 바뀐 세그먼트만 서버에서 받아 교체하고 공유 레이아웃은 그대로 둬요. 링크가 화면에 들어오면 이동할 페이지의 데이터를 미리 받아 두어서 클릭하는 순간 열려요. Next 16은 이미 캐시된 부분은 빼고 필요한 부분만 프리페치해요. 코드에서 이동할 땐 클라이언트 컴포넌트에서 useRouter().push를, 현재 경로와 쿼리는 usePathname과 useSearchParams로 읽어요. 서버에서는 redirect()를 써요.', '<Link> navigates on the client without reloading, and prefetches destinations that appear in the viewport so clicks open instantly.', 'A plain <a> reloads the whole page and reruns JavaScript, whereas <Link href="/blog/hello"> fetches and swaps only the changed segments, keeping shared layouts. When a link enters the viewport, its destination’s data is fetched ahead so the page opens the moment it is clicked, and Next 16 prefetches only what is not already cached. To navigate in code, client components use useRouter().push, and usePathname and useSearchParams read the current path and query. On the server, use redirect().', sLink()),
    item('next-special', 'loading·error·not-found', 'loading, error and not-found', '폴더에 loading.tsx, error.tsx, not-found.tsx를 두면 Next.js가 페이지를 Suspense와 Error Boundary로 자동으로 감싸요.', 'Next.js는 page를 layout > error > loading 순서로 감싸요. loading.tsx는 Suspense의 fallback이 되어 데이터를 기다리는 동안 바로 보여요. error.tsx는 Error Boundary가 되어 오류가 난 세그먼트만 대체 화면으로 바꾸고 레이아웃은 살려 두며, reset()으로 다시 시도할 수 있어요 · 이벤트를 다뤄야 해서 반드시 클라이언트 컴포넌트예요. 코드에서 notFound()를 부르면 가장 가까운 not-found.tsx가 404 화면으로 보여요. 루트 레이아웃 자체의 오류는 global-error.tsx로 잡아요.', 'loading.tsx, error.tsx and not-found.tsx in a folder make Next.js wrap the page in Suspense and an error boundary automatically.', 'Next.js wraps a page as layout > error > loading. loading.tsx becomes the Suspense fallback, shown immediately while data loads. error.tsx becomes an error boundary that replaces only the failing segment while keeping the layout, with reset() to retry; it must be a client component because it handles events. Calling notFound() in code renders the nearest not-found.tsx as the 404 screen. Errors in the root layout itself are caught by global-error.tsx.', sSpecial()),
    item('next-groups', '라우트 그룹·병렬·가로채기 라우트', 'Route groups, parallel and intercepting routes', '(그룹) 폴더는 URL에 나타나지 않고, @슬롯은 한 화면에 여러 페이지를 동시에, (.) 가로채기는 같은 URL을 모달로 보여줘요.', '(marketing)/about과 (shop)/cart는 URL이 /about, /cart이지만 영역마다 다른 레이아웃을 줄 수 있어요. _components처럼 밑줄로 시작하는 폴더는 라우팅에서 빠져 컴포넌트를 정리해 두기 좋아요. @modal 슬롯을 두면 레이아웃이 { children, modal }을 받아 두 페이지를 함께 그려요(병렬 라우트). @modal/(.)photo/[id]는 목록에서 사진을 누를 때는 모달로 가로채 보여주고, 링크를 새로고침하거나 공유하면 photo/[id] 전체 페이지로 열려요. Next 16부터 병렬 라우트 슬롯에는 default.tsx가 필수예요.', 'Folders in (parentheses) stay out of the URL, @slots render several pages at once, and (.) intercepting routes show the same URL as a modal.', '(marketing)/about and (shop)/cart map to /about and /cart while giving each area its own layout. Folders starting with an underscore, such as _components, are excluded from routing, handy for organizing components. A @modal slot makes the layout receive { children, modal } and render both pages together: parallel routes. @modal/(.)photo/[id] intercepts clicks from the list to show a modal, while refreshing or sharing the link opens the full photo/[id] page. Since Next 16, parallel route slots require a default.tsx.', sGroups()),
    item('next-proxy', 'proxy(미들웨어)', 'The proxy (middleware)', 'proxy.ts는 요청이 페이지나 API에 닿기 전에 먼저 실행되어 리다이렉트·리라이트·헤더 수정을 해요. Next 16에서 middleware.ts의 새 이름이에요.', 'export function proxy(req)는 req.cookies와 req.nextUrl.pathname을 읽어, 세션 쿠키 없이 /dashboard에 오면 NextResponse.redirect로 /login에 보내고 아니면 NextResponse.next()로 통과시켜요. rewrite로 URL은 그대로 두고 다른 경로를 보여줄 수도 있고, A/B 테스트나 언어 감지에 쓰여요. config.matcher로 실행할 경로를 좁히고, 모든 요청을 느리게 하지 않도록 무거운 작업은 피해요. proxy.ts는 Node.js 런타임에서 돌아요. 무엇보다 proxy는 빠른 1차 관문일 뿐이라 데이터 접근 지점에서 권한을 다시 확인해야 해요.', 'proxy.ts runs before requests reach pages or APIs, redirecting, rewriting and editing headers; it is Next 16’s new name for middleware.ts.', 'export function proxy(req) reads req.cookies and req.nextUrl.pathname, redirecting visitors without a session cookie from /dashboard to /login with NextResponse.redirect and letting others through with NextResponse.next(). rewrite serves another path while keeping the URL, useful for A/B tests and language detection. config.matcher narrows where it runs, and heavy work should be avoided because it slows every request. proxy.ts runs on the Node.js runtime. Above all, it is only a quick first gate, so authorization must be checked again where data is accessed.', sProxy()),
  ]),
  sec('next-render', '렌더링 전략', 'Rendering', '렌더링 전략', 'Rendering strategies', 'HTML을 언제 어디서 만들지, 그리고 정적·동적·스트리밍·하이드레이션이 어떻게 맞물리는지예요.', 'When and where HTML is made, and how static, dynamic, streaming and hydration fit together.', [
    item('next-rendering', 'CSR·SSR·SSG', 'CSR, SSR and SSG', 'HTML을 브라우저에서(CSR), 요청 때 서버에서(SSR), 빌드 때 미리(SSG) 만드는 세 가지 렌더링 방식이에요. App Router는 페이지마다 알맞은 방식을 골라요.', 'CSR은 빈 HTML을 받은 뒤 JS가 실행되고 데이터를 가져와야 화면이 보여서 첫 화면이 늦고 검색 엔진에 불리해요. SSR은 요청마다 서버에서 최신 데이터로 HTML을 만들어 보내 개인화된 페이지에 알맞아요. SSG는 빌드 때 HTML을 만들어 CDN에서 바로 보내므로 가장 빠르지만 데이터는 빌드 시점 기준이에요. ISR은 SSG 페이지를 정해진 주기나 요청에 따라 다시 만들어 둘의 중간을 줘요. App Router는 페이지가 쿠키·검색어 같은 요청별 데이터를 쓰는지 보고 정적·동적을 스스로 정하고, PPR로 한 페이지 안에서 둘을 섞을 수도 있어요.', 'Three ways of producing HTML: in the browser (CSR), on the server per request (SSR) or ahead of time at build (SSG); the App Router picks per route.', 'With CSR, an empty HTML page waits for JavaScript and data before anything appears, slowing the first view and hurting SEO. SSR builds HTML on the server with fresh data for each request, suiting personalized pages. SSG builds HTML at build time and serves it straight from a CDN, the fastest option but with data as of the build. ISR regenerates SSG pages on a schedule or on demand, sitting in between. The App Router chooses static or dynamic per route based on whether it uses request data such as cookies or search params, and PPR can mix both within one page.', sRendering()),
    item('next-static-dynamic', '정적 vs 동적 렌더링', 'Static versus dynamic rendering', '요청별 데이터를 쓰지 않는 페이지는 빌드 때 한 번 렌더하는 정적 페이지, cookies·headers·searchParams를 쓰면 요청마다 렌더하는 동적 페이지가 돼요.', '글 목록처럼 모두에게 같은 페이지는 빌드 때 렌더해 CDN에 저장하므로 빠르고 서버 비용이 거의 없어요. 페이지 안에서 await cookies(), await headers(), searchParams처럼 요청마다 달라지는 값을 읽으면 그 페이지는 요청 때 렌더되는 동적 페이지가 돼요. next build 결과에서 ○는 정적, ƒ는 동적 경로이니, 정적이어야 할 페이지가 ƒ라면 어디서 동적 API를 썼는지 찾아요. 동적 API를 트리의 아래쪽 작은 컴포넌트에서 쓰면 정적인 부분이 넓어지고, PPR을 쓰면 정적 셸 안에 동적 부분만 끼워 넣을 수 있어요.', 'Pages that use no request data render once at build as static pages; reading cookies, headers or searchParams makes a page render per request as a dynamic page.', 'Pages that are the same for everyone, such as a post list, render at build and are stored on a CDN: fast, with almost no server cost. Reading per-request values in the page, such as await cookies(), await headers() or searchParams, makes it dynamic, rendered at request time. In next build output ○ marks static routes and ƒ dynamic ones, so a supposedly static page showing ƒ means a dynamic API sneaked in. Using dynamic APIs in small components deep in the tree keeps more of the page static, and PPR slots only the dynamic parts into a static shell.', sStaticDynamic()),
    item('next-isr', 'ISR과 재검증', 'ISR and revalidation', 'ISR은 정적 페이지를 배포 없이 다시 만드는 방식이에요. 정해진 시간이 지나면 옛 페이지를 먼저 주면서 뒤에서 새로 만들어요.', 'export const revalidate = 60이면 정적 HTML을 캐시해 두고 60초 동안은 그대로 보내요. 60초가 지난 뒤의 요청에도 기다리게 하지 않고 옛 HTML을 즉시 주면서 백그라운드에서 새 버전을 만들고, 그다음 요청부터 새 HTML이 나가요(stale-while-revalidate). 시간을 기다리지 않고 글을 발행하는 순간 revalidatePath("/blog")나 revalidateTag("posts", "max")로 바로 무효화할 수도 있어요. Next 16부터 revalidateTag는 cacheLife 프로필을 두 번째 인자로 받고, 서버 액션에서 바로 새 값을 읽어야 하면 updateTag를 써요.', 'ISR regenerates static pages without redeploying: after a set time, it serves the old page first while rebuilding in the background.', 'With export const revalidate = 60, the static HTML is cached and served as is for 60 seconds. A request after that still gets the old HTML immediately while a new version is built in the background, and later requests receive the new HTML: stale-while-revalidate. Instead of waiting, publishing can invalidate right away with revalidatePath("/blog") or revalidateTag("posts", "max"). Since Next 16, revalidateTag takes a cacheLife profile as its second argument, and updateTag provides read-your-writes freshness in server actions.', sIsr()),
    item('next-streaming', '스트리밍', 'Streaming', '서버가 HTML을 한 번에 보내지 않고 준비된 조각부터 흘려보내요. 느린 데이터가 페이지 전체를 붙잡지 않게 해요.', '상품 정보는 빠르고 리뷰는 3초 걸리는 페이지를 스트리밍 없이 렌더하면 3초 동안 아무것도 보이지 않아요. <Suspense fallback={<Skel />}>로 Reviews를 감싸면 셸과 상품 정보를 먼저 보내고 리뷰 자리에는 스켈레톤을 둬요. 리뷰가 준비되면 같은 HTTP 응답에 이어서 HTML 조각을 흘려보내 스켈레톤을 실제 내용으로 바꿔요. 폴더의 loading.tsx도 페이지 전체를 Suspense로 감싸는 같은 원리예요. 첫 바이트와 첫 화면이 빨라지고, 검색 엔진도 스트리밍된 HTML을 끝까지 읽어요.', 'The server sends HTML in pieces as they become ready instead of all at once, so slow data no longer holds the whole page back.', 'Rendering a page with fast product info and 3-second reviews without streaming shows nothing for 3 seconds. Wrapping Reviews in <Suspense fallback={<Skel />}> sends the shell and product info first with a skeleton where the reviews go. When reviews are ready, more HTML streams down the same HTTP response and replaces the skeleton. A folder’s loading.tsx applies the same idea to the whole page. Time to first byte and first paint improve, and search engines still read the full streamed HTML.', sStreaming()),
    item('next-hydration', '하이드레이션', 'Hydration', '서버가 보낸 정적인 HTML에 브라우저가 JS를 입혀 클릭할 수 있게 만드는 과정이에요. 서버와 첫 렌더 결과가 다르면 오류가 나요.', '서버 HTML은 바로 보이지만 JS가 붙기 전까지는 버튼을 눌러도 반응하지 않아요. JS가 내려오면 React가 같은 컴포넌트를 렌더해 기존 HTML에 이벤트를 연결해요. 이때 서버에서 12:00:00이었던 시각이 브라우저에서 12:00:03이 되는 것처럼 결과가 다르면 하이드레이션 오류가 나요. Date, Math.random, window, localStorage처럼 환경마다 다른 값이 흔한 원인이에요. 이런 값은 마운트 뒤 useEffect에서 채우고, 어쩔 수 없는 차이는 suppressHydrationWarning이나 dynamic(…, { ssr: false })로 처리해요. 서버 컴포넌트는 하이드레이션할 JS가 없어 그만큼 가벼워요.', 'Hydration is the browser attaching JavaScript to server-rendered static HTML to make it interactive; if the first client render differs from the server, it errors.', 'Server HTML shows immediately, but buttons do nothing until JavaScript attaches. Once it arrives, React renders the same components and connects events to the existing HTML. If the output differs, say a clock reading 12:00:00 on the server and 12:00:03 in the browser, a hydration error occurs; environment-dependent values such as Date, Math.random, window and localStorage are the usual causes. Fill such values in useEffect after mounting, and handle unavoidable differences with suppressHydrationWarning or dynamic(…, { ssr: false }). Server components ship no JavaScript to hydrate, which keeps them light.', sHydration()),
    item('next-ppr', 'PPR과 Cache Components', 'PPR and Cache Components', '부분 사전 렌더링(PPR)은 한 페이지를 미리 만든 정적 셸과 요청 때 채우는 동적 구멍으로 나눠요. Next 16의 Cache Components는 "use cache"로 캐시를 명시해요.', 'next.config에서 cacheComponents: true를 켜면, 헤더와 상품 목록 같은 정적 부분은 정적 셸로 미리 만들어 CDN에서 즉시 보내요. 쿠키를 읽는 장바구니처럼 사람마다 다른 부분은 Suspense로 감싸 두면 요청 때 렌더되어 스트리밍으로 채워져요. 함수나 컴포넌트 맨 위에 "use cache"를 쓰면 결과가 캐시되고, cacheLife("hours")로 수명을, cacheTag로 태그를 정해 revalidateTag로 무효화해요. 예전 App Router의 암묵적 캐시와 달리 Cache Components에서는 동적 코드가 기본이고, 캐시는 명시적으로 켠 곳에만 적용돼요.', 'Partial Prerendering splits a page into a prebuilt static shell and dynamic holes filled at request time; Next 16’s Cache Components make caching explicit with "use cache".', 'With cacheComponents: true in next.config, static parts such as the header and product list are prebuilt into a static shell and served instantly from a CDN. Per-user parts such as a cookie-reading cart, wrapped in Suspense, render at request time and stream in. Writing "use cache" at the top of a function or component caches its result, with cacheLife("hours") setting its lifetime and cacheTag a tag for revalidateTag. Unlike the implicit caching of earlier App Router versions, code is dynamic by default under Cache Components and caching applies only where you opt in.', sPpr()),
    item('next-boundary', '서버·클라이언트 경계', 'The server/client boundary', '"use client"가 표시하는 지점이 서버와 클라이언트의 경계예요. 경계를 넘는 props는 직렬화할 수 있어야 하고, 경계 아래 import는 모두 브라우저 번들에 들어가요.', '서버 컴포넌트인 page가 클라이언트 컴포넌트 LikeButton에 postId={42} 같은 값은 넘길 수 있지만, onLike={() => …} 같은 일반 함수는 넘길 수 없어요(서버 액션은 예외). "use client" 파일이 import하는 모든 모듈도 클라이언트 번들에 포함되므로, 경계는 트리의 잎 쪽에 작게 두는 게 좋아요. 클라이언트 컴포넌트 안에 서버 컴포넌트를 넣으려면 children으로 전달해요. 비밀 키를 쓰는 모듈에는 import "server-only"를 넣어, 실수로 클라이언트에서 가져오면 빌드가 실패하게 해요.', 'The point marked "use client" is the server/client boundary: props crossing it must be serializable, and everything imported below it joins the browser bundle.', 'A server component page can pass values such as postId={42} to the client component LikeButton, but not plain functions such as onLike={() => …}; server actions are the exception. Every module imported by a "use client" file is also bundled for the browser, so boundaries belong small and near the leaves. To place server components inside client components, pass them as children. Modules with secrets should import "server-only", making the build fail if they are accidentally imported on the client.', sBoundary()),
  ]),
  sec('next-data', '데이터', 'Data', '데이터 가져오기와 변경', 'Fetching and changing data', '서버 컴포넌트에서 데이터를 가져오고, 캐시하고, 서버 액션과 Route Handler로 바꾸는 방법이에요.', 'Fetching data in server components, caching it, and changing it with server actions and route handlers.', [
    item('next-fetching', '서버에서 데이터 가져오기', 'Fetching data on the server', '서버 컴포넌트는 async 함수라 DB나 API를 바로 await해요. 서로 관계없는 요청은 동시에 시작해 워터폴을 피해요.', 'async function Page() 안에서 await getUser()처럼 데이터를 가져오면 useEffect도 로딩 상태 코드도 필요 없어요. 하지만 getUser(1초)와 getPosts(1초)를 차례로 await하면 2초가 걸리는 워터폴이 생기므로, 서로 기다릴 필요가 없다면 Promise.all로 동시에 시작해 1초로 줄여요. 여러 컴포넌트가 같은 데이터를 필요로 하면 React의 cache()로 감싼 함수를 각자 부르면 돼요 · 한 요청 안에서는 실제로 한 번만 실행돼요. 같은 URL의 fetch도 한 렌더 안에서 자동으로 중복 제거돼요. 느린 데이터는 Suspense로 감싸 나머지를 먼저 보여줘요.', 'Server components are async functions that await databases and APIs directly; unrelated requests start together to avoid waterfalls.', 'Fetching inside async function Page() with await getUser() needs no useEffect or loading-state code. Awaiting getUser (1 s) and then getPosts (1 s) creates a 2-second waterfall, so independent requests start together with Promise.all and take 1 second. When several components need the same data, each can call a function wrapped in React’s cache(), which actually runs once per request; fetches to the same URL are also deduplicated within a render. Wrap slow data in Suspense to show the rest first.', sFetching()),
    item('next-caching', 'Next.js의 캐시 계층', 'Next.js cache layers', 'Next.js에는 요청 메모이제이션, 데이터 캐시, 전체 라우트 캐시, 라우터 캐시라는 네 겹의 캐시가 있어요. Next 15부터 기본 캐시가 줄고 Next 16은 명시적 캐시로 옮겨 갔어요.', '요청 메모이제이션은 한 번의 렌더 안에서 같은 fetch를 한 번만 실행해요. 데이터 캐시는 fetch(url, { next: { revalidate: 60 } })처럼 결과를 요청을 넘어 서버에 저장하고, cache: "no-store"면 저장하지 않아요. 전체 라우트 캐시는 정적 페이지의 HTML과 RSC 결과를, 라우터 캐시는 브라우저가 방문한 화면을 메모리에 기억해요. “왜 데이터가 안 바뀌지?”의 답은 대개 이 중 어느 계층에 캐시됐는지에 있어요. 암묵적 캐시가 혼란을 줘서 Next 15부터 fetch는 기본 캐시하지 않고, Next 16의 Cache Components는 "use cache"로 원하는 곳만 캐시해요.', 'Next.js has four cache layers: request memoization, the data cache, the full route cache and the router cache; Next 15 reduced default caching and Next 16 moved to explicit caching.', 'Request memoization runs identical fetches once per render. The data cache stores results across requests on the server, as in fetch(url, { next: { revalidate: 60 } }), while cache: "no-store" opts out. The full route cache keeps static pages’ HTML and RSC output, and the router cache remembers visited screens in browser memory. “Why is my data stale?” is usually answered by finding which layer cached it. Because implicit caching confused developers, Next 15 stopped caching fetch by default, and Next 16’s Cache Components cache only where you write "use cache".', sCaching()),
    item('next-revalidate', '온디맨드 재검증', 'On-demand revalidation', '데이터에 태그를 달아 두고, 데이터가 바뀌는 순간 revalidateTag·updateTag·revalidatePath로 관련 캐시를 무효화해요.', 'fetch(API, { next: { tags: ["posts"] } })처럼 이름표를 달면 /blog, 홈, RSS처럼 그 데이터를 쓰는 모든 페이지를 한 번에 가리킬 수 있어요. 서버 액션에서 새 글을 저장한 뒤 revalidateTag("posts", "max")를 부르면 다음 방문 때 옛 값을 주면서 뒤에서 갱신해요. 저장한 사람이 바로 새 값을 봐야 하면 updateTag("posts")로 같은 요청 안에서 새 데이터를 읽어요(Next 16). revalidatePath("/blog")는 태그 대신 경로를 기준으로 무효화해요. CMS가 글을 발행할 때 웹훅으로 Route Handler를 불러 revalidateTag하는 패턴이 흔해요.', 'Tag your data, then invalidate the related caches with revalidateTag, updateTag or revalidatePath the moment the data changes.', 'Tagging a fetch, as in fetch(API, { next: { tags: ["posts"] } }), makes every page using that data addressable at once, such as /blog, the home page and the RSS feed. Calling revalidateTag("posts", "max") after saving a post in a server action serves the old value on the next visit while refreshing in the background. When the author must see the change immediately, updateTag("posts") reads fresh data within the same request (Next 16). revalidatePath("/blog") invalidates by route instead of by tag. A common pattern is a CMS webhook calling a route handler that runs revalidateTag on publish.', sRevalidate()),
    item('next-server-actions', '서버 액션', 'Server actions', '"use server"를 단 함수는 클라이언트에서 부를 수 있는 서버 함수예요. 폼 제출과 데이터 변경을 별도 API 없이 처리해요.', 'actions.ts에 "use server"와 함께 export async function addTodo(fd: FormData)를 만들고 <form action={addTodo}>에 넘기면, 제출 때 Next.js가 POST 요청으로 바꿔 서버에서 실행해요. JS가 로드되기 전에도 일반 폼처럼 동작해요(점진적 향상). 다만 서버 액션은 누구나 호출할 수 있는 공개 엔드포인트라, 안에서 zod 같은 도구로 입력을 검증하고 세션과 권한을 꼭 확인해야 해요. 저장 후 revalidatePath나 updateTag로 캐시를 갱신하면 같은 응답에 바뀐 화면이 내려와요. pending·오류 상태는 useActionState로 다뤄요.', 'A function marked "use server" is a server function callable from the client, handling form submissions and mutations without a separate API.', 'Exporting async function addTodo(fd: FormData) from an actions.ts with "use server" and passing it to <form action={addTodo}> makes Next.js turn submissions into POST requests that run on the server. The form works like a normal form even before JavaScript loads: progressive enhancement. Server actions are public endpoints that anyone can call, so validate input with a tool such as zod and check the session and permissions inside. Refreshing the cache with revalidatePath or updateTag after saving returns the updated UI in the same response, and useActionState handles pending and error states.', sServerActions()),
    item('next-route-handlers', 'Route Handler', 'Route handlers', 'app 아래 route.ts에서 GET·POST 같은 HTTP 메서드 이름으로 함수를 export하면 API 엔드포인트가 돼요. 웹 표준 Request·Response를 써요.', 'app/api/posts/route.ts의 export async function GET(req)는 req.nextUrl.searchParams로 쿼리를 읽고 Response.json(…)으로 JSON을 돌려줘요. POST는 await req.json()으로 본문을 읽고 { status: 201 }처럼 상태 코드를 함께 보내요. 결제사 웹훅, 모바일 앱, 외부 서비스처럼 내 화면 밖에서 부를 API는 Route Handler로 만들고, 내 화면의 폼은 서버 액션으로 처리하는 식으로 나눠 써요. 같은 폴더에 page.tsx와 route.ts를 함께 둘 수는 없고, Next 15부터 GET도 기본으로 캐시하지 않아요.', 'Exporting functions named after HTTP methods such as GET and POST from a route.ts under app creates API endpoints using standard Web Request and Response.', 'In app/api/posts/route.ts, export async function GET(req) reads queries from req.nextUrl.searchParams and returns JSON with Response.json(…). POST reads the body with await req.json() and sends a status code such as { status: 201 }. APIs called from outside your UI, such as payment webhooks, mobile apps and other services, become route handlers, while your own forms use server actions. A folder cannot contain both page.tsx and route.ts, and since Next 15 GET handlers are not cached by default.', sRouteHandlers()),
    item('next-env', '환경 변수', 'Environment variables', '서버 전용 값과 브라우저에 공개되는 값을 NEXT_PUBLIC_ 접두사로 구분해요. NEXT_PUBLIC_ 값은 빌드 때 JS에 박혀 누구나 볼 수 있어요.', 'DATABASE_URL 같은 비밀 값은 .env.local에 두고 git에 올리지 않아요. 서버 컴포넌트, 서버 액션, Route Handler는 모든 환경 변수를 process.env로 읽을 수 있어요. 브라우저에서 실행되는 코드에는 NEXT_PUBLIC_로 시작하는 변수만 전달되는데, 이 값은 빌드할 때 JS 번들에 문자열로 그대로 들어가 누구나 개발자 도구로 볼 수 있으니 비밀 키에는 절대 붙이지 않아요. .env, .env.development, .env.production처럼 환경별 파일이 있고 .env.local이 우선해요. 앱이 시작할 때 zod로 필수 변수를 검증하면 배포 실수를 일찍 잡아요.', 'The NEXT_PUBLIC_ prefix separates server-only values from values exposed to the browser, which are inlined into JavaScript at build time and visible to anyone.', 'Secrets such as DATABASE_URL go in .env.local and stay out of git. Server components, server actions and route handlers can read every variable through process.env. Browser code receives only variables starting with NEXT_PUBLIC_, and those values are inlined into the JavaScript bundle at build time where anyone can see them in developer tools, so never use the prefix for secrets. Per-environment files such as .env, .env.development and .env.production exist, with .env.local taking precedence. Validating required variables with zod at startup catches deployment mistakes early.', sEnv()),
  ]),
  sec('next-opt', '최적화', 'Optimization', '성능 최적화', 'Performance optimization', '이미지·글꼴·메타데이터를 자동으로 최적화하는 내장 기능과, 번들 크기와 Core Web Vitals를 관리하는 방법이에요.', 'Built-ins that optimize images, fonts and metadata, and managing bundle size and Core Web Vitals.', [
    item('next-image', 'next/image', 'next/image', '이미지 자리 예약, 기기별 크기·포맷 변환, 지연 로딩을 자동으로 해 주는 이미지 컴포넌트예요. LCP와 CLS를 함께 개선해요.', '<Image width={1200} height={600} />처럼 크기를 알려 주면 이미지가 늦게 와도 그 자리를 미리 잡아 두어 레이아웃이 밀리지 않아요. 휴대폰에는 640w, 데스크톱에는 1200w처럼 기기 폭에 맞는 크기를 AVIF·WebP로 변환해 srcset으로 제공해요. 기본은 화면에 가까워질 때 불러오는 지연 로딩이고, 첫 화면의 가장 큰 이미지에는 priority를 줘서 먼저 받아 LCP를 줄여요. 크기를 모르는 이미지는 fill로 부모를 채우고 sizes로 화면별 실제 표시 폭을 알려 줘요. 외부 이미지는 images.remotePatterns에 허용해야 하고 alt는 꼭 써요.', 'An image component that reserves space, converts sizes and formats per device and lazy-loads automatically, improving LCP and CLS together.', 'Giving sizes, as in <Image width={1200} height={600} />, reserves the space so late images never shift the layout. Each device gets a fitting size, such as 640w on phones and 1200w on desktops, converted to AVIF or WebP and offered through a srcset. Images lazy-load as they near the viewport by default, and priority on the largest above-the-fold image fetches it first to cut LCP. For unknown sizes, fill covers the parent and sizes states the displayed width per screen. Remote images must be allowed in images.remotePatterns, and alt text is always required.', sImage()),
    item('next-font', 'next/font', 'next/font', '글꼴을 빌드 때 내려받아 내 사이트에서 직접 제공하고, 대체 글꼴 크기를 맞춰 글꼴이 바뀔 때 레이아웃이 밀리지 않게 해요.', 'next/font/google의 Noto_Sans_KR({ weight: ["400", "700"], display: "swap" })은 빌드할 때 글꼴 파일을 받아 함께 배포해서, 사용자의 브라우저는 Google에 요청하지 않아요(개인정보와 속도에 유리). 대체 글꼴의 크기와 줄 간격을 실제 글꼴에 맞게 보정해, 웹 글꼴로 바뀌는 순간에도 글자가 출렁이지 않아요. variable 옵션으로 CSS 변수를 만들어 Tailwind의 font-sans 등에 연결해요. 직접 가진 글꼴 파일은 next/font/local로 같은 최적화를 받고, 쓰는 굵기만 지정해야 용량이 줄어요.', 'next/font downloads fonts at build time to serve them from your own site and adjusts fallback metrics so swapping fonts causes no layout shift.', 'Noto_Sans_KR({ weight: ["400", "700"], display: "swap" }) from next/font/google fetches the font files at build time and deploys them with the app, so browsers never contact Google, which helps both privacy and speed. Fallback font size and line metrics are adjusted to match, so text does not jump when the web font arrives. The variable option creates a CSS variable to wire into Tailwind’s font-sans and similar settings. Your own font files get the same treatment through next/font/local, and specifying only the weights you use keeps files small.', sFont()),
    item('next-metadata', 'Metadata API', 'The Metadata API', '검색 엔진과 링크 미리보기를 위한 <head> 정보를 metadata 객체, generateMetadata 함수, 파일 규칙으로 관리해요.', 'page나 layout에서 export const metadata = { title, description }을 내보내면 <head>의 태그가 돼요. 글마다 다른 제목과 대표 이미지는 generateMetadata에서 params로 데이터를 가져와 만들어요. openGraph 정보는 메신저나 SNS에 링크를 붙였을 때 보이는 미리보기 카드가 돼요. app 폴더에 opengraph-image.tsx, sitemap.ts, robots.ts, icon.png 같은 파일을 두면 Next.js가 알맞은 태그와 경로를 자동으로 만들어요. 레이아웃의 메타데이터는 하위 페이지로 이어지고, title.template으로 “%s | 사이트명” 형식을 한 번에 정해요.', 'The Metadata API manages <head> data for search engines and link previews through a metadata object, a generateMetadata function and file conventions.', 'Exporting const metadata = { title, description } from a page or layout produces the <head> tags. Per-post titles and cover images come from generateMetadata, which reads params and fetches data. openGraph data becomes the preview card shown when a link is pasted into chats or social media. Files such as opengraph-image.tsx, sitemap.ts, robots.ts and icon.png in the app folder make Next.js generate the right tags and routes automatically. Layout metadata cascades to child pages, and title.template sets a format such as “%s | Site name” once.', sMetadata()),
    item('next-bundle', '번들 최적화', 'Bundle optimization', '처음 받는 JS를 줄이면 로딩과 반응 속도가 함께 좋아져요. 동적 import, 작은 클라이언트 경계, 서버 컴포넌트로 무거운 일 옮기기가 핵심이에요.', '차트처럼 무겁고 당장 필요 없는 컴포넌트는 dynamic(() => import("./Chart"))로 분리해 필요할 때 내려받아요. "use client" 파일 아래로 import한 모든 것이 브라우저 번들에 들어가므로, 경계는 버튼 같은 잎 컴포넌트에만 작게 둬요. 마크다운 변환이나 날짜 처리처럼 무거운 라이브러리는 서버 컴포넌트에서 쓰고 결과만 보내면 브라우저 JS는 0KB예요. @next/bundle-analyzer로 어떤 라이브러리가 큰지 눈으로 확인하고, 아이콘·유틸 라이브러리는 필요한 것만 import해요. next build의 First Load JS 크기를 꾸준히 지켜봐요.', 'Shipping less first-load JavaScript speeds up both loading and responsiveness; dynamic imports, small client boundaries and moving heavy work to server components are the key levers.', 'Heavy components not needed right away, such as charts, split out with dynamic(() => import("./Chart")) and load on demand. Everything imported below a "use client" file joins the browser bundle, so keep boundaries small around leaf components such as buttons. Heavy libraries for markdown conversion or date handling belong in server components, which send only results and cost the browser 0 KB. @next/bundle-analyzer shows which libraries are large, and icon and utility libraries should be imported selectively. Keep an eye on First Load JS in next build output.', sBundle()),
    item('next-cwv', 'Core Web Vitals', 'Core Web Vitals', '로딩(LCP), 반응성(INP), 시각 안정성(CLS)을 재는 구글의 사용자 경험 지표예요. 실제 사용자 데이터로 측정하고 검색 순위에도 영향을 줘요.', 'LCP는 가장 큰 콘텐츠(대표 이미지, 제목)가 보이기까지의 시간으로 2.5초 이내가 좋고, 이미지 priority와 스트리밍이 도움이 돼요. INP는 클릭·입력 뒤 다음 화면이 그려지기까지로 200ms 이내가 좋고, JS를 줄이고 긴 작업을 쪼개면 좋아져요. CLS는 읽는 도중 레이아웃이 밀리는 정도로 0.1 이하가 좋고, 이미지 크기 예약과 next/font가 막아 줘요. useReportWebVitals로 실제 사용자의 값을 모아 분석 도구로 보내고, 75번째 백분위수로 판단해요. Lighthouse는 실험실 값, CrUX는 실제 사용자 값이에요.', 'Google’s user-experience metrics for loading (LCP), responsiveness (INP) and visual stability (CLS), measured on real users and used in search ranking.', 'LCP is the time until the largest content, such as a hero image or headline, appears; under 2.5 s is good, helped by image priority and streaming. INP is the delay from a click or input to the next paint; under 200 ms is good, improved by shipping less JavaScript and splitting long tasks. CLS measures layout shifts while reading; 0.1 or less is good, prevented by reserved image sizes and next/font. useReportWebVitals collects real users’ values for analytics, judged at the 75th percentile. Lighthouse reports lab values and CrUX real-user field data.', sCwv()),
  ]),
  sec('next-ops', '빌드와 운영', 'Build & operations', '빌드, 배포, 운영', 'Building, deploying and operating', '빌드 결과를 읽는 법, 배포 선택지, 인증과 국제화 같은 실무 패턴, 그리고 두 라우터의 차이예요.', 'Reading build output, deployment options, practical patterns such as auth and i18n, and the two routers.', [
    item('next-build', '빌드와 출력', 'Builds and output', 'next build는 컴파일·타입 검사·사전 렌더를 하고 경로마다 정적(○)·SSG(●)·동적(ƒ) 여부와 크기를 보여줘요.', 'Next 16부터 Turbopack이 기본 번들러라 빌드가 더 빨라졌어요. 결과 표에서 ○는 빌드 때 HTML이 완성된 정적 페이지, ●는 generateStaticParams로 미리 만든 동적 경로, ƒ는 요청마다 서버에서 렌더하는 경로예요. 정적이어야 할 페이지가 ƒ로 나오면 cookies나 searchParams 같은 동적 API를 어디서 썼는지 찾아봐요. output: "standalone"은 실행에 필요한 파일만 모아 작은 Docker 이미지를 만들게 해 줘요. next start로 빌드 결과를 실행해 프로덕션 동작을 확인하고, 린트는 next build가 더 이상 하지 않으니 ESLint나 Biome을 따로 돌려요.', 'next build compiles, type-checks and prerenders, reporting for each route whether it is static (○), SSG (●) or dynamic (ƒ), along with its size.', 'Since Next 16, Turbopack is the default bundler and builds are faster. In the output table, ○ marks static pages whose HTML is finished at build, ● dynamic routes prebuilt via generateStaticParams, and ƒ routes rendered on the server per request. A page that should be static but shows ƒ has a dynamic API such as cookies or searchParams somewhere. output: "standalone" gathers only the files needed to run, enabling small Docker images. next start runs the build to check production behavior, and since next build no longer lints, run ESLint or Biome separately.', sBuild()),
    item('next-deploy', '배포와 런타임', 'Deployment and runtimes', 'Next.js는 Vercel 같은 관리형 플랫폼, Node 서버, Docker, 정적 내보내기로 배포할 수 있어요. 앱이 쓰는 기능에 따라 선택지가 달라져요.', 'Vercel에 연결하면 git push마다 자동으로 빌드·배포하고 브랜치마다 미리보기 URL을 만들어 줘요. 어디서든 next build 후 next start로 Node 서버를 띄우거나, standalone 출력으로 Docker 이미지를 만들어 AWS·GCP·자체 서버에 올려요. output: "export"는 순수 정적 파일만 만들어 S3나 GitHub Pages에도 올릴 수 있지만, SSR·서버 액션·proxy 같은 서버 기능은 못 써요. 라우트별로 runtime을 "edge"로 정하면 사용자 가까운 곳에서 빠르게 시작하지만 일부 Node API를 쓸 수 없어요. 자체 호스팅에서는 이미지 최적화와 ISR 캐시 설정이 더 필요해요.', 'Next.js deploys to managed platforms such as Vercel, Node servers, Docker or static export, with the choice depending on the features the app uses.', 'Connected to Vercel, every git push builds and deploys automatically, with a preview URL per branch. Anywhere else, run next start after next build on a Node server, or build a Docker image from standalone output for AWS, GCP or your own servers. output: "export" produces purely static files that can live on S3 or GitHub Pages, but without server features such as SSR, server actions or the proxy. Setting a route’s runtime to "edge" starts quickly near users at the cost of some Node APIs. Self-hosting needs extra setup for image optimization and ISR caching.', sDeploy()),
    item('next-auth', '인증 패턴', 'Authentication patterns', '로그인하면 httpOnly 세션 쿠키를 발급하고, proxy로 빠르게 1차 검사한 뒤, 데이터에 접근하는 모든 곳에서 세션과 권한을 다시 확인해요.', '서버 액션에서 사용자를 확인한 뒤 (await cookies()).set("session", …, { httpOnly: true, secure: true })로 쿠키를 발급하면 JS로 읽을 수 없어 XSS에 강해요. proxy는 쿠키가 없으면 /login으로 보내는 빠른 1차 관문이지만, 2025년의 미들웨어 우회 취약점(CVE-2025-29927)처럼 이것만 믿으면 위험해요. 그래서 데이터를 읽고 바꾸는 서버 컴포넌트·서버 액션·Route Handler에서 getSession()으로 매번 다시 확인하고, 이 검사를 데이터 접근 계층(DAL)에 모아 두면 빠뜨리지 않아요. 직접 구현하기보다 Auth.js, Better Auth, Clerk 같은 검증된 도구를 쓰는 편이 안전해요.', 'Issue an httpOnly session cookie on login, run a quick first check in the proxy, then re-verify the session and permissions wherever data is accessed.', 'Verifying the user in a server action and setting the cookie with (await cookies()).set("session", …, { httpOnly: true, secure: true }) keeps it unreadable from JavaScript and resistant to XSS. The proxy is a quick first gate redirecting cookie-less visitors to /login, but relying on it alone is dangerous, as the 2025 middleware bypass (CVE-2025-29927) showed. Server components, server actions and route handlers that read or change data should check getSession() every time, and centralizing these checks in a data access layer keeps them from being missed. Proven tools such as Auth.js, Better Auth or Clerk are safer than rolling your own.', sAuth()),
    item('next-i18n', '국제화 라우팅', 'Internationalized routing', '언어를 [lang] URL 세그먼트로 두고, 번역 사전은 서버에서 읽고, 첫 방문 언어는 proxy가 Accept-Language로 정해요.', 'app/[lang]/page.tsx로 두면 /ko/about, /en/about처럼 언어가 URL에 들어가 검색 엔진도 언어별 페이지를 구분해요. generateStaticParams가 [{ lang: "ko" }, { lang: "en" }]를 돌려주면 언어별 페이지를 빌드 때 미리 만들어요. getDictionary(lang)으로 번역 사전을 서버 컴포넌트에서 읽으면 사전이 브라우저 번들에 들어가지 않아요. 첫 방문자는 proxy가 Accept-Language 헤더를 보고 /ko 같은 알맞은 언어 경로로 보내요. 복수형·날짜·숫자 형식은 next-intl 같은 라이브러리가 도와주고, <html lang>과 hreflang 링크도 언어별로 맞춰요.', 'Keep the language in a [lang] URL segment, read translation dictionaries on the server, and let the proxy pick the first visit’s language from Accept-Language.', 'With app/[lang]/page.tsx, the language appears in URLs such as /ko/about and /en/about, letting search engines distinguish language versions. When generateStaticParams returns [{ lang: "ko" }, { lang: "en" }], every language’s pages are prebuilt. Reading dictionaries with getDictionary(lang) in server components keeps them out of the browser bundle. For first visits, the proxy reads the Accept-Language header and redirects to the matching path, such as /ko. Libraries such as next-intl handle plurals, dates and number formats, and <html lang> and hreflang links should match each language.', sI18n()),
    item('next-pages-vs-app', 'Pages Router와 App Router', 'Pages Router and App Router', 'Pages Router는 페이지 단위 데이터 함수(getServerSideProps 등)로, App Router는 서버 컴포넌트가 직접 데이터를 가져오는 방식으로 동작해요. 둘은 한 프로젝트에 공존할 수 있어요.', 'Pages Router에서는 pages 폴더의 파일이 경로가 되고, getServerSideProps나 getStaticProps 같은 페이지 단위 함수가 데이터를 props로 넘기며, 모든 컴포넌트가 클라이언트에서 하이드레이션돼요. App Router는 서버 컴포넌트가 기본이라 필요한 컴포넌트가 직접 데이터를 await하고, 중첩 레이아웃·스트리밍·서버 액션을 지원해 보내는 JS가 적어요. 두 라우터는 한 프로젝트에 함께 있을 수 있어서 페이지 단위로 천천히 옮길 수 있지만, 같은 경로를 동시에 둘 수는 없어요. 새 프로젝트는 App Router로 시작하고, _app과 _document의 역할은 루트 레이아웃이 맡아요.', 'The Pages Router works through page-level data functions such as getServerSideProps, while the App Router lets server components fetch their own data; both can coexist in one project.', 'In the Pages Router, files under pages become routes, page-level functions such as getServerSideProps and getStaticProps pass data as props, and every component hydrates on the client. The App Router defaults to server components that await their own data, with nested layouts, streaming and server actions, and ships less JavaScript. The two routers can live in one project for gradual page-by-page migration, though the same path cannot exist in both. New projects start with the App Router, where the root layout takes over the roles of _app and _document.', sPagesVsApp()),
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
})();
