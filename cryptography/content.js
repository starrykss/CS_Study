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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'cyx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono cyx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono cyx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c cyx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono cyx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c cyx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'cyx-s cyx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono cyx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono cyx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono cyx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono cyx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono cyx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'cyx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'cyx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'cyx-xs cyx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono cyx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'cyx-a', g: 'cyx-g', r: 'cyx-r', w: 'cyx-w', m: 'cz-mono', s: 'cyx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'cyx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono cyx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono cyx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'cyx-xs ') + clsOf(c) + (o.w ? ' cyx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.cyx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.cyx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.cyx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.cyx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.cyx-r .in{color:var(--danger);font-weight:800}
.cyx-g .in{color:var(--ok);font-weight:800}
.cyx-a .in{color:var(--accent);font-weight:800}
.cyx-w .in{color:var(--warn);font-weight:800}
.cyx-c .in{font-size:.6em;font-weight:700}
.cyx-c2 .in{font-size:.5em;font-weight:700}
.cyx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.cyx-wr .in{white-space:normal!important}
.cyx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.cyx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Cryptography · 1. foundations, 2. number theory ===== */
const CSSY = '.cyx-big .in{font-size:1em;color:var(--ink);font-weight:700}';
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };
const row = (S, k, x, y, s, color, st, o = {}) => [...s].forEach((c, i) => chip(S, k + i, x + i * (o.dx || 1.05), y, o.w || .95, c, Array.isArray(color) ? color[i] : color, st, { h: o.h || .95, pct: o.pct ?? 18, off: o.off }));
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);

function sKerckhoffs() {
  return CW('cy-kerckhoffs', {
    draw: (S) => {
      nd(S, 'p', 1, 2.2, 6.2, 'attack at dawn', 'line', 1);
      arw(S, 'a1', [7.3, 2.75], [9.2, 2.75], 1);
      box(S, 'E', 9.3, 1.7, 6.4, 2.1, ['E = AES (공개)', 'E = AES (public)'], 'accent', 1);
      nd(S, 'key', 10.4, 5.0, 4.2, 'key K', 'warn', 1, { pct: 30 });
      arw(S, 'a2', [12.5, 4.95], [12.5, 3.9], 1, { color: 'warn' });
      arw(S, 'a3', [15.8, 2.75], [17.7, 2.75], 1);
      nd(S, 'c', 17.8, 2.2, 6.0, '9f3a…e1c0', 'line', 1);
      arw(S, 'a4', [23.9, 2.75], [25.5, 2.75], 1);
      box(S, 'D', 25.6, 1.7, 5.8, 2.1, ['D (공개)', 'D (public)'], 'ok', 1);
      nd(S, 'p2', 25.2, 4.6, 6.2, 'attack at dawn', 'ok', 1, { pct: 22 });
      arw(S, 'ev', [20.8, 3.4], [20.8, 6.3], 2, { color: 'danger', dash: 1 });
      lines(S, 'e', 17.8, 6.6, [[['공격자 이브가 아는 것', 'what the attacker Eve knows'], 'r'], [['알고리즘 AES ✓', 'the algorithm, AES ✓']], [['암호문 9f3a… ✓', 'the ciphertext ✓']], [['키 K ✗', 'the key K ✗'], 'r']], 2, 0);
      lbl(S, 'b0', 1, 7.4, ['키 공간: 2¹²⁸ ≈ 3.4 × 10³⁸개', 'key space: 2¹²⁸ ≈ 3.4 × 10³⁸ keys'], 's', 3);
      lbl(S, 'b1', 1, 8.6, ['초당 10¹²개씩 시도해도', 'at 10¹² guesses per second'], '', 3);
      lbl(S, 'b2', 1, 9.6, ['평균 약 5 × 10¹⁸년', 'about 5 × 10¹⁸ years on average'], 'g', 3);
      tbox(S, 'x', 1, 11.0, 14.6, 3.6, ['비밀 알고리즘', 'secret algorithm'], 'danger', 4, { tc: 'r' });
      lbl(S, 'x1', 1.3, 12.2, ['유출되면 모든 사용자가 한꺼번에 깨져요', 'one leak breaks every user at once'], '', 4, { w: 14 });
      lbl(S, 'x2', 1.3, 13.3, ['바꾸려면 시스템을 다시 만들어야 해요', 'changing it means rebuilding the system'], '', 4, { w: 14 });
      tbox(S, 'y', 16.8, 11.0, 14.6, 3.6, ['비밀 키', 'secret key'], 'ok', 4, { tc: 'g' });
      lbl(S, 'y1', 17.1, 12.2, ['새면 키만 바꾸면 돼요', 'if it leaks, just change the key'], '', 4, { w: 14 });
      lbl(S, 'y2', 17.1, 13.3, ['공개된 알고리즘은 많은 눈이 검증해요', 'a public algorithm gets checked by many eyes'], '', 4, { w: 14 });
    },
    notes: [['보내는 쪽은 평문을 공개된 알고리즘 E와 비밀 키 K로 암호화하고, 받는 쪽은 같은 키로 복호화해요', 'the sender encrypts with a public algorithm E and a secret key K, and the receiver decrypts with the same key'], ['커크호프스 원칙: 공격자가 알고리즘과 암호문을 다 알아도 키만 모르면 안전해야 해요', 'Kerckhoffs’s principle: the system must stay secure even when the attacker knows everything except the key'], ['그래서 안전성은 키 공간 크기로 따져요 · 128비트 키는 전부 시도하는 데 우주 나이보다 훨씬 오래 걸려요', 'so security is measured by key space: trying every 128-bit key takes far longer than the age of the universe'], ['알고리즘을 숨기는 방식은 한 번 새면 끝이고 고치기도 어려워요 · AES 같은 공개 표준이 신뢰받는 이유예요', 'hidden algorithms fail for good once leaked and are hard to replace, which is why public standards like AES earn trust']],
    fin: [['커크호프스 원칙: 비밀은 알고리즘이 아니라 키에만 둬요', 'Kerckhoffs’s principle: keep the secret in the key, never in the algorithm', 'cyx-xs cyx-a'], ['섀넌의 표현: “적은 시스템을 알고 있다”', 'Shannon’s version: “the enemy knows the system”'], ['숨기기는 보안의 한 겹일 뿐, 기반이 될 수 없어요', 'obscurity can add a layer but never be the foundation']],
    caps: [['공개 알고리즘 + 비밀 키', 'Public algorithm, secret key'], ['공격자가 아는 것', 'What the attacker knows'], ['키 공간', 'Key space'], ['알고리즘을 숨기면', 'Hiding the algorithm'], ['커크호프스 원칙', 'Kerckhoffs’s principle']]
  });
}

function sCaesar() {
  const fq = [['D', 8.2], ['H', 12.7], ['L', 7.0], ['Q', 6.7], ['R', 7.5], ['W', 9.1]];
  return CW('cy-caesar', {
    code: ['def enc(s, k):', "    return ''.join(", '        chr((ord(c) - 65 + k) % 26 + 65)', '        for c in s)', "enc('HELLO', 3)        # 'KHOOR'", ['# 키가 26개뿐 → 전부 해 보기', '# only 26 keys → try them all'], 'for k in range(26):', '    print(k, enc(ct, -k))'],
    hl: [[0, 4], [4, 1, 'ok'], [2, 1, 'warn'], [5, 3, 'danger']],
    draw: (S) => {
      const X = 18.7;
      row(S, 'r1', X, .8, 'ABCDEFGH', 'accent', 1, { dx: 1.55, w: 1.2, pct: 12 });
      row(S, 'r2', X, 2.2, 'DEFGHIJK', 'warn', 1, { dx: 1.55, w: 1.2, pct: 22 });
      lbl(S, 'n1', X, 3.5, ['모든 글자를 3칸씩 밀어요 (k = 3)', 'shift every letter 3 places (k = 3)'], 'a', 1);
      T(S, 'hk', X, 4.6, 'HELLO → KHOOR', 'cz-mono cyx-l', 2);
      lbl(S, 'ft', X, 6.3, ['암호문의 글자 빈도', 'letter frequency in the ciphertext'], '', 3, { off: 4 });
      fq.forEach(([c, f], i) => { const h = f * .33, x = X + .3 + i * 2.0; rect(S, 'fb' + i, x, 11.6 - h, 1.4, h, c === 'H' ? 'danger' : 'accent', 55, 3, { off: 4 }); T(S, 'fl' + i, x, 11.75, c, 'cz-mono cz-tc cyx-xs', 3, { w: 1.4, off: 4 }); });
      lbl(S, 'fn', X, 12.9, ['가장 많은 H = 영어에서 가장 흔한 E → k = 3', 'most common H = English’s most common E → k = 3'], 'r', 3, { off: 4, w: 12.7 });
      lines(S, 'bf', X, 6.3, [[['키 26개를 모두 시도', 'try all 26 keys'], 'a'], ['k = 1   JGNNQ', 'm'], ['k = 2   IFMMP', 'm'], ['k = 3   HELLO ✓', 'm g'], ['…', 'm']], 4, 0);
    },
    notes: [['시저 암호는 모든 글자를 같은 칸 수 k만큼 밀어요 · 알파벳이 26개라 키도 26가지뿐이에요', 'the Caesar cipher shifts every letter by the same k places, and with 26 letters there are only 26 keys'], ['HELLO를 3칸 밀면 KHOOR · 받는 쪽은 3칸 거꾸로 밀어 되돌려요', 'shifting HELLO by 3 gives KHOOR, and the receiver shifts back by 3'], ['같은 글자는 늘 같은 글자로 바뀌어서 빈도가 그대로 남아요 · 가장 많은 글자를 영어의 E에 맞추면 키가 보여요', 'the same letter always maps to the same letter, so frequencies survive; matching the most common letter to E reveals the key'], ['키가 26개뿐이라 전부 해 봐도 금방이에요 · 키 공간이 작으면 알고리즘과 상관없이 깨져요', 'with only 26 keys, trying them all is instant; a tiny key space breaks any scheme']],
    fin: [['시저 암호: 단일 치환은 빈도 분석과 전수 조사에 무너져요', 'Caesar: a single substitution falls to frequency analysis and brute force', 'cyx-xs cyx-a'], ['임의 치환표(26! ≈ 4 × 10²⁶가지)도 빈도 분석에는 약해요', 'even a random substitution table (26! ≈ 4 × 10²⁶ keys) falls to frequencies'], ['현대 암호는 통계적 흔적이 남지 않게 섞어요', 'modern ciphers mix until no statistical trace remains']],
    caps: [['한 칸씩 밀기', 'Shift the alphabet'], ['HELLO → KHOOR', 'HELLO → KHOOR'], ['빈도 분석', 'Frequency analysis'], ['전수 조사', 'Brute force'], ['시저 암호', 'Caesar cipher']]
  });
}

function sVigenere() {
  const X = 18.7, dx = 1.05;
  return CW('cy-vigenere', {
    code: ["key = 'KEY'", "pt  = 'ATTACKATDAWN'", 'ct = "".join(shift(p, key[i % 3])', '           for i, p in enumerate(pt))', "# → 'KXRKGIKXBKAL'", ['# KX가 반복 → 간격 6 → 키 길이 3?', '# KX repeats → gap 6 → key length 3?']],
    hl: [[0, 4], [4, 1, 'warn'], [2, 1, 'ok'], [5, 1, 'danger']],
    draw: (S) => {
      row(S, 'rk', X, .8, 'KEYKEYKEYKEY', 'warn', 1, { pct: 24 });
      row(S, 'rp', X, 2.1, 'ATTACKATDAWN', 'line', 1, { pct: 8 });
      row(S, 'rc', X, 3.4, 'KXRKGIKXBKAL', 'accent', 1, { pct: 22 });
      lbl(S, 'lg', X, 4.7, ['위: 키 · 가운데: 평문 · 아래: 암호문', 'top: key · middle: plaintext · bottom: ciphertext'], '', 1, { off: 2 });
      [0, 3, 6, 9].forEach((i, j) => frame(S, 'fa' + j, X + i * dx - .08, .7, 1.11, 3.8, 'danger', 2, { w: .08, off: 3 }));
      lbl(S, 'n2', X, 5.0, ['A가 키 K를 만나면 늘 K · 패턴이 되풀이돼요', 'A under key K always gives K, so patterns repeat'], 'r', 2, { off: 3, w: 12.7 });
      lines(S, 'col', X, 5.0, [[['키 길이 3으로 나누면 열마다 시저 암호', 'split by 3: each column is a Caesar cipher'], 'a'], [['1열 (K):  K K K K', 'col 1 (K):  K K K K'], 'm'], [['2열 (E):  X G X A', 'col 2 (E):  X G X A'], 'm'], [['3열 (Y):  R I B L', 'col 3 (Y):  R I B L'], 'm']], 3, 4, { w: 12.7 });
      [0, 6].forEach((i, j) => frame(S, 'fk' + j, X + i * dx - .08, 3.3, 2.16, 1.15, 'warn', 4, { w: .1 }));
      lines(S, 'ks', X, 5.0, [[['KX가 0번째와 6번째에 반복 → 간격 6', 'KX repeats at positions 0 and 6 → gap 6'], 'w'], [['키 길이는 6의 약수: 2, 3, 6', 'the key length divides 6: 2, 3 or 6']], [['3을 넣어 열마다 빈도 분석 → KEY', 'try 3 and analyze each column → KEY'], 'g']], 4, 0, { w: 12.7 });
    },
    notes: [['비즈네르 암호는 키 KEY를 반복해서 글자마다 다른 칸 수로 밀어요 · 같은 평문 글자도 위치에 따라 다르게 바뀌어요', 'Vigenère repeats the key KEY and shifts each letter by a different amount, so the same plaintext letter changes with its position'], ['하지만 키가 반복되니 A가 K를 만나는 자리마다 늘 K가 나와요 · 주기가 그대로 남아요', 'but the key repeats, so wherever A meets K the output is always K, and the period shows through'], ['키 길이만큼 건너뛰며 글자를 모으면 각 열은 그냥 시저 암호예요 · 열마다 빈도 분석을 하면 돼요', 'collecting every third letter turns each column into a plain Caesar cipher, open to frequency analysis'], ['반복되는 조각 사이의 거리(카시스키 검사)나 일치 지수로 키 길이를 찾아요', 'the distance between repeated fragments (the Kasiski test) or the index of coincidence reveals the key length']],
    fin: [['비즈네르: 반복되는 키는 주기를 남기고, 주기를 알면 시저 암호 여러 개로 쪼개져요', 'Vigenère: a repeating key leaves a period, and the period splits it into Caesar ciphers', 'cyx-xs cyx-a'], ['300년 가까이 “풀 수 없는 암호”로 불렸어요', 'it was called the indecipherable cipher for nearly 300 years'], ['키가 평문만큼 길고 무작위면 일회용 패드가 돼요', 'a random key as long as the message turns it into a one-time pad']],
    caps: [['반복 키로 밀기', 'Shift by a repeating key'], ['되풀이되는 패턴', 'Repeating patterns'], ['열로 나누기', 'Split into columns'], ['키 길이 찾기', 'Find the key length'], ['비즈네르 암호', 'Vigenère cipher']]
  });
}

function sOtp() {
  const X = 18.7, B = 19.9, dx = 1.35;
  const bitrow = (k, y, s, c, st, o = {}) => [...s].forEach((b, i) => chip(S0, k + i, B + i * dx, y, 1.15, b, b === '1' ? c : 'line', st, { h: .95, pct: b === '1' ? 30 : 8, off: o.off }));
  let S0;
  return CW('cy-otp', {
    code: ["m = 0b01101000            # 'h'", 'k = secrets.randbits(8)   # 10110011', 'c = m ^ k                 # 11011011', 'm == c ^ k                # True', ['# 같은 k를 두 번 쓰면', '# reuse k for a second message'], 'c1 ^ c2 == m1 ^ m2', ['# 키가 지워져요', '# the key cancels out']],
    hl: [[0, 3], [3, 1, 'ok'], [2, 1, 'warn'], [4, 3, 'danger']],
    draw: (S) => {
      S0 = S;
      F(S, 'lm', X, .95, 'm', 's', 1); bitrow('bm', .8, '01101000', 'accent', 1);
      F(S, 'lk', X, 2.25, '⊕ k', 's', 1); bitrow('bk', 2.1, '10110011', 'warn', 1);
      hl(S, 'sep', B, B + 7 * dx + 1.15, 3.35, 'ink-3', 1, { w: .08 });
      F(S, 'lc', X, 3.75, 'c', 's', 1); bitrow('bc', 3.6, '11011011', 'ok', 1);
      lbl(S, 'n1', X, 5.2, ['XOR: 두 비트가 같으면 0, 다르면 1', 'XOR: 0 if the bits match, 1 if they differ'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 5.2, ['c ⊕ k = m · 같은 키로 한 번 더 XOR하면 원래대로', 'c ⊕ k = m: XOR with the key again to undo it'], 'g', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 5.2, ['같은 c가 다른 평문에서도 나올 수 있어요', 'the same c could come from another plaintext'], 'a', 3, { off: 4, w: 12.7 });
      F(S, 'n3a', X, 6.3, "m′ = 01100001 ('a')", '', 3, { off: 4 });
      F(S, 'n3b', X, 7.3, 'k′ = c ⊕ m′ = 10111010', '', 3, { off: 4 });
      lbl(S, 'n3c', X, 8.4, ['키가 무작위면 c만 보고는 어느 쪽인지 알 수 없어요', 'with a random key, c alone can’t tell which one it was'], '', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 5.2, ['키를 다시 쓰면', 'reuse the key and'], 'r', 4);
      F(S, 'n4a', X, 6.3, 'c₁ ⊕ c₂ = (m₁ ⊕ k) ⊕ (m₂ ⊕ k) = m₁ ⊕ m₂', '', 4);
      lbl(S, 'n4b', X, 7.4, ['평문끼리의 XOR이 드러나요 · 한쪽을 추측하면 다른 쪽이 풀려요', 'the XOR of the plaintexts leaks, and guessing one reveals the other'], 'r', 4, { w: 12.7 });
    },
    notes: [['일회용 패드는 평문과 같은 길이의 무작위 키를 비트마다 XOR해요', 'a one-time pad XORs the message bit by bit with a random key of the same length'], ['받는 쪽은 같은 키로 한 번 더 XOR해서 평문을 되찾아요 · XOR은 두 번 하면 원래대로예요', 'the receiver XORs with the same key again, since XOR applied twice cancels out'], ['키가 진짜 무작위면 어떤 평문이든 그 암호문을 만들 수 있어요 · 섀넌이 증명한 완전 비밀성이에요', 'with a truly random key any plaintext could produce that ciphertext, which is Shannon’s perfect secrecy'], ['키를 두 번 쓰면 c₁ ⊕ c₂ = m₁ ⊕ m₂가 돼서 키가 사라져요 · 냉전 시기 소련 암호문이 이렇게 풀렸어요(베노나)', 'reusing the key gives c₁ ⊕ c₂ = m₁ ⊕ m₂, so the key vanishes; Soviet traffic was broken this way (Venona)']],
    fin: [['일회용 패드: 무작위·평문 길이·한 번만·비밀, 네 조건을 지키면 이론적으로 깨지지 않아요', 'one-time pad: random, message-length, used once, kept secret: provably unbreakable', 'cyx-xs cyx-a'], ['그만큼 긴 키를 미리 안전하게 나눠 갖기 어려워서 잘 안 써요', 'sharing that much key in advance is impractical'], ['스트림 암호는 짧은 키로 긴 키스트림을 만들어 흉내 내요', 'stream ciphers imitate it with a keystream grown from a short key']],
    caps: [['비트마다 XOR', 'XOR bit by bit'], ['다시 XOR하면 복호화', 'XOR again to decrypt'], ['완전 비밀성', 'Perfect secrecy'], ['키 재사용', 'Key reuse'], ['일회용 패드', 'One-time pad']]
  });
}

function sNotions() {
  return CW('cy-notions', {
    draw: (S) => {
      box(S, 'A', 1, 1.0, 9.0, 2.0, ['공격자 A', 'attacker A'], 'danger', 1);
      box(S, 'C', 22.4, 1.0, 9.0, 2.0, ['도전자 (암호 시스템)', 'challenger (the scheme)'], 'accent', 1);
      vl(S, 'la', 5.5, 3.0, 8.0, 'ink-3', 1, { dash: 1, w: .08 }); vl(S, 'lc', 26.9, 3.0, 8.0, 'ink-3', 1, { dash: 1, w: .08 });
      lbl(S, 'q1', 8.0, 3.5, ['평문 두 개: m₀ = "YES", m₁ = "NO"', 'two plaintexts: m₀ = "YES", m₁ = "NO"'], 's', 1);
      arw(S, 'a1', [5.6, 4.6], [26.8, 4.6], 1, { color: 'danger' });
      nd(S, 'coin', 21.2, 5.3, 5.0, 'b ← {0, 1}', 'warn', 2, { pct: 30 });
      F(S, 'q2', 8.0, 6.3, 'c = Enc(m_b)', 's', 2);
      arw(S, 'a2', [26.8, 7.4], [5.6, 7.4], 2, { color: 'accent' });
      nd(S, 'g', 1.4, 8.6, 5.4, 'b′ = ?', 'danger', 3, { pct: 24 });
      lbl(S, 'g1', 8.0, 8.7, ['b′ = b일 확률이 ½보다 눈에 띄게 높으면 공격 성공', 'the attack wins if b′ = b noticeably more than half the time'], '', 3, { w: 14 });
      F(S, 'g2', 8.0, 10.1, 'Adv = |Pr[b′ = b] − ½| ≈ 0', 'g', 3);
      lbl(S, 'd0', 1, 11.6, ['같은 평문이 늘 같은 암호문이 된다면?', 'what if equal plaintexts always give equal ciphertexts?'], 'r', 4);
      lbl(S, 'd1', 1, 12.6, ['A가 Enc("YES")를 직접 요청해 c와 비교 → 늘 맞혀요 ✗', 'A requests Enc("YES") itself and compares with c → always right ✗'], '', 4, { w: 30 });
      lbl(S, 'd2', 1, 13.7, ['그래서 암호화는 매번 무작위(nonce·IV)여야 해요 · CCA는 복호화 질의까지 허용해요', 'so encryption must be randomized (nonce, IV); CCA also allows decryption queries'], 'g', 4, { w: 30 });
    },
    notes: [['안전성을 게임으로 정의해요 · 공격자가 길이가 같은 평문 두 개를 골라 보내요', 'security is defined as a game: the attacker picks two equal-length plaintexts and sends them'], ['도전자는 몰래 동전을 던져 둘 중 하나만 암호화해서 돌려줘요', 'the challenger secretly flips a coin and returns the encryption of just one'], ['공격자가 맞힐 확률이 ½보다 무시할 만큼만 높으면 IND-CPA 안전이에요 · 그동안 원하는 평문을 마음껏 암호화해 볼 수 있어요', 'if the guess beats ½ by only a negligible amount, the scheme is IND-CPA secure, even though the attacker may encrypt any plaintexts along the way'], ['같은 평문이 늘 같은 암호문이 되면 바로 깨져요 · 그래서 암호화할 때마다 새 nonce나 IV를 섞어요', 'deterministic encryption loses at once, which is why every encryption mixes in a fresh nonce or IV']],
    fin: [['IND-CPA: 암호문은 어느 평문을 숨겼는지 한 비트도 새지 않아야 해요', 'IND-CPA: a ciphertext must not leak even one bit about which plaintext it hides', 'cyx-xs cyx-a'], ['IND-CCA는 복호화 질의까지 허용하는 더 강한 기준 · AEAD가 목표로 해요', 'IND-CCA also allows decryption queries, the bar AEAD aims for'], ['“안전하다”는 늘 어떤 공격 모델에서인지 함께 말해요', '“secure” always comes with an attack model']],
    caps: [['평문 두 개 제출', 'Submit two plaintexts'], ['하나만 암호화', 'Encrypt just one'], ['어느 쪽일까', 'Guess which'], ['결정적 암호의 실패', 'Deterministic encryption fails'], ['안전성의 정의', 'Defining security']]
  });
}

function sModular() {
  const X = 18.7, cx = 24.6, cy = 5.0, r = 3.4, B = 19.9, dx = 1.65;
  return CW('cy-modular', {
    code: [['(9 + 5) % 12     # 2   시계', '(9 + 5) % 12     # 2   a clock'], ['(3 * 5) % 7      # 1   역원 확인', '(3 * 5) % 7      # 1   inverse check'], 'pow(3, -1, 7)    # 5', '(-3) % 7         # 4', '[2 * k % 8 for k in range(1, 8)]', ['# 1이 없음 → 2는 역원 없음', '# no 1 → 2 has no inverse']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 2, 'danger']],
    draw: (S) => {
      ring(S, 'rg', cx, cy, r, 'ink-3', 1, { off: 2, w: .1 });
      for (let h = 0; h < 12; h++) { const a = h * Math.PI / 6, x = cx + (r - .85) * Math.sin(a), y = cy - (r - .85) * Math.cos(a); T(S, 'h' + h, x - .5, y - .4, String(h), 'cz-math cz-tc cyx-xs', 1, { w: 1, off: 2 }); }
      [[9, 'cur'], [2, 'okf']].forEach(([h, s], i) => { const a = h * Math.PI / 6; pt(S, 'hp' + i, cx + r * Math.sin(a), cy - r * Math.cos(a), 1, C[s], .32, { off: 2 }); });
      lbl(S, 'n1', X, 9.2, ['9시 + 5시간 = 2시', '9 o’clock + 5 hours = 2 o’clock'], '', 1, { off: 2 });
      F(S, 'n1b', X, 10.2, '9 + 5 = 14 ≡ 2 (mod 12)', 'a', 1, { off: 2 });
      F(S, 'rk', X, 1.25, 'k', 's', 2); row(S, 'mk', B, 1.0, '123456', 'line', 2, { dx, w: 1.4, pct: 8 });
      F(S, 'r3', X, 2.55, '3k', 's', 2); row(S, 'mt', B, 2.3, '362514', ['line', 'line', 'line', 'line', 'ok', 'line'], 2, { dx, w: 1.4, pct: 14 });
      F(S, 'iv', X, 3.8, '3 × 5 = 15 ≡ 1 → 3⁻¹ = 5 (mod 7)', 'g', 2);
      F(S, 'ng', X, 5.4, '−3 ≡ −3 + 7 = 4 (mod 7)', 'w', 3);
      lbl(S, 'ng2', X, 6.4, ['음수도 7을 더해 0..6 안으로 옮겨요', 'add 7 to bring negatives into 0..6'], '', 3);
      F(S, 'r2', X, 8.0, '2k', 's', 4); row(S, 'mz', B, 7.75, '2460246', 'danger', 4, { dx, w: 1.4, pct: 16 });
      lbl(S, 'zz1', X, 9.2, ['1이 한 번도 안 나와요 → 2는 mod 8에서 역원이 없어요', '1 never appears → 2 has no inverse mod 8'], 'r', 4, { w: 12.7 });
      F(S, 'zz2', X, 10.4, 'gcd(2, 8) = 2 ≠ 1', 'r', 4);
    },
    notes: [['모듈러 연산은 n으로 나눈 나머지만 보는 계산이에요 · 12 다음이 다시 0인 시계와 같아요', 'modular arithmetic keeps only the remainder after dividing by n, like a clock that wraps from 12 back to 0'], ['곱해서 1이 되는 수가 역원이에요 · mod 7에서 3 × 5 = 15 ≡ 1이라 3⁻¹ = 5', 'an inverse multiplies to 1: mod 7, 3 × 5 = 15 ≡ 1, so 3⁻¹ = 5'], ['음수도 n을 더해 0부터 n − 1 사이로 옮겨요 · 덧셈, 뺄셈, 곱셈이 모두 이 안에서 닫혀 있어요', 'negatives move into 0 to n − 1 by adding n, and addition, subtraction and multiplication all stay inside'], ['gcd(a, n) ≠ 1이면 역원이 없어요 · 그래서 RSA는 e를 φ(n)과 서로소가 되게 골라요', 'when gcd(a, n) ≠ 1 there is no inverse, which is why RSA picks e coprime to φ(n)']],
    fin: [['모듈러 연산: 큰 수를 작은 고리 안에서 다루는 암호의 기본 산수', 'modular arithmetic: the everyday math of crypto, keeping huge numbers inside a small ring', 'cyx-xs cyx-a'], ['p가 소수면 0이 아닌 모든 수에 역원이 있어요 (유한체)', 'when p is prime every nonzero number has an inverse (a finite field)'], ['나눗셈은 역원을 곱하는 것으로 대신해요', 'division becomes multiplying by an inverse']],
    caps: [['시계 계산', 'Clock arithmetic'], ['곱셈 역원', 'Multiplicative inverse'], ['음수 나머지', 'Negative remainders'], ['역원이 없을 때', 'When no inverse exists'], ['모듈러 연산', 'Modular arithmetic']]
  });
}

