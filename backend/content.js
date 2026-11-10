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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'bex-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono bex-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono bex-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c bex-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono bex-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c bex-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'bex-s bex-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono bex-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono bex-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono bex-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono bex-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono bex-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'bex-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'bex-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'bex-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono bex-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'bex-a', g: 'bex-g', r: 'bex-r', w: 'bex-w', m: 'cz-mono', s: 'bex-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'bex-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono bex-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono bex-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'bex-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.bex-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.bex-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.bex-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.bex-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.bex-r .in{color:var(--danger);font-weight:800}
.bex-g .in{color:var(--ok);font-weight:800}
.bex-a .in{color:var(--accent);font-weight:800}
.bex-w .in{color:var(--warn);font-weight:800}
.bex-c .in{font-size:.6em;font-weight:700}
.bex-c2 .in{font-size:.5em;font-weight:700}
.bex-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.bex-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.bex-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Backend · 1. server structure ===== */
const CSSY = '.bex-ic .in{color:inherit!important}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc bex-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };
/* a horizontal bar row on a 0..10 scale: label + segments [[a, b, color]] */
const brow = (S, k, X, y, label, segs, st, o = {}) => { lbl(S, k + 'l', X, y + .05, label, 'm', st, { off: o.off }); segs.forEach(([a, b, c], i) => sw(S, k + i, X + 3.0 + a * .9, y + .1, (b - a) * .9, .55, c, st, { off: o.off, css: 'z-index:3' })); };

