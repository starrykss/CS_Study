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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'csx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono csx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono csx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c csx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono csx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c csx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'csx-s csx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono csx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono csx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono csx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono csx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono csx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'csx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'csx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'csx-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono csx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'csx-a', g: 'csx-g', r: 'csx-r', w: 'csx-w', m: 'cz-mono', s: 'csx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'csx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono csx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono csx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'csx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.csx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.csx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.csx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.csx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.csx-r .in{color:var(--danger);font-weight:800}
.csx-g .in{color:var(--ok);font-weight:800}
.csx-a .in{color:var(--accent);font-weight:800}
.csx-w .in{color:var(--warn);font-weight:800}
.csx-c .in{font-size:.6em;font-weight:700}
.csx-c2 .in{font-size:.5em;font-weight:700}
.csx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.csx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.csx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== CSS · 1. selectors and the cascade ===== */
/* extra css: labels whose colour follows the element's own color style */
const CSSY = '.csx-ic .in{color:inherit!important}';
/* a box with an arbitrary CSS background */
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
/* centred label inside a box */
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc csx-xs ' + clsOf(c), st, Object.assign({ w }, o));

function sCascade() {
  return CW('css-cascade', {
    code: [['/* 브라우저 기본: a { color: blue } */', '/* browser default: a { color: blue } */'], 'a { color: gray; }', '.nav a { color: black; }', '#home { color: green; }', ['a { color: red; }      /* 나중에 와도 */', 'a { color: red; }      /* comes later */'], '.btn { color: white !important; }', '', '<a id="home" class="btn">Home</a>'],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1, 'danger']],
    draw: (S) => {
      const X = 19.2, rows = [[['기본값  blue', 'default  blue'], 1], ['a  gray', 1], ['.nav a  black', 2], ['#home  green', 2], [['a(뒤)  red', 'a (later)  red'], 3], ['.btn !important  white', 4]];
      rows.forEach(([t, st], i) => chip(S, 'r' + i, X, .6 + i * 1.3, 12.0, t, 'line', st, { pct: 8 }));
      const win = { 1: 1, 2: 3, 3: 3, 4: 5 };
      Object.entries(win).forEach(([st, w]) => { st = +st; rows.forEach((r, i) => { if (r[1] <= st) S.set('r' + i, st, { opacity: i === w ? '1' : '.35', background: i === w ? tint('ok', 34) : tint('line', 8) }); }); });
      lbl(S, 'pl', X, 8.9, ['결과', 'result'], 'a', 1);
      sw(S, 'pv', X + 3.0, 8.6, 6.0, 1.4, 'var(--ui)', 1, { css: 'border:.08em solid var(--line)' }); cl(S, 'pt', X + 3.0, 8.85, 6.0, 'Home', 'csx-ic', 1); S.set('pt', 0, { color: 'var(--accent)' });
      S.set('pt', 1, { color: 'gray' }); S.set('pt', 2, { color: 'var(--ok)' }); S.set('pv', 4, { background: 'var(--ink)' }); S.set('pt', 4, { color: 'var(--ui)' });
      lbl(S, 'n1', X, 10.6, ['작성자 스타일이 기본값을 이겨요', 'author styles beat the defaults'], 'g', 1, { off: 2 });
      lbl(S, 'n2', X, 10.6, ['ID > 클래스 > 태그 순으로 강해요', 'ID > class > tag'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 10.6, ['순서는 명시도가 같을 때만 따져요', 'order only breaks specificity ties'], 'w', 3, { off: 4 });
      lbl(S, 'n4', X, 10.6, ['!important는 모든 것을 뒤집어요', '!important overrides everything'], 'r', 4);
    },
    notes: [['같은 요소에 여러 규칙이 겹치면 캐스케이드가 승자를 정해요 · 먼저 출처: 작성자 CSS가 브라우저 기본값을 이겨요', 'when rules collide on an element, the cascade picks a winner; first by origin, so author CSS beats browser defaults'], ['출처가 같으면 명시도로 겨뤄요 · #home(ID)이 .nav a와 a를 이겨서 초록이 돼요', 'with equal origin, specificity decides: #home (an ID) beats .nav a and a, so it turns green'], ['나중에 쓴 a { red }는 명시도가 낮아 져요 · 순서는 명시도가 같을 때만 의미가 있어요', 'the later a { red } loses on specificity; source order only matters between equal specificities'], ['!important는 이 순서를 뒤집어요 · 남발하면 다시 이기기 위해 !important를 더 쓰게 돼요', '!important overturns the order, and overusing it leads to an arms race of more !important']],
    fin: [['캐스케이드: 출처·중요도 → 레이어 → 명시도 → 등장 순서로 하나의 값을 고르는 규칙', 'the cascade picks one value by origin and importance, then layer, then specificity, then source order', 'csx-xs csx-a'], ['DevTools의 Styles 패널은 진 선언에 취소선을 그어 보여줘요', 'the DevTools Styles panel shows losing declarations struck through'], ['명시도를 낮고 고르게 유지하면 덮어쓰기가 쉬워져요', 'keeping specificity low and even makes overrides easy']],
    caps: [['출처', 'Origin'], ['명시도', 'Specificity'], ['등장 순서', 'Source order'], ['!important', '!important'], ['캐스케이드', 'The cascade']]
  });
}

function sSpecificity() {
  return CW('css-specificity', {
    code: ['p { }                    /* 0,0,1 */', '.note p { }              /* 0,1,1 */', '.card .note p { }        /* 0,2,1 */', '#main p { }              /* 1,0,1 */', 'p:hover { }              /* 0,1,1 */', ':where(.card) p { }      /* 0,0,1 */', ':is(#a, .b) p { }        /* 1,0,1 */', ['style="color: red"       /* 인라인 */', 'style="color: red"       /* inline */']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 3], [7, 1, 'warn']],
    draw: (S) => {
      const X = 19.0, cx = [X + 6.6, X + 8.5, X + 10.4];
      ['ID', ['클래스', 'class'], ['태그', 'tag']].forEach((t, i) => cl(S, 'h' + i, cx[i], .6, 1.8, t, 'a', 0));
      const A = [['p', [0, 0, 1], 1, 3], ['.note p', [0, 1, 1], 1, 3], ['.card .note p', [0, 2, 1], 2, 3], ['#main p', [1, 0, 1], 2, 3], ['p:hover', [0, 1, 1], 3, 4], [':where(.card) p', [0, 0, 1], 3, 4], [':is(#a, .b) p', [1, 0, 1], 3, 4]];
      A.forEach(([sel, v, st, off], i) => { const r = i < 4 ? (i < 2 ? i : i) : i - 4; const y = 1.7 + r * 1.3; lbl(S, 's' + i, X, y + .15, sel, 'm', st, { off }); v.forEach((n, j) => chip(S, 'v' + i + j, cx[j], y, 1.8, '' + n, n ? (j === 0 ? 'danger' : j === 1 ? 'warn' : 'accent') : 'line', st, { off, pct: n ? 26 : 8 })); });
      ['v30', 'v31', 'v32'].forEach(k => tsets(S, k, [[2, 'ok', 40]]));
      lbl(S, 'w2', X, 7.2, ['왼쪽 칸부터 비교: ID 1개 > 클래스 2개', 'compare from the left: 1 ID > 2 classes'], 'g', 2, { off: 3, w: 12.4 });
      lbl(S, 'w3', X, 7.2, ['가상 클래스 = 클래스 · :where는 0', 'pseudo-class = class · :where is 0'], 'a', 3, { off: 4, w: 12.4 }); lbl(S, 'w3b', X, 8.3, [':is는 인자 중 가장 높은 값', ':is takes its strongest argument'], '', 3, { off: 4 });
      chip(S, 'in', X, 1.7, 12.4, ['인라인 style = 1,0,0,0', 'inline style = 1,0,0,0'], 'warn', 4, { pct: 30 });
      lbl(S, 'w4', X, 3.2, ['어떤 선택자보다 강해요', 'stronger than any selector'], 'w', 4); lbl(S, 'w5', X, 4.3, ['스타일에 ID 선택자는 피하세요', 'avoid ID selectors for styling'], 'g', 4);
    },
    notes: [['명시도는 (ID, 클래스, 태그) 세 칸의 개수예요 · .note p는 클래스 1개, 태그 1개라 0,1,1', 'specificity counts (IDs, classes, tags); .note p has one class and one tag, so 0,1,1'], ['왼쪽 칸부터 비교해서, 클래스가 아무리 많아도 ID 하나를 못 이겨요', 'columns compare from the left, so no number of classes beats a single ID'], [':hover 같은 가상 클래스는 클래스로 세고, :where()는 0, :is()는 인자 중 가장 센 값을 써요', 'pseudo-classes such as :hover count as classes; :where() counts as 0 and :is() as its strongest argument'], ['인라인 style 속성은 모든 선택자보다 강해요 · 그래서 스타일엔 ID와 인라인을 피해요', 'an inline style attribute beats every selector, which is why styling avoids IDs and inline styles']],
    fin: [['명시도: 선택자의 ID·클래스·태그 개수로 정하는 우선순위 (a, b, c)', 'specificity ranks selectors by their counts of IDs, classes and tags, (a, b, c)', 'csx-xs csx-a'], ['*, 결합자(>, +, ~), :where()는 0으로 세요', '*, combinators (>, +, ~) and :where() count as zero'], ['BEM처럼 클래스 하나로 쓰면 명시도가 평평해져 관리가 쉬워요', 'single-class conventions such as BEM keep specificity flat and manageable']],
    caps: [['세 칸 세기', 'Counting three columns'], ['왼쪽부터 비교', 'Comparing from the left'], ['가상 클래스와 :is·:where', 'Pseudo-classes, :is and :where'], ['인라인 스타일', 'Inline styles'], ['명시도', 'Specificity']]
  });
}

function sInherit() {
  return CW('css-inherit', {
    code: ['body { color: #333; font-size: 16px; }', ['/* p, a가 color와 font를 물려받아요 */', '/* p and a inherit color and font */'], '.box { border: 2px solid; padding: 8px; }', ['/* border·padding은 상속 안 돼요 */', '/* border and padding do not inherit */'], ['a { color: inherit; }   /* 부모 색 */', 'a { color: inherit; }   /* parent’s color */'], 'button { font: inherit; }', ['p { margin: initial; }  /* 명세 기본값 */', 'p { margin: initial; }  /* spec default */'], '.reset { all: unset; }'],
    hl: [[0, 2], [2, 2, 'warn'], [4, 2, 'ok'], [6, 2]],
    draw: (S) => {
      const X = 19.4, N = { body: [X + 4.2, .8], box: [X + 4.2, 3.2], p: [X + .4, 5.8], a: [X + 8.0, 5.8] };
      [['body', 'box'], ['box', 'p'], ['box', 'a']].forEach(([u, v], i) => seg(S, 'e' + i, [N[u][0] + 1.9, N[u][1] + 1.1], [N[v][0] + 1.9, N[v][1]], 0, 'ink-3', .08));
      Object.entries(N).forEach(([k, [x, y]]) => { sw(S, 'n' + k, x, y, 3.8, 1.1, 'var(--ui)', 0, { css: 'border:.12em solid var(--line)' }); cl(S, 'nl' + k, x, y + .2, 3.8, k === 'box' ? 'div.box' : k, 'm csx-ic', 0, { css: 'color:var(--ink)' }); });
      ['body', 'box', 'p', 'a'].forEach(k => S.set('n' + k, 1, { background: tint('accent', 22) }));
      lbl(S, 'l1', X, 7.6, ['color: #333 ↓ 자식에게 전달', 'color: #333 ↓ passed to children'], 'a', 1, { off: 2 });
      S.set('nbox', 2, { 'border-color': 'var(--warn)' }); lbl(S, 'l2', X, 7.6, ['테두리는 .box에만 · 자식은 안 받아요', 'only .box has a border; children do not'], 'w', 2, { off: 3, w: 12 });
      S.set('nla', 0, { color: 'var(--accent)' }); S.set('nla', 3, { color: 'var(--ink)' });
      lbl(S, 'l3', X, 7.6, ['링크 기본 파랑 → inherit로 부모 색', 'default link blue → inherit the parent'], 'g', 3, { off: 4, w: 12 });
      [['inherit', ['부모 값', 'parent value']], ['initial', ['명세 기본값', 'spec default']], ['unset', ['상속 속성이면 inherit, 아니면 initial', 'inherit if inherited, else initial']]].forEach(([a, b], i) => { lbl(S, 'k' + i, X, 7.6 + i * 1.1, a, 'm a', 4); lbl(S, 'kd' + i, X + 3.0, 7.6 + i * 1.1, b, '', 4, { w: 9.4 }); });
    },
    notes: [['글자 관련 속성(color, font, line-height 등)은 부모에서 자식으로 상속돼요 · body에 한 번만 정하면 돼요', 'text properties such as color, font and line-height inherit from parent to child, so setting them once on body is enough'], ['상자 관련 속성(border, padding, margin, background)은 상속되지 않아요', 'box properties such as border, padding, margin and background do not inherit'], ['inherit 키워드는 상속되지 않는 속성도 부모 값을 쓰게 해요 · 링크와 폼 요소 초기화에 자주 써요', 'the inherit keyword forces the parent’s value, which is common when resetting links and form controls'], ['initial은 명세 기본값, unset은 상속 속성이면 inherit 아니면 initial, all은 모든 속성에 적용해요', 'initial means the spec default, unset means inherit for inherited properties and initial otherwise, and all applies to every property']],
    fin: [['상속: 계산된 값이 자식 요소로 내려가는 규칙 · 글자 속성은 상속, 상자 속성은 상속되지 않음', 'inheritance passes computed values down to children; text properties inherit and box properties do not', 'csx-xs csx-a'], ['button·input은 기본적으로 글꼴을 상속하지 않아 font: inherit을 자주 써요', 'buttons and inputs do not inherit fonts by default, hence font: inherit'], ['em 단위도 부모의 글자 크기를 기준으로 계산돼요', 'em units are computed from the parent’s font size too']],
    caps: [['글자 속성은 상속', 'Text properties inherit'], ['상자 속성은 아니에요', 'Box properties do not'], ['inherit', 'inherit'], ['initial·unset·all', 'initial, unset and all'], ['상속', 'Inheritance']]
  });
}

function sSelectors() {
  return CW('css-selectors', {
    code: [['nav a { }        /* 자손: 안쪽 어디든 */', 'nav a { }        /* descendant: anywhere */'], ['nav > a { }      /* 자식: 바로 아래만 */', 'nav > a { }      /* child: direct only */'], ['h2 + p { }       /* 바로 다음 형제 */', 'h2 + p { }       /* next sibling */'], ['h2 ~ p { }       /* 뒤의 모든 형제 */', 'h2 ~ p { }       /* all later siblings */'], 'a[href^="https"] { }', 'input[type="email"] { }', ['li:nth-child(2n) { }   /* 짝수 번째 */', 'li:nth-child(2n) { }   /* even items */'], 'li:first-child, li:last-child { }'],
    hl: [[0, 2], [2, 2], [4, 2], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'nav', X + 4.2, .6, 3.4, 1.0, tint('accent', 18), 1, { off: 2 }); cl(S, 'navl', X + 4.2, .78, 3.4, 'nav', 'm', 1, { off: 2 });
      sw(S, 'a1', X + .4, 2.6, 3.4, 1.0, tint('line', 10), 1, { off: 2 }); cl(S, 'a1l', X + .4, 2.78, 3.4, 'a', 'm', 1, { off: 2 });
      sw(S, 'ul', X + 8.0, 2.6, 3.4, 1.0, tint('line', 10), 1, { off: 2 }); cl(S, 'ull', X + 8.0, 2.78, 3.4, 'ul > li', 'm', 1, { off: 2 });
      sw(S, 'a2', X + 8.0, 4.6, 3.4, 1.0, tint('line', 10), 1, { off: 2 }); cl(S, 'a2l', X + 8.0, 4.78, 3.4, 'a', 'm', 1, { off: 2 });
      [[[X + 5.9, 1.6], [X + 2.1, 2.6]], [[X + 5.9, 1.6], [X + 9.7, 2.6]], [[X + 9.7, 3.6], [X + 9.7, 4.6]]].forEach(([a, b], i) => seg(S, 'te' + i, a, b, 1, 'ink-3', .08, { off: 2 }));
      S.set('a1', 1, { background: tint('ok', 40) }); S.set('a2', 1, { background: tint('ok', 40) });
      lbl(S, 'd1', X, 6.4, ['nav a: 두 링크 모두 ✓', 'nav a: both links ✓'], 'g', 1, { off: 2 }); lbl(S, 'd2', X, 7.5, ['nav > a: 위쪽 링크만', 'nav > a: only the top link'], 'w', 1, { off: 2 });
      const sib = ['h2', 'p', 'p', 'p'];
      sib.forEach((t, i) => { sw(S, 'sb' + i, X + i * 3.1, 1.0, 2.8, 1.0, tint(i === 0 ? 'accent' : 'line', i === 0 ? 20 : 10), 2, { off: 3 }); cl(S, 'sbl' + i, X + i * 3.1, 1.18, 2.8, t, 'm', 2, { off: 3 }); });
      S.set('sb1', 2, { background: tint('ok', 40) });
      lbl(S, 's1', X, 2.6, ['h2 + p: 바로 다음 하나', 'h2 + p: just the next one'], 'g', 2, { off: 3 }); lbl(S, 's2', X, 3.7, ['h2 ~ p: 뒤의 p 전부', 'h2 ~ p: every later p'], 'a', 2, { off: 3 });
      [['https://…', 1], ['http://…', 0], ['/about', 0]].forEach(([t, m], i) => { sw(S, 'at' + i, X, 1.0 + i * 1.3, 6.0, 1.0, tint(m ? 'ok' : 'line', m ? 40 : 10), 3, { off: 4 }); cl(S, 'atl' + i, X, 1.18 + i * 1.3, 6.0, t, 'm', 3, { off: 4 }); });
      lbl(S, 'a3', X + 6.6, 1.15, ['^= 시작', '^= starts with'], 'a', 3, { off: 4 }); lbl(S, 'a4', X + 6.6, 2.25, ['$= 끝, *= 포함', '$= ends, *= contains'], '', 3, { off: 4 });
      [1, 2, 3, 4, 5, 6].forEach(i => { sw(S, 'li' + i, X + (i - 1) * 2.05, 1.0, 1.8, 1.0, tint(i % 2 ? 'line' : 'ok', i % 2 ? 10 : 40), 4); cl(S, 'lil' + i, X + (i - 1) * 2.05, 1.18, 1.8, '' + i, 'm', 4); });
      lbl(S, 'n4', X, 2.6, ['2n = 짝수, 2n+1 = 홀수, 3 = 세 번째', '2n even, 2n+1 odd, 3 the third'], 'g', 4, { w: 12.4 });
    },
    notes: [['공백은 자손(안쪽 어디든), >는 자식(바로 아래)이에요 · nav > a는 ul 안의 링크를 고르지 않아요', 'a space means descendant (anywhere inside) and > means child (directly below), so nav > a skips links inside the ul'], ['+는 바로 다음 형제 하나, ~는 뒤에 오는 모든 형제를 골라요', '+ selects only the next sibling, and ~ every later sibling'], ['[속성] 선택자로 속성 값을 조건으로 골라요 · ^=는 시작, $=는 끝, *=는 포함', 'attribute selectors match on attribute values: ^= starts with, $= ends with, *= contains'], [':nth-child(2n)은 짝수 번째, :first-child·:last-child는 처음과 끝을 골라요', ':nth-child(2n) picks even positions, and :first-child and :last-child the ends']],
    fin: [['선택자: 요소를 고르는 패턴 · 결합자(공백, >, +, ~)로 관계를, [ ]로 속성을, :으로 상태와 위치를 표현', 'selectors are patterns for picking elements: combinators (space, >, +, ~) for relationships, [ ] for attributes, : for state and position', 'csx-xs csx-a'], ['브라우저는 선택자를 오른쪽에서 왼쪽으로 맞춰 봐요', 'browsers match selectors from right to left'], ['깊은 중첩보다 짧은 클래스 선택자가 읽기도, 덮어쓰기도 쉬워요', 'short class selectors are easier to read and override than deep chains']],
    caps: [['자손과 자식', 'Descendants and children'], ['형제', 'Siblings'], ['속성 선택자', 'Attribute selectors'], ['위치 선택자', 'Position selectors'], ['선택자 조합', 'Combining selectors']]
  });
}

function sPseudo() {
  return CW('css-pseudo', {
    code: ['a:hover { color: red; }', 'input:focus-visible { outline: 2px solid; }', 'input:invalid { border-color: red; }', 'button:disabled { opacity: .5; }', '.req::after { content: " *"; color: red; }', 'p::first-line { font-weight: bold; }', '::selection { background: yellow; }', 'li::marker { color: gray; }'],
    hl: [[0, 1], [1, 3, 'warn'], [4, 2, 'ok'], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      T(S, 'lk', X, .8, ['링크 텍스트', 'link text'], 'csx-xs csx-ic', 0, { css: 'text-decoration:underline' }); S.set('lk', 0, { color: 'var(--accent)' }); S.set('lk', 1, { color: 'var(--danger)' }); S.set('lk', 2, { color: 'var(--accent)' });
      lbl(S, 'hv', X + 5.0, .8, [':hover · 마우스를 올렸을 때', ':hover · when the pointer is over it'], 'a', 1, { off: 2, w: 7.4 });
      T(S, 'em', X, 2.3, 'Email', 'csx-xs', 0); T(S, 'emx', X + 2.3, 2.3, ' *', 'csx-xs csx-r', 3);
      sw(S, 'in', X, 3.2, 8.6, 1.2, 'var(--ui)', 0, { css: 'border:.12em solid var(--line)' }); T(S, 'inv', X + .4, 3.45, 'kim@', 'cz-mono csx-xs', 0);
      S.set('in', 2, { 'border-color': 'var(--danger)', 'box-shadow': '0 0 0 .2em color-mix(in srgb,var(--accent) 35%,transparent)' }); S.set('in', 3, { 'border-color': 'var(--line)', 'box-shadow': 'none' });
      lbl(S, 'f2', X, 4.7, [':focus-visible 테두리 + :invalid 빨강', ':focus-visible ring + :invalid red'], 'w', 2, { off: 3, w: 12.4 });
      sw(S, 'bt', X, 6.0, 4.0, 1.2, tint('accent', 70), 0); cl(S, 'btl', X, 6.25, 4.0, ['보내기', 'Send'], '', 0); S.set('bt', 2, { opacity: '.5' }); S.set('btl', 2, { opacity: '.5' }); S.set('bt', 3, { opacity: '1' }); S.set('btl', 3, { opacity: '1' });
      lbl(S, 'f2b', X + 4.4, 6.25, [':disabled', ':disabled'], 'm', 2, { off: 3 });
      lbl(S, 'f3', X, 4.7, ['::after가 내용 “ *”를 덧붙여요', '::after appends the content “ *”'], 'g', 3, { off: 4, w: 12.4 });
      sw(S, 'sel', X + 4.9, .7, 3.4, .9, 'color-mix(in srgb,yellow 60%,transparent)', 4); T(S, 'mk', X, 8.0, '•  item', 'csx-xs csx-ic', 4, { css: 'color:var(--ink-3)' });
      lbl(S, 'f4', X, 4.7, ['::selection, ::marker로 기본 부분 꾸미기', 'style built-in parts with ::selection and ::marker'], 'a', 4, { w: 12.4 });
    },
    notes: [['가상 클래스(:)는 요소의 상태를 골라요 · :hover는 마우스가 올라갔을 때예요', 'pseudo-classes (:) select states; :hover matches while the pointer is over the element'], [':focus-visible은 키보드로 초점을 옮겼을 때, :invalid는 입력이 형식에 맞지 않을 때, :disabled는 비활성일 때예요', ':focus-visible matches keyboard focus, :invalid input that fails validation, and :disabled inactive controls'], ['가상 요소(::)는 요소의 일부나 덧붙인 내용을 만들어요 · ::after와 content로 별표를 붙여요', 'pseudo-elements (::) style parts of an element or generated content; ::after with content adds the asterisk'], ['::selection은 드래그한 영역, ::marker는 목록의 글머리표를 꾸며요', '::selection styles highlighted text and ::marker the list bullet']],
    fin: [['가상 클래스(:)는 “어떤 상태일 때”, 가상 요소(::)는 “어떤 부분을”', 'pseudo-classes (:) mean “in this state”, pseudo-elements (::) mean “this part”', 'csx-xs csx-a'], ['::before·::after는 content가 있어야 나타나고, 장식용이라 스크린 리더가 무시할 수 있어요', '::before and ::after need content to appear and are decorative, so screen readers may skip them'], [':hover만으로 기능을 숨기면 터치 기기에서 쓸 수 없어요', 'hiding features behind :hover alone breaks them on touch devices']],
    caps: [[':hover', ':hover'], ['폼 상태', 'Form states'], ['::after', '::after'], ['::selection과 ::marker', '::selection and ::marker'], ['가상 클래스와 가상 요소', 'Pseudo-classes and pseudo-elements']]
  });
}