function sEuclid() {
  const X = 18.7;
  return CW('cy-euclid', {
    code: ['def egcd(a, b):', '    if b == 0: return a, 1, 0', '    g, x, y = egcd(b, a % b)', '    return g, y, x - (a // b) * y', 'egcd(17, 3120)    # (1, -367, 2)', '-367 % 3120       # 2753'],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'warn'], [4, 2, 'ok']],
    draw: (S) => {
      lbl(S, 't1', X, .8, ['나눗셈을 되풀이해요', 'divide again and again'], 'a', 1);
      F(S, 'd1', X, 1.9, '3120 = 183 · 17 + 9', '', 1); F(S, 'd2', X, 2.9, '17 = 1 · 9 + 8', '', 1);
      F(S, 'd3', X, 3.9, '9 = 1 · 8 + 1', '', 2); F(S, 'd4', X, 4.9, '8 = 8 · 1 + 0', '', 2);
      lbl(S, 't2', X, 6.0, ['0 직전의 나머지 1이 gcd → 서로소', 'the last nonzero remainder 1 is the gcd → coprime'], 'g', 2, { w: 12.7 });
      lbl(S, 't3', X, 7.4, ['거꾸로 대입해요', 'substitute back'], 'a', 3);
      F(S, 'b1', X, 8.4, '1 = 9 − 8', '', 3); F(S, 'b2', X, 9.4, '= 9 − (17 − 9) = 2 · 9 − 17', '', 3); F(S, 'b3', X, 10.4, '= 2 · 3120 − 367 · 17', 'w', 3);
      F(S, 'r1', X, 11.7, '17 · (−367) ≡ 1 (mod 3120)', '', 4);
      F(S, 'r2', X, 12.7, '−367 + 3120 = 2753 = 17⁻¹', 'g', 4);
      F(S, 'r3', X, 13.7, '17 · 2753 = 46801 = 15 · 3120 + 1 ✓', '', 4);
    },
    notes: [['유클리드 호제법은 큰 수를 작은 수로 나눈 나머지로 바꿔 가며 최대공약수를 찾아요', 'Euclid’s algorithm finds the gcd by repeatedly replacing the larger number with a remainder'], ['3120과 17은 마지막 나머지가 1이라 서로소예요 · 그러면 17의 역원이 반드시 있어요', 'the last nonzero remainder of 3120 and 17 is 1, so they are coprime and 17 must have an inverse'], ['나눗셈 식을 거꾸로 대입하면 1 = 2 · 3120 − 367 · 17처럼 두 수의 조합으로 1을 쓸 수 있어요 (베주 항등식)', 'substituting back writes 1 = 2 · 3120 − 367 · 17 as a combination of the two numbers (Bézout’s identity)'], ['mod 3120으로 보면 17 · (−367) ≡ 1이라 역원은 −367 + 3120 = 2753 · RSA의 개인 지수 d가 이렇게 나와요', 'mod 3120 that reads 17 · (−367) ≡ 1, so the inverse is 2753, exactly how RSA computes its private exponent d']],
    fin: [['확장 유클리드: 나눗셈 몇 번으로 모듈러 역원을 구해요 (자릿수에 비례)', 'extended Euclid: a modular inverse in a few divisions, linear in the digit count', 'cyx-xs cyx-a'], ['Python에서는 pow(17, -1, 3120)으로 바로 구해요', 'in Python, pow(17, -1, 3120) does it directly'], ['RSA 키 생성과 타원곡선 연산에서 계속 쓰여요', 'used throughout RSA key generation and elliptic curve math']],
    caps: [['나눗셈 되풀이', 'Divide repeatedly'], ['gcd = 1', 'gcd = 1'], ['거꾸로 대입', 'Substitute back'], ['역원 2753', 'The inverse, 2753'], ['확장 유클리드 호제법', 'Extended Euclidean algorithm']]
  });
}

function sFermat() {
  const X = 18.7, cx = 24.8, cy = 4.4, r = 3.0, B = 19.0, dx = 1.75;
  const pw = ['3¹ ≡ 3', '3² ≡ 2', '3³ ≡ 6', '3⁴ ≡ 4', '3⁵ ≡ 5', '3⁶ ≡ 1'];
  return CW('cy-fermat', {
    code: [['pow(3, 6, 7)      # 1  페르마', 'pow(3, 6, 7)      # 1  Fermat'], ['pow(2, 8, 15)     # 1  오일러 φ(15)=8', 'pow(2, 8, 15)     # 1  Euler φ(15)=8'], ['# 소수 판정: 1이 아니면 합성수', '# primality: not 1 → composite'], 'pow(2, 560, 561)  # 1', ['# 561 = 3·11·17 → 속는 수(카마이클)', '# 561 = 3·11·17 fools it (Carmichael)']],
    hl: [[0, 1], [1, 1, 'ok'], [1, 1, 'warn'], [2, 3, 'danger']],
    draw: (S) => {
      pw.forEach((t, i) => { const a = (i + 1) * Math.PI / 3, x = cx + r * Math.sin(a) - 1.4, y = cy - r * Math.cos(a) - .45; rect(S, 'pw' + i, x, y, 2.8, .9, i === 5 ? 'ok' : 'accent', i === 5 ? 30 : 12, 1, { cls: 'cz-c cyx-c cz-math', html: t, off: 2 }); });
      lbl(S, 'n1', X, 8.4, ['3을 곱하다 보면 6번째에 1로 돌아와요', 'multiplying by 3 returns to 1 on the sixth step'], '', 1, { off: 2, w: 12.7 });
      F(S, 'n1b', X, 9.5, 'aᵖ⁻¹ ≡ 1 (mod p)', 'a', 1, { off: 2 });
      for (let i = 1; i <= 14; i++) { const ok = [1, 2, 4, 7, 8, 11, 13, 14].includes(i); rect(S, 'u' + i, B + ((i - 1) % 7) * dx, i <= 7 ? 1.0 : 2.3, 1.5, .95, ok ? 'ok' : 'line', ok ? 30 : 6, 2, { cls: 'cz-c cyx-c cz-math', html: String(i) }); }
      F(S, 'e1', X, 3.8, 'φ(15) = (3 − 1)(5 − 1) = 8', 'g', 2);
      F(S, 'e2', X, 4.8, 'gcd(a, n) = 1 → aᵠ⁽ⁿ⁾ ≡ 1 (mod n)', '', 2);
      F(S, 'r1', X, 6.3, 'ed ≡ 1 (mod φ(n))', 'a', 3);
      F(S, 'r2', X, 7.3, 'mᵉᵈ = m¹⁺ᵏᵠ⁽ⁿ⁾ = m · (mᵠ⁽ⁿ⁾)ᵏ ≡ m', 'a', 3);
      lbl(S, 'r3', X, 8.4, ['그래서 RSA 복호화가 원래 m으로 돌아와요', 'which is why RSA decryption returns m'], 'g', 3);
      lbl(S, 't1', X, 9.8, ['페르마 테스트: 2ⁿ⁻¹ mod n ≠ 1이면 합성수', 'Fermat test: 2ⁿ⁻¹ mod n ≠ 1 → composite'], '', 4, { w: 12.7 });
      F(S, 't2', X, 10.9, '2⁵⁶⁰ ≡ 1 (mod 561), 561 = 3 · 11 · 17', 'r', 4);
      lbl(S, 't3', X, 12.0, ['속이는 합성수가 있어서 실제로는 밀러-라빈을 여러 번 돌려요', 'some composites fool it, so real code runs Miller–Rabin many times'], '', 4, { w: 12.7 });
    },
    notes: [['p가 소수면 p로 나뉘지 않는 a는 p − 1번 곱하면 1로 돌아와요 · 페르마의 소정리예요', 'for a prime p, any a not divisible by p returns to 1 after p − 1 multiplications: Fermat’s little theorem'], ['오일러는 이걸 아무 n으로 넓혔어요 · n과 서로소인 수의 개수 φ(n)번 곱하면 1이에요', 'Euler extended it to any n: multiply φ(n) times, the count of numbers coprime to n, and you get 1'], ['RSA는 ed ≡ 1 (mod φ(n))이 되게 키를 골라서 mᵉᵈ ≡ m이 돼요 · 암호화한 걸 복호화하면 원래대로예요', 'RSA picks keys with ed ≡ 1 (mod φ(n)), so mᵉᵈ ≡ m and decryption undoes encryption'], ['거꾸로 aⁿ⁻¹ ≢ 1이면 n은 합성수예요 · 다만 561 같은 카마이클 수가 속여서 밀러-라빈 판정을 써요', 'conversely, aⁿ⁻¹ ≢ 1 proves n composite, but Carmichael numbers like 561 fool the test, so Miller–Rabin is used']],
    fin: [['페르마·오일러 정리: 거듭제곱이 주기적으로 1로 돌아온다는 사실이 RSA를 떠받쳐요', 'Fermat and Euler: powers cycle back to 1, and RSA rests on that fact', 'cyx-xs cyx-a'], ['RSA 키 생성은 큰 소수를 밀러-라빈으로 찾아요', 'RSA key generation finds big primes with Miller–Rabin'], ['φ(n)을 알려면 n을 소인수분해해야 해요', 'computing φ(n) requires factoring n']],
    caps: [['페르마의 소정리', 'Fermat’s little theorem'], ['오일러 φ', 'Euler’s φ'], ['RSA가 맞는 이유', 'Why RSA works'], ['소수 판정', 'Primality testing'], ['페르마·오일러 정리', 'Fermat and Euler']]
  });
}

function sModexp() {
  const X = 18.7;
  const sq = [['65¹ = 65', 1], ['65² ≡ 992', 0], ['65⁴ ≡ 1232', 0], ['65⁸ ≡ 1547', 0], ['65¹⁶ ≡ 789', 1]];
  return CW('cy-modexp', {
    code: ['def power(b, e, n):', '    r = 1', '    while e:', '        if e & 1: r = r * b % n', '        b = b * b % n', '        e >>= 1', '    return r', 'power(65, 17, 3233)   # 2790'],
    hl: [[0, 7], [4, 1, 'warn'], [3, 1, 'ok'], [7, 1, 'ok']],
    draw: (S) => {
      lbl(S, 'b0', X, .8, ['17 = 10001₂ · 비트 5개', '17 = 10001₂ · five bits'], 'a', 1);
      [...'10001'].forEach((b, i) => chip(S, 'bit' + i, X + i * 1.3, 1.8, 1.1, b, b === '1' ? 'accent' : 'line', 1, { h: .95, pct: b === '1' ? 30 : 8 }));
      lbl(S, 'b1', X + 7, 2.0, ['지수를 2진수로', 'exponent in binary'], '', 1, { off: 2 });
      sq.forEach(([t], i) => F(S, 'sq' + i, X, 3.3 + i * 1.0, t, '', 2));
      lbl(S, 's1', X + 6.2, 3.3, ['제곱만 4번', 'just 4 squarings'], 'w', 2, { off: 3 });
      lbl(S, 's2', X + 6.2, 4.3, '(mod 3233)', '', 2, { off: 3 });
      sq.forEach(([, on], i) => { if (on) frame(S, 'fr' + i, X - .2, 3.2 + i * 1.0, 4.6, .95, 'warn', 3, { w: .08, r: .2 }); });
      F(S, 'm1', X, 8.5, '65¹⁷ = 65¹⁶ · 65¹ ≡ 789 · 65 ≡ 2790', 'g', 3);
      lbl(S, 'm2', X, 9.5, ['비트가 1인 자리만 곱해요', 'multiply only where the bit is 1'], '', 3);
      lbl(S, 'c1', X, 10.9, ['2048비트 지수: 곱셈 약 3000번', '2048-bit exponent: about 3,000 multiplications'], 'g', 4, { w: 12.7 });
      lbl(S, 'c2', X, 11.9, ['그냥 곱하면 2²⁰⁴⁸번 → 끝나지 않아요', 'naively 2²⁰⁴⁸ multiplications → never finishes'], 'r', 4, { w: 12.7 });
      lbl(S, 'c3', X, 13.0, ['비트마다 시간이 다르면 키가 새요 → 상수 시간 구현', 'bit-dependent timing leaks the key → constant-time code'], '', 4, { w: 12.7 });
    },
    notes: [['65¹⁷ mod 3233을 그대로 계산하면 65를 16번 곱해야 해요 · 지수 17을 2진수 10001로 보면 훨씬 줄어요', 'computing 65¹⁷ mod 3233 directly takes 16 multiplications, but reading 17 as binary 10001 cuts that down'], ['65를 거듭 제곱해 65², 65⁴, 65⁸, 65¹⁶을 만들어요 · 매번 mod를 해서 수가 커지지 않아요', 'square repeatedly to get 65², 65⁴, 65⁸ and 65¹⁶, reducing mod n each time so numbers stay small'], ['비트가 1인 자리의 값만 곱하면 65¹⁶ · 65¹ = 65¹⁷ ≡ 2790이에요', 'multiplying the values where the bit is 1 gives 65¹⁶ · 65¹ = 65¹⁷ ≡ 2790'], ['곱셈 횟수가 지수의 비트 수에 비례해서 2048비트 RSA도 순식간이에요 · 비트마다 시간이 달라지면 타이밍 공격을 받아서 몽고메리 래더 같은 상수 시간 방식을 써요', 'the work grows with the bit length, so 2048-bit RSA is instant; bit-dependent timing invites timing attacks, so constant-time ladders are used']],
    fin: [['빠른 거듭제곱: 제곱과 곱셈으로 지수의 비트 수만큼만 계산해요', 'square-and-multiply: work proportional to the exponent’s bit length', 'cyx-xs cyx-a'], ['RSA, 디피-헬먼, 소수 판정이 모두 이걸로 돌아가요', 'RSA, Diffie–Hellman and primality tests all run on it'], ['Python의 pow(b, e, n)이 바로 이 알고리즘이에요', 'Python’s pow(b, e, n) is this algorithm']],
    caps: [['지수를 2진수로', 'Exponent in binary'], ['제곱 4번', 'Four squarings'], ['1인 비트만 곱하기', 'Multiply the 1 bits'], ['비트 수에 비례', 'Linear in the bit length'], ['빠른 거듭제곱', 'Square-and-multiply']]
  });
}

function sDlog() {
  const X = 18.7, x0 = 19.5, dx = .52, yb = 9.6, sy = .38;
  const v = [5, 2, 10, 4, 20, 8, 17, 16, 11, 9, 22, 18, 21, 13, 19, 3, 15, 6, 7, 12, 14, 1];
  const P = (x, y) => [x0 + (x - 1) * dx, yb - y * sy];
  return CW('cy-dlog', {
    code: ['p, g = 23, 5', ['pow(g, 6, p)        # 8   쉬워요', 'pow(g, 6, p)        # 8   easy'], ['# 반대로 5^x ≡ 8인 x는?', '# reverse: which x has 5^x ≡ 8?'], 'next(x for x in range(1, p)', '     if pow(g, x, p) == 8)   # 6', ['# p가 2048비트면 사실상 불가능', '# with a 2048-bit p: infeasible']],
    hl: [[0, 2], [1, 1, 'ok'], [2, 3, 'warn'], [5, 1, 'danger']],
    draw: (S) => {
      vl(S, 'ay', x0 - .4, .6, yb + .1, 'ink-3', 0, { w: .08 }); hl(S, 'ax', x0 - .4, 31.2, yb + .1, 'ink-3', 0, { w: .08 });
      F(S, 'ly', x0, .1, 'gˣ mod p', '', 0); F(S, 'lx', 30.5, yb + .3, 'x', '', 0);
      v.forEach((y, i) => { const [px, py] = P(i + 1, y); pt(S, 'p' + i, px, py, 2, i === 5 ? C.warn : C.cur, .2); });
      const [hx, hy] = P(6, 8); pt(S, 'h6', hx, hy, 1, C.okf, .3, { off: 2 });
      hl(S, 'h8', x0 - .4, 31.2, hy, 'warn', 3, { w: .08, dash: 1 });
      lbl(S, 'n1', X, 10.6, ['앞으로: 5⁶ mod 23 = 8 · 금방 계산', 'forward: 5⁶ mod 23 = 8, computed instantly'], 'g', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 10.6, ['x를 늘려도 값이 무작위처럼 튀어요 · 1부터 22까지 한 번씩', 'values jump around, hitting each of 1–22 once'], '', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 10.6, ['거꾸로: gˣ ≡ 8인 x는 하나씩 해 봐야 찾아요', 'backward: finding x with gˣ ≡ 8 means trying values'], 'w', 3, { off: 4, w: 12.7 });
      F(S, 'n3b', X, 12.1, 'x = log₅ 8 = 6 (mod 22)', '', 3, { off: 4 });
      lbl(S, 'n4', X, 10.6, ['2048비트 p나 256비트 타원곡선에서는 최선의 방법도 천문학적이에요', 'with a 2048-bit p or a 256-bit curve even the best methods are astronomical'], 'r', 4, { w: 12.7 });
      lbl(S, 'n4b', X, 12.0, ['디피-헬먼, DSA, 타원곡선 암호가 기대는 어려움 · 쇼어 알고리즘은 쉽게 풀어요', 'Diffie–Hellman, DSA and elliptic curves rely on it; Shor’s algorithm solves it'], '', 4, { w: 12.7 });
    },
    notes: [['g = 5를 x번 곱한 gˣ mod p는 빠른 거듭제곱으로 금방 계산돼요', 'gˣ mod p, g = 5 multiplied x times, is quick with square-and-multiply'], ['x를 1씩 늘려도 결과는 규칙 없이 튀어요 · 5는 1부터 22까지를 모두 한 번씩 거치는 생성원이에요', 'stepping x by 1 makes the result jump with no visible pattern; 5 is a generator that visits every value from 1 to 22'], ['반대로 gˣ ≡ 8에서 x를 찾는 게 이산 로그 문제예요 · 아기걸음 거인걸음 같은 방법도 √p 정도 걸려요', 'recovering x from gˣ ≡ 8 is the discrete log problem; even baby-step giant-step needs about √p work'], ['p가 2048비트면 고전 컴퓨터로는 사실상 불가능해요 · 이 한쪽 방향 성질 위에 키 교환과 서명이 서 있어요', 'with a 2048-bit p it is infeasible on classical computers, and key exchange and signatures stand on this one-way property']],
    fin: [['이산 로그: 계산은 쉽고 거꾸로는 어려운 한쪽 방향 함수', 'discrete log: easy to compute, hard to reverse, a one-way function', 'cyx-xs cyx-a'], ['타원곡선 버전(ECDLP)은 같은 안전성을 훨씬 짧은 키로 줘요', 'the elliptic curve version (ECDLP) gives the same security with far shorter keys'], ['쇼어 알고리즘 때문에 양자내성 암호로 옮겨 가고 있어요', 'Shor’s algorithm is driving the move to post-quantum crypto']],
    caps: [['앞으로는 쉬워요', 'Forward is easy'], ['무작위처럼 흩어짐', 'Scattered like random'], ['거꾸로 찾기', 'Searching backward'], ['안전성의 근거', 'The basis of security'], ['이산 로그 문제', 'The discrete log problem']]
  });
}
/* ===== Cryptography · 3. symmetric ciphers ===== */
function sFeistel() {
  const X = 18.7;
  return CW('cy-feistel', {
    code: ['def feistel(L, R, keys, F):', '    for k in keys:', '        L, R = R, L ^ F(R, k)', ['    return R, L        # 마지막에 교환', '    return R, L        # final swap'], ['# 복호화: 같은 함수, 키 순서만 거꾸로', '# decrypt: same code, keys reversed'], 'feistel(*ct, keys[::-1], F)'],
    hl: [[2, 1], [1, 2, 'warn'], [4, 2, 'ok'], [0, 6]],
    draw: (S) => {
      nd(S, 'L0', 19.2, .7, 4.6, 'L₀', 'accent', 1, { pct: 22 }); nd(S, 'R0', 26.3, .7, 4.6, 'R₀', 'warn', 1, { pct: 24 });
      box(S, 'F', 23.7, 2.45, 2.3, 1.1, 'F', 'warn', 1);
      F(S, 'kk', 24.6, 1.8, 'k₁', '', 1);
      elb(S, 'rf', [[28.6, 1.85], [28.6, 3.0], [26.1, 3.0]], 'ink-2', 1, { h: .1 });
      ring(S, 'xr', 21.5, 3.0, .42, 'ink-2', 1, { w: .1 }); T(S, 'xo', 21.0, 2.55, '⊕', 'cz-tc cyx-s', 1, { w: 1 });
      arw(S, 'fx', [23.6, 3.0], [22.0, 3.0], 1); arw(S, 'lx', [21.5, 1.85], [21.5, 2.55], 1);
      arw(S, 'c1', [21.6, 3.45], [28.3, 5.4], 1); arw(S, 'c2', [28.5, 3.1], [21.8, 5.4], 1);
      nd(S, 'L1', 19.2, 5.5, 4.6, 'L₁', 'warn', 1, { pct: 24 }); nd(S, 'R1', 26.3, 5.5, 4.6, 'R₁', 'accent', 1, { pct: 22 });
      F(S, 'f1', X, 7.0, 'L₁ = R₀,   R₁ = L₀ ⊕ F(R₀, k₁)', 'a', 1);
      lbl(S, 'n2', X, 8.3, ['라운드 키만 바꿔 같은 라운드를 반복', 'repeat the round with a new key'], 'w', 2, { w: 12.7 });
      lbl(S, 'n2b', X, 9.3, ['DES: 64비트 블록 · 16라운드', 'DES: 64-bit blocks · 16 rounds'], '', 2);
      F(S, 'f3', X, 10.6, 'R₀ = L₁,   L₀ = R₁ ⊕ F(L₁, k₁)', 'g', 3);
      lbl(S, 'n3', X, 11.6, ['F는 역함수가 없어도 돼요 · 같은 F를 한 번 더 XOR', 'F needs no inverse: XOR the same F again'], '', 3, { w: 12.7 });
      lbl(S, 'n4', X, 13.0, ['DES의 56비트 키는 1998년 56시간 만에 전수 조사됐어요', 'DES’s 56-bit key fell to brute force in 56 hours in 1998'], 'r', 4, { w: 12.7 });
      lbl(S, 'n4b', 1, 9.0, ['3DES를 거쳐 AES로 교체 · 페이스텔은 Blowfish, Camellia에 남아 있어요', '3DES gave way to AES; Feistel lives on in Blowfish and Camellia'], '', 4, { w: 16.5 });
    },
    notes: [['블록을 왼쪽 L과 오른쪽 R로 나눠요 · 오른쪽을 라운드 함수 F에 넣은 값을 왼쪽에 XOR하고, 두 쪽을 바꿔요', 'split the block into halves L and R; run R and the round key through F, XOR the result into L, then swap the halves'], ['라운드 키만 바꿔 같은 라운드를 여러 번 반복해요 · DES는 16라운드예요', 'repeat the same round with a fresh round key each time; DES runs 16 rounds'], ['복호화는 같은 구조에 키 순서만 거꾸로 넣으면 돼요 · F 자체는 역함수가 없어도 돼서 설계가 자유로워요', 'decryption is the same structure with the keys reversed, and F itself never needs an inverse, which frees the design'], ['DES는 키가 56비트라 1998년 전용 장비가 56시간 만에 찾아냈어요 · 지금 표준은 AES예요', 'DES’s 56-bit key was found by a dedicated machine in 56 hours in 1998, and AES is the standard now']],
    fin: [['페이스텔 구조: 반쪽만 섞고 교환하는 라운드로, 역함수 없는 F로도 되돌릴 수 있는 암호를 만들어요', 'Feistel: mix one half, swap, repeat, and the cipher inverts even when F does not', 'cyx-xs cyx-a'], ['라운드가 적으면 차분·선형 분석에 약해져요', 'too few rounds invite differential and linear cryptanalysis'], ['3DES는 2023년 이후 암호화 용도로 쓸 수 없게 됐어요 (NIST)', 'NIST disallowed 3DES for encryption after 2023']],
    caps: [['한 라운드', 'One round'], ['라운드 반복', 'Repeating rounds'], ['거꾸로 돌리기', 'Running it backward'], ['DES의 최후', 'The end of DES'], ['페이스텔 구조', 'Feistel network']]
  });
}

function sAes() {
  const ST = [['19a09ae9', '3df4c6f8', 'e3e28d48', 'be2b2a08'], ['d4e0b81e', '27bfb441', '11985d52', 'aef1e530'], ['d4e0b81e', 'bfb44127', '5d521198', '30aef1e5'], ['04e04828', '66cbf806', '8119d326', 'e59a7a4c'], ['a4686b02', '9c9f5b6a', '7f35ea50', 'f22b4349']];
  const OPS = ['SubBytes', 'ShiftRows', 'MixColumns', '⊕ k₁'];
  const HI = [(r, c) => c === 0 && r < 2 ? 'warn' : '', r => ['', 'accent', 'ok', 'warn'][r], (r, c) => c === 0 ? 'accent' : '', (r, c) => r === 0 && c === 0 ? 'ok' : ''];
  const EX = [
    [['SubBytes', 'm a'], [['바이트마다 S-box 표로 치환', 'replace each byte via the S-box']], ['19 → d4,  3d → 27', 'm'], [['GF(2⁸) 역원 + 아핀 변환', 'inverse in GF(2⁸) + affine map']], [['AES의 유일한 비선형 단계', 'the only nonlinear step in AES']]],
    [['ShiftRows', 'm a'], [['행 i를 왼쪽으로 i칸 회전', 'rotate row i left by i places']], [['한 열의 바이트가 네 열로', 'one column’s bytes reach all four']], [['흩어져요', 'columns']]],
    [['MixColumns', 'm a'], [['열마다 고정 행렬을 곱해요', 'multiply each column by a fixed']], [['(GF(2⁸) 위에서)', 'matrix over GF(2⁸)']], ['d4 bf 5d 30 → 04 66 81 e5', 'm'], [['한 바이트만 바뀌어도 열 전체가', 'one changed byte changes the']], [['바뀌어요', 'whole column']]],
    [['AddRoundKey', 'm a'], [['라운드 키 k₁을 XOR', 'XOR in the round key k₁']], ['04 ⊕ a0 = a4', 'm'], [['라운드 키는 키 확장으로', 'round keys come from the cipher']], [['원래 키에서 만들어요', 'key by key expansion']]]
  ];
  return CW('cy-aes', {
    draw: (S) => {
      T(S, 'gl0', 1, .6, ['입력 상태', 'input state'], 'cyx-xs', 1); T(S, 'gl1', 12, .6, ['출력 상태', 'output state'], 'cyx-xs', 1);
      arw(S, 'ar', [8.6, 4.15], [11.7, 4.15], 1);
      for (let k = 1; k <= 4; k++) {
        const off = k < 4 ? k + 1 : undefined;
        [[ST[k - 1], 1.0, 'a'], [ST[k], 12.0, 'b']].forEach(([M, x0, side]) => {
          for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const h = HI[k - 1](r, c); rect(S, `g${k}${side}${r}${c}`, x0 + c * 1.85, 1.6 + r * 1.3, 1.7, 1.1, h || 'line', h ? 30 : 8, k, { cls: 'cz-c cyx-c', html: M[r].slice(c * 2, c * 2 + 2), off }); }
        });
        T(S, 'op' + k, 8.5, 3.0, OPS[k - 1], 'cz-mono cz-tc cyx-xs', k, { w: 3.4, off });
        lines(S, 'e' + k, 20.2, 1.5, EX[k - 1], k, off || 0, { w: 11.2 });
      }
      for (let i = 0; i < 10; i++) chip(S, 'rd' + i, 1 + i * 3.05, 8.6, 2.8, 'R' + (i + 1), i === 9 ? 'warn' : 'accent', 4, { h: 1.0, pct: 16 });
      lbl(S, 'rn', 1, 10.0, ['처음에 k₀를 XOR하고 10라운드 · 마지막 라운드는 MixColumns 없음 · 2라운드만 지나도 모든 출력 비트가 모든 입력 비트에 의존해요', 'XOR k₀ first, then 10 rounds; the last skips MixColumns, and after just 2 rounds every output bit depends on every input bit'], '', 4, { w: 30 });
    },
    notes: [['AES는 16바이트를 4×4 상태로 놓고 라운드마다 네 단계를 거쳐요 · 먼저 SubBytes가 바이트마다 S-box로 치환해요', 'AES lays 16 bytes out as a 4×4 state and runs four steps per round, starting with SubBytes, which swaps each byte through the S-box'], ['ShiftRows는 둘째 행을 1칸, 셋째 행을 2칸, 넷째 행을 3칸 왼쪽으로 돌려요 · 바이트를 다른 열로 흩어 놓아요', 'ShiftRows rotates the second, third and fourth rows left by one, two and three places, scattering bytes across columns'], ['MixColumns는 열마다 고정 행렬을 곱해 네 바이트를 섞어요 · 한 바이트의 변화가 열 전체로 퍼져요', 'MixColumns multiplies each column by a fixed matrix, so a change in one byte spreads through the whole column'], ['AddRoundKey가 라운드 키를 XOR해요 · AES-128은 이걸 10라운드 반복하고, 수치는 FIPS-197 예제의 첫 라운드예요', 'AddRoundKey XORs in the round key; AES-128 repeats this for 10 rounds, and the numbers are round 1 of the FIPS-197 example']],
    fin: [['AES: 치환·행 이동·열 섞기·키 더하기를 10~14라운드 반복하는 SPN 구조', 'AES: substitute, shift rows, mix columns and add the key, for 10 to 14 rounds', 'cyx-xs cyx-a'], ['키 길이 128·192·256비트에 따라 10·12·14라운드예요', '128-, 192- and 256-bit keys use 10, 12 and 14 rounds'], ['요즘 CPU는 AES-NI 명령으로 라운드를 하드웨어에서 돌려요', 'modern CPUs run rounds in hardware with AES-NI']],
    caps: [['SubBytes', 'SubBytes'], ['ShiftRows', 'ShiftRows'], ['MixColumns', 'MixColumns'], ['AddRoundKey', 'AddRoundKey'], ['AES 라운드', 'AES rounds']]
  });
}

