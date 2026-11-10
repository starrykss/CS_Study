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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'dlx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono dlx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono dlx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c dlx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono dlx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c dlx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'dlx-s dlx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono dlx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono dlx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono dlx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono dlx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono dlx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'dlx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'dlx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'dlx-xs dlx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono dlx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'dlx-a', g: 'dlx-g', r: 'dlx-r', w: 'dlx-w', m: 'cz-mono', s: 'dlx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'dlx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono dlx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono dlx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'dlx-xs ') + clsOf(c) + (o.w ? ' dlx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.dlx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.dlx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.dlx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.dlx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.dlx-r .in{color:var(--danger);font-weight:800}
.dlx-g .in{color:var(--ok);font-weight:800}
.dlx-a .in{color:var(--accent);font-weight:800}
.dlx-w .in{color:var(--warn);font-weight:800}
.dlx-c .in{font-size:.6em;font-weight:700}
.dlx-c2 .in{font-size:.5em;font-weight:700}
.dlx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.dlx-wr .in{white-space:normal!important}
.dlx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.dlx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Deep learning · helpers (shared with the circuits page pattern) ===== */
const CSSY = '.dlx-sv svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}';
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* plots: data x in [a, b], y in [lo, hi] mapped to a box at (x0, y0) of size w × h */
const PF = (x0, y0, w, h, a, b, lo, hi) => ({ X: x => x0 + (x - a) / (b - a) * w, Y: y => y0 + h - (y - lo) / (hi - lo) * h, x0, y0, w, h, a, b, lo, hi });
const axes = (S, k, P, st, o = {}) => { const yz = P.Y(Math.max(P.lo, Math.min(P.hi, 0))); hl(S, k + 'x', P.x0, P.x0 + P.w, yz, 'ink-3', st, { w: .06, off: o.off }); if (!o.noy) vl(S, k + 'y', P.X(Math.max(P.a, Math.min(P.b, 0))), P.y0, P.y0 + P.h, 'ink-3', st, { w: .06, off: o.off }); };
const ticks = (S, k, P, xs, ys, st, o = {}) => { const yb = o.yb ?? P.Y(Math.max(P.lo, Math.min(P.hi, 0))) + .12; (xs || []).forEach(([v, t], i) => T(S, k + 'x' + i, P.X(v) - .9, yb, t, 'cz-mono cz-tc dlx-tiny', st, { w: 1.8, off: o.off })); (ys || []).forEach(([v, t], i) => T(S, k + 'y' + i, P.x0 - 2.0, P.Y(v) - .3, t, 'cz-mono dlx-tiny', st, { w: 1.8, css: 'text-align:right', off: o.off })); };
/* one SVG path per curve */
const spoly = (S, k, pts, o = {}) => {
  const ok = pts.filter(Boolean); if (ok.length < 2) return;
  const pad = .3, xs = ok.map(p => p[0]), ys = ok.map(p => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, w = Math.max(...xs) + pad - x0, h = Math.max(...ys) + pad - y0;
  let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + r3(p[0] - x0) + ' ' + r3(p[1] - y0); pen = true; });
  S.el(k, { x: x0, y: y0, w, h, cls: 'dlx-sv', html: `<svg viewBox="0 0 ${r3(w)} ${r3(h)}" preserveAspectRatio="none"><path d="${d}" style="fill:none;stroke:${cv(o.color || 'accent')};stroke-width:${o.h || .09};stroke-linejoin:round;stroke-linecap:round${o.dash ? ';stroke-dasharray:.25 .2' : ''}"/></svg>`, s: o.st ? hid() : {} });
  vis(S, k, o.st, o.off);
};
const curve = (S, k, P, f, st, o = {}) => { const a = o.a ?? P.a, b = o.b ?? P.b, n = o.n || 60, pts = []; for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n, v = f(t); pts.push(v === null || Number.isNaN(v) ? null : [P.X(t), P.Y(Math.max(P.lo, Math.min(P.hi, v)))]); } spoly(S, k, pts, Object.assign({}, o, { st })); };
/* schematic symbols as SVG strings in stage coordinates; SV() puts a list of them on stage as one element */
const zp = p => r3(p[0]) + ',' + r3(p[1]);
const zdir = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [dx / L, dy / L, L]; };
const zat = (a, u, d, e = 0) => [a[0] + u[0] * d - u[1] * e, a[1] + u[1] * d + u[0] * e];
const zst = (c, w, x) => `style="fill:none;stroke:${cv(c || 'ink')};stroke-width:${w || .09};stroke-linecap:round;stroke-linejoin:round${x || ''}"`;
const zfil = c => `style="fill:${cv(c || 'ink')};stroke:none"`;
const zW = (pts, c, w, dash) => `<polyline points="${pts.map(zp).join(' ')}" ${zst(c, w, dash ? ';stroke-dasharray:.25 .2' : '')}/>`;
const zR = (a, b, c) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, z = .65, pts = [a, zat(a, u, m - z)]; for (let i = 1; i <= 6; i++) pts.push(zat(a, u, m - z + (i - .5) * 2 * z / 6, i % 2 ? .27 : -.27)); pts.push(zat(a, u, m + z), b); return zW(pts, c); };
const zC = (a, b, c) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, g = .13, p = .5; return zW([a, zat(a, u, m - g)], c) + zW([zat(a, u, m + g), b], c) + zW([zat(a, u, m - g, -p), zat(a, u, m - g, p)], c, .13) + zW([zat(a, u, m + g, -p), zat(a, u, m + g, p)], c, .13); };
const zL = (a, b, c, n = 4) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, r = .2; let d = `M${zp(a)} L${zp(zat(a, u, m - n * r))}`; for (let i = 1; i <= n; i++) d += ` A${r} ${r} 0 0 1 ${zp(zat(a, u, m - n * r + 2 * r * i))}`; d += ` L${zp(b)}`; return `<path d="${d}" ${zst(c)}/>`; };
const zBat = (a, b, c) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, g = .12; return zW([a, zat(a, u, m - g)], c) + zW([zat(a, u, m + g), b], c) + zW([zat(a, u, m - g, -.55), zat(a, u, m - g, .55)], c, .09) + zW([zat(a, u, m + g, -.28), zat(a, u, m + g, .28)], c, .2); };
const zSrc = (a, b, c, ac) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, r = .55, o = zat(a, u, m); let s = zW([a, zat(a, u, m - r)], c) + zW([zat(a, u, m + r), b], c) + `<circle cx="${r3(o[0])}" cy="${r3(o[1])}" r="${r}" ${zst(c)}/>`; if (ac) s += `<path d="M${r3(o[0] - .3)},${r3(o[1])} q.15,-.38 .3,0 t.3,0" ${zst(c, .07)}/>`; else s += zW([zat(a, u, m - .27, -.12), zat(a, u, m - .27, .12)], c, .06) + zW([zat(a, u, m - .39), zat(a, u, m - .15)], c, .06) + zW([zat(a, u, m + .27, -.12), zat(a, u, m + .27, .12)], c, .06); return s; };
const zGnd = (p, c) => zW([p, [p[0], p[1] + .3]], c) + zW([[p[0] - .42, p[1] + .3], [p[0] + .42, p[1] + .3]], c) + zW([[p[0] - .26, p[1] + .46], [p[0] + .26, p[1] + .46]], c) + zW([[p[0] - .1, p[1] + .62], [p[0] + .1, p[1] + .62]], c);
const zA = (a, b, c, w) => { const [ux, uy] = zdir(a, b), h = .32, s = .16, q = [b[0] - ux * h, b[1] - uy * h]; return zW([a, q], c, w || .08) + `<polygon points="${zp(b)} ${zp([q[0] - uy * s, q[1] + ux * s])} ${zp([q[0] + uy * s, q[1] - ux * s])}" ${zfil(c)}/>`; };
const zD = (a, b, c, led) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, h = .3; let s = zW([a, zat(a, u, m - h)], c) + zW([zat(a, u, m + h), b], c) + `<polygon points="${zp(zat(a, u, m - h, -h))} ${zp(zat(a, u, m - h, h))} ${zp(zat(a, u, m + h))}" ${zfil(c)}/>` + zW([zat(a, u, m + h, -h), zat(a, u, m + h, h)], c, .1); if (led) [0, .32].forEach(d => { s += zA(zat(a, u, m - .1 + d, -.42), zat(a, u, m + .25 + d, -.85), c, .06); }); return s; };
const zSw = (a, b, c, on) => { const [ux, uy, L] = zdir(a, b), u = [ux, uy], m = L / 2, g = .5, p1 = zat(a, u, m - g), p2 = zat(a, u, m + g); return zW([a, p1], c) + zW([p2, b], c) + zW([p1, on ? p2 : zat(a, u, m + g * .8, -.62)], c, .1) + `<circle cx="${r3(p1[0])}" cy="${r3(p1[1])}" r=".09" ${zfil(c)}/><circle cx="${r3(p2[0])}" cy="${r3(p2[1])}" r=".09" ${zfil(c)}/>`; };
const zJ = (p, c) => `<circle cx="${r3(p[0])}" cy="${r3(p[1])}" r=".13" ${zfil(c)}/>`;
const zT = (p, c) => `<circle cx="${r3(p[0])}" cy="${r3(p[1])}" r=".16" style="fill:var(--ui);stroke:${cv(c || 'ink')};stroke-width:.07"/>`;
const zO = (p, r, c, w) => `<circle cx="${r3(p[0])}" cy="${r3(p[1])}" r="${r}" ${zst(c, w)}/>`;
/* op-amp: − input at (x, y − .6), + input at (x, y + .6), output at (x + 2.4, y) */
const zOp = (x, y, c, flip) => { const s = flip ? -1 : 1; return `<polygon points="${zp([x, y - 1.2])} ${zp([x, y + 1.2])} ${zp([x + 2.4, y])}" ${zst(c, .09)}/>` + zW([[x + .22, y - .6 * s], [x + .5, y - .6 * s]], c, .06) + zW([[x + .22, y + .6 * s], [x + .5, y + .6 * s]], c, .06) + zW([[x + .36, y + .6 * s - .14], [x + .36, y + .6 * s + .14]], c, .06); };
/* npn: base at (x, y), collector up at (x + 1.1, y − 1), emitter down at (x + 1.1, y + 1) */
const zNpn = (x, y, c) => zW([[x, y], [x + .45, y]], c) + zW([[x + .45, y - .5], [x + .45, y + .5]], c, .13) + zW([[x + .45, y - .22], [x + 1.1, y - .65], [x + 1.1, y - 1]], c) + zW([[x + .45, y + .22], [x + 1.1, y + .65], [x + 1.1, y + 1]], c) + zA([x + .6, y + .32], [x + .98, y + .57], c, .06) + zO([x + .72, y], .82, c, .06);
/* n-channel MOSFET: gate at (x, y), drain at (x + 1.2, y − 1), source at (x + 1.2, y + 1) */
const zNmos = (x, y, c) => zW([[x, y], [x + .4, y], [x + .4, y - .45], [x + .4, y + .45]], c) + zW([[x + .62, y - .5], [x + .62, y - .22]], c, .11) + zW([[x + .62, y - .12], [x + .62, y + .12]], c, .11) + zW([[x + .62, y + .22], [x + .62, y + .5]], c, .11) + zW([[x + .62, y - .36], [x + 1.2, y - .36], [x + 1.2, y - 1]], c) + zW([[x + .62, y + .36], [x + 1.2, y + .36], [x + 1.2, y + 1]], c) + zW([[x + 1.2, y + .36], [x + 1.2, y]], c) + zA([x + 1.2, y], [x + .66, y], c, .06);
const lblR = (S, k, xr, y, t, c, st, o = {}) => lbl(S, k, xr - 5.4, y, t, c, st, Object.assign({}, o, { w: 5.4, css: 'text-align:right' }));
const SV = (S, k, parts, st, o = {}) => { const [x, y, w, h] = o.box || [18.2, 0, 13.8, 15]; S.el(k, { x, y, w, h, cls: 'dlx-sv', html: `<svg viewBox="${x} ${y} ${w} ${h}">${[].concat(parts).join('')}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
/* value grid as one SVG: M is rows × cols of 0..1, drawn with tint of color */
const GR = (S, k, x0, y0, cs, M, color, st, o = {}) => { const R = M.length, Cn = M[0].length; let r = ''; M.forEach((row, i) => row.forEach((v, j) => { const c = typeof color === 'function' ? color(v, i, j) : color; r += `<rect x="${r3(j * cs)}" y="${r3(i * cs)}" width="${r3(cs - (o.gap ?? .04))}" height="${r3(cs - (o.gap ?? .04))}" style="fill:${tint(c, Math.round(6 + 80 * Math.max(0, Math.min(1, Math.abs(v)))))}"/>`; })); S.el(k, { x: x0, y: y0, w: Cn * cs, h: R * cs, cls: 'dlx-sv', html: `<svg viewBox="0 0 ${r3(Cn * cs)} ${r3(R * cs)}">${r}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const nb = (S, k, x, y, w, h, label, color, st, o = {}) => box2(S, k, x, y, w, h, label, color, st, Object.assign({ pct: 22 }, o));
const gauss1 = (m, s) => x => Math.exp(-Math.pow((x - m) / s, 2) / 2);
/* ===== Deep learning · 1. foundations ===== */
function sTensor() {
  const cols = [...Array(4)].map((_, i) => [...Array(6)].map((_, j) => .25 + .1 * ((i * 3 + j * 5) % 6)));
  return CW('dl-tensor', {
    code: ['x = torch.randn(64, 1, 28, 28)  # N, C, H, W', 'x.flatten(1).shape              # [64, 784]', 'W = torch.randn(784, 128)', 'h = x.flatten(1) @ W            # [64, 128]', ['h = h + torch.zeros(128)        # 브로드캐스트', 'h = h + torch.zeros(128)        # broadcast']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      [3, 2, 1, 0].forEach(i => rect(S, 'im' + i, 20.0 + i * .45, .8 + i * .45, 3.4, 3.4, 'accent', 10 + i * 6, 1, { r: .15, css: 'border:.06em solid var(--accent)' }));
      lbl(S, 'imn', 25.4, 1.6, ['N = 64장', 'N = 64 images'], 'a', 1); lbl(S, 'imc', 25.4, 2.5, ['각각 1 × 28 × 28', 'each 1 × 28 × 28'], 'm', 1);
      lbl(S, 'imh', 18.7, 3.0, 'H', 'm', 1); lbl(S, 'imw', 21.6, 5.15, 'W', 'm', 1);
      rect(S, 'flat', 19.2, 6.3, 12.0, 1.4, 'warn', 25, 2, { r: .15 }); lbl(S, 'flatl', 19.5, 6.55, ['[64, 784]: 한 장을 한 줄로 펴기', '[64, 784]: each image as one row'], 'm w', 2);
      rect(S, 'ma', 19.2, 9.4, 4.8, 2.0, 'warn', 25, 3, { r: .15 }); rect(S, 'mb', 25.0, 8.6, 2.0, 3.6, 'ok', 25, 3, { r: .15 }); rect(S, 'mc', 28.2, 9.4, 2.4, 2.0, 'accent', 25, 3, { r: .15 });
      T(S, 'mal', 19.2, 10.05, '64×784', 'cz-mono cz-tc dlx-xs', 3, { w: 4.8 }); T(S, 'mbl', 24.6, 10.05, '784×128', 'cz-mono cz-tc dlx-tiny', 3, { w: 2.8 }); T(S, 'mcl', 28.2, 10.05, '64×128', 'cz-mono cz-tc dlx-tiny', 3, { w: 2.4 });
      T(S, 'dot', 24.0, 9.85, '·', 'cz-tc dlx-s', 3, { w: 1 }); T(S, 'eq', 27.1, 9.85, '=', 'cz-tc dlx-s', 3, { w: 1 });
      lbl(S, 'inner', 19.2, 12.6, ['안쪽 차원 784가 같아야 곱할 수 있어요', 'the inner 784s must match'], 'g', 3);
      GR(S, 'hm', 2.0, 8.6, .9, cols, 'accent', 4); lbl(S, 'hml', 2.0, 7.6, 'h [64, 128]', 'm a', 4);
      GR(S, 'bb', 9.6, 8.6, .9, [cols[0].map(() => .9)], 'warn', 4); lbl(S, 'bbl', 9.6, 7.6, 'b [128]', 'm w', 4);
      GR(S, 'bc', 9.6, 9.5, .9, [0, 1, 2].map(() => cols[0].map(() => .45)), 'warn', 4, { gap: .2 }); lbl(S, 'bcl', 9.6, 12.4, ['모든 행에 복사된 것처럼', 'as if copied to every row'], 'w', 4);
    },
    notes: [['딥러닝의 데이터는 텐서, 곧 여러 축을 가진 배열이에요 · 이미지 배치는 [개수 N, 채널 C, 높이 H, 너비 W] 순서가 흔해요', 'deep learning data are tensors, arrays with several axes; image batches are commonly [count N, channels C, height H, width W]'], ['완전 연결 층에 넣으려면 한 장을 한 줄로 펴요 · 1 × 28 × 28 = 784라서 [64, 784]가 돼요', 'feeding a fully connected layer means flattening each image into a row: 1 × 28 × 28 = 784, giving [64, 784]'], ['행렬 곱은 안쪽 차원이 맞아야 해요 · [64, 784] @ [784, 128] = [64, 128]이고, 784개의 입력이 128개의 특징으로 바뀌어요', 'matrix multiplication needs matching inner dimensions: [64, 784] @ [784, 128] = [64, 128], turning 784 inputs into 128 features'], ['편향 b [128]은 64개 행 모두에 더해져요 · 크기가 1이거나 없는 축을 늘려 맞추는 브로드캐스팅이에요', 'the bias b [128] is added to all 64 rows, broadcasting by stretching axes that are missing or of size 1']],
    fin: [['텐서 모양(shape)을 따라가는 게 딥러닝 코드 디버깅의 절반이에요', 'tracking tensor shapes is half of debugging deep-learning code', 'dlx-xs dlx-a'], ['PyTorch는 NCHW, TensorFlow는 기본 NHWC예요', 'PyTorch uses NCHW; TensorFlow defaults to NHWC'], ['GPU는 이런 큰 행렬 곱을 병렬로 빠르게 해요', 'GPUs run these large matrix products in parallel']],
    caps: [['텐서', 'Tensors'], ['펴기', 'Flattening'], ['행렬 곱', 'Matrix multiply'], ['브로드캐스팅', 'Broadcasting'], ['텐서와 모양', 'Tensors and shapes']]
  });
}

function sAutograd() {
  const N = { w: [19.0, .9], x: [19.0, 3.3], mul: [21.9, 2.1], b: [21.9, 5.0], add: [24.8, 3.0], sq: [27.5, 3.0], y: [29.9, 3.0] };
  const ctr = k => [N[k][0] + .65, N[k][1] + .55];
  const E = [['w', 'mul'], ['x', 'mul'], ['mul', 'add'], ['b', 'add'], ['add', 'sq'], ['sq', 'y']];
  return CW('dl-autograd', {
    code: ['w = torch.tensor(2.0, requires_grad=True)', 'x, b = 3.0, 1.0', ['y = (w * x + b) ** 2  # z = 7, y = 49', 'y = (w * x + b) ** 2  # z = 7, y = 49'], 'y.backward()', ['w.grad                # 2·z·x = 42', 'w.grad                # 2·z·x = 42']],
    hl: [[0, 2], [2, 1, 'accent'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      [['w', 'w', 'warn'], ['x', 'x', 'ink'], ['mul', '×', 'accent'], ['b', 'b', 'ink'], ['add', '+', 'accent'], ['sq', '²', 'accent'], ['y', 'y', 'ok']].forEach(([k, t, c]) => chip(S, 'n' + k, N[k][0], N[k][1], 1.3, t, c, 1));
      SV(S, 'ed', E.map(([a, b]) => zA([ctr(a)[0] + .7, ctr(a)[1]], [ctr(b)[0] - .72, ctr(b)[1]], 'ink-2', .06)), 1);
      [['f1', 22.6, 1.35, 'wx = 6'], ['f2', 25.4, 2.1, 'z = 7'], ['f3', 28.0, 2.1, '49']].forEach(([k, x, y, t]) => lbl(S, k, x, y, t, 'm a', 2));
      [['g1', 28.15, 4.2, '1'], ['g2', 26.1, 3.75, '14'], ['g3', 22.6, 4.35, '14'], ['g4', 19.1, 2.1, '42'], ['g5', 19.1, 4.55, '28'], ['g6', 22.0, 6.2, '14']].forEach(([k, x, y, t]) => lbl(S, k, x, y, t, 'm r', 3));
      lbl(S, 'gl', 19.0, 7.0, ['빨강: ∂y/∂(각 값) · 출력에서 거꾸로 전파', 'red: ∂y/∂(each value), flowing back from the output'], 'r', 3, { w: 12.4 });
      F(S, 'ch', 1, 7.3, '∂y/∂w = ∂y/∂z · ∂z/∂w = 2z · x = 14 × 3 = 42', 'g', 4);
      lbl(S, 'chn', 1, 8.6, ['각 노드는 자기 국소 기울기만 알면 돼요: 받은 기울기 × 국소 기울기', 'each node only needs its local gradient: incoming gradient × local gradient'], '', 4, { w: 16.2 });
      lbl(S, 'tape', 1, 10.3, ['PyTorch는 순전파 때 연산을 기록해 두었다가 backward()에서 거꾸로 따라가요', 'PyTorch records operations during the forward pass and replays them backward in backward()'], 'a', 4, { w: 16.2 });
    },
    notes: [['딥러닝 프레임워크는 계산을 노드와 간선의 그래프로 기록해요 · y = (w·x + b)²는 곱셈, 덧셈, 제곱 노드로 이어져요', 'frameworks record a computation as a graph of nodes and edges: y = (w·x + b)² chains a multiply, an add and a square'], ['순전파는 앞에서부터 값을 계산해요 · w = 2, x = 3, b = 1이면 6, 7, 49가 차례로 나와요', 'the forward pass computes values front to back: with w = 2, x = 3 and b = 1 it produces 6, 7 and 49'], ['역전파는 출력의 기울기 1에서 시작해 거꾸로 가며 연쇄 법칙으로 곱해요 · 제곱 노드는 2z = 14를 곱하고, 곱셈 노드는 상대 입력을 곱해 ∂y/∂w = 42, ∂y/∂x = 28이 돼요', 'the backward pass starts from gradient 1 at the output and multiplies by the chain rule going back: the square contributes 2z = 14, and the multiply contributes the other input, giving ∂y/∂w = 42 and ∂y/∂x = 28'], ['노드마다 자기 국소 기울기만 알면 되니 수백만 개의 파라미터도 한 번의 역전파로 기울기를 얻어요 · 이것이 자동 미분(autograd)이에요', 'since each node needs only its local gradient, one backward pass yields gradients for millions of parameters: automatic differentiation (autograd)']],
    fin: [['자동 미분: 순전파에서 그래프를 기록하고, 역전파에서 연쇄 법칙으로 기울기를 모아요', 'autograd records the graph forward and gathers gradients backward with the chain rule', 'dlx-xs dlx-a'], ['기울기는 누적되니 매 스텝 zero_grad()로 지워요', 'gradients accumulate, so clear them each step with zero_grad()'], ['torch.no_grad() 안에서는 기록하지 않아 추론이 빨라요', 'inside torch.no_grad() nothing is recorded, making inference faster']],
    caps: [['계산 그래프', 'The computation graph'], ['순전파', 'The forward pass'], ['역전파', 'The backward pass'], ['연쇄 법칙', 'The chain rule'], ['계산 그래프와 자동 미분', 'Computation graphs and autograd']]
  });
}

function sLoss() {
  const lg = [2.0, 1.0, .1], pr = [.659, .242, .099], P = PF(21.0, 9.0, 9.8, 3.6, .02, 1, 0, 4.2), G = PF(3.0, 9.0, 12.0, 4.0, -.5, 2.5, -.45, .35);
  return CW('dl-loss', {
    code: ['logits = torch.tensor([2.0, 1.0, 0.1])', 'p = logits.softmax(-1)  # [0.66, 0.24, 0.10]', ['loss = -p[0].log()      # 0.42 (정답 0번)', 'loss = -p[0].log()      # 0.42 (class 0)'], ['# 정답이 2번이면 −ln 0.10 = 2.32', '# true class 2: −ln 0.10 = 2.32'], ['# 기울기 = p − 정답(one-hot)', '# gradient = p − one-hot target']],
    hl: [[0, 1], [1, 1, 'accent'], [2, 2, 'ok'], [4, 1, 'warn']],
    draw: (S) => {
      lbl(S, 'lt', 19.0, .3, 'logits', 'm', 1);
      lg.forEach((v, i) => { rect(S, 'lb' + i, 20.4, .9 + i * .95, v * 3.4, .7, 'ink-3', 45, 1, { r: .1 }); lbl(S, 'lv' + i, 20.4 + v * 3.4 + .2, .95 + i * .95, String(v), 'm', 1); T(S, 'li' + i, 19.0, .95 + i * .95, String(i), 'cz-mono dlx-xs', 1, { w: 1 }); });
      lbl(S, 'pt', 19.0, 4.0, ['softmax 확률 (합 = 1)', 'softmax probabilities (sum = 1)'], 'm a', 2);
      pr.forEach((v, i) => { rect(S, 'pb' + i, 20.4, 4.6 + i * .95, v * 10, .7, i ? 'accent' : 'ok', 55, 2, { r: .1 }); lbl(S, 'pv' + i, 20.4 + v * 10 + .2, 4.65 + i * .95, v.toFixed(2), 'm', 2); T(S, 'pi' + i, 19.0, 4.65 + i * .95, String(i), 'cz-mono dlx-xs', 2, { w: 1 }); });
      axes(S, 'ax', P, 3); curve(S, 'nl', P, p => -Math.log(p), 3, { color: 'warn', n: 120 });
      ticks(S, 'tk', P, [[.1, '0.1'], [.66, '0.66'], [1, '1']], [[2.32, '2.32'], [.42, '0.42']], 3);
      pt(S, 'g', P.X(.659), P.Y(.417), 3, C.okf, .17); pt(S, 'b', P.X(.099), P.Y(2.32), 3, C.badf, .17);
      lbl(S, 'nll', 19.4, 8.0, ['손실 = −ln(정답 확률)', 'loss = −ln(true-class probability)'], 'w', 3, { w: 12.0 });
      axes(S, 'gax', G, 4, { noy: 1 }); [-.341, .242, .099].forEach((v, i) => { const y0 = G.Y(0), y1 = G.Y(v); rect(S, 'gb' + i, G.X(i) - .6, Math.min(y0, y1), 1.2, Math.abs(y1 - y0), v < 0 ? 'ok' : 'danger', 55, 4, { r: .08 }); T(S, 'gv' + i, G.X(i) - 1.0, v < 0 ? y1 + .1 : y1 - .6, (v > 0 ? '+' : '') + v.toFixed(2), 'cz-mono cz-tc dlx-tiny', 4, { w: 2.0 }); });
      lbl(S, 'gl', 1, 7.4, ['∂loss/∂logits = p − onehot: 정답은 올리고 나머지는 내려요', '∂loss/∂logits = p − onehot: push the answer up, the rest down'], 'w', 4, { w: 16.2 });
    },
    notes: [['분류 모델의 마지막 층은 클래스마다 점수(logit)를 내요 · 크기에 제한이 없는 실수예요', 'a classifier’s last layer outputs a score (logit) per class, an unbounded real number'], ['softmax는 eˣ로 키운 뒤 합으로 나눠 확률로 바꿔요 · [2.0, 1.0, 0.1]은 [0.66, 0.24, 0.10]이 돼요', 'softmax exponentiates and normalizes the scores into probabilities: [2.0, 1.0, 0.1] becomes [0.66, 0.24, 0.10]'], ['교차 엔트로피 손실은 정답 클래스 확률의 −ln이에요 · 정답에 0.66을 주면 0.42, 0.10만 주면 2.32로 크게 벌을 받아요', 'cross-entropy loss is −ln of the true class’s probability: 0.66 on the answer costs 0.42, while only 0.10 costs 2.32'], ['softmax와 교차 엔트로피를 합치면 logit의 기울기가 p − onehot으로 아주 간단해요 · 회귀에는 평균 제곱 오차(MSE)를 써요', 'combined, softmax and cross-entropy give the logit gradient a simple form, p − onehot; regression uses mean squared error (MSE) instead']],
    fin: [['분류: softmax + 교차 엔트로피 · 회귀: MSE', 'classification: softmax + cross-entropy; regression: MSE', 'dlx-xs dlx-a'], ['F.cross_entropy는 logit을 받아 softmax까지 안에서 처리해요', 'F.cross_entropy takes raw logits and applies softmax internally'], ['확률 0에 가까우면 손실이 무한대로 커져요', 'the loss grows without bound as the probability nears zero']],
    caps: [['logit', 'Logits'], ['softmax', 'Softmax'], ['교차 엔트로피', 'Cross-entropy'], ['기울기', 'The gradient'], ['손실 함수', 'Loss functions']]
  });
}

function sInit() {
  const P = PF(3.0, 7.9, 14.0, 5.3, 0, 10, -8, 12), hb = (k, x, s, c, st, lab) => { const Q = PF(x, 1.2, 3.6, 2.6, -3, 3, 0, 1.1); hl(S0, k + 'a', Q.x0, Q.x0 + Q.w, Q.Y(0), 'ink-3', st, { w: .05 }); curve(S0, k, Q, gauss1(0, s), st, { color: c, n: 80 }); lbl(S0, k + 'l', x, 4.0, lab, c[0] === 'd' ? 'r' : c[0] === 'w' ? 'w' : 'g', st, { w: 3.8 }); };
  let S0;
  return CW('dl-init', {
    code: [['fan_in = 512                      # 10층', 'fan_in = 512                      # 10 layers'], ['w = torch.randn(512, 512) * 0.01  # 너무 작음', 'w = torch.randn(512, 512) * 0.01  # too small'], ['w = torch.randn(512, 512) * 1.0   # 너무 큼', 'w = torch.randn(512, 512) * 1.0   # too large'], 'nn.init.kaiming_normal_(w)        # He', ['# 층마다 분산 × n·σ²/2 → 1로 맞춰요', '# per layer variance × n·σ²/2 → keep it 1']],
    hl: [[1, 1, 'danger'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      axes(S, 'ax', P, 1); ticks(S, 'tk', P, [[5, '5'], [10, ['10층', 'layer 10']]], [[-8, '1e-8'], [0, '1'], [12, '1e12']], 1);
      lbl(S, 'yl', 1, 6.9, ['활성값 표준편차 (로그)', 'activation std (log)'], 'm', 1);
      curve(S, 'small', P, l => -.796 * l, 1, { color: 'danger', n: 10 }); hb('h1', 19.2, .08, 'danger', 1, ['σ = 0.01: 0으로 사라짐', 'σ = 0.01: vanishes']);
      curve(S, 'big', P, l => 1.204 * l, 2, { color: 'warn', n: 10 }); hb('h2', 23.4, 2.6, 'warn', 2, ['σ = 1: 폭발', 'σ = 1: explodes']);
      curve(S, 'he', P, () => 0, 3, { color: 'ok', n: 10, h: .12 }); hb('h3', 27.6, .9, 'ok', 3, ['He: 유지', 'He: preserved']);
      lbl(S, 'ttl', 19.2, .4, ['10층 뒤 활성값 분포', 'activations after 10 layers'], 'm', 1);
      lines(S, 'rule', 19.2, 6.4, [[['Xavier(tanh): σ = √(1/n)', 'Xavier (tanh): σ = √(1/n)'], 'f a'], [['He(ReLU): σ = √(2/n)', 'He (ReLU): σ = √(2/n)'], 'f a'], [['PyTorch nn.Linear 기본값도 fan_in 기반이에요', 'PyTorch’s nn.Linear default is fan_in based too'], '']], 4, 0, { lh: 1.3, w: 12.4 });
    },
    notes: [['층을 지날 때마다 활성값의 분산은 입력 수 n과 가중치 분산 σ²에 비례해 바뀌어요 · ReLU에서는 n·σ²/2배예요', 'each layer multiplies the activation variance by an amount set by fan-in n and weight variance σ²: n·σ²/2 for ReLU'], ['σ = 0.01이면 층마다 표준편차가 0.16배로 줄어 10층 뒤 10⁻⁸이 돼요 · 신호도 기울기도 사라져 학습이 안 돼요', 'with σ = 0.01 the std shrinks 0.16 times per layer to 10⁻⁸ after ten layers, and both signals and gradients vanish'], ['σ = 1이면 층마다 16배가 되어 10층 뒤 10¹²로 폭발해요 · tanh라면 모두 ±1에 포화돼요', 'with σ = 1 it grows 16 times per layer to 10¹² after ten layers, and tanh units would all saturate at ±1'], ['He 초기화는 σ = √(2/n)으로 n·σ²/2 = 1을 맞춰 깊어도 크기가 유지돼요 · tanh에는 Xavier √(1/n)을 써요', 'He initialization sets σ = √(2/n) so n·σ²/2 = 1 and the scale survives depth; tanh networks use Xavier, √(1/n)']],
    fin: [['좋은 초기화: 층을 지나도 활성값과 기울기의 크기가 유지되게', 'good initialization keeps activation and gradient scale steady through the layers', 'dlx-xs dlx-a'], ['배치 정규화와 잔차 연결이 생긴 뒤로 덜 민감해졌어요', 'batch norm and residual connections made networks less sensitive to it'], ['편향은 보통 0으로 시작해요', 'biases usually start at zero']],
    caps: [['너무 작게', 'Too small'], ['너무 크게', 'Too large'], ['He 초기화', 'He initialization'], ['규칙', 'The rules'], ['가중치 초기화', 'Weight initialization']]
  });
}

function sBatch() {
  const P = PF(3.0, 8.6, 14.0, 4.8, 0, 100, 0, 2.6), base = t => .3 + 2.0 * Math.exp(-t / 22);
  const nz = (t, a) => a * (Math.sin(t * 2.3) * .6 + Math.sin(t * 5.1 + 1) * .4) * (base(t) - .15);
  return CW('dl-batch', {
    code: ['dl = DataLoader(ds, 64, shuffle=True)', ['len(dl)  # 60000/64 → 938 스텝', 'len(dl)  # 60000/64 → 938 steps'], 'for x, y in dl:', '    loss = F.cross_entropy(model(x), y)', '    loss.backward()', '    opt.step(); opt.zero_grad()'],
    hl: [[0, 2], [2, 4, 'danger'], [2, 4, 'ok'], [0, 1, 'accent']],
    draw: (S) => {
      rect(S, 'ds', 19.2, 1.0, 12.0, 1.0, 'ink', 10, 1, { r: .15 }); lbl(S, 'dsl', 19.2, .25, ['데이터 60,000개', '60,000 examples'], 'm', 1);
      [...Array(12)].forEach((_, i) => vl(S, 'cut' + i, 19.2 + (i + 1) * 12 / 13, 1.0, 2.0, 'accent', 1, { w: .05 }));
      lbl(S, 'mb', 19.2, 2.3, ['64개씩 잘라 938개의 미니배치 → 1 에폭', 'cut into 938 minibatches of 64 → one epoch'], 'a', 1, { w: 12.4 });
      lbl(S, 'sh', 19.2, 3.6, ['에폭마다 섞어서 순서를 바꿔요', 'reshuffled every epoch'], '', 1);
      axes(S, 'ax', P, 1); lbl(S, 'yl', 1, 7.95, ['손실', 'loss'], 'm', 1); ticks(S, 'tk', P, [[100, ['스텝', 'steps']]], [], 1);
      curve(S, 'b1', P, t => base(t) + nz(t, 1.1), 2, { color: 'danger', n: 300, h: .06 });
      lbl(S, 'b1l', 19.2, 6.0, ['배치 1: 기울기가 시끄러워 갈팡질팡', 'batch 1: noisy gradients, zigzag progress'], 'r', 2, { w: 12.4 });
      curve(S, 'b64', P, t => base(t) + nz(t, .14), 3, { color: 'ok', n: 300, h: .1 });
      lbl(S, 'b64l', 19.2, 7.4, ['배치 64: 잡음 1/√64 = 1/8 · GPU 병렬로 빠름', 'batch 64: noise ÷ √64 = 1/8, parallel on a GPU'], 'g', 3, { w: 12.4 });
      lbl(S, 'full', 19.2, 8.8, ['전체 배치: 매끄럽지만 한 스텝에 6만 개를 봐야 해요', 'full batch: smooth, but each step reads all 60,000'], 'a', 4, { w: 12.4 });
      lbl(S, 'tip', 19.2, 10.2, ['보통 32–512 · 배치를 키우면 학습률도 키워요', 'usually 32–512; scale the learning rate with the batch'], 'w', 4, { w: 12.4 });
    },
    notes: [['데이터 전체로 기울기를 구하면 정확하지만 한 스텝이 너무 오래 걸려요 · 그래서 작은 묶음(미니배치)마다 갱신해요', 'computing the gradient on all the data is exact but each step takes too long, so updates are made per small batch (minibatch)'], ['배치가 1이면 예제 하나의 기울기라 방향이 들쭉날쭉해요 · 손실이 크게 흔들리며 내려가요', 'with batch size 1 each gradient comes from a single example, so the direction jumps around and the loss falls while shaking hard'], ['배치 64면 기울기 잡음이 1/√64 = 1/8로 줄고, GPU가 64개를 한꺼번에 계산해 효율도 좋아요', 'batch 64 cuts gradient noise to 1/√64 = 1/8, and the GPU processes all 64 at once efficiently'], ['약간의 잡음은 날카로운 최솟값을 벗어나 일반화에 도움이 되기도 해요 · 보통 32–512를 쓰고, 배치를 키우면 학습률도 함께 키워요', 'a little noise can even help escape sharp minima and generalize; 32–512 is typical, and larger batches call for larger learning rates']],
    fin: [['미니배치 SGD: 작은 묶음의 평균 기울기로 자주 갱신', 'minibatch SGD: frequent updates from the average gradient of small batches', 'dlx-xs dlx-a'], ['1 에폭 = 데이터 전체를 한 번 훑는 것', 'one epoch is one full pass over the data'], ['GPU 메모리가 배치 크기의 상한을 정해요', 'GPU memory caps the batch size']],
    caps: [['미니배치', 'Minibatches'], ['배치 1', 'Batch size 1'], ['배치 64', 'Batch size 64'], ['배치 크기 고르기', 'Choosing a batch size'], ['미니배치 학습', 'Minibatch training']]
  });
}
/* ===== Deep learning · 2. optimization ===== */
function sMomentum() {
  const cx = 25.2, cy = 4.2, sx = .6, sy = 1.4, M = (x, y) => [cx + x * sx, cy + y * sy];
  const run = (mom, lr, beta) => { let x = -9, y = 1.4, vx = 0, vy = 0; const pts = [M(x, y)]; for (let k = 0; k < 40; k++) { const gx = x, gy = 20 * y; if (mom) { vx = beta * vx + gx; vy = beta * vy + gy; x -= lr * vx; y -= lr * vy; } else { x -= lr * gx; y -= lr * gy; } pts.push(M(x, y)); } return pts; };
  const gd = run(0, .09, 0), mo = run(1, .03, .8);
  return CW('dl-momentum', {
    code: ['v = 0', 'for step in range(40):', '    g = grad(theta)', ['    v = 0.8 * v + g  # 속도', '    v = 0.8 * v + g  # velocity'], '    theta -= 0.03 * v'],
    hl: [[2, 1, 'danger'], [3, 2, 'ok'], [3, 1, 'ok'], [0, 5, 'accent']],
    draw: (S) => {
      SV(S, 'ct', [4, 16, 36, 64, 100].map(c => `<ellipse cx="${cx}" cy="${cy}" rx="${r3(Math.sqrt(c) * sx)}" ry="${r3(Math.sqrt(c / 20) * sy)}" ${zst('ink-3', .05)}/>`).concat([zJ([cx, cy], 'ok')]), 0);
      lbl(S, 'ctl', 19.2, .25, ['좁고 긴 골짜기: f = ½(x² + 20y²)', 'a long narrow valley: f = ½(x² + 20y²)'], 'm', 0);
      spoly(S, 'gd', gd, { st: 1, color: 'danger', h: .07 }); lbl(S, 'gdl', 19.2, 8.2, ['경사 하강: 가파른 y로 지그재그', 'gradient descent: zigzags across the steep y'], 'r', 1);
      spoly(S, 'mo', mo, { st: 2, color: 'ok', h: .1 }); lbl(S, 'mol', 19.2, 9.4, ['모멘텀: 흔들림은 상쇄, 골짜기 방향은 누적', 'momentum: oscillations cancel, the valley direction adds up'], 'g', 2, { w: 12.4 });
      lines(S, 'res', 1, 8.0, [[['40스텝 뒤 최솟값까지 거리', 'distance to the minimum after 40 steps'], 'm'], [['경사 하강 0.21', 'gradient descent 0.21'], 'r'], [['모멘텀 0.06', 'momentum 0.06'], 'g']], 3, 0, { lh: 1.25 });
      lbl(S, 'ball', 1, 12.0, ['언덕을 구르는 공처럼 속도를 기억해요 · β = 0.9가 흔한 값이에요', 'like a ball rolling downhill it remembers its velocity; β = 0.9 is common'], 'a', 4, { w: 16.2 });
    },
    notes: [['손실 지형이 한쪽으로만 가파른 골짜기면, 경사 하강은 가파른 방향으로 왔다 갔다 하며 정작 골짜기를 따라서는 천천히 가요', 'when the loss surface is a valley steep in only one direction, gradient descent bounces across the steep side while crawling along the valley'], ['모멘텀은 지난 기울기를 속도 v로 누적해요 · 방향이 계속 바뀌는 성분은 서로 상쇄되고 일정한 방향은 점점 빨라져요', 'momentum accumulates past gradients into a velocity v: components that keep flipping cancel, while a steady direction speeds up'], ['같은 40스텝에서 최솟값까지 거리가 0.21에서 0.06으로 줄어요 · 지그재그도 훨씬 부드러워져요', 'after the same 40 steps the distance to the minimum drops from 0.21 to 0.06, with far less zigzag'], ['언덕을 굴러 내려가는 공처럼 관성이 생겨요 · 보통 β = 0.9를 쓰고, 한 발 앞을 보고 기울기를 구하는 네스테로프 변형도 있어요', 'it behaves like a ball with inertia rolling downhill; β = 0.9 is typical, and the Nesterov variant evaluates the gradient one step ahead']],
    fin: [['모멘텀: v ← βv + g, θ ← θ − η·v', 'momentum: v ← βv + g, θ ← θ − η·v', 'dlx-xs dlx-a'], ['SGD + 모멘텀은 지금도 이미지 모델에서 많이 써요', 'SGD with momentum remains common for vision models'], ['Adam의 m도 같은 생각이에요', 'Adam’s m is the same idea']],
    caps: [['경사 하강의 지그재그', 'Gradient descent zigzags'], ['속도 누적', 'Accumulating velocity'], ['비교', 'Comparison'], ['구르는 공', 'A rolling ball'], ['모멘텀', 'Momentum']]
  });
}

function sAdam() {
  const L = v => 19.2 + (Math.log10(v) + 6) / 8 * 8.5, P = PF(3.0, 9.4, 13.6, 3.6, 1, 30, 0, 1.1);
  const bar = (k, y, v, c, st, lab) => { rect(S0, k, 19.2, y, L(v) - 19.2, .7, c, 55, st, { r: .1 }); lbl(S0, k + 'l', L(v) + .2, y + .03, lab, 'm', st); };
  let S0;
  return CW('dl-adam', {
    code: [['m = 0.9 * m + 0.1 * g         # 방향 평균', 'm = 0.9 * m + 0.1 * g         # mean'], ['v = 0.999 * v + 0.001 * g**2  # 크기 평균', 'v = 0.999 * v + 0.001 * g**2  # mean size'], ['m_hat = m / (1 - 0.9**t)      # 초반 보정', 'm_hat = m / (1 - 0.9**t)      # bias fix'], 'v_hat = v / (1 - 0.999**t)', 'theta -= lr * m_hat / (v_hat**0.5 + 1e-8)'],
    hl: [[0, 1], [4, 1, 'danger'], [1, 1, 'ok'], [2, 2, 'accent']],
    draw: (S) => {
      S0 = S;
      lbl(S, 'gt', 19.2, .3, ['기울기 크기 (로그)', 'gradient size (log)'], 'm', 1);
      bar('g1', 1.0, 100, 'ink-3', 1, 'g₁ = 100'); bar('g2', 1.9, .01, 'ink-3', 1, 'g₂ = 0.01');
      lbl(S, 'st', 19.2, 3.1, ['SGD 스텝 = lr × g (lr = 0.001)', 'SGD step = lr × g (lr = 0.001)'], 'm r', 2);
      bar('s1', 3.8, .1, 'danger', 2, '0.1'); bar('s2', 4.7, 1e-5, 'danger', 2, '0.00001');
      lbl(S, 'stn', 19.2, 5.6, ['1만 배 차이: 한쪽은 튀고 한쪽은 멈춰요', '10,000× apart: one jumps, the other stalls'], 'r', 2);
      lbl(S, 'at', 19.2, 6.8, ['Adam 스텝 ≈ lr × m/√v', 'Adam step ≈ lr × m/√v'], 'm g', 3);
      bar('a1', 7.5, .001, 'ok', 3, '0.001'); bar('a2', 8.4, .001, 'ok', 3, '0.001');
      lbl(S, 'atn', 19.2, 9.3, ['크기로 나눠서 파라미터마다 비슷한 보폭', 'dividing by size gives every parameter a similar stride'], 'g', 3, { w: 12.4 });
      axes(S, 'ax', P, 4); hl(S, 'one', P.x0, P.x0 + P.w, P.Y(1), 'ok', 4, { w: .08 });
      curve(S, 'raw', P, t => 1 - Math.pow(.9, t), 4, { color: 'danger', n: 60 }); ticks(S, 'tk', P, [[10, 't = 10'], [30, '30']], [[1, '1'], [.1, '0.1']], 4);
      lbl(S, 'rawl', 1, 8.0, ['보정 없는 m/g: 첫 스텝 0.1에서 시작 (빨강) · 보정하면 1 (초록)', 'uncorrected m/g starts at 0.1 (red); corrected it is 1 (green)'], 'a', 4, { w: 16.2 });
    },
    notes: [['Adam은 모멘텀처럼 기울기의 평균 m을 쓰면서, 기울기 제곱의 평균 v로 크기를 함께 추적해요', 'Adam keeps a running mean m of the gradient like momentum and also tracks its size with a running mean v of the squared gradient'], ['파라미터마다 기울기 크기가 100과 0.01처럼 다르면 SGD의 보폭은 1만 배 차이가 나서, 한쪽은 튀고 한쪽은 거의 안 움직여요', 'when gradient sizes differ, say 100 and 0.01, SGD’s step sizes differ 10,000 times: one parameter jumps while the other barely moves'], ['Adam은 m을 √v로 나눠 크기를 맞춰요 · 그래서 모든 파라미터가 대략 학습률 정도씩 움직이고, 학습률을 덜 신경 써도 돼요', 'Adam divides m by √v to normalize the size, so every parameter moves roughly by the learning rate and tuning is less delicate'], ['m과 v는 0에서 시작해 초반에 작게 치우쳐요 · 1 − β^t로 나눠 바로잡는 게 편향 보정이에요', 'm and v start at zero and are biased small early on; dividing by 1 − β^t corrects this bias']],
    fin: [['Adam: 모멘텀 + 파라미터별 보폭 조절 + 편향 보정', 'Adam: momentum + per-parameter step scaling + bias correction', 'dlx-xs dlx-a'], ['기본값 β1 = 0.9, β2 = 0.999, lr = 1e-3 (트랜스포머는 3e-4 근처)', 'defaults β1 = 0.9, β2 = 0.999, lr = 1e-3 (transformers often near 3e-4)'], ['가중치 감쇠는 AdamW처럼 분리해서 써요', 'apply weight decay separately, as AdamW does']],
    caps: [['다른 크기의 기울기', 'Gradients of different sizes'], ['SGD의 보폭', 'SGD’s steps'], ['Adam의 보폭', 'Adam’s steps'], ['편향 보정', 'Bias correction'], ['Adam', 'Adam']]
  });
}

function sSchedule() {
  const P = PF(3.0, 8.4, 14.0, 5.0, 0, 1000, 0, 3.4), pk = 3, W = 100, T = 1000;
  const lr = t => t < W ? pk * t / W : pk * (1 + Math.cos(Math.PI * (t - W) / (T - W))) / 2;
  return CW('dl-schedule', {
    code: ['def lr_at(t, peak=3e-4, W=100, T=1000):', '    if t < W: return peak * t / W', '    p = (t - W) / (T - W)', '    return peak * (1 + cos(pi * p)) / 2'],
    hl: [[0, 1], [1, 1, 'warn'], [2, 2, 'ok'], [0, 4, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 1); ticks(S, 'tk', P, [[100, '100'], [1000, ['1000 스텝', '1000 steps']]], [[3, '3e-4']], 1); lbl(S, 'yl', 1, 7.7, ['학습률', 'learning rate'], 'm', 1);
      curve(S, 'flat', P, () => 3, 1, { color: 'ink-3', n: 2, off: 4, dash: 1 }); lbl(S, 'fl', 19.2, 1.0, ['고정 학습률: 처음엔 불안정, 끝엔 최솟값 주변을 맴돌아요', 'a fixed rate: unstable at first, circling the minimum at the end'], '', 1, { w: 12.4 });
      curve(S, 'wu', P, lr, 2, { color: 'warn', b: 100, n: 10, h: .12 }); lbl(S, 'wul', 19.2, 3.0, ['워밍업: 0에서 100스텝 동안 선형으로 올려요 · 초반의 큰 기울기와 Adam의 부정확한 v로부터 보호', 'warm-up: ramp linearly from 0 over 100 steps, protecting against large early gradients and Adam’s noisy v'], 'w', 2, { w: 12.4 });
      curve(S, 'cos', P, lr, 3, { color: 'ok', a: 100, n: 80, h: .12 }); lbl(S, 'cosl', 19.2, 5.4, ['코사인 감쇠: 끝으로 갈수록 천천히 0에 가까워져 정밀하게 수렴', 'cosine decay: eases toward 0 for a precise finish'], 'g', 3, { w: 12.4 });
      spoly(S, 'step', [[P.X(0), P.Y(3)], [P.X(400), P.Y(3)], [P.X(400), P.Y(.3)], [P.X(800), P.Y(.3)], [P.X(800), P.Y(.03)], [P.X(1000), P.Y(.03)]], { st: 4, color: 'accent', h: .07, dash: 1 });
      lbl(S, 'stl', 19.2, 7.4, ['계단식 감쇠(파랑 점선): 10배씩 뚝 · ResNet 시절의 표준', 'step decay (blue dashes): drop 10× at set points, the ResNet-era standard'], 'a', 4, { w: 12.4 });
    },
    notes: [['학습률은 가장 중요한 하이퍼파라미터예요 · 고정값이면 초반엔 너무 커서 불안정하고, 끝에서는 너무 커서 최솟값 주변을 맴돌아요', 'the learning rate is the most important hyperparameter: held fixed, it is too large early on (unstable) and too large at the end (circling the minimum)'], ['워밍업은 처음 몇백 스텝 동안 0에서 목표값까지 선형으로 올려요 · 무작위 초기 상태의 큰 기울기와 Adam의 아직 부정확한 v로부터 학습을 보호해요', 'warm-up ramps linearly from 0 to the target over the first few hundred steps, shielding training from large early gradients and Adam’s still-noisy v'], ['그다음 코사인 곡선으로 줄이면 중간엔 크게 탐색하고 끝으로 갈수록 부드럽게 0에 가까워져 정밀하게 수렴해요', 'then a cosine curve explores boldly in the middle and eases toward zero at the end for a precise finish'], ['예전에는 정해진 에폭마다 10배씩 줄이는 계단식 감쇠를 썼어요 · 지금 트랜스포머는 대부분 워밍업 + 코사인(또는 선형) 감쇠예요', 'older recipes dropped the rate tenfold at set epochs (step decay); today’s transformers mostly use warm-up plus cosine or linear decay']],
    fin: [['학습률 스케줄: 워밍업으로 시작해 코사인으로 줄여요', 'learning-rate schedule: warm up, then decay along a cosine', 'dlx-xs dlx-a'], ['torch.optim.lr_scheduler에 여러 스케줄이 있어요', 'torch.optim.lr_scheduler ships many schedules'], ['학습률 탐색(LR finder)으로 최댓값을 정하기도 해요', 'an LR finder sweep can choose the peak value']],
    caps: [['고정 학습률', 'A fixed rate'], ['워밍업', 'Warm-up'], ['코사인 감쇠', 'Cosine decay'], ['계단식 감쇠', 'Step decay'], ['학습률 스케줄', 'Learning-rate schedules']]
  });
}

function sClip() {
  const P = PF(3.0, 7.6, 14.0, 5.4, 0, 100, 0, 10), spikes = { 30: 6, 62: 9.4, 85: 4 };
  const gn = t => { const r = Math.round(t); return spikes[r] ?? (.45 + .15 * Math.sin(t * 1.7) + .08 * Math.sin(t * 4.3)); };
  const pts = f => [...Array(101)].map((_, t) => [P.X(t), P.Y(f(t))]);
  const O = [21.0, 12.0], k = 1.1;
  return CW('dl-clip', {
    code: ['loss.backward()', 'n = clip_grad_norm_(model.parameters(), 1.0)', ['# ‖g‖ > 1이면 g × (1 / ‖g‖)', '# if ‖g‖ > 1: g × (1 / ‖g‖)'], 'opt.step()'],
    hl: [[0, 1, 'danger'], [1, 1, 'ok'], [2, 1, 'accent'], [1, 1, 'warn']],
    draw: (S) => {
      axes(S, 'ax', P, 1); ticks(S, 'tk', P, [[100, ['스텝', 'steps']]], [[1, '1'], [9.4, '9.4']], 1); lbl(S, 'yl', 1, 6.4, ['기울기 노름 ‖g‖', 'gradient norm ‖g‖'], 'm', 1);
      spoly(S, 'raw', pts(gn), { st: 1, color: 'danger', h: .07 }); lbl(S, 'rawl', 19.2, 1.0, ['가끔 기울기가 폭발해요 (RNN, 깊은 트랜스포머) · 한 번의 큰 스텝이 학습을 망쳐요', 'occasionally gradients explode (RNNs, deep transformers), and one huge step can wreck training'], 'r', 1, { w: 12.4 });
      hl(S, 'cap', P.x0, P.x0 + P.w, P.Y(1), 'ok', 2, { w: .06, dash: 1 }); spoly(S, 'cl', pts(t => Math.min(1, gn(t))), { st: 2, color: 'ok', h: .1 });
      lbl(S, 'cll', 19.2, 3.4, ['노름이 1을 넘으면 1로 줄여요 (초록)', 'norms above 1 are scaled down to 1 (green)'], 'g', 2, { w: 12.4 });
      SV(S, 'vec', [zA(O, [O[0] + 3 * k, O[1] - 4 * k], 'danger', .1), zA(O, [O[0] + .6 * k, O[1] - .8 * k], 'ok', .14), `<circle cx="${O[0]}" cy="${O[1]}" r="${k}" ${zst('ok', .05, ';stroke-dasharray:.2 .15')}/>`], 3);
      lbl(S, 'v1', O[0] + 3 * k + .2, O[1] - 4 * k - .2, 'g = (3, 4), ‖g‖ = 5', 'm r', 3); lbl(S, 'v2', O[0] + 1.3, O[1] - .7, '(0.6, 0.8)', 'm g', 3);
      lbl(S, 'v3', 25.6, 9.4, ['방향은 그대로, 길이만 1로', 'same direction, length cut to 1'], 'g', 3, { w: 5.6 });
      lbl(S, 'ex', 1, 13.6, ['max_norm 1.0이 흔해요 · LLM 학습도 거의 다 써요', 'max_norm 1.0 is common; nearly all LLM training uses it'], 'a', 4, { w: 16.2 });
    },
    notes: [['깊은 망이나 RNN에서는 가끔 기울기가 갑자기 수십 배로 커져요 · 그 스텝 하나가 파라미터를 멀리 날려 손실이 튀거나 NaN이 돼요', 'in deep nets and RNNs the gradient occasionally jumps tens of times larger, and that single step can fling the parameters away, spiking the loss or producing NaN'], ['기울기 클리핑은 전체 기울기의 노름이 임계값(보통 1.0)을 넘을 때만 줄여요 · 평소에는 아무 영향이 없어요', 'gradient clipping shrinks the gradient only when its overall norm exceeds a threshold, commonly 1.0, and does nothing otherwise'], ['줄일 때는 방향을 그대로 두고 길이만 맞춰요 · (3, 4)는 노름 5라서 1/5을 곱해 (0.6, 0.8)이 돼요', 'it keeps the direction and only rescales the length: (3, 4) has norm 5, so it is multiplied by 1/5 to become (0.6, 0.8)'], ['backward() 다음, step() 전에 한 줄이면 돼요 · 돌려받은 노름을 기록하면 학습이 불안정한 순간을 찾는 데도 좋아요', 'it is one line between backward() and step(), and logging the returned norm helps spot unstable moments']],
    fin: [['기울기 클리핑: ‖g‖ > c면 g ← g·c/‖g‖', 'gradient clipping: if ‖g‖ > c, g ← g·c/‖g‖', 'dlx-xs dlx-a'], ['값마다 자르는 clip_grad_value_도 있지만 방향이 바뀌어요', 'clip_grad_value_ clips each entry but changes the direction'], ['혼합 정밀도라면 스케일을 되돌린 뒤 클리핑해요', 'with mixed precision, unscale before clipping']],
    caps: [['기울기 폭발', 'Exploding gradients'], ['노름 자르기', 'Clipping the norm'], ['방향은 그대로', 'Direction preserved'], ['쓰는 곳', 'Where it is used'], ['기울기 클리핑', 'Gradient clipping']]
  });
}

function sLandscape() {
  const f = x => 1.5 - 1.15 * Math.exp(-Math.pow((x + 2) / .25, 2)) - 1.0 * Math.exp(-Math.pow((x - 2) / 1.2, 2)) + .03 * x * x;
  const P = PF(3.0, 7.6, 14.0, 5.6, -4, 4.5, 0, 2.2);
  return CW('dl-landscape', {
    code: [['# 손실 지형에는 골짜기가 여럿 있어요', '# the loss landscape has many valleys'], ['# 날카로운 최솟값: 좁고 깊어요', '# sharp minimum: narrow and deep'], ['# 평평한 최솟값: 넓고 완만해요', '# flat minimum: wide and gentle'], ['# SGD 잡음이 좁은 골을 빠져나오게 해요', '# SGD noise shakes it out of narrow valleys'], ['# 테스트 데이터 = 지형이 조금 옮겨진 것', '# test data = a slightly shifted landscape']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 1, { noy: 1 }); curve(S, 'f', P, f, 1, { color: 'ink-2', n: 300 }); lbl(S, 'yl', 1, 6.9, ['손실', 'loss'], 'm', 1); lbl(S, 'xl', P.x0 + P.w - 2.6, P.Y(0) + .2, ['파라미터', 'parameter'], 'm', 1);
      lbl(S, 'sh', P.X(-2) - 1.8, P.Y(f(-2)) + .35, ['날카로운', 'sharp'], 'w', 2); lbl(S, 'fl', P.X(2) - 1.0, P.Y(f(2)) + .4, ['평평한', 'flat'], 'g', 2);
      pt(S, 'b1', P.X(-2), P.Y(f(-2)), 2, C.warn, .18); pt(S, 'b2', P.X(2), P.Y(f(2)), 2, C.okf, .18);
      SV(S, 'jit', [zA([P.X(-2) + .1, P.Y(f(-2)) - .5], [P.X(-.6), P.Y(f(-.6)) - .6], 'ok', .07)], 3);
      lbl(S, 'jl', 19.2, 1.2, ['미니배치 잡음은 공을 흔들어요 · 좁은 골에서는 쉽게 튀어나가고, 넓은 골에 머물러요', 'minibatch noise jiggles the ball: it pops out of narrow valleys and settles in wide ones'], 'g', 3, { w: 12.4 });
      curve(S, 'ft', P, x => f(x - .35), 4, { color: 'accent', n: 300, dash: 1, h: .07 });
      lbl(S, 'tl', 19.2, 4.0, ['테스트 데이터에서는 지형이 살짝 옮겨져요 (파랑 점선)', 'on test data the landscape shifts slightly (blue dashes)'], 'a', 4, { w: 12.4 });
      lbl(S, 'tl2', 19.2, 5.8, ['날카로운 곳은 손실이 크게 오르고, 평평한 곳은 거의 그대로 → 일반화가 좋아요', 'the sharp minimum’s loss jumps while the flat one barely moves, so flat minima generalize better'], 'w', 4, { w: 12.4 });
    },
    notes: [['신경망의 손실 지형은 수백만 차원에 골짜기와 안장점이 가득해요 · 그래도 대부분의 지역 최솟값은 손실이 비슷하게 낮아요', 'a network’s loss landscape spans millions of dimensions full of valleys and saddle points, yet most local minima are similarly low'], ['최솟값에도 모양이 달라요 · 좁고 깊은 날카로운 최솟값과 넓고 완만한 평평한 최솟값이 있어요', 'minima differ in shape: sharp ones are narrow and deep, flat ones wide and gentle'], ['미니배치 SGD의 잡음은 공을 흔드는 효과가 있어 좁은 골은 빠져나오고 넓은 골에 자리 잡기 쉬워요', 'the noise of minibatch SGD jiggles the ball, so it escapes narrow valleys and tends to settle in wide ones'], ['테스트 데이터에서는 지형이 조금 옮겨진 것과 같아요 · 평평한 최솟값은 손실이 거의 그대로라 일반화가 더 좋다고 봐요', 'test data acts like a slightly shifted landscape: a flat minimum’s loss barely changes, which is why flat minima are thought to generalize better']],
    fin: [['평평한 최솟값일수록 새 데이터에 강해요', 'flatter minima tend to hold up better on new data', 'dlx-xs dlx-a'], ['고차원에서는 지역 최솟값보다 안장점이 더 흔해요', 'in high dimensions saddle points are more common than bad local minima'], ['SAM 같은 최적화기는 일부러 평평한 곳을 찾아요', 'optimizers such as SAM seek flat regions on purpose']],
    caps: [['손실 지형', 'The loss landscape'], ['날카로운 vs 평평한', 'Sharp vs flat'], ['잡음의 역할', 'The role of noise'], ['일반화', 'Generalization'], ['손실 지형과 최솟값', 'Loss landscapes and minima']]
  });
}
/* ===== Deep learning · 3. normalization and regularization ===== */
const MAT = [[.2, .8, .5, .3, .9], [.6, .4, .7, .2, .5], [.9, .3, .2, .8, .4], [.4, .7, .9, .5, .2], [.3, .5, .4, .7, .8], [.7, .2, .6, .4, .6]];
function sBN() {
  const P = PF(3.0, 7.8, 14.0, 4.6, -4, 14, 0, 1.15), cs = .8, gx = 22.0, gy = 1.2;
  return CW('dl-batchnorm', {
    code: [['mu = x.mean(0)            # 특징별 배치 평균', 'mu = x.mean(0)            # per-feature mean'], 'var = x.var(0, unbiased=False)', 'x_hat = (x - mu) / (var + 1e-5) ** 0.5', ['y = gamma * x_hat + beta  # 학습되는 γ, β', 'y = gamma * x_hat + beta  # learned γ, β'], ['# 추론 때는 이동 평균 통계를 써요', '# inference uses running statistics']],
    hl: [[0, 1], [2, 1, 'ok'], [3, 1, 'accent'], [4, 1, 'warn']],
    draw: (S) => {
      GR(S, 'g', gx, gy, cs, MAT, 'accent', 1); frame(S, 'col', gx + cs - .08, gy - .12, cs + .12, cs * 6 + .2, 'warn', 1, { w: .1, r: .15 });
      lbl(S, 'gn', gx - 2.6, gy + 2.0, ['배치 N', 'batch N'], 'm', 1); lbl(S, 'gc', gx, gy - .9, ['특징 C', 'features C'], 'm', 1);
      lbl(S, 'gl', 19.2, 6.4, ['한 특징(열)을 배치 전체에서 평균 0, 분산 1로', 'normalize each feature (column) over the batch'], 'w', 1, { w: 12.4 });
      axes(S, 'ax', P, 1); ticks(S, 'tk', P, [[0, '0'], [5, '5']], [], 1); lbl(S, 'yl', 1, 7.1, ['한 특징의 값 분포', 'distribution of one feature'], 'm', 1);
      curve(S, 'pre', P, gauss1(5, 3), 1, { color: 'warn', n: 100 }); lbl(S, 'prel', 1, 13.3, ['주황: 전, 평균 5 · σ 3', 'orange: before, mean 5 · σ 3'], 'w', 1);
      curve(S, 'post', P, gauss1(0, 1), 2, { color: 'ok', n: 100, h: .12 }); lbl(S, 'postl', 9.6, 13.3, ['초록: 후, 평균 0 · σ 1', 'green: after, mean 0 · σ 1'], 'g', 2);
      curve(S, 'gb', P, gauss1(1, 2), 3, { color: 'accent', n: 100 }); lbl(S, 'gbl', 19.2, 8.0, ['γ = 2, β = 1로 다시 늘리고 옮길 수 있어요 · 필요하면 원래대로도 돌아가요', 'γ = 2, β = 1 can stretch and shift it back, even to the original if useful'], 'a', 3, { w: 12.4 });
      lbl(S, 'ev', 19.2, 10.2, ['추론: 배치 대신 학습 중 모은 이동 평균(momentum 0.1)을 써요 · model.eval()을 잊지 마세요', 'inference: use running averages collected during training (momentum 0.1), so call model.eval()'], 'w', 4, { w: 12.4 });
    },
    notes: [['배치 정규화는 한 층의 출력을 특징(채널)마다 미니배치 전체에서 평균 0, 분산 1로 맞춰요', 'batch normalization rescales a layer’s output so each feature (channel) has mean 0 and variance 1 across the minibatch'], ['평균 5, 표준편차 3으로 치우친 분포가 0 근처의 고른 분포가 돼요 · 다음 층이 늘 비슷한 범위의 입력을 받아 학습이 빨라지고 더 큰 학습률도 견뎌요', 'a distribution skewed to mean 5 and σ 3 becomes centered near 0, so the next layer always sees a similar range, training speeds up and larger learning rates are tolerated'], ['정규화 뒤에 학습되는 γ(크기)와 β(위치)를 곱하고 더해요 · 필요하면 네트워크가 원래 분포로 되돌릴 수도 있어요', 'after normalizing, a learned scale γ and shift β are applied, so the network can even undo the normalization if that helps'], ['추론 때는 배치 통계 대신 학습 중 모아 둔 이동 평균을 써요 · 그래서 model.eval()이 꼭 필요하고, 배치가 아주 작으면 통계가 흔들려요', 'at inference time running averages collected during training replace batch statistics, which is why model.eval() matters; very small batches make the statistics noisy']],
    fin: [['배치 정규화: 특징마다 배치 평균·분산으로 정규화 + γ, β', 'batch norm: normalize each feature with batch mean and variance, then apply γ and β', 'dlx-xs dlx-a'], ['CNN에서는 채널마다, N·H·W 전체로 통계를 내요', 'in CNNs the statistics run per channel over N, H and W'], ['학습과 추론의 동작이 다른 대표적인 층이에요', 'a classic layer that behaves differently in training and inference']],
    caps: [['열 단위 정규화', 'Normalizing columns'], ['평균 0, 분산 1', 'Mean 0, variance 1'], ['γ와 β', 'γ and β'], ['추론 모드', 'Inference mode'], ['배치 정규화', 'Batch normalization']]
  });
}

function sLN() {
  const cs = .7, ax = 19.4, bx = 25.8, gy = 1.0;
  return CW('dl-layernorm', {
    code: [['mu = x.mean(-1, keepdim=True)  # 샘플마다', 'mu = x.mean(-1, keepdim=True)  # per sample'], 'var = x.var(-1, keepdim=True, unbiased=False)', 'x_hat = (x - mu) / (var + 1e-5) ** 0.5', 'y = gamma * x_hat + beta', 'nn.LayerNorm(512)'],
    hl: [[0, 1, 'warn'], [0, 4, 'ok'], [4, 1, 'accent'], [4, 1, 'accent']],
    draw: (S) => {
      GR(S, 'a', ax, gy, cs, MAT, 'accent', 1); frame(S, 'ac', ax + 2 * cs - .08, gy - .1, cs + .12, cs * 6 + .16, 'warn', 1, { w: .1, r: .15 }); lbl(S, 'al', ax, gy + 4.5, ['배치 정규화: 열', 'batch norm: columns'], 'w', 1);
      GR(S, 'b', bx, gy, cs, MAT, 'accent', 2); frame(S, 'bc', bx - .1, gy + 2 * cs - .08, cs * 5 + .16, cs + .12, 'ok', 2, { w: .1, r: .15 }); lbl(S, 'bl', bx, gy + 4.5, ['층 정규화: 행', 'layer norm: rows'], 'g', 2);
      lbl(S, 'w1', 19.2, 6.6, ['샘플 하나 안에서 평균·분산을 구해서 배치 크기와 상관없어요', 'statistics come from within one sample, independent of batch size'], 'g', 2, { w: 12.4 });
      lines(S, 'why', 1, 7.4, [[['배치 1, 길이가 제각각인 문장에도 그대로', 'works with batch size 1 and sentences of any length'], 'g'], [['학습과 추론의 동작이 같아요', 'identical in training and inference'], 'g'], [['그래서 RNN과 트랜스포머의 표준이에요', 'hence the standard for RNNs and transformers'], 'a']], 3, 0, { lh: 1.25 });
      [['x', 'ink', 19.4], ['LN', 'ok', 21.4], [['어텐션', 'attention'], 'accent', 23.3], ['⊕', 'warn', 27.4], ['y', 'ink', 29.4]].forEach(([t, c, x], i) => chip(S, 'p' + i, x, 9.6, i === 2 ? 3.7 : (i === 1 ? 1.5 : 1.4), t, c, 4));
      [[20.8, 21.4], [22.9, 23.3], [27.0, 27.4], [28.8, 29.4]].forEach(([a, b], i) => arw(S, 'pa' + i, [a, 10.15], [b, 10.15], 4));
      SV(S, 'skip', [zW([[20.1, 9.6], [20.1, 8.8], [28.1, 8.8], [28.1, 9.5]], 'warn', .08)], 4);
      lbl(S, 'pre', 19.4, 11.3, ['Pre-LN: 서브층 앞에서 정규화하고 잔차로 더해요 · 깊은 트랜스포머가 안정적으로 학습돼요', 'pre-LN normalizes before each sublayer and adds the residual, keeping deep transformers stable'], 'a', 4, { w: 12.0 });
    },
    notes: [['배치 정규화는 같은 특징을 여러 샘플에 걸쳐(열 방향) 정규화해요 · 배치가 작거나 시퀀스 길이가 다르면 통계가 불안정해요', 'batch norm normalizes one feature across many samples (down a column), so small batches or ragged sequence lengths make its statistics unstable'], ['층 정규화는 샘플 하나의 모든 특징에 걸쳐(행 방향) 평균과 분산을 구해요 · 다른 샘플과 상관없이 계산돼요', 'layer norm computes the mean and variance across all features of a single sample (along a row), independent of other samples'], ['그래서 배치 크기 1에서도, 길이가 제각각인 문장에서도 똑같이 동작하고 학습과 추론의 차이도 없어요 · RNN과 트랜스포머의 표준이에요', 'so it behaves the same with a batch of one or sentences of any length, with no train–inference difference, making it standard in RNNs and transformers'], ['요즘 트랜스포머는 서브층 앞에서 정규화하는 Pre-LN을 주로 써요 · 평균을 빼지 않는 RMSNorm도 많이 쓰여요', 'modern transformers mostly normalize before each sublayer (pre-LN), and RMSNorm, which skips the mean subtraction, is also popular']],
    fin: [['층 정규화: 샘플마다 특징 축으로 정규화 · 배치와 무관', 'layer norm: normalize along the feature axis per sample, independent of the batch', 'dlx-xs dlx-a'], ['그룹 정규화는 채널을 묶어 정규화해 작은 배치의 CNN에 써요', 'group norm normalizes channel groups for small-batch CNNs'], ['RMSNorm은 LLaMA 계열 모델이 써요', 'RMSNorm is used by LLaMA-family models']],
    caps: [['배치 정규화: 열', 'Batch norm: columns'], ['층 정규화: 행', 'Layer norm: rows'], ['장점', 'Advantages'], ['Pre-LN 트랜스포머', 'Pre-LN transformers'], ['층 정규화', 'Layer normalization']]
  });
}

function sResidual() {
  const P = PF(3.0, 8.0, 14.0, 5.0, 0, 50, -8, 1);
  return CW('dl-residual', {
    code: ['class Block(nn.Module):', '    def forward(self, x):', ['        return x + self.f(x)  # 지름길', '        return x + self.f(x)  # shortcut'], ['# ∂y/∂x = 1 + ∂f/∂x → 1이 항상 남아요', '# ∂y/∂x = 1 + ∂f/∂x → the 1 always survives']],
    hl: [[2, 1], [3, 1, 'ok'], [3, 1, 'ok'], [2, 1, 'accent']],
    draw: (S) => {
      chip(S, 'x', 19.4, 2.6, 1.4, 'x', 'ink', 1); nb(S, 'f', 22.0, 2.4, 4.0, 1.5, 'f(x)', 'accent', 1); lbl(S, 'fl', 22.0, 4.1, 'conv-BN-ReLU-conv', 'm', 1); chip(S, 'add', 27.2, 2.6, 1.3, '⊕', 'warn', 1); chip(S, 'y', 29.6, 2.6, 1.4, 'y', 'ok', 1);
      arw(S, 'a1', [20.8, 3.15], [22.0, 3.15], 1); arw(S, 'a2', [26.0, 3.15], [27.2, 3.15], 1); arw(S, 'a3', [28.5, 3.15], [29.6, 3.15], 1);
      SV(S, 'sk', [zW([[20.1, 2.6], [20.1, 1.2], [27.85, 1.2]], 'warn', .1), zA([27.85, 1.2], [27.85, 2.55], 'warn', .1)], 1); lbl(S, 'skl', 22.6, .45, ['지름길: x를 그대로 더해요', 'shortcut: add x unchanged'], 'w', 1);
      axes(S, 'ax', P, 2); ticks(S, 'tk', P, [[25, '25'], [50, ['50층', '50 layers']]], [[0, '1'], [-4, '1e-4'], [-8, '1e-8']], 2); lbl(S, 'yl', 1, 7.2, ['입력층까지 오는 기울기 크기 (로그)', 'gradient reaching the input (log)'], 'm', 2);
      curve(S, 'pl', P, l => l * Math.log10(.7), 2, { color: 'danger', n: 10 }); lbl(S, 'pll', 19.2, 5.2, ['일반 망: 층마다 0.7배 → 50층이면 10⁻⁸', 'plain net: ×0.7 per layer → 10⁻⁸ after 50'], 'r', 2, { w: 12.4 });
      curve(S, 're', P, () => 0, 3, { color: 'ok', n: 2, h: .12 }); lbl(S, 'rel', 19.2, 6.6, ['잔차 망: 1 + f′ 덕분에 기울기가 살아 있어요', 'residual net: thanks to 1 + f′ the gradient survives'], 'g', 3, { w: 12.4 });
      lbl(S, 'h0', 19.2, 8.4, ['ResNet(2015): 152층까지 학습 성공', 'ResNet (2015): trained 152 layers'], 'a', 4, { w: 12.2 }); lbl(S, 'h1', 19.2, 9.6, ['잔차가 없으면 56층이 20층보다 학습 오차가 더 컸어요', 'without residuals a 56-layer net had higher training error than a 20-layer one'], '', 4, { w: 12.2 }); lbl(S, 'h2', 19.2, 11.2, ['트랜스포머의 모든 블록도 x + f(x)예요', 'every transformer block is x + f(x) too'], 'a', 4, { w: 12.2 });
    },
    notes: [['잔차 연결은 블록의 출력에 입력 x를 그대로 더해요 · y = x + f(x)라서 블록은 입력과의 차이(잔차)만 배우면 돼요', 'a residual connection adds the input x straight to the block’s output: y = x + f(x), so the block only learns the difference (the residual)'], ['층을 그냥 쌓으면 역전파 때 기울기가 층마다 곱해져요 · 0.7배씩이면 50층 뒤엔 10⁻⁸로 사라져 앞쪽 층이 배우지 못해요', 'in a plain stack gradients are multiplied layer by layer during backprop; at 0.7 per layer they shrink to 10⁻⁸ after 50 layers and early layers stop learning'], ['잔차 블록의 미분은 1 + ∂f/∂x라서 지름길로 기울기가 그대로 흘러요 · 아주 깊은 망도 학습돼요', 'a residual block’s derivative is 1 + ∂f/∂x, so gradients flow through the shortcut intact and very deep networks become trainable'], ['ResNet은 이 방법으로 152층을 학습했고, 잔차 없는 56층 망은 20층보다도 학습 오차가 컸어요 · 트랜스포머도 모든 블록이 잔차 구조예요', 'ResNet trained 152 layers this way, while a plain 56-layer net had higher training error than a 20-layer one; every transformer block is residual too']],
    fin: [['잔차 연결: y = x + f(x) · 기울기의 고속도로', 'residual connection: y = x + f(x), a highway for gradients', 'dlx-xs dlx-a'], ['모양이 다르면 지름길에 1×1 합성곱을 써요', 'when shapes differ, the shortcut uses a 1×1 convolution'], ['깊이를 늘려도 최소한 항등 함수는 지킬 수 있어요', 'adding depth can at worst learn the identity']],
    caps: [['지름길 더하기', 'Adding a shortcut'], ['기울기 소실', 'Vanishing gradients'], ['살아남는 기울기', 'Gradients survive'], ['ResNet과 그 이후', 'ResNet and beyond'], ['잔차 연결', 'Residual connections']]
  });
}

function sDecay() {
  const O = [21.0, 7.4], k = 2.4, M = (a, b) => [O[0] + a * k, O[1] - b * k], P = PF(3.0, 8.4, 14.0, 4.6, 0, 100, 0, 3.3);
  return CW('dl-decay', {
    code: ['loss = data_loss + lam / 2 * (w**2).sum()', ['# 기울기에 lam·w가 더해져 0 쪽으로 당겨요', '# adds lam·w to the gradient, pulling toward 0'], 'AdamW(params, lr=3e-4, weight_decay=0.01)', ['# AdamW: 적응 스케일과 분리해 감쇠', '# AdamW: decay decoupled from the scaling']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'accent'], [3, 1, 'warn']],
    draw: (S) => {
      hl(S, 'w1', 19.4, 31.0, O[1], 'ink-3', 1, { w: .05 }); vl(S, 'w2', O[0], .4, 9.0, 'ink-3', 1, { w: .05 }); lbl(S, 'w1l', 30.2, O[1] + .2, 'w₁', 'f', 1); lbl(S, 'w2l', O[0] + .25, .25, 'w₂', 'f', 1);
      const ws = M(2, 1.2);
      SV(S, 'ct', [.5, 1.5, 2.5].map(c => `<ellipse cx="${r3(ws[0])}" cy="${r3(ws[1])}" rx="${r3(Math.sqrt(2 * c) * k)}" ry="${r3(Math.sqrt(2 * c / 4) * k)}" ${zst('accent', .05)}/>`), 1);
      pt(S, 'ps', ws[0], ws[1], 1, C.cur, .18); lbl(S, 'psl', ws[0] + .3, ws[1] - .7, ['데이터만 보면 w*', 'data only: w*'], 'a', 1);
      SV(S, 'l2', [.8, 1.6].map(r => `<circle cx="${O[0]}" cy="${O[1]}" r="${r * k}" ${zst('ok', .05, ';stroke-dasharray:.2 .15')}/>`), 2); lbl(S, 'l2l', 19.4, 9.4, ['초록 점선: ‖w‖²이 같은 원', 'green dashes: circles of equal ‖w‖²'], 'g', 2);
      const wr = M(1.0, .96); pt(S, 'pr', wr[0], wr[1], 2, C.okf, .18); SV(S, 'mv', [zA([ws[0] - .2, ws[1] + .1], [wr[0] + .25, wr[1] - .05], 'ok', .07)], 2);
      lbl(S, 'prl', 19.4, 10.0, ['초록 점: 감쇠 후의 최솟값 (λ = 1)', 'green dot: the minimum with decay (λ = 1)'], 'g', 2);
      axes(S, 'ax', P, 3); lbl(S, 'yl', 1, 7.7, ['가중치 크기 ‖w‖', 'weight norm ‖w‖'], 'm', 3);
      curve(S, 'nd', P, t => 3 * (1 - Math.exp(-t / 20)), 3, { color: 'danger', n: 60 }); curve(S, 'wd', P, t => 1.4 * (1 - Math.exp(-t / 14)), 3, { color: 'ok', n: 60 });
      lbl(S, 'ndl', P.X(55), P.Y(3) - .65, ['감쇠 없음', 'no decay'], 'r', 3); lbl(S, 'wdl', P.X(55), P.Y(1.4) - .65, ['감쇠 있음: 작게 유지', 'with decay: kept small'], 'g', 3);
      lbl(S, 'aw', 19.4, 11.2, ['Adam에 L2를 섞으면 v로 나눠져 감쇠가 들쭉날쭉해요 · AdamW는 w ← w − lr·λ·w를 따로 해요', 'mixing L2 into Adam divides it by √v, making decay uneven; AdamW applies w ← w − lr·λ·w separately'], 'w', 4, { w: 12.0 });
    },
    notes: [['가중치 감쇠는 손실에 λ/2·‖w‖²을 더해 큰 가중치에 벌점을 줘요 · 기울기에 λ·w가 더해져 매 스텝 가중치가 0 쪽으로 조금씩 줄어요', 'weight decay adds λ/2·‖w‖² to the loss, penalizing large weights; the gradient gains a λ·w term that nudges weights toward zero every step'], ['데이터 손실만 보면 최솟값은 w*이지만, ‖w‖²의 원과 균형을 맞춘 점으로 옮겨져요 · λ = 1이면 (2, 1.2)가 (1, 0.96)이 돼요', 'the data loss alone is minimized at w*, but the optimum moves to where it balances the ‖w‖² circles: with λ = 1, (2, 1.2) becomes (1, 0.96)'], ['가중치가 작게 유지되면 입력의 작은 변화에 덜 민감해 과적합이 줄어요', 'keeping weights small makes the model less sensitive to tiny input changes, reducing overfitting'], ['Adam에 L2 항을 그냥 섞으면 √v로 나뉘어 감쇠가 파라미터마다 달라져요 · AdamW는 감쇠를 따로 적용해서 지금의 표준이에요', 'mixing L2 into Adam divides it by √v and makes the decay uneven across parameters, so AdamW applies decay separately and is now the standard']],
    fin: [['가중치 감쇠: 큰 가중치에 벌점 → 과적합 감소', 'weight decay penalizes large weights to reduce overfitting', 'dlx-xs dlx-a'], ['LLM은 보통 weight_decay 0.1 근처를 써요', 'LLMs commonly use weight_decay around 0.1'], ['편향과 정규화 층의 γ, β에는 보통 감쇠를 빼요', 'biases and normalization γ, β are usually excluded']],
    caps: [['데이터 손실의 최솟값', 'The data-loss minimum'], ['0 쪽으로 당기기', 'Pulling toward zero'], ['작은 가중치', 'Smaller weights'], ['AdamW', 'AdamW'], ['가중치 감쇠', 'Weight decay']]
  });
}

function sAug() {
  const A = [[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1]];
  const flip = A.map(r => r.slice().reverse()), crop = [...Array(8)].map((_, i) => [...Array(8)].map((_, j) => A[2 + (i >> 1)][2 + (j >> 1)]));
  const B = [[0, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 0]];
  const cs = .5, mix = A.map((r, i) => r.map((v, j) => .7 * v + .3 * B[i][j]));
  return CW('dl-augment', {
    code: ['T.Compose([', '    T.RandomResizedCrop(224),', '    T.RandomHorizontalFlip(),', '    T.ColorJitter(0.4, 0.4, 0.4),', '])'],
    hl: [[2, 1, 'accent'], [1, 1, 'warn'], [3, 1, 'ok'], [0, 5, 'danger']],
    draw: (S) => {
      GR(S, 'o', 19.4, 1.0, cs, A, 'ink', 1); lbl(S, 'ol', 19.4, .3, ['원본', 'original'], 'm', 1);
      GR(S, 'f', 25.4, 1.0, cs, flip, 'accent', 1); lbl(S, 'fl', 25.4, .3, ['좌우 뒤집기', 'horizontal flip'], 'm a', 1);
      GR(S, 'c', 19.4, 6.0, cs, crop, 'warn', 2); lbl(S, 'cl', 19.4, 5.3, ['잘라서 키우기', 'crop and resize'], 'm w', 2);
      GR(S, 'j', 25.4, 6.0, cs, A, 'ok', 3); lbl(S, 'jl', 25.4, 5.3, ['밝기·색 바꾸기', 'color jitter'], 'm g', 3);
      lbl(S, 'same', 19.4, 10.6, ['모두 같은 정답 레이블: 모델이 본질만 보게 돼요', 'all keep the same label, so the model learns what matters'], 'a', 3, { w: 12.0 });
      GR(S, 'ma', 2.0, 8.0, cs, A, 'ink', 4); GR(S, 'mb', 7.0, 8.0, cs, B, 'ink', 4); GR(S, 'mm', 12.2, 8.0, cs, mix, 'danger', 4);
      T(S, 'p1', 6.0, 9.6, '+', 'cz-tc dlx-s', 4, { w: 1 }); T(S, 'p2', 11.1, 9.6, '=', 'cz-tc dlx-s', 4, { w: 1 });
      lbl(S, 'mxl', 1, 7.2, ['MixUp: 0.7 × 화살표 + 0.3 × 얼굴 → 레이블도 [0.7, 0.3]', 'MixUp: 0.7 × arrow + 0.3 × face → label [0.7, 0.3]'], 'r', 4, { w: 16.2 });
    },
    notes: [['데이터를 더 모으기 어려울 때, 정답이 바뀌지 않는 변형으로 학습 데이터를 매번 새롭게 만들어요', 'when more data is hard to get, label-preserving transformations generate fresh training examples every epoch'], ['무작위로 잘라 크기를 맞추면 물체의 위치와 크기가 바뀌어도 알아보게 돼요', 'random crops resized to the input size teach the model to recognize objects at different positions and scales'], ['좌우 뒤집기, 밝기·대비·색 바꾸기도 정답은 같아요 · 모델은 조명이나 방향 같은 사소한 차이 대신 본질을 배워요', 'flips and brightness, contrast or color changes keep the label too, so the model learns essentials instead of lighting or orientation'], ['MixUp은 두 이미지를 섞고 레이블도 같은 비율로 섞어요 · 경계가 부드러워지고 과신이 줄어요', 'MixUp blends two images and their labels in the same ratio, smoothing decision boundaries and curbing overconfidence']],
    fin: [['데이터 증강: 정답을 바꾸지 않는 변형으로 데이터를 늘려요', 'data augmentation: expand the data with label-preserving transformations', 'dlx-xs dlx-a'], ['숫자 6과 9처럼 뒤집으면 뜻이 바뀌는 경우는 조심해요', 'beware transformations that change meaning, like flipping 6 into 9'], ['증강은 학습 때만, 검증·테스트에서는 하지 않아요', 'augment only during training, never for validation or testing']],
    caps: [['뒤집기', 'Flipping'], ['잘라 키우기', 'Cropping'], ['색 바꾸기', 'Color jitter'], ['MixUp', 'MixUp'], ['데이터 증강', 'Data augmentation']]
  });
}

function sSmooth() {
  const P = PF(3.0, 8.0, 14.0, 5.0, 0, 8, 0, 1.6), pc = g => Math.exp(g) / (Math.exp(g) + 3);
  const oh = g => -Math.log(pc(g)), sm = g => -(.925 * Math.log(pc(g)) + .075 * Math.log(1 / (Math.exp(g) + 3)));
  const bars = (k, y, vals, c, st) => vals.forEach((v, i) => { rect(S0, k + i, 19.6 + i * 2.8, y + 3.0 - v * 3.0, 2.0, Math.max(.04, v * 3.0), c, 55, st, { r: .08 }); T(S0, k + 'v' + i, 19.2 + i * 2.8, y + 3.05, v ? String(v) : '0', 'cz-mono cz-tc dlx-tiny', st, { w: 2.8 }); });
  let S0;
  return CW('dl-label-smooth', {
    code: ['F.cross_entropy(z, y, label_smoothing=0.1)', ['# 정답 1 → 0.925, 나머지 0 → 0.025 (K = 4)', '# answer 1 → 0.925, others 0 → 0.025 (K = 4)'], ['# logit을 끝없이 키우지 않아요', '# no endless push on the logits'], ['# 확신도와 정확도가 잘 맞아요', '# confidence matches accuracy better']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      lbl(S, 'ot', 19.2, .2, ['원-핫 정답', 'one-hot target'], 'm', 1); bars('o', .6, [0, 0, 1, 0], 'danger', 1);
      lbl(S, 'st', 19.2, 4.8, ['스무딩 정답 (ε = 0.1)', 'smoothed target (ε = 0.1)'], 'm g', 2); bars('s', 5.2, [.025, .025, .925, .025], 'ok', 2);
      axes(S, 'ax', P, 3); ticks(S, 'tk', P, [[3.61, '3.61'], [8, '8']], [[1, '1']], 3); lbl(S, 'yl', 1, 7.3, ['손실 (정답 logit 차이에 따라)', 'loss vs the true-class logit gap'], 'm', 3);
      curve(S, 'oh', P, oh, 3, { color: 'danger', n: 80 }); curve(S, 'sm', P, sm, 3, { color: 'ok', n: 80, h: .11 });
      vl(S, 'mn', P.X(3.61), P.Y(sm(3.61)), P.Y(0), 'ok', 3, { w: .06, dash: 1 });
      lbl(S, 'ohl', 19.2, 9.4, ['원-핫: 차이를 키울수록 계속 좋아져 끝없이 과신', 'one-hot: a bigger gap always helps, so confidence grows forever'], 'r', 3, { w: 12.4 });
      lbl(S, 'sml', 19.2, 10.9, ['스무딩: ln(0.925/0.025) = 3.61에서 멈춰요', 'smoothed: the optimum stops at ln(0.925/0.025) = 3.61'], 'g', 3, { w: 12.4 });
      lbl(S, 'cal', 19.2, 12.4, ['90% 확신이면 실제로도 90% 맞도록 (보정)', 'so 90% confidence really means 90% right (calibration)'], 'a', 4, { w: 12.4 });
    },
    notes: [['보통의 정답은 원-핫이라 정답 클래스는 1, 나머지는 0이에요', 'ordinary targets are one-hot: 1 for the true class, 0 for the rest'], ['레이블 스무딩은 ε만큼을 모든 클래스에 나눠 줘요 · K = 4, ε = 0.1이면 정답은 0.925, 나머지는 0.025가 돼요', 'label smoothing spreads ε over all classes: with K = 4 and ε = 0.1, the answer becomes 0.925 and the others 0.025'], ['원-핫을 맞추려면 정답 확률이 정확히 1이어야 해서 logit 차이를 끝없이 키우려 해요 · 스무딩하면 차이 3.61에서 손실이 최소예요', 'matching a one-hot target needs a probability of exactly 1, so the logit gap is pushed forever; with smoothing the loss bottoms out at a gap of 3.61'], ['모델이 과하게 확신하지 않게 되어 확신도와 실제 정확도가 더 잘 맞아요 · 이미지 분류와 번역 모델에서 흔히 써요', 'the model stops being overconfident, so its confidence lines up better with its accuracy; common in image classification and translation']],
    fin: [['레이블 스무딩: 정답 (1 − ε) + ε/K, 나머지 ε/K', 'label smoothing: answer (1 − ε) + ε/K, others ε/K', 'dlx-xs dlx-a'], ['ε = 0.1이 흔해요', 'ε = 0.1 is common'], ['지식 증류에 쓰는 부드러운 정답과도 비슷한 생각이에요', 'similar in spirit to the soft targets of knowledge distillation']],
    caps: [['원-핫 정답', 'One-hot targets'], ['부드러운 정답', 'Smoothed targets'], ['끝없는 과신', 'Endless overconfidence'], ['보정', 'Calibration'], ['레이블 스무딩', 'Label smoothing']]
  });
}
/* ===== Deep learning · 4. convolutional networks in depth ===== */
function sConvShape() {
  const cs = .55, gx = 19.4, gy = 1.0, inp = [...Array(7)].map((_, i) => [...Array(7)].map((_, j) => (i === 0 || j === 0 || i === 6 || j === 6) ? 0 : .25 + .12 * ((i * 5 + j * 3) % 6)));
  const out5 = [...Array(5)].map((_, i) => [...Array(5)].map((_, j) => .3 + .1 * ((i * 2 + j * 7) % 6))), out3 = [...Array(3)].map((_, i) => [...Array(3)].map((_, j) => .3 + .15 * ((i + j * 2) % 4)));
  return CW('dl-conv-shape', {
    code: ['nn.Conv2d(3, 64, 3, padding=1)  # 32 → 32', ['# 출력 = ⌊(W − K + 2P) / S⌋ + 1', '# out = ⌊(W − K + 2P) / S⌋ + 1'], '(32 - 3 + 2) // 1 + 1           # 32', '(32 - 3 + 2) // 2 + 1           # 16', ['# 파라미터: 64·3·3·3 + 64 = 1,792', '# parameters: 64·3·3·3 + 64 = 1,792']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      GR(S, 'in', gx, gy, cs, inp, 'accent', 1); lbl(S, 'inl', gx, gy + 7 * cs + .2, ['입력 5×5 + 패딩 1', 'input 5×5 + padding 1'], 'm', 1);
      frame(S, 'kf1', gx - .05, gy - .05, 3 * cs + .06, 3 * cs + .06, 'warn', 1, { w: .1, r: .1 });
      GR(S, 'o5', 25.6, 1.55, cs, out5, 'ok', 1, { off: 3 }); frame(S, 'o5c', 25.55, 1.5, cs + .06, cs + .06, 'warn', 1, { w: .1, r: .08, off: 3 }); lbl(S, 'o5l', 24.4, 4.6, ['출력 5×5 (stride 1)', 'output 5×5 (stride 1)'], 'g', 1, { off: 3 });
      F(S, 'f1', 1, 7.4, '(5 − 3 + 2·1) / 1 + 1 = 5', 'g', 2); lbl(S, 'f1n', 1, 8.6, ['패딩 1이면 3×3 합성곱 뒤에도 크기가 그대로예요', 'with padding 1, a 3×3 convolution keeps the size'], '', 2);
      frame(S, 'kf2', gx - .05 + 2 * cs, gy - .05, 3 * cs + .06, 3 * cs + .06, 'warn', 3, { w: .08, r: .1, dash: 1 });
      GR(S, 'o3', 25.6, 1.55, cs, out3, 'warn', 3); lbl(S, 'o3l', 24.4, 4.6, ['출력 3×3 (stride 2)', 'output 3×3 (stride 2)'], 'w', 3);
      F(S, 'f2', 1, 9.9, '⌊(5 − 3 + 2) / 2⌋ + 1 = 3', 'w', 3); lbl(S, 'f2n', 1, 11.1, ['stride 2는 두 칸씩 건너뛰어 크기를 절반으로', 'stride 2 skips every other position, halving the size'], '', 3);
      lbl(S, 'pr', 19.4, 6.4, ['가중치는 위치마다 공유돼요: 3×3 × 입력 3채널 × 출력 64채널 + 편향 64 = 1,792개', 'weights are shared across positions: 3×3 × 3 in × 64 out + 64 biases = 1,792'], 'a', 4, { w: 12.0 });
      lbl(S, 'pr2', 19.4, 8.6, ['같은 크기의 완전 연결 층이면 3072 × 65536 ≈ 2억 개', 'a fully connected layer of the same size would need 3072 × 65536 ≈ 200 million'], 'r', 4, { w: 12.0 });
    },
    notes: [['합성곱 층은 작은 커널(예: 3×3)을 입력 위로 밀며 같은 가중치로 곱해 더해요 · 테두리를 0으로 채우는 것이 패딩이에요', 'a convolution slides a small kernel such as 3×3 across the input, multiplying and summing with the same weights; padding fills the border with zeros'], ['출력 크기는 ⌊(W − K + 2P)/S⌋ + 1이에요 · 3×3, 패딩 1, stride 1이면 크기가 그대로라 층을 쌓기 편해요', 'the output size is ⌊(W − K + 2P)/S⌋ + 1, so a 3×3 kernel with padding 1 and stride 1 keeps the size, which makes stacking easy'], ['stride 2는 두 칸씩 건너뛰며 계산해 가로세로를 절반으로 줄여요 · 32×32가 16×16이 돼요', 'stride 2 computes at every other position and halves the width and height: 32×32 becomes 16×16'], ['가중치를 위치마다 공유해서 파라미터가 적어요 · Conv2d(3, 64, 3)은 1,792개뿐이지만 같은 연결을 완전 연결로 만들면 약 2억 개예요', 'sharing weights across positions keeps parameters few: Conv2d(3, 64, 3) has only 1,792, whereas a fully connected equivalent would need about 200 million']],
    fin: [['합성곱 출력 크기: ⌊(W − K + 2P)/S⌋ + 1', 'conv output size: ⌊(W − K + 2P)/S⌋ + 1', 'dlx-xs dlx-a'], ['파라미터: K × K × C_in × C_out + C_out', 'parameters: K × K × C_in × C_out + C_out'], ['padding="same"이면 stride 1에서 크기를 유지해요', 'padding="same" keeps the size at stride 1']],
    caps: [['커널과 패딩', 'Kernel and padding'], ['출력 크기 공식', 'The output-size formula'], ['stride 2', 'Stride 2'], ['가중치 공유', 'Weight sharing'], ['합성곱의 모양 계산', 'Convolution shape arithmetic']]
  });
}

function sReceptive() {
  const cs = .78, x0 = 19.6, ys = [7.4, 5.4, 3.4, 1.4], P = PF(3.0, 8.0, 13.6, 4.8, 1, 6, 0, 130);
  const span = l => [6 - l, 6 + l];
  return CW('dl-receptive', {
    code: [['# 3×3 합성곱을 쌓으면 수용 영역이 커져요', '# stacking 3×3 convs widens the view'], ['# 1층: 3, 2층: 5, 3층: 7  (RF = 1 + 2L)', '# layer 1: 3, 2: 5, 3: 7  (RF = 1 + 2L)'], ['# 3×3 두 번 = 5×5 한 번 (18C² vs 25C²)', '# two 3×3 = one 5×5 (18C² vs 25C²)'], ['# stride 2를 섞으면 훨씬 빨리 넓어져요', '# mixing in stride 2 widens it much faster']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 1, 'accent']],
    draw: (S) => {
      ys.forEach((y, l) => { GR(S, 'r' + l, x0, y, cs, [[...Array(13)].map((_, j) => (l === 3 ? j === 6 : j >= span(3 - l)[0] && j <= span(3 - l)[1]) ? .7 : .08)], l === 0 ? 'warn' : 'accent', 0); T(S, 'rl' + l, x0 - 1.4, y + .05, l ? (l + '') : ['입력', 'in'], 'cz-mono dlx-xs', 0, { w: 1.3 }); });
      const link = (l, st) => SV(S, 'ln' + l, [...Array(2 * (3 - l) + 1)].flatMap((_, i) => { const j = 6 - (3 - l) + i, cx = x0 + j * cs + cs / 2; return [-1, 0, 1].map(d => zW([[cx, ys[l] + cs], [x0 + (j + d) * cs + cs / 2, ys[l - 1]]], 'ok', .04)); }), st);
      link(3, 1); link(2, 2); link(1, 3);
      lbl(S, 'l1', 30.2, 3.0, 'RF 3', 'm g', 1); lbl(S, 'l2', 30.2, 5.0, 'RF 5', 'm g', 2); lbl(S, 'l3', 30.2, 7.0, 'RF 7', 'm g', 3);
      lbl(S, 'top', 19.4, .4, ['맨 위 한 칸이 보는 입력 범위', 'how much input one top cell sees'], 'm', 1);
      axes(S, 'ax', P, 4); ticks(S, 'tk', P, [[2, '2'], [4, '4'], [6, ['6층', '6 layers']]], [[13, '13'], [127, '127']], 4); lbl(S, 'yl', 1, 6.9, ['수용 영역 (칸)', 'receptive field (cells)'], 'm', 4);
      curve(S, 'lin', P, L => 1 + 2 * L, 4, { color: 'ok', n: 20 }); curve(S, 'exp', P, L => Math.pow(2, L + 1) - 1, 4, { color: 'accent', n: 60 });
      lbl(S, 'linl', 19.4, 9.2, ['초록: 3×3만 쌓기 → 1 + 2L (선형)', 'green: 3×3 only → 1 + 2L (linear)'], 'g', 4, { w: 12.0 }); lbl(S, 'expl', 19.4, 10.4, ['파랑: 층마다 stride 2 → 2^(L+1) − 1 (지수)', 'blue: stride 2 each layer → 2^(L+1) − 1 (exponential)'], 'a', 4, { w: 12.0 });
    },
    notes: [['수용 영역은 출력 한 칸이 영향을 받는 입력의 범위예요 · 3×3 합성곱 한 층은 입력 3칸을 봐요', 'the receptive field is the span of input that affects one output cell; a single 3×3 convolution sees 3 cells'], ['두 층을 쌓으면 위 칸이 아래 3칸을 보고, 그 3칸이 각각 3칸씩 봐서 5칸이 돼요', 'stack two layers and the top cell sees 3 cells below, each of which sees 3, for a span of 5'], ['세 층이면 7칸 · 3×3 두 번은 5×5 한 번과 같은 범위를 보면서도 파라미터는 18C²로 25C²보다 적고 비선형성은 하나 더 들어가요', 'three layers reach 7; two 3×3 layers cover the same span as one 5×5 with fewer parameters, 18C² versus 25C², plus an extra nonlinearity'], ['stride 2나 풀링을 섞으면 층마다 범위가 두 배씩 넓어져요 · 그래서 CNN은 앞쪽에서 가장자리, 뒤쪽에서 물체 전체를 봐요', 'mixing in stride 2 or pooling doubles the span each layer, which is why CNNs see edges early and whole objects late']],
    fin: [['수용 영역: 3×3을 L번 쌓으면 1 + 2L, 다운샘플링으로 빠르게 커져요', 'receptive field: 1 + 2L for L stacked 3×3 layers, growing fast with downsampling', 'dlx-xs dlx-a'], ['VGG가 3×3만 쌓은 이유예요', 'why VGG stacks only 3×3 kernels'], ['팽창(dilated) 합성곱도 범위를 넓히는 방법이에요', 'dilated convolutions widen the field too']],
    caps: [['1층', 'One layer'], ['2층', 'Two layers'], ['3층', 'Three layers'], ['다운샘플링', 'Downsampling'], ['수용 영역', 'Receptive fields']]
  });
}

function sDepthwise() {
  const sl = (k, x, y, c, st, n = 4) => [...Array(n)].forEach((_, i) => rect(S0, k + i, x + i * .35, y + i * .35, 2.0, 2.0, c, 14 + i * 8, st, { r: .1, css: 'border:.05em solid var(--' + c + ')' }));
  let S0;
  return CW('dl-depthwise', {
    code: ['nn.Conv2d(128, 128, 3)              # 147,456', 'nn.Conv2d(128, 128, 3, groups=128)  # 1,152', 'nn.Conv2d(128, 128, 1)              # 16,384', ['# 깊이별 3×3 + 점별 1×1', '# depthwise 3×3 + pointwise 1×1'], ['# 합 17,536 → 약 8.4배 적어요', '# total 17,536 → about 8.4× fewer']],
    hl: [[0, 1, 'danger'], [1, 1, 'ok'], [2, 1, 'accent'], [3, 2, 'warn']],
    draw: (S) => {
      S0 = S;
      sl('a', 19.4, .6, 'danger', 1); lbl(S, 'al', 23.2, 1.2, ['일반 합성곱: 출력 채널 하나가 입력 128채널 전부를 3×3으로 봐요', 'standard: each output channel looks at all 128 input channels through 3×3'], 'r', 1, { w: 8.2 });
      sl('b', 19.4, 4.6, 'ok', 2); lbl(S, 'bl', 23.2, 5.2, ['깊이별: 채널마다 자기 3×3 하나씩 (섞지 않음)', 'depthwise: one 3×3 per channel, no mixing'], 'g', 2, { w: 8.2 });
      [...Array(4)].forEach((_, i) => rect(S, 'p' + i, 19.4 + i * .35, 8.6 + i * .35, .5, .5, 'accent', 60, 3, { r: .05 }));
      lbl(S, 'pl', 23.2, 8.6, ['1×1(점별): 한 위치에서 채널들을 섞어요', '1×1 (pointwise): mixes channels at each position'], 'a', 3, { w: 8.2 });
      lbl(S, 'bt', 1, 6.8, ['파라미터 수', 'parameter count'], 'm', 4);
      rect(S, 'pb1', 1.0, 7.5, 15.0, .8, 'danger', 55, 4, { r: .1 }); lbl(S, 'pb1l', 1.2, 7.55, ['일반 147,456', 'standard 147,456'], 'm', 4);
      rect(S, 'pb2', 1.0, 8.7, 15.0 * 17536 / 147456, .8, 'ok', 55, 4, { r: .1 }); lbl(S, 'pb2l', 3.0, 8.75, ['깊이별 + 1×1 = 17,536', 'depthwise + 1×1 = 17,536'], 'm g', 4);
      lbl(S, 'mb', 1, 10.2, ['MobileNet·EfficientNet이 이 블록으로 휴대폰에서 돌아가요', 'MobileNet and EfficientNet run on phones with these blocks'], 'a', 4, { w: 16.0 });
    },
    notes: [['일반 합성곱은 출력 채널 하나마다 입력의 모든 채널을 3×3으로 봐요 · 128 → 128채널이면 3·3·128·128 = 147,456개의 가중치예요', 'a standard convolution has every output channel look at all input channels through 3×3: 128 to 128 channels means 3·3·128·128 = 147,456 weights'], ['깊이별 합성곱은 채널마다 자기 3×3 커널 하나만 써요 · 공간 패턴만 보고 채널은 섞지 않아서 1,152개면 돼요', 'a depthwise convolution gives each channel its own single 3×3 kernel, capturing spatial patterns without mixing channels, for only 1,152 weights'], ['이어지는 1×1 합성곱이 각 위치에서 채널들을 섞어요 · 128·128 = 16,384개예요', 'a following 1×1 convolution mixes the channels at each position, with 128·128 = 16,384 weights'], ['둘을 합쳐도 17,536개라 약 8.4배 가벼워요 · 성능은 조금 손해지만 MobileNet, EfficientNet처럼 휴대폰에서 도는 모델의 핵심이에요', 'together they total 17,536, about 8.4 times lighter, trading a little accuracy for the efficiency behind phone-friendly models like MobileNet and EfficientNet']],
    fin: [['깊이별 분리 합성곱 = 깊이별 3×3 + 1×1', 'depthwise separable convolution = depthwise 3×3 + pointwise 1×1', 'dlx-xs dlx-a'], ['1×1 합성곱은 채널 수를 줄이거나 늘리는 데도 써요', '1×1 convolutions also shrink or expand channel counts'], ['groups 인자로 깊이별·그룹 합성곱을 만들어요', 'the groups argument builds depthwise and grouped convolutions']],
    caps: [['일반 합성곱', 'Standard convolution'], ['깊이별 합성곱', 'Depthwise convolution'], ['1×1 합성곱', '1×1 convolution'], ['파라미터 비교', 'Parameter comparison'], ['깊이별 분리 합성곱', 'Depthwise separable convolution']]
  });
}

function sArchs() {
  const P = PF(3.0, 7.6, 14.0, 5.2, 0, 5, 0, 17), data = [['AlexNet', 15.3, 2012, 'danger'], ['VGG', 7.3, 2014, 'warn'], ['GoogLeNet', 6.7, 2014, 'warn'], ['ResNet', 3.57, 2015, 'ok']];
  return CW('dl-archs', {
    code: ['from torchvision import models', 'models.alexnet()   # 2012 · 61M', 'models.vgg16()     # 2014 · 138M', 'models.resnet50()  # 2015 · 25.6M', 'models.vit_b_16()  # 2020 · 86M'],
    hl: [[1, 1, 'danger'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 1, { noy: 1 }); vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 1, { w: .06 }); ticks(S, 'tk', P, [], [[5, '5%'], [15, '15%']], 1);
      lbl(S, 'yl', 1, 6.9, ['ImageNet top-5 오류율', 'ImageNet top-5 error'], 'm', 1);
      data.forEach(([n, e, y, c], i) => { const st = [1, 2, 2, 3][i]; rect(S, 'b' + i, P.X(i + .6) - .7, P.Y(e), 1.4, P.Y(0) - P.Y(e), c, 60, st, { r: .08 }); T(S, 'bn' + i, P.X(i + .6) - 1.6, P.Y(0) + .15, n, 'cz-mono cz-tc dlx-tiny', st, { w: 3.2 }); T(S, 'be' + i, P.X(i + .6) - 1.2, P.Y(e) - .6, e + '%', 'cz-mono cz-tc dlx-tiny', st, { w: 2.4 }); });
      hl(S, 'hum', P.x0, P.x0 + P.w, P.Y(5.1), 'accent', 3, { w: .06, dash: 1 }); lbl(S, 'huml', P.X(3.9), P.Y(5.1) - .62, ['사람 약 5.1%', 'human ≈ 5.1%'], 'a', 3);
      [[['2012 AlexNet: GPU, ReLU, 드롭아웃 → 딥러닝의 시작', '2012 AlexNet: GPUs, ReLU and dropout kick off deep learning'], 'r'], [['2014 VGG: 3×3만 깊게 · GoogLeNet: 인셉션 블록', '2014 VGG: deep stacks of 3×3; GoogLeNet: inception blocks'], 'w'], [['2015 ResNet: 잔차 연결로 152층, 사람보다 낮은 오류', '2015 ResNet: residuals reach 152 layers, below human error'], 'g'], [['2020 ViT: 이미지를 16×16 패치로 잘라 트랜스포머에', '2020 ViT: 16×16 patches fed to a transformer'], 'a']].forEach(([t, c], i) => lbl(S, 'tl' + i, 19.5, .5 + i * 1.9, t, c, i + 1, { w: 11.8 }));
      [1, 2, 3, 4].forEach(i => rect(S, 'hlt' + i, 19.2, .45 + (i - 1) * 1.9, .12, 1.4, ['danger', 'warn', 'ok', 'accent'][i - 1], 80, i, { r: .05 }));
    },
    notes: [['2012년 AlexNet은 GPU로 큰 CNN을 학습해 ImageNet top-5 오류율을 15.3%로 크게 낮췄어요 · ReLU와 드롭아웃도 이때 널리 퍼졌어요', 'in 2012 AlexNet trained a large CNN on GPUs and cut the ImageNet top-5 error to 15.3%, popularizing ReLU and dropout along the way'], ['2014년 VGG는 3×3 합성곱만 깊게 쌓아 7.3%, GoogLeNet은 여러 크기의 커널을 나란히 쓰는 인셉션 블록으로 6.7%를 냈어요', 'in 2014 VGG reached 7.3% by stacking only 3×3 convolutions deeply, and GoogLeNet hit 6.7% with inception blocks running several kernel sizes in parallel'], ['2015년 ResNet은 잔차 연결로 152층을 학습해 3.57%로 사람의 약 5.1%보다 낮아졌어요', 'in 2015 ResNet trained 152 layers with residual connections and reached 3.57%, below the roughly 5.1% human estimate'], ['2020년 ViT는 이미지를 16×16 패치로 잘라 트랜스포머에 넣었어요 · 데이터가 많으면 CNN 못지않고, 지금은 둘을 섞은 구조도 많아요', 'in 2020 ViT cut images into 16×16 patches for a transformer, matching CNNs given enough data, and hybrids of the two are now common']],
    fin: [['CNN의 흐름: 더 깊게(VGG), 더 넓게(Inception), 지름길(ResNet), 그리고 트랜스포머(ViT)', 'the CNN story: deeper (VGG), wider (Inception), shortcuts (ResNet), then transformers (ViT)', 'dlx-xs dlx-a'], ['ResNet-50은 지금도 기준 모델로 많이 써요', 'ResNet-50 remains a common baseline'], ['파라미터 수가 많다고 꼭 더 정확하진 않아요', 'more parameters does not automatically mean more accuracy']],
    caps: [['AlexNet', 'AlexNet'], ['VGG와 GoogLeNet', 'VGG and GoogLeNet'], ['ResNet', 'ResNet'], ['ViT', 'ViT'], ['대표 CNN 구조의 흐름', 'Landmark CNN architectures']]
  });
}

function sTransfer() {
  const ly = [['conv1', ['가장자리', 'edges']], ['layer1', ['질감', 'textures']], ['layer2', ['무늬', 'patterns']], ['layer3', ['부분', 'parts']], ['layer4', ['물체', 'objects']]];
  return CW('dl-transfer', {
    code: ['m = models.resnet50(weights="IMAGENET1K_V2")', 'for p in m.parameters():', ['    p.requires_grad = False  # 몸통 고정', '    p.requires_grad = False  # freeze'], ['m.fc = nn.Linear(2048, 10)   # 새 머리', 'm.fc = nn.Linear(2048, 10)   # new head'], ['# 데이터가 많으면 위층부터 풀어요', '# with more data, unfreeze from the top']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      ly.forEach(([n, f], i) => { nb(S, 'l' + i, 19.4, 11.0 - i * 1.9, 4.8, 1.4, n, 'accent', 1); lbl(S, 'f' + i, 24.6, 11.25 - i * 1.9, f, '', 1); });
      lbl(S, 'pre', 19.4, .3, ['ImageNet 120만 장으로 미리 학습된 몸통', 'pretrained on 1.2M ImageNet images'], 'a', 1, { w: 12.0 });
      ly.forEach((_, i) => rect(S, 'lk' + i, 19.2, 11.0 - i * 1.9, 5.2, 1.4, 'ink', 30, 2, { r: .2, off: i >= 3 ? 4 : 0 }));
      lbl(S, 'frz', 28.0, 7.0, ['고정 (학습 안 함)', 'frozen (not trained)'], 'm', 2, { w: 3.4 });
      chip(S, 'head', 19.4, 1.5, 4.8, ['새 머리 fc', 'new head fc'], 'ok', 3, { h: 1.2 }); lbl(S, 'headl', 24.6, 1.6, ['이것만 학습', 'train only this'], 'g', 3);
      lbl(S, 'ft', 28.0, 3.4, ['데이터가 많으면 위층 2개도 작은 학습률로 미세 조정', 'with more data, fine-tune the top two at a low rate'], 'w', 4, { w: 3.4 });
      lines(S, 'why', 1, 7.4, [[['아래층의 가장자리·질감은 거의 모든 이미지에 통해요', 'low-level edges and textures apply to almost any image'], ''], [['그래서 적은 데이터로도 빠르게 높은 정확도', 'so small datasets still reach high accuracy quickly'], 'g'], [['LLM의 사전 학습 → 미세 조정도 같은 흐름이에요', 'LLM pretraining then fine-tuning follows the same pattern'], 'a']], 3, 0, { lh: 1.3, w: 16.0 });
    },
    notes: [['전이 학습은 큰 데이터로 미리 학습한 모델을 가져와 내 문제에 맞게 고쳐 써요 · ImageNet 120만 장으로 학습된 ResNet이 흔한 출발점이에요', 'transfer learning reuses a model pretrained on a big dataset and adapts it to your problem; a ResNet trained on 1.2 million ImageNet images is a common start'], ['몸통의 파라미터를 고정하면 이미 배운 특징을 그대로 쓰고, 계산과 과적합 위험도 줄어요', 'freezing the body keeps the features it already learned while cutting computation and overfitting risk'], ['마지막 분류 층만 내 클래스 수(예: 10)에 맞게 새로 만들어 학습해요 · 아래층이 배운 가장자리·질감은 거의 모든 이미지에 통하기 때문이에요', 'only a new final layer sized to your classes, say 10, is trained, because the edges and textures learned below transfer to almost any image'], ['데이터가 더 있으면 위층부터 조금씩 풀어 작은 학습률로 미세 조정해요 · LLM의 사전 학습과 미세 조정도 같은 생각이에요', 'with more data, unfreeze from the top down and fine-tune at a small learning rate, the same idea as pretraining and fine-tuning LLMs']],
    fin: [['전이 학습: 사전 학습된 몸통 + 새 머리', 'transfer learning: a pretrained body plus a new head', 'dlx-xs dlx-a'], ['입력 정규화는 사전 학습 때와 같게 맞춰요', 'match the input normalization used in pretraining'], ['도메인이 아주 다르면(의료 영상 등) 더 많이 풀어야 해요', 'very different domains, such as medical images, need more unfreezing']],
    caps: [['사전 학습된 몸통', 'A pretrained body'], ['고정하기', 'Freezing'], ['새 머리', 'A new head'], ['미세 조정', 'Fine-tuning'], ['전이 학습', 'Transfer learning']]
  });
}

function sDetect() {
  const k = .85, ox = 19.6, oy = .9, B = (x1, y1, x2, y2) => [ox + x1 * k, oy + y1 * k, (x2 - x1) * k, (y2 - y1) * k];
  const box = (key, b, c, st, o = {}) => frame(S0, key, b[0], b[1], b[2], b[3], c, st, { w: .1, r: .05, dash: o.dash, off: o.off });
  let S0;
  return CW('dl-detect', {
    code: [['def iou(a, b):  # 상자 = (x1, y1, x2, y2)', 'def iou(a, b):  # box = (x1, y1, x2, y2)'], '    iw = min(a[2], b[2]) - max(a[0], b[0])', '    ih = min(a[3], b[3]) - max(a[1], b[1])', '    i = max(iw, 0) * max(ih, 0)', '    return i / (area(a) + area(b) - i)'],
    hl: [[0, 1], [1, 3, 'ok'], [4, 1, 'accent'], [0, 5, 'warn']],
    draw: (S) => {
      S0 = S;
      const A = B(0, 0, 4, 4), Bb = B(2, 2, 6, 6), I = B(2, 2, 4, 4);
      box('a', A, 'accent', 1, { off: 3 }); box('b', Bb, 'warn', 1, { off: 3 }); lbl(S, 'al', A[0] + .15, A[1] + .1, 'A', 'm a', 1, { off: 3 }); lbl(S, 'bl', Bb[0] + Bb[2] - .7, Bb[1] + Bb[3] - .75, 'B', 'm w', 1, { off: 3 });
      rect(S, 'in', I[0], I[1], I[2], I[3], 'ok', 45, 2, { r: 0, off: 3 }); lbl(S, 'inl', 25.4, 1.2, ['교집합 = 4', 'intersection = 4'], 'g', 2, { off: 3 }); lbl(S, 'unl', 25.4, 2.4, ['합집합 = 28', 'union = 28'], 'a', 2, { off: 3 });
      F(S, 'iou', 1, 7.4, 'IoU = 4 / 28 = 0.14', 'g', 2); lbl(S, 'ioun', 1, 8.6, ['보통 IoU ≥ 0.5면 같은 물체를 맞혔다고 봐요', 'IoU ≥ 0.5 usually counts as hitting the object'], '', 2);
      const d = [[B(0, 1, 4.6, 5.4), '0.9', 'ok'], [B(.6, 1.4, 5.2, 5.8), '0.8', 'danger'], [B(-.3, 1.2, 4.1, 5.9), '0.6', 'danger'], [B(6.6, 1.6, 11.0, 6.4), '0.7', 'ok']];
      d.forEach(([b, sc, c], i) => { box('d' + i, b, i ? (i === 3 ? 'accent' : 'warn') : 'accent', 3, { dash: i === 1 || i === 2 ? 1 : 0, off: c === 'danger' ? 4 : 0 }); const lp = [[19.7, 1.1], [b[0] + b[2] - .9, b[1] - .65], [18.45, 3.0], [b[0] + .1, b[1] - .65]][i]; lbl(S, 'ds' + i, lp[0], lp[1], sc, 'm', 3, { off: c === 'danger' ? 4 : 0 }); });
      lbl(S, 'nms', 19.4, 7.4, ['같은 물체에 상자가 여러 개 → 점수 높은 것부터 남기고, IoU > 0.5로 겹치는 나머지는 지워요(NMS)', 'several boxes per object → keep the highest score and delete others overlapping it by IoU > 0.5 (NMS)'], 'w', 3, { w: 12.0 });
      lbl(S, 'kept', 19.4, 9.6, ['남은 상자: 0.9(왼쪽 물체), 0.7(오른쪽 물체)', 'kept: 0.9 (left object) and 0.7 (right object)'], 'g', 4, { w: 12.0 });
      lbl(S, 'map', 1, 10.0, ['성능은 IoU 기준별 정밀도-재현율로 mAP를 매겨요 · YOLO, DETR 같은 모델이 상자와 클래스를 함께 예측해요', 'performance is scored as mAP over precision–recall at IoU thresholds; models such as YOLO and DETR predict boxes and classes together'], 'a', 4, { w: 16.0 });
    },
    notes: [['물체 검출은 무엇이 있는지와 함께 어디 있는지를 상자 (x1, y1, x2, y2)로 맞혀요 · 상자가 얼마나 맞았는지 IoU로 재요', 'object detection predicts what is present and where, as boxes (x1, y1, x2, y2), and IoU measures how well two boxes agree'], ['IoU는 교집합 넓이를 합집합 넓이로 나눈 값이에요 · 4×4 상자 두 개가 2×2만큼 겹치면 4 / 28 = 0.14라서 같은 물체로 보지 않아요', 'IoU divides the intersection area by the union area: two 4×4 boxes overlapping by 2×2 give 4 / 28 = 0.14, too little to count as the same object'], ['모델은 한 물체에 상자를 여러 개 내놓기 쉬워요 · 비최대 억제(NMS)는 점수 높은 상자부터 남기고 그것과 IoU 0.5 넘게 겹치는 상자를 지워요', 'models tend to emit several boxes per object, so non-maximum suppression (NMS) keeps the highest-scoring box and removes any overlapping it by IoU above 0.5'], ['그러면 물체마다 상자 하나씩 남아요 · 성능은 여러 IoU 기준에서 정밀도-재현율을 따져 mAP로 비교해요', 'that leaves one box per object, and models are compared by mAP, which averages precision–recall across IoU thresholds']],
    fin: [['IoU = 교집합 / 합집합 · NMS로 겹치는 상자 정리', 'IoU = intersection / union; NMS prunes overlapping boxes', 'dlx-xs dlx-a'], ['YOLO는 한 번에, Faster R-CNN은 후보 영역을 거쳐 검출해요', 'YOLO detects in one pass; Faster R-CNN goes through region proposals'], ['DETR은 NMS 없이 집합으로 바로 예측해요', 'DETR predicts a set of boxes directly, without NMS']],
    caps: [['두 상자', 'Two boxes'], ['IoU', 'IoU'], ['겹치는 예측', 'Overlapping predictions'], ['NMS 결과', 'After NMS'], ['물체 검출: IoU와 NMS', 'Object detection: IoU and NMS']]
  });
}
/* ===== Deep learning · 5. sequence models ===== */
function sRNN() {
  const P = PF(3.0, 8.4, 14.0, 4.6, 0, 50, -3, 0), cx = i => 19.4 + i * 2.45;
  return CW('dl-rnn', {
    code: ['h = torch.zeros(hidden)', ['for x_t in xs:  # 시간 순서대로', 'for x_t in xs:  # in time order'], '    h = torch.tanh(W_h @ h + W_x @ x_t + b)', ['# BPTT: 펼친 그래프로 역전파', '# BPTT: backprop through the unrolled graph'], '# |∂h₅₀/∂h₁| ≈ 0.9⁵⁰ ≈ 0.005'],
    hl: [[2, 1], [1, 2, 'accent'], [3, 1, 'danger'], [4, 1, 'warn']],
    draw: (S) => {
      chip(S, 'rc', 20.4, 1.0, 2.2, 'RNN', 'accent', 1); SV(S, 'loop', [`<path d="M22.6,1.3 C24.2,0.2 24.2,2.9 22.65,1.85" ${zst('accent', .07)}/>`, zA([22.9, 1.95], [22.65, 1.85], 'accent', .02)], 1, { off: 2 });
      lbl(S, 'rl', 24.6, 1.1, ['같은 가중치를 매 시점 다시 써요', 'the same weights reused at every step'], 'a', 1, { w: 6.6 });
      [...Array(5)].forEach((_, i) => { chip(S, 'h' + i, cx(i), 4.0, 1.8, 'h' + '₁₂₃₄₅'[i], 'accent', 2); chip(S, 'x' + i, cx(i), 6.4, 1.8, 'x' + '₁₂₃₄₅'[i], 'ink', 2); arw(S, 'u' + i, [cx(i) + .9, 6.4], [cx(i) + .9, 5.15], 2); if (i) arw(S, 'r' + i, [cx(i) - .65, 4.55], [cx(i), 4.55], 2); });
      lbl(S, 'ul', 19.4, 7.8, ['펼치면 시점마다 층이 하나씩 있는 깊은 망이에요', 'unrolled, it is a deep net with one layer per time step'], 'a', 2, { w: 12.0 });
      SV(S, 'bp', [...Array(4)].map((_, i) => zA([cx(4 - i) + .2, 3.55], [cx(3 - i) + 1.6, 3.55], 'danger', .08)), 3); lbl(S, 'bpl', 19.4, 2.95, ['기울기가 시간을 거슬러 가요', 'gradients travel back in time'], 'r', 3);
      axes(S, 'ax', P, 4); ticks(S, 'tk', P, [[25, '25'], [50, '50']], [[0, '1'], [-2.3, '0.005']], 4, { yb: P.y0 + P.h + .12 }); lbl(S, 'xl', P.x0, P.y0 + P.h + .7, ['몇 스텝 전 →', 'steps back →'], 'm', 4); lbl(S, 'yl', 1, 7.6, ['남는 기울기 (로그)', 'surviving gradient (log)'], 'm', 4);
      curve(S, 'g', P, k => k * Math.log10(.9), 4, { color: 'danger', n: 20 }); lbl(S, 'gl', 19.4, 9.4, ['매 시점 약 0.9배 → 50스텝 전 정보는 0.5%만 전달돼요 · 긴 문맥을 못 배워요', '×0.9 per step → only 0.5% reaches 50 steps back, so long contexts are lost'], 'r', 4, { w: 12.0 });
    },
    notes: [['순환 신경망(RNN)은 시퀀스를 한 시점씩 읽으며 은닉 상태 h에 지금까지의 정보를 요약해요 · 같은 가중치를 매 시점 다시 써요', 'a recurrent neural network reads a sequence one step at a time, summarizing what it has seen in a hidden state h and reusing the same weights each step'], ['시간 축으로 펼치면 시점마다 층이 하나씩 있는 깊은 망과 같아요 · 길이가 다른 입력도 처리할 수 있어요', 'unrolled through time it is a deep network with one layer per step, and it handles inputs of any length'], ['학습은 펼친 그래프 전체에 역전파를 하는 BPTT(시간 역전파)예요 · 기울기가 시간을 거슬러 앞쪽 시점까지 가요', 'training uses backpropagation through time (BPTT) over the unrolled graph, sending gradients back to earlier steps'], ['하지만 시점마다 기울기가 곱해져서 0.9배씩이면 50스텝 전에는 0.5%만 남아요 · 먼 과거를 잘 기억하지 못하는 이유예요', 'but gradients are multiplied at every step: at 0.9 each, only 0.5% survives 50 steps back, which is why plain RNNs forget the distant past']],
    fin: [['RNN: h_t = tanh(W_h·h_{t−1} + W_x·x_t + b) · 긴 의존성에 약해요', 'RNN: h_t = tanh(W_h·h_{t−1} + W_x·x_t + b), weak at long dependencies', 'dlx-xs dlx-a'], ['기울기 폭발에는 클리핑을 써요', 'clipping handles exploding gradients'], ['시점마다 순서대로라 병렬화가 어려워요', 'its step-by-step order resists parallelization']],
    caps: [['순환 구조', 'The recurrence'], ['시간으로 펼치기', 'Unrolling in time'], ['BPTT', 'BPTT'], ['기울기 소실', 'Vanishing gradients'], ['순환 신경망(RNN)', 'Recurrent neural networks']]
  });
}

function sLSTM() {
  const P = PF(3.0, 8.4, 14.0, 4.6, 0, 50, -3, 0), y0 = 2.0;
  return CW('dl-lstm', {
    code: [['f = sigmoid(Wf @ [h, x])            # 잊기', 'f = sigmoid(Wf @ [h, x])            # forget'], ['i = sigmoid(Wi @ [h, x])            # 쓰기', 'i = sigmoid(Wi @ [h, x])            # write'], 'g = tanh(Wg @ [h, x])', ['c = f * c + i * g                   # 셀', 'c = f * c + i * g                   # cell'], ['h = sigmoid(Wo @ [h, x]) * tanh(c)  # 출력', 'h = sigmoid(Wo @ [h, x]) * tanh(c)  # output']],
    hl: [[0, 1, 'warn'], [1, 3, 'ok'], [4, 1, 'accent'], [3, 1, 'accent']],
    draw: (S) => {
      SV(S, 'cl', [zA([19.4, y0], [31.0, y0], 'ink', .14)], 0); lbl(S, 'cll', 19.4, .55, ['셀 상태 c: 컨베이어 벨트', 'cell state c: a conveyor belt'], 'm', 0);
      chip(S, 'fx', 21.6, y0 - .55, 1.1, '×', 'warn', 1); nb(S, 'f', 20.9, 3.6, 2.5, 1.2, ['f 잊기', 'f'], 'warn', 1); arw(S, 'fa', [22.15, 3.6], [22.15, y0 + .6], 1);
      lbl(S, 'fl', 19.4, 5.2, ['f ≈ 0이면 지우고, ≈ 1이면 그대로 둬요', 'f ≈ 0 erases; f ≈ 1 keeps'], 'w', 1, { w: 5.6 });
      chip(S, 'ax', 25.2, y0 - .55, 1.1, '+', 'ok', 2); nb(S, 'i', 24.1, 3.6, 3.3, 1.2, ['i × g 쓰기', 'i × g'], 'ok', 2); arw(S, 'ia', [25.75, 3.6], [25.75, y0 + .6], 2);
      lbl(S, 'il', 25.0, 5.2, ['새 정보 g를 i만큼 더해요', 'add new info g, scaled by i'], 'g', 2, { w: 5.6 });
      nb(S, 'o', 28.0, 3.6, 3.0, 1.2, ['o 출력', 'o'], 'accent', 3); SV(S, 'oa', [zA([29.3, y0 + .1], [29.3, 3.55], 'accent', .07)], 3); lbl(S, 'ol', 26.0, 6.8, ['h = o × tanh(c)', 'h = o × tanh(c)'], 'm a', 3);
      axes(S, 'ax', P, 4); ticks(S, 'tk', P, [[25, '25'], [50, '50']], [[0, '1'], [-2.3, '0.005']], 4, { yb: P.y0 + P.h + .12 }); lbl(S, 'xl', P.x0, P.y0 + P.h + .7, ['몇 스텝 전 →', 'steps back →'], 'm', 4); lbl(S, 'yl', 1, 7.6, ['남는 기울기 (로그)', 'surviving gradient (log)'], 'm', 4);
      curve(S, 'rn', P, k => k * Math.log10(.9), 4, { color: 'danger', n: 20 }); curve(S, 'ls', P, k => k * Math.log10(.99), 4, { color: 'ok', n: 20, h: .12 });
      lbl(S, 'cmp', 19.4, 7.9, ['셀 경로는 f만 곱해져요 · f = 0.99면 50스텝 뒤에도 60%가 남아요 (RNN은 0.5%)', 'along the cell path only f multiplies: at f = 0.99, 60% survives 50 steps (0.5% for the RNN)'], 'g', 4, { w: 12.0 });
    },
    notes: [['LSTM은 은닉 상태와 별도로 셀 상태 c라는 컨베이어 벨트를 두고, 세 개의 게이트(0~1의 시그모이드)로 무엇을 지우고 쓰고 내보낼지 정해요', 'an LSTM adds a cell state c, a conveyor belt beside the hidden state, and three sigmoid gates between 0 and 1 decide what to erase, write and emit'], ['잊기 게이트 f가 이전 셀 상태에 곱해져요 · f ≈ 1이면 정보를 그대로 들고 가고, f ≈ 0이면 지워요', 'the forget gate f multiplies the previous cell state: f ≈ 1 carries information forward and f ≈ 0 erases it'], ['입력 게이트 i가 새 후보 g를 얼마나 더할지 정하고, 출력 게이트 o가 셀 상태의 어느 부분을 h로 내보낼지 정해요', 'the input gate i scales how much of the new candidate g is added, and the output gate o chooses what part of the cell state becomes h'], ['셀 경로에서는 곱셈 대신 f를 곱하고 더하기만 해서 기울기가 잘 살아남아요 · f = 0.99면 50스텝 뒤에도 60%가 남아 긴 문맥을 배워요', 'along the cell path the gradient is only multiplied by f and added to, so it survives: at f = 0.99, 60% remains after 50 steps and long contexts become learnable']],
    fin: [['LSTM: c = f⊙c + i⊙g, h = o⊙tanh(c) · 게이트로 기억을 조절', 'LSTM: c = f⊙c + i⊙g, h = o⊙tanh(c), memory controlled by gates', 'dlx-xs dlx-a'], ['GRU는 게이트를 두 개로 줄인 가벼운 변형이에요', 'the GRU is a lighter variant with two gates'], ['트랜스포머 이전 번역·음성 인식의 표준이었어요', 'the standard for translation and speech before transformers']],
    caps: [['잊기 게이트', 'The forget gate'], ['입력 게이트', 'The input gate'], ['출력 게이트', 'The output gate'], ['오래가는 기울기', 'Long-lived gradients'], ['LSTM', 'LSTM']]
  });
}

function sSeq2seq() {
  const src = ['I', 'am', 'a', 'student'], tgt = [['나는', 'je'], ['학생', 'suis'], ['이다', 'élève'], ['<EOS>', '<EOS>']], EX = [19.4, 21.0, 22.8, 24.2], EW = [1.3, 1.5, 1.1, 2.3], ex = i => EX[i], dx = i => 19.4 + i * 3.1;
  return CW('dl-seq2seq', {
    code: [['enc_out, h = encoder(src)  # 원문 → 문맥', 'enc_out, h = encoder(src)  # source → context'], 'y = BOS', 'for _ in range(max_len):', ['    y, h = decoder(y, h)   # 한 단어씩', '    y, h = decoder(y, h)   # word by word'], ['# 학습 땐 정답 단어를 넣어요 (teacher forcing)', '# training feeds true words (teacher forcing)']],
    hl: [[0, 1], [1, 3, 'ok'], [0, 1, 'warn'], [3, 1, 'accent']],
    draw: (S) => {
      src.forEach((w, i) => { chip(S, 's' + i, ex(i), 5.6, EW[i], w, 'ink', 1); chip(S, 'e' + i, ex(i), 3.4, EW[i], 'e' + '₁₂₃₄'[i], 'accent', 1); arw(S, 'sa' + i, [ex(i) + EW[i] / 2, 5.6], [ex(i) + EW[i] / 2, 4.55], 1); if (i) arw(S, 'ea' + i, [ex(i - 1) + EW[i - 1], 3.95], [ex(i), 3.95], 1); });
      lbl(S, 'enl', 19.4, 2.5, ['인코더', 'encoder'], 'a', 1);
      chip(S, 'ctx', 27.0, 3.4, 1.4, 'c', 'warn', 1); arw(S, 'ca', [26.5, 3.95], [27.0, 3.95], 1);
      tgt.forEach((w, i) => { chip(S, 'd' + i, dx(i), 8.4, 2.7, 'd' + '₁₂₃₄'[i], 'ok', 2); chip(S, 't' + i, dx(i), 10.6, 2.7, w, 'ok', 2); arw(S, 'ta' + i, [dx(i) + 1.35, 9.55], [dx(i) + 1.35, 10.6], 2); if (i) arw(S, 'da' + i, [dx(i) - .4, 8.95], [dx(i), 8.95], 2); });
      SV(S, 'c2d', [zW([[27.7, 4.55], [27.7, 7.2], [20.7, 7.2]], 'warn', .08), zA([20.7, 7.2], [20.7, 8.35], 'warn', .08)], 2); lbl(S, 'del', 28.6, 7.1, ['디코더', 'decoder'], 'g', 2);
      lbl(S, 'bn', 1, 7.4, ['문장 전체가 벡터 c 하나에 눌려 담겨요 · 문장이 길수록 앞부분을 잃어요(병목)', 'the whole sentence is squeezed into one vector c, so long sentences lose their beginnings (a bottleneck)'], 'w', 3, { w: 16.0 });
      SV(S, 'att', src.map((_, i) => zW([[dx(1) + 1.3, 8.4], [ex(i) + EW[i] / 2, 4.55]], 'accent', .05, 1)), 4);
      lbl(S, 'atl', 1, 9.6, ['어텐션: 단어마다 인코더의 모든 상태 e₁…e₄를 다시 보고 필요한 곳에 집중 → 트랜스포머로 이어져요', 'attention lets each output word look back at every encoder state e₁…e₄ and focus where needed, leading to the transformer'], 'a', 4, { w: 16.0 });
    },
    notes: [['시퀀스-투-시퀀스 모델은 인코더가 원문을 읽어 요약하고, 디코더가 그 요약에서 다른 길이의 출력을 만들어요 · 번역, 요약, 대화에 썼어요', 'a sequence-to-sequence model has an encoder that reads and summarizes the source and a decoder that generates an output of a different length, used for translation, summarization and dialogue'], ['디코더는 앞서 만든 단어를 다시 입력받아 한 단어씩 생성하고, <EOS>가 나오면 멈춰요 · 학습 때는 정답 단어를 넣어 주는 teacher forcing을 써요', 'the decoder feeds back each word it produced and generates one word at a time until <EOS>; training feeds in the true previous word instead (teacher forcing)'], ['문제는 문장 전체가 고정 크기의 벡터 c 하나에 눌려 담긴다는 거예요 · 문장이 길수록 앞부분 정보가 흐려져요', 'the catch is that the whole sentence must fit into one fixed-size vector c, so information from the start fades as sentences grow'], ['어텐션은 디코더가 단어마다 인코더의 모든 상태를 다시 보고 관련 있는 곳에 가중치를 주게 해요 · 이 생각이 트랜스포머로 이어졌어요', 'attention lets the decoder revisit every encoder state for each word and weight the relevant ones, an idea that led to the transformer']],
    fin: [['seq2seq: 인코더 → 문맥 → 디코더 · 병목을 어텐션으로 풀었어요', 'seq2seq: encoder → context → decoder, with attention removing the bottleneck', 'dlx-xs dlx-a'], ['생성 때는 빔 서치로 여러 후보를 함께 따라가기도 해요', 'beam search can track several candidates during generation'], ['트랜스포머도 인코더-디코더 구조에서 출발했어요', 'the original transformer was an encoder–decoder too']],
    caps: [['인코더', 'The encoder'], ['디코더', 'The decoder'], ['병목', 'The bottleneck'], ['어텐션', 'Attention'], ['시퀀스-투-시퀀스', 'Sequence to sequence']]
  });
}

function sPosEnc() {
  const R = 20, Cn = 16, d = 64, pe = [...Array(R)].map((_, p) => [...Array(Cn)].map((_, j) => { const k = j >> 1, a = p / Math.pow(10000, 2 * k / d); return j % 2 ? Math.cos(a) : Math.sin(a); }));
  const P = PF(3.0, 8.6, 14.0, 4.2, 0, 19, -1.2, 1.2);
  return CW('dl-posenc', {
    code: ['pos = torch.arange(32)[:, None]', 'i = torch.arange(0, 64, 2)', 'ang = pos / 10000 ** (i / 64)', 'pe[:, 0::2] = ang.sin()', 'pe[:, 1::2] = ang.cos()', ['x = token_emb + pe  # 위치를 더해요', 'x = token_emb + pe  # add position']],
    hl: [[0, 3], [3, 2, 'accent'], [2, 1, 'ok'], [5, 1, 'warn']],
    draw: (S) => {
      lbl(S, 'why', 19.4, .3, ['어텐션은 순서를 몰라요 → 위치 정보를 더해 줘요', 'attention is order-blind, so position is added'], 'm', 1, { w: 12.0 });
      GR(S, 'hm', 21.4, 1.6, .5, pe.map(r => r.map(v => (v + 1) / 2)), (v, i, j) => v > .5 ? 'accent' : 'warn', 2);
      lbl(S, 'hp', 19.4, 6.4, ['위치 ↓', 'pos ↓'], 'm', 2); lbl(S, 'hd', 21.4, 11.75, ['차원 → (앞 16개)', 'dims → (first 16)'], 'm', 2);
      axes(S, 'ax', P, 3); ticks(S, 'tk', P, [[10, '10'], [19, ['위치', 'pos']]], [[1, '1'], [-1, '−1']], 3, { yb: P.y0 + P.h + .12 }); lbl(S, 'yl', 1, 7.9, ['차원마다 다른 주파수', 'a different frequency per dimension'], 'm', 3);
      curve(S, 'f0', P, p => Math.sin(p), 3, { color: 'accent', n: 120 }); curve(S, 'f6', P, p => Math.sin(p / Math.pow(10000, 12 / 64)), 3, { color: 'warn', n: 120, h: .11 });
      lbl(S, 'fl', 1, 13.4, ['파랑: 0번 차원(빠름) · 주황: 12번 차원(느림) · 시계의 초침과 시침처럼', 'blue: dim 0 (fast) · orange: dim 12 (slow), like a clock’s second and hour hands'], 'a', 3, { w: 16.0, off: 4 });
      lbl(S, 'rope', 1, 13.4, ['요즘 LLM은 RoPE: q, k 벡터를 위치만큼 회전시켜 상대 위치를 담아요', 'modern LLMs use RoPE, rotating q and k by position to encode relative position'], 'g', 4, { w: 16.0 });
    },
    notes: [['어텐션은 토큰들을 집합처럼 다뤄서 순서를 바꿔도 결과가 같아요 · 그래서 각 위치에 고유한 신호를 임베딩에 더해 줘요', 'attention treats tokens like a set, so shuffling them gives the same result; a unique positional signal is therefore added to each embedding'], ['사인파 위치 인코딩은 차원 쌍마다 다른 주파수의 sin과 cos를 써요 · 위치마다 줄무늬 패턴이 달라 구별돼요', 'sinusoidal encodings use sin and cos at a different frequency for each pair of dimensions, so each position gets a distinct striped pattern'], ['앞쪽 차원은 빨리, 뒤쪽 차원은 천천히 돌아요 · 시계의 초침과 시침처럼 여러 주기를 합쳐 위치를 나타내고, 위치 차이는 회전으로 표현돼요', 'early dimensions cycle fast and later ones slowly, combining periods like a clock’s hands so that position differences become rotations'], ['요즘 LLM은 q와 k 벡터를 위치만큼 회전시키는 RoPE를 많이 써요 · 상대 위치가 내적에 자연스럽게 들어가요', 'modern LLMs mostly use RoPE, which rotates the q and k vectors by their position so relative position enters the dot product naturally']],
    fin: [['위치 인코딩: 순서를 모르는 어텐션에 위치를 알려 줘요', 'positional encoding tells order-blind attention where each token sits', 'dlx-xs dlx-a'], ['학습되는 위치 임베딩(BERT, GPT-2)도 있어요', 'learned position embeddings (BERT, GPT-2) exist too'], ['RoPE·ALiBi는 학습보다 긴 문맥으로 늘리기 좋아요', 'RoPE and ALiBi extend more gracefully to longer contexts']],
    caps: [['순서를 모르는 어텐션', 'Order-blind attention'], ['줄무늬 패턴', 'The striped pattern'], ['여러 주파수', 'Many frequencies'], ['RoPE', 'RoPE'], ['위치 인코딩', 'Positional encoding']]
  });
}

function sMHA() {
  const n = 6, toks = [['나는', 'I'], ['오늘', 'today'], ['학교', 'school'], ['에서', 'at'], ['친구를', 'a friend'], ['만났다', 'met']], cs = .78, gx = 22.4, gy = 4.2;
  const sc = [...Array(n)].map((_, i) => [...Array(n)].map((_, j) => .25 + .6 * Math.abs(Math.sin(i * 1.7 + j * 2.3))));
  const P = PF(3.0, 8.8, 14.0, 4.2, 0, 8, 0, 64);
  return CW('dl-mha', {
    code: ['q, k, v = x @ Wq, x @ Wk, x @ Wv', 'q = q.view(n, 8, 64).transpose(0, 1)', 'att = q @ k.transpose(-2, -1) / 64 ** 0.5', 'att = att.masked_fill(mask, -inf).softmax(-1)', 'out = merge_heads(att @ v) @ Wo'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'danger'], [4, 1, 'accent']],
    draw: (S) => {
      [...Array(8)].forEach((_, h) => rect(S, 'hd' + h, 19.4 + h * 1.48, .9, 1.38, 1.0, ['accent', 'ok', 'warn', 'danger'][h % 4], 30, 1, { r: .1 }));
      lbl(S, 'hdl', 19.4, 2.1, ['d = 512를 64차원씩 8개 헤드로 · 헤드마다 다른 관계(문법, 지시 대상…)를 봐요', 'd = 512 split into 8 heads of 64, each attending to a different relation (syntax, reference…)'], 'm', 1, { w: 12.0, off: 2 });
      GR(S, 'att', gx, gy, cs, sc, 'ok', 2, { off: 3 }); GR(S, 'attm', gx, gy, cs, sc.map((r, i) => r.map((v, j) => j > i ? 0 : v)), (v, i, j) => j > i ? 'ink' : 'ok', 3);
      toks.forEach((t, i) => { T(S, 'rt' + i, gx - 2.9, gy + i * cs + .05, t, 'dlx-tiny', 2, { w: 2.7, css: 'text-align:right' }); T(S, 'ct' + i, gx + i * cs - .55, gy - .95 - (i % 2) * .5, t, 'cz-tc dlx-tiny', 2, { w: 1.9 }); });
      lbl(S, 'sl', 27.4, 4.4, ['점수 = q·k / √64', 'score = q·k / √64'], 'g', 2, { w: 4.0 });
      lbl(S, 'ml', 27.4, 6.0, ['미래(오른쪽 위)를 −∞로 가려요 → 다음 토큰을 미리 못 봐요', 'mask the future (upper right) with −∞ so tokens cannot peek ahead'], 'r', 3, { w: 4.0 });
      axes(S, 'ax', P, 4); ticks(S, 'tk', P, [[2, '2k'], [8, ['8k 토큰', '8k tokens']]], [[64, '64']], 4); lbl(S, 'yl', 1, 7.7, ['어텐션 행렬 크기 (n², 상대값)', 'attention matrix size (n², relative)'], 'm', 4);
      curve(S, 'n2', P, x => x * x, 4, { color: 'danger', n: 60 }); lbl(S, 'n2l', 1, 13.6, ['문맥 n이 2배면 계산·메모리는 4배 → FlashAttention, KV 캐시로 줄여요', 'doubling context n quadruples compute and memory; FlashAttention and KV caching help'], 'r', 4, { w: 16.0 });
    },
    notes: [['멀티헤드 어텐션은 512차원을 64차원씩 8개 헤드로 나눠 각자 어텐션을 해요 · 헤드마다 문법 관계, 지시 대상 같은 서로 다른 관계를 잡아요', 'multi-head attention splits 512 dimensions into 8 heads of 64 that attend independently, each capturing a different relation such as syntax or reference'], ['토큰 쌍마다 q·k를 √64로 나눈 점수를 구해요 · 나누지 않으면 값이 커져 softmax가 한 칸에 몰려요', 'each token pair gets a score q·k divided by √64; without the division values grow and softmax collapses onto one entry'], ['다음 토큰을 예측하는 모델은 미래 위치를 −∞로 가려(인과 마스크) softmax 뒤 0이 되게 해요 · 그래서 학습 때 모든 위치를 한꺼번에 계산할 수 있어요', 'a next-token model masks future positions with −∞ (a causal mask) so they become 0 after softmax, which lets training compute every position at once'], ['점수 행렬은 n × n이라 문맥이 두 배가 되면 계산과 메모리가 네 배예요 · FlashAttention과 KV 캐시 같은 기법으로 비용을 줄여요', 'the score matrix is n × n, so doubling the context quadruples compute and memory; techniques such as FlashAttention and KV caching reduce the cost']],
    fin: [['멀티헤드 어텐션: softmax(QKᵀ/√d)V를 헤드별로, 인과 마스크로 미래 차단', 'multi-head attention: softmax(QKᵀ/√d)V per head, with a causal mask blocking the future', 'dlx-xs dlx-a'], ['헤드 출력을 이어 붙여 Wo로 섞어요', 'head outputs are concatenated and mixed by Wo'], ['인코더(BERT)는 마스크 없이 양방향을 봐요', 'encoders such as BERT attend in both directions without a mask']],
    caps: [['헤드 나누기', 'Splitting heads'], ['점수 행렬', 'The score matrix'], ['인과 마스크', 'The causal mask'], ['n² 비용', 'The n² cost'], ['멀티헤드 어텐션과 마스크', 'Multi-head attention and masking']]
  });
}
/* ===== Deep learning · 6. generative models and practice ===== */
const DIG = [[0, 0, 1, 1, 1, 1, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 0]];
const NZ = (i, j, s) => Math.sin(i * 12.9898 + j * 78.233 + s) * 43758.5453 % 1;
function sAE() {
  const trap = (x1, x2, yt1, yb1, yt2, yb2, c) => `<polygon points="${zp([x1, yt1])} ${zp([x2, yt2])} ${zp([x2, yb2])} ${zp([x1, yb1])}" style="fill:${tint(c, 18)};stroke:${cv(c)};stroke-width:.07"/>`;
  const blur = DIG.map((r, i) => r.map((v, j) => .15 + .7 * (v * .6 + .1 * ((DIG[i - 1] || [])[j] || 0) + .1 * ((DIG[i + 1] || [])[j] || 0) + .1 * (r[j - 1] || 0) + .1 * (r[j + 1] || 0))));
  const noisy = DIG.map((r, i) => r.map((v, j) => Math.min(1, Math.abs(v * .8 + .45 * NZ(i, j, 1)))));
  return CW('dl-autoencoder', {
    code: ['enc = MLP(784, 128, 32)       # 784 → 32', 'dec = MLP(32, 128, 784)       # 32 → 784', ['z = enc(x)                    # 잠재 벡터', 'z = enc(x)                    # latent vector'], ['loss = F.mse_loss(dec(z), x)  # 복원 오차', 'loss = F.mse_loss(dec(z), x)  # recon error'], ['# 잡음 낀 입력 → 깨끗한 원본: 디노이징', '# noisy input → clean original: denoising']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'net', [trap(21.6, 24.6, 1.0, 6.0, 2.8, 4.2, 'accent'), trap(26.0, 29.0, 2.8, 4.2, 1.0, 6.0, 'ok')], 1);
      lbl(S, 'el', 21.7, 6.3, ['인코더 784 → 32', 'encoder 784 → 32'], 'a', 1); lbl(S, 'dl', 26.0, 6.3, ['디코더 32 → 784', 'decoder 32 → 784'], 'g', 1);
      chip(S, 'z', 24.7, 2.9, 1.2, 'z', 'warn', 2, { h: 1.2 }); lbl(S, 'zl', 19.4, .2, ['병목: 숫자 32개 (24.5배 압축)', 'bottleneck: 32 numbers (24.5× smaller)'], 'w', 2, { w: 12.0 });
      GR(S, 'x', 1.2, 8.0, .5, DIG, 'ink', 1); lbl(S, 'xl', 1.2, 7.3, ['입력 x', 'input x'], 'm', 1);
      arw(S, 'xa', [5.6, 10.0], [7.0, 10.0], 3); GR(S, 'r', 7.4, 8.0, .5, blur, 'ok', 3); lbl(S, 'rl', 7.4, 7.3, ['복원 x̂', 'reconstruction x̂'], 'm g', 3);
      lbl(S, 'ml', 12.2, 9.0, ['MSE(x̂, x)를 줄이면 z에 핵심만 남아요', 'minimizing MSE(x̂, x) leaves only the essentials in z'], 'g', 3, { w: 5.0 });
      GR(S, 'nx', 1.2, 8.0, .5, noisy, 'danger', 4); lbl(S, 'nxl', 1.2, 12.4, ['잡음 낀 입력 → 깨끗한 복원 (디노이징)', 'noisy input → clean output (denoising)'], 'r', 4, { w: 16.0 });
    },
    notes: [['오토인코더는 입력을 작은 벡터로 압축하는 인코더와, 그 벡터에서 원래 입력을 되살리는 디코더로 이뤄져요', 'an autoencoder pairs an encoder that compresses the input into a small vector with a decoder that rebuilds the input from it'], ['가운데 병목이 784개 픽셀을 숫자 32개로 줄여요 · 다 담을 수 없으니 중요한 특징만 남겨야 해요', 'the bottleneck squeezes 784 pixels into 32 numbers, so only the important features can survive'], ['학습 목표는 복원 x̂와 원본 x의 차이(MSE)를 줄이는 거예요 · 정답 레이블이 필요 없는 자기 지도 학습이에요', 'training minimizes the difference (MSE) between the reconstruction x̂ and the original x, a self-supervised task needing no labels'], ['입력에 잡음을 넣고 깨끗한 원본을 맞히게 하면 디노이징 오토인코더예요 · 잡음 제거, 이상 탐지, 특징 추출에 써요', 'adding noise to the input while targeting the clean original makes a denoising autoencoder, used for noise removal, anomaly detection and feature extraction']],
    fin: [['오토인코더: 압축(인코더) → 병목 z → 복원(디코더)', 'autoencoder: compress (encoder) → bottleneck z → rebuild (decoder)', 'dlx-xs dlx-a'], ['복원 오차가 큰 입력은 이상치일 가능성이 높아요', 'inputs with large reconstruction error are likely anomalies'], ['잠재 공간이 듬성듬성해 새 샘플 생성에는 약해요 → VAE', 'its patchy latent space is poor for generating new samples, hence the VAE']],
    caps: [['인코더와 디코더', 'Encoder and decoder'], ['병목', 'The bottleneck'], ['복원 오차', 'Reconstruction error'], ['디노이징', 'Denoising'], ['오토인코더', 'Autoencoders']]
  });
}

