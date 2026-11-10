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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'rcx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono rcx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono rcx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c rcx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono rcx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c rcx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'rcx-s rcx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono rcx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono rcx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono rcx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono rcx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono rcx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'rcx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'rcx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'rcx-xs rcx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono rcx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'rcx-a', g: 'rcx-g', r: 'rcx-r', w: 'rcx-w', m: 'cz-mono', s: 'rcx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'rcx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono rcx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono rcx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'rcx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.rcx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.rcx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.rcx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.rcx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.rcx-r .in{color:var(--danger);font-weight:800}
.rcx-g .in{color:var(--ok);font-weight:800}
.rcx-a .in{color:var(--accent);font-weight:800}
.rcx-w .in{color:var(--warn);font-weight:800}
.rcx-c .in{font-size:.6em;font-weight:700}
.rcx-c2 .in{font-size:.5em;font-weight:700}
.rcx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.rcx-wr .in{white-space:normal!important}
.rcx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.rcx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== React · 1. JSX and components ===== */
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc rcx-xs ' + clsOf(c), st, Object.assign({ w }, o));
/* component-tree node and edge */
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });

function sJsx() {
  return CW('react-jsx', {
    code: ['const el = (', '  <h1 className="title">Hi, {name}</h1>', ');', ['// 컴파일 결과', '// compiles to'], 'const el = jsx("h1", {', '  className: "title",', '  children: ["Hi, ", name],', '});', ['<p>{n > 0 ? "있음" : "없음"}</p>', '<p>{n > 0 ? "some" : "none"}</p>'], ['<img src={url} alt="" />  // 닫기 필수', '<img src={url} alt="" />  // must close']],
    hl: [[0, 3], [3, 5, 'ok'], [8, 1], [9, 1, 'warn']],
    side: [
      [[['HTML처럼 보이는 JS 문법', 'JS syntax that looks like HTML'], 'a'], [['class 대신 className', 'className instead of class'], '']],
      [[['함수 호출로 바뀌어요', 'it becomes a function call'], 'a'], [['결과는 화면 설명서 객체', 'the result is a description object'], ''], ['{ type: "h1", props: {…} }', 'm g']],
      [[['{ } 안에는 JS “표현식”', '{ } holds a JS expression'], 'a'], [['삼항·map은 OK, if·for는 X', 'ternaries and map, not if or for'], 'w']],
      [[['태그는 반드시 닫아요', 'every tag must close'], 'w'], [['루트는 하나 · <>…</>로 묶기', 'one root; wrap with <>…</>'], ''], [['속성은 camelCase: onClick', 'camelCase attributes: onClick'], '']]
    ],
    notes: [['JSX는 HTML처럼 보이지만 자바스크립트 문법이에요 · class 대신 className처럼 JS 이름을 써요', 'JSX looks like HTML but is JavaScript syntax, so it uses JS names such as className instead of class'], ['빌드 도구가 JSX를 jsx("h1", {…}) 같은 함수 호출로 바꿔요 · 결과는 “무엇을 그릴지” 적은 평범한 객체예요', 'the build tool turns JSX into calls such as jsx("h1", {…}), which return plain objects describing what to draw'], ['중괄호 { } 안에는 값이 되는 JS 표현식을 넣어요 · 삼항 연산자와 map은 되고 if·for 문은 안 돼요', 'braces hold JavaScript expressions that produce values: ternaries and map work, but if and for statements do not'], ['모든 태그는 닫아야 하고, 반환하는 루트는 하나여야 해요 · 여러 개면 <>…</>(Fragment)로 묶어요', 'every tag must close and there must be one root, so wrap siblings in <>…</> (a Fragment)']],
    fin: [['JSX: UI를 HTML처럼 선언하는 문법 · 실제로는 React 요소 객체를 만드는 함수 호출', 'JSX declares UI in an HTML-like way; underneath, it is function calls that create React element objects', 'rcx-xs rcx-a'], ['{ } 안의 문자열은 자동으로 이스케이프되어 XSS를 막아요', 'strings inside { } are escaped automatically, which prevents XSS'], ['TSX는 타입을 붙인 JSX예요 · 확장자 .tsx', 'TSX is typed JSX, in .tsx files']],
    caps: [['HTML 같은 JS', 'HTML-like JavaScript'], ['함수 호출로 변환', 'Compiled to calls'], ['{ } 안의 표현식', 'Expressions in braces'], ['JSX 규칙', 'JSX rules'], ['JSX', 'JSX']]
  });
}

function sComponent() {
  return CW('react-component', {
    code: ['function Avatar({ user, size = 48 }) {', '  return <img src={user.photo} width={size}/>;', '}', 'function Profile() {', '  const user = useUser();', '  return (', '    <div>', '      <Avatar user={user} size={64} />', '      <Avatar user={user} />', '    </div>', '  );', '}'],
    hl: [[0, 3], [7, 1, 'ok'], [8, 1], [0, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'p', X + 3.6, .8, 5.0, 'Profile', 'accent', 0);
      nd(S, 'a1', X, 4.0, 5.4, 'Avatar', 'ok', 0); nd(S, 'a2', X + 6.6, 4.0, 5.4, 'Avatar', 'ok', 0);
      ed(S, 'e1', [X + 5.0, 1.9], [X + 2.7, 4.0], 0); ed(S, 'e2', [X + 7.2, 1.9], [X + 9.3, 4.0], 0);
      lbl(S, 'pr1', X, 2.6, 'size=64', 'm a', 2); lbl(S, 'pr2', X + 9.4, 2.6, 'size=48', 'm', 3);
      lbl(S, 'n1', X, 6.0, ['컴포넌트 = JSX를 돌려주는 함수', 'a component is a function returning JSX'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 6.0, ['props: 부모가 자식에게 넘기는 값', 'props: values a parent hands down'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 6.0, ['안 넘기면 기본값 48', 'omitted, it falls back to 48'], '', 3, { off: 4 });
      ar(S, 'dn', [X - .4, 1.0], [X - .4, 5.0], 'accent', 4, { h: .1 }); lbl(S, 'n4', X, 6.0, ['데이터는 위에서 아래로만 흘러요', 'data flows only downward'], 'a', 4); lbl(S, 'n5', X, 7.1, ['자식은 props를 바꿀 수 없어요', 'children cannot change props'], 'r', 4);
    },
    notes: [['컴포넌트는 대문자로 시작하는 함수예요 · 받은 props로 JSX를 만들어 돌려줘요', 'a component is a capitalized function that turns props into JSX'], ['부모는 <Avatar size={64} />처럼 태그 속성으로 props를 넘겨요', 'a parent passes props as tag attributes, as in <Avatar size={64} />'], ['구조 분해의 기본값으로 생략된 props의 값을 정해요', 'destructuring defaults supply values for omitted props'], ['데이터는 부모에서 자식으로만 흘러요 · props는 읽기 전용이라 바꾸려면 부모의 상태를 바꿔야 해요', 'data flows from parent to child only; props are read-only, so changes go through the parent’s state']],
    fin: [['컴포넌트: props를 받아 UI를 돌려주는 함수 · 작은 조각을 조립해 화면을 만들어요', 'a component is a function from props to UI; screens are assembled from small pieces', 'rcx-xs rcx-a'], ['같은 props면 같은 결과를 내는 순수 함수처럼 작성해요', 'write components like pure functions: same props, same output'], ['소문자 태그는 HTML 요소, 대문자 태그는 컴포넌트예요', 'lowercase tags are HTML elements, capitalized tags are components']],
    caps: [['함수 컴포넌트', 'Function components'], ['props 넘기기', 'Passing props'], ['기본값', 'Defaults'], ['단방향 데이터 흐름', 'One-way data flow'], ['컴포넌트와 props', 'Components and props']]
  });
}

function sVdom() {
  return CW('react-vdom', {
    code: [['// 이전 렌더', '// previous render'], '<ul><li>A</li><li>B</li></ul>', ['// 다음 렌더', '// next render'], '<ul><li>A</li><li>B</li><li>C</li></ul>', ['// 타입이 바뀌면 하위 트리를 새로', '// a new type rebuilds the subtree'], '{isA ? <div><Counter /></div>', '     : <section><Counter /></section>}'],
    hl: [[0, 4], [3, 1, 'ok'], [4, 3, 'warn'], null],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'h0', X, .6, ['이전 트리', 'previous'], 'a', 1, { off: 3 }); lbl(S, 'h1', X + 6.4, .6, ['다음 트리', 'next'], 'a', 1, { off: 3 });
      [[0, 'ul'], [1, 'li A'], [2, 'li B']].forEach(([i, t]) => { nd(S, 'o' + i, X + (i ? (i - 1) * 2.8 : 1.4), i ? 3.4 : 1.6, i ? 2.6 : 2.8, t, 'line', 1, { off: 3 }); });
      [[0, 'ul'], [1, 'li A'], [2, 'li B'], [3, 'li C']].forEach(([i, t]) => { nd(S, 'n' + i, X + 6.4 + (i ? (i - 1) * 1.9 : 1.6), i ? 3.4 : 1.6, i ? 1.8 : 2.8, t, i === 3 ? 'ok' : 'line', 1, { off: 3 }); });
      ['n1', 'n2'].forEach(k => tsets(S, k, [[2, 'accent', 24]])); tsets(S, 'n3', [[2, 'ok', 50]]);
      lbl(S, 'd2', X, 5.2, ['같은 자리·같은 타입: 유지, C만 새로 생성', 'same place and type kept; only C is created'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'tA', X, 1.6, 5.2, '<div>', 'line', 3, { off: 4 }); nd(S, 'cA', X + .6, 3.4, 4.0, 'Counter: 5', 'accent', 3, { off: 4 });
      ar(S, 'ta', [X + 5.6, 2.6], [X + 6.6, 2.6], 'ink-3', 3, { off: 4, h: .1 });
      nd(S, 'tB', X + 6.8, 1.6, 5.2, '<section>', 'danger', 3, { off: 4 }); nd(S, 'cB', X + 7.4, 3.4, 4.0, 'Counter: 0', 'danger', 3, { off: 4 });
      lbl(S, 'd3', X, 5.2, ['타입이 다르면 통째로 버리고 새로 · 상태 초기화', 'a different type rebuilds: state is reset'], 'r', 3, { off: 4, w: 12 });
      chip(S, 'cm', X, 1.6, 12.0, ['실제 DOM: appendChild(li C) 한 번', 'real DOM: a single appendChild(li C)'], 'ok', 4, { h: 1.3 });
      lbl(S, 'd4', X, 3.4, ['바뀐 부분만 모아 한 번에 반영(커밋)', 'only the changes are applied, at once (commit)'], 'g', 4, { w: 12 });
    },
    notes: [['상태가 바뀌면 컴포넌트를 다시 실행해 새 요소 트리(가상 DOM)를 만들어요 · 화면 전체를 다시 그리는 게 아니에요', 'when state changes, components rerun and produce a new element tree, the virtual DOM; the page is not redrawn wholesale'], ['React는 이전 트리와 새 트리를 비교해요 · 같은 자리의 같은 타입은 그대로 두고 C만 새로 만들어요', 'React diffs the previous and next trees: same type in the same place is kept, and only C is created'], ['요소의 타입이 바뀌면(div → section) 그 아래를 통째로 버리고 새로 만들어서, 안의 상태도 초기화돼요', 'when an element’s type changes (div → section), the whole subtree is discarded and rebuilt, resetting its state'], ['계산이 끝나면 실제 DOM에는 바뀐 부분만 한 번에 반영해요 · 이 과정을 재조정(reconciliation)이라 해요', 'finally only the differences are applied to the real DOM in one go; this process is reconciliation']],
    fin: [['재조정: 새 요소 트리를 이전 트리와 비교해 최소한의 DOM 변경을 찾는 과정', 'reconciliation diffs the new element tree against the old one to find the minimal DOM changes', 'rcx-xs rcx-a'], ['O(n) 휴리스틱: 타입이 다르면 다른 트리로, 목록은 key로 짝을 맞춰요', 'its O(n) heuristics treat different types as different trees and match list items by key'], ['컴포넌트를 렌더 중에 정의하면 매번 새 타입이 되어 상태가 날아가요', 'defining a component inside render creates a new type each time and loses state']],
    caps: [['새 요소 트리', 'A new element tree'], ['비교와 유지', 'Diffing and reuse'], ['타입이 바뀌면', 'When the type changes'], ['최소한의 커밋', 'A minimal commit'], ['가상 DOM과 재조정', 'The virtual DOM and reconciliation']]
  });
}

function sKeys() {
  return CW('react-keys', {
    code: ['{todos.map((t) => (', '  <Item key={t.id} todo={t} />', '))}', ['// ✗ key={index}: 앞에 추가하면 꼬여요', '// ✗ key={index}: breaks on prepend'], ['// ✗ key={Math.random()}: 매번 새로', '// ✗ key={Math.random()}: always new'], ['<Form key={userId} />  // 바뀌면 초기화', '<Form key={userId} />  // resets on change']],
    hl: [[0, 3], [3, 1, 'danger'], [0, 3, 'ok'], [5, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, row = (p, y, items, st, off) => items.forEach(([t, chk, col], i) => { nd(S, p + i, X, y + i * 1.3, 6.4, t, col || 'line', st, { off, h: 1.1 }); cl(S, p + 'c' + i, X + 6.8, y + i * 1.3 + .15, 1.4, chk ? '☑' : '☐', '', st, { off }); });
      row('a', 1.0, [[['우유', 'milk'], 1], [['빵', 'bread'], 0]], 1, 2);
      lbl(S, 'n1', X, 4.2, ['key는 각 항목의 이름표 · 형제 사이에서 고유하게', 'keys name each item, unique among siblings'], 'a', 1, { off: 2, w: 12 });
      row('b', 1.0, [[['계란', 'eggs'], 1, 'danger'], [['우유', 'milk'], 0, 'danger'], [['빵', 'bread'], 0]], 2, 3);
      lbl(S, 'n2', X, 5.2, ['index key: 체크 상태가 엉뚱한 항목에 남아요', 'index keys: checks stick to the wrong item'], 'r', 2, { off: 3, w: 12 });
      row('c', 1.0, [[['계란', 'eggs'], 0, 'ok'], [['우유', 'milk'], 1], [['빵', 'bread'], 0]], 3, 4);
      lbl(S, 'n3', X, 5.2, ['id key: 상태가 제 항목을 따라가요', 'id keys: state follows its item'], 'g', 3, { off: 4, w: 12 });
      nd(S, 'f1', X, 1.0, 5.4, 'Form key=kim', 'accent', 4); nd(S, 'f2', X + 6.6, 1.0, 5.4, 'Form key=lee', 'ok', 4); ar(S, 'fa', [X + 5.5, 1.55], [X + 6.5, 1.55], 'ink-3', 4, { h: .1 });
      lbl(S, 'n4', X, 2.8, ['key가 바뀌면 새 컴포넌트로 · 입력값 초기화', 'a new key means a new instance: inputs reset'], 'w', 4, { w: 12 });
    },
    notes: [['목록을 map으로 그릴 때 key로 각 항목을 구별해요 · 형제 사이에서만 고유하면 돼요', 'when rendering lists with map, key identifies each item; it only needs to be unique among siblings'], ['배열 순서(index)를 key로 쓰고 앞에 항목을 추가하면, 체크 상태가 엉뚱한 항목에 남아요', 'using the index as key and prepending an item leaves checkbox state on the wrong item'], ['데이터의 고유 id를 key로 쓰면 순서가 바뀌어도 상태가 제 항목을 따라가요', 'with the data’s stable id as key, state follows its item through reorders'], ['key를 일부러 바꾸면 React가 새 컴포넌트로 보고 상태를 초기화해요 · 사용자 전환 때 폼 초기화에 써요', 'changing key on purpose makes React treat it as new and reset its state, handy for clearing a form when the user changes']],
    fin: [['key: 재조정 때 이전·다음 목록의 항목을 짝짓는 이름표 · 안정적이고 고유한 id를 써요', 'keys pair up list items between renders during reconciliation; use stable, unique ids', 'rcx-xs rcx-a'], ['순서가 절대 바뀌지 않는 정적 목록이면 index도 괜찮아요', 'an index is fine for static lists that never reorder'], ['key는 props로 전달되지 않아요 · 필요하면 id를 따로 넘겨요', 'key is not passed as a prop; pass the id separately if needed']],
    caps: [['목록과 key', 'Lists and keys'], ['index key의 함정', 'The index-key trap'], ['안정적인 id', 'Stable ids'], ['key로 초기화', 'Resetting with key'], ['리스트와 key', 'Lists and keys']]
  });
}

function sConditional() {
  return CW('react-conditional', {
    code: ['{isLoggedIn ? <Dashboard /> : <Login />}', '{error && <Alert msg={error} />}', ['{count && <Badge n={count} />}  // 0 표시', '{count && <Badge n={count} />}  // shows 0'], '{count > 0 && <Badge n={count} />}', ['if (!user) return <Spinner />;  // 먼저 반환', 'if (!user) return <Spinner />;  // early'], ['return null;                    // 안 그림', 'return null;                    // nothing']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2, 'danger'], [4, 2]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'scr', X, .8, 12.0, 6.0, 'var(--ui)', 0, { css: 'border:.1em solid var(--line)', r: .5 });
      nd(S, 'd1', X + .6, 1.4, 5.0, 'Dashboard', 'ok', 1, { off: 2 }); lbl(S, 'q1', X + 6.0, 1.55, ['로그인했으면', 'if logged in'], '', 1, { off: 2 });
      nd(S, 'al', X + .6, 1.4, 10.8, ['⚠ 오류 메시지', '⚠ error message'], 'danger', 2, { off: 3 }); lbl(S, 'q2', X + .6, 3.0, ['error가 있을 때만', 'only when error exists'], 'g', 2, { off: 3 });
      T(S, 'zero', X + .8, 1.4, '0', 'rcx-l', 3, { off: 4 }); lbl(S, 'q3', X + 2.0, 1.6, ['count가 0이면 “0”이 그대로 찍혀요', 'with count 0, a literal “0” appears'], 'r', 3, { off: 4, w: 9.6 });
      nd(S, 'sp', X + 4.6, 2.8, 2.8, '…', 'line', 4); lbl(S, 'q4', X + .6, 4.6, ['조건이 안 맞으면 일찍 반환', 'return early when not ready'], 'a', 4);
    },
    notes: [['삼항 연산자로 둘 중 하나를 그려요 · 로그인 여부에 따라 Dashboard 또는 Login', 'a ternary renders one of two options, Dashboard or Login depending on login state'], ['&&는 왼쪽이 참일 때만 오른쪽을 그려요 · 오류가 있을 때만 Alert를 보여줘요', '&& renders the right side only when the left is truthy, showing Alert only when there is an error'], ['하지만 왼쪽이 숫자 0이면 false가 아니라 0이 화면에 찍혀요 · count > 0처럼 불리언으로 만들어요', 'but a left side of 0 renders the number 0 rather than nothing, so make it boolean with count > 0'], ['조건이 복잡하면 if로 일찍 반환하고, 아무것도 그리지 않으려면 null을 돌려줘요', 'for complex conditions, return early with if, and return null to render nothing']],
    fin: [['조건부 렌더링: JSX도 값이라 JS의 삼항, &&, if 반환으로 무엇을 그릴지 고르는 것', 'conditional rendering picks what to draw with ordinary JavaScript: ternaries, && and early returns, since JSX is just values', 'rcx-xs rcx-a'], ['false, null, undefined, true는 아무것도 그리지 않지만 0과 NaN은 그려져요', 'false, null, undefined and true render nothing, but 0 and NaN do render'], ['조건에 따라 컴포넌트 타입이 바뀌면 상태가 초기화된다는 점도 기억해요', 'remember that switching component types by condition resets state']],
    caps: [['삼항 연산자', 'Ternaries'], ['&& 렌더링', 'Rendering with &&'], ['0의 함정', 'The zero trap'], ['일찍 반환과 null', 'Early returns and null'], ['조건부 렌더링', 'Conditional rendering']]
  });
}