function sHas() {
  return CW('css-has', {
    code: ['.card:has(img) { padding: 0; }', 'form:has(:invalid) .submit {', '  opacity: .5;', '}', ':is(h1, h2, h3) a { color: inherit; }', [':where(ul, ol) li { margin: 0; } /* 0점 */', ':where(ul, ol) li { margin: 0; } /* zero */'], '.list li { margin: 8px; }  /* 쉽게 덮음 */'].map((t, i) => i === 6 ? [t, '.list li { margin: 8px; }  /* easy override */'] : t),
    hl: [[0, 1, 'ok'], [1, 3, 'warn'], [4, 1], [5, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'c1', X, .8, 5.6, 4.4, 'var(--ui)', 0, { css: 'border:.14em solid var(--line)' }); cl(S, 'c1t', X, 2.6, 5.6, ['글만 있는 카드', 'text-only card'], '', 0);
      sw(S, 'c2', X + 6.4, .8, 5.6, 4.4, 'var(--ui)', 0, { css: 'border:.14em solid var(--line)' }); sw(S, 'c2i', X + 6.8, 1.2, 4.8, 2.2, tint('accent', 30), 0); cl(S, 'c2il', X + 6.8, 1.9, 4.8, 'img', 'm', 0); cl(S, 'c2t', X + 6.4, 3.8, 5.6, ['사진 카드', 'photo card'], '', 0);
      S.set('c2i', 0, { width: '4.8em', height: '2.2em' }); S.set('c2i', 1, { transform: 'translate(-.4em,-.4em)', width: '5.6em', height: '2.6em' }); S.set('c2', 1, { 'border-color': 'var(--ok)' });
      lbl(S, 'h1', X, 5.6, ['img를 가진 카드만 여백 0 · 부모를 고르는 선택자', 'only cards containing img lose padding'], 'g', 1, { off: 2, w: 12.4 });
      sw(S, 'fi', X, 6.9, 7.0, 1.1, 'var(--ui)', 2, { off: 3, css: 'border:.14em solid var(--danger)' }); T(S, 'fil', X + .3, 7.1, 'kim@', 'cz-mono csx-xs', 2, { off: 3 });
      sw(S, 'fb', X + 7.6, 6.9, 4.4, 1.1, tint('accent', 70), 2, { off: 3, css: 'opacity:.45' }); cl(S, 'fbl', X + 7.6, 7.1, 4.4, ['제출', 'Submit'], '', 2, { off: 3 });
      lbl(S, 'h2', X, 8.4, ['잘못된 입력이 있으면 버튼이 흐려져요 · JS 없이', 'invalid input dims the button, no JS'], 'w', 2, { off: 3, w: 12.4 });
      lbl(S, 'h3', X, 6.9, [':is(): 여러 선택자를 한 번에', ':is() groups selectors'], 'a', 3, { off: 4 }); lbl(S, 'h3b', X, 8.0, 'h1 a, h2 a, h3 a', 'm', 3, { off: 4 });
      lbl(S, 'h4', X, 6.9, [':where(): 같지만 명시도 0', ':where(): the same, with zero specificity'], 'a', 4, { w: 12.4 }); lbl(S, 'h4b', X, 8.0, ['기본 스타일을 쉽게 덮게 해요', 'defaults that are easy to override'], 'g', 4);
    },
    notes: [[':has()는 “이런 자식을 가진 부모”를 골라요 · 오랫동안 불가능했던 부모 선택자예요', ':has() selects a parent that contains a match, the long-missing parent selector'], ['form:has(:invalid)처럼 상태를 조합하면 JS 없이도 폼 전체 스타일을 바꿔요', 'combining states, as in form:has(:invalid), restyles the whole form without JavaScript'], [':is()는 여러 선택자를 묶어 짧게 써요 · 명시도는 인자 중 가장 높은 값이에요', ':is() groups several selectors; its specificity is that of its strongest argument'], [':where()는 :is()와 같지만 명시도가 0이라, 리셋·기본 스타일을 덮어쓰기 쉽게 만들어요', ':where() works like :is() but with zero specificity, so resets and defaults are easy to override']],
    fin: [[':has()는 부모·이전 형제를, :is()·:where()는 선택자 묶음을 표현하는 현대 선택자', ':has() reaches parents and previous siblings, while :is() and :where() group selectors', 'csx-xs csx-a'], ['h2:has(+ p)처럼 “뒤에 p가 오는 h2”도 고를 수 있어요', 'h2:has(+ p) even selects an h2 followed by a p'], [':has()는 계산 비용이 있어 넓은 범위(body:has)에는 신중하게 써요', ':has() has a cost, so use it carefully on broad scopes such as body:has']],
    caps: [[':has() 부모 선택자', ':has(), the parent selector'], ['상태 조합', 'Combining states'], [':is()', ':is()'], [':where()', ':where()'], [':has()와 :is()·:where()', ':has(), :is() and :where()']]
  });
}

function sLayers() {
  return CW('css-layers', {
    code: ['@layer reset, base, components, utilities;', '@layer reset { * { margin: 0; } }', '@layer components {', ['  #app .btn { color: blue; } /* 명시도↑ */', '  #app .btn { color: blue; } /* high spec. */'], '}', '@layer utilities {', ['  .text-red { color: red; }  /* 이겨요 */', '  .text-red { color: red; }  /* wins */'], '}', ['.btn { color: green; }  /* 레이어 밖 */', '.btn { color: green; }  /* unlayered */'], '@import url(lib.css) layer(vendor);'],
    hl: [[0, 2], [2, 6, 'ok'], [8, 1, 'warn'], [9, 1]],
    draw: (S) => {
      const X = 19.4, L = [['reset', 'line'], ['base', 'line'], ['components', 'accent'], ['utilities', 'ok'], [['레이어 밖', 'unlayered'], 'warn']];
      L.forEach(([t, c], i) => { const y = 9.4 - i * 1.7, st = i === 4 ? 3 : 1; chip(S, 'ly' + i, X, y, 5.8, t, c, st, { pct: 16 + i * 4 }); });
      ar(S, 'up', [X - .5, 10.5], [X - .5, 2.6], 'ink-3', 1, { h: .1 }); lbl(S, 'upl', X, 1.2, ['위로 갈수록 강해요', 'higher wins'], 'a', 1);
      lbl(S, 'c2', X + 6.3, 6.15, '#app .btn (1,1,0) ✗', 'm r', 2, { off: 3 }); lbl(S, 'c2b', X + 6.3, 4.45, '.text-red (0,1,0) ✓', 'm g', 2, { off: 3 });
      lbl(S, 'c3', X + 6.3, 2.75, ['.btn ✓ 모두를 이겨요', '.btn ✓ beats them all'], 'w', 3, { off: 4 });
      chip(S, 'vd', X, 11.6, 12.0, ['vendor 레이어: 외부 CSS를 가장 아래로', 'vendor layer: third-party CSS at the bottom'], 'line', 4, { pct: 10 });
    },
    notes: [['@layer로 CSS를 층으로 나누고, 첫 줄에 적은 순서가 우선순위가 돼요 · 뒤의 레이어가 강해요', '@layer splits CSS into layers, and the order in the first statement sets priority: later layers win'], ['레이어 사이에서는 명시도를 따지지 않아요 · components의 #app .btn도 utilities의 .text-red에 져요', 'specificity is not compared across layers, so #app .btn in components loses to .text-red in utilities'], ['레이어에 속하지 않은 일반 CSS는 모든 레이어보다 강해요', 'ordinary unlayered CSS beats every layer'], ['외부 라이브러리를 layer(vendor)로 가져오면 내 스타일로 쉽게 덮을 수 있어요', 'importing a library into layer(vendor) makes it easy to override with your own styles']],
    fin: [['캐스케이드 레이어: 명시도보다 먼저 비교되는 우선순위 층 · 명시도 싸움을 구조로 해결해요', 'cascade layers are priority tiers compared before specificity, resolving specificity wars by structure', 'csx-xs csx-a'], ['!important는 레이어 순서가 거꾸로 적용돼요', 'for !important declarations, the layer order is reversed'], ['Tailwind v4도 내부적으로 @layer를 써서 유틸리티가 이기도록 해요', 'Tailwind v4 uses @layer internally so utilities win']],
    caps: [['레이어 순서', 'Layer order'], ['명시도보다 먼저', 'Before specificity'], ['레이어 밖의 CSS', 'Unlayered CSS'], ['외부 CSS 길들이기', 'Taming third-party CSS'], ['캐스케이드 레이어', 'Cascade layers']]
  });
}
/* ===== CSS · 2. boxes and flow ===== */
function sBoxModel() {
  return CW('css-boxmodel', {
    code: ['.box {', '  width: 200px;', '  padding: 20px;', '  border: 5px solid;', '  margin: 10px;', '}', ['/* content-box: 실제 폭 250px */', '/* content-box: really 250px wide */'], '*, *::before, *::after {', ['  box-sizing: border-box; /* 폭 200px */', '  box-sizing: border-box; /* 200px wide */'], '}'],
    hl: [[0, 6], [6, 1, 'warn'], [7, 3, 'ok'], [4, 1]],
    draw: (S) => {
      const X = 19.2;
      sw(S, 'mg', X, .6, 12.2, 8.6, tint('warn', 14), 0, { css: 'border:.08em dashed var(--warn)' }); lbl(S, 'mgl', X + .25, .7, 'margin', 'w', 0);
      sw(S, 'bd', X + .9, 1.5, 10.4, 6.8, 'var(--ink-2)', 0); lbl(S, 'bdl', X + 8.9, 1.55, 'border', 'csx-ic', 0, { css: 'color:var(--ui)' });
      sw(S, 'pd', X + 1.3, 1.9, 9.6, 6.0, tint('ok', 30), 0); lbl(S, 'pdl', X + 1.55, 2.0, 'padding', 'g', 0);
      sw(S, 'ct', X + 2.7, 3.3, 6.8, 3.2, tint('accent', 34), 0); cl(S, 'ctl', X + 2.7, 4.5, 6.8, 'content', 'm', 0);
      hl(S, 'dm2', X + .9, X + 11.3, 9.9, 'danger', 2, { off: 3, w: .08 }); lbl(S, 'dl2', X + .9, 10.2, ['200 + 20×2 + 5×2 = 250px', '200 + 20×2 + 5×2 = 250px'], 'm r', 2, { off: 3 });
      hl(S, 'dm3', X + .9, X + 11.3, 9.9, 'ok', 3, { off: 4, w: .08 }); lbl(S, 'dl3', X + .9, 10.2, ['전체 200px · 내용은 150px로 줄어요', 'total 200px; content shrinks to 150px'], 'g', 3, { off: 4, w: 11.4 });
      lbl(S, 'dl4', X, 10.2, ['margin은 폭에 안 들어가요 · 바깥 간격', 'margin is outside the width: spacing'], 'w', 4, { w: 12.2 });
    },
    notes: [['모든 요소는 상자예요 · 안쪽부터 content, padding, border, margin 네 겹으로 이뤄져요', 'every element is a box made of four layers: content, padding, border and margin'], ['기본값 content-box에서는 width가 content만 가리켜서, 패딩과 테두리를 더하면 실제 폭이 250px가 돼요', 'with the default content-box, width covers only the content, so padding and border push the real width to 250px'], ['box-sizing: border-box면 width가 테두리까지 포함해, 지정한 200px 그대로 보여요 · 대부분 전역으로 켜요', 'with box-sizing: border-box, width includes padding and border, so it stays 200px; most projects set it globally'], ['margin은 상자 바깥의 간격이라 어느 방식이든 폭에 포함되지 않아요', 'margin is the space outside the box and never counts toward the width']],
    fin: [['박스 모델: content + padding + border + margin · box-sizing이 width의 기준을 정해요', 'the box model is content + padding + border + margin, and box-sizing decides what width measures', 'csx-xs csx-a'], ['DevTools의 Computed 탭에서 네 겹의 실제 크기를 볼 수 있어요', 'the DevTools Computed tab shows the actual size of each layer'], ['padding은 배경색이 칠해지고, margin은 투명해요', 'padding is painted with the background color; margin is transparent']],
    caps: [['네 겹의 상자', 'Four layers'], ['content-box', 'content-box'], ['border-box', 'border-box'], ['바깥 간격 margin', 'Margin outside'], ['박스 모델', 'The box model']]
  });
}

function sMarginCollapse() {
  return CW('css-margincollapse', {
    code: ['h2 { margin-bottom: 30px; }', 'p  { margin-top: 20px; }', ['/* 간격: 50px가 아니라 30px */', '/* gap: 30px, not 50px */'], ['.parent { }   /* 패딩·테두리 없음 */', '.parent { }   /* no padding or border */'], '.parent > :first-child {', '  margin-top: 40px;', ['}  /* 마진이 부모 밖으로 새요 */', '}  /* the margin leaks out */'], ['.parent { display: flow-root; } /* 해결 */', '.parent { display: flow-root; } /* fix */'], '.stack { display: flex; gap: 20px; }'],
    hl: [[0, 3], [3, 4, 'warn'], [7, 1, 'ok'], [8, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'h2', X, .8, 12.0, 1.3, tint('accent', 34), 1, { off: 2 }); cl(S, 'h2l', X, 1.1, 12.0, 'h2', 'm', 1, { off: 2 });
      sw(S, 'mb', X, 2.1, 12.0, 3.0, tint('warn', 22), 1, { off: 2 }); lbl(S, 'mbl', X + 7.8, 3.2, 'margin 30', 'w', 1, { off: 2 });
      sw(S, 'mt', X, 2.1, 7.0, 2.0, tint('ok', 30), 1, { off: 2, css: 'border:.08em dashed var(--ok)' }); lbl(S, 'mtl', X + .3, 2.6, 'margin 20', 'g', 1, { off: 2 });
      sw(S, 'p', X, 5.1, 12.0, 1.3, tint('line', 14), 1, { off: 2 }); cl(S, 'pl', X, 5.4, 12.0, 'p', 'm', 1, { off: 2 });
      lbl(S, 'r1', X, 7.0, ['겹쳐서 큰 쪽 30px만 남아요', 'they overlap; only the larger 30px stays'], 'r', 1, { off: 2 });
      sw(S, 'par', X, 2.2, 12.0, 5.0, 'transparent', 2, { off: 4, css: 'border:.08em dashed var(--ink-3)' }); lbl(S, 'parl', X + .3, 6.5, '.parent', 'm', 2, { off: 4 });
      sw(S, 'ch', X + .8, 2.2, 10.4, 1.4, tint('accent', 34), 2, { off: 4 }); cl(S, 'chl', X + .8, 2.55, 10.4, ':first-child', 'm', 2, { off: 4 });
      sw(S, 'lk', X, .2, 12.0, 2.0, tint('warn', 26), 2, { off: 3 }); lbl(S, 'lkl', X + .3, .55, ['margin 40이 부모 위로 새어 나감', 'margin 40 leaks above the parent'], 'w', 2, { off: 3 });
      S.set('ch', 3, { transform: 'translateY(2.2em)' }); S.set('chl', 3, { transform: 'translateY(2.2em)' });
      sw(S, 'in3', X + .8, 2.2, 10.4, 2.2, tint('warn', 20), 3, { off: 4 }); lbl(S, 'in3l', X + 1.1, 3.2, ['마진이 부모 안에 머물러요', 'the margin stays inside'], 'g', 3, { off: 4 });
      [0, 1, 2].forEach(i => { sw(S, 'f' + i, X, 1.0 + i * 2.2, 12.0, 1.4, tint('accent', 26), 4); cl(S, 'fl' + i, X, 1.35 + i * 2.2, 12.0, 'item', 'm', 4); });
      [0, 1].forEach(i => { sw(S, 'g' + i, X, 2.4 + i * 2.2, 12.0, .8, tint('ok', 30), 4); lbl(S, 'gl' + i, X + 8.4, 2.45 + i * 2.2, 'gap 20', 'g', 4); });
      lbl(S, 'r4', X, 8.0, ['flex·grid의 gap은 상쇄되지 않아요', 'gaps in flex and grid never collapse'], 'g', 4);
    },
    notes: [['세로로 맞닿은 두 블록의 마진은 더해지지 않고 겹쳐서 큰 쪽(30px)만 남아요', 'vertical margins of adjacent blocks overlap instead of adding, leaving only the larger 30px'], ['부모에 패딩·테두리가 없으면 첫 자식의 margin-top이 부모 밖으로 새어 나가요', 'with no padding or border on the parent, the first child’s margin-top leaks outside the parent'], ['display: flow-root로 새 블록 서식 맥락을 만들면 마진이 부모 안에 머물러요', 'display: flow-root creates a new block formatting context that keeps the margin inside'], ['flex와 grid의 gap은 상쇄가 없어 간격 관리가 예측 가능해요 · 요즘은 margin 대신 gap을 써요', 'gap in flex and grid never collapses, making spacing predictable, so it is now preferred over margins']],
    fin: [['마진 상쇄: 블록 흐름에서 세로 마진끼리 합쳐져 큰 값 하나만 남는 규칙', 'margin collapsing: in block flow, adjoining vertical margins merge into the larger one', 'csx-xs csx-a'], ['가로 마진, flex·grid 아이템, absolute 요소에서는 일어나지 않아요', 'it never happens to horizontal margins, flex or grid items, or absolutely positioned elements'], ['간격은 부모의 gap으로 관리하면 상쇄를 신경 쓸 일이 없어요', 'managing spacing with the parent’s gap avoids collapsing altogether']],
    caps: [['겹치는 세로 마진', 'Overlapping vertical margins'], ['부모 밖으로 새는 마진', 'Margins leaking out'], ['flow-root', 'flow-root'], ['gap', 'gap'], ['마진 상쇄', 'Margin collapsing']]
  });
}

function sDisplay() {
  return CW('css-display', {
    code: [['div  { display: block; }   /* 한 줄 전체 */', 'div  { display: block; }   /* full line */'], ['span { display: inline; }  /* 글자처럼 */', 'span { display: inline; }  /* like text */'], ['span { width: 100px; }     /* ✗ 무시 */', 'span { width: 100px; }     /* ✗ ignored */'], '.tag { display: inline-block; }', ['.menu { display: flex; }  /* 안쪽 배치 */', '.menu { display: flex; }  /* lays out kids */'], ['.gone { display: none; }  /* 자리도 없음 */', '.gone { display: none; }  /* no space */'], ['.hide { visibility: hidden; } /* 자리 남음 */', '.hide { visibility: hidden; } /* keeps room */']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 2, 'ok'], [5, 2]],
    draw: (S) => {
      const X = 19.4;
      ['div', 'div'].forEach((t, i) => { sw(S, 'bk' + i, X, .8 + i * 1.5, 12.0, 1.2, tint('accent', 26), 1); cl(S, 'bkl' + i, X, 1.05 + i * 1.5, 12.0, 'block', 'm', 1); });
      [['span', 0, 2.6], ['span', 2.8, 2.6], ['span', 5.6, 2.6], ['span', 8.4, 2.6], ['span', 0, 2.6]].forEach(([t, x, w], i) => { const y = i < 4 ? 4.0 : 5.4; sw(S, 'il' + i, X + x, y, w, .9, tint('warn', 30), 2, { off: 3 }); cl(S, 'ill' + i, X + x, y + .1, w, 'inline', 'm', 2, { off: 3 }); });
      lbl(S, 'n2', X, 6.6, ['글자처럼 흐르고 줄바꿈 · 폭·높이 무시', 'flows like text; width and height ignored'], 'w', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => { sw(S, 'ib' + i, X + i * 4.1, 4.0, 3.8, 1.6, tint('ok', 34), 3, { off: 4 }); cl(S, 'ibl' + i, X + i * 4.1, 4.5, 3.8, 'inline-block', 'm', 3, { off: 4 }); });
      lbl(S, 'n3', X, 6.6, ['한 줄에 놓이면서 폭·높이 지정 가능', 'sits in a line but takes width and height'], 'g', 3, { off: 4, w: 12 });
      sw(S, 'v1', X, 4.0, 3.8, 1.6, tint('accent', 26), 4); sw(S, 'v2', X + 4.1, 4.0, 3.8, 1.6, 'transparent', 4, { css: 'border:.08em dashed var(--ink-3)' }); sw(S, 'v3', X + 8.2, 4.0, 3.8, 1.6, tint('accent', 26), 4);
      cl(S, 'v2l', X + 4.1, 4.5, 3.8, 'hidden', 'm', 4); lbl(S, 'n4', X, 6.6, ['visibility: hidden은 자리를 남겨요', 'visibility: hidden keeps its space'], 'a', 4); lbl(S, 'n5', X, 7.7, ['display: none은 자리까지 없어져요', 'display: none removes the space too'], 'r', 4);
    },
    notes: [['block 요소는 한 줄을 통째로 차지하고 위에서 아래로 쌓여요 · div, p, h1이 기본 block이에요', 'block elements take a whole line and stack top to bottom; div, p and h1 are block by default'], ['inline 요소는 글자처럼 옆으로 흐르다 줄바꿈해요 · width·height와 위아래 margin이 듣지 않아요', 'inline elements flow sideways like text and wrap; width, height and vertical margins have no effect'], ['inline-block은 줄 안에 놓이면서도 폭과 높이를 가질 수 있어요 · flex·grid는 자식의 배치 방식을 바꿔요', 'inline-block sits in a line yet takes a width and height; flex and grid change how children are laid out'], ['display: none은 자리까지 없애고, visibility: hidden은 보이지만 않을 뿐 자리를 남겨요', 'display: none removes the element and its space, while visibility: hidden only hides it and keeps the space']],
    fin: [['display: 바깥(주변과 어떻게 흐를지)과 안쪽(자식을 어떻게 배치할지)을 함께 정하는 속성', 'display sets both the outer behavior (how the box flows) and the inner one (how children are laid out)', 'csx-xs csx-a'], ['display: contents는 자기 상자를 없애고 자식만 남겨요', 'display: contents removes the box itself and keeps only its children'], ['숨긴 요소가 스크린 리더에 읽힐지도 함께 고려해요', 'also consider whether hidden elements are read by screen readers']],
    caps: [['block', 'block'], ['inline', 'inline'], ['inline-block', 'inline-block'], ['none과 hidden', 'none and hidden'], ['display', 'display']]
  });
}

function sPosition() {
  return CW('css-position', {
    code: ['.a { position: relative; top: 10px; }', '.card { position: relative; }', '.badge {', '  position: absolute; top: 0; right: 0;', '}', '.header { position: sticky; top: 0; }', '.fab {', '  position: fixed; right: 16px; bottom: 16px;', '}'],
    hl: [[0, 1], [1, 4, 'ok'], [5, 1, 'warn'], [6, 3]],
    draw: (S) => {
      const X = 21.2, W = 9.0, Y = .6, H = 12.6;
      sw(S, 'vp', X, Y, W, H, 'var(--ui)', 0, { css: 'border:.12em solid var(--ink-3)', r: .6 });
      sw(S, 'hd', X + .3, Y + .3, W - .6, 1.2, tint('warn', 40), 0, { css: 'z-index:6' }); cl(S, 'hdl', X + .3, Y + .55, W - .6, 'header', 'm', 0, { css: 'z-index:7' });
      sw(S, 'ghost', X + .6, Y + 2.0, 4.0, 1.4, 'transparent', 1, { css: 'border:.08em dashed var(--ink-3)' });
      sw(S, 'ra', X + .6, Y + 2.0, 4.0, 1.4, tint('accent', 40), 0); cl(S, 'ral', X + .6, Y + 2.3, 4.0, '.a', 'm', 0); S.move('ra', 1, X + 1.4, Y + 2.6); S.move('ral', 1, X + 1.4, Y + 2.9);
      sw(S, 'card', X + .6, Y + 4.0, W - 1.2, 3.4, tint('line', 12), 0); cl(S, 'cardl', X + .6, Y + 5.3, W - 1.2, '.card', 'm', 0);
      sw(S, 'bdg', X + W - 2.4, Y + 4.0, 1.8, 1.0, tint('danger', 60), 2, { css: 'z-index:3' }); cl(S, 'bdgl', X + W - 2.4, Y + 4.15, 1.8, '3', 'm', 2);
      sw(S, 'c2', X + .6, Y + 8.0, W - 1.2, 2.0, tint('line', 12), 0); sw(S, 'c3', X + .6, Y + 10.6, W - 1.2, 1.6, tint('line', 12), 0);
      ['ghost', 'ra', 'ral', 'card', 'cardl', 'bdg', 'bdgl', 'c2', 'c3'].forEach(k => { const e = S.get(k); S.move(k, 3, e.x, e.y - 3.0); });
      S.move('ra', 3, X + 1.4, Y - .4); S.move('ral', 3, X + 1.4, Y - .1); S.set('ra', 3, { opacity: '0' }); S.set('ral', 3, { opacity: '0' }); S.set('ghost', 3, { opacity: '0' });
      sw(S, 'fab', X + W - 2.2, Y + H - 2.2, 1.6, 1.6, tint('accent', 80), 4, { r: .8, css: 'z-index:3' }); cl(S, 'fabl', X + W - 2.2, Y + H - 1.95, 1.6, '+', '', 4);
    },
    notes: [['relative는 원래 자리를 기준으로 살짝 옮겨요 · 원래 자리(점선)는 그대로 비어 있어요', 'relative shifts the element from its normal spot, and the original space (dashed) stays reserved'], ['absolute는 흐름에서 빠져, 가장 가까운 position이 있는 조상(.card) 기준으로 놓여요', 'absolute leaves the flow and is placed relative to the nearest positioned ancestor, here .card'], ['sticky는 평소엔 흐름대로 있다가 스크롤로 top: 0에 닿으면 그 자리에 붙어요', 'sticky behaves normally until scrolling reaches top: 0, then it sticks there'], ['fixed는 화면(뷰포트) 기준이라 스크롤해도 늘 같은 자리에 있어요', 'fixed is positioned against the viewport and stays put while scrolling']],
    fin: [['position: 요소를 흐름에서 어떻게 배치할지 · static(기본), relative, absolute, fixed, sticky', 'position chooses how an element is placed relative to the flow: static (default), relative, absolute, fixed or sticky', 'csx-xs csx-a'], ['absolute의 기준을 만들려면 부모에 position: relative를 줘요', 'give the parent position: relative to make it the containing block for absolute children'], ['조상에 transform이 있으면 fixed도 그 조상 기준이 되니 주의해요', 'an ancestor with transform makes even fixed elements position against it']],
    caps: [['relative', 'relative'], ['absolute', 'absolute'], ['sticky', 'sticky'], ['fixed', 'fixed'], ['position', 'position']]
  });
}