function sLayered() {
  return CW('be-layered', {
    code: [['// Controller: HTTP만 (입력 → 호출 → 응답)', '// Controller: HTTP only (in → call → out)'], "@Post('/orders') create(req) {", '  return this.orders.place(req.body);', '}', ['// Service: 업무 규칙 · 트랜잭션', '// Service: business rules, transactions'], 'place(dto) { if (stock < dto.qty) throw …; }', ['// Repository: 저장소 접근만', '// Repository: data access only'], 'save(order) { return db.insert(order); }'],
    hl: [[0, 4], [4, 2, 'ok'], [6, 2, 'warn'], [0, 8]],
    draw: (S) => {
      const X = 19.4, L = [['Controller', 'accent', ['HTTP · 인증 · 입력 형식', 'HTTP, auth, input shape']], ['Service', 'ok', ['업무 규칙 · 트랜잭션', 'business rules, transactions']], ['Repository', 'warn', ['SQL · 저장소', 'SQL, storage']]];
      L.forEach(([t, c, d], i) => { nd(S, 'L' + i, X, .8 + i * 2.0, 5.0, t, c, i + 1, { h: 1.2 }); lbl(S, 'd' + i, X + 5.4, 1.0 + i * 2.0, d, 'm', i + 1); if (i) arw(S, 'a' + i, [X + 2.5, .8 + i * 2.0 - .75], [X + 2.5, .8 + i * 2.0 - .05], i + 1); });
      lbl(S, 'n1', X, 7.4, ['HTTP의 세부는 컨트롤러에서 끝내요', 'HTTP details stop at the controller'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 7.4, ['서비스는 HTTP도 SQL도 몰라요', 'services know neither HTTP nor SQL'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 7.4, ['저장 방식이 바뀌어도 위는 그대로', 'swap storage without touching the layers above'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'fk', X + 5.4, 6.1, 6.0, 'FakeRepository', 'line', 4, { h: 1.0 }); arw(S, 'fa', [X + 5.35, 6.6], [X + 2.5, 6.05], 4, { dash: 1 });
      lbl(S, 'n4', X, 7.4, ['의존은 위에서 아래로만 · 가짜로 바꿔 테스트', 'dependencies point down; swap in fakes for tests'], 'a', 4, { w: 12 });
    },
    notes: [['컨트롤러는 HTTP 요청을 받아 입력을 꺼내고, 서비스를 부르고, 결과를 응답으로 바꾸는 일만 해요', 'controllers only receive HTTP requests, extract input, call services and turn results into responses'], ['서비스는 “재고보다 많이 주문할 수 없다” 같은 업무 규칙과 트랜잭션을 맡아요 · HTTP나 SQL을 몰라요', 'services own business rules such as “cannot order more than stock” and transactions, knowing neither HTTP nor SQL'], ['저장소(Repository)는 DB 접근만 해요 · 저장 방식이 바뀌어도 위 계층은 그대로예요', 'repositories only access the database, so storage changes leave the upper layers untouched'], ['의존은 위에서 아래로만 흐르고, 테스트에서는 저장소를 가짜로 바꿔 서비스 규칙만 빠르게 검증해요', 'dependencies flow only downward, and tests swap the repository for a fake to verify service rules quickly']],
    fin: [['계층형 구조: 표현(컨트롤러) · 업무(서비스) · 데이터(저장소)로 관심사를 나누는 가장 흔한 백엔드 구조', 'layered architecture separates presentation (controllers), business (services) and data (repositories), the most common backend structure', 'bex-xs bex-a'], ['서비스가 비대해지면 도메인 객체로 규칙을 옮겨요', 'when services bloat, move rules into domain objects'], ['컨트롤러에 업무 규칙이 새지 않게 해요', 'keep business rules from leaking into controllers']],
    caps: [['컨트롤러', 'Controllers'], ['서비스', 'Services'], ['저장소', 'Repositories'], ['의존 방향', 'Dependency direction'], ['계층형 구조', 'Layered architecture']]
  });
}

function sHexagonal() {
  return CW('be-hexagonal', {
    code: [['interface PaymentPort {          // 포트', 'interface PaymentPort {          // port'], '  charge(amount: Money): Promise<Receipt>;', '}', 'class PgAdapter implements PaymentPort {…}', 'class FakePayment implements PaymentPort {…}', ['// 도메인은 포트만 알아요 (의존성 역전)', '// the domain knows only ports (DIP)'], 'new CheckoutService(new PgAdapter())'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 1, 'warn'], [5, 2]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'dm', X + 3.6, 2.6, 4.8, ['도메인', 'Domain'], 'accent', 0, { h: 2.4 });
      [['p0', X + 2.6, 2.9, 'HTTP'], ['p1', X + 8.6, 2.9, 'Pay'], ['p2', X + 2.6, 4.1, 'Repo'], ['p3', X + 8.6, 4.1, 'Mail']].forEach(([k, x, y, t]) => chip(S, k, x, y, .9, '●', 'ok', 1, { h: .8, css: 'z-index:3;border-radius:50%' }));
      lbl(S, 'n1', X, 7.4, ['포트: 도메인이 정한 입출구 인터페이스', 'ports: interfaces defined by the domain'], 'a', 1, { off: 2, w: 12 });
      [['a0', X, .8, ['REST 컨트롤러', 'REST controller']], ['a1', X + 8.0, .8, ['PG 어댑터', 'PG adapter']], ['a2', X, 6.0, ['Postgres 저장소', 'Postgres repo']], ['a3', X + 8.0, 6.0, ['SMTP 어댑터', 'SMTP adapter']]].forEach(([k, x, y, t]) => nd(S, k, x, y, 4.0, t, 'line', 2, { h: 1.0 }));
      [[X + 2.0, 1.85, X + 3.0, 2.85], [X + 10.0, 1.85, X + 9.0, 2.85], [X + 2.0, 5.95, X + 3.0, 4.95], [X + 10.0, 5.95, X + 9.0, 4.95]].forEach(([a, b, c, d], i) => arw(S, 'ar' + i, [a, b], [c, d], 2));
      lbl(S, 'n2', X, 7.4, ['어댑터가 바깥 기술을 포트에 맞춰요 · 의존은 안쪽으로', 'adapters fit outside tech to ports; deps point inward'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'fk', X + 8.0, .8, 4.0, 'FakePayment', 'warn', 3, { off: 4, h: 1.0 }); lbl(S, 'n3', X, 7.4, ['테스트에선 가짜 어댑터로 바꿔 끼워요', 'tests plug in fake adapters'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.4, ['PG사를 바꿔도 도메인 코드는 그대로', 'changing payment providers leaves the domain intact'], 'a', 4, { w: 12 });
    },
    notes: [['도메인 코드가 필요한 바깥 기능(결제, 저장, 메일)을 PaymentPort 같은 인터페이스, 즉 포트로 직접 정의해요', 'the domain defines the outside capabilities it needs, such as payment, storage and mail, as interfaces called ports'], ['PgAdapter 같은 어댑터가 실제 기술을 포트에 맞춰 구현해요 · 의존 방향이 기술 → 도메인으로 뒤집혀요(의존성 역전)', 'adapters such as PgAdapter implement ports with real technology, inverting dependencies so tech points at the domain'], ['테스트에서는 FakePayment 같은 가짜 어댑터를 끼워 외부 시스템 없이 도메인 규칙을 검증해요', 'tests plug in fake adapters such as FakePayment to verify domain rules without external systems'], ['결제사나 DB를 바꿔도 어댑터만 새로 쓰면 되고 도메인 코드는 손대지 않아요', 'switching payment providers or databases means writing a new adapter while domain code stays untouched']],
    fin: [['헥사고날(포트와 어댑터) 아키텍처: 도메인을 가운데 두고 기술을 바깥 어댑터로 밀어내는 구조 · 클린 아키텍처와 같은 생각', 'hexagonal (ports and adapters) architecture keeps the domain at the center and pushes technology out to adapters, the same idea as clean architecture', 'bex-xs bex-a'], ['작은 CRUD 서비스에는 과할 수 있어요', 'it can be overkill for small CRUD services'], ['규칙이 복잡하고 오래 살 시스템에 효과가 커요', 'it pays off for complex, long-lived systems']],
    caps: [['포트', 'Ports'], ['어댑터', 'Adapters'], ['가짜 어댑터', 'Fake adapters'], ['교체 가능성', 'Swappability'], ['헥사고날 아키텍처', 'Hexagonal architecture']]
  });
}

function sModularMonolith() {
  return CW('be-modular-monolith', {
    code: ['src/modules/', '  orders/   api.ts · domain/ · infra/', '  billing/  api.ts · …', '  catalog/  api.ts · …', ['// 모듈끼리는 api.ts로만 호출', '// modules call each other only via api.ts'], "import { reserve } from '../catalog/api';", ['// 스키마도 모듈별로 · 직접 조인 금지', '// schemas per module; no cross joins']],
    hl: [[0, 4], [4, 2, 'ok'], [6, 1, 'warn'], [0, 4]],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'app', X, .6, 12.0, 5.2, ['배포 단위 1개', 'one deployable'], 'ink-3', 1, {});
      [['orders', 'accent'], ['billing', 'ok'], ['catalog', 'warn']].forEach(([t, c], i) => nd(S, 'm' + i, X + .4 + i * 3.9, 1.6, 3.5, t, c, 1, { h: 2.0 }));
      lbl(S, 'n1', X, 7.4, ['하나로 배포하지만 안은 모듈로 나뉘어요', 'one deploy, but modular inside'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => chip(S, 'ap' + i, X + .4 + i * 3.9 + .7, 3.7, 2.1, 'api', 'ink', 2, { h: .9 })); arw(S, 'c0', [X + 2.95, 4.05], [X + 9.15, 4.05], 2);
      lbl(S, 'n2', X, 7.4, ['다른 모듈은 공개 api로만 불러요', 'other modules are called through public APIs'], 'g', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => sw(S, 'db' + i, X + .4 + i * 3.9, 6.2, 3.5, .8, tint(['accent', 'ok', 'warn'][i], 30), 3)); lbl(S, 'n3', X, 7.4, ['데이터도 모듈별 스키마로 분리', 'data split into per-module schemas'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'ex', [X + 9.0, 1.5], [X + 11.6, .15], 4, { color: 'ok', dash: 1 }); lbl(S, 'n4', X, 7.4, ['필요해지면 한 모듈만 서비스로 떼어내요', 'extract one module into a service when needed'], 'a', 4, { w: 12 });
    },
    notes: [['모듈러 모놀리스는 하나로 배포하지만 안쪽은 orders, billing, catalog처럼 기능 모듈로 엄격히 나눈 구조예요', 'a modular monolith deploys as one unit but is strictly divided inside into feature modules such as orders, billing and catalog'], ['모듈끼리는 api.ts 같은 공개 인터페이스로만 호출해요 · 내부 클래스나 테이블에 직접 손대지 않아요', 'modules call each other only through public interfaces such as api.ts, never touching internal classes or tables'], ['DB도 모듈별 스키마로 나누고 모듈 사이 직접 조인을 금지하면 데이터 경계까지 지켜져요', 'per-module schemas with no cross-module joins keep data boundaries intact too'], ['경계가 분명하니 트래픽이나 팀이 커질 때 그 모듈만 마이크로서비스로 떼어내기 쉬워요', 'with clear boundaries, a single module can be extracted into a microservice when traffic or teams grow']],
    fin: [['모듈러 모놀리스: 모놀리스의 단순한 배포와 마이크로서비스의 경계를 함께 얻는 출발점', 'a modular monolith combines a monolith’s simple deployment with microservice-like boundaries, a strong starting point', 'bex-xs bex-a'], ['경계는 ArchUnit, eslint-plugin-boundaries 같은 도구로 강제해요', 'enforce boundaries with tools such as ArchUnit or eslint-plugin-boundaries'], ['네트워크 호출이 없어 디버깅과 트랜잭션이 쉬워요', 'no network hops makes debugging and transactions easy']],
    caps: [['하나의 배포', 'One deployable'], ['공개 API', 'Public APIs'], ['데이터 경계', 'Data boundaries'], ['떼어내기', 'Extracting modules'], ['모듈러 모놀리스', 'Modular monoliths']]
  });
}

function sConcurrency() {
  return CW('be-concurrency-models', {
    code: [['// ① 요청당 OS 스레드 (스레드 풀)', '// ① an OS thread per request (pool)'], ['// ② 이벤트 루프 (Node.js)', '// ② an event loop (Node.js)'], 'const rows = await db.query(sql);', ['// ③ 가벼운 스레드: 고루틴 · 가상 스레드', '// ③ light threads: goroutines, virtual'], 'go handle(conn)                  // Go', 'Thread.ofVirtual().start(task);  // Java 21', ['// 핵심: 기다리는 동안 다른 일 하기', '// key: do other work while waiting']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 3, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, W = 'var(--warn)', G = tint('line', 40);
      [0, 1, 2].forEach(i => brow(S, 't' + i, X, .8 + i * .9, 'T' + (i + 1), [[0, 1, W], [1, 8, G], [8, 9, W]], 1, { off: 2 }));
      lbl(S, 'n1', X, 6.6, ['대부분 DB를 기다리며 스레드가 놀아요 · 스레드마다 메모리', 'threads mostly idle waiting on the DB, each costing memory'], 'r', 1, { off: 2, w: 12 });
      brow(S, 'el', X, .8, 'loop', [[0, 1, W], [1, 2, 'var(--accent)'], [2, 3, 'var(--ok)'], [3, 4, W], [4, 5, 'var(--accent)'], [5, 6, 'var(--ok)']], 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['스레드 하나가 요청들을 번갈아 · I/O는 맡겨 두기', 'one thread interleaves requests; I/O runs elsewhere'], 'g', 2, { off: 3, w: 12 });
      for (let i = 0; i < 12; i++) chip(S, 'v' + i, X + (i % 6) * 2.0, .8 + Math.floor(i / 6) * 1.0, 1.8, 'v' + (i + 1), 'warn', 3, { off: 4, h: .8 }); [0, 1].forEach(i => nd(S, 'cr' + i, X + i * 6.2, 3.0, 5.8, ['캐리어 스레드 ', 'carrier thread '].map(s => s + (i + 1)), 'accent', 3, { off: 4, h: .9 }));
      lbl(S, 'n3', X, 6.6, ['수십만 개의 가벼운 스레드를 소수 OS 스레드에', 'hundreds of thousands of light threads on a few OS threads'], 'w', 3, { off: 4, w: 12 });
      brow(S, 'cpu', X, .8, 'loop', [[0, 7, 'var(--danger)']], 4); lbl(S, 'cpl', X + 3.0, 1.6, ['무거운 계산 → 모든 요청 정지', 'heavy compute stalls every request'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['CPU 작업은 워커 스레드 · 별도 서비스로', 'move CPU work to workers or separate services'], 'a', 4, { w: 12 });
    },
    notes: [['전통적인 요청당 스레드 모델은 이해하기 쉽지만 스레드가 대부분 DB 응답을 기다리며 놀고, 스레드마다 메모리를 써서 동시 접속 수에 한계가 있어요', 'thread-per-request is easy to reason about, but threads mostly sit waiting on the database and each costs memory, capping concurrency'], ['Node.js의 이벤트 루프는 스레드 하나가 여러 요청을 번갈아 처리하고, I/O는 운영체제에 맡겨 기다리는 동안 다른 요청을 처리해요', 'Node.js’s event loop interleaves many requests on one thread, handing I/O to the OS and serving others while waiting'], ['Go의 고루틴과 Java 21의 가상 스레드는 아주 가벼운 스레드를 수십만 개 만들어 소수의 OS 스레드에 올려요 · 동기 코드처럼 쓰면서 이벤트 루프의 효율을 얻어요', 'Go goroutines and Java 21 virtual threads run hundreds of thousands of light threads on a few OS threads, keeping synchronous-style code with event-loop efficiency'], ['이벤트 루프에서 무거운 계산을 하면 모든 요청이 멈춰요 · CPU 작업은 워커 스레드나 별도 서비스로 옮겨요', 'heavy computation on an event loop stalls every request, so CPU work moves to worker threads or separate services']],
    fin: [['동시성 모델: 기다리는 시간에 다른 요청을 처리하는 방법의 차이 · 대부분의 백엔드는 I/O 대기가 병목', 'concurrency models differ in how they serve other requests while waiting, since most backends are bound by I/O waits', 'bex-xs bex-a'], ['처리량은 스레드 수가 아니라 DB·외부 API 같은 병목이 정해요', 'throughput is set by bottlenecks such as the database or external APIs, not thread counts'], ['동시성이 늘수록 커넥션 풀·타임아웃 설계가 중요해져요', 'more concurrency makes pool and timeout design matter more']],
    caps: [['요청당 스레드', 'Thread per request'], ['이벤트 루프', 'Event loops'], ['가벼운 스레드', 'Lightweight threads'], ['CPU 작업 주의', 'Beware CPU work'], ['동시성 모델', 'Concurrency models']]
  });
}

function sConnPool() {
  return CW('be-connection-pool', {
    code: ['const pool = new Pool({ max: 20,', '  idleTimeoutMillis: 30_000,', '  connectionTimeoutMillis: 2_000 });', 'const c = await pool.connect();', 'try { await c.query(sql); }', ['finally { c.release(); }   // 꼭 반납', 'finally { c.release(); }   // always return'], ['// 인스턴스 10대 × 20 = DB 연결 200개', '// 10 instances × 20 = 200 DB connections']],
    hl: [[0, 3], [3, 3, 'ok'], [5, 1, 'danger'], [6, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'pl', X + 3.0, .6, 6.0, 3.2, 'pool (max 20)', 'accent', 0, { tc: 'a' }); for (let i = 0; i < 10; i++) sw(S, 'c' + i, X + 3.4 + (i % 5) * 1.1, 1.4 + Math.floor(i / 5) * 1.1, .8, .8, tint('ok', 50), 0, { r: .4, css: 'z-index:3' });
      nd(S, 'db', X + 10.0, 1.4, 2.0, 'DB', 'line', 0, { h: 1.8 });
      lbl(S, 'n1', X, 6.6, ['연결을 미리 열어 두고 빌려 써요 · 연결 수립 비용 절약', 'open connections ahead and borrow them, skipping setup cost'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => tsets(S, 'c' + i, [[2, 'warn', 60], [4, 'ok', 50]])); nd(S, 'rq', X, 1.4, 2.6, 'req', 'line', 2, { off: 3, h: 1.0 }); arw(S, 'ra', [X + 2.65, 1.9], [X + 3.35, 1.9], 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['쓰고 나면 바로 반납 → 다른 요청이 재사용', 'return it right away so others can reuse it'], 'g', 2, { off: 3, w: 12 });
      for (let i = 0; i < 10; i++) tsets(S, 'c' + i, [[3, 'danger', 60], [4, 'ok', 50]]); [0, 1, 2].forEach(i => chip(S, 'w' + i, X + i * 3.1, 4.2, 2.6, ['대기 ', 'wait '].map(s => s + (i + 1)), 'danger', 3, { off: 4, h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['반납을 잊으면 고갈 → 요청들이 줄 서다 타임아웃', 'leaks exhaust the pool; requests queue and time out'], 'r', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['인스턴스 수 × max ≤ DB 최대 연결 · 필요하면 PgBouncer', 'instances × max must fit DB limits; use PgBouncer if needed'], 'w', 4, { w: 12 }); nd(S, 'pb', X, 4.2, 12.0, ['인스턴스 10 × 20 = 200 > DB 100', '10 instances × 20 = 200 > DB 100'], 'warn', 4, { h: 1.0 });
    },
    notes: [['DB 연결은 TCP·TLS·인증을 거쳐 만들기 비싸요 · 커넥션 풀은 연결을 미리 열어 두고 요청이 빌려 쓰게 해요', 'database connections are expensive to create (TCP, TLS, auth), so a pool keeps them open for requests to borrow'], ['쿼리가 끝나면 finally에서 바로 반납해야 다른 요청이 그 연결을 재사용해요', 'returning the connection in finally right after the query lets other requests reuse it'], ['반납을 빠뜨리면 연결이 새어 풀이 고갈되고, 새 요청은 줄을 서다 connectionTimeout으로 실패해요', 'forgetting to return leaks connections until the pool is exhausted and new requests queue and fail on connectionTimeout'], ['서버를 늘리면 연결 수도 곱해져요 · 인스턴스 수 × max가 DB 최대 연결을 넘지 않게 하고, 넘으면 PgBouncer 같은 프록시로 모아요', 'scaling out multiplies connections, so instances × max must stay under the DB limit, or a proxy such as PgBouncer pools them']],
    fin: [['커넥션 풀: 비싼 DB 연결을 재사용하는 장치 · 크기는 클수록 좋은 게 아니라 DB가 감당할 만큼', 'a connection pool reuses expensive database connections, sized to what the database can handle, not as large as possible', 'bex-xs bex-a'], ['풀 대기 시간·사용률을 지표로 꼭 봐요', 'monitor pool wait time and utilization'], ['서버리스는 연결 폭증에 특히 취약해요', 'serverless is especially prone to connection storms']],
    caps: [['미리 열린 연결', 'Pre-opened connections'], ['빌리고 반납', 'Borrow and return'], ['고갈', 'Exhaustion'], ['전체 연결 수', 'Total connections'], ['커넥션 풀', 'Connection pools']]
  });
}

function sTimeouts() {
  return CW('be-timeouts', {
    code: ['const signal = AbortSignal.timeout(800);', 'await fetch(url, { signal });', ['// 전체 예산 2초 → 하위 호출엔 남은 시간만', '// 2 s budget → pass only what is left'], 'const left = deadline - Date.now();', 'await callInventory({ timeout: left - 50 });', ['// 타임아웃 없는 호출 = 무한 대기 가능', '// no timeout = possibly waiting forever']],
    hl: [[5, 1, 'danger'], [0, 2, 'ok'], [2, 3, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      brow(S, 'h', X, .8, ['느린 의존성', 'slow dep'], [[0, 10, 'var(--danger)']], 1, { off: 2 }); [0, 1, 2, 3].forEach(i => sw(S, 'th' + i, X + 3.0 + i * 2.2, 1.8, 1.9, .5, tint('danger', 40), 1, { off: 2 }));
      lbl(S, 'n1', X, 6.6, ['스레드·연결이 묶여 쌓이다 서버 전체가 멈춰요', 'threads and connections pile up until everything stalls'], 'r', 1, { off: 2, w: 12 });
      brow(S, 't8', X, .8, 'fetch', [[0, 4, 'var(--ok)'], [4, 4.3, 'var(--danger)']], 2, { off: 3 }); lbl(S, 't8l', X + 3.0, 1.6, ['800ms에서 포기 → 오류 처리', 'gives up at 800ms → handle the error'], 'm g', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['모든 외부 호출에 시간 제한을 걸어요', 'put a time limit on every outbound call'], 'g', 2, { off: 3, w: 12 });
      brow(S, 'b0', X, .8, ['전체 2s', 'budget 2s'], [[0, 10, tint('accent', 40)]], 3); brow(S, 'b1', X, 1.8, 'auth', [[0, 1, 'var(--ok)']], 3); brow(S, 'b2', X, 2.8, 'db', [[1, 3, 'var(--ok)']], 3); brow(S, 'b3', X, 3.8, 'inventory', [[3, 9.6, 'var(--warn)']], 3);
      lbl(S, 'n3', X, 6.6, ['남은 시간(데드라인)을 하위 호출에 전달', 'pass the remaining deadline down the chain'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['클라이언트가 떠났으면 하위 작업도 취소', 'cancel downstream work once the client has gone'], 'a', 4, { w: 12 });
    },
    notes: [['타임아웃이 없으면 느린 의존성 하나 때문에 스레드와 연결이 계속 묶여 쌓이고, 결국 서버 전체가 응답하지 못해요', 'without timeouts, one slow dependency ties up threads and connections until the whole server stops responding'], ['모든 외부 호출에 AbortSignal.timeout 같은 시간 제한을 걸어, 넘으면 포기하고 오류로 처리해요', 'every outbound call gets a limit such as AbortSignal.timeout, giving up and handling an error when exceeded'], ['요청 전체에 2초 같은 예산(데드라인)을 정하고, 하위 호출에는 남은 시간만 넘겨요 · gRPC는 데드라인을 자동으로 전파해요', 'set a budget (deadline) such as 2 seconds per request and pass only the remaining time downstream, which gRPC propagates automatically'], ['클라이언트가 이미 연결을 끊었다면 하위 작업도 취소해 자원을 아껴요', 'if the client has already disconnected, cancel downstream work to save resources']],
    fin: [['타임아웃과 데드라인: 기다림에 상한을 두고 남은 시간을 전파해 장애가 번지는 걸 막아요', 'timeouts and deadlines cap waiting and propagate remaining time to stop failures from spreading', 'bex-xs bex-a'], ['타임아웃은 p99 지연보다 조금 길게 잡아요', 'set timeouts a bit above the p99 latency'], ['재시도까지 합친 시간이 예산을 넘지 않게 해요', 'retries included, stay within the budget']],
    caps: [['무한 대기', 'Waiting forever'], ['시간 제한', 'Time limits'], ['데드라인 전파', 'Deadline propagation'], ['취소', 'Cancellation'], ['타임아웃과 데드라인', 'Timeouts and deadlines']]
  });
}

function sGraceful() {
  return CW('be-graceful-shutdown', {
    code: ["process.on('SIGTERM', async () => {", ['  ready = false;         // 1. 새 요청 그만', '  ready = false;         // 1. stop new work'], ['  await server.close();  // 2. 마무리', '  await server.close();  // 2. drain'], '  await queue.close();', ['  await db.end();        // 3. 정리', '  await db.end();        // 3. clean up'], '  process.exit(0);', '});'],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 3]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'lb', X, .8, 3.4, 'LB', 'line', 0, { h: 1.1 }); nd(S, 'p1', X + 8.0, .8, 4.0, ['파드 A', 'pod A'], 'warn', 0, { h: 1.1 }); nd(S, 'p2', X + 8.0, 2.4, 4.0, ['파드 B', 'pod B'], 'ok', 0, { h: 1.1 });
      arw(S, 'r1', [X + 3.45, 1.35], [X + 7.95, 1.35], 0, { off: 2 }); arw(S, 'r2', [X + 3.45, 1.6], [X + 7.95, 2.9], 0);
      lbl(S, 'sg', X + 8.0, .2, 'SIGTERM', 'm r', 1); lbl(S, 'n1', X, 6.6, ['종료 신호를 받으면 바로 죽지 않아요', 'a stop signal does not mean dying at once'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'rd', X, 3.9, ['readiness ✗ → 라우팅 제외', 'readiness ✗ → removed from routing'], 'm w', 2, { off: 3 }); lbl(S, 'n2', X, 6.6, ['준비 상태를 내려 새 요청이 오지 않게', 'drop readiness so no new requests arrive'], 'w', 2, { off: 3, w: 12 });
      [0, 1].forEach(i => sw(S, 'if' + i, X + 8.3 + i * 1.8, 4.0, 1.5, .5, 'var(--accent)', 3, { off: 4 })); lbl(S, 'ifl', X + 8.0, 4.6, ['처리 중 요청 마무리', 'finishing in-flight'], 'm a', 3, { off: 4 }); lbl(S, 'n3', X, 6.6, ['이미 받은 요청은 끝까지 처리해요', 'requests already accepted run to completion'], 'g', 3, { off: 4, w: 12 });
      brow(S, 'gp', X, 4.2, ['유예 30s', 'grace 30s'], [[0, 6, 'var(--ok)'], [6, 10, tint('danger', 40)]], 4); lbl(S, 'gk', X + 3.0, 5.0, ['넘기면 SIGKILL (강제 종료)', 'beyond it: SIGKILL'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['연결·큐를 닫고 유예 시간 안에 종료', 'close connections and queues within the grace period'], 'a', 4, { w: 12 });
    },
    notes: [['배포나 축소 때 오케스트레이터는 SIGTERM을 보내요 · 바로 끄면 처리 중이던 요청이 끊겨 사용자가 오류를 봐요', 'during deploys or scale-down, the orchestrator sends SIGTERM, and exiting immediately cuts off in-flight requests'], ['먼저 readiness 검사를 실패시켜 로드밸런서가 이 인스턴스로 새 요청을 보내지 않게 해요', 'first fail the readiness check so the load balancer stops sending new requests to this instance'], ['server.close()는 새 연결을 받지 않으면서 이미 받은 요청은 끝까지 처리해요', 'server.close() refuses new connections while finishing requests already accepted'], ['큐 소비자와 DB 연결을 정리하고 종료해요 · 유예 시간(쿠버네티스 기본 30초)을 넘기면 SIGKILL로 강제 종료돼요', 'close queue consumers and database connections, then exit, since exceeding the grace period (30 s by default in Kubernetes) triggers SIGKILL']],
    fin: [['우아한 종료: 새 요청 차단 → 처리 중 요청 완료 → 자원 정리 → 종료 순서로 무중단 배포를 가능하게 해요', 'graceful shutdown blocks new requests, finishes in-flight work, releases resources and exits, enabling zero-downtime deploys', 'bex-xs bex-a'], ['오래 걸리는 작업은 중간 저장(체크포인트)해 다시 시작할 수 있게', 'checkpoint long jobs so they can resume'], ['liveness와 readiness 검사는 목적이 달라요', 'liveness and readiness checks serve different purposes']],
    caps: [['종료 신호', 'The stop signal'], ['새 요청 차단', 'Blocking new requests'], ['처리 중 마무리', 'Finishing in-flight work'], ['유예 시간', 'The grace period'], ['우아한 종료', 'Graceful shutdown']]
  });
}
/* ===== Backend · 2. API design ===== */
function sVersioning() {
  return CW('be-api-versioning', {
    code: [['GET /v1/orders/42         // URL 버전', 'GET /v1/orders/42         // URL version'], 'Accept: application/vnd.acme.v2+json', ['// ✓ 호환: 필드 추가 · 선택 매개변수 추가', '// ✓ compatible: add fields, optional params'], ['// ✗ 깨짐: 필드 삭제 · 이름 · 의미 변경', '// ✗ breaking: remove, rename, change meaning'], 'Deprecation: @1798761600', 'Sunset: Fri, 01 Jan 2027 00:00:00 GMT'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'danger'], [4, 2, 'warn']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'c1', X, .8, 3.6, ['앱 1.0', 'app 1.0'], 'line', 1, { h: 1.0 }); nd(S, 'c2', X, 2.2, 3.6, ['앱 2.0', 'app 2.0'], 'line', 1, { h: 1.0 }); nd(S, 'v1', X + 7.4, .8, 4.6, '/v1', 'accent', 1, { h: 1.0 }); nd(S, 'v2', X + 7.4, 2.2, 4.6, '/v2', 'ok', 1, { h: 1.0 });
      arw(S, 'a1', [X + 3.65, 1.3], [X + 7.35, 1.3], 1); arw(S, 'a2', [X + 3.65, 2.7], [X + 7.35, 2.7], 1);
      lbl(S, 'n1', X, 6.6, ['옛 앱이 아직 쓰이니 두 버전이 함께 살아요', 'old apps live on, so versions coexist'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ad', X, 3.8, 12.0, ['{ id, total, + currency }  ← 필드 추가는 안전', '{ id, total, + currency } ← adding is safe'], 'ok', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.6, ['클라이언트는 모르는 필드를 무시하게 만들어요', 'clients should ignore unknown fields'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'rm', X, 3.8, 12.0, ['total → amount  ← 이름 변경은 깨짐', 'total → amount ← renaming breaks'], 'danger', 3, { off: 4, h: 1.0 }); lbl(S, 'n3', X, 6.6, ['깨는 변경은 새 버전으로만', 'breaking changes only in a new version'], 'r', 3, { off: 4, w: 12 });
      brow(S, 'tl', X, 3.8, '/v1', [[0, 4, 'var(--ok)'], [4, 8, 'var(--warn)'], [8, 10, 'var(--danger)']], 4); lbl(S, 'tl2', X + 3.0, 4.6, ['운영 → 지원 중단 예고 → 종료', 'active → deprecated → sunset'], 'm', 4);
      lbl(S, 'n4', X, 6.6, ['Deprecation·Sunset 헤더로 미리 알리고 사용량을 봐요', 'announce via Deprecation and Sunset; watch usage'], 'w', 4, { w: 12 });
    },
    notes: [['모바일 앱처럼 옛 클라이언트가 계속 남아 있으니 API를 바꿀 땐 여러 버전이 한동안 함께 살아요 · URL이나 헤더로 버전을 구분해요', 'old clients such as mobile apps linger, so several API versions coexist for a while, distinguished by URL or header'], ['필드나 선택 매개변수 추가는 하위 호환이에요 · 클라이언트가 모르는 필드를 무시하도록 만들어 두면 자유롭게 늘릴 수 있어요', 'adding fields or optional parameters is backward compatible, especially when clients ignore unknown fields'], ['필드 삭제, 이름 변경, 의미 변경은 기존 클라이언트를 깨뜨려요 · 이런 변경은 새 버전에서만 해요', 'removing, renaming or changing the meaning of fields breaks existing clients, so do it only in a new version'], ['옛 버전은 Deprecation·Sunset 헤더와 문서로 종료 일정을 알리고, 사용량이 충분히 줄었을 때 내려요', 'announce the end of old versions with Deprecation and Sunset headers and docs, retiring them once usage has dropped']],
    fin: [['API 버전 관리: 호환되는 변경은 그 자리에서, 깨는 변경은 새 버전으로 · 종료는 예고하고 측정하며', 'API versioning makes compatible changes in place and breaking ones in new versions, retiring old ones with notice and measurement', 'bex-xs bex-a'], ['버전을 자주 올리기보다 호환을 지키는 설계가 먼저예요', 'designing for compatibility beats frequent version bumps'], ['계약 테스트로 깨는 변경을 미리 잡아요', 'contract tests catch breaking changes early']],
    caps: [['버전 공존', 'Coexisting versions'], ['호환되는 변경', 'Compatible changes'], ['깨는 변경', 'Breaking changes'], ['종료 예고', 'Deprecation'], ['API 버전 관리', 'API versioning']]
  });
}

function sErrorFormat() {
  return CW('be-error-format', {
    code: ['HTTP/1.1 422 Unprocessable Content', 'Content-Type: application/problem+json', '{ "type": "https://x.dev/errors/stock",', ['  "title": "재고가 부족해요",', '  "title": "Not enough stock",'], '  "status": 422,', ['  "detail": "SKU-7 남은 수량 2개",', '  "detail": "SKU-7 has 2 left",'], '  "instance": "/orders/req-9f2c" }'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 3, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      [['4xx', ['클라이언트가 고칠 것', 'client must fix'], 'warn'], ['5xx', ['서버 문제 · 재시도 가능', 'server issue, retryable'], 'danger']].forEach(([a, b, c], i) => { chip(S, 'k' + i, X, .8 + i * 1.3, 2.2, a, c, 1, { h: 1.0 }); lbl(S, 'kd' + i, X + 2.6, .95 + i * 1.3, b, 'm', 1); });
      lbl(S, 'n1', X, 6.6, ['표준 형식(RFC 9457)으로 모든 오류를 같은 모양으로', 'one shape for every error (RFC 9457)'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ty', X, 3.6, 12.0, ['type으로 분기: if (type.endsWith("/stock"))', 'branch on type: if (type.endsWith("/stock"))'], 'ok', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.6, ['프로그램은 type으로, 문구는 바뀌어도 OK', 'code branches on type; wording may change'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'tt', X, 3.6, 12.0, ['사람이 읽을 title · detail', 'human-readable title and detail'], 'warn', 3, { off: 4, h: 1.0 }); lbl(S, 'n3', X, 6.6, ['사용자에게 보여줄 설명은 따로 · 다국어 고려', 'user-facing text is separate; consider i18n'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'tr', X, 3.6, 5.8, 'trace_id: 9f2c…', 'accent', 4, { h: 1.0 }); nd(S, 'nx', X + 6.2, 3.6, 5.8, ['스택 트레이스 ✗', 'stack traces ✗'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['추적 ID는 넣고 내부 정보는 빼요', 'include a trace ID, never internals'], 'a', 4, { w: 12 });
    },
    notes: [['4xx는 클라이언트가 고쳐야 할 문제, 5xx는 서버 문제예요 · 상태 코드부터 정확히 고르는 게 시작이에요', '4xx means the client must fix something and 5xx a server problem, so start by choosing the right status code'], ['RFC 9457 Problem Details는 type, title, status, detail, instance로 이뤄진 표준 오류 형식이에요 · 클라이언트는 type으로 분기해요', 'RFC 9457 Problem Details is a standard error shape of type, title, status, detail and instance, and clients branch on type'], ['title과 detail은 사람이 읽을 설명이라 문구가 바뀌어도 프로그램이 깨지지 않아요 · 필드별 오류 같은 확장 필드도 더할 수 있어요', 'title and detail are for humans, so rewording never breaks code, and extension fields such as per-field errors can be added'], ['응답에는 로그를 찾을 수 있는 추적 ID를 넣고, 스택 트레이스나 SQL 같은 내부 정보는 절대 넣지 않아요', 'responses include a trace ID for finding logs but never internals such as stack traces or SQL']],
    fin: [['오류 응답 설계: 정확한 상태 코드 + 기계가 읽는 type + 사람이 읽는 설명 + 추적 ID', 'error response design combines the right status code, a machine-readable type, human-readable text and a trace ID', 'bex-xs bex-a'], ['검증 오류는 필드별 목록으로 돌려줘요', 'return validation errors as a per-field list'], ['모든 엔드포인트가 같은 형식을 쓰게 한 곳에서 만들어요', 'generate errors in one place so every endpoint matches']],
    caps: [['상태 코드', 'Status codes'], ['기계가 읽는 type', 'Machine-readable types'], ['사람이 읽는 설명', 'Human-readable text'], ['추적 ID와 보안', 'Trace IDs and safety'], ['오류 응답 설계', 'Error response design']]
  });
}

function sIdemKey() {
  return CW('be-idempotency-key', {
    code: ['POST /payments', 'Idempotency-Key: 8e0f…c1', ['// 서버: 키별로 결과를 저장해 두기', '// server: store results per key'], 'const hit = await store.get(key);', ['if (hit) return hit.response;  // 재사용', 'if (hit) return hit.response;  // replay'], 'const res = await charge(body);', "await store.set(key, res, '24h');"],
    hl: [[0, 2], [5, 2, 'ok'], [3, 2, 'warn'], [3, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'cl', X, .8, 3.2, ['앱', 'App'], 'line', 0, { h: 1.1 }); nd(S, 'sv', X + 8.8, .8, 3.2, ['서버', 'Server'], 'line', 0, { h: 1.1 });
      arw(S, 'r1', [X + 3.25, 1.2], [X + 8.75, 1.2], 1); lbl(S, 'r1l', X + 3.6, 1.45, 'POST + key', 'm', 1); chip(S, 'ch', X + 8.8, 2.3, 3.2, ['결제 1회', 'charged ×1'], 'ok', 1, { h: .9 });
      lbl(S, 'tm', X + 3.6, 2.4, ['응답 끊김', 'reply lost'], 'm r', 1); lbl(S, 'n1', X, 6.6, ['결제됐는지 모르는 채 응답이 끊겼어요', 'the reply was lost; was it charged?'], 'r', 1, { off: 2, w: 12 });
      arw(S, 'r2', [X + 3.25, 3.6], [X + 8.75, 3.6], 2); lbl(S, 'r2l', X + 3.6, 3.85, ['같은 키로 재시도', 'retry, same key'], 'm a', 2); lbl(S, 'n2', X, 6.6, ['같은 키면 저장된 결과를 그대로 돌려줘요', 'the same key replays the stored result'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'ch2', X + 8.8, 4.5, 3.2, ['추가 결제 없음', 'no charge'], 'accent', 2, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['동시에 같은 키가 오면 잠금 · 고유 제약으로 하나만', 'concurrent duplicates: lock or unique constraint'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['키는 클라이언트가 만들고(UUID) 일정 기간 보관', 'clients generate keys (UUIDs); servers keep them a while'], 'a', 4, { w: 12 });
    },
    notes: [['결제 요청이 처리됐는데 응답이 네트워크에서 끊기면, 클라이언트는 결제가 됐는지 알 수 없어요', 'if a payment succeeds but the reply is lost on the network, the client cannot tell whether it was charged'], ['클라이언트가 같은 Idempotency-Key로 재시도하면 서버는 저장해 둔 첫 결과를 그대로 돌려줘서 두 번 결제되지 않아요', 'retrying with the same Idempotency-Key makes the server replay the stored first result, so nothing is charged twice'], ['같은 키가 거의 동시에 두 번 오면 잠금이나 DB 고유 제약으로 하나만 처리하고 나머지는 기다리거나 409로 돌려보내요', 'when the same key arrives twice at once, a lock or a unique constraint lets only one proceed while the other waits or gets a 409'], ['키는 클라이언트가 UUID로 만들고, 서버는 24시간처럼 정해진 기간 동안 결과와 함께 보관해요', 'clients generate keys as UUIDs, and servers keep them with results for a set period such as 24 hours']],
    fin: [['멱등 키: 재시도해도 결과가 한 번만 일어나게 하는 API 패턴 · 결제·주문처럼 중복이 치명적인 POST에 필수', 'idempotency keys make retried requests take effect only once, essential for POSTs where duplicates hurt, such as payments and orders', 'bex-xs bex-a'], ['같은 키에 다른 본문이 오면 422로 거부해요', 'reject a reused key with a different body (422)'], ['결제 API들이 널리 쓰는 방식이에요', 'payment APIs widely use this pattern']],
    caps: [['끊긴 응답', 'A lost reply'], ['같은 키로 재시도', 'Retrying with the same key'], ['동시 중복', 'Concurrent duplicates'], ['키의 수명', 'Key lifetime'], ['멱등 키', 'Idempotency keys']]
  });
}

function sWebhooks() {
  return CW('be-webhooks', {
    code: [['// 보내는 쪽: 서명 + 재시도', '// sender: sign and retry'], "sig = hmac(secret, ts + '.' + body)", 'X-Signature: t=1731230000,v1=5f3a…', ['// 받는 쪽: 검증 → 빠르게 200 → 큐 처리', '// receiver: verify → 200 fast → queue'], 'if (!timingSafeEqual(sig, expected))', '  return res.status(401).end();', ['if (seen(event.id)) return ok();  // 중복', 'if (seen(event.id)) return ok();  // dup']],
    hl: [[0, 3], [3, 3, 'ok'], [6, 1, 'warn'], [0, 2]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pv', X, .8, 3.6, ['결제사', 'Provider'], 'line', 0, { h: 1.1 }); nd(S, 'rc', X + 8.4, .8, 3.6, ['우리 서버', 'Our server'], 'accent', 0, { h: 1.1 });
      arw(S, 'p1', [X + 3.65, 1.35], [X + 8.35, 1.35], 1); lbl(S, 'p1l', X + 3.9, 1.6, 'POST + X-Signature', 'm', 1); lbl(S, 'n1', X, 6.6, ['이벤트가 생기면 상대가 우리 URL로 알려줘요', 'the provider calls our URL when events happen'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'vf', X + 8.4, 2.3, 3.6, ['서명 검증', 'verify sig'], 'ok', 2, { h: .9 }); lbl(S, 'n2', X, 6.6, ['서명·시각을 검증해 위조와 재전송 공격을 막아요', 'verify signature and timestamp against forgery and replays'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'k2', X + 8.4, 3.4, 3.6, '200', 'ok', 2, { h: .9 }); nd(S, 'q', X + 8.4, 4.5, 3.6, ['큐 → 처리', 'queue → work'], 'line', 2, { h: .9 });
      [0, 1, 2].forEach(i => chip(S, 'rt' + i, X + i * 1.3, 2.6, 1.1, '↻', 'warn', 3, { off: 4, h: .9 })); lbl(S, 'rtl', X, 3.7, ['간격 늘려 재전송', 'resent with backoff'], 'm w', 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['같은 이벤트가 여러 번 올 수 있어 id로 중복 제거', 'the same event may repeat; dedupe by id'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['보낼 때도 같은 원칙: 서명 · 재시도 · 멱등', 'when sending: sign, retry, stay idempotent'], 'a', 4, { w: 12 });
    },
    notes: [['웹훅은 결제 완료 같은 이벤트가 생겼을 때 상대 서비스가 우리 URL로 HTTP 요청을 보내 알려주는 방식이에요', 'webhooks let another service notify us of events such as completed payments by sending HTTP requests to our URL'], ['누구나 그 URL로 요청할 수 있으니 공유 비밀키로 만든 HMAC 서명과 타임스탬프를 검증해 위조와 재전송 공격을 막아요', 'anyone can call that URL, so verify an HMAC signature from a shared secret plus a timestamp to block forgery and replays'], ['받은 쪽은 무거운 처리를 큐로 넘기고 바로 200을 돌려줘요 · 응답이 늦거나 실패하면 보내는 쪽이 간격을 늘리며 다시 보내요', 'receivers queue heavy work and return 200 immediately, since slow or failed replies make senders retry with backoff'], ['재시도 때문에 같은 이벤트가 여러 번 올 수 있으니 이벤트 id로 중복을 걸러요 · 우리가 보낼 때도 서명·재시도·멱등을 지켜요', 'retries mean the same event can arrive repeatedly, so dedupe by event id, and apply signing, retries and idempotency when we send too']],
    fin: [['웹훅: 이벤트를 HTTP로 밀어주는 통합 방식 · 서명 검증, 빠른 응답, 재시도, 멱등 처리가 핵심', 'webhooks push events over HTTP, with signature checks, fast replies, retries and idempotent handling at the core', 'bex-xs bex-a'], ['순서가 보장되지 않을 수 있어 최신 상태는 API로 다시 확인해요', 'ordering is not guaranteed, so confirm the latest state via the API'], ['서명 비교는 타이밍 안전 함수로', 'compare signatures with a timing-safe function']],
    caps: [['웹훅 받기', 'Receiving webhooks'], ['서명 검증', 'Verifying signatures'], ['재시도와 중복', 'Retries and duplicates'], ['보낼 때', 'When sending'], ['웹훅', 'Webhooks']]
  });
}

function sUpload() {
  return CW('be-file-upload', {
    code: [['// 1. 서버: 5분짜리 업로드 URL 발급', '// 1. server: issue a 5-minute upload URL'], 'const url = await presign(key, { ttl: 300,', "  contentType: 'image/png', maxBytes: 10e6 });", ['// 2. 브라우저 → 스토리지로 직접 PUT', '// 2. browser PUTs straight to storage'], "await fetch(url, { method: 'PUT', body });", ['// 3. 완료 이벤트 → 검사 · 썸네일 생성', '// 3. upload event → scan, thumbnails']],
    hl: [[0, 3], [3, 2, 'ok'], [5, 1, 'warn'], [1, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'br', X, .8, 3.4, ['브라우저', 'Browser'], 'line', 0, { h: 1.1 }); nd(S, 'ap', X + 4.3, .8, 3.4, 'API', 'accent', 0, { h: 1.1 }); nd(S, 'st', X + 8.6, .8, 3.4, ['스토리지', 'Storage'], 'ok', 0, { h: 1.1 });
      arw(S, 'n0', [X + 3.45, 1.35], [X + 4.25, 1.35], 1, { off: 2, h: .2, color: 'danger' }); arw(S, 'n1a', [X + 7.75, 1.35], [X + 8.55, 1.35], 1, { off: 2, h: .2, color: 'danger' });
      lbl(S, 'n1', X, 6.6, ['서버를 거치면 대역폭·메모리가 파일 크기만큼 들어요', 'proxying files costs server bandwidth and memory'], 'r', 1, { off: 2, w: 12 });
      arw(S, 'p1', [X + 3.45, 1.2], [X + 4.25, 1.2], 2); arw(S, 'p2', [X + 4.25, 1.6], [X + 3.45, 1.6], 2, { color: 'ok' }); lbl(S, 'p2l', X + 2.8, 2.2, ['서명된 URL', 'signed URL'], 'm g', 2); lbl(S, 'n2', X, 6.6, ['서버는 짧게 유효한 서명 URL만 만들어요', 'the server only signs a short-lived URL'], 'g', 2, { off: 3, w: 12 });
      ed(S, 'up0', [X + 1.7, 1.95], [X + 1.7, 3.6], 3, { color: 'accent', h: .1 }); ed(S, 'up1', [X + 1.7, 3.6], [X + 10.3, 3.6], 3, { color: 'accent', h: .1 }); arw(S, 'up', [X + 10.3, 3.6], [X + 10.3, 2.0], 3, { color: 'accent' }); lbl(S, 'upl', X + 2.4, 3.8, ['파일은 스토리지로 직접', 'direct to storage'], 'm a', 3); lbl(S, 'n3', X, 6.6, ['크기·형식 제한을 서명에 담아요', 'size and type limits are part of the signature'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'ev', X + 8.6, 4.4, 3.4, ['검사 · 썸네일', 'scan, thumbs'], 'warn', 4, { h: 1.0 }); arw(S, 'eva', [X + 11.5, 1.95], [X + 11.5, 4.35], 4);
      lbl(S, 'n4', X, 6.6, ['업로드 완료 이벤트로 후처리 · 검사 전엔 비공개', 'post-process on upload events; private until scanned'], 'a', 4, { w: 12 });
    },
    notes: [['파일을 앱 서버를 거쳐 올리면 서버의 대역폭과 메모리가 파일 크기만큼 들고, 큰 파일이 몰리면 다른 요청까지 느려져요', 'proxying uploads through the app server spends bandwidth and memory per file, and large files slow every other request'], ['서버는 S3 같은 스토리지에 올릴 수 있는 짧게 유효한 서명 URL(presigned URL)만 만들어 돌려줘요', 'the server only returns a short-lived presigned URL for uploading to storage such as S3'], ['브라우저가 그 URL로 파일을 스토리지에 직접 올려요 · 허용 크기와 형식을 서명 조건에 넣어 다른 파일은 거부돼요', 'the browser uploads directly to storage with that URL, and size and type limits in the signature reject other files'], ['업로드 완료 이벤트로 바이러스 검사, 썸네일 생성 같은 후처리를 하고, 검사가 끝나기 전엔 비공개로 둬요', 'upload events trigger post-processing such as virus scans and thumbnails, keeping files private until checked']],
    fin: [['파일 업로드: 서버는 서명만, 파일은 스토리지로 직접 · 큰 파일은 멀티파트 업로드로 나눠 올려요', 'file uploads have the server sign and the file go straight to storage, with multipart uploads for large files', 'bex-xs bex-a'], ['파일 이름은 사용자 입력 대신 서버가 정한 키로', 'use server-generated keys, not user-supplied names'], ['다운로드도 서명 URL로 기간을 제한해요', 'downloads use time-limited signed URLs too']],
    caps: [['서버 경유의 비용', 'The cost of proxying'], ['서명 URL', 'Presigned URLs'], ['직접 업로드', 'Direct uploads'], ['후처리', 'Post-processing'], ['파일 업로드', 'File uploads']]
  });
}

function sAsyncApi() {
  return CW('be-async-api', {
    code: ['POST /reports            → 202 Accepted', 'Location: /jobs/77', 'Retry-After: 5', 'GET /jobs/77  → { "status": "running",', '                 "progress": 40 }', 'GET /jobs/77  → { "status": "done",', '                 "result": "/reports/9" }', ['// 또는 완료 시 웹훅 · SSE로 알림', '// or notify via webhook or SSE']],
    hl: [[0, 3], [3, 2, 'warn'], [5, 2, 'ok'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'c', X, .8, 3.2, ['클라이언트', 'Client'], 'line', 0, { h: 1.1 }); nd(S, 'a', X + 4.4, .8, 3.2, 'API', 'accent', 0, { h: 1.1 }); nd(S, 'w', X + 8.8, .8, 3.2, ['워커', 'Worker'], 'warn', 0, { h: 1.1 });
      chip(S, 'r1', X + 4.4, 2.3, 3.2, '202', 'ok', 1, { h: .9 }); arw(S, 'q', [X + 7.65, 1.35], [X + 8.75, 1.35], 1); lbl(S, 'n1', X, 6.6, ['오래 걸릴 일은 접수만 하고 바로 202', 'accept long work and reply 202 at once'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'pb', X + 8.8, 2.4, 3.2, .4, tint('line', 30), 2); sw(S, 'pf', X + 8.8, 2.4, 1.3, .4, 'var(--warn)', 2, { css: 'z-index:3' }); S.set('pf', 3, { width: '3.2em' }); S.set('pf', 0, { width: '1.3em' });
      [0, 1, 2].forEach(i => arw(S, 'po' + i, [X + 1.6, 2.0 + i * .9], [X + 4.35, 2.0 + i * .9 + .3], 2, { dash: 1 })); lbl(S, 'n2', X, 6.6, ['클라이언트는 상태 URL을 주기적으로 확인', 'clients poll the status URL'], 'w', 2, { off: 3, w: 12 });
      chip(S, 'dn', X + 8.8, 3.2, 3.2, 'done', 'ok', 3, { h: .9 }); lbl(S, 'n3', X, 6.6, ['끝나면 결과 위치를 알려줘요', 'when done, it points to the result'], 'g', 3, { off: 4, w: 12 });
      arw(S, 'wh', [X + 8.75, 4.6], [X + 1.7, 4.6], 4, { color: 'accent' }); lbl(S, 'whl', X + 3.0, 4.85, ['웹훅 · SSE로 먼저 알려주기', 'push via webhook or SSE'], 'm a', 4);
      lbl(S, 'n4', X, 6.6, ['폴링 대신 완료를 밀어줄 수도 있어요', 'or push completion instead of polling'], 'a', 4, { w: 12 });
    },
    notes: [['리포트 생성처럼 수십 초 걸리는 일을 요청 안에서 처리하면 타임아웃이 나요 · 접수만 하고 202 Accepted와 상태 URL을 돌려줘요', 'doing work that takes tens of seconds inside a request hits timeouts, so accept it and return 202 Accepted with a status URL'], ['클라이언트는 Retry-After 간격으로 상태 URL을 확인하고, 서버는 진행률을 알려줘요', 'clients poll the status URL at the Retry-After interval, and the server reports progress'], ['작업이 끝나면 상태가 done이 되고 결과 리소스의 위치를 알려줘요', 'when the job finishes, its status becomes done and points to the result resource'], ['폴링 대신 웹훅이나 SSE로 완료를 먼저 알려줄 수도 있어요 · 작업 id로 중복 접수도 막아요', 'webhooks or SSE can push completion instead of polling, and job ids prevent duplicate submissions']],
    fin: [['비동기 작업 API: 202 접수 → 상태 조회 → 결과 위치 · 긴 작업을 요청-응답에서 분리해요', 'asynchronous job APIs accept with 202, expose status and point to results, separating long work from request-response', 'bex-xs bex-a'], ['작업 상태는 DB에 저장해 서버가 바뀌어도 조회돼요', 'store job state in the database so any server can answer'], ['취소 엔드포인트도 함께 설계해요', 'design a cancel endpoint too']],
    caps: [['202 접수', 'Accepting with 202'], ['상태 확인', 'Polling status'], ['완료와 결과', 'Completion and results'], ['푸시 알림', 'Push notification'], ['비동기 작업 API', 'Asynchronous job APIs']]
  });
}

function sValidation() {
  return CW('be-validation', {
    code: [['// ✗ 검사만 하고 원본을 계속 사용', '// ✗ check, then keep using the raw input'], 'if (isValid(input)) save(input);', ['// ✓ 파싱해서 믿을 수 있는 타입으로', '// ✓ parse into a trusted type'], ['const order = OrderSchema.parse(input); // 400', 'const order = OrderSchema.parse(input); // 400'], ['save(order);   // 여기부터는 검증된 Order', 'save(order);   // a validated Order from here'], ['// 허용 목록 · 길이 · 개수 · 크기 제한', '// allowlists; limits on length, count, size']],
    hl: [[0, 2, 'danger'], [2, 3, 'ok'], [5, 1, 'warn'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      sw(S, 'out', X, .8, 3.6, 5.0, tint('danger', 15), 0, { r: .4 }); cl(S, 'outl', X, 1.0, 3.6, ['바깥 (불신)', 'outside (untrusted)'], 'm r', 0);
      sw(S, 'in', X + 5.4, .8, 6.6, 5.0, tint('ok', 15), 0, { r: .4 }); cl(S, 'inl', X + 5.4, 1.0, 6.6, ['안쪽 (검증된 타입)', 'inside (validated types)'], 'm g', 0);
      vl(S, 'bd', X + 4.5, .8, 5.8, 'ink-3', 0, { w: .14, dash: 1 });
      chip(S, 'raw', X + .3, 2.4, 3.0, 'any', 'danger', 1, { h: .9, css: 'z-index:3' }); lbl(S, 'n1', X, 6.6, ['검사 결과를 버리면 안쪽 코드가 계속 의심해야 해요', 'discarding check results leaves inner code doubting'], 'r', 1, { off: 2, w: 12 });
      chip(S, 'ps', X + 3.4, 2.4, 2.3, 'parse', 'warn', 2, { h: 1.0, css: 'z-index:3' }); chip(S, 'ty', X + 5.8, 2.4, 3.0, 'Order', 'ok', 2, { h: .9, css: 'z-index:3' }); lbl(S, 'n2', X, 6.6, ['경계에서 한 번 파싱 → 안쪽은 타입을 믿어요', 'parse once at the edge; trust types inside'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['경계 = 신뢰가 바뀌는 곳 (HTTP · 큐 · 파일)', 'edges are where trust changes: HTTP, queues, files'], 'a', 3, { off: 4, w: 12 });
      ['body ≤ 1MB', 'items ≤ 100', 'name ≤ 50'].forEach((t, i) => chip(S, 'lm' + i, X + 5.8, 3.6 + i * .7, 5.8, t, 'line', 4, { h: .6, css: 'z-index:3' }));
      lbl(S, 'n4', X, 6.6, ['허용 목록과 크기 제한으로 남용도 막아요', 'allowlists and size limits stop abuse too'], 'w', 4, { w: 12 });
    },
    notes: [['isValid로 검사만 하고 원본 input을 계속 쓰면, 안쪽 코드는 그 값이 검사됐는지 알 수 없어 또 의심하게 돼요', 'checking with isValid but passing the raw input on leaves inner code unsure whether it was checked'], ['경계에서 스키마로 파싱해 Order 같은 믿을 수 있는 타입으로 바꾸면, 그 뒤 코드는 타입만 믿으면 돼요(Parse, don’t validate)', 'parsing at the edge into a trusted type such as Order lets later code simply trust the type: parse, don’t validate'], ['경계는 HTTP 요청뿐 아니라 큐 메시지, 파일, 외부 API 응답처럼 신뢰가 바뀌는 모든 곳이에요', 'edges include not just HTTP requests but queue messages, files and external API responses, anywhere trust changes'], ['알려진 필드만 받는 허용 목록과 본문 크기·배열 길이·문자열 길이 제한으로 대량 할당과 서비스 거부 공격도 막아요', 'allowlists of known fields and limits on body size, array length and string length also block mass assignment and denial of service']],
    fin: [['입력 검증: 신뢰 경계에서 한 번 파싱해 타입으로 바꾸고, 허용 목록과 크기 제한을 함께 적용해요', 'input validation parses once at trust boundaries into types, alongside allowlists and size limits', 'bex-xs bex-a'], ['SQL은 항상 매개변수 바인딩으로', 'always bind SQL parameters'], ['오류 메시지는 필드별로 구체적으로', 'make error messages specific per field']],
    caps: [['검사만 하기', 'Checking only'], ['파싱하기', 'Parsing'], ['신뢰 경계', 'Trust boundaries'], ['제한 걸기', 'Setting limits'], ['입력 검증', 'Input validation']]
  });
}
/* ===== Backend · 3. data layer ===== */
function sOrm() {
  return CW('be-orm', {
    code: [['// ORM: 객체로 다루기', '// ORM: work with objects'], 'const u = await repo.findOneBy({ id });', ['// 쿼리 빌더: 타입 있는 SQL', '// query builder: typed SQL'], "db.selectFrom('users').where('id', '=', id)", '  .selectAll().executeTakeFirst();', ['// 원시 SQL: 복잡한 리포트 · 튜닝', '// raw SQL: complex reports, tuning'], 'sql`SELECT … FROM users WHERE id = ${id}`'],
    hl: [[0, 2], [2, 3, 'ok'], [5, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'ax', X, 1.6, 12.0, .3, `linear-gradient(90deg,${tint('accent', 60)},${tint('warn', 60)})`, 0); lbl(S, 'axa', X, .7, ['추상화 ↑', 'abstraction ↑'], 'm a', 0); lbl(S, 'axb', X + 8.4, .7, ['통제 ↑', 'control ↑'], 'm w', 0);
      [['ORM', 0], [['쿼리 빌더', 'Query builder'], 4.2], [['원시 SQL', 'Raw SQL'], 8.4]].forEach(([t, x], i) => nd(S, 'k' + i, X + x, 2.4, 3.6, t, ['accent', 'ok', 'warn'][i], i + 1, { h: 1.0 }));
      lbl(S, 'n1', X, 6.6, ['빠른 CRUD · 관계 탐색 · 대신 만들어지는 SQL이 숨어요', 'fast CRUD and relations, but generated SQL hides'], 'a', 1, { off: 2, w: 12 }); lbl(S, 'r1', X, 3.8, ['N+1 · 과한 조회 주의', 'beware N+1 and overfetching'], 'm r', 1, { off: 2 });
      lbl(S, 'n2', X, 6.6, ['SQL에 가깝게 쓰면서 타입 검사와 자동 완성', 'close to SQL, with type checks and autocomplete'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['윈도 함수·CTE 같은 복잡한 쿼리는 SQL 그대로', 'complex queries such as window functions stay SQL'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'pb', X, 4.2, 12.0, ['어느 쪽이든 값은 매개변수 바인딩 ($1)', 'whichever you use, bind parameters ($1)'], 'danger', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.6, ['섞어 써도 돼요 · 쿼리 로그로 실제 SQL 확인', 'mixing is fine; check real SQL in query logs'], 'a', 4, { w: 12 });
    },
    notes: [['ORM은 테이블을 객체처럼 다뤄 CRUD와 관계 탐색이 빨라요 · 대신 실제로 나가는 SQL이 숨어 N+1이나 과한 조회가 생기기 쉬워요', 'ORMs treat tables as objects for fast CRUD and relation navigation, but the SQL they emit hides, inviting N+1 and overfetching'], ['Kysely, Drizzle 같은 쿼리 빌더는 SQL에 가까운 모양으로 쓰면서 테이블·컬럼 이름과 결과 타입을 검사해 줘요', 'query builders such as Kysely and Drizzle stay close to SQL while checking table and column names and result types'], ['윈도 함수, CTE, 복잡한 리포트처럼 SQL이 가장 잘 표현하는 쿼리는 원시 SQL로 써요', 'queries SQL expresses best, such as window functions, CTEs and complex reports, stay as raw SQL'], ['한 프로젝트에서 섞어 써도 돼요 · 어느 쪽이든 값은 반드시 매개변수 바인딩으로 넘겨 SQL 인젝션을 막아요', 'mixing them in one project is fine, but values must always be bound as parameters to prevent SQL injection']],
    fin: [['데이터 접근 방식 선택: ORM(생산성) · 쿼리 빌더(타입 + SQL 감각) · 원시 SQL(완전한 통제)을 쿼리 성격에 맞게', 'choose data access by query type: ORMs for productivity, query builders for types with SQL feel, raw SQL for full control', 'bex-xs bex-a'], ['개발 중엔 실행되는 SQL을 로그로 확인해요', 'log executed SQL during development'], ['성능 문제는 EXPLAIN으로 실제 계획을 봐요', 'diagnose performance with EXPLAIN']],
    caps: [['ORM', 'ORMs'], ['쿼리 빌더', 'Query builders'], ['원시 SQL', 'Raw SQL'], ['매개변수 바인딩', 'Parameter binding'], ['데이터 접근 방식', 'Data access styles']]
  });
}

function sMigrations() {
  return CW('be-migrations', {
    code: [['-- 1. 확장: 새 컬럼 추가 (NULL 허용)', '-- 1. expand: add a nullable column'], 'ALTER TABLE users ADD COLUMN full_name text;', ['-- 2. 앱: 두 컬럼에 모두 쓰기 + 백필', '-- 2. app writes both, then backfill'], 'UPDATE users SET full_name = name WHERE …;', ['-- 3. 앱: 새 컬럼만 읽기', '-- 3. app reads only the new column'], ['-- 4. 축소: 옛 컬럼 삭제', '-- 4. contract: drop the old column'], 'ALTER TABLE users DROP COLUMN name;'],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 2, 'danger']],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'h0', X, .6, ['배포', 'deploy'], 'm', 0); lbl(S, 'h1', X + 3.0, .6, 'name', 'm a', 0); lbl(S, 'h2', X + 6.4, .6, 'full_name', 'm g', 0);
      const R = [['v1', 'ok', 'line', 1], ['v2', 'ok', 'warn', 2], ['v3', 'line', 'ok', 3], ['v4', '', 'ok', 4]];
      R.forEach(([v, a, b, st], i) => { lbl(S, 'v' + i, X, 1.5 + i * 1.2, v, 'm', st); if (a) chip(S, 'a' + i, X + 3.0, 1.4 + i * 1.2, 3.0, a === 'ok' ? ['읽기·쓰기', 'read/write'] : ['안 씀', 'unused'], a, st, { h: .9 }); chip(S, 'b' + i, X + 6.4, 1.4 + i * 1.2, 3.6, b === 'line' ? ['추가됨(빈 값)', 'added (empty)'] : (b === 'warn' ? ['같이 쓰기', 'dual write'] : ['읽기·쓰기', 'read/write']), b, st, { h: .9 }); });
      lbl(S, 'n1', X, 6.6, ['새 컬럼은 비어 있어도 되게 먼저 추가', 'add the new column first, allowing nulls'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['옛·새 버전 앱이 함께 돌아도 둘 다 동작', 'old and new app versions both keep working'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['읽기를 옮긴 뒤 한동안 지켜봐요', 'switch reads and watch for a while'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['아무도 안 쓰게 된 뒤에야 옛 컬럼 삭제', 'drop the old column only once nothing uses it'], 'r', 4, { w: 12 });
    },
    notes: [['컬럼 이름을 한 번에 바꾸면 배포 중 잠시 함께 도는 옛 버전 앱이 깨져요 · 먼저 새 컬럼을 NULL 허용으로 추가해요(확장)', 'renaming a column in one step breaks the old app version still running during a deploy, so first add the new column as nullable (expand)'], ['다음 배포에서 앱이 두 컬럼에 모두 쓰고, 기존 데이터는 작은 묶음으로 나눠 백필해요', 'the next deploy writes both columns while existing rows are backfilled in small batches'], ['데이터가 맞춰진 뒤 읽기를 새 컬럼으로 옮기고 한동안 문제가 없는지 지켜봐요', 'once the data matches, reads move to the new column and are watched for a while'], ['아무 버전도 옛 컬럼을 쓰지 않게 된 뒤에야 삭제해요(축소) · 각 단계는 따로 배포되고 언제든 되돌릴 수 있어요', 'only when no version uses the old column is it dropped (contract), with each step deployed separately and reversible']],
    fin: [['확장-축소(expand-contract) 마이그레이션: 옛·새 코드가 동시에 돌아도 깨지지 않게 스키마를 여러 단계로 바꿔 무중단 배포를 해요', 'expand-contract migrations change schemas in steps that work with old and new code at once, enabling zero-downtime deploys', 'bex-xs bex-a'], ['큰 테이블의 인덱스는 CONCURRENTLY로 만들어 잠금을 피해요', 'build indexes on big tables CONCURRENTLY to avoid locks'], ['마이그레이션 파일은 버전 관리하고 앱 배포 전에 적용해요', 'version migration files and apply them before app deploys']],
    caps: [['확장', 'Expand'], ['같이 쓰기와 백필', 'Dual writes and backfill'], ['읽기 전환', 'Switching reads'], ['축소', 'Contract'], ['무중단 스키마 변경', 'Zero-downtime schema changes']]
  });
}

function sTxBoundary() {
  return CW('be-tx-boundary', {
    code: ['await db.transaction(async (tx) => {', '  await tx.orders.insert(order);', '  await tx.stock.decrement(sku, qty);', ['  // ✗ 여기서 결제 API 호출 금지', '  // ✗ no payment API calls in here'], '});', ['await payments.charge(order); // 트랜잭션 밖', 'await payments.charge(order); // after commit'], ['// 실패하면? → 보상 처리 · 아웃박스', '// failed? → compensation, outbox']],
    hl: [[0, 5, 'ok'], [3, 1, 'danger'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'tx', X, .6, 7.6, 3.4, 'BEGIN … COMMIT', 'ok', 1, { tc: 'g' }); nd(S, 'o', X + .4, 1.4, 6.8, 'INSERT orders', 'line', 1, { h: .9 }); nd(S, 's', X + .4, 2.6, 6.8, 'UPDATE stock', 'line', 1, { h: .9 });
      lbl(S, 'n1', X, 6.6, ['함께 성공하거나 함께 실패해야 하는 것만 묶어요', 'group only what must succeed or fail together'], 'g', 1, { off: 2, w: 12 });
      nd(S, 'pg', X + 8.4, 1.4, 3.6, ['결제 API 3초', 'PG API 3 s'], 'danger', 2, { off: 3, h: 1.0 }); arw(S, 'pa', [X + 7.25, 1.9], [X + 8.35, 1.9], 2, { off: 3, color: 'danger' });
      lbl(S, 'n2', X, 6.6, ['안에서 외부 호출 → 잠금·연결을 3초간 붙잡아요', 'external calls inside hold locks and connections'], 'r', 2, { off: 3, w: 12 }); lbl(S, 'n2b', X, 4.4, ['게다가 롤백해도 결제는 취소되지 않아요', 'and a rollback never undoes the charge'], 'm r', 2, { off: 3, w: 12 });
      nd(S, 'pg2', X + 8.4, 4.4, 3.6, ['결제 (밖에서)', 'charge after'], 'warn', 3, { h: 1.0 }); arw(S, 'pb', [X + 3.8, 4.05], [X + 8.35, 4.9], 3);
      lbl(S, 'n3', X, 6.6, ['트랜잭션은 짧게 · 외부 호출은 커밋 뒤에', 'keep transactions short; call out after commit'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['밖의 작업이 실패하면 보상(취소) 처리', 'if outside work fails, compensate'], 'a', 4, { w: 12 }); lbl(S, 'n4b', X, 7.7, ['“반드시 보내기”는 아웃박스 패턴으로', 'for guaranteed sends, use the outbox pattern'], '', 4, { w: 12 });
    },
    notes: [['주문 저장과 재고 차감처럼 함께 성공하거나 함께 실패해야 하는 DB 작업을 하나의 트랜잭션으로 묶어요', 'database operations that must succeed or fail together, such as saving an order and decrementing stock, share one transaction'], ['트랜잭션 안에서 결제 API처럼 느린 외부 호출을 하면 그동안 행 잠금과 DB 연결을 붙잡아 다른 요청이 줄을 서요 · 롤백해도 이미 된 결제는 취소되지 않아요', 'slow external calls such as payment APIs inside a transaction hold row locks and connections, queueing other requests, and a rollback never undoes the charge'], ['트랜잭션은 DB 작업만으로 짧게 끝내고, 외부 호출은 커밋 뒤에 해요', 'keep transactions short with only database work and make external calls after commit'], ['커밋 뒤의 작업이 실패하면 주문 취소 같은 보상 처리를 하고, 메시지 발행처럼 반드시 해야 하는 일은 아웃박스 패턴으로 보장해요', 'if post-commit work fails, compensate, for example by cancelling the order, and guarantee must-happen work such as publishing with the outbox pattern']],
    fin: [['트랜잭션 경계: 함께 원자적이어야 할 DB 작업만, 짧게 · 외부 부수 효과는 경계 밖에서', 'transaction boundaries wrap only the database work that must be atomic, briefly, keeping external side effects outside', 'bex-xs bex-a'], ['트랜잭션은 보통 서비스 메서드 단위로 열어요', 'transactions usually open per service method'], ['긴 트랜잭션은 교착 상태와 지연의 원인', 'long transactions cause deadlocks and latency']],
    caps: [['함께 묶기', 'Grouping together'], ['안에서 외부 호출', 'External calls inside'], ['짧게 · 밖에서', 'Short, and outside'], ['실패 처리', 'Handling failures'], ['트랜잭션 경계', 'Transaction boundaries']]
  });
}

function sCacheStrat() {
  return CW('be-cache-strategies', {
    code: [['// 읽기: 캐시 어사이드 (없으면 DB → 저장)', '// read: cache-aside (miss → DB → store)'], ['// 쓰기: write-through (DB와 캐시 함께)', '// write: write-through (DB and cache)'], 'await db.save(p); await cache.set(k, p);', ['// write-behind: 캐시 먼저, DB는 모아서', '// write-behind: cache first, DB batched'], ['// 다층: 메모리 → Redis → DB', '// layers: memory → Redis → DB'], 'const v = local.get(k)', '  ?? await redis.get(k) ?? await db.find(k);'],
    hl: [[1, 2], [3, 1, 'warn'], [4, 3, 'ok'], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      [['L1 ' + 'memory', '~µs', 'accent'], ['L2 Redis', '~1ms', 'ok'], ['DB', '~10ms', 'line']].forEach(([t, l, c], i) => { nd(S, 'L' + i, X + i * 4.1, .8, 3.8, t, c, 0, { h: 1.1 }); lbl(S, 'lt' + i, X + i * 4.1, 2.1, l, 'm', 0); });
      arw(S, 'w1', [X + 7.2, 3.2], [X + 7.2, 2.0], 1, { off: 2 }); arw(S, 'w2', [X + 11.3, 3.2], [X + 11.3, 2.0], 1, { off: 2 }); nd(S, 'wr', X + 4.1, 3.2, 7.9, 'write', 'warn', 1, { off: 2, h: .9 });
      lbl(S, 'n1', X, 6.6, ['write-through: 쓸 때 캐시도 갱신 · 읽기가 항상 최신', 'write-through updates the cache on write'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'wb', X + 4.1, 3.2, 3.8, 'write', 'warn', 2, { off: 3, h: .9 }); arw(S, 'w3', [X + 7.2, 3.2], [X + 7.2, 2.0], 2, { off: 3 }); arw(S, 'w4', [X + 8.0, 2.6], [X + 8.2, 1.4], 2, { off: 3, dash: 1 }); lbl(S, 'wbl', X + 8.4, 3.3, ['나중에 모아서', 'batched later'], 'm w', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['write-behind: 빠르지만 캐시가 죽으면 유실 위험', 'write-behind is fast but risks loss if the cache dies'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['가까운 층부터 찾아요 · 뜨거운 키는 프로세스 메모리', 'look nearest first; hot keys live in process memory'], 'g', 3, { off: 4, w: 12 }); [0, 1].forEach(i => arw(S, 'rd' + i, [X + 3.85 + i * 4.1, 1.35], [X + 4.05 + i * 4.1, 1.35], 3, { off: 4 }));
      nd(S, 'iv', X, 3.2, 12.0, ['변경 알림(pub/sub)으로 각 서버의 L1 무효화', 'pub/sub messages invalidate each server’s L1'], 'danger', 4, { h: .9 }); lbl(S, 'n4', X, 6.6, ['TTL에 무작위 지터를 더해 동시 만료를 피해요', 'add jitter to TTLs to avoid mass expiry'], 'a', 4, { w: 12 });
    },
    notes: [['write-through는 DB에 쓸 때 캐시도 함께 갱신해서 읽기가 항상 최신이에요 · 쓰기는 조금 느려져요', 'write-through updates the cache alongside the database, keeping reads fresh at the cost of slower writes'], ['write-behind는 캐시에 먼저 쓰고 DB 반영은 모아서 나중에 해서 빠르지만, 반영 전에 캐시가 죽으면 데이터를 잃을 수 있어요', 'write-behind writes to the cache first and flushes to the database in batches later, fast but lossy if the cache dies first'], ['프로세스 메모리(L1) → Redis(L2) → DB 순으로 가까운 층부터 찾으면 뜨거운 키는 마이크로초 단위로 응답해요', 'checking process memory (L1), then Redis (L2), then the database answers hot keys in microseconds'], ['서버마다 있는 L1은 변경 알림(pub/sub)으로 함께 무효화하고, TTL에 무작위 지터를 더해 한꺼번에 만료되는 걸 피해요', 'per-server L1 caches are invalidated together via pub/sub, and random jitter on TTLs avoids mass expiry']],
    fin: [['캐시 전략: 읽기(어사이드)·쓰기(through·behind·around)·계층(L1·L2)을 데이터의 신선도 요구에 맞게 골라요', 'cache strategies pick read (aside), write (through, behind, around) and layering (L1, L2) by how fresh data must be', 'bex-xs bex-a'], ['캐시는 원본이 아니에요 · 사라져도 동작해야 해요', 'a cache is not the source of truth; things must work without it'], ['적중률과 지연을 지표로 봐요', 'track hit rate and latency']],
    caps: [['write-through', 'Write-through'], ['write-behind', 'Write-behind'], ['다층 캐시', 'Layered caches'], ['무효화와 지터', 'Invalidation and jitter'], ['캐시 전략', 'Cache strategies']]
  });
}

function sRedis() {
  return CW('be-redis', {
    code: [['INCR rate:user:7        // 카운터 · 속도 제한', 'INCR rate:user:7        // counter, rate limit'], 'EXPIRE rate:user:7 60', ['ZADD board 980 kim      // 정렬 집합: 순위표', 'ZADD board 980 kim      // leaderboard'], 'ZREVRANGE board 0 9 WITHSCORES', ['SET lock:42 me NX PX 5000   // 잠금', 'SET lock:42 me NX PX 5000   // lock'], ["SETEX sess:abc 3600 '{…}'   // 세션", "SETEX sess:abc 3600 '{…}'   // session"], ['XADD jobs * type email     // 스트림 큐', 'XADD jobs * type email     // stream queue']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ct', X, .8, 3.6, 'rate:user:7', 'line', 1, { h: 1.0 }); chip(S, 'cv', X + 4.0, .8, 1.6, '58', 'accent', 1, { h: 1.0 }); lbl(S, 'cl', X + 6.0, .95, ['원자적 증가 · 60초 뒤 소멸', 'atomic, expires in 60 s'], 'm', 1);
      lbl(S, 'n1', X, 6.6, ['명령 하나하나가 원자적 · 단일 스레드 실행', 'each command is atomic, run single-threaded'], 'a', 1, { off: 2, w: 12 });
      [['kim', 980], ['lee', 920], ['park', 870]].forEach(([n, s], i) => { lbl(S, 'rk' + i, X, 2.2 + i * .8, (i + 1) + '. ' + n, 'm', 2); sw(S, 'rb' + i, X + 3.0, 2.3 + i * .8, s / 140, .45, 'var(--ok)', 2, { css: 'z-index:3' }); lbl(S, 'rs' + i, X + 3.3 + s / 140, 2.2 + i * .8, '' + s, 'm g', 2); });
      lbl(S, 'n2', X, 6.6, ['점수로 정렬된 집합 → 순위표가 한 줄', 'sorted sets make leaderboards one command'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'lk', X, 4.8, 5.6, 'lock:42 = me', 'warn', 3, { h: .9 }); lbl(S, 'lkl', X, 5.85, ['NX: 없을 때만 · PX: 자동 만료', 'NX: if absent · PX: auto-expire'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['간단한 잠금·세션 저장에도 · 만료 시간 필수', 'simple locks and sessions too; always set expiry'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['메모리 저장소 · 영속화는 옵션 → 원본 DB로는 신중히', 'in-memory with optional persistence; be careful as a primary DB'], 'r', 4, { w: 12 });
    },
    notes: [['Redis는 메모리 기반 키-값 저장소예요 · INCR와 EXPIRE로 원자적 카운터를 만들어 API 속도 제한에 써요', 'Redis is an in-memory key-value store, and INCR with EXPIRE makes atomic counters for API rate limiting'], ['정렬 집합(ZADD, ZREVRANGE)은 점수로 정렬된 상태를 유지해서 순위표를 명령 한 줄로 만들어요', 'sorted sets (ZADD, ZREVRANGE) stay ordered by score, turning leaderboards into a single command'], ['SET NX PX로 “없을 때만, 자동 만료”를 걸면 간단한 분산 잠금이 되고, SETEX로 세션을 만료 시간과 함께 저장해요', 'SET NX PX, meaning only if absent with auto-expiry, makes a simple distributed lock, and SETEX stores sessions with expiry'], ['스트림(XADD)으로 작업 큐도 만들 수 있어요 · 다만 메모리 저장소라 영속화 설정 없이 유일한 원본 데이터를 맡기면 위험해요', 'streams (XADD) can back job queues too, but as an in-memory store it is risky as the only copy of data without persistence settings']],
    fin: [['Redis 활용: 캐시를 넘어 카운터·순위표·잠금·세션·큐까지 · 자료구조를 고르는 게 핵심', 'Redis goes beyond caching to counters, leaderboards, locks, sessions and queues, and choosing the right data structure is key', 'bex-xs bex-a'], ['모든 키에 만료 시간을 두는 습관', 'make expiry a habit for every key'], ['큰 키·KEYS 명령은 전체를 멈춰요', 'huge keys and KEYS commands stall everything']],
    caps: [['카운터', 'Counters'], ['정렬 집합', 'Sorted sets'], ['잠금과 세션', 'Locks and sessions'], ['한계', 'Limits'], ['Redis 활용', 'Using Redis']]
  });
}

function sSoftDelete() {
  return CW('be-soft-delete', {
    code: ['ALTER TABLE posts ADD deleted_at timestamptz;', 'UPDATE posts SET deleted_at = now()', '  WHERE id = 7;', 'SELECT * FROM posts WHERE deleted_at IS NULL;', ['-- 고유 제약은 부분 인덱스로', '-- unique constraints via partial indexes'], 'CREATE UNIQUE INDEX ON users (email)', '  WHERE deleted_at IS NULL;'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 3, 'warn'], [1, 2]],
    draw: (S) => {
      const X = 19.4;
      [['#5', '…', 0], ['#6', '…', 0], ['#7', '2026-11-10', 1], ['#8', '…', 0]].forEach(([a, b, d], i) => { nd(S, 'r' + i, X, .8 + i * 1.1, 3.0, a, 'line', 0, { h: .9 }); if (d) { chip(S, 'dd', X + 3.4, .8 + i * 1.1, 4.4, b, 'danger', 1, { h: .9 }); } });
      S.set('r2', 1, { opacity: '.4' }); S.set('r2', 0, { opacity: '1' });
      lbl(S, 'n1', X, 6.6, ['지우지 않고 “지운 시각”만 표시', 'mark the deletion time instead of deleting'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['모든 조회에 deleted_at IS NULL 조건 필요', 'every query needs deleted_at IS NULL'], 'g', 2, { off: 3, w: 12 }); lbl(S, 'rv', X + 8.2, 3.05, ['복구 가능', 'restorable'], 'm g', 2, { off: 3 });
      lbl(S, 'n3', X, 6.6, ['지운 계정의 이메일로 재가입 → 부분 인덱스로 허용', 'partial indexes allow re-signup with a deleted email'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'au', X, 5.2, 12.0, 'audit_log: who · what · when', 'accent', 4, { h: .9 }); lbl(S, 'n4', X, 6.6, ['감사 로그 · 법적 삭제 요청엔 진짜 삭제', 'audit logs; honor legal erasure with hard deletes'], 'a', 4, { w: 12 });
    },
    notes: [['소프트 삭제는 행을 지우지 않고 deleted_at에 삭제 시각만 기록해요 · 실수로 지운 데이터를 복구할 수 있어요', 'soft deletion keeps the row and records the deletion time in deleted_at, so accidental deletions can be restored'], ['대신 모든 조회에 deleted_at IS NULL 조건을 빠짐없이 붙여야 해요 · ORM의 전역 필터나 뷰로 강제해요', 'every query must then add deleted_at IS NULL, enforced with ORM global filters or views'], ['지운 계정과 같은 이메일로 다시 가입하면 고유 제약에 걸리니, 살아 있는 행에만 적용되는 부분 인덱스를 써요', 're-signing up with a deleted account’s email hits the unique constraint, so use a partial index covering only live rows'], ['누가 언제 무엇을 바꿨는지는 감사 로그로 남기고, 개인정보 삭제 요청처럼 법적으로 지워야 할 땐 진짜 삭제해요', 'audit logs record who changed what and when, while legal erasure requests such as personal data deletion require hard deletes']],
    fin: [['소프트 삭제와 감사 로그: 복구 가능성과 이력 추적을 얻는 대신 조회 조건·고유 제약·저장 공간을 관리해야 해요', 'soft deletes and audit logs buy recoverability and history at the cost of managing query filters, unique constraints and storage', 'bex-xs bex-a'], ['오래 지난 삭제 행은 주기적으로 정리(아카이브)해요', 'periodically archive long-deleted rows'], ['연관 데이터의 삭제 정책도 함께 정해요', 'decide deletion policy for related data too']],
    caps: [['지운 시각 표시', 'Marking deletion time'], ['조회 조건', 'Query filters'], ['고유 제약', 'Unique constraints'], ['감사 로그', 'Audit logs'], ['소프트 삭제와 감사', 'Soft deletes and audits']]
  });
}

function sMultitenancy() {
  return CW('be-multitenancy', {
    code: [['-- ① 공유 테이블 + tenant_id', '-- ① shared tables + tenant_id'], 'SELECT * FROM orders WHERE tenant_id = $1;', ['-- 행 수준 보안(RLS)으로 DB가 강제', '-- row-level security enforced by the DB'], 'CREATE POLICY iso ON orders USING', '  (tenant_id = app_tenant());', ['-- ② 테넌트별 스키마  ③ 테넌트별 DB', '-- ② schema per tenant  ③ DB per tenant']],
    hl: [[0, 2], [2, 3, 'ok'], [5, 1, 'warn'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      sw(S, 'tb', X, .8, 12.0, 3.2, tint('line', 15), 1, { off: 3, r: .3 }); [['A', 'accent'], ['B', 'ok'], ['A', 'accent'], ['C', 'warn']].forEach(([t, c], i) => chip(S, 'row' + i, X + .3, 1.0 + i * .72, 11.4, ['tenant ', 'tenant '].map(s => s + t), c, 1, { off: 3, h: .6, css: 'z-index:3' }));
      lbl(S, 'n1', X, 6.6, ['모든 테넌트가 한 테이블 · 저렴하지만 WHERE 하나 빠지면 유출', 'one table for all: cheap, but one missing WHERE leaks data'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['RLS: 앱이 깜빡해도 DB가 다른 테넌트 행을 숨겨요', 'RLS hides other tenants’ rows even if the app forgets'], 'g', 2, { off: 3, w: 12 });
      [['shared', 1], ['schema', 2], ['DB', 3]].forEach(([t, n], i) => { lbl(S, 'm' + i, X + i * 4.1, .8, t, 'm a', 3); for (let j = 0; j < 3; j++) sw(S, 'mb' + i + j, X + i * 4.1, 1.6 + j * .8, 3.6, .6, tint(['accent', 'ok', 'warn'][j], n === 1 ? 20 : 45), 3, { css: n === 1 ? 'border:.06em solid var(--line)' : 'z-index:3' }); });
      lbl(S, 'c0', X, 4.2, ['비용 ↓', 'cost ↓'], 'm g', 3); lbl(S, 'c2', X + 8.2, 4.2, ['격리 ↑', 'isolation ↑'], 'm a', 3);
      lbl(S, 'n3', X, 6.6, ['격리 수준과 비용 사이에서 모델을 골라요', 'pick a model between isolation and cost'], 'w', 3, { w: 12 });
    },
    notes: [['가장 흔한 방식은 모든 테넌트가 같은 테이블을 쓰고 tenant_id로 구분하는 거예요 · 저렴하지만 WHERE 조건 하나만 빠져도 다른 회사 데이터가 새요', 'the most common approach shares tables across tenants, separated by tenant_id, cheap but one missing WHERE leaks another company’s data'], ['PostgreSQL의 행 수준 보안(RLS)은 연결에 설정한 테넌트의 행만 보이게 DB가 강제해서 앱의 실수를 막아 줘요', 'PostgreSQL row-level security makes the database show only rows of the tenant set on the connection, guarding against app mistakes'], ['테넌트별 스키마나 테넌트별 DB로 갈수록 격리와 맞춤화가 쉬워지지만 비용과 마이그레이션 관리 부담이 커져요', 'moving to schema-per-tenant or database-per-tenant improves isolation and customization but raises cost and migration overhead'], ['큰 고객만 전용 DB로 떼어내는 혼합 방식도 흔해요 · 한 테넌트가 자원을 독차지하는 noisy neighbor 문제도 함께 고려해요', 'hybrids that move only large customers to dedicated databases are common, and noisy neighbors hogging resources must be considered']],
    fin: [['멀티테넌시: 여러 고객이 한 시스템을 나눠 쓰는 구조 · 공유 테이블(+RLS) · 스키마 분리 · DB 분리 중 격리와 비용으로 선택', 'multitenancy lets many customers share one system, choosing shared tables with RLS, separate schemas or separate databases by isolation and cost', 'bex-xs bex-a'], ['테넌트 정보는 인증 토큰에서 꺼내 요청 문맥에 둬요', 'derive the tenant from the auth token into request context'], ['테넌트별 사용량 제한과 지표를 둬요', 'apply per-tenant quotas and metrics']],
    caps: [['공유 테이블', 'Shared tables'], ['행 수준 보안', 'Row-level security'], ['격리 모델 비교', 'Comparing isolation models'], ['혼합과 이웃 문제', 'Hybrids and noisy neighbors'], ['멀티테넌시', 'Multitenancy']]
  });
}
/* ===== Backend · 4. integration and background work ===== */
function sResilience() {
  return CW('be-resilience', {
    code: ['const call = () => pg.charge(req,', '  { signal: AbortSignal.timeout(2000) });', 'await breaker.fire(() =>', '  retry(call, { retries: 2, jitter: true }));', ['// 벌크헤드: 의존성마다 동시 호출 한도', '// bulkhead: a concurrency cap per dependency'], 'const pgSlots = pLimit(10);', ['// 폴백: 실패 시 캐시 · 기본값 · 나중에', '// fallback: cache, default, or later']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, L = [[['타임아웃', 'Timeout'], 'accent', 1], [['재시도 + 지터', 'Retry + jitter'], 'ok', 2], [['서킷 브레이커', 'Circuit breaker'], 'ok', 2], [['벌크헤드', 'Bulkhead'], 'warn', 3], [['폴백', 'Fallback'], 'line', 4]];
      L.forEach(([t, c, st], i) => nd(S, 'L' + i, X + i * .3, .8 + i * 1.05, 12.0 - i * .6, t, c, st, { h: .9 }));
      lbl(S, 'n1', X, 6.6, ['모든 외부 호출에 시간 상한부터', 'start with a time limit on every call'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['일시적 실패는 재시도 · 계속 실패하면 차단기를 내려요', 'retry transient failures; trip the breaker on persistent ones'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['결제사가 느려져도 다른 기능의 스레드는 지켜요', 'a slow provider cannot drain threads from other features'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['그래도 실패하면 우아하게: 캐시 · 기본값 · 대기열', 'fail gracefully: cached data, defaults or a queue'], 'a', 4, { w: 12 });
    },
    notes: [['외부 API 호출은 언제든 느려지거나 실패해요 · 첫 방어는 모든 호출에 타임아웃을 거는 거예요', 'external API calls can slow down or fail at any time, and the first defense is a timeout on every call'], ['일시적 실패는 지터를 넣은 지수 백오프로 재시도하고(멱등한 호출만), 계속 실패하면 서킷 브레이커가 호출을 잠시 막아 상대가 회복할 시간을 줘요', 'transient failures retry with jittered exponential backoff (idempotent calls only), and persistent failure trips a circuit breaker that pauses calls'], ['벌크헤드는 의존성마다 동시 호출 수를 제한해서 결제사가 느려져도 다른 기능이 쓸 스레드와 연결을 지켜요', 'bulkheads cap concurrent calls per dependency, so a slow payment provider cannot drain threads and connections from other features'], ['그래도 실패하면 캐시된 값, 기본값, “나중에 처리” 대기열 같은 폴백으로 기능을 줄여서라도 응답해요', 'when all else fails, fallbacks such as cached values, defaults or a “process later” queue keep responding in a degraded mode']],
    fin: [['회복 탄력성 패턴: 타임아웃 → 재시도 → 서킷 브레이커 → 벌크헤드 → 폴백을 겹겹이 쌓아 외부 장애가 번지지 않게 해요', 'resilience patterns stack timeouts, retries, circuit breakers, bulkheads and fallbacks so external failures do not spread', 'bex-xs bex-a'], ['재시도는 멱등한 호출에만 · 재시도 폭주 주의', 'retry only idempotent calls, and beware retry storms'], ['차단기 상태는 지표와 알림으로 봐요', 'watch breaker state in metrics and alerts']],
    caps: [['타임아웃', 'Timeouts'], ['재시도와 차단기', 'Retries and breakers'], ['벌크헤드', 'Bulkheads'], ['폴백', 'Fallbacks'], ['회복 탄력성 패턴', 'Resilience patterns']]
  });
}

function sPayment() {
  return CW('be-payment', {
    code: [['// 1. 주문 생성 (PENDING) + 금액 저장', '// 1. create order (PENDING), store amount'], ['// 2. 클라이언트: 결제창에서 인증', '// 2. client authenticates in the PG window'], ['// 3. 서버: 승인 요청 (금액 재검증!)', '// 3. server confirms (re-check the amount!)'], 'await pg.confirm({ paymentKey, orderId,', '  amount: order.amount });', ['// 4. 웹훅으로 최종 상태 확인', '// 4. confirm final state via webhook'], ['// 5. 매일 대사: 우리 DB vs PG 기록', '// 5. daily reconciliation: our DB vs PG']],
    hl: [[0, 2], [2, 3, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      ['PENDING', 'PAID', 'CANCELED'].forEach((t, i) => nd(S, 's' + i, X + i * 4.1, .8, 3.8, t, ['warn', 'ok', 'line'][i], i ? 3 : 1, { h: 1.0 })); arw(S, 'sa', [X + 3.85, 1.3], [X + 4.05, 1.3], 3); arw(S, 'sb', [X + 7.95, 1.3], [X + 8.15, 1.3], 3);
      lbl(S, 'n1', X, 6.6, ['금액은 서버가 정해 저장 · 클라이언트를 믿지 않아요', 'the server sets and stores the amount; never trust the client'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'tp', X, 2.4, 12.0, ['조작된 1,000원 ≠ 저장된 30,000원 → 거절', 'tampered 1,000 ≠ stored 30,000 → rejected'], 'danger', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.6, ['승인 직전에 금액을 다시 비교해요', 're-check the amount right before confirming'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['승인 응답이 끊겨도 웹훅·조회로 최종 상태 확정', 'webhooks or lookups settle the final state if replies drop'], 'g', 3, { off: 4, w: 12 });
      [['DB', 'PG'], ['30,000', '30,000'], ['12,000', '—']].forEach(([a, b], i) => { lbl(S, 'ra' + i, X, 2.6 + i * .8, a, 'm', 4); lbl(S, 'rb' + i, X + 4.0, 2.6 + i * .8, b, i === 2 ? 'm r' : 'm', 4); }); lbl(S, 'rx', X + 6.4, 4.2, ['불일치 → 조사', 'mismatch → investigate'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['매일 대사로 어긋난 건을 찾아 바로잡아요', 'daily reconciliation catches and fixes mismatches'], 'a', 4, { w: 12 });
    },
    notes: [['주문을 PENDING 상태로 만들고 결제할 금액을 서버가 정해 저장해요 · 클라이언트가 보낸 금액은 믿지 않아요', 'create the order as PENDING with the amount set and stored by the server, never trusting a client-sent amount'], ['결제창 인증 뒤 서버가 승인 API를 부를 때, 저장해 둔 금액과 결제 금액이 같은지 다시 확인해 조작을 막아요', 'after the client authenticates, the server re-checks that the payment amount matches the stored one before confirming, blocking tampering'], ['승인 응답이 네트워크에서 끊길 수 있으니 결제사의 웹훅이나 조회 API로 최종 상태를 확정하고 상태를 PAID로 바꿔요(멱등하게)', 'confirmation replies can drop, so settle the final state via the provider’s webhook or lookup API and move to PAID idempotently'], ['매일 우리 DB와 결제사 정산 기록을 대조(대사)해서 어긋난 건을 찾아 환불이나 상태 보정을 해요', 'daily reconciliation compares our database with the provider’s settlement records to find and fix mismatches with refunds or status corrections']],
    fin: [['결제 연동: 서버가 금액을 정하고, 승인 직전 재검증하고, 웹훅과 대사로 최종 상태를 맞추는 흐름', 'payment integration has the server set amounts, re-verify before confirming, and reconcile final state through webhooks and daily matching', 'bex-xs bex-a'], ['주문 상태는 상태 기계로 · 허용되지 않는 전이는 거부', 'model order status as a state machine and reject invalid transitions'], ['결제 요청에는 멱등 키를 써요', 'use idempotency keys on payment requests']],
    caps: [['서버가 정한 금액', 'Server-set amounts'], ['금액 재검증', 'Re-verifying amounts'], ['최종 상태 확정', 'Settling final state'], ['대사', 'Reconciliation'], ['결제 연동', 'Payment integration']]
  });
}

function sNotifications() {
  return CW('be-notifications', {
    code: ["await notify(user, 'order.shipped', { id });", ['// 1. 설정 확인: 채널 · 수신 동의 · 방해 금지', '// 1. prefs: channels, consent, quiet hours'], ['// 2. 템플릿 + 언어 → 메시지', '// 2. template + locale → message'], ['// 3. 채널별 큐: 이메일 · 푸시 · SMS', '// 3. per-channel queues: email, push, SMS'], ['// 4. 재시도 · 중복 방지 · 발송 기록', '// 4. retries, dedupe, delivery log']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ev', X, .8, 4.2, 'order.shipped', 'accent', 0, { h: 1.0 });
      chip(S, 'pf', X + 4.8, .8, 3.4, ['설정 확인', 'preferences'], 'line', 1, { h: 1.0 }); arw(S, 'a0', [X + 4.25, 1.3], [X + 4.75, 1.3], 1); lbl(S, 'q', X, 1.95, ['22시~8시 푸시 ✗', 'no push 22–8'], 'm r', 1);
      lbl(S, 'n1', X, 6.6, ['사용자가 원하는 채널·시간만 · 마케팅은 동의 필수', 'only the channels and hours users chose; consent for marketing'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'tp', X + 4.2, 2.2, 7.8, ['“주문하신 상품이 출발했어요”', '“Your order has shipped”'], 'ok', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['템플릿과 사용자 언어로 문구를 만들어요', 'messages come from templates in the user’s language'], 'g', 2, { off: 3, w: 12 });
      ['email', 'push', 'SMS'].forEach((t, i) => nd(S, 'c' + i, X + i * 4.1, 3.6, 3.8, t, 'warn', 3, { h: 1.0 })); lbl(S, 'n3', X, 6.6, ['채널별 큐 · 공급자 장애가 서로 번지지 않게', 'per-channel queues isolate provider outages'], 'w', 3, { off: 4, w: 12 });
      ['sent', 'delivered', 'opened'].forEach((t, i) => chip(S, 'st' + i, X + i * 4.1, 4.9, 3.8, t, 'line', 4, { h: .9 })); lbl(S, 'n4', X, 6.6, ['중복 키로 두 번 발송 방지 · 상태 기록', 'dedupe keys prevent double sends; track status'], 'a', 4, { w: 12 });
    },
    notes: [['알림은 업무 코드에서 notify(user, 이벤트, 데이터) 한 줄로 요청하고, 실제 발송은 알림 시스템이 맡아요 · 먼저 사용자의 채널 설정, 수신 동의, 방해 금지 시간을 확인해요', 'business code calls notify(user, event, data) once, and the notification system first checks channel preferences, consent and quiet hours'], ['템플릿과 사용자의 언어로 메시지를 만들어요 · 문구를 코드에서 분리하면 배포 없이 고칠 수 있어요', 'messages are rendered from templates in the user’s language, and keeping copy out of code allows edits without deploys'], ['이메일, 푸시, SMS를 채널별 큐로 나누면 한 공급자가 장애여도 다른 채널은 계속 나가요', 'separate queues per channel, email, push and SMS, keep one provider’s outage from blocking the others'], ['중복 방지 키로 같은 알림을 두 번 보내지 않고, 발송·도착·열람 상태를 기록해 문제를 추적해요', 'dedupe keys prevent double sends, and sent, delivered and opened states are logged for troubleshooting']],
    fin: [['알림 시스템: 이벤트 → 설정 확인 → 템플릿 → 채널별 큐 → 발송 기록으로 이어지는 공용 파이프라인', 'a notification system is a shared pipeline from events through preferences, templates and per-channel queues to delivery logs', 'bex-xs bex-a'], ['수신 거부 링크와 동의 기록은 법적 요구사항이에요', 'unsubscribe links and consent records are legal requirements'], ['비슷한 알림은 묶어서(다이제스트) 보내요', 'batch similar notifications into digests']],
    caps: [['설정 확인', 'Checking preferences'], ['템플릿', 'Templates'], ['채널별 큐', 'Per-channel queues'], ['기록과 중복 방지', 'Logs and dedupe'], ['알림 시스템', 'Notification systems']]
  });
}

function sDomainEvents() {
  return CW('be-domain-events', {
    code: [['order.markPaid();          // 상태 변경', 'order.markPaid();          // change state'], 'order.events.push(new OrderPaid(order.id));', ['await repo.save(order);    // 저장과 함께', 'await repo.save(order);    // save it'], ['await bus.publish(order.events);  // 그 뒤', 'await bus.publish(order.events);  // then'], '@On(OrderPaid) sendReceipt(e) {…}', '@On(OrderPaid) grantPoints(e) {…}', '@On(OrderPaid) notifyWarehouse(e) {…}'],
    hl: [[0, 2], [2, 2, 'ok'], [4, 3, 'warn'], [3, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'or', X, .8, 3.8, 'Order', 'accent', 1, { h: 1.1 }); chip(S, 'ev', X + 4.6, .9, 3.6, 'OrderPaid', 'warn', 1, { h: .9 });
      lbl(S, 'n1', X, 6.6, ['“일어난 일”을 과거형 이벤트로 남겨요', 'record what happened as a past-tense event'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['저장이 성공한 뒤에 발행 · 아웃박스로 보장', 'publish after saving; guarantee with an outbox'], 'g', 2, { off: 3, w: 12 });
      [['영수증', 'receipt'], ['포인트', 'points'], ['창고', 'warehouse']].forEach((t, i) => { nd(S, 'h' + i, X + i * 4.1, 3.2, 3.8, t, 'line', 3, { h: 1.0 }); arw(S, 'ha' + i, [X + 6.4, 2.0], [X + 1.9 + i * 4.1, 3.15], 3); });
      lbl(S, 'n3', X, 6.6, ['주문 코드는 후속 작업을 몰라요 · 추가도 쉬워요', 'order code is unaware of follow-ups, easy to extend'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['흐름이 흩어져 보이니 이벤트 목록을 문서화', 'flows scatter, so document the event catalog'], 'a', 4, { w: 12 }); lbl(S, 'n4b', X, 4.6, ['핸들러는 멱등하게 · 하나가 실패해도 다른 건 진행', 'idempotent handlers; one failure never blocks others'], 'm', 4, { w: 12 });
    },
    notes: [['도메인 이벤트는 “주문이 결제됐다”처럼 업무에서 일어난 일을 과거형 객체로 남긴 거예요', 'domain events record business facts such as “order paid” as past-tense objects'], ['상태를 저장하는 데 성공한 뒤에 이벤트를 발행해요 · 저장과 발행을 확실히 함께 하려면 아웃박스 패턴을 써요', 'events are published only after the state is saved, and the outbox pattern guarantees saving and publishing together'], ['영수증 발송, 포인트 적립, 창고 알림 같은 후속 작업은 각 핸들러가 구독해요 · 주문 코드는 이들을 몰라서 기능을 더해도 고칠 필요가 없어요', 'follow-ups such as receipts, points and warehouse alerts subscribe as handlers, so order code needs no changes when features are added'], ['대신 흐름이 여러 곳에 흩어져 보이니 이벤트 목록을 문서화하고, 핸들러는 재실행돼도 안전하게(멱등하게) 만들어요', 'in return, flows scatter across places, so document the event catalog and keep handlers safe to rerun (idempotent)']],
    fin: [['도메인 이벤트: 상태 변화를 사실로 발행하고 후속 작업을 느슨하게 연결하는 방식 · 서비스 간에는 메시지 브로커로 확장', 'domain events publish state changes as facts and loosely connect follow-up work, extending across services through a message broker', 'bex-xs bex-a'], ['이벤트 이름은 과거형으로(OrderPaid)', 'name events in the past tense (OrderPaid)'], ['이벤트 스키마도 버전을 관리해요', 'version event schemas too']],
    caps: [['이벤트 기록', 'Recording events'], ['저장 뒤 발행', 'Publishing after saving'], ['구독하는 핸들러', 'Subscribing handlers'], ['주의할 점', 'Caveats'], ['도메인 이벤트', 'Domain events']]
  });
}

function sBatchJobs() {
  return CW('be-batch-jobs', {
    code: ['for (let after = await loadCheckpoint(); ; ) {', '  const rows = await fetchBatch(after, 1000);', '  if (!rows.length) break;', ['  await processAll(rows);       // 멱등하게', '  await processAll(rows);       // idempotent'], '  after = rows.at(-1).id;', ['  await saveCheckpoint(after);  // 재시작 지점', '  await saveCheckpoint(after);  // resume'], ['  await sleep(200);             // DB 숨 돌리기', '  await sleep(200);             // throttle'], '}'],
    hl: [[1, 2], [3, 1, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      for (let i = 0; i < 10; i++) sw(S, 'b' + i, X + i * 1.2, .8, 1.0, 1.2, tint('line', 30), 0, { css: 'z-index:3' });
      lbl(S, 'tl', X, 4.3, ['1,000만 행 · 1,000개씩', '10M rows in chunks of 1,000'], 'm', 0);
      [0, 1, 2].forEach(i => tsets(S, 'b' + i, [[1, 'ok', 60]])); lbl(S, 'n1', X, 6.6, ['한 번에 다 읽지 않고 id 기준으로 묶음 처리', 'process in id-ordered chunks, not all at once'], 'a', 1, { off: 2, w: 12 });
      [3, 4].forEach(i => tsets(S, 'b' + i, [[2, 'ok', 60]])); chip(S, 'cp', X + 4.7, 2.9, 3.6, 'checkpoint', 'warn', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['묶음마다 진행 위치를 저장', 'save progress after every chunk'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'cr', X + 6.0, .1, 1.0, '✗', 'danger', 3, { off: 4, h: .6 }); arw(S, 'rs', [X + 6.5, 2.85], [X + 6.5, 2.1], 3, { off: 4, color: 'accent' }); lbl(S, 'n3', X, 6.6, ['중간에 죽어도 체크포인트부터 다시 · 멱등이라 겹쳐도 안전', 'crashes resume at the checkpoint; overlap is safe'], 'w', 3, { off: 4, w: 12 });
      for (let i = 5; i < 10; i++) tsets(S, 'b' + i, [[4, 'ok', 60]]); lbl(S, 'n4', X, 6.6, ['쉬어 가며 처리해 운영 DB 부하를 조절', 'pause between chunks to spare the production DB'], 'a', 4, { w: 12 });
    },
    notes: [['수백만 행을 한 번에 읽으면 메모리가 터지고 긴 트랜잭션이 DB를 붙잡아요 · id 순서로 1,000개씩 묶어 처리해요', 'reading millions of rows at once blows memory and holds long transactions, so process them in id-ordered chunks of 1,000'], ['묶음마다 마지막 id를 체크포인트로 저장해요 · OFFSET 대신 “이 id 다음부터”로 읽으면 뒤로 갈수록 느려지지 않아요', 'save the last id as a checkpoint after each chunk, and reading “after this id” instead of OFFSET never slows down further in'], ['중간에 죽어도 체크포인트부터 다시 시작해요 · 처리 로직이 멱등하면 일부가 두 번 처리돼도 결과가 같아요', 'after a crash, resume from the checkpoint, and idempotent processing makes partially repeated chunks harmless'], ['묶음 사이에 잠깐 쉬어 운영 DB의 부하와 복제 지연을 조절해요 · 진행률과 예상 종료 시간도 기록해요', 'short pauses between chunks limit load and replication lag on the production database, while progress and ETA are logged']],
    fin: [['배치 작업: 묶음 처리 + 체크포인트 + 멱등성 + 속도 조절로 큰 데이터를 안전하게 다뤄요', 'batch jobs handle large data safely with chunking, checkpoints, idempotency and throttling', 'bex-xs bex-a'], ['먼저 소량으로 시험 실행(dry run)해요', 'start with a small dry run'], ['읽기 전용 복제본에서 읽으면 운영 부하가 줄어요', 'reading from a replica eases load on the primary']],
    caps: [['묶음 처리', 'Chunking'], ['체크포인트', 'Checkpoints'], ['재시작', 'Resuming'], ['속도 조절', 'Throttling'], ['배치 작업', 'Batch jobs']]
  });
}

function sCronDist() {
  return CW('be-cron-distributed', {
    code: [['// 인스턴스 3대 → 크론도 3번 실행?!', '// 3 instances → the cron runs 3 times?!'], "const ok = await redis.set('lock:daily',", '  instanceId, { NX: true, PX: 10 * 60_000 });', ['if (!ok) return;   // 다른 인스턴스가 실행 중', 'if (!ok) return;   // another one is running'], 'await buildDailyReport();', ['// 대안: 스케줄러가 큐에 작업 1개만', '// alternative: scheduler enqueues one job']],
    hl: [[0, 1, 'danger'], [1, 3, 'ok'], [4, 1], [5, 1, 'warn']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      ['A', 'B', 'C'].forEach((t, i) => { nd(S, 'i' + i, X + i * 4.1, .8, 3.8, ['인스턴스 ', 'instance '].map(s => s + t), 'line', 0, { h: 1.0 }); chip(S, 'c' + i, X + i * 4.1 + .7, 2.1, 2.4, '03:00', 'accent', 0, { h: 1.0 }); });
      [0, 1, 2].forEach(i => chip(S, 'r' + i, X + i * 4.1 + .7, 3.4, 2.4, ['리포트', 'report'], 'danger', 1, { off: 2, h: 1.0 })); lbl(S, 'n1', X, 6.6, ['서버를 늘리면 정기 작업도 늘어난 수만큼 실행돼요', 'scaling out multiplies scheduled jobs too'], 'r', 1, { off: 2, w: 12 });
      chip(S, 'ok', X + .7, 3.4, 2.4, 'lock ✓', 'ok', 2, { h: 1.0 }); [1, 2].forEach(i => chip(S, 'sk' + i, X + i * 4.1 + .7, 3.4, 2.4, 'skip', 'line', 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['잠금을 얻은 하나만 실행 · 만료 시간으로 죽은 잠금 해제', 'only the lock holder runs; expiry frees dead locks'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['작업 자체도 멱등하게 · 두 번 돌아도 결과가 같게', 'make the job itself idempotent too'], 'a', 3, { off: 4, w: 12 });
      nd(S, 'sc', X, 4.8, 12.0, ['K8s CronJob · 큐 반복 작업 · 리더 선출', 'K8s CronJob · repeat jobs · leader election'], 'warn', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.6, ['실행 이력을 남겨 놓친 실행도 확인', 'log runs to spot missed executions'], 'w', 4, { w: 12 });
    },
    notes: [['앱 안의 cron은 인스턴스마다 돌아서, 서버를 3대로 늘리면 매일 리포트도 3번 만들어지고 메일도 3번 나가요', 'in-app crons run on every instance, so three servers build the daily report and send its email three times'], ['실행 전에 Redis SET NX로 잠금을 얻은 인스턴스 하나만 실행하고, 나머지는 건너뛰어요 · 만료 시간을 두어 실행 중 죽어도 잠금이 풀려요', 'acquiring a Redis SET NX lock first lets one instance run while others skip, and an expiry frees the lock if the holder dies'], ['잠금이 만료된 뒤 겹쳐 실행될 수도 있으니 작업 자체도 멱등하게 만들어 두 번 돌아도 결과가 같게 해요', 'overlap is possible after a lock expires, so make the job idempotent so running twice yields the same result'], ['쿠버네티스 CronJob, 큐의 반복 작업처럼 실행을 한 곳에서 정하는 방식도 좋아요 · 실행 이력을 남겨 놓친 실행을 찾아요', 'centralizing schedules with Kubernetes CronJobs or repeatable queue jobs also works, with run history logged to catch missed runs']],
    fin: [['분산 환경의 정기 작업: 여러 인스턴스 중 하나만 실행되도록 잠금·리더 선출·중앙 스케줄러를 쓰고, 작업은 멱등하게', 'scheduled jobs in distributed systems use locks, leader election or a central scheduler so one instance runs, with idempotent jobs', 'bex-xs bex-a'], ['시간대(타임존)와 서머타임을 명확히 해요', 'be explicit about time zones and DST'], ['오래 걸리면 잠금 시간을 연장해요', 'extend the lock for long runs']],
    caps: [['중복 실행', 'Duplicate runs'], ['잠금으로 하나만', 'One runner via locks'], ['멱등한 작업', 'Idempotent jobs'], ['중앙 스케줄러', 'Central schedulers'], ['분산 정기 작업', 'Distributed scheduled jobs']]
  });
}
/* ===== Backend · 5. operations and performance ===== */
function sLoadTest() {
  return CW('be-load-testing', {
    code: ['export const options = {', "  stages: [{ duration: '2m', target: 200 },", "           { duration: '5m', target: 200 }],", '  thresholds: {', "    http_req_duration: ['p(95)<300'] },", '};', 'export default () => http.get(`${B}/orders`);'],
    hl: [[1, 2], [3, 2, 'ok'], [6, 1, 'warn'], [0, 6]],
    draw: (S) => {
      const X = 19.4, B = 5.2;
      hl(S, 'xa', X, X + 12.0, B, 'ink-3', 0, { w: .06 }); vl(S, 'ya', X, .6, B, 'ink-3', 0, { w: .06 }); lbl(S, 'xl', X + 9.0, B + .2, ['동시 사용자 →', 'users →'], 'm', 0);
      const rps = [[0, 4.6], [2, 3.6], [4, 2.6], [6, 1.9], [8, 1.6], [10, 1.5], [12, 1.5]], lat = [[0, 4.8], [2, 4.8], [4, 4.7], [6, 4.6], [8, 4.2], [10, 2.6], [12, 1.0]];
      rps.slice(1).forEach((p, i) => seg(S, 'r' + i, [X + rps[i][0], rps[i][1]], [X + p[0], p[1]], 1, 'ok', .1)); lbl(S, 'rl', X + .3, .6, 'RPS', 'm g', 1);
      lbl(S, 'n1', X, 6.6, ['사용자를 서서히 늘리며 처리량을 봐요', 'ramp users up and watch throughput'], 'a', 1, { off: 2, w: 12 });
      lat.slice(1).forEach((p, i) => seg(S, 'l' + i, [X + lat[i][0], lat[i][1]], [X + p[0], p[1]], 2, 'danger', .1)); lbl(S, 'll', X + 10.0, .7, 'p95', 'm r', 2);
      lbl(S, 'n2', X, 6.6, ['p95 지연이 기준(300ms)을 넘으면 실패', 'fail when p95 latency exceeds 300 ms'], 'r', 2, { off: 3, w: 12 });
      vl(S, 'kn', X + 8.0, .6, B, 'warn', 3, { w: .1, dash: 1 }); lbl(S, 'knl', X + 8.3, 4.5, ['포화 지점', 'saturation'], 'm w', 3); lbl(S, 'n3', X, 6.6, ['처리량은 멈추고 지연만 치솟는 무릎을 찾아요', 'find the knee where throughput stalls and latency soars'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['운영과 비슷한 환경 · 실제 같은 시나리오로', 'use production-like setups and realistic scenarios'], 'a', 4, { w: 12 });
    },
    notes: [['k6 같은 도구로 가상 사용자를 2분 동안 200명까지 늘리고 5분 유지하며 처리량(RPS)을 재요', 'tools such as k6 ramp virtual users to 200 over 2 minutes, hold for 5, and measure throughput (RPS)'], ['thresholds로 “p95 지연 300ms 미만” 같은 기준을 정해 넘으면 테스트가 실패하게 하고, CI에도 넣을 수 있어요', 'thresholds such as “p95 under 300 ms” make the test fail when exceeded, which can also run in CI'], ['부하를 올리다 보면 처리량은 더 오르지 않고 지연만 치솟는 포화 지점(무릎)이 나와요 · 그 원인이 병목이에요', 'as load rises, a saturation point (the knee) appears where throughput stops growing and latency soars, revealing the bottleneck'], ['결과가 의미 있으려면 운영과 비슷한 데이터·인프라에서, 실제 사용자 흐름을 닮은 시나리오로 돌려야 해요', 'meaningful results need production-like data and infrastructure and scenarios resembling real user flows']],
    fin: [['부하 테스트: 처리량과 지연의 한계, 병목을 출시 전에 숫자로 확인해요', 'load testing confirms throughput and latency limits and bottlenecks in numbers before launch', 'bex-xs bex-a'], ['스파이크 · 장시간(soak) 테스트도 따로 해요', 'run spike and soak tests separately'], ['테스트 중 서버 지표를 함께 봐야 원인을 찾아요', 'watch server metrics during tests to find causes']],
    caps: [['처리량', 'Throughput'], ['지연 기준', 'Latency thresholds'], ['포화 지점', 'The saturation point'], ['현실적인 환경', 'Realistic environments'], ['부하 테스트', 'Load testing']]
  });
}

function sProfiling() {
  return CW('be-profiling', {
    code: [['node --cpu-prof server.js   # CPU 프로파일', 'node --cpu-prof server.js   # CPU profile'], ['0x server.js                # 플레임 그래프', '0x server.js                # flame graph'], 'go tool pprof cpu.pprof     # Go', ['// 넓은 막대 = CPU를 오래 쓴 함수', '// wide bars = functions using most CPU'], ['// 측정 먼저, 최적화는 그다음', '// measure first, then optimize']],
    hl: [[0, 3], [3, 1, 'ok'], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, F = [[0, 0, 12, 'main', 'line'], [1, 0, 12, 'handleRequest', 'line'], [2, 0, 3, 'auth', 'accent'], [2, 3, 9, 'buildReport', 'warn'], [3, 3, 8.4, 'JSON.stringify', 'danger'], [3, 8.4, 9, '', 'ok'], [2, 9, 12, 'db', 'ok']];
      F.forEach(([lv, a, b, t, c], i) => { if (b - a < .7) { sw(S, 'f' + i, X + a, 4.4 - lv * 1.0, b - a, .9, tint(c, 40), 1, { css: 'z-index:3' }); return; } nd(S, 'f' + i, X + a, 4.4 - lv * 1.0, b - a, t, c, 1, { h: .9 }); });
      lbl(S, 'n1', X, 6.6, ['아래가 호출한 쪽, 위가 불린 함수 · 너비 = CPU 시간', 'callers below, callees above; width = CPU time'], 'a', 1, { off: 2, w: 12 });
      frame(S, 'hot', X + 2.9, 1.3, 5.6, 1.1, 'danger', 2, { off: 4, w: .14 }); lbl(S, 'n2', X, 6.6, ['가장 넓은 꼭대기 = 진짜 병목 (큰 JSON 직렬화)', 'the widest top is the real hotspot (big JSON)'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['짐작한 곳이 아니라 측정한 곳을 고쳐요', 'fix what measurements show, not what you guess'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['고친 뒤 다시 측정해 비교 · 운영은 샘플링 프로파일러', 'remeasure after fixing; sample continuously in production'], 'a', 4, { w: 12 });
    },
    notes: [['느린 원인을 짐작으로 고치면 엉뚱한 곳을 최적화하기 쉬워요 · --cpu-prof나 pprof로 실제 CPU 사용을 기록해요', 'guessing at slowness often optimizes the wrong thing, so record real CPU usage with --cpu-prof or pprof'], ['플레임 그래프는 아래가 호출한 함수, 위가 불린 함수이고 막대 너비가 CPU를 쓴 시간이에요', 'in a flame graph, callers sit below and callees above, with bar width showing CPU time'], ['가장 넓은 꼭대기 막대가 진짜 병목이에요 · 이 예에선 큰 객체를 JSON으로 바꾸는 데 시간을 다 써요', 'the widest top bar is the real hotspot, here spending most time serializing a large object to JSON'], ['고친 뒤 같은 조건으로 다시 측정해 비교해요 · 운영에선 부담이 적은 상시 샘플링 프로파일러를 써요', 'after fixing, remeasure under the same conditions, and use low-overhead continuous sampling profilers in production']],
    fin: [['프로파일링: 측정 → 가장 넓은 병목 찾기 → 고치기 → 다시 측정의 반복', 'profiling repeats measure, find the widest hotspot, fix and remeasure', 'bex-xs bex-a'], ['CPU 외에 메모리 할당·잠금 대기도 프로파일해요', 'profile memory allocation and lock waits as well as CPU'], ['대부분 시간은 I/O 대기 · 그건 트레이스로 봐요', 'much time is I/O waiting, which traces reveal']],
    caps: [['프로파일 기록', 'Recording profiles'], ['플레임 그래프 읽기', 'Reading flame graphs'], ['측정한 곳 고치기', 'Fixing what you measure'], ['다시 측정', 'Remeasuring'], ['프로파일링', 'Profiling']]
  });
}

function sOtel() {
  return CW('be-otel', {
    code: ["const span = tracer.startSpan('checkout');", "span.setAttribute('order.id', id);", 'try { await pay(); }', 'catch (e) { span.recordException(e); throw e }', 'finally { span.end(); }', "log.info({ trace_id, order_id: id }, 'paid');", ['// traceparent 헤더로 서비스 간 전파', '// propagated via the traceparent header']],
    hl: [[0, 2], [2, 3, 'warn'], [5, 1, 'ok'], [6, 1]],
    draw: (S) => {
      const X = 19.4, Sp = [[0, 0, 11, 'checkout', 'accent', 1], [1, .5, 3.5, 'auth', 'line', 1], [1, 3.8, 9.5, 'pay', 'warn', 1], [2, 4.2, 9.0, 'PG API', 'danger', 4], [1, 9.6, 10.8, 'db', 'ok', 1]];
      Sp.forEach(([lv, a, b, t, c, st], i) => nd(S, 'sp' + i, X + a, .8 + lv * 1.1, b - a, t, c, st, { h: .9 }));
      lbl(S, 'n1', X, 6.6, ['스팬: 작업 하나의 시작·끝·속성 · 중첩되어 트레이스', 'spans record start, end and attributes, nesting into traces'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'ex', X + 3.6, 3.2, 6.6, 'exception: timeout', 'danger', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.6, ['예외도 스팬에 기록 · 어디서 실패했는지 보여요', 'exceptions land on spans, showing where it failed'], 'r', 2, { off: 3, w: 12 });
      nd(S, 'lg', X, 4.4, 12.0, '{"msg":"paid","trace_id":"4bf9…"}', 'ok', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['로그에 trace_id → 트레이스와 로그를 오가며 추적', 'trace_id in logs links them to traces'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'tp', X, 5.6, 'traceparent: 00-4bf9…', 'm a', 4); lbl(S, 'n4', X, 6.6, ['다른 서비스 호출에도 같은 trace_id가 이어져요', 'the same trace_id continues into other services'], 'a', 4, { w: 12 });
    },
    notes: [['OpenTelemetry로 checkout 같은 작업을 스팬으로 감싸면 시작·끝 시간과 주문 id 같은 속성이 기록되고, 안쪽 작업은 자식 스팬으로 중첩돼요', 'wrapping work such as checkout in an OpenTelemetry span records its start, end and attributes such as the order id, with inner work nesting as child spans'], ['예외를 recordException으로 스팬에 남기면 트레이스 화면에서 어느 단계가 실패했는지 바로 보여요', 'recordException attaches errors to spans, so traces show exactly which step failed'], ['구조화 로그에 trace_id를 함께 남기면 느린 트레이스에서 관련 로그로, 로그에서 트레이스로 오갈 수 있어요', 'logging the trace_id in structured logs lets you jump between slow traces and their logs'], ['다른 서비스를 호출할 때 traceparent 헤더로 trace_id가 전파돼 여러 서비스에 걸친 요청이 한 트레이스로 이어져요 · HTTP와 DB는 자동 계측도 돼요', 'the traceparent header carries the trace_id to other services, joining them into one trace, and HTTP and DB calls can be auto-instrumented']],
    fin: [['코드 계측(OpenTelemetry): 스팬 · 속성 · 예외 · 로그 연결로 운영 중인 요청을 따라가요 · 벤더 중립 표준', 'instrumenting code with OpenTelemetry, a vendor-neutral standard, follows production requests through spans, attributes, exceptions and linked logs', 'bex-xs bex-a'], ['속성에 개인정보를 넣지 않아요', 'keep personal data out of attributes'], ['샘플링으로 비용을 조절해요', 'control cost with sampling']],
    caps: [['스팬', 'Spans'], ['예외 기록', 'Recording exceptions'], ['로그 연결', 'Linking logs'], ['서비스 간 전파', 'Cross-service propagation'], ['코드 계측', 'Instrumenting code']]
  });
}

function sMemLeak() {
  return CW('be-memory-leak', {
    code: [['const cache = new Map();     // ✗ 끝없이 커짐', 'const cache = new Map();     // ✗ unbounded'], "app.get('/u/:id', (req) => {", '  cache.set(req.params.id, load());', '});', ['// ✓ 크기 제한 · TTL (LRU)', '// ✓ bounded with TTL (LRU)'], 'const lru = new LRU({ max: 1e4, ttl: 6e4 });', ['// 힙 스냅숏 2개를 비교해 늘어난 객체 찾기', '// diff two heap snapshots to find growth']],
    hl: [[0, 4, 'danger'], [6, 1], [4, 2, 'ok'], [0, 1]],
    draw: (S) => {
      const X = 19.4, B = 4.8, up = [[0, 4.4], [1.5, 3.8], [1.6, 4.2], [3.5, 3.4], [3.6, 3.9], [5.5, 3.0], [5.6, 3.5], [7.5, 2.5], [7.6, 3.1], [9.5, 2.0], [9.6, 2.6], [11.5, 1.4]];
      hl(S, 'xa', X, X + 12.0, B, 'ink-3', 0, { w: .06 }); lbl(S, 'xl', X + 9.6, .4, ['시간 →', 'time →'], 'm', 0); lbl(S, 'yl', X, .4, ['힙 메모리', 'heap'], 'm', 0);
      up.slice(1).forEach((p, i) => seg(S, 'u' + i, [X + up[i][0], up[i][1]], [X + p[0], p[1]], 1, 'danger', .1, { off: 3 })); const fl = [[0, 4.4], [1.5, 3.6], [1.6, 4.3], [3.5, 3.6], [3.6, 4.3], [5.5, 3.6], [5.6, 4.3], [7.5, 3.6], [7.6, 4.3], [9.5, 3.6], [9.6, 4.3], [11.5, 3.6]]; fl.slice(1).forEach((p, i) => seg(S, 'g' + i, [X + fl[i][0], fl[i][1]], [X + p[0], p[1]], 3, 'ok', .1)); lbl(S, 'n1', X, 6.6, ['GC 후에도 바닥이 계속 올라가면 누수', 'a floor that keeps rising after GC means a leak'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'hs', X, 5.3, 12.0, 'Map +48,210 · listeners +1,200', 'warn', 2, { off: 3, h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['스냅숏 비교: 무엇이 계속 늘어나는지', 'snapshot diffs show what keeps growing'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['상한과 만료가 있는 캐시로 바꿔요', 'switch to a cache with bounds and expiry'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['흔한 원인: 무한 캐시 · 지우지 않은 리스너 · 전역 배열', 'usual suspects: unbounded caches, lingering listeners, globals'], 'a', 4, { w: 12 });
    },
    notes: [['요청마다 Map에 넣기만 하고 지우지 않으면 서버가 오래 돌수록 메모리가 끝없이 늘어나요', 'adding to a Map on every request without removing entries makes memory grow without bound the longer the server runs'], ['메모리 그래프는 GC 때마다 톱니처럼 내려가는데, 내려간 바닥이 계속 올라가면 누수예요 · 시간 차를 두고 힙 스냅숏 두 개를 떠서 비교하면 무엇이 늘었는지 보여요', 'memory saws down at each GC, and a rising floor signals a leak; comparing two heap snapshots taken apart shows what grew'], ['캐시는 최대 개수와 만료 시간이 있는 LRU로 바꿔 상한을 둬요', 'replace caches with an LRU that has a maximum size and TTL to bound them'], ['흔한 원인은 상한 없는 캐시, 제거하지 않은 이벤트 리스너와 타이머, 요청 데이터를 붙잡는 전역 변수와 클로저예요', 'common causes are unbounded caches, event listeners and timers never removed, and globals or closures holding request data']],
    fin: [['메모리 누수 찾기: GC 후 바닥 추세 관찰 → 힙 스냅숏 비교 → 붙잡고 있는 참조 제거', 'finding memory leaks means watching the post-GC floor, diffing heap snapshots and removing the references that hold on', 'bex-xs bex-a'], ['메모리 사용량에 알림을 걸어 재시작 전에 알아채요', 'alert on memory usage to notice before restarts'], ['WeakMap은 키가 사라지면 함께 정리돼요', 'WeakMap entries vanish with their keys']],
    caps: [['계속 커지는 메모리', 'Ever-growing memory'], ['힙 스냅숏 비교', 'Diffing heap snapshots'], ['상한 있는 캐시', 'Bounded caches'], ['흔한 원인', 'Usual suspects'], ['메모리 누수 찾기', 'Finding memory leaks']]
  });
}

function sSlowQuery() {
  return CW('be-slow-query', {
    code: [['-- 누적 시간이 큰 쿼리 순 (PostgreSQL)', '-- queries by total time (PostgreSQL)'], 'SELECT query, calls, mean_exec_time,', '       total_exec_time', 'FROM pg_stat_statements', 'ORDER BY total_exec_time DESC LIMIT 5;', ['-- 느린 쿼리 로그: log_min_duration_statement', '-- slow log: log_min_duration_statement']],
    hl: [[0, 5], [4, 1, 'ok'], [5, 1, 'warn'], [1, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, R = [['orders by user_id', '2ms', '1.2M', 'danger'], ['monthly report', '4s', '20', 'warn'], ['stock update', '1ms', '90k', 'ok']];
      lbl(S, 'h0', X, .6, 'query', 'm', 0); lbl(S, 'h1', X + 7.0, .6, 'mean', 'm', 0); lbl(S, 'h2', X + 9.4, .6, 'calls', 'm', 0);
      R.forEach(([q, m, c, col], i) => { lbl(S, 'q' + i, X, 1.4 + i * .9, q, 'm', 0); lbl(S, 'm' + i, X + 7.0, 1.4 + i * .9, m, 'm', 0); lbl(S, 'c' + i, X + 9.4, 1.4 + i * .9, c, 'm', 0); });
      lbl(S, 'n1', X, 6.6, ['쿼리별 호출 수와 평균·누적 시간을 모아 봐요', 'gather calls and mean and total time per query'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'b0', X, 4.4, 12.0 * .85, .5, 'var(--danger)', 2, { css: 'z-index:3' }); sw(S, 'b1', X, 5.0, 12.0 * .03, .5, 'var(--warn)', 2, { css: 'z-index:3' }); lbl(S, 'bl', X + 10.4, 4.3, ['누적', 'total'], 'm', 2);
      lbl(S, 'n2', X, 6.6, ['빠르지만 백만 번 = 가장 큰 부담일 수 있어요', 'fast but called a million times can cost the most'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['찾은 쿼리는 EXPLAIN ANALYZE로 계획 확인 → 인덱스', 'inspect with EXPLAIN ANALYZE, then index'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['고친 뒤 통계를 초기화하고 다시 비교', 'reset stats after fixing and compare again'], 'a', 4, { w: 12 });
    },
    notes: [['pg_stat_statements는 같은 모양의 쿼리를 묶어 호출 수, 평균 시간, 누적 시간을 모아 줘요 · 느린 쿼리 로그는 기준 시간을 넘는 쿼리를 남겨요', 'pg_stat_statements groups queries by shape and tracks calls, mean time and total time, while the slow query log records queries over a threshold'], ['한 번에 2ms인 쿼리도 120만 번 불리면 4초짜리 리포트 쿼리보다 DB를 훨씬 많이 써요 · 누적 시간 순으로 봐야 해요', 'a 2 ms query called 1.2 million times costs far more than a 4-second report query, so sort by total time'], ['범인을 찾으면 EXPLAIN ANALYZE로 실제 실행 계획을 보고 인덱스, 쿼리 수정, 캐시, 호출 횟수 줄이기(N+1 제거)를 골라요', 'once found, EXPLAIN ANALYZE shows the real plan, guiding indexes, query rewrites, caching or fewer calls (removing N+1)'], ['고친 뒤 통계를 초기화하고 같은 기간을 다시 비교해 효과를 확인해요', 'after fixing, reset the statistics and compare the same period to confirm the effect']],
    fin: [['느린 쿼리 찾기: 누적 시간 기준으로 우선순위를 정하고, 실행 계획을 보고 고친 뒤 다시 측정해요', 'finding slow queries prioritizes by total time, inspects execution plans, fixes and remeasures', 'bex-xs bex-a'], ['ORM이 만든 쿼리도 여기서 그대로 보여요', 'ORM-generated queries show up here too'], ['인덱스를 더하면 쓰기가 느려지니 균형을 봐요', 'indexes slow writes, so weigh the balance']],
    caps: [['쿼리 통계', 'Query statistics'], ['누적 시간', 'Total time'], ['원인 분석', 'Diagnosis'], ['효과 확인', 'Confirming the fix'], ['느린 쿼리 찾기', 'Finding slow queries']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('be-arch', '구조와 런타임', 'Structure & runtime', '서버 구조와 런타임', 'Server structure and runtime', '계층형·헥사고날·모듈러 모놀리스 구조와, 동시성 모델·커넥션 풀·타임아웃·우아한 종료처럼 서버가 실제로 돌아가는 방식이에요.', 'Layered, hexagonal and modular-monolith structures, plus how servers actually run: concurrency models, connection pools, timeouts and graceful shutdown.', [
    item('be-layered', '계층형 구조', 'Layered architecture', '컨트롤러(HTTP)·서비스(업무 규칙)·저장소(데이터 접근)로 관심사를 나누고, 의존은 위에서 아래로만 흘러요. 가장 흔한 백엔드 구조예요.', '컨트롤러는 HTTP 요청에서 입력을 꺼내 서비스를 부르고 결과를 응답으로 바꾸는 일만 해요. 서비스는 “재고보다 많이 주문할 수 없다” 같은 업무 규칙과 트랜잭션을 맡고 HTTP 상태 코드나 SQL을 몰라요. 저장소(Repository)는 DB 접근만 담당해서 저장 방식이 바뀌어도 위 계층은 그대로예요. 의존이 위에서 아래로만 흐르기 때문에 테스트에서는 저장소를 가짜로 바꿔 서비스 규칙만 빠르게 검증할 수 있어요. 흔한 실수는 컨트롤러에 업무 규칙이 새거나, 서비스가 요청 객체를 그대로 받는 거예요. 서비스가 수천 줄로 비대해지면 규칙을 도메인 객체로 옮기는 것이 다음 단계예요.', 'Layered architecture separates controllers (HTTP), services (business rules) and repositories (data access), with dependencies flowing only downward, the most common backend structure.', 'Controllers only extract input from HTTP requests, call services and turn results into responses. Services own business rules such as “cannot order more than stock” and transactions, knowing nothing of status codes or SQL. Repositories handle only database access, so storage changes leave the upper layers untouched. Because dependencies flow downward only, tests can swap repositories for fakes and verify service rules quickly. Common mistakes are business rules leaking into controllers and services accepting raw request objects. When services bloat to thousands of lines, moving rules into domain objects is the next step.', sLayered()),
    item('be-hexagonal', '헥사고날 아키텍처', 'Hexagonal architecture', '도메인이 필요한 바깥 기능을 포트(인터페이스)로 정하고, 실제 기술은 어댑터로 구현해요. 의존이 기술에서 도메인 쪽으로 뒤집혀요.', '포트와 어댑터라고도 불러요. 결제, 저장, 메일처럼 도메인이 바깥에 요구하는 기능을 PaymentPort 같은 인터페이스로 도메인 쪽에서 정의해요. PgAdapter, PostgresRepository 같은 어댑터가 그 인터페이스를 실제 기술로 구현하므로, 의존 방향이 “기술 → 도메인”으로 뒤집혀요(의존성 역전 원칙). 테스트에서는 FakePayment 같은 가짜 어댑터를 끼워 외부 시스템 없이 도메인 규칙을 검증하고, 결제사나 DB를 바꿀 때는 어댑터만 새로 써요. 들어오는 쪽(REST 컨트롤러, 큐 소비자)도 어댑터라서 같은 도메인을 HTTP와 메시지로 함께 쓸 수 있어요. 클린 아키텍처, 어니언 아키텍처도 같은 생각에서 나왔어요. 단순한 CRUD에는 과할 수 있고, 규칙이 복잡하고 오래 살 시스템에서 효과가 커요.', 'Hexagonal architecture lets the domain define the outside capabilities it needs as ports (interfaces) implemented by technology adapters, inverting dependencies toward the domain.', 'Also called ports and adapters, it has the domain define what it needs from outside, payment, storage, mail, as interfaces such as PaymentPort. Adapters such as PgAdapter or PostgresRepository implement those interfaces with real technology, inverting dependencies so technology points at the domain (the dependency inversion principle). Tests plug in fake adapters such as FakePayment to check domain rules without external systems, and switching payment providers or databases means writing a new adapter. Inbound sides, REST controllers or queue consumers, are adapters too, so one domain serves HTTP and messages alike. Clean architecture and onion architecture share the idea. It can be overkill for simple CRUD and pays off in complex, long-lived systems.', sHexagonal()),
    item('be-modular-monolith', '모듈러 모놀리스', 'Modular monoliths', '하나로 배포하지만 안쪽은 기능 모듈로 엄격히 나눠요. 모듈끼리는 공개 API로만 호출해서, 필요할 때 한 모듈만 서비스로 떼어내기 쉬워요.', '처음부터 마이크로서비스로 나누면 네트워크 호출, 분산 트랜잭션, 배포 파이프라인 같은 비용을 너무 일찍 떠안아요. 모듈러 모놀리스는 orders, billing, catalog처럼 기능 모듈을 나누고, 모듈 사이 호출은 api.ts 같은 공개 인터페이스로만 허용해요. 데이터도 모듈별 스키마로 나누고 다른 모듈 테이블에 직접 조인하지 않아야 진짜 경계가 생겨요. 경계 규칙은 ArchUnit, eslint-plugin-boundaries, Spring Modulith 같은 도구로 자동 검사해요. 한 프로세스 안이라 디버깅과 트랜잭션이 쉽고, 트래픽이나 팀이 커지면 그 모듈만 마이크로서비스로 떼어내요. 많은 팀이 이 구조를 기본 출발점으로 권해요.', 'A modular monolith deploys as one unit but divides strictly into feature modules that call each other only through public APIs, making it easy to extract a single module later.', 'Starting with microservices takes on network calls, distributed transactions and deployment pipelines far too early. A modular monolith splits feature modules such as orders, billing and catalog and allows calls between them only through public interfaces such as api.ts. Data is split into per-module schemas with no direct joins into other modules’ tables, creating real boundaries. Tools such as ArchUnit, eslint-plugin-boundaries or Spring Modulith check the rules automatically. Running in one process keeps debugging and transactions simple, and when traffic or teams grow, that one module is extracted into a microservice. Many teams recommend this structure as the default starting point.', sModularMonolith()),
    item('be-concurrency-models', '동시성 모델', 'Concurrency models', '요청당 스레드, 이벤트 루프, 가벼운 스레드(고루틴·가상 스레드)는 I/O를 기다리는 동안 다른 요청을 처리하는 방식이 달라요.', '대부분의 백엔드는 CPU보다 DB나 외부 API를 기다리는 시간이 길어요. 요청당 OS 스레드 모델(전통적인 Spring MVC 등)은 코드가 단순하지만 스레드가 기다리며 놀고, 스레드마다 메모리를 써서 동시 연결 수에 한계가 있어요. Node.js의 이벤트 루프는 스레드 하나가 여러 요청을 번갈아 처리하고 I/O는 운영체제에 맡겨서 적은 자원으로 많은 연결을 다뤄요. Go의 고루틴과 Java 21의 가상 스레드는 아주 가벼운 스레드를 수십만 개 만들어 소수의 OS 스레드에 올리므로, 동기 코드처럼 쓰면서도 효율이 높아요. 이벤트 루프에서 무거운 계산을 하면 모든 요청이 멈추니 CPU 작업은 워커 스레드나 별도 서비스로 옮겨요. 어떤 모델이든 처리량의 상한은 결국 DB 같은 병목이 정해요.', 'Thread-per-request, event loops and lightweight threads (goroutines, virtual threads) differ in how they serve other requests while waiting on I/O.', 'Most backends spend more time waiting on databases or external APIs than on CPU. Thread-per-request with OS threads, as in classic Spring MVC, keeps code simple but leaves threads idle while waiting, each costing memory and capping concurrency. Node.js’s event loop interleaves many requests on one thread and hands I/O to the operating system, serving many connections with few resources. Go goroutines and Java 21 virtual threads run hundreds of thousands of lightweight threads on a few OS threads, keeping synchronous-style code with high efficiency. Heavy computation on an event loop stalls every request, so CPU work moves to worker threads or separate services. Whatever the model, throughput is ultimately capped by bottlenecks such as the database.', sConcurrency()),
    item('be-connection-pool', '커넥션 풀', 'Connection pools', 'DB 연결을 미리 열어 두고 요청이 빌려 쓰고 반납해요. 반납을 잊으면 풀이 고갈되고, 인스턴스 수 × 풀 크기는 DB 최대 연결 안이어야 해요.', 'DB 연결은 TCP, TLS, 인증을 거쳐야 해서 매 요청마다 새로 만들면 느려요. 커넥션 풀은 연결을 미리 열어 두고 요청이 빌려 쓰게 해서 그 비용을 없애요. 쿼리가 끝나면 finally에서 반드시 반납해야 하고, 빠뜨리면 연결이 새어 풀이 고갈되고 새 요청은 줄을 서다 connectionTimeout으로 실패해요. 풀 크기는 클수록 좋은 게 아니에요 · DB는 코어 수에 비례한 동시 쿼리에서 가장 효율적이라 과한 연결은 오히려 느려져요. 서버를 10대로 늘리면 10 × max만큼 연결이 생기므로 DB의 max_connections를 넘지 않게 하고, 넘으면 PgBouncer 같은 연결 프록시로 모아요. 풀 대기 시간과 사용률은 꼭 지표로 봐요.', 'A connection pool opens database connections ahead of time for requests to borrow and return; forgotten returns exhaust it, and instances × pool size must fit the database’s connection limit.', 'Database connections go through TCP, TLS and authentication, so creating one per request is slow. A pool keeps connections open for requests to borrow, removing that cost. Connections must be returned in finally after the query; forgetting leaks them until the pool is exhausted and new requests queue and fail on connectionTimeout. Bigger is not better: databases are most efficient with concurrency proportional to their cores, so excess connections slow things down. Scaling to ten servers creates ten times max connections, which must stay under the database’s max_connections, or be funneled through a proxy such as PgBouncer. Always monitor pool wait time and utilization.', sConnPool()),
    item('be-timeouts', '타임아웃과 데드라인', 'Timeouts and deadlines', '모든 외부 호출에 시간 상한을 걸고, 요청 전체의 남은 시간(데드라인)을 하위 호출에 전달해요. 느린 의존성 하나가 서버 전체를 멈추지 않게 해요.', '타임아웃 없는 호출은 상대가 응답하지 않으면 끝없이 기다릴 수 있어요. 그동안 스레드와 DB 연결이 묶여 쌓이고, 결국 서버 전체가 새 요청을 받지 못하는 연쇄 장애가 생겨요. 그래서 HTTP 호출, DB 쿼리, 잠금 대기까지 모든 기다림에 AbortSignal.timeout 같은 상한을 걸어요. 요청 하나에 2초 같은 전체 예산을 정하고, 하위 호출에는 남은 시간만 넘기면 이미 늦은 요청을 위해 헛수고하지 않아요(gRPC는 데드라인을 자동 전파해요). 클라이언트가 연결을 끊었다면 진행 중인 하위 작업도 취소해 자원을 아껴요. 타임아웃 값은 평소 p99 지연보다 조금 길게 잡고, 재시도까지 합친 시간이 예산을 넘지 않게 해요.', 'Put a time limit on every outbound call and pass the request’s remaining time (deadline) downstream, so one slow dependency cannot freeze the whole server.', 'A call without a timeout can wait forever if the other side never answers. Meanwhile threads and database connections pile up, until a cascading failure leaves the server unable to accept new requests. So every wait, HTTP calls, database queries, even lock waits, gets a limit such as AbortSignal.timeout. Setting an overall budget such as 2 seconds per request and passing only the remaining time downstream avoids wasted work on requests that are already late (gRPC propagates deadlines automatically). When the client has disconnected, in-flight downstream work is cancelled to save resources. Set timeouts a little above normal p99 latency, and keep retries within the budget.', sTimeouts()),
    item('be-graceful-shutdown', '우아한 종료', 'Graceful shutdown', 'SIGTERM을 받으면 새 요청을 막고, 처리 중인 요청을 끝내고, 연결을 정리한 뒤 종료해요. 무중단 배포의 전제 조건이에요.', '쿠버네티스 같은 오케스트레이터는 배포나 축소 때 컨테이너에 SIGTERM을 보내고, 유예 시간(기본 30초)이 지나면 SIGKILL로 강제 종료해요. 신호를 받자마자 꺼지면 처리 중이던 요청이 끊겨 사용자가 오류를 봐요. 먼저 readiness 검사를 실패시켜 로드밸런서가 새 요청을 보내지 않게 하고, 라우팅 갱신이 퍼질 짧은 시간을 기다려요. server.close()로 새 연결은 거절하면서 이미 받은 요청은 끝까지 처리하고, 큐 소비자와 DB 연결을 정리한 뒤 종료해요. 오래 걸리는 작업은 체크포인트를 남겨 다른 인스턴스가 이어받게 해요. liveness 검사는 “프로세스가 살아 있나”, readiness 검사는 “요청을 받을 준비가 됐나”를 묻는 서로 다른 질문이에요.', 'On SIGTERM, stop accepting new requests, finish in-flight ones, release connections and exit, the prerequisite for zero-downtime deploys.', 'Orchestrators such as Kubernetes send SIGTERM during deploys or scale-down and force SIGKILL after a grace period (30 seconds by default). Exiting immediately cuts off in-flight requests, and users see errors. First fail the readiness check so the load balancer stops sending new requests, and wait briefly for routing updates to propagate. server.close() refuses new connections while finishing accepted requests, then queue consumers and database connections are closed before exiting. Long jobs leave checkpoints so another instance can take over. Liveness asks “is the process alive?” while readiness asks “is it ready for traffic?”, two different questions.', sGraceful())
  ]),
  sec('be-api', 'API 설계', 'API design', '오래 쓰는 API 설계', 'Designing APIs that last', '버전 관리, 오류 형식, 멱등 키, 웹훅, 파일 업로드, 비동기 작업 API, 입력 검증처럼 실무 API에서 반복되는 설계예요.', 'Recurring practical API designs: versioning, error formats, idempotency keys, webhooks, file uploads, asynchronous job APIs and input validation.', [
    item('be-api-versioning', 'API 버전 관리', 'API versioning', '필드 추가처럼 호환되는 변경은 그 자리에서 하고, 삭제·이름 변경처럼 깨는 변경은 새 버전으로 해요. 옛 버전은 예고하고 사용량을 보며 종료해요.', '앱 스토어에 남은 옛 앱처럼 API 클라이언트는 한 번에 바뀌지 않아서, 여러 버전이 한동안 함께 살아요. 버전은 /v1/ 같은 URL이나 Accept 헤더로 구분해요. 응답에 필드를 추가하거나 선택 매개변수를 더하는 건 하위 호환이고, 클라이언트가 모르는 필드를 무시하게 만들어 두면 자유롭게 늘릴 수 있어요. 필드 삭제, 이름 변경, 타입이나 의미 변경, 필수 매개변수 추가는 기존 클라이언트를 깨뜨리므로 새 버전에서만 해요. 옛 버전은 Deprecation·Sunset 헤더와 문서, 이메일로 종료 일정을 알리고, 버전별 호출량을 측정해 충분히 줄었을 때 내려요. 버전을 자주 올리기보다 처음부터 호환을 지키도록 설계하고 계약 테스트로 깨는 변경을 미리 잡는 게 더 중요해요.', 'Make compatible changes such as adding fields in place, put breaking ones such as removals or renames in new versions, and retire old versions with notice while watching usage.', 'API clients, like old apps lingering in app stores, never change all at once, so several versions coexist for a while, distinguished by URLs such as /v1/ or the Accept header. Adding response fields or optional parameters is backward compatible, especially when clients ignore unknown fields. Removing or renaming fields, changing types or meanings, or adding required parameters breaks existing clients, so those happen only in new versions. Old versions announce their end through Deprecation and Sunset headers, docs and email, and are retired once per-version traffic has dropped enough. Designing for compatibility from the start and catching breaking changes with contract tests matters more than frequent version bumps.', sVersioning()),
    item('be-error-format', '오류 응답 설계', 'Error response design', '정확한 상태 코드에 RFC 9457 Problem Details 형식(type·title·status·detail·instance)으로 모든 오류를 같은 모양으로 돌려줘요.', '먼저 상태 코드를 정확히 골라요 · 400(형식 오류), 401(인증 필요), 403(권한 없음), 404(없음), 409(충돌), 422(규칙 위반), 429(너무 많음)는 클라이언트가 고칠 문제이고, 5xx는 서버 문제라 재시도할 수 있어요. RFC 9457 Problem Details는 application/problem+json으로 type(오류 종류 URI), title, status, detail, instance를 담는 표준 형식이에요. 클라이언트 코드는 바뀌지 않는 type으로 분기하고, title과 detail은 사람이 읽을 설명이라 문구를 고쳐도 프로그램이 깨지지 않아요. 검증 오류처럼 필드별 정보가 필요하면 errors 같은 확장 필드를 더해요. 응답에는 로그를 찾을 수 있는 추적 ID를 넣되, 스택 트레이스나 SQL 같은 내부 정보는 절대 넣지 않아요. 모든 엔드포인트가 같은 형식을 쓰도록 오류 변환을 한 곳(예외 필터, 미들웨어)에서 해요.', 'Return every error in one shape: the right status code plus the RFC 9457 Problem Details format of type, title, status, detail and instance.', 'Start by choosing status codes precisely: 400 (malformed), 401 (authentication needed), 403 (forbidden), 404 (missing), 409 (conflict), 422 (rule violation) and 429 (too many) are for clients to fix, while 5xx are server problems that may be retried. RFC 9457 Problem Details is a standard application/problem+json shape carrying type (an error-kind URI), title, status, detail and instance. Client code branches on the stable type, while title and detail are human-readable, so rewording never breaks programs. Per-field information, such as validation errors, goes in extension fields such as errors. Responses include a trace ID for finding logs but never internals such as stack traces or SQL. Convert errors in one place, an exception filter or middleware, so every endpoint matches.', sErrorFormat()),
    item('be-idempotency-key', '멱등 키', 'Idempotency keys', '클라이언트가 Idempotency-Key 헤더를 붙이면 서버는 키별 결과를 저장해 두고, 같은 키의 재시도에는 저장된 응답을 돌려줘서 결제가 두 번 되지 않아요.', 'POST로 결제를 요청했는데 응답이 네트워크에서 끊기면, 클라이언트는 결제가 됐는지 알 수 없어 재시도해야 할지 고민하게 돼요. 클라이언트가 요청마다 UUID로 Idempotency-Key를 만들어 보내면, 서버는 처음 처리한 결과를 키와 함께 저장하고 같은 키의 재시도에는 저장된 응답을 그대로 돌려줘요. 같은 키가 거의 동시에 두 번 도착하면 잠금이나 DB 고유 제약으로 하나만 처리하고, 나머지는 기다리게 하거나 409로 돌려보내요. 같은 키에 다른 본문이 오면 실수이므로 422로 거부해요. 키는 24시간처럼 정해진 기간 보관하고 지워요. 결제·주문·송금처럼 중복이 치명적인 POST에는 사실상 필수인 패턴이고, 큰 결제 API들이 널리 쓰는 방식이에요.', 'With an Idempotency-Key header from the client, the server stores results per key and replays the stored response on retries, so payments never happen twice.', 'When a POST payment succeeds but the reply is lost on the network, the client cannot tell whether it was charged and hesitates to retry. If the client sends a UUID Idempotency-Key with each request, the server stores the first result with the key and replays it for retries with the same key. When the same key arrives twice almost simultaneously, a lock or a unique constraint lets only one proceed while the other waits or gets a 409. A reused key with a different body is a client mistake and is rejected with 422. Keys are kept for a set period such as 24 hours. The pattern is practically mandatory for POSTs where duplicates hurt, such as payments, orders and transfers, and major payment APIs use it widely.', sIdemKey()),
    item('be-webhooks', '웹훅', 'Webhooks', '이벤트가 생기면 상대 서비스가 우리 URL로 HTTP 요청을 보내요. 서명을 검증하고, 빠르게 200을 돌려주고, 이벤트 id로 중복을 걸러요.', '결제 완료, 배송 상태 변경처럼 다른 서비스에서 일어난 일을 계속 조회(폴링)하는 대신 상대가 우리 URL로 알려주는 방식이에요. 그 URL은 누구나 호출할 수 있으니 공유 비밀키로 만든 HMAC 서명과 타임스탬프를 확인해 위조와 재전송 공격을 막고, 비교는 타이밍 안전 함수로 해요. 받은 쪽은 무거운 처리를 큐에 넘기고 몇 초 안에 200을 돌려줘요 · 응답이 늦거나 실패하면 보내는 쪽이 간격을 늘리며 다시 보내요. 그래서 같은 이벤트가 여러 번 올 수 있어 이벤트 id로 처리 여부를 기록해 중복을 걸러요. 이벤트 순서가 뒤바뀔 수도 있으니 중요한 상태는 받은 뒤 상대 API로 다시 조회해 확정하기도 해요. 우리가 웹훅을 보낼 때도 서명, 재시도, 이벤트 id, 수동 재전송 기능을 제공해요.', 'Webhooks have another service call our URL when events happen; verify signatures, return 200 quickly, and dedupe by event id.', 'Instead of repeatedly polling another service for events such as completed payments or shipping updates, webhooks have it notify our URL. Since anyone can call that URL, verify an HMAC signature made with a shared secret plus a timestamp to block forgery and replays, comparing with a timing-safe function. Receivers queue heavy work and return 200 within seconds, because slow or failed replies make senders retry with growing delays. That means the same event can arrive several times, so record processed event ids to filter duplicates. Events may also arrive out of order, so important state is sometimes confirmed by querying the provider’s API afterward. When we send webhooks, we provide signatures, retries, event ids and manual redelivery too.', sWebhooks()),
    item('be-file-upload', '파일 업로드', 'File uploads', '서버는 짧게 유효한 서명 URL만 발급하고, 브라우저가 스토리지로 파일을 직접 올려요. 업로드 완료 이벤트로 검사·썸네일 같은 후처리를 해요.', '파일을 앱 서버를 거쳐 올리면 서버의 대역폭과 메모리가 파일 크기만큼 들고, 큰 파일이 몰리면 다른 API까지 느려져요. 대신 서버는 S3 같은 객체 스토리지에 올릴 수 있는 presigned URL을 몇 분짜리로 만들어 주고, 브라우저가 그 URL로 직접 PUT해요. 서명 조건에 허용 크기와 Content-Type을 넣어 다른 파일은 스토리지가 거부하게 하고, 파일 키는 사용자 입력이 아닌 서버가 정한 값으로 만들어 경로 조작을 막아요. 수백 MB 이상은 멀티파트 업로드로 조각내 병렬로 올리고 실패한 조각만 다시 보내요. 업로드 완료 이벤트로 바이러스 검사, 이미지 리사이즈, 메타데이터 추출을 하고, 검사가 끝나기 전에는 비공개로 둬요. 다운로드도 기간이 제한된 서명 URL로 제공해요.', 'The server only issues short-lived signed URLs, the browser uploads straight to storage, and upload events trigger post-processing such as scanning and thumbnails.', 'Proxying files through the app server spends bandwidth and memory per file, and a burst of large uploads slows every other API. Instead the server issues a presigned URL valid for a few minutes for object storage such as S3, and the browser PUTs to it directly. Allowed size and Content-Type go into the signature conditions so storage rejects other files, and file keys are server-generated rather than user-supplied to prevent path tricks. Files of hundreds of megabytes use multipart uploads, sending chunks in parallel and retrying only failed ones. Upload-complete events trigger virus scans, resizing and metadata extraction, keeping files private until checked. Downloads are served through time-limited signed URLs too.', sUpload()),
    item('be-async-api', '비동기 작업 API', 'Asynchronous job APIs', '오래 걸리는 작업은 202 Accepted로 접수만 하고 상태 URL을 돌려줘요. 클라이언트는 상태를 확인하거나 웹훅·SSE로 완료 알림을 받아요.', '리포트 생성이나 대용량 내보내기처럼 수십 초 이상 걸리는 일을 요청 안에서 처리하면 로드밸런서나 브라우저의 타임아웃에 걸려요. POST에 202 Accepted와 Location: /jobs/77을 돌려주고 실제 작업은 큐의 워커가 맡아요. 클라이언트는 Retry-After 간격으로 상태 URL을 확인하고, 서버는 queued, running, done, failed 같은 상태와 진행률을 알려줘요. 완료되면 결과 리소스의 위치를 주고, 실패하면 Problem Details 형식의 오류를 담아요. 폴링 대신 웹훅이나 SSE로 완료를 밀어줄 수도 있어요. 작업 상태는 DB에 저장해서 어느 서버가 받든 조회되게 하고, 같은 요청의 중복 접수는 멱등 키로, 취소는 DELETE /jobs/77 같은 엔드포인트로 제공해요.', 'Long-running work is accepted with 202 and a status URL, and clients poll the status or receive completion via webhook or SSE.', 'Running work that takes tens of seconds, such as report generation or large exports, inside a request hits load balancer or browser timeouts. The POST returns 202 Accepted with Location: /jobs/77 while a queue worker does the real work. Clients poll the status URL at the Retry-After interval, and the server reports states such as queued, running, done and failed along with progress. On completion it points to the result resource, and on failure it carries a Problem Details error. Webhooks or SSE can push completion instead of polling. Job state lives in the database so any server can answer, duplicate submissions are prevented with idempotency keys, and cancellation is offered through an endpoint such as DELETE /jobs/77.', sAsyncApi()),
    item('be-validation', '입력 검증', 'Input validation', '신뢰 경계에서 입력을 한 번 파싱해 믿을 수 있는 타입으로 바꾸고, 그 뒤 코드는 타입을 믿어요. 허용 목록과 크기 제한으로 남용도 막아요.', 'isValid(input)로 검사만 하고 원본을 계속 넘기면, 안쪽 함수들은 그 값이 검사됐는지 알 수 없어 다시 의심하거나 검사를 빠뜨려요. “검증 말고 파싱하라(Parse, don’t validate)”는 경계에서 Zod 같은 스키마로 파싱해 Order 같은 타입으로 바꾸고, 실패하면 바로 400을 돌려주는 방식이에요. 그 뒤 코드는 타입 시스템이 보장하는 값만 다뤄서 방어 코드가 줄어요. 경계는 HTTP 요청뿐 아니라 큐 메시지, 업로드 파일, 외부 API 응답, 환경 변수처럼 신뢰 수준이 바뀌는 모든 곳이에요. 알려진 필드만 받는 허용 목록으로 role 같은 값을 몰래 넣는 대량 할당을 막고, 본문 크기·배열 길이·문자열 길이에 상한을 둬 서비스 거부 공격을 줄여요. 검증과 별개로 SQL은 매개변수 바인딩, HTML 출력은 이스케이프로 처리해요.', 'Parse input once at trust boundaries into trusted types so later code can rely on them, and block abuse with allowlists and size limits.', 'Checking with isValid(input) while passing the raw input on leaves inner functions unsure whether it was checked, so they re-check or forget to. “Parse, don’t validate” means parsing at the edge with a schema such as Zod into a type such as Order, returning 400 immediately on failure. Later code then handles only values guaranteed by the type system, shrinking defensive code. Boundaries include not only HTTP requests but queue messages, uploaded files, external API responses and environment variables, anywhere trust changes. Allowlists of known fields block mass assignment of smuggled values such as role, and limits on body size, array length and string length reduce denial of service. Separately from validation, SQL uses parameter binding and HTML output is escaped.', sValidation())
  ]),
  sec('be-data', '데이터 계층', 'Data layer', '데이터를 다루는 실무', 'Working with data in practice', '데이터 접근 방식, 무중단 마이그레이션, 트랜잭션 경계, 캐시 전략, Redis 활용, 소프트 삭제와 감사, 멀티테넌시예요.', 'Data access styles, zero-downtime migrations, transaction boundaries, cache strategies, Redis, soft deletes and audits, and multitenancy.', [
    item('be-orm', 'ORM · 쿼리 빌더 · SQL', 'ORMs, query builders and SQL', 'ORM은 생산성, 쿼리 빌더는 타입 있는 SQL, 원시 SQL은 완전한 통제를 줘요. 쿼리 성격에 맞게 섞어 쓰고, 값은 언제나 매개변수로 바인딩해요.', 'ORM(TypeORM, Prisma, Hibernate 등)은 테이블을 객체로 다뤄 CRUD와 관계 탐색이 빠르지만, 실제로 나가는 SQL이 가려져 N+1 쿼리나 필요 없는 컬럼까지 읽는 과한 조회가 생기기 쉬워요. Kysely, Drizzle, jOOQ 같은 쿼리 빌더는 SQL과 비슷한 모양으로 쓰면서 테이블·컬럼 이름과 결과 타입을 컴파일 단계에서 검사해 줘요. 윈도 함수, CTE, 복잡한 리포트처럼 SQL이 가장 잘 표현하는 쿼리는 원시 SQL로 쓰는 게 읽기도 성능도 좋아요. 한 프로젝트에서 섞어 써도 되고, 개발 중에는 실행되는 SQL을 로그로 확인하는 습관이 중요해요. 어떤 방식이든 사용자 입력은 문자열로 이어 붙이지 말고 $1 같은 매개변수로 바인딩해 SQL 인젝션을 막아요.', 'ORMs give productivity, query builders give typed SQL and raw SQL gives full control; mix them by query type and always bind values as parameters.', 'ORMs such as TypeORM, Prisma or Hibernate treat tables as objects for fast CRUD and relation navigation, but they hide the SQL they emit, inviting N+1 queries and overfetching of unneeded columns. Query builders such as Kysely, Drizzle or jOOQ stay close to SQL while checking table and column names and result types at compile time. Queries SQL expresses best, such as window functions, CTEs and complex reports, read and perform better as raw SQL. Mixing them in one project is fine, and logging executed SQL during development is a valuable habit. Whatever the style, never concatenate user input into strings; bind it as parameters such as $1 to prevent SQL injection.', sOrm()),
    item('be-migrations', '무중단 스키마 변경', 'Zero-downtime schema changes', '컬럼 추가(확장) → 같이 쓰기·백필 → 읽기 전환 → 옛 컬럼 삭제(축소)로 나눠 배포해요. 옛·새 앱이 함께 돌아도 깨지지 않아요.', '배포 중에는 옛 버전과 새 버전 앱이 잠시 함께 돌아요. 그래서 name 컬럼을 full_name으로 한 번에 바꾸면 옛 버전이 없는 컬럼을 찾다 오류를 내요. 확장-축소(expand-contract) 방식은 먼저 새 컬럼을 NULL 허용으로 추가하고, 다음 배포에서 앱이 두 컬럼에 모두 쓰게 한 뒤 기존 데이터를 작은 묶음으로 백필해요. 데이터가 맞춰지면 읽기를 새 컬럼으로 옮기고, 한동안 지켜본 뒤 아무 버전도 옛 컬럼을 쓰지 않을 때 삭제해요. 각 단계는 따로 배포되고 언제든 되돌릴 수 있어요. 큰 테이블에 인덱스를 만들 땐 CREATE INDEX CONCURRENTLY로 쓰기 잠금을 피하고, NOT NULL 제약은 데이터를 채운 뒤에 걸어요. 마이그레이션 파일은 코드와 함께 버전 관리하고 앱 배포 전에 적용해요.', 'Deploy schema changes in steps, add the column (expand), dual-write and backfill, switch reads, then drop the old column (contract), so old and new app versions both keep working.', 'During a deploy, old and new app versions briefly run side by side, so renaming name to full_name in one step makes the old version fail looking for a missing column. The expand-contract approach first adds the new column as nullable, then deploys an app that writes both columns while existing rows are backfilled in small batches. Once the data matches, reads move to the new column, and after a watch period the old column is dropped when no version uses it. Each step is deployed separately and can be rolled back. Building indexes on big tables with CREATE INDEX CONCURRENTLY avoids write locks, and NOT NULL constraints come only after the data is filled. Migration files are versioned with the code and applied before app deploys.', sMigrations()),
    item('be-tx-boundary', '트랜잭션 경계', 'Transaction boundaries', '함께 원자적이어야 할 DB 작업만 짧은 트랜잭션으로 묶고, 결제 API 같은 외부 호출은 커밋 뒤에 해요. 실패는 보상 처리나 아웃박스로 다뤄요.', '주문 저장과 재고 차감처럼 둘 중 하나만 반영되면 안 되는 작업을 하나의 트랜잭션으로 묶어요. 트랜잭션 안에서 결제 API처럼 몇 초 걸리는 외부 호출을 하면 그동안 행 잠금과 DB 연결을 붙잡아 다른 요청이 줄을 서고, 교착 상태도 늘어요. 게다가 DB를 롤백해도 이미 처리된 결제는 취소되지 않아서 원자성이 오히려 거짓이 돼요. 그래서 트랜잭션은 DB 작업만으로 짧게 끝내고, 외부 호출은 커밋한 뒤에 해요. 커밋 뒤의 작업이 실패하면 주문 취소 같은 보상 처리를 하고, 이벤트 발행처럼 반드시 일어나야 하는 일은 같은 트랜잭션에 아웃박스 행을 써 두고 나중에 보내는 패턴으로 보장해요. 트랜잭션은 보통 서비스 메서드 단위로 열고, 저장소는 받은 트랜잭션 안에서만 동작하게 해요.', 'Wrap only database work that must be atomic in short transactions, make external calls such as payment APIs after commit, and handle failures with compensation or an outbox.', 'Work where partial application is unacceptable, such as saving an order and decrementing stock, goes in one transaction. Making a seconds-long external call such as a payment API inside it holds row locks and connections, queueing other requests and raising deadlocks. Worse, a database rollback never undoes a payment already processed, so the atomicity becomes a lie. Transactions therefore contain only database work and finish quickly, with external calls after commit. When post-commit work fails, compensate, for instance by cancelling the order, and guarantee must-happen work such as event publishing by writing an outbox row in the same transaction and sending it later. Transactions usually open per service method, with repositories operating only inside the transaction they are given.', sTxBoundary()),
    item('be-cache-strategies', '캐시 전략', 'Cache strategies', '읽기는 캐시 어사이드, 쓰기는 write-through·write-behind 중에서, 위치는 프로세스 메모리 → Redis → DB 계층으로 데이터의 신선도 요구에 맞게 골라요.', '캐시 어사이드는 읽을 때 캐시에 없으면 DB에서 가져와 저장하는 가장 흔한 방식이에요. write-through는 DB에 쓸 때 캐시도 함께 갱신해서 읽기가 항상 최신이지만 쓰기가 조금 느려지고, write-around는 쓰기 때 캐시를 비워 다음 읽기에 채우게 해요. write-behind는 캐시에 먼저 쓰고 DB 반영은 모아서 나중에 해서 빠르지만, 반영 전에 캐시가 죽으면 데이터를 잃어요. 프로세스 메모리(L1)는 마이크로초, Redis(L2)는 밀리초, DB는 수십 밀리초 단위라 뜨거운 키는 가까운 층에 둬요. 서버마다 있는 L1은 변경 알림(pub/sub)으로 함께 무효화하고, TTL에 무작위 지터를 더해 한꺼번에 만료되며 DB로 몰리는 걸 피해요. 캐시는 원본이 아니라서 사라져도 시스템이 동작해야 해요.', 'Choose read (cache-aside) and write (write-through, write-behind) strategies and layers (process memory, Redis, database) according to how fresh the data must be.', 'Cache-aside, the most common approach, loads from the database and stores on a miss. Write-through updates the cache alongside database writes so reads are always fresh at the cost of slower writes, while write-around evicts on write and refills on the next read. Write-behind writes to the cache first and flushes to the database in batches, fast but lossy if the cache dies before flushing. Process memory (L1) answers in microseconds, Redis (L2) in milliseconds and the database in tens of milliseconds, so hot keys live in nearer layers. Per-server L1 caches are invalidated together through pub/sub, and random jitter on TTLs avoids synchronized expiry stampeding the database. A cache is not the source of truth, so the system must work without it.', sCacheStrat()),
    item('be-redis', 'Redis 활용', 'Using Redis', 'Redis는 캐시를 넘어 원자적 카운터, 순위표(정렬 집합), 간단한 잠금, 세션, 스트림 큐까지 맡아요. 알맞은 자료구조를 고르는 게 핵심이에요.', 'Redis는 메모리 기반 키-값 저장소로, 명령 하나하나가 단일 스레드에서 원자적으로 실행돼요. INCR과 EXPIRE를 함께 쓰면 사용자별 요청 수를 세는 속도 제한 카운터가 되고, 정렬 집합(ZADD, ZREVRANGE)은 점수 순서를 유지해 순위표를 명령 한 줄로 만들어요. SET key value NX PX 5000은 “없을 때만 저장, 5초 뒤 자동 만료”라서 간단한 분산 잠금으로 쓰이고, SETEX로 세션을 만료 시간과 함께 저장해요. 해시는 객체 필드 저장, 스트림(XADD, 소비자 그룹)은 작업 큐와 이벤트 로그에 써요. 모든 키에 만료 시간을 두는 습관이 메모리 폭증을 막고, KEYS 같은 전체 탐색 명령이나 거대한 키는 서버 전체를 멈추게 할 수 있어 피해요. 영속화(RDB, AOF)는 옵션이므로 유일한 원본 데이터를 맡길 땐 신중해야 해요.', 'Beyond caching, Redis handles atomic counters, leaderboards (sorted sets), simple locks, sessions and stream queues, and choosing the right data structure is key.', 'Redis is an in-memory key-value store whose commands each run atomically on a single thread. INCR with EXPIRE makes per-user rate-limit counters, and sorted sets (ZADD, ZREVRANGE) keep score order so a leaderboard is one command. SET key value NX PX 5000 means “store only if absent, expire in 5 s”, a simple distributed lock, and SETEX stores sessions with expiry. Hashes store object fields, and streams (XADD with consumer groups) back job queues and event logs. Giving every key an expiry prevents memory blowups, while full scans such as KEYS or huge keys can stall the whole server and should be avoided. Persistence (RDB, AOF) is optional, so be careful using Redis as the only copy of data.', sRedis()),
    item('be-soft-delete', '소프트 삭제와 감사 로그', 'Soft deletes and audit logs', '행을 지우는 대신 deleted_at에 삭제 시각을 기록해 복구할 수 있게 하고, 누가 무엇을 바꿨는지는 감사 로그로 남겨요.', '소프트 삭제는 DELETE 대신 deleted_at = now()로 표시해서 실수로 지운 데이터를 되살리고, 삭제 이력을 분석할 수 있게 해요. 대신 모든 조회에 deleted_at IS NULL 조건이 빠짐없이 붙어야 해서 ORM의 전역 필터, 뷰, 행 수준 보안으로 강제해요. 지운 계정의 이메일로 다시 가입하면 고유 제약에 걸리므로, 살아 있는 행에만 적용되는 부분 인덱스(WHERE deleted_at IS NULL)로 고유성을 정의해요. 연관된 댓글이나 주문을 함께 숨길지, 오래된 삭제 행을 언제 아카이브할지도 정책으로 정해요. 감사 로그는 누가, 언제, 무엇을, 이전 값과 이후 값으로 남겨 보안 사고 조사와 규정 준수에 써요. 개인정보 삭제 요청처럼 법적으로 지워야 하는 경우에는 소프트 삭제가 아니라 진짜 삭제(또는 익명화)를 해야 해요.', 'Instead of deleting rows, record the deletion time in deleted_at so data can be restored, and keep audit logs of who changed what.', 'Soft deletion marks rows with deleted_at = now() instead of DELETE, allowing accidental deletions to be restored and deletion history to be analyzed. In return, every query must include deleted_at IS NULL, enforced with ORM global filters, views or row-level security. Re-signing up with a deleted account’s email trips the unique constraint, so uniqueness is defined with a partial index covering only live rows (WHERE deleted_at IS NULL). Policies decide whether related comments or orders are hidden too and when old deleted rows are archived. Audit logs record who, when, what, and before and after values, supporting incident investigation and compliance. Legal erasure, such as personal data deletion requests, requires true deletion or anonymization rather than soft deletion.', sSoftDelete()),
    item('be-multitenancy', '멀티테넌시', 'Multitenancy', '여러 고객사가 한 시스템을 함께 써요. 공유 테이블 + tenant_id(+RLS), 테넌트별 스키마, 테넌트별 DB 중 격리 수준과 비용에 맞게 골라요.', 'B2B SaaS는 여러 회사(테넌트)의 데이터를 한 시스템에서 다뤄요. 가장 흔한 공유 테이블 방식은 모든 행에 tenant_id를 두고 쿼리마다 조건을 거는데, 저렴하고 운영이 쉽지만 WHERE 하나만 빠져도 다른 회사 데이터가 새요. PostgreSQL의 행 수준 보안(RLS)은 연결에 설정한 테넌트의 행만 보이도록 DB가 강제해서 앱의 실수를 막아요. 테넌트별 스키마나 테넌트별 DB로 갈수록 격리, 백업·복구, 고객별 맞춤이 쉬워지지만 마이그레이션 관리와 비용이 커져요. 그래서 대부분은 공유로 시작하고 큰 고객만 전용 DB로 떼어내는 혼합 방식을 써요. 한 테넌트가 자원을 독차지하는 noisy neighbor 문제는 테넌트별 사용량 제한과 지표로 다뤄요. 테넌트 정보는 인증 토큰에서 꺼내 요청 문맥에 두고, 캐시 키와 로그에도 포함해요.', 'Multitenancy lets many customer organizations share one system, choosing shared tables with tenant_id (plus RLS), schema per tenant or database per tenant by isolation and cost.', 'B2B SaaS handles data from many companies (tenants) in one system. The common shared-table approach puts a tenant_id on every row and filters every query, cheap and easy to run, but one missing WHERE leaks another company’s data. PostgreSQL row-level security makes the database show only rows for the tenant set on the connection, guarding against app mistakes. Schema-per-tenant or database-per-tenant improve isolation, backup and restore, and per-customer customization, at higher migration and cost overhead. Most teams start shared and move only large customers to dedicated databases, a hybrid model. Noisy neighbors hogging resources are handled with per-tenant quotas and metrics. The tenant comes from the auth token into request context and is included in cache keys and logs.', sMultitenancy())
  ]),
  sec('be-integ', '연동과 백그라운드', 'Integration & jobs', '외부 연동과 백그라운드 작업', 'Integrations and background work', '외부 호출을 지키는 회복 탄력성 패턴, 결제와 알림 연동, 도메인 이벤트, 배치 작업, 분산 환경의 정기 작업이에요.', 'Resilience patterns for outbound calls, payment and notification integrations, domain events, batch jobs and scheduled jobs in distributed systems.', [
    item('be-resilience', '회복 탄력성 패턴', 'Resilience patterns', '외부 호출을 타임아웃 → 재시도 → 서킷 브레이커 → 벌크헤드 → 폴백으로 겹겹이 감싸 한 의존성의 장애가 전체로 번지지 않게 해요.', '외부 API는 언제든 느려지거나 실패하므로, 첫 방어는 모든 호출에 타임아웃을 거는 거예요. 일시적 오류(503, 연결 끊김)는 지수 백오프와 무작위 지터로 간격을 두고 재시도하되, 같은 요청을 두 번 해도 안전한(멱등한) 호출에만 해요. 계속 실패하면 서킷 브레이커가 열려 한동안 호출 자체를 막고 즉시 실패시켜, 상대가 회복할 시간을 주고 우리 쪽 자원도 아껴요. 벌크헤드는 의존성마다 동시 호출 수를 따로 제한해서, 결제사가 느려져도 검색이나 로그인이 쓸 스레드와 연결은 남아 있게 해요. 그래도 실패하면 캐시된 값, 기본값, “나중에 처리” 대기열 같은 폴백으로 기능을 줄여서라도 응답해요. 재시도가 겹겹이 쌓이면 재시도 폭주로 상대를 더 괴롭히니, 재시도는 한 계층에서만 하고 전체 시간 예산 안에서 해요.', 'Wrap outbound calls in layers, timeouts, retries, circuit breakers, bulkheads and fallbacks, so one dependency’s failure does not spread.', 'External APIs can slow down or fail at any moment, so the first defense is a timeout on every call. Transient errors such as 503s or dropped connections are retried with exponential backoff and random jitter, but only for calls that are safe to repeat (idempotent). Persistent failure opens a circuit breaker that blocks calls for a while and fails fast, giving the dependency time to recover and saving our resources. Bulkheads cap concurrent calls per dependency, so a slow payment provider leaves threads and connections for search or login. When all else fails, fallbacks such as cached values, defaults or a “process later” queue keep responding in degraded mode. Retries stacked across layers create retry storms that hammer the dependency, so retry at one layer only and within the overall time budget.', sResilience()),
    item('be-payment', '결제 연동', 'Payment integration', '금액은 서버가 정해 저장하고, 승인 직전에 다시 비교하고, 웹훅과 매일의 대사로 최종 상태를 맞춰요. 주문 상태는 상태 기계로 관리해요.', '결제는 보통 “주문 생성 → 결제창 인증 → 서버 승인 → 최종 확인” 흐름이에요. 주문을 PENDING으로 만들 때 결제 금액을 서버가 계산해 저장하고, 클라이언트가 보낸 금액은 믿지 않아요. 결제창 인증 뒤 서버가 PG의 승인 API를 부를 때 저장해 둔 금액과 결제 금액을 다시 비교해서, 브라우저에서 금액을 1,000원으로 바꾸는 조작을 막아요. 승인 응답은 네트워크에서 끊길 수 있으니 결제사의 웹훅이나 조회 API로 최종 상태를 확정하고, 상태 변경은 멱등하게 처리해요. 주문 상태는 PENDING → PAID → CANCELED/REFUNDED처럼 허용된 전이만 가능한 상태 기계로 관리해요. 매일 우리 DB와 PG의 정산 기록을 대조(대사)해서 어긋난 건을 찾아 환불이나 상태 보정을 하고, 카드 정보는 직접 저장하지 않고 PG에 맡겨요.', 'The server sets and stores the amount, re-checks it right before confirming, and reconciles final state through webhooks and daily matching, with order status as a state machine.', 'Payments usually flow from order creation to authentication in the provider’s window, server confirmation and final verification. When the order is created as PENDING, the server computes and stores the amount, never trusting a client-sent value. After authentication, the server re-compares the stored amount with the payment amount before calling the provider’s confirm API, blocking tampering such as changing the price to 1,000 in the browser. Confirmation replies can drop on the network, so final state is settled via the provider’s webhook or lookup API with idempotent status changes. Order status is a state machine allowing only valid transitions such as PENDING → PAID → CANCELED/REFUNDED. Daily reconciliation compares our database with the provider’s settlement records to find mismatches for refunds or corrections, and card data is left to the provider rather than stored.', sPayment()),
    item('be-notifications', '알림 시스템', 'Notification systems', '업무 코드는 notify() 한 줄만 부르고, 알림 시스템이 설정 확인 → 템플릿 → 채널별 큐 → 발송 기록을 맡아요.', '주문, 결제, 배송 코드가 각자 메일과 푸시를 보내면 문구, 수신 동의, 재시도 처리가 제각각이 돼요. 알림을 공용 시스템으로 모으면 업무 코드는 notify(user, \'order.shipped\', data)만 부르면 돼요. 먼저 사용자의 채널 설정, 마케팅 수신 동의, 방해 금지 시간을 확인하고, 템플릿과 사용자의 언어로 메시지를 만들어요 · 문구를 코드에서 분리하면 배포 없이 고칠 수 있어요. 이메일, 푸시, SMS를 채널별 큐로 나누면 한 공급자가 장애여도 다른 채널은 계속 나가고, 실패한 발송은 간격을 두고 재시도해요. 같은 이벤트로 두 번 보내지 않도록 중복 방지 키를 쓰고, 발송·도착·열람 상태를 기록해 문의에 답해요. 비슷한 알림이 쏟아지면 묶어서(다이제스트) 보내고, 수신 거부 링크와 동의 기록은 법적 요구사항이라 꼭 챙겨요.', 'Business code calls a single notify(), and the notification system handles preferences, templates, per-channel queues and delivery logs.', "When order, payment and shipping code each send their own email and push messages, copy, consent and retries become inconsistent. Centralizing notifications lets business code simply call notify(user, 'order.shipped', data). The system first checks channel preferences, marketing consent and quiet hours, then renders templates in the user’s language, and keeping copy out of code allows edits without deploys. Per-channel queues for email, push and SMS keep one provider’s outage from blocking others, and failed sends retry with delays. Dedupe keys prevent sending twice for the same event, and sent, delivered and opened states are logged to answer support questions. Floods of similar notifications are batched into digests, and unsubscribe links and consent records are legal requirements.", sNotifications()),
    item('be-domain-events', '도메인 이벤트', 'Domain events', '“주문이 결제됐다” 같은 사실을 이벤트로 발행하고, 영수증·포인트·창고 알림 같은 후속 작업은 핸들러가 구독해요. 기능을 느슨하게 연결해요.', '결제 처리 코드가 영수증 발송, 포인트 적립, 창고 알림을 모두 직접 부르면 기능이 늘 때마다 결제 코드를 고쳐야 하고 하나의 실패가 전체를 막아요. 도메인 이벤트는 order.markPaid() 같은 상태 변경과 함께 OrderPaid라는 과거형 사실을 기록하고, 저장에 성공한 뒤 발행해요. 각 후속 작업은 핸들러로 이벤트를 구독해서, 결제 코드는 누가 듣는지 몰라도 되고 새 기능은 핸들러만 추가하면 돼요. 저장과 발행을 확실히 함께 하려면 같은 트랜잭션에 아웃박스 행을 써 두고 따로 보내는 패턴을 써요. 서비스 사이로 넓히면 Kafka 같은 메시지 브로커를 통한 이벤트 주도 아키텍처가 돼요. 대신 흐름이 여러 곳에 흩어져 보이니 이벤트 목록과 스키마를 문서화하고 버전을 관리하며, 핸들러는 재실행돼도 안전하게(멱등하게) 만들어요.', 'Publish facts such as “order paid” as events and let follow-ups such as receipts, points and warehouse alerts subscribe as handlers, loosely coupling features.', 'When payment code directly calls receipts, points and warehouse alerts, every new feature means editing payment code, and one failure blocks everything. Domain events record a past-tense fact such as OrderPaid alongside a state change such as order.markPaid(), published after the save succeeds. Each follow-up subscribes as a handler, so payment code need not know who listens and new features only add handlers. To guarantee saving and publishing together, write an outbox row in the same transaction and send it separately. Extended across services, this becomes event-driven architecture over a message broker such as Kafka. In return, flows scatter across places, so document and version the event catalog and schemas, and keep handlers safe to rerun (idempotent).', sDomainEvents()),
    item('be-batch-jobs', '배치 작업', 'Batch jobs', '큰 데이터를 id 순서의 묶음으로 처리하고, 묶음마다 체크포인트를 남기고, 멱등하게 만들고, 쉬어 가며 운영 DB 부하를 조절해요.', '수백만 행을 한 번에 읽으면 메모리가 부족해지고 긴 트랜잭션이 잠금과 복제 지연을 일으켜요. 그래서 WHERE id > 마지막_id ORDER BY id LIMIT 1000처럼 키 기준으로 묶음을 읽어요 · OFFSET 방식은 뒤로 갈수록 느려져요. 묶음을 처리할 때마다 마지막 id를 체크포인트로 저장하면, 중간에 배포나 장애로 멈춰도 그 지점부터 다시 시작해요. 처리 로직을 멱등하게 만들면 체크포인트 직전 묶음이 두 번 처리돼도 결과가 같아요. 묶음 사이에 잠깐 쉬거나 처리 속도를 제한해 운영 DB의 부하와 복제 지연을 지키고, 가능하면 읽기 복제본에서 읽어요. 진행률, 예상 종료 시간, 실패 건수를 기록하고, 본 실행 전에 소량으로 시험 실행(dry run)해 결과를 확인해요.', 'Process large data in id-ordered chunks with checkpoints after each, idempotent logic, and pauses that protect the production database.', 'Reading millions of rows at once exhausts memory, and long transactions cause locking and replication lag. So read chunks by key, as in WHERE id > last_id ORDER BY id LIMIT 1000, since OFFSET slows down as it goes deeper. Saving the last id as a checkpoint after each chunk lets a job interrupted by a deploy or failure resume from that point. Idempotent processing makes the chunk just before the checkpoint harmless if it runs twice. Short pauses between chunks or rate limits protect the production database from load and replication lag, and reading from a replica helps where possible. Progress, ETA and failure counts are logged, and a small dry run precedes the real execution.', sBatchJobs()),
    item('be-cron-distributed', '분산 환경의 정기 작업', 'Scheduled jobs in distributed systems', '인스턴스가 여러 대면 앱 안의 cron도 여러 번 돌아요. 잠금·리더 선출·중앙 스케줄러로 하나만 실행하고, 작업 자체도 멱등하게 만들어요.', '앱에 들어 있는 cron 라이브러리는 인스턴스마다 따로 돌기 때문에, 서버를 3대로 늘리면 매일 새벽 리포트가 3번 만들어지고 메일도 3번 나가요. 가장 간단한 해결은 실행 직전에 Redis SET NX나 DB 잠금으로 잠금을 얻은 인스턴스 하나만 실행하고 나머지는 건너뛰게 하는 거예요. 잠금에는 만료 시간을 두어 실행 중 죽어도 풀리게 하고, 작업이 길면 주기적으로 연장해요. 잠금이 만료된 뒤 겹칠 수 있으니 작업 자체도 멱등하게 만들어 두 번 돌아도 결과가 같게 해요. 쿠버네티스 CronJob, BullMQ의 반복 작업, 리더 선출처럼 실행을 한 곳에서 정하는 방식도 좋아요. 실행 이력을 남겨 서버가 내려가 있던 시간에 놓친 실행을 찾아 보충하고, 시간대와 서머타임 처리를 명확히 해요.', 'With several instances, in-app crons run several times; use locks, leader election or a central scheduler so only one runs, and keep the job itself idempotent.', 'In-app cron libraries run on every instance, so scaling to three servers builds the nightly report three times and sends its email three times. The simplest fix has instances take a Redis SET NX or database lock right before running, letting one run while others skip. Locks get an expiry so they release if the holder dies, extended periodically for long jobs. Since runs may overlap after a lock expires, the job itself should be idempotent, giving the same result if run twice. Centralizing schedules with Kubernetes CronJobs, BullMQ repeatable jobs or leader election also works. Run history helps catch and backfill executions missed while servers were down, and time zones and daylight saving must be handled explicitly.', sCronDist())
  ]),
  sec('be-ops', '운영과 성능', 'Operations & performance', '측정하고 개선하기', 'Measuring and improving', '부하 테스트로 한계를 재고, 프로파일링·트레이싱·힙 분석·쿼리 통계로 병목을 찾는 방법이에요.', 'Measuring limits with load tests and finding bottlenecks with profiling, tracing, heap analysis and query statistics.', [
    item('be-load-testing', '부하 테스트', 'Load testing', 'k6 같은 도구로 사용자를 서서히 늘리며 처리량과 지연을 재요. 처리량은 멈추고 지연만 치솟는 포화 지점에서 병목을 찾아요.', '부하 테스트는 출시 전에 “몇 명까지 버티는가”를 숫자로 확인하는 일이에요. k6 스크립트로 2분 동안 가상 사용자를 200명까지 늘리고 5분 유지하는 식의 단계를 정하고, thresholds에 “p95 지연 300ms 미만, 오류율 1% 미만” 같은 기준을 걸어 넘으면 실패하게 해요. 부하를 올리면 처음엔 처리량(RPS)이 함께 늘다가, 어느 순간 처리량은 멈추고 지연만 치솟는 포화 지점(무릎)이 나와요 · 그때 CPU, DB 연결, 잠금 대기 같은 서버 지표를 함께 봐야 원인을 찾아요. 의미 있는 결과를 얻으려면 운영과 비슷한 데이터 크기와 인프라에서, 로그인·검색·주문처럼 실제 사용자 흐름을 닮은 시나리오로 돌려요. 갑작스러운 급증(스파이크)과 몇 시간 동안의 지속 부하(soak)는 따로 테스트해 메모리 누수 같은 문제도 찾아요.', 'Load testing tools such as k6 ramp users up while measuring throughput and latency, revealing bottlenecks at the saturation point where throughput stalls and latency soars.', 'Load testing confirms in numbers how much traffic a system handles before launch. A k6 script defines stages such as ramping to 200 virtual users over 2 minutes and holding for 5, with thresholds such as “p95 under 300 ms, errors under 1%” that fail the run when exceeded. As load rises, throughput (RPS) first grows with it, then reaches a saturation point (the knee) where throughput stalls and latency soars, and server metrics such as CPU, database connections and lock waits reveal why. Meaningful results need production-like data volume and infrastructure and scenarios mirroring real flows such as login, search and checkout. Sudden spikes and hours-long soak tests run separately, catching problems such as memory leaks.', sLoadTest()),
    item('be-profiling', '프로파일링', 'Profiling', '짐작 대신 프로파일러로 CPU 시간을 기록하고, 플레임 그래프에서 가장 넓은 꼭대기 막대를 고쳐요. 고친 뒤 다시 측정해요.', '느린 원인을 짐작으로 고치면 엉뚱한 곳을 최적화하느라 시간을 쓰기 쉬워요. node --cpu-prof, 0x, Go의 pprof, Java의 async-profiler 같은 도구로 실제 CPU 사용을 기록해요. 플레임 그래프는 아래가 호출한 함수, 위가 불린 함수이고 막대 너비가 그 함수가 CPU를 쓴 시간이에요. 가장 넓은 꼭대기 막대가 진짜 병목으로, 예상과 달리 큰 객체를 JSON으로 직렬화하거나 정규식, 로깅에서 시간을 다 쓰는 경우가 흔해요. 고친 뒤에는 같은 부하와 조건으로 다시 측정해 개선을 확인해요. CPU 외에 메모리 할당과 잠금 대기도 프로파일할 수 있고, 운영 환경에서는 부담이 적은 상시 샘플링 프로파일러로 실제 트래픽의 병목을 봐요. 대부분의 지연은 I/O 대기라서 CPU 프로파일과 함께 트레이스도 봐야 전체 그림이 나와요.', 'Instead of guessing, record CPU time with a profiler and fix the widest top bar in the flame graph, then remeasure.', 'Fixing slowness by guesswork easily spends time optimizing the wrong place. Tools such as node --cpu-prof, 0x, Go’s pprof or Java’s async-profiler record real CPU usage. In a flame graph, callers sit below and callees above, and bar width shows the CPU time of that function. The widest top bar is the real hotspot, and surprisingly often it is serializing a large object to JSON, regular expressions or logging. After fixing, remeasure under the same load and conditions to confirm the gain. Memory allocation and lock waits can be profiled as well, and low-overhead continuous sampling profilers reveal hotspots under real production traffic. Since most latency is I/O waiting, traces complete the picture alongside CPU profiles.', sProfiling()),
    item('be-otel', '코드 계측 (OpenTelemetry)', 'Instrumenting code (OpenTelemetry)', '작업을 스팬으로 감싸 시간·속성·예외를 기록하고, 로그에 trace_id를 남기고, traceparent 헤더로 서비스 간에 이어 붙여요.', 'OpenTelemetry는 트레이스, 메트릭, 로그를 만드는 벤더 중립 표준이에요. tracer.startSpan(\'checkout\')으로 작업을 스팬으로 감싸면 시작·끝 시간과 order.id 같은 속성이 기록되고, 안쪽 작업은 자식 스팬으로 중첩돼 하나의 트레이스가 돼요. 예외를 recordException으로 스팬에 남기면 트레이스 화면에서 어느 단계가 실패했는지 바로 보여요. 구조화 로그에 trace_id를 함께 남기면 느린 트레이스에서 관련 로그로, 로그에서 트레이스로 오갈 수 있어요. 다른 서비스를 HTTP로 부를 때 traceparent 헤더로 trace_id가 전파되어 여러 서비스를 거친 요청이 한 트레이스로 이어져요. HTTP 서버, DB 드라이버, 큐 클라이언트는 자동 계측 패키지로 코드 수정 없이 스팬을 만들 수 있고, 업무 단계는 직접 스팬을 더해요. 속성에 개인정보를 넣지 않고, 샘플링으로 비용을 조절해요.', 'Wrap work in spans that record timing, attributes and exceptions, put trace_id in logs, and connect services through the traceparent header.', "OpenTelemetry is a vendor-neutral standard for producing traces, metrics and logs. Wrapping work with tracer.startSpan('checkout') records start and end times and attributes such as order.id, with inner work nesting as child spans into one trace. recordException attaches errors to spans so the trace view shows which step failed. Logging the trace_id in structured logs lets you jump between slow traces and their logs. When calling other services over HTTP, the traceparent header propagates the trace_id, joining a request across services into one trace. HTTP servers, database drivers and queue clients get spans without code changes through auto-instrumentation, while business steps get manual spans. Keep personal data out of attributes and control cost with sampling.", sOtel()),
    item('be-memory-leak', '메모리 누수 찾기', 'Finding memory leaks', 'GC 후에도 메모리 바닥이 계속 올라가면 누수예요. 힙 스냅숏 두 개를 비교해 늘어나는 객체와 그것을 붙잡는 참조를 찾아요.', '가비지 컬렉터가 있어도 어딘가에서 객체를 계속 참조하면 메모리는 회수되지 않아요. 메모리 그래프는 GC 때마다 톱니처럼 내려가는데, 내려간 바닥이 시간이 지날수록 올라가면 누수 신호예요 · 결국 OOM으로 재시작돼요. 시간 차를 두고 힙 스냅숏 두 개를 떠서 비교하면 개수가 계속 늘어나는 객체와, 그것을 붙잡고 있는 참조 경로(retainer)가 보여요. 가장 흔한 원인은 상한 없는 Map 캐시, 제거하지 않은 이벤트 리스너와 타이머, 요청 데이터를 붙잡는 전역 배열이나 클로저예요. 캐시는 최대 개수와 만료 시간이 있는 LRU로 바꾸고, 리스너는 등록한 곳에서 반드시 해제해요. 키 객체가 사라지면 함께 정리되는 WeakMap도 도움이 돼요. 메모리 사용량에 알림을 걸어 재시작이 반복되기 전에 알아채요.', 'If the memory floor keeps rising after garbage collection, it is a leak; diff two heap snapshots to find the growing objects and the references holding them.', 'Even with a garbage collector, memory is never reclaimed while something still references objects. Memory saws down at each collection, and a floor that rises over time signals a leak that ends in out-of-memory restarts. Taking two heap snapshots some time apart and comparing them shows which objects keep multiplying and the retainer paths holding them. The usual causes are unbounded Map caches, event listeners and timers never removed, and global arrays or closures holding request data. Replace caches with an LRU bounded by size and TTL, and always remove listeners where they were added. A WeakMap, whose entries vanish with their keys, also helps. Alert on memory usage to catch leaks before restarts become routine.', sMemLeak()),
    item('be-slow-query', '느린 쿼리 찾기', 'Finding slow queries', 'pg_stat_statements와 느린 쿼리 로그로 쿼리별 호출 수와 시간을 모아 누적 시간 순으로 우선순위를 정하고, 실행 계획을 보고 고쳐요.', 'DB가 느려지면 먼저 어떤 쿼리가 시간을 쓰는지 데이터로 확인해요. PostgreSQL의 pg_stat_statements는 같은 모양의 쿼리를 묶어 호출 수, 평균 시간, 누적 시간을 모아 주고, log_min_duration_statement는 기준 시간을 넘는 쿼리를 로그로 남겨요(MySQL은 slow query log). 한 번에 2ms인 쿼리도 120만 번 불리면 가끔 도는 4초짜리 리포트보다 DB를 훨씬 많이 쓰므로, 누적 시간 순으로 우선순위를 정해요. 범인을 찾으면 EXPLAIN ANALYZE로 실제 실행 계획을 보고 인덱스 추가, 쿼리 수정, 결과 캐시, 호출 횟수 줄이기(N+1 제거) 중에서 고쳐요. 고친 뒤 통계를 초기화하고 같은 기간을 다시 비교해 효과를 확인해요. 인덱스는 쓰기 비용과 저장 공간을 늘리니 읽기 이득과 균형을 봐요.', 'Collect per-query calls and timings with pg_stat_statements and slow query logs, prioritize by total time, and fix after reading execution plans.', 'When the database slows down, first confirm with data which queries consume time. PostgreSQL’s pg_stat_statements groups queries by shape and tracks calls, mean time and total time, while log_min_duration_statement logs queries over a threshold (MySQL has the slow query log). A 2 ms query called 1.2 million times uses far more of the database than an occasional 4-second report, so prioritize by total time. Once found, EXPLAIN ANALYZE shows the real plan, guiding a choice among adding indexes, rewriting queries, caching results or reducing calls (removing N+1). After fixing, reset the statistics and compare the same period again to confirm the effect. Indexes add write cost and storage, so weigh them against read gains.', sSlowQuery())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
})();