function sStream() {
  const X = 18.7;
  const grid = [['expa', 'nd 3', '2-by', 'te k'], ['key₀', 'key₁', 'key₂', 'key₃'], ['key₄', 'key₅', 'key₆', 'key₇'], ['ctr', 'nonce₀', 'nonce₁', 'nonce₂']];
  return CW('cy-stream', {
    code: [['def qr(a, b, c, d):       # 모두 mod 2³²', 'def qr(a, b, c, d):       # all mod 2³²'], '    a += b; d ^= a; d = rotl(d, 16)', '    c += d; b ^= c; b = rotl(b, 12)', '    a += b; d ^= a; d = rotl(d, 8)', '    c += d; b ^= c; b = rotl(b, 7)', ['# 20라운드 → 64바이트 키스트림', '# 20 rounds → 64-byte keystream'], 'ct = xor(pt, keystream(key, nonce, ctr))'],
    hl: [[5, 1], [1, 4, 'warn'], [6, 1, 'ok'], [6, 1, 'danger']],
    draw: (S) => {
      grid.forEach((rw, r) => rw.forEach((t, c) => { const col = r === 0 ? 'line' : r < 3 ? 'warn' : c === 0 ? 'accent' : 'ok'; chip(S, `s${r}${c}`, 19.0 + c * 3.1, 1.0 + r * 1.2, 2.9, t, col, 1, { h: 1.0, pct: r === 0 ? 8 : 22 }); }));
      lbl(S, 'n1', X, 6.0, ['상수 4 · 키 8 · 카운터 1 · nonce 3 = 32비트 워드 16개', '4 constants · 8 key · 1 counter · 3 nonce = sixteen 32-bit words'], '', 1, { w: 12.7 });
      [0, 1, 2, 3].forEach(r => frame(S, 'fc' + r, 18.9, .9 + r * 1.2, 3.1, 1.2, 'danger', 2, { w: .08, off: 3, r: .2 }));
      lbl(S, 'n2', X, 7.4, ['ARX: 더하기 · 회전 · XOR만 써요', 'ARX: only add, rotate and XOR'], 'w', 2);
      lbl(S, 'n2b', X, 8.4, ['열(빨간 틀)과 대각선에 쿼터 라운드를 번갈아 20번', 'quarter rounds alternate on columns (red) and diagonals, 20 rounds'], '', 2, { w: 12.7 });
      lines(S, 'x', X, 9.9, [['pt   48 65 6c 6c 6f', 'm'], ['⊕ks  9a 1f 03 c4 7e', 'm w'], ['=ct  d2 7a 6f a8 11', 'm g']], 3, 0);
      lbl(S, 'n4', X, 13.3, ['카운터만 올리면 다음 블록 · 아무 위치나 바로 계산해요', 'bump the counter for the next block; any position computes directly'], 'g', 4, { w: 12.7 });
    },
    notes: [['ChaCha20은 상수, 256비트 키, 블록 카운터, 96비트 nonce로 4×4 상태를 채워요', 'ChaCha20 fills a 4×4 state with constants, a 256-bit key, a block counter and a 96-bit nonce'], ['더하기, 회전, XOR(ARX)만으로 된 쿼터 라운드를 열과 대각선에 번갈아 20라운드 돌려요 · 표를 찾아보지 않아서 캐시 타이밍 공격에 강해요', 'quarter rounds built only from add, rotate and XOR run on columns and diagonals for 20 rounds, and with no table lookups there is no cache-timing leak'], ['결과 64바이트가 키스트림이고 평문에 XOR하면 암호문이에요 · 패딩이 필요 없어요', 'the 64-byte output is keystream, XORed with the plaintext to give ciphertext, with no padding needed'], ['카운터를 1씩 올리면 다음 블록이에요 · 병렬로 계산할 수 있고 원하는 위치부터 바로 복호화돼요', 'incrementing the counter gives the next block, so blocks compute in parallel and any offset decrypts directly']],
    fin: [['스트림 암호: 키와 nonce로 키스트림을 만들어 XOR해요 · 같은 nonce를 두 번 쓰면 안 돼요', 'stream cipher: key and nonce make a keystream to XOR in; never reuse a nonce', 'cyx-xs cyx-a'], ['AES 하드웨어 가속이 없는 기기에서 특히 빨라요', 'especially fast on devices without AES hardware'], ['TLS 1.3, WireGuard, SSH가 ChaCha20-Poly1305를 써요', 'TLS 1.3, WireGuard and SSH use ChaCha20-Poly1305']],
    caps: [['상태 행렬', 'The state'], ['ARX 라운드', 'ARX rounds'], ['키스트림 XOR', 'XOR the keystream'], ['카운터', 'The counter'], ['스트림 암호 ChaCha20', 'The ChaCha20 stream cipher']]
  });
}

function sNonce() {
  const X = 18.7, dx = .88;
  const m1 = 'PAY 100 TO BOB', m2 = 'PAY 999 TO EVE';
  return CW('cy-nonce', {
    code: [['ks = keystream(key, nonce)    # 같은 nonce!', 'ks = keystream(key, nonce)    # same nonce!'], "c1 = xor(b'PAY 100 TO BOB', ks)", "c2 = xor(b'PAY 999 TO EVE', ks)", ['xor(c1, c2)       # 평문끼리의 XOR', 'xor(c1, c2)       # plaintext ⊕ plaintext'], ['# m1을 알면 ks = c1 ⊕ m1 → m2까지', '# know m1 → ks = c1 ⊕ m1 → m2 too']],
    hl: [[0, 3], [3, 1, 'danger'], [4, 1, 'warn'], [0, 1, 'danger']],
    draw: (S) => {
      row(S, 'rw1', X, 1.0, m1, 'accent', 1, { dx, w: .8, pct: 10 });
      row(S, 'rw2', X, 2.2, m2, 'warn', 1, { dx, w: .8, pct: 14 });
      [...m1].forEach((c, i) => { const eq = c === m2[i]; chip(S, 'x' + i, X + i * dx, 3.8, .8, eq ? '0' : '≠', eq ? 'ok' : 'danger', 2, { h: .95, pct: eq ? 16 : 26 }); });
      lbl(S, 'n2', X, 5.2, ['키스트림이 지워지고 평문의 XOR만 남아요 · 같은 자리는 0', 'the keystream cancels, leaving plaintext ⊕ plaintext: equal spots are 0'], '', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 5.2, ['m1을 알거나 추측하면', 'if m1 is known or guessed'], 'w', 3, { off: 4 });
      F(S, 'n3b', X, 6.2, 'ks = c₁ ⊕ m₁  →  m₂ = c₂ ⊕ ks', 'r', 3, { off: 4 });
      lbl(S, 'n3c', X, 7.3, ['PAY 999 TO EVE가 그대로 드러나요', 'PAY 999 TO EVE is fully exposed'], 'r', 3, { off: 4, w: 12.7 });
      lines(S, 'f', X, 5.2, [[['GCM에서 재사용하면 인증 키 H까지 새서 위조 가능', 'in GCM, a repeat also leaks the hash key H → forgeries'], 'r cyx-wr', { lh: 1.9 }], [['무작위 96비트 nonce: 키 하나당 메시지 2³²개까지', 'random 96-bit nonces: at most 2³² messages per key'], 'cyx-wr', { lh: 1.9 }], [['대책: 카운터 nonce · XChaCha20(192비트) · AES-GCM-SIV', 'fixes: counter nonces, XChaCha20 (192-bit), AES-GCM-SIV'], 'g cyx-wr', { lh: 1.9 }]], 4, 0, { w: 12.7 });
      lbl(S, 'kr', 1, 8.0, ['2017년 KRACK은 WPA2가 nonce를 다시 쓰게 만들어 Wi-Fi 트래픽을 풀었어요', 'in 2017 KRACK forced WPA2 to reuse nonces and decrypted Wi-Fi traffic'], '', 4, { w: 16.5 });
    },
    notes: [['CTR, GCM, ChaCha20은 키와 nonce로 키스트림을 만들어요 · 두 메시지에 같은 nonce를 쓰면 키스트림도 같아요', 'CTR, GCM and ChaCha20 derive the keystream from key and nonce, so two messages with the same nonce share a keystream'], ['두 암호문을 XOR하면 키스트림이 지워지고 평문끼리의 XOR만 남아요 · 일회용 패드를 두 번 쓴 것과 같아요', 'XORing the ciphertexts cancels the keystream and leaves plaintext ⊕ plaintext, just like a reused one-time pad'], ['한쪽 평문을 알거나 추측하면 키스트림이 나오고, 그 키스트림으로 다른 메시지도 다 풀려요', 'knowing or guessing one plaintext yields the keystream, which then decrypts the other message'], ['GCM은 nonce가 겹치면 인증 키까지 새서 위조도 가능해져요 · nonce는 카운터로 관리하거나 충분히 긴 무작위 값을 쓰고, 실수에 강한 SIV 모드도 있어요', 'with GCM a repeat also leaks the authentication key, enabling forgeries; manage nonces as counters or long random values, or use a misuse-resistant SIV mode']],
    fin: [['nonce 재사용: 스트림 계열 암호에서 가장 흔하고 치명적인 실수', 'nonce reuse: the most common and most fatal mistake with stream-style ciphers', 'cyx-xs cyx-a'], ['nonce는 비밀일 필요는 없지만 키마다 유일해야 해요', 'a nonce need not be secret, but it must be unique per key'], ['nonce를 알아서 만들어 주는 라이브러리 API를 쓰세요', 'prefer library APIs that generate the nonce for you']],
    caps: [['같은 nonce', 'The same nonce'], ['키스트림이 지워져요', 'The keystream cancels'], ['다른 메시지까지', 'The other message falls'], ['대책', 'Fixes'], ['nonce 재사용', 'Nonce reuse']]
  });
}

function sAead() {
  const X = 18.7;
  return CW('cy-aead', {
    code: ['aead = AESGCM(key)', 'nonce = os.urandom(12)', "ct = aead.encrypt(nonce, b'pay 100', b'hdr')", ['# ct = 암호문 + 16바이트 태그', '# ct = ciphertext + 16-byte tag'], "aead.decrypt(nonce, ct, b'hdr')   # b'pay 100'", 'ct2 = flip_bit(ct, 3)', "aead.decrypt(nonce, ct2, b'hdr')  # InvalidTag"],
    hl: [[0, 3], [3, 1, 'warn'], [4, 1, 'ok'], [5, 2, 'danger']],
    draw: (S) => {
      nd(S, 'h', 18.9, 1.0, 2.6, 'hdr', 'line', 1); nd(S, 'p', 22.6, 1.0, 4.6, 'pay 100', 'accent', 1, { pct: 22 });
      arw(S, 'a1', [24.9, 2.15], [24.9, 2.75], 1);
      box(S, 'ctr', 22.2, 2.8, 5.4, 1.1, ['CTR 암호화', 'CTR encryption'], 'accent', 1);
      arw(S, 'a2', [24.9, 3.95], [24.9, 4.55], 1);
      arw(S, 'a3', [20.2, 2.15], [20.2, 4.55], 1, { dash: 1 });
      nd(S, 'h2', 18.9, 4.6, 2.6, 'hdr', 'line', 1); nd(S, 'c', 22.4, 4.6, 5.0, '7c 1e 9a 20…', 'line', 1);
      lbl(S, 'n1', X, 6.1, ['헤더(AAD)는 평문 그대로, 본문만 암호화', 'the header (AAD) stays plain; only the body is encrypted'], '', 1, { off: 2, w: 12.7 });
      arw(S, 'g1', [20.2, 5.75], [20.2, 6.05], 2); arw(S, 'g2', [24.9, 5.75], [24.9, 6.05], 2);
      box(S, 'gh', 18.9, 6.1, 12.4, 1.1, ['GHASH(H, hdr ‖ 암호문) → 태그', 'GHASH(H, hdr ‖ ciphertext) → tag'], 'warn', 2);
      nd(S, 'o1', 18.9, 7.9, 2.6, 'hdr', 'line', 2); nd(S, 'o2', 21.7, 7.9, 5.0, '7c 1e 9a 20…', 'line', 2); nd(S, 'o3', 26.9, 7.9, 4.4, 'tag 3f…', 'warn', 2, { pct: 30 });
      lbl(S, 'n2', X, 9.4, ['보내는 것: 헤더 + 암호문 + 16바이트 태그', 'sent: header + ciphertext + 16-byte tag'], '', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 9.4, ['받는 쪽: 태그를 다시 계산 → 일치 ✓ → 그때만 평문 반환', 'receiver recomputes the tag → match ✓ → only then returns plaintext'], 'g', 3, { off: 4, w: 12.7 });
      nd(S, 'f2', 21.7, 7.9, 5.0, '7c 1f 9a 20…', 'danger', 4, { pct: 24 });
      lbl(S, 'n4', X, 9.4, ['한 비트만 바꿔도 태그 불일치 → InvalidTag', 'flip one bit → tag mismatch → InvalidTag'], 'r', 4, { w: 12.7 });
      lbl(S, 'n4b', X, 10.6, ['조작된 평문은 한 바이트도 내보내지 않아요', 'not one byte of tampered plaintext comes out'], '', 4, { w: 12.7 });
      lbl(S, 'n4c', 1, 10.0, ['암호화만 하면(CTR) 비트를 뒤집어 금액을 바꿀 수 있어요 · AEAD는 기밀성과 무결성을 한 번에 지켜요', 'encryption alone (CTR) lets bit flips change the amount; AEAD protects confidentiality and integrity together'], '', 4, { w: 16.5 });
    },
    notes: [['AEAD는 암호화와 인증을 한 번에 해요 · AES-GCM은 CTR 모드로 본문을 암호화하고, 헤더(AAD)는 평문 그대로 둬요', 'AEAD encrypts and authenticates in one step: AES-GCM encrypts the body in CTR mode and leaves the header (AAD) in the clear'], ['GHASH가 헤더와 암호문 전체로 16바이트 태그를 만들어 함께 보내요', 'GHASH computes a 16-byte tag over the header and the whole ciphertext, sent along with it'], ['받는 쪽은 태그를 다시 계산해서 일치할 때만 복호화 결과를 돌려줘요', 'the receiver recomputes the tag and returns plaintext only if it matches'], ['헤더나 암호문을 한 비트만 바꿔도 InvalidTag가 나요 · 인증 없는 암호문은 비트를 뒤집어 내용을 조작할 수 있어요', 'changing a single bit of header or ciphertext raises InvalidTag, whereas unauthenticated ciphertext can be edited by flipping bits']],
    fin: [['AEAD: 기밀성·무결성·헤더 인증을 한 API로 · 대칭 암호는 이걸 기본으로 써요', 'AEAD: confidentiality, integrity and header authentication in one API, the default for symmetric crypto', 'cyx-xs cyx-a'], ['대표: AES-GCM, ChaCha20-Poly1305, AES-GCM-SIV', 'examples: AES-GCM, ChaCha20-Poly1305, AES-GCM-SIV'], ['태그 비교는 상수 시간으로 해야 해요', 'tag comparison must be constant-time']],
    caps: [['본문만 암호화', 'Encrypt the body'], ['태그 만들기', 'Make the tag'], ['검증 후 복호화', 'Verify, then decrypt'], ['한 비트 조작', 'Flip one bit'], ['인증 암호 AEAD', 'Authenticated encryption']]
  });
}

function sPadding() {
  const X = 18.7;
  return CW('cy-padding', {
    code: [['# 서버: CBC 복호화 후 패딩 검사', '# server: CBC-decrypt, then check padding'], 'def decrypt(iv, c):', '    p = cbc_decrypt(key, iv, c)', '    if not valid_pkcs7(p):', ["        return 'padding error'   # ← 오라클", "        return 'padding error'   # ← oracle"], "    return 'mac error' if bad_mac(p) else 'ok'", ['# 공격자: iv의 마지막 바이트를 0..255로', '# attacker: try iv[-1] = 0..255']],
    hl: [[3, 2], [2, 1], [4, 1, 'danger'], [6, 1, 'warn']],
    draw: (S) => {
      lines(S, 'pk', X, .8, [[['PKCS#7: 남은 칸 수 n을 n번 채워요', 'PKCS#7: pad with n copies of n'], 'a'], ['… 61 62 03 03 03   ✓', 'm g'], ['… 61 62 63 64 01   ✓', 'm g'], ['… 61 62 63 05 02   ✗', 'm r']], 1, 2);
      nd(S, 'c1', 24.0, .8, 3.0, 'C₁', 'line', 2);
      arw(S, 'a1', [25.5, 1.95], [25.5, 2.45], 2);
      box(S, 'D', 23.9, 2.5, 3.2, 1.0, 'Dₖ', 'accent', 2);
      arw(S, 'a2', [25.5, 3.55], [25.5, 4.05], 2);
      nd(S, 'I', 23.4, 4.1, 4.2, 'I = …39', 'line', 2);
      arw(S, 'a3', [25.5, 5.25], [25.5, 5.55], 2);
      ring(S, 'xr', 25.5, 6.0, .42, 'ink-2', 2, { w: .1 }); T(S, 'xo', 25.0, 5.55, '⊕', 'cz-tc cyx-s', 2, { w: 1 });
      nd(S, 'c0', 19.0, 5.45, 4.2, 'C₀ = …3a', 'line', 2, { off: 3 });
      nd(S, 'c0b', 19.0, 5.45, 4.2, 'C₀′ = …g', 'warn', 3, { pct: 30 });
      arw(S, 'a4', [23.3, 6.0], [25.0, 6.0], 2);
      arw(S, 'a5', [25.5, 6.45], [25.5, 6.95], 2);
      nd(S, 'P', 23.4, 7.0, 4.2, 'P = …03', 'ok', 2, { off: 3 });
      nd(S, 'P2', 23.4, 7.0, 4.2, 'P′ = …01 ✓', 'warn', 3, { pct: 30 });
      F(S, 'f2', X, 8.5, 'P₁ = D_k(C₁) ⊕ C₀', 'a', 2);
      lbl(S, 'g1', X, 9.6, ['g = 0x38일 때 서버가 “패딩 OK”', 'at g = 0x38 the server says “padding OK”'], 'w', 3, { w: 12.7 });
      F(S, 'g2', X, 10.6, 'I = g ⊕ 01 = 0x38 ⊕ 0x01 = 0x39', '', 3);
      F(S, 'g3', X, 11.6, 'P = I ⊕ C₀ = 0x39 ⊕ 0x3a = 0x03', 'r', 3);
      lbl(S, 'n4', X, 12.9, ['다음은 끝을 02 02로 맞추며 반복 · 바이트당 최대 256번', 'next, aim for 02 02 and repeat: at most 256 tries per byte'], '', 4, { w: 12.7 });
      lbl(S, 'n4b', 1, 10.0, ['POODLE(2014), Lucky 13(2013)이 이 계열 공격이에요 · 대책은 AEAD, 그리고 오류 메시지와 응답 시간을 하나로 통일하기', 'POODLE (2014) and Lucky 13 (2013) belong to this family; the fix is AEAD plus a single error and uniform timing'], '', 4, { w: 16.5 });
    },
    notes: [['CBC는 블록 크기를 맞추려고 PKCS#7 패딩을 붙여요 · 3칸이 남으면 03 03 03', 'CBC pads to the block size with PKCS#7: three spare bytes become 03 03 03'], ['복호화는 P = Dₖ(C₁) ⊕ C₀ · 앞 블록 C₀의 바이트를 바꾸면 평문의 같은 자리가 그대로 바뀌어요', 'decryption computes P = Dₖ(C₁) ⊕ C₀, so changing a byte of C₀ changes the same plaintext byte'], ['서버가 패딩 오류를 따로 알려 주면, 마지막 바이트를 0~255로 바꿔 보다가 OK가 나는 순간 그 바이트가 01이 됐다는 걸 알아요 · 거기서 평문 바이트가 계산돼요', 'if the server reports padding errors separately, trying 0–255 in the last byte reveals when it became 01, and the plaintext byte follows'], ['끝에서부터 한 바이트씩 반복하면 키 없이 전체 평문이 풀려요 · 오류 메시지 하나가 오라클이 돼요', 'repeating byte by byte from the end decrypts everything without the key; one error message becomes an oracle']],
    fin: [['패딩 오라클: 복호화 결과에 대한 작은 신호도 평문 전체를 새게 해요', 'padding oracle: even a tiny signal about decryption leaks the whole plaintext', 'cyx-xs cyx-a'], ['TLS 1.3은 CBC를 빼고 AEAD만 남겼어요', 'TLS 1.3 dropped CBC and kept only AEAD'], ['MAC을 먼저 검사하고(encrypt-then-MAC) 오류는 하나로 통일해요', 'check the MAC first (encrypt-then-MAC) and return one error']],
    caps: [['PKCS#7 패딩', 'PKCS#7 padding'], ['CBC 복호화', 'CBC decryption'], ['오라클에 묻기', 'Asking the oracle'], ['한 바이트씩 전부', 'Byte by byte'], ['패딩 오라클 공격', 'The padding oracle attack']]
  });
}
/* ===== Cryptography · 4. hashes and integrity, 5. public-key cryptography ===== */
function sBirthday() {
  const X = 18.7, x0 = 19.4, yb = 7.6, sx = 11.6 / 60, sy = 6.6;
  const P = k => { let p = 1; for (let i = 0; i < k; i++) p *= (365 - i) / 365; return 1 - p; };
  const pts = []; for (let k = 0; k <= 60; k += 2) pts.push([x0 + k * sx, yb - P(k) * sy]);
  const kx = x0 + 23 * sx, ky = yb - P(23) * sy;
  return CW('cy-birthday', {
    code: ['def p_same(k, n=365):', '    p = 1.0', '    for i in range(k): p *= (n - i) / n', '    return 1 - p', 'p_same(23)    # 0.507', ['# n비트 해시 → 약 2^(n/2)개에서 충돌', '# n-bit hash → collision near 2^(n/2)']],
    hl: [[0, 4], [4, 1, 'ok'], [5, 1, 'warn'], [5, 1, 'danger']],
    draw: (S) => {
      vl(S, 'ay', x0, .8, yb + .05, 'ink-3', 0, { w: .08 }); hl(S, 'ax', x0, 31.2, yb, 'ink-3', 0, { w: .08 });
      lbl(S, 'ly', x0 + .3, .2, ['같은 생일이 있을 확률', 'P(a shared birthday)'], '', 0);
      F(S, 'lx', 30.6, yb + .2, 'k', '', 0);
      poly(S, 'cv', pts, { st: 1, color: 'accent', h: .1 });
      vl(S, 'v23', kx, ky, yb, 'warn', 2, { dash: 1, w: .08 }); hl(S, 'h23', x0, kx, ky, 'warn', 2, { dash: 1, w: .08 });
      pt(S, 'p23', kx, ky, 2, C.warn, .25);
      F(S, 't23', kx - .5, yb + .2, '23', '', 2);
      lbl(S, 'n23', kx + .6, ky + .3, ['23명 → 50.7%', '23 people → 50.7%'], 'w', 2);
      lines(S, 'tb', X, 8.9, [[['해시 길이 → 충돌을 찾는 데 필요한 양', 'hash size → work to find a collision'], 'a'], ['MD5      128 → 2⁶⁴', 'm'], ['SHA-1    160 → 2⁸⁰', 'm'], ['SHA-256  256 → 2¹²⁸', 'm g']], 3, 0);
      lbl(S, 'n4', X, 13.3, ['MD5·SHA-1은 구조적 약점 때문에 이보다 훨씬 빨리 깨졌어요', 'MD5 and SHA-1 broke far faster through structural flaws'], 'r', 4, { w: 12.7 });
      lbl(S, 'n4b', 1, 9.0, ['공격 예: 무해한 계약서 변형 2³²개와 악성 변형 2³²개를 만들어 해시가 같은 쌍을 찾고, 서명받은 문서를 바꿔치기 (64비트 해시라면)', 'example: make 2³² harmless and 2³² malicious contract variants, find a pair with equal hashes and swap the signed one (for a 64-bit hash)'], '', 4, { w: 16.5 });
    },
    notes: [['23명이 모이면 생일이 같은 쌍이 있을 확률이 50%를 넘어요 · 쌍의 수가 사람 수의 제곱으로 늘기 때문이에요', 'with 23 people the chance of a shared birthday passes 50%, because the number of pairs grows with the square of the group'], ['23명이면 쌍이 253개 · 365일 안에서 겹칠 기회가 생각보다 많아요', '23 people form 253 pairs, far more chances to collide than intuition suggests'], ['출력이 n비트인 해시는 약 2^(n/2)개만 해시해 보면 충돌이 나와요 · 그래서 128비트 안전성에는 256비트 해시가 필요해요', 'an n-bit hash yields a collision after about 2^(n/2) tries, so 128-bit security needs a 256-bit hash'], ['충돌을 찾으면 한 문서에 받은 서명을 다른 문서에 붙일 수 있어요 · MD5와 SHA-1은 실제 충돌 쌍이 만들어졌어요', 'a collision lets a signature on one document stand for another, and real collision pairs exist for MD5 and SHA-1']],
    fin: [['생일 공격: 충돌은 2ⁿ번이 아니라 약 2^(n/2)번이면 찾아요', 'birthday bound: collisions appear after about 2^(n/2) tries, not 2ⁿ', 'cyx-xs cyx-a'], ['특정 해시값을 맞히는 원상 공격은 여전히 2ⁿ번이에요', 'hitting one given hash (a preimage) still costs 2ⁿ'], ['SHA-1 충돌은 2017년 SHAttered로 실제로 만들어졌어요', 'SHA-1 collisions were produced by SHAttered in 2017']],
    caps: [['생일 문제', 'The birthday problem'], ['23명이면 50%', '50% at 23 people'], ['해시 충돌', 'Hash collisions'], ['충돌의 쓸모', 'Why collisions matter'], ['생일 공격', 'The birthday attack']]
  });
}