function sChildren() {
  return CW('react-children', {
    code: ['function Card({ title, children }) {', '  return (', '    <section className="card">', '      <h2>{title}</h2>', '      {children}', '    </section>', '  );', '}', ['<Card title="프로필">', '<Card title="Profile">'], '  <Avatar /> <Bio />', '</Card>', '<Layout side={<Nav />} main={<Feed />} />'],
    hl: [[8, 3], [4, 1, 'ok'], [11, 1], [0, 1]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'cd', X, .8, 12.0, 5.2, 'accent', 0, { w: .1, off: 3 }); lbl(S, 'cdl', X + .3, .9, 'Card', 'm a', 0, { off: 3 }); nd(S, 'tt', X + .6, 1.8, 10.8, 'h2: title', 'line', 0, { off: 3, h: 1.0 });
      sw(S, 'slot', X + .6, 3.2, 10.8, 2.3, 'transparent', 0, { off: 3, css: 'border:.08em dashed var(--ink-3)' }); cl(S, 'slotl', X + .6, 4.0, 10.8, '{children}', 'm', 0, { off: 1 });
      nd(S, 'av', X + 1.0, 3.6, 4.6, 'Avatar', 'ok', 1, { off: 3 }); nd(S, 'bi', X + 6.2, 3.6, 4.6, 'Bio', 'ok', 1, { off: 3 });
      lbl(S, 'n1', X, 6.6, ['태그 사이에 넣은 것이 children', 'whatever sits between the tags'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 6.6, ['Card는 안에 무엇이 오는지 몰라도 돼요', 'Card needs no idea what goes inside'], 'g', 2, { off: 3 });
      frame(S, 'ly', X, .8, 12.0, 5.2, 'warn', 3, { w: .1 }); lbl(S, 'lyl', X + .3, .9, 'Layout', 'm w', 3);
      nd(S, 'nv', X + .6, 1.8, 3.6, 'side: Nav', 'ok', 3, { h: 3.6 }); nd(S, 'fd', X + 4.6, 1.8, 6.8, 'main: Feed', 'accent', 3, { h: 3.6 });
      lbl(S, 'n3', X, 6.6, ['여러 자리는 props로 JSX를 넘겨요(슬롯)', 'several slots: pass JSX as props'], 'a', 3, { off: 4 });
      lbl(S, 'n4', X, 6.6, ['데이터 대신 완성된 컴포넌트를 넘기면', 'pass finished components, not data,'], 'g', 4); lbl(S, 'n5', X, 7.7, ['props 내리꽂기(drilling)가 줄어요', 'and prop drilling shrinks'], 'g', 4);
    },
    notes: [['여는 태그와 닫는 태그 사이에 넣은 내용은 children prop으로 전달돼요', 'whatever sits between the opening and closing tags arrives as the children prop'], ['Card는 테두리와 제목만 책임지고, 안에 무엇이 오는지는 쓰는 쪽이 정해요', 'Card only handles the frame and title; the caller decides what goes inside'], ['자리가 여러 개면 side={<Nav />}처럼 JSX를 props로 넘겨 슬롯처럼 써요', 'for several slots, pass JSX as props, as in side={<Nav />}'], ['데이터를 여러 층 내려보내는 대신 완성된 컴포넌트를 넘기면 중간 컴포넌트가 몰라도 돼요', 'passing finished components instead of threading data through layers keeps the middle components unaware']],
    fin: [['합성(composition): 컴포넌트를 상속 대신 children과 props로 조립하는 React의 기본 방식', 'composition assembles components through children and props rather than inheritance, React’s default approach', 'rcx-xs rcx-a'], ['Context를 쓰기 전에 합성으로 해결되는지 먼저 살펴요', 'check whether composition solves the problem before reaching for Context'], ['children은 함수일 수도 있어요(render props)', 'children can even be a function, the render-props pattern']],
    caps: [['children', 'children'], ['내용을 모르는 컨테이너', 'Content-agnostic containers'], ['여러 슬롯', 'Multiple slots'], ['합성으로 단순하게', 'Simpler through composition'], ['children과 합성', 'children and composition']]
  });
}

function sEvents() {
  return CW('react-events', {
    code: [['<button onClick={save}>저장</button>', '<button onClick={save}>Save</button>'], ['<button onClick={save()}>  // ✗ 즉시 실행', '<button onClick={save()}>  // ✗ runs now'], ['<button onClick={() => remove(id)}>삭제', '<button onClick={() => remove(id)}>Delete'], 'function handleSubmit(e) {', '  e.preventDefault();', '  send(new FormData(e.currentTarget));', '}', '<input onChange={e => setQ(e.target.value)} />'],
    hl: [[0, 1, 'ok'], [1, 1, 'danger'], [2, 1, 'ok'], [3, 5]],
    side: [
      [[['함수 자체를 넘겨요', 'pass the function itself'], 'a'], [['이름은 camelCase: onClick', 'camelCase names: onClick'], '']],
      [[['save()는 렌더 중에 실행돼요', 'save() runs during render'], 'r'], [['그 결과(undefined)가 넘어가요', 'and passes its result, undefined'], '']],
      [[['인자가 필요하면 화살표로 감싸요', 'wrap in an arrow to pass arguments'], 'g']],
      [[['e는 합성 이벤트(SyntheticEvent)', 'e is a SyntheticEvent'], 'a'], [['preventDefault로 새로고침 막기', 'preventDefault stops the reload'], ''], [['onChange는 글자마다 실행돼요', 'onChange fires on every keystroke'], 'w']]
    ],
    notes: [['이벤트에는 함수 자체를 넘겨요 · 클릭될 때 React가 대신 호출해 줘요', 'pass the function itself; React calls it when the click happens'], ['괄호를 붙이면 렌더하는 순간 실행되고, 그 반환값이 핸들러로 넘어가는 흔한 실수가 돼요', 'adding parentheses runs it during render and passes its return value instead, a common mistake'], ['인자를 넘겨야 하면 () => remove(id)처럼 화살표 함수로 감싸요', 'to pass arguments, wrap the call in an arrow such as () => remove(id)'], ['핸들러는 합성 이벤트 e를 받아요 · 폼 제출엔 preventDefault, React의 onChange는 입력할 때마다 실행돼요', 'handlers receive a synthetic event e; forms call preventDefault, and React’s onChange fires on every keystroke']],
    fin: [['이벤트 처리: JSX 속성에 함수를 넘기면 React가 루트에서 이벤트를 위임받아 호출해요', 'React wires handlers passed as JSX attributes through a single delegated listener at the root', 'rcx-xs rcx-a'], ['핸들러 안에서 상태를 바꾸면 그다음 렌더에 반영돼요', 'state changes inside a handler show up on the next render'], ['이벤트 전파를 막으려면 e.stopPropagation()을 써요', 'call e.stopPropagation() to stop propagation']],
    caps: [['함수 넘기기', 'Passing functions'], ['즉시 실행 실수', 'The immediate-call bug'], ['인자 넘기기', 'Passing arguments'], ['이벤트 객체', 'The event object'], ['이벤트 처리', 'Handling events']]
  });
}
/* ===== React · 2. state and rendering ===== */
function sUseState() {
  return CW('react-usestate', {
    code: ['function Counter() {', '  const [count, setCount] = useState(0);', '  return (', '    <button onClick={() => setCount(count+1)}>', '      {count}', '    </button>', '  );', '}', ['let n = 0;  // ✗ 일반 변수는 화면이 안 바뀌어요', 'let n = 0;  // ✗ a plain variable: no update']],
    hl: [[1, 1], [3, 1, 'ok'], [0, 8], [8, 1, 'danger']],
    draw: (S) => {
      const X = 19.4, P = [[X + 3.6, .8], [X + 7.6, 3.4], [X + 3.6, 6.0], [X - .2, 3.4]], L = [['클릭', 'click'], ['setCount(1)', 'setCount(1)'], ['Counter() 다시 실행', 'Counter() reruns'], ['화면 갱신', 'screen updates']];
      P.forEach(([x, y], i) => nd(S, 'c' + i, x, y, 4.6, L[i], ['accent', 'warn', 'ok', 'line'][i], 2, { h: 1.2 }));
      [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], i) => { const [ax, ay] = P[a], [bx, by] = P[b]; ar(S, 'ca' + i, [ax + 2.3 + (bx - ax) * .25, ay + .6 + (by - ay) * .25], [bx + 2.3 - (bx - ax) * .25, by + .6 - (by - ay) * .25], 'ink-3', 2, { h: .1 }); });
      chip(S, 'mem', X + 1.6, 8.6, 8.8, ['React가 보관: count = 0', 'React stores: count = 0'], 'accent', 1, { off: 2, h: 1.2 });
      chip(S, 'mem2', X + 1.6, 8.6, 8.8, ['React가 보관: count = 1', 'React stores: count = 1'], 'ok', 2, { h: 1.2 });
      lbl(S, 'n1', X, 10.4, ['상태는 컴포넌트 밖, React가 기억해요', 'state lives outside the function, kept by React'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n3', X, 10.4, ['렌더 = 함수를 새 값으로 다시 부르기', 'a render calls the function again with new values'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 10.4, ['일반 변수는 매 렌더마다 0으로 다시 시작', 'plain variables restart at 0 each render'], 'r', 4, { w: 12 });
    },
    notes: [['useState(0)은 [현재 값, 바꾸는 함수]를 돌려줘요 · 값은 컴포넌트 밖에서 React가 기억해요', 'useState(0) returns [current value, setter], and React keeps the value outside the component'], ['setCount(1)을 부르면 React가 값을 바꾸고 이 컴포넌트를 다시 그리도록 예약해요', 'calling setCount(1) updates the stored value and schedules this component to render again'], ['다시 그린다는 건 Counter 함수를 새 count로 다시 실행해 새 JSX를 얻는 거예요', 'rendering again means calling Counter with the new count to get fresh JSX'], ['일반 변수는 함수가 실행될 때마다 처음부터 다시 만들어져서, 바꿔도 화면이 갱신되지 않아요', 'plain variables are recreated on every call, so changing them never updates the screen']],
    fin: [['state: 렌더 사이에 기억되고, 바뀌면 다시 렌더링을 일으키는 컴포넌트의 데이터', 'state is component data remembered between renders whose changes trigger a re-render', 'rcx-xs rcx-a'], ['훅은 컴포넌트 최상위에서만, 항상 같은 순서로 호출해요', 'call hooks only at the top level, always in the same order'], ['같은 컴포넌트를 두 번 쓰면 상태도 각자 따로 가져요', 'two instances of a component each get their own state']],
    caps: [['useState', 'useState'], ['set 함수', 'The setter'], ['다시 렌더링', 'Rendering again'], ['일반 변수와 차이', 'Unlike plain variables'], ['useState와 렌더링', 'useState and rendering']]
  });
}

function sBatching() {
  return CW('react-batching', {
    code: ['function onClick() {', '  setCount(count + 1);  // 0 + 1', '  setCount(count + 1);  // 0 + 1', ['  console.log(count);   // 아직 0', '  console.log(count);   // still 0'], ['}                       // 결과: 1', '}                       // result: 1'], ['setCount((c) => c + 1);  // 대기열 0 → 1', 'setCount((c) => c + 1);  // queue 0 → 1'], 'setCount((c) => c + 1);  //       1 → 2'],
    hl: [[1, 2, 'warn'], [3, 2, 'danger'], [5, 2, 'ok'], null],
    draw: (S) => {
      const X = 19.4;
      chip(S, 'snap', X, .8, 12.0, ['이번 렌더의 스냅숏: count = 0', 'this render’s snapshot: count = 0'], 'accent', 1, { off: 3, h: 1.2 });
      ['0 + 1', '0 + 1'].forEach((t, i) => nd(S, 'q' + i, X + i * 4.2, 2.8, 3.8, t, 'warn', 1, { off: 3 })); nd(S, 'r1', X + 8.4, 2.8, 3.6, '= 1', 'danger', 2, { off: 3 });
      lbl(S, 'n2', X, 4.6, ['같은 count(0)를 두 번 써서 1이 돼요', 'both read the same 0, giving 1'], 'r', 2, { off: 3 });
      ['c → c + 1', 'c → c + 1'].forEach((t, i) => nd(S, 'u' + i, X + i * 4.2, 2.8, 3.8, t, 'ok', 3, { off: 4 })); nd(S, 'r2', X + 8.4, 2.8, 3.6, '0 → 1 → 2', 'ok', 3, { off: 4 });
      lbl(S, 'n3', X, 4.6, ['갱신 함수는 대기열에서 차례로 적용', 'updater functions apply in queue order'], 'g', 3, { off: 4 });
      ['set', 'set', 'set'].forEach((t, i) => nd(S, 'b' + i, X + i * 2.6, 1.0, 2.2, t, 'warn', 4)); ar(S, 'ba', [X + 8.0, 1.55], [X + 9.0, 1.55], 'ink-3', 4, { h: .1 }); nd(S, 'br', X + 9.2, 1.0, 2.8, ['렌더 1번', '1 render'], 'ok', 4);
      lbl(S, 'n4', X, 2.8, ['여러 set은 모아서 한 번만 렌더(배칭)', 'many sets, one render: batching'], 'a', 4); lbl(S, 'n5', X, 3.9, ['setTimeout·Promise 안에서도 자동', 'automatic even in timeouts and promises'], '', 4);
    },
    notes: [['한 렌더 안의 count는 고정된 스냅숏이에요 · setCount(count + 1)을 두 번 불러도 둘 다 0 + 1이에요', 'count is a fixed snapshot within one render, so calling setCount(count + 1) twice computes 0 + 1 both times'], ['set을 불러도 변수는 바로 바뀌지 않아서 console.log는 여전히 0을 찍고, 결과는 1이에요', 'set does not change the variable immediately, so console.log still prints 0 and the result is 1'], ['이전 값을 기준으로 바꾸려면 c => c + 1 같은 갱신 함수를 넘겨요 · 대기열에서 차례로 적용돼 2가 돼요', 'to build on the previous value, pass an updater such as c => c + 1; queued updaters apply in order, giving 2'], ['여러 번의 set은 모아서 한 번만 다시 렌더해요 · React 18부터는 비동기 코드 안에서도 자동 배칭돼요', 'multiple sets are batched into a single re-render, and since React 18 this happens automatically even in async code']],
    fin: [['상태는 렌더마다의 스냅숏 · 갱신은 대기열에 쌓였다가 다음 렌더에 반영돼요', 'state is a per-render snapshot; updates queue up and land in the next render', 'rcx-xs rcx-a'], ['이전 값에 의존하는 갱신은 항상 갱신 함수 형태로 써요', 'always use the updater form when the next value depends on the previous one'], ['바뀐 값으로 무언가 해야 하면 계산한 값을 변수에 담아 함께 써요', 'if you need the new value right away, compute it into a variable and use that']],
    caps: [['스냅숏', 'A snapshot'], ['아직 0', 'Still 0'], ['갱신 함수', 'Updater functions'], ['자동 배칭', 'Automatic batching'], ['상태 스냅숏과 배칭', 'State snapshots and batching']]
  });
}