function sZindex() {
  return CW('css-zindex', {
    code: ['.a { position: relative; z-index: 1; }', '.b { position: relative; z-index: 2; }', ['.a { opacity: .99; }  /* 쌓임 맥락 생성 */', '.a { opacity: .99; }  /* new context */'], '.a .menu { z-index: 9999; }', ['/* 그래도 .b 아래에 깔려요 */', '/* still under .b */'], '.dialog { isolation: isolate; }', '<dialog> · popover  /* 최상위 레이어 */'].map((t, i) => i === 6 ? [t, '<dialog> · popover  /* top layer */'] : t),
    hl: [[0, 2], [2, 3, 'danger'], [5, 1], [6, 1, 'ok']],
    draw: (S) => {
      const X = 19.6;
      sw(S, 'A', X, 1.0, 7.4, 5.4, tint('accent', 20), 0, { css: 'border:.1em solid var(--accent);z-index:3' }); lbl(S, 'Al', X + .3, 1.1, '.a  z 1', 'm a', 0);
      sw(S, 'B', X + 4.6, 3.6, 7.4, 5.4, tint('warn', 30), 0, { css: 'border:.1em solid var(--warn);z-index:4' }); lbl(S, 'Bl', X + 4.9, 8.0, '.b  z 2', 'm w', 0);
      sw(S, 'M', X + 1.0, 4.2, 4.8, 2.0, tint('danger', 40), 2, { css: 'z-index:3' }); lbl(S, 'Ml', X + 1.15, 4.35, '.menu 9999', 'm r', 2);
      lbl(S, 'n1', X, 10.0, ['같은 맥락 안에서는 z-index 큰 쪽이 위', 'within one context, the higher z-index wins'], 'a', 1, { off: 2, w: 12 });
      frame(S, 'ctx', X - .2, .8, 7.8, 6.6, 'danger', 2, { dash: 1, w: .08 });
      lbl(S, 'n2', X, 10.0, ['.a 안의 9999는 .a 상자 안에서만 비교돼요', '9999 inside .a only competes inside .a'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 10.0, ['opacity·transform·filter도 맥락을 만들어요', 'opacity, transform and filter create contexts'], 'w', 3, { off: 4, w: 12 }); lbl(S, 'n3b', X, 11.1, ['isolation: isolate로 의도적으로 만들어요', 'create one on purpose with isolation: isolate'], '', 3, { off: 4 });
      lbl(S, 'n4', X, 10.0, ['dialog·popover는 최상위 레이어로 올라가요', 'dialog and popover rise to the top layer'], 'g', 4, { w: 12 }); lbl(S, 'n4b', X, 11.1, ['z-index 경쟁이 필요 없어요', 'no z-index war needed'], '', 4);
    },
    notes: [['position이 있는 요소끼리는 z-index가 큰 쪽이 위에 그려져요 · .b(2)가 .a(1) 위예요', 'among positioned elements the higher z-index draws on top: .b (2) over .a (1)'], ['그런데 .a가 쌓임 맥락을 만들면, 안쪽 .menu의 z-index 9999는 .a 안에서만 비교돼 .b 아래에 깔려요', 'once .a creates a stacking context, its .menu with z-index 9999 competes only inside .a and stays under .b'], ['opacity < 1, transform, filter, position + z-index 등이 쌓임 맥락을 만들고, isolation: isolate로 일부러 만들 수도 있어요', 'opacity below 1, transform, filter and positioned z-index all create contexts, and isolation: isolate makes one deliberately'], ['<dialog>와 popover는 문서 전체 위의 최상위 레이어에 그려져 z-index 싸움에서 벗어나요', '<dialog> and popovers render in the top layer above the whole document, escaping z-index wars']],
    fin: [['쌓임 맥락: z-index가 비교되는 범위 · 부모 맥락의 순서를 자식이 넘어설 수 없어요', 'a stacking context is the scope in which z-index is compared; children can never escape their parent context’s order', 'csx-xs csx-a'], ['“z-index 9999가 안 먹어요”의 원인은 거의 항상 조상의 쌓임 맥락이에요', '“z-index 9999 does nothing” is almost always an ancestor’s stacking context'], ['z-index는 1, 10, 100처럼 몇 단계로 정해 토큰으로 관리해요', 'manage z-index as a few named tokens such as 1, 10 and 100']],
    caps: [['z-index 비교', 'Comparing z-index'], ['갇힌 9999', 'A trapped 9999'], ['맥락을 만드는 속성', 'What creates contexts'], ['최상위 레이어', 'The top layer'], ['z-index와 쌓임 맥락', 'z-index and stacking contexts']]
  });
}

function sOverflow() {
  return CW('css-overflow', {
    code: ['.box { height: 120px; }', ['/* 기본 overflow: visible → 넘쳐요 */', '/* default overflow: visible → spills */'], '.box { overflow: hidden; }', ['.box { overflow: auto; }  /* 필요하면 스크롤 */', '.box { overflow: auto; }  /* scrolls */'], '.title {', '  white-space: nowrap;', '  overflow: hidden;', '  text-overflow: ellipsis;', '}'],
    hl: [[0, 2, 'warn'], [2, 1], [3, 1, 'ok'], [4, 5, 'ok']],
    draw: (S) => {
      const X = 19.6, W = 9.0;
      sw(S, 'bx', X, .8, W, 4.6, 'var(--ui)', 0, { css: 'border:.12em solid var(--ink-3);z-index:3' });
      ['줄 하나', '줄 둘', '줄 셋', '줄 넷', '줄 다섯', '줄 여섯'].forEach((t, i) => T(S, 'ln' + i, X + .4, 1.0 + i * 1.05, [t, ['line one', 'line two', 'line three', 'line four', 'line five', 'line six'][i]], 'csx-xs', 0, { css: 'z-index:4' }));
      [4, 5].forEach(i => { S.set('ln' + i, 2, { opacity: '0' }); S.set('ln' + i, 4, { opacity: '0' }); });
      lbl(S, 'v1', X, 7.6, ['상자 밖으로 글이 넘쳐 다른 요소를 덮어요', 'text spills out and covers neighbors'], 'w', 1, { off: 2, w: 12 });
      lbl(S, 'v2', X, 7.6, ['hidden: 넘친 부분을 잘라 버려요', 'hidden: the overflow is clipped'], 'r', 2, { off: 3, w: 12 });
      sw(S, 'sb', X + W - .5, .9, .35, 2.2, tint('ink-3', 60), 3, { off: 4, r: .2, css: 'z-index:5' });
      lbl(S, 'v3', X, 7.6, ['auto: 넘칠 때만 스크롤 막대가 생겨요', 'auto: a scrollbar appears only when needed'], 'g', 3, { off: 4, w: 12 });
      S.set('bx', 4, { opacity: '0' }); [0, 1, 2, 3].forEach(i => S.set('ln' + i, 4, { opacity: '0' }));
      sw(S, 'tt', X, 1.4, W, 1.3, 'var(--ui)', 4, { css: 'border:.08em solid var(--line)' }); T(S, 'ttl', X + .4, 1.65, ['아주 긴 상품 이름이 한 줄을 넘…', 'A very long product name that ov…'], 'csx-xs', 4);
      lbl(S, 'v4', X, 3.4, ['nowrap + hidden + ellipsis = 말줄임', 'nowrap + hidden + ellipsis = …'], 'g', 4, { w: 12 }); lbl(S, 'v5', X, 4.5, ['여러 줄은 line-clamp를 써요', 'use line-clamp for several lines'], '', 4);
    },
    notes: [['높이가 정해진 상자에 내용이 많으면 기본값 overflow: visible이라 상자 밖으로 흘러넘쳐요', 'with a fixed height and too much content, the default overflow: visible lets it spill out of the box'], ['overflow: hidden은 넘친 부분을 잘라 버려요 · 내용이 사라지는 것이니 신중하게 써요', 'overflow: hidden clips the excess, which hides content, so use it carefully'], ['overflow: auto는 넘칠 때만 스크롤 막대를 만들어요 · 항상 보이게 하려면 scroll', 'overflow: auto adds a scrollbar only when needed; scroll shows it always'], ['한 줄 말줄임은 nowrap, hidden, text-overflow: ellipsis 세 가지를 함께 써요', 'a one-line ellipsis needs nowrap, hidden and text-overflow: ellipsis together']],
    fin: [['overflow: 상자보다 큰 내용을 visible·hidden·clip·scroll·auto 중 어떻게 처리할지', 'overflow decides what happens to content larger than the box: visible, hidden, clip, scroll or auto', 'csx-xs csx-a'], ['overflow: hidden은 새 블록 서식 맥락을 만들고 sticky를 막기도 해요', 'overflow: hidden creates a block formatting context and can break sticky positioning'], ['flex 자식의 말줄임이 안 되면 min-width: 0을 함께 줘요', 'if ellipsis fails inside a flex child, add min-width: 0']],
    caps: [['넘치는 내용', 'Overflowing content'], ['hidden', 'hidden'], ['auto 스크롤', 'Scrolling with auto'], ['말줄임', 'Ellipsis'], ['overflow', 'overflow']]
  });
}

function sUnits() {
  return CW('css-units', {
    code: ['html { font-size: 16px; }', ['.a { padding: 2rem; }  /* 32px · 루트 기준 */', '.a { padding: 2rem; }  /* 32px, from root */'], ['.b { padding: 2em; }   /* 자기 글자 기준 */', '.b { padding: 2em; }   /* own font size */'], ['.c { width: 50%; }     /* 부모 폭 기준 */', '.c { width: 50%; }     /* of the parent */'], ['.hero { height: 100dvh; } /* 화면 높이 */', '.hero { height: 100dvh; } /* the screen */'], ['p { max-width: 65ch; }   /* 글자 65개 */', 'p { max-width: 65ch; }   /* 65 characters */'], 'h1 { font-size: clamp(24px, 5vw, 48px); }'],
    hl: [[0, 2], [2, 1, 'warn'], [3, 2], [5, 2, 'ok']],
    draw: (S) => {
      const X = 19.4;
      [0, 1, 2].forEach(i => { sw(S, 'r' + i, X + i * .9, .8 + i * .9, 6.0 - i * 1.8, 6.0 - i * 1.8, tint('accent', 14 + i * 10), 1, { off: 2, css: 'border:.08em solid var(--accent)' }); });
      lbl(S, 'rl', X, 7.4, ['rem: 중첩돼도 늘 16px 기준', 'rem: always 16px, however nested'], 'a', 1, { off: 2 });
      [0, 1, 2].forEach(i => { const s = [0, 1.2, 3.6][i]; sw(S, 'e' + i, X + s * .5, .8 + s * .5, 9.0 - s, 7.0 - s, tint('warn', 14 + i * 10), 2, { off: 3, css: 'border:.08em solid var(--warn)' }); });
      lbl(S, 'el', X, 8.4, ['em: 글자 크기가 커지면 같이 커져요', 'em: grows with the font size'], 'w', 2, { off: 3 }); lbl(S, 'el2', X, 9.5, ['font-size에 em을 쓰면 중첩 때 누적돼요', 'em font sizes compound when nested'], 'r', 2, { off: 3 });
      sw(S, 'ph', X + 3.6, .8, 4.6, 8.0, 'var(--ui)', 3, { off: 4, css: 'border:.12em solid var(--ink-3)', r: .6 }); sw(S, 'hero', X + 3.8, 1.0, 4.2, 7.6, tint('accent', 30), 3, { off: 4, r: .4 }); cl(S, 'herol', X + 3.8, 4.4, 4.2, '100dvh', 'm', 3, { off: 4 });
      lbl(S, 'vl', X, 9.4, ['vw·vh: 화면 크기의 1%', 'vw and vh: 1% of the viewport'], 'a', 3, { off: 4 }); lbl(S, 'vl2', X, 10.5, ['dvh: 모바일 주소창이 바뀌어도 정확', 'dvh: correct as mobile toolbars change'], 'g', 3, { off: 4 });
      lbl(S, 'cl1', X, 1.0, ['ch: 글자 “0”의 폭 · 읽기 좋은 줄 길이', 'ch: the width of “0”, for readable lines'], 'g', 4, { w: 12 });
      hl(S, 'chb', X, X + 11.0, 2.6, 'ok', 4, { w: .12 }); lbl(S, 'chl', X + 4.0, 2.8, '65ch', 'm g', 4);
      lbl(S, 'cl2', X, 4.0, ['clamp(최소, 선호, 최대)', 'clamp(min, preferred, max)'], 'a', 4); lbl(S, 'cl3', X, 5.1, ['화면에 따라 부드럽게, 범위 안에서', 'fluid with the screen, within bounds'], '', 4);
    },
    notes: [['px는 고정 크기, rem은 루트(html) 글자 크기의 배수예요 · 중첩돼도 늘 같은 기준이라 예측하기 쉬워요', 'px is fixed and rem multiplies the root font size, which stays the same however deep the nesting'], ['em은 자기 글자 크기 기준이라, font-size에 em을 쓰면 중첩될수록 누적돼 커져요', 'em is relative to the element’s own font size, so em font sizes compound as they nest'], ['%는 부모 기준, vw·vh는 화면의 1%예요 · 모바일에선 주소창 변화를 반영하는 dvh가 정확해요', '% is relative to the parent and vw and vh to 1% of the viewport; on mobile, dvh tracks the changing toolbars'], ['ch는 글자 폭 기준이라 본문 줄 길이에, clamp()는 최소·최대를 지키는 유동적인 크기에 써요', 'ch is based on character width, ideal for line length, and clamp() gives fluid sizes within bounds']],
    fin: [['단위: 절대(px)와 상대(rem, em, %, vw, vh, dvh, ch) · 상대 단위가 접근성과 반응형에 유리해요', 'units are absolute (px) or relative (rem, em, %, vw, vh, dvh, ch); relative units help accessibility and responsiveness', 'csx-xs csx-a'], ['글자 크기는 rem으로 두면 사용자의 브라우저 글꼴 설정을 존중해요', 'rem font sizes respect the user’s browser font setting'], ['컴포넌트 안의 여백을 em으로 두면 글자 크기에 맞춰 함께 커져요', 'em padding inside components scales along with their text']],
    caps: [['rem', 'rem'], ['em의 누적', 'Compounding em'], ['%와 뷰포트 단위', 'Percent and viewport units'], ['ch와 clamp()', 'ch and clamp()'], ['CSS 단위', 'CSS units']]
  });
}
/* ===== CSS · 3. layout ===== */
function sFlex() {
  return CW('css-flex', {
    code: ['.row {', '  display: flex;', ['  flex-direction: row;     /* 주축: 가로 */', '  flex-direction: row;     /* main axis: x */'], '  justify-content: space-between;', ['  align-items: center;     /* 교차축 */', '  align-items: center;     /* cross axis */'], '  gap: 12px;', '}', '.col { flex-direction: column; }'],
    hl: [[1, 2], [3, 1, 'ok'], [4, 1, 'ok'], [7, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, Y = 1.0, W = 12.0, H = 7.0, w = 2.6, hs = [1.4, 2.6, 2.0];
      frame(S, 'box', X, Y, W, H, 'ink-3', 0, { w: .1 });
      const P = [
        [[X + .3, Y + .3], [X + .3, Y + 1.9], [X + .3, Y + 4.7]],
        [[X + .3, Y + .3], [X + 3.5, Y + .3], [X + 6.7, Y + .3]],
        [[X + .3, Y + .3], [X + 4.7, Y + .3], [X + 9.1, Y + .3]],
        [[X + .3, Y + 2.8], [X + 4.7, Y + 2.2], [X + 9.1, Y + 2.5]],
        [[X + 4.7, Y + .3], [X + 4.7, Y + 2.2], [X + 4.7, Y + 4.7]]];
      [0, 1, 2].forEach(i => { chip(S, 'it' + i, P[0][i][0], P[0][i][1], w, '' + (i + 1), ['accent', 'warn', 'ok'][i], 0, { h: hs[i], pct: 30 }); for (let st = 1; st <= 4; st++) S.move('it' + i, st, P[st][i][0], P[st][i][1]); });
      ar(S, 'mx', [X, Y + H + .6], [X + W, Y + H + .6], 'accent', 1, { h: .1, off: 4 }); lbl(S, 'mxl', X, Y + H + .9, ['주축 →', 'main axis →'], 'a', 1, { off: 4 });
      ar(S, 'cx', [X + W + .5, Y], [X + W + .5, Y + H], 'warn', 3, { h: .1, off: 4 });
      ar(S, 'my', [X + W + .5, Y], [X + W + .5, Y + H], 'accent', 4, { h: .1 }); lbl(S, 'myl', X, Y + H + .9, ['column: 주축이 세로로 바뀌어요', 'column: the main axis turns vertical'], 'a', 4);
      lbl(S, 'l1', X, Y + H + 2.0, ['자식들이 한 줄로 나란히', 'children line up in a row'], '', 1, { off: 2 });
      lbl(S, 'l2', X, Y + H + 2.0, ['justify-content: 주축 방향 배치', 'justify-content: along the main axis'], 'g', 2, { off: 3 });
      lbl(S, 'l3', X, Y + H + 2.0, ['align-items: 교차축 방향 정렬', 'align-items: along the cross axis'], 'w', 3, { off: 4 });
    },
    notes: [['display: flex를 주면 자식들이 한 줄(주축)로 나란히 놓여요 · 기본 주축은 가로예요', 'display: flex lines the children up along one line, the main axis, which is horizontal by default'], ['justify-content는 주축 방향으로 남는 공간을 나눠요 · space-between은 양 끝에 붙이고 사이를 균등하게', 'justify-content distributes leftover space along the main axis; space-between pins the ends and spaces the rest evenly'], ['align-items는 교차축(세로)으로 정렬해요 · 높이가 달라도 가운데에 맞춰요', 'align-items aligns on the cross axis, centering items of different heights'], ['flex-direction: column이면 주축과 교차축이 서로 바뀌어요 · justify와 align의 방향도 함께 바뀌어요', 'flex-direction: column swaps the axes, and with them the directions of justify and align']],
    fin: [['Flexbox: 한 방향(행 또는 열)으로 아이템을 배치·정렬하는 1차원 레이아웃', 'Flexbox is a one-dimensional layout that places and aligns items along a row or a column', 'csx-xs csx-a'], ['justify는 주축, align은 교차축 · 이것만 기억하면 헷갈리지 않아요', 'justify is the main axis, align the cross axis; remember that and the rest follows'], ['flex-wrap: wrap이면 넘치는 아이템이 다음 줄로 내려가요', 'flex-wrap: wrap moves overflowing items onto the next line']],
    caps: [['display: flex', 'display: flex'], ['justify-content', 'justify-content'], ['align-items', 'align-items'], ['축 바꾸기', 'Swapping axes'], ['Flexbox의 두 축', 'The two axes of Flexbox']]
  });
}

function sFlexGrow() {
  return CW('css-flexgrow', {
    code: [['.side { flex: 0 0 200px; } /* 고정 */', '.side { flex: 0 0 200px; } /* fixed */'], ['.main { flex: 1; }   /* 남은 공간 전부 */', '.main { flex: 1; }   /* all the rest */'], '.a { flex-grow: 1; }', '.b { flex-grow: 2; }', ['.logo { flex-shrink: 0; } /* 안 줄어요 */', '.logo { flex-shrink: 0; } /* never shrinks */'], ['.text { min-width: 0; }  /* 말줄임 허용 */', '.text { min-width: 0; }  /* allows ellipsis */']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1]],
    draw: (S) => {
      const X = 19.4, W = 12.0;
      frame(S, 'f1', X, 1.0, W, 1.8, 'ink-3', 1, { off: 2, w: .08 });
      chip(S, 'sd', X + .2, 1.2, 3.6, '200px', 'warn', 1, { off: 2, h: 1.4 }); chip(S, 'mn', X + 4.0, 1.2, W - 4.2, ['.main  남은 전부', '.main  the rest'], 'accent', 1, { off: 2, h: 1.4 });
      lbl(S, 'l1', X, 3.4, ['창을 넓히면 main만 늘어나요', 'widen the window and only main grows'], 'a', 1, { off: 2 });
      frame(S, 'f2', X, 1.0, W, 1.8, 'ink-3', 2, { off: 3, w: .08 });
      chip(S, 'ga', X + .2, 1.2, 3.73, '.a  ×1', 'ok', 2, { off: 3, h: 1.4 }); chip(S, 'gb', X + 4.13, 1.2, 7.67, '.b  ×2', 'accent', 2, { off: 3, h: 1.4 });
      lbl(S, 'l2', X, 3.4, ['남는 공간을 1 : 2로 나눠 가져요', 'leftover space is shared 1 : 2'], 'g', 2, { off: 3 });
      frame(S, 'f3a', X, 1.0, W, 1.8, 'ink-3', 3, { off: 4, w: .08 }); chip(S, 'lg', X + .2, 1.2, 3.0, '.logo', 'warn', 3, { off: 4, h: 1.4 }); chip(S, 'nv', X + 3.4, 1.2, 8.4, 'nav', 'line', 3, { off: 4, h: 1.4 });
      frame(S, 'f3b', X, 3.6, 7.6, 1.8, 'ink-3', 3, { off: 4, w: .08 }); chip(S, 'lg2', X + .2, 3.8, 3.0, '.logo', 'warn', 3, { off: 4, h: 1.4 }); chip(S, 'nv2', X + 3.4, 3.8, 4.0, 'nav', 'line', 3, { off: 4, h: 1.4 });
      lbl(S, 'l3', X, 6.0, ['좁아지면 nav만 줄고 로고는 그대로', 'when narrow, only nav shrinks'], 'w', 3, { off: 4 });
      frame(S, 'f4', X, 1.0, W, 1.8, 'ink-3', 4, { w: .08 }); chip(S, 'av', X + .2, 1.2, 1.6, 'img', 'line', 4, { h: 1.4 }); chip(S, 'tx', X + 2.0, 1.2, 7.6, ['아주 긴 제목이 들어가는 영역…', 'A very long title goes here…'], 'accent', 4, { h: 1.4 }); chip(S, 'bt', X + 9.8, 1.2, 2.0, 'btn', 'ok', 4, { h: 1.4 });
      lbl(S, 'l4', X, 3.4, ['flex 아이템은 기본 min-width: auto', 'flex items default to min-width: auto'], 'a', 4); lbl(S, 'l5', X, 4.5, ['0으로 바꿔야 줄어들고 말줄임이 돼요', 'set it to 0 to let text shrink and ellipsize'], 'g', 4, { w: 12 });
    },
    notes: [['flex: 0 0 200px은 늘지도 줄지도 않는 200px, flex: 1은 남은 공간을 모두 차지해요', 'flex: 0 0 200px neither grows nor shrinks, while flex: 1 takes all remaining space'], ['flex-grow는 남는 공간을 나누는 비율이에요 · 1과 2면 1 : 2로 나눠 가져요', 'flex-grow is the ratio for sharing leftover space, so 1 and 2 split it 1 : 2'], ['공간이 모자라면 flex-shrink 비율로 줄어요 · 0이면 줄지 않아서 로고가 찌그러지지 않아요', 'when space runs short, items shrink by flex-shrink; 0 keeps the logo from being squashed'], ['flex 아이템은 기본 min-width가 내용 크기라, 긴 글은 min-width: 0을 줘야 줄어들어요', 'flex items default to a content-sized minimum width, so long text needs min-width: 0 to shrink']],
    fin: [['flex: grow shrink basis · 기본 크기(basis)에서 시작해 남으면 grow, 모자라면 shrink 비율로 조정', 'flex is grow, shrink and basis: start from the basis, then grow or shrink by ratio as space allows', 'csx-xs csx-a'], ['flex: 1은 flex: 1 1 0%의 줄임말이에요', 'flex: 1 is shorthand for flex: 1 1 0%'], ['같은 비율로 나누고 싶다면 basis를 0으로 둬야 내용 길이에 휘둘리지 않아요', 'for exactly equal shares, keep the basis at 0 so content length does not skew them']],
    caps: [['고정과 채우기', 'Fixed and fill'], ['flex-grow 비율', 'flex-grow ratios'], ['flex-shrink', 'flex-shrink'], ['min-width: 0', 'min-width: 0'], ['flex-grow·shrink·basis', 'flex-grow, shrink and basis']]
  });
}

function sGrid() {
  return CW('css-grid', {
    code: ['.grid {', '  display: grid;', '  grid-template-columns: 200px 1fr 1fr;', '  grid-template-rows: auto 1fr;', '  gap: 16px;', '}', ['.wide { grid-column: 1 / -1; } /* 전체 폭 */', '.wide { grid-column: 1 / -1; } /* full row */'], '.tall { grid-row: span 2; }'],
    hl: [[2, 1], [3, 2, 'ok'], [6, 1, 'warn'], [7, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, cw = [3.6, 3.8, 3.8], cx = [X, X + 4.0, X + 8.2], ry = [1.8, 3.6], rh = [1.4, 3.6];
      cx.forEach((x, i) => { sw(S, 'col' + i, x, 1.8, cw[i], 5.4, tint(i ? 'accent' : 'warn', 14), 1, { off: 2 }); cl(S, 'cl' + i, x, .7, cw[i], ['200px', '1fr', '1fr'][i], i ? 'm a' : 'm w', 1, { off: 3 }); });
      cx.forEach((x, i) => ry.forEach((y, j) => chip(S, 'c' + i + j, x, y, cw[i], '', 'line', 2, { h: rh[j], pct: 10 })));
      sw(S, 'g1', X + 3.6, 1.8, .4, 5.4, tint('ok', 50), 2, { off: 3 }); lbl(S, 'gl', X, 7.8, ['gap 16px · fr은 남은 공간의 비율', 'gap 16px; fr shares the leftover space'], 'g', 2, { off: 3 });
      [0, 1, 2, 3].forEach(i => { const x = i < 3 ? cx[i] - .2 : X + 12.0 - .2; vl(S, 'ln' + i, x + .2, 1.4, 7.4, 'ink-3', 3, { w: .06, dash: 1 }); cl(S, 'lnl' + i, x - .3, .5, 1.0, '' + (i + 1), 'm a', 3); });
      ['c00', 'c10', 'c20'].forEach(k => S.set(k, 3, { opacity: '0' }));
      chip(S, 'wide', X, 1.8, 12.0, '.wide  1 / -1', 'warn', 3, { h: 1.4, pct: 36 });
      ['c01'].forEach(k => S.set(k, 4, { opacity: '0' }));
      chip(S, 'tall', X, 3.6, 3.6, '.tall', 'ok', 4, { h: 3.6, pct: 36 }); lbl(S, 'tl', X, 7.8, ['span 2: 두 칸을 차지해요', 'span 2 occupies two tracks'], 'g', 4);
      lbl(S, 'wl', X, 7.8, ['줄 번호 1에서 -1(끝)까지', 'from line 1 to line -1 (the end)'], 'w', 3, { off: 4 });
    },
    notes: [['grid-template-columns로 열을 정해요 · 200px 고정 열 하나와 1fr 두 개', 'grid-template-columns defines the columns: one fixed 200px column and two 1fr columns'], ['fr은 남은 공간을 나누는 비율이고, gap은 칸 사이의 간격이에요', 'fr shares the remaining space by ratio, and gap sets the space between tracks'], ['칸 사이의 선에는 1부터 번호가 붙어요 · grid-column: 1 / -1은 처음 선부터 마지막 선까지', 'grid lines are numbered from 1, so grid-column: 1 / -1 spans from the first line to the last'], ['span 2는 시작 위치에서 두 칸을 차지해요 · 아이템을 원하는 칸에 직접 배치해요', 'span 2 takes two tracks from its start, placing items exactly where you want']],
    fin: [['Grid: 행과 열을 함께 다루는 2차원 레이아웃 · 칸을 먼저 정하고 아이템을 배치해요', 'Grid is a two-dimensional layout: define rows and columns first, then place items', 'csx-xs csx-a'], ['한 방향 정렬은 Flexbox, 행·열이 함께 맞아야 하면 Grid', 'use Flexbox for one direction and Grid when rows and columns must align'], ['subgrid로 자식이 부모 그리드의 선을 이어받을 수 있어요', 'subgrid lets children inherit the parent grid’s lines']],
    caps: [['열 정의', 'Defining columns'], ['fr과 gap', 'fr and gap'], ['줄 번호로 배치', 'Placing by line numbers'], ['span', 'span'], ['Grid 기초', 'Grid basics']]
  });
}

function sGridAreas() {
  return CW('css-gridareas', {
    lh: 1.0,
    code: ['.page {', '  display: grid;', '  grid-template-columns: 220px 1fr;', '  grid-template-areas:', '    "head head"', '    "side main"', '    "foot foot";', '}', 'header { grid-area: head; }', '@media (width < 600px) {', '  .page { grid-template-columns: 1fr;', '    grid-template-areas: "head" "main"', '      "side" "foot"; }', '}'],
    hl: [[3, 4], [8, 1, 'ok'], null, [9, 5, 'warn']],
    draw: (S) => {
      const X = 19.6, D = { head: [X, .8, 11.6, 1.4], side: [X, 2.6, 3.6, 5.6], main: [X + 4.0, 2.6, 7.6, 5.6], foot: [X, 8.6, 11.6, 1.4] }, M = { head: [X + 3.0, .8, 5.6, 1.2], main: [X + 3.0, 2.3, 5.6, 3.8], side: [X + 3.0, 6.4, 5.6, 1.8], foot: [X + 3.0, 8.5, 5.6, 1.2] }, C = { head: 'warn', side: 'ok', main: 'accent', foot: 'line' };
      Object.keys(D).forEach(k => { const [x, y, w, h] = D[k]; chip(S, 'a' + k, x, y, w, k, C[k], 1, { h, pct: 30 }); S.set('a' + k, 0, { width: w + 'em', height: h + 'em' }); const [mx, my, mw, mh] = M[k]; S.move('a' + k, 4, mx, my, { width: mw + 'em', height: mh + 'em' }); });
      lbl(S, 'l1', X, 10.6, ['문자열 지도 그대로 칸이 나뉘어요', 'the string map becomes the layout'], 'a', 1, { off: 2 });
      lbl(S, 'l2', X, 10.6, ['grid-area 이름으로 각자 자리를 찾아가요', 'each item finds its place by name'], 'g', 2, { off: 3 });
      lbl(S, 'l3', X, 10.6, ['HTML 순서와 화면 배치가 분리돼요', 'source order and visual layout are separate'], '', 3, { off: 4 });
      frame(S, 'mob', X + 2.7, .5, 6.2, 9.5, 'ink-3', 4, { w: .1, r: .6 }); lbl(S, 'l4', X, 10.6, ['좁은 화면: 지도만 바꿔 세로로 재배치', 'narrow screens: change the map, restack'], 'w', 4);
    },
    notes: [['grid-template-areas에 문자열로 그린 지도가 그대로 칸 배치가 돼요 · 같은 이름이 이어지면 한 영역이에요', 'the strings in grid-template-areas map the layout directly; repeated names form one area'], ['각 요소에 grid-area: head처럼 이름을 주면 지도에서 자기 자리를 찾아가요', 'giving each element a name such as grid-area: head places it on the map'], ['HTML 순서와 상관없이 배치할 수 있지만, 읽는 순서와 너무 다르면 접근성이 나빠져요', 'layout no longer depends on source order, though straying far from reading order hurts accessibility'], ['미디어 쿼리에서 지도만 바꾸면 같은 HTML이 모바일에선 세로로 재배치돼요', 'changing only the map in a media query restacks the same HTML vertically on mobile']],
    fin: [['grid-template-areas: 이름 붙인 영역으로 페이지 골격을 그림처럼 정의하는 방법', 'grid-template-areas defines a page skeleton visually with named areas', 'csx-xs csx-a'], ['빈칸은 점(.)으로 표시해요', 'empty cells are marked with a dot (.)'], ['영역은 직사각형이어야 해요 · ㄱ자 모양은 안 돼요', 'areas must be rectangles; L-shapes are not allowed']],
    caps: [['문자열 지도', 'A map of strings'], ['이름으로 배치', 'Placing by name'], ['순서와 배치의 분리', 'Order versus layout'], ['반응형 재배치', 'Responsive restacking'], ['grid-template-areas', 'grid-template-areas']]
  });
}

function sAutoFit() {
  return CW('css-autofit', {
    code: ['.cards {', '  display: grid;', '  grid-template-columns:', '    repeat(auto-fill, minmax(200px, 1fr));', '  gap: 16px;', '}', ['/* 미디어 쿼리 없이 열 수가 바뀌어요 */', '/* columns change with no media query */'], '.few { grid-template-columns:', '  repeat(auto-fit, minmax(200px, 1fr)); }'],
    hl: [[3, 1], [2, 2, 'ok'], [6, 1, 'ok'], [7, 2, 'warn']],
    draw: (S) => {
      const X = 19.4, G = .4;
      chip(S, 'mm1', X, 1.0, 3.4, 'min 200px', 'warn', 1, { off: 2, h: 1.6 }); ar(S, 'mma', [X + 3.6, 1.8], [X + 11.8, 1.8], 'accent', 1, { off: 2, h: .1 }); lbl(S, 'mml', X + 3.8, 2.2, ['남으면 1fr로 늘어나요', 'then stretches up to 1fr'], 'a', 1, { off: 2 });
      lbl(S, 'mm2', X, 3.4, ['칸이 200px보다 작아지면 줄을 바꿔요', 'below 200px, items wrap to a new row'], '', 1, { off: 2, w: 12 });
      const grid = (p, x0, W, n, st, off, cols) => { const w = (W - (cols - 1) * G) / cols; frame(S, p + 'f', x0 - .2, .8, W + .4, 7.6, 'ink-3', st, { off, w: .08 }); for (let i = 0; i < n; i++) chip(S, p + i, x0 + (i % cols) * (w + G), 1.0 + Math.floor(i / cols) * 1.5, w, '' + (i + 1), 'accent', st, { off, h: 1.2, pct: 24 }); };
      grid('w', X, 11.6, 8, 2, 3, 4); lbl(S, 'wl', X, 9.0, ['넓은 화면: 4열', 'wide screen: 4 columns'], 'g', 2, { off: 3 });
      grid('n', X + 2.0, 7.6, 8, 3, 4, 2); lbl(S, 'nl', X, 9.0, ['좁은 화면: 2열 · 저절로 줄바꿈', 'narrow screen: 2 columns, wrapping itself'], 'g', 3, { off: 4 });
      const w4 = (11.6 - 3 * G) / 4; frame(S, 'ff', X - .2, .8, 12.0, 1.6, 'ink-3', 4, { w: .08 });
      [0, 1].forEach(i => chip(S, 'fa' + i, X + i * (w4 + G), 1.0, w4, '' + (i + 1), 'accent', 4, { h: 1.2 })); [2, 3].forEach(i => sw(S, 'fe' + i, X + i * (w4 + G), 1.0, w4, 1.2, 'transparent', 4, { css: 'border:.08em dashed var(--ink-3)' }));
      lbl(S, 'fl', X, 2.7, ['auto-fill: 빈 칸을 남겨 둬요', 'auto-fill keeps empty tracks'], 'w', 4);
      frame(S, 'tf', X - .2, 4.0, 12.0, 1.6, 'ink-3', 4, { w: .08 }); [0, 1].forEach(i => chip(S, 'ta' + i, X + i * 6.0, 4.2, 5.6, '' + (i + 1), 'ok', 4, { h: 1.2 }));
      lbl(S, 'tl', X, 5.9, ['auto-fit: 빈 칸을 접고 아이템을 늘려요', 'auto-fit collapses them and stretches items'], 'g', 4, { w: 12 });
    },
    notes: [['minmax(200px, 1fr)은 “최소 200px, 남으면 같은 비율로 늘어남”이라는 뜻이에요', 'minmax(200px, 1fr) means at least 200px, stretching evenly when there is room'], ['repeat(auto-fill, …)은 들어갈 수 있는 만큼 열을 만들어요 · 넓은 화면이면 4열', 'repeat(auto-fill, …) creates as many columns as fit, four on a wide screen'], ['화면이 좁아지면 열 수가 저절로 줄어 2열이 돼요 · 미디어 쿼리가 필요 없어요', 'as the screen narrows, the column count drops to two by itself, with no media query'], ['아이템이 적을 때 auto-fill은 빈 칸을 남기고, auto-fit은 빈 칸을 접어 아이템을 늘려요', 'with few items, auto-fill leaves empty tracks while auto-fit collapses them and stretches the items']],
    fin: [['repeat(auto-fill/auto-fit, minmax()): 미디어 쿼리 없이 화면 폭에 맞춰 열 수가 바뀌는 그리드', 'repeat(auto-fill or auto-fit, minmax()) makes the column count follow the width without media queries', 'csx-xs csx-a'], ['카드 목록, 갤러리, 상품 그리드의 단골 패턴이에요', 'a staple for card lists, galleries and product grids'], ['min 값이 컨테이너보다 크면 넘칠 수 있어 min(200px, 100%)로 감싸요', 'if the minimum exceeds the container it overflows, so wrap it as min(200px, 100%)']],
    caps: [['minmax()', 'minmax()'], ['넓은 화면', 'A wide screen'], ['좁은 화면', 'A narrow screen'], ['auto-fill과 auto-fit', 'auto-fill versus auto-fit'], ['반응형 그리드', 'Responsive grids']]
  });
}

function sCentering() {
  return CW('css-centering', {
    code: [['.a { text-align: center; }    /* 글자 */', '.a { text-align: center; }    /* text */'], '.b { margin-inline: auto; width: 60%; }', '.c { display: flex;', '     justify-content: center;', '     align-items: center; }', '.d { display: grid; place-items: center; }', '.e { position: absolute; inset: 0;', '     margin: auto; width: 50%; height: 40%; }'],
    hl: [[0, 2], [2, 3, 'ok'], [5, 1, 'ok'], [6, 2]],
    draw: (S) => {
      const X = 19.4, W = 5.8, H = 3.8, F = [[X, .8], [X + 6.2, .8], [X, 5.2], [X + 6.2, 5.2]];
      F.forEach(([x, y], i) => { frame(S, 'f' + i, x, y, W, H, 'ink-3', i + 1, { w: .08 }); });
      T(S, 'ta', F[0][0], F[0][1] + .4, ['가운데 글자', 'centered text'], 'cz-tc csx-xs', 1, { w: W }); sw(S, 'mb', F[0][0] + 1.16, F[0][1] + 1.7, 3.48, 1.6, tint('accent', 34), 1); cl(S, 'mbl', F[0][0] + 1.16, F[0][1] + 2.1, 3.48, 'auto', 'm', 1);
      [1, 2, 3].forEach(i => { sw(S, 'bx' + i, F[i][0] + W / 2 - 1.4, F[i][1] + H / 2 - .8, 2.8, 1.6, tint(['ok', 'warn', 'danger'][i - 1], 36), i + 1); cl(S, 'bxl' + i, F[i][0] + W / 2 - 1.4, F[i][1] + H / 2 - .4, 2.8, ['flex', 'grid', 'absolute'][i - 1], 'm', i + 1); });
      lbl(S, 'n2', X, 9.4, ['flex: 가로·세로 모두 가운데', 'flex: centered both ways'], 'g', 2, { off: 3 }); lbl(S, 'n3', X, 9.4, ['grid: 한 줄로 끝', 'grid: a single line'], 'g', 3, { off: 4 }); lbl(S, 'n4', X, 9.4, ['absolute: 크기를 알 때 겹쳐 놓기', 'absolute: overlays of known size'], 'w', 4);
    },
    notes: [['인라인 내용(글자)은 text-align: center, 폭이 있는 블록은 margin-inline: auto로 가로 가운데예요', 'inline content centers with text-align: center, and a block with a width with margin-inline: auto'], ['flex 컨테이너에 justify-content와 align-items를 center로 주면 가로·세로 모두 가운데예요', 'a flex container with justify-content and align-items set to center centers both ways'], ['grid에서는 place-items: center 한 줄로 끝나요', 'in grid, place-items: center does it in one line'], ['absolute + inset: 0 + margin: auto는 크기가 정해진 요소를 겹쳐 가운데에 놓을 때 써요', 'absolute with inset: 0 and margin: auto centers an overlay of known size']],
    fin: [['가운데 정렬은 대상(글자·블록·아이템)과 방향(가로·세로)에 따라 도구가 달라요', 'centering depends on what is centered (text, block, item) and in which direction', 'csx-xs csx-a'], ['요즘은 대부분 flex나 grid 한 가지로 해결해요', 'today, flex or grid handles nearly every case'], ['vertical-align은 인라인·표 셀에만 듣고 블록에는 듣지 않아요', 'vertical-align works only on inline and table cells, not blocks']],
    caps: [['글자와 블록', 'Text and blocks'], ['flex', 'flex'], ['grid', 'grid'], ['absolute', 'absolute'], ['가운데 정렬', 'Centering']]
  });
}

function sMedia() {
  return CW('css-media', {
    code: ['.grid { grid-template-columns: 1fr; }', '@media (min-width: 768px) {', '  .grid { grid-template-columns: 1fr 1fr; }', '}', '@media (min-width: 1200px) {', '  .grid { grid-template-columns: 1fr 1fr 1fr }', '}', '@media (hover: hover) {', '  .card:hover { translate: 0 -2px; }', '}'],
    hl: [[0, 1], [1, 3, 'ok'], [4, 3, 'ok'], [7, 3]],
    draw: (S) => {
      const D = [['ph', 19.4, 2.6], ['tb', 22.4, 3.8], ['dt', 26.6, 4.8]], Y = 1.6, H = 6.0;
      D.forEach(([k, x, w]) => { frame(S, k, x, Y, w, H, 'ink-3', 0, { w: .1, r: .4 }); });
      lbl(S, 'phl', 19.4, .6, '375', 'm', 0); lbl(S, 'tbl', 22.4, .6, '820', 'm', 0); lbl(S, 'dtl', 26.6, .6, '1440', 'm', 0);
      const lay = (p, x0, w, cols, st, off) => { const g = .2, cw = (w - .4 - (cols - 1) * g) / cols; for (let i = 0; i < 6; i++) chip(S, p + i, x0 + .2 + (i % cols) * (cw + g), Y + .3 + Math.floor(i / cols) * .9, cw, '', 'accent', st, { off, h: .7, pct: 26 }); };
      D.forEach(([k, x, w]) => lay(k + 'a', x, w, 1, 1, k === 'ph' ? 0 : 2));
      lay('tbb', 22.4, 3.8, 2, 2, 0); lay('dtb', 26.6, 4.8, 2, 2, 3); lay('dtc', 26.6, 4.8, 3, 3, 0);
      lbl(S, 'n1', 19.4, 8.4, ['모바일 우선: 기본은 1열', 'mobile first: one column by default'], 'a', 1, { off: 2 });
      lbl(S, 'n2', 19.4, 8.4, ['768px 이상에서 2열로', '2 columns from 768px'], 'g', 2, { off: 3 }); lbl(S, 'n3', 19.4, 8.4, ['1200px 이상에서 3열로', '3 columns from 1200px'], 'g', 3, { off: 4 });
      lbl(S, 'n4', 19.4, 8.4, ['hover: 마우스가 있는 기기에만 hover 효과', 'hover: hover effects only with a mouse'], 'w', 4, { w: 12 }); lbl(S, 'n5', 19.4, 9.5, ['모션 줄이기·다크 모드도 조건이 돼요', 'reduced motion and dark mode too'], '', 4);
    },
    notes: [['모바일 우선: 기본 스타일을 가장 좁은 화면 기준으로 1열로 쓰고, 넓은 화면을 위해 덧붙여요', 'mobile first: write the base styles for the narrowest screen, one column, and add rules for wider ones'], ['@media (min-width: 768px)은 폭이 768px 이상일 때만 적용돼요 · 태블릿부터 2열', '@media (min-width: 768px) applies only from 768px wide, giving tablets two columns'], ['조건이 겹치면 뒤에 쓴 규칙이 이겨서 1200px 이상에서는 3열이 돼요', 'when conditions overlap, the later rule wins, so screens from 1200px get three columns'], ['폭뿐 아니라 hover 가능 여부, 모션 줄이기, 다크 모드 같은 사용자 환경도 조건으로 쓸 수 있어요', 'beyond width, queries can test for hover, reduced motion and dark mode']],
    fin: [['미디어 쿼리: 화면 폭이나 사용자 환경에 따라 다른 스타일을 적용하는 조건문', 'media queries apply styles conditionally by viewport width or user environment', 'csx-xs csx-a'], ['<meta name="viewport" content="width=device-width">가 없으면 모바일에서 동작하지 않아요', 'without <meta name="viewport" content="width=device-width">, mobile browsers ignore them'], ['최신 문법: @media (768px <= width < 1200px)처럼 범위를 써요', 'modern range syntax reads @media (768px <= width < 1200px)']],
    caps: [['모바일 우선', 'Mobile first'], ['태블릿', 'Tablets'], ['데스크톱', 'Desktops'], ['환경 조건', 'Environment features'], ['미디어 쿼리', 'Media queries']]
  });
}

function sContainer() {
  return CW('css-container', {
    code: ['.slot { container-type: inline-size; }', '.card { display: grid; gap: 8px; }', '@container (min-width: 400px) {', '  .card { grid-template-columns: 120px 1fr; }', '}', '.card h3 {', '  font-size: clamp(1rem, 6cqi, 1.5rem);', '}'],
    hl: [[0, 1], [1, 1], [2, 3, 'ok'], [5, 3]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'vp', X - .2, .5, 12.4, 9.6, 'ink-3', 0, { w: .08, r: .5 }); lbl(S, 'vpl', X, 10.3, ['같은 화면, 같은 카드 컴포넌트', 'one screen, one card component'], 'a', 0, { off: 2 });
      frame(S, 'sd', X, .8, 4.0, 9.0, 'warn', 1, { w: .1, dash: 1 }); lbl(S, 'sdl', X + .2, .9, 'sidebar', 'm w', 1);
      frame(S, 'mn', X + 4.4, .8, 7.6, 9.0, 'accent', 1, { w: .1, dash: 1 }); lbl(S, 'mnl', X + 4.6, .9, 'main', 'm a', 1);
      sw(S, 'si', X + .3, 2.0, 3.4, 1.8, tint('ok', 34), 2); sw(S, 'st', X + .3, 4.0, 3.4, 1.4, tint('line', 12), 2); cl(S, 'stl', X + .3, 4.35, 3.4, 'Title', 'm', 2);
      sw(S, 'mi', X + 4.7, 2.0, 2.4, 1.8, tint('ok', 34), 3); sw(S, 'mt', X + 7.3, 2.0, 4.4, 1.8, tint('line', 12), 3); cl(S, 'mtl', X + 7.3, 2.6, 4.4, 'Title', 'm', 3);
      lbl(S, 'n2', X, 10.3, ['좁은 칸: 이미지 위, 글 아래', 'narrow slot: image above, text below'], 'w', 2, { off: 3 }); lbl(S, 'n3', X, 10.3, ['넓은 칸: 400px 이상이라 가로 배치', 'wide slot: over 400px, side by side'], 'g', 3, { off: 4 });
      lbl(S, 'q1', X + .3, 6.0, '6cqi', 'm', 4); lbl(S, 'q2', X + 4.7, 4.2, '6cqi', 'm', 4); lbl(S, 'n4', X, 10.3, ['cqi: 컨테이너 폭의 1% · 제목도 칸에 맞춰요', 'cqi: 1% of the container width'], 'a', 4, { w: 12 });
    },
    notes: [['container-type: inline-size를 준 요소는 자식이 크기를 물어볼 수 있는 “컨테이너”가 돼요', 'container-type: inline-size makes an element a container whose size its children can query'], ['같은 카드라도 좁은 사이드바 안에서는 세로로 쌓여요', 'the same card stacks vertically inside the narrow sidebar'], ['@container는 화면이 아니라 부모 칸의 폭을 봐서, 넓은 main 안에서는 가로로 배치돼요', '@container looks at the parent slot rather than the screen, so inside the wide main it lays out horizontally'], ['cqi 단위는 컨테이너 폭의 1%라 글자 크기도 칸에 맞춰 커지고 작아져요', 'cqi is 1% of the container’s width, so even font sizes follow the slot']],
    fin: [['컨테이너 쿼리: 뷰포트가 아니라 부모 컨테이너의 크기에 반응하는 스타일', 'container queries style components by the size of their container rather than the viewport', 'csx-xs csx-a'], ['어디에 놓아도 스스로 맞추는 재사용 컴포넌트를 만들 수 있어요', 'they make components that adapt wherever they are placed'], ['페이지 골격은 미디어 쿼리, 컴포넌트 안쪽은 컨테이너 쿼리로 나눠 써요', 'use media queries for the page skeleton and container queries inside components']],
    caps: [['컨테이너 지정', 'Declaring a container'], ['좁은 칸', 'A narrow slot'], ['넓은 칸', 'A wide slot'], ['cqi 단위', 'cqi units'], ['컨테이너 쿼리', 'Container queries']]
  });
}
/* ===== CSS · 4. visual styling ===== */
function sColor() {
  return CW('css-color', {
    code: ['color: #3366ff;', 'color: rgb(51 102 255 / 80%);', 'color: hsl(225 100% 60%);', 'color: oklch(60% 0.2 265);', 'border: 1px solid currentColor;', 'background: color-mix(in oklch, red, blue);'],
    hl: [[0, 2], [2, 1], [3, 1, 'ok'], [4, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'hx', X, .8, 3.0, 3.0, '#3366ff', 1, { off: 2 });
      [['R', 51, '#e5484d'], ['G', 102, '#30a46c'], ['B', 255, '#3e63dd']].forEach(([c, v, col], i) => { lbl(S, 'ch' + i, X + 3.6, .85 + i * 1.0, c, 'm', 1, { off: 2 }); sw(S, 'cb' + i, X + 4.4, 1.0 + i * 1.0, 6.0 * v / 255, .5, col, 1, { off: 2 }); lbl(S, 'cv' + i, X + 4.6 + 6.0 * v / 255, .85 + i * 1.0, '' + v, 'm', 1, { off: 2 }); });
      lbl(S, 'n1', X, 4.4, ['hex·rgb: 빨강·초록·파랑 0~255', 'hex and rgb: red, green, blue from 0 to 255'], 'a', 1, { off: 2, w: 12 });
      [20, 35, 50, 60, 75, 90].forEach((l, i) => sw(S, 'hl' + i, X + i * 2.0, .8, 1.8, 2.0, `hsl(225 100% ${l}%)`, 2, { off: 3 }));
      lbl(S, 'n2', X, 3.2, ['hsl: 색상·채도·명도 · 명도만 바꿔 단계 만들기', 'hsl: hue, saturation, lightness'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'r1', X, .8, 'hsl 50%', 'm', 3, { off: 4 }); lbl(S, 'r2', X, 3.2, 'oklch 70%', 'm', 3, { off: 4 });
      [60, 120, 200, 265, 330].forEach((h, i) => { sw(S, 'ha' + i, X + 3.0 + i * 1.8, .6, 1.6, 2.0, `hsl(${h} 100% 50%)`, 3, { off: 4 }); sw(S, 'ok' + i, X + 3.0 + i * 1.8, 3.0, 1.6, 2.0, `oklch(70% 0.15 ${h + 40})`, 3, { off: 4 }); });
      lbl(S, 'n3', X, 5.6, ['oklch: 같은 명도면 눈에도 같은 밝기', 'oklch: equal lightness looks equally bright'], 'g', 3, { off: 4, w: 12 });
      sw(S, 'm0', X, .8, 3.6, 2.0, 'red', 4); sw(S, 'm1', X + 4.0, .8, 3.6, 2.0, 'color-mix(in oklch, red, blue)', 4); sw(S, 'm2', X + 8.0, .8, 3.6, 2.0, 'blue', 4);
      lbl(S, 'n4', X, 3.2, ['color-mix: 두 색을 섞어 새 색', 'color-mix blends two colors'], 'a', 4); lbl(S, 'n5', X, 4.3, ['currentColor: 지금 글자색을 그대로', 'currentColor reuses the text color'], '', 4);
    },
    notes: [['#3366ff와 rgb(51 102 255)는 같은 색이에요 · 빨강·초록·파랑을 0~255로 섞고, / 뒤는 투명도예요', '#3366ff and rgb(51 102 255) are the same color: red, green and blue from 0 to 255, with alpha after the slash'], ['hsl은 색상(각도)·채도·명도로 적어서, 명도만 바꿔 같은 색의 단계를 만들기 쉬워요', 'hsl uses hue (an angle), saturation and lightness, so tints and shades come from lightness alone'], ['하지만 hsl의 50%는 노랑이 파랑보다 훨씬 밝아 보여요 · oklch는 같은 명도가 눈에도 같은 밝기예요', 'yet hsl’s 50% yellow looks far brighter than its blue; in oklch, equal lightness looks equally bright'], ['color-mix()로 두 색을 섞고, currentColor로 현재 글자색을 테두리나 아이콘에 재사용해요', 'color-mix() blends two colors, and currentColor reuses the text color for borders and icons']],
    fin: [['색 표현: hex·rgb(기기 중심), hsl(사람 중심), oklch(지각적으로 균일) · 디자인 시스템은 oklch로 옮겨 가는 중', 'colors: hex and rgb are device-oriented, hsl human-oriented, oklch perceptually uniform; design systems are moving to oklch', 'csx-xs csx-a'], ['oklch는 넓은 색역(P3)의 더 선명한 색도 표현해요', 'oklch can also express the more vivid colors of wide gamuts such as P3'], ['글자와 배경은 명도 대비 4.5:1 이상을 지켜요', 'keep at least 4.5:1 contrast between text and background']],
    caps: [['hex와 rgb', 'hex and rgb'], ['hsl', 'hsl'], ['oklch', 'oklch'], ['color-mix와 currentColor', 'color-mix and currentColor'], ['색 표현', 'Expressing color']]
  });
}

function sVars() {
  return CW('css-vars', {
    code: [':root { --brand: #36f; --radius: 8px; }', '.btn {', '  background: var(--brand);', '  border-radius: var(--radius);', '}', ['.danger { --brand: #e33; } /* 범위 안만 */', '.danger { --brand: #e33; } /* scoped */'], '[data-theme="dark"] { --bg: #111; }', ['color: var(--accent, #36f);  /* 기본값 */', 'color: var(--accent, #36f);  /* fallback */'], 'el.style.setProperty("--x", "40px");'],
    hl: [[0, 5], [5, 1, 'danger'], [6, 1], [7, 2, 'ok']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 12.0, 7.6, '#ffffff', 0, { css: 'border:.1em solid var(--line)', r: .5 }); S.set('pg', 0, { background: '#ffffff' }); S.set('pg', 3, { background: '#16181d' });
      [0, 1].forEach(i => { sw(S, 'b' + i, X + .8 + i * 5.6, 2.0, 4.8, 1.4, '#3366ff', 0, { r: .5, css: 'z-index:3' }); cl(S, 'bl' + i, X + .8 + i * 5.6, 2.3, 4.8, i ? ['.btn.danger', '.btn.danger'] : '.btn', 'm csx-ic', 0, { css: 'color:#fff;z-index:4' }); });
      S.set('b1', 2, { background: '#e33b3b' });
      sw(S, 'tx', X + .8, 4.4, 10.4, .5, '#c9ced6', 0); sw(S, 'tx2', X + .8, 5.3, 7.4, .5, '#c9ced6', 0); S.set('tx', 3, { background: '#3a3f48' }); S.set('tx2', 3, { background: '#3a3f48' });
      hl(S, 'trk', X + .8, X + 11.2, 7.2, 'ink-3', 4, { w: .1 }); sw(S, 'dg', X + .8, 6.8, .8, .8, 'transparent', 4, { r: .4, css: 'border:.08em dashed var(--ink-3)' }); ar(S, 'da', [X + 1.8, 6.6], [X + 7.8, 6.6], 'accent', 4, { h: .08 }); sw(S, 'dot', X + 8.0, 6.8, .8, .8, 'var(--accent)', 4, { r: .4, css: 'z-index:3' }); lbl(S, 'dl', X + 8.0, 5.7, '--x: 40px', 'm a', 4);
      lbl(S, 'n1', X, 9.0, ['한 곳에서 정하고 var()로 꺼내 써요', 'define once, read with var()'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 9.0, ['.danger 안에서만 --brand가 빨강', '--brand is red only inside .danger'], 'r', 2, { off: 3 });
      lbl(S, 'n3', X, 9.0, ['변수만 바꿔 테마 전체를 전환', 'swap variables to switch the whole theme'], 'g', 3, { off: 4 });
      lbl(S, 'n4', X, 9.0, ['JS로 값을 바꾸면 즉시 반영돼요', 'JS updates apply instantly'], 'a', 4);
    },
    notes: [['--brand처럼 --로 시작하는 커스텀 속성에 값을 두고 var(--brand)로 꺼내 써요', 'custom properties start with -- such as --brand, and var(--brand) reads them'], ['커스텀 속성도 상속되는 일반 속성이라, .danger 안에서 다시 정하면 그 안에서만 값이 바뀌어요', 'custom properties inherit like any property, so redefining one inside .danger changes it only there'], ['테마별로 변수만 바꾸면 그 변수를 쓰는 모든 곳의 색이 한 번에 바뀌어요', 'changing the variables per theme recolors everything that uses them at once'], ['var(--x, 기본값)으로 대비하고, JS의 setProperty로 실행 중에 값을 바꿀 수 있어요', 'var(--x, fallback) guards against missing values, and setProperty in JavaScript updates them at run time']],
    fin: [['CSS 변수(커스텀 속성): 캐스케이드와 상속을 따르는, 실행 중에도 바뀌는 값', 'CSS variables (custom properties) follow the cascade and inheritance and can change at run time', 'csx-xs csx-a'], ['Sass 변수는 빌드 때 사라지지만 CSS 변수는 브라우저에 남아 있어요', 'Sass variables vanish at build time, while CSS variables live in the browser'], ['@property로 타입을 등록하면 변수 값도 애니메이션할 수 있어요', 'registering a type with @property lets variables animate']],
    caps: [['정의와 사용', 'Define and use'], ['범위 안에서 덮기', 'Scoped overrides'], ['테마 전환', 'Switching themes'], ['기본값과 JS', 'Fallbacks and JS'], ['CSS 변수', 'CSS variables']]
  });
}

function sTypography() {
  return CW('css-typography', {
    code: ['@font-face {', '  font-family: "Pretendard";', '  src: url(pretendard.woff2) format("woff2");', '  font-display: swap;', '}', 'body { font-family: Pretendard, sans-serif; }', 'body { line-height: 1.6; }', 'h1 { font-size: clamp(1.75rem, 4vw, 3rem); }', 'p  { max-width: 65ch; text-wrap: pretty; }', 'h2 { text-wrap: balance; }'],
    hl: [[0, 5], [5, 2], [7, 1, 'ok'], [8, 2, 'ok']],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 't0', X, .7, ['글꼴을 받는 동안', 'while the font downloads'], 'a', 1, { off: 2 });
      sw(S, 'blk', X, 1.9, 4.0, 1.0, tint('danger', 30), 1, { off: 2 }); cl(S, 'blkl', X, 2.05, 4.0, 'block', 'm', 1, { off: 2 }); lbl(S, 'bk2', X + 4.4, 2.0, ['글자 안 보임(FOIT)', 'text invisible (FOIT)'], 'r', 1, { off: 2 });
      sw(S, 'swp', X, 3.3, 4.0, 1.0, tint('ok', 34), 1, { off: 2 }); cl(S, 'swpl', X, 3.45, 4.0, 'swap', 'm', 1, { off: 2 }); lbl(S, 'sw2', X + 4.4, 3.4, ['대체 글꼴 먼저 → 교체', 'fallback first, then swap'], 'g', 1, { off: 2 });
      [[1.2, 'tight'], [1.6, '1.6']].forEach(([lh, t], j) => { lbl(S, 'lh' + j, X + j * 6.2, .7, 'line-height ' + t, 'm a', 2, { off: 3 }); [0, 1, 2, 3].forEach(i => sw(S, 'ln' + j + i, X + j * 6.2, 1.8 + i * .55 * lh * 1.6, i === 3 ? 3.6 : 5.6, .42, tint('ink-3', 60), 2, { off: 3 })); });
      lbl(S, 'n2', X, 7.0, ['본문은 1.5~1.7 정도가 읽기 편해요', 'body text reads best around 1.5–1.7'], 'g', 2, { off: 3 });
      const F = fr(320, 1600, 20, 52, X + 1.2, X + 11.8, .9, 6.2);
      hl(S, 'ax', F.L, F.R, F.B, 'ink-3', 3, { off: 4, w: .06 }); vl(S, 'ay', F.L, F.T, F.B, 'ink-3', 3, { off: 4, w: .06 });
      poly(S, 'cv', [[F.X(320), F.Y(28)], [F.X(700), F.Y(28)], [F.X(1200), F.Y(48)], [F.X(1600), F.Y(48)]], { st: 3, off: 4, color: 'accent', h: .12 });
      lbl(S, 'mn', X, F.Y(28) - .3, '28', 'm', 3, { off: 4 }); lbl(S, 'mx', X, F.Y(48) - .3, '48', 'm', 3, { off: 4 }); lbl(S, 'vw', X + 1.2, 6.5, ['화면 폭 →  최소·최대 사이에서 유동적', 'viewport →  fluid between min and max'], 'a', 3, { off: 4, w: 11 });
      lbl(S, 'w1', X, .7, ['balance 없이', 'without balance'], 'm', 4); lbl(S, 'w1a', X, 1.7, ['오늘 배울 CSS 타이포그래피의 모든', 'Everything about CSS typography we'], '', 4); lbl(S, 'w1b', X, 2.6, ['것', 'learn'], 'r', 4);
      lbl(S, 'w2', X, 4.0, ['balance', 'balance'], 'm g', 4); lbl(S, 'w2a', X, 5.0, ['오늘 배울 CSS', 'Everything about CSS'], '', 4); lbl(S, 'w2b', X, 5.9, ['타이포그래피의 모든 것', 'typography we learn'], '', 4);
    },
    notes: [['@font-face로 웹 글꼴을 등록해요 · font-display: swap은 글꼴을 받는 동안 대체 글꼴로 먼저 보여줘요', '@font-face registers a web font, and font-display: swap shows a fallback font while it downloads'], ['글꼴 목록은 쉼표로 이어 대체 글꼴을 두고, line-height는 단위 없이 1.6처럼 비율로 적어요', 'font stacks list fallbacks separated by commas, and line-height is best written unitless, like 1.6'], ['clamp(최소, 4vw, 최대)는 화면 폭에 따라 글자가 커지되 범위 안에 머물러요', 'clamp(min, 4vw, max) grows text with the viewport while staying within bounds'], ['본문은 65ch 정도로 줄 길이를 제한하고, 제목은 text-wrap: balance로 줄 길이를 고르게 해요', 'limit body text to about 65ch, and balance headings with text-wrap: balance']],
    fin: [['타이포그래피: 글꼴 로딩, 대체 글꼴, 크기, 줄 간격, 줄 길이가 함께 읽기 경험을 만들어요', 'typography combines font loading, fallbacks, size, line height and line length into the reading experience', 'csx-xs csx-a'], ['한글 웹 글꼴은 용량이 커서 서브셋·가변 글꼴·woff2를 써요', 'Korean web fonts are large, so use subsets, variable fonts and woff2'], ['글꼴을 미리 받으려면 <link rel="preload">를 써요', 'preload fonts with <link rel="preload">']],
    caps: [['웹 글꼴 로딩', 'Loading web fonts'], ['글꼴 목록과 줄 간격', 'Font stacks and line height'], ['유동적인 크기', 'Fluid sizes'], ['줄 길이와 줄바꿈', 'Line length and wrapping'], ['글꼴과 타이포그래피', 'Fonts and typography']]
  });
}

