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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'sgx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono sgx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono sgx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c sgx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono sgx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c sgx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'sgx-s sgx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono sgx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono sgx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono sgx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono sgx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono sgx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'sgx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'sgx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'sgx-xs sgx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono sgx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'sgx-a', g: 'sgx-g', r: 'sgx-r', w: 'sgx-w', m: 'cz-mono', s: 'sgx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'sgx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono sgx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono sgx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'sgx-xs ') + clsOf(c) + (o.w ? ' sgx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.sgx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.sgx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.sgx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.sgx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.sgx-r .in{color:var(--danger);font-weight:800}
.sgx-g .in{color:var(--ok);font-weight:800}
.sgx-a .in{color:var(--accent);font-weight:800}
.sgx-w .in{color:var(--warn);font-weight:800}
.sgx-c .in{font-size:.6em;font-weight:700}
.sgx-c2 .in{font-size:.5em;font-weight:700}
.sgx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.sgx-wr .in{white-space:normal!important}
.sgx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.sgx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Signals and systems · 1. signals, 2. LTI systems ===== */
const CSSY = '.sgx-sv svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}';
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, o.tc || '', st, { off: o.off }); };
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* plot frame: data x in [a, b], y in [lo, hi] mapped to a box at (x0, y0) of size w × h */
const PF = (x0, y0, w, h, a, b, lo, hi) => ({ X: x => x0 + (x - a) / (b - a) * w, Y: y => y0 + h - (y - lo) / (hi - lo) * h, x0, y0, w, h, a, b, lo, hi });
const axes = (S, k, P, st, o = {}) => { const yz = P.Y(Math.max(P.lo, Math.min(P.hi, 0))); hl(S, k + 'x', P.x0, P.x0 + P.w, yz, 'ink-3', st, { w: .06, off: o.off }); if (P.a <= 0 && P.b >= 0 && !o.noy) vl(S, k + 'y', P.X(0), P.y0, P.y0 + P.h, 'ink-3', st, { w: .06, off: o.off }); };
/* one SVG path per curve instead of one div per segment (keeps scenes light) */
const spoly = (S, k, pts, o = {}) => {
  const ok = pts.filter(Boolean); if (ok.length < 2) return;
  const pad = .3, xs = ok.map(p => p[0]), ys = ok.map(p => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, w = Math.max(...xs) + pad - x0, h = Math.max(...ys) + pad - y0;
  let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + r3(p[0] - x0) + ' ' + r3(p[1] - y0); pen = true; });
  S.el(k, { x: x0, y: y0, w, h, cls: 'sgx-sv', html: `<svg viewBox="0 0 ${r3(w)} ${r3(h)}" preserveAspectRatio="none"><path d="${d}" style="fill:none;stroke:${cv(o.color || 'accent')};stroke-width:${o.h || .09};stroke-linejoin:round;stroke-linecap:round${o.dash ? ';stroke-dasharray:.25 .2' : ''}"/></svg>`, s: o.st ? hid() : {} });
  vis(S, k, o.st, o.off);
};
const curve = (S, k, P, f, st, o = {}) => { const a = o.a ?? P.a, b = o.b ?? P.b, n = o.n || 60, pts = []; for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n, v = f(t); pts.push(v === null || Number.isNaN(v) ? null : [P.X(t), P.Y(Math.max(P.lo, Math.min(P.hi, v)))]); } spoly(S, k, pts, Object.assign({}, o, { st })); };
const stems = (S, k, P, vals, n0, st, o = {}) => vals.forEach((v, i) => { const x = P.X(n0 + i), y0 = P.Y(0), y = P.Y(Math.max(P.lo, Math.min(P.hi, v))); if (Math.abs(y - y0) > .02) vl(S, k + 'l' + i, x, y, y0, o.color || 'accent', st, { w: .07, off: o.off }); pt(S, k + 'p' + i, x, y, st, o.sty || C.cur, o.r || .15, { off: o.off }); });

function sTypes() {
  const boxes = [[1, .6, ['연속 시간 · 아날로그', 'continuous time · analog'], 'accent'], [16.8, .6, ['이산 시간 (샘플)', 'discrete time (samples)'], 'warn'], [1, 7.0, ['값만 양자화', 'quantized values only'], 'ok'], [16.8, 7.0, ['디지털: 이산 시간 + 양자화', 'digital: discrete time + quantized'], 'danger']];
  const f = t => Math.sin(2 * Math.PI * t / 8) * .8 + .15 * Math.sin(2 * Math.PI * t / 3);
  const q = v => Math.round(v * 3) / 3;
  return CW('sg-types', {
    draw: (S) => {
      boxes.forEach(([x, y, t, c], i) => { tbox(S, 'b' + i, x, y, 14.6, 5.9, t, c, i + 1, { tc: c[0] === 'a' ? 'a' : c[0] === 'w' ? 'w' : c[0] === 'o' ? 'g' : 'r' }); const P = PF(x + .6, y + 1.2, 13.4, 4.2, 0, 16, -1.1, 1.1); axes(S, 'a' + i, P, i + 1, { noy: 1 });
        if (i === 0) curve(S, 'c0', P, f, 1, { color: 'accent' });
        if (i === 1) stems(S, 's1', P, [...Array(17)].map((_, n) => f(n)), 0, 2, { color: 'warn', sty: C.cmp });
        if (i === 2) curve(S, 'c2', P, t => q(f(t)), 3, { color: 'ok', n: 160 });
        if (i === 3) stems(S, 's3', P, [...Array(17)].map((_, n) => q(f(n))), 0, 4, { color: 'danger', sty: C.bad }); });
      lbl(S, 'n4', 1, 13.4, ['컴퓨터가 다루는 건 넷째: 시간도 값도 띄엄띄엄인 디지털 신호예요', 'computers handle the fourth kind: digital signals, discrete in both time and value'], 'a', 4, { w: 30 });
    },
    notes: [['연속 시간 아날로그 신호는 모든 순간에 어떤 실수값이든 가질 수 있어요 · 마이크에 들어오는 소리 압력이 그래요', 'a continuous-time analog signal has any real value at every instant, like the sound pressure at a microphone'], ['일정한 간격으로만 값을 찍으면 이산 시간 신호 x[n]이 돼요 · 대괄호는 정수 시간 n을 뜻해요', 'taking values only at regular instants gives a discrete-time signal x[n], where the brackets mean integer time n'], ['값을 정해진 단계로 반올림하면 양자화돼요 · 시간은 연속이어도 값이 계단처럼 돼요', 'rounding values to fixed levels quantizes them, giving a staircase even when time stays continuous'], ['시간도 값도 띄엄띄엄이면 디지털 신호예요 · ADC가 아날로그를 디지털로 바꿔요', 'discrete in both time and value makes a digital signal, which is what an ADC produces from analog']],
    fin: [['신호 분류: 시간(연속/이산) × 값(연속/양자화)', 'signal types: time (continuous or discrete) × value (continuous or quantized)', 'sgx-xs sgx-a'], ['연속 시간은 x(t), 이산 시간은 x[n]으로 써요', 'continuous time is written x(t), discrete time x[n]'], ['이 페이지는 주로 이산 시간 신호를 다뤄요', 'this page mostly works with discrete-time signals']],
    caps: [['연속 아날로그', 'Continuous analog'], ['이산 시간', 'Discrete time'], ['양자화', 'Quantized'], ['디지털 신호', 'Digital signals'], ['신호의 종류', 'Kinds of signals']]
  });
}

function sElem() {
  const X = 18.7, ns = [...Array(12)].map((_, i) => i - 3);
  const P1 = PF(19.3, .6, 12.0, 3.0, -3.5, 8.5, -.2, 1.2), P2 = PF(19.3, 4.4, 12.0, 3.0, -3.5, 8.5, -.2, 1.2), P3 = PF(19.3, 8.2, 12.0, 3.0, -3.5, 8.5, -.2, 1.2);
  return CW('sg-elementary', {
    code: [['u = lambda n: (n >= 0) * 1.0  # 단위 계단', 'u = lambda n: (n >= 0) * 1.0  # unit step'], ['d = lambda n: (n == 0) * 1.0  # 임펄스', 'd = lambda n: (n == 0) * 1.0  # impulse'], ['x = 0.8 ** n * u(n)           # 감쇠 지수', 'x = 0.8 ** n * u(n)           # decaying exp'], ['d(n) == u(n) - u(n - 1)       # 계단의 차분', 'd(n) == u(n) - u(n - 1)       # step diff'], ['# 모든 신호 = 이동한 임펄스들의 합', '# any signal = a sum of shifted impulses']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'accent']],
    draw: (S) => {
      [[P1, 'u[n]', 1], [P2, 'δ[n]', 2], [P3, '0.8ⁿ u[n]', 3]].forEach(([P, t, st], i) => { axes(S, 'ax' + i, P, st); F(S, 'l' + i, X, P.y0 + .2, t, ['a', 'w', 'g'][i], st); });
      stems(S, 'u', P1, ns.map(n => n >= 0 ? 1 : 0), -3, 1);
      stems(S, 'd', P2, ns.map(n => n === 0 ? 1 : 0), -3, 2, { color: 'warn', sty: C.cmp });
      stems(S, 'e', P3, ns.map(n => n >= 0 ? Math.pow(.8, n) : 0), -3, 3, { color: 'ok', sty: C.okf });
      F(S, 'sum', 1, 8.6, 'x[n] = Σₖ x[k] δ[n − k]', 'a', 4);
      lbl(S, 'sumn', 1, 9.7, ['어떤 신호든 크기를 곱한 임펄스를 옮겨 더한 것 · 합성곱의 출발점이에요', 'any signal is a sum of scaled, shifted impulses, the starting point of convolution'], '', 4, { w: 16.5 });
    },
    notes: [['단위 계단 u[n]은 0부터 계속 1이에요 · 스위치를 켜는 순간을 나타내요', 'the unit step u[n] is 1 from n = 0 onward, like flipping a switch on'], ['단위 임펄스 δ[n]은 n = 0에서만 1이에요 · 계단의 차분 u[n] − u[n − 1]과 같아요', 'the unit impulse δ[n] is 1 only at n = 0, equal to the step difference u[n] − u[n − 1]'], ['0.8ⁿ u[n]은 점점 줄어드는 지수 신호예요 · 밑이 1보다 작으면 감쇠, 크면 발산해요', '0.8ⁿ u[n] is a decaying exponential; a base below 1 decays and above 1 blows up'], ['어떤 이산 신호든 x[k]만큼 키운 임펄스를 k만큼 옮겨 모두 더한 거예요 · 이 사실이 합성곱으로 이어져요', 'any discrete signal is the sum of impulses scaled by x[k] and shifted by k, a fact that leads straight to convolution']],
    fin: [['기본 신호: 계단, 임펄스, 지수 · 모든 신호를 쌓는 벽돌', 'elementary signals: step, impulse, exponential, the bricks every signal is built from', 'sgx-xs sgx-a'], ['연속 시간의 임펄스는 넓이가 1인 디랙 델타 δ(t)예요', 'the continuous-time impulse is the Dirac delta δ(t) with unit area'], ['계단을 누적하면 램프, 임펄스를 누적하면 계단', 'accumulating a step gives a ramp; accumulating an impulse gives a step']],
    caps: [['단위 계단', 'The unit step'], ['단위 임펄스', 'The unit impulse'], ['지수 신호', 'Exponentials'], ['임펄스로 쌓기', 'Building from impulses'], ['기본 신호', 'Elementary signals']]
  });
}

