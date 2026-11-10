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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'nsx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono nsx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono nsx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c nsx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono nsx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c nsx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'nsx-s nsx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono nsx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono nsx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono nsx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono nsx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono nsx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'nsx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'nsx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'nsx-xs nsx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono nsx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'nsx-a', g: 'nsx-g', r: 'nsx-r', w: 'nsx-w', m: 'cz-mono', s: 'nsx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'nsx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono nsx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono nsx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'nsx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.nsx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.nsx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.nsx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.nsx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.nsx-r .in{color:var(--danger);font-weight:800}
.nsx-g .in{color:var(--ok);font-weight:800}
.nsx-a .in{color:var(--accent);font-weight:800}
.nsx-w .in{color:var(--warn);font-weight:800}
.nsx-c .in{font-size:.6em;font-weight:700}
.nsx-c2 .in{font-size:.5em;font-weight:700}
.nsx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.nsx-wr .in{white-space:normal!important}
.nsx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.nsx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== NestJS · 1. core structure ===== */
const CSSY = '.nsx-ic .in{color:inherit!important}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc nsx-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
/* a titled box: frame + caption in the top-left */
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };

function sModule() {
  return CW('nest-module', {
    code: ['@Module({', '  imports: [UsersModule, ConfigModule],', '  controllers: [OrdersController],', '  providers: [OrdersService],', '  exports: [OrdersService],', '})', 'export class OrdersModule {}', ['// AppModule이 루트 → 모듈 그래프', '// AppModule is the root of a module graph']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2], [4, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'app', X + 3.5, .6, 5.0, 'AppModule', 'ink', 1, { h: 1.1 });
      tbox(S, 'ord', X + 3.0, 3.0, 5.8, 4.4, 'OrdersModule', 'accent', 1, { tc: 'a' });
      ed(S, 'e0', [X + 6.0, 1.7], [X + 6.0, 3.0], 1);
      nd(S, 'us', X, 3.4, 2.6, 'Users', 'ok', 2, { h: 1.1 }); nd(S, 'cf', X, 5.2, 2.6, 'Config', 'ok', 2, { h: 1.1 });
      arw(S, 'i0', [X + 3.0, 3.95], [X + 2.65, 3.95], 2); arw(S, 'i1', [X + 3.0, 5.75], [X + 2.65, 5.75], 2);
      lbl(S, 'n2', X, 8.0, ['imports: 다른 모듈이 내보낸 것을 가져와요', 'imports pulls in what other modules export'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'ct', X + 3.2, 4.0, 5.4, 'OrdersController', 'accent', 3, { h: 1.1 }); nd(S, 'sv', X + 3.2, 5.8, 5.4, 'OrdersService', 'warn', 3, { h: 1.1 }); arw(S, 'cs', [X + 5.9, 5.15], [X + 5.9, 5.75], 3);
      lbl(S, 'n3', X, 8.0, ['controllers는 요청, providers는 로직', 'controllers take requests, providers hold logic'], 'a', 3, { off: 4, w: 12 });
      nd(S, 'pay', X + 9.2, 5.8, 2.8, 'Payments', 'line', 4, { h: 1.1 }); arw(S, 'ex', [X + 8.65, 6.35], [X + 9.15, 6.35], 4, { color: 'warn' });
      lbl(S, 'n4', X, 8.0, ['exports한 것만 바깥에서 주입받아요', 'only exported providers can be injected outside'], 'w', 4, { w: 12 });
    },
    notes: [['@Module 데코레이터가 관련된 컨트롤러와 프로바이더를 하나의 기능 단위로 묶어요 · AppModule이 루트예요', 'the @Module decorator groups related controllers and providers into one feature unit, with AppModule at the root'], ['imports에 적은 모듈이 내보낸 프로바이더를 이 모듈 안에서 쓸 수 있어요', 'modules listed in imports make their exported providers available here'], ['controllers는 HTTP 요청을 받는 클래스, providers는 서비스처럼 주입될 로직이에요', 'controllers are classes that receive HTTP requests, and providers are injectable logic such as services'], ['프로바이더는 기본적으로 모듈 안에 숨겨져 있어요 · exports에 적은 것만 이 모듈을 import한 다른 모듈이 주입받아요', 'providers are private to their module by default; only those in exports can be injected by modules that import it']],
    fin: [['모듈: 기능 단위로 코드를 묶고 캡슐화하는 Nest의 기본 구조 · 모듈들이 의존 그래프를 이뤄요', 'modules group and encapsulate code by feature, the basic structure of Nest, forming a dependency graph', 'nsx-xs nsx-a'], ['기능별 모듈(Orders, Users)로 나누면 경계가 분명해져요', 'feature modules such as Orders and Users make boundaries clear'], ['어디서나 쓰는 모듈은 @Global()로 등록할 수 있지만 남발은 금물', '@Global() exists for ubiquitous modules, but use it sparingly']],
    caps: [['@Module', '@Module'], ['imports', 'imports'], ['controllers와 providers', 'controllers and providers'], ['exports', 'exports'], ['모듈', 'Modules']]
  });
}