function sTransition() {
  return CW('css-transition', {
    code: ['.btn {', '  transition: background 200ms ease,', '              transform 150ms ease-out;', '}', '.btn:hover {', '  background: #25c;', '  transform: translateY(-2px);', '}', ['/* height: auto는 전환이 안 돼요 */', '/* height: auto cannot transition */']],
    hl: [[4, 4], [1, 2, 'ok'], [1, 2], [8, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'a', X, 1.0, 3.6, 1.4, '#3366ff', 1, { off: 2, r: .4 }); ar(S, 'aa', [X + 3.9, 1.7], [X + 7.6, 1.7], 'ink-3', 1, { off: 2, h: .1 }); sw(S, 'b', X + 8.0, .8, 3.6, 1.4, '#2255cc', 1, { off: 2, r: .4 });
      lbl(S, 'n1', X, 3.0, ['전환 없이: 순간적으로 바뀌어요', 'no transition: an instant jump'], 'w', 1, { off: 2 });
      [0, 1, 2, 3, 4].forEach(i => sw(S, 'f' + i, X + i * 2.0, 1.0 - i * .05, 1.8, 1.4, `color-mix(in srgb,#3366ff ${100 - i * 25}%,#2255cc)`, 2, { off: 3, r: .4 }));
      lbl(S, 'n2', X, 3.0, ['200ms 동안 중간 단계가 채워져요', 'in-between frames fill 200ms'], 'g', 2, { off: 3 });
      const F = fr(0, 1, 0, 1, X + 1.0, X + 7.0, .9, 6.9);
      hl(S, 'ex', F.L, F.R, F.B, 'ink-3', 3, { off: 4, w: .06 }); vl(S, 'ey', F.L, F.T, F.B, 'ink-3', 3, { off: 4, w: .06 });
      const bez = (p1x, p1y, p2x, p2y) => t => { const u = 1 - t, x = 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t, y = 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t; return [F.X(x), F.Y(y)]; };
      pplot(S, 'lin', bez(0, 0, 1, 1), 0, 1, { st: 3, off: 4, color: 'ink-3', n: 8, h: .08 }); pplot(S, 'ez', bez(.25, .1, .25, 1), 0, 1, { st: 3, off: 4, color: 'accent', n: 24, h: .1 }); pplot(S, 'eo', bez(0, 0, .58, 1), 0, 1, { st: 3, off: 4, color: 'ok', n: 24, h: .1 });
      lbl(S, 'k1', X + 7.6, 1.2, 'linear', 'm', 3, { off: 4 }); lbl(S, 'k2', X + 7.6, 2.3, 'ease', 'm a', 3, { off: 4 }); lbl(S, 'k3', X + 7.6, 3.4, 'ease-out', 'm g', 3, { off: 4 }); lbl(S, 'k4', X + 7.6, 4.6, ['시간 →', 'time →'], '', 3, { off: 4 });
      chip(S, 'c1', X, 1.0, 7.0, 'transform · opacity', 'ok', 4, { h: 1.2 }); lbl(S, 'c1l', X + 7.4, 1.15, ['합성만 · 부드러움', 'composite only, smooth'], 'g', 4);
      chip(S, 'c2', X, 2.6, 7.0, 'width · height · top', 'danger', 4, { h: 1.2 }); lbl(S, 'c2l', X + 7.4, 2.75, ['매 프레임 레이아웃', 'layout every frame'], 'r', 4);
    },
    notes: [['상태가 바뀌면(:hover 등) 기본적으로는 새 값으로 순간 이동해요', 'when the state changes, such as on :hover, values jump instantly by default'], ['transition에 속성과 시간을 적으면 그 시간 동안 중간 값이 자동으로 채워져요', 'transition with a property and a duration fills in the intermediate values over that time'], ['이징은 속도의 변화예요 · ease-out은 빠르게 시작해 천천히 멈춰서 화면에 들어오는 움직임에 잘 맞아요', 'easing shapes the speed; ease-out starts fast and settles slowly, suiting things that enter the screen'], ['transform과 opacity는 합성 단계만 다시 해서 부드럽고, width·height·top은 매 프레임 레이아웃을 다시 해요', 'transform and opacity only re-composite, while width, height and top redo layout every frame']],
    fin: [['transition: 속성 값이 바뀔 때 그 사이를 시간에 걸쳐 보간하는 기능 · 시작점과 끝점 두 상태만 있어요', 'transition interpolates between two states over time when a property changes', 'csx-xs csx-a'], ['UI 전환은 150~300ms가 적당해요 · 너무 길면 느리게 느껴져요', '150–300ms suits UI transitions; longer feels sluggish'], ['transition: all은 의도치 않은 속성까지 움직여서 피해요', 'avoid transition: all, which animates unintended properties']],
    caps: [['순간 변화', 'Instant change'], ['보간', 'Interpolation'], ['이징', 'Easing'], ['싼 속성, 비싼 속성', 'Cheap and costly properties'], ['transition', 'transition']]
  });
}