function sVAE() {
  const P = PF(3.0, 8.4, 14.0, 4.4, -4, 5, 0, 1.4);
  return CW('dl-vae', {
    code: [['mu, lv = enc(x)  # 평균, log 분산', 'mu, lv = enc(x)  # mean, log variance'], 'eps = torch.randn_like(mu)', 'z = mu + (0.5 * lv).exp() * eps', 'recon = ((dec(z) - x) ** 2).sum()', 'kl = -0.5 * (1 + lv - mu**2 - lv.exp()).sum()', 'loss = recon + kl'],
    hl: [[0, 1], [1, 2, 'warn'], [4, 1, 'ok'], [5, 1, 'accent']],
    draw: (S) => {
      nb(S, 'enc', 19.4, 1.0, 2.6, 1.4, ['인코더', 'encoder'], 'accent', 1); chip(S, 'mu', 23.0, .6, 1.4, 'μ', 'accent', 1); chip(S, 'sg', 23.0, 2.0, 1.4, 'σ', 'accent', 1);
      arw(S, 'a1', [22.0, 1.4], [23.0, 1.15], 1); arw(S, 'a2', [22.0, 2.0], [23.0, 2.55], 1);
      lbl(S, 'el', 19.4, 2.8, ['점 하나 대신 분포 N(μ, σ²)를 내요', 'outputs a distribution N(μ, σ²), not a point'], 'a', 1, { w: 6.0 });
      chip(S, 'eps', 25.4, 3.6, 1.6, 'ε', 'warn', 2); nb(S, 'z', 25.4, 1.2, 1.6, 1.4, 'z', 'warn', 2); arw(S, 'a3', [24.4, 1.15], [25.4, 1.6], 2); arw(S, 'a4', [24.4, 2.55], [25.4, 2.2], 2); arw(S, 'a5', [26.2, 3.6], [26.2, 2.65], 2);
      nb(S, 'dec', 28.0, 1.2, 2.8, 1.4, ['디코더', 'decoder'], 'ok', 2); arw(S, 'a6', [27.0, 1.9], [28.0, 1.9], 2);
      lbl(S, 'rp', 19.4, 5.0, ['z = μ + σ·ε, ε ~ N(0, 1): 무작위는 ε에만 → μ, σ로 기울기가 흘러요 (재매개변수화)', 'z = μ + σ·ε with ε ~ N(0, 1): randomness lives in ε, so gradients reach μ and σ (reparameterization)'], 'w', 2, { w: 12.0 });
      axes(S, 'ax', P, 3, { noy: 1 }); lbl(S, 'yl', 1, 7.7, ['잠재 분포 q(z|x)', 'latent distribution q(z|x)'], 'm', 3);
      curve(S, 'pr', P, gauss1(0, 1), 3, { color: 'ok', n: 100, h: .11 }); curve(S, 'q0', P, x => .9 * gauss1(2.8, .35)(x), 3, { color: 'danger', n: 160, dash: 1, h: .07 }); curve(S, 'q1', P, gauss1(.9, .75), 3, { color: 'accent', n: 120 });
      lbl(S, 'ql', 19.4, 7.4, ['KL 항이 q(z|x)를 표준 정규 N(0, 1)(초록) 쪽으로 당겨요 · 잠재 공간이 빈틈없이 이어져요', 'the KL term pulls q(z|x) toward the standard normal N(0, 1) (green), making the latent space continuous'], 'g', 3, { w: 12.0 });
      lbl(S, 'gen', 19.4, 10.2, ['생성: z ~ N(0, 1)을 뽑아 디코더에 넣으면 새 샘플', 'generation: sample z ~ N(0, 1) and decode it into a new sample'], 'a', 4, { w: 12.0 });
    },
    notes: [['변분 오토인코더(VAE)의 인코더는 점 하나 대신 분포 N(μ, σ²)의 평균과 분산을 내요', 'a variational autoencoder’s encoder outputs the mean and variance of a distribution N(μ, σ²) rather than a single point'], ['z = μ + σ·ε처럼 무작위를 ε ~ N(0, 1)에만 넣으면 μ와 σ로 기울기가 흘러 학습할 수 있어요 · 재매개변수화 기법이에요', 'writing z = μ + σ·ε puts all the randomness in ε ~ N(0, 1), so gradients reach μ and σ: the reparameterization trick'], ['손실은 복원 오차에 KL 항을 더해요 · KL은 각 q(z|x)를 표준 정규 분포 쪽으로 당겨 잠재 공간을 빈틈없이 매끄럽게 만들어요', 'the loss adds a KL term to the reconstruction error, pulling each q(z|x) toward a standard normal and making the latent space smooth and gap-free'], ['그래서 N(0, 1)에서 z를 뽑아 디코더에 넣으면 그럴듯한 새 샘플이 나와요 · 두 z 사이를 이으면 부드럽게 변하는 이미지도 만들 수 있어요', 'sampling z from N(0, 1) and decoding it yields plausible new samples, and interpolating between two z values morphs smoothly between images']],
    fin: [['VAE 손실 = 복원 오차 + KL(q(z|x) ‖ N(0, 1))', 'VAE loss = reconstruction error + KL(q(z|x) ‖ N(0, 1))', 'dlx-xs dlx-a'], ['결과가 다소 흐릿한 편이에요', 'its samples tend to be a little blurry'], ['Stable Diffusion도 VAE의 잠재 공간에서 확산을 해요', 'Stable Diffusion runs its diffusion inside a VAE latent space']],
    caps: [['분포를 내는 인코더', 'An encoder that outputs a distribution'], ['재매개변수화', 'Reparameterization'], ['KL 항', 'The KL term'], ['새 샘플 생성', 'Generating new samples'], ['변분 오토인코더(VAE)', 'Variational autoencoders']]
  });
}

