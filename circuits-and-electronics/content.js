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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'cix-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono cix-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono cix-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c cix-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono cix-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c cix-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'cix-s cix-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono cix-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono cix-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono cix-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono cix-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono cix-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'cix-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'cix-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'cix-xs cix-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono cix-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'cix-a', g: 'cix-g', r: 'cix-r', w: 'cix-w', m: 'cz-mono', s: 'cix-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'cix-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono cix-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono cix-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'cix-xs ') + clsOf(c) + (o.w ? ' cix-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.cix-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.cix-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.cix-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.cix-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.cix-r .in{color:var(--danger);font-weight:800}
.cix-g .in{color:var(--ok);font-weight:800}
.cix-a .in{color:var(--accent);font-weight:800}
.cix-w .in{color:var(--warn);font-weight:800}
.cix-c .in{font-size:.6em;font-weight:700}
.cix-c2 .in{font-size:.5em;font-weight:700}
.cix-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.cix-wr .in{white-space:normal!important}
.cix-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.cix-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Circuits and electronics · helpers, 1. DC circuits ===== */
const CSSY = '.cix-sv svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}';
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* plots: data x in [a, b], y in [lo, hi] mapped to a box at (x0, y0) of size w × h */
const PF = (x0, y0, w, h, a, b, lo, hi) => ({ X: x => x0 + (x - a) / (b - a) * w, Y: y => y0 + h - (y - lo) / (hi - lo) * h, x0, y0, w, h, a, b, lo, hi });
const axes = (S, k, P, st, o = {}) => { const yz = P.Y(Math.max(P.lo, Math.min(P.hi, 0))); hl(S, k + 'x', P.x0, P.x0 + P.w, yz, 'ink-3', st, { w: .06, off: o.off }); if (!o.noy) vl(S, k + 'y', P.X(Math.max(P.a, Math.min(P.b, 0))), P.y0, P.y0 + P.h, 'ink-3', st, { w: .06, off: o.off }); };
const ticks = (S, k, P, xs, ys, st, o = {}) => { const yb = o.yb ?? P.Y(Math.max(P.lo, Math.min(P.hi, 0))) + .12; (xs || []).forEach(([v, t], i) => T(S, k + 'x' + i, P.X(v) - .9, yb, t, 'cz-mono cz-tc cix-tiny', st, { w: 1.8, off: o.off })); (ys || []).forEach(([v, t], i) => T(S, k + 'y' + i, P.x0 - 2.0, P.Y(v) - .3, t, 'cz-mono cix-tiny', st, { w: 1.8, css: 'text-align:right', off: o.off })); };
/* one SVG path per curve */
const spoly = (S, k, pts, o = {}) => {
  const ok = pts.filter(Boolean); if (ok.length < 2) return;
  const pad = .3, xs = ok.map(p => p[0]), ys = ok.map(p => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, w = Math.max(...xs) + pad - x0, h = Math.max(...ys) + pad - y0;
  let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + r3(p[0] - x0) + ' ' + r3(p[1] - y0); pen = true; });
  S.el(k, { x: x0, y: y0, w, h, cls: 'cix-sv', html: `<svg viewBox="0 0 ${r3(w)} ${r3(h)}" preserveAspectRatio="none"><path d="${d}" style="fill:none;stroke:${cv(o.color || 'accent')};stroke-width:${o.h || .09};stroke-linejoin:round;stroke-linecap:round${o.dash ? ';stroke-dasharray:.25 .2' : ''}"/></svg>`, s: o.st ? hid() : {} });
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
const SV = (S, k, parts, st, o = {}) => { const [x, y, w, h] = o.box || [18.2, 0, 13.8, 15]; S.el(k, { x, y, w, h, cls: 'cix-sv', html: `<svg viewBox="${x} ${y} ${w} ${h}">${[].concat(parts).join('')}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };

function sOhm() {
  const P = PF(20.4, 7.6, 10.4, 5.2, 0, 20, 0, 50);
  return CW('ci-ohm', {
    code: [['V = 9.0         # 전지 전압 (V)', 'V = 9.0         # battery voltage (V)'], ['R = 450         # 저항 (Ω)', 'R = 450         # resistance (Ω)'], 'I = V / R       # 0.02 A = 20 mA', ['I2 = 18.0 / R   # 전압 2배 → 40 mA', 'I2 = 18.0 / R   # double V → 40 mA'], ['I3 = 9.0 / 225  # 저항 절반 → 40 mA', 'I3 = 9.0 / 225  # half R → 40 mA']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([20.4, 1.6], [20.4, 5.6]), zW([[20.4, 1.6], [28.4, 1.6]]), zR([28.4, 1.6], [28.4, 5.6]), zW([[28.4, 5.6], [20.4, 5.6]])], 1);
      lblR(S, 'lv', 19.6, 3.3, '9 V', 'm', 1); lbl(S, 'lr', 29.05, 3.3, '450 Ω', 'm', 1);
      F(S, 'law', 1, 7.3, 'V = I · R', 's a', 1);
      lbl(S, 'lu', 1, 8.6, ['V: 전압(볼트) · I: 전류(암페어) · R: 저항(옴)', 'V: voltage (volts) · I: current (amps) · R: resistance (ohms)'], '', 1);
      SV(S, 'cur', [zA([22.4, 2.4], [26.4, 2.4], 'accent', .1)], 2);
      lbl(S, 'li', 22.5, 2.75, 'I = 20 mA', 'm a', 2);
      F(S, 'calc', 1, 9.9, '9 V ÷ 450 Ω = 0.02 A = 20 mA', 'a', 2);
      axes(S, 'ax', P, 3); ticks(S, 'tk', P, [[9, '9'], [18, '18']], [[20, '20'], [40, '40']], 3);
      lbl(S, 'xv', P.x0 + P.w - 1.1, P.Y(0) - .75, 'V', 'm', 3); lbl(S, 'yi', P.x0 + .3, P.y0 - .55, 'I (mA)', 'm', 3);
      curve(S, 'l1', P, v => v / 450 * 1000, 3, { color: 'ok' }); pt(S, 'p1', P.X(9), P.Y(20), 3, C.okf, .17); pt(S, 'p2', P.X(18), P.Y(40), 3, C.okf, .17);
      lbl(S, 'l1t', 29.0, 9.9, '450 Ω', 'm g', 3);
      F(S, 'prop', 1, 11.2, ['전압 2배 → 전류 2배 (비례)', 'double the voltage → double the current'], 'g', 3);
      curve(S, 'l2', P, v => v / 225 * 1000, 4, { color: 'warn', b: 11.25 }); pt(S, 'p3', P.X(9), P.Y(40), 4, C.warn, .17);
      lbl(S, 'l2t', 22.9, 7.65, '225 Ω', 'm w', 4);
      F(S, 'half', 1, 12.5, ['저항 절반 → 같은 9 V에서 40 mA', 'half the resistance → 40 mA at the same 9 V'], 'w', 4);
    },
    notes: [['전압은 전하를 미는 압력, 전류는 1초에 흐르는 전하의 양, 저항은 흐름을 방해하는 정도예요 · 옴의 법칙 V = I·R이 셋을 묶어요', 'voltage is the push on charge, current the charge flowing per second, resistance the opposition to flow; Ohm’s law V = I·R ties them together'], ['9 V 전지에 450 Ω을 연결하면 I = 9/450 = 0.02 A, 20 mA가 흘러요 · 전류는 회로를 한 바퀴 도는 내내 같은 값이에요', '9 V across 450 Ω drives I = 9/450 = 0.02 A, or 20 mA, the same current all the way around the loop'], ['저항이 일정하면 전류는 전압에 비례해요 · V-I 그래프는 원점을 지나는 직선이고 기울기가 1/R이에요', 'with fixed resistance, current is proportional to voltage: the V–I graph is a straight line through the origin with slope 1/R'], ['저항을 절반(225 Ω)으로 줄이면 같은 9 V에서 전류가 두 배인 40 mA가 돼요 · 직선이 더 가팔라져요', 'halving the resistance to 225 Ω doubles the current at 9 V to 40 mA, and the line gets steeper']],
    fin: [['옴의 법칙 V = I·R: 전압 = 전류 × 저항', 'Ohm’s law V = I·R: voltage equals current times resistance', 'cix-xs cix-a'], ['1 kΩ에 1 V면 1 mA · 이 조합이 암산에 편해요', '1 V across 1 kΩ gives 1 mA, a handy combination for mental math'], ['전구·다이오드 같은 비선형 소자는 직선이 아니에요', 'nonlinear parts such as bulbs and diodes do not follow a straight line']],
    caps: [['회로', 'The circuit'], ['전류 계산', 'Computing the current'], ['V-I 그래프', 'The V–I graph'], ['저항을 줄이면', 'Lower resistance'], ['옴의 법칙', 'Ohm’s law']]
  });
}

function sPower() {
  const B = (v) => 20.4 + v / 1.6 * 10.4;
  return CW('ci-power', {
    code: [['P = V * I        # 전력 (W)', 'P = V * I        # power (W)'], '# = I**2 * R = V**2 / R', 'I = 5 / 220      # 22.7 mA', ['P = 5**2 / 220   # 0.11 W ✓ (1/4 W)', 'P = 5**2 / 220   # 0.11 W ✓ (1/4 W)'], ['P = 12**2 / 100  # 1.44 W → 타요 ✗', 'P = 12**2 / 100  # 1.44 W → burns ✗'], ['E = 3.7 * 3.0    # 11.1 Wh 배터리', 'E = 3.7 * 3.0    # 11.1 Wh battery']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'danger'], [5, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([20.4, 1.4], [20.4, 5.2]), zW([[20.4, 1.4], [28.4, 1.4]]), zR([28.4, 1.4], [28.4, 5.2]), zW([[28.4, 5.2], [20.4, 5.2]])], 1);
      lblR(S, 'lv', 19.6, 2.9, '5 V', 'm', 1, { off: 3 }); lbl(S, 'lr', 29.05, 2.9, '220 Ω', 'm', 1, { off: 3 });
      lblR(S, 'lv2', 19.6, 2.9, '12 V', 'm r', 3); lbl(S, 'lr2', 29.05, 2.9, '100 Ω', 'm r', 3);
      F(S, 'pdef', 1, 8.3, 'P = V · I = I²R = V²/R', 's a', 1);
      lbl(S, 'heat', 22.0, 2.6, ['저항이 열로 바꿔요', 'the resistor turns it into heat'], 'w', 1, { off: 2 });
      lbl(S, 'p1', 22.0, 2.6, 'P = 0.11 W', 'm g', 2, { off: 3 }); lbl(S, 'p2', 22.0, 2.6, 'P = 1.44 W', 'm r', 3);
      vl(S, 'rt', B(.25), 6.9, 11.2, 'ink-2', 2, { w: .07, dash: 1 }); lbl(S, 'rtl', B(.25) + .15, 6.55, ['정격 1/4 W', '1/4 W rating'], 'm', 2);
      rect(S, 'b1', 20.4, 8.0, B(.114) - 20.4, .9, 'ok', 70, 2, { r: .1 }); lbl(S, 'b1l', B(.114) + 1.1, 8.1, '0.11 W ✓', 'm g', 2);
      rect(S, 'b2', 20.4, 9.6, B(1.44) - 20.4, .9, 'danger', 70, 3, { r: .1 }); lbl(S, 'b2l', 26.2, 10.75, '1.44 W ✗', 'm r', 3);
      lines(S, 'en', 1, 9.8, [[['에너지 = 전력 × 시간', 'energy = power × time'], 'a'], [['3.7 V × 3000 mAh = 11.1 Wh', '3.7 V × 3000 mAh = 11.1 Wh'], 'f'], [['11.1 Wh ÷ 0.5 W ≈ 22시간', '11.1 Wh ÷ 0.5 W ≈ 22 hours'], 'f']], 4, 0, { lh: 1.3 });
    },
    notes: [['전력은 1초에 쓰는 에너지예요 · P = V·I이고, 옴의 법칙을 넣으면 I²R이나 V²/R로도 써요', 'power is energy per second: P = V·I, or with Ohm’s law, I²R or V²/R'], ['5 V에 220 Ω이면 22.7 mA가 흐르고 0.11 W가 열이 돼요 · 흔한 1/4 W(0.25 W) 저항으로 충분해요', '5 V across 220 Ω passes 22.7 mA and turns 0.11 W into heat, fine for a common 1/4 W (0.25 W) resistor'], ['12 V에 100 Ω이면 1.44 W라 1/4 W 저항은 타 버려요 · 저항은 값뿐 아니라 정격 전력도 골라야 해요', '12 V across 100 Ω dissipates 1.44 W and burns a 1/4 W resistor, so pick the power rating as well as the value'], ['에너지는 전력 × 시간이에요 · 3.7 V, 3000 mAh 배터리는 11.1 Wh라 0.5 W 기기를 약 22시간 돌려요', 'energy is power times time: a 3.7 V, 3000 mAh battery holds 11.1 Wh, running a 0.5 W device for about 22 hours']],
    fin: [['전력 P = V·I = I²R = V²/R · 에너지 = 전력 × 시간', 'power P = V·I = I²R = V²/R; energy = power × time', 'cix-xs cix-a'], ['정격의 절반 이하로 쓰면 부품이 오래가요', 'running parts below half their rating keeps them alive longer'], ['전기 요금의 kWh도 에너지 단위예요', 'the kWh on an electricity bill is a unit of energy too']],
    caps: [['전력의 정의', 'What power is'], ['정격 안에서', 'Within the rating'], ['정격 초과', 'Over the rating'], ['배터리 에너지', 'Battery energy'], ['전력과 에너지', 'Power and energy']]
  });
}

function sKirch() {
  const nd = [24.4, 3.0];
  return CW('ci-kirchhoff', {
    code: [['# KCL: 노드로 들어온 전류 = 나간 전류', '# KCL: current in = current out at a node'], 'I_in = 3.0           # mA', 'I_1, I_2 = 1.0, 2.0  # 3 = 1 + 2', ['# KVL: 한 바퀴 돈 전압의 합 = 0', '# KVL: voltages around a loop sum to 0'], '12 - 4 - 8 == 0      # True'],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'node', [zW([[19.6, 3.0], nd]), zW([nd, [26.2, 1.2], [30.6, 1.2]]), zW([nd, [26.2, 4.8], [30.6, 4.8]]), zJ(nd)], 1);
      SV(S, 'ia', [zA([20.4, 2.45], [22.8, 2.45], 'accent'), zA([27.2, .65], [29.6, .65], 'ok'), zA([27.2, 5.35], [29.6, 5.35], 'warn')], 2);
      lbl(S, 'i0', 20.3, 3.3, '3 mA', 'm a', 2); lbl(S, 'i1', 27.4, 1.5, '1 mA', 'm g', 2); lbl(S, 'i2', 27.4, 3.65, '2 mA', 'm w', 2);
      F(S, 'kcl', 1, 7.3, 'Σ I_in = Σ I_out', 's a', 1); F(S, 'kcln', 1, 8.6, '3 mA = 1 mA + 2 mA', 'g', 2);
      SV(S, 'loop', [zBat([20.4, 7.4], [20.4, 12.6]), zW([[20.4, 7.4], [27.6, 7.4]]), zR([27.6, 7.4], [27.6, 10.0]), zR([27.6, 10.0], [27.6, 12.6]), zW([[27.6, 12.6], [20.4, 12.6]])], 3);
      lblR(S, 'lb', 19.6, 9.7, '12 V', 'm', 3); lbl(S, 'r1', 28.2, 8.4, '1 kΩ · 4 V', 'm w', 3); lbl(S, 'r2', 28.2, 11.0, '2 kΩ · 8 V', 'm w', 3);
      SV(S, 'turn', [`<path d="M23.4,8.9 A1.5 1.5 0 1 1 23.6,11.1" ${zst('accent', .08)}/>`, zA([23.75, 11.05], [23.45, 11.15], 'accent', .02)], 4);
      F(S, 'kvl', 1, 10.0, 'Σ V = 0', 's a', 3); F(S, 'kvln', 1, 11.3, '+12 − 4 − 8 = 0', 'a', 4);
      lbl(S, 'cur', 21.2, 7.75, 'I = 4 mA', 'm a', 4);
    },
    notes: [['키르히호프 전류 법칙(KCL): 한 점(노드)으로 들어온 전류는 모두 나가요 · 전하는 쌓이거나 사라지지 않아요', 'Kirchhoff’s current law (KCL): all current entering a node leaves it, since charge neither piles up nor vanishes'], ['3 mA가 들어와 1 mA와 2 mA로 나뉘어요 · 갈래가 몇 개든 합은 같아요', '3 mA comes in and splits into 1 mA and 2 mA; however many branches, the totals match'], ['키르히호프 전압 법칙(KVL): 닫힌 고리를 한 바퀴 돌며 전압을 더하면 0이에요 · 올라간 만큼 내려와요', 'Kirchhoff’s voltage law (KVL): voltages around any closed loop sum to zero, since every rise is matched by drops'], ['12 V 전지에 1 kΩ과 2 kΩ을 이으면 4 mA가 흐르고 4 V와 8 V로 나눠 떨어져요 · 이 두 법칙이 모든 회로 해석의 출발점이에요', 'with 1 kΩ and 2 kΩ on a 12 V battery, 4 mA flows and the drops are 4 V and 8 V; these two laws start every circuit analysis']],
    fin: [['KCL: 노드의 전류 합 = 0 · KVL: 고리의 전압 합 = 0', 'KCL: currents at a node sum to 0; KVL: voltages around a loop sum to 0', 'cix-xs cix-a'], ['전하 보존과 에너지 보존을 회로의 말로 쓴 거예요', 'circuit-language versions of charge and energy conservation'], ['SPICE 같은 회로 시뮬레이터도 이 식을 풀어요', 'circuit simulators such as SPICE solve exactly these equations']],
    caps: [['노드의 전류', 'Currents at a node'], ['전류 나누기', 'Splitting current'], ['고리의 전압', 'Voltages around a loop'], ['전압 나누기', 'Dividing voltage'], ['키르히호프 법칙', 'Kirchhoff’s laws']]
  });
}

function sDivider() {
  const x = 23.4, top = 1.0, mid = 5.0, bot = 9.0, xo = 27.4;
  return CW('ci-divider', {
    code: ['Vout = Vin * R2 / (R1 + R2)', '5.0 * 10e3 / (10e3 + 10e3)     # 2.5 V', '12 * 10e3 / (27e3 + 10e3)      # 3.24 V → ADC', ['R2L = 10e3 * RL / (10e3 + RL)  # 부하가 병렬', 'R2L = 10e3 * RL / (10e3 + RL)  # load ∥ R2'], ['# RL = 10k → R2L = 5k → 1.67 V', '# RL = 10k → R2L = 5k → 1.67 V']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'danger']],
    draw: (S) => {
      SV(S, 'ckt', [zT([x, top]), zR([x, top], [x, mid]), zJ([x, mid]), zR([x, mid], [x, bot]), zGnd([x, bot]), zW([[x, mid], [xo, mid]]), zT([xo, mid])], 1);
      lbl(S, 'vin', x + .4, top - .25, 'Vin = 5 V', 'm', 1, { off: 3 }); lbl(S, 'vin2', x + .4, top - .25, 'Vin = 12 V', 'm w', 3, { off: 4 });
      lbl(S, 'r1', 19.4, 2.6, 'R1 10 kΩ', 'm', 1, { off: 3 }); lbl(S, 'r1b', 19.4, 2.6, 'R1 27 kΩ', 'm w', 3, { off: 4 }); lbl(S, 'r1c', 19.4, 2.6, 'R1 10 kΩ', 'm', 4);
      lbl(S, 'r2', 19.4, 6.6, 'R2 10 kΩ', 'm', 1);
      lbl(S, 'vo', xo + .35, mid - .3, 'Vout', 'm', 1);
      F(S, 'eq', 1, 7.3, 'Vout = Vin · R2 / (R1 + R2)', 's a', 1);
      lbl(S, 'o1', 23.75, mid + .35, '2.5 V', 'm g', 2, { off: 3 }); lbl(S, 'o2', 23.75, mid + .35, '3.24 V', 'm w', 3, { off: 4 });
      F(S, 'e2', 1, 8.6, '5 · 10k / 20k = 2.5 V', 'g', 2); F(S, 'e3', 1, 9.8, '12 · 10k / 37k = 3.24 V', 'w', 3);
      SV(S, 'load', [zJ([xo - 1.0, mid]), zR([xo - 1.0, mid], [xo - 1.0, bot]), zW([[xo - 1.0, bot], [x, bot]]), zJ([x, bot])], 4);
      lbl(S, 'rl', xo - .45, 7.2, 'RL 10 kΩ', 'm r', 4); lbl(S, 'o3', 23.75, mid + .35, '1.67 V', 'm r', 4);
      F(S, 'e4', 1, 11.0, 'R2 ∥ RL = 10k · 10k / 20k = 5k', 'r', 4); F(S, 'e5', 1, 12.2, '5 · 5k / 15k = 1.67 V', 'r', 4);
    },
    notes: [['직렬로 이은 저항에는 같은 전류가 흐르고, 전압은 저항 크기에 비례해 나눠져요', 'series resistors carry the same current, and the voltage divides in proportion to their resistance'], ['같은 10 kΩ 두 개면 5 V가 반으로 나뉘어 2.5 V가 나와요 · 출력 = 입력 × R2/(R1 + R2)', 'two equal 10 kΩ resistors split 5 V in half to 2.5 V: output = input × R2/(R1 + R2)'], ['12 V 배터리 전압을 3.3 V ADC로 재려면 27 kΩ과 10 kΩ으로 3.24 V까지 낮춰요', 'to measure a 12 V battery with a 3.3 V ADC, 27 kΩ over 10 kΩ scales it down to 3.24 V'], ['출력에 10 kΩ 부하를 달면 R2와 병렬로 5 kΩ이 되어 1.67 V로 떨어져요 · 분배기는 부하보다 훨씬 작은 저항으로 만들거나 버퍼를 둬요', 'a 10 kΩ load on the output sits in parallel with R2, making 5 kΩ and dropping the output to 1.67 V; use resistors much smaller than the load, or add a buffer']],
    fin: [['전압 분배기: Vout = Vin·R2/(R1 + R2) · 부하가 붙으면 값이 바뀌어요', 'voltage divider: Vout = Vin·R2/(R1 + R2), shifted by any load', 'cix-xs cix-a'], ['병렬 저항 R1R2/(R1 + R2)는 항상 작은 쪽보다 작아요', 'parallel resistance R1R2/(R1 + R2) is always below the smaller one'], ['가변 저항(포텐셔미터)은 손잡이로 R1과 R2를 바꾸는 분배기예요', 'a potentiometer is a divider whose R1 and R2 change with the knob']],
    caps: [['직렬 저항', 'Series resistors'], ['절반으로 나누기', 'Splitting in half'], ['ADC 입력 맞추기', 'Scaling for an ADC'], ['부하 효과', 'The loading effect'], ['전압 분배기', 'Voltage dividers']]
  });
}

function sNodal() {
  const A = [25.0, 2.0], yb = 7.0;
  return CW('ci-nodal', {
    code: [['# 접지를 정하고 VA만 미지수로 둬요', '# pick ground; VA is the only unknown'], '(VA - 12)/1e3 + VA/2e3 + (VA - 6)/2e3 = 0', 'G = np.array([[1/1e3 + 1/2e3 + 1/2e3]])', 'b = np.array([12/1e3 + 6/2e3])', 'np.linalg.solve(G, b)  # [7.5] V'],
    hl: [[0, 1], [1, 1, 'warn'], [2, 3, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 2.0], [19.8, yb]), zR([19.8, 2.0], A), zJ(A), zR(A, [25.0, yb]), zR(A, [30.2, 2.0]), zBat([30.2, 2.0], [30.2, yb]), zW([[19.8, yb], [30.2, yb]]), zJ([25.0, yb]), zGnd([25.0, yb])], 1);
      lbl(S, 'b1', 20.5, 4.2, '12 V', 'm', 1); lbl(S, 'b2', 28.6, 4.2, '6 V', 'm', 1);
      lbl(S, 'r1', 21.6, .75, '1 kΩ', 'm', 1); lbl(S, 'r2', 25.5, 4.2, '2 kΩ', 'm', 1); lbl(S, 'r3', 27.9, .75, '2 kΩ', 'm', 1);
      lbl(S, 'va', A[0] - .55, A[1] + .35, 'VA', 'm a', 1, { off: 3 }); lbl(S, 'g0', 25.7, yb + .5, '0 V', 'm', 1);
      F(S, 'kcl', 1, 7.3, ['VA에서 나가는 전류의 합 = 0', 'currents leaving VA sum to 0'], 'w', 2);
      F(S, 'mat', 1, 8.6, 'G · v = b  →  2 mS · VA = 15 mA', 'g', 3);
      lbl(S, 'mn', 1, 9.9, ['노드가 n개면 n × n 연립방정식이에요', 'n nodes give an n × n linear system'], '', 3);
      lbl(S, 'va2', 23.7, .2, 'VA = 7.5 V', 'm g', 3);
      SV(S, 'ia', [zA([21.1, 2.75], [23.3, 2.75], 'accent'), zA([24.25, 3.6], [24.25, 5.6], 'warn'), zA([26.6, 2.75], [28.8, 2.75], 'ok')], 4);
      lbl(S, 'i1', 20.9, 3.05, '4.5 mA', 'm a', 4); lbl(S, 'i2', 21.6, 5.0, '3.75 mA', 'm w', 4); lbl(S, 'i3', 26.6, 3.05, '0.75 mA', 'm g', 4);
      F(S, 'chk', 1, 11.2, '4.5 = 3.75 + 0.75 (KCL ✓)', 'a', 4);
    },
    notes: [['노드 해석은 기준 노드(접지)를 정하고 나머지 노드의 전압을 미지수로 둬요 · 여기선 VA 하나예요', 'nodal analysis picks a reference node (ground) and treats the other node voltages as unknowns, here just VA'], ['VA에서 KCL을 써요 · 각 저항으로 나가는 전류를 (VA − 이웃 전압)/R로 적어 더하면 0이에요', 'apply KCL at VA: write each resistor’s outgoing current as (VA − neighbor voltage)/R and set the sum to zero'], ['정리하면 컨덕턴스 행렬 G와 전류 벡터 b의 연립방정식 G·v = b가 돼요 · 풀면 VA = 7.5 V예요', 'collecting terms gives the linear system G·v = b of conductances and currents, which solves to VA = 7.5 V'], ['전류도 바로 나와요: 왼쪽에서 4.5 mA가 들어와 3.75 mA는 접지로, 0.75 mA는 6 V 쪽으로 가요', 'the currents follow at once: 4.5 mA arrives from the left, 3.75 mA goes to ground and 0.75 mA into the 6 V side']],
    fin: [['노드 해석: 노드 전압을 미지수로 KCL을 세워 G·v = b를 풀어요', 'nodal analysis: write KCL with node voltages as unknowns and solve G·v = b', 'cix-xs cix-a'], ['노드가 n개면 n × n 행렬이라 컴퓨터가 쉽게 풀어요', 'n nodes make an n × n matrix that computers solve easily'], ['고리 전류를 미지수로 쓰는 메시 해석도 있어요', 'mesh analysis uses loop currents as the unknowns instead']],
    caps: [['기준 노드', 'The reference node'], ['KCL 세우기', 'Writing KCL'], ['행렬로 풀기', 'Solving as a matrix'], ['전류 구하기', 'Finding the currents'], ['노드 해석', 'Nodal analysis']]
  });
}

function sThev() {
  const yb = 5.4, P = PF(3.0, 8.4, 13.4, 4.6, 0, 10, 0, 2.4);
  return CW('ci-thevenin', {
    code: [['Vth = 12 * 3e3 / (6e3 + 3e3)   # 4 V (개방)', 'Vth = 12 * 3e3 / (6e3 + 3e3)   # 4 V (open)'], 'Rth = 6e3 * 3e3 / (6e3 + 3e3)  # 2 kΩ', 'VL = Vth * RL / (Rth + RL)     # RL=2k → 2 V', ['P = Vth**2 / (4 * Rth)         # 최대 2 mW', 'P = Vth**2 / (4 * Rth)         # max 2 mW']],
    hl: [[0, 1, 'ok'], [0, 1, 'ok'], [1, 1, 'warn'], [2, 2, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 1.4], [19.8, yb]), zR([19.8, 1.4], [24.4, 1.4]), zJ([24.4, 1.4]), zR([24.4, 1.4], [24.4, yb]), zW([[24.4, 1.4], [27.4, 1.4]]), zT([27.4, 1.4]), zW([[19.8, yb], [27.4, yb]]), zJ([24.4, yb]), zT([27.4, yb])], 1);
      lbl(S, 'lb', 20.6, 3.1, '12 V', 'm', 1); lbl(S, 'r1', 21.2, .15, '6 kΩ', 'm', 1); lbl(S, 'r2', 24.9, 3.1, '3 kΩ', 'm', 1);
      lbl(S, 'ta', 27.75, 1.05, 'a', 'm', 1); lbl(S, 'tb', 27.75, yb - .35, 'b', 'm', 1);
      lbl(S, 'voc', 27.0, 3.1, ['개방: 4 V', 'open: 4 V'], 'm g', 2);
      SV(S, 'short', [zW([[19.8, 1.4], [18.9, 1.4], [18.9, yb], [19.8, yb]], 'danger', .12, 1)], 3, { off: 4 });
      lbl(S, 'rth', 19.0, 6.0, ['전원 단락 → 6k ∥ 3k = 2 kΩ', 'source shorted → 6k ∥ 3k = 2 kΩ'], 'm w', 3, { off: 4 });
      SV(S, 'eq', [zBat([20.4, 8.2], [20.4, 12.2]), zR([20.4, 8.2], [25.2, 8.2]), zW([[25.2, 8.2], [28.4, 8.2]]), zR([28.4, 8.2], [28.4, 12.2]), zW([[28.4, 12.2], [20.4, 12.2]])], 3);
      lblR(S, 'eqv', 19.6, 9.9, '4 V', 'm g', 3); lbl(S, 'eqr', 21.9, 7.0, 'Rth 2 kΩ', 'm w', 3); lbl(S, 'eql', 28.95, 9.9, 'RL', 'm a', 3);
      lbl(S, 'eqt', 21.3, 9.9, ['테브난 등가', 'Thevenin equivalent'], 'a', 3);
      axes(S, 'ax', P, 4); curve(S, 'pw', P, r => 16 * r / Math.pow(2 + r, 2), 4, { color: 'accent', n: 80 });
      ticks(S, 'tk', P, [[2, '2k'], [6, '6k'], [10, '10k']], [[1, '1'], [2, '2']], 4);
      vl(S, 'pk', P.X(2), P.Y(2), P.Y(0), 'ok', 4, { w: .06, dash: 1 }); pt(S, 'pkp', P.X(2), P.Y(2), 4, C.okf, .17);
      lbl(S, 'pkl', P.X(2) + .4, P.Y(2) - .65, ['RL = Rth에서 최대 2 mW', 'max 2 mW at RL = Rth'], 'g', 4);
      lbl(S, 'yl', 1, 7.4, ['부하 전력 (mW)', 'load power (mW)'], 'm', 4); lbl(S, 'xl', P.x0 + P.w - 1.4, P.Y(0) + .55, 'RL', 'm', 4);
    },
    notes: [['복잡한 회로라도 두 단자에서 보면 전압원 하나와 저항 하나로 바꿀 수 있어요 · 테브난 등가 회로예요', 'seen from two terminals, any linear circuit can be replaced by one voltage source and one resistor: the Thevenin equivalent'], ['Vth는 단자를 열어 둔 채 잰 전압이에요 · 12 V를 6 kΩ과 3 kΩ으로 나눠 4 V예요', 'Vth is the voltage across the open terminals: 12 V divided by 6 kΩ and 3 kΩ gives 4 V'], ['Rth는 전압원을 단락시키고 단자에서 본 저항이에요 · 6 kΩ ∥ 3 kΩ = 2 kΩ이라 4 V 전원에 2 kΩ이 직렬로 붙은 회로와 같아요', 'Rth is the resistance seen from the terminals with the source shorted: 6 kΩ ∥ 3 kΩ = 2 kΩ, so the circuit acts like 4 V behind 2 kΩ'], ['부하 RL이 Rth와 같을 때 부하 전력이 최대(2 mW)예요 · 그보다 작거나 크면 줄어요', 'the load receives maximum power, 2 mW, when RL equals Rth, and less on either side']],
    fin: [['테브난 등가: 개방 전압 Vth와 내부 저항 Rth 두 값이면 충분해요', 'Thevenin equivalent: the open-circuit voltage Vth and internal resistance Rth say it all', 'cix-xs cix-a'], ['전류원과 병렬 저항으로 바꾼 것이 노턴 등가예요', 'the Norton equivalent uses a current source with a parallel resistor'], ['배터리 내부 저항, 오디오 출력 임피던스도 이 모델이에요', 'battery internal resistance and audio output impedance use the same model']],
    caps: [['원래 회로', 'The original circuit'], ['개방 전압', 'Open-circuit voltage'], ['등가 저항', 'Equivalent resistance'], ['최대 전력 전달', 'Maximum power transfer'], ['테브난 등가 회로', 'Thevenin equivalents']]
  });
}
/* ===== Circuits · 2. capacitors, inductors and transients ===== */
function sCap() {
  const P = PF(20.6, 7.8, 10.4, 4.4, 0, .6, 0, 6), Q = PF(4.2, 10.6, 12.0, 3.4, 1, 5, -2, 3);
  return CW('ci-capacitor', {
    code: ['C = 100e-6              # 100 µF', ['Q = C * 5.0             # 0.5 mC 저장', 'Q = C * 5.0             # stores 0.5 mC'], 'dv_dt = 1e-3 / C        # 1 mA → 10 V/s', 'E = 0.5 * C * 5.0**2    # 1.25 mJ', 'Xc = 1 / (2*np.pi*f*C)  # 1 kHz → 1.6 Ω'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'body', [zT([24.4, .5]), zW([[24.4, .5], [24.4, 2.0]]), zW([[21.0, 2.0], [27.8, 2.0]], 'ink', .16), zW([[21.0, 4.6], [27.8, 4.6]], 'ink', .16), zW([[24.4, 4.6], [24.4, 6.1]]), zT([24.4, 6.1])], 1);
      rect(S, 'diel', 21.0, 2.15, 6.8, 2.3, 'warn', 12, 1, { r: 0 });
      lbl(S, 'dl', 21.6, 3.0, ['절연체(유전체)', 'insulator (dielectric)'], 'w', 1, { off: 2 });
      lbl(S, 'qp', 21.4, 2.2, '+  +  +  +  +  +  +  +', 'm a', 2); lbl(S, 'qm', 21.4, 3.75, '−  −  −  −  −  −  −  −', 'm r', 2);
      lbl(S, 'vt', 25.0, .25, '+5 V', 'm a', 2); lbl(S, 'vb', 25.0, 5.8, '0 V', 'm', 2);
      lbl(S, 'q', 28.2, 2.95, 'Q = 0.5 mC', 'm g', 2);
      F(S, 'qcv', 1, 7.3, 'Q = C · V', 's a', 2); F(S, 'en', 1, 8.6, 'E = ½CV² = 1.25 mJ', 'g', 2);
      axes(S, 'ax', P, 3); curve(S, 'rmp', P, t => t <= .5 ? 10 * t : 5, 3, { color: 'warn', n: 40 });
      ticks(S, 'tk', P, [[.5, '0.5 s']], [[5, '5 V']], 3);
      lbl(S, 'rl', 21.0, 7.0, ['1 mA로 채우면 10 V/s 직선', 'charging at 1 mA: a 10 V/s ramp'], 'w', 3);
      F(S, 'idv', 21.0, 13.0, 'i = C · dv/dt', 'w', 3);
      F(S, 'xc', 1, 9.9, 'Xc = 1 / (2πfC)', 'a', 4);
      hl(S, 'qx', Q.x0, Q.x0 + Q.w, Q.y0 + Q.h, 'ink-3', 4, { w: .06 }); vl(S, 'qy', Q.x0, Q.y0, Q.y0 + Q.h, 'ink-3', 4, { w: .06 });
      curve(S, 'xcc', Q, x => 3.2 - x, 4, { color: 'accent', n: 10 });
      ticks(S, 'qt', Q, [[1, '10 Hz'], [3, '1 kHz'], [5, '100 kHz']], [[2, '100 Ω'], [0, '1 Ω']], 4, { yb: Q.y0 + Q.h + .12 });
      lbl(S, 'dc', 9.8, 10.6, ['직류(0 Hz): 막힘', 'DC (0 Hz): blocked'], 'r', 4);
    },
    notes: [['커패시터는 얇은 절연체를 사이에 둔 두 금속판이에요 · 전류가 판 사이를 건너지 않고 전하를 쌓아 둬요', 'a capacitor is two metal plates separated by a thin insulator; current does not cross the gap, it stores charge'], ['Q = C·V: 100 µF에 5 V를 걸면 0.5 mC가 쌓이고, 에너지 ½CV² = 1.25 mJ를 저장해요', 'Q = C·V: 5 V on 100 µF stores 0.5 mC of charge and ½CV² = 1.25 mJ of energy'], ['i = C·dv/dt라서 1 mA로 일정하게 채우면 전압이 초당 10 V씩 직선으로 올라가요 · 전압은 순간적으로 바뀔 수 없어요', 'since i = C·dv/dt, a steady 1 mA charges it at 10 V per second in a straight line; its voltage cannot jump instantly'], ['교류에서는 주파수가 높을수록 잘 통과해요 · 임피던스 1/(2πfC)는 1 kHz에서 1.6 Ω이고 직류(0 Hz)에서는 무한대라 막아요', 'with AC, higher frequencies pass more easily: the impedance 1/(2πfC) is 1.6 Ω at 1 kHz and infinite at DC, which is blocked']],
    fin: [['커패시터: Q = CV, i = C·dv/dt · 직류는 막고 교류는 통과', 'capacitor: Q = CV and i = C·dv/dt; blocks DC, passes AC', 'cix-xs cix-a'], ['세라믹은 작고 빠르며, 전해 커패시터는 크고 극성이 있어요', 'ceramics are small and fast; electrolytics are large and polarized'], ['정격 전압을 넘기면 터질 수 있어요', 'exceeding the voltage rating can make them burst']],
    caps: [['구조', 'Structure'], ['전하와 에너지', 'Charge and energy'], ['전압의 기울기', 'The voltage slope'], ['교류 임피던스', 'AC impedance'], ['커패시터', 'Capacitors']]
  });
}

function sInd() {
  const P = PF(3.4, 8.2, 13.2, 5.0, 0, 10, -1, 15), x = 24.4;
  const noD = t => t < 3 ? 0 : t < 3.35 ? 15 : 12 + 3 * Math.exp(-(t - 3.35) * .9) * Math.cos(5 * (t - 3.35));
  const withD = t => t < 3 ? 0 : t < 3.05 ? 12.7 * (t - 3) / .05 : t < 7 ? 12.7 : 12;
  return CW('ci-inductor', {
    code: ['L = 10e-3             # 10 mH', ['v = L * di/dt         # 전류 변화에 맞서요', 'v = L * di/dt         # resists Δi'], 'E = 0.5 * L * 0.1**2  # 50 µJ', ['v = L * 0.1 / 1e-6    # 1 µs 차단 → 1 kV', 'v = L * 0.1 / 1e-6    # 1 µs off → 1 kV'], ['# 플라이백 다이오드로 전류가 돌 길을', '# a flyback diode gives the current a path']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'danger'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zT([x, .6]), zW([[x, .6], [x, 1.2]]), zL([x, 1.2], [x, 4.6]), zJ([x, 4.6]), zGnd([x, 7.6])], 1);
      lbl(S, 'vp', x + .35, .05, '+12 V', 'm', 1); lblR(S, 'll', 22.4, 2.6, ['코일 10 mH', 'coil 10 mH'], 'm', 1);
      SV(S, 'fld', [`<ellipse cx="${x}" cy="2.9" rx="1.2" ry="1.5" ${zst('accent', .05, ';stroke-dasharray:.2 .2')}/>`, `<ellipse cx="${x}" cy="2.9" rx="1.8" ry="2.0" ${zst('accent', .05, ';stroke-dasharray:.2 .2')}/>`], 1, { off: 3 });
      SV(S, 'swon', [zSw([x, 4.6], [x, 7.6], 'ink', 1)], 1, { off: 3 }); SV(S, 'swoff', [zSw([x, 4.6], [x, 7.6], 'danger', 0)], 3);
      lblR(S, 'sw', x - .4, 5.8, ['스위치', 'switch'], 'm', 1);
      SV(S, 'ia', [zA([x - .75, 1.6], [x - .75, 4.0], 'accent', .08)], 2, { off: 3 }); lbl(S, 'il', 19.0, 3.5, 'I = 100 mA', 'm a', 2, { off: 3 });
      F(S, 'e', 1, 7.3, 'E = ½LI² = 50 µJ', 'g', 2, { off: 3 });
      axes(S, 'ax', P, 3); lbl(S, 'pt', 1, 7.3, ['스위치 노드 전압 (V)', 'switch-node voltage (V)'], 'm', 3);
      curve(S, 'sp', P, noD, 3, { color: 'danger', n: 240 }); lbl(S, 'spl', P.X(3.35) + .3, P.y0 - .3, ['≈ 1000 V로 튀어요!', 'spikes to ≈ 1000 V!'], 'r', 3);
      ticks(S, 'tk', P, [[3, ['끊는 순간', 'off']]], [[12, '12']], 3);
      SV(S, 'dio', [zW([[x, 1.2], [26.6, 1.2]]), zD([26.6, 4.6], [26.6, 1.2], 'ok'), zW([[x, 4.6], [26.6, 4.6]]), zJ([x, 1.2])], 4);
      lbl(S, 'dl', 27.1, 2.6, ['플라이백 다이오드', 'flyback diode'], 'g', 4);
      curve(S, 'cl', P, withD, 4, { color: 'ok', n: 200, h: .11 }); lbl(S, 'cll', P.X(5.2), P.Y(12.7) + .25, ['12.7 V에서 멈춤', 'clamped at 12.7 V'], 'g', 4);
    },
    notes: [['인덕터는 감은 코일이에요 · 전류가 흐르면 자기장에 에너지를 저장하고, 전류 변화에 맞서는 전압 v = L·di/dt를 만들어요', 'an inductor is a coil of wire that stores energy in its magnetic field and resists changes in current with a voltage v = L·di/dt'], ['10 mH 코일에 100 mA가 흐르면 ½LI² = 50 µJ를 저장해요 · 전류는 순간적으로 바뀔 수 없어요', 'a 10 mH coil carrying 100 mA stores ½LI² = 50 µJ, and its current cannot change instantly'], ['스위치를 1 µs 만에 끊으면 di/dt가 커서 v = 10 mH × 0.1 A / 1 µs = 1000 V가 튀어요 · 트랜지스터가 망가지고 불꽃이 튀어요', 'cutting the switch in 1 µs makes di/dt huge: v = 10 mH × 0.1 A / 1 µs = 1000 V, enough to kill a transistor or throw a spark'], ['코일과 병렬로 다이오드를 거꾸로 달면 끊긴 전류가 다이오드로 돌며 천천히 줄어요 · 스파이크가 전원보다 약 0.7 V 높은 곳에서 멈춰요', 'a reverse diode across the coil lets the current circulate and decay gently, clamping the spike about 0.7 V above the supply']],
    fin: [['인덕터: v = L·di/dt · 전류 변화를 싫어해요', 'inductor: v = L·di/dt; it resists changes in current', 'cix-xs cix-a'], ['릴레이·모터·솔레노이드에는 꼭 플라이백 다이오드를 달아요', 'relays, motors and solenoids always need a flyback diode'], ['이 스파이크를 일부러 쓰는 게 자동차 점화 코일이에요', 'car ignition coils use this spike on purpose']],
    caps: [['코일과 자기장', 'Coils and fields'], ['에너지 저장', 'Storing energy'], ['끊을 때 스파이크', 'The turn-off spike'], ['플라이백 다이오드', 'The flyback diode'], ['인덕터', 'Inductors']]
  });
}

function sRC() {
  const P = PF(20.6, 7.8, 10.6, 4.8, 0, 10, 0, 5.6), ch = t => 5 * (1 - Math.exp(-t)), v5 = ch(5);
  return CW('ci-rc', {
    code: ['R, C = 10e3, 100e-6', 'tau = R * C                     # 1.0 s', ['v = 5 * (1 - np.exp(-t / tau))  # 충전', 'v = 5 * (1 - np.exp(-t / tau))  # charge'], '# t = τ: 63 %,  5τ: 99.3 %', ['v = 5 * np.exp(-t / tau)        # 방전', 'v = 5 * np.exp(-t / tau)        # discharge']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 1.4], [19.8, 5.4]), zSw([19.8, 1.4], [22.8, 1.4], 'ink', 1), zR([22.8, 1.4], [26.6, 1.4]), zW([[26.6, 1.4], [28.6, 1.4]]), zC([28.6, 1.4], [28.6, 5.4]), zW([[28.6, 5.4], [19.8, 5.4]])], 1);
      lblR(S, 'lv', 19.1, 3.1, '5 V', 'm', 1); lbl(S, 'lr', 23.8, .2, 'R 10 kΩ', 'm', 1); lbl(S, 'lc', 29.25, 3.1, 'C 100 µF', 'm', 1);
      lbl(S, 'lvc', 25.9, 3.1, 'v(t)', 'f a', 1);
      axes(S, 'ax', P, 2); curve(S, 'chg', P, ch, 2, { color: 'ok', b: 5, n: 60 });
      ticks(S, 'tk', P, [[1, 'τ'], [5, '5τ'], [10, '10 s']], [[5, '5 V']], 2);
      F(S, 'eq', 1, 7.3, 'v = Vs (1 − e^(−t/RC))', 'g', 2); F(S, 'tau', 1, 8.6, 'τ = RC = 10 kΩ × 100 µF = 1 s', 'a', 2);
      vl(S, 't1', P.X(1), P.Y(ch(1)), P.Y(0), 'warn', 3, { w: .06, dash: 1 }); hl(S, 'h1', P.x0, P.X(1), P.Y(ch(1)), 'warn', 3, { w: .06, dash: 1 });
      pt(S, 'p1', P.X(1), P.Y(ch(1)), 3, C.warn, .17); lbl(S, 'p1l', P.X(1) + .3, P.Y(ch(1)) + .15, '63 %', 'm w', 3);
      pt(S, 'p5', P.X(5), P.Y(v5), 3, C.warn, .17); lbl(S, 'p5l', P.X(5) - .6, P.Y(v5) - .75, '99.3 %', 'm w', 3);
      lines(S, 'tb', 1, 9.9, [['1τ  63.2 %', 'm'], ['2τ  86.5 %', 'm'], ['3τ  95.0 %', 'm'], ['5τ  99.3 %', 'm w']], 3, 0, { lh: .95 });
      curve(S, 'dis', P, t => v5 * Math.exp(-(t - 5)), 4, { color: 'accent', a: 5, n: 60 });
      lbl(S, 'dl', P.X(6.2), P.Y(2.6), ['방전', 'discharge'], 'a', 4);
      F(S, 'eq2', 1, 13.8, 'v = Vs · e^(−t/RC)', 'a', 4);
    },
    notes: [['저항을 거쳐 커패시터를 채우면 처음엔 빨리, 차오를수록 천천히 차요 · 남은 차이에 비례해 전류가 흐르기 때문이에요', 'charging a capacitor through a resistor starts fast and slows as it fills, because the current is proportional to the remaining gap'], ['전압은 v = Vs(1 − e^(−t/RC))를 따라요 · 10 kΩ과 100 µF면 시정수 τ = RC = 1초예요', 'the voltage follows v = Vs(1 − e^(−t/RC)); with 10 kΩ and 100 µF the time constant τ = RC is 1 second'], ['τ마다 남은 차이가 1/e(약 37%)로 줄어요 · 1τ에 63%, 5τ에 99.3%라 보통 5τ면 다 찼다고 봐요', 'each τ shrinks the remaining gap to 1/e, about 37%: 63% after 1τ and 99.3% after 5τ, which usually counts as full'], ['방전도 같은 시정수로 v = Vs·e^(−t/RC)를 따라 줄어요 · 리셋 지연, 디바운싱, 타이머가 이 곡선을 써요', 'discharging follows v = Vs·e^(−t/RC) with the same time constant, a curve used by reset delays, debouncing and timers']],
    fin: [['RC 시정수 τ = RC: 1τ에 63%, 5τ에 99%', 'RC time constant τ = RC: 63% at 1τ, 99% at 5τ', 'cix-xs cix-a'], ['1 kΩ × 1 µF = 1 ms처럼 단위를 맞추면 쉬워요', 'matching units, as in 1 kΩ × 1 µF = 1 ms, makes it easy'], ['555 타이머도 이 충방전으로 시간을 재요', 'the 555 timer measures time with this charge and discharge']],
    caps: [['RC 회로', 'The RC circuit'], ['충전 곡선', 'The charging curve'], ['시정수', 'The time constant'], ['방전', 'Discharging'], ['RC 충전과 시정수', 'RC charging and the time constant']]
  });
}

function sRL() {
  const P = PF(20.6, 7.8, 10.6, 4.8, 0, 5, 0, 1.15), up = t => 1 - Math.exp(-t);
  return CW('ci-rl', {
    code: ['L, R, V = 100e-3, 100, 12', 'tau = L / R  # 1 ms', 'I0 = V / R   # 120 mA', 'i = I0 * (1 - np.exp(-t / tau))', 'vL = V * np.exp(-t / tau)'],
    hl: [[0, 1], [1, 1, 'ok'], [3, 2, 'warn'], [1, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 1.4], [19.8, 5.4]), zSw([19.8, 1.4], [22.8, 1.4], 'ink', 1), zR([22.8, 1.4], [26.6, 1.4]), zW([[26.6, 1.4], [28.6, 1.4]]), zL([28.6, 1.4], [28.6, 5.4]), zW([[28.6, 5.4], [19.8, 5.4]])], 1);
      lblR(S, 'lv', 19.1, 3.1, '12 V', 'm', 1); lbl(S, 'lr', 23.8, .2, 'R 100 Ω', 'm', 1); lbl(S, 'll', 29.15, 3.1, 'L 100 mH', 'm', 1);
      F(S, 'tau', 1, 7.3, 'τ = L / R = 100 mH / 100 Ω = 1 ms', 'a', 2);
      lbl(S, 'cmp', 1, 8.6, ['RC와 반대: L이 클수록, R이 작을수록 느려요', 'unlike RC: larger L or smaller R is slower'], '', 2);
      axes(S, 'ax', P, 3); ticks(S, 'tk', P, [[1, '1 ms'], [3, '3 ms'], [5, '5 ms']], [], 3);
      curve(S, 'i', P, up, 3, { color: 'accent', n: 60 }); curve(S, 'v', P, t => Math.exp(-t), 3, { color: 'warn', n: 60 });
      lbl(S, 'il', P.X(2.4), P.Y(.85) + .1, ['전류 i → 120 mA', 'current i → 120 mA'], 'a', 3); lbl(S, 'vl', P.X(2.3), P.Y(.32), ['코일 전압 12 V → 0', 'coil voltage 12 V → 0'], 'w', 3);
      pt(S, 'p1', P.X(1), P.Y(up(1)), 3, C.cur, .16); lbl(S, 'p1l', P.X(1) + .3, P.Y(up(1)) + .1, '63 %', 'm a', 3);
      lines(S, 'ap', 1, 9.9, [[['릴레이: 코일 전류가 차오르는 동안 접점이 늦게 붙어요', 'relays: contacts close late while coil current builds'], 'g'], [['PWM 모터: 짧은 펄스 사이에도 전류가 매끄럽게 이어져요', 'PWM motors: current stays smooth between short pulses'], 'g'], [['스위칭 전원: 인덕터가 전류를 고르게 해요', 'switching supplies: the inductor evens out current'], 'g']], 4, 0, { lh: 1.25 });
    },
    notes: [['인덕터에 전압을 걸면 전류가 곧바로 흐르지 않고 서서히 늘어요 · 코일이 반대 전압을 만들어 변화를 늦추기 때문이에요', 'apply a voltage to an inductor and the current does not jump; it builds gradually because the coil pushes back against the change'], ['시정수는 τ = L/R · 100 mH와 100 Ω이면 1 ms예요 · RC와 달리 L이 클수록, R이 작을수록 느려요', 'the time constant is τ = L/R, 1 ms for 100 mH and 100 Ω; unlike RC, a larger L or smaller R makes it slower'], ['전류는 V/R = 120 mA를 향해 1 − e^(−t/τ)로 오르고, 코일 전압은 12 V에서 0으로 줄어요', 'the current climbs toward V/R = 120 mA as 1 − e^(−t/τ) while the coil voltage falls from 12 V to 0'], ['릴레이 접점이 늦게 붙는 이유, PWM으로 모터를 돌려도 전류가 매끄러운 이유가 이 시정수예요', 'this time constant is why relay contacts close late and why a PWM-driven motor still draws smooth current']],
    fin: [['RL 시정수 τ = L/R · 전류는 지수적으로 쌓여요', 'RL time constant τ = L/R; current builds exponentially', 'cix-xs cix-a'], ['RC는 전압을, RL은 전류를 서서히 바꿔요', 'RC eases voltage changes; RL eases current changes'], ['스위칭 전원은 이 성질로 전류를 고르게 해요', 'switching power supplies rely on this to smooth current']],
    caps: [['RL 회로', 'The RL circuit'], ['시정수 L/R', 'The time constant L/R'], ['전류와 코일 전압', 'Current and coil voltage'], ['쓰이는 곳', 'Where it shows up'], ['RL 회로', 'RL circuits']]
  });
}

function sRLC() {
  const P = PF(2.8, 8.0, 14.4, 5.6, 0, 14, 0, 1.75);
  const under = z => t => { const wd = Math.sqrt(1 - z * z); return 1 - Math.exp(-z * t) * (Math.cos(wd * t) + z / wd * Math.sin(wd * t)); };
  const crit = t => 1 - (1 + t) * Math.exp(-t);
  const over = z => { const r = Math.sqrt(z * z - 1), s1 = -(z - r), s2 = -(z + r); return t => 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1); };
  return CW('ci-rlc', {
    code: ['L, C = 1e-3, 1e-6', 'w0 = 1 / np.sqrt(L * C)   # f0 ≈ 5.03 kHz', 'zeta = R / 2 * np.sqrt(C / L)', ['R_c = 2 * np.sqrt(L / C)  # 63 Ω: 임계', 'R_c = 2 * np.sqrt(L / C)  # 63 Ω: critical'], ['# R = 10 진동, 63 임계, 200 과감쇠', '# R = 10 rings, 63 critical, 200 overdamped']],
    hl: [[0, 2], [4, 1, 'danger'], [3, 1, 'ok'], [4, 1, 'warn']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 1.4], [19.8, 5.4]), zSw([19.8, 1.4], [22.2, 1.4], 'ink', 1), zR([22.2, 1.4], [25.0, 1.4]), zL([25.0, 1.4], [28.4, 1.4]), zW([[28.4, 1.4], [29.4, 1.4]]), zC([29.4, 1.4], [29.4, 5.4]), zW([[29.4, 5.4], [19.8, 5.4]])], 1);
      lblR(S, 'lv', 19.1, 3.1, 'Vs', 'm', 1); lbl(S, 'lr', 22.9, .2, 'R', 'm', 1); lbl(S, 'll', 25.9, .2, 'L 1 mH', 'm', 1); lbl(S, 'lc', 29.95, 3.1, 'C 1 µF', 'm', 1);
      lbl(S, 'f0', 21.0, 3.1, 'f0 = 1/(2π√LC) ≈ 5 kHz', 'm a', 1);
      axes(S, 'ax', P, 2); hl(S, 'one', P.x0, P.x0 + P.w, P.Y(1), 'ink-3', 2, { w: .05, dash: 1 }); ticks(S, 'tk', P, [], [[1, 'Vs']], 2);
      lbl(S, 'yl', 1, 7.1, ['커패시터 전압', 'capacitor voltage'], 'm', 2); lbl(S, 'xl', P.x0 + P.w - 1.4, P.Y(0) + .2, 'ω0·t', 'f', 2);
      curve(S, 'u', P, under(.158), 2, { color: 'danger', n: 200 }); lbl(S, 'ul', 21.0, 7.1, ['R = 10 Ω: 60% 넘치고 출렁', 'R = 10 Ω: 60% overshoot, ringing'], 'r', 2);
      curve(S, 'c', P, crit, 3, { color: 'ok', n: 120, h: .11 }); lbl(S, 'cl', 21.0, 8.4, ['R = 63 Ω: 임계 감쇠, 가장 빨리 자리 잡음', 'R = 63 Ω: critical, settles fastest'], 'g', 3);
      curve(S, 'o', P, over(3.16), 4, { color: 'warn', n: 120 }); lbl(S, 'ol', 21.0, 9.7, ['R = 200 Ω: 과감쇠, 느릿느릿', 'R = 200 Ω: overdamped, slow'], 'w', 4);
      F(S, 'z', 21.0, 11.2, 'ζ = (R/2)·√(C/L)', 'a', 3); lbl(S, 'zn', 21.0, 12.4, ['ζ < 1 진동 · ζ = 1 임계 · ζ > 1 과감쇠', 'ζ < 1 rings · ζ = 1 critical · ζ > 1 overdamped'], '', 4);
    },
    notes: [['R, L, C를 직렬로 이으면 에너지가 커패시터의 전기장과 코일의 자기장 사이를 오가며 진동할 수 있어요', 'with R, L and C in series, energy can slosh between the capacitor’s electric field and the coil’s magnetic field'], ['1 mH와 1 µF의 고유 주파수는 1/(2π√LC) ≈ 5 kHz · R = 10 Ω이면 감쇠가 약해 60%나 넘쳤다 출렁여요', '1 mH and 1 µF have a natural frequency 1/(2π√LC) ≈ 5 kHz; with R = 10 Ω damping is weak and it overshoots by 60% and rings'], ['R = 2√(L/C) ≈ 63 Ω이면 임계 감쇠예요 · 넘치지 않으면서 가장 빨리 자리 잡아요', 'at R = 2√(L/C) ≈ 63 Ω the circuit is critically damped, settling fastest without overshoot'], ['R = 200 Ω이면 과감쇠라 느릿느릿 올라가요 · 감쇠비 ζ 하나로 세 경우가 갈려요', 'at R = 200 Ω it is overdamped and creeps up slowly; the damping ratio ζ alone separates the three cases']],
    fin: [['RLC 감쇠비 ζ = (R/2)√(C/L): ζ < 1 진동, = 1 임계, > 1 과감쇠', 'RLC damping ratio ζ = (R/2)√(C/L): below 1 rings, 1 is critical, above 1 is overdamped', 'cix-xs cix-a'], ['디지털 신호선의 링잉, 스피커 공진도 같은 식이에요', 'ringing on digital lines and speaker resonance follow the same math'], ['기계의 질량-스프링-댐퍼와 똑같은 방정식이에요', 'it is the same equation as a mass–spring–damper']],
    caps: [['RLC 회로', 'The RLC circuit'], ['부족 감쇠', 'Underdamped'], ['임계 감쇠', 'Critically damped'], ['과감쇠', 'Overdamped'], ['RLC 응답과 감쇠', 'RLC response and damping']]
  });
}
/* ===== Circuits · 3. AC circuits ===== */
function sImp() {
  const O = [22.4, 5.0], k = .03, P = PF(2.4, 7.8, 14.6, 4.8, 0, 2, -1.25, 1.25);
  const ZR = [O[0] + 100 * k, O[1]], ZL = [ZR[0], ZR[1] - 62.8 * k], ZC = [ZL[0], ZL[1] + 159.2 * k];
  const sn = ph => t => .72 * Math.sin(2 * Math.PI * t + ph);
  return CW('ci-impedance', {
    code: ['w = 2 * np.pi * 1e3       # 1 kHz', ['Zr = 100                  # 위상 0°', 'Zr = 100                  # phase 0°'], 'Zl = 1j * w * 10e-3       # +62.8j Ω', 'Zc = 1 / (1j * w * 1e-6)  # −159j Ω', ['I = V / (Zr + Zl + Zc)    # 복소수 옴의 법칙', 'I = V / (Zr + Zl + Zc)    # complex Ohm']],
    hl: [[1, 1, 'ok'], [2, 1, 'warn'], [3, 1, 'accent'], [4, 1, 'danger']],
    draw: (S) => {
      hl(S, 're', 19.0, 30.8, O[1], 'ink-3', 0, { w: .05 }); vl(S, 'im', O[0], .4, 9.0, 'ink-3', 0, { w: .05 });
      lbl(S, 'rel', 29.9, O[1] + .2, 'Re', 'f', 0); lbl(S, 'iml', O[0] + .25, .2, 'Im', 'f', 0);
      SV(S, 'zr', [zA(O, ZR, 'ok', .12)], 1); lbl(S, 'zrl', 22.7, O[1] - .7, 'R = 100', 'm g', 1);
      SV(S, 'zl', [zA(ZR, ZL, 'warn', .12)], 2); lbl(S, 'zll', ZR[0] + .3, ZL[1] - .2, 'jωL = +62.8j', 'm w', 2);
      SV(S, 'zc', [zA(ZL, ZC, 'accent', .12)], 3); lbl(S, 'zcl', ZR[0] + .3, ZC[1] - .45, '1/(jωC) = −159j', 'm a', 3);
      SV(S, 'zt', [zA(O, ZC, 'danger', .12)], 4); lbl(S, 'ztl', 19.2, 9.4, 'Z = 100 − 96j = 139 Ω ∠ −44°', 'm r', 4);
      axes(S, 'ax', P, 1); curve(S, 'v', P, sn(0), 1, { color: 'ink-3', n: 80, h: .07 });
      lbl(S, 'leg', 1, 7.15, ['회색: 전압 v · 색: 전류 i', 'gray: voltage v · color: current i'], 'm', 1);
      curve(S, 'ir', P, t => .5 * Math.sin(2 * Math.PI * t), 1, { color: 'ok', n: 80, off: 2 });
      curve(S, 'il', P, t => .5 * Math.sin(2 * Math.PI * t - Math.PI / 2), 2, { color: 'warn', n: 80, off: 3 });
      curve(S, 'ic', P, t => .5 * Math.sin(2 * Math.PI * t + Math.PI / 2), 3, { color: 'accent', n: 80, off: 4 });
      curve(S, 'it', P, t => .5 * Math.sin(2 * Math.PI * t + .766), 4, { color: 'danger', n: 80 });
      lbl(S, 'pr', 1, 13.2, ['저항: 같은 위상', 'resistor: in phase'], 'g', 1, { off: 2 }); lbl(S, 'pl', 1, 13.2, ['인덕터: 전류가 90° 늦어요', 'inductor: current lags 90°'], 'w', 2, { off: 3 });
      lbl(S, 'pc', 1, 13.2, ['커패시터: 전류가 90° 앞서요', 'capacitor: current leads 90°'], 'a', 3, { off: 4 }); lbl(S, 'pt', 1, 13.2, ['합: 전류가 44° 앞서요 (용량성)', 'total: current leads 44° (capacitive)'], 'r', 4);
    },
    notes: [['교류에서는 부품이 크기뿐 아니라 위상도 바꿔요 · 그래서 크기와 각도를 함께 담는 복소수 임피던스 Z를 써요', 'in AC circuits parts shift phase as well as scale amplitude, so we use complex impedance Z, which carries both size and angle'], ['인덕터는 Z = jωL · 1 kHz에서 10 mH는 +62.8j Ω이고, 전압이 전류보다 90° 앞서요', 'an inductor has Z = jωL: 10 mH at 1 kHz is +62.8j Ω, with voltage leading current by 90°'], ['커패시터는 Z = 1/(jωC) · 1 µF는 −159j Ω이고, 전류가 전압보다 90° 앞서요', 'a capacitor has Z = 1/(jωC): 1 µF is −159j Ω, with current leading voltage by 90°'], ['직렬이면 복소수로 그냥 더해요 · 100 + 62.8j − 159j = 100 − 96j Ω, 크기 139 Ω에 −44°이고, I = V/Z가 복소수 옴의 법칙이에요', 'in series the impedances simply add as complex numbers: 100 + 62.8j − 159j = 100 − 96j Ω, 139 Ω at −44°, and I = V/Z is Ohm’s law in complex form']],
    fin: [['임피던스: R, jωL, 1/(jωC) · 복소수로 더하고 나눠요', 'impedance: R, jωL and 1/(jωC), added and divided as complex numbers', 'cix-xs cix-a'], ['페이저는 회전하는 사인파를 화살표 하나로 멈춰 그린 거예요', 'a phasor freezes a rotating sinusoid as a single arrow'], ['주파수가 바뀌면 L과 C의 임피던스도 바뀌어요', 'the impedances of L and C change with frequency']],
    caps: [['저항', 'Resistors'], ['인덕터', 'Inductors'], ['커패시터', 'Capacitors'], ['합성 임피던스', 'Total impedance'], ['페이저와 임피던스', 'Phasors and impedance']]
  });
}

function sRCF() {
  const P = PF(3.0, 7.8, 14.0, 4.6, 1, 5, 0, 1.1), fc = Math.log10(995), r = x => Math.pow(10, x - fc);
  const Q = PF(20.6, 8.4, 10.6, 4.0, 0, 3, -1, 3.4);
  return CW('ci-rc-filter', {
    code: ['R, C = 1.6e3, 100e-9', 'fc = 1 / (2 * np.pi * R * C)  # ≈ 995 Hz', ['lp = 1 / (1 + 1j * f / fc)    # C 양단: 저역', 'lp = 1 / (1 + 1j * f / fc)    # Vc: low-pass'], ['hp = (1j * f / fc) * lp       # R 양단: 고역', 'hp = (1j * f / fc) * lp       # Vr: high-pass'], ['# 결합 커패시터: DC를 막아요', '# coupling cap: blocks DC']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zSrc([19.8, 1.4], [19.8, 5.4], 'ink', 1), zR([19.8, 1.4], [24.4, 1.4]), zJ([24.4, 1.4]), zC([24.4, 1.4], [24.4, 5.4]), zW([[24.4, 5.4], [19.8, 5.4]]), zW([[24.4, 1.4], [28.4, 1.4]]), zT([28.4, 1.4]), zW([[24.4, 5.4], [28.4, 5.4]]), zJ([24.4, 5.4]), zT([28.4, 5.4])], 1);
      lbl(S, 'lr', 21.1, .15, 'R 1.6 kΩ', 'm', 1); lbl(S, 'lc', 24.95, 3.1, 'C 100 nF', 'm', 1); lbl(S, 'lin', 20.5, 3.6, 'Vin', 'm', 1);
      lbl(S, 'vc', 28.75, 3.1, ['Vc: 저역', 'Vc: low'], 'm g', 2);
      SV(S, 'vr', [zA([20.4, 2.05], [23.8, 2.05], 'warn', .07)], 3); lbl(S, 'vrl', 20.5, 2.3, ['Vr: 고역', 'Vr: high'], 'm w', 3);
      axes(S, 'ax', P, 2); ticks(S, 'tk', P, [[1, '10 Hz'], [fc, '1 kHz'], [5, '100 kHz']], [[1, '1']], 2);
      hl(S, 'h7', P.x0, P.x0 + P.w, P.Y(.707), 'ink-3', 2, { w: .05, dash: 1 }); lbl(S, 'h7l', 1, P.Y(.707) - .3, '0.707', 'm', 2);
      curve(S, 'lp', P, x => 1 / Math.sqrt(1 + r(x) * r(x)), 2, { color: 'ok', n: 80 }); lbl(S, 'lpl', 3.4, 7.2, ['C 양단(저역통과)', 'across C (low-pass)'], 'g', 2);
      curve(S, 'hp', P, x => r(x) / Math.sqrt(1 + r(x) * r(x)), 3, { color: 'warn', n: 80 }); lbl(S, 'hpl', 11.6, 7.2, ['R 양단(고역통과)', 'across R (high-pass)'], 'w', 3);
      pt(S, 'fcp', P.X(fc), P.Y(.707), 3, C.cur, .17);
      axes(S, 'qa', Q, 4); curve(S, 'qin', Q, t => 2.5 + .6 * Math.sin(2 * Math.PI * t), 4, { color: 'warn', n: 80 }); curve(S, 'qout', Q, t => .6 * Math.sin(2 * Math.PI * t), 4, { color: 'accent', n: 80 });
      lbl(S, 'qil', 20.8, 7.4, ['입력: 2.5 V + 신호', 'in: 2.5 V + signal'], 'w', 4); lbl(S, 'qol', 26.6, 7.4, ['출력: 신호만', 'out: signal only'], 'a', 4);
    },
    notes: [['R과 C로 만든 전압 분배기는 주파수에 따라 나누는 비율이 바뀌어요 · C의 임피던스가 주파수에 반비례하기 때문이에요', 'a divider built from R and C changes its ratio with frequency, because C’s impedance is inversely proportional to frequency'], ['C 양단에서 출력을 꺼내면 저역통과예요 · 낮은 주파수는 그대로, fc = 1/(2πRC) ≈ 995 Hz 위로는 줄어요', 'taking the output across C gives a low-pass: low frequencies pass and those above fc = 1/(2πRC) ≈ 995 Hz shrink'], ['R 양단에서 꺼내면 반대로 고역통과예요 · 두 곡선은 fc에서 0.707(−3 dB)로 만나요', 'taking it across R gives the opposite, a high-pass, and the two curves meet at 0.707 (−3 dB) at fc'], ['신호 경로에 직렬 C를 두면 직류 성분은 막히고 교류 신호만 지나가요 · 앰프 사이를 잇는 결합 커패시터예요', 'a series capacitor in a signal path blocks the DC component and passes only the AC signal: a coupling capacitor between amplifier stages']],
    fin: [['RC 필터: C 양단은 저역통과, R 양단은 고역통과 · fc = 1/(2πRC)', 'RC filters: across C is low-pass, across R high-pass, with fc = 1/(2πRC)', 'cix-xs cix-a'], ['ADC 앞 안티에일리어싱 필터도 대개 RC 하나예요', 'the anti-aliasing filter before an ADC is often a single RC'], ['더 가파르게 하려면 단을 겹치거나 능동 필터를 써요', 'for steeper slopes, cascade stages or use active filters']],
    caps: [['주파수 분배기', 'A frequency-dependent divider'], ['저역통과', 'Low-pass'], ['고역통과', 'High-pass'], ['결합 커패시터', 'Coupling capacitors'], ['RC 필터 회로', 'RC filter circuits']]
  });
}

function sReso() {
  const Qf = 62.9, P = PF(3.0, 7.8, 14.0, 4.6, .88, 1.12, 0, 1.1), X = PF(20.6, 8.0, 10.6, 4.4, .5, 1.5, 0, 1300);
  const cur = f => 1 / Math.sqrt(1 + Qf * Qf * Math.pow(f - 1 / f, 2));
  return CW('ci-resonance', {
    code: ['L, C, R = 100e-6, 253e-12, 10', 'f0 = 1/(2*np.pi*np.sqrt(L*C))  # 1.00 MHz', 'Q = np.sqrt(L / C) / R         # ≈ 63', 'bw = f0 / Q                    # ≈ 16 kHz', ['# 공진: XL = XC → Z = R (최소)', '# resonance: XL = XC → Z = R (min)']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zSrc([19.8, 1.4], [19.8, 5.4], 'ink', 1), zR([19.8, 1.4], [22.6, 1.4]), zL([22.6, 1.4], [26.0, 1.4]), zW([[26.0, 1.4], [28.6, 1.4]]), zC([28.6, 1.4], [28.6, 5.4]), zW([[28.6, 5.4], [19.8, 5.4]])], 1);
      lbl(S, 'lr', 20.6, .15, 'R 10 Ω', 'm', 1); lbl(S, 'll', 23.3, .15, 'L 100 µH', 'm', 1); lbl(S, 'lc', 29.15, 3.1, 'C 253 pF', 'm', 1);
      lbl(S, 'ant', 20.5, 3.1, ['안테나 신호', 'antenna signal'], 'm', 1);
      axes(S, 'xa', X, 2); curve(S, 'xl', X, f => 2 * Math.PI * f * 1e6 * 100e-6, 2, { color: 'warn', n: 40 }); curve(S, 'xc', X, f => 1 / (2 * Math.PI * f * 1e6 * 253e-12), 2, { color: 'accent', n: 60 });
      ticks(S, 'xt', X, [[.5, '0.5'], [1, '1 MHz'], [1.5, '1.5']], [], 2);
      lbl(S, 'xll', 27.8, 7.5, 'XL = 2πfL', 'm w', 2); lbl(S, 'xcl', 22.5, 7.5, 'XC = 1/(2πfC)', 'm a', 2);
      pt(S, 'xx', X.X(1), X.Y(629), 2, C.okf, .17); lbl(S, 'xxl', X.X(1) - 1.6, X.Y(629) + .35, ['같아지는 점', 'equal here'], 'g', 2);
      axes(S, 'ax', P, 3, { noy: 1 }); curve(S, 'cur', P, cur, 3, { color: 'ok', n: 200 });
      ticks(S, 'tk', P, [[.9, '0.9'], [1, '1.0 MHz'], [1.1, '1.1']], [], 3);
      hl(S, 'bw', P.X(.992), P.X(1.008), P.Y(.707), 'warn', 3, { w: .1 }); lbl(S, 'bwl', P.X(1.012), P.Y(.707) - .35, ['대역폭 16 kHz', 'bandwidth 16 kHz'], 'w', 3);
      lbl(S, 'yl', 1, 7.15, ['전류 (공진 = 1)', 'current (resonance = 1)'], 'm', 3);
      vl(S, 'o', P.X(1.1), P.Y(cur(1.1)) - .9, P.Y(0), 'danger', 4, { w: .07, dash: 1 }); lbl(S, 'ol', P.X(1.1) - 4.1, P.Y(.62), ['다른 방송 1.1 MHz: 1/12', 'other station at 1.1 MHz: 1/12'], 'r', 4);
    },
    notes: [['코일과 커패시터를 함께 쓰면 한 주파수에서 둘의 리액턴스가 같아져 서로 상쇄돼요 · 공진이에요', 'combine a coil and a capacitor and at one frequency their reactances become equal and cancel: resonance'], ['XL = 2πfL은 주파수와 함께 커지고 XC = 1/(2πfC)는 줄어요 · 100 µH와 253 pF는 1 MHz에서 만나요', 'XL = 2πfL rises with frequency while XC = 1/(2πfC) falls; 100 µH and 253 pF meet at 1 MHz'], ['공진에서는 임피던스가 R뿐이라 전류가 최대예요 · Q = √(L/C)/R ≈ 63이고 대역폭은 f0/Q ≈ 16 kHz예요', 'at resonance the impedance is just R, so current peaks; Q = √(L/C)/R ≈ 63 and the bandwidth is f0/Q ≈ 16 kHz'], ['1.1 MHz의 다른 방송은 전류가 약 1/12로 줄어요 · 라디오 다이얼은 C를 바꿔 공진 주파수를 옮기는 거예요', 'another station at 1.1 MHz gets about 1/12 of the current; a radio dial tunes by changing C to move the resonance']],
    fin: [['공진 f0 = 1/(2π√LC): XL = XC, 직렬 임피던스 최소', 'resonance f0 = 1/(2π√LC): XL = XC and series impedance is minimum', 'cix-xs cix-a'], ['병렬 LC는 반대로 공진에서 임피던스가 최대예요', 'a parallel LC instead peaks in impedance at resonance'], ['수정 발진기는 Q가 수만인 기계적 공진을 써요', 'crystal oscillators use mechanical resonance with Q in the tens of thousands']],
    caps: [['LC 회로', 'The LC circuit'], ['리액턴스가 만나는 곳', 'Where reactances meet'], ['전류 봉우리와 Q', 'The current peak and Q'], ['선택도', 'Selectivity'], ['공진', 'Resonance']]
  });
}

function sACP() {
  const P = PF(2.4, 8.0, 14.6, 5.0, 0, 2, -1.15, 1.15), ph = Math.acos(.8), O = [20.4, 1.2], k = .008;
  const Pp = [O[0] + 880 * k, O[1]], Qp = [Pp[0], O[1] + 660 * k];
  return CW('ci-acpower', {
    code: ['V, I, pf = 220, 5, 0.8         # RMS', ['S = V * I                      # 1100 VA 피상', 'S = V * I                      # 1100 VA (S)'], ['P = S * pf                     # 880 W 유효', 'P = S * pf                     # 880 W real'], 'Q = S * np.sin(np.arccos(pf))  # 660 var', ['# 역률 1 → 같은 880 W를 4 A로', '# PF 1 → the same 880 W at 4 A']],
    hl: [[0, 1], [0, 1, 'warn'], [1, 3, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      axes(S, 'ax', P, 1); curve(S, 'v', P, t => Math.sin(2 * Math.PI * t), 1, { color: 'accent', n: 80 });
      hl(S, 'rms', P.x0, P.x0 + P.w, P.Y(.707), 'ok', 1, { w: .06, dash: 1 }); lbl(S, 'rmsl', 1, 7.2, ['전압: 최댓값 311 V, RMS 220 V(초록 점선)', 'voltage: 311 V peak, 220 V RMS (green dashes)'], 'a', 1);
      curve(S, 'i', P, t => .8 * Math.sin(2 * Math.PI * t - ph), 2, { color: 'warn', n: 80 });
      curve(S, 'p', P, t => Math.sin(2 * Math.PI * t) * .8 * Math.sin(2 * Math.PI * t - ph), 2, { color: 'danger', n: 120, h: .07 });
      lbl(S, 'pl', 1, 13.7, ['주황: 전류(37° 늦음) · 빨강: 순간 전력 v·i, 잠깐 음수', 'orange: current (37° late) · red: power v·i, briefly negative'], 'r', 2);
      SV(S, 'tri', [zA(O, Pp, 'ok', .1), zA(Pp, Qp, 'warn', .1), zA(O, Qp, 'danger', .1)], 3);
      lbl(S, 'tp', 22.6, .25, 'P = 880 W', 'm g', 3); lbl(S, 'tq', Pp[0] + .3, 3.5, 'Q = 660 var', 'm w', 3); lbl(S, 'ts', 20.0, 5.6, 'S = 1100 VA', 'm r', 3);
      lbl(S, 'tphi', O[0] + 1.4, O[1] + .35, 'φ = 37°', 'f', 3);
      SV(S, 'fix', [zW([O, Pp], 'accent', .14, 1)], 4); lbl(S, 'fixl', 20.4, 8.0, ['커패시터로 Q 상쇄 → S = P', 'capacitors cancel Q → S = P'], 'a', 4);
      rect(S, 'b1', 20.4, 9.4, 5 * 1.9, .8, 'danger', 60, 4, { r: .1 }); lbl(S, 'b1l', 20.6, 9.45, ['역률 0.8: 5 A', 'PF 0.8: 5 A'], 'm', 4);
      rect(S, 'b2', 20.4, 10.6, 4 * 1.9, .8, 'ok', 60, 4, { r: .1 }); lbl(S, 'b2l', 20.6, 10.65, ['역률 1.0: 4 A', 'PF 1.0: 4 A'], 'm', 4);
    },
    notes: [['교류 220 V는 RMS 값이에요 · 같은 열을 내는 직류와 같은 값이고, 최댓값은 220 × √2 ≈ 311 V예요', 'the 220 V of mains is an RMS value, equal to the DC that heats a resistor the same, while the peak is 220 × √2 ≈ 311 V'], ['모터처럼 코일이 있는 부하는 전류가 전압보다 늦어요 · 순간 전력 v·i가 잠깐 음수가 되어 에너지가 전원으로 되돌아가요', 'loads with coils, like motors, draw current that lags the voltage, so the instantaneous power v·i briefly goes negative and energy flows back'], ['피상 전력 S = V·I = 1100 VA 중 실제로 일하는 유효 전력은 P = S·cos φ = 880 W, 오가기만 하는 무효 전력은 660 var예요', 'of the apparent power S = V·I = 1100 VA, the real power doing work is P = S·cos φ = 880 W, while 660 var of reactive power just sloshes back and forth'], ['커패시터를 달아 무효 전력을 상쇄하면 역률이 1에 가까워져 같은 880 W를 4 A로 보낼 수 있어요 · 전선 손실이 줄어요', 'adding capacitors to cancel the reactive power brings the power factor near 1, delivering the same 880 W at 4 A with lower wiring losses']],
    fin: [['교류 전력: S² = P² + Q² · 역률 = P/S = cos φ', 'AC power: S² = P² + Q², power factor = P/S = cos φ', 'cix-xs cix-a'], ['전원 장치 사양에 VA와 W가 따로 적힌 이유예요', 'why power supplies list both VA and W'], ['한국 가정용 전기는 220 V, 60 Hz예요', 'Korean household mains is 220 V at 60 Hz']],
    caps: [['RMS', 'RMS'], ['늦게 오는 전류', 'Lagging current'], ['전력 삼각형', 'The power triangle'], ['역률 개선', 'Power-factor correction'], ['교류 전력과 역률', 'AC power and power factor']]
  });
}

function sXfmr() {
  const chain = [[['발전소', 'plant'], 'ink'], [['승압 345 kV', '345 kV up'], 'warn'], [['변전 22.9 kV', '22.9 kV sub'], 'accent'], [['가정 220 V', '220 V home'], 'ok']];
  return CW('ci-transformer', {
    code: ['N1, N2 = 2000, 100  # 20 : 1', 'V2 = 220 * N2 / N1  # 11 V', ['I1 = 2.0 * N2 / N1  # 2 A 출력 → 0.1 A', 'I1 = 2.0 * N2 / N1  # 2 A out → 0.1 A'], 'P = 220 * 0.1       # = 11 * 2 = 22 W', ['# 전압 1000배 → I²R 손실 10⁻⁶배', '# 1000× V → 10⁻⁶ the I²R loss']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      frame(S, 'core', 23.0, .7, 3.4, 6.2, 'ink-3', 1, { w: .32, r: .3 });
      SV(S, 'ckt', [zSrc([19.6, 1.8], [19.6, 5.8], 'ink', 1), zW([[19.6, 1.8], [22.6, 1.8]]), zL([22.6, 1.8], [22.6, 5.8], 'warn', 8), zW([[22.6, 5.8], [19.6, 5.8]]), zW([[26.8, 1.8], [29.6, 1.8]]), zL([26.8, 1.8], [26.8, 5.8], 'accent', 3), zW([[26.8, 5.8], [29.6, 5.8]]), zR([29.6, 1.8], [29.6, 5.8])], 1);
      lbl(S, 'n1', 20.1, .25, 'N1 2000', 'm w', 1); lbl(S, 'n2', 27.1, .25, 'N2 100', 'm a', 1); lbl(S, 'cl', 23.5, 7.2, ['철심', 'iron core'], 'm', 1);
      lbl(S, 'v1', 20.3, 3.5, '220 V', 'm', 2); lbl(S, 'v2', 27.6, 3.5, '11 V', 'm g', 2);
      F(S, 'ratio', 1, 7.3, 'V2 / V1 = N2 / N1 = 1/20', 'g', 2);
      lbl(S, 'i1', 20.0, 6.1, '0.1 A', 'm w', 3); lbl(S, 'i2', 27.6, 6.1, '2 A', 'm w', 3);
      F(S, 'pw', 1, 8.6, '220 V × 0.1 A = 11 V × 2 A = 22 W', 'w', 3);
      const cw = [2.8, 3.8, 4.6, 3.6], cx = [1.0, 4.3, 8.6, 13.7]; chain.forEach(([t, c], i) => { box2(S, 'ch' + i, cx[i], 10.4, cw[i], 1.5, t, c, 4, { pct: 24 }); if (i) arw(S, 'ca' + i, [cx[i] - .45, 11.15], [cx[i], 11.15], 4); });
      lbl(S, 'tl', 1, 12.4, ['전압을 높이면 전류가 줄어 I²R 손실이 크게 줄어요', 'higher voltage means less current and far lower I²R loss'], 'a', 4);
    },
    notes: [['변압기는 철심에 두 코일을 감은 거예요 · 1차 코일의 교류가 만든 변하는 자기장이 2차 코일에 전압을 유도해요', 'a transformer is two coils on an iron core: the changing field from AC in the primary induces a voltage in the secondary'], ['전압비는 감은 수의 비예요 · 2000 : 100이면 220 V가 11 V가 돼요', 'the voltage ratio equals the turns ratio, so 2000 : 100 turns 220 V into 11 V'], ['이상적이면 전력이 보존돼서 전류는 반대로 바뀌어요 · 출력 2 A(22 W)는 입력 0.1 A(22 W)예요', 'ideally power is conserved, so current changes the opposite way: 2 A out (22 W) is 0.1 A in (22 W)'], ['송전선은 전압을 높여 전류를 줄여요 · 손실이 I²R이라 전압을 1000배 올리면 손실은 100만분의 1이 돼요 · 직류에는 쓸 수 없어요', 'power lines raise voltage to cut current; since losses go as I²R, 1000 times the voltage means a millionth of the loss, and none of this works with DC']],
    fin: [['변압기: V2/V1 = N2/N1, I2/I1 = N1/N2 · 교류에서만 동작해요', 'transformer: V2/V1 = N2/N1 and I2/I1 = N1/N2, AC only', 'cix-xs cix-a'], ['1차와 2차가 전기적으로 분리돼 감전을 막아요', 'the windings are electrically isolated, which protects against shock'], ['요즘 충전기는 고주파 변압기를 써서 작고 가벼워요', 'modern chargers use high-frequency transformers to stay small and light']],
    caps: [['두 코일', 'Two coils'], ['전압비', 'The voltage ratio'], ['전류비', 'The current ratio'], ['송전', 'Power transmission'], ['변압기', 'Transformers']]
  });
}
/* ===== Circuits · 4. semiconductor devices ===== */
function sDiode() {
  const P = PF(3.0, 7.0, 13.8, 5.4, -1, .8, -5, 50), I = v => Math.min(60, 1e-9 * (Math.exp(v / .0259) - 1));
  return CW('ci-diode', {
    code: [['Is, Vt = 1e-12, 0.0259  # 실리콘, 25 °C', 'Is, Vt = 1e-12, 0.0259  # silicon, 25 °C'], 'I = Is * (np.exp(V / Vt) - 1)', '# 0.6 V → 12 mA,  0.7 V → 0.55 A', ['# 역방향: −Is ≈ 0 (막힘)', '# reverse: −Is ≈ 0 (blocked)']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 1, 'danger']],
    draw: (S) => {
      rect(S, 'p', 19.4, 1.0, 5.0, 2.6, 'warn', 22, 1, { r: .2 }); rect(S, 'n', 24.4, 1.0, 5.0, 2.6, 'accent', 22, 1, { r: .2 }); rect(S, 'dp', 23.6, 1.0, 1.6, 2.6, 'ink', 8, 1, { r: 0 });
      lbl(S, 'pl', 20.0, 1.2, ['p형', 'p-type'], 's w', 1); lbl(S, 'nl', 25.6, 1.2, ['n형', 'n-type'], 's a', 1);
      lbl(S, 'h', 20.0, 2.4, '+  +  +  +', 'm w', 1); lbl(S, 'e', 25.6, 2.4, '−  −  −  −', 'm a', 1); lbl(S, 'dpl', 22.9, .35, ['공핍층', 'depletion'], 'm', 1);
      SV(S, 'sym', [zT([20.0, 5.6]), zD([20.0, 5.6], [28.6, 5.6]), zT([28.6, 5.6])], 1);
      lbl(S, 'an', 19.4, 6.0, ['애노드 (+)', 'anode (+)'], 'm', 1); lbl(S, 'ca', 26.6, 6.0, ['캐소드 (−)', 'cathode (−)'], 'm', 1);
      SV(S, 'fw', [zA([21.4, 4.75], [27.0, 4.75], 'ok', .1)], 2, { off: 4 }); lbl(S, 'fwl', 21.4, 4.0, ['순방향: 흘러요', 'forward: conducts'], 'g', 2, { off: 4 });
      axes(S, 'ax', P, 2); curve(S, 'iv', P, I, 2, { color: 'ok', n: 240 });
      ticks(S, 'tk', P, [[-1, '−1 V'], [.6, '0.6 V']], [[20, '20 mA'], [40, '40 mA']], 2);
      lbl(S, 'yl', 1, 6.2, ['다이오드 전류 I', 'diode current I'], 'm', 2);
      pt(S, 'p6', P.X(.6), P.Y(I(.6)), 3, C.warn, .17); lbl(S, 'p6l', P.X(0) + .2, P.Y(I(.6)) - 1.1, '0.6 V → 12 mA', 'm w', 3);
      lbl(S, 'p7', P.x0 + .2, P.y0 + .1, ['0.7 V → 550 mA (그래프 밖)', '0.7 V → 550 mA (off chart)'], 'w', 3, { w: 7.2 });
      hl(S, 'rv', P.X(-1), P.X(0), P.Y(0), 'danger', 4, { w: .14 }); lbl(S, 'rvl', P.x0 + .3, P.Y(0) - .8, ['역방향: 거의 0 A', 'reverse: almost 0 A'], 'r', 4);
      lbl(S, 'rb', 21.4, 4.0, ['역방향: 막혀요', 'reverse: blocked'], 'r', 4);
    },
    notes: [['다이오드는 p형과 n형 반도체를 붙인 거예요 · 경계의 공핍층이 전류를 막는 벽 역할을 해요', 'a diode joins p-type and n-type semiconductor, and the depletion layer at the boundary acts as a barrier'], ['순방향(애노드 +)으로 약 0.6 V를 넘기면 벽이 낮아져 전류가 지수적으로 급하게 늘어요', 'forward-biased with the anode positive, it conducts once about 0.6 V is exceeded, and current then rises exponentially'], ['I = Is(e^(V/Vt) − 1) · 0.6 V에서 12 mA, 0.7 V에서 0.55 A라서 켜진 실리콘 다이오드 전압은 대략 0.7 V로 봐요', 'I = Is(e^(V/Vt) − 1) gives 12 mA at 0.6 V and 0.55 A at 0.7 V, so a conducting silicon diode is taken as about 0.7 V'], ['역방향으로는 거의 흐르지 않아요 · 전류의 한 방향 밸브라서 정류, 역전압 보호, 플라이백에 써요', 'in reverse almost nothing flows, making it a one-way valve for rectifiers, reverse-polarity protection and flyback paths']],
    fin: [['다이오드: 한 방향으로만 흐르는 밸브 · 실리콘 약 0.7 V, 쇼트키 약 0.3 V', 'diode: a one-way valve; silicon drops about 0.7 V, Schottky about 0.3 V', 'cix-xs cix-a'], ['역방향 전압을 넘기면 항복해요 · 이걸 일부러 쓰는 게 제너 다이오드예요', 'past the reverse rating it breaks down, which Zener diodes use deliberately'], ['온도가 오르면 순방향 전압이 약 2 mV/°C 줄어요', 'forward voltage falls about 2 mV per °C as temperature rises']],
    caps: [['pn 접합', 'The pn junction'], ['순방향', 'Forward bias'], ['I-V 곡선', 'The I–V curve'], ['역방향', 'Reverse bias'], ['다이오드', 'Diodes']]
  });
}

function sRect() {
  const P = PF(2.4, 7.0, 14.8, 5.0, 0, 3, -1.1, 1.1), Tt = [25.0, 1.0], B = [25.0, 4.0], L = [20.6, 5.6], R = [29.4, 5.6];
  const sm = (() => { const out = []; let vc = 0; for (let i = 0; i <= 600; i++) { const t = 3 * i / 600, s = Math.abs(Math.sin(2 * Math.PI * t)); vc = Math.max(s, vc - .254 * 3 / 600); out.push([P.X(t), P.Y(vc)]); } return out; })();
  return CW('ci-rectifier', {
    code: [['# 반파: 양의 반주기만 통과', '# half-wave: positive halves only'], ['# 브리지: 음의 반주기도 뒤집어요', '# bridge: flips the negative halves too'], ['ripple = I / (2 * f * C)  # 전파 120 Hz', 'ripple = I / (2 * f * C)  # full-wave 120 Hz'], '0.5 / (2 * 60 * 2200e-6)  # ≈ 1.9 V'],
    hl: [[0, 1], [1, 1, 'accent'], [2, 1, 'danger'], [3, 1, 'warn']],
    draw: (S) => {
      SV(S, 'hw', [zSrc([20.4, 1.0], [20.4, 5.0], 'ink', 1), zD([20.4, 1.0], [26.0, 1.0], 'ok'), zW([[26.0, 1.0], [28.4, 1.0]]), zR([28.4, 1.0], [28.4, 5.0]), zW([[28.4, 5.0], [20.4, 5.0]])], 1, { off: 2 });
      lbl(S, 'hwl', 21.6, 2.6, ['다이오드 하나: 반파', 'one diode: half-wave'], 'g', 1, { off: 2 });
      SV(S, 'br', [zSrc(Tt, B, 'ink', 1), zD(Tt, R, 'accent'), zD(B, R, 'accent'), zD(L, Tt, 'accent'), zD(L, B, 'accent'), zW([R, [29.4, 7.0], [23.0, 7.0]]), zW([L, [20.6, 9.0], [27.0, 9.0]]), zJ([27.0, 7.0]), zJ([23.0, 9.0]), zR([27.0, 7.0], [27.0, 9.0])], 2);
      lbl(S, 'plus', 29.75, 5.0, '+', 's a', 2); lbl(S, 'minus', 19.95, 5.0, '−', 's a', 2); lbl(S, 'rl', 27.45, 7.7, 'RL', 'm', 2); lbl(S, 'ac', 25.5, .2, ['AC 입력', 'AC in'], 'm', 2);
      SV(S, 'cap', [zC([23.0, 7.0], [23.0, 9.0], 'danger')], 3); lbl(S, 'cl', 23.55, 7.7, 'C 2200 µF', 'm r', 3);
      axes(S, 'ax', P, 1, { noy: 1 }); curve(S, 'in', P, t => Math.sin(2 * Math.PI * t), 1, { color: 'ink-3', n: 160, h: .06, off: 3 });
      curve(S, 'hwc', P, t => Math.max(0, Math.sin(2 * Math.PI * t)), 1, { color: 'ok', n: 240, off: 2 });
      curve(S, 'fwc', P, t => Math.abs(Math.sin(2 * Math.PI * t)), 2, { color: 'accent', n: 240 });
      spoly(S, 'smc', sm, { st: 3, color: 'danger', h: .11 });
      lbl(S, 'tl', 1, 6.2, ['출력 전압 (최댓값 = 1)', 'output voltage (peak = 1)'], 'm', 1);
      hl(S, 'pk', P.X(2), P.x0 + P.w, P.Y(1), 'warn', 4, { w: .06, dash: 1 }); hl(S, 'mn', P.X(2), P.x0 + P.w, P.Y(.873), 'warn', 4, { w: .06, dash: 1 });
      lbl(S, 'rp', 1, 12.6, ['리플 ≈ I/(2fC) = 0.5 A ÷ (120 Hz × 2200 µF) ≈ 1.9 V', 'ripple ≈ I/(2fC) = 0.5 A ÷ (120 Hz × 2200 µF) ≈ 1.9 V'], 'w', 4);
    },
    notes: [['전자 기기는 직류가 필요해요 · 다이오드 하나를 직렬로 두면 양의 반주기만 통과하는 반파 정류가 돼요', 'electronics needs DC, and a single series diode passes only the positive half-cycles: half-wave rectification'], ['다이오드 네 개의 브리지는 음의 반주기도 뒤집어 보내요 · 펄스가 두 배로 촘촘해져요(60 Hz → 120 Hz)', 'a bridge of four diodes flips the negative half-cycles too, doubling the pulse rate from 60 Hz to 120 Hz'], ['큰 커패시터를 출력에 달면 꼭대기에서 채우고 그 사이에 부하로 내보내 거의 평평해져요 · 남는 출렁임이 리플이에요', 'a large output capacitor charges at each peak and feeds the load in between, nearly flattening it; the leftover wobble is ripple'], ['리플 ≈ I/(2fC) · 0.5 A, 2200 µF면 약 1.9 V예요 · 그 뒤에 레귤레이터를 두면 깨끗한 직류가 돼요', 'ripple ≈ I/(2fC), about 1.9 V for 0.5 A and 2200 µF; a regulator afterward turns it into clean DC']],
    fin: [['정류: 다이오드로 한 방향, 커패시터로 평탄하게, 레귤레이터로 마무리', 'rectification: diodes for one direction, a capacitor to smooth, a regulator to finish', 'cix-xs cix-a'], ['브리지는 다이오드 두 개를 지나 약 1.4 V를 잃어요', 'a bridge loses about 1.4 V through two diodes'], ['커패시터를 키우면 리플은 줄지만 돌입 전류가 커져요', 'a bigger capacitor cuts ripple but raises inrush current']],
    caps: [['반파 정류', 'Half-wave'], ['브리지 정류', 'The bridge'], ['평활 커패시터', 'The smoothing capacitor'], ['리플', 'Ripple'], ['정류와 평활', 'Rectifying and smoothing']]
  });
}

function sLED() {
  const P = PF(3.0, 7.0, 13.8, 5.4, 0, 5.2, 0, 25), led = v => Math.min(30, 15 * Math.exp((v - 2) / .06));
  return CW('ci-led', {
    code: [['Vs, Vf, I = 5.0, 2.0, 0.015  # 빨간 LED', 'Vs, Vf, I = 5.0, 2.0, 0.015  # red LED'], 'R = (Vs - Vf) / I            # 200 Ω', 'R = 220                      # 220 Ω → 13.6 mA', ['# 저항 없이: 전류 폭주 → LED 손상', '# no resistor: runaway current, dead LED']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 1, 'danger']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.8, 1.4], [19.8, 5.4]), zR([19.8, 1.4], [25.0, 1.4]), zW([[25.0, 1.4], [28.0, 1.4]]), zD([28.0, 1.4], [28.0, 5.4], 'danger', 1), zW([[28.0, 5.4], [19.8, 5.4]])], 1);
      lblR(S, 'lv', 19.1, 3.1, '5 V', 'm', 1); lbl(S, 'lr', 21.4, .15, 'R', 'm', 1, { off: 2 }); lbl(S, 'lr2', 21.4, .15, 'R 220 Ω', 'm', 2, { off: 4 });
      lbl(S, 'led', 28.5, 1.8, 'Vf ≈ 2 V', 'm r', 1);
      axes(S, 'ax', P, 1); curve(S, 'iv', P, led, 1, { color: 'danger', n: 200, b: 2.06 });
      ticks(S, 'tk', P, [[2, '2 V'], [5, '5 V']], [[10, '10 mA'], [20, '20 mA']], 1);
      lbl(S, 'yl', 1, 6.2, ['LED 전류', 'LED current'], 'm', 1);
      F(S, 'calc', 20.4, 6.6, 'R = (5 − 2) V / 15 mA = 200 Ω', 'g', 2);
      curve(S, 'ld', P, v => (5 - v) / .22, 3, { color: 'accent', n: 20 }); pt(S, 'op', P.X(1.994), P.Y(13.6), 3, C.okf, .18);
      lbl(S, 'opl', P.X(1.994) + .4, P.Y(13.6) - .95, ['동작점 13.6 mA', 'operating point 13.6 mA'], 'g', 3); lbl(S, 'ldl', P.X(3.3), P.Y(9.0) - 1.0, ['220 Ω 부하선', '220 Ω load line'], 'a', 3);
      SV(S, 'sh', [zW([[20.8, 1.4], [24.0, 1.4]], 'danger', .2)], 4); lbl(S, 'shl', 21.0, 2.0, ['저항 없음', 'no resistor'], 'r', 4);
      vl(S, 'v5', P.X(5), P.y0, P.Y(0), 'danger', 4, { w: .08, dash: 1 }); lbl(S, 'v5l', P.X(2.4), P.y0 + .1, ['5 V 직결: I → 폭주', '5 V direct: I runs away'], 'r', 4);
    },
    notes: [['LED는 다이오드라서 순방향 전압(빨강 약 2 V) 근처에서 전류가 급하게 늘어요 · 밝기는 전류로 정해져요', 'an LED is a diode whose current shoots up near its forward voltage, about 2 V for red, and its brightness is set by current'], ['저항에 걸리는 전압은 5 − 2 = 3 V라서 15 mA를 원하면 R = 3/0.015 = 200 Ω이에요', 'the resistor sees 5 − 2 = 3 V, so 15 mA calls for R = 3/0.015 = 200 Ω'], ['흔한 220 Ω을 쓰면 13.6 mA · 그래프에서 LED 곡선과 저항의 부하선이 만나는 점이 실제 동작점이에요', 'the common 220 Ω value gives 13.6 mA; the operating point is where the LED curve meets the resistor’s load line'], ['저항 없이 5 V를 바로 걸면 곡선이 거의 수직이라 전류가 폭주해 LED가 타요 · 전압이 아니라 전류를 제한해야 해요', 'connect 5 V directly and the near-vertical curve lets current run away, burning the LED; it needs its current limited, not its voltage']],
    fin: [['LED 저항: R = (Vs − Vf) / I', 'LED resistor: R = (Vs − Vf) / I', 'cix-xs cix-a'], ['파랑·흰색 LED는 Vf가 약 3 V예요', 'blue and white LEDs have Vf around 3 V'], ['PWM으로 깜빡여 평균 전류를 바꾸면 밝기가 조절돼요', 'PWM blinking adjusts the average current and thus brightness']],
    caps: [['LED 특성', 'LED behavior'], ['저항 계산', 'Sizing the resistor'], ['동작점', 'The operating point'], ['저항이 없으면', 'Without a resistor'], ['LED와 전류 제한 저항', 'LEDs and current-limiting resistors']]
  });
}

function sBJT() {
  const P = PF(3.0, 7.4, 13.6, 4.8, 0, 6, 0, 125);
  return CW('ci-bjt', {
    code: [['Ic, beta = 0.1, 100    # 릴레이 100 mA', 'Ic, beta = 0.1, 100    # 100 mA relay'], 'Ib_min = Ic / beta     # 1 mA', ['Ib = 5 * Ib_min        # 5배 여유 → 포화', 'Ib = 5 * Ib_min        # 5× → saturated'], 'Rb = (3.3 - 0.7) / Ib  # 520 → 470 Ω', ['# 포화 Vce ≈ 0.2 V → 열 20 mW', '# saturated Vce ≈ 0.2 V → 20 mW']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zT([27.0, .5]), zL([27.0, .5], [27.0, 3.6]), zW([[27.0, .5], [29.0, .5]]), zD([29.0, 3.6], [29.0, .5], 'ok'), zW([[29.0, 3.6], [27.0, 3.6]]), zJ([27.0, 3.6]), zNpn(25.9, 4.6), zGnd([27.0, 5.6]), zT([20.4, 4.6]), zR([20.4, 4.6], [25.9, 4.6])], 1);
      lbl(S, 'v12', 23.9, .15, '+12 V', 'm', 1); lbl(S, 'rel', 23.6, 1.8, ['릴레이 코일', 'relay coil'], 'm', 1); lbl(S, 'gp', 19.4, 5.1, 'GPIO 3.3 V', 'm', 1);
      lbl(S, 'rb', 21.9, 3.55, 'Rb', 'm', 1, { off: 3 }); lbl(S, 'rb2', 21.9, 3.55, 'Rb 470 Ω', 'm g', 3);
      SV(S, 'ib', [zA([23.6, 5.3], [25.4, 5.3], 'warn', .07)], 2); lbl(S, 'ibl', 23.6, 5.55, 'Ib', 'm w', 2);
      SV(S, 'ic', [zA([27.6, 1.6], [27.6, 3.2], 'accent', .07)], 2); lbl(S, 'icl', 27.8, 1.9, 'Ic', 'm a', 2);
      axes(S, 'ax', P, 1); rect(S, 'sat', P.X(1), P.y0, P.X(6) - P.X(1), P.h, 'ok', 8, 1, { r: 0 });
      curve(S, 'ic2', P, b => Math.min(100 * b, 100), 1, { color: 'accent', n: 60 });
      ticks(S, 'tk', P, [[1, '1 mA'], [5, '5 mA']], [[100, '100 mA']], 1);
      lbl(S, 'yl', 1, 6.7, ['컬렉터 전류 Ic', 'collector current Ic'], 'm', 1); lbl(S, 'xl', P.x0 + P.w - 1.2, P.Y(0) - .7, 'Ib', 'm', 1);
      lbl(S, 'lin', P.X(1.15), P.Y(22), ['Ic = β·Ib', 'Ic = β·Ib'], 'a', 1); lbl(S, 'satl', P.X(2.2), P.Y(60), ['포화: 부하가 정한 100 mA', 'saturated: 100 mA set by the load'], 'g', 1);
      pt(S, 'p1', P.X(1), P.Y(100), 2, C.warn, .18); pt(S, 'p5', P.X(5), P.Y(100), 3, C.okf, .18);
      F(S, 'heat', 1, 13.0, 'Vce(sat) ≈ 0.2 V → 0.2 V × 0.1 A = 20 mW', 'a', 4);
    },
    notes: [['BJT는 작은 베이스 전류로 큰 컬렉터 전류를 조절해요 · Ic = β·Ib이고 β는 보통 100 안팎이에요', 'a BJT lets a small base current control a large collector current, Ic = β·Ib, with β typically around 100'], ['3.3 V GPIO로 100 mA 릴레이를 켜려면 최소 Ib = 100/100 = 1 mA가 필요해요', 'switching a 100 mA relay from a 3.3 V GPIO needs at least Ib = 100/100 = 1 mA'], ['β는 편차가 크니 5배쯤 넉넉히 넣어 완전히 켜진 포화 상태로 둬요 · Rb = (3.3 − 0.7)/5 mA ≈ 520 Ω이라 470 Ω을 써요', 'β varies widely, so drive about five times more to keep it fully on in saturation: Rb = (3.3 − 0.7)/5 mA ≈ 520 Ω, so use 470 Ω'], ['포화되면 Vce ≈ 0.2 V라 열이 20 mW뿐이에요 · 어중간하게 켜면 전압이 걸린 채 전류가 흘러 뜨거워져요', 'saturated, Vce ≈ 0.2 V and it wastes only 20 mW; half-on, it carries current with voltage across it and heats up']],
    fin: [['BJT 스위치: Ic = β·Ib, 넉넉한 베이스 전류로 포화시켜요', 'BJT switch: Ic = β·Ib; drive generous base current into saturation', 'cix-xs cix-a'], ['코일 부하에는 플라이백 다이오드를 같이 달아요', 'pair coil loads with a flyback diode'], ['선형 영역에서 쓰면 증폭기가 돼요', 'used in the linear region, it becomes an amplifier']],
    caps: [['전류 증폭', 'Current gain'], ['필요한 베이스 전류', 'Base current needed'], ['포화시키기', 'Driving into saturation'], ['열과 효율', 'Heat and efficiency'], ['BJT 스위치', 'BJT switches']]
  });
}

function sMOS() {
  const P = PF(3.0, 7.2, 13.6, 4.4, 0, 5, 0, 10), id = v => Math.min(10, 2 * Math.pow(Math.max(0, v - 1.5), 2));
  return CW('ci-mosfet', {
    code: [['# 게이트 전압으로 켜요 (DC 전류 ≈ 0)', '# gate voltage turns it on (≈ 0 DC current)'], ['Vth = 1.5          # 로직 레벨 MOSFET', 'Vth = 1.5          # logic-level MOSFET'], 'P = 2.0**2 * 0.05  # Rds(on) 50 mΩ → 0.2 W', ['# 게이트 100 Ω + 풀다운 100 kΩ', '# 100 Ω gate resistor + 100 kΩ pull-down']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zT([27.2, .4]), zW([[27.2, .4], [27.2, 1.2]]), zO([27.2, 1.9], .7, 'ink'), zW([[27.2, 2.6], [27.2, 3.6]]), zW([[27.2, .8], [29.2, .8]]), zJ([27.2, .8]), zD([29.2, 3.2], [29.2, .8], 'ok'), zW([[29.2, 3.2], [27.2, 3.2]]), zJ([27.2, 3.2]), zNmos(26.0, 4.6), zGnd([27.2, 5.6]), zT([20.2, 4.6]), zR([20.2, 4.6], [23.8, 4.6]), zW([[23.8, 4.6], [26.0, 4.6]]), zJ([24.8, 4.6]), zR([24.8, 4.6], [24.8, 7.2]), zGnd([24.8, 7.2])], 1);
      T(S, 'm', 26.5, 1.45, 'M', 'cz-tc cix-s', 1, { w: 1.4 }); lbl(S, 'v12', 23.9, .05, '+12 V', 'm', 1); lbl(S, 'gp', 19.4, 5.1, 'GPIO', 'm', 1);
      lbl(S, 'rg', 21.2, 3.35, '100 Ω', 'm', 1); lblR(S, 'pd', 24.05, 5.9, '100 kΩ', 'm', 1);
      axes(S, 'ax', P, 2); curve(S, 'id', P, id, 2, { color: 'accent', n: 120 });
      ticks(S, 'tk', P, [[1.5, '1.5'], [3.3, '3.3 V']], [[5, '5 A'], [10, '10 A']], 2);
      lbl(S, 'yl', 1, 6.1, ['드레인 전류 Id', 'drain current Id'], 'm', 2); lbl(S, 'xl', P.x0 + P.w - 1.4, P.Y(0) - .7, 'Vgs', 'm', 2);
      vl(S, 'th', P.X(1.5), P.y0, P.Y(0), 'warn', 2, { w: .06, dash: 1 }); lbl(S, 'thl', P.X(.05), P.y0 + .3, ['문턱 1.5 V', 'threshold 1.5 V'], 'w', 2);
      pt(S, 'on', P.X(3.3), P.Y(id(3.3)), 2, C.okf, .18); lbl(S, 'onl', P.X(3.3) + .35, P.Y(id(3.3)) + .1, ['3.3 V: 켜짐', '3.3 V: on'], 'g', 2);
      F(S, 'heat', 1, 12.4, 'P = I²·Rds(on) = 2² × 0.05 = 0.2 W', 'g', 3);
      lbl(S, 'cmp', 1, 13.6, ['같은 2 A에서 BJT(Vce 0.3 V)는 0.6 W', 'a BJT at 2 A (Vce 0.3 V) wastes 0.6 W'], '', 3);
      frame(S, 'f1', 20.9, 4.05, 2.4, 1.1, 'accent', 4, { w: .08, r: .2, dash: 1 }); frame(S, 'f2', 24.2, 5.1, 1.2, 1.8, 'accent', 4, { w: .08, r: .2, dash: 1 });
      lbl(S, 'f1l', 19.0, 6.6, ['링잉 억제', 'damps ringing'], 'a', 4); lbl(S, 'f2l', 19.0, 7.4, ['리셋 중 OFF 유지', 'keeps it off during reset'], 'a', 4);
    },
    notes: [['MOSFET은 게이트 전압으로 켜고 끄는 스위치예요 · 게이트는 절연돼 있어 켜 있는 동안 직류 전류가 거의 흐르지 않아요', 'a MOSFET is a switch controlled by gate voltage; the gate is insulated, so almost no DC current flows into it while on'], ['Vgs가 문턱 전압(여기선 1.5 V)을 넘으면 켜지기 시작해요 · 3.3 V로 완전히 켜려면 로직 레벨 MOSFET을 골라야 해요', 'it starts conducting once Vgs passes the threshold, 1.5 V here; to turn fully on at 3.3 V you need a logic-level MOSFET'], ['켜지면 작은 저항 Rds(on)처럼 동작해요 · 50 mΩ에 2 A면 열은 I²R = 0.2 W라 BJT보다 손실이 적어요', 'when on it behaves like a small resistance Rds(on): 2 A through 50 mΩ wastes I²R = 0.2 W, less than a BJT would'], ['게이트 직렬 저항은 게이트를 충전할 때의 링잉을 줄이고, 풀다운 저항은 MCU가 리셋 중일 때 게이트가 떠서 모터가 켜지는 걸 막아요', 'a series gate resistor damps ringing as the gate charges, and a pull-down keeps the gate from floating on while the MCU resets']],
    fin: [['MOSFET 스위치: 전압 구동, 켜지면 Rds(on), 열은 I²·Rds(on)', 'MOSFET switch: voltage driven, Rds(on) when on, heat I²·Rds(on)', 'cix-xs cix-a'], ['빠른 PWM에서는 게이트를 충전하는 것도 손실이에요', 'in fast PWM, charging the gate becomes a loss too'], ['P채널은 전원 쪽(하이사이드)에 써요', 'P-channel parts go on the supply side (high side)']],
    caps: [['전압으로 켜는 스위치', 'A voltage-controlled switch'], ['문턱 전압', 'The threshold'], ['켜짐 저항과 열', 'On-resistance and heat'], ['게이트 주변 부품', 'Gate components'], ['MOSFET 스위치', 'MOSFET switches']]
  });
}
/* ===== Circuits · 5. operational amplifiers ===== */
function sOpI() {
  const P = PF(3.4, 7.6, 13.4, 5.4, -.3, .3, -14, 14), x = 22.6, y = 3.6;
  return CW('ci-opamp', {
    code: [['A = 1e5               # 개루프 이득', 'A = 1e5               # open-loop gain'], ['vout = A * (vp - vm)  # 1 mV → 100 V?', 'vout = A * (vp - vm)  # 1 mV → 100 V?'], ['# 실제론 ±12 V에서 포화', '# clips at the ±12 V rails'], ['# 음의 되먹임 → vp ≈ vm', '# negative feedback → vp ≈ vm'], ['# 입력 전류 ≈ 0', '# input current ≈ 0']],
    hl: [[0, 2], [2, 1, 'danger'], [3, 1, 'ok'], [3, 2, 'accent']],
    draw: (S) => {
      SV(S, 'op', [zOp(x, y), zW([[20.0, y - .6], [x, y - .6]]), zT([20.0, y - .6]), zW([[20.0, y + .6], [x, y + .6]]), zT([20.0, y + .6]), zW([[x + 2.4, y], [29.6, y]]), zT([29.6, y]), zW([[x + 1.2, y - .6], [x + 1.2, y - 1.8]]), zW([[x + 1.2, y + .6], [x + 1.2, y + 1.8]])], 1);
      lbl(S, 'vm', 18.7, y - 1.2, 'vm (−)', 'm', 1); lbl(S, 'vp', 19.0, y + .85, 'vp (+)', 'm', 1); lbl(S, 'vo', 28.6, y + .3, 'vout', 'm', 1);
      lbl(S, 'rp', x + 1.5, y - 2.2, '+12 V', 'm', 1); lbl(S, 'rn', x + 1.5, y + 1.6, '−12 V', 'm', 1);
      axes(S, 'ax', P, 2); curve(S, 'tf', P, d => Math.max(-12, Math.min(12, 100 * d)), 2, { color: 'danger', n: 240 });
      ticks(S, 'tk', P, [[-.2, '−0.2 mV'], [.2, '0.2 mV']], [[12, '+12 V'], [-12, '−12 V']], 2);
      lbl(S, 'yl', 1, 6.9, ['출력 vout', 'output vout'], 'm', 2); lbl(S, 'xl', P.x0 + P.w - 2.4, P.Y(0) - .75, 'vp − vm', 'm', 2);
      lbl(S, 'sat', P.X(.06), P.y0 - .6, ['0.12 mV만 넘어도 포화', 'saturated past 0.12 mV'], 'r', 2);
      lines(S, 'rule', 19.0, 7.4, [[['규칙 1: 되먹임이 있으면 vp = vm', 'rule 1: with feedback, vp = vm'], 'g'], [['규칙 2: 입력으로 전류가 흐르지 않아요', 'rule 2: no current flows into the inputs'], 'g']], 3, 0, { lh: 1.3 });
      SV(S, 'fb', [zW([[x + 3.4, y], [x + 3.4, .8], [21.2, .8], [21.2, y - .6]], 'ok', .12), zJ([x + 3.4, y]), zJ([21.2, y - .6])], 4);
      lbl(S, 'fbl', 23.6, .2, ['출력 → − 입력', 'output → − input'], 'g', 4); lbl(S, 'fol', 19.0, 10.4, ['그러면 vout = vp (전압 팔로워)', 'then vout = vp (a voltage follower)'], 'a', 4);
    },
    notes: [['연산 증폭기(op-amp)는 두 입력의 차이를 10만 배쯤 키우는 증폭기예요 · + 입력과 − 입력, 출력 하나가 있어요', 'an op-amp amplifies the difference between its two inputs about 100,000 times, with a + input, a − input and one output'], ['이득이 너무 커서 입력이 1 mV만 달라도 출력이 전원 전압(±12 V)에 붙어 버려요 · 그대로 쓰면 비교기가 돼요', 'the gain is so large that a 1 mV difference drives the output to the supply rails (±12 V); used bare, it is a comparator'], ['출력을 − 입력으로 되먹이면 출력이 두 입력을 같게 만드는 곳에 자리 잡아요 · 가상 단락(vp ≈ vm)이에요', 'feeding the output back to the − input makes it settle wherever the inputs are equal: the virtual short (vp ≈ vm)'], ['두 규칙이면 대부분의 op-amp 회로를 풀 수 있어요 · 되먹임이 있으면 두 입력 전압이 같고, 입력으로는 전류가 흐르지 않아요', 'two rules solve most op-amp circuits: with feedback the two input voltages are equal, and no current flows into the inputs']],
    fin: [['이상적 op-amp 두 규칙: vp = vm (음의 되먹임), 입력 전류 = 0', 'ideal op-amp rules: vp = vm under negative feedback, and zero input current', 'cix-xs cix-a'], ['출력은 전원 전압을 넘을 수 없어요 · 레일 투 레일 제품은 거의 끝까지 가요', 'the output cannot exceed the supply; rail-to-rail parts get close'], ['이득 × 대역폭이 일정해서 이득을 높이면 대역이 좁아져요', 'gain times bandwidth is constant, so more gain means less bandwidth']],
    caps: [['op-amp', 'The op-amp'], ['개루프 포화', 'Open-loop saturation'], ['음의 되먹임', 'Negative feedback'], ['두 가지 규칙', 'The two rules'], ['이상적 op-amp', 'The ideal op-amp']]
  });
}

function sInvA() {
  const x = 24.0, y = 4.0, P = PF(2.4, 7.8, 14.6, 4.8, 0, 2, -2.5, 2.5);
  return CW('ci-inverting', {
    code: ['Rin, Rf = 10e3, 100e3', ['# − 입력 = 0 V (가상 접지)', '# − input at 0 V (virtual ground)'], ['i = vin / Rin   # 전부 Rf로', 'i = vin / Rin   # all through Rf'], 'vout = -i * Rf  # −(Rf/Rin)·vin', ['# 0.2 V → −2 V (이득 −10)', '# 0.2 V → −2 V (gain −10)']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zOp(x, y), zT([19.2, y - .6]), zR([19.2, y - .6], [22.6, y - .6]), zW([[22.6, y - .6], [x, y - .6]]), zJ([23.2, y - .6]), zW([[23.2, y - .6], [23.2, 1.6]]), zR([23.2, 1.6], [27.6, 1.6]), zW([[27.6, 1.6], [27.6, y]]), zW([[x + 2.4, y], [29.6, y]]), zJ([27.6, y]), zT([29.6, y]), zW([[x, y + .6], [23.4, y + .6], [23.4, 5.4]]), zGnd([23.4, 5.4])], 1);
      lblR(S, 'vin', 19.0, y - .95, 'vin', 'm', 1); lbl(S, 'rin', 20.1, 2.2, 'Rin 10 kΩ', 'm', 1); lbl(S, 'rf', 24.0, .4, 'Rf 100 kΩ', 'm', 1); lbl(S, 'vo', 28.8, y + .3, 'vout', 'm', 1);
      lbl(S, 'vg', 19.2, 4.4, ['− 입력 = 0 V', '− input = 0 V'], 'g', 2);
      SV(S, 'ia', [zA([19.8, 2.9], [21.8, 2.9], 'warn', .07), zA([24.4, 2.15], [26.6, 2.15], 'warn', .07)], 3); lbl(S, 'ial', 24.4, 2.4, 'i', 'm w', 3);
      F(S, 'g', 1, 6.9, 'vout = −(Rf / Rin) · vin = −10 · vin', 'a', 3);
      axes(S, 'ax', P, 1); curve(S, 'in', P, t => .2 * Math.sin(2 * Math.PI * t), 1, { color: 'accent', n: 80 });
      ticks(S, 'tk', P, [], [[2, '2 V'], [-2, '−2 V']], 1);
      curve(S, 'out', P, t => -2 * Math.sin(2 * Math.PI * t), 4, { color: 'warn', n: 80 });
      lbl(S, 'il', 1, 13.2, ['파랑: 입력 0.2 V', 'blue: input 0.2 V'], 'a', 1); lbl(S, 'ol', 8.4, 13.2, ['주황: 출력 −2 V (뒤집힘)', 'orange: output −2 V (inverted)'], 'w', 4);
    },
    notes: [['반전 증폭기는 + 입력을 접지하고 Rin과 Rf로 되먹임을 걸어요', 'the inverting amplifier grounds the + input and applies feedback through Rin and Rf'], ['가상 단락 때문에 − 입력도 0 V예요 · 실제로 접지되진 않았지만 0 V에 머무는 가상 접지예요', 'by the virtual short the − input also sits at 0 V, a virtual ground: not wired to ground, yet held there'], ['Rin에 흐르는 전류 vin/Rin은 op-amp로 들어가지 못하고 전부 Rf로 가요 · 그래서 vout = −Rf·vin/Rin이에요', 'the current vin/Rin cannot enter the op-amp, so all of it flows through Rf, giving vout = −Rf·vin/Rin'], ['10 kΩ과 100 kΩ이면 이득 −10 · 0.2 V 사인파가 뒤집힌 2 V 사인파가 돼요', 'with 10 kΩ and 100 kΩ the gain is −10, so a 0.2 V sine becomes an inverted 2 V sine']],
    fin: [['반전 증폭기: vout = −(Rf/Rin)·vin, 입력 임피던스 = Rin', 'inverting amplifier: vout = −(Rf/Rin)·vin, with input impedance Rin', 'cix-xs cix-a'], ['입력 여러 개를 저항으로 모으면 가산기(믹서)가 돼요', 'several inputs through resistors make a summing amplifier (a mixer)'], ['이득이 저항 비로만 정해져 정확해요', 'the gain depends only on a resistor ratio, so it is precise']],
    caps: [['회로 구성', 'The circuit'], ['가상 접지', 'Virtual ground'], ['전류의 길', 'The current path'], ['이득 −10', 'A gain of −10'], ['반전 증폭기', 'Inverting amplifiers']]
  });
}

function sNonInv() {
  const x = 24.0, y = 3.0, bx = 22.4, by = 10.2;
  return CW('ci-noninverting', {
    code: ['Rf, Rg = 90e3, 10e3', ['vout = vin * (1 + Rf / Rg)  # 이득 10', 'vout = vin * (1 + Rf / Rg)  # gain 10'], ['# + 단자로 직접 → 입력 임피던스 매우 큼', '# straight into + → huge input impedance'], ['# 출력 → − 직결: 버퍼 (이득 1)', '# output → − directly: buffer (gain 1)'], ['# 1 kΩ 부하에도 2.5 V 유지', '# holds 2.5 V even into 1 kΩ']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zOp(x, y, 'ink', 1), zT([19.6, y - .6]), zW([[19.6, y - .6], [x, y - .6]]), zW([[x + 2.4, y], [29.6, y]]), zT([29.6, y]), zJ([27.4, y]), zW([[27.4, y], [27.4, 5.0]]), zR([27.4, 5.0], [23.2, 5.0]), zJ([23.2, 5.0]), zW([[23.2, 5.0], [23.2, y + .6], [x, y + .6]]), zR([23.2, 5.0], [23.2, 7.4]), zGnd([23.2, 7.4])], 1);
      lblR(S, 'vin', 19.4, y - .95, 'vin', 'm', 1); lbl(S, 'vo', 28.8, y - .75, 'vout', 'm', 1); lbl(S, 'rf', 24.4, 5.45, 'Rf 90 kΩ', 'm', 1); lblR(S, 'rg', 22.8, 6.0, 'Rg 10 kΩ', 'm', 1);
      F(S, 'g', 1, 7.3, 'vout = vin · (1 + Rf / Rg) = 10 · vin', 'g', 2);
      lbl(S, 'hi', 19.2, y - .05, ['입력 전류 ≈ 0', 'input current ≈ 0'], 'a', 2);
      SV(S, 'buf', [zOp(bx, by, 'warn', 1), zT([20.0, by - .6]), zW([[20.0, by - .6], [bx, by - .6]]), zW([[bx + 2.4, by], [27.4, by]]), zT([27.4, by]), zJ([25.6, by]), zW([[25.6, by], [25.6, 12.0], [21.8, 12.0], [21.8, by + .6], [bx, by + .6]], 'warn')], 3);
      lbl(S, 'bl', 20.0, 8.0, ['버퍼: vout = vin', 'buffer: vout = vin'], 'w', 3);
      rect(S, 'b1', 2.0, 9.4, .42 * 4.0, .8, 'danger', 65, 4, { r: .1 }); lbl(S, 'b1l', 4.0, 9.45, ['분배기 → 1 kΩ 직결: 0.42 V', 'divider → 1 kΩ direct: 0.42 V'], 'r', 4);
      rect(S, 'b2', 2.0, 10.6, 2.5 * 4.0, .8, 'ok', 65, 4, { r: .1 }); lbl(S, 'b2l', 12.3, 10.65, ['버퍼 경유: 2.5 V', 'via buffer: 2.5 V'], 'g', 4);
    },
    notes: [['비반전 증폭기는 입력을 + 단자에 바로 넣고, 출력을 Rf와 Rg로 나눠 − 단자로 되먹여요', 'the non-inverting amplifier feeds the input straight into the + terminal and returns a divided-down output to the − terminal through Rf and Rg'], ['− 단자가 vin과 같아지려면 vout·Rg/(Rf + Rg) = vin이어야 해서 이득은 1 + Rf/Rg = 10이고 위상은 그대로예요', 'for the − input to match vin, vout·Rg/(Rf + Rg) = vin, so the gain is 1 + Rf/Rg = 10 with no inversion'], ['출력을 − 단자에 바로 이으면 이득 1인 버퍼(전압 팔로워)예요 · 입력은 거의 전류를 끌지 않고 출력은 전류를 내줄 수 있어요', 'wiring the output straight to the − input makes a unity-gain buffer (voltage follower) that draws almost no input current yet can supply output current'], ['10 kΩ 분배기에 1 kΩ 부하를 바로 달면 2.5 V가 0.42 V로 무너지지만, 버퍼를 거치면 2.5 V 그대로예요', 'a 1 kΩ load on a 10 kΩ divider collapses 2.5 V to 0.42 V, while a buffer in between keeps it at 2.5 V']],
    fin: [['비반전 증폭기: 이득 1 + Rf/Rg, 입력 임피던스가 매우 커요', 'non-inverting amplifier: gain 1 + Rf/Rg with very high input impedance', 'cix-xs cix-a'], ['센서·기준 전압 뒤에는 버퍼를 둬요', 'put a buffer after sensors and reference voltages'], ['ADC 입력을 구동할 때도 버퍼가 도움이 돼요', 'buffers also help when driving ADC inputs']],
    caps: [['회로 구성', 'The circuit'], ['이득 1 + Rf/Rg', 'Gain 1 + Rf/Rg'], ['전압 팔로워', 'The voltage follower'], ['버퍼가 필요한 이유', 'Why buffers matter'], ['비반전 증폭기와 버퍼', 'Non-inverting amplifiers and buffers']]
  });
}

function sComp() {
  const P = PF(2.6, 7.0, 14.4, 3.8, 0, 10, 0, 5), Q = PF(2.6, 11.4, 14.4, 1.7, 0, 10, -.1, 1.1), N = 800;
  const vin = t => 2.5 - 2.0 * Math.cos(2 * Math.PI * t / 10) + .24 * Math.sin(37 * t) + .15 * Math.sin(61 * t + 1);
  const plain = [], sch = []; let out = false;
  for (let i = 0; i <= N; i++) { const t = 10 * i / N, v = vin(t); plain.push([Q.X(t), Q.Y(v > 2.5 ? 1 : 0)]); if (!out && v > 3) out = true; else if (out && v < 2) out = false; sch.push([Q.X(t), Q.Y(out ? 1 : 0)]); }
  const step = pts => pts.flatMap((p, i) => i ? [[p[0], pts[i - 1][1]], p] : [p]);
  const x = 23.0, y = 3.0;
  return CW('ci-comparator', {
    code: [['out = vin > 2.5  # 비교기', 'out = vin > 2.5  # a comparator'], ['# 잡음이 있으면 경계에서 떨려요', '# noise makes it chatter at the edge'], 'hi, lo = 3.0, 2.0', 'if not out and vin > hi: out = True', 'if out and vin < lo: out = False'],
    hl: [[0, 1], [1, 1, 'danger'], [2, 1, 'warn'], [3, 2, 'ok']],
    draw: (S) => {
      SV(S, 'ckt', [zOp(x, y, 'ink', 1), zT([19.4, y - .6]), zR([19.4, y - .6], [22.4, y - .6]), zJ([22.6, y - .6]), zW([[22.4, y - .6], [x, y - .6]]), zW([[x + 2.4, y], [29.4, y]]), zT([29.4, y]), zW([[x, y + .6], [21.6, y + .6]]), zT([21.6, y + .6])], 1);
      lblR(S, 'vin', 19.2, y - .95, 'vin', 'm', 1); lbl(S, 'ref', 19.0, y + .85, ['기준 2.5 V', 'ref 2.5 V'], 'm', 1); lbl(S, 'out', 28.6, y + .3, 'out', 'm', 1);
      SV(S, 'pf', [zW([[22.6, y - .6], [22.6, .9]], 'warn'), zR([22.6, .9], [27.2, .9], 'warn'), zW([[27.2, .9], [27.2, y]], 'warn'), zJ([27.2, y], 'warn')], 3);
      lbl(S, 'pfl', 23.6, 1.3, ['정 되먹임 → 히스테리시스', 'positive feedback → hysteresis'], 'w', 3);
      axes(S, 'ax', P, 1); curve(S, 'vc', P, vin, 1, { color: 'accent', n: 500, h: .06 });
      hl(S, 'th', P.x0, P.x0 + P.w, P.Y(2.5), 'ink-2', 1, { w: .06, dash: 1, off: 3 }); lbl(S, 'thl', P.x0 + P.w - 1.8, P.Y(2.5) - .65, '2.5 V', 'm', 1, { off: 3 });
      lbl(S, 'il', 1, 6.3, ['잡음 섞인 입력', 'noisy input'], 'm a', 1); lbl(S, 'ol', 1, 11.1, 'out', 'm', 2);
      spoly(S, 'pl', step(plain), { st: 2, color: 'danger', h: .07, off: 4 }); lbl(S, 'chat', 19.0, 8.4, ['경계 근처에서 덜덜 떨림(채터링)', 'chatter near the threshold'], 'r', 2, { off: 4 });
      hl(S, 'hi', P.x0, P.x0 + P.w, P.Y(3), 'warn', 3, { w: .06, dash: 1 }); hl(S, 'lo', P.x0, P.x0 + P.w, P.Y(2), 'warn', 3, { w: .06, dash: 1 });
      lbl(S, 'hil', P.x0 + P.w - 2.4, P.Y(3) - .65, ['3.0 V ↑', '3.0 V ↑'], 'm w', 3); lbl(S, 'lol', P.x0 + P.w - 2.4, P.Y(2) - .62, ['2.0 V ↓', '2.0 V ↓'], 'm w', 3);
      spoly(S, 'sc', step(sch), { st: 4, color: 'ok', h: .1 }); lbl(S, 'scl', 19.0, 8.4, ['슈미트 트리거: 한 번씩 깔끔하게', 'Schmitt trigger: one clean switch each way'], 'g', 4);
    },
    notes: [['비교기는 입력이 기준 전압보다 크면 high, 작으면 low를 내요 · op-amp를 되먹임 없이 쓴 것과 같아요', 'a comparator outputs high when the input exceeds a reference and low otherwise, like an op-amp used without feedback'], ['입력에 잡음이 있으면 기준 근처에서 여러 번 넘나들어 출력이 덜덜 떨려요(채터링)', 'with noise on the input it crosses the threshold several times near the boundary, and the output chatters'], ['슈미트 트리거는 출력에 따라 기준을 바꿔요 · 올라갈 땐 3.0 V, 내려올 땐 2.0 V를 넘어야 바뀌어요(히스테리시스)', 'a Schmitt trigger shifts its threshold with the output: rising needs 3.0 V and falling needs 2.0 V (hysteresis)'], ['두 기준 사이의 간격보다 잡음이 작으면 한 번씩만 깔끔하게 바뀌어요 · 버튼 입력, 센서 경보, 신호 정형에 써요', 'as long as noise stays smaller than the gap, it switches cleanly once each way, which suits buttons, sensor alarms and signal shaping']],
    fin: [['슈미트 트리거: 올라갈 때와 내려갈 때 기준이 다른 비교기', 'Schmitt trigger: a comparator with separate rising and falling thresholds', 'cix-xs cix-a'], ['정 되먹임 저항으로 히스테리시스 폭을 정해요', 'a positive-feedback resistor sets the hysteresis width'], ['MCU 입력 핀에도 슈미트 트리거가 들어 있어요', 'MCU input pins often include Schmitt triggers']],
    caps: [['비교기', 'Comparators'], ['채터링', 'Chatter'], ['히스테리시스', 'Hysteresis'], ['깨끗한 출력', 'A clean output'], ['비교기와 슈미트 트리거', 'Comparators and Schmitt triggers']]
  });
}

function sInteg() {
  const x = 24.0, y = 4.0, P = PF(2.4, 7.6, 14.6, 5.0, 0, 8, -1.4, 1.4);
  const sq = t => (Math.floor(t / 2) % 2 === 0 ? 1 : -1), tri = t => { const m = t % 4; return m < 2 ? 1 - m : -3 + m; };
  const sqPts = []; for (let k = 0; k < 4; k++) { const a = 2 * k, v = k % 2 ? -1 : 1; sqPts.push([P.X(a), P.Y(v)], [P.X(a + 2), P.Y(v)]); }
  return CW('ci-integrator', {
    code: ['R, C = 10e3, 100e-9  # RC = 1 ms', 'vout = -np.cumsum(vin) * dt / (R * C)', ['# ±1 V 사각파 → 기울기 ∓1 V/ms', '# ±1 V square → slope ∓1 V/ms'], ['# 250 Hz: 반주기 2 ms → 2 Vpp 삼각파', '# 250 Hz: 2 ms halves → 2 Vpp triangle'], ['# R과 C 자리를 바꾸면 미분기', '# swap R and C for a differentiator']],
    hl: [[0, 2], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zOp(x, y), zT([19.4, y - .6]), zR([19.4, y - .6], [22.6, y - .6]), zW([[22.6, y - .6], [x, y - .6]]), zJ([23.2, y - .6]), zW([[23.2, y - .6], [23.2, 1.6], [25.0, 1.6]]), zC([25.0, 1.6], [25.8, 1.6]), zW([[25.8, 1.6], [27.6, 1.6], [27.6, y]]), zW([[x + 2.4, y], [29.6, y]]), zJ([27.6, y]), zT([29.6, y]), zW([[x, y + .6], [23.4, y + .6], [23.4, 5.4]]), zGnd([23.4, 5.4])], 1);
      lblR(S, 'vin', 19.2, y - .95, 'vin', 'm', 1); lbl(S, 'r', 20.2, 2.25, 'R 10 kΩ', 'm', 1); lbl(S, 'c', 24.4, .4, 'C 100 nF', 'm', 1); lbl(S, 'vo', 28.8, y + .3, 'vout', 'm', 1);
      F(S, 'eq', 1, 6.9, 'vout = −(1/RC) ∫ vin dt', 'a', 1);
      axes(S, 'ax', P, 2); spoly(S, 'sq', sqPts.flatMap((p, i) => i && i % 2 === 0 ? [[p[0], sqPts[i - 1][1]], p] : [p]), { st: 2, color: 'accent', h: .08 });
      ticks(S, 'tk', P, [[2, '2 ms'], [4, '4 ms'], [8, '8 ms']], [[1, '+1 V'], [-1, '−1 V']], 2);
      lbl(S, 'sl', 19.0, 7.4, ['입력: ±1 V, 250 Hz 사각파', 'input: ±1 V, 250 Hz square'], 'a', 2);
      curve(S, 'tr', P, tri, 3, { color: 'warn', n: 160, h: .11 }); lbl(S, 'trl', 19.0, 8.6, ['출력: 2 Vpp 삼각파 (1 V/ms)', 'output: 2 Vpp triangle (1 V/ms)'], 'w', 3);
      box2(S, 'b1', 19.4, 10.4, 4.6, 1.4, ['적분기', 'integrator'], 'warn', 4, { pct: 24 }); box2(S, 'b2', 26.0, 10.4, 5.3, 1.4, ['슈미트 트리거', 'Schmitt trigger'], 'accent', 4, { pct: 24 });
      arw(S, 'a1', [24.1, 11.1], [25.9, 11.1], 4); arw(S, 'a2', [28.6, 11.9], [28.6, 12.8], 4); arw(S, 'a3', [21.7, 12.8], [21.7, 11.9], 4); hl(S, 'a4', 21.7, 28.6, 12.8, 'ink-2', 4, { w: .1 });
      lbl(S, 'fg', 19.4, 13.2, ['= 사각파·삼각파 함수 발생기', '= a square/triangle function generator'], 'g', 4);
    },
    notes: [['op-amp의 되먹임 자리에 커패시터를 두면 적분기가 돼요 · 가상 접지라 vin/R 전류가 그대로 C를 채워요', 'putting a capacitor in an op-amp’s feedback path makes an integrator: with a virtual ground, the current vin/R charges C directly'], ['vout = −(1/RC)∫vin dt · RC = 1 ms면 1 V 입력에 출력이 1 ms마다 1 V씩 내려가요', 'vout = −(1/RC)∫vin dt, so with RC = 1 ms a 1 V input drops the output 1 V every millisecond'], ['±1 V, 250 Hz 사각파를 넣으면 2 ms마다 방향이 바뀌어 2 Vpp 삼각파가 나와요', 'a ±1 V, 250 Hz square wave reverses every 2 ms, producing a 2 Vpp triangle wave'], ['적분기 출력을 슈미트 트리거로 보내 다시 되먹이면 사각파와 삼각파를 함께 만드는 발진기가 돼요 · 실제론 C와 병렬로 큰 저항을 둬 드리프트를 막아요', 'feeding the integrator into a Schmitt trigger and back yields an oscillator producing both square and triangle waves; in practice a large resistor across C prevents drift']],
    fin: [['적분기: vout = −(1/RC)∫vin dt · 사각파 → 삼각파', 'integrator: vout = −(1/RC)∫vin dt, turning squares into triangles', 'cix-xs cix-a'], ['R과 C 자리를 바꾸면 미분기예요', 'swapping R and C gives a differentiator'], ['PID 제어의 I 항을 아날로그로 만든 거예요', 'it is the analog form of the I term in PID control']],
    caps: [['적분기 회로', 'The integrator circuit'], ['기울기 = 입력/RC', 'Slope = input/RC'], ['사각파 → 삼각파', 'Square to triangle'], ['함수 발생기', 'A function generator'], ['op-amp 적분기', 'Op-amp integrators']]
  });
}
/* ===== Circuits · 6. practical circuits ===== */
function sPull() {
  const P = PF(2.4, 7.4, 14.6, 4.6, 0, 10, 0, 3.8), nd = [24.0, 3.2];
  const flo = t => 1.6 + .9 * Math.sin(3.1 * t) * Math.sin(.7 * t + 1) + .5 * Math.sin(11 * t);
  const pin = t => (t > 4 && t < 6.5 ? 0 : 3.3);
  const rc = t => { const m = t % 5; return m < 2.5 ? 3.3 * (1 - Math.exp(-m / .45)) : 3.3 * Math.exp(-(m - 2.5) / .04); };
  return CW('ci-pullup', {
    code: [['# 아무 데도 안 이은 입력 = 떠 있음', '# an unconnected input floats'], ['R = 10e3                     # 3.3 V로 풀업', 'R = 10e3                     # pull-up, 3.3 V'], ['I = 3.3 / R                  # 누르면 0.33 mA', 'I = 3.3 / R                  # 0.33 mA pressed'], ['tr = 0.85 * 4.7e3 * 200e-12  # I2C 상승 0.8 µs', 'tr = 0.85 * 4.7e3 * 200e-12  # I2C rise 0.8 µs'], ['# 오픈 드레인: 누구나 0으로 당겨요', '# open drain: anyone can pull low']],
    hl: [[0, 1, 'danger'], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'accent']],
    draw: (S) => {
      rect(S, 'mcu', 27.0, 1.4, 3.6, 3.6, 'accent', 12, 1, { r: .3 }); lbl(S, 'mcul', 27.9, 2.85, 'MCU', 's a', 1);
      SV(S, 'base', [zW([nd, [27.0, 3.2]]), zJ(nd), zSw(nd, [24.0, 6.6], 'ink', 0), zGnd([24.0, 6.6])], 1);
      lblR(S, 'btn', 23.6, 4.6, ['버튼', 'button'], 'm', 1); lbl(S, 'q', 25.0, 2.5, ['?', '?'], 's r', 1, { off: 2 });
      SV(S, 'pu', [zR([24.0, .7], nd), zT([24.0, .7])], 2); lblR(S, 'pul', 23.5, 1.6, ['풀업 10 kΩ', 'pull-up 10 kΩ'], 'g', 2); lbl(S, 'v33', 24.4, .2, '3.3 V', 'm', 2);
      SV(S, 'cur', [zA([23.4, 1.4], [23.4, 2.8], 'warn', .07)], 3); lbl(S, 'curl', 20.0, 2.6, '0.33 mA', 'm w', 3);
      axes(S, 'ax', P, 1, { off: 4 }); lbl(S, 'yl', 1, 6.7, ['핀 전압', 'pin voltage'], 'm', 1, { off: 4 });
      curve(S, 'fl', P, flo, 1, { color: 'danger', n: 300, off: 2 }); lbl(S, 'fll', 9.0, 6.7, ['떠 있으면 0·1이 오락가락', 'floating: random 0s and 1s'], 'r', 1, { off: 2 });
      spoly(S, 'pn', [[P.X(0), P.Y(3.3)], [P.X(4), P.Y(3.3)], [P.X(4), P.Y(0)], [P.X(6.5), P.Y(0)], [P.X(6.5), P.Y(3.3)], [P.X(10), P.Y(3.3)]], { st: 2, color: 'ok', h: .1, off: 4 });
      lbl(S, 'pnl', 9.0, 6.7, ['평소 1, 누르면 0', '1 normally, 0 when pressed'], 'g', 2, { off: 4 });
      hl(S, 'bus', 19.4, 31.0, 9.0, 'accent', 4, { w: .1 }); lbl(S, 'busl', 19.4, 8.2, 'SDA', 'm a', 4);
      SV(S, 'i2c', [zR([21.2, 7.2], [21.2, 9.0], 'accent'), zT([21.2, 7.2]), zJ([21.2, 9.0]), zSw([24.6, 9.0], [24.6, 11.8], 'ink', 0), zGnd([24.6, 11.8]), zSw([28.6, 9.0], [28.6, 11.8], 'ink', 0), zGnd([28.6, 11.8]), zJ([24.6, 9.0]), zJ([28.6, 9.0])], 4);
      lblR(S, 'd1', 24.2, 10.1, 'MCU', 'm', 4); lblR(S, 'd2', 28.2, 10.1, ['센서', 'sensor'], 'm', 4); lbl(S, 'rp', 21.75, 7.6, '4.7 kΩ', 'm a', 4);
      axes(S, 'ax2', P, 4); spoly(S, 'rcl', (() => { const o = []; for (let i = 0; i <= 400; i++) { const t = 10 * i / 400; o.push([P.X(t), P.Y(rc(t))]); } return o; })(), { st: 4, color: 'accent', h: .1 });
      lbl(S, 'rcl2', 1, 6.7, ['I2C 선: 천천히 올라가고(RC) 빨리 내려가요', 'I2C line: slow RC rise, fast fall'], 'a', 4);
    },
    notes: [['아무 데도 연결되지 않은 입력 핀은 떠 있어서 주변 잡음에 따라 0과 1을 오락가락해요', 'an input pin connected to nothing floats, flipping between 0 and 1 with stray noise'], ['10 kΩ 풀업 저항을 3.3 V에 이으면 평소엔 1로 읽히고, 버튼이 핀을 접지로 당기면 0이 돼요', 'a 10 kΩ pull-up to 3.3 V makes it read 1 by default and 0 when a button pulls the pin to ground'], ['버튼을 누르면 저항으로 3.3/10k = 0.33 mA가 흘러요 · 저항이 작으면 전력을 낭비하고, 너무 크면 잡음에 약하고 느려져요', 'pressing the button draws 3.3/10k = 0.33 mA through the resistor; too small wastes power, too large is noise-prone and slow'], ['I2C는 오픈 드레인이라 장치들이 선을 0으로만 당기고 1은 풀업이 만들어요 · 4.7 kΩ과 200 pF면 올라가는 데 약 0.8 µs 걸려요', 'I2C is open-drain: devices only pull the line low and pull-ups create the 1; with 4.7 kΩ and 200 pF the rise takes about 0.8 µs']],
    fin: [['풀업·풀다운: 입력의 기본값을 저항으로 정해 줘요', 'pull-ups and pull-downs give an input a defined default through a resistor', 'cix-xs cix-a'], ['MCU 내부 풀업은 보통 30–50 kΩ이에요', 'internal MCU pull-ups are typically 30–50 kΩ'], ['I2C 속도가 높을수록 풀업을 작게 해요', 'faster I2C needs smaller pull-ups']],
    caps: [['떠 있는 입력', 'A floating input'], ['풀업 저항', 'The pull-up resistor'], ['저항값 고르기', 'Choosing the value'], ['오픈 드레인 버스', 'Open-drain buses'], ['풀업과 풀다운', 'Pull-ups and pull-downs']]
  });
}

function sDecap() {
  const P = PF(2.6, 7.2, 14.4, 5.0, 0, 10, 2.6, 3.45), Q = PF(20.6, 8.6, 10.6, 3.0, 0, 10, 0, 1.15), edges = [1, 3, 5, 7, 9];
  const spike = t => edges.reduce((a, e) => a + Math.exp(-Math.pow((t - e) / .09, 2)), 0);
  const dip = (A, ring) => t => 3.3 - edges.reduce((a, e) => a + (t >= e - .3 ? A * Math.exp(-Math.pow((t - e) / .12, 2)) + (ring && t > e ? A * .4 * Math.exp(-(t - e) * 3) * Math.sin(14 * (t - e)) : 0) : 0), 0);
  return CW('ci-decoupling', {
    code: [['# IC가 클럭마다 순간 전류를 당겨요', '# ICs pull bursts of current each clock'], ['dv = 10e-9 * 0.1 / 2e-9  # 배선 10 nH → 0.5 V', 'dv = 10e-9 * 0.1 / 2e-9  # 10 nH trace → 0.5 V'], ['# 핀 옆 100 nF: 가까운 전하 창고', '# 100 nF at the pin: a local charge store'], ['# + 10 µF 벌크: 느린 변화 담당', '# + 10 µF bulk for slower changes']],
    hl: [[0, 1], [1, 1, 'danger'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      rect(S, 'ic', 27.0, 1.0, 3.6, 4.2, 'accent', 12, 1, { r: .3 }); lbl(S, 'icl', 28.1, 2.7, 'IC', 's a', 1);
      SV(S, 'ckt', [zBat([19.6, 1.4], [19.6, 5.6]), zW([[19.6, 1.4], [21.8, 1.4]]), zL([21.8, 1.4], [24.6, 1.4], 'warn', 3), zW([[24.6, 1.4], [27.0, 1.4]]), zW([[19.6, 5.6], [26.0, 5.6], [26.0, 4.6], [27.0, 4.6]])], 1);
      lblR(S, 'lv', 19.0, 3.2, '3.3 V', 'm', 1); lbl(S, 'tr', 21.4, .2, ['긴 배선 10 nH', 'long trace 10 nH'], 'm w', 1); lbl(S, 'vcc', 27.2, 1.05, 'VCC', 'm', 1); lbl(S, 'gnd', 27.2, 3.85, 'GND', 'm', 1);
      axes(S, 'qa', Q, 1, { noy: 1 }); curve(S, 'sp', Q, spike, 1, { color: 'accent', n: 300 }); lbl(S, 'spl', 20.6, 7.7, ['IC 전류: 클럭마다 뾰족', 'IC current: a spike per clock'], 'a', 1);
      hl(S, 'bo', P.x0, P.x0 + P.w, P.Y(2.9), 'danger', 2, { w: .06, dash: 1 }); lbl(S, 'bol', P.x0, P.y0 + P.h + .2, ['빨간 점선: 리셋 경계 2.9 V', 'red dashes: 2.9 V brown-out limit'], 'r', 2);
      lbl(S, 'yl', 1, 6.5, ['IC 전원 핀 전압', 'voltage at the IC power pin'], 'm', 2);
      curve(S, 'nd', P, dip(.5, 1), 2, { color: 'danger', n: 500, off: 3 }); lbl(S, 'ndl', 9.6, 6.5, ['0.5 V씩 출렁', 'sags of 0.5 V'], 'r', 2, { off: 3 });
      SV(S, 'dc', [zJ([25.6, 1.4]), zC([25.6, 1.4], [25.6, 5.6], 'ok'), zJ([25.6, 5.6])], 3); lbl(S, 'dcl', 22.4, 3.2, '100 nF', 'm g', 3);
      curve(S, 'wd', P, dip(.03, 0), 3, { color: 'ok', n: 500, h: .11 }); lbl(S, 'wdl', 9.6, 6.5, ['100 nF: 출렁임 0.03 V', '100 nF: 0.03 V ripple'], 'g', 3);
      SV(S, 'bk', [zJ([20.8, 1.4]), zC([20.8, 1.4], [20.8, 5.6], 'accent'), zJ([20.8, 5.6])], 4); lbl(S, 'bkl', 19.4, 6.0, ['벌크 10 µF', 'bulk 10 µF'], 'm a', 4);
    },
    notes: [['디지털 IC는 클럭마다 수 ns 동안 큰 전류를 순간적으로 당겨요', 'digital ICs draw large bursts of current for a few nanoseconds on every clock edge'], ['전원까지의 배선은 작은 인덕터(약 10 nH)라 di/dt가 크면 전압이 출렁여요 · 100 mA를 2 ns에 당기면 0.5 V나 떨어져요', 'the wiring back to the supply acts as a small inductor of about 10 nH, so a fast di/dt makes the voltage sag: 100 mA in 2 ns drops 0.5 V'], ['전원 핀 바로 옆의 100 nF 세라믹 커패시터가 가까운 전하 창고가 되어 순간 전류를 대신 내줘요', 'a 100 nF ceramic capacitor right at the power pin acts as a nearby charge store, supplying the burst instead'], ['느린 부하 변화는 10 µF 같은 큰 벌크 커패시터가 맡아요 · 그래서 데이터시트마다 전원 핀당 100 nF를 권장해요', 'slower load changes are handled by a larger bulk capacitor such as 10 µF, which is why datasheets recommend 100 nF per power pin']],
    fin: [['디커플링: 전원 핀마다 100 nF를 가장 가깝게', 'decoupling: 100 nF as close as possible to every power pin', 'cix-xs cix-a'], ['비아와 긴 배선은 인덕턴스를 키워 효과를 떨어뜨려요', 'vias and long traces add inductance and weaken the effect'], ['리셋이 이상하게 걸리면 디커플링부터 의심해요', 'mysterious resets are a reason to check decoupling first']],
    caps: [['순간 전류', 'Current bursts'], ['배선 인덕턴스', 'Trace inductance'], ['100 nF 커패시터', 'The 100 nF capacitor'], ['벌크 커패시터', 'Bulk capacitors'], ['디커플링 커패시터', 'Decoupling capacitors']]
  });
}

function sLDO() {
  const k = 1.4, P = PF(20.8, 7.8, 10.2, 4.4, 0, 6, 0, 4);
  return CW('ci-ldo', {
    code: ['Vin, Vout, I = 5.0, 3.3, 0.5', ['P = (Vin - Vout) * I  # 0.85 W 열', 'P = (Vin - Vout) * I  # 0.85 W of heat'], 'eff = Vout / Vin      # 66 %', ['(12 - 3.3) * 0.5      # 12 V: 4.35 W 열', '(12 - 3.3) * 0.5      # 12 V: 4.35 W heat'], ['# 드롭아웃: Vin ≥ Vout + 0.3 V', '# dropout: needs Vin ≥ Vout + 0.3 V']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'accent']],
    draw: (S) => {
      frame(S, 'box', 22.6, 1.0, 4.4, 2.8, 'accent', 1, { w: .1, r: .3 }); lbl(S, 'boxl', 23.0, 1.05, 'LDO', 'm a', 1);
      SV(S, 'ckt', [zT([19.6, 2.6]), zW([[19.6, 2.6], [23.0, 2.6]]), zR([23.0, 2.6], [26.6, 2.6], 'warn'), zA([23.6, 3.5], [26.0, 1.7], 'warn', .06), zW([[26.6, 2.6], [30.0, 2.6]]), zT([30.0, 2.6]), zJ([21.0, 2.6]), zC([21.0, 2.6], [21.0, 5.4]), zJ([28.6, 2.6]), zC([28.6, 2.6], [28.6, 5.4]), zW([[24.8, 3.8], [24.8, 5.4]]), zW([[21.0, 5.4], [28.6, 5.4]]), zJ([24.8, 5.4]), zGnd([24.8, 5.4])], 1);
      lbl(S, 'vi', 19.2, 1.75, '5 V', 'm', 1, { off: 3 }); lbl(S, 'vi2', 19.2, 1.75, '12 V', 'm r', 3); lbl(S, 'vo', 29.4, 1.75, '3.3 V', 'm g', 1);
      lbl(S, 'how', 19.6, 6.4, ['통과 트랜지스터 = 자동으로 조절되는 저항', 'pass transistor = a self-adjusting resistor'], 'w', 1, { off: 4, w: 11.8 });
      lbl(S, 'tl', 1, 6.9, ['전력 흐름 (W)', 'power flow (W)'], 'm', 2);
      rect(S, 'a1', 2.0, 7.8, 1.65 * k, .8, 'ok', 65, 2, { r: .1 }); rect(S, 'a2', 2.0 + 1.65 * k, 7.8, .85 * k, .8, 'danger', 65, 2, { r: .1 });
      lbl(S, 'al', 2.0, 8.75, ['5 V 입력: 부하 1.65 W + 열 0.85 W → 66 %', '5 V in: 1.65 W to load + 0.85 W heat → 66 %'], 'g', 2);
      rect(S, 'b1', 2.0, 10.0, 1.65 * k, .8, 'ok', 65, 3, { r: .1 }); rect(S, 'b2', 2.0 + 1.65 * k, 10.0, 4.35 * k, .8, 'danger', 65, 3, { r: .1 });
      lbl(S, 'bl', 2.0, 10.95, ['12 V 입력: 열 4.35 W → 27.5 %', '12 V in: 4.35 W of heat → 27.5 %'], 'r', 3);
      axes(S, 'ax', P, 4); curve(S, 'do', P, v => Math.min(3.3, Math.max(0, v - .3)), 4, { color: 'accent', n: 120 });
      ticks(S, 'tk', P, [[3.6, '3.6'], [5, '5 V']], [[3.3, '3.3']], 4); lbl(S, 'dol', 21.2, 7.1, ['Vin이 3.6 V 아래면 출력도 떨어져요', 'below 3.6 V in, the output sags too'], 'a', 4);
    },
    notes: [['선형 레귤레이터는 입력과 출력 사이의 트랜지스터를 가변 저항처럼 조절해 출력을 일정하게 지켜요', 'a linear regulator adjusts a pass transistor like a variable resistor between input and output to hold the output steady'], ['남는 전압은 모두 열이 돼요 · 5 V에서 3.3 V, 0.5 A면 (5 − 3.3) × 0.5 = 0.85 W를 태우고 효율은 66%예요', 'all the excess voltage becomes heat: 5 V down to 3.3 V at 0.5 A burns (5 − 3.3) × 0.5 = 0.85 W, for 66% efficiency'], ['12 V에서 같은 일을 하면 4.35 W가 열이 되고 효율은 27.5% · 방열판 없이는 손을 델 만큼 뜨거워져요', 'doing the same from 12 V turns 4.35 W into heat at 27.5% efficiency, hot enough to burn a finger without a heatsink'], ['입력이 출력 + 드롭아웃 전압(LDO는 약 0.3 V)보다 낮아지면 출력을 지킬 수 없어요 · 대신 잡음이 적고 부품이 간단해요', 'once the input falls below the output plus the dropout, about 0.3 V for an LDO, regulation is lost; in exchange it is quiet and simple']],
    fin: [['선형 레귤레이터: 열 = (Vin − Vout) × I, 효율 ≈ Vout/Vin', 'linear regulator: heat = (Vin − Vout) × I, efficiency ≈ Vout/Vin', 'cix-xs cix-a'], ['전압 차와 전류가 작을 때 알맞아요', 'best when the voltage gap and current are small'], ['아날로그·RF처럼 잡음에 민감한 회로에 써요', 'used where noise matters, as in analog and RF circuits']],
    caps: [['동작 원리', 'How it works'], ['열과 효율', 'Heat and efficiency'], ['큰 전압 차', 'A large voltage gap'], ['드롭아웃', 'Dropout'], ['선형 레귤레이터(LDO)', 'Linear regulators (LDOs)']]
  });
}

function sBuck() {
  const P1 = PF(2.4, 7.4, 14.6, 2.8, 0, 3, 0, 13), P2 = PF(2.4, 11.3, 14.6, 2.2, 0, 3, .33, .67), D = .275;
  const swp = []; for (let k = 0; k < 3; k++) swp.push([P1.X(k), P1.Y(0)], [P1.X(k), P1.Y(12)], [P1.X(k + D), P1.Y(12)], [P1.X(k + D), P1.Y(0)], [P1.X(k + 1), P1.Y(0)]);
  const il = t => { const m = t % 1; return m < D ? .39 + .22 * m / D : .61 - .22 * (m - D) / (1 - D); };
  return CW('ci-buck', {
    code: ['Vin, Vout = 12.0, 3.3', ['D = Vout / Vin                   # 듀티 27.5 %', 'D = Vout / Vin                   # duty 27.5 %'], 'dI = (Vin - Vout) * D / (L * f)  # 0.22 A', ['# 효율 ~90 %: 열 0.18 W (LDO 4.35 W)', '# ~90 %: 0.18 W heat (LDO: 4.35 W)'], ['# 대가: 스위칭 잡음, 부품 수', '# the cost: switching noise, more parts']],
    hl: [[0, 1], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'accent']],
    draw: (S) => {
      SV(S, 'ckt', [zBat([19.4, 1.6], [19.4, 5.6]), zSw([19.4, 1.6], [22.6, 1.6], 'warn', 1), zW([[22.6, 1.6], [23.0, 1.6]]), zJ([23.0, 1.6]), zD([23.0, 5.6], [23.0, 1.6]), zL([23.0, 1.6], [27.0, 1.6], 'accent'), zW([[27.0, 1.6], [29.6, 1.6]]), zJ([27.6, 1.6]), zC([27.6, 1.6], [27.6, 5.6]), zR([29.6, 1.6], [29.6, 5.6]), zW([[19.4, 5.6], [29.6, 5.6]]), zJ([23.0, 5.6]), zJ([27.6, 5.6])], 1);
      lblR(S, 'lv', 18.85, 3.3, '12 V', 'm', 1); lbl(S, 'sw', 20.0, .55, ['스위치', 'switch'], 'm w', 1); lbl(S, 'swn', 23.25, 2.0, 'SW', 'm', 1); lbl(S, 'll', 24.2, .55, 'L 22 µH', 'm a', 1);
      lbl(S, 'vo', 27.9, .85, '3.3 V', 'm g', 1); lbl(S, 'f', 19.6, 6.4, ['500 kHz로 켜고 끄기', 'switching at 500 kHz'], 'w', 1);
      axes(S, 'a1', P1, 2); spoly(S, 'swv', swp, { st: 2, color: 'warn', h: .08 }); lbl(S, 'l1', 1, 6.75, ['스위치 노드: 0 ↔ 12 V, 듀티 27.5 %', 'switch node: 0 ↔ 12 V, 27.5 % duty'], 'w', 2);
      hl(S, 'avg', P1.x0, P1.x0 + P1.w, P1.Y(3.3), 'ok', 2, { w: .06, dash: 1 }); lbl(S, 'avgl', P1.X(2.33), P1.Y(3.3) - .62, ['평균 3.3 V', 'avg 3.3 V'], 'g', 2);
      curve(S, 'il', P2, il, 3, { color: 'accent', n: 300 }); hl(S, 'i5', P2.x0, P2.x0 + P2.w, P2.Y(.5), 'ink-3', 3, { w: .05, dash: 1 });
      lbl(S, 'l2', 1, 10.6, ['인덕터 전류: 0.5 A ± 0.11 A 톱니', 'inductor current: a 0.5 A ± 0.11 A sawtooth'], 'a', 3);
      rect(S, 'h1', 20.0, 8.6, 4.35 * 2.2, .8, 'danger', 65, 4, { r: .1 }); lbl(S, 'h1l', 20.2, 8.65, ['LDO 열 4.35 W', 'LDO heat 4.35 W'], 'm', 4);
      rect(S, 'h2', 20.0, 10.0, .18 * 2.2, .8, 'ok', 65, 4, { r: .1 }); lbl(S, 'h2l', 20.7, 10.05, ['벅 열 0.18 W', 'buck heat 0.18 W'], 'm g', 4);
    },
    notes: [['벅 컨버터는 스위치를 아주 빠르게 켜고 끄며 인덕터로 에너지를 옮겨요 · 저항으로 태우지 않아서 효율이 높아요', 'a buck converter switches very fast and moves energy through an inductor instead of burning it in a resistance, so it is efficient'], ['스위치 노드는 0 V와 12 V를 오가는 사각파예요 · 켜진 비율(듀티) D = Vout/Vin = 27.5%면 평균이 3.3 V예요', 'the switch node is a square wave between 0 and 12 V, and a duty cycle D = Vout/Vin = 27.5% averages it to 3.3 V'], ['인덕터와 커패시터가 사각파를 평균 내요 · 인덕터 전류는 0.5 A를 중심으로 약 0.22 A 폭의 톱니처럼 오르내려요', 'the inductor and capacitor average the square wave, with the inductor current sawing through about 0.22 A around 0.5 A'], ['같은 12 V → 3.3 V, 0.5 A에서 열이 0.18 W뿐이에요(LDO는 4.35 W) · 대신 스위칭 잡음과 부품 수를 감수해요', 'for the same 12 V to 3.3 V at 0.5 A it wastes only 0.18 W versus 4.35 W for an LDO, at the cost of switching noise and more parts']],
    fin: [['벅 컨버터: 듀티 D = Vout/Vin, 효율 85–95%', 'buck converter: duty D = Vout/Vin, efficiency 85–95%', 'cix-xs cix-a'], ['전압을 높일 때는 부스트 컨버터를 써요', 'raising the voltage takes a boost converter'], ['잡음에 민감한 회로는 벅 뒤에 LDO를 둬요', 'noise-sensitive circuits follow the buck with an LDO']],
    caps: [['스위칭 원리', 'The switching idea'], ['듀티와 평균', 'Duty and average'], ['인덕터 전류', 'Inductor current'], ['효율 비교', 'Efficiency compared'], ['스위칭 레귤레이터(벅)', 'Switching regulators (buck)']]
  });
}

function sHB() {
  const xl = 21.6, xr = 28.8, top = 1.3, bot = 9.4, my = 5.2, P1 = PF(2.4, 8.0, 14.6, 2.2, 0, 5, 0, 13), P2 = PF(2.4, 11.2, 14.6, 2.0, 0, 5, 0, 1.1);
  const sws = on => [zSw([xl, top], [xl, 4.6], on[0] ? (on[4] || 'accent') : 'ink-3', on[0]), zSw([xl, 5.8], [xl, bot], on[1] ? (on[4] || 'accent') : 'ink-3', on[1]), zSw([xr, top], [xr, 4.6], on[2] ? (on[4] || 'accent') : 'ink-3', on[2]), zSw([xr, 5.8], [xr, bot], on[3] ? (on[4] || 'accent') : 'ink-3', on[3])];
  const pwm = []; for (let k = 0; k < 5; k++) pwm.push([P1.X(k), P1.Y(0)], [P1.X(k), P1.Y(12)], [P1.X(k + .6), P1.Y(12)], [P1.X(k + .6), P1.Y(0)], [P1.X(k + 1), P1.Y(0)]);
  return CW('ci-hbridge', {
    code: [['# Q1·Q4 켜기 → 정방향', '# Q1 + Q4 on → forward'], ['# Q3·Q2 켜기 → 역방향', '# Q3 + Q2 on → reverse'], ['# Q1·Q2 동시 → 전원 단락!', '# Q1 + Q2 together → shoot-through!'], ['# PWM 듀티 60 % → 평균 60 % 전압', '# PWM at 60 % → 60 % average voltage'], ['# Q2·Q4 켜기 → 단자 단락 = 브레이크', '# Q2 + Q4 on → shorted motor = brake']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'danger'], [3, 2, 'ok']],
    draw: (S) => {
      SV(S, 'base', [zW([[xl, top], [xr, top]]), zW([[xl, bot], [xr, bot]]), zW([[xl, 4.6], [xl, 5.8]]), zW([[xr, 4.6], [xr, 5.8]]), zJ([xl, my]), zJ([xr, my]), zW([[xl, my], [24.5, my]]), zO([25.2, my], .7), zW([[25.9, my], [xr, my]]), zJ([25.2, top]), zT([25.2, .5]), zW([[25.2, .5], [25.2, top]]), zGnd([25.2, bot])], 1);
      T(S, 'm', 24.5, my - .45, 'M', 'cz-tc cix-s', 1, { w: 1.4 }); lbl(S, 'v', 25.6, .05, '+12 V', 'm', 1);
      lblR(S, 'q1', xl - .35, 2.5, 'Q1', 'm', 1); lblR(S, 'q2', xl - .35, 7.3, 'Q2', 'm', 1); lbl(S, 'q3', xr + .9, 2.5, 'Q3', 'm', 1); lbl(S, 'q4', xr + .9, 7.3, 'Q4', 'm', 1);
      SV(S, 's1', sws([1, 0, 0, 1]), 1, { off: 2 }); SV(S, 's2', sws([0, 1, 1, 0, 'warn']), 2, { off: 3 }); SV(S, 's3', sws([1, 1, 0, 0, 'danger']), 3, { off: 4 }); SV(S, 's4', sws([1, 0, 0, 1, 'ok']), 4);
      SV(S, 'p1', [zA([22.6, my - .5], [24.2, my - .5], 'accent', .08), zA([26.2, my - .5], [27.8, my - .5], 'accent', .08)], 1, { off: 2 }); lbl(S, 'p1l', 23.0, 6.3, ['정방향 ↻', 'forward ↻'], 'a', 1, { off: 2 });
      SV(S, 'p2', [zA([27.8, my - .5], [26.2, my - .5], 'warn', .08), zA([24.2, my - .5], [22.6, my - .5], 'warn', .08)], 2, { off: 3 }); lbl(S, 'p2l', 23.0, 6.3, ['역방향 ↺', 'reverse ↺'], 'w', 2, { off: 3 });
      SV(S, 'p3', [zA([xl + .5, 1.6], [xl + .5, 8.8], 'danger', .1)], 3, { off: 4 }); lbl(S, 'p3l', 22.4, 6.3, ['단락! 순식간에 타요', 'short! burns instantly'], 'r', 3, { off: 4 });
      lbl(S, 'dt', 1, 7.1, ['전환 사이에 데드 타임을 둬요', 'leave a dead time between switches'], 'r', 3, { off: 4 });
      axes(S, 'a1', P1, 4); spoly(S, 'pw', pwm, { st: 4, color: 'ok', h: .08 }); lbl(S, 'pwl', 1, 7.1, ['Q1 PWM 60 %', 'Q1 PWM 60 %'], 'g', 4);
      curve(S, 'mi', P2, t => .6 + .05 * Math.sin(2 * Math.PI * t), 4, { color: 'accent', n: 120 }); lbl(S, 'mil', 1, 10.5, ['모터 전류: 평균 60 %로 매끄럽게', 'motor current: a smooth 60 % average'], 'a', 4);
    },
    notes: [['H 브리지는 모터 양쪽에 스위치 두 쌍을 둔 회로예요 · 대각선 Q1과 Q4를 켜면 전류가 왼쪽에서 오른쪽으로 흘러 정방향으로 돌아요', 'an H-bridge puts two pairs of switches around a motor; closing diagonal Q1 and Q4 sends current left to right and spins it forward'], ['반대 대각선 Q3와 Q2를 켜면 전류 방향이 바뀌어 역방향으로 돌아요', 'closing the other diagonal, Q3 and Q2, reverses the current and the rotation'], ['같은 쪽 Q1과 Q2가 동시에 켜지면 전원이 그대로 단락돼 순식간에 타요 · 그래서 전환 사이에 데드 타임을 둬요', 'if Q1 and Q2 on the same side are on together, the supply is shorted and parts burn instantly, so switching includes a dead time'], ['PWM으로 켜는 비율을 바꾸면 평균 전압이 바뀌어 속도를 조절해요 · 아래쪽 Q2와 Q4를 함께 켜면 단자가 단락되어 브레이크가 걸려요', 'PWM changes the on-time ratio, the average voltage and so the speed, while closing both low sides Q2 and Q4 shorts the terminals as a brake']],
    fin: [['H 브리지: 대각선 스위치 쌍으로 방향을, PWM으로 속도를', 'H-bridge: diagonal switch pairs set direction, PWM sets speed', 'cix-xs cix-a'], ['DRV8833, L298 같은 드라이버 IC에 다 들어 있어요', 'driver ICs such as the DRV8833 or L298 integrate it all'], ['스위치마다 코일 전류가 돌 다이오드 경로가 필요해요', 'each switch needs a diode path for the coil current']],
    caps: [['정방향', 'Forward'], ['역방향', 'Reverse'], ['단락 주의', 'Shoot-through'], ['PWM 속도 조절', 'PWM speed control'], ['H 브리지 모터 구동', 'H-bridge motor drive']]
  });
}

function sLevels() {
  const Y = v => 11.0 - v * 1.8, ca = 20.2, cb = 26.6, w = 3.4;
  const band = (k, x, a, b, c, pct, st) => rect(S0, k, x, Y(b), w, Y(a) - Y(b), c, pct, st, { r: 0 });
  let S0;
  return CW('ci-levels', {
    code: [['# 5 V CMOS 입력: 1 ≥ 3.5 V, 0 ≤ 1.5 V', '# 5 V CMOS input: 1 ≥ 3.5 V, 0 ≤ 1.5 V'], ['# 3.3 V 출력 3.3 V → 5 V 입력엔 애매', '# a 3.3 V high is marginal for 5 V in'], '5.0 * 2e3 / (1e3 + 2e3)  # 3.33 V', ['# 양방향(I2C): MOSFET 레벨 시프터', '# bidirectional (I2C): MOSFET shifter']],
    hl: [[0, 1], [1, 1, 'danger'], [2, 1, 'ok'], [3, 1, 'accent']],
    draw: (S) => {
      S0 = S;
      band('a0', ca, 0, 1.5, 'ok', 30, 1); band('a1', ca, 1.5, 3.5, 'warn', 22, 1); band('a2', ca, 3.5, 5, 'accent', 30, 1);
      band('b0', cb, 0, .8, 'ok', 30, 1); band('b1', cb, .8, 2.0, 'warn', 22, 1); band('b2', cb, 2.0, 3.3, 'accent', 30, 1);
      lbl(S, 'ha', ca, .3, ['5 V CMOS 입력', '5 V CMOS input'], 'm', 1); lbl(S, 'hb', cb, .3, ['3.3 V 입력', '3.3 V input'], 'm', 1);
      [[ca, 4.25, ['1', '1']], [ca, 2.5, ['?', '?']], [ca, .75, ['0', '0']], [cb, 2.65, ['1', '1']], [cb, 1.4, ['?', '?']], [cb, .4, ['0', '0']]].forEach(([x, v, t], i) => T(S, 'bt' + i, x, Y(v) - .35, t, 'cz-tc cix-s', 1, { w }));
      [[ca, 3.5, '3.5'], [ca, 1.5, '1.5'], [cb, 2.0, '2.0'], [cb, .8, '0.8']].forEach(([x, v, t], i) => T(S, 'bv' + i, x + w + .1, Y(v) - .3, t, 'cz-mono cix-tiny', 1, { w: 1.4 }));
      hl(S, 'm1', ca - .4, ca + w + .4, Y(3.3), 'danger', 2, { w: .12 }); lbl(S, 'm1l', 1, 6.4, ['3.3 V 출력 → 5 V 입력: 3.3 V는 "?" 구간', '3.3 V out → 5 V in: 3.3 V lands in "?"'], 'r', 2);
      lbl(S, 'm1n', 1, 7.6, ['VIH 2.0 V인 TTL 호환(HCT) 입력이면 OK', 'fine for TTL-compatible (HCT) inputs, VIH 2.0 V'], '', 2);
      hl(S, 'mx', cb - .4, cb + w + .4, Y(3.6), 'danger', 3, { w: .06, dash: 1 }); lbl(S, 'mxl', cb, Y(3.6) - .62, ['최대 3.6 V', 'abs max 3.6 V'], 'm r', 3);
      hl(S, 'm2', cb - .4, cb + w + .4, Y(5), 'danger', 3, { w: .12, off: 4 }); lbl(S, 'm2l', cb + .2, Y(5) - .62, ['5 V 입력 ✗', '5 V in ✗'], 'm r', 3, { off: 4 });
      hl(S, 'm3', cb - .4, cb + w + .4, Y(3.33), 'ok', 3, { w: .12 }); lbl(S, 'm3l', 1, 8.8, ['5 V → 1 kΩ/2 kΩ 분배기 → 3.33 V ✓', '5 V → 1 kΩ/2 kΩ divider → 3.33 V ✓'], 'g', 3);
      SV(S, 'shift', [zW([[1.6, 13.8], [9.8, 13.8]]), zNmos(8.6, 12.8, 'accent'), zW([[9.8, 11.8], [16.4, 11.8]]), zW([[8.6, 12.8], [7.0, 12.8], [7.0, 11.2]]), zR([4.0, 11.2], [4.0, 13.8]), zJ([4.0, 13.8]), zW([[2.6, 11.2], [7.6, 11.2]]), zJ([7.0, 11.2]), zR([13.0, 11.8], [13.0, 9.2]), zJ([13.0, 11.8]), zW([[11.6, 9.2], [15.6, 9.2]])], 4, { box: [0, 6, 18, 9] });
      lbl(S, 's33', 2.6, 10.6, '3.3 V', 'm', 4); lbl(S, 's5', 13.4, 8.6, '5 V', 'm', 4); lbl(S, 'sa', 1.6, 14.1, 'SDA 3.3 V', 'm a', 4); lbl(S, 'sb', 13.6, 12.1, 'SDA 5 V', 'm a', 4); lbl(S, 'bss', 10.3, 12.8, 'BSS138', 'm', 4);
    },
    notes: [['디지털 입력은 일정 전압 이상을 1(VIH), 이하를 0(VIL)으로 읽고 그 사이는 보장하지 않아요 · 5 V CMOS는 3.5 V 이상이 1이에요', 'digital inputs read above VIH as 1 and below VIL as 0, with no guarantee in between; for 5 V CMOS a 1 needs at least 3.5 V'], ['3.3 V 칩의 high 출력 3.3 V는 5 V CMOS 입력이 원하는 3.5 V에 못 미쳐 애매한 구간에 들어가요 · VIH가 2.0 V인 TTL 호환 입력이면 괜찮아요', 'a 3.3 V chip’s high output of 3.3 V falls short of the 3.5 V a 5 V CMOS input needs, landing in the undefined zone, though TTL-compatible inputs with VIH of 2.0 V are fine'], ['반대로 5 V 출력을 3.3 V 입력에 넣으면 최대 정격(보통 3.6 V)을 넘어 망가질 수 있어요 · 1 kΩ/2 kΩ 분배기로 3.33 V로 낮춰요', 'going the other way, a 5 V output can exceed a 3.3 V input’s absolute maximum (often 3.6 V) and damage it; a 1 kΩ/2 kΩ divider brings it to 3.33 V'], ['I2C처럼 양방향인 선은 MOSFET 하나와 풀업 두 개로 만든 레벨 시프터를 써요 · 어느 쪽에서 0으로 당겨도 반대쪽이 따라가요', 'bidirectional lines such as I2C use a level shifter made from one MOSFET and two pull-ups, so a low on either side carries across']],
    fin: [['논리 레벨: 출력의 VOH/VOL이 입력의 VIH/VIL을 만족해야 해요', 'logic levels: an output’s VOH/VOL must satisfy the input’s VIH/VIL', 'cix-xs cix-a'], ['데이터시트에서 5 V tolerant 핀인지 확인해요', 'check datasheets for 5 V tolerant pins'], ['저항 분배기는 빠른 신호에서 엣지가 무뎌져요', 'resistor dividers soften edges on fast signals']],
    caps: [['입력 문턱', 'Input thresholds'], ['3.3 V → 5 V', '3.3 V into 5 V'], ['5 V → 3.3 V', '5 V into 3.3 V'], ['양방향 변환', 'Bidirectional shifting'], ['논리 레벨과 레벨 변환', 'Logic levels and level shifting']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('ci-dc', '직류 회로', 'DC circuits', '전압·전류·저항의 기본 규칙', 'The basic rules of voltage, current and resistance', '옴의 법칙과 전력, 키르히호프의 두 법칙, 전압 분배기와 부하 효과, 노드 해석, 그리고 테브난 등가와 최대 전력 전달까지 모든 회로 해석의 바탕이 되는 직류 회로부터 봐요.', 'Ohm’s law and power, Kirchhoff’s two laws, voltage dividers and loading, nodal analysis, and Thevenin equivalents with maximum power transfer: the DC foundations of every circuit analysis.', [
    item('ci-ohm', '옴의 법칙', 'Ohm’s law',
      '전압 = 전류 × 저항이에요. 9 V 전지에 450 Ω을 이으면 20 mA가 흐르고, 저항이 일정하면 전류는 전압에 비례해요.',
      '전압(V)은 전하를 미는 압력, 전류(A)는 1초에 지나가는 전하의 양, 저항(Ω)은 흐름을 방해하는 정도예요. 옴의 법칙 V = I·R은 셋 중 두 값을 알면 나머지를 구하게 해 줘요. 9 V 전지에 450 Ω 저항을 이으면 I = 9/450 = 20 mA가 흐르고, 직렬 회로라면 어디서 재도 같은 전류예요. 저항이 일정하면 V-I 그래프는 원점을 지나는 직선이고 기울기는 1/R이라, 저항을 반으로 줄이면 같은 전압에서 전류가 두 배가 돼요. 1 kΩ에 1 V면 1 mA라는 조합을 기억해 두면 회로 대부분을 암산할 수 있어요.',
      'Voltage equals current times resistance: 9 V across 450 Ω drives 20 mA, and with fixed resistance current is proportional to voltage.',
      'Voltage (V) is the push on charge, current (A) the charge passing per second, and resistance (Ω) the opposition to flow. Ohm’s law V = I·R gives the third value from any two. A 450 Ω resistor on a 9 V battery carries I = 9/450 = 20 mA, the same everywhere around a series loop. With fixed resistance the V–I graph is a straight line through the origin with slope 1/R, so halving the resistance doubles the current at the same voltage. Remembering that 1 V across 1 kΩ gives 1 mA lets you work most circuits in your head.', sOhm()),
    item('ci-power', '전력과 에너지', 'Power and energy',
      '전력은 1초에 쓰는 에너지로 P = V·I = I²R = V²/R이에요. 저항은 값뿐 아니라 정격 전력도 맞춰 골라야 해요.',
      '전력 P = V·I는 1초 동안 쓰는 에너지(와트)이고, 옴의 법칙을 넣으면 I²R이나 V²/R로도 계산해요. 5 V에 220 Ω을 이으면 0.11 W가 열이 되어 흔한 1/4 W 저항으로 충분하지만, 12 V에 100 Ω이면 1.44 W라서 같은 저항은 타 버려요. 그래서 부품은 정격의 절반 이하로 쓰는 게 안전해요. 에너지는 전력 × 시간이라, 3.7 V 3000 mAh 배터리는 11.1 Wh를 담고 0.5 W 기기를 약 22시간 돌려요. 전기 요금의 kWh도 같은 에너지 단위예요.',
      'Power is energy per second, P = V·I = I²R = V²/R; choose resistors by power rating as well as value.',
      'Power P = V·I is the energy used per second, in watts, and with Ohm’s law it can be computed as I²R or V²/R. A 220 Ω resistor on 5 V turns 0.11 W into heat, fine for a common 1/4 W part, but 100 Ω on 12 V dissipates 1.44 W and burns the same resistor. That is why parts are best run below half their rating. Energy is power times time, so a 3.7 V, 3000 mAh battery holds 11.1 Wh and runs a 0.5 W device for about 22 hours. The kWh on an electricity bill is the same kind of unit.', sPower()),
    item('ci-kirchhoff', '키르히호프 법칙', 'Kirchhoff’s laws',
      'KCL: 노드로 들어온 전류는 모두 나가요. KVL: 닫힌 고리를 한 바퀴 돌며 전압을 더하면 0이에요.',
      '키르히호프 전류 법칙(KCL)은 한 노드로 들어온 전류의 합이 나간 전류의 합과 같다는 거예요. 전하는 노드에 쌓이거나 사라지지 않으니, 3 mA가 들어와 두 갈래로 나뉘면 1 mA와 2 mA처럼 합이 3 mA예요. 키르히호프 전압 법칙(KVL)은 닫힌 고리를 따라 전압을 더하면 0이라는 거예요. 12 V 전지에 1 kΩ과 2 kΩ을 직렬로 이으면 4 mA가 흐르고 각각 4 V와 8 V가 떨어져 +12 − 4 − 8 = 0이 돼요. 두 법칙은 전하 보존과 에너지 보존을 회로의 말로 쓴 것이고, 회로 시뮬레이터도 결국 이 식들을 풀어요.',
      'KCL: all current entering a node leaves it. KVL: voltages around any closed loop sum to zero.',
      'Kirchhoff’s current law (KCL) states that the currents entering a node equal those leaving it. Charge neither piles up nor disappears, so 3 mA splitting into two branches might become 1 mA and 2 mA, still totaling 3 mA. Kirchhoff’s voltage law (KVL) states that voltages around a closed loop sum to zero. With 1 kΩ and 2 kΩ in series on a 12 V battery, 4 mA flows and the drops are 4 V and 8 V, so +12 − 4 − 8 = 0. The two laws restate conservation of charge and energy in circuit terms, and circuit simulators ultimately solve these equations.', sKirch()),
    item('ci-divider', '전압 분배기', 'Voltage dividers',
      '직렬 저항 두 개로 전압을 나눠요: Vout = Vin·R2/(R1 + R2). 출력에 부하를 달면 병렬이 되어 값이 떨어져요.',
      '직렬 저항에는 같은 전류가 흐르니 전압은 저항 크기에 비례해 나눠지고, 아래쪽 저항 양단 전압은 Vout = Vin·R2/(R1 + R2)예요. 같은 10 kΩ 두 개면 5 V가 2.5 V가 되고, 12 V 배터리를 3.3 V ADC로 재려면 27 kΩ과 10 kΩ으로 3.24 V까지 낮출 수 있어요. 하지만 출력에 10 kΩ 부하를 달면 R2와 병렬로 5 kΩ이 되어 출력이 1.67 V로 떨어지는 부하 효과가 생겨요. 분배기 저항을 부하보다 훨씬 작게 하거나 op-amp 버퍼를 두어 해결해요. 가변 저항(포텐셔미터)과 많은 센서 회로가 이 분배기 구조예요.',
      'Two series resistors divide a voltage, Vout = Vin·R2/(R1 + R2); a load on the output sits in parallel and pulls the value down.',
      'Series resistors carry the same current, so the voltage divides in proportion to resistance and the lower resistor sees Vout = Vin·R2/(R1 + R2). Two equal 10 kΩ resistors turn 5 V into 2.5 V, and 27 kΩ over 10 kΩ scales a 12 V battery down to 3.24 V for a 3.3 V ADC. Attach a 10 kΩ load to the output, however, and it sits in parallel with R2 to make 5 kΩ, dropping the output to 1.67 V: the loading effect. The fix is divider resistors much smaller than the load, or an op-amp buffer. Potentiometers and many sensor circuits are dividers at heart.', sDivider()),
    item('ci-nodal', '노드 해석', 'Nodal analysis',
      '접지를 정하고 노드 전압을 미지수로 KCL을 세우면 연립방정식 G·v = b가 돼요. 회로 시뮬레이터가 쓰는 방법이에요.',
      '노드 해석은 기준 노드(접지)를 하나 정하고 나머지 노드의 전압을 미지수로 둬요. 각 미지 노드에서 KCL을 쓰되, 저항으로 나가는 전류를 (노드 전압 − 이웃 전압)/R로 적어 합을 0으로 놓아요. 12 V와 6 V 전원 사이에 1 kΩ, 2 kΩ, 2 kΩ이 연결된 예에서는 (VA − 12)/1k + VA/2k + (VA − 6)/2k = 0을 풀면 VA = 7.5 V가 나오고, 전류도 4.5 mA, 3.75 mA, 0.75 mA로 바로 정해져요. 노드가 많아지면 컨덕턴스 행렬 G로 G·v = b를 세워 선형대수로 풀고, SPICE 같은 시뮬레이터가 바로 이 방식(수정 노드 해석)을 써요.',
      'Pick ground, write KCL with node voltages as unknowns, and solve the linear system G·v = b, the method circuit simulators use.',
      'Nodal analysis chooses one reference node (ground) and treats the other node voltages as unknowns. At each unknown node you write KCL, expressing each resistor’s outgoing current as (node voltage − neighbor voltage)/R and setting the sum to zero. With 1 kΩ, 2 kΩ and 2 kΩ between 12 V and 6 V sources, solving (VA − 12)/1k + VA/2k + (VA − 6)/2k = 0 gives VA = 7.5 V, and the currents follow at once as 4.5 mA, 3.75 mA and 0.75 mA. With many nodes the equations become a conductance matrix system G·v = b solved with linear algebra, which is exactly what simulators such as SPICE do (modified nodal analysis).', sNodal()),
    item('ci-thevenin', '테브난 등가와 최대 전력', 'Thevenin equivalents and maximum power',
      '두 단자에서 본 회로는 전압원 Vth와 직렬 저항 Rth 하나로 바꿀 수 있어요. 부하가 Rth와 같을 때 전력이 최대예요.',
      '선형 회로를 두 단자에서 바라보면 전압원 하나와 직렬 저항 하나로 바꿀 수 있어요. Vth는 단자를 열어 둔 채 잰 전압이고, Rth는 독립 전압원을 단락(전류원은 개방)시키고 단자에서 본 저항이에요. 12 V를 6 kΩ과 3 kΩ으로 나눈 회로는 Vth = 4 V, Rth = 6k ∥ 3k = 2 kΩ이라 \'4 V 뒤의 2 kΩ\'과 똑같이 행동해요. 부하 RL에 가는 전력은 RL = Rth일 때 Vth²/(4Rth) = 2 mW로 최대이고, 이를 최대 전력 전달 정리라고 해요. 배터리의 내부 저항이나 오디오 출력 임피던스도 이 모델로 설명해요.',
      'Seen from two terminals, a circuit reduces to a source Vth behind a resistor Rth; the load gets maximum power when it equals Rth.',
      'Any linear circuit viewed from two terminals can be replaced by one voltage source and one series resistor. Vth is the voltage across the open terminals, and Rth is the resistance seen from them with independent voltage sources shorted (current sources opened). A divider of 6 kΩ and 3 kΩ on 12 V has Vth = 4 V and Rth = 6k ∥ 3k = 2 kΩ, so it behaves exactly like 4 V behind 2 kΩ. The power delivered to a load RL peaks at Vth²/(4Rth) = 2 mW when RL = Rth, the maximum power transfer theorem. Battery internal resistance and audio output impedance are described with the same model.', sThev())
  ]),
  sec('ci-transient', '커패시터·인덕터와 과도 응답', 'Capacitors, inductors and transients', '시간이 걸리는 부품들', 'Parts that take time', '전하를 담는 커패시터와 자기장에 에너지를 담는 인덕터, RC 충방전과 시정수, RL 회로의 전류 상승, 그리고 RLC 회로의 감쇠와 진동까지 시간에 따라 변하는 회로를 봐요.', 'Capacitors that store charge and inductors that store energy in a magnetic field, RC charging and time constants, current build-up in RL circuits, and damping and ringing in RLC circuits: circuits that change with time.', [
    item('ci-capacitor', '커패시터', 'Capacitors',
      '절연체를 사이에 둔 두 판에 전하를 담아요. Q = CV, i = C·dv/dt라서 전압은 순간적으로 바뀌지 못하고, 직류는 막고 교류는 통과시켜요.',
      '커패시터는 얇은 절연체(유전체)를 사이에 둔 두 금속판이에요. 전압을 걸면 한쪽 판에 +, 다른 쪽에 − 전하가 Q = C·V만큼 쌓이고, 에너지 ½CV²를 저장해요. 100 µF에 5 V면 0.5 mC와 1.25 mJ예요. 전류와 전압은 i = C·dv/dt로 이어져서 1 mA로 일정하게 채우면 전압이 초당 10 V씩 직선으로 오르고, 전압은 계단처럼 순간적으로 바뀔 수 없어요. 교류에서는 임피던스가 1/(2πfC)라 주파수가 높을수록 잘 통과하고 직류는 막아요. 세라믹은 작고 빠르며, 전해 커패시터는 용량이 크지만 극성이 있어 거꾸로 달면 안 돼요.',
      'Two plates separated by an insulator hold charge; with Q = CV and i = C·dv/dt its voltage cannot jump, and it blocks DC while passing AC.',
      'A capacitor is two metal plates separated by a thin insulator (the dielectric). Applying a voltage stores charge Q = C·V, positive on one plate and negative on the other, along with energy ½CV²: 0.5 mC and 1.25 mJ for 100 µF at 5 V. Current and voltage are linked by i = C·dv/dt, so a steady 1 mA charges it at 10 V per second in a straight line, and its voltage can never jump instantly. In AC circuits its impedance is 1/(2πfC), passing high frequencies more easily and blocking DC. Ceramics are small and fast, while electrolytics hold more but are polarized and must not be reversed.', sCap()),
    item('ci-inductor', '인덕터와 플라이백 다이오드', 'Inductors and flyback diodes',
      '코일은 자기장에 에너지를 담고 전류 변화에 맞서요. v = L·di/dt라 갑자기 끊으면 큰 전압이 튀고, 다이오드로 전류가 돌 길을 만들어요.',
      '인덕터는 감은 코일이에요. 전류가 흐르면 자기장에 ½LI²의 에너지를 저장하고, 전류가 바뀌려 하면 v = L·di/dt의 전압을 만들어 그 변화를 막아요. 그래서 전류는 순간적으로 바뀔 수 없어요. 10 mH 코일에 100 mA가 흐르다 스위치가 1 µs 만에 끊기면 v = 10 mH × 0.1 A / 1 µs = 1000 V가 튀어 트랜지스터를 망가뜨리고 접점에 불꽃을 만들어요. 코일과 병렬로 다이오드를 거꾸로 달면 끊긴 전류가 다이오드를 따라 돌며 천천히 줄어서 스파이크가 전원보다 약 0.7 V 높은 수준에서 멈춰요. 릴레이·모터·솔레노이드를 구동할 때 꼭 필요한 플라이백 다이오드예요.',
      'A coil stores energy in its magnetic field and resists changes in current; since v = L·di/dt, a sudden cut makes a huge spike unless a diode gives the current a path.',
      'An inductor is a coil of wire. Current through it stores ½LI² of energy in the magnetic field, and any change in current is opposed by a voltage v = L·di/dt, so the current cannot change instantly. If 100 mA in a 10 mH coil is cut off in 1 µs, the result is v = 10 mH × 0.1 A / 1 µs = 1000 V, enough to destroy a transistor and spark across contacts. A reverse diode across the coil lets the interrupted current circulate and fade gently, clamping the spike about 0.7 V above the supply. This flyback diode is essential when driving relays, motors and solenoids.', sInd()),
    item('ci-rc', 'RC 충전과 시정수', 'RC charging and the time constant',
      '저항을 거쳐 커패시터를 채우면 v = Vs(1 − e^(−t/RC))로 차요. 시정수 τ = RC마다 63%, 5τ면 99%예요.',
      '저항을 통해 커패시터를 채우면 처음엔 빠르고 차오를수록 느려져요. 남은 전압 차에 비례해 전류가 흐르기 때문에 v = Vs(1 − e^(−t/RC))라는 지수 곡선이 나와요. 10 kΩ과 100 µF면 시정수 τ = RC = 1초이고, τ마다 남은 차이가 1/e(약 37%)로 줄어 1τ에 63.2%, 3τ에 95%, 5τ에 99.3%까지 차요. 방전도 같은 τ로 v = Vs·e^(−t/RC)를 따라요. 전원 리셋 지연, 버튼 디바운싱, 555 타이머, 간단한 저역통과 필터가 모두 이 곡선을 이용하고, 1 kΩ × 1 µF = 1 ms처럼 단위를 맞추면 계산이 쉬워요.',
      'Charging a capacitor through a resistor follows v = Vs(1 − e^(−t/RC)); each time constant τ = RC covers 63%, and 5τ reaches 99%.',
      'A capacitor charged through a resistor fills quickly at first and slowly near the end, because the current is proportional to the remaining voltage gap, giving the exponential v = Vs(1 − e^(−t/RC)). With 10 kΩ and 100 µF the time constant τ = RC is 1 second, and each τ shrinks the remaining gap to 1/e, about 37%: 63.2% after 1τ, 95% after 3τ and 99.3% after 5τ. Discharging follows v = Vs·e^(−t/RC) with the same τ. Power-on reset delays, button debouncing, the 555 timer and simple low-pass filters all use this curve, and matching units such as 1 kΩ × 1 µF = 1 ms keeps the arithmetic easy.', sRC()),
    item('ci-rl', 'RL 회로', 'RL circuits',
      '인덕터의 전류는 τ = L/R로 서서히 쌓여요. 100 mH와 100 Ω이면 1 ms이고, 릴레이 지연과 매끄러운 모터 전류가 여기서 나와요.',
      '인덕터에 전압을 걸면 코일이 반대 전압을 만들어 전류가 곧바로 흐르지 않고 서서히 늘어요. 전류는 V/R을 향해 i = (V/R)(1 − e^(−t/τ))로 오르고, 시정수는 τ = L/R이에요. 100 mH와 100 Ω이면 1 ms이고, 전류는 120 mA를 향해 쌓이는 동안 코일 전압은 12 V에서 0으로 줄어요. RC와 달리 L이 클수록, R이 작을수록 느려져요. 릴레이 접점이 신호보다 늦게 붙는 이유, PWM으로 모터를 짧게 켰다 꺼도 전류가 매끄럽게 이어지는 이유, 스위칭 전원이 인덕터로 전류를 고르게 하는 원리가 모두 이 시정수예요.',
      'Current in an inductor builds with τ = L/R, 1 ms for 100 mH and 100 Ω, which explains relay delays and smooth motor current.',
      'Apply a voltage to an inductor and the coil pushes back, so the current builds gradually instead of jumping, rising toward V/R as i = (V/R)(1 − e^(−t/τ)) with time constant τ = L/R. For 100 mH and 100 Ω, τ is 1 ms: the current climbs toward 120 mA while the coil voltage falls from 12 V to 0. Unlike RC, a larger L or a smaller R makes it slower. This time constant explains why relay contacts close after the drive signal, why a motor pulsed by PWM still draws smooth current, and how switching power supplies use inductors to even out current.', sRL()),
    item('ci-rlc', 'RLC 회로와 감쇠', 'RLC circuits and damping',
      'R, L, C를 직렬로 이으면 에너지가 오가며 진동할 수 있어요. 감쇠비 ζ = (R/2)√(C/L)에 따라 진동·임계·과감쇠로 갈려요.',
      'RLC 직렬 회로에서는 에너지가 커패시터의 전기장과 코일의 자기장 사이를 오가며 고유 주파수 f0 = 1/(2π√LC)로 진동할 수 있어요. 1 mH와 1 µF면 약 5 kHz예요. 저항은 이 진동을 줄이는 마찰 역할을 하고, 감쇠비 ζ = (R/2)√(C/L)로 성격이 정해져요. R = 10 Ω(ζ ≈ 0.16)이면 약 60% 넘쳤다가 한참 출렁이고, R = 2√(L/C) ≈ 63 Ω(ζ = 1)이면 넘치지 않으면서 가장 빨리 자리 잡는 임계 감쇠, R = 200 Ω이면 느릿느릿 올라가는 과감쇠예요. 디지털 신호선의 링잉, 스피커 공진, 기계의 질량-스프링-댐퍼가 모두 같은 방정식이에요.',
      'With R, L and C in series energy can slosh back and forth; the damping ratio ζ = (R/2)√(C/L) decides between ringing, critical and overdamped responses.',
      'In a series RLC circuit energy can swing between the capacitor’s electric field and the coil’s magnetic field at the natural frequency f0 = 1/(2π√LC), about 5 kHz for 1 mH and 1 µF. The resistor acts like friction, and the damping ratio ζ = (R/2)√(C/L) sets the character of the response. At R = 10 Ω (ζ ≈ 0.16) a step overshoots by about 60% and rings for a long time; at R = 2√(L/C) ≈ 63 Ω (ζ = 1) it is critically damped and settles fastest without overshoot; at R = 200 Ω it is overdamped and creeps up. Ringing on digital lines, speaker resonance and a mechanical mass–spring–damper all obey the same equation.', sRLC())
  ]),
  sec('ci-ac', '교류 회로', 'AC circuits', '주파수와 위상이 있는 세계', 'A world of frequency and phase', '복소수 임피던스와 페이저, RC 저역·고역 필터와 결합 커패시터, LC 공진과 Q, 유효·무효·피상 전력과 역률, 그리고 변압기와 송전까지 교류 회로를 다루는 방법을 봐요.', 'Complex impedance and phasors, RC low- and high-pass filters and coupling capacitors, LC resonance and Q, real, reactive and apparent power with power factor, and transformers and transmission: how to handle AC circuits.', [
    item('ci-impedance', '페이저와 임피던스', 'Phasors and impedance',
      '교류에서는 부품이 크기와 위상을 함께 바꿔요. R, jωL, 1/(jωC)를 복소수로 더하면 교류에서도 옴의 법칙 I = V/Z를 쓸 수 있어요.',
      '교류 회로에서 같은 주파수의 사인파는 크기와 위상만 다르기 때문에, 회전하는 벡터를 한 순간 멈춰 그린 페이저(복소수)로 나타낼 수 있어요. 저항의 임피던스는 R로 전압과 전류의 위상이 같고, 인덕터는 jωL로 전류가 90° 늦으며, 커패시터는 1/(jωC)로 전류가 90° 앞서요. 1 kHz에서 10 mH는 +62.8j Ω, 1 µF는 −159j Ω이에요. 직렬 회로라면 그냥 복소수로 더해 100 + 62.8j − 159j = 100 − 96j Ω, 크기 139 Ω에 위상 −44°가 되고, I = V/Z라는 복소수 옴의 법칙으로 전류를 구해요. 직류 회로의 모든 해석 기법을 그대로 교류에 쓸 수 있게 해 주는 도구예요.',
      'In AC, parts change both size and phase; adding R, jωL and 1/(jωC) as complex numbers lets Ohm’s law I = V/Z work for AC too.',
      'Sinusoids of one frequency in an AC circuit differ only in size and phase, so they can be written as phasors, complex numbers that freeze a rotating vector at one instant. A resistor’s impedance is R with voltage and current in phase, an inductor’s is jωL with current lagging by 90°, and a capacitor’s is 1/(jωC) with current leading by 90°. At 1 kHz, 10 mH is +62.8j Ω and 1 µF is −159j Ω. In series they simply add as complex numbers to 100 + 62.8j − 159j = 100 − 96j Ω, 139 Ω at −44°, and the current follows from the complex Ohm’s law I = V/Z. This lets every DC analysis technique carry over to AC.', sImp()),
    item('ci-rc-filter', 'RC 필터 회로', 'RC filter circuits',
      'R과 C로 만든 분배기는 주파수에 따라 비율이 바뀌어요. C 양단은 저역통과, R 양단은 고역통과이고 fc = 1/(2πRC)예요.',
      'R과 C를 직렬로 이으면 C의 임피던스가 주파수에 반비례해서 주파수에 따라 나누는 비율이 달라지는 분배기가 돼요. 출력을 C 양단에서 꺼내면 낮은 주파수는 통과하고 높은 주파수는 줄어드는 저역통과, R 양단에서 꺼내면 반대인 고역통과예요. 1.6 kΩ과 100 nF면 차단 주파수 fc = 1/(2πRC) ≈ 995 Hz이고, 두 곡선은 fc에서 0.707(−3 dB)로 만나요. 신호 경로에 직렬 C를 두면 직류 성분(예: 2.5 V 바이어스)은 막고 교류 신호만 지나가게 하는 결합 커패시터가 돼요. ADC 앞의 안티에일리어싱 필터, 센서 잡음 제거, 앰프 단 사이 연결에 흔히 써요.',
      'A divider built from R and C changes ratio with frequency: across C is low-pass, across R high-pass, with fc = 1/(2πRC).',
      'In series, R and C form a divider whose ratio varies with frequency, because the capacitor’s impedance falls as frequency rises. Taking the output across C gives a low-pass that passes low frequencies and attenuates high ones, while taking it across R gives the opposite, a high-pass. With 1.6 kΩ and 100 nF the cutoff is fc = 1/(2πRC) ≈ 995 Hz, where the two curves cross at 0.707 (−3 dB). A series capacitor in a signal path blocks the DC component, such as a 2.5 V bias, and passes only the AC signal: a coupling capacitor. These circuits appear as anti-aliasing filters before ADCs, sensor noise filters and links between amplifier stages.', sRCF()),
    item('ci-resonance', '공진과 Q', 'Resonance and Q',
      '한 주파수에서 XL = XC가 되어 서로 상쇄되는 게 공진이에요. f0 = 1/(2π√LC)이고, Q가 클수록 그 주파수만 날카롭게 골라내요.',
      '코일의 리액턴스 XL = 2πfL은 주파수와 함께 커지고 커패시터의 XC = 1/(2πfC)는 줄어서, 두 값이 같아지는 f0 = 1/(2π√LC)에서 서로 상쇄돼요. 100 µH와 253 pF는 약 1 MHz에서 공진해요. 직렬 공진에서는 임피던스가 R만 남아 전류가 최대이고, 날카로운 정도를 나타내는 Q = √(L/C)/R은 R = 10 Ω일 때 약 63, 대역폭은 f0/Q ≈ 16 kHz예요. 그래서 1.1 MHz의 다른 방송은 전류가 약 1/12로 줄어 걸러져요. 라디오 다이얼은 C를 바꿔 공진 주파수를 옮기는 것이고, 병렬 LC는 반대로 공진에서 임피던스가 최대가 돼요.',
      'Resonance is where XL = XC and they cancel, at f0 = 1/(2π√LC); a higher Q picks out that frequency more sharply.',
      'A coil’s reactance XL = 2πfL grows with frequency while a capacitor’s XC = 1/(2πfC) shrinks, so they cancel at f0 = 1/(2π√LC), about 1 MHz for 100 µH and 253 pF. At series resonance only R remains, so current peaks, and the sharpness Q = √(L/C)/R is about 63 for R = 10 Ω, giving a bandwidth of f0/Q ≈ 16 kHz. A station at 1.1 MHz therefore receives about 1/12 of the current and is rejected. A radio dial tunes by changing C to move the resonance, and a parallel LC does the opposite, peaking in impedance at resonance.', sReso()),
    item('ci-acpower', '교류 전력과 역률', 'AC power and power factor',
      '220 V는 RMS 값이에요. 전류가 늦으면 피상 전력 S 중 일부만 유효 전력 P가 되고, 역률 cos φ를 1에 가깝게 하면 같은 일을 적은 전류로 해요.',
      '가정용 220 V는 같은 열을 내는 직류와 같은 값인 RMS로, 최댓값은 220 × √2 ≈ 311 V예요. 모터처럼 코일이 있는 부하는 전류가 전압보다 늦어서 순간 전력 v·i가 주기마다 잠깐 음수가 되며 에너지가 전원으로 되돌아가요. 220 V, 5 A에 역률 0.8이면 피상 전력 S = 1100 VA 중 실제로 일하는 유효 전력은 P = S·cos φ = 880 W이고, 오가기만 하는 무효 전력은 Q = 660 var이에요(S² = P² + Q²). 커패시터를 달아 무효 전력을 상쇄해 역률을 1로 만들면 같은 880 W를 4 A로 보낼 수 있어 전선 손실과 설비 용량이 줄어요. 전원 장치에 VA와 W가 따로 적힌 이유예요.',
      'The 220 V of mains is an RMS value; when current lags, only part of the apparent power S does real work P, and raising the power factor cos φ toward 1 does the same work with less current.',
      'Household 220 V is an RMS value, equal to the DC that would heat a resistor the same, with a peak of 220 × √2 ≈ 311 V. Loads with coils, such as motors, draw current that lags the voltage, so the instantaneous power v·i briefly turns negative each cycle and energy flows back to the source. At 220 V and 5 A with a power factor of 0.8, the apparent power S = 1100 VA contains real power P = S·cos φ = 880 W doing work and reactive power Q = 660 var merely sloshing back and forth (S² = P² + Q²). Adding capacitors to cancel the reactive power brings the power factor to 1, delivering the same 880 W at 4 A with lower wiring loss and equipment rating. That is why power supplies list both VA and W.', sACP()),
    item('ci-transformer', '변압기와 송전', 'Transformers and transmission',
      '두 코일의 감은 수 비로 전압을 바꿔요. 전력은 보존돼서 전압을 높이면 전류가 줄고, 송전 손실 I²R이 크게 줄어요.',
      '변압기는 철심에 두 코일을 감은 거예요. 1차 코일의 교류가 만든 변하는 자기장이 철심을 따라 2차 코일에 전압을 유도하고, 전압비는 감은 수의 비 V2/V1 = N2/N1이에요. 2000 : 100이면 220 V가 11 V가 되고, 이상적이면 전력이 보존되어 출력 2 A(22 W)는 입력 0.1 A(22 W)가 돼요. 송전선은 전압을 수백 kV로 높여 전류를 줄이는데, 손실이 I²R이라 같은 전력을 1000배 높은 전압으로 보내면 손실은 100만분의 1이 돼요. 한국 전력망도 345 kV 같은 고압으로 보낸 뒤 22.9 kV를 거쳐 220 V로 낮춰요. 변하는 자기장이 필요해서 직류에는 쓸 수 없고, 두 코일이 전기적으로 분리되어 감전을 막는 역할도 해요.',
      'The turns ratio of two coils sets the voltage ratio; since power is conserved, higher voltage means less current and far lower I²R transmission loss.',
      'A transformer is two coils on an iron core. AC in the primary creates a changing magnetic field that the core carries to the secondary, inducing a voltage in the ratio V2/V1 = N2/N1. With 2000 : 100 turns, 220 V becomes 11 V, and ideally power is conserved, so 2 A out (22 W) means 0.1 A in (22 W). Power lines raise the voltage to hundreds of kV to cut the current, and since loss goes as I²R, sending the same power at 1000 times the voltage cuts the loss to a millionth. Korea’s grid likewise transmits at high voltages such as 345 kV before stepping down through 22.9 kV to 220 V. It needs a changing field, so it cannot work with DC, and the isolated windings also protect against shock.', sXfmr())
  ]),
  sec('ci-semi', '반도체 소자', 'Semiconductor devices', '한 방향 밸브와 전자 스위치', 'One-way valves and electronic switches', 'pn 접합 다이오드와 I-V 곡선, 브리지 정류와 평활 커패시터, LED와 전류 제한 저항, BJT와 MOSFET으로 큰 부하를 켜고 끄는 스위치 회로까지 반도체 소자를 봐요.', 'The pn-junction diode and its I–V curve, bridge rectifiers and smoothing capacitors, LEDs and current-limiting resistors, and switching large loads with BJTs and MOSFETs: semiconductor devices at work.', [
    item('ci-diode', '다이오드', 'Diodes',
      'p형과 n형을 붙인 한 방향 밸브예요. 순방향으로 약 0.6 V를 넘기면 전류가 지수적으로 늘고, 역방향으로는 거의 흐르지 않아요.',
      '다이오드는 p형 반도체(정공이 많음)와 n형 반도체(전자가 많음)를 붙인 소자예요. 경계에는 운반자가 없는 공핍층이 생겨 전류를 막는 벽이 돼요. 애노드에 +를 거는 순방향으로 약 0.6 V를 넘기면 벽이 낮아져 전류가 I = Is(e^(V/Vt) − 1)를 따라 지수적으로 급하게 늘어요. 0.6 V에서 12 mA였던 전류가 0.7 V에서는 0.55 A가 될 정도라, 켜진 실리콘 다이오드의 전압은 대략 0.7 V로 봐요. 역방향으로는 아주 작은 누설 전류만 흘러 막힌 것과 같아요. 정류, 역전압 보호, 플라이백 경로에 쓰고, 쇼트키 다이오드는 약 0.3 V로 손실이 더 적어요.',
      'A p–n junction is a one-way valve: past about 0.6 V forward, current grows exponentially, while in reverse almost nothing flows.',
      'A diode joins p-type semiconductor, rich in holes, with n-type, rich in electrons. A depletion layer free of carriers forms at the boundary and acts as a barrier. Forward-biased, with the anode positive, it conducts once about 0.6 V lowers the barrier, and the current then rises exponentially as I = Is(e^(V/Vt) − 1): 12 mA at 0.6 V becomes 0.55 A at 0.7 V, which is why a conducting silicon diode is taken as about 0.7 V. In reverse only a tiny leakage flows, so it is effectively blocked. Diodes serve as rectifiers, reverse-polarity protection and flyback paths, and Schottky diodes drop only about 0.3 V for lower losses.', sDiode()),
    item('ci-rectifier', '정류와 평활', 'Rectifying and smoothing',
      '다이오드로 교류를 한 방향으로 만들고, 큰 커패시터로 평탄하게 해요. 브리지 정류는 음의 반주기도 쓰고, 리플은 I/(2fC)예요.',
      '전자 기기는 직류가 필요해서 교류를 정류해야 해요. 다이오드 하나를 직렬로 두면 양의 반주기만 통과하는 반파 정류이고, 다이오드 네 개로 만든 브리지는 음의 반주기도 뒤집어 보내 60 Hz 전원에서 120 Hz 펄스를 만들어요. 출력에 큰 커패시터를 달면 꼭대기에서 충전하고 그 사이에는 부하로 방전해 거의 평평한 직류가 되는데, 남는 출렁임인 리플은 약 I/(2fC)예요. 0.5 A, 2200 µF면 약 1.9 V이고, 그 뒤에 레귤레이터를 두면 깨끗한 직류가 돼요. 브리지는 다이오드 두 개를 지나 약 1.4 V를 잃고, 커패시터를 키우면 리플은 줄지만 켤 때 돌입 전류가 커져요.',
      'Diodes turn AC one-directional and a large capacitor smooths it; a bridge uses both half-cycles, and ripple is about I/(2fC).',
      'Electronics needs DC, so AC must be rectified. A single series diode passes only the positive half-cycles (half-wave), while a bridge of four diodes flips the negative half-cycles too, producing 120 Hz pulses from 60 Hz mains. A large output capacitor charges at each peak and discharges into the load in between, leaving nearly flat DC with a residual ripple of about I/(2fC): roughly 1.9 V for 0.5 A and 2200 µF. A regulator afterward cleans it up. The bridge loses about 1.4 V across two diodes, and a bigger capacitor reduces ripple at the cost of a larger inrush current at power-on.', sRect()),
    item('ci-led', 'LED와 전류 제한 저항', 'LEDs and current-limiting resistors',
      'LED는 전압이 아니라 전류로 다뤄요. R = (Vs − Vf)/I로 저항을 고르고, 저항 없이 전원에 바로 이으면 전류가 폭주해 타요.',
      'LED는 빛을 내는 다이오드라 순방향 전압 Vf(빨강 약 2 V, 파랑·흰색 약 3 V) 근처에서 전류가 급하게 늘고, 밝기는 전류로 정해져요. 5 V 전원에서 빨간 LED에 15 mA를 흘리려면 저항에 5 − 2 = 3 V가 걸리니 R = 3/0.015 = 200 Ω이고, 표준값 220 Ω을 쓰면 13.6 mA가 돼요. 그래프에서는 LED 곡선과 저항의 부하선이 만나는 점이 실제 동작점이에요. 저항 없이 5 V를 바로 걸면 곡선이 거의 수직이라 작은 전압 차에도 전류가 폭주해 LED가 타요. 밝기 조절은 PWM으로 깜빡여 평균 전류를 바꾸는 게 일반적이에요.',
      'LEDs are driven by current, not voltage: size the resistor with R = (Vs − Vf)/I, because wiring one straight to a supply lets current run away.',
      'An LED is a light-emitting diode whose current rises sharply near its forward voltage Vf, about 2 V for red and 3 V for blue or white, and its brightness is set by current. To run a red LED at 15 mA from 5 V, the resistor drops 5 − 2 = 3 V, so R = 3/0.015 = 200 Ω, and the standard 220 Ω gives 13.6 mA. Graphically the operating point is where the LED curve meets the resistor’s load line. Wired directly to 5 V without a resistor, the nearly vertical curve lets current run away with the slightest voltage difference and the LED burns out. Brightness is usually controlled by PWM, blinking it fast to change the average current.', sLED()),
    item('ci-bjt', 'BJT 스위치', 'BJT switches',
      '작은 베이스 전류로 큰 컬렉터 전류를 켜요. Ic = β·Ib이지만 스위치로 쓸 땐 넉넉한 베이스 전류로 완전히 포화시켜야 열이 적어요.',
      'BJT(바이폴라 트랜지스터)는 베이스로 들어가는 작은 전류가 컬렉터-이미터 사이의 큰 전류를 조절하는 소자로, 증폭 영역에서는 Ic = β·Ib(β는 보통 100 안팎)예요. 3.3 V GPIO로 100 mA 릴레이를 켜려면 최소 Ib = 1 mA가 필요하지만, β는 부품과 온도에 따라 크게 달라서 5배쯤 여유 있게 5 mA를 넣어요. 그러면 Rb = (3.3 − 0.7)/5 mA ≈ 520 Ω이라 표준값 470 Ω을 써요. 충분히 포화되면 Vce가 약 0.2 V라 열은 20 mW뿐이지만, 어중간하게 켜지면 전압이 걸린 채 전류가 흘러 뜨거워져요. 릴레이 같은 코일 부하에는 플라이백 다이오드를 같이 달아요.',
      'A small base current switches a large collector current; Ic = β·Ib, but as a switch it should be driven hard into saturation to stay cool.',
      'In a BJT (bipolar junction transistor) a small current into the base controls a much larger collector–emitter current, with Ic = β·Ib in the active region and β typically around 100. Switching a 100 mA relay from a 3.3 V GPIO needs at least Ib = 1 mA, but β varies widely with part and temperature, so about five times that, 5 mA, is used. That makes Rb = (3.3 − 0.7)/5 mA ≈ 520 Ω, rounded to the standard 470 Ω. Fully saturated, Vce is about 0.2 V and only 20 mW is wasted, whereas a half-on transistor carries current with voltage across it and heats up. Coil loads such as relays also get a flyback diode.', sBJT()),
    item('ci-mosfet', 'MOSFET 스위치', 'MOSFET switches',
      '게이트 전압으로 켜는 스위치예요. 켜지면 작은 저항 Rds(on)처럼 동작해 열이 I²R뿐이고, 게이트 저항과 풀다운을 함께 달아요.',
      'MOSFET은 절연된 게이트에 거는 전압으로 드레인-소스 사이를 켜고 끄는 스위치라서, 켜져 있는 동안 게이트로 직류 전류가 거의 흐르지 않아요. Vgs가 문턱 전압을 넘으면 켜지기 시작하는데, 3.3 V MCU로 완전히 켜려면 Vgs 2.5 V 정도에서 Rds(on)이 보장된 로직 레벨 MOSFET을 골라야 해요. 켜지면 작은 저항 Rds(on)처럼 동작해서 50 mΩ에 2 A면 열은 I²R = 0.2 W로, 같은 전류의 BJT보다 손실이 적어요. 게이트 직렬 저항(수십~수백 Ω)은 게이트 충전 시의 링잉을 줄이고, 100 kΩ 풀다운은 MCU가 리셋 중일 때 게이트가 떠서 모터가 켜지는 걸 막아요. 빠른 PWM에서는 게이트를 충방전하는 손실도 커져 게이트 드라이버를 써요.',
      'A switch turned on by gate voltage; when on it acts like a small resistance Rds(on), so heat is just I²R, and it comes with a gate resistor and pull-down.',
      'A MOSFET switches its drain–source path with the voltage on an insulated gate, so almost no DC current flows into the gate while it is on. It starts conducting once Vgs exceeds the threshold, but turning fully on from a 3.3 V MCU requires a logic-level MOSFET whose Rds(on) is guaranteed at around 2.5 V of Vgs. When on it behaves like a small resistance Rds(on): 2 A through 50 mΩ wastes I²R = 0.2 W, less than a BJT at the same current. A series gate resistor of tens to hundreds of ohms damps ringing as the gate charges, and a 100 kΩ pull-down stops the gate from floating on while the MCU resets. In fast PWM, charging and discharging the gate becomes a real loss, so gate drivers are used.', sMOS())
  ]),
  sec('ci-amp', '연산 증폭기', 'Operational amplifiers', '되먹임으로 만드는 정확한 아날로그', 'Precise analog through feedback', '이상적 op-amp의 두 규칙과 가상 단락, 반전 증폭기와 가상 접지, 비반전 증폭기와 버퍼, 비교기와 슈미트 트리거, 그리고 적분기와 함수 발생기까지 op-amp 회로를 봐요.', 'The ideal op-amp’s two rules and the virtual short, inverting amplifiers and virtual ground, non-inverting amplifiers and buffers, comparators and Schmitt triggers, and integrators and function generators: op-amp circuits.', [
    item('ci-opamp', '이상적 op-amp', 'The ideal op-amp',
      '두 입력의 차이를 10만 배쯤 키워요. 음의 되먹임을 걸면 두 입력이 같아지고(가상 단락), 입력으로는 전류가 흐르지 않아요.',
      '연산 증폭기(op-amp)는 + 입력과 − 입력의 차이를 10만 배쯤 키워 출력하는 증폭기예요. 이득이 워낙 커서 입력이 1 mV만 달라도 출력이 전원 전압(±12 V)에 붙어 버리는데, 되먹임 없이 쓰면 이렇게 두 입력을 비교하는 비교기가 돼요. 출력을 − 입력으로 되먹이면 출력은 두 입력 전압이 같아지는 곳에서 자리 잡아요. 그래서 대부분의 op-amp 회로는 두 규칙으로 풀어요: 음의 되먹임이 있으면 vp = vm(가상 단락), 입력 단자로는 전류가 흐르지 않음. 실제 op-amp는 출력이 전원 전압을 넘을 수 없고, 이득 × 대역폭이 일정해서 이득을 높이면 쓸 수 있는 주파수가 줄어들어요.',
      'An op-amp multiplies the difference between its inputs about 100,000 times; with negative feedback the inputs become equal (the virtual short) and no current flows into them.',
      'An operational amplifier amplifies the difference between its + and − inputs roughly 100,000 times. The gain is so large that a 1 mV difference slams the output to the supply rails (±12 V), so used without feedback it simply compares its inputs. Feed the output back to the − input and it settles wherever the two input voltages are equal. Most op-amp circuits are therefore solved with two rules: with negative feedback vp = vm (the virtual short), and no current flows into the inputs. Real op-amps cannot drive past their supply rails, and their gain–bandwidth product is fixed, so more gain leaves less usable bandwidth.', sOpI()),
    item('ci-inverting', '반전 증폭기', 'Inverting amplifiers',
      '+ 입력을 접지하고 Rin, Rf로 되먹임을 걸면 vout = −(Rf/Rin)·vin이에요. − 입력은 0 V에 머무는 가상 접지가 돼요.',
      '반전 증폭기는 + 입력을 접지하고 입력 저항 Rin과 되먹임 저항 Rf를 − 입력에 연결해요. 가상 단락 때문에 − 입력도 0 V에 머물러, 실제로 이어지진 않았지만 접지처럼 동작하는 가상 접지가 돼요. Rin에 흐르는 전류 vin/Rin은 op-amp 입력으로 들어갈 수 없으니 전부 Rf를 지나가고, 그래서 vout = −(Rf/Rin)·vin이에요. 10 kΩ과 100 kΩ이면 이득이 −10이라 0.2 V 사인파가 뒤집힌 2 V 사인파가 돼요. 이득이 저항 비로만 정해져 정확하고, 입력 여러 개를 저항으로 − 입력에 모으면 가산기(오디오 믹서)가 돼요.',
      'Ground the + input and feed back through Rin and Rf to get vout = −(Rf/Rin)·vin, with the − input held at 0 V as a virtual ground.',
      'The inverting amplifier grounds the + input and connects an input resistor Rin and a feedback resistor Rf to the − input. By the virtual short the − input also sits at 0 V, a virtual ground that acts grounded without being wired to ground. The current vin/Rin through Rin cannot enter the op-amp, so all of it flows through Rf, giving vout = −(Rf/Rin)·vin. With 10 kΩ and 100 kΩ the gain is −10, turning a 0.2 V sine into an inverted 2 V sine. The gain depends only on a resistor ratio, so it is precise, and summing several inputs through resistors into the − input makes an adder, the basis of an audio mixer.', sInvA()),
    item('ci-noninverting', '비반전 증폭기와 버퍼', 'Non-inverting amplifiers and buffers',
      '입력을 + 단자에 바로 넣고 출력을 나눠 되먹이면 이득 1 + Rf/Rg예요. 출력을 − 단자에 바로 이으면 이득 1인 버퍼가 돼요.',
      '비반전 증폭기는 입력을 + 단자에 바로 넣고, 출력을 Rf와 Rg로 나눈 전압을 − 단자로 되먹여요. − 단자 전압 vout·Rg/(Rf + Rg)가 vin과 같아져야 하므로 이득은 1 + Rf/Rg이고, 90 kΩ과 10 kΩ이면 10배에 위상은 그대로예요. 입력이 + 단자로 직접 들어가 입력 임피던스가 매우 커서 신호원에서 전류를 거의 끌지 않아요. Rf를 0으로, Rg를 없애 출력을 − 단자에 바로 이으면 이득 1인 버퍼(전압 팔로워)가 돼요. 10 kΩ 분배기의 2.5 V에 1 kΩ 부하를 바로 달면 0.42 V로 무너지지만, 버퍼를 거치면 2.5 V가 그대로 유지돼요. 센서, 기준 전압, ADC 입력 앞에 흔히 둬요.',
      'Feed the input straight into + and return a divided output for a gain of 1 + Rf/Rg; tie the output directly to − for a unity-gain buffer.',
      'The non-inverting amplifier applies the input directly to the + terminal and feeds back a fraction of the output, set by Rf and Rg, to the − terminal. Since the − voltage vout·Rg/(Rf + Rg) must equal vin, the gain is 1 + Rf/Rg, ten for 90 kΩ and 10 kΩ, with no inversion. Because the input goes straight into the + terminal, its input impedance is very high and it draws almost no current from the source. Setting Rf to zero and removing Rg, wiring the output straight to −, gives a unity-gain buffer (voltage follower). A 1 kΩ load on a 10 kΩ divider’s 2.5 V output collapses it to 0.42 V, but through a buffer it stays at 2.5 V, which is why buffers sit after sensors, references and before ADC inputs.', sNonInv()),
    item('ci-comparator', '비교기와 슈미트 트리거', 'Comparators and Schmitt triggers',
      '비교기는 입력이 기준보다 크면 high를 내요. 잡음 때문에 떨리면 올라갈 때와 내려갈 때 기준이 다른 슈미트 트리거로 막아요.',
      '비교기는 입력이 기준 전압보다 크면 high, 작으면 low를 내는 회로로, op-amp를 되먹임 없이 쓴 것과 같아요(전용 비교기 IC가 더 빨라요). 문제는 입력에 잡음이 있으면 기준 근처에서 여러 번 넘나들어 출력이 덜덜 떨리는 채터링이에요. 슈미트 트리거는 출력에서 + 입력으로 정 되먹임을 걸어 출력 상태에 따라 기준을 바꿔요. 올라갈 때는 3.0 V, 내려올 때는 2.0 V를 넘어야 바뀌는 히스테리시스 덕분에, 잡음이 두 기준의 간격보다 작으면 한 번씩만 깔끔하게 바뀌어요. 버튼 입력, 온도 경보, 느린 센서 신호를 디지털로 바꿀 때 쓰고, 많은 MCU 입력 핀에도 들어 있어요.',
      'A comparator outputs high when its input exceeds a reference; if noise makes it chatter, a Schmitt trigger with separate rising and falling thresholds fixes it.',
      'A comparator outputs high when the input is above a reference voltage and low below it, like an op-amp used without feedback (dedicated comparator ICs are faster). The trouble is noise: near the threshold the input crosses back and forth several times and the output chatters. A Schmitt trigger adds positive feedback from the output to the + input so the threshold shifts with the output state. With this hysteresis the output rises only past 3.0 V and falls only below 2.0 V, so as long as noise is smaller than the gap it switches cleanly once each way. Schmitt triggers handle buttons, temperature alarms and slow sensor signals, and many MCU input pins include one.', sComp()),
    item('ci-integrator', 'op-amp 적분기', 'Op-amp integrators',
      '되먹임 자리에 커패시터를 두면 vout = −(1/RC)∫vin dt예요. 사각파를 넣으면 삼각파가 나오고, 비교기와 엮으면 발진기가 돼요.',
      '반전 증폭기의 Rf 자리에 커패시터를 두면 적분기가 돼요. − 입력이 가상 접지라 vin/R 전류가 그대로 C를 채우므로 vout = −(1/RC)∫vin dt예요. R = 10 kΩ, C = 100 nF면 RC = 1 ms라서 1 V 입력에 출력이 1 ms마다 1 V씩 내려가요. ±1 V, 250 Hz 사각파를 넣으면 2 ms마다 기울기 방향이 바뀌어 2 Vpp 삼각파가 나와요. 적분기 출력을 슈미트 트리거로 보내고 그 출력을 다시 적분기 입력으로 되먹이면 사각파와 삼각파를 함께 만드는 함수 발생기가 돼요. 실제 회로에서는 작은 오프셋도 계속 쌓이니 C와 병렬로 큰 저항을 달아 드리프트를 막고, R과 C 자리를 바꾸면 미분기가 돼요.',
      'A capacitor in the feedback path gives vout = −(1/RC)∫vin dt: square waves become triangles, and paired with a comparator it oscillates.',
      'Replacing Rf in an inverting amplifier with a capacitor makes an integrator. With the − input at virtual ground, the current vin/R charges C directly, so vout = −(1/RC)∫vin dt. With R = 10 kΩ and C = 100 nF, RC = 1 ms and a 1 V input ramps the output down 1 V per millisecond. A ±1 V, 250 Hz square wave reverses the slope every 2 ms and produces a 2 Vpp triangle wave. Sending the integrator’s output into a Schmitt trigger and feeding that back to the integrator creates a function generator producing square and triangle waves together. Real circuits add a large resistor across C so tiny offsets do not accumulate and drift, and swapping R and C gives a differentiator.', sInteg())
  ]),
  sec('ci-practice', '실전 회로', 'Practical circuits', '보드 위에서 매일 만나는 회로', 'Circuits you meet on every board', '풀업 저항과 오픈 드레인 버스, 디커플링 커패시터, 선형 레귤레이터와 벅 컨버터, H 브리지 모터 구동, 그리고 3.3 V와 5 V 사이의 논리 레벨 변환까지 실제 보드에서 매일 쓰는 회로를 봐요.', 'Pull-up resistors and open-drain buses, decoupling capacitors, linear regulators and buck converters, H-bridge motor drives, and logic-level shifting between 3.3 V and 5 V: circuits found on every real board.', [
    item('ci-pullup', '풀업과 풀다운', 'Pull-ups and pull-downs',
      '아무 데도 연결되지 않은 입력은 떠서 0과 1을 오가요. 풀업 저항으로 기본값을 정하고, I2C 같은 오픈 드레인 버스도 풀업이 1을 만들어요.',
      'MCU 입력 핀은 거의 전류를 끌지 않아서 아무 데도 연결하지 않으면 주변 잡음에 따라 0과 1을 오락가락하는 떠 있는 상태가 돼요. 10 kΩ 풀업 저항을 3.3 V에 이으면 평소엔 1로 읽히고, 버튼이 핀을 접지로 당기면 0이 되며, 이때 저항으로 3.3/10k = 0.33 mA가 흘러요. 저항이 너무 작으면 누를 때 전력을 낭비하고, 너무 크면 잡음에 약하고 신호가 느리게 올라가요. I2C는 오픈 드레인 방식이라 각 장치는 선을 0으로 당기기만 하고 1은 풀업 저항이 만들어요. 4.7 kΩ과 배선 용량 200 pF면 올라가는 데 약 0.8 µs가 걸려서, 빠른 I2C일수록 풀업을 작게 해요.',
      'An unconnected input floats between 0 and 1; a pull-up resistor sets a default, and on open-drain buses such as I2C the pull-up creates every 1.',
      'An MCU input pin draws almost no current, so left unconnected it floats and flips between 0 and 1 with stray noise. A 10 kΩ pull-up to 3.3 V makes it read 1 by default and 0 when a button pulls it to ground, drawing 3.3/10k = 0.33 mA through the resistor. Too small a value wastes power when pressed; too large leaves it noise-prone and slow to rise. I2C is open-drain: each device can only pull the line low, and the pull-up creates the 1. With 4.7 kΩ and 200 pF of wiring capacitance the rise takes about 0.8 µs, so faster I2C needs smaller pull-ups. Internal MCU pull-ups are typically 30–50 kΩ.', sPull()),
    item('ci-decoupling', '디커플링 커패시터', 'Decoupling capacitors',
      'IC는 클럭마다 순간 전류를 당기고, 배선 인덕턴스 때문에 전원이 출렁여요. 전원 핀 바로 옆의 100 nF가 가까운 전하 창고가 돼요.',
      '디지털 IC는 클럭 엣지마다 수 ns 동안 큰 전류를 순간적으로 당겨요. 전원까지의 배선은 약 10 nH의 작은 인덕터라서 v = L·di/dt 때문에 100 mA를 2 ns에 당기면 전압이 0.5 V나 떨어지고, 3.3 V 칩이라면 리셋 경계(브라운아웃)를 건드릴 수도 있어요. 전원 핀 바로 옆에 100 nF 세라믹 커패시터를 두면 가까운 전하 창고가 되어 순간 전류를 대신 내주고, 출렁임이 수십 mV로 줄어요. 느린 부하 변화는 10 µF 같은 벌크 커패시터가 맡아요. 비아와 긴 배선은 인덕턴스를 키워 효과를 떨어뜨리니 최대한 가깝게 두고, 이유를 알 수 없는 리셋이나 오동작이 생기면 디커플링부터 확인해요.',
      'ICs pull bursts of current every clock and trace inductance makes the supply sag; a 100 nF capacitor right at the power pin acts as a local charge store.',
      'Digital ICs draw large bursts of current for a few nanoseconds on every clock edge. The wiring back to the supply is a small inductor of about 10 nH, so by v = L·di/dt pulling 100 mA in 2 ns sags the voltage by 0.5 V, enough to brush a 3.3 V chip’s brown-out limit. A 100 nF ceramic capacitor right next to the power pin acts as a nearby charge store that supplies the burst instead, shrinking the sag to tens of millivolts. Slower load changes are handled by a bulk capacitor such as 10 µF. Vias and long traces add inductance and weaken the effect, so place them as close as possible, and suspect decoupling first when a board resets or misbehaves for no clear reason.', sDecap()),
    item('ci-ldo', '선형 레귤레이터(LDO)', 'Linear regulators (LDOs)',
      '통과 트랜지스터를 가변 저항처럼 조절해 출력을 지켜요. 남는 전압 × 전류가 모두 열이라, 전압 차가 크면 효율이 크게 떨어져요.',
      '선형 레귤레이터는 입력과 출력 사이의 통과 트랜지스터를 출력 전압을 보며 자동으로 조절해 출력을 일정하게 지켜요. 원리상 남는 전압은 모두 열이 되어 열 = (Vin − Vout) × I, 효율은 대략 Vout/Vin이에요. 5 V에서 3.3 V로 0.5 A를 만들면 0.85 W가 열이 되고 효율은 66%지만, 12 V에서 같은 일을 하면 4.35 W를 태우고 효율은 27.5%라 방열판이 필요해요. 입력이 출력 + 드롭아웃 전압보다 낮아지면 출력을 지킬 수 없는데, LDO(저드롭아웃)는 이 값이 약 0.3 V 이하로 작아요. 대신 스위칭 잡음이 없고 부품이 간단해 아날로그·RF처럼 잡음에 민감한 회로에 알맞아요.',
      'A pass transistor adjusted like a variable resistor holds the output steady; every excess volt times current becomes heat, so efficiency collapses with a large voltage gap.',
      'A linear regulator continuously adjusts a pass transistor between input and output, watching the output to hold it constant. By design every excess volt becomes heat: heat = (Vin − Vout) × I, and efficiency is roughly Vout/Vin. Making 3.3 V at 0.5 A from 5 V wastes 0.85 W at 66% efficiency, but from 12 V it burns 4.35 W at 27.5% and needs a heatsink. Regulation fails once the input falls below the output plus the dropout voltage, which for an LDO (low-dropout) part is about 0.3 V or less. In return it has no switching noise and few parts, making it ideal for noise-sensitive analog and RF circuits.', sLDO()),
    item('ci-buck', '스위칭 레귤레이터(벅)', 'Switching regulators (buck)',
      '스위치를 빠르게 켜고 끄며 인덕터로 에너지를 옮겨요. 듀티 D = Vout/Vin으로 전압을 낮추고, 효율이 85–95%라 열이 거의 없어요.',
      '벅 컨버터는 스위치를 수백 kHz로 켜고 끄며 인덕터와 커패시터로 평균을 내서 전압을 낮춰요. 스위치 노드는 0 V와 입력 전압을 오가는 사각파이고, 켜진 비율(듀티) D = Vout/Vin = 3.3/12 = 27.5%면 평균이 3.3 V가 돼요. 인덕터 전류는 부하 전류 0.5 A를 중심으로 ΔI = (Vin − Vout)·D/(L·f) ≈ 0.22 A 폭의 톱니처럼 오르내려요(22 µH, 500 kHz). 저항으로 태우지 않으니 같은 12 V → 3.3 V, 0.5 A에서 열이 0.18 W 정도로, LDO의 4.35 W와 비교가 안 돼요. 대신 스위칭 잡음과 인덕터 등 부품 수를 감수해야 해서, 잡음에 민감한 회로는 벅 뒤에 LDO를 두기도 해요. 전압을 높이는 건 부스트 컨버터예요.',
      'Switching fast and moving energy through an inductor, a buck converter lowers voltage with duty D = Vout/Vin at 85–95% efficiency.',
      'A buck converter switches at hundreds of kilohertz and averages the result with an inductor and capacitor to step the voltage down. The switch node is a square wave between 0 V and the input, and a duty cycle D = Vout/Vin = 3.3/12 = 27.5% averages it to 3.3 V. The inductor current saws up and down around the 0.5 A load by ΔI = (Vin − Vout)·D/(L·f) ≈ 0.22 A for 22 µH at 500 kHz. Because nothing is burned in a resistance, 12 V to 3.3 V at 0.5 A wastes only about 0.18 W, against 4.35 W for an LDO. The price is switching noise and more parts such as the inductor, so noise-sensitive circuits sometimes follow the buck with an LDO. Raising the voltage takes a boost converter.', sBuck()),
    item('ci-hbridge', 'H 브리지 모터 구동', 'H-bridge motor drive',
      '모터 양쪽의 스위치 네 개로 방향을 바꿔요. 대각선 쌍을 켜고, 같은 쪽 두 개를 동시에 켜면 단락이라 데드 타임을 둬요. 속도는 PWM으로 조절해요.',
      'H 브리지는 모터 양 끝에 스위치 두 쌍을 H 모양으로 배치한 회로예요. 대각선 Q1과 Q4를 켜면 전류가 왼쪽에서 오른쪽으로 흘러 정방향, 반대 대각선 Q3와 Q2를 켜면 전류가 뒤집혀 역방향으로 돌아요. 같은 쪽의 Q1과 Q2가 동시에 켜지면 전원이 그대로 단락되는 슛스루가 일어나 순식간에 타기 때문에, 전환할 때 둘 다 꺼 두는 짧은 데드 타임을 둬요. 한쪽 스위치를 PWM으로 켜고 끄면 평균 전압이 듀티에 비례해 속도를 조절할 수 있고, 아래쪽 Q2와 Q4를 함께 켜면 모터 단자가 단락되어 브레이크가 걸려요. DRV8833, L298 같은 드라이버 IC가 이 구조와 보호 회로를 한데 담고 있어요.',
      'Four switches around a motor set its direction: close a diagonal pair, never both switches on one side, and use PWM for speed.',
      'An H-bridge arranges two pairs of switches around a motor in an H shape. Closing diagonal Q1 and Q4 drives current left to right for forward rotation, and the other diagonal, Q3 and Q2, reverses the current and the rotation. If Q1 and Q2 on the same side are on together, the supply is shorted (shoot-through) and parts burn instantly, so a short dead time with both off is inserted at every changeover. Pulsing one switch with PWM makes the average voltage proportional to the duty cycle, controlling speed, and closing both low-side switches Q2 and Q4 shorts the motor terminals as a brake. Driver ICs such as the DRV8833 or L298 package this structure together with protection.', sHB()),
    item('ci-levels', '논리 레벨과 레벨 변환', 'Logic levels and level shifting',
      '입력은 VIH 이상을 1, VIL 이하를 0으로 읽어요. 3.3 V와 5 V 칩을 이을 땐 문턱과 최대 정격을 확인하고, 분배기나 MOSFET 시프터를 써요.',
      '디지털 입력은 일정 전압(VIH) 이상을 1, 이하(VIL)를 0으로 읽고 그 사이는 보장하지 않아요. 5 V CMOS 입력은 3.5 V 이상이 1이라서 3.3 V 칩의 high 출력 3.3 V는 애매한 구간에 들어가 오동작할 수 있고, VIH가 2.0 V인 TTL 호환(HCT) 입력이면 괜찮아요. 반대로 5 V 출력을 3.3 V 입력에 넣으면 최대 정격(보통 3.6 V)을 넘어 칩이 망가질 수 있어서, 1 kΩ/2 kΩ 분배기로 3.33 V로 낮추거나 데이터시트에서 5 V tolerant 핀인지 확인해요. I2C처럼 양방향인 선은 MOSFET(BSS138 등) 하나와 양쪽 풀업으로 만든 레벨 시프터를 써서, 어느 쪽에서 0으로 당겨도 반대쪽이 따라가게 해요.',
      'Inputs read above VIH as 1 and below VIL as 0; when joining 3.3 V and 5 V chips, check thresholds and absolute maximums, then use a divider or a MOSFET shifter.',
      'A digital input reads anything above VIH as 1 and below VIL as 0, with no guarantee in between. A 5 V CMOS input needs at least 3.5 V for a 1, so a 3.3 V chip’s high output lands in the undefined zone and may misbehave, though TTL-compatible (HCT) inputs with VIH of 2.0 V are fine. Going the other way, a 5 V output can exceed a 3.3 V input’s absolute maximum, often 3.6 V, and damage the chip, so either divide it down to 3.33 V with 1 kΩ and 2 kΩ or confirm the pin is 5 V tolerant in the datasheet. Bidirectional lines such as I2C use a level shifter built from one MOSFET, such as a BSS138, and pull-ups on both sides, so a low pulled on either side carries across.', sLevels())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