function sController() {
  return CW('nest-controller', {
    code: ["@Controller('orders')", 'export class OrdersController {', '  constructor(private svc: OrdersService) {}', "  @Get(':id')", "  findOne(@Param('id') id: string) {", '    return this.svc.findOne(+id);', '  }', '  @Post() @HttpCode(201)', '  create(@Body() dto: CreateOrderDto) {…}', '}'],
    hl: [[0, 1], [3, 2, 'ok'], [5, 1, 'warn'], [7, 2]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'rq', X, .8, 12.0, 'GET /orders/42', 'line', 1, { off: 4, h: 1.1 });
      nd(S, 'pf', X, 2.6, 5.6, "'orders'", 'accent', 1, { off: 4, h: 1.1 }); lbl(S, 'pfl', X, 3.8, ['경로 접두사', 'path prefix'], 'a', 1, { off: 4 });
      nd(S, 'pr', X + 6.4, 2.6, 5.6, "':id' → id = '42'", 'ok', 2, { off: 4, h: 1.1 }); lbl(S, 'prl', X + 6.4, 3.8, ['@Param으로 꺼내요', 'read via @Param'], 'g', 2, { off: 4 });
      lbl(S, 'n1', X, 5.4, ['@Controller가 경로 묶음을 정해요', '@Controller sets the route group'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 5.4, ['메서드 데코레이터 + 경로 = 라우트', 'method decorator plus path = route'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'js', X, 5.0, 12.0, '200  { "id": 42, "status": "paid" }', 'warn', 3, { off: 4, h: 1.1 }); arw(S, 'ja', [X + 6.0, 4.3], [X + 6.0, 4.9], 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['반환한 객체가 그대로 JSON 응답', 'the returned object becomes JSON'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'pq', X, .8, 12.0, 'POST /orders  { "qty": 3 }', 'line', 4, { h: 1.1 }); arw(S, 'pa', [X + 6.0, 2.0], [X + 6.0, 2.6], 4); nd(S, 'dt', X, 2.7, 12.0, 'dto: CreateOrderDto', 'accent', 4, { h: 1.1 }); nd(S, 'c2', X, 4.6, 12.0, '201 Created', 'ok', 4, { h: 1.1 });
      lbl(S, 'n4', X, 6.2, ['@Body는 본문, @HttpCode는 상태 코드', '@Body reads the body, @HttpCode sets status'], 'a', 4, { w: 12 });
    },
    notes: [["@Controller('orders')가 이 클래스의 모든 라우트 앞에 /orders를 붙여요", "@Controller('orders') prefixes every route in the class with /orders"], ["@Get(':id')와 @Param('id')로 GET /orders/42의 42를 꺼내요 · 경로 값은 문자열이에요", "@Get(':id') with @Param('id') extracts 42 from GET /orders/42, and path values are strings"], ['핸들러가 반환한 객체나 배열은 자동으로 JSON 응답이 되고, Promise도 기다려 줘요', 'objects or arrays a handler returns become JSON responses automatically, and promises are awaited'], ['@Post와 @Body로 본문을 DTO로 받고, POST의 기본 201 대신 @HttpCode로 상태 코드를 바꿀 수 있어요', '@Post with @Body receives the body as a DTO, and @HttpCode overrides the status code (POST defaults to 201)']],
    fin: [['컨트롤러: 데코레이터로 경로와 HTTP 메서드를 선언하고 요청을 서비스에 넘기는 얇은 계층', 'controllers declare paths and HTTP methods with decorators and hand requests to services, a thin layer', 'nsx-xs nsx-a'], ['@Query, @Headers, @Req로 다른 요청 정보도 꺼내요', '@Query, @Headers and @Req read other request data'], ['비즈니스 로직은 서비스에 두고 컨트롤러는 얇게 유지해요', 'keep business logic in services and controllers thin']],
    caps: [['경로 접두사', 'Path prefixes'], ['경로 매개변수', 'Route parameters'], ['자동 JSON', 'Automatic JSON'], ['본문과 상태 코드', 'Bodies and status codes'], ['컨트롤러', 'Controllers']]
  });
}

function sProvider() {
  return CW('nest-provider', {
    code: ['@Injectable()', 'export class OrdersService {', '  constructor(', '    private repo: OrdersRepository,', '    private mail: MailService,', '  ) {}', '}', ['// new로 만들지 않아요 · 컨테이너가 만들어 줘요', '// never new it up: the container builds it']],
    hl: [[0, 1], [2, 4, 'ok'], [7, 1, 'warn'], [0, 7]],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'ioc', X, .6, 12.0, 7.4, ['IoC 컨테이너', 'IoC container'], 'ink-3', 0, { dash: 1 });
      nd(S, 'sv', X + 3.0, 1.6, 6.0, 'OrdersService', 'accent', 1, { h: 1.1 });
      nd(S, 'rp', X + .4, 4.0, 5.4, 'OrdersRepository', 'ok', 2, { h: 1.1 }); nd(S, 'ml', X + 6.2, 4.0, 5.4, 'MailService', 'ok', 2, { h: 1.1 });
      ed(S, 'd0', [X + 3.1, 4.0], [X + 4.5, 2.7], 2); ed(S, 'd1', [X + 8.9, 4.0], [X + 7.5, 2.7], 2);
      lbl(S, 'n2', X, 8.6, ['생성자 타입이 곧 의존성 목록', 'constructor types are the dependency list'], 'g', 2, { off: 3, w: 12 });
      [['1', X + .4, 2.9], ['1', X + 10.7, 2.9], ['2', X + 9.3, 1.7]].forEach(([t, x, y], i) => chip(S, 'o' + i, x, y, .9, t, 'warn', 3, { off: 4, h: .9, css: 'z-index:3;border-radius:50%' }));
      lbl(S, 'n3', X, 8.6, ['의존성을 먼저 만들고 주입해요', 'dependencies are built first, then injected'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'c1', X + .4, 6.2, 5.4, 'OrdersController', 'line', 4, { h: 1.0 }); nd(S, 'c2', X + 6.2, 6.2, 5.4, 'ReportsService', 'line', 4, { h: 1.0 });
      ed(S, 'u0', [X + 3.1, 6.2], [X + 5.0, 2.7], 4, { color: 'accent' }); ed(S, 'u1', [X + 8.9, 6.2], [X + 7.0, 2.7], 4, { color: 'accent' });
      lbl(S, 'n4', X, 8.6, ['기본은 싱글턴 · 같은 인스턴스를 공유', 'singleton by default: one shared instance'], 'a', 4, { w: 12 });
    },
    notes: [['@Injectable()을 단 클래스는 프로바이더예요 · 모듈의 providers에 등록하면 Nest의 IoC 컨테이너가 관리해요', 'a class marked @Injectable() is a provider, managed by Nest’s IoC container once registered in a module’s providers'], ['생성자 매개변수의 타입이 필요한 의존성 목록이에요 · TypeScript 메타데이터로 Nest가 이 타입을 읽어요', 'the constructor parameter types are the dependency list, which Nest reads from TypeScript metadata'], ['직접 new 하지 않아요 · 컨테이너가 의존성부터 만들고 생성자에 넣어서 서비스를 완성해요', 'nothing calls new: the container builds dependencies first and passes them to the constructor'], ['기본 범위는 싱글턴이라 앱 전체에서 같은 인스턴스를 공유해요', 'the default scope is singleton, so the whole app shares one instance']],
    fin: [['의존성 주입(DI): 객체가 필요한 것을 직접 만들지 않고 컨테이너가 넣어 주는 방식 · 결합도를 낮춰요', 'dependency injection means objects receive what they need from a container instead of creating it, lowering coupling', 'nsx-xs nsx-a'], ['테스트에서 가짜 저장소로 바꿔 끼우기 쉬워요', 'tests can swap in a fake repository easily'], ['순환 의존은 설계 신호 · 정 필요하면 forwardRef()', 'circular dependencies signal a design issue; forwardRef() is the last resort']],
    caps: [['@Injectable', '@Injectable'], ['생성자 주입', 'Constructor injection'], ['생성 순서', 'Creation order'], ['싱글턴 공유', 'Shared singletons'], ['프로바이더와 DI', 'Providers and DI']]
  });
}

function sCustomProvider() {
  return CW('nest-custom-provider', {
    code: ['providers: [', "  { provide: API_KEY, useValue: 'secret' },", '  { provide: Cache, useClass: RedisCache },', '  { provide: DB, useFactory: connectDb,', '    inject: [ConfigService] },', '  { provide: Old, useExisting: New },', ']', 'constructor(@Inject(API_KEY) key: string) {}'],
    hl: [[1, 1], [2, 1, 'ok'], [3, 2, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4, row = (k, y, t, r, c, st) => { nd(S, k + 'a', X, y, 3.8, t, 'line', st, { h: 1.1 }); arw(S, k + 'r', [X + 3.9, y + .55], [X + 4.9, y + .55], st); nd(S, k + 'b', X + 5.0, y, 7.0, r, c, st, { h: 1.1 }); };
      row('v', .8, 'API_KEY', "'secret'", 'accent', 1); lbl(S, 'n1', X, 7.4, ['useValue: 값을 그대로 · 설정·목 객체', 'useValue: a ready value, config or mocks'], 'a', 1, { off: 2, w: 12 });
      row('c', 2.4, 'Cache', 'new RedisCache()', 'ok', 2); lbl(S, 'n2', X, 7.4, ['useClass: 토큰은 같고 구현만 교체', 'useClass: same token, swapped implementation'], 'g', 2, { off: 3, w: 12 });
      row('f', 4.0, 'DB', 'connectDb(config)', 'warn', 3); lbl(S, 'inl', X + 3.2, 5.5, 'inject', 'm', 3); nd(S, 'in', X + 5.0, 5.4, 7.0, 'ConfigService', 'line', 3, { h: .9 }); lbl(S, 'n3', X, 7.4, ['useFactory: 의존성을 받아 비동기로도 생성', 'useFactory: build from deps, even async'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.4, ['@Inject(토큰)으로 클래스가 아닌 것도 주입', '@Inject(token) injects non-class values'], 'a', 4, { w: 12 });
    },
    notes: [['프로바이더는 “토큰 → 만드는 방법”의 짝이에요 · useValue는 상수나 테스트용 목 객체를 그대로 등록해요', 'a provider pairs a token with a recipe; useValue registers a constant or a test mock as is'], ['useClass는 토큰은 그대로 두고 실제로 만들 클래스를 바꿔요 · 환경별로 구현을 갈아 끼울 때 써요', 'useClass keeps the token but changes which class gets built, handy for per-environment implementations'], ['useFactory는 inject로 받은 의존성으로 값을 만들어요 · async 함수면 연결이 끝날 때까지 기다려요', 'useFactory builds a value from injected dependencies, and an async factory is awaited before startup continues'], ['문자열이나 심볼 토큰은 @Inject(API_KEY)로 주입받아요 · useExisting은 기존 프로바이더에 별칭을 붙여요', 'string or symbol tokens are injected with @Inject(API_KEY), and useExisting creates an alias for an existing provider']],
    fin: [['커스텀 프로바이더: useValue·useClass·useFactory·useExisting으로 “무엇을 어떻게 주입할지”를 직접 정해요', 'custom providers decide what to inject and how through useValue, useClass, useFactory and useExisting', 'nsx-xs nsx-a'], ['토큰은 문자열보다 Symbol이나 상수로 만들어 오타를 막아요', 'prefer Symbol or constant tokens over raw strings to avoid typos'], ['동적 모듈과 테스트에서 특히 많이 써요', 'they appear constantly in dynamic modules and tests']],
    caps: [['useValue', 'useValue'], ['useClass', 'useClass'], ['useFactory', 'useFactory'], ['@Inject 토큰', '@Inject tokens'], ['커스텀 프로바이더', 'Custom providers']]
  });
}

function sScope() {
  return CW('nest-scope', {
    code: [['@Injectable()   // 기본: 싱글턴', '@Injectable()   // default: singleton'], '@Injectable({ scope: Scope.REQUEST })', '@Injectable({ scope: Scope.TRANSIENT })', 'constructor(@Inject(REQUEST) req: Request) {}', ['// REQUEST 범위는 주입받는 쪽으로 번져요', '// REQUEST scope bubbles up to consumers']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      ['req 1', 'req 2', 'req 3'].forEach((t, i) => lbl(S, 'r' + i, X, 1.0 + i * 1.5, t, 'm', 0));
      [0, 1, 2].forEach(i => ed(S, 'l' + i, [X + 1.8, 1.45 + i * 1.5], [X + 6.0, 1.45 + i * 1.5], 0));
      nd(S, 's1', X + 6.2, .9, 3.0, '#1', 'accent', 1, { off: 2, h: 4.0 }); lbl(S, 'n1', X, 5.6, ['인스턴스 하나를 모든 요청이 공유', 'every request shares one instance'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => nd(S, 'q' + i, X + 6.2, .9 + i * 1.5, 3.0, '#' + (i + 1), 'ok', 2, { off: 3, h: 1.1 })); lbl(S, 'n2', X, 5.6, ['요청마다 새 인스턴스 · 요청 정보 보관', 'a new instance per request'], 'g', 2, { off: 3, w: 12 });
      [0, 1].forEach(i => nd(S, 'tc' + i, X + 6.2, .9 + i * 1.5, 2.6, ['소비자 ', 'user '].map(s => s + 'AB'[i]), 'line', 3, { off: 4, h: 1.1 })); [0, 1].forEach(i => nd(S, 'tt' + i, X + 9.2, .9 + i * 1.5, 2.6, '#' + (i + 1), 'warn', 3, { off: 4, h: 1.1 }));
      lbl(S, 'n3', X, 5.6, ['주입받는 곳마다 따로 생성', 'one instance per consumer'], 'w', 3, { off: 4, w: 12 });
      ['Controller', 'Service', 'Repo (REQUEST)'].forEach((t, i) => nd(S, 'b' + i, X + 6.2, .9 + i * 1.5, 5.8, t, 'danger', 4, { h: 1.1 })); [0, 1].forEach(i => arw(S, 'ba' + i, [X + 9.1, 2.38 + i * 1.5], [X + 9.1, 2.04 + i * 1.5], 4, { color: 'danger' }));
      lbl(S, 'n4', X, 5.6, ['체인 전체가 요청마다 생성 → 느려져요', 'the whole chain is rebuilt per request'], 'r', 4, { w: 12 });
    },
    notes: [['기본 범위는 싱글턴이라 앱이 시작할 때 한 번 만들어 모든 요청이 공유해요 · 가장 빠르고 권장돼요', 'the default singleton scope builds once at startup and is shared by all requests, the fastest and recommended option'], ['Scope.REQUEST는 요청마다 새 인스턴스를 만들어요 · 요청별 사용자나 테넌트 정보를 담을 때 써요', 'Scope.REQUEST creates a new instance per request, for holding per-request user or tenant data'], ['Scope.TRANSIENT는 주입받는 소비자마다 별도 인스턴스를 줘요', 'Scope.TRANSIENT gives each consuming class its own instance'], ['REQUEST 범위 프로바이더를 주입받는 컨트롤러와 서비스도 요청 범위가 되어, 체인 전체가 매 요청 새로 만들어져요', 'controllers and services injecting a REQUEST-scoped provider become request-scoped too, so the whole chain is rebuilt per request']],
    fin: [['주입 범위: DEFAULT(싱글턴)·REQUEST·TRANSIENT로 인스턴스의 수명을 정해요', 'injection scopes, DEFAULT (singleton), REQUEST and TRANSIENT, set an instance’s lifetime', 'nsx-xs nsx-a'], ['요청별 정보는 AsyncLocalStorage(nestjs-cls 등)로도 전달해요', 'per-request data can also travel via AsyncLocalStorage, e.g. nestjs-cls'], ['싱글턴에는 요청별 상태를 필드로 저장하지 않아요', 'never store per-request state in singleton fields']],
    caps: [['싱글턴', 'Singleton'], ['REQUEST', 'REQUEST'], ['TRANSIENT', 'TRANSIENT'], ['범위 전파', 'Scope bubbling'], ['주입 범위', 'Injection scopes']]
  });
}

function sBootstrap() {
  return CW('nest-bootstrap', {
    code: ['async function bootstrap() {', '  const app = await NestFactory.create(App);', "  app.setGlobalPrefix('api');", '  app.enableShutdownHooks();', '  await app.listen(process.env.PORT ?? 3000);', '}', 'class Db implements OnModuleInit {', '  onModuleInit() { return this.connect(); }', '}'],
    hl: [[1, 1], [6, 2, 'ok'], [4, 1, 'warn'], [3, 1, 'danger']],
    draw: (S) => {
      const X = 19.4, P = [['create', 'line', 1], ['scan + DI', 'line', 1], ['onModuleInit', 'ok', 2], ['onApplicationBootstrap', 'ok', 2], ['listen :3000', 'warn', 3], ['SIGTERM', 'danger', 4], ['onModuleDestroy', 'danger', 4], ['onApplicationShutdown', 'danger', 4]];
      P.forEach(([t, c, st], i) => { nd(S, 'p' + i, X + 1.6, .6 + i * 1.15, 8.8, t, c, st, { h: .95 }); if (i) arw(S, 'pa' + i, [X + 6.0, .6 + i * 1.15 - .2], [X + 6.0, .6 + i * 1.15 - .02], st); });
      lbl(S, 'n1', X, 10.1, ['모듈을 훑고 의존성 그래프를 만들어요', 'scans modules and builds the DI graph'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 10.1, ['연결·초기화는 수명 주기 훅에서', 'connect and initialize in lifecycle hooks'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 10.1, ['초기화가 끝나야 요청을 받아요', 'requests arrive only after init'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 10.1, ['종료 신호에 정리 훅 실행(연결 닫기)', 'shutdown hooks close connections'], 'r', 4, { w: 12 });
    },
    notes: [['main.ts의 NestFactory.create가 루트 모듈부터 모든 모듈을 훑어 의존성 그래프를 만들고 인스턴스를 생성해요', 'NestFactory.create in main.ts scans every module from the root, builds the dependency graph and instantiates providers'], ['OnModuleInit, OnApplicationBootstrap 같은 훅을 구현하면 초기화 시점에 DB 연결 같은 준비 작업을 할 수 있어요', 'implementing hooks such as OnModuleInit and OnApplicationBootstrap runs setup such as database connections at init time'], ['모든 초기화가 끝난 뒤 listen이 포트를 열고 요청을 받기 시작해요', 'listen opens the port and starts accepting requests only after initialization completes'], ['enableShutdownHooks를 켜면 SIGTERM 같은 종료 신호에 onModuleDestroy·onApplicationShutdown이 실행돼 연결을 깔끔하게 닫아요', 'with enableShutdownHooks, signals such as SIGTERM run onModuleDestroy and onApplicationShutdown to close connections cleanly']],
    fin: [['부트스트랩과 수명 주기: 생성 → 초기화 훅 → listen → 종료 훅 순서로 앱이 살고 죽어요', 'bootstrap and lifecycle: an app lives through create, init hooks and listen, then dies through shutdown hooks', 'nsx-xs nsx-a'], ['기본 HTTP 어댑터는 Express, 성능이 중요하면 Fastify 어댑터', 'the default HTTP adapter is Express, with a Fastify adapter for speed'], ['Nest 12부터 훅은 컴포넌트 계층 순서로 호출돼요', 'since Nest 12, hooks run in component hierarchy order']],
    caps: [['생성', 'Creating the app'], ['초기화 훅', 'Init hooks'], ['listen', 'listen'], ['종료 훅', 'Shutdown hooks'], ['부트스트랩과 수명 주기', 'Bootstrap and lifecycle']]
  });
}

function sDynamicModule() {
  return CW('nest-dynamic-module', {
    code: ['@Module({})', 'export class MailModule {', '  static forRoot(o: Opts): DynamicModule {', '    return { module: MailModule,', '      providers: [mailOpts(o), MailService],', '      exports: [MailService] };', '  }', '}', "imports: [MailModule.forRoot({ from: 'x' })]", 'TypeOrmModule.forFeature([User, Order])', 'ConfigModule.forRoot({ isGlobal: true })'],
    hl: [[2, 4], [8, 1, 'ok'], [9, 1, 'warn'], [10, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'mm', X, .8, 5.0, 'MailModule', 'line', 1, { h: 1.1 }); arw(S, 'a0', [X + 5.1, 1.35], [X + 6.3, 1.35], 1); nd(S, 'fr', X + 6.4, .8, 5.6, '.forRoot(opts)', 'accent', 1, { h: 1.1 });
      tbox(S, 'dm', X, 2.6, 12.0, 3.0, ['설정이 들어간 모듈', 'a configured module'], 'accent', 1, { tc: 'a' }); nd(S, 'dp', X + .4, 3.6, 5.4, 'MailOptions', 'ok', 1, { h: 1.0 }); nd(S, 'ds', X + 6.2, 3.6, 5.4, 'MailService', 'warn', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.2, ['정적 메서드가 모듈 설정을 만들어 돌려줘요', 'a static method returns a module definition'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.2, ['forRoot: 루트에서 한 번 · 전역 설정', 'forRoot: once at the root, global config'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'f1', X, 6.2, 5.8, '[User]', 'warn', 3, { off: 4, h: 1.0 }); nd(S, 'f2', X + 6.2, 6.2, 5.8, '[Order]', 'warn', 3, { off: 4, h: 1.0 });
      lbl(S, 'n3', X, 7.6, ['forFeature: 기능 모듈마다 필요한 것만', 'forFeature: per feature, only what it needs'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.2, ['forRootAsync: ConfigService를 주입받아 설정', 'forRootAsync builds options from ConfigService'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.3, ['isGlobal: 모든 모듈에서 import 없이', 'isGlobal: usable everywhere without import'], '', 4, { w: 12 });
    },
    notes: [['동적 모듈은 forRoot 같은 정적 메서드가 설정값을 받아 모듈 정의(DynamicModule)를 만들어 돌려주는 방식이에요', 'a dynamic module is a static method such as forRoot that takes options and returns a module definition (DynamicModule)'], ['forRoot는 루트 모듈에서 한 번 호출해 DB 연결이나 메일 서버 같은 전역 설정을 해요', 'forRoot is called once in the root module for global setup such as a database or mail server'], ['forFeature는 기능 모듈마다 필요한 엔티티나 저장소만 등록해요', 'forFeature registers only the entities or repositories each feature module needs'], ['설정을 다른 프로바이더에서 받아야 하면 forRootAsync에 useFactory와 inject를 써요 · isGlobal은 어디서나 쓰게 해요', 'when options come from another provider, forRootAsync takes useFactory and inject, and isGlobal makes the module available everywhere']],
    fin: [['동적 모듈: 설정을 받아 프로바이더를 만들어 주는 재사용 가능한 모듈 · 라이브러리 모듈의 표준 형태', 'dynamic modules take options and build providers, the standard shape for reusable library modules', 'nsx-xs nsx-a'], ['ConfigurableModuleBuilder로 forRoot/forRootAsync를 쉽게 만들어요', 'ConfigurableModuleBuilder generates forRoot and forRootAsync for you'], ['register는 쓰는 곳마다 다른 설정이 필요할 때의 관례 이름이에요', 'register is the conventional name when each consumer needs different options']],
    caps: [['설정을 받는 모듈', 'Modules that take options'], ['forRoot', 'forRoot'], ['forFeature', 'forFeature'], ['비동기 설정', 'Async configuration'], ['동적 모듈', 'Dynamic modules']]
  });
}
/* ===== NestJS · 2. request pipeline ===== */
const PIPE = [['Middleware', 'line'], ['Guard', 'danger'], ['Interceptor', 'accent'], ['Pipe', 'ok'], ['Handler', 'warn'], ['Interceptor', 'accent'], ['Filter', 'danger']];

function sLifecycle() {
  return CW('nest-lifecycle', {
    code: ['@UseGuards(AuthGuard)', '@UseInterceptors(LoggingInterceptor)', "@Controller('orders')", 'export class OrdersController {', '  @Post()', '  create(@Body(ValidationPipe) dto: Dto) {…}', '}', ['// 전역 → 컨트롤러 → 메서드 순으로 적용', '// applied global → controller → method']],
    hl: [[0, 1, 'danger'], [1, 1], [5, 1, 'ok'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      T(S, 'rq', X + .2, .6, '→ req', 'cz-mono nsx-s', 0);
      PIPE.forEach(([t, c], i) => { nd(S, 'p' + i, X + 2.4, .6 + i * 1.25, 7.2, t, c, 0, { h: 1.0 }); if (i) arw(S, 'pa' + i, [X + 6.0, .6 + i * 1.25 - .23], [X + 6.0, .6 + i * 1.25 - .03], 0); });
      T(S, 'rs', X + 9.9, 6.95, 'res →', 'cz-mono nsx-s', 0);
      const hi = (k, i, c, st) => frame(S, k, X + 2.25, .45 + i * 1.25, 7.5, 1.3, c, st, { off: st + 1, w: .14 });
      hi('h0', 0, 'ink', 1); hi('h1', 1, 'danger', 1); lbl(S, 'n1', X, 9.6, ['미들웨어 → 가드: 통과 못 하면 여기서 끝', 'middleware, then guards: stop here if denied'], 'r', 1, { off: 2, w: 12 });
      hi('h2', 2, 'accent', 2); hi('h3', 3, 'ok', 2); lbl(S, 'n2', X, 9.6, ['인터셉터(앞) → 파이프: 값 검증·변환', 'interceptors (before), then pipes validate'], 'a', 2, { off: 3, w: 12 });
      hi('h4', 4, 'warn', 3); hi('h5', 5, 'accent', 3); lbl(S, 'n3', X, 9.6, ['핸들러 → 인터셉터(뒤): 응답 가공', 'handler, then interceptors shape the reply'], 'w', 3, { off: 4, w: 12 });
      hi('h6', 6, 'danger', 4); lbl(S, 'n4', X, 9.6, ['어디서든 예외가 나면 필터가 응답으로', 'any exception goes to filters'], 'r', 4, { w: 12 });
    },
    notes: [['요청은 미들웨어를 지나 가드에 닿아요 · 가드가 false를 돌려주면 핸들러는 실행되지 않아요', 'a request passes middleware and reaches guards, and a guard returning false stops it before the handler'], ['인터셉터의 앞부분이 실행된 뒤 파이프가 @Body, @Param 값을 검증하고 변환해요', 'the first half of interceptors runs, then pipes validate and transform @Body and @Param values'], ['핸들러가 결과를 돌려주면 인터셉터의 뒷부분이 응답을 감싸거나 바꿔요', 'after the handler returns, the second half of interceptors wraps or changes the response'], ['어느 단계에서든 예외가 던져지면 예외 필터가 받아 HTTP 응답으로 바꿔요', 'an exception thrown at any stage is caught by exception filters and turned into an HTTP response']],
    fin: [['요청 수명 주기: 미들웨어 → 가드 → 인터셉터 → 파이프 → 핸들러 → 인터셉터 → (예외 시) 필터', 'the request lifecycle runs middleware, guards, interceptors, pipes, the handler, interceptors again, and filters on exceptions', 'nsx-xs nsx-a'], ['각 단계는 전역·컨트롤러·메서드 수준으로 걸 수 있어요', 'each stage can be bound globally, per controller or per method'], ['역할마다 알맞은 단계를 고르는 게 Nest 설계의 핵심', 'picking the right stage for each job is the heart of Nest design']],
    caps: [['미들웨어와 가드', 'Middleware and guards'], ['인터셉터와 파이프', 'Interceptors and pipes'], ['핸들러와 응답', 'The handler and the response'], ['예외 필터', 'Exception filters'], ['요청 수명 주기', 'The request lifecycle']]
  });
}

function sMiddleware() {
  return CW('nest-middleware', {
    code: ['@Injectable()', 'class LoggerMw implements NestMiddleware {', '  use(req, res, next: () => void) {', '    console.log(req.method, req.url);', '    next();', '  }', '}', 'configure(consumer: MiddlewareConsumer) {', '  consumer.apply(LoggerMw)', "    .forRoutes('orders');", '}'],
    hl: [[2, 2], [4, 1, 'ok'], [7, 4, 'warn'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      ['cors', 'helmet', 'LoggerMw'].forEach((t, i) => { nd(S, 'm' + i, X + i * 3.3, 1.2, 3.0, t, i === 2 ? 'accent' : 'line', 0, { h: 1.1 }); });
      nd(S, 'rt', X + 9.9, 1.2, 2.1, 'route', 'warn', 0, { h: 1.1 });
      T(S, 'dot', X - .1, .3, '●', 'nsx-s nsx-a', 1); S.set('dot', 0, { transform: 'translate(0,0)' }); S.set('dot', 2, { transform: 'translate(3.3em,0)' }); S.set('dot', 3, { transform: 'translate(6.6em,0)' }); S.set('dot', 4, { transform: 'translate(10.4em,0)' });
      lbl(S, 'n1', X, 3.2, ['req·res를 받아 로그를 남기고', 'receives req and res, logs'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 3.2, ['next()를 불러야 다음으로 넘어가요', 'next() passes control onward'], 'g', 2, { off: 3, w: 12 }); lbl(S, 'n2b', X, 4.3, ['안 부르면 요청이 그대로 멈춰요', 'forget it and the request hangs'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 3.2, ['모듈의 configure에서 경로별로 연결', 'bound per route in a module’s configure'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 3.2, ['어떤 핸들러가 실행될지는 몰라요', 'it does not know which handler will run'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 4.3, ['→ 인증·권한 판단은 가드에서', 'so auth decisions belong in guards'], '', 4, { w: 12 });
    },
    notes: [['미들웨어는 라우트 처리 전에 실행되는 함수나 클래스로, Express 미들웨어와 같은 (req, res, next) 모양이에요', 'middleware runs before route handling, shaped like Express middleware with (req, res, next)'], ['일을 마치면 next()를 불러 다음 미들웨어나 라우트로 넘겨요 · 부르지 않으면 요청이 멈춰요', 'it calls next() to hand off to the next middleware or route, and the request hangs if it never does'], ['모듈의 configure에서 MiddlewareConsumer로 어떤 경로에 적용할지 정해요 · cors, helmet 같은 Express 미들웨어도 그대로 써요', 'a module’s configure uses MiddlewareConsumer to choose routes, and Express middleware such as cors and helmet works as is'], ['미들웨어는 어떤 컨트롤러 메서드가 실행될지 모르기 때문에 인증·권한처럼 핸들러 정보가 필요한 판단은 가드에서 해요', 'middleware cannot see which controller method will run, so decisions needing handler information, such as authorization, belong in guards']],
    fin: [['미들웨어: 라우팅 전에 요청·응답 객체를 직접 다루는 단계 · 로깅, 요청 ID, 바디 파싱, 보안 헤더에 알맞아요', 'middleware handles raw request and response objects before routing, suited to logging, request IDs, body parsing and security headers', 'nsx-xs nsx-a'], ['전역 미들웨어는 app.use()로 등록해요', 'global middleware is registered with app.use()'], ['Fastify 어댑터에서는 req·res 모양이 달라요', 'req and res differ under the Fastify adapter']],
    caps: [['미들웨어 함수', 'Middleware functions'], ['next()', 'next()'], ['경로에 연결', 'Binding to routes'], ['미들웨어의 한계', 'What middleware cannot see'], ['미들웨어', 'Middleware']]
  });
}

function sGuards() {
  return CW('nest-guards', {
    code: ['@Injectable()', 'class AuthGuard implements CanActivate {', '  canActivate(ctx: ExecutionContext) {', '    const req = ctx.switchToHttp()', '      .getRequest();', '    return Boolean(req.user);', '  }', '}', "@UseGuards(AuthGuard) @Get('me') me() {…}", '{ provide: APP_GUARD, useClass: AuthGuard }'],
    hl: [[2, 3], [5, 1, 'ok'], [5, 1, 'danger'], [8, 2]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'g', X + 4.0, 2.4, 4.0, 'AuthGuard', 'danger', 0, { h: 1.6 });
      nd(S, 'rq', X, 2.6, 3.4, 'req', 'line', 1, { h: 1.2 }); arw(S, 'a0', [X + 3.45, 3.2], [X + 3.95, 3.2], 1);
      lbl(S, 'n1', X, .6, ['ExecutionContext: 요청과 실행될 핸들러 정보', 'ExecutionContext: the request and target handler'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ok', X + 8.6, 2.6, 3.4, 'Handler', 'ok', 2, { off: 3, h: 1.2 }); arw(S, 'a1', [X + 8.05, 3.2], [X + 8.55, 3.2], 2, { off: 3 }); lbl(S, 'n2', X, 4.8, ['true → 통과, 핸들러 실행', 'true: pass to the handler'], 'g', 2, { off: 3 });
      nd(S, 'no', X + 8.6, 2.6, 3.4, '403', 'danger', 3, { off: 4, h: 1.2 }); arw(S, 'a2', [X + 8.05, 3.2], [X + 8.55, 3.2], 3, { off: 4, color: 'danger' }); lbl(S, 'n3', X, 4.8, ['false → 403 Forbidden', 'false: 403 Forbidden'], 'r', 3, { off: 4 });
      lbl(S, 'n4', X, 4.8, ['메서드·컨트롤러·전역(APP_GUARD)에 걸어요', 'bind per method, controller or globally'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 5.9, ['전역 가드 + @Public()으로 예외 경로', 'a global guard with @Public() exceptions'], '', 4, { w: 12 });
    },
    notes: [['가드는 CanActivate를 구현하고, ExecutionContext로 요청 객체와 곧 실행될 핸들러·클래스 정보를 받아요', 'a guard implements CanActivate and receives the request plus the target handler and class through ExecutionContext'], ['true(또는 true로 끝나는 Promise·Observable)를 돌려주면 요청이 핸들러로 넘어가요', 'returning true, or a promise or observable resolving to true, lets the request reach the handler'], ['false를 돌려주면 Nest가 403 Forbidden을 응답해요 · 직접 UnauthorizedException을 던지면 401이 돼요', 'returning false makes Nest answer 403 Forbidden, while throwing UnauthorizedException yields 401'], ['@UseGuards로 메서드나 컨트롤러에 걸고, APP_GUARD로 전역에 걸어 @Public() 같은 메타데이터로 예외를 둬요', '@UseGuards binds it to methods or controllers, and APP_GUARD binds it globally with metadata such as @Public() for exceptions']],
    fin: [['가드: 요청이 핸들러에 닿을지 말지를 결정하는 단계 · 인증과 권한 검사의 자리', 'guards decide whether a request may reach its handler, the home of authentication and authorization checks', 'nsx-xs nsx-a'], ['미들웨어 다음, 인터셉터·파이프보다 먼저 실행돼요', 'they run after middleware and before interceptors and pipes'], ['Reflector로 핸들러 메타데이터(역할 등)를 읽어요', 'Reflector reads handler metadata such as roles']],
    caps: [['ExecutionContext', 'ExecutionContext'], ['통과', 'Allowed'], ['차단', 'Denied'], ['가드 범위', 'Guard scope'], ['가드', 'Guards']]
  });
}

function sInterceptors() {
  return CW('nest-interceptors', {
    code: ['@Injectable()', 'class Timing implements NestInterceptor {', '  intercept(ctx: ExecutionContext,', '            next: CallHandler) {', '    const t = Date.now();', '    return next.handle().pipe(', '      map(data => ({ data })),', '      tap(() => log(Date.now() - t)));', '  }', '}'],
    hl: [[4, 1], [5, 1, 'ok'], [6, 2, 'warn'], [2, 2]],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'ic', X, .6, 12.0, 6.0, 'Interceptor', 'accent', 0, { tc: 'a' });
      nd(S, 'h', X + 3.5, 2.8, 5.0, 'handler()', 'warn', 0, { h: 1.2 });
      nd(S, 'b4', X + .5, 1.5, 11.0, ['앞: 시작 시간 기록', 'before: record start time'], 'line', 1, { h: 1.0 });
      arw(S, 'a1', [X + 6.0, 2.52], [X + 6.0, 2.76], 2); lbl(S, 'n2', X, 7.2, ['next.handle(): 핸들러 실행을 Observable로', 'next.handle() runs the handler as an Observable'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'af', X + .5, 4.6, 11.0, '{ data: … } · 42ms', 'warn', 3, { h: 1.0 }); arw(S, 'a2', [X + 6.0, 4.05], [X + 6.0, 4.55], 3);
      lbl(S, 'n3', X, 7.2, ['뒤: 응답을 감싸고 걸린 시간 기록', 'after: wrap the reply, log the duration'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.2, ['캐시 · 타임아웃 · 응답 변환 · 로깅', 'caching, timeouts, response mapping, logging'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 8.3, ['handle()을 안 부르면 핸들러를 건너뛰어요', 'skip handle() to bypass the handler'], '', 4, { w: 12 });
      lbl(S, 'n1', X, 7.2, ['핸들러 실행 전에 할 일', 'work before the handler runs'], 'a', 1, { off: 2 });
    },
    notes: [['인터셉터는 핸들러를 앞뒤로 감싸요 · next.handle()을 부르기 전 코드는 핸들러보다 먼저 실행돼요', 'an interceptor wraps the handler on both sides, and code before next.handle() runs first'], ['next.handle()은 핸들러 실행 결과를 RxJS Observable로 돌려줘요', 'next.handle() returns the handler’s result as an RxJS Observable'], ['pipe(map, tap)으로 응답을 { data } 형태로 감싸거나, 걸린 시간을 기록하는 등 뒤처리를 해요', 'pipe(map, tap) post-processes the result, such as wrapping it as { data } or logging the elapsed time'], ['handle()을 부르지 않고 캐시된 값을 바로 돌려주면 핸들러를 건너뛸 수 있어요 · timeout()으로 시간 제한도 걸어요', 'returning a cached value without calling handle() skips the handler entirely, and timeout() enforces time limits']],
    fin: [['인터셉터: AOP처럼 핸들러 앞뒤에 공통 로직을 끼워 넣는 단계 · RxJS 연산자로 응답 흐름을 다뤄요', 'interceptors insert shared logic around handlers, AOP-style, shaping the response stream with RxJS operators', 'nsx-xs nsx-a'], ['ClassSerializerInterceptor, CacheInterceptor가 대표적인 내장 인터셉터', 'ClassSerializerInterceptor and CacheInterceptor are typical built-ins'], ['예외도 catchError로 바꿀 수 있어요', 'catchError can transform exceptions too']],
    caps: [['앞부분', 'Before'], ['handle()', 'handle()'], ['뒷부분', 'After'], ['쓰임새', 'Use cases'], ['인터셉터', 'Interceptors']]
  });
}

function sPipes() {
  return CW('nest-pipes', {
    code: ["@Get(':id')", "findOne(@Param('id', ParseIntPipe) id: number)", ["// '42' → 42,  'abc' → 400 Bad Request", "// '42' → 42,  'abc' → 400 Bad Request"], "@Query('page', new DefaultValuePipe(1),", '  ParseIntPipe) page: number', 'class TrimPipe implements PipeTransform {', '  transform(v: string) { return v.trim(); }', '}'],
    hl: [[0, 2], [2, 1, 'danger'], [3, 2, 'ok'], [5, 3]],
    draw: (S) => {
      const X = 19.4, flow = (k, y, a, p, b, c, st, o = {}) => { nd(S, k + 'a', X, y, 3.0, a, 'line', st, { h: 1.1, off: o.off }); arw(S, k + 'r', [X + 3.05, y + .55], [X + 3.75, y + .55], st, { off: o.off }); nd(S, k + 'p', X + 3.8, y, 4.4, p, 'ok', st, { h: 1.1, off: o.off }); arw(S, k + 's', [X + 8.25, y + .55], [X + 8.95, y + .55], st, { off: o.off, color: c === 'danger' ? 'danger' : 'ink-2' }); nd(S, k + 'b', X + 9.0, y, 3.0, b, c, st, { h: 1.1, off: o.off }); };
      flow('f1', 1.0, "'42'", 'ParseIntPipe', '42', 'accent', 1); lbl(S, 'n1', X, 5.6, ['문자열을 숫자로 바꿔 핸들러에', 'string converted to a number'], 'a', 1, { off: 2, w: 12 });
      flow('f2', 2.6, "'abc'", 'ParseIntPipe', '400', 'danger', 2); lbl(S, 'n2', X, 5.6, ['변환 실패 → 핸들러 실행 전에 400', 'failure returns 400 before the handler'], 'r', 2, { off: 3, w: 12 });
      flow('f3', 4.2, 'undefined', 'Default → Int', '1', 'ok', 3, { off: 4 }); lbl(S, 'n3', X, 5.6, ['파이프를 이어 붙여 차례로 적용', 'pipes chain and run in order'], 'g', 3, { off: 4, w: 12 });
      flow('f4', 4.2, "' kim '", 'TrimPipe', "'kim'", 'warn', 4); lbl(S, 'n4', X, 5.6, ['transform 하나로 직접 만들어요', 'one transform method makes your own'], 'w', 4, { w: 12 });
    },
    notes: [["파이프는 핸들러 인자를 바꾸거나 검사해요 · ParseIntPipe는 경로의 '42'를 숫자 42로 바꿔 넘겨요", "pipes transform or validate handler arguments; ParseIntPipe turns the path string '42' into the number 42"], ["'abc'처럼 바꿀 수 없으면 핸들러가 실행되기 전에 400 Bad Request를 돌려줘요", "if conversion fails, as with 'abc', a 400 Bad Request is returned before the handler runs"], ['여러 파이프를 이어 쓰면 차례로 적용돼요 · DefaultValuePipe가 기본값을 넣고 ParseIntPipe가 숫자로 바꿔요', 'chained pipes run in order: DefaultValuePipe supplies a default and ParseIntPipe converts it'], ['PipeTransform의 transform 하나만 구현하면 공백 제거 같은 나만의 파이프를 만들 수 있어요', 'implementing PipeTransform’s single transform method creates custom pipes such as trimming']],
    fin: [['파이프: 핸들러에 들어가기 직전의 값을 변환(transformation)하거나 검증(validation)하는 단계', 'pipes transform or validate values right before they enter the handler', 'nsx-xs nsx-a'], ['ParseUUIDPipe, ParseBoolPipe, ParseEnumPipe 등 내장 파이프가 많아요', 'built-ins include ParseUUIDPipe, ParseBoolPipe, ParseEnumPipe and more'], ['DTO 전체 검증은 ValidationPipe가 맡아요', 'whole-DTO validation is ValidationPipe’s job']],
    caps: [['변환', 'Transformation'], ['검증 실패', 'Validation failures'], ['파이프 연결', 'Chaining pipes'], ['직접 만들기', 'Writing your own'], ['파이프', 'Pipes']]
  });
}

function sFilters() {
  return CW('nest-filters', {
    code: ["throw new NotFoundException('no order');", ['// → 404 { statusCode: 404, message, … }', '// → 404 { statusCode: 404, message, … }'], ['// 모르는 에러 → 500 Internal server error', '// unknown error → 500 Internal server error'], '@Catch(QueryFailedError)', 'class DbFilter implements ExceptionFilter {', '  catch(e, host: ArgumentsHost) {', '    const res = host.switchToHttp()', '      .getResponse();', "    res.status(409).json({ code: 'DUP' });", '  }', '}'],
    hl: [[0, 2], [2, 1, 'danger'], [3, 8, 'warn'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'th', X, .8, 5.7, 'NotFoundException', 'danger', 1, { off: 2, h: 1.1 }); arw(S, 'a1', [X + 5.75, 1.35], [X + 6.35, 1.35], 1, { off: 2 }); nd(S, 'r1', X + 6.4, .8, 5.6, '404 JSON', 'warn', 1, { off: 2, h: 1.1 });
      lbl(S, 'n1', X, 2.6, ['HttpException 계열은 상태 코드로 바로 응답', 'HttpExceptions map straight to status codes'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'tu', X, .8, 5.7, 'TypeError', 'danger', 2, { off: 3, h: 1.1 }); arw(S, 'a2', [X + 5.75, 1.35], [X + 6.35, 1.35], 2, { off: 3 }); nd(S, 'r2', X + 6.4, .8, 5.6, '500', 'danger', 2, { off: 3, h: 1.1 });
      lbl(S, 'n2', X, 2.6, ['내부 정보는 숨기고 500만 알려요', 'internals stay hidden behind a 500'], 'r', 2, { off: 3, w: 12 });
      nd(S, 'qd', X, .8, 5.7, 'QueryFailedError', 'danger', 3, { h: 1.1 }); arw(S, 'a3', [X + 5.75, 1.35], [X + 6.35, 1.35], 3); nd(S, 'df', X + 6.4, .8, 5.6, 'DbFilter', 'warn', 3, { h: 1.1 }); arw(S, 'a4', [X + 9.2, 2.0], [X + 9.2, 2.6], 3); nd(S, 'r3', X + 6.4, 2.7, 5.6, '409 Conflict', 'ok', 3, { h: 1.1 });
      lbl(S, 'n3', X, 4.4, ['@Catch로 고른 예외를 원하는 응답으로', '@Catch picks errors and shapes the reply'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.4, ['도메인 예외 → HTTP 예외로 번역하는 층', 'a layer that translates domain errors'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 5.5, ['Nest 12: errorCode 옵션으로 오류 코드', 'Nest 12 adds an errorCode option'], '', 4, { w: 12 });
    },
    notes: [['NotFoundException 같은 내장 HTTP 예외를 던지면 기본 예외 필터가 404와 표준 JSON 본문으로 응답해요', 'throwing built-in HTTP exceptions such as NotFoundException makes the default filter answer 404 with a standard JSON body'], ['HttpException이 아닌 알 수 없는 에러는 500 Internal server error로 바뀌어 내부 정보가 새지 않아요', 'unknown errors that are not HttpExceptions become 500 Internal server error, so internals do not leak'], ['@Catch(QueryFailedError)로 특정 예외를 골라 ArgumentsHost에서 응답 객체를 꺼내 409처럼 원하는 형태로 응답해요', '@Catch(QueryFailedError) picks a specific error and uses ArgumentsHost to send any response, such as a 409'], ['필터는 서비스가 던진 도메인 예외를 HTTP 응답으로 번역하는 층이에요 · Nest 12부터 HttpExceptionOptions에 errorCode를 담을 수 있어요', 'filters translate domain errors thrown by services into HTTP responses, and since Nest 12 HttpExceptionOptions can carry an errorCode']],
    fin: [['예외 필터: 처리되지 않은 예외를 잡아 일관된 오류 응답으로 바꾸는 마지막 단계', 'exception filters catch unhandled exceptions and turn them into consistent error responses, the final stage', 'nsx-xs nsx-a'], ['APP_FILTER로 전역 등록해 오류 형식을 통일해요', 'register with APP_FILTER to unify error formats'], ['로그와 모니터링 전송도 필터에서 해요', 'filters are also where errors get logged and reported']],
    caps: [['HTTP 예외', 'HTTP exceptions'], ['모르는 에러', 'Unknown errors'], ['직접 만든 필터', 'Custom filters'], ['예외 번역', 'Translating errors'], ['예외 필터', 'Exception filters']]
  });
}

function sParamDecorator() {
  return CW('nest-custom-decorator', {
    code: ['export const User = createParamDecorator(', '  (key: string, ctx: ExecutionContext) => {', '    const { user } = ctx.switchToHttp()', '      .getRequest();', '    return key ? user?.[key] : user;', '  });', 'me(@User() user: UserEntity) {…}', "me(@User('email') email: string) {…}", 'export const Auth = (...r: Role[]) =>', '  applyDecorators(Roles(r),', '    UseGuards(JwtGuard, RolesGuard));'],
    hl: [[0, 6], [6, 1, 'ok'], [7, 1, 'warn'], [8, 3]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'rq', X, .8, 12.0, 'req.user = { id: 7, email: … }', 'line', 1, { h: 1.1 });
      lbl(S, 'n1', X, 4.4, ['요청에서 원하는 값을 꺼내는 함수를 데코레이터로', 'a function that extracts request data, as a decorator'], 'a', 1, { off: 2, w: 12 });
      arw(S, 'a2', [X + 6.0, 2.0], [X + 6.0, 2.6], 2, { off: 3 }); nd(S, 'u', X, 2.7, 12.0, 'user = { id: 7, email: … }', 'ok', 2, { off: 3, h: 1.1 }); lbl(S, 'n2', X, 4.4, ['핸들러 인자가 깔끔해져요', 'handler arguments stay clean'], 'g', 2, { off: 3, w: 12 });
      arw(S, 'a3', [X + 6.0, 2.0], [X + 6.0, 2.6], 3, { off: 4 }); nd(S, 'e', X, 2.7, 12.0, "email = 'kim@x.dev'", 'warn', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 4.4, ['인자(data)로 특정 필드만 골라요', 'the data argument picks one field'], 'w', 3, { off: 4, w: 12 });
      ['Roles(r)', 'UseGuards(…)'].forEach((t, i) => nd(S, 'c' + i, X + i * 6.2, 2.7, 5.8, t, 'line', 4, { h: 1.0 })); arw(S, 'a4', [X + 6.0, 3.8], [X + 6.0, 4.4], 4); nd(S, 'au', X + 3.0, 4.5, 6.0, "@Auth('admin')", 'accent', 4, { h: 1.1 });
      lbl(S, 'n4', X, 6.1, ['applyDecorators: 여러 데코레이터를 하나로', 'applyDecorators bundles several decorators'], 'a', 4, { w: 12 });
    },
    notes: [['createParamDecorator는 ExecutionContext에서 원하는 값을 꺼내는 함수를 @User() 같은 매개변수 데코레이터로 만들어요', 'createParamDecorator turns a function that extracts data from ExecutionContext into a parameter decorator such as @User()'], ['핸들러는 @User() user처럼 필요한 값만 선언적으로 받아 req 객체를 직접 다루지 않아요', 'handlers declare just what they need, as in @User() user, without touching the req object'], ["@User('email')처럼 넘긴 인자(data)로 특정 필드만 꺼낼 수 있어요 · 파이프와도 함께 써요", "an argument such as @User('email') extracts a single field, and pipes can apply too"], ['applyDecorators는 역할 메타데이터와 가드처럼 함께 쓰는 데코레이터를 @Auth() 하나로 묶어요', 'applyDecorators bundles decorators used together, such as role metadata and guards, into a single @Auth()']],
    fin: [['커스텀 데코레이터: 반복되는 요청 처리와 메타데이터를 선언적인 이름 하나로 감싸요', 'custom decorators wrap repeated request handling and metadata in one declarative name', 'nsx-xs nsx-a'], ['Reflector.createDecorator로 타입 있는 메타데이터 데코레이터도 만들어요', 'Reflector.createDecorator builds typed metadata decorators'], ['데코레이터는 메타데이터를 붙이고, 읽는 건 가드·인터셉터예요', 'decorators attach metadata; guards and interceptors read it']],
    caps: [['createParamDecorator', 'createParamDecorator'], ['선언적인 인자', 'Declarative arguments'], ['data 인자', 'The data argument'], ['데코레이터 합치기', 'Composing decorators'], ['커스텀 데코레이터', 'Custom decorators']]
  });
}
/* ===== NestJS · 3. data and validation ===== */
function sDto() {
  return CW('nest-dto', {
    code: ['export class CreateUserDto {', '  @IsEmail() email: string;', '  @IsString() @Length(2, 20) name: string;', '  @IsOptional() @IsInt() age?: number;', '}', 'app.useGlobalPipes(new ValidationPipe({', '  whitelist: true,', '  forbidNonWhitelisted: true,', '  transform: true,', '}));'],
    hl: [[0, 5], [5, 1, 'danger'], [6, 2, 'warn'], [8, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'bd', X, .6, ['요청 본문', 'request body'], 'm', 0); ["{ email: 'kim',", "  name: 'K',", "  age: '30',", "  role: 'admin' }"].forEach((t, i) => T(S, 'b' + i, X + .3, 1.5 + i * .9, t, 'cz-mono nsx-s', 0));
      lbl(S, 'n1', X, 6.4, ['DTO 클래스 = 들어올 데이터의 계약', 'the DTO class is the input contract'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'er', X + 6.4, 1.4, 5.6, '400 Bad Request', 'danger', 2, { off: 3, h: 1.1 }); [['email: 형식 오류', 'email: invalid'], ['name: 2~20자', 'name: 2–20 chars']].forEach((t, i) => lbl(S, 'em' + i, X + 6.4, 2.8 + i * .9, t, 'm r', 2, { off: 3 }));
      lbl(S, 'n2', X, 6.4, ['규칙을 어기면 핸들러 전에 400', 'rule violations return 400 first'], 'r', 2, { off: 3, w: 12 });
      sw(S, 'st', X, 4.15, 6.2, .08, 'var(--danger)', 3, { off: 4 }); lbl(S, 'n3', X, 6.4, ['whitelist: DTO에 없는 role은 제거(또는 거부)', 'whitelist strips unknown fields such as role'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'ok', X + 6.4, 2.4, 5.6, 'age: 30 (number)', 'ok', 4, { h: 1.1 }); lbl(S, 'n4', X, 6.4, ['transform: 진짜 DTO 인스턴스 + 타입 변환', 'transform: real DTO instances, converted types'], 'g', 4, { w: 12 });
    },
    notes: [['DTO(Data Transfer Object)는 요청 본문의 모양을 정한 클래스예요 · class-validator 데코레이터로 필드마다 규칙을 달아요', 'a DTO (Data Transfer Object) is a class describing the request body, with class-validator decorators adding rules per field'], ['ValidationPipe를 전역으로 걸면 규칙을 어긴 요청은 핸들러에 닿기 전에 오류 목록과 함께 400으로 돌아가요', 'with ValidationPipe applied globally, invalid requests return 400 with a list of errors before reaching the handler'], ['whitelist는 DTO에 없는 필드를 지워서 role 같은 값을 몰래 넣는 공격을 막고, forbidNonWhitelisted는 아예 거부해요', 'whitelist strips fields absent from the DTO, blocking smuggled values such as role, and forbidNonWhitelisted rejects them outright'], ['transform을 켜면 일반 객체가 DTO 인스턴스로 바뀌고 문자열 숫자도 타입에 맞게 변환돼요', 'transform turns plain objects into DTO instances and converts numeric strings to their declared types']],
    fin: [['DTO와 ValidationPipe: 입력 데이터의 모양과 규칙을 클래스로 선언하고 경계에서 자동 검증해요', 'DTOs with ValidationPipe declare input shape and rules as classes and validate automatically at the boundary', 'nsx-xs nsx-a'], ['PartialType, PickType으로 수정용 DTO를 파생시켜요', 'PartialType and PickType derive update DTOs'], ['검증은 신뢰 경계(외부 입력)에서 한 번 확실히', 'validate firmly once, at the trust boundary']],
    caps: [['DTO 클래스', 'DTO classes'], ['검증 실패', 'Validation failures'], ['whitelist', 'whitelist'], ['transform', 'transform'], ['DTO와 검증', 'DTOs and validation']]
  });
}

function sStdSchema() {
  return CW('nest-standard-schema', {
    code: ['const CreateUser = z.object({', '  email: z.email(),', '  name: z.string().min(2),', '});', 'type CreateUser = z.infer<typeof CreateUser>;', '@Post()', 'create(@Body({ schema: CreateUser })', '       body: CreateUser) {…}', 'app.useGlobalPipes(', '  new StandardSchemaValidationPipe());'],
    hl: [[0, 4], [4, 1, 'ok'], [5, 3, 'warn'], [8, 2]],
    draw: (S) => {
      const X = 19.4;
      ['Zod', 'Valibot', 'ArkType'].forEach((t, i) => nd(S, 'l' + i, X + i * 4.1, .8, 3.8, t, 'accent', 1, { h: 1.1 })); [0, 1, 2].forEach(i => ed(S, 'e' + i, [X + 1.9 + i * 4.1, 2.0], [X + 6.0, 2.7], 1));
      nd(S, 'ss', X, 2.8, 12.0, 'Standard Schema (~standard)', 'ok', 1, { h: 1.1 }); lbl(S, 'n1', X, 6.4, ['여러 라이브러리가 따르는 공통 인터페이스', 'a common interface many libraries implement'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ty', X, 4.6, 5.8, ['TS 타입', 'TS type'], 'line', 2, { h: 1.1 }); nd(S, 'rv', X + 6.2, 4.6, 5.8, ['런타임 검증', 'runtime check'], 'line', 2, { h: 1.1 }); arw(S, 'a0', [X + 3.0, 3.95], [X + 3.0, 4.55], 2); arw(S, 'a1', [X + 9.0, 3.95], [X + 9.0, 4.55], 2);
      lbl(S, 'n2', X, 6.4, ['스키마 하나로 타입과 검증을 함께', 'one schema gives both type and validation'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.4, ['@Body({ schema })는 메타데이터만 붙여요', '@Body({ schema }) only attaches metadata'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['검증은 전역 StandardSchemaValidationPipe가', 'a global pipe performs the validation'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.5, ['class-validator 방식도 계속 지원', 'class-validator remains supported'], '', 4, { w: 12 });
    },
    notes: [['Standard Schema는 Zod, Valibot, ArkType 같은 검증 라이브러리가 함께 따르는 공통 인터페이스예요', 'Standard Schema is a shared interface implemented by validation libraries such as Zod, Valibot and ArkType'], ['스키마 하나에서 z.infer로 TypeScript 타입을 뽑고 같은 스키마로 런타임 검증까지 해서 DTO 클래스가 필요 없어요', 'one schema yields the TypeScript type through z.infer and performs runtime validation, so no DTO class is needed'], ['Nest 12부터 @Body, @Query, @Param에 schema 옵션을 줄 수 있어요 · 데코레이터는 스키마를 메타데이터로 붙이기만 해요', 'since Nest 12, @Body, @Query and @Param accept a schema option, and the decorator only attaches it as metadata'], ['실제 검증은 전역으로 등록한 StandardSchemaValidationPipe가 해요 · 기존 class-validator 방식도 계속 쓸 수 있어요', 'a globally registered StandardSchemaValidationPipe performs the actual validation, and the class-validator workflow still works']],
    fin: [['Standard Schema 검증: 원하는 스키마 라이브러리로 타입과 검증을 한 번에 정의하는 Nest 12의 새 방식', 'Standard Schema validation, new in Nest 12, defines types and validation at once with the schema library of your choice', 'nsx-xs nsx-a'], ['응답도 StandardSchemaSerializerInterceptor로 스키마에 맞춰 내보내요', 'responses can be shaped by StandardSchemaSerializerInterceptor'], ['@nestjs/config의 validationSchema도 같은 스키마를 받아요', '@nestjs/config’s validationSchema accepts these schemas too']],
    caps: [['공통 인터페이스', 'A shared interface'], ['타입과 검증을 한 번에', 'Types and validation at once'], ['schema 옵션', 'The schema option'], ['검증 파이프', 'The validation pipe'], ['Standard Schema 검증', 'Standard Schema validation']]
  });
}

function sConfigNest() {
  return CW('nest-config', {
    code: ['ConfigModule.forRoot({', '  isGlobal: true,', "  envFilePath: ['.env.local', '.env'],", '  validationSchema: envSchema,', '})', 'constructor(private cfg: ConfigService) {}', "this.cfg.getOrThrow<string>('DB_URL')", "registerAs('db', () => ({ url: … }))"],
    hl: [[0, 3], [3, 1, 'danger'], [5, 2, 'ok'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      ['.env.local', '.env', 'process.env'].forEach((t, i) => nd(S, 'f' + i, X + i * 4.1, .8, 3.8, t, 'line', 1, { h: 1.1 })); [0, 1, 2].forEach(i => ed(S, 'e' + i, [X + 1.9 + i * 4.1, 2.0], [X + 6.0, 2.7], 1));
      nd(S, 'cm', X, 2.8, 12.0, 'ConfigModule', 'accent', 1, { h: 1.1 }); lbl(S, 'n1', X, 6.6, ['여러 출처의 설정을 한곳에 · 앞 파일 우선', 'merges sources; earlier files win'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'vf', X, 4.6, 12.0, ['DB_URL 없음 → 앱 시작 실패', 'DB_URL missing: startup fails'], 'danger', 2, { off: 3, h: 1.1 }); lbl(S, 'n2', X, 6.6, ['잘못된 설정은 배포 직후가 아니라 시작 때', 'bad config fails at boot, not mid-request'], 'r', 2, { off: 3, w: 12 });
      nd(S, 'cs', X, 4.6, 12.0, 'ConfigService.getOrThrow()', 'ok', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 6.6, ['서비스에 주입해 타입 있게 읽어요', 'inject it and read values with types'], 'g', 3, { off: 4, w: 12 });
      nd(S, 'ns', X, 4.6, 12.0, "db.url · mail.from · app.port", 'warn', 4, { h: 1.1 }); lbl(S, 'n4', X, 6.6, ['registerAs: 주제별 설정 묶음', 'registerAs groups config by topic'], 'w', 4, { w: 12 });
    },
    notes: [['ConfigModule은 .env 파일과 process.env를 읽어 한곳에 모아요 · 목록 앞쪽 파일이 우선해요', 'ConfigModule reads .env files and process.env into one place, with earlier files in the list taking priority'], ['validationSchema로 필수 값과 형식을 검사하면 잘못된 설정은 앱이 시작할 때 바로 실패해요 · Nest 12부터 Standard Schema도 받아요', 'validationSchema checks required values and formats so bad config fails at startup, and since Nest 12 it accepts Standard Schema too'], ['ConfigService를 주입해 getOrThrow로 값을 읽어요 · 없으면 예외라서 undefined가 조용히 퍼지지 않아요', 'inject ConfigService and read values with getOrThrow, which throws instead of silently spreading undefined'], ['registerAs로 db, mail처럼 주제별 설정 묶음을 만들어 필요한 모듈에만 주입해요', 'registerAs builds topic-based config groups such as db and mail, injected only where needed']],
    fin: [['설정 관리: 환경 변수를 검증된 타입 있는 설정으로 바꿔 코드에 주입해요 · 12-Factor 앱의 원칙', 'configuration management turns environment variables into validated, typed settings injected into code, following 12-factor principles', 'nsx-xs nsx-a'], ['비밀 값은 저장소가 아니라 배포 환경의 시크릿에', 'secrets belong in the deployment environment, not the repository'], ['isGlobal로 모든 모듈에서 import 없이 써요', 'isGlobal makes it available without imports']],
    caps: [['설정 모으기', 'Collecting configuration'], ['시작할 때 검증', 'Validating at startup'], ['ConfigService', 'ConfigService'], ['설정 묶음', 'Config namespaces'], ['설정 관리', 'Configuration']]
  });
}

function sTypeorm() {
  return CW('nest-typeorm', {
    code: ['@Entity()', 'export class User {', '  @PrimaryGeneratedColumn() id: number;', '  @Column({ unique: true }) email: string;', '  @OneToMany(() => Order, o => o.user)', '  orders: Order[];', '}', 'TypeOrmModule.forFeature([User])', 'constructor(@InjectRepository(User)', '  private users: Repository<User>) {}', "this.users.find({ relations: ['orders'] })"],
    hl: [[0, 4], [4, 2, 'ok'], [7, 3, 'warn'], [10, 1]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'tn', X, .6, 'users', 'm a', 1); ['id', 'email'].forEach((t, i) => nd(S, 'h' + i, X + i * 3.2, 1.5, i ? 5.0 : 3.0, t, 'accent', 1, { h: .9 }));
      [['1', 'kim@x.dev'], ['2', 'lee@x.dev']].forEach((r, j) => r.forEach((t, i) => nd(S, 'c' + j + i, X + i * 3.2, 2.5 + j * 1.0, i ? 5.0 : 3.0, t, 'line', 1, { h: .9 })));
      lbl(S, 'n1', X, 7.0, ['클래스 = 테이블, 필드 = 컬럼', 'class = table, field = column'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'on', X + 8.6, .6, 'orders', 'm g', 2); nd(S, 'oh', X + 8.6, 1.5, 3.4, 'user_id', 'ok', 2, { h: .9 }); [0, 1].forEach(j => nd(S, 'od' + j, X + 8.6, 2.5 + j * 1.0, 3.4, '1', 'line', 2, { h: .9 }));
      lbl(S, 'fk', X, 4.6, 'orders.user_id → users.id', 'm g', 2, { off: 3 }); lbl(S, 'n2', X, 7.0, ['관계: 한 사용자에 여러 주문', 'relations: one user, many orders'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'rp', X, 4.8, 12.0, 'Repository<User>  find · save · delete', 'warn', 3, { h: 1.1 }); lbl(S, 'n3', X, 7.0, ['저장소를 주입받아 SQL 없이 조회·저장', 'inject a repository to query without SQL'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.0, ['운영은 synchronize 대신 마이그레이션', 'production uses migrations, not synchronize'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 8.1, ['N+1 쿼리는 relations·join으로 해결', 'fix N+1 queries with relations or joins'], '', 4, { w: 12 });
    },
    notes: [['@Entity 클래스가 테이블, @Column 필드가 컬럼이 돼요 · TypeORM은 클래스와 데코레이터로 스키마를 표현하는 ORM이에요', 'an @Entity class becomes a table and @Column fields become columns; TypeORM expresses schemas with classes and decorators'], ['@OneToMany·@ManyToOne으로 관계를 선언하면 외래 키와 조인을 TypeORM이 다뤄요', 'declaring relations with @OneToMany and @ManyToOne lets TypeORM handle foreign keys and joins'], ['forFeature로 엔티티를 등록하고 @InjectRepository로 Repository를 주입받아 find, save 같은 메서드로 다뤄요', 'forFeature registers entities, and @InjectRepository injects a Repository with methods such as find and save'], ['개발 중 synchronize는 편하지만 데이터를 잃을 수 있어서 운영에서는 마이그레이션으로 스키마를 바꿔요', 'synchronize is handy in development but can lose data, so production changes schemas through migrations']],
    fin: [['TypeORM 연동: 엔티티 클래스와 Repository 주입으로 데이터베이스를 객체처럼 다뤄요', 'TypeORM integration handles the database as objects through entity classes and injected repositories', 'nsx-xs nsx-a'], ['여러 쓰기를 묶을 땐 DataSource.transaction()', 'group several writes with DataSource.transaction()'], ['MikroORM, Drizzle도 Nest와 함께 많이 써요', 'MikroORM and Drizzle are also popular with Nest']],
    caps: [['엔티티와 테이블', 'Entities and tables'], ['관계', 'Relations'], ['Repository 주입', 'Injecting repositories'], ['운영의 주의점', 'Production cautions'], ['TypeORM 연동', 'TypeORM integration']]
  });
}

function sPrisma() {
  return CW('nest-prisma', {
    code: ['model User {', '  id    Int    @id @default(autoincrement())', '  email String @unique', '  posts Post[]', '}', '@Injectable()', 'class PrismaService extends PrismaClient', '  implements OnModuleInit {', '  onModuleInit() { return this.$connect(); }', '}', 'this.prisma.user.findMany({', '  include: { posts: true } })'],
    hl: [[0, 5], [5, 5, 'ok'], [10, 2, 'warn'], [0, 5]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'sc', X, .8, 5.4, 'schema.prisma', 'accent', 1, { h: 1.1 }); arw(S, 'a0', [X + 5.45, 1.35], [X + 6.35, 1.35], 1); nd(S, 'gc', X + 6.4, .8, 5.6, ['타입 있는 클라이언트', 'a typed client'], 'ok', 1, { h: 1.1 });
      lbl(S, 'n1', X, 2.4, ['prisma generate: 스키마로 클라이언트 생성', 'prisma generate builds the client from the schema'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ps', X, 2.6, 12.0, 'PrismaService (DI)', 'warn', 2, { h: 1.1 }); lbl(S, 'n2', X, 4.2, ['서비스로 감싸 어디든 주입', 'wrap it as a service and inject anywhere'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'q', X, 4.4, 12.0, 'User & { posts: Post[] }', 'accent', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 6.0, ['include에 따라 반환 타입까지 정확', 'return types follow include exactly'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'mg', X, 4.4, 12.0, 'prisma migrate dev → SQL migration', 'line', 4, { h: 1.1 }); lbl(S, 'n4', X, 6.0, ['스키마를 고치면 마이그레이션 파일 생성', 'schema edits generate migration files'], 'a', 4, { w: 12 });
    },
    notes: [['Prisma는 schema.prisma 파일에 모델을 적고 prisma generate로 그 스키마에 맞는 타입 있는 클라이언트를 만드는 ORM이에요', 'Prisma describes models in schema.prisma and generates a typed client from that schema with prisma generate'], ['PrismaClient를 상속한 PrismaService를 만들어 모듈에 등록하면 어느 서비스든 주입받아 써요 · onModuleInit에서 연결해요', 'a PrismaService extending PrismaClient, registered in a module, can be injected anywhere and connects in onModuleInit'], ['findMany({ include: { posts: true } })처럼 쓰면 반환 타입에 posts까지 정확히 들어가서 자동 완성과 타입 검사가 돼요', 'with findMany({ include: { posts: true } }), the return type includes posts exactly, enabling autocomplete and type checks'], ['스키마를 고친 뒤 prisma migrate dev를 실행하면 SQL 마이그레이션 파일이 생기고 DB에 적용돼요', 'after editing the schema, prisma migrate dev creates and applies a SQL migration file']],
    fin: [['Prisma 연동: 스키마 파일이 단일 출처이고, 생성된 타입 있는 클라이언트를 Nest 서비스로 주입해요', 'Prisma integration makes the schema file the single source of truth and injects the generated typed client as a Nest service', 'nsx-xs nsx-a'], ['여러 쓰기는 $transaction으로 묶어요', 'group writes with $transaction'], ['TypeORM보다 타입 추론이 강하고 데코레이터가 없어요', 'it infers types more strongly than TypeORM and uses no decorators']],
    caps: [['스키마와 생성', 'Schema and generation'], ['PrismaService', 'PrismaService'], ['타입 있는 쿼리', 'Typed queries'], ['마이그레이션', 'Migrations'], ['Prisma 연동', 'Prisma integration']]
  });
}

function sSerialization() {
  return CW('nest-serialization', {
    code: ['export class UserEntity {', '  id: number;', '  email: string;', '  @Exclude() password: string;', '  @Expose() get name() { return …; }', '}', '@UseInterceptors(ClassSerializerInterceptor)', "@Get(':id') async find(…) {", '  return new UserEntity(await …);', '}'],
    hl: [[3, 1, 'danger'], [4, 1, 'ok'], [6, 1], [8, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, L = [['id: 7', 'line'], ["email: 'k@x.io'", 'line'], ["password: '$2b$…'", 'danger']];
      lbl(S, 'in', X, .6, ['DB에서 읽은 객체', 'object from the DB'], 'm', 0); L.forEach(([t, c], i) => nd(S, 'i' + i, X, 1.4 + i * 1.1, 5.6, t, c, 0, { h: .95 }));
      S.set('i2', 1, { 'box-shadow': '0 0 0 .14em var(--danger)' }); S.set('i2', 0, { 'box-shadow': 'none' }); S.set('i2', 2, { 'box-shadow': 'none' });
      lbl(S, 'n1', X, 5.4, ['@Exclude: 응답에서 빼야 할 필드', '@Exclude marks fields to drop'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'nm', X + 6.4, 4.7, 5.6, "name: 'Kim'", 'ok', 2, { off: 3, h: .95 }); lbl(S, 'n2', X, 5.8, ['@Expose: 계산된 값을 응답에 추가', '@Expose adds computed values'], 'g', 2, { off: 3, w: 12 });
      arw(S, 'a', [X + 5.7, 2.4], [X + 6.3, 2.4], 3); [['id: 7', 'line'], ["email: 'k@x.io'", 'line'], ["name: 'Kim'", 'ok']].forEach(([t, c], i) => nd(S, 'o' + i, X + 6.4, 1.4 + i * 1.1, 5.6, t, c, 3, { h: .95 }));
      lbl(S, 'out', X + 6.4, .6, ['응답 JSON', 'response JSON'], 'm a', 3); lbl(S, 'n3', X, 5.4, ['인터셉터가 응답 직전에 변환해요', 'the interceptor converts right before replying'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 5.4, ['일반 객체가 아니라 클래스 인스턴스여야 동작', 'works on class instances, not plain objects'], 'w', 4, { w: 12 });
    },
    notes: [['@Exclude()를 단 password 같은 필드는 응답 JSON에서 빠져요 · 비밀번호 해시가 새는 사고를 막아요', 'fields marked @Exclude(), such as password, are dropped from response JSON, preventing leaked password hashes'], ['@Expose()를 단 getter는 계산된 값을 응답에 추가해요', 'getters marked @Expose() add computed values to the response'], ['ClassSerializerInterceptor가 응답 직전에 class-transformer의 instanceToPlain으로 객체를 변환해요', 'ClassSerializerInterceptor converts objects with class-transformer’s instanceToPlain right before responding'], ['데코레이터 규칙은 클래스 인스턴스에만 적용되니 new UserEntity(...)로 감싸서 돌려줘야 해요', 'the decorator rules apply only to class instances, so wrap results with new UserEntity(...)']],
    fin: [['직렬화: 내부 객체를 응답 형태로 바꾸면서 민감한 필드를 숨기고 필요한 값을 더하는 단계', 'serialization turns internal objects into response shapes, hiding sensitive fields and adding needed values', 'nsx-xs nsx-a'], ['@SerializeOptions({ groups })로 역할별 노출 필드를 바꿔요', '@SerializeOptions({ groups }) varies exposed fields by role'], ['응답 전용 DTO를 따로 두는 방식도 많이 써요', 'dedicated response DTOs are a common alternative']],
    caps: [['@Exclude', '@Exclude'], ['@Expose', '@Expose'], ['인터셉터 변환', 'Interceptor conversion'], ['인스턴스로 감싸기', 'Wrapping in instances'], ['응답 직렬화', 'Response serialization']]
  });
}

function sCacheNest() {
  return CW('nest-cache', {
    code: ['CacheModule.register({ ttl: 60_000 })', '@UseInterceptors(CacheInterceptor)', "@CacheTTL(30_000) @Get('products')", 'list() { return this.svc.findAll(); }', 'const hit = await this.cache.get(key);', 'if (hit) return hit;', 'await this.cache.set(key, data, 60_000);', ['await this.cache.del(key);  // 변경 시', 'await this.cache.del(key);  // on change']],
    hl: [[0, 1], [1, 3, 'ok'], [4, 3, 'warn'], [7, 1, 'danger']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'rq', X, .8, 3.2, 'GET', 'line', 1, { h: 1.1 }); nd(S, 'ca', X + 4.4, .8, 3.2, 'Cache', 'accent', 1, { h: 1.1 }); nd(S, 'db', X + 8.8, .8, 3.2, 'DB', 'line', 1, { h: 1.1 });
      arw(S, 'a0', [X + 3.25, 1.35], [X + 4.35, 1.35], 1); lbl(S, 'n1', X, 3.6, ['메모리나 Redis에 결과를 잠시 보관', 'results kept briefly in memory or Redis'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ht', X + 4.4, 2.2, 3.2, 'HIT', 'ok', 2, { off: 3, h: .9 }); lbl(S, 'n2', X, 3.6, ['GET 응답을 자동 캐시 · 2번째부터 DB 생략', 'GET replies cached; repeats skip the DB'], 'g', 2, { off: 3, w: 12 });
      arw(S, 'a1', [X + 7.65, 1.35], [X + 8.75, 1.35], 3, { off: 4 }); nd(S, 'ms', X + 4.4, 2.2, 3.2, 'MISS', 'warn', 3, { off: 4, h: .9 }); lbl(S, 'n3', X, 3.6, ['직접 제어: 없으면 DB에서 읽고 저장', 'manual: on a miss, read the DB and store'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'dl', X + 4.4, 2.2, 3.2, 'DEL', 'danger', 4, { h: .9 }); lbl(S, 'n4', X, 3.6, ['데이터가 바뀌면 캐시도 지워야 해요', 'invalidate when data changes'], 'r', 4, { w: 12 });
    },
    notes: [['CacheModule은 cache-manager 기반 캐시를 등록해요 · 기본은 메모리, 여러 서버라면 Redis 같은 저장소를 써요', 'CacheModule registers a cache-manager-based cache, in memory by default or a store such as Redis across servers'], ['CacheInterceptor를 걸면 GET 응답이 URL을 키로 자동 캐시돼서 두 번째 요청부터 DB를 거치지 않아요', 'CacheInterceptor caches GET responses keyed by URL, so repeat requests skip the database'], ['CACHE_MANAGER를 주입받아 get·set으로 직접 제어하는 캐시 어사이드 패턴도 흔해요', 'injecting CACHE_MANAGER and calling get and set directly implements the cache-aside pattern'], ['데이터를 바꾸는 쓰기 작업 뒤에는 del로 관련 캐시를 지워야 오래된 값이 나가지 않아요', 'after writes that change data, del the related keys or stale values will be served']],
    fin: [['캐싱: 자주 읽고 드물게 바뀌는 데이터를 TTL과 함께 보관해 응답을 빠르게 하고 DB 부하를 줄여요', 'caching stores frequently read, rarely changed data with a TTL, speeding responses and reducing database load', 'nsx-xs nsx-a'], ['캐시 무효화는 가장 어려운 문제 중 하나 · 키 설계부터', 'invalidation is hard, so design keys first'], ['사용자별 데이터는 자동 캐시에 넣지 않도록 주의', 'keep per-user data out of the automatic cache']],
    caps: [['캐시 저장소', 'Cache stores'], ['자동 캐시', 'Automatic caching'], ['직접 제어', 'Manual control'], ['무효화', 'Invalidation'], ['캐싱', 'Caching']]
  });
}
/* ===== NestJS · 4. security & docs, 5a. testing and microservices ===== */
function sJwt() {
  return CW('nest-auth-jwt', {
    code: ["@Public() @Post('login')", 'async login(@Body() dto: LoginDto) {', '  const user = await this.auth.check(dto);', '  const token = await this.jwt.signAsync({', '    sub: user.id });', '  return { access_token: token };', '}', ['// 이후 요청: Authorization: Bearer eyJ…', '// later: Authorization: Bearer eyJ…'], 'const p = await this.jwt.verifyAsync(token);', ['req.user = p;  // AuthGuard 안에서', 'req.user = p;  // inside AuthGuard']],
    hl: [[1, 2], [3, 3, 'ok'], [7, 1], [8, 2, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'cl', X, .8, 3.4, ['클라이언트', 'Client'], 'line', 0, { h: 1.1 }); nd(S, 'sv', X + 8.6, .8, 3.4, ['서버', 'Server'], 'line', 0, { h: 1.1 });
      arw(S, 'l1', [X + 3.5, 1.2], [X + 8.5, 1.2], 1, { off: 2 }); lbl(S, 'l1t', X + 3.6, 1.9, 'email + password', 'm', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['비밀번호를 해시와 비교해 확인', 'the password is checked against its hash'], 'a', 1, { off: 2, w: 12 });
      arw(S, 'l2', [X + 8.5, 1.5], [X + 3.5, 1.5], 2, { off: 3, color: 'ok' }); ['header', 'payload', 'signature'].forEach((t, i) => nd(S, 'tk' + i, X + i * 4.1, 2.6, 3.8, t, ['accent', 'ok', 'warn'][i], 2, { off: 3, h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['서명된 토큰 발급 · 서버는 상태 저장 X', 'a signed token; the server stores no session'], 'g', 2, { off: 3, w: 12 });
      arw(S, 'l3', [X + 3.5, 1.35], [X + 8.5, 1.35], 3, { off: 4 }); lbl(S, 'l3t', X + 3.6, 2.0, 'Bearer eyJ…', 'm a', 3, { off: 4 }); lbl(S, 'n3', X, 6.6, ['요청마다 헤더에 토큰을 실어 보내요', 'every request carries the token in a header'], 'a', 3, { off: 4, w: 12 });
      nd(S, 'gd', X + 8.6, 2.6, 3.4, 'AuthGuard', 'danger', 4, { h: 1.1 }); arw(S, 'ga', [X + 10.3, 1.95], [X + 10.3, 2.55], 4); nd(S, 'ru', X + 8.6, 4.3, 3.4, 'req.user', 'ok', 4, { h: 1.1 }); arw(S, 'gb', [X + 10.3, 3.75], [X + 10.3, 4.25], 4);
      lbl(S, 'n4', X, 6.6, ['가드가 서명·만료를 검증하고 사용자 정보 저장', 'the guard verifies signature and expiry'], 'w', 4, { w: 12 });
    },
    notes: [['로그인 요청에서 이메일과 비밀번호를 받아 저장된 해시(bcrypt·argon2)와 비교해 사용자를 확인해요', 'the login request’s email and password are checked against the stored hash (bcrypt or argon2)'], ['JwtService.signAsync로 사용자 ID(sub)를 담은 서명된 토큰을 발급해요 · 서버는 세션을 저장하지 않아요', 'JwtService.signAsync issues a signed token carrying the user ID (sub), and the server stores no session'], ['클라이언트는 이후 모든 요청의 Authorization 헤더에 Bearer 토큰을 실어 보내요', 'the client then sends the token as a Bearer value in every request’s Authorization header'], ['AuthGuard가 verifyAsync로 서명과 만료를 검증하고 req.user에 담아요 · 전역 가드로 걸고 로그인 같은 곳만 @Public()으로 열어요', 'AuthGuard verifies signature and expiry with verifyAsync and stores req.user, applied globally with @Public() opening routes such as login']],
    fin: [['JWT 인증: 로그인 때 서명된 토큰을 발급하고, 요청마다 가드가 검증해 사용자를 식별하는 무상태 인증', 'JWT authentication issues a signed token at login and verifies it in a guard on every request, a stateless scheme', 'nsx-xs nsx-a'], ['액세스 토큰은 짧게, 리프레시 토큰으로 갱신해요', 'keep access tokens short-lived and renew with refresh tokens'], ['@nestjs/passport의 Strategy로도 같은 흐름을 만들어요', 'Passport strategies in @nestjs/passport build the same flow']],
    caps: [['자격 확인', 'Checking credentials'], ['토큰 발급', 'Issuing a token'], ['토큰 보내기', 'Sending the token'], ['가드에서 검증', 'Verifying in a guard'], ['JWT 인증', 'JWT authentication']]
  });
}

function sRbac() {
  return CW('nest-rbac', {
    code: ["export const Roles = (...r: Role[]) =>", "  SetMetadata('roles', r);", "@Roles('admin') @Delete(':id') remove() {…}", 'canActivate(ctx: ExecutionContext) {', '  const need = this.reflector', "    .getAllAndOverride('roles',", '      [ctx.getHandler(), ctx.getClass()]);', '  if (!need) return true;', '  const { roles } = ctx.switchToHttp()', '    .getRequest().user;', '  return need.some(r => roles.includes(r));', '}'],
    hl: [[0, 3], [3, 4, 'ok'], [7, 1, 'warn'], [8, 3]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'h', X, .8, 5.6, 'remove()', 'line', 1, { h: 1.1 }); chip(S, 'tag', X, 2.2, 5.6, "roles: ['admin']", 'accent', 1, { h: 1.1 });
      lbl(S, 'n1', X, 6.8, ['@Roles가 핸들러에 메타데이터를 붙여요', '@Roles attaches metadata to the handler'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'rf', X + 6.4, .8, 5.6, 'Reflector', 'ok', 2, { h: 1.1 }); arw(S, 'a0', [X + 6.35, 1.35], [X + 5.65, 1.35], 2); lbl(S, 'n2', X, 6.8, ['가드가 Reflector로 메서드·클래스 메타데이터를 읽어요', 'the guard reads method and class metadata'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.8, ['역할 지정이 없으면 통과', 'no roles required: allow'], 'w', 3, { off: 4, w: 12 });
      [["user.roles = ['admin']", 'ok', '✓ 200'], ["user.roles = ['viewer']", 'danger', '✗ 403']].forEach(([t, c, r], i) => { nd(S, 'u' + i, X, 3.6 + i * 1.4, 8.0, t, 'line', 4, { h: 1.1 }); nd(S, 'r' + i, X + 8.4, 3.6 + i * 1.4, 3.6, r, c, 4, { h: 1.1 }); });
      lbl(S, 'n4', X, 6.8, ['필요한 역할 중 하나라도 있으면 허용', 'allow if the user has any required role'], 'a', 4, { w: 12 });
    },
    notes: [['SetMetadata로 만든 @Roles 데코레이터는 핸들러에 “필요한 역할” 정보를 메타데이터로 붙여 두기만 해요', 'the @Roles decorator built with SetMetadata only attaches “required roles” as metadata on the handler'], ['RolesGuard는 Reflector의 getAllAndOverride로 메서드와 클래스에 붙은 메타데이터를 읽어요 · 메서드 쪽이 우선해요', 'RolesGuard reads metadata from the method and class with Reflector’s getAllAndOverride, with the method taking priority'], ['역할 지정이 없는 핸들러는 그대로 통과시켜요', 'handlers without role requirements pass straight through'], ['인증 가드가 넣어 둔 req.user의 역할과 비교해 하나라도 맞으면 허용, 아니면 403이에요', 'it compares against the roles on req.user set by the authentication guard, allowing any match and returning 403 otherwise']],
    fin: [['역할 기반 접근 제어(RBAC): 데코레이터로 필요한 역할을 선언하고 가드가 메타데이터를 읽어 판단해요', 'role-based access control declares required roles with decorators and lets a guard decide by reading the metadata', 'nsx-xs nsx-a'], ['인증 가드가 먼저, 역할 가드가 그다음 순서로 걸어요', 'run the authentication guard first, then the roles guard'], ['“내 글만 수정” 같은 규칙은 CASL 같은 정책 기반으로', 'rules such as “edit only your own posts” suit policy-based tools like CASL']],
    caps: [['역할 메타데이터', 'Role metadata'], ['Reflector', 'Reflector'], ['지정 없으면 통과', 'No requirement, no check'], ['역할 비교', 'Comparing roles'], ['역할 기반 접근 제어', 'Role-based access control']]
  });
}

function sHardening() {
  return CW('nest-hardening', {
    code: ['app.use(helmet());', "app.enableCors({ origin: ['https://acme.dev'],", '  credentials: true });', 'ThrottlerModule.forRoot([', '  { ttl: 60_000, limit: 10 }]),', '{ provide: APP_GUARD,', '  useClass: ThrottlerGuard }', "@SkipThrottle() @Get('health') health() {}"],
    hl: [[0, 1], [1, 2, 'ok'], [3, 4, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options'].forEach((t, i) => lbl(S, 'h' + i, X, .8 + i * .95, t, 'm a', 1, { off: 2 }));
      lbl(S, 'n1', X, 5.6, ['helmet: 보안 응답 헤더를 한 번에', 'helmet sets security headers at once'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'o1', X, .8, 5.6, 'acme.dev', 'ok', 2, { off: 3, h: 1.1 }); nd(S, 'o2', X, 2.4, 5.6, 'evil.example', 'danger', 2, { off: 3, h: 1.1 }); nd(S, 'ap', X + 8.0, 1.6, 4.0, 'API', 'line', 2, { off: 3, h: 1.1 });
      arw(S, 'c1', [X + 5.65, 1.35], [X + 7.95, 1.9], 2, { off: 3, color: 'ok' }); lbl(S, 'c2', X + 6.0, 2.6, '✗', 'r', 2, { off: 3 });
      lbl(S, 'n2', X, 5.6, ['CORS: 허용한 출처의 브라우저만 호출', 'CORS: only allowed origins may call'], 'g', 2, { off: 3, w: 12 });
      for (let i = 0; i < 11; i++) sw(S, 'q' + i, X + i * 1.08, 1.4, .9, 1.6, i < 10 ? tint('ok', 50) : 'var(--danger)', 3, { off: 4 });
      lbl(S, 'qn', X + 8.6, 3.3, '429', 'm r', 3, { off: 4 }); lbl(S, 'n3', X, 5.6, ['1분에 10번 넘으면 429 Too Many Requests', 'over 10 a minute: 429 Too Many Requests'], 'w', 3, { off: 4, w: 12 });
      [['GET /health', '@SkipThrottle', 'ok'], ['POST /login', '@Throttle 5/min', 'warn']].forEach(([a, b, c], i) => { nd(S, 'pa' + i, X, .8 + i * 1.6, 5.6, a, 'line', 4, { h: 1.1 }); nd(S, 'pb' + i, X + 6.4, .8 + i * 1.6, 5.6, b, c, 4, { h: 1.1 }); });
      lbl(S, 'n4', X, 5.6, ['헬스 체크처럼 예외 경로는 @SkipThrottle', '@SkipThrottle for routes such as health'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 6.7, ['로그인엔 더 엄격한 @Throttle', 'stricter @Throttle on login'], '', 4, { w: 12 });
    },
    notes: [['helmet 미들웨어는 CSP, HSTS 같은 보안 응답 헤더를 한 번에 설정해 흔한 웹 공격을 줄여요', 'helmet middleware sets security headers such as CSP and HSTS at once, reducing common web attacks'], ['enableCors로 허용한 출처의 브라우저만 API를 호출하게 해요 · 쿠키를 쓰면 credentials도 켜요', 'enableCors lets only browsers from allowed origins call the API, with credentials enabled when cookies are used'], ['ThrottlerModule과 전역 ThrottlerGuard는 1분에 10번처럼 호출 횟수를 제한해 넘으면 429를 돌려줘요', 'ThrottlerModule with a global ThrottlerGuard limits calls, such as 10 a minute, returning 429 when exceeded'], ['@SkipThrottle로 헬스 체크를 빼고, 로그인처럼 민감한 곳은 @Throttle로 더 엄격하게 해요', '@SkipThrottle exempts health checks, while @Throttle tightens sensitive routes such as login']],
    fin: [['기본 보안 설정: 보안 헤더(helmet) + 출처 제한(CORS) + 속도 제한(Throttler)을 앱 시작 때 켜 둬요', 'baseline hardening turns on security headers (helmet), origin limits (CORS) and rate limiting (Throttler) at startup', 'nsx-xs nsx-a'], ['여러 서버라면 속도 제한 저장소를 Redis로 공유해요', 'with multiple servers, share the rate-limit store in Redis'], ['입력 검증과 의존성 업데이트도 함께 챙겨요', 'pair this with input validation and dependency updates']],
    caps: [['보안 헤더', 'Security headers'], ['CORS', 'CORS'], ['속도 제한', 'Rate limiting'], ['예외와 강화', 'Exceptions and tightening'], ['기본 보안 설정', 'Baseline hardening']]
  });
}

function sOpenApi() {
  return CW('nest-openapi', {
    code: ['const config = new DocumentBuilder()', "  .setTitle('Orders API')", '  .addBearerAuth().build();', 'const doc = SwaggerModule', '  .createDocument(app, config);', "SwaggerModule.setup('docs', app, doc);", 'export class CreateOrderDto {', '  @ApiProperty({ example: 3 }) qty: number;', '}'],
    hl: [[0, 3], [3, 3, 'ok'], [6, 3, 'warn'], [5, 1]],
    draw: (S) => {
      const X = 19.4;
      ['@Controller', '@Get', 'DTO'].forEach((t, i) => nd(S, 's' + i, X + i * 4.1, .8, 3.8, t, 'line', 1, { h: 1.1 })); [0, 1, 2].forEach(i => ed(S, 'e' + i, [X + 1.9 + i * 4.1, 2.0], [X + 6.0, 2.7], 1));
      nd(S, 'oa', X, 2.8, 12.0, 'openapi.json', 'accent', 1, { h: 1.1 }); lbl(S, 'n1', X, 7.4, ['코드의 데코레이터를 읽어 명세 생성', 'the spec is generated from decorators'], 'a', 1, { off: 2, w: 12 });
      arw(S, 'a2', [X + 3.0, 3.95], [X + 3.0, 4.55], 2); nd(S, 'ui', X, 4.6, 5.8, '/docs (Swagger UI)', 'ok', 2, { h: 1.1 }); lbl(S, 'n2', X, 7.4, ['/docs에서 보고 바로 호출해 봐요', 'browse and try calls at /docs'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 7.4, ['@ApiProperty로 예시·설명 보강', '@ApiProperty adds examples and docs'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'a4', [X + 9.0, 3.95], [X + 9.0, 4.55], 4); nd(S, 'sdk', X + 6.2, 4.6, 5.8, ['클라이언트 SDK 생성', 'generated client SDK'], 'warn', 4, { h: 1.1 }); lbl(S, 'n4', X, 7.4, ['명세로 프런트엔드 타입·SDK 자동 생성', 'the spec generates frontend types and SDKs'], 'a', 4, { w: 12 });
    },
    notes: [['DocumentBuilder로 제목, 버전, 인증 방식 같은 API 문서의 기본 정보를 정해요', 'DocumentBuilder sets the API document’s basics such as title, version and auth scheme'], ['SwaggerModule이 컨트롤러와 DTO의 데코레이터를 읽어 OpenAPI 명세를 만들고 /docs에 Swagger UI로 띄워요', 'SwaggerModule reads controller and DTO decorators to build an OpenAPI spec and serves Swagger UI at /docs'], ['@ApiProperty로 예시와 설명을 더하고, CLI 플러그인을 켜면 TypeScript 타입에서 상당 부분을 자동으로 추론해요', '@ApiProperty adds examples and descriptions, and the CLI plugin infers much of it from TypeScript types'], ['만들어진 openapi.json으로 프런트엔드 타입이나 클라이언트 SDK를 자동 생성해 API와 화면을 맞춰요', 'the generated openapi.json produces frontend types or client SDKs that keep UI and API in sync']],
    fin: [['OpenAPI 문서화: 코드에서 API 명세를 생성해 문서·테스트 UI·클라이언트 코드를 한 출처에서 얻어요', 'OpenAPI documentation generates the API spec from code, deriving docs, a test UI and client code from one source', 'nsx-xs nsx-a'], ['문서가 코드와 따로 놀지 않아요', 'docs never drift from code'], ['운영에서는 /docs 접근을 막거나 인증을 걸어요', 'restrict or protect /docs in production']],
    caps: [['문서 기본 정보', 'Document basics'], ['명세와 UI', 'Spec and UI'], ['설명 보강', 'Enriching docs'], ['클라이언트 생성', 'Generating clients'], ['OpenAPI 문서화', 'OpenAPI documentation']]
  });
}

function sTesting() {
  return CW('nest-testing', {
    code: ['const mod = await Test.createTestingModule({', '  providers: [OrdersService,', '    { provide: Repo, useValue: fake }],', '}).compile();', 'const svc = mod.get(OrdersService);', 'expect(await svc.total(1)).toBe(30);', ['// e2e: 진짜 앱 + HTTP 요청', '// e2e: the real app plus HTTP requests'], 'await request(app.getHttpServer())', "  .get('/orders/1').expect(200);"],
    hl: [[0, 4], [2, 1, 'ok'], [4, 2], [6, 3, 'warn']],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'tm', X, .6, 12.0, 4.0, 'TestingModule', 'accent', 1, { tc: 'a' }); nd(S, 'sv', X + 3.5, 1.4, 5.0, 'OrdersService', 'accent', 1, { h: 1.1 });
      nd(S, 'rp', X + 3.5, 3.0, 5.0, 'Repo', 'line', 1, { off: 2, h: 1.1 }); lbl(S, 'n1', X, 7.0, ['테스트용 작은 모듈을 즉석에서 구성', 'build a small module just for the test'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'fk', X + 3.5, 3.0, 5.0, 'fake Repo', 'ok', 2, { h: 1.1 }); lbl(S, 'n2', X, 7.0, ['DB 대신 가짜 · 빠르고 결정적', 'a fake instead of the DB: fast, deterministic'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'pass', X + 9.0, 1.4, 2.6, '✓ 30', 'ok', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 7.0, ['단위 테스트: 서비스 로직만 검증', 'unit test: just the service logic'], 'a', 3, { off: 4, w: 12 });
      nd(S, 'e2', X, 4.9, 12.0, 'GET /orders/1 → 200 (supertest)', 'warn', 4, { h: 1.1 }); lbl(S, 'n4', X, 7.0, ['e2e: 파이프·가드까지 포함한 전체 흐름', 'e2e covers pipes, guards and the full flow'], 'w', 4, { w: 12 });
    },
    notes: [['Test.createTestingModule로 테스트에 필요한 프로바이더만 담은 작은 모듈을 만들어 compile해요', 'Test.createTestingModule builds and compiles a small module holding only the providers a test needs'], ['DB 저장소는 useValue로 가짜를 넣어요 · 테스트가 빠르고 매번 같은 결과를 내요', 'useValue swaps the database repository for a fake, making tests fast and deterministic'], ['mod.get으로 서비스를 꺼내 로직만 검증하는 것이 단위 테스트예요', 'pulling the service out with mod.get and checking only its logic is a unit test'], ['e2e 테스트는 진짜 앱을 띄워 supertest로 HTTP 요청을 보내 파이프·가드·필터까지 포함한 흐름을 확인해요 · overrideProvider로 외부 의존만 바꿔요', 'e2e tests boot the real app and send HTTP requests with supertest, covering pipes, guards and filters, with overrideProvider replacing only external dependencies']],
    fin: [['테스트: DI 덕분에 의존성을 가짜로 바꿔 끼우기 쉬워요 · 단위 테스트와 e2e 테스트를 함께 써요', 'testing benefits from DI, which makes swapping dependencies for fakes easy; combine unit and e2e tests', 'nsx-xs nsx-a'], ['Nest 12의 ESM 프로젝트는 Vitest가 기본 테스트 도구', 'Nest 12 ESM projects default to Vitest'], ['e2e용 DB는 컨테이너(Testcontainers)로 띄우기도 해요', 'e2e databases often run in containers via Testcontainers']],
    caps: [['테스트 모듈', 'Testing modules'], ['가짜 의존성', 'Fake dependencies'], ['단위 테스트', 'Unit tests'], ['e2e 테스트', 'End-to-end tests'], ['테스트', 'Testing']]
  });
}

function sMicro() {
  return CW('nest-microservices', {
    code: [['// 주문 서비스 (보내는 쪽)', '// order service (sender)'], "this.client.emit('order.created', order);", 'const ok = await firstValueFrom(', "  this.client.send('stock.check', { sku }));", ['// 재고 서비스 (받는 쪽)', '// stock service (receiver)'], "@EventPattern('order.created')", 'onCreated(@Payload() o: Order) {…}', "@MessagePattern('stock.check')", 'check(@Payload() d: { sku: string }) {…}'],
    hl: [[1, 1, 'ok'], [2, 2], [5, 4, 'warn'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'os', X, 1.0, 3.6, ['주문', 'Orders'], 'accent', 0, { h: 3.0 }); nd(S, 'ss', X + 8.4, 1.0, 3.6, ['재고', 'Stock'], 'ok', 0, { h: 3.0 });
      sw(S, 'br', X + 4.0, 2.2, 4.0, .6, tint('line', 30), 0); cl(S, 'brl', X + 4.0, 2.95, 4.0, ['브로커', 'broker'], 'm', 0);
      arw(S, 'e1', [X + 3.7, 1.6], [X + 8.3, 1.6], 1, { off: 2, color: 'ok' }); lbl(S, 'e1t', X + 4.2, .5, 'emit: order.created', 'm g', 1, { off: 2 });
      lbl(S, 'n1', X, 4.6, ['emit: 이벤트를 던지고 끝(응답 없음)', 'emit fires an event, no reply'], 'g', 1, { off: 2, w: 12 });
      arw(S, 's1', [X + 3.7, 1.5], [X + 8.3, 1.5], 2, { off: 3 }); arw(S, 's2', [X + 8.3, 3.6], [X + 3.7, 3.6], 2, { off: 3, color: 'accent' }); lbl(S, 's1t', X + 4.2, .5, 'send: stock.check', 'm a', 2, { off: 3 }); lbl(S, 's2t', X + 4.6, 3.8, '{ ok: true }', 'm', 2, { off: 3 });
      lbl(S, 'n2', X, 4.6, ['send: 요청-응답 · Observable로 결과', 'send is request-response via an Observable'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 4.6, ['받는 쪽은 패턴 데코레이터로 구독', 'receivers subscribe with pattern decorators'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.6, ['전송 계층만 바꿔도 코드는 그대로', 'swap the transport, keep the code'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 5.7, ['TCP · Redis · NATS · Kafka · RabbitMQ · gRPC', 'TCP, Redis, NATS, Kafka, RabbitMQ, gRPC'], 'm', 4, { w: 12 });
    },
    notes: [['emit은 “주문이 생겼다” 같은 이벤트를 던지고 끝나요 · 받는 쪽이 몇 개든 응답을 기다리지 않아요', 'emit publishes an event such as “order created” and moves on, never waiting for replies however many listeners exist'], ['send는 요청-응답 방식이라 Observable로 결과를 받아요 · firstValueFrom으로 Promise로 바꿔 await해요', 'send is request-response, returning an Observable that firstValueFrom turns into an awaitable promise'], ['받는 서비스는 @EventPattern(이벤트)과 @MessagePattern(요청-응답)으로 메시지를 구독해요', 'the receiving service subscribes with @EventPattern for events and @MessagePattern for request-response'], ['TCP, Redis, NATS, Kafka, RabbitMQ, gRPC 등 전송 계층(transport)만 바꾸면 같은 코드가 그대로 동작해요', 'changing only the transport, such as TCP, Redis, NATS, Kafka, RabbitMQ or gRPC, leaves the same code working']],
    fin: [['마이크로서비스: 서비스끼리 HTTP 대신 메시지로 통신 · 이벤트(emit)와 요청-응답(send) 두 패턴', 'microservices communicate by messages rather than HTTP, with two patterns: events (emit) and request-response (send)', 'nsx-xs nsx-a'], ['하나의 앱이 HTTP와 메시지 리스너를 함께 띄울 수도 있어요(하이브리드 앱)', 'one app can serve HTTP and message listeners together (a hybrid app)'], ['Nest 12에서 NATS 전송은 새 @nats-io 패키지로 바뀌었어요', 'in Nest 12 the NATS transport moved to the new @nats-io packages']],
    caps: [['이벤트 보내기', 'Emitting events'], ['요청-응답', 'Request-response'], ['패턴 구독', 'Pattern subscriptions'], ['전송 계층', 'Transports'], ['마이크로서비스', 'Microservices']]
  });
}
/* ===== NestJS · 5b. GraphQL, realtime, background work, CQRS, Nest 12 ===== */
function sGraphql() {
  return CW('nest-graphql', {
    code: ['@ObjectType()', 'class Book {', '  @Field(() => ID) id: string;', '  @Field() title: string;', '}', '@Resolver(() => Book)', 'export class BooksResolver {', '  @Query(() => [Book]) books() {…}', '  @ResolveField() author(@Parent() b: Book)', '  @Mutation(() => Book) addBook(…) {…}', '}'],
    hl: [[0, 5], [7, 1, 'ok'], [8, 1, 'warn'], [9, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'sd', X, .8, 12.0, 'type Book { id: ID!  title: String! }', 'accent', 1, { h: 1.1 }); lbl(S, 'n1', X, 7.6, ['코드 우선: 클래스에서 스키마 자동 생성', 'code first: the schema comes from classes'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'q', X, 2.6, '{ books { title author { name } } }', 'm a', 2); lbl(S, 'n2', X, 7.6, ['클라이언트가 필요한 필드만 골라 요청', 'clients ask for exactly the fields they need'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'r1', X, 3.8, 5.6, 'books()', 'ok', 2, { h: 1.0 }); nd(S, 'r2', X + 6.4, 3.8, 5.6, 'author(book)', 'warn', 3, { h: 1.0 }); arw(S, 'ra', [X + 5.65, 4.3], [X + 6.35, 4.3], 3);
      lbl(S, 'n3', X, 7.6, ['필드마다 리졸버 · 책 N권이면 N번 호출', 'a resolver per field: N books, N calls'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'dl', X + 6.4, 5.3, 5.6, 'DataLoader', 'accent', 4, { h: 1.0 }); arw(S, 'da', [X + 9.2, 4.85], [X + 9.2, 5.25], 4); lbl(S, 'n4', X, 7.6, ['DataLoader로 모아 한 번에(N+1 해결)', 'DataLoader batches them, fixing N+1'], 'a', 4, { w: 12 });
    },
    notes: [['@ObjectType과 @Field로 TypeScript 클래스를 선언하면 Nest가 GraphQL 스키마를 자동으로 만들어요(코드 우선 방식)', 'declaring classes with @ObjectType and @Field lets Nest generate the GraphQL schema automatically (code first)'], ['@Query 리졸버가 진입점이에요 · 클라이언트는 필요한 필드만 골라 요청해서 과하거나 모자란 응답이 없어요', '@Query resolvers are the entry points, and clients request exactly the fields they need, avoiding over- and under-fetching'], ['@ResolveField는 author처럼 연결된 필드를 따로 풀어요 · 책이 N권이면 N번 호출되는 N+1 문제가 생겨요', '@ResolveField resolves linked fields such as author separately, causing the N+1 problem with N books'], ['DataLoader로 같은 요청 안의 조회를 모아 한 번에 처리하면 N+1이 해결돼요 · @Mutation은 데이터를 바꾸는 진입점이에요', 'DataLoader batches lookups within one request to fix N+1, and @Mutation is the entry point for changing data']],
    fin: [['GraphQL: 클라이언트가 필요한 모양을 질의하고, 서버는 필드별 리졸버로 응답을 조립해요', 'with GraphQL, clients query the shape they need and the server assembles it with per-field resolvers', 'nsx-xs nsx-a'], ['Nest 12는 기본 IDE가 GraphiQL, 구독은 graphql-ws', 'Nest 12 defaults to GraphiQL and graphql-ws for subscriptions'], ['스키마 우선(SDL) 방식도 선택할 수 있어요', 'a schema-first (SDL) approach is also available']],
    caps: [['스키마 생성', 'Generating the schema'], ['쿼리 리졸버', 'Query resolvers'], ['필드 리졸버와 N+1', 'Field resolvers and N+1'], ['DataLoader', 'DataLoader'], ['GraphQL', 'GraphQL']]
  });
}

function sWebsocket() {
  return CW('nest-websockets', {
    code: ["@WebSocketGateway({ namespace: 'chat' })", 'export class ChatGateway {', '  @WebSocketServer() server: Server;', "  @SubscribeMessage('send')", '  onSend(@MessageBody() m: Msg,', '         @ConnectedSocket() c: Socket) {', "    this.server.to(m.room).emit('message', m);", '  }', '}'],
    hl: [[0, 3], [3, 3, 'ok'], [6, 1, 'warn'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'gw', X + 3.6, 2.8, 4.8, 'ChatGateway', 'accent', 0, { h: 1.4 });
      const C = [[X, .6], [X + 9.0, .6], [X, 5.4], [X + 9.0, 5.4]];
      C.forEach(([x, y], i) => { nd(S, 'c' + i, x, y, 3.0, 'client ' + (i + 1), i < 3 ? 'ok' : 'line', 0, { h: 1.1 }); ed(S, 'w' + i, [x + 1.5, y + (y < 2 ? 1.1 : 0)], [X + (x < X + 5 ? 4.6 : 7.4), y < 2 ? 2.8 : 4.2], 1); });
      lbl(S, 'n1', X, 7.4, ['연결을 유지 · 서버도 먼저 보낼 수 있어요', 'connections stay open; the server can push'], 'a', 1, { off: 2, w: 12 });
      arw(S, 'up', [X + 1.5, 1.9], [X + 3.5, 2.9], 2, { off: 3, color: 'ok' }); lbl(S, 'upt', X + .2, 2.2, "send", 'm g', 2, { off: 3 }); lbl(S, 'n2', X, 7.4, ["'send' 메시지를 핸들러가 받아요", "a handler receives the 'send' message"], 'g', 2, { off: 3, w: 12 });
      frame(S, 'rm', X - .2, .4, 12.4, 1.5, 'warn', 3, { dash: 1, w: .1 }); frame(S, 'rm2', X - .2, 5.2, 3.4, 1.5, 'warn', 3, { dash: 1, w: .1 });
      lbl(S, 'n3', X, 7.4, ['같은 방(room)의 클라이언트에게만 전달', 'delivered only to clients in the room'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.4, ['여러 서버면 Redis 어댑터로 방 공유', 'multiple servers share rooms via a Redis adapter'], 'a', 4, { w: 12 });
    },
    notes: [['@WebSocketGateway는 Socket.IO(또는 ws) 연결을 받는 게이트웨이예요 · HTTP와 달리 연결이 유지돼 서버가 먼저 보낼 수 있어요', '@WebSocketGateway accepts Socket.IO (or ws) connections that stay open, so the server can push first, unlike HTTP'], ["@SubscribeMessage('send')가 그 이름의 메시지를 받는 핸들러이고, @MessageBody로 내용을 꺼내요", "@SubscribeMessage('send') handles messages of that name, and @MessageBody extracts the content"], ["server.to(room).emit으로 같은 방에 들어온 클라이언트에게만 'message'를 보내요", "server.to(room).emit sends 'message' only to clients that joined the room"], ['서버가 여러 대면 Redis 어댑터로 방과 메시지를 공유해야 다른 서버에 붙은 사용자에게도 전달돼요 · 가드·파이프도 그대로 써요', 'with several servers, a Redis adapter shares rooms so users on other servers receive messages, and guards and pipes still apply']],
    fin: [['WebSocket 게이트웨이: 양방향 실시간 통신을 데코레이터 기반 핸들러로 다뤄요 · 채팅, 알림, 협업에', 'WebSocket gateways handle two-way realtime communication with decorator-based handlers, for chat, notifications and collaboration', 'nsx-xs nsx-a'], ['연결 수명은 OnGatewayConnection/Disconnect로', 'connection lifetimes use OnGatewayConnection/Disconnect'], ['단방향 알림이면 SSE(@Sse)도 대안이에요', 'for one-way updates, SSE (@Sse) is an alternative']],
    caps: [['게이트웨이', 'Gateways'], ['메시지 핸들러', 'Message handlers'], ['방에 보내기', 'Emitting to rooms'], ['여러 서버', 'Multiple servers'], ['WebSocket 게이트웨이', 'WebSocket gateways']]
  });
}

function sQueues() {
  return CW('nest-queues', {
    code: ["BullModule.registerQueue({ name: 'email' })", "await this.emailQ.add('welcome', { userId },", '  { attempts: 3, backoff: 5000 });', ['return { status: "queued" };  // 202', 'return { status: "queued" };  // 202'], "@Processor('email')", 'export class EmailWorker extends WorkerHost {', '  process(job: Job) {', '    return sendMail(job.data);', '  }', '}'],
    hl: [[1, 1], [3, 1, 'ok'], [4, 6, 'warn'], [2, 1, 'danger']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'api', X, .8, 3.4, 'API', 'accent', 0, { h: 1.1 }); sw(S, 'q', X + 4.2, .8, 4.0, 1.1, tint('line', 20), 0, { r: .3 }); lbl(S, 'ql', X + 4.2, 2.1, 'Redis queue', 'm', 0); nd(S, 'wk', X + 9.0, .8, 3.0, 'Worker', 'warn', 0, { h: 1.1 });
      chip(S, 'job', X + 3.7, .95, 1.2, 'J', 'ok', 1, { h: .8, css: 'z-index:3' }); S.set('job', 0, { transform: 'translate(0,0)' }); S.set('job', 1, { transform: 'translate(.8em,0)' }); S.set('job', 3, { transform: 'translate(5.8em,0)' }); S.set('job', 4, { transform: 'translate(2.2em,0)' });
      lbl(S, 'n1', X, 3.6, ['오래 걸리는 일은 작업으로 큐에 넣어요', 'slow work goes into a queue as a job'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'r', X, 2.4, 3.4, '202', 'ok', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 3.6, ['요청은 바로 응답 · 사용자는 기다리지 않아요', 'the request returns at once'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 3.6, ['워커가 큐에서 꺼내 처리 · 다른 서버여도 OK', 'workers pull jobs, even on other servers'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'f', X + 9.0, 2.2, '✗ 1/3', 'm r', 4); lbl(S, 'n4', X, 3.6, ['실패하면 간격을 두고 최대 3번 재시도', 'failures retry up to 3 times with backoff'], 'r', 4, { w: 12 });
    },
    notes: [['메일 발송, 이미지 처리처럼 오래 걸리는 일은 BullMQ 큐에 작업(job)으로 넣어요 · 큐는 Redis에 저장돼요', 'slow work such as sending mail or processing images goes into a BullMQ queue as a job stored in Redis'], ['API는 작업을 넣자마자 응답해서 사용자가 오래 기다리지 않아요', 'the API responds as soon as the job is queued, so users do not wait'], ['@Processor 워커가 큐에서 작업을 꺼내 처리해요 · 워커를 별도 서버로 늘려 처리량을 키울 수 있어요', 'an @Processor worker pulls and runs jobs, and workers can scale out on separate servers'], ['attempts와 backoff로 실패한 작업을 간격을 두고 다시 시도해요 · 끝내 실패한 작업은 따로 모여 확인할 수 있어요', 'attempts and backoff retry failed jobs with delays, and jobs that keep failing are kept aside for inspection']],
    fin: [['작업 큐: 요청 처리와 무거운 작업을 분리해 응답성을 지키고 재시도·지연 실행·속도 조절을 얻어요', 'job queues separate request handling from heavy work, preserving responsiveness and adding retries, delays and rate control', 'nsx-xs nsx-a'], ['작업은 여러 번 실행돼도 안전하게(멱등) 만들어요', 'make jobs idempotent so retries are safe'], ['delay 옵션으로 “10분 뒤 실행”도 돼요', 'the delay option schedules “run in 10 minutes”']],
    caps: [['작업 넣기', 'Adding jobs'], ['바로 응답', 'Immediate replies'], ['워커 처리', 'Worker processing'], ['재시도', 'Retries'], ['작업 큐', 'Job queues']]
  });
}

function sScheduleEvents() {
  return CW('nest-schedule-events', {
    code: [["@Cron('0 3 * * *')    // 매일 새벽 3시", "@Cron('0 3 * * *')    // daily at 3 a.m."], 'cleanup() { return this.purgeOld(); }', '@Interval(10_000) poll() {…}', "this.events.emit('order.created', order);", "@OnEvent('order.created')", 'sendReceipt(o: Order) {…}', "@OnEvent('order.created', { async: true })", 'updateStats(o: Order) {…}'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 3, 'warn'], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      [0, 1, 2, 3].forEach(i => { lbl(S, 'd' + i, X + i * 3.0, .6, ['월화수목'[i], ['Mon', 'Tue', 'Wed', 'Thu'][i]], 'm', 1, { off: 2 }); chip(S, 't' + i, X + i * 3.0, 1.4, 2.6, '03:00', 'accent', 1, { off: 2, h: .9 }); });
      lbl(S, 'n1', X, 6.0, ['cron 표현식으로 정해진 시각에 실행', 'runs at times set by a cron expression'], 'a', 1, { off: 2, w: 12 });
      for (let i = 0; i < 8; i++) chip(S, 'iv' + i, X + i * 1.5, 1.4, 1.2, '•', 'ok', 2, { off: 3, h: .9 }); lbl(S, 'n2', X, 6.0, ['@Interval: 10초마다 반복', '@Interval repeats every 10 s'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'em', X, .8, 4.6, 'order.created', 'warn', 3, { h: 1.1 }); ['sendReceipt', 'updateStats'].forEach((t, i) => { nd(S, 'l' + i, X + 6.4, .8 + i * 1.6, 5.6, t, 'line', 3, { h: 1.1 }); arw(S, 'la' + i, [X + 4.65, 1.35], [X + 6.35, 1.35 + i * 1.6], 3); });
      lbl(S, 'n3', X, 6.0, ['한 이벤트에 여러 리스너 · 서로 몰라요', 'many listeners per event, unaware of each other'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'as', X + 9.4, 3.7, 2.4, 'async', 'accent', 4, { h: .8 }); lbl(S, 'n4', X, 6.0, ['async: 응답을 막지 않고 따로 처리', 'async listeners do not block the reply'], 'a', 4, { w: 12 });
    },
    notes: [["@nestjs/schedule의 @Cron('0 3 * * *')은 매일 새벽 3시에 오래된 데이터 정리 같은 작업을 실행해요", "@Cron('0 3 * * *') from @nestjs/schedule runs jobs such as data cleanup daily at 3 a.m."], ['@Interval은 일정 간격마다, @Timeout은 시작 후 한 번 실행해요', '@Interval repeats at a fixed period, and @Timeout runs once after startup'], ['@nestjs/event-emitter로 “주문 생성” 이벤트를 내보내면 영수증 발송, 통계 갱신 같은 리스너가 각자 반응해요 · 서로를 몰라서 결합이 낮아요', 'emitting an “order created” event with @nestjs/event-emitter lets listeners such as receipts and stats react independently, keeping coupling low'], ['async: true 리스너는 응답 흐름을 막지 않고 따로 실행돼요 · 같은 프로세스 안의 이벤트라 서비스 간 통신에는 메시지 브로커를 써요', 'async: true listeners run without blocking the response, and since these events stay in-process, cross-service messaging needs a broker']],
    fin: [['스케줄과 이벤트: 시간 기반 작업(@Cron)과 앱 내부 이벤트(@OnEvent)로 핵심 흐름에서 부수 작업을 떼어내요', 'scheduling and events split side work from core flows with time-based jobs (@Cron) and in-app events (@OnEvent)', 'nsx-xs nsx-a'], ['서버가 여러 대면 cron이 중복 실행되지 않게 잠금을 걸어요', 'with several servers, lock cron jobs so they do not run twice'], ['중요한 작업은 큐로 옮겨 재시도를 보장해요', 'move critical work to a queue for guaranteed retries']],
    caps: [['@Cron', '@Cron'], ['@Interval', '@Interval'], ['이벤트 발행', 'Emitting events'], ['비동기 리스너', 'Async listeners'], ['스케줄과 이벤트', 'Scheduling and events']]
  });
}

function sCqrs() {
  return CW('nest-cqrs', {
    code: ['class PlaceOrder {', '  constructor(public items: Item[]) {}', '}', '@CommandHandler(PlaceOrder)', 'class PlaceOrderHandler {', '  execute(cmd: PlaceOrder) { … }', '}', 'this.commandBus.execute(new PlaceOrder(i))', 'this.queryBus.execute(new GetOrder(id))', ['@EventsHandler(OrderPlaced) … // 후속 처리', '@EventsHandler(OrderPlaced) … // follow-ups']],
    hl: [[0, 3], [3, 5, 'ok'], [8, 1, 'warn'], [9, 1]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'wl', X, .6, ['쓰기', 'Write'], 'a', 1); lbl(S, 'rl', X + 6.4, .6, ['읽기', 'Read'], 'g', 3);
      nd(S, 'cmd', X, 1.5, 5.6, 'PlaceOrder', 'accent', 1, { h: 1.0 }); arw(S, 'c1', [X + 2.8, 2.55], [X + 2.8, 3.05], 1); nd(S, 'cb', X, 3.1, 5.6, 'CommandBus', 'line', 1, { h: 1.0 });
      lbl(S, 'n1', X, 8.4, ['명령: “주문해 줘” 같은 의도를 객체로', 'a command captures an intent as an object'], 'a', 1, { off: 2, w: 12 });
      arw(S, 'c2', [X + 2.8, 4.15], [X + 2.8, 4.65], 2); nd(S, 'ch', X, 4.7, 5.6, 'Handler → DB', 'warn', 2, { h: 1.0 }); lbl(S, 'n2', X, 8.4, ['핸들러 하나가 명령 하나를 처리', 'one handler per command'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'qr', X + 6.4, 1.5, 5.6, 'GetOrder', 'ok', 3, { h: 1.0 }); arw(S, 'q1', [X + 9.2, 2.55], [X + 9.2, 3.05], 3); nd(S, 'qb', X + 6.4, 3.1, 5.6, 'QueryBus', 'line', 3, { h: 1.0 }); arw(S, 'q2', [X + 9.2, 4.15], [X + 9.2, 4.65], 3); nd(S, 'rm', X + 6.4, 4.7, 5.6, ['읽기 모델', 'read model'], 'ok', 3, { h: 1.0 });
      lbl(S, 'n3', X, 8.4, ['조회는 별도 경로 · 읽기에 맞춘 모델', 'queries take a separate, read-optimized path'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'ev', X, 6.3, 12.0, ['OrderPlaced → 메일 · 재고 · 읽기 모델', 'OrderPlaced → mail, stock, read model'], 'warn', 4, { h: 1.1 }); arw(S, 'e1', [X + 2.8, 5.75], [X + 2.8, 6.25], 4);
      lbl(S, 'n4', X, 8.4, ['이벤트로 후속 작업을 느슨하게 연결', 'events loosely chain follow-up work'], 'a', 4, { w: 12 });
    },
    notes: [['CQRS는 상태를 바꾸는 명령(Command)과 조회(Query)를 분리하는 패턴이에요 · 명령은 “주문해 줘” 같은 의도를 담은 객체예요', 'CQRS separates commands that change state from queries; a command is an object carrying an intent such as “place an order”'], ['CommandBus가 명령을 받아 그 명령 전용 @CommandHandler에 넘기고, 핸들러가 도메인 로직과 저장을 해요', 'CommandBus routes each command to its dedicated @CommandHandler, which runs domain logic and persistence'], ['조회는 QueryBus와 @QueryHandler로 따로 처리해요 · 읽기에 최적화된 모델을 쓸 수 있어요', 'queries go through QueryBus and @QueryHandler separately, free to use read-optimized models'], ['명령 처리 뒤 발생한 이벤트를 @EventsHandler와 사가(saga)가 받아 메일·재고 같은 후속 작업을 느슨하게 이어요', 'events raised after a command are picked up by @EventsHandler and sagas, loosely chaining follow-ups such as mail and stock']],
    fin: [['CQRS(@nestjs/cqrs): 쓰기와 읽기를 버스와 핸들러로 분리해 복잡한 도메인을 정리하는 패턴', 'CQRS with @nestjs/cqrs splits writes and reads through buses and handlers to organize complex domains', 'nsx-xs nsx-a'], ['단순한 CRUD에는 과해요 · 도메인이 복잡할 때만', 'it is overkill for simple CRUD; use it for complex domains'], ['이벤트 소싱과 함께 쓰이기도 해요', 'it often pairs with event sourcing']],
    caps: [['명령 객체', 'Command objects'], ['명령 핸들러', 'Command handlers'], ['조회 분리', 'Separate queries'], ['이벤트와 사가', 'Events and sagas'], ['CQRS', 'CQRS']]
  });
}

function sNest12() {
  return CW('nest-v12', {
    code: ['nest upgrade', ['// Node.js 20.19+ 또는 22.12+ 필요', '// requires Node.js 20.19+ or 22.12+'], ['// 코어 패키지가 ESM으로 · CJS 앱도 동작', '// core packages are ESM; CJS apps still work'], '@Body({ schema: createUserSchema })', "NestFactory.create(App, { instrument })", ['// ESM 새 프로젝트: Vitest + oxlint', '// new ESM projects: Vitest + oxlint'], 'nest build --builder rspack'],
    hl: [[1, 2], [3, 1, 'ok'], [4, 1, 'warn'], [5, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'esm', X, .8, 5.6, 'ESM packages', 'accent', 1, { h: 1.1 }); nd(S, 'cjs', X + 6.4, .8, 5.6, ['CJS 앱', 'CJS app'], 'line', 1, { h: 1.1 }); arw(S, 'rq', [X + 6.35, 1.35], [X + 5.65, 1.35], 1); lbl(S, 'rql', X + 3.0, 2.2, 'require(esm)', 'm a', 1);
      lbl(S, 'n1', X, 6.4, ['기존 CommonJS 앱도 그대로 불러 써요', 'existing CommonJS apps keep loading them'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ss', X, 3.0, 12.0, 'Zod · Valibot · ArkType', 'ok', 2, { h: 1.1 }); lbl(S, 'n2', X, 6.4, ['검증·직렬화·설정에 스키마 라이브러리', 'schema libraries for validation and config'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'ob', X, 4.6, 12.0, '@nestjs/observe', 'warn', 3, { h: 1.1 }); lbl(S, 'n3', X, 6.4, ['요청 수명 주기에 붙는 공식 관측 SDK', 'an official observability SDK in the lifecycle'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['도구 교체: Jest→Vitest, ESLint→oxlint', 'tooling: Jest to Vitest, ESLint to oxlint'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.5, ['webpack 대신 rspack · nest upgrade로 이전', 'rspack replaces webpack; migrate via nest upgrade'], '', 4, { w: 12 });
    },
    notes: [['Nest 12(2026년 8월)는 모든 코어 패키지를 ESM으로 바꿨어요 · Node의 require(esm) 덕분에 기존 CommonJS 앱도 계속 동작하고, Node 20.19+ 또는 22.12+가 필요해요', 'Nest 12 (August 2026) ships every core package as ESM, while Node’s require(esm) keeps CommonJS apps working; it needs Node 20.19+ or 22.12+'], ['@Body·@Query·@Param이 schema 옵션으로 Zod 같은 Standard Schema 라이브러리를 받아 검증과 직렬화를 해요', '@Body, @Query and @Param accept Standard Schema libraries such as Zod through a schema option for validation and serialization'], ['@nestjs/observe는 HTTP, GraphQL, 마이크로서비스, 큐, cron 실행을 요청 수명 주기에서 추적하는 공식 관측 도구예요', '@nestjs/observe is the official observability SDK tracing HTTP, GraphQL, microservices, queues and cron runs through the lifecycle'], ['새 ESM 프로젝트는 Vitest와 oxlint가 기본이고, webpack 빌드는 rspack으로 대체돼요 · nest upgrade가 많은 변경을 자동으로 해 줘요', 'new ESM projects default to Vitest and oxlint, rspack replaces webpack builds, and nest upgrade automates many changes']],
    fin: [['Nest 12: ESM 전환, Standard Schema 검증, 공식 관측 SDK, 더 빠른 도구 체인', 'Nest 12 brings the ESM move, Standard Schema validation, an official observability SDK and a faster toolchain', 'nsx-xs nsx-a'], ['수명 주기 훅 순서와 NATS·GraphQL 구독 패키지 변경을 확인해요', 'check the lifecycle hook order and the NATS and GraphQL subscription package changes'], ['class-validator 방식은 그대로 지원돼요', 'the class-validator workflow remains supported']],
    caps: [['ESM 전환', 'Moving to ESM'], ['Standard Schema', 'Standard Schema'], ['관측 SDK', 'Observability SDK'], ['도구 체인', 'Toolchain'], ['Nest 12의 변화', 'What changed in Nest 12']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('nest-core', '핵심 구조', 'Core', '모듈·컨트롤러·프로바이더', 'Modules, controllers and providers', 'Nest 앱의 뼈대인 모듈 그래프와 컨트롤러, 의존성 주입 컨테이너, 프로바이더의 범위와 앱의 수명 주기예요.', 'The skeleton of a Nest app: the module graph, controllers, the dependency injection container, provider scopes and the app lifecycle.', [
    item('nest-module', '모듈', 'Modules', '@Module은 관련된 컨트롤러와 프로바이더를 기능 단위로 묶어요. imports로 다른 모듈을 가져오고 exports한 프로바이더만 바깥에 공개해요.', 'Nest 앱은 AppModule을 루트로 하는 모듈 그래프예요. OrdersModule처럼 기능마다 모듈을 두고, 그 안에 컨트롤러(요청 처리)와 프로바이더(로직)를 등록해요. 프로바이더는 기본적으로 모듈 안에 캡슐화되어 있어서 exports에 적어야만 이 모듈을 import한 다른 모듈이 주입받을 수 있어요. 이렇게 공개 범위를 명시하니 모듈 사이 의존 관계가 코드에 드러나고, 큰 앱도 경계를 유지하기 쉬워요. 어디서나 쓰는 설정·DB 모듈은 @Global()로 등록할 수 있지만, 남발하면 의존성이 숨어 버려 권장되지 않아요. 모듈끼리 서로 import하는 순환은 forwardRef로 풀 수 있지만 보통 경계를 다시 나누라는 신호예요.', 'The @Module decorator groups related controllers and providers into feature units, imports other modules, and exposes only exported providers.', 'A Nest app is a module graph rooted at AppModule. Each feature, such as OrdersModule, gets a module registering its controllers (request handling) and providers (logic). Providers are encapsulated by default, so only those listed in exports can be injected by modules that import it. Declaring visibility explicitly makes inter-module dependencies visible in code and keeps boundaries intact as apps grow. Ubiquitous config or database modules can be marked @Global(), but overuse hides dependencies and is discouraged. Modules importing each other in a cycle can be untangled with forwardRef, though it usually signals that boundaries need redrawing.', sModule()),
    item('nest-controller', '컨트롤러와 라우팅', 'Controllers and routing', "@Controller('orders')와 @Get(':id') 같은 데코레이터로 경로와 HTTP 메서드를 선언해요. 핸들러가 반환한 값은 자동으로 JSON 응답이 돼요.", "@Controller('orders')는 클래스의 모든 라우트 앞에 /orders를 붙이고, @Get(':id'), @Post(), @Patch(':id'), @Delete(':id')가 메서드별 라우트를 만들어요. @Param, @Query, @Body, @Headers로 요청의 각 부분을 꺼내 인자로 받아요. 반환한 객체나 배열은 JSON으로 직렬화되고, Promise나 Observable도 기다려서 응답해요. 기본 상태 코드는 GET 200, POST 201이며 @HttpCode로 바꿔요. @Req()로 Express 요청 객체를 직접 받을 수도 있지만 플랫폼에 묶이므로 데코레이터를 우선해요. 컨트롤러는 HTTP 세부 사항만 다루고 비즈니스 로직은 주입받은 서비스에 맡기는 얇은 계층으로 유지해요.", "Decorators such as @Controller('orders') and @Get(':id') declare paths and HTTP methods, and whatever a handler returns becomes a JSON response automatically.", "@Controller('orders') prefixes every route in the class with /orders, while @Get(':id'), @Post(), @Patch(':id') and @Delete(':id') create per-method routes. @Param, @Query, @Body and @Headers pull parts of the request into arguments. Returned objects or arrays are serialized to JSON, and promises or observables are awaited. Default status codes are 200 for GET and 201 for POST, changed with @HttpCode. @Req() exposes the raw Express request, but it ties code to the platform, so decorators are preferred. Controllers stay thin, handling only HTTP details and delegating business logic to injected services.", sController()),
    item('nest-provider', '프로바이더와 의존성 주입', 'Providers and dependency injection', '@Injectable() 클래스는 Nest의 IoC 컨테이너가 만들어 생성자에 넣어 줘요. 직접 new 하지 않고 필요한 것을 생성자 타입으로 선언해요.', '서비스, 저장소, 헬퍼처럼 주입 가능한 모든 것이 프로바이더예요. 모듈의 providers에 등록하면 컨테이너가 생성자 매개변수의 타입을 TypeScript 메타데이터(emitDecoratorMetadata)로 읽어 필요한 의존성을 먼저 만들고 주입해요. 기본 범위가 싱글턴이라 앱 전체에서 한 인스턴스를 공유하고, 앱 시작 때 한 번만 만들어져요. 클래스가 의존성을 직접 만들지 않으니 결합도가 낮고, 테스트에서는 저장소를 가짜로 바꿔 끼우기 쉬워요. 인터페이스는 런타임에 사라지므로 인터페이스 타입으로 주입하려면 토큰과 @Inject를 써요. 의존성이 순환하면 forwardRef로 미룰 수 있지만, 공통 부분을 새 프로바이더로 떼어내는 편이 좋아요.', 'Nest’s IoC container builds @Injectable() classes and passes them into constructors, so you declare needs as constructor types instead of calling new.', 'Anything injectable, such as services, repositories and helpers, is a provider. Once registered in a module’s providers, the container reads constructor parameter types from TypeScript metadata (emitDecoratorMetadata), builds dependencies first and injects them. The default scope is singleton, so one instance is created at startup and shared app-wide. Because classes never construct their own dependencies, coupling stays low and tests can swap a repository for a fake. Interfaces vanish at run time, so injecting by interface requires a token with @Inject. Circular dependencies can be deferred with forwardRef, but extracting the shared part into a new provider is usually better.', sProvider()),
    item('nest-custom-provider', '커스텀 프로바이더', 'Custom providers', '프로바이더는 “토큰 → 만드는 방법”의 짝이에요. useValue, useClass, useFactory, useExisting으로 무엇을 어떻게 주입할지 직접 정해요.', 'providers: [OrdersService]는 사실 { provide: OrdersService, useClass: OrdersService }의 줄임이에요. useValue는 설정 객체나 테스트용 목을 그대로 등록하고, useClass는 토큰은 유지하면서 환경에 따라 RedisCache와 MemoryCache처럼 구현을 바꿔요. useFactory는 inject로 받은 ConfigService 같은 의존성으로 값을 만들고, async 팩토리면 DB 연결처럼 준비가 끝날 때까지 앱 시작을 기다려요. useExisting은 기존 프로바이더에 다른 토큰으로 별칭을 붙여요. 클래스가 아닌 토큰은 @Inject(API_KEY)로 주입받으며, 오타를 막기 위해 문자열보다 Symbol이나 상수를 써요. 동적 모듈과 테스트 코드의 대부분이 이 문법으로 이뤄져요.', 'A provider pairs a token with a recipe, and useValue, useClass, useFactory and useExisting decide what gets injected and how.', 'providers: [OrdersService] is shorthand for { provide: OrdersService, useClass: OrdersService }. useValue registers a config object or test mock as is, and useClass keeps the token while swapping implementations per environment, such as RedisCache versus MemoryCache. useFactory builds a value from dependencies listed in inject, such as ConfigService, and an async factory delays startup until it resolves, as with a database connection. useExisting aliases an existing provider under another token. Non-class tokens are injected with @Inject(API_KEY), using Symbols or constants rather than strings to avoid typos. Most dynamic modules and test code are built from this syntax.', sCustomProvider()),
    item('nest-scope', '주입 범위', 'Injection scopes', '프로바이더의 수명은 DEFAULT(싱글턴), REQUEST(요청마다), TRANSIENT(소비자마다) 중 하나예요. REQUEST 범위는 주입받는 쪽으로 번져 성능에 영향을 줘요.', '기본 싱글턴은 앱 시작 때 한 번 만들어 모든 요청이 공유하므로 가장 빠르고 대부분의 경우에 맞아요. Scope.REQUEST는 요청이 올 때마다 새 인스턴스를 만들고 @Inject(REQUEST)로 요청 객체를 받을 수 있어 요청별 테넌트나 사용자 정보를 다룰 때 써요. Scope.TRANSIENT는 주입받는 클래스마다 별도 인스턴스를 줘서 로거처럼 소비자별 상태가 필요할 때 써요. REQUEST 범위 프로바이더를 주입받는 컨트롤러와 서비스도 자동으로 요청 범위가 되어, 체인 전체가 매 요청 새로 만들어지는 비용이 생겨요. 싱글턴 필드에 요청별 값을 저장하면 동시 요청끼리 섞이는 버그가 나니 피해야 해요. 요청 문맥 전달만 필요하면 AsyncLocalStorage 기반 nestjs-cls 같은 방식이 더 가벼워요.', 'A provider lives as DEFAULT (singleton), REQUEST (per request) or TRANSIENT (per consumer), and REQUEST scope bubbles up to consumers, affecting performance.', 'The default singleton is built once at startup and shared by every request, the fastest choice and right for most cases. Scope.REQUEST builds a new instance per request and can inject the request via @Inject(REQUEST), useful for per-request tenant or user data. Scope.TRANSIENT gives each injecting class its own instance, for consumer-specific state such as loggers. Controllers and services that inject a REQUEST-scoped provider become request-scoped too, so the whole chain is rebuilt on every request. Storing per-request values in singleton fields mixes data between concurrent requests and must be avoided. When only request context needs to travel, AsyncLocalStorage-based tools such as nestjs-cls are lighter.', sScope()),
    item('nest-bootstrap', '부트스트랩과 수명 주기 훅', 'Bootstrap and lifecycle hooks', 'main.ts의 NestFactory.create가 모듈을 훑어 의존성 그래프를 만들고, onModuleInit 같은 훅을 거쳐 listen으로 요청을 받기 시작해요. 종료 때는 정리 훅이 돌아요.', 'NestFactory.create(AppModule)는 루트부터 모든 모듈을 스캔해 프로바이더를 만들고 연결해요. 그다음 onModuleInit(각 모듈 의존성이 준비된 뒤)과 onApplicationBootstrap(모든 모듈 초기화 뒤) 훅이 실행되어 DB 연결이나 캐시 예열 같은 준비를 해요. 초기화가 끝나야 app.listen이 포트를 열어 요청을 받아요. app.enableShutdownHooks()를 켜면 SIGTERM 같은 신호에 onModuleDestroy, beforeApplicationShutdown, onApplicationShutdown이 차례로 실행돼 연결을 깔끔히 닫아요. 컨테이너 환경에서 무중단 배포를 하려면 이 종료 처리가 중요해요. HTTP 계층은 기본 Express 어댑터 대신 Fastify 어댑터로 바꿀 수 있고, Nest 12부터 훅은 컴포넌트 계층 순서로 호출돼요.', 'NestFactory.create in main.ts scans modules and builds the dependency graph, runs hooks such as onModuleInit, and starts accepting requests with listen; shutdown hooks run on exit.', 'NestFactory.create(AppModule) scans every module from the root, then builds and wires providers. Next, onModuleInit (after a module’s dependencies are ready) and onApplicationBootstrap (after all modules initialize) run setup such as database connections or cache warming. Only after initialization does app.listen open the port. With app.enableShutdownHooks(), signals such as SIGTERM trigger onModuleDestroy, beforeApplicationShutdown and onApplicationShutdown in turn to close connections cleanly. This shutdown handling matters for zero-downtime deploys in containers. The HTTP layer can switch from the default Express adapter to Fastify, and since Nest 12 hooks run in component hierarchy order.', sBootstrap()),
    item('nest-dynamic-module', '동적 모듈', 'Dynamic modules', 'forRoot·forFeature처럼 설정을 받아 프로바이더를 만들어 주는 모듈이에요. 데이터베이스, 설정, 메일 같은 재사용 라이브러리 모듈의 표준 형태예요.', '일반 모듈은 내용이 고정이지만, 동적 모듈은 정적 메서드가 옵션을 받아 { module, providers, exports }로 이뤄진 DynamicModule을 돌려줘요. forRoot는 루트 모듈에서 한 번 호출해 DB 연결 같은 전역 설정을 하고, forFeature는 기능 모듈마다 필요한 엔티티나 저장소만 등록해요. 설정값이 다른 프로바이더에서 와야 하면 forRootAsync({ useFactory, inject: [ConfigService] })를 써요. 쓰는 곳마다 설정이 달라야 하면 register라는 이름을 관례로 써요. isGlobal 옵션은 모든 모듈에서 import 없이 쓰게 해 줘요. 직접 만들 때는 ConfigurableModuleBuilder가 forRoot/forRootAsync 보일러플레이트를 생성해 줘요.', 'Dynamic modules such as forRoot and forFeature take options and build providers, the standard shape of reusable library modules for databases, config and mail.', 'A regular module’s contents are fixed, but a dynamic module’s static method takes options and returns a DynamicModule of { module, providers, exports }. forRoot is called once in the root module for global setup such as a database connection, while forFeature registers only the entities or repositories each feature module needs. When options come from another provider, use forRootAsync({ useFactory, inject: [ConfigService] }). register is the conventional name when each consumer needs different options. The isGlobal option makes a module available everywhere without imports. When writing your own, ConfigurableModuleBuilder generates the forRoot and forRootAsync boilerplate.', sDynamicModule())
  ]),
  sec('nest-pipeline', '요청 파이프라인', 'Request pipeline', '요청이 지나는 단계들', 'The stages a request passes through', '미들웨어, 가드, 인터셉터, 파이프, 예외 필터가 어떤 순서로 실행되고 각각 무엇을 맡는지, 그리고 커스텀 데코레이터예요.', 'The order in which middleware, guards, interceptors, pipes and exception filters run, what each is for, and custom decorators.', [
    item('nest-lifecycle', '요청 수명 주기', 'The request lifecycle', '요청은 미들웨어 → 가드 → 인터셉터 → 파이프 → 핸들러 → 인터셉터 순으로 흐르고, 예외가 나면 필터가 응답으로 바꿔요.', '미들웨어는 라우팅 전에 원시 요청을 다루고, 가드는 핸들러에 닿을지 여부를 결정해요. 인터셉터의 앞부분이 실행된 뒤 파이프가 인자를 검증·변환하고, 핸들러가 실행되면 인터셉터의 뒷부분이 응답을 가공해요. 어느 단계에서든 예외가 던져지면 예외 필터가 받아 HTTP 응답으로 바꿔요. 가드·인터셉터·파이프·필터는 전역(app.useGlobal* 또는 APP_* 토큰), 컨트롤러, 메서드 수준으로 걸 수 있고, 전역 → 컨트롤러 → 메서드 순서로 실행돼요(필터는 가까운 쪽이 먼저 잡아요). 인증은 가드, 로깅·캐시는 인터셉터, 입력 검증은 파이프, 오류 형식은 필터처럼 역할에 맞는 단계를 고르는 것이 Nest 설계의 핵심이에요. 이 구조가 Express 미들웨어 하나에 모든 걸 넣는 방식과의 가장 큰 차이예요.', 'Requests flow through middleware, guards, interceptors, pipes, the handler and interceptors again, and filters turn exceptions into responses.', 'Middleware handles the raw request before routing, and guards decide whether the handler may run. The first half of interceptors runs, pipes validate and transform arguments, the handler executes, and the second half of interceptors shapes the response. An exception at any stage is caught by exception filters and converted into an HTTP response. Guards, interceptors, pipes and filters bind globally (app.useGlobal* or APP_* tokens), per controller or per method, running global, then controller, then method (filters catch closest first). Choosing the right stage, guards for auth, interceptors for logging and caching, pipes for input validation and filters for error formats, is the heart of Nest design. This structure is the biggest difference from cramming everything into Express middleware.', sLifecycle()),
    item('nest-middleware', '미들웨어', 'Middleware', '라우팅 전에 (req, res, next)로 요청을 다루는 단계예요. 로깅, 요청 ID, 보안 헤더에 알맞고 next()를 불러야 다음으로 넘어가요.', 'NestMiddleware를 구현한 클래스나 일반 함수로 만들고, 모듈의 configure(consumer)에서 consumer.apply(LoggerMw).forRoutes(\'orders\')처럼 경로를 지정해요. exclude로 특정 경로를 빼고, 전역은 main.ts에서 app.use()로 등록해요. Express 생태계의 cors, helmet, compression 같은 미들웨어를 그대로 쓸 수 있어요. next()를 부르지 않으면 요청이 다음 단계로 넘어가지 않고 멈춰요. 미들웨어는 어떤 컨트롤러 메서드가 실행될지 모르기 때문에 핸들러 메타데이터가 필요한 인증·권한 판단은 가드에서 해야 해요. Fastify 어댑터에서는 req·res 객체의 모양이 Express와 달라 주의해요.', 'Middleware handles requests as (req, res, next) before routing, suits logging, request IDs and security headers, and must call next() to continue.', "Write it as a class implementing NestMiddleware or a plain function, and pick routes in a module’s configure(consumer), as in consumer.apply(LoggerMw).forRoutes('orders'). exclude skips specific paths, and global middleware is registered in main.ts with app.use(). Express ecosystem middleware such as cors, helmet and compression works as is. Without a call to next(), the request never moves on and hangs. Middleware cannot see which controller method will run, so authorization decisions needing handler metadata belong in guards. Under the Fastify adapter, req and res differ in shape from Express.", sMiddleware()),
    item('nest-guards', '가드', 'Guards', '가드는 CanActivate를 구현해 요청이 핸들러에 닿을지 true/false로 결정해요. 인증과 권한 검사의 자리이고 false면 403이에요.', 'canActivate(ctx: ExecutionContext)는 요청 객체뿐 아니라 곧 실행될 핸들러와 컨트롤러 클래스 정보도 받아서, Reflector로 @Roles 같은 메타데이터를 읽을 수 있어요. true나 true로 끝나는 Promise·Observable을 돌려주면 통과하고, false면 Nest가 ForbiddenException(403)을 던져요. 401을 원하면 UnauthorizedException을 직접 던져요. @UseGuards로 메서드나 컨트롤러에 걸고, { provide: APP_GUARD, useClass: AuthGuard }로 전역에 걸면 모든 라우트가 기본으로 보호돼요. 이때 로그인처럼 열어 둘 경로는 @Public() 메타데이터를 달고 가드가 확인해 통과시켜요. 미들웨어 다음, 인터셉터와 파이프보다 먼저 실행돼서 권한 없는 요청에 불필요한 검증 비용이 들지 않아요.', 'Guards implement CanActivate and decide with true or false whether a request reaches its handler; they host authentication and authorization, and false means 403.', 'canActivate(ctx: ExecutionContext) receives not only the request but the target handler and controller class, so Reflector can read metadata such as @Roles. Returning true, or a promise or observable resolving to true, lets the request pass, while false makes Nest throw ForbiddenException (403). For a 401, throw UnauthorizedException yourself. @UseGuards binds a guard to methods or controllers, and { provide: APP_GUARD, useClass: AuthGuard } protects every route by default. Routes that must stay open, such as login, carry @Public() metadata that the guard checks. Guards run after middleware and before interceptors and pipes, so unauthorized requests never pay for validation.', sGuards()),
    item('nest-interceptors', '인터셉터', 'Interceptors', '인터셉터는 핸들러를 앞뒤로 감싸 공통 로직을 끼워 넣어요. next.handle()이 돌려주는 Observable에 RxJS 연산자로 응답을 바꾸거나 시간을 재요.', 'intercept(ctx, next) 안에서 next.handle()을 부르기 전의 코드는 핸들러보다 먼저 실행되고, 반환된 Observable에 pipe(map, tap, catchError, timeout)를 붙여 뒤처리를 해요. 응답을 { data } 형태로 통일하거나, 걸린 시간을 기록하거나, 예외를 다른 예외로 바꾸거나, 일정 시간 넘게 걸리면 끊는 데 써요. handle()을 부르지 않고 캐시된 값을 of()로 바로 돌려주면 핸들러 자체를 건너뛸 수 있어 캐시 인터셉터가 이렇게 동작해요. 관점 지향 프로그래밍(AOP)처럼 여러 핸들러에 걸친 관심사를 한곳에 모으는 도구예요. ClassSerializerInterceptor, CacheInterceptor가 대표적인 내장 인터셉터예요. @UseInterceptors나 APP_INTERCEPTOR로 등록해요.', 'Interceptors wrap handlers on both sides to insert shared logic, transforming responses or timing them with RxJS operators on the Observable from next.handle().', 'Inside intercept(ctx, next), code before next.handle() runs ahead of the handler, and pipe(map, tap, catchError, timeout) on the returned Observable handles the aftermath. Typical uses are wrapping responses as { data }, logging elapsed time, mapping exceptions, or cutting off slow calls. Returning a cached value with of() without calling handle() skips the handler entirely, which is how cache interceptors work. Like aspect-oriented programming (AOP), they gather cross-cutting concerns in one place. ClassSerializerInterceptor and CacheInterceptor are typical built-ins. Register them with @UseInterceptors or APP_INTERCEPTOR.', sInterceptors()),
    item('nest-pipes', '파이프', 'Pipes', '파이프는 핸들러에 들어가기 직전의 인자를 변환하거나 검증해요. ParseIntPipe는 "42"를 42로 바꾸고, 바꿀 수 없으면 400을 돌려줘요.', '경로와 쿼리 값은 항상 문자열이라 @Param(\'id\', ParseIntPipe)처럼 파이프로 숫자로 바꿔 받아요. 변환이나 검증에 실패하면 핸들러는 실행되지 않고 400 Bad Request가 돌아가요. ParseUUIDPipe, ParseBoolPipe, ParseArrayPipe, ParseEnumPipe, ParseDatePipe 같은 내장 파이프가 있고, DefaultValuePipe처럼 앞에 두어 기본값을 채우는 것도 있어요. 여러 파이프를 나열하면 왼쪽부터 차례로 적용돼요. PipeTransform의 transform(value, metadata) 하나만 구현하면 공백 제거, 슬러그 변환 같은 파이프를 직접 만들 수 있어요. DTO 객체 전체 검증은 ValidationPipe가 맡고, 전역으로 거는 경우가 많아요.', 'Pipes transform or validate arguments right before the handler; ParseIntPipe turns "42" into 42 and returns 400 when it cannot.', "Path and query values are always strings, so pipes convert them, as in @Param('id', ParseIntPipe). If transformation or validation fails, the handler never runs and a 400 Bad Request returns. Built-ins include ParseUUIDPipe, ParseBoolPipe, ParseArrayPipe, ParseEnumPipe and ParseDatePipe, plus DefaultValuePipe placed first to fill defaults. Listed pipes apply left to right. Implementing PipeTransform’s single transform(value, metadata) method creates pipes such as trimming or slug conversion. Whole-DTO validation is ValidationPipe’s job, often applied globally.", sPipes()),
    item('nest-filters', '예외 필터', 'Exception filters', 'NotFoundException처럼 던진 예외를 필터가 받아 HTTP 응답으로 바꿔요. @Catch로 특정 예외를 골라 원하는 형식의 오류 응답을 만들어요.', 'BadRequestException(400), UnauthorizedException(401), ForbiddenException(403), NotFoundException(404), ConflictException(409) 같은 내장 HTTP 예외를 던지면 기본 필터가 { statusCode, message, error } 형태의 JSON으로 응답해요. HttpException이 아닌 알 수 없는 에러는 500 Internal server error로 바뀌어 스택 같은 내부 정보가 새지 않아요. @Catch(QueryFailedError) 같은 커스텀 필터는 ArgumentsHost에서 응답 객체를 꺼내 중복 키를 409로 바꾸는 식으로 도메인·DB 예외를 HTTP 의미로 번역해요. APP_FILTER로 전역 등록하면 앱 전체의 오류 형식이 통일되고, 로깅이나 오류 추적 도구 전송도 여기서 해요. Nest 12부터 HttpExceptionOptions에 errorCode를 넣어 클라이언트가 구분할 수 있는 오류 코드를 줄 수 있어요. 서비스는 HTTP를 모르는 도메인 예외를 던지고 필터가 번역하게 하면 계층이 깔끔해져요.', 'Filters catch thrown exceptions such as NotFoundException and turn them into HTTP responses, and @Catch picks specific exceptions to shape custom error replies.', 'Throwing built-in HTTP exceptions such as BadRequestException (400), UnauthorizedException (401), ForbiddenException (403), NotFoundException (404) and ConflictException (409) makes the default filter answer with JSON shaped like { statusCode, message, error }. Unknown errors that are not HttpExceptions become 500 Internal server error, keeping stack traces private. Custom filters such as @Catch(QueryFailedError) take the response from ArgumentsHost and translate domain or database errors into HTTP meaning, such as duplicate keys into 409. Registering with APP_FILTER unifies error formats app-wide, and it is also where errors get logged or sent to tracking tools. Since Nest 12, HttpExceptionOptions can carry an errorCode that clients can distinguish. Letting services throw HTTP-agnostic domain errors that filters translate keeps layers clean.', sFilters()),
    item('nest-custom-decorator', '커스텀 데코레이터', 'Custom decorators', 'createParamDecorator로 @User() 같은 매개변수 데코레이터를, applyDecorators로 여러 데코레이터를 묶은 @Auth()를 만들어요.', '인증 가드가 req.user에 넣은 사용자 정보를 핸들러마다 @Req()로 꺼내는 대신, createParamDecorator((data, ctx) => …)로 @User()를 만들면 me(@User() user)처럼 선언적으로 받아요. @User(\'email\')처럼 넘긴 data로 특정 필드만 꺼낼 수 있고, 파이프도 함께 적용돼요. SetMetadata나 Reflector.createDecorator로 만든 데코레이터는 핸들러에 메타데이터만 붙이고, 그 값을 읽어 판단하는 쪽은 가드나 인터셉터예요. applyDecorators(Roles(r), UseGuards(JwtGuard, RolesGuard))처럼 자주 함께 쓰는 데코레이터를 하나로 묶으면 실수가 줄어요. 데코레이터는 Nest 코드를 선언적으로 만드는 핵심 도구예요. 남용하면 흐름이 숨겨지니 이름을 의미 있게 지어요.', 'createParamDecorator builds parameter decorators such as @User(), and applyDecorators bundles several decorators into one, such as @Auth().', "Instead of pulling req.user, set by the auth guard, out of @Req() in every handler, createParamDecorator((data, ctx) => …) creates @User() so handlers declare me(@User() user). Passing data, as in @User('email'), extracts a single field, and pipes still apply. Decorators made with SetMetadata or Reflector.createDecorator only attach metadata to handlers; guards or interceptors read it and decide. Bundling decorators used together, as in applyDecorators(Roles(r), UseGuards(JwtGuard, RolesGuard)), reduces mistakes. Decorators are the key tool that makes Nest code declarative. Overuse hides control flow, so give them meaningful names.", sParamDecorator())
  ]),
  sec('nest-data', '데이터', 'Data', '검증, 설정, 데이터베이스', 'Validation, configuration and databases', 'DTO와 Standard Schema로 입력을 검증하고, 설정을 관리하고, TypeORM·Prisma로 DB를 다루고, 응답 직렬화와 캐싱까지예요.', 'Validating input with DTOs and Standard Schema, managing configuration, working with databases through TypeORM and Prisma, plus response serialization and caching.', [
    item('nest-dto', 'DTO와 ValidationPipe', 'DTOs and ValidationPipe', 'DTO 클래스에 class-validator 데코레이터로 규칙을 달고 ValidationPipe를 걸면, 잘못된 요청은 핸들러 전에 400으로 걸러져요.', 'CreateUserDto의 email에 @IsEmail(), name에 @Length(2, 20)처럼 규칙을 달면 DTO가 “들어올 데이터의 계약”이 돼요. app.useGlobalPipes(new ValidationPipe(...))로 전역에 걸면 규칙을 어긴 요청은 필드별 오류 메시지와 함께 400으로 돌아가요. whitelist: true는 DTO에 없는 필드를 지워서 role: "admin" 같은 값을 몰래 넣는 대량 할당 공격을 막고, forbidNonWhitelisted는 아예 거부해요. transform: true는 일반 객체를 DTO 인스턴스로 바꾸고 "30" 같은 문자열을 선언된 number로 변환해요. 중첩 객체는 @ValidateNested와 @Type(() => Address)로 검증해요. @nestjs/mapped-types의 PartialType, PickType, OmitType으로 수정용 DTO를 파생시켜 중복을 줄여요.', 'Adding class-validator rules to DTO classes and applying ValidationPipe filters invalid requests out with a 400 before the handler runs.', 'Rules such as @IsEmail() on email and @Length(2, 20) on name turn CreateUserDto into the contract for incoming data. With app.useGlobalPipes(new ValidationPipe(...)), invalid requests return 400 with per-field messages. whitelist: true strips fields absent from the DTO, blocking mass-assignment attacks that smuggle values such as role: "admin", and forbidNonWhitelisted rejects them outright. transform: true turns plain objects into DTO instances and converts strings such as "30" into declared numbers. Nested objects are validated with @ValidateNested and @Type(() => Address). PartialType, PickType and OmitType from @nestjs/mapped-types derive update DTOs and cut duplication.', sDto()),
    item('nest-standard-schema', 'Standard Schema 검증', 'Standard Schema validation', 'Nest 12부터 @Body, @Query, @Param에 Zod·Valibot·ArkType 스키마를 schema 옵션으로 넘겨 검증해요. 스키마 하나로 타입과 런타임 검증을 함께 얻어요.', 'Standard Schema는 여러 검증 라이브러리가 함께 구현하는 공통 인터페이스(~standard 속성)라서, Nest는 특정 라이브러리에 묶이지 않고 어떤 스키마든 받아요. const CreateUser = z.object({...})를 정의하고 z.infer로 타입을 뽑으면 DTO 클래스 없이도 타입과 검증 규칙이 한곳에 있어요. @Body({ schema: CreateUser })는 스키마를 메타데이터로 붙이기만 하고, 실제 검증은 app.useGlobalPipes(new StandardSchemaValidationPipe())로 등록한 파이프가 해요. 응답 쪽도 StandardSchemaSerializerInterceptor와 @SerializeOptions({ schema })로 스키마에 맞춰 내보낼 수 있어요. @nestjs/config의 validationSchema도 같은 스키마를 받아 환경 변수 검증을 통일할 수 있어요. 기존 class-validator 방식은 계속 지원되므로 프로젝트 상황에 맞게 고르면 돼요.', 'Since Nest 12, @Body, @Query and @Param accept Zod, Valibot or ArkType schemas through a schema option, so one schema provides both the type and runtime validation.', 'Standard Schema is a shared interface (the ~standard property) implemented by many validation libraries, so Nest accepts any schema without tying itself to one library. Defining const CreateUser = z.object({...}) and deriving its type with z.infer keeps types and rules together without a DTO class. @Body({ schema: CreateUser }) only attaches the schema as metadata; a pipe registered with app.useGlobalPipes(new StandardSchemaValidationPipe()) performs the validation. On the way out, StandardSchemaSerializerInterceptor with @SerializeOptions({ schema }) shapes responses by schema. @nestjs/config’s validationSchema accepts the same schemas, unifying environment validation. The class-validator workflow remains supported, so choose whichever fits the project.', sStdSchema()),
    item('nest-config', '설정 관리', 'Configuration', 'ConfigModule이 .env와 환경 변수를 모아 검증하고, ConfigService를 주입받아 타입 있게 읽어요. 잘못된 설정은 앱 시작 때 바로 실패해요.', "ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] })는 여러 파일과 process.env를 읽고, 목록 앞쪽 파일이 우선해요. validationSchema로 필수 값과 형식을 검사하면 DATABASE_URL이 빠진 채 배포됐을 때 요청 처리 중이 아니라 시작 단계에서 실패해 원인을 바로 알 수 있어요. 서비스에서는 ConfigService를 주입받아 getOrThrow('DB_URL')처럼 읽어서 값이 없을 때 undefined가 조용히 퍼지지 않게 해요. registerAs('db', () => ({...}))로 주제별 설정 묶음을 만들어 필요한 모듈에만 주입하고, forRootAsync의 팩토리에서 쓰기도 해요. 비밀번호와 API 키는 저장소에 커밋하지 않고 배포 환경의 시크릿으로 주입하는 12-Factor 원칙을 따라요. 테스트에서는 ConfigService를 가짜 값으로 바꿔 끼워요.", 'ConfigModule gathers and validates .env files and environment variables, ConfigService is injected to read them with types, and bad config fails at startup.', "ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }) reads several files plus process.env, with earlier files taking priority. With validationSchema checking required values and formats, a deploy missing DATABASE_URL fails at startup rather than mid-request, making the cause obvious. Services inject ConfigService and read values with getOrThrow('DB_URL') so undefined never spreads silently. registerAs('db', () => ({...})) builds topic-based groups injected only where needed, often inside forRootAsync factories. Following 12-factor principles, passwords and API keys are never committed but injected as deployment secrets. Tests swap ConfigService for fake values.", sConfigNest()),
    item('nest-typeorm', 'TypeORM 연동', 'TypeORM integration', '@Entity 클래스가 테이블, @Column이 컬럼이 되고, @InjectRepository로 주입받은 Repository로 SQL 없이 조회·저장해요.', 'TypeOrmModule.forRoot(또는 forRootAsync)로 DB 연결을 설정하고, 기능 모듈에서 forFeature([User])로 엔티티를 등록하면 Repository<User>를 주입받아 find, findOne, save, delete를 써요. @OneToMany, @ManyToOne, @ManyToMany로 관계를 선언하면 외래 키와 조인을 TypeORM이 처리하고, find({ relations: [\'orders\'] })나 QueryBuilder로 함께 읽어요. 목록을 돌며 관계를 하나씩 읽으면 N+1 쿼리가 생기니 relations나 join으로 한 번에 가져와요. synchronize: true는 개발 중 스키마를 자동으로 맞춰 편하지만 운영에서는 데이터 손실 위험이 있어 마이그레이션으로 변경 이력을 관리해요. 여러 쓰기를 하나로 묶을 땐 dataSource.transaction()을 써요. MikroORM이나 Drizzle 같은 다른 ORM도 Nest와 함께 많이 쓰여요.', '@Entity classes become tables and @Column fields columns, and a Repository injected with @InjectRepository queries and saves without SQL.', "TypeOrmModule.forRoot (or forRootAsync) configures the connection, and forFeature([User]) in a feature module registers entities so Repository<User> can be injected for find, findOne, save and delete. Declaring relations with @OneToMany, @ManyToOne and @ManyToMany lets TypeORM handle foreign keys and joins, read together via find({ relations: ['orders'] }) or the QueryBuilder. Loading relations one by one in a loop causes N+1 queries, so fetch them at once with relations or joins. synchronize: true conveniently syncs schemas in development but risks data loss in production, where migrations track changes. Group multiple writes with dataSource.transaction(). Other ORMs such as MikroORM and Drizzle are also popular with Nest.", sTypeorm()),
    item('nest-prisma', 'Prisma 연동', 'Prisma integration', 'schema.prisma에 모델을 적고 prisma generate로 타입 있는 클라이언트를 만든 뒤, PrismaService로 감싸 Nest 어디서든 주입해요.', 'Prisma는 데코레이터 대신 schema.prisma라는 별도 스키마 파일을 단일 출처로 써요. prisma generate가 이 스키마로 타입 있는 클라이언트를 만들고, findMany({ include: { posts: true } })처럼 쓰면 반환 타입에 posts까지 정확히 들어가 자동 완성과 타입 검사가 돼요. Nest에서는 PrismaClient를 상속한 PrismaService를 만들고 onModuleInit에서 연결한 뒤 모듈에 등록해 주입해요. 스키마를 고친 뒤 prisma migrate dev를 실행하면 SQL 마이그레이션 파일이 생기고 DB에 적용되며, 운영에서는 prisma migrate deploy로 적용해요. 여러 쓰기는 $transaction으로 묶어 원자적으로 처리해요. TypeORM보다 타입 추론이 강하지만 복잡한 쿼리는 $queryRaw로 SQL을 쓰기도 해요.', 'Prisma models live in schema.prisma, prisma generate builds a typed client, and a PrismaService wrapper makes it injectable anywhere in Nest.', 'Instead of decorators, Prisma uses a separate schema file, schema.prisma, as the single source of truth. prisma generate builds a typed client from it, and a call such as findMany({ include: { posts: true } }) returns a type that includes posts exactly, enabling autocomplete and type checks. In Nest, a PrismaService extends PrismaClient, connects in onModuleInit and is registered in a module for injection. After schema edits, prisma migrate dev creates and applies a SQL migration, and production applies them with prisma migrate deploy. Multiple writes are grouped atomically with $transaction. It infers types more strongly than TypeORM, while complex queries can drop to SQL through $queryRaw.', sPrisma()),
    item('nest-serialization', '응답 직렬화', 'Response serialization', 'ClassSerializerInterceptor와 @Exclude·@Expose로 응답 직전에 password 같은 민감한 필드를 빼고 계산된 값을 더해요.', 'DB에서 읽은 사용자 객체를 그대로 돌려주면 비밀번호 해시 같은 필드까지 응답에 실릴 수 있어요. 엔티티나 응답 클래스의 password에 @Exclude()를 달고 ClassSerializerInterceptor를 걸면 응답 직전에 class-transformer의 instanceToPlain으로 변환되며 그 필드가 빠져요. @Expose()를 단 getter는 fullName 같은 계산된 값을 응답에 더해요. 이 규칙은 클래스 인스턴스에만 적용되므로 일반 객체라면 new UserEntity(data)로 감싸서 돌려줘야 해요. @SerializeOptions({ groups: [\'admin\'] })로 역할에 따라 노출 필드를 바꿀 수도 있어요. 엔티티와 분리된 응답 전용 DTO를 두는 방식도 많이 쓰이고, Nest 12에서는 Standard Schema 기반 직렬화도 가능해요.', 'ClassSerializerInterceptor with @Exclude and @Expose drops sensitive fields such as password and adds computed values right before responding.', "Returning a user object straight from the database can leak fields such as the password hash. Marking password with @Exclude() on the entity or response class and applying ClassSerializerInterceptor converts results with class-transformer’s instanceToPlain right before responding, dropping that field. Getters marked @Expose() add computed values such as fullName. The rules apply only to class instances, so plain objects must be wrapped as new UserEntity(data). @SerializeOptions({ groups: ['admin'] }) varies exposed fields by role. Dedicated response DTOs separate from entities are a common alternative, and Nest 12 also offers Standard Schema-based serialization.", sSerialization()),
    item('nest-cache', '캐싱', 'Caching', 'CacheModule과 CacheInterceptor로 GET 응답을 자동 캐시하거나, CACHE_MANAGER로 get·set·del을 직접 다뤄요. 데이터가 바뀌면 캐시도 지워야 해요.', '@nestjs/cache-manager의 CacheModule.register({ ttl })는 기본으로 메모리 캐시를 쓰고, 서버가 여러 대면 Redis 같은 공유 저장소를 연결해요. CacheInterceptor를 걸면 GET 응답이 URL을 키로 저장돼 같은 요청은 DB를 거치지 않고, @CacheTTL과 @CacheKey로 엔드포인트별로 조정해요. 직접 제어할 때는 CACHE_MANAGER를 주입받아 “캐시에 있으면 반환, 없으면 DB에서 읽고 저장”하는 캐시 어사이드 패턴을 구현해요. 데이터를 바꾸는 쓰기 뒤에는 del로 관련 키를 지워야 오래된 값이 나가지 않아요. 사용자별 데이터가 URL 키 자동 캐시에 섞이면 다른 사람에게 보일 수 있으니 주의해요. TTL은 밀리초 단위이고, 캐시 무효화는 키 설계부터 고민하는 게 좋아요.', 'CacheModule and CacheInterceptor cache GET responses automatically, CACHE_MANAGER exposes get, set and del directly, and caches must be cleared when data changes.', "@nestjs/cache-manager’s CacheModule.register({ ttl }) uses an in-memory cache by default, with a shared store such as Redis across servers. CacheInterceptor stores GET responses keyed by URL so repeat requests skip the database, tuned per endpoint with @CacheTTL and @CacheKey. For manual control, inject CACHE_MANAGER and implement cache-aside: return a hit, or read the database and store the result. After writes that change data, del the related keys or stale values will be served. Per-user data mixed into URL-keyed automatic caching can leak to other users, so be careful. TTLs are in milliseconds, and invalidation is best planned starting from key design.", sCacheNest())
  ]),
  sec('nest-security', '보안과 문서', 'Security & docs', '인증, 권한, 보안, API 문서', 'Authentication, authorization, hardening and API docs', 'JWT 인증 흐름과 역할 기반 접근 제어, 보안 헤더·CORS·속도 제한, 그리고 OpenAPI 문서 자동화예요.', 'The JWT authentication flow, role-based access control, security headers, CORS and rate limiting, and automated OpenAPI documentation.', [
    item('nest-auth-jwt', 'JWT 인증', 'JWT authentication', '로그인 때 사용자 ID를 담은 서명된 토큰을 발급하고, 이후 요청의 Bearer 토큰을 가드가 검증해 req.user를 채워요. 서버가 세션을 저장하지 않는 무상태 방식이에요.', '로그인 엔드포인트는 이메일과 비밀번호를 받아 저장된 bcrypt·argon2 해시와 비교하고, @nestjs/jwt의 JwtService.signAsync({ sub: user.id })로 토큰을 발급해요. 토큰은 header.payload.signature 구조이고, payload는 누구나 디코딩할 수 있으니 비밀 정보를 넣지 않아요. 클라이언트는 이후 Authorization: Bearer 헤더에 토큰을 실어 보내고, AuthGuard가 verifyAsync로 서명과 만료를 확인해 req.user에 담아요. 가드를 APP_GUARD로 전역에 걸고 로그인·회원가입만 @Public()으로 여는 방식이 안전한 기본값이에요. 액세스 토큰은 15분처럼 짧게 두고 리프레시 토큰으로 갱신하며, 브라우저에서는 httpOnly 쿠키에 두면 XSS 위험이 줄어요. @nestjs/passport의 JwtStrategy와 AuthGuard(\'jwt\')로도 같은 흐름을 만들 수 있어요.', 'A signed token carrying the user ID is issued at login, and a guard verifies the Bearer token on later requests to fill req.user, a stateless scheme with no server sessions.', "The login endpoint compares the email and password against a stored bcrypt or argon2 hash and issues a token with @nestjs/jwt’s JwtService.signAsync({ sub: user.id }). Tokens have a header.payload.signature structure, and since anyone can decode the payload, it must hold no secrets. Clients then send the token in an Authorization: Bearer header, and AuthGuard checks signature and expiry with verifyAsync before storing req.user. Applying the guard globally via APP_GUARD and opening only login and sign-up with @Public() is a safe default. Access tokens stay short-lived, around 15 minutes, renewed with refresh tokens, and storing them in httpOnly cookies in browsers reduces XSS risk. @nestjs/passport’s JwtStrategy with AuthGuard('jwt') builds the same flow.", sJwt()),
    item('nest-rbac', '역할 기반 접근 제어', 'Role-based access control', '@Roles(\'admin\')로 필요한 역할을 메타데이터로 붙이고, RolesGuard가 Reflector로 읽어 사용자 역할과 비교해요. 맞지 않으면 403이에요.', "SetMetadata('roles', r)나 Reflector.createDecorator로 만든 @Roles 데코레이터는 핸들러에 필요한 역할 정보만 붙여요. RolesGuard는 this.reflector.getAllAndOverride('roles', [ctx.getHandler(), ctx.getClass()])로 메서드와 클래스의 메타데이터를 읽고, 메서드 쪽 설정이 우선해요. 역할 지정이 없으면 통과시키고, 있으면 인증 가드가 넣어 둔 req.user.roles와 비교해 하나라도 맞으면 허용해요. 그래서 인증 가드가 먼저, 역할 가드가 다음 순서로 실행되게 등록해요. “자기 글만 수정” 같은 데이터 단위 규칙은 역할만으로 표현하기 어려워 CASL 같은 정책 기반 접근 제어를 함께 써요. 권한 검사는 UI에서 버튼을 숨기는 것과 별개로 서버에서 반드시 해야 해요.", "@Roles('admin') attaches required roles as metadata, and RolesGuard reads it with Reflector and compares it with the user’s roles, answering 403 on a mismatch.", "An @Roles decorator built with SetMetadata('roles', r) or Reflector.createDecorator only attaches required roles to the handler. RolesGuard reads method and class metadata with this.reflector.getAllAndOverride('roles', [ctx.getHandler(), ctx.getClass()]), the method taking priority. Without requirements it allows the request; otherwise it compares against req.user.roles set by the authentication guard and allows any match. So register the authentication guard to run first and the roles guard second. Data-level rules such as “edit only your own posts” are hard to express with roles alone, so policy-based access control such as CASL complements it. Authorization must be enforced on the server regardless of hidden buttons in the UI.", sRbac()),
    item('nest-hardening', '기본 보안 설정', 'Baseline hardening', 'helmet으로 보안 헤더를, enableCors로 허용 출처를, ThrottlerModule로 호출 횟수 제한을 걸어요. 앱 시작 때 켜 두는 기본 방어선이에요.', 'helmet()은 Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options 같은 응답 헤더를 한 번에 설정해 XSS와 클릭재킹 같은 공격면을 줄여요. app.enableCors({ origin: [...] })는 허용한 출처의 브라우저만 API를 호출하게 하고, 쿠키 인증이라면 credentials: true와 정확한 출처 지정이 필요해요(와일드카드 불가). @nestjs/throttler의 ThrottlerModule.forRoot([{ ttl: 60_000, limit: 10 }])와 전역 ThrottlerGuard는 한도를 넘는 요청에 429 Too Many Requests를 돌려줘 무차별 대입과 남용을 막아요. 헬스 체크는 @SkipThrottle로 빼고, 로그인처럼 민감한 경로는 @Throttle로 더 엄격하게 해요. 서버가 여러 대면 속도 제한 카운터를 Redis에 공유해야 정확해요. 여기에 입력 검증, 의존성 취약점 점검, 오류 메시지 최소화를 더하면 기본기가 갖춰져요.', 'helmet adds security headers, enableCors restricts origins and ThrottlerModule limits call rates, a baseline defense switched on at startup.', 'helmet() sets response headers such as Content-Security-Policy, Strict-Transport-Security and X-Content-Type-Options at once, shrinking the attack surface for XSS and clickjacking. app.enableCors({ origin: [...] }) lets only browsers from allowed origins call the API, and cookie-based auth needs credentials: true with exact origins (no wildcard). @nestjs/throttler’s ThrottlerModule.forRoot([{ ttl: 60_000, limit: 10 }]) with a global ThrottlerGuard answers excess requests with 429 Too Many Requests, curbing brute force and abuse. Health checks are exempted with @SkipThrottle, and sensitive routes such as login tightened with @Throttle. Across multiple servers, rate-limit counters must be shared in Redis to stay accurate. Add input validation, dependency vulnerability checks and minimal error messages for solid basics.', sHardening()),
    item('nest-openapi', 'OpenAPI 문서화', 'OpenAPI documentation', '@nestjs/swagger가 컨트롤러와 DTO의 데코레이터를 읽어 OpenAPI 명세를 만들고 /docs에 Swagger UI로 띄워요. 문서가 코드와 따로 놀지 않아요.', 'DocumentBuilder로 제목, 버전, addBearerAuth 같은 인증 방식을 정하고, SwaggerModule.createDocument가 라우트·매개변수·DTO 정보를 모아 openapi.json을 만들어요. SwaggerModule.setup(\'docs\', app, doc)로 브라우저에서 API를 보고 직접 호출해 볼 수 있어요. @ApiProperty, @ApiResponse, @ApiTags로 예시와 설명을 더하고, nest-cli.json에서 Swagger CLI 플러그인을 켜면 TypeScript 타입에서 상당 부분을 자동 추론해 데코레이터를 줄여요. 만들어진 명세로 openapi-typescript나 Orval 같은 도구가 프런트엔드 타입과 클라이언트 SDK를 생성해 API 변경이 화면 코드의 컴파일 오류로 드러나요. 운영 환경에서는 /docs를 끄거나 인증을 걸어 내부 정보 노출을 막아요. 문서를 코드에서 생성하니 손으로 쓴 문서처럼 낡지 않아요.', '@nestjs/swagger reads controller and DTO decorators to build an OpenAPI spec served as Swagger UI at /docs, so docs never drift from code.', "DocumentBuilder sets the title, version and auth schemes such as addBearerAuth, and SwaggerModule.createDocument gathers routes, parameters and DTOs into openapi.json. SwaggerModule.setup('docs', app, doc) lets people browse and call the API in a browser. @ApiProperty, @ApiResponse and @ApiTags add examples and descriptions, and enabling the Swagger CLI plugin in nest-cli.json infers much of it from TypeScript types, cutting decorators. Tools such as openapi-typescript or Orval generate frontend types and client SDKs from the spec, turning API changes into compile errors in UI code. In production, disable /docs or put it behind auth to avoid exposing internals. Because the docs come from code, they never go stale like hand-written ones.", sOpenApi())
  ]),
  sec('nest-arch', '아키텍처', 'Architecture', '테스트와 확장 아키텍처', 'Testing and scaling architecture', '테스트 전략, 마이크로서비스, GraphQL, WebSocket, 작업 큐, 스케줄과 이벤트, CQRS, 그리고 Nest 12의 변화예요.', 'Testing strategy, microservices, GraphQL, WebSockets, job queues, scheduling and events, CQRS, and what changed in Nest 12.', [
    item('nest-testing', '테스트', 'Testing', 'Test.createTestingModule로 필요한 프로바이더만 담은 모듈을 만들고 의존성을 가짜로 바꿔 단위 테스트를, 진짜 앱에 HTTP 요청을 보내 e2e 테스트를 해요.', '단위 테스트는 Test.createTestingModule({ providers: [OrdersService, { provide: Repo, useValue: fake }] })처럼 테스트 대상과 가짜 의존성만 담아 compile하고, mod.get(OrdersService)로 꺼내 로직을 검증해요. DB 대신 가짜를 쓰니 빠르고 매번 같은 결과가 나와요. e2e 테스트는 AppModule 전체로 앱을 만들어 init한 뒤 supertest의 request(app.getHttpServer()).get(\'/orders/1\').expect(200)처럼 실제 HTTP 흐름을 확인해, 파이프·가드·필터 설정까지 검증해요. 이때 외부 결제 API 같은 의존만 overrideProvider로 바꿔요. 실제 DB가 필요한 테스트는 Testcontainers로 컨테이너 DB를 띄우는 방식이 많아요. Nest 12의 ESM 새 프로젝트는 Vitest가 기본이고 CommonJS 프로젝트는 Jest를 계속 써요.', 'Test.createTestingModule builds a module with only the needed providers and fake dependencies for unit tests, while e2e tests send HTTP requests to the real app.', "Unit tests compile a module holding just the subject and fakes, as in Test.createTestingModule({ providers: [OrdersService, { provide: Repo, useValue: fake }] }), then fetch the service with mod.get(OrdersService) to verify logic. Fakes instead of a database keep tests fast and deterministic. E2e tests build and init the app from the full AppModule and check real HTTP flows with supertest, as in request(app.getHttpServer()).get('/orders/1').expect(200), covering pipe, guard and filter configuration. Only external dependencies such as payment APIs are replaced with overrideProvider. Tests needing a real database often start one in a container with Testcontainers. New ESM projects in Nest 12 default to Vitest, while CommonJS projects keep Jest.", sTesting()),
    item('nest-microservices', '마이크로서비스', 'Microservices', '서비스끼리 메시지로 통신해요. emit은 응답 없는 이벤트, send는 요청-응답이고, 받는 쪽은 @EventPattern과 @MessagePattern으로 구독해요.', '@nestjs/microservices는 TCP, Redis, NATS, MQTT, RabbitMQ, Kafka, gRPC 같은 전송 계층(transport)을 같은 프로그래밍 모델로 감싸요. ClientProxy의 emit(\'order.created\', order)은 이벤트를 던지고 끝나며 구독자가 몇이든 기다리지 않고, send(\'stock.check\', data)는 Observable로 응답을 받아 firstValueFrom으로 await해요. 받는 서비스는 @EventPattern과 @MessagePattern 핸들러로 메시지를 처리하고, @Payload와 @Ctx로 내용과 전송 정보를 꺼내요. 전송 계층을 바꿔도 핸들러 코드는 거의 그대로라 처음엔 TCP로 시작해 나중에 Kafka로 옮길 수도 있어요. 하나의 앱이 HTTP와 메시지 리스너를 함께 띄우는 하이브리드 앱도 가능해요. 네트워크 너머 호출은 실패할 수 있으니 타임아웃, 재시도, 멱등성을 함께 설계해요.', 'Services talk through messages: emit sends reply-less events, send is request-response, and receivers subscribe with @EventPattern and @MessagePattern.', "@nestjs/microservices wraps transports such as TCP, Redis, NATS, MQTT, RabbitMQ, Kafka and gRPC in one programming model. ClientProxy’s emit('order.created', order) fires an event without waiting for any subscribers, while send('stock.check', data) returns an Observable reply awaited via firstValueFrom. Receiving services handle messages with @EventPattern and @MessagePattern handlers, reading content and transport details with @Payload and @Ctx. Handler code barely changes across transports, so a system can start on TCP and move to Kafka later. A hybrid app can serve HTTP and message listeners together. Calls across the network can fail, so design timeouts, retries and idempotency alongside.", sMicro()),
    item('nest-graphql', 'GraphQL', 'GraphQL', '@ObjectType 클래스에서 스키마를 자동 생성하고, @Query·@Mutation·@ResolveField 리졸버로 클라이언트가 원하는 모양의 응답을 조립해요.', '@nestjs/graphql의 코드 우선 방식은 @ObjectType과 @Field를 단 클래스에서 GraphQL 스키마 파일을 만들어, 타입을 한 번만 정의하게 해요. @Resolver 클래스의 @Query는 조회 진입점, @Mutation은 변경 진입점이고, 클라이언트는 필요한 필드만 골라 요청해 과하거나 모자란 응답이 없어요. @ResolveField는 author처럼 연결된 필드를 따로 풀어서, 책 N권을 조회하면 저자 조회가 N번 일어나는 N+1 문제가 생겨요. DataLoader로 한 요청 안의 조회를 모아 IN 쿼리 한 번으로 처리하면 해결돼요. 가드·인터셉터·파이프는 GqlExecutionContext를 통해 그대로 쓸 수 있어요. Nest 12는 기본 IDE로 GraphiQL을, 구독에는 graphql-ws를 써요. SDL을 먼저 쓰는 스키마 우선 방식도 선택할 수 있어요.', 'Schemas are generated from @ObjectType classes, and @Query, @Mutation and @ResolveField resolvers assemble responses in exactly the shape clients request.', "The code-first approach in @nestjs/graphql generates the GraphQL schema from classes marked @ObjectType and @Field, so types are defined once. In a @Resolver class, @Query is the read entry point and @Mutation the write entry point, and clients pick exactly the fields they need, avoiding over- and under-fetching. @ResolveField resolves linked fields such as author separately, so fetching N books triggers N author lookups, the N+1 problem. DataLoader batches lookups within one request into a single IN query to fix it. Guards, interceptors and pipes work through GqlExecutionContext. Nest 12 defaults to GraphiQL as the IDE and graphql-ws for subscriptions. A schema-first approach starting from SDL is also available.", sGraphql()),
    item('nest-websockets', 'WebSocket 게이트웨이', 'WebSocket gateways', '@WebSocketGateway로 연결이 유지되는 실시간 통신을 만들어요. @SubscribeMessage 핸들러가 메시지를 받고, 서버는 방(room) 단위로 브로드캐스트해요.', 'HTTP는 요청이 있어야 응답하지만 WebSocket은 연결을 유지해 서버가 먼저 메시지를 보낼 수 있어 채팅, 알림, 협업 편집에 써요. @WebSocketGateway({ namespace: \'chat\' })가 Socket.IO(또는 ws 어댑터) 연결을 받고, @SubscribeMessage(\'send\') 핸들러가 @MessageBody와 @ConnectedSocket으로 내용과 연결을 받아요. @WebSocketServer로 얻은 서버의 to(room).emit()은 같은 방에 들어온 클라이언트에게만 보내요. OnGatewayConnection, OnGatewayDisconnect로 연결 수명을 다루고, 연결 시 토큰을 검증해 인증해요. 서버가 여러 대면 Redis 어댑터로 방과 메시지를 공유해야 다른 서버에 붙은 사용자에게도 전달돼요. 서버 → 클라이언트 단방향 갱신만 필요하면 @Sse로 Server-Sent Events를 쓰는 편이 단순해요.', '@WebSocketGateway builds realtime communication over persistent connections, @SubscribeMessage handlers receive messages, and the server broadcasts by room.', "HTTP replies only to requests, while WebSockets keep connections open so the server can push first, suiting chat, notifications and collaborative editing. @WebSocketGateway({ namespace: 'chat' }) accepts Socket.IO (or ws adapter) connections, and an @SubscribeMessage('send') handler receives content and the connection via @MessageBody and @ConnectedSocket. On the server from @WebSocketServer, to(room).emit() sends only to clients in that room. OnGatewayConnection and OnGatewayDisconnect manage connection lifetimes, and tokens are verified on connect for authentication. With several servers, a Redis adapter shares rooms and messages so users on other servers receive them. For one-way server-to-client updates, Server-Sent Events via @Sse are simpler.", sWebsocket()),
    item('nest-queues', '작업 큐', 'Job queues', '메일 발송처럼 오래 걸리는 일은 BullMQ 큐에 넣고 바로 응답해요. @Processor 워커가 꺼내 처리하고, 실패하면 간격을 두고 재시도해요.', '@nestjs/bullmq의 BullModule.registerQueue({ name: \'email\' })로 Redis 기반 큐를 만들고, @InjectQueue로 주입받아 add(\'welcome\', data, { attempts: 3, backoff: 5000 })로 작업을 넣어요. API는 작업을 넣자마자 202처럼 응답해서 사용자가 외부 메일 서버를 기다리지 않아요. WorkerHost를 상속한 @Processor(\'email\') 클래스의 process(job)가 작업을 처리하고, 워커는 별도 프로세스나 서버로 늘려 처리량을 키울 수 있어요. 실패하면 backoff 간격을 두고 재시도하고, 끝내 실패한 작업은 따로 모여 원인을 확인하고 다시 돌릴 수 있어요. delay로 지연 실행, repeat로 반복 작업, limiter로 외부 API 호출 속도 조절도 해요. 같은 작업이 두 번 실행돼도 문제없도록 멱등하게 만드는 것이 중요해요.', 'Slow work such as sending mail goes into a BullMQ queue so requests return at once, @Processor workers handle it, and failures retry with backoff.', "@nestjs/bullmq’s BullModule.registerQueue({ name: 'email' }) creates a Redis-backed queue, injected with @InjectQueue, and add('welcome', data, { attempts: 3, backoff: 5000 }) enqueues jobs. The API responds as soon as the job is queued, for example with 202, so users never wait on an external mail server. process(job) in an @Processor('email') class extending WorkerHost runs the work, and workers scale out as separate processes or servers. Failures retry after backoff delays, and jobs that keep failing are kept aside for inspection and replay. delay defers jobs, repeat schedules recurring ones, and limiter throttles calls to external APIs. Making jobs idempotent, safe to run twice, is essential.", sQueues()),
    item('nest-schedule-events', '스케줄과 이벤트', 'Scheduling and events', '@nestjs/schedule의 @Cron·@Interval로 정해진 시각과 간격에 작업을 돌리고, @nestjs/event-emitter의 @OnEvent로 앱 내부 이벤트에 반응해요.', "@Cron('0 3 * * *')는 매일 새벽 3시에 오래된 데이터 정리 같은 작업을 실행하고, @Interval(10_000)은 10초마다, @Timeout은 시작 후 한 번 실행해요. SchedulerRegistry로 실행 중에 작업을 추가·중지할 수도 있어요. 서버가 여러 대면 모든 인스턴스에서 cron이 동시에 돌기 때문에 분산 잠금이나 큐의 반복 작업으로 한 번만 실행되게 해요. 이벤트 쪽은 EventEmitter2로 'order.created'를 내보내면 영수증 발송, 통계 갱신 같은 @OnEvent 리스너가 서로를 모른 채 각자 반응해서 주문 서비스가 부수 작업을 몰라도 돼요. { async: true } 리스너는 응답 흐름을 막지 않아요. 이 이벤트는 같은 프로세스 안에서만 전달되고 재시도가 없으므로, 서비스 간 통신이나 반드시 성공해야 하는 일은 메시지 브로커나 작업 큐를 써요.", 'Scheduling with @Cron and @Interval from @nestjs/schedule runs work at set times and intervals, and @OnEvent from @nestjs/event-emitter reacts to in-app events.', "@Cron('0 3 * * *') runs jobs such as purging old data daily at 3 a.m., @Interval(10_000) every 10 seconds, and @Timeout once after startup. SchedulerRegistry can add or stop jobs at run time. With several servers, cron fires on every instance, so distributed locks or repeatable queue jobs keep it to one run. On the event side, emitting 'order.created' with EventEmitter2 lets @OnEvent listeners such as receipts and stats react independently, so the order service need not know about side work. { async: true } listeners do not block the response. These events stay within one process and have no retries, so cross-service communication or must-succeed work belongs in a message broker or job queue.", sScheduleEvents()),
    item('nest-cqrs', 'CQRS', 'CQRS', '@nestjs/cqrs는 상태를 바꾸는 명령과 조회를 CommandBus·QueryBus와 전용 핸들러로 분리해요. 처리 뒤 이벤트로 후속 작업을 느슨하게 이어요.', '명령(Command)은 PlaceOrder처럼 의도를 담은 객체이고, commandBus.execute(new PlaceOrder(items))를 하면 그 명령 전용 @CommandHandler가 도메인 로직과 저장을 맡아요. 조회는 queryBus.execute(new GetOrder(id))로 @QueryHandler가 처리해서 읽기에 최적화된 모델(비정규화 테이블, 캐시)을 따로 쓸 수 있어요. 명령 처리 중 AggregateRoot가 발생시킨 OrderPlaced 같은 이벤트는 @EventsHandler가 받아 메일, 재고 갱신, 읽기 모델 갱신을 하고, 사가(saga)는 이벤트 흐름을 RxJS로 받아 다음 명령을 내보내요. 서비스 하나에 모든 로직이 쌓이는 걸 막고 기능마다 핸들러가 명확해지지만, 파일과 개념이 늘어나 단순한 CRUD에는 과해요. 도메인이 복잡하거나 읽기·쓰기 부하가 크게 다를 때 고려하고, 이벤트 소싱과 함께 쓰기도 해요.', '@nestjs/cqrs separates state-changing commands from queries through CommandBus, QueryBus and dedicated handlers, then loosely chains follow-ups with events.', 'A command is an object carrying intent, such as PlaceOrder, and commandBus.execute(new PlaceOrder(items)) hands it to its dedicated @CommandHandler for domain logic and persistence. Queries go through queryBus.execute(new GetOrder(id)) to a @QueryHandler, free to use read-optimized models such as denormalized tables or caches. Events raised by an AggregateRoot during a command, such as OrderPlaced, reach @EventsHandler classes for mail, stock and read-model updates, while sagas consume the event stream with RxJS and dispatch the next commands. It stops all logic piling into one service and gives each feature a clear handler, but adds files and concepts that are overkill for simple CRUD. Consider it for complex domains or very different read and write loads, sometimes alongside event sourcing.', sCqrs()),
    item('nest-v12', 'Nest 12의 변화', 'What changed in Nest 12', '2026년 8월의 Nest 12는 코어 패키지를 ESM으로 바꾸고 Standard Schema 검증과 공식 관측 SDK(@nestjs/observe)를 더했어요. Node 20.19+ 또는 22.12+가 필요해요.', 'Nest 12는 모든 코어 패키지를 ESM으로 배포하지만, Node의 require(esm) 덕분에 기존 CommonJS 앱도 그대로 불러 써요. 그래서 Node.js 20.19+ 또는 22.12+가 필요해요. @Body, @Query, @Param, @RawBody가 schema 옵션으로 Zod·Valibot·ArkType 같은 Standard Schema를 받고, 직렬화와 @nestjs/config 검증도 같은 스키마를 써요. @nestjs/observe는 HTTP, GraphQL, gRPC, 마이크로서비스, 큐, cron 실행을 요청 수명 주기에서 추적하는 공식 관측 SDK예요. 새 ESM 프로젝트는 Vitest와 oxlint가 기본이고, webpack 빌드는 rspack(--builder rspack)으로 대체됐어요. 수명 주기 훅 호출 순서, NATS 패키지(@nats-io/transport-node), GraphQL 구독(graphql-ws)과 기본 IDE(GraphiQL) 같은 변경이 있으니 nest upgrade로 자동 변환한 뒤 확인해요. class-validator 기반 검증은 계속 지원돼요.', 'Nest 12, released in August 2026, moved core packages to ESM and added Standard Schema validation and an official observability SDK, @nestjs/observe; it requires Node 20.19+ or 22.12+.', 'Nest 12 ships every core package as ESM, while Node’s require(esm) keeps existing CommonJS apps loading them, hence the Node.js 20.19+ or 22.12+ requirement. @Body, @Query, @Param and @RawBody accept Standard Schema libraries such as Zod, Valibot and ArkType through a schema option, and serialization and @nestjs/config validation use the same schemas. @nestjs/observe is the official observability SDK tracing HTTP, GraphQL, gRPC, microservices, queues and cron runs through the request lifecycle. New ESM projects default to Vitest and oxlint, and webpack builds give way to rspack (--builder rspack). Changes such as lifecycle hook ordering, the NATS package (@nats-io/transport-node), GraphQL subscriptions (graphql-ws) and the default IDE (GraphiQL) are worth checking after running nest upgrade. Validation based on class-validator remains supported.', sNest12())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
