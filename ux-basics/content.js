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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'uxb-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono uxb-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono uxb-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c uxb-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono uxb-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c uxb-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'uxb-s uxb-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono uxb-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono uxb-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono uxb-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono uxb-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono uxb-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'uxb-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'uxb-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'uxb-xs uxb-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono uxb-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'uxb-a', g: 'uxb-g', r: 'uxb-r', w: 'uxb-w', m: 'cz-mono', s: 'uxb-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'uxb-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono uxb-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono uxb-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'uxb-xs ') + clsOf(c) + (o.w ? ' uxb-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.uxb-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.uxb-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.uxb-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.uxb-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.uxb-r .in{color:var(--danger);font-weight:800}
.uxb-g .in{color:var(--ok);font-weight:800}
.uxb-a .in{color:var(--accent);font-weight:800}
.uxb-w .in{color:var(--warn);font-weight:800}
.uxb-c .in{font-size:.6em;font-weight:700}
.uxb-c2 .in{font-size:.5em;font-weight:700}
.uxb-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.uxb-wr .in{white-space:normal!important}
.uxb-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.uxb-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== UI/UX basics · helpers ===== */
const CSSY = '.uxb-ic .in{color:inherit!important}.uxb-sm .in{font-size:.62em;font-weight:700}.uxb-lg .in{font-size:.95em;font-weight:800}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };
const zup = (S, ks) => ks.forEach(k => S.set(k, 0, { 'z-index': '3' }));
/* a centered text sample with explicit colors (for contrast and color demos) */
const smp = (S, k, x, y, w, h, text, fg, bg, st, o = {}) => sw(S, k, x, y, w, h, bg, st, Object.assign({ html: text, cls: 'uxb-ic ' + (o.big ? 'uxb-lg' : 'uxb-sm'), css: `color:${fg};display:flex;align-items:center;justify-content:center;border:.06em solid var(--line);${o.css || ''}` }, o.off ? { off: o.off } : {}));