function sAnimation() {
  return CW('css-animation', {
    code: ['@keyframes pop {', '  0%   { scale: .8; opacity: 0; }', '  60%  { scale: 1.05; }', '  100% { scale: 1; opacity: 1; }', '}', '.toast { animation: pop 300ms ease-out both; }', '.spin { animation: spin 1s linear infinite; }', '@media (prefers-reduced-motion: reduce) {', '  * { animation: none; }', '}'],
    hl: [[0, 5], [5, 1, 'ok'], [6, 1], [7, 3, 'warn']],
    draw: (S) => {
      const X = 19.4, Y = 6.4;
      hl(S, 'tl', X + 1.6, X + 10.2, Y, 'ink-3', 1, { off: 3, w: .1 });
      [[0, '0%', .8, .25], [.6, '60%', 1.05, 1], [1, '100%', 1, 1]].forEach(([p, t, sc, op], i) => { const x = X + 1.6 + p * 8.6; vl(S, 'mk' + i, x, Y - .3, Y + .3, 'accent', 1, { off: 3, w: .1 }); lbl(S, 'ml' + i, x - .6, Y + .5, t, 'm a', 1, { off: 3 }); sw(S, 'ts' + i, x - 1.6, 2.4, 3.2, 1.6, `color-mix(in srgb,var(--ok) ${Math.round(op * 50)}%,var(--ui))`, 1, { off: 3, r: .4, css: `transform:scale(${sc});border:.08em solid var(--ok)` }); });
      lbl(S, 'n1', X, .7, ['@keyframes: 시간 지점마다 상태를 적어요', '@keyframes lists states at points in time'], 'a', 1, { off: 2, w: 12 });
      [['pop', 'a'], ['300ms', 'g'], ['ease-out', 'w'], ['both', '']].forEach(([t, c], i) => chip(S, 'sh' + i, X + i * 3.05, .6, 2.8, t, ['accent', 'ok', 'warn', 'line'][i], 2, { off: 3, h: 1.1 }));
      lbl(S, 'n2', X, 8.0, ['이름 · 시간 · 이징 · 채우기 모드', 'name, duration, easing, fill mode'], 'a', 2, { off: 3 });
      sw(S, 'sp', X + 4.6, 1.6, 2.8, 2.8, 'transparent', 3, { off: 4, r: 1.4, css: 'border:.3em solid var(--line);border-top-color:var(--accent)' });
            lbl(S, 'n3', X, 5.2, ['infinite: 끝없이 반복 · 로딩 표시', 'infinite repeats forever, as for loaders'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'rm', X, 1.0, 12.0, ['OS 설정 “동작 줄이기” 켬', 'OS setting “Reduce motion” on'], 'warn', 4, { h: 1.2 });
      lbl(S, 'n4', X, 2.8, ['큰 움직임은 끄고 페이드 정도만 남겨요', 'drop big motion, keep subtle fades'], 'g', 4); lbl(S, 'n5', X, 3.9, ['어지럼증이 있는 사용자를 배려해요', 'it protects users prone to motion sickness'], '', 4);
    },
    notes: [['@keyframes는 0%, 60%, 100%처럼 시간 지점마다 상태를 적어요 · 그 사이는 브라우저가 채워요', '@keyframes lists states at points in time such as 0%, 60% and 100%, and the browser fills the gaps'], ['animation 한 줄에 이름, 시간, 이징, 채우기 모드를 적어요 · both는 시작 전과 끝난 뒤의 상태를 유지해요', 'the animation shorthand sets name, duration, easing and fill mode; both keeps the first and last states'], ['infinite는 끝없이 반복해요 · 로딩 스피너처럼 계속 도는 표시에 써요', 'infinite repeats forever, for indicators such as loading spinners'], ['사용자가 “동작 줄이기”를 켰다면 prefers-reduced-motion으로 큰 움직임을 꺼요', 'when users turn on reduced motion, prefers-reduced-motion switches large motion off']],
    fin: [['animation: @keyframes로 정의한 여러 단계를 시간에 따라 재생 · 상태 변화 없이도, 반복해서 움직일 수 있어요', 'animation plays multi-step @keyframes over time, even without a state change and on repeat', 'csx-xs csx-a'], ['transition은 A→B 두 상태, animation은 여러 단계와 반복', 'transitions go from A to B; animations have many steps and can repeat'], ['animation-play-state, animationend 이벤트로 JS와 함께 제어해요', 'animation-play-state and the animationend event coordinate with JavaScript']],
    caps: [['@keyframes', '@keyframes'], ['animation 줄임 속성', 'The animation shorthand'], ['무한 반복', 'Looping forever'], ['동작 줄이기', 'Reduced motion'], ['@keyframes 애니메이션', '@keyframes animation']]
  });
}

function sTransform() {
  return CW('css-transform', {
    code: ['transform: translate(40px, 0);', 'transform: rotate(15deg) scale(1.2);', 'transform-origin: top left;', 'transform: translate(40px) rotate(45deg);', 'transform: rotate(45deg) translate(40px);', ['/* 개별 속성으로도 써요 */', '/* or as individual properties */'], 'translate: 40px; rotate: 45deg;'],
    hl: [[0, 1], [1, 1], [2, 1], [3, 2, 'warn']],
    draw: (S) => {
      const X = 19.4, bx = X + 2.4, by = 2.6;
      sw(S, 'gh', bx, by, 3.2, 2.0, 'transparent', 0, { css: 'border:.1em dashed var(--ink-3)', off: 4 });
      sw(S, 'bx', bx, by, 3.2, 2.0, tint('accent', 50), 0, { off: 4, css: 'z-index:3' }); cl(S, 'bxl', bx, by + .6, 3.2, 'box', 'm', 0, { off: 4 });
      S.set('bx', 0, { 'transform-origin': '50% 50%' }); S.set('bxl', 0, { 'transform-origin': '50% 50%' });
      [['bx', 1, 'translate(3.2em,0)'], ['bx', 2, 'rotate(15deg) scale(1.2)'], ['bx', 3, 'rotate(15deg)']].forEach(([k, st, t]) => S.set(k, st, { transform: t }));
      S.set('bxl', 1, { transform: 'translate(3.2em,0)' }); S.set('bxl', 2, { opacity: '0' }); S.set('bx', 3, { 'transform-origin': '0 0' });
      sw(S, 'nb', X + 9.0, by, 2.6, 2.0, tint('line', 14), 0, { off: 4 }); cl(S, 'nbl', X + 9.0, by + .6, 2.6, ['이웃', 'neighbor'], '', 0, { off: 4 });
      lbl(S, 'n1', X, 6.6, ['옮겨도 이웃은 그대로 · 레이아웃 무관', 'neighbors stay put: layout is untouched'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['함수는 공백으로 이어 한 번에 적용', 'functions chain with spaces'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['기준점을 왼쪽 위로 바꾸면 거기서 돌아요', 'with the origin at the top left, it pivots there'], 'w', 3, { off: 4, w: 12 });
      const ox = X + 1.0, oy = 4.0;
      sw(S, 'o', ox - .1, oy - .1, .2, .2, 'var(--ink)', 4, { r: .1 });
      sw(S, 'e', ox, oy - .7, 2.4, 1.4, tint('ok', 50), 4, { css: 'transform-origin:0 50%;transform:translate(3em,0) rotate(45deg)' });
      sw(S, 'f', ox, oy - .7, 2.4, 1.4, tint('warn', 50), 4, { css: 'transform-origin:0 50%;transform:rotate(45deg) translate(3em,0)' });
      lbl(S, 'el', X + 4.0, .8, 'translate() rotate()', 'm g', 4); lbl(S, 'fl', X + 4.0, 1.9, 'rotate() translate()', 'm w', 4); lbl(S, 'n4', X, 8.2, ['오른쪽부터 적용돼 순서가 결과를 바꿔요', 'applied right to left, so order matters'], 'r', 4, { w: 12 });
    },
    notes: [['translate는 요소를 옮겨요 · 레이아웃은 그대로라 이웃 요소가 밀리지 않아요', 'translate moves the element without touching layout, so neighbors do not shift'], ['rotate와 scale을 공백으로 이어 한 번에 적용해요', 'rotate and scale chain with spaces and apply together'], ['transform-origin으로 회전·확대의 기준점을 바꿔요 · 기본값은 가운데예요', 'transform-origin moves the pivot for rotation and scaling; the default is the center'], ['함수는 오른쪽부터 적용돼서, 옮기고 돌리기와 돌리고 옮기기의 결과가 달라요', 'functions apply from right to left, so move-then-rotate and rotate-then-move end up in different places']],
    fin: [['transform: 레이아웃에 영향 없이 요소를 옮기고, 돌리고, 키우고, 기울이는 속성', 'transform moves, rotates, scales and skews an element without affecting layout', 'csx-xs csx-a'], ['GPU 합성으로 처리되어 애니메이션에 가장 적합해요', 'it is composited on the GPU, making it ideal for animation'], ['transform이 있는 요소는 쌓임 맥락과 fixed 자식의 기준이 돼요', 'a transformed element becomes a stacking context and the reference for fixed children']],
    caps: [['translate', 'translate'], ['rotate와 scale', 'rotate and scale'], ['transform-origin', 'transform-origin'], ['순서의 차이', 'Order matters'], ['transform', 'transform']]
  });
}

function sDarkMode() {
  return CW('css-darkmode', {
    code: [':root { color-scheme: light dark; }', ':root { --bg: #fff; --text: #111; }', '@media (prefers-color-scheme: dark) {', '  :root { --bg: #111; --text: #eee; }', '}', 'body { background: var(--bg); }', 'body { color: var(--text); }', '.card { color: light-dark(#111, #eee); }', '[data-theme="dark"] { --bg: #111; }'],
    hl: [[0, 1], [1, 6, 'ok'], [7, 1], [8, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 9.4, 7.4, '#ffffff', 0, { css: 'border:.1em solid var(--line)', r: .5 }); S.set('pg', 0, { background: '#ffffff' }); S.set('pg', 2, { background: '#16181d' });
      [0, 1, 2].forEach(i => { sw(S, 'tx' + i, X + .8, 1.6 + i * .9, [7.6, 6.8, 4.8][i], .45, '#2b2f36', 0); S.set('tx' + i, 0, { background: '#2b2f36' }); S.set('tx' + i, 2, { background: '#e6e8eb' }); });
      sw(S, 'in', X + .8, 4.6, 5.0, 1.1, '#ffffff', 0, { css: 'border:.08em solid #b9bec7' }); S.set('in', 0, { background: '#ffffff' }); S.set('in', 2, { background: '#22262d' });
      sw(S, 'sb', X + 8.6, 1.0, .35, 3.0, '#c9ced6', 0, { r: .2 }); S.set('sb', 0, { background: '#c9ced6' }); S.set('sb', 2, { background: '#4a505a' });
      sw(S, 'os', X + 10.0, .8, 2.0, 2.0, tint('warn', 40), 0, { r: 1.0 }); cl(S, 'osl', X + 10.0, 1.35, 2.0, '☀', '', 0, { off: 2 }); cl(S, 'osd', X + 10.0, 1.35, 2.0, '☾', '', 2); S.set('os', 2, { background: tint('accent', 40) });
      lbl(S, 'osn', X + 9.9, 3.0, 'OS', 'm', 0);
      lbl(S, 'n1', X, 8.6, ['스크롤바·입력창도 테마를 따라가요', 'scrollbars and inputs follow the theme'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 8.6, ['OS가 다크면 변수만 바뀌어 전체가 어둡게', 'dark OS setting: variables flip the page'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 8.6, ['light-dark(): 한 줄에 두 값', 'light-dark(): both values in one line'], 'a', 3, { off: 4 });
      chip(S, 'tg', X + 6.6, 6.4, 2.4, ['토글', 'toggle'], 'warn', 4, { h: 1.1 }); lbl(S, 'n4', X, 8.6, ['사용자 선택은 data-theme + localStorage로', 'store user choice with data-theme + localStorage'], 'w', 4, { w: 12 });
    },
    notes: [['color-scheme: light dark를 선언하면 스크롤바, 입력창 같은 브라우저 기본 UI도 테마를 따라가요', 'declaring color-scheme: light dark lets browser UI such as scrollbars and inputs follow the theme'], ['색을 변수로 두고 prefers-color-scheme: dark일 때 변수만 바꾸면, 페이지 전체가 OS 설정을 따라 어두워져요', 'with colors in variables, swapping them under prefers-color-scheme: dark darkens the whole page with the OS setting'], ['light-dark(밝을 때, 어두울 때) 함수로 한 줄에 두 값을 적을 수도 있어요', 'the light-dark(light, dark) function writes both values in one line'], ['사용자가 직접 고르는 토글은 data-theme 속성으로 덮어쓰고, 선택은 localStorage에 저장해요', 'a user-facing toggle overrides with a data-theme attribute and remembers the choice in localStorage']],
    fin: [['다크 모드: 색을 변수로 추상화하고, 시스템 설정과 사용자 선택에 따라 변수 값을 바꾸는 것', 'dark mode abstracts colors into variables and swaps their values by system setting or user choice', 'csx-xs csx-a'], ['순수한 검정(#000) 대신 어두운 회색, 순수한 흰 글자 대신 약간 어두운 흰색이 눈이 편해요', 'dark gray instead of pure black, and off-white instead of pure white, is easier on the eyes'], ['페이지 로드 전 스크립트로 테마를 정해 깜빡임(FOUC)을 막아요', 'set the theme with a script before paint to avoid a flash of the wrong theme']],
    caps: [['color-scheme', 'color-scheme'], ['prefers-color-scheme', 'prefers-color-scheme'], ['light-dark()', 'light-dark()'], ['사용자 토글', 'A user toggle'], ['다크 모드', 'Dark mode']]
  });
}
/* ===== CSS · 5. architecture and performance ===== */
function sRender() {
  return CW('css-render', {
    code: [['/* ① 레이아웃부터 다시: 비쌈 */', '/* ① redo layout: expensive */'], '.a { width: 300px; margin-top: 8px; }', ['/* ② 페인트만 다시 */', '/* ② repaint only */'], '.b { color: red; background: blue; }', ['/* ③ 합성만: 가장 저렴 */', '/* ③ composite only: cheapest */'], '.c { transform: scale(2); opacity: .5; }', '.c { will-change: transform; }', ['el.offsetHeight;  /* 강제 레이아웃 */', 'el.offsetHeight;  /* forced layout */']],
    hl: [[0, 2, 'danger'], [2, 2, 'warn'], [4, 3, 'ok'], [7, 1, 'danger']],
    draw: (S) => {
      const X = 19.4, st = [['Style', 'line'], ['Layout', 'line'], ['Paint', 'line'], ['Composite', 'line']];
      const px = [0, 2.7, 5.8, 8.5], pw = [2.4, 2.8, 2.4, 3.6]; st.forEach(([t], i) => { chip(S, 'p' + i, X + px[i], 1.2, pw[i], t, 'line', 0, { h: 1.3, pct: 10 }); if (i) ar(S, 'pa' + i, [X + px[i - 1] + pw[i - 1] + .02, 1.85], [X + px[i] - .02, 1.85], 'ink-3', 0, { h: .08 }); });
      lbl(S, 'pl', X, .2, ['한 프레임을 그리는 단계', 'the stages of one frame'], 'a', 0);
      const on = { 1: [0, 1, 2, 3], 2: [0, 2, 3], 3: [3], 4: [1] };
      Object.entries(on).forEach(([s, list]) => { s = +s; [0, 1, 2, 3].forEach(i => S.set('p' + i, s, { background: list.includes(i) ? tint(s === 1 || s === 4 ? 'danger' : s === 2 ? 'warn' : 'ok', 40) : tint('line', 10), opacity: list.includes(i) ? '1' : '.4' })); });
      lbl(S, 'n1', X, 3.2, ['크기·위치가 바뀌면 모든 단계를 다시', 'size or position changes redo everything'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 3.2, ['색·배경만 바뀌면 레이아웃은 건너뛰어요', 'color changes skip layout'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 3.2, ['transform·opacity는 GPU 합성만', 'transform and opacity: GPU compositing only'], 'g', 3, { off: 4, w: 12 });
      ['쓰기', '읽기', '쓰기', '읽기'].forEach((t, i) => { chip(S, 'th' + i, X + i * 3.1, 3.2, 2.7, [t, ['write', 'read', 'write', 'read'][i]], i % 2 ? 'danger' : 'accent', 4, { h: 1.1 }); });
      lbl(S, 'n4', X, 4.7, ['쓰고 읽기를 섞으면 매번 강제 레이아웃', 'interleaved reads force layout each time'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 5.8, ['읽기를 모으고, 쓰기를 모아요', 'batch the reads, then the writes'], 'g', 4);
      hl(S, 'fb', X, X + 12.0, 8.4, 'ink-3', 0, { w: .06 }); lbl(S, 'fbl', X, 8.7, ['60fps = 한 프레임 16.7ms', '60fps = 16.7ms per frame'], 'm', 0);
    },
    notes: [['브라우저는 스타일 계산 → 레이아웃 → 페인트 → 합성 순서로 화면을 그려요 · width나 margin을 바꾸면 처음부터 다시 해요', 'browsers draw by computing styles, then layout, paint and composite; changing width or margin redoes all of it'], ['색이나 배경처럼 모양만 바뀌면 레이아웃은 건너뛰고 페인트부터 다시 해요', 'appearance-only changes such as color skip layout and repaint'], ['transform과 opacity는 합성 단계만 다시 해서 GPU로 빠르게 처리돼요 · 애니메이션은 이 둘로', 'transform and opacity only re-composite on the GPU, so animate with these two'], ['JS에서 스타일을 쓰고 바로 크기를 읽으면 브라우저가 강제로 레이아웃을 계산해요 · 반복되면 레이아웃 스래싱', 'writing a style and immediately reading a size in JavaScript forces layout; in a loop this is layout thrashing']],
    fin: [['렌더링 파이프라인: Style → Layout → Paint → Composite · 어느 단계를 다시 하게 만드는지가 성능을 좌우해요', 'the rendering pipeline runs style, layout, paint and composite; which stages a change triggers decides performance', 'csx-xs csx-a'], ['DevTools Performance 패널에서 보라(레이아웃)와 초록(페인트) 구간을 확인해요', 'the DevTools Performance panel shows layout in purple and paint in green'], ['will-change는 필요한 요소에만 · 남발하면 메모리를 많이 써요', 'use will-change sparingly; overuse wastes memory']],
    caps: [['레이아웃 변경', 'Layout changes'], ['페인트만', 'Paint only'], ['합성만', 'Composite only'], ['레이아웃 스래싱', 'Layout thrashing'], ['렌더링 파이프라인', 'The rendering pipeline']]
  });
}

function sScope() {
  return CW('css-scope', {
    code: ['.title { color: navy; }   /* card.css */', ['.title { color: red; }    /* modal.css 😱 */', '.title { color: red; }    /* modal.css 😱 */'], '.card__title { }       /* Block__Element */', '.card--featured { }    /* Block--Modifier */', ['/* Card.module.css → 이름에 해시 */', '/* Card.module.css → hashed names */'], '.title { }   /* .Card_title__x7f2a */', '@scope (.card) to (.content) {', '  img { border-radius: 8px; }', '}'],
    hl: [[0, 2, 'danger'], [2, 2, 'ok'], [4, 2, 'ok'], [6, 3]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'cf', X, .8, 5.6, 3.6, 'accent', 0, { w: .1, off: 4 }); lbl(S, 'cfl', X + .2, .9, 'Card', 'm a', 0, { off: 4 });
      frame(S, 'mf', X + 6.4, .8, 5.6, 3.6, 'warn', 0, { w: .1, off: 4 }); lbl(S, 'mfl', X + 6.6, .9, 'Modal', 'm w', 0, { off: 4 });
      const T4 = [['.title', '.title'], ['.card__title', '.modal__title'], ['title_x7f2a', 'title_9qa1c']];
      T4.forEach(([a, b], i) => { const st = i + 1, off = i === 2 ? 4 : i + 2; chip(S, 'ta' + i, X + .4, 2.2, 4.8, a, i ? 'accent' : 'danger', st, { off, h: 1.2 }); chip(S, 'tb' + i, X + 6.8, 2.2, 4.8, b, i ? 'warn' : 'danger', st, { off, h: 1.2 }); });
      lbl(S, 'n1', X, 5.0, ['전역 이름이 겹치면 뒤에 온 것이 덮어써요', 'clashing global names: the later one wins'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 5.0, ['BEM: 이름 규칙으로 겹치지 않게', 'BEM: a naming rule that avoids clashes'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.0, ['CSS Modules: 빌드가 고유 이름을 붙여요', 'CSS Modules: the build makes names unique'], 'g', 3, { off: 4, w: 12 });
      frame(S, 'sc', X, .8, 12.0, 6.4, 'accent', 4, { w: .1 }); lbl(S, 'scl', X + .2, .9, '.card', 'm a', 4);
      sw(S, 'im1', X + .6, 2.0, 3.6, 2.2, tint('ok', 40), 4, { r: .5 }); cl(S, 'im1l', X + .6, 2.8, 3.6, 'img ✓', 'm', 4);
      frame(S, 'ct', X + 5.0, 2.0, 6.4, 4.6, 'ink-3', 4, { w: .08, dash: 1 }); lbl(S, 'ctl', X + 5.2, 2.1, '.content', 'm', 4);
      sw(S, 'im2', X + 6.0, 3.2, 3.6, 2.2, tint('line', 30), 4, { r: 0 }); cl(S, 'im2l', X + 6.0, 4.0, 3.6, 'img', 'm', 4);
      lbl(S, 'n4', X, 7.6, ['@scope: .card 안, .content 전까지만 적용', '@scope: inside .card, stopping at .content'], 'a', 4, { w: 12 });
    },
    notes: [['CSS는 기본적으로 전역이라, 두 파일이 같은 .title을 쓰면 나중에 불러온 쪽이 다른 컴포넌트까지 바꿔요', 'CSS is global by default, so two files using .title let the later one restyle other components'], ['BEM은 블록__요소--변형 규칙으로 이름이 겹치지 않게 하고, 클래스 하나라 명시도도 평평해요', 'BEM’s block__element--modifier names avoid clashes and keep specificity flat with one class'], ['CSS Modules는 빌드 도구가 클래스 이름에 해시를 붙여 파일마다 고유하게 만들어요', 'CSS Modules have the build tool hash class names so each file’s names are unique'], ['@scope는 CSS만으로 범위를 정해요 · .card 안에서, .content를 만나기 전까지만 적용돼요', '@scope sets boundaries in plain CSS: inside .card, stopping where .content begins']],
    fin: [['CSS 범위 관리: 이름 규칙(BEM), 빌드 도구(CSS Modules, CSS-in-JS), 표준(@scope, Shadow DOM)', 'scoping CSS: naming rules (BEM), build tools (CSS Modules, CSS-in-JS) and standards (@scope, Shadow DOM)', 'csx-xs csx-a'], ['Tailwind 같은 유틸리티 클래스는 이름 짓기 자체를 줄이는 다른 접근이에요', 'utility classes such as Tailwind take another route by avoiding most naming'], ['Vue의 scoped, Svelte의 스타일도 빌드에서 고유 속성을 붙이는 방식이에요', 'Vue’s scoped styles and Svelte styles also add unique attributes at build time']],
    caps: [['전역 이름 충돌', 'Global name clashes'], ['BEM', 'BEM'], ['CSS Modules', 'CSS Modules'], ['@scope', '@scope'], ['이름 규칙과 스코프', 'Naming and scoping']]
  });
}

function sNesting() {
  return CW('css-nesting', {
    code: ['.card {', '  padding: 16px;', '  & .title { font-weight: 700; }', '  &:hover { box-shadow: 0 2px 8px #0003; }', '  &.is-active { border-color: blue; }', '  @media (width > 600px) { padding: 24px; }', '  .theme-dark & { background: #222; }', '}'],
    hl: [[2, 1], [3, 2, 'ok'], [5, 1], [6, 1, 'warn']],
    side: [
      [[['펼치면', 'expands to'], 'a'], ['.card .title', 'm'], [['&는 바깥 선택자 자리', '& stands for the outer selector'], '']],
      [['.card:hover', 'm'], ['.card.is-active', 'm'], [['&: 공백 없이 붙이면 같은 요소', '& with no space: the same element'], 'g']],
      [['@media (width > 600px) {', 'm'], ['  .card { padding: 24px } }', 'm'], [['미디어 쿼리도 안에 둘 수 있어요', 'media queries nest too'], 'g']],
      [['.theme-dark .card', 'm'], [['&를 뒤에 두면 부모 조건', '& at the end: a parent condition'], 'w'], [['3단 이상 중첩은 피하세요', 'avoid nesting deeper than 3'], 'r']]
    ],
    notes: [['네이티브 CSS도 Sass처럼 중첩할 수 있어요 · &는 바깥 선택자 .card를 가리켜요', 'native CSS now nests like Sass, with & standing for the outer .card'], ['&:hover, &.is-active처럼 붙여 쓰면 같은 요소의 상태·변형이에요', 'attached forms such as &:hover and &.is-active target states and variants of the same element'], ['@media도 규칙 안에 넣어, 관련 스타일을 한곳에 모아요', '@media can sit inside the rule, keeping related styles together'], ['.theme-dark &처럼 &를 뒤에 두면 “부모가 이럴 때”가 돼요 · 깊은 중첩은 명시도를 높이니 조심해요', '& at the end, as in .theme-dark &, means “when an ancestor matches”; deep nesting raises specificity, so keep it shallow']],
    fin: [['CSS 중첩: 관련 규칙을 부모 안에 모아 쓰는 표준 문법 · 이제 전처리기 없이 브라우저가 지원해요', 'CSS nesting groups related rules inside their parent, now supported natively without a preprocessor', 'csx-xs csx-a'], ['중첩 선택자는 :is()처럼 계산돼 명시도가 예상보다 높아질 수 있어요', 'nested selectors are computed like :is(), so specificity can be higher than expected'], ['Sass의 &-suffix(&__title) 같은 이름 이어 붙이기는 지원하지 않아요', 'Sass-style name concatenation such as &__title is not supported']],
    caps: [['& 중첩', 'Nesting with &'], ['상태와 변형', 'States and variants'], ['중첩된 @media', 'Nested @media'], ['부모 조건', 'Parent conditions'], ['CSS 중첩', 'CSS nesting']]
  });
}

function sA11y() {
  return CW('css-a11y', {
    code: [':focus-visible { outline: 3px solid #36f; }', 'button:focus { outline: none; }   /* ✗ */', '@media (prefers-reduced-motion: reduce) {', '  * { animation: none; transition: none; }', '}', ['.sr-only {        /* 화면에선 숨기고 */', '.sr-only {        /* hidden on screen */'], '  position: absolute; width: 1px; height: 1px;', '  overflow: hidden; clip-path: inset(50%);', ['}                 /* 리더는 읽어요 */', '}                 /* but still read */'], ['a, button { min-height: 44px; } /* 터치 */', 'a, button { min-height: 44px; } /* touch */']],
    hl: [[0, 1, 'ok'], [1, 1, 'danger'], [2, 3], [5, 5, 'ok']],
    draw: (S) => {
      const X = 19.4;
      ['Home', 'Docs', 'Blog'].forEach((t, i) => { sw(S, 'b' + i, X + i * 4.0, 1.2, 3.4, 1.3, tint('line', 14), 0, { r: .4 }); cl(S, 'bl' + i, X + i * 4.0, 1.5, 3.4, t, 'm', 0); });
      S.set('b1', 0, { 'box-shadow': 'none' }); S.set('b1', 1, { 'box-shadow': '0 0 0 .2em var(--accent)' }); S.set('b1', 2, { 'box-shadow': 'none' });
      lbl(S, 'tab', X, 3.0, ['Tab 키로 이동 중 · 지금 어디인지 보여요', 'tabbing through: you can see where you are'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'tab2', X, 3.0, ['outline을 없애면 키보드 사용자는 길을 잃어요', 'removing outlines strands keyboard users'], 'r', 2, { off: 3, w: 12 });
      chip(S, 'rm', X, 4.6, 12.0, ['동작 줄이기 켬 → 애니메이션 끄기', 'reduced motion on → animations off'], 'warn', 3, { off: 4, h: 1.2 });
      sw(S, 'ic', X, 4.6, 1.4, 1.4, tint('accent', 50), 4, { r: .3 }); lbl(S, 'icl', X + 1.8, 4.75, ['🔍 아이콘 버튼 + .sr-only “검색”', '🔍 icon button + .sr-only “Search”'], '', 4, { w: 10 });
      sw(S, 'tg', X, 6.6, 3.4, 3.4, 'transparent', 4, { css: 'border:.08em dashed var(--ok)' }); cl(S, 'tgl', X, 7.9, 3.4, '44px', 'm g', 4);
      lbl(S, 'n4', X + 4.0, 7.0, ['손가락으로 누르기 충분한 크기', 'big enough for a finger'], 'g', 4); lbl(S, 'n5', X + 4.0, 8.1, ['글자 대비 4.5:1 이상', 'text contrast at least 4.5:1'], 'a', 4);
    },
    notes: [[':focus-visible은 키보드로 이동할 때만 초점 테두리를 보여줘요 · 마우스 클릭엔 나타나지 않아요', ':focus-visible shows the focus ring only for keyboard navigation, not for mouse clicks'], ['디자인 때문에 outline: none으로 지우면 키보드 사용자는 지금 어디에 있는지 알 수 없어요', 'removing it with outline: none for looks leaves keyboard users unable to tell where they are'], ['prefers-reduced-motion을 켠 사용자에게는 큰 움직임과 전환을 끄거나 줄여요', 'for users who enable reduced motion, turn off or tone down large motion and transitions'], ['.sr-only는 화면에선 숨기고 스크린 리더엔 읽히게 해요 · 터치 대상은 44px 이상으로', '.sr-only hides text visually while keeping it for screen readers; touch targets should be at least 44px']],
    fin: [['접근성을 지키는 CSS: 초점 표시, 동작 줄이기 존중, 숨김 텍스트, 충분한 대비와 크기', 'accessible CSS keeps focus visible, respects reduced motion, provides hidden labels and ensures contrast and size', 'csx-xs csx-a'], ['display: none은 스크린 리더에서도 사라지니 .sr-only와 구분해요', 'display: none hides content from screen readers too, unlike .sr-only'], ['CSS로 순서를 바꾸면(order, grid) 읽는 순서와 어긋나지 않게 확인해요', 'when reordering with order or grid, check the reading order still makes sense']],
    caps: [[':focus-visible', ':focus-visible'], ['outline: none의 문제', 'The trouble with outline: none'], ['동작 줄이기', 'Reduced motion'], ['숨김 텍스트와 터치 대상', 'Hidden text and touch targets'], ['접근성을 지키는 CSS', 'Accessible CSS']]
  });
}

function sLogical() {
  return CW('css-logical', {
    code: ['.icon { margin-right: 8px; }', '.icon { margin-inline-end: 8px; }', '.box  { padding-block: 8px; }', '.box  { inline-size: 300px; }', 'html[dir="rtl"] { }', '.v { writing-mode: vertical-rl; }'],
    hl: [[0, 1, 'warn'], [1, 1, 'ok'], [2, 2], [5, 1]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'lt', X, .7, 'LTR', 'm a', 0); lbl(S, 'rt', X, 3.2, ['RTL (아랍어)', 'RTL (Arabic)'], 'm w', 0);
      sw(S, 'r1', X, 1.6, 12.0, 1.3, tint('line', 10), 0); sw(S, 'r2', X, 4.1, 12.0, 1.3, tint('line', 10), 0);
      sw(S, 'i1', X + .3, 1.8, .9, .9, tint('accent', 60), 0, { css: 'z-index:3' }); sw(S, 't1', X + 1.8, 1.9, 5.0, .7, tint('ink-3', 40), 0, { css: 'z-index:3' });
      sw(S, 'i2', X + 10.8, 4.3, .9, .9, tint('accent', 60), 0, { css: 'z-index:3' }); sw(S, 't2', X + 5.2, 4.4, 5.0, .7, tint('ink-3', 40), 0, { css: 'z-index:3' });
      sw(S, 'g1', X + 1.2, 1.8, .6, .9, tint('warn', 60), 1, { css: 'z-index:3' }); sw(S, 'g2a', X + 11.7, 4.3, .3, .9, tint('danger', 60), 1, { off: 2, css: 'z-index:3' });
      S.set('t2', 1, { transform: 'translateX(.6em)' });
      lbl(S, 'n1', X, 6.0, ['right 고정: RTL에선 간격이 엉뚱한 쪽에', 'right is fixed: wrong side in RTL'], 'r', 1, { off: 2, w: 12 });
      sw(S, 'g2b', X + 10.2, 4.3, .6, .9, tint('ok', 60), 2, { css: 'z-index:3' }); S.set('t2', 2, { transform: 'translateX(0em)' });
      lbl(S, 'n2', X, 6.0, ['inline-end: 글 방향을 따라 뒤집혀요', 'inline-end flips with the text direction'], 'g', 2, { off: 3, w: 12 });
      ar(S, 'ia', [X, 8.0], [X + 6.0, 8.0], 'accent', 3, { h: .1 }); lbl(S, 'ial', X + 6.3, 7.75, ['inline: 글이 흐르는 방향', 'inline: the text direction'], 'a', 3);
      ar(S, 'ba', [X, 8.0], [X, 11.0], 'warn', 3, { h: .1 }); lbl(S, 'bal', X + .4, 10.5, ['block: 줄이 쌓이는 방향', 'block: how lines stack'], 'w', 3);
      lbl(S, 'n4', X, 12.0, ['세로쓰기에선 두 축이 함께 돌아가요', 'in vertical writing both axes rotate'], 'a', 4); T(S, 'vt', X + 10.2, 8.9, ['세로쓰기', 'vertical'], 'csx-xs', 4, { css: 'writing-mode:vertical-rl' });
    },
    notes: [['margin-right는 언제나 오른쪽이라, 아랍어처럼 오른쪽에서 왼쪽으로 쓰는 화면에선 간격이 엉뚱한 쪽에 생겨요', 'margin-right is always on the right, so in right-to-left languages such as Arabic the gap lands on the wrong side'], ['margin-inline-end는 “글이 끝나는 쪽”이라 dir="rtl"이면 자동으로 왼쪽이 돼요', 'margin-inline-end means the side where text ends, so it becomes the left under dir="rtl"'], ['inline은 글이 흐르는 방향, block은 줄이 쌓이는 방향이에요 · width는 inline-size, height는 block-size', 'inline is the direction text flows and block the direction lines stack; width becomes inline-size and height block-size'], ['writing-mode로 세로쓰기를 하면 두 축이 함께 돌아가서 논리 속성은 그대로 맞아요', 'with vertical writing modes both axes rotate, and logical properties still fit']],
    fin: [['논리 속성: 위·아래·왼쪽·오른쪽 대신 글의 흐름(inline·block, start·end)을 기준으로 쓰는 속성', 'logical properties use the flow of text (inline, block, start, end) instead of top, bottom, left and right', 'csx-xs csx-a'], ['다국어 서비스라면 처음부터 논리 속성으로 쓰는 게 좋아요', 'multilingual products benefit from logical properties from day one'], ['inset-inline-start, border-block-end, text-align: start처럼 거의 모든 속성에 짝이 있어요', 'nearly every property has a logical twin, such as inset-inline-start, border-block-end and text-align: start']],
    caps: [['물리 속성의 문제', 'The trouble with physical properties'], ['inline-end', 'inline-end'], ['inline과 block 축', 'Inline and block axes'], ['세로쓰기', 'Vertical writing'], ['논리 속성', 'Logical properties']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('css-sel', '선택자와 캐스케이드', 'Selectors & cascade', '선택자와 캐스케이드', 'Selectors and the cascade', '어떤 요소를 고르고, 여러 규칙이 겹칠 때 어떤 값이 이기는지예요.', 'Which elements a rule picks, and which value wins when rules collide.', [
    item('css-cascade', '캐스케이드', 'The cascade', '같은 요소에 여러 규칙이 겹칠 때 하나의 값을 고르는 규칙이에요. 출처와 중요도, 레이어, 명시도, 등장 순서 순으로 비교해요.', '브라우저 기본값은 a를 파랗게, 작성자 CSS는 회색으로 칠하면 작성자 CSS가 이겨요. 출처가 같으면 명시도로 겨뤄서 #home(ID)이 .nav a와 a를 이기고, 나중에 쓴 a { color: red }도 명시도가 낮아 져요. 등장 순서는 명시도가 똑같을 때만 승부를 가려요. !important는 이 순서를 뒤집지만, 남발하면 이기기 위해 !important를 더 쓰는 악순환이 생겨요. DevTools의 Styles 패널은 진 선언에 취소선을 그어 보여줘요.', 'The rule that picks one value when several rules target the same element, comparing origin and importance, layers, specificity, then source order.', 'If the browser default colors a link blue and author CSS colors it gray, the author wins. With equal origin, specificity decides: #home (an ID) beats .nav a and a, and even a later a { color: red } loses on specificity. Source order breaks ties only between equal specificities. !important overturns all this, but overuse starts an arms race of more !important. The DevTools Styles panel strikes through losing declarations.', sCascade()),
    item('css-specificity', '명시도', 'Specificity', '선택자의 (ID, 클래스, 태그) 개수로 정하는 우선순위예요. 왼쪽 칸부터 비교해서, 클래스가 아무리 많아도 ID 하나를 못 이겨요.', 'p는 0,0,1, .note p는 0,1,1, .card .note p는 0,2,1, #main p는 1,0,1이라 #main p가 가장 강해요. :hover 같은 가상 클래스와 [type] 같은 속성 선택자는 클래스로 세고, ::before 같은 가상 요소는 태그로 세요. :where()는 항상 0이고 :is()는 인자 중 가장 센 값을 써요. 인라인 style 속성은 모든 선택자보다 강해요. 스타일에 ID와 인라인 스타일을 피하고 클래스 하나로 쓰면 명시도가 평평해져 덮어쓰기가 쉬워요.', 'A priority computed from a selector’s counts of IDs, classes and tags, compared column by column from the left, so no number of classes beats one ID.', 'p is 0,0,1, .note p is 0,1,1, .card .note p is 0,2,1 and #main p is 1,0,1, so #main p is strongest. Pseudo-classes such as :hover and attribute selectors such as [type] count as classes, and pseudo-elements such as ::before as tags. :where() always counts as 0, while :is() takes its strongest argument. An inline style attribute beats every selector. Avoiding IDs and inline styles and using single classes keeps specificity flat and overrides easy.', sSpecificity()),
    item('css-inherit', '상속', 'Inheritance', '글자 관련 속성은 부모에서 자식으로 상속되고, 상자 관련 속성은 상속되지 않아요. inherit·initial·unset으로 이 동작을 직접 정할 수 있어요.', 'body에 color와 font-size를 한 번만 정하면 그 안의 p와 a가 물려받아요. 반면 .box의 border, padding, margin, background는 자식에게 내려가지 않아요. 링크는 브라우저가 따로 파랑을 주기 때문에 a { color: inherit }로 부모 색을 따르게 하고, button·input은 글꼴을 상속하지 않아 font: inherit을 자주 써요. initial은 명세의 기본값, unset은 상속 속성이면 inherit 아니면 initial이에요. all: unset은 모든 속성을 한 번에 초기화해요.', 'Text properties inherit from parent to child while box properties do not; inherit, initial and unset control this explicitly.', 'Setting color and font-size once on body lets every p and a inside inherit them, while .box’s border, padding, margin and background stay with .box. Browsers give links their own blue, so a { color: inherit } follows the parent instead, and buttons and inputs do not inherit fonts, hence font: inherit. initial means the specification default, and unset means inherit for inherited properties and initial otherwise. all: unset resets every property at once.', sInherit()),
    item('css-selectors', '선택자 조합', 'Combining selectors', '결합자(공백, >, +, ~)로 요소 사이의 관계를, [속성]으로 속성 값을, :nth-child로 위치를 조건으로 요소를 골라요.', 'nav a는 nav 안 어디에 있든 모든 링크를, nav > a는 바로 아래 자식 링크만 골라요. h2 + p는 h2 바로 다음 형제 하나, h2 ~ p는 그 뒤의 모든 p예요. a[href^="https"]는 https로 시작하는 링크, input[type="email"]은 이메일 입력창이에요(^= 시작, $= 끝, *= 포함). li:nth-child(2n)은 짝수 번째, :first-child·:last-child는 처음과 끝이에요. 브라우저는 선택자를 오른쪽 끝부터 맞춰 보므로, 깊은 체인보다 짧은 클래스 선택자가 읽기도 빠르기도 좋아요.', 'Combinators (space, >, +, ~) express relationships, [attribute] selectors match attribute values, and :nth-child matches positions.', 'nav a matches every link anywhere inside nav, while nav > a matches only direct children. h2 + p is the single sibling right after an h2, and h2 ~ p every later p. a[href^="https"] matches links starting with https and input[type="email"] email inputs (^= starts, $= ends, *= contains). li:nth-child(2n) picks even items, and :first-child and :last-child the ends. Browsers match selectors from the rightmost part, so short class selectors beat deep chains for both readability and speed.', sSelectors()),
    item('css-pseudo', '가상 클래스와 가상 요소', 'Pseudo-classes and pseudo-elements', '가상 클래스(:)는 :hover처럼 요소의 상태를, 가상 요소(::)는 ::after처럼 요소의 일부나 덧붙인 내용을 골라요.', 'a:hover는 마우스가 올라갔을 때, input:focus-visible은 키보드로 초점을 옮겼을 때, input:invalid는 입력이 형식에 맞지 않을 때, button:disabled는 비활성일 때 적용돼요. .req::after { content: " *" }는 필수 항목 옆에 별표를 덧붙이고, ::first-line은 첫 줄, ::selection은 드래그한 영역, ::marker는 목록 글머리표를 꾸며요. ::before·::after는 content가 있어야 나타나고 장식용이라 중요한 정보는 넣지 않아요. :hover만으로 기능을 숨기면 터치 기기에서 쓸 수 없어요.', 'Pseudo-classes (:) select states such as :hover, and pseudo-elements (::) select parts or generated content such as ::after.', 'a:hover applies under the pointer, input:focus-visible on keyboard focus, input:invalid when input fails validation and button:disabled when inactive. .req::after { content: " *" } adds an asterisk to required fields, ::first-line styles the first line, ::selection highlighted text and ::marker list bullets. ::before and ::after need content to appear and are decorative, so keep essential information out of them. Hiding features behind :hover alone breaks them on touch devices.', sPseudo()),
    item('css-has', ':has()와 :is()·:where()', ':has(), :is() and :where()', ':has()는 “이런 자식을 가진 부모”를 고르는 선택자이고, :is()와 :where()는 여러 선택자를 하나로 묶어요. :where()는 명시도가 0이에요.', '.card:has(img)는 이미지가 들어 있는 카드만 골라 여백을 없애요. 오랫동안 불가능했던 부모 선택자라, form:has(:invalid) .submit처럼 상태를 조합하면 JS 없이도 폼 전체 스타일을 바꿀 수 있어요. :is(h1, h2, h3) a는 h1 a, h2 a, h3 a를 짧게 쓴 것이고 명시도는 인자 중 가장 센 값이에요. :where(ul, ol) li는 같은 뜻이지만 명시도가 0이라 리셋이나 라이브러리 기본 스타일을 .list li 하나로 쉽게 덮을 수 있어요. :has()는 계산 비용이 있어 body:has()처럼 넓은 범위에는 신중하게 써요.', ':has() selects a parent that contains a match, while :is() and :where() group selectors; :where() has zero specificity.', '.card:has(img) picks only cards containing an image and removes their padding. As the long-missing parent selector, combined states such as form:has(:invalid) .submit restyle a whole form without JavaScript. :is(h1, h2, h3) a is shorthand for h1 a, h2 a, h3 a, with the specificity of its strongest argument. :where(ul, ol) li means the same with zero specificity, so resets and library defaults are easy to override with a plain .list li. :has() has a cost, so use it carefully on broad scopes such as body:has().', sHas()),
    item('css-layers', '캐스케이드 레이어', 'Cascade layers', '@layer로 CSS를 우선순위 층으로 나눠요. 레이어 순서가 명시도보다 먼저 비교되어 명시도 싸움을 구조로 해결해요.', '@layer reset, base, components, utilities;처럼 첫 줄에 적은 순서대로 뒤의 레이어가 강해요. 그래서 components 안의 #app .btn(명시도 1,1,0)도 utilities의 .text-red(0,1,0)에 져요. 레이어에 속하지 않은 일반 CSS는 모든 레이어보다 강하고, !important 선언은 레이어 순서가 거꾸로 적용돼요. @import url(lib.css) layer(vendor)로 외부 라이브러리를 가장 낮은 층에 넣으면 내 스타일로 쉽게 덮을 수 있어요. Tailwind v4도 내부적으로 @layer를 사용해요.', '@layer splits CSS into priority tiers whose order is compared before specificity, resolving specificity wars by structure.', 'With @layer reset, base, components, utilities; later layers win in the order of that first statement. So #app .btn in components (specificity 1,1,0) loses to .text-red in utilities (0,1,0). Unlayered CSS beats every layer, and for !important declarations the layer order reverses. Importing a library with @import url(lib.css) layer(vendor) puts it in the lowest tier, easy to override. Tailwind v4 uses @layer internally too.', sLayers()),
  ]),
  sec('css-boxflow', '박스와 흐름', 'Boxes & flow', '박스와 흐름', 'Boxes and flow', '모든 요소가 상자라는 데서 시작해, 상자가 흐름 속에서 어떻게 놓이고 겹치고 넘치는지예요.', 'Starting from the fact that every element is a box: how boxes sit in the flow, overlap and overflow.', [
    item('css-boxmodel', '박스 모델', 'The box model', '모든 요소는 content, padding, border, margin 네 겹의 상자예요. box-sizing이 width가 어디까지를 가리키는지 정해요.', 'width: 200px, padding: 20px, border: 5px를 주면 기본값 content-box에서는 width가 내용만 가리켜 실제 폭이 200 + 40 + 10 = 250px이 돼요. box-sizing: border-box면 width가 테두리까지 포함해 지정한 200px 그대로이고 내용 영역이 150px로 줄어요. 계산이 직관적이라 대부분의 프로젝트가 *, *::before, *::after에 border-box를 전역으로 걸어요. margin은 상자 바깥의 간격이라 어느 방식이든 폭에 들어가지 않고, padding까지는 배경색이 칠해져요.', 'Every element is a box of four layers: content, padding, border and margin; box-sizing decides what width measures.', 'With width: 200px, padding: 20px and border: 5px, the default content-box applies width to the content alone, so the box is really 200 + 40 + 10 = 250px wide. With box-sizing: border-box, width includes padding and border, staying at 200px while the content shrinks to 150px. Because this is intuitive, most projects set border-box globally on *, *::before, *::after. Margin is space outside the box and never counts toward width, while the background paints through the padding.', sBoxModel()),
    item('css-margincollapse', '마진 상쇄', 'Margin collapsing', '블록 흐름에서 세로로 맞닿은 마진은 더해지지 않고 겹쳐 큰 값 하나만 남아요. 부모 밖으로 새어 나가기도 해요.', 'h2의 margin-bottom 30px과 p의 margin-top 20px 사이 간격은 50px이 아니라 30px이에요. 부모에 패딩·테두리가 없으면 첫 자식의 margin-top 40px이 부모 밖으로 새어 나가 부모 전체가 내려가요. 부모에 display: flow-root를 주면 새 블록 서식 맥락이 생겨 마진이 안에 머물러요. 가로 마진, flex·grid 아이템, absolute 요소에서는 상쇄가 일어나지 않아요. 그래서 요즘은 자식의 margin 대신 부모의 gap으로 간격을 관리하는 경우가 많아요.', 'In block flow, adjoining vertical margins overlap instead of adding, leaving only the larger, and can even leak out of the parent.', 'The gap between an h2 with margin-bottom: 30px and a p with margin-top: 20px is 30px, not 50px. With no padding or border on the parent, a first child’s margin-top: 40px leaks out and pushes the whole parent down. display: flow-root on the parent creates a new block formatting context that keeps the margin inside. Horizontal margins, flex and grid items and absolutely positioned elements never collapse. That is why spacing is now often managed with the parent’s gap instead of child margins.', sMarginCollapse()),
    item('css-display', 'display', 'display', 'display는 요소가 주변과 어떻게 흐를지(block·inline)와 자식을 어떻게 배치할지(flex·grid)를 정해요. none이면 자리까지 사라져요.', 'div 같은 block 요소는 한 줄을 통째로 차지하며 아래로 쌓이고, span 같은 inline 요소는 글자처럼 옆으로 흐르다 줄바꿈하며 width·height와 위아래 margin이 듣지 않아요. inline-block은 줄 안에 놓이면서도 폭과 높이를 가질 수 있어 태그나 배지에 써요. display: flex·grid는 자식들의 배치 방식을 바꿔요. display: none은 자리까지 없애고 스크린 리더에서도 사라지지만, visibility: hidden은 보이지만 않을 뿐 자리를 남겨요.', 'display sets how an element flows among its neighbors (block, inline) and how its children are laid out (flex, grid); none removes it entirely.', 'Block elements such as div take a whole line and stack downward, while inline elements such as span flow sideways like text, wrapping, and ignore width, height and vertical margins. inline-block sits in a line yet takes a width and height, handy for tags and badges. display: flex and grid change how the children are arranged. display: none removes the element and its space, even for screen readers, whereas visibility: hidden only hides it and keeps the space.', sDisplay()),
    item('css-position', 'position', 'position', 'position은 요소를 흐름 속 어디에 놓을지 정해요. relative, absolute, fixed, sticky가 각각 다른 기준으로 위치를 잡아요.', '.a { position: relative; top: 10px }는 원래 자리를 기준으로 살짝 옮기되 원래 자리는 비워 둬요. absolute는 흐름에서 빠져, position이 지정된 가장 가까운 조상(.card) 기준으로 놓여서 카드 모서리의 배지에 써요. sticky는 평소엔 흐름대로 있다가 스크롤해서 top: 0에 닿으면 그 자리에 붙어요(헤더, 표 머리글). fixed는 뷰포트 기준이라 스크롤해도 같은 자리에 있어요(플로팅 버튼). 조상에 transform이 있으면 fixed도 그 조상 기준이 되니 주의해요.', 'position chooses how an element is placed relative to the flow: relative, absolute, fixed and sticky each use a different reference.', '.a { position: relative; top: 10px } nudges an element from its normal spot while keeping that spot reserved. absolute leaves the flow and is placed against the nearest positioned ancestor, such as .card, which suits corner badges. sticky stays in the flow until scrolling reaches top: 0, then sticks there, as for headers and table heads. fixed is placed against the viewport and stays put while scrolling, as for floating buttons. Beware: an ancestor with transform becomes the reference even for fixed elements.', sPosition()),
    item('css-zindex', 'z-index와 쌓임 맥락', 'z-index and stacking contexts', 'z-index는 같은 쌓임 맥락 안에서만 비교돼요. 부모가 맥락을 만들면 자식은 z-index 9999여도 부모의 순서를 넘을 수 없어요.', '.a(z 1)와 .b(z 2)는 .b가 위예요. 그런데 .a에 opacity: .99를 주면 .a가 쌓임 맥락이 되어, 안쪽 .menu의 z-index 9999는 .a 상자 안에서만 비교되고 결국 .b 아래에 깔려요. opacity 1 미만, transform, filter, position과 z-index 조합, isolation: isolate 등이 맥락을 만들어요. “z-index가 안 먹는다”의 원인은 거의 항상 조상의 쌓임 맥락이에요. <dialog>와 popover는 문서 전체 위의 최상위 레이어에 그려져 이 싸움에서 벗어나요.', 'z-index is compared only within one stacking context; once a parent creates a context, its children cannot escape its order even at z-index 9999.', '.a (z 1) and .b (z 2) put .b on top. Give .a opacity: .99 and it becomes a stacking context, so its .menu with z-index 9999 competes only inside .a and still ends up under .b. Opacity below 1, transform, filter, positioned z-index and isolation: isolate all create contexts. “z-index does nothing” is almost always an ancestor’s stacking context. <dialog> and popovers render in the top layer above the whole document, escaping the contest.', sZindex()),
    item('css-overflow', 'overflow와 말줄임', 'Overflow and ellipsis', 'overflow는 상자보다 큰 내용을 어떻게 처리할지 정해요. visible(넘침), hidden(자름), auto(필요할 때 스크롤)가 대표 값이에요.', '높이 120px 상자에 글이 많으면 기본값 visible이라 상자 밖으로 흘러넘쳐 다른 요소를 덮어요. overflow: hidden은 넘친 부분을 잘라 버리니 내용이 사라질 수 있어 신중하게 써요. overflow: auto는 넘칠 때만 스크롤 막대를 만들어요. 한 줄 말줄임은 white-space: nowrap, overflow: hidden, text-overflow: ellipsis 세 가지를 함께 줘야 하고, 여러 줄은 line-clamp를 써요. flex 자식 안에서 말줄임이 안 되면 min-width: 0을 더해요.', 'overflow decides what happens to content larger than its box: visible spills, hidden clips and auto scrolls when needed.', 'With lots of text in a 120px-tall box, the default visible lets it spill out over neighboring elements. overflow: hidden clips the excess, which can hide content, so use it carefully. overflow: auto adds a scrollbar only when needed. A one-line ellipsis needs white-space: nowrap, overflow: hidden and text-overflow: ellipsis together, and multiple lines use line-clamp. If the ellipsis fails inside a flex child, add min-width: 0.', sOverflow()),
    item('css-units', 'CSS 단위', 'CSS units', 'px는 고정 크기이고, rem·em·%·vw·vh·dvh·ch는 무엇인가를 기준으로 한 상대 크기예요. clamp()로 범위 안에서 유동적으로 바꿀 수 있어요.', 'rem은 루트(html) 글자 크기 기준이라 중첩돼도 2rem은 늘 32px이에요. em은 자기 글자 크기 기준이라 font-size에 em을 쓰면 중첩될수록 누적돼 커져요. %는 부모 기준, vw·vh는 화면의 1%이고, 모바일에선 주소창이 나타나고 사라지는 것을 반영하는 dvh가 정확해요. ch는 글자 “0”의 폭이라 본문 줄 길이를 65ch 정도로 제한할 때 좋아요. clamp(24px, 5vw, 48px)는 화면에 따라 커지되 24~48px 사이에 머물러요. 글자 크기를 rem으로 두면 사용자의 브라우저 글꼴 설정을 존중해요.', 'px is a fixed size, while rem, em, %, vw, vh, dvh and ch are relative to something; clamp() makes values fluid within bounds.', 'rem is based on the root font size, so 2rem is always 32px however deep the nesting. em is based on the element’s own font size, so em font sizes compound as they nest. % is relative to the parent and vw and vh to 1% of the viewport; on mobile, dvh accounts for toolbars appearing and disappearing. ch is the width of “0”, ideal for capping body text at about 65ch. clamp(24px, 5vw, 48px) grows with the screen yet stays between 24 and 48px. rem font sizes also respect the user’s browser font setting.', sUnits()),
  ]),
  sec('css-layout', '레이아웃', 'Layout', 'Flexbox와 Grid, 반응형 레이아웃', 'Flexbox, Grid and responsive layout', '한 방향 배치의 Flexbox, 두 방향 배치의 Grid, 그리고 화면과 컨테이너 크기에 반응하는 방법이에요.', 'Flexbox for one direction, Grid for two, and responding to screen and container sizes.', [
    item('css-flex', 'Flexbox의 두 축', 'The two axes of Flexbox', 'display: flex는 자식을 주축 한 방향으로 늘어놓아요. justify-content는 주축, align-items는 교차축 방향의 정렬이에요.', 'display: flex를 주면 블록처럼 쌓이던 자식들이 가로(주축)로 나란히 놓여요. justify-content: space-between은 양 끝에 붙이고 사이를 균등하게, center는 가운데로 모아요. align-items: center는 높이가 서로 달라도 세로(교차축) 가운데에 맞춰요. flex-direction: column이면 주축이 세로로 바뀌어 justify와 align의 방향도 함께 바뀌어요. gap으로 아이템 사이 간격을, flex-wrap: wrap으로 넘치는 아이템의 줄바꿈을 정해요. 내비게이션, 버튼 묶음, 카드 안 배치처럼 한 방향 정렬에 가장 많이 써요.', 'display: flex lines children up along one main axis; justify-content aligns along the main axis and align-items along the cross axis.', 'display: flex turns children that stacked like blocks into a horizontal row along the main axis. justify-content: space-between pins items to both ends with even spacing, and center gathers them in the middle. align-items: center centers items of different heights on the vertical cross axis. flex-direction: column makes the main axis vertical, swapping the directions of justify and align. gap sets the space between items, and flex-wrap: wrap lets overflowing items wrap. It is the go-to tool for one-directional alignment such as navigation bars, button groups and card internals.', sFlex()),
    item('css-flexgrow', 'flex-grow·shrink·basis', 'flex-grow, shrink and basis', 'flex: grow shrink basis는 아이템의 기본 크기(basis)와, 공간이 남을 때 늘어나는 비율(grow), 모자랄 때 줄어드는 비율(shrink)이에요.', '.side { flex: 0 0 200px }는 늘지도 줄지도 않는 200px, .main { flex: 1 }은 남는 공간을 모두 차지해서 창을 넓히면 main만 커져요. flex-grow가 1과 2면 남는 공간을 1 : 2로 나눠 가져요. 공간이 모자라면 flex-shrink 비율로 줄어드는데, 로고처럼 찌그러지면 안 되는 요소는 flex-shrink: 0을 줘요. flex 아이템은 기본 min-width가 내용 크기라 긴 글이 줄어들지 않으니, 말줄임이 필요하면 min-width: 0을 줘요. flex: 1은 flex: 1 1 0%의 줄임말이에요.', 'flex: grow shrink basis sets an item’s base size, its share of extra space (grow) and how it gives way when space runs short (shrink).', '.side { flex: 0 0 200px } stays at 200px, while .main { flex: 1 } takes all leftover space, so only main grows as the window widens. flex-grow values of 1 and 2 split the leftover space 1 : 2. When space runs short, items shrink by their flex-shrink ratio, so things that must not squash, such as logos, get flex-shrink: 0. Flex items default to a content-sized min-width, so long text will not shrink until you add min-width: 0 for an ellipsis. flex: 1 is shorthand for flex: 1 1 0%.', sFlexGrow()),
    item('css-grid', 'Grid 기초', 'Grid basics', 'display: grid는 행과 열을 먼저 정의하고 아이템을 칸에 배치하는 2차원 레이아웃이에요. fr 단위는 남은 공간의 비율이에요.', 'grid-template-columns: 200px 1fr 1fr은 고정 열 하나와 남은 공간을 반씩 나누는 열 두 개를 만들고, grid-template-rows: auto 1fr은 내용 높이의 행과 나머지를 채우는 행을 만들어요. gap은 칸 사이 간격이에요. 칸 사이의 선에는 1부터 번호가 붙어 grid-column: 1 / -1은 처음부터 끝까지 한 줄 전체를 차지하고, grid-row: span 2는 두 행을 차지해요. 한 방향 정렬은 Flexbox, 행과 열이 함께 맞아야 하는 페이지 골격이나 카드 목록은 Grid가 알맞아요.', 'display: grid is a two-dimensional layout: define rows and columns first, then place items into cells; fr is a share of the remaining space.', 'grid-template-columns: 200px 1fr 1fr creates one fixed column and two that split the remaining space, and grid-template-rows: auto 1fr a content-height row plus one that fills the rest. gap sets the space between tracks. Grid lines are numbered from 1, so grid-column: 1 / -1 spans the whole row and grid-row: span 2 takes two rows. Use Flexbox for one direction and Grid when rows and columns must line up, as in page skeletons and card lists.', sGrid()),
    item('css-gridareas', 'grid-template-areas', 'grid-template-areas', '문자열로 그린 지도에 영역 이름을 적어 페이지 골격을 정의하는 방법이에요. 미디어 쿼리에서 지도만 바꾸면 배치가 바뀌어요.', '"head head" "side main" "foot foot"처럼 적으면 같은 이름이 이어진 칸이 하나의 영역이 돼요. header { grid-area: head }처럼 이름을 주면 각 요소가 지도에서 자기 자리를 찾아가요. 좁은 화면의 미디어 쿼리에서 지도를 "head" "main" "side" "foot"로 바꾸면 같은 HTML이 세로로 재배치돼요. HTML 순서와 화면 배치를 분리할 수 있지만, 읽는 순서와 너무 다르면 키보드·스크린 리더 사용자가 헷갈려요. 빈칸은 점(.)으로 표시하고, 영역은 반드시 직사각형이어야 해요.', 'A string map of named areas defines the page skeleton; changing only the map in a media query rearranges the layout.', 'Writing "head head" "side main" "foot foot" turns consecutive cells with the same name into one area. Naming elements, as in header { grid-area: head }, sends each to its place on the map. Changing the map in a narrow-screen media query to "head" "main" "side" "foot" restacks the same HTML vertically. Source order and visual order become independent, but straying far from reading order confuses keyboard and screen reader users. Empty cells are written as a dot (.), and areas must be rectangles.', sGridAreas()),
    item('css-autofit', '반응형 그리드 auto-fill·auto-fit', 'Responsive grids with auto-fill and auto-fit', 'repeat(auto-fill, minmax(200px, 1fr))은 미디어 쿼리 없이도 화면 폭에 맞춰 열 수가 저절로 바뀌는 그리드예요.', 'minmax(200px, 1fr)은 “최소 200px, 남으면 같은 비율로 늘어남”이라는 뜻이고, auto-fill은 이 조건으로 들어갈 수 있는 만큼 열을 만들어요. 그래서 넓은 화면에선 4열, 좁아지면 2열, 휴대폰에선 1열로 저절로 줄어요. 아이템이 적을 때 auto-fill은 빈 칸을 남겨 두고, auto-fit은 빈 칸을 접어 남은 아이템을 넓게 늘려요. 카드 목록, 갤러리, 상품 그리드의 단골 패턴이에요. 최솟값이 컨테이너보다 크면 넘칠 수 있으니 minmax(min(200px, 100%), 1fr)로 감싸요.', 'repeat(auto-fill, minmax(200px, 1fr)) creates a grid whose column count follows the available width with no media queries.', 'minmax(200px, 1fr) means at least 200px and stretching evenly when there is room, and auto-fill creates as many such columns as fit. A wide screen gets four columns, a narrower one two, and a phone one, all automatically. With few items, auto-fill keeps the empty tracks while auto-fit collapses them and stretches the remaining items. It is a staple for card lists, galleries and product grids. If the minimum can exceed the container, wrap it as minmax(min(200px, 100%), 1fr).', sAutoFit()),
    item('css-centering', '가운데 정렬', 'Centering', '무엇을(글자·블록·아이템) 어느 방향으로 가운데에 놓을지에 따라 도구가 달라요. 요즘은 flex나 grid 한 줄로 대부분 해결돼요.', '글자 같은 인라인 내용은 text-align: center, 폭이 정해진 블록은 margin-inline: auto로 가로 가운데에 놓아요. 가로·세로 모두 가운데는 flex 컨테이너에 justify-content: center와 align-items: center를 주거나, grid에 place-items: center 한 줄이면 돼요. 크기가 정해진 모달처럼 겹쳐 놓을 요소는 position: absolute; inset: 0; margin: auto로 가운데에 놓을 수 있어요. vertical-align은 인라인 요소와 표 셀에만 듣고 블록에는 듣지 않아요.', 'The right tool depends on what is centered (text, block or item) and in which direction; flex or grid handle most cases in a line or two.', 'Inline content such as text centers with text-align: center, and a block with a set width with margin-inline: auto. For both directions, a flex container with justify-content: center and align-items: center, or a grid with place-items: center, does the job. An overlay of known size such as a modal can center with position: absolute; inset: 0; margin: auto. vertical-align works only on inline elements and table cells, not on blocks.', sCentering()),
    item('css-media', '미디어 쿼리와 모바일 우선', 'Media queries and mobile first', '미디어 쿼리는 화면 폭이나 사용자 환경에 따라 다른 스타일을 적용하는 조건문이에요. 좁은 화면을 기본으로 쓰고 넓은 화면을 덧붙이는 게 모바일 우선이에요.', '기본 스타일을 1열로 쓰고 @media (min-width: 768px)에서 2열, (min-width: 1200px)에서 3열을 덧붙이면 조건이 겹칠 때 뒤의 규칙이 이겨요. 모바일 기기는 대개 단순한 레이아웃을 쓰므로 이렇게 쌓아 가는 편이 덮어쓸 코드가 적어요. 폭뿐 아니라 (hover: hover)로 마우스가 있는 기기에만 hover 효과를, prefers-reduced-motion과 prefers-color-scheme으로 사용자 설정을 반영해요. HTML에 <meta name="viewport" content="width=device-width">가 없으면 모바일에서 동작하지 않아요.', 'Media queries apply styles conditionally by viewport width or user environment; mobile first writes the narrow layout as the base and adds rules for wider screens.', 'Writing one column as the base and adding two columns at @media (min-width: 768px) and three at (min-width: 1200px) works because later rules win where conditions overlap. Mobile layouts are usually simpler, so building upward leaves less to override. Beyond width, (hover: hover) limits hover effects to devices with a mouse, and prefers-reduced-motion and prefers-color-scheme reflect user settings. Without <meta name="viewport" content="width=device-width"> in the HTML, mobile browsers ignore all this.', sMedia()),
    item('css-container', '컨테이너 쿼리', 'Container queries', '화면이 아니라 부모 컨테이너의 크기에 반응하는 스타일이에요. 같은 컴포넌트가 놓인 자리에 맞춰 스스로 모양을 바꿔요.', '.slot에 container-type: inline-size를 주면 그 안의 요소가 @container (min-width: 400px)로 부모 칸의 폭을 물어볼 수 있어요. 같은 카드라도 좁은 사이드바 안에서는 이미지와 글이 세로로 쌓이고, 넓은 main 안에서는 가로로 놓여요. 화면 크기는 같아도 컴포넌트마다 다른 배치가 되는 거예요. cqi 단위는 컨테이너 폭의 1%라 clamp(1rem, 6cqi, 1.5rem)처럼 제목 크기도 칸에 맞춰요. 페이지 골격은 미디어 쿼리, 컴포넌트 안쪽은 컨테이너 쿼리로 나눠 쓰면 재사용성이 높아져요.', 'Styles that respond to the size of a parent container instead of the viewport, so a component adapts to wherever it is placed.', 'Giving .slot container-type: inline-size lets descendants ask about that slot’s width with @container (min-width: 400px). The same card stacks image and text vertically in a narrow sidebar and lays them side by side in a wide main area, on the very same screen. The cqi unit is 1% of the container’s width, so clamp(1rem, 6cqi, 1.5rem) sizes headings to the slot. Using media queries for the page skeleton and container queries inside components makes components truly reusable.', sContainer()),
  ]),
  sec('css-visual', '시각 표현', 'Visual styling', '색, 글꼴, 움직임', 'Color, type and motion', '색을 표현하는 방법, 변수와 테마, 글꼴과 타이포그래피, 그리고 전환·애니메이션·변형이에요.', 'Ways to express color, variables and themes, fonts and typography, and transitions, animation and transforms.', [
    item('css-color', '색 표현', 'Expressing color', 'hex·rgb는 빨강·초록·파랑의 양으로, hsl은 색상·채도·명도로, oklch는 사람 눈에 균일한 밝기로 색을 적어요.', '#3366ff와 rgb(51 102 255)는 같은 색이고, rgb(51 102 255 / 80%)처럼 / 뒤에 투명도를 적어요. hsl(225 100% 60%)은 명도만 바꿔 같은 색의 밝고 어두운 단계를 만들기 쉬워요. 하지만 hsl에서 명도 50%인 노랑은 파랑보다 훨씬 밝아 보이는데, oklch는 같은 명도면 눈에도 같은 밝기라 디자인 시스템의 색 단계를 만들기 좋고 P3 같은 넓은 색역도 표현해요. color-mix(in oklch, red, blue)는 두 색을 섞고, currentColor는 현재 글자색을 테두리나 아이콘에 그대로 써요.', 'hex and rgb describe amounts of red, green and blue, hsl uses hue, saturation and lightness, and oklch uses perceptually uniform lightness.', '#3366ff and rgb(51 102 255) are the same color, and alpha follows a slash, as in rgb(51 102 255 / 80%). hsl(225 100% 60%) makes tints and shades easy by changing only lightness. Yet at 50% lightness in hsl, yellow looks far brighter than blue, while in oklch equal lightness looks equally bright, which suits design-system color scales and wide gamuts such as P3. color-mix(in oklch, red, blue) blends two colors, and currentColor reuses the text color for borders and icons.', sColor()),
    item('css-vars', 'CSS 변수', 'CSS variables', '--brand처럼 --로 시작하는 커스텀 속성에 값을 두고 var()로 꺼내 써요. 상속되고, 범위 안에서 덮어쓸 수 있고, 실행 중에도 바뀌어요.', ':root { --brand: #36f }에 정한 색을 .btn { background: var(--brand) }로 쓰면 한 곳만 고쳐도 모든 버튼이 바뀌어요. 커스텀 속성도 상속되는 일반 속성이라 .danger { --brand: #e33 }처럼 범위 안에서 다시 정하면 그 안의 버튼만 빨개져요. 테마마다 변수 값만 바꾸면 다크 모드 같은 전체 전환이 쉬워요. var(--accent, #36f)처럼 기본값을 둘 수 있고, JS의 el.style.setProperty("--x", "40px")로 실행 중에 값을 바꿀 수도 있어요. Sass 변수는 빌드 때 사라지지만 CSS 변수는 브라우저에 남아 있어요.', 'Custom properties beginning with --, such as --brand, store values that var() reads; they inherit, can be overridden in scope and change at run time.', 'A color set as :root { --brand: #36f } and used as .btn { background: var(--brand) } updates every button from one place. Custom properties inherit like any property, so redefining .danger { --brand: #e33 } turns only the buttons inside it red. Swapping variable values per theme makes switches such as dark mode easy. var(--accent, #36f) supplies a fallback, and el.style.setProperty("--x", "40px") in JavaScript updates values at run time. Sass variables vanish at build time, but CSS variables live in the browser.', sVars()),
    item('css-typography', '글꼴과 타이포그래피', 'Fonts and typography', '웹 글꼴 로딩, 대체 글꼴, 글자 크기, 줄 간격, 줄 길이가 함께 읽기 경험을 만들어요.', '@font-face로 Pretendard 같은 웹 글꼴을 등록하고 font-display: swap을 주면, 글꼴을 받는 동안 대체 글꼴로 먼저 보여줘서 글자가 안 보이는 시간이 없어요. font-family는 쉼표로 대체 글꼴을 이어 적고, line-height는 단위 없이 1.6처럼 적어 글자 크기에 비례하게 해요. clamp(1.75rem, 4vw, 3rem)은 화면 폭에 따라 제목이 커지되 범위 안에 머물러요. 본문은 max-width: 65ch 정도로 줄 길이를 제한하고, text-wrap: balance는 제목 줄 길이를 고르게, pretty는 마지막 줄에 단어 하나만 남는 것을 막아요. 한글 글꼴은 용량이 커서 서브셋과 woff2를 써요.', 'Web font loading, fallbacks, size, line height and line length together shape the reading experience.', '@font-face registers a web font such as Pretendard, and font-display: swap shows a fallback font while it downloads so text is never invisible. font-family lists fallbacks separated by commas, and a unitless line-height such as 1.6 scales with the font size. clamp(1.75rem, 4vw, 3rem) grows headings with the viewport within bounds. Cap body text at about max-width: 65ch; text-wrap: balance evens heading lines and pretty avoids a lone word on the last line. Korean fonts are large, so use subsets and woff2.', sTypography()),
    item('css-transition', 'transition', 'transition', 'transition은 속성 값이 바뀔 때 그 사이를 정한 시간 동안 부드럽게 채워요. 시작과 끝, 두 상태 사이의 보간이에요.', ':hover로 배경이 바뀌면 기본적으로는 순간 이동하지만, transition: background 200ms ease를 주면 200ms 동안 중간 색들이 채워져요. 이징은 시간에 따른 속도 변화로, ease-out은 빠르게 시작해 천천히 멈춰 화면에 들어오는 움직임에, ease-in은 나가는 움직임에 잘 맞아요. transform과 opacity는 합성 단계만 다시 해서 부드럽고, width·height·top은 매 프레임 레이아웃을 다시 해서 버벅일 수 있어요. height: auto는 전환되지 않아서 grid-template-rows: 0fr → 1fr 같은 우회법을 써요. UI 전환은 150~300ms가 적당해요.', 'transition fills in the values between two states over a set duration whenever a property changes.', 'A background changed on :hover normally jumps instantly, but transition: background 200ms ease fills in the intermediate colors over 200ms. Easing shapes speed over time: ease-out starts fast and settles slowly, suiting entrances, while ease-in suits exits. transform and opacity only re-composite and stay smooth, whereas width, height and top redo layout every frame and can stutter. height: auto cannot transition, so workarounds such as grid-template-rows from 0fr to 1fr are used. 150–300ms suits most UI transitions.', sTransition()),
    item('css-animation', '@keyframes 애니메이션', '@keyframes animation', '@keyframes로 시간 지점마다 상태를 적고 animation으로 재생해요. 상태 변화 없이도, 여러 단계로, 반복해서 움직일 수 있어요.', '@keyframes pop에 0%(작고 투명), 60%(살짝 크게), 100%(제자리)를 적고 .toast { animation: pop 300ms ease-out both }로 재생하면 알림이 톡 튀어나와요. animation 한 줄에 이름, 시간, 이징, 반복 횟수, 채우기 모드를 적고, both는 시작 전과 끝난 뒤의 상태를 유지해요. infinite는 로딩 스피너처럼 끝없이 반복해요. transition이 A→B 두 상태라면 animation은 여러 단계와 반복이 가능해요. 사용자가 “동작 줄이기”를 켰다면 prefers-reduced-motion으로 큰 움직임을 끄고 페이드 정도만 남겨요.', '@keyframes lists states at points in time and animation plays them, so elements can move without a state change, in many steps and on repeat.', '@keyframes pop with 0% (small and transparent), 60% (slightly enlarged) and 100% (settled), played with .toast { animation: pop 300ms ease-out both }, makes a notification pop in. The animation shorthand sets name, duration, easing, iteration count and fill mode, and both keeps the first and last states. infinite repeats forever, as for loading spinners. Where a transition goes from A to B, an animation can have many steps and loops. When users enable reduced motion, prefers-reduced-motion turns off large motion and keeps only subtle fades.', sAnimation()),
    item('css-transform', 'transform', 'transform', 'transform은 레이아웃에 영향을 주지 않고 요소를 옮기고, 돌리고, 키워요. GPU로 합성되어 애니메이션에 가장 적합해요.', 'translate(40px, 0)으로 옮겨도 이웃 요소는 그 자리에 그대로 있어요. rotate(15deg) scale(1.2)처럼 함수를 공백으로 이어 한 번에 적용하고, transform-origin으로 회전·확대의 기준점을 정해요(기본값은 가운데). 함수는 오른쪽부터 적용되기 때문에 translate() rotate()와 rotate() translate()의 결과 위치가 서로 달라요. 요즘은 translate, rotate, scale을 개별 속성으로도 쓸 수 있어 따로 애니메이션하기 편해요. transform이 있는 요소는 쌓임 맥락이 되고 fixed 자식의 기준도 돼요.', 'transform moves, rotates and scales elements without affecting layout, and is composited on the GPU, making it ideal for animation.', 'Moving an element with translate(40px, 0) leaves its neighbors exactly where they were. Functions chain with spaces, as in rotate(15deg) scale(1.2), and transform-origin sets the pivot for rotation and scaling (the center by default). Functions apply from right to left, so translate() rotate() and rotate() translate() end up in different places. translate, rotate and scale now also exist as individual properties, which are easier to animate separately. A transformed element becomes a stacking context and the reference for fixed children.', sTransform()),
    item('css-darkmode', '다크 모드', 'Dark mode', '색을 변수로 두고, 시스템 설정(prefers-color-scheme)이나 사용자 선택에 따라 변수 값만 바꿔 테마를 전환해요.', ':root { color-scheme: light dark }를 선언하면 스크롤바와 입력창 같은 브라우저 기본 UI도 테마를 따라가요. --bg, --text 같은 변수를 두고 @media (prefers-color-scheme: dark)에서 값만 바꾸면 페이지 전체가 OS 설정을 따라 어두워져요. light-dark(#111, #eee) 함수로 한 줄에 두 값을 적을 수도 있어요. 사용자가 직접 고르는 토글은 html에 data-theme 속성을 달아 덮어쓰고 선택을 localStorage에 저장하며, 페이지가 그려지기 전에 스크립트로 적용해 깜빡임을 막아요. 순수한 검정 대신 짙은 회색이 눈에 편해요.', 'Keep colors in variables and swap their values by system setting (prefers-color-scheme) or user choice to switch themes.', 'Declaring :root { color-scheme: light dark } makes browser UI such as scrollbars and inputs follow the theme. With variables such as --bg and --text, changing only their values under @media (prefers-color-scheme: dark) darkens the page with the OS setting. light-dark(#111, #eee) writes both values in one line. A user-facing toggle overrides with a data-theme attribute on html, stores the choice in localStorage and applies it with a script before first paint to avoid a flash. Dark gray is easier on the eyes than pure black.', sDarkMode()),
  ]),
  sec('css-arch', '아키텍처와 성능', 'Architecture & perf', '아키텍처, 성능, 접근성', 'Architecture, performance and accessibility', '브라우저가 화면을 그리는 과정, CSS를 충돌 없이 조직하는 방법, 그리고 모두가 쓸 수 있는 스타일이에요.', 'How browsers draw a frame, organizing CSS without collisions, and styles that work for everyone.', [
    item('css-render', '렌더링 파이프라인', 'The rendering pipeline', '브라우저는 스타일 계산 → 레이아웃 → 페인트 → 합성 순서로 화면을 그려요. 어떤 속성을 바꾸느냐에 따라 다시 하는 단계가 달라져요.', 'width, margin, top처럼 크기·위치가 바뀌면 레이아웃부터 모든 단계를 다시 해서 가장 비싸요. color, background처럼 모양만 바뀌면 레이아웃을 건너뛰고 페인트부터 다시 해요. transform과 opacity는 합성 단계만 다시 해서 GPU가 빠르게 처리하므로 애니메이션은 이 둘로 만들어요. JS에서 스타일을 쓰고 곧바로 offsetHeight 같은 크기를 읽으면 브라우저가 강제로 레이아웃을 계산하고, 반복문 안에서 쓰기·읽기를 섞으면 레이아웃 스래싱이 생겨요. 60fps를 지키려면 한 프레임을 16.7ms 안에 그려야 해요.', 'Browsers draw a frame by computing styles, then layout, paint and composite; which property changes decides which stages rerun.', 'Changing size or position, such as width, margin or top, reruns everything from layout and is the most expensive. Appearance-only changes such as color or background skip layout and repaint. transform and opacity only re-composite on the GPU, which is why animations should use them. Writing a style in JavaScript and immediately reading a size such as offsetHeight forces a synchronous layout, and mixing writes and reads in a loop causes layout thrashing. Keeping 60fps means drawing each frame within 16.7ms.', sRender()),
    item('css-scope', '이름 규칙과 스코프', 'Naming and scoping', 'CSS는 기본적으로 전역이라 이름이 겹치면 서로를 덮어써요. BEM 같은 이름 규칙, CSS Modules 같은 빌드 도구, 표준 @scope로 범위를 관리해요.', 'card.css와 modal.css가 둘 다 .title을 쓰면 나중에 불러온 쪽이 다른 컴포넌트의 제목까지 바꿔요. BEM은 .card__title(블록__요소), .card--featured(블록--변형)처럼 규칙으로 이름을 겹치지 않게 하고, 클래스 하나라 명시도도 평평해요. CSS Modules는 빌드 도구가 .title을 .Card_title__x7f2a처럼 파일마다 고유한 이름으로 바꿔 줘요. 표준 @scope (.card) to (.content)는 .card 안에서, .content를 만나기 전까지만 규칙을 적용해요. Tailwind 같은 유틸리티 클래스는 이름 짓기 자체를 줄이는 또 다른 접근이에요.', 'CSS is global by default, so clashing names overwrite each other; naming rules such as BEM, build tools such as CSS Modules and the standard @scope manage boundaries.', 'If card.css and modal.css both use .title, whichever loads later restyles the other component’s title too. BEM avoids clashes by convention, with names such as .card__title (block__element) and .card--featured (block--modifier), and keeps specificity flat with single classes. CSS Modules have the build tool rename .title to something unique per file, such as .Card_title__x7f2a. The standard @scope (.card) to (.content) applies rules inside .card but stops where .content begins. Utility classes such as Tailwind take another route by avoiding most naming altogether.', sScope()),
    item('css-nesting', 'CSS 중첩', 'CSS nesting', '관련 규칙을 부모 규칙 안에 중첩해 쓰는 표준 문법이에요. &는 바깥 선택자를 가리키고, 이제 전처리기 없이 브라우저가 직접 지원해요.', '.card 안에 & .title { … }을 쓰면 .card .title, &:hover는 .card:hover, &.is-active는 .card.is-active로 펼쳐져요. @media (width > 600px) { padding: 24px }처럼 미디어 쿼리도 규칙 안에 넣어 관련 스타일을 한곳에 모아요. .theme-dark &처럼 &를 뒤에 두면 “조상이 .theme-dark일 때”라는 뜻이 돼요. 중첩 선택자는 :is()처럼 계산되어 명시도가 예상보다 높아질 수 있고, 깊게 중첩할수록 덮어쓰기 어려워지니 3단 이내로 유지해요. Sass의 &__title 같은 이름 이어 붙이기는 지원하지 않아요.', 'Standard syntax for nesting related rules inside their parent; & refers to the outer selector, and browsers now support it without a preprocessor.', 'Inside .card, & .title { … } expands to .card .title, &:hover to .card:hover and &.is-active to .card.is-active. Media queries such as @media (width > 600px) { padding: 24px } can sit inside the rule, keeping related styles together. Placing & at the end, as in .theme-dark &, means “when an ancestor is .theme-dark”. Nested selectors are computed like :is(), so specificity can run higher than expected, and deep nesting makes overrides hard, so stay within three levels. Sass-style name concatenation such as &__title is not supported.', sNesting()),
    item('css-a11y', '접근성을 지키는 CSS', 'Accessible CSS', '초점 표시를 지우지 않고, 동작 줄이기 설정을 존중하며, 화면에 숨긴 텍스트와 충분한 크기·대비로 모두가 쓸 수 있게 해요.', ':focus-visible은 키보드로 이동할 때만 초점 테두리를 보여주므로, 디자인 때문에 outline: none으로 지우지 말고 이 선택자로 보기 좋게 다듬어요. 초점이 안 보이면 키보드 사용자는 지금 어디에 있는지 알 수 없어요. prefers-reduced-motion: reduce일 때는 큰 움직임과 전환을 끄거나 줄여요. .sr-only 패턴은 아이콘 버튼의 “검색” 같은 텍스트를 화면에선 숨기고 스크린 리더엔 읽히게 해요(display: none은 리더에서도 사라져요). 터치 대상은 44px 이상, 글자와 배경의 대비는 4.5:1 이상을 지켜요.', 'Keep focus visible, respect reduced-motion settings, and provide visually hidden labels, adequate size and contrast so everyone can use the page.', ':focus-visible shows the focus ring only for keyboard navigation, so refine it with this selector instead of removing it with outline: none. Without a visible focus, keyboard users cannot tell where they are. Under prefers-reduced-motion: reduce, turn off or tone down large motion and transitions. The .sr-only pattern hides text such as an icon button’s “Search” visually while keeping it for screen readers, unlike display: none. Keep touch targets at least 44px and text contrast at least 4.5:1.', sA11y()),
    item('css-logical', '논리 속성', 'Logical properties', '위·아래·왼쪽·오른쪽 대신 글의 흐름(inline·block, start·end)을 기준으로 쓰는 속성이에요. 오른쪽에서 왼쪽으로 쓰는 언어와 세로쓰기에서도 그대로 맞아요.', '.icon { margin-right: 8px }은 언제나 오른쪽이라, 아랍어처럼 dir="rtl"인 화면에서는 아이콘과 글자 사이가 아니라 바깥쪽에 간격이 생겨요. margin-inline-end는 “글이 끝나는 쪽”이라 방향에 따라 자동으로 뒤집혀요. inline은 글이 흐르는 방향, block은 줄이 쌓이는 방향이라 width는 inline-size, height는 block-size, padding-top·bottom은 padding-block이에요. writing-mode: vertical-rl로 세로쓰기를 해도 두 축이 함께 돌아가서 논리 속성은 그대로 맞아요. 다국어 서비스라면 처음부터 논리 속성으로 쓰는 게 좋아요.', 'Properties based on the flow of text (inline and block, start and end) instead of top, bottom, left and right, so they stay correct in right-to-left and vertical writing.', '.icon { margin-right: 8px } is always on the right, so under dir="rtl", as in Arabic, the gap lands outside instead of between the icon and the text. margin-inline-end means the side where text ends and flips automatically with direction. inline is the direction text flows and block the direction lines stack, so width becomes inline-size, height block-size and top and bottom padding padding-block. Even with writing-mode: vertical-rl, both axes rotate together and logical properties still fit. Multilingual products benefit from using them from the start.', sLogical()),
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
})();
