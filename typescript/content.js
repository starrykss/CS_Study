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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'tsx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono tsx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono tsx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c tsx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono tsx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c tsx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'tsx-s tsx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono tsx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono tsx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono tsx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono tsx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono tsx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'tsx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'tsx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'tsx-xs tsx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono tsx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'tsx-a', g: 'tsx-g', r: 'tsx-r', w: 'tsx-w', m: 'cz-mono', s: 'tsx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'tsx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono tsx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono tsx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'tsx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.tsx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.tsx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.tsx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.tsx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.tsx-r .in{color:var(--danger);font-weight:800}
.tsx-g .in{color:var(--ok);font-weight:800}
.tsx-a .in{color:var(--accent);font-weight:800}
.tsx-w .in{color:var(--warn);font-weight:800}
.tsx-c .in{font-size:.6em;font-weight:700}
.tsx-c2 .in{font-size:.5em;font-weight:700}
.tsx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.tsx-wr .in{white-space:normal!important}
.tsx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.tsx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== TypeScript · 1. type basics ===== */
function sWhy() {
  return CW('ts-why', {
    code: ['type Item = { name: string; price: number };', 'function total(items: Item[]): number {', '  return sum(items.map((x) => x.price));', '}', 'total([{ name: "pen", price: "3" }]);', '//                            ~~~', 'const n = total([]);   // n: number'],
    hl: [[0, 1], [4, 2, 'danger'], null, [6, 1, 'ok']],
    side: [
      [[['타입 = 값의 모양에 대한 약속', 'a type is a promise about a value’s shape'], 'a'], [['Item은 name과 price를 가져야 해요', 'an Item must have name and price'], '']],
      [[['실행 전에 편집기에서 빨간 줄', 'a red squiggle before anything runs'], 'r'], [['string은 number 자리에 못 들어가요', 'a string cannot go where a number belongs'], ''], [['JS였다면 "03"이 조용히 나왔을 거예요', 'plain JS would quietly return "03"'], 'w']],
      [[['tsc는 타입을 지운 JS를 내보내요', 'tsc emits JS with the types erased'], 'a'], [['실행 시점엔 타입이 없어요', 'no types exist at run time'], 'w']],
      [[['자동 완성·정의로 이동·이름 바꾸기', 'autocomplete, go-to-definition, renames'], 'g'], [['타입이 문서 역할도 해요', 'types double as documentation'], '']]
    ],
    draw: (S) => {
      const Y = 10.2, xs = [1.0, 8.8, 16.6, 24.4];
      [['.ts 코드', '.ts source'], ['타입 검사', 'type check'], ['.js 출력', '.js output'], ['브라우저 · Node.js', 'browser, Node.js']].forEach((t, i) => chip(S, 'p' + i, xs[i], Y, 6.4, t, i === 0 ? 'accent' : 'line', 0, { pct: 14 }));
      [0, 1, 2].forEach(i => arw(S, 'pa' + i, [xs[i] + 6.5, Y + .55], [xs[i + 1] - .1, Y + .55], 0));
      tsets(S, 'p1', [[2, 'danger', 40], [3, 'ok', 30]]); tsets(S, 'p2', [[3, 'ok', 40]]);
      lbl(S, 'e2', xs[1], Y + 1.4, ['여기서 오류를 잡아요', 'errors are caught here'], 'r', 2, { off: 3 });
      lbl(S, 'e3', xs[2], Y + 1.4, [': number 같은 표기가 사라져요', 'annotations such as : number are gone'], 'g', 3, { off: 4 });
    },
    notes: [['타입은 값이 어떤 모양이어야 하는지에 대한 약속이에요 · Item은 name과 price를 가져요', 'a type is a promise about what shape a value has; an Item has a name and a price'], ['price에 문자열을 넣으면 실행하기도 전에 편집기에 빨간 줄이 생겨요', 'putting a string into price draws a red squiggle before anything runs'], ['컴파일러는 타입 검사를 마친 뒤 타입을 지운 평범한 JS를 내보내요', 'after checking, the compiler emits plain JavaScript with the types erased'], ['타입 덕분에 편집기가 자동 완성, 정의로 이동, 안전한 이름 바꾸기를 해 줘요', 'types also power autocomplete, go-to-definition and safe renames']],
    fin: [['TypeScript: 자바스크립트에 정적 타입을 더한 언어 · 컴파일하면 평범한 JS가 돼요', 'TypeScript adds static types to JavaScript and compiles to plain JavaScript', 'tsx-xs tsx-a'], ['타입 검사는 컴파일 시점에만 · 외부 데이터는 런타임 검증이 따로 필요해요', 'type checking happens only at compile time; external data needs runtime validation'], ['기존 JS 프로젝트에 파일 단위로 조금씩 도입할 수 있어요', 'it can be adopted file by file in an existing JavaScript project']],
    caps: [['타입은 모양의 약속', 'Types describe shapes'], ['실행 전에 잡는 오류', 'Errors before running'], ['타입 지우기', 'Type erasure'], ['편집기의 도움', 'Editor support'], ['왜 TypeScript인가', 'Why TypeScript']]
  });
}

function sInfer() {
  return CW('ts-inference', {
    code: ['let count = 0;            // number', 'const mode = "dark";      // "dark"', 'let theme = "dark";       // string', 'const nums = [1, 2, 3];   // number[]', 'const user = { id: 1, name: "Kim" };', '// { id: number; name: string }', 'nums.map((n) => n * 2);   // n: number', 'function add(a: number, b: number) {', ['  return a + b;           // 반환: number', '  return a + b;           // returns number'], '}', ['let x;                    // any (주의)', 'let x;                    // any (careful)']],
    hl: [[0, 3], [3, 3, 'ok'], [6, 4], [10, 1, 'warn']],
    side: [
      [[['초기값을 보고 타입을 정해요', 'the type comes from the initial value'], 'a'], [['const는 바뀌지 않으니 리터럴 "dark"', 'const never changes: the literal "dark"'], ''], [['let은 바뀔 수 있어 넓게 string', 'let can change, so it widens to string'], '']],
      [[['배열·객체도 원소에서 추론', 'arrays and objects infer from contents'], 'a'], [['같은 모양을 두 번 적지 않아요', 'no need to write the shape twice'], 'g']],
      [[['문맥 추론: 콜백의 n은 number', 'contextual typing: the callback’s n'], 'a'], [['반환 타입도 본문에서 추론', 'return types come from the body'], ''], [['매개변수는 직접 적어요', 'parameters still need annotations'], 'w']],
      [[['초기값 없는 let은 any', 'a let without a value is any'], 'r'], [['noImplicitAny로 막아요', 'noImplicitAny forbids it'], 'g']]
    ],
    notes: [['초기값을 보고 변수의 타입을 스스로 정해요 · const는 리터럴, let은 넓은 타입이 돼요', 'TypeScript infers types from initial values: const gets a literal type and let a wider one'], ['배열과 객체도 안의 값으로 추론해서, 같은 모양을 두 번 적을 필요가 없어요', 'arrays and objects are inferred from their contents, so shapes need not be written twice'], ['콜백 매개변수는 놓인 자리(문맥)로, 반환 타입은 함수 본문으로 추론돼요', 'callback parameters are inferred from context and return types from the function body'], ['초기값 없는 let이나 표기 없는 매개변수는 any가 되니 strict 설정으로 막아요', 'a let without a value or an unannotated parameter becomes any, which strict settings forbid']],
    fin: [['타입 추론: 표기가 없어도 값과 문맥으로 타입을 정하는 기능', 'type inference works out types from values and context without annotations', 'tsx-xs tsx-a'], ['좋은 습관: 매개변수와 공개 API엔 표기, 지역 변수는 추론에 맡기기', 'a good habit: annotate parameters and public APIs, and let inference handle locals'], ['마우스를 올리면 편집기가 추론된 타입을 보여줘요', 'hovering in the editor shows the inferred type']],
    caps: [['초기값으로 추론', 'Inferred from values'], ['배열과 객체', 'Arrays and objects'], ['문맥과 반환 타입', 'Context and return types'], ['암묵적 any', 'Implicit any'], ['타입 추론', 'Type inference']]
  });
}

function sArrays() {
  return CW('ts-arrays', {
    code: ['const ids: number[] = [1, 2, 3];', 'const tags: Array<string> = ["ts"];', ['ids.push("4");   // ✗ string 불가', 'ids.push("4");   // ✗ no strings'], 'const point: [number, number] = [3, 4];', 'const [x, y] = point;          // number', 'type Entry = [key: string, value: number];', 'const list: readonly string[] = ["a"];', 'list.push("b");  // ✗ readonly', ['const [v, setV] = useState(0); // 튜플', 'const [v, setV] = useState(0); // a tuple']],
    hl: [[0, 3], [3, 3, 'ok'], [6, 2, 'warn'], [8, 1]],
    side: [
      [['T[] 또는 Array<T>', 'm a'], [['모든 원소가 같은 타입', 'every element has the same type'], ''], [['다른 타입을 넣으면 오류', 'other types are rejected'], 'r']],
      [[['튜플: 길이와 자리별 타입이 고정', 'tuples fix length and per-slot types'], 'a'], [['이름 붙인 튜플로 뜻을 적어요', 'labeled tuples document meaning'], '']],
      [[['readonly 배열엔 변경 메서드가 없어요', 'readonly arrays have no mutators'], 'a'], [['함수 매개변수로 받을 때 좋아요', 'great for function parameters'], 'g']],
      [[['useState가 튜플을 돌려줘서', 'useState returns a tuple, so'], 'a'], [['이름을 자유롭게 붙여요', 'you name the parts freely'], 'g']]
    ],
    notes: [['배열 타입은 number[]나 Array<number>로 적고, 모든 원소가 같은 타입이어야 해요', 'array types are written number[] or Array<number>, and every element shares the type'], ['튜플은 [number, number]처럼 길이와 자리별 타입이 정해진 배열 · 좌표나 키-값 쌍에 써요', 'a tuple such as [number, number] fixes the length and each slot’s type, as for coordinates or key-value pairs'], ['readonly 배열은 push·sort 같은 변경 메서드가 없어 실수로 원본을 바꾸지 않아요', 'readonly arrays lack push and sort, preventing accidental mutation'], ['React의 useState가 [값, 설정 함수] 튜플을 돌려주는 덕분에 이름을 마음대로 붙여요', 'React’s useState returns a [value, setter] tuple, so you can name both freely']],
    fin: [['배열은 같은 타입의 목록, 튜플은 자리마다 타입이 정해진 고정 길이 목록', 'an array is a list of one type; a tuple is a fixed-length list with a type per position', 'tsx-xs tsx-a'], ['as const를 붙이면 배열 리터럴이 readonly 튜플로 추론돼요', 'as const infers an array literal as a readonly tuple'], ['인덱스 접근은 기본적으로 undefined를 무시해요 · noUncheckedIndexedAccess로 켜요', 'indexing ignores undefined by default; enable noUncheckedIndexedAccess to check it']],
    caps: [['배열 타입', 'Array types'], ['튜플', 'Tuples'], ['readonly 배열', 'Readonly arrays'], ['튜플을 돌려주는 API', 'APIs that return tuples'], ['배열과 튜플', 'Arrays and tuples']]
  });
}