/* ===== 1. UX foundations ===== */
function sPlanes() {
  return CW('ux-planes', {
    code: [['UX의 다섯 층 (J. J. Garrett)', 'five planes of UX (J. J. Garrett)'], ['5 표면: 색 · 글꼴 · 이미지', '5 surface: color, type, imagery'], ['4 뼈대: 배치 · 버튼 위치', '4 skeleton: layout, placement'], ['3 구조: 흐름 · 정보 구조', '3 structure: flows, information arch.'], ['2 범위: 기능 · 콘텐츠 목록', '2 scope: features, content'], ['1 전략: 사용자 니즈 · 사업 목표', '1 strategy: user needs, business goals']],
    hl: [[1, 1, 'ok'], [2, 2], [4, 2, 'warn'], [0, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, P = [['surface', 'accent', 70], ['skeleton', 'accent', 50], ['structure', 'accent', 35], ['scope', 'warn', 35], ['strategy', 'warn', 55]];
      P.forEach(([t, c, p], i) => { sw(S, 'p' + i, X, .4 + i * 1.05, 8.4, .85, tint(c, p), 0, { css: 'border:0' }); lbl(S, 'pl' + i, X + .3, .5 + i * 1.05, (5 - i) + ' ' + t, 'm', 0); });
      chip(S, 'ui', X + 8.7, .4, 3.3, 'UI', 'ok', 1, { h: .85 }); lbl(S, 'n1', X, 6.6, ['눈에 보이는 표면이 흔히 말하는 UI예요', 'the visible surface is what people call UI'], 'g', 1, { off: 2, w: 12 });
      chip(S, 'ix', X + 8.7, 1.45, 3.3, ['구조', 'IA · IxD'], 'accent', 2, { h: 1.9 }); lbl(S, 'n2', X, 6.6, ['뼈대와 구조: 어디에 무엇을, 어떤 순서로', 'skeleton and structure: what goes where, in which order'], 'a', 2, { off: 3, w: 12 });
      chip(S, 'st', X + 8.7, 3.55, 3.3, ['전략', 'strategy'], 'warn', 3, { h: 1.9 }); lbl(S, 'n3', X, 6.6, ['바닥에는 “누구의 어떤 문제를 푸나”가 있어요', 'underneath lies whose problem you are solving'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'up', [X - .6, 5.5], [X - .6, .5], 4, { color: 'ok' }); lbl(S, 'n4', X, 6.6, ['아래층 결정이 위층을 제약 · UX는 다섯 층 전체예요', 'lower planes constrain upper ones; UX spans all five'], 'a', 4, { w: 12 });
    },
    notes: [['사람들이 흔히 말하는 UI는 색, 글꼴, 아이콘, 이미지처럼 눈에 보이는 표면이에요', 'what people usually call UI is the visible surface: color, typography, icons and imagery'], ['그 아래 뼈대는 버튼과 정보의 배치, 구조는 화면 사이 흐름과 정보 구조(IA)를 정해요 · 인터랙션 디자인이 여기에 속해요', 'beneath it, the skeleton places buttons and information, and the structure defines flows between screens and information architecture, where interaction design lives'], ['맨 아래에는 어떤 기능과 콘텐츠를 넣을지(범위)와, 누구의 어떤 문제를 풀어 어떤 사업 목표를 이룰지(전략)가 있어요', 'at the bottom sit the scope, deciding features and content, and the strategy, deciding whose problem to solve for which business goal'], ['아래층의 결정이 위층을 제약해요 · 전략이 흔들리면 표면을 아무리 다듬어도 소용없어서, UX는 이 다섯 층 전체를 다루는 일이에요', 'decisions in lower planes constrain upper ones, so polishing the surface cannot fix a shaky strategy; UX covers all five planes']],
    fin: [['UI는 보이는 표면, UX는 전략부터 표면까지의 전체 경험이에요', 'UI is the visible surface; UX is the whole experience from strategy to surface', 'uxb-xs uxb-a'], ['층은 아래에서 위로 구체화돼요', 'planes get more concrete toward the top'], ['작업은 층을 오가며 반복돼요', 'real work iterates across planes']],
    caps: [['표면', 'Surface'], ['뼈대와 구조', 'Skeleton and structure'], ['범위와 전략', 'Scope and strategy'], ['아래에서 위로', 'Bottom up'], ['UI와 UX', 'UI and UX']]
  });
}

function sDiamond() {
  return CW('ux-double-diamond', {
    code: [['더블 다이아몬드 (영국 디자인 카운슬)', 'Double Diamond (UK Design Council)'], ['발견: 넓게 조사하기', 'discover: research widely'], ['정의: 진짜 문제로 좁히기', 'define: narrow to the real problem'], ['개발: 해결책을 넓게 펼치기', 'develop: explore many solutions'], ['전달: 시험하고 다듬어 출시', 'deliver: test, refine, ship'], ['문제를 먼저 제대로 정해요', 'get the right problem first']],
    hl: [[1, 1, 'ok'], [2, 1, 'warn'], [3, 1], [4, 2, 'ok']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, D = (k, x0, st, c) => { ed(S, k + 'a', [x0, 3.0], [x0 + 3.0, .6], st, { color: c, h: .1 }); ed(S, k + 'b', [x0, 3.0], [x0 + 3.0, 5.4], st, { color: c, h: .1 }); };
      const C = (k, x0, st, c) => { ed(S, k + 'a', [x0 + 3.0, .6], [x0 + 6.0, 3.0], st, { color: c, h: .1 }); ed(S, k + 'b', [x0 + 3.0, 5.4], [x0 + 6.0, 3.0], st, { color: c, h: .1 }); };
      D('d1', X, 1, 'ok'); lbl(S, 'l1', X + .5, 5.7, 'discover', 'm g', 1);
      lbl(S, 'n1', X, 6.6, ['가정을 버리고 사용자와 맥락을 넓게 조사해요', 'drop assumptions and research users and context widely'], 'g', 1, { off: 2, w: 12 });
      C('c1', X, 2, 'warn'); lbl(S, 'l2', X + 3.3, 5.7, 'define', 'm w', 2); chip(S, 'pb', X + 4.9, 2.5, 2.2, 'HMW?', 'warn', 2, { h: 1.0, css: 'z-index:3' });
      lbl(S, 'n2', X, 6.6, ['발견한 것을 모아 풀 문제 하나로 좁혀요', 'synthesize findings into one problem worth solving'], 'w', 2, { off: 3, w: 12 });
      D('d2', X + 6.0, 3, 'accent'); lbl(S, 'l3', X + 6.5, 5.7, 'develop', 'm a', 3);
      lbl(S, 'n3', X, 6.6, ['해결책을 많이 펼치고 빠르게 시제품으로', 'generate many solutions and prototype quickly'], 'a', 3, { off: 4, w: 12 });
      C('c2', X + 6.0, 4, 'ok'); lbl(S, 'l4', X + 9.3, 5.7, 'deliver', 'm g', 4);
      lbl(S, 'n4', X, 6.6, ['시험으로 하나를 골라 다듬고 내보낸 뒤 다시 배워요', 'test, pick and refine one, ship it and learn again'], 'g', 4, { w: 12 });
    },
    notes: [['더블 다이아몬드는 디자인 과정을 두 번의 “넓히기 → 좁히기”로 그려요 · 첫 단계 발견에서는 가정을 내려놓고 사용자와 맥락을 넓게 조사해요', 'the Double Diamond draws design as two rounds of widening then narrowing, starting with discover, where assumptions are set aside and users and context are researched widely'], ['정의 단계에서는 조사 결과를 모아 정말 풀어야 할 문제 하나로 좁혀요 · “어떻게 하면 ~할 수 있을까(HMW)?” 질문으로 정리하곤 해요', 'in define, findings are synthesized into the one problem truly worth solving, often phrased as a “How might we…?” question'], ['개발 단계에서는 다시 넓혀 여러 해결책을 내고, 스케치와 프로토타입으로 빠르게 만들어 봐요', 'develop widens again, generating several solutions and building them quickly as sketches and prototypes'], ['전달 단계에서 시험을 통해 하나를 골라 다듬고 출시해요 · 출시 후 배운 것이 다음 발견으로 이어져 과정은 반복돼요', 'deliver tests, selects and refines one solution for release, and what is learned after launch feeds the next discover, so the process repeats']],
    fin: [['더블 다이아몬드: 문제를 넓혔다 좁히고, 해결책을 넓혔다 좁혀요', 'Double Diamond: widen then narrow the problem, then widen and narrow the solution', 'uxb-xs uxb-a'], ['“올바른 것을 만들고, 그것을 올바르게”', '“build the right thing, then build it right”'], ['디자인 씽킹도 같은 흐름이에요', 'design thinking follows the same flow']],
    caps: [['발견', 'Discover'], ['정의', 'Define'], ['개발', 'Develop'], ['전달', 'Deliver'], ['더블 다이아몬드', 'The Double Diamond']]
  });
}

function sResearch() {
  return CW('ux-research', {
    code: [['말하는 것 vs 실제로 하는 것', 'what people say vs what they do'], ['정성: 왜? (인터뷰 · 관찰)', 'qualitative: why (interviews, observation)'], ['정량: 얼마나? (설문 · 데이터)', 'quantitative: how many (surveys, data)'], ['몇 명으로 패턴 → 큰 표본으로 확인', 'patterns from few, confirmed at scale'], ['유도 질문 ✗ “편하시죠?”', 'no leading questions: “easy, right?” ✗']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      ed(S, 'ax', [X, 3.0], [X + 12.0, 3.0], 0, { h: .06 }); ed(S, 'ay', [X + 6.0, .3], [X + 6.0, 5.7], 0, { h: .06 });
      lbl(S, 'say', X + 6.2, .2, ['말 (태도)', 'say (attitude)'], 'm', 0); lbl(S, 'do', X + 6.2, 5.3, ['행동', 'do (behavior)'], 'm', 0); lbl(S, 'ql', X, 3.15, ['정성', 'qual'], 'm a', 0); lbl(S, 'qn', X + 10.6, 3.15, ['정량', 'quant'], 'm w', 0);
      nd(S, 'iv', X + .4, 1.2, 4.6, ['인터뷰', 'interviews'], 'accent', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.6, ['인터뷰: 동기와 맥락, “왜”를 깊게', 'interviews dig into motives and context, the why'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'sv', X + 7.0, 1.2, 4.6, ['설문', 'surveys'], 'warn', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['설문: 많은 사람의 생각을 숫자로', 'surveys turn many opinions into numbers'], 'w', 2, { off: 3, w: 12 });
      nd(S, 'ut', X + .3, 3.9, 5.5, ['사용성 테스트', 'usability test'], 'ok', 3, { h: 1.0 }); nd(S, 'an', X + 6.6, 3.9, 5.0, ['로그 · A/B', 'logs · A/B'], 'ok', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['말과 행동은 달라요 · 행동 데이터로 확인', 'what people say differs from what they do; check behavior'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['여러 방법을 섞어 서로의 빈틈을 메워요', 'mix methods so each covers the others’ blind spots'], 'a', 4, { w: 12 });
    },
    notes: [['사용자 조사 방법은 사람들이 말하는 것(태도)을 보느냐 실제로 하는 것(행동)을 보느냐, 그리고 이유를 캐느냐(정성) 양을 재느냐(정량)로 나눠 볼 수 있어요', 'research methods can be mapped by whether they capture what people say (attitudes) or do (behavior), and whether they probe why (qualitative) or measure how many (quantitative)'], ['인터뷰는 소수와 깊게 이야기하며 동기와 맥락을 알아내요 · “최근에 ~했던 때를 말해 주세요”처럼 실제 경험을 묻고, “편하시죠?” 같은 유도 질문은 피해요', 'interviews go deep with a few people to uncover motives and context, asking about real past experiences rather than leading questions such as “easy, right?”'], ['설문은 많은 사람의 생각을 숫자로 모아 패턴이 얼마나 흔한지 확인해요 · 다만 사람들이 말한 것이라 실제 행동과 다를 수 있어요', 'surveys collect many opinions as numbers to see how common a pattern is, though they still record what people say rather than do'], ['사용성 테스트와 로그·A/B 테스트는 실제 행동을 봐요 · 소수 인터뷰로 패턴을 찾고 큰 표본의 행동 데이터로 확인하는 식으로 방법을 섞어요', 'usability tests, analytics and A/B tests observe real behavior, so teams combine methods, finding patterns in a few interviews and confirming them with behavioral data at scale']],
    fin: [['사용자 조사: 말과 행동, 정성과 정량을 섞어 서로를 확인해요', 'user research mixes attitudes and behavior, qualitative and quantitative, to cross-check', 'uxb-xs uxb-a'], ['질문보다 관찰이 정직해요', 'observation is more honest than questions'], ['조사 질문을 먼저 정하고 방법을 골라요', 'pick the research question before the method']],
    caps: [['인터뷰', 'Interviews'], ['설문', 'Surveys'], ['행동 관찰', 'Observing behavior'], ['방법 섞기', 'Mixing methods'], ['사용자 조사 방법', 'User research methods']]
  });
}

function sPersona() {
  return CW('ux-persona', {
    code: [['페르소나: 조사로 만든 대표 사용자', 'persona: a representative user'], ['목표 · 불편 · 사용 맥락', 'goals, pains, context of use'], ['인구통계보다 행동과 동기', 'behavior and motives over demographics'], ['JTBD: ~할 때, ~하고 싶다,', 'JTBD: when…, I want to…,'], ['  그래서 ~할 수 있게', '  so I can…'], ['상상으로 만든 페르소나 ✗', 'made-up personas ✗']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 2, 'warn'], [5, 1, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'pc', X, .3, 7.6, 5.2, ['페르소나', 'persona'], 'accent', 0, { tc: 'a' }); sw(S, 'av', X + .5, 1.1, 1.4, 1.4, tint('accent', 40), 0, { r: 1, css: 'border:0' }); lbl(S, 'nm', X + 2.2, 1.2, ['지은 · 29 · 회사원', 'Jieun, 29'], 'm', 0); lbl(S, 'q', X + 2.2, 1.85, ['“퇴근길에 빨리”', '“fast, on the go”'], 'm a', 0);
      lbl(S, 'g', X + .5, 3.0, ['목표: 10분 안에 장보기', 'goal: shop in 10 min'], 'm g', 1); lbl(S, 'p', X + .5, 3.65, ['불편: 한 손 · 흔들림', 'pain: one-handed'], 'm r', 1);
      lbl(S, 'n1', X, 6.6, ['나이보다 목표·불편·상황이 설계를 바꿔요', 'goals, pains and context shape design more than age'], 'g', 1, { off: 2, w: 12 }); lbl(S, 'n2', X, 6.6, ['“모두를 위한” 설계 대신 한 사람을 깊게', 'design deeply for someone instead of for everyone'], 'a', 2, { off: 3, w: 12 });
      chip(S, 'm', X + .5, 4.35, 6.6, ['이어 담기 · 한 손', 'resume · one hand'], 'ok', 2, { h: 1.0 });
      chip(S, 'jt', X + 8.0, .3, 4.0, 'JTBD', 'warn', 3, { h: 1.0 }); lbl(S, 'jt1', X + 8.0, 1.5, ['퇴근길에', 'when commuting'], 'm', 3); lbl(S, 'jt2', X + 8.0, 2.15, ['장을 끝내고 싶다', 'I want to shop'], 'm', 3); lbl(S, 'jt3', X + 8.0, 2.8, ['저녁을 지키려고', 'to save time'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['JTBD: 사람이 아니라 “해야 할 일”에 초점', 'JTBD focuses on the job to be done, not the person'], 'w', 3, { off: 4, w: 12 });
      [['인터뷰', 'interviews'], ['데이터', 'data']].forEach((t, i) => nd(S, 'src' + i, X + 8.0, 3.8 + i * 1.1, 4.0, t, 'line', 4, { h: 1.0 }));
      lbl(S, 'n4', X, 6.6, ['근거 없이 지어낸 페르소나는 편견을 굳혀요', 'personas without evidence just harden assumptions'], 'r', 4, { w: 12 });
    },
    notes: [['페르소나는 조사에서 나온 패턴을 한 사람처럼 정리한 대표 사용자예요 · 이름과 사진보다 목표, 불편, 사용 맥락이 핵심이에요', 'a persona condenses research patterns into one representative user, where goals, pains and context of use matter far more than name and photo'], ['“모두를 위한” 설계는 결국 누구에게도 딱 맞지 않아요 · 한 손으로 흔들리는 지하철에서 쓴다는 맥락이 큰 버튼과 이어하기 기능 같은 결정을 이끌어요', 'designing “for everyone” fits no one, while context such as using one hand on a moving train drives decisions such as large buttons and resuming a cart'], ['JTBD(Jobs to Be Done)는 사람보다 해결하려는 일에 집중해요 · “~할 때, ~하고 싶다, 그래서 ~할 수 있게” 형식으로 상황, 동기, 기대 결과를 적어요', 'Jobs to Be Done focuses on the job rather than the person, written as “when…, I want to…, so I can…” to capture situation, motivation and outcome'], ['인터뷰와 데이터 같은 근거 없이 상상으로 만든 페르소나는 팀의 편견을 굳힐 뿐이에요 · 조사가 쌓이면 페르소나도 고쳐요', 'personas imagined without evidence such as interviews and data only harden the team’s assumptions, so update them as research accumulates']],
    fin: [['페르소나와 JTBD: 근거 있는 대표 사용자와 해결할 일로 결정을 이끌어요', 'personas and JTBD steer decisions with evidence-based users and the jobs they need done', 'uxb-xs uxb-a'], ['페르소나는 2~4개면 충분해요', 'two to four personas are usually enough'], ['결정할 때 “지은이라면?” 하고 물어요', 'ask “what would Jieun do?” when deciding']],
    caps: [['대표 사용자', 'A representative user'], ['맥락이 설계를', 'Context drives design'], ['JTBD', 'Jobs to be done'], ['근거', 'Evidence'], ['페르소나와 JTBD', 'Personas and JTBD']]
  });
}

function sMental() {
  return CW('ux-mental-model', {
    code: [['멘탈 모델: 사용자가 믿는 동작 방식', 'mental model: how users believe it works'], ['시스템 모델: 실제 동작 방식', 'system model: how it really works'], ['둘이 어긋나면 실수와 불안', 'mismatch → errors and anxiety'], ['익숙한 관례 · 즉각적인 피드백으로', 'bridge with conventions and feedback'], ['  둘 사이에 다리를 놓아요', '  between the two']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'danger'], [3, 2, 'ok']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'u', X, .3, 5.6, 3.0, ['사용자 생각', 'user thinks'], 'accent', 0, { tc: 'a' }); lbl(S, 'u1', X + .4, 1.2, ['“저장 버튼을', '“I have to'], 'm', 0); lbl(S, 'u2', X + .4, 1.85, ['눌러야 저장돼”', 'press save”'], 'm', 0);
      tbox(S, 's', X + 6.4, .3, 5.6, 3.0, ['실제 동작', 'system does'], 'warn', 1, { tc: 'w' }); lbl(S, 's1', X + 6.8, 1.2, ['입력할 때마다', 'saves on every'], 'm', 1); lbl(S, 's2', X + 6.8, 1.85, ['자동 저장', 'keystroke'], 'm', 1);
      lbl(S, 'n1', X, 6.6, ['사용자는 머릿속 모델대로 행동해요', 'people act on the model in their heads'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'x', X + .3, 3.8, 11.4, ['저장 버튼을 찾다 불안해져요', 'no save button? afraid to close'], 'danger', 2, { h: 1.0, off: 3 });
      lbl(S, 'n2', X, 6.6, ['모델이 어긋나면 헤매거나 잘못 조작해요', 'mismatched models lead to confusion and mistakes'], 'r', 2, { off: 3, w: 12 });
      chip(S, 'fb', X + .3, 3.8, 11.4, ['✓ 모두 저장됨 · 2초 전', '✓ all changes saved · 2s ago'], 'ok', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['상태를 보여주는 피드백이 모델을 바로잡아요', 'status feedback corrects the model'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['조사로 사용자의 모델을 먼저 알아내요', 'research users’ models before designing'], 'a', 4, { w: 12 });
    },
    notes: [['멘탈 모델은 사용자가 “이건 이렇게 동작할 거야”라고 머릿속에 그리는 그림이에요 · 이전 경험과 다른 앱에서 배운 관례로 만들어져요', 'a mental model is the picture in a user’s head of how something works, built from past experience and conventions learned from other apps'], ['시스템 모델은 실제 동작 방식이에요 · 예를 들어 사용자는 저장 버튼을 눌러야 한다고 믿지만, 앱은 입력할 때마다 자동으로 저장할 수 있어요', 'the system model is how it actually works; users may believe they must press save while the app saves automatically on every change'], ['둘이 어긋나면 사용자는 저장 버튼을 찾아 헤매거나, 저장이 안 됐을까 봐 창을 닫지 못해요 · 잘못된 조작과 불안이 생겨요', 'when the two diverge, users hunt for a save button or fear closing the window, leading to mistakes and anxiety'], ['“모두 저장됨 · 2초 전” 같은 피드백과 익숙한 관례가 두 모델 사이에 다리를 놓아요 · 사용자의 모델은 조사로 먼저 알아내요', 'feedback such as “all changes saved, 2 seconds ago” and familiar conventions bridge the two models, and users’ models should be learned through research first']],
    fin: [['멘탈 모델: 사용자가 믿는 방식과 실제 동작을 맞추거나, 피드백으로 이어 줘요', 'mental models: align what users believe with how it works, or bridge the gap with feedback', 'uxb-xs uxb-a'], ['새로운 방식은 비용이 커요', 'novel interactions have a learning cost'], ['관례를 깰 땐 이유가 분명해야 해요', 'break conventions only for clear reasons']],
    caps: [['머릿속 모델', 'The model in the head'], ['어긋날 때', 'When they diverge'], ['피드백으로 잇기', 'Bridging with feedback'], ['먼저 알아내기', 'Learning it first'], ['멘탈 모델', 'Mental models']]
  });
}

function sAfford() {
  return CW('ux-affordance', {
    code: [['어포던스: 할 수 있는 행동', 'affordance: what actions are possible'], ['시그니파이어: 그 행동을 알리는 신호', 'signifier: the cue that reveals it'], ['문: 손잡이 → 당기기, 판 → 밀기', 'doors: handle → pull, plate → push'], ['UI: 버튼 모양 · 밑줄 · 커서 변화', 'UI: button shape, underline, cursor'], ['평평한 디자인일수록 신호가 중요', 'flatter designs need clearer signals']],
    hl: [[0, 1], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      sw(S, 'd1', X, .3, 3.6, 4.6, tint('warn', 30), 1, { css: 'border:.06em solid var(--line)' }); sw(S, 'hd', X + 2.6, 2.2, .35, 1.4, 'var(--ink-2)', 1, { r: .2, css: 'border:0' }); lbl(S, 'pl', X, 5.1, ['당기기', 'pull'], 'm w', 1);
      sw(S, 'd2', X + 4.2, .3, 3.6, 4.6, tint('accent', 25), 1, { css: 'border:.06em solid var(--line)' }); sw(S, 'pt', X + 5.0, 2.3, 2.0, .9, 'var(--ink-3)', 1, { r: .1, css: 'border:0' }); lbl(S, 'ps', X + 4.2, 5.1, ['밀기', 'push'], 'm a', 1);
      lbl(S, 'n1', X, 6.6, ['손잡이 모양이 “당기세요”라고 알려줘요', 'a handle’s shape says “pull”'], 'w', 1, { off: 2, w: 12 });
      chip(S, 'nb', X + 8.4, .5, 3.6, ['버튼', 'button'], 'accent', 2, { h: 1.0 }); lbl(S, 'lk', X + 8.4, 1.9, ['링크 →', 'link →'], 'a', 2); lbl(S, 'tx', X + 8.4, 2.6, ['그냥 글자', 'plain text'], 'm', 2);
      lbl(S, 'n2', X, 6.6, ['테두리·색·밑줄이 누를 수 있음을 알려요', 'borders, color and underlines signal clickability'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['신호가 없으면 기능이 있어도 못 찾아요', 'without a signifier, a feature might as well not exist'], 'r', 3, { off: 4, w: 12 }); chip(S, 'hd2', X + 8.4, 3.6, 3.6, ['스와이프?', 'swipe?'], 'danger', 3, { h: 1.0, off: 4 });
      lbl(S, 'n4', X, 6.6, ['평평한 디자인일수록 신호를 의식적으로 넣어요', 'flat designs must add signifiers deliberately'], 'a', 4, { w: 12 }); chip(S, 'hint', X + 8.4, 3.6, 3.6, ['← 밀기', '← swipe'], 'ok', 4, { h: 1.0 });
    },
    notes: [['어포던스는 물건이나 화면이 사람에게 허락하는 행동이에요 · 손잡이는 잡을 수 있게, 판은 밀 수 있게 해줘요 · 시그니파이어는 그 행동을 알려주는 신호예요', 'an affordance is an action an object or screen allows, such as grasping a handle or pushing a plate, and a signifier is the cue that communicates it'], ['돈 노먼의 문 예시처럼, 미는 문에 당기는 손잡이를 달면 사람들은 잘못 당겨요 · 모양이 행동을 말해 주기 때문이에요', 'as in Don Norman’s doors, a pull handle on a push door makes people pull, because shape communicates action'], ['화면에서는 버튼의 테두리와 배경, 링크의 색과 밑줄, 마우스 커서 변화가 “누를 수 있다”는 시그니파이어예요 · 그냥 글자와 구별돼야 해요', 'on screens, a button’s border and fill, a link’s color and underline and cursor changes signal clickability and must differ from plain text'], ['스와이프처럼 보이지 않는 동작은 신호가 없으면 아무도 찾지 못해요 · 평평한 디자인일수록 힌트, 아이콘, 첫 사용 안내 같은 신호를 의식적으로 넣어요', 'invisible gestures such as swipes go undiscovered without signifiers, so flat designs need deliberate hints, icons and first-use cues']],
    fin: [['어포던스와 시그니파이어: 할 수 있는 행동을 모양과 신호로 분명히 보여줘요', 'affordances and signifiers: make possible actions obvious through shape and cues', 'uxb-xs uxb-a'], ['누를 수 없는 것을 버튼처럼 꾸미지 않아요', 'never style non-clickable things as buttons'], ['아이콘만 있는 버튼엔 라벨을 더해요', 'add labels to icon-only buttons']],
    caps: [['문 손잡이', 'Door handles'], ['화면의 신호', 'Signals on screen'], ['숨은 기능', 'Hidden features'], ['신호 더하기', 'Adding signifiers'], ['어포던스와 시그니파이어', 'Affordances and signifiers']]
  });
}

/* ===== 2. visual design basics ===== */
function sGestalt() {
  return CW('ux-gestalt', {
    code: [['공통 영역: 같은 상자 = 한 묶음', 'common region: same box = one group'], ['폐쇄: 빈 곳을 채워 형태로 봐요', 'closure: we complete missing parts'], ['연속: 매끄러운 선을 따라가요', 'continuity: eyes follow smooth lines'], ['전경 · 배경: 앞에 뜬 것에 집중', 'figure-ground: focus on what floats'], ['카드 · 구분선 · 모달의 원리', 'how cards, dividers, modals work']],
    hl: [[0, 1, 'ok'], [1, 1], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      for (let i = 0; i < 8; i++) sw(S, 'd' + i, X + .6 + i * 1.4, 1.6, .7, .7, tint('accent', 70), 1, { r: 1, off: 2, css: 'border:0' });
      frame(S, 'r1', X + .3, 1.1, 4.3, 1.7, 'ok', 1, { w: .08, off: 2, r: .3 }); frame(S, 'r2', X + 4.5, 1.1, 7.2, 1.7, 'ok', 1, { w: .08, off: 2, r: .3 });
      lbl(S, 'n1', X, 6.6, ['간격이 같아도 테두리가 3개 · 5개 묶음을 만들어요', 'equal spacing, yet the boxes form groups of three and five'], 'g', 1, { off: 2, w: 12 });
      [[3.4, .5, 1.4, .1], [3.4, .5, .1, 1.4], [8.4, .5, -1.4, .1], [8.4, .5, -.1, 1.4], [3.4, 5.1, 1.4, -.1], [3.4, 5.1, .1, -1.4], [8.4, 5.1, -1.4, -.1], [8.4, 5.1, -.1, -1.4]].forEach(([x, y, w, h], i) => sw(S, 'c' + i, X + Math.min(x, x + w), Math.min(y, y + h), Math.abs(w) || .1, Math.abs(h) || .1, 'var(--ink-2)', 2, { off: 3, css: 'border:0', r: 0 }));
      lbl(S, 'n2', X, 6.6, ['모서리만 있어도 네모를 봐요 · 아이콘에 활용', 'corners alone read as a square, handy for icons'], 'a', 2, { off: 3, w: 12 });
      for (let i = 0; i < 7; i++) { sw(S, 'a' + i, X + .4 + i * 1.7, .6 + i * .65, .5, .5, tint('warn', 70), 3, { r: 1, off: 4, css: 'border:0' }); sw(S, 'b' + i, X + .4 + i * 1.7, 4.5 - i * .65, .5, .5, tint('ok', 70), 3, { r: 1, off: 4, css: 'border:0' }); }
      lbl(S, 'n3', X, 6.6, ['두 줄이 교차해도 우리는 곧은 두 선으로 봐요', 'two crossing paths still read as two straight lines'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'bg', X, .3, 12.0, 5.4, 'rgba(0,0,0,.35)', 4, { css: 'border:0' }); smp(S, 'md', X + 3.0, 1.4, 6.0, 3.0, ['대화상자', 'dialog'], 'var(--ink)', 'var(--surface)', 4, { big: 1, css: 'box-shadow:0 .3em 1em rgba(0,0,0,.3)' });
      lbl(S, 'n4', X, 6.6, ['배경을 어둡게 하면 앞의 대화상자가 “전경”이 돼요', 'dimming the back makes the dialog the figure'], 'a', 4, { w: 12 });
    },
    notes: [['공통 영역 원리: 같은 테두리나 배경 안에 있는 요소는 간격과 상관없이 한 묶음으로 보여요 · 카드와 섹션 배경이 이 원리를 써요', 'common region: elements inside the same border or background read as one group regardless of spacing, which is how cards and section backgrounds work'], ['폐쇄 원리: 사람은 끊긴 부분을 스스로 채워 완성된 형태로 봐요 · 모서리만 있어도 네모로 보여서 아이콘과 로고를 단순하게 만들 수 있어요', 'closure: people fill in gaps to see complete shapes, so four corners read as a square and icons and logos can stay minimal'], ['연속 원리: 눈은 매끄럽게 이어지는 선을 따라가요 · 교차하는 점들도 두 개의 곧은 선으로 읽히고, 정렬된 목록과 진행 표시가 이를 활용해요', 'continuity: the eye follows smooth paths, so crossing dots read as two straight lines, a principle used by aligned lists and progress indicators'], ['전경·배경 원리: 사람은 앞에 떠 있는 것과 뒤의 배경을 나눠 봐요 · 배경을 어둡게(딤) 하고 그림자를 주면 대화상자가 전경이 되어 시선이 모여요', 'figure-ground: people separate what floats in front from the background, so dimming the back and adding a shadow makes a dialog the figure and draws attention']],
    fin: [['게슈탈트 원리: 사람은 낱개가 아니라 묶음과 형태로 봐요 · 배치로 의미를 전해요', 'Gestalt principles: people see groups and shapes, not pieces, so layout carries meaning', 'uxb-xs uxb-a'], ['근접·유사성도 같은 계열의 원리예요', 'proximity and similarity belong to the same family'], ['선을 긋기 전에 여백으로 묶어 봐요', 'try grouping with space before drawing lines']],
    caps: [['공통 영역', 'Common region'], ['폐쇄', 'Closure'], ['연속', 'Continuity'], ['전경과 배경', 'Figure and ground'], ['게슈탈트 원리', 'Gestalt principles']]
  });
}

function sType() {
  return CW('ux-typography', {
    code: [['크기 단계: 비율로 (예: ×1.25)', 'type scale: by ratio, e.g. ×1.25'], '16 → 20 → 25 → 31 → 39 px', ['본문 줄 간격 1.4~1.6', 'body line height 1.4–1.6'], ['한 줄 45~75자 (영문 기준)', 'line length: 45–75 characters'], ['글꼴은 두 가지 이하', 'two typefaces at most']],
    hl: [[0, 2, 'ok'], [2, 1], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      [16, 20, 25, 31, 39].forEach((v, i) => { sw(S, 'ts' + i, X + 1.6, .4 + i * .85, v * .2, .55, tint('accent', 40 + i * 8), 1, { off: 2, css: 'border:0' }); lbl(S, 'tl' + i, X, .38 + i * .85, v + 'px', 'm', 1, { off: 2 }); });
      lbl(S, 'n1', X, 6.6, ['제멋대로가 아니라 일정한 비율로 크기를 정해요', 'sizes follow a consistent ratio, not whims'], 'g', 1, { off: 2, w: 12 });
      [0, 1, 2, 3].forEach(i => sw(S, 'tg' + i, X, .5 + i * .45, 5.4, .22, 'var(--ink-3)', 2, { off: 3, css: 'border:0' })); lbl(S, 'tgl', X, 2.5, ['빽빽함 ✗', 'cramped ✗'], 'm r', 2, { off: 3 });
      [0, 1, 2, 3].forEach(i => sw(S, 'lo' + i, X + 6.4, .5 + i * .7, 5.4, .22, 'var(--ink-3)', 2, { off: 3, css: 'border:0' })); lbl(S, 'lol', X + 6.4, 3.4, ['1.5 ✓', '1.5 ✓'], 'm g', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['줄 간격이 좁으면 다음 줄을 찾기 어려워요', 'tight leading makes the next line hard to find'], 'a', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => sw(S, 'wl' + i, X, .5 + i * .6, 12.0, .22, tint('danger', 60), 3, { off: 4, css: 'border:0' })); lbl(S, 'wll', X, 2.3, ['120자 ✗', '120 chars ✗'], 'm r', 3, { off: 4 });
      [0, 1, 2, 3].forEach(i => sw(S, 'nl' + i, X, 3.2 + i * .6, 6.2, .22, tint('ok', 60), 3, { off: 4, css: 'border:0' })); lbl(S, 'nll', X + 6.6, 3.9, ['65자 ✓', '65 chars ✓'], 'm g', 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['줄이 너무 길면 눈이 다음 줄 시작을 놓쳐요', 'overlong lines make eyes lose the next line start'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'f1', X, .6, 5.8, ['제목용 글꼴', 'heading font'], 'accent', 4, { h: 1.0 }); nd(S, 'f2', X + 6.2, .6, 5.8, ['본문용 글꼴', 'body font'], 'line', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['글꼴은 두 가지 이하 · 굵기와 크기로 위계를 줘요', 'two typefaces at most; build hierarchy with weight and size'], 'a', 4, { w: 12 });
    },
    notes: [['글자 크기는 16, 20, 25, 31, 39px처럼 일정한 비율(여기선 1.25)로 키운 단계(타입 스케일) 안에서 골라요 · 크기가 제각각이면 위계가 흐려져요', 'font sizes come from a type scale grown by a fixed ratio, here 1.25 giving 16, 20, 25, 31 and 39 px, because arbitrary sizes blur hierarchy'], ['본문 줄 간격은 글자 크기의 1.4~1.6배 정도가 편해요 · 너무 좁으면 다음 줄을 찾기 어렵고, 제목은 조금 더 좁게 둬요', 'body line height of about 1.4 to 1.6 times the font size reads comfortably, since tight leading makes the next line hard to find, while headings can be tighter'], ['한 줄 길이는 영문 기준 45~75자가 읽기 좋아요 · 넓은 화면에서도 본문 폭을 제한해야 눈이 다음 줄 시작을 놓치지 않아요', 'lines of about 45 to 75 characters read best, so limit body width even on wide screens to keep eyes from losing the next line'], ['글꼴은 보통 두 가지 이하로 써요 · 제목용과 본문용을 정하고, 위계는 새 글꼴 대신 굵기, 크기, 색으로 만들어요', 'use at most two typefaces, one for headings and one for body text, and build hierarchy with weight, size and color rather than more fonts']],
    fin: [['타이포그래피: 비율로 정한 크기 · 넉넉한 줄 간격 · 알맞은 줄 길이 · 적은 글꼴', 'typography: sizes from a ratio, generous leading, measured line length, few typefaces', 'uxb-xs uxb-a'], ['본문은 최소 16px 근처로', 'keep body text around 16 px or larger'], ['한글은 자간을 살짝 좁히기도 해요', 'Korean text often uses slightly tighter tracking']],
    caps: [['타입 스케일', 'Type scales'], ['줄 간격', 'Line height'], ['줄 길이', 'Line length'], ['글꼴 조합', 'Pairing typefaces'], ['타이포그래피 기초', 'Typography basics']]
  });
}

function sColor() {
  return CW('ux-color', {
    code: [['60 · 30 · 10: 바탕 · 보조 · 강조', '60 · 30 · 10: base, secondary, accent'], ['한 색을 밝기 단계로 (50~900)', 'one hue in steps (50–900)'], ['의미 색: 성공 · 경고 · 오류 · 정보', 'semantic: success, warning, error, info'], ['강조색은 아껴 써야 힘이 있어요', 'accents lose power when overused']],
    hl: [[0, 1, 'ok'], [1, 1], [2, 1, 'warn'], [3, 1]],
    lh: 1.35,
    draw: (S) => {
      const X = 19.4;
      sw(S, 'c60', X, .5, 7.2, 1.2, tint('line', 35), 1, { css: 'border:0' }); sw(S, 'c30', X + 7.2, .5, 3.6, 1.2, tint('accent', 35), 1, { css: 'border:0' }); sw(S, 'c10', X + 10.8, .5, 1.2, 1.2, 'var(--warn)', 1, { css: 'border:0' });
      lbl(S, 'p60', X, 1.85, '60%', 'm', 1); lbl(S, 'p30', X + 7.2, 1.85, '30%', 'm a', 1); lbl(S, 'p10', X + 10.8, 1.85, '10%', 'm w', 1);
      lbl(S, 'n1', X, 6.6, ['넓은 바탕, 보조색, 그리고 아주 적은 강조색', 'a wide base, a secondary color and a little accent'], 'g', 1, { off: 2, w: 12 });
      [10, 20, 32, 45, 58, 70, 82, 92, 100].forEach((p, i) => sw(S, 'sh' + i, X + i * 1.33, 2.8, 1.2, 1.0, tint('accent', p), 2, { css: 'border:0' })); lbl(S, 'shl', X, 3.95, '50 100 … 900', 'm', 2);
      lbl(S, 'n2', X, 6.6, ['한 색을 밝기 단계로 나눠 배경·테두리·글자에 써요', 'one hue split into steps serves backgrounds, borders and text'], 'a', 2, { off: 3, w: 12 });
      [['ok', ['성공', 'success']], ['warn', ['경고', 'warning']], ['danger', ['오류', 'error']], ['accent', ['정보', 'info']]].forEach(([c, t], i) => nd(S, 'se' + i, X + i * 3.03, 4.6, 2.9, t, c, 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['의미 색은 브랜드 색과 따로 · 늘 같은 뜻으로', 'semantic colors stay separate from brand and always mean one thing'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['모든 게 강조면 아무것도 강조되지 않아요', 'when everything is emphasized, nothing is'], 'a', 4, { w: 12 });
    },
    notes: [['60·30·10 규칙은 화면의 60%를 차분한 바탕색, 30%를 보조색, 10%를 강조색으로 나누는 출발점이에요 · 강조색이 적어야 시선이 모여요', 'the 60-30-10 rule is a starting point: 60% calm base color, 30% secondary and 10% accent, because scarce accents draw the eye'], ['한 가지 색을 50부터 900까지 밝기 단계로 나눠 두면, 연한 단계는 배경과 테두리에, 진한 단계는 글자와 버튼에 일관되게 쓸 수 있어요', 'splitting one hue into steps from 50 to 900 lets light steps serve backgrounds and borders and dark steps serve text and buttons consistently'], ['성공(초록), 경고(주황), 오류(빨강), 정보(파랑) 같은 의미 색은 브랜드 색과 따로 정하고, 화면 어디서나 같은 뜻으로만 써요', 'semantic colors such as success green, warning orange, error red and info blue are defined apart from brand colors and keep one meaning everywhere'], ['강조색을 여기저기 쓰면 아무것도 눈에 띄지 않아요 · 가장 중요한 행동 하나에만 강조색을 주고, 색만으로 뜻을 전하지 않게 아이콘이나 글자를 함께 써요', 'scattering accent color means nothing stands out, so reserve it for the single most important action and pair color with icons or text so meaning never relies on color alone']],
    fin: [['색 기초: 비율로 절제하고, 단계로 체계화하고, 의미 색은 일관되게', 'color basics: restrain by proportion, systematize in steps, keep semantic colors consistent', 'uxb-xs uxb-a'], ['다크 모드용 단계도 따로 정해요', 'define separate steps for dark mode'], ['대비는 항상 따로 확인해요', 'always check contrast separately']],
    caps: [['60·30·10', '60-30-10'], ['색 단계', 'Color steps'], ['의미 색', 'Semantic colors'], ['절제', 'Restraint'], ['색 사용의 기초', 'Color basics']]
  });
}

function sContrast() {
  return CW('ux-contrast', {
    code: [['명도 대비 = 밝은 색과 어두운 색의 비율', 'contrast = lighter vs darker luminance'], ['본문 글자: 4.5 : 1 이상 (AA)', 'body text: at least 4.5:1 (AA)'], ['큰 글자 · 아이콘 · 테두리: 3 : 1', 'large text, icons, borders: 3:1'], ['더 엄격하게: 7 : 1 (AAA)', 'stricter: 7:1 (AAA)'], ['“예뻐 보여서” 연한 회색 글자 ✗', 'pale gray text “for looks” ✗']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      smp(S, 'a', X, .4, 5.6, 1.6, ['연한 회색 글자', 'pale gray text'], '#aaaaaa', '#ffffff', 0); lbl(S, 'ar', X + 6.0, .85, '#AAA  2.3 : 1  ✗', 'm r', 0);
      smp(S, 'b', X, 2.3, 5.6, 1.6, ['읽기 쉬운 회색', 'readable gray'], '#767676', '#ffffff', 1, { off: 3 }); lbl(S, 'br', X + 6.0, 2.75, '#767676  4.5 : 1  ✓', 'm g', 1, { off: 3 });
      lbl(S, 'n1', X, 6.6, ['본문은 4.5:1 이상이어야 눈이 덜 피곤해요', 'body text needs 4.5:1 or more to stay readable'], 'g', 1, { off: 2, w: 12 });
      smp(S, 'c', X, 4.2, 5.6, 1.6, ['큰 제목', 'Big title'], '#949494', '#ffffff', 2, { big: 1 }); lbl(S, 'cr', X + 6.0, 4.65, '#949494  3 : 1  ✓', 'm w', 2);
      lbl(S, 'n2', X, 6.6, ['큰 글자와 버튼 테두리·아이콘은 3:1이 기준', 'large text, button borders and icons need 3:1'], 'w', 2, { off: 3, w: 12 });
      smp(S, 'd', X, 2.3, 5.6, 1.6, ['아주 선명한 글자', 'very crisp text'], '#595959', '#ffffff', 3); lbl(S, 'dr', X + 6.0, 2.75, '#595959  7 : 1  AAA', 'm a', 3);
      lbl(S, 'n3', X, 6.6, ['AAA는 7:1 · 노안이나 햇빛 아래에서도 잘 보여요', 'AAA asks for 7:1, legible even in sunlight'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['디자인 단계에서 대비 검사 도구로 확인해요', 'check contrast with a tool while designing'], 'a', 4, { w: 12 });
    },
    notes: [['명도 대비는 두 색의 상대 휘도 비율이에요 · 1:1(같은 색)부터 21:1(흰색과 검은색)까지 있고, 흰 바탕의 #AAA 회색 글자는 2.3:1밖에 안 돼서 읽기 어려워요', 'contrast is the ratio of two colors’ relative luminance, from 1:1 for identical colors to 21:1 for black on white, and #AAA gray on white reaches only 2.3:1'], ['WCAG AA 기준으로 본문 글자는 4.5:1 이상이어야 해요 · 흰 바탕이라면 #767676이 이 기준을 맞추는 가장 연한 회색이에요', 'under WCAG AA, body text needs at least 4.5:1, and #767676 is the lightest gray that passes on white'], ['큰 글자(약 24px, 또는 굵은 19px 이상)와 버튼 테두리, 아이콘 같은 UI 요소는 3:1이 기준이에요 · 흰 바탕의 #949494가 경계예요', 'large text (about 24 px, or 19 px bold) and UI elements such as button borders and icons need 3:1, with #949494 on white at the threshold'], ['더 엄격한 AAA는 본문 7:1이에요 · 저시력 사용자나 햇빛 아래 휴대폰처럼 어려운 조건을 생각해, 디자인 단계에서부터 대비 검사 도구로 확인해요', 'the stricter AAA level asks 7:1 for body text, which helps low-vision users and phones in sunlight, so check contrast with a tool from the design stage']],
    fin: [['명도 대비: 본문 4.5:1, 큰 글자·UI 3:1, AAA는 7:1', 'contrast: 4.5:1 for body text, 3:1 for large text and UI, 7:1 for AAA', 'uxb-xs uxb-a'], ['다크 모드도 따로 검사해요', 'test dark mode separately'], ['비활성 요소는 예외지만 구분은 돼야 해요', 'disabled controls are exempt but must still read as disabled']],
    caps: [['낮은 대비', 'Low contrast'], ['본문 기준', 'The body text rule'], ['큰 글자와 UI', 'Large text and UI'], ['AAA', 'AAA'], ['명도 대비', 'Color contrast']]
  });
}

function sGrid() {
  return CW('ux-grid', {
    code: [['열(column) · 거터(gutter) · 여백(margin)', 'columns, gutters, margins'], ['데스크톱 12열 · 태블릿 8열 · 모바일 4열', 'desktop 12, tablet 8, mobile 4'], ['콘텐츠는 열 단위로 차지해요', 'content spans whole columns'], ['간격은 4·8 배수로 맞춰요', 'spacing in multiples of 4 or 8']],
    hl: [[0, 1], [2, 1, 'ok'], [1, 1, 'warn'], [3, 1]],
    lh: 1.4,
    draw: (S) => {
      const X = 19.4, cw = .78, gw = .2;
      for (let i = 0; i < 12; i++) sw(S, 'g' + i, X + .3 + i * (cw + gw), .3, cw, 5.0, tint('danger', 15), 0, { css: 'border:0', r: 0 });
      lbl(S, 'gl', X, 5.45, ['12열 · 거터 · 바깥 여백', '12 columns · gutters · margins'], 'm', 1); lbl(S, 'n1', X, 6.6, ['보이지 않는 세로 칸이 배치의 기준선이 돼요', 'invisible columns become the backbone of layout'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'b1', X + .3, .8, 8 * (cw + gw) - gw, 2.4, tint('accent', 45), 2, { off: 3, css: 'border:0' }); sw(S, 'b2', X + .3 + 8 * (cw + gw), .8, 4 * (cw + gw) - gw, 2.4, tint('ok', 45), 2, { off: 3, css: 'border:0' }); lbl(S, 'b1l', X + .5, 1.0, '8 col', 'm', 2, { off: 3 }); lbl(S, 'b2l', X + .5 + 8 * (cw + gw), 1.0, '4 col', 'm', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['본문 8열 + 사이드 4열처럼 열 단위로 나눠요', 'split by columns, e.g. 8 for content and 4 for a sidebar'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'm', X + 4.0, .3, 4.0, 5.0, 'var(--surface)', 3, { css: 'border:.08em solid var(--line);z-index:3' }); for (let i = 0; i < 4; i++) sw(S, 'mg' + i, X + 4.25 + i * .9, .5, .75, 4.6, tint('danger', 18), 3, { css: 'border:0;z-index:4', r: 0 }); lbl(S, 'ml', X + 8.3, 2.5, ['모바일 4열', 'mobile: 4 col'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['화면이 좁아지면 열 수를 줄이고 블록을 쌓아요', 'fewer columns on small screens; blocks stack'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['간격도 4·8의 배수로 맞추면 리듬이 생겨요', 'spacing in multiples of 4 or 8 creates rhythm'], 'a', 4, { w: 12 });
    },
    notes: [['레이아웃 그리드는 화면을 같은 너비의 열(column)과 그 사이 간격(gutter), 바깥 여백(margin)으로 나눈 보이지 않는 기준선이에요', 'a layout grid divides the screen into equal columns, the gaps between them (gutters) and outer margins, forming an invisible backbone'], ['콘텐츠는 열 단위로 자리를 차지해요 · 본문 8열과 사이드바 4열처럼 나누면 서로 다른 화면에서도 정렬이 맞아 정돈돼 보여요', 'content spans whole columns, such as 8 for the body and 4 for a sidebar, so alignment stays consistent across screens'], ['흔히 데스크톱 12열, 태블릿 8열, 모바일 4열을 써요 · 화면이 좁아지면 열 수를 줄이고 옆에 있던 블록을 위아래로 쌓아요', 'common setups use 12 columns on desktop, 8 on tablet and 4 on mobile, stacking side-by-side blocks as the screen narrows'], ['요소 사이 간격도 4나 8의 배수로 맞추면 화면 전체에 일정한 리듬이 생기고, 디자이너와 개발자가 같은 숫자로 이야기할 수 있어요', 'spacing in multiples of 4 or 8 gives the whole screen a steady rhythm and a shared vocabulary for designers and developers']],
    fin: [['레이아웃 그리드: 열·거터·여백으로 배치의 기준을 세우고 화면 크기에 맞춰 열 수를 바꿔요', 'layout grids set columns, gutters and margins and change the column count with screen size', 'uxb-xs uxb-a'], ['그리드를 깨는 요소는 의도적으로', 'break the grid only on purpose'], ['CSS Grid로 그대로 구현할 수 있어요', 'CSS Grid implements it directly']],
    caps: [['열과 거터', 'Columns and gutters'], ['열 단위 배치', 'Spanning columns'], ['반응형 열', 'Responsive columns'], ['간격 리듬', 'Spacing rhythm'], ['레이아웃 그리드', 'Layout grids']]
  });
}

function sScan() {
  return CW('ux-scanning', {
    code: [['사람들은 읽지 않고 훑어봐요', 'people scan rather than read'], ['F 패턴: 글이 많은 화면', 'F-pattern: text-heavy pages'], ['Z 패턴: 요소가 적은 첫 화면', 'Z-pattern: sparse landing pages'], ['제목·문장의 첫 단어에 핵심을', 'front-load headings and sentences'], ['제목만 읽어도 흐름이 보이게', 'headings alone should tell the story']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      for (let i = 0; i < 7; i++) sw(S, 'tx' + i, X, .4 + i * .7, i % 3 === 0 ? 11.0 : 9.0, .3, 'var(--line)', 0, { css: 'border:0' });
      sw(S, 'f1', X, .3, 11.0, .55, tint('danger', 45), 1, { off: 2, css: 'border:0;z-index:3' }); sw(S, 'f2', X, 2.4, 6.5, .55, tint('danger', 40), 1, { off: 2, css: 'border:0;z-index:3' }); sw(S, 'f3', X, .3, 1.8, 4.9, tint('danger', 35), 1, { off: 2, css: 'border:0;z-index:3' });
      lbl(S, 'n1', X, 6.6, ['위 두 줄과 왼쪽 첫 단어들만 집중해서 봐요', 'eyes cover the top lines and the left edge'], 'r', 1, { off: 2, w: 12 });
      arw(S, 'z1', [X + .3, .5], [X + 11.6, .5], 2, { off: 3, color: 'warn' }); arw(S, 'z2', [X + 11.6, .6], [X + .4, 4.6], 2, { off: 3, color: 'warn' }); arw(S, 'z3', [X + .4, 4.7], [X + 11.6, 4.7], 2, { off: 3, color: 'warn' }); zup(S, ['z1', 'z2', 'z3']);
      lbl(S, 'n2', X, 6.6, ['요소가 적은 화면은 Z로 · 마지막 지점에 버튼을', 'sparse screens follow a Z; end it with the button'], 'w', 2, { off: 3, w: 12 });
      chip(S, 'fl', X, 5.2, 12.0, ['핵심 먼저: “배송 1일로 단축”', 'front-load: “1-day delivery now”'], 'ok', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['문장 앞 두세 단어에 핵심 정보를 둬요', 'put the key information in the first few words'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['제목만 훑어도 내용이 이해되게 써요', 'headings alone should convey the content'], 'a', 4, { w: 12 });
    },
    notes: [['사람들은 화면의 글을 처음부터 끝까지 읽지 않고 훑어봐요 · 시선 추적 연구에서 글이 많은 화면은 위쪽 두 줄과 왼쪽 첫 단어들에 시선이 몰리는 F 모양이 나와요', 'people scan rather than read, and eye-tracking studies show an F shape on text-heavy pages, with attention on the top lines and the first words at the left'], ['요소가 적은 랜딩 화면에서는 시선이 왼쪽 위에서 오른쪽, 대각선 아래, 다시 오른쪽으로 흐르는 Z 모양이 되기 쉬워서 마지막 지점에 행동 버튼을 둬요', 'sparse landing screens tend to produce a Z, from top left across, diagonally down and across again, so the call to action goes at the end'], ['그래서 제목과 문장 앞 두세 단어에 핵심 정보를 둬요 · “배송 기간이 3일에서 1일로 바뀌었습니다”보다 “배송 1일로 단축”이 훑을 때 잡혀요', 'so put key information in the first few words of headings and sentences: “1-day delivery now” is caught at a glance where a long explanation is not'], ['제목, 소제목, 굵은 글씨만 훑어도 내용의 흐름이 이해되게 쓰면(레이어 케이크 패턴) 훑어보는 사람도 원하는 곳을 빨리 찾아요', 'writing so that headings, subheadings and bold text alone convey the flow (the layer-cake pattern) lets scanners find what they need quickly']],
    fin: [['훑어보기 패턴: F·Z 시선 흐름에 맞춰 핵심을 왼쪽 위와 문장 앞에 둬요', 'scanning patterns: place key content top left and at the start of sentences, following F and Z paths', 'uxb-xs uxb-a'], ['문단은 짧게, 목록을 활용해요', 'keep paragraphs short; use lists'], ['중요한 것을 오른쪽 아래에 숨기지 않아요', 'do not hide essentials at the bottom right']],
    caps: [['F 패턴', 'The F-pattern'], ['Z 패턴', 'The Z-pattern'], ['핵심 먼저', 'Front-loading'], ['제목만으로', 'Headings alone'], ['훑어보기 패턴', 'Scanning patterns']]
  });
}

/* ===== 3. interaction basics ===== */
function sGulfs() {
  return CW('ux-gulfs', {
    code: [['실행의 간극: 어떻게 하지?', 'gulf of execution: how do I do it?'], ['평가의 간극: 됐나?', 'gulf of evaluation: did it work?'], ['실행 쪽 다리: 보이는 조작 · 신호', 'bridge execution: visible controls'], ['평가 쪽 다리: 즉각적인 피드백', 'bridge evaluation: immediate feedback'], ['두 간극이 좁을수록 쉬운 제품', 'narrow gulfs = easy products']],
    hl: [[0, 1, 'warn'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'ok']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'u', X, 2.0, 3.0, ['사용자', 'user'], 'accent', 0, { h: 1.6 }); nd(S, 's', X + 9.0, 2.0, 3.0, ['시스템', 'system'], 'line', 0, { h: 1.6 });
      sw(S, 'g1', X + 3.2, .65, 5.6, 1.0, tint('warn', 30), 1, { css: 'border:0' }); lbl(S, 'g1l', X + 3.6, .85, ['어떻게 하지?', 'how do I…?'], 'm w', 1, { off: 3 }); arw(S, 'e1', [X + 3.05, 2.4], [X + 8.95, 2.4], 1, { dash: 1 });
      lbl(S, 'n1', X, 6.6, ['하고 싶은 일을 어떤 조작으로 하는지 모르는 간극', 'not knowing which action achieves the goal'], 'w', 1, { off: 2, w: 12 });
      sw(S, 'g2', X + 3.2, 4.05, 5.6, 1.0, tint('warn', 30), 2, { css: 'border:0' }); lbl(S, 'g2l', X + 3.6, 4.25, ['됐나?', 'did it work?'], 'm w', 2, { off: 4 }); arw(S, 'e2', [X + 8.95, 3.3], [X + 3.05, 3.3], 2, { dash: 1 });
      lbl(S, 'n2', X, 6.6, ['결과가 보이지 않아 성공했는지 모르는 간극', 'not seeing whether it worked'], 'w', 2, { off: 3, w: 12 });
      chip(S, 'b1', X + 3.2, .65, 5.6, ['보이는 버튼', 'clear controls'], 'ok', 3, { h: 1.0, css: 'z-index:3' });
      lbl(S, 'n3', X, 6.6, ['할 수 있는 일이 보이면 실행의 간극이 좁아져요', 'visible options narrow the gulf of execution'], 'g', 3, { off: 4, w: 12 });
      chip(S, 'b2', X + 3.2, 4.05, 5.6, ['✓ 전송됨', '✓ sent'], 'ok', 4, { h: 1.0, css: 'z-index:3' });
      lbl(S, 'n4', X, 6.6, ['결과를 바로 보여주면 평가의 간극이 좁아져요', 'immediate results narrow the gulf of evaluation'], 'g', 4, { w: 12 });
    },
    notes: [['돈 노먼은 사용자와 시스템 사이에 두 간극이 있다고 설명했어요 · 실행의 간극은 하고 싶은 일을 어떤 조작으로 해야 하는지 모르는 상태예요', 'Don Norman described two gulfs between users and systems, the first being the gulf of execution: not knowing which action achieves the goal'], ['평가의 간극은 조작한 뒤 시스템이 어떻게 됐는지, 성공했는지 알 수 없는 상태예요 · 사용자는 같은 버튼을 다시 누르거나 불안해해요', 'the gulf of evaluation is not knowing what happened afterward or whether it worked, which leads users to press again or worry'], ['실행 쪽 다리는 할 수 있는 일을 보이게 하는 거예요 · 명확한 버튼과 라벨, 시그니파이어, 익숙한 관례가 “어떻게 하지?”를 줄여요', 'bridging execution means making options visible: clear buttons and labels, signifiers and familiar conventions reduce “how do I…?”'], ['평가 쪽 다리는 즉각적이고 알아보기 쉬운 피드백이에요 · “✓ 전송됨” 같은 결과 표시가 “됐나?”를 없애요 · 두 간극이 좁을수록 쉬운 제품이에요', 'bridging evaluation means immediate, legible feedback such as “✓ sent” that removes “did it work?”, and the narrower both gulfs, the easier the product']],
    fin: [['실행과 평가의 간극: 할 수 있는 일은 보이게, 결과는 바로 알 수 있게', 'gulfs of execution and evaluation: make actions visible and results immediately clear', 'uxb-xs uxb-a'], ['사용성 문제 대부분이 이 둘 중 하나예요', 'most usability problems are one of the two'], ['테스트에서 “지금 뭐가 된 거죠?”가 신호', 'in tests, “what just happened?” is the tell']],
    caps: [['실행의 간극', 'The gulf of execution'], ['평가의 간극', 'The gulf of evaluation'], ['보이는 조작', 'Visible controls'], ['즉각적인 피드백', 'Immediate feedback'], ['두 간극', 'The two gulfs']]
  });
}

function sHeur() {
  return CW('ux-heuristics', {
    code: [['1 시스템 상태 보여주기', '1 visibility of system status'], ['2 현실 세계와 맞는 말', '2 match the real world'], ['3 사용자 통제와 자유', '3 user control and freedom'], ['4 일관성과 표준', '4 consistency and standards'], ['5 오류 예방', '5 error prevention'], ['6 기억보다 알아보기', '6 recognition over recall'], ['7 유연성과 효율', '7 flexibility and efficiency'], ['8 미니멀한 디자인', '8 aesthetic, minimalist design'], ['9 오류 인식 · 진단 · 복구', '9 recognize, diagnose, recover'], ['10 도움말과 문서', '10 help and documentation']],
    hl: [[0, 5], [5, 5], [0, 10, 'warn'], [0, 10, 'ok']],
    lh: 1.12,
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'n1', X, 6.6, ['닐슨의 10가지 사용성 원칙 · 화면을 점검하는 체크리스트', 'Nielsen’s ten heuristics: a checklist for reviewing screens'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['원칙이라 규칙보다 넓어요 · 판단이 필요해요', 'broad rules of thumb that still need judgment'], 'a', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => nd(S, 'ev' + i, X + i * 4.1, .5, 3.8, ['평가자 ' + (i + 1), 'expert ' + (i + 1)], 'accent', 3, { h: 1.0 })); [0, 1, 2].forEach(i => arw(S, 'ea' + i, [X + 1.9 + i * 4.1, 1.55], [X + 6.0, 2.45], 3, { color: 'warn' })); nd(S, 'rp', X + 3.0, 2.5, 6.0, ['문제 목록 합치기', 'merge findings'], 'warn', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['3~5명이 각자 따로 점검한 뒤 결과를 합쳐요', 'three to five evaluators review alone, then merge'], 'w', 3, { off: 4, w: 12 });
      [0, 1, 2, 3, 4].forEach(v => nd(S, 'sv' + v, X + v * 2.42, 4.2, 2.2, String(v), v > 2 ? 'danger' : v > 1 ? 'warn' : 'line', 4, { h: 1.0 })); lbl(S, 'svl', X, 5.35, ['심각도 0(문제 아님) ~ 4(재앙)', 'severity 0 (none) to 4 (catastrophe)'], 'm', 4);
      lbl(S, 'n4', X, 6.6, ['심각도로 순서를 정해 고쳐요', 'fix in order of severity'], 'a', 4, { w: 12 });
    },
    notes: [['야콥 닐슨의 10가지 사용성 휴리스틱은 화면을 점검할 때 쓰는 원칙 목록이에요 · 시스템 상태 보여주기, 현실 세계와 맞는 말, 사용자 통제와 자유, 일관성과 표준, 오류 예방이 앞의 다섯이에요', 'Jakob Nielsen’s ten usability heuristics are principles for reviewing screens, starting with visibility of status, match with the real world, user control and freedom, consistency and standards, and error prevention'], ['뒤의 다섯은 기억보다 알아보기, 유연성과 효율(숙련자용 지름길), 미니멀한 디자인, 오류 인식·진단·복구를 돕기, 도움말과 문서예요', 'the other five are recognition over recall, flexibility and efficiency with shortcuts for experts, minimalist design, helping users recognize, diagnose and recover from errors, and help and documentation'], ['휴리스틱 평가는 3~5명의 평가자가 각자 따로 화면을 점검한 뒤 결과를 합치는 방법이에요 · 한 사람은 문제의 일부만 찾기 때문이에요', 'heuristic evaluation has three to five evaluators review screens independently and then merge results, because each person finds only part of the problems'], ['찾은 문제는 0(문제 아님)부터 4(출시 전 반드시 고칠 재앙)까지 심각도를 매겨 순서대로 고쳐요 · 사용자 테스트보다 싸고 빠르지만 대신하지는 못해요', 'findings are rated from 0 (not a problem) to 4 (a catastrophe to fix before release) and fixed in that order, a method cheaper and faster than user testing but no substitute for it']],
    fin: [['사용성 휴리스틱: 10가지 원칙으로 여러 명이 따로 점검하고, 심각도로 우선순위를 정해요', 'usability heuristics: several reviewers check against ten principles alone, then prioritize by severity', 'uxb-xs uxb-a'], ['초기 시안에도 바로 쓸 수 있어요', 'works even on early drafts'], ['실제 사용자 테스트와 함께 써요', 'pair it with real user testing']],
    caps: [['원칙 1~5', 'Heuristics 1–5'], ['원칙 6~10', 'Heuristics 6–10'], ['휴리스틱 평가', 'Heuristic evaluation'], ['심각도', 'Severity'], ['닐슨의 10가지 휴리스틱', 'Nielsen’s ten heuristics']]
  });
}

function sNav() {
  return CW('ux-navigation', {
    code: [['길찾기 세 가지 질문', 'three wayfinding questions'], ['  지금 어디? → 현재 위치 표시', '  where am I? → current location'], ['  어디로 갈 수 있지? → 메뉴', '  where can I go? → menus'], ['  어떻게 돌아가지? → 뒤로 · 경로', '  how do I get back? → back, path'], ['너무 깊지도 넓지도 않게', 'neither too deep nor too wide']],
    hl: [[1, 1, 'ok'], [2, 1], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      [['홈', 'Home'], ['의류', 'Clothing'], ['셔츠', 'Shirts']].forEach((t, i) => { lbl(S, 'bc' + i, X + i * 3.6, .4, t, 'm ' + (i === 2 ? 'a' : ''), 1); if (i < 2) lbl(S, 'bs' + i, X + 2.9 + i * 3.6, .4, '›', 'm', 1); });
      nd(S, 'ac', X, 1.2, 3.8, ['셔츠 ●', 'Shirts ●'], 'accent', 1, { h: 1.0 }); lbl(S, 'n1', X, 6.6, ['현재 위치: 경로 표시와 선택된 메뉴 강조', 'current location: breadcrumbs and a highlighted menu'], 'g', 1, { off: 2, w: 12 });
      [['남성', 'Men'], ['여성', 'Women'], ['아동', 'Kids'], ['세일', 'Sale']].forEach((t, i) => nd(S, 'mn' + i, X + i * 3.03, 2.6, 2.9, t, 'line', 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['갈 수 있는 곳은 늘 같은 자리에 보이게', 'keep destinations visible in a consistent place'], 'a', 2, { off: 3, w: 12 });
      chip(S, 'bk', X, 4.0, 3.8, ['← 뒤로', '← Back'], 'warn', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['뒤로 가기와 상위 경로로 언제든 빠져나오게', 'back and parent links offer a way out anytime'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'dp', X, 5.3, ['깊이 5단계 ✗ · 메뉴 30개 ✗', '5 levels deep ✗ · 30 items ✗'], 'm r', 4); lbl(S, 'n4', X, 6.6, ['정보 구조는 깊이와 너비의 균형 · 카드 소팅으로 검증', 'balance depth and breadth; validate with card sorting'], 'a', 4, { w: 12 });
    },
    notes: [['내비게이션은 사용자의 세 가지 질문에 답해야 해요 · 첫째 “지금 어디에 있지?”에는 경로 표시(브레드크럼)와 선택된 메뉴 강조로 답해요', 'navigation must answer three questions, the first being “where am I?”, answered with breadcrumbs and a highlighted current menu item'], ['둘째 “어디로 갈 수 있지?”에는 주요 목적지를 늘 같은 자리에 보이게 둔 메뉴로 답해요 · 숨겨진 메뉴는 덜 쓰여요', 'the second, “where can I go?”, is answered by menus that keep main destinations visible in a consistent place, since hidden menus get used less'], ['셋째 “어떻게 돌아가지?”에는 뒤로 가기와 상위 경로 링크로 답해요 · 언제든 빠져나올 수 있어야 사용자가 마음 놓고 탐색해요', 'the third, “how do I get back?”, is answered by back actions and parent links, because a reliable way out lets people explore freely'], ['정보 구조는 너무 깊어도(클릭이 많음) 너무 넓어도(선택지가 많음) 길을 잃어요 · 사용자의 언어로 묶고 카드 소팅과 트리 테스트로 검증해요', 'information architecture that is too deep means many clicks and too wide means too many choices, so group things in users’ language and validate with card sorting and tree testing']],
    fin: [['내비게이션: 지금 어디·어디로·어떻게 돌아가는지에 늘 답하게 설계해요', 'navigation should always answer where am I, where can I go and how do I get back', 'uxb-xs uxb-a'], ['메뉴 이름은 회사 조직이 아니라 사용자 말로', 'name menus in users’ words, not the org chart'], ['검색은 내비게이션을 대신하지 못해요', 'search does not replace navigation']],
    caps: [['지금 어디?', 'Where am I?'], ['어디로?', 'Where can I go?'], ['돌아가기', 'Getting back'], ['깊이와 너비', 'Depth and breadth'], ['내비게이션 설계', 'Navigation design']]
  });
}

function sStates() {
  return CW('ux-ui-states', {
    code: [['화면 하나에도 상태가 다섯 가지', 'one screen, five states'], ['이상적 · 빈 · 로딩 · 일부 · 오류', 'ideal, empty, loading, partial, error'], ['빈 상태: 다음 할 일을 안내', 'empty: guide the next step'], ['로딩: 모양을 미리 보여주기', 'loading: preview the shape'], ['오류: 이유와 해결 방법', 'error: cause and a way out']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'ph', X + 3.0, .2, 6.0, 5.6, ['장바구니', 'Cart'], 'line', 0);
      [0, 1, 2].forEach(i => { nd(S, 'it' + i, X + 3.3, 1.0 + i * 1.3, 5.4, ['상품 ' + (i + 1) + '  ₩12,000', 'item ' + (i + 1) + '  $9.90'], 'line', 0, { h: 1.0, off: 1 }); });
      lbl(S, 'n0', X, 6.6, ['디자인 시안에는 보통 “이상적” 상태만 있어요', 'mockups usually show only the ideal state'], 'a', 0, { off: 1, w: 12 });
      lbl(S, 'em', X + 3.5, 1.4, ['장바구니가 비었어요', 'Your cart is empty'], 'm', 1, { off: 2 }); chip(S, 'eb', X + 3.4, 2.4, 5.4, ['인기 상품 보기', 'Browse popular'], 'accent', 1, { h: 1.0, off: 2 });
      lbl(S, 'n1', X, 6.6, ['빈 상태: 왜 비었는지와 다음 행동을 알려줘요', 'empty state: explain why, offer the next action'], 'g', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => sw(S, 'sk' + i, X + 3.3, 1.0 + i * 1.3, 5.4, 1.0, tint('line', 35), 2, { off: 3, css: 'border:0' })); lbl(S, 'n2', X, 6.6, ['로딩: 스켈레톤으로 곧 나올 모양을 미리 보여줘요', 'loading: a skeleton previews the coming layout'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'er', X + 3.5, 1.4, ['불러오지 못했어요', 'Couldn’t load cart'], 'm r', 3, { off: 4 }); chip(S, 'rt', X + 3.5, 2.4, 5.0, ['다시 시도', 'Try again'], 'danger', 3, { h: 1.0, off: 4 }); lbl(S, 'n3', X, 6.6, ['오류: 무슨 일인지와 해결 방법을 함께', 'error: say what happened and how to recover'], 'r', 3, { off: 4, w: 12 });
      nd(S, 'p0', X + 3.3, 1.0, 5.4, ['상품 1  ₩12,000', 'item 1  $9.90'], 'line', 4, { h: 1.0 }); chip(S, 'pw', X + 3.3, 2.3, 5.4, ['⚠ 1개 품절', '⚠ 1 sold out'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['일부 상태: 일부만 성공했을 때도 설계해요', 'partial state: design for partial success too'], 'a', 4, { w: 12 });
    },
    notes: [['디자인 시안에는 보통 데이터가 잘 채워진 이상적인 상태만 있어요 · 하지만 실제 화면은 비었을 때, 불러오는 중, 일부만 있을 때, 오류일 때도 있어요(UI 스택)', 'mockups usually show only the ideal, data-filled state, but real screens also appear empty, loading, partial and in error, the so-called UI stack'], ['빈 상태는 왜 비어 있는지와 다음에 할 일을 알려주는 기회예요 · “장바구니가 비었어요”와 함께 인기 상품 보기 같은 행동을 제시해요', 'an empty state is a chance to explain why and suggest the next step, pairing “your cart is empty” with an action such as browsing popular items'], ['로딩 상태는 곧 나올 화면의 모양을 스켈레톤으로 미리 보여주면 덜 기다리는 것처럼 느껴져요 · 오류 상태는 무슨 일인지와 다시 시도 같은 해결 방법을 함께 줘요', 'loading states feel shorter when a skeleton previews the coming layout, and error states should say what happened alongside a way to recover such as trying again'], ['일부 상태는 일부만 성공했거나 일부 데이터만 있을 때예요 · 품절 상품 하나 때문에 전체가 실패한 것처럼 보이지 않게 해당 항목만 표시해요', 'partial states cover partial success or partial data, flagging only the affected item, such as one sold-out product, rather than failing everything']],
    fin: [['UI 상태: 이상적·빈·로딩·일부·오류 다섯 상태를 모두 설계해요', 'UI states: design all five, ideal, empty, loading, partial and error', 'uxb-xs uxb-a'], ['오프라인 상태도 따져 봐요', 'consider the offline state too'], ['개발 전에 상태 목록을 합의해요', 'agree on the list of states before building']],
    caps: [['빈 상태', 'Empty state'], ['로딩 상태', 'Loading state'], ['오류 상태', 'Error state'], ['일부 상태', 'Partial state'], ['UI 상태 설계', 'Designing UI states']]
  });
}

function sResp() {
  return CW('ux-response-time', {
    code: [['0.1초: 즉각 반응으로 느껴져요', '0.1 s: feels instantaneous'], ['1초: 흐름이 끊기지 않는 한계', '1 s: limit for uninterrupted flow'], ['10초: 집중이 유지되는 한계', '10 s: limit for keeping attention'], ['길어지면 진행률 · 남은 시간', 'longer waits: progress, time left'], ['체감 속도도 설계할 수 있어요', 'perceived speed can be designed']],
    hl: [[0, 1, 'ok'], [1, 1], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      ed(S, 'tl', [X, 1.3], [X + 12.0, 1.3], 0, { h: .08 }); [['0.1s', .4], ['1s', 3.6], ['10s', 9.6]].forEach(([t, x], i) => { ed(S, 'tk' + i, [X + x, 1.0], [X + x, 1.6], 0); lbl(S, 'tt' + i, X + x - .3, .2, t, 'm', 0); });
      chip(S, 'r1', X, 2.0, 4.6, ['누름 반응', 'press state'], 'ok', 1, { h: 1.0 }); lbl(S, 'n1', X, 6.6, ['0.1초 안의 반응은 내가 직접 움직인 느낌을 줘요', 'under 0.1 s feels like direct manipulation'], 'g', 1, { off: 2, w: 12 });
      chip(S, 'r2', X + 2.4, 3.1, 6.6, ['스피너 · 스켈레톤', 'spinner, skeleton'], 'accent', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['1초가 넘으면 기다리는 중이라는 표시가 필요해요', 'beyond 1 s, show that something is happening'], 'a', 2, { off: 3, w: 12 });
      chip(S, 'r3', X + 4.4, 4.2, 7.6, ['진행률 67% · 약 5초', '67% · about 5 s left'], 'warn', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['10초 가까이면 진행률과 남은 시간, 취소 버튼까지', 'near 10 s, show progress, time left and a cancel option'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'op', X, 5.3, 12.0, ['낙관적 UI · 미리 불러오기', 'optimistic UI, prefetching'], 'ok', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['실제 시간이 같아도 체감 속도는 설계로 줄여요', 'design can shorten perceived time without changing real time'], 'a', 4, { w: 12 });
    },
    notes: [['반응 시간에는 오래된 세 가지 기준이 있어요 · 0.1초 안의 반응은 즉각적으로 느껴져서, 버튼 눌림 표시처럼 내가 직접 움직인다는 감각을 줘요', 'three classic response-time limits apply, and responses within 0.1 s feel instantaneous, giving a sense of direct manipulation such as a button’s pressed state'], ['1초 안이면 기다림을 느껴도 생각의 흐름은 끊기지 않아요 · 1초가 넘을 것 같으면 스피너나 스켈레톤으로 진행 중임을 보여줘요', 'within 1 s users notice the delay but keep their train of thought, and anything longer needs a spinner or skeleton to show progress'], ['10초는 집중이 유지되는 한계예요 · 그 이상 걸리는 작업은 진행률, 남은 시간, 취소 버튼을 보여주고 다른 일을 할 수 있게 해요', '10 s is the limit for holding attention, so longer tasks should show progress, time remaining and a cancel button, and let people do other things'], ['실제 시간이 같아도 체감 속도는 설계로 줄일 수 있어요 · 결과를 먼저 반영하는 낙관적 UI, 다음 화면 미리 불러오기, 먼저 준비된 부분부터 보여주기가 있어요', 'perceived speed can improve without changing real time, through optimistic UI that reflects results first, prefetching the next screen and showing ready parts progressively']],
    fin: [['반응 시간: 0.1초·1초·10초 기준에 맞춰 피드백을 고르고 체감 속도를 설계해요', 'response times: choose feedback by the 0.1 s, 1 s and 10 s limits and design perceived speed', 'uxb-xs uxb-a'], ['아주 짧은 로딩엔 스피너가 오히려 깜빡여요', 'spinners flicker on very short loads'], ['느린 네트워크로 테스트해 봐요', 'test on throttled networks']],
    caps: [['0.1초', '0.1 seconds'], ['1초', '1 second'], ['10초', '10 seconds'], ['체감 속도', 'Perceived speed'], ['반응 시간', 'Response times']]
  });
}

function sOnboard() {
  return CW('ux-onboarding', {
    code: [['처음 쓰는 사람을 첫 성공까지', 'take newcomers to a first success'], ['슬라이드 투어 5장 ✗ → 대부분 건너뜀', 'five-slide tours ✗ → mostly skipped'], ['필요한 순간에 알려주기', 'teach at the moment of need'], ['체크리스트로 진행 보여주기', 'show progress with a checklist'], ['가치까지 걸리는 시간을 줄여요', 'shorten time to value']],
    hl: [[0, 1], [1, 1, 'danger'], [2, 1, 'ok'], [3, 2, 'warn']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      [0, 1, 2, 3, 4].forEach(i => nd(S, 'sl' + i, X + i * 2.42, .5, 2.2, (i + 1) + '/5', 'line', 1, { h: 1.0, off: 2 })); lbl(S, 'sk', X, 1.7, ['건너뛰기 →', 'skip →'], 'm r', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['시작 전 설명 투어는 대부분 건너뛰고 잊어요', 'upfront tours are mostly skipped and forgotten'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'btn', X, .5, 5.4, ['+ 새 프로젝트', '+ New project'], 'accent', 2, { h: 1.0 }); chip(S, 'tip', X, 1.75, 12.0, ['↑ 여기서 첫 프로젝트를 만들어요', '↑ start your first project here'], 'ok', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['필요한 순간에 그 자리에서 하나씩 알려줘요', 'teach one thing at a time, right where it is needed'], 'g', 2, { off: 3, w: 12 });
      [['✓ 계정 만들기', '✓ create account', 'ok'], ['✓ 첫 프로젝트', '✓ first project', 'ok'], ['○ 팀원 초대', '○ invite a teammate', 'line']].forEach(([k, e, c], i) => nd(S, 'ck' + i, X, 3.1 + i * 1.1, 7.4, [k, e], c, 3, { h: 1.0 })); lbl(S, 'pg', X + 7.8, 4.35, '2 / 3', 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['체크리스트는 남은 단계와 진행을 보여줘요', 'checklists show what is left and how far along you are'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['첫 성공(가치)까지 걸리는 시간을 재고 줄여요', 'measure and shorten the time to a first success'], 'a', 4, { w: 12 });
    },
    notes: [['온보딩은 처음 쓰는 사람을 제품의 가치를 처음 느끼는 순간까지 데려가는 과정이에요 · 가입 자체가 아니라 첫 성공이 목표예요', 'onboarding takes newcomers to the moment they first feel the product’s value, aiming at a first success rather than just sign-up'], ['시작하자마자 슬라이드 다섯 장으로 기능을 설명하는 투어는 대부분 건너뛰고, 본 사람도 금방 잊어요', 'five-slide feature tours at launch are mostly skipped, and those who watch them quickly forget'], ['대신 필요한 순간에 그 자리에서 하나씩 알려줘요 · 빈 화면에서 “여기서 첫 프로젝트를 만들어요”처럼 바로 해볼 수 있게 안내해요', 'instead, teach one thing at a time where and when it is needed, such as a hint on the empty screen saying “start your first project here”'], ['체크리스트는 남은 단계와 진행 정도를 보여줘서 마무리하고 싶게 만들어요 · 가입부터 첫 성공까지 걸리는 시간을 지표로 재며 줄여 가요', 'checklists show remaining steps and progress, nudging people to finish, and teams measure and shrink the time from sign-up to first success']],
    fin: [['온보딩: 설명보다 해보게 · 필요한 순간에 · 첫 성공까지의 시간을 줄여요', 'onboarding: let people do rather than read, teach at the moment of need, shorten time to first success', 'uxb-xs uxb-a'], ['기본값과 샘플 데이터로 빈 화면을 줄여요', 'defaults and sample data reduce empty screens'], ['언제든 다시 볼 수 있게 도움말을 남겨요', 'keep help available afterward']],
    caps: [['투어의 한계', 'Why tours fail'], ['필요한 순간에', 'At the moment of need'], ['체크리스트', 'Checklists'], ['가치까지의 시간', 'Time to value'], ['온보딩', 'Onboarding']]
  });
}

/* ===== 4. responsive and accessible ===== */
function sResponsive() {
  return CW('ux-responsive', {
    code: [['모바일부터 설계하고 넓혀가요', 'design mobile first, then expand'], ['브레이크포인트: 콘텐츠가 깨지는 곳', 'breakpoints: where content breaks'], ['  예) 600px · 1024px', '  e.g. 600 px, 1024 px'], ['3열 → 1열로 쌓기 · 우선순위 순서', '3 columns → 1, in priority order'], ['글자 크기도 화면에 맞춰 유동적으로', 'fluid type scales with the screen']],
    hl: [[0, 1, 'ok'], [1, 2], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'mb', X, .3, 3.2, 5.4, '360', 'accent', 1, { tc: 'a' }); [0, 1, 2].forEach(i => sw(S, 'mb' + i, X + .3, 1.0 + i * 1.5, 2.6, 1.3, tint(['accent', 'ok', 'warn'][i], 40), 1, { css: 'border:0' }));
      lbl(S, 'n1', X, 6.6, ['좁은 화면에서 가장 중요한 것부터 정해요', 'decide what matters most on the narrowest screen'], 'g', 1, { off: 2, w: 12 });
      tbox(S, 'tb', X + 3.6, .3, 8.4, 3.0, '1024+', 'warn', 2, { tc: 'w' }); [0, 1, 2].forEach(i => sw(S, 'tb' + i, X + 3.9 + i * 2.7, 1.0, 2.4, 2.0, tint(['accent', 'ok', 'warn'][i], 40), 2, { css: 'border:0' }));
      lbl(S, 'n2', X, 6.6, ['기기 이름이 아니라 레이아웃이 깨지는 폭에서 바꿔요', 'switch where the layout breaks, not at device names'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'st', X + 3.6, 3.6, ['넓으면 3열 · 좁으면 쌓기', 'wide 3 col → stacked'], 'm w', 3); lbl(S, 'n3', X, 6.6, ['좁아질 때 쌓이는 순서 = 중요도 순서', 'the stacking order is the priority order'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'cl', X + 3.6, 4.5, 8.4, 'clamp(1.5rem,4vw,3rem)', 'line', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.6, ['제목 크기도 화면 폭에 따라 부드럽게 커져요', 'heading sizes grow smoothly with the viewport'], 'a', 4, { w: 12 });
    },
    notes: [['반응형 디자인은 하나의 화면이 휴대폰부터 데스크톱까지 여러 폭에 맞게 바뀌게 하는 방식이에요 · 좁은 화면부터 설계하면 정말 중요한 것만 남게 돼요(모바일 퍼스트)', 'responsive design adapts one interface from phones to desktops, and starting from the narrowest screen keeps only what truly matters (mobile first)'], ['브레이크포인트는 특정 기기 이름이 아니라 레이아웃이 깨지기 시작하는 폭에서 정해요 · 흔히 600px, 1024px 근처를 써요', 'breakpoints belong where the layout starts to break rather than at device names, commonly around 600 px and 1024 px'], ['넓은 화면의 3열은 좁아지면 1열로 쌓여요 · 쌓이는 순서가 곧 중요도 순서라서, 무엇을 위에 둘지 미리 정해야 해요', 'three columns on wide screens stack into one when narrow, and the stacking order is the priority order, so decide what comes first'], ['글자 크기도 CSS clamp()로 최솟값과 최댓값 사이에서 화면 폭에 따라 부드럽게 바뀌게 할 수 있어요(유동 타이포그래피)', 'type can scale smoothly with the viewport between a minimum and maximum using CSS clamp(), known as fluid typography']],
    fin: [['반응형 디자인: 모바일부터 · 콘텐츠 기준 브레이크포인트 · 우선순위대로 쌓기 · 유동 글자', 'responsive design: mobile first, content-based breakpoints, priority stacking, fluid type', 'uxb-xs uxb-a'], ['터치와 마우스 입력 차이도 고려해요', 'consider touch versus mouse input too'], ['실제 기기에서 확인해요', 'verify on real devices']],
    caps: [['모바일 퍼스트', 'Mobile first'], ['브레이크포인트', 'Breakpoints'], ['쌓는 순서', 'Stacking order'], ['유동 글자', 'Fluid type'], ['반응형 디자인', 'Responsive design']]
  });
}

function sThumb() {
  return CW('ux-thumb-zone', {
    code: [['한 손 사용: 엄지가 닿는 범위', 'one-handed: where the thumb reaches'], ['아래 가운데: 편함 · 위 구석: 어려움', 'bottom center easy, top corners hard'], ['자주 쓰는 행동은 아래쪽에', 'frequent actions toward the bottom'], ['터치 영역 44pt · 48dp 이상', 'touch targets: 44 pt / 48 dp+'], ['위험한 버튼은 손이 잘 안 가는 곳에', 'destructive actions out of easy reach']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4 + 3.0;
      tbox(S, 'ph', X, .2, 5.4, 5.8, '', 'line', 0);
      sw(S, 'z3', X + .2, .4, 5.0, 1.8, tint('danger', 25), 1, { css: 'border:0' }); sw(S, 'z2', X + .2, 2.2, 5.0, 1.6, tint('warn', 30), 1, { css: 'border:0' }); sw(S, 'z1', X + .2, 3.8, 5.0, 2.0, tint('ok', 35), 1, { css: 'border:0' });
      lbl(S, 'l3', X + 5.7, .9, ['어려움', 'hard'], 'm r', 1); lbl(S, 'l2', X + 5.7, 2.7, ['보통', 'ok'], 'm w', 1); lbl(S, 'l1', X + 5.7, 4.5, ['편함', 'easy'], 'm g', 1);
      lbl(S, 'n1', X - 3.0, 6.6, ['큰 화면일수록 위쪽 구석은 손이 닿기 어려워요', 'on big phones the top corners are hard to reach'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'tab', X + .3, 4.7, 4.8, ['탭 바 · 버튼', 'tab bar'], 'ok', 2, { h: 1.0, css: 'z-index:3' }); lbl(S, 'n2', X - 3.0, 6.6, ['자주 쓰는 내비게이션과 버튼은 아래쪽에', 'put frequent navigation and buttons at the bottom'], 'g', 2, { off: 3, w: 12 });
      frame(S, 'tt', X + 2.1, 3.85, 1.2, .8, 'warn', 3, { w: .1, dash: 1 }); lbl(S, 'ttl', X - 3.0, 3.95, '44pt →', 'm w', 3); lbl(S, 'n3', X - 3.0, 6.6, ['손가락은 커서보다 커요 · 터치 영역은 넉넉하게', 'fingers are bigger than cursors; give generous targets'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'del', X + 3.3, .5, 1.8, ['삭제', 'del'], 'danger', 4, { h: 1.0, css: 'z-index:3' }); lbl(S, 'n4', X - 3.0, 6.6, ['되돌리기 어려운 버튼은 실수로 누르기 어렵게', 'make irreversible actions hard to hit by accident'], 'r', 4, { w: 12 });
    },
    notes: [['사람들은 휴대폰을 한 손으로 들고 엄지로 쓰는 경우가 많아요 · 엄지가 편하게 닿는 곳은 화면 아래 가운데이고, 위쪽 구석은 손을 고쳐 잡아야 해요', 'people often hold phones in one hand and use their thumb, which reaches the bottom center easily while top corners require a regrip'], ['그래서 탭 바, 주요 행동 버튼처럼 자주 쓰는 것은 아래쪽에 둬요 · 최근 앱들이 검색창과 주요 버튼을 아래로 내리는 이유예요', 'so frequent elements such as tab bars and primary buttons go toward the bottom, which is why recent apps move search bars and main actions down'], ['손가락 끝은 마우스 커서보다 훨씬 커요 · 터치 영역은 iOS 44pt, 안드로이드 48dp 이상으로 넉넉하게 하고, 버튼 사이도 충분히 띄워요', 'fingertips are far bigger than cursors, so touch targets should be at least 44 pt on iOS and 48 dp on Android, with enough space between them'], ['반대로 삭제처럼 되돌리기 어려운 버튼은 엄지가 잘 가지 않는 곳에 두거나 확인을 거치게 해서 실수로 누르지 않게 해요', 'conversely, irreversible actions such as delete belong out of easy reach or behind a confirmation so they are not hit by accident']],
    fin: [['엄지 영역: 자주 쓰는 것은 아래에, 터치 영역은 넉넉하게, 위험한 것은 멀리', 'thumb zones: frequent actions low, generous targets, risky actions far away', 'uxb-xs uxb-a'], ['왼손잡이와 태블릿도 고려해요', 'consider left-handed users and tablets'], ['가장자리 제스처와 충돌을 피해요', 'avoid conflicts with system edge gestures']],
    caps: [['엄지가 닿는 곳', 'Where thumbs reach'], ['아래로', 'Moving things down'], ['터치 영역', 'Touch targets'], ['위험한 버튼', 'Risky buttons'], ['엄지 영역', 'Thumb zones']]
  });
}

function sDark() {
  return CW('ux-dark-mode', {
    code: [['순수 검정 #000 대신 짙은 회색', 'dark gray instead of pure #000'], ['  예) #121212', '  e.g. #121212'], ['높이 = 그림자 대신 더 밝은 표면', 'elevation = lighter surface, not shadow'], ['원색은 채도를 낮춰서', 'desaturate saturated colors'], ['글자: 흰색 87% · 보조 60%', 'text: 87% white, secondary 60%']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      smp(S, 'b0', X, .3, 5.8, 2.6, ['#000 · 번짐', '#000 · smearing'], '#ffffff', '#000000', 1); smp(S, 'b1', X + 6.2, .3, 5.8, 2.6, '#121212', 'rgba(255,255,255,.87)', '#121212', 1);
      lbl(S, 'n1', X, 6.6, ['순수 검정은 대비가 너무 세서 글자가 번져 보여요', 'pure black is so harsh that text seems to smear'], 'a', 1, { off: 2, w: 12 });
      [['#121212', 0], ['#1e1e1e', 1], ['#2c2c2c', 2]].forEach(([c, i]) => smp(S, 'el' + i, X + i * 4.1, 3.3, 3.8, 1.3, ['높이 ' + i, 'elev ' + i], 'rgba(255,255,255,.87)', c, 2));
      lbl(S, 'n2', X, 6.6, ['어두운 곳에선 그림자가 안 보여 표면을 밝혀 높이 표현', 'shadows vanish in the dark, so lighter surfaces show elevation'], 'g', 2, { off: 3, w: 12 });
      smp(S, 'c0', X, 4.9, 5.8, 1.0, ['원색 파랑 ✗', 'saturated blue ✗'], '#0000ff', '#121212', 3); smp(S, 'c1', X + 6.2, 4.9, 5.8, 1.0, ['연한 파랑 ✓', 'softer blue ✓'], '#8ab4f8', '#121212', 3);
      lbl(S, 'n3', X, 6.6, ['채도 높은 색은 어두운 바탕에서 떨려 보여요', 'saturated colors vibrate on dark backgrounds'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['글자 위계는 흰색의 불투명도(87%·60%)로', 'build text hierarchy with white at 87% and 60%'], 'a', 4, { w: 12 });
    },
    notes: [['다크 모드 바탕은 순수 검정(#000)보다 #121212 같은 짙은 회색이 좋아요 · 순수 검정 위의 흰 글자는 대비가 너무 세서 번져 보이고 눈이 피로해요', 'dark mode backgrounds work better as a deep gray such as #121212 than pure black, because white text on #000 is so harsh it appears to smear'], ['밝은 모드에서는 그림자로 높이를 보여주지만, 어두운 화면에서는 그림자가 잘 안 보여요 · 대신 위에 떠 있는 표면일수록 조금씩 더 밝게 해서 높이를 표현해요', 'light mode shows elevation with shadows, which disappear in the dark, so higher surfaces get progressively lighter instead'], ['채도가 높은 원색은 어두운 바탕에서 떨려 보이고 대비도 부족해요 · 브랜드 색도 다크 모드용으로 채도를 낮추고 밝기를 올린 버전을 따로 정해요', 'highly saturated colors vibrate and lack contrast on dark backgrounds, so define desaturated, lighter dark-mode versions of brand colors'], ['글자는 순백 대신 흰색 87%(주요), 60%(보조), 38%(비활성)처럼 불투명도로 위계를 줘요 · 대비 검사도 다크 모드에서 따로 해요', 'text uses white at opacities such as 87% primary, 60% secondary and 38% disabled rather than pure white, and contrast is checked separately in dark mode']],
    fin: [['다크 모드: 짙은 회색 바탕 · 밝기로 높이 · 채도 낮춘 색 · 불투명도로 위계', 'dark mode: deep gray base, elevation by lightness, desaturated colors, hierarchy by opacity', 'uxb-xs uxb-a'], ['단순히 색을 뒤집는 게 아니에요', 'it is not a simple color inversion'], ['사용자의 시스템 설정을 따라요', 'follow the user’s system setting']],
    caps: [['짙은 회색 바탕', 'A deep gray base'], ['밝기로 높이', 'Elevation by lightness'], ['채도 낮추기', 'Desaturating'], ['글자 위계', 'Text hierarchy'], ['다크 모드 설계', 'Designing dark mode']]
  });
}

function sWcag() {
  return CW('ux-wcag', {
    code: [['WCAG: 웹 접근성 국제 지침', 'WCAG: international accessibility guide'], ['인식: 볼 수 없어도 알 수 있게', 'perceivable: alt text, captions'], ['운용: 키보드로도 쓸 수 있게', 'operable: works with a keyboard'], ['이해: 예측 가능하고 쉬운 말로', 'understandable: predictable, plain'], ['견고: 보조 기술과 호환되게', 'robust: works with assistive tech'], ['수준 A · AA · AAA (보통 AA 목표)', 'levels A, AA, AAA (aim for AA)']],
    hl: [[1, 1, 'ok'], [2, 1, 'warn'], [3, 2], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, P = [['P', ['인식', 'perceive'], 'ok'], ['O', ['운용', 'operate'], 'warn'], ['U', ['이해', 'understand'], 'accent'], ['R', ['견고', 'robust'], 'line']];
      P.forEach(([l, t, c], i) => { nd(S, 'p' + i, X + i * 3.03, .4, 2.9, l, c, i < 2 ? i + 1 : 3, { h: 1.2 }); lbl(S, 'pt' + i, X + i * 3.03 + (i === 3 ? .3 : 0), 1.75, t, 'm', i < 2 ? i + 1 : 3); });
      lbl(S, 'e1', X, 2.6, ['이미지 대체 텍스트 · 영상 자막 · 대비', 'alt text · captions · contrast'], 'm g', 1); lbl(S, 'n1', X, 6.6, ['눈이나 귀 대신 다른 감각으로도 정보를 받게', 'information reaches people through more than one sense'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'e2', X, 3.3, ['키보드 · 충분한 시간 · 깜빡임 금지', 'keyboard · enough time · no flashing'], 'm w', 2); lbl(S, 'n2', X, 6.6, ['마우스 없이, 서두르지 않고도 쓸 수 있게', 'usable without a mouse and without rushing'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'e3', X, 4.0, ['쉬운 말 · 일관된 동작 · 오류 안내', 'plain words · consistency · error help'], 'm a', 3); lbl(S, 'e4', X, 4.7, ['올바른 HTML · 이름·역할·상태', 'valid HTML · name, role, state'], 'm', 3); lbl(S, 'n3', X, 6.6, ['이해하기 쉽고, 스크린 리더가 읽을 수 있게', 'easy to understand and readable by screen readers'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'lv', X, 5.35, 12.0, ['A < AA (법·조달 기준) < AAA', 'A < AA (legal baseline) < AAA'], 'accent', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['대부분의 법과 정책은 AA를 기준으로 삼아요', 'most laws and policies target level AA'], 'a', 4, { w: 12 });
    },
    notes: [['WCAG(웹 콘텐츠 접근성 지침)는 장애가 있는 사람도 웹을 쓸 수 있게 하는 국제 지침이에요 · 첫 원칙 “인식 가능”은 이미지 대체 텍스트, 영상 자막, 충분한 대비처럼 한 감각에만 의존하지 않게 해요', 'WCAG (Web Content Accessibility Guidelines) makes the web usable for people with disabilities, and its first principle, perceivable, avoids reliance on a single sense through alt text, captions and sufficient contrast'], ['“운용 가능”은 모든 기능을 키보드로 쓸 수 있고, 시간 제한에 여유가 있고, 발작을 일으킬 수 있는 깜빡임이 없게 해요', 'operable means every function works with a keyboard, time limits are generous and nothing flashes in ways that can trigger seizures'], ['“이해 가능”은 쉬운 말, 예측 가능한 동작, 오류 안내를, “견고함”은 올바른 HTML과 이름·역할·상태 정보로 스크린 리더 같은 보조 기술과 호환되게 해요', 'understandable covers plain language, predictable behavior and error guidance, and robust means valid HTML exposing name, role and state to assistive technologies such as screen readers'], ['기준은 A, AA, AAA 세 수준이 있고, 대부분의 법과 공공 조달 기준은 AA를 요구해요 · 접근성은 장애인뿐 아니라 모든 사람의 사용성을 높여요', 'there are three levels, A, AA and AAA, and most laws and procurement rules require AA, while accessibility improves usability for everyone']],
    fin: [['WCAG: 인식·운용·이해·견고(POUR) 네 원칙, 보통 AA 수준을 목표로 해요', 'WCAG rests on four principles, perceivable, operable, understandable and robust (POUR), usually targeting AA', 'uxb-xs uxb-a'], ['자동 검사는 문제의 일부만 찾아요', 'automated checks catch only part of the issues'], ['스크린 리더로 직접 써 봐요', 'try your product with a screen reader']],
    caps: [['인식', 'Perceivable'], ['운용', 'Operable'], ['이해와 견고', 'Understandable and robust'], ['준수 수준', 'Conformance levels'], ['WCAG와 POUR', 'WCAG and POUR']]
  });
}

function sKeyboard() {
  return CW('ux-keyboard', {
    code: [['Tab 순서 = 보이는 순서', 'tab order = visual order'], ['포커스 표시는 항상 보이게', 'focus indicators always visible'], ['“본문으로 건너뛰기” 링크', '“skip to content” link'], ['모달: 포커스를 안에 가두고', 'modals: trap focus inside,'], ['  Esc로 닫고 원래 자리로', '  Esc closes, focus returns']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, F = [[0, .4, 3.6, ['로고', 'logo']], [4.1, .4, 3.6, ['메뉴', 'menu']], [8.2, .4, 3.8, ['검색', 'search']], [0, 2.0, 5.8, ['이름', 'name']], [6.2, 2.0, 5.8, ['이메일', 'email']], [0, 3.6, 12.0, ['보내기', 'submit']]];
      F.forEach(([x, y, w, t], i) => nd(S, 'f' + i, X + x, y + .5, w, t, 'line', 0, { h: 1.0 }));
      F.forEach(([x, y], i) => lbl(S, 'o' + i, X + x + .15, y - .2, String(i + 1), 'm a', 1));
      lbl(S, 'n1', X, 6.6, ['Tab을 누르면 왼쪽 위부터 읽는 순서대로 이동해요', 'Tab moves in reading order, from the top left'], 'a', 1, { off: 2, w: 12 });
      frame(S, 'fr', X + 6.05, 2.35, 6.1, 1.3, 'accent', 2, { w: .14, r: .3 }); lbl(S, 'n2', X, 6.6, ['지금 어디에 있는지 포커스 테두리로 늘 보여줘요', 'a focus ring always shows where you are'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'sk', X, 5.35, 6.0, ['본문으로 건너뛰기', 'skip to content'], 'warn', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['매 페이지 반복되는 메뉴를 건너뛰게 해줘요', 'lets users skip menus repeated on every page'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'dim', X, .2, 12.0, 5.0, 'rgba(0,0,0,.35)', 4, { css: 'border:0;z-index:4' }); smp(S, 'md', X + 2.5, 1.2, 7.0, 2.6, ['대화상자 · Esc로 닫기', 'dialog · Esc to close'], 'var(--ink)', 'var(--surface)', 4, { css: 'z-index:5;border:.14em solid var(--accent)' });
      lbl(S, 'n4', X, 6.6, ['모달 안에서만 포커스가 돌고, 닫으면 원래 버튼으로', 'focus stays inside the modal and returns on close'], 'a', 4, { w: 12 });
    },
    notes: [['마우스를 쓸 수 없는 사람, 스크린 리더 사용자, 키보드가 빠른 숙련자 모두 키보드로 화면을 다뤄요 · Tab 순서는 화면에 보이는 읽기 순서와 같아야 해요', 'people who cannot use a mouse, screen reader users and keyboard-savvy experts all navigate by keyboard, so tab order must follow the visual reading order'], ['지금 어느 요소에 있는지 보여주는 포커스 표시는 절대 없애면 안 돼요 · 기본 테두리가 디자인과 안 맞으면 지우지 말고 더 잘 보이게 바꿔요', 'focus indicators showing the current element must never be removed; if the default ring clashes with the design, restyle it more visibly instead'], ['“본문으로 건너뛰기” 링크는 페이지마다 반복되는 메뉴를 건너뛰게 해줘요 · 평소엔 숨겨 두고 첫 Tab에서 나타나게 해요', 'a “skip to content” link lets users bypass menus repeated on every page, hidden until the first Tab press'], ['모달이 열리면 포커스를 그 안에 가두고, Esc로 닫으면 모달을 열었던 버튼으로 포커스를 돌려줘요 · 그래야 길을 잃지 않아요', 'when a modal opens, trap focus inside it, close it with Esc and return focus to the button that opened it, so users never get lost']],
    fin: [['키보드 접근성: 보이는 순서대로, 포커스는 늘 보이게, 건너뛰기와 모달 포커스 관리', 'keyboard accessibility: visual order, visible focus, skip links and managed modal focus', 'uxb-xs uxb-a'], ['div 대신 button·a 같은 기본 요소를 써요', 'use native elements such as button and a, not divs'], ['직접 마우스를 치우고 써 봐요', 'unplug the mouse and try it yourself']],
    caps: [['Tab 순서', 'Tab order'], ['포커스 표시', 'Focus indicators'], ['건너뛰기 링크', 'Skip links'], ['모달 포커스', 'Modal focus'], ['키보드 접근성', 'Keyboard accessibility']]
  });
}

/* ===== 5. design systems and collaboration ===== */
function sDS() {
  return CW('ux-design-system', {
    code: ['color.primary.500 = #3b5bdb', 'space.4 = 16px   radius.md = 8px', ['→ 컴포넌트: Button · Input · Card', '→ components: Button, Input, Card'], ['→ 패턴: 로그인 폼 · 빈 상태', '→ patterns: sign-in form, empty state'], ['→ 원칙과 가이드: 언제 무엇을', '→ guidelines: when to use what'], ['디자인 툴과 코드가 같은 원천을 써요', 'design tools and code share one source']],
    hl: [[0, 2, 'ok'], [2, 1], [3, 2, 'warn'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, L = [[['토큰', 'tokens'], 'ok'], [['컴포넌트', 'components'], 'accent'], [['패턴', 'patterns'], 'warn'], [['가이드라인', 'guidelines'], 'line']];
      L.forEach(([t, c], i) => nd(S, 'l' + i, X + i * .8, 4.6 - i * 1.3, 12.0 - i * 1.6, t, c, i + 1, { h: 1.0 }));
      lbl(S, 'n1', X, 6.6, ['색·간격·글꼴 값을 이름 붙은 토큰으로', 'named tokens hold colors, spacing and type'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['토큰으로 만든 재사용 컴포넌트', 'reusable components built from tokens'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['컴포넌트를 조합한 패턴과 쓰임새 원칙까지', 'patterns combine components, with usage principles'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['디자인 파일과 코드가 같은 원천을 쓰면 어긋나지 않아요', 'one source for design files and code keeps them in sync'], 'a', 4, { w: 12 });
    },
    notes: [['디자인 시스템의 바닥은 디자인 토큰이에요 · #3b5bdb 같은 값 대신 color.primary.500, space.4처럼 이름 붙은 값을 쓰면 한 곳만 바꿔도 전체가 바뀌어요', 'the base of a design system is design tokens: named values such as color.primary.500 and space.4 instead of raw values like #3b5bdb, so one change updates everything'], ['토큰 위에 버튼, 입력창, 카드 같은 재사용 컴포넌트를 만들어요 · 상태와 크기, 접근성까지 미리 고민해 두니 팀마다 다시 만들 필요가 없어요', 'reusable components such as buttons, inputs and cards are built on tokens, with states, sizes and accessibility worked out once so teams need not rebuild them'], ['컴포넌트를 조합한 로그인 폼, 빈 상태 같은 패턴과, 언제 어떤 컴포넌트를 쓰는지 알려주는 가이드라인까지 있어야 시스템이 완성돼요', 'a complete system also includes patterns that combine components, such as sign-in forms and empty states, and guidelines on when to use what'], ['디자인 도구의 라이브러리와 코드의 컴포넌트가 같은 토큰을 원천으로 쓰면 둘이 어긋나지 않아요 · Material, Carbon, Polaris가 공개된 예시예요', 'when the design library and coded components draw on the same tokens they stay in sync, as in public examples such as Material, Carbon and Polaris']],
    fin: [['디자인 시스템: 토큰 → 컴포넌트 → 패턴 → 가이드라인을 하나의 원천으로 관리해요', 'a design system manages tokens, components, patterns and guidelines from one source', 'uxb-xs uxb-a'], ['버전과 변경 기록을 관리해요', 'version it and keep a changelog'], ['사용 현황을 보고 개선해요', 'improve it by watching adoption']],
    caps: [['토큰', 'Tokens'], ['컴포넌트', 'Components'], ['패턴과 가이드라인', 'Patterns and guidelines'], ['하나의 원천', 'One source of truth'], ['디자인 시스템', 'Design systems']]
  });
}

function sAtomic() {
  return CW('ux-atomic', {
    code: [['원자: 라벨 · 입력 · 버튼', 'atoms: label, input, button'], ['분자: 검색창 (입력 + 버튼)', 'molecules: search box (input + button)'], ['유기체: 헤더 (로고 + 메뉴 + 검색)', 'organisms: header (logo, nav, search)'], ['템플릿: 빈 레이아웃', 'templates: layout without content'], ['페이지: 실제 콘텐츠가 들어간 화면', 'pages: templates with real content']],
    hl: [[0, 1, 'ok'], [1, 1], [2, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'a1', X, .4, 2.6, ['라벨', 'label'], 'ok', 1, { h: 1.0 }); nd(S, 'a2', X + 2.9, .4, 3.4, ['입력', 'input'], 'ok', 1, { h: 1.0 }); nd(S, 'a3', X + 6.6, .4, 2.6, ['버튼', 'button'], 'ok', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.6, ['더 쪼갤 수 없는 가장 작은 요소', 'the smallest elements that cannot be split further'], 'g', 1, { off: 2, w: 12 });
      tbox(S, 'm', X, 1.75, 6.6, 1.8, ['분자', 'molecule'], 'accent', 2, { tc: 'a' }); nd(S, 'm1', X + .3, 2.5, 3.8, ['검색어…', 'query…'], 'line', 2, { h: .85 }); nd(S, 'm2', X + 4.3, 2.5, 2.0, ['검색', 'go'], 'ok', 2, { h: .85 });
      lbl(S, 'n2', X, 6.6, ['원자를 묶어 한 가지 일을 하는 작은 단위', 'atoms combined into a small unit with one job'], 'a', 2, { off: 3, w: 12 });
      tbox(S, 'o', X, 3.85, 12.0, 1.8, ['유기체: 헤더', 'organism: header'], 'warn', 3, { tc: 'w' }); nd(S, 'o1', X + .3, 4.6, 2.4, 'logo', 'line', 3, { h: .85 }); nd(S, 'o2', X + 3.0, 4.6, 4.0, 'nav', 'line', 3, { h: .85 }); nd(S, 'o3', X + 7.3, 4.6, 4.4, ['검색창', 'search box'], 'accent', 3, { h: .85 });
      lbl(S, 'n3', X, 6.6, ['분자와 원자로 만든 화면의 한 구역', 'a screen section built from molecules and atoms'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'tp', X + 7.0, 2.1, ['→ 템플릿 → 페이지', '→ template → page'], 'm', 4); lbl(S, 'n4', X, 6.6, ['구역을 배치한 틀에 실제 콘텐츠를 넣으면 페이지', 'arrange sections into a template, fill it, get a page'], 'a', 4, { w: 12 });
    },
    notes: [['아토믹 디자인은 화학에서 이름을 빌려 UI를 다섯 단계로 나눠요 · 원자는 라벨, 입력창, 버튼처럼 더 쪼갤 수 없는 가장 작은 요소예요', 'atomic design borrows chemistry terms to split UI into five levels, starting with atoms, the smallest indivisible elements such as labels, inputs and buttons'], ['분자는 원자 몇 개가 모여 한 가지 일을 하는 작은 단위예요 · 입력창과 버튼을 묶은 검색창이 대표적이에요', 'molecules are small groups of atoms with one job, the classic example being a search box combining an input and a button'], ['유기체는 분자와 원자로 만든 화면의 한 구역이에요 · 로고, 메뉴, 검색창이 모인 헤더나 상품 카드 목록이 여기에 속해요', 'organisms are screen sections built from molecules and atoms, such as a header with logo, navigation and search, or a product card grid'], ['템플릿은 구역들을 배치한 빈 틀이고, 페이지는 그 틀에 실제 콘텐츠를 넣은 화면이에요 · 작은 것부터 쌓아 올리는 사고방식이 컴포넌트 설계와 잘 맞아요', 'templates arrange sections into an empty layout, and pages fill templates with real content, a bottom-up way of thinking that maps well onto component design']],
    fin: [['아토믹 디자인: 원자 → 분자 → 유기체 → 템플릿 → 페이지로 UI를 쌓아 올려요', 'atomic design builds UI up from atoms to molecules, organisms, templates and pages', 'uxb-xs uxb-a'], ['단계 이름보다 조합의 사고가 핵심이에요', 'the composition mindset matters more than the labels'], ['실제 콘텐츠로 시험해야 빈틈이 보여요', 'real content reveals the gaps']],
    caps: [['원자', 'Atoms'], ['분자', 'Molecules'], ['유기체', 'Organisms'], ['템플릿과 페이지', 'Templates and pages'], ['아토믹 디자인', 'Atomic design']]
  });
}

function sVariants() {
  return CW('ux-variants', {
    code: ['<Button', '  variant="primary"   // primary · ghost', '  size="md"           // sm · md · lg', '  state="loading"', '  icon="arrow-right"', '>Next</Button>', ['// 디자인의 속성 = 코드의 props', '// design properties = code props']],
    hl: [[1, 1, 'ok'], [2, 1], [3, 1, 'warn'], [6, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'v1', X, .4, 3.8, 'primary', 'accent', 1, { h: 1.0, pct: 60 }); nd(S, 'v2', X + 4.1, .4, 3.8, 'secondary', 'line', 1, { h: 1.0 }); nd(S, 'v3', X + 8.2, .4, 3.8, 'ghost', 'line', 1, { h: 1.0, pct: 0 });
      lbl(S, 'n1', X, 6.6, ['변형(variant): 같은 버튼의 강조 단계', 'variants: emphasis levels of one button'], 'g', 1, { off: 2, w: 12 });
      nd(S, 's1', X, 1.9, 2.6, 'sm', 'accent', 2, { h: .8 }); nd(S, 's2', X + 2.9, 1.8, 3.4, 'md', 'accent', 2, { h: 1.0 }); nd(S, 's3', X + 6.6, 1.7, 4.4, 'lg', 'accent', 2, { h: 1.2 });
      lbl(S, 'n2', X, 6.6, ['크기 속성: 정해진 단계 안에서만 골라요', 'size property: choose only from fixed steps'], 'a', 2, { off: 3, w: 12 });
      [['default', 'accent'], ['hover', 'accent'], ['disabled', 'line'], ['loading…', 'warn']].forEach(([t, c], i) => nd(S, 'st' + i, X + i * 3.03, 3.4, 2.9, t, c, 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['상태도 속성으로 · 모든 조합을 미리 설계', 'states are properties too, designed for every combination'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'map', X, 4.9, 12.0, ['디자인 속성 이름 = 코드 props 이름', 'design props = code props'], 'ok', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['이름을 맞추면 핸드오프와 유지보수가 쉬워져요', 'matching names makes handoff and upkeep easy'], 'a', 4, { w: 12 });
    },
    notes: [['컴포넌트 하나를 여러 버전으로 복사해 두면 금방 관리가 어려워져요 · 대신 변형(variant) 속성으로 primary, secondary, ghost 같은 강조 단계를 한 컴포넌트 안에 묶어요', 'copying a component into many versions quickly becomes unmanageable, so a variant property groups emphasis levels such as primary, secondary and ghost inside one component'], ['크기는 sm, md, lg처럼 정해진 단계 안에서만 고르게 해요 · 임의의 크기를 허용하면 화면마다 버튼 크기가 제각각이 돼요', 'size is chosen only from fixed steps such as sm, md and lg, because arbitrary sizes leave buttons inconsistent across screens'], ['기본, 호버, 비활성, 로딩 같은 상태도 속성으로 다뤄요 · 변형×크기×상태의 모든 조합을 미리 설계해 두면 개발 중에 빠진 경우가 줄어요', 'states such as default, hover, disabled and loading are properties too, and designing every combination of variant, size and state prevents missing cases during development'], ['Figma의 컴포넌트 속성 이름과 코드의 props 이름(variant, size, state)을 맞추면 핸드오프가 쉬워지고, 디자인과 코드가 같은 언어로 이야기해요', 'matching Figma component property names to code props such as variant, size and state eases handoff and lets design and code speak the same language']],
    fin: [['컴포넌트 속성: 변형·크기·상태를 속성으로 묶고 코드 props와 이름을 맞춰요', 'component properties group variants, sizes and states and share names with code props', 'uxb-xs uxb-a'], ['속성이 너무 많으면 컴포넌트를 나눠요', 'split components that grow too many properties'], ['불가능한 조합은 막아 둬요', 'block impossible combinations']],
    caps: [['변형', 'Variants'], ['크기', 'Sizes'], ['상태', 'States'], ['코드와 같은 이름', 'Names shared with code'], ['컴포넌트 속성', 'Component properties']]
  });
}

function sAutoLayout() {
  return CW('ux-auto-layout', {
    code: ['.card {', '  display: flex;', ['  flex-direction: row;   /* 방향 */', '  flex-direction: row;   /* direction */'], ['  gap: 8px;              /* 간격 */', '  gap: 8px;              /* spacing */'], ['  padding: 16px;         /* 안쪽 여백 */', '  padding: 16px;         /* inner space */'], '}', ['/* Hug = 내용만큼 · Fill = 남은 공간 */', '/* hug = fit content · fill = grow */']],
    hl: [[1, 2, 'ok'], [3, 1], [4, 1, 'warn'], [6, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'fr', X, .4, 12.0, 2.2, 'Auto layout →', 'accent', 1, { tc: 'a' }); [0, 1, 2].forEach(i => nd(S, 'c' + i, X + .6 + i * 3.4, 1.15, 3.0, 'item', 'line', 1, { h: 1.0 }));
      lbl(S, 'n1', X, 6.6, ['자식 요소를 한 방향으로 자동 배치 · CSS flex와 같아요', 'children flow in one direction, just like CSS flex'], 'a', 1, { off: 2, w: 12 });
      [0, 1].forEach(i => sw(S, 'gp' + i, X + 3.6 + i * 3.4, 1.15, .4, 1.0, tint('danger', 40), 2, { css: 'border:0' })); lbl(S, 'gpl', X + 4.2, 2.75, 'gap 8', 'm r', 2);
      lbl(S, 'n2', X, 6.6, ['간격은 요소마다 따로가 아니라 gap 하나로', 'one gap value instead of per-item spacing'], 'r', 2, { off: 3, w: 12 });
      sw(S, 'pd', X + .1, .95, .5, 1.45, tint('warn', 45), 3, { css: 'border:0' }); lbl(S, 'pdl', X, 2.75, 'padding 16', 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['안쪽 여백(padding)도 프레임에 한 번만', 'padding is set once on the frame'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'hg', X, 3.6, 3.2, 'Hug', 'ok', 4, { h: 1.0 }); nd(S, 'fl', X + 3.5, 3.6, 8.5, 'Fill →', 'accent', 4, { h: 1.0 }); lbl(S, 'hf', X, 4.8, ['Hug = 내용만큼, Fill = 남은 공간', 'hug = fit, fill = grow'], 'm', 4);
      lbl(S, 'n4', X, 6.6, ['글자가 길어져도 레이아웃이 알아서 늘어나요', 'layouts grow on their own when text gets longer'], 'a', 4, { w: 12 });
    },
    notes: [['Figma의 오토 레이아웃은 프레임 안 자식 요소를 가로나 세로 한 방향으로 자동 배치해요 · CSS의 display: flex와 거의 같은 개념이라 개발로 옮기기 쉬워요', 'Figma auto layout flows a frame’s children in one direction, horizontal or vertical, almost exactly like CSS display: flex, which makes it easy to implement'], ['요소 사이 간격은 각각 따로 맞추지 않고 gap 값 하나로 정해요 · 요소를 추가하거나 빼도 간격이 자동으로 유지돼요', 'spacing between items is a single gap value rather than per-item nudging, so adding or removing items keeps spacing intact'], ['안쪽 여백(padding)도 프레임에 한 번만 정해요 · 버튼 글자가 길어지면 여백을 유지한 채 버튼이 늘어나요', 'padding is set once on the frame, so a button grows with longer text while keeping its padding'], ['크기 규칙 중 Hug는 내용만큼(fit-content), Fill은 남은 공간을 차지(flex: 1), Fixed는 고정 크기예요 · 이 규칙 덕분에 번역이나 긴 이름에도 레이아웃이 깨지지 않아요', 'sizing rules include hug for fitting content (fit-content), fill for taking remaining space (flex: 1) and fixed, so layouts survive translations and long names']],
    fin: [['오토 레이아웃: 방향·gap·padding·Hug/Fill로 내용에 반응하는 레이아웃을 만들어요', 'auto layout uses direction, gap, padding and hug or fill to build content-aware layouts', 'uxb-xs uxb-a'], ['중첩하면 복잡한 화면도 표현돼요', 'nesting expresses complex screens'], ['개발자는 flex로 그대로 옮겨요', 'developers translate it directly to flex']],
    caps: [['자동 배치', 'Automatic flow'], ['gap', 'Gap'], ['padding', 'Padding'], ['Hug와 Fill', 'Hug and fill'], ['오토 레이아웃', 'Auto layout']]
  });
}

function sHandoff() {
  return CW('ux-handoff', {
    code: [['핸드오프에 넘길 것', 'what a handoff includes'], ['  간격 · 색 → 토큰 이름으로', '  spacing, color → token names'], ['  모든 상태 · 빈 · 오류 · 로딩', '  all states: empty, error, loading'], ['  긴 글자 · 반응형 · 키보드 동작', '  long text, responsive, keyboard'], ['구현 후 디자인 QA로 확인', 'verify with design QA after build']],
    hl: [[1, 1, 'ok'], [2, 1, 'warn'], [3, 1], [4, 1, 'ok']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ds', X, .4, 4.6, ['디자인', 'design'], 'accent', 0, { h: 1.0 }); nd(S, 'dv', X + 7.4, .4, 4.6, ['개발', 'development'], 'ok', 0, { h: 1.0 }); arw(S, 'ho', [X + 4.65, .9], [X + 7.35, .9], 0);
      lbl(S, 'tk', X, 1.8, ['16px ✗  →  space.4 ✓', '16px ✗  →  space.4 ✓'], 'm g', 1); lbl(S, 'n1', X, 6.6, ['값이 아니라 토큰 이름으로 전달하면 어긋나지 않아요', 'pass token names, not raw values, to stay in sync'], 'g', 1, { off: 2, w: 12 });
      [['기본', 'ideal'], ['빈', 'empty'], ['오류', 'error'], ['로딩', 'loading']].forEach((t, i) => nd(S, 'st' + i, X + i * 3.03, 2.6, 2.9, t, i === 0 ? 'line' : 'warn', 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['이상적인 화면만 넘기면 나머지는 개발자가 추측해요', 'hand over only the ideal and developers will guess the rest'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'ec', X, 3.9, ['“아주아주 긴 상품 이름이 들어오면…”', '“a very long product name…”'], 'm a', 3); lbl(S, 'n3', X, 6.6, ['극단적인 경우와 화면 폭·키보드 동작도 정해요', 'cover edge cases, widths and keyboard behavior'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'qa', X, 4.8, 12.0, ['디자인 QA: 구현 화면과 시안 비교', 'design QA: build vs design'], 'ok', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['구현된 화면을 함께 보며 차이를 고쳐요', 'review the built screens together and fix the gaps'], 'g', 4, { w: 12 });
    },
    notes: [['핸드오프는 디자인을 개발로 넘기는 과정이에요 · 16px, #3b5bdb 같은 값 대신 space.4, color.primary 같은 토큰 이름으로 전달하면 디자인과 코드가 어긋나지 않아요', 'handoff passes design to development, and specifying token names such as space.4 and color.primary instead of raw values like 16 px keeps design and code aligned'], ['이상적인 화면 하나만 넘기면 빈 상태, 오류, 로딩 같은 나머지는 개발자가 추측하게 돼요 · 모든 상태를 함께 넘겨요', 'handing over only the ideal screen leaves developers guessing about empty, error and loading states, so include every state'], ['아주 긴 이름, 번역된 문구, 좁은 화면, 키보드로 조작할 때처럼 극단적인 경우의 동작도 정해 둬요 · 미리 정하지 않은 것은 구현마다 달라져요', 'define behavior for edge cases such as very long names, translated copy, narrow screens and keyboard use, because anything left open varies by implementation'], ['구현이 끝나면 디자이너가 실제 화면을 시안과 비교하는 디자인 QA를 해요 · 핸드오프는 한 번에 넘기고 끝나는 게 아니라 함께 다듬는 대화예요', 'after implementation, designers run design QA comparing the build with the design, because handoff is an ongoing conversation rather than a one-time drop']],
    fin: [['핸드오프: 토큰 이름 · 모든 상태 · 극단적인 경우를 넘기고, 디자인 QA로 확인해요', 'handoff passes token names, every state and edge cases, then verifies with design QA', 'uxb-xs uxb-a'], ['Figma Dev Mode 같은 도구가 도와요', 'tools such as Figma Dev Mode help'], ['개발자를 초기 단계부터 참여시켜요', 'involve developers early']],
    caps: [['토큰으로 전달', 'Passing tokens'], ['모든 상태', 'Every state'], ['극단적인 경우', 'Edge cases'], ['디자인 QA', 'Design QA'], ['디자인 핸드오프', 'Design handoff']]
  });
}

/* ===== 6. validation and metrics ===== */
function sUsability() {
  return CW('ux-usability-test', {
    code: [['과제를 주고 행동을 관찰해요', 'give tasks and observe behavior'], ['“생각을 소리 내어 말해 주세요”', '“please think out loud”'], ['과제 ○ “우산을 사 보세요”', 'task ○ “buy an umbrella”'], ['지시 ✗ “장바구니 버튼을 누르세요”', 'instruction ✗ “tap the cart button”'], ['5명씩 여러 번 반복해요', 'test 5 people, repeat in rounds']],
    hl: [[0, 2], [2, 2, 'warn'], [4, 1, 'ok'], [0, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'u', X, .5, 4.4, ['참가자', 'participant'], 'accent', 1, { h: 1.0 }); nd(S, 'm', X + 8.0, .5, 4.0, ['진행자', 'moderator'], 'line', 1, { h: 1.0 }); lbl(S, 'th', X, 1.75, ['“음, 배송비가 어디 있지…”', '“hmm, where is shipping…”'], 'm a', 1);
      lbl(S, 'n1', X, 6.6, ['생각을 말하게 하면 왜 막히는지가 들려요', 'thinking aloud reveals why people get stuck'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['버튼 이름을 알려주면 시험이 아니라 따라 하기예요', 'naming the button turns a test into following orders'], 'w', 2, { off: 3, w: 12 });
      const C = [[1, 31], [2, 52], [3, 66], [4, 77], [5, 85], [10, 98], [15, 100]];
      C.forEach(([n, p], i) => { sw(S, 'cb' + i, X + i * 1.7, 5.4 - p * .028, 1.2, p * .028, tint(n === 5 ? 'ok' : 'accent', n === 5 ? 65 : 40), 3, { css: 'border:0' }); lbl(S, 'cn' + i, X + i * 1.7 + .2, 5.5, String(n), 'm', 3); });
      lbl(S, 'c5', X + 6.3, 2.35, '85%', 'm g', 3); lbl(S, 'n3', X, 6.6, ['5명이면 문제의 약 85% · 그 뒤는 같은 문제의 반복', 'five users find about 85%; more mostly repeat them'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['5명 테스트 → 고치기 → 다시 5명이 더 효과적', 'test five, fix, test five again is more effective'], 'a', 4, { w: 12 });
    },
    notes: [['사용성 테스트는 실제 사용자에게 과제를 주고 행동을 관찰하는 방법이에요 · “생각을 소리 내어 말해 주세요(think aloud)”라고 하면 어디서 왜 막히는지 들을 수 있어요', 'usability testing gives real users tasks and observes their behavior, and asking them to think aloud reveals where and why they get stuck'], ['과제는 목표로 줘요 · “우산을 사 보세요”는 과제지만, “장바구니 버튼을 누르세요”는 답을 알려주는 지시라서 아무것도 배울 수 없어요', 'tasks state goals: “buy an umbrella” is a task, while “tap the cart button” gives away the answer and teaches nothing'], ['닐슨과 랜다우어의 연구에 따르면 5명이 사용성 문제의 약 85%를 찾고, 더 늘리면 대부분 같은 문제를 다시 보게 돼요', 'Nielsen and Landauer’s research found that five users uncover about 85% of usability problems, and adding more mostly repeats the same issues'], ['그래서 15명을 한 번에 시험하기보다 5명씩 시험하고, 고치고, 다시 시험하는 반복이 더 많은 문제를 찾아요 · 단, 사용자군이 다르면 그룹마다 따로 해요', 'so testing five, fixing, then testing five more finds more problems than testing fifteen at once, though distinct user groups each need their own round']],
    fin: [['사용성 테스트: 목표 과제 · 소리 내어 생각하기 · 5명씩 반복', 'usability testing: goal-based tasks, thinking aloud and rounds of five', 'uxb-xs uxb-a'], ['도와주고 싶어도 참아요', 'resist the urge to help'], ['원격 테스트도 효과적이에요', 'remote testing works well too']],
    caps: [['소리 내어 생각하기', 'Thinking aloud'], ['과제 vs 지시', 'Tasks vs instructions'], ['5명의 법칙', 'The five-user finding'], ['반복', 'Iterating'], ['사용성 테스트', 'Usability testing']]
  });
}

function sMetrics() {
  return CW('ux-metrics', {
    code: [['HEART (Google)', 'HEART (Google)'], ['  Happiness · Engagement · Adoption', '  Happiness, Engagement, Adoption,'], ['  Retention · Task success', '  Retention, Task success'], ['목표 → 신호 → 지표 순서로 정해요', 'goals → signals → metrics'], ['SUS 점수: 평균 약 68점', 'SUS score: average about 68']],
    hl: [[0, 3], [3, 1, 'ok'], [4, 1, 'warn'], [0, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, H = [['H', ['만족', 'happy'], 'ok'], ['E', ['참여', 'engage'], 'accent'], ['A', ['채택', 'adopt'], 'accent'], ['R', ['유지', 'retain'], 'warn'], ['T', ['과제 성공', 'task ✓'], 'ok']];
      H.forEach(([l, t, c], i) => { nd(S, 'h' + i, X + i * 2.42, .4, 2.2, l, c, 1, { h: 1.1 }); lbl(S, 'ht' + i, X + i * 2.42, 1.65, t, 'm', 1); });
      lbl(S, 'n1', X, 6.6, ['사용자 경험을 다섯 측면으로 나눠 재요', 'measure the experience across five facets'], 'a', 1, { off: 2, w: 12 });
      [['목표', 'goal', '빠른 결제', 'fast checkout'], ['신호', 'signal', '결제 완료', 'checkout done'], ['지표', 'metric', '완료율 · 소요 시간', 'rate · time']].forEach(([k, e, vk, ve], i) => { nd(S, 'g' + i, X, 2.5 + i * 1.1, 2.8, [k, e], 'ok', 2, { h: 1.0 }); lbl(S, 'gv' + i, X + 3.1, 2.65 + i * 1.1, [vk, ve], 'm', 2); });
      lbl(S, 'n2', X, 6.6, ['재기 쉬운 것보다 목표에서 거꾸로 지표를 골라요', 'derive metrics from goals, not from what is easy to count'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'sus', X + 7.6, 2.5, 4.4, .6, tint('line', 35), 3, { css: 'border:0' }); sw(S, 'sv', X + 7.6, 2.5, 3.0, .6, tint('warn', 60), 3, { css: 'border:0' }); lbl(S, 'sl', X + 7.6, 3.25, 'SUS 68 / 100', 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['SUS: 10문항 설문 점수 · 68점 위면 평균 이상', 'SUS: a ten-question score; above 68 is above average'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['숫자는 “무엇”을, 관찰은 “왜”를 알려줘요', 'numbers tell you what; observation tells you why'], 'a', 4, { w: 12 });
    },
    notes: [['Google의 HEART 프레임워크는 사용자 경험을 만족(Happiness), 참여(Engagement), 채택(Adoption), 유지(Retention), 과제 성공(Task success) 다섯 측면으로 나눠 재요', 'Google’s HEART framework measures experience across five facets: Happiness, Engagement, Adoption, Retention and Task success'], ['지표는 재기 쉬운 것부터 고르지 않고 목표 → 신호 → 지표 순서로 정해요 · “빠른 결제”가 목표라면 신호는 결제 완료이고, 지표는 완료율과 소요 시간이에요', 'metrics are chosen through goals, signals and then metrics rather than by what is easy to count: for “fast checkout”, the signal is completed checkouts and the metrics are completion rate and time'], ['SUS(System Usability Scale)는 10문항 설문으로 사용성을 100점 만점 점수로 바꿔요 · 여러 연구의 평균이 약 68점이라 그보다 높으면 평균 이상이에요', 'the System Usability Scale (SUS) converts a ten-question survey into a score out of 100, and since studies average about 68, anything higher is above average'], ['숫자는 무엇이 일어나는지 알려주지만 왜인지는 말해주지 않아요 · 지표가 떨어지면 사용성 테스트나 인터뷰로 이유를 찾아요', 'numbers show what is happening but not why, so when a metric drops, usability tests or interviews uncover the reason']],
    fin: [['UX 지표: HEART로 측면을 나누고, 목표→신호→지표로 고르고, 관찰로 이유를 찾아요', 'UX metrics: split facets with HEART, derive via goals, signals and metrics, explain with observation', 'uxb-xs uxb-a'], ['허영 지표(누적 가입자 등)를 조심해요', 'beware vanity metrics such as total sign-ups'], ['변화 전후를 같은 방식으로 재요', 'measure before and after the same way']],
    caps: [['HEART', 'HEART'], ['목표에서 지표로', 'From goals to metrics'], ['SUS', 'SUS'], ['숫자와 이유', 'Numbers and reasons'], ['UX 지표', 'UX metrics']]
  });
}

function sFunnel() {
  return CW('ux-funnel', {
    code: [['방문 → 가입 → 첫 사용 → 결제', 'visit → sign up → first use → pay'], ['단계마다 남는 비율(전환율)', 'conversion rate at each step'], ['가장 크게 빠지는 단계부터', 'start with the biggest drop'], ['고친 뒤 A/B 테스트로 확인', 'confirm fixes with an A/B test']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'danger'], [3, 1, 'warn']],
    lh: 1.4,
    draw: (S) => {
      const X = 19.4, F = [[['방문', 'visit'], 100], [['가입', 'sign up'], 40], [['첫 사용', 'first use'], 10], [['결제', 'pay'], 6]];
      F.forEach(([t, v], i) => { lbl(S, 'ft' + i, X, .5 + i * 1.2, t, 'm', 0); sw(S, 'fb' + i, X + 3.0, .5 + i * 1.2, v * .075, .8, tint('accent', 55 - i * 8), 0, { css: 'border:0' }); lbl(S, 'fv' + i, X + 3.2 + v * .075, .55 + i * 1.2, v + '%', 'm', 0); });
      lbl(S, 'n1', X, 6.6, ['사용자가 목표까지 가는 길을 단계로 나눠 봐요', 'split the path to the goal into steps'], 'a', 1, { off: 2, w: 12 });
      [['40%', 0], ['25%', 1], ['60%', 2]].forEach(([t, i]) => lbl(S, 'cr' + i, X + 8.4, 1.75 + i * 1.2, ['전환 ', 'conv '].map(p => p + t), 'm ' + (i === 1 ? 'r' : 'g'), 2)); lbl(S, 'n2', X, 6.6, ['이전 단계 대비 남은 비율이 그 단계의 전환율', 'each step’s conversion is relative to the previous one'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'hl', X - .1, 2.8, 12.2, 1.0, 'rgba(220,40,40,.15)', 3, { css: 'z-index:4' }); lbl(S, 'n3', X, 6.6, ['가입 → 첫 사용 전환율이 가장 낮아요 · 여기부터', 'sign-up to first use converts worst; start there'], 'r', 3, { off: 4, w: 12 });
      chip(S, 'ab', X, 5.3, 12.0, ['A 12% vs B 17% · 유의한가?', 'A 12% vs B 17%, significant?'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['개선안은 A/B 테스트로 효과를 확인해요', 'confirm improvements with an A/B test'], 'w', 4, { w: 12 });
    },
    notes: [['퍼널 분석은 방문, 가입, 첫 사용, 결제처럼 사용자가 목표까지 가는 길을 단계로 나누고 단계마다 몇 명이 남는지 보는 방법이에요', 'funnel analysis splits the path to a goal into steps such as visit, sign-up, first use and payment and counts how many people remain at each'], ['단계별 전환율은 이전 단계 대비 남은 비율이에요 · 방문 100명 중 40명이 가입했다면 가입 전환율은 40%예요', 'each step’s conversion rate is the share remaining relative to the previous step: if 40 of 100 visitors sign up, sign-up conversion is 40%'], ['가장 크게 빠지는 단계가 가장 큰 기회예요 · 이 예시에선 가입한 사람 중 25%만 첫 사용까지 가서 온보딩을 먼저 살펴봐요 · 왜 빠지는지는 테스트와 인터뷰로 찾아요', 'the biggest drop is the biggest opportunity, here between sign-up and first use where only 25% continue, pointing at onboarding first, with tests and interviews explaining why'], ['개선안은 A/B 테스트로 기존안과 나란히 비교해 효과를 확인해요 · 표본이 충분한지, 차이가 우연이 아닌지(통계적 유의성) 함께 봐요', 'improvements are confirmed with A/B tests against the current design, checking for sufficient sample size and statistical significance']],
    fin: [['퍼널 분석: 단계별 전환율로 가장 큰 이탈을 찾고, 고친 뒤 A/B 테스트로 확인해요', 'funnel analysis finds the biggest drop by step conversion, then confirms fixes with A/B tests', 'uxb-xs uxb-a'], ['사용자 그룹별로 나눠 보면 더 보여요', 'segmenting by user group reveals more'], ['한 번에 한 가지만 바꿔 시험해요', 'change one thing at a time']],
    caps: [['퍼널', 'The funnel'], ['전환율', 'Conversion rates'], ['가장 큰 이탈', 'The biggest drop'], ['A/B 테스트', 'A/B testing'], ['퍼널 분석', 'Funnel analysis']]
  });
}

function sCardSort() {
  return CW('ux-card-sort', {
    code: [['카드 소팅: 사용자가 직접 묶어 보기', 'card sorting: users group items'], ['  열린 방식: 그룹 이름도 사용자가', '  open: users name the groups too'], ['  닫힌 방식: 정해진 그룹에 넣기', '  closed: sort into given groups'], ['트리 테스트: 메뉴만으로 찾아보기', 'tree testing: find it in the menu'], ['만들기 전에 정보 구조를 검증', 'validate IA before building']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1], [3, 2, 'warn']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, C = [['환불', 'refund'], ['배송 조회', 'tracking'], ['비밀번호', 'password'], ['쿠폰', 'coupons'], ['주소 변경', 'address']];
      C.forEach((t, i) => nd(S, 'c' + i, X + (i % 3) * 4.1, .4 + Math.floor(i / 3) * 1.2, 3.8, t, 'line', 0, { h: 1.0, off: 1 }));
      lbl(S, 'n0', X, 6.6, ['메뉴에 들어갈 항목들을 카드로 준비해요', 'prepare menu items as cards'], 'a', 0, { off: 1, w: 12 });
      tbox(S, 'g1', X, .3, 5.8, 3.6, ['“주문”', '“orders”'], 'ok', 1, { tc: 'g' }); tbox(S, 'g2', X + 6.2, .3, 5.8, 3.6, ['“내 정보”', '“my info”'], 'accent', 1, { tc: 'a' });
      [[0, 0], [1, 0], [3, 0], [2, 1], [4, 1]].forEach(([c, g], j) => nd(S, 's' + j, X + .3 + g * 6.2, 1.05 + (j < 3 ? j : j - 3) * .9, 5.2, C[c], g ? 'accent' : 'ok', 1, { h: .85 }));
      lbl(S, 'n1', X, 6.6, ['사용자가 직접 묶고 이름 붙인 결과로 메뉴를 짜요', 'build menus from how users group and name things'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['닫힌 방식은 정해 둔 그룹이 맞는지 확인해요', 'closed sorts check whether planned groups work'], 'a', 2, { off: 3, w: 12 });
      chip(S, 'tq', X, 4.1, 12.0, ['과제: “쿠폰을 어디서 볼까요?”', 'task: “where are coupons?”'], 'warn', 3, { h: 1.0 }); lbl(S, 'tr', X, 5.3, ['성공 72% · 바로 찾음 58%', 'success 72% · direct 58%'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['디자인 없이 메뉴 구조만으로 찾게 해 봐요', 'test the bare menu tree, without visual design'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['화면을 만들기 전에 구조의 문제를 싸게 찾아요', 'find structural problems cheaply, before screens exist'], 'a', 4, { w: 12 });
    },
    notes: [['카드 소팅은 메뉴에 들어갈 항목들을 카드로 만들어 사용자가 직접 묶어 보게 하는 방법이에요 · 사용자의 머릿속 분류를 알 수 있어요', 'card sorting puts menu items on cards and asks users to group them, revealing how people categorize things in their heads'], ['열린 방식에서는 사용자가 그룹을 만들고 이름도 직접 붙여요 · 회사 조직 이름 대신 사용자가 쓰는 말로 메뉴를 짤 수 있어요', 'in an open sort, users create and name the groups themselves, so menus can use their words instead of org-chart names'], ['닫힌 방식에서는 미리 정한 그룹에 카드를 넣게 해서, 계획한 구조가 사용자의 생각과 맞는지 확인해요', 'a closed sort has users place cards into predefined groups to check whether a planned structure matches their thinking'], ['트리 테스트는 디자인 없이 메뉴 구조만 보여주고 “쿠폰을 어디서 볼까요?” 같은 과제를 줘 성공률과 바로 찾은 비율을 재요 · 화면을 만들기 전에 구조 문제를 싸게 찾아요', 'tree testing shows only the bare menu structure with tasks such as “where would you find coupons?” and measures success and directness, catching structural problems cheaply before screens exist']],
    fin: [['카드 소팅과 트리 테스트: 사용자 생각으로 구조를 만들고, 메뉴만으로 찾게 해 검증해요', 'card sorting builds structure from users’ thinking, and tree testing validates it with the bare menu', 'uxb-xs uxb-a'], ['온라인 도구로 수십 명도 쉽게 해요', 'online tools make dozens of participants easy'], ['결과는 유사도 행렬로 분석해요', 'analyze results with a similarity matrix']],
    caps: [['카드 소팅', 'Card sorting'], ['열린 방식', 'Open sorts'], ['닫힌 방식', 'Closed sorts'], ['트리 테스트', 'Tree testing'], ['정보 구조 검증', 'Validating information architecture']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('ux-found', 'UX 기본기', 'UX foundations', 'UX를 생각하는 법', 'Thinking in UX', 'UI와 UX의 차이를 보여주는 다섯 층, 더블 다이아몬드 과정, 사용자 조사 방법, 페르소나와 JTBD, 멘탈 모델, 어포던스와 시그니파이어까지 화면을 그리기 전에 알아야 할 생각의 틀이에요.', 'The five planes that separate UI from UX, the Double Diamond process, user research methods, personas and jobs to be done, mental models, and affordances with signifiers: ways of thinking to learn before drawing screens.', [
    item('ux-planes', 'UI와 UX의 다섯 층', 'UI, UX and the five planes', '눈에 보이는 표면(UI) 아래에 뼈대·구조·범위·전략이 있어요. UX는 전략부터 표면까지 다섯 층 전체의 경험이에요.', 'UI와 UX는 자주 섞어 쓰지만 범위가 달라요. 제시 제임스 개럿은 사용자 경험을 다섯 층으로 나눴어요. 맨 위 표면은 색, 글꼴, 아이콘, 이미지처럼 눈에 보이는 부분으로 흔히 UI라고 부르는 영역이에요. 그 아래 뼈대는 버튼, 정보, 내비게이션을 화면 어디에 둘지 정하고, 구조는 화면 사이의 흐름과 정보 구조(IA)를 설계해요. 더 아래 범위는 어떤 기능과 콘텐츠를 넣을지, 맨 아래 전략은 누구의 어떤 문제를 풀어 어떤 사업 목표를 이룰지 정해요. 아래층의 결정은 위층을 제약해요. 전략이 흐릿하면 표면을 아무리 다듬어도 쓸모없는 기능을 예쁘게 만들 뿐이에요. 그래서 UX 디자인은 화면을 꾸미는 일이 아니라 다섯 층 전체를 일관되게 맞추는 일이고, 실제 작업은 층을 오르내리며 반복돼요. 초보자는 표면부터 손대기 쉬우니 “이 화면이 어떤 문제를 푸나?”를 먼저 묻는 습관을 들여요.', 'Beneath the visible surface (UI) lie skeleton, structure, scope and strategy; UX is the experience across all five planes, from strategy to surface.', 'UI and UX are often used interchangeably, but their scopes differ. Jesse James Garrett split user experience into five planes. The top surface is the visible part, color, type, icons and imagery, usually called UI. Beneath it, the skeleton decides where buttons, information and navigation sit on screen, and the structure designs flows between screens and information architecture (IA). Further down, scope decides which features and content to include, and at the bottom, strategy decides whose problem to solve for which business goal. Lower planes constrain upper ones: with a fuzzy strategy, polishing the surface only makes useless features pretty. UX design is therefore not decorating screens but aligning all five planes, and real work moves up and down between them. Beginners tend to start with the surface, so build the habit of first asking which problem a screen solves.', sPlanes()),
    item('ux-double-diamond', '더블 다이아몬드', 'The Double Diamond', '발견(넓히기) → 정의(좁히기) → 개발(넓히기) → 전달(좁히기). 올바른 문제를 먼저 정하고, 그다음 해결책을 올바르게 만들어요.', '더블 다이아몬드는 영국 디자인 카운슬이 정리한 디자인 과정으로, 생각을 넓혔다가 좁히는 일을 두 번 반복해요. 첫 다이아몬드는 문제를 다뤄요. 발견 단계에서는 “사용자가 원하는 건 이거겠지” 같은 가정을 내려놓고 인터뷰, 관찰, 데이터로 사용자와 맥락을 넓게 조사해요. 정의 단계에서는 조사 결과를 모아 정말 풀어야 할 문제 하나로 좁히고, “어떻게 하면 ~할 수 있을까(How might we)?” 질문으로 정리해요. 두 번째 다이아몬드는 해결책을 다뤄요. 개발 단계에서 아이디어를 많이 내고 스케치와 프로토타입으로 빠르게 만들어 보고, 전달 단계에서 사용자 테스트로 하나를 골라 다듬어 출시해요. 핵심은 해결책부터 정하지 않는 거예요. 잘못된 문제를 완벽하게 푸는 것만큼 큰 낭비는 없기 때문이에요. 실제로는 단계를 오가며 반복하고, 출시 후 배운 것이 다음 발견으로 이어져요. 디자인 씽킹의 공감, 정의, 아이디어, 프로토타입, 테스트도 같은 흐름이에요.', 'Discover (widen), define (narrow), develop (widen), deliver (narrow): pin down the right problem first, then build the solution right.', 'The Double Diamond, described by the UK Design Council, repeats widening then narrowing twice. The first diamond is about the problem. In discover, set aside assumptions such as “users surely want this” and research users and context broadly through interviews, observation and data. In define, synthesize the findings into the one problem truly worth solving, often phrased as a “How might we…?” question. The second diamond is about the solution. In develop, generate many ideas and build them quickly as sketches and prototypes; in deliver, use testing to pick and refine one and ship it. The point is not to start from a solution, since solving the wrong problem perfectly is the biggest waste. In practice teams move back and forth between stages, and what is learned after launch feeds the next discover. Design thinking’s empathize, define, ideate, prototype and test follow the same flow.', sDiamond()),
    item('ux-research', '사용자 조사 방법', 'User research methods', '말(태도)과 행동, 정성(왜)과 정량(얼마나)을 축으로 인터뷰·설문·사용성 테스트·데이터 분석을 섞어 서로를 확인해요.', '사용자 조사 방법은 두 축으로 정리하면 고르기 쉬워요. 하나는 사람들이 말하는 것(태도)을 보느냐 실제로 하는 것(행동)을 보느냐, 다른 하나는 이유를 캐느냐(정성) 양을 재느냐(정량)예요. 인터뷰는 소수와 깊게 이야기해 동기와 맥락, “왜”를 알아내요. “편하시죠?” 같은 유도 질문 대신 “최근에 장을 봤던 때를 이야기해 주세요”처럼 실제 경험을 물어요. 설문은 많은 사람의 생각을 숫자로 모아 패턴이 얼마나 흔한지 확인하지만, 결국 사람들이 말한 것이라 실제 행동과 다를 수 있어요. 사용성 테스트는 과제를 주고 행동을 관찰하고, 로그 분석과 A/B 테스트는 수많은 사용자의 실제 행동을 숫자로 보여줘요. 사람들은 자기 행동을 잘 예측하지 못하므로 말과 행동이 다를 때는 행동을 더 믿어요. 좋은 조사는 “무엇을 알고 싶은가”라는 조사 질문을 먼저 정하고 방법을 골라요. 소수 인터뷰로 패턴을 찾고 큰 표본의 행동 데이터로 확인하는 식으로 방법을 섞으면 서로의 빈틈이 메워져요.', 'Mix interviews, surveys, usability tests and analytics along two axes, attitude versus behavior and qualitative versus quantitative, so methods check each other.', 'Research methods are easier to choose when mapped on two axes: whether they capture what people say (attitudes) or what they do (behavior), and whether they probe why (qualitative) or measure how many (quantitative). Interviews go deep with a few people to uncover motives, context and the why, asking about real experiences such as “tell me about the last time you shopped for groceries” instead of leading questions like “easy, right?” Surveys gather many opinions as numbers to show how common a pattern is, but they still record what people say, which can differ from what they do. Usability tests observe behavior on given tasks, and analytics and A/B tests show the real behavior of many users in numbers. People predict their own behavior poorly, so when words and actions disagree, trust the actions. Good research starts with the research question, what you want to learn, and then picks methods. Mixing them, finding patterns in a few interviews and confirming them with behavioral data at scale, covers each method’s blind spots.', sResearch()),
    item('ux-persona', '페르소나와 JTBD', 'Personas and jobs to be done', '페르소나는 조사로 만든 대표 사용자, JTBD는 사람이 해결하려는 일이에요. 근거 있는 둘이 “누구를 위해 무엇을”을 분명하게 해요.', '페르소나는 조사에서 나온 행동 패턴을 한 사람처럼 정리한 대표 사용자예요. 이름과 사진은 기억을 돕는 장치일 뿐이고, 핵심은 목표, 불편, 사용 맥락이에요. 예를 들어 “퇴근길 지하철에서 한 손으로 10분 안에 장을 보고 싶은 지은”이라는 맥락은 큰 버튼, 이어서 담기, 최근 구매 다시 담기 같은 결정을 이끌어요. “모두를 위한” 설계는 결국 누구에게도 딱 맞지 않기 때문에, 구체적인 한 사람을 깊이 이해하는 편이 결정을 쉽게 해요. JTBD(Jobs to Be Done)는 사람보다 그 사람이 해결하려는 일에 집중해요. “~할 때(상황), ~하고 싶다(동기), 그래서 ~할 수 있게(기대 결과)” 형식으로 적어, 같은 일을 하는 경쟁자가 다른 앱이 아니라 퇴근길 편의점일 수도 있다는 것을 보여줘요. 둘 다 근거가 핵심이에요. 인터뷰나 데이터 없이 상상으로 만든 페르소나는 팀의 편견을 굳힐 뿐이므로, 조사가 쌓이면 고쳐 가요. 보통 2~4개면 충분해요.', 'Personas are representative users built from research, and JTBD captures the job people are trying to get done; with evidence, both make “for whom and for what” concrete.', 'A persona condenses behavioral patterns from research into a single representative user. Name and photo are just memory aids; what matters are goals, pains and context of use. Context such as “Jieun wants to finish grocery shopping in ten minutes, one-handed, on the subway home” drives decisions like large buttons, resuming a cart and reordering past purchases. Designing “for everyone” fits no one, so deeply understanding one concrete person makes decisions easier. Jobs to Be Done (JTBD) focuses on the job rather than the person, written as “when… (situation), I want to… (motivation), so I can… (outcome),” revealing, for instance, that the real competitor may be a convenience store on the way home rather than another app. Evidence is essential for both: personas imagined without interviews or data only harden the team’s assumptions, so revise them as research accumulates. Two to four personas are usually enough.', sPersona()),
    item('ux-mental-model', '멘탈 모델', 'Mental models', '사용자가 머릿속에 그리는 동작 방식과 실제 시스템이 어긋나면 실수와 불안이 생겨요. 관례와 피드백으로 둘 사이를 이어요.', '멘탈 모델은 사용자가 “이건 이렇게 동작할 거야”라고 머릿속에 그리는 그림이에요. 이전에 쓴 제품, 다른 앱에서 배운 관례, 현실 세계의 경험으로 만들어져요. 반면 시스템 모델은 제품이 실제로 동작하는 방식이에요. 예를 들어 오래 문서 프로그램을 쓴 사용자는 저장 버튼을 눌러야 저장된다고 믿지만, 클라우드 문서는 입력할 때마다 자동으로 저장해요. 두 모델이 어긋나면 사용자는 없는 저장 버튼을 찾아 헤매거나, 저장이 안 됐을까 봐 창을 닫지 못해요. 반대로 사용자의 모델과 맞는 설계는 설명 없이도 쓰여요. 둘 사이에 다리를 놓는 방법은 두 가지예요. 하나는 휴지통, 장바구니처럼 사용자가 이미 아는 관례와 비유를 따르는 것이고, 다른 하나는 “모두 저장됨 · 2초 전”처럼 시스템 상태를 보여주는 피드백으로 사용자의 모델을 바로잡는 거예요. 새로운 방식은 배우는 비용이 크므로, 관례를 깰 때는 그만한 이유가 있어야 해요. 사용자의 모델은 짐작하지 말고 인터뷰와 테스트로 알아내요.', 'When the way users imagine a system works diverges from how it really works, errors and anxiety follow; conventions and feedback bridge the gap.', 'A mental model is the picture in a user’s head of how something works, built from products they have used, conventions learned from other apps and real-world experience. The system model is how the product actually behaves. Someone used to desktop word processors believes documents save only when they press save, while cloud documents save on every keystroke. When the models diverge, users hunt for a save button that does not exist or are afraid to close the window. Designs that match users’ models, by contrast, work without explanation. There are two ways to bridge the gap: follow conventions and metaphors users already know, such as a trash can or a shopping cart, and correct the model with feedback that shows system status, such as “all changes saved, 2 seconds ago.” Novel interactions carry a learning cost, so break conventions only for good reasons. Discover users’ models through interviews and testing rather than guessing.', sMental()),
    item('ux-affordance', '어포던스와 시그니파이어', 'Affordances and signifiers', '어포던스는 할 수 있는 행동, 시그니파이어는 그 행동을 알려주는 신호예요. 신호가 없으면 기능이 있어도 사용자가 찾지 못해요.', '어포던스는 물건이나 화면이 사람에게 허락하는 행동이에요. 손잡이는 잡아서 당길 수 있게, 평평한 판은 밀 수 있게 해줘요. 돈 노먼은 여기에 시그니파이어라는 개념을 더했는데, 그 행동이 가능하다는 것을 알려주는 신호예요. 미는 문에 당기는 손잡이를 달면 사람들이 잘못 당기는 이유는 모양이 잘못된 신호를 보내기 때문이에요(그래서 이런 문을 “노먼의 문”이라고 불러요). 화면에서는 버튼의 테두리와 배경색, 링크의 색과 밑줄, 마우스를 올렸을 때 바뀌는 커서와 호버 효과가 “누를 수 있다”는 시그니파이어예요. 그냥 글자와 누를 수 있는 글자가 똑같아 보이면 사용자는 기능을 놓치거나 아무 데나 눌러 봐요. 특히 스와이프나 길게 누르기 같은 보이지 않는 동작은 신호가 없으면 아무도 발견하지 못해요. 평평한 디자인이 유행하면서 그림자와 테두리 같은 단서가 줄었기 때문에, 힌트 문구, 아이콘, 첫 사용 안내 같은 신호를 의식적으로 넣어야 해요. 반대로 누를 수 없는 것을 버튼처럼 꾸미면 혼란이 생겨요.', 'An affordance is an action that is possible; a signifier is the cue that reveals it. Without signifiers, people never find features that are there.', 'An affordance is an action an object or screen allows: a handle lets you grasp and pull, a flat plate lets you push. Don Norman added the idea of a signifier, the cue that tells people the action is possible. People pull push doors fitted with pull handles because the shape sends the wrong signal, which is why such doors are called “Norman doors.” On screens, a button’s border and fill, a link’s color and underline, and cursor changes and hover effects all signal “you can click this.” When clickable and plain text look the same, users miss features or tap at random. Invisible gestures such as swipes and long presses go undiscovered entirely without signifiers. Flat design removed cues such as shadows and borders, so signals such as hint text, icons and first-use guidance must be added deliberately. Conversely, styling non-clickable things like buttons creates confusion.', sAfford())
  ]),
  sec('ux-visual', '시각 디자인', 'Visual design', '시각 디자인의 기초', 'Visual design basics', '게슈탈트 원리, 타이포그래피, 색 사용, 명도 대비, 레이아웃 그리드, 사람들이 화면을 훑는 패턴까지 보기 좋고 읽기 쉬운 화면을 만드는 바탕이에요.', 'Gestalt principles, typography, color use, contrast, layout grids and how people scan screens: the foundations of screens that look good and read easily.', [
    item('ux-gestalt', '게슈탈트 원리', 'Gestalt principles', '사람은 낱개가 아니라 묶음과 형태로 봐요. 공통 영역·폐쇄·연속·전경과 배경 원리로 배치만으로 의미를 전해요.', '게슈탈트 원리는 사람의 눈이 요소를 낱개로 보지 않고 묶음과 형태로 인식하는 방식을 정리한 것이에요. 공통 영역 원리는 같은 테두리나 배경 안의 요소를 간격과 상관없이 한 묶음으로 보게 해요. 카드, 섹션 배경, 표의 줄무늬가 이 원리를 써요. 폐쇄 원리는 끊긴 부분을 스스로 채워 완성된 형태로 보는 경향으로, 모서리 네 개만 있어도 네모가 보이기 때문에 아이콘과 로고를 단순하게 만들 수 있어요. 연속 원리는 눈이 매끄럽게 이어지는 선을 따라가는 경향이에요. 정렬된 목록, 단계 표시, 가로 스크롤 목록의 잘린 마지막 카드가 이를 활용해요. 전경과 배경 원리는 앞에 떠 있는 것과 뒤의 배경을 나눠 보는 경향으로, 모달 뒤를 어둡게 하고 그림자를 주면 시선이 모달에 모여요. 근접성(가까우면 한 묶음)과 유사성(비슷하게 생기면 한 묶음)도 같은 계열의 원리예요. 실무 팁은 선과 상자를 긋기 전에 여백만으로 묶어 보는 거예요. 선이 많아질수록 화면이 복잡해지기 때문이에요.', 'People see groups and shapes rather than individual pieces, so common region, closure, continuity and figure-ground let layout alone carry meaning.', 'Gestalt principles describe how the eye perceives groups and shapes rather than isolated elements. Common region makes elements inside the same border or background read as one group regardless of spacing, which is how cards, section backgrounds and striped table rows work. Closure is the tendency to complete gaps and see whole shapes: four corners suffice to suggest a square, so icons and logos can stay minimal. Continuity is the eye’s tendency to follow smooth lines, used by aligned lists, step indicators and the cut-off last card hinting that a carousel scrolls. Figure-ground is the tendency to separate what floats in front from the background, so dimming behind a modal and adding a shadow draws attention to it. Proximity (close things group) and similarity (alike things group) belong to the same family. A practical tip is to group with whitespace before drawing lines and boxes, because every extra line adds visual noise.', sGestalt()),
    item('ux-typography', '타이포그래피 기초', 'Typography basics', '비율로 정한 크기 단계, 1.4~1.6 줄 간격, 45~75자 줄 길이, 두 가지 이하 글꼴로 읽기 쉬운 글을 만들어요.', '화면의 대부분은 글이라 타이포그래피가 사용성의 큰 부분을 차지해요. 먼저 글자 크기는 아무렇게나 고르지 않고, 16px에서 시작해 1.25배씩 키운 16, 20, 25, 31, 39px처럼 일정한 비율의 단계(타입 스케일) 안에서 골라요. 크기가 제각각이면 무엇이 제목이고 본문인지 위계가 흐려져요. 본문의 줄 간격(line-height)은 글자 크기의 1.4~1.6배 정도가 편해요. 너무 좁으면 다음 줄을 찾기 어렵고, 큰 제목은 오히려 조금 좁게 둬야 단단해 보여요. 한 줄 길이는 영문 기준 45~75자가 읽기 좋아요. 넓은 모니터에서 본문이 화면 끝까지 늘어나면 눈이 다음 줄 시작을 놓치므로 본문 폭에 최대값을 둬요. 글꼴은 보통 제목용과 본문용 두 가지 이하로 쓰고, 위계는 새 글꼴 대신 굵기, 크기, 색으로 만들어요. 본문은 모바일에서도 16px 안팎을 지키고, 한글은 영문보다 획이 복잡하니 너무 가는 굵기는 피해요.', 'A ratio-based type scale, 1.4–1.6 line height, 45–75 character lines and at most two typefaces make text easy to read.', 'Most of a screen is text, so typography carries much of its usability. Font sizes are not picked at random but from a type scale grown by a fixed ratio, for example 16, 20, 25, 31 and 39 px at 1.25, because arbitrary sizes blur which text is a heading and which is body. Body line height of about 1.4 to 1.6 times the font size reads comfortably: tight leading makes the next line hard to find, while large headings look firmer slightly tighter. Lines of about 45 to 75 characters read best; on wide monitors body text stretching edge to edge makes eyes lose the start of the next line, so cap the text width. Use at most two typefaces, typically one for headings and one for body, and build hierarchy with weight, size and color rather than more fonts. Keep body text around 16 px even on mobile, and avoid very thin weights for Korean, whose glyphs are more complex than Latin.', sType()),
    item('ux-color', '색 사용의 기초', 'Color basics', '60·30·10 비율로 절제하고, 한 색을 밝기 단계로 체계화하고, 의미 색은 늘 같은 뜻으로 써요. 강조색은 아낄수록 힘이 있어요.', '색은 분위기를 만들지만, 많이 쓸수록 화면이 산만해져요. 60·30·10 규칙은 화면의 60%를 차분한 바탕색, 30%를 보조색, 10%를 강조색으로 나누는 출발점이에요. 강조색이 적어야 가장 중요한 버튼에 시선이 모여요. 실무에서는 색 하나를 50부터 900까지 밝기 단계로 나눈 팔레트를 만들어요. 연한 50~100은 배경과 선택 상태에, 중간 500은 버튼에, 진한 700~900은 글자와 눌림 상태에 쓰는 식으로 정해 두면 화면 전체가 일관돼요. 성공(초록), 경고(주황), 오류(빨강), 정보(파랑) 같은 의미 색은 브랜드 색과 따로 정하고, 어디서나 같은 뜻으로만 써요. 브랜드 색이 빨강이라고 해서 오류처럼 보이게 쓰면 혼란이 생겨요. 또 색만으로 뜻을 전하면 색각 이상이 있는 사람은 알아보지 못하므로 아이콘이나 글자를 함께 써요. 색을 고른 뒤에는 글자와 배경의 명도 대비를 따로 확인하고, 다크 모드용 단계도 따로 정해요.', 'Restrain color with 60-30-10, systematize each hue into steps, and keep semantic colors consistent; accents gain power the less they are used.', 'Color sets the mood, but the more of it you use, the busier the screen gets. The 60-30-10 rule is a starting point: 60% calm base color, 30% secondary color and 10% accent, so scarce accents pull the eye to the most important button. In practice each hue becomes a palette of lightness steps from 50 to 900: light 50–100 for backgrounds and selected states, a mid 500 for buttons, and dark 700–900 for text and pressed states, keeping the whole interface consistent. Semantic colors, success green, warning orange, error red and info blue, are defined separately from brand colors and always mean the same thing; a red brand color used carelessly can look like an error. Meaning should never rely on color alone, since people with color vision deficiencies may miss it, so pair color with icons or text. After choosing colors, check text contrast separately and define separate steps for dark mode.', sColor()),
    item('ux-contrast', '명도 대비', 'Color contrast', '본문 글자는 4.5:1, 큰 글자와 버튼 테두리·아이콘은 3:1 이상이에요(WCAG AA). 연한 회색 글자는 보기엔 세련돼도 읽기 어려워요.', '명도 대비는 글자색과 배경색의 상대 휘도 비율로, 같은 색이면 1:1, 흰 바탕의 검은 글자는 21:1이에요. 웹 접근성 지침 WCAG의 AA 기준은 본문 글자 4.5:1 이상, 약 24px 이상(굵으면 약 19px 이상)의 큰 글자와 버튼 테두리, 입력창 테두리, 아이콘 같은 UI 요소는 3:1 이상이에요. 더 엄격한 AAA는 본문 7:1을 요구해요. 흰 바탕 기준으로 #767676이 4.5:1을 맞추는 가장 연한 회색이고, #949494가 3:1의 경계, #595959가 7:1이에요. 디자인에서 흔히 쓰는 #AAAAAA 같은 연한 회색 글자는 2.3:1밖에 안 돼서, 시력이 약한 사람이나 햇빛 아래 휴대폰, 저가 모니터에서는 거의 읽히지 않아요. 대비는 저시력 사용자만을 위한 것이 아니라 모든 사람의 가독성을 높여요. Figma 플러그인이나 브라우저 개발자 도구의 대비 검사기로 디자인 단계에서 바로 확인하고, 다크 모드와 이미지 위 글자처럼 배경이 바뀌는 경우도 따로 검사해요. 비활성 버튼은 기준에서 예외지만 비활성이라는 것은 알아볼 수 있어야 해요.', 'Body text needs 4.5:1 and large text and UI elements such as borders and icons need 3:1 (WCAG AA); pale gray text may look refined but is hard to read.', 'Contrast is the ratio of the relative luminance of text and background, from 1:1 for identical colors to 21:1 for black on white. WCAG’s AA level requires at least 4.5:1 for body text, and 3:1 for large text (about 24 px, or about 19 px bold) and UI elements such as button borders, input borders and icons; the stricter AAA level asks 7:1 for body text. On white, #767676 is the lightest gray reaching 4.5:1, #949494 sits at the 3:1 threshold and #595959 reaches 7:1. The pale gray often used in designs, such as #AAAAAA, manages only 2.3:1 and becomes nearly unreadable for low-vision users, on phones in sunlight or on cheap monitors. Contrast helps everyone’s readability, not only people with low vision. Check it during design with Figma plugins or browser developer tools, and test separately where backgrounds change, such as dark mode and text over images. Disabled controls are exempt but must still be recognizable as disabled.', sContrast()),
    item('ux-grid', '레이아웃 그리드', 'Layout grids', '열·거터·여백으로 보이지 않는 기준선을 세우고, 화면이 좁아지면 열 수를 줄여 블록을 쌓아요. 간격은 4·8 배수로 맞춰요.', '레이아웃 그리드는 화면을 같은 너비의 열(column), 열 사이 간격(gutter), 바깥 여백(margin)으로 나눈 보이지 않는 기준선이에요. 콘텐츠는 열 단위로 자리를 차지해서, 본문 8열과 사이드바 4열처럼 나누면 서로 다른 화면에서도 가장자리가 맞아 정돈돼 보여요. 흔히 데스크톱 12열, 태블릿 8열, 모바일 4열을 써요. 12는 2, 3, 4, 6으로 나눠지기 때문에 반, 삼분의 일, 사분의 일 배치가 모두 쉬워요. 화면이 좁아지면 열 수를 줄이고 옆에 있던 블록을 위아래로 쌓아요. 요소 사이 간격과 크기도 4나 8의 배수로 맞추면(8pt 그리드) 화면 전체에 일정한 리듬이 생기고, 디자이너와 개발자가 “16, 24”처럼 같은 숫자로 이야기할 수 있어요. 그리드는 구속이 아니라 출발점이라서, 히어로 이미지처럼 의도적으로 그리드를 깨는 요소가 오히려 눈에 띄기도 해요. 코드에서는 CSS Grid의 grid-template-columns: repeat(12, 1fr)와 gap으로 그대로 구현해요.', 'Columns, gutters and margins set an invisible backbone, columns drop as screens narrow so blocks stack, and spacing follows multiples of 4 or 8.', 'A layout grid divides the screen into equal columns, gaps between them (gutters) and outer margins, forming an invisible backbone. Content spans whole columns, so splitting, say, 8 columns for the body and 4 for a sidebar keeps edges aligned and tidy across screens. Common setups are 12 columns on desktop, 8 on tablet and 4 on mobile; 12 divides by 2, 3, 4 and 6, making halves, thirds and quarters easy. As the screen narrows, the column count drops and side-by-side blocks stack vertically. Sizing and spacing in multiples of 4 or 8 (an 8-point grid) gives the whole screen a steady rhythm and lets designers and developers speak in the same numbers, such as 16 and 24. A grid is a starting point rather than a cage, and elements that break it on purpose, such as hero images, can stand out precisely because of it. In code, CSS Grid implements it directly with grid-template-columns: repeat(12, 1fr) and gap.', sGrid()),
    item('ux-scanning', '훑어보기 패턴', 'Scanning patterns', '사람들은 읽지 않고 훑어봐요. F·Z 시선 흐름에 맞춰 핵심을 왼쪽 위와 문장 앞에 두고, 제목만 읽어도 흐름이 보이게 써요.', '사람들은 화면의 글을 처음부터 끝까지 읽지 않고 필요한 것을 찾아 훑어봐요. 시선 추적 연구에서 글이 많은 화면은 위쪽 한두 줄을 가로로 읽고, 조금 아래를 짧게 읽은 뒤, 왼쪽 가장자리를 따라 내려가는 F 모양이 자주 나타나요. 그래서 왼쪽 위와 각 줄의 첫 단어가 가장 많이 읽혀요. 요소가 적은 랜딩 화면에서는 시선이 왼쪽 위에서 오른쪽으로, 대각선 아래로, 다시 오른쪽으로 흐르는 Z 모양이 되기 쉬워서, 로고, 핵심 문구, 행동 버튼을 그 경로에 두고 마지막 지점에 버튼을 둬요. 이런 패턴을 이용하는 핵심은 정보를 앞에 두는 거예요. “배송 기간이 기존 3일에서 1일로 단축되었습니다”보다 “배송 1일로 단축”이 훑을 때 잡혀요. 또 제목, 소제목, 굵은 글씨만 훑어도 내용의 흐름이 이해되게 쓰면(레이어 케이크 패턴) 사람들이 원하는 곳을 빨리 찾아요. 문단은 짧게, 나열은 목록으로 쓰고, 중요한 내용을 오른쪽 아래 구석에 숨기지 않아요.', 'People scan instead of reading, so place key content top left and at the start of sentences following F and Z paths, and make headings alone tell the story.', 'People scan screens for what they need rather than reading start to finish. Eye-tracking studies often show an F shape on text-heavy pages: a horizontal read across the top line or two, a shorter read a little lower, then a scan down the left edge, so the top left and the first words of each line get the most attention. Sparse landing screens tend to produce a Z, from top left across, diagonally down and across again, so logo, key message and call to action sit along that path with the button at the end. Using these patterns comes down to front-loading: “1-day delivery now” is caught at a glance where “delivery time has been reduced from the previous three days to one” is not. Writing so that headings, subheadings and bold text alone convey the flow, the layer-cake pattern, lets people find their target quickly. Keep paragraphs short, turn enumerations into lists and never hide essentials in the bottom right corner.', sScan())
  ]),
  sec('ux-interact', '인터랙션', 'Interaction', '인터랙션 디자인 기초', 'Interaction design basics', '실행과 평가의 간극, 닐슨의 10가지 휴리스틱, 길을 잃지 않는 내비게이션, 빈·로딩·오류까지 모든 UI 상태, 반응 시간과 체감 속도, 처음 쓰는 사람을 위한 온보딩까지 사용자와 화면이 주고받는 방식이에요.', 'The gulfs of execution and evaluation, Nielsen’s ten heuristics, navigation that keeps people oriented, every UI state from empty to error, response times and perceived speed, and onboarding for newcomers: how people and screens interact.', [
    item('ux-gulfs', '실행과 평가의 간극', 'Gulfs of execution and evaluation', '“어떻게 하지?”(실행)와 “됐나?”(평가) 두 간극을 좁히는 것이 사용성의 핵심이에요. 보이는 조작과 즉각적인 피드백으로 메워요.', '돈 노먼은 사람이 기계를 쓸 때 두 개의 간극을 건너야 한다고 설명했어요. 실행의 간극은 하고 싶은 일이 있는데 어떤 조작으로 해야 하는지 모르는 상태예요. 사진을 보내고 싶은데 버튼이 어디 있는지, 어떤 아이콘이 그 기능인지 모르면 간극이 넓은 거예요. 평가의 간극은 조작한 뒤 시스템이 어떻게 됐는지, 성공했는지 알 수 없는 상태예요. 전송 버튼을 눌렀는데 아무 변화가 없으면 사용자는 같은 버튼을 다시 누르거나 불안해해요. 실행 쪽 다리는 할 수 있는 일을 보이게 하는 거예요. 명확한 라벨이 붙은 버튼, 시그니파이어, 익숙한 관례가 “어떻게 하지?”를 줄여요. 평가 쪽 다리는 즉각적이고 알아보기 쉬운 피드백이에요. 버튼 눌림 효과, 진행 표시, “✓ 전송됨” 같은 결과 표시가 “됐나?”를 없애요. 사용성 문제의 대부분은 이 두 간극 중 하나로 설명할 수 있어서, 테스트에서 사용자가 “이건 어떻게 해요?” 또는 “지금 뭐가 된 거죠?”라고 말하면 어느 간극이 넓은지 바로 알 수 있어요.', 'Narrowing the two gulfs, “how do I do this?” (execution) and “did it work?” (evaluation), is the heart of usability, bridged by visible controls and immediate feedback.', 'Don Norman explained that people must cross two gulfs when using machines. The gulf of execution is knowing what you want but not which action achieves it: wanting to send a photo without knowing where the button is or which icon means it. The gulf of evaluation is not knowing what happened after acting or whether it worked: pressing send and seeing no change makes people press again or worry. Bridging execution means making possible actions visible, with clearly labeled buttons, signifiers and familiar conventions reducing “how do I…?” Bridging evaluation means immediate, legible feedback: pressed states, progress indicators and results such as “✓ sent” remove “did it work?” Most usability problems can be explained by one of the two gulfs, so when test participants ask “how do I do this?” or “what just happened?”, you know which one is wide.', sGulfs()),
    item('ux-heuristics', '닐슨의 10가지 휴리스틱', 'Nielsen’s ten heuristics', '시스템 상태 보여주기부터 도움말까지 10가지 사용성 원칙이에요. 3~5명이 따로 점검하고 심각도로 우선순위를 정하는 휴리스틱 평가에 써요.', '야콥 닐슨의 10가지 사용성 휴리스틱은 1994년에 정리된 이후 지금도 가장 널리 쓰이는 화면 점검 기준이에요. 1 시스템 상태 보여주기, 2 현실 세계와 맞는 말 쓰기, 3 사용자 통제와 자유(취소와 되돌리기), 4 일관성과 표준, 5 오류 예방, 6 기억보다 알아보기, 7 유연성과 효율(숙련자용 지름길), 8 미니멀한 디자인, 9 오류를 인식·진단·복구하도록 돕기, 10 도움말과 문서예요. 규칙이라기보다 넓은 원칙이라 적용에는 판단이 필요해요. 이 원칙으로 화면을 점검하는 방법이 휴리스틱 평가예요. 한 사람은 문제의 일부만 찾기 때문에 3~5명의 평가자가 각자 따로 화면을 훑으며 원칙에 어긋나는 곳을 기록한 뒤 결과를 합쳐요. 찾은 문제에는 0(문제 아님), 1(미관상 문제), 2(작은 문제), 3(큰 문제), 4(출시 전 반드시 고칠 재앙)의 심각도를 매겨 순서대로 고쳐요. 초기 시안에도 바로 쓸 수 있어 싸고 빠르지만, 실제 사용자의 행동을 보는 사용성 테스트를 대신하지는 못해요.', 'Ten usability principles from visibility of status to help and documentation, used in heuristic evaluations where three to five reviewers check alone and prioritize by severity.', 'Jakob Nielsen’s ten usability heuristics, formulated in 1994, remain the most widely used criteria for reviewing screens: 1 visibility of system status, 2 match between system and the real world, 3 user control and freedom (cancel and undo), 4 consistency and standards, 5 error prevention, 6 recognition rather than recall, 7 flexibility and efficiency of use (shortcuts for experts), 8 aesthetic and minimalist design, 9 helping users recognize, diagnose and recover from errors, and 10 help and documentation. They are broad principles rather than rules, so applying them takes judgment. Heuristic evaluation reviews screens against them: because one person finds only part of the problems, three to five evaluators inspect the screens independently, record violations and then merge results. Each finding is rated from 0 (not a problem), 1 (cosmetic), 2 (minor), 3 (major) to 4 (a catastrophe to fix before release), and fixed in that order. It is cheap, fast and usable on early drafts, but it cannot replace usability tests that observe real users.', sHeur()),
    item('ux-navigation', '내비게이션 설계', 'Navigation design', '“지금 어디?”, “어디로 갈 수 있지?”, “어떻게 돌아가지?”에 늘 답하게 설계해요. 정보 구조는 깊이와 너비의 균형이에요.', '좋은 내비게이션은 사용자의 세 가지 질문에 언제나 답해요. 첫째 “지금 어디에 있지?”에는 홈 › 의류 › 셔츠 같은 경로 표시(브레드크럼), 선택된 메뉴 강조, 화면 제목으로 답해요. 둘째 “어디로 갈 수 있지?”에는 주요 목적지를 늘 같은 자리에 보이게 둔 메뉴로 답해요. 햄버거 메뉴처럼 숨겨진 메뉴는 덜 쓰이므로, 자주 쓰는 목적지는 탭 바처럼 드러내요. 셋째 “어떻게 돌아가지?”에는 뒤로 가기, 상위 경로 링크, 홈으로 가는 길로 답해요. 언제든 빠져나올 수 있다는 믿음이 있어야 사용자가 마음 놓고 탐색해요. 이 밑에는 정보 구조(IA)가 있어요. 메뉴가 너무 깊으면 원하는 것까지 클릭이 많아지고, 너무 넓으면 한 화면의 선택지가 많아 고르기 어려워요. 메뉴 이름은 회사의 부서 이름이 아니라 사용자가 쓰는 말로 짓고, 카드 소팅과 트리 테스트로 구조가 사용자의 생각과 맞는지 검증해요. 검색은 좋은 보조 수단이지만 내비게이션을 대신하지는 못해요.', 'Always answer “where am I?”, “where can I go?” and “how do I get back?”; information architecture balances depth and breadth.', 'Good navigation always answers three questions. “Where am I?” is answered by breadcrumbs such as Home › Clothing › Shirts, a highlighted current menu item and the screen title. “Where can I go?” is answered by menus that keep main destinations visible in a consistent place; hidden menus such as hamburgers get used less, so expose frequent destinations, for example in a tab bar. “How do I get back?” is answered by back actions, parent links and a route home, because people explore freely only when they trust there is a way out. Underneath sits information architecture (IA): menus that are too deep mean many clicks, and menus that are too wide mean too many choices on one screen. Name menus in users’ words rather than department names, and verify the structure against users’ thinking with card sorting and tree testing. Search is a good supplement but no replacement for navigation.', sNav()),
    item('ux-ui-states', 'UI 상태 설계', 'Designing UI states', '화면 하나에도 이상적·빈·로딩·일부·오류 다섯 상태가 있어요. 시안에서 빠진 상태는 결국 사용자가 가장 자주 보는 어색한 화면이 돼요.', '디자인 시안에는 보통 데이터가 보기 좋게 채워진 이상적인 상태만 그려져요. 하지만 실제 화면은 그 외에도 여러 상태를 지나요(스콧 허프의 UI 스택). 빈 상태는 데이터가 아직 없을 때로, 처음 쓰는 사람이 가장 먼저 보는 화면이에요. 비어 있다는 사실만 말하지 말고 왜 비었는지와 다음에 할 일을 “인기 상품 보기” 같은 버튼으로 알려줘요. 로딩 상태는 곧 나올 화면의 모양을 스켈레톤으로 미리 보여주면 기다림이 짧게 느껴지고, 화면이 갑자기 밀리는 일도 줄어요. 오류 상태는 무슨 일이 일어났는지 쉬운 말로 설명하고 “다시 시도” 같은 해결 방법을 함께 줘요. 일부 상태는 일부만 성공했거나 일부 데이터만 있을 때예요. 장바구니 상품 하나가 품절됐다고 전체가 실패한 것처럼 보이지 않게 해당 항목만 표시해요. 이 밖에 데이터가 너무 많을 때, 오프라인일 때도 따져 봐요. 개발을 시작하기 전에 화면마다 상태 목록을 합의해 두면 “이 경우엔 어떻게 보여요?”라는 질문이 줄어요.', 'Every screen has five states, ideal, empty, loading, partial and error, and states left out of mockups become the awkward screens users see most.', 'Mockups usually show only the ideal state, with data nicely filled in, but real screens pass through other states too, Scott Hurff’s UI stack. The empty state, before any data exists, is the first thing newcomers see, so rather than just saying it is empty, explain why and suggest the next step with a button such as “browse popular items.” Loading states feel shorter when a skeleton previews the coming layout, which also prevents content from jumping around. Error states explain what happened in plain words and offer a way forward such as “try again.” Partial states cover partial success or partial data: if one item in a cart sells out, flag just that item instead of making everything look broken. Also consider too much data and offline states. Agreeing on each screen’s list of states before development cuts down on “what should this look like when…?” questions.', sStates()),
    item('ux-response-time', '반응 시간과 체감 속도', 'Response times and perceived speed', '0.1초는 즉각, 1초는 흐름 유지, 10초는 집중의 한계예요. 시간에 맞는 피드백을 고르고 낙관적 UI·미리 불러오기로 체감 속도를 줄여요.', '반응 시간에는 수십 년 동안 쓰여 온 세 가지 기준이 있어요. 0.1초 안의 반응은 즉각적으로 느껴져서, 버튼 눌림 효과나 토글 전환처럼 내가 직접 움직인다는 감각을 줘요. 1초 안이면 기다림을 느끼더라도 생각의 흐름은 끊기지 않아요. 1초가 넘을 것 같은 작업은 스피너나 스켈레톤으로 진행 중임을 보여줘야 해요. 10초는 집중이 유지되는 한계예요. 그보다 오래 걸리는 작업은 진행률과 남은 시간, 취소 버튼을 보여주고, 사용자가 다른 일을 하다 돌아올 수 있게 해요. 실제 시간을 줄이는 것 말고도 체감 속도를 설계할 수 있어요. 낙관적 UI는 좋아요를 누르면 서버 응답을 기다리지 않고 바로 반영한 뒤 실패할 때만 되돌려요. 다음에 갈 화면을 미리 불러오거나, 준비된 부분부터 단계적으로 보여주는 것도 방법이에요. 반대로 0.3초 만에 끝나는 로딩에 스피너를 보여주면 깜빡여서 오히려 느려 보이므로, 짧은 지연 뒤에만 표시해요. 느린 네트워크 설정으로 직접 테스트해 보는 것이 좋아요.', '0.1 s feels instant, 1 s keeps flow and 10 s is the limit of attention; match feedback to the wait and shorten perceived time with optimistic UI and prefetching.', 'Three response-time limits have guided design for decades. Responses within 0.1 seconds feel instantaneous, giving a sense of direct manipulation as with pressed buttons or flipping toggles. Within 1 second people notice the delay but keep their train of thought, and anything likely to take longer should show a spinner or skeleton. Ten seconds is the limit for holding attention, so longer tasks should show progress, time remaining and a cancel button, letting people do something else and come back. Beyond cutting real time, perceived speed can be designed. Optimistic UI applies a like immediately without waiting for the server and rolls back only on failure. Prefetching the likely next screen and progressively showing what is ready also help. Conversely, a spinner on a 0.3-second load flickers and makes things feel slower, so show it only after a short delay. Testing with throttled network settings is worthwhile.', sResp()),
    item('ux-onboarding', '온보딩', 'Onboarding', '설명 투어 대신 필요한 순간에 하나씩 알려주고, 체크리스트로 진행을 보여주며, 첫 성공까지 걸리는 시간을 줄여요.', '온보딩의 목표는 가입이 아니라 처음 쓰는 사람이 제품의 가치를 처음 느끼는 순간, 즉 첫 성공까지 데려가는 거예요. 앱을 열자마자 기능을 설명하는 슬라이드 다섯 장은 대부분 건너뛰고, 끝까지 본 사람도 실제로 쓸 때쯤이면 잊어버려요. 사람은 설명을 읽기보다 직접 해 보며 배우기 때문이에요. 대신 필요한 순간에 그 자리에서 하나씩 알려줘요. 빈 프로젝트 화면에서 “여기서 첫 프로젝트를 만들어요”처럼 바로 해 볼 수 있는 안내를 두거나, 처음 쓰는 기능 옆에 짧은 툴팁을 띄워요. 체크리스트는 남은 단계와 진행 정도를 보여줘서 사람들이 마무리하고 싶게 만들어요(목표 기울기 효과). 샘플 데이터나 좋은 기본값을 미리 채워 두면 빈 화면에서 막히는 일이 줄어요. 가입부터 첫 성공까지 걸리는 시간(time to value)과 단계별 이탈을 지표로 재며 줄여 가고, 건너뛴 사람도 나중에 도움말에서 다시 볼 수 있게 해요. 회원가입 자체도 꼭 필요한 정보만 받고, 나머지는 쓰면서 천천히 받아요.', 'Instead of explanatory tours, teach one thing at the moment of need, show progress with checklists and shorten the time to a first success.', 'The goal of onboarding is not sign-up but getting newcomers to the moment they first feel the product’s value, their first success. Five feature slides on launch are mostly skipped, and those who finish them forget by the time they need the features, because people learn by doing rather than reading. Instead, teach one thing at a time where it is needed: a prompt on an empty project screen saying “start your first project here,” or a short tooltip beside a feature used for the first time. Checklists show remaining steps and progress, nudging people to finish (the goal-gradient effect). Sample data and good defaults reduce getting stuck on empty screens. Measure and shrink the time to value and the drop-off at each step, and let people who skipped guidance find it later in help. Ask only for essential information at sign-up and collect the rest gradually as people use the product.', sOnboard())
  ]),
  sec('ux-access', '반응형·접근성', 'Responsive & accessible', '모든 화면, 모든 사람을 위해', 'For every screen and everyone', '모바일부터 넓혀가는 반응형 디자인, 한 손으로 쓰는 엄지 영역, 다크 모드 설계, WCAG의 네 원칙, 키보드만으로 쓸 수 있는 화면까지 기기와 사람의 다양성을 고려하는 방법이에요.', 'Mobile-first responsive design, thumb zones for one-handed use, designing dark mode, WCAG’s four principles and screens that work with only a keyboard: designing for the diversity of devices and people.', [
    item('ux-responsive', '반응형 디자인', 'Responsive design', '모바일부터 설계하고, 기기 이름이 아니라 레이아웃이 깨지는 폭에서 바꾸며, 좁아질 때 쌓이는 순서를 중요도 순서로 정해요.', '반응형 디자인은 하나의 화면이 휴대폰부터 태블릿, 데스크톱까지 여러 폭에 맞게 바뀌게 하는 방식이에요. 좁은 화면부터 설계하는 모바일 퍼스트는 작은 공간에 무엇을 남길지 먼저 정하게 해서, 정말 중요한 것이 무엇인지 드러나게 해요. 브레이크포인트는 특정 기기 이름이 아니라 콘텐츠와 레이아웃이 깨지기 시작하는 폭에서 정해요. 흔히 600px, 1024px 근처를 쓰지만 콘텐츠에 따라 달라요. 넓은 화면의 3열 레이아웃은 좁아지면 1열로 쌓이는데, 이때 쌓이는 순서가 곧 중요도 순서예요. 데스크톱에서 오른쪽 사이드바에 있던 광고가 모바일에서 본문보다 먼저 나오면 안 되겠죠. 글자 크기도 CSS clamp()로 최솟값과 최댓값 사이에서 화면 폭에 따라 부드럽게 바뀌게 할 수 있어요. 이미지는 화면에 맞는 크기를 골라 받게 하고, 터치와 마우스처럼 입력 방식의 차이도 고려해요. 브라우저 창 크기만 줄여 보지 말고 실제 기기에서 확인해요.', 'Design mobile first, switch layouts where they break rather than at device names, and make the stacking order on narrow screens the priority order.', 'Responsive design lets one interface adapt across widths from phones to tablets and desktops. Mobile-first design starts with the narrowest screen, forcing decisions about what stays in a small space and revealing what truly matters. Breakpoints belong where content and layout start to break rather than at device names; values around 600 px and 1024 px are common but depend on the content. A three-column layout on wide screens stacks into one column on narrow ones, and the stacking order is the priority order: an ad from the desktop sidebar should not appear before the main content on mobile. Type can scale smoothly with the viewport between a minimum and maximum using CSS clamp(). Serve images at sizes suited to the screen, and account for differences between touch and mouse input. Verify on real devices rather than only resizing a browser window.', sResponsive()),
    item('ux-thumb-zone', '엄지 영역과 터치 영역', 'Thumb zones and touch targets', '한 손 사용에서 엄지가 편한 곳은 화면 아래 가운데예요. 자주 쓰는 것은 아래에, 터치 영역은 44pt·48dp 이상, 위험한 버튼은 멀리 둬요.', '많은 사람이 휴대폰을 한 손으로 들고 엄지로 써요. 엄지가 편하게 닿는 곳은 화면 아래 가운데이고, 위쪽 구석은 손을 고쳐 잡거나 다른 손을 써야 해요. 화면이 커질수록 이 차이가 커져요. 그래서 탭 바, 주요 행동 버튼, 자주 쓰는 도구처럼 많이 누르는 것은 아래쪽에 둬요. 최근 앱과 브라우저들이 검색창과 주요 버튼을 아래로 내리는 것도 이 때문이에요. 손가락 끝은 마우스 커서보다 훨씬 크고 정확하지 않아서, 터치 영역은 iOS 기준 44×44pt, 안드로이드 기준 48×48dp 이상으로 넉넉하게 잡아요. 아이콘이 작아도 눌리는 영역은 크게 할 수 있고, 버튼 사이도 충분히 띄워야 옆 버튼을 잘못 누르지 않아요. 반대로 삭제, 결제처럼 되돌리기 어려운 버튼은 엄지가 쉽게 가지 않는 곳에 두거나 확인 단계를 거치게 해요. 왼손잡이와 태블릿처럼 잡는 방식이 다른 경우와, 화면 가장자리의 시스템 제스처와 겹치지 않는지도 함께 고려해요.', 'In one-handed use the thumb reaches the bottom center easily: put frequent actions low, make touch targets at least 44 pt or 48 dp, and keep destructive buttons out of easy reach.', 'Many people hold their phone in one hand and use their thumb. The bottom center is easy to reach, while top corners require a regrip or the other hand, a gap that widens as screens grow. So frequently pressed elements such as tab bars, primary action buttons and common tools go toward the bottom, which is why recent apps and browsers move search bars and main buttons down. Fingertips are much larger and less precise than a cursor, so touch targets should be generous, at least 44×44 pt on iOS and 48×48 dp on Android; a small icon can still have a large hit area, and enough space between buttons prevents mis-taps. Conversely, hard-to-undo actions such as delete or pay belong out of easy reach or behind a confirmation step. Also consider different grips, such as left-handed use and tablets, and avoid conflicts with system gestures at the screen edges.', sThumb()),
    item('ux-dark-mode', '다크 모드 설계', 'Designing dark mode', '순수 검정 대신 짙은 회색 바탕, 그림자 대신 밝은 표면으로 높이, 채도 낮춘 색, 흰색 불투명도로 글자 위계를 줘요. 색을 뒤집는 게 아니에요.', '다크 모드는 밝은 화면의 색을 단순히 뒤집는 것이 아니라 따로 설계해야 해요. 바탕은 순수 검정(#000)보다 #121212 같은 짙은 회색이 좋아요. 순수 검정 위의 흰 글자는 대비가 너무 세서 글자가 번져 보이고, OLED 화면에서는 스크롤할 때 검은 부분이 끌려 보이는 현상도 생겨요. 밝은 모드에서는 그림자로 요소의 높이를 보여주지만, 어두운 화면에서는 그림자가 거의 보이지 않아요. 그래서 위에 떠 있는 카드나 대화상자일수록 표면을 조금씩 더 밝게 해서 높이를 표현해요. 채도가 높은 원색은 어두운 바탕에서 떨려 보이고 대비도 부족하므로, 브랜드 색과 의미 색도 채도를 낮추고 밝기를 올린 다크 모드용 버전을 따로 정해요. 글자는 순백 대신 흰색의 불투명도로 위계를 줘서 주요 글자 87%, 보조 60%, 비활성 38% 정도를 써요. 사용자의 시스템 설정(prefers-color-scheme)을 따르되 앱 안에서 바꿀 수도 있게 하고, 명도 대비 검사도 다크 모드에서 따로 해요.', 'Use a deep gray base instead of pure black, lighter surfaces instead of shadows for elevation, desaturated colors and white opacity for text hierarchy; it is not a color inversion.', 'Dark mode must be designed rather than produced by inverting light colors. Backgrounds work better as a deep gray such as #121212 than pure black: white text on #000 is so harsh it appears to smear, and OLED screens can show smearing on black areas while scrolling. Light mode shows elevation with shadows, which nearly vanish on dark screens, so higher surfaces such as cards and dialogs get progressively lighter instead. Highly saturated colors vibrate and lack contrast on dark backgrounds, so define dark-mode versions of brand and semantic colors that are less saturated and lighter. Text uses white at different opacities rather than pure white, about 87% for primary, 60% for secondary and 38% for disabled. Follow the user’s system setting (prefers-color-scheme) while allowing an in-app switch, and check contrast separately in dark mode.', sDark()),
    item('ux-wcag', 'WCAG와 POUR 원칙', 'WCAG and the POUR principles', '웹 접근성 지침 WCAG는 인식·운용·이해·견고 네 원칙으로 이뤄져요. 보통 AA 수준을 목표로 하고, 접근성은 모든 사람의 사용성을 높여요.', 'WCAG(웹 콘텐츠 접근성 지침)는 장애가 있는 사람도 웹과 앱을 쓸 수 있게 W3C가 만든 국제 지침이에요. 네 원칙의 앞 글자를 따 POUR라고 불러요. 인식 가능(Perceivable)은 정보를 한 감각에만 의존하지 않게 하는 것으로, 이미지 대체 텍스트, 영상 자막, 충분한 명도 대비가 여기에 속해요. 운용 가능(Operable)은 모든 기능을 키보드로 쓸 수 있고, 시간 제한에 여유가 있으며, 발작을 일으킬 수 있는 깜빡임이 없게 하는 거예요. 이해 가능(Understandable)은 쉬운 말, 예측 가능한 동작, 친절한 오류 안내를 뜻해요. 견고함(Robust)은 올바른 HTML과 요소의 이름·역할·상태 정보로 스크린 리더 같은 보조 기술이 화면을 정확히 읽을 수 있게 하는 거예요. 기준은 A, AA, AAA 세 수준이 있고, 많은 나라의 법과 공공 조달 기준이 AA를 요구해요. 접근성은 장애인만을 위한 것이 아니에요. 자막은 시끄러운 지하철에서, 큰 터치 영역은 한 손으로 쓸 때 모두에게 도움이 돼요. 자동 검사 도구는 문제의 일부만 찾으므로 키보드와 스크린 리더로 직접 써 봐야 해요.', 'WCAG rests on four principles, perceivable, operable, understandable and robust; most teams target level AA, and accessibility improves usability for everyone.', 'WCAG (Web Content Accessibility Guidelines) is the W3C’s international guideline for making web content usable by people with disabilities, built on four principles known by their initials as POUR. Perceivable means information does not rely on a single sense, covering alt text for images, captions for video and sufficient contrast. Operable means every function works with a keyboard, time limits are generous and nothing flashes in ways that can trigger seizures. Understandable means plain language, predictable behavior and helpful error guidance. Robust means valid HTML exposing each element’s name, role and state so assistive technologies such as screen readers can interpret the screen correctly. There are three conformance levels, A, AA and AAA, and many countries’ laws and public procurement rules require AA. Accessibility is not only for disabled people: captions help on a noisy subway and large touch targets help anyone using one hand. Automated checkers catch only part of the problems, so try the product yourself with a keyboard and a screen reader.', sWcag()),
    item('ux-keyboard', '키보드 접근성', 'Keyboard accessibility', 'Tab 순서는 보이는 순서대로, 포커스 표시는 항상 보이게, 건너뛰기 링크를 두고, 모달은 포커스를 가두고 닫으면 원래 자리로 돌려줘요.', '마우스를 쓸 수 없는 사람, 스크린 리더 사용자, 키보드가 더 빠른 숙련자 모두 키보드로 화면을 다뤄요. 첫째, Tab 키로 이동하는 순서는 화면에 보이는 읽기 순서와 같아야 해요. CSS로 위치만 바꾸고 HTML 순서는 그대로 두면 포커스가 엉뚱한 곳으로 튀어요. 둘째, 지금 어느 요소에 있는지 보여주는 포커스 표시는 절대 없애면 안 돼요. 기본 테두리가 디자인과 어울리지 않으면 지우지 말고 더 잘 보이는 모양으로 바꿔요(:focus-visible). 셋째, 매 페이지 반복되는 메뉴를 건너뛰는 “본문으로 건너뛰기” 링크를 첫 번째 포커스 위치에 둬요. 넷째, 모달이 열리면 포커스를 그 안으로 옮기고 Tab이 모달 밖으로 나가지 않게 가둬요. Esc로 닫을 수 있어야 하고, 닫히면 모달을 열었던 버튼으로 포커스를 돌려줘야 사용자가 길을 잃지 않아요. 이 모든 것은 div에 클릭 이벤트를 다는 대신 button, a, input 같은 기본 요소를 쓰면 대부분 저절로 해결돼요. 마우스를 치우고 직접 써 보는 것이 가장 좋은 검사예요.', 'Keep tab order matching visual order, always show focus, add skip links, and trap focus in modals, returning it on close.', 'People who cannot use a mouse, screen reader users and experts who are faster on the keyboard all navigate with it. First, the Tab order must follow the visual reading order; moving things with CSS while leaving the HTML order unchanged makes focus jump unexpectedly. Second, never remove the focus indicator showing the current element; if the default ring clashes with the design, restyle it more visibly with :focus-visible rather than deleting it. Third, put a “skip to content” link at the first focus position so people can bypass menus repeated on every page. Fourth, when a modal opens, move focus into it and keep Tab from leaving it; Esc should close it, and closing should return focus to the button that opened it so users never get lost. Most of this comes for free by using native elements such as button, a and input instead of divs with click handlers. Unplugging the mouse and trying it yourself is the best test.', sKeyboard())
  ]),
  sec('ux-systems', '디자인 시스템', 'Design systems', '디자인 시스템과 협업', 'Design systems and collaboration', '토큰부터 가이드라인까지 디자인 시스템의 층, 아토믹 디자인, 컴포넌트 속성과 변형, 오토 레이아웃, 개발과의 핸드오프까지 여러 사람이 일관된 화면을 함께 만드는 방법이에요.', 'The layers of a design system from tokens to guidelines, atomic design, component properties and variants, auto layout and handoff to development: how many people build consistent screens together.', [
    item('ux-design-system', '디자인 시스템', 'Design systems', '토큰 → 컴포넌트 → 패턴 → 가이드라인을 하나의 원천으로 관리해요. 디자인 도구와 코드가 같은 토큰을 쓰면 어긋나지 않아요.', '여러 디자이너와 개발자가 각자 버튼을 만들면 회색만 열 가지가 되고, 같은 버튼이 화면마다 조금씩 달라져요. 디자인 시스템은 이를 막는 공통의 원천이에요. 바닥은 디자인 토큰으로, #3b5bdb 같은 값 대신 color.primary.500, space.4, radius.md처럼 이름 붙은 값을 써요. 브랜드 색을 바꿀 때 토큰 하나만 고치면 전체가 바뀌고, 다크 모드도 토큰의 값만 바꿔 처리해요. 토큰 위에 버튼, 입력창, 카드 같은 재사용 컴포넌트를 만들어요. 상태, 크기, 접근성까지 한 번 제대로 설계해 두니 팀마다 다시 만들 필요가 없어요. 그 위에는 로그인 폼, 빈 상태, 검색 결과처럼 컴포넌트를 조합한 패턴이 있고, 맨 위에는 언제 어떤 컴포넌트를 쓰고 쓰지 말아야 하는지 알려주는 가이드라인이 있어요. Figma 라이브러리와 코드의 컴포넌트가 같은 토큰을 원천으로 쓰면 디자인과 구현이 어긋나지 않아요. Google Material, IBM Carbon, Shopify Polaris가 공개된 예시예요. 시스템도 제품처럼 버전과 변경 기록을 관리하고, 사용 현황을 보며 개선해요.', 'A design system manages tokens, components, patterns and guidelines from one source, and design tools and code stay aligned when they share the same tokens.', 'When many designers and developers build their own buttons, you end up with ten grays and buttons that differ slightly on every screen. A design system is the shared source that prevents this. Its base is design tokens: named values such as color.primary.500, space.4 and radius.md instead of raw values like #3b5bdb, so changing one token updates the brand everywhere and dark mode becomes a matter of swapping token values. Reusable components such as buttons, inputs and cards are built on tokens, with states, sizes and accessibility designed properly once so teams need not rebuild them. Above them are patterns that combine components, such as sign-in forms, empty states and search results, and at the top, guidelines on when to use, and not use, each component. When the Figma library and coded components draw on the same tokens, design and implementation stay aligned. Google Material, IBM Carbon and Shopify Polaris are public examples. A system is run like a product, with versions and a changelog, and improved by watching how it is used.', sDS()),
    item('ux-atomic', '아토믹 디자인', 'Atomic design', '원자(버튼) → 분자(검색창) → 유기체(헤더) → 템플릿 → 페이지로 작은 것부터 쌓아 올려요. 컴포넌트 설계와 잘 맞는 사고방식이에요.', '아토믹 디자인은 브래드 프로스트가 화학에서 이름을 빌려 UI를 다섯 단계로 나눈 방법이에요. 원자는 라벨, 입력창, 버튼, 아이콘처럼 더 쪼갤 수 없는 가장 작은 요소예요. 분자는 원자 몇 개가 모여 한 가지 일을 하는 작은 단위로, 입력창과 버튼을 묶은 검색창이 대표적이에요. 유기체는 분자와 원자로 만든 화면의 한 구역으로, 로고, 메뉴, 검색창이 모인 헤더나 상품 카드 목록이 여기에 속해요. 템플릿은 유기체들을 배치한 빈 틀로 콘텐츠의 구조를 보여주고, 페이지는 그 틀에 실제 글과 이미지를 넣은 화면이에요. 작은 것부터 쌓아 올리는 사고방식은 React 같은 컴포넌트 기반 개발과 잘 맞아서, 디자이너와 개발자가 같은 단위로 이야기하게 해줘요. 다만 단계의 이름 자체보다 “작은 부품을 조합해 큰 것을 만든다”는 사고가 핵심이에요. 어떤 것이 분자인지 유기체인지 논쟁하는 데 시간을 쓰지 말고, 실제 콘텐츠를 넣은 페이지 단계에서 긴 글이나 빈 데이터 같은 빈틈을 확인해요.', 'Build UI bottom-up from atoms (buttons) to molecules (search boxes), organisms (headers), templates and pages, a mindset that fits component design well.', 'Atomic design, coined by Brad Frost, borrows chemistry terms to split UI into five levels. Atoms are the smallest indivisible elements: labels, inputs, buttons and icons. Molecules are small groups of atoms with a single job, the classic example being a search box combining an input and a button. Organisms are screen sections built from molecules and atoms, such as a header with logo, navigation and search, or a grid of product cards. Templates arrange organisms into an empty layout showing content structure, and pages fill templates with real text and images. Building up from small parts fits component-based development such as React and lets designers and developers talk in the same units. The labels matter less than the mindset of composing large things from small parts, so rather than debating whether something is a molecule or an organism, use the page level with real content to find gaps such as long text or missing data.', sAtomic()),
    item('ux-variants', '컴포넌트 속성과 변형', 'Component properties and variants', '변형·크기·상태를 하나의 컴포넌트 속성으로 묶고, 속성 이름을 코드의 props와 맞추면 핸드오프와 유지보수가 쉬워져요.', '버튼을 primary 버전, 큰 버전, 비활성 버전으로 따로 복사해 두면 조합마다 파일이 늘어나 금방 관리가 어려워져요. 컴포넌트 속성은 이를 하나의 컴포넌트 안에 묶어요. 변형(variant) 속성은 primary, secondary, ghost처럼 강조 단계를 나타내고, 화면에서 가장 중요한 행동 하나에만 primary를 써요. 크기는 sm, md, lg처럼 정해진 단계 안에서만 고르게 해서, 화면마다 버튼 높이가 제각각이 되는 것을 막아요. 기본, 호버, 눌림, 비활성, 로딩 같은 상태도 속성으로 다루고, 변형×크기×상태의 모든 조합을 미리 설계해 두면 개발 중 “로딩 중인 작은 ghost 버튼은요?” 같은 빠진 경우가 줄어요. 아이콘 유무나 아이콘 위치도 불리언·선택 속성으로 둬요. 핵심은 Figma 컴포넌트 속성의 이름과 값을 코드 props(variant="primary", size="md")와 똑같이 맞추는 거예요. 그러면 핸드오프가 그대로 코드로 옮겨지고, 디자인과 코드가 같은 언어로 이야기해요. 속성이 너무 많아지면 컴포넌트를 나누고, 말이 안 되는 조합은 막아 둬요.', 'Group variants, sizes and states as properties of one component, and match property names to code props so handoff and maintenance stay simple.', 'Copying a button into separate primary, large and disabled versions multiplies files with every combination and soon becomes unmanageable. Component properties group all of this inside one component. A variant property expresses emphasis, such as primary, secondary and ghost, with primary reserved for the single most important action on a screen. Size is chosen only from fixed steps such as sm, md and lg, preventing button heights from varying screen to screen. States such as default, hover, pressed, disabled and loading are properties too, and designing every combination of variant, size and state upfront prevents gaps like “what about a small loading ghost button?” during development. Icon presence and position become boolean or choice properties. The key is to give Figma property names and values exactly the same names as code props, variant="primary" and size="md", so handoff maps directly to code and design and code speak one language. Split components that grow too many properties, and block combinations that make no sense.', sVariants()),
    item('ux-auto-layout', '오토 레이아웃', 'Auto layout', 'Figma 오토 레이아웃은 CSS flex와 같아요. 방향·gap·padding·Hug/Fill 규칙으로 글자가 길어져도 스스로 늘어나는 레이아웃을 만들어요.', 'Figma의 오토 레이아웃은 프레임 안 자식 요소를 가로나 세로 한 방향으로 자동 배치하는 기능으로, CSS의 display: flex와 거의 같은 개념이에요. 요소 사이 간격은 각각 손으로 맞추지 않고 gap 값 하나로 정해서, 요소를 추가하거나 빼도 간격이 자동으로 유지돼요. 안쪽 여백(padding)도 프레임에 한 번만 정하면, 버튼 글자가 길어질 때 여백을 유지한 채 버튼이 늘어나요. 크기 규칙은 세 가지예요. Hug는 내용만큼 크기를 갖고(CSS의 fit-content), Fill은 부모의 남은 공간을 차지하며(flex: 1), Fixed는 고정 크기예요. 정렬과 간격 분배(space-between)도 flex의 justify-content, align-items와 대응돼요. 오토 레이아웃 프레임을 중첩하면 카드, 목록, 화면 전체처럼 복잡한 구조도 표현할 수 있어요. 이 덕분에 번역으로 글이 길어지거나 긴 사용자 이름이 들어와도 레이아웃이 깨지지 않는지 디자인 단계에서 확인할 수 있고, 개발자는 같은 규칙을 flex로 그대로 옮길 수 있어요.', 'Figma auto layout mirrors CSS flex: direction, gap, padding and hug or fill rules create layouts that grow on their own as text lengthens.', 'Figma auto layout flows a frame’s children in one direction, horizontal or vertical, almost exactly like CSS display: flex. Spacing between items is a single gap value rather than manual nudging, so adding or removing items keeps spacing intact. Padding is set once on the frame, so a button grows with longer text while keeping its padding. There are three sizing rules: hug sizes to the content (CSS fit-content), fill takes the parent’s remaining space (flex: 1) and fixed keeps a set size. Alignment and distribution such as space-between map to flex’s justify-content and align-items. Nesting auto layout frames expresses complex structures such as cards, lists and whole screens. As a result, designers can verify during design that layouts survive longer translated text or long user names, and developers can carry the same rules straight into flex.', sAutoLayout()),
    item('ux-handoff', '디자인 핸드오프', 'Design handoff', '토큰 이름, 모든 상태, 긴 글자·반응형·키보드 같은 극단적인 경우까지 넘기고, 구현 후 디자인 QA로 함께 확인해요.', '핸드오프는 디자인을 개발로 넘기는 과정이지만, 파일 하나를 던지고 끝나는 일이 아니라 함께 다듬는 대화예요. 먼저 간격과 색은 16px, #3b5bdb 같은 값 대신 space.4, color.primary 같은 토큰 이름으로 전달해요. 값이 맞아도 토큰이 다르면 나중에 테마를 바꿀 때 어긋나기 때문이에요. 이상적인 화면 하나만 넘기면 빈 상태, 오류, 로딩, 비활성 같은 나머지는 개발자가 추측하게 되므로 모든 상태를 함께 넘겨요. 아주 긴 상품 이름, 번역된 문구, 좁은 화면, 키보드로 조작할 때, 데이터가 1,000개일 때처럼 극단적인 경우의 동작도 정해 둬요. 미리 정하지 않은 것은 구현할 때마다 달라져요. 애니메이션은 지속 시간과 이징 값으로, 인터랙션은 프로토타입으로 보여줘요. Figma Dev Mode 같은 도구가 치수와 토큰을 바로 보여줘서 도움이 돼요. 구현이 끝나면 디자이너가 실제 화면을 시안과 비교하는 디자인 QA를 해서 차이를 함께 고쳐요. 개발자를 초기 단계부터 참여시키면 구현하기 어려운 디자인을 일찍 발견할 수 있어요.', 'Hand over token names, every state and edge cases such as long text, responsive behavior and keyboard use, then verify together with design QA after the build.', 'Handoff passes design to development, but it is an ongoing conversation rather than throwing a file over the wall. Specify spacing and color as token names such as space.4 and color.primary instead of raw values like 16 px and #3b5bdb, because matching values with different tokens drift apart when themes change. Handing over only the ideal screen leaves developers guessing about empty, error, loading and disabled states, so include every state. Define behavior for edge cases too, such as very long product names, translated copy, narrow screens, keyboard use and a thousand rows of data, because anything left undecided varies with each implementation. Show animations with durations and easing values, and interactions with prototypes. Tools such as Figma Dev Mode help by exposing measurements and tokens directly. After implementation, designers run design QA, comparing the built screens with the design and fixing differences together. Involving developers from the start surfaces hard-to-build designs early.', sHandoff())
  ]),
  sec('ux-validate', '검증과 지표', 'Validation & metrics', '디자인을 검증하는 법', 'Validating designs', '5명씩 반복하는 사용성 테스트, HEART와 SUS 같은 UX 지표, 퍼널 분석과 A/B 테스트, 카드 소팅과 트리 테스트까지 디자인이 실제로 효과가 있는지 확인하는 방법이에요.', 'Usability testing in rounds of five, UX metrics such as HEART and SUS, funnel analysis and A/B testing, and card sorting with tree testing: ways to check whether designs actually work.', [
    item('ux-usability-test', '사용성 테스트', 'Usability testing', '목표 과제를 주고 소리 내어 생각하게 하며 관찰해요. 5명이면 문제의 약 85%를 찾으므로, 5명씩 시험하고 고치기를 반복해요.', '사용성 테스트는 실제 사용자에게 과제를 주고 행동을 관찰하는 방법이에요. 참가자에게 “생각을 소리 내어 말해 주세요(think aloud)”라고 부탁하면, “음, 배송비가 어디 있지…”처럼 어디서 왜 막히는지 들을 수 있어요. 과제는 목표로 줘야 해요. “우산을 하나 사 보세요”는 과제지만, “장바구니 버튼을 누르세요”는 답을 알려주는 지시라서 아무것도 배울 수 없어요. 진행자는 참가자가 헤매도 도와주고 싶은 마음을 참고, “지금 무엇을 찾고 계세요?”처럼 중립적으로만 물어요. 닐슨과 랜다우어의 연구에 따르면 5명이 사용성 문제의 약 85%를 찾고, 그 이상은 대부분 같은 문제를 다시 보게 돼요. 그래서 15명을 한 번에 시험하기보다 5명씩 시험하고, 고치고, 다시 5명을 시험하는 반복이 더 많은 문제를 찾아요. 다만 초보자와 전문가처럼 사용 방식이 다른 그룹은 각각 따로 시험해요. 원격 테스트 도구를 쓰면 적은 비용으로 자주 할 수 있고, 녹화한 장면을 팀과 함께 보면 설득력이 커요.', 'Give goal-based tasks, ask people to think aloud and observe; five users find about 85% of problems, so test five, fix, and repeat.', 'Usability testing gives real users tasks and observes their behavior. Asking participants to think aloud reveals where and why they get stuck, as in “hmm, where is the shipping cost…” Tasks must state goals: “buy an umbrella” is a task, while “tap the cart button” is an instruction that gives away the answer and teaches nothing. Moderators resist the urge to help struggling participants and ask only neutral questions such as “what are you looking for right now?” Nielsen and Landauer’s research found that five users uncover about 85% of usability problems, and more participants mostly repeat the same ones. So testing five, fixing, then testing five more finds more problems than testing fifteen at once, though groups that use the product differently, such as novices and experts, need separate rounds. Remote testing tools make frequent, low-cost testing possible, and watching recordings together with the team is highly persuasive.', sUsability()),
    item('ux-metrics', 'UX 지표', 'UX metrics', 'HEART로 만족·참여·채택·유지·과제 성공을 나누고, 목표→신호→지표 순서로 고르며, SUS로 사용성 점수를 재요. 숫자는 “무엇”을, 관찰은 “왜”를 알려줘요.', 'Google이 제안한 HEART 프레임워크는 사용자 경험을 다섯 측면으로 나눠 재요. 만족(Happiness)은 설문 점수, 참여(Engagement)는 사용 빈도와 깊이, 채택(Adoption)은 새 기능을 쓰기 시작한 사람, 유지(Retention)는 다시 돌아오는 사람, 과제 성공(Task success)은 완료율, 소요 시간, 오류율이에요. 모든 측면을 다 잴 필요는 없고 제품 목표에 맞는 것을 골라요. 지표는 재기 쉬운 것부터 고르지 않고 목표 → 신호 → 지표 순서로 정해요. “빠른 결제”가 목표라면 신호는 결제 완료이고, 지표는 결제 완료율과 결제까지 걸린 시간이에요. 사용성을 숫자로 비교하고 싶을 때는 SUS(System Usability Scale)를 많이 써요. 10문항 설문을 100점 만점 점수로 바꾸는 방식으로, 여러 연구의 평균이 약 68점이라 그보다 높으면 평균 이상이에요. 누적 가입자처럼 늘 오르기만 하는 허영 지표는 조심해요. 숫자는 무엇이 일어나는지 알려주지만 왜인지는 말해주지 않으므로, 지표가 떨어지면 사용성 테스트나 인터뷰로 이유를 찾아요.', 'Split the experience into happiness, engagement, adoption, retention and task success with HEART, derive metrics via goals, signals and metrics, and score usability with SUS; numbers show what, observation shows why.', 'Google’s HEART framework measures experience across five facets: Happiness through survey scores, Engagement through frequency and depth of use, Adoption through people starting to use a feature, Retention through people coming back, and Task success through completion rate, time on task and error rate. You need not measure all five; pick those that fit the product’s goals. Metrics are chosen through goals, signals and then metrics rather than by what is easy to count: if the goal is “fast checkout,” the signal is completed checkouts and the metrics are checkout completion rate and time to complete. To compare usability in numbers, many teams use the System Usability Scale (SUS), which turns a ten-question survey into a score out of 100; studies average about 68, so higher is above average. Beware vanity metrics such as total sign-ups that only ever go up. Numbers show what is happening but not why, so when a metric drops, usability tests or interviews uncover the reason.', sMetrics()),
    item('ux-funnel', '퍼널 분석과 A/B 테스트', 'Funnel analysis and A/B testing', '목표까지의 길을 단계로 나눠 전환율이 가장 낮은 단계부터 고치고, 개선안은 A/B 테스트로 효과를 확인해요.', '퍼널 분석은 방문, 가입, 첫 사용, 결제처럼 사용자가 목표까지 가는 길을 단계로 나누고 단계마다 몇 명이 남는지 보는 방법이에요. 아래로 갈수록 좁아지는 모양이 깔때기(funnel)를 닮아서 붙은 이름이에요. 단계별 전환율은 이전 단계 대비 남은 비율로 계산해요. 방문 100명 중 40명이 가입하면 가입 전환율은 40%, 그중 10명이 첫 사용까지 가면 첫 사용 전환율은 25%예요. 전환율이 가장 낮은 단계가 가장 큰 개선 기회예요. 이 예시라면 가입한 사람 대부분이 첫 사용에 이르지 못하므로 온보딩부터 살펴봐요. 숫자는 어디서 빠지는지만 알려주므로, 왜 빠지는지는 사용성 테스트와 인터뷰로 찾아요. 개선안을 만들면 A/B 테스트로 기존안(A)과 새 안(B)에 사용자를 무작위로 나눠 보내고 결과를 비교해요. 표본이 충분한지, 차이가 우연이 아닌지(통계적 유의성)를 확인하고, 한 번에 한 가지만 바꿔야 무엇이 효과를 냈는지 알 수 있어요. 신규·기존 사용자, 기기별로 나눠 보면 평균에 가려진 문제가 보이기도 해요.', 'Split the path to a goal into steps, fix the step with the lowest conversion first, and confirm improvements with A/B tests.', 'Funnel analysis divides the path to a goal, such as visit, sign-up, first use and payment, into steps and counts how many people remain at each; the narrowing shape resembles a funnel. Each step’s conversion rate is the share remaining relative to the previous step: if 40 of 100 visitors sign up, sign-up conversion is 40%, and if 10 of those reach first use, that step converts at 25%. The step with the lowest conversion is the biggest opportunity; in this example most sign-ups never reach first use, so onboarding comes first. Numbers only show where people drop, so usability tests and interviews reveal why. Improvements are then tested with A/B tests that randomly split users between the current design (A) and the new one (B) and compare results, checking sample size and statistical significance and changing one thing at a time so the cause of any effect is clear. Segmenting by new versus returning users or by device can reveal problems hidden by averages.', sFunnel()),
    item('ux-card-sort', '카드 소팅과 트리 테스트', 'Card sorting and tree testing', '사용자가 직접 항목을 묶게 해 메뉴 구조를 만들고(카드 소팅), 디자인 없이 메뉴만으로 찾게 해 검증해요(트리 테스트).', '메뉴와 카테고리 같은 정보 구조는 만드는 사람의 생각대로 짜기 쉬워서, 회사 부서 이름이나 내부 용어가 그대로 메뉴가 되곤 해요. 카드 소팅은 메뉴에 들어갈 항목들을 카드로 만들어 사용자가 직접 비슷한 것끼리 묶게 하는 방법이에요. 열린 방식에서는 사용자가 그룹을 만들고 이름도 직접 붙여서, 사람들이 어떤 기준으로 묶고 어떤 말을 쓰는지 알 수 있어요. 닫힌 방식에서는 미리 정한 그룹에 카드를 넣게 해서, 계획한 구조가 사용자의 생각과 맞는지 확인해요. 결과는 어떤 카드들이 자주 함께 묶였는지 보여주는 유사도 행렬로 분석해요. 트리 테스트는 반대로 만든 구조를 검증해요. 디자인 없이 메뉴의 계층 구조만 보여주고 “쿠폰을 어디서 볼 수 있을까요?” 같은 과제를 줘서, 성공률과 헤매지 않고 바로 찾은 비율을 재요. 시각 디자인의 도움 없이 구조만 시험하므로 이름과 분류의 문제가 그대로 드러나요. 둘 다 온라인 도구로 수십 명에게 쉽게 할 수 있고, 화면을 만들기 전에 구조 문제를 싸게 찾아 줘요.', 'Let users group items to build menu structures (card sorting) and validate them by finding things in the bare menu (tree testing).', 'Information architecture such as menus and categories easily follows the makers’ thinking, turning department names and internal jargon into menus. Card sorting puts menu items on cards and asks users to group similar ones. In an open sort, users create and name the groups, revealing the criteria and words people use; in a closed sort, they place cards into predefined groups, checking whether a planned structure matches their thinking. Results are analyzed with a similarity matrix showing which cards were often grouped together. Tree testing works the other way, validating a structure: it shows only the menu hierarchy, without visual design, and gives tasks such as “where would you find your coupons?”, measuring success rate and directness (finding it without backtracking). Because it tests structure without the help of visual design, problems with names and categories show up clearly. Both run easily with dozens of participants using online tools and catch structural problems cheaply, before any screens are built.', sCardSort())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