function sGAN() {
  const P = PF(3.0, 8.4, 14.0, 4.6, -4, 6, 0, .75), real = x => .65 * gauss1(3, .6)(x);
  return CW('dl-gan', {
    code: ['z = torch.randn(64, 100)', ['f = G(z)               # 가짜', 'f = G(z)               # fake'], 'd_loss = bce(D(x), 1) + bce(D(f.detach()), 0)', ['g_loss = bce(D(f), 1)  # 속이기', 'g_loss = bce(D(f), 1)  # fool D'], ['# 번갈아 학습: D 한 번, G 한 번', '# alternate: one D step, one G step']],
    hl: [[0, 2], [2, 1, 'accent'], [3, 1, 'warn'], [4, 1, 'ok']],
    draw: (S) => {
      chip(S, 'z', 19.4, 1.4, 1.2, 'z', 'ink', 1); nb(S, 'g', 21.0, 1.1, 4.6, 1.7, ['생성자 G', 'generator G'], 'warn', 1); chip(S, 'fk', 26.4, 1.4, 1.9, ['가짜', 'fake'], 'warn', 1);
      chip(S, 'rl', 19.4, 4.4, 1.9, ['진짜', 'real'], 'accent', 1); nb(S, 'd', 23.2, 4.0, 5.8, 1.7, ['판별자 D', 'discriminator D'], 'accent', 1);
      arw(S, 'a1', [20.6, 1.95], [21.0, 1.95], 1); arw(S, 'a2', [25.6, 1.95], [26.4, 1.95], 1); arw(S, 'a3', [27.35, 2.5], [27.35, 4.0], 1); arw(S, 'a4', [21.3, 4.95], [23.2, 4.85], 1);
      lbl(S, 'dq', 29.2, 4.5, ['진짜일 확률', 'P(real)'], 'm a', 1, { w: 2.2 });
      lbl(S, 'dl', 19.4, 6.2, ['D: 진짜는 1, 가짜는 0이라고 맞히도록', 'D learns to say 1 for real and 0 for fake'], 'a', 2, { w: 12.0 });
      lbl(S, 'gl', 19.4, 7.4, ['G: D가 가짜를 1이라고 착각하도록', 'G learns to make D call its fakes 1'], 'w', 3, { w: 12.0 });
      axes(S, 'ax', P, 2, { noy: 1 }); curve(S, 'real', P, real, 2, { color: 'accent', n: 120, h: .11 }); lbl(S, 'yl', 1, 7.7, ['파랑: 진짜 데이터 분포 · 주황: G의 분포', 'blue: real data · orange: G’s distribution'], 'm', 2, { w: 16.0 });
      curve(S, 'g1', P, x => .4 * gauss1(-1.5, 1.1)(x), 2, { color: 'warn', n: 120, off: 3 }); curve(S, 'g2', P, x => .5 * gauss1(1.4, .9)(x), 3, { color: 'warn', n: 120, off: 4 }); curve(S, 'g3', P, x => .62 * gauss1(2.9, .65)(x), 4, { color: 'warn', n: 120 });
      lbl(S, 'eq', 19.4, 8.8, ['학습이 진행되면 G의 분포가 진짜에 겹쳐요 · D는 반반(0.5)밖에 못 맞혀요', 'as training proceeds G’s distribution overlaps the real one and D can only guess 0.5'], 'g', 4, { w: 12.0 });
      lbl(S, 'mc', 19.4, 10.9, ['주의: 한 종류만 만드는 모드 붕괴, 불안정한 학습', 'watch for mode collapse (one kind of output) and unstable training'], 'r', 4, { w: 12.0 });
    },
    notes: [['GAN은 두 신경망이 겨뤄요 · 생성자 G는 잡음 z에서 가짜를 만들고, 판별자 D는 진짜와 가짜를 구별해요', 'a GAN pits two networks against each other: the generator G turns noise z into fakes, and the discriminator D tells real from fake'], ['D는 진짜에 1, 가짜에 0을 내도록 이진 교차 엔트로피로 학습해요 · G의 출력은 detach()로 떼어 D만 갱신해요', 'D is trained with binary cross-entropy to output 1 for real and 0 for fake, detaching G’s output so only D updates'], ['G는 D가 자기 가짜를 진짜(1)라고 착각하도록 학습해요 · 두 네트워크를 번갈아 한 스텝씩 갱신해요', 'G is trained to make D mistake its fakes for real (1), and the two networks take turns updating'], ['잘 되면 G의 분포가 진짜 데이터에 겹쳐 D가 반반밖에 못 맞혀요 · 다만 한 종류만 만드는 모드 붕괴와 불안정한 학습이 고질적인 문제예요', 'when it works, G’s distribution overlaps the real data and D can only guess half the time, though mode collapse and unstable training are chronic problems']],
    fin: [['GAN: 생성자와 판별자의 경쟁으로 진짜 같은 샘플을 만들어요', 'GAN: competition between generator and discriminator yields realistic samples', 'dlx-xs dlx-a'], ['StyleGAN은 사실적인 얼굴 이미지로 유명해요', 'StyleGAN is famous for photorealistic faces'], ['이미지 생성의 주도권은 확산 모델로 넘어갔어요', 'diffusion models have since taken the lead in image generation']],
    caps: [['생성자와 판별자', 'Generator and discriminator'], ['판별자 학습', 'Training D'], ['생성자 학습', 'Training G'], ['균형', 'Equilibrium'], ['GAN', 'GANs']]
  });
}