function sAnyUnknown() {
  return CW('ts-anyunknown', {
    code: ['let a: any = JSON.parse(text);', ['a.foo.bar();   // 검사 없음 → 런타임 오류', 'a.foo.bar();   // unchecked: may crash'], 'let u: unknown = JSON.parse(text);', ['u.foo;         // ✗ 먼저 확인하세요', 'u.foo;         // ✗ check it first'], 'if (typeof u === "string") u.toUpperCase();', '', 'function fail(msg: string): never {', '  throw new Error(msg);', '}'],
    hl: [[0, 2, 'danger'], [2, 2, 'warn'], [4, 1, 'ok'], [6, 3]],
    draw: (S) => {
      const X = 19.4, cx = X + 6.0;
      chip(S, 'tu', X + 2.6, .8, 6.8, ['unknown · 모든 값', 'unknown · every value'], 'accent', 0, { pct: 14 });
      ['string', 'number', 'object'].forEach((t, i) => { chip(S, 'm' + i, X + i * 4.1, 3.2, 3.6, t, 'line', 0, { pct: 10 }); arw(S, 'up' + i, [X + i * 4.1 + 1.8, 3.2], [cx + (i - 1) * 1.2, 1.95], 0, { color: 'ink-3', h: .08 }); arw(S, 'dn' + i, [cx + (i - 1) * 1.2, 5.6], [X + i * 4.1 + 1.8, 4.35], 0, { color: 'ink-3', h: .08 }); });
      chip(S, 'tv', X + 2.6, 5.6, 6.8, ['never · 값이 없음', 'never · no values'], 'line', 0, { pct: 10 });
      chip(S, 'ta', X, 7.6, 3.6, 'any', 'danger', 0, { pct: 16 }); lbl(S, 'tal', X + 4.1, 7.75, ['검사를 끄는 탈출구', 'an escape hatch from checking'], 'r', 0);
      tsets(S, 'ta', [[1, 'danger', 45], [2, 'danger', 16]]); tsets(S, 'tu', [[2, 'accent', 40], [3, 'accent', 14]]); tsets(S, 'm0', [[3, 'ok', 40], [4, 'line', 10]]); tsets(S, 'tv', [[4, 'warn', 40]]);
      arw(S, 'nar', [cx - 1.2, 1.95], [X + 1.8, 3.2], 3, { color: 'ok', off: 4 });
      lbl(S, 'l1', X, 9.6, ['any: 무엇이든 되고, 아무것도 검사 안 함', 'any: anything goes, nothing is checked'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'l2', X, 9.6, ['unknown: 다 받지만 쓰기 전에 확인', 'unknown: accepts all, check before use'], 'a', 2, { off: 3, w: 12 });
      lbl(S, 'l3', X, 9.6, ['typeof로 좁히면 string으로 사용', 'narrowed by typeof, usable as string'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'l4', X, 9.6, ['never: 절대 돌아오지 않는 함수', 'never: a function that never returns'], 'w', 4, { w: 12 });
    },
    notes: [['any는 타입 검사를 꺼 버려요 · 오타도 잘못된 호출도 통과해 런타임에야 터져요', 'any switches checking off, so typos and bad calls pass and fail only at run time'], ['unknown도 모든 값을 받지만, 확인하기 전에는 아무 작업도 허락하지 않아요', 'unknown also accepts any value but allows nothing until you check it'], ['typeof 같은 검사로 좁히면 그 블록 안에서 안전하게 쓸 수 있어요', 'narrowing with a check such as typeof makes it safe inside that block'], ['never는 값이 하나도 없는 타입 · 항상 throw하는 함수나 불가능한 분기에 나타나요', 'never is the type with no values, seen in functions that always throw and in impossible branches']],
    fin: [['unknown은 모든 타입의 위(top), never는 아래(bottom), any는 검사를 끄는 예외', 'unknown is the top type, never the bottom type, and any an exception that disables checking', 'tsx-xs tsx-a'], ['외부 입력(JSON, API 응답)은 any 대신 unknown으로 받고 검증해요', 'receive external input such as JSON or API responses as unknown and validate it'], ['strict에서는 catch (e)의 e도 unknown이에요', 'in strict mode, the e in catch (e) is unknown too']],
    caps: [['any', 'any'], ['unknown', 'unknown'], ['좁혀서 사용', 'Narrow before use'], ['never', 'never'], ['any·unknown·never', 'any, unknown and never']]
  });
}

function sUnion() {
  return CW('ts-union', {
    code: ['type Status = "idle" | "loading" | "error";', 'let s: Status = "idle";', ['s = "done";          // ✗ 없는 값', 's = "done";          // ✗ not allowed'], 'type Id = string | number;', 'function show(id: Id) {', ['  id.toUpperCase();  // ✗ number일 수도', '  id.toUpperCase();  // ✗ may be a number'], ['  String(id);        // ✓ 둘 다 가능', '  String(id);        // ✓ works for both'], '}', 'type Size = 8 | 16 | 24;'],
    hl: [[0, 3], [3, 2, 'warn'], [5, 2], [8, 1, 'ok']],
    side: [
      [[['리터럴 타입: 정확히 그 값만', 'literal types: exactly that value'], 'a'], [['|로 묶으면 그중 하나', '| means one of them'], ''], [['오타를 컴파일 시점에 잡아요', 'typos are caught at compile time'], 'g']],
      [[['string | number: 둘 중 하나', 'string | number: either one'], 'a'], [['값의 집합으로 보면 합집합', 'as sets of values, a union'], '']],
      [[['양쪽 모두 되는 것만 허용', 'only what works for both'], 'w'], [['한쪽으로 쓰려면 먼저 좁혀요', 'narrow first to use one side'], '']],
      [[['숫자 리터럴도 가능', 'numeric literals work too'], 'a'], [['편집기가 후보를 자동 완성', 'the editor autocompletes options'], 'g']]
    ],
    draw: (S) => {
      frame(S, 'uf', 19.8, 5.4, 11.4, 5.8, 'accent', 2, { w: .08, dash: 1 }); lbl(S, 'ufl', 20.1, 5.55, 'string | number', 'm a', 2);
      stt(S, 'vs', 22.7, 8.6, 'string', 'ok', 2, { r: 1.9, pct: 12 }); stt(S, 'vn', 28.3, 8.6, 'number', 'warn', 2, { r: 1.9, pct: 12 });
      lbl(S, 'cm', 19.8, 11.6, ['공통: String(id), id.toString()', 'shared: String(id), id.toString()'], 'm', 3, { off: 4 });
    },
    notes: [['리터럴 타입은 "idle"처럼 정확한 값 하나이고, |로 묶으면 그중 하나만 허용해요', 'a literal type is one exact value such as "idle", and | allows exactly one of several'], ['string | number는 두 타입 값의 합집합이에요 · id에는 문자열도 숫자도 올 수 있어요', 'string | number is the union of both sets of values, so id may be either'], ['그래서 한쪽에만 있는 메서드는 바로 못 써요 · 둘 다 가능한 일만 허용돼요', 'methods that exist on only one side are rejected; only shared operations are allowed'], ['숫자 리터럴 유니언도 되고, 편집기가 허용되는 값을 자동 완성해 줘요', 'numeric literal unions work too, and the editor autocompletes the allowed values']],
    fin: [['유니언 타입: 여러 타입 중 하나 · 리터럴 유니언은 enum 대신 가장 많이 쓰는 방식', 'a union type is one of several types; literal unions are the most common alternative to enums', 'tsx-xs tsx-a'], ['쓰기 전에 typeof, in, 판별 속성으로 좁혀요', 'narrow with typeof, in or a discriminant before use'], ['유니언이 커지면 판별 유니언으로 구조화해요', 'when unions grow, structure them as discriminated unions']],
    caps: [['리터럴 유니언', 'Literal unions'], ['타입의 합집합', 'A union of types'], ['공통 연산만', 'Shared operations only'], ['숫자 리터럴과 자동 완성', 'Numeric literals and autocomplete'], ['유니언과 리터럴 타입', 'Unions and literal types']]
  });
}

function sNarrow() {
  return CW('ts-narrowing', {
    code: ['type V = string | number | Date | null;', 'function fmt(v: V) {', '  if (v === null) return "-";', '  if (typeof v === "string") return v.trim();', '  if (v instanceof Date) return v.toJSON();', '  return v.toFixed(2);   // v: number', '}', 'function area(s: Circle | Square) {', '  if ("r" in s) return Math.PI * s.r ** 2;', '  return s.size ** 2;', '}'],
    hl: [[2, 1], [3, 1], [4, 2, 'ok'], [7, 3]],
    draw: (S) => {
      const X = 19.2, W = 12.0;
      const rows = ['string | number | Date | null', 'string | number | Date', 'number | Date', 'number'];
      rows.forEach((t, i) => chip(S, 'c' + i, X, .6 + i * 2.0, W, t, i === 3 ? 'ok' : 'line', i, { pct: i === 3 ? 30 : 10, off: 4 }));
      [['null 제외', 'minus null'], ['string 제외', 'minus string'], ['Date 제외', 'minus Date']].forEach((t, i) => { arw(S, 'ca' + i, [X + 1.2, 1.7 + i * 2.0], [X + 1.2, 2.6 + i * 2.0], i + 1, { color: 'warn', off: 4 }); lbl(S, 'cl' + i, X + 1.8, 1.75 + i * 2.0, t, 'w', i + 1, { off: 4 }); });
      lbl(S, 'n1', X, 8.6, ['검사를 지날 때마다 남은 타입이 줄어요', 'each check shrinks what remains'], 'a', 1, { off: 4 });
      chip(S, 'd0', X, .6, W, 'Circle | Square', 'line', 4, { pct: 10 });
      chip(S, 'd1', X, 3.0, 5.6, 'Circle', 'ok', 4); chip(S, 'd2', X + 6.4, 3.0, 5.6, 'Square', 'warn', 4);
      arw(S, 'da1', [X + 3.0, 1.7], [X + 2.8, 3.0], 4, { color: 'ok' }); arw(S, 'da2', [X + 9.0, 1.7], [X + 9.2, 3.0], 4, { color: 'warn' });
      lbl(S, 'dl1', X, 4.5, '"r" in s', 'm g', 4); lbl(S, 'dl2', X + 6.4, 4.5, 'else', 'm w', 4);
    },
    notes: [['유니언 값은 검사를 지날 때마다 남은 가능성이 줄어요 · null을 먼저 걸러 내요', 'each check on a union removes possibilities; null is filtered out first'], ['typeof 검사 블록 안에서 v는 string이라 문자열 메서드를 쓸 수 있어요', 'inside a typeof check, v is a string and string methods are available'], ['instanceof로 Date까지 거르면 마지막엔 number만 남아요 · 이것이 제어 흐름 분석이에요', 'once instanceof removes Date, only number remains; this is control-flow analysis'], ['in 연산자는 속성이 있는지로 객체 유니언을 좁혀요', 'the in operator narrows object unions by checking for a property']],
    fin: [['타입 좁히기: 조건문을 보고 블록마다 더 구체적인 타입을 알아내는 것', 'narrowing works out a more specific type in each block from the conditions', 'tsx-xs tsx-a'], ['도구: typeof, instanceof, in, ===, Array.isArray, 판별 속성, 타입 가드', 'tools: typeof, instanceof, in, ===, Array.isArray, discriminants and type guards'], ['typeof null === "object"라서 객체 검사 전에 null을 먼저 걸러요', 'typeof null is "object", so filter null before object checks']],
    caps: [['null 걸러 내기', 'Filtering null'], ['typeof', 'typeof'], ['instanceof와 남은 타입', 'instanceof and what remains'], ['in 연산자', 'The in operator'], ['타입 좁히기', 'Narrowing']]
  });
}

function sInterface() {
  return CW('ts-interface', {
    code: ['interface User {', '  id: number;', '  name: string;', '}', 'interface Admin extends User { role: "admin" }', ['interface User { email?: string }  // 병합', 'interface User { email?: string }  // merged'], 'type Point = { x: number; y: number };', ['type Id = string | number;      // 유니언', 'type Id = string | number;      // a union'], 'type Admin2 = User & { role: "admin" };'],
    hl: [[0, 4], [4, 1], [5, 1, 'warn'], [6, 3, 'ok']],
    side: [
      [[['interface: 객체 모양에 이름 붙이기', 'interface names an object shape'], 'a'], [['속성마다 이름과 타입', 'a name and type per property'], '']],
      [[['extends로 확장', 'extend with extends'], 'a'], [['User의 모든 속성 + role', 'everything in User plus role'], '']],
      [[['같은 이름이면 선언이 합쳐져요', 'same-named declarations merge'], 'w'], [['라이브러리 타입 보강에 써요', 'used to augment library types'], '']],
      [[['type은 무엇에든 이름을 붙여요', 'type can name anything'], 'g'], [['유니언·튜플·함수 타입', 'unions, tuples, function types'], ''], [['확장은 &(교차 타입)로', 'extend with & (intersection)'], '']]
    ],
    notes: [['interface는 객체가 어떤 속성을 가져야 하는지에 이름을 붙여요', 'an interface names the properties an object must have'], ['extends로 다른 interface를 이어받아 확장해요', 'extends builds on another interface'], ['같은 이름의 interface를 다시 선언하면 자동으로 합쳐져요(선언 병합)', 'redeclaring an interface with the same name merges the declarations'], ['type 별칭은 객체뿐 아니라 유니언·튜플·함수 타입 등 무엇에든 이름을 붙이고, &로 합쳐요', 'a type alias can name anything, including unions, tuples and function types, and combines with &']],
    fin: [['객체 모양엔 둘 다 OK · 유니언과 조합은 type, 확장과 병합이 필요하면 interface', 'both work for object shapes; use type for unions and compositions, interface for extension and merging', 'tsx-xs tsx-a'], ['팀 안에서 한 가지 규칙으로 통일하는 게 더 중요해요', 'agreeing on one convention matters more than the choice'], ['interface 확장은 속성 충돌을 오류로 알려 줘 큰 계층 구조에 유리해요', 'interface extension reports property conflicts as errors, which helps large hierarchies']],
    caps: [['interface', 'interface'], ['extends', 'extends'], ['선언 병합', 'Declaration merging'], ['type 별칭', 'Type aliases'], ['interface와 type', 'interface and type']]
  });
}

function sOptional() {
  return CW('ts-optional', {
    code: ['interface Post {', '  readonly id: number;', '  title: string;', '  subtitle?: string;     // string | undefined', '}', 'const p: Post = { id: 1, title: "TS" };', 'p.id = 2;                // ✗ readonly', ['p.subtitle.length;       // ✗ 없을 수도', 'p.subtitle.length;       // ✗ may be missing'], 'p.subtitle?.length ?? 0; // ✓', 'const frozen: Readonly<Post> = p;'],
    hl: [[3, 1], [1, 1, 'warn'], [7, 2], [9, 1, 'ok']],
    side: [
      [[['?: 없어도 되는 속성', '?: a property that may be absent'], 'a'], [['타입에 undefined가 더해져요', 'its type gains undefined'], ''], [['p를 만들 때 생략해도 OK', 'fine to omit when creating p'], 'g']],
      [[['readonly: 만든 뒤엔 못 바꿔요', 'readonly: fixed after creation'], 'a'], [['컴파일 시점 검사일 뿐이에요', 'it is a compile-time check only'], 'w']],
      [[['선택적 속성은 확인 후 사용', 'check optional properties first'], 'a'], [['?.와 ??가 짝꿍', '?. and ?? pair up'], 'g']],
      [[['Readonly<T>: 모든 속성을 readonly로', 'Readonly<T> locks every property'], 'a'], [['얕게만 적용돼요', 'it applies shallowly'], 'w']]
    ],
    notes: [['속성 이름 뒤의 ?는 선택적 속성 · 생략해도 되고, 타입에 undefined가 포함돼요', 'a ? after a property name makes it optional: it may be omitted and its type includes undefined'], ['readonly 속성은 만든 뒤 다시 대입할 수 없어요 · 검사는 컴파일 시점에만 해요', 'a readonly property cannot be reassigned after creation; the check is compile-time only'], ['선택적 속성을 그냥 쓰면 오류 · ?.와 ??로 없을 때를 처리해요', 'using an optional property directly is an error; handle absence with ?. and ??'], ['Readonly<Post>는 모든 속성을 한 번에 readonly로 만들어요 · 안쪽 객체까지는 아니에요', 'Readonly<Post> makes every property readonly at once, though not nested objects']],
    fin: [['?는 “없을 수 있음”, readonly는 “바꿀 수 없음”을 타입에 적는 방법', '? records “may be missing” and readonly records “cannot change” in the type', 'tsx-xs tsx-a'], ['exactOptionalPropertyTypes를 켜면 “없음”과 “undefined를 넣음”을 구분해요', 'exactOptionalPropertyTypes distinguishes a missing property from one set to undefined'], ['런타임에도 막으려면 Object.freeze를 함께 써요', 'pair it with Object.freeze to enforce it at run time']],
    caps: [['선택적 속성', 'Optional properties'], ['readonly', 'readonly'], ['안전하게 꺼내기', 'Reading safely'], ['Readonly 유틸리티', 'The Readonly utility'], ['선택적 속성과 readonly', 'Optional and readonly properties']]
  });
}
/* ===== TypeScript · 2. functions and object types ===== */
function sFuncType() {
  return CW('ts-functype', {
    code: ['function greet(name: string, loud?: boolean) {', '  return loud ? name.toUpperCase() : name;', '}', 'type Handler = (e: MouseEvent) => void;', 'const onClick: Handler = (e) => log(e.x);', 'function sum(...nums: number[]): number {…}', 'function parse(x: string): number;', 'function parse(x: string[]): number[];', ['function parse(x: any) { /* 구현 */ }', 'function parse(x: any) { /* impl */ }']],
    hl: [[0, 3], [3, 2, 'ok'], [5, 1], [6, 3, 'warn']],
    side: [
      [[['매개변수와 반환 타입을 적어요', 'annotate parameters and the return'], 'a'], [['?는 생략 가능한 매개변수', '? marks an optional parameter'], ''], [['반환 타입은 대개 추론돼요', 'return types are usually inferred'], '']],
      [[['함수 타입: (인자) => 반환', 'function types: (args) => return'], 'a'], [['콜백 e는 MouseEvent로 추론', 'the callback’s e is a MouseEvent'], 'g'], [['void: 반환값을 쓰지 않음', 'void: the result is not used'], '']],
      [[['나머지 매개변수는 배열 타입', 'rest parameters take an array type'], 'a']],
      [[['오버로드: 호출 모양을 여러 개', 'overloads: several call shapes'], 'w'], [['구현 시그니처는 밖에서 안 보여요', 'the implementation is hidden'], ''], [['유니언으로 되면 그게 더 단순', 'a union is simpler if it works'], 'g']]
    ],
    notes: [['매개변수에 타입을 적고, 반환 타입은 보통 추론에 맡겨요 · ?는 생략할 수 있는 인자예요', 'annotate parameters and usually let the return type be inferred; ? marks an argument that may be omitted'], ['함수 타입 (e: MouseEvent) => void에 이름을 붙여 두면 콜백 매개변수가 자동으로 추론돼요', 'naming a function type such as (e: MouseEvent) => void lets callback parameters be inferred'], ['...nums: number[]처럼 나머지 매개변수는 배열 타입으로 받아요', 'rest parameters such as ...nums: number[] take an array type'], ['오버로드는 입력에 따라 반환 타입이 달라지는 함수를 여러 시그니처로 표현해요', 'overloads describe functions whose return type depends on the input with several signatures']],
    fin: [['함수 타입 = 매개변수 타입 + 반환 타입 · 타입 별칭이나 interface로 이름 붙여요', 'a function type is parameter types plus a return type, named with an alias or an interface', 'tsx-xs tsx-a'], ['void를 돌려주는 함수 타입 자리에 값을 돌려주는 함수를 넣어도 돼요', 'a function that returns a value fits where a void-returning type is expected'], ['this 매개변수로 함수 안 this의 타입도 정할 수 있어요', 'a this parameter declares the type of this inside a function']],
    caps: [['매개변수와 반환', 'Parameters and returns'], ['함수 타입', 'Function types'], ['나머지 매개변수', 'Rest parameters'], ['오버로드', 'Overloads'], ['함수에 타입 붙이기', 'Typing functions']]
  });
}

function sStructural() {
  return CW('ts-structural', {
    code: ['interface Point { x: number; y: number }', 'const draw = (p: Point) => plot(p.x, p.y);', 'const v = { x: 1, y: 2, z: 3 };', ['draw(v);                  // ✓ 모양만 맞으면', 'draw(v);                  // ✓ shape matches'], ['draw({ x: 1, y: 2, z: 3 }); // ✗ 초과 속성', 'draw({ x: 1, y: 2, z: 3 }); // ✗ excess'], 'class Pixel { x = 0; y = 0 }', ['draw(new Pixel());        // ✓ 클래스도', 'draw(new Pixel());        // ✓ classes too']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'danger'], [5, 2, 'ok']],
    draw: (S) => {
      const X = 19.2;
      lbl(S, 'need', X, .6, ['필요한 모양: Point', 'required shape: Point'], 'a', 0);
      chip(S, 'nx', X, 1.7, 2.6, 'x', 'accent', 0); chip(S, 'ny', X + 2.8, 1.7, 2.6, 'y', 'accent', 0);
      lbl(S, 'have', X, 3.4, ['넘긴 값의 모양', 'shape of the argument'], 'a', 2);
      chip(S, 'hx', X, 4.5, 2.6, 'x', 'ok', 2); chip(S, 'hy', X + 2.8, 4.5, 2.6, 'y', 'ok', 2); chip(S, 'hz', X + 5.6, 4.5, 2.6, 'z', 'line', 2, { pct: 10 });
      tsets(S, 'hz', [[3, 'danger', 40], [4, 'line', 10]]);
      lbl(S, 'o2', X, 6.2, ['x, y만 맞으면 통과 · z는 상관없어요', 'x and y suffice; z does not matter'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'o3', X, 6.2, ['리터럴의 z는 오타일 가능성 → 오류', 'z in a fresh literal looks like a typo'], 'r', 3, { off: 4, w: 12 });
      lbl(S, 'o4', X, 6.2, ['이름이 아니라 구조로 비교해요', 'compared by structure, not by name'], 'g', 4); lbl(S, 'o5', X, 7.3, ['Java·C#의 명목적 타이핑과 달라요', 'unlike nominal typing in Java or C#'], '', 4);
    },
    notes: [['draw는 Point를 받아요 · Point는 x와 y가 number인 모양이에요', 'draw takes a Point, the shape with numeric x and y'], ['v에 z가 더 있어도 x와 y가 맞으면 통과해요 · 타입 이름이 아니라 모양을 비교해요', 'v passes despite an extra z because x and y match; shapes are compared, not names'], ['다만 객체 리터럴을 바로 넘기면 초과 속성 검사가 z를 오타로 보고 오류를 내요', 'a fresh object literal, however, triggers the excess property check, which treats z as a likely typo'], ['Pixel 클래스는 Point를 언급한 적이 없지만 모양이 같아서 넘길 수 있어요', 'the Pixel class never mentions Point, yet it fits because the shape matches']],
    fin: [['구조적 타이핑: 이름이나 선언이 아니라 구조(속성과 타입)가 맞으면 호환되는 방식', 'structural typing treats types as compatible when their structure matches, regardless of names or declarations', 'tsx-xs tsx-a'], ['덕분에 JS의 덕 타이핑 관습을 그대로 타입으로 표현해요', 'it captures JavaScript’s duck-typing habits directly'], ['모양이 같지만 뜻이 다른 값(USD, KRW)은 브랜드 타입으로 구분해요', 'same-shaped values with different meanings, such as USD and KRW, need branded types']],
    caps: [['필요한 모양', 'The required shape'], ['모양이 맞으면 통과', 'Matching shapes pass'], ['초과 속성 검사', 'Excess property checks'], ['클래스도 모양으로', 'Classes by shape too'], ['구조적 타이핑', 'Structural typing']]
  });
}

function sIntersect() {
  return CW('ts-intersection', {
    code: ['type Named = { name: string };', 'type Stamped = { createdAt: Date };', 'type Doc = Named & Stamped;', 'const d: Doc = {', '  name: "memo",', '  createdAt: new Date(),', '};', 'type X = string & number;   // never', 'const withId = <T>(o: T) =>', '  ({ ...o, id: crypto.randomUUID() });', ['// 반환: T & { id: string }', '// returns T & { id: string }']],
    hl: [[0, 3], [3, 4, 'ok'], [7, 1, 'danger'], [8, 3]],
    draw: (S) => {
      const X = 19.2;
      chip(S, 'cn', X, .8, 5.4, 'name: string', 'accent', 1, { pct: 16 }); lbl(S, 'amp', X + 5.75, .9, '&', 'm a', 1); chip(S, 'cs', X + 6.6, .8, 5.6, 'createdAt: Date', 'warn', 1, { pct: 16 });
      arw(S, 'ca1', [X + 2.7, 1.95], [X + 4.6, 3.4], 1); arw(S, 'ca2', [X + 9.4, 1.95], [X + 7.6, 3.4], 1);
      lbl(S, 'dl', X, 3.55, 'Doc', 'm a', 1); chip(S, 'cd', X + 2.2, 3.4, 8.0, 'name + createdAt', 'ok', 1, { pct: 24 });
      lbl(S, 'l2', X, 5.2, ['두 모양의 속성을 모두 가져야 해요', 'must have the properties of both'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'l3', X, 5.2, ['string이면서 number인 값은 없음 → never', 'no value is both string and number'], 'r', 3, { off: 4, w: 12 });
      lbl(S, 'l4', X, 5.2, ['제네릭과 함께 “원래 것 + α” 표현', 'with generics: “the input plus extra”'], 'a', 4, { w: 12 });
    },
    notes: [['&는 두 타입을 합쳐요 · Doc은 Named와 Stamped의 속성을 모두 가져요', '& combines two types; Doc has the properties of both Named and Stamped'], ['그래서 Doc 값을 만들 때 name과 createdAt이 모두 있어야 해요', 'so a Doc value must provide both name and createdAt'], ['원시 타입끼리 교차하면 둘 다인 값이 없어서 never가 돼요', 'intersecting primitives leaves no value that is both, so the result is never'], ['제네릭과 함께 쓰면 “받은 객체 + id”처럼 원래 타입에 속성을 더한 결과를 표현해요', 'with generics, it expresses results such as “the input object plus an id”']],
    fin: [['교차 타입 A & B: A이면서 동시에 B인 값 · 객체에선 속성이 합쳐져요', 'an intersection A & B is a value that is both A and B; for objects the properties combine', 'tsx-xs tsx-a'], ['유니언(|)은 “둘 중 하나”, 교차(&)는 “둘 다”', 'a union (|) means “either”, an intersection (&) means “both”'], ['같은 속성의 타입이 충돌하면 그 속성이 never가 되니 주의해요', 'conflicting types for the same property turn that property into never']],
    caps: [['두 모양 합치기', 'Combining shapes'], ['둘 다 만족', 'Satisfying both'], ['never가 되는 교차', 'Intersections that become never'], ['제네릭과 함께', 'With generics'], ['교차 타입', 'Intersection types']]
  });
}

function sEnum() {
  return CW('ts-enum', {
    code: ['enum Dir { Up, Down }          // 0, 1', 'enum Color { Red = "RED" }', 'Dir.Up;                        // 0', ['Dir[0];                        // "Up" 역매핑', 'Dir[0];                        // "Up" (rev.)'], 'const Role = {', '  Admin: "admin",', '  User: "user",', '} as const;', 'type Role = typeof Role[keyof typeof Role];', '// "admin" | "user"'],
    hl: [[0, 2], [2, 2, 'warn'], [4, 4, 'ok'], [8, 2, 'ok']],
    side: [
      [[['enum: 이름 붙인 상수 모음', 'enum: a set of named constants'], 'a'], [['숫자 enum은 0부터 자동 번호', 'numeric enums count from 0'], ''], [['문자열 enum은 값을 직접', 'string enums spell out values'], '']],
      [[['enum은 실제 JS 객체를 만들어요', 'enums emit a real JS object'], 'w'], [['숫자 enum은 역매핑까지 생성', 'numeric ones add a reverse map'], ''], [['타입만 지우는 도구와 충돌', 'clashes with type-stripping tools'], 'r']],
      [[['대안: 객체 + as const', 'alternative: an object with as const'], 'g'], [['값은 readonly 리터럴로 고정', 'values freeze as readonly literals'], '']],
      [[['값에서 유니언 타입을 뽑아요', 'derive a union type from the values'], 'g'], [['평범한 JS라 그대로 실행', 'plain JS that simply runs'], '']]
    ],
    notes: [['enum은 관련 상수에 이름을 붙여요 · 숫자 enum은 0부터 번호가 매겨져요', 'an enum names related constants; numeric enums are numbered from 0'], ['다른 타입 문법과 달리 enum은 실제 객체 코드를 만들어요 · 숫자 enum은 역매핑도 생겨요', 'unlike other type syntax, enums emit real object code, with a reverse map for numeric ones'], ['요즘은 객체 리터럴에 as const를 붙여 같은 일을 평범한 JS로 해요', 'today an object literal with as const does the same job in plain JavaScript'], ['typeof와 keyof로 값에서 "admin" | "user" 유니언 타입을 뽑아 써요', 'typeof and keyof derive the "admin" | "user" union from the values']],
    fin: [['enum은 TS 전용 런타임 문법 · as const 객체나 리터럴 유니언이 더 가볍고 표준에 가까워요', 'enums are TypeScript-only runtime syntax; as const objects and literal unions are lighter and closer to standard JS', 'tsx-xs tsx-a'], ['Node.js의 타입 지우기 실행과 erasableSyntaxOnly 옵션은 enum을 허용하지 않아요', 'Node.js type stripping and the erasableSyntaxOnly option reject enums'], ['const enum은 값을 인라인하지만 라이브러리 경계에서 문제가 생기기 쉬워요', 'const enums inline their values but cause trouble across library boundaries']],
    caps: [['enum', 'enum'], ['런타임에 남는 enum', 'Enums at run time'], ['as const 객체', 'as const objects'], ['값에서 타입 뽑기', 'Types from values'], ['enum과 as const', 'enum and as const']]
  });
}

function sSatisfies() {
  return CW('ts-satisfies', {
    code: ['type Theme = Record<string, string | number>;', 'const a: Theme = { gap: 8, brand: "#36f" };', 'a.gap.toFixed();    // ✗ string | number', ['a.typo;             // 오류 없음', 'a.typo;             // no error'], 'const b = {', '  gap: 8,', '  brand: "#36f",', '} satisfies Theme;', 'b.gap.toFixed();    // ✓ number', ['b.typo;             // ✗ 없는 키', 'b.typo;             // ✗ unknown key'], 'const sz = [8, 16] as const;', '// readonly [8, 16]'],
    hl: [[0, 2], [2, 2, 'danger'], [4, 6, 'ok'], [10, 2]],
    side: [
      [[['타입 표기 = 그 타입으로 “넓혀요”', 'an annotation widens to that type'], 'a']],
      [[['gap이 number인 걸 잊어버려요', 'it forgets that gap is a number'], 'r'], [['없는 키도 허용돼요', 'unknown keys pass too'], 'r']],
      [[['satisfies: 맞는지 검사만', 'satisfies only checks'], 'g'], [['추론된 정확한 타입은 그대로', 'the precise inferred type stays'], ''], [['오타 키도 잡아요', 'typo keys are caught'], 'g']],
      [[['as const: 가장 좁은 리터럴로', 'as const: the narrowest literals'], 'a'], [['readonly 튜플이 돼요', 'it becomes a readonly tuple'], '']]
    ],
    notes: [['변수에 타입을 표기하면 값은 그 타입으로 취급돼요 · 여기선 넓은 Record 타입이에요', 'annotating a variable makes the value take that type, here a wide Record'], ['그래서 gap이 number라는 정보를 잃고, 없는 키를 써도 오류가 나지 않아요', 'so the fact that gap is a number is lost, and nonexistent keys raise no error'], ['satisfies는 타입에 맞는지 검사만 하고, 추론된 정확한 타입은 그대로 둬요', 'satisfies only checks conformance and keeps the precise inferred type'], ['as const는 값을 가장 좁은 리터럴 타입과 readonly로 고정해요', 'as const fixes values to the narrowest literal types and makes them readonly']],
    fin: [['satisfies: “이 타입을 만족하는지 확인하되, 추론된 타입은 바꾸지 마”', 'satisfies means “check against this type, but keep the inferred type”', 'tsx-xs tsx-a'], ['설정 객체, 라우트 표, 테마 토큰에 특히 유용해요', 'especially handy for config objects, route tables and theme tokens'], ['as const satisfies T로 둘을 함께 쓸 수도 있어요', 'the two combine as as const satisfies T']],
    caps: [['타입 표기', 'Annotations'], ['넓혀진 타입의 손해', 'What widening loses'], ['satisfies', 'satisfies'], ['as const', 'as const'], ['as const와 satisfies', 'as const and satisfies']]
  });
}

function sAssert() {
  return CW('ts-assert', {
    code: ['const el = document.getElementById("app");', '// el: HTMLElement | null', ['el.textContent = "hi";      // ✗ null일 수도', 'el.textContent = "hi";      // ✗ may be null'], ['el!.textContent = "hi";     // ! 단언', 'el!.textContent = "hi";     // ! assertion'], 'const input = el as HTMLInputElement;', ['input.value;                // 실제론 div?', 'input.value;                // really a div?'], 'const n = "3" as unknown as number;', 'if (el instanceof HTMLInputElement) el.value;'],
    hl: [[0, 3, 'danger'], [3, 1, 'warn'], [4, 3, 'danger'], [7, 1, 'ok']],
    side: [
      [[['찾지 못하면 null이에요', 'null when nothing matches'], 'a'], [['바로 쓰면 오류', 'using it directly is an error'], 'r']],
      [[['!: “null 아님”을 내가 보증', '!: I promise it is not null'], 'w'], [['틀리면 런타임에 터져요', 'if wrong, it crashes at run time'], 'r']],
      [[['as: 타입을 내 말대로 바꿔요', 'as: the type becomes what I say'], 'w'], [['검사도 변환도 하지 않아요', 'nothing is checked or converted'], 'r'], [['이중 단언은 거의 항상 버그', 'double assertions are nearly always bugs'], 'r']],
      [[['가능하면 좁히기로 증명하기', 'prefer proving it by narrowing'], 'g'], [['instanceof, typeof, 타입 가드', 'instanceof, typeof, type guards'], '']]
    ],
    notes: [['getElementById는 못 찾으면 null을 돌려줘서 타입이 HTMLElement | null이에요', 'getElementById returns null when nothing matches, so its type is HTMLElement | null'], ['!는 “null이 아니다”를 개발자가 보증하는 것 · 컴파일러는 믿지만 틀리면 런타임 오류예요', '! is the developer’s promise that it is not null; the compiler trusts it, and a wrong promise crashes at run time'], ['as는 값은 그대로 두고 타입만 바꿔 말해요 · 실제 값과 다르면 그대로 버그가 돼요', 'as changes only the declared type, not the value; if reality differs, it is simply a bug'], ['가능하면 instanceof 같은 검사로 좁혀서 컴파일러가 직접 확인하게 해요', 'whenever possible, narrow with checks such as instanceof so the compiler verifies it']],
    fin: [['타입 단언(as, !): 컴파일러보다 내가 더 잘 안다고 선언하는 것 · 검증은 없어요', 'type assertions (as, !) declare that you know better than the compiler, with no verification', 'tsx-xs tsx-a'], ['DOM, 테스트 목, 라이브러리 경계처럼 꼭 필요한 곳에서만 짧게 써요', 'keep them brief and limited to places such as the DOM, test mocks and library boundaries'], ['외부 데이터는 단언 대신 런타임 검증(zod 등)으로 확인해요', 'verify external data at run time, for example with zod, instead of asserting']],
    caps: [['null 가능성', 'Possibly null'], ['non-null 단언 !', 'The non-null assertion !'], ['as 단언', 'as assertions'], ['좁히기로 증명', 'Proving by narrowing'], ['타입 단언', 'Type assertions']]
  });
}

function sIndex() {
  return CW('ts-index', {
    code: ['interface Scores { [name: string]: number }', 'const s: Scores = { kim: 90, lee: 85 };', ['s.park;            // 타입은 number', 's.park;            // typed as number'], ['                   // 실제 값은 undefined', '                   // but really undefined'], 'type Lang = "ko" | "en";', 'const label: Record<Lang, string> = {', '  ko: "저장", en: "Save",', ['};                 // en이 빠지면 ✗', '};                 // missing en → ✗'], 'const m = new Map<string, number>();'],
    hl: [[0, 2], [2, 2, 'warn'], [4, 4, 'ok'], [8, 1]],
    side: [
      [[['인덱스 시그니처: 키는 자유, 값은 고정', 'index signature: any key, one value type'], 'a'], [['사전·캐시처럼 키를 미리 모를 때', 'for dictionaries and caches'], '']],
      [[['없는 키도 number로 보여요', 'missing keys still look like numbers'], 'w'], [['noUncheckedIndexedAccess를 켜면', 'with noUncheckedIndexedAccess,'], ''], [['number | undefined로 정확해져요', 'it becomes number | undefined'], 'g']],
      [[['Record<K, V>: 키 유니언 → 값 타입', 'Record<K, V>: a key union to a value'], 'a'], [['모든 키를 빠짐없이 채워야 해요', 'every key must be filled in'], 'g'], [['번역 표, 설정 표에 딱', 'ideal for translations and configs'], '']],
      [[['자주 넣고 빼면 Map이 나아요', 'for frequent inserts, prefer Map'], 'a'], [['get은 V | undefined를 돌려줘요', 'get returns V | undefined'], 'g']]
    ],
    notes: [['[name: string]: number는 “어떤 문자열 키든 값은 number”라는 뜻이에요', '[name: string]: number means any string key maps to a number'], ['그래서 없는 키를 읽어도 number로 보이지만 실제 값은 undefined예요 · 컴파일러 옵션으로 보완해요', 'so a missing key still looks like a number although it is undefined; a compiler option fixes this'], ['Record<Lang, string>은 유니언의 모든 키를 요구해서, 번역 하나를 빠뜨리면 오류가 나요', 'Record<Lang, string> requires every key in the union, so a missing translation is an error'], ['키가 실행 중에 계속 바뀌는 데이터는 Map<K, V>로 · get 결과에 undefined가 포함돼요', 'for keys that change at run time, Map<K, V> is safer because get includes undefined']],
    fin: [['인덱스 시그니처와 Record: 키의 집합과 값의 타입으로 객체를 표현하는 방법', 'index signatures and Record describe objects by a set of keys and a value type', 'tsx-xs tsx-a'], ['Record<string, T>는 인덱스 시그니처와 같고, Record<유니언, T>는 모든 키가 필수예요', 'Record<string, T> equals an index signature, while Record<union, T> makes every key required'], ['키를 좁게 잡을수록 오타와 누락을 더 많이 잡아요', 'the narrower the keys, the more typos and omissions are caught']],
    caps: [['인덱스 시그니처', 'Index signatures'], ['없는 키의 함정', 'The missing-key trap'], ['Record', 'Record'], ['Map', 'Map'], ['인덱스 시그니처와 Record', 'Index signatures and Record']]
  });
}
/* ===== TypeScript · 3. generics ===== */
function sGenerics() {
  return CW('ts-generics', {
    code: ['function firstAny(arr: any[]) {', '  return arr[0];               // any', '}', 'function first<T>(arr: T[]): T {', '  return arr[0];', '}', 'const n = first([1, 2, 3]);  // number', 'const s = first<string>(["a"]);', 'interface Box<T> { value: T }', 'const b: Box<Date> = { value: new Date() };'],
    hl: [[0, 3, 'warn'], [3, 3, 'ok'], [6, 2], [8, 2]],
    side: [
      [[['any로 받으면 결과도 any', 'any in means any out'], 'r'], [['무엇이 들어갔는지 잊어버려요', 'it forgets what went in'], '']],
      [[['<T>: 타입을 매개변수로 받아요', '<T> takes a type as a parameter'], 'a'], [['들어온 타입이 그대로 나와요', 'the type that goes in comes out'], 'g']],
      [[['보통은 인자에서 T를 추론', 'T is usually inferred from arguments'], 'a'], [['필요하면 <string>처럼 직접', 'or passed explicitly, like <string>'], '']],
      [[['타입에도 매개변수를', 'types take parameters too'], 'a'], ['Array<T>  Promise<T>  Map<K, V>', 'm']]
    ],
    draw: (S, g) => {
      const X = g.R, Y = 6.4;
      chip(S, 'in', X, Y, 3.6, 'number[]', 'line', 2, { pct: 10 }); arw(S, 'ia', [X + 3.7, Y + .55], [X + 4.5, Y + .55], 2);
      chip(S, 'fn', X + 4.6, Y, 3.4, 'first<T>', 'accent', 2, { pct: 16 }); arw(S, 'oa', [X + 8.1, Y + .55], [X + 8.9, Y + .55], 2);
      chip(S, 'out', X + 9.0, Y, 3.0, 'number', 'ok', 2);
      lbl(S, 'tl', X + 4.6, Y + 1.4, 'T = number', 'm a', 2, { off: 4 });
    },
    notes: [['any로 받으면 어떤 배열이든 받지만, 결과도 any라 타입 정보가 사라져요', 'taking any accepts every array, but the result is any and the type information is gone'], ['<T>는 타입을 받는 매개변수예요 · number 배열을 넣으면 number가 나와요', '<T> is a parameter that receives a type; a number array in means a number out'], ['T는 보통 인자에서 추론되고, 필요하면 first<string>처럼 직접 넘겨요', 'T is usually inferred from the arguments and can be passed explicitly as first<string>'], ['interface와 type도 제네릭이 될 수 있어요 · Array<T>, Promise<T>가 대표 예예요', 'interfaces and types can be generic too; Array<T> and Promise<T> are the classic examples']],
    fin: [['제네릭: 타입을 매개변수로 받아, 여러 타입에 재사용하면서도 타입 정보를 지키는 방법', 'generics take types as parameters, reusing code across types without losing type information', 'tsx-xs tsx-a'], ['T, U, K, V는 관례일 뿐 · TItem처럼 뜻이 드러나는 이름도 좋아요', 'T, U, K and V are conventions; descriptive names such as TItem work too'], ['한 번만 쓰이는 타입 매개변수는 대개 필요 없어요', 'a type parameter used only once is usually unnecessary']],
    caps: [['any의 손실', 'What any loses'], ['타입 매개변수', 'Type parameters'], ['추론과 명시', 'Inferred or explicit'], ['제네릭 타입', 'Generic types'], ['제네릭', 'Generics']]
  });
}

function sConstraint() {
  return CW('ts-constraint', {
    code: ['function longest<T>(a: T, b: T) {', '  return a.length > b.length ? a : b; // ✗', '}', 'type Len = { length: number };', 'function longer<T extends Len>(a: T, b: T) {', '  return a.length > b.length ? a : b; // ✓', '}', 'longer("ab", "c");        // string', 'longer([1, 2], [3]);      // number[]', ['longer(10, 20);           // ✗ length 없음', 'longer(10, 20);           // ✗ no length'], 'const list = <T = string>(): T[] => [];'],
    hl: [[0, 3, 'danger'], [3, 4, 'ok'], [7, 3], [10, 1]],
    side: [
      [[['T는 아무 타입이나 될 수 있어서', 'T could be anything, so'], 'a'], [['.length가 있다고 장담 못 해요', 'there is no guarantee of .length'], 'r']],
      [[['extends: T의 조건을 정해요', 'extends sets a requirement on T'], 'a'], [['length가 있는 타입만 허용', 'only types with length are allowed'], 'g']],
      [[['결과는 여전히 구체적인 타입', 'results keep the specific type'], 'g'], [['조건에 안 맞으면 호출 오류', 'failing calls are errors'], 'r']],
      [[['기본 타입 매개변수 = string', 'a default type parameter: = string'], 'a'], [['안 넘기면 기본값을 써요', 'used when none is given'], '']]
    ],
    notes: [['아무 제약 없는 T에서는 .length가 있다고 장담할 수 없어 오류가 나요', 'with an unconstrained T, .length is not guaranteed, so it is an error'], ['T extends Len은 “length가 있는 타입만 받겠다”는 조건이에요', 'T extends Len means only types with a length are accepted'], ['문자열을 넣으면 string, 배열을 넣으면 number[]가 그대로 나오고, 숫자는 거부돼요', 'strings give string and arrays give number[], while numbers are rejected'], ['T = string처럼 기본 타입을 정해 두면 추론할 단서가 없을 때 그 타입을 써요', 'a default such as T = string applies when there is nothing to infer from']],
    fin: [['제네릭 제약: T extends 조건으로 타입 매개변수가 가져야 할 최소한의 모양을 정하는 것', 'a generic constraint, T extends …, sets the minimum shape a type parameter must have', 'tsx-xs tsx-a'], ['제약은 “최소 조건”이라 결과 타입은 넘긴 그대로 유지돼요', 'constraints are minimums, so the result keeps the exact type passed in'], ['K extends keyof T처럼 다른 타입 매개변수와 엮을 수도 있어요', 'constraints can link parameters, as in K extends keyof T']],
    caps: [['제약 없는 T', 'An unconstrained T'], ['extends로 조건', 'Requirements with extends'], ['구체적인 결과', 'Specific results'], ['기본 타입 매개변수', 'Default type parameters'], ['제네릭 제약', 'Generic constraints']]
  });
}

function sKeyof() {
  return CW('ts-keyof', {
    code: ['type User = { id: number; name: string };', 'type Keys = keyof User;      // "id" | "name"', 'type Name = User["name"];    // string', 'function get<T, K extends keyof T>(', '  o: T, k: K): T[K] {', '  return o[k];', '}', 'const u: User = { id: 1, name: "Kim" };', 'get(u, "name");              // string', 'get(u, "age");               // ✗', 'type Item = (typeof list)[number];'],
    hl: [[1, 1], [2, 1], [3, 4, 'ok'], [8, 3]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'uf', X, .6, 6.2, 3.4, 'accent', 0, { w: .08 }); lbl(S, 'ut', X + .3, .7, 'User', 'm a', 0);
      chip(S, 'fid', X + .4, 1.5, 5.4, 'id: number', 'line', 0, { pct: 10 }); chip(S, 'fnm', X + .4, 2.7, 5.4, 'name: string', 'line', 0, { pct: 10 });
      tsets(S, 'fid', [[1, 'accent', 30], [2, 'line', 10]]); tsets(S, 'fnm', [[1, 'accent', 30], [2, 'ok', 30], [3, 'line', 10]]);
      lbl(S, 'kl', X + 7.0, .6, 'keyof User', 'm a', 1); chip(S, 'kr', X + 7.0, 1.6, 5.0, '"id" | "name"', 'accent', 1, { pct: 16 }); arw(S, 'ka', [X + 6.3, 2.1], [X + 6.9, 2.1], 1);
      lbl(S, 'il', X + 7.0, 2.95, 'User["name"]', 'm g', 2); chip(S, 'ir', X + 7.0, 3.9, 5.0, 'string', 'ok', 2); arw(S, 'iaa', [X + 5.9, 3.3], [X + 6.9, 4.4], 2, { color: 'ok' });
      lbl(S, 'l3', X, 5.6, ['K는 T의 키 중 하나 → 결과는 T[K]', 'K is one of T’s keys → the result is T[K]'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'l4', X, 5.6, ['없는 키는 호출에서 바로 ✗', 'unknown keys fail at the call'], 'r', 4); lbl(S, 'l5', X, 6.7, ['[number]: 배열 원소의 타입', '[number]: an array’s element type'], 'a', 4);
    },
    notes: [['keyof User는 User의 키 이름을 모은 유니언 "id" | "name"이에요', 'keyof User is the union of User’s key names, "id" | "name"'], ['User["name"]처럼 대괄호로 속성의 타입을 꺼내요 · 인덱스 접근 타입이라고 해요', 'brackets such as User["name"] pull out a property’s type; this is an indexed access type'], ['둘을 합치면 “객체 T와 그 키 K를 받아 T[K]를 돌려주는” 안전한 함수가 돼요', 'together they type a safe function that takes an object T and a key K and returns T[K]'], ['없는 키는 호출에서 바로 걸리고, (typeof list)[number]로 배열 원소 타입도 꺼내요', 'unknown keys fail at the call, and (typeof list)[number] extracts an array’s element type']],
    fin: [['keyof는 키의 유니언, T[K]는 그 키의 값 타입 · 매핑된 타입과 유틸리티 타입의 재료예요', 'keyof gives the key union and T[K] the value type; together they power mapped and utility types', 'tsx-xs tsx-a'], ['K extends keyof T 패턴은 get 도우미, 폼 필드 이름 등에 두루 쓰여요', 'the K extends keyof T pattern appears in get helpers and form field names'], ['keyof any는 string | number | symbol이에요', 'keyof any is string | number | symbol']],
    caps: [['keyof', 'keyof'], ['인덱스 접근 타입', 'Indexed access types'], ['K extends keyof T', 'K extends keyof T'], ['잘못된 키와 [number]', 'Bad keys and [number]'], ['keyof와 인덱스 접근 타입', 'keyof and indexed access types']]
  });
}

function sUtility() {
  return CW('ts-utility', {
    code: ['interface Todo {', '  id: number; title: string; done: boolean;', '}', ['type Draft = Partial<Todo>;   // 모두 선택적', 'type Draft = Partial<Todo>;   // all optional'], ['type Full = Required<Draft>;  // 모두 필수', 'type Full = Required<Draft>;  // all required'], 'type Preview = Pick<Todo, "id" | "title">;', 'type NoId = Omit<Todo, "id">;', 'type Frozen = Readonly<Todo>;', 'const update = (p: Partial<NoId>) => {…};'],
    hl: [[3, 2], [5, 2, 'ok'], [7, 1], [8, 1, 'ok']],
    draw: (S) => {
      const X = 19.4, C = 23.0, cw = 2.6, rows = [['Todo', 0, 'line', ['id', 'title', 'done']], ['Partial', 1, 'warn', ['id?', 'title?', 'done?']], ['Pick', 2, 'ok', ['id', 'title', null]], ['Omit', 2, 'ok', [null, 'title', 'done']], ['Readonly', 3, 'accent', ['id', 'title', 'done']]];
      rows.forEach(([nm, st, col, cells], r) => { const y = .6 + r * 1.45; lbl(S, 'rl' + r, X, y + .15, nm, 'm a', st); cells.forEach((c, j) => { if (c) chip(S, 'r' + r + j, C + j * (cw + .2), y, cw, c, col, st, { pct: col === 'line' ? 10 : 24 }); }); });
      lbl(S, 'ro', X, 7.9, ['readonly id, readonly title, …', 'readonly id, readonly title, …'], 'm', 3, { off: 4 });
      lbl(S, 'cb', X, 7.9, ['조합: id를 뺀 필드 일부만 수정', 'combined: patch any field except id'], 'g', 4, { w: 12 }); lbl(S, 'cb2', X, 9.0, 'Partial<Omit<Todo, "id">>', 'm g', 4);
    },
    notes: [['Partial은 모든 속성을 선택적으로, Required는 반대로 모두 필수로 바꿔요', 'Partial makes every property optional, and Required makes them all required'], ['Pick은 고른 키만 남기고, Omit은 고른 키를 빼요', 'Pick keeps the chosen keys, and Omit removes them'], ['Readonly는 모든 속성을 readonly로 만들어요', 'Readonly makes every property readonly'], ['조합하면 “id를 뺀 나머지 중 일부만 바꾸는 요청” 같은 정확한 타입이 한 줄로 나와요', 'combining them yields precise types in one line, such as a patch of any fields except id']],
    fin: [['유틸리티 타입: 기존 타입을 변형해 새 타입을 만드는 내장 제네릭 · 같은 모양을 두 번 쓰지 않게 해요', 'utility types are built-in generics that transform existing types, so shapes are never written twice', 'tsx-xs tsx-a'], ['내부는 매핑된 타입과 keyof로 만들어져 있어요', 'internally they are built from mapped types and keyof'], ['원본 타입을 고치면 파생된 타입도 자동으로 따라와요', 'change the original and every derived type follows automatically']],
    caps: [['Partial과 Required', 'Partial and Required'], ['Pick과 Omit', 'Pick and Omit'], ['Readonly', 'Readonly'], ['조합하기', 'Combining them'], ['객체 유틸리티 타입', 'Object utility types']]
  });
}

function sUtilityFn() {
  return CW('ts-utility2', {
    code: ['async function load(id: number) {', '  return { id, name: "Kim" };', '}', 'type P = Parameters<typeof load>;', '// [id: number]', 'type R = Awaited<ReturnType<typeof load>>;', '// { id: number; name: string }', 'type S = "a" | "b" | "c";', 'type AB = Extract<S, "a" | "b">;  // "a" | "b"', 'type C = Exclude<S, "a" | "b">;   // "c"', 'type T = NonNullable<string | null>; // string'],
    hl: [[3, 2], [5, 2, 'ok'], [7, 3], [10, 1]],
    side: [
      [[['Parameters: 매개변수 튜플', 'Parameters: the parameter tuple'], 'a'], [['함수에서 타입을 뽑아 재사용', 'reuse types pulled from functions'], '']],
      [[['ReturnType: 반환 타입', 'ReturnType: the return type'], 'a'], [['async면 Promise<…>라서', 'async gives Promise<…>, so'], ''], [['Awaited로 벗겨요', 'unwrap it with Awaited'], 'g']],
      [[['Extract: 조건에 맞는 것만', 'Extract keeps matching members'], 'a'], [['Exclude: 맞는 것을 빼요', 'Exclude removes them'], 'a']],
      [[['NonNullable: null·undefined 제거', 'NonNullable drops null and undefined'], 'a'], [['남의 함수 타입도 재사용 OK', 'reuse types from code you do not own'], 'g']]
    ],
    notes: [['Parameters<typeof load>는 함수의 매개변수 목록을 튜플 타입으로 꺼내요', 'Parameters<typeof load> extracts a function’s parameters as a tuple type'], ['ReturnType은 반환 타입을, Awaited는 Promise를 벗긴 결과 타입을 줘요', 'ReturnType gives the return type, and Awaited unwraps the promise'], ['유니언에서 Extract는 조건에 맞는 멤버만 남기고, Exclude는 그 멤버를 빼요', 'on unions, Extract keeps matching members and Exclude removes them'], ['NonNullable은 null과 undefined를 걷어 내요 · 라이브러리가 타입을 내보내지 않아도 이렇게 꺼내 써요', 'NonNullable strips null and undefined; this is how you reuse types a library never exported']],
    fin: [['함수·유니언 유틸리티: Parameters, ReturnType, Awaited, Extract, Exclude, NonNullable', 'function and union utilities: Parameters, ReturnType, Awaited, Extract, Exclude and NonNullable', 'tsx-xs tsx-a'], ['값에서 타입을 뽑아 쓰면 정의가 한곳에 모여 불일치가 사라져요', 'deriving types from values keeps one source of truth and removes mismatches'], ['모두 조건부 타입과 infer로 구현되어 있어요', 'they are all implemented with conditional types and infer']],
    caps: [['Parameters', 'Parameters'], ['ReturnType과 Awaited', 'ReturnType and Awaited'], ['Extract와 Exclude', 'Extract and Exclude'], ['NonNullable', 'NonNullable'], ['함수·유니언 유틸리티 타입', 'Function and union utility types']]
  });
}
/* ===== TypeScript · 4. advanced types ===== */
function sDiscrim() {
  return CW('ts-discriminated', {
    code: ['type Result =', '  | { status: "ok"; data: User }', '  | { status: "error"; message: string }', '  | { status: "loading" };', 'function view(r: Result) {', '  switch (r.status) {', '    case "ok": return r.data.name;', '    case "error": return r.message;', '    case "loading": return "…";', '    default: const x: never = r; return x;', '  }', '}'],
    hl: [[0, 4], [5, 2, 'ok'], [7, 1, 'ok'], [9, 1, 'warn']],
    side: [
      [[['공통 속성 status가 꼬리표', 'the shared status is the tag'], 'a'], [['경우마다 다른 리터럴 값', 'each variant has its own literal'], '']],
      [[['status를 확인하면', 'checking status'], 'a'], [['r이 그 모양으로 좁혀져요', 'narrows r to that variant'], 'g'], [['ok일 때만 data가 있어요', 'only ok has data'], '']],
      [[['data와 message가 동시에 있는', 'states with both data and message'], ''], [['불가능한 상태는 표현조차 안 돼요', 'cannot even be written'], 'g']],
      [[['never로 빠짐없이 확인', 'never checks exhaustiveness'], 'w'], [['새 상태를 추가하면', 'add a new status and'], ''], [['처리 안 한 곳이 오류로 떠요', 'every unhandled spot errors'], 'r']]
    ],
    notes: [['모든 경우에 공통 속성 status를 두고 각자 다른 리터럴 값을 주면 판별 유니언이에요', 'giving every variant a shared status with a distinct literal value makes a discriminated union'], ['switch로 status를 확인하면 그 case 안에서 r이 해당 모양으로 좁혀져요', 'switching on status narrows r to the matching variant inside each case'], ['data와 message를 둘 다 선택적으로 두는 것보다 안전해요 · 불가능한 조합이 아예 생기지 않아요', 'this is safer than making data and message both optional, since impossible combinations cannot exist'], ['default에서 never에 대입해 두면, 새 상태를 추가했을 때 처리하지 않은 곳이 컴파일 오류로 드러나요', 'assigning to never in default turns every unhandled new status into a compile error']],
    fin: [['판별 유니언: 꼬리표 속성으로 구분되는 유니언 · 상태, 이벤트, 액션, API 응답 모델링의 기본', 'a discriminated union is told apart by a tag property, the standard way to model states, events, actions and API results', 'tsx-xs tsx-a'], ['Redux 액션의 type, 요청 상태 관리가 대표적인 예예요', 'Redux action types and request states are classic examples'], ['꼬리표는 type, kind, status 등 리터럴 타입 속성이면 무엇이든 돼요', 'any literal-typed property such as type, kind or status can serve as the tag']],
    caps: [['꼬리표 속성', 'A tag property'], ['switch로 좁히기', 'Narrowing with switch'], ['불가능한 상태 없애기', 'Ruling out impossible states'], ['never로 빠짐없이', 'Exhaustiveness with never'], ['판별 유니언', 'Discriminated unions']]
  });
}

function sGuard() {
  return CW('ts-guard', {
    code: ['function isFish(p: Fish | Bird): p is Fish {', '  return "swim" in p;', '}', 'if (isFish(pet)) pet.swim();   // Fish', 'else pet.fly();                // Bird', 'const xs = [1, null, 2].filter(', '  (x): x is number => x !== null); // number[]', 'function assertStr(', '  v: unknown): asserts v is string {', '  if (typeof v !== "string") throw Error();', '}', 'assertStr(input); input.trim(); // string'],
    hl: [[0, 3], [3, 2, 'ok'], [5, 2], [7, 5, 'warn']],
    side: [
      [[['반환 타입 p is Fish', 'a return type of p is Fish'], 'm a'], [['true면 p는 Fish라는 약속', 'true means p is a Fish'], '']],
      [[['if 안에서 Fish, else에서 Bird', 'Fish inside if, Bird in else'], 'g']],
      [[['filter와 함께 null 거르기', 'filtering null with filter'], 'a'], [['TS 5.5부터는 자동 추론돼요', 'inferred automatically since TS 5.5'], 'g']],
      [[['asserts: 통과 못 하면 throw', 'asserts: throws if the check fails'], 'w'], [['다음 줄부터 타입이 좁혀져요', 'narrows from the next line on'], 'g']]
    ],
    notes: [['반환 타입에 p is Fish를 적으면 “true면 p는 Fish”라고 컴파일러에 알려 주는 타입 가드가 돼요', 'a return type of p is Fish makes a type guard telling the compiler that p is a Fish whenever it returns true'], ['if 안에서는 Fish로, else에서는 나머지인 Bird로 좁혀져요', 'inside the if, pet is a Fish; in else, the remaining Bird'], ['filter에 타입 가드를 넘기면 null이 빠진 number[]가 돼요 · 최신 TS는 이를 자동으로 추론해요', 'passing a guard to filter yields number[] without null; recent TypeScript infers this automatically'], ['asserts v is string은 통과하지 못하면 예외를 던지고, 다음 줄부터 v를 string으로 좁혀요', 'asserts v is string throws on failure and narrows v to string from the next line on']],
    fin: [['타입 가드: 검사 함수의 결과를 타입 좁히기에 연결하는 방법 · 검사 로직이 틀리면 거짓말이 돼요', 'type guards connect a checking function to narrowing; if the logic is wrong, the guard lies', 'tsx-xs tsx-a'], ['검사가 복잡하면 zod 같은 스키마 라이브러리가 가드를 대신 만들어 줘요', 'for complex checks, schema libraries such as zod generate the guard for you'], ['Array.isArray, instanceof도 내장 타입 가드처럼 동작해요', 'Array.isArray and instanceof behave like built-in guards']],
    caps: [['is 타입 가드', 'is type guards'], ['if와 else', 'if and else'], ['filter와 함께', 'With filter'], ['asserts', 'asserts'], ['사용자 정의 타입 가드', 'User-defined type guards']]
  });
}

function sConditional() {
  return CW('ts-conditional', {
    code: ['type Is<T> = T extends string ? "y" : "n";', 'type A = Is<"hi">;              // "y"', 'type B = Is<42>;                // "n"', 'type C = Is<"a" | 1>;           // "y" | "n"', 'type Unwrap<T> =', '  T extends Promise<infer U> ? U : T;', 'type D = Unwrap<Promise<number>>; // number', 'type E = Unwrap<string>;          // string', 'type Elem<T> =', '  T extends (infer E)[] ? E : never;', 'type F = Elem<string[]>;          // string'],
    hl: [[0, 3], [3, 1, 'warn'], [4, 4, 'ok'], [8, 3]],
    side: [
      [['T extends X ? A : B', 'm a'], [['타입 수준의 삼항 연산자', 'a ternary operator for types'], '']],
      [[['유니언은 멤버마다 따로 적용', 'unions are processed per member'], 'w'], [['분배 조건부 타입이라 해요', 'distributive conditional types'], '']],
      [[['infer U: 그 자리의 타입을 꺼내요', 'infer U captures that slot’s type'], 'a'], ['Promise<number> → number', 'm g']],
      [[['배열 원소 타입 꺼내기', 'extracting array element types'], 'a'], [['ReturnType·Awaited도 이렇게 구현', 'ReturnType and Awaited work this way'], 'g']]
    ],
    notes: [['T extends string ? "y" : "n"은 타입의 삼항 연산자예요 · 조건에 맞으면 앞, 아니면 뒤', 'T extends string ? "y" : "n" is a ternary for types: the first branch if it matches, the second otherwise'], ['유니언을 넘기면 멤버 하나하나에 따로 적용되어 결과도 유니언이 돼요', 'a union argument is processed member by member, producing a union'], ['infer U는 패턴의 그 자리에 있는 타입을 변수처럼 꺼내요 · Promise를 벗길 수 있어요', 'infer U captures whatever type sits in that slot of the pattern, here unwrapping a promise'], ['같은 방법으로 배열의 원소 타입이나 함수의 반환 타입을 꺼내요', 'the same trick extracts array element types and function return types']],
    fin: [['조건부 타입: T extends U ? X : Y로 타입을 분기 · infer로 패턴에서 타입을 추출', 'conditional types branch with T extends U ? X : Y, and infer extracts types from patterns', 'tsx-xs tsx-a'], ['분배를 막으려면 [T] extends [U]처럼 감싸요', 'wrap as [T] extends [U] to prevent distribution'], ['라이브러리 타입에는 강력하지만 앱 코드에서는 아껴 쓰세요', 'powerful in library types, but use sparingly in application code']],
    caps: [['타입의 삼항 연산자', 'A ternary for types'], ['유니언에 분배', 'Distribution over unions'], ['infer', 'infer'], ['원소 타입 꺼내기', 'Extracting element types'], ['조건부 타입과 infer', 'Conditional types and infer']]
  });
}

function sMapped() {
  return CW('ts-mapped', {
    code: ['type Flags<T> = { [K in keyof T]: boolean };', 'type F = Flags<{dark: string; beta: number}>;', '// { dark: boolean; beta: boolean }', 'type Opt<T> = { [K in keyof T]?: T[K] };', 'type Mutable<T> = {', '  -readonly [K in keyof T]: T[K];', '};', 'type Handlers<T> = {', '  [K in keyof T & string as `on${K}`]:', '    (e: T[K]) => void;', '};', '// { onclick: (e: MouseEvent) => void; … }'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 3, 'warn'], [7, 5]],
    draw: (S) => {
      const X = 19.4;
      chip(S, 'k1', X, .8, 5.2, 'dark: string', 'line', 0, { pct: 10 }); chip(S, 'k2', X, 2.2, 5.2, 'beta: number', 'line', 0, { pct: 10 });
      arw(S, 'm1', [X + 5.3, 1.35], [X + 6.6, 1.35], 1); arw(S, 'm2', [X + 5.3, 2.75], [X + 6.6, 2.75], 1);
      chip(S, 'v1', X + 6.7, .8, 5.3, 'dark: boolean', 'accent', 1, { off: 2 }); chip(S, 'v2', X + 6.7, 2.2, 5.3, 'beta: boolean', 'accent', 1, { off: 2 });
      chip(S, 'p1', X + 6.7, .8, 5.3, 'dark?: string', 'ok', 2, { off: 3 }); chip(S, 'p2', X + 6.7, 2.2, 5.3, 'beta?: number', 'ok', 2, { off: 3 });
      chip(S, 'r1', X + 6.7, .8, 5.3, 'dark: string', 'warn', 3, { off: 4 }); chip(S, 'r2', X + 6.7, 2.2, 5.3, 'beta: number', 'warn', 3, { off: 4 });
      chip(S, 'h1', X + 6.7, .8, 5.3, 'ondark: …', 'accent', 4); chip(S, 'h2', X + 6.7, 2.2, 5.3, 'onbeta: …', 'accent', 4);
      lbl(S, 'l1', X, 3.8, ['K in keyof T: 키마다 한 번씩', 'K in keyof T: once per key'], 'a', 1, { off: 2 });
      lbl(S, 'l2', X, 3.8, ['?를 붙이면 Partial을 직접 만든 셈', 'adding ? rebuilds Partial'], 'g', 2, { off: 3 });
      lbl(S, 'l3', X, 3.8, ['-readonly, -?로 수식어를 떼어 내요', '-readonly and -? strip modifiers'], 'w', 3, { off: 4 });
      lbl(S, 'l4', X, 3.8, ['as로 키 이름을 바꿔요(키 재매핑)', 'as renames keys (key remapping)'], 'a', 4); lbl(S, 'l5', X, 4.9, 'click → onclick', 'm g', 4);
    },
    notes: [['[K in keyof T]는 T의 키마다 한 번씩 돌며 새 속성을 만들어요 · 여기선 값을 모두 boolean으로', '[K in keyof T] loops over each key of T to build new properties, here turning every value into boolean'], ['값 타입 T[K]를 그대로 두고 ?만 붙이면 Partial을 직접 만든 것과 같아요', 'keeping T[K] and adding ? is exactly how Partial is built'], ['-readonly나 -?처럼 앞에 -를 붙이면 수식어를 떼어 내요', 'prefixing - as in -readonly or -? removes modifiers'], ['as 절로 키 이름 자체를 바꿀 수 있어요 · click이 onclick 핸들러가 돼요', 'an as clause renames the keys themselves, turning click into an onclick handler']],
    fin: [['매핑된 타입: 기존 타입의 키를 돌며 속성을 변형해 새 객체 타입을 만드는 문법', 'mapped types build new object types by iterating over and transforming the keys of an existing type', 'tsx-xs tsx-a'], ['Partial, Required, Readonly, Record가 모두 매핑된 타입이에요', 'Partial, Required, Readonly and Record are all mapped types'], ['as에서 never를 돌려주면 그 키를 걸러 낼 수 있어요', 'returning never in the as clause filters that key out']],
    caps: [['키마다 변형', 'Transforming every key'], ['Partial 직접 만들기', 'Rebuilding Partial'], ['수식어 떼기', 'Removing modifiers'], ['키 재매핑', 'Key remapping'], ['매핑된 타입', 'Mapped types']]
  });
}

function sTemplate() {
  return CW('ts-template', {
    code: ['type Size = "sm" | "md" | "lg";', 'type Color = "red" | "blue";', 'type Cls = `${Color}-${Size}`;', ['// "red-sm" | "red-md" | … 6가지', '// "red-sm" | "red-md" | … 6 in all'], 'type Route = `/users/${number}`;', 'const r: Route = "/users/42";    // ✓', 'const q: Route = "/users/kim";   // ✗', 'type Ev = `on${Capitalize<"click"|"focus">}`;', '// "onClick" | "onFocus"'],
    hl: [[0, 4], [4, 3, 'ok'], [7, 2], null],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'h1', X, .6, ['2 × 3 = 6개의 조합', '2 × 3 = 6 combinations'], 'a', 1, { off: 2 });
      ['red-sm', 'red-md', 'red-lg', 'blue-sm', 'blue-md', 'blue-lg'].forEach((t, i) => chip(S, 'g' + i, X + (i % 3) * 4.1, 1.7 + Math.floor(i / 3) * 1.4, 3.8, t, i < 3 ? 'danger' : 'accent', 1, { off: 2, pct: 14 }));
      lbl(S, 'h2', X, .6, ['${number}: 숫자가 들어갈 자리', '${number}: a numeric slot'], 'a', 2, { off: 3 });
      chip(S, 'u1', X, 1.7, 5.8, '/users/42 ✓', 'ok', 2, { off: 3 }); chip(S, 'u2', X + 6.2, 1.7, 5.8, '/users/kim ✗', 'danger', 2, { off: 3 });
      lbl(S, 'h3', X, .6, ['내장 문자열 변환 타입', 'built-in string transformers'], 'a', 3, { off: 4 });
      lbl(S, 'b1', X, 1.7, 'Uppercase   Lowercase', 'm', 3, { off: 4 }); lbl(S, 'b2', X, 2.8, 'Capitalize  Uncapitalize', 'm', 3, { off: 4 });
      lbl(S, 'w1', X, .6, ['CSS 클래스 이름, 이벤트 이름', 'CSS class names, event names'], 'g', 4); lbl(S, 'w2', X, 1.7, ['API 경로, 번역 키 검사', 'API paths, translation keys'], 'g', 4); lbl(S, 'w3', X, 2.8, ['조합이 너무 많으면 컴파일이 느려요', 'too many combinations slow the compiler'], 'w', 4, { w: 12 });
    },
    notes: [['백틱 문법을 타입에 쓰면 문자열 조합을 만들어요 · 색 2개 × 크기 3개 = 리터럴 6개의 유니언', 'backtick syntax in types builds string combinations: 2 colors × 3 sizes = a union of 6 literals'], ['${number}처럼 원시 타입을 끼우면 “숫자가 들어가는 경로” 같은 문자열 패턴이 돼요', 'slotting in a primitive such as ${number} creates string patterns such as “a path with a number”'], ['Capitalize, Uppercase 같은 내장 타입으로 대소문자를 바꿔 이벤트 이름 등을 만들어요', 'built-ins such as Capitalize and Uppercase change case to derive names such as event handlers'], ['클래스 이름, 이벤트, 라우트, 번역 키처럼 규칙이 있는 문자열을 타입으로 검사해요', 'they type-check patterned strings such as class names, events, routes and translation keys']],
    fin: [['템플릿 리터럴 타입: 문자열 리터럴 타입을 템플릿 문법으로 조합·변형하는 기능', 'template literal types combine and transform string literal types with template syntax', 'tsx-xs tsx-a'], ['매핑된 타입의 as와 함께 쓰면 키 이름을 체계적으로 바꿔요', 'paired with mapped-type as clauses, they rename keys systematically'], ['infer와 함께 쓰면 "/users/:id"에서 id를 뽑아내는 파서도 만들어요', 'with infer, they can even parse "/users/:id" to extract id']],
    caps: [['문자열 조합', 'Combining strings'], ['패턴 검사', 'Pattern checks'], ['대소문자 변환', 'Changing case'], ['쓰임새', 'Where they help'], ['템플릿 리터럴 타입', 'Template literal types']]
  });
}