function sTrans() {
  const P = PF(19.3, 1.0, 12.0, 7.0, -3, 5, -.2, 1.3);
  const x = t => t >= 0 && t <= 1 ? t : t > 1 && t <= 2 ? 1 : 0;
  const X = 18.7;
  return CW('sg-transform', {
    code: [['x(t - 2)  # 오른쪽으로 2 (지연)', 'x(t - 2)  # right by 2 (a delay)'], ['x(2 * t)  # 시간 축 2배 압축', 'x(2 * t)  # squeezed 2× in time'], ['x(-t)     # 좌우 반전', 'x(-t)     # flipped left–right'], ['x(2 - t)  # 반전 후 2만큼 이동', 'x(2 - t)  # flip, then shift by 2']],
    hl: [[0, 1], [0, 1, 'warn'], [1, 1, 'ok'], [2, 1, 'danger']],
    draw: (S) => {
      axes(S, 'ax', P, 0);
      [-3, -2, -1, 0, 1, 2, 3, 4, 5].forEach(t => T(S, 'tk' + (t + 3), P.X(t) - (t ? .5 : 1.0), P.Y(0) + .15, String(t), 'cz-math cz-tc sgx-tiny', 0, { w: 1 }));
      curve(S, 'x0', P, x, 1, { color: 'accent', n: 160 }); F(S, 'l0', X, .3, 'x(t)', 'a', 1);
      curve(S, 'x1', P, t => x(t - 2), 2, { color: 'warn', n: 160 }); F(S, 'l1', X + 3.0, .3, 'x(t − 2)', 'w', 2);
      curve(S, 'x2', P, t => x(2 * t), 3, { color: 'ok', n: 160 }); F(S, 'l2', X + 6.6, .3, 'x(2t)', 'g', 3);
      curve(S, 'x3', P, t => x(-t), 4, { color: 'danger', n: 160 }); F(S, 'l3', X + 9.6, .3, 'x(−t)', 'r', 4);
      lbl(S, 'n1', X, 9.0, ['기준 신호: 0~1에서 올라가고 1~2에서 평평', 'reference: rises on 0–1, flat on 1–2'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 9.0, ['t − 2를 넣으면 같은 모양이 2만큼 늦게 나와요', 'plugging in t − 2 makes the same shape arrive 2 later'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 9.0, ['2t를 넣으면 두 배 빨리 지나가서 폭이 절반', 'plugging in 2t plays it twice as fast, half as wide'], 'g', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 9.0, ['−t는 시간을 거꾸로 · 합성곱에서 h를 뒤집는 게 이거예요', '−t runs time backward, the flip of h inside convolution'], 'r', 4, { w: 12.7 });
    },
    notes: [['신호의 모양은 그대로 두고 시간 축만 바꾸는 세 가지 기본 변환이 있어요', 'three basic transformations change only the time axis while keeping the shape'], ['x(t − 2)는 모든 일이 2초 늦게 일어나요 · 빼면 오른쪽(지연), 더하면 왼쪽(앞당김)이에요', 'x(t − 2) makes everything happen 2 seconds later: subtracting shifts right (a delay), adding shifts left'], ['x(2t)는 두 배 속도로 재생한 것과 같아 폭이 절반이 돼요 · 오디오를 빨리 돌리면 음이 높아지는 이유예요', 'x(2t) is like playing at double speed, halving the width, which is why sped-up audio sounds higher'], ['x(−t)는 시간을 뒤집어요 · 여러 변환을 섞을 땐 x(2 − t)처럼 먼저 뒤집고 옮긴다고 보면 쉬워요', 'x(−t) reverses time, and for combinations like x(2 − t) it helps to flip first and then shift']],
    fin: [['시간 변환: 이동 x(t − t₀), 크기 x(at), 반전 x(−t)', 'time transformations: shift x(t − t₀), scale x(at), reverse x(−t)', 'sgx-xs sgx-a'], ['이산 시간에서 x[2n]은 샘플을 하나씩 버려요 (다운샘플링)', 'in discrete time x[2n] drops every other sample (downsampling)'], ['합성곱은 반전과 이동을 함께 써요', 'convolution uses reversal and shifting together']],
    caps: [['기준 신호', 'The reference signal'], ['시간 이동', 'Time shift'], ['시간 압축', 'Time scaling'], ['시간 반전', 'Time reversal'], ['신호 변환', 'Transforming signals']]
  });
}

function sSinus() {
  const X = 18.7, cx = 21.6, cy = 4.4, r = 2.3, P = PF(24.6, 2.1, 6.8, 4.6, 0, 1, -1.15, 1.15);
  const ph = Math.PI / 4;
  return CW('sg-sinusoid', {
    code: ['A, f, phi = 1.0, 2.0, np.pi / 4', 'x = A * np.cos(2 * np.pi * f * t + phi)', ['T = 1 / f    # 주기 0.5 s', 'T = 1 / f    # period 0.5 s'], 'z = A * np.exp(1j * (2 * np.pi * f * t + phi))', ['x == z.real  # 도는 벡터의 그림자', 'x == z.real  # shadow of a spinning arrow']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 2, 'ok'], [1, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 1, { noy: 1 }); vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 1, { w: .06 });
      curve(S, 'cs', P, t => Math.cos(2 * Math.PI * 2 * t), 1, { color: 'ink-3', n: 80 });
      curve(S, 'cp', P, t => Math.cos(2 * Math.PI * 2 * t + ph), 2, { color: 'accent', n: 80 });
      F(S, 'l1', 24.8, .5, 'cos(2π · 2t)', '', 1); F(S, 'l2', 24.8, 7.0, 'cos(2π · 2t + π/4)', 'a', 2);
      ring(S, 'uc', cx, cy, r, 'ink-3', 3, { w: .08 });
      hl(S, 'rx', cx - r - .3, cx + r + .3, cy, 'ink-3', 3, { w: .05 }); vl(S, 'ry', cx, cy - r - .3, cy + r + .3, 'ink-3', 3, { w: .05 });
      arw(S, 'vec', [cx, cy], [cx + r * Math.cos(ph), cy - r * Math.sin(ph)], 3, { color: 'ok', h: .1 });
      vl(S, 'prj', cx + r * Math.cos(ph), cy - r * Math.sin(ph), cy, 'warn', 3, { dash: 1, w: .07 });
      F(S, 'eu', X, 8.4, 'exp(jθ) = cos θ + j sin θ', 'g', 3);
      lbl(S, 'n1', X, 8.4, ['A = 1, f = 2 Hz → 주기 T = 1/f = 0.5 s', 'A = 1, f = 2 Hz → period T = 1/f = 0.5 s'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 9.5, ['위상 φ = π/4만큼 왼쪽으로 앞당겨져요', 'the phase φ = π/4 shifts it earlier'], 'a', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 9.5, ['원 위를 도는 벡터의 x축 그림자가 코사인이에요', 'a vector spinning on a circle casts a cosine shadow on the x-axis'], '', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 9.5, ['푸리에 분석은 모든 신호를 이런 회전 벡터의 합으로 봐요', 'Fourier analysis treats every signal as a sum of such spinning vectors'], 'g', 4, { w: 12.7 });
    },
    notes: [['사인파는 진폭 A, 주파수 f, 위상 φ 세 숫자로 정해져요 · f = 2 Hz면 1초에 두 번 반복해요', 'a sinusoid is fixed by three numbers, amplitude A, frequency f and phase φ; at f = 2 Hz it repeats twice a second'], ['위상은 출발 시점을 바꿔요 · +π/4는 8분의 1주기만큼 앞서 시작해요', 'the phase changes where it starts, and +π/4 begins an eighth of a cycle early'], ['오일러 공식 exp(jθ) = cos θ + j sin θ로 보면 사인파는 원 위를 일정하게 도는 벡터의 그림자예요', 'by Euler’s formula exp(jθ) = cos θ + j sin θ, a sinusoid is the shadow of a vector circling at a steady rate'], ['복소 지수로 쓰면 미분·지연이 곱셈으로 바뀌어 계산이 쉬워져요 · 푸리에 분석의 기본 단위예요', 'in complex-exponential form, derivatives and delays become multiplications, which is why it is the basic unit of Fourier analysis']],
    fin: [['사인파: 진폭·주파수·위상 · 복소 지수의 실수부', 'sinusoid: amplitude, frequency and phase, the real part of a complex exponential', 'sgx-xs sgx-a'], ['각주파수 ω = 2πf (rad/s)', 'angular frequency ω = 2πf (rad/s)'], ['LTI 시스템은 사인파를 넣으면 같은 주파수의 사인파가 나와요', 'an LTI system returns a sinusoid of the same frequency']],
    caps: [['진폭과 주기', 'Amplitude and period'], ['위상', 'Phase'], ['회전하는 벡터', 'A spinning vector'], ['신호의 기본 단위', 'The basic unit of signals'], ['사인파와 복소 지수', 'Sinusoids and complex exponentials']]
  });
}

function sEnergy() {
  const X = 18.7, P1 = PF(19.3, .9, 12.0, 3.2, -1, 7, -1.2, 1.2), P2 = PF(19.3, 5.0, 12.0, 3.2, 0, 4, -1.2, 1.2);
  return CW('sg-energy', {
    code: [['E = np.sum(np.abs(x) ** 2)   # 에너지: 유한', 'E = np.sum(np.abs(x) ** 2)   # energy: finite'], ['P = np.mean(np.abs(x) ** 2)  # 전력: 평균', 'P = np.mean(np.abs(x) ** 2)  # power: average'], ['rms = np.sqrt(P)             # 사인파 A/√2', 'rms = np.sqrt(P)             # sine: A/√2'], ['dB = 10 * np.log10(P2 / P1)  # 2배 = +3 dB', 'dB = 10 * np.log10(P2 / P1)  # 2× = +3 dB']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      axes(S, 'a1', P1, 1); stems(S, 'p', P1, [0, 1, .8, .6, .4, .2, 0, 0], -1, 1);
      F(S, 'e1', X, 4.3, 'E = 1 + 0.64 + 0.36 + 0.16 + 0.04 = 2.2', 'a', 1);
      axes(S, 'a2', P2, 2); curve(S, 's', P2, t => Math.sin(2 * Math.PI * t), 2, { color: 'warn' });
      hl(S, 'rm', P2.x0, P2.x0 + P2.w, P2.Y(.707), 'ok', 3, { w: .06, dash: 1 }); lbl(S, 'rml', P2.x0 + 9.0, P2.Y(.707) - .8, 'RMS = 0.707', 'm g', 3);
      lbl(S, 'n2', X, 8.6, ['끝없이 이어지는 주기 신호는 에너지가 무한 → 평균 전력으로 봐요', 'endless periodic signals have infinite energy, so use average power'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 8.6, ['가정용 220 V는 RMS 값 · 최댓값은 220 × √2 ≈ 311 V', 'mains 220 V is an RMS value; the peak is 220 × √2 ≈ 311 V'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 8.6, [[['데시벨: 비율을 로그로', 'decibels: ratios on a log scale'], 'a'], [['×2 전력 = +3 dB', '×2 power = +3 dB'], 'f'], [['×10 전력 = +10 dB', '×10 power = +10 dB'], 'f'], [['진폭은 20 log₁₀: ×10 진폭 = +20 dB', 'amplitude uses 20 log₁₀: ×10 = +20 dB'], 'sgx-wr']], 4, 0, { w: 12.7 });
    },
    notes: [['짧은 펄스처럼 시간이 지나면 사라지는 신호는 값의 제곱을 모두 더한 에너지가 유한해요', 'signals that die out, like a short pulse, have finite energy, the sum of their squared values'], ['사인파처럼 계속 이어지는 신호는 에너지가 무한하니, 시간당 평균인 전력으로 비교해요', 'signals that go on forever, like a sine, have infinite energy, so they are compared by power, the average per unit time'], ['전력의 제곱근이 RMS예요 · 진폭 A인 사인파의 RMS는 A/√2라서 220 V 교류의 최댓값은 약 311 V예요', 'the square root of power is the RMS; a sine of amplitude A has RMS A/√2, so 220 V mains peaks near 311 V'], ['신호 크기는 데시벨로 비교해요 · 전력이 두 배면 +3 dB, 10배면 +10 dB이고 진폭 비율에는 20 log를 써요', 'signal levels are compared in decibels: double the power is +3 dB, ten times is +10 dB, and amplitude ratios use 20 log']],
    fin: [['에너지 신호는 Σ|x|²가 유한, 전력 신호는 평균 Σ|x|²/N이 유한', 'energy signals have finite Σ|x|²; power signals have finite average Σ|x|²/N', 'sgx-xs sgx-a'], ['SNR = 신호 전력 / 잡음 전력 (dB)', 'SNR = signal power / noise power, in dB'], ['dBm은 1 mW 기준, dBFS는 디지털 최대값 기준', 'dBm is relative to 1 mW, dBFS to digital full scale']],
    caps: [['에너지', 'Energy'], ['전력', 'Power'], ['RMS', 'RMS'], ['데시벨', 'Decibels'], ['에너지와 전력', 'Energy and power']]
  });
}

function sProps() {
  const rows = [['y = 2x', '✓', '✓', '✓', '✓'], ['y = x²', '✗', '✓', '✓', '✓'], ['y[n] = n · x[n]', '✓', '✗', '✓', '✗'], ['y[n] = x[n + 1]', '✓', '✓', '✗', '✓'], ['y[n] = Σₖ≤ₙ x[k]', '✓', '✓', '✓', '✗']];
  const heads = [['선형', 'linear'], ['시불변', 'time-inv.'], ['인과', 'causal'], ['안정', 'stable']];
  return CW('sg-props', {
    draw: (S) => {
      rows.forEach((r, i) => F(S, 'r' + i, 1.2, 2.2 + i * 1.3, r[0], '', 0));
      heads.forEach((h, j) => { lbl(S, 'h' + j, 11.0 + j * 5.0, .8, h, 'a', j + 1); rows.forEach((r, i) => { const ok = r[j + 1] === '✓'; T(S, `c${i}${j}`, 11.0 + j * 5.0, 2.2 + i * 1.3, r[j + 1], 'sgx-s ' + (ok ? 'sgx-g' : 'sgx-r'), j + 1, { w: 3 }); }); });
      lbl(S, 'n1', 1, 9.4, ['선형: 입력을 더하고 키우면 출력도 그대로 더하고 키워져요 (중첩) · x²는 2배 입력에 4배 출력 ✗', 'linear: scaled and summed inputs give scaled and summed outputs (superposition); x² gives 4× for 2× ✗'], '', 1, { off: 2, w: 30 });
      lbl(S, 'n2', 1, 9.4, ['시불변: 입력을 늦추면 출력도 똑같이 늦춰져요 · n · x[n]은 언제 들어오느냐에 따라 달라져요 ✗', 'time-invariant: delaying the input just delays the output; n · x[n] depends on when the input arrives ✗'], '', 2, { off: 3, w: 30 });
      lbl(S, 'n3', 1, 9.4, ['인과: 미래 입력을 쓰지 않아요 · x[n + 1]은 실시간으로는 불가능 ✗ (녹음 파일은 가능)', 'causal: never uses future input; x[n + 1] is impossible in real time ✗ (fine for recordings)'], '', 3, { off: 4, w: 30 });
      lbl(S, 'n4', 1, 9.4, ['안정(BIBO): 유한한 입력에 출력도 유한 · 누적기는 계단을 넣으면 끝없이 커져요 ✗', 'stable (BIBO): bounded input gives bounded output; an accumulator fed a step grows forever ✗'], '', 4, { w: 30 });
      lbl(S, 'lti', 1, 11.6, ['선형 + 시불변 = LTI · 임펄스 응답 하나로 모든 출력을 계산할 수 있어요', 'linear + time-invariant = LTI: one impulse response determines every output'], 'g', 4, { w: 30 });
    },
    notes: [['시스템은 입력 신호를 출력 신호로 바꾸는 규칙이에요 · 네 가지 성질로 분류해요', 'a system is a rule turning an input signal into an output signal, classified by four properties'], ['시불변이면 같은 입력을 언제 넣어도 같은 모양의 출력이 그만큼 늦게 나와요', 'a time-invariant system gives the same output shape whenever the input arrives, just delayed accordingly'], ['인과 시스템은 지금까지의 입력만 써요 · 실시간 처리는 인과여야 하지만, 저장된 데이터는 미래 샘플도 쓸 수 있어요', 'a causal system uses only present and past input; real-time processing must be causal, while stored data may use future samples'], ['유계 입력에 유계 출력을 내면 BIBO 안정이에요 · 선형이고 시불변인 LTI 시스템이 신호 처리의 중심이에요', 'bounded input yielding bounded output means BIBO stable, and linear, time-invariant (LTI) systems are the heart of signal processing']],
    fin: [['시스템 성질: 선형·시불변·인과·안정 · LTI가 가장 다루기 쉬워요', 'system properties: linear, time-invariant, causal, stable; LTI systems are the most tractable', 'sgx-xs sgx-a'], ['필터, 증폭기, 반향은 대부분 LTI로 모델링해요', 'filters, amplifiers and echoes are mostly modeled as LTI'], ['클리핑·양자화는 비선형이에요', 'clipping and quantization are nonlinear']],
    caps: [['선형성', 'Linearity'], ['시불변성', 'Time invariance'], ['인과성', 'Causality'], ['안정성', 'Stability'], ['시스템의 성질', 'System properties']]
  });
}

function sImpulse() {
  const X = 18.7, h = [1, .5, .25];
  const P1 = PF(19.3, .7, 12.0, 2.6, -.5, 5.5, -.1, 2.2), P2 = PF(19.3, 4.0, 12.0, 2.6, -.5, 5.5, -.1, 2.2), P3 = PF(19.3, 7.3, 12.0, 2.6, -.5, 5.5, -.1, 2.2);
  return CW('sg-impulse', {
    code: [['h = [1, 0.5, 0.25]   # δ를 넣었을 때 출력', 'h = [1, 0.5, 0.25]   # output for δ'], 'x = [2, 1]', ['y = 2 · h[n] + 1 · h[n − 1]', 'y = 2 · h[n] + 1 · h[n − 1]'], ['y = [2, 2, 1, 0.25]  # 겹쳐 더하기', 'y = [2, 2, 1, 0.25]  # overlap and add']],
    hl: [[0, 1], [1, 2, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      [P1, P2, P3].forEach((P, i) => axes(S, 'ax' + i, P, i ? (i === 1 ? 2 : 3) : 1));
      stems(S, 'hs', P1, h, 0, 1); F(S, 'lh', X, .5, 'h[n]', 'a', 1);
      stems(S, 'a', P2, [2, 1, .5], 0, 2, { color: 'warn', sty: C.cmp }); stems(S, 'b', P2, [0, 1, .5, .25], 0, 2, { color: 'ok', sty: C.okf, r: .12 });
      F(S, 'l2', X + 5.6, 3.8, '2 · h[n] + 1 · h[n − 1]', 'w', 2);
      stems(S, 'y', P3, [2, 2, 1, .25], 0, 3, { color: 'danger', sty: C.badf });
      F(S, 'l3', X + 5.6, 7.1, 'y = [2, 2, 1, 0.25]', 'r', 3);
      lbl(S, 'n1', X, 10.6, ['임펄스를 넣으면 나오는 응답 h[n]이 시스템의 지문이에요', 'the response to an impulse, h[n], is the system’s fingerprint'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 10.6, ['입력 = 2δ[n] + δ[n − 1] → 출력은 h를 2배 한 것과 1칸 늦춘 h', 'input 2δ[n] + δ[n − 1] → output is 2h plus h delayed by one'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 10.6, ['선형이라 더하고, 시불변이라 그대로 옮겨요', 'linearity lets us add; time invariance lets us shift'], 'r', 3, { off: 4, w: 12.7 });
      F(S, 'n4', X, 10.6, 'y[n] = Σₖ x[k] h[n − k] = (x ∗ h)[n]', 'g', 4);
      lbl(S, 'n4b', X, 11.7, ['이 합이 합성곱이에요 · LTI는 h만 알면 끝', 'this sum is convolution: for LTI, h says it all'], '', 4, { w: 12.7 });
    },
    notes: [['LTI 시스템에 임펄스 하나를 넣으면 나오는 출력을 임펄스 응답 h[n]이라 불러요', 'feeding a single impulse into an LTI system yields its impulse response h[n]'], ['입력 x = [2, 1]은 2δ[n] + δ[n − 1]이에요 · 선형이라 각 임펄스의 응답을 따로 구해 더하면 돼요', 'the input x = [2, 1] is 2δ[n] + δ[n − 1], and linearity lets us find each impulse’s response separately and add them'], ['시불변이라 늦게 들어온 임펄스의 응답은 h를 그만큼 옮긴 거예요 · 둘을 더하면 [2, 2, 1, 0.25]', 'time invariance means a later impulse’s response is just h shifted, and adding them gives [2, 2, 1, 0.25]'], ['이 과정을 식으로 쓴 게 합성곱 y = x ∗ h예요 · LTI 시스템은 임펄스 응답 하나로 완전히 설명돼요', 'written as a formula this is the convolution y = x ∗ h; an LTI system is completely described by its impulse response']],
    fin: [['임펄스 응답: LTI 시스템의 모든 것을 담은 하나의 신호', 'impulse response: one signal that holds everything about an LTI system', 'sgx-xs sgx-a'], ['방의 잔향, 스피커 특성도 임펄스 응답으로 측정해요', 'room reverb and speaker character are measured as impulse responses'], ['박수 한 번이 방의 임펄스 응답이에요', 'a single clap is a room’s impulse response']],
    caps: [['임펄스 응답', 'The impulse response'], ['입력을 임펄스로', 'The input as impulses'], ['겹쳐 더하기', 'Overlap and add'], ['합성곱', 'Convolution'], ['임펄스 응답', 'Impulse response']]
  });
}

function sConv() {
  const X = 18.7, x = [1, 2, 3], y = [1, 3, 5, 3], dx = 1.6, x0 = 21.5;
  return CW('sg-convolution', {
    code: ['x = [1, 2, 3]', 'h = [1, 1]', 'np.convolve(x, h)  # [1, 3, 5, 3]', ['# h를 뒤집어 밀면서 겹친 곳을 곱해 더함', '# flip h, slide, multiply overlaps, sum'], ['# 길이: 3 + 2 − 1 = 4', '# length: 3 + 2 − 1 = 4']],
    hl: [[3, 1], [3, 1, 'warn'], [3, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      lbl(S, 'lx', X, 1.15, 'x', 'f', 0); x.forEach((v, i) => chip(S, 'x' + i, x0 + (i + 1) * dx, 1.0, 1.3, String(v), 'accent', 0, { pct: 22 }));
      lbl(S, 'lh', X, 2.65, ['h 뒤집기', 'h flipped'], '', 1);
      y.forEach((v, n) => {
        const st = n + 1, off = n < 3 ? n + 2 : undefined;
        [0, 1].forEach(j => { const pos = n - j + 1; chip(S, `h${n}${j}`, x0 + pos * dx, 2.5, 1.3, '1', 'warn', st, { pct: 26, off }); });
        const terms = [0, 1].map(j => x[n - j] !== undefined ? `${x[n - j]}·1` : null).filter(Boolean).join(' + ');
        F(S, 'eq' + n, X, 4.2, `y[${n}] = ${terms} = ${v}`, 'w', st, { off });
        chip(S, 'y' + n, x0 + (n + 1) * dx, 6.0, 1.3, String(v), 'ok', st, { pct: 26 });
      });
      lbl(S, 'ly', X, 6.15, 'y', 'f', 1);
      lbl(S, 'n4', X, 8.0, ['합성곱 = 뒤집고 → 밀고 → 곱하고 → 더하기', 'convolution = flip → slide → multiply → sum'], 'g', 4, { w: 12.7 });
      lbl(S, 'n4b', X, 9.1, ['h = [1, 1]이면 이웃 두 개를 더하는 필터예요', 'with h = [1, 1] it is a filter that adds two neighbors'], '', 4, { w: 12.7 });
    },
    notes: [['합성곱은 h를 뒤집어 x 위에 놓고, 겹치는 칸끼리 곱해서 더해요 · n = 0에서는 1 × 1 = 1', 'convolution flips h, lays it over x, multiplies the overlapping entries and sums them: at n = 0 that is 1 × 1 = 1'], ['한 칸 밀면 1과 2가 겹쳐 y[1] = 1 + 2 = 3이에요', 'sliding one step overlaps 1 and 2, giving y[1] = 1 + 2 = 3'], ['또 밀면 y[2] = 2 + 3 = 5 · h는 매번 같은 모양으로 x를 훑고 지나가요', 'another step gives y[2] = 2 + 3 = 5, with the same h sweeping along x'], ['마지막에 3만 겹쳐 y[3] = 3 · 길이는 3 + 2 − 1 = 4예요', 'finally only 3 overlaps, so y[3] = 3, and the length is 3 + 2 − 1 = 4']],
    fin: [['합성곱 (x ∗ h)[n] = Σₖ x[k] h[n − k]: LTI 시스템의 출력 계산법', 'convolution (x ∗ h)[n] = Σₖ x[k] h[n − k] computes every LTI output', 'sgx-xs sgx-a'], ['길이가 길면 FFT로 계산하는 게 빨라요', 'for long signals, computing it through the FFT is faster'], ['CNN의 합성곱 층도 같은 연산이에요 (뒤집기만 생략)', 'CNN convolution layers do the same thing, minus the flip']],
    caps: [['n = 0', 'n = 0'], ['n = 1', 'n = 1'], ['n = 2', 'n = 2'], ['n = 3', 'n = 3'], ['합성곱', 'Convolution']]
  });
}

function sMa() {
  const X = 18.7, P = PF(19.3, .9, 12.0, 6.0, 0, 39, -1.6, 1.6);
  let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 - .5; };
  const clean = n => Math.sin(2 * Math.PI * n / 20), noisy = [...Array(40)].map((_, n) => clean(n) + rnd() * 1.1);
  const ma = noisy.map((_, n) => n < 4 ? null : (noisy[n] + noisy[n - 1] + noisy[n - 2] + noisy[n - 3] + noisy[n - 4]) / 5);
  const Q = PF(19.3, 9.2, 12.0, 3.6, 0, .5, 0, 1.05);
  const H = f => f === 0 ? 1 : Math.abs(Math.sin(5 * Math.PI * f) / (5 * Math.sin(Math.PI * f)));
  return CW('sg-moving-avg', {
    code: ['h = np.ones(5) / 5     # [0.2] × 5', ['y = np.convolve(x, h)  # 이웃 5개 평균', 'y = np.convolve(x, h)  # mean of 5'], ['# 잡음은 줄고 느린 변화는 남아요', '# noise drops, slow changes stay'], ['# 지연: (5 − 1) / 2 = 2 샘플', '# delay: (5 − 1) / 2 = 2 samples']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      spoly(S, 'nz', noisy.map((v, n) => [P.X(n), P.Y(v)]), { st: 1, color: 'ink-3', h: .07 });
      lbl(S, 'l1', X, .3, ['잡음 섞인 신호', 'a noisy signal'], '', 1);
      frame(S, 'win', P.X(10) - .1, P.y0, P.X(14) - P.X(10) + .2, P.h, 'warn', 2, { w: .08, dash: 1, off: 3 });
      lbl(S, 'l2', X, 7.4, ['창 안의 5개를 평균 → 한 칸씩 이동', 'average the 5 in the window, then slide'], 'w', 2, { off: 3, w: 12.7 });
      spoly(S, 'sm', ma.map((v, n) => v === null ? null : [P.X(n), P.Y(v)]), { st: 3, color: 'accent', h: .1 });
      lbl(S, 'l3', X, 7.4, ['부드러워졌지만 2샘플 늦어요', 'smoother, but 2 samples late'], 'a', 3, { off: 4, w: 12.7 });
      axes(S, 'qx', Q, 4, { noy: 1 }); curve(S, 'hr', Q, H, 4, { color: 'ok', n: 80 });
      lbl(S, 'l4', X, 7.4, ['주파수 응답 |H(f)|: 낮은 주파수는 통과, 높은 건 깎음 (저역통과)', 'frequency response |H(f)|: lows pass, highs are cut (low-pass)'], 'g', 4, { w: 12.7 });
      T(S, 'q0', Q.X(0) - .3, Q.y0 + Q.h + .1, '0', 'cz-math sgx-tiny', 4); T(S, 'q5', Q.X(.2) - .6, Q.y0 + Q.h + .1, 'fs/5', 'cz-math sgx-tiny', 4); T(S, 'q9', Q.X(.5) - 1.0, Q.y0 + Q.h + .1, 'fs/2', 'cz-math sgx-tiny', 4);
    },
    notes: [['측정값에는 잡음이 섞여요 · 이웃한 샘플 몇 개를 평균 내면 잡음이 줄어요', 'measurements carry noise, and averaging a few neighboring samples reduces it'], ['이동 평균은 h = [0.2, 0.2, 0.2, 0.2, 0.2]와의 합성곱이에요 · 창을 한 칸씩 밀며 평균을 내요', 'a moving average is convolution with h = [0.2, 0.2, 0.2, 0.2, 0.2], sliding a window one sample at a time'], ['잡음이 줄어 원래의 느린 사인파가 보여요 · 대신 창 길이의 절반인 2샘플만큼 늦어져요', 'the noise shrinks and the slow sine reappears, at the cost of a delay of half the window, 2 samples'], ['주파수로 보면 낮은 주파수는 통과시키고 빠른 변화는 깎는 저역통과 필터예요 · fs/5의 배수에서 완전히 0이에요', 'in frequency terms it is a low-pass filter, passing slow changes, cutting fast ones and nulling multiples of fs/5']],
    fin: [['이동 평균: 가장 단순한 FIR 저역통과 필터', 'moving average: the simplest FIR low-pass filter', 'sgx-xs sgx-a'], ['창이 길수록 더 부드럽고 더 늦어요', 'longer windows smooth more and lag more'], ['주가 이평선, 센서 노이즈 제거에 흔히 써요', 'common for stock charts and sensor noise']],
    caps: [['잡음', 'Noise'], ['창 평균', 'Window averaging'], ['부드러워진 결과', 'The smoothed result'], ['저역통과 필터', 'A low-pass filter'], ['이동 평균', 'The moving average']]
  });
}

function sDiff() {
  const X = 18.7, n = [...Array(12)].map((_, i) => i);
  const P = PF(19.3, 1.0, 12.0, 6.6, -.5, 11.5, -1.2, 3.2);
  return CW('sg-difference', {
    code: ['y = np.zeros(N)', 'for n in range(N):', ['    y[n] = a * y[n - 1] + x[n]  # 되먹임', '    y[n] = a * y[n - 1] + x[n]  # feedback'], ['# 임펄스 응답 h[n] = aⁿ (끝없이 이어짐)', '# impulse response h[n] = aⁿ (never ends)'], ['# |a| < 1 이어야 안정', '# stable only if |a| < 1']],
    hl: [[2, 1], [3, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    draw: (S) => {
      axes(S, 'ax', P, 0);
      lbl(S, 'n1', X, 8.2, ['출력을 다시 입력으로 되먹여요 · 계수 몇 개로 긴 응답을 만들어요', 'the output feeds back in, making long responses from a few coefficients'], '', 1, { off: 2, w: 12.7 });
      stems(S, 'a', P, n.map(k => Math.pow(.5, k)), 0, 2, { color: 'ok', sty: C.okf });
      lbl(S, 'n2', X, 8.2, ['a = 0.5: 1, 0.5, 0.25… 줄지만 0이 되지는 않아요 (IIR)', 'a = 0.5: 1, 0.5, 0.25… shrinking but never zero (IIR)'], 'g', 2, { off: 3, w: 12.7 });
      stems(S, 'b', P, n.map(k => Math.pow(-.8, k)), 0, 3, { color: 'warn', sty: C.cmp, r: .13 });
      lbl(S, 'n3', X, 8.2, ['a = −0.8: 부호가 번갈아 바뀌며 줄어요 (진동)', 'a = −0.8: alternating signs, shrinking (oscillation)'], 'w', 3, { off: 4, w: 12.7 });
      stems(S, 'gc', P, n.map(k => Math.pow(1.1, k)), 0, 4, { color: 'danger', sty: C.badf, r: .13 });
      lbl(S, 'n4', X, 8.2, ['a = 1.1: 끝없이 커져요 → 불안정 · 극점 a가 단위원 안에 있어야 해요', 'a = 1.1 grows without bound → unstable; the pole a must sit inside the unit circle'], 'r', 4, { w: 12.7 });
    },
    notes: [['차분 방정식 y[n] = a · y[n − 1] + x[n]은 이전 출력을 되먹여요 · 곱셈 하나로 끝없이 긴 응답을 만들어요', 'the difference equation y[n] = a · y[n − 1] + x[n] feeds back the previous output, making an endless response from one multiplication'], ['a = 0.5면 임펄스 응답이 0.5ⁿ으로 줄어들어요 · 0이 되지 않고 계속 이어져서 IIR 필터라고 해요', 'with a = 0.5 the impulse response decays as 0.5ⁿ, never reaching zero, which makes it an IIR filter'], ['a가 음수면 부호가 번갈아 바뀌며 진동해요 · 크기가 1보다 작으니 여전히 줄어들어요', 'a negative a makes the signs alternate, oscillating while still shrinking since its size is below 1'], ['|a| > 1이면 응답이 커지기만 해서 불안정해요 · 극점이 단위원 안에 있어야 한다는 조건이 여기서 나와요', 'with |a| > 1 the response only grows, making it unstable, which is where the rule “poles inside the unit circle” comes from']],
    fin: [['차분 방정식: 되먹임으로 짧은 식에서 무한 길이 응답(IIR)', 'difference equations: feedback turns a short formula into an infinite (IIR) response', 'sgx-xs sgx-a'], ['연속 시간의 미분 방정식에 해당해요', 'the discrete counterpart of a differential equation'], ['a = 1이면 누적기(적분기)예요', 'a = 1 gives an accumulator, an integrator']],
    caps: [['되먹임', 'Feedback'], ['a = 0.5', 'a = 0.5'], ['a = −0.8', 'a = −0.8'], ['a = 1.1', 'a = 1.1'], ['차분 방정식', 'Difference equations']]
  });
}

function sStable() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 6.6, -.5, 30.5, 0, 31);
  const acc = [...Array(31)].map((_, k) => k + 1), lk = [...Array(31)].map((_, k) => (1 - Math.pow(.9, k + 1)) / .1);
  return CW('sg-stability', {
    code: [['# BIBO 안정: 유계 입력 → 유계 출력', '# BIBO stable: bounded in → bounded out'], '# ⇔ Σ|h[n]| < ∞', ['acc  = np.cumsum(u)                # h = 1ⁿ ✗', 'acc  = np.cumsum(u)                # h = 1ⁿ ✗'], ['leak = lfilter([1], [1, -0.9], u)  # h = 0.9ⁿ', 'leak = lfilter([1], [1, -0.9], u)  # h = 0.9ⁿ'], ['# 0.9ⁿ의 합 = 1 / (1 − 0.9) = 10', '# Σ 0.9ⁿ = 1 / (1 − 0.9) = 10']],
    hl: [[0, 2], [2, 1, 'danger'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 0); lbl(S, 'in', X, .3, ['입력: 계단 u[n] (늘 1)', 'input: a step u[n] (always 1)'], '', 1);
      lbl(S, 'n1', X, 8.2, ['입력이 유한하면 출력도 유한해야 BIBO 안정', 'BIBO stable: bounded inputs must give bounded outputs'], '', 1, { off: 2, w: 12.7 });
      spoly(S, 'ac', acc.map((v, k) => [P.X(k), P.Y(v)]), { st: 2, color: 'danger', h: .1 });
      lbl(S, 'n2', X, 8.2, ['누적기: 1, 2, 3… 끝없이 커져요 ✗', 'accumulator: 1, 2, 3… grows forever ✗'], 'r', 2, { off: 3, w: 12.7 });
      spoly(S, 'lk', lk.map((v, k) => [P.X(k), P.Y(v)]), { st: 3, color: 'ok', h: .1 });
      hl(S, 'lim', P.x0, P.x0 + P.w, P.Y(10), 'ok', 3, { w: .06, dash: 1 }); lbl(S, 'liml', P.x0 + 9.4, P.Y(10) + .2, '10', 'm g', 3);
      lbl(S, 'n3', X, 8.2, ['새는 누적기(0.9ⁿ): 10에 다가가며 멈춰요 ✓', 'leaky accumulator (0.9ⁿ) levels off near 10 ✓'], 'g', 3, { off: 4, w: 12.7 });
      F(S, 'n4', X, 8.2, 'Σ|h[n]| = Σ 0.9ⁿ = 10 < ∞ ✓', 'g', 4);
      lbl(S, 'n4b', X, 9.3, ['임펄스 응답의 절댓값 합이 유한하면 안정 · 누적기는 1 + 1 + … = ∞', 'stable when the impulse response is absolutely summable; the accumulator sums to ∞'], '', 4, { w: 12.7 });
    },
    notes: [['유한한 입력을 넣었을 때 출력이 유한하게 머물면 BIBO 안정이에요 · 계단을 넣어 시험해 봐요', 'a system is BIBO stable if every bounded input keeps the output bounded; try a step input'], ['누적기는 받은 값을 모두 더해서 계단 입력에 1, 2, 3…으로 끝없이 커져요 · 불안정해요', 'an accumulator adds up everything it receives, so a step input climbs 1, 2, 3… without end: unstable'], ['조금씩 새는 누적기 y[n] = 0.9y[n − 1] + x[n]은 1/(1 − 0.9) = 10에 다가가며 멈춰요', 'a leaky accumulator y[n] = 0.9y[n − 1] + x[n] levels off near 1/(1 − 0.9) = 10'], ['LTI 시스템은 임펄스 응답의 절댓값 합이 유한할 때만 안정이에요 · 0.9ⁿ은 합이 10, 1ⁿ은 무한대예요', 'an LTI system is stable exactly when its impulse response is absolutely summable: Σ0.9ⁿ = 10, while Σ1ⁿ diverges']],
    fin: [['BIBO 안정 ⇔ Σ|h[n]| < ∞ ⇔ 모든 극점이 단위원 안', 'BIBO stable ⇔ Σ|h[n]| < ∞ ⇔ every pole inside the unit circle', 'sgx-xs sgx-a'], ['FIR 필터는 h가 유한해서 늘 안정해요', 'FIR filters are always stable since h is finite'], ['IIR은 계수 반올림만으로도 불안정해질 수 있어요', 'IIR filters can turn unstable from coefficient rounding alone']],
    caps: [['BIBO 안정', 'BIBO stability'], ['누적기', 'The accumulator'], ['새는 누적기', 'The leaky accumulator'], ['안정 조건', 'The stability condition'], ['시스템의 안정성', 'System stability']]
  });
}
/* ===== Signals and systems · 3. Fourier analysis, 4. sampling ===== */
const barsP = (S, k, P, vals, k0, st, o = {}) => vals.forEach((v, i) => { const x = P.X(k0 + i), y0 = P.Y(P.lo < 0 && P.hi > 0 ? 0 : P.lo), y = P.Y(Math.max(P.lo, Math.min(P.hi, v))); if (Math.abs(y0 - y) > .03) rect(S, k + i, x - (o.w || .5) / 2, Math.min(y, y0), o.w || .5, Math.abs(y0 - y), typeof o.color === 'function' ? o.color(i) : (o.color || 'accent'), o.pct || 55, st, { r: .05, off: o.off }); });

function sFseries() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 6.2, 0, 2, -1.5, 1.5);
  const S_ = K => t => { let s = 0; for (let k = 1; k <= 2 * K - 1; k += 2) s += Math.sin(2 * Math.PI * k * t) / k; return 4 / Math.PI * s; };
  const sq = t => (t % 1) < .5 ? 1 : -1, Q = PF(19.3, 9.6, 12.0, 3.4, 0, 10, 0, 1.4);
  return CW('sg-fourier-series', {
    code: ['x = 0', ['for k in range(1, 2 * K, 2):  # 홀수 고조파', 'for k in range(1, 2 * K, 2):  # odd harmonics'], '    x += 4 / np.pi * np.sin(k * w * t) / k', ['# K → ∞: 사각파 (모서리 약 9% 튀어나옴)', '# K → ∞: a square wave (~9% overshoot)']],
    hl: [[1, 2], [1, 2, 'warn'], [3, 1, 'danger'], [0, 4]],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      curve(S, 'sq', P, sq, 0, { color: 'ink-3', n: 200, h: .05 });
      curve(S, 'fa',  P, S_(1), 1, { color: 'accent', n: 80, off: 2 });
      curve(S, 'fb',  P, S_(3), 2, { color: 'warn', n: 120, off: 3 });
      curve(S, 'fc',  P, S_(15), 3, { color: 'ok', n: 300 });
      lbl(S, 'n1', X, 7.7, ['사인파 하나 (k = 1)', 'one sine (k = 1)'], 'a', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 7.7, ['+ sin 3ωt / 3 + sin 5ωt / 5 → 모서리가 생겨요', '+ sin 3ωt / 3 + sin 5ωt / 5 → corners appear'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 7.7, ['15개 항: 모서리에 약 9% 튐 (깁스 현상)', '15 terms: ~9% overshoot at edges (Gibbs)'], 'g', 3, { w: 12.7 });
      axes(S, 'qx', Q, 4, { noy: 1 }); barsP(S, 'sp', Q, [0, 4 / Math.PI, 0, 4 / Math.PI / 3, 0, 4 / Math.PI / 5, 0, 4 / Math.PI / 7, 0, 4 / Math.PI / 9], 0, 4, { w: .45, color: 'ok' });
      lbl(S, 'q4', X, 9.0, ['스펙트럼: 홀수 고조파, 크기 1/k', 'spectrum: odd harmonics, size 1/k'], 'g', 4, { w: 12.7 });
    },
    notes: [['주기 신호는 기본 주파수의 정수배 사인파들의 합으로 쓸 수 있어요 · 푸리에 급수예요', 'any periodic signal can be written as a sum of sinusoids at integer multiples of its fundamental: the Fourier series'], ['사각파에는 홀수 고조파만 들어 있고 k번째 크기는 1/k예요 · 항을 더할수록 모서리가 날카로워져요', 'a square wave holds only odd harmonics, the k-th with size 1/k, and each added term sharpens the corners'], ['항이 아무리 많아도 불연속점 근처에서 약 9% 튀어나와요 · 이를 깁스 현상이라 해요', 'however many terms are added, it overshoots by about 9% near the jumps: the Gibbs phenomenon'], ['각 고조파의 크기를 늘어놓은 게 스펙트럼이에요 · 시간 영역의 모양이 주파수 영역의 막대로 바뀌어요', 'listing each harmonic’s size gives the spectrum, turning a time-domain shape into bars in the frequency domain']],
    fin: [['푸리에 급수: 주기 신호 = 기본파와 고조파 사인들의 합', 'Fourier series: a periodic signal = a sum of a fundamental and its harmonics', 'sgx-xs sgx-a'], ['날카로운 모서리일수록 높은 주파수가 많이 필요해요', 'sharper corners need more high frequencies'], ['악기의 음색 차이가 고조파 구성의 차이예요', 'the timbre of instruments is their harmonic mix']],
    caps: [['기본파', 'The fundamental'], ['고조파 더하기', 'Adding harmonics'], ['깁스 현상', 'The Gibbs phenomenon'], ['스펙트럼', 'The spectrum'], ['푸리에 급수', 'Fourier series']]
  });
}

function sFt() {
  const X = 18.7, Pt = PF(19.3, 1.0, 5.4, 4.2, -2, 2, -.2, 1.25), Pf = PF(25.8, 1.0, 5.5, 4.2, -4.2, 4.2, -.3, 1.15);
  const sinc = v => v === 0 ? 1 : Math.sin(Math.PI * v) / (Math.PI * v);
  return CW('sg-fourier-transform', {
    code: ['X(f) = ∫ x(t) e^(−j2πft) dt', ['rect(t/T) ⟷ T · sinc(fT)        # 0점 ±1/T', 'rect(t/T) ⟷ T · sinc(fT)        # 0 at ±1/T'], ['x(t − t₀) ⟷ X(f) · e^(−j2πft₀)  # 위상만', 'x(t − t₀) ⟷ X(f) · e^(−j2πft₀)  # phase only'], ['x ∗ h ⟷ X · H                   # 합성곱 = 곱', 'x ∗ h ⟷ X · H                   # ∗ becomes ×']],
    hl: [[0, 1], [1, 1, 'warn'], [1, 1, 'ok'], [2, 2, 'accent']],
    draw: (S) => {
      axes(S, 'at', Pt, 0); axes(S, 'af', Pf, 0);
      lbl(S, 'lt', X, .3, ['시간 영역', 'time domain'], '', 0); lbl(S, 'lf', 25.6, .3, ['주파수 영역', 'frequency domain'], '', 0);
      curve(S, 'r1', Pt, t => Math.abs(t) < .5 ? 1 : 0, 1, { color: 'accent', n: 200, off: 3 });
      curve(S, 's1', Pf, f => sinc(f), 1, { color: 'accent', n: 120, off: 3 });
      lbl(S, 'n1', X, 6.0, ['폭 T = 1인 펄스의 스펙트럼은 sinc 모양', 'a pulse of width T = 1 has a sinc-shaped spectrum'], 'a', 1, { off: 2, w: 12.7 });
      [-2, -1, 1, 2].forEach((f, i) => T(S, 'zt' + i, Pf.X(f) - .5, Pf.Y(0) + .15, String(f), 'cz-math cz-tc sgx-tiny', 2, { w: 1, off: 3 }));
      lbl(S, 'n2', X, 6.0, ['첫 0점이 ±1/T = ±1 · 대부분의 에너지는 그 안에', 'first zeros at ±1/T = ±1, with most energy inside'], 'w', 2, { off: 3, w: 12.7 });
      curve(S, 'r2', Pt, t => Math.abs(t) < .25 ? 1 : 0, 3, { color: 'ok', n: 200 });
      curve(S, 's2', Pf, f => sinc(f / 2), 3, { color: 'ok', n: 120 });
      lbl(S, 'n3', X, 6.0, ['펄스를 절반으로 좁히면 스펙트럼은 두 배로 넓어져요 (0점 ±2)', 'halve the pulse and the spectrum doubles in width (zeros at ±2)'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 6.0, [[['시간 이동 → 위상만 바뀌고 크기는 그대로', 'a time shift changes only the phase'], 'sgx-wr', { lh: 1.8 }], [['합성곱 ↔ 곱셈: 필터링이 주파수에서는 곱하기', 'convolution ↔ multiplication: filtering is a product in frequency'], 'a sgx-wr', { lh: 1.8 }], [['짧은 신호일수록 넓은 대역이 필요해요', 'shorter signals need wider bandwidth'], 'g sgx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['푸리에 변환은 신호를 주파수별 성분으로 나눠요 · 폭 1인 직사각형 펄스는 주파수 영역에서 sinc 함수가 돼요', 'the Fourier transform splits a signal into frequency components, and a rectangular pulse of width 1 becomes a sinc function'], ['sinc의 첫 0점은 ±1/T예요 · 에너지 대부분이 그 안에 몰려 있어서 펄스의 대역폭을 대략 1/T로 봐요', 'the sinc’s first zeros sit at ±1/T, with most energy inside, so the pulse’s bandwidth is roughly 1/T'], ['펄스 폭을 반으로 줄이면 스펙트럼 폭은 두 배가 돼요 · 짧은 신호는 넓은 주파수 대역을 차지해요', 'halving the pulse width doubles the spectral width: short signals occupy wide frequency bands'], ['시간 이동은 위상만 바꾸고, 시간 영역의 합성곱은 주파수 영역의 곱셈이 돼요 · 필터 설계가 쉬워지는 이유예요', 'a time shift changes only the phase, and convolution in time becomes multiplication in frequency, which is what makes filter design tractable']],
    fin: [['푸리에 변환: 시간 신호 ↔ 주파수 성분 · 좁을수록 넓어요', 'Fourier transform: time signal ↔ frequency content; narrower in one means wider in the other', 'sgx-xs sgx-a'], ['디지털 통신에서 기호를 짧게 할수록 대역폭이 커져요', 'shorter symbols in digital communication need more bandwidth'], ['역변환으로 원래 신호를 되찾을 수 있어요', 'the inverse transform recovers the original']],
    caps: [['펄스와 sinc', 'A pulse and its sinc'], ['대역폭', 'Bandwidth'], ['좁히면 넓어져요', 'Narrower makes wider'], ['중요한 성질', 'Key properties'], ['푸리에 변환', 'The Fourier transform']]
  });
}

function sDft() {
  const X = 18.7, x = [1, 0, -1, 0, 1, 0, -1, 0], mag = [0, 0, 4, 0, 0, 0, 4, 0];
  const P1 = PF(19.3, 1.0, 12.0, 3.4, -.5, 7.5, -1.3, 1.3), P2 = PF(19.3, 6.0, 12.0, 3.4, -.5, 7.5, 0, 4.6);
  return CW('sg-dft', {
    code: ['n = np.arange(8)', ['x = np.cos(np.pi * n / 2)  # 2주기', 'x = np.cos(np.pi * n / 2)  # 2 cycles'], 'X = np.fft.fft(x)', 'np.round(np.abs(X), 3)     # [0 0 4 0 0 0 4 0]', ['# 빈 k의 주파수 = k · fs / N', '# bin k sits at k · fs / N']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      axes(S, 'a1', P1, 0, { noy: 1 }); stems(S, 'x', P1, x, 0, 1); F(S, 'l1', X, .5, 'x[n] = cos(2π · 2n / 8)', 'a', 1);
      F(S, 'df', X, 5.0, 'X[k] = Σₙ x[n] · exp(−j2πkn / N)', 'w', 2);
      axes(S, 'a2', P2, 3, { noy: 1 }); barsP(S, 'm', P2, mag, 0, 3, { w: .6, color: 'ok' });
      [...Array(8)].forEach((_, k) => T(S, 'kt' + k, P2.X(k) - .5, P2.Y(0) + .15, String(k), 'cz-math cz-tc sgx-tiny', 3, { w: 1 }));
      lbl(S, 'n3', X, 10.8, ['k = 2에 4 · k = 6은 −2의 거울상 (실수 신호는 좌우 대칭)', '4 at k = 2; k = 6 mirrors −2 (real signals are symmetric)'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 10.8, [[['fs = 8 kHz, N = 8 → 빈 간격 1 kHz', 'fs = 8 kHz, N = 8 → 1 kHz per bin'], 'a'], [['k = 2 → 2 kHz · N을 늘리면 촘촘해져요', 'k = 2 → 2 kHz; larger N gives finer bins'], 'sgx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['컴퓨터는 샘플 N개만 가지고 주파수를 봐요 · 8개 샘플에 코사인이 정확히 2주기 들어 있어요', 'computers see frequency from just N samples; here eight samples hold exactly two cycles of a cosine'], ['DFT는 신호를 k = 0…N − 1의 복소 사인파와 하나씩 곱해 더해요 · 그 주파수 성분이 얼마나 있는지 재는 거예요', 'the DFT multiplies the signal by complex sinusoids for k = 0…N − 1 and sums, measuring how much of each frequency is present'], ['결과는 k = 2와 6에서만 크기 4예요 · 실수 신호라 k = 6은 −2 주파수의 거울상이에요', 'the result is 4 only at k = 2 and k = 6, the latter mirroring frequency −2 because the signal is real'], ['k번째 빈은 k · fs/N 주파수예요 · 샘플을 늘리면 빈 간격이 좁아져 주파수를 더 세밀하게 구분해요', 'bin k corresponds to k · fs/N, so more samples mean narrower bins and finer frequency resolution']],
    fin: [['DFT: 샘플 N개 → 주파수 빈 N개 · 빈 간격 fs/N', 'DFT: N samples → N frequency bins spaced fs/N apart', 'sgx-xs sgx-a'], ['실수 입력이면 절반(0~N/2)만 보면 돼요', 'for real input, the first half (0 to N/2) is enough'], ['계산은 FFT로 해요', 'it is computed with the FFT']],
    caps: [['샘플 8개', 'Eight samples'], ['DFT 정의', 'The DFT'], ['주파수 빈', 'Frequency bins'], ['빈 간격', 'Bin spacing'], ['이산 푸리에 변환', 'The discrete Fourier transform']]
  });
}

function sFft() {
  const X = 18.7, xs = [19.6, 23.1, 26.6, 30.1], ys = i => .9 + i * .9;
  const inp = ['x₀', 'x₄', 'x₂', 'x₆', 'x₁', 'x₅', 'x₃', 'x₇'];
  return CW('sg-fft', {
    code: ['def fft(x):', '    N = len(x)', '    if N == 1: return x', ['    E, O = fft(x[0::2]), fft(x[1::2])', '    E, O = fft(x[0::2]), fft(x[1::2])'], '    W = np.exp(-2j*np.pi*np.arange(N//2)/N)', '    return np.concatenate([E+W*O, E-W*O])'],
    hl: [[3, 1], [3, 1, 'warn'], [4, 2, 'ok'], [0, 6]],
    draw: (S) => {
      inp.forEach((t, i) => { T(S, 'in' + i, 18.6, ys(i) - .35, t, 'cz-math sgx-xs', 1, { w: 1 }); pt(S, 'n0' + i, xs[0], ys(i), 1, C.cur, .13); });
      [1, 2, 4].forEach((d, s) => { const st = s === 0 ? 2 : 3; for (let i = 0; i < 8; i++) { const p = i ^ d; seg(S, `b${s}${i}a`, [xs[s], ys(i)], [xs[s + 1], ys(i)], st, s === 0 ? 'warn' : s === 1 ? 'ok' : 'accent', .05); seg(S, `b${s}${i}b`, [xs[s], ys(p)], [xs[s + 1], ys(i)], st, s === 0 ? 'warn' : s === 1 ? 'ok' : 'accent', .05); pt(S, `n${s + 1}${i}`, xs[s + 1], ys(i), st, C.cur, .13); } });
      lbl(S, 'n1', X, 8.4, ['짝수·홀수 번째로 나눠 반 크기 DFT 두 개로 (비트 반전 순서)', 'split into even and odd samples: two half-size DFTs (bit-reversed order)'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 8.4, ['첫 단계: 이웃끼리 a + Wb, a − Wb (나비 연산)', 'stage 1: neighbors combine as a + Wb and a − Wb (butterflies)'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 8.4, ['log₂8 = 3단계 · 단계마다 곱셈 N/2번', 'log₂ 8 = 3 stages with N/2 multiplications each'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 8.4, [[['N = 1024일 때', 'for N = 1024'], 'a'], [['DFT 그대로: N² ≈ 1,048,576', 'direct DFT: N² ≈ 1,048,576'], 'm r'], [['FFT: N log₂N = 10,240 → 약 100배', 'FFT: N log₂ N = 10,240 → ~100× faster'], 'm g']], 4, 0);
    },
    notes: [['DFT를 그대로 계산하면 N²번 곱해야 해요 · FFT는 짝수·홀수 번째 샘플로 나눠 반 크기 DFT 두 개로 바꿔요', 'computing the DFT directly takes N² multiplications, while the FFT splits it into two half-size DFTs over even and odd samples'], ['두 결과를 a + W·b, a − W·b로 합치는 나비 연산이 기본 단위예요 · W는 회전 인자예요', 'the butterfly, combining results as a + W·b and a − W·b with a twiddle factor W, is the basic unit'], ['이걸 반복하면 log₂N 단계가 되고 단계마다 N/2번 곱해요 · 입력은 비트를 뒤집은 순서로 놓여요', 'repeating it gives log₂ N stages of N/2 multiplications, with inputs in bit-reversed order'], ['N = 1024면 100배쯤 빨라요 · 오디오, 통신, 영상, 큰 수의 곱셈까지 FFT 없이는 불가능했을 일이 많아요', 'at N = 1024 it is about 100 times faster, enabling audio, communications, imaging and even fast big-number multiplication']],
    fin: [['FFT: 분할 정복으로 DFT를 O(N²)에서 O(N log N)으로', 'FFT: divide and conquer takes the DFT from O(N²) to O(N log N)', 'sgx-xs sgx-a'], ['쿨리-튜키(1965)가 널리 알렸어요', 'popularized by Cooley and Tukey in 1965'], ['N이 2의 거듭제곱이면 가장 빨라요', 'fastest when N is a power of two']],
    caps: [['짝·홀로 나누기', 'Split even and odd'], ['나비 연산', 'Butterflies'], ['log N 단계', 'log N stages'], ['얼마나 빠른가', 'How much faster'], ['FFT', 'The FFT']]
  });
}

function sLeak() {
  const X = 18.7, N = 32, P = PF(19.3, 1.0, 12.0, 6.2, -.5, 16.5, -60, 0);
  const dft = (f, win) => { const out = []; for (let k = 0; k <= 16; k++) { let re = 0, im = 0; for (let n = 0; n < N; n++) { const w = win ? .5 - .5 * Math.cos(2 * Math.PI * n / (N - 1)) : 1, v = w * Math.cos(2 * Math.PI * f * n / N); re += v * Math.cos(2 * Math.PI * k * n / N); im -= v * Math.sin(2 * Math.PI * k * n / N); } out.push(Math.hypot(re, im)); } const m = Math.max(...out); return out.map(v => Math.max(-60, 20 * Math.log10(v / m + 1e-9))); };
  return CW('sg-leakage', {
    code: [['x = np.cos(9 * np.pi * n / 32)  # 4.5주기', 'x = np.cos(9 * np.pi * n / 32)  # 4.5 cycles'], 'X = np.fft.rfft(x)', 'w = np.hanning(32)', ['Xw = np.fft.rfft(x * w)         # 창을 씌워서', 'Xw = np.fft.rfft(x * w)         # windowed']],
    hl: [[0, 2], [0, 2, 'danger'], [2, 2, 'ok'], [2, 2]],
    draw: (S) => {
      vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 0, { w: .06 }); hl(S, 'ax', P.x0, P.x0 + P.w, P.y0 + P.h, 'ink-3', 0, { w: .06 });
      [0, -20, -40, -60].forEach((d, i) => T(S, 'db' + i, 18.2, P.Y(d) - .35, String(d), 'cz-mono sgx-tiny', 0, { w: 1.1 }));
      barsP(S, 'a', P, dft(4, false), 0, 1, { off: 2, w: .5, color: 'accent' });
      barsP(S, 'b', P, dft(4.5, false), 0, 2, { off: 3, w: .5, color: 'danger' });
      barsP(S, 'c', P, dft(4.5, true), 0, 3, { w: .5, color: 'ok' });
      lbl(S, 'n1', X, 7.8, ['정확히 4주기: 빈 4 하나에 딱 떨어져요', 'exactly 4 cycles: it lands in bin 4 alone'], 'a', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 7.8, ['4.5주기: 끝이 안 맞아 에너지가 모든 빈으로 새요 (누설)', '4.5 cycles: the ends do not meet, so energy leaks into every bin'], 'r', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 7.8, ['해닝 창을 곱하면 양 끝이 0으로 부드러워져 누설이 크게 줄어요', 'a Hann window tapers the ends to zero and slashes the leakage'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 7.8, [[['대가: 가운데 봉우리가 넓어져요', 'the price: a wider main peak'], 'w'], [['작은 성분 찾기 → 블랙먼 · 가까운 두 주파수 구분 → 사각에 가까운 창', 'faint tones → Blackman; close tones → a near-rectangular window'], 'sgx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['DFT는 N개 샘플이 끝없이 반복된다고 가정해요 · 정확히 정수 주기면 빈 하나에 딱 들어가요', 'the DFT assumes the N samples repeat forever, so an exact whole number of cycles falls into a single bin'], ['4.5주기처럼 빈 사이 주파수면 끝과 처음이 어긋나 불연속이 생기고, 에너지가 모든 빈으로 번져요 · 스펙트럼 누설이에요', 'a frequency between bins, like 4.5 cycles, leaves a jump where the ends meet and smears energy across every bin: spectral leakage'], ['해닝 같은 창을 곱해 양 끝을 0으로 줄이면 불연속이 사라져 누설이 수십 dB 줄어요', 'multiplying by a window such as Hann tapers the ends to zero, removing the jump and cutting leakage by tens of dB'], ['대신 가운데 봉우리가 넓어져 가까운 주파수 구분력은 떨어져요 · 목적에 따라 창을 골라요', 'in exchange the main peak widens and close frequencies blur, so the window is chosen per task']],
    fin: [['스펙트럼 누설: 잘린 신호의 끝 불연속이 만드는 번짐 · 창 함수로 줄여요', 'spectral leakage: smearing from the cut ends, reduced with window functions', 'sgx-xs sgx-a'], ['창은 누설과 해상도를 맞바꿔요', 'windows trade leakage for resolution'], ['오디오 분석기는 보통 해닝 창을 기본으로 써요', 'audio analyzers usually default to Hann']],
    caps: [['빈에 맞을 때', 'On a bin'], ['스펙트럼 누설', 'Spectral leakage'], ['창 함수', 'Windowing'], ['맞바꾸기', 'The trade-off'], ['누설과 창 함수', 'Leakage and windows']]
  });
}

function sStft() {
  const X = 18.7, T0 = 16, F0 = 8, cw = .74, ch = .62, gx = 19.4, gy = 2.9;
  const fr = t => .6 + 6.4 * t / (T0 - 1);
  const cells = (k, mode, st, off) => { for (let t = 0; t < T0; t++) for (let f = 0; f < F0; f++) { let v; if (mode === 's') { v = Math.exp(-Math.pow((f - fr(t)) / 1.6, 2)); } else { const t0 = Math.floor(t / 4) * 4 + 1.5; v = Math.exp(-Math.pow((f - fr(t0)) / .45, 2)); } if (v > .18) rect(S0, `${k}${t}_${f}`, gx + t * cw, gy + (F0 - 1 - f) * ch, cw - .04, ch - .04, 'accent', Math.round(15 + 65 * v), st, { r: .05, off }); } };
  let S0;
  const P = PF(19.4, .4, 11.8, 2.0, 0, 1, -1.1, 1.1);
  return CW('sg-stft', {
    code: [['f, t, Z = stft(x, fs, nperseg=64)   # 짧은 창', 'f, t, Z = stft(x, fs, nperseg=64)   # short'], ['f, t, Z = stft(x, fs, nperseg=512)  # 긴 창', 'f, t, Z = stft(x, fs, nperseg=512)  # long'], ['# Δt · Δf ≥ 상수 (불확정성)', '# Δt · Δf ≥ constant (uncertainty)']],
    hl: [[2, 1], [0, 1, 'warn'], [1, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      curve(S, 'ch', P, t => Math.sin(2 * Math.PI * (2 * t + 14 * t * t)), 1, { color: 'ink-2', n: 220, h: .05 });
      lbl(S, 'n1', X, 9.2, ['처프: 시간이 갈수록 주파수가 올라가는 소리 · 전체 FFT로는 “언제”를 몰라요', 'a chirp rises in pitch over time; one big FFT cannot say when'], '', 1, { off: 2, w: 12.7 });
      frame(S, 'gf', gx - .1, gy - .1, T0 * cw + .1, F0 * ch + .1, 'ink-3', 2, { w: .06, r: .1 });
      lbl(S, 'ax1', gx, gy + F0 * ch + .1, ['시간 →', 'time →'], '', 2); lbl(S, 'ax2', 30.0, gy - .55, ['주파수', 'freq.'], '', 2);
      cells('s', 's', 2, 3);
      lbl(S, 'n2', X, 9.2, ['짧은 창: 시간은 또렷, 주파수는 두껍게 번져요', 'short window: sharp in time, thick in frequency'], 'w', 2, { off: 3, w: 12.7 });
      cells('l', 'l', 3, 4);
      lbl(S, 'n3', X, 9.2, ['긴 창: 주파수는 가늘지만 시간이 계단처럼 뭉개져요', 'long window: thin in frequency, smeared into steps in time'], 'g', 3, { off: 4, w: 12.7 });
      cells('m', 's', 4);
      lines(S, 'n4', X, 9.2, [[['둘 다 완벽할 수는 없어요: Δt · Δf ≥ 상수', 'you cannot have both: Δt · Δf ≥ constant'], 'a sgx-wr', { lh: 1.8 }], [['음성 인식·음악 분석은 멜 스펙트로그램을 입력으로 써요', 'speech recognition and music analysis feed on mel spectrograms'], 'sgx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['주파수가 시간에 따라 바뀌는 신호는 전체를 한 번에 FFT하면 어떤 주파수가 언제 있었는지 사라져요', 'for signals whose frequency changes, one FFT over everything loses track of when each frequency occurred'], ['짧은 창으로 잘라 가며 FFT하면(STFT) 시간-주파수 그림인 스펙트로그램이 나와요 · 짧은 창은 시간에 민감하지만 주파수가 번져요', 'short-time FFTs over sliding windows (the STFT) produce a spectrogram; short windows track time but blur frequency'], ['긴 창은 주파수를 가늘게 보여 주지만 그 창 안의 변화가 하나로 뭉개져 시간이 흐려져요', 'long windows draw thin frequency lines but merge everything within each window, blurring time'], ['시간 해상도와 주파수 해상도는 동시에 무한히 좋아질 수 없어요 · 그래서 목적에 맞는 창 길이를 골라요', 'time and frequency resolution can never both be perfect, so the window length is chosen for the task']],
    fin: [['STFT: 짧은 창으로 잘라 FFT → 시간에 따른 스펙트럼 (스펙트로그램)', 'STFT: FFTs over short windows give the spectrum over time (a spectrogram)', 'sgx-xs sgx-a'], ['창 길이는 시간과 주파수 해상도를 맞바꿔요', 'window length trades time resolution for frequency resolution'], ['웨이블릿 변환은 주파수마다 창 길이를 달리해요', 'wavelet transforms vary the window by frequency']],
    caps: [['처프 신호', 'A chirp'], ['짧은 창', 'A short window'], ['긴 창', 'A long window'], ['불확정성', 'Uncertainty'], ['STFT와 스펙트로그램', 'STFT and spectrograms']]
  });
}

function sNyquist() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 4.6, 0, 1, -1.2, 1.2), Q = PF(19.3, 8.9, 12.0, 3.0, -13, 13, 0, 1.2);
  const tri = (c, B) => f => Math.max(0, 1 - Math.abs(f - c) / B);
  return CW('sg-nyquist', {
    code: ['f, fs = 3, 10', 'n = np.arange(0, 1, 1 / fs)', ['x = np.sin(2 * np.pi * f * n)  # fs > 2f ✓', 'x = np.sin(2 * np.pi * f * n)  # fs > 2f ✓'], ['fs = 4                         # fs < 2f ✗', 'fs = 4                         # fs < 2f ✗'], ['# 3 Hz가 |3 − 4| = 1 Hz로 보여요', '# 3 Hz shows up as |3 − 4| = 1 Hz']],
    hl: [[0, 3], [2, 1, 'ok'], [3, 2, 'danger'], [0, 1]],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      curve(S, 'sg', P, t => Math.sin(2 * Math.PI * 3 * t), 1, { color: 'ink-3', n: 120 });
      lbl(S, 'n1', X, 6.2, ['3 Hz 사인파 · 최고 주파수 B = 3 Hz', 'a 3 Hz sine; highest frequency B = 3 Hz'], '', 1, { off: 2, w: 12.7 });
      [...Array(10)].forEach((_, i) => pt(S, 'g' + i, P.X(i / 10), P.Y(Math.sin(2 * Math.PI * 3 * i / 10)), 2, C.okf, .17, { off: 3 }));
      lbl(S, 'n2', X, 6.2, ['fs = 10 Hz > 2B: 샘플만으로 원래 모양을 되살릴 수 있어요', 'fs = 10 Hz > 2B: the samples pin down the original'], 'g', 2, { off: 3, w: 12.7 });
      [...Array(4)].forEach((_, i) => pt(S, 'b' + i, P.X(i / 4), P.Y(Math.sin(2 * Math.PI * 3 * i / 4)), 3, C.badf, .2));
      curve(S, 'al', P, t => -Math.sin(2 * Math.PI * 1 * t), 3, { color: 'danger', n: 80, h: .07 });
      lbl(S, 'n3', X, 6.2, ['fs = 4 Hz < 2B: 같은 점을 지나는 1 Hz 파형과 구분이 안 돼요', 'fs = 4 Hz < 2B: indistinguishable from a 1 Hz wave through the same points'], 'r', 3, { off: 4, w: 12.7 });
      axes(S, 'qx', Q, 4, { noy: 1 });
      [-10, 0, 10].forEach((c, i) => curve(S, 'r' + i, Q, tri(c, 3), 4, { color: i === 1 ? 'accent' : 'warn', n: 60, a: c - 3.5, b: c + 3.5 }));
      [-10, 0, 10].forEach((c, i) => T(S, 'rt' + i, Q.X(c) - .8, Q.Y(0) + .15, ['−fs', '0', 'fs'][i], 'cz-math cz-tc sgx-tiny', 4, { w: 1.6 }));
      lbl(S, 'n4', X, 7.6, ['샘플링하면 스펙트럼이 fs마다 복제돼요 · fs > 2B면 겹치지 않아요', 'sampling copies the spectrum every fs; with fs > 2B the copies do not overlap'], 'a', 4, { w: 12.7 });
    },
    notes: [['연속 신호를 일정 간격으로 찍을 때, 얼마나 촘촘해야 원래 신호를 잃지 않을까요 · 3 Hz 사인파로 봐요', 'how dense must samples be to lose nothing of a continuous signal? Take a 3 Hz sine'], ['샘플링 정리: 최고 주파수 B의 두 배보다 빠르게 찍으면 샘플만으로 원래 신호를 완벽히 되살릴 수 있어요', 'the sampling theorem: sampling faster than twice the highest frequency B lets the samples reconstruct the signal perfectly'], ['4 Hz로 찍으면 같은 점을 지나는 1 Hz 파형과 구분이 안 돼요 · 높은 주파수가 낮은 주파수로 둔갑하는 에일리어싱이에요', 'at 4 Hz the samples also fit a 1 Hz wave, so a high frequency masquerades as a low one: aliasing'], ['주파수로 보면 샘플링은 스펙트럼을 fs 간격으로 복제해요 · fs > 2B여야 복제본끼리 겹치지 않아요', 'in frequency terms, sampling copies the spectrum at multiples of fs, and only fs > 2B keeps the copies apart']],
    fin: [['샘플링 정리(나이퀴스트-섀넌): fs > 2B면 완벽 복원', 'sampling theorem (Nyquist–Shannon): fs > 2B allows perfect reconstruction', 'sgx-xs sgx-a'], ['fs/2를 나이퀴스트 주파수라 해요', 'fs/2 is called the Nyquist frequency'], ['CD 44.1 kHz는 들리는 한계 20 kHz의 2배 남짓', 'CD’s 44.1 kHz is just over twice the 20 kHz limit of hearing']],
    caps: [['3 Hz 신호', 'A 3 Hz signal'], ['충분히 빠르게', 'Fast enough'], ['너무 느리면', 'Too slow'], ['복제된 스펙트럼', 'Copied spectra'], ['샘플링 정리', 'The sampling theorem']]
  });
}

function sAlias() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 6.0, 0, 200, 0, 60);
  const app = f => { const r = f % 100; return r <= 50 ? r : 100 - r; };
  return CW('sg-aliasing', {
    code: ['fs = 100  # Hz', 'def apparent(f):', '    r = f % fs', '    return min(r, fs - r)', 'apparent(30), apparent(70), apparent(130)', ['# → 30, 30, 30 Hz 모두 같아 보여요', '# → 30, 30, 30 Hz all look the same']],
    hl: [[1, 3], [4, 2, 'warn'], [0, 1], [0, 1]],
    draw: (S) => {
      vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 0, { w: .06 }); hl(S, 'ax', P.x0, P.x0 + P.w, P.y0 + P.h, 'ink-3', 0, { w: .06 });
      [0, 50, 100, 150, 200].forEach((f, i) => T(S, 'tx' + i, P.X(f) - .8, P.y0 + P.h + .15, String(f), 'cz-mono cz-tc sgx-tiny', 0, { w: 1.6 }));
      lbl(S, 'xl', 27.0, P.y0 + P.h + .7, ['실제 주파수 (Hz)', 'real frequency (Hz)'], '', 0);
      lbl(S, 'yl', P.x0 + .3, .3, ['보이는 주파수', 'apparent frequency'], '', 0);
      curve(S, 'fd', P, app, 1, { color: 'accent', n: 160 });
      hl(S, 'ny', P.x0, P.x0 + P.w, P.Y(50), 'warn', 1, { w: .06, dash: 1 }); lbl(S, 'nyl', P.x0 + 6.5, P.Y(50) - .8, ['나이퀴스트 fs/2 = 50', 'Nyquist fs/2 = 50'], 'w', 1);
      [30, 70, 130].forEach((f, i) => { pt(S, 'p' + i, P.X(f), P.Y(app(f)), 2, i ? C.badf : C.okf, .22); vl(S, 'v' + i, P.X(f), P.Y(app(f)), P.y0 + P.h, i ? 'danger' : 'ok', 2, { dash: 1, w: .06 }); });
      hl(S, 'h30', P.x0, P.X(130), P.Y(30), 'danger', 2, { dash: 1, w: .05 });
      lbl(S, 'n1', X, 8.7, ['50 Hz를 넘으면 접혀서 낮은 주파수로 보여요', 'above 50 Hz frequencies fold back down'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 8.7, ['30, 70, 130 Hz가 모두 30 Hz로 보여요', '30, 70 and 130 Hz all appear as 30 Hz'], 'r', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 8.7, ['샘플링한 뒤에는 구분할 방법이 없어요 → ADC 앞에 저역통과 필터(안티에일리어싱)', 'after sampling they cannot be told apart → an anti-aliasing low-pass filter before the ADC'], 'w', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 8.7, ['영상 24 fps에서 바퀴가 거꾸로 도는 것도 같은 현상 · 이미지의 모아레 무늬도요', 'wheels spinning backward at 24 fps are the same effect, as are moiré patterns in images'], 'a', 4, { w: 12.7 });
    },
    notes: [['샘플링 주파수의 절반(나이퀴스트 주파수)을 넘는 성분은 그 아래로 접혀 보여요', 'components above half the sampling rate, the Nyquist frequency, fold back below it'], ['fs = 100 Hz면 30, 70, 130 Hz가 샘플 위에서 모두 30 Hz로 똑같이 보여요', 'with fs = 100 Hz, tones at 30, 70 and 130 Hz all look like 30 Hz in the samples'], ['한 번 섞이면 샘플만으로는 되돌릴 수 없어요 · 그래서 ADC 앞에서 fs/2 이상을 미리 깎아요', 'once mixed, the samples alone cannot undo it, so frequencies above fs/2 are cut before the ADC'], ['영화 속 바퀴가 거꾸로 도는 것, 셔츠 무늬가 화면에서 물결치는 모아레도 에일리어싱이에요', 'wagon wheels turning backward on film and moiré ripples on striped shirts are aliasing too']],
    fin: [['에일리어싱: fs/2 위의 주파수가 접혀서 다른 주파수로 둔갑해요', 'aliasing: frequencies above fs/2 fold over and impersonate others', 'sgx-xs sgx-a'], ['막는 법은 샘플링 전 필터뿐이에요', 'the only cure is filtering before sampling'], ['다운샘플링 전에도 같은 필터가 필요해요', 'downsampling needs the same filter first']],
    caps: [['접히는 주파수', 'Folding frequencies'], ['같아 보이는 신호', 'Look-alike signals'], ['안티에일리어싱 필터', 'Anti-aliasing filters'], ['주변의 에일리어싱', 'Aliasing around us'], ['에일리어싱', 'Aliasing']]
  });
}

function sRecon() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 6.4, 0, 8, -1.3, 1.3);
  const f = t => Math.sin(2 * Math.PI * t / 6) * .8 + .3 * Math.sin(2 * Math.PI * t / 2.5);
  const s = [...Array(9)].map((_, n) => f(n));
  const sinc = v => v === 0 ? 1 : Math.sin(Math.PI * v) / (Math.PI * v);
  const zoh = []; s.forEach((v, n) => { if (n < 8) zoh.push([P.X(n), P.Y(v)], [P.X(n + 1), P.Y(v)]); });
  return CW('sg-reconstruct', {
    code: [['# 샘플 → 연속 신호 (DAC)', '# samples → a continuous signal (DAC)'], ['zoh  = np.repeat(x, k)             # 계단', 'zoh  = np.repeat(x, k)             # stairs'], ['lin  = np.interp(t, n, x)          # 직선', 'lin  = np.interp(t, n, x)          # lines'], ['sinc = sum(x[n] * np.sinc(t - n))  # 이상적', 'sinc = sum(x[n] * np.sinc(t - n))  # ideal']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'accent'], [3, 1, 'ok']],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      stems(S, 'sm', P, s, 0, 1, { color: 'ink-2', sty: C.cur });
      lbl(S, 'n1', X, 8.0, ['DAC는 샘플 값만 받아요 · 그 사이를 어떻게 채울까요', 'a DAC only gets sample values; how should it fill the gaps?'], '', 1, { off: 2, w: 12.7 });
      spoly(S, 'zh', zoh, { st: 2, color: 'warn', h: .08, off: 3 });
      lbl(S, 'n2', X, 8.0, ['0차 유지: 다음 샘플까지 값을 그대로 · 계단 모서리가 고주파 잡음', 'zero-order hold keeps each value until the next; the stair edges add high-frequency junk'], 'w', 2, { off: 3, w: 12.7 });
      spoly(S, 'l', s.map((v, n) => [P.X(n), P.Y(v)]), { st: 3, color: 'accent', h: .08, off: 4 });
      lbl(S, 'n3', X, 8.0, ['직선 보간: 낫지만 꺾인 곳이 남아요', 'linear interpolation is better, but corners remain'], 'a', 3, { off: 4, w: 12.7 });
      curve(S, 'sc', P, t => s.reduce((a, v, n) => a + v * sinc(t - n), 0), 4, { color: 'ok', n: 160, h: .1 });
      curve(S, 'tr', P, f, 4, { color: 'ink-3', n: 160, h: .04 });
      lbl(S, 'n4', X, 8.0, ['sinc 보간: 대역 제한 신호를 정확히 복원 · 실제 DAC는 계단 뒤에 저역통과 필터로 근사해요', 'sinc interpolation restores a band-limited signal exactly; real DACs approximate it with a low-pass filter after the stairs'], 'g', 4, { w: 12.7 });
    },
    notes: [['디지털 신호를 소리로 내려면 DAC가 샘플 사이를 채워 연속 전압을 만들어야 해요', 'turning a digital signal into sound needs a DAC to fill between samples and make a continuous voltage'], ['가장 단순한 방법은 다음 샘플까지 값을 유지하는 0차 유지예요 · 계단의 모서리가 원래 없던 높은 주파수를 만들어요', 'the simplest is a zero-order hold, keeping each value until the next sample, whose stair edges add high frequencies that were never there'], ['점을 직선으로 이으면 더 가깝지만 여전히 꺾인 곳이 있어요', 'joining the points with straight lines gets closer but still leaves corners'], ['샘플링 정리를 만족하면 샘플마다 sinc를 놓고 더하는 보간이 원래 신호를 정확히 되살려요 · 실제 장치는 계단 뒤에 저역통과 필터를 둬서 이를 흉내 내요', 'when the sampling theorem holds, placing a sinc at each sample and summing restores the original exactly, and real hardware imitates this with a low-pass filter after the stairs']],
    fin: [['복원: 샘플 사이를 sinc로 채우면 대역 제한 신호는 완벽히 돌아와요', 'reconstruction: filling the gaps with sincs brings a band-limited signal back perfectly', 'sgx-xs sgx-a'], ['오버샘플링 DAC는 필터 설계를 쉽게 해요', 'oversampling DACs make the filter easier'], ['이미지 확대의 보간법(최근접, 쌍선형, 쌍삼차)도 같은 고민이에요', 'image upscaling (nearest, bilinear, bicubic) faces the same choice']],
    caps: [['샘플만 있을 때', 'Samples only'], ['0차 유지', 'Zero-order hold'], ['직선 보간', 'Linear interpolation'], ['sinc 보간', 'Sinc interpolation'], ['신호 복원', 'Reconstruction']]
  });
}

function sQuant() {
  const X = 18.7, P = PF(19.3, .9, 12.0, 4.8, 0, 1, -1.15, 1.15), E = PF(19.3, 6.6, 12.0, 1.8, 0, 1, -.2, .2);
  const f = t => Math.sin(2 * Math.PI * 2 * t) * .95, L = 4, q = v => Math.round(v * L) / L;
  return CW('sg-quantization', {
    code: [['xq = np.round(x * L) / L  # L = 2**(B-1)', 'xq = np.round(x * L) / L  # L = 2**(B-1)'], ['e = xq - x                # 오차: ±Δ/2 안', 'e = xq - x                # error within ±Δ/2'], ['# SQNR ≈ 6.02·B + 1.76 dB', '# SQNR ≈ 6.02·B + 1.76 dB'], ['# 16비트 ≈ 98 dB, 8비트 ≈ 50 dB', '# 16-bit ≈ 98 dB, 8-bit ≈ 50 dB']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      curve(S, 'x', P, f, 1, { color: 'ink-3', n: 120 });
      curve(S, 'xq', P, t => q(f(t)), 1, { color: 'accent', n: 400, h: .08 });
      lbl(S, 'n1', X, 9.0, ['3비트: 9단계로 반올림하면 계단이 돼요', '3 bits: rounding to 9 levels makes stairs'], 'a', 1, { off: 2, w: 12.7 });
      axes(S, 'ex', E, 2, { noy: 1 }); curve(S, 'e', E, t => q(f(t)) - f(t), 2, { color: 'warn', n: 400, h: .06 });
      lbl(S, 'el', X, 6.3, ['오차', 'error'], 'w', 2);
      lbl(S, 'n2', X, 9.0, ['오차는 늘 ±Δ/2 안에서 잡음처럼 흔들려요 (양자화 잡음)', 'the error wobbles within ±Δ/2 like noise (quantization noise)'], 'w', 2, { off: 3, w: 12.7 });
      F(S, 'sq', X, 9.0, 'SQNR ≈ 6.02 · B + 1.76 dB', 'g', 3);
      lbl(S, 'n3', X, 10.0, ['1비트 늘 때마다 약 6 dB · 16비트 CD ≈ 98 dB', 'about 6 dB per bit; 16-bit CD ≈ 98 dB'], '', 3, { w: 12.7 });
      lbl(S, 'n4', X, 11.4, ['아주 작은 신호는 오차가 신호와 맞물려 왜곡돼요 → 작은 잡음(디더)을 섞으면 고른 잡음으로 바뀌어요', 'tiny signals correlate with the error and distort; adding a little noise (dither) turns it into smooth hiss'], 'a', 4, { w: 12.7 });
    },
    notes: [['양자화는 연속 값을 가장 가까운 단계로 반올림해요 · 비트가 적으면 계단이 뚜렷해요', 'quantization rounds continuous values to the nearest level, and few bits make obvious stairs'], ['원래 값과의 차이는 늘 반 단계 안에 있어서, 신호가 충분히 크면 고른 잡음처럼 행동해요', 'the difference from the original stays within half a step and, for large enough signals, behaves like even noise'], ['그 잡음 대비 신호의 비율 SQNR은 비트당 약 6 dB씩 좋아져요 · 16비트면 약 98 dB예요', 'the signal-to-quantization-noise ratio improves about 6 dB per bit, reaching about 98 dB at 16 bits'], ['아주 작은 신호에서는 오차가 신호 모양을 따라가 귀에 거슬리는 왜곡이 돼요 · 작은 무작위 잡음(디더)을 섞으면 고른 잡음으로 바뀌어요', 'with very small signals the error tracks the waveform as harsh distortion, and adding a little random noise (dither) turns it into smooth hiss']],
    fin: [['양자화: 비트 수가 잡음 바닥을 정해요 · 비트당 약 6 dB', 'quantization: bit depth sets the noise floor, about 6 dB per bit', 'sgx-xs sgx-a'], ['24비트 녹음은 여유(헤드룸)를 위해 써요', '24-bit recording buys headroom'], ['딥러닝 모델 양자화(INT8)도 같은 원리예요', 'deep learning INT8 quantization follows the same idea']],
    caps: [['계단 만들기', 'Making stairs'], ['양자화 잡음', 'Quantization noise'], ['비트당 6 dB', 'Six dB per bit'], ['디더', 'Dither'], ['양자화', 'Quantization']]
  });
}

function sResample() {
  const X = 18.7, P = PF(19.3, 1.0, 12.0, 3.6, -.5, 15.5, -1.3, 1.3), Q = PF(19.3, 6.4, 12.0, 2.6, 0, .5, 0, 1.2);
  const f = n => Math.sin(2 * Math.PI * n / 10) * .8 + .35 * Math.sin(2 * Math.PI * .35 * n);
  return CW('sg-resample', {
    code: [['y = signal.decimate(x, 2)  # 필터 후 버리기', 'y = signal.decimate(x, 2)  # filter, then drop'], ['# 그냥 x[::2]면 fs/4 위가 접혀요', '# plain x[::2] folds content above fs/4'], ['z = signal.resample_poly(x, 160, 147)', 'z = signal.resample_poly(x, 160, 147)'], ['# 44.1 kHz × 160/147 = 48 kHz', '# 44.1 kHz × 160/147 = 48 kHz']],
    hl: [[0, 1], [1, 1, 'danger'], [0, 1, 'ok'], [2, 2, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      stems(S, 'x', P, [...Array(16)].map((_, n) => f(n)), 0, 1, { color: 'ink-2', sty: C.cur, r: .12 });
      lbl(S, 'n1', X, 5.0, ['2배 줄이기: 하나 걸러 하나 남기면 fs가 절반', 'downsample by 2: keep every other sample, halving fs'], '', 1, { off: 2, w: 12.7 });
      axes(S, 'qx', Q, 2, { noy: 1 });
      rect(S, 'b1', Q.X(.1) - .2, Q.Y(1), .4, Q.Y(0) - Q.Y(1), 'accent', 60, 2, { r: .05 }); rect(S, 'b2', Q.X(.35) - .2, Q.Y(.35), .4, Q.Y(0) - Q.Y(.35), 'danger', 60, 2, { r: .05, off: 3 });
      vl(S, 'nq', Q.X(.25), Q.y0, Q.y0 + Q.h, 'warn', 2, { dash: 1, w: .07 }); lbl(S, 'nql', Q.X(.25) + .2, Q.y0 - .1, ['새 나이퀴스트', 'new Nyquist'], 'w', 2);
      lbl(S, 'n2', X, 9.4, ['0.35fs 성분은 새 나이퀴스트(0.25fs)를 넘어 0.15로 접혀요 ✗', 'the 0.35fs tone exceeds the new Nyquist (0.25fs) and folds to 0.15 ✗'], 'r', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 9.4, ['먼저 0.25fs 위를 깎는 저역통과 필터 → 그다음 버리기 ✓', 'first low-pass below 0.25fs, then drop samples ✓'], 'g', 3, { off: 4, w: 12.7 });
      lines(S, 'n4', X, 9.4, [[['늘리기: 0을 끼워 넣고 보간 필터로 채워요', 'upsampling: insert zeros, fill with an interpolation filter'], 'sgx-wr', { lh: 1.8 }], [['44.1 → 48 kHz: 160배 늘리고 147배 줄이기', '44.1 → 48 kHz: up by 160, down by 147'], 'a sgx-wr', { lh: 1.8 }]], 4, 0, { w: 12.7 });
    },
    notes: [['샘플링 주파수를 바꾸는 게 리샘플링이에요 · 2배로 줄이려면 샘플을 하나씩 걸러요', 'resampling changes the sample rate, and halving it keeps every other sample'], ['그러면 나이퀴스트 주파수도 절반이 되어, 그 위에 있던 성분이 접혀 들어와요', 'that halves the Nyquist frequency too, so anything above it folds back in'], ['그래서 먼저 새 나이퀴스트 위를 깎는 저역통과 필터를 거친 뒤 버려요 · decimate가 이 둘을 함께 해요', 'so first low-pass filter below the new Nyquist and then drop samples, which decimate does in one call'], ['늘릴 때는 사이에 0을 끼우고 보간 필터로 채워요 · 44.1 kHz를 48 kHz로 바꿀 땐 160배 늘리고 147배 줄여요', 'to increase the rate, insert zeros and fill them with an interpolation filter; 44.1 kHz becomes 48 kHz by going up 160 and down 147']],
    fin: [['리샘플링: 줄이기 전에 필터, 늘린 뒤에 필터', 'resampling: filter before decimating, filter after interpolating', 'sgx-xs sgx-a'], ['다상(polyphase) 필터로 계산을 크게 줄여요', 'polyphase filters cut the work dramatically'], ['이미지 축소 전에 흐리게 하는 것도 같은 이유예요', 'blurring an image before shrinking it is the same idea']],
    caps: [['샘플 줄이기', 'Dropping samples'], ['접히는 성분', 'Folding content'], ['필터 먼저', 'Filter first'], ['늘리기와 비율 변환', 'Upsampling and ratio changes'], ['리샘플링', 'Resampling']]
  });
}
/* ===== Signals and systems · 5. filters, 6. applications ===== */
const xmk = (S, k, x, y, color, st, o = {}) => { const r = o.r || .22; seg(S, k + 'a', [x - r, y - r], [x + r, y + r], st, color, o.h || .1, { off: o.off }); seg(S, k + 'b', [x - r, y + r], [x + r, y - r], st, color, o.h || .1, { off: o.off }); };
const dtft = (h, w) => { let re = 0, im = 0; h.forEach((v, n) => { re += v * Math.cos(w * n); im -= v * Math.sin(w * n); }); return Math.hypot(re, im); };

function sBode() {
  const X = 18.7, fc = 159.15, P = PF(19.3, .9, 12.0, 4.4, 1, 5, -60, 4), Q = PF(19.3, 7.2, 12.0, 2.4, 1, 5, -95, 5);
  const mag = lf => -10 * Math.log10(1 + Math.pow(Math.pow(10, lf) / fc, 2)), ph = lf => -Math.atan(Math.pow(10, lf) / fc) * 180 / Math.PI;
  const lfc = Math.log10(fc);
  return CW('sg-freqresp', {
    code: ['R, C = 1e3, 1e-6', ['fc = 1 / (2 * np.pi * R * C)   # ≈ 159 Hz', 'fc = 1 / (2 * np.pi * R * C)   # ≈ 159 Hz'], 'H = 1 / (1 + 1j * f / fc)', ['db = 20 * np.log10(np.abs(H))  # fc: −3 dB', 'db = 20 * np.log10(np.abs(H))  # fc: −3 dB'], ['ph = np.angle(H, deg=True)     # fc: −45°', 'ph = np.angle(H, deg=True)     # fc: −45°']],
    hl: [[0, 3], [1, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 0, { w: .06 }); hl(S, 'ax', P.x0, P.x0 + P.w, P.Y(0), 'ink-3', 0, { w: .06 });
      [[1, '10'], [2, '100'], [3, '1k'], [4, '10k'], [4.85, '100k']].forEach(([l, t], i) => T(S, 'tx' + i, P.X(l) - .8, P.y0 + P.h + .1, t, 'cz-mono cz-tc sgx-tiny', 0, { w: 1.6 }));
      [0, -20, -40, -60].forEach((d, i) => T(S, 'dy' + i, 18.0, P.Y(d) - .35, String(d), 'cz-mono sgx-tiny', 0, { w: 1.2 }));
      curve(S, 'm', P, mag, 1, { color: 'accent', n: 80 });
      lbl(S, 'n1', X, 10.3, ['RC 저역통과 필터의 크기 응답 (로그 축)', 'magnitude response of an RC low-pass (log axes)'], '', 1, { off: 2, w: 12.7 });
      vl(S, 'fc', P.X(lfc), P.Y(-3), P.y0 + P.h, 'warn', 2, { dash: 1, w: .07 }); pt(S, 'fcp', P.X(lfc), P.Y(-3), 2, C.warn, .2);
      lbl(S, 'fcl', P.X(lfc) + .3, P.Y(-3) - .9, '−3 dB @ 159 Hz', 'm w', 2);
      lbl(S, 'n2', X, 10.3, ['차단 주파수 fc = 1/(2πRC): 전력이 절반(−3 dB)이 되는 곳', 'cutoff fc = 1/(2πRC), where power halves (−3 dB)'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'sl', P.X(3.75), P.Y(-14), ['−20 dB/디케이드', '−20 dB/decade'], 'm r', 3);
      lbl(S, 'n3', X, 10.3, ['fc 위로는 주파수가 10배마다 20 dB(1/10)씩 줄어요', 'above fc the response falls 20 dB (a factor of 10) per decade'], 'r', 3, { off: 4, w: 12.7 });
      vl(S, 'qy', Q.x0, Q.y0, Q.y0 + Q.h, 'ink-3', 4, { w: .06 }); curve(S, 'ph', Q, ph, 4, { color: 'ok', n: 80 }); lbl(S, 'phl', Q.x0 + .3, Q.y0 - .75, ['위상 0° → −90°', 'phase 0° → −90°'], 'g', 4);
      lbl(S, 'n4', X, 10.3, ['위상은 fc에서 −45° · 높은 주파수일수록 늦게 나와요', 'phase is −45° at fc; higher frequencies come out later'], 'g', 4, { w: 12.7 });
    },
    notes: [['주파수 응답은 각 주파수의 사인파가 시스템을 지나며 얼마나 커지고(크기) 늦어지는지(위상) 보여 줘요', 'a frequency response shows how much each sinusoid is scaled (magnitude) and delayed (phase) by a system'], ['RC 회로의 차단 주파수는 fc = 1/(2πRC) · 1 kΩ과 1 µF면 약 159 Hz이고, 거기서 크기가 −3 dB예요', 'an RC circuit’s cutoff is fc = 1/(2πRC), about 159 Hz for 1 kΩ and 1 µF, where the magnitude is −3 dB'], ['fc를 넘으면 주파수가 10배 될 때마다 20 dB씩 줄어요 · 로그 축(보드 선도)에서는 직선이 돼요', 'past fc it drops 20 dB for every tenfold increase, a straight line on log axes (a Bode plot)'], ['위상은 0°에서 −90°로 늦어지고 fc에서 −45°예요 · 신호 모양을 지키려면 위상도 중요해요', 'the phase lags from 0° toward −90°, reaching −45° at fc, and matters whenever waveform shape must be preserved']],
    fin: [['주파수 응답 H(f): 크기(dB)와 위상(°)을 로그 주파수 축에 그린 보드 선도', 'frequency response H(f): magnitude in dB and phase in degrees on a log frequency axis (Bode plot)', 'sgx-xs sgx-a'], ['1차 필터는 −20 dB/디케이드, n차는 −20n', 'first-order filters fall 20 dB per decade, n-th order 20n'], ['오디오 이퀄라이저는 이 곡선을 직접 그리는 도구예요', 'audio equalizers let you draw this curve directly']],
    caps: [['크기 응답', 'Magnitude response'], ['차단 주파수', 'The cutoff'], ['기울기', 'The roll-off'], ['위상 응답', 'Phase response'], ['주파수 응답', 'Frequency response']]
  });
}

function sFirIir() {
  const X = 18.7, P1 = PF(19.3, 1.0, 5.6, 3.6, -.5, 14.5, -.35, 1.1), P2 = PF(25.7, 1.0, 5.6, 3.6, -.5, 14.5, -.6, 1.1);
  const fir = [...Array(15)].map((_, n) => { const m = n - 7, s = m === 0 ? 1 : Math.sin(.45 * Math.PI * m) / (.45 * Math.PI * m); return s * (.54 + .46 * Math.cos(Math.PI * m / 7)); });
  const iir = [...Array(15)].map((_, n) => Math.pow(.82, n) * Math.cos(.55 * n));
  return CW('sg-fir-iir', {
    code: [['b = signal.firwin(15, 0.45)    # FIR 15탭', 'b = signal.firwin(15, 0.45)    # FIR, 15 taps'], ['y = signal.lfilter(b, 1, x)    # 되먹임 없음', 'y = signal.lfilter(b, 1, x)    # no feedback'], ['b, a = signal.butter(4, 0.45)  # IIR 4차', 'b, a = signal.butter(4, 0.45)  # IIR, order 4'], ['y = signal.lfilter(b, a, x)    # 되먹임', 'y = signal.lfilter(b, a, x)    # feedback']],
    hl: [[0, 2], [2, 2, 'warn'], [0, 4], [0, 4]],
    draw: (S) => {
      axes(S, 'a1', P1, 1, { noy: 1 }); stems(S, 'f', P1, fir, 0, 1, { r: .12 }); lbl(S, 'l1', X, .3, ['FIR: 유한, 좌우 대칭', 'FIR: finite, symmetric'], 'a', 1);
      axes(S, 'a2', P2, 2, { noy: 1 }); stems(S, 'i', P2, iir, 0, 2, { color: 'warn', sty: C.cmp, r: .12 }); lbl(S, 'l2', 25.6, .3, ['IIR: 끝없이 이어짐', 'IIR: goes on forever'], 'w', 2);
      [['', 'FIR', 'IIR', 'a'], [['계수', 'coeffs'], ['수십~수백', '10s–100s'], ['몇 개', 'a few'], ''], [['위상', 'phase'], ['선형 가능', 'linear'], ['비선형', 'nonlinear'], ''], [['안정성', 'stability'], ['항상 안정', 'always'], ['설계 주의', 'take care'], ''], [['지연', 'delay'], ['길다', 'long'], ['짧다', 'short'], '']].forEach(([a, b, c, k], i) => { const y = 5.6 + i * 1.1; if (a) lbl(S, 'tr' + i, X, y, a, 'm', 3); lbl(S, 'tf' + i, X + 3.9, y, b, k || 'a', 3); lbl(S, 'ti' + i, X + 8.4, y, c, k || 'w', 3); });
      hl(S, 'tline', X, X + 12.6, 6.55, 'line', 3, { w: .05 });
      lbl(S, 'n4', X, 11.3, ['파형을 지켜야 하면(오디오 크로스오버, 통신) FIR · 계산이 빠듯하면(MCU, 실시간 제어) IIR', 'preserve waveforms (audio crossovers, comms) → FIR; tight compute (MCUs, control) → IIR'], 'g', 4, { w: 12.7 });
    },
    notes: [['FIR 필터는 입력만 가중합해요 · 임펄스 응답이 유한하고, 계수를 좌우 대칭으로 두면 모든 주파수가 같은 시간만큼 늦어져요(선형 위상)', 'an FIR filter takes a weighted sum of inputs only; its impulse response is finite, and symmetric coefficients delay every frequency equally (linear phase)'], ['IIR 필터는 이전 출력을 되먹여요 · 계수 몇 개로 날카로운 특성을 내지만 응답이 끝없이 이어져요', 'an IIR filter feeds back past outputs, achieving sharp responses with a few coefficients but ringing on forever'], ['같은 차단 성능이면 FIR은 계수가 훨씬 많고 지연이 길지만 늘 안정하고, IIR은 가볍지만 위상이 일그러지고 안정성을 따져야 해요', 'for the same sharpness, FIR needs far more coefficients and delay but is always stable, while IIR is light but distorts phase and needs stability care'], ['파형 모양이 중요하면 FIR, 계산 자원이 빠듯하면 IIR을 골라요', 'choose FIR when waveform shape matters and IIR when compute is tight']],
    fin: [['FIR: 되먹임 없음·선형 위상·항상 안정 · IIR: 되먹임·적은 계수·위상 왜곡', 'FIR: no feedback, linear phase, always stable; IIR: feedback, few coefficients, phase distortion', 'sgx-xs sgx-a'], ['버터워스·체비셰프·타원 필터는 대표적인 IIR 설계법이에요', 'Butterworth, Chebyshev and elliptic are classic IIR designs'], ['filtfilt로 앞뒤로 돌리면 IIR도 위상 왜곡이 없어요 (오프라인)', 'filtfilt runs IIR forward and back for zero phase (offline)']],
    caps: [['FIR', 'FIR'], ['IIR', 'IIR'], ['비교', 'Comparison'], ['어떤 걸 쓸까', 'Which to use'], ['FIR과 IIR', 'FIR vs IIR']]
  });
}

function sWinFir() {
  const X = 18.7, N = 31, M = 15, fc = .2;
  const ideal = m => m === 0 ? 2 * fc : Math.sin(2 * Math.PI * fc * m) / (Math.PI * m);
  const trunc = [...Array(N)].map((_, n) => ideal(n - M)), ham = trunc.map((v, n) => v * (.54 - .46 * Math.cos(2 * Math.PI * n / (N - 1))));
  const P = PF(19.3, 1.0, 12.0, 4.6, -18, 18, -.12, .45), Q = PF(19.3, 7.7, 12.0, 3.2, 0, Math.PI, 0, 1.25);
  return CW('sg-window-fir', {
    code: [['h = signal.firwin(31, 0.4)  # fc = 0.2·fs', 'h = signal.firwin(31, 0.4)  # fc = 0.2·fs'], ['# 이상적 응답 = sinc (양쪽으로 무한)', '# ideal response = sinc (infinite both ways)'], ['# 31개로 자르면 → 통과대역 물결', '# cutting to 31 taps → passband ripple'], ['# 해밍 창을 곱해 물결을 줄여요', '# a Hamming window tames the ripple'], 'y = signal.lfilter(h, 1, x)'],
    hl: [[1, 1], [2, 1, 'warn'], [3, 1, 'ok'], [0, 1]],
    draw: (S) => {
      axes(S, 'ax', P, 0);
      curve(S, 'id', P, t => ideal(t), 1, { color: 'ink-3', n: 200, h: .06 });
      lbl(S, 'n1', X, 6.0, ['이상적 저역통과의 임펄스 응답은 끝없는 sinc', 'an ideal low-pass has an endless sinc impulse response'], '', 1, { off: 2, w: 12.7 });
      stems(S, 't', P, trunc, -M, 2, { color: 'warn', sty: C.cmp, r: .1, off: 3 });
      lbl(S, 'n2', X, 6.0, ['가운데 31개만 남기고 잘라요 (사각 창)', 'keep only the middle 31 samples (a rectangular window)'], 'w', 2, { off: 3, w: 12.7 });
      stems(S, 'w', P, ham, -M, 3, { color: 'ok', sty: C.okf, r: .1 });
      lbl(S, 'n3', X, 6.0, ['해밍 창을 곱해 양 끝을 부드럽게 줄여요', 'multiply by a Hamming window to taper the ends'], 'g', 3, { off: 4, w: 12.7 });
      axes(S, 'qx', Q, 4, { noy: 1 });
      curve(S, 'qt', Q, w => dtft(trunc, w), 4, { color: 'warn', n: 120, h: .07 });
      curve(S, 'qw', Q, w => dtft(ham, w), 4, { color: 'ok', n: 120, h: .09 });
      lbl(S, 'n4', X, 6.0, ['주파수 응답: 그냥 자르면 물결과 높은 저지대역(주황), 창을 쓰면 매끈(초록)', 'frequency response: plain truncation ripples and leaks (orange); the window is smooth (green)'], 'a', 4, { w: 12.7 });
    },
    notes: [['원하는 주파수만 정확히 통과시키는 이상적 저역통과 필터의 임펄스 응답은 양쪽으로 끝없는 sinc예요 · 그대로는 만들 수 없어요', 'an ideal low-pass that passes exactly the wanted frequencies has a sinc impulse response running forever in both directions, impossible to build as is'], ['가운데 31개만 남기고 자르면 쓸 수 있는 FIR이 되지만, 갑작스러운 절단 때문에 주파수 응답에 물결이 생겨요', 'keeping the middle 31 samples makes a usable FIR, but the abrupt cut causes ripples in the frequency response'], ['해밍 같은 창을 곱해 양 끝을 부드럽게 0으로 줄이면 물결이 크게 줄어요 · 전이 대역은 조금 넓어져요', 'multiplying by a window like Hamming tapers the ends to zero and greatly reduces the ripple, at the cost of a slightly wider transition band'], ['탭 수를 늘리면 전이 대역이 좁아지고, 창 종류로 저지대역 감쇠를 고를 수 있어요 · firwin이 이 과정을 한 번에 해요', 'more taps narrow the transition band and the window type sets stopband attenuation, all done in one call by firwin']],
    fin: [['창 함수 FIR 설계: 이상적 sinc → 자르기 → 창 곱하기', 'windowed FIR design: ideal sinc → truncate → apply a window', 'sgx-xs sgx-a'], ['카이저 창은 감쇠량을 파라미터로 고를 수 있어요', 'the Kaiser window makes attenuation a tunable parameter'], ['파크스-매클렐런(remez)은 오차를 고르게 퍼뜨리는 최적 설계예요', 'Parks–McClellan (remez) spreads the error evenly for an optimal design']],
    caps: [['이상적 응답', 'The ideal response'], ['자르기', 'Truncation'], ['창 곱하기', 'Applying a window'], ['결과 비교', 'Comparing results'], ['창 함수 FIR 설계', 'Windowed FIR design']]
  });
}

function sZt() {
  const X = 18.7, cx = 22.4, cy = 4.4, r = 2.8, Q = PF(26.4, 1.6, 4.9, 5.4, 0, Math.PI, 0, 1.1);
  const H = w => Math.hypot(1 + Math.cos(w), -Math.sin(w)) / Math.hypot(1 - .9 * Math.cos(w), .9 * Math.sin(w)) / 20;
  const zp = (x, y) => [cx + x * r, cy - y * r];
  const w0 = Math.PI / 3, [ux, uy] = zp(Math.cos(w0), Math.sin(w0));
  return CW('sg-ztransform', {
    code: [['# H(z) = (1 + z⁻¹) / (1 − 0.9 z⁻¹)', '# H(z) = (1 + z⁻¹) / (1 − 0.9 z⁻¹)'], ['# 영점 z = −1, 극점 z = 0.9', '# zero at z = −1, pole at z = 0.9'], ['w, h = signal.freqz([1, 1], [1, -0.9])', 'w, h = signal.freqz([1, 1], [1, -0.9])'], ['# |H| = 영점까지 거리 / 극점까지 거리', '# |H| = distance to zero / distance to pole']],
    hl: [[0, 1], [1, 1, 'danger'], [1, 1, 'ok'], [2, 2, 'accent']],
    draw: (S) => {
      ring(S, 'uc', cx, cy, r, 'ink-3', 0, { w: .08 }); hl(S, 'rx', cx - r - .4, cx + r + .4, cy, 'ink-3', 0, { w: .05 }); vl(S, 'ry', cx, cy - r - .4, cy + r + .4, 'ink-3', 0, { w: .05 });
      lbl(S, 'rl', cx + r - .2, cy + .1, '1', 'f', 0); lbl(S, 'll', cx - r - 1.0, cy + .1, '−1', 'f', 0);
      pt(S, 'u', ux, uy, 1, C.cur, .2); F(S, 'ul', ux + .2, uy - .9, 'e^(jω)', 'a', 1);
      lbl(S, 'n1', X, 8.4, ['단위원 위의 점 e^(jω)가 주파수 ω · 0에서 π까지 돌면 0에서 fs/2', 'the point e^(jω) on the unit circle is frequency ω; 0 to π covers 0 to fs/2'], '', 1, { off: 2, w: 12.7 });
      xmk(S, 'pole', zp(.9, 0)[0], cy, 'danger', 2);
      seg(S, 'dp', [ux, uy], zp(.9, 0), 2, 'danger', .05);
      lbl(S, 'n2', X, 8.4, ['극점 0.9 근처(낮은 주파수)를 지날 때 분모가 작아져 |H|가 커져요', 'near the pole at 0.9 (low frequencies) the denominator shrinks and |H| grows'], 'r', 2, { off: 3, w: 12.7 });
      ring(S, 'zero', zp(-1, 0)[0], cy, .25, 'ok', 3, { w: .1 });
      seg(S, 'dz', [ux, uy], zp(-1, 0), 3, 'ok', .05);
      lbl(S, 'n3', X, 8.4, ['영점 −1(= fs/2)에서는 분자가 0 → 그 주파수를 완전히 지워요', 'at the zero at −1 (= fs/2) the numerator is 0, erasing that frequency'], 'g', 3, { off: 4, w: 12.7 });
      vl(S, 'qa', Q.x0, Q.y0, Q.y0 + Q.h, 'ink-3', 4, { w: .06 }); hl(S, 'qb', Q.x0, Q.x0 + Q.w, Q.y0 + Q.h, 'ink-3', 4, { w: .06 });
      curve(S, 'hq', Q, H, 4, { color: 'accent', n: 80 }); lbl(S, 'hql', Q.x0, Q.y0 - .9, '|H(ω)|', 'f a', 4);
      lbl(S, 'n4', X, 8.4, ['결과: 낮은 주파수는 키우고 높은 주파수는 지우는 저역통과', 'the result boosts lows and erases highs: a low-pass'], 'a', 4, { w: 12.7 });
    },
    notes: [['z 변환은 이산 신호를 z의 다항식으로 바꿔요 · 단위원 위의 z = e^(jω)에서 값을 보면 주파수 응답이 돼요', 'the z-transform turns a discrete signal into a polynomial in z, and evaluating it on the unit circle z = e^(jω) gives the frequency response'], ['극점(분모가 0인 곳) 가까이의 주파수는 크게 키워져요 · 극점 0.9는 0 Hz 근처를 키워요', 'frequencies near a pole, where the denominator vanishes, are amplified, so the pole at 0.9 boosts frequencies near 0 Hz'], ['영점(분자가 0인 곳)이 단위원 위에 있으면 그 주파수는 완전히 사라져요 · −1은 fs/2예요', 'a zero, where the numerator vanishes, on the unit circle removes that frequency completely; −1 is fs/2'], ['극점과 영점의 위치만으로 필터 모양을 읽고 설계할 수 있어요 · 극점이 단위원 밖이면 불안정해요', 'the placement of poles and zeros alone describes and designs a filter, and a pole outside the unit circle means instability']],
    fin: [['z 평면: 극점은 키우고 영점은 지워요 · 주파수는 단위원 위를 도는 점', 'the z-plane: poles boost, zeros erase, and frequency is a point circling the unit circle', 'sgx-xs sgx-a'], ['안정하려면 모든 극점이 단위원 안에', 'stability needs every pole inside the unit circle'], ['연속 시간의 s 평면(라플라스)과 짝이에요', 'the discrete counterpart of the Laplace s-plane']],
    caps: [['단위원과 주파수', 'The unit circle and frequency'], ['극점', 'Poles'], ['영점', 'Zeros'], ['주파수 응답 읽기', 'Reading the response'], ['z 변환과 극점·영점', 'The z-transform, poles and zeros']]
  });
}

function sNotch() {
  const X = 18.7, fs = 1000, P = PF(19.3, .9, 12.0, 3.4, 0, .25, -1.8, 1.8), Q = PF(19.3, 5.6, 12.0, 3.2, 0, 150, 0, 1.15);
  const sig = t => .8 * Math.sin(2 * Math.PI * 7 * t) + .3 * Math.sin(2 * Math.PI * 23 * t), hum = t => .7 * Math.sin(2 * Math.PI * 60 * t);
  const sp = f => Math.max(Math.exp(-Math.pow((f - 7) / 2, 2)), .4 * Math.exp(-Math.pow((f - 23) / 2, 2)));
  const nt = f => Math.abs(f - 60) / Math.sqrt(Math.pow(f - 60, 2) + 4);
  return CW('sg-notch', {
    code: ['b, a = signal.iirnotch(60, 30, fs=1000)', ['clean = signal.filtfilt(b, a, ecg)', 'clean = signal.filtfilt(b, a, ecg)'], ['# 영점: 단위원 위 ±60 Hz 자리', '# zeros: on the unit circle at ±60 Hz'], ['# 극점: 바로 안쪽 (r ≈ 0.994) → 좁은 노치', '# poles just inside (r ≈ 0.994) → narrow']],
    hl: [[1, 1], [0, 1, 'warn'], [2, 2, 'ok'], [1, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 0, { noy: 1 });
      curve(S, 'nz', P, t => sig(t) + hum(t), 1, { color: 'danger', n: 260, h: .06, off: 4 });
      lbl(S, 'n1', X, 9.6, ['생체 신호에 전원선 60 Hz 잡음이 섞였어요', 'a biosignal picks up 60 Hz mains hum'], 'r', 1, { off: 2, w: 12.7 });
      axes(S, 'qx', Q, 2, { noy: 1 });
      curve(S, 'sp', Q, sp, 2, { color: 'accent', n: 120 }); rect(S, 'hb', Q.X(60) - .15, Q.Y(.9), .3, Q.Y(0) - Q.Y(.9), 'danger', 60, 2, { r: .05, off: 4 });
      [0, 60, 150].forEach((f, i) => T(S, 'qt' + i, Q.X(f) - .7, Q.Y(0) + .1, String(f), 'cz-mono cz-tc sgx-tiny', 2, { w: 1.4 }));
      lbl(S, 'n2', X, 9.6, ['스펙트럼: 신호는 낮은 쪽, 60 Hz에 뾰족한 잡음', 'spectrum: signal down low, a spike of hum at 60 Hz'], 'w', 2, { off: 3, w: 12.7 });
      curve(S, 'nr', Q, nt, 3, { color: 'ok', n: 200, h: .07 });
      lbl(S, 'n3', X, 9.6, ['노치 필터: 60 Hz만 깊게 파내고 나머지는 거의 1', 'a notch digs out 60 Hz and leaves the rest near 1'], 'g', 3, { off: 4, w: 12.7 });
      curve(S, 'cln', P, sig, 4, { color: 'ok', n: 200, h: .08 });
      lbl(S, 'n4', X, 9.6, ['결과: 원래 파형만 남아요 · filtfilt로 위상 왜곡도 없어요', 'the result keeps just the waveform; filtfilt adds no phase distortion'], 'a', 4, { w: 12.7 });
    },
    notes: [['심전도 같은 작은 신호에는 전원선의 60 Hz(지역에 따라 50 Hz) 잡음이 쉽게 섞여요', 'small signals like ECGs easily pick up 60 Hz mains hum, or 50 Hz depending on the region'], ['스펙트럼으로 보면 신호는 낮은 주파수에 넓게 퍼져 있고, 잡음은 60 Hz에 뾰족하게 솟아 있어요', 'in the spectrum the signal spreads over low frequencies while the hum is a sharp spike at 60 Hz'], ['노치 필터는 단위원 위 60 Hz 자리에 영점을 두고 바로 안쪽에 극점을 둬서, 그 주파수만 좁고 깊게 지워요', 'a notch filter places zeros on the unit circle at 60 Hz and poles just inside, removing only that frequency, narrowly and deeply'], ['잡음이 사라지고 원래 파형이 남아요 · 앞뒤로 두 번 거르는 filtfilt를 쓰면 파형의 시간 위치도 그대로예요', 'the hum vanishes and the waveform remains, and filtering forward and backward with filtfilt keeps its timing intact']],
    fin: [['노치 필터: 특정 주파수 하나만 좁게 지우는 필터', 'notch filter: removes one specific frequency, narrowly', 'sgx-xs sgx-a'], ['Q가 클수록 폭이 좁아요', 'higher Q means a narrower notch'], ['하울링(피드백) 제거기에도 써요', 'used in howl and feedback suppressors too']],
    caps: [['60 Hz 잡음', '60 Hz hum'], ['스펙트럼', 'The spectrum'], ['노치 필터', 'The notch filter'], ['깨끗한 신호', 'The clean signal'], ['노치 필터', 'Notch filters']]
  });
}

function sLaplace() {
  const X = 18.7, cx = 24.8, cy = 4.0, sc = 1.15;
  const sp = (s, w) => [cx + s * sc, cy - w * sc];
  const mini = (k, x0, y0, f, c, st) => { const P = PF(x0, y0, 3.6, 1.8, 0, 6, -1.4, 1.4); hl(S0, k + 'a', P.x0, P.x0 + P.w, P.Y(0), 'ink-3', st, { w: .04 }); curve(S0, k, P, f, st, { color: c, n: 60, h: .06 }); };
  let S0;
  return CW('sg-laplace', {
    code: [['# s = σ + jω  (감쇠 + 진동)', '# s = σ + jω  (decay + oscillation)'], 'H = 1 / (s**2 + 2*z*w0*s + w0**2)', ['# 극점 실수부 < 0 → 감쇠 (안정)', '# pole real part < 0 → decays (stable)'], ['# = 0 → 계속 진동, > 0 → 발산', '# = 0 → rings forever, > 0 → blows up'], ['# z = e^(sT): 왼쪽 반평면 ↔ 단위원 안', '# z = e^(sT): left half ↔ inside unit circle']],
    hl: [[0, 1], [2, 1, 'ok'], [3, 1, 'danger'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      rect(S, 'lh', cx - 3.6 * sc, cy - 3.2 * sc, 3.6 * sc, 6.4 * sc, 'ok', 8, 0, { r: 0 });
      hl(S, 'sx', cx - 3.8 * sc, cx + 3.8 * sc, cy, 'ink-3', 0, { w: .06 }); vl(S, 'sy', cx, cy - 3.2 * sc, cy + 3.2 * sc, 'ink-3', 0, { w: .06 });
      F(S, 'lsg', cx + 3.0 * sc, cy + .1, 'σ', '', 0); F(S, 'ljw', cx + .2, cy - 3.3 * sc, 'jω', '', 0);
      lbl(S, 'lhl', cx - 3.5 * sc, cy + 2.2 * sc, ['안정 영역', 'stable region'], 'g', 1);
      [[-1.2, 2], [-1.2, -2]].forEach(([s, w], i) => xmk(S, 'p1' + i, ...sp(s, w), 'ok', 2));
      mini('m1', 19.0, 8.6, t => Math.exp(-.45 * t) * Math.cos(3 * t), 'ok', 2);
      lbl(S, 'm1l', 19.0, 10.5, ['왼쪽: 감쇠 진동', 'left: decays'], 'g', 2);
      [[0, 1.4], [0, -1.4]].forEach(([s, w], i) => xmk(S, 'p2' + i, ...sp(s, w), 'warn', 3));
      [[1.0, 2.6], [1.0, -2.6]].forEach(([s, w], i) => xmk(S, 'p3' + i, ...sp(s, w), 'danger', 3));
      mini('m2', 23.2, 8.6, t => Math.cos(3 * t), 'warn', 3); lbl(S, 'm2l', 23.2, 10.5, ['축 위: 계속 진동', 'on axis: rings'], 'w', 3);
      mini('m3', 27.4, 8.6, t => Math.min(1.35, Math.max(-1.35, .12 * Math.exp(.4 * t) * Math.cos(3 * t))), 'danger', 3); lbl(S, 'm3l', 27.4, 10.5, ['오른쪽: 발산', 'right: blows up'], 'r', 3);
      lbl(S, 'n1', X, 12.0, ['라플라스 변환은 신호를 e^(st) 성분으로 나눠요 · s의 실수부는 감쇠, 허수부는 진동', 'the Laplace transform splits signals into e^(st); the real part of s decays, the imaginary part oscillates'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n4', X, 12.0, ['샘플링하면 z = e^(sT)로 왼쪽 반평면이 단위원 안으로 옮겨가요', 'sampling maps z = e^(sT), sending the left half-plane inside the unit circle'], 'a', 4, { w: 12.7 });
    },
    notes: [['라플라스 변환은 연속 시간 신호를 e^(st) 성분으로 나눠요 · s = σ + jω에서 σ는 감쇠·증가, ω는 진동이에요', 'the Laplace transform decomposes continuous-time signals into e^(st), where in s = σ + jω the σ part decays or grows and ω oscillates'], ['극점이 왼쪽 반평면에 있으면 응답이 진동하면서 줄어들어요 · 안정한 시스템이에요', 'poles in the left half-plane give responses that ring and die away: a stable system'], ['허수축 위면 영원히 진동하고, 오른쪽이면 점점 커져 발산해요 · 극점 위치가 시스템의 성격을 정해요', 'poles on the imaginary axis ring forever and poles on the right grow without bound, so pole placement sets a system’s character'], ['연속 시스템을 샘플링하면 z = e^(sT)로 바뀌어 왼쪽 반평면이 단위원 안쪽에 대응해요', 'sampling a continuous system maps z = e^(sT), so the left half-plane corresponds to the inside of the unit circle']],
    fin: [['라플라스: s 평면의 극점 위치로 연속 시스템의 안정성과 응답 모양을 읽어요', 'Laplace: pole positions in the s-plane reveal a continuous system’s stability and response', 'sgx-xs sgx-a'], ['미분 방정식이 s에 대한 대수 방정식이 돼요', 'differential equations become algebra in s'], ['회로·기계 시스템과 제어 설계의 기본 도구예요', 'the basic tool for circuits, mechanics and control design']],
    caps: [['s 평면', 'The s-plane'], ['왼쪽 극점', 'Left-half poles'], ['축 위와 오른쪽', 'On the axis and to the right'], ['z 평면으로', 'To the z-plane'], ['라플라스 변환', 'The Laplace transform']]
  });
}

function sMod() {
  const X = 18.7, P1 = PF(19.3, .8, 12.0, 2.1, 0, 1, -1.2, 1.2), P2 = PF(19.3, 3.9, 12.0, 2.4, 0, 1, -1.7, 1.7), P3 = PF(19.3, 7.2, 12.0, 2.0, 0, 1, -1.2, 1.2), Q = PF(19.3, 10.0, 12.0, 2.0, 20, 40, 0, 1.2);
  const m = t => Math.sin(2 * Math.PI * 2 * t);
  return CW('sg-modulation', {
    code: [['m  = np.sin(2 * np.pi * 2 * t)  # 메시지', 'm  = np.sin(2 * np.pi * 2 * t)  # message'], 'am = (1 + 0.6 * m) * np.cos(2*np.pi*fc*t)', 'fm = np.cos(2*np.pi*fc*t + k*np.cumsum(m)*dt)', ['# AM: 크기에, FM: 주파수에 메시지를 실어요', '# AM rides on amplitude, FM on frequency']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      axes(S, 'a1', P1, 1, { noy: 1 }); curve(S, 'm', P1, m, 1, { color: 'accent', n: 80 }); lbl(S, 'l1', X, .2, ['메시지 2 Hz', 'message, 2 Hz'], 'a', 1);
      axes(S, 'a2', P2, 2, { noy: 1 }); curve(S, 'am', P2, t => (1 + .6 * m(t)) * Math.cos(2 * Math.PI * 30 * t), 2, { color: 'warn', n: 420, h: .05 });
      curve(S, 'en', P2, t => 1 + .6 * m(t), 2, { color: 'danger', n: 80, h: .05 }); lbl(S, 'l2', X, 3.15, ['AM: 반송파 크기가 메시지를 따라요', 'AM: carrier size follows the message'], 'w', 2);
      axes(S, 'a3', P3, 3, { noy: 1 }); curve(S, 'fm', P3, t => Math.cos(2 * Math.PI * 30 * t - 4 * Math.cos(4 * Math.PI * t)), 3, { color: 'ok', n: 520, h: .05 });
      lbl(S, 'l3', X, 6.45, ['FM: 주파수가 메시지를 따라요', 'FM: frequency follows the message'], 'g', 3);
      axes(S, 'qx', Q, 4, { noy: 1 }); [[30, 1, 'accent'], [28, .3, 'warn'], [32, .3, 'warn']].forEach(([f, v, c], i) => rect(S, 'qb' + i, Q.X(f) - .12, Q.Y(v), .24, Q.Y(0) - Q.Y(v), c, 60, 4, { r: .05 }));
      lbl(S, 'l4', X, 12.4, ['AM 스펙트럼: 반송파 30 Hz와 ±2 Hz 옆띠 · 방송국마다 다른 반송파로 대역을 나눠 써요', 'AM spectrum: carrier at 30 Hz with sidebands at ±2 Hz; stations share the band with different carriers'], 'a', 4, { w: 12.7 });
    },
    notes: [['소리 같은 낮은 주파수 메시지는 그대로 안테나로 보내기 어려워요 · 높은 주파수의 반송파에 실어 보내요', 'low-frequency messages such as audio are hard to radiate directly, so they ride on a high-frequency carrier'], ['AM은 반송파의 크기를 메시지에 따라 바꿔요 · 포락선(빨강)이 메시지 모양이에요', 'AM varies the carrier’s amplitude with the message, so the envelope (red) traces the message'], ['FM은 크기는 그대로 두고 주파수를 바꿔요 · 크기에 섞이는 잡음에 강해서 음질이 좋아요', 'FM keeps the amplitude constant and varies the frequency, shrugging off amplitude noise for better sound'], ['곱하기는 스펙트럼을 반송파 주파수로 옮겨요 · 그래서 여러 방송이 반송파만 달리해 같은 공간을 나눠 써요', 'multiplication shifts the spectrum up to the carrier, letting many stations share the airwaves on different carriers']],
    fin: [['변조: 메시지를 반송파의 크기(AM)·주파수(FM)·위상(PM)에 실어 보내요', 'modulation carries a message on a carrier’s amplitude (AM), frequency (FM) or phase (PM)', 'sgx-xs sgx-a'], ['디지털 통신은 QAM처럼 크기와 위상을 함께 써요', 'digital links combine amplitude and phase, as in QAM'], ['Wi-Fi·LTE의 OFDM은 수많은 부반송파를 FFT로 다뤄요', 'Wi-Fi and LTE OFDM juggle many subcarriers with the FFT']],
    caps: [['메시지', 'The message'], ['AM', 'AM'], ['FM', 'FM'], ['스펙트럼 이동', 'Shifting the spectrum'], ['변조', 'Modulation']]
  });
}

function sCorr() {
  const X = 18.7, code = [1, 1, 1, -1, -1, 1, -1], D = 12, N = 32;
  let seed = 11; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 - .5; };
  const rx = [...Array(N)].map((_, n) => (n >= D && n < D + 7 ? code[n - D] * .8 : 0) + rnd() * 1.4);
  const xc = [...Array(N - 6)].map((_, k) => code.reduce((a, c, i) => a + c * rx[k + i], 0));
  const P1 = PF(19.3, 1.1, 12.0, 1.9, -.5, 31.5, -1.3, 1.3), P2 = PF(19.3, 4.2, 12.0, 2.5, -.5, 31.5, -1.4, 1.4), P3 = PF(19.3, 7.9, 12.0, 2.8, -.5, 31.5, -2.5, 7.5);
  return CW('sg-correlation', {
    code: [['tx = [1, 1, 1, -1, -1, 1, -1]  # 바커 7', 'tx = [1, 1, 1, -1, -1, 1, -1]  # Barker 7'], ['# rx: 잡음 + 12칸 늦게 도착한 tx', '# rx: noise + tx arriving 12 late'], "c = np.correlate(rx, tx, 'valid')", ['np.argmax(c)                   # 12 → 지연', 'np.argmax(c)                   # → delay 12']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      axes(S, 'a1', P1, 1, { noy: 1 }); stems(S, 't', P1, code, 0, 1, { r: .12 }); lbl(S, 'l1', X, .3, ['보낸 신호 (바커 부호 7칩)', 'transmitted (a 7-chip Barker code)'], 'a', 1);
      axes(S, 'a2', P2, 2, { noy: 1 }); stems(S, 'r', P2, rx.map(v => Math.max(-1.4, Math.min(1.4, v))), 0, 2, { color: 'ink-2', sty: C.idle, r: .1 }); lbl(S, 'l2', X, 3.45, ['받은 신호: 잡음에 묻혔어요', 'received: buried in noise'], 'w', 2);
      axes(S, 'a3', P3, 3, { noy: 1 }); stems(S, 'xc', P3, xc, 0, 3, { color: 'ok', sty: C.okf, r: .11 });
      lbl(S, 'l3', X, 7.15, ['상관: 밀면서 곱해 더함 → 12에서 봉우리', 'correlation peaks at lag 12'], 'g', 3);
      lbl(S, 'n4', X, 11.4, ['지연 × 속도 = 거리: 레이더, 소나, GPS, 음향 동기화', 'delay × speed = distance: radar, sonar, GPS and audio sync'], 'a', 4, { w: 12.7 });
    },
    notes: [['원하는 모양이 신호 어디에 숨어 있는지 찾을 때 상관을 써요 · 레이더는 알려진 부호를 쏘고 반사파를 받아요', 'correlation finds where a known shape hides in a signal; radar transmits a known code and listens for echoes'], ['받은 신호는 잡음에 묻혀 눈으로는 위치를 알 수 없어요', 'the received signal is buried in noise, and the eye cannot find it'], ['보낸 부호를 한 칸씩 밀면서 곱해 더하면, 정확히 겹치는 지연에서 값이 크게 솟아요 · 잡음은 서로 상쇄돼요', 'sliding the code along and summing products makes a tall peak at the exact delay while noise averages out'], ['봉우리 위치가 도착 지연이에요 · 전파 속도를 곱하면 거리가 되고, GPS와 음향 동기화도 같은 원리예요', 'the peak marks the arrival delay, and multiplying by propagation speed gives distance, the principle behind GPS and audio sync']],
    fin: [['상관: 알려진 모양을 밀면서 겹쳐 보는 연산 · 잡음 속에서 지연을 찾아요', 'correlation: sliding a known shape across a signal to find its delay in noise', 'sgx-xs sgx-a'], ['합성곱과 같지만 뒤집지 않아요', 'like convolution, without the flip'], ['자기상관으로 신호의 주기(음 높이)도 찾아요', 'autocorrelation finds periods such as pitch']],
    caps: [['보낸 부호', 'The transmitted code'], ['잡음 속 수신', 'Received in noise'], ['상관 봉우리', 'The correlation peak'], ['거리 재기', 'Measuring distance'], ['상관과 지연 추정', 'Correlation and delay estimation']]
  });
}

function sImg() {
  const N = 8, cs = .62, img = [...Array(N)].map((_, r) => [...Array(N)].map((_, c) => r >= 2 && r <= 5 && c >= 2 && c <= 5 ? 1 : 0));
  const conv = K => img.map((row, r) => row.map((_, c) => { let s = 0; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const v = (img[r + i] || [])[c + j] || 0; s += v * K[i + 1][j + 1]; } return s; }));
  const BL = conv([[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]]), SX = conv([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]), SY = conv([[-1, -2, -1], [0, 0, 0], [1, 2, 1]]), ED = SX.map((r, i) => r.map((v, j) => Math.min(1, Math.hypot(v, SY[i][j]) / 3))), SH = conv([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]);
  const grid = (k, x0, y0, M, st, off, c) => { const W = M.length * cs; let r = ''; M.forEach((row, i) => row.forEach((v, j) => { r += `<rect x="${r3(j * cs)}" y="${r3(i * cs)}" width="${r3(cs - .03)}" height="${r3(cs - .03)}" style="fill:${tint(c || 'ink', Math.round(4 + 80 * Math.max(0, Math.min(1, v))))}"/>`; })); S0.el(k, { x: x0, y: y0, w: W, h: W, cls: 'sgx-sv', html: `<svg viewBox="0 0 ${r3(W)} ${r3(W)}">${r}</svg>`, s: st ? hid() : {} }); vis(S0, k, st, off); };
  let S0;
  const X = 18.7;
  return CW('sg-image', {
    code: ['blur  = np.ones((3, 3)) / 9', 'sobel = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]', 'sharp = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]]', ['out = signal.convolve2d(img, k, "same")', 'out = signal.convolve2d(img, k, "same")'], ['# CNN은 이 커널 값을 학습해요', '# CNNs learn these kernel values']],
    hl: [[3, 1], [0, 1, 'warn'], [1, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      grid('o', 19.0, 1.0, img, 1); lbl(S, 'lo', 19.0, .25, ['원본 8×8', 'original 8×8'], '', 1);
      frame(S, 'kw', 19.0 + 1 * cs - .03, 1.0 + 1 * cs - .03, 3 * cs + .06, 3 * cs + .06, 'warn', 1, { w: .08, r: .05, off: 2 });
      arw(S, 'iar', [24.3, 3.5], [26.0, 3.5], 2);
      lbl(S, 'n1', X, 6.6, ['3×3 커널을 픽셀마다 겹쳐 곱하고 더해 새 값을 만들어요 (2D 합성곱)', 'overlay a 3×3 kernel on each pixel, multiply and sum: a 2D convolution'], '', 1, { off: 2, w: 12.7 });
      grid('b', 26.4, 1.0, BL, 2, 3, 'accent'); lbl(S, 'lb', 26.4, .25, ['흐림 (평균)', 'blur (average)'], 'a', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['평균 커널: 경계가 부드럽게 번져요 · 저역통과', 'the averaging kernel softens edges: a low-pass'], 'a', 2, { off: 3, w: 12.7 });
      grid('e', 26.4, 1.0, ED, 3, 4, 'ok'); lbl(S, 'le', 26.4, .25, ['소벨 경계', 'Sobel edges'], 'g', 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['소벨 커널: 밝기가 바뀌는 경계만 남아요 · 고역통과', 'the Sobel kernel keeps only where brightness changes: a high-pass'], 'g', 3, { off: 4, w: 12.7 });
      grid('sh', 26.4, 1.0, SH.map(r => r.map(v => v / 1.5)), 4, undefined, 'warn'); lbl(S, 'ls', 26.4, .25, ['선명하게', 'sharpened'], 'w', 4);
      lbl(S, 'n4', X, 6.6, ['샤프닝: 원본 + 경계 강조 · CNN의 첫 층이 이런 커널들을 스스로 배워요', 'sharpening adds emphasized edges back; a CNN’s first layer learns kernels like these on its own'], 'w', 4, { w: 12.7 });
    },
    notes: [['이미지 필터는 2D 합성곱이에요 · 3×3 커널을 픽셀마다 겹쳐 곱하고 더해서 새 픽셀 값을 만들어요', 'image filters are 2D convolutions: a 3×3 kernel overlaid on each pixel, multiplied and summed to produce the new value'], ['모든 칸이 1/9인 평균 커널은 이웃을 평균 내어 경계를 흐리게 해요 · 1D 이동 평균의 2D 판이에요', 'an averaging kernel of 1/9s blends neighbors and blurs edges, the 2D cousin of the moving average'], ['소벨 커널은 좌우·위아래 밝기 차이를 계산해 경계만 남겨요 · 높은 공간 주파수를 통과시키는 필터예요', 'the Sobel kernels measure left-right and up-down brightness differences, leaving only edges, a filter for high spatial frequencies'], ['샤프닝 커널은 원본에 경계를 더해 또렷하게 해요 · CNN은 이런 커널 값을 데이터에서 학습해요', 'a sharpening kernel adds edges back for crispness, and CNNs learn such kernel values from data']],
    fin: [['이미지 필터 = 2D 합성곱: 흐림(저역)·경계(고역)·샤프닝', 'image filters are 2D convolutions: blur (low-pass), edges (high-pass), sharpening', 'sgx-xs sgx-a'], ['가우시안 블러는 가운데에 무게를 더 줘요', 'Gaussian blur weights the center more'], ['큰 커널은 FFT로 곱하는 게 빨라요', 'large kernels are faster through the FFT']],
    caps: [['커널 겹치기', 'Overlaying a kernel'], ['흐리기', 'Blurring'], ['경계 검출', 'Edge detection'], ['샤프닝과 CNN', 'Sharpening and CNNs'], ['이미지 필터', 'Image filters']]
  });
}

function sFeedback() {
  const X = 18.7, P = PF(19.3, 4.4, 12.0, 5.2, 0, 10, 0, 1.45);
  const step2 = (a, b) => t => 1 - Math.exp(-a * t) * (Math.cos(b * t) + a / b * Math.sin(b * t));
  return CW('sg-feedback', {
    code: [['e = r - y                             # 오차', 'e = r - y                             # error'], 'integ += e * dt', 'deriv = (e - e_prev) / dt', 'u = Kp * e + Ki * integ + Kd * deriv  # PID', 'e_prev = e'],
    hl: [[0, 1], [3, 1, 'warn'], [1, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      nd(S, 'r', 18.9, 1.0, 1.6, 'r', 'line', 1); arw(S, 'a1', [20.6, 1.55], [21.2, 1.55], 1);
      ring(S, 'sm', 21.65, 1.55, .42, 'ink-2', 1, { w: .1 }); T(S, 'smx', 20.75, 1.95, '−', 'sgx-s', 1, { w: .6 });
      arw(S, 'a2', [22.1, 1.55], [22.7, 1.55], 1); box(S, 'pid', 22.8, 1.0, 3.0, 1.1, 'PID', 'accent', 1);
      arw(S, 'a3', [25.9, 1.55], [26.5, 1.55], 1); box(S, 'pl', 26.6, 1.0, 2.6, 1.1, ['모터', 'plant'], 'warn', 1);
      arw(S, 'a4', [29.3, 1.55], [30.4, 1.55], 1); nd(S, 'y', 30.4, 1.0, 1.0, 'y', 'line', 1);
      elb(S, 'fb', [[29.9, 1.55], [29.9, 3.0], [21.65, 3.0], [21.65, 2.0]], 'danger', 1, { h: .08 });
      lbl(S, 'fbl', 23.0, 3.15, ['되먹임: 측정값 y를 빼요', 'feedback: subtract y'], 'r', 1);
      axes(S, 'ax', P, 2, { noy: 1 }); vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 2, { w: .06 }); hl(S, 'one', P.x0, P.x0 + P.w, P.Y(1), 'ink-3', 2, { w: .05, dash: 1 });
      F(S, 'tgt', P.x0 + P.w - 1.4, P.Y(1) - .75, 'r = 1', '', 2);
      curve(S, 'p', P, t => .8 * (1 - Math.exp(-t)), 2, { color: 'warn', n: 60 });
      curve(S, 'pi', P, step2(.5, 1.2), 3, { color: 'danger', n: 100 });
      curve(S, 'pd', P, step2(1.2, 1.0), 4, { color: 'ok', n: 100, h: .11 });
      lbl(S, 'g1', 1, 7.6, ['P만: 목표의 80%에서 멈춰요 (오차 20%)', 'P only: stalls at 80% of the target (20% error)'], 'w', 2);
      lbl(S, 'g2', 1, 8.8, ['PI: 오차는 0, 하지만 27% 넘치고 출렁여요', 'PI: zero error, but 27% overshoot and ringing'], 'r', 3);
      lbl(S, 'g3', 1, 10.0, ['PID: 빠르게 도달, 넘침 2%', 'PID: gets there fast, 2% overshoot'], 'g', 4);
      lbl(S, 'n1', X, 10.3, ['목표 r과 측정 y의 차이로 입력을 계속 고쳐요', 'keep correcting the input by the gap between target r and measurement y'], '', 1, { off: 2, w: 12.7 });
      lbl(S, 'n2', X, 10.3, ['비례(P): 오차에 비례해 밀어요 · 마지막에 조금 덜 가요', 'proportional (P) pushes with the error, but stops a bit short'], 'w', 2, { off: 3, w: 12.7 });
      lbl(S, 'n3', X, 10.3, ['적분(I): 쌓인 오차를 없애지만 넘치고 출렁여요', 'integral (I) wipes out the residual error but overshoots and rings'], 'r', 3, { off: 4, w: 12.7 });
      lbl(S, 'n4', X, 10.3, ['미분(D): 변화를 미리 보고 제동해 넘침을 줄여요', 'derivative (D) anticipates change and brakes the overshoot'], 'g', 4, { w: 12.7 });
    },
    notes: [['되먹임 제어는 출력을 측정해 목표와의 오차를 계속 줄여요 · 온도 조절기, 드론, 크루즈 컨트롤이 모두 이렇게 동작해요', 'feedback control measures the output and keeps shrinking its error from the target, the way thermostats, drones and cruise control work'], ['비례 제어만 쓰면 오차가 작아질수록 미는 힘도 작아져 목표에 조금 못 미친 채 멈춰요', 'proportional control alone pushes less as the error shrinks, settling just short of the target'], ['적분 항은 남은 오차를 쌓아 끝까지 밀어서 오차를 0으로 만들지만, 너무 세면 넘쳤다 출렁여요', 'the integral term accumulates leftover error and pushes it to zero, but too much of it overshoots and rings'], ['미분 항은 오차가 줄어드는 속도를 보고 미리 제동해요 · 세 항의 비율을 조정하는 게 PID 튜닝이에요', 'the derivative term watches how fast the error falls and brakes early, and balancing the three is PID tuning']],
    fin: [['PID 제어: 지금 오차(P), 쌓인 오차(I), 오차의 변화(D)로 입력을 정해요', 'PID control sets the input from the present error (P), accumulated error (I) and its rate of change (D)', 'sgx-xs sgx-a'], ['되먹임이 너무 세면 극점이 오른쪽으로 가 불안정해져요', 'too much gain pushes poles right and destabilizes the loop'], ['산업용 제어 루프의 대부분이 PID예요', 'most industrial control loops are PID']],
    caps: [['되먹임 루프', 'The feedback loop'], ['비례 제어', 'Proportional control'], ['적분 추가', 'Adding integral'], ['미분 추가', 'Adding derivative'], ['되먹임과 PID 제어', 'Feedback and PID control']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('sg-basics', '신호의 기초', 'Signals', '시간에 따라 변하는 값', 'Values that change over time', '연속과 이산, 아날로그와 디지털 신호의 구분, 계단·임펄스·지수 같은 기본 신호, 시간 이동·압축·반전, 사인파와 복소 지수, 그리고 에너지·전력·데시벨까지 신호를 다루는 기본 언어부터 봐요.', 'Continuous versus discrete and analog versus digital, the step, impulse and exponential, shifting, scaling and flipping time, sinusoids and complex exponentials, and energy, power and decibels: the basic vocabulary of signals.', [
    item('sg-types', '신호의 종류', 'Kinds of signals',
      '시간이 연속인지 이산인지, 값이 연속인지 양자화됐는지에 따라 신호를 네 가지로 나눠요. 컴퓨터가 다루는 건 둘 다 이산인 디지털 신호예요.',
      '마이크에 들어오는 소리 압력처럼 모든 순간에 어떤 실수값이든 가질 수 있는 신호가 연속 시간 아날로그 신호 x(t)예요. 일정한 간격으로 값을 찍으면 정수 시간 n에서만 정의된 이산 시간 신호 x[n]이 되고, 값을 정해진 단계로 반올림하면 양자화된 신호가 돼요. 시간도 값도 띄엄띄엄인 디지털 신호가 ADC에서 나와 컴퓨터로 들어가요. 대부분의 이론은 이산 시간 신호를 실수값으로 보고 전개하고, 양자화는 따로 잡음으로 다뤄요.',
      'Signals fall into four kinds by whether time is continuous or discrete and whether values are continuous or quantized; computers handle the digital kind, discrete in both.',
      'A continuous-time analog signal x(t), like the sound pressure at a microphone, can take any real value at every instant. Sampling at regular intervals gives a discrete-time signal x[n] defined only at integer times n, and rounding values to fixed levels quantizes them. A digital signal, discrete in both time and value, is what an ADC delivers to a computer. Most theory treats discrete-time signals as real-valued and handles quantization separately as noise.', sTypes()),
    item('sg-elementary', '기본 신호', 'Elementary signals',
      '단위 계단, 단위 임펄스, 지수 신호는 모든 신호를 쌓는 벽돌이에요. 어떤 이산 신호든 크기를 곱한 임펄스를 옮겨 더한 것으로 쓸 수 있어요.',
      '단위 계단 u[n]은 n = 0부터 계속 1이라 스위치를 켜는 순간을 나타내요. 단위 임펄스 δ[n]은 n = 0에서만 1이고, 계단의 차분 u[n] − u[n − 1]과 같아요. 0.8ⁿ u[n] 같은 지수 신호는 밑의 크기가 1보다 작으면 줄어들고 크면 발산해요. 어떤 이산 신호든 x[n] = Σ x[k] δ[n − k]처럼 x[k]만큼 키운 임펄스를 k만큼 옮겨 더한 것이라서, 시스템이 임펄스에 어떻게 반응하는지만 알면 모든 입력에 대한 반응을 알 수 있어요. 이 생각이 합성곱으로 이어져요.',
      'The unit step, unit impulse and exponential are the bricks of every signal; any discrete signal is a sum of scaled, shifted impulses.',
      'The unit step u[n] is 1 from n = 0 onward, like a switch flipping on. The unit impulse δ[n] is 1 only at n = 0 and equals the step difference u[n] − u[n − 1]. An exponential such as 0.8ⁿ u[n] decays when its base is smaller than 1 in size and blows up when larger. Because any discrete signal can be written x[n] = Σ x[k] δ[n − k], a sum of impulses scaled by x[k] and shifted by k, knowing how a system responds to one impulse tells you how it responds to every input. That idea leads straight to convolution.', sElem()),
    item('sg-transform', '시간 이동·압축·반전', 'Shifting, scaling and flipping time',
      'x(t − 2)는 2만큼 늦추고, x(2t)는 두 배로 빠르게 재생하고, x(−t)는 시간을 뒤집어요. 여러 변환을 섞을 땐 순서를 정해 하나씩 적용해요.',
      '신호의 모양은 그대로 두고 시간 축만 바꾸는 기본 변환이 세 가지 있어요. x(t − t₀)는 모든 일이 t₀만큼 늦게 일어나서 그래프가 오른쪽으로 가고, 더하면 왼쪽으로 앞당겨져요. x(at)는 a > 1이면 폭이 1/a로 줄어 빨리 재생한 것과 같아서, 오디오를 빨리 돌리면 음이 높아져요. x(−t)는 시간을 뒤집어요. x(2 − t)처럼 섞인 경우엔 먼저 뒤집어 x(−t)를 만들고 오른쪽으로 2만큼 옮긴다고 보면 헷갈리지 않아요. 합성곱에서 h를 뒤집어 미는 과정이 바로 이 변환이에요.',
      'x(t − 2) delays by 2, x(2t) plays at double speed and x(−t) reverses time; apply combined transformations one step at a time.',
      'Three basic transformations change only the time axis while keeping the shape. x(t − t₀) makes everything happen t₀ later, moving the graph right, while adding t₀ moves it left. x(at) with a > 1 shrinks the width to 1/a, like fast playback, which is why sped-up audio sounds higher. x(−t) reverses time. For a combination like x(2 − t), flip first to get x(−t) and then shift right by 2. Flipping and sliding h in convolution is exactly this transformation.', sTrans()),
    item('sg-sinusoid', '사인파와 복소 지수', 'Sinusoids and complex exponentials',
      '사인파는 진폭, 주파수, 위상 세 숫자로 정해져요. 오일러 공식으로 보면 원 위를 도는 벡터의 그림자이고, 복소 지수로 쓰면 계산이 쉬워져요.',
      'A cos(2πft + φ)에서 A는 진폭, f는 1초에 반복하는 횟수(Hz), φ는 출발 위치를 정하는 위상이고 주기는 T = 1/f예요. 오일러 공식 e^(jθ) = cos θ + j sin θ를 쓰면 사인파는 복소 평면에서 일정한 속도로 도는 벡터 A·e^(j(2πft + φ))의 실수부, 즉 그림자예요. 복소 지수로 쓰면 미분은 j2πf를 곱하는 것, 시간 지연은 위상을 더하는 것이 되어 미분 방정식이 곱셈으로 풀려요. LTI 시스템에 사인파를 넣으면 같은 주파수의 사인파가 크기와 위상만 바뀌어 나오기 때문에, 사인파는 푸리에 해석의 기본 단위예요.',
      'A sinusoid is fixed by amplitude, frequency and phase; by Euler’s formula it is the shadow of a spinning vector, and complex exponentials make the math easy.',
      'In A cos(2πft + φ), A is the amplitude, f the repetitions per second in Hz and φ the phase that sets the starting point, with period T = 1/f. Euler’s formula e^(jθ) = cos θ + j sin θ shows the sinusoid as the real part, or shadow, of a vector A·e^(j(2πft + φ)) circling the complex plane at a steady rate. In complex-exponential form, differentiating multiplies by j2πf and a delay adds phase, so differential equations become multiplication. Feeding a sinusoid into an LTI system yields a sinusoid of the same frequency with only its size and phase changed, which makes sinusoids the basic unit of Fourier analysis.', sSinus()),
    item('sg-energy', '에너지·전력·데시벨', 'Energy, power and decibels',
      '사라지는 신호는 제곱의 합인 에너지로, 계속되는 신호는 평균 전력으로 크기를 재요. 비율은 데시벨로 나타내서 전력 두 배가 +3 dB예요.',
      '짧은 펄스처럼 시간이 지나면 사라지는 신호는 값의 제곱을 모두 더한 에너지 E = Σ|x[n]|²가 유한해요. 사인파처럼 끝없이 이어지는 신호는 에너지가 무한하니 시간당 평균인 전력 P로 비교해요. 전력의 제곱근이 RMS이고, 진폭 A인 사인파의 RMS는 A/√2라서 220 V 교류의 최댓값은 약 311 V예요. 크기 비교에는 데시벨을 써서 전력 비는 10 log₁₀, 진폭 비는 20 log₁₀로 계산해요. 전력이 두 배면 +3 dB, 10배면 +10 dB, 진폭이 10배면 +20 dB예요.',
      'Signals that die out are measured by energy, the sum of squares, and endless ones by average power; ratios go in decibels, where double power is +3 dB.',
      'A signal that dies out, like a short pulse, has finite energy E = Σ|x[n]|², the sum of its squared values. A signal that goes on forever, like a sine, has infinite energy, so it is compared by power P, the average per unit time. The square root of power is the RMS; a sine of amplitude A has RMS A/√2, so 220 V mains peaks at about 311 V. Levels are compared in decibels, using 10 log₁₀ for power ratios and 20 log₁₀ for amplitude ratios. Doubling power is +3 dB, ten times power is +10 dB, and ten times the amplitude is +20 dB.', sEnergy())
  ]),
  sec('sg-lti', 'LTI 시스템', 'LTI systems', '임펄스 응답 하나로 정해지는 시스템', 'Systems defined by one impulse response', '선형성·시불변성·인과성·안정성, 임펄스 응답과 합성곱, 이동 평균 필터, 되먹임이 있는 차분 방정식, 그리고 BIBO 안정성까지 신호 처리의 중심인 LTI 시스템을 봐요.', 'Linearity, time invariance, causality and stability, the impulse response and convolution, the moving-average filter, difference equations with feedback, and BIBO stability: the LTI systems at the heart of signal processing.', [
    item('sg-props', '시스템의 성질', 'System properties',
      '시스템은 입력을 출력으로 바꾸는 규칙이에요. 선형성, 시불변성, 인과성, 안정성 네 가지로 분류하고, 선형이면서 시불변인 LTI 시스템이 중심이에요.',
      '선형 시스템은 입력을 두 배로 하면 출력도 두 배가 되고, 두 입력의 합에는 각 출력의 합이 나와요(중첩). 시불변 시스템은 같은 입력을 언제 넣어도 같은 모양의 출력이 그만큼 늦게 나와요. 인과 시스템은 지금과 과거의 입력만 쓰기 때문에 실시간 처리는 인과여야 하지만, 저장된 데이터는 미래 샘플을 써도 돼요. 유계 입력에 늘 유계 출력을 내면 BIBO 안정이에요. 제곱하는 시스템은 선형이 아니고, 계수가 시간에 따라 바뀌면 시불변이 아니에요. 선형이고 시불변인 LTI 시스템은 임펄스 응답 하나로 완전히 설명돼서 필터 설계의 바탕이 돼요.',
      'A system is a rule turning input into output, classified by linearity, time invariance, causality and stability; linear time-invariant (LTI) systems are central.',
      'A linear system doubles its output when the input doubles and answers a sum of inputs with the sum of their outputs (superposition). A time-invariant system gives the same output shape whenever the input arrives, just delayed accordingly. A causal system uses only present and past input, so real-time processing must be causal, while stored data may use future samples. A system is BIBO stable if every bounded input yields a bounded output. Squaring is not linear, and coefficients that change over time break time invariance. Linear time-invariant (LTI) systems are fully described by one impulse response, which makes them the foundation of filter design.', sProps()),
    item('sg-impulse', '임펄스 응답', 'The impulse response',
      '임펄스 하나를 넣었을 때의 출력 h[n]이 임펄스 응답이에요. 입력을 임펄스들로 쪼개고 각 응답을 옮겨 더하면 어떤 입력의 출력이든 구할 수 있어요.',
      'LTI 시스템에 δ[n]을 넣고 나온 출력을 임펄스 응답 h[n]이라 해요. 예를 들어 h = [1, 0.5, 0.25]인 시스템에 x = [2, 1]을 넣으면, 입력은 2δ[n] + δ[n − 1]이니 선형성에 따라 2h[n]과 h[n − 1]을 따로 구해 더하면 되고, 시불변이라 늦게 들어온 임펄스의 응답은 h를 한 칸 옮긴 거예요. 둘을 더하면 [2, 2, 1, 0.25]가 나와요. 이 과정을 식으로 쓴 게 합성곱 y = x ∗ h예요. 방의 울림은 손뼉 소리 같은 짧은 펄스를 녹음해서 얻은 임펄스 응답으로 재현할 수 있어요.',
      'The output for a single impulse, h[n], is the impulse response; split any input into impulses, shift and add their responses, and you have its output.',
      'Feeding δ[n] into an LTI system yields its impulse response h[n]. For a system with h = [1, 0.5, 0.25] and input x = [2, 1], the input is 2δ[n] + δ[n − 1], so linearity lets us compute 2h[n] and h[n − 1] separately and add them, while time invariance makes the later impulse’s response just h shifted by one. Adding them gives [2, 2, 1, 0.25]. Written as a formula, this is the convolution y = x ∗ h. A room’s reverberation can be reproduced from the impulse response captured by recording a short pulse such as a clap.', sImpulse()),
    item('sg-convolution', '합성곱', 'Convolution',
      '합성곱은 h를 뒤집어 x 위로 밀면서 겹치는 값끼리 곱해 더하는 연산이에요. 길이 M과 N을 합성곱하면 길이 M + N − 1이 나와요.',
      '이산 합성곱 y[n] = Σ x[k] h[n − k]는 h를 뒤집어 x 위에 놓고 한 칸씩 밀면서 겹치는 칸끼리 곱해 더해요. x = [1, 2, 3]과 h = [1, 1]이면 n = 0에서 1, 다음에 1 + 2 = 3, 2 + 3 = 5, 마지막에 3이 나와 [1, 3, 5, 3]이고, 길이는 3 + 2 − 1 = 4예요. 합성곱은 교환·결합 법칙이 성립해서 필터 두 개를 이어 붙인 것은 두 임펄스 응답의 합성곱 하나와 같아요. 다항식 곱셈의 계수 계산도 똑같은 연산이고, 시간 영역의 합성곱은 주파수 영역에서 곱셈이 되어 긴 합성곱은 FFT로 빠르게 계산해요.',
      'Convolution flips h, slides it across x and sums the products where they overlap; convolving lengths M and N gives length M + N − 1.',
      'The discrete convolution y[n] = Σ x[k] h[n − k] flips h, lays it over x and slides it one step at a time, multiplying and summing the overlapping entries. With x = [1, 2, 3] and h = [1, 1], you get 1 at n = 0, then 1 + 2 = 3, 2 + 3 = 5 and finally 3, giving [1, 3, 5, 3] of length 3 + 2 − 1 = 4. Convolution is commutative and associative, so two filters in a row equal a single filter whose impulse response is their convolution. Multiplying polynomials computes coefficients the same way, and because convolution in time is multiplication in frequency, long convolutions run quickly through the FFT.', sConv()),
    item('sg-moving-avg', '이동 평균 필터', 'The moving-average filter',
      '이웃한 샘플 N개의 평균을 내면 잡음이 줄고 느린 변화는 남아요. h = [1/N, …, 1/N]과의 합성곱이고, 저역통과 필터처럼 동작해요.',
      '센서 측정값에는 잡음이 섞이기 마련이라, 이웃한 샘플 5개를 평균 내면 무작위 잡음의 크기가 약 1/√5로 줄어요. 이동 평균은 h = [0.2, 0.2, 0.2, 0.2, 0.2]와의 합성곱이고, 창을 한 칸씩 밀며 평균을 내요. 대가로 창 길이의 절반인 (5 − 1)/2 = 2샘플만큼 출력이 늦어지고, 급격한 변화도 함께 무뎌져요. 주파수로 보면 느린 성분은 통과시키고 빠른 성분은 깎는 저역통과 필터이며, fs/5의 배수 주파수는 완전히 0이 돼요. 구현이 쉬워서 센서 값 평활, 주가 이동 평균선 같은 곳에 널리 써요.',
      'Averaging N neighboring samples reduces noise while keeping slow changes; it is convolution with h = [1/N, …, 1/N] and acts as a low-pass filter.',
      'Sensor readings always carry some noise, and averaging five neighboring samples shrinks random noise to roughly 1/√5 of its size. A moving average is convolution with h = [0.2, 0.2, 0.2, 0.2, 0.2], sliding the window one sample at a time. The price is a delay of half the window, (5 − 1)/2 = 2 samples, and sharp changes get blunted too. In frequency terms it is a low-pass filter that passes slow components and cuts fast ones, with complete nulls at multiples of fs/5. It is easy to implement, so it shows up everywhere from smoothing sensor values to stock-price moving averages.', sMa()),
    item('sg-difference', '차분 방정식과 되먹임', 'Difference equations and feedback',
      'y[n] = a·y[n − 1] + x[n]처럼 이전 출력을 되먹이면 곱셈 하나로 끝없이 이어지는 응답이 나와요. |a| < 1이어야 안정해요.',
      '차분 방정식은 현재 출력을 과거 출력과 입력의 조합으로 정해요. y[n] = a·y[n − 1] + x[n]에 임펄스를 넣으면 h[n] = aⁿ이 나와서, 0이 되지 않고 계속 이어지는 무한 임펄스 응답(IIR)이 돼요. a = 0.5면 매번 절반으로 줄고, a가 음수면 부호가 번갈아 바뀌며 진동하면서 줄어들어요. |a| > 1이면 응답이 커지기만 해서 불안정해지고, 이것이 극점이 단위원 안에 있어야 한다는 조건으로 이어져요. 이동 평균 같은 FIR은 같은 효과를 내려면 계수가 많이 필요하지만, 되먹임을 쓰면 곱셈 몇 번으로 긴 응답을 만들 수 있어요.',
      'Feeding back the previous output, as in y[n] = a·y[n − 1] + x[n], creates an endless response from one multiplication; it is stable only when |a| < 1.',
      'A difference equation defines the current output from past outputs and inputs. Feeding an impulse into y[n] = a·y[n − 1] + x[n] gives h[n] = aⁿ, an infinite impulse response (IIR) that never reaches zero. With a = 0.5 it halves each step, and a negative a alternates in sign, oscillating as it shrinks. If |a| > 1 the response only grows, making the system unstable, which becomes the rule that poles must lie inside the unit circle. An FIR filter like the moving average needs many coefficients for a similar effect, while feedback produces long responses from just a few multiplications.', sDiff()),
    item('sg-stability', 'BIBO 안정성', 'BIBO stability',
      '유계 입력에 늘 유계 출력을 내면 BIBO 안정이에요. LTI 시스템은 임펄스 응답의 절댓값 합 Σ|h[n]|이 유한할 때만 안정해요.',
      '계단처럼 크기가 유한한 입력을 넣었을 때 출력이 끝없이 커지지 않으면 BIBO(bounded-input bounded-output) 안정이에요. 받은 값을 모두 더하는 누적기는 임펄스 응답이 1, 1, 1…이라 계단 입력에 1, 2, 3…으로 끝없이 커져 불안정해요. 조금씩 새는 누적기 y[n] = 0.9·y[n − 1] + x[n]은 h[n] = 0.9ⁿ이고 합이 1/(1 − 0.9) = 10이라 계단 입력에 10으로 수렴해요. 그래서 LTI 시스템이 안정하려면 Σ|h[n]| < ∞여야 하고, FIR 필터는 항이 유한하니 늘 안정해요. 디지털 적분기나 제어기를 설계할 때 이 조건을 먼저 확인해요.',
      'A system is BIBO stable if bounded inputs always give bounded outputs; an LTI system is stable exactly when Σ|h[n]| is finite.',
      'A system is BIBO (bounded-input, bounded-output) stable if a finite input such as a step never drives the output without bound. An accumulator that adds up everything has impulse response 1, 1, 1…, so a step input climbs 1, 2, 3… forever: unstable. A leaky accumulator y[n] = 0.9·y[n − 1] + x[n] has h[n] = 0.9ⁿ, which sums to 1/(1 − 0.9) = 10, so a step input settles at 10. An LTI system is therefore stable exactly when Σ|h[n]| < ∞, and FIR filters, with finitely many terms, are always stable. Designers of digital integrators and controllers check this condition first.', sStable())
  ]),
  sec('sg-fourier', '푸리에 해석', 'Fourier analysis', '신호를 주파수로 보기', 'Seeing signals as frequencies', '푸리에 급수와 깁스 현상, 푸리에 변환과 시간·주파수의 반비례, DFT의 빈, FFT의 나비 연산, 스펙트럼 누설과 창 함수, 그리고 STFT와 스펙트로그램까지 신호를 주파수로 나눠 보는 방법을 봐요.', 'Fourier series and the Gibbs phenomenon, the Fourier transform and the time–frequency trade-off, DFT bins, the FFT butterfly, spectral leakage and windows, and the STFT and spectrograms: ways to break signals into frequencies.', [
    item('sg-fourier-series', '푸리에 급수', 'Fourier series',
      '주기 신호는 기본 주파수의 정수배 사인파들의 합이에요. 사각파는 홀수 고조파 1/k의 합이고, 불연속점에서는 약 9% 튀어나와요.',
      '주기가 T인 신호는 기본 주파수 f₀ = 1/T와 그 정수배 주파수의 사인파를 알맞은 크기로 더해 만들 수 있어요. 사각파에는 홀수 고조파만 있고 k번째 크기는 4/(πk)라서, sin t + sin 3t/3 + sin 5t/5…처럼 항을 더할수록 모서리가 날카로워져요. 항을 아무리 많이 더해도 불연속점 근처에서 약 9% 튀어나오는데, 이를 깁스 현상이라 해요. 각 고조파의 크기를 막대로 늘어놓은 게 스펙트럼이에요. 같은 음을 내도 악기마다 소리가 다른 건 고조파의 비율이 다르기 때문이에요.',
      'Periodic signals are sums of sinusoids at integer multiples of the fundamental; a square wave sums odd harmonics with sizes 1/k and overshoots about 9% at its jumps.',
      'A signal with period T can be built by adding sinusoids at the fundamental f₀ = 1/T and its integer multiples, each with the right size. A square wave contains only odd harmonics, the k-th with size 4/(πk), so adding sin t + sin 3t/3 + sin 5t/5… sharpens its corners term by term. However many terms are added, it overshoots by about 9% near each jump: the Gibbs phenomenon. Plotting each harmonic’s size as a bar gives the spectrum. Instruments playing the same note sound different because their harmonics come in different proportions.', sFseries()),
    item('sg-fourier-transform', '푸리에 변환', 'The Fourier transform',
      '푸리에 변환은 주기가 없는 신호도 주파수 성분으로 나눠요. 짧은 신호일수록 넓은 대역을 차지하고, 합성곱은 주파수 영역의 곱셈이 돼요.',
      '푸리에 변환 X(f) = ∫ x(t) e^(−j2πft) dt는 신호에 각 주파수의 복소 사인파가 얼마나 들어 있는지 재요. 폭 T인 직사각형 펄스는 T·sinc(fT)가 되고, 첫 0점이 ±1/T에 있어 대역폭을 대략 1/T로 봐요. 펄스 폭을 반으로 줄이면 스펙트럼 폭은 두 배가 돼서, 짧은 신호일수록 넓은 대역이 필요해요. 시간 이동은 크기는 그대로 두고 위상만 바꾸고, 시간 영역의 합성곱 x ∗ h는 주파수 영역의 곱 X·H가 돼요. 그래서 필터는 원하는 주파수에서 H를 1, 원치 않는 주파수에서 0으로 만드는 일로 생각할 수 있어요.',
      'The Fourier transform splits even non-periodic signals into frequencies; shorter signals occupy wider bands, and convolution becomes multiplication.',
      'The Fourier transform X(f) = ∫ x(t) e^(−j2πft) dt measures how much of each complex sinusoid a signal contains. A rectangular pulse of width T becomes T·sinc(fT), with first zeros at ±1/T, so its bandwidth is roughly 1/T. Halving the pulse width doubles the spectral width: shorter signals need wider bands. A time shift leaves the magnitude alone and changes only the phase, and the convolution x ∗ h in time becomes the product X·H in frequency. A filter can therefore be thought of as making H equal to 1 at wanted frequencies and 0 at unwanted ones.', sFt()),
    item('sg-dft', 'DFT', 'The DFT',
      'DFT는 N개 샘플을 N개 주파수 빈으로 바꿔요. k번째 빈은 k·fs/N 주파수이고, 실수 신호의 스펙트럼은 좌우 대칭이에요.',
      '이산 푸리에 변환 X[k] = Σ x[n] e^(−j2πkn/N)은 샘플 N개를 k = 0…N − 1의 복소 사인파와 하나씩 곱해 더해서 각 주파수 성분의 크기와 위상을 구해요. 8개 샘플에 코사인이 정확히 2주기 들어 있으면 결과는 k = 2와 k = 6에서만 크기 4예요. 실수 신호라서 k = 6은 −2 주파수의 거울상이고, 그래서 보통 앞의 절반만 봐요. k번째 빈은 k·fs/N 주파수라서 빈 간격은 fs/N이고, 샘플을 더 오래 모을수록 주파수를 더 세밀하게 구분할 수 있어요. 실제 계산은 늘 FFT로 해요.',
      'The DFT turns N samples into N frequency bins, bin k sitting at k·fs/N; a real signal’s spectrum is mirror-symmetric.',
      'The discrete Fourier transform X[k] = Σ x[n] e^(−j2πkn/N) multiplies N samples by complex sinusoids for k = 0…N − 1 and sums, giving the size and phase of each frequency component. When eight samples hold exactly two cycles of a cosine, the result is 4 only at k = 2 and k = 6. Because the signal is real, k = 6 mirrors frequency −2, so usually only the first half is examined. Bin k sits at k·fs/N, so bins are fs/N apart, and collecting samples for longer resolves frequencies more finely. In practice it is always computed with the FFT.', sDft()),
    item('sg-fft', 'FFT', 'The FFT',
      'FFT는 DFT를 짝수·홀수 샘플의 절반 크기 DFT 두 개로 쪼개길 반복해 N²을 N log N으로 줄여요. 나비 연산이 기본 단위예요.',
      'DFT를 정의대로 계산하면 N²번 곱해야 해요. 쿨리-튜키 FFT는 짝수 번째와 홀수 번째 샘플로 나눠 절반 크기 DFT 두 개 E와 O를 구한 뒤, 회전 인자 W = e^(−j2πk/N)를 써서 X[k] = E[k] + W·O[k], X[k + N/2] = E[k] − W·O[k]로 합쳐요. 이 나비 연산을 log₂N 단계 반복하고 단계마다 N/2번 곱하니 전체가 (N/2) log₂N번이에요. N = 1024면 약 100배 빠르고, 입력은 비트를 뒤집은 순서로 놓여요. 오디오 분석, OFDM 통신, 영상 압축, 큰 수의 곱셈까지 FFT 덕분에 실시간으로 가능해졌어요.',
      'The FFT repeatedly splits a DFT into two half-size DFTs over even and odd samples, cutting N² work to N log N; the butterfly is its basic unit.',
      'Computing the DFT by definition takes N² multiplications. The Cooley–Tukey FFT splits the samples into even and odd halves, computes two half-size DFTs E and O, and combines them with the twiddle factor W = e^(−j2πk/N) as X[k] = E[k] + W·O[k] and X[k + N/2] = E[k] − W·O[k]. Repeating this butterfly over log₂ N stages of N/2 multiplications costs (N/2) log₂ N in total. At N = 1024 that is about 100 times faster, with inputs placed in bit-reversed order. Audio analysis, OFDM communications, image compression and even multiplying huge numbers became practical in real time thanks to the FFT.', sFft()),
    item('sg-leakage', '스펙트럼 누설과 창 함수', 'Spectral leakage and windows',
      '정수 주기가 아닌 신호를 DFT하면 에너지가 여러 빈으로 번져요. 해닝 같은 창을 곱하면 누설이 크게 줄지만 봉우리가 넓어져요.',
      'DFT는 N개 샘플이 끝없이 반복된다고 가정해요. 정확히 정수 주기가 들어 있으면 빈 하나에 딱 들어가지만, 4.5주기처럼 빈 사이 주파수면 끝과 처음이 어긋나 불연속이 생기고 에너지가 모든 빈으로 번지는 스펙트럼 누설이 일어나요. 해닝(Hann)이나 해밍 같은 창을 곱해 양 끝을 부드럽게 0으로 줄이면 불연속이 사라져 먼 빈의 누설이 수십 dB 줄어요. 대신 가운데 봉우리가 넓어져 가까운 두 주파수를 구분하는 능력은 떨어져요. 작은 성분을 찾을 땐 블랙먼 같은 창을, 진폭을 정확히 읽을 땐 플랫톱 창을 골라요.',
      'A DFT of a non-integer number of cycles smears energy across bins; windows such as Hann cut the leakage sharply at the cost of a wider peak.',
      'The DFT assumes its N samples repeat forever. An exact whole number of cycles lands in a single bin, but a frequency between bins, like 4.5 cycles, leaves a jump where the ends meet and smears energy across every bin: spectral leakage. Multiplying by a window such as Hann or Hamming tapers the ends smoothly to zero, removing the jump and lowering distant leakage by tens of dB. The trade-off is a wider main peak, making it harder to tell two close frequencies apart. Windows like Blackman help find small components, while a flat-top window reads amplitudes accurately.', sLeak()),
    item('sg-stft', 'STFT와 스펙트로그램', 'The STFT and spectrograms',
      '짧은 창으로 잘라 가며 FFT하면 시간에 따라 주파수가 어떻게 바뀌는지 보여 주는 스펙트로그램이 나와요. 시간과 주파수 해상도는 서로 맞바꿔요.',
      '주파수가 시간에 따라 바뀌는 말소리나 음악은 전체를 한 번에 FFT하면 어떤 주파수가 언제 있었는지 사라져요. 단시간 푸리에 변환(STFT)은 신호를 짧은 창으로 잘라 조금씩 겹쳐 밀면서 창마다 FFT를 하고, 결과를 시간-주파수 그림인 스펙트로그램으로 그려요. 64샘플 같은 짧은 창은 변화 시점을 정확히 잡지만 주파수가 번지고, 512샘플 같은 긴 창은 주파수 선이 가늘지만 시간이 흐려져요. Δt·Δf에는 하한이 있어서 둘을 동시에 무한히 좋게 할 수 없어요. 음성 인식 모델의 입력인 멜 스펙트로그램도 STFT에서 출발해요.',
      'FFTs over short sliding windows form a spectrogram showing how frequency changes over time; time and frequency resolution trade off.',
      'For speech or music whose frequencies change over time, one FFT over the whole signal loses track of when each frequency occurred. The short-time Fourier transform (STFT) cuts the signal into short, overlapping windows, takes an FFT of each, and draws the result as a time–frequency picture called a spectrogram. A short window such as 64 samples pins down when things change but blurs frequency, while a long window such as 512 samples draws thin frequency lines but blurs time. Δt·Δf has a lower bound, so both cannot improve without limit at once. The mel spectrograms fed to speech-recognition models start from the STFT.', sStft())
  ]),
  sec('sg-sampling', '샘플링과 양자화', 'Sampling and quantization', '아날로그와 디지털 사이', 'Between analog and digital', '나이퀴스트-섀넌 샘플링 정리, 에일리어싱과 안티에일리어싱 필터, 0차 유지와 sinc 보간으로 되살리기, 비트 수와 양자화 잡음, 그리고 샘플링 주파수를 바꾸는 리샘플링까지 봐요.', 'The Nyquist–Shannon sampling theorem, aliasing and anti-aliasing filters, reconstruction by zero-order hold and sinc interpolation, bit depth and quantization noise, and resampling between rates.', [
    item('sg-nyquist', '샘플링 정리', 'The sampling theorem',
      '최고 주파수 B의 두 배보다 빠르게 샘플링하면 샘플만으로 원래 신호를 완벽히 되살릴 수 있어요. CD가 44.1 kHz인 이유예요.',
      '나이퀴스트-섀넌 샘플링 정리는 신호에 B Hz 넘는 성분이 없을 때 fs > 2B로 샘플링하면 샘플만으로 원래 연속 신호를 정확히 복원할 수 있다고 말해요. 3 Hz 사인파를 10 Hz로 찍으면 충분하지만, 4 Hz로 찍으면 같은 점을 지나는 1 Hz 파형과 구분이 안 돼요. 주파수로 보면 샘플링은 스펙트럼을 fs 간격으로 복제하는데, fs > 2B여야 복제본끼리 겹치지 않아요. 사람 귀는 약 20 kHz까지 들어서 CD는 44.1 kHz, 전화 음성은 3.4 kHz 대역이라 8 kHz를 써요. 실제로는 필터 여유를 위해 2배보다 조금 더 높게 잡아요.',
      'Sampling faster than twice the highest frequency B lets the samples rebuild the signal perfectly, which is why CDs use 44.1 kHz.',
      'The Nyquist–Shannon sampling theorem says that if a signal has nothing above B Hz, sampling at fs > 2B lets the samples reconstruct the continuous signal exactly. Sampling a 3 Hz sine at 10 Hz is enough, but at 4 Hz the samples also fit a 1 Hz wave. In frequency terms, sampling copies the spectrum every fs, and the copies do not overlap only when fs > 2B. Human hearing reaches about 20 kHz, so CDs use 44.1 kHz, while telephone speech occupies a 3.4 kHz band and uses 8 kHz. In practice the rate is set a little above twice B to leave room for filters.', sNyquist()),
    item('sg-aliasing', '에일리어싱', 'Aliasing',
      '나이퀴스트 주파수 fs/2를 넘는 성분은 그 아래로 접혀 다른 주파수로 둔갑해요. 한 번 섞이면 되돌릴 수 없어 ADC 앞에서 미리 걸러요.',
      '샘플링 주파수의 절반인 나이퀴스트 주파수를 넘는 성분은 fs를 기준으로 거울처럼 접혀 낮은 주파수로 보여요. fs = 100 Hz면 30, 70, 130 Hz 사인파가 샘플 위에서 모두 30 Hz로 똑같이 보여요. 일단 샘플링되면 원래 어느 주파수였는지 알 방법이 없어서, ADC 앞에 fs/2 이상을 깎는 아날로그 안티에일리어싱 필터를 둬요. 영화 속 마차 바퀴가 거꾸로 도는 것, 줄무늬 셔츠가 화면에서 물결치는 모아레, 이미지를 그냥 줄였을 때 생기는 계단 무늬도 같은 현상이에요.',
      'Components above the Nyquist frequency fs/2 fold back and masquerade as lower frequencies; since the mix cannot be undone, they are filtered out before the ADC.',
      'Components above the Nyquist frequency, half the sampling rate, fold back like a mirror around multiples of fs and appear at lower frequencies. With fs = 100 Hz, sines at 30, 70 and 130 Hz all look exactly like 30 Hz in the samples. Once sampled there is no way to tell which frequency it originally was, so an analog anti-aliasing filter that removes everything above fs/2 sits in front of the ADC. Wagon wheels turning backward on film, moiré ripples on striped shirts and jagged patterns in carelessly shrunk images are the same effect.', sAlias()),
    item('sg-reconstruct', '복원과 보간', 'Reconstruction and interpolation',
      'DAC는 샘플 사이를 채워 연속 신호를 만들어요. 계단(0차 유지), 직선, sinc 보간 순으로 원래 신호에 가까워지고, 이상적인 건 sinc예요.',
      '디지털 신호를 소리로 내려면 DAC가 샘플 사이를 채워 연속 전압을 만들어야 해요. 가장 단순한 0차 유지(ZOH)는 다음 샘플까지 값을 그대로 유지하는데, 계단의 모서리가 원래 없던 높은 주파수 성분을 만들어요. 점을 직선으로 이으면 더 가깝지만 꺾인 곳이 남아요. 샘플링 정리를 만족하면 샘플마다 sinc 함수를 놓고 더하는 보간 x(t) = Σ x[n]·sinc(fs·t − n)이 원래 신호를 정확히 되살려요. sinc는 양쪽으로 끝없이 이어지니, 실제 장치는 오버샘플링으로 높인 뒤 계단 출력 뒤에 저역통과 재구성 필터를 둬서 이를 흉내 내요.',
      'A DAC fills the gaps between samples; stairs (zero-order hold), straight lines and sinc interpolation get progressively closer, sinc being ideal.',
      'To play a digital signal as sound, a DAC must fill between samples to make a continuous voltage. The simplest zero-order hold (ZOH) keeps each value until the next sample, and its stair edges add high-frequency content that was never there. Joining the points with straight lines gets closer but leaves corners. When the sampling theorem holds, placing a sinc at every sample and adding them, x(t) = Σ x[n]·sinc(fs·t − n), restores the original exactly. Since the sinc runs forever in both directions, real devices oversample and follow the stair output with a low-pass reconstruction filter to approximate it.', sRecon()),
    item('sg-quantization', '양자화와 비트 수', 'Quantization and bit depth',
      '양자화는 값을 가장 가까운 단계로 반올림해요. 오차는 반 단계 안의 잡음처럼 행동하고, 신호 대 양자화 잡음비는 비트당 약 6 dB씩 좋아져요.',
      'B비트 양자화는 범위를 2^B 단계로 나누고 각 값을 가장 가까운 단계로 반올림해요. 원래 값과의 오차는 늘 ±Δ/2 안에 있고, 신호가 충분히 크고 복잡하면 고르게 퍼진 잡음처럼 행동해요. 꽉 찬 사인파의 신호 대 양자화 잡음비는 SQNR ≈ 6.02·B + 1.76 dB라서 8비트는 약 50 dB, 16비트 CD는 약 98 dB예요. 아주 작은 신호에서는 오차가 신호 모양을 따라가 귀에 거슬리는 왜곡이 되므로, 반 단계 정도의 무작위 잡음(디더)을 섞어 고른 잡음으로 바꿔요. 센서 ADC의 비트 수를 고를 때 필요한 해상도와 잡음 수준을 이 식으로 따져요.',
      'Quantization rounds values to the nearest level; the error acts like noise within half a step, and SQNR improves about 6 dB per bit.',
      'B-bit quantization divides the range into 2^B levels and rounds each value to the nearest one. The error always stays within ±Δ/2 and, for large enough and busy enough signals, behaves like evenly spread noise. A full-scale sine has SQNR ≈ 6.02·B + 1.76 dB, about 50 dB at 8 bits and about 98 dB for 16-bit CD audio. For very small signals the error tracks the waveform and becomes harsh distortion, so random noise of about half a step (dither) is added to turn it into even noise. The same formula guides how many bits a sensor ADC needs for a given resolution and noise floor.', sQuant()),
    item('sg-resample', '리샘플링', 'Resampling',
      '샘플링 주파수를 줄일 땐 먼저 새 나이퀴스트 위를 걸러 낸 뒤 샘플을 버리고, 늘릴 땐 0을 끼우고 보간 필터로 채워요.',
      '샘플을 하나씩 걸러 샘플링 주파수를 절반으로 줄이면 나이퀴스트 주파수도 절반이 되어, 그 위에 있던 성분이 접혀 들어와요. 그래서 먼저 새 나이퀴스트 아래만 남기는 저역통과 필터를 거친 뒤 버리고, scipy의 decimate가 이 둘을 함께 해요. 늘릴 때는 샘플 사이에 0을 끼운 뒤 보간 필터로 채워요. 44.1 kHz 음원을 48 kHz로 바꾸려면 160배 늘리고 147배 줄이는데, resample_poly는 다상(polyphase) 구조로 버려질 샘플은 아예 계산하지 않아 효율적이에요. 오디오 장비, 영상 크기 조정, 센서 데이터 정렬에 모두 쓰여요.',
      'To lower the rate, filter below the new Nyquist and then drop samples; to raise it, insert zeros and fill them with an interpolation filter.',
      'Keeping every other sample halves the sampling rate and the Nyquist frequency, so anything above the new limit folds back in. The cure is to low-pass filter below the new Nyquist first and then drop samples, which SciPy’s decimate does in one call. To raise the rate, insert zeros between samples and fill them with an interpolation filter. Converting 44.1 kHz audio to 48 kHz goes up by 160 and down by 147, and resample_poly uses a polyphase structure that never computes the samples it would discard. Audio gear, image resizing and aligning sensor streams all rely on it.', sResample())
  ]),
  sec('sg-filter', '필터 설계', 'Filter design', '원하는 주파수만 남기기', 'Keeping only the frequencies you want', '주파수 응답과 보드 선도, FIR과 IIR의 차이, 창 함수로 FIR 설계하기, z 변환과 극점·영점, 그리고 60 Hz 잡음을 지우는 노치 필터까지 필터를 읽고 만드는 법을 봐요.', 'Frequency responses and Bode plots, FIR versus IIR, windowed FIR design, the z-transform with its poles and zeros, and a notch filter that removes 60 Hz hum: how to read and build filters.', [
    item('sg-freqresp', '주파수 응답과 보드 선도', 'Frequency response and Bode plots',
      '주파수 응답은 각 주파수가 얼마나 커지고 늦어지는지 보여 줘요. RC 저역통과는 fc = 1/(2πRC)에서 −3 dB이고 그 위로는 디케이드당 −20 dB씩 줄어요.',
      'LTI 시스템에 사인파를 넣으면 같은 주파수의 사인파가 나오는데, 그 크기 비와 위상 차를 주파수마다 그린 게 주파수 응답 H(f)예요. 크기를 dB로, 주파수를 로그 축으로 그린 보드 선도에서 1 kΩ, 1 µF인 RC 저역통과 필터는 차단 주파수 fc = 1/(2πRC) ≈ 159 Hz에서 전력이 절반인 −3 dB가 되고, 그 위로는 주파수가 10배 될 때마다 20 dB씩 떨어지는 직선이 돼요. 위상은 0°에서 −90°로 늦어지며 fc에서 −45°예요. n차 필터는 −20n dB/디케이드로 더 가파르고, 오디오 이퀄라이저는 이 곡선을 직접 그리는 도구예요.',
      'A frequency response shows how much each frequency is scaled and delayed; an RC low-pass is −3 dB at fc = 1/(2πRC) and falls 20 dB per decade above it.',
      'An LTI system turns a sinusoid into a sinusoid of the same frequency, and plotting the magnitude ratio and phase difference at every frequency gives the frequency response H(f). On a Bode plot, with magnitude in dB against log frequency, an RC low-pass with 1 kΩ and 1 µF reaches −3 dB, half power, at the cutoff fc = 1/(2πRC) ≈ 159 Hz, then falls along a straight line of 20 dB for every tenfold increase in frequency. The phase lags from 0° toward −90°, passing −45° at fc. An n-th order filter falls more steeply at 20n dB per decade, and an audio equalizer is a tool for drawing this curve directly.', sBode()),
    item('sg-fir-iir', 'FIR과 IIR', 'FIR vs IIR',
      'FIR은 입력만 가중합해서 늘 안정하고 선형 위상을 낼 수 있어요. IIR은 출력을 되먹여 적은 계수로 날카로운 특성을 내지만 위상이 일그러져요.',
      'FIR(유한 임펄스 응답) 필터는 y[n] = Σ b[k]·x[n − k]처럼 입력만 가중합해요. 되먹임이 없으니 늘 안정하고, 계수를 좌우 대칭으로 두면 모든 주파수가 같은 시간만큼 늦어지는 선형 위상이 돼서 파형 모양이 보존돼요. IIR(무한 임펄스 응답) 필터는 이전 출력도 되먹여서 4차 버터워스처럼 계수 몇 개로 날카로운 차단을 만들지만, 위상이 주파수마다 다르게 늦어지고 극점 위치에 따라 불안정해질 수 있어요. 같은 날카로움이면 FIR은 계수가 수십~수백 개라 계산과 지연이 커요. 파형이 중요하면 FIR, 계산 자원이 빠듯하면 IIR을 고르고, 오프라인이라면 filtfilt로 IIR의 위상 왜곡을 없앨 수 있어요.',
      'FIR filters weight inputs only, so they are always stable and can have linear phase; IIR filters feed back outputs for sharp responses with few coefficients but distort phase.',
      'An FIR (finite impulse response) filter is a weighted sum of inputs only, y[n] = Σ b[k]·x[n − k]. Without feedback it is always stable, and symmetric coefficients give linear phase, delaying every frequency equally so waveforms keep their shape. An IIR (infinite impulse response) filter also feeds back past outputs, achieving a sharp cutoff with a few coefficients, as in a 4th-order Butterworth, but it delays each frequency differently and can go unstable depending on its poles. For the same sharpness an FIR needs tens to hundreds of coefficients, costing computation and delay. Pick FIR when waveform shape matters and IIR when compute is tight; offline, filtfilt removes IIR phase distortion.', sFirIir()),
    item('sg-window-fir', '창 함수 FIR 설계', 'Windowed FIR design',
      '이상적 저역통과의 임펄스 응답인 sinc를 유한하게 자르고 창 함수를 곱하면 실제 FIR 필터가 돼요. 창이 물결을 줄이고 탭 수가 전이 대역을 정해요.',
      '원하는 주파수만 정확히 통과시키는 이상적 저역통과 필터의 임펄스 응답은 양쪽으로 끝없이 이어지는 sinc예요. 가운데 31개만 남기고 자르면 쓸 수 있는 FIR이 되지만, 갑작스러운 절단 때문에 통과대역과 저지대역에 물결이 생기고 저지대역 감쇠도 약 21 dB에 그쳐요. 해밍 창을 곱해 양 끝을 부드럽게 줄이면 물결이 크게 줄고 감쇠가 약 53 dB까지 좋아지는 대신 전이 대역이 넓어져요. 탭 수를 늘리면 전이 대역이 좁아지고, 카이저 창은 원하는 감쇠량을 파라미터로 골라요. scipy의 firwin이 이 과정을 한 번에 해 줘요.',
      'Truncating the ideal low-pass sinc and multiplying by a window yields a practical FIR filter; the window tames ripple and the tap count sets the transition band.',
      'An ideal low-pass that passes exactly the wanted frequencies has a sinc impulse response running forever in both directions. Keeping only the middle 31 samples makes a usable FIR, but the abrupt cut creates ripple in the passband and stopband and limits stopband attenuation to about 21 dB. Multiplying by a Hamming window tapers the ends, greatly reducing the ripple and improving attenuation to about 53 dB, at the cost of a wider transition band. More taps narrow the transition band, and the Kaiser window makes the attenuation a tunable parameter. SciPy’s firwin does all of this in one call.', sWinFir()),
    item('sg-ztransform', 'z 변환과 극점·영점', 'The z-transform, poles and zeros',
      'z 변환은 이산 시스템을 z의 유리 함수로 나타내요. 단위원 위의 값이 주파수 응답이고, 극점 근처는 커지고 영점에서는 사라져요.',
      'z 변환 H(z) = Σ h[n]·z⁻ⁿ은 이산 신호와 시스템을 z의 다항식 비로 바꿔요. 지연 한 칸은 z⁻¹을 곱하는 것이라 차분 방정식이 대수식이 돼요. 단위원 위의 점 z = e^(jω)에서 값을 보면 주파수 응답이고, ω가 0에서 π까지 가면 0에서 fs/2까지예요. H(z) = (1 + z⁻¹)/(1 − 0.9z⁻¹)는 z = 0.9에 극점, z = −1에 영점이 있어서 |H|는 영점까지 거리를 극점까지 거리로 나눈 값에 비례해요. 그래서 극점 가까운 저주파는 커지고 영점인 fs/2는 완전히 사라지는 저역통과가 돼요. 모든 극점이 단위원 안에 있어야 안정해요.',
      'The z-transform writes a discrete system as a rational function of z; its values on the unit circle are the frequency response, boosted near poles and erased at zeros.',
      'The z-transform H(z) = Σ h[n]·z⁻ⁿ turns discrete signals and systems into ratios of polynomials in z. A one-sample delay multiplies by z⁻¹, so difference equations become algebra. Evaluating at points z = e^(jω) on the unit circle gives the frequency response, with ω from 0 to π covering 0 to fs/2. H(z) = (1 + z⁻¹)/(1 − 0.9z⁻¹) has a pole at z = 0.9 and a zero at z = −1, so |H| is proportional to the distance to the zero divided by the distance to the pole. Low frequencies near the pole are boosted and fs/2, at the zero, vanishes entirely: a low-pass. The system is stable only if every pole lies inside the unit circle.', sZt()),
    item('sg-notch', '노치 필터', 'Notch filters',
      '노치 필터는 단위원 위에 영점을, 바로 안쪽에 극점을 둬서 60 Hz 전원 잡음 같은 특정 주파수 하나만 좁고 깊게 지워요.',
      '심전도나 오디오 같은 작은 신호에는 전원선의 60 Hz(지역에 따라 50 Hz) 잡음이 쉽게 섞여요. 스펙트럼으로 보면 신호는 낮은 주파수에 넓게 퍼져 있고 잡음은 60 Hz에 뾰족하게 솟아 있어서, 그 주파수만 지우면 돼요. 노치 필터는 단위원 위 ±60 Hz 자리에 영점을 두어 그 주파수를 0으로 만들고, 같은 각도의 바로 안쪽(반지름 약 0.994)에 극점을 두어 나머지 주파수는 거의 1로 되돌려요. Q가 클수록 노치가 좁아져 신호를 덜 건드려요. scipy의 iirnotch(60, 30, fs=1000)로 설계하고 filtfilt로 앞뒤로 걸러 파형의 시간 위치도 지켜요. 공연장의 하울링 제거기도 같은 원리예요.',
      'A notch filter puts zeros on the unit circle and poles just inside to remove a single frequency, such as 60 Hz hum, narrowly and deeply.',
      'Small signals such as ECGs and audio easily pick up 60 Hz mains hum, or 50 Hz depending on the region. In the spectrum the signal spreads over low frequencies while the hum is a sharp spike at 60 Hz, so only that frequency needs removing. A notch filter places zeros on the unit circle at ±60 Hz to null it and poles at the same angle just inside (radius about 0.994) to restore everything else to nearly 1. A higher Q makes the notch narrower and disturbs the signal less. Design it with SciPy’s iirnotch(60, 30, fs=1000) and run filtfilt forward and back to keep the waveform’s timing. Feedback suppressors at live venues work the same way.', sNotch())
  ]),
  sec('sg-apply', '변환과 응용', 'Transforms and applications', '신호 처리가 쓰이는 곳', 'Where signal processing shows up', '라플라스 변환과 s 평면, AM·FM 변조, 상관으로 지연 찾기, 2D 합성곱 이미지 필터, 그리고 PID 되먹임 제어까지 신호와 시스템이 실제로 쓰이는 곳을 봐요.', 'The Laplace transform and the s-plane, AM and FM modulation, finding delays with correlation, 2D convolution image filters, and PID feedback control: signals and systems at work.', [
    item('sg-laplace', '라플라스 변환과 s 평면', 'The Laplace transform and the s-plane',
      '라플라스 변환은 연속 시간 신호를 e^(st)로 나눠요. s 평면에서 극점이 왼쪽이면 감쇠, 허수축이면 계속 진동, 오른쪽이면 발산해요.',
      '라플라스 변환 X(s) = ∫ x(t)·e^(−st) dt는 푸리에 변환을 s = σ + jω로 넓혀 감쇠하거나 커지는 성분까지 다뤄요. 미분이 s를 곱하는 것이 되어 회로와 기계의 미분 방정식이 s에 대한 대수식으로 풀려요. 시스템의 성격은 극점 위치로 읽어서, 극점이 왼쪽 반평면에 있으면 응답이 진동하며 줄어드는 안정 시스템이고, 허수축 위면 영원히 진동하고, 오른쪽이면 점점 커져 발산해요. 허수부가 클수록 빨리 진동하고 실수부가 왼쪽으로 멀수록 빨리 가라앉아요. 연속 시스템을 샘플링하면 z = e^(sT)로 대응되어 왼쪽 반평면이 단위원 안쪽이 돼요.',
      'The Laplace transform decomposes continuous signals into e^(st); in the s-plane, left-half poles decay, poles on the axis ring forever and right-half poles blow up.',
      'The Laplace transform X(s) = ∫ x(t)·e^(−st) dt extends the Fourier transform to s = σ + jω, covering components that decay or grow. Differentiation becomes multiplication by s, so the differential equations of circuits and mechanics become algebra in s. A system’s character is read from its pole positions: poles in the left half-plane give responses that ring and die away, a stable system; poles on the imaginary axis ring forever; poles on the right grow without bound. A larger imaginary part oscillates faster, and a real part further left settles faster. Sampling a continuous system maps z = e^(sT), sending the left half-plane inside the unit circle.', sLaplace()),
    item('sg-modulation', 'AM과 FM 변조', 'AM and FM modulation',
      '변조는 메시지를 높은 주파수의 반송파에 실어요. AM은 크기를, FM은 주파수를 바꾸고, 곱셈이 스펙트럼을 반송파 주파수로 옮겨요.',
      '소리 같은 낮은 주파수 메시지는 안테나로 바로 보내기 어려워서 높은 주파수의 반송파에 실어 보내요. AM은 (1 + m·x(t))·cos(2πfc·t)처럼 반송파의 크기를 메시지에 따라 바꿔서 포락선이 메시지 모양이 되고, 스펙트럼에는 반송파 fc 양옆에 메시지 대역만큼 떨어진 옆띠가 생겨요. FM은 크기는 그대로 두고 순간 주파수를 메시지에 따라 바꿔서, 크기에 섞이는 잡음에 강해 음질이 좋은 대신 대역을 더 많이 써요. 곱셈이 스펙트럼을 반송파 주파수로 옮기니, 여러 방송이 반송파만 달리해 같은 공간을 나눠 써요. 디지털 통신의 QAM과 Wi-Fi·LTE의 OFDM도 이 원리를 확장한 거예요.',
      'Modulation carries a message on a high-frequency carrier; AM varies the amplitude, FM the frequency, and multiplication shifts the spectrum up to the carrier.',
      'Low-frequency messages such as audio are hard to radiate directly, so they ride on a high-frequency carrier. AM varies the carrier’s amplitude with the message, as in (1 + m·x(t))·cos(2πfc·t), so the envelope traces the message and the spectrum gains sidebands on either side of fc, spaced by the message bandwidth. FM keeps the amplitude constant and varies the instantaneous frequency, shrugging off amplitude noise for better sound at the cost of more bandwidth. Because multiplication shifts the spectrum to the carrier, many stations share the airwaves on different carriers. QAM in digital links and OFDM in Wi-Fi and LTE extend the same idea.', sMod()),
    item('sg-correlation', '상관과 지연 추정', 'Correlation and delay estimation',
      '상관은 알려진 모양을 신호 위로 밀면서 겹쳐 보는 연산이에요. 잡음에 묻힌 신호도 봉우리 위치로 도착 지연을 찾아 거리를 재요.',
      '상호상관 c[k] = Σ x[n + k]·y[n]은 합성곱과 비슷하지만 뒤집지 않고, 한 신호를 밀면서 다른 신호와 얼마나 닮았는지 재요. 레이더는 바커 7칩 부호 같은 알려진 패턴을 쏘고 반사파를 받는데, 받은 신호는 잡음에 묻혀 눈으로는 위치를 알 수 없어요. 보낸 부호를 한 칸씩 밀며 곱해 더하면 정확히 겹치는 지연에서 값이 크게 솟고 잡음은 서로 상쇄돼요. 봉우리 위치가 도착 지연이고, 전파 속도를 곱하면 거리가 돼요. GPS 수신기, 소나, 여러 마이크의 음원 방향 추정, 영상과 음성 동기화가 모두 이 원리이고, 자기상관은 음 높이 같은 주기를 찾는 데 써요.',
      'Correlation slides a known shape across a signal to see where it matches; even in heavy noise, the peak reveals the arrival delay and hence the distance.',
      'Cross-correlation c[k] = Σ x[n + k]·y[n] resembles convolution without the flip, sliding one signal along another to measure how alike they are. A radar transmits a known pattern such as a 7-chip Barker code and listens for echoes, but the received signal is buried in noise and its position cannot be seen by eye. Sliding the code along and summing products produces a tall peak at the exact delay, while the noise averages out. The peak’s position is the arrival delay, and multiplying by the propagation speed gives distance. GPS receivers, sonar, microphone-array direction finding and audio–video sync all work this way, and autocorrelation finds periods such as pitch.', sCorr()),
    item('sg-image', '이미지 필터와 2D 합성곱', 'Image filters and 2D convolution',
      '이미지 필터는 3×3 같은 커널로 하는 2D 합성곱이에요. 평균 커널은 흐리게(저역), 소벨 커널은 경계만(고역) 남기고, CNN은 커널을 학습해요.',
      '이미지는 2차원 신호라서 1D 필터와 똑같은 생각을 픽셀 격자에 적용해요. 3×3 커널을 픽셀마다 겹쳐 놓고 이웃 값과 곱해 더하면 새 픽셀 값이 되는 2D 합성곱이에요. 모든 칸이 1/9인 평균 커널은 이웃을 평균 내어 경계를 흐리게 하는 저역통과이고, 가우시안 블러는 가운데에 무게를 더 줘요. 소벨 커널은 좌우·위아래 밝기 차이를 계산해 경계만 남기는 고역통과예요. 가운데 5, 상하좌우 −1인 샤프닝 커널은 원본에 경계를 더해 또렷하게 해요. 합성곱 신경망(CNN)은 이런 커널 값을 데이터에서 학습하며, 첫 층은 실제로 경계 검출기와 비슷한 커널을 배워요.',
      'Image filters are 2D convolutions with kernels such as 3×3; averaging blurs (low-pass), Sobel keeps edges (high-pass), and CNNs learn their kernels.',
      'An image is a two-dimensional signal, so the ideas behind 1D filters carry over to the pixel grid. Overlaying a 3×3 kernel on each pixel and summing the products with its neighbors gives the new pixel value: a 2D convolution. An averaging kernel of 1/9s blends neighbors and blurs edges, a low-pass, while a Gaussian blur weights the center more. The Sobel kernels measure left-right and up-down brightness differences and keep only edges, a high-pass. A sharpening kernel with 5 in the center and −1 above, below and to the sides adds edges back for crispness. Convolutional neural networks (CNNs) learn such kernel values from data, and their first layer really does learn kernels resembling edge detectors.', sImg()),
    item('sg-feedback', '되먹임과 PID 제어', 'Feedback and PID control',
      '되먹임 제어는 목표와 측정값의 오차로 입력을 계속 고쳐요. PID는 지금 오차(P), 쌓인 오차(I), 오차의 변화(D)를 섞어 빠르고 정확하게 맞춰요.',
      '온도 조절기, 드론 자세 제어, 크루즈 컨트롤은 모두 출력을 측정해 목표와의 오차 e = r − y를 구하고 그에 따라 입력을 고치는 되먹임 루프예요. 비례 제어(P)만 쓰면 오차가 작아질수록 미는 힘도 작아져 목표의 80%처럼 조금 못 미친 채 멈춰요. 적분 항(I)은 남은 오차를 쌓아 끝까지 밀어 정상 상태 오차를 0으로 만들지만, 너무 세면 27%처럼 넘쳤다 출렁여요. 미분 항(D)은 오차가 줄어드는 속도를 보고 미리 제동해 넘침을 2% 정도로 줄여요. 이득이 너무 크면 폐루프 극점이 오른쪽으로 가 불안정해지니, 세 이득의 균형을 맞추는 PID 튜닝이 핵심이에요. 산업용 제어 루프의 대부분이 PID예요.',
      'Feedback control keeps correcting the input by the gap between target and measurement; PID blends the present error, its accumulation and its rate of change.',
      'Thermostats, drone attitude control and cruise control are all feedback loops that measure the output, compute the error e = r − y from the target and adjust the input accordingly. Proportional control (P) alone pushes less as the error shrinks and stalls short of the target, at 80% in this example. The integral term (I) accumulates leftover error and drives the steady-state error to zero, but too much of it overshoots, here by 27%, and rings. The derivative term (D) watches how fast the error falls and brakes early, cutting the overshoot to about 2%. Too much gain pushes closed-loop poles to the right and destabilizes the loop, so balancing the three gains, PID tuning, is the core skill. Most industrial control loops are PID.', sFeedback())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