function sMd() {
  const X = 18.7, Y = 11.6;
  return CW('cy-md', {
    code: ['h = IV', ['for block in pad(msg):        # 64바이트씩', 'for block in pad(msg):        # 64 bytes each'], '    h = compress(h, block)', 'digest = h                    # SHA-256', ['# 순진한 MAC: sha256(secret + msg) ✗', '# naive MAC: sha256(secret + msg) ✗'], ['# digest에서 이어서 compress → 확장', '# resume from digest → extension'], "forged = continue_hash(digest, b'&admin=1')"],
    hl: [[0, 4], [1, 2, 'warn'], [4, 1, 'danger'], [5, 2, 'danger']],
    draw: (S) => {
      nd(S, 'iv', 1, Y + .3, 2.6, 'IV', 'line', 1);
      [[5.0, 'm₁'], [10.4, 'm₂'], [15.8, ['m₃ + 패딩', 'm₃ + pad']]].forEach(([x, t], i) => {
        box(S, 'f' + i, x, Y, 3.0, 1.4, 'f', 'accent', 1);
        nd(S, 'mb' + i, x - (i === 2 ? .3 : 0), 9.8, i === 2 ? 3.6 : 3.0, t, i === 2 ? 'warn' : 'line', 1, { pct: i === 2 ? 22 : 10 });
        arw(S, 'ma' + i, [x + 1.5, 10.95], [x + 1.5, Y - .05], 1);
      });
      arw(S, 'c0', [3.7, Y + .7], [4.9, Y + .7], 1); arw(S, 'c1', [8.1, Y + .7], [10.3, Y + .7], 1); arw(S, 'c2', [13.5, Y + .7], [15.7, Y + .7], 1); arw(S, 'c3', [18.9, Y + .7], [20.2, Y + .7], 1);
      F(S, 'h1', 8.6, Y + 1.5, 'h₁', '', 1); F(S, 'h2', 14.0, Y + 1.5, 'h₂', '', 1);
      nd(S, 'out', 20.3, Y + .3, 3.4, 'digest', 'ok', 1, { pct: 26 });
      lbl(S, 'e1', X, .8, ['블록을 압축 함수 f로 이어 붙여요', 'blocks are chained through a compression function f'], 'a', 1, { w: 12.7 });
      F(S, 'e1b', X, 2.1, 'h₀ = IV,   hᵢ = f(hᵢ₋₁, mᵢ)', '', 1);
      lbl(S, 'e1c', X, 3.1, ['마지막 h가 해시값 (MD5, SHA-1, SHA-256)', 'the final h is the hash (MD5, SHA-1, SHA-256)'], '', 1, { w: 12.7 });
      lbl(S, 'e2', X, 4.6, ['패딩: 1비트 + 0 + 메시지 길이(64비트)', 'padding: a 1 bit, zeros, then the 64-bit length'], 'w', 2, { w: 12.7 });
      nd(S, 'sec', 4.4, 9.8, 4.2, ['secret‖m₁', 'secret‖m₁'], 'danger', 3, { pct: 26 });
      lbl(S, 'e3', X, 5.9, ['MAC = H(secret ‖ m)으로 만들면?', 'what about MAC = H(secret ‖ m)?'], 'r', 3, { w: 12.7 });
      lbl(S, 'e3b', X, 6.9, ['digest는 그냥 마지막 체인 값 h예요', 'the digest is just the last chaining value h'], '', 3, { w: 12.7 });
      box(S, 'f3', 25.0, Y, 3.0, 1.4, 'f', 'danger', 4);
      nd(S, 'mx', 24.2, 9.8, 4.6, '&admin=1', 'danger', 4, { pct: 22 });
      arw(S, 'ma3', [26.5, 10.95], [26.5, Y - .05], 4);
      arw(S, 'c4', [23.8, Y + .7], [24.9, Y + .7], 4); arw(S, 'c5', [28.1, Y + .7], [28.7, Y + .7], 4);
      nd(S, 'out2', 28.8, Y + .3, 2.5, 'h′', 'danger', 4, { pct: 26 });
      lbl(S, 'e4', X, 8.0, ['secret 없이 h′ = H(secret ‖ m ‖ pad ‖ m′) 계산 → 위조 성공', 'without the secret, h′ = H(secret ‖ m ‖ pad ‖ m′) → a valid forgery'], 'r', 4, { w: 12.7 });
    },
    notes: [['MD5, SHA-1, SHA-2는 메시지를 블록으로 잘라 압축 함수 f에 차례로 넣는 머클-담고르 구조예요 · 앞 결과가 다음 입력의 일부가 돼요', 'MD5, SHA-1 and SHA-2 use the Merkle–Damgård design, feeding blocks one by one into a compression function f, each output chaining into the next'], ['마지막 블록에는 1비트, 0들, 원래 메시지 길이를 붙여 블록 크기를 맞춰요', 'the last block is padded with a 1 bit, zeros and the original message length'], ['해시값이 곧 마지막 체인 값이라, H(secret ‖ m)을 MAC으로 쓰면 그 상태를 그대로 이어받을 수 있어요', 'because the hash is simply the final chaining value, using H(secret ‖ m) as a MAC hands out that internal state'], ['공격자는 비밀을 몰라도 digest에서 압축을 이어 가서 m 뒤에 &admin=1을 붙인 메시지의 유효한 MAC을 만들어요 · 이게 길이 확장 공격이에요', 'without knowing the secret, the attacker resumes from the digest and produces a valid MAC for m with &admin=1 appended: the length extension attack']],
    fin: [['머클-담고르: 압축 함수를 이어 붙인 해시 · 해시값이 내부 상태라 길이 확장에 약해요', 'Merkle–Damgård: chained compression, and since the hash is the state, it allows length extension', 'cyx-xs cyx-a'], ['MAC은 HMAC으로 만들어요 (키를 안팎 두 번 섞음)', 'build MACs with HMAC, which mixes the key in twice'], ['SHA-3, SHA-512/256, BLAKE3는 길이 확장이 안 돼요', 'SHA-3, SHA-512/256 and BLAKE3 resist length extension']],
    caps: [['압축 함수 체인', 'A chain of compressions'], ['길이 패딩', 'Length padding'], ['순진한 MAC', 'A naive MAC'], ['길이 확장 공격', 'The length extension attack'], ['머클-담고르 구조', 'Merkle–Damgård']]
  });
}