function sBranded() {
  return CW('ts-branded', {
    code: ['type UserId = string;', 'type OrderId = string;', 'declare function cancel(id: OrderId): void;', ['cancel(user.id);           // ✓ 실수인데 통과', 'cancel(user.id);           // ✓ wrong, yet OK'], 'type Brand<T, B> = T & { __brand: B };', 'type UId = Brand<string, "UserId">;', 'type OId = Brand<string, "OrderId">;', 'declare function cancelB(id: OId): void;', ['cancelB(uid);              // ✗ 다른 브랜드', 'cancelB(uid);              // ✗ wrong brand'], ['const oid = parseOrderId(raw); // 검증 후 OId', 'const oid = parseOrderId(raw); // checked OId']],
    hl: [[0, 4, 'danger'], [4, 3], [7, 2, 'ok'], [9, 1]],
    side: [
      [[['별칭은 새 타입이 아니에요', 'an alias is not a new type'], 'r'], [['UserId도 OrderId도 그냥 string', 'both are just string'], '']],
      [[['가짜 꼬리표 속성을 교차해요', 'intersect a phantom tag property'], 'a'], [['런타임엔 그대로 문자열', 'at run time it is still a string'], '']],
      [[['브랜드가 다르면 섞이지 않아요', 'different brands no longer mix'], 'g']],
      [[['검증 함수에서만 브랜드를 붙여요', 'only a validator attaches the brand'], 'a'], [['“검증된 값”을 타입으로 보장', 'the type guarantees “validated”'], 'g']]
    ],
    notes: [['type UserId = string은 이름만 다를 뿐 같은 string이라, 엉뚱한 ID를 넘겨도 통과해요', 'type UserId = string is just another name for string, so passing the wrong ID compiles'], ['string에 가짜 속성 __brand를 교차하면 구조적으로 서로 다른 타입이 돼요', 'intersecting string with a phantom __brand property makes structurally distinct types'], ['이제 UserId를 OrderId 자리에 넣으면 컴파일 오류가 나요 · 런타임 비용은 없어요', 'a UserId in an OrderId slot is now a compile error, at no run-time cost'], ['브랜드는 검증 함수 한곳에서만 붙여, “검증을 거친 값”임을 타입으로 보장해요', 'attach brands only in one validating function, so the type guarantees the value was checked']],
    fin: [['브랜드 타입: 구조적 타이핑에서 모양이 같은 값을 의미별로 구분하는 기법', 'branded types distinguish same-shaped values by meaning under structural typing', 'tsx-xs tsx-a'], ['ID, 통화 단위(USD·KRW), 정제된 HTML, 이메일 주소 등에 써요', 'used for IDs, currencies such as USD and KRW, sanitized HTML and email addresses'], ['zod의 .brand()처럼 검증 라이브러리가 브랜드를 붙여 주기도 해요', 'validation libraries such as zod can attach brands with .brand()']],
    caps: [['별칭의 한계', 'The limits of aliases'], ['꼬리표 교차', 'Intersecting a tag'], ['섞이지 않는 ID', 'IDs that cannot mix'], ['검증과 브랜드', 'Validation and brands'], ['브랜드 타입', 'Branded types']]
  });
}
/* ===== TypeScript · 5. configuration and tooling ===== */
function sTsconfig() {
  return CW('ts-tsconfig', {
    file: 'tsconfig.json',
    code: ['{', '  "compilerOptions": {', '    "target": "ES2022",', '    "module": "NodeNext",', '    "strict": true,', '    "noUncheckedIndexedAccess": true,', '    "noEmit": true,', '    "paths": { "@/*": ["./src/*"] }', '  },', '  "include": ["src"]', '}'],
    hl: [[2, 2], [4, 1, 'ok'], [5, 2], [7, 1]],
    side: [
      [[['target: 어떤 JS 문법으로 낼지', 'target: which JS syntax to emit'], 'a'], [['module: import·require 방식', 'module: how modules work'], '']],
      [[['strict 하나가 여러 검사를 켜요', 'strict enables a family of checks'], 'g'], ['noImplicitAny  strictNullChecks …', 'm'], [['새 프로젝트는 무조건 켜요', 'always on for new projects'], 'g']],
      [[['인덱스 접근에 undefined 추가', 'index access gains undefined'], 'a'], [['noEmit: 검사만, 빌드는 번들러가', 'noEmit: check only; a bundler builds'], '']],
      [[['paths: import 별칭', 'paths: import aliases'], 'a'], [['번들러 설정과 맞춰야 해요', 'must match the bundler config'], 'w']]
    ],
    notes: [['tsconfig.json은 컴파일러 설정 파일이에요 · target은 출력 문법, module은 모듈 방식을 정해요', 'tsconfig.json configures the compiler: target sets the output syntax and module the module system'], ['strict: true는 null 검사, 암묵적 any 금지 같은 엄격한 검사 묶음을 한 번에 켜요', 'strict: true enables a bundle of checks such as null safety and no implicit any'], ['noUncheckedIndexedAccess는 인덱스 접근에 undefined를 더하고, noEmit은 검사만 하게 해요', 'noUncheckedIndexedAccess adds undefined to index access, and noEmit makes tsc check only'], ['paths는 @/components 같은 import 별칭을 정해요 · 번들러에도 같은 설정이 필요해요', 'paths defines import aliases such as @/components, which the bundler must mirror']],
    fin: [['tsconfig: 어떤 파일을, 얼마나 엄격하게, 어떤 JS로 컴파일할지 정하는 설정', 'tsconfig decides which files to compile, how strictly and into which JavaScript', 'tsx-xs tsx-a'], ['extends로 공통 설정(@tsconfig/strictest 등)을 물려받을 수 있어요', 'extends inherits shared presets such as @tsconfig/strictest'], ['모노레포는 references로 프로젝트를 나눠 빌드해요', 'monorepos split builds with project references']],
    caps: [['target과 module', 'target and module'], ['strict', 'strict'], ['더 엄격하게, 검사만', 'Stricter, check only'], ['paths 별칭', 'paths aliases'], ['tsconfig.json', 'tsconfig.json']]
  });
}