function sImmutable() {
  return CW('react-immutable', {
    code: ['user.age = 21; setUser(user);      // ✗', 'setUser({ ...user, age: 21 });     // ✓', ['setTodos([...todos, newTodo]);     // 추가', 'setTodos([...todos, newTodo]);     // add'], 'setTodos(todos.filter(t => t.id !== id));', 'setTodos(todos.map(t =>', '  t.id === id ? { ...t, done: !t.done } : t));', ['// 깊은 구조는 Immer: draft.a.b = 1', '// deep updates: Immer’s draft.a.b = 1']],
    hl: [[0, 1, 'danger'], [1, 1, 'ok'], [2, 4, 'ok'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'o1', X, 1.0, 5.4, ['#1 { age: 21 }', '#1 { age: 21 }'], 'danger', 1, { off: 2 }); lbl(S, 'o1l', X + 6.0, 1.15, ['같은 객체를 고침', 'mutated in place'], 'r', 1, { off: 2 });
      lbl(S, 'c1', X, 2.8, 'Object.is(#1, #1) → true', 'm r', 1, { off: 2 }); lbl(S, 'c1b', X, 3.9, ['변화 없음으로 보고 렌더 안 함', 'seen as unchanged: no render'], 'r', 1, { off: 2 });
      nd(S, 'o2', X, 1.0, 5.4, '#1 { age: 20 }', 'line', 2, { off: 3 }); ar(S, 'oa', [X + 5.5, 1.55], [X + 6.5, 1.55], 'ink-3', 2, { off: 3, h: .1 }); nd(S, 'o3', X + 6.6, 1.0, 5.4, '#2 { age: 21 }', 'ok', 2, { off: 3 });
      lbl(S, 'c2', X, 2.8, 'Object.is(#1, #2) → false', 'm g', 2, { off: 3 }); lbl(S, 'c2b', X, 3.9, ['새 객체 → 바뀌었다고 알아채요', 'a new object: change detected'], 'g', 2, { off: 3 });
      [['추가', 'add', '[...a, x]'], ['삭제', 'remove', 'filter'], ['수정', 'update', 'map + {...t}']].forEach(([k, e, f], i) => { nd(S, 'ar' + i, X, 1.0 + i * 1.5, 3.4, [k, e], 'accent', 3, { off: 4 }); lbl(S, 'af' + i, X + 3.8, 1.15 + i * 1.5, f, 'm', 3, { off: 4 }); });
      lbl(S, 'c3', X, 5.6, ['push·splice·sort는 원본을 바꿔서 피해요', 'avoid push, splice and sort, which mutate'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'c4', X, 1.0, ['Immer: 고치는 것처럼 쓰면', 'Immer: write as if mutating,'], 'a', 4); lbl(S, 'c5', X, 2.1, ['새 객체를 대신 만들어 줘요', 'and it builds new objects for you'], 'g', 4);
    },
    notes: [['객체를 직접 고친 뒤 set하면 같은 객체라서 React는 바뀐 게 없다고 보고 다시 렌더하지 않아요', 'mutating an object and setting it again passes the same reference, so React sees no change and skips the render'], ['전개 연산자로 새 객체를 만들어 넘기면 참조가 달라져 변화를 알아채요', 'spreading into a new object gives a new reference, which React detects as a change'], ['배열도 추가는 [...a, x], 삭제는 filter, 수정은 map으로 원본을 건드리지 않고 새 배열을 만들어요', 'arrays work the same way: [...a, x] to add, filter to remove and map to update, never touching the original'], ['깊게 중첩된 구조는 Immer를 쓰면 고치는 것처럼 써도 새 객체를 만들어 줘요', 'for deeply nested data, Immer lets you write mutations while it produces new objects']],
    fin: [['불변 업데이트: 기존 값을 고치지 않고 새 값을 만들어 set하는 것 · React는 참조 비교(Object.is)로 변화를 판단해요', 'immutable updates create new values instead of editing old ones, because React detects change by reference (Object.is)', 'rcx-xs rcx-a'], ['덕분에 이전 상태가 그대로 남아 되돌리기, 비교, 메모이제이션이 쉬워요', 'previous states stay intact, making undo, comparison and memoization easy'], ['ES2023의 toSorted·with도 원본을 바꾸지 않는 메서드예요', 'ES2023’s toSorted and with are non-mutating too']],
    caps: [['직접 수정의 함정', 'The mutation trap'], ['새 객체 만들기', 'Creating new objects'], ['배열 업데이트', 'Updating arrays'], ['Immer', 'Immer'], ['불변 업데이트', 'Immutable updates']]
  });
}

function sRenderCascade() {
  return CW('react-render', {
    code: ['function App() {', '  const [q, setQ] = useState("");', '  return (', '    <>', '      <Search q={q} onChange={setQ} />', '      <Results q={q} />', ['      <Footer />   {/* q와 무관 */}', '      <Footer />   {/* unrelated */}'], '    </>', '  );', '}', 'const Footer = memo(function Footer() {…});'],
    hl: [[1, 1], [4, 3, 'warn'], null, [10, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'app', X + 3.6, .8, 4.8, 'App', 'accent', 0);
      [['Search', 0], ['Results', 4.2], ['Footer', 8.4]].forEach(([t, dx], i) => { nd(S, 'k' + i, X + dx, 3.6, 3.6, t, 'line', 0); ed(S, 'ke' + i, [X + 6.0, 1.9], [X + dx + 1.8, 3.6], 0); });
      lbl(S, 'tr', X, 5.6, ['렌더가 일어나는 때: 상태 변경, 부모 렌더, Context 변경', 'renders happen on: state change, parent render, context change'], 'a', 1, { off: 2, w: 12 });
      tsets(S, 'app', [[2, 'warn', 50], [3, 'accent', 14]]); ['k0', 'k1', 'k2'].forEach(k => tsets(S, k, [[2, 'warn', 50], [3, 'line', 14]]));
      lbl(S, 'n2', X, 5.6, ['부모가 렌더되면 자식은 모두 다시 렌더', 'when a parent renders, every child renders'], 'w', 2, { off: 3, w: 12 });
      tsets(S, 'k1', [[3, 'ok', 40]]); lbl(S, 'n3', X, 5.6, ['렌더 ≠ DOM 변경 · 실제로 바뀐 건 결과 목록뿐', 'render ≠ DOM change; only Results really changed'], 'g', 3, { off: 4, w: 12 });
      tsets(S, 'k0', [[4, 'warn', 50]]); tsets(S, 'k1', [[4, 'warn', 50]]); tsets(S, 'k2', [[4, 'ok', 30]]); lbl(S, 'mm', X + 8.4, 4.9, 'memo ✓', 'm g', 4);
      lbl(S, 'n4', X, 5.6, ['memo: props가 같으면 건너뛰어요', 'memo skips renders when props are equal'], 'g', 4, { w: 12 });
    },
    notes: [['컴포넌트는 자기 상태가 바뀌거나, 부모가 렌더되거나, 구독한 Context가 바뀔 때 다시 렌더돼요', 'a component renders again when its state changes, its parent renders or a context it reads changes'], ['App의 q가 바뀌면 App이 다시 실행되고, 그 안의 자식은 q를 쓰든 말든 모두 다시 렌더돼요', 'when q in App changes, App reruns and every child renders again whether or not it uses q'], ['다시 렌더해도 결과가 같으면 DOM은 바뀌지 않아요 · 렌더는 계산이고 DOM 변경은 커밋에서만 일어나요', 'rendering again changes no DOM when the output is the same; rendering is calculation, and DOM changes happen only at commit'], ['memo로 감싼 Footer는 props가 그대로면 렌더를 건너뛰어요 · 정말 느릴 때만 써요', 'Footer wrapped in memo skips rendering when its props are unchanged; reserve it for genuinely slow parts']],
    fin: [['렌더링: React가 컴포넌트 함수를 호출해 새 UI 설명을 얻는 일 · 대부분 빠르니 측정 후 최적화해요', 'rendering is React calling component functions to get a fresh UI description; it is usually fast, so measure before optimizing', 'rcx-xs rcx-a'], ['상태를 쓰는 곳 가까이 내리면 다시 렌더되는 범위가 줄어요', 'moving state down to where it is used shrinks the re-render area'], ['React DevTools의 Profiler로 어떤 컴포넌트가 왜 렌더됐는지 볼 수 있어요', 'the React DevTools Profiler shows which components rendered and why']],
    caps: [['렌더 조건', 'What triggers a render'], ['부모에서 자식으로', 'From parent to children'], ['렌더와 DOM 변경', 'Render versus DOM change'], ['memo', 'memo'], ['렌더링이 일어나는 때', 'When components render']]
  });
}

function sLifting() {
  return CW('react-lifting', {
    code: ['function Accordion() {', '  const [active, setActive] = useState(0);', '  return (<>', '    <Panel isActive={active === 0}', '           onShow={() => setActive(0)} />', '    <Panel isActive={active === 1}', '           onShow={() => setActive(1)} />', '  </>);', '}'],
    hl: [null, [1, 1, 'ok'], [3, 4], [4, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pa', X + 3.4, .8, 5.2, 'Accordion', 'accent', 0); [0, 1].forEach(i => { nd(S, 'p' + i, X + i * 6.4, 3.6, 5.6, 'Panel', 'line', 0, { h: 1.4 }); ed(S, 'pe' + i, [X + 6.0, 1.9], [X + i * 6.4 + 2.8, 3.6], 0); });
      lbl(S, 's0', X + .2, 5.3, 'open ✓', 'm', 1, { off: 2 }); lbl(S, 's1', X + 6.6, 5.3, 'open ✓', 'm', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['각자 상태를 가지면 둘 다 열릴 수 있어요', 'with their own state, both can open'], 'r', 1, { off: 2, w: 12 });
      chip(S, 'st', X + 3.4, 2.1, 5.2, 'active = 0', 'ok', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['상태를 공통 부모로 끌어올려요', 'lift the state to the common parent'], 'g', 2, { off: 3 });
      tsets(S, 'p0', [[3, 'ok', 40]]); lbl(S, 'd1', X + .2, 5.3, 'isActive', 'm a', 3); lbl(S, 'd2', X + 6.6, 5.3, 'isActive', 'm a', 3);
      ar(S, 'dn', [X + 4.0, 3.1], [X + 3.0, 3.6], 'accent', 3, { h: .1 }); lbl(S, 'n3', X, 6.6, ['값은 props로 내려가고', 'values go down as props'], 'a', 3, { off: 4 });
      ar(S, 'up', [X + 8.8, 3.6], [X + 8.0, 3.1], 'warn', 4, { h: .1 }); lbl(S, 'upl', X + 9.0, 2.6, 'onShow', 'm w', 4);
      lbl(S, 'n4', X, 6.6, ['이벤트는 콜백으로 올라와요', 'events come up through callbacks'], 'w', 4); lbl(S, 'n5', X, 7.7, ['상태의 주인은 하나 · single source of truth', 'one owner: a single source of truth'], 'g', 4);
    },
    notes: [['두 패널이 각자 상태를 가지면 서로를 몰라서 동시에 열릴 수 있어요', 'when each panel owns its state, they cannot coordinate and both may open'], ['함께 맞춰야 하는 상태는 가장 가까운 공통 부모로 끌어올려요', 'state that must stay in sync moves up to the closest common parent'], ['부모는 isActive 같은 값을 props로 내려보내고', 'the parent passes values such as isActive down as props'], ['자식은 onShow 같은 콜백으로 “바꿔 주세요”라고 요청해요 · 상태의 주인은 언제나 한 곳이에요', 'and children request changes through callbacks such as onShow, so the state always has a single owner']],
    fin: [['상태 끌어올리기: 여러 컴포넌트가 공유하는 상태를 공통 부모에 두고 props와 콜백으로 연결하는 것', 'lifting state up places shared state in a common parent and connects it through props and callbacks', 'rcx-xs rcx-a'], ['너무 높이 올리면 렌더 범위가 넓어지니 필요한 만큼만 올려요', 'lift only as far as needed, since higher state widens re-renders'], ['멀리 떨어진 컴포넌트끼리는 Context나 상태 관리 도구를 고려해요', 'for distant components, consider Context or a state library']],
    caps: [['따로 노는 상태', 'Out-of-sync state'], ['공통 부모로', 'Up to the common parent'], ['props로 내려보내기', 'Passing down as props'], ['콜백으로 올려보내기', 'Calling back up'], ['상태 끌어올리기', 'Lifting state up']]
  });
}

function sControlled() {
  return CW('react-controlled', {
    code: ['const [email, setEmail] = useState("");', '<input', '  value={email}', '  onChange={(e) => setEmail(e.target.value)}', '/>', 'const valid = email.includes("@");', ['<button disabled={!valid}>가입</button>', '<button disabled={!valid}>Sign up</button>'], '<input name="nick" defaultValue="kim" />'],
    hl: [[0, 5], [3, 1, 'ok'], [5, 2, 'ok'], [7, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, P = [[X + 3.6, .8], [X + 7.8, 3.2], [X + 3.6, 5.6], [X - .4, 3.2]], L = [['입력 “k”', 'type “k”'], 'onChange', 'setEmail("k")', 'value="k"'];
      P.forEach(([x, y], i) => nd(S, 'c' + i, x, y, 4.6, L[i], ['accent', 'warn', 'ok', 'line'][i], 2, { h: 1.2, off: 3 }));
      [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], i) => { const [ax, ay] = P[a], [bx, by] = P[b]; ar(S, 'ca' + i, [ax + 2.3 + (bx - ax) * .25, ay + .6 + (by - ay) * .25], [bx + 2.3 - (bx - ax) * .25, by + .6 - (by - ay) * .25], 'ink-3', 2, { h: .1, off: 3 }); });
      sw(S, 'in2', X + 1.6, 1.0, 8.8, 1.2, 'var(--ui)', 3, { off: 4, css: 'border:.1em solid var(--ok)' }); T(S, 'in2l', X + 2.0, 1.2, 'kim@mail.com', 'cz-mono rcx-xs', 3, { off: 4 });
      sw(S, 'in', X + 1.6, 2.0, 8.8, 1.2, 'var(--ui)', 1, { off: 2, css: 'border:.1em solid var(--accent)' }); T(S, 'inl', X + 2.0, 2.2, 'kim@', 'cz-mono rcx-xs', 1, { off: 2 });
      lbl(S, 'n1', X, 4.2, ['화면의 값 = React 상태 · 진실은 한 곳', 'the input shows React state: one source of truth'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'bt', X + 1.6, 3.2, 4.0, 1.2, tint('ok', 60), 3, { off: 4 }); cl(S, 'btl', X + 1.6, 3.45, 4.0, ['가입', 'Sign up'], '', 3, { off: 4 }); lbl(S, 'v3', X + 6.0, 3.35, ['@가 있으면 활성', 'enabled once it has @'], 'g', 3, { off: 4 });
      lbl(S, 'n4', X, 1.0, ['비제어: DOM이 값을 가져요', 'uncontrolled: the DOM holds the value'], 'w', 4); lbl(S, 'n5', X, 2.1, ['제출할 때 FormData로 한 번에 읽기', 'read it once on submit via FormData'], '', 4);
    },
    notes: [['value를 상태와 묶은 입력창을 제어 컴포넌트라 해요 · 화면의 값은 언제나 React 상태예요', 'an input whose value is bound to state is a controlled component; what it shows is always React state'], ['글자를 칠 때마다 onChange → setEmail → 다시 렌더 → value 반영이 한 바퀴 돌아요', 'every keystroke goes around the loop: onChange, setEmail, re-render, value'], ['값이 상태에 있으니 검증, 버튼 활성화, 미리 보기를 렌더 중에 바로 계산해요', 'with the value in state, validation, button states and previews are computed right in render'], ['defaultValue만 준 비제어 입력은 DOM이 값을 가지고, 제출 때 FormData로 한 번에 읽어요', 'an uncontrolled input with only defaultValue keeps the value in the DOM, read once on submit with FormData']],
    fin: [['제어 컴포넌트: 폼 값의 주인이 React 상태 · 즉각적인 검증과 서식이 쉬워요', 'in a controlled component, React state owns the form value, making instant validation and formatting easy', 'rcx-xs rcx-a'], ['폼이 크면 React Hook Form처럼 비제어 기반 라이브러리가 렌더를 줄여요', 'for large forms, uncontrolled-based libraries such as React Hook Form cut re-renders'], ['value만 주고 onChange가 없으면 입력이 막혀 경고가 떠요', 'value without onChange makes the input read-only and triggers a warning']],
    caps: [['제어 컴포넌트', 'Controlled components'], ['입력 한 바퀴', 'One keystroke’s loop'], ['파생 검증', 'Derived validation'], ['비제어 입력', 'Uncontrolled inputs'], ['제어 컴포넌트와 폼', 'Controlled components and forms']]
  });
}

function sDerived() {
  return CW('react-derived', {
    code: ['const [items, setItems] = useState([]);', 'const [count, setCount] = useState(0); // ✗', 'useEffect(() => setCount(items.length),', '  [items]);                            // ✗', 'const count = items.length;            // ✓', 'const shown = items.filter(matches(q));', 'const sorted = useMemo(() => sort(shown),', ['  [shown]);                // 비쌀 때만', '  [shown]);                // only if costly']],
    hl: [[1, 1, 'danger'], [2, 2, 'danger'], [4, 2, 'ok'], [6, 2]],
    side: [
      [[['계산할 수 있는 값을 state로', 'storing a computable value'], 'r'], [['items와 count가 어긋날 수 있어요', 'items and count can drift apart'], '']],
      [[['이펙트로 맞추면', 'syncing with an effect'], 'w'], [['렌더 → 이펙트 → 또 렌더', 'render → effect → render again'], 'r'], [['잠깐 틀린 값도 보여요', 'and briefly shows stale values'], '']],
      [[['렌더 중에 바로 계산', 'compute it during render'], 'g'], [['언제나 최신, 추가 렌더 없음', 'always current, no extra render'], '']],
      [[['정말 비쌀 때만 useMemo', 'useMemo only when truly costly'], 'a'], [['먼저 측정하고 최적화', 'measure before optimizing'], '']]
    ],
    notes: [['items.length처럼 다른 상태에서 계산할 수 있는 값을 따로 state로 두면 둘이 어긋나기 쉬워요', 'keeping a value such as items.length in separate state invites the two to drift apart'], ['이펙트로 맞추면 렌더 → 이펙트 → 다시 렌더가 되어 느리고, 잠깐 틀린 값이 보이기도 해요', 'syncing it in an effect costs render, effect and render again, and can flash a stale value'], ['파생 값은 렌더 중에 그냥 계산해요 · 언제나 최신이고 추가 렌더도 없어요', 'derive it during render instead: always current, with no extra render'], ['정렬처럼 정말 비싼 계산만 useMemo로 캐시해요 · 대부분은 그냥 계산해도 충분히 빨라요', 'cache only genuinely expensive work such as sorting with useMemo; most calculations are fast enough as is']],
    fin: [['파생 상태: 기존 props·state에서 계산할 수 있는 값은 state로 두지 않고 렌더 중에 계산해요', 'derived state: values computable from existing props or state are calculated during render, not stored', 'rcx-xs rcx-a'], ['“이펙트가 필요 없을 수도 있다”는 React 공식 문서의 핵심 조언이에요', '“you might not need an effect” is a core piece of advice in the React docs'], ['상태는 최소한으로 · 나머지는 모두 계산', 'keep state minimal and compute everything else']],
    caps: [['중복 상태', 'Duplicated state'], ['이펙트로 동기화', 'Syncing with effects'], ['렌더 중 계산', 'Computing during render'], ['비쌀 때만 캐시', 'Caching only costly work'], ['파생 상태', 'Derived state']]
  });
}
/* ===== React · 3. effects and hooks ===== */
/* a row of renders with effect markers */
const timeline = (S, p, X, y, labels, runs, st, off) => {
  labels.forEach((t, i) => { nd(S, p + 'r' + i, X + i * 3.1, y, 2.6, t, 'line', st, { off, h: 1.0 }); if (runs[i]) chip(S, p + 'e' + i, X + i * 3.1, y + 1.3, 2.6, 'effect', 'ok', st, { off, h: 1.0, pct: 40 }); });
};

function sUseEffect() {
  return CW('react-useeffect', {
    code: ['useEffect(() => {', ['  document.title = `${count}개`;', '  document.title = `${count} items`;'], ['});              // 매 렌더 후', '});              // after every render'], 'useEffect(() => {', '  connect(roomId);', ['}, [roomId]);     // roomId가 바뀔 때', '}, [roomId]);     // when roomId changes'], 'useEffect(() => {', '  track("page_view");', ['}, []);           // 처음 한 번', '}, []);           // once, on mount']],
    hl: [[0, 3], [3, 3, 'ok'], [6, 3, 'warn'], null],
    draw: (S) => {
      const X = 19.4, L = ['a', 'a', 'b', 'b'].map((r, i) => 'R' + (i + 1) + ' ' + r);
      lbl(S, 'h', X, .6, ['렌더(roomId)', 'renders (roomId)'], 'a', 1, { off: 4 });
      timeline(S, 'a', X, 1.6, L, [1, 1, 1, 1], 1, 2); timeline(S, 'b', X, 1.6, L, [1, 0, 1, 0], 2, 3); timeline(S, 'c', X, 1.6, L, [1, 0, 0, 0], 3, 4);
      lbl(S, 'n1', X, 4.4, ['의존성 배열 없음: 매번', 'no array: every time'], 'w', 1, { off: 2 }); lbl(S, 'n2', X, 4.4, ['[roomId]: 값이 바뀐 렌더 뒤에만', '[roomId]: only after it changes'], 'g', 2, { off: 3 }); lbl(S, 'n3', X, 4.4, ['[ ]: 처음 마운트 후 한 번', '[ ]: once after mounting'], 'a', 3, { off: 4 });
      ['render', 'commit', 'paint', 'effect'].forEach((t, i) => { nd(S, 'p' + i, X + i * 3.1, 1.6, 2.6, t, i === 3 ? 'ok' : 'line', 4); if (i) ar(S, 'pa' + i, [X + i * 3.1 - .45, 2.15], [X + i * 3.1 - .05, 2.15], 'ink-3', 4, { h: .08 }); });
      lbl(S, 'n4', X, 3.4, ['이펙트는 화면을 그린 다음에 실행돼요', 'effects run after the screen is painted'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 4.5, ['React 바깥과 동기화할 때 써요', 'use them to sync with things outside React'], 'g', 4, { w: 12 });
    },
    notes: [['의존성 배열이 없으면 이펙트는 렌더할 때마다 실행돼요', 'with no dependency array, the effect runs after every render'], ['[roomId]를 주면 roomId가 이전 렌더와 달라졌을 때만 다시 실행돼요', 'with [roomId], it reruns only when roomId differs from the previous render'], ['빈 배열 []이면 처음 화면에 나타난(마운트된) 뒤 한 번만 실행돼요', 'with an empty [], it runs once after the component first appears (mounts)'], ['이펙트는 렌더와 커밋, 페인트가 끝난 뒤에 실행돼요 · 네트워크, 구독, DOM 같은 React 바깥과 맞출 때 써요', 'effects run after render, commit and paint, for syncing with things outside React such as the network, subscriptions and the DOM']],
    fin: [['useEffect: 렌더 결과를 React 바깥 시스템과 동기화하는 훅 · 의존성 배열이 실행 시점을 정해요', 'useEffect syncs render results with systems outside React, and its dependency array decides when it runs', 'rcx-xs rcx-a'], ['이펙트 안에서 쓰는 반응형 값은 모두 의존성에 넣어요 · 린터가 알려 줘요', 'list every reactive value the effect uses as a dependency; the linter checks this'], ['이벤트 때문에 생기는 일은 이펙트가 아니라 이벤트 핸들러에 써요', 'work caused by an event belongs in the event handler, not an effect']],
    caps: [['배열 없음', 'No array'], ['[roomId]', '[roomId]'], ['빈 배열', 'An empty array'], ['실행 시점', 'When effects run'], ['useEffect와 의존성 배열', 'useEffect and dependencies']]
  });
}

function sCleanup() {
  return CW('react-cleanup', {
    code: ['useEffect(() => {', '  const conn = connect(roomId);', '  return () => conn.disconnect();', '}, [roomId]);', ['// 연결(a) → 해제(a) → 연결(b)', '// connect(a) → cleanup(a) → connect(b)'], ['// 개발 모드: 연결 → 해제 → 연결', '// dev mode: connect → cleanup → connect'], 'useEffect(() => {', '  const id = setInterval(tick, 1000);', '  return () => clearInterval(id);', '}, []);'],
    hl: [[0, 4], [4, 1, 'ok'], [5, 1, 'warn'], [6, 4]],
    draw: (S) => {
      const X = 19.4, ev = (p, y, list, st, off) => list.forEach(([t, c], i) => nd(S, p + i, X + (i % 2) * 6.2, y + Math.floor(i / 2) * 1.4, 5.6, t, c, st, { off, h: 1.1 }));
      ev('a', 1.0, [['connect a', 'ok']], 1, 2); lbl(S, 'n1', X, 2.8, ['정리 함수를 돌려주면 React가 기억해요', 'return a cleanup and React keeps it'], 'a', 1, { off: 2 });
      ev('b', 1.0, [['connect a', 'ok'], ['cleanup a', 'danger'], ['connect b', 'ok'], ['cleanup b', 'danger']], 2, 3);
      lbl(S, 'n2', X, 4.2, ['roomId가 바뀌면: 이전 것 정리 후 새로 연결', 'roomId changes: clean up, then reconnect'], 'g', 2, { off: 3, w: 12 });
      ev('c', 1.0, [['connect', 'ok'], ['cleanup', 'danger'], ['connect', 'ok']], 3, 4);
      lbl(S, 'n3', X, 4.2, ['개발 모드는 일부러 두 번 실행해 정리 누락을 찾아요', 'dev mode runs it twice on purpose to catch missing cleanups'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 1.0, ['타이머·구독·이벤트 리스너는', 'timers, subscriptions and listeners'], 'a', 4); lbl(S, 'n5', X, 2.1, ['반드시 정리해야 누수가 없어요', 'must be cleaned up to avoid leaks'], 'g', 4);
    },
    notes: [['이펙트가 함수를 돌려주면 그것이 정리(cleanup) 함수예요 · 연결했으면 끊는 코드를 짝지어 둬요', 'a function returned from an effect is its cleanup, pairing every connect with a disconnect'], ['roomId가 바뀌면 React는 이전 이펙트를 먼저 정리하고 새 값으로 다시 실행해요 · 사라질 때도 정리해요', 'when roomId changes, React cleans up the previous effect before rerunning it, and cleans up again on unmount'], ['개발 모드의 Strict Mode는 일부러 실행 → 정리 → 실행을 해서 정리 누락 버그를 드러내요', 'Strict Mode in development deliberately runs setup, cleanup and setup to expose missing cleanups'], ['setInterval, 구독, addEventListener는 정리하지 않으면 계속 남아 메모리 누수가 돼요', 'intervals, subscriptions and event listeners linger as memory leaks unless cleaned up']],
    fin: [['정리 함수: 이펙트가 만든 것을 되돌리는 함수 · 다음 실행 전과 언마운트 때 호출돼요', 'a cleanup function undoes what the effect set up and runs before the next run and on unmount', 'rcx-xs rcx-a'], ['“설정 → 정리 → 설정”이 반복돼도 문제없게 만드는 것이 목표예요', 'the goal is code that works through any number of setup, cleanup, setup cycles'], ['프로덕션에서는 이중 실행이 일어나지 않아요', 'the double run does not happen in production']],
    caps: [['정리 함수', 'Cleanup functions'], ['값이 바뀔 때', 'When values change'], ['Strict Mode 이중 실행', 'Strict Mode’s double run'], ['누수 막기', 'Preventing leaks'], ['정리 함수와 Strict Mode', 'Cleanup and Strict Mode']]
  });
}

function sFetchEffect() {
  return CW('react-fetch-effect', {
    code: ['useEffect(() => {', '  let ignore = false;', '  fetch(`/api/user/${id}`)', '    .then((r) => r.json())', '    .then(u => { if (!ignore) setUser(u); });', '  return () => { ignore = true; };', '}, [id]);', ['// 실무: TanStack Query, SWR, RSC', '// in practice: TanStack Query, SWR, RSC']],
    hl: [[0, 4], [2, 3, 'danger'], [1, 5, 'ok'], [7, 1]],
    draw: (S) => {
      const X = 19.4, U = 2.2;
      lbl(S, 't1', X, .8, 'id=1', 'm a', 1); lbl(S, 't2', X, 2.2, 'id=2', 'm g', 2);
      chip(S, 'q1', X + 2.0, .7, 4.5 * U, ['요청 1 (느림)', 'request 1 (slow)'], 'accent', 1, { h: 1.0 }); chip(S, 'q2', X + 2.0 + U, 2.1, 1.6 * U, ['요청 2', 'request 2'], 'ok', 2, { h: 1.0 });
      lbl(S, 'w1', X, 3.8, ['id가 바뀌어 요청 2를 보냈는데', 'id changes and request 2 goes out,'], '', 2, { off: 3 });
      lbl(S, 'w2', X, 4.9, ['늦게 온 응답 1이 화면을 덮어써요', 'but the late response 1 overwrites it'], 'r', 2, { off: 3 }); tsets(S, 'q1', [[2, 'danger', 40], [3, 'line', 14]]);
      lbl(S, 'w3', X, 3.8, ['id가 바뀌면 정리 함수가 ignore = true', 'on change, cleanup sets ignore = true'], 'a', 3, { off: 4 }); lbl(S, 'w4', X, 4.9, ['늦게 온 응답 1은 무시해요 ✓', 'the late response 1 is ignored ✓'], 'g', 3, { off: 4 });
      lbl(S, 'w5', X, 3.8, ['캐시·중복 제거·재시도·로딩 상태', 'caching, deduping, retries, loading states'], 'a', 4, { w: 12 }); lbl(S, 'w6', X, 4.9, ['는 라이브러리나 프레임워크에 맡겨요', 'are best left to a library or framework'], 'g', 4, { w: 12 });
    },
    notes: [['이펙트 안에서 fetch로 데이터를 가져와 상태에 넣을 수 있어요', 'an effect can fetch data and store the result in state'], ['그런데 id가 빠르게 바뀌면, 먼저 보낸 느린 요청이 나중에 도착해 최신 결과를 덮어쓰는 경쟁 상태가 생겨요', 'when id changes quickly, an earlier slow request can arrive last and overwrite the newest result, a race condition'], ['정리 함수에서 ignore = true로 표시해, 이미 지나간 요청의 응답은 버려요', 'setting ignore = true in the cleanup discards responses from requests that are no longer current'], ['실무에서는 캐시와 재시도까지 처리하는 TanStack Query나 프레임워크의 데이터 로딩을 써요', 'in practice, TanStack Query or framework data loading handles caching and retries as well']],
    fin: [['이펙트로 데이터 가져오기: 경쟁 상태를 정리 함수로 막아야 하고, 캐시가 없어 매번 다시 가져와요', 'fetching in effects needs cleanup to prevent races and has no cache, refetching every time', 'rcx-xs rcx-a'], ['AbortController로 요청 자체를 취소할 수도 있어요', 'AbortController can cancel the request itself'], ['서버 컴포넌트에서는 이펙트 없이 서버에서 바로 가져와요', 'server components fetch on the server with no effect at all']],
    caps: [['이펙트에서 fetch', 'Fetching in an effect'], ['경쟁 상태', 'A race condition'], ['ignore 플래그', 'The ignore flag'], ['라이브러리에 맡기기', 'Leaving it to libraries'], ['이펙트로 데이터 가져오기', 'Fetching data in effects']]
  });
}

function sUseRef() {
  return CW('react-useref', {
    code: ['const inputRef = useRef(null);', '<input ref={inputRef} />', 'inputRef.current.focus();', 'const timer = useRef(0);', ['timer.current = setInterval(…); // 렌더 X', 'timer.current = setInterval(…); // no render'], 'const renders = useRef(0);', ['renders.current++;  // 화면은 안 바뀌어요', 'renders.current++;  // the screen stays']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 2], [5, 2, 'warn']],
    side: [
      [[['ref: { current: … } 상자', 'a ref is a { current: … } box'], 'a'], [['ref 속성으로 DOM 요소를 담아요', 'the ref attribute stores a DOM node'], '']],
      [[['포커스·스크롤·측정 같은 명령형 작업', 'imperative work: focus, scroll, measure'], 'g']],
      [[['렌더 사이에 값을 기억해요', 'it remembers values between renders'], 'a'], [['타이머 id, 이전 값 보관', 'timer ids, previous values'], '']],
      [[['바꿔도 다시 렌더하지 않아요', 'changing it never re-renders'], 'w'], [['화면에 보이는 값이면 state로', 'if it shows on screen, use state'], 'r'], [['렌더 중엔 읽거나 쓰지 않기', 'do not read or write during render'], '']]
    ],
    notes: [['useRef는 { current } 하나를 가진 상자를 돌려줘요 · ref 속성에 넘기면 DOM 요소가 담겨요', 'useRef returns a box with a single current field, and passing it to ref stores the DOM element'], ['inputRef.current.focus()처럼 포커스, 스크롤, 크기 측정 같은 명령형 작업에 써요', 'use it for imperative work such as focusing, scrolling and measuring'], ['렌더가 몇 번 일어나도 같은 상자가 유지돼서, 타이머 id처럼 화면과 무관한 값을 보관해요', 'the same box survives every render, holding values unrelated to the screen such as timer ids'], ['ref를 바꿔도 다시 렌더되지 않아요 · 화면에 보여야 하는 값이면 state를 써요', 'changing a ref never re-renders, so values that appear on screen belong in state']],
    fin: [['useRef: 렌더와 무관하게 유지되는 변경 가능한 상자 · DOM 접근과 숨은 값 보관에 써요', 'useRef is a mutable box that persists independently of rendering, for DOM access and hidden values', 'rcx-xs rcx-a'], ['React 19에서는 ref를 일반 prop처럼 자식 컴포넌트에 넘길 수 있어요(forwardRef 불필요)', 'in React 19, ref can be passed to child components like any prop, without forwardRef'], ['state는 “화면용 기억”, ref는 “화면과 무관한 기억”', 'state is memory for the screen; refs are memory that is not']],
    caps: [['DOM 요소 담기', 'Holding DOM nodes'], ['명령형 작업', 'Imperative work'], ['렌더 사이의 값', 'Values across renders'], ['렌더를 일으키지 않아요', 'No re-render'], ['useRef', 'useRef']]
  });
}

function sMemo() {
  return CW('react-memo', {
    code: ['const total = useMemo(', '  () => sum(items.map(i => i.price)),', '  [items]);', 'const onSelect = useCallback(', '  (id) => setSel(id), []);', 'const Row = memo(({ item, onSelect }) =>', '  <li onClick={() => onSelect(item.id)} />);', ['// React Compiler가 자동으로 해 주기도', '// React Compiler can do this for you']],
    hl: [[0, 3, 'ok'], [3, 2, 'ok'], [5, 2, 'ok'], [7, 1]],
    side: [
      [[['useMemo: 계산 결과를 캐시', 'useMemo caches a computed value'], 'a'], [['items가 같으면 다시 계산 안 함', 'no recompute while items is unchanged'], '']],
      [[['useCallback: 함수 자체를 캐시', 'useCallback caches the function'], 'a'], [['매 렌더 새 함수 → 참조가 달라짐', 'new function each render = new ref'], 'w']],
      [[['memo: props가 같으면 렌더 생략', 'memo skips renders on equal props'], 'a'], [['props 비교는 Object.is', 'props compare with Object.is'], ''], [['함수 props가 매번 새로우면 무용', 'useless if function props change'], 'r']],
      [[['먼저 측정, 느린 곳에만', 'measure first, optimize hot spots'], 'g'], [['React Compiler가 자동 메모', 'React Compiler memoizes for you'], 'a']]
    ],
    notes: [['useMemo는 의존성이 같은 동안 계산 결과를 재사용해요 · 무거운 계산에만 써요', 'useMemo reuses a result while its dependencies are unchanged; reserve it for heavy calculations'], ['useCallback은 함수 자체를 재사용해요 · 렌더마다 새 함수가 만들어지면 참조가 달라지기 때문이에요', 'useCallback reuses the function itself, because each render otherwise creates a new function with a new reference'], ['memo로 감싼 컴포넌트는 props가 같으면 다시 렌더하지 않는데, 함수 props가 매번 새로우면 효과가 없어요', 'a memo-wrapped component skips rendering on equal props, which fails when function props are new every time'], ['메모이제이션도 비용이라 측정 후 필요한 곳에만 써요 · React Compiler가 이를 자동으로 해 주기도 해요', 'memoization has costs, so apply it after measuring; React Compiler can add it automatically']],
    fin: [['메모이제이션: 같은 입력이면 이전 결과(값·함수·렌더)를 재사용해 불필요한 일을 줄이는 것', 'memoization reuses previous results (values, functions or renders) for the same inputs to skip needless work', 'rcx-xs rcx-a'], ['useMemo(값), useCallback(함수), memo(컴포넌트) 세 가지가 함께 쓰여요', 'useMemo for values, useCallback for functions and memo for components work together'], ['성능 문제의 대부분은 상태 위치를 바꾸는 것만으로도 해결돼요', 'many performance issues disappear just by moving state']],
    caps: [['useMemo', 'useMemo'], ['useCallback', 'useCallback'], ['memo', 'memo'], ['측정과 컴파일러', 'Measuring and the compiler'], ['useMemo·useCallback·memo', 'useMemo, useCallback and memo']]
  });
}

function sCustomHook() {
  return CW('react-customhook', {
    code: ['function useOnline() {', '  const [on, setOn] = useState(true);', '  useEffect(() => {', '    const f = () => setOn(navigator.onLine);', '    addEventListener("online", f);', '    addEventListener("offline", f);', ['    return () => { /* 리스너 해제 */ };', '    return () => { /* remove listeners */ };'], '  }, []);', '  return on;', '}', ['const online = useOnline();  // 어디서나', 'const online = useOnline();  // anywhere']],
    hl: [[0, 1], [1, 7], [10, 1, 'ok'], null],
    side: [
      [[['use로 시작하는 함수 = 커스텀 훅', 'a function named use… is a custom hook'], 'a']],
      [[['안에서 다른 훅을 자유롭게', 'it can call other hooks inside'], 'a'], [['상태 + 이펙트를 한 묶음으로', 'bundling state and effects'], 'g']],
      [[['컴포넌트는 한 줄로 가져다 써요', 'components use it in one line'], 'g'], [['상태는 공유 X · 호출마다 따로', 'state is not shared: one per call'], 'w']],
      [[['훅의 규칙', 'rules of hooks'], 'a'], [['최상위에서만 호출', 'call only at the top level'], ''], [['if·for·콜백 안에서 호출 금지', 'never inside if, loops or callbacks'], 'r']]
    ],
    notes: [['use로 시작하는 이름의 함수를 만들면 커스텀 훅이 돼요', 'a function whose name starts with use is a custom hook'], ['안에서 useState, useEffect 같은 훅을 써서 “온라인 여부 추적” 같은 로직을 하나로 묶어요', 'inside it, hooks such as useState and useEffect bundle logic such as tracking online status'], ['여러 컴포넌트가 한 줄로 가져다 쓰지만, 상태는 공유되지 않고 호출한 컴포넌트마다 따로 생겨요', 'many components can use it in one line, but each call gets its own state rather than sharing it'], ['훅은 항상 최상위에서 같은 순서로 불러야 해요 · 조건문이나 반복문 안에서 부르면 안 돼요', 'hooks must be called at the top level in the same order, never inside conditions or loops']],
    fin: [['커스텀 훅: 상태가 있는 로직을 재사용하는 방법 · 상태 자체가 아니라 “로직”을 공유해요', 'custom hooks reuse stateful logic; they share the logic, not the state itself', 'rcx-xs rcx-a'], ['useFetch, useDebounce, useLocalStorage 같은 훅이 대표적이에요', 'classic examples are useFetch, useDebounce and useLocalStorage'], ['외부 저장소 구독은 useSyncExternalStore로 하면 더 안전해요', 'useSyncExternalStore is the safer way to subscribe to external stores']],
    caps: [['use로 시작하는 함수', 'Functions named use…'], ['훅 조합', 'Composing hooks'], ['재사용과 독립된 상태', 'Reuse with separate state'], ['훅의 규칙', 'The rules of hooks'], ['커스텀 훅', 'Custom hooks']]
  });
}

function sReducer() {
  return CW('react-reducer', {
    code: ['function reducer(state, a) {', '  switch (a.type) {', '    case "add": return [...state, a.item];', '    case "remove":', '      return state.filter(t => t.id !== a.id);', '    default: return state;', '  }', '}', 'const [todos, dispatch] =', '  useReducer(reducer, []);', 'dispatch({ type: "add", item });'],
    hl: [[10, 1], [0, 8, 'ok'], [8, 2], null],
    draw: (S) => {
      const X = 19.4, P = [[X, 1.0], [X + 6.4, 1.0], [X + 6.4, 4.2], [X, 4.2]], L = [['클릭', 'click'], 'dispatch(action)', 'reducer(state, a)', ['새 상태 → 렌더', 'new state → render']];
      P.forEach(([x, y], i) => nd(S, 'c' + i, x, y, 5.6, L[i], ['accent', 'warn', 'ok', 'line'][i], 1, { h: 1.2 }));
      ar(S, 'a0', [X + 5.7, 1.6], [X + 6.3, 1.6], 'ink-3', 1, { h: .1 }); ar(S, 'a1', [X + 9.2, 2.3], [X + 9.2, 4.1], 'ink-3', 1, { h: .1 }); ar(S, 'a2', [X + 6.3, 4.8], [X + 5.7, 4.8], 'ink-3', 1, { h: .1 });
      lbl(S, 'n1', X, 6.2, ['컴포넌트는 “무슨 일이 일어났는지”만 알려요', 'components only report what happened'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.2, ['상태가 어떻게 바뀌는지는 reducer 한 곳에', 'how state changes lives in one reducer'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.2, ['순수 함수라 테스트하기 쉬워요', 'a pure function, easy to test'], 'g', 3, { off: 4 });
      lbl(S, 'n4', X, 6.2, ['상태가 복잡하고 갱신 종류가 많을 때 유리', 'best for complex state with many update kinds'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.3, ['Redux도 같은 아이디어예요', 'Redux uses the same idea'], '', 4);
    },
    notes: [['이벤트 핸들러는 dispatch({ type: "add" })처럼 “무슨 일이 일어났는지”를 적은 액션만 보내요', 'event handlers only dispatch actions describing what happened, such as { type: "add" }'], ['reducer(state, action)가 현재 상태와 액션을 받아 새 상태를 돌려줘요 · 갱신 규칙이 한 곳에 모여요', 'reducer(state, action) takes the current state and an action and returns the next state, gathering all update rules in one place'], ['useReducer(reducer, 초기값)은 [상태, dispatch]를 돌려주고, 새 상태로 다시 렌더해요', 'useReducer(reducer, initial) returns [state, dispatch] and re-renders with each new state'], ['reducer는 순수 함수라 테스트가 쉬워요 · 갱신 종류가 많고 복잡한 상태에 useState보다 유리해요', 'reducers are pure functions and easy to test, making them better than useState for complex state with many kinds of updates']],
    fin: [['useReducer: 상태 갱신 로직을 (state, action) → newState 순수 함수로 분리하는 훅', 'useReducer separates update logic into a pure (state, action) → newState function', 'rcx-xs rcx-a'], ['reducer 안에서도 불변 업데이트를 지켜요', 'reducers must update immutably too'], ['Context와 함께 쓰면 작은 전역 상태 관리가 돼요', 'combined with Context, it becomes lightweight global state management']],
    caps: [['액션 보내기', 'Dispatching actions'], ['reducer', 'The reducer'], ['useReducer 연결', 'Wiring up useReducer'], ['언제 쓰나', 'When to use it'], ['useReducer', 'useReducer']]
  });
}
/* ===== React · 4. state management and structure ===== */
function sContext() {
  return CW('react-context', {
    code: ['const ThemeContext = createContext("light");', 'function App() {', '  const [theme, setTheme] = useState("dark");', '  return (', '    <ThemeContext value={theme}>', '      <Page />', '    </ThemeContext>', '  );', '}', ['const theme = use(ThemeContext); // 깊은 곳', 'const theme = use(ThemeContext); // deep down']],
    hl: [null, [4, 3, 'ok'], [9, 1, 'ok'], [2, 1, 'warn']],
    draw: (S) => {
      const X = 19.4, N = [['App', 0, .8], ['Page', 1, 2.8], ['Sidebar', 2, 4.8], ['Button', 3, 6.8]];
      N.forEach(([t, i, y]) => { nd(S, 'n' + i, X + i * 1.6, y, 4.4, t, i === 0 ? 'accent' : i === 3 ? 'ok' : 'line', 0); if (i) ed(S, 'e' + i, [X + (i - 1) * 1.6 + 2.2, y - .9], [X + i * 1.6 + 2.2, y], 0); });
      [1, 2, 3].forEach(i => lbl(S, 'pd' + i, X + i * 1.6 + 4.7, .8 + i * 2.0 + .15, 'theme', 'm w', 1, { off: 2 }));
      lbl(S, 'n1', X, 9.0, ['쓰지도 않는 Page·Sidebar가 theme을 전달만', 'Page and Sidebar just relay theme'], 'r', 1, { off: 2, w: 12 });
      ar(S, 'cx', [X + 4.6, 1.4], [X + 7.4, 6.9], 'ok', 2, { h: .1, dash: 1 }); lbl(S, 'n2', X, 9.0, ['Provider 아래 어디서든 바로 읽어요', 'read it directly anywhere below the provider'], 'g', 2, { w: 12 });
      ['n1', 'n2'].forEach(k => tsets(S, k, [[4, 'line', 14]])); tsets(S, 'n3', [[4, 'warn', 50]]); tsets(S, 'n0', [[4, 'warn', 50]]);
      lbl(S, 'n4', X, 10.1, ['값이 바뀌면 그 값을 읽는 컴포넌트가 모두 다시 렌더', 'when the value changes, every reader re-renders'], 'w', 4, { w: 12 });
    },
    notes: [['깊은 곳의 Button이 theme을 쓰려면, 중간 컴포넌트들이 쓰지도 않는 props를 계속 전달해야 해요(prop drilling)', 'for a deep Button to use theme, every component in between must relay props it never uses: prop drilling'], ['createContext로 만든 Context로 감싸면, 그 아래 어디서든 값을 바로 읽어요', 'wrapping the tree in a Context made with createContext lets anything below read the value directly'], ['use(ThemeContext)나 useContext로 가장 가까운 Provider의 값을 가져와요', 'use(ThemeContext) or useContext reads the nearest provider’s value'], ['값이 바뀌면 그 Context를 읽는 모든 컴포넌트가 다시 렌더돼요 · 자주 바뀌는 값은 나누거나 다른 도구를 써요', 'when the value changes, every component reading it re-renders, so split fast-changing values or use another tool']],
    fin: [['Context: 트리 깊숙이 값을 전달하는 통로 · 테마, 로그인 사용자, 언어 같은 전역에 가까운 값에 써요', 'Context is a channel for passing values deep into the tree, for app-wide values such as theme, the signed-in user or language', 'rcx-xs rcx-a'], ['React 19부터 <Context.Provider> 대신 <Context value>로 바로 써요', 'since React 19, <Context value> replaces <Context.Provider>'], ['먼저 합성(children)으로 해결되는지 살펴보세요', 'check whether composition with children solves it first']],
    caps: [['prop drilling', 'Prop drilling'], ['Context로 감싸기', 'Wrapping in Context'], ['깊은 곳에서 읽기', 'Reading deep down'], ['바뀌면 다시 렌더', 'Changes re-render readers'], ['Context', 'Context']]
  });
}

function sStateMgmt() {
  return CW('react-statemgmt', {
    code: ['const { data, isPending } = useQuery({', '  queryKey: ["todos", page],', '  queryFn: () => fetchTodos(page),', '  staleTime: 60_000,', '});', 'const useCart = create((set) => ({', '  items: [],', '  add: (it) => set((s) => ({', '    items: [...s.items, it] })),', '}));', 'const n = useCart((s) => s.items.length);'],
    hl: [[0, 5], [1, 3, 'ok'], [5, 5], [10, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'sv', X, .8, 5.8, 6.0, 'accent', 0, { w: .1 }); lbl(S, 'svl', X + .3, .9, ['서버 상태', 'server state'], 'a', 0);
      frame(S, 'cs', X + 6.2, .8, 5.8, 6.0, 'warn', 0, { w: .1 }); lbl(S, 'csl', X + 6.5, .9, ['클라이언트 상태', 'client state'], 'w', 0);
      ['todos', 'user', 'posts'].forEach((t, i) => nd(S, 's' + i, X + .4, 2.0 + i * 1.4, 5.0, t, 'accent', 1, { h: 1.1 }));
      [['모달 열림', 'modal open'], ['장바구니', 'cart'], ['다크 모드', 'dark mode']].forEach((t, i) => nd(S, 'c' + i, X + 6.6, 2.0 + i * 1.4, 5.0, t, 'warn', 1, { h: 1.1 }));
      lbl(S, 'n1', X, 7.4, ['서버 데이터는 “원격의 복사본”이라 따로 관리', 'server data is a remote copy, managed apart'], 'a', 1, { off: 2, w: 12 });
      tsets(S, 's0', [[2, 'ok', 40]]); lbl(S, 'f2', X + .4, 6.0, 'fresh 60s → stale', 'm g', 2, { off: 3 });
      lbl(S, 'n2', X, 7.4, ['키로 캐시하고, 오래되면 다시 가져와요', 'cached by key, refetched once stale'], 'g', 2, { off: 3, w: 12 });
      tsets(S, 'c1', [[3, 'ok', 40]]); lbl(S, 'n3', X, 7.4, ['작은 전역 저장소(Zustand)로 UI 상태를', 'a small global store (Zustand) for UI state'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.4, ['필요한 조각만 구독 → 그 값이 바뀔 때만 렌더', 'subscribe to a slice; re-render only when it changes'], 'g', 4, { w: 12 }); lbl(S, 'n5', X, 8.5, ['서버 데이터를 전역 저장소에 복사하지 않기', 'never copy server data into the global store'], 'r', 4, { w: 12 });
    },
    notes: [['상태는 두 종류예요 · 서버에 원본이 있는 서버 상태(목록, 사용자)와 브라우저에만 있는 클라이언트 상태(모달, 장바구니)', 'state comes in two kinds: server state whose source lives on the server (lists, users) and client state that exists only in the browser (modals, carts)'], ['TanStack Query는 서버 상태를 키로 캐시하고, 신선한 동안은 재사용하다가 오래되면 다시 가져와요', 'TanStack Query caches server state by key, reusing it while fresh and refetching once stale'], ['클라이언트 상태는 Zustand 같은 작은 저장소로 관리해요 · Context보다 렌더 범위를 좁게 조절할 수 있어요', 'client state fits a small store such as Zustand, which controls re-render scope more finely than Context'], ['컴포넌트는 필요한 조각만 선택해 구독해요 · 서버 데이터를 전역 저장소에 복사하면 두 곳이 어긋나요', 'components subscribe to just the slice they need; copying server data into a global store makes two sources drift apart']],
    fin: [['상태 관리: 서버 상태는 캐시 도구(TanStack Query·SWR), 클라이언트 상태는 useState·Context·Zustand로 나눠요', 'state management splits server state (TanStack Query, SWR) from client state (useState, Context, Zustand)', 'rcx-xs rcx-a'], ['URL에 둘 수 있는 상태(필터, 페이지)는 URL에 두는 것도 좋은 선택이에요', 'state that fits in the URL, such as filters and pages, often belongs there'], ['Redux Toolkit은 큰 팀과 복잡한 흐름에 여전히 쓰여요', 'Redux Toolkit still serves large teams and complex flows']],
    caps: [['두 종류의 상태', 'Two kinds of state'], ['서버 상태 캐시', 'Caching server state'], ['클라이언트 저장소', 'A client store'], ['선택적 구독', 'Selective subscriptions'], ['서버 상태와 클라이언트 상태', 'Server state and client state']]
  });
}

function sSuspense() {
  return CW('react-suspense', {
    code: ['const Chart = lazy(() => import("./Chart"));', '<Suspense fallback={<Spinner />}>', '  <Chart />', '</Suspense>', '<Suspense fallback={<Skeleton />}>', ['  <Comments postId={id} />  // 데이터 대기', '  <Comments postId={id} />  // awaits data'], '</Suspense>'],
    hl: [[0, 1], [1, 3, 'ok'], [4, 3, 'ok'], null],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 12.0, 8.4, 'var(--ui)', 0, { css: 'border:.1em solid var(--line)', r: .5 });
      nd(S, 'hd', X + .4, 1.2, 11.2, 'Header', 'accent', 0, { h: 1.1 });
      chip(S, 'bm', X + .4, 9.6, 5.2, 'main.js', 'line', 1, { h: 1.0 }); chip(S, 'bc', X + 6.0, 9.6, 5.6, ['Chart.js (나중에)', 'Chart.js (later)'], 'warn', 1, { h: 1.0 });
      sw(S, 'sp', X + .4, 2.8, 11.2, 3.0, tint('line', 14), 2, { off: 3, r: .3 }); cl(S, 'spl', X + .4, 3.9, 11.2, ['⏳ Spinner', '⏳ Spinner'], '', 2, { off: 3 });
      nd(S, 'ch', X + .4, 2.8, 11.2, 'Chart', 'ok', 3, { h: 3.0 });
      sw(S, 'sk', X + .4, 6.2, 11.2, 2.6, tint('line', 14), 3, { off: 4, r: .3 }); cl(S, 'skl', X + .4, 7.1, 11.2, 'Skeleton', 'm', 3, { off: 4 });
      nd(S, 'cm', X + .4, 6.2, 11.2, 'Comments', 'ok', 4, { h: 2.6 });
      lbl(S, 'n1', X, 11.0, ['lazy: 처음 필요할 때 따로 내려받아요', 'lazy downloads the code on first use'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 11.0, ['준비될 때까지 fallback을 보여줘요', 'the fallback shows until it is ready'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 11.0, ['경계마다 따로 준비되며 나타나요', 'each boundary reveals itself when ready'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 11.0, ['로딩 상태를 컴포넌트 밖에서 선언적으로', 'loading states, declared outside the component'], 'a', 4, { w: 12 });
    },
    notes: [['lazy(() => import("./Chart"))는 Chart 코드를 별도 파일로 나눠, 처음 필요할 때 내려받아요(코드 스플리팅)', 'lazy(() => import("./Chart")) splits Chart into its own file, downloaded on first use: code splitting'], ['Suspense로 감싸면 코드나 데이터가 준비되는 동안 fallback(스피너)을 대신 보여줘요', 'wrapping it in Suspense shows the fallback, such as a spinner, while code or data is loading'], ['준비가 끝나면 그 경계 안만 실제 내용으로 바뀌어요 · 헤더는 처음부터 그대로예요', 'when ready, only that boundary swaps in the real content, while the header stays put'], ['데이터를 기다리는 컴포넌트도 Suspense로 로딩 상태를 바깥에서 선언적으로 처리해요', 'components waiting on data use Suspense too, declaring loading states from the outside']],
    fin: [['Suspense: 아직 준비되지 않은 부분 대신 fallback을 보여주는 경계 · 코드 분할과 데이터 로딩에 함께 써요', 'Suspense is a boundary that shows a fallback for parts not yet ready, for both code splitting and data loading', 'rcx-xs rcx-a'], ['경계를 여러 개 두면 준비된 순서대로 화면이 채워져요', 'multiple boundaries fill the screen in the order things become ready'], ['서버 렌더링에서는 HTML을 경계 단위로 흘려보내요(스트리밍)', 'in server rendering, HTML streams boundary by boundary']],
    caps: [['lazy로 코드 나누기', 'Splitting code with lazy'], ['fallback', 'The fallback'], ['경계별로 나타나기', 'Revealing per boundary'], ['선언적인 로딩', 'Declarative loading'], ['Suspense와 lazy', 'Suspense and lazy']]
  });
}

function sErrorBoundary() {
  return CW('react-errorboundary', {
    code: [['<ErrorBoundary fallback={<p>오류가 났어요</p>}>', '<ErrorBoundary fallback={<p>Oops</p>}>'], '  <Comments />', '</ErrorBoundary>', ['// 클래스 컴포넌트로만 만들 수 있어요', '// only class components can be boundaries'], 'static getDerivedStateFromError() {', '  return { hasError: true };', '}', ['// 이벤트 핸들러·비동기 오류는 못 잡아요', '// cannot catch handler or async errors']],
    hl: [null, [0, 3, 'ok'], [3, 4], [7, 1, 'warn']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'pg', X, .8, 12.0, 8.0, 'var(--ui)', 0, { css: 'border:.1em solid var(--line)', r: .5 });
      nd(S, 'hd', X + .4, 1.2, 11.2, 'Header', 'accent', 0, { off: 1 }); nd(S, 'ar', X + .4, 2.8, 11.2, 'Article', 'line', 0, { off: 1, h: 2.6 }); nd(S, 'cm', X + .4, 5.8, 11.2, 'Comments', 'line', 0, { off: 1, h: 2.6 });
      cl(S, 'wh', X, 4.2, 12.0, ['💥 Comments 오류 → 화면 전체가 하얘짐', '💥 an error in Comments blanks the whole page'], 'r', 1, { off: 2 });
      nd(S, 'hd2', X + .4, 1.2, 11.2, 'Header', 'accent', 2); nd(S, 'ar2', X + .4, 2.8, 11.2, 'Article', 'line', 2, { h: 2.6 }); nd(S, 'fb', X + .4, 5.8, 11.2, ['⚠ 오류가 났어요 · 다시 시도', '⚠ Oops · try again'], 'danger', 2, { h: 2.6 });
      lbl(S, 'n2', X, 9.4, ['경계 안쪽만 대체 화면으로 바뀌어요', 'only the inside of the boundary is replaced'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 9.4, ['렌더 중 오류를 잡아 상태로 바꿔요', 'it turns render errors into state'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 9.4, ['클릭·fetch 오류는 try/catch로 따로', 'handle click and fetch errors with try/catch'], 'w', 4, { w: 12 });
    },
    notes: [['렌더 중에 오류가 나면 React는 트리 전체를 내려서 화면이 하얗게 비어 버려요', 'an error during rendering unmounts the whole tree, leaving a blank page'], ['Error Boundary로 감싼 부분에서 오류가 나면, 그 경계 안만 대체 화면(fallback)으로 바뀌고 나머지는 살아남아요', 'inside an error boundary, only that region is replaced by its fallback while the rest of the page survives'], ['경계는 getDerivedStateFromError로 오류를 상태로 바꿔요 · 지금도 클래스로만 만들 수 있어 react-error-boundary를 많이 써요', 'a boundary turns the error into state with getDerivedStateFromError; it still requires a class, so the react-error-boundary package is common'], ['이벤트 핸들러나 비동기 코드의 오류는 렌더 밖이라 잡지 못해요 · try/catch로 처리해요', 'errors in event handlers and async code happen outside render and are not caught, so handle them with try/catch']],
    fin: [['Error Boundary: 자식 트리의 렌더 오류를 잡아 대체 UI를 보여주는 경계', 'an error boundary catches rendering errors in its subtree and shows a fallback UI', 'rcx-xs rcx-a'], ['위젯, 섹션 단위로 여러 개 두면 장애 범위가 작아져요', 'placing several around widgets or sections keeps failures contained'], ['componentDidCatch에서 Sentry 같은 도구로 오류를 보고해요', 'report errors to tools such as Sentry from componentDidCatch']],
    caps: [['하얗게 비는 화면', 'A blank page'], ['경계로 감싸기', 'Wrapping in a boundary'], ['오류를 상태로', 'Errors into state'], ['잡지 못하는 오류', 'Errors it cannot catch'], ['Error Boundary', 'Error boundaries']]
  });
}

function sPortal() {
  return CW('react-portal', {
    code: ['function Modal({ children }) {', '  return createPortal(', '    <div className="modal">{children}</div>,', '    document.body', '  );', '}', ['// DOM은 body 아래, 이벤트·Context는', '// DOM sits under body; events and context'], ['// React 트리를 그대로 따라가요', '// still follow the React tree']],
    hl: [null, [1, 4, 'ok'], [6, 2], null],
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'rt', X, .6, ['React 트리', 'React tree'], 'a', 0); lbl(S, 'dt', X + 6.4, .6, ['실제 DOM', 'real DOM'], 'w', 0);
      [['App', 0, 1.6], ['Card', .8, 3.2], ['Modal', 1.6, 4.8]].forEach(([t, dx, y], i) => { nd(S, 'r' + i, X + dx, y, 4.2, t, i === 2 ? 'ok' : 'line', 0); if (i) ed(S, 're' + i, [X + dx + 1.3, y - .5], [X + dx + 1.3, y], 0); });
      [['body', 0, 1.6], ['div#root', .8, 3.2], ['div.card', 1.6, 4.8]].forEach(([t, dx, y], i) => { nd(S, 'd' + i, X + 6.4 + dx, y, 4.0, t, 'line', 0); if (i) ed(S, 'de' + i, [X + 6.4 + dx + 1.3, y - .5], [X + 6.4 + dx + 1.3, y], 0); });
      sw(S, 'clip', X + 7.8, 4.6, 4.4, 1.5, 'transparent', 1, { off: 2, css: 'border:.1em dashed var(--danger)' }); lbl(S, 'n1', X, 7.0, ['카드 안에 그리면 overflow·z-index에 갇혀요', 'inside the card it is trapped by overflow and z-index'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'dm', X + 7.2, 3.2 - .1, 4.6, 'div.modal', 'ok', 2, { h: 1.0 }); ed(S, 'dme', [X + 6.4 + 1.3, 2.7], [X + 7.6, 3.1], 2);
      ar(S, 'pa', [X + 5.9, 5.3], [X + 7.1, 3.7], 'ok', 2, { h: .1, dash: 1 }); lbl(S, 'n2', X, 7.0, ['포털: DOM은 body 바로 아래로 옮겨요', 'a portal moves the DOM straight under body'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 7.0, ['클릭 이벤트는 React 트리를 따라 Card로 버블링', 'clicks still bubble to Card through the React tree'], 'a', 3, { w: 12 });
    },
    notes: [['모달을 카드 안에서 그리면, 부모의 overflow: hidden이나 쌓임 맥락에 잘리거나 가려지기 쉬워요', 'rendering a modal inside a card risks being clipped by overflow: hidden or buried by the parent’s stacking context'], ['createPortal(내용, document.body)은 DOM 노드를 body 바로 아래에 만들어요', 'createPortal(content, document.body) creates the DOM nodes directly under body'], ['그래도 React 트리에서는 Card의 자식이라, 이벤트 버블링과 Context는 원래 위치를 따라가요', 'yet in the React tree it is still Card’s child, so event bubbling and context follow its original position'], ['모달, 툴팁, 드롭다운, 토스트처럼 화면 위에 떠야 하는 UI에 써요', 'use it for UI that floats above the page: modals, tooltips, dropdowns and toasts']],
    fin: [['포털: 컴포넌트의 논리적 위치는 그대로 두고, DOM만 다른 곳에 렌더하는 기능', 'a portal renders DOM elsewhere while the component keeps its logical place', 'rcx-xs rcx-a'], ['요즘은 <dialog>와 popover 속성으로 최상위 레이어를 쓰는 방법도 있어요', 'native <dialog> and the popover attribute now offer the top layer too'], ['포커스 가두기와 Esc 닫기 같은 접근성 처리를 잊지 마세요', 'remember accessibility: focus trapping and closing on Esc']],
    caps: [['갇히는 모달', 'A trapped modal'], ['createPortal', 'createPortal'], ['이벤트와 Context', 'Events and context'], ['쓰임새', 'Where portals help'], ['포털', 'Portals']]
  });
}

function sConcurrent() {
  return CW('react-concurrent', {
    code: ['const [pending, start] = useTransition();', 'function onTab(next) {', ['  start(() => setTab(next));  // 급하지 않음', '  start(() => setTab(next));  // not urgent'], '}', 'const [q, setQ] = useState("");', 'const dq = useDeferredValue(q);', ['<input value={q} onChange={…} />  // 즉시', '<input value={q} onChange={…} />  // now'], ['<SlowList query={dq} />           // 나중에', '<SlowList query={dq} />           // later']],
    hl: [[0, 4], [2, 1, 'ok'], [4, 4], null],
    draw: (S) => {
      const X = 19.4, U = 1.0;
      lbl(S, 'h1', X, .6, ['동시성 없이', 'without concurrency'], 'r', 1, { off: 2 });
      chip(S, 'b1', X, 1.6, 9 * U, ['무거운 목록 렌더 (막힘)', 'heavy list render (blocking)'], 'danger', 1, { off: 2, h: 1.1 }); chip(S, 'k1', X + 9.2, 1.6, 2.8, ['입력 ⏳', 'typing ⏳'], 'warn', 1, { off: 2, h: 1.1 });
      lbl(S, 'n1', X, 3.2, ['렌더가 끝날 때까지 키 입력이 멈춰요', 'keystrokes freeze until rendering finishes'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'h2', X, .6, ['startTransition', 'startTransition'], 'g', 2);
      ['k', 'ki', 'kim'].forEach((t, i) => chip(S, 'k2' + i, X + i * 4.1, 1.6, 1.4, t, 'accent', 2, { h: 1.1 }));
      [0, 1, 2].forEach(i => chip(S, 'l2' + i, X + 1.5 + i * 4.1, 1.6, 2.4, i < 2 ? '…✂' : 'list', i < 2 ? 'line' : 'ok', 2, { h: 1.1 }));
      lbl(S, 'n2', X, 3.2, ['급한 입력이 먼저, 목록 렌더는 중단·재시작', 'urgent typing first; list renders pause and restart'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 3.2, ['useDeferredValue: 값의 “늦은 버전”을 만들어요', 'useDeferredValue makes a lagging copy of a value'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 3.2, ['pending으로 “준비 중” 표시도 가능', 'pending can drive a “loading” hint'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 4.3, ['네트워크가 아니라 렌더 비용을 다루는 도구', 'a tool for render cost, not network latency'], 'w', 4, { w: 12 });
    },
    notes: [['무거운 목록을 렌더하는 동안에는 메인 스레드가 막혀 입력창에 글자가 늦게 찍혀요', 'while a heavy list renders, the main thread is blocked and typed characters lag'], ['startTransition으로 감싼 상태 변경은 “급하지 않음”으로 표시돼요 · 급한 입력이 오면 그 렌더를 멈추고 다시 시작해요', 'state updates inside startTransition are marked non-urgent, so React pauses and restarts that render when urgent input arrives'], ['useDeferredValue(q)는 q의 늦은 버전을 만들어, 입력창은 즉시, 느린 목록은 여유 있을 때 갱신해요', 'useDeferredValue(q) makes a lagging copy, so the input updates instantly and the slow list when there is time'], ['isPending으로 준비 중 표시를 할 수 있어요 · 이 도구들은 렌더 비용 문제용이에요', 'isPending can show a pending hint; these tools address rendering cost, not network delay']],
    fin: [['동시성 렌더링: 렌더를 중단·재개할 수 있게 해서 급한 업데이트를 먼저 처리하는 React 18+의 기능', 'concurrent rendering lets React interrupt and resume renders so urgent updates go first, since React 18', 'rcx-xs rcx-a'], ['트랜지션 안의 업데이트는 Suspense fallback을 다시 띄우지 않고 이전 화면을 유지해요', 'updates in a transition keep the previous screen instead of re-showing Suspense fallbacks'], ['정말 느린 목록은 가상화(react-window)도 함께 고려해요', 'for truly huge lists, also consider virtualization such as react-window']],
    caps: [['막히는 입력', 'Blocked input'], ['startTransition', 'startTransition'], ['useDeferredValue', 'useDeferredValue'], ['pending과 한계', 'pending and limits'], ['useTransition과 동시성', 'useTransition and concurrency']]
  });
}
/* ===== React · 5. modern React ===== */
function sFiber() {
  return CW('react-fiber', {
    code: [['// 1. 렌더 단계: 컴포넌트 함수 호출', '// 1. render phase: call components'], ['//    새 트리 계산 · 중단·재시작 가능', '//    compute a tree; may pause or restart'], ['// 2. 커밋 단계: DOM에 한 번에 반영', '// 2. commit phase: apply DOM at once'], ['// 3. useLayoutEffect → 페인트', '// 3. useLayoutEffect → paint'], '//    → useEffect', 'function Item() {', ['  console.log("render"); // 여러 번 가능', '  console.log("render"); // may repeat'], '  return <li />;', '}'],
    hl: [[0, 2], [2, 1, 'ok'], [3, 2], [5, 4, 'warn']],
    draw: (S) => {
      const X = 19.4, P = ['trigger', 'render', 'commit', 'paint', 'effects'];
      P.forEach((t, i) => { nd(S, 'p' + i, X, .8 + i * 1.4, 3.6, t, 'line', 0, { h: 1.0 }); if (i) ar(S, 'pa' + i, [X + 1.8, .8 + i * 1.4 - .38], [X + 1.8, .8 + i * 1.4 - .02], 'ink-3', 0, { h: .08 }); });
      tsets(S, 'p1', [[1, 'accent', 45], [2, 'line', 14]]); tsets(S, 'p2', [[2, 'ok', 45], [3, 'line', 14]]); tsets(S, 'p3', [[3, 'line', 40], [4, 'line', 14]]); tsets(S, 'p4', [[3, 'warn', 45], [4, 'line', 14]]); tsets(S, 'p1', [[4, 'danger', 40]]);
      [0, 1, 2, 3].forEach(i => chip(S, 'u' + i, X + 4.4 + i * 1.9, 2.2, 1.7, ['App', 'List', 'Item', 'Item'][i], 'accent', 1, { off: 2, h: 1.0, pct: i < 2 ? 40 : 14 }));
      lbl(S, 'n1', X, 8.0, ['작은 단위(fiber)로 나눠 일하다 급한 일이 오면 양보', 'work in small fiber units, yielding to urgent work'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 8.0, ['계산된 변경을 한 번에 DOM에 반영 · 중단 없음', 'apply all computed changes to the DOM at once, uninterrupted'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 8.0, ['layout effect는 페인트 전, effect는 페인트 후', 'layout effects run before paint, effects after'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 8.0, ['렌더는 여러 번 실행될 수 있어요 → 순수하게', 'renders may run many times, so keep them pure'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 9.1, ['부수 효과는 이벤트 핸들러나 이펙트로', 'put side effects in handlers or effects'], 'g', 4, { w: 12 });
    },
    notes: [['상태가 바뀌면 렌더 단계에서 컴포넌트 함수를 호출해 새 트리를 계산해요 · fiber라는 작은 단위로 나눠 중간에 양보할 수 있어요', 'after a state change, the render phase calls components to compute a new tree, split into small fiber units that can yield midway'], ['계산이 끝나면 커밋 단계에서 바뀐 부분을 실제 DOM에 한 번에 반영해요 · 이 단계는 끊기지 않아요', 'the commit phase then applies the changes to the real DOM in one uninterrupted pass'], ['useLayoutEffect는 브라우저가 그리기 전에, useEffect는 그린 뒤에 실행돼요', 'useLayoutEffect runs before the browser paints, and useEffect after'], ['렌더 단계는 버려지거나 다시 실행될 수 있어서, 렌더 함수는 같은 입력에 같은 결과를 내는 순수 함수여야 해요', 'because render work may be discarded or repeated, render functions must be pure: same input, same output']],
    fin: [['Fiber: 렌더 작업을 쪼개 우선순위대로 처리하는 React의 엔진 · 렌더(계산)와 커밋(반영)을 나눠요', 'Fiber is React’s engine that splits rendering into prioritized units, separating render (calculation) from commit (application)', 'rcx-xs rcx-a'], ['동시성 기능(트랜지션, Suspense)이 모두 이 구조 위에서 동작해요', 'concurrent features such as transitions and Suspense all build on it'], ['Strict Mode가 렌더를 두 번 하는 것도 순수성을 검사하기 위해서예요', 'Strict Mode double-renders to check this purity']],
    caps: [['렌더 단계', 'The render phase'], ['커밋 단계', 'The commit phase'], ['이펙트 시점', 'Effect timing'], ['순수한 렌더', 'Pure rendering'], ['Fiber와 렌더·커밋', 'Fiber, render and commit']]
  });
}

function sRsc() {
  return CW('react-rsc', {
    code: [['// page.tsx · 서버 컴포넌트(기본)', '// page.tsx · a server component (default)'], 'export default async function Page() {', '  const posts = await db.post.findMany();', '  return <List posts={posts} />;', '}', '// LikeButton.tsx', '"use client";', 'export function LikeButton() {', '  const [n, setN] = useState(0); …', '}'],
    hl: [[1, 4, 'ok'], [5, 5, 'warn'], null, null],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'sv', X, .8, 5.8, 6.4, 'ok', 0, { w: .1 }); lbl(S, 'svl', X + .3, .9, ['서버', 'server'], 'g', 0);
      frame(S, 'cl', X + 6.2, .8, 5.8, 6.4, 'warn', 0, { w: .1 }); lbl(S, 'cll', X + 6.5, .9, ['브라우저', 'browser'], 'w', 0);
      nd(S, 'db', X + .4, 2.0, 5.0, ['DB · 파일', 'DB · files'], 'line', 1); nd(S, 'pg', X + .4, 3.6, 5.0, 'Page · List', 'ok', 1);
      lbl(S, 'n1', X, 7.8, ['서버에서 바로 DB를 읽고 HTML을 만들어요', 'reads the DB directly and renders on the server'], 'g', 1, { off: 2, w: 12 }); lbl(S, 'n1b', X, 8.9, ['이 코드는 브라우저로 가지 않아요(JS 0KB)', 'none of this code ships to the browser (0 KB JS)'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'lb', X + 6.6, 3.6, 5.0, 'LikeButton', 'warn', 2); ar(S, 'sh', [X + 5.5, 4.2], [X + 6.5, 4.2], 'ink-3', 2, { h: .1 });
      lbl(S, 'n2', X, 7.8, ['"use client": 상호작용이 필요한 부분만', '"use client" only where interaction is needed'], 'w', 2, { off: 3, w: 12 }); lbl(S, 'n2b', X, 8.9, ['이 컴포넌트 JS만 내려받아 하이드레이션', 'only this component’s JS downloads and hydrates'], '', 2, { off: 3, w: 12 });
      chip(S, 'pl', X + .4, 5.4, 11.2, ['RSC 페이로드: 렌더 결과 + 클라이언트 자리 표시', 'RSC payload: rendered output + client slots'], 'accent', 3, { h: 1.1 });
      lbl(S, 'n3', X, 7.8, ['서버 → 클라이언트로 props는 직렬화 가능한 값만', 'only serializable props cross to the client'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 7.8, ['서버 컴포넌트엔 useState·onClick 없음', 'server components have no useState or onClick'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 8.9, ['클라이언트 안에 서버 컴포넌트는 children으로', 'pass server components into clients as children'], 'g', 4, { w: 12 });
    },
    notes: [['서버 컴포넌트는 서버에서만 실행돼요 · async로 DB를 바로 읽고, 그 코드와 라이브러리는 브라우저로 보내지 않아요', 'server components run only on the server: they can await the database directly, and their code and libraries never ship to the browser'], ['클릭 같은 상호작용이 필요한 컴포넌트만 "use client"로 표시해 브라우저에서 실행해요', 'only components needing interaction, such as clicks, are marked "use client" and run in the browser'], ['서버는 렌더 결과를 RSC 페이로드로 보내고, 클라이언트 컴포넌트 자리에 그 JS를 끼워 넣어요', 'the server sends its output as an RSC payload, with slots where client components and their JS plug in'], ['서버 컴포넌트에는 상태와 이벤트가 없고, 서버에서 클라이언트로 넘기는 props는 직렬화할 수 있어야 해요', 'server components have no state or events, and props passed to client components must be serializable']],
    fin: [['React 서버 컴포넌트: 서버에서만 렌더되는 컴포넌트 · 데이터 접근은 가깝게, 보내는 JS는 적게', 'React Server Components render only on the server, keeping data access close and shipped JavaScript small', 'rcx-xs rcx-a'], ['Next.js App Router가 대표적인 구현이에요', 'the Next.js App Router is the best-known implementation'], ['"use server"는 서버 함수(Server Functions)를 표시하는 다른 지시어예요', '"use server" is a different directive that marks server functions']],
    caps: [['서버에서 실행', 'Running on the server'], ['"use client" 경계', 'The "use client" boundary'], ['RSC 페이로드', 'The RSC payload'], ['규칙', 'The rules'], ['서버 컴포넌트', 'Server Components']]
  });
}

function sActions() {
  return CW('react-actions', {
    code: ['function Form() {', '  const [state, action, pending] =', '    useActionState(save, null);', '  return (', '    <form action={action}>', '      <input name="title" />', ['      <button disabled={pending}>저장</button>', '      <button disabled={pending}>Save</button>'], '    </form>', '  );', '}', 'const [opt, addOpt] = useOptimistic(todos, …);'],
    hl: [[4, 4], [1, 2, 'ok'], [1, 2], [10, 1, 'warn']],
    side: [
      [[['form action에 함수를 넘겨요', 'pass a function to the form action'], 'a'], [['제출되면 FormData로 호출', 'it is called with FormData on submit'], ''], [['preventDefault·useState 불필요', 'no preventDefault or useState needed'], 'g']],
      [[['pending: 진행 중 자동 추적', 'pending is tracked automatically'], 'g'], [['버튼을 잠가 중복 제출 방지', 'disable the button against double submits'], '']],
      [[['save의 반환값이 state로', 'save’s return value becomes state'], 'a'], [['오류 메시지·결과 표시', 'show errors or results'], '']],
      [[['낙관적 업데이트', 'optimistic updates'], 'w'], [['성공할 것처럼 먼저 보여주고', 'show success first'], ''], [['실패하면 자동으로 되돌려요', 'roll back automatically on failure'], 'g']]
    ],
    notes: [['React 19의 Actions: <form action={함수}>에 함수를 넘기면 제출 때 FormData로 호출돼요', 'React 19 Actions: passing a function to <form action> calls it with FormData on submit'], ['useActionState는 진행 중 여부(pending)를 자동으로 알려 줘서 버튼을 잠그기 쉬워요', 'useActionState reports pending automatically, making it easy to disable the button'], ['액션 함수의 반환값이 다음 state가 되어 오류 메시지나 결과를 그대로 그려요', 'the action’s return value becomes the next state, ready to render errors or results'], ['useOptimistic은 서버 응답 전에 성공한 것처럼 먼저 보여주고, 실패하면 원래대로 돌려요', 'useOptimistic shows the expected result before the server responds and reverts on failure']],
    fin: [['Actions: 비동기 작업의 pending·오류·결과·낙관적 상태를 React가 관리하게 하는 React 19의 기능', 'Actions let React manage the pending, error, result and optimistic states of async work, new in React 19', 'rcx-xs rcx-a'], ['서버 함수("use server")를 action에 바로 넘기면 JS 없이도 폼이 동작해요', 'passing a server function ("use server") straight to action makes forms work even before JS loads'], ['useFormStatus로 폼 안의 자식 컴포넌트도 pending을 읽어요', 'useFormStatus lets child components inside the form read pending']],
    caps: [['form action', 'form action'], ['pending', 'pending'], ['결과를 상태로', 'Results as state'], ['useOptimistic', 'useOptimistic'], ['Actions와 useActionState', 'Actions and useActionState']]
  });
}

function sUse() {
  return CW('react-use', {
    code: ['function Comments({ promise }) {', ['  const list = use(promise);  // 기다리는 동안', '  const list = use(promise);  // while waiting'], ['  return <List items={list} />; // Suspense', '  return <List items={list} />; // Suspense'], '}', 'if (show) {', ['  const t = use(ThemeContext); // 조건 안 OK', '  const t = use(ThemeContext); // fine in if'], '}', '<Suspense fallback={<Spinner />}>', '  <Comments promise={commentsPromise} />', '</Suspense>'],
    hl: [[1, 1, 'ok'], [7, 3], [4, 3, 'warn'], null],
    side: [
      [[['use(promise): 결과를 꺼내요', 'use(promise) unwraps the result'], 'a'], [['아직이면 컴포넌트가 “일시 정지”', 'not ready: the component suspends'], '']],
      [[['가장 가까운 Suspense가 fallback', 'the nearest Suspense shows a fallback'], 'g'], [['오류는 Error Boundary로', 'errors go to an error boundary'], '']],
      [[['다른 훅과 달리', 'unlike other hooks,'], 'w'], [['if·반복문 안에서도 호출 가능', 'callable inside if and loops'], 'g']],
      [[['Promise는 렌더 중에 만들지 말고', 'do not create the promise in render;'], 'r'], [['서버 컴포넌트에서 만들어 전달', 'create it in a server component'], 'g']]
    ],
    notes: [['use(promise)는 Promise의 결과를 꺼내요 · 아직 끝나지 않았으면 컴포넌트가 일시 정지돼요', 'use(promise) reads a promise’s result, suspending the component if it is still pending'], ['정지된 동안은 가장 가까운 Suspense의 fallback이 보이고, 실패하면 Error Boundary가 받아요', 'while suspended, the nearest Suspense shows its fallback, and failures go to an error boundary'], ['use는 다른 훅과 달리 조건문 안에서도 부를 수 있고, Context를 읽는 데도 써요', 'unlike other hooks, use may be called inside conditions, and it can read context too'], ['렌더할 때마다 새 Promise를 만들면 끝없이 정지해요 · 서버 컴포넌트나 캐시에서 만든 Promise를 넘겨요', 'creating a new promise every render suspends forever, so pass promises created in server components or caches']],
    fin: [['use(): 렌더 중에 Promise나 Context 같은 리소스를 읽는 React 19의 API', 'use() is the React 19 API for reading resources such as promises and context during render', 'rcx-xs rcx-a'], ['서버 컴포넌트에서 await 없이 Promise를 넘기면 클라이언트에서 스트리밍으로 받아요', 'passing an un-awaited promise from a server component streams the data to the client'], ['try/catch 안에서는 쓸 수 없어요', 'it cannot be used inside try/catch']],
    caps: [['use(promise)', 'use(promise)'], ['Suspense와 함께', 'With Suspense'], ['조건 안에서 호출', 'Calling inside conditions'], ['Promise는 어디서', 'Where promises come from'], ['use()', 'use()']]
  });
}

function sCompiler() {
  return CW('react-compiler', {
    code: [['// 직접 쓴 코드', '// what you write'], 'function List({ items, q }) {', '  const shown = items.filter(f => f.has(q));', '  return <Rows rows={shown} />;', '}', ['// 컴파일러가 자동으로 메모이제이션', '// the compiler memoizes automatically'], ['//   shown: items·q가 같으면 재사용', '//   shown: reused while items and q match'], ['//   <Rows>: rows가 같으면 건너뜀', '//   <Rows>: skipped while rows match'], ['// 규칙: 렌더 중 변경 금지, 훅 규칙', '// rules: no mutation in render, hook rules']],
    hl: [[1, 4], [5, 3, 'ok'], null, [8, 1, 'warn']],
    side: [
      [[['평범한 코드, 메모 없음', 'plain code, no memoization'], 'a'], [['items·q와 무관한 렌더에도', 'even renders unrelated to items or q'], ''], [['filter와 Rows가 매번 다시', 'rerun filter and Rows'], 'w']],
      [[['빌드 때 의존성을 분석해', 'analyzes dependencies at build time'], 'a'], [['useMemo·memo를 알아서 삽입', 'and inserts useMemo and memo'], 'g']],
      [[['손으로 쓴 의존성 배열 실수 ↓', 'fewer hand-written dependency bugs'], 'g'], [['코드는 더 단순하게', 'simpler code'], '']],
      [[['React 규칙을 지킨 코드만 최적화', 'only rule-following code is optimized'], 'w'], [['ESLint 플러그인이 위반을 알려요', 'its ESLint plugin flags violations'], '']]
    ],
    notes: [['메모이제이션 없이 쓴 컴포넌트는 관련 없는 렌더에도 계산과 자식 렌더를 반복해요', 'a component written without memoization repeats its calculations and child renders even on unrelated renders'], ['React Compiler는 빌드 단계에서 값의 의존 관계를 분석해 필요한 곳에 메모이제이션을 자동으로 넣어요', 'React Compiler analyzes dependencies at build time and inserts memoization where it helps'], ['덕분에 useMemo·useCallback·memo를 손으로 쓰고 의존성 배열을 관리할 일이 크게 줄어요', 'hand-written useMemo, useCallback, memo and dependency arrays become largely unnecessary'], ['렌더 중 값을 바꾸지 않는 등 React 규칙을 지킨 코드만 최적화해요 · 규칙을 어긴 컴포넌트는 건너뛰어요', 'only code that follows React’s rules, such as no mutation during render, is optimized; violating components are skipped']],
    fin: [['React Compiler: 빌드 때 자동으로 메모이제이션을 넣어 주는 컴파일러 · 수동 최적화 부담을 줄여요', 'React Compiler adds memoization automatically at build time, reducing manual optimization', 'rcx-xs rcx-a'], ['Babel·Vite·Next.js 플러그인으로 켜고, 점진적으로 적용할 수 있어요', 'enable it via Babel, Vite or Next.js plugins, and adopt it incrementally'], ['순수한 컴포넌트를 쓰는 습관이 곧 컴파일러 친화적인 코드예요', 'writing pure components is what makes code compiler-friendly']],
    caps: [['메모 없는 코드', 'Code without memoization'], ['자동 메모이제이션', 'Automatic memoization'], ['더 단순한 코드', 'Simpler code'], ['React의 규칙', 'The rules of React'], ['React Compiler', 'React Compiler']]
  });
}

function sTesting() {
  return CW('react-testing', {
    code: ['render(<Login />);', 'await user.type(', ['  screen.getByLabelText("이메일"), "a@b.c");', '  screen.getByLabelText("Email"), "a@b.c");'], 'await user.click(', ['  screen.getByRole("button",{name:"로그인"}));', '  screen.getByRole("button",{name:"Log in"}));'], 'expect(await screen.findByRole("alert"))', ['  .toHaveTextContent("비밀번호");', '  .toHaveTextContent("password");'], ['// 네트워크는 MSW로 가짜 응답', '// mock the network with MSW']],
    hl: [[0, 1], [1, 4, 'ok'], [5, 2, 'ok'], [7, 1]],
    side: [
      [[['컴포넌트를 가짜 DOM에 그려요', 'render into a test DOM'], 'a'], [['jsdom + Vitest/Jest', 'jsdom with Vitest or Jest'], '']],
      [[['사용자처럼 찾고 행동해요', 'find and act like a user'], 'g'], [['라벨·역할·텍스트로 찾기', 'query by label, role and text'], ''], [['클래스·내부 상태로 찾지 않기', 'not by classes or internal state'], 'r']],
      [[['보이는 결과를 확인', 'assert on visible outcomes'], 'g'], [['find…는 나타날 때까지 기다려요', 'find… waits until it appears'], '']],
      [[['API는 MSW로 가로채기', 'intercept APIs with MSW'], 'a'], [['구현이 바뀌어도 테스트는 그대로', 'tests survive refactors'], 'g']]
    ],
    notes: [['React Testing Library는 컴포넌트를 jsdom 같은 가짜 DOM에 그려 테스트해요', 'React Testing Library renders components into a simulated DOM such as jsdom'], ['사용자처럼 라벨, 역할(role), 보이는 텍스트로 요소를 찾고 입력·클릭해요 · 클래스나 내부 상태로 찾지 않아요', 'find elements the way users do, by label, role and visible text, then type and click; never by classes or internal state'], ['결과도 화면에 보이는 것으로 확인해요 · findBy는 비동기로 나타날 때까지 기다려요', 'assert on what appears on screen; findBy waits for async content'], ['네트워크는 MSW로 가짜 응답을 주면, 구현을 바꿔도 테스트가 깨지지 않는 견고한 테스트가 돼요', 'mocking the network with MSW yields robust tests that survive implementation changes']],
    fin: [['컴포넌트 테스트: 구현 세부가 아니라 사용자가 보고 하는 행동을 기준으로 검증해요', 'component tests verify what users see and do, not implementation details', 'rcx-xs rcx-a'], ['getByRole은 접근성 트리를 쓰므로 접근성 점검 효과도 있어요', 'getByRole uses the accessibility tree, doubling as an accessibility check'], ['전체 흐름은 Playwright 같은 E2E 테스트로 보완해요', 'complement them with end-to-end tests such as Playwright']],
    caps: [['렌더', 'Rendering'], ['사용자처럼 행동', 'Acting like a user'], ['보이는 결과 확인', 'Asserting visible results'], ['네트워크 가짜 응답', 'Mocking the network'], ['컴포넌트 테스트', 'Testing components']]
  });
}
return { css: CSSX, secs: [
  sec('react-ui', 'JSX와 컴포넌트', 'JSX & components', 'JSX와 컴포넌트', 'JSX and components', 'UI를 작은 함수로 나누고 조립하는 방법, 그리고 React가 바뀐 부분만 화면에 반영하는 원리예요.', 'Splitting UI into small functions and assembling them, and how React updates only what changed.', [
    item('react-jsx', 'JSX', 'JSX', 'HTML처럼 보이지만 실제로는 자바스크립트 함수 호출로 바뀌는 문법이에요. 결과는 “무엇을 그릴지” 적은 React 요소 객체예요.', '<h1 className="title">Hi, {name}</h1>은 빌드 때 jsx("h1", { className: "title", children: [...] }) 같은 호출로 바뀌고, { type: "h1", props: {...} } 모양의 평범한 객체를 돌려줘요. class 대신 className, onclick 대신 onClick처럼 JS 이름을 쓰고, 중괄호 안에는 삼항 연산자나 map 같은 “값이 되는 표현식”만 넣을 수 있어요. 모든 태그는 닫아야 하고 루트는 하나여야 해서 여러 요소는 <>…</>(Fragment)로 묶어요. { } 안의 문자열은 자동으로 이스케이프되어 XSS를 막아 줘요.', 'Syntax that looks like HTML but compiles to JavaScript function calls returning React element objects that describe what to draw.', 'At build time <h1 className="title">Hi, {name}</h1> becomes a call such as jsx("h1", { className: "title", children: [...] }), which returns a plain object shaped like { type: "h1", props: {...} }. It uses JavaScript names such as className instead of class and onClick instead of onclick, and braces accept only expressions that produce values, such as ternaries and map. Every tag must close and there must be one root, so siblings are wrapped in <>…</> (a Fragment). Strings inside braces are escaped automatically, preventing XSS.', sJsx()),
    item('react-component', '컴포넌트와 props', 'Components and props', '컴포넌트는 props를 받아 JSX를 돌려주는 대문자 이름의 함수예요. 데이터는 props로 부모에서 자식으로만 흘러요.', 'function Avatar({ user, size = 48 })처럼 props를 구조 분해해서 받고, 생략된 값은 기본값으로 채워요. 부모 Profile은 <Avatar user={user} size={64} />처럼 태그 속성으로 props를 넘겨요. props는 읽기 전용이라 자식이 바꿀 수 없고, 값을 바꾸려면 부모의 상태를 바꿔 새 props가 내려오게 해야 해요(단방향 데이터 흐름). 같은 props면 같은 결과를 내는 순수 함수처럼 작성하는 게 원칙이에요. 소문자 태그는 HTML 요소, 대문자 태그는 컴포넌트로 구분돼요.', 'A component is a capitalized function that takes props and returns JSX; data flows down through props, from parent to child only.', 'function Avatar({ user, size = 48 }) destructures its props, with defaults for omitted values, and the parent Profile passes props as attributes, as in <Avatar user={user} size={64} />. Props are read-only, so a child cannot change them; changes come from the parent’s state sending new props down, which is one-way data flow. Components should behave like pure functions: same props, same output. Lowercase tags are HTML elements and capitalized tags are components.', sComponent()),
    item('react-vdom', '가상 DOM과 재조정', 'The virtual DOM and reconciliation', '상태가 바뀌면 React는 새 요소 트리를 만들어 이전 트리와 비교하고, 바뀐 부분만 실제 DOM에 반영해요. 이 비교 과정을 재조정이라 해요.', '목록에 C가 추가되면 컴포넌트가 다시 실행되어 새 트리가 나오고, React는 이전 트리와 비교해 같은 자리의 같은 타입(li A, li B)은 그대로 두고 li C만 새로 만들어요. 실제 DOM 조작은 appendChild 한 번뿐이에요. 같은 자리의 요소 타입이 div에서 section으로 바뀌면 그 아래를 통째로 버리고 새로 만들어서, 안에 있던 Counter의 상태도 초기화돼요. 그래서 렌더 함수 안에서 컴포넌트를 정의하면 매번 새 타입이 되어 상태가 날아가요. 목록 항목은 key로 짝을 맞춰요.', 'When state changes, React builds a new element tree, diffs it against the previous one and applies only the differences to the real DOM; this diffing is reconciliation.', 'When C is added to a list, the component reruns and produces a new tree; React keeps li A and li B, which have the same type in the same place, and creates only li C, so the real DOM sees a single appendChild. If an element’s type in the same place changes from div to section, the whole subtree is discarded and rebuilt, resetting the state of the Counter inside. That is why defining a component inside a render function loses state: it is a new type every time. List items are matched by key.', sVdom()),
    item('react-keys', '리스트와 key', 'Lists and keys', 'map으로 목록을 그릴 때 key로 각 항목을 구별해요. 재조정 때 이전과 다음 목록의 항목을 짝짓는 이름표예요.', '{todos.map(t => <Item key={t.id} todo={t} />)}처럼 데이터의 고유 id를 key로 써요. 배열 index를 key로 쓰고 맨 앞에 항목을 추가하면, 체크 상태 같은 내부 상태가 엉뚱한 항목에 남는 버그가 생겨요. Math.random()은 렌더마다 key가 바뀌어 매번 컴포넌트를 새로 만들어 버려요. key는 형제 사이에서만 고유하면 되고 props로 전달되지 않아요. 반대로 <Form key={userId} />처럼 key를 일부러 바꾸면 사용자가 바뀔 때 폼 상태를 깨끗하게 초기화할 수 있어요.', 'When rendering lists with map, key identifies each item, pairing items between the previous and next lists during reconciliation.', 'Use the data’s unique id as the key, as in {todos.map(t => <Item key={t.id} todo={t} />)}. With array indexes as keys, prepending an item leaves internal state such as checkboxes on the wrong item. Math.random() changes the key every render, recreating the component each time. Keys only need to be unique among siblings and are not passed as props. Conversely, deliberately changing a key, as in <Form key={userId} />, cleanly resets a form when the user changes.', sKeys()),
    item('react-conditional', '조건부 렌더링', 'Conditional rendering', 'JSX도 값이라 삼항 연산자, &&, if 반환 같은 평범한 JS로 무엇을 그릴지 골라요. && 왼쪽의 숫자 0은 조심해요.', '{isLoggedIn ? <Dashboard /> : <Login />}은 둘 중 하나를, {error && <Alert />}는 오류가 있을 때만 그려요. 그런데 {count && <Badge />}에서 count가 0이면 false가 아니라 숫자 0이 화면에 찍혀요. false, null, undefined, true는 아무것도 그리지 않지만 0과 NaN은 그려지기 때문이에요. 그래서 count > 0처럼 불리언으로 만들어요. 조건이 복잡하면 if (!user) return <Spinner />처럼 일찍 반환하고, 아무것도 그리지 않을 땐 null을 돌려줘요.', 'JSX is just values, so ordinary JavaScript such as ternaries, && and early returns decides what to draw; watch out for a numeric 0 before &&.', '{isLoggedIn ? <Dashboard /> : <Login />} renders one of two options and {error && <Alert />} renders only when there is an error. But in {count && <Badge />}, a count of 0 prints the number 0 rather than nothing, because false, null, undefined and true render nothing while 0 and NaN do render. Make it boolean, as in count > 0. For complex conditions, return early, as in if (!user) return <Spinner />, and return null to render nothing.', sConditional()),
    item('react-children', 'children과 합성', 'children and composition', '여는 태그와 닫는 태그 사이의 내용은 children prop으로 전달돼요. 컴포넌트를 상속이 아니라 합성으로 조립하는 React의 기본 방식이에요.', 'function Card({ title, children })는 테두리와 제목만 책임지고, <Card title="프로필"><Avatar /><Bio /></Card>처럼 안에 무엇이 올지는 쓰는 쪽이 정해요. 자리가 여러 개면 <Layout side={<Nav />} main={<Feed />} />처럼 JSX를 props로 넘겨 슬롯처럼 써요. 데이터를 여러 층 내려보내는 대신 완성된 컴포넌트를 넘기면, 중간 컴포넌트는 그 데이터를 몰라도 돼서 prop drilling이 줄어요. Context를 꺼내기 전에 합성으로 해결되는지 먼저 살펴보는 게 좋아요.', 'Content between the opening and closing tags arrives as the children prop; composing components this way, rather than through inheritance, is React’s default approach.', 'function Card({ title, children }) handles only the frame and title, and callers decide what goes inside, as in <Card title="Profile"><Avatar /><Bio /></Card>. For several slots, pass JSX as props, as in <Layout side={<Nav />} main={<Feed />} />. Passing finished components instead of threading data through layers means middle components never need that data, which cuts prop drilling. Check whether composition solves the problem before reaching for Context.', sChildren()),
    item('react-events', '이벤트 처리', 'Handling events', 'onClick={handleClick}처럼 함수 자체를 넘기면 React가 이벤트가 일어날 때 호출해요. 괄호를 붙여 즉시 실행하는 실수를 조심해요.', 'onClick={save}는 클릭될 때 save를 부르지만, onClick={save()}는 렌더하는 순간 save를 실행하고 그 반환값(undefined)을 넘겨요. 인자가 필요하면 onClick={() => remove(id)}처럼 화살표 함수로 감싸요. 핸들러는 브라우저 이벤트를 감싼 합성 이벤트 e를 받고, 폼 제출에서는 e.preventDefault()로 새로고침을 막아요. React의 onChange는 브라우저와 달리 글자를 입력할 때마다 실행돼요. React는 루트 하나에서 이벤트를 위임받아 처리해요.', 'Passing the function itself, as in onClick={handleClick}, lets React call it when the event fires; beware of calling it immediately with parentheses.', 'onClick={save} calls save on click, but onClick={save()} runs save during render and passes its return value, undefined. To pass arguments, wrap the call in an arrow, as in onClick={() => remove(id)}. Handlers receive a synthetic event e wrapping the browser event, and form submits call e.preventDefault() to stop the page reload. Unlike the browser’s change event, React’s onChange fires on every keystroke. React handles events through a single delegated listener at the root.', sEvents()),
  ]),
  sec('react-state', '상태와 렌더링', 'State & rendering', '상태와 렌더링', 'State and rendering', '상태가 어디에 저장되고, 언제 다시 렌더되며, 어떻게 안전하게 바꾸는지예요.', 'Where state is stored, when components re-render, and how to change state safely.', [
    item('react-usestate', 'useState와 렌더링', 'useState and rendering', 'useState는 렌더 사이에 기억되는 값과 그 값을 바꾸는 함수를 줘요. set 함수를 부르면 컴포넌트가 새 값으로 다시 렌더돼요.', 'const [count, setCount] = useState(0)에서 count는 React가 컴포넌트 밖에 보관하는 값이에요. 버튼을 눌러 setCount(1)을 부르면 React가 값을 바꾸고 다시 렌더를 예약해요. 다시 렌더한다는 건 Counter 함수를 새 count로 다시 호출해 새 JSX를 얻는다는 뜻이에요. let n = 0 같은 일반 변수는 함수가 실행될 때마다 처음부터 다시 만들어져서 바꿔도 화면이 갱신되지 않아요. 훅은 컴포넌트 최상위에서 항상 같은 순서로 불러야 하고, 같은 컴포넌트를 두 번 쓰면 상태도 각자 따로 가져요.', 'useState provides a value remembered between renders and a function to change it; calling the setter re-renders the component with the new value.', 'In const [count, setCount] = useState(0), count is kept by React outside the component. Clicking a button that calls setCount(1) updates the stored value and schedules a render, which means calling Counter again with the new count to get fresh JSX. A plain variable such as let n = 0 is recreated on every call, so changing it never updates the screen. Hooks must be called at the top level in the same order, and two instances of a component each get their own state.', sUseState()),
    item('react-batching', '상태 스냅숏과 배칭', 'State snapshots and batching', '한 렌더 안의 상태는 고정된 스냅숏이에요. set은 값을 바로 바꾸지 않고 대기열에 쌓이며, 여러 번의 set은 한 번의 렌더로 모여요.', 'onClick 안에서 setCount(count + 1)을 두 번 불러도, 두 줄 모두 이번 렌더의 count(0)를 읽어서 결과는 2가 아니라 1이에요. 바로 아래의 console.log(count)도 여전히 0을 찍어요. 이전 값을 기준으로 바꾸려면 setCount(c => c + 1)처럼 갱신 함수를 넘기면 대기열에서 0 → 1 → 2로 차례로 적용돼요. 그리고 같은 이벤트 안의 여러 set은 모아서 한 번만 다시 렌더하는데, React 18부터는 setTimeout이나 Promise 안에서도 자동으로 배칭돼요.', 'State inside one render is a fixed snapshot; set does not change it immediately but queues an update, and multiple sets are batched into one render.', 'Calling setCount(count + 1) twice in a click handler reads this render’s count (0) both times, so the result is 1, not 2, and a console.log(count) right after still prints 0. To build on the previous value, pass an updater such as setCount(c => c + 1), which the queue applies in order: 0 → 1 → 2. Multiple sets in the same event are batched into one re-render, and since React 18 this also happens inside setTimeout and promises.', sBatching()),
    item('react-immutable', '불변 업데이트', 'Immutable updates', '객체·배열 상태는 직접 고치지 않고 새로 만들어 set해요. React는 Object.is로 참조가 바뀌었는지만 보고 변화를 판단해요.', 'user.age = 21로 고치고 setUser(user)를 부르면 같은 객체라서 React는 바뀐 게 없다고 보고 렌더하지 않아요. setUser({ ...user, age: 21 })처럼 전개 연산자로 새 객체를 만들면 참조가 달라져 변화를 알아채요. 배열도 추가는 [...todos, x], 삭제는 filter, 수정은 map 안에서 { ...t, done: !t.done }으로 새 배열을 만들고, push·splice·sort처럼 원본을 바꾸는 메서드는 피해요. 깊게 중첩된 구조는 Immer를 쓰면 고치듯이 써도 새 객체를 만들어 줘요. 이전 상태가 보존되어 되돌리기와 메모이제이션도 쉬워져요.', 'Object and array state is never edited in place but recreated and set; React detects changes only by whether the reference changed (Object.is).', 'Mutating user.age = 21 and calling setUser(user) passes the same object, so React sees no change and skips the render. Spreading into a new object, as in setUser({ ...user, age: 21 }), changes the reference and React notices. For arrays, add with [...todos, x], remove with filter and update with map returning { ...t, done: !t.done }, avoiding mutating methods such as push, splice and sort. For deeply nested data, Immer lets you write mutations while producing new objects. Preserved previous states also make undo and memoization easy.', sImmutable()),
    item('react-render', '렌더링이 일어나는 때', 'When components render', '컴포넌트는 자기 상태가 바뀌거나, 부모가 렌더되거나, 읽는 Context가 바뀌면 다시 렌더돼요. 렌더는 계산일 뿐 DOM 변경과는 달라요.', 'App의 q가 바뀌면 App이 다시 실행되고, 그 안의 Search, Results, Footer는 q를 쓰든 말든 모두 다시 렌더돼요. 하지만 결과가 같으면 실제 DOM은 바뀌지 않아요 · 렌더는 함수를 호출해 계산하는 일이고, DOM 변경은 커밋에서 바뀐 부분에만 일어나요. 대부분의 렌더는 충분히 빨라서 걱정할 필요가 없어요. 정말 느린 컴포넌트는 memo로 감싸 props가 같을 때 건너뛰거나, 상태를 쓰는 곳 가까이 내려 렌더 범위를 줄여요. React DevTools의 Profiler로 무엇이 왜 렌더됐는지 확인할 수 있어요.', 'A component re-renders when its state changes, its parent renders or a context it reads changes; rendering is calculation, not DOM mutation.', 'When q in App changes, App reruns and Search, Results and Footer all render again, whether or not they use q. If the output is unchanged, the real DOM is untouched: rendering is calling functions to calculate, and DOM changes happen only at commit, only where something differs. Most renders are fast enough not to worry about. For genuinely slow components, wrap them in memo to skip renders with equal props, or move state closer to where it is used to shrink the render area. The React DevTools Profiler shows what rendered and why.', sRenderCascade()),
    item('react-lifting', '상태 끌어올리기', 'Lifting state up', '여러 컴포넌트가 함께 맞춰야 하는 상태는 가장 가까운 공통 부모로 옮기고, 값은 props로 내리고 변경은 콜백으로 올려요.', '두 Panel이 각자 isOpen 상태를 가지면 서로를 몰라서 둘 다 열릴 수 있어요. active 상태를 공통 부모 Accordion으로 끌어올리면, 부모가 isActive={active === 0}처럼 값을 내려보내고, 자식은 onShow={() => setActive(0)} 같은 콜백으로 “나를 열어 주세요”라고 요청해요. 이렇게 하면 상태의 주인이 한 곳(single source of truth)이라 항상 일관돼요. 다만 너무 높이 올리면 렌더 범위가 넓어지니 필요한 만큼만 올리고, 멀리 떨어진 컴포넌트끼리는 Context나 상태 관리 도구를 고려해요.', 'State that several components must share moves to their closest common parent; values flow down as props and changes come back up through callbacks.', 'If two Panels each own an isOpen state, they cannot coordinate and both may open. Lifting active into the common parent Accordion lets the parent pass values down, as in isActive={active === 0}, while children request changes through callbacks such as onShow={() => setActive(0)}. With a single owner, a single source of truth, the UI stays consistent. Lift only as far as needed, since higher state widens re-renders, and consider Context or a state library for distant components.', sLifting()),
    item('react-controlled', '제어 컴포넌트와 폼', 'Controlled components and forms', 'value를 React 상태에 묶고 onChange로 상태를 갱신하는 입력이 제어 컴포넌트예요. 화면의 값은 언제나 상태가 정해요.', '<input value={email} onChange={e => setEmail(e.target.value)} />에서 글자를 칠 때마다 onChange → setEmail → 다시 렌더 → value 반영이 한 바퀴 돌아요. 값이 상태에 있으니 const valid = email.includes("@")처럼 검증과 버튼 활성화를 렌더 중에 바로 계산할 수 있어요. defaultValue만 준 비제어 입력은 DOM이 값을 가지고, 제출할 때 FormData로 한 번에 읽어요. 입력이 많은 큰 폼은 비제어 기반의 React Hook Form이 렌더를 줄여 주고, value만 주고 onChange를 빼먹으면 입력이 막혀요.', 'An input whose value is bound to React state and updated through onChange is a controlled component; state always decides what it shows.', 'In <input value={email} onChange={e => setEmail(e.target.value)} />, every keystroke loops through onChange, setEmail, a re-render and the new value. With the value in state, validation and button states are computed right in render, as in const valid = email.includes("@"). An uncontrolled input with only defaultValue keeps its value in the DOM, read once on submit with FormData. Large forms benefit from uncontrolled-based libraries such as React Hook Form, and value without onChange makes an input read-only.', sControlled()),
    item('react-derived', '파생 상태', 'Derived state', '다른 props나 state에서 계산할 수 있는 값은 state로 따로 두지 않고 렌더 중에 계산해요. 상태는 최소한으로 유지해요.', 'items와 별도로 count 상태를 두고 useEffect로 setCount(items.length)를 하면, 렌더 → 이펙트 → 다시 렌더로 느려지고 잠깐 틀린 값이 보이기도 해요. const count = items.length처럼 렌더 중에 그냥 계산하면 언제나 최신이고 추가 렌더도 없어요. 검색 결과처럼 걸러 낸 목록도 items.filter(...)로 계산해요. 정렬처럼 정말 비싼 계산만 useMemo로 캐시하는데, 대부분은 그냥 계산해도 충분히 빨라요. React 공식 문서의 “이펙트가 필요 없을 수도 있다”가 바로 이 이야기예요.', 'Values computable from other props or state are calculated during render rather than stored in separate state, keeping state minimal.', 'Keeping a count state beside items and syncing it in useEffect with setCount(items.length) costs render, effect and render again, and can flash a stale value. Computing const count = items.length during render is always current with no extra render. Filtered lists such as search results are computed with items.filter(...) too. Only truly expensive work such as sorting is cached with useMemo, and most calculations are fast enough as is. This is the heart of the React docs’ advice that you might not need an effect.', sDerived()),
  ]),
  sec('react-hooks', '이펙트와 훅', 'Effects & hooks', '이펙트와 훅', 'Effects and hooks', 'React 바깥과 동기화하는 이펙트, 렌더와 무관한 ref, 메모이제이션, 그리고 로직을 재사용하는 훅이에요.', 'Effects that sync with the outside world, refs, memoization, and hooks for reusing logic.', [
    item('react-useeffect', 'useEffect와 의존성 배열', 'useEffect and dependencies', 'useEffect는 화면을 그린 뒤 실행되어 React 바깥(네트워크, 구독, DOM)과 동기화해요. 의존성 배열이 언제 다시 실행할지 정해요.', '의존성 배열이 없으면 이펙트는 렌더할 때마다, [roomId]면 roomId가 이전 렌더와 달라졌을 때만, 빈 배열 []이면 처음 마운트된 뒤 한 번만 실행돼요. 실행 순서는 렌더 → 커밋 → 페인트 → 이펙트라서 화면을 막지 않아요. 이펙트 안에서 쓰는 props·state 같은 반응형 값은 모두 의존성에 넣어야 하고, eslint-plugin-react-hooks가 빠진 것을 알려 줘요. 버튼 클릭처럼 특정 이벤트 때문에 일어나는 일은 이펙트가 아니라 이벤트 핸들러에 써요.', 'useEffect runs after painting to sync with systems outside React (network, subscriptions, the DOM), and its dependency array decides when it reruns.', 'With no dependency array an effect runs after every render; with [roomId] only when roomId differs from the previous render; and with an empty [] once after mounting. The order is render, commit, paint, then effect, so effects do not block the screen. Every reactive value the effect uses, such as props and state, belongs in the dependencies, and eslint-plugin-react-hooks flags omissions. Work triggered by a specific event such as a click belongs in the event handler, not an effect.', sUseEffect()),
    item('react-cleanup', '정리 함수와 Strict Mode', 'Cleanup and Strict Mode', '이펙트가 돌려주는 함수는 정리 함수예요. 다음 실행 전과 컴포넌트가 사라질 때 호출되어, 연결·구독·타이머를 되돌려요.', 'connect(roomId)에는 return () => conn.disconnect()를 짝지어 둬요. roomId가 a에서 b로 바뀌면 React는 a 연결을 먼저 정리하고 b로 다시 연결하며, 컴포넌트가 사라질 때 마지막으로 정리해요. 개발 모드의 Strict Mode는 일부러 실행 → 정리 → 실행을 한 번 더 해서 정리를 빠뜨린 버그를 드러내요(프로덕션에서는 한 번만). setInterval, 이벤트 리스너, 웹소켓 구독은 정리하지 않으면 계속 남아 메모리 누수와 중복 실행이 돼요. 목표는 설정과 정리가 몇 번 반복돼도 문제없는 이펙트예요.', 'The function an effect returns is its cleanup, called before the next run and on unmount to undo connections, subscriptions and timers.', 'Pair connect(roomId) with return () => conn.disconnect(). When roomId changes from a to b, React cleans up a before connecting to b, and cleans up one last time on unmount. In development, Strict Mode deliberately runs setup, cleanup and setup again to expose missing cleanups; production runs it once. Intervals, event listeners and websocket subscriptions linger as leaks and duplicate work unless cleaned up. The goal is an effect that works through any number of setup and cleanup cycles.', sCleanup()),
    item('react-fetch-effect', '이펙트로 데이터 가져오기', 'Fetching data in effects', '이펙트 안에서 fetch로 데이터를 가져올 수 있지만, 경쟁 상태를 정리 함수로 막아야 하고 캐시가 없어요. 실무에서는 전용 도구를 써요.', 'useEffect 안에서 fetch(`/api/user/${id}`)를 하고 결과를 setUser로 넣어요. 그런데 id가 1에서 2로 빠르게 바뀌면, 느린 요청 1이 나중에 도착해 최신 사용자 2를 덮어쓰는 경쟁 상태가 생겨요. let ignore = false를 두고 정리 함수에서 ignore = true로 바꾸면 지나간 요청의 응답을 버릴 수 있고, AbortController로 요청 자체를 취소할 수도 있어요. 하지만 캐시, 중복 요청 제거, 재시도, 로딩 상태까지 직접 만들기는 어려워서 TanStack Query·SWR이나 프레임워크의 데이터 로딩, 서버 컴포넌트를 써요.', 'Effects can fetch data, but races must be prevented with cleanup and there is no cache, so dedicated tools are used in practice.', 'Inside useEffect, fetch(`/api/user/${id}`) and store the result with setUser. If id changes quickly from 1 to 2, the slow request 1 can arrive last and overwrite user 2, a race condition. Declaring let ignore = false and setting ignore = true in the cleanup discards stale responses, and AbortController can cancel the request itself. Building caching, deduplication, retries and loading states by hand is hard, so TanStack Query, SWR, framework data loading or server components are used instead.', sFetchEffect()),
    item('react-useref', 'useRef', 'useRef', 'useRef는 렌더와 무관하게 유지되는 { current } 상자예요. DOM 요소를 담거나, 화면에 보이지 않는 값을 보관할 때 써요.', 'const inputRef = useRef(null)을 <input ref={inputRef} />에 넘기면 inputRef.current에 DOM 요소가 담겨 focus(), 스크롤, 크기 측정 같은 명령형 작업을 할 수 있어요. 렌더가 몇 번 일어나도 같은 상자가 유지되므로 setInterval의 id나 이전 값처럼 화면과 무관한 값을 보관하기 좋아요. 다만 ref를 바꿔도 다시 렌더되지 않아서, 화면에 보여야 하는 값이라면 state를 써야 해요. 렌더 중에 ref를 읽거나 쓰는 것도 피해요. React 19부터는 ref를 일반 prop처럼 자식 컴포넌트에 넘길 수 있어 forwardRef가 필요 없어요.', 'useRef is a { current } box that persists independently of rendering, used to hold DOM elements or values that never appear on screen.', 'Passing const inputRef = useRef(null) to <input ref={inputRef} /> stores the DOM element in inputRef.current for imperative work such as focus(), scrolling and measuring. The same box survives every render, ideal for values unrelated to the screen such as an interval id or a previous value. Changing a ref never re-renders, so values that should appear on screen belong in state, and refs should not be read or written during render. Since React 19, ref can be passed to child components like any prop, without forwardRef.', sUseRef()),
    item('react-memo', 'useMemo·useCallback·memo', 'useMemo, useCallback and memo', '같은 입력이면 이전 결과를 재사용하는 메모이제이션 도구예요. useMemo는 값, useCallback은 함수, memo는 컴포넌트 렌더를 캐시해요.', 'useMemo(() => sum(...), [items])는 items가 같은 동안 계산 결과를 재사용해요. 렌더마다 새로 만들어지는 함수는 참조가 매번 달라서, memo로 감싼 자식에 넘기면 props가 바뀐 것으로 보여 memo가 무용지물이 돼요. 그래서 useCallback으로 함수 참조를 유지해요. memo는 props를 Object.is로 하나씩 비교해 같으면 렌더를 건너뛰어요. 메모이제이션도 메모리와 비교 비용이 있으니 Profiler로 측정한 뒤 느린 곳에만 쓰고, React Compiler를 켜면 이 작업을 자동으로 해 줘요.', 'Memoization tools reuse previous results for the same inputs: useMemo caches values, useCallback functions and memo component renders.', 'useMemo(() => sum(...), [items]) reuses its result while items is unchanged. A function created on every render has a new reference each time, so passing it to a memo-wrapped child makes props look changed and defeats memo; useCallback keeps the reference stable. memo compares each prop with Object.is and skips the render when all match. Memoization costs memory and comparisons, so apply it to slow spots found with the Profiler, or enable React Compiler to do it automatically.', sMemo()),
    item('react-customhook', '커스텀 훅', 'Custom hooks', 'use로 시작하는 이름의 함수 안에서 다른 훅을 조합해 상태 있는 로직을 재사용해요. 로직은 공유되지만 상태는 호출마다 따로예요.', 'function useOnline()은 useState와 useEffect로 online·offline 이벤트를 구독해 현재 연결 상태를 돌려줘요. 여러 컴포넌트가 const online = useOnline() 한 줄로 가져다 쓰지만, 상태는 공유되지 않고 호출한 컴포넌트마다 따로 생겨요. 훅의 규칙에 따라 훅은 컴포넌트나 커스텀 훅의 최상위에서만, 항상 같은 순서로 불러야 하며 if·반복문·콜백 안에서 부르면 안 돼요. useFetch, useDebounce, useLocalStorage가 대표적인 예이고, 외부 저장소 구독은 useSyncExternalStore로 하면 더 안전해요.', 'Functions named use… combine other hooks to reuse stateful logic; the logic is shared, but each call gets its own state.', 'function useOnline() uses useState and useEffect to subscribe to online and offline events and returns the current status. Many components can call const online = useOnline() in one line, but each gets its own state rather than sharing one. By the rules of hooks, hooks are called only at the top level of components or custom hooks, always in the same order, never inside conditions, loops or callbacks. useFetch, useDebounce and useLocalStorage are classic examples, and useSyncExternalStore is the safer way to subscribe to external stores.', sCustomHook()),
    item('react-reducer', 'useReducer', 'useReducer', '상태를 어떻게 바꿀지를 (state, action) → 새 state 순수 함수 한 곳에 모으는 훅이에요. 컴포넌트는 무슨 일이 일어났는지만 dispatch해요.', '클릭 핸들러는 dispatch({ type: "add", item })처럼 액션만 보내고, reducer(state, a)가 switch로 액션 종류에 따라 새 배열을 만들어 돌려줘요. const [todos, dispatch] = useReducer(reducer, [])로 연결하면 새 상태로 다시 렌더돼요. 갱신 규칙이 한 곳에 모여 흐름을 추적하기 쉽고, reducer는 순수 함수라 UI 없이도 테스트할 수 있어요. 갱신 종류가 많고 상태가 복잡할수록 useState보다 유리하고, Context와 함께 쓰면 작은 전역 상태 관리가 돼요. Redux도 같은 아이디어예요.', 'A hook that gathers how state changes into one pure (state, action) → new state function; components only dispatch what happened.', 'A click handler only dispatches an action such as { type: "add", item }, and reducer(state, a) switches on the action type to build and return a new array. Wiring it with const [todos, dispatch] = useReducer(reducer, []) re-renders with each new state. Update rules live in one place, making the flow easy to follow, and the pure reducer can be tested without any UI. It beats useState as update kinds and complexity grow, and with Context it becomes lightweight global state management. Redux is built on the same idea.', sReducer()),
  ]),
  sec('react-arch', '상태 관리와 구조', 'State mgmt & structure', '상태 관리와 앱 구조', 'State management and app structure', '깊은 곳으로 값을 전달하는 방법, 서버 상태와 클라이언트 상태, 그리고 로딩·오류·떠 있는 UI·우선순위를 다루는 도구예요.', 'Passing values deep down, server versus client state, and tools for loading, errors, floating UI and priorities.', [
    item('react-context', 'Context', 'Context', 'Context는 props를 거치지 않고 트리 깊은 곳까지 값을 전달하는 통로예요. 테마, 로그인 사용자, 언어 같은 앱 전체 값에 써요.', '깊은 Button이 theme을 쓰려면 Page, Sidebar처럼 쓰지도 않는 중간 컴포넌트가 계속 props를 전달해야 해요(prop drilling). createContext로 ThemeContext를 만들고 <ThemeContext value={theme}>로 감싸면, 그 아래 어디서든 use(ThemeContext)나 useContext로 가장 가까운 값을 바로 읽어요. 값이 바뀌면 그 Context를 읽는 모든 컴포넌트가 다시 렌더되므로, 자주 바뀌는 값은 Context를 나누거나 상태 관리 도구를 써요. React 19부터는 .Provider 없이 <Context value>로 쓰고, 먼저 합성으로 해결되는지 살펴보는 게 좋아요.', 'Context is a channel that carries values deep into the tree without props, for app-wide values such as theme, the signed-in user or language.', 'For a deep Button to use theme, intermediate components such as Page and Sidebar must relay props they never use: prop drilling. Creating ThemeContext with createContext and wrapping the tree in <ThemeContext value={theme}> lets anything below read the nearest value with use(ThemeContext) or useContext. When the value changes, every component reading it re-renders, so split contexts or use a state library for fast-changing values. Since React 19 you write <Context value> without .Provider, and composition is worth trying first.', sContext()),
    item('react-statemgmt', '서버 상태와 클라이언트 상태', 'Server state and client state', '상태는 서버에 원본이 있는 서버 상태와 브라우저에만 있는 클라이언트 상태로 나뉘고, 각각 알맞은 도구가 달라요.', '할 일 목록, 사용자 정보 같은 서버 상태는 “원격 데이터의 복사본”이라 캐시, 신선도, 재요청이 핵심이에요. TanStack Query의 useQuery({ queryKey: ["todos", page], staleTime: 60_000 })는 키별로 캐시하고, 신선한 동안은 재사용하다가 오래되면 다시 가져와요. 모달 열림이나 장바구니 같은 클라이언트 상태는 useState, Context, 또는 Zustand 같은 작은 저장소로 관리하고, useCart(s => s.items.length)처럼 필요한 조각만 구독하면 그 값이 바뀔 때만 렌더돼요. 서버 데이터를 전역 저장소에 복사하면 두 원본이 어긋나니 피해요.', 'State splits into server state, whose source lives on the server, and client state that exists only in the browser, each with its own tools.', 'Server state such as todo lists and user profiles is a copy of remote data, so caching, freshness and refetching are what matter. TanStack Query’s useQuery({ queryKey: ["todos", page], staleTime: 60_000 }) caches per key, reusing data while fresh and refetching once stale. Client state such as an open modal or a cart lives in useState, Context or a small store such as Zustand, and subscribing to just a slice, as in useCart(s => s.items.length), re-renders only when that value changes. Copying server data into a global store creates two drifting sources, so avoid it.', sStateMgmt()),
    item('react-suspense', 'Suspense와 lazy', 'Suspense and lazy', 'Suspense는 아직 준비되지 않은 부분 대신 fallback을 보여주는 경계예요. lazy와 함께 코드 분할에, 데이터 로딩 대기에도 써요.', 'const Chart = lazy(() => import("./Chart"))는 Chart 코드를 별도 파일로 나눠 처음 필요할 때만 내려받아요(코드 스플리팅). <Suspense fallback={<Spinner />}>로 감싸면 코드나 데이터가 준비되는 동안 스피너를 보여주고, 준비되면 그 경계 안만 실제 내용으로 바뀌어요. 헤더처럼 경계 밖의 부분은 처음부터 그대로예요. 경계를 여러 개 두면 준비된 순서대로 화면이 채워지고, 서버 렌더링에서는 HTML을 경계 단위로 흘려보내요(스트리밍). 로딩 상태를 컴포넌트 안의 if 대신 바깥에서 선언적으로 다루는 방식이에요.', 'Suspense is a boundary that shows a fallback for parts that are not ready yet, used with lazy for code splitting and for awaiting data.', 'const Chart = lazy(() => import("./Chart")) splits Chart into its own file, downloaded only on first use: code splitting. Wrapping it in <Suspense fallback={<Spinner />}> shows the spinner while code or data loads, then swaps in the real content inside that boundary only, while parts outside such as the header stay put. Multiple boundaries fill the screen in the order things become ready, and server rendering streams HTML boundary by boundary. Loading states become declarative, handled from outside instead of with ifs inside the component.', sSuspense()),
    item('react-errorboundary', 'Error Boundary', 'Error boundaries', 'Error Boundary는 자식 트리의 렌더 오류를 잡아 그 영역만 대체 화면으로 바꾸는 경계예요. 한 부분의 오류가 앱 전체를 하얗게 만드는 것을 막아요.', '렌더 중 오류가 나면 React는 트리 전체를 내려서 화면이 하얗게 비어요. <ErrorBoundary fallback={…}>로 Comments를 감싸면 Comments에서 오류가 나도 그 자리만 “오류가 났어요 · 다시 시도”로 바뀌고 헤더와 본문은 살아남아요. 경계는 getDerivedStateFromError로 오류를 상태로 바꾸는데, 아직 클래스 컴포넌트로만 만들 수 있어 react-error-boundary 패키지를 많이 써요. 이벤트 핸들러나 비동기 코드의 오류는 렌더 밖이라 잡지 못하니 try/catch로 처리해요. 위젯·섹션 단위로 여러 개 두면 장애 범위가 작아져요.', 'An error boundary catches rendering errors in its subtree and replaces just that region with a fallback, so one failure does not blank the whole app.', 'A rendering error unmounts the whole tree, leaving a blank page. Wrapping Comments in <ErrorBoundary fallback={…}> means an error there replaces only that spot with “Oops, try again” while the header and article survive. Boundaries turn errors into state with getDerivedStateFromError and still require class components, which is why the react-error-boundary package is popular. Errors in event handlers and async code happen outside rendering and are not caught, so handle them with try/catch. Several boundaries around widgets or sections keep failures contained.', sErrorBoundary()),
    item('react-portal', '포털', 'Portals', 'createPortal은 컴포넌트의 논리적 위치는 그대로 두고 DOM만 body 같은 다른 곳에 렌더해요. 모달·툴팁처럼 떠 있는 UI에 써요.', '모달을 카드 안에서 그리면 부모의 overflow: hidden에 잘리거나 쌓임 맥락 때문에 다른 요소 아래에 깔리기 쉬워요. createPortal(<div className="modal">…</div>, document.body)는 DOM 노드를 body 바로 아래에 만들어 이런 제약에서 벗어나요. 그래도 React 트리에서는 여전히 Card의 자식이라 클릭 이벤트는 Card로 버블링되고 Context도 그대로 읽혀요. 모달, 툴팁, 드롭다운, 토스트에 쓰며, 포커스 가두기와 Esc 닫기 같은 접근성 처리를 함께 챙겨요. 요즘은 <dialog>와 popover 속성으로 최상위 레이어를 쓰는 방법도 있어요.', 'createPortal renders DOM somewhere else, such as body, while the component keeps its logical place; it suits floating UI such as modals and tooltips.', 'A modal rendered inside a card is easily clipped by the parent’s overflow: hidden or buried by stacking contexts. createPortal(<div className="modal">…</div>, document.body) creates the DOM nodes directly under body, escaping those limits. In the React tree it is still Card’s child, so clicks bubble to Card and context is read as usual. Use it for modals, tooltips, dropdowns and toasts, together with accessibility details such as focus trapping and closing on Esc. Native <dialog> and the popover attribute now offer the top layer as well.', sPortal()),
    item('react-concurrent', 'useTransition과 동시성', 'useTransition and concurrency', '동시성 렌더링은 렌더를 중단·재개할 수 있게 해서, 급한 업데이트(입력)를 먼저 처리하고 급하지 않은 렌더는 뒤로 미뤄요.', '무거운 목록을 렌더하는 동안에는 메인 스레드가 막혀 입력창에 글자가 늦게 찍혀요. startTransition(() => setTab(next))처럼 감싼 업데이트는 “급하지 않음”으로 표시되어, 새 입력이 오면 진행 중이던 렌더를 버리고 다시 시작해요. useDeferredValue(q)는 q의 늦은 버전을 만들어 입력창은 즉시, 느린 목록은 여유가 있을 때 갱신해요. isPending으로 준비 중 표시도 할 수 있어요. 이 도구들은 네트워크가 아니라 렌더 비용 문제를 다루고, 정말 큰 목록은 가상화(react-window)도 함께 고려해요.', 'Concurrent rendering lets React interrupt and resume rendering, handling urgent updates such as typing first and deferring non-urgent renders.', 'While a heavy list renders, the main thread is blocked and typed characters lag. Updates wrapped in startTransition(() => setTab(next)) are marked non-urgent, so React abandons and restarts that render when new input arrives. useDeferredValue(q) makes a lagging copy of q, updating the input immediately and the slow list when there is time, and isPending can drive a pending hint. These tools address rendering cost, not network delay, and very large lists also call for virtualization such as react-window.', sConcurrent()),
  ]),
  sec('react-modern', '최신 React', 'Modern React', '최신 React와 품질', 'Modern React and quality', '렌더·커밋을 나누는 엔진, 서버 컴포넌트와 Actions, use()와 컴파일러, 그리고 테스트예요.', 'The render and commit engine, Server Components and Actions, use() and the compiler, and testing.', [
    item('react-fiber', 'Fiber와 렌더·커밋', 'Fiber, render and commit', 'React는 렌더 단계에서 새 트리를 계산하고(중단 가능), 커밋 단계에서 DOM에 한 번에 반영해요. 그래서 렌더 함수는 순수해야 해요.', '상태가 바뀌면 렌더 단계에서 컴포넌트 함수를 호출해 새 트리를 계산하는데, Fiber는 이 일을 작은 단위로 쪼개 급한 일이 오면 중간에 양보하고 나중에 다시 시작해요. 계산이 끝나면 커밋 단계에서 바뀐 부분을 실제 DOM에 끊김 없이 한 번에 반영해요. 그 뒤 useLayoutEffect가 브라우저가 그리기 전에, useEffect가 그린 뒤에 실행돼요. 렌더 단계는 버려지거나 여러 번 실행될 수 있어서, 렌더 중에 외부 값을 바꾸거나 요청을 보내면 안 되고 같은 입력에 같은 결과를 내야 해요. Strict Mode의 이중 렌더도 이를 검사하기 위해서예요.', 'React computes a new tree in the interruptible render phase and applies it to the DOM in one go in the commit phase, which is why render functions must be pure.', 'After a state change, the render phase calls components to compute a new tree, and Fiber splits this work into small units that can yield to urgent work and resume later. The commit phase then applies the changes to the real DOM in one uninterrupted pass, after which useLayoutEffect runs before the browser paints and useEffect after. Because render work may be discarded or repeated, rendering must not mutate outside values or send requests, and must give the same output for the same input. Strict Mode’s double render exists to check exactly this.', sFiber()),
    item('react-rsc', '서버 컴포넌트', 'Server Components', '서버에서만 실행되는 컴포넌트예요. DB를 바로 읽고 코드가 브라우저로 가지 않으며, 상호작용이 필요한 부분만 "use client"로 표시해요.', 'export default async function Page()에서 await db.post.findMany()로 데이터를 바로 읽고, 그 코드와 쓰인 라이브러리는 브라우저 번들에 들어가지 않아요. 좋아요 버튼처럼 useState나 onClick이 필요한 컴포넌트만 파일 맨 위에 "use client"를 적어 클라이언트 컴포넌트로 만들어요. 서버는 렌더 결과를 RSC 페이로드로 보내고, 클라이언트 컴포넌트 자리에는 그 JS가 내려와 하이드레이션돼요. 서버에서 클라이언트로 넘기는 props는 직렬화할 수 있어야 하고, 클라이언트 컴포넌트 안에 서버 컴포넌트를 넣으려면 children으로 전달해요. Next.js App Router가 대표적인 구현이에요.', 'Components that run only on the server: they read databases directly and ship no code to the browser, while interactive parts are marked "use client".', 'In export default async function Page(), await db.post.findMany() reads data directly, and neither that code nor its libraries enter the browser bundle. Only components needing useState or onClick, such as a like button, get "use client" at the top of the file to become client components. The server sends its output as an RSC payload, and client components’ JavaScript downloads into their slots and hydrates. Props crossing to client components must be serializable, and server components go inside client ones as children. The Next.js App Router is the best-known implementation.', sRsc()),
    item('react-actions', 'Actions와 useActionState', 'Actions and useActionState', 'React 19의 Actions는 폼 제출 같은 비동기 작업의 진행 중·오류·결과·낙관적 상태를 React가 관리하게 해 줘요.', '<form action={action}>에 함수를 넘기면 제출 때 FormData로 호출되어 preventDefault나 입력별 useState가 필요 없어요. const [state, action, pending] = useActionState(save, null)은 진행 중 여부를 자동으로 알려 줘서 버튼을 잠가 중복 제출을 막고, save의 반환값이 state가 되어 오류 메시지나 결과를 그려요. useOptimistic은 서버 응답 전에 성공한 것처럼 먼저 보여주고 실패하면 원래대로 되돌려요. 서버 함수("use server")를 action에 바로 넘기면 JS가 로드되기 전에도 폼이 동작해요. 폼 안의 자식은 useFormStatus로 pending을 읽어요.', 'React 19 Actions let React manage the pending, error, result and optimistic states of async work such as form submissions.', 'Passing a function to <form action={action}> calls it with FormData on submit, with no preventDefault or per-field useState. const [state, action, pending] = useActionState(save, null) reports pending automatically so the button can be disabled against double submits, and save’s return value becomes state for rendering errors or results. useOptimistic shows the expected result before the server responds and reverts on failure. Passing a server function ("use server") straight to action makes the form work even before JavaScript loads, and children inside the form read pending with useFormStatus.', sActions()),
    item('react-use', 'use()', 'use()', 'use()는 렌더 중에 Promise나 Context를 읽는 React 19의 API예요. Promise가 아직이면 컴포넌트가 일시 정지되고 Suspense가 fallback을 보여줘요.', 'const list = use(promise)는 Promise가 끝났으면 결과를 바로 꺼내고, 아직이면 컴포넌트를 일시 정지시켜 가장 가까운 Suspense의 fallback이 보이게 해요. 실패하면 Error Boundary가 받아요. use는 다른 훅과 달리 if나 반복문 안에서도 부를 수 있고, use(ThemeContext)처럼 Context를 읽는 데도 써요. 주의할 점은 렌더할 때마다 새 Promise를 만들면 끝없이 정지한다는 것이에요. 그래서 서버 컴포넌트에서 await하지 않은 Promise를 만들어 클라이언트 컴포넌트에 넘기는 패턴으로 데이터를 스트리밍해요.', 'use() is the React 19 API for reading promises or context during render; a pending promise suspends the component and Suspense shows its fallback.', 'const list = use(promise) returns the result immediately if the promise has settled, and otherwise suspends the component so the nearest Suspense shows its fallback; failures go to an error boundary. Unlike other hooks, use may be called inside if statements and loops, and use(ThemeContext) reads context too. The catch is that creating a new promise every render suspends forever, so the pattern is to create an un-awaited promise in a server component and pass it to a client component, streaming the data.', sUse()),
    item('react-compiler', 'React Compiler', 'React Compiler', 'React Compiler는 빌드 단계에서 컴포넌트를 분석해 메모이제이션을 자동으로 넣어 줘요. useMemo·useCallback·memo를 손으로 쓸 일이 크게 줄어요.', 'items.filter(...)와 <Rows rows={shown} />를 평범하게 쓴 List 컴포넌트는 관련 없는 렌더에도 계산과 자식 렌더를 반복해요. 컴파일러는 빌드 때 값이 무엇에 의존하는지 분석해, items와 q가 같으면 shown을 재사용하고 rows가 같으면 Rows 렌더를 건너뛰는 코드를 자동으로 만들어요. 손으로 관리하던 의존성 배열의 실수도 사라지고 코드는 더 단순해져요. 단, 렌더 중 값을 바꾸지 않고 훅 규칙을 지키는 등 React의 규칙을 따른 컴포넌트만 최적화하고, 어긴 컴포넌트는 건너뛰어요. Vite·Next.js 플러그인으로 점진적으로 켤 수 있어요.', 'React Compiler analyzes components at build time and inserts memoization automatically, largely removing hand-written useMemo, useCallback and memo.', 'A List component written plainly with items.filter(...) and <Rows rows={shown} /> repeats its calculation and child render even on unrelated renders. The compiler analyzes dependencies at build time and generates code that reuses shown while items and q match and skips rendering Rows while rows matches. Dependency-array mistakes disappear and code gets simpler. It only optimizes components that follow the rules of React, such as no mutation during render and the rules of hooks, and skips those that do not. It can be enabled incrementally through Vite or Next.js plugins.', sCompiler()),
    item('react-testing', '컴포넌트 테스트', 'Testing components', 'React Testing Library는 구현 세부가 아니라 사용자가 보고 하는 행동을 기준으로 컴포넌트를 검증해요.', 'render(<Login />)로 컴포넌트를 jsdom 같은 가짜 DOM에 그리고, getByLabelText("이메일"), getByRole("button", { name: "로그인" })처럼 사용자가 인식하는 라벨과 역할로 요소를 찾아 user.type, user.click으로 행동해요. 결과도 findByRole("alert")처럼 화면에 보이는 것으로 확인하고, findBy는 비동기로 나타날 때까지 기다려요. 클래스 이름이나 내부 상태로 찾지 않으니 리팩터링해도 테스트가 깨지지 않아요. 네트워크는 MSW로 가짜 응답을 주고, getByRole은 접근성 트리를 쓰므로 접근성 점검 효과도 있어요. 전체 흐름은 Playwright 같은 E2E 테스트로 보완해요.', 'React Testing Library verifies components by what users see and do rather than by implementation details.', 'render(<Login />) draws the component into a simulated DOM such as jsdom, and queries such as getByLabelText("Email") and getByRole("button", { name: "Log in" }) find elements the way users perceive them before acting with user.type and user.click. Results are checked by what appears, as in findByRole("alert"), and findBy waits for async content. Because nothing is found by class names or internal state, refactors do not break the tests. MSW supplies fake network responses, and getByRole doubles as an accessibility check since it uses the accessibility tree. End-to-end tests such as Playwright cover whole flows.', sTesting()),
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
