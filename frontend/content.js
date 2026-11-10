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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'fex-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono fex-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono fex-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c fex-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono fex-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c fex-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'fex-s fex-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono fex-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono fex-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono fex-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono fex-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono fex-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'fex-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'fex-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'fex-xs fex-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono fex-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'fex-a', g: 'fex-g', r: 'fex-r', w: 'fex-w', m: 'cz-mono', s: 'fex-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'fex-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono fex-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono fex-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'fex-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.fex-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.fex-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.fex-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.fex-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.fex-r .in{color:var(--danger);font-weight:800}
.fex-g .in{color:var(--ok);font-weight:800}
.fex-a .in{color:var(--accent);font-weight:800}
.fex-w .in{color:var(--warn);font-weight:800}
.fex-c .in{font-size:.6em;font-weight:700}
.fex-c2 .in{font-size:.5em;font-weight:700}
.fex-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.fex-wr .in{white-space:normal!important}
.fex-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.fex-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Frontend · 1. architecture ===== */
const CSSY = '.fex-ic .in{color:inherit!important}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc fex-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };

function sComponentDesign() {
  return CW('fe-component-design', {
    code: [['// ✗ 하나에 다 넣은 컴포넌트', '// ✗ one component doing everything'], ['function ProductPage() { /* 600줄 */ }', 'function ProductPage() { /* 600 lines */ }'], ['// ✓ 역할로 나누기', '// ✓ split by role'], ['<ProductPage>          // 데이터 · 상태', '<ProductPage>          // data and state'], ['  <ProductGallery />   // 표시만', '  <ProductGallery />   // display only'], '  <PriceBox price={p} onBuy={buy} />', '</ProductPage>', '<Card><Card.Header /><Card.Body /></Card>'],
    hl: [[0, 2, 'danger'], [2, 5, 'ok'], [5, 1, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'big', X, .8, 12.0, ['ProductPage · 600줄', 'ProductPage · 600 lines'], 'danger', 1, { off: 2, h: 2.8 }); ['fetch', 'state', 'UI', 'events'].forEach((t, i) => lbl(S, 'b' + i, X + .6 + i * 2.8, 3.9, t, 'm r', 1, { off: 2 }));
      lbl(S, 'n1', X, 6.4, ['고치기 어렵고 재사용도 안 돼요', 'hard to change, impossible to reuse'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'pg', X + 3.0, .8, 6.0, 'ProductPage', 'accent', 2, { h: 1.1 }); nd(S, 'ga', X, 3.2, 5.6, 'ProductGallery', 'ok', 2, { h: 1.1 }); nd(S, 'pb', X + 6.4, 3.2, 5.6, 'PriceBox', 'ok', 2, { h: 1.1 });
      ed(S, 'e0', [X + 5.0, 1.9], [X + 2.8, 3.2], 2); ed(S, 'e1', [X + 7.0, 1.9], [X + 9.2, 3.2], 2);
      lbl(S, 'n2', X, 6.4, ['위는 데이터·상태, 아래는 표시만', 'data above, display-only below'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'pd', X + 9.4, 2.15, 'price', 'm a', 3, { off: 4 }); lbl(S, 'pu', X + 6.0, 2.15, 'onBuy', 'm w', 3, { off: 4 });
      lbl(S, 'n3', X, 6.4, ['데이터는 props로 내려가고 이벤트는 위로', 'data flows down as props, events go up'], 'w', 3, { off: 4, w: 12 });
      tbox(S, 'cd', X, 4.8, 12.0, 1.3, '<Card>', 'accent', 4, { tc: 'a' }); nd(S, 'ch', X + 2.4, 5.0, 4.2, 'Header', 'line', 4, { h: .9 }); nd(S, 'cb', X + 7.0, 5.0, 4.6, 'Body', 'line', 4, { h: .9 });
      lbl(S, 'n4', X, 6.6, ['조합: 조각을 끼워 넣는 유연한 API', 'composition: a flexible API of slots'], 'a', 4, { w: 12 });
    },
    notes: [['데이터 요청, 상태, 화면, 이벤트가 한 컴포넌트에 몰리면 고칠 때마다 전체를 이해해야 하고 재사용도 어려워요', 'when fetching, state, UI and events pile into one component, every change needs the whole picture and nothing is reusable'], ['데이터와 상태를 다루는 위쪽 컴포넌트와, props만 받아 그리는 아래쪽 컴포넌트로 역할을 나눠요', 'split roles between upper components that own data and state and lower components that render props'], ['데이터는 props로 내려가고, 사용자의 행동은 onBuy 같은 콜백으로 위에 알려요 · 단방향이라 흐름을 추적하기 쉬워요', 'data flows down as props and user actions report up through callbacks such as onBuy, a one-way flow that is easy to trace'], ['Card.Header, Card.Body처럼 조각을 끼워 넣는 조합(composition) 방식은 props가 수십 개로 늘어나는 걸 막아요', 'compound components such as Card.Header and Card.Body favor composition and keep props from multiplying']],
    fin: [['컴포넌트 설계: 하나의 역할, 단방향 데이터 흐름, 상속보다 조합 · 작게 나누되 너무 잘게 쪼개지는 않아요', 'component design means one role each, one-way data flow and composition over inheritance; split small, but not into dust', 'fex-xs fex-a'], ['props가 여러 단계를 건너가면(prop drilling) 컨텍스트나 조합을 고려해요', 'when props tunnel through many levels, consider context or composition'], ['UI 상태는 쓰는 곳 가까이에 둬요', 'keep UI state close to where it is used']],
    caps: [['거대한 컴포넌트', 'The giant component'], ['역할 나누기', 'Splitting by role'], ['props와 이벤트', 'Props and events'], ['조합', 'Composition'], ['컴포넌트 설계', 'Component design']]
  });
}

function sDesignSystem() {
  return CW('fe-design-system', {
    code: [['// tokens.json → CSS 변수 · TS 상수', '// tokens.json → CSS variables, TS constants'], '--color-primary: #2563eb;', '--space-4: 1rem;  --radius-md: .5rem;', '<Button variant="primary" size="md">', '<Stack gap="4"><Input /><Button /></Stack>', ['// Storybook: 상태별 스토리', '// Storybook: a story per state'], 'export const Disabled = {', '  args: { disabled: true } };'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 1, 'warn'], [5, 3]],
    draw: (S) => {
      const X = 19.4, L = [[['페이지', 'Pages'], 'line', 4], [['패턴: 폼 · 카드', 'Patterns: form, card'], 'warn', 3], [['기본 요소: Button · Input', 'Primitives: Button, Input'], 'ok', 2], [['토큰: 색 · 간격 · 글자', 'Tokens: color, space, type'], 'accent', 1]];
      L.forEach(([t, c, st], i) => nd(S, 'L' + i, X + (3 - i) * .9 + .3, .8 + i * 1.5, 12.0 - (3 - i) * 1.8 - .6, t, c, st, { h: 1.2 }));
      lbl(S, 'n1', X, 7.2, ['디자인 결정을 이름 붙은 값으로', 'design decisions as named values'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 7.2, ['토큰만 쓰는 기본 컴포넌트', 'primitives built only from tokens'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 7.2, ['기본 요소를 조합한 패턴', 'patterns composed of primitives'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.2, ['Storybook으로 목록화 · 문서 · 시각 테스트', 'Storybook catalogs, documents and tests them'], 'a', 4, { w: 12 });
    },
    notes: [['색, 간격, 글자 크기 같은 디자인 결정을 --color-primary 같은 이름 붙은 토큰으로 만들어 코드와 디자인 도구가 함께 써요', 'design decisions such as color, spacing and type sizes become named tokens such as --color-primary, shared by code and design tools'], ['Button, Input 같은 기본 요소는 토큰만 사용하고 variant, size 같은 정해진 선택지만 열어 둬요', 'primitives such as Button and Input use only tokens and expose fixed choices such as variant and size'], ['기본 요소를 조합해 폼, 카드 같은 패턴을 만들고, 페이지는 패턴을 배치하기만 해요', 'primitives compose into patterns such as forms and cards, and pages just arrange patterns'], ['Storybook에서 컴포넌트를 상태별 스토리로 모아 보고, 문서와 시각 회귀 테스트까지 한곳에서 해요', 'Storybook gathers components as per-state stories, doubling as documentation and visual regression tests']],
    fin: [['디자인 시스템: 토큰 → 기본 요소 → 패턴 → 페이지로 쌓아 올린 공유 UI 언어 · 일관성과 속도를 함께 얻어요', 'a design system is a shared UI language built up from tokens to primitives, patterns and pages, giving consistency and speed', 'fex-xs fex-a'], ['접근성을 기본 요소에 넣어 두면 모든 화면이 함께 좋아져요', 'accessibility built into primitives improves every screen'], ['예외 요청은 새 variant로 시스템에 흡수해요', 'absorb one-off requests as new variants']],
    caps: [['토큰', 'Tokens'], ['기본 요소', 'Primitives'], ['패턴', 'Patterns'], ['Storybook', 'Storybook'], ['디자인 시스템', 'Design systems']]
  });
}

function sFolderStructure() {
  return CW('fe-folder-structure', {
    code: ['src/', ['├─ app/          // 라우팅 · 전역 설정', '├─ app/          // routing, global setup'], '├─ features/', ['│  ├─ cart/      // 장바구니 전부', '│  ├─ cart/      // everything for the cart'], '│  │  ├─ ui/  api/  model/', ['│  │  └─ index.ts // 공개 API', '│  │  └─ index.ts // public API'], '│  └─ auth/', ['└─ shared/       // 공용 UI · 유틸', '└─ shared/       // shared UI, utilities']],
    hl: [[0, 8], [2, 5, 'ok'], [5, 1, 'warn'], [1, 1]],
    draw: (S) => {
      const X = 19.4;
      const TX = [0, 3.9, 6.7, 9.5], TW = [3.6, 2.5, 2.5, 2.5]; ['components/', 'hooks/', 'utils/', 'api/'].forEach((t, i) => nd(S, 't' + i, X + TX[i], .8, TW[i], t, 'line', 1, { off: 2, h: 1.0 }));
      [0, 1, 2, 3].forEach(i => sw(S, 'tc' + i, X + TX[i] + .3, 2.1, TW[i] - .6, .5, tint('warn', 50), 1, { off: 2 })); lbl(S, 'n1', X, 3.2, ['종류별 폴더: 장바구니 코드가 네 곳에 흩어져요', 'by type: cart code scatters across four folders'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'ap', X + 3.0, .8, 6.0, 'app', 'accent', 2, { h: 1.0 }); nd(S, 'fc', X, 2.6, 5.6, 'features/cart', 'warn', 2, { h: 1.0 }); nd(S, 'fa', X + 6.4, 2.6, 5.6, 'features/auth', 'warn', 2, { h: 1.0 }); nd(S, 'sh', X + 3.0, 4.4, 6.0, 'shared', 'ok', 2, { h: 1.0 });
      arw(S, 'd0', [X + 5.0, 1.85], [X + 2.8, 2.55], 2); arw(S, 'd1', [X + 7.0, 1.85], [X + 9.2, 2.55], 2); arw(S, 'd2', [X + 2.8, 3.65], [X + 5.0, 4.35], 2); arw(S, 'd3', [X + 9.2, 3.65], [X + 7.0, 4.35], 2);
      lbl(S, 'n2', X, 6.0, ['기능별 폴더 · 의존은 아래로만', 'by feature; dependencies point down only'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.0, ['index.ts만 바깥에 공개 · 내부는 숨김', 'only index.ts is public; internals stay hidden'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'x', [X + 5.65, 3.1], [X + 6.35, 3.1], 4, { color: 'danger' }); lbl(S, 'xl', X + 5.6, 3.6, '✗', 'r', 4); lbl(S, 'n4', X, 6.0, ['기능끼리 직접 import 금지 · 린트로 강제', 'no feature-to-feature imports, enforced by lint'], 'r', 4, { w: 12 });
    },
    notes: [['components/, hooks/, utils/처럼 종류별로 나누면 장바구니 하나를 고칠 때도 여러 폴더를 오가야 해요', 'grouping by type, as in components/, hooks/ and utils/, sends you across many folders to change even the cart'], ['features/cart처럼 기능별로 모으고 app → features → shared 방향으로만 의존하게 해요', 'grouping by feature, as in features/cart, with dependencies flowing only app → features → shared'], ['각 기능은 index.ts로 공개할 것만 내보내고 나머지는 내부 구현으로 숨겨요', 'each feature exports only its public surface through index.ts and hides the rest'], ['기능끼리 서로 직접 import하면 얽히기 시작하니 ESLint 경계 규칙으로 막아요', 'features importing each other directly start to tangle, so ESLint boundary rules block it']],
    fin: [['폴더 구조: 종류보다 기능 단위로 모으고 의존 방향을 한쪽으로 고정해요(Feature-Sliced Design 등)', 'folder structure groups code by feature rather than type and fixes the dependency direction, as in Feature-Sliced Design', 'fex-xs fex-a'], ['함께 바뀌는 코드는 함께 둬요(colocation)', 'keep code that changes together, together (colocation)'], ['규칙은 문서보다 린트로 지켜요', 'enforce rules with lint, not just docs']],
    caps: [['종류별 구조', 'Grouping by type'], ['기능별 구조', 'Grouping by feature'], ['공개 API', 'Public APIs'], ['경계 지키기', 'Guarding boundaries'], ['폴더 구조', 'Folder structure']]
  });
}

function sMonorepo() {
  return CW('fe-monorepo', {
    code: ['apps/web   apps/admin', 'packages/ui   packages/api-client', ['# pnpm-workspace.yaml', '# pnpm-workspace.yaml'], "packages: ['apps/*', 'packages/*']", '"@acme/ui": "workspace:*"', 'turbo run build --filter=web...', ['# 바뀐 것만 빌드 + 원격 캐시', '# build only what changed, remote cache']],
    hl: [[0, 2], [2, 3, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'w', X, .8, 5.6, 'apps/web', 'accent', 1, { h: 1.1 }); nd(S, 'a', X + 6.4, .8, 5.6, 'apps/admin', 'accent', 1, { h: 1.1 });
      nd(S, 'u', X, 3.2, 5.6, 'pkg/ui', 'ok', 1, { h: 1.1 }); nd(S, 'c', X + 6.4, 3.2, 5.6, 'pkg/api-client', 'ok', 1, { h: 1.1 });
      [[2.8, 2.8], [2.8, 9.2], [9.2, 2.8], [9.2, 9.2]].forEach(([a, b], i) => arw(S, 'e' + i, [X + a, 1.95], [X + b, 3.15], 2));
      lbl(S, 'n1', X, 6.2, ['한 저장소에 여러 앱과 공유 패키지', 'many apps and shared packages in one repo'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.2, ['workspace:*로 로컬 패키지를 바로 연결', 'workspace:* links local packages directly'], 'g', 2, { off: 3, w: 12 });
      tsets(S, 'u', [[3, 'warn', 40]]); tsets(S, 'w', [[3, 'warn', 40]]); tsets(S, 'a', [[3, 'warn', 40]]); lbl(S, 'n3', X, 6.2, ['ui를 고치면 영향받는 앱만 다시 빌드', 'editing ui rebuilds only affected apps'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'hit', X + 6.4, 4.6, 5.6, 'cache hit ✓', 'ok', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.2, ['결과를 캐시해 팀·CI가 함께 재사용', 'cached results are shared by team and CI'], 'a', 4, { w: 12 });
    },
    notes: [['모노레포는 웹, 관리자 앱과 UI·API 클라이언트 같은 공유 패키지를 한 저장소에서 함께 관리해요', 'a monorepo keeps apps such as web and admin alongside shared packages such as UI and an API client in one repository'], ['pnpm 워크스페이스는 "workspace:*"로 로컬 패키지를 바로 연결해서 배포 없이 수정이 즉시 반영돼요', 'pnpm workspaces link local packages through "workspace:*", so changes apply instantly without publishing'], ['Turborepo나 Nx는 의존 그래프를 알아서 바뀐 패키지와 그것에 영향받는 앱만 다시 빌드·테스트해요', 'Turborepo or Nx understand the dependency graph and rebuild or test only changed packages and the apps they affect'], ['작업 결과를 해시로 캐시하고 원격 캐시로 공유하면, 누군가 이미 빌드한 것은 다시 하지 않아요', 'task results are cached by hash and shared remotely, so nothing someone already built is built again']],
    fin: [['모노레포: 여러 앱과 패키지를 한 저장소에 두고, 의존 그래프 기반으로 필요한 작업만 실행해요', 'a monorepo holds many apps and packages in one repository and runs only the tasks the dependency graph requires', 'fex-xs fex-a'], ['한 번의 PR로 라이브러리와 사용처를 함께 바꿔요(원자적 변경)', 'one PR changes a library and its users together (atomic changes)'], ['빌드 도구와 권한 관리 같은 운영 부담도 함께 늘어요', 'tooling and access management overhead grow too']],
    caps: [['앱과 패키지', 'Apps and packages'], ['워크스페이스', 'Workspaces'], ['영향받는 것만', 'Only what is affected'], ['원격 캐시', 'Remote caching'], ['모노레포', 'Monorepos']]
  });
}

function sMicroFrontends() {
  return CW('fe-micro-frontends', {
    code: [['// shell(호스트) 앱', '// the shell (host) app'], "const Cart = lazy(() => import('cart/App'));", ['// 장바구니 팀의 앱(remote) 설정', '// the cart team’s app (remote) config'], "exposes: { './App': './src/App' },", 'shared: { react: { singleton: true } },', ['// 팀마다 독립 배포 · 런타임에 합성', '// independent deploys, composed at run time']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1]],
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'sh', X, .6, 12.0, 4.6, 'shell', 'accent', 1, { tc: 'a' }); nd(S, 'hd', X + .4, 1.4, 11.2, 'Header', 'line', 1, { h: .9 });
      nd(S, 'p', X + .4, 2.6, 5.4, ['상품 (팀 A)', 'Products (team A)'], 'ok', 2, { h: 2.2 }); nd(S, 'c', X + 6.2, 2.6, 5.4, ['장바구니 (팀 B)', 'Cart (team B)'], 'warn', 2, { h: 2.2 });
      lbl(S, 'n1', X, 6.0, ['shell이 다른 팀의 앱을 런타임에 불러와요', 'the shell loads other teams’ apps at run time'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.0, ['각 팀이 자기 부분을 따로 배포', 'each team deploys its part independently'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'r', X + 3.0, 5.6, 6.0, ['react (1개만)', 'react (one copy)'], 'line', 3, { off: 4, h: .9 }); lbl(S, 'n3', X, 6.9, ['React 같은 공통 라이브러리는 하나만 공유', 'shared libraries such as React load once'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.0, ['대가: 복잡도 · 중복 · 일관성 관리', 'cost: complexity, duplication, consistency'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 7.1, ['팀과 조직이 클 때만 고려', 'worth it only for large organizations'], '', 4, { w: 12 });
    },
    notes: [['마이크로 프론트엔드는 큰 화면을 팀별 앱으로 나누고, shell(호스트) 앱이 런타임에 조각을 불러와 하나로 합쳐요', 'micro frontends split a large UI into per-team apps that a shell (host) app loads and composes at run time'], ['Module Federation의 exposes로 장바구니 팀이 앱 조각을 공개하면 다른 팀 배포와 상관없이 따로 배포할 수 있어요', 'with Module Federation’s exposes, the cart team publishes its app and deploys independently of other teams'], ['React처럼 여러 조각이 함께 쓰는 라이브러리는 singleton으로 공유해 두 번 내려받거나 충돌하지 않게 해요', 'libraries used by several pieces, such as React, are shared as singletons to avoid double downloads and conflicts'], ['대신 빌드·배포 구성이 복잡해지고, 디자인과 버전을 맞추는 비용이 커요 · 팀이 많을 때만 이득이에요', 'in return, build and deploy setup grows complex and keeping design and versions aligned costs more; it pays off only with many teams']],
    fin: [['마이크로 프론트엔드: 프론트엔드를 팀 단위로 독립 개발·배포하는 아키텍처 · 기술보다 조직 문제를 푸는 도구', 'micro frontends let teams develop and deploy parts of a frontend independently, an architecture that solves organizational rather than technical problems', 'fex-xs fex-a'], ['iframe, Web Components, 서버 조합 방식도 있어요', 'iframes, Web Components and server-side composition are alternatives'], ['작은 팀은 모노레포 + 모듈 경계로 충분해요', 'small teams do fine with a monorepo and module boundaries']],
    caps: [['shell 앱', 'The shell app'], ['독립 배포', 'Independent deploys'], ['공유 의존성', 'Shared dependencies'], ['대가', 'The costs'], ['마이크로 프론트엔드', 'Micro frontends']]
  });
}

function sIslands() {
  return CW('fe-islands', {
    code: [['---  // Astro: 기본은 정적 HTML', '---  // Astro: static HTML by default'], ['<Header />                  // JS 없음', '<Header />                  // no JS'], ['<Search client:load />      // 바로 활성', '<Search client:load />      // active at once'], ['<Comments client:visible /> // 보일 때', '<Comments client:visible /> // when visible'], '<Footer />'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [0, 5]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      frame(S, 'pg', X, .6, 7.0, 7.6, 'ink-3', 0, { w: .08 });
      nd(S, 'h', X + .3, .9, 6.4, 'Header', 'line', 0, { h: .9 }); nd(S, 's', X + .3, 2.1, 6.4, 'Search', 'line', 0, { h: 1.1 }); sw(S, 'a', X + .3, 3.5, 6.4, 2.0, tint('line', 20), 0); cl(S, 'al', X + .3, 4.2, 6.4, ['정적 본문', 'static article'], 'm', 0); nd(S, 'c', X + .3, 5.8, 6.4, 'Comments', 'line', 0, { h: 1.1 }); nd(S, 'f', X + .3, 7.1, 6.4, 'Footer', 'line', 0, { h: .9 });
      lbl(S, 'n1', X, 8.8, ['서버가 전부 HTML로 · JS 0KB에서 시작', 'all HTML from the server, starting at 0 KB of JS'], 'a', 1, { off: 2, w: 12 });
      tsets(S, 's', [[2, 'ok', 45]]); lbl(S, 'n2', X, 8.8, ['상호작용이 필요한 섬만 하이드레이션', 'only interactive islands hydrate'], 'g', 2, { off: 3, w: 12 });
      tsets(S, 'c', [[3, 'warn', 45]]); lbl(S, 'n3', X, 8.8, ['client:visible: 화면에 보일 때 활성화', 'client:visible activates on scroll-in'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'jt', X + 7.6, .7, ['보내는 JS', 'JS shipped'], 'm', 4); sw(S, 'j1', X + 7.6, 1.7, 4.2, .8, 'var(--danger)', 4); lbl(S, 'j1l', X + 7.6, 2.6, ['전체 하이드레이션', 'full hydration'], 'm', 4); sw(S, 'j2', X + 7.6, 3.6, 1.2, .8, 'var(--ok)', 4); lbl(S, 'j2l', X + 7.6, 4.5, ['아일랜드', 'islands'], 'm', 4);
      lbl(S, 'n4', X, 8.8, ['콘텐츠 중심 사이트에 특히 유리', 'ideal for content-heavy sites'], 'a', 4, { w: 12 });
    },
    notes: [['아일랜드 아키텍처는 페이지 전체를 서버에서 정적 HTML로 만들고 기본적으로 JavaScript를 보내지 않아요', 'islands architecture renders the whole page as static HTML on the server and ships no JavaScript by default'], ['검색창처럼 상호작용이 필요한 부분(섬)만 골라 JS를 붙여요 · client:load는 바로 활성화해요', 'only interactive parts (islands), such as search, get JavaScript, and client:load activates them immediately'], ['client:visible은 댓글처럼 아래쪽 섬을 화면에 들어올 때 활성화해서 처음 로딩을 더 가볍게 해요', 'client:visible activates lower islands such as comments only when they scroll into view, lightening the initial load'], ['페이지 전체를 하이드레이션하는 방식보다 보내는 JS가 훨씬 적어서 블로그·문서·쇼핑 상품 페이지에 잘 맞아요', 'compared with hydrating the whole page, far less JS ships, which suits blogs, docs and product pages']],
    fin: [['아일랜드 아키텍처: 정적 HTML 바다에 상호작용 섬만 띄우는 부분 하이드레이션 방식(Astro 등)', 'islands architecture floats interactive islands in a sea of static HTML, a partial hydration approach used by Astro and others', 'fex-xs fex-a'], ['React 서버 컴포넌트도 “필요한 곳만 클라이언트”라는 같은 방향이에요', 'React Server Components share the same idea: client code only where needed'], ['Qwik의 재개(resumability)는 하이드레이션 자체를 없애는 방식이에요', 'Qwik’s resumability removes hydration altogether']],
    caps: [['정적 HTML', 'Static HTML'], ['상호작용 섬', 'Interactive islands'], ['보일 때 활성화', 'Activate when visible'], ['보내는 JS 비교', 'Comparing JS shipped'], ['아일랜드 아키텍처', 'Islands architecture']]
  });
}

function sWebComponents() {
  return CW('fe-web-components', {
    code: ['class UserCard extends HTMLElement {', '  connectedCallback() {', '    const root =', "      this.attachShadow({ mode: 'open' });", ['    root.innerHTML = TEMPLATE; // style+slot', '    root.innerHTML = TEMPLATE; // style+slot'], '  }', '}', "customElements.define('user-card', UserCard);", '<user-card>', '  <span slot="name">Kim</span>', '</user-card>'],
    hl: [[0, 2], [2, 3, 'ok'], [8, 3, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'tag', X, .8, 12.0, '<user-card>', 'accent', 1, { h: 1.1 }); lbl(S, 'n1', X, 7.0, ['HTML 태그처럼 쓰는 나만의 요소', 'your own element, used like an HTML tag'], 'a', 1, { off: 2, w: 12 });
      frame(S, 'sd', X + 1.0, 2.4, 10.0, 3.6, 'ok', 2, { dash: 1, w: .12 }); lbl(S, 'sdl', X + 1.3, 2.55, 'shadow root', 'm g', 2); nd(S, 'gs', X - .6, 3.4, 1.6, 'p{}', 'danger', 2, { off: 3, h: 1.0 }); lbl(S, 'gx', X + .1, 4.5, '✗', 'r', 2, { off: 3 });
      lbl(S, 'n2', X, 7.0, ['Shadow DOM: 안팎의 CSS가 서로 새지 않아요', 'Shadow DOM: CSS does not leak in or out'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'sl', X + 2.0, 3.6, 8.0, 'slot name="name" ← Kim', 'warn', 3, { h: 1.1 }); lbl(S, 'n3', X, 7.0, ['slot: 바깥 내용을 정해진 자리에 꽂아요', 'slots place outside content into set spots'], 'w', 3, { off: 4, w: 12 });
      ['React', 'Vue', 'HTML'].forEach((t, i) => nd(S, 'fw' + i, X + i * 4.1, 6.3, 3.8, t, 'line', 4, { h: .9 })); lbl(S, 'n4', X, 7.6, ['프레임워크와 상관없이 어디서나', 'works with any framework, or none'], 'a', 4, { w: 12 });
    },
    notes: [['customElements.define으로 등록한 클래스는 <user-card>처럼 HTML 태그로 쓸 수 있어요 · 브라우저 표준이라 라이브러리가 필요 없어요', 'a class registered with customElements.define becomes an HTML tag such as <user-card>, a browser standard needing no library'], ['attachShadow로 만든 Shadow DOM 안의 스타일은 밖으로 새지 않고, 바깥 CSS도 안으로 들어오지 않아요', 'styles inside a Shadow DOM created by attachShadow never leak out, and outside CSS never leaks in'], ['slot은 바깥에서 넣은 내용을 컴포넌트 안의 정해진 자리에 보여줘요', 'slots project content supplied from outside into set places inside the component'], ['표준 기술이라 React, Vue, 순수 HTML 어디서든 같은 컴포넌트를 쓸 수 있어 디자인 시스템 공유에 좋아요', 'as a standard, the same component works in React, Vue or plain HTML, handy for sharing a design system']],
    fin: [['Web Components: Custom Elements + Shadow DOM + 템플릿·slot으로 만드는 브라우저 표준 컴포넌트', 'Web Components are browser-standard components built from Custom Elements, Shadow DOM, templates and slots', 'fex-xs fex-a'], ['Lit 같은 작은 라이브러리가 작성을 편하게 해 줘요', 'small libraries such as Lit make authoring easier'], ['SSR과 폼 연동은 추가 작업이 필요해요', 'SSR and form integration need extra work']],
    caps: [['커스텀 요소', 'Custom elements'], ['Shadow DOM', 'Shadow DOM'], ['slot', 'Slots'], ['어디서나 쓰기', 'Use anywhere'], ['Web Components', 'Web Components']]
  });
}
/* ===== Frontend · 2. data and state ===== */
function sServerState() {
  return CW('fe-server-state', {
    code: ['const { data, isPending } = useQuery({', "  queryKey: ['todos', { page }],", '  queryFn: () => api.todos(page),', '  staleTime: 60_000,', '});', ['// 같은 키 → 요청 1번, 결과 공유', '// same key → one request, shared result'], 'queryClient.invalidateQueries({', "  queryKey: ['todos'] });"],
    hl: [[0, 3], [5, 1, 'ok'], [3, 1, 'warn'], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'c1', X, .8, 3.6, 'TodoList', 'line', 1, { h: 1.0 }); nd(S, 'c2', X, 2.2, 3.6, 'TodoCount', 'line', 1, { h: 1.0 });
      nd(S, 'ca', X + 5.0, 1.4, 3.4, ['캐시', 'cache'], 'accent', 1, { h: 1.2 }); nd(S, 'sv', X + 9.4, 1.4, 2.6, 'API', 'line', 1, { h: 1.2 });
      arw(S, 'a0', [X + 3.65, 1.3], [X + 4.95, 1.8], 1); arw(S, 'a1', [X + 3.65, 2.7], [X + 4.95, 2.2], 1); arw(S, 'a2', [X + 8.45, 2.0], [X + 9.35, 2.0], 1);
      lbl(S, 'n1', X, 6.0, ['서버 데이터를 키로 캐시 · 중복 요청 제거', 'server data cached by key, requests deduped'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'k', X + 4.6, 2.9, 4.2, "['todos', 1]", 'accent', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.0, ['같은 키를 쓰는 곳은 한 결과를 공유', 'components with the same key share one result'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'fr', X, 4.0, 7.2, .7, tint('ok', 50), 3, { off: 4 }); sw(S, 'st', X + 7.2, 4.0, 4.8, .7, tint('warn', 50), 3, { off: 4 }); lbl(S, 'frl', X, 4.8, ['신선 (60초)', 'fresh (60 s)'], 'm g', 3, { off: 4 }); lbl(S, 'stl', X + 7.2, 4.8, ['오래됨 → 재검증', 'stale → refetch'], 'm w', 3, { off: 4 });
      lbl(S, 'n3', X, 6.0, ['오래되면 보여주면서 뒤에서 다시 받기', 'stale data shows while refetching behind'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'iv', X + 5.0, 2.9, 3.4, 'invalidate', 'danger', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.0, ['변경 후 키를 무효화 → 자동으로 새로고침', 'invalidate keys after changes to refresh'], 'a', 4, { w: 12 });
    },
    notes: [['서버에서 온 데이터는 UI 상태와 성격이 달라요 · TanStack Query 같은 도구가 queryKey로 캐시하고 중복 요청을 하나로 합쳐요', 'server data differs from UI state; tools such as TanStack Query cache it by queryKey and merge duplicate requests'], ['TodoList와 TodoCount가 같은 키를 쓰면 요청은 한 번만 나가고 결과를 함께 써요', 'when TodoList and TodoCount use the same key, one request goes out and both share the result'], ['staleTime 동안은 신선한 데이터로 보고, 지나면 화면에는 캐시를 보여주면서 뒤에서 다시 받아요(stale-while-revalidate)', 'data counts as fresh during staleTime, after which the cache stays on screen while a background refetch runs (stale-while-revalidate)'], ['데이터를 바꾼 뒤 invalidateQueries로 관련 키를 무효화하면 그 키를 쓰는 화면이 자동으로 새로 받아요', 'after a change, invalidateQueries marks related keys stale, and screens using them refetch automatically']],
    fin: [['서버 상태 관리: 원격 데이터를 키 기반 캐시로 다루며 로딩·에러·재시도·재검증을 라이브러리에 맡겨요', 'server state management treats remote data as a keyed cache, leaving loading, errors, retries and revalidation to a library', 'fex-xs fex-a'], ['전역 스토어(Redux 등)에는 진짜 클라이언트 상태만 남겨요', 'keep only true client state in global stores such as Redux'], ['창에 다시 포커스할 때도 자동으로 재검증해요', 'it also revalidates when the window regains focus']],
    caps: [['키 기반 캐시', 'A keyed cache'], ['결과 공유', 'Sharing results'], ['신선함과 재검증', 'Freshness and revalidation'], ['무효화', 'Invalidation'], ['서버 상태 관리', 'Server state management']]
  });
}

function sOptimistic() {
  return CW('fe-optimistic', {
    code: ['useMutation({', '  mutationFn: toggleLike,', '  onMutate: async (id) => {', '    const prev = qc.getQueryData(key);', '    qc.setQueryData(key, like(prev, id));', '    return { prev };', '  },', '  onError: (e, id, ctx) =>', '    qc.setQueryData(key, ctx.prev),', '  onSettled: () => qc.invalidateQueries(…),', '});'],
    hl: [[2, 5], [1, 1, 'ok'], [7, 2, 'danger'], [9, 1]],
    draw: (S) => {
      const X = 19.4;
      T(S, 'hrt', X + 1.0, 1.0, '♡', 'fex-l', 0); S.set('hrt', 0, { opacity: '1' }); S.set('hrt', 1, { opacity: '0' }); S.set('hrt', 3, { opacity: '1' }); S.set('hrt', 4, { opacity: '0' });
      T(S, 'hf', X + 1.0, 1.0, '♥', 'fex-l fex-r', 1, { off: 3 }); T(S, 'hf2', X + 1.0, 1.0, '♥', 'fex-l fex-r', 4);
      lbl(S, 'cnt', X + 2.4, 1.15, '41 → 42', 'm', 1, { off: 3 }); lbl(S, 'cnt3', X + 2.4, 1.15, '41', 'm r', 3, { off: 4 }); lbl(S, 'cnt4', X + 2.4, 1.15, '42', 'm g', 4);
      lbl(S, 'n1', X, 4.6, ['누르는 즉시 화면부터 바꿔요(서버 응답 전)', 'the UI changes instantly, before the server replies'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'rq', X + 5.0, 1.2, 7.0, .5, tint('line', 30), 2, { off: 3 }); sw(S, 'rqp', X + 5.0, 1.2, 4.0, .5, 'var(--accent)', 2, { off: 3 }); lbl(S, 'rql', X + 5.0, 1.9, ['요청 중…', 'request in flight…'], 'm', 2, { off: 3 });
      lbl(S, 'n2', X, 4.6, ['요청은 뒤에서 · 사용자는 기다리지 않아요', 'the request runs behind; no waiting'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'er', X + 5.0, 1.0, 7.0, ['실패 → 되돌리고 알림', 'failed → roll back, notify'], 'danger', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 4.6, ['onError에서 저장해 둔 이전 값으로 복구', 'onError restores the saved previous value'], 'r', 3, { off: 4, w: 12 });
      nd(S, 'ok', X + 5.0, 1.0, 7.0, ['완료 → 서버 값으로 맞추기', 'settled → sync with server'], 'ok', 4, { h: 1.1 }); lbl(S, 'n4', X, 4.6, ['끝나면 무효화해 서버의 진짜 값과 동기화', 'invalidate at the end to match the server'], 'a', 4, { w: 12 });
    },
    notes: [['좋아요를 누르면 서버 응답을 기다리지 않고 캐시를 먼저 바꿔 화면에 즉시 반영해요 · 이전 값은 따로 보관해요', 'tapping like updates the cache and the screen immediately without waiting for the server, keeping the previous value aside'], ['실제 요청은 뒤에서 진행돼서 사용자는 기다림 없이 다음 행동을 해요', 'the real request continues in the background, so users move on without waiting'], ['요청이 실패하면 onError에서 보관한 이전 값으로 되돌리고 실패를 알려요', 'if the request fails, onError rolls back to the saved value and reports the failure'], ['성공이든 실패든 onSettled에서 무효화해 서버의 진짜 값으로 맞춰요 · React 19에는 useOptimistic 훅도 있어요', 'either way, onSettled invalidates to match the server’s real value, and React 19 also offers a useOptimistic hook']],
    fin: [['낙관적 업데이트: 성공할 거라 보고 화면을 먼저 바꾼 뒤, 실패하면 되돌리는 체감 속도 기법', 'optimistic updates change the UI first assuming success and roll back on failure, a perceived-speed technique', 'fex-xs fex-a'], ['실패 가능성이 낮고 되돌리기 쉬운 동작에 써요', 'use it for actions that rarely fail and are easy to undo'], ['결제처럼 중요한 동작에는 쓰지 않아요', 'avoid it for critical actions such as payments']],
    caps: [['즉시 반영', 'Instant feedback'], ['뒤에서 요청', 'Requesting in the background'], ['실패 시 되돌리기', 'Rolling back on failure'], ['서버와 맞추기', 'Syncing with the server'], ['낙관적 업데이트', 'Optimistic updates']]
  });
}

function sForms() {
  return CW('fe-forms', {
    code: ['const schema = z.object({', '  email: z.email(),', '  pw: z.string().min(8),', '});', 'const { register, handleSubmit, formState } =', '  useForm({ resolver: zodResolver(schema) });', "<input {...register('email')} />", '{formState.errors.email?.message}'],
    hl: [[0, 4], [4, 2, 'ok'], [6, 2, 'warn'], [0, 4]],
    draw: (S) => {
      const X = 19.4;
      ['email', 'password'].forEach((t, i) => { lbl(S, 'fl' + i, X, .6 + i * 2.7, t, 'm', 0); sw(S, 'fi' + i, X, 1.3 + i * 2.7, 12.0, 1.1, 'var(--ui)', 0, { css: 'border:.08em solid var(--line)', r: .3 }); });
      T(S, 'v0', X + .4, 1.5, 'kim@', 'cz-mono fex-s', 1); T(S, 'v1', X + .4, 4.2, '••••', 'cz-mono fex-s', 1);
      lbl(S, 'n1', X, 6.6, ['규칙을 스키마 하나에 · 타입도 자동', 'rules in one schema, types included'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['비제어 입력: 타이핑마다 리렌더 안 해요', 'uncontrolled inputs avoid re-renders per key'], 'g', 2, { off: 3, w: 12 });
      S.set('fi0', 3, { 'border-color': 'var(--danger)' }); S.set('fi0', 0, { 'border-color': 'var(--line)' }); lbl(S, 'e0', X, 2.5, ['이메일 형식이 아니에요', 'not a valid email'], 'r', 3, { off: 4 }); S.set('fi0', 4, { 'border-color': 'var(--line)' }); S.set('fi1', 4, { 'border-color': 'var(--line)' }); S.set('fi1', 3, { 'border-color': 'var(--danger)' }); S.set('fi1', 0, { 'border-color': 'var(--line)' }); lbl(S, 'e1', X, 5.2, ['8자 이상', 'at least 8 characters'], 'r', 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['blur·제출 때 검사하고 필드 옆에 표시', 'validate on blur or submit, show by the field'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'sv', X, 5.3, 12.0, ['같은 스키마로 서버에서도 다시 검사', 'the server re-validates with the same schema'], 'accent', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.6, ['클라이언트 검증은 UX, 보안은 서버', 'client checks are UX; security is the server'], 'a', 4, { w: 12 });
    },
    notes: [['Zod 같은 스키마로 필드 규칙을 한곳에 정의하면 검증과 TypeScript 타입을 함께 얻어요', 'defining field rules in one schema such as Zod yields both validation and TypeScript types'], ['React Hook Form은 비제어 입력을 써서 글자를 칠 때마다 폼 전체를 리렌더하지 않아 큰 폼에서도 빨라요', 'React Hook Form uses uncontrolled inputs, avoiding a full re-render on every keystroke and staying fast on large forms'], ['입력이 끝날 때(blur)나 제출할 때 검사하고, 오류는 해당 필드 바로 옆에 구체적인 문장으로 보여줘요', 'validate on blur or submit, and show specific messages right next to the field'], ['클라이언트 검증은 빠른 피드백을 위한 것이에요 · 같은 스키마로 서버에서 반드시 다시 검사해야 안전해요', 'client validation is for fast feedback; the server must re-validate with the same schema to stay safe']],
    fin: [['폼 처리: 스키마 기반 검증 + 비제어 입력 + 필드별 오류 표시 · 서버 재검증은 필수', 'form handling combines schema-based validation, uncontrolled inputs and per-field errors, with mandatory server re-validation', 'fex-xs fex-a'], ['label과 aria-describedby로 오류를 스크린 리더에 연결해요', 'connect errors to screen readers with label and aria-describedby'], ['React 19의 form action과 useActionState도 함께 써요', 'React 19 form actions and useActionState fit in too']],
    caps: [['스키마', 'Schemas'], ['비제어 입력', 'Uncontrolled inputs'], ['오류 표시', 'Showing errors'], ['서버 재검증', 'Server re-validation'], ['폼 처리', 'Form handling']]
  });
}

function sUrlState() {
  return CW('fe-url-state', {
    code: [['// /products?q=shoe&sort=price&page=2', '// /products?q=shoe&sort=price&page=2'], 'const [params, setParams] = useSearchParams();', "const q = params.get('q') ?? '';", "setParams({ q, sort: 'price', page: '1' });", ['// 새로고침 · 공유 · 뒤로 가기에도 유지', '// survives reloads, sharing and Back']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      sw(S, 'ub', X, .8, 12.0, 1.1, 'var(--ui)', 0, { r: .55, css: 'border:.08em solid var(--line)' }); T(S, 'u1', X + .4, 1.0, '/products?q=shoe&sort=price&page=2', 'cz-mono fex-xs', 0);
      ['q: shoe', ['가격순', 'by price'], ['2쪽', 'page 2']].forEach((t, i) => nd(S, 'f' + i, X + i * 4.1, 2.6, 3.8, t, 'accent', 1, { h: 1.0 }));
      lbl(S, 'n1', X, 6.0, ['필터·정렬·페이지가 URL에 들어 있어요', 'filters, sort and page live in the URL'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.0, ['URL을 읽어 화면을 그려요 · 진실은 하나', 'the screen reads the URL: one source of truth'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'ch', X + 4.1, 2.6, 3.8, ['인기순', 'popular'], 'warn', 3, { off: 4, h: 1.0 }); lbl(S, 'n3', X, 6.0, ['바꿀 땐 URL을 고치면 화면이 따라와요', 'change the URL and the screen follows'], 'w', 3, { off: 4, w: 12 });
      ['🔗', '⟳', '←'].forEach((t, i) => T(S, 'ic' + i, X + i * 4.1 + 1.4, 4.0, t, 'fex-l', 4)); lbl(S, 'n4', X, 6.0, ['링크 공유 · 새로고침 · 뒤로 가기 모두 그대로', 'sharing, reloads and Back all just work'], 'a', 4, { w: 12 });
    },
    notes: [['검색어, 정렬, 페이지 같은 상태를 URL의 쿼리 파라미터에 담으면 주소만 보고도 화면 상태를 알 수 있어요', 'putting state such as the query, sort and page in URL parameters makes the address describe the screen'], ['컴포넌트는 useSearchParams로 URL을 읽어 그려요 · 상태가 URL 한곳에만 있어서 어긋날 일이 없어요', 'components read the URL with useSearchParams, so state lives in one place and cannot drift'], ['필터를 바꿀 땐 컴포넌트 상태 대신 URL을 바꾸고, 화면은 URL을 따라 다시 그려져요', 'changing a filter updates the URL instead of component state, and the screen re-renders from it'], ['그래서 링크를 공유하거나 새로고침하거나 뒤로 가기를 해도 같은 화면이 나와요 · 모달 열림처럼 순간적인 상태는 메모리에 둬요', 'so shared links, reloads and Back reproduce the same screen, while fleeting state such as an open modal stays in memory']],
    fin: [['URL을 상태로: 공유·북마크할 가치가 있는 상태는 URL에 두는 원칙', 'URL as state: anything worth sharing or bookmarking belongs in the URL', 'fex-xs fex-a'], ['nuqs 같은 라이브러리가 타입 있는 파라미터 상태를 도와줘요', 'libraries such as nuqs provide typed URL state'], ['타이핑 중 검색어는 디바운스해서 기록을 덜 쌓아요', 'debounce search input to avoid flooding history']],
    caps: [['URL에 담긴 상태', 'State in the URL'], ['URL에서 읽기', 'Reading from the URL'], ['URL로 바꾸기', 'Changing via the URL'], ['공유와 뒤로 가기', 'Sharing and Back'], ['URL을 상태로', 'URL as state']]
  });
}

function sApiLayer() {
  return CW('fe-api-layer', {
    code: ['async function http(path, init) {', '  const res = await fetch(BASE + path, {', '    ...init, headers: authHeaders() });', '  if (res.status === 401) return reauth(path);', '  if (!res.ok) throw new ApiError(res.status);', '  return res.json();', '}', 'export const api = {', '  todos: (p) => http(`/todos?page=${p}`),', '};'],
    hl: [[1, 2], [3, 1, 'warn'], [4, 1, 'danger'], [7, 3, 'ok']],
    draw: (S) => {
      const X = 19.4;
      ['TodoList', 'Profile', 'Cart'].forEach((t, i) => nd(S, 'c' + i, X + i * 4.1, .8, 3.8, t, 'line', 0, { h: 1.0 }));
      nd(S, 'ap', X, 2.8, 12.0, ['api 모듈 (한곳)', 'api module (one place)'], 'accent', 0, { h: 1.2 }); [0, 1, 2].forEach(i => arw(S, 'e' + i, [X + 1.9 + i * 4.1, 1.85], [X + 1.9 + i * 4.1, 2.75], 0));
      lbl(S, 'n1', X, 6.6, ['기본 주소·인증 헤더를 한곳에서', 'base URL and auth headers in one place'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'r4', X, 4.6, 5.6, ['401 → 토큰 갱신 후 재시도', '401 → refresh, retry'], 'warn', 2, { off: 3, h: 1.0 }); lbl(S, 'n2', X, 6.6, ['만료된 인증을 한 번에 처리', 'expired auth handled once'], 'w', 2, { off: 3, w: 12 });
      nd(S, 'er', X + 6.4, 4.6, 5.6, 'ApiError(status)', 'danger', 3, { off: 4, h: 1.0 }); lbl(S, 'n3', X, 6.6, ['오류를 한 가지 모양으로 바꿔 던져요', 'errors normalized to one shape'], 'r', 3, { off: 4, w: 12 });
      nd(S, 'ty', X, 4.6, 12.0, 'api.todos(p): Promise<Todo[]>', 'ok', 4, { h: 1.0 }); lbl(S, 'n4', X, 6.6, ['컴포넌트는 fetch 대신 이름 있는 함수만', 'components call named functions, not fetch'], 'g', 4, { w: 12 });
    },
    notes: [['컴포넌트마다 fetch를 직접 부르면 주소, 헤더, 오류 처리가 흩어져요 · api 모듈 하나가 기본 주소와 인증 헤더를 붙여요', 'calling fetch in every component scatters URLs, headers and error handling, so one api module adds the base URL and auth headers'], ['401이 오면 이 계층에서 토큰을 갱신하고 원래 요청을 다시 보내요 · 컴포넌트는 이 과정을 몰라도 돼요', 'on a 401, this layer refreshes the token and retries the original request, invisible to components'], ['fetch는 404나 500에서 예외를 던지지 않으니 res.ok를 확인해 일정한 모양의 ApiError로 바꿔 던져요', 'fetch does not throw on 404 or 500, so check res.ok and throw a consistent ApiError'], ['컴포넌트는 api.todos(page)처럼 이름 있는 함수만 불러요 · OpenAPI 명세에서 타입과 함수를 자동 생성하기도 해요', 'components call named functions such as api.todos(page), which can be generated with types from an OpenAPI spec']],
    fin: [['API 계층: 네트워크 세부사항(주소·인증·오류·재시도)을 한 모듈에 모아 UI와 분리해요', 'an API layer gathers network details, URLs, auth, errors and retries, into one module separate from the UI', 'fex-xs fex-a'], ['서버 상태 라이브러리의 queryFn이 이 함수들을 불러요', 'server-state libraries call these functions from queryFn'], ['AbortController로 화면을 떠난 요청을 취소해요', 'AbortController cancels requests when users leave']],
    caps: [['한곳에서 요청', 'Requests in one place'], ['인증 만료 처리', 'Handling expired auth'], ['오류 정규화', 'Normalizing errors'], ['이름 있는 함수', 'Named functions'], ['API 계층', 'The API layer']]
  });
}

function sVirtualList() {
  return CW('fe-virtual-list', {
    code: ['const v = useVirtualizer({', ['  count: rows.length,        // 10,000개', '  count: rows.length,        // 10,000'], '  getScrollElement: () => ref.current,', '  estimateSize: () => 36,', '  overscan: 5,', '});', 'v.getVirtualItems().map(r => (', '  <Row key={r.key} style={{ transform:', '    `translateY(${r.start}px)` }} />))'],
    hl: [[1, 1, 'danger'], [3, 2, 'ok'], [6, 3, 'warn'], [0, 6]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'tr', X + 1.0, .6, 3.0, 8.4, tint('line', 14), 0, { r: .3 });
      for (let i = 0; i < 14; i++) sw(S, 'r' + i, X + 1.2, .8 + i * .58, 2.6, .44, tint('ink-3', 30), 1, { off: 2, css: 'z-index:3' });
      lbl(S, 'n1', X + 4.6, .8, ['DOM 노드 10,000개', '10,000 DOM nodes'], 'r', 1, { off: 2 }); lbl(S, 'n1b', X + 4.6, 1.9, ['느린 스크롤 · 메모리 낭비', 'janky scrolling, wasted memory'], '', 1, { off: 2, w: 7 });
      frame(S, 'vp', X + .8, 2.6, 3.4, 3.0, 'accent', 2, { w: .14 }); for (let i = 0; i < 5; i++) sw(S, 'v' + i, X + 1.2, 2.8 + i * .55, 2.6, .44, tint('accent', 50), 2, { css: 'z-index:3' });
      lbl(S, 'n2', X + 4.6, 2.8, ['보이는 줄 + 여유분만 렌더', 'render only visible rows plus overscan'], 'g', 2, { w: 7 }); lbl(S, 'n2b', X + 4.6, 4.0, ['DOM 노드 약 25개', 'about 25 DOM nodes'], 'm a', 2);
      S.set('vp', 3, { transform: 'translate(0,1.6em)' }); S.set('vp', 0, { transform: 'translate(0,0)' }); [0, 1, 2, 3, 4].forEach(i => { S.set('v' + i, 3, { transform: 'translate(0,1.6em)' }); S.set('v' + i, 0, { transform: 'translate(0,0)' }); });
      lbl(S, 'n3', X, 9.4, ['스크롤하면 같은 노드를 새 위치에 재사용', 'scrolling reuses the same nodes at new spots'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.4, ['전체 높이는 유지해 스크롤바는 그대로', 'total height is kept, so the scrollbar is real'], 'a', 4, { w: 12 });
    },
    notes: [['행 10,000개를 모두 DOM에 그리면 스타일 계산과 레이아웃 비용이 커져 스크롤이 끊기고 메모리도 많이 써요', 'rendering all 10,000 rows into the DOM inflates style and layout costs, making scrolling janky and memory-hungry'], ['가상 스크롤은 지금 보이는 행과 위아래 여유분(overscan)만 렌더해서 DOM 노드를 수십 개로 유지해요', 'virtualization renders only visible rows plus some overscan, keeping DOM nodes in the dozens'], ['스크롤하면 같은 노드들을 transform으로 새 위치에 옮기며 내용만 바꿔 재사용해요', 'as you scroll, the same nodes move to new positions with transform and swap their content'], ['전체 높이는 계산해서 유지하니 스크롤바 길이와 위치는 진짜 목록처럼 보여요 · 높이가 제각각이면 측정해 보정해요', 'the total height is computed so the scrollbar looks real, and variable row heights are measured and corrected']],
    fin: [['가상 스크롤(윈도잉): 긴 목록에서 보이는 부분만 렌더해 DOM 크기를 일정하게 유지하는 기법', 'virtual scrolling (windowing) renders only the visible part of a long list, keeping the DOM size constant', 'fex-xs fex-a'], ['TanStack Virtual, react-window 같은 라이브러리를 써요', 'libraries include TanStack Virtual and react-window'], ['브라우저 찾기(Ctrl+F)는 렌더된 행만 찾는 한계가 있어요', 'the browser’s find only sees rendered rows']],
    caps: [['DOM이 너무 많을 때', 'Too many DOM nodes'], ['보이는 것만', 'Only what is visible'], ['노드 재사용', 'Reusing nodes'], ['진짜 같은 스크롤바', 'A realistic scrollbar'], ['가상 스크롤', 'Virtual scrolling']]
  });
}

function sInfinite() {
  return CW('fe-infinite-scroll', {
    code: ['const io = new IntersectionObserver(', '  ([e]) => e.isIntersecting && fetchNext(),', "  { rootMargin: '400px' });", 'io.observe(sentinel);', ['// 커서: GET /posts?after=c_93&limit=20', '// cursor: GET /posts?after=c_93&limit=20'], "{ items: [...], nextCursor: 'c_113' }", ['// 오프셋은 새 글이 끼면 중복 · 누락', '// offsets duplicate or skip on inserts']],
    hl: [[0, 4], [2, 1, 'ok'], [4, 2, 'warn'], [6, 1, 'danger']],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'vp', X, .6, 5.0, 6.0, 'accent', 0, { w: .14 }); for (let i = 0; i < 6; i++) sw(S, 'p' + i, X + .3, .9 + i * .95, 4.4, .75, tint('line', 30), 0);
      sw(S, 'sn', X + .3, 6.9, 4.4, .3, 'var(--warn)', 1); lbl(S, 'snl', X + 5.4, 6.7, ['감시 요소(센티널)', 'sentinel element'], 'm w', 1);
      lbl(S, 'n1', X, 8.4, ['목록 끝의 빈 요소가 보이는지 지켜봐요', 'watch an empty element at the list’s end'], 'a', 1, { off: 2, w: 12 });
      frame(S, 'rm', X - .1, .5, 5.2, 7.0, 'ok', 2, { off: 3, dash: 1, w: .08 }); lbl(S, 'n2', X, 8.4, ['400px 전에 미리 다음 페이지 요청', 'fetch the next page 400px early'], 'g', 2, { off: 3, w: 12 });
      [0, 1].forEach(i => sw(S, 'nw' + i, X + .3, 7.0 + i * .7, 4.4, .55, tint('ok', 50), 3)); lbl(S, 'n3', X, 8.4, ['nextCursor로 “여기 다음부터” 요청', 'nextCursor asks for “after this one”'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'of1', X + 5.4, 1.0, 'offset=20', 'm r', 4); lbl(S, 'of2', X + 5.4, 2.0, ['새 글 1개 추가', 'one new post arrives'], '', 4, { w: 6.6 }); lbl(S, 'of3', X + 5.4, 3.0, ['→ 20번째가 또 나와요', '→ item 20 repeats'], 'r', 4, { w: 6.6 });
      lbl(S, 'n4', X, 8.4, ['자주 바뀌는 목록은 커서 방식이 안전', 'cursors are safer for changing lists'], 'a', 4, { w: 12 });
    },
    notes: [['목록 맨 끝에 빈 감시 요소(센티널)를 두고 IntersectionObserver로 화면에 들어오는지 지켜봐요 · scroll 이벤트보다 가벼워요', 'an empty sentinel at the end of the list is watched with IntersectionObserver, lighter than scroll events'], ['rootMargin을 400px로 주면 끝에 닿기 전에 미리 다음 페이지를 불러 끊김이 없어요', 'a 400px rootMargin loads the next page before the end is reached, avoiding gaps'], ['서버는 nextCursor를 함께 돌려주고, 다음 요청은 “이 항목 다음부터”를 의미하는 커서로 보내요', 'the server returns a nextCursor, and the next request sends that cursor meaning “after this item”'], ['offset=20 방식은 그 사이 새 글이 추가되면 항목이 밀려 중복되거나 빠져요 · 자주 바뀌는 목록엔 커서가 안전해요', 'offset=20 pagination shifts when new posts arrive, repeating or skipping items, so cursors are safer for changing lists']],
    fin: [['무한 스크롤: IntersectionObserver로 끝을 감지하고 커서 기반 페이지네이션으로 다음 묶음을 이어 붙여요', 'infinite scroll detects the end with IntersectionObserver and appends the next batch with cursor-based pagination', 'fex-xs fex-a'], ['푸터에 닿을 수 없게 되니 “더 보기” 버튼도 고려해요', 'it can make footers unreachable, so consider a “load more” button'], ['아주 길어지면 가상 스크롤과 함께 써요', 'combine with virtualization for very long lists']],
    caps: [['센티널 관찰', 'Watching a sentinel'], ['미리 불러오기', 'Loading early'], ['커서 페이지네이션', 'Cursor pagination'], ['오프셋의 함정', 'The offset trap'], ['무한 스크롤', 'Infinite scroll']]
  });
}
/* ===== Frontend · 3. performance ===== */
/* a timeline row: label + segments [[x0, x1, color]] on a 0..10 scale mapped to width W */
const trow = (S, k, X, y, label, segs, st, o = {}) => { lbl(S, k + 'l', X, y + .05, label, 'm', st, { off: o.off }); segs.forEach(([a, b, c], i) => sw(S, k + i, X + 3.2 + a * .88, y + .1, (b - a) * .88, .55, c, st, { off: o.off })); };
const PARSE = tint('accent', 45), FETCH = tint('ok', 55), EXEC = 'var(--warn)';

function sScriptLoading() {
  return CW('fe-script-loading', {
    code: ['<script src="a.js"></script>', '<script async src="b.js"></script>', '<script defer src="c.js"></script>', '<script type="module" src="d.js"></script>', '<link rel="modulepreload" href="d.js">'],
    hl: [[0, 1, 'danger'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      [['HTML', PARSE], ['fetch', FETCH], ['run', EXEC]].forEach(([t, c], i) => { sw(S, 'lg' + i, X + i * 4.0, .6, .6, .4, c, 0); lbl(S, 'lgl' + i, X + .8 + i * 4.0, .45, t, 'm', 0); });
      trow(S, 'r1', X, 1.6, 'plain', [[0, 2, PARSE], [2, 5, FETCH], [5, 6.5, EXEC], [6.5, 10, PARSE]], 1);
      lbl(S, 'n1', X, 6.4, ['받고 실행할 때까지 HTML 해석이 멈춰요', 'HTML parsing stops until it downloads and runs'], 'r', 1, { off: 2, w: 12 });
      trow(S, 'r2', X, 2.6, 'async', [[0, 3, PARSE], [0, 3, FETCH], [3, 4.5, EXEC], [4.5, 9, PARSE]], 2);
      lbl(S, 'n2', X, 6.4, ['받는 동안 해석 계속, 도착하면 바로 실행', 'parses while fetching; runs on arrival'], 'w', 2, { off: 3, w: 12 });
      trow(S, 'r3', X, 3.6, 'defer', [[0, 7.5, PARSE], [0, 3, FETCH], [7.5, 9, EXEC]], 3);
      lbl(S, 'n3', X, 6.4, ['해석이 끝난 뒤 순서대로 실행', 'runs in order after parsing finishes'], 'g', 3, { off: 4, w: 12 });
      trow(S, 'r4', X, 4.6, 'module', [[0, 7.5, PARSE], [0, 3, FETCH], [7.5, 9, EXEC]], 4);
      lbl(S, 'n4', X, 6.4, ['모듈은 기본이 defer · 의존성은 미리 받기', 'modules defer by default; preload their deps'], 'a', 4, { w: 12 });
    },
    notes: [['속성 없는 script는 내려받고 실행이 끝날 때까지 HTML 해석을 멈춰서 화면 표시가 늦어져요', 'a plain script halts HTML parsing until it downloads and runs, delaying the first render'], ['async는 해석과 동시에 내려받고 도착하는 즉시 실행해요 · 실행 순서가 보장되지 않아 광고·분석처럼 독립된 스크립트에 맞아요', 'async downloads in parallel and runs on arrival, with no guaranteed order, suiting independent scripts such as ads and analytics'], ['defer는 동시에 받아 두고 HTML 해석이 끝난 뒤 적힌 순서대로 실행해요 · 앱 코드의 기본 선택이에요', 'defer downloads in parallel and runs in document order after parsing, the default choice for app code'], ['type="module"은 기본으로 defer처럼 동작하고, modulepreload로 의존 모듈을 미리 받아 연쇄 대기를 줄여요', 'type="module" behaves like defer by default, and modulepreload fetches dependencies early to avoid waterfalls']],
    fin: [['스크립트 로딩: 렌더를 막지 않게 defer·async·module을 고르고, 중요한 것만 먼저 받아요', 'script loading picks defer, async or module so rendering is never blocked, fetching only what matters first', 'fex-xs fex-a'], ['head의 동기 스크립트와 큰 CSS는 첫 화면을 늦추는 대표 원인', 'synchronous head scripts and large CSS are the usual first-render blockers'], ['서드파티 스크립트는 꼭 필요한지부터 따져요', 'question every third-party script first']],
    caps: [['일반 script', 'Plain scripts'], ['async', 'async'], ['defer', 'defer'], ['module', 'Modules'], ['스크립트 로딩', 'Script loading']]
  });
}

function sImages() {
  return CW('fe-images', {
    code: ['<img src="h-800.avif"', '  srcset="h-400.avif 400w, h-800.avif 800w,', '          h-1600.avif 1600w"', '  sizes="(min-width: 768px) 50vw, 100vw"', '  width="1600" height="900" alt="…"', '  fetchpriority="high">', '<img loading="lazy" decoding="async" …>'],
    hl: [[1, 3], [4, 1, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'ph', X, .8, 2.6, 4.4, 'ink-3', 1, { off: 2, w: .1, r: .4 }); frame(S, 'dt', X + 3.4, .8, 8.6, 4.4, 'ink-3', 1, { off: 2, w: .1, r: .4 });
      lbl(S, 'p1', X, 5.4, '400w', 'm a', 1, { off: 2 }); lbl(S, 'p2', X + 3.4, 5.4, ['1600w (고해상도)', '1600w (hi-DPI)'], 'm a', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['화면 폭과 밀도에 맞는 파일을 브라우저가 골라요', 'the browser picks the file for width and density'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'rs', X, .8, 12.0, 4.0, tint('ok', 25), 2, { off: 3, css: 'border:.1em dashed var(--ok)' }); cl(S, 'rsl', X, 2.5, 12.0, '1600 × 900 → 16:9', 'm', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['width·height로 자리를 미리 잡아 밀림(CLS) 방지', 'width and height reserve space, preventing CLS'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'lcp', X, .8, 12.0, ['대표 이미지 = LCP 후보 → 먼저 받기', 'hero image = LCP candidate → fetch first'], 'warn', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 6.6, ['fetchpriority="high" · 첫 화면 이미지는 lazy 금지', 'fetchpriority="high"; never lazy-load the hero'], 'w', 3, { off: 4, w: 12 });
      [['JPEG', 9.0, 'danger'], ['WebP', 6.4, 'warn'], ['AVIF', 4.6, 'ok']].forEach(([t, w, c], i) => { lbl(S, 'f' + i, X, .8 + i * 1.1, t, 'm', 4); sw(S, 'fb' + i, X + 2.0, .9 + i * 1.1, w, .55, 'var(--' + c + ')', 4); });
      lbl(S, 'n4', X, 6.6, ['아래쪽 이미지는 lazy · 새 포맷은 더 작아요', 'lazy-load below the fold; new formats are smaller'], 'a', 4, { w: 12 });
    },
    notes: [['srcset에 폭별 파일을, sizes에 화면에서 차지할 크기를 적으면 브라우저가 화면 폭과 픽셀 밀도에 맞는 파일을 골라 받아요', 'listing files by width in srcset and the displayed size in sizes lets the browser choose the right file for viewport and pixel density'], ['width와 height를 적으면 이미지가 오기 전에 비율만큼 자리를 잡아 레이아웃이 밀리지(CLS) 않아요', 'width and height reserve the aspect-ratio space before the image loads, preventing layout shift (CLS)'], ['첫 화면의 대표 이미지는 보통 LCP 요소라 fetchpriority="high"로 먼저 받고, 절대 lazy로 미루지 않아요', 'the hero image is usually the LCP element, so fetchpriority="high" loads it first and it is never lazy-loaded'], ['스크롤해야 보이는 이미지는 loading="lazy"로 미루고, AVIF·WebP 같은 새 포맷으로 용량을 크게 줄여요', 'below-the-fold images use loading="lazy", and modern formats such as AVIF and WebP cut bytes substantially']],
    fin: [['이미지 최적화: 알맞은 크기 · 새 포맷 · 자리 예약 · 우선순위 조절이 웹 성능에서 가장 큰 효과를 내요', 'image optimization, right sizes, modern formats, reserved space and priority hints, is often the biggest single performance win', 'fex-xs fex-a'], ['이미지 CDN이 크기·포맷 변환을 자동으로 해 주기도 해요', 'image CDNs can automate resizing and format conversion'], ['alt는 접근성 필수 · 장식이면 alt=""', 'alt is required for accessibility; use alt="" for decoration']],
    caps: [['반응형 이미지', 'Responsive images'], ['자리 예약', 'Reserving space'], ['LCP 이미지', 'The LCP image'], ['지연 로딩과 포맷', 'Lazy loading and formats'], ['이미지 최적화', 'Image optimization']]
  });
}

function sFonts() {
  return CW('fe-fonts', {
    code: ['@font-face {', "  font-family: 'Pretendard';", "  src: url(/f/pd.woff2) format('woff2');", '  font-display: swap;', '  unicode-range: U+AC00-D7A3;', '}', '<link rel="preload" href="/f/pd.woff2"', '  as="font" type="font/woff2" crossorigin>'],
    hl: [[3, 1, 'danger'], [3, 1, 'ok'], [2, 1, 'warn'], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'tx', X, .8, 12.0, 2.2, 'var(--ui)', 0, { css: 'border:.08em solid var(--line)', r: .4 });
      lbl(S, 'blk', X + .5, 1.4, ['█ █ █ █ (글자 안 보임)', '█ █ █ █ (invisible text)'], 'm', 1, { off: 2 }); lbl(S, 'n1', X, 4.2, ['FOIT: 글꼴이 올 때까지 글자가 안 보여요', 'FOIT: text stays invisible until the font loads'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'fb', X + .5, 1.4, ['안녕하세요 (대체 글꼴)', 'Hello (fallback font)'], '', 2, { off: 3 }); lbl(S, 'n2', X, 4.2, ['swap: 먼저 대체 글꼴로 보여주고 교체', 'swap: show a fallback, then switch'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n2b', X, 5.3, ['교체할 때 줄바꿈이 바뀌면 밀림 → size-adjust로 맞춤', 'metric mismatch shifts lines; size-adjust aligns them'], '', 2, { off: 3, w: 12 });
      lbl(S, 'sz', X + .5, 1.0, ['전체 한글 11,172자', 'all 11,172 Hangul syllables'], 'm', 3, { off: 4 }); sw(S, 'b1', X + .5, 1.8, 11.0, .5, 'var(--danger)', 3, { off: 4 }); sw(S, 'b2', X + .5, 2.4, 3.0, .5, 'var(--ok)', 3, { off: 4 });
      lbl(S, 'n3', X, 4.2, ['서브셋 · woff2 · 필요한 굵기만', 'subset, woff2, only needed weights'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'pl', X + .5, 1.4, ['안녕하세요 (Pretendard)', 'Hello (Pretendard)'], 'a', 4); lbl(S, 'n4', X, 4.2, ['preload로 CSS를 기다리지 않고 바로 요청', 'preload requests it without waiting for CSS'], 'a', 4, { w: 12 });
    },
    notes: [['웹 글꼴이 늦게 오면 브라우저가 글자를 숨기는 FOIT가 생겨 첫 화면이 비어 보여요', 'when a web font arrives late, browsers may hide text (FOIT), leaving the first screen blank'], ['font-display: swap은 대체 글꼴로 먼저 보여주고 도착하면 바꿔요 · 글자 폭이 달라 밀리면 size-adjust로 대체 글꼴 크기를 맞춰요', 'font-display: swap shows a fallback first and swaps on arrival, and size-adjust aligns fallback metrics to avoid shifts'], ['한글 글꼴은 글자 수가 많아 무거워요 · 자주 쓰는 글자로 서브셋을 만들고 woff2, 필요한 굵기만 써요', 'Korean fonts are heavy because of their many glyphs, so subset to common characters, use woff2 and only needed weights'], ['preload로 CSS 해석을 기다리지 않고 글꼴을 바로 요청해요 · 글꼴은 항상 crossorigin이 필요해요', 'preload requests the font without waiting for CSS parsing, and fonts always need crossorigin']],
    fin: [['웹 글꼴 최적화: 표시 전략(swap) + 서브셋·woff2 + preload + 대체 글꼴 크기 맞춤', 'web font optimization combines a display strategy (swap), subsetting and woff2, preload, and fallback metric matching', 'fex-xs fex-a'], ['가변 글꼴(variable font) 하나로 여러 굵기를 대신해요', 'one variable font can replace several weights'], ['시스템 글꼴 스택은 다운로드가 0이에요', 'a system font stack downloads nothing']],
    caps: [['FOIT', 'FOIT'], ['swap과 밀림', 'Swap and shifts'], ['서브셋', 'Subsetting'], ['preload', 'Preloading'], ['웹 글꼴 최적화', 'Web font optimization']]
  });
}

function sTreeShaking() {
  return CW('fe-tree-shaking', {
    code: [['// utils.js', '// utils.js'], 'export const used = () => …;', ['export const unused = () => …; // 제거됨', 'export const unused = () => …; // dropped'], "import { used } from './utils';", ["import _ from 'lodash';      // ✗ 통째로", "import _ from 'lodash';      // ✗ all of it"], "import { debounce } from 'lodash-es'; // ✓", ['"sideEffects": false   // package.json', '"sideEffects": false   // package.json']],
    hl: [[1, 3, 'ok'], [4, 1, 'danger'], [5, 1, 'ok'], [6, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ap', X, .8, 3.4, 'app.js', 'accent', 0, { h: 1.1 }); nd(S, 'u1', X + 5.0, .8, 3.4, 'used', 'ok', 0, { h: 1.0 }); nd(S, 'u2', X + 5.0, 2.2, 3.4, 'unused', 'line', 0, { h: 1.0 }); arw(S, 'a0', [X + 3.45, 1.35], [X + 4.95, 1.3], 0);
      S.set('u2', 1, { opacity: '.25' }); S.set('u2', 0, { opacity: '1' }); lbl(S, 'n1', X, 5.4, ['ESM import를 정적으로 분석해 안 쓰는 export 제거', 'static ESM imports reveal unused exports to drop'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'lb', X, 3.6, 12.0, .7, 'var(--danger)', 2, { off: 3 }); lbl(S, 'lbl', X, 4.4, ['lodash 전체 (CommonJS)', 'all of lodash (CommonJS)'], 'm r', 2, { off: 3 }); lbl(S, 'n2', X, 5.4, ['CommonJS나 통째 import는 흔들어 떨굴 수 없어요', 'CommonJS and whole imports cannot be shaken'], 'r', 2, { off: 3, w: 12 });
      sw(S, 'lg', X, 3.6, 1.2, .7, 'var(--ok)', 3, { off: 4 }); lbl(S, 'lgl', X, 4.4, ['debounce만', 'just debounce'], 'm g', 3, { off: 4 }); lbl(S, 'n3', X, 5.4, ['ESM 버전에서 이름으로 가져오면 필요한 것만', 'named imports from ESM builds take only what is needed'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 5.4, ['sideEffects: false → 안 쓰는 파일은 통째로 생략', 'sideEffects: false lets bundlers skip unused files'], 'w', 4, { w: 12 }); lbl(S, 'n5', X, 6.5, ['CSS import처럼 부수 효과가 있는 파일은 예외로 표시', 'mark files with side effects, such as CSS imports'], '', 4, { w: 12 });
    },
    notes: [['트리 셰이킹은 번들러가 import와 export를 정적으로 분석해 쓰이지 않는 코드를 결과물에서 빼는 거예요', 'tree shaking means the bundler statically analyzes imports and exports and drops unused code from the output'], ['CommonJS(require)는 실행해 봐야 무엇을 쓰는지 알 수 있어서, lodash처럼 통째로 가져오면 전부 번들에 들어가요', 'CommonJS (require) only reveals usage at run time, so importing all of lodash bundles everything'], ['lodash-es 같은 ESM 버전에서 이름으로 가져오면 debounce에 필요한 코드만 들어가요', 'named imports from an ESM build such as lodash-es include only what debounce needs'], ['package.json의 "sideEffects": false는 “import만 해도 실행되는 코드가 없다”는 약속이라 안 쓰는 파일을 통째로 생략하게 해 줘요', '"sideEffects": false in package.json promises that importing runs nothing, letting bundlers skip unused files entirely']],
    fin: [['트리 셰이킹: ESM의 정적 구조를 이용해 사용하지 않는 export를 번들에서 제거하는 최적화', 'tree shaking uses the static structure of ESM to remove unused exports from bundles', 'fex-xs fex-a'], ['번들 분석기(rollup-plugin-visualizer 등)로 무엇이 큰지 확인해요', 'bundle analyzers such as rollup-plugin-visualizer show what is large'], ['배럴 파일(index.ts 재수출)은 셰이킹을 방해하기도 해요', 'barrel files that re-export everything can hinder shaking']],
    caps: [['안 쓰는 export 제거', 'Dropping unused exports'], ['통째 import', 'Whole imports'], ['이름으로 가져오기', 'Named imports'], ['sideEffects', 'sideEffects'], ['트리 셰이킹', 'Tree shaking']]
  });
}

function sLongTasks() {
  return CW('fe-long-tasks', {
    code: ['async function processAll(items) {', '  for (const item of items) {', '    process(item);', ['    await yieldToMain();  // 틈 내주기', '    await yieldToMain();  // make room'], '  }', '}', 'const yieldToMain = () =>', '  globalThis.scheduler?.yield?.() ??', '  new Promise(r => setTimeout(r, 0));'],
    hl: [[1, 2, 'danger'], [3, 1, 'ok'], [6, 3, 'warn'], [0, 6]],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'mt', X, .6, 'main thread', 'm', 0);
      sw(S, 'lt', X, 1.4, 10.0, .8, 'var(--danger)', 1, { off: 2 }); lbl(S, 'ltl', X, 2.3, '300ms', 'm r', 1, { off: 2 }); T(S, 'ck', X + 2.0, 3.1, '👆', 'fex-l', 1, { off: 2 }); lbl(S, 'ckl', X + 3.2, 3.3, ['클릭 → 300ms 뒤에야 반응', 'click → handled 300ms later'], 'r', 1, { off: 2 });
      lbl(S, 'n1', X, 5.6, ['50ms 넘는 긴 작업이 입력을 막아요(INP 나쁨)', 'tasks over 50ms block input (poor INP)'], 'r', 1, { off: 2, w: 12 });
      for (let i = 0; i < 6; i++) sw(S, 'ch' + i, X + i * 1.9, 1.4, 1.5, .8, 'var(--warn)', 2); sw(S, 'in', X + 3.4, 1.4, .4, .8, 'var(--ok)', 3); T(S, 'ck2', X + 3.0, 3.1, '👆', 'fex-l', 3, { off: 4 });
      lbl(S, 'n2', X, 5.6, ['작게 나누고 사이사이 메인 스레드를 양보', 'split work and yield between chunks'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.6, ['틈에서 클릭이 바로 처리돼요', 'clicks run in the gaps'], 'g', 3, { off: 4, w: 12 });
      nd(S, 'wk', X, 3.2, 12.0, ['무거운 계산은 Web Worker로', 'heavy compute goes to a Web Worker'], 'accent', 4, { h: 1.0 }); lbl(S, 'n4', X, 5.6, ['scheduler.yield: Chrome·Firefox, 없으면 setTimeout', 'scheduler.yield in Chrome and Firefox, else setTimeout'], 'a', 4, { w: 12 });
    },
    notes: [['JavaScript는 메인 스레드 하나에서 돌아요 · 50ms를 넘는 긴 작업이 실행 중이면 클릭과 입력이 끝날 때까지 기다려요(INP 악화)', 'JavaScript runs on one main thread, and a task longer than 50ms makes clicks and input wait until it ends (worse INP)'], ['큰 일을 작은 조각으로 나누고 조각 사이마다 await로 메인 스레드를 양보해요', 'split big work into chunks and yield the main thread with await between them'], ['양보한 틈마다 브라우저가 쌓인 입력과 화면 갱신을 먼저 처리해서 반응이 빨라져요', 'in each gap the browser handles pending input and rendering first, so responses feel quick'], ['scheduler.yield()는 Chrome과 Firefox가 지원하고, 없는 브라우저에선 setTimeout으로 대신해요 · 아주 무거운 계산은 Web Worker로 옮겨요', 'scheduler.yield() works in Chrome and Firefox with setTimeout as the fallback elsewhere, and truly heavy compute moves to a Web Worker']],
    fin: [['긴 작업 쪼개기: 메인 스레드를 자주 양보해 입력 반응성(INP)을 지켜요', 'breaking up long tasks yields the main thread often, protecting input responsiveness (INP)', 'fex-xs fex-a'], ['DevTools 성능 패널에서 빨간 삼각형이 긴 작업이에요', 'red triangles in the DevTools Performance panel mark long tasks'], ['React의 startTransition도 같은 목표예요', 'React’s startTransition serves the same goal']],
    caps: [['긴 작업', 'Long tasks'], ['조각내기', 'Chunking'], ['틈에서 반응', 'Responding in the gaps'], ['양보 API와 워커', 'Yield APIs and workers'], ['긴 작업 쪼개기', 'Breaking up long tasks']]
  });
}

function sAssetHashing() {
  return CW('fe-asset-hashing', {
    code: ['dist/assets/app.3f9a1c.js', 'dist/assets/vendor.b71e02.js', 'Cache-Control: public,', '  max-age=31536000, immutable', 'index.html → Cache-Control: no-cache', ['// 내용이 바뀌면 이름이 바뀜 → 자동 무효화', '// new content, new name → auto invalidation']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'h1', X, .8, 5.6, 'index.html', 'warn', 0, { h: 1.0 }); nd(S, 'a1', X + 6.4, .8, 5.6, 'app.3f9a1c.js', 'accent', 0, { h: 1.0 }); nd(S, 'v1', X + 6.4, 2.2, 5.6, 'vendor.b71e02.js', 'ok', 0, { h: 1.0 });
      lbl(S, 'n1', X, 6.4, ['파일 이름에 내용의 해시를 넣어요', 'file names include a hash of their content'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'yr', X + 6.4, 3.4, 5.6, ['1년 캐시', 'cached 1 year'], 'ok', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.4, ['해시 파일은 영원히 캐시해도 안전', 'hashed files can be cached forever'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'nc', X, 2.2, 5.6, ['매번 확인', 'always rechecked'], 'warn', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.4, ['HTML만 매번 확인해 새 파일 이름을 받아요', 'only HTML is rechecked to learn new names'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'a2', X + 6.4, 4.8, 5.6, 'app.9d04e7.js', 'danger', 4, { h: 1.0 }); lbl(S, 'v2', X, 4.95, ['vendor는 캐시 그대로', 'vendor stays cached'], 'g', 4, { w: 6 }); lbl(S, 'n4', X, 6.4, ['자주 바뀌는 코드와 라이브러리를 나누면 캐시 적중↑', 'splitting app and vendor code boosts cache hits'], 'a', 4, { w: 12 });
    },
    notes: [['빌드 도구는 app.3f9a1c.js처럼 파일 내용의 해시를 이름에 넣어요 · 내용이 같으면 이름도 같아요', 'build tools put a content hash in file names such as app.3f9a1c.js, so identical content keeps the same name'], ['이름이 내용과 묶여 있으니 해시 파일은 max-age 1년, immutable로 영원히 캐시해도 안전해요', 'because names are tied to content, hashed files can be cached for a year with immutable'], ['대신 index.html은 no-cache로 매번 서버에 확인해 최신 파일 이름 목록을 받아요', 'index.html, by contrast, is no-cache and revalidated every time to learn the latest file names'], ['배포하면 바뀐 app 파일만 새 이름이 되고 vendor는 캐시를 그대로 써요 · 라이브러리를 따로 나누면 캐시 적중률이 올라가요', 'after a deploy only the changed app file gets a new name while vendor stays cached, and splitting libraries out raises hit rates']],
    fin: [['콘텐츠 해시 캐싱: 파일 이름 = 내용 지문 → 긴 캐시와 즉시 갱신을 동시에 얻는 전략', 'content-hash caching makes file names fingerprints of their content, achieving long caching and instant updates at once', 'fex-xs fex-a'], ['배포 중 옛 HTML이 지운 파일을 찾지 않도록 이전 파일은 잠시 남겨요', 'keep old files briefly so cached HTML never requests deleted assets'], ['CDN 캐시 무효화가 거의 필요 없어져요', 'CDN purges become nearly unnecessary']],
    caps: [['해시 파일 이름', 'Hashed file names'], ['영원한 캐시', 'Caching forever'], ['HTML은 매번 확인', 'HTML is always rechecked'], ['배포와 캐시 적중', 'Deploys and cache hits'], ['콘텐츠 해시 캐싱', 'Content-hash caching']]
  });
}

function sPrefetch() {
  return CW('fe-prefetch', {
    code: [['<Link href="/product/1">   // 보이면 미리', '<Link href="/product/1">   // when visible'], 'onMouseEnter={() => qc.prefetchQuery(q)}', '<script type="speculationrules">', '{ "prerender": [{', '    "where": { "href_matches": "/p/*" },', '    "eagerness": "moderate" }] }', '</script>'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 5, 'warn'], [0, 2]],
    draw: (S) => {
      const X = 19.4;
      trow(S, 'r0', X, .8, ['그냥', 'plain'], [[2, 2.3, 'var(--ink-3)'], [2.3, 7.5, FETCH], [7.5, 9.5, EXEC]], 0); T(S, 'c0', X + 3.2 + 1.5, .55, '👆', 'fex-s', 0);
      lbl(S, 'n1', X, 6.4, ['클릭한 뒤에야 데이터·코드를 받기 시작', 'nothing loads until after the click'], 'r', 1, { off: 2, w: 12 });
      trow(S, 'r1', X, 2.0, 'hover', [[0, 3, FETCH], [3.3, 4.8, EXEC]], 2); T(S, 'c1', X + 3.2 + 2.4, 1.75, '👆', 'fex-s', 2); lbl(S, 'r1t', X + 3.2, 2.75, ['마우스를 올린 순간부터 받기', 'starts on hover'], 'm g', 2);
      lbl(S, 'n2', X, 6.4, ['올리고 누르기까지 수백 ms를 벌어요', 'gains hundreds of ms between hover and click'], 'g', 2, { off: 3, w: 12 });
      trow(S, 'r2', X, 3.6, 'prerender', [[0, 3, tint('accent', 60)], [3.3, 3.6, EXEC]], 3); lbl(S, 'r2t', X + 3.2, 4.35, ['다음 페이지를 미리 렌더 → 즉시 전환', 'next page prerendered → instant'], 'm a', 3);
      lbl(S, 'n3', X, 6.4, ['Speculation Rules: 크로미움 계열 지원', 'Speculation Rules: Chromium browsers'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['낭비 주의: 데이터 절약 모드·느린 망은 제외', 'mind waste: skip on data saver or slow networks'], 'a', 4, { w: 12 });
    },
    notes: [['보통은 링크를 누른 뒤에야 다음 화면의 코드와 데이터를 받기 시작해서 그만큼 기다려요', 'normally the next screen’s code and data start loading only after the click, so users wait'], ['마우스를 올리거나 링크가 화면에 보일 때 미리 받아 두면, 누르는 순간 이미 캐시에 있어요', 'prefetching on hover or when a link becomes visible means the data is already cached at click time'], ['Speculation Rules는 다음 페이지를 통째로 미리 렌더해 두어 클릭하면 즉시 전환돼요 · 크로미움 계열이 지원하고 다른 브라우저는 무시해요', 'Speculation Rules prerender the whole next page for instant navigation, supported in Chromium browsers and ignored elsewhere'], ['쓰이지 않을 수도 있는 요청이니 eagerness를 조절하고, 데이터 절약 모드나 느린 네트워크에서는 끄는 게 좋아요', 'speculative requests may go unused, so tune eagerness and turn it off on data saver or slow networks']],
    fin: [['예측 로딩: 사용자의 다음 행동을 예상해 코드·데이터·페이지를 미리 준비하는 체감 속도 기법', 'predictive loading prepares code, data or whole pages ahead of the user’s next action to improve perceived speed', 'fex-xs fex-a'], ['Next.js의 Link는 뷰포트에 들어온 링크를 자동으로 미리 받아요', 'Next.js Link prefetches links entering the viewport automatically'], ['부작용이 있는 GET 요청은 미리 부르면 안 돼요', 'never prefetch GET requests that have side effects']],
    caps: [['클릭 후 로딩', 'Loading after the click'], ['hover 미리 받기', 'Prefetching on hover'], ['미리 렌더', 'Prerendering'], ['낭비 줄이기', 'Limiting waste'], ['예측 로딩', 'Predictive loading']]
  });
}
/* ===== Frontend · 4. tooling and quality ===== */
function sBuildTools() {
  return CW('fe-build-tools', {
    code: ['npm create vite@latest my-app', ['vite         # 개발 서버', 'vite         # dev server'], ['vite build   # 프로덕션 번들', 'vite build   # production bundle'], ['# Vite 8: Rolldown(번들) + Oxc(변환)', '# Vite 8: Rolldown (bundle) + Oxc (transform)'], 'if (import.meta.hot) {', '  import.meta.hot.accept();', '}'],
    hl: [[1, 1], [4, 3, 'ok'], [2, 2, 'warn'], [3, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'br', X, .8, 3.4, ['브라우저', 'Browser'], 'line', 1, { off: 3, h: 1.1 }); nd(S, 'dv', X + 8.6, .8, 3.4, 'dev server', 'accent', 1, { off: 3, h: 1.1 });
      ['main.ts', 'App.tsx', 'Cart.tsx'].forEach((t, i) => { arw(S, 'rq' + i, [X + 3.5, 1.1 + i * .5], [X + 8.5, 1.1 + i * .5], 1, { off: 2 }); });
      lbl(S, 'rql', X + 3.8, 2.4, ['import마다 그 파일만 변환해 전달', 'each import transformed on demand'], 'm', 1, { off: 2, w: 8 });
      lbl(S, 'n1', X, 6.2, ['개발 땐 번들하지 않고 ESM으로 바로 · 시작이 빨라요', 'no bundling in dev: native ESM, instant start'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'ed', X + 8.6, 2.6, 3.4, 'Cart.tsx ✎', 'warn', 2, { off: 3, h: 1.0 }); arw(S, 'hm', [X + 8.5, 3.1], [X + 3.5, 3.1], 2, { off: 3, color: 'ok' }); lbl(S, 'hml', X + 3.6, 3.8, ['바뀐 모듈만 교체 · 상태 유지', 'swap one module, keep state'], 'm g', 2, { off: 3, w: 4.8 });
      lbl(S, 'n2', X, 6.2, ['HMR: 저장하면 새로고침 없이 반영', 'HMR: updates without a reload'], 'g', 2, { off: 3, w: 12 });
      ['bundle', 'minify', 'hash'].forEach((t, i) => nd(S, 'b' + i, X + i * 4.1, .8, 3.8, t, 'warn', 3, { off: 4, h: 1.1 })); nd(S, 'out', X, 2.6, 12.0, 'dist/assets/index.4c1e9a.js', 'ok', 3, { off: 4, h: 1.0 });
      lbl(S, 'n3', X, 6.2, ['배포용은 묶고 줄이고 해시를 붙여요', 'production: bundle, minify, hash'], 'w', 3, { off: 4, w: 12 });
      [['Vite', 'Rolldown'], ['Next.js', 'Turbopack'], ['webpack 호환', 'Rspack']].forEach(([a, b], i) => { lbl(S, 'ta' + i, X, .8 + i * 1.1, a, 'm', 4); lbl(S, 'tb' + i, X + 5.0, .8 + i * 1.1, b, 'm a', 4); });
      lbl(S, 'n4', X, 6.2, ['도구 체인이 Rust로 옮겨 가며 수 배 빨라졌어요', 'toolchains moved to Rust and got many times faster'], 'a', 4, { w: 12 });
    },
    notes: [['Vite 개발 서버는 미리 번들하지 않고, 브라우저가 import로 요청하는 파일만 그때그때 변환해 ESM으로 보내서 시작이 거의 즉시예요', 'the Vite dev server skips upfront bundling and transforms only files the browser imports, serving native ESM for a near-instant start'], ['파일을 저장하면 HMR이 바뀐 모듈만 교체해서 새로고침 없이, 입력값 같은 상태도 유지한 채 반영돼요', 'on save, HMR swaps just the changed module, updating without a reload and keeping state such as form input'], ['vite build는 배포용으로 모듈을 묶고(bundle), 줄이고(minify), 해시 이름을 붙여요', 'vite build bundles, minifies and hashes modules for production'], ['Vite 8(2026)은 Rust 기반 Rolldown과 Oxc를 써요 · Next.js의 Turbopack, webpack 호환 Rspack도 같은 흐름이에요', 'Vite 8 (2026) runs on the Rust-based Rolldown and Oxc, in line with Next.js’s Turbopack and webpack-compatible Rspack']],
    fin: [['빌드 도구: 개발 땐 빠른 모듈 서빙과 HMR, 배포 땐 번들·압축·해시로 최적화된 결과물', 'build tools serve modules quickly with HMR in development and emit bundled, minified, hashed output for production', 'fex-xs fex-a'], ['설정보다 관례 · 대부분 기본값으로 충분해요', 'convention over configuration: defaults usually suffice'], ['Vite는 Node 20.19+ 또는 22.12+가 필요해요', 'Vite requires Node 20.19+ or 22.12+']],
    caps: [['요청 시 변환', 'Transform on request'], ['HMR', 'HMR'], ['프로덕션 빌드', 'Production builds'], ['Rust 도구 체인', 'Rust toolchains'], ['빌드 도구', 'Build tools']]
  });
}

function sTranspile() {
  return CW('fe-transpile', {
    code: ['"browserslist": ["baseline widely available"]', ['// 문법 변환 (SWC · Babel · Oxc)', '// syntax lowering (SWC, Babel, Oxc)'], 'a?.b ?? c  →  a == null ? … : …', ['// 폴리필: 없는 API를 채워 넣기', '// polyfills: fill in missing APIs'], "import 'core-js/actual/array/at';", ['// 문법은 변환, API는 폴리필', '// syntax is transformed, APIs are polyfilled']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 2, 'warn'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'tg', X, .8, 12.0, ['지원 대상: 넓게 쓰이는 Baseline', 'targets: Baseline widely available'], 'accent', 1, { h: 1.1 }); lbl(S, 'n1', X, 6.4, ['어떤 브라우저까지 지원할지 먼저 정해요', 'first decide which browsers to support'], 'a', 1, { off: 2, w: 12 });
      nd(S, 's1', X, 2.6, 5.4, 'a?.b ?? c', 'line', 2, { h: 1.1 }); arw(S, 'a1', [X + 5.45, 3.15], [X + 6.55, 3.15], 2); nd(S, 's2', X + 6.6, 2.6, 5.4, ['옛 문법', 'older syntax'], 'ok', 2, { h: 1.1 });
      lbl(S, 'n2', X, 6.4, ['문법은 빌드 때 옛 문법으로 바꿀 수 있어요', 'syntax can be rewritten at build time'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'p1', X, 4.2, 5.4, 'arr.at(-1)', 'line', 3, { h: 1.1 }); arw(S, 'a2', [X + 5.45, 4.75], [X + 6.55, 4.75], 3); nd(S, 'p2', X + 6.6, 4.2, 5.4, ['폴리필 코드', 'polyfill code'], 'warn', 3, { h: 1.1 });
      lbl(S, 'n3', X, 6.4, ['새 API는 실행 때 직접 구현해 채워요', 'new APIs are implemented at run time'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['대상을 넓힐수록 번들이 커져요 · 균형', 'wider targets mean bigger bundles: balance'], 'a', 4, { w: 12 });
    },
    notes: [['browserslist로 지원할 브라우저 범위를 정하면 빌드 도구가 그 기준으로 변환 여부를 판단해요 · Baseline 기준 쿼리도 쓸 수 있어요', 'browserslist sets the supported browser range that build tools use to decide what to transform, including Baseline-based queries'], ['?.나 ?? 같은 새 문법은 SWC, Babel, Oxc 같은 트랜스파일러가 옛 브라우저도 이해하는 문법으로 바꿔요', 'new syntax such as ?. and ?? is rewritten by transpilers such as SWC, Babel or Oxc into syntax older browsers understand'], ['Array.prototype.at 같은 새 API는 문법 변환으로 해결되지 않아서, core-js 같은 폴리필이 실행 때 직접 구현을 채워 넣어요', 'new APIs such as Array.prototype.at cannot be fixed by syntax lowering, so polyfills such as core-js supply implementations at run time'], ['지원 대상을 넓힐수록 변환과 폴리필이 늘어 번들이 커지니 실제 사용자 통계를 보고 정해요', 'wider targets add transforms and polyfills that grow bundles, so decide from real user analytics']],
    fin: [['트랜스파일과 폴리필: 문법은 빌드 때 바꾸고, 빠진 API는 실행 때 채워 지원 브라우저를 맞춰요', 'transpiling and polyfilling rewrite syntax at build time and fill missing APIs at run time to meet browser targets', 'fex-xs fex-a'], ['Vite 7부터 기본 빌드 대상이 Baseline 기준이에요', 'since Vite 7 the default build target is Baseline-based'], ['TypeScript의 타입 제거도 이 단계에서 일어나요', 'TypeScript type stripping happens at this stage too']],
    caps: [['지원 대상', 'Browser targets'], ['문법 변환', 'Syntax lowering'], ['폴리필', 'Polyfills'], ['크기와의 균형', 'Balancing size'], ['트랜스파일과 폴리필', 'Transpiling and polyfills']]
  });
}

function sLintFormat() {
  return CW('fe-lint-format', {
    code: [['// eslint.config.js (flat config)', '// eslint.config.js (flat config)'], 'export default [js.configs.recommended,', '  ...tseslint.configs.recommended,', "  { rules: { 'no-console': 'warn' } }];", ['// Prettier: 모양만 · ESLint: 버그 패턴', '// Prettier: layout; ESLint: bug patterns'], ['// 빠른 대안: Biome · oxlint (Rust)', '// fast alternatives: Biome, oxlint (Rust)'], ['// lint-staged + husky: 커밋 전 검사', '// lint-staged + husky: pre-commit checks']],
    hl: [[0, 4], [4, 1, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, I = [['useEffect(f, [])', 'useEffect(f, [])', 'danger', 'ESLint'], ['let  y=2;x =1', 'let  y=2;x =1', 'warn', 'Prettier'], ['total("3")', 'total("3")', 'accent', 'tsc']];
      I.forEach(([k, e, c, tool], i) => { lbl(S, 'c' + i, X, .8 + i * 1.3, [k, e], 'm', 1); chip(S, 't' + i, X + 8.8, .65 + i * 1.3, 3.2, tool, c, 2, { h: 1.0 }); });
      lbl(S, 'n1', X, 6.2, ['버그 패턴 · 모양 · 타입은 서로 다른 문제', 'bug patterns, layout and types are separate problems'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.2, ['도구마다 맡은 일이 달라요', 'each tool has its own job'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.2, ['Biome·oxlint는 수십 배 빠른 Rust 구현', 'Biome and oxlint are much faster Rust tools'], 'w', 3, { off: 4, w: 12 });
      ['git commit', 'lint-staged', 'CI'].forEach((t, i) => { nd(S, 'p' + i, X + i * 4.1, 4.6, 3.8, t, i === 2 ? 'ok' : 'line', 4, { h: 1.0 }); if (i) arw(S, 'pa' + i, [X + i * 4.1 - .3, 5.1], [X + i * 4.1 - .05, 5.1], 4); });
      lbl(S, 'n4', X, 6.2, ['커밋 전 · CI에서 자동으로 막아요', 'blocked automatically pre-commit and in CI'], 'a', 4, { w: 12 });
    },
    notes: [['코드 문제는 종류가 달라요 · 의존성 누락 같은 버그 패턴, 띄어쓰기 같은 모양, 타입 오류는 각각 다른 도구가 잡아요', 'code problems differ in kind: bug patterns such as missing dependencies, layout such as spacing, and type errors are caught by different tools'], ['ESLint는 버그가 될 패턴을, Prettier는 코드 모양을, tsc는 타입을 맡아요 · 모양 규칙은 ESLint에서 빼고 Prettier에 맡겨요', 'ESLint flags risky patterns, Prettier owns layout and tsc checks types; leave formatting rules out of ESLint'], ['Biome과 oxlint는 Rust로 만든 빠른 대안이에요 · Biome은 린트와 포맷을 하나로 합쳤어요', 'Biome and oxlint are fast Rust-based alternatives, and Biome combines linting and formatting'], ['husky와 lint-staged로 커밋할 파일만 검사하고, CI에서 한 번 더 막아 규칙이 지켜지게 해요', 'husky with lint-staged checks only staged files before commit, and CI enforces the rules again']],
    fin: [['린트와 포맷: 버그 패턴(ESLint)·모양(Prettier)·타입(tsc)을 자동으로 검사해 리뷰를 본질에 집중하게 해요', 'linting and formatting automate checks for bug patterns (ESLint), layout (Prettier) and types (tsc), keeping reviews on substance', 'fex-xs fex-a'], ['ESLint 9부터 flat config(eslint.config.js)가 기본이에요', 'flat config (eslint.config.js) is the default since ESLint 9'], ['에디터에서 저장할 때 자동 수정되게 해요', 'auto-fix on save in the editor']],
    caps: [['서로 다른 문제', 'Different problems'], ['도구의 역할', 'Tool roles'], ['빠른 대안', 'Fast alternatives'], ['자동 검사', 'Automated checks'], ['린트와 포맷', 'Linting and formatting']]
  });
}

function sTesting() {
  return CW('fe-testing', {
    code: [['// 단위: 순수 함수 (Vitest)', '// unit: pure functions (Vitest)'], "expect(formatPrice(1200)).toBe('₩1,200');", ['// 컴포넌트: 사용자처럼 (Testing Library)', '// component: like a user (Testing Library)'], "await user.click(screen.getByRole('button',", ["  { name: '담기' }));", "  { name: 'Add' }));"], ["expect(screen.getByText('1개')).toBeVisible();", "expect(getByText('1 item')).toBeVisible();"], ['// E2E: 진짜 브라우저 (Playwright)', '// E2E: a real browser (Playwright)'], "await page.getByRole('link',", ["  { name: '결제' }).click();", "  { name: 'Checkout' }).click();"]],
    hl: [[0, 2], [2, 4, 'ok'], [6, 3, 'warn'], [3, 2]],
    draw: (S) => {
      const X = 19.4, P = [['E2E', 'warn', 4.0, 3], [['컴포넌트', 'Component'], 'ok', 8.0, 2], [['단위', 'Unit'], 'accent', 12.0, 1]];
      P.forEach(([t, c, w, st], i) => nd(S, 'p' + i, X + (12.0 - w) / 2, .8 + i * 1.5, w, t, c, st, { h: 1.2 }));
      lbl(S, 'ax1', X, 5.6, ['↑ 실제와 가까움 · 느림', '↑ realistic but slow'], 'm', 3); lbl(S, 'ax2', X + 6.4, 5.6, ['↓ 빠름 · 많이', '↓ fast, plentiful'], 'm', 1);
      lbl(S, 'n1', X, 6.8, ['계산·변환 로직은 빠른 단위 테스트로', 'logic gets fast unit tests'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.8, ['역할·이름으로 찾기 = 사용자와 같은 방식', 'query by role and name, like a user'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.8, ['핵심 흐름(가입·결제)만 E2E로', 'only key journeys (sign-up, checkout) in E2E'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.8, ['구현이 아니라 동작을 테스트해요', 'test behavior, not implementation'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.9, ['getByRole은 접근성도 함께 검증', 'getByRole checks accessibility too'], '', 4, { w: 12 });
    },
    notes: [['가격 형식 변환 같은 순수 로직은 Vitest로 빠르고 많이 테스트해요 · 수천 개도 몇 초면 끝나요', 'pure logic such as price formatting gets fast, plentiful Vitest tests, thousands finishing in seconds'], ['Testing Library는 버튼을 역할과 이름으로 찾아 클릭하고 화면에 보이는 결과를 확인해요 · 사용자가 쓰는 방식 그대로예요', 'Testing Library finds a button by role and name, clicks it and checks what appears, exactly as a user would'], ['Playwright E2E는 진짜 브라우저로 가입·결제 같은 핵심 흐름을 끝까지 확인해요 · 느리고 깨지기 쉬워 꼭 필요한 것만 둬요', 'Playwright E2E tests drive a real browser through key journeys such as sign-up and checkout, kept few because they are slow and brittle'], ['내부 state나 구현 세부가 아니라 사용자가 보는 동작을 테스트하면 리팩터링해도 테스트가 깨지지 않아요', 'testing visible behavior instead of internal state or implementation details keeps tests intact through refactors']],
    fin: [['프론트엔드 테스트: 단위(많이) · 컴포넌트(중심) · E2E(핵심만)로 속도와 신뢰를 나눠 가져요', 'frontend testing balances speed and confidence with many unit tests, component tests at the center and a few E2E tests', 'fex-xs fex-a'], ['시각 회귀 테스트로 스타일 깨짐도 잡아요', 'visual regression tests catch style breakage'], ['테스트하기 어려운 코드는 설계 신호예요', 'hard-to-test code is a design signal']],
    caps: [['단위 테스트', 'Unit tests'], ['컴포넌트 테스트', 'Component tests'], ['E2E 테스트', 'End-to-end tests'], ['동작을 테스트', 'Testing behavior'], ['프론트엔드 테스트', 'Frontend testing']]
  });
}

function sMsw() {
  return CW('fe-msw', {
    code: ["import { http, HttpResponse } from 'msw';", 'export const handlers = [', "  http.get('/api/todos', () =>", '    HttpResponse.json([{ id: 1 }])),', "  http.post('/api/todos', () =>", '    new HttpResponse(null, { status: 500 })),', '];', ['setupWorker(...handlers).start(); // 브라우저', 'setupWorker(...handlers).start(); // browser'], ['setupServer(...handlers).listen(); // 테스트', 'setupServer(...handlers).listen(); // tests']],
    hl: [[1, 3], [4, 2, 'danger'], [7, 1, 'ok'], [8, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ap', X, .8, 3.4, ['앱', 'App'], 'accent', 0, { h: 1.1 }); nd(S, 'sw', X + 4.3, .8, 3.4, 'MSW', 'warn', 0, { h: 1.1 }); nd(S, 'be', X + 8.6, .8, 3.4, ['진짜 서버', 'real API'], 'line', 0, { h: 1.1 });
      arw(S, 'a0', [X + 3.45, 1.2], [X + 4.25, 1.2], 1); arw(S, 'a1', [X + 4.25, 1.6], [X + 3.45, 1.6], 1, { color: 'ok' }); lbl(S, 'x', X + 8.0, 1.0, '✗', 'r', 1);
      lbl(S, 'n1', X, 5.6, ['네트워크 단계에서 가로채 가짜 응답', 'intercepts at the network level with fake replies'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'e5', X + 4.3, 2.3, 3.4, '500', 'danger', 2, { off: 3, h: .9 }); lbl(S, 'n2', X, 5.6, ['오류·느린 응답 같은 경우도 쉽게 재현', 'errors and slow replies are easy to reproduce'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.6, ['브라우저에선 서비스 워커로 동작', 'runs as a service worker in the browser'], 'g', 3, { off: 4, w: 12 });
      ['Vitest', 'Storybook', 'Playwright'].forEach((t, i) => nd(S, 'u' + i, X + i * 4.1, 3.4, 3.8, t, 'line', 4, { h: 1.0 })); lbl(S, 'n4', X, 5.6, ['같은 핸들러를 테스트·스토리북에서 재사용', 'reuse the same handlers in tests and Storybook'], 'w', 4, { w: 12 });
    },
    notes: [['MSW(Mock Service Worker)는 fetch를 바꾸지 않고 네트워크 단계에서 요청을 가로채 가짜 응답을 돌려줘요 · 앱 코드는 그대로예요', 'MSW (Mock Service Worker) intercepts requests at the network level without patching fetch, so app code stays unchanged'], ['500 오류, 빈 목록, 느린 응답처럼 실제 서버로는 만들기 어려운 상황을 핸들러 하나로 재현해요', 'situations hard to produce with a real server, such as 500 errors, empty lists and slow replies, take one handler'], ['브라우저에서는 서비스 워커로 동작해 백엔드가 준비되기 전에도 화면을 개발할 수 있어요', 'in the browser it runs as a service worker, letting UI work proceed before the backend is ready'], ['Node에서는 setupServer로 같은 핸들러를 써서 Vitest, Storybook, Playwright가 한 가지 가짜 API를 공유해요', 'in Node, setupServer reuses the same handlers, so Vitest, Storybook and Playwright share one fake API']],
    fin: [['API 모킹(MSW): 네트워크 계층에서 요청을 가로채 개발·테스트·데모에 같은 가짜 API를 써요', 'API mocking with MSW intercepts requests at the network layer, sharing one fake API across development, tests and demos', 'fex-xs fex-a'], ['핸들러를 OpenAPI 명세에서 생성할 수도 있어요', 'handlers can be generated from an OpenAPI spec'], ['실제 API와 어긋나지 않게 계약 테스트를 곁들여요', 'add contract tests so mocks never drift from the real API']],
    caps: [['요청 가로채기', 'Intercepting requests'], ['예외 상황 재현', 'Reproducing edge cases'], ['서비스 워커', 'The service worker'], ['어디서나 재사용', 'Reuse everywhere'], ['API 모킹', 'API mocking']]
  });
}

function sMonitoring() {
  return CW('fe-monitoring', {
    code: ['Sentry.init({ dsn, tracesSampleRate: 0.1,', '  replaysOnErrorSampleRate: 1.0 });', ['// 빌드 때 소스맵 업로드 (공개 배포 X)', '// upload source maps at build (not public)'], ['// a.js:1:48213 → src/Cart.tsx:42', '// a.js:1:48213 → src/Cart.tsx:42'], ["onINP(m => send('/rum', m));  // web-vitals", "onINP(m => send('/rum', m));  // web-vitals"]],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [0, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'u', X, .8, 3.4, ['사용자', 'user'], 'line', 1, { h: 1.1 }); nd(S, 'er', X + 4.3, .8, 7.7, 'TypeError: undefined', 'danger', 1, { h: 1.1 });
      lbl(S, 'n1', X, 6.4, ['사용자 브라우저의 오류를 자동으로 수집', 'errors in users’ browsers are collected automatically'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'mn', X, 2.4, 5.6, 'a.js:1:48213', 'line', 2, { h: 1.0 }); arw(S, 'm', [X + 5.65, 2.9], [X + 6.35, 2.9], 2); nd(S, 'sr', X + 6.4, 2.4, 5.6, 'Cart.tsx:42', 'ok', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.4, ['소스맵으로 압축된 위치 → 원본 코드 줄', 'source maps map minified spots to real lines'], 'g', 2, { off: 3, w: 12 });
      [[['p75 LCP', 'p75 LCP'], 2.1, 'ok'], [['p75 INP', 'p75 INP'], 260, 'warn'], [['p75 CLS', 'p75 CLS'], .04, 'ok']].forEach(([t, v, c], i) => { lbl(S, 'm' + i, X + i * 4.1, 4.0, t, 'm', 3); chip(S, 'mv' + i, X + i * 4.1, 4.7, 3.8, i === 0 ? '2.1s' : (i === 1 ? '260ms' : '0.04'), c, 3, { h: .9 }); });
      lbl(S, 'n3', X, 6.4, ['실사용자 지표(RUM)로 진짜 체감 성능 확인', 'real-user metrics (RUM) show actual experience'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.4, ['샘플링으로 비용 조절 · 개인정보는 가려서', 'sample to control cost; mask personal data'], 'a', 4, { w: 12 });
    },
    notes: [['Sentry 같은 도구는 사용자 브라우저에서 난 오류를 스택, 브라우저 정보, 직전 행동 기록과 함께 모아요', 'tools such as Sentry collect errors from users’ browsers with stacks, browser details and breadcrumbs of prior actions'], ['배포된 코드는 압축돼 있어 위치를 알 수 없으니, 빌드 때 소스맵을 모니터링 서비스에만 올려 원본 줄로 되돌려요', 'deployed code is minified, so source maps uploaded only to the monitoring service map locations back to original lines'], ['web-vitals로 실제 사용자의 LCP·INP·CLS를 모아 p75로 보면 실험실 측정과 다른 진짜 체감 성능이 보여요', 'collecting real users’ LCP, INP and CLS with web-vitals and reading the 75th percentile reveals real experience, unlike lab tests'], ['모든 이벤트를 보내면 비용이 커지니 샘플링 비율을 정하고, 세션 재생은 입력값과 개인정보를 가려요', 'sending everything gets costly, so set sample rates, and session replays mask inputs and personal data']],
    fin: [['프론트엔드 모니터링: 오류 추적 + 소스맵 + 실사용자 지표(RUM)로 운영 중인 화면의 문제를 봐요', 'frontend monitoring combines error tracking, source maps and real-user metrics (RUM) to see problems in production', 'fex-xs fex-a'], ['배포 버전(release)을 붙여 어떤 배포가 문제인지 찾아요', 'tag releases to find which deploy caused an issue'], ['처리되지 않은 Promise 거부도 꼭 잡아요', 'capture unhandled promise rejections too']],
    caps: [['오류 수집', 'Collecting errors'], ['소스맵', 'Source maps'], ['실사용자 지표', 'Real-user metrics'], ['비용과 개인정보', 'Cost and privacy'], ['프론트엔드 모니터링', 'Frontend monitoring']]
  });
}
/* ===== Frontend · 5. UX engineering ===== */
function sLoadingStates() {
  return CW('fe-loading-states', {
    code: ['<Suspense fallback={<CardSkeleton />}>', '  <ProductList />', '</Suspense>', ['// ~300ms: 아무것도 보이지 않기', '// up to 300ms: show nothing'], ['// 300ms~: 실제 모양의 스켈레톤', '// 300ms+: a skeleton shaped like the content'], ['// 수 초 이상: 진행률 · 취소', '// several seconds: progress, cancel'], '{isFetching && <TopProgressBar />}'],
    hl: [[3, 1], [0, 5, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'tl', X, 1.0, 12.0, .3, tint('line', 40), 0); [['0', 0], ['0.3s', 2.4], ['1s', 6.0], ['5s', 11.0]].forEach(([t, x], i) => lbl(S, 'tk' + i, X + x, .3, t, 'm', 0));
      sw(S, 'z1', X, 1.0, 2.4, .3, 'var(--ok)', 1); lbl(S, 'n1', X, 6.6, ['아주 빠르면 로딩 표시 자체가 깜빡임', 'for fast loads, an indicator is just flicker'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => { sw(S, 'sk' + i, X + i * 4.1, 2.0, 3.8, 1.6, tint('line', 30), 2, { off: 4 }); sw(S, 'sl' + i, X + i * 4.1, 3.8, 3.8, .35, tint('line', 30), 2, { off: 4 }); sw(S, 'sm' + i, X + i * 4.1, 4.3, 2.4, .35, tint('line', 30), 2, { off: 4 }); });
      lbl(S, 'n2', X, 6.6, ['스켈레톤: 같은 크기로 자리를 잡아 밀림 없음', 'skeletons hold the same space, so nothing shifts'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'pg', X, 5.1, 12.0, .3, tint('line', 30), 3, { off: 4 }); sw(S, 'pgf', X, 5.1, 7.0, .3, 'var(--warn)', 3, { off: 4 }); lbl(S, 'n3', X, 6.6, ['오래 걸리면 진행률과 취소를 제공', 'long waits get progress and a cancel option'], 'w', 3, { off: 4, w: 12 });
      [0, 1, 2].forEach(i => nd(S, 'pc' + i, X + i * 4.1, 2.0, 3.8, ['상품 ', 'Item '].map(s => s + (i + 1)), 'line', 4, { h: 2.9 })); sw(S, 'tp', X, 1.6, 4.0, .15, 'var(--accent)', 4);
      lbl(S, 'n4', X, 6.6, ['다시 받는 동안엔 옛 데이터 + 얇은 진행 막대', 'refetching keeps old data with a thin bar'], 'a', 4, { w: 12 });
    },
    notes: [['응답이 수백 ms 안에 오면 로딩 표시를 띄웠다 지우는 것 자체가 깜빡임이 돼요 · 짧은 지연 뒤에만 보여줘요', 'when responses arrive within a few hundred ms, flashing an indicator is just flicker, so show it only after a short delay'], ['기다림이 길어지면 실제 콘텐츠와 같은 모양·크기의 스켈레톤을 보여줘요 · 자리가 그대로라 레이아웃이 밀리지 않아요', 'for longer waits, show a skeleton matching the content’s shape and size, keeping the layout from shifting'], ['몇 초 이상 걸리는 업로드나 내보내기는 진행률과 취소 버튼을 줘서 사용자가 통제감을 갖게 해요', 'uploads or exports taking several seconds get progress and a cancel button so users stay in control'], ['이미 본 데이터를 다시 받을 때는 화면을 비우지 말고 옛 데이터 위에 얇은 진행 막대만 띄워요', 'when refetching data already seen, keep it on screen and show only a thin progress bar']],
    fin: [['로딩 상태 설계: 기다림의 길이에 따라 없음 → 스켈레톤 → 진행률로 표시를 달리해요', 'loading state design varies with wait time: nothing, then a skeleton, then progress', 'fex-xs fex-a'], ['Suspense 경계를 어디 두느냐가 화면이 나타나는 순서를 정해요', 'where Suspense boundaries sit decides the reveal order'], ['로딩 영역에 aria-busy를 달아 보조 기술에도 알려요', 'mark loading regions with aria-busy for assistive tech']],
    caps: [['짧은 기다림', 'Short waits'], ['스켈레톤', 'Skeletons'], ['긴 기다림', 'Long waits'], ['다시 받기', 'Refetching'], ['로딩 상태 설계', 'Designing loading states']]
  });
}

function sFocus() {
  return CW('fe-focus', {
    code: [['// 모달: 열면 안으로, 닫으면 원래 자리로', '// modal: focus in on open, back on close'], 'const opener = document.activeElement;', ['dialog.showModal();  // 포커스 가두기 내장', 'dialog.showModal();  // built-in focus trap'], 'dialog.onclose = () => opener.focus();', ['// 툴바: roving tabindex', '// toolbars: roving tabindex'], '<button tabIndex={i === active ? 0 : -1}>', ['// 라우트 이동 뒤 h1으로 포커스', '// after route changes, focus the h1']],
    hl: [[1, 2], [3, 1, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ob', X, .8, 3.4, ['삭제', 'Delete'], 'line', 0, { h: 1.0 }); S.set('ob', 0, { 'box-shadow': '0 0 0 .14em var(--accent)' }); S.set('ob', 1, { 'box-shadow': 'none' }); S.set('ob', 2, { 'box-shadow': '0 0 0 .14em var(--accent)' }); S.set('ob', 3, { 'box-shadow': 'none' });
      sw(S, 'bg', X, 2.2, 12.0, 4.0, 'rgba(0,0,0,.25)', 1, { off: 2 }); sw(S, 'md', X + 2.0, 2.6, 8.0, 3.2, 'var(--ui)', 1, { off: 2, css: 'border:.08em solid var(--line);z-index:3', r: .4 });
      nd(S, 'mc', X + 2.6, 4.4, 3.2, ['취소', 'Cancel'], 'line', 1, { off: 2, h: .9, css: 'z-index:4;box-shadow:0 0 0 .14em var(--accent)' }); nd(S, 'mk', X + 6.2, 4.4, 3.2, ['삭제', 'Delete'], 'danger', 1, { off: 2, h: .9, css: 'z-index:4' }); lbl(S, 'mt', X + 2.6, 3.0, ['정말 삭제할까요?', 'Delete this?'], 's', 1, { off: 2, css: 'z-index:4' });
      lbl(S, 'n1', X, 7.0, ['열면 포커스가 안으로 · Tab은 모달 안에서만', 'focus moves in; Tab cycles inside the modal'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 7.0, ['닫으면 열었던 버튼으로 돌아와요', 'closing returns focus to the opener'], 'g', 2, { off: 3, w: 12 });
      ['B', 'I', 'U', 'S'].forEach((t, i) => nd(S, 'tb' + i, X + i * 1.6, 2.6, 1.4, t, 'line', 3, { off: 4, h: 1.0 })); S.set('tb1', 3, { 'box-shadow': '0 0 0 .14em var(--accent)' }); lbl(S, 'tbl', X, 3.9, ['← → 로 이동, Tab은 한 번', 'arrows move; one Tab stop'], 'm w', 3, { off: 4 });
      lbl(S, 'n3', X, 7.0, ['그룹은 Tab 한 번 · 안에서는 화살표', 'a group is one Tab stop; arrows inside'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'h1', X, 2.6, 12.0, ['h1 · 주문 내역 (포커스)', 'h1 · Order history (focused)'], 'accent', 4, { h: 1.1 }); lbl(S, 'n4', X, 7.0, ['SPA 이동 뒤 새 화면 제목으로 포커스·안내', 'after SPA navigation, focus and announce the title'], 'a', 4, { w: 12 });
    },
    notes: [['모달을 열면 포커스가 모달 안으로 들어가고 Tab은 모달 안에서만 돌아요 · <dialog>의 showModal()은 이걸 기본으로 해 줘요', 'opening a modal moves focus inside and keeps Tab cycling within it, which <dialog> showModal() provides by default'], ['모달을 닫으면 처음에 눌렀던 버튼으로 포커스를 돌려줘서 키보드 사용자가 길을 잃지 않아요', 'closing the modal returns focus to the button that opened it, so keyboard users never get lost'], ['툴바·탭 목록처럼 묶인 버튼은 Tab 한 번으로 들어가고 안에서는 화살표로 움직여요(roving tabindex)', 'grouped controls such as toolbars and tab lists take one Tab stop, with arrow keys moving inside (roving tabindex)'], ['SPA는 페이지를 새로 받지 않아서 화면이 바뀐 걸 모를 수 있어요 · 새 제목으로 포커스를 옮기거나 안내해요', 'SPAs never load a new page, so screen readers may miss changes; move focus to or announce the new heading']],
    fin: [['포커스 관리: 키보드와 스크린 리더 사용자가 지금 어디 있는지 잃지 않게 포커스를 옮기고 가두고 돌려줘요', 'focus management moves, contains and restores focus so keyboard and screen reader users always know where they are', 'fex-xs fex-a'], [':focus-visible로 키보드 포커스를 분명히 보여줘요', 'make keyboard focus obvious with :focus-visible'], ['배경에는 inert를 걸어 클릭·포커스를 막아요', 'mark the background inert to block clicks and focus']],
    caps: [['모달 안으로', 'Into the modal'], ['원래 자리로', 'Back to the opener'], ['roving tabindex', 'Roving tabindex'], ['화면 전환 뒤', 'After navigation'], ['포커스 관리', 'Focus management']]
  });
}

function sI18n() {
  return CW('fe-i18n', {
    code: ["const won = new Intl.NumberFormat('ko-KR',", "  { style: 'currency', currency: 'KRW' });", 'won.format(12000);           // ₩12,000', "new Intl.DateTimeFormat('en-US',", "  { dateStyle: 'medium' }).format(d);", '{n, plural, one {# item} other {# items}}', '<html lang="ar" dir="rtl">'],
    hl: [[0, 3], [3, 2, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, L = ['ko-KR', 'en-US', 'de-DE'];
      L.forEach((t, i) => lbl(S, 'lc' + i, X, .8 + i * 1.1, t, 'm a', 0));
      ['₩12,000', '₩12,000', '12.000 ₩'].forEach((t, i) => lbl(S, 'nm' + i, X + 3.4, .8 + i * 1.1, t, 'm', 1, { off: 2 }));
      lbl(S, 'n1', X, 6.4, ['숫자·통화 형식은 언어마다 달라요', 'number and currency formats vary by locale'], 'a', 1, { off: 2, w: 12 });
      ['2026. 11. 10.', 'Nov 10, 2026', '10.11.2026'].forEach((t, i) => lbl(S, 'dt' + i, X + 3.4, .8 + i * 1.1, t, 'm', 2, { off: 3 }));
      lbl(S, 'n2', X, 6.4, ['날짜도 직접 조립하지 말고 Intl로', 'never hand-build dates; use Intl'], 'g', 2, { off: 3, w: 12 });
      ['3개', '1 item · 3 items', '1 Artikel · 3 Artikel'].forEach((t, i) => lbl(S, 'pl' + i, X + 3.4, .8 + i * 1.1, t, 'm', 3, { off: 4 }));
      lbl(S, 'n3', X, 6.4, ['복수형 규칙도 언어마다 · ICU 메시지로', 'plural rules differ; use ICU messages'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'rt', X, 4.2, 12.0, 1.4, 'var(--ui)', 4, { css: 'border:.08em solid var(--line)', r: .3 }); lbl(S, 'ra', X + 10.6, 4.55, '←', 'a', 4); lbl(S, 'rb', X + .4, 4.55, ['오른쪽에서 시작', 'starts from the right'], 'm', 4);
      lbl(S, 'n4', X, 6.4, ['RTL: 레이아웃이 거울처럼 · 논리 속성으로', 'RTL mirrors layouts; use logical properties'], 'a', 4, { w: 12 });
    },
    notes: [['Intl.NumberFormat은 언어와 지역에 맞게 천 단위 구분, 소수점, 통화 기호 위치를 알아서 바꿔요', 'Intl.NumberFormat adapts thousands separators, decimals and currency symbol placement to the locale'], ['날짜도 Intl.DateTimeFormat으로 형식을 맡겨요 · 문자열을 직접 이어 붙이면 순서와 구분자가 틀려요', 'dates go through Intl.DateTimeFormat too, since hand-joined strings get order and separators wrong'], ['“1 item, 3 items”처럼 복수형 규칙이 언어마다 달라서 ICU 메시지 형식으로 번역 문장 안에 규칙을 담아요', 'plural rules differ by language, as in “1 item, 3 items”, so ICU message syntax embeds them in translations'], ['아랍어처럼 오른쪽에서 쓰는 언어는 레이아웃이 거울처럼 뒤집혀요 · margin-left 대신 margin-inline-start 같은 논리 속성을 써요', 'right-to-left languages such as Arabic mirror the layout, so use logical properties such as margin-inline-start instead of margin-left']],
    fin: [['국제화(i18n): 문구 번역 + 숫자·날짜·복수형 형식 + 방향(RTL)을 언어에 맞게 처리해요', 'internationalization covers translated strings, number, date and plural formats, and text direction (RTL)', 'fex-xs fex-a'], ['독일어는 영어보다 30% 이상 길어지기도 해 여유 있는 레이아웃이 필요해요', 'German can run over 30% longer than English, so layouts need room'], ['번역 문장을 이어 붙이지 말고 변수 자리를 둬요', 'never concatenate translated fragments; use placeholders']],
    caps: [['숫자와 통화', 'Numbers and currency'], ['날짜', 'Dates'], ['복수형', 'Plurals'], ['오른쪽에서 왼쪽', 'Right to left'], ['국제화', 'Internationalization']]
  });
}

function sAnimationPerf() {
  return CW('fe-animation-perf', {
    code: [['/* ✗ 레이아웃을 다시 계산 */', '/* ✗ triggers layout */'], '.box:hover { width: 320px; top: 20px; }', ['/* ✓ 합성 단계만: transform · opacity */', '/* ✓ compositor only: transform, opacity */'], '.box:hover { transform: scale(1.02); }', '.drawer { will-change: transform; }', ['// FLIP: First · Last · Invert · Play', '// FLIP: First, Last, Invert, Play']],
    hl: [[0, 2, 'danger'], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, P = [['Style', 'line'], ['Layout', 'danger'], ['Paint', 'warn'], ['Composite', 'ok']], PX = [0, 2.7, 5.7, 8.4], PW = [2.4, 2.7, 2.4, 3.6];
      P.forEach(([t, c], i) => { nd(S, 'p' + i, X + PX[i], .8, PW[i], t, 'line', 0, { h: 1.1 }); });
      tsets(S, 'p1', [[1, 'danger', 50], [2, 'line', 14]]); tsets(S, 'p2', [[1, 'warn', 50], [2, 'line', 14]]); tsets(S, 'p0', [[1, 'accent', 40], [2, 'line', 14]]); tsets(S, 'p3', [[1, 'ok', 40], [2, 'ok', 50]]);
      lbl(S, 'n1', X, 6.4, ['width·top: 매 프레임 레이아웃부터 다시', 'width and top redo layout every frame'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.4, ['transform·opacity: 합성만 · GPU가 처리', 'transform and opacity only composite, on the GPU'], 'g', 2, { off: 3, w: 12 });
      for (let i = 0; i < 8; i++) sw(S, 'f' + i, X + i * 1.5, 2.6, 1.3, 1.2, i === 4 ? 'var(--danger)' : tint('ok', 50), 3, { off: 4 }); lbl(S, 'fl', X, 4.0, ['16.7ms 안에 한 프레임 = 60fps', 'one frame in 16.7ms = 60 fps'], 'm', 3, { off: 4 });
      lbl(S, 'n3', X, 6.4, ['will-change는 곧 움직일 요소에만 · 남용은 메모리 낭비', 'will-change only on soon-to-move elements'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'fa', X, 2.6, 3.4, 'First', 'line', 4, { h: 1.0 }); nd(S, 'fb', X + 8.6, 2.6, 3.4, 'Last', 'line', 4, { h: 1.0 }); arw(S, 'fi', [X + 8.55, 3.1], [X + 3.45, 3.1], 4, { color: 'warn' }); lbl(S, 'fil', X + 4.2, 3.4, ['Invert → Play', 'Invert → Play'], 'm w', 4);
      lbl(S, 'n4', X, 6.4, ['FLIP: 위치 변화를 transform 애니메이션으로', 'FLIP turns layout changes into transform animations'], 'a', 4, { w: 12 });
    },
    notes: [['width나 top을 바꾸는 애니메이션은 매 프레임 스타일 → 레이아웃 → 페인트 → 합성을 모두 다시 해서 끊기기 쉬워요', 'animating width or top reruns style, layout, paint and composite every frame, which easily stutters'], ['transform과 opacity는 합성 단계만 다시 해서 GPU가 처리해요 · 메인 스레드가 바빠도 부드러워요', 'transform and opacity only recomposite on the GPU, staying smooth even when the main thread is busy'], ['60fps를 내려면 한 프레임을 16.7ms 안에 끝내야 해요 · will-change는 곧 움직일 요소에만 미리 레이어를 만들어 줘요', '60 fps needs each frame in 16.7 ms, and will-change pre-creates layers only for elements about to move'], ['FLIP은 처음(First)과 끝(Last) 위치를 재고, 차이만큼 transform으로 되돌린(Invert) 뒤 0으로 재생(Play)해 레이아웃 변화를 부드럽게 만들어요', 'FLIP measures First and Last positions, Inverts the difference with transform and Plays it back to zero, smoothing layout changes']],
    fin: [['애니메이션 성능: 합성 전용 속성(transform·opacity)으로 움직이고 레이아웃 변화는 FLIP으로 바꿔요', 'animation performance means moving with compositor-only properties (transform, opacity) and converting layout changes with FLIP', 'fex-xs fex-a'], ['DevTools의 Rendering 탭으로 다시 칠하는 영역을 확인해요', 'the DevTools Rendering tab shows repainted areas'], ['prefers-reduced-motion을 존중해요', 'respect prefers-reduced-motion']],
    caps: [['레이아웃 애니메이션', 'Layout animations'], ['합성 전용 속성', 'Compositor-only properties'], ['프레임 예산', 'The frame budget'], ['FLIP', 'FLIP'], ['애니메이션 성능', 'Animation performance']]
  });
}

function sViewTransitions() {
  return CW('fe-view-transitions', {
    code: ['document.startViewTransition(() => {', ['  updateDOM();   // 상태 변경', '  updateDOM();   // change state'], '});', '.thumb, .hero { view-transition-name: pic; }', '::view-transition-old(root),', '::view-transition-new(root) {', '  animation-duration: .3s; }', '@view-transition { navigation: auto; }'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 3, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'o', X, .8, 5.6, 4.0, tint('line', 25), 1, { off: 2 }); cl(S, 'ol', X, 2.5, 5.6, ['이전 화면', 'old view'], 'm', 1, { off: 2 }); sw(S, 'nw', X + 6.4, .8, 5.6, 4.0, tint('accent', 25), 1, { off: 2 }); cl(S, 'nl', X + 6.4, 2.5, 5.6, ['새 화면', 'new view'], 'm', 1, { off: 2 });
      lbl(S, 'n1', X, 6.4, ['전후 스냅숏을 찍어 브라우저가 전환 애니메이션', 'the browser snapshots both states and animates'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'th', X, 1.0, 2.4, 1.6, tint('ok', 50), 2, { off: 4 }); S.set('th', 0, { transform: 'translate(0,0)', width: '2.4em', height: '1.6em' }); S.set('th', 3, { transform: 'translate(3em,.2em)', width: '9em', height: '4em' });
      lbl(S, 'n2', X, 6.4, ['같은 이름의 요소는 위치·크기가 이어져요', 'elements sharing a name morph between states'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.4, ['::view-transition-* 의사 요소를 CSS로 조절', 'tune ::view-transition-* pseudo-elements in CSS'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'p1', X, .8, 5.0, '/list', 'line', 4, { h: 1.1 }); arw(S, 'pa', [X + 5.05, 1.35], [X + 6.95, 1.35], 4); nd(S, 'p2', X + 7.0, .8, 5.0, '/item/3', 'accent', 4, { h: 1.1 });
      lbl(S, 'n4', X, 6.4, ['문서 간 이동(MPA)도 CSS 한 줄로 · 동작 줄이기 존중', 'cross-document too, with one CSS rule; honor reduced motion'], 'a', 4, { w: 12 });
    },
    notes: [['startViewTransition으로 DOM 변경을 감싸면 브라우저가 바뀌기 전과 후의 스냅숏을 찍어 기본 크로스페이드로 이어 줘요', 'wrapping a DOM update in startViewTransition makes the browser snapshot before and after and crossfade between them'], ['목록의 썸네일과 상세의 큰 이미지에 같은 view-transition-name을 주면 위치와 크기가 자연스럽게 이어져요', 'giving a list thumbnail and a detail hero the same view-transition-name morphs position and size between them'], ['::view-transition-old와 -new 의사 요소를 CSS 애니메이션으로 조절해 속도와 효과를 바꿔요', 'the ::view-transition-old and -new pseudo-elements take CSS animations to change timing and effect'], ['@view-transition { navigation: auto }는 페이지 간 이동(MPA)에도 전환을 걸어요 · 같은 문서 전환은 주요 브라우저가 모두 지원해요', '@view-transition { navigation: auto } applies transitions across page loads (MPA), and same-document transitions work in all major browsers']],
    fin: [['View Transitions API: 상태나 페이지가 바뀔 때 브라우저가 전후 화면을 이어 주는 표준 전환 기능', 'the View Transitions API lets the browser connect before and after views when state or pages change', 'fex-xs fex-a'], ['지원하지 않으면 그냥 즉시 바뀌어서 점진적 향상에 좋아요', 'unsupported browsers simply switch instantly, ideal for progressive enhancement'], ['prefers-reduced-motion이면 애니메이션을 줄여요', 'reduce animation under prefers-reduced-motion']],
    caps: [['스냅숏 전환', 'Snapshot transitions'], ['공유 요소', 'Shared elements'], ['CSS로 조절', 'Tuning with CSS'], ['페이지 간 전환', 'Cross-document transitions'], ['View Transitions', 'View Transitions']]
  });
}

function sAuthUi() {
  return CW('fe-auth-ui', {
    code: [['// 액세스 토큰: 메모리 (짧게)', '// access token: in memory (short-lived)'], ['// 리프레시: httpOnly · Secure 쿠키', '// refresh: httpOnly, Secure cookie'], ['// ✗ localStorage: XSS 한 번이면 탈취', '// ✗ localStorage: one XSS steals it'], 'if (res.status === 401) {', ['  await refreshOnce();   // 동시 요청도 1번만', '  await refreshOnce();   // once for all'], '  return retry(req);', '}', '<RequireAuth><Dashboard /></RequireAuth>'],
    hl: [[0, 3], [3, 4, 'ok'], [4, 1, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4, R = [['localStorage', ['JS로 읽힘 · XSS 위험', 'readable by JS: XSS risk'], 'danger'], [['메모리', 'memory'], ['새로고침하면 사라짐', 'lost on reload'], 'warn'], [['httpOnly 쿠키', 'httpOnly cookie'], ['JS로 못 읽음 · SameSite', 'not readable by JS, SameSite'], 'ok']];
      R.forEach(([a, b, c], i) => { nd(S, 'r' + i, X, .8 + i * 1.4, 4.4, a, c, 1, { h: 1.1 }); lbl(S, 'rb' + i, X + 4.8, 1.0 + i * 1.4, b, 'm', 1); });
      lbl(S, 'n1', X, 6.6, ['저장 위치마다 위험이 달라요', 'each storage spot has different risks'], 'a', 1, { off: 2, w: 12 });
      ['req A', 'req B', 'req C'].forEach((t, i) => chip(S, 'q' + i, X + i * 2.6, 5.0, 2.3, t, 'danger', 2, { off: 4, h: 1.0 })); nd(S, 'rf', X + 8.2, 5.0, 3.8, 'refresh ×1', 'ok', 2, { off: 4, h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['동시에 401이 와도 갱신은 한 번만', 'many 401s, one refresh'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['갱신을 기다린 요청들은 새 토큰으로 재시도', 'waiting requests retry with the new token'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'gd', X, 5.0, 12.0, ['로그인 안 됨 → /login?next=/dashboard', 'signed out → /login?next=/dashboard'], 'accent', 4, { h: .9 }); lbl(S, 'n4', X, 6.6, ['화면 보호는 UX · 진짜 권한 검사는 서버', 'route guards are UX; real checks are on the server'], 'a', 4, { w: 12 });
    },
    notes: [['localStorage의 토큰은 JS로 읽혀서 XSS 한 번이면 탈취돼요 · 메모리는 안전하지만 새로고침하면 사라지고, httpOnly 쿠키는 JS가 못 읽어요', 'tokens in localStorage are readable by JS and stolen by a single XSS; memory is safer but lost on reload, and httpOnly cookies are unreadable by JS'], ['여러 요청이 동시에 401을 받으면 갱신을 각자 하지 않고 하나의 갱신 요청을 함께 기다리게 해요(single-flight)', 'when several requests hit 401 at once, they await one shared refresh instead of each refreshing (single-flight)'], ['갱신이 끝나면 기다리던 요청들이 새 토큰으로 다시 보내져서 사용자는 끊김을 못 느껴요', 'once refreshed, the waiting requests retry with the new token and users notice nothing'], ['로그인이 필요한 화면은 원래 주소를 기억해 로그인 뒤 돌려보내요 · 화면 숨기기는 UX일 뿐 진짜 권한 검사는 서버가 해요', 'protected screens remember the original URL and return users after login, but hiding UI is only UX; the server enforces permissions']],
    fin: [['프론트엔드 인증 처리: 토큰 저장 위치, 갱신 흐름, 보호된 화면을 보안과 UX 양쪽에서 설계해요', 'frontend auth handling designs token storage, refresh flows and protected screens for both security and UX', 'fex-xs fex-a'], ['쿠키를 쓰면 SameSite와 CSRF 대책을 함께 챙겨요', 'cookies need SameSite and CSRF defenses'], ['CSP로 XSS 자체를 줄이는 게 가장 큰 방어예요', 'a CSP that limits XSS is the strongest defense']],
    caps: [['토큰 저장 위치', 'Where tokens live'], ['갱신은 한 번만', 'One refresh only'], ['재시도', 'Retrying'], ['보호된 화면', 'Protected screens'], ['프론트엔드 인증', 'Frontend auth']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('fe-arch', '구조와 설계', 'Architecture', '프론트엔드 구조와 설계', 'Frontend architecture and design', '컴포넌트를 나누는 기준, 디자인 시스템, 폴더 구조, 모노레포와 마이크로 프론트엔드, 아일랜드 아키텍처와 Web Components예요.', 'How to split components, design systems, folder structure, monorepos and micro frontends, islands architecture and Web Components.', [
    item('fe-component-design', '컴포넌트 설계', 'Component design', '컴포넌트는 하나의 역할을 맡게 나누고, 데이터는 props로 내려보내고 이벤트는 콜백으로 올려요. 상속보다 조합으로 유연하게 만들어요.', '데이터 요청, 상태, 화면, 이벤트가 600줄짜리 컴포넌트 하나에 몰리면 작은 수정에도 전체를 이해해야 하고 다른 곳에서 재사용할 수 없어요. 데이터와 상태를 다루는 위쪽 컴포넌트와 props만 받아 그리는 아래쪽 컴포넌트로 역할을 나누면 표시 컴포넌트는 Storybook과 테스트에서 혼자 다룰 수 있어요. 데이터는 props로 내려가고 사용자의 행동은 onBuy 같은 콜백으로 위에 알리는 단방향 흐름이라 버그를 추적하기 쉬워요. props가 수십 개로 늘어나면 Card.Header, Card.Body처럼 조각을 끼워 넣는 합성 컴포넌트나 children을 써서 API를 단순하게 해요. 여러 단계를 그대로 통과만 하는 props(prop drilling)는 컨텍스트나 조합으로 줄여요. 너무 잘게 쪼개면 오히려 파일을 오가는 비용이 커지니 “함께 바뀌는 것은 함께”를 기준으로 삼아요.', 'Components should each take one role, with data flowing down as props and events flowing up through callbacks, and composition making them flexible instead of inheritance.', 'When fetching, state, UI and events pile into one 600-line component, every small change needs the whole picture and nothing can be reused. Splitting roles between upper components that own data and state and lower components that only render props lets display components live alone in Storybook and tests. Data flows down as props and user actions report up through callbacks such as onBuy, a one-way flow that makes bugs easy to trace. When props multiply into dozens, compound components such as Card.Header and Card.Body or children keep the API simple. Props that merely pass through many levels (prop drilling) are reduced with context or composition. Splitting too finely adds file-hopping costs, so use “what changes together stays together” as the rule.', sComponentDesign()),
    item('fe-design-system', '디자인 시스템', 'Design systems', '색·간격·글자 같은 디자인 결정을 토큰으로 만들고, 그 위에 기본 컴포넌트와 패턴을 쌓은 공유 UI 언어예요. 일관성과 개발 속도를 함께 높여요.', '가장 아래층의 디자인 토큰은 --color-primary, --space-4처럼 이름 붙은 값으로, 디자인 도구(Figma 변수)와 코드가 같은 이름을 공유해요. Button, Input 같은 기본 요소는 토큰만 쓰고 variant, size처럼 정해진 선택지만 열어 두어 아무 색이나 쓰지 못하게 해요. 폼, 카드, 내비게이션 같은 패턴은 기본 요소를 조합해 만들고, 페이지는 패턴을 배치하는 일에 집중해요. Storybook에서 컴포넌트를 상태별 스토리로 모아 보면 카탈로그, 사용 문서, 시각 회귀 테스트를 한곳에서 해결해요. 접근성(포커스, 대비, 레이블)을 기본 요소에 넣어 두면 그걸 쓰는 모든 화면이 자동으로 좋아져요. 디자이너와 개발자가 같은 이름으로 대화하게 되는 것이 가장 큰 효과예요.', 'A design system turns design decisions such as color, spacing and type into tokens and builds primitives and patterns on top, a shared UI language that raises consistency and speed.', 'At the bottom, design tokens are named values such as --color-primary and --space-4, shared by design tools (Figma variables) and code. Primitives such as Button and Input use only tokens and expose fixed choices such as variant and size, so arbitrary colors cannot creep in. Patterns such as forms, cards and navigation compose primitives, and pages focus on arranging patterns. Storybook gathers components as per-state stories, providing a catalog, usage docs and visual regression tests in one place. Accessibility built into primitives, focus, contrast and labels, improves every screen that uses them. The biggest win is designers and developers speaking with the same names.', sDesignSystem()),
    item('fe-folder-structure', '폴더 구조', 'Folder structure', '파일을 종류(components, hooks)보다 기능(cart, auth) 단위로 모으고, app → features → shared 방향으로만 의존하게 해요.', 'components/, hooks/, utils/처럼 종류별로 나누면 처음엔 깔끔해 보이지만, 장바구니 기능 하나를 고치려면 네다섯 폴더를 오가야 해요. 기능별 구조는 features/cart 안에 그 기능의 UI, API 호출, 상태, 타입을 모아 함께 바뀌는 코드를 가까이 둬요(colocation). app(라우팅, 전역 설정) → features → shared(공용 UI, 유틸)처럼 의존 방향을 한쪽으로 고정하면 순환 의존이 생기지 않아요. 각 기능은 index.ts로 공개할 것만 내보내고 내부 파일은 숨겨서, 다른 곳이 내부 구현에 기대지 못하게 해요. 기능끼리 직접 import하는 것은 eslint-plugin-boundaries 같은 규칙으로 막아요. Feature-Sliced Design은 이런 규칙을 층(layer)과 조각(slice)으로 정리한 대표적인 방법론이에요.', 'Group files by feature (cart, auth) rather than by type (components, hooks), and let dependencies flow only from app to features to shared.', 'Grouping by type, as in components/, hooks/ and utils/, looks tidy at first, but fixing the cart means visiting four or five folders. Feature-based structure keeps a feature’s UI, API calls, state and types together in features/cart, colocating code that changes together. Fixing the direction app (routing, global setup) → features → shared (common UI, utilities) prevents circular dependencies. Each feature exports only its public surface through index.ts and hides internals, so nothing depends on implementation details. Direct imports between features are blocked with rules such as eslint-plugin-boundaries. Feature-Sliced Design is a well-known methodology that formalizes these rules into layers and slices.', sFolderStructure()),
    item('fe-monorepo', '모노레포', 'Monorepos', '여러 앱과 공유 패키지를 한 저장소에서 관리해요. 워크스페이스로 패키지를 연결하고, Turborepo·Nx가 바뀐 것만 빌드하고 결과를 캐시해요.', 'apps/web, apps/admin과 packages/ui, packages/api-client를 한 저장소에 두면 라이브러리와 그것을 쓰는 앱을 한 번의 PR로 함께 바꿀 수 있어요. pnpm 워크스페이스는 "@acme/ui": "workspace:*"로 로컬 패키지를 바로 연결해서 npm에 배포하지 않아도 수정이 즉시 반영돼요. Turborepo나 Nx는 패키지 의존 그래프를 알기 때문에 ui를 고치면 그것에 영향받는 앱만 다시 빌드하고 테스트해요. 작업 입력의 해시로 결과를 캐시하고 원격 캐시로 팀과 CI가 공유하면, 누군가 이미 빌드한 것은 다시 하지 않아 CI 시간이 크게 줄어요. 공통 ESLint, TypeScript 설정도 packages/config로 나눠 일관성을 지켜요. 대신 저장소가 커지면서 권한 관리, CI 설계, 도구 학습 같은 운영 부담도 함께 늘어요.', 'A monorepo keeps many apps and shared packages in one repository, linking packages through workspaces while Turborepo or Nx build only what changed and cache results.', 'Keeping apps/web, apps/admin, packages/ui and packages/api-client together lets one PR change a library and every app using it. pnpm workspaces link local packages through "@acme/ui": "workspace:*", so edits apply instantly without publishing to npm. Turborepo or Nx know the package dependency graph, so editing ui rebuilds and retests only the apps it affects. Caching results by a hash of task inputs and sharing them through a remote cache means nothing already built by a teammate or CI is built again, cutting CI time sharply. Shared ESLint and TypeScript settings live in packages/config for consistency. In return, a growing repository brings operational overhead in access control, CI design and tooling knowledge.', sMonorepo()),
    item('fe-micro-frontends', '마이크로 프론트엔드', 'Micro frontends', '큰 프론트엔드를 팀별 앱으로 나눠 독립적으로 개발·배포하고, shell 앱이 런타임에 조합해요. 기술보다 조직 규모의 문제를 푸는 아키텍처예요.', 'shell(호스트) 앱이 헤더와 라우팅을 맡고, 상품 팀과 장바구니 팀이 만든 앱 조각을 런타임에 불러와 한 화면에 합쳐요. Module Federation(webpack, Rspack, Vite 플러그인)의 exposes로 각 팀이 조각을 공개하면 다른 팀 배포와 상관없이 자기 일정대로 배포할 수 있어요. React 같은 공통 라이브러리는 shared의 singleton으로 한 번만 불러와 중복 다운로드와 버전 충돌을 막아요. 대신 빌드·배포 구성이 복잡해지고, 팀마다 디자인과 의존성 버전이 어긋나지 않게 맞추는 비용, 런타임 오류 추적의 어려움이 생겨요. iframe, Web Components, 서버에서 HTML 조각을 합치는 방식도 같은 목표의 다른 구현이에요. 수십 명 이상이 한 프론트엔드를 다루는 큰 조직에서만 이득이고, 작은 팀은 모노레포와 모듈 경계로 충분해요.', 'Micro frontends split a large frontend into per-team apps that develop and deploy independently and are composed at run time by a shell app, an architecture for organizational scale rather than technology.', 'A shell (host) app owns the header and routing and loads pieces built by, say, the products team and the cart team into one screen at run time. With Module Federation (webpack, Rspack or Vite plugins), each team exposes its piece and deploys on its own schedule regardless of other teams. Common libraries such as React load once as singletons in shared, avoiding duplicate downloads and version clashes. The costs are complex build and deploy setups, effort to keep design and dependency versions aligned across teams, and harder runtime error tracing. Iframes, Web Components and server-side HTML composition are other implementations of the same goal. It pays off only for large organizations with dozens of people on one frontend; small teams do fine with a monorepo and module boundaries.', sMicroFrontends()),
    item('fe-islands', '아일랜드 아키텍처', 'Islands architecture', '페이지는 서버에서 정적 HTML로 만들고, 상호작용이 필요한 부분(섬)만 골라 JavaScript를 붙여요. 보내는 JS가 크게 줄어요.', '전통적인 SSR 앱은 HTML을 보낸 뒤 페이지 전체를 하이드레이션해서, 정적인 본문과 푸터에도 컴포넌트 코드가 함께 내려가요. 아일랜드 아키텍처(Astro 등)는 기본적으로 JS를 0KB 보내고, 검색창이나 댓글처럼 상호작용이 필요한 컴포넌트에만 client:load, client:visible, client:idle 같은 지시어로 JS를 붙여요. client:visible은 화면에 보일 때까지 활성화를 미뤄 첫 로딩을 더 가볍게 해요. 섬들은 서로 독립적으로 하이드레이션되므로 한 섬의 무거운 코드가 다른 부분을 막지 않아요. 블로그, 문서, 마케팅, 상품 상세처럼 콘텐츠 중심 사이트에 특히 잘 맞고, 화면 전체가 상호작용인 대시보드에는 이점이 적어요. React 서버 컴포넌트의 “필요한 곳만 클라이언트”, Qwik의 재개(resumability)도 같은 문제를 다른 방식으로 풀어요.', 'Islands architecture renders the page as static HTML on the server and attaches JavaScript only to interactive parts (islands), shrinking the JS shipped.', 'Traditional SSR apps send HTML and then hydrate the whole page, shipping component code even for static articles and footers. Islands architecture, as in Astro, ships 0 KB of JS by default and adds it only to interactive components such as search or comments through directives such as client:load, client:visible and client:idle. client:visible delays activation until the island scrolls into view, lightening the first load. Islands hydrate independently, so one heavy island never blocks the rest. It suits content-heavy sites such as blogs, docs, marketing and product pages, and helps less for dashboards that are interactive throughout. React Server Components’ “client only where needed” and Qwik’s resumability tackle the same problem differently.', sIslands()),
    item('fe-web-components', 'Web Components', 'Web Components', 'Custom Elements, Shadow DOM, slot으로 만드는 브라우저 표준 컴포넌트예요. 프레임워크와 상관없이 어디서나 같은 태그로 써요.', 'class UserCard extends HTMLElement를 customElements.define(\'user-card\', UserCard)로 등록하면 <user-card>를 일반 HTML 태그처럼 써요. connectedCallback, attributeChangedCallback 같은 수명 주기 메서드로 요소가 붙거나 속성이 바뀔 때 반응해요. attachShadow로 만든 Shadow DOM은 안쪽 스타일이 밖으로 새지 않고 바깥 CSS도 들어오지 않아 진짜 캡슐화를 줘요(CSS 변수와 ::part로 의도된 부분만 열어요). slot은 바깥에서 넣은 내용을 컴포넌트 안의 정해진 자리에 보여줘요. 표준 기술이라 React, Vue, 순수 HTML 어디서든 같은 컴포넌트를 쓸 수 있어 여러 프레임워크를 쓰는 조직의 디자인 시스템 공유에 좋아요. Lit 같은 작은 라이브러리가 작성을 편하게 해 주고, 서버 렌더링(Declarative Shadow DOM)과 폼 연동(ElementInternals)은 추가로 챙겨야 해요.', 'Web Components are browser-standard components built from Custom Elements, Shadow DOM and slots, used as the same tag in any framework or none.', "Registering class UserCard extends HTMLElement with customElements.define('user-card', UserCard) makes <user-card> usable like any HTML tag. Lifecycle methods such as connectedCallback and attributeChangedCallback react when the element attaches or attributes change. A Shadow DOM from attachShadow keeps inner styles from leaking out and outer CSS from leaking in, giving true encapsulation, with CSS variables and ::part opening only intended parts. Slots show content supplied from outside in set places inside the component. As a standard, the same component works in React, Vue or plain HTML, ideal for sharing a design system across frameworks. Small libraries such as Lit ease authoring, while server rendering (Declarative Shadow DOM) and form integration (ElementInternals) need extra care.", sWebComponents())
  ]),
  sec('fe-data', '데이터와 상태', 'Data & state', '데이터와 상태 다루기', 'Handling data and state', '서버 상태 캐시, 낙관적 업데이트, 폼, URL 상태, API 계층, 그리고 긴 목록을 위한 가상 스크롤과 무한 스크롤이에요.', 'Server-state caches, optimistic updates, forms, URL state, the API layer, and virtual and infinite scrolling for long lists.', [
    item('fe-server-state', '서버 상태 관리', 'Server state management', '서버에서 온 데이터는 키 기반 캐시로 다뤄요. TanStack Query 같은 도구가 중복 요청 제거, 캐시, 재검증, 재시도를 맡아요.', '서버 데이터는 다른 사람이 언제든 바꿀 수 있고 오래되면 다시 받아야 해서 모달 열림 같은 UI 상태와 성격이 달라요. useQuery({ queryKey: [\'todos\', { page }], queryFn })처럼 키를 주면, 같은 키를 쓰는 여러 컴포넌트가 요청 한 번의 결과를 공유해요. staleTime 동안은 신선한 데이터로 보고, 지나면 화면에 캐시를 보여주면서 뒤에서 다시 받는 stale-while-revalidate 방식으로 동작해요. 창에 다시 포커스하거나 네트워크가 다시 연결될 때도 자동으로 재검증하고, 실패한 요청은 정해진 횟수만큼 재시도해요. 데이터를 바꾼 뒤 invalidateQueries로 관련 키를 무효화하면 그 키를 쓰는 화면이 알아서 새로 받아요. 이렇게 서버 상태를 분리하면 Redux 같은 전역 스토어에는 테마, 장바구니 초안 같은 진짜 클라이언트 상태만 남아 훨씬 단순해져요.', 'Server data is handled as a keyed cache, with tools such as TanStack Query deduplicating requests, caching, revalidating and retrying.', "Server data can change under you at any time and must be refetched when stale, so it differs from UI state such as an open modal. Giving a key, as in useQuery({ queryKey: ['todos', { page }], queryFn }), lets every component using that key share one request’s result. Data counts as fresh during staleTime, after which the cache stays on screen while a background refetch runs, the stale-while-revalidate pattern. It also revalidates on window focus or reconnection and retries failed requests a set number of times. After a change, invalidateQueries marks related keys stale so screens using them refetch on their own. Separating server state leaves global stores such as Redux holding only true client state, such as themes or cart drafts, and much simpler.", sServerState()),
    item('fe-optimistic', '낙관적 업데이트', 'Optimistic updates', '요청이 성공할 거라 보고 화면을 먼저 바꾼 뒤, 실패하면 이전 값으로 되돌려요. 사용자가 기다림을 느끼지 않게 하는 체감 속도 기법이에요.', '좋아요를 누르면 서버 응답을 기다리지 않고 캐시를 먼저 바꿔 하트와 숫자가 즉시 변해요. useMutation의 onMutate에서 이전 값을 보관하고 setQueryData로 캐시를 고친 뒤, 실제 요청은 뒤에서 진행돼요. 요청이 실패하면 onError가 보관한 값으로 되돌리고 토스트 같은 알림으로 실패를 알려요. 성공이든 실패든 onSettled에서 무효화해 서버의 진짜 값(다른 사람이 누른 좋아요 포함)과 맞춰요. React 19의 useOptimistic 훅은 액션이 진행되는 동안만 낙관적 값을 보여주는 더 간단한 방법이에요. 실패 가능성이 낮고 되돌리기 쉬운 동작(좋아요, 체크, 순서 바꾸기)에 쓰고, 결제나 삭제처럼 되돌릴 수 없거나 중요한 동작에는 서버 확인을 기다려요.', 'Optimistic updates change the UI first assuming the request will succeed and roll back on failure, a perceived-speed technique that hides waiting.', 'Tapping like updates the cache before the server replies, so the heart and count change instantly. useMutation’s onMutate saves the previous value and edits the cache with setQueryData while the real request runs in the background. If it fails, onError restores the saved value and reports the failure with a toast or similar notice. Either way, onSettled invalidates to match the server’s true value, including likes from others. React 19’s useOptimistic hook is a simpler way to show an optimistic value only while an action is pending. Use it for actions that rarely fail and are easy to undo, such as likes, checkboxes or reordering, and wait for server confirmation on irreversible or critical ones such as payments or deletions.', sOptimistic()),
    item('fe-forms', '폼 처리', 'Form handling', '스키마 하나로 규칙과 타입을 정의하고, 비제어 입력으로 리렌더를 줄이고, 오류는 필드 옆에 보여줘요. 서버에서는 반드시 다시 검사해요.', 'Zod 같은 스키마로 email: z.email(), pw: z.string().min(8)처럼 규칙을 정의하면 검증 로직과 TypeScript 타입이 한곳에서 나와요. React Hook Form은 입력값을 DOM에 두는 비제어 방식이라 글자를 칠 때마다 폼 전체를 리렌더하지 않아 필드가 많아도 빨라요. zodResolver로 스키마를 연결하고, 입력을 마칠 때(blur)나 제출할 때 검사해 오류를 해당 필드 바로 옆에 구체적인 문장으로 보여줘요. 오류 문구는 aria-describedby로 입력과 연결하고, 제출 실패 시 첫 오류 필드로 포커스를 옮기면 키보드·스크린 리더 사용자도 쉽게 고쳐요. 클라이언트 검증은 빠른 피드백일 뿐이라 같은 스키마로 서버에서 반드시 다시 검사해야 안전해요. React 19의 form action과 useActionState를 쓰면 서버 액션의 결과와 대기 상태를 폼에 바로 연결할 수 있어요.', 'Define rules and types in one schema, reduce re-renders with uncontrolled inputs, show errors beside fields, and always re-validate on the server.', 'A schema such as Zod, with rules like email: z.email() and pw: z.string().min(8), yields validation logic and TypeScript types from one place. React Hook Form keeps values in the DOM (uncontrolled), so typing does not re-render the whole form and large forms stay fast. Connecting the schema via zodResolver, it validates on blur or submit and shows specific messages right beside each field. Linking messages to inputs with aria-describedby and focusing the first invalid field on failed submit helps keyboard and screen reader users fix errors. Client validation is only fast feedback, so the server must re-validate with the same schema to stay safe. React 19 form actions and useActionState connect server action results and pending states directly to forms.', sForms()),
    item('fe-url-state', 'URL을 상태로', 'URL as state', '검색어·필터·정렬·페이지처럼 공유하거나 북마크할 만한 상태는 URL 쿼리 파라미터에 둬요. 새로고침과 뒤로 가기에도 그대로 남아요.', '/products?q=shoe&sort=price&page=2처럼 상태를 URL에 담으면 주소만 보고도 화면을 재현할 수 있어요. 컴포넌트는 useSearchParams로 URL을 읽어 그리고, 필터를 바꿀 땐 컴포넌트 상태 대신 URL을 바꿔서 상태가 한곳에만 있게 해요. 그래서 링크를 동료에게 보내도, 새로고침해도, 뒤로 가기를 눌러도 같은 목록이 나와요. 반대로 모달 열림, 입력 중인 초안, 호버 상태처럼 순간적인 것은 메모리에 두는 게 맞아요. 검색창처럼 빠르게 바뀌는 값은 디바운스해 기록이 수십 개씩 쌓이지 않게 하고, 필터 변경은 replace로 기록을 덮어쓸지 정해요. nuqs 같은 라이브러리는 숫자·배열 같은 타입 있는 파라미터 상태를 편하게 다루게 해 줘요.', 'State worth sharing or bookmarking, such as search terms, filters, sort order and page, belongs in URL query parameters, surviving reloads and the Back button.', 'Putting state in the URL, as in /products?q=shoe&sort=price&page=2, means the address alone reproduces the screen. Components read the URL with useSearchParams, and changing a filter updates the URL rather than component state, keeping state in one place. Sending the link to a colleague, reloading or pressing Back all show the same list. Fleeting things such as an open modal, an unsent draft or hover state belong in memory instead. Fast-changing values such as search input are debounced so history does not fill up, and filter changes can choose replace to overwrite history. Libraries such as nuqs make typed URL state, such as numbers and arrays, convenient.', sUrlState()),
    item('fe-api-layer', 'API 계층', 'The API layer', '주소·인증 헤더·오류 처리·토큰 갱신 같은 네트워크 세부사항을 api 모듈 하나에 모으고, 컴포넌트는 이름 있는 함수만 불러요.', '컴포넌트마다 fetch를 직접 부르면 기본 주소, 인증 헤더, 오류 처리 방식이 화면마다 달라지고 바꿀 때 전부 찾아 고쳐야 해요. http() 같은 래퍼 하나가 기본 주소와 헤더를 붙이고, 401이 오면 토큰을 갱신한 뒤 원래 요청을 다시 보내요. fetch는 404나 500에서 예외를 던지지 않으니 res.ok를 확인해 상태 코드와 메시지를 담은 ApiError로 바꿔 던지면, 화면은 한 가지 모양의 오류만 다루면 돼요. 컴포넌트와 서버 상태 라이브러리는 api.todos(page)처럼 이름 있는 함수만 부르므로 엔드포인트가 바뀌어도 한 곳만 고쳐요. OpenAPI 명세에서 openapi-typescript, Orval 같은 도구로 타입과 함수를 생성하면 백엔드 변경이 컴파일 오류로 바로 드러나요. AbortController를 넘겨 화면을 떠난 요청을 취소하는 것도 이 계층의 일이에요.', 'The API layer gathers network details, base URL, auth headers, error handling and token refresh, into one module, and components call only named functions.', 'When every component calls fetch directly, base URLs, auth headers and error handling differ per screen, and changes mean hunting them all down. One wrapper such as http() adds the base URL and headers, and on a 401 refreshes the token and resends the original request. Since fetch does not throw on 404 or 500, checking res.ok and throwing an ApiError with status and message lets screens handle a single error shape. Components and server-state libraries call named functions such as api.todos(page), so endpoint changes touch one place. Generating types and functions from an OpenAPI spec with tools such as openapi-typescript or Orval turns backend changes into immediate compile errors. Passing an AbortController to cancel requests when users leave a screen is also this layer’s job.', sApiLayer()),
    item('fe-virtual-list', '가상 스크롤', 'Virtual scrolling', '긴 목록에서 지금 보이는 행과 약간의 여유분만 DOM에 렌더해요. 10,000행도 노드 수십 개로 부드럽게 스크롤해요.', '행 10,000개를 모두 그리면 DOM 노드가 수만 개가 되어 스타일 계산과 레이아웃이 느려지고 메모리도 많이 써요. 가상 스크롤(윈도잉)은 스크롤 위치와 행 높이로 지금 보일 범위를 계산해 그 행과 위아래 overscan 몇 개만 렌더해요. 스크롤하면 같은 노드들을 transform: translateY로 새 위치에 옮기며 내용만 바꿔 재사용해요. 전체 높이는 계산해서 컨테이너에 주기 때문에 스크롤바 길이와 위치는 진짜 목록처럼 보여요. 행 높이가 제각각이면 estimateSize로 추정한 뒤 실제로 렌더하며 측정해 보정해요. TanStack Virtual, react-window 같은 라이브러리를 쓰고, 렌더되지 않은 행은 브라우저 찾기(Ctrl+F)와 스크린 리더가 볼 수 없다는 한계도 고려해요.', 'Virtual scrolling renders only the visible rows of a long list plus a little overscan, so even 10,000 rows scroll smoothly with a few dozen nodes.', 'Rendering all 10,000 rows creates tens of thousands of DOM nodes, slowing style and layout work and using lots of memory. Virtual scrolling (windowing) computes the visible range from scroll position and row height and renders just those rows plus a few overscan rows above and below. As you scroll, the same nodes move to new positions with transform: translateY and swap their content. The total height is computed and applied to the container, so the scrollbar size and position look real. Variable row heights start from estimateSize and are corrected by measuring rows as they render. Libraries include TanStack Virtual and react-window, and unrendered rows are invisible to the browser’s find (Ctrl+F) and screen readers, a limit to keep in mind.', sVirtualList()),
    item('fe-infinite-scroll', '무한 스크롤', 'Infinite scroll', '목록 끝의 감시 요소를 IntersectionObserver로 지켜보다가 보이면 다음 페이지를 불러 이어 붙여요. 페이지는 커서 기반으로 요청해요.', '목록 맨 끝에 빈 센티널 요소를 두고 IntersectionObserver로 화면에 들어오는지 관찰하면, scroll 이벤트를 계속 계산하는 것보다 훨씬 가벼워요. rootMargin: \'400px\'을 주면 끝에 닿기 전에 미리 다음 페이지를 불러 사용자가 빈 화면을 보지 않아요. 서버는 items와 함께 nextCursor를 돌려주고, 다음 요청은 “이 항목 다음부터”라는 커서로 보내요. offset=20 방식은 그 사이 새 글이 추가되거나 삭제되면 항목이 밀려 같은 글이 두 번 나오거나 빠지는 문제가 있어요. TanStack Query의 useInfiniteQuery가 페이지 묶음과 다음 커서 관리를 도와줘요. 무한 스크롤은 푸터에 닿기 어렵고 위치를 공유하기 힘드니 “더 보기” 버튼, 스크롤 위치 복원, 아주 길어지면 가상 스크롤과의 조합을 함께 고려해요.', 'Infinite scroll watches a sentinel at the end of the list with IntersectionObserver and appends the next page when it appears, requesting pages by cursor.', "Placing an empty sentinel at the end of the list and observing it with IntersectionObserver is far lighter than computing on every scroll event. A rootMargin of '400px' loads the next page before the end is reached, so users never see a blank gap. The server returns a nextCursor with the items, and the next request sends that cursor meaning “after this item.” Offset pagination such as offset=20 shifts when posts are added or removed in between, repeating or skipping items. TanStack Query’s useInfiniteQuery manages page batches and next cursors. Infinite scroll makes footers hard to reach and positions hard to share, so consider a “load more” button, scroll restoration and, for very long lists, pairing with virtualization.", sInfinite())
  ]),
  sec('fe-perf', '성능', 'Performance', '로딩과 반응 성능', 'Loading and responsiveness', '스크립트 로딩 방식, 이미지와 웹 글꼴 최적화, 트리 셰이킹, 긴 작업 쪼개기, 해시 기반 캐싱, 예측 로딩이에요.', 'Script loading modes, image and web font optimization, tree shaking, breaking up long tasks, hash-based caching and predictive loading.', [
    item('fe-script-loading', '스크립트 로딩 방식', 'Script loading', '일반 script는 HTML 해석을 멈춰요. async는 받는 즉시, defer는 해석 뒤 순서대로 실행하고, module은 기본이 defer예요.', '속성 없는 <script src>는 내려받고 실행이 끝날 때까지 HTML 해석을 멈춰서, head에 있으면 첫 화면이 그만큼 늦어져요. async는 해석과 동시에 내려받고 도착하는 즉시 실행해요 · 실행 순서가 보장되지 않아 광고, 분석처럼 다른 코드와 독립된 스크립트에 맞아요. defer는 동시에 받아 두고 HTML 해석이 끝난 뒤 DOMContentLoaded 직전에 적힌 순서대로 실행해서, 앱 코드의 기본 선택이에요. type="module"은 기본으로 defer처럼 동작하고, import로 이어진 의존 모듈은 받아 봐야 알 수 있어 연쇄 대기가 생기니 modulepreload로 미리 알려요. 렌더를 막는 큰 CSS도 같은 문제를 일으켜서, 첫 화면에 필요한 CSS만 먼저 보내는 것이 좋아요. 서드파티 스크립트는 성능을 가장 크게 해치는 경우가 많으니 꼭 필요한지부터 따져요.', 'Plain scripts halt HTML parsing; async runs on arrival, defer runs in order after parsing, and modules defer by default.', 'A plain <script src> stops HTML parsing until it downloads and runs, so placing it in head delays the first screen by that much. async downloads in parallel and runs as soon as it arrives, with no order guarantee, suiting independent scripts such as ads and analytics. defer downloads in parallel and runs in document order after parsing, just before DOMContentLoaded, the default choice for app code. type="module" behaves like defer by default, and because imported dependencies are discovered only after download, modulepreload announces them early to avoid waterfalls. Large render-blocking CSS causes the same problem, so send only the CSS the first screen needs first. Third-party scripts are often the biggest performance drain, so question each one.', sScriptLoading()),
    item('fe-images', '이미지 최적화', 'Image optimization', 'srcset·sizes로 알맞은 크기를, AVIF·WebP로 작은 용량을, width·height로 자리를, fetchpriority·lazy로 우선순위를 정해요.', 'srcset에 400w, 800w, 1600w 파일을 적고 sizes에 화면에서 차지할 크기를 알려주면, 브라우저가 화면 폭과 픽셀 밀도에 맞는 파일만 골라 받아요. width와 height 속성은 이미지가 오기 전에 비율만큼 자리를 잡아 레이아웃이 밀리는 CLS를 막아요. 첫 화면의 대표 이미지는 대부분 LCP 요소라서 fetchpriority="high"로 먼저 받고, 절대 loading="lazy"로 미루면 안 돼요. 스크롤해야 보이는 이미지는 loading="lazy"로 미뤄 첫 로딩의 대역폭을 아껴요. AVIF와 WebP는 같은 화질에서 JPEG보다 훨씬 작고, <picture>로 지원하지 않는 브라우저에 대체 포맷을 줄 수 있어요. 이미지 CDN이나 next/image 같은 도구가 크기·포맷 변환을 자동화해 주고, 의미 있는 이미지에는 alt를, 장식에는 alt=""를 달아요.', 'srcset and sizes pick the right size, AVIF and WebP shrink bytes, width and height reserve space, and fetchpriority and lazy loading set priority.', 'Listing 400w, 800w and 1600w files in srcset and the displayed size in sizes lets the browser fetch only the file suited to viewport width and pixel density. The width and height attributes reserve aspect-ratio space before the image arrives, preventing layout shift (CLS). The hero image on the first screen is usually the LCP element, so fetchpriority="high" loads it first, and it must never be lazy-loaded. Images below the fold use loading="lazy" to save bandwidth during the first load. AVIF and WebP are far smaller than JPEG at the same quality, and <picture> provides fallbacks for browsers lacking support. Image CDNs or tools such as next/image automate resizing and conversion, and meaningful images need alt text while decorative ones use alt="".', sImages()),
    item('fe-fonts', '웹 글꼴 최적화', 'Web font optimization', 'font-display: swap으로 글자가 숨지 않게 하고, 서브셋·woff2로 크기를 줄이고, preload로 일찍 받아요. 대체 글꼴 크기를 맞춰 밀림도 줄여요.', '웹 글꼴이 늦게 오면 브라우저가 한동안 글자를 숨기는 FOIT가 생겨 첫 화면이 비어 보여요. font-display: swap은 대체 글꼴로 먼저 보여주고 도착하면 바꾸는데, 두 글꼴의 폭이 다르면 줄바꿈이 바뀌며 화면이 밀려서 size-adjust, ascent-override로 대체 글꼴의 크기를 맞춰요. 한글은 완성형 글자가 11,172자라 글꼴 파일이 크기 때문에, 자주 쓰는 글자로 서브셋을 만들고 unicode-range로 나눠 필요한 조각만 받게 해요. 압축률이 좋은 woff2를 쓰고 실제로 쓰는 굵기만 포함하며, 여러 굵기가 필요하면 가변 글꼴 하나로 대신해요. <link rel="preload" as="font" crossorigin>는 CSS 해석을 기다리지 않고 글꼴을 바로 요청하게 해요. 다운로드가 전혀 없는 시스템 글꼴 스택도 좋은 선택이에요.', 'font-display: swap keeps text visible, subsetting and woff2 shrink files, preload fetches early, and fallback metric matching reduces shifts.', 'A late web font can trigger FOIT, where browsers hide text for a while and the first screen looks empty. font-display: swap shows a fallback first and switches on arrival, but differing widths reflow lines and shift the page, so size-adjust and ascent-override align the fallback’s metrics. Korean has 11,172 precomposed syllables, making font files large, so subset to common characters and split with unicode-range so only needed chunks download. Use well-compressed woff2, include only the weights you use, and replace several weights with one variable font. <link rel="preload" as="font" crossorigin> requests the font without waiting for CSS parsing. A system font stack, downloading nothing at all, is also a fine choice.', sFonts()),
    item('fe-tree-shaking', '트리 셰이킹', 'Tree shaking', '번들러가 ESM의 import·export를 정적으로 분석해 쓰이지 않는 코드를 결과물에서 빼요. CommonJS나 통째 import는 셰이킹되지 않아요.', 'ESM의 import와 export는 실행 전에 구조가 정해져 있어서, 번들러가 어떤 export가 실제로 쓰이는지 알고 나머지를 결과물에서 제거해요. CommonJS(require, module.exports)는 실행해 봐야 무엇을 쓰는지 알 수 있어 import _ from \'lodash\'처럼 가져오면 라이브러리 전체가 번들에 들어가요. lodash-es처럼 ESM 버전에서 import { debounce }로 이름을 지정하면 필요한 코드만 들어가요. package.json의 "sideEffects": false는 “import만 해도 실행되는 코드가 없다”는 약속이라 쓰지 않는 파일을 통째로 생략하게 해 주고, CSS import처럼 부수 효과가 있는 파일은 목록으로 예외 처리해요. 모든 것을 다시 내보내는 배럴 파일(index.ts)은 번들러에 따라 셰이킹을 방해하기도 해요. rollup-plugin-visualizer 같은 번들 분석기로 무엇이 큰지 눈으로 확인하는 습관이 중요해요.', 'Bundlers statically analyze ESM imports and exports to drop unused code from the output, while CommonJS or whole-library imports cannot be shaken.', "ESM imports and exports have a fixed structure before execution, so bundlers can see which exports are used and remove the rest. CommonJS (require, module.exports) reveals usage only at run time, so import _ from 'lodash' pulls the whole library into the bundle. Naming imports from an ESM build, as in import { debounce } from lodash-es, includes only the needed code. \"sideEffects\": false in package.json promises that importing runs nothing, letting bundlers skip unused files entirely, with files that do have side effects, such as CSS imports, listed as exceptions. Barrel files (index.ts) that re-export everything can hinder shaking depending on the bundler. Habitually checking what is large with a bundle analyzer such as rollup-plugin-visualizer matters.", sTreeShaking()),
    item('fe-long-tasks', '긴 작업 쪼개기', 'Breaking up long tasks', '50ms를 넘는 긴 작업은 클릭과 입력을 막아 INP를 나쁘게 해요. 작업을 조각내고 사이사이 메인 스레드를 양보하거나 Web Worker로 옮겨요.', '브라우저의 JavaScript, 스타일 계산, 레이아웃, 이벤트 처리는 모두 메인 스레드 하나에서 돌아서, 300ms짜리 작업이 실행 중이면 그 사이의 클릭은 끝날 때까지 기다려요. 이런 지연이 INP(Interaction to Next Paint) 점수를 나쁘게 해요. 큰 반복 작업을 작은 조각으로 나누고 조각 사이마다 await로 메인 스레드를 양보하면, 브라우저가 그 틈에 쌓인 입력과 화면 갱신을 먼저 처리해요. scheduler.yield()는 양보한 뒤 다시 자기 차례를 앞쪽에 받는 API로 Chrome과 Firefox가 지원하고, 없는 브라우저에서는 setTimeout(0)으로 대신해요. 이미지 처리나 큰 데이터 파싱처럼 정말 무거운 계산은 Web Worker로 옮겨 메인 스레드를 비워요. DevTools 성능 패널에서 빨간 표시가 붙은 긴 작업을 찾아 원인부터 확인해요.', 'Tasks over 50ms block clicks and input and worsen INP, so split work into chunks that yield the main thread, or move it to a Web Worker.', 'JavaScript, style calculation, layout and event handling all run on one main thread, so a click during a 300ms task waits until it ends. That delay worsens the INP (Interaction to Next Paint) score. Splitting a big loop into small chunks and yielding with await between them lets the browser handle queued input and rendering in the gaps. scheduler.yield() yields and then resumes near the front of the queue, supported in Chrome and Firefox, with setTimeout(0) as the fallback elsewhere. Truly heavy computation such as image processing or parsing large data moves to a Web Worker, freeing the main thread. Find long tasks marked in red in the DevTools Performance panel and start from their cause.', sLongTasks()),
    item('fe-asset-hashing', '콘텐츠 해시 캐싱', 'Content-hash caching', '파일 이름에 내용의 해시를 넣으면 해시 파일은 1년 동안 캐시하고, HTML만 매번 확인해 새 이름을 받아요. 긴 캐시와 즉시 갱신을 함께 얻어요.', '빌드 도구는 app.3f9a1c.js처럼 파일 내용으로 만든 해시를 이름에 넣어서, 내용이 같으면 이름도 같고 한 글자라도 바뀌면 이름이 바뀌어요. 이름이 곧 내용의 지문이므로 해시 파일은 Cache-Control: max-age=31536000, immutable로 영원히 캐시해도 오래된 파일을 받을 일이 없어요. 대신 index.html은 no-cache로 매번 서버에 확인해서, 배포 후 바뀐 파일 이름 목록을 바로 받아요. 자주 바뀌는 앱 코드와 거의 안 바뀌는 라이브러리(vendor)를 다른 파일로 나누면 배포해도 vendor는 캐시를 그대로 써서 재방문이 빨라요. 배포 중 캐시된 옛 HTML이 지운 파일을 요청할 수 있으니 이전 버전 파일은 잠시 남겨 둬요. 이 방식 덕분에 CDN 캐시를 수동으로 비우는 일이 거의 필요 없어져요.', 'Putting a content hash in file names lets hashed files be cached for a year while only HTML is rechecked for new names, achieving long caching and instant updates together.', 'Build tools embed a hash of the file’s content in its name, as in app.3f9a1c.js, so identical content keeps the same name and any change produces a new one. Because the name fingerprints the content, hashed files can be cached forever with Cache-Control: max-age=31536000, immutable without ever serving stale code. index.html, by contrast, is no-cache and revalidated on every visit, picking up new file names right after a deploy. Splitting frequently changing app code from rarely changing libraries (vendor) means vendor stays cached across deploys, speeding repeat visits. Keep previous files briefly after a deploy, since cached old HTML may still request them. Thanks to this, manual CDN cache purges become almost unnecessary.', sAssetHashing()),
    item('fe-prefetch', '예측 로딩', 'Predictive loading', '사용자가 누르기 전에 다음 화면의 코드와 데이터를 미리 받아 두거나(prefetch), 페이지를 통째로 미리 렌더(prerender)해 전환을 즉시로 만들어요.', '보통은 링크를 누른 뒤에야 다음 화면의 코드와 데이터를 받기 시작해 그만큼 기다려요. 마우스를 올리는 순간 queryClient.prefetchQuery로 데이터를 받아 두면 올리고 누르기까지의 수백 ms를 벌어, 누를 때 이미 캐시에 있어요. Next.js의 Link는 화면에 보이는 링크의 코드를 자동으로 미리 받아요. Speculation Rules API는 <script type="speculationrules">로 /p/* 같은 링크의 다음 페이지를 통째로 미리 렌더해 두어 클릭하면 즉시 전환되고, 크로미움 계열 브라우저가 지원하며 다른 브라우저는 그냥 무시해요. eagerness로 얼마나 적극적으로 미리 할지 정하고, 데이터 절약 모드나 느린 네트워크에서는 끄는 게 좋아요. 미리 받은 것은 안 쓰일 수도 있는 낭비이므로, 확률 높은 다음 행동에만 쓰고 부작용이 있는 요청(GET이라도 상태를 바꾸는 것)은 절대 미리 부르지 않아요.', 'Predictive loading fetches the next screen’s code and data before the click (prefetch) or renders the whole page ahead (prerender), making navigation instant.', 'Normally the next screen’s code and data start loading only after the click, so users wait. Fetching data with queryClient.prefetchQuery on hover gains the hundreds of milliseconds between hover and click, so it is already cached at click time. Next.js Link automatically prefetches code for links visible on screen. The Speculation Rules API, via <script type="speculationrules">, prerenders whole next pages for links such as /p/* so clicks switch instantly; Chromium browsers support it and others simply ignore it. eagerness controls how aggressively to speculate, and it is best turned off on data saver or slow networks. Prefetched resources may go unused, so reserve them for likely next actions and never prefetch requests with side effects, even GETs that change state.', sPrefetch())
  ]),
  sec('fe-tooling', '도구와 품질', 'Tooling & quality', '개발 도구와 품질 관리', 'Developer tooling and quality', '빌드 도구와 HMR, 트랜스파일과 폴리필, 린트와 포맷, 테스트 전략, API 모킹, 그리고 운영 중 모니터링이에요.', 'Build tools and HMR, transpiling and polyfills, linting and formatting, testing strategy, API mocking and production monitoring.', [
    item('fe-build-tools', '빌드 도구와 HMR', 'Build tools and HMR', 'Vite 같은 빌드 도구는 개발 땐 필요한 모듈만 바로 변환해 주고 HMR로 즉시 반영하며, 배포 땐 번들·압축·해시로 최적화해요.', 'Vite 개발 서버는 시작할 때 전체를 번들하지 않고, 브라우저가 import로 요청하는 파일만 그때그때 변환해 네이티브 ESM으로 보내서 큰 프로젝트도 거의 즉시 시작해요. 파일을 저장하면 HMR(Hot Module Replacement)이 바뀐 모듈만 교체해서 새로고침 없이 반영되고, React Fast Refresh는 컴포넌트 상태까지 유지해요. vite build는 배포용으로 모듈을 묶고(bundle), 코드를 줄이고(minify), 해시 이름을 붙이고, 코드 분할로 필요할 때 받을 조각을 만들어요. 2026년 3월에 나온 Vite 8은 esbuild와 Rollup을 Rust 기반 Rolldown 하나로 바꾸고 변환에 Oxc를 써서 빌드가 크게 빨라졌어요. Next.js의 Turbopack, webpack 호환을 유지하는 Rspack도 같은 흐름이에요. 대부분은 기본 설정으로 충분하고, Node 20.19+ 또는 22.12+가 필요해요.', 'Build tools such as Vite transform only requested modules in development with instant HMR, and optimize production output by bundling, minifying and hashing.', 'The Vite dev server skips bundling at startup and transforms only the files the browser imports, serving native ESM, so even large projects start almost instantly. On save, HMR (Hot Module Replacement) swaps just the changed module without a reload, and React Fast Refresh even keeps component state. vite build bundles modules, minifies code, adds hashed names and code-splits chunks loaded on demand for production. Vite 8, released in March 2026, replaced esbuild and Rollup with the single Rust-based Rolldown and uses Oxc for transforms, making builds much faster. Next.js’s Turbopack and webpack-compatible Rspack follow the same trend. Defaults usually suffice, and Node 20.19+ or 22.12+ is required.', sBuildTools()),
    item('fe-transpile', '트랜스파일과 폴리필', 'Transpiling and polyfills', '지원할 브라우저를 정하고, 새 문법은 빌드 때 옛 문법으로 바꾸고(트랜스파일), 없는 API는 실행 때 채워요(폴리필).', 'browserslist에 "baseline widely available" 같은 기준을 적으면 빌드 도구가 그 브라우저들이 이해하는 수준까지만 변환해요 · Vite 7부터는 기본 빌드 대상도 Baseline 기준이에요. ?.와 ?? 같은 새 문법은 SWC, Babel, Oxc 같은 트랜스파일러가 같은 동작을 하는 옛 문법으로 바꿔 써요. 반면 Array.prototype.at, structuredClone 같은 새 API는 문법을 바꿔서는 해결되지 않아, core-js 같은 폴리필이 실행 때 그 기능을 직접 구현해 채워 넣어요. 지원 대상을 넓힐수록 변환과 폴리필이 늘어 번들이 커지고 느려지므로 실제 사용자 통계를 보고 정해요. TypeScript의 타입 제거와 JSX 변환도 이 단계에서 함께 일어나요. 최신 브라우저만 지원하면 변환이 거의 없어져 코드가 작고 빨라져요.', 'Pick target browsers, rewrite new syntax into older syntax at build time (transpiling), and fill missing APIs at run time (polyfills).', 'Setting browserslist to a query such as "baseline widely available" makes build tools transform only as far as those browsers need, and since Vite 7 the default build target is Baseline-based too. New syntax such as ?. and ?? is rewritten by transpilers such as SWC, Babel or Oxc into older syntax with the same behavior. New APIs such as Array.prototype.at or structuredClone cannot be fixed by syntax changes, so polyfills such as core-js implement them at run time. Wider targets add transforms and polyfills that grow and slow bundles, so decide from real user analytics. TypeScript type stripping and JSX transformation happen in the same step. Supporting only modern browsers nearly eliminates transforms, keeping code small and fast.', sTranspile()),
    item('fe-lint-format', '린트와 포맷', 'Linting and formatting', 'ESLint는 버그가 될 패턴을, Prettier는 코드 모양을, tsc는 타입을 맡아요. 커밋 전과 CI에서 자동으로 검사해 리뷰를 본질에 집중하게 해요.', 'useEffect 의존성 누락 같은 버그 패턴, 들쭉날쭉한 띄어쓰기, 잘못된 타입은 서로 다른 문제라 각각 다른 도구가 맡아요. ESLint 9부터 기본인 flat config(eslint.config.js)는 설정을 배열로 이어 붙여 typescript-eslint, React Hooks 규칙 등을 조합해요. 모양에 관한 규칙은 ESLint에서 빼고 Prettier에 맡겨 두 도구가 충돌하지 않게 해요. Biome은 린트와 포맷을 하나로 합친 Rust 도구이고, oxlint는 ESLint와 호환되는 규칙을 수십 배 빠르게 검사해요. husky와 lint-staged로 커밋할 파일만 검사하고, CI에서 한 번 더 막아 규칙이 실제로 지켜지게 해요. 에디터에서 저장할 때 자동 수정되게 하면 사람이 모양을 신경 쓸 일이 없어져요.', 'ESLint flags bug patterns, Prettier owns layout and tsc checks types, with automatic checks before commit and in CI keeping reviews on substance.', 'Bug patterns such as missing useEffect dependencies, inconsistent spacing and wrong types are different problems handled by different tools. ESLint’s flat config (eslint.config.js), the default since ESLint 9, chains configurations as an array, combining typescript-eslint, React Hooks rules and more. Formatting rules stay out of ESLint and belong to Prettier so the two never conflict. Biome is a Rust tool combining linting and formatting, and oxlint checks ESLint-compatible rules many times faster. husky with lint-staged checks only staged files before commit, and CI enforces the rules again. Auto-fixing on save in the editor means nobody has to think about layout.', sLintFormat()),
    item('fe-testing', '프론트엔드 테스트', 'Frontend testing', '순수 로직은 빠른 단위 테스트로, 컴포넌트는 사용자처럼 역할로 찾아 상호작용하는 테스트로, 핵심 흐름만 E2E로 확인해요.', '가격 형식 변환, 장바구니 합계 같은 순수 로직은 Vitest로 빠르게 많이 테스트해요. Testing Library는 getByRole(\'button\', { name: \'담기\' })처럼 사용자가 보는 역할과 이름으로 요소를 찾아 클릭하고 화면에 나타난 결과를 확인해서, 테스트가 접근성까지 함께 검증해요. 내부 state나 함수 호출 같은 구현 세부가 아니라 보이는 동작을 테스트하면 리팩터링해도 테스트가 깨지지 않아요. Playwright E2E는 진짜 브라우저로 가입, 결제처럼 돈과 직결된 핵심 흐름을 처음부터 끝까지 확인하지만 느리고 불안정할 수 있어 꼭 필요한 것만 둬요. 컴포넌트 테스트가 가장 효율 좋은 중심이 되는 “테스트 트로피” 모양이 흔히 권장돼요. Storybook의 스토리를 시각 회귀 테스트로 돌려 스타일 깨짐도 잡아요.', 'Pure logic gets fast unit tests, components get user-like tests that find elements by role, and only key journeys get E2E tests.', "Pure logic such as price formatting or cart totals gets fast, plentiful Vitest tests. Testing Library finds elements by the role and name users perceive, as in getByRole('button', { name: 'Add' }), clicks them and checks what appears, verifying accessibility along the way. Testing visible behavior rather than implementation details such as internal state or function calls keeps tests intact through refactors. Playwright E2E tests drive a real browser through money-critical journeys such as sign-up and checkout, but they are slower and flakier, so keep only the essential ones. A “testing trophy” with component tests as the most efficient center is commonly recommended. Running Storybook stories as visual regression tests catches style breakage too.", sTesting()),
    item('fe-msw', 'API 모킹 (MSW)', 'API mocking (MSW)', 'MSW는 네트워크 단계에서 요청을 가로채 가짜 응답을 줘요. 같은 핸들러를 개발, 테스트, Storybook에서 함께 써요.', 'Mock Service Worker는 fetch 함수를 바꾸지 않고 브라우저에서는 서비스 워커로, Node에서는 요청 가로채기로 동작해서 앱 코드는 진짜 API를 부르는 그대로예요. http.get(\'/api/todos\', () => HttpResponse.json([...]))처럼 핸들러를 정의하면 그 경로의 응답이 바뀌어요. 500 오류, 빈 목록, 3초 지연처럼 실제 서버로는 만들기 어려운 상황을 핸들러 하나로 재현해 오류 화면과 로딩 화면을 확실히 개발해요. 백엔드 API가 준비되기 전에도 약속한 모양대로 화면을 먼저 만들 수 있어 병렬 개발이 가능해요. setupWorker(브라우저)와 setupServer(Node)가 같은 핸들러를 쓰니 Vitest, Storybook, Playwright가 한 가지 가짜 API를 공유해요. 가짜가 실제 API와 어긋나지 않도록 OpenAPI 명세에서 핸들러를 생성하거나 계약 테스트를 곁들여요.', 'MSW intercepts requests at the network level and returns fake responses, sharing the same handlers across development, tests and Storybook.', "Mock Service Worker leaves fetch untouched, running as a service worker in the browser and as request interception in Node, so app code calls the real API as usual. Defining a handler such as http.get('/api/todos', () => HttpResponse.json([...])) changes the response for that path. Situations hard to produce with a real server, such as 500 errors, empty lists or three-second delays, take one handler, making error and loading screens easy to build. UI work can proceed against the agreed shape before the backend API exists, enabling parallel development. setupWorker (browser) and setupServer (Node) use the same handlers, so Vitest, Storybook and Playwright share one fake API. To keep mocks from drifting, generate handlers from the OpenAPI spec or add contract tests.", sMsw()),
    item('fe-monitoring', '프론트엔드 모니터링', 'Frontend monitoring', '사용자 브라우저의 오류를 수집하고, 소스맵으로 원본 코드 위치를 찾고, 실사용자 성능 지표(RUM)로 진짜 체감 성능을 봐요.', '로컬에서 재현되지 않는 오류는 대부분 사용자 브라우저에서만 일어나요. Sentry 같은 도구는 오류를 스택, 브라우저·OS 정보, 직전 클릭과 요청 같은 기록(breadcrumbs)과 함께 모으고 같은 원인끼리 묶어 보여줘요. 배포된 코드는 압축돼 a.js:1:48213처럼 위치를 알 수 없으니, 빌드 때 소스맵을 모니터링 서비스에만 올려(공개 서버에는 올리지 않고) 원본 파일과 줄로 되돌려요. web-vitals 라이브러리로 실제 사용자의 LCP, INP, CLS를 모아 75번째 백분위수(p75)로 보면 실험실 측정과 다른 진짜 체감 성능이 보여요. 모든 이벤트를 보내면 비용이 커지니 샘플링 비율을 정하고, 세션 재생은 입력값과 개인정보를 가려요. 배포 버전(release)을 붙여 두면 어떤 배포 이후 오류가 늘었는지 바로 찾을 수 있어요.', 'Frontend monitoring collects errors from users’ browsers, maps them back to source with source maps, and tracks real-user performance metrics (RUM).', 'Errors that never reproduce locally mostly happen only in users’ browsers. Tools such as Sentry collect errors with stacks, browser and OS details and breadcrumbs of recent clicks and requests, grouping those with the same cause. Deployed code is minified, so locations such as a.js:1:48213 mean nothing until source maps, uploaded only to the monitoring service and never to the public server, map them back to original files and lines. Collecting real users’ LCP, INP and CLS with the web-vitals library and reading the 75th percentile (p75) reveals actual experience, unlike lab tests. Sending everything gets costly, so set sample rates, and session replays mask inputs and personal data. Tagging releases shows immediately which deploy increased errors.', sMonitoring())
  ]),
  sec('fe-ux', 'UX 엔지니어링', 'UX engineering', '경험을 만드는 구현', 'Implementing the experience', '로딩 상태, 포커스 관리, 국제화, 애니메이션 성능, View Transitions, 그리고 인증 흐름을 사용자 경험의 관점에서 구현해요.', 'Implementing loading states, focus management, internationalization, animation performance, View Transitions and authentication flows from the user’s point of view.', [
    item('fe-loading-states', '로딩 상태 설계', 'Designing loading states', '기다림의 길이에 따라 표시를 달리해요. 아주 짧으면 아무것도, 조금 길면 실제 모양의 스켈레톤, 몇 초 이상이면 진행률과 취소를 보여줘요.', '응답이 300ms 안에 오면 스피너를 띄웠다 지우는 것 자체가 깜빡임이 되니, 짧은 지연 뒤에만 로딩 표시를 보여줘요. 기다림이 길어지면 실제 콘텐츠와 같은 모양과 크기의 스켈레톤을 보여줘서 무엇이 올지 예고하고, 자리가 그대로라 데이터가 와도 레이아웃이 밀리지 않아요. React의 Suspense 경계를 어디에 두느냐에 따라 화면 조각이 나타나는 순서와 단위가 정해져요. 업로드나 내보내기처럼 몇 초 이상 걸리는 작업은 진행률과 취소 버튼을 줘서 사용자가 통제감을 갖게 해요. 이미 본 데이터를 다시 받을 때는 화면을 비우지 말고 옛 데이터를 그대로 둔 채 상단의 얇은 진행 막대 정도만 보여줘요. 로딩 중인 영역에는 aria-busy를 달아 보조 기술에도 상태를 알려요.', 'Vary loading feedback by wait time: nothing for very short waits, a content-shaped skeleton for longer ones, and progress with cancel for several seconds.', 'When responses arrive within 300ms, flashing a spinner on and off is just flicker, so show loading feedback only after a short delay. For longer waits, a skeleton matching the content’s shape and size previews what is coming and holds its place, so nothing shifts when data arrives. Where React Suspense boundaries sit decides the order and granularity in which parts of the screen appear. Tasks taking several seconds, such as uploads or exports, get progress and a cancel button so users stay in control. When refetching data already seen, keep the old data on screen and show only a thin progress bar at the top. Mark loading regions with aria-busy so assistive technology knows too.', sLoadingStates()),
    item('fe-focus', '포커스 관리', 'Focus management', '모달을 열면 포커스를 안으로 옮겨 가두고, 닫으면 원래 버튼으로 돌려줘요. 묶인 컨트롤은 roving tabindex로, 화면 전환 뒤엔 새 제목으로 포커스를 옮겨요.', '키보드와 스크린 리더 사용자에게 포커스는 “지금 내가 있는 곳”이에요. <dialog>의 showModal()은 열 때 포커스를 안으로 옮기고 Tab이 모달 안에서만 돌게 하며 배경을 비활성으로 만들어 줘요. 닫을 때는 열기 전에 저장해 둔 document.activeElement로 포커스를 돌려줘서 사용자가 길을 잃지 않게 해요. 툴바, 탭 목록, 라디오 그룹처럼 묶인 컨트롤은 그룹 전체가 Tab 한 번이고 안에서는 화살표 키로 움직이는 roving tabindex 패턴을 써요. SPA는 페이지를 새로 받지 않아 화면이 바뀐 걸 보조 기술이 모를 수 있으니, 라우트가 바뀌면 새 화면의 h1로 포커스를 옮기거나 라이브 영역으로 안내해요. :focus-visible로 키보드 포커스를 분명히 보여주고, 포커스 표시를 없애기만 하는 스타일은 피해요.', 'Move focus into modals and trap it there, return it to the opener on close, use roving tabindex for grouped controls, and focus the new heading after navigation.', 'For keyboard and screen reader users, focus means “where I am now.” <dialog> showModal() moves focus inside on open, keeps Tab cycling within the modal and makes the background inert. On close, focus returns to the document.activeElement saved before opening, so users never get lost. Grouped controls such as toolbars, tab lists and radio groups use the roving tabindex pattern: one Tab stop for the group, arrow keys inside. SPAs never load a new page, so assistive technology may miss screen changes; after route changes, move focus to the new screen’s h1 or announce it through a live region. Make keyboard focus obvious with :focus-visible, and avoid styles that simply remove focus indicators.', sFocus()),
    item('fe-i18n', '국제화', 'Internationalization', '문구 번역뿐 아니라 숫자·통화·날짜·복수형 형식과 글자 방향(RTL)까지 언어에 맞게 처리해요. Intl API와 ICU 메시지가 핵심 도구예요.', 'Intl.NumberFormat은 같은 12000을 ko-KR에서는 ₩12,000으로, de-DE에서는 12.000 ₩으로 바꾸듯 천 단위 구분, 소수점, 통화 기호 위치를 언어에 맞게 처리해요. 날짜도 Intl.DateTimeFormat에 맡겨야 “2026. 11. 10.”과 “Nov 10, 2026”처럼 순서와 구분자가 맞아요. 영어는 1 item, 3 items로 바뀌지만 언어마다 복수형 규칙이 달라서, ICU 메시지 형식 {n, plural, one {...} other {...}}로 번역 문장 안에 규칙을 담아요. 번역 조각을 문자열로 이어 붙이면 어순이 다른 언어에서 깨지므로 변수 자리를 가진 완성된 문장을 번역해요. 아랍어·히브리어처럼 오른쪽에서 쓰는 언어는 dir="rtl"로 레이아웃이 거울처럼 뒤집히니 margin-left 대신 margin-inline-start 같은 논리 속성을 써요. 독일어처럼 영어보다 30% 이상 길어지는 언어를 위해 레이아웃에 여유를 둬요.', 'Internationalization covers not only translation but number, currency, date and plural formats and text direction (RTL), with the Intl API and ICU messages as core tools.', 'Intl.NumberFormat renders the same 12000 as ₩12,000 in ko-KR and 12.000 ₩ in de-DE, handling separators, decimals and currency symbol placement per locale. Dates also go through Intl.DateTimeFormat so order and separators come out right, as in “2026. 11. 10.” versus “Nov 10, 2026.” English shifts from 1 item to 3 items, but plural rules differ by language, so ICU message syntax {n, plural, one {...} other {...}} embeds the rules in translations. Concatenating translated fragments breaks in languages with different word order, so translate whole sentences with placeholders. Right-to-left languages such as Arabic and Hebrew mirror layouts with dir="rtl", so use logical properties such as margin-inline-start instead of margin-left. Leave room in layouts for languages such as German that can run over 30% longer than English.', sI18n()),
    item('fe-animation-perf', '애니메이션 성능', 'Animation performance', 'width·top처럼 레이아웃을 바꾸는 속성 대신 transform·opacity로 움직이면 합성 단계만 다시 해서 부드러워요. 레이아웃 변화는 FLIP으로 바꿔요.', '브라우저는 스타일 → 레이아웃 → 페인트 → 합성 순으로 화면을 그리는데, width나 top을 애니메이션하면 매 프레임 이 과정을 처음부터 다시 해서 끊기기 쉬워요. transform과 opacity는 합성 단계만 다시 하고 GPU가 처리해서 메인 스레드가 바빠도 부드럽게 움직여요. 60fps를 내려면 한 프레임을 16.7ms 안에 끝내야 하고, 120Hz 화면이면 그 절반이에요. will-change: transform은 곧 움직일 요소에 미리 레이어를 만들어 주지만, 남용하면 메모리를 많이 써서 꼭 필요한 요소에만 잠깐 써요. FLIP 기법은 처음(First)과 끝(Last) 위치를 재고, 그 차이만큼 transform으로 되돌린(Invert) 뒤 0으로 재생(Play)해서 목록 재정렬 같은 레이아웃 변화를 transform 애니메이션으로 바꿔요. prefers-reduced-motion을 켠 사용자에게는 움직임을 줄이거나 없애요.', 'Animating transform and opacity instead of layout properties such as width or top only recomposites and stays smooth, while FLIP turns layout changes into transform animations.', 'Browsers paint in the order style, layout, paint and composite, and animating width or top reruns the whole sequence every frame, easily stuttering. transform and opacity only recomposite on the GPU, staying smooth even when the main thread is busy. 60 fps requires finishing each frame within 16.7 ms, and half that on 120 Hz screens. will-change: transform pre-creates a layer for an element about to move, but overuse consumes lots of memory, so apply it briefly and only where needed. The FLIP technique measures First and Last positions, Inverts the difference with transform and Plays it back to zero, turning layout changes such as list reordering into transform animations. Users with prefers-reduced-motion get reduced or no motion.', sAnimationPerf()),
    item('fe-view-transitions', 'View Transitions', 'View Transitions', 'startViewTransition으로 DOM 변경을 감싸면 브라우저가 전후 스냅숏을 찍어 전환 애니메이션을 만들어요. 같은 이름의 요소는 위치와 크기가 자연스럽게 이어져요.', 'document.startViewTransition(() => updateDOM())을 쓰면 브라우저가 변경 전 화면을 스냅숏으로 찍고, 변경 후 화면과 기본 크로스페이드로 이어 줘요. 목록의 썸네일과 상세 화면의 큰 이미지에 같은 view-transition-name을 주면 그 요소는 위치와 크기가 자연스럽게 변하는 공유 요소 전환이 돼요. ::view-transition-old와 ::view-transition-new 의사 요소에 CSS 애니메이션을 주면 속도와 효과를 마음대로 바꿔요. 같은 문서 안의 전환은 주요 브라우저가 모두 지원하고, @view-transition { navigation: auto; }는 페이지를 새로 불러오는 MPA 사이 이동에도 전환을 걸어요. 지원하지 않는 브라우저에서는 그냥 즉시 바뀌므로 점진적 향상으로 안전하게 도입할 수 있어요. prefers-reduced-motion을 켠 사용자에게는 애니메이션을 줄여요.', 'Wrapping a DOM change in startViewTransition makes the browser snapshot before and after and animate between them, and elements sharing a name morph smoothly.', 'Calling document.startViewTransition(() => updateDOM()) has the browser snapshot the old view and connect it to the new one with a default crossfade. Giving a list thumbnail and a detail hero image the same view-transition-name creates a shared-element transition where position and size change smoothly. CSS animations on the ::view-transition-old and ::view-transition-new pseudo-elements change timing and effects freely. Same-document transitions work in all major browsers, and @view-transition { navigation: auto; } applies transitions between full page loads in MPAs. Unsupported browsers simply switch instantly, so it is a safe progressive enhancement. Users with prefers-reduced-motion get reduced animation.', sViewTransitions()),
    item('fe-auth-ui', '프론트엔드 인증 처리', 'Frontend auth handling', '토큰은 저장 위치마다 위험이 달라요. 갱신은 동시 요청이 몰려도 한 번만 하고, 보호된 화면은 원래 주소를 기억해 로그인 뒤 돌려보내요.', 'localStorage에 둔 토큰은 JavaScript로 읽히기 때문에 XSS 취약점 한 번이면 그대로 탈취돼요. 메모리에 두면 안전하지만 새로고침하면 사라지고, httpOnly·Secure·SameSite 쿠키는 JS가 읽을 수 없어 리프레시 토큰을 두기에 알맞아요. 그래서 짧게 사는 액세스 토큰은 메모리에, 리프레시 토큰은 httpOnly 쿠키에 두는 조합이 흔해요. 여러 요청이 동시에 401을 받으면 각자 갱신하지 않고 하나의 갱신 요청을 함께 기다린 뒤(single-flight) 새 토큰으로 재시도해서 사용자는 끊김을 못 느껴요. 로그인이 필요한 화면은 /login?next=/dashboard처럼 원래 주소를 기억해 로그인 뒤 돌려보내요. 화면을 숨기는 건 UX일 뿐이고 진짜 권한 검사는 서버가 해야 하며, 쿠키를 쓰면 CSRF 대책과 CSP를 함께 챙겨요.', 'Token storage locations carry different risks; refresh once even when concurrent requests fail, and protected screens remember the original URL to return users after login.', 'Tokens in localStorage are readable by JavaScript, so a single XSS flaw steals them. Memory is safer but lost on reload, while httpOnly, Secure, SameSite cookies are unreadable by JS and suit refresh tokens. A common combination keeps short-lived access tokens in memory and refresh tokens in httpOnly cookies. When several requests get 401 at once, they wait on one shared refresh (single-flight) instead of each refreshing, then retry with the new token so users notice nothing. Protected screens remember the original URL, as in /login?next=/dashboard, and return users after login. Hiding screens is only UX, since the server must enforce real permissions, and cookies call for CSRF defenses alongside a CSP.', sAuthUi())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