function sCompile() {
  return CW('ts-compile', {
    code: ['// input.ts', 'interface User { name: string }', 'const greet = (u: User): string =>', '  `hi ${u.name}`;', '// output.js', 'const greet = (u) =>', '  `hi ${u.name}`;'],
    hl: [[0, 4], [4, 3, 'ok'], null, null],
    side: [
      [[['.ts에는 타입이 섞여 있어요', '.ts files mix in types'], 'a'], [['브라우저는 타입 문법을 몰라요', 'browsers cannot parse type syntax'], '']],
      [[['출력에는 타입이 없어요', 'the output has no types'], 'g'], [['로직은 그대로, 표기만 삭제', 'logic intact, annotations deleted'], '']],
      [[['빌드 도구는 대부분 지우기만', 'most build tools only strip'], 'w'], [['검사는 tsc가 따로 해요', 'tsc does the checking separately'], 'a']],
      [[['Node.js 22.18+·Deno·Bun은', 'Node.js 22.18+, Deno and Bun'], ''], [['.ts 파일을 바로 실행해요', 'run .ts files directly'], 'g'], [['enum 같은 런타임 문법은 제외', 'except runtime syntax such as enum'], 'w']]
    ],
    draw: (S) => {
      const Y = 9.9, L = 1.0, LW = 7.4, RX = 9.6, RW = 13.0;
      [['tsc', ['타입 검사 + JS 출력 (느림)', 'type check + emit JS (slow)'], 'accent'], [['esbuild · swc', 'esbuild, swc'], ['타입만 지움 · 검사 없음 (아주 빠름)', 'strip types, no checks (very fast)'], 'warn'], ['tsc --noEmit', ['검사만 · 편집기와 CI에서', 'check only, in editors and CI'], 'ok']].forEach(([a, b, c], i) => {
        const y = Y + i * 1.5; chip(S, 'ta' + i, L, y, LW, a, c, 3, { pct: 16 }); arw(S, 'tw' + i, [L + LW + .1, y + .55], [RX - .1, y + .55], 3); chip(S, 'tb' + i, RX, y, RW, b, 'line', 3, { pct: 10 });
      });
    },
    notes: [['.ts 파일에는 interface와 타입 표기가 섞여 있어 브라우저가 바로 실행할 수 없어요', '.ts files mix in interfaces and annotations, so browsers cannot run them directly'], ['컴파일하면 타입이 모두 지워진 평범한 JS가 나와요 · 로직은 한 글자도 바뀌지 않아요', 'compiling erases every type and yields plain JavaScript with the logic unchanged'], ['esbuild·swc 같은 도구는 타입을 지우기만 해서 빠르지만 오류는 잡지 않아요 · 검사는 tsc --noEmit으로', 'esbuild and swc only strip types, which is fast but catches nothing; checking is done by tsc --noEmit'], ['요즘은 Node.js·Deno·Bun이 .ts를 직접 실행해요 · 타입만 지우는 방식이라 enum 같은 문법은 빠져요', 'Node.js, Deno and Bun now run .ts files directly by stripping types, which excludes syntax such as enums']],
    fin: [['타입 지우기: TS의 타입은 컴파일 시점에만 존재하고 출력 JS에는 남지 않아요', 'type erasure: TypeScript types exist only at compile time and leave nothing in the output', 'tsx-xs tsx-a'], ['그래서 “빌드는 성공했는데 타입 오류가 있는” 일이 생겨요 · CI에서 tsc를 꼭 돌려요', 'so a build can succeed despite type errors; always run tsc in CI'], ['isolatedModules를 켜면 파일 단위 변환 도구와 안전하게 맞춰져요', 'isolatedModules keeps code compatible with per-file transpilers']],
    caps: [['타입이 섞인 소스', 'Source with types'], ['지워진 출력', 'Erased output'], ['검사와 변환의 분리', 'Checking versus transpiling'], ['.ts를 바로 실행', 'Running .ts directly'], ['컴파일과 타입 지우기', 'Compilation and type erasure']]
  });
}