function sDiff() {
  const betas = [...Array(1000)].map((_, i) => 1e-4 + (.02 - 1e-4) * i / 999); const abar = []; betas.reduce((a, b, i) => (abar[i] = a * (1 - b)), 1);
  const at = t => abar[Math.max(0, t - 1)], noised = t => DIG.map((r, i) => r.map((v, j) => { const x0 = v * 2 - 1, e = NZ(i, j, 7) * 2, a = t ? at(t) : 1; return Math.max(0, Math.min(1, (Math.sqrt(a) * x0 + Math.sqrt(1 - a) * e + 1) / 2)); }));
  const ts = [0, 100, 300, 1000], P = PF(3.0, 8.4, 14.0, 4.4, 0, 1000, 0, 1.05);
  return CW('dl-diffusion', {
    code: ['betas = torch.linspace(1e-4, 0.02, 1000)', 'abar = torch.cumprod(1 - betas, 0)', 'a = abar[t]', 'xt = a.sqrt() * x0 + (1 - a).sqrt() * eps', 'loss = F.mse_loss(model(xt, t), eps)', ['# 모델은 섞인 잡음 ε을 맞혀요', '# the model guesses the added noise ε']],
    hl: [[3, 1], [0, 2, 'ok'], [4, 2, 'warn'], [3, 2, 'accent']],
    draw: (S) => {
      ts.forEach((t, i) => { GR(S, 'n' + i, 19.4 + i * 3.1, 1.2, .32, noised(t), 'ink', 1); T(S, 'nt' + i, 19.4 + i * 3.1, 3.9, 't = ' + t, 'cz-mono dlx-tiny', 1, { w: 2.6 }); if (i) arw(S, 'na' + i, [19.4 + i * 3.1 - .45, 2.45], [19.4 + i * 3.1 - .05, 2.45], 1); });
      lbl(S, 'fw', 19.4, .3, ['정방향: 잡음을 조금씩 더해 순수한 잡음으로', 'forward: add noise until pure noise'], 'm', 1, { w: 12.0 });
      axes(S, 'ax', P, 2); ticks(S, 'tk', P, [[500, '500'], [1000, 't = 1000']], [[1, '1']], 2); lbl(S, 'yl', 1, 7.7, ['남은 원본 비율 √ᾱ_t', 'remaining signal √ᾱ_t'], 'm', 2);
      curve(S, 'ab', P, t => Math.sqrt(t ? at(Math.round(t)) : 1), 2, { color: 'ok', n: 120 });
      lbl(S, 'ml', 19.4, 5.0, ['모델은 x_t와 t를 보고 섞인 잡음 ε을 맞혀요 · 손실은 단순한 MSE', 'the model sees x_t and t and predicts the added noise ε, with a plain MSE loss'], 'w', 3, { w: 12.0 });
      SV(S, 'rev', [zA([30.4, 4.6], [19.8, 4.6], 'accent', .1)], 4);
      lbl(S, 'rl', 19.4, 7.2, ['생성: 순수 잡음에서 시작해 예측한 잡음을 조금씩 빼며 t = 1000 → 0', 'generation: start from pure noise and subtract the predicted noise step by step from t = 1000 to 0'], 'a', 4, { w: 12.0 });
      lbl(S, 'sd', 19.4, 9.4, ['Stable Diffusion: VAE 잠재 공간에서, 텍스트 조건을 붙여 · 단계를 줄이는 샘플러로 20~50번', 'Stable Diffusion works in a VAE latent space with text conditioning, using fast samplers in 20–50 steps'], 'g', 4, { w: 12.0 });
    },
    notes: [['확산 모델의 정방향 과정은 이미지에 아주 작은 잡음을 1000번에 걸쳐 더해 결국 순수한 잡음으로 만들어요', 'a diffusion model’s forward process adds tiny amounts of noise over 1000 steps until the image becomes pure noise'], ['어느 단계든 한 번에 계산할 수 있어요 · x_t = √ᾱ_t·x₀ + √(1 − ᾱ_t)·ε이고, √ᾱ_t는 t가 커질수록 1에서 0으로 줄어요', 'any step can be computed directly as x_t = √ᾱ_t·x₀ + √(1 − ᾱ_t)·ε, where √ᾱ_t falls from 1 toward 0 as t grows'], ['신경망은 잡음 섞인 x_t와 단계 t를 보고 섞인 잡음 ε을 맞히도록 MSE로 학습해요 · 구조는 보통 U-Net이나 트랜스포머예요', 'the network is trained with MSE to predict the added noise ε from the noisy x_t and step t, usually with a U-Net or transformer'], ['생성할 때는 순수 잡음에서 시작해 예측한 잡음을 조금씩 빼며 거꾸로 가요 · Stable Diffusion은 VAE 잠재 공간에서 텍스트 조건을 붙여 이 과정을 해요', 'to generate, start from pure noise and walk backward, subtracting predicted noise a little at a time; Stable Diffusion does this in a VAE latent space with text conditioning']],
    fin: [['확산 모델: 잡음을 더하는 과정을 거꾸로 배우는 생성 모델', 'diffusion models learn to reverse a noising process', 'dlx-xs dlx-a'], ['GAN보다 학습이 안정적이고 다양성이 좋아요', 'they train more stably than GANs and cover more variety'], ['DDIM 같은 샘플러로 단계 수를 크게 줄여요', 'samplers such as DDIM cut the number of steps sharply']],
    caps: [['잡음 더하기', 'Adding noise'], ['잡음 일정', 'The noise schedule'], ['잡음 예측', 'Predicting the noise'], ['거꾸로 생성', 'Generating in reverse'], ['확산 모델', 'Diffusion models']]
  });
}