function sSponge() {
  const X = 18.7, cols = [19.2, 23.6, 28.0], w = 1.8, top = 1.6, rh = 4.0, ch = 2.0;
  const state = (k, x, st) => { rect(S0, k + 'r', x, top, w, rh, 'accent', 22, st, { r: .15 }); rect(S0, k + 'c', x, top + rh, w, ch, 'ink-3', 14, st, { r: .15 }); T(S0, k + 'rl', x, top + rh / 2 - .45, 'r', 'cz-math cz-tc cyx-s', st, { w }); T(S0, k + 'cl', x, top + rh + ch / 2 - .45, 'c', 'cz-math cz-tc cyx-s', st, { w }); };
  let S0;
  return CW('cy-sponge', {
    code: [['state = bytes(200)               # 1600비트', 'state = bytes(200)               # 1600 bits'], ['for blk in pad(msg, rate=136):   # 1088비트', 'for blk in pad(msg, rate=136):   # 1088 bits'], '    state = keccak_f(xor(state, blk))', 'out = state[:32]                 # SHA3-256', ['# 용량 512비트는 밖으로 안 나와요', '# the 512-bit capacity never leaves']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      state('s0', cols[0], 1);
      lbl(S, 'n1', X, 8.3, ['상태 1600비트 = 비율 r 1088 + 용량 c 512', 'state 1600 bits = rate r 1088 + capacity c 512'], '', 1, { off: 2, w: 12.7 });
      [0, 1].forEach(i => {
        nd(S, 'm' + i, cols[i] - .2, .2, 2.2, 'm' + (i + 1), 'warn', 2, { h: .9, pct: 24 });
        arw(S, 'mx' + i, [cols[i] + .9, 1.15], [cols[i] + .9, 1.55], 2, { color: 'warn' });
        box(S, 'f' + i, cols[i] + 2.0, 3.6, 2.2, 1.2, 'f', 'ink-3', 2);
        arw(S, 'fa' + i, [cols[i] + 1.85, 4.2], [cols[i] + 2.0, 4.2], 2); arw(S, 'fb' + i, [cols[i] + 4.25, 4.2], [cols[i + 1] - .05, 4.2], 2);
        state('s' + (i + 1), cols[i + 1], 2);
      });
      lbl(S, 'n2', X, 8.3, ['흡수: 블록을 r 부분에 XOR하고 Keccak-f(24라운드)로 섞어요', 'absorb: XOR each block into r, then mix with Keccak-f (24 rounds)'], 'w', 2, { off: 3, w: 12.7 });
      nd(S, 'out', 27.4, .2, 3.0, 'out', 'ok', 3, { h: .9, pct: 30 });
      arw(S, 'oa', [28.9, 1.55], [28.9, 1.15], 3, { color: 'ok' });
      lbl(S, 'n3', X, 8.3, ['짜내기: r 부분에서 출력을 읽어요 · SHA3-256은 앞 256비트', 'squeeze: read output from r; SHA3-256 takes the first 256 bits'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 8.3, [[['용량 c는 입출력에 직접 드러나지 않아요', 'the capacity c is never exposed directly'], 'a cyx-wr', { lh: 1.7 }], [['→ 길이 확장 공격이 안 돼요 · 안전성 c/2 = 256비트', '→ no length extension; security c/2 = 256 bits'], 'cyx-wr', { lh: 1.7 }], [['SHAKE: 원하는 길이만큼 계속 짜내요 (XOF)', 'SHAKE keeps squeezing to any length (an XOF)'], 'g cyx-wr', { lh: 1.7 }]], 4, 0, { w: 12.7 });
    },
    notes: [['SHA-3는 1600비트 상태를 바깥과 닿는 비율 r과 숨겨진 용량 c로 나눠요', 'SHA-3 splits a 1600-bit state into an outer rate r and a hidden capacity c'], ['메시지 블록을 r 부분에 XOR하고 순열 Keccak-f로 전체를 섞기를 반복해요 · 스펀지가 물을 빨아들이듯 흡수해요', 'it repeatedly XORs a message block into r and stirs the whole state with the Keccak-f permutation, soaking input up like a sponge'], ['다 흡수하면 r 부분에서 출력을 읽어요 · 더 필요하면 섞고 또 읽어요', 'once absorbed, output is read from r, mixing again whenever more is needed'], ['용량 c는 출력에 나오지 않아서 해시값에서 내부 상태를 복원할 수 없어요 · 그래서 길이 확장 공격이 통하지 않아요', 'the capacity never appears in the output, so the internal state cannot be rebuilt from a hash, and length extension fails']],
    fin: [['스펀지 구조: 흡수와 짜내기로 해시·XOF·MAC·암호를 한 순열로 만들어요', 'sponge: absorb and squeeze turn one permutation into hashes, XOFs, MACs and ciphers', 'cyx-xs cyx-a'], ['SHA-3는 2015년 표준이 됐어요 (FIPS 202)', 'SHA-3 was standardized in 2015 (FIPS 202)'], ['ML-KEM, ML-DSA도 내부에서 SHAKE를 써요', 'ML-KEM and ML-DSA use SHAKE internally']],
    caps: [['비율과 용량', 'Rate and capacity'], ['흡수', 'Absorbing'], ['짜내기', 'Squeezing'], ['길이 확장이 안 되는 이유', 'Why no length extension'], ['스펀지 구조 (SHA-3)', 'The sponge (SHA-3)']]
  });
}

function sMerkle() {
  const LX = [1.5, 9.25, 17.0, 24.75], W = 5.8, PX = [5.4, 20.9], RX = 12.4, RW = 7.2;
  const up = (k, a, b, st, o = {}) => seg(S1, k, a, b, st, o.color || 'ink-3', .08, { off: o.off });
  let S1;
  return CW('cy-merkletree', {
    draw: (S) => {
      S1 = S;
      LX.forEach((x, i) => {
        nd(S, 'tx' + i, x, 13.0, W, 'tx' + '₁₂₃₄'[i], 'line', 1);
        arw(S, 'ta' + i, [x + W / 2, 12.95], [x + W / 2, 12.25], 1);
        nd(S, 'lh' + i, x, 11.0, W, `h${'₁₂₃₄'[i]} = H(tx${'₁₂₃₄'[i]})`, 'accent', 1, { pct: 14 });
        up('u' + i, [x + W / 2, 10.95], [PX[i >> 1] + W / 2, 8.75], 2);
      });
      PX.forEach((x, j) => { nd(S, 'p' + j, x, 7.6, W, j ? 'h₃₄ = H(h₃‖h₄)' : 'h₁₂ = H(h₁‖h₂)', 'warn', 2, { pct: 18 }); up('v' + j, [x + W / 2, 7.55], [RX + RW / 2, 5.35], 2); });
      nd(S, 'rt', RX, 4.2, RW, 'root = H(h₁₂‖h₃₄)', 'ok', 2, { pct: 26 });
      lbl(S, 'n1', 1, 1.0, ['거래(데이터)마다 해시를 구해 잎을 만들어요', 'hash each transaction to make the leaves'], 'a', 1, { off: 2, w: 30 });
      lbl(S, 'n2', 1, 1.0, ['두 개씩 묶어 해시하며 올라가면 루트 해시 하나가 전체를 대표해요', 'hash pairs level by level until one root hash stands for everything'], 'a', 2, { off: 3, w: 30 });
      nd(S, 'bt', LX[2], 13.0, W, 'tx₃′', 'danger', 3, { off: 4, pct: 26 });
      nd(S, 'bh', LX[2], 11.0, W, 'h₃′', 'danger', 3, { off: 4, pct: 26 });
      nd(S, 'bp', PX[1], 7.6, W, 'h₃₄′', 'danger', 3, { off: 4, pct: 26 });
      nd(S, 'br', RX, 4.2, RW, 'root′ ≠ root', 'danger', 3, { off: 4, pct: 26 });
      lbl(S, 'n3', 1, 1.0, ['tx₃를 한 글자만 바꿔도 h₃ → h₃₄ → root가 모두 바뀌어요', 'change one character of tx₃ and h₃, h₃₄ and the root all change'], 'r', 3, { off: 4, w: 30 });
      frame(S, 'q1', LX[3] - .15, 10.85, W + .3, 1.4, 'ok', 4, { w: .12, r: .3 });
      frame(S, 'q2', PX[0] - .15, 7.45, W + .3, 1.4, 'ok', 4, { w: .12, r: .3 });
      frame(S, 'q3', LX[2] - .15, 12.85, W + .3, 1.4, 'accent', 4, { w: .12, r: .3 });
      lbl(S, 'n4', 1, 1.0, ['tx₃가 들어 있다는 증명: h₄와 h₁₂ 두 개면 root까지 계산돼요', 'proof that tx₃ is included: h₄ and h₁₂ are enough to recompute the root'], 'g', 4, { w: 30 });
      lbl(S, 'n4b', 1, 2.2, ['잎이 100만 개여도 해시 20개면 충분해요 (log₂ n)', 'a million leaves need only 20 hashes (log₂ n)'], '', 4, { w: 30 });
    },
    notes: [['머클 트리는 데이터 조각마다 해시를 구해 잎으로 놓아요', 'a Merkle tree places a hash of each data item at the leaves'], ['두 해시를 이어 붙여 다시 해시하기를 반복하면 맨 위에 루트 해시 하나가 남아요 · 이 32바이트가 전체를 대표해요', 'hashing pairs of hashes level by level leaves a single root hash at the top, 32 bytes that stand for everything'], ['어느 잎이든 바뀌면 루트까지 가는 경로의 해시가 모두 바뀌어요 · 루트만 믿을 수 있으면 전체의 무결성이 보장돼요', 'changing any leaf changes every hash on its path to the root, so trusting the root guarantees the whole set'], ['특정 잎이 들어 있다는 걸 형제 해시 log₂ n개로 증명할 수 있어요 · 전체 데이터를 받을 필요가 없어요', 'membership of a leaf is proven with log₂ n sibling hashes, without downloading everything']],
    fin: [['머클 트리: 루트 해시 하나로 대량 데이터의 무결성과 포함 여부를 증명해요', 'Merkle tree: one root hash proves integrity and membership for large data sets', 'cyx-xs cyx-a'], ['Git 커밋, 비트코인 블록, 인증서 투명성 로그가 써요', 'used by Git commits, Bitcoin blocks and Certificate Transparency logs'], ['잎과 내부 노드의 해시에 접두어를 달리해 혼동 공격을 막아요', 'domain-separate leaf and node hashes to stop confusion attacks']],
    caps: [['잎 해시', 'Leaf hashes'], ['루트까지', 'Up to the root'], ['변조 감지', 'Detecting tampering'], ['포함 증명', 'Proof of inclusion'], ['머클 트리', 'Merkle tree']]
  });
}

function sKdf() {
  const X = 18.7;
  return CW('cy-kdf', {
    code: [['prk = hmac(salt, shared)           # 추출', 'prk = hmac(salt, shared)           # extract'], "t1 = hmac(prk, b'key' + b'\\x01')", "t2 = hmac(prk, t1 + b'key' + b'\\x02')", ['okm = (t1 + t2)[:64]               # 확장', 'okm = (t1 + t2)[:64]               # expand'], 'k_enc, k_mac = okm[:32], okm[32:]', ['# 비밀번호는 Argon2 같은 느린 KDF로', '# passwords need a slow KDF like Argon2']],
    hl: [[0, 1], [1, 3, 'warn'], [4, 1, 'ok'], [5, 1, 'danger']],
    draw: (S) => {
      nd(S, 'salt', 18.9, .8, 3.0, 'salt', 'line', 1); nd(S, 'ikm', 22.4, .8, 5.2, 'shared gᵃᵇ', 'accent', 1, { pct: 22 });
      arw(S, 'a1', [20.4, 1.95], [20.4, 2.45], 1); arw(S, 'a2', [25.0, 1.95], [25.0, 2.45], 1);
      box(S, 'ex', 18.9, 2.5, 8.7, 1.0, ['추출: HMAC(salt, ·)', 'Extract: HMAC(salt, ·)'], 'accent', 1);
      arw(S, 'a3', [23.2, 3.55], [23.2, 4.05], 1);
      nd(S, 'prk', 21.2, 4.1, 4.0, 'PRK', 'ok', 1, { pct: 30 });
      lbl(S, 'prkn', 25.6, 4.3, ['균일한 32바이트', 'uniform 32 bytes'], '', 1);
      arw(S, 'a4', [23.2, 5.25], [23.2, 5.55], 2);
      box(S, 'xp', 18.9, 5.6, 8.7, 1.0, ['확장: HMAC(PRK, …)', 'Expand: HMAC(PRK, …)'], 'warn', 2);
      nd(S, 'info', 27.9, 5.6, 3.4, "info='key'", 'line', 2);
      arw(S, 'a5', [23.2, 6.65], [23.2, 7.05], 2);
      nd(S, 't1', 18.9, 7.1, 6.0, 'T₁', 'warn', 2, { pct: 20 }); nd(S, 't2', 25.1, 7.1, 6.0, 'T₂', 'warn', 2, { pct: 20 });
      nd(S, 'ke', 18.9, 8.6, 6.0, 'k_enc', 'accent', 3, { pct: 24 }); nd(S, 'km', 25.1, 8.6, 6.0, 'k_mac', 'ok', 3, { pct: 26 });
      lbl(S, 'n3', X, 10.0, ['용도마다 info를 달리하면 서로 독립인 키 · TLS 1.3 키 스케줄이 이 방식', 'a different info per purpose gives independent keys, as in the TLS 1.3 key schedule'], '', 3, { w: 12.7 });
      lines(S, 'cmp', X, 11.6, [[['HKDF: 이미 무작위인 비밀용 · 빠름', 'HKDF: for already-random secrets · fast'], 'g'], [['비밀번호: 엔트로피가 낮아 추측 가능', 'passwords: low entropy, easy to guess'], 'r'], [['→ Argon2id: 64MB·0.5초로 일부러 느리게', '→ Argon2id: slow on purpose (64 MB, 0.5 s)'], 'a']], 4, 0);
    },
    notes: [['키 교환으로 나온 공유 비밀은 고르게 무작위가 아닐 수 있어요 · HKDF는 먼저 HMAC으로 걸러 균일한 키 PRK를 뽑아요(추출)', 'a shared secret from key exchange may not be uniformly random, so HKDF first runs it through HMAC to extract a uniform key, the PRK'], ['PRK와 용도 문자열 info로 HMAC을 이어 돌려 필요한 만큼 키 재료를 늘려요(확장)', 'chained HMACs over the PRK and an info string expand it into as much key material as needed'], ['나온 바이트를 잘라 암호화 키, MAC 키, 방향별 키로 나눠요 · info가 다르면 서로 독립이에요', 'the output is sliced into encryption, MAC and per-direction keys, independent as long as the info differs'], ['비밀번호처럼 엔트로피가 낮은 입력에는 HKDF가 맞지 않아요 · Argon2, scrypt, bcrypt처럼 일부러 느리고 메모리를 많이 쓰는 KDF를 써요', 'low-entropy inputs like passwords need deliberately slow, memory-hard KDFs such as Argon2, scrypt or bcrypt, not HKDF']],
    fin: [['KDF: 하나의 비밀에서 용도별로 독립인 키를 안전하게 뽑아요', 'KDF: derive independent per-purpose keys from one secret', 'cyx-xs cyx-a'], ['HKDF = 추출 + 확장 (RFC 5869)', 'HKDF = extract + expand (RFC 5869)'], ['같은 키를 여러 용도에 그대로 쓰지 마세요', 'never reuse one key for several purposes']],
    caps: [['추출', 'Extract'], ['확장', 'Expand'], ['용도별 키', 'Per-purpose keys'], ['비밀번호는 다르게', 'Passwords are different'], ['키 유도 함수 HKDF', 'HKDF key derivation']]
  });
}

function sRsa() {
  const X = 18.7;
  return CW('cy-rsa', {
    code: ['p, q = 61, 53', ['n = p * q              # 3233 (공개)', 'n = p * q              # 3233 (public)'], ['phi = (p-1) * (q-1)    # 3120 (비밀)', 'phi = (p-1) * (q-1)    # 3120 (secret)'], ['e = 17                 # 공개 지수', 'e = 17                 # public exponent'], ['d = pow(e, -1, phi)    # 2753 (개인 키)', 'd = pow(e, -1, phi)    # 2753 (private)'], 'c = pow(65, e, n)      # 2790', 'pow(c, d, n)           # 65 ✓'],
    hl: [[0, 3], [3, 2, 'warn'], [5, 2, 'ok'], [1, 1, 'danger']],
    draw: (S) => {
      F(S, 'g1', X, .8, 'n = 61 × 53 = 3233', 'a', 1);
      F(S, 'g2', X, 1.8, 'φ(n) = 60 × 52 = 3120', '', 1);
      tbox(S, 'pub', 18.9, 3.2, 6.2, 2.3, ['공개 키', 'public key'], 'ok', 2, { tc: 'g' });
      F(S, 'pubv', 19.2, 4.4, '(n, e) = (3233, 17)', '', 2);
      tbox(S, 'prv', 25.5, 3.2, 5.9, 2.3, ['개인 키', 'private key'], 'danger', 2, { tc: 'r' });
      F(S, 'prvv', 25.8, 4.4, 'd = 2753', '', 2);
      F(S, 'ed', X, 6.0, 'ed = 46801 ≡ 1 (mod 3120)', '', 2);
      F(S, 'enc', X, 7.4, 'c = 65¹⁷ mod 3233 = 2790', 'a', 3);
      F(S, 'dec', X, 8.4, 'm = 2790²⁷⁵³ mod 3233 = 65 ✓', 'g', 3);
      lbl(S, 'n3', X, 9.5, ['누구나 암호화할 수 있고, d를 가진 사람만 복호화', 'anyone can encrypt; only the holder of d can decrypt'], '', 3, { w: 12.7 });
      lbl(S, 'n4', X, 11.0, ['n을 소인수분해하면 φ(n), 그리고 d가 바로 나와요', 'factor n and φ(n), then d, follow at once'], 'r', 4, { w: 12.7 });
      lbl(S, 'n4b', X, 12.2, ['3233 = 61 × 53은 쉽지만 2048비트 n은 지금 불가능', '3233 = 61 × 53 is easy; a 2048-bit n is out of reach'], '', 4, { w: 12.7 });
      lbl(S, 'n4c', X, 13.6, ['기록: RSA-250(829비트)을 2020년에 약 2700 코어-년으로', 'record: RSA-250 (829 bits) in 2020, about 2,700 core-years'], '', 4, { w: 12.7 });
      lbl(S, 'e65', 1, 9.6, ['e는 보통 65537(= 2¹⁶ + 1) · 여기서는 계산을 작게 하려고 17', 'e is usually 65537 (2¹⁶ + 1); 17 keeps the arithmetic small'], '', 2, { w: 16.5 });
    },
    notes: [['큰 소수 p, q를 몰래 골라 n = pq를 만들어요 · φ(n) = (p − 1)(q − 1)은 p, q를 아는 사람만 계산할 수 있어요', 'pick secret primes p and q and form n = pq; only someone who knows them can compute φ(n) = (p − 1)(q − 1)'], ['φ(n)과 서로소인 e를 공개하고, 확장 유클리드로 ed ≡ 1이 되는 d를 구해 개인 키로 둬요', 'publish an e coprime to φ(n), and use extended Euclid to find d with ed ≡ 1 as the private key'], ['암호화는 c = mᵉ mod n, 복호화는 cᵈ mod n · 오일러 정리 덕분에 원래 m = 65가 돌아와요', 'encrypt with c = mᵉ mod n and decrypt with cᵈ mod n; thanks to Euler’s theorem the original m = 65 returns'], ['n만 소인수분해하면 d가 바로 나와요 · 안전성은 큰 수의 소인수분해가 어렵다는 데 달려 있고, 지금은 2048비트 이상을 써요', 'factoring n hands over d, so security rests on the hardness of factoring, and keys today are 2048 bits or more']],
    fin: [['RSA: n = pq를 공개하고, p와 q로만 계산되는 d를 비밀로 둬요', 'RSA: publish n = pq and keep d, computable only from p and q', 'cyx-xs cyx-a'], ['교과서 RSA를 그대로 쓰면 안 돼요 · 패딩이 필수예요', 'never use textbook RSA directly; padding is required'], ['같은 수학으로 서명도 해요: s = mᵈ, 검증은 sᵉ', 'the same math signs: s = mᵈ, verified with sᵉ']],
    caps: [['키 만들기', 'Key generation'], ['공개 키와 개인 키', 'Public and private keys'], ['암호화와 복호화', 'Encrypt and decrypt'], ['안전성의 근거', 'Why it is secure'], ['RSA의 수학', 'The math of RSA']]
  });
}

function sRsaPad() {
  const X = 18.7;
  return CW('cy-rsapad', {
    code: ['c  = pow(65, 17, n)           # 2790', 'c2 = c * pow(2, 17, n) % n    # 3017', 'pow(c2, d, n)                 # 130 = 2 × 65', ['# 같은 m → 늘 같은 c (결정적)', '# same m → always the same c'], ['# OAEP: 무작위 seed로 섞은 뒤 암호화', '# OAEP: mix with a random seed first'], ['# 서명은 PSS, 암호화는 OAEP', '# PSS for signatures, OAEP for encryption']],
    hl: [[0, 2], [2, 1, 'danger'], [3, 1, 'warn'], [4, 2, 'ok']],
    draw: (S) => {
      lbl(S, 'a0', X, .8, ['교과서 RSA는 곱셈과 잘 어울려요', 'textbook RSA respects multiplication'], 'a', 1);
      F(S, 'a1', X, 1.8, 'Enc(a) · Enc(b) = (ab)ᵉ = Enc(ab)', '', 1);
      F(S, 'a2', X, 2.8, '2790 · 2¹⁷ ≡ 2790 · 1752 ≡ 3017', '', 1);
      lbl(S, 'b0', X, 4.2, ['암호문만 바꿨는데 복호화 결과가 2배', 'only the ciphertext changed, yet the plaintext doubled'], 'r', 2, { w: 12.7 });
      F(S, 'b1', X, 5.6, 'Dec(3017) = 130 = 2 × 65', 'r', 2);
      lbl(S, 'c0', X, 6.9, ['결정적이라 후보를 직접 암호화해 비교하면 m이 드러나요', 'being deterministic, encrypting guesses and comparing reveals m'], 'w', 3, { w: 12.7 });
      F(S, 'c1', X, 8.2, 'Enc("yes") = c ?', '', 3);
      lbl(S, 'd0', X, 9.4, ['OAEP', 'OAEP'], 'm a', 4);
      F(S, 'd1', X, 10.4, 'maskedDB = DB ⊕ MGF(seed)', '', 4);
      F(S, 'd2', X, 11.4, 'maskedSeed = seed ⊕ MGF(maskedDB)', '', 4);
      lbl(S, 'd3', X, 12.4, ['00 ‖ maskedSeed ‖ maskedDB를 RSA로', 'RSA-encrypt 00 ‖ maskedSeed ‖ maskedDB'], '', 4, { w: 12.7 });
      lbl(S, 'd4', X, 13.5, ['매번 다른 암호문 · 조작하면 구조가 깨져 거부', 'a fresh ciphertext every time; tampering breaks the structure'], 'g', 4, { w: 12.7 });
      lbl(S, 'bl', 1, 9.0, ['1998년 블라이헨바허 공격은 PKCS#1 v1.5 패딩 오류만으로 복호화했고, 2017년 ROBOT으로 다시 발견됐어요', 'Bleichenbacher’s 1998 attack decrypted using PKCS#1 v1.5 padding errors alone, and returned as ROBOT in 2017'], 'r', 4, { w: 16.5 });
    },
    notes: [['교과서 RSA는 Enc(a) · Enc(b) = Enc(ab) · 암호문끼리 곱하면 평문끼리 곱한 게 돼요', 'textbook RSA satisfies Enc(a) · Enc(b) = Enc(ab), so multiplying ciphertexts multiplies plaintexts'], ['공격자는 c에 2¹⁷을 곱하기만 해도 복호화 결과를 2배로 만들 수 있어요 · 금액이나 키를 몰래 조작하는 데 쓰여요', 'multiplying c by 2¹⁷ doubles the decrypted value, enough to tamper with amounts or keys unseen'], ['같은 평문은 늘 같은 암호문이라, “yes”처럼 후보가 적으면 직접 암호화해 비교하면 끝이에요', 'equal plaintexts give equal ciphertexts, so when candidates are few, like “yes”, encrypting and comparing gives it away'], ['OAEP는 무작위 seed와 마스크 함수로 평문을 섞은 뒤 암호화해요 · 매번 달라지고, 조작하면 구조가 깨져 거부돼요', 'OAEP mixes the message with a random seed and mask functions before encrypting, so every ciphertext differs and tampering breaks the structure']],
    fin: [['RSA 패딩: 암호화는 OAEP, 서명은 PSS · 교과서 RSA는 그대로 쓰면 안 돼요', 'RSA padding: OAEP for encryption, PSS for signatures, never textbook RSA', 'cyx-xs cyx-a'], ['오래된 PKCS#1 v1.5 암호화 패딩은 오라클 공격에 약해요', 'legacy PKCS#1 v1.5 encryption padding is oracle-prone'], ['요즘은 RSA로 데이터를 직접 암호화하지 않고 KEM·하이브리드를 써요', 'today RSA rarely encrypts data directly; KEMs and hybrids do']],
    caps: [['곱셈 성질', 'The multiplicative property'], ['암호문 조작', 'Tampering with ciphertext'], ['결정적 암호', 'Deterministic encryption'], ['OAEP 패딩', 'OAEP padding'], ['RSA 패딩', 'RSA padding']]
  });
}

function sEcc() {
  const px = x => 19.0 + (x + 1.6) * 3.3, py = y => 6.6 - y * 2.0;
  const fx = x => x * x * x - x + 1, r0 = -1.32472;
  const xs = []; for (let i = 0; i <= 40; i++) { const t = i / 40; xs.push(r0 + (2.0 - r0) * t * t); }
  const up = xs.map(x => [px(x), py(Math.sqrt(Math.max(0, fx(x))))]).reverse(), dn = xs.map(x => [px(x), py(-Math.sqrt(Math.max(0, fx(x))))]);
  const X = 18.7;
  return CW('cy-ecc', {
    code: ['# y² = x³ + ax + b  (mod p)', 'P + Q:  λ = (y₂ - y₁) / (x₂ - x₁)', '        x₃ = λ² - x₁ - x₂', '        y₃ = λ(x₁ - x₃) - y₁', '2P:     λ = (3x₁² + a) / (2y₁)', ['kP: 두 배와 덧셈을 반복 (약 log k번)', 'kP: double and add (about log k steps)'], '# P-256, secp256k1, Curve25519'],
    hl: [[0, 1], [1, 3, 'warn'], [4, 1, 'danger'], [5, 2, 'ok']],
    draw: (S) => {
      hl(S, 'ax', 19.0, 31.2, py(0), 'ink-3', 0, { w: .06 }); vl(S, 'ay', px(0), .9, 12.3, 'ink-3', 0, { w: .06 });
      poly(S, 'cv', up.concat(dn.slice(1)), { st: 0, color: 'accent', h: .1 });
      pt(S, 'P', px(-1), py(1), 1, C.cur, .28); pt(S, 'Q', px(0), py(1), 1, C.cur, .28);
      F(S, 'Pl', px(-1) - .9, py(1) - 1.1, 'P', 'a', 1); F(S, 'Ql', px(0) + .3, py(1) - 1.1, 'Q', 'a', 1);
      hl(S, 'ln', 19.2, 30.8, py(1), 'warn', 2, { w: .08 });
      pt(S, 'R', px(1), py(1), 2, C.warn, .26); F(S, 'Rl', px(1) + .3, py(1) - 1.1, 'R', 'w', 2);
      vl(S, 'rf', px(1), py(1), py(-1), 'ok', 2, { dash: 1, w: .08 });
      pt(S, 'PQ', px(1), py(-1), 2, C.okf, .3); F(S, 'PQl', px(1) + .4, py(-1) - 1.2, 'P + Q', 'g', 2);
      seg(S, 'tg', [px(-1.6), py(1.8)], [px(2.0), py(0)], 3, 'danger', .08);
      pt(S, 'T', px(.25), py(.875), 3, C.bad, .24);
      vl(S, 'tf', px(.25), py(.875), py(-.875), 'danger', 3, { dash: 1, w: .08 });
      pt(S, 'Q2', px(.25), py(-.875), 3, C.badf, .3); F(S, 'Q2l', px(.25) + .4, py(-.875) + .35, '2Q', 'r', 3);
      lbl(S, 't1', X, 12.7, ['y² = x³ − x + 1 위의 두 점 P(−1, 1), Q(0, 1)', 'two points P(−1, 1), Q(0, 1) on y² = x³ − x + 1'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 't2', X, 12.7, ['직선 PQ가 R(1, 1)에서 다시 만나고, 뒤집으면 P + Q = (1, −1)', 'line PQ meets the curve again at R(1, 1); reflect: P + Q = (1, −1)'], 'g', 2, { off: 3, w: 12.7 });
      lbl(S, 't3', X, 12.7, ['Q의 접선이 (¼, ⅞)에서 만나고, 뒤집으면 2Q = (¼, −⅞)', 'the tangent at Q meets at (¼, ⅞); reflect: 2Q = (¼, −⅞)'], 'r', 3, { off: 4, w: 12.7 });
      lbl(S, 't4', X, 12.7, ['실제로는 mod p 위의 점 · kP에서 k 찾기(ECDLP)가 어려워요', 'in practice points live mod p, and finding k from kP (ECDLP) is hard'], 'a', 4, { w: 12.7 });
      lbl(S, 'l4', 1, 9.6, ['256비트 타원곡선 ≈ 3072비트 RSA와 같은 안전성 · 키와 서명이 훨씬 작아요', 'a 256-bit curve ≈ 3072-bit RSA in strength, with much smaller keys and signatures'], '', 4, { w: 16.5 });
      lbl(S, 'l4b', 1, 11.4, ['곡선: P-256(NIST), secp256k1(비트코인), Curve25519(X25519, Ed25519)', 'curves: P-256 (NIST), secp256k1 (Bitcoin), Curve25519 (X25519, Ed25519)'], '', 4, { w: 16.5 });
    },
    notes: [['타원곡선은 y² = x³ + ax + b를 만족하는 점들의 집합이에요 · 이 점들 사이에 덧셈을 정의할 수 있어요', 'an elliptic curve is the set of points satisfying y² = x³ + ax + b, and these points can be added'], ['P와 Q를 잇는 직선은 곡선과 한 점 R에서 더 만나요 · R을 x축에 대해 뒤집은 점이 P + Q예요', 'the line through P and Q meets the curve at one more point R, and reflecting R across the x-axis gives P + Q'], ['같은 점을 더할 때는 접선을 써요 · 두 배와 덧셈을 반복하면 kP를 log k번 정도에 계산해요', 'adding a point to itself uses the tangent, and repeated doubling and adding computes kP in about log k steps'], ['암호에서는 소수 p로 나눈 나머지 위에서 계산해요 · kP는 쉽게 구하지만 kP에서 k를 찾기는 매우 어려워요', 'cryptography works modulo a prime p, where kP is easy to compute but recovering k from kP is very hard']],
    fin: [['타원곡선 암호: 점 덧셈과 ECDLP의 어려움으로 짧은 키에 높은 안전성', 'elliptic curves: point addition and a hard ECDLP give strong security with short keys', 'cyx-xs cyx-a'], ['X25519는 키 교환, Ed25519와 ECDSA는 서명에 써요', 'X25519 handles key exchange; Ed25519 and ECDSA sign'], ['곡선 밖의 점은 거부해야 해요 (잘못된 곡선 공격)', 'reject points that are not on the curve (invalid-curve attacks)']],
    caps: [['곡선 위의 점', 'Points on the curve'], ['P + Q', 'P + Q'], ['두 배 하기', 'Doubling'], ['유한체와 ECDLP', 'Finite fields and the ECDLP'], ['타원곡선', 'Elliptic curves']]
  });
}

function sEcdsa() {
  const X = 18.7;
  return CW('cy-ecdsa', {
    code: [['k = random_below(n)         # 매번 새 nonce', 'k = random_below(n)         # fresh nonce'], 'R = k * G;  r = R.x % n', 's = inv(k, n) * (z + r * d) % n', ['# 검증: (z/s)·G + (r/s)·Q 의 x == r', '# verify: x of (z/s)·G + (r/s)·Q == r'], ['# 같은 k로 두 번 서명하면:', '# sign twice with the same k:'], 'k = (z1 - z2) * inv(s1 - s2, n) % n', 'd = (s1 * k - z1) * inv(r, n) % n'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 3, 'danger'], [0, 1, 'warn']],
    draw: (S) => {
      F(S, 's1', X, .8, 'R = kG,   r = R.x mod n', 'a', 1);
      F(S, 's2', X, 1.8, 's = k⁻¹(z + rd) mod n', 'a', 1);
      lbl(S, 's3', X, 2.9, ['서명 = (r, s) · z = H(m), d = 개인 키', 'signature = (r, s); z = H(m), d = private key'], '', 1, { w: 12.7 });
      F(S, 'v1', X, 4.3, 'u₁ = z · s⁻¹,   u₂ = r · s⁻¹', '', 2);
      F(S, 'v2', X, 5.3, '(u₁G + u₂Q).x = r ?', '', 2);
      lbl(S, 'v3', X, 6.4, ['공개 키 Q = dG만으로 확인해요', 'checked with only the public key Q = dG'], 'g', 2, { w: 12.7 });
      nd(S, 'g1', 18.9, 7.8, 6.0, '(r, s₁) · m₁', 'danger', 3, { pct: 22 }); nd(S, 'g2', 25.1, 7.8, 6.0, '(r, s₂) · m₂', 'danger', 3, { pct: 22 });
      lbl(S, 'kq0', X, 9.2, ['r이 같다 = k가 같다', 'same r = same k'], 'r', 3);
      F(S, 'kq1', X, 10.2, 'k = (z₁ − z₂) / (s₁ − s₂)', '', 3);
      F(S, 'kq2', X, 11.2, 'd = (s₁k − z₁) / r', 'r', 3);
      lbl(S, 'i4', X, 12.5, ['2010년 PS3 서명 키와 2013년 안드로이드 비트코인 지갑이 이렇게 털렸어요', 'the PS3 signing key (2010) and Android Bitcoin wallets (2013) leaked this way'], 'r', 4, { w: 12.7 });
      lbl(S, 'f4', 1, 10.2, ['대책: k를 개인 키와 메시지에서 결정적으로 유도해요(RFC 6979) · Ed25519는 처음부터 그렇게 설계됐어요', 'fix: derive k deterministically from the key and message (RFC 6979); Ed25519 was designed that way'], 'g', 4, { w: 16.5 });
    },
    notes: [['ECDSA는 서명할 때마다 비밀 난수 k로 점 R = kG를 만들고, r과 s를 계산해요', 'ECDSA picks a secret random k for every signature, computes R = kG, and derives r and s'], ['검증은 공개 키 Q만으로 u₁G + u₂Q를 계산해 x좌표가 r과 같은지 봐요', 'verification uses only the public key Q, checking that u₁G + u₂Q has x-coordinate r'], ['같은 k로 두 메시지에 서명하면 r이 같아져요 · 두 식을 빼면 k가, 그다음 개인 키 d가 그대로 나와요', 'signing two messages with the same k repeats r, and subtracting the equations yields k and then the private key d'], ['k가 조금만 치우쳐도 격자 공격으로 키가 새요 · 그래서 k를 결정적으로 만들거나 Ed25519를 써요', 'even slightly biased k values leak the key through lattice attacks, so k is derived deterministically or Ed25519 is used']],
    fin: [['ECDSA: 서명마다 k가 비밀이고 유일해야 해요 · 한 번만 겹쳐도 개인 키가 나가요', 'ECDSA: k must be secret and unique per signature; one repeat leaks the private key', 'cyx-xs cyx-a'], ['RFC 6979: 결정적 k 생성', 'RFC 6979: deterministic k'], ['비트코인·이더리움 거래는 secp256k1 ECDSA로 서명해요', 'Bitcoin and Ethereum transactions are signed with ECDSA on secp256k1']],
    caps: [['서명 만들기', 'Signing'], ['검증', 'Verifying'], ['k를 다시 쓰면', 'Reusing k'], ['실제 사고와 대책', 'Real incidents, real fixes'], ['ECDSA', 'ECDSA']]
  });
}

function sFs() {
  const SX = [1.2, 8.1, 15.0];
  return CW('cy-fs', {
    draw: (S) => {
      nd(S, 'eve', 1, 1.0, 10.8, ['이브: 암호문을 모두 녹화', 'Eve records every ciphertext'], 'danger', 1, { pct: 18 });
      hl(S, 'tl', 1, 31, 5.0, 'ink-3', 1, { w: .08 });
      SX.forEach((x, i) => { nd(S, 'ss' + i, x, 3.4, 6.6, [`세션 ${i + 1}`, `session ${i + 1}`], 'accent', 1, { pct: 14 }); arw(S, 'up' + i, [x + 3.3, 3.35], [x + 3.3, 2.15], 1, { color: 'danger', dash: 1 }); });
      lbl(S, 'ra', 1, 6.4, ['RSA 키 전송', 'RSA key transport'], 'a', 2);
      SX.forEach((x, i) => nd(S, 'a' + i, x, 7.3, 6.6, ['키 = RSA(서버 키)', 'key = RSA(server)'], 'line', 2));
      lbl(S, 'ran', 1, 8.8, ['세션 키가 서버의 장기 키로 암호화돼 함께 녹화돼요', 'each session key travels encrypted under the server’s long-term key'], '', 2, { off: 3, w: 22 });
      vl(S, 'lk', 24, 2.2, 9.2, 'danger', 3, { dash: 1, w: .1 });
      nd(S, 'leak', 21.0, 1.0, 10.4, ['나중에 서버 키 유출', 'later: the server key leaks'], 'danger', 3, { pct: 26 });
      SX.forEach((x, i) => nd(S, 'ad' + i, x, 7.3, 6.6, ['해독됨 ✗', 'decrypted ✗'], 'danger', 3, { pct: 26 }));
      lbl(S, 'rbad', 1, 8.8, ['장기 키 하나로 녹화된 모든 세션이 풀려요', 'one long-term key unlocks every recorded session'], 'r', 3, { w: 22 });
      lbl(S, 'rb', 1, 10.0, ['ECDHE (임시 키)', 'ECDHE (ephemeral keys)'], 'g', 4);
      SX.forEach((x, i) => nd(S, 'b' + i, x, 10.9, 6.6, ['새 키 → 쓰고 삭제', 'new key, erased'], 'ok', 4, { pct: 24 }));
      lbl(S, 'rbn', 1, 12.4, ['유출된 서버 키로는 앞으로의 서명 위조만 가능 · 지난 세션은 안전해요', 'the leaked key can only forge future signatures; past sessions stay safe'], 'g', 4, { w: 30 });
    },
    notes: [['도청자는 지금 풀 수 없는 암호문도 일단 모두 저장해 둘 수 있어요', 'an eavesdropper can store ciphertext today even if it cannot read it yet'], ['RSA 키 전송 방식은 클라이언트가 세션 키를 서버의 공개 키로 암호화해 보내요 · 서버의 장기 키 하나가 모든 세션을 지켜요', 'with RSA key transport the client encrypts the session key under the server’s public key, so one long-term key guards every session'], ['나중에 서버 개인 키가 새면 녹화해 둔 세션이 한꺼번에 풀려요', 'if that private key leaks later, every recorded session can be decrypted at once'], ['ECDHE는 세션마다 새 키 쌍으로 공유 비밀을 만들고 바로 지워요 · 장기 키는 서명에만 쓰여서 새도 지난 세션은 안전해요', 'ECDHE makes a fresh key pair per session and erases it afterward, while the long-term key only signs, so past sessions stay safe']],
    fin: [['순방향 비밀성: 장기 키가 새도 지난 대화는 풀리지 않아요', 'forward secrecy: a leaked long-term key does not unlock past conversations', 'cyx-xs cyx-a'], ['TLS 1.3은 RSA 키 전송을 없애고 (EC)DHE만 남겼어요', 'TLS 1.3 removed RSA key transport and kept only (EC)DHE'], ['메신저의 래칫은 이걸 메시지마다 반복해요', 'messenger ratchets repeat this for every message']],
    caps: [['일단 녹화', 'Record everything'], ['장기 키 하나에 의존', 'One long-term key'], ['키 유출', 'The key leaks'], ['임시 키 ECDHE', 'Ephemeral ECDHE'], ['순방향 비밀성', 'Forward secrecy']]
  });
}

function sHybrid() {
  const X = 18.7;
  return CW('cy-hybrid', {
    code: [['ss, enc = kem.encap(bob_pub)    # 공유 비밀', 'ss, enc = kem.encap(bob_pub)    # shared key'], "key = hkdf(ss, info=b'file')", ['ct = aead(key, nonce, data)     # 1GB도 빠르게', 'ct = aead(key, nonce, data)     # 1 GB is fine'], ['send(enc, nonce, ct)            # enc 32바이트', 'send(enc, nonce, ct)            # enc: 32 B'], ['# 밥: ss = kem.decap(bob_priv, enc)', '# Bob: ss = kem.decap(bob_priv, enc)'], ['# → 같은 key → 복호화', '# → the same key → decrypt']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 3, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      lbl(S, 'al', 18.9, .1, ['앨리스', 'Alice'], 'a', 1); lbl(S, 'bl', 26.0, .1, ['밥', 'Bob'], 'g', 3);
      nd(S, 'pub', 18.9, .8, 4.0, 'bob_pub', 'ok', 1, { pct: 24 });
      arw(S, 'a1', [20.9, 1.95], [20.9, 2.25], 1);
      box(S, 'kem', 18.9, 2.3, 5.5, 1.0, ['KEM 캡슐화', 'KEM encap'], 'accent', 1);
      arw(S, 'a2', [20.1, 3.35], [20.1, 3.75], 1); arw(S, 'a3', [23.0, 3.35], [23.0, 3.75], 1);
      nd(S, 'ss', 18.9, 3.8, 2.4, 'ss', 'warn', 1, { pct: 30 }); nd(S, 'enc', 21.6, 3.8, 2.8, 'enc', 'line', 1);
      arw(S, 'a4', [20.1, 4.95], [20.1, 5.15], 2);
      box(S, 'kd', 18.9, 5.2, 2.6, .9, 'HKDF', 'warn', 2);
      arw(S, 'a5', [20.2, 6.15], [20.2, 6.45], 2);
      nd(S, 'key', 18.9, 6.5, 2.6, 'key', 'warn', 2, { pct: 30 }); nd(S, 'dt', 21.9, 6.5, 2.5, 'data', 'line', 2);
      arw(S, 'a6', [20.2, 7.65], [20.2, 7.75], 2); arw(S, 'a7', [23.1, 7.65], [23.1, 7.75], 2);
      box(S, 'ae', 18.9, 7.8, 5.5, .9, 'AES-GCM', 'accent', 2);
      arw(S, 'a8', [21.6, 8.75], [21.6, 9.05], 2);
      nd(S, 'ct', 18.9, 9.1, 5.5, 'ct (1 GB)', 'line', 2);
      arw(S, 's1', [24.5, 4.35], [25.9, 4.35], 3, { color: 'ok' }); arw(S, 's2', [24.5, 9.65], [25.9, 9.65], 3, { color: 'ok' });
      nd(S, 'enc2', 26.0, 3.8, 2.8, 'enc', 'line', 3);
      box(S, 'dk', 26.0, 5.2, 5.3, .9, 'decap(priv)', 'ok', 3);
      nd(S, 'key2', 26.0, 6.5, 2.6, 'key', 'warn', 3, { pct: 30 });
      nd(S, 'pt2', 26.0, 7.8, 5.3, ['data ✓', 'data ✓'], 'ok', 3, { pct: 26 });
      nd(S, 'ct2', 26.0, 9.1, 5.3, 'ct', 'line', 3);
      lbl(S, 'n4', X, 10.6, ['공개키 연산은 32바이트에 한 번 · 데이터는 대칭키로 GB/s', 'one public-key op on 32 bytes; the data moves at GB/s'], 'g', 4, { w: 12.7 });
      lbl(S, 'n4b', X, 12.1, ['TLS, PGP, HPKE(RFC 9180), 클라우드 KMS의 봉투 암호화', 'TLS, PGP, HPKE (RFC 9180) and cloud KMS envelope encryption'], '', 4, { w: 12.7 });
      lbl(S, 'n4c', 1, 9.0, ['RSA로 1GB를 직접 암호화하면 256바이트 조각 400만 개 · 느리고 패딩 위험까지 따라와요', 'RSA-encrypting 1 GB directly means 4 million 256-byte chunks: slow, with padding risks'], 'r', 4, { w: 16.5 });
    },
    notes: [['공개키 암호는 느리고 한 번에 작은 값만 다뤄요 · 그래서 KEM으로 무작위 공유 비밀 ss와 캡슐 enc만 만들어요', 'public-key crypto is slow and handles only small values, so a KEM produces just a random shared secret ss and a capsule enc'], ['ss를 HKDF로 대칭키로 바꾸고, 실제 데이터는 AES-GCM 같은 AEAD로 암호화해요', 'HKDF turns ss into a symmetric key, and the actual data is encrypted with an AEAD such as AES-GCM'], ['캡슐 enc와 암호문을 함께 보내면, 밥은 개인 키로 enc를 열어 같은 ss와 키를 얻어요', 'Alice sends enc with the ciphertext, and Bob opens enc with his private key to get the same ss and key'], ['공개키 연산은 한 번, 대량 데이터는 빠른 대칭키로 · 거의 모든 실제 시스템이 이 조합을 써요', 'one public-key operation, bulk data on fast symmetric crypto: nearly every real system combines them this way']],
    fin: [['하이브리드 암호: 공개키로 키만 나르고, 데이터는 대칭키로', 'hybrid encryption: public-key crypto carries the key, symmetric crypto carries the data', 'cyx-xs cyx-a'], ['KEM-DEM 구조라고도 불러요', 'also called the KEM-DEM paradigm'], ['ML-KEM 같은 양자내성 KEM도 그대로 끼워 넣을 수 있어요', 'post-quantum KEMs like ML-KEM slot right in']],
    caps: [['KEM으로 공유 비밀', 'A shared secret via KEM'], ['대칭키로 데이터', 'Data under a symmetric key'], ['밥이 열기', 'Bob opens it'], ['왜 섞어 쓰나', 'Why combine them'], ['하이브리드 암호', 'Hybrid encryption']]
  });
}
/* ===== Cryptography · 6. modern applications ===== */
function sZkp() {
  const X = 18.7;
  return CW('cy-zkp', {
    code: [['p, g, x = 23, 5, 6          # x는 비밀', 'p, g, x = 23, 5, 6          # x is secret'], ['y = pow(g, x, p)            # 8 (공개)', 'y = pow(g, x, p)            # 8 (public)'], ['r = 3;  t = pow(g, r, p)    # 10  약속', 'r = 3;  t = pow(g, r, p)    # 10  commit'], ['c = 4                       # 도전', 'c = 4                       # challenge'], ['s = (r + c * x) % 22        # 5   응답', 's = (r + c * x) % 22        # 5   response'], 'pow(g, s, p) == t * pow(y, c, p) % p   # True'],
    hl: [[0, 3], [3, 1, 'warn'], [4, 2, 'ok'], [5, 1, 'accent']],
    draw: (S) => {
      box(S, 'pv', 18.9, .6, 5.0, 1.2, ['증명자', 'prover'], 'accent', 1); box(S, 'vf', 26.3, .6, 5.0, 1.2, ['검증자', 'verifier'], 'ok', 1);
      vl(S, 'lp', 21.4, 1.85, 8.0, 'ink-3', 1, { dash: 1, w: .08 }); vl(S, 'lv', 28.8, 1.85, 8.0, 'ink-3', 1, { dash: 1, w: .08 });
      F(S, 'm1', 22.4, 2.0, 't = gʳ = 10', 'w', 1); arw(S, 'a1', [21.5, 3.0], [28.7, 3.0], 1, { color: 'warn' });
      F(S, 'm2', 24.2, 3.7, 'c = 4', 'a', 2); arw(S, 'a2', [28.7, 4.7], [21.5, 4.7], 2, { color: 'accent' });
      F(S, 'm3', 22.0, 5.4, 's = r + cx = 27 ≡ 5', 'g', 3); arw(S, 'a3', [21.5, 6.4], [28.7, 6.4], 3, { color: 'ok' });
      F(S, 'm4', 22.4, 7.0, 'gˢ = 20 = t · yᶜ ✓', 'g', 3);
      lbl(S, 'n1', X, 9.2, ['약속: 무작위 r로 t = gʳ를 보내요 · y = gˣ = 8은 공개', 'commit: send t = gʳ for a random r; y = gˣ = 8 is public'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 9.2, ['도전: t를 받은 뒤에 검증자가 무작위 c를 골라요', 'challenge: after receiving t, the verifier picks a random c'], 'a', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 9.2, ['응답 s = r + cx · 검증: 5⁵ = 20, 10 · 8⁴ ≡ 20', 'response s = r + cx; check: 5⁵ = 20 and 10 · 8⁴ ≡ 20'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 9.2, [[['r이 무작위라 s도 무작위처럼 보여 x가 새지 않아요', 'r is random, so s looks random and hides x'], 'cyx-wr', { lh: 1.8 }], [['c를 미리 알면 x 없이도 속일 수 있어서 c는 t 다음에', 'knowing c early would let a cheater fake it, so c comes after t'], 'w cyx-wr', { lh: 1.8 }], [['c = H(t, m)으로 바꾸면 슈노어 서명 (피아트-샤미르)', 'set c = H(t, m) and it becomes a Schnorr signature (Fiat–Shamir)'], 'g cyx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
      lbl(S, 'sn', 1, 9.0, ['zk-SNARK는 “이 계산을 올바르게 했다”를 수백 바이트로 증명해요 · 블록체인 롤업, 신원 증명에 써요', 'zk-SNARKs prove “this computation was done correctly” in a few hundred bytes, used by blockchain rollups and identity proofs'], '', 4, { w: 16.5 });
    },
    notes: [['증명자는 y = gˣ의 비밀 x를 안다는 걸 x를 보여 주지 않고 증명하려 해요 · 먼저 무작위 r로 t = gʳ를 보내 약속해요', 'the prover wants to show it knows the x behind y = gˣ without revealing it, and starts by committing to t = gʳ for a random r'], ['검증자는 t를 받은 뒤에 무작위 도전값 c를 골라 보내요 · 이 순서가 중요해요', 'only after receiving t does the verifier choose a random challenge c, and that order matters'], ['증명자는 s = r + cx를 보내고, 검증자는 gˢ = t · yᶜ인지 확인해요 · x를 모르면 맞는 s를 만들 수 없어요', 'the prover replies s = r + cx and the verifier checks gˢ = t · yᶜ; without x no valid s can be produced'], ['r이 무작위라 s는 x에 대해 아무것도 알려 주지 않아요 · 검증자가 본 대화는 x 없이도 똑같이 만들어 낼 수 있어서 영지식이에요', 'because r is random, s reveals nothing about x; the whole transcript could be simulated without x, which is what makes it zero-knowledge']],
    fin: [['영지식 증명: 비밀을 안다는 사실만 증명하고 비밀 자체는 하나도 새지 않아요', 'zero-knowledge proof: prove you know a secret while revealing nothing about it', 'cyx-xs cyx-a'], ['완전성·건전성·영지식, 세 성질을 만족해야 해요', 'it must be complete, sound and zero-knowledge'], ['슈노어 서명과 Ed25519가 이 구조에서 나왔어요', 'Schnorr signatures and Ed25519 grew from this protocol']],
    caps: [['약속', 'Commit'], ['도전', 'Challenge'], ['응답과 검증', 'Respond and verify'], ['왜 새지 않나', 'Why nothing leaks'], ['영지식 증명', 'Zero-knowledge proof']]
  });
}

function sShamir() {
  const X = 18.7, x0 = 19.4, yb = 12.0, sx = 11.6 / 6.5, sy = 11 / 6000;
  const P = (x, y) => [x0 + x * sx, yb - y * sy];
  const f = x => 1234 + 166 * x + 94 * x * x;
  const g = c => x => 1942 + 730 * (x - 2) + c * (x - 2) * (x - 4);
  return CW('cy-shamir', {
    code: ['f = lambda x: 1234 + 166*x + 94*x**2', 'shares = [(i, f(i)) for i in range(1, 7)]', '# (1,1494) (2,1942) … (6,5614)', 'lagrange([(2,1942), (4,3402), (5,4414)])', ['# → f(0) = 1234   3개면 복원', '# → f(0) = 1234: any 3 recover it'], ['# 2개로는 무엇이든 될 수 있어요', '# 2 shares fit any secret at all']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 2, 'ok'], [5, 1, 'danger']],
    draw: (S) => {
      vl(S, 'ay', x0, .8, yb + .05, 'ink-3', 0, { w: .08 }); hl(S, 'ax', x0, 31.2, yb, 'ink-3', 0, { w: .08 });
      F(S, 'lx', 30.7, yb - .9, 'x', '', 0);
      pplot(S, 'cv', t => P(t, f(t)), 0, 6.5, { st: 1, color: 'accent', h: .1, n: 26 });
      const [sx0, sy0] = P(0, 1234); pt(S, 'sec', sx0, sy0, 1, C.okf, .3);
      F(S, 'secl', sx0 + .6, sy0 + .3, 'S = f(0) = 1234', 'g', 1);
      [1, 2, 3, 4, 5, 6].forEach(i => { const [a, b] = P(i, f(i)); pt(S, 'sh' + i, a, b, 2, [2, 4, 5].includes(i) ? C.cur : C.cur, .22); });
      [2, 4, 5].forEach(i => { const [a, b] = P(i, f(i)); ring(S, 'hr' + i, a, b, .45, 'ok', 3, { w: .12 }); });
      pplot(S, 'g1', t => P(t, g(200)(t)), 0, 5.7, { st: 4, color: 'danger', h: .07, n: 20 });
      pplot(S, 'g2', t => P(t, g(0)(t)), 0, 6.5, { st: 4, color: 'warn', h: .07, n: 8 });
      lbl(S, 'n1', X, 12.5, ['비밀 S를 상수항에 · 2차식이라 점 3개로 결정돼요', 'the secret S is the constant term; 3 points fix a quadratic'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 12.5, ['참가자 6명에게 f(1)…f(6)을 하나씩 나눠 줘요', 'six participants each get one of f(1)…f(6)'], '', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 12.5, ['아무 3명이 모이면 라그랑주 보간으로 f(0) = 1234', 'any 3 together interpolate f(0) = 1234'], 'g', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 12.5, ['2명뿐이면 지나는 포물선이 무수히 많아 비밀은 어떤 값이든 될 수 있어요', 'with 2 shares endless parabolas fit, so the secret could be anything'], 'r', 4, { w: 12.7 });
      lbl(S, 'l4', 1, 9.0, ['실제로는 정수 대신 소수 p로 나눈 나머지 위에서 계산해요 · 그래야 2개로는 정말 아무 정보도 없어요', 'real implementations work modulo a prime p, so 2 shares carry truly zero information'], '', 4, { w: 16.5 });
      lbl(S, 'l4b', 1, 11.2, ['쓰임: 키 백업, 임계 서명, DNSSEC 루트 키, 암호화폐 지갑', 'used for key backup, threshold signatures, the DNSSEC root key and crypto wallets'], '', 4, { w: 16.5 });
    },
    notes: [['비밀 1234를 2차식 f(x)의 상수항에 숨기고, 나머지 계수는 무작위로 골라요', 'hide the secret 1234 as the constant term of a quadratic f(x) with random other coefficients'], ['f(1)부터 f(6)까지 여섯 조각을 한 명씩 나눠 줘요 · 조각 하나만으로는 아무것도 알 수 없어요', 'hand out six shares f(1) through f(6), one per person; no single share reveals anything'], ['2차식은 점 3개로 결정되니 아무나 3명만 모이면 라그랑주 보간으로 f(0) = 1234를 되찾아요', 'three points fix a quadratic, so any three people recover f(0) = 1234 by Lagrange interpolation'], ['2명뿐이면 두 점을 지나는 포물선이 무수히 많아서 비밀에 대한 정보가 전혀 없어요 · 정보 이론적으로 안전해요', 'two shares fit infinitely many parabolas, giving no information at all about the secret: information-theoretic security']],
    fin: [['샤미르 비밀 분산: n명 중 아무 k명이면 복원, k − 1명으로는 아무것도 몰라요', 'Shamir secret sharing: any k of n recover it, while k − 1 learn nothing', 'cyx-xs cyx-a'], ['조각을 잃어도 k개만 남으면 괜찮아요', 'losing shares is fine while k remain'], ['위조 조각이 걱정되면 검증 가능한 비밀 분산을 써요', 'verifiable secret sharing catches forged shares']],
    caps: [['비밀을 다항식에', 'Hide the secret in a polynomial'], ['조각 나눠 주기', 'Hand out shares'], ['3명이면 복원', 'Three recover it'], ['2명으로는 불가능', 'Two learn nothing'], ['샤미르 비밀 분산', 'Shamir secret sharing']]
  });
}

function sHe() {
  const X = 18.7;
  return CW('cy-he', {
    code: ['enc = lambda m: pow(m, 17, 3233)', 'a, b = enc(5), enc(13)        # 3086, 47', 'a * b % 3233                  # 2790', 'pow(2790, 2753, 3233)         # 65 = 5 × 13', ['# 서버는 5도 13도 모른 채 곱했어요', '# the server multiplied, never seeing 5 or 13'], ['# FHE: 덧셈과 곱셈 모두 → 어떤 계산이든', '# FHE: add and multiply → any computation']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 2, 'ok'], [5, 1, 'accent']],
    draw: (S) => {
      box(S, 'cl', 18.9, .6, 5.2, 1.0, ['클라이언트', 'client'], 'accent', 1); box(S, 'sv', 26.1, .6, 5.2, 1.0, ['서버', 'server'], 'warn', 1);
      [[2.2, '5', '3086'], [3.5, '13', '47']].forEach(([y, m, c], i) => {
        nd(S, 'm' + i, 18.9, y, 1.6, m, 'ok', 1, { pct: 24 }); arw(S, 'e' + i, [20.6, y + .55], [21.0, y + .55], 1);
        nd(S, 'c' + i, 21.1, y, 3.0, c, 'line', 1); arw(S, 's' + i, [24.2, y + .55], [26.0, y + .55], 1);
        nd(S, 'd' + i, 26.1, y, 3.0, c, 'line', 1);
      });
      F(S, 'op', 26.1, 4.9, '3086 × 47 mod 3233', '', 2);
      nd(S, 'r', 26.1, 5.9, 3.0, '2790', 'warn', 2, { pct: 30 });
      arw(S, 'bk', [26.0, 6.45], [24.2, 6.45], 3);
      nd(S, 'r2', 21.1, 5.9, 3.0, '2790', 'warn', 3, { pct: 30 });
      arw(S, 'dc', [22.6, 7.05], [22.6, 7.25], 3);
      nd(S, 'pt', 19.6, 7.3, 6.0, '65 = 5 × 13', 'ok', 3, { pct: 30 });
      lbl(S, 'n1', X, 8.8, ['데이터를 암호화해서 서버에 맡겨요', 'the client encrypts its data and hands it to the server'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 8.8, ['서버는 암호문끼리 곱하기만 해요 · 5도 13도 볼 수 없어요', 'the server just multiplies ciphertexts, never seeing 5 or 13'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 8.8, ['돌려받은 2790을 복호화하면 65 = 5 × 13', 'decrypting the returned 2790 gives 65 = 5 × 13'], 'g', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 8.8, ['FHE(완전 동형): 덧셈과 곱셈 모두', 'FHE (fully homomorphic): both add and multiply'], 'a', 4, { w: 12.7 });
      [[2.0, 'ok', '+'], [5.0, 'warn', '×'], [9.0, 'danger', '× ×']].forEach(([w, c, t], i) => { rect(S, 'nb' + i, 19.0, 10.2 + i * .7, w, .5, c, 50, 4, { r: .25 }); T(S, 'nt' + i, 19.2 + w, 10.0 + i * .7, t, 'cz-mono cyx-xs', 4); });
      lbl(S, 'n4b', X, 12.5, ['연산마다 잡음이 커져요 → 부트스트래핑으로 다시 줄여요', 'noise grows with each operation → bootstrapping shrinks it'], '', 4, { w: 12.7 });
      lbl(S, 'n4c', X, 13.9, ['아직 느려요: 평문 계산보다 수천~수백만 배', 'still slow: thousands to millions of times plaintext speed'], 'r', 4, { w: 12.7 });
      lbl(S, 'l4', 1, 9.0, ['쓰임: 암호화된 의료 데이터로 모델 추론, 비공개 검색, 투표 집계 · Paillier 같은 부분 동형 암호는 덧셈만 돼요', 'uses: model inference on encrypted medical data, private search, vote tallies; partially homomorphic schemes like Paillier only add'], '', 4, { w: 16.5 });
    },
    notes: [['동형 암호는 암호문 상태 그대로 계산할 수 있는 암호예요 · 교과서 RSA로 5와 13을 암호화해 서버에 보내요', 'homomorphic encryption lets you compute on ciphertexts; here textbook RSA encrypts 5 and 13 before sending them'], ['서버는 3086 × 47 mod 3233 = 2790을 계산해요 · 평문을 전혀 보지 않고 곱셈을 해냈어요', 'the server computes 3086 × 47 mod 3233 = 2790, multiplying without ever seeing a plaintext'], ['클라이언트가 2790을 복호화하면 65 = 5 × 13 · RSA 패딩 카드에서 약점이던 곱셈 성질이 여기서는 쓸모가 돼요', 'decrypting 2790 gives 65 = 5 × 13: the multiplicative property that was a weakness becomes a feature'], ['덧셈과 곱셈을 둘 다 지원하는 완전 동형 암호(FHE)는 어떤 계산이든 할 수 있어요 · 연산마다 잡음이 쌓여 부트스트래핑으로 정리하고, 아직은 매우 느려요', 'fully homomorphic encryption supports both addition and multiplication, so any computation works; noise builds up and bootstrapping clears it, but it is still very slow']],
    fin: [['동형 암호: 데이터를 보여 주지 않고 남에게 계산을 맡겨요', 'homomorphic encryption: outsource computation without revealing the data', 'cyx-xs cyx-a'], ['FHE는 2009년 젠트리가 처음 실현했어요', 'Gentry built the first FHE scheme in 2009'], ['대표 방식: BFV, CKKS(근사 실수), TFHE', 'main schemes: BFV, CKKS (approximate reals) and TFHE']],
    caps: [['암호화해서 맡기기', 'Encrypt and outsource'], ['암호문끼리 계산', 'Compute on ciphertexts'], ['복호화하면 결과', 'Decrypt the result'], ['완전 동형 암호', 'Fully homomorphic encryption'], ['동형 암호', 'Homomorphic encryption']]
  });
}

function sPqc() {
  const X = 18.7;
  return CW('cy-pqc', {
    code: [['q, s = 17, (3, 5)             # s는 비밀', 'q, s = 17, (3, 5)             # s is secret'], 'A = [(2, 7), (11, 4), (5, 13)]', ['e = [1, -1, 0]                # 작은 오차', 'e = [1, -1, 0]                # small errors'], 'b = [(x*s[0] + y*s[1] + ei) % q', '     for (x, y), ei in zip(A, e)]  # [8,1,12]', ['# 오차가 없으면 소거법으로 바로 풀려요', '# without e, elimination solves it'], ['# 차원 수백 + 작은 오차 → 격자 문제', '# hundreds of dims + small e → hard']],
    hl: [[0, 1], [1, 4, 'warn'], [5, 2, 'ok'], [0, 7]],
    draw: (S) => {
      lines(S, 'q', X, .8, [[['쇼어 알고리즘: RSA, 디피-헬먼, 타원곡선을 효율적으로 풀어요', 'Shor’s algorithm efficiently breaks RSA, Diffie–Hellman and ECC'], 'r cyx-wr', { lh: 1.8 }], [['그로버: AES-128 → 약 64비트 수준 · AES-256은 충분', 'Grover: AES-128 drops to about 64-bit; AES-256 is fine'], 'w cyx-wr', { lh: 1.8 }], [['지금 녹화, 나중에 해독 → 오래 지킬 데이터는 지금 바꿔야 해요', 'harvest now, decrypt later: long-lived secrets must move now'], 'cyx-wr', { lh: 1.8 }]], 1, 2, { w: 12.7 });
      F(S, 'l0', X, .8, 'b = A · s + e (mod q)', 'a', 2);
      F(S, 'l1', X, 1.9, '2·3 + 7·5 + 1 ≡ 8', '', 2); F(S, 'l2', X, 2.9, '11·3 + 4·5 − 1 ≡ 1', '', 2); F(S, 'l3', X, 3.9, '5·3 + 13·5 + 0 ≡ 12', '', 2);
      lbl(S, 'l4', X, 5.0, ['공개: A와 b · 비밀: s와 e', 'public: A and b; secret: s and e'], 'w', 2);
      lbl(S, 'h1', X, 6.4, ['e가 없으면 그냥 연립방정식 → 소거법으로 즉시', 'without e it is a linear system, solved at once'], 'g', 3, { w: 12.7 });
      lbl(S, 'h2', X, 7.5, ['작은 오차만 섞어도 차원 수백에서는 어려운 격자 문제가 돼요', 'small errors in hundreds of dimensions make it a hard lattice problem'], 'r', 3, { w: 12.7 });
      lines(S, 'st', X, 9.0, [[['2024년 8월 NIST 표준', 'NIST standards, August 2024'], 'a'], [['ML-KEM   FIPS 203  키 캡슐화', 'ML-KEM   FIPS 203  key encapsulation'], 'm g'], [['ML-DSA   FIPS 204  서명', 'ML-DSA   FIPS 204  signatures'], 'm'], [['SLH-DSA  FIPS 205  해시 기반 서명', 'SLH-DSA  FIPS 205  hash-based signatures'], 'm']], 4, 0);
      lbl(S, 'dp', X, 13.6, ['하이브리드 배포: X25519MLKEM768(브라우저 TLS), Signal PQXDH, iMessage PQ3', 'hybrid rollout: X25519MLKEM768 in browser TLS, Signal PQXDH, iMessage PQ3'], 'g', 4, { w: 12.7 });
      lbl(S, 'mk', 1, 10.0, ['ML-KEM은 이 문제를 다항식 고리 위로 옮긴 Module-LWE에 기반해요', 'ML-KEM builds on Module-LWE, this problem moved onto polynomial rings'], '', 3, { w: 16.5 });
    },
    notes: [['충분히 큰 양자 컴퓨터가 나오면 쇼어 알고리즘이 RSA와 타원곡선을 깨요 · 지금 녹화한 암호문을 나중에 풀 수도 있어요', 'a large enough quantum computer running Shor’s algorithm breaks RSA and elliptic curves, and ciphertext recorded today could be read later'], ['LWE 문제: 비밀 s에 공개 행렬 A를 곱하고 작은 오차 e를 더해 b를 만들어요 · A와 b가 공개돼도 s를 찾기 어려워요', 'Learning With Errors: multiply a secret s by a public matrix A and add a small error e to get b; A and b are public, yet s stays hidden'], ['오차가 없으면 소거법으로 바로 풀리지만, 작은 오차가 섞이면 수백 차원 격자에서 가까운 점을 찾는 문제가 되어 양자 컴퓨터로도 어렵다고 여겨져요', 'without errors elimination solves it instantly, but small errors turn it into a closest-point problem in a lattice of hundreds of dimensions, believed hard even for quantum computers'], ['NIST는 2024년 ML-KEM, ML-DSA, SLH-DSA를 표준으로 냈어요 · 지금은 기존 X25519와 섞어 쓰는 하이브리드로 배포하고 있어요', 'NIST published ML-KEM, ML-DSA and SLH-DSA in 2024, and deployments pair them with classical X25519 as hybrids']],
    fin: [['양자내성 암호: 양자 컴퓨터로도 어렵다고 여겨지는 격자·해시 문제로 옮겨 가요', 'post-quantum crypto moves to lattice and hash problems believed hard even for quantum computers', 'cyx-xs cyx-a'], ['대칭키와 해시는 길이만 늘리면 돼요 (AES-256, SHA-384)', 'symmetric ciphers and hashes just need longer sizes (AES-256, SHA-384)'], ['키와 서명이 커져서 프로토콜의 크기 제한을 다시 봐야 해요', 'keys and signatures grow, so protocol size limits need revisiting']],
    caps: [['양자 위협', 'The quantum threat'], ['오차가 섞인 연립방정식', 'Equations with errors'], ['왜 어려운가', 'Why it is hard'], ['표준과 배포', 'Standards and rollout'], ['양자내성 암호', 'Post-quantum cryptography']]
  });
}

function sE2ee() {
  const X = 18.7, CX = [19.0, 22.2, 25.4, 28.6];
  return CW('cy-e2ee', {
    code: [['ck, mk1 = kdf(ck)       # 메시지 키 1', 'ck, mk1 = kdf(ck)       # message key 1'], ['ck, mk2 = kdf(ck)       # 쓴 키는 삭제', 'ck, mk2 = kdf(ck)       # used keys erased'], ['# 답장마다 새 DH 키 쌍 → 루트 키 갱신', '# each reply: new DH pair → new root key'], 'rk, ck = kdf(rk, dh(my_new, their_pub))', ['# 서버는 암호문만 전달해요', '# the server only relays ciphertext']],
    hl: [[4, 1], [0, 2, 'warn'], [2, 2, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      box(S, 'A', 18.9, .6, 3.2, 1.1, ['앨리스', 'Alice'], 'accent', 1); box(S, 'Sv', 23.6, .6, 3.2, 1.1, ['서버', 'server'], 'line', 1); box(S, 'B', 28.2, .6, 3.2, 1.1, ['밥', 'Bob'], 'ok', 1);
      [20.5, 25.2, 29.8].forEach((x, i) => vl(S, 'ln' + i, x, 1.8, 7.4, 'ink-3', 1, { dash: 1, w: .08 }));
      lbl(S, 'pk', 26.0, 1.85, ['prekey 묶음', 'prekey bundle'], '', 1, { off: 2 }); arw(S, 'p1', [29.7, 2.6], [25.3, 2.6], 1, { color: 'ok', off: 2 });
      arw(S, 'p2', [25.1, 3.7], [20.6, 3.7], 1, { color: 'ok', off: 2 }); lbl(S, 'pk2', 21.0, 3.0, ['오프라인이어도 OK', 'works offline'], '', 1, { off: 2 });
      nd(S, 'sk', 18.9, 4.3, 3.2, 'SK', 'warn', 1, { pct: 30, off: 2 });
      CX.forEach((x, i) => { nd(S, 'ck' + i, x, 8.6, 2.6, 'ck' + '₀₁₂₃'[i], 'warn', 2, { pct: 22 }); if (i) { arw(S, 'ca' + i, [x - .55, 9.15], [x - .05, 9.15], 2); nd(S, 'mk' + i, x - 1.55, 10.2, 2.6, 'mk' + '₀₁₂₃'[i], 'accent', 2, { pct: 18 }); arw(S, 'cm' + i, [x - .3, 9.75], [x - .3, 10.15], 2); } });
      [1, 2].forEach(i => nd(S, 'mx' + i, CX[i] - 1.55, 10.2, 2.6, ['삭제', 'erased'], 'line', 3, { pct: 6 }));
      lbl(S, 'r1', 21.0, 4.4, ['메시지 + 새 DH 공개키', 'message + new DH public key'], '', 3); arw(S, 'r1a', [20.6, 5.2], [29.7, 5.2], 3, { color: 'accent' });
      lbl(S, 'r2', 21.0, 5.8, ['답장 + 새 DH 공개키', 'reply + new DH public key'], '', 3); arw(S, 'r2a', [29.7, 6.6], [20.6, 6.6], 3, { color: 'ok' });
      lbl(S, 'n1', X, 12.2, ['X3DH: 밥이 오프라인이어도 서버에 둔 prekey로 공유 비밀을 만들어요', 'X3DH: prekeys left on the server create a shared secret even while Bob is offline'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 12.2, ['메시지마다 체인 키를 KDF로 한 칸씩 · 쓴 키는 지워서 지난 메시지는 안전', 'each message steps the chain key through a KDF; used keys are erased, protecting the past'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 12.2, ['답장마다 DH로 루트 키를 갱신 · 키가 털려도 다음 왕복부터 회복', 'every reply refreshes the root key via DH, so a compromise heals after one round trip'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 12.2, [[['서버는 암호문과 메타데이터만 봐요', 'the server sees only ciphertext and metadata'], 'a'], [['안전 번호를 비교해 중간자 공격을 막아요', 'safety numbers stop man-in-the-middle swaps'], ''], [['Signal, WhatsApp이 이 프로토콜을 써요', 'Signal and WhatsApp use this protocol'], '']], 4, 0);
      lbl(S, 'pq', 1, 8.0, ['Signal은 2023년 PQXDH로 초기 키 합의에 ML-KEM을 더했어요', 'Signal added ML-KEM to its initial key agreement with PQXDH in 2023'], '', 4, { w: 16.5 });
    },
    notes: [['종단간 암호화는 서버도 내용을 못 보게 해요 · 밥은 미리 prekey를 서버에 올려 두고, 앨리스는 그걸로 X3DH 공유 비밀을 만들어요', 'end-to-end encryption keeps even the server from reading messages; Bob uploads prekeys in advance and Alice uses them to derive an X3DH shared secret'], ['메시지마다 체인 키를 KDF로 한 칸 돌려 메시지 키를 뽑고, 쓴 키는 지워요 · 지금 키가 털려도 지난 메시지는 안전해요', 'each message turns the chain key one step through a KDF to get a message key, and used keys are erased, so past messages stay safe'], ['답장할 때마다 새 DH 키 쌍을 섞어 루트 키를 갱신해요 · 키가 한 번 털려도 다음 왕복부터 다시 안전해져요', 'each reply mixes in a fresh DH key pair to refresh the root key, so security recovers one round trip after a compromise'], ['서버는 암호문만 전달하고, 사용자는 안전 번호를 비교해 상대 키가 바꿔치기되지 않았는지 확인해요', 'the server only relays ciphertext, and users compare safety numbers to make sure no key was swapped in between']],
    fin: [['더블 래칫: 메시지마다 키를 바꿔 순방향 비밀성과 침해 후 회복을 함께 줘요', 'Double Ratchet: new keys per message give forward secrecy and post-compromise recovery', 'cyx-xs cyx-a'], ['Signal 프로토콜은 WhatsApp, Google 메시지에도 쓰여요', 'the Signal Protocol also runs in WhatsApp and Google Messages'], ['메타데이터(누가, 언제)는 따로 보호해야 해요', 'metadata (who and when) needs separate protection']],
    caps: [['X3DH 초기 합의', 'X3DH key agreement'], ['대칭 래칫', 'The symmetric ratchet'], ['DH 래칫', 'The DH ratchet'], ['서버가 보는 것', 'What the server sees'], ['종단간 암호화', 'End-to-end encryption']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('cy-basics', '암호의 기초', 'Foundations', '암호가 지켜야 할 것', 'What a cipher must guarantee', '커크호프스 원칙, 시저·비즈네르 암호가 깨진 이유, 일회용 패드의 완전 비밀성, 그리고 “안전하다”를 정확히 정의하는 IND-CPA 게임까지, 현대 암호를 이해하는 출발점이에요.', 'Kerckhoffs’s principle, why the Caesar and Vigenère ciphers fell, the perfect secrecy of the one-time pad, and the IND-CPA game that pins down what “secure” means: the starting point for modern cryptography.', [
    item('cy-kerckhoffs', '커크호프스 원칙', 'Kerckhoffs’s principle', '알고리즘은 공개되어도 괜찮고 비밀은 키에만 있어야 한다는 원칙이에요. 현대 암호 설계의 첫 번째 규칙이에요.', '1883년 오귀스트 커크호프스는 암호 시스템이 적의 손에 들어가도 안전해야 한다고 썼어요. 공격자가 알고리즘, 구현, 암호문을 모두 알아도 키만 모르면 평문을 알아낼 수 없어야 한다는 뜻이에요. 그래서 안전성은 키 공간의 크기와 알고리즘의 수학적 성질로 따지고, 128비트 키라면 전수 조사에 평균 2¹²⁷번 시도가 필요해요. 알고리즘을 숨기는 방식은 역공학이나 유출 한 번에 모든 사용자가 깨지고, 고치려면 시스템 전체를 바꿔야 해요. 반대로 AES, ChaCha20처럼 공개 경쟁과 수년의 분석을 거친 표준은 많은 연구자가 검증했기 때문에 신뢰받아요.', 'The algorithm may be public; the secret must live only in the key. It is the first rule of modern cipher design.', 'In 1883 Auguste Kerckhoffs wrote that a cipher must remain secure even if it falls into enemy hands. An attacker who knows the algorithm, the implementation and the ciphertext should still learn nothing without the key. Security is therefore measured by key space and mathematical structure; a 128-bit key needs about 2¹²⁷ guesses on average. Hiding the algorithm fails for every user at once after a single leak or reverse-engineering effort, and fixing it means replacing the whole system. Public standards like AES and ChaCha20, chosen through open competitions and years of analysis, earn trust because many researchers have tried to break them.', sKerckhoffs()),
    item('cy-caesar', '시저 암호와 빈도 분석', 'Caesar cipher and frequency analysis', '모든 글자를 같은 칸 수만큼 미는 가장 오래된 암호예요. 키가 26개뿐이고 글자 빈도가 그대로 남아서 쉽게 깨져요.', '시저 암호는 알파벳을 k칸 밀어 HELLO를 k = 3일 때 KHOOR로 바꿔요. 키가 26가지뿐이라 전부 시도해도 순식간이에요. 글자를 임의로 섞는 단일 치환 암호는 키가 26!개로 늘어나지만, 같은 글자가 늘 같은 글자로 바뀌기 때문에 영어의 E, T, A처럼 흔한 글자의 빈도가 암호문에 그대로 남아요. 9세기 알킨디가 정리한 빈도 분석은 가장 많이 나온 글자를 E에 맞추고, 짧은 단어와 글자 쌍으로 나머지를 채워 풀어요. 키 공간이 커도 통계적 구조가 남으면 깨진다는 첫 교훈이에요.', 'The oldest cipher shifts every letter by the same amount. With only 26 keys and letter frequencies left intact, it breaks easily.', 'The Caesar cipher shifts the alphabet by k, turning HELLO into KHOOR for k = 3. With only 26 keys, trying them all is instant. A general substitution cipher raises the key count to 26!, but the same letter still maps to the same letter, so the frequencies of common English letters such as E, T and A survive in the ciphertext. Frequency analysis, described by al-Kindi in the ninth century, matches the most common symbol to E and fills in the rest from short words and letter pairs. It is the first lesson that a large key space is useless if statistical structure leaks through.', sCaesar()),
    item('cy-vigenere', '비즈네르 암호', 'Vigenère cipher', '반복되는 키로 글자마다 다른 칸 수를 밀어요. 키가 반복되는 주기가 드러나면 시저 암호 여러 개로 쪼개져 풀려요.', '비즈네르 암호는 키 KEY를 평문 길이만큼 반복하고, 글자마다 키 글자만큼 밀어요. ATTACKATDAWN은 KXRKGIKXBKAL이 돼서 같은 A도 위치에 따라 K, K, K처럼 나오거나 다른 글자가 돼요. 하지만 키가 주기적으로 반복되니 같은 평문 조각이 같은 키 위치에 오면 같은 암호문이 나와요. 카시스키 검사는 반복되는 조각 사이의 거리로, 일치 지수는 통계로 키 길이를 찾아요. 키 길이 n을 알면 n칸씩 건너뛴 글자들은 모두 같은 키로 민 시저 암호라서 열마다 빈도 분석으로 풀려요.', 'A repeating key shifts each letter by a different amount. Once the period shows, it splits into several Caesar ciphers.', 'Vigenère repeats the key KEY across the message and shifts each letter by the matching key letter, turning ATTACKATDAWN into KXRKGIKXBKAL. Identical plaintext letters no longer always look alike, but the key repeats, so the same fragment at the same key offset encrypts the same way. The Kasiski test measures distances between repeated fragments, and the index of coincidence estimates the key length statistically. Once the length n is known, every n-th letter was shifted by the same key letter, so each column is a Caesar cipher solved by frequency analysis.', sVigenere()),
    item('cy-otp', '일회용 패드', 'One-time pad', '평문만큼 긴 진짜 무작위 키를 한 번만 XOR하면 이론적으로 깨지지 않아요. 키를 재사용하면 바로 무너져요.', '일회용 패드는 메시지와 같은 길이의 무작위 키를 비트마다 XOR해요. 받는 쪽은 같은 키로 한 번 더 XOR해서 평문을 얻어요. 섀넌은 키가 균등하게 무작위이고 평문만큼 길고 한 번만 쓰이면, 암호문이 평문에 대해 아무 정보도 주지 않는다는 완전 비밀성을 증명했어요. 어떤 평문이든 알맞은 키가 하나씩 있어서 공격자는 전혀 좁힐 수 없어요. 다만 키를 두 번 쓰면 c₁ ⊕ c₂ = m₁ ⊕ m₂가 되어 키가 사라지고, 언어의 통계로 두 평문을 풀 수 있어요. 키 배송이 어려워 외교·군사 핫라인 정도에만 쓰였고, 현대 스트림 암호는 짧은 키로 키스트림을 만들어 이를 흉내 내요.', 'XOR with a truly random key as long as the message, used once, is provably unbreakable. Reusing the key breaks it at once.', 'The one-time pad XORs the message with a random key of equal length, and the receiver XORs again with the same key. Shannon proved that if the key is uniformly random, as long as the message and never reused, the ciphertext reveals nothing about the plaintext: every plaintext has exactly one key that produces it. Reusing a key gives c₁ ⊕ c₂ = m₁ ⊕ m₂, cancelling the key and letting language statistics separate the two messages, which is how the Venona project read Soviet traffic. Distributing that much key is so impractical that pads were used only for hotlines and diplomacy; stream ciphers imitate them with a keystream expanded from a short key.', sOtp()),
    item('cy-notions', '안전성의 정의 (IND-CPA)', 'Defining security (IND-CPA)', '공격자가 두 평문 중 어느 것이 암호화됐는지 맞히지 못하면 안전하다고 정의해요. 그래서 암호화는 매번 무작위여야 해요.', '현대 암호는 “안전하다”를 게임으로 정의해요. 공격자는 원하는 평문을 마음껏 암호화해 볼 수 있고(선택 평문 공격), 길이가 같은 두 평문 m₀, m₁을 제출해요. 도전자는 몰래 비트 b를 골라 Enc(m_b)만 돌려주고, 공격자가 b를 맞힐 확률이 ½보다 무시할 만큼만 높으면 IND-CPA 안전이에요. 같은 평문이 늘 같은 암호문이 되는 결정적 암호는 공격자가 Enc(m₀)를 직접 만들어 비교하면 바로 지니까, 암호화는 nonce나 IV로 매번 달라져야 해요. 복호화 질의까지 허용하는 IND-CCA는 더 강한 기준이고, 무결성까지 지키는 AEAD가 이를 만족해요.', 'A scheme is secure if an attacker cannot tell which of two plaintexts was encrypted, which forces encryption to be randomized.', 'Modern cryptography defines security as a game. The attacker may encrypt any plaintexts it likes (a chosen-plaintext attack) and then submits two equal-length messages m₀ and m₁. The challenger secretly picks a bit b and returns only Enc(m_b); if the attacker guesses b with probability only negligibly better than ½, the scheme is IND-CPA secure. A deterministic scheme loses immediately, because the attacker can compute Enc(m₀) itself and compare, so encryption must be randomized with a nonce or IV. IND-CCA, which also allows decryption queries, is a stronger notion that authenticated encryption achieves.', sNotions())
  ]),
  sec('cy-math', '암호의 수학', 'Number theory', '정수론 도구 상자', 'The number theory toolbox', '모듈러 연산과 역원, 확장 유클리드 호제법, 페르마·오일러 정리, 빠른 거듭제곱, 그리고 이산 로그 문제까지, 공개키 암호를 떠받치는 정수론을 손으로 계산하듯 따라가요.', 'Modular arithmetic and inverses, the extended Euclidean algorithm, the theorems of Fermat and Euler, square-and-multiply exponentiation and the discrete log problem: the number theory under public-key cryptography, worked through by hand.', [
    item('cy-modular', '모듈러 연산', 'Modular arithmetic', 'n으로 나눈 나머지만 보는 계산이에요. 덧셈, 곱셈, 역원이 모두 0부터 n − 1 안에서 이루어져요.', 'a mod n은 a를 n으로 나눈 나머지예요. 시계에서 9시에 5시간을 더하면 2시가 되듯 9 + 5 ≡ 2 (mod 12)예요. 덧셈, 뺄셈, 곱셈은 중간에 아무 때나 mod를 해도 결과가 같아서 큰 수도 작게 유지하며 계산할 수 있어요. a · b ≡ 1이 되는 b를 a의 역원이라 하고, mod 7에서 3 × 5 = 15 ≡ 1이라 3⁻¹ = 5예요. 역원은 gcd(a, n) = 1일 때만 있어서 mod 8에서 2는 역원이 없어요. n이 소수 p면 0이 아닌 모든 수에 역원이 있어 사칙연산이 다 되는 유한체가 되고, 디피-헬먼과 타원곡선 암호는 이런 유한체 위에서 계산해요.', 'Arithmetic on remainders after dividing by n. Addition, multiplication and inverses all stay between 0 and n − 1.', 'a mod n is the remainder when a is divided by n. Just as 5 hours after 9 o’clock is 2 o’clock, 9 + 5 ≡ 2 (mod 12). Addition, subtraction and multiplication can be reduced at any point without changing the result, so huge numbers stay small. A number b with a · b ≡ 1 is the inverse of a; mod 7, 3 × 5 = 15 ≡ 1, so 3⁻¹ = 5. An inverse exists only when gcd(a, n) = 1, so 2 has none mod 8. When n is a prime p, every nonzero element has an inverse and the numbers form a finite field, the setting for Diffie–Hellman and elliptic curve cryptography.', sModular()),
    item('cy-euclid', '확장 유클리드 호제법', 'Extended Euclidean algorithm', '나눗셈을 되풀이해 최대공약수를 구하고, 거꾸로 대입해 모듈러 역원까지 찾아요. RSA의 개인 지수가 이렇게 나와요.', '유클리드 호제법은 gcd(a, b) = gcd(b, a mod b)를 이용해 나머지가 0이 될 때까지 나눠요. 3120 = 183 · 17 + 9, 17 = 1 · 9 + 8, 9 = 1 · 8 + 1이라 gcd(3120, 17) = 1이에요. 확장 버전은 각 나눗셈 식을 거꾸로 대입해 ax + by = gcd(a, b)를 만족하는 x, y를 함께 구해요. 여기서는 17 · (−367) + 3120 · 2 = 1이라 mod 3120에서 17의 역원은 −367 + 3120 = 2753이에요. RSA에서 e = 17, φ(n) = 3120일 때 개인 지수 d = 2753이 바로 이 값이고, 계산량은 자릿수에 비례해서 수천 비트 수도 순식간이에요.', 'Repeated division finds the gcd, and substituting back yields the modular inverse. RSA’s private exponent comes from it.', 'Euclid’s algorithm uses gcd(a, b) = gcd(b, a mod b), dividing until the remainder is zero: 3120 = 183 · 17 + 9, 17 = 1 · 9 + 8, 9 = 1 · 8 + 1, so gcd(3120, 17) = 1. The extended version substitutes back through the divisions to find x and y with ax + by = gcd(a, b). Here 17 · (−367) + 3120 · 2 = 1, so the inverse of 17 mod 3120 is −367 + 3120 = 2753. That is exactly the private exponent d for an RSA key with e = 17 and φ(n) = 3120, and the work grows only with the number of digits, so thousand-bit numbers take microseconds.', sEuclid()),
    item('cy-fermat', '페르마·오일러 정리', 'Fermat’s and Euler’s theorems', '소수 p에 대해 aᵖ⁻¹ ≡ 1, 일반적으로 aᵠ⁽ⁿ⁾ ≡ 1이에요. RSA가 복호화되는 이유이자 소수 판정의 출발점이에요.', '페르마의 소정리는 p가 소수이고 a가 p의 배수가 아니면 aᵖ⁻¹ ≡ 1 (mod p)이라고 말해요. mod 7에서 3을 거듭 곱하면 3, 2, 6, 4, 5, 1로 6번째에 1로 돌아와요. 오일러는 이를 일반화해 gcd(a, n) = 1이면 aᵠ⁽ⁿ⁾ ≡ 1이라고 했고, φ(n)은 n 이하에서 n과 서로소인 수의 개수로 φ(15) = 8이에요. RSA는 ed ≡ 1 (mod φ(n))이 되게 키를 골라 mᵉᵈ = m · (mᵠ⁽ⁿ⁾)ᵏ ≡ m이 되도록 해요. 거꾸로 2ⁿ⁻¹ mod n ≠ 1이면 n이 합성수라는 페르마 테스트가 되지만, 561처럼 모든 밑을 속이는 카마이클 수가 있어서 실제로는 밀러-라빈 판정을 여러 번 돌려요.', 'For a prime p, aᵖ⁻¹ ≡ 1; in general aᵠ⁽ⁿ⁾ ≡ 1. It is why RSA decrypts correctly and where primality tests start.', 'Fermat’s little theorem says that for a prime p and a not divisible by p, aᵖ⁻¹ ≡ 1 (mod p). Mod 7, powers of 3 run 3, 2, 6, 4, 5, 1 and return to 1 on the sixth step. Euler generalized it: if gcd(a, n) = 1 then aᵠ⁽ⁿ⁾ ≡ 1, where φ(n) counts the numbers up to n that are coprime to n, so φ(15) = 8. RSA chooses keys with ed ≡ 1 (mod φ(n)), so mᵉᵈ = m · (mᵠ⁽ⁿ⁾)ᵏ ≡ m and decryption undoes encryption. Run in reverse it becomes the Fermat primality test, but Carmichael numbers such as 561 fool every base, so real code uses repeated Miller–Rabin rounds.', sFermat()),
    item('cy-modexp', '빠른 거듭제곱', 'Square-and-multiply', '지수를 2진수로 보고 제곱과 곱셈을 반복해 거듭제곱을 계산해요. 비트 수에 비례하는 시간이라 큰 지수도 순식간이에요.', 'bᵉ mod n을 그대로 계산하면 e − 1번 곱해야 해서 2048비트 지수라면 끝나지 않아요. 빠른 거듭제곱은 e를 2진수로 쓰고 b, b², b⁴, b⁸…을 제곱으로 만든 다음, 비트가 1인 자리의 값만 곱해요. 65¹⁷ mod 3233은 17 = 10001₂라서 제곱 4번과 곱셈 1번, 65¹⁶ · 65 ≡ 789 · 65 ≡ 2790으로 끝나요. 매 단계 mod를 해서 수가 n보다 커지지 않고, 곱셈 횟수는 비트 수의 1.5배 정도예요. 다만 비트가 1일 때만 곱셈을 하면 실행 시간이나 전력 소모로 비트가 새어 나가서, 실제 구현은 몽고메리 래더처럼 비트와 관계없이 같은 일을 하는 상수 시간 방식을 써요.', 'Read the exponent in binary and alternate squaring with multiplying. The work grows with the bit length, so huge exponents are fast.', 'Computing bᵉ mod n by repeated multiplication takes e − 1 steps, hopeless for a 2048-bit exponent. Square-and-multiply writes e in binary, builds b, b², b⁴, b⁸ … by squaring, and multiplies together only the powers whose bit is 1. For 65¹⁷ mod 3233, 17 = 10001₂, so four squarings and one multiplication give 65¹⁶ · 65 ≡ 789 · 65 ≡ 2790. Reducing mod n at every step keeps numbers small, and the multiplication count is about 1.5 times the bit length. Multiplying only on 1 bits leaks the key through timing or power use, so production code uses constant-time methods like the Montgomery ladder.', sModexp()),
    item('cy-dlog', '이산 로그 문제', 'The discrete log problem', 'gˣ mod p는 쉽게 계산되지만 결과에서 x를 되찾기는 매우 어려워요. 디피-헬먼, DSA, 타원곡선 암호의 바탕이에요.', '소수 p와 생성원 g가 있을 때 gˣ mod p는 빠른 거듭제곱으로 금방 계산돼요. p = 23, g = 5면 5⁶ mod 23 = 8이에요. 그런데 x를 1씩 늘려도 결과는 1부터 22까지 규칙 없이 흩어져서, 8이라는 결과만 보고 x = 6을 찾으려면 사실상 하나씩 해 봐야 해요. 아기걸음 거인걸음이나 폴라드 로 같은 방법도 √p 정도의 시간이 들고, 일반 유한체에는 더 빠른 수체 체 방법이 있어 2048비트 이상의 p를 써요. 타원곡선 위의 이산 로그(ECDLP)는 알려진 지름길이 없어서 256비트 키로 128비트 안전성을 줘요. 양자 컴퓨터의 쇼어 알고리즘은 두 문제를 모두 효율적으로 풀기 때문에 양자내성 암호로의 전환이 진행 중이에요.', 'gˣ mod p is easy to compute but x is very hard to recover from the result. Diffie–Hellman, DSA and elliptic curves rest on it.', 'For a prime p and generator g, gˣ mod p is fast to compute with square-and-multiply: with p = 23 and g = 5, 5⁶ mod 23 = 8. Yet as x increases the results scatter across 1 to 22 with no visible order, so recovering x = 6 from 8 essentially means searching. Baby-step giant-step and Pollard’s rho still need about √p work, and the number field sieve is faster for ordinary finite fields, which is why p is 2048 bits or more. The elliptic curve discrete log has no known shortcut, so a 256-bit curve gives 128-bit security. Shor’s quantum algorithm solves both problems efficiently, driving the migration to post-quantum cryptography.', sDlog())
  ]),
  sec('cy-symmetric', '대칭키 암호', 'Symmetric ciphers', '하나의 키로 잠그고 여는 암호', 'One key to lock and unlock', '페이스텔 구조와 AES 라운드의 내부, ChaCha20 스트림 암호, nonce를 다시 쓸 때 벌어지는 일, 인증 암호 AEAD, 그리고 패딩 오라클 공격까지, 대칭키 암호를 쓰는 법과 깨지는 법을 함께 봐요.', 'Inside Feistel networks and AES rounds, the ChaCha20 stream cipher, what happens when a nonce is reused, authenticated encryption, and the padding oracle attack: how symmetric ciphers are used, and how they break.', [
    item('cy-feistel', '페이스텔 구조', 'Feistel network', '블록을 반으로 나눠 한쪽만 섞고 교환하기를 반복해요. 라운드 함수가 역함수를 갖지 않아도 복호화할 수 있어요.', '페이스텔 구조는 블록을 왼쪽 L과 오른쪽 R로 나누고, 매 라운드 L₁ = R₀, R₁ = L₀ ⊕ F(R₀, k₁)로 바꿔요. 복호화는 같은 연산을 라운드 키 순서만 거꾸로 해서 하는데, F의 출력을 한 번 더 XOR하면 지워지기 때문에 F 자체는 되돌릴 수 없어도 괜찮아요. 그래서 설계자는 F를 마음껏 복잡하게 만들 수 있고, 암호화와 복호화 회로도 하나로 공유돼요. 1977년 표준인 DES가 64비트 블록에 16라운드 페이스텔 구조였지만 56비트 키가 너무 짧아 1998년 EFF의 전용 장비가 56시간 만에 키를 찾았어요. 3DES로 버티다가 AES로 넘어갔고, 페이스텔 구조는 Blowfish, Camellia 등에 남아 있어요.', 'Split the block in half, mix one side and swap, round after round. Decryption works even when the round function has no inverse.', 'A Feistel network splits the block into halves L and R and, each round, sets L₁ = R₀ and R₁ = L₀ ⊕ F(R₀, k₁). Decryption runs the same operation with the round keys reversed; because XORing F’s output a second time cancels it, F itself never needs to be invertible. Designers can therefore make F as complex as they like, and encryption and decryption share one circuit. DES, the 1977 standard, was a 16-round Feistel cipher on 64-bit blocks, but its 56-bit key was too short: the EFF’s dedicated machine found a key in 56 hours in 1998. Triple DES bridged the gap until AES, and the Feistel design lives on in Blowfish and Camellia.', sFeistel()),
    item('cy-aes', 'AES 라운드', 'AES rounds', '16바이트 상태에 SubBytes, ShiftRows, MixColumns, AddRoundKey를 10~14라운드 반복해요. 오늘날 가장 많이 쓰는 블록 암호예요.', 'AES는 2001년 표준이 된 128비트 블록 암호로, 16바이트를 4×4 상태에 놓고 라운드마다 네 단계를 거쳐요. SubBytes는 GF(2⁸)의 역원과 아핀 변환으로 만든 S-box로 바이트를 치환하는 유일한 비선형 단계예요. ShiftRows는 행 i를 왼쪽으로 i칸 돌려 바이트를 다른 열로 보내고, MixColumns는 열마다 고정 행렬을 곱해 한 바이트의 변화를 열 전체로 퍼뜨려요. 마지막으로 AddRoundKey가 키 확장으로 만든 라운드 키를 XOR해요. 두 라운드면 모든 출력 비트가 모든 입력 비트에 의존하게 되고, 키 길이 128, 192, 256비트에 따라 10, 12, 14라운드를 돌려요. 대부분의 CPU에는 AES-NI 같은 전용 명령이 있어 한 라운드가 명령 하나로 처리돼요.', 'A 16-byte state goes through SubBytes, ShiftRows, MixColumns and AddRoundKey for 10 to 14 rounds. It is the most widely used block cipher today.', 'AES, standardized in 2001, is a 128-bit block cipher that arranges 16 bytes in a 4×4 state and applies four steps each round. SubBytes swaps each byte through an S-box built from inversion in GF(2⁸) plus an affine map, the only nonlinear step. ShiftRows rotates row i left by i so bytes move between columns, and MixColumns multiplies each column by a fixed matrix so a change in one byte spreads through the whole column. AddRoundKey then XORs in a round key from the key schedule. After two rounds every output bit depends on every input bit, and keys of 128, 192 and 256 bits use 10, 12 and 14 rounds. Most CPUs have instructions such as AES-NI that perform a whole round in one step.', sAes()),
    item('cy-stream', '스트림 암호 ChaCha20', 'The ChaCha20 stream cipher', '키와 nonce, 카운터로 키스트림을 만들어 평문에 XOR해요. 더하기·회전·XOR만 써서 소프트웨어로도 빠르고 타이밍 공격에 강해요.', 'ChaCha20은 상수 4워드, 256비트 키 8워드, 블록 카운터 1워드, 96비트 nonce 3워드로 4×4 상태를 채워요. 더하기, 비트 회전, XOR만 쓰는 쿼터 라운드를 열과 대각선에 번갈아 20라운드 적용하고, 원래 상태를 더해 64바이트 키스트림 블록을 얻어요. 평문과 XOR하면 암호문이 되고, 다음 블록은 카운터만 올리면 돼서 병렬 계산과 임의 위치 접근이 자유로워요. 표를 찾아보는 연산이 없어서 캐시 타이밍 공격에 강하고, AES 하드웨어 가속이 없는 휴대폰에서도 빨라요. Poly1305 MAC과 묶은 ChaCha20-Poly1305가 TLS 1.3, WireGuard, SSH에서 쓰여요.', 'Key, nonce and counter generate a keystream that is XORed with the plaintext. Using only add, rotate and XOR makes it fast in software and resistant to timing attacks.', 'ChaCha20 fills a 4×4 state with four constant words, an eight-word 256-bit key, a one-word block counter and a three-word 96-bit nonce. It applies quarter rounds built from addition, rotation and XOR to columns and diagonals for 20 rounds, then adds the original state to get a 64-byte keystream block. XORing with the plaintext gives the ciphertext, and the next block just bumps the counter, allowing parallel computation and random access. With no table lookups it resists cache-timing attacks and runs fast even on phones without AES hardware. Paired with the Poly1305 MAC as ChaCha20-Poly1305, it is used in TLS 1.3, WireGuard and SSH.', sStream()),
    item('cy-nonce', 'nonce 재사용', 'Nonce reuse', '같은 키와 nonce로 두 메시지를 암호화하면 키스트림이 같아져 평문끼리의 XOR이 드러나요. GCM에서는 위조까지 가능해져요.', 'CTR, GCM, ChaCha20 같은 스트림 계열 암호는 키와 nonce에서 키스트림을 만들기 때문에, 두 메시지에 같은 nonce를 쓰면 키스트림이 완전히 같아져요. 두 암호문을 XOR하면 키스트림이 지워져 c₁ ⊕ c₂ = m₁ ⊕ m₂가 되고, 한쪽 평문을 알거나 추측하면 다른 쪽도 그대로 풀려요. AES-GCM은 여기에 더해 인증용 해시 키 H가 계산되어 메시지를 위조할 수 있게 돼요. 무작위 96비트 nonce는 생일 문제 때문에 키 하나당 2³²개 메시지 정도까지만 안전하고, 그 이상은 카운터 nonce나 192비트 nonce를 쓰는 XChaCha20, 실수해도 덜 위험한 AES-GCM-SIV를 써요. 2017년 KRACK 공격은 WPA2 핸드셰이크를 재전송해 nonce를 강제로 재사용시켰어요.', 'Encrypting two messages with the same key and nonce repeats the keystream and exposes the XOR of the plaintexts. With GCM it even enables forgeries.', 'Stream-style ciphers such as CTR, GCM and ChaCha20 derive the keystream from key and nonce, so reusing a nonce makes two keystreams identical. XORing the ciphertexts cancels the keystream, leaving c₁ ⊕ c₂ = m₁ ⊕ m₂, and knowing or guessing one plaintext reveals the other. With AES-GCM the authentication hash key H can also be recovered, allowing forgeries. Random 96-bit nonces stay safe for only about 2³² messages per key because of the birthday bound; beyond that use counter nonces, XChaCha20 with 192-bit nonces, or misuse-resistant AES-GCM-SIV. The 2017 KRACK attack replayed WPA2 handshake messages to force nonce reuse.', sNonce()),
    item('cy-aead', '인증 암호 AEAD', 'Authenticated encryption (AEAD)', '암호화와 무결성 검사를 한 번에 해요. 헤더는 평문으로 두되 함께 인증하고, 한 비트라도 바뀌면 복호화를 거부해요.', 'AEAD는 기밀성, 무결성, 부가 데이터 인증을 하나의 API로 제공해요. AES-GCM은 CTR 모드로 본문을 암호화하고, GF(2¹²⁸) 위의 다항식 해시 GHASH로 헤더(AAD)와 암호문 전체에 대한 16바이트 태그를 만들어요. 받는 쪽은 태그를 다시 계산해 상수 시간으로 비교하고, 일치할 때만 평문을 돌려줘요. 인증 없는 CTR이나 CBC 암호문은 비트를 뒤집어 금액 같은 내용을 조작할 수 있어서, 현대 프로토콜은 AEAD만 써요. 대표 구성은 AES-GCM, ChaCha20-Poly1305, nonce 실수에 강한 AES-GCM-SIV이고, TLS 1.3은 AEAD 암호 스위트만 허용해요.', 'Encryption and integrity checking in one step. The header stays readable but is authenticated, and any changed bit makes decryption fail.', 'AEAD provides confidentiality, integrity and authentication of associated data through one API. AES-GCM encrypts the body in CTR mode and computes a 16-byte tag over the header (AAD) and the whole ciphertext with GHASH, a polynomial hash over GF(2¹²⁸). The receiver recomputes the tag, compares it in constant time, and releases plaintext only on a match. Unauthenticated CTR or CBC ciphertext can be edited by flipping bits, changing amounts and other content, so modern protocols use AEAD only. Common choices are AES-GCM, ChaCha20-Poly1305 and nonce-misuse-resistant AES-GCM-SIV, and TLS 1.3 permits only AEAD cipher suites.', sAead()),
    item('cy-padding', '패딩 오라클 공격', 'The padding oracle attack', '서버가 패딩 오류를 따로 알려 주면 키 없이도 CBC 암호문을 한 바이트씩 풀 수 있어요. 작은 오류 메시지가 오라클이 돼요.', 'CBC 모드는 블록 크기를 맞추려고 PKCS#7 패딩을 붙여요. 3바이트가 남으면 03 03 03을 채우고, 복호화 후 이 형식이 맞는지 검사해요. 복호화는 P = Dₖ(C₁) ⊕ C₀라서 앞 블록 C₀의 바이트를 바꾸면 평문의 같은 자리가 그대로 바뀌어요. 서버가 “패딩 오류”와 다른 오류를 구분해서 알려 주면, 공격자는 C₀의 마지막 바이트를 0부터 255까지 바꿔 보다가 패딩이 맞는 순간 그 바이트가 01이 됐다는 걸 알고, 거기서 실제 평문 바이트를 계산해요. 이를 끝에서부터 반복하면 바이트당 최대 256번의 질의로 전체 평문이 풀려요. 2002년 보드네가 발표한 뒤 ASP.NET, SSL 3.0의 POODLE, TLS의 Lucky 13 같은 공격으로 이어졌고, 대책은 AEAD와 하나로 통일된 오류 응답이에요.', 'If a server reveals padding errors, CBC ciphertext can be decrypted byte by byte without the key. A tiny error message becomes an oracle.', 'CBC mode pads messages to the block size with PKCS#7, filling three spare bytes with 03 03 03, and checks that format after decrypting. Since decryption computes P = Dₖ(C₁) ⊕ C₀, changing a byte of the previous block C₀ changes the same plaintext byte. If the server reports padding errors differently from other errors, an attacker tries all 256 values in C₀’s last byte; the one that yields valid padding means that byte decrypted to 01, from which the real plaintext byte follows. Repeating from the end recovers the whole plaintext with at most 256 queries per byte. Since Vaudenay’s 2002 paper this has struck ASP.NET, SSL 3.0 (POODLE) and TLS (Lucky 13); the fix is AEAD plus a single, uniform error response.', sPadding())
  ]),
  sec('cy-hash', '해시와 무결성', 'Hashes and integrity', '한 방향 지문', 'One-way fingerprints', '생일 공격과 충돌, 머클-담고르 구조와 길이 확장 공격, SHA-3의 스펀지 구조, 머클 트리로 하는 포함 증명, 그리고 하나의 비밀에서 여러 키를 뽑는 키 유도 함수까지, 해시가 무결성을 지키는 방식이에요.', 'Birthday attacks and collisions, the Merkle–Damgård design and length extension, the sponge inside SHA-3, inclusion proofs with Merkle trees, and key derivation functions that turn one secret into many keys: how hashes protect integrity.', [
    item('cy-birthday', '생일 공격', 'The birthday attack', '23명이면 생일이 같은 쌍이 있을 확률이 50%를 넘어요. n비트 해시는 약 2^(n/2)번이면 충돌이 나와요.', '사람이 k명이면 쌍은 k(k − 1)/2개라 23명만 모여도 쌍이 253개고, 같은 생일이 있을 확률이 50.7%가 돼요. 해시도 마찬가지로 출력이 n비트면 약 2^(n/2)개의 입력만 해시해 봐도 두 입력의 해시가 같은 충돌이 나올 가능성이 커요. 그래서 128비트 MD5는 원리적으로 2⁶⁴, 256비트 SHA-256은 2¹²⁸의 충돌 저항성을 가져요. 충돌을 찾으면 무해한 문서와 악성 문서의 해시를 같게 만들어, 한쪽에 받은 서명을 다른 쪽에 쓸 수 있어요. MD5는 구조적 약점 때문에 지금은 몇 초 만에 충돌이 만들어지고, SHA-1도 2017년 SHAttered로 실제 충돌 PDF가 공개됐어요. 특정 해시값에 맞는 입력을 찾는 원상 공격은 여전히 2ⁿ이 들어요.', 'With 23 people a shared birthday is more likely than not. An n-bit hash yields a collision after about 2^(n/2) tries.', 'With k people there are k(k − 1)/2 pairs, so 23 people already make 253 pairs and a 50.7% chance of a shared birthday. Likewise, an n-bit hash is likely to yield a collision, two inputs with the same hash, after only about 2^(n/2) inputs. That gives 128-bit MD5 a theoretical collision resistance of 2⁶⁴ and 256-bit SHA-256 one of 2¹²⁸. A collision lets an attacker make a harmless and a malicious document share a hash, so a signature on one validates the other. Structural weaknesses mean MD5 collisions now take seconds, and SHAttered published colliding SHA-1 PDFs in 2017. Finding an input for a given hash, a preimage, still costs 2ⁿ.', sBirthday()),
    item('cy-md', '머클-담고르와 길이 확장', 'Merkle–Damgård and length extension', 'MD5·SHA-1·SHA-2는 블록을 압축 함수로 이어 붙여요. 해시값이 곧 내부 상태라 H(secret ‖ m)은 MAC으로 쓸 수 없어요.', '머클-담고르 구조는 메시지를 패딩해 고정 크기 블록으로 나누고, 초기값 IV에서 시작해 hᵢ = f(hᵢ₋₁, mᵢ)로 압축 함수 f를 차례로 적용해요. 마지막 블록에는 1비트, 0들, 원래 길이를 붙여서 압축 함수가 충돌에 강하면 해시 전체도 충돌에 강하다는 성질을 보장해요. 문제는 출력이 마지막 체인 값 그대로라는 점이에요. H(secret ‖ m)을 MAC으로 쓰면 공격자는 비밀을 몰라도 그 값에서 압축을 이어 가, m ‖ 패딩 ‖ &admin=1 같은 확장된 메시지의 유효한 MAC을 계산할 수 있어요. 2009년 Flickr API가 이 공격에 당했어요. 그래서 MAC은 HMAC으로 만들고, SHA-3, SHA-512/256, BLAKE3처럼 내부 상태를 다 드러내지 않는 해시는 길이 확장이 안 돼요.', 'MD5, SHA-1 and SHA-2 chain blocks through a compression function. Because the hash is the internal state, H(secret ‖ m) is unsafe as a MAC.', 'The Merkle–Damgård construction pads the message into fixed-size blocks and, starting from an IV, applies a compression function as hᵢ = f(hᵢ₋₁, mᵢ). Padding the last block with a 1 bit, zeros and the original length ensures that a collision-resistant compression function yields a collision-resistant hash. The catch is that the output is simply the final chaining value. If H(secret ‖ m) is used as a MAC, an attacker can resume compression from it without the secret and compute a valid MAC for m ‖ padding ‖ &admin=1. Flickr’s API fell to this in 2009. MACs should be built with HMAC, and hashes that hide part of their state, such as SHA-3, SHA-512/256 and BLAKE3, resist length extension.', sMd()),
    item('cy-sponge', '스펀지 구조 (SHA-3)', 'The sponge construction (SHA-3)', '상태를 비율과 용량으로 나눠 입력을 흡수하고 출력을 짜내요. 용량이 드러나지 않아 길이 확장 공격이 통하지 않아요.', 'SHA-3(Keccak)는 1600비트 상태를 바깥과 닿는 비율 r과 숨겨진 용량 c로 나눠요. SHA3-256은 r = 1088, c = 512예요. 흡수 단계에서는 메시지 블록을 r 부분에 XOR하고 24라운드짜리 순열 Keccak-f로 상태 전체를 섞기를 반복해요. 다 흡수하면 짜내기 단계에서 r 부분의 앞쪽을 출력으로 읽고, 더 필요하면 다시 섞어 읽어요. 용량 c는 입출력에 직접 닿지 않아 해시값만으로 내부 상태를 복원할 수 없고, 안전성은 c/2 = 256비트가 되며 길이 확장 공격도 불가능해요. 출력 길이를 마음대로 정하는 SHAKE128/256(XOF)도 같은 구조이고, ML-KEM과 ML-DSA가 내부에서 써요.', 'Split the state into rate and capacity, absorb the input, then squeeze out the output. The capacity stays hidden, so length extension fails.', 'SHA-3 (Keccak) splits a 1600-bit state into an outer rate r and a hidden capacity c; SHA3-256 uses r = 1088 and c = 512. In the absorbing phase each message block is XORed into the rate and the whole state is stirred by Keccak-f, a 24-round permutation. In the squeezing phase output is read from the rate, mixing again whenever more is needed. Because the capacity never touches input or output directly, the internal state cannot be rebuilt from a hash, security is c/2 = 256 bits, and length extension is impossible. The extendable-output functions SHAKE128 and SHAKE256 use the same structure, and ML-KEM and ML-DSA use them internally.', sSponge()),
    item('cy-merkletree', '머클 트리', 'Merkle tree', '데이터 조각의 해시를 짝지어 해시하며 루트 하나로 모아요. 루트만 믿으면 전체 무결성과 개별 포함 여부를 짧게 증명할 수 있어요.', '머클 트리는 데이터 조각마다 해시를 구해 잎으로 놓고, 두 개씩 이어 붙여 다시 해시하기를 반복해 루트 해시 하나를 만들어요. 어느 잎이든 한 비트만 바뀌어도 루트까지 가는 경로의 해시가 모두 바뀌니, 루트 32바이트만 안전하게 받으면 전체 데이터의 무결성을 확인할 수 있어요. 특정 잎이 포함됐다는 건 형제 해시 log₂ n개로 증명돼서, 잎이 100만 개여도 해시 20개면 충분해요. 비트코인 블록 헤더, Git의 커밋과 트리, 인증서 투명성 로그, IPFS와 BitTorrent가 이 구조를 써요. 잎 해시와 내부 노드 해시에 서로 다른 접두어를 붙여 둘을 혼동시키는 공격을 막는 것도 중요해요.', 'Hash pairs of hashes up to a single root. Trusting the root proves integrity of everything and lets any item prove its membership compactly.', 'A Merkle tree hashes each data item into a leaf, then repeatedly hashes pairs together until one root hash remains. Changing a single bit in any leaf changes every hash on its path to the root, so obtaining just the 32-byte root securely is enough to verify all the data. Inclusion of a particular leaf is proven with log₂ n sibling hashes, so a million leaves need only 20. Bitcoin block headers, Git commits and trees, Certificate Transparency logs, IPFS and BitTorrent all use the structure. Prefixing leaf and internal-node hashes differently prevents attacks that confuse the two.', sMerkle()),
    item('cy-kdf', '키 유도 함수 (HKDF)', 'Key derivation (HKDF)', '하나의 비밀에서 용도별로 독립인 키를 뽑아요. 비밀번호처럼 엔트로피가 낮은 입력에는 일부러 느린 KDF를 써요.', '키 교환으로 얻은 공유 비밀은 길이와 분포가 제각각이라 그대로 키로 쓰기 어렵고, 한 비밀을 여러 용도에 그대로 쓰면 위험해요. HKDF(RFC 5869)는 먼저 추출 단계에서 HMAC(salt, 입력)으로 균일한 의사난수 키 PRK를 만들고, 확장 단계에서 Tᵢ = HMAC(PRK, Tᵢ₋₁ ‖ info ‖ i)를 이어 필요한 길이만큼 키 재료를 뽑아요. info를 “암호화”, “MAC”, “클라이언트→서버”처럼 바꾸면 서로 독립인 키가 나오고, TLS 1.3 키 스케줄이 이 방식으로 모든 키를 만들어요. 다만 HKDF는 빠르기 때문에 비밀번호처럼 추측할 수 있는 입력에는 맞지 않아요. 비밀번호에는 Argon2id, scrypt, bcrypt처럼 시간과 메모리를 일부러 많이 쓰는 KDF로 추측 공격의 비용을 높여요.', 'Derive independent per-purpose keys from one secret. Low-entropy inputs like passwords need a deliberately slow KDF instead.', 'Shared secrets from key exchange vary in length and distribution, and reusing one secret for several purposes is dangerous. HKDF (RFC 5869) first extracts a uniform pseudorandom key, PRK = HMAC(salt, input), then expands it with Tᵢ = HMAC(PRK, Tᵢ₋₁ ‖ info ‖ i) into as much key material as needed. Different info strings such as “encryption”, “MAC” or “client to server” yield independent keys, which is exactly how the TLS 1.3 key schedule derives every key. HKDF is fast, though, so it is wrong for guessable inputs like passwords. Passwords call for KDFs that deliberately spend time and memory, such as Argon2id, scrypt or bcrypt, to make guessing expensive.', sKdf())
  ]),
  sec('cy-public', '공개키 암호', 'Public-key cryptography', '열쇠를 나누지 않고 비밀을 나누는 법', 'Sharing secrets without sharing keys', 'RSA를 숫자로 직접 계산해 보고, 교과서 RSA의 함정과 OAEP, 타원곡선의 점 덧셈, ECDSA 서명과 nonce 재사용 사고, 순방향 비밀성, 그리고 실제 시스템이 쓰는 하이브리드 암호까지 따라가요.', 'Work RSA through with real numbers, then see the traps of textbook RSA and OAEP, point addition on elliptic curves, ECDSA signatures and the nonce-reuse incidents, forward secrecy, and the hybrid encryption real systems use.', [
    item('cy-rsa', 'RSA의 수학', 'The math of RSA', '두 소수의 곱 n을 공개하고, 소수를 알아야 계산되는 d를 비밀로 둬요. n을 소인수분해할 수 없다는 데 안전성이 달려 있어요.', 'RSA는 큰 소수 p, q를 골라 n = pq를 만들고 φ(n) = (p − 1)(q − 1)을 계산해요. φ(n)과 서로소인 공개 지수 e를 정하고 확장 유클리드로 ed ≡ 1 (mod φ(n))인 d를 구하면, (n, e)가 공개 키, d가 개인 키예요. p = 61, q = 53이면 n = 3233, φ = 3120이고, e = 17에서 d = 2753이 나와요. 암호화 c = mᵉ mod n으로 65는 2790이 되고, 복호화 cᵈ mod n은 오일러 정리 덕분에 다시 65가 돼요. 같은 수학으로 s = mᵈ를 만들면 서명이 되고 sᵉ로 검증해요. n을 소인수분해하면 φ(n)과 d가 바로 나오므로 안전성은 소인수분해의 어려움에 달려 있고, 지금은 2048비트 이상을 권장해요. 실제로는 e = 65537과 패딩을 함께 써요.', 'Publish the product n of two primes and keep d, computable only from those primes. Security depends on n being impossible to factor.', 'RSA picks large primes p and q, forms n = pq and computes φ(n) = (p − 1)(q − 1). Choosing a public exponent e coprime to φ(n) and using extended Euclid to find d with ed ≡ 1 (mod φ(n)) gives the public key (n, e) and private key d. With p = 61 and q = 53, n = 3233 and φ = 3120, and e = 17 gives d = 2753. Encryption c = mᵉ mod n turns 65 into 2790, and decryption cᵈ mod n returns 65 thanks to Euler’s theorem. The same math signs, s = mᵈ, verified with sᵉ. Factoring n reveals φ(n) and d at once, so security rests on the hardness of factoring, and 2048-bit or larger moduli are recommended. Real systems use e = 65537 together with padding.', sRsa()),
    item('cy-rsapad', '교과서 RSA의 함정과 OAEP', 'Textbook RSA pitfalls and OAEP', '패딩 없는 RSA는 결정적이고 곱셈으로 조작할 수 있어요. 암호화는 OAEP, 서명은 PSS로 무작위성을 섞어야 해요.', '패딩 없는 교과서 RSA는 Enc(a) · Enc(b) = Enc(ab)를 만족해서, 공격자가 암호문 2790에 2¹⁷ mod n = 1752를 곱한 3017을 보내면 복호화 결과가 65의 두 배인 130이 돼요. 또 같은 평문은 늘 같은 암호문이 되어, “yes”나 “no”처럼 후보가 적으면 직접 암호화해 비교하는 것만으로 내용을 알아낼 수 있어요. e = 3에 작은 m을 쓰면 mᵉ가 n보다 작아 그냥 세제곱근으로 풀리기도 해요. OAEP는 무작위 seed와 마스크 생성 함수(MGF)로 평문을 섞은 뒤 암호화해서 매번 다른 암호문을 만들고, 조작하면 구조가 깨져 거부되게 해요. 예전 PKCS#1 v1.5 암호화 패딩은 1998년 블라이헨바허의 패딩 오라클 공격에 당했고, 2017년 ROBOT으로 여러 제품에서 다시 발견됐어요.', 'Unpadded RSA is deterministic and malleable through multiplication. Mix in randomness with OAEP for encryption and PSS for signatures.', 'Unpadded textbook RSA satisfies Enc(a) · Enc(b) = Enc(ab), so multiplying the ciphertext 2790 by 2¹⁷ mod n = 1752 gives 3017, which decrypts to 130, twice the original 65. It is also deterministic: when candidates are few, like “yes” or “no”, encrypting them and comparing reveals the message. With e = 3 and a small m, mᵉ may not even exceed n, so a plain cube root recovers it. OAEP mixes the message with a random seed through mask generation functions before encrypting, giving a fresh ciphertext every time and rejecting tampered ones. The older PKCS#1 v1.5 encryption padding fell to Bleichenbacher’s padding oracle attack in 1998, rediscovered across many products as ROBOT in 2017.', sRsaPad()),
    item('cy-ecc', '타원곡선', 'Elliptic curves', '곡선 위의 점끼리 더하는 규칙으로 군을 만들어요. kP에서 k를 찾기 어려워 짧은 키로도 높은 안전성을 줘요.', '타원곡선은 y² = x³ + ax + b를 만족하는 점들과 무한원점으로 이루어져요. 두 점 P, Q를 잇는 직선은 곡선과 한 점 R에서 더 만나고, R을 x축에 대해 뒤집은 점을 P + Q로 정의해요. y² = x³ − x + 1에서 P(−1, 1)과 Q(0, 1)을 더하면 직선 y = 1이 R(1, 1)을 지나 P + Q = (1, −1)이 돼요. 같은 점을 더할 때는 접선을 써서 2Q = (¼, −⅞)이고, 두 배와 덧셈을 반복하면 kP를 약 log k번에 계산해요. 암호에서는 소수 p로 나눈 나머지 위의 곡선을 쓰고, kP에서 k를 찾는 ECDLP는 알려진 지름길이 없어 256비트 곡선이 3072비트 RSA와 비슷한 안전성을 줘요. P-256, secp256k1, Curve25519가 대표 곡선이에요.', 'Adding points on a curve forms a group. Recovering k from kP is hard, so short keys give strong security.', 'An elliptic curve consists of the points satisfying y² = x³ + ax + b plus a point at infinity. The line through two points P and Q meets the curve at one more point R, and reflecting R across the x-axis defines P + Q. On y² = x³ − x + 1, adding P(−1, 1) and Q(0, 1) uses the line y = 1, which passes through R(1, 1), so P + Q = (1, −1). Adding a point to itself uses the tangent, giving 2Q = (¼, −⅞), and repeated doubling and adding computes kP in about log k steps. Cryptography uses curves over integers mod a prime p, where recovering k from kP, the ECDLP, has no known shortcut, so a 256-bit curve matches roughly 3072-bit RSA. P-256, secp256k1 and Curve25519 are common curves.', sEcc()),
    item('cy-ecdsa', 'ECDSA와 nonce', 'ECDSA and its nonce', '서명마다 비밀 난수 k를 써요. 같은 k로 두 번 서명하면 두 식을 풀어 개인 키가 바로 나와요.', 'ECDSA 서명은 비밀 난수 k로 R = kG를 계산해 r = R의 x좌표 mod n으로 두고, s = k⁻¹(z + rd) mod n을 계산해요. 여기서 z는 메시지 해시, d는 개인 키예요. 검증자는 공개 키 Q = dG만으로 u₁ = z/s, u₂ = r/s를 구해 u₁G + u₂Q의 x좌표가 r과 같은지 확인해요. 그런데 같은 k로 두 메시지에 서명하면 r이 같아지고, 두 s 식을 빼면 k = (z₁ − z₂)/(s₁ − s₂), 이어서 d = (s₁k − z₁)/r이 나와요. 2010년 소니 PS3는 k를 고정값으로 써서 서명 키가 공개됐고, 2013년 안드로이드 난수 버그로 비트코인 지갑들이 털렸어요. k가 조금만 치우쳐도 격자 공격으로 키가 새기 때문에, RFC 6979처럼 개인 키와 메시지에서 k를 결정적으로 만들거나 처음부터 그렇게 설계된 Ed25519를 써요.', 'Every signature uses a secret random k. Sign twice with the same k and the private key falls out of two equations.', 'An ECDSA signature uses a secret random k to compute R = kG, sets r to R’s x-coordinate mod n, and computes s = k⁻¹(z + rd) mod n, where z is the message hash and d the private key. A verifier with only the public key Q = dG computes u₁ = z/s and u₂ = r/s and checks that u₁G + u₂Q has x-coordinate r. Signing two messages with the same k repeats r, and subtracting the two s equations gives k = (z₁ − z₂)/(s₁ − s₂) and then d = (s₁k − z₁)/r. Sony’s PS3 used a fixed k and lost its signing key in 2010, and an Android random-number bug emptied Bitcoin wallets in 2013. Even slightly biased k values leak keys through lattice attacks, so k is derived deterministically from the key and message (RFC 6979), or Ed25519, designed that way, is used instead.', sEcdsa()),
    item('cy-fs', '순방향 비밀성', 'Forward secrecy', '세션마다 임시 키로 키를 합의하고 지워요. 나중에 장기 키가 새도 지난 대화는 풀리지 않아요.', '도청자는 지금 풀 수 없는 암호문도 일단 저장해 둘 수 있어요. 예전 TLS의 RSA 키 전송 방식은 클라이언트가 세션 키를 서버의 공개 키로 암호화해 보냈기 때문에, 몇 년 뒤 서버 개인 키가 유출되면 녹화된 모든 세션이 한꺼번에 풀려요. ECDHE는 세션마다 새 임시 키 쌍으로 디피-헬먼을 해서 공유 비밀을 만들고, 끝나면 임시 키를 지워요. 서버의 장기 키는 이 교환에 서명하는 데만 쓰이므로, 나중에 새도 공격자는 앞으로의 위장만 할 수 있고 지난 세션은 그대로 안전해요. TLS 1.3은 RSA 키 전송을 없애고 (EC)DHE만 남겼고, 메신저의 더블 래칫은 이 원리를 메시지 단위로 적용해요.', 'Agree on keys with ephemeral key pairs and erase them after each session. A later leak of the long-term key leaves past conversations sealed.', 'An eavesdropper can store ciphertext today and wait. With the old TLS RSA key transport, the client encrypted the session key under the server’s public key, so if that private key leaked years later every recorded session could be decrypted at once. ECDHE runs Diffie–Hellman with a fresh ephemeral key pair per session and erases it afterward. The server’s long-term key only signs the exchange, so a later leak lets an attacker impersonate the server in future but leaves past sessions safe. TLS 1.3 removed RSA key transport and kept only (EC)DHE, and messengers’ Double Ratchet applies the same idea to every message.', sFs()),
    item('cy-hybrid', '하이브리드 암호', 'Hybrid encryption', '공개키 암호로는 대칭키만 나르고, 실제 데이터는 빠른 대칭키 암호로 암호화해요. 거의 모든 실제 시스템의 구조예요.', '공개키 연산은 대칭키 암호보다 수천 배 느리고 한 번에 작은 값만 다룰 수 있어서, 큰 데이터를 직접 암호화하지 않아요. 대신 KEM(키 캡슐화 메커니즘)으로 받는 사람의 공개 키에 대해 무작위 공유 비밀 ss와 캡슐 enc를 만들고, ss를 HKDF로 대칭키로 바꿔 데이터를 AES-GCM 같은 AEAD로 암호화해요. 보내는 것은 32바이트 정도의 enc와 암호문뿐이고, 받는 사람은 개인 키로 enc를 열어 같은 키를 얻어요. 이 KEM-DEM 구조는 TLS, PGP, HPKE(RFC 9180), 클라우드 KMS의 봉투 암호화에 그대로 쓰이고, KEM 자리에 ML-KEM 같은 양자내성 알고리즘을 끼워 넣기도 쉬워요.', 'Public-key crypto carries only a symmetric key, and fast symmetric encryption handles the data. Nearly every real system works this way.', 'Public-key operations are thousands of times slower than symmetric ciphers and handle only small values, so they never encrypt bulk data directly. Instead a KEM (key encapsulation mechanism) produces a random shared secret ss and a capsule enc for the recipient’s public key; HKDF turns ss into a symmetric key, and the data is encrypted with an AEAD such as AES-GCM. Only the roughly 32-byte enc and the ciphertext are sent, and the recipient opens enc with the private key to get the same key. This KEM-DEM structure underlies TLS, PGP, HPKE (RFC 9180) and cloud KMS envelope encryption, and swapping in a post-quantum KEM such as ML-KEM is straightforward.', sHybrid())
  ]),
  sec('cy-advanced', '현대 암호의 응용', 'Modern applications', '보여 주지 않고 증명하고 계산하기', 'Proving and computing without revealing', '비밀을 보여 주지 않고 아는 걸 증명하는 영지식 증명, 여러 명이 나눠 갖는 비밀 분산, 암호문 그대로 계산하는 동형 암호, 양자 컴퓨터 이후를 대비하는 양자내성 암호, 그리고 메신저의 종단간 암호화까지, 지금 실제로 쓰이는 암호예요.', 'Zero-knowledge proofs that show knowledge without revealing it, secret sharing across many parties, homomorphic encryption that computes on ciphertext, post-quantum cryptography for the era after quantum computers, and the end-to-end encryption inside messengers: cryptography in use today.', [
    item('cy-zkp', '영지식 증명', 'Zero-knowledge proofs', '비밀 x를 보여 주지 않고 x를 안다는 사실만 증명해요. 약속, 도전, 응답 세 단계의 슈노어 프로토콜로 원리를 봐요.', '슈노어 프로토콜에서 증명자는 y = gˣ의 x를 안다는 걸 보이려 해요. 먼저 무작위 r로 t = gʳ를 보내 약속하고, 검증자가 무작위 도전값 c를 보내면, s = r + cx로 응답해요. 검증자는 gˢ = t · yᶜ인지 확인하는데, p = 23, g = 5, x = 6, r = 3, c = 4라면 s = 27 ≡ 5이고 5⁵ = 20 = 10 · 8⁴ mod 23이 맞아요. x를 모르면 c를 미리 알지 못하는 한 맞는 s를 만들 수 없고(건전성), r이 무작위라 s는 x에 대해 아무것도 알려 주지 않아요(영지식). c를 H(t, m)으로 바꾸는 피아트-샤미르 변환을 하면 대화 없이 검증 가능한 슈노어 서명이 되고, Ed25519도 이 계열이에요. zk-SNARK는 임의의 계산이 올바르게 수행됐다는 사실을 수백 바이트로 증명해 블록체인 롤업과 신원 증명에 쓰여요.', 'Prove you know a secret x without revealing it. The three-move Schnorr protocol of commit, challenge and response shows how.', 'In the Schnorr protocol a prover shows it knows the x behind y = gˣ. It first commits to t = gʳ for a random r; the verifier replies with a random challenge c; the prover answers s = r + cx. The verifier checks gˢ = t · yᶜ: with p = 23, g = 5, x = 6, r = 3 and c = 4, s = 27 ≡ 5 and 5⁵ = 20 = 10 · 8⁴ mod 23. Without x no valid s can be produced unless c is known in advance (soundness), and because r is random, s reveals nothing about x (zero knowledge). Replacing c with H(t, m), the Fiat–Shamir transform, yields the non-interactive Schnorr signature, the family Ed25519 belongs to. zk-SNARKs prove that an arbitrary computation was done correctly in a few hundred bytes and power blockchain rollups and identity proofs.', sZkp()),
    item('cy-shamir', '샤미르 비밀 분산', 'Shamir secret sharing', '비밀을 다항식의 상수항에 숨기고 조각을 나눠 줘요. 아무 k명이면 복원하고, k − 1명으로는 아무것도 알 수 없어요.', '샤미르 비밀 분산은 비밀 S를 상수항으로 하는 k − 1차 다항식을 무작위로 만들어요. S = 1234, k = 3이면 f(x) = 1234 + 166x + 94x²처럼 고르고, 참가자 n = 6명에게 f(1) = 1494부터 f(6) = 5614까지 한 조각씩 나눠 줘요. 2차식은 점 3개로 하나로 정해지므로 아무 3명이 모이면 라그랑주 보간으로 f(0) = 1234를 되찾아요. 2명뿐이면 두 점을 지나는 포물선이 무수히 많아 비밀이 어떤 값이든 될 수 있고, 이는 계산량과 무관한 정보 이론적 안전성이에요. 실제로는 정수 대신 소수 p에 대한 나머지 위에서 계산해야 이 성질이 정확히 성립해요. 키 백업과 복구, 여러 명이 함께 서명하는 임계 서명, DNSSEC 루트 키 관리, 암호화폐 지갑에 쓰여요.', 'Hide the secret in a polynomial’s constant term and hand out points. Any k shares recover it; k − 1 reveal nothing.', 'Shamir secret sharing builds a random polynomial of degree k − 1 whose constant term is the secret S. For S = 1234 and k = 3, pick f(x) = 1234 + 166x + 94x² and give each of n = 6 participants one share, f(1) = 1494 through f(6) = 5614. Three points determine a quadratic, so any three people recover f(0) = 1234 by Lagrange interpolation. Two shares fit infinitely many parabolas, so the secret could be anything: information-theoretic security, independent of computing power. Real implementations compute modulo a prime p so that this holds exactly. It is used for key backup and recovery, threshold signatures, management of the DNSSEC root key and cryptocurrency wallets.', sShamir()),
    item('cy-he', '동형 암호', 'Homomorphic encryption', '암호문 상태 그대로 계산하고, 결과를 복호화하면 평문으로 계산한 값과 같아요. 데이터를 보여 주지 않고 계산을 맡길 수 있어요.', '동형 암호는 Enc(a)와 Enc(b)로 Enc(a ∘ b)를 만들 수 있는 암호예요. 교과서 RSA는 곱셈에 대해 동형이라, n = 3233, e = 17로 Enc(5) = 3086, Enc(13) = 47을 서버에 보내면 서버는 3086 × 47 mod 3233 = 2790을 계산하고, 이를 복호화하면 65 = 5 × 13이 나와요. Paillier 암호는 덧셈에 대해 동형이라 전자 투표 집계 등에 쓰였어요. 덧셈과 곱셈을 모두 지원하는 완전 동형 암호(FHE)는 2009년 크레이그 젠트리가 처음 만들었고, 어떤 계산이든 암호문 위에서 할 수 있어요. 격자 기반이라 연산마다 잡음이 커지고, 부트스트래핑으로 잡음을 줄이는 데 비용이 커서 평문 계산보다 수천~수백만 배 느려요. BFV, CKKS, TFHE 같은 방식이 암호화된 의료 데이터 분석, 비공개 모델 추론 등에 시도되고 있어요.', 'Compute directly on ciphertexts, and decrypting the result matches computing on plaintexts. Computation can be outsourced without revealing the data.', 'Homomorphic encryption lets you derive Enc(a ∘ b) from Enc(a) and Enc(b). Textbook RSA is multiplicatively homomorphic: with n = 3233 and e = 17, sending Enc(5) = 3086 and Enc(13) = 47 lets a server compute 3086 × 47 mod 3233 = 2790, which decrypts to 65 = 5 × 13. Paillier encryption is additively homomorphic and has been used for vote tallying. Fully homomorphic encryption, supporting both addition and multiplication, was first built by Craig Gentry in 2009 and can evaluate any computation on ciphertexts. Being lattice-based, its noise grows with each operation, and bootstrapping to reduce it is costly, so it runs thousands to millions of times slower than plaintext computation. Schemes such as BFV, CKKS and TFHE are being applied to encrypted medical analytics and private model inference.', sHe()),
    item('cy-pqc', '양자내성 암호', 'Post-quantum cryptography', '양자 컴퓨터는 RSA와 타원곡선을 깰 수 있어요. 오차가 섞인 연립방정식(LWE) 같은 격자 문제로 옮겨 가는 중이에요.', '충분히 큰 양자 컴퓨터가 생기면 쇼어 알고리즘이 소인수분해와 이산 로그를 효율적으로 풀어 RSA, 디피-헬먼, 타원곡선 암호가 모두 깨져요. 그로버 알고리즘은 대칭키 탐색을 제곱근으로 줄일 뿐이라 AES-256이나 SHA-384처럼 길이를 늘리면 돼요. 지금 녹화한 암호문을 나중에 풀 수 있으므로 오래 지켜야 할 데이터는 미리 옮겨야 해요. 대표 후보인 LWE 문제는 비밀 s에 공개 행렬 A를 곱하고 작은 오차 e를 더한 b = As + e를 공개해요. 오차가 없으면 소거법으로 바로 풀리지만, 수백 차원에서 작은 오차가 섞이면 격자에서 가까운 점을 찾는 문제가 되어 양자 컴퓨터로도 어렵다고 여겨져요. NIST는 2024년 8월 ML-KEM(FIPS 203), ML-DSA(FIPS 204), SLH-DSA(FIPS 205)를 표준으로 발표했고, 브라우저 TLS의 X25519MLKEM768, Signal의 PQXDH, 애플 iMessage PQ3처럼 기존 알고리즘과 함께 쓰는 하이브리드 방식으로 배포되고 있어요.', 'Quantum computers could break RSA and elliptic curves, so cryptography is moving to lattice problems like Learning With Errors.', 'A large enough quantum computer running Shor’s algorithm would solve factoring and discrete logarithms efficiently, breaking RSA, Diffie–Hellman and elliptic curves. Grover’s algorithm only square-roots symmetric key search, so longer sizes such as AES-256 and SHA-384 suffice. Because ciphertext recorded today could be decrypted later, long-lived data must migrate early. The leading candidate problem, Learning With Errors, publishes b = As + e for a secret s, a public matrix A and a small error e. Without the error, elimination solves it at once, but small errors in hundreds of dimensions turn it into finding a close point in a lattice, believed hard even for quantum computers. In August 2024 NIST published ML-KEM (FIPS 203), ML-DSA (FIPS 204) and SLH-DSA (FIPS 205), now rolling out as hybrids with classical algorithms, such as X25519MLKEM768 in browser TLS, Signal’s PQXDH and Apple’s iMessage PQ3.', sPqc()),
    item('cy-e2ee', '종단간 암호화 (Signal)', 'End-to-end encryption (Signal)', '서버도 내용을 볼 수 없게 두 사용자만 키를 가져요. X3DH로 시작하고 더블 래칫으로 메시지마다 키를 바꿔요.', '종단간 암호화는 서버가 메시지를 전달만 하고 내용은 볼 수 없게 해요. Signal 프로토콜에서 밥은 신원 키와 여러 개의 일회용 prekey를 미리 서버에 올려 두고, 앨리스는 밥이 오프라인이어도 그 prekey로 X3DH 키 합의를 해 공유 비밀을 만들어요. 이후 더블 래칫이 돌아가요. 대칭 래칫은 메시지마다 체인 키를 KDF로 한 칸 돌려 메시지 키를 뽑고 쓴 키는 지워서, 지금 키가 털려도 지난 메시지를 보호해요(순방향 비밀성). DH 래칫은 답장마다 새 DH 키 쌍을 섞어 루트 키를 갱신해서, 키가 한 번 털려도 다음 왕복부터 다시 안전해져요(침해 후 회복). 사용자는 안전 번호를 비교해 서버가 키를 바꿔치기하지 않았는지 확인해요. WhatsApp, Google 메시지도 이 프로토콜을 쓰고, Signal은 2023년 PQXDH로 초기 합의에 ML-KEM을 더했어요.', 'Only the two users hold keys, so not even the server can read messages. X3DH starts the session and the Double Ratchet changes keys with every message.', 'End-to-end encryption lets the server relay messages without being able to read them. In the Signal Protocol, Bob uploads an identity key and a batch of one-time prekeys in advance, and Alice uses them to run the X3DH key agreement even while Bob is offline. The Double Ratchet then takes over. The symmetric ratchet turns the chain key one step through a KDF for each message key and erases used keys, protecting past messages if a current key leaks (forward secrecy). The DH ratchet mixes a fresh DH key pair into the root key with every reply, so security recovers one round trip after a compromise (post-compromise security). Users compare safety numbers to confirm the server did not swap keys. WhatsApp and Google Messages also use the protocol, and Signal added ML-KEM to the initial agreement with PQXDH in 2023.', sE2ee())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