function sDts() {
  return CW('ts-dts', {
    code: [['// math.js (타입 없는 JS 라이브러리)', '// math.js (an untyped JS library)'], 'export function clamp(v, lo, hi) {…}', '// math.d.ts', 'export declare function clamp(', '  v: number, lo: number, hi: number): number;', '// npm i -D @types/lodash', 'import debounce from "lodash/debounce";', 'declare global {', '  interface Window { dataLayer: unknown[] }', '}'],
    hl: [[0, 2, 'warn'], [2, 3, 'ok'], [5, 2], [7, 3]],
    side: [
      [[['JS 라이브러리엔 타입이 없어요', 'JS libraries carry no types'], 'w'], [['그대로 쓰면 모두 any', 'everything becomes any'], 'r']],
      [[['.d.ts: 타입만 담은 선언 파일', '.d.ts: declarations only'], 'a'], [['구현 없이 모양만 알려 줘요', 'no implementation, just shapes'], '']],
      [[['DefinitelyTyped 커뮤니티 타입', 'community types from DefinitelyTyped'], 'a'], ['@types/<package>', 'm'], [['요즘 라이브러리는 대부분 내장', 'most modern libraries bundle types'], 'g']],
      [[['declare global: 전역 보강', 'declare global augments globals'], 'a'], [['window에 붙인 값도 타입 지정', 'types values attached to window'], '']]
    ],
    notes: [['타입 없이 작성된 JS 라이브러리를 가져오면 TS는 그 함수들의 모양을 알 수 없어요', 'importing an untyped JS library leaves TypeScript blind to its functions’ shapes'], ['.d.ts 선언 파일은 구현 없이 타입만 적어 “이 함수는 이런 모양”이라고 알려 줘요', 'a .d.ts file declares types without implementations, describing each function’s shape'], ['직접 쓰지 않아도 @types/lodash처럼 커뮤니티가 만든 선언을 설치할 수 있어요', 'community declarations such as @types/lodash can be installed instead of written'], ['declare global이나 모듈 보강으로 Window 같은 기존 타입에 속성을 더해요', 'declare global and module augmentation add properties to existing types such as Window']],
    fin: [['선언 파일(.d.ts): 런타임 코드 없이 타입 정보만 담은 파일 · 라이브러리와 TS를 이어 줘요', 'declaration files (.d.ts) hold type information without runtime code, bridging libraries and TypeScript', 'tsx-xs tsx-a'], ['라이브러리를 만들 땐 declaration: true로 .d.ts를 자동 생성해요', 'when publishing a library, declaration: true generates .d.ts files'], ['package.json의 types(또는 exports 안의 types)가 선언 파일 위치를 알려요', 'package.json’s types field, or types inside exports, points to the declarations']],
    caps: [['타입 없는 JS', 'Untyped JavaScript'], ['.d.ts 선언', '.d.ts declarations'], ['@types', '@types'], ['전역 보강', 'Global augmentation'], ['선언 파일과 @types', 'Declaration files and @types']]
  });
}