function sPrec() {
  const row = (k, y, parts, st, lab) => { let x = 19.4; parts.forEach(([n, c]) => { rect(S0, k + c, x, y, n * .28, .8, c, 55, st, { r: .05 }); T(S0, k + c + 't', x, y + .12, String(n), 'cz-mono cz-tc dlx-tiny', st, { w: Math.max(.6, n * .28) }); x += n * .28 + .05; }); lbl(S0, k + 'l', 19.4, y - .7, lab, '', st); };
  let S0;
  return CW('dl-precision', {
    code: ['with autocast("cuda", dtype=torch.bfloat16):', '    loss = model(x).loss', 'loss.backward()', ['# fp16이면 GradScaler로 손실을 키웠다 되돌려요', '# fp16 needs GradScaler (loss scaling)']],
    hl: [[0, 2], [0, 1, 'warn'], [0, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      row('a', 1.4, [[1, 'danger'], [8, 'warn'], [23, 'accent']], 1, ['fp32: 부호 1 · 지수 8 · 가수 23', 'fp32: sign 1 · exponent 8 · mantissa 23']);
      row('b', 3.8, [[1, 'danger'], [5, 'warn'], [10, 'accent']], 2, ['fp16: 지수 5비트 → 최대 65,504', 'fp16: 5-bit exponent, max 65,504']);
      row('c', 6.2, [[1, 'danger'], [8, 'warn'], [7, 'accent']], 3, ['bf16: 지수 8비트 → fp32와 같은 범위', 'bf16: 8-bit exponent, fp32’s range']);
      lbl(S, 'mx', 19.4, 7.6, ['범위가 넓어 손실 스케일링 없이도 안정적 → LLM 학습의 기본', 'its wide range is stable without loss scaling, the default for LLM training'], 'g', 3, { w: 12.0 });
      lbl(S, 'mt', 1, 6.6, ['70억 파라미터 모델의 가중치 메모리', 'weight memory for a 7-billion-parameter model'], 'm', 4);
      rect(S, 'm1', 1.0, 7.4, 28 * .5, .8, 'danger', 55, 4, { r: .1 }); lbl(S, 'm1l', 1.2, 7.45, 'fp32 28 GB', 'm', 4);
      rect(S, 'm2', 1.0, 8.6, 14 * .5, .8, 'ok', 55, 4, { r: .1 }); lbl(S, 'm2l', 1.2, 8.65, 'bf16 14 GB', 'm', 4);
      rect(S, 'm3', 1.0, 9.8, 3.5 * .5, .8, 'accent', 55, 4, { r: .1 }); lbl(S, 'm3l', 3.0, 9.85, ['4비트 양자화 3.5 GB (추론)', '4-bit quantized 3.5 GB (inference)'], 'm a', 4);
      lbl(S, 'mx2', 1, 11.2, ['혼합 정밀도: 계산은 16비트, 가중치 사본과 누적은 32비트 · 텐서 코어로 2배 이상 빨라요', 'mixed precision computes in 16 bits but keeps master weights and accumulation in 32, running over 2× faster on tensor cores'], 'a', 4, { w: 16.0 });
    },
    notes: [['기본 fp32는 부호 1비트, 지수 8비트, 가수 23비트로 약 7자리 정밀도를 가져요 · 하지만 메모리와 계산이 많이 들어요', 'standard fp32 has 1 sign bit, 8 exponent bits and 23 mantissa bits, about 7 digits of precision, at a high cost in memory and compute'], ['fp16은 크기가 절반이지만 지수가 5비트라 최대 65,504이고 아주 작은 기울기는 0이 돼요 · 그래서 손실에 큰 수를 곱해 계산한 뒤 되돌리는 손실 스케일링이 필요해요', 'fp16 halves the size, but its 5-bit exponent tops out at 65,504 and tiny gradients flush to zero, so loss scaling multiplies the loss up and undoes it afterward'], ['bf16은 지수를 fp32와 같은 8비트로 두고 가수를 7비트로 줄였어요 · 정밀도는 낮아도 범위가 같아 손실 스케일링 없이 안정적이라 LLM 학습의 기본이에요', 'bf16 keeps fp32’s 8-bit exponent and cuts the mantissa to 7 bits: less precise but the same range, stable without loss scaling and now the default for LLM training'], ['70억 파라미터면 가중치만 fp32 28 GB, bf16 14 GB예요 · 혼합 정밀도는 계산을 16비트로 하고 가중치 사본과 누적은 32비트로 지켜요', 'a 7-billion-parameter model needs 28 GB of weights in fp32 and 14 GB in bf16; mixed precision computes in 16 bits while keeping master weights and accumulation in 32']],
    fin: [['혼합 정밀도: 16비트로 빠르게, 32비트로 정확하게', 'mixed precision: fast in 16 bits, accurate in 32', 'dlx-xs dlx-a'], ['추론에서는 8비트·4비트 양자화로 더 줄여요', 'inference shrinks further with 8-bit and 4-bit quantization'], ['최신 GPU는 fp8 연산도 지원해요', 'recent GPUs support fp8 arithmetic too']],
    caps: [['fp32', 'fp32'], ['fp16', 'fp16'], ['bf16', 'bf16'], ['메모리와 속도', 'Memory and speed'], ['혼합 정밀도', 'Mixed precision']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('dl-basics', '딥러닝의 기초', 'Foundations', '텐서에서 손실까지', 'From tensors to losses', '텐서의 모양과 브로드캐스팅, 계산 그래프와 자동 미분, softmax와 교차 엔트로피, 가중치 초기화, 미니배치 학습까지 딥러닝 코드를 이루는 기본 부품을 봐요.', 'Tensor shapes and broadcasting, computation graphs and autograd, softmax and cross-entropy, weight initialization and minibatch training: the basic parts of deep-learning code.', [
    item('dl-tensor', '텐서와 모양', 'Tensors and shapes',
      '딥러닝의 데이터는 여러 축을 가진 텐서예요. 이미지 배치는 [N, C, H, W]이고, 행렬 곱은 안쪽 차원이 맞아야 하며, 브로드캐스팅으로 모자란 축을 늘려 맞춰요.',
      '텐서는 여러 축을 가진 배열이에요. 흑백 숫자 이미지 64장은 [64, 1, 28, 28]처럼 [개수 N, 채널 C, 높이 H, 너비 W] 순서로 담겨요. 완전 연결 층에 넣으려면 flatten(1)로 한 장을 784개의 한 줄로 펴서 [64, 784]를 만들고, 가중치 [784, 128]과 곱하면 [64, 128]이 돼요. 행렬 곱은 안쪽 차원(784)이 같아야 해요. 편향 [128]을 더하면 크기가 1이거나 없는 축이 자동으로 늘어나 64개 행 모두에 더해지는데, 이를 브로드캐스팅이라 해요. 모양을 따라가는 것이 딥러닝 코드 디버깅의 절반이에요.',
      'Deep-learning data are multi-axis tensors: image batches are [N, C, H, W], matrix products need matching inner dimensions, and broadcasting stretches missing axes.',
      'A tensor is an array with several axes. Sixty-four grayscale digit images are stored as [64, 1, 28, 28], in the order count N, channels C, height H and width W. Feeding a fully connected layer means flatten(1) turns each image into a row of 784, giving [64, 784], and multiplying by weights of shape [784, 128] gives [64, 128]; the inner dimension 784 must match. Adding a bias of shape [128] automatically stretches the missing axis so it is added to all 64 rows, which is called broadcasting. Tracking shapes is half the work of debugging deep-learning code.', sTensor()),
    item('dl-autograd', '계산 그래프와 자동 미분', 'Computation graphs and autograd',
      '프레임워크는 순전파 때 연산을 그래프로 기록하고, backward()에서 연쇄 법칙으로 거꾸로 따라가며 모든 파라미터의 기울기를 구해요.',
      'PyTorch는 requires_grad=True인 텐서로 계산할 때마다 어떤 연산을 했는지 그래프로 기록해요. y = (w·x + b)²라면 곱셈, 덧셈, 제곱 노드가 이어지고, w = 2, x = 3, b = 1에서 순전파 값은 6, 7, 49예요. y.backward()를 부르면 출력의 기울기 1에서 시작해 그래프를 거꾸로 따라가며 연쇄 법칙으로 곱해요. 제곱 노드는 2z = 14를, 곱셈 노드는 상대 입력을 곱해서 ∂y/∂w = 14 × 3 = 42가 w.grad에 저장돼요. 노드마다 자기 국소 기울기만 알면 되니 수십억 개의 파라미터도 한 번의 역전파로 기울기를 얻어요. 기울기는 누적되므로 매 스텝 zero_grad()로 지우고, 추론 때는 torch.no_grad()로 기록을 꺼요.',
      'Frameworks record operations as a graph during the forward pass, and backward() walks it in reverse with the chain rule to get every parameter’s gradient.',
      'Whenever you compute with tensors that have requires_grad=True, PyTorch records the operations as a graph. For y = (w·x + b)² that is a multiply, an add and a square, and with w = 2, x = 3 and b = 1 the forward values are 6, 7 and 49. Calling y.backward() starts from gradient 1 at the output and walks the graph backward, multiplying by the chain rule: the square contributes 2z = 14 and the multiply contributes the other input, so ∂y/∂w = 14 × 3 = 42 lands in w.grad. Because each node only needs its local gradient, one backward pass delivers gradients for billions of parameters. Gradients accumulate, so clear them with zero_grad() every step, and switch recording off with torch.no_grad() for inference.', sAutograd()),
    item('dl-loss', 'softmax와 교차 엔트로피', 'Softmax and cross-entropy',
      '분류 모델은 logit을 softmax로 확률로 바꾸고, 정답 확률의 −ln을 손실로 써요. 이 조합의 기울기는 p − onehot으로 아주 간단해요.',
      '분류 모델의 마지막 층은 클래스마다 제한 없는 점수(logit)를 내요. softmax는 각 점수를 eˣ로 키운 뒤 합으로 나눠 확률로 바꾸므로 [2.0, 1.0, 0.1]은 [0.66, 0.24, 0.10]이 돼요. 교차 엔트로피 손실은 정답 클래스 확률의 −ln이라서, 정답에 0.66을 주면 0.42지만 0.10만 주면 2.32로 크게 벌을 받고, 확률이 0에 가까워지면 손실은 무한히 커져요. softmax와 교차 엔트로피를 함께 미분하면 logit의 기울기가 p − onehot이 되어 정답 점수는 올리고 나머지는 내려요. PyTorch의 F.cross_entropy는 logit을 그대로 받아 안에서 softmax까지 처리하고, 숫자를 예측하는 회귀에는 평균 제곱 오차(MSE)를 써요.',
      'Classifiers turn logits into probabilities with softmax and use −ln of the true class’s probability as the loss; together their gradient is simply p − onehot.',
      'A classifier’s last layer outputs an unbounded score (logit) per class. Softmax exponentiates each score and divides by the sum, turning [2.0, 1.0, 0.1] into probabilities [0.66, 0.24, 0.10]. Cross-entropy loss is −ln of the true class’s probability: 0.66 on the answer costs 0.42, only 0.10 costs 2.32, and the loss grows without bound as the probability approaches zero. Differentiating softmax and cross-entropy together gives the logit gradient p − onehot, raising the correct score and lowering the rest. PyTorch’s F.cross_entropy takes raw logits and applies softmax internally, while regression, which predicts numbers, uses mean squared error (MSE).', sLoss()),
    item('dl-init', '가중치 초기화', 'Weight initialization',
      '층마다 활성값의 분산이 n·σ²/2배씩 바뀌어요. 너무 작으면 사라지고 너무 크면 폭발하니, ReLU에는 He 초기화 σ = √(2/n)으로 1을 맞춰요.',
      '층을 지날 때마다 활성값의 분산은 입력 수 n과 가중치 분산 σ²에 따라 바뀌고, ReLU 층에서는 n·σ²/2배가 돼요. 입력 512개에 σ = 0.01이면 층마다 표준편차가 0.16배라 10층 뒤 10⁻⁸로 사라지고, σ = 1이면 16배씩 커져 10¹²로 폭발해요. 어느 쪽이든 기울기도 같이 망가져 학습이 되지 않아요. He 초기화는 σ = √(2/n)으로 n·σ²/2 = 1을 맞춰 깊어도 크기가 유지되고, tanh처럼 대칭인 활성화에는 Xavier 초기화 √(1/n)을 써요. PyTorch의 nn.Linear와 nn.Conv2d도 fan_in을 기준으로 기본 초기화를 하고, 배치 정규화와 잔차 연결이 생긴 뒤로는 초기화에 덜 민감해졌어요.',
      'Each layer scales activation variance by n·σ²/2: too small vanishes, too large explodes, so ReLU nets use He initialization σ = √(2/n) to keep it at 1.',
      'Each layer changes the variance of activations according to its fan-in n and the weight variance σ², by a factor of n·σ²/2 for ReLU layers. With 512 inputs and σ = 0.01 the standard deviation shrinks 0.16 times per layer, vanishing to 10⁻⁸ after ten layers, while σ = 1 multiplies it by 16 per layer and explodes to 10¹². Either way the gradients break too and training stalls. He initialization chooses σ = √(2/n) so that n·σ²/2 = 1 and the scale survives depth, while symmetric activations such as tanh use Xavier initialization, √(1/n). PyTorch’s nn.Linear and nn.Conv2d also initialize from fan-in by default, and batch normalization and residual connections have made networks less sensitive to the choice.', sInit()),
    item('dl-batch', '미니배치 학습', 'Minibatch training',
      '데이터를 작은 묶음으로 나눠 묶음마다 갱신해요. 배치 64면 기울기 잡음이 1/8로 줄고 GPU 병렬로 빨라서, 보통 32–512를 써요.',
      '데이터 전체로 기울기를 구하면 정확하지만 한 스텝이 너무 오래 걸려서, 작은 묶음(미니배치)마다 평균 기울기로 갱신해요. 6만 개를 64개씩 나누면 938번의 갱신이 1 에폭이고, 에폭마다 데이터를 섞어 순서를 바꿔요. 배치가 1이면 예제 하나의 기울기라 방향이 들쭉날쭉하고, 64면 잡음이 1/√64 = 1/8로 줄면서 GPU가 64개를 한꺼번에 계산해 효율도 좋아요. 약간의 잡음은 날카로운 최솟값을 벗어나는 데 도움이 되기도 해요. 보통 32–512를 쓰고, 배치를 키우면 학습률도 함께 키우며, GPU 메모리가 상한을 정해요.',
      'Training updates on small batches: a batch of 64 cuts gradient noise to 1/8 and runs in parallel on a GPU, so 32–512 is typical.',
      'A gradient over the full dataset is exact but each step takes too long, so updates use the average gradient of small batches (minibatches). Splitting 60,000 examples into batches of 64 gives 938 updates per epoch, and the data are reshuffled every epoch. With batch size 1 each gradient comes from a single example and its direction jumps around; at 64 the noise shrinks to 1/√64 = 1/8 and the GPU processes all 64 at once efficiently. A little noise can even help escape sharp minima. Batch sizes of 32–512 are typical, larger batches call for larger learning rates, and GPU memory sets the upper limit.', sBatch())
  ]),
  sec('dl-optim', '최적화', 'Optimization', '손실 지형을 잘 내려가는 법', 'Descending the loss landscape well', '모멘텀과 Adam, 워밍업과 코사인 학습률 스케줄, 기울기 클리핑, 그리고 날카로운 최솟값과 평평한 최솟값까지 신경망을 실제로 학습시키는 최적화 기법을 봐요.', 'Momentum and Adam, warm-up and cosine learning-rate schedules, gradient clipping, and sharp versus flat minima: the optimization techniques that actually train networks.', [
    item('dl-momentum', '모멘텀', 'Momentum',
      '지난 기울기를 속도로 누적해 좁은 골짜기의 지그재그를 상쇄하고 골짜기 방향으로는 빨라져요. v ← βv + g, θ ← θ − η·v예요.',
      '손실 지형이 한 방향으로만 가파른 골짜기면 경사 하강은 가파른 쪽으로 왔다 갔다 하며 정작 골짜기를 따라서는 느리게 가요. 모멘텀은 지난 기울기를 속도 v에 누적해서(v ← βv + g) 그 속도로 움직여요. 방향이 계속 바뀌는 성분은 서로 상쇄되고 일정한 방향은 점점 빨라져서, f = ½(x² + 20y²)에서 같은 40스텝 뒤 최솟값까지 거리가 0.21에서 0.06으로 줄어요. 언덕을 굴러 내려가는 공처럼 관성이 생기는 셈이고 보통 β = 0.9를 써요. 한 발 앞에서 기울기를 구하는 네스테로프 모멘텀도 있고, Adam의 m도 같은 생각이에요.',
      'Accumulating past gradients as a velocity cancels zigzags across narrow valleys and speeds travel along them: v ← βv + g, θ ← θ − η·v.',
      'When the loss surface is a valley steep in only one direction, gradient descent bounces across the steep side while crawling along the valley floor. Momentum accumulates past gradients into a velocity (v ← βv + g) and moves by that velocity. Components that keep flipping cancel while a consistent direction speeds up, so on f = ½(x² + 20y²) the distance to the minimum after the same 40 steps drops from 0.21 to 0.06. It behaves like a ball with inertia rolling downhill, with β = 0.9 a common choice. Nesterov momentum evaluates the gradient one step ahead, and Adam’s m is the same idea.', sMomentum()),
    item('dl-adam', 'Adam', 'Adam',
      '기울기 평균 m과 제곱 평균 v를 함께 추적해 파라미터마다 보폭을 맞춰요. 기울기 크기가 1만 배 달라도 모두 비슷하게 움직여요.',
      'Adam은 모멘텀처럼 기울기의 지수 이동 평균 m(β1 = 0.9)을 쓰면서, 기울기 제곱의 이동 평균 v(β2 = 0.999)로 크기도 추적해요. 갱신은 θ ← θ − lr·m̂/(√v̂ + ε)라서 기울기가 100인 파라미터와 0.01인 파라미터가 SGD에서는 보폭이 1만 배 차이 나지만, Adam에서는 둘 다 대략 학습률만큼 움직여요. m과 v는 0에서 시작해 초반에 작게 치우치므로 1 − β^t로 나눠 바로잡는 편향 보정을 해요. 학습률을 덜 세밀하게 골라도 잘 동작해서 트랜스포머 학습의 기본이고, 가중치 감쇠는 AdamW처럼 분리해서 적용해요.',
      'Adam tracks both the mean gradient m and the mean squared gradient v to scale each parameter’s step, so gradients 10,000× apart still move similarly.',
      'Adam keeps an exponential moving average m of the gradient (β1 = 0.9) like momentum, and also tracks its size with a moving average v of the squared gradient (β2 = 0.999). The update θ ← θ − lr·m̂/(√v̂ + ε) means that parameters with gradients of 100 and 0.01, whose SGD steps differ 10,000 times, both move by roughly the learning rate. Because m and v start at zero they are biased small early on, and dividing by 1 − β^t corrects this. It works well without finely tuned learning rates, making it the default for transformers, with weight decay applied separately as in AdamW.', sAdam()),
    item('dl-schedule', '학습률 스케줄', 'Learning-rate schedules',
      '처음 몇백 스텝은 0에서 천천히 올리고(워밍업), 그 뒤 코사인 곡선으로 0에 가깝게 줄여 정밀하게 수렴해요.',
      '학습률을 고정하면 초반에는 무작위 초기 상태의 큰 기울기 때문에 불안정하고, 끝에서는 너무 커서 최솟값 주변을 맴돌아요. 워밍업은 처음 몇백 스텝 동안 0에서 목표값까지 선형으로 올려 초반을 보호하는데, 특히 Adam의 v가 아직 부정확할 때 큰 스텝을 막아 줘요. 그다음 코사인 감쇠는 lr = peak·(1 + cos(πp))/2로 중간에는 크게 탐색하고 끝으로 갈수록 부드럽게 0에 가까워져요. 예전 이미지 모델은 정해진 에폭마다 10배씩 줄이는 계단식 감쇠를 썼고, 지금 트랜스포머는 대부분 워밍업 + 코사인(또는 선형) 감쇠를 써요. torch.optim.lr_scheduler에 여러 스케줄이 들어 있어요.',
      'Ramp the rate up from zero over the first few hundred steps (warm-up), then decay it along a cosine toward zero for a precise finish.',
      'A fixed learning rate is unstable early on, when random weights produce large gradients, and too large at the end, where it circles the minimum. Warm-up ramps linearly from 0 to the target over the first few hundred steps, protecting the start and in particular preventing large steps while Adam’s v is still inaccurate. Cosine decay, lr = peak·(1 + cos(πp))/2, then explores boldly in the middle and eases toward zero at the end. Older image models dropped the rate tenfold at set epochs (step decay), while today’s transformers mostly use warm-up followed by cosine or linear decay. torch.optim.lr_scheduler provides many schedules.', sSchedule()),
    item('dl-clip', '기울기 클리핑', 'Gradient clipping',
      '기울기의 전체 노름이 임계값(보통 1.0)을 넘으면 방향은 그대로 두고 길이만 줄여요. 가끔 터지는 기울기가 학습을 망치지 않게 해요.',
      '깊은 망이나 RNN에서는 가끔 기울기가 갑자기 수십 배로 커져서, 그 한 스텝이 파라미터를 멀리 날려 손실이 튀거나 NaN이 돼요. 기울기 클리핑은 모든 파라미터 기울기를 하나의 벡터로 보고 노름이 임계값 c를 넘을 때만 g ← g·c/‖g‖로 줄여요. 방향은 그대로라서 (3, 4)는 노름 5라 1/5을 곱해 (0.6, 0.8)이 되고, 평소에는 아무 영향이 없어요. backward()와 step() 사이에 clip_grad_norm_(model.parameters(), 1.0) 한 줄이면 되고, 돌려받은 노름을 기록하면 불안정한 순간을 찾는 데도 좋아요. LLM 학습은 거의 다 max_norm 1.0을 쓰고, 혼합 정밀도라면 스케일을 되돌린 뒤 클리핑해요.',
      'If the overall gradient norm exceeds a threshold, typically 1.0, shrink its length while keeping its direction, so rare explosions cannot wreck training.',
      'In deep networks and RNNs the gradient occasionally jumps tens of times larger, and that one step can fling the parameters away, spiking the loss or producing NaN. Gradient clipping treats all parameter gradients as one vector and, only when its norm exceeds a threshold c, rescales it as g ← g·c/‖g‖. The direction is kept, so (3, 4), with norm 5, becomes (0.6, 0.8), and ordinary steps are untouched. It is a single line, clip_grad_norm_(model.parameters(), 1.0), between backward() and step(), and logging the returned norm helps locate unstable moments. Nearly all LLM training uses max_norm 1.0, and with mixed precision the gradients are unscaled before clipping.', sClip()),
    item('dl-landscape', '손실 지형과 최솟값', 'Loss landscapes and minima',
      '최솟값에도 날카로운 것과 평평한 것이 있어요. SGD 잡음은 좁은 골을 빠져나오게 하고, 평평한 최솟값일수록 새 데이터에서도 손실이 잘 유지돼요.',
      '신경망의 손실 지형은 수백만 차원에 골짜기와 안장점이 가득하지만, 실제로는 대부분의 지역 최솟값이 비슷하게 낮은 손실을 가져요. 고차원에서는 나쁜 지역 최솟값보다 기울기가 0인 안장점이 더 흔한 문제예요. 최솟값에도 좁고 깊은 날카로운 최솟값과 넓고 완만한 평평한 최솟값이 있는데, 미니배치 SGD의 잡음은 공을 흔드는 효과가 있어 좁은 골은 빠져나오고 넓은 골에 자리 잡기 쉬워요. 테스트 데이터는 지형이 살짝 옮겨진 것과 비슷해서, 평평한 최솟값은 손실이 거의 그대로이고 날카로운 최솟값은 크게 올라요. 그래서 평평한 최솟값이 일반화에 좋다고 보고, SAM 같은 최적화기는 일부러 평평한 곳을 찾아요.',
      'Minima can be sharp or flat; SGD noise helps escape narrow valleys, and flatter minima keep their low loss on new data.',
      'A network’s loss landscape spans millions of dimensions full of valleys and saddle points, yet in practice most local minima reach similarly low loss, and in high dimensions saddle points with zero gradient are a more common obstacle than bad local minima. Minima also differ in shape: narrow, deep sharp minima versus wide, gentle flat ones. The noise of minibatch SGD jiggles the ball, so it pops out of narrow valleys and tends to settle in wide ones. Test data behaves like a slightly shifted landscape: a flat minimum’s loss barely changes while a sharp one rises steeply. That is why flat minima are thought to generalize better, and optimizers such as SAM deliberately seek them.', sLandscape())
  ]),
  sec('dl-reg', '정규화와 일반화', 'Normalization and generalization', '안정적으로 깊게, 과적합 없이', 'Deep, stable and not overfit', '배치 정규화와 층 정규화, 잔차 연결, 가중치 감쇠와 AdamW, 데이터 증강과 MixUp, 레이블 스무딩까지 깊은 망을 안정적으로 학습시키고 과적합을 막는 방법을 봐요.', 'Batch and layer normalization, residual connections, weight decay and AdamW, data augmentation and MixUp, and label smoothing: ways to train deep networks stably and keep them from overfitting.', [
    item('dl-batchnorm', '배치 정규화', 'Batch normalization',
      '특징마다 미니배치 평균과 분산으로 정규화한 뒤 학습되는 γ, β로 다시 조정해요. 학습이 빨라지지만 추론 때는 이동 평균을 써야 해요.',
      '배치 정규화는 층의 출력을 특징(채널)마다 미니배치 전체의 평균 μ와 분산 σ²로 정규화해 x̂ = (x − μ)/√(σ² + ε)를 만들어요. 평균 5, 표준편차 3으로 치우친 값도 평균 0, 분산 1 근처로 모여서 다음 층이 늘 비슷한 범위의 입력을 받고, 그 덕분에 학습이 빨라지고 큰 학습률도 견뎌요. 그 뒤에 학습되는 γ(크기)와 β(위치)를 곱하고 더해서 필요하면 원래 분포로 되돌릴 수도 있어요. 추론 때는 배치 통계 대신 학습 중 모아 둔 이동 평균을 써야 하므로 model.eval()이 꼭 필요하고, 배치가 아주 작으면 통계가 흔들려 성능이 떨어져요. CNN에서는 채널마다 N·H·W 전체로 통계를 내요.',
      'Normalize each feature with the minibatch mean and variance, then rescale with learned γ and β; training speeds up, but inference must use running averages.',
      'Batch normalization normalizes a layer’s output per feature (channel) with the minibatch mean μ and variance σ², producing x̂ = (x − μ)/√(σ² + ε). Values skewed to mean 5 and standard deviation 3 are pulled near mean 0 and variance 1, so the next layer always sees a similar range, which speeds training and tolerates larger learning rates. A learned scale γ and shift β are then applied, letting the network even undo the normalization if useful. At inference the running averages gathered during training replace batch statistics, which is why model.eval() matters, and very small batches make the statistics noisy and hurt accuracy. In CNNs the statistics are computed per channel over N, H and W.', sBN()),
    item('dl-layernorm', '층 정규화', 'Layer normalization',
      '샘플 하나의 모든 특징에 걸쳐 정규화해서 배치 크기와 상관없어요. 길이가 제각각인 문장을 다루는 RNN과 트랜스포머의 표준이에요.',
      '배치 정규화는 같은 특징을 여러 샘플에 걸쳐 정규화하므로, 배치가 작거나 문장 길이가 제각각이면 통계가 불안정해요. 층 정규화는 샘플 하나의 모든 특징에 걸쳐 평균과 분산을 구해서 다른 샘플과 무관하게 계산돼요. 그래서 배치 크기 1에서도, 길이가 다른 문장에서도 똑같이 동작하고 학습과 추론의 동작 차이도 없어요. 트랜스포머는 각 서브층(어텐션, 피드포워드) 앞에서 정규화하고 잔차로 더하는 Pre-LN 구조를 주로 써서 깊어도 안정적으로 학습돼요. 평균을 빼지 않고 RMS로만 나누는 RMSNorm은 더 가벼워서 LLaMA 계열 모델이 써요.',
      'Normalizing across all features of one sample makes it independent of batch size, the standard for RNNs and transformers handling sentences of any length.',
      'Batch normalization normalizes one feature across many samples, so small batches or sentences of varying length make its statistics unstable. Layer normalization computes the mean and variance across all features of a single sample, independently of the others. It therefore behaves identically with a batch of one or sentences of any length, with no difference between training and inference. Transformers mostly use the pre-LN arrangement, normalizing before each sublayer (attention, feed-forward) and adding the residual, which keeps deep stacks stable. RMSNorm skips the mean subtraction and divides by the RMS alone, a lighter variant used by LLaMA-family models.', sLN()),
    item('dl-residual', '잔차 연결', 'Residual connections',
      '블록의 출력에 입력을 그대로 더해요(y = x + f(x)). 미분에 항상 1이 남아 기울기가 깊은 층까지 살아남고, 152층 망도 학습돼요.',
      '잔차 연결은 블록의 출력에 입력 x를 그대로 더해 y = x + f(x)로 만들어요. 블록은 입력과의 차이(잔차)만 배우면 되고, 필요 없으면 f를 0에 가깝게 두어 항등 함수가 될 수 있어요. 층을 그냥 쌓으면 역전파 때 기울기가 층마다 곱해져 0.7배씩이면 50층 뒤에는 10⁻⁸로 사라지지만, 잔차 블록의 미분은 1 + ∂f/∂x라서 지름길로 기울기가 그대로 흘러요. 2015년 ResNet은 이 방법으로 152층을 학습했고, 잔차 없는 56층 망은 20층 망보다 학습 오차조차 컸어요. 트랜스포머의 모든 블록도 잔차 구조이고, 입출력 모양이 다르면 지름길에 1×1 합성곱을 써요.',
      'Add the block’s input to its output, y = x + f(x): the derivative always keeps a 1, so gradients survive to deep layers and even 152-layer nets train.',
      'A residual connection adds the input x straight to a block’s output, y = x + f(x), so the block only learns the difference (the residual) and can fall back to the identity by keeping f near zero. In a plain stack, gradients are multiplied layer by layer during backprop, vanishing to 10⁻⁸ after 50 layers at 0.7 each, but a residual block’s derivative is 1 + ∂f/∂x, so gradients flow through the shortcut intact. ResNet trained 152 layers this way in 2015, while a plain 56-layer net had even higher training error than a 20-layer one. Every transformer block is residual too, and when shapes differ the shortcut uses a 1×1 convolution.', sResidual()),
    item('dl-decay', '가중치 감쇠와 AdamW', 'Weight decay and AdamW',
      '손실에 λ/2·‖w‖²를 더해 큰 가중치에 벌점을 줘요. 가중치가 0 쪽으로 당겨져 과적합이 줄고, Adam에서는 AdamW처럼 분리해 적용해요.',
      '가중치 감쇠(L2 정규화)는 손실에 λ/2·‖w‖²를 더해 큰 가중치에 벌점을 줘요. 기울기에 λ·w가 더해지므로 매 스텝 가중치가 0 쪽으로 조금씩 줄어들어요. 데이터 손실만으로는 최솟값이 w* = (2, 1.2)라도 λ = 1이면 ‖w‖²과 균형을 맞춘 (1, 0.96)으로 옮겨져요. 가중치가 작으면 입력의 작은 변화에 덜 민감해 과적합이 줄어요. 다만 Adam에 L2 항을 그냥 섞으면 √v로 나뉘어 파라미터마다 감쇠가 들쭉날쭉해지므로, AdamW는 w ← w − lr·λ·w를 적응 스케일과 따로 적용해요. LLM은 보통 0.1 근처를 쓰고, 편향과 정규화 층의 γ, β에는 감쇠를 빼는 경우가 많아요.',
      'Adding λ/2·‖w‖² to the loss penalizes large weights, pulling them toward zero to reduce overfitting; with Adam, apply it separately as AdamW does.',
      'Weight decay (L2 regularization) adds λ/2·‖w‖² to the loss, penalizing large weights, and the resulting λ·w term in the gradient shrinks the weights slightly toward zero every step. Even if the data loss alone is minimized at w* = (2, 1.2), with λ = 1 the optimum moves to (1, 0.96), where it balances against ‖w‖². Small weights make the model less sensitive to tiny input changes, reducing overfitting. Mixing the L2 term into Adam, however, divides it by √v and makes the decay uneven across parameters, so AdamW applies w ← w − lr·λ·w separately from the adaptive scaling. LLMs typically use values around 0.1 and often exclude biases and normalization γ and β from decay.', sDecay()),
    item('dl-augment', '데이터 증강', 'Data augmentation',
      '정답을 바꾸지 않는 변형(자르기, 뒤집기, 색 바꾸기)으로 매 에폭 새로운 학습 데이터를 만들어요. MixUp은 이미지와 레이블을 함께 섞어요.',
      '데이터를 더 모으기 어려울 때는 정답이 바뀌지 않는 변형으로 매 에폭 조금씩 다른 학습 데이터를 만들어요. 무작위로 잘라 크기를 맞추면 물체의 위치와 크기가 달라도 알아보게 되고, 좌우 뒤집기와 밝기·대비·색 바꾸기는 조명이나 방향 같은 사소한 차이를 무시하게 해 줘요. MixUp은 두 이미지를 0.7 : 0.3처럼 섞고 레이블도 같은 비율로 섞어 결정 경계를 부드럽게 하고 과신을 줄여요. 숫자 6과 9처럼 뒤집으면 뜻이 바뀌는 경우는 조심해야 하고, 증강은 학습 때만 쓰고 검증·테스트에서는 하지 않아요. torchvision.transforms의 Compose로 여러 변형을 이어 붙여요.',
      'Label-preserving transformations such as crops, flips and color changes create fresh training data every epoch; MixUp blends images and labels together.',
      'When more data is hard to collect, label-preserving transformations produce slightly different training data every epoch. Random crops resized to the input teach the model to recognize objects at different positions and scales, while horizontal flips and brightness, contrast or color changes teach it to ignore trivial differences in lighting or orientation. MixUp blends two images, say 0.7 : 0.3, and mixes their labels in the same ratio, smoothing decision boundaries and curbing overconfidence. Beware transformations that change meaning, like flipping a 6 into a 9, and augment only during training, never for validation or testing. torchvision’s transforms.Compose chains several transformations together.', sAug()),
    item('dl-label-smooth', '레이블 스무딩', 'Label smoothing',
      '정답을 1 대신 0.925처럼 조금 낮추고 나머지에 나눠 줘요. 모델이 끝없이 과신하지 않고 확신도와 정확도가 잘 맞게 돼요.',
      '원-핫 정답은 정답 클래스가 1, 나머지가 0이라서, 이를 맞추려면 정답 확률이 정확히 1이어야 해 logit 차이를 끝없이 키우게 돼요. 레이블 스무딩은 ε만큼을 모든 클래스에 나눠 줘서 K = 4, ε = 0.1이면 정답은 0.925, 나머지는 0.025가 돼요. 이러면 손실이 logit 차이 ln(0.925/0.025) = 3.61에서 최소가 되어 더 키울 이유가 사라져요. 모델이 과하게 확신하지 않으니 90%라고 말할 때 실제로 90% 맞는, 보정이 잘 된 예측이 나와요. F.cross_entropy(..., label_smoothing=0.1)처럼 한 인자로 쓸 수 있고 이미지 분류와 기계 번역에서 흔히 써요.',
      'Lower the target from 1 to about 0.925 and spread the rest over other classes, so the model stops growing overconfident and its confidence matches its accuracy.',
      'A one-hot target is 1 for the true class and 0 elsewhere, and matching it requires a probability of exactly 1, so the logit gap is pushed forever. Label smoothing spreads ε over all classes: with K = 4 and ε = 0.1 the answer becomes 0.925 and the others 0.025. The loss then bottoms out at a logit gap of ln(0.925/0.025) = 3.61, removing the incentive to keep growing it. A model that is not overconfident gives better-calibrated predictions, so 90% confidence really means about 90% correct. It is a single argument, as in F.cross_entropy(..., label_smoothing=0.1), and is common in image classification and machine translation.', sSmooth())
  ]),
  sec('dl-cnn', 'CNN 심화', 'Convolutional networks in depth', '이미지를 보는 신경망', 'Networks that see images', '합성곱의 출력 크기와 파라미터 계산, 수용 영역, 깊이별 분리 합성곱, AlexNet에서 ViT까지의 대표 구조, 전이 학습, 그리고 물체 검출의 IoU와 NMS까지 CNN을 깊이 봐요.', 'Convolution output sizes and parameter counts, receptive fields, depthwise separable convolutions, landmark architectures from AlexNet to ViT, transfer learning, and IoU and NMS in object detection: CNNs in depth.', [
    item('dl-conv-shape', '합성곱의 모양 계산', 'Convolution shape arithmetic',
      '출력 크기는 ⌊(W − K + 2P)/S⌋ + 1이에요. 3×3, 패딩 1은 크기를 유지하고 stride 2는 절반으로 줄이며, 가중치 공유로 파라미터가 아주 적어요.',
      '합성곱 층은 작은 커널을 입력 위로 밀며 같은 가중치로 곱해 더해요. 출력의 가로세로는 ⌊(W − K + 2P)/S⌋ + 1이라서, 3×3 커널에 테두리를 0으로 한 칸 채우는 패딩 1, stride 1이면 32×32가 그대로 32×32예요. stride 2는 두 칸씩 건너뛰며 계산해 16×16으로 줄이고, 풀링 대신 다운샘플링에 많이 써요. 파라미터는 K × K × C_in × C_out + C_out이라 Conv2d(3, 64, 3)은 1,792개뿐인데, 같은 연결을 완전 연결 층으로 만들면 약 2억 개가 필요해요. 위치마다 가중치를 공유하기 때문에 적은 파라미터로 어디서든 같은 패턴을 찾을 수 있어요.',
      'The output size is ⌊(W − K + 2P)/S⌋ + 1: 3×3 with padding 1 keeps the size, stride 2 halves it, and weight sharing keeps parameters tiny.',
      'A convolution slides a small kernel across the input, multiplying and summing with the same weights everywhere. The output width and height are ⌊(W − K + 2P)/S⌋ + 1, so a 3×3 kernel with padding 1 (a border of zeros) and stride 1 keeps 32×32 at 32×32. Stride 2 computes at every other position, shrinking it to 16×16, and is often used for downsampling instead of pooling. Parameters number K × K × C_in × C_out + C_out, so Conv2d(3, 64, 3) has only 1,792, whereas a fully connected layer with the same connectivity would need about 200 million. Sharing weights across positions lets a few parameters find the same pattern anywhere.', sConvShape()),
    item('dl-receptive', '수용 영역', 'Receptive fields',
      '3×3 합성곱을 L층 쌓으면 출력 한 칸이 입력 1 + 2L칸을 봐요. stride 2나 풀링을 섞으면 지수적으로 넓어져 뒤쪽 층은 물체 전체를 봐요.',
      '수용 영역은 출력 한 칸에 영향을 주는 입력의 범위예요. 3×3 합성곱 한 층은 3칸, 두 층은 5칸, 세 층은 7칸처럼 1 + 2L로 넓어져요. 3×3 두 번은 5×5 한 번과 같은 범위를 보면서도 파라미터가 18C²로 25C²보다 적고 비선형성이 하나 더 들어가서, VGG는 3×3만 깊게 쌓았어요. stride 2나 풀링을 섞으면 층마다 범위가 두 배씩 커져 2^(L+1) − 1처럼 지수적으로 넓어져요. 그래서 CNN의 앞쪽 층은 가장자리와 질감 같은 작은 패턴을, 뒤쪽 층은 물체 전체를 봐요. 팽창(dilated) 합성곱은 칸 사이를 띄워 파라미터 없이 범위를 넓혀요.',
      'Stacking L layers of 3×3 lets one output cell see 1 + 2L input cells; mixing in stride 2 or pooling widens it exponentially so late layers see whole objects.',
      'The receptive field is the span of input that influences one output cell. One 3×3 convolution sees 3 cells, two see 5 and three see 7, growing as 1 + 2L. Two 3×3 layers cover the same span as one 5×5 with fewer parameters, 18C² versus 25C², plus an extra nonlinearity, which is why VGG stacks only 3×3 kernels. Adding stride 2 or pooling doubles the span each layer, growing exponentially as 2^(L+1) − 1. Hence a CNN’s early layers see small patterns such as edges and textures while late layers see whole objects. Dilated convolutions space out their taps to widen the field without extra parameters.', sReceptive()),
    item('dl-depthwise', '깊이별 분리 합성곱', 'Depthwise separable convolution',
      '채널마다 3×3을 따로 하고(깊이별), 1×1로 채널을 섞어요. 128채널에서 파라미터가 약 8.4배 줄어 휴대폰용 모델의 핵심이에요.',
      '일반 합성곱은 출력 채널 하나마다 입력의 모든 채널을 3×3으로 봐서, 128 → 128채널이면 3·3·128·128 = 147,456개의 가중치가 필요해요. 깊이별 분리 합성곱은 이를 두 단계로 나눠요. 먼저 깊이별 합성곱(groups=128)이 채널마다 자기 3×3 커널 하나로 공간 패턴만 보고(1,152개), 이어지는 1×1 점별 합성곱이 각 위치에서 채널들을 섞어요(16,384개). 합쳐도 17,536개라 약 8.4배 가볍고 계산량도 비슷하게 줄어요. 정확도는 조금 손해지만 MobileNet, EfficientNet처럼 휴대폰과 임베디드 기기에서 도는 모델의 핵심 블록이고, 1×1 합성곱은 채널 수를 줄이거나 늘리는 데도 따로 많이 써요.',
      'Apply a separate 3×3 per channel (depthwise), then mix channels with 1×1; at 128 channels this cuts parameters about 8.4×, the core of mobile models.',
      'A standard convolution has each output channel look at every input channel through 3×3, so 128 to 128 channels needs 3·3·128·128 = 147,456 weights. A depthwise separable convolution splits this into two steps: a depthwise convolution (groups=128) gives each channel its own 3×3 kernel to capture spatial patterns only (1,152 weights), and a 1×1 pointwise convolution then mixes channels at each position (16,384 weights). Together that is 17,536, about 8.4 times lighter, with similar savings in computation. It costs a little accuracy but is the core block of models that run on phones and embedded devices, such as MobileNet and EfficientNet, and 1×1 convolutions are also widely used on their own to shrink or expand channel counts.', sDepthwise()),
    item('dl-archs', '대표 CNN 구조의 흐름', 'Landmark CNN architectures',
      'AlexNet(2012, top-5 오류 15.3%)에서 VGG·GoogLeNet(2014), ResNet(2015, 3.57%)을 거쳐 ViT(2020)까지, ImageNet이 이끈 구조의 발전이에요.',
      '2012년 AlexNet은 GPU로 큰 CNN을 학습해 ImageNet top-5 오류율을 15.3%로 크게 낮추며 딥러닝 붐을 일으켰고, ReLU와 드롭아웃도 이때 널리 퍼졌어요. 2014년 VGG는 3×3 합성곱만 16~19층으로 깊게 쌓아 7.3%를, GoogLeNet은 여러 크기의 커널을 나란히 쓰는 인셉션 블록으로 6.7%를 냈어요. 2015년 ResNet은 잔차 연결로 152층을 학습해 3.57%로 사람의 추정치 약 5.1%보다 낮아졌어요. 2020년 ViT는 이미지를 16×16 패치로 잘라 트랜스포머에 넣었고, 데이터가 많으면 CNN 못지않아 지금은 둘을 섞은 구조도 많아요. 파라미터는 AlexNet 61M, VGG-16 138M, ResNet-50 25.6M으로, 크다고 꼭 정확한 건 아니에요.',
      'From AlexNet (2012, 15.3% top-5 error) through VGG and GoogLeNet (2014) and ResNet (2015, 3.57%) to ViT (2020): architectures driven by ImageNet.',
      'In 2012 AlexNet trained a large CNN on GPUs and cut the ImageNet top-5 error to 15.3%, sparking the deep-learning boom and popularizing ReLU and dropout. In 2014 VGG reached 7.3% by stacking 3×3 convolutions 16 to 19 layers deep, and GoogLeNet reached 6.7% with inception blocks that run several kernel sizes in parallel. In 2015 ResNet trained 152 layers with residual connections and reached 3.57%, below the roughly 5.1% human estimate. In 2020 ViT cut images into 16×16 patches for a transformer, matching CNNs given enough data, and hybrids of the two are now common. Parameter counts, AlexNet 61M, VGG-16 138M and ResNet-50 25.6M, show that bigger does not automatically mean more accurate.', sArchs()),
    item('dl-transfer', '전이 학습', 'Transfer learning',
      '큰 데이터로 미리 학습한 몸통을 가져와 고정하고, 내 클래스 수에 맞는 새 머리만 학습해요. 데이터가 많으면 위층부터 풀어 미세 조정해요.',
      '전이 학습은 ImageNet 120만 장처럼 큰 데이터로 미리 학습한 모델을 가져와 내 문제에 맞게 고쳐 써요. 아래층이 배운 가장자리와 질감은 거의 모든 이미지에 통하고, 위층으로 갈수록 무늬, 부분, 물체처럼 점점 구체적인 특징을 배워요. 그래서 몸통의 파라미터를 requires_grad = False로 고정하고, 마지막 분류 층만 nn.Linear(2048, 10)처럼 내 클래스 수에 맞게 새로 만들어 학습하면 적은 데이터로도 빠르게 높은 정확도를 얻어요. 데이터가 더 있으면 위층부터 조금씩 풀어 작은 학습률로 미세 조정하고, 의료 영상처럼 도메인이 아주 다르면 더 많은 층을 풀어요. 입력 정규화는 사전 학습 때와 같게 맞춰야 하고, LLM의 사전 학습과 미세 조정도 같은 생각이에요.',
      'Reuse a body pretrained on big data, freeze it and train only a new head for your classes; with more data, unfreeze from the top and fine-tune.',
      'Transfer learning takes a model pretrained on a large dataset, such as ImageNet’s 1.2 million images, and adapts it to your problem. The edges and textures learned by low layers apply to almost any image, while higher layers learn progressively more specific patterns, parts and objects. Freezing the body with requires_grad = False and training only a new final layer sized to your classes, such as nn.Linear(2048, 10), reaches high accuracy quickly even with little data. With more data, unfreeze from the top down and fine-tune at a small learning rate, unfreezing more for very different domains such as medical images. Match the input normalization used in pretraining; pretraining and fine-tuning LLMs follows the same idea.', sTransfer()),
    item('dl-detect', '물체 검출: IoU와 NMS', 'Object detection: IoU and NMS',
      '검출은 클래스와 함께 상자를 맞혀요. 상자가 얼마나 맞았는지 IoU로 재고, 한 물체에 겹친 상자들은 NMS로 하나만 남겨요.',
      '물체 검출은 무엇이 있는지와 함께 어디 있는지를 상자 (x1, y1, x2, y2)로 맞혀요. 두 상자가 얼마나 일치하는지는 교집합 넓이를 합집합 넓이로 나눈 IoU로 재는데, 4×4 상자 두 개가 2×2만큼 겹치면 4 / 28 = 0.14라서 같은 물체로 보지 않고, 보통 0.5 이상이면 맞혔다고 봐요. 모델은 한 물체에 상자를 여러 개 내놓기 쉬워서, 비최대 억제(NMS)는 점수 높은 상자부터 남기고 그것과 IoU 0.5 넘게 겹치는 상자를 지워요. 성능은 여러 IoU 기준에서 정밀도-재현율을 따진 mAP로 비교해요. YOLO는 한 번에 검출하고, Faster R-CNN은 후보 영역을 거치며, DETR은 NMS 없이 상자 집합을 바로 예측해요.',
      'Detection predicts boxes as well as classes: IoU measures how well boxes match, and NMS keeps one box among those overlapping the same object.',
      'Object detection predicts where things are as boxes (x1, y1, x2, y2), not just what they are. Agreement between two boxes is measured by IoU, the intersection area divided by the union area: two 4×4 boxes overlapping by 2×2 give 4 / 28 = 0.14, not the same object, while 0.5 or more usually counts as a hit. Models tend to output several boxes per object, so non-maximum suppression (NMS) keeps the highest-scoring box and deletes those overlapping it by IoU above 0.5. Models are compared by mAP, which averages precision–recall across IoU thresholds. YOLO detects in a single pass, Faster R-CNN goes through region proposals, and DETR predicts a set of boxes directly without NMS.', sDetect())
  ]),
  sec('dl-seq', '시퀀스 모델', 'Sequence models', '순서가 있는 데이터', 'Data with an order', 'RNN과 시간 역전파, LSTM의 게이트, 인코더-디코더 seq2seq, 사인파 위치 인코딩과 RoPE, 멀티헤드 어텐션과 인과 마스크까지 순서가 있는 데이터를 다루는 모델을 봐요.', 'RNNs and backpropagation through time, LSTM gates, encoder–decoder seq2seq, sinusoidal positional encodings and RoPE, and multi-head attention with causal masks: models for ordered data.', [
    item('dl-rnn', '순환 신경망(RNN)', 'Recurrent neural networks',
      '한 시점씩 읽으며 은닉 상태에 지금까지를 요약해요. 시간으로 펼친 깊은 망이라 기울기가 시점마다 곱해져 먼 과거를 잘 잊어요.',
      'RNN은 시퀀스를 한 시점씩 읽으며 h_t = tanh(W_h·h_{t−1} + W_x·x_t + b)로 은닉 상태를 갱신해 지금까지의 정보를 요약해요. 같은 가중치를 매 시점 다시 쓰므로 길이가 다른 입력도 처리할 수 있어요. 시간 축으로 펼치면 시점마다 층이 하나씩 있는 깊은 망과 같고, 학습은 펼친 그래프 전체에 역전파를 하는 BPTT(시간 역전파)로 해요. 하지만 기울기가 시점마다 곱해져서 0.9배씩이면 50스텝 전에는 0.5%만 남아 먼 과거의 정보를 배우기 어렵고, 반대로 1보다 크면 폭발해 클리핑이 필요해요. 시점을 순서대로 계산해야 해서 병렬화도 어려워요.',
      'An RNN reads one step at a time, summarizing the past in a hidden state; unrolled it is a deep net whose gradients multiply per step, so it forgets the distant past.',
      'An RNN reads a sequence one step at a time, updating a hidden state h_t = tanh(W_h·h_{t−1} + W_x·x_t + b) that summarizes everything so far. Reusing the same weights at every step lets it handle inputs of any length. Unrolled through time it is a deep network with one layer per step, trained by backpropagation through time (BPTT) over the unrolled graph. Gradients are multiplied at every step, though: at 0.9 per step only 0.5% survives 50 steps back, so long-range information is hard to learn, and factors above 1 explode and need clipping. Because steps must be computed in order, it is also hard to parallelize.', sRNN()),
    item('dl-lstm', 'LSTM', 'LSTM',
      '셀 상태라는 컨베이어 벨트와 잊기·입력·출력 게이트로 기억을 조절해요. 셀 경로에서는 f만 곱해져 기울기가 오래 살아남아요.',
      'LSTM은 은닉 상태와 별도로 셀 상태 c를 두고, 0~1 사이의 시그모이드 게이트 세 개로 정보를 조절해요. 잊기 게이트 f는 이전 셀 상태에 곱해져 f ≈ 1이면 기억을 유지하고 f ≈ 0이면 지워요. 입력 게이트 i는 새 후보 g를 얼마나 더할지 정해 c = f⊙c + i⊙g가 되고, 출력 게이트 o는 h = o⊙tanh(c)로 셀의 어느 부분을 내보낼지 정해요. 셀 경로에서는 기울기가 f만 곱해지고 더해지기만 해서, f = 0.99면 50스텝 뒤에도 60%가 남아 긴 문맥을 배울 수 있어요(일반 RNN은 0.5%). 게이트를 두 개로 줄인 GRU도 있고, 트랜스포머 이전에는 번역과 음성 인식의 표준이었어요.',
      'A cell state acts as a conveyor belt controlled by forget, input and output gates; along it gradients are only multiplied by f, so they last.',
      'An LSTM adds a cell state c alongside the hidden state and controls information with three sigmoid gates between 0 and 1. The forget gate f multiplies the previous cell state, keeping memory when f ≈ 1 and erasing it when f ≈ 0. The input gate i scales how much of a new candidate g is added, giving c = f⊙c + i⊙g, and the output gate o chooses what to emit with h = o⊙tanh(c). Along the cell path the gradient is only multiplied by f and added to, so at f = 0.99 about 60% survives 50 steps, against 0.5% for a plain RNN, and long contexts become learnable. The GRU is a two-gate variant, and LSTMs were the standard for translation and speech recognition before transformers.', sLSTM()),
    item('dl-seq2seq', '시퀀스-투-시퀀스', 'Sequence to sequence',
      '인코더가 원문을 문맥 벡터로 요약하고 디코더가 한 단어씩 생성해요. 벡터 하나에 담는 병목을 어텐션이 풀었고, 이것이 트랜스포머로 이어졌어요.',
      'seq2seq 모델은 인코더 RNN이 원문을 읽어 마지막 상태(문맥 벡터 c)로 요약하고, 디코더 RNN이 그 벡터에서 출발해 다른 길이의 출력을 만들어요. 디코더는 앞서 만든 단어를 다시 입력받아 한 단어씩 생성하다가 <EOS>가 나오면 멈추고, 학습 때는 자기 예측 대신 정답 단어를 넣어 주는 teacher forcing으로 빠르게 배워요. 문제는 문장 전체가 고정 크기의 벡터 하나에 눌려 담겨 문장이 길수록 앞부분이 흐려지는 병목이에요. 어텐션은 디코더가 단어마다 인코더의 모든 상태를 다시 보고 관련 있는 곳에 가중치를 주게 해서 이를 풀었고, 이 생각이 RNN을 아예 빼고 어텐션만 쓰는 트랜스포머로 이어졌어요.',
      'An encoder summarizes the source into a context vector and a decoder generates word by word; attention removed the one-vector bottleneck and led to the transformer.',
      'In a seq2seq model an encoder RNN reads the source and summarizes it in its final state (the context vector c), and a decoder RNN starts from that vector to produce an output of a different length. The decoder feeds back each word it generates until it emits <EOS>, and training speeds up by feeding the true previous word instead of its own prediction (teacher forcing). The weakness is the bottleneck: the whole sentence is squeezed into one fixed-size vector, so the beginning fades as sentences grow. Attention solved this by letting the decoder revisit every encoder state for each word and weight the relevant ones, an idea that led to the transformer, which drops the RNN entirely and keeps only attention.', sSeq2seq()),
    item('dl-posenc', '위치 인코딩', 'Positional encoding',
      '어텐션은 순서를 몰라서 위치 신호를 임베딩에 더해요. 차원마다 다른 주파수의 sin·cos를 쓰고, 요즘 LLM은 q·k를 회전시키는 RoPE를 써요.',
      '어텐션은 토큰들을 집합처럼 다뤄 순서를 바꿔도 결과가 같아요. 그래서 위치마다 고유한 벡터를 토큰 임베딩에 더해 순서를 알려 줘요. 원래 트랜스포머의 사인파 위치 인코딩은 차원 쌍마다 pos/10000^(2i/d)의 각도로 sin과 cos를 써서, 앞쪽 차원은 빨리, 뒤쪽 차원은 천천히 도는 여러 주기를 시계의 초침과 시침처럼 합쳐 위치를 나타내요. 위치 차이가 회전으로 표현되어 상대 위치를 다루기 좋아요. BERT와 GPT-2는 위치 임베딩을 직접 학습했고, 요즘 LLM은 q와 k 벡터를 위치만큼 회전시키는 RoPE를 주로 써서 상대 위치가 내적에 자연스럽게 들어가고 긴 문맥으로 늘리기도 쉬워요.',
      'Attention is order-blind, so a position signal is added to embeddings: sin and cos at a different frequency per dimension, or RoPE, which rotates q and k, in modern LLMs.',
      'Attention treats tokens like a set, so shuffling them leaves the result unchanged; a unique vector per position is therefore added to the token embeddings to convey order. The original transformer’s sinusoidal encoding uses sin and cos at angle pos/10000^(2i/d) for each pair of dimensions, so early dimensions cycle fast and later ones slowly, combining periods like a clock’s hands to mark position. Position differences become rotations, which suits relative positions. BERT and GPT-2 learned their position embeddings directly, while modern LLMs mostly use RoPE, rotating the q and k vectors by their position so that relative position enters the dot product naturally and contexts extend more easily.', sPosEnc()),
    item('dl-mha', '멀티헤드 어텐션과 마스크', 'Multi-head attention and masking',
      '어텐션을 여러 헤드로 나눠 서로 다른 관계를 봐요. 인과 마스크로 미래를 가려 다음 토큰을 미리 못 보게 하고, 비용은 문맥 길이의 제곱이에요.',
      '멀티헤드 어텐션은 512차원을 64차원씩 8개 헤드로 나눠 각자 어텐션을 계산해요. 헤드마다 문법 관계, 지시 대상, 가까운 단어처럼 서로 다른 관계를 잡고, 결과를 이어 붙여 Wo로 섞어요. 각 헤드는 토큰 쌍마다 q·k를 √64로 나눈 점수를 구하는데, 나누지 않으면 값이 커져 softmax가 한 칸에 몰려요. 다음 토큰을 예측하는 모델은 미래 위치를 −∞로 가리는 인과 마스크를 써서 softmax 뒤 0이 되게 하고, 덕분에 학습 때 모든 위치를 한꺼번에 계산할 수 있어요. 점수 행렬이 n × n이라 문맥이 두 배가 되면 계산과 메모리는 네 배가 되므로, FlashAttention과 KV 캐시 같은 기법으로 비용을 줄여요.',
      'Attention is split across heads that capture different relations; a causal mask hides the future from next-token prediction, and the cost grows with the square of context length.',
      'Multi-head attention splits 512 dimensions into 8 heads of 64 that each compute attention independently, capturing different relations such as syntax, reference or nearby words, before their outputs are concatenated and mixed by Wo. Each head scores token pairs with q·k divided by √64; without the division values grow and softmax collapses onto a single entry. A next-token model applies a causal mask that sets future positions to −∞ so they become 0 after softmax, which lets training compute every position at once. Because the score matrix is n × n, doubling the context quadruples compute and memory, and techniques such as FlashAttention and KV caching reduce the cost.', sMHA())
  ]),
  sec('dl-gen', '생성 모델과 실무', 'Generative models and practice', '새로운 데이터를 만드는 모델', 'Models that create new data', '오토인코더와 디노이징, 변분 오토인코더와 재매개변수화, GAN의 경쟁 학습, 확산 모델의 잡음 예측, 그리고 bf16 혼합 정밀도까지 생성 모델과 학습 실무를 봐요.', 'Autoencoders and denoising, variational autoencoders and the reparameterization trick, adversarial training in GANs, noise prediction in diffusion models, and bf16 mixed precision: generative models and training practice.', [
    item('dl-autoencoder', '오토인코더', 'Autoencoders',
      '인코더가 입력을 작은 잠재 벡터로 압축하고 디코더가 되살려요. 복원 오차를 줄이면 핵심 특징만 남고, 잡음 제거와 이상 탐지에 써요.',
      '오토인코더는 입력을 작은 벡터 z로 압축하는 인코더와, z에서 원래 입력을 되살리는 디코더로 이뤄져요. 784개 픽셀을 숫자 32개로 줄이는 병목 때문에 다 담을 수 없어서 중요한 특징만 남겨야 해요. 학습 목표는 복원 x̂와 원본 x의 차이(MSE)를 줄이는 것이라 정답 레이블이 필요 없는 자기 지도 학습이에요. 입력에 잡음을 넣고 깨끗한 원본을 맞히게 하면 디노이징 오토인코더가 되어 잡음 제거에 쓰고, 정상 데이터로만 학습하면 복원 오차가 큰 입력을 이상치로 찾을 수 있어요. 다만 잠재 공간이 듬성듬성해서 아무 z나 넣으면 이상한 결과가 나와, 새 샘플 생성에는 VAE가 필요해요.',
      'An encoder compresses the input into a small latent vector and a decoder rebuilds it; minimizing reconstruction error keeps the essentials, useful for denoising and anomaly detection.',
      'An autoencoder pairs an encoder that compresses the input into a small vector z with a decoder that rebuilds the input from z. A bottleneck squeezing 784 pixels into 32 numbers cannot hold everything, so only the important features survive. Training minimizes the difference (MSE) between the reconstruction x̂ and the original x, a self-supervised task needing no labels. Adding noise to the input while targeting the clean original yields a denoising autoencoder, and training only on normal data lets inputs with large reconstruction error be flagged as anomalies. Its latent space is patchy, though, so arbitrary z values decode into nonsense, and generating new samples calls for a VAE.', sAE()),
    item('dl-vae', '변분 오토인코더(VAE)', 'Variational autoencoders',
      '인코더가 분포 N(μ, σ²)를 내고 z = μ + σ·ε로 뽑아요. KL 항이 잠재 공간을 표준 정규 분포 쪽으로 당겨, z ~ N(0, 1)을 뽑으면 새 샘플이 나와요.',
      'VAE의 인코더는 점 하나 대신 분포 N(μ, σ²)의 평균과 (log) 분산을 내요. 샘플링은 미분할 수 없으니 z = μ + σ·ε, ε ~ N(0, 1)처럼 무작위를 ε에만 넣어 μ와 σ로 기울기가 흐르게 하는데, 이를 재매개변수화 기법이라 해요. 손실은 복원 오차에 KL(q(z|x) ‖ N(0, 1)) = −½Σ(1 + log σ² − μ² − σ²)를 더해요. KL 항은 각 입력의 분포를 표준 정규 분포 쪽으로 당겨 잠재 공간을 빈틈없이 매끄럽게 만들어요. 그래서 N(0, 1)에서 z를 뽑아 디코더에 넣으면 그럴듯한 새 샘플이 나오고, 두 z 사이를 이으면 부드럽게 변하는 이미지도 만들 수 있어요. 결과가 다소 흐릿한 편이지만, Stable Diffusion도 VAE의 잠재 공간 안에서 확산을 해요.',
      'The encoder outputs N(μ, σ²) and samples z = μ + σ·ε; a KL term pulls the latent space toward a standard normal, so sampling z ~ N(0, 1) yields new samples.',
      'A VAE’s encoder outputs the mean and (log) variance of a distribution N(μ, σ²) instead of a single point. Sampling cannot be differentiated, so randomness is isolated in ε, writing z = μ + σ·ε with ε ~ N(0, 1), which lets gradients reach μ and σ: the reparameterization trick. The loss adds KL(q(z|x) ‖ N(0, 1)) = −½Σ(1 + log σ² − μ² − σ²) to the reconstruction error. The KL term pulls each input’s distribution toward the standard normal, making the latent space smooth and gap-free, so decoding z sampled from N(0, 1) gives plausible new samples and interpolating between two z values morphs smoothly between images. Its outputs tend to be a little blurry, but Stable Diffusion runs its diffusion inside a VAE latent space.', sVAE()),
    item('dl-gan', 'GAN', 'GANs',
      '생성자는 잡음에서 가짜를 만들고 판별자는 진짜와 가짜를 가려요. 둘이 번갈아 겨루며 생성자의 분포가 진짜 데이터에 가까워져요.',
      'GAN(생성적 적대 신경망)은 두 신경망이 겨뤄요. 생성자 G는 무작위 잡음 z에서 가짜 샘플을 만들고, 판별자 D는 진짜에 1, 가짜에 0을 내도록 이진 교차 엔트로피로 학습해요. G는 D가 자기 가짜를 진짜(1)라고 착각하도록 학습하고, 두 네트워크를 번갈아 한 스텝씩 갱신해요. D를 갱신할 때는 G의 출력을 detach()로 떼어 G가 함께 바뀌지 않게 해요. 잘 되면 G의 분포가 진짜 데이터에 겹쳐 D가 반반밖에 못 맞히는 균형에 이르고, StyleGAN은 사실적인 얼굴 이미지로 유명해요. 다만 한 종류만 만드는 모드 붕괴와 불안정한 학습이 고질적인 문제라, 이미지 생성의 주도권은 확산 모델로 넘어갔어요.',
      'A generator makes fakes from noise and a discriminator separates real from fake; taking turns, the generator’s distribution approaches the real data.',
      'A GAN (generative adversarial network) pits two networks against each other. The generator G turns random noise z into fake samples, and the discriminator D is trained with binary cross-entropy to output 1 for real data and 0 for fakes. G is trained to make D mistake its fakes for real (1), and the two take turns updating, with G’s output detached when updating D so that G does not change at the same time. When it works, G’s distribution overlaps the real data and D can only guess half the time; StyleGAN is famous for photorealistic faces. Mode collapse, where G produces only one kind of output, and unstable training are chronic problems, and diffusion models have since taken the lead in image generation.', sGAN()),
    item('dl-diffusion', '확산 모델', 'Diffusion models',
      '이미지에 잡음을 조금씩 더하는 과정을 거꾸로 배워요. 모델은 섞인 잡음을 맞히고, 생성할 땐 순수 잡음에서 예측한 잡음을 조금씩 빼요.',
      '확산 모델의 정방향 과정은 이미지에 아주 작은 잡음을 β가 1e-4에서 0.02로 커지는 일정으로 1000번에 걸쳐 더해 결국 순수한 잡음으로 만들어요. 어느 단계든 x_t = √ᾱ_t·x₀ + √(1 − ᾱ_t)·ε로 한 번에 계산할 수 있고, √ᾱ_t는 t가 커질수록 1에서 0으로 줄어요. 신경망(보통 U-Net이나 트랜스포머)은 잡음 섞인 x_t와 단계 t를 보고 섞인 잡음 ε을 맞히도록 단순한 MSE로 학습해요. 생성할 때는 순수 잡음에서 시작해 예측한 잡음을 조금씩 빼며 t = 1000에서 0으로 거꾸로 가요. GAN보다 학습이 안정적이고 다양성이 좋으며, Stable Diffusion은 VAE 잠재 공간에서 텍스트 조건을 붙여 이 과정을 하고, DDIM 같은 샘플러로 단계를 20~50번으로 줄여요.',
      'Diffusion models learn to reverse a gradual noising process: the network predicts the added noise, and generation subtracts predicted noise step by step from pure noise.',
      'A diffusion model’s forward process adds tiny amounts of noise to an image over 1000 steps, with β growing from 1e-4 to 0.02, until only pure noise remains. Any step can be computed directly as x_t = √ᾱ_t·x₀ + √(1 − ᾱ_t)·ε, where √ᾱ_t falls from 1 toward 0 as t grows. A network, usually a U-Net or transformer, is trained with a plain MSE loss to predict the added noise ε from the noisy x_t and the step t. To generate, it starts from pure noise and walks backward from t = 1000 to 0, subtracting predicted noise a little at a time. Training is more stable than for GANs and covers more variety; Stable Diffusion runs this process in a VAE latent space with text conditioning, and samplers such as DDIM cut it to 20–50 steps.', sDiff()),
    item('dl-precision', '혼합 정밀도', 'Mixed precision',
      '계산은 16비트로 빠르게, 가중치 사본과 누적은 32비트로 정확하게 해요. bf16은 fp32와 범위가 같아 손실 스케일링 없이 안정적이에요.',
      'fp32는 부호 1비트, 지수 8비트, 가수 23비트로 약 7자리 정밀도를 갖지만 메모리와 계산이 많이 들어요. fp16은 크기가 절반이지만 지수가 5비트라 최댓값이 65,504이고 아주 작은 기울기는 0이 되어서, 손실에 큰 수를 곱해 역전파한 뒤 되돌리는 손실 스케일링(GradScaler)이 필요해요. bf16은 지수를 fp32와 같은 8비트로 두고 가수를 7비트로 줄여, 정밀도는 2~3자리로 낮아도 범위가 같아 손실 스케일링 없이 안정적이라 LLM 학습의 기본이에요. 혼합 정밀도는 autocast 안에서 행렬 곱을 16비트로 하고 가중치 사본과 누적은 32비트로 지켜, 텐서 코어에서 2배 이상 빠르고 메모리도 줄어요. 70억 파라미터 모델의 가중치는 fp32 28 GB, bf16 14 GB이고, 추론에서는 4비트 양자화로 3.5 GB까지 줄이기도 해요.',
      'Compute in 16 bits for speed and keep master weights and accumulation in 32 bits for accuracy; bf16 shares fp32’s range and is stable without loss scaling.',
      'fp32 has 1 sign bit, 8 exponent bits and 23 mantissa bits, about 7 digits of precision, at a high cost in memory and compute. fp16 halves the size, but its 5-bit exponent tops out at 65,504 and tiny gradients flush to zero, so loss scaling (GradScaler) multiplies the loss before backprop and undoes it afterward. bf16 keeps fp32’s 8-bit exponent and shortens the mantissa to 7 bits: only 2–3 digits of precision but the same range, stable without loss scaling and now the default for LLM training. Mixed precision runs matrix products in 16 bits inside autocast while keeping master weights and accumulation in 32 bits, more than twice as fast on tensor cores and lighter on memory. A 7-billion-parameter model needs 28 GB of weights in fp32 and 14 GB in bf16, and 4-bit quantization for inference can bring it to 3.5 GB.', sPrec())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