function sRuntime() {
  return CW('ts-runtime', {
    code: ['const res = await fetch("/api/user");', 'const user = (await res.json()) as User;', 'import { z } from "zod";', 'const UserSchema = z.object({', '  id: z.number(),', '  name: z.string().min(1),', '});', 'type User = z.infer<typeof UserSchema>;', 'const parsed = UserSchema.safeParse(data);', 'if (!parsed.success) showErrors(parsed.error);', 'else save(parsed.data);   // data: User'],
    hl: [[0, 2, 'danger'], [2, 5, 'ok'], [7, 1], [8, 3]],
    side: [
      [[['res.json()은 any를 돌려줘요', 'res.json() returns any'], 'w'], [['as User는 검사 없는 약속', 'as User is an unchecked promise'], 'r'], [['서버가 바뀌면 조용히 깨져요', 'a server change breaks it silently'], 'r']],
      [[['스키마: 런타임에 검사할 규칙', 'a schema: rules checked at run time'], 'a']],
      [[['스키마에서 타입을 뽑아요', 'derive the type from the schema'], 'g'], [['규칙과 타입이 한곳에', 'rules and type in one place'], '']],
      [[['safeParse: 실패해도 throw 없이', 'safeParse returns instead of throwing'], 'a'], [['성공하면 data는 User', 'on success, data is a User'], 'g']]
    ],
    notes: [['타입은 런타임에 사라져요 · 서버 응답에 as User를 붙여도 실제 모양은 아무도 확인하지 않아요', 'types vanish at run time, so adding as User to a server response checks nothing'], ['zod 같은 스키마 라이브러리로 런타임에 실제로 검사할 규칙을 선언해요', 'a schema library such as zod declares rules that are actually checked at run time'], ['z.infer로 스키마에서 타입을 뽑으면 규칙과 타입이 어긋날 일이 없어요', 'z.infer derives the type from the schema, so rules and types never drift apart'], ['safeParse는 성공과 실패를 결과로 돌려줘서 외부 입력을 경계에서 안전하게 걸러요', 'safeParse returns success or failure, filtering external input safely at the boundary']],
    fin: [['런타임 검증: 시스템 경계(API 응답, 폼, 환경 변수)로 들어오는 데이터를 실제로 확인하는 것', 'runtime validation checks data entering at system boundaries such as API responses, forms and environment variables', 'tsx-xs tsx-a'], ['zod, valibot, ArkType 등이 있고 tRPC·폼 라이브러리와 잘 맞물려요', 'options include zod, valibot and ArkType, which integrate with tRPC and form libraries'], ['경계 안쪽에서는 검증된 타입을 믿고 단언 없이 써요', 'inside the boundary, trust the validated types and skip assertions']],
    caps: [['as의 착각', 'The as illusion'], ['스키마 선언', 'Declaring a schema'], ['스키마에서 타입', 'Types from schemas'], ['경계에서 거르기', 'Filtering at the boundary'], ['런타임 검증', 'Runtime validation']]
  });
}

function sClasses() {
  return CW('ts-classes', {
    code: ['interface Shape { area(): number }', 'abstract class Base implements Shape {', '  constructor(protected name: string) {}', '  abstract area(): number;', '}', 'class Circle extends Base {', '  private cache?: number;', '  constructor(public r: number) {', '    super("circle");', '  }', '  area() { return Math.PI * this.r ** 2; }', '}'],
    hl: [[1, 4], [6, 1, 'warn'], [7, 3, 'ok'], [0, 2]],
    side: [
      [[['abstract: 직접 new 할 수 없는 기반', 'abstract: a base you cannot new'], 'a'], [['자식이 area를 꼭 구현해요', 'children must implement area'], '']],
      [[['public: 어디서나', 'public: anywhere'], 'g'], [['protected: 자신과 자식', 'protected: self and subclasses'], 'w'], [['private: 클래스 안에서만', 'private: inside the class only'], 'r']],
      [[['매개변수 속성: 선언과 대입을 한 번에', 'parameter properties declare + assign'], 'a'], [['public r → this.r 자동 생성', 'public r creates this.r'], 'g']],
      [[['implements: 모양을 지키는지 검사', 'implements checks the shape'], 'a'], [['TS private은 컴파일 때만', 'TS private is compile-time only'], 'w'], [['진짜 비공개는 #필드', 'true privacy uses #fields'], '']]
    ],
    notes: [['abstract 클래스는 직접 만들 수 없고, abstract 메서드는 자식이 반드시 구현해야 해요', 'an abstract class cannot be instantiated, and children must implement its abstract methods'], ['public·protected·private로 멤버를 어디서 쓸 수 있는지 정해요', 'public, protected and private control where members can be used'], ['생성자 매개변수 앞에 public을 붙이면 속성 선언과 대입이 한 번에 돼요', 'putting public before a constructor parameter declares and assigns the property in one go'], ['implements는 클래스가 interface의 모양을 지키는지 확인해요 · private은 컴파일 때만 막아요', 'implements verifies the class matches an interface; TS private is enforced only at compile time']],
    fin: [['TS 클래스: JS 클래스에 접근 제어자, abstract, implements, 매개변수 속성을 더한 것', 'TypeScript classes add access modifiers, abstract, implements and parameter properties to JavaScript classes', 'tsx-xs tsx-a'], ['런타임에도 숨기려면 JS 표준 #private 필드를 써요', 'use standard #private fields to hide members at run time too'], ['NestJS, Angular 같은 프레임워크가 이 문법을 적극 활용해요', 'frameworks such as NestJS and Angular rely heavily on these features']],
    caps: [['abstract', 'abstract'], ['접근 제어자', 'Access modifiers'], ['매개변수 속성', 'Parameter properties'], ['implements', 'implements'], ['클래스와 접근 제어자', 'Classes and access modifiers']]
  });
}

function sDecorator() {
  return CW('ts-decorator', {
    code: ['type Ctx = ClassMethodDecoratorContext;', 'function logged(fn: any, ctx: Ctx) {', '  return function (this: any, ...a: any[]) {', '    console.log(`→ ${String(ctx.name)}`);', '    return fn.apply(this, a);', '  };', '}', 'class Api {', '  @logged', '  getUser(id: number) { /* … */ }', '}', 'new Api().getUser(1);   // → getUser'],
    hl: [[7, 4, 'ok'], [1, 6], [11, 1, 'ok'], null],
    side: [
      [[['@함수: 클래스·메서드에 붙여요', '@function attaches to class members'], 'a'], [['클래스를 정의할 때 실행', 'it runs when the class is defined'], '']],
      [[['데코레이터는 그냥 함수', 'a decorator is just a function'], 'a'], [['원래 메서드를 받아', 'it receives the original method'], ''], [['감싼 새 메서드를 돌려줘요', 'and returns a wrapped one'], 'g']],
      [[['호출할 때마다 로그 먼저', 'every call logs first'], 'g'], [['로깅·캐시·권한 검사를 분리', 'separates logging, caching, auth'], '']],
      [['@Controller  @Get  @Injectable', 'm a'], [['experimentalDecorators: 옛 방식', 'experimentalDecorators: legacy'], 'w'], [['TS 5부터 표준 데코레이터', 'standard decorators since TS 5'], 'g']]
    ],
    notes: [['@logged처럼 @를 붙인 함수를 클래스 멤버 위에 쓰면 클래스를 정의할 때 그 함수가 실행돼요', 'writing a function with @, such as @logged, above a class member runs it when the class is defined'], ['데코레이터는 원래 메서드와 정보(ctx)를 받아 감싼 새 메서드를 돌려주는 평범한 함수예요', 'a decorator is an ordinary function that receives the method and a context and returns a wrapped method'], ['이제 getUser를 부를 때마다 로그가 먼저 찍혀요 · 공통 관심사를 메서드 본문에서 떼어 내요', 'every getUser call now logs first, lifting cross-cutting concerns out of the method body'], ['NestJS·Angular는 데코레이터로 라우트와 의존성을 선언해요 · 옛 실험적 방식과 TS 5 표준 방식은 서로 달라요', 'NestJS and Angular declare routes and dependencies with decorators; the legacy experimental form differs from the TS 5 standard']],
    fin: [['데코레이터: 클래스와 멤버의 정의를 감싸거나 메타데이터를 붙이는 함수', 'decorators are functions that wrap class and member definitions or attach metadata', 'tsx-xs tsx-a'], ['표준 데코레이터는 아직 매개변수 데코레이터를 지원하지 않아요', 'standard decorators do not yet support parameter decorators'], ['그래서 NestJS는 experimentalDecorators와 reflect-metadata를 계속 써요', 'that is why NestJS still uses experimentalDecorators with reflect-metadata']],
    caps: [['@ 문법', 'The @ syntax'], ['감싸는 함수', 'A wrapping function'], ['호출마다 동작', 'Behavior on every call'], ['프레임워크와 두 방식', 'Frameworks and two flavors'], ['데코레이터', 'Decorators']]
  });
}
return { css: CSSX, secs: [
  sec('ts-basic', '타입 기초', 'Type basics', '타입의 기초', 'The basics of types', '타입이 무엇을 약속하는지, 컴파일러가 타입을 어떻게 알아내고 좁히는지예요.', 'What a type promises, and how the compiler infers and narrows types.', [
    item('ts-why', '왜 TypeScript인가', 'Why TypeScript', '자바스크립트에 정적 타입을 더해, 코드를 실행하기 전에 타입 오류를 찾아 주는 언어예요. 컴파일하면 평범한 JS가 돼요.', 'type Item = { name: string; price: number }라고 적어 두면 price에 "3" 같은 문자열을 넣는 순간 편집기에 빨간 줄이 생겨요. 순수 JS였다면 0 + "3"이 "03"이 되는 버그가 조용히 배포됐을 거예요. 검사가 끝나면 tsc는 타입 표기를 모두 지운 평범한 JS를 내보내서 브라우저와 Node.js에서 그대로 실행돼요. 타입 정보 덕분에 자동 완성, 정의로 이동, 안전한 이름 바꾸기도 가능해요. 다만 검사는 컴파일 시점에만 하므로 서버 응답 같은 외부 데이터는 따로 검증해야 해요.', 'A language that adds static types to JavaScript and finds type errors before the code runs; it compiles to plain JavaScript.', 'With type Item = { name: string; price: number }, putting a string such as "3" into price draws a red squiggle immediately. In plain JavaScript, 0 + "3" would quietly become "03" and ship as a bug. After checking, tsc emits plain JavaScript with every annotation removed, which runs as is in browsers and Node.js. The type information also powers autocomplete, go-to-definition and safe renames. Checking happens only at compile time, so external data such as server responses still needs validation.', sWhy()),
    item('ts-inference', '타입 추론', 'Type inference', '타입을 적지 않아도 초기값과 문맥을 보고 컴파일러가 타입을 알아내는 기능이에요.', 'let count = 0은 number, const mode = "dark"는 바뀌지 않으므로 리터럴 타입 "dark", let theme = "dark"는 바뀔 수 있으니 넓은 string이 돼요. 배열과 객체도 안의 값으로 추론되고, nums.map((n) => …)의 n처럼 콜백 매개변수는 놓인 자리(문맥)로 추론돼요. 함수의 반환 타입도 본문에서 알아내지만 매개변수는 직접 적어야 해요. 초기값 없는 let x나 표기 없는 매개변수는 any가 되니 noImplicitAny(strict)로 막아요. 보통은 매개변수와 공개 API에 타입을 적고 지역 변수는 추론에 맡겨요.', 'The compiler works out types from initial values and context, even when no type is written.', 'let count = 0 is number; const mode = "dark" never changes, so it gets the literal type "dark"; let theme = "dark" may change, so it widens to string. Arrays and objects are inferred from their contents, and callback parameters such as n in nums.map((n) => …) are inferred from context. Return types are inferred from the body, but parameters need annotations. A let x without a value or an unannotated parameter becomes any, which noImplicitAny (part of strict) forbids. The usual style annotates parameters and public APIs and lets inference handle locals.', sInfer()),
    item('ts-arrays', '배열과 튜플', 'Arrays and tuples', '배열은 같은 타입 원소의 목록(number[])이고, 튜플은 길이와 자리마다 타입이 정해진 배열([number, string])이에요.', 'const ids: number[]에 "4"를 push하면 오류예요. Array<string>도 같은 뜻이에요. [number, number]는 좌표처럼 정확히 두 개의 숫자를 담고, [key: string, value: number]처럼 자리에 이름을 붙여 뜻을 적을 수도 있어요. readonly string[]은 push나 sort 같은 변경 메서드가 없어서 함수 매개변수로 받을 때 원본을 지켜 줘요. React의 useState가 [값, 설정 함수] 튜플을 돌려주기 때문에 const [count, setCount]처럼 이름을 자유롭게 붙일 수 있어요.', 'An array is a list of one element type (number[]); a tuple fixes its length and the type of each position ([number, string]).', 'Pushing "4" onto const ids: number[] is an error, and Array<string> means the same as string[]. [number, number] holds exactly two numbers, like a coordinate, and labels such as [key: string, value: number] document each slot. readonly string[] has no mutating methods such as push or sort, protecting the caller’s array when used as a parameter. Because React’s useState returns a [value, setter] tuple, you can name both freely, as in const [count, setCount].', sArrays()),
    item('ts-anyunknown', 'any·unknown·never', 'any, unknown and never', 'any는 타입 검사를 끄는 탈출구, unknown은 모든 값을 받되 확인한 뒤에만 쓰는 안전한 타입, never는 값이 하나도 없는 타입이에요.', 'let a: any = JSON.parse(text)에서 a.foo.bar()는 아무 검사 없이 통과해 런타임에야 터져요. 같은 값을 unknown으로 받으면 u.foo부터 오류가 나고, typeof u === "string"처럼 확인한 블록 안에서만 문자열로 쓸 수 있어요. never는 항상 throw하는 함수의 반환 타입이나 모든 경우를 처리한 뒤의 불가능한 분기에 나타나요. 타입을 집합으로 보면 unknown은 맨 위(모든 값), never는 맨 아래(공집합)예요. 외부 입력은 any 대신 unknown으로 받는 습관을 들여요.', 'any is an escape hatch that turns checking off, unknown accepts every value but must be checked before use, and never is the type with no values at all.', 'With let a: any = JSON.parse(text), a.foo.bar() passes unchecked and fails only at run time. Received as unknown, even u.foo is an error, and the value can be used as a string only inside a check such as typeof u === "string". never appears as the return type of functions that always throw and in impossible branches after every case is handled. Seen as sets, unknown is the top (every value) and never the bottom (the empty set). Make a habit of receiving external input as unknown rather than any.', sAnyUnknown()),
    item('ts-union', '유니언과 리터럴 타입', 'Unions and literal types', '유니언(A | B)은 여러 타입 중 하나인 값이고, 리터럴 타입은 "idle"이나 8처럼 정확히 그 값 하나만 허용하는 타입이에요.', 'type Status = "idle" | "loading" | "error"에 "done"을 넣으면 오류라서 상태 이름의 오타가 컴파일 시점에 잡혀요. type Id = string | number는 두 값 집합의 합집합이라, id.toUpperCase()처럼 한쪽에만 있는 메서드는 바로 쓸 수 없고 String(id)처럼 둘 다 가능한 일만 허용돼요. 한쪽으로 쓰려면 typeof로 먼저 좁혀요. 8 | 16 | 24 같은 숫자 리터럴 유니언도 되고, 편집기가 허용되는 값을 자동 완성해 줘요. 리터럴 유니언은 enum 대신 가장 많이 쓰는 방식이에요.', 'A union (A | B) is a value of one of several types, and a literal type allows exactly one value such as "idle" or 8.', 'Assigning "done" to type Status = "idle" | "loading" | "error" is an error, so status typos are caught at compile time. type Id = string | number is the union of both value sets, so methods on only one side, such as id.toUpperCase(), are rejected and only shared operations such as String(id) are allowed. Narrow with typeof first to use one side. Numeric literal unions such as 8 | 16 | 24 work too, and the editor autocompletes the allowed values. Literal unions are the most common alternative to enums.', sUnion()),
    item('ts-narrowing', '타입 좁히기', 'Narrowing', '조건문을 보고 블록마다 더 구체적인 타입을 알아내는 컴파일러의 분석이에요. typeof, instanceof, in, ===가 대표 도구예요.', 'v: string | number | Date | null에서 v === null을 먼저 return하면 그 아래에서 v는 string | number | Date예요. typeof v === "string" 블록 안에서는 문자열 메서드를 쓸 수 있고, instanceof Date까지 거르면 마지막에 남는 건 number뿐이라 toFixed가 허용돼요. 객체 유니언 Circle | Square는 "r" in s처럼 속성 존재로 나눠요. 이렇게 return과 분기를 따라가며 남은 가능성을 계산하는 것을 제어 흐름 분석이라 해요. typeof null이 "object"라서 객체 검사 전에 null을 먼저 거르는 게 안전해요.', 'The compiler’s analysis of conditions that works out a more specific type in each block, using typeof, instanceof, in and ===.', 'For v: string | number | Date | null, returning early on v === null leaves string | number | Date below. Inside typeof v === "string", string methods are available, and once instanceof Date is filtered out only number remains, so toFixed is allowed. Object unions such as Circle | Square split by property, as in "r" in s. Following returns and branches to compute what remains is called control-flow analysis. Because typeof null is "object", filter null before object checks.', sNarrow()),
    item('ts-interface', 'interface와 type', 'interface and type', '둘 다 타입에 이름을 붙여요. interface는 객체 모양을 정의하고 확장·병합에 강하며, type은 유니언·튜플·함수 등 무엇에든 이름을 붙여요.', 'interface User { id: number; name: string }처럼 객체가 가져야 할 속성을 적고, interface Admin extends User로 확장해요. 같은 이름의 interface를 다시 선언하면 자동으로 합쳐져서(선언 병합) 라이브러리 타입을 보강할 때 써요. type Point = { x: number; y: number }도 객체 모양을 표현하고, type Id = string | number처럼 interface로는 안 되는 유니언에도 이름을 붙여요. type은 &(교차 타입)로 확장해요. 객체 모양에는 어느 쪽이든 괜찮고, 팀에서 한 규칙으로 통일하는 게 더 중요해요.', 'Both name types: interface defines object shapes and excels at extension and merging, while type can name anything, including unions, tuples and functions.', 'interface User { id: number; name: string } lists the properties an object must have, and interface Admin extends User builds on it. Redeclaring an interface with the same name merges the declarations, which is used to augment library types. type Point = { x: number; y: number } describes object shapes too, and type Id = string | number names a union, which interface cannot. A type extends with & (intersection). Either works for object shapes; agreeing on one team convention matters more.', sInterface()),
    item('ts-optional', '선택적 속성과 readonly', 'Optional and readonly properties', '속성 뒤의 ?는 “없어도 되는” 선택적 속성, 앞의 readonly는 “만든 뒤 바꿀 수 없는” 속성이에요.', 'subtitle?: string은 생략해도 되고, 타입이 string | undefined가 돼요. 그래서 p.subtitle.length는 오류이고 p.subtitle?.length ?? 0처럼 없을 때를 처리해야 해요. readonly id: number는 객체를 만든 뒤 p.id = 2처럼 다시 대입하면 오류예요. Readonly<Post>는 모든 속성을 한 번에 readonly로 만들지만 안쪽 객체까지 얼리지는 않아요. readonly는 컴파일 시점 검사일 뿐이라 런타임에도 막으려면 Object.freeze를 함께 써요.', 'A ? after a property makes it optional, and readonly before it means it cannot change after creation.', 'subtitle?: string may be omitted, and its type becomes string | undefined. So p.subtitle.length is an error, and absence must be handled, as in p.subtitle?.length ?? 0. readonly id: number makes a later p.id = 2 an error. Readonly<Post> makes every property readonly at once, but not nested objects. readonly is only a compile-time check, so pair it with Object.freeze to enforce it at run time.', sOptional()),
  ]),
  sec('ts-objtypes', '함수와 객체', 'Functions & objects', '함수와 객체의 타입', 'Typing functions and objects', '함수에 타입을 붙이는 법, 구조적 타이핑, 그리고 객체 타입을 합치고 좁히고 단언하는 도구들이에요.', 'Typing functions, structural typing, and the tools for combining, narrowing and asserting object types.', [
    item('ts-functype', '함수에 타입 붙이기', 'Typing functions', '함수 타입은 매개변수 타입과 반환 타입으로 이뤄져요. 함수 타입에 이름을 붙이고, 오버로드로 여러 호출 모양을 표현해요.', 'function greet(name: string, loud?: boolean)처럼 매개변수에 타입을 적고, 반환 타입은 보통 본문에서 추론돼요. ?는 생략 가능한 매개변수예요. type Handler = (e: MouseEvent) => void에 이름을 붙여 두면 그 자리에 넘긴 콜백의 e가 자동으로 MouseEvent가 돼요. ...nums: number[]처럼 나머지 매개변수는 배열 타입으로 받아요. 문자열을 넣으면 number, 배열을 넣으면 number[]를 돌려주는 함수처럼 입력에 따라 결과가 다르면 오버로드 시그니처를 여러 개 선언해요. 유니언으로 충분하면 그쪽이 더 단순해요.', 'A function type consists of parameter types and a return type; function types can be named, and overloads describe several call shapes.', 'Annotate parameters as in function greet(name: string, loud?: boolean); the return type is usually inferred from the body, and ? marks an optional parameter. Naming type Handler = (e: MouseEvent) => void makes e in any callback passed there a MouseEvent automatically. Rest parameters such as ...nums: number[] take an array type. When results depend on input, such as returning number for a string and number[] for an array, declare several overload signatures. A union is simpler when it suffices.', sFuncType()),
    item('ts-structural', '구조적 타이핑', 'Structural typing', '타입 호환을 이름이 아니라 구조(속성과 그 타입)로 판단해요. 필요한 속성만 갖추면 어떤 객체든 통과해요.', 'draw(p: Point)에 { x: 1, y: 2, z: 3 }을 담은 변수 v를 넘기면 x와 y가 맞으므로 통과해요. 남는 z는 상관없어요. Point를 언급한 적 없는 class Pixel { x = 0; y = 0 }의 인스턴스도 모양이 같아서 넘길 수 있어요. 예외로, 객체 리터럴을 바로 넘길 때는 초과 속성 검사가 z를 오타로 보고 오류를 내요. Java·C#처럼 선언한 이름으로 비교하는 명목적 타이핑과 달라서, JS의 덕 타이핑 습관을 그대로 표현할 수 있어요.', 'Type compatibility is decided by structure, properties and their types, rather than by names; any object with the required properties fits.', 'Passing a variable v holding { x: 1, y: 2, z: 3 } to draw(p: Point) works because x and y match; the extra z does not matter. An instance of class Pixel { x = 0; y = 0 }, which never mentions Point, fits too because the shape matches. The exception is a fresh object literal, where the excess property check treats z as a likely typo and reports an error. Unlike nominal typing in Java or C#, which compares declared names, this captures JavaScript’s duck typing directly.', sStructural()),
    item('ts-intersection', '교차 타입', 'Intersection types', 'A & B는 A이면서 동시에 B인 값이에요. 객체 타입끼리 교차하면 두 모양의 속성을 모두 가져야 해요.', 'type Doc = Named & Stamped이면 Doc 값은 name과 createdAt을 모두 가져야 해요. 여러 작은 타입을 조합해 큰 타입을 만들 때 써요. string & number처럼 원시 타입끼리 교차하면 둘 다인 값이 없어서 never가 돼요. 같은 속성의 타입이 충돌해도 그 속성이 never가 되니 주의해요. 제네릭과 함께 쓰면 <T>(o: T) => T & { id: string }처럼 “받은 객체에 id를 더한 결과”를 정확하게 표현해요. 유니언은 “둘 중 하나”, 교차는 “둘 다”로 기억해요.', 'A & B is a value that is both A and B; intersecting object types requires the properties of both.', 'With type Doc = Named & Stamped, a Doc must have both name and createdAt, which is how larger types are composed from small ones. Intersecting primitives such as string & number leaves no value that is both, so the result is never, and conflicting types for the same property also turn that property into never. With generics, <T>(o: T) => T & { id: string } precisely describes “the input object plus an id”. Remember: a union means either, an intersection means both.', sIntersect()),
    item('ts-enum', 'enum과 as const', 'enum and as const', 'enum은 이름 붙인 상수 모음이지만 실제 JS 객체를 만들어 내는 TS 전용 문법이에요. 요즘은 as const 객체와 리터럴 유니언을 더 많이 써요.', 'enum Dir { Up, Down }은 0, 1로 번호가 매겨지고, 컴파일하면 Dir[0] === "Up" 같은 역매핑까지 담은 객체 코드가 생겨요. 다른 타입 문법처럼 지워지지 않기 때문에 타입만 지우는 Node.js 실행이나 erasableSyntaxOnly 설정과 맞지 않아요. 대안으로 const Role = { Admin: "admin", User: "user" } as const로 값을 readonly 리터럴로 고정하고, typeof Role[keyof typeof Role]로 "admin" | "user" 타입을 뽑아요. 평범한 JS 객체라 어떤 도구에서도 그대로 동작해요.', 'An enum is a set of named constants, but it is TypeScript-only syntax that emits a real JavaScript object; as const objects and literal unions are now more common.', 'enum Dir { Up, Down } numbers its members 0 and 1, and compiles to object code that even includes a reverse map such as Dir[0] === "Up". Because it is not erased like other type syntax, it clashes with Node.js type stripping and the erasableSyntaxOnly setting. The alternative, const Role = { Admin: "admin", User: "user" } as const, freezes the values as readonly literals, and typeof Role[keyof typeof Role] derives the type "admin" | "user". As a plain JavaScript object, it works with every tool.', sEnum()),
    item('ts-satisfies', 'as const와 satisfies', 'as const and satisfies', 'satisfies는 값이 어떤 타입을 만족하는지 검사만 하고 추론된 정확한 타입은 그대로 둬요. as const는 값을 가장 좁은 리터럴 타입으로 고정해요.', 'const a: Theme = { gap: 8, brand: "#36f" }처럼 타입을 표기하면 a는 넓은 Record 타입이 되어 a.gap이 number라는 사실을 잊고, a.typo 같은 없는 키도 허용돼요. 같은 객체에 satisfies Theme을 붙이면 Theme 규칙에 맞는지는 확인하면서 gap: number, brand: string이라는 정확한 타입이 유지되고, 오타 키도 잡혀요. [8, 16] as const는 number[]가 아니라 readonly [8, 16] 튜플이 돼요. 설정 객체, 라우트 표, 디자인 토큰에 특히 유용하고, as const satisfies T로 함께 쓰기도 해요.', 'satisfies checks that a value conforms to a type while keeping its precise inferred type, and as const fixes values to their narrowest literal types.', 'Annotating const a: Theme = { gap: 8, brand: "#36f" } widens a to a broad Record type, forgetting that a.gap is a number and allowing nonexistent keys such as a.typo. Adding satisfies Theme to the same object checks it against Theme while keeping gap: number and brand: string, and catches typo keys. [8, 16] as const becomes the readonly tuple [8, 16] rather than number[]. It is especially handy for config objects, route tables and design tokens, and the two combine as as const satisfies T.', sSatisfies()),
    item('ts-assert', '타입 단언', 'Type assertions', 'as와 !는 “컴파일러보다 내가 더 잘 안다”는 선언이에요. 아무것도 검사하거나 변환하지 않아서, 틀리면 그대로 런타임 버그가 돼요.', 'document.getElementById("app")의 타입은 HTMLElement | null이라 바로 쓰면 오류예요. el!.textContent처럼 !를 붙이면 null이 아니라고 보증하는 것이고, 실제로 없으면 런타임에 터져요. el as HTMLInputElement는 값은 그대로 두고 타입만 바꿔 말해서, 실제로 div라면 input.value는 undefined예요. "3" as unknown as number 같은 이중 단언은 거의 항상 버그예요. 가능하면 el instanceof HTMLInputElement처럼 검사로 좁혀서 컴파일러가 직접 확인하게 하고, 외부 데이터는 런타임 검증으로 확인해요.', 'as and ! declare that you know better than the compiler; they check and convert nothing, so a wrong assertion simply becomes a runtime bug.', 'document.getElementById("app") has type HTMLElement | null, so using it directly is an error. el!.textContent promises it is not null and crashes at run time if it is. el as HTMLInputElement changes only the declared type, so if the element is really a div, input.value is undefined. Double assertions such as "3" as unknown as number are almost always bugs. Prefer narrowing with checks such as el instanceof HTMLInputElement so the compiler verifies it, and validate external data at run time.', sAssert()),
    item('ts-index', '인덱스 시그니처와 Record', 'Index signatures and Record', '[key: string]: number는 “어떤 키든 값은 number”, Record<K, V>는 “키 집합 K의 모든 키에 값 V”를 뜻해요.', 'interface Scores { [name: string]: number }는 키를 미리 모르는 사전에 써요. 다만 s.park처럼 없는 키도 number로 보이니 noUncheckedIndexedAccess를 켜서 number | undefined로 정확하게 만들어요. Record<"ko" | "en", string>은 유니언의 모든 키를 요구해서, 번역 표에서 en 하나를 빠뜨리면 바로 오류가 나요. Record<string, T>는 인덱스 시그니처와 같은 뜻이에요. 키가 실행 중에 자주 추가·삭제되면 Map<K, V>가 더 알맞고, get의 결과에 undefined가 포함되어 안전해요.', '[key: string]: number means any key maps to a number, and Record<K, V> means every key in K maps to V.', 'interface Scores { [name: string]: number } suits dictionaries whose keys are unknown in advance. A missing key such as s.park still looks like a number, so enable noUncheckedIndexedAccess to get number | undefined. Record<"ko" | "en", string> requires every key in the union, so a translation table missing en is an immediate error. Record<string, T> means the same as an index signature. For keys added and removed at run time, Map<K, V> fits better, and its get includes undefined for safety.', sIndex()),
  ]),
  sec('ts-generic', '제네릭', 'Generics', '제네릭과 유틸리티 타입', 'Generics and utility types', '타입을 매개변수로 받아 재사용하는 법과, 기존 타입에서 새 타입을 뽑아내는 도구들이에요.', 'Reusing code by passing types as parameters, and deriving new types from existing ones.', [
    item('ts-generics', '제네릭', 'Generics', '타입을 매개변수(<T>)로 받아, 여러 타입에 재사용하면서도 타입 정보를 잃지 않는 방법이에요.', 'firstAny(arr: any[])는 어떤 배열이든 받지만 결과도 any라서 무엇이 들어갔는지 잊어버려요. function first<T>(arr: T[]): T는 number 배열을 넣으면 number가, 문자열 배열을 넣으면 string이 나와요. T는 보통 인자에서 추론되고, 필요하면 first<string>(…)처럼 직접 넘겨요. interface Box<T> { value: T }처럼 타입도 제네릭이 될 수 있고, Array<T>, Promise<T>, Map<K, V>가 대표 예예요. 한 번만 쓰이는 타입 매개변수는 대개 필요 없어서 그냥 구체 타입을 써요.', 'Generics take types as parameters (<T>), so code can be reused across types without losing type information.', 'firstAny(arr: any[]) accepts every array, but its result is any and forgets what went in. function first<T>(arr: T[]): T returns number for a number array and string for a string array. T is usually inferred from the arguments and can be passed explicitly as first<string>(…). Types can be generic too, as in interface Box<T> { value: T }, with Array<T>, Promise<T> and Map<K, V> as the classic examples. A type parameter used only once is usually unnecessary; use the concrete type instead.', sGenerics()),
    item('ts-constraint', '제네릭 제약', 'Generic constraints', 'T extends 조건으로 타입 매개변수가 가져야 할 최소한의 모양을 정해요. 조건을 지키는 타입만 받으면서 결과 타입은 구체적으로 유지돼요.', '제약 없는 longest<T>(a: T, b: T)에서 a.length를 쓰면 T에 length가 있다는 보장이 없어 오류예요. longer<T extends { length: number }>로 바꾸면 문자열·배열처럼 length가 있는 타입만 받아요. longer("ab", "c")의 결과는 string, longer([1, 2], [3])는 number[]처럼 넘긴 타입이 그대로 나오고, longer(10, 20)은 호출 단계에서 거부돼요. <T = string>처럼 기본 타입을 정해 두면 추론할 단서가 없을 때 그 타입을 써요. K extends keyof T처럼 다른 매개변수와 엮을 수도 있어요.', 'T extends … sets the minimum shape a type parameter must have, accepting only conforming types while keeping the result specific.', 'In an unconstrained longest<T>(a: T, b: T), using a.length is an error because T may lack length. Changing it to longer<T extends { length: number }> accepts only types with a length, such as strings and arrays. longer("ab", "c") returns string and longer([1, 2], [3]) returns number[], keeping the exact type passed in, while longer(10, 20) is rejected at the call. A default such as <T = string> applies when there is nothing to infer. Constraints can link parameters too, as in K extends keyof T.', sConstraint()),
    item('ts-keyof', 'keyof와 인덱스 접근 타입', 'keyof and indexed access types', 'keyof T는 T의 키 이름 유니언이고, T[K]는 그 키의 값 타입이에요. 둘을 합치면 키를 안전하게 다루는 함수를 만들어요.', 'type User = { id: number; name: string }에서 keyof User는 "id" | "name", User["name"]은 string이에요. function get<T, K extends keyof T>(o: T, k: K): T[K]는 get(u, "name")에 string을 돌려주고, 없는 키 "age"는 호출 단계에서 거부해요. (typeof list)[number]처럼 [number]로 인덱스하면 배열 원소의 타입을 꺼낼 수 있어요. keyof와 T[K]는 Partial, Pick 같은 유틸리티 타입과 매핑된 타입의 재료예요.', 'keyof T is the union of T’s key names and T[K] is the type of that key’s value; together they type functions that handle keys safely.', 'For type User = { id: number; name: string }, keyof User is "id" | "name" and User["name"] is string. function get<T, K extends keyof T>(o: T, k: K): T[K] returns string for get(u, "name") and rejects the unknown key "age" at the call. Indexing with [number], as in (typeof list)[number], extracts an array’s element type. keyof and T[K] are the building blocks of utility types such as Partial and Pick, and of mapped types.', sKeyof()),
    item('ts-utility', '객체 유틸리티 타입', 'Object utility types', 'Partial, Required, Pick, Omit, Readonly는 기존 객체 타입을 변형해 새 타입을 만드는 내장 제네릭이에요.', 'Todo { id, title, done }에서 Partial<Todo>는 모든 속성을 선택적으로, Required는 반대로 모두 필수로 바꿔요. Pick<Todo, "id" | "title">은 고른 키만 남기고, Omit<Todo, "id">는 그 키를 빼요. Readonly<Todo>는 모든 속성을 readonly로 만들어요. 조합하면 수정 요청 타입을 Partial<Omit<Todo, "id">>처럼 한 줄로 정확하게 표현해요. 원본 Todo를 고치면 파생된 타입도 자동으로 따라와서 같은 모양을 두 번 관리할 일이 없어요.', 'Partial, Required, Pick, Omit and Readonly are built-in generics that transform an existing object type into a new one.', 'For Todo { id, title, done }, Partial<Todo> makes every property optional and Required makes them all required. Pick<Todo, "id" | "title"> keeps only the chosen keys, and Omit<Todo, "id"> removes them. Readonly<Todo> makes every property readonly. Combined, a patch type is written precisely in one line as Partial<Omit<Todo, "id">>. Change Todo and every derived type follows, so no shape is maintained twice.', sUtility()),
    item('ts-utility2', '함수·유니언 유틸리티 타입', 'Function and union utility types', 'Parameters, ReturnType, Awaited는 함수에서 타입을 뽑고, Extract, Exclude, NonNullable은 유니언을 거르는 내장 타입이에요.', 'Parameters<typeof load>는 [id: number] 같은 매개변수 튜플을, ReturnType<typeof load>는 반환 타입을 줘요. async 함수라면 Promise<…>이 나오니 Awaited로 감싸 실제 값의 타입을 꺼내요. 유니언 S = "a" | "b" | "c"에서 Extract<S, "a" | "b">는 맞는 멤버만 남기고, Exclude는 그 멤버를 빼서 "c"를 남겨요. NonNullable<string | null>은 string이에요. 라이브러리가 타입을 따로 내보내지 않아도 함수에서 바로 뽑아 쓸 수 있어 정의가 한곳에 모여요.', 'Parameters, ReturnType and Awaited extract types from functions, while Extract, Exclude and NonNullable filter unions.', 'Parameters<typeof load> gives the parameter tuple, such as [id: number], and ReturnType<typeof load> the return type. For an async function this is Promise<…>, so wrap it in Awaited to get the resolved value’s type. For S = "a" | "b" | "c", Extract<S, "a" | "b"> keeps the matching members and Exclude removes them, leaving "c". NonNullable<string | null> is string. Types can be pulled straight from functions even when a library exports none, keeping one source of truth.', sUtilityFn()),
  ]),
  sec('ts-advanced', '고급 타입', 'Advanced types', '고급 타입 기법', 'Advanced type techniques', '불가능한 상태를 없애는 모델링부터 타입 수준의 조건문, 반복, 문자열 조합까지예요.', 'From modeling that rules out impossible states to type-level conditions, loops and string building.', [
    item('ts-discriminated', '판별 유니언', 'Discriminated unions', '공통 꼬리표 속성(status, type 등)의 리터럴 값으로 구분되는 유니언이에요. 꼬리표를 확인하면 나머지 속성이 정확히 좁혀져요.', 'Result를 { status: "ok"; data } | { status: "error"; message } | { status: "loading" }로 정의하면, switch (r.status)의 각 case 안에서 r이 해당 모양으로 좁혀져 ok일 때만 r.data에 접근할 수 있어요. data와 message를 둘 다 선택적 속성으로 두는 방식과 달리 “성공인데 오류 메시지도 있는” 불가능한 상태를 아예 만들 수 없어요. default에서 const x: never = r로 대입해 두면, 나중에 새 상태를 추가했을 때 처리하지 않은 모든 switch가 컴파일 오류로 드러나요. 화면 상태, Redux 액션, API 결과 모델링의 기본이에요.', 'A union whose members are told apart by the literal value of a shared tag property such as status or type; checking the tag narrows the rest precisely.', 'Defining Result as { status: "ok"; data } | { status: "error"; message } | { status: "loading" } narrows r inside each case of switch (r.status), so r.data is reachable only when ok. Unlike making data and message both optional, impossible states such as a success with an error message simply cannot be written. Assigning const x: never = r in default turns every unhandled switch into a compile error when a new status is added later. It is the standard way to model screen states, Redux actions and API results.', sDiscrim()),
    item('ts-guard', '사용자 정의 타입 가드', 'User-defined type guards', '반환 타입을 p is Fish처럼 적은 함수예요. true를 돌려주면 그 값이 Fish라고 컴파일러가 믿고 타입을 좁혀요.', 'function isFish(p: Fish | Bird): p is Fish로 만들면 if (isFish(pet)) 안에서는 Fish, else에서는 Bird로 좁혀져요. [1, null, 2].filter((x): x is number => x !== null)은 number[]가 되는데, TS 5.5부터는 이런 단순한 경우를 자동으로 추론해요. asserts v is string을 반환 타입으로 쓰면 통과하지 못할 때 예외를 던지고, 그다음 줄부터 v를 string으로 좁혀요. 주의할 점은 검사 로직이 틀려도 컴파일러는 그대로 믿는다는 것이에요. 복잡한 검사는 zod 같은 스키마 라이브러리에 맡기면 안전해요.', 'A function whose return type reads like p is Fish; when it returns true, the compiler trusts that the value is a Fish and narrows it.', 'With function isFish(p: Fish | Bird): p is Fish, pet is a Fish inside if (isFish(pet)) and a Bird in else. [1, null, 2].filter((x): x is number => x !== null) yields number[], and since TS 5.5 such simple cases are inferred automatically. An asserts v is string return type throws when the check fails and narrows v to string from the next line on. The catch is that the compiler trusts the guard even if its logic is wrong, so leave complex checks to schema libraries such as zod.', sGuard()),
    item('ts-conditional', '조건부 타입과 infer', 'Conditional types and infer', 'T extends U ? X : Y로 타입을 분기하는 타입 수준의 삼항 연산자예요. infer로 패턴 속의 타입을 꺼낼 수 있어요.', 'type Is<T> = T extends string ? "y" : "n"에서 Is<"hi">는 "y", Is<42>는 "n"이에요. 유니언을 넘기면 멤버마다 따로 적용되어 Is<"a" | 1>은 "y" | "n"이 돼요(분배). T extends Promise<infer U> ? U : T는 Promise<number>에서 number를 꺼내고, T extends (infer E)[] ? E : never는 배열의 원소 타입을 꺼내요. 내장 ReturnType과 Awaited도 이 방식으로 구현되어 있어요. 분배를 막으려면 [T] extends [U]처럼 감싸고, 앱 코드에서는 꼭 필요할 때만 써요.', 'A type-level ternary, T extends U ? X : Y, that branches on types; infer pulls types out of a pattern.', 'With type Is<T> = T extends string ? "y" : "n", Is<"hi"> is "y" and Is<42> is "n". A union argument is processed member by member, so Is<"a" | 1> is "y" | "n" (distribution). T extends Promise<infer U> ? U : T extracts number from Promise<number>, and T extends (infer E)[] ? E : never extracts an array’s element type. The built-in ReturnType and Awaited are implemented this way. Wrap as [T] extends [U] to prevent distribution, and use these sparingly in application code.', sConditional()),
    item('ts-mapped', '매핑된 타입', 'Mapped types', '[K in keyof T]로 기존 타입의 키를 하나씩 돌며 속성을 변형해 새 객체 타입을 만드는 문법이에요.', 'type Flags<T> = { [K in keyof T]: boolean }은 { dark: string; beta: number }를 { dark: boolean; beta: boolean }으로 바꿔요. 값 타입 T[K]를 유지하고 ?만 붙이면 Partial을 직접 만든 셈이고, -readonly나 -?처럼 앞에 -를 붙이면 수식어를 떼어 내요. as 절로 키 이름 자체를 바꿀 수도 있어서, 이벤트 맵에서 click을 onclick 핸들러로 바꾸는 식이에요. as에서 never를 돌려주면 그 키를 걸러 내요. Partial, Required, Readonly, Record가 모두 매핑된 타입이에요.', 'Syntax that iterates over the keys of an existing type with [K in keyof T] and transforms each property into a new object type.', 'type Flags<T> = { [K in keyof T]: boolean } turns { dark: string; beta: number } into { dark: boolean; beta: boolean }. Keeping T[K] and adding ? rebuilds Partial, and a leading -, as in -readonly or -?, removes modifiers. An as clause renames the keys themselves, turning click in an event map into an onclick handler, and returning never there filters a key out. Partial, Required, Readonly and Record are all mapped types.', sMapped()),
    item('ts-template', '템플릿 리터럴 타입', 'Template literal types', '백틱 문법으로 문자열 리터럴 타입을 조합하고 변형해요. 클래스 이름, 이벤트 이름, 경로 같은 규칙 있는 문자열을 타입으로 검사해요.', '`${Color}-${Size}`는 색 2개와 크기 3개를 곱해 "red-sm"부터 "blue-lg"까지 6개의 리터럴 유니언을 만들어요. `/users/${number}`처럼 원시 타입을 끼우면 "/users/42"는 통과하고 "/users/kim"은 거부하는 패턴이 돼요. Capitalize, Uppercase, Lowercase, Uncapitalize 같은 내장 타입으로 대소문자를 바꿔 "onClick" 같은 이름도 만들어요. 매핑된 타입의 as, infer와 함께 쓰면 경로 문자열에서 매개변수 이름을 뽑는 것까지 가능해요. 조합이 너무 많아지면 컴파일이 느려지니 주의해요.', 'Backtick syntax combines and transforms string literal types, type-checking patterned strings such as class names, event names and paths.', '`${Color}-${Size}` multiplies 2 colors by 3 sizes into a union of 6 literals, from "red-sm" to "blue-lg". Slotting in a primitive, as in `/users/${number}`, creates a pattern that accepts "/users/42" and rejects "/users/kim". Built-ins such as Capitalize, Uppercase, Lowercase and Uncapitalize change case to derive names such as "onClick". Combined with mapped-type as clauses and infer, they can even extract parameter names from path strings. Too many combinations slow the compiler, so take care.', sTemplate()),
    item('ts-branded', '브랜드 타입', 'Branded types', '구조가 같은 값을 의미별로 구분하기 위해 가짜 꼬리표 속성을 교차한 타입이에요. 런타임 비용 없이 “섞이면 안 되는 값”을 막아요.', 'type UserId = string과 type OrderId = string은 둘 다 그냥 string이라 cancel(user.id)처럼 엉뚱한 ID를 넘겨도 통과해요. type Brand<T, B> = T & { __brand: B }로 Brand<string, "UserId">와 Brand<string, "OrderId">를 만들면 구조적으로 다른 타입이 되어 섞어 쓰면 컴파일 오류가 나요. 런타임 값은 여전히 문자열이에요. 브랜드는 parseOrderId 같은 검증 함수 한곳에서만 붙여서, 그 타입이 “검증을 거친 값”임을 보장해요. ID, 통화 단위, 정제된 HTML 등에 쓰고, zod의 .brand()도 같은 원리예요.', 'Types that intersect a phantom tag property to distinguish same-shaped values by meaning, preventing mix-ups at no run-time cost.', 'type UserId = string and type OrderId = string are both plain strings, so cancel(user.id) compiles even with the wrong ID. With type Brand<T, B> = T & { __brand: B }, Brand<string, "UserId"> and Brand<string, "OrderId"> become structurally different, and mixing them is a compile error, while the runtime values remain strings. Attach brands only in one validating function such as parseOrderId, so the type guarantees the value was checked. They suit IDs, currencies and sanitized HTML, and zod’s .brand() works the same way.', sBranded()),
  ]),
  sec('ts-tooling', '설정과 도구', 'Config & tooling', '설정, 빌드, 생태계', 'Configuration, builds and the ecosystem', '컴파일러 설정, 타입이 지워지는 빌드 과정, 선언 파일, 런타임 검증, 그리고 클래스와 데코레이터예요.', 'Compiler settings, builds that erase types, declaration files, runtime validation, and classes and decorators.', [
    item('ts-tsconfig', 'tsconfig.json', 'tsconfig.json', '어떤 파일을, 얼마나 엄격하게, 어떤 JS로 컴파일할지 정하는 TypeScript 컴파일러의 설정 파일이에요.', 'target은 출력할 JS 문법 버전(ES2022 등), module은 import·require 방식(NodeNext, ESNext 등)을 정해요. strict: true 하나가 noImplicitAny, strictNullChecks 같은 엄격한 검사 묶음을 켜므로 새 프로젝트에서는 꼭 켜요. noUncheckedIndexedAccess는 배열·인덱스 접근에 undefined 가능성을 더하고, noEmit은 번들러가 빌드할 때 tsc는 검사만 하게 해요. paths는 @/components 같은 import 별칭을 정하는데 번들러에도 같은 설정이 필요해요. extends로 공통 설정을 물려받을 수 있어요.', 'The TypeScript compiler’s configuration file, deciding which files to compile, how strictly, and into which JavaScript.', 'target sets the output syntax version, such as ES2022, and module the import system, such as NodeNext or ESNext. strict: true enables a family of checks including noImplicitAny and strictNullChecks, so turn it on for every new project. noUncheckedIndexedAccess adds undefined to array and index access, and noEmit makes tsc only check while a bundler builds. paths defines import aliases such as @/components, which the bundler must mirror. extends inherits shared presets.', sTsconfig()),
    item('ts-compile', '컴파일과 타입 지우기', 'Compilation and type erasure', 'TypeScript의 타입은 컴파일 시점에만 존재해요. 출력된 JS에는 타입이 하나도 남지 않고, 검사와 변환은 서로 다른 도구가 맡기도 해요.', 'interface User와 (u: User): string 같은 표기는 컴파일하면 모두 지워지고 로직은 한 글자도 바뀌지 않아요. tsc는 타입 검사와 JS 출력을 함께 하지만 느리고, esbuild·swc·Vite는 파일마다 타입을 지우기만 해서 아주 빠른 대신 오류를 잡지 않아요. 그래서 “빌드는 성공했는데 타입 오류가 있는” 상황을 막으려면 편집기와 CI에서 tsc --noEmit으로 검사를 따로 돌려요. 요즘은 Node.js(22.18+), Deno, Bun이 .ts 파일을 직접 실행하는데, 타입만 지우는 방식이라 enum처럼 코드를 만들어 내는 문법은 지원하지 않아요.', 'TypeScript types exist only at compile time; nothing of them survives in the output, and checking and transpiling are often done by different tools.', 'Annotations such as interface User and (u: User): string are all erased on compilation, leaving the logic untouched. tsc both checks and emits but is slow, while esbuild, swc and Vite strip types file by file, which is very fast but catches no errors. To avoid builds that succeed despite type errors, run tsc --noEmit separately in editors and CI. Node.js (22.18+), Deno and Bun now run .ts files directly, but because they only strip types, syntax that generates code, such as enums, is not supported.', sCompile()),
    item('ts-dts', '선언 파일과 @types', 'Declaration files and @types', '.d.ts 파일은 구현 없이 타입 정보만 담은 선언 파일이에요. 타입 없이 작성된 JS 라이브러리를 TypeScript와 이어 줘요.', 'clamp(v, lo, hi)처럼 타입 없이 작성된 JS 함수를 가져오면 TS는 모양을 몰라 any로 다뤄요. math.d.ts에 export declare function clamp(v: number, lo: number, hi: number): number처럼 선언만 적으면 타입 검사와 자동 완성이 살아나요. 직접 쓰지 않아도 npm i -D @types/lodash처럼 DefinitelyTyped 커뮤니티가 만든 선언을 설치할 수 있고, 요즘 라이브러리는 대부분 타입을 내장해요. declare global { interface Window { … } }처럼 기존 타입에 속성을 더하는 보강도 선언 파일로 해요. 라이브러리를 만들 땐 declaration: true로 .d.ts를 자동 생성해요.', 'A .d.ts file holds type information without implementations, connecting untyped JavaScript libraries to TypeScript.', 'Importing an untyped JavaScript function such as clamp(v, lo, hi) leaves TypeScript blind, treating it as any. Writing only a declaration in math.d.ts, export declare function clamp(v: number, lo: number, hi: number): number, brings back checking and autocomplete. Instead of writing them, you can install community declarations from DefinitelyTyped, as in npm i -D @types/lodash, and most modern libraries bundle their own. Augmentations such as declare global { interface Window { … } } also live in declaration files. When publishing a library, declaration: true generates .d.ts files.', sDts()),
    item('ts-runtime', '런타임 검증', 'Runtime validation', '타입은 런타임에 사라지므로, 외부에서 들어오는 데이터는 zod 같은 스키마로 실제로 검사해야 해요. 스키마에서 타입을 뽑아 쓰면 둘이 어긋나지 않아요.', 'await res.json()은 any를 돌려주고, 여기에 as User를 붙여도 실제 모양은 아무도 확인하지 않아서 서버 응답이 바뀌면 엉뚱한 곳에서 조용히 깨져요. z.object({ id: z.number(), name: z.string().min(1) })로 스키마를 선언하고 type User = z.infer<typeof UserSchema>로 타입을 뽑으면 규칙과 타입이 한곳에 모여요. safeParse는 예외 없이 성공 여부를 돌려주고, 성공하면 parsed.data가 User 타입이에요. API 응답, 폼 입력, 환경 변수, localStorage처럼 시스템 경계에서만 검증하고, 경계 안쪽에서는 검증된 타입을 믿고 써요.', 'Types vanish at run time, so data entering from outside must be checked with a schema such as zod; deriving the type from the schema keeps them in sync.', 'await res.json() returns any, and adding as User checks nothing, so a changed server response breaks something far away, silently. Declaring z.object({ id: z.number(), name: z.string().min(1) }) and deriving type User = z.infer<typeof UserSchema> keeps rules and type in one place. safeParse reports success without throwing, and on success parsed.data is a User. Validate only at system boundaries such as API responses, form input, environment variables and localStorage, and trust the validated types inside.', sRuntime()),
    item('ts-classes', '클래스와 접근 제어자', 'Classes and access modifiers', 'TS는 JS 클래스에 public·protected·private 접근 제어자, abstract, implements, 매개변수 속성을 더해요.', 'abstract class Base는 직접 new 할 수 없고, abstract area()는 자식 클래스가 반드시 구현해야 해요. public은 어디서나, protected는 자신과 자식에서만, private은 클래스 안에서만 쓸 수 있어요. constructor(public r: number)처럼 매개변수 앞에 제어자를 붙이면 속성 선언과 대입이 한 번에 돼요. implements Shape는 클래스가 인터페이스의 모양을 지키는지 검사해요. 단, TS의 private은 컴파일 시점에만 막으므로 런타임에도 숨기려면 JS 표준 #private 필드를 써요.', 'TypeScript adds public, protected and private modifiers, abstract, implements and parameter properties to JavaScript classes.', 'abstract class Base cannot be instantiated directly, and subclasses must implement abstract area(). public members are usable anywhere, protected ones in the class and its subclasses, and private ones only inside the class. A modifier before a constructor parameter, as in constructor(public r: number), declares and assigns the property in one go. implements Shape checks that the class matches an interface. TypeScript’s private is enforced only at compile time, so use standard #private fields to hide members at run time too.', sClasses()),
    item('ts-decorator', '데코레이터', 'Decorators', '@로 클래스나 메서드에 붙이는 함수예요. 정의를 감싸 새 동작을 더하거나 메타데이터를 붙여요.', '@logged를 getUser 위에 붙이면 클래스를 정의할 때 logged(fn, ctx)가 실행되고, 원래 메서드를 감싼 새 함수가 그 자리를 대신해요. 그래서 getUser를 부를 때마다 로그가 먼저 찍혀요. 이렇게 로깅, 캐시, 권한 검사 같은 공통 관심사를 메서드 본문에서 떼어 낼 수 있어요. TS 5부터는 표준(Stage 3) 데코레이터를 지원하지만, NestJS·Angular는 매개변수 데코레이터와 reflect-metadata가 필요해서 옛 experimentalDecorators 방식을 계속 써요. 두 방식은 함수 시그니처가 달라서 섞어 쓸 수 없어요.', 'Functions attached to classes or methods with @ that wrap the definition to add behavior or attach metadata.', 'Placing @logged above getUser runs logged(fn, ctx) when the class is defined, and the wrapped function it returns replaces the original method. Every getUser call now logs first. Cross-cutting concerns such as logging, caching and authorization can be lifted out of method bodies this way. TS 5 supports standard (stage 3) decorators, but NestJS and Angular still use the legacy experimentalDecorators mode because they need parameter decorators and reflect-metadata. The two flavors have different signatures and cannot be mixed.', sDecorator()),
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
