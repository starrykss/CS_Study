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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'qcx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono qcx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono qcx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c qcx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono qcx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c qcx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'qcx-s qcx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono qcx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono qcx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono qcx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono qcx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono qcx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'qcx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'qcx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'qcx-xs qcx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono qcx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'qcx-a', g: 'qcx-g', r: 'qcx-r', w: 'qcx-w', m: 'cz-mono', s: 'qcx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'qcx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono qcx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono qcx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'qcx-xs ') + clsOf(c) + (o.w ? ' qcx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.qcx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.qcx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.qcx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.qcx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.qcx-r .in{color:var(--danger);font-weight:800}
.qcx-g .in{color:var(--ok);font-weight:800}
.qcx-a .in{color:var(--accent);font-weight:800}
.qcx-w .in{color:var(--warn);font-weight:800}
.qcx-c .in{font-size:.6em;font-weight:700}
.qcx-c2 .in{font-size:.5em;font-weight:700}
.qcx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.qcx-wr .in{white-space:normal!important}
.qcx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.qcx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Quantum · helpers (shared with the circuits page pattern) ===== */
const CSSY = '.qcx-sv svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}';
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* plots: data x in [a, b], y in [lo, hi] mapped to a box at (x0, y0) of size w × h */
const PF = (x0, y0, w, h, a, b, lo, hi) => ({ X: x => x0 + (x - a) / (b - a) * w, Y: y => y0 + h - (y - lo) / (hi - lo) * h, x0, y0, w, h, a, b, lo, hi });
const axes = (S, k, P, st, o = {}) => { const yz = P.Y(Math.max(P.lo, Math.min(P.hi, 0))); hl(S, k + 'x', P.x0, P.x0 + P.w, yz, 'ink-3', st, { w: .06, off: o.off }); if (!o.noy) vl(S, k + 'y', P.X(Math.max(P.a, Math.min(P.b, 0))), P.y0, P.y0 + P.h, 'ink-3', st, { w: .06, off: o.off }); };
const ticks = (S, k, P, xs, ys, st, o = {}) => { const yb = o.yb ?? P.Y(Math.max(P.lo, Math.min(P.hi, 0))) + .12; (xs || []).forEach(([v, t], i) => T(S, k + 'x' + i, P.X(v) - .9, yb, t, 'cz-mono cz-tc qcx-tiny', st, { w: 1.8, off: o.off })); (ys || []).forEach(([v, t], i) => T(S, k + 'y' + i, P.x0 - 2.0, P.Y(v) - .3, t, 'cz-mono qcx-tiny', st, { w: 1.8, css: 'text-align:right', off: o.off })); };
/* one SVG path per curve */
const spoly = (S, k, pts, o = {}) => {
  const ok = pts.filter(Boolean); if (ok.length < 2) return;
  const pad = .3, xs = ok.map(p => p[0]), ys = ok.map(p => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, w = Math.max(...xs) + pad - x0, h = Math.max(...ys) + pad - y0;
  let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + r3(p[0] - x0) + ' ' + r3(p[1] - y0); pen = true; });
  S.el(k, { x: x0, y: y0, w, h, cls: 'qcx-sv', html: `<svg viewBox="0 0 ${r3(w)} ${r3(h)}" preserveAspectRatio="none"><path d="${d}" style="fill:none;stroke:${cv(o.color || 'accent')};stroke-width:${o.h || .09};stroke-linejoin:round;stroke-linecap:round${o.dash ? ';stroke-dasharray:.25 .2' : ''}"/></svg>`, s: o.st ? hid() : {} });
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
const SV = (S, k, parts, st, o = {}) => { const [x, y, w, h] = o.box || [18.2, 0, 13.8, 15]; S.el(k, { x, y, w, h, cls: 'qcx-sv', html: `<svg viewBox="${x} ${y} ${w} ${h}">${[].concat(parts).join('')}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
/* value grid as one SVG: M is rows × cols of 0..1, drawn with tint of color */
const GR = (S, k, x0, y0, cs, M, color, st, o = {}) => { const R = M.length, Cn = M[0].length; let r = ''; M.forEach((row, i) => row.forEach((v, j) => { const c = typeof color === 'function' ? color(v, i, j) : color; r += `<rect x="${r3(j * cs)}" y="${r3(i * cs)}" width="${r3(cs - (o.gap ?? .04))}" height="${r3(cs - (o.gap ?? .04))}" style="fill:${tint(c, Math.round(6 + 80 * Math.max(0, Math.min(1, Math.abs(v)))))}"/>`; })); S.el(k, { x: x0, y: y0, w: Cn * cs, h: R * cs, cls: 'qcx-sv', html: `<svg viewBox="0 0 ${r3(Cn * cs)} ${r3(R * cs)}">${r}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const nb = (S, k, x, y, w, h, label, color, st, o = {}) => box2(S, k, x, y, w, h, label, color, st, Object.assign({ pct: 22 }, o));
const gauss1 = (m, s) => x => Math.exp(-Math.pow((x - m) / s, 2) / 2);
/* ===== Quantum · helpers ===== */
const ket = s => '|' + s + '⟩';
/* signed amplitude bars on a baseline yb; labels below at yb + lo */
const AMP = (S, k, x0, yb, labs, vals, st, o = {}) => { const w = o.w || 1.2, gap = o.gap ?? .35, sc = o.sc || 2.4, lo = o.lo ?? .15; vals.forEach((v, i) => { const x = x0 + i * (w + gap), c = typeof o.c === 'function' ? o.c(v, i) : (v < 0 ? 'danger' : (o.c || 'accent')); if (Math.abs(v) > 1e-9) rect(S, k + i, x, v > 0 ? yb - v * sc : yb, w, Math.abs(v) * sc, c, o.pct || 60, st, { r: .06, off: o.off }); const lw = o.lw ?? (w + .6); if (labs) T(S, k + 'l' + i, x - (lw - w) / 2, yb + lo, labs[i], 'cz-mono cz-tc qcx-tiny', st, { w: lw, off: o.off }); if (o.vt) T(S, k + 'v' + i, x - (lw - w) / 2, (v >= 0 ? yb - Math.max(v, 0) * sc - .55 : yb - .55), o.vt(v, i), 'cz-mono cz-tc qcx-tiny', st, { w: lw, off: o.off }); }); hl(S, k + 'b', x0 - .15, x0 + vals.length * (w + gap) - gap + .15, yb, 'ink-3', st, { w: .04, off: o.off }); };
const f3 = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
/* Bloch sphere: oblique projection, x toward the viewer (lower left), y right, z up */
const BP = (c, r, v) => [c[0] + r * (-.5 * v[0] + v[1]), c[1] + r * (.4 * v[0] - v[2])];
const bvec = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const blochSV = (c, r) => { const eq = [...Array(49)].map((_, i) => BP(c, r, [Math.cos(i / 48 * 2 * Math.PI), Math.sin(i / 48 * 2 * Math.PI), 0])); return [zO(c, r, 'ink-3', .05), zW(eq, 'ink-3', .04, true), zW([BP(c, r, [0, 0, -1]), BP(c, r, [0, 0, 1])], 'ink-3', .04), zW([BP(c, r, [-1, 0, 0]), BP(c, r, [1.15, 0, 0])], 'ink-3', .04), zW([BP(c, r, [0, -1, 0]), BP(c, r, [0, 1.12, 0])], 'ink-3', .04)]; };
/* circuit pieces in stage coordinates (for SV) */
const cxSV = (x, yc, yt, c) => [zW([[x, yc], [x, yt + (yt > yc ? .32 : -.32)]], c || 'ink', .06), zJ([x, yc], c || 'ink'), zO([x, yt], .32, c || 'ink', .06), zW([[x - .32, yt], [x + .32, yt]], c || 'ink', .06)];
const gate = (S, k, x, y, t, c, st, o = {}) => box2(S, k, x - (o.w || .9) / 2, y - .45, o.w || .9, .9, t, c || 'accent', st, { pct: 30, off: o.off });
const wires = (S, k, x1, x2, ys, st, o = {}) => ys.forEach((y, i) => hl(S, k + i, x1, x2, y, 'ink-3', st, { w: .05, off: o.off }));

/* ===== Quantum · 1. qubits and states ===== */
function sQubit() {
  const Z = new Set([3, 7, 8, 12, 15, 19, 21, 24, 26, 30, 33, 35, 38, 41, 44, 46, 49, 52, 55, 57, 60, 62, 64, 67, 70, 73, 75, 78, 80, 83, 86, 88, 90, 93, 95, 97, 99]);
  const SH = [...Array(10)].map((_, i) => [...Array(10)].map((_, j) => Z.has(i * 10 + j) ? .25 : .8));
  return CW('qc-qubit', {
    code: ['psi = np.array([0.6, 0.8])  # α|0⟩ + β|1⟩', ['np.sum(np.abs(psi)**2)      # 합 1.0', 'np.sum(np.abs(psi)**2)      # total 1.0'], 'p0, p1 = np.abs(psi)**2     # 0.36, 0.64', 'shots = rng.choice([0, 1], 100, p=[p0, p1])', ['# 측정하면 0 또는 1 하나만: 약 36번 / 64번', '# each shot gives 0 or 1: about 36 / 64']],
    hl: [[0, 1, 'accent'], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'accent']],
    draw: (S) => {
      lbl(S, 'cb', 19.0, .3, ['비트: 0 아니면 1', 'a bit: 0 or 1'], 'm', 1); chip(S, 'b0', 19.0, 1.1, 1.4, '0', 'ink', 1); chip(S, 'b1', 20.6, 1.1, 1.4, '1', 'ink', 1);
      lbl(S, 'qb', 23.6, .3, ['큐비트: 진폭 α, β', 'a qubit: amplitudes α, β'], 'a', 1);
      AMP(S, 'am', 24.0, 4.2, [ket(0), ket(1)], [.6, .8], 1, { sc: 2.8, vt: v => v.toFixed(1) });
      F(S, 'nm', 19.0, 5.4, '|α|² + |β|² = 0.36 + 0.64 = 1', 'g', 2, { w: 12.4 });
      AMP(S, 'pr', 28.0, 4.2, ['P(0)', 'P(1)'], [.36, .64], 3, { sc: 2.8, c: 'warn', vt: v => v.toFixed(2) });
      lbl(S, 'pl', 19.0, 6.5, ['측정 확률은 진폭의 제곱: 0.6² = 0.36, 0.8² = 0.64', 'measurement probabilities are squared amplitudes: 0.6² = 0.36, 0.8² = 0.64'], 'w', 3, { w: 12.4 });
      GR(S, 'sh', 1.0, 7.3, .45, SH, (v) => v > .5 ? 'accent' : 'ink-3', 4, { gap: .06 });
      lbl(S, 'sc', 6.0, 7.4, ['100번 측정한 한 예: 0이 37번(회색), 1이 63번(파랑)', 'one run of 100 shots: 0 came up 37 times (gray), 1 63 times (blue)'], '', 4, { w: 11.4 });
      lbl(S, 'sa', 6.0, 9.2, ['한 번 측정하면 0 또는 1 하나만 나오고, 진폭 자체는 볼 수 없어요', 'each measurement yields just 0 or 1; the amplitudes themselves are never seen'], 'a', 4, { w: 11.4 });
    },
    notes: [['고전 비트는 0 아니면 1이지만, 큐비트는 |0⟩과 |1⟩의 중첩 α|0⟩ + β|1⟩이에요 · α, β는 진폭이라 부르는 (복소)수예요', 'a classical bit is 0 or 1, while a qubit is a superposition α|0⟩ + β|1⟩, where α and β are (complex) numbers called amplitudes'], ['진폭의 제곱 합은 항상 1이에요 · 0.6² + 0.8² = 0.36 + 0.64 = 1', 'the squared amplitudes always sum to 1: 0.6² + 0.8² = 0.36 + 0.64 = 1'], ['측정하면 |0⟩이 나올 확률은 |α|² = 0.36, |1⟩은 |β|² = 0.64예요 · 진폭을 제곱해야 확률이 돼요', 'measurement gives |0⟩ with probability |α|² = 0.36 and |1⟩ with |β|² = 0.64; amplitudes must be squared to become probabilities'], ['한 번 측정하면 0이나 1 하나만 나오고 상태도 그 값으로 바뀌어요 · 100번 준비해 측정하면 0이 36번 안팎 나오고, 진폭은 이런 통계로만 짐작할 수 있어요', 'each measurement yields a single 0 or 1 and the state becomes that value; preparing and measuring 100 times gives around 36 zeros, and the amplitudes can only be inferred from such statistics']],
    fin: [['큐비트: α|0⟩ + β|1⟩, 측정 확률 = |진폭|²', 'a qubit is α|0⟩ + β|1⟩, with measurement probabilities |amplitude|²', 'qcx-xs qcx-a'], ['중첩은 "둘 다 동시에"라기보다 진폭을 가진 하나의 상태예요', 'superposition is one state with amplitudes, not literally “both at once”'], ['진폭은 음수나 복소수도 될 수 있어 간섭이 생겨요', 'amplitudes can be negative or complex, which makes interference possible']],
    caps: [['비트와 큐비트', 'Bits and qubits'], ['정규화', 'Normalization'], ['측정 확률', 'Measurement probabilities'], ['반복 측정', 'Repeated measurement'], ['큐비트', 'The qubit']]
  });
}

function sBloch() {
  const c = [22.6, 6.3], r = 3.1, v1 = BP(c, r, bvec(Math.PI / 3, 0)), v2 = BP(c, r, bvec(Math.PI / 3, Math.PI / 2)), zc = BP(c, r, [0, 0, .5]);
  return CW('qc-bloch', {
    code: ['theta, phi = np.pi / 3, 0', 'a = np.cos(theta/2)                   # 0.866', 'b = np.exp(1j*phi) * np.sin(theta/2)  # 0.5', 'p0 = abs(a)**2                        # 0.75', ['# φ는 측정 확률을 바꾸지 않지만 간섭에 영향', '# φ changes interference, not P(0)']],
    hl: [[0, 1, 'accent'], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1]],
    draw: (S) => {
      SV(S, 'sp', blochSV(c, r), 1); SV(S, 'v1', [zA(c, v1, 'accent', .09)], 1);
      [[ket(0), [c[0] - .7, c[1] - r - .85]], [ket(1), [c[0] - .7, c[1] + r + .2]], [ket('+'), BP(c, r, [1.38, 0, 0])], [ket('+i'), BP(c, r, [0, 1.2, 0])]].forEach(([t, p], i) => T(S, 'kl' + i, i < 2 ? p[0] : p[0] - .7, i < 2 ? p[1] : p[1] - .3, t, 'cz-mono cz-tc qcx-xs', 1, { w: 1.4 }));
      lbl(S, 'bl', 1, 7.0, ['큐비트 상태는 구 위의 한 점: 북극 |0⟩, 남극 |1⟩, 적도는 반반', 'a qubit state is a point on a sphere: north |0⟩, south |1⟩, the equator half and half'], '', 1, { w: 16.0 });
      SV(S, 'pj', [zW([v1, zc], 'warn', .05, true)], 2);
      F(S, 'fm', 1, 8.6, '|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩', 'a', 2, { w: 16.0 });
      F(S, 'a1', 27.4, 1.6, 'θ = 60°', 'a', 2, { w: 4.0 }); F(S, 'a2', 27.4, 2.6, 'cos 30° = 0.866', '', 2, { w: 4.0 }); F(S, 'a3', 27.4, 3.5, 'sin 30° = 0.5', '', 2, { w: 4.0 });
      F(S, 'p0', 27.4, 4.7, 'P(0) = 0.866² = 0.75', 'w', 3, { w: 4.0 });
      lbl(S, 'ph', 27.4, 6.2, ['높을수록 0이 잘 나와요', 'higher means 0 is likelier'], 'w', 3, { w: 4.0 });
      SV(S, 'v2', [zA(c, v2, 'warn', .08)], 4);
      lbl(S, 'p9', 27.4, 7.9, ['φ = 90°: 같은 높이라 P(0) 그대로', 'φ = 90°: same height, same P(0)'], 'w', 4, { w: 4.0 });
      lbl(S, 'rt', 1, 10.2, ['게이트는 구를 돌리는 회전: X는 x축으로 180°, Z는 z축으로 180°', 'gates rotate the sphere: X turns 180° about x, Z 180° about z'], '', 4, { w: 16.0 });
    },
    notes: [['진폭에서 의미 있는 건 크기 비율과 상대 위상뿐이라, 큐비트 상태를 구(블로흐 구) 위의 한 점으로 그릴 수 있어요 · 북극이 |0⟩, 남극이 |1⟩이에요', 'only the ratio of magnitudes and the relative phase matter, so a qubit state can be drawn as a point on a sphere, the Bloch sphere, with |0⟩ at the north pole and |1⟩ at the south'], ['위도 θ가 크기를 정해요 · |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩이라 θ = 60°면 cos 30° = 0.866, sin 30° = 0.5예요', 'the polar angle θ sets the magnitudes: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩, so θ = 60° gives cos 30° = 0.866 and sin 30° = 0.5'], ['측정 확률은 높이로 보여요 · P(0) = 0.866² = 0.75라서 북극에 가까울수록 0이 잘 나와요', 'the height shows the measurement probability: P(0) = 0.866² = 0.75, so the closer to the north pole, the likelier 0 is'], ['경도 φ는 상대 위상이에요 · φ = 90°로 돌려도 높이가 같아 P(0)는 그대로지만, 다른 게이트와 이어지면 간섭 결과가 달라져요 · 게이트는 이 구를 돌리는 회전이에요', 'the azimuth φ is the relative phase: turning to φ = 90° keeps the height and P(0), but changes how later gates interfere; gates are rotations of this sphere']],
    fin: [['블로흐 구: θ는 확률, φ는 위상, 게이트는 회전', 'the Bloch sphere: θ sets probabilities, φ the phase, and gates are rotations', 'qcx-xs qcx-a'], ['적도 위의 |+⟩, |−⟩, |+i⟩는 모두 P(0) = 0.5예요', '|+⟩, |−⟩ and |+i⟩ on the equator all have P(0) = 0.5'], ['전체 위상 e^(iγ)는 측정에 영향이 없어 무시해요', 'a global phase e^(iγ) never affects measurement and is ignored']],
    caps: [['구 위의 점', 'A point on a sphere'], ['위도 θ', 'Polar angle θ'], ['높이와 확률', 'Height and probability'], ['경도 φ', 'Azimuth φ'], ['블로흐 구', 'The Bloch sphere']]
  });
}

function sMeasure() {
  const seq = [[ket('+'), 'accent', 'c'], ['M_Z', 'ink', 'b'], ['0', 'warn', 'c'], ['M_Z', 'ink', 'b'], ['0', 'ok', 'c']];
  return CW('qc-measure', {
    code: ['plus = np.array([1, 1]) / 2**0.5', 'pz = np.abs(plus)**2        # Z: [0.5, 0.5]', 'px = np.abs(H @ plus)**2    # X: [1, 0]', ['# 측정 후 상태는 나온 값의 기저 상태로 바뀌어요', '# after measuring, the state is the outcome'], ['# 다시 측정하면 같은 값이 나와요', '# measuring again repeats the same value']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'danger']],
    draw: (S) => {
      AMP(S, 'st', 19.4, 3.0, [ket(0), ket(1)], [.707, .707], 1, { sc: 2.4, vt: v => '0.707' });
      lbl(S, 'stl', 23.2, 1.2, [ket('+') + ' = (|0⟩ + |1⟩)/√2: 두 진폭이 같아요', ket('+') + ' = (|0⟩ + |1⟩)/√2: equal amplitudes'], 'a', 1, { w: 8.2 });
      AMP(S, 'zm', 19.4, 7.0, ['0', '1'], [.5, .5], 2, { sc: 2.4, c: 'warn', vt: v => '0.5' });
      lbl(S, 'zml', 23.2, 5.3, ['0/1 기준(Z)으로 재면 반반: 동전 던지기처럼 보여요', 'measured in the 0/1 (Z) basis: 50/50, like a coin toss'], 'w', 2, { w: 8.2 });
      AMP(S, 'xm', 19.4, 11.0, ['+', '−'], [1, 0], 3, { sc: 2.4, c: 'ok', vt: v => v ? '1' : '0' });
      lbl(S, 'xml', 23.2, 9.3, ['H를 걸어 +/− 기준(X)으로 재면 매번 +', 'apply H to measure in the +/− (X) basis: + every time'], 'g', 3, { w: 8.2 });
      let x = 1.0; seq.forEach(([t, c, kind], i) => { const w = kind === 'c' ? (t.length > 1 ? 2.0 : 1.4) : 2.0; if (kind === 'c') chip(S, 'q' + i, x, 7.4, w, t, c, 4); else box2(S, 'q' + i, x, 7.45, w, 1.0, t, c, 4); x += w; if (i < seq.length - 1) { arw(S, 'qa' + i, [x + .15, 7.95], [x + .95, 7.95], 4); x += 1.1; } });
      lbl(S, 'clp', 1, 8.9, ['측정하면 중첩이 사라지고 나온 값의 상태가 돼요: 다시 재도 같은 값', 'measuring destroys the superposition: the state becomes the outcome, and remeasuring repeats it'], 'r', 4, { w: 16.0 });
      lbl(S, 'last', 1, 10.5, ['그래서 측정은 계산의 마지막에, 원하는 정보를 담은 기준으로 해요', 'so measurement comes last, in a basis that holds the wanted information'], '', 4, { w: 16.0 });
    },
    notes: [['|+⟩ = (|0⟩ + |1⟩)/√2는 두 진폭이 0.707로 같은 상태예요', '|+⟩ = (|0⟩ + |1⟩)/√2 has two equal amplitudes of 0.707'], ['0/1 기준(Z 기준)으로 측정하면 0과 1이 반반씩 나와요 · 이 결과만 보면 동전 던지기와 구별이 안 돼요', 'measured in the 0/1 (Z) basis it gives 0 and 1 half the time each, indistinguishable from a coin toss'], ['측정 전에 H를 걸어 +/− 기준(X 기준)으로 재면 매번 +가 나와요 · 같은 상태라도 어떤 기준으로 재느냐에 따라 결과가 완전히 달라요', 'applying H first to measure in the +/− (X) basis gives + every time: the same state yields completely different results depending on the basis'], ['측정하면 중첩이 사라지고 상태가 나온 값의 기저 상태로 바뀌어요 · 다시 재면 같은 값이 나와서, 측정은 보통 계산의 마지막에 해요', 'measurement destroys the superposition and leaves the state in the basis state that was observed; measuring again repeats it, so measurement usually comes at the end of a computation']],
    fin: [['측정 = 기준을 고르고, 확률적으로 하나를 얻고, 상태가 붕괴', 'measurement picks a basis, returns one outcome at random and collapses the state', 'qcx-xs qcx-a'], ['|+⟩는 무작위 비트가 아니라 X 기준으로는 확정된 상태예요', '|+⟩ is not a random bit: in the X basis its outcome is certain'], ['측정 결과는 고전 비트로 저장돼요', 'measurement results are stored as classical bits']],
    caps: [[ket('+') + ' 상태', 'The ' + ket('+') + ' state'], ['Z 기준 측정', 'Measuring in Z'], ['X 기준 측정', 'Measuring in X'], ['붕괴', 'Collapse'], ['측정과 기저', 'Measurement and bases']]
  });
}

function sMulti() {
  const TB = [['10', '1,024', '16 KB'], ['20', '10⁶', '17 MB'], ['30', '10⁹', '17 GB'], ['40', '10¹²', '18 TB'], ['50', '10¹⁵', '18 PB']];
  return CW('qc-multi', {
    code: ['q0 = np.array([1, 1]) / 2**0.5  # |+⟩', 'q1 = np.array([1, 0])           # |0⟩', ['state = np.kron(q1, q0)         # 4개 진폭', 'state = np.kron(q1, q0)         # 4 amplitudes'], ['# n큐비트 → 2^n개 진폭', '# n qubits → 2^n amplitudes'], ['# 50큐비트: 2^50 × 16 B ≈ 18 PB', '# 50 qubits: 2^50 × 16 B ≈ 18 PB']],
    hl: [[0, 2, 'accent'], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    draw: (S) => {
      lbl(S, 't0', 19.0, .3, 'q0 = |+⟩', 'm a', 1); AMP(S, 'a0', 19.4, 3.2, [ket(0), ket(1)], [.707, .707], 1, { sc: 2.0 });
      lbl(S, 't1', 25.0, .3, 'q1 = |0⟩', 'm a', 1); AMP(S, 'a1', 25.4, 3.2, [ket(0), ket(1)], [1, 0], 1, { sc: 2.0 });
      lbl(S, 't2', 19.0, 4.6, ['두 큐비트 전체 상태 (q1 q0 순서)', 'the two-qubit state (order q1 q0)'], 'm g', 2);
      AMP(S, 'a2', 19.4, 7.6, ['|00⟩', '|01⟩', '|10⟩', '|11⟩'], [.707, .707, 0, 0], 2, { sc: 2.0, c: 'ok', vt: v => v ? '0.707' : '0' });
      F(S, 'tp', 19.0, 8.9, ['|01⟩ 진폭 = (q1이 0일 진폭) × (q0이 1일 진폭) = 1 × 0.707', 'amp of |01⟩ = (q1 at 0) × (q0 at 1) = 1 × 0.707'], 'a', 2, { w: 12.4 });
      [['n', ['진폭 수', 'amplitudes'], ['메모리', 'memory']]].concat(TB).forEach((r, i) => r.forEach((c, j) => T(S, 'tb' + i + '_' + j, [1.0, 4.0, 10.0][j], 7.0 + i * .9, c, 'cz-mono qcx-xs' + (i ? '' : ' qcx-a') + (j === 2 && i ? ' qcx-r' : ''), j === 2 ? 4 : 3, { w: [2.6, 5.6, 7.0][j] })));
      lbl(S, 'gr', 1, 12.6, ['50큐비트만 돼도 상태를 그대로 저장할 수 없어요', 'even 50 qubits cannot be stored directly'], 'r', 4, { w: 16.0 });
    },
    notes: [['큐비트가 둘이면 각각 상태를 가진 것처럼 보일 수 있어요 · q0은 |+⟩, q1은 |0⟩이에요', 'with two qubits each may seem to have its own state: q0 is |+⟩ and q1 is |0⟩'], ['두 큐비트 전체 상태는 텐서곱(크로네커 곱)으로 만든 4개의 진폭이에요 · |01⟩의 진폭은 1 × 0.707 = 0.707이에요', 'the joint state is the tensor (Kronecker) product, four amplitudes in all; the amplitude of |01⟩ is 1 × 0.707 = 0.707'], ['큐비트가 하나 늘 때마다 진폭 수가 두 배가 돼요 · n큐비트는 2^n개, 50큐비트는 약 10^15개예요', 'every added qubit doubles the number of amplitudes: n qubits have 2^n, and 50 qubits about 10^15'], ['진폭 하나가 복소수 16바이트라 50큐비트 상태는 약 18 PB예요 · 고전 컴퓨터로 그대로 시뮬레이션하기 어려운 이유이자 양자 컴퓨터의 잠재력이에요', 'each amplitude is a 16-byte complex number, so a 50-qubit state takes about 18 PB, which is why classical simulation struggles and where quantum computers’ potential lies']],
    fin: [['n큐비트 상태 = 2^n개의 진폭 (텐서곱)', 'an n-qubit state holds 2^n amplitudes (a tensor product)', 'qcx-xs qcx-a'], ['하지만 측정으로 얻는 건 n비트뿐이에요', 'yet measurement returns only n bits'], ['큐비트 순서 표기는 라이브러리마다 달라요 (Qiskit은 오른쪽이 q0)', 'qubit ordering conventions differ (Qiskit puts q0 on the right)']],
    caps: [['큐비트 둘', 'Two qubits'], ['텐서곱', 'The tensor product'], ['지수적 증가', 'Exponential growth'], ['메모리', 'Memory'], ['여러 큐비트', 'Multiple qubits']]
  });
}

function sEntangle() {
  const SHT = ['11', '00', '00', '11', '00', '11'];
  return CW('qc-entangle', {
    code: ['bell = (k00 + k11) / 2**0.5  # |00⟩+|11⟩', 'probs = abs(bell)**2         # [.5, 0, 0, .5]', ['# q0이 0이면 q1도 0, 1이면 1: 완전한 상관', '# q0 = 0 ⇒ q1 = 0; q0 = 1 ⇒ q1 = 1'], ['# 두 큐비트 각각의 상태로 나눠 쓸 수 없음', '# cannot be split into two qubit states'], ['# 상관만 있을 뿐 빛보다 빠른 통신은 불가', '# correlation, but no faster-than-light signal']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'danger']],
    draw: (S) => {
      AMP(S, 'am', 19.4, 3.2, ['|00⟩', '|01⟩', '|10⟩', '|11⟩'], [.707, 0, 0, .707], 1, { sc: 2.2, vt: v => v ? '0.707' : '0' });
      lbl(S, 'aml', 26.0, 1.4, ['벨 상태: |00⟩과 |11⟩에만 진폭', 'Bell state: amplitude only on |00⟩ and |11⟩'], 'a', 1, { w: 5.4 });
      AMP(S, 'pm', 19.4, 7.4, ['00', '01', '10', '11'], [.503, 0, 0, .497], 2, { sc: 2.6, c: 'warn', vt: v => String(Math.round(v * 1000)) });
      lbl(S, 'pml', 26.0, 5.4, ['1,000번: 00이 503번, 11이 497번, 01·10은 0번', '1,000 shots: 00 ×503, 11 ×497, never 01 or 10'], 'w', 2, { w: 5.4 });
      SHT.forEach((s, i) => chip(S, 'sh' + i, 19.0 + i * 2.1, 8.9, 1.8, s, 'ok', 3, { h: .9 }));
      lbl(S, 'shl', 19.0, 10.1, ['각자는 무작위지만 둘은 항상 같아요: 한쪽을 보면 다른 쪽을 알아요', 'each alone is random, yet the two always match: one result reveals the other'], 'g', 3, { w: 12.4 });
      F(S, 'pf', 1, 7.1, '(a|0⟩ + b|1⟩) ⊗ (c|0⟩ + d|1⟩) = ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩', 'a', 4, { w: 16.0 });
      lbl(S, 'pf2', 1, 8.8, ['ad = 0이면 a나 d가 0인데, 그러면 ac나 bd도 0 → 벨 상태는 곱으로 못 써요', 'ad = 0 forces a or d to 0, which zeroes ac or bd, so the Bell state is no product'], 'r', 4, { w: 16.0 });
      lbl(S, 'ns', 1, 10.6, ['멀리 떨어져도 상관은 유지되지만, 결과가 무작위라 신호를 보낼 수는 없어요', 'the correlation survives any distance, but outcomes are random, so no signal can be sent'], '', 4, { w: 16.0 });
    },
    notes: [['벨 상태 (|00⟩ + |11⟩)/√2는 |00⟩과 |11⟩에만 진폭 0.707이 있어요', 'the Bell state (|00⟩ + |11⟩)/√2 has amplitude 0.707 on |00⟩ and |11⟩ only'], ['측정하면 00과 11이 반반씩 나오고 01, 10은 절대 나오지 않아요 · 1,000번이면 503번과 497번처럼요', 'measuring gives 00 and 11 half the time each and never 01 or 10, for example 503 and 497 out of 1,000'], ['각 큐비트만 보면 무작위지만 둘은 항상 같아요 · 한쪽 결과를 보면 다른 쪽 결과를 바로 알아요', 'each qubit alone looks random, yet the two always agree, so one result immediately reveals the other'], ['이 상태는 두 큐비트 각각의 상태의 곱으로 쓸 수 없어서 얽힘이라 불러요 · 상관은 거리와 상관없이 유지되지만 결과가 무작위라 빛보다 빠른 통신은 못 해요', 'the state cannot be written as a product of single-qubit states, which is what entanglement means; the correlation holds at any distance, but random outcomes rule out faster-than-light signaling']],
    fin: [['얽힘: 곱으로 나눌 수 없는 여러 큐비트 상태', 'entanglement: a multi-qubit state that is not a product of single-qubit states', 'qcx-xs qcx-a'], ['순간이동, 초고밀도 코딩, 양자 키 분배의 자원이에요', 'it powers teleportation, superdense coding and quantum key distribution'], ['여러 기준에서 동시에 상관이 나타나 고전적 설명을 넘어요 (벨 부등식 위반)', 'correlations across several bases at once defy classical explanation (Bell inequality violations)']],
    caps: [['벨 상태', 'The Bell state'], ['측정 통계', 'Measurement statistics'], ['완전한 상관', 'Perfect correlation'], ['곱으로 못 쓰는 상태', 'Not a product'], ['얽힘', 'Entanglement']]
  });
}
/* ===== Quantum · 2. gates and circuits ===== */
function sPauli() {
  const c = [4.2, 10.4], r = 2.2, arc = [...Array(25)].map((_, i) => { const t = i / 24 * Math.PI; return BP(c, r, [0, -Math.sin(t), Math.cos(t)]); });
  return CW('qc-pauli', {
    code: ['X = np.array([[0,1],[1,0]])  # NOT', ['Z = np.diag([1, -1])         # 부호 반전', 'Z = np.diag([1, -1])         # sign flip'], 'Y = 1j * X @ Z               # [[0,−i],[i,0]]', ['X @ X                        # 두 번이면 제자리', 'X @ X                        # twice = I'], ['# 블로흐 구에서 x, y, z축으로 180° 회전', '# 180° turns about the x, y, z axes']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2]],
    draw: (S) => {
      lbl(S, 'xr', 19.0, .3, ['X: 비트 뒤집기', 'X: bit flip'], 'a', 1);
      AMP(S, 'xb', 19.4, 2.9, [ket(0), ket(1)], [1, 0], 1, { sc: 1.6 }); arw(S, 'xa', [22.8, 2.1], [23.8, 2.1], 1); AMP(S, 'xc', 24.2, 2.9, [ket(0), ket(1)], [0, 1], 1, { sc: 1.6 });
      F(S, 'xf', 27.6, 1.7, 'X|0⟩ = |1⟩', 'a', 1, { w: 3.8 });
      lbl(S, 'zr', 19.0, 3.9, ['Z: |1⟩ 쪽 부호 뒤집기', 'Z: flips the sign of |1⟩'], 'w', 2);
      AMP(S, 'zb', 19.4, 6.0, [ket(0), ket(1)], [.707, .707], 2, { sc: 1.6, lo: 1.3 }); arw(S, 'za', [22.8, 5.4], [23.8, 5.4], 2); AMP(S, 'zc', 24.2, 6.0, [ket(0), ket(1)], [.707, -.707], 2, { sc: 1.6, lo: 1.3 });
      F(S, 'zf', 27.6, 5.0, 'Z|+⟩ = |−⟩', 'w', 2, { w: 3.8 });
      lbl(S, 'zn', 19.0, 7.9, ['확률(제곱)은 그대로지만 부호가 바뀌어 다음 간섭이 달라져요', 'the probabilities (squares) stay the same, but the sign changes later interference'], '', 2, { w: 12.4 });
      F(S, 'yf', 19.0, 9.4, 'Y = iXZ:  Y|0⟩ = i|1⟩,  Y|1⟩ = −i|0⟩', 'g', 3, { w: 12.4 });
      lbl(S, 'yl', 19.0, 10.4, ['비트와 위상을 함께 뒤집어요', 'it flips the bit and the phase together'], '', 3, { w: 12.4 });
      SV(S, 'bs', blochSV(c, r).concat([zA(c, BP(c, r, [0, 0, 1]), 'accent', .08), zW(arc, 'warn', .05, true), zA(c, BP(c, r, [0, 0, -1]), 'ok', .08)]), 4, { box: [0, 0, 18, 15] });
      T(S, 'b0', c[0] - .7, c[1] - r - .85, ket(0), 'cz-mono cz-tc qcx-xs', 4, { w: 1.4 }); T(S, 'b1', c[0] - .7, c[1] + r + .2, ket(1), 'cz-mono cz-tc qcx-xs', 4, { w: 1.4 });
      lbl(S, 'rx', 7.6, 8.0, ['X = x축으로 180° 회전: 북극 |0⟩ → 남극 |1⟩', 'X is a 180° turn about x: north |0⟩ → south |1⟩'], 'w', 4, { w: 10.0 });
      lbl(S, 'ry', 7.6, 9.8, ['Z = z축, Y = y축으로 180° · 두 번 돌리면 제자리(X² = I)', 'Z turns 180° about z and Y about y; twice returns to the start (X² = I)'], '', 4, { w: 10.0 });
    },
    notes: [['X 게이트는 고전 NOT처럼 |0⟩과 |1⟩을 바꿔요 · 행렬 [[0, 1], [1, 0]]이 두 진폭의 자리를 맞바꾸죠', 'the X gate swaps |0⟩ and |1⟩ like a classical NOT; its matrix [[0, 1], [1, 0]] exchanges the two amplitudes'], ['Z 게이트는 |1⟩ 쪽 진폭의 부호만 뒤집어요 · |+⟩가 |−⟩로 바뀌어도 측정 확률은 그대로지만, 이후 간섭 결과가 달라져요', 'the Z gate flips only the sign of the |1⟩ amplitude: turning |+⟩ into |−⟩ leaves the probabilities unchanged but changes later interference'], ['Y = iXZ는 비트와 위상을 함께 뒤집어요 · Y|0⟩ = i|1⟩이에요', 'Y = iXZ flips the bit and the phase together: Y|0⟩ = i|1⟩'], ['세 게이트는 블로흐 구에서 각각 x, y, z축으로 180° 회전이에요 · 두 번 걸면 제자리라 X² = Y² = Z² = I예요', 'on the Bloch sphere the three are 180° turns about the x, y and z axes, so applying any of them twice returns to the start: X² = Y² = Z² = I']],
    fin: [['파울리 X·Y·Z: 비트 반전, 둘 다, 위상 반전 (각 축 180° 회전)', 'Pauli X, Y, Z: bit flip, both, phase flip (180° turns about each axis)', 'qcx-xs qcx-a'], ['양자 게이트는 유니터리 행렬이라 되돌릴 수 있어요', 'quantum gates are unitary matrices, so they are reversible'], ['오류 정정에서는 오류를 X(비트)와 Z(위상) 오류로 나눠 다뤄요', 'error correction treats errors as X (bit) and Z (phase) errors']],
    caps: [['X 게이트', 'The X gate'], ['Z 게이트', 'The Z gate'], ['Y 게이트', 'The Y gate'], ['구의 회전', 'Rotations of the sphere'], ['파울리 게이트', 'Pauli gates']]
  });
}

function sHad() {
  return CW('qc-hadamard', {
    code: ['H = np.array([[1, 1], [1, -1]]) / 2**0.5', 'H @ [1, 0]           # |+⟩ = [0.707, 0.707]', ['H @ [0.707, 0.707]   # |0⟩: |1⟩ 쪽이 상쇄', 'H @ [0.707, 0.707]   # |0⟩: |1⟩ cancels'], 'H @ [0.707, -0.707]  # |1⟩', ['# 간섭: 진폭이 더해지거나 지워져요', '# interference: amplitudes add or cancel']],
    hl: [[0, 1], [1, 1, 'accent'], [2, 1, 'ok'], [3, 2, 'warn']],
    draw: (S) => {
      F(S, 'hm', 19.0, .4, 'H = (1/√2) [[1, 1], [1, −1]]', 'a', 1, { w: 12.4 });
      lbl(S, 'hd1', 19.0, 1.4, ['기저 상태를 반반 중첩으로 바꾸는 게이트', 'it turns a basis state into an even superposition'], '', 1, { w: 12.4 });
      AMP(S, 'a0', 19.4, 5.0, [ket(0), ket(1)], [1, 0], 2, { sc: 1.8 }); arw(S, 'ah', [22.8, 4.1], [23.8, 4.1], 2); AMP(S, 'a1', 24.2, 5.0, [ket(0), ket(1)], [.707, .707], 2, { sc: 1.8 });
      F(S, 'hp', 27.6, 3.6, 'H|0⟩ = |+⟩', 'a', 2, { w: 3.8 });
      F(S, 'c0', 19.0, 6.3, ['|0⟩: (0.707 + 0.707) / √2 = 1  보강', '|0⟩: (0.707 + 0.707) / √2 = 1  adds'], 'g', 3, { w: 12.4 });
      F(S, 'c1', 19.0, 7.3, ['|1⟩: (0.707 − 0.707) / √2 = 0  상쇄', '|1⟩: (0.707 − 0.707) / √2 = 0  cancels'], 'r', 3, { w: 12.4 });
      AMP(S, 'a2', 19.4, 10.4, [ket(0), ket(1)], [1, 0], 3, { sc: 1.8, c: 'ok' }); F(S, 'hz', 24.0, 9.2, 'H|+⟩ = |0⟩', 'g', 3, { w: 6.0 });
      F(S, 'hm2', 1, 7.2, 'H|−⟩ = |1⟩,   H · H = I', 'w', 4, { w: 16.0 });
      lbl(S, 'cn', 1, 8.3, ['무작위로 섞은 동전을 다시 섞으면 여전히 무작위지만, H를 두 번 걸면 처음 상태로 돌아와요', 'reshuffling a random coin stays random, but applying H twice returns the original state'], '', 4, { w: 16.0 });
      lbl(S, 'cr', 1, 10.1, ['이 상쇄를 설계하는 것이 양자 알고리즘의 핵심이에요', 'designing these cancellations is the core of quantum algorithms'], 'a', 4, { w: 16.0 });
    },
    notes: [['아다마르 게이트 H = (1/√2)[[1, 1], [1, −1]]은 기저 상태를 반반 중첩으로 바꿔요', 'the Hadamard gate H = (1/√2)[[1, 1], [1, −1]] turns a basis state into an even superposition'], ['H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩예요 · 측정하면 0과 1이 반반이에요', 'H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩, which measures as 0 or 1 half the time each'], ['|+⟩에 H를 한 번 더 걸면 |0⟩의 진폭은 (0.707 + 0.707)/√2 = 1로 보강되고, |1⟩은 (0.707 − 0.707)/√2 = 0으로 상쇄돼요 · 이것이 간섭이에요', 'applying H to |+⟩ again reinforces |0⟩ to (0.707 + 0.707)/√2 = 1 and cancels |1⟩ to (0.707 − 0.707)/√2 = 0: interference'], ['마찬가지로 H|−⟩ = |1⟩이고 H를 두 번 걸면 원래대로예요 · 확률은 섞을수록 무작위해지지만 진폭은 상쇄될 수 있어서, 이 간섭을 설계하는 것이 양자 알고리즘의 핵심이에요', 'likewise H|−⟩ = |1⟩, and two Hadamards undo each other; probabilities only get more random when mixed, but amplitudes can cancel, and engineering that interference is the core of quantum algorithms']],
    fin: [['H: |0⟩ → |+⟩, |1⟩ → |−⟩, 두 번이면 원래대로', 'H maps |0⟩ → |+⟩ and |1⟩ → |−⟩, and twice is the identity', 'qcx-xs qcx-a'], ['n개 큐비트에 H를 걸면 2^n개 상태의 균등 중첩', 'H on each of n qubits gives a uniform superposition of 2^n states'], ['Z 기준과 X 기준을 서로 바꿔 주는 게이트예요', 'it swaps the Z and X bases']],
    caps: [['아다마르 행렬', 'The Hadamard matrix'], ['중첩 만들기', 'Creating superposition'], ['간섭', 'Interference'], ['되돌리기', 'Undoing it'], ['아다마르 게이트', 'The Hadamard gate']]
  });
}

function sPhase() {
  const P = PF(20.6, 3.6, 10.2, 3.4, 0, 2 * Math.PI, 0, 1), f = p => Math.pow(Math.cos(p / 2), 2), c = [4.2, 10.6], r = 2.2;
  return CW('qc-phase', {
    code: ['def circuit(phi):', '    return H @ Rz(phi) @ H @ [1, 0]', 'p0 = abs(circuit(phi)[0])**2   # cos²(φ/2)', '# φ = 0 → 1,  φ = π/2 → 0.5,  φ = π → 0', ['# S = Rz(π/2), T = Rz(π/4) (전체 위상 무시)', '# S = Rz(π/2), T = Rz(π/4), up to global phase']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      wires(S, 'w', 20.0, 30.8, [1.4], 1); T(S, 'wk', 18.9, 1.05, ket(0), 'cz-mono qcx-xs', 1, { w: 1.1 });
      gate(S, 'g1', 21.4, 1.4, 'H', 'accent', 1); gate(S, 'g2', 24.2, 1.4, 'Rz(φ)', 'warn', 1, { w: 2.2 }); gate(S, 'g3', 27.0, 1.4, 'H', 'accent', 1); gate(S, 'g4', 29.6, 1.4, 'M', 'ink', 1);
      axes(S, 'ax', P, 2); curve(S, 'cv', P, f, 2, { color: 'accent', n: 60 }); ticks(S, 'tk', P, [[0, '0'], [Math.PI, 'π'], [2 * Math.PI, '2π']], [[1, '1']], 2, { yb: P.y0 + P.h + .12 });
      lbl(S, 'pl', 19.0, 2.5, ['P(0) = cos²(φ/2)', 'P(0) = cos²(φ/2)'], 'm a', 2);
      [[0, 1], [Math.PI / 2, .5], [Math.PI, 0]].forEach(([x, y], i) => pt(S, 'p' + i, P.X(x), P.Y(y), 3, C.warn, .15));
      F(S, 'pv', 19.0, 8.1, 'φ = 0 → 1,   π/2 → 0.5,   π → 0', 'w', 3, { w: 12.4 });
      lbl(S, 'pe', 19.0, 9.1, ['위상 φ는 혼자서는 안 보이지만 간섭을 바꿔 결과를 바꿔요', 'φ is invisible on its own but steers the interference and so the result'], '', 3, { w: 12.4 });
      lbl(S, 'st', 19.0, 10.6, ['S = Rz(π/2), T = Rz(π/4): 적도를 따라 90°, 45° 회전', 'S = Rz(π/2) and T = Rz(π/4) turn 90° and 45° along the equator'], 'a', 4, { w: 12.4 });
      SV(S, 'bs', blochSV(c, r).concat([zA(c, BP(c, r, bvec(Math.PI / 2, 0)), 'accent', .08), zA(c, BP(c, r, bvec(Math.PI / 2, Math.PI / 4)), 'warn', .08), zA(c, BP(c, r, bvec(Math.PI / 2, Math.PI / 2)), 'ok', .08)]), 4, { box: [0, 0, 18, 15] });
      lbl(S, 'sl', 7.6, 8.4, [ket('+') + '(파랑) → T(주황) → S(초록)', ket('+') + ' (blue) → T (orange) → S (green)'], '', 4, { w: 10.0 });
      lbl(S, 'su', 7.6, 9.9, ['H, S, T, CNOT만으로 어떤 계산이든 근사할 수 있어요', 'H, S, T and CNOT can approximate any computation'], 'g', 4, { w: 10.0 });
    },
    notes: [['위상 게이트 Rz(φ)는 |0⟩과 |1⟩의 상대 위상만 φ만큼 바꿔요 · 블로흐 구에서 z축 회전이라 높이, 곧 측정 확률은 그대로예요', 'the phase gate Rz(φ) changes only the relative phase of |0⟩ and |1⟩ by φ, a rotation about z that leaves the height, and so the probabilities, unchanged'], ['하지만 앞뒤에 H를 두면 달라져요 · H Rz(φ) H|0⟩에서 0이 나올 확률은 cos²(φ/2)로 φ에 따라 1에서 0까지 바뀌어요', 'sandwiched between Hadamards it matters: in H Rz(φ) H|0⟩ the probability of 0 is cos²(φ/2), sweeping from 1 to 0 as φ changes'], ['φ = 0이면 1, π/2면 0.5, π면 0이에요 · 직접 보이지 않는 위상이 간섭을 통해 측정 결과를 결정해요', 'φ = 0 gives 1, π/2 gives 0.5 and π gives 0, so an invisible phase decides the measured result through interference'], ['자주 쓰는 위상 게이트는 S = Rz(π/2)와 T = Rz(π/4)예요(전체 위상 무시) · H, S, T와 CNOT 조합으로 어떤 계산이든 원하는 정확도로 근사할 수 있어요', 'the common phase gates are S = Rz(π/2) and T = Rz(π/4), up to a global phase, and combinations of H, S, T and CNOT approximate any computation to any desired accuracy']],
    fin: [['위상은 혼자서는 안 보이지만 간섭으로 결과를 바꿔요', 'phase is invisible on its own but changes results through interference', 'qcx-xs qcx-a'], ['H Rz(φ) H|0⟩ → P(0) = cos²(φ/2)', 'H Rz(φ) H|0⟩ gives P(0) = cos²(φ/2)'], ['{H, S, T, CNOT}는 범용 게이트 집합이에요', '{H, S, T, CNOT} is a universal gate set']],
    caps: [['위상 회로', 'A phase circuit'], ['P(0) 곡선', 'The P(0) curve'], ['세 점', 'Three points'], ['S와 T', 'S and T'], ['위상 게이트', 'Phase gates']]
  });
}

function sCNOT() {
  const TT = [['00', '00', 0], ['01', '11', 1], ['10', '10', 0], ['11', '01', 1]], L4 = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
  return CW('qc-cnot', {
    code: ['qc = QuantumCircuit(2)', 'qc.h(0)                # (|00⟩ + |01⟩)/√2', ['qc.cx(0, 1)            # q0이 1이면 q1 뒤집기', 'qc.cx(0, 1)            # flip q1 if q0 is 1'], ['# 결과: (|00⟩ + |11⟩)/√2 = 벨 상태', '# result: (|00⟩ + |11⟩)/√2, a Bell state'], ['# 진리표(q1q0): 01→11, 11→01, 나머지 그대로', '# truth table (q1q0): 01→11, 11→01, rest same']],
    hl: [[0, 1], [1, 1, 'accent'], [2, 1, 'warn'], [3, 2, 'ok']],
    draw: (S) => {
      wires(S, 'w', 19.8, 30.8, [1.2, 2.6], 1); T(S, 'n0', 18.8, .85, 'q0', 'cz-mono qcx-xs', 1, { w: 1.0 }); T(S, 'n1', 18.8, 2.25, 'q1', 'cz-mono qcx-xs', 1, { w: 1.0 });
      gate(S, 'gh', 21.8, 1.2, 'H', 'accent', 2); SV(S, 'cx', cxSV(24.8, 1.2, 2.6, 'warn'), 3);
      AMP(S, 'sa0', 19.4, 6.4, L4, [1, 0, 0, 0], 1, { sc: 1.8, c: 'ink-3', off: 2 }); lbl(S, 'l0', 26.4, 4.4, ['시작: |00⟩', 'start: |00⟩'], 'm', 1, { off: 2, w: 5.0 });
      AMP(S, 'sa1', 19.4, 6.4, L4, [.707, .707, 0, 0], 2, { sc: 1.8, off: 3 }); lbl(S, 'l1', 26.4, 4.4, ['H 후: (|00⟩ + |01⟩)/√2', 'after H: (|00⟩ + |01⟩)/√2'], 'a', 2, { off: 3, w: 5.0 });
      AMP(S, 'sa2', 19.4, 6.4, L4, [.707, 0, 0, .707], 3, { sc: 1.8, c: 'ok' }); lbl(S, 'l2', 26.4, 4.4, ['CNOT 후: (|00⟩ + |11⟩)/√2', 'after CNOT: (|00⟩ + |11⟩)/√2'], 'g', 3, { w: 5.0 });
      lbl(S, 'l3', 19.0, 7.6, ['|01⟩(q0 = 1)만 |11⟩로 바뀌어 벨 상태가 됐어요', 'only |01⟩ (q0 = 1) moved to |11⟩, giving a Bell state'], 'w', 3, { w: 12.4 });
      [[['입력', 'in'], ['출력', 'out']]].concat(TT.map(([a, b]) => [a, b])).forEach((r, i) => r.forEach((t, j) => T(S, 'tt' + i + '_' + j, 1.0 + j * 4.0, 7.1 + i * .85, t, 'cz-mono qcx-xs' + (i === 0 ? ' qcx-a' : TT[i - 1][2] ? ' qcx-w' : ''), 4, { w: 3.6 })));
      lbl(S, 'tn', 9.4, 7.2, ['q1q0 순서 · 제어 q0이 1인 줄만 q1이 바뀌어요', 'order q1q0; q1 changes only where the control q0 is 1'], '', 4, { w: 8.2 });
      lbl(S, 'te', 1, 11.6, ['제어 큐비트가 중첩이면 결과가 얽힘이 돼요', 'when the control is in superposition, the output is entangled'], 'g', 4, { w: 16.0 });
    },
    notes: [['CNOT은 두 큐비트 게이트예요 · 제어 큐비트 q0이 1일 때만 대상 큐비트 q1을 뒤집어요 · 시작은 |00⟩이에요', 'CNOT is a two-qubit gate that flips the target q1 only when the control q0 is 1; we start from |00⟩'], ['q0에 H를 걸면 (|00⟩ + |01⟩)/√2가 돼요 · 아직은 각 큐비트 상태의 곱이에요', 'applying H to q0 gives (|00⟩ + |01⟩)/√2, still a product of single-qubit states'], ['CNOT을 걸면 q0이 1인 |01⟩만 |11⟩로 바뀌어 (|00⟩ + |11⟩)/√2, 곧 벨 상태가 돼요 · 고전 XOR처럼 동작했을 뿐인데 제어가 중첩이라 얽힘이 생겼어요', 'CNOT moves only |01⟩, where q0 is 1, to |11⟩, giving (|00⟩ + |11⟩)/√2, a Bell state: it acted like a classical XOR, but a control in superposition produced entanglement'], ['진리표로는 01 → 11, 11 → 01이고 나머지는 그대로예요 · H와 CNOT의 조합이 얽힘을 만드는 가장 기본적인 회로예요', 'its truth table maps 01 → 11 and 11 → 01 and leaves the rest alone; H followed by CNOT is the basic entangling circuit']],
    fin: [['CNOT: 제어가 1이면 대상 뒤집기 (양자 XOR)', 'CNOT flips the target when the control is 1 (a quantum XOR)', 'qcx-xs qcx-a'], ['H + CNOT = 벨 상태: 얽힘을 만드는 기본 회로', 'H + CNOT makes a Bell state, the basic entangling circuit'], ['하드웨어에서는 2큐비트 게이트가 1큐비트 게이트보다 오류가 커요', 'on hardware, two-qubit gates are noisier than single-qubit ones']],
    caps: [['두 큐비트 회로', 'A two-qubit circuit'], ['H 다음', 'After H'], ['CNOT 다음', 'After CNOT'], ['진리표', 'The truth table'], ['CNOT과 얽힘', 'CNOT and entanglement']]
  });
}

function sCircuit() {
  return CW('qc-circuit', {
    code: [['qc = QuantumCircuit(2, 2)   # 큐비트 2, 비트 2', 'qc = QuantumCircuit(2, 2)   # 2 qubits, 2 bits'], 'qc.h(0); qc.cx(0, 1)', ['qc.measure([0, 1], [0, 1])  # 측정 → 고전 비트', 'qc.measure([0, 1], [0, 1])  # → classical bits'], 'job = backend.run(qc, shots=1024)', 'counts = job.result().get_counts()'],
    hl: [[0, 1], [1, 1, 'accent'], [2, 1, 'warn'], [3, 2, 'ok']],
    draw: (S) => {
      wires(S, 'w', 19.8, 30.8, [1.2, 2.5], 1); hl(S, 'c1', 19.8, 30.8, 3.75, 'ink-3', 1, { w: .04 }); hl(S, 'c2', 19.8, 30.8, 3.9, 'ink-3', 1, { w: .04 });
      [['q0', .85], ['q1', 2.15], ['c', 3.45]].forEach(([t, y], i) => T(S, 'n' + i, 18.8, y, t, 'cz-mono qcx-xs', 1, { w: 1.0 }));
      lbl(S, 'tl', 19.0, 4.5, ['시간은 왼쪽 → 오른쪽, 아래 이중선은 고전 비트', 'time runs left to right; the double line holds classical bits'], 'm', 1, { w: 12.4 });
      gate(S, 'gh', 21.8, 1.2, 'H', 'accent', 2); SV(S, 'cx', cxSV(24.4, 1.2, 2.5, 'warn'), 2);
      gate(S, 'm0', 27.0, 1.2, 'M', 'ink', 3); gate(S, 'm1', 28.8, 2.5, 'M', 'ink', 3);
      SV(S, 'ml', [zA([27.0, 1.65], [27.0, 3.7], 'ink-2', .04), zA([28.8, 2.95], [28.8, 3.7], 'ink-2', .04)], 3);
      lbl(S, 'mt', 19.0, 6.0, ['한 번 실행하면 비트열 하나: 예) 11', 'one run gives one bit string, for example 11'], 'w', 3, { w: 12.4 });
      AMP(S, 'hg', 19.6, 10.6, ['00', '01', '10', '11'], [.506, 0, 0, .494], 4, { w: 1.6, sc: 5.0, c: 'ok', vt: (v, i) => String([518, 0, 0, 506][i]) });
      lbl(S, 'hgl', 27.0, 7.4, ['1,024번: 00과 11만, 거의 반반', '1,024 shots: only 00 and 11, about half each'], 'g', 4, { w: 4.4 });
      lbl(S, 'dw', 1, 7.0, ['폭(width) = 큐비트 2개, 깊이(depth) = 3층 (H, CNOT, 측정)', 'width = 2 qubits, depth = 3 layers (H, CNOT, measure)'], 'a', 4, { w: 16.0 });
      lbl(S, 'nz', 1, 8.6, ['실제 하드웨어에서는 노이즈 때문에 01, 10도 조금 나와요', 'on real hardware, noise adds a few 01 and 10 results'], 'r', 4, { w: 16.0 });
      lbl(S, 'sh', 1, 10.0, ['shots가 많을수록 확률 추정이 정확해져요 (오차 ∝ 1/√shots)', 'more shots give more precise estimates (error ∝ 1/√shots)'], '', 4, { w: 16.0 });
    },
    notes: [['양자 회로는 가로선(큐비트)과 그 위의 게이트로 그려요 · 시간은 왼쪽에서 오른쪽으로 흐르고, 아래 이중선은 측정 결과를 담는 고전 비트예요', 'a quantum circuit is drawn as horizontal wires (qubits) carrying gates; time runs left to right, and the double line below holds classical bits for measurement results'], ['q0에 H, 이어서 CNOT을 걸어 벨 상태를 만들어요', 'H on q0 followed by CNOT prepares a Bell state'], ['측정이 각 큐비트의 결과를 고전 비트에 기록해요 · 한 번 실행하면 비트열 하나를 얻어요', 'measurement writes each qubit’s outcome into a classical bit, and one run yields a single bit string'], ['같은 회로를 1,024번(shots) 실행해 결과를 세면 00이 518번, 11이 506번처럼 나와요 · 양자 프로그램의 출력은 이런 확률 분포예요', 'running the circuit 1,024 times (shots) and counting gives something like 518 × 00 and 506 × 11: the output of a quantum program is such a distribution']],
    fin: [['회로 = 큐비트 선 + 게이트 + 측정, 출력 = 여러 번 실행한 분포', 'a circuit is wires, gates and measurements; its output is a distribution over many shots', 'qcx-xs qcx-a'], ['폭은 큐비트 수, 깊이는 게이트 층 수예요', 'width is the qubit count and depth the number of gate layers'], ['깊이가 깊을수록 노이즈가 쌓여요', 'deeper circuits accumulate more noise']],
    caps: [['회로 그림', 'Circuit diagrams'], ['게이트 놓기', 'Placing gates'], ['측정', 'Measurement'], ['shots와 분포', 'Shots and distributions'], ['양자 회로', 'Quantum circuits']]
  });
}

function sNoClone() {
  const L4 = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
  return CW('qc-nocloning', {
    code: [['# 복사 시도: CNOT(q0 → q1), q1은 |0⟩에서 시작', '# try copying with CNOT; q1 starts at |0⟩'], ['cp(|0⟩) = |00⟩; cp(|1⟩) = |11⟩  # 성공', 'cp(|0⟩) = |00⟩; cp(|1⟩) = |11⟩  # works'], ['cp(|+⟩) = (|00⟩ + |11⟩)/√2      # 벨 상태', 'cp(|+⟩) = (|00⟩ + |11⟩)/√2      # Bell state'], ['want = (|00⟩+|01⟩+|10⟩+|11⟩)/2  # 다름', 'want = (|00⟩+|01⟩+|10⟩+|11⟩)/2  # differs'], ['# 선형성 때문에 모르는 상태는 복제 불가', '# linearity forbids copying unknown states']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'danger']],
    draw: (S) => {
      wires(S, 'w', 20.2, 23.6, [1.0, 2.2], 1); T(S, 'n0', 18.9, .65, '|ψ⟩', 'cz-mono qcx-xs', 1, { w: 1.2 }); T(S, 'n1', 18.9, 1.85, ket(0), 'cz-mono qcx-xs', 1, { w: 1.2 });
      SV(S, 'cx', cxSV(21.9, 1.0, 2.2, 'warn'), 1); lbl(S, 'cq', 19.0, 3.0, ['복사됐을까?', 'a copy?'], 'm', 1);
      F(S, 'b0', 24.6, .7, 'ψ = |0⟩ → |00⟩ ✓', 'g', 2, { w: 6.6 }); F(S, 'b1', 24.6, 1.7, 'ψ = |1⟩ → |11⟩ ✓', 'g', 2, { w: 6.6 });
      AMP(S, 'gt', 19.4, 6.6, L4, [.707, 0, 0, .707], 3, { sc: 2.0, c: 'warn', vt: v => v ? '0.707' : '0' });
      lbl(S, 'gl', 26.0, 4.4, ['ψ = |+⟩ → 얻은 것: 벨 상태', 'ψ = |+⟩ gives a Bell state'], 'w', 3, { w: 5.4 });
      AMP(S, 'wt', 19.4, 10.6, L4, [.5, .5, .5, .5], 4, { sc: 2.0, vt: v => '0.5' });
      lbl(S, 'wl', 26.0, 8.6, ['원한 것: |+⟩|+⟩ (네 진폭 모두 0.5) → 다름', 'wanted |+⟩|+⟩ (all four 0.5): different'], 'r', 4, { w: 5.4 });
      lbl(S, 'th', 1, 7.0, ['복제 불가 정리: 모르는 양자 상태를 똑같이 복사하는 장치는 없어요', 'the no-cloning theorem: no device can copy an unknown quantum state'], 'a', 4, { w: 16.0 });
      lbl(S, 'tl', 1, 8.6, ['게이트는 선형이라 |0⟩, |1⟩을 복사하면 그 중첩은 얽힘이 돼 버려요', 'gates are linear, so a circuit that copies |0⟩ and |1⟩ turns their superposition into entanglement'], '', 4, { w: 16.0 });
      lbl(S, 'tu', 1, 10.2, ['그래서 오류 정정은 복사 대신 얽힘으로 정보를 퍼뜨리고, BB84의 도청자는 들킬 수밖에 없어요', 'so error correction spreads information through entanglement instead of copies, and BB84 eavesdroppers cannot avoid detection'], 'g', 4, { w: 16.0 });
    },
    notes: [['CNOT으로 큐비트를 복사해 보면 어떨까요 · q1을 |0⟩으로 두고 q0을 제어로 CNOT을 걸어요', 'what if CNOT could copy a qubit? Set q1 to |0⟩ and apply CNOT with q0 as the control'], ['q0이 |0⟩이나 |1⟩이면 |00⟩, |11⟩이 되어 복사에 성공해요', 'if q0 is |0⟩ or |1⟩ the result is |00⟩ or |11⟩, a successful copy'], ['하지만 q0이 |+⟩면 결과는 (|00⟩ + |11⟩)/√2, 곧 벨 상태예요 · 게이트가 선형이라 기저 상태의 결과가 그대로 중첩되기 때문이에요', 'but if q0 is |+⟩ the result is (|00⟩ + |11⟩)/√2, a Bell state, because a linear gate simply superposes its results on the basis states'], ['원했던 |+⟩|+⟩는 네 진폭이 모두 0.5인 다른 상태예요 · 어떤 회로로도 모르는 상태를 복사할 수 없다는 것이 복제 불가 정리이고, 양자 암호와 오류 정정의 바탕이에요', 'the wanted |+⟩|+⟩ is a different state with all four amplitudes 0.5; that no circuit can copy an unknown state is the no-cloning theorem, a foundation of quantum cryptography and error correction']],
    fin: [['복제 불가 정리: 임의의 미지 양자 상태는 복사할 수 없어요', 'no-cloning: an arbitrary unknown quantum state cannot be copied', 'qcx-xs qcx-a'], ['알고 있는 상태는 다시 준비하면 되지만, 모르는 상태는 안 돼요', 'known states can be prepared again; unknown ones cannot be duplicated'], ['양자 상태는 백업을 만들 수 없다는 뜻이기도 해요', 'it also means quantum states cannot be backed up']],
    caps: [['복사 시도', 'Trying to copy'], ['기저 상태는 성공', 'Basis states work'], ['중첩은 실패', 'Superpositions fail'], ['복제 불가 정리', 'The no-cloning theorem'], ['복제 불가', 'No cloning']]
  });
}
/* ===== Quantum · 3. protocols and first algorithms ===== */
function sTeleport() {
  const CR = [['00', 'I'], ['01', 'X'], ['10', 'Z'], ['11', 'Z·X']];
  return CW('qc-teleport', {
    code: [['qc.h(1); qc.cx(1, 2)       # 앨리스-밥 벨 쌍', 'qc.h(1); qc.cx(1, 2)       # shared Bell pair'], ['qc.cx(0, 1); qc.h(0)       # 앨리스: ψ와 얽기', 'qc.cx(0, 1); qc.h(0)       # Alice entangles ψ'], ['m0, m1 = meas(0), meas(1)  # 2비트 전송', 'm0, m1 = meas(0), meas(1)  # send 2 bits'], ['if m1: qc.x(2)             # 밥이 보정', 'if m1: qc.x(2)             # Bob corrects'], 'if m0: qc.z(2)             # q2 = ψ'],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2, 'accent']],
    draw: (S) => {
      hl(S, 'w0', 20.0, 27.3, 1.0, 'ink-3', 1, { w: .05 }); hl(S, 'w1', 20.0, 27.3, 2.2, 'ink-3', 1, { w: .05 }); hl(S, 'w2', 20.0, 31.0, 3.4, 'ink-3', 1, { w: .05 });
      [['ψ', .65], [ket(0), 1.85], [ket(0), 3.05]].forEach(([t, y], i) => T(S, 'n' + i, 18.9, y, t, 'cz-mono qcx-xs', 1, { w: 1.1 }));
      gate(S, 'g1', 21.0, 2.2, 'H', 'accent', 1); SV(S, 'c1', cxSV(22.4, 2.2, 3.4, 'accent'), 1);
      SV(S, 'c2', cxSV(23.9, 1.0, 2.2, 'warn'), 2); gate(S, 'g2', 25.3, 1.0, 'H', 'warn', 2);
      gate(S, 'm0', 26.8, 1.0, 'M', 'ink', 3); gate(S, 'm1', 26.8, 2.2, 'M', 'ink', 3);
      SV(S, 'cls', [zW([[27.25, 2.2], [28.4, 2.2], [28.4, 2.95]], 'ok', .05, true), zW([[27.25, 1.0], [29.8, 1.0], [29.8, 2.95]], 'ok', .05, true)], 3);
      gate(S, 'bx', 28.4, 3.4, 'X', 'ok', 4); gate(S, 'bz', 29.8, 3.4, 'Z', 'ok', 4);
      lbl(S, 'l1', 19.0, 4.5, ['앨리스와 밥이 벨 쌍(q1, q2)을 미리 나눠 가져요', 'Alice and Bob share a Bell pair (q1, q2) in advance'], 'a', 1, { w: 12.4 });
      lbl(S, 'l2', 19.0, 5.9, ['앨리스가 보낼 상태 ψ(q0)를 자기 큐비트와 얽고 H', 'Alice entangles ψ (q0) with her half and applies H'], 'w', 2, { w: 12.4 });
      lbl(S, 'l3', 19.0, 7.3, ['측정 결과 2비트(m0, m1)를 고전 채널로 보내요', 'she measures and sends the 2 bits (m0, m1) over a classical channel'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4', 19.0, 8.7, ['밥은 m1이면 X, m0이면 Z를 걸어 ψ를 얻어요', 'Bob applies X if m1 and Z if m0, and now holds ψ'], 'a', 4, { w: 12.4 });
      [['m0 m1', ['밥의 보정', 'Bob applies']]].concat(CR).forEach((r, i) => r.forEach((t, j) => T(S, 'ct' + i + '_' + j, 1.0 + j * 4.4, 7.0 + i * .85, t, 'cz-mono qcx-xs' + (i ? '' : ' qcx-a'), 4, { w: 4.2 })));
      lbl(S, 'nf', 1, 11.6, ['고전 2비트가 도착해야 끝나서 빛보다 빠르지 않고, 앨리스의 원본은 측정으로 사라져요(복제 아님)', 'it waits for the classical bits, so nothing beats light, and Alice’s original is destroyed by measurement (no cloning)'], 'r', 4, { w: 16.0 });
    },
    notes: [['양자 순간이동은 큐비트를 직접 보내지 않고 상태 ψ를 옮기는 방법이에요 · 먼저 앨리스와 밥이 벨 쌍을 하나씩 나눠 가져요', 'quantum teleportation moves a state ψ without sending the qubit itself; first Alice and Bob each take one half of a Bell pair'], ['앨리스는 보낼 큐비트 ψ와 자기 쪽 벨 큐비트에 CNOT과 H를 걸어 셋을 얽어요', 'Alice applies CNOT and H to ψ and her half of the pair, entangling all three qubits'], ['앨리스가 두 큐비트를 측정하면 결과 2비트 m0, m1이 나와요 · 이 순간 밥의 큐비트는 ψ에 X나 Z가 걸린 네 가지 중 하나가 돼요', 'measuring her two qubits gives two bits m0 and m1, and Bob’s qubit becomes ψ with some combination of X and Z applied, one of four cases'], ['앨리스가 2비트를 고전 채널로 보내면 밥은 m1이면 X, m0이면 Z를 걸어 정확히 ψ를 얻어요 · 고전 통신이 필요해 빛보다 빠르지 않고, 원본은 측정으로 사라져 복제도 아니에요', 'once the two bits arrive over a classical channel, Bob applies X if m1 and Z if m0 and holds exactly ψ; the classical message keeps it slower than light, and the original is destroyed, so nothing is cloned']],
    fin: [['순간이동 = 벨 쌍 1개 + 고전 2비트로 큐비트 상태 1개 전송', 'teleportation = one Bell pair + two classical bits to move one qubit state', 'qcx-xs qcx-a'], ['물질이 아니라 상태가 옮겨가요', 'the state moves, not the matter'], ['양자 네트워크와 양자 중계기의 기본 연산이에요', 'it is the basic operation of quantum networks and repeaters']],
    caps: [['벨 쌍 나누기', 'Sharing a Bell pair'], ['앨리스의 연산', 'Alice’s operations'], ['측정과 2비트', 'Measurement and two bits'], ['밥의 보정', 'Bob’s correction'], ['양자 순간이동', 'Quantum teleportation']]
  });
}

function sDense() {
  const RW = [['00', 'I', 'Φ+'], ['01', 'X', 'Ψ+'], ['10', 'Z', 'Φ−'], ['11', 'Z·X', 'Ψ−']], XC = [19.0, 22.2, 25.4, 28.2], WC = [3.0, 3.0, 2.6, 3.2];
  return CW('qc-superdense', {
    code: [['qc.h(0); qc.cx(0, 1)      # 벨 쌍 공유', 'qc.h(0); qc.cx(0, 1)      # share a Bell pair'], ['if b1: qc.x(0)            # 앨리스: 2비트를', 'if b1: qc.x(0)            # Alice encodes'], ['if b0: qc.z(0)            # q0 하나에 인코딩', 'if b0: qc.z(0)            # two bits in q0'], ['qc.cx(0, 1); qc.h(0)      # 밥: 벨 측정', 'qc.cx(0, 1); qc.h(0)      # Bob decodes'], ['# 큐비트 1개로 고전 2비트 전송', '# one qubit carries two classical bits']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      chip(S, 'al', 19.0, .6, 3.6, ['앨리스', 'Alice'], 'warn', 1); chip(S, 'bo', 27.8, .6, 3.6, ['밥', 'Bob'], 'ok', 1);
      SV(S, 'bp', [zW([[22.7, 1.15], [27.7, 1.15]], 'accent', .06, true)], 1); lbl(S, 'bpl', 23.0, .2, ['벨 쌍', 'Bell pair'], 'a', 1, { w: 4.4, css: 'text-align:center' });
      lbl(S, 'pre', 19.0, 2.1, ['얽힘을 미리 나눠 둬요', 'entanglement shared beforehand'], 'm', 1, { w: 12.4 });
      [['보낼 비트', 'bits'], ['앨리스 연산', 'Alice'], ['상태', 'state'], ['밥이 읽은 값', 'Bob reads']].forEach((t, j) => T(S, 'h' + j, XC[j], 3.4, t, 'qcx-xs qcx-a', j < 3 ? 2 : 3, { w: WC[j] }));
      RW.forEach((r, i) => { r.forEach((t, j) => T(S, 'r' + i + '_' + j, XC[j], 4.3 + i * .85, t, 'cz-mono qcx-xs' + (j === 1 ? ' qcx-w' : ''), 2, { w: WC[j] })); T(S, 'r' + i + '_3', XC[3], 4.3 + i * .85, r[0], 'cz-mono qcx-xs qcx-g', 3, { w: WC[3] }); });
      lbl(S, 'bm', 19.0, 8.0, ['벨 측정(CNOT + H)으로 네 상태를 완벽히 구별해 2비트를 읽어요', 'a Bell measurement (CNOT + H) tells the four states apart, recovering both bits'], 'g', 3, { w: 12.4 });
      lbl(S, 'c1', 1, 7.0, ['보낸 큐비트는 1개지만 고전 2비트를 전해요 (벨 쌍이 미리 있어야 해요)', 'one qubit sent carries 2 classical bits, given a pre-shared Bell pair'], 'a', 4, { w: 16.0 });
      lbl(S, 'c2', 1, 8.6, ['얽힘 없이 큐비트 하나로는 고전 1비트까지만 보낼 수 있어요 (홀레보 한계)', 'without entanglement a qubit carries at most 1 classical bit (the Holevo bound)'], '', 4, { w: 16.0 });
      lbl(S, 'c3', 1, 10.2, ['순간이동과 짝: 순간이동은 2비트로 큐비트 1개, 초고밀도 코딩은 큐비트 1개로 2비트', 'the mirror of teleportation: there 2 bits move a qubit, here a qubit moves 2 bits'], 'g', 4, { w: 16.0 });
    },
    notes: [['초고밀도 코딩은 큐비트 하나로 고전 2비트를 보내요 · 먼저 앨리스와 밥이 벨 쌍을 나눠 가져요', 'superdense coding sends two classical bits with one qubit; first Alice and Bob share a Bell pair'], ['앨리스는 보낼 2비트에 따라 자기 큐비트에 I, X, Z, ZX 중 하나를 걸어요 · 그러면 둘의 상태가 서로 구별되는 네 벨 상태 중 하나가 돼요', 'depending on the two bits, Alice applies I, X, Z or ZX to her qubit alone, turning the pair into one of four distinguishable Bell states'], ['앨리스가 큐비트를 밥에게 보내면, 밥은 CNOT과 H로 벨 측정을 해 2비트를 그대로 읽어요', 'she sends her qubit to Bob, who performs a Bell measurement with CNOT and H and reads both bits'], ['얽힘 없이는 큐비트 하나로 1비트까지만 보낼 수 있어요(홀레보 한계) · 미리 나눈 얽힘이 용량을 두 배로 만든 셈이고, 순간이동과 짝을 이루는 프로토콜이에요', 'without entanglement a qubit can carry at most one bit (the Holevo bound), so the pre-shared entanglement doubles the capacity; the protocol mirrors teleportation']],
    fin: [['초고밀도 코딩: 벨 쌍 + 큐비트 1개 = 고전 2비트', 'superdense coding: a Bell pair plus one qubit carries two classical bits', 'qcx-xs qcx-a'], ['네 벨 상태는 서로 직교해서 완벽히 구별돼요', 'the four Bell states are orthogonal, so they are perfectly distinguishable'], ['큐비트 하나만 가로챈 도청자는 아무 정보도 못 얻어요', 'an eavesdropper intercepting the one qubit learns nothing']],
    caps: [['벨 쌍 공유', 'Sharing a Bell pair'], ['앨리스의 인코딩', 'Alice’s encoding'], ['밥의 벨 측정', 'Bob’s Bell measurement'], ['두 배의 용량', 'Double the capacity'], ['초고밀도 코딩', 'Superdense coding']]
  });
}

function sBB84() {
  const AB = [0, 1, 1, 0, 1, 0, 0, 1], BA = '+×++××+×', BB = '++×+×++×', BR = [0, 0, 1, 0, 1, 1, 0, 1], X = j => 22.4 + j * 1.12;
  const row = (S, k, y, vals, st, cls) => vals.forEach((v, j) => T(S, k + j, X(j), y, String(v), 'cz-mono cz-tc qcx-xs ' + (typeof cls === 'function' ? cls(j) : cls || ''), st, { w: 1.0 }));
  const M = j => BA[j] === BB[j];
  return CW('qc-bb84', {
    code: [['bits, ba = rand(n), rand(n)  # 앨리스', 'bits, ba = rand(n), rand(n)  # Alice'], ['bb = rand(n)                 # 밥의 기준', 'bb = rand(n)                 # Bob’s bases'], ['keep = ba == bb              # 약 절반 남김', 'keep = ba == bb              # keep ~half'], ['key = bits[keep]             # 공유 키', 'key = bits[keep]             # shared key'], ['# 일부를 공개 비교: 오류율 25%면 도청', '# compare a sample: 25% errors = eavesdropper']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1, 'danger']],
    draw: (S) => {
      [[['앨리스 비트', 'Alice bit'], 1], [['앨리스 기준', 'Alice basis'], 1], [['밥 기준', 'Bob basis'], 2], [['밥 결과', 'Bob result'], 2], [['남김', 'keep'], 3]].forEach(([t, st], i) => lbl(S, 'rl' + i, 19.0, .6 + i * .9, t, '', st, { w: 3.3 }));
      row(S, 'ab', .6, AB, 1, 'qcx-a'); row(S, 'ba', 1.5, [...BA], 1, 'qcx-a');
      row(S, 'bb', 2.4, [...BB], 2, 'qcx-w'); row(S, 'br', 3.3, BR, 2, j => M(j) ? 'qcx-w' : '');
      row(S, 'kp', 4.2, [...Array(8)].map((_, j) => M(j) ? '✓' : '✗'), 3, j => M(j) ? 'qcx-g' : 'qcx-r');
      lbl(S, 'l2', 19.0, 5.3, ['기준이 다르면 밥의 결과는 무작위예요', 'with a different basis, Bob’s result is random'], 'w', 2, { w: 12.4 });
      lbl(S, 'l3', 19.0, 6.4, ['기준만 공개해 같은 자리 5개를 남겨요 → 키 00101', 'publishing only the bases keeps 5 matching positions: key 00101'], 'g', 3, { w: 12.4 });
      lbl(S, 'ev', 1, 7.0, ['도청자 이브가 가로채 재고 다시 보내면', 'if Eve intercepts, measures and resends'], 'r', 4, { w: 16.0 });
      F(S, 'e1', 1, 8.1, ['P(이브 기준 틀림) × P(밥 결과 틀림) = 0.5 × 0.5 = 0.25', 'P(Eve’s basis wrong) × P(Bob’s bit wrong) = 0.5 × 0.5 = 0.25'], 'r', 4, { w: 16.0 });
      lbl(S, 'e2', 1, 9.3, ['남긴 키 일부를 공개해 비교했을 때 오류율이 높으면 키를 버려요', 'publicly comparing part of the key reveals the errors, and the key is discarded'], '', 4, { w: 16.0 });
      lbl(S, 'e3', 1, 10.9, ['복제 불가 정리 덕분에 이브는 들키지 않고 엿볼 수 없어요', 'the no-cloning theorem means Eve cannot look without being noticed'], 'g', 4, { w: 16.0 });
    },
    notes: [['BB84는 양자 상태로 비밀 키를 나누는 방법이에요 · 앨리스는 무작위 비트를 무작위 기준(+ 또는 ×)으로 광자에 실어 보내요', 'BB84 shares a secret key using quantum states: Alice encodes random bits in photons using randomly chosen bases, + or ×'], ['밥도 기준을 무작위로 골라 측정해요 · 기준이 같으면 앨리스의 비트를 그대로 얻고, 다르면 결과가 무작위예요', 'Bob measures each photon in a randomly chosen basis, getting Alice’s bit when the bases match and a random result when they do not'], ['둘은 비트는 숨긴 채 기준만 공개해 같은 자리(약 절반)만 남겨요 · 이 예에선 8개 중 5개가 남아 키 00101이 돼요', 'they publish only their bases and keep the matching positions, about half: here 5 of 8 survive, giving the key 00101'], ['도청자가 가로채 재고 다시 보내면 절반은 기준을 틀려 남긴 키에 25% 오류가 생겨요 · 일부를 공개해 비교하면 도청을 알아챌 수 있어요', 'an eavesdropper who measures and resends picks the wrong basis half the time, causing 25% errors in the kept key, which a public spot check reveals']],
    fin: [['BB84: 무작위 기준 + 기준 공개 + 오류율 검사', 'BB84: random bases, public basis comparison and an error-rate check', 'qcx-xs qcx-a'], ['안전성이 계산 난이도가 아니라 물리 법칙에서 나와요', 'its security rests on physics rather than computational hardness'], ['실제 시스템은 거리 제한과 장비 결함을 노린 공격이 과제예요', 'real systems face distance limits and attacks on imperfect hardware']],
    caps: [['앨리스의 광자', 'Alice’s photons'], ['밥의 측정', 'Bob’s measurements'], ['기준 맞추기', 'Sifting'], ['도청 들키기', 'Catching an eavesdropper'], ['양자 키 분배(BB84)', 'Quantum key distribution (BB84)']]
  });
}

function sDJ() {
  const L4 = ['00', '01', '10', '11'];
  return CW('qc-deutsch', {
    code: [['for i in range(n): qc.h(i)  # 균등 중첩', 'for i in range(n): qc.h(i)  # superpose all'], ['oracle(qc, f)               # 위상 (−1)^f(x)', 'oracle(qc, f)               # phase (−1)^f(x)'], ['for i in range(n): qc.h(i)  # 간섭', 'for i in range(n): qc.h(i)  # interfere'], ['p0 = abs(sum(sign)/2**n)**2 # 상수 1, 균형 0', 'p0 = abs(sum(sign)/2**n)**2 # const 1, bal 0'], ['# 질의: 고전 2^(n−1)+1번, 양자 1번', '# queries: classical 2^(n−1)+1, quantum 1']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      AMP(S, 'u', 19.4, 2.6, L4, [.5, .5, .5, .5], 1, { w: .9, gap: .3, sc: 2.0, lw: 1.1 });
      lbl(S, 'ul', 24.6, .8, ['H⊗H: 네 입력의 균등 중첩', 'H⊗H: an even superposition of 4 inputs'], 'a', 1, { w: 6.8 });
      lbl(S, 'ct', 19.0, 3.6, ['상수 f = 0', 'constant f = 0'], 'm', 2); lbl(S, 'bt', 25.2, 3.6, ['균형 f = x0 ⊕ x1', 'balanced f = x0 ⊕ x1'], 'm', 2);
      AMP(S, 'oc', 19.4, 5.8, L4, [.5, .5, .5, .5], 2, { w: .9, gap: .3, sc: 2.0, lw: 1.1, lo: 1.15 });
      AMP(S, 'ob', 25.6, 5.8, L4, [.5, -.5, -.5, .5], 2, { w: .9, gap: .3, sc: 2.0, lw: 1.1, lo: 1.15 });
      AMP(S, 'hc', 19.4, 10.2, L4, [1, 0, 0, 0], 3, { w: .9, gap: .3, sc: 2.0, lw: 1.1, c: 'ok' });
      AMP(S, 'hb', 25.6, 10.2, L4, [0, 0, 0, 1], 3, { w: .9, gap: .3, sc: 2.0, lw: 1.1, c: 'ok' });
      F(S, 'pf', 19.0, 11.3, ['|00⟩ 진폭 = 부호의 평균: 상수 → 1, 균형 → 0', 'amp of |00⟩ = mean of the signs: constant → 1, balanced → 0'], 'g', 3, { w: 12.4 });
      lbl(S, 'q1', 1, 7.0, ['n = 10이면 고전 최악 2⁹ + 1 = 513번, 양자 1번', 'for n = 10: up to 2⁹ + 1 = 513 classical queries, 1 quantum'], 'a', 4, { w: 16.0 });
      lbl(S, 'q2', 1, 8.6, ['다만 무작위 고전 방법도 몇 번이면 높은 확률로 맞혀서, 실용적 이점보다 간섭의 원리를 보여주는 예예요', 'a randomized classical algorithm is also right with high probability after a few queries, so this shows the principle more than a practical advantage'], '', 4, { w: 16.0 });
      lbl(S, 'q3', 1, 10.6, ['H → 오라클 → H 패턴이 많은 양자 알고리즘의 뼈대예요', 'the H → oracle → H pattern underlies many quantum algorithms'], 'g', 4, { w: 16.0 });
    },
    notes: [['함수 f가 모든 입력에 같은 값(상수)인지, 절반은 0이고 절반은 1(균형)인지 가려야 해요 · 먼저 H로 모든 입력의 균등 중첩을 만들어요', 'the task is to tell whether f gives the same value for every input (constant) or 0 for half and 1 for half (balanced); first H creates an even superposition of all inputs'], ['오라클은 f(x)를 위상 (−1)^f(x)로 새겨요 · 상수면 부호가 모두 같고, f = x0 ⊕ x1처럼 균형이면 절반이 음수가 돼요', 'the oracle writes f(x) into the phase (−1)^f(x): a constant f leaves every sign equal, while a balanced f such as x0 ⊕ x1 makes half of them negative'], ['다시 H를 걸면 |00⟩의 진폭은 부호의 평균이라, 상수면 1이고 균형이면 정확히 0이에요 · 측정해서 00이 나오면 상수, 아니면 균형이에요', 'after another round of H the amplitude of |00⟩ is the average of the signs, exactly 1 for constant and 0 for balanced, so measuring 00 means constant and anything else balanced'], ['고전적으로는 최악의 경우 2^(n−1) + 1번 물어야 확실하지만(n = 10이면 513번) 양자로는 1번이에요 · 무작위 고전 방법도 몇 번이면 높은 확률로 맞히므로, 간섭의 원리를 보여주는 예예요', 'a classical algorithm may need 2^(n−1) + 1 queries to be certain, 513 for n = 10, versus 1 quantum query; since randomized classical methods succeed with high probability in a few queries, this mainly illustrates interference']],
    fin: [['도이치-조사: 오라클 1번 + 간섭으로 상수/균형 판별', 'Deutsch–Jozsa decides constant versus balanced with one oracle call and interference', 'qcx-xs qcx-a'], ['위상 킥백: 함수 값을 진폭의 부호로 옮기는 기법', 'phase kickback moves function values into the signs of amplitudes'], ['H → 오라클 → H 패턴이 많은 알고리즘의 뼈대예요', 'the H → oracle → H pattern underlies many algorithms']],
    caps: [['균등 중첩', 'Uniform superposition'], ['위상 오라클', 'The phase oracle'], ['간섭으로 판별', 'Deciding by interference'], ['질의 횟수', 'Query counts'], ['도이치-조사 알고리즘', 'The Deutsch–Jozsa algorithm']]
  });
}

function sBV() {
  const L8 = ['000', '001', '010', '011', '100', '101', '110', '111'], a = .354, SG = [1, -1, 1, -1, -1, 1, -1, 1];
  return CW('qc-bv', {
    code: [['s = 0b101                   # 숨은 비트열', 's = 0b101                   # hidden string'], 'f = lambda x: dot(s, x) % 2  # s · x mod 2', 'qc.h(range(3)); oracle(qc, f); qc.h(range(3))', ['qc.measure_all()            # 항상 101', 'qc.measure_all()            # always 101'], ['# 고전: n번 (100, 010, 001), 양자: 1번', '# classical n (100, 010, 001), quantum 1']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      ['f(100) = 1', 'f(010) = 0', 'f(001) = 1'].forEach((t, i) => F(S, 'cq' + i, 19.0, .4 + i * .9, t, '', 1, { w: 6.0 }));
      lbl(S, 'cs', 25.4, 1.2, ['고전: 비트마다 한 번씩 물어 s = 101', 'classical: one query per bit gives s = 101'], 'a', 1, { w: 6.0 });
      AMP(S, 'ph', 19.4, 5.2, L8, SG.map(s => s * a), 2, { w: .9, gap: .45, sc: 2.4, lw: 1.3, lo: 1.0 });
      lbl(S, 'phl', 19.0, 3.3, ['오라클 1번 후 부호 = (−1)^(s·x)', 'after one oracle call the signs are (−1)^(s·x)'], 'w', 2, { w: 12.4 });
      AMP(S, 'hs', 19.4, 9.8, L8, [0, 0, 0, 0, 0, 1, 0, 0], 3, { w: .9, gap: .45, sc: 2.4, lw: 1.3, c: 'ok' });
      F(S, 'hsl', 19.0, 10.9, 'H⊗3 → |101⟩ = s', 'g', 3, { w: 12.4 });
      lbl(S, 'o1', 1, 7.0, ['질의 1번으로 n비트를 모두 알아내요: 부호 패턴 (−1)^(s·x)를 H가 |s⟩로 모아요', 'one query reveals all n bits: H focuses the sign pattern (−1)^(s·x) onto |s⟩'], 'a', 4, { w: 16.0 });
      lbl(S, 'o2', 1, 8.6, ['n = 1,000이면 고전 1,000번 vs 양자 1번 (오라클 질의 기준)', 'for n = 1,000: 1,000 classical queries versus 1 quantum (counting oracle calls)'], '', 4, { w: 16.0 });
      lbl(S, 'o3', 1, 10.0, ['패턴 전체를 한 번에 읽는 아이디어가 사이먼, 쇼어 알고리즘으로 이어져요', 'reading a whole pattern at once leads on to Simon’s and Shor’s algorithms'], 'g', 4, { w: 16.0 });
    },
    notes: [['숨은 비트열 s가 있고, 함수 f(x) = s·x mod 2만 물어볼 수 있어요 · 고전적으로는 100, 010, 001을 차례로 물어 비트를 하나씩, 모두 n번 알아내야 해요', 'a hidden bit string s can only be probed through f(x) = s·x mod 2; classically, querying 100, 010 and 001 reveals one bit at a time, n queries in all'], ['양자로는 균등 중첩에 오라클을 한 번 걸어요 · 각 입력의 부호가 (−1)^(s·x)가 되어 s = 101의 패턴이 부호에 새겨져요', 'quantumly, a single oracle call on the uniform superposition gives each input the sign (−1)^(s·x), imprinting the pattern of s = 101 on the signs'], ['다시 H를 걸면 이 부호 패턴이 정확히 |101⟩ 하나로 모여요 · 측정하면 항상 s가 나와요', 'another round of H focuses this sign pattern onto exactly |101⟩, so measurement always returns s'], ['오라클 1번으로 n비트를 모두 얻어요 · 패턴 전체를 한 번에 읽는 이 아이디어가 사이먼 알고리즘과 쇼어 알고리즘으로 이어져요', 'one oracle call yields all n bits, and this idea of reading a whole pattern at once leads to Simon’s and Shor’s algorithms']],
    fin: [['번스타인-바지라니: 질의 1번으로 숨은 비트열 s 찾기', 'Bernstein–Vazirani finds a hidden string s with one query', 'qcx-xs qcx-a'], ['H는 부호 패턴 (−1)^(s·x)를 |s⟩로 바꿔요', 'H turns the sign pattern (−1)^(s·x) into |s⟩'], ['오라클 모형에서의 이점이라, 실제 문제에선 오라클 구현이 관건이에요', 'the advantage holds in the oracle model; in practice everything depends on implementing the oracle']],
    caps: [['고전 방법', 'The classical approach'], ['부호 패턴', 'The sign pattern'], ['H로 모으기', 'Focusing with H'], ['질의 1번', 'One query'], ['번스타인-바지라니 알고리즘', 'The Bernstein–Vazirani algorithm']]
  });
}
/* ===== Quantum · 4. algorithms ===== */
const L8 = ['000', '001', '010', '011', '100', '101', '110', '111'];
const zE = (c, rx, ry, col, wd) => `<ellipse cx="${r3(c[0])}" cy="${r3(c[1])}" rx="${rx}" ry="${ry}" style="fill:none;stroke:${cv(col)};stroke-width:${wd || .06}"/>`;

function sGrover() {
  const a0 = Array(8).fill(.354), a1 = a0.map((v, i) => i === 5 ? -v : v), a2 = a1.map((v, i) => i === 5 ? .884 : .177), a3 = a2.map((v, i) => i === 5 ? .972 : -.088);
  const B = 3.4, SC = 2.9, opt = { w: .9, gap: .45, sc: SC, lw: 1.3, lo: 1.2 }, PK = [.125, .781, .945, .330, .012];
  return CW('qc-grover', {
    code: [['amp = np.full(8, 8**-0.5)   # 균등 중첩', 'amp = np.full(8, 8**-0.5)   # superpose'], ['amp[5] *= -1                # 정답 부호 반전', 'amp[5] *= -1                # flip marked sign'], ['amp = 2 * amp.mean() - amp  # 평균 기준 뒤집기', 'amp = 2 * amp.mean() - amp  # mirror at mean'], ['# 2번 반복 → P(101) = 0.945', '# 2 rounds → P(101) = 0.945'], ['# 반복 ≈ (π/4)√N: N = 10⁶이면 약 785번', '# rounds ≈ (π/4)√N: about 785 for N = 10⁶']],
    hl: [[0, 1, 'accent'], [1, 1, 'danger'], [2, 1, 'ok'], [3, 2, 'warn']],
    draw: (S) => {
      AMP(S, 'g0', 19.4, B, L8, a0, 1, Object.assign({ off: 2 }, opt));
      AMP(S, 'g1', 19.4, B, L8, a1, 2, Object.assign({ off: 3 }, opt));
      AMP(S, 'g2', 19.4, B, L8, a2, 3, Object.assign({ off: 4 }, opt, { c: (v, i) => i === 5 ? 'ok' : 'accent' }));
      AMP(S, 'g3', 19.4, B, L8, a3, 4, Object.assign({}, opt, { c: (v, i) => i === 5 ? 'ok' : v < 0 ? 'danger' : 'accent' }));
      hl(S, 'mn', 19.2, 29.9, B - .265 * SC, 'warn', 3, { w: .05, dash: 1, off: 4 });
      lbl(S, 't1', 19.0, 5.3, ['8개 후보에 같은 진폭 0.354', 'equal amplitude 0.354 on all 8 candidates'], 'a', 1, { w: 12.4, off: 2 });
      lbl(S, 't2', 19.0, 5.3, ['오라클: 정답 101의 부호만 뒤집기 (확률은 그대로)', 'oracle: flip only the sign of the answer 101 (probabilities unchanged)'], 'r', 2, { w: 12.4, off: 3 });
      lbl(S, 't3', 19.0, 5.3, ['평균(주황 점선 0.265)에 대해 뒤집기 → 정답 0.884, 나머지 0.177', 'invert about the mean (dashed, 0.265): answer 0.884, others 0.177'], 'g', 3, { w: 12.4, off: 4 });
      lbl(S, 't4', 19.0, 5.3, ['한 번 더: 정답 0.972 → 확률 0.945', 'once more: answer 0.972, probability 0.945'], 'g', 4, { w: 12.4 });
      F(S, 'pf', 19.0, 6.8, 'P(101) = 0.884² = 0.781', 'w', 3, { w: 12.4, off: 4 }); F(S, 'pf2', 19.0, 6.8, 'P(101) = 0.972² = 0.945', 'w', 4, { w: 12.4 });
      lbl(S, 'kl', 1, 7.0, ['반복 횟수별 성공 확률 (N = 8): 너무 많이 돌리면 다시 떨어져요', 'success probability by rounds (N = 8): too many rounds overshoot'], 'a', 4, { w: 16.0 });
      PK.forEach((p, k) => { const x = 2.0 + k * 3.0; rect(S, 'kb' + k, x, 12.0 - p * 3.2, 1.6, p * 3.2, k === 2 ? 'ok' : 'accent', 55, 4, { r: .06 }); T(S, 'kv' + k, x - .2, 12.0 - p * 3.2 - .55, p.toFixed(3), 'cz-mono cz-tc qcx-tiny', 4, { w: 2.0 }); T(S, 'kn' + k, x - .2, 12.15, ['반복 ', 'k = '].map(s => s + k), 'cz-mono cz-tc qcx-tiny', 4, { w: 2.0 }); });
      hl(S, 'kbl', 1.6, 16.0, 12.0, 'ink-3', 4, { w: .04 });
    },
    notes: [['N = 8개 중 정답 하나(101)를 찾아요 · H로 모든 후보에 같은 진폭 1/√8 = 0.354를 줘요', 'the task is to find one marked item, 101, among N = 8; Hadamards give every candidate the same amplitude 1/√8 = 0.354'], ['오라클이 정답의 부호만 뒤집어요 · 확률은 그대로라 아직 측정해도 소용없어요', 'the oracle flips only the sign of the answer; probabilities are unchanged, so measuring now would not help'], ['확산 연산은 모든 진폭을 평균(0.265)에 대해 뒤집어요 · 음수였던 정답은 0.884로 커지고 나머지는 0.177로 작아져요', 'the diffusion step inverts every amplitude about the mean, 0.265: the negative answer grows to 0.884 while the others shrink to 0.177'], ['한 번 더 반복하면 정답 진폭이 0.972, 확률 0.945가 돼요 · 최적 반복은 약 (π/4)√N번이라 백만 개면 약 785번으로, 고전 평균 50만 번보다 훨씬 적어요 · 더 돌리면 오히려 떨어져요', 'one more round gives the answer amplitude 0.972 and probability 0.945; about (π/4)√N rounds are optimal, roughly 785 for a million items versus 500,000 classical tries on average, and going further overshoots']],
    fin: [['그로버: 부호 반전 + 평균 반전을 √N번 반복해 정답 증폭', 'Grover amplifies the answer by repeating a sign flip and an inversion about the mean about √N times', 'qcx-xs qcx-a'], ['구조 없는 검색에서 제곱근 속도 향상이고, 이것이 최선이에요', 'a quadratic speedup for unstructured search, provably the best possible'], ['대칭키 키 탐색도 √N이 되므로 키 길이를 두 배로 늘려 대비해요', 'brute-force key search also drops to √N, countered by doubling symmetric key lengths']],
    caps: [['균등 중첩', 'Uniform superposition'], ['오라클', 'The oracle'], ['평균에 대한 반전', 'Inversion about the mean'], ['반복과 과회전', 'Repetition and overshoot'], ['그로버 검색', 'Grover search']]
  });
}

function sQFT() {
  const opt = { w: .9, gap: .45, lw: 1.3 }, NL = ['0', '1', '2', '3', '4', '5', '6', '7'], GC = [['n', ['FFT 연산', 'FFT ops'], ['QFT 게이트', 'QFT gates']], ['10', '10,240', '55'], ['20', '2.1 × 10⁷', '210'], ['30', '3.2 × 10¹⁰', '465']];
  return CW('qc-qft', {
    code: [['x = np.zeros(8); x[[1,5]] = .707  # 주기 4', 'x = np.zeros(8); x[[1,5]] = .707  # period 4'], 'y = np.fft.ifft(x) * 8**0.5        # QFT', ['p = np.abs(y)**2                  # 봉우리 4개', 'p = np.abs(y)**2                  # 4 peaks'], ['# FFT: N log N 연산, QFT: (log N)²개 게이트', '# FFT: N log N ops; QFT: (log N)² gates'], ['# 단, 측정으로는 봉우리 하나만 읽어요', '# but a measurement reads only one peak']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2]],
    draw: (S) => {
      AMP(S, 'in', 19.4, 3.0, NL, [0, .707, 0, 0, 0, .707, 0, 0], 1, Object.assign({ sc: 2.4, vt: v => v ? '0.707' : '' }, opt));
      lbl(S, 'il', 19.0, 3.7, ['입력: 1과 5에만 진폭, 주기 r = 4', 'input: amplitude only on 1 and 5, period r = 4'], 'a', 1, { w: 12.4 });
      box2(S, 'qb', 22.4, 4.9, 5.0, .9, 'QFT', 'warn', 2); arw(S, 'qa', [24.9, 5.85], [24.9, 6.5], 2);
      AMP(S, 'out', 19.4, 9.4, NL, [.25, 0, .25, 0, .25, 0, .25, 0], 3, Object.assign({ sc: 4.0, c: 'ok', vt: v => v ? '0.25' : '' }, opt));
      lbl(S, 'ol', 19.0, 10.1, ['출력 확률: N/r = 2의 배수(0, 2, 4, 6)에 봉우리 → 간격에서 주기를 알아내요', 'output probabilities: peaks at multiples of N/r = 2 (0, 2, 4, 6), and their spacing reveals the period'], 'g', 3, { w: 12.4 });
      GC.forEach((r, i) => r.forEach((t, j) => T(S, 'gc' + i + '_' + j, [1.0, 4.0, 11.0][j], 7.0 + i * .9, t, 'cz-mono qcx-xs' + (i ? (j === 2 ? ' qcx-g' : '') : ' qcx-a'), 4, { w: [2.6, 6.6, 6.0][j] })));
      lbl(S, 'gn', 1, 10.9, ['QFT 회로: 큐비트마다 H 1개 + 제어 위상 회전들 (n(n+1)/2개)', 'the QFT circuit: one H per qubit plus controlled phase rotations, n(n+1)/2 gates'], '', 4, { w: 16.0 });
      lbl(S, 'gw', 1, 12.4, ['모든 출력을 읽을 수는 없어 FFT의 대체는 아니에요', 'all outputs cannot be read out, so it does not replace the FFT'], 'r', 4, { w: 16.0 });
    },
    notes: [['양자 푸리에 변환(QFT)은 진폭에 이산 푸리에 변환을 해요 · 입력은 1과 5에만 진폭이 있는, 주기가 4인 상태예요', 'the quantum Fourier transform applies a discrete Fourier transform to the amplitudes; the input has amplitude only on 1 and 5, a state with period 4'], ['QFT는 진폭 벡터에 푸리에 행렬을 곱해요 · numpy로는 역 FFT에 √N을 곱한 것과 같아요', 'the QFT multiplies the amplitude vector by the Fourier matrix, equivalent in numpy to the inverse FFT times √N'], ['출력은 N/r = 8/4 = 2의 배수인 0, 2, 4, 6에만 확률 0.25씩 나와요 · 주기가 봉우리 간격으로 바뀌어서, 측정값으로 주기를 알아낼 수 있어요', 'the output has probability 0.25 at each multiple of N/r = 8/4 = 2, that is 0, 2, 4 and 6, turning the period into peak spacing that measurements can reveal'], ['n큐비트 QFT는 약 n²/2개 게이트면 돼요(n = 30이면 465개) · FFT는 n·2^n번 연산이 필요하지만, 측정으로는 봉우리 하나만 읽을 수 있어 모든 출력을 얻는 건 아니에요', 'an n-qubit QFT takes about n²/2 gates, 465 for n = 30, against n·2^n operations for an FFT, but a measurement reads out only one peak, not every output']],
    fin: [['QFT: 주기를 봉우리 위치로 바꿔 주는 양자 푸리에 변환', 'the QFT turns a period into peak positions', 'qcx-xs qcx-a'], ['위상 추정과 쇼어 알고리즘의 핵심 부품이에요', 'it is the key component of phase estimation and Shor’s algorithm'], ['(log N)²개 게이트로 2^n개 진폭을 변환해요', 'it transforms 2^n amplitudes with about (log N)² gates']],
    caps: [['주기가 있는 입력', 'A periodic input'], ['푸리에 변환', 'The Fourier transform'], ['봉우리', 'Peaks'], ['게이트 수', 'Gate counts'], ['양자 푸리에 변환', 'The quantum Fourier transform']]
  });
}

function sQPE() {
  const P3 = [.016, .032, .175, .688, .047, .019, .013, .012];
  return CW('qc-phaseest', {
    code: [['for k in range(t): c_U(2**k)  # 제어 U^(2^k)', 'for k in range(t): c_U(2**k)  # ctrl-U^(2^k)'], ['iqft(counting)                # 역 QFT', 'iqft(counting)                # inverse QFT'], ['phi = int(bits, 2) / 2**t     # 측정값 → 위상', 'phi = int(bits, 2) / 2**t     # bits → phase'], '# T|1⟩ = e^(2πi·1/8)|1⟩ → 001 → 1/8', ['# t비트 = 위상 정밀도 약 2^−t', '# t bits = phase precision about 2^−t']],
    hl: [[0, 1, 'accent'], [0, 1, 'warn'], [1, 3, 'ok'], [4, 1]],
    draw: (S) => {
      wires(S, 'w', 19.9, 30.6, [.8, 1.7, 2.6, 3.7], 1); [['c0', .45], ['c1', 1.35], ['c2', 2.25], [ket(1), 3.35]].forEach(([t, y], i) => T(S, 'wn' + i, 18.8, y, t, 'cz-mono qcx-tiny', 1, { w: 1.1 }));
      [.8, 1.7, 2.6].forEach((y, i) => gate(S, 'h' + i, 20.7, y, 'H', 'accent', 1));
      [[22.4, .8, 'U'], [24.0, 1.7, 'U²'], [25.6, 2.6, 'U⁴']].forEach(([x, y, t], i) => { SV(S, 'cu' + i, [zW([[x, y], [x, 3.25]], 'warn', .05), zJ([x, y], 'warn')], 1); gate(S, 'u' + i, x, 3.7, t, 'warn', 1); });
      box2(S, 'iq', 27.0, .4, 1.8, 2.6, 'QFT†', 'ok', 1); [.8, 1.7, 2.6].forEach((y, i) => gate(S, 'm' + i, 29.8, y, 'M', 'ink', 1));
      lbl(S, 'kb', 19.0, 4.7, ['U의 위상이 제어 큐비트로 되돌아가요(위상 킥백): k번째에 2^k·φ', 'U’s phase kicks back into the controls: 2^k·φ on qubit k'], 'w', 2, { w: 12.4 });
      AMP(S, 'r1', 19.4, 8.6, L8, [0, 1, 0, 0, 0, 0, 0, 0], 3, { w: .9, gap: .45, sc: 2.0, lw: 1.3, c: 'ok' });
      lbl(S, 'r1l', 19.0, 9.3, ['T 게이트: φ = 1/8 = 0.001₂ → 항상 001', 'T gate: φ = 1/8 = 0.001₂ → always 001'], 'g', 3, { w: 12.4 });
      AMP(S, 'r2', 1.6, 11.2, L8, P3, 4, { w: 1.2, gap: .6, sc: 2.8, lw: 1.6, c: (v, i) => i === 3 ? 'ok' : 'accent', vt: v => v > .1 ? v.toFixed(2) : '' });
      lbl(S, 'r2l', 1, 7.0, ['φ = 1/3처럼 3비트로 딱 떨어지지 않으면 가장 가까운 011(0.375)이 0.69 확률', 'when φ = 1/3 does not fit in 3 bits, the nearest value 011 (0.375) appears with probability 0.69'], 'w', 4, { w: 16.0 });
      lbl(S, 'r2n', 1, 12.1, ['비트를 늘릴수록 정밀해져요: t비트 → 오차 약 2^−t', 'more bits give more precision: t bits mean an error of about 2^−t'], '', 4, { w: 16.0 });
    },
    notes: [['위상 추정은 유니터리 U의 고유값 e^(2πiφ)에서 φ를 알아내요 · 계수 큐비트 t개에 H를 걸고, 각각이 U를 2^k번 제어하게 해요', 'phase estimation finds φ in an eigenvalue e^(2πiφ) of a unitary U: t counting qubits get Hadamards, and qubit k controls U applied 2^k times'], ['고유 상태에 U를 걸면 상태는 그대로이고 위상만 생기는데, 이 위상이 제어 큐비트로 되돌아가(위상 킥백) k번째 큐비트에 2^k·φ가 새겨져요', 'applying U to its eigenstate only adds a phase, which kicks back into the control qubits, writing 2^k·φ onto qubit k'], ['역 QFT가 이 위상 패턴을 φ의 이진수로 바꿔요 · T 게이트(φ = 1/8 = 0.001₂)면 항상 001이 나와요', 'an inverse QFT turns this phase pattern into φ in binary: for the T gate, φ = 1/8 = 0.001₂, the result is always 001'], ['φ = 1/3처럼 t비트로 딱 떨어지지 않으면 가장 가까운 011(0.375)이 0.69 확률로 나와요 · 비트를 늘릴수록 정밀해지고, 쇼어 알고리즘과 양자 화학 계산의 핵심 부품이에요', 'when φ = 1/3 does not fit in t bits, the closest value 011 (0.375) appears with probability 0.69; more bits mean more precision, and the routine is central to Shor’s algorithm and quantum chemistry']],
    fin: [['위상 추정: 제어 U^(2^k) + 역 QFT → 고유값 위상의 이진 표현', 'phase estimation: controlled U^(2^k) plus an inverse QFT reveals the eigenphase in binary', 'qcx-xs qcx-a'], ['t비트로 φ를 약 2^−t 정밀도로 얻어요', 't bits give φ to about 2^−t precision'], ['U^(2^k)를 효율적으로 만들 수 있을 때 쓸모가 있어요', 'it pays off only when U^(2^k) can be implemented efficiently']],
    caps: [['회로 구성', 'The circuit'], ['위상 킥백', 'Phase kickback'], ['딱 맞는 위상', 'An exact phase'], ['근사 위상', 'An approximate phase'], ['위상 추정', 'Phase estimation']]
  });
}

function sShor() {
  const FV = [1, 7, 4, 13, 1, 7, 4, 13], CC = { 1: 'accent', 7: 'ok', 4: 'warn', 13: 'danger' };
  return CW('qc-shor', {
    code: ['a, N = 7, 15', 'f = lambda x: pow(a, x, N)  # 1, 7, 4, 13, …', ['r = period(f)               # 양자 부분: r = 4', 'r = period(f)               # quantum: r = 4'], 'p = gcd(a**(r//2) - 1, N)   # gcd(48, 15) = 3', 'q = gcd(a**(r//2) + 1, N)   # gcd(50, 15) = 5', ['# RSA-2048: 오류 정정된 대규모 기계가 필요', '# RSA-2048: needs large fault-tolerant QC']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 2, 'ok'], [5, 1, 'danger']],
    draw: (S) => {
      T(S, 'xl', 19.0, 1.0, 'x', 'cz-mono qcx-xs', 1, { w: 1.8 }); T(S, 'fl', 19.0, 1.95, '7^x mod 15', 'cz-mono qcx-tiny', 1, { w: 2.5 });
      FV.forEach((v, j) => { T(S, 'x' + j, 21.7 + j * 1.2, 1.0, String(j), 'cz-mono cz-tc qcx-xs', 1, { w: 1.05 }); chip(S, 'f' + j, 21.7 + j * 1.2, 1.75, 1.05, String(v), CC[v], 1, { h: .8 }); });
      lbl(S, 'pr', 19.0, 3.0, ['주기 r = 4: 값이 4칸마다 반복돼요', 'period r = 4: the values repeat every 4 steps'], 'a', 1, { w: 12.4 });
      AMP(S, 'qp', 19.4, 6.4, L8, [.25, 0, .25, 0, .25, 0, .25, 0], 2, { w: .9, gap: .45, sc: 2.4, lw: 1.3, c: 'warn' });
      lbl(S, 'qpl', 19.0, 7.1, ['위상 추정으로 측정한 k에서 k/8 ≈ s/r · k = 2 → 1/4 → r = 4 (0이 나오면 다시)', 'phase estimation gives k with k/8 ≈ s/r: k = 2 → 1/4 → r = 4 (retry on 0)'], 'w', 2, { w: 12.4 });
      F(S, 'g1', 19.0, 8.8, '7² − 1 = 48 → gcd(48, 15) = 3', 'g', 3, { w: 12.4 }); F(S, 'g2', 19.0, 9.8, '7² + 1 = 50 → gcd(50, 15) = 5', 'g', 3, { w: 12.4 });
      F(S, 'g3', 19.0, 10.9, '15 = 3 × 5', 'a', 3, { w: 12.4 });
      lbl(S, 'rs', 1, 8.1, ['RSA는 큰 수의 인수분해가 어렵다는 데 기대요 → 쇼어 알고리즘은 다항 시간에 풀어요', 'RSA relies on factoring being hard, and Shor’s algorithm factors in polynomial time'], 'r', 4, { w: 16.0 });
      lbl(S, 'es', 1, 9.7, ['RSA-2048 추정: 노이즈 큐비트 2천만 개로 8시간(2019), 100만 개 미만으로 1주일 미만(2025)', 'RSA-2048 estimates: 20 million noisy qubits for 8 hours (2019), under a million in under a week (2025)'], '', 4, { w: 16.0 });
      lbl(S, 'pq', 1, 11.6, ['아직 먼 이야기지만, 미리 양자 내성 암호로 옮겨 가고 있어요', 'that is still far off, but migration to post-quantum cryptography is already under way'], 'g', 4, { w: 16.0 });
    },
    notes: [['쇼어 알고리즘은 인수분해를 주기 찾기로 바꿔요 · N = 15, a = 7이면 7^x mod 15가 1, 7, 4, 13을 반복해 주기 r = 4예요', 'Shor’s algorithm turns factoring into period finding: with N = 15 and a = 7, 7^x mod 15 cycles through 1, 7, 4, 13, a period of r = 4'], ['주기 찾기가 양자 부분이에요 · 위상 추정(QFT)으로 측정한 k에서 k/8 ≈ s/r을 얻고, k = 2면 1/4이라 r = 4예요 · 0처럼 실패하면 다시 해요', 'period finding is the quantum part: phase estimation with a QFT yields k with k/8 ≈ s/r, and k = 2 gives 1/4, so r = 4; uninformative results such as 0 mean trying again'], ['r이 짝수면 a^(r/2) ± 1과 N의 최대공약수가 인수예요 · gcd(48, 15) = 3, gcd(50, 15) = 5라서 15 = 3 × 5예요', 'for even r, the greatest common divisors of a^(r/2) ± 1 with N are factors: gcd(48, 15) = 3 and gcd(50, 15) = 5, so 15 = 3 × 5'], ['RSA는 큰 수의 인수분해가 어렵다는 데 기대는데, 쇼어 알고리즘은 이를 다항 시간에 풀어요 · RSA-2048에는 2025년 추정으로도 노이즈 큐비트 100만 개 가까이 필요해 아직 멀었지만, 양자 내성 암호로의 전환이 진행 중이에요', 'RSA relies on factoring being hard, and Shor’s algorithm factors in polynomial time; even 2025 estimates put RSA-2048 at nearly a million noisy qubits, far beyond today’s machines, but the move to post-quantum cryptography is under way']],
    fin: [['쇼어: 인수분해 → 주기 찾기(양자) → gcd(고전)', 'Shor: factoring → period finding (quantum) → gcd (classical)', 'qcx-xs qcx-a'], ['지수 속도 향상의 대표 예로 RSA와 타원 곡선 암호를 위협해요', 'the flagship exponential speedup, threatening RSA and elliptic-curve cryptography'], ['양자 부분은 모듈러 거듭제곱 + QFT, 나머지는 고전 계산이에요', 'the quantum part is modular exponentiation plus a QFT; the rest is classical']],
    caps: [['주기 함수', 'A periodic function'], ['양자 주기 찾기', 'Quantum period finding'], ['최대공약수', 'Greatest common divisors'], ['RSA에 미치는 영향', 'What it means for RSA'], ['쇼어 알고리즘', 'Shor’s algorithm']]
  });
}

function sVQE() {
  const P = PF(3.0, 7.4, 13.0, 4.6, 0, 2 * Math.PI, -1, 1), E = t => .5 * Math.cos(t) + .8 * Math.sin(t), PATH = [2.5, 3.3, 3.9];
  return CW('qc-vqe', {
    code: [['H = 0.5 * Z + 0.8 * X       # 해밀토니언', 'H = 0.5 * Z + 0.8 * X       # Hamiltonian'], ['def energy(theta):          # 양자로 측정', 'def energy(theta):          # measured on QPU'], '    return 0.5*cos(theta) + 0.8*sin(theta)', ['th = minimize(energy, 2.5)  # 고전 최적화', 'th = minimize(energy, 2.5)  # classical step'], ['# 최소 −0.943 = 정확한 바닥 에너지', '# minimum −0.943 = exact ground energy']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      F(S, 'hm', 19.0, .4, 'H = [[0.5, 0.8], [0.8, −0.5]]', 'a', 1, { w: 12.4 });
      lbl(S, 'hg', 19.0, 1.4, ['찾을 것: H의 가장 낮은 고유값(바닥 에너지)', 'goal: the lowest eigenvalue of H, the ground energy'], '', 1, { w: 12.4 });
      wires(S, 'w', 20.0, 25.6, [3.3], 2); T(S, 'wk', 18.9, 2.95, ket(0), 'cz-mono qcx-xs', 2, { w: 1.1 }); gate(S, 'ry', 21.9, 3.3, 'Ry(θ)', 'warn', 2, { w: 2.0 }); gate(S, 'mz', 24.5, 3.3, 'M', 'ink', 2);
      F(S, 'ex', 26.4, 2.8, '⟨Z⟩ = cos θ, ⟨X⟩ = sin θ', 'w', 2, { w: 5.0 });
      lbl(S, 'an', 19.0, 4.4, ['매개변수 회로로 상태를 만들고 측정해 에너지를 추정해요', 'a parameterized circuit prepares the state, and measurements estimate the energy'], '', 2, { w: 12.4 });
      F(S, 'ef', 19.0, 6.0, 'E(θ) = 0.5 cos θ + 0.8 sin θ', 'w', 3, { w: 12.4 });
      lbl(S, 'op', 19.0, 7.0, ['고전 최적화기가 θ를 바꿔 E를 낮춰요: 2.5 → 3.3 → 3.9 → 4.15', 'a classical optimizer adjusts θ to lower E: 2.5 → 3.3 → 3.9 → 4.15'], 'g', 3, { w: 12.4 });
      axes(S, 'ax', P, 3); curve(S, 'cv', P, E, 3, { color: 'accent', n: 70 }); ticks(S, 'tk', P, [[Math.PI, 'π'], [2 * Math.PI, '2π']], [[-.943, '−0.94']], 3);
      PATH.forEach((t, i) => pt(S, 'pp' + i, P.X(t), P.Y(E(t)), 3, C.warn, .14));
      pt(S, 'pm', P.X(4.154), P.Y(-.943), 4, C.okf, .17); hl(S, 'gl', P.x0, P.x0 + P.w, P.Y(-.943), 'ok', 4, { w: .05, dash: 1 });
      lbl(S, 'el', 1, 6.8, ['에너지 지형 E(θ)', 'the energy landscape E(θ)'], 'm', 3);
      F(S, 'mn', 19.0, 8.6, 'E_min = −√(0.5² + 0.8²) = −0.943', 'a', 4, { w: 12.4 });
      lbl(S, 'vp', 19.0, 9.6, ['변분 원리: 어떤 θ든 E(θ) ≥ 바닥 에너지라 최소화가 답에 다가가요', 'variational principle: E(θ) ≥ the ground energy for every θ, so minimizing approaches it'], '', 4, { w: 12.4 });
      lbl(S, 'us', 19.0, 11.2, ['분자 시뮬레이션에 쓰이지만 측정 횟수와 노이즈가 과제예요', 'used for molecules, but measurement cost and noise are hurdles'], 'r', 4, { w: 12.4 });
    },
    notes: [['VQE는 해밀토니언 H의 가장 낮은 고유값, 곧 바닥 에너지를 찾아요 · 예시로 H = 0.5Z + 0.8X를 써요', 'VQE looks for the lowest eigenvalue of a Hamiltonian H, its ground energy; the example uses H = 0.5Z + 0.8X'], ['매개변수 회로 Ry(θ)|0⟩로 상태를 만들고 ⟨Z⟩와 ⟨X⟩를 측정해 에너지 E(θ) = 0.5 cos θ + 0.8 sin θ를 추정해요', 'a parameterized circuit Ry(θ)|0⟩ prepares a state, and measuring ⟨Z⟩ and ⟨X⟩ estimates the energy E(θ) = 0.5 cos θ + 0.8 sin θ'], ['고전 최적화기가 측정된 에너지를 보고 θ를 바꿔요 · 2.5에서 시작해 3.3, 3.9를 거쳐 4.15로 가며 에너지가 낮아져요', 'a classical optimizer reads the measured energy and adjusts θ, moving from 2.5 through 3.3 and 3.9 to 4.15 as the energy falls'], ['최소값 −0.943은 정확한 바닥 에너지 −√(0.5² + 0.8²)와 같아요 · 변분 원리 덕분에 E(θ)는 항상 바닥 에너지 이상이라 최소화가 답에 다가가요 · 분자 시뮬레이션에 쓰이지만 측정 횟수와 노이즈가 과제예요', 'the minimum, −0.943, equals the exact ground energy −√(0.5² + 0.8²); by the variational principle E(θ) never drops below the ground energy, so minimizing approaches it, though measurement counts and noise remain hurdles for real molecules']],
    fin: [['VQE: 양자 회로로 에너지 측정 + 고전 최적화 반복', 'VQE alternates quantum energy measurements with classical optimization', 'qcx-xs qcx-a'], ['짧은 회로라 노이즈 있는 기계에서도 시도할 수 있어요', 'its short circuits suit today’s noisy machines'], ['회로 모양(ansatz) 선택과 평평한 지형(barren plateau)이 어려운 점이에요', 'choosing the ansatz and avoiding barren plateaus are the hard parts']],
    caps: [['찾을 에너지', 'The target energy'], ['매개변수 회로', 'A parameterized circuit'], ['고전 최적화', 'Classical optimization'], ['변분 원리', 'The variational principle'], ['변분 양자 고유값 풀이(VQE)', 'The variational quantum eigensolver (VQE)']]
  });
}

function sComplex() {
  const TB = [[['문제', 'problem'], ['향상', 'speedup'], 1, 'qcx-a'], [['인수분해·이산 로그', 'factoring, discrete log'], ['지수', 'exponential'], 2, 'qcx-g'], [['화학·물질 시뮬레이션', 'chemistry, materials'], ['지수', 'exponential'], 2, 'qcx-g'], [['구조 없는 검색', 'unstructured search'], ['제곱근', 'quadratic'], 3, 'qcx-w'], [['NP-완전 문제 일반', 'NP-complete in general'], ['알려진 것 없음', 'none known'], 4, 'qcx-r']];
  return CW('qc-complexity', {
    code: [['# BQP: 양자로 효율적으로 풀리는 문제', '# BQP: problems quantum computers solve fast'], ['# 지수 향상: 인수분해, 이산 로그, 양자 시뮬레이션', '# exponential: factoring, logs, simulation'], ['# 제곱근 향상: 구조 없는 검색 (그로버)', '# quadratic: unstructured search (Grover)'], ['# NP-완전 문제를 효율적으로 푼다는 증거는 없음', '# no evidence it solves NP-complete problems'], ['# 입출력 데이터가 크면 이점이 사라지기도 해요', '# big data I/O can erase the advantage']],
    hl: [[0, 1, 'accent'], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2, 'danger']],
    draw: (S) => {
      SV(S, 'vn', [zE([23.2, 5.0], 3.6, 3.0, 'accent'), zE([27.0, 5.0], 3.6, 3.0, 'ink-2'), zE([24.9, 5.0], 1.3, 1.1, 'ok')], 1);
      T(S, 'lb', 19.9, 1.7, 'BQP', 'cz-mono qcx-xs qcx-a', 1, { w: 2.0 }); T(S, 'ln', 29.0, 1.7, 'NP', 'cz-mono qcx-xs', 1, { w: 2.0 }); T(S, 'lp', 24.4, 4.65, 'P', 'cz-mono cz-tc qcx-xs qcx-g', 1, { w: 1.0 });
      lbl(S, 'bd', 19.0, 8.8, ['P ⊆ BQP, NP와는 일부만 겹친다고 여겨져요', 'P ⊆ BQP, which is believed to overlap NP only partly'], 'a', 1, { w: 12.4 });
      pt(S, 'pf', 25.2, 2.6, 2, C.okf, .16); T(S, 'pfl', 24.0, 1.25, ['인수분해', 'factoring'], 'cz-tc qcx-tiny qcx-g', 2, { w: 2.4 });
      pt(S, 'ps', 21.0, 6.4, 2, C.okf, .16); T(S, 'psl', 19.9, 5.35, ['양자 시뮬레이션', 'quantum simulation'], 'cz-tc qcx-tiny qcx-g', 2, { w: 3.2 });
      lbl(S, 'gq', 19.0, 10.1, ['구조 없는 검색은 N → √N: 2^128 → 2^64처럼 지수가 절반이 될 뿐', 'unstructured search goes from N to √N: 2^128 becomes 2^64, only halving the exponent'], 'w', 3, { w: 12.4 });
      SV(S, 'nc', [zE([29.3, 5.0], .9, 1.4, 'danger', .1)], 4); T(S, 'ncl', 28.0, 8.1, ['NP-완전', 'NP-complete'], 'cz-tc qcx-tiny qcx-r', 4, { w: 3.4 });
      lbl(S, 'nn', 19.0, 11.5, ['NP-완전 문제(SAT, 외판원 등)는 BQP 밖이라고 여겨져요: 만능 해결사가 아니에요', 'NP-complete problems such as SAT and the traveling salesman are believed to lie outside BQP: no universal solver'], 'r', 4, { w: 12.4 });
      TB.forEach(([a, b, st, c], i) => { T(S, 'ta' + i, 1.0, 7.0 + i * .95, a, 'qcx-xs' + (i ? '' : ' qcx-a'), st, { w: 9.6 }); T(S, 'tb' + i, 11.0, 7.0 + i * .95, b, 'qcx-xs ' + c, st, { w: 6.4 }); });
      lbl(S, 'io', 1, 12.2, ['큰 데이터를 양자 상태로 올리고 읽는 비용이 이점을 지우기도 해요', 'loading big data into quantum states and reading results out can erase the advantage'], '', 4, { w: 16.0 });
    },
    notes: [['BQP는 양자 컴퓨터가 높은 확률로 효율적으로 푸는 문제들의 집합이에요 · 고전적으로 쉬운 P를 포함하고, NP와는 일부만 겹친다고 여겨져요', 'BQP is the class of problems a quantum computer solves efficiently with high probability; it contains the classically easy class P and is believed to overlap NP only partly'], ['지수적 속도 향상이 알려진 문제는 인수분해, 이산 로그, 그리고 양자계 자체의 시뮬레이션이에요 · 인수분해는 NP에 있지만 P에 있는지는 몰라요', 'exponential speedups are known for factoring, discrete logarithms and simulating quantum systems themselves; factoring lies in NP but is not known to be in P'], ['구조 없는 검색은 그로버로 N에서 √N이 되는 제곱근 향상뿐이에요 · 2^128을 2^64로 줄이지만 여전히 지수예요', 'unstructured search gains only a quadratic speedup from Grover, N to √N, which shrinks 2^128 to 2^64 but stays exponential'], ['NP-완전 문제를 양자 컴퓨터가 효율적으로 푼다는 증거는 없어요 · 또 큰 데이터를 양자 상태로 올리고 읽는 비용이 이점을 지우기도 해서, 양자 컴퓨터는 특정 문제에 강한 가속기에 가까워요', 'there is no evidence that quantum computers solve NP-complete problems efficiently, and loading and reading out large data can erase any advantage, so quantum computers are best seen as accelerators for particular problems']],
    fin: [['양자 이점은 문제 구조에 달려 있어요: 주기·대칭이 있으면 지수, 없으면 제곱근', 'quantum advantage depends on structure: periods and symmetry give exponential gains, none gives quadratic', 'qcx-xs qcx-a'], ['BQP와 NP의 정확한 관계는 아직 증명되지 않았어요', 'the exact relationship between BQP and NP is unproven'], ['제곱근 향상은 오류 정정 비용 때문에 실제 이득이 작을 수 있어요', 'quadratic speedups can shrink to little after error-correction overheads']],
    caps: [['BQP', 'BQP'], ['지수적 향상', 'Exponential speedups'], ['제곱근 향상', 'Quadratic speedups'], ['한계', 'Limits'], ['양자 복잡도', 'Quantum complexity']]
  });
}
/* ===== Quantum · 5. noise and error correction ===== */
const zRc = (x, y, w, h, col, pct) => `<rect x="${r3(x)}" y="${r3(y)}" width="${r3(w)}" height="${r3(h)}" style="fill:${tint(col, pct ?? 30)};stroke:${cv(col)};stroke-width:.04"/>`;

function sNoise() {
  const P1 = PF(20.4, .9, 10.4, 3.2, 0, 300, 0, 1), P2 = PF(20.4, 5.7, 10.4, 3.2, 0, 300, -1, 1);
  return CW('qc-noise', {
    code: [['p1 = np.exp(-t / T1)   # |1⟩ → |0⟩ 에너지 이완', 'p1 = np.exp(-t / T1)   # |1⟩ decays to |0⟩'], ['coh = np.exp(-t / T2)  # 위상 정보 소실', 'coh = np.exp(-t / T2)  # phase info lost'], '# T1 = 100 µs, T2 = 80 µs, t = 10 µs', '# → p1 = 0.905, coh = 0.882', ['# 게이트 50 ns → T2 안에 약 1,600번', '# 50 ns gates → about 1,600 within T2']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      axes(S, 'a1', P1, 1); curve(S, 'c1', P1, t => Math.exp(-t / 100), 1, { color: 'accent', n: 50 }); ticks(S, 't1', P1, [[100, '100'], [300, '300 µs']], [[1, '1']], 1);
      vl(S, 'v1', P1.X(100), P1.y0, P1.y0 + P1.h, 'accent', 1, { w: .05, dash: 1 });
      lbl(S, 'l1', 24.6, .2, ['T1: |1⟩이 |0⟩으로 떨어짐', 'T1: |1⟩ relaxes to |0⟩'], 'a', 1, { w: 6.8 });
      axes(S, 'a2', P2, 2); curve(S, 'c2', P2, t => Math.cos(2 * Math.PI * t / 30) * Math.exp(-t / 80), 2, { color: 'warn', n: 160 });
      curve(S, 'e2', P2, t => Math.exp(-t / 80), 2, { color: 'ink-2', n: 40, dash: 1 }); ticks(S, 't2', P2, [[300, '300 µs']], [[1, '1'], [-1, '−1']], 2, { yb: P2.y0 + P2.h + .12 });
      lbl(S, 'l2', 24.6, 5.0, ['T2: 위상이 흐트러져 간섭이 약해짐', 'T2: phases scatter and interference fades'], 'w', 2, { w: 6.8 });
      F(S, 'n1', 19.0, 9.9, 'e^(−10/100) = 0.905', 'g', 3, { w: 6.0 }); F(S, 'n2', 25.4, 9.9, 'e^(−10/80) = 0.882', 'g', 3, { w: 6.0 });
      lbl(S, 'n3', 19.0, 10.9, ['10 µs 뒤: |1⟩이 남을 확률 0.905, 결맞음 0.882', 'after 10 µs: P(still |1⟩) = 0.905, coherence 0.882'], '', 3, { w: 12.4 });
      F(S, 'bg', 1, 7.0, '80 µs ÷ 50 ns ≈ 1,600', 'w', 4, { w: 16.0 });
      lbl(S, 'bl', 1, 8.1, ['T2 안에 할 수 있는 2큐비트 게이트 수 · 쇼어 알고리즘엔 수십억 번이 필요', 'two-qubit gates that fit within T2; Shor’s algorithm needs billions'], 'r', 4, { w: 16.0 });
      lbl(S, 'cs', 1, 9.7, ['원인: 열, 전자기 잡음, 재료 결함, 이웃 큐비트와의 간섭', 'causes: heat, electromagnetic noise, material defects and crosstalk'], '', 4, { w: 16.0 });
      lbl(S, 'cf', 1, 11.1, ['초전도 큐비트는 희석 냉동기로 약 10 mK까지 식히고 차폐해요', 'superconducting qubits are cooled to about 10 mK in dilution refrigerators and shielded'], 'a', 4, { w: 16.0 });
    },
    notes: [['큐비트는 환경과 상호작용하며 정보를 잃어요 · T1은 |1⟩이 에너지를 잃고 |0⟩으로 떨어지는 시간 척도로, |1⟩이 남을 확률이 e^(−t/T1)로 줄어요', 'qubits lose information through interaction with their environment; T1 is the time scale on which |1⟩ loses energy and falls to |0⟩, the survival probability decaying as e^(−t/T1)'], ['T2는 위상이 흐트러지는 시간 척도예요 · 중첩의 상대 위상이 무작위로 퍼져 간섭 무늬가 e^(−t/T2)로 약해지고, 항상 T2 ≤ 2T1이에요', 'T2 is the time scale of dephasing: the relative phase of a superposition spreads randomly, so interference fringes fade as e^(−t/T2), and always T2 ≤ 2T1'], ['예를 들어 T1 = 100 µs, T2 = 80 µs라면 10 µs 뒤 |1⟩이 남을 확률은 0.905, 결맞음은 0.882예요', 'with T1 = 100 µs and T2 = 80 µs, after 10 µs the probability of still being |1⟩ is 0.905 and the coherence 0.882'], ['2큐비트 게이트가 50 ns쯤이면 T2 안에 약 1,600번 연산할 수 있어요 · 쇼어 알고리즘처럼 수십억 번 연산이 필요한 계산은 오류 정정 없이는 불가능해요', 'with two-qubit gates of about 50 ns, roughly 1,600 fit within T2, so computations needing billions of operations, such as Shor’s algorithm, are impossible without error correction']],
    fin: [['결어긋남: T1(에너지 이완), T2(위상 소실)', 'decoherence: T1 (energy relaxation) and T2 (dephasing)', 'qcx-xs qcx-a'], ['결맞음 시간 ÷ 게이트 시간이 오류 전 연산 수를 가늠하게 해요', 'coherence time ÷ gate time roughly bounds the operations before errors'], ['큐비트 종류마다 결맞음 시간과 게이트 속도가 크게 달라요', 'coherence times and gate speeds differ widely across qubit types']],
    caps: [['T1 이완', 'T1 relaxation'], ['T2 위상 소실', 'T2 dephasing'], ['숫자로 보기', 'In numbers'], ['연산 예산', 'The operation budget'], ['결어긋남', 'Decoherence']]
  });
}

function sFid() {
  const P = PF(3.0, 7.6, 13.0, 4.2, 1, 4, 0, 1), f = F0 => x => Math.pow(F0, Math.pow(10, x));
  return CW('qc-fidelity', {
    code: [['success = fid ** n_gates  # 오류가 독립이라 가정', 'success = fid ** n_gates  # independent errors'], '0.999 ** 100              # 0.905', '0.999 ** 1000             # 0.368', '0.99 ** 100               # 0.366', ['# 2큐비트 게이트가 오류의 주범', '# two-qubit gates dominate the errors']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      F(S, 'sf', 19.0, .5, ['성공 확률 ≈ F^g (g = 게이트 수)', 'success ≈ F^g (g = number of gates)'], 'a', 1, { w: 12.4 });
      lbl(S, 'sl', 19.0, 1.5, ['게이트마다 조금씩 틀리고, 오류는 곱으로 쌓여요', 'each gate errs a little, and errors multiply'], '', 1, { w: 12.4 });
      axes(S, 'ax', P, 1); curve(S, 'c3', P, f(.999), 1, { color: 'warn', n: 60 }); ticks(S, 'tk', P, [[1, '10'], [2, '100'], [3, '1,000'], [4, '10⁴']], null, 1);
      lbl(S, 'xl', 1, 6.9, ['게이트 수(로그 축)에 따른 성공 확률', 'success probability by gate count (log axis)'], 'm', 1, { w: 16.0 });
      F(S, 'p1', 19.0, 3.0, '0.999^100 = 0.905', 'w', 2, { w: 12.4 }); F(S, 'p2', 19.0, 3.9, '0.999^1,000 = 0.368', 'w', 2, { w: 12.4 });
      pt(S, 'q1', P.X(2), P.Y(.905), 2, C.warn, .14); pt(S, 'q2', P.X(3), P.Y(.368), 2, C.warn, .14);
      curve(S, 'c2', P, f(.99), 3, { color: 'danger', n: 60 });
      F(S, 'p3', 19.0, 5.3, '0.99^100 = 0.366', 'r', 3, { w: 12.4 }); lbl(S, 'p3l', 19.0, 6.2, ['99%면 100개 게이트에서 이미 3분의 2가 실패', 'at 99%, two-thirds of runs fail within 100 gates'], 'r', 3, { w: 12.4 });
      curve(S, 'c4', P, f(.9999), 4, { color: 'ok', n: 60 });
      F(S, 'p4', 19.0, 7.6, '0.9999^10,000 = 0.368', 'g', 4, { w: 12.4 });
      lbl(S, 'p4l', 19.0, 8.6, ['오류율을 10배 줄이면 쓸 수 있는 깊이가 10배 늘어요', 'cutting the error rate tenfold buys ten times the depth'], 'g', 4, { w: 12.4 });
      lbl(S, 'ec', 19.0, 10.1, ['그래도 수십억 게이트에는 턱없이 부족 → 오류 정정', 'still nowhere near billions of gates, hence error correction'], 'a', 4, { w: 12.4 });
      [['99%', 'r', 3], ['99.9%', 'w', 1], ['99.99%', 'g', 4]].forEach(([t, c, st], i) => lbl(S, 'lg' + i, 3.0 + i * 4.4, 12.9, t, 'm ' + c, st, { w: 4.0 }));
    },
    notes: [['게이트마다 조금씩 오류가 나고, 오류가 독립이라면 회로가 성공할 확률은 충실도 F를 게이트 수만큼 곱한 F^g로 줄어요', 'every gate errs slightly, and if errors are independent a circuit succeeds with probability F^g, the fidelity multiplied once per gate'], ['99.9% 게이트라도 100개면 0.905, 1,000개면 0.368로 떨어져요', 'even with 99.9% gates, success falls to 0.905 after 100 gates and 0.368 after 1,000'], ['99%라면 100개에서 이미 0.366이라 3분의 2가 실패해요 · 2큐비트 게이트의 충실도가 보통 가장 낮아 회로 비용을 좌우해요', 'at 99% it is already 0.366 after 100 gates, two-thirds of runs failing; two-qubit gates usually have the lowest fidelity and dominate the cost'], ['99.99%면 10,000개에서 0.368이에요 · 오류율을 10배 줄일 때마다 쓸 수 있는 깊이가 10배 늘지만, 수십억 게이트가 필요한 알고리즘에는 턱없이 부족해서 오류 정정이 필요해요', 'at 99.99% it is 0.368 after 10,000 gates: each tenfold drop in error rate buys ten times the depth, but algorithms needing billions of gates remain far out of reach without error correction']],
    fin: [['회로 성공 확률 ≈ F^(게이트 수): 오류는 곱으로 쌓여요', 'circuit success ≈ F^(gate count): errors compound multiplicatively', 'qcx-xs qcx-a'], ['2큐비트 게이트 충실도가 하드웨어의 핵심 지표예요', 'two-qubit gate fidelity is the key hardware metric'], ['오류 완화로 결과를 보정하기도 하지만 실행 횟수가 크게 늘어요', 'error mitigation can correct results, at a steep cost in shots']],
    caps: [['곱으로 쌓이는 오류', 'Compounding errors'], ['99.9%의 경우', 'At 99.9%'], ['99%의 경우', 'At 99%'], ['10배씩 좋아지면', 'Each tenfold improvement'], ['게이트 충실도', 'Gate fidelity']]
  });
}

function sECC() {
  const P = PF(3.0, 8.0, 13.0, 4.0, 0, .5, 0, .5), SY = [['(0, 0)', ['오류 없음', 'no error']], ['(1, 0)', ['q0 뒤집힘', 'q0 flipped']], ['(1, 1)', ['q1 뒤집힘', 'q1 flipped']], ['(0, 1)', ['q2 뒤집힘', 'q2 flipped']]];
  return CW('qc-errorcorr', {
    code: ['enc = cx(0, 1) + cx(0, 2)  # α|000⟩ + β|111⟩', ['# 가운데 비트 오류 → α|010⟩ + β|101⟩', '# middle bit flips → α|010⟩ + β|101⟩'], 's = (par(0, 1), par(1, 2)) # (1, 1)', 'qc.x({(1,0): 0, (1,1): 1, (0,1): 2}[s])', ['# 논리 오류 ≈ 3p²: p = 1%면 0.03%', '# logical error ≈ 3p²: p = 1% → 0.03%']],
    hl: [[0, 1, 'accent'], [1, 1, 'danger'], [2, 2, 'ok'], [4, 1, 'warn']],
    draw: (S) => {
      wires(S, 'w', 19.9, 27.6, [.8, 1.8, 2.8], 1); [['ψ', .45], [ket(0), 1.45], [ket(0), 2.45]].forEach(([t, y], i) => T(S, 'wn' + i, 18.8, y, t, 'cz-mono qcx-xs', 1, { w: 1.1 }));
      SV(S, 'e1', cxSV(21.0, .8, 1.8, 'accent').concat(cxSV(22.2, .8, 2.8, 'accent')), 1);
      lbl(S, 'el', 19.0, 3.6, ['복사가 아니라 얽힘: α|000⟩ + β|111⟩', 'entanglement, not copies: α|000⟩ + β|111⟩'], 'a', 1, { w: 12.4 });
      gate(S, 'er', 23.8, 1.8, 'X', 'danger', 2); lbl(S, 'erl', 24.5, 1.0, ['오류!', 'error!'], 'r', 2);
      gate(S, 'fx', 26.6, 1.8, 'X', 'ok', 3);
      SY.forEach(([s, t], i) => { T(S, 'sy' + i, 19.0, 4.8 + i * .85, s, 'cz-mono qcx-xs' + (i === 2 ? ' qcx-g' : ''), 3, { w: 3.0 }); T(S, 'st' + i, 22.4, 4.8 + i * .85, t, 'qcx-xs' + (i === 2 ? ' qcx-g' : ''), 3, { w: 6.0 }); });
      lbl(S, 'sl', 19.0, 8.4, ['패리티만 재서 α, β는 건드리지 않고 오류 위치만 알아내요', 'measuring only parities locates the error without disturbing α and β'], 'g', 3, { w: 12.4 });
      lbl(S, 'pl', 1, 6.8, ['논리 오류(초록) vs 물리 오류(점선): p < 0.5면 이득', 'logical (green) versus physical error (dashed): a win whenever p < 0.5'], 'a', 4, { w: 16.0 });
      axes(S, 'ax', P, 4); curve(S, 'id', P, p => p, 4, { color: 'ink-2', n: 4, dash: 1 }); curve(S, 'lg', P, p => 3 * p * p - 2 * p * p * p, 4, { color: 'ok', n: 50 });
      ticks(S, 'tk', P, [[.1, '0.1'], [.5, '0.5']], null, 4);
      F(S, 'pv', 1, 12.9, 'p = 0.01 → 3p² − 2p³ ≈ 0.0003', 'g', 4, { w: 16.0 });
      lbl(S, 'zn', 19.0, 10.0, ['위상(Z) 오류는 못 고쳐요 → 쇼어 9큐비트 코드나 표면 코드가 둘 다 다뤄요', 'it cannot fix phase (Z) errors; Shor’s 9-qubit code and the surface code handle both'], 'r', 4, { w: 12.4 });
    },
    notes: [['고전에서는 비트를 세 번 복사해 다수결로 고치지만, 양자 상태는 복사할 수 없어요 · 대신 CNOT 두 개로 α|0⟩ + β|1⟩을 α|000⟩ + β|111⟩로 얽어 퍼뜨려요', 'classically a bit is copied three times and fixed by majority vote, but quantum states cannot be copied; instead two CNOTs spread α|0⟩ + β|1⟩ into the entangled α|000⟩ + β|111⟩'], ['가운데 큐비트가 뒤집히면 α|010⟩ + β|101⟩이 돼요 · 그냥 측정하면 α, β가 무너지니 다른 방법이 필요해요', 'a flip of the middle qubit gives α|010⟩ + β|101⟩, and simply measuring would destroy α and β, so another approach is needed'], ['이웃끼리의 패리티(q0⊕q1, q1⊕q2)만 재면 (1, 1)이 나와 가운데가 틀렸다는 것만 알 수 있어요 · α, β는 그대로 둔 채 X로 고쳐요', 'measuring only the neighbor parities q0⊕q1 and q1⊕q2 gives (1, 1), which reveals that the middle qubit flipped and nothing about α and β, so an X fixes it'], ['큐비트마다 오류 확률이 p면 둘 이상 틀려야 실패라 논리 오류는 3p² − 2p³이에요 · p = 1%면 0.03%로 줄어요 · 다만 위상 오류는 못 고쳐서, 실제로는 둘 다 다루는 코드를 써요', 'with error probability p per qubit, failure requires two or more flips, so the logical error is 3p² − 2p³, 0.03% for p = 1%; phase errors are not covered, so practical codes handle both kinds']],
    fin: [['양자 오류 정정: 얽힘으로 퍼뜨리고, 신드롬만 재서 고쳐요', 'quantum error correction spreads information with entanglement and fixes errors from syndrome measurements alone', 'qcx-xs qcx-a'], ['물리 오류율이 문턱값보다 낮아야 이득이에요', 'it only helps when the physical error rate is below a threshold'], ['논리 큐비트 하나에 물리 큐비트가 여럿 들어요', 'each logical qubit costs several physical qubits']],
    caps: [['인코딩', 'Encoding'], ['비트 반전 오류', 'A bit-flip error'], ['신드롬 측정', 'Syndrome measurement'], ['논리 오류율', 'The logical error rate'], ['3큐비트 반복 코드', 'The three-qubit repetition code']]
  });
}

function sSurface() {
  const g = 1.6, x0 = 20.0, y0 = 1.0, Q = (i, j) => [x0 + i * g, y0 + j * g];
  const sq = [[0, 0, 'accent'], [1, 0, 'warn'], [0, 1, 'warn'], [1, 1, 'accent']].map(([i, j, c]) => zRc(x0 + i * g, y0 + j * g, g, g, c, 22));
  const half = [[x0 + .5 * g, y0, 'warn', -1, 0], [x0 + 1.5 * g, y0 + 2 * g, 'warn', 1, 0], [x0, y0 + 1.5 * g, 'accent', 0, -1], [x0 + 2 * g, y0 + .5 * g, 'accent', 0, 1]].map(([cx, cy, c, sy, sx]) => { const r = g / 2; const d = sy ? `M${r3(cx - r)},${r3(cy)} A${r} ${r} 0 0 ${sy < 0 ? 1 : 0} ${r3(cx + r)},${r3(cy)} Z` : `M${r3(cx)},${r3(cy - r)} A${r} ${r} 0 0 ${sx < 0 ? 0 : 1} ${r3(cx)},${r3(cy + r)} Z`; return `<path d="${d}" style="fill:${tint(c, 22)};stroke:${cv(c)};stroke-width:.04"/>`; });
  const dots = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) dots.push(zJ(Q(i, j), 'ink'));
  const P = PF(3.0, 8.2, 13.0, 4.0, 3, 11, -8, 0), pl = rt => d => Math.min(0, Math.log10(.1 * Math.pow(rt, (d + 1) / 2)));
  return CW('qc-surface', {
    code: ['n_phys = 2 * d**2 - 1  # d=3: 17, d=7: 97', 'p_L = 0.1 * (p / p_th) ** ((d + 1) / 2)', ['# p/p_th = 0.1 → d가 2 늘 때마다 10배 감소', '# p/p_th = 0.1 → 10× lower per d + 2'], ['# 문턱값 아래에서만 d를 키울수록 좋아져요', '# only below threshold does larger d help'], ['# 논리 큐비트 1개 ≈ 물리 큐비트 수백~1,000개', '# 1 logical ≈ hundreds to 1,000 physical']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      SV(S, 'lat', sq.concat(half, dots), 1);
      lbl(S, 'll', 25.6, .4, ['d = 3: 데이터 9개(점) + 측정 8개(면)', 'd = 3: 9 data qubits (dots) + 8 measure qubits (faces)'], 'a', 1, { w: 5.8 });
      lbl(S, 'lc', 25.6, 2.7, ['파랑 X, 주황 Z 패리티를 반복 측정', 'blue X and orange Z parities, measured repeatedly'], '', 1, { w: 5.8 });
      [['d', ['큐비트', 'qubits']], ['3', '17'], ['5', '49'], ['7', '97'], ['25', '1,249']].forEach(([a, b], i) => { T(S, 'da' + i, 19.0 + i * 2.5, 5.4, a, 'cz-mono cz-tc qcx-xs' + (i ? '' : ' qcx-a'), 1, { w: 2.3 }); T(S, 'db' + i, 19.0 + i * 2.5, 6.2, b, 'cz-mono cz-tc qcx-xs' + (i ? '' : ' qcx-a'), 1, { w: 2.3 }); });
      F(S, 'pf', 19.0, 7.2, 'p_L ≈ 0.1 · (p / p_th)^((d+1)/2)', 'a', 2, { w: 12.4 });
      lbl(S, 'pg', 19.0, 8.1, ['p = 0.1%, 문턱값 1%: d = 3 → 10⁻³, 5 → 10⁻⁴, 7 → 10⁻⁵', 'p = 0.1% with a 1% threshold: d = 3 → 10⁻³, 5 → 10⁻⁴, 7 → 10⁻⁵'], 'g', 2, { w: 12.4 });
      lbl(S, 'pt', 1, 6.8, ['논리 오류율(로그 축) vs 코드 거리 d', 'logical error rate (log axis) versus code distance d'], 'm', 2, { w: 16.0 });
      axes(S, 'ax', P, 2, { noy: 1 }); vl(S, 'ay', P.x0, P.y0, P.y0 + P.h, 'ink-3', 2, { w: .06 });
      curve(S, 'c1', P, pl(.1), 2, { color: 'ok', n: 40 }); ticks(S, 'tk', P, [[3, '3'], [5, '5'], [7, '7'], [9, '9'], [11, '11']], [[-4, '10⁻⁴'], [-8, '10⁻⁸']], 2, { yb: P.y0 + P.h + .12 });
      curve(S, 'c2', P, pl(.5), 3, { color: 'warn', n: 40 }); curve(S, 'c3', P, pl(2), 3, { color: 'danger', n: 40 });
      lbl(S, 'th', 19.0, 9.6, ['문턱값보다 나쁘면(빨강) d를 키울수록 오히려 나빠져요', 'above threshold (red), a larger d makes things worse'], 'r', 3, { w: 12.4 });
      lbl(S, 'wl', 19.0, 11.1, ['Google Willow(2024): d = 3 → 5 → 7마다 논리 오류가 약 2.1배씩 감소', 'Google’s Willow (2024): the logical error fell about 2.1× with each step d = 3 → 5 → 7'], 'a', 4, { w: 12.4 });
      lbl(S, 'oh', 19.0, 12.6, ['논리 큐비트 1개에 물리 큐비트 수백~1,000개가 들어요', 'one logical qubit needs hundreds to a thousand physical qubits'], 'r', 4, { w: 12.4 });
    },
    notes: [['표면 코드는 2차원 격자에 데이터 큐비트를 두고, 그 사이의 측정 큐비트가 이웃 큐비트들의 X 또는 Z 패리티를 반복해서 재요 · 거리 d = 3이면 데이터 9개와 측정 8개, 모두 17개예요', 'the surface code places data qubits on a 2D lattice, with measure qubits between them repeatedly checking the X or Z parity of their neighbors; distance d = 3 uses 9 data and 8 measure qubits, 17 in all'], ['논리 오류율은 대략 0.1(p/p_th)^((d+1)/2)예요 · 물리 오류율 0.1%가 문턱값 1%의 10분의 1이면 d를 2씩 늘릴 때마다 10배씩 줄어요', 'the logical error rate is roughly 0.1(p/p_th)^((d+1)/2): with a physical error rate of 0.1%, a tenth of the 1% threshold, every increase of d by 2 cuts it tenfold'], ['문턱값보다 물리 오류가 크면 큐비트를 늘릴수록 오히려 나빠져요 · 그래서 문턱값(약 1%) 아래로 내려가는 것이 핵심 목표였어요', 'above threshold, adding qubits only makes things worse, which is why getting below the threshold of about 1% was the central goal'], ['Google의 Willow(2024)는 d = 3, 5, 7로 키울 때마다 논리 오류가 약 2.1배씩 줄어, 문턱값 아래의 동작을 처음으로 분명히 보여줬어요 · 그래도 논리 큐비트 하나에 물리 큐비트 수백~1,000개가 들어요', 'Google’s Willow (2024) cut the logical error about 2.1× with each step from d = 3 to 5 to 7, the first clear demonstration below threshold; still, one logical qubit costs hundreds to a thousand physical qubits']],
    fin: [['표면 코드: 2차원 격자 + 이웃 패리티 측정, 문턱값 약 1%', 'the surface code: a 2D lattice with neighbor parity checks and a threshold near 1%', 'qcx-xs qcx-a'], ['문턱값 아래에서는 d가 커질수록 논리 오류가 지수적으로 줄어요', 'below threshold the logical error falls exponentially with d'], ['신드롬 해석(디코딩)도 실시간으로 빨라야 해요', 'decoding the syndromes must also keep up in real time']],
    caps: [['격자와 측정 큐비트', 'The lattice and measure qubits'], ['거리와 오류율', 'Distance and error rate'], ['문턱값', 'The threshold'], ['문턱값 아래', 'Below threshold'], ['표면 코드', 'The surface code']]
  });
}

function sHW() {
  const XC = [19.0, 23.7, 26.3, 28.9], WC = [4.6, 2.5, 2.5, 2.5];
  const RW = [[['방식', 'type'], ['게이트', 'gate time'], ['결맞음', 'coherence'], ['연결', 'links'], 1, 'qcx-a'], [['초전도', 'superconducting'], '20–100 ns', '~100 µs', ['이웃끼리', 'nearest'], 1, ''], [['이온 트랩', 'trapped ions'], '1–100 µs', ['초 이상', 'seconds+'], ['모두', 'all-to-all'], 2, ''], [['중성 원자', 'neutral atoms'], '~1 µs', ['~1초', '~1 s'], ['재배치', 'movable'], 3, ''], [['광자', 'photonic'], '~ns', ['손실 문제', 'lossy'], ['네트워크', 'networked'], 3, '']];
  return CW('qc-hardware', {
    code: [['# 초전도: 빠른 게이트(수십 ns), 극저온 약 10 mK', '# superconducting: fast gates, ~10 mK fridges'], ['# 이온 트랩: 긴 결맞음, 높은 충실도, 느린 게이트', '# ions: long coherence, high fidelity, slow'], ['# 중성 원자: 원자 수백~천 개, 위치 재배치', '# neutral atoms: hundreds to 1,000+, movable'], ['# 광자: 상온 동작 가능, 손실이 과제', '# photons: room-temperature parts, loss issues'], ['# 지표: 큐비트 수 × 충실도 × 연결성 × 속도', '# judge qubits, fidelity, connectivity, speed']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      RW.forEach((r, i) => { const st = r[4]; r.slice(0, 4).forEach((t, j) => T(S, 'hw' + i + '_' + j, XC[j], .6 + i * 1.3, t, (j ? 'qcx-tiny' : 'qcx-xs') + (i ? '' : ' qcx-a'), st, { w: WC[j] })); });
      lbl(S, 'h1', 1, 7.0, ['초전도 큐비트: 회로 자체가 인공 원자, 희석 냉동기에서 약 10 mK (IBM, Google)', 'superconducting qubits are circuits acting as artificial atoms, cooled to about 10 mK (IBM, Google)'], 'a', 1, { w: 16.0 });
      lbl(S, 'h2', 1, 8.6, ['이온 트랩: 진공 속 이온을 레이저로 조작, 모든 이온끼리 게이트 가능 (Quantinuum, IonQ)', 'trapped ions are driven by lasers in vacuum, with gates between any pair (Quantinuum, IonQ)'], 'w', 2, { w: 16.0 });
      lbl(S, 'h3', 1, 10.2, ['중성 원자는 광학 핀셋으로 배열을 바꾸고(QuEra, Pasqal), 광자는 통신과 잘 맞아요(PsiQuantum, Xanadu)', 'neutral atoms are rearranged with optical tweezers (QuEra, Pasqal), and photons suit networking (PsiQuantum, Xanadu)'], 'g', 3, { w: 16.0 });
      lbl(S, 'h4', 19.0, 7.6, ['정답 플랫폼은 아직 없어요', 'no platform has won yet'], 'a', 4, { w: 12.4 });
      lbl(S, 'h5', 19.0, 8.6, ['큐비트 수만이 아니라 2큐비트 충실도, 연결성, 속도, 오류 정정 총비용을 함께 봐요', 'compare two-qubit fidelity, connectivity, speed and total error-correction cost, not just qubit counts'], '', 4, { w: 12.4 });
      lbl(S, 'h6', 19.0, 10.9, ['결맞음 ÷ 게이트 시간 = 오류 전 연산 수의 대략', 'coherence ÷ gate time ≈ operations before errors'], 'g', 4, { w: 12.4 });
    },
    notes: [['초전도 큐비트는 조지프슨 접합 회로를 약 10 mK까지 식혀 써요 · 게이트가 수십 ns로 빠르지만 결맞음은 100 µs 안팎이고 이웃 큐비트끼리만 연결돼요', 'superconducting qubits are Josephson-junction circuits cooled to about 10 mK: gates take tens of nanoseconds, coherence is around 100 µs, and only neighboring qubits connect'], ['이온 트랩은 진공 속에 띄운 이온을 레이저로 조작해요 · 결맞음이 초 단위 이상으로 길고 충실도가 높으며 모든 이온끼리 게이트가 되지만 게이트가 느려요', 'trapped ions are levitated in vacuum and driven by lasers: coherence lasts seconds or more, fidelities are high and any pair can interact, but gates are slow'], ['중성 원자는 광학 핀셋으로 수백~천 개의 원자를 배열하고 옮길 수 있어요 · 광자 방식은 상온에 가까운 부품과 통신 친화성이 장점이지만 손실이 과제예요', 'neutral atoms are arranged and moved by optical tweezers in arrays of hundreds to a thousand, while photonic approaches offer near-room-temperature components and a natural fit with communication but struggle with loss'], ['아직 승자는 없어요 · 큐비트 수만이 아니라 2큐비트 충실도, 연결성, 속도, 그리고 오류 정정을 했을 때의 총비용을 함께 봐야 해요', 'there is no winner yet: compare two-qubit fidelity, connectivity, speed and the total cost once error correction is included, not just the qubit count']],
    fin: [['하드웨어: 초전도, 이온 트랩, 중성 원자, 광자의 장단점이 뚜렷해요', 'superconducting, trapped-ion, neutral-atom and photonic platforms each make different trade-offs', 'qcx-xs qcx-a'], ['표의 수치는 대략적인 범위로, 기기마다 달라요', 'the figures are rough ranges that vary by device'], ['대부분 클라우드로 접근해 실험할 수 있어요', 'most are available for experiments through the cloud']],
    caps: [['초전도', 'Superconducting'], ['이온 트랩', 'Trapped ions'], ['중성 원자와 광자', 'Neutral atoms and photons'], ['비교 기준', 'How to compare'], ['양자 하드웨어', 'Quantum hardware']]
  });
}
/* ===== Quantum · 6. practice and cryptography ===== */
function sTranspile() {
  const PQ = [[20.4, 1.2], [23.0, 1.2], [25.6, 1.2]];
  return CW('qc-transpile', {
    code: [['qc.cx(0, 2)  # 칩에서 q0–q2는 이웃 아님', 'qc.cx(0, 2)  # q0 and q2 are not neighbors'], 'tqc = transpile(qc, backend)', ['# 1) 배치: 논리 → 물리 큐비트', '# 1) layout: logical → physical qubits'], ['# 2) 라우팅: SWAP 삽입 (CNOT 3개)', '# 2) routing: insert SWAPs (3 CNOTs each)'], ['# 3) 변환: H = RZ(π/2)·SX·RZ(π/2)', '# 3) basis: H = RZ(π/2)·SX·RZ(π/2)']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      SV(S, 'tp', [zW([PQ[0], PQ[2]], 'ink-3', .07)].concat(PQ.map(p => zO(p, .45, 'ink-2', .06))), 1);
      PQ.forEach((p, i) => T(S, 'pq' + i, p[0] - .5, p[1] - .3, 'P' + i, 'cz-mono cz-tc qcx-tiny', 1, { w: 1.0 }));
      lbl(S, 'tl', 27.0, .7, ['칩 연결: 일직선 0–1–2', 'chip couplings: a line 0–1–2'], 'm', 1, { w: 4.4 });
      wires(S, 'w', 20.0, 24.0, [3.0, 3.9, 4.8], 1); ['q0', 'q1', 'q2'].forEach((t, i) => T(S, 'wn' + i, 18.9, 2.65 + i * .9, t, 'cz-mono qcx-tiny', 1, { w: 1.0 }));
      SV(S, 'lc', cxSV(21.6, 3.0, 4.8, 'accent'), 1); lbl(S, 'll', 24.4, 3.2, ['논리 회로: q0 → q2 CNOT', 'logical circuit: CNOT q0 → q2'], 'a', 1, { w: 6.8 });
      F(S, 'mp', 24.4, 4.7, 'q0→P0, q1→P1, q2→P2', 'w', 2, { w: 6.8 });
      lbl(S, 'ml', 19.0, 5.9, ['배치: 자주 상호작용하는 큐비트를 가까이, 오류가 적은 곳에', 'layout puts interacting qubits close together on low-error hardware'], 'w', 2, { w: 12.4 });
      wires(S, 'r', 20.0, 26.0, [7.8, 8.7, 9.6], 3); ['P0', 'P1', 'P2'].forEach((t, i) => T(S, 'rn' + i, 18.9, 7.45 + i * .9, t, 'cz-mono qcx-tiny', 3, { w: 1.0 }));
      SV(S, 'sw', cxSV(21.0, 8.7, 9.6, 'danger').concat(cxSV(22.0, 9.6, 8.7, 'danger'), cxSV(23.0, 8.7, 9.6, 'danger'), cxSV(24.6, 7.8, 8.7, 'accent')), 3);
      lbl(S, 'sl', 26.4, 7.9, ['SWAP = CNOT 3개 → 2큐비트 게이트 1개가 4개로', 'SWAP = 3 CNOTs, so 1 two-qubit gate became 4'], 'r', 3, { w: 5.0 });
      [['H', 'accent', 1.0], ['=', '', .6], ['RZ(π/2)', 'ok', 2.4], ['SX', 'ok', 1.2], ['RZ(π/2)', 'ok', 2.4]].reduce((x, [t, c, w], i) => { if (c) chip(S, 'bt' + i, x, 10.7, w, t, c, 4, { h: .85 }); else T(S, 'bt' + i, x, 10.75, t, 'cz-tc qcx-xs', 4, { w }); return x + w + .25; }, 19.0);
      lbl(S, 'op', 19.0, 11.9, ['최적화가 겹친 회전을 합치고 서로 지우는 게이트를 없애요', 'optimization merges rotations and removes gates that cancel'], 'g', 4, { w: 12.4 });
      F(S, 'st', 1, 7.0, ['2큐비트 게이트 1 → 4, 깊이 1 → 4', 'two-qubit gates 1 → 4, depth 1 → 4'], 'r', 3, { w: 16.0 });
      lbl(S, 'c1', 1, 8.3, ['같은 알고리즘도 칩 구조에 따라 비용이 달라요', 'the same algorithm costs differently on different chip topologies'], '', 4, { w: 16.0 });
      lbl(S, 'c2', 1, 9.9, ['트랜스파일된 회로의 CX 수와 깊이로 실제 비용을 가늠해요', 'the transpiled CX count and depth estimate the real cost'], 'a', 4, { w: 16.0 });
    },
    notes: [['실제 칩은 정해진 큐비트끼리만 2큐비트 게이트를 걸 수 있어요 · 여기선 0–1–2가 일직선이라 0과 2는 이웃이 아닌데, 회로는 q0 → q2 CNOT을 요구해요', 'real chips allow two-qubit gates only between coupled qubits; here 0–1–2 form a line, so 0 and 2 are not neighbors, yet the circuit asks for a CNOT from q0 to q2'], ['트랜스파일러는 먼저 논리 큐비트를 물리 큐비트에 배치해요 · 자주 상호작용하는 큐비트를 가깝게, 오류가 적은 곳에 두려고 해요', 'the transpiler first lays out logical qubits on physical ones, keeping frequently interacting qubits close and on low-error hardware'], ['이웃이 아니면 SWAP으로 상태를 옮겨요 · SWAP은 CNOT 3개라 2큐비트 게이트 1개가 4개가 되고 깊이도 늘어요', 'non-neighbors are bridged with SWAPs, each three CNOTs, so one two-qubit gate becomes four and the depth grows'], ['마지막으로 하드웨어가 지원하는 기본 게이트로 바꿔요 · H는 RZ(π/2)·SX·RZ(π/2)가 되고, 최적화 단계가 합칠 수 있는 회전을 합쳐요', 'finally gates are rewritten in the hardware’s native set, H becoming RZ(π/2)·SX·RZ(π/2), and an optimization pass merges rotations where it can']],
    fin: [['트랜스파일: 배치 → 라우팅(SWAP) → 기본 게이트 변환 → 최적화', 'transpiling: layout → routing (SWAPs) → basis translation → optimization', 'qcx-xs qcx-a'], ['연결성이 나쁘면 SWAP 때문에 2큐비트 게이트가 크게 늘어요', 'poor connectivity inflates two-qubit gate counts through SWAPs'], ['기본 게이트 집합은 하드웨어마다 달라요', 'native gate sets differ between hardware platforms']],
    caps: [['칩의 연결', 'Chip connectivity'], ['배치', 'Layout'], ['라우팅과 SWAP', 'Routing and SWAPs'], ['기본 게이트 변환', 'Basis translation'], ['회로 컴파일(트랜스파일)', 'Compiling circuits (transpilation)']]
  });
}

function sSim() {
  const cs = .75, x0 = 19.0, y0 = 2.0, ARC = []; for (let i = 0; i < 16; i++) if (!(i & 2)) { const a = x0 + i * cs + cs / 2, b = x0 + (i + 2) * cs + cs / 2, top = y0 - .15, h = .55 + (i % 4) * .2; ARC.push(zW([[a, top], [a, top - h], [b, top - h], [b, top]], 'warn', .04)); }
  const MEM = [['20', '17 MB', ['노트북', 'a laptop'], 'ok'], ['30', '17 GB', ['좋은 노트북', 'a strong laptop'], 'ok'], ['40', '18 TB', ['슈퍼컴퓨터', 'a supercomputer'], 'warn'], ['50', '18 PB', ['최대 슈퍼컴퓨터 이상', 'beyond the largest machines'], 'danger']];
  return CW('qc-sim', {
    code: ['psi = np.zeros(2**n, complex); psi[0] = 1', ['t = psi.reshape([2] * n)  # 큐비트마다 축 하나', 't = psi.reshape([2] * n)  # one axis per qubit'], 't = np.tensordot(U, t, axes=(1, k))', ['# 메모리 16 × 2^n B: 30큐비트면 17 GB', '# memory 16 × 2^n B: 17 GB at 30 qubits'], ['# 클리퍼드·얕은 회로는 훨씬 싸게 시뮬레이션', '# Clifford or shallow circuits are cheaper']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      GR(S, 'sv', x0, y0, cs, [[...Array(16)].map((_, i) => i ? .12 : .9)], 'accent', 1, { gap: .06 });
      [0, 15].forEach((i, j) => T(S, 'si' + j, x0 + i * cs - .3, y0 + .85, String(i), 'cz-mono cz-tc qcx-tiny', 1, { w: 1.35 }));
      lbl(S, 'sl', 19.0, 3.4, ['n = 4: 진폭 16개 배열, 처음엔 |0000⟩만 1', 'n = 4: an array of 16 amplitudes, only |0000⟩ starts at 1'], 'a', 1, { w: 12.4 });
      SV(S, 'ar', ARC, 2);
      lbl(S, 'gl', 19.0, 5.0, ['큐비트 1에 게이트: 비트 1만 다른 8쌍(위 연결선)을 2×2 행렬로 갱신 → 게이트마다 2^n에 비례', 'a gate on qubit 1 updates the 8 pairs differing only in bit 1 (linked above) with a 2×2 matrix, so each gate costs ∝ 2^n'], 'w', 2, { w: 12.4 });
      MEM.forEach(([n, m, who, c], i) => { const y = 7.1 + i * .95; T(S, 'mn' + i, 1.0, y, n, 'cz-mono qcx-xs qcx-a', 3, { w: 1.6 }); T(S, 'mm' + i, 2.8, y, m, 'cz-mono qcx-xs', 3, { w: 3.0 }); T(S, 'mw' + i, 6.2, y, who, 'qcx-xs qcx-' + ({ ok: 'g', warn: 'w', danger: 'r' })[c], 3, { w: 11.0 }); });
      lbl(S, 'mh', 1, 6.9 + 4 * .95 + .3, ['큐비트가 하나 늘 때마다 메모리와 시간이 두 배', 'each extra qubit doubles memory and time'], 'r', 3, { w: 16.0 });
      lbl(S, 'clf', 19.0, 7.6, ['클리퍼드 회로(H, S, CNOT만)는 고틀리프-닐 정리로 다항 시간 시뮬레이션', 'Clifford circuits (only H, S, CNOT) simulate in polynomial time (Gottesman–Knill)'], 'g', 4, { w: 12.4 });
      lbl(S, 'tn', 19.0, 9.2, ['얽힘이 적거나 얕은 회로는 텐서 네트워크로 수백 큐비트까지', 'low-entanglement or shallow circuits reach hundreds of qubits with tensor networks'], 'g', 4, { w: 12.4 });
      lbl(S, 'ad', 19.0, 10.8, ['양자 우위 주장은 이런 고전 방법과의 경주예요', 'quantum-advantage claims are a race against these classical methods'], 'a', 4, { w: 12.4 });
    },
    notes: [['상태 벡터 시뮬레이터는 2^n개 진폭을 배열에 그대로 저장해요 · 4큐비트면 16개이고, 처음엔 |0000⟩에만 1이 있어요', 'a statevector simulator stores all 2^n amplitudes in an array: 16 for four qubits, starting with 1 on |0000⟩ only'], ['1큐비트 게이트는 해당 비트만 다른 진폭 쌍에 2×2 행렬을 곱해요 · 큐비트 1에 걸면 8쌍을 갱신하니, 게이트 하나에 2^n에 비례하는 계산이 들어요', 'a single-qubit gate multiplies each pair of amplitudes differing only in that bit by a 2×2 matrix; on qubit 1 that means 8 pairs, so every gate costs work proportional to 2^n'], ['진폭 하나가 16바이트라 30큐비트면 17 GB, 40큐비트면 18 TB, 50큐비트면 18 PB예요 · 큐비트가 하나 늘 때마다 메모리와 시간이 두 배예요', 'at 16 bytes per amplitude, 30 qubits take 17 GB, 40 qubits 18 TB and 50 qubits 18 PB, doubling memory and time with every extra qubit'], ['그래도 다른 길이 있어요 · H, S, CNOT만 쓰는 클리퍼드 회로는 다항 시간에, 얽힘이 적은 회로는 텐서 네트워크로 훨씬 큰 규모까지 시뮬레이션할 수 있어요', 'other routes exist: Clifford circuits using only H, S and CNOT simulate in polynomial time, and low-entanglement circuits reach far larger sizes with tensor networks']],
    fin: [['상태 벡터 시뮬레이션: 메모리·시간 ∝ 2^n', 'statevector simulation costs memory and time ∝ 2^n', 'qcx-xs qcx-a'], ['알고리즘 개발과 디버깅은 대부분 시뮬레이터에서 해요', 'most algorithm development and debugging happens on simulators'], ['노이즈 모델을 넣어 실제 기기를 흉내 내기도 해요', 'noise models let simulators mimic real devices']],
    caps: [['진폭 배열', 'The amplitude array'], ['게이트 적용', 'Applying a gate'], ['지수적 비용', 'Exponential cost'], ['다른 시뮬레이션 방법', 'Other simulation methods'], ['양자 회로 시뮬레이션', 'Simulating quantum circuits']]
  });
}

function sPQC() {
  const AL = [[['RSA, ECDH, ECDSA', 'RSA, ECDH, ECDSA'], ['쇼어로 깨짐', 'broken by Shor'], 'r', 1], [['AES-128', 'AES-128'], ['그로버로 64비트급', '64-bit level under Grover'], 'w', 2], [['AES-256, SHA-256', 'AES-256, SHA-256'], ['충분히 안전', 'still safe'], 'g', 2]];
  const SZ = [['X25519 pk 32 B', 32, 'ink-3'], ['ML-KEM-768 pk 1,184 B', 1184, 'ok'], ['ML-KEM-768 ct 1,088 B', 1088, 'ok']];
  return CW('qc-pqc', {
    code: [['# 쇼어: RSA, 타원 곡선 → 깨짐', '# Shor: RSA and elliptic curves break'], ['# 그로버: AES-128 → 64비트 수준 → AES-256', '# Grover: AES-128 → 64-bit level → AES-256'], 'kem = ML_KEM_768()       # FIPS 203 (Kyber)', 'pk, sk = kem.keygen()    # pk 1,184 B', 'ct, ss = kem.encaps(pk)  # ct 1,088 B'],
    hl: [[0, 1, 'danger'], [1, 1, 'warn'], [2, 3, 'ok'], [3, 2, 'accent']],
    draw: (S) => {
      AL.forEach(([a, b, c, st], i) => { T(S, 'aa' + i, 19.0, .6 + i * .95, a, 'cz-mono qcx-xs', st, { w: 5.6 }); T(S, 'ab' + i, 24.8, .6 + i * .95, b, 'qcx-xs qcx-' + c, st, { w: 6.6 }); });
      F(S, 'lw', 19.0, 3.8, 'b = A·s + e (mod q)', 'a', 3, { w: 12.4 });
      F(S, 'lx', 19.0, 4.8, '[[3,7],[5,2]]·[4,1] + [1,−1] = [20,21] ≡ [7,8] (mod 13)', 'g', 3, { w: 12.4 });
      lbl(S, 'll', 19.0, 6.0, ['작은 오차 e 때문에 b에서 비밀 s를 되찾기 어려워요 (LWE, 격자 문제)', 'the small error e makes recovering the secret s from b hard (LWE, a lattice problem)'], '', 3, { w: 12.4 });
      SZ.forEach(([t, v, c], i) => { const y = 7.0 + i * 1.0; lbl(S, 'sz' + i, 1.0, y, t, '', 3, { w: 7.4 }); rect(S, 'sb' + i, 8.6, y + .05, v / 1184 * 8.0, .6, c, 55, 3, { r: .06 }); });
      lbl(S, 'szl', 1, 10.1, ['키와 암호문이 커지는 것이 주된 비용이에요', 'larger keys and ciphertexts are the main cost'], 'w', 3, { w: 16.0 });
      lbl(S, 'hn', 19.0, 7.7, ['지금 가로챈 암호문을 나중에 풀 수 있어요(harvest now, decrypt later) → 오래 지켜야 할 데이터부터 전환', 'ciphertext captured today can be decrypted later (harvest now, decrypt later), so long-lived data moves first'], 'r', 4, { w: 12.4 });
      lbl(S, 'hy', 19.0, 9.9, ['TLS는 X25519 + ML-KEM-768 하이브리드 키 교환을 이미 배포 중이에요', 'TLS already deploys hybrid X25519 + ML-KEM-768 key exchange'], 'g', 4, { w: 12.4 });
      lbl(S, 'ns', 1, 11.4, ['NIST 표준(2024년 8월): ML-KEM(FIPS 203), ML-DSA(204), SLH-DSA(205)', 'NIST standards (Aug 2024): ML-KEM (FIPS 203), ML-DSA (204), SLH-DSA (205)'], 'a', 4, { w: 16.0 });
    },
    notes: [['쇼어 알고리즘은 RSA와 타원 곡선 암호(ECDH, ECDSA)의 바탕인 인수분해와 이산 로그를 다항 시간에 풀어요 · 오류 정정된 대형 양자 컴퓨터가 나오면 이들이 깨져요', 'Shor’s algorithm solves factoring and discrete logarithms, the foundations of RSA and elliptic-curve cryptography (ECDH, ECDSA), in polynomial time, so a large error-corrected quantum computer would break them'], ['대칭키 암호와 해시는 그로버로 탐색이 √N이 될 뿐이에요 · AES-128은 64비트 수준으로 약해지므로 AES-256을 쓰면 충분해요', 'symmetric ciphers and hashes only see Grover’s √N search: AES-128 drops to a 64-bit level, so AES-256 suffices'], ['양자 내성 암호는 양자 컴퓨터로도 어려운 수학 문제를 써요 · ML-KEM은 b = A·s + e처럼 작은 오차를 섞은 격자 문제(LWE)에 기대고, 공개 키가 1,184 B로 X25519의 32 B보다 크다는 비용이 있어요', 'post-quantum cryptography uses problems hard even for quantum computers: ML-KEM relies on a lattice problem with small added errors, b = A·s + e (LWE), at the cost of a 1,184-byte public key versus 32 bytes for X25519'], ['지금 가로챈 암호문을 나중에 풀 수 있으므로(harvest now, decrypt later) 오래 지켜야 할 데이터부터 전환해요 · NIST가 2024년 8월 ML-KEM, ML-DSA, SLH-DSA를 표준으로 발표했고, TLS는 X25519 + ML-KEM 하이브리드를 이미 쓰고 있어요', 'because ciphertext captured today can be decrypted later (harvest now, decrypt later), long-lived data moves first; NIST published ML-KEM, ML-DSA and SLH-DSA as standards in August 2024, and TLS already uses hybrid X25519 + ML-KEM']],
    fin: [['양자 내성 암호: RSA·ECC 대신 격자·해시 기반 알고리즘으로', 'post-quantum cryptography replaces RSA and ECC with lattice- and hash-based schemes', 'qcx-xs qcx-a'], ['양자 키 분배와 달리 기존 네트워크와 소프트웨어로 쓸 수 있어요', 'unlike quantum key distribution, it runs on existing networks and software'], ['전환에 몇 년이 걸리므로 알고리즘을 쉽게 바꾸는 설계(암호 민첩성)가 중요해요', 'migration takes years, so crypto agility, designing to swap algorithms easily, matters']],
    caps: [['쇼어의 위협', 'The threat from Shor'], ['그로버와 대칭키', 'Grover and symmetric keys'], ['격자 기반 ML-KEM', 'Lattice-based ML-KEM'], ['전환', 'Migration'], ['양자 내성 암호', 'Post-quantum cryptography']]
  });
}

function sQAOA() {
  const N = [[20.4, 1.0], [23.4, 1.0], [23.4, 4.0], [20.4, 4.0]], E = [[0, 1], [1, 2], [2, 3], [3, 0]];
  return CW('qc-qaoa', {
    code: [['for gamma, beta in params:  # p층', 'for gamma, beta in params:  # p layers'], '    for i, j in edges: qc.rzz(2*gamma, i, j)', '    for k in nodes: qc.rx(2*beta, k)', ['cut = expected_cut(qc)      # p=1: 4 중 3.0', 'cut = expected_cut(qc)      # p=1: 3.0 of 4'], ['params = optimize(cut)      # 고전 최적화', 'params = optimize(cut)      # classical step']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      SV(S, 'ge', E.map(([a, b]) => zW([N[a], N[b]], 'ink-2', .07)), 1);
      N.forEach((p, i) => chip(S, 'nd' + i, p[0] - .5, p[1] - .45, 1.0, String(i), 'ink', 1, { h: .9 }));
      lbl(S, 'mc', 24.6, .6, ['MaxCut: 노드를 두 편으로 나눠 끊기는 간선 수를 최대로', 'MaxCut: split the nodes into two sides to cut as many edges as possible'], 'a', 1, { w: 6.8 });
      box2(S, 'l1', 19.0, 5.4, 6.0, .9, ['RZZ(2γ) × 간선 4', 'RZZ(2γ) × 4 edges'], 'warn', 2); box2(S, 'l2', 25.3, 5.4, 6.0, .9, ['RX(2β) × 노드 4', 'RX(2β) × 4 nodes'], 'accent', 2);
      lbl(S, 'll', 19.0, 6.6, ['비용 위상 → 섞기 층을 p번 반복 (p = 1, γ = π/4, β = π/8)', 'cost phase then mixing, repeated p times (p = 1, γ = π/4, β = π/8)'], 'w', 2, { w: 12.4 });
      AMP(S, 'hc', 19.6, 11.2, [['컷 0', 'cut 0'], ['컷 2', 'cut 2'], ['컷 4', 'cut 4']], [.031, .4375, .531], 3, { w: 1.6, gap: .9, sc: 4.0, lw: 2.0, c: (v, i) => i === 2 ? 'ok' : 'accent', vt: v => v.toFixed(2) });
      F(S, 'ec', 26.6, 9.0, ['E[컷] = 2 × 0.44 + 4 × 0.53 = 3.0', 'E[cut] = 2 × 0.44 + 4 × 0.53 = 3.0'], 'g', 3, { w: 4.8 });
      F(S, 'rt', 1, 7.0, ['기대 컷 3.0 / 최대 4 = 0.75', 'expected cut 3.0 / max 4 = 0.75'], 'g', 3, { w: 16.0 });
      [0, 2].forEach(i => chip(S, 'na' + i, N[i][0] - .5, N[i][1] - .45, 1.0, String(i), 'accent', 4, { h: .9 })); [1, 3].forEach(i => chip(S, 'nb' + i, N[i][0] - .5, N[i][1] - .45, 1.0, String(i), 'warn', 4, { h: .9 }));
      SV(S, 'gc', E.map(([a, b]) => zW([N[a], N[b]], 'danger', .09, true)), 4);
      lbl(S, 'bs', 1, 8.2, ['최고 답 0101/1010: 간선 4개 모두 끊김 (확률 0.53)', 'best answers 0101/1010 cut all 4 edges (probability 0.53)'], 'r', 4, { w: 16.0 });
      lbl(S, 'lm', 1, 9.6, ['층 p를 늘리면 좋아지지만 회로가 깊어져 노이즈가 쌓여요', 'more layers p help but deepen the circuit and add noise'], '', 4, { w: 16.0 });
      lbl(S, 'gw', 1, 11.0, ['진짜 과제는 고에만스-윌리엄슨(0.878배 보장) 같은 고전 알고리즘을 넘는 것', 'the real test is beating classical methods such as Goemans–Williamson’s 0.878 guarantee'], 'a', 4, { w: 16.0 });
    },
    notes: [['QAOA는 조합 최적화를 위한 변분 양자 알고리즘이에요 · 4개 노드 고리의 MaxCut, 곧 노드를 두 편으로 나눠 끊기는 간선을 최대로 만드는 문제를 풀어요', 'QAOA is a variational quantum algorithm for combinatorial optimization, applied here to MaxCut on a ring of 4 nodes: splitting the nodes into two sides so that as many edges as possible are cut'], ['균등 중첩에서 시작해 간선마다 비용 위상 RZZ(2γ)를, 큐비트마다 섞는 RX(2β)를 거는 층을 p번 반복해요', 'starting from a uniform superposition, it repeats p layers of a cost phase RZZ(2γ) on every edge followed by a mixing RX(2β) on every qubit'], ['p = 1에서 γ = π/4, β = π/8로 맞추면 컷이 4인 비트열이 0.53, 2가 0.44, 0이 0.03 확률로 나와 기대값이 3.0이에요 · 최적값 4의 75%예요', 'at p = 1 with γ = π/4 and β = π/8, bit strings cutting 4 edges appear with probability 0.53, cutting 2 with 0.44 and 0 with 0.03, an expected cut of 3.0, 75% of the optimum 4'], ['측정한 비트열 중 가장 좋은 0101, 1010이 최적 답이에요 · 층을 늘리면 좋아지지만 회로가 깊어져 노이즈가 쌓이고, 고에만스-윌리엄슨처럼 성능이 보장된 고전 알고리즘을 넘는 것이 진짜 과제예요', 'the best measured strings, 0101 and 1010, are optimal; more layers help but deepen the circuit and add noise, and the real challenge is beating classical algorithms with guarantees such as Goemans–Williamson']],
    fin: [['QAOA: 비용 위상 + 섞기 층을 반복하고 γ, β를 고전적으로 최적화', 'QAOA repeats cost-phase and mixing layers and tunes γ and β classically', 'qcx-xs qcx-a'], ['측정 결과 중 가장 좋은 비트열이 답 후보예요', 'the best measured bit string is the candidate answer'], ['양자 어닐링(D-Wave)도 비슷한 최적화 문제를 노려요', 'quantum annealers such as D-Wave target similar optimization problems']],
    caps: [['MaxCut 문제', 'The MaxCut problem'], ['QAOA 층', 'QAOA layers'], ['결과 분포', 'The outcome distribution'], ['한계와 비교', 'Limits and comparisons'], ['양자 근사 최적화(QAOA)', 'The quantum approximate optimization algorithm (QAOA)']]
  });
}

function sAdv() {
  const RC = [...Array(4)].map((_, i) => [...Array(10)].map((_, j) => .15 + ((i * 5 + j * 7 + i * j) % 9) / 11));
  const PT = [.9, .2, .5, .1, .7, .3, .05, .6, .15, .4, .8, .25];
  const LG = [[['Sycamore 2019: 200초', 'Sycamore 2019: 200 s'], 2.3, 'accent', 2], [['당시 주장: 1만 년', 'claimed then: 10⁴ yr'], 11.5, 'danger', 2], [['텐서 네트워크: 수 시간', 'tensor nets: hours'], 4.7, 'ok', 3], [['Willow 2024: 5분 미만', 'Willow 2024: < 5 min'], 2.5, 'accent', 4], [['고전 추정: 10^25년', 'estimate: 10^25 yr'], 32.5, 'danger', 4]];
  return CW('qc-advantage', {
    code: [['# 무작위 회로 샘플링(RCS): 양자에 유리한 과제', '# random circuit sampling: built to favor QC'], ['# 2019 Sycamore 53큐비트: 200초 vs 주장 1만 년', '# 2019 Sycamore 53q: 200 s vs claimed 10k yr'], ['# 이후 고전 텐서 네트워크가 격차를 좁혔어요', '# tensor networks later narrowed the gap'], ['# 2024 Willow 105큐비트: 5분 vs 10^25년', '# 2024 Willow, 105 qubits: 5 min vs 10^25 yr'], ['# 다음 목표: 유용한 문제에서의 이점', '# next goal: advantage on useful problems']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'danger'], [3, 2, 'ok']],
    draw: (S) => {
      GR(S, 'rc', 19.0, .6, .45, RC, 'accent', 1, { gap: .05 }); T(S, 'rcl', 19.0, 2.5, ['무작위 게이트 회로', 'a random gate circuit'], 'qcx-tiny', 1, { w: 4.5 });
      PT.forEach((p, i) => rect(S, 'pt' + i, 24.6 + i * .55, 2.4 - p * 1.8, .42, p * 1.8, 'warn', 60, 1, { r: .04 }));
      T(S, 'ptl', 24.6, 2.5, ['출력: 들쭉날쭉한 분포에서 샘플링', 'uneven output distribution'], 'qcx-tiny', 1, { w: 6.8 });
      lbl(S, 'rl', 19.0, 3.4, ['고전으로 흉내 내기 어렵도록 고른 과제예요', 'a task chosen to be hard to mimic classically'], 'a', 1, { w: 12.4 });
      LG.forEach(([t, v, c, st], i) => { const y = 4.8 + i * 1.05 + (i > 2 ? .4 : 0); lbl(S, 'lg' + i, 19.0, y, t, '', st, { w: 6.0 }); rect(S, 'lb' + i, 25.2, y + .05, v * .18, .6, c, 55, st, { r: .06 }); });
      T(S, 'lgs', 25.0, 10.5, ['막대: 걸린 시간(초, 로그 축)', 'bars: time in seconds (log axis)'], 'qcx-tiny', 2, { w: 6.2 });
      lbl(S, 'cm', 1, 7.0, ['고전 알고리즘도 계속 발전해서 우위 주장은 움직이는 목표예요', 'classical algorithms keep improving, so advantage claims are a moving target'], 'r', 3, { w: 16.0 });
      lbl(S, 'uf', 1, 8.6, ['RCS 자체는 쓸모 있는 계산이 아니에요: 화학·재료처럼 유용한 문제에서 이기는 것이 다음 목표', 'random circuit sampling is not useful in itself; winning on useful problems such as chemistry and materials is the next goal'], 'g', 4, { w: 16.0 });
      lbl(S, 'lq', 1, 10.6, ['오류 정정된 논리 큐비트의 수와 품질이 진짜 이정표예요', 'the number and quality of error-corrected logical qubits are the real milestones'], 'a', 4, { w: 16.0 });
    },
    notes: [['양자 우위는 양자 컴퓨터가 어떤 고전 컴퓨터로도 현실적인 시간 안에 못 하는 계산을 해내는 것이에요 · 무작위 회로 샘플링(RCS)은 이를 보이려고 고른, 양자에 유리한 과제예요', 'quantum advantage means a quantum computer completing a computation no classical computer can finish in reasonable time; random circuit sampling (RCS) is a task chosen to favor quantum hardware for this purpose'], ['2019년 Google의 Sycamore(53큐비트)는 RCS를 200초 만에 했고, 슈퍼컴퓨터로는 1만 년이 걸린다고 주장했어요', 'in 2019 Google’s 53-qubit Sycamore performed RCS in 200 seconds and claimed a supercomputer would need 10,000 years'], ['이후 텐서 네트워크 같은 고전 방법이 발전해 같은 과제를 수 시간 수준으로 재현하면서 격차가 크게 줄었어요 · 우위는 고전 알고리즘과의 움직이는 경주예요', 'classical methods such as tensor networks then improved enough to reproduce the task in hours, shrinking the gap, so advantage is a moving race against classical algorithms'], ['2024년 Willow(105큐비트)는 더 큰 RCS를 5분 안에 해서 고전 추정 10^25년과의 격차를 크게 벌렸고, 오류 정정의 문턱값 아래 동작도 보였어요 · 이제 목표는 쓸모 있는 문제에서의 이점과 오류 정정된 논리 큐비트예요', 'in 2024 the 105-qubit Willow ran a larger RCS in under five minutes against a classical estimate of 10^25 years and also showed error correction below threshold; the goals now are advantage on useful problems and error-corrected logical qubits']],
    fin: [['양자 우위: 특정 과제에서 고전보다 압도적으로 빠름 (RCS)', 'quantum advantage: overwhelming speed on a specific task such as random circuit sampling', 'qcx-xs qcx-a'], ['우위 주장은 고전 알고리즘의 발전과 계속 경쟁해요', 'advantage claims keep competing with improving classical algorithms'], ['유용한 우위와 오류 정정된 기계가 다음 단계예요', 'useful advantage and error-corrected machines are the next steps']],
    caps: [['무작위 회로 샘플링', 'Random circuit sampling'], ['2019년 Sycamore', 'Sycamore in 2019'], ['고전의 반격', 'The classical response'], ['Willow와 다음 목표', 'Willow and what comes next'], ['양자 우위', 'Quantum advantage']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('qc-states', '큐비트와 상태', 'Qubits and states', '진폭으로 표현하는 정보', 'Information as amplitudes', '큐비트의 진폭과 측정 확률, 블로흐 구, 측정 기저와 붕괴, 여러 큐비트의 텐서곱과 지수적으로 늘어나는 상태, 얽힘을 봐요.', 'Qubit amplitudes and measurement probabilities, the Bloch sphere, measurement bases and collapse, the tensor product and exponential state size of many qubits, and entanglement.', [
    item('qc-qubit', '큐비트', 'The qubit',
      '큐비트는 |0⟩과 |1⟩의 중첩 α|0⟩ + β|1⟩이에요. 측정하면 |α|²의 확률로 0, |β|²의 확률로 1이 나오고, 진폭의 제곱 합은 1이에요.',
      '고전 비트는 0 아니면 1이지만, 큐비트의 상태는 두 기저 상태 |0⟩과 |1⟩의 중첩 α|0⟩ + β|1⟩이에요. α와 β는 진폭이라 부르는 복소수이고, 제곱 크기의 합 |α|² + |β|²는 항상 1이에요. 진폭이 [0.6, 0.8]이면 0.36 + 0.64 = 1이죠. 측정하면 |α|² = 0.36의 확률로 0, |β|² = 0.64의 확률로 1이 나와요. 진폭 자체는 확률이 아니고 제곱해야 확률이 된다는 점, 그리고 진폭이 음수나 복소수가 될 수 있다는 점이 간섭이라는 양자 계산의 핵심을 만들어요. 한 번 측정하면 0이나 1 하나만 나오고 상태도 그 값으로 바뀌어서, 같은 상태를 100번 준비해 측정하면 0이 36번 안팎 나오는 식으로만 진폭을 짐작할 수 있어요. 중첩은 "0과 1이 동시에"라기보다 진폭을 가진 하나의 상태라고 보는 편이 정확해요.',
      'A qubit is a superposition α|0⟩ + β|1⟩: measurement gives 0 with probability |α|² and 1 with probability |β|², and the squared amplitudes sum to 1.',
      'A classical bit is either 0 or 1, but a qubit’s state is a superposition α|0⟩ + β|1⟩ of the basis states |0⟩ and |1⟩. The amplitudes α and β are complex numbers whose squared magnitudes always add up to 1: amplitudes [0.6, 0.8] give 0.36 + 0.64 = 1. Measuring yields 0 with probability |α|² = 0.36 and 1 with probability |β|² = 0.64. Amplitudes are not probabilities until squared, and they can be negative or complex, which makes interference, the heart of quantum computation, possible. A single measurement returns just one 0 or 1 and leaves the state in that value, so amplitudes can only be inferred statistically, for example by preparing the same state 100 times and seeing about 36 zeros. Superposition is better understood as one state with amplitudes than as “0 and 1 at the same time”.', sQubit()),
    item('qc-bloch', '블로흐 구', 'The Bloch sphere',
      '큐비트 상태는 구 위의 한 점으로 그릴 수 있어요. 위도 θ가 측정 확률을, 경도 φ가 상대 위상을 정하고, 게이트는 구의 회전이에요.',
      '진폭에서 측정에 의미 있는 것은 두 진폭의 크기 비율과 상대 위상뿐이라, 큐비트 상태는 |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩로 쓸 수 있고 구(블로흐 구) 위의 한 점이 돼요. 북극이 |0⟩, 남극이 |1⟩, 적도 위의 점들은 |+⟩, |−⟩, |+i⟩처럼 0과 1이 반반인 상태예요. θ = 60°라면 진폭은 cos 30° = 0.866과 sin 30° = 0.5이고, 0이 나올 확률은 0.866² = 0.75예요. 즉 높이가 측정 확률을 보여줘요. 경도 φ는 상대 위상이라 φ를 바꿔도 높이와 P(0)는 그대로지만, 뒤에 오는 게이트와 만나면 간섭 결과가 달라져요. 단일 큐비트 게이트는 이 구를 돌리는 회전이라, X는 x축으로 180°, Z는 z축으로 180° 돌려요. 전체 위상 e^(iγ)는 측정에 영향이 없어서 무시해요.',
      'A qubit state is a point on a sphere: the polar angle θ sets the measurement probability, the azimuth φ the relative phase, and gates rotate the sphere.',
      'Only the ratio of the two amplitudes’ magnitudes and their relative phase matter for measurement, so a qubit state can be written |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩, a point on a sphere called the Bloch sphere. The north pole is |0⟩, the south pole |1⟩, and points on the equator such as |+⟩, |−⟩ and |+i⟩ are half 0 and half 1. With θ = 60° the amplitudes are cos 30° = 0.866 and sin 30° = 0.5, and the probability of 0 is 0.866² = 0.75, so the height shows the measurement probability. The azimuth φ is the relative phase: changing it keeps the height and P(0) but changes how later gates interfere. Single-qubit gates are rotations of the sphere, X turning 180° about the x axis and Z 180° about the z axis. A global phase e^(iγ) has no effect on measurement and is ignored.', sBloch()),
    item('qc-measure', '측정과 기저', 'Measurement and bases',
      '측정 결과는 어떤 기준(기저)으로 재느냐에 달려 있고, 측정하면 상태가 나온 값으로 붕괴해요. |+⟩는 Z 기준에서는 반반, X 기준에서는 항상 +예요.',
      '|+⟩ = (|0⟩ + |1⟩)/√2는 두 진폭이 0.707로 같은 상태예요. 0/1 기준(Z 기준)으로 측정하면 0과 1이 반반씩 나와서 동전 던지기와 구별이 안 돼요. 그런데 측정 직전에 아다마르 게이트 H를 걸어 +/− 기준(X 기준)으로 재면 매번 +가 나와요. 같은 상태라도 어떤 기준으로 재느냐에 따라 결과가 완전히 다르고, |+⟩는 무작위 비트가 아니라 X 기준에서는 확정된 상태인 거예요. 측정은 상태를 바꿔요. 측정하면 중첩이 사라지고 상태가 나온 값의 기저 상태로 붕괴해서, 이어서 다시 재면 같은 값이 나와요. 그래서 측정은 보통 계산의 마지막에, 원하는 정보를 담은 기준으로 하고, 결과는 고전 비트로 저장해요.',
      'Results depend on the basis measured in, and measurement collapses the state to its outcome: |+⟩ is 50/50 in the Z basis but always + in the X basis.',
      '|+⟩ = (|0⟩ + |1⟩)/√2 has two equal amplitudes of 0.707. Measured in the 0/1 (Z) basis it gives 0 and 1 half the time each, indistinguishable from a coin toss. But applying a Hadamard gate H just before measuring, which measures in the +/− (X) basis, gives + every time. The same state gives completely different results depending on the basis, and |+⟩ is not a random bit at all: in the X basis its outcome is certain. Measurement also changes the state: the superposition is destroyed and the state collapses to the basis state that was observed, so measuring again repeats the same value. That is why measurement usually comes at the end of a computation, in a basis that holds the wanted information, with results stored as classical bits.', sMeasure()),
    item('qc-multi', '여러 큐비트', 'Multiple qubits',
      'n큐비트의 상태는 텐서곱으로 만든 2^n개의 진폭이에요. 50큐비트면 진폭이 약 10^15개라 고전 컴퓨터에 그대로 저장하기 어려워요.',
      '큐비트가 둘이면 전체 상태는 각 큐비트 상태의 텐서곱(크로네커 곱)으로 만든 4개의 진폭 |00⟩, |01⟩, |10⟩, |11⟩이에요. q0이 |+⟩, q1이 |0⟩이면 |01⟩의 진폭은 (q1이 0일 진폭 1) × (q0이 1일 진폭 0.707) = 0.707이에요. 큐비트가 하나 늘 때마다 진폭 수가 두 배가 되어 n큐비트는 2^n개의 진폭을 가져요. 10큐비트는 1,024개, 30큐비트는 약 10억 개, 50큐비트는 약 10^15개예요. 진폭 하나를 복소수 16바이트로 저장하면 30큐비트는 17 GB, 50큐비트는 약 18 PB가 필요해요. 고전 컴퓨터로 양자 상태를 그대로 시뮬레이션하기 어려운 이유이자 양자 컴퓨터의 잠재력이에요. 다만 측정으로 얻는 정보는 n비트뿐이라, 이 거대한 상태를 유용한 답으로 바꾸려면 간섭을 잘 설계해야 해요. 큐비트 순서 표기는 라이브러리마다 달라서 Qiskit은 오른쪽이 q0이에요.',
      'An n-qubit state is the tensor product of 2^n amplitudes; 50 qubits mean about 10^15 amplitudes, too many to store directly on a classical computer.',
      'With two qubits the joint state is the tensor (Kronecker) product of the individual states, four amplitudes for |00⟩, |01⟩, |10⟩ and |11⟩. If q0 is |+⟩ and q1 is |0⟩, the amplitude of |01⟩ is (q1 at 0, amplitude 1) × (q0 at 1, amplitude 0.707) = 0.707. Each additional qubit doubles the count, so n qubits have 2^n amplitudes: 1,024 for 10 qubits, about a billion for 30 and about 10^15 for 50. Storing each amplitude as a 16-byte complex number takes 17 GB for 30 qubits and about 18 PB for 50. That is why classical simulation of quantum states struggles and where the potential of quantum computers lies. Measurement, however, returns only n bits, so turning this enormous state into a useful answer requires carefully designed interference. Qubit ordering conventions differ between libraries; Qiskit puts q0 on the right.', sMulti()),
    item('qc-entangle', '얽힘', 'Entanglement',
      '벨 상태 (|00⟩ + |11⟩)/√2처럼 각 큐비트 상태의 곱으로 쓸 수 없는 상태가 얽힘이에요. 결과는 무작위지만 둘은 항상 같아요.',
      '벨 상태 (|00⟩ + |11⟩)/√2는 |00⟩과 |11⟩에만 0.707의 진폭이 있는 두 큐비트 상태예요. 측정하면 00과 11이 반반씩 나오고, 01이나 10은 절대 나오지 않아요. 1,000번 재면 503번과 497번처럼요. 각 큐비트만 보면 완전히 무작위지만 둘은 항상 같아서, 한쪽 결과를 보면 다른 쪽 결과를 바로 알아요. 이 상태는 두 큐비트 각각의 상태의 곱으로 쓸 수 없어요. (a|0⟩ + b|1⟩)(c|0⟩ + d|1⟩)을 펼치면 ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩인데, ad = 0이 되려면 a나 d가 0이어야 하고 그러면 ac나 bd도 0이 되기 때문이에요. 이렇게 곱으로 나눌 수 없는 상태를 얽힘이라고 해요. 상관은 큐비트가 아무리 멀리 떨어져도 유지되지만 결과가 무작위라 빛보다 빠른 통신에는 쓸 수 없어요. 얽힘은 양자 순간이동, 초고밀도 코딩, 양자 키 분배의 자원이고, 여러 기준에서 동시에 나타나는 상관은 벨 부등식을 위반해 고전적 설명을 넘어서요.',
      'States such as the Bell state (|00⟩ + |11⟩)/√2 that are not products of single-qubit states are entangled: each result is random, yet the two always agree.',
      'The Bell state (|00⟩ + |11⟩)/√2 is a two-qubit state with amplitude 0.707 on |00⟩ and |11⟩ only. Measuring it gives 00 and 11 half the time each and never 01 or 10, for example 503 and 497 times out of 1,000. Each qubit alone is completely random, yet the two always agree, so one result immediately reveals the other. The state cannot be written as a product of single-qubit states: expanding (a|0⟩ + b|1⟩)(c|0⟩ + d|1⟩) gives ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩, and making ad = 0 requires a or d to be 0, which also zeroes ac or bd. A state that cannot be factored this way is entangled. The correlation persists however far apart the qubits are, but because the outcomes are random it cannot carry a faster-than-light signal. Entanglement powers teleportation, superdense coding and quantum key distribution, and its correlations across several bases at once violate Bell inequalities, defying any classical explanation.', sEntangle())
  ]),
  sec('qc-gates', '게이트와 회로', 'Gates and circuits', '진폭을 돌리고 섞기', 'Rotating and mixing amplitudes', '파울리 X·Y·Z, 중첩과 간섭을 만드는 아다마르, 보이지 않는 위상의 역할, 얽힘을 만드는 CNOT, 회로 그림과 shots, 그리고 복제 불가 정리를 봐요.', 'The Pauli X, Y and Z gates, the Hadamard gate and interference, the role of invisible phase, CNOT and entanglement, circuit diagrams and shots, and the no-cloning theorem.', [
    item('qc-pauli', '파울리 게이트', 'Pauli gates',
      'X는 |0⟩과 |1⟩을 바꾸는 비트 반전, Z는 |1⟩의 부호를 뒤집는 위상 반전, Y는 둘 다예요. 블로흐 구에서 각 축으로 180° 회전이에요.',
      '양자 게이트는 상태 벡터에 곱하는 유니터리 행렬이에요. X = [[0, 1], [1, 0]]은 두 진폭의 자리를 바꿔 고전 NOT처럼 |0⟩ ↔ |1⟩을 뒤집어요. Z = [[1, 0], [0, −1]]은 |1⟩ 쪽 진폭의 부호만 바꿔요. |+⟩ = (|0⟩ + |1⟩)/√2에 Z를 걸면 |−⟩ = (|0⟩ − |1⟩)/√2가 되는데, 측정 확률은 그대로라 바로 보이지는 않지만 뒤따르는 게이트와의 간섭 결과가 달라져요. Y = iXZ는 비트와 위상을 함께 뒤집어서 Y|0⟩ = i|1⟩이에요. 블로흐 구에서 세 게이트는 각각 x, y, z축을 중심으로 180° 돌리는 회전이라, 두 번 걸면 제자리로 돌아와 X² = Y² = Z² = I예요. 모든 양자 게이트는 유니터리라서 되돌릴 수 있고, 양자 오류 정정은 오류를 X형(비트) 오류와 Z형(위상) 오류로 나눠 다뤄요.',
      'X is a bit flip swapping |0⟩ and |1⟩, Z a phase flip negating |1⟩, and Y both; on the Bloch sphere each is a 180° turn about its axis.',
      'Quantum gates are unitary matrices applied to the state vector. X = [[0, 1], [1, 0]] swaps the two amplitudes, flipping |0⟩ ↔ |1⟩ like a classical NOT. Z = [[1, 0], [0, −1]] negates only the |1⟩ amplitude: applied to |+⟩ = (|0⟩ + |1⟩)/√2 it gives |−⟩ = (|0⟩ − |1⟩)/√2, which has the same measurement probabilities and so looks unchanged, yet interferes differently with later gates. Y = iXZ flips the bit and the phase together, so Y|0⟩ = i|1⟩. On the Bloch sphere the three are 180° rotations about the x, y and z axes, so applying any of them twice returns to the start: X² = Y² = Z² = I. Every quantum gate is unitary and therefore reversible, and quantum error correction treats errors as X-type (bit) and Z-type (phase) errors.', sPauli()),
    item('qc-hadamard', '아다마르 게이트와 간섭', 'The Hadamard gate and interference',
      'H는 |0⟩을 |+⟩로 바꿔 중첩을 만들고, 한 번 더 걸면 진폭이 보강·상쇄되어 |0⟩으로 돌아와요. 이 간섭이 양자 알고리즘의 핵심이에요.',
      '아다마르 게이트 H = (1/√2)[[1, 1], [1, −1]]은 기저 상태를 반반 중첩으로 바꿔요. H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩이고 H|1⟩ = |−⟩예요. 측정하면 0과 1이 반반이라 동전 던지기 같지만, 여기에 H를 한 번 더 걸면 차이가 드러나요. 새 |0⟩ 진폭은 (0.707 + 0.707)/√2 = 1로 보강되고, 새 |1⟩ 진폭은 (0.707 − 0.707)/√2 = 0으로 상쇄되어 확실히 |0⟩이 돼요. 확률은 섞을수록 무작위해질 뿐이지만 진폭은 부호가 있어서 서로 지울 수 있는데, 이것이 간섭이에요. H를 두 번 걸면 원래대로(H·H = I)이고, H는 Z 기준과 X 기준을 서로 바꿔 줘요. n개 큐비트 각각에 H를 걸면 2^n개 상태의 균등 중첩이 만들어지고, 원하는 답의 진폭은 보강하고 나머지는 상쇄하도록 간섭을 설계하는 것이 양자 알고리즘의 핵심이에요.',
      'H turns |0⟩ into the superposition |+⟩, and a second H reinforces and cancels amplitudes back to |0⟩; designing this interference is the core of quantum algorithms.',
      'The Hadamard gate H = (1/√2)[[1, 1], [1, −1]] turns a basis state into an even superposition: H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩ and H|1⟩ = |−⟩. Measured, |+⟩ gives 0 or 1 half the time like a coin toss, but a second H reveals the difference. The new |0⟩ amplitude is (0.707 + 0.707)/√2 = 1, reinforced, and the new |1⟩ amplitude is (0.707 − 0.707)/√2 = 0, cancelled, so the result is certainly |0⟩. Probabilities only become more random when mixed, but amplitudes carry signs and can cancel each other: that is interference. Two Hadamards undo each other (H·H = I), and H swaps the Z and X bases. Applying H to each of n qubits creates a uniform superposition of 2^n states, and arranging interference so that the answer’s amplitude is reinforced while the rest cancel is the essence of quantum algorithms.', sHad()),
    item('qc-phase', '위상 게이트', 'Phase gates',
      '위상 게이트 Rz(φ)는 측정 확률을 바꾸지 않지만, H 사이에 두면 0이 나올 확률이 cos²(φ/2)로 바뀌어요. 보이지 않는 위상이 간섭으로 결과를 정해요.',
      '위상 게이트 Rz(φ)는 |0⟩과 |1⟩ 사이의 상대 위상만 φ만큼 바꿔요. 블로흐 구에서 z축 회전이라 높이, 곧 측정 확률은 그대로예요. 그런데 회로 H → Rz(φ) → H에 |0⟩을 넣으면 0이 나올 확률이 cos²(φ/2)가 돼요. φ = 0이면 1, φ = π/2면 0.5, φ = π면 0이에요. 혼자서는 보이지 않는 위상이 간섭을 통해 측정 결과를 결정하는 거예요. 위상 추정과 쇼어 알고리즘처럼 많은 양자 알고리즘이 정보를 위상에 담았다가 간섭으로 꺼내요. 자주 쓰는 위상 게이트는 S = Rz(π/2)와 T = Rz(π/4)로(전체 위상은 무시), 블로흐 구 적도를 따라 90°, 45° 돌려요. H, S, T와 CNOT의 조합은 어떤 양자 계산이든 원하는 정확도로 근사할 수 있는 범용 게이트 집합이에요.',
      'A phase gate Rz(φ) leaves probabilities alone, but placed between Hadamards it makes the probability of 0 equal cos²(φ/2): an invisible phase decides the result through interference.',
      'The phase gate Rz(φ) changes only the relative phase between |0⟩ and |1⟩ by φ. On the Bloch sphere it is a rotation about z, so the height, and with it the measurement probability, is unchanged. Yet feeding |0⟩ into the circuit H → Rz(φ) → H makes the probability of 0 equal cos²(φ/2): 1 for φ = 0, 0.5 for φ = π/2 and 0 for φ = π. A phase that is invisible on its own decides the measured result through interference, and many quantum algorithms, including phase estimation and Shor’s algorithm, store information in phases and extract it this way. The common phase gates are S = Rz(π/2) and T = Rz(π/4), up to a global phase, which turn 90° and 45° along the equator of the Bloch sphere. Combinations of H, S, T and CNOT form a universal gate set that approximates any quantum computation to any desired accuracy.', sPhase()),
    item('qc-cnot', 'CNOT과 얽힘', 'CNOT and entanglement',
      'CNOT은 제어 큐비트가 1일 때 대상 큐비트를 뒤집어요. 제어가 중첩일 때 걸면 얽힘이 생겨서, H 다음 CNOT이 벨 상태를 만들어요.',
      'CNOT(제어 NOT)은 두 큐비트 게이트로, 제어 큐비트 q0이 1일 때만 대상 큐비트 q1을 뒤집는 양자 XOR이에요. |q1 q0⟩ 순서로 쓰면 진리표는 01 → 11, 11 → 01이고 00과 10은 그대로예요. |00⟩에서 시작해 q0에 H를 걸면 (|00⟩ + |01⟩)/√2가 되는데, 이것은 아직 q0 = |+⟩와 q1 = |0⟩의 곱이에요. 여기에 CNOT을 걸면 q0이 1인 |01⟩만 |11⟩로 바뀌어 (|00⟩ + |11⟩)/√2, 곧 벨 상태가 돼요. 고전 XOR처럼 동작했을 뿐인데 제어가 중첩이었기 때문에 곱으로 나눌 수 없는 얽힘이 생겼어요. H와 CNOT의 조합은 얽힘을 만드는 가장 기본적인 회로이고, 단일 큐비트 게이트와 CNOT만 있으면 어떤 다중 큐비트 연산이든 만들 수 있어요. 하드웨어에서는 두 큐비트 게이트가 단일 큐비트 게이트보다 오류율이 훨씬 높아서 회로 비용의 중요한 척도가 돼요.',
      'CNOT flips the target qubit when the control is 1; applied to a control in superposition it entangles them, so H followed by CNOT makes a Bell state.',
      'CNOT (controlled-NOT) is a two-qubit gate that flips the target q1 only when the control q0 is 1, a quantum XOR. Written in |q1 q0⟩ order its truth table maps 01 → 11 and 11 → 01 and leaves 00 and 10 alone. Starting from |00⟩, H on q0 gives (|00⟩ + |01⟩)/√2, which is still the product of q0 = |+⟩ and q1 = |0⟩. CNOT then moves only |01⟩, where q0 is 1, to |11⟩, producing (|00⟩ + |11⟩)/√2, a Bell state. The gate merely acted like a classical XOR, but because the control was in superposition the result is entangled and can no longer be factored. H followed by CNOT is the basic entangling circuit, and single-qubit gates plus CNOT suffice to build any multi-qubit operation. On hardware, two-qubit gates have far higher error rates than single-qubit ones, which makes their count a key measure of circuit cost.', sCNOT()),
    item('qc-circuit', '양자 회로', 'Quantum circuits',
      '양자 프로그램은 큐비트 선 위에 게이트와 측정을 놓은 회로예요. 여러 번(shots) 실행해 얻은 비트열의 분포가 결과예요.',
      '양자 회로는 큐비트를 나타내는 가로선 위에 게이트를 차례로 놓아 그려요. 시간은 왼쪽에서 오른쪽으로 흐르고, 아래의 이중선은 측정 결과를 담는 고전 비트예요. Qiskit에서는 QuantumCircuit(2, 2)로 큐비트 2개와 고전 비트 2개를 만들고, h(0)와 cx(0, 1)로 벨 상태를 만든 뒤 measure로 결과를 고전 비트에 기록해요. 한 번 실행하면 11 같은 비트열 하나만 얻으므로, 같은 회로를 1,024번처럼 여러 번(shots) 실행해 결과를 세요. 벨 상태라면 00이 518번, 11이 506번처럼 나오고, 실제 하드웨어에서는 노이즈 때문에 01과 10도 조금 섞여요. 회로의 폭은 큐비트 수, 깊이는 게이트 층 수로, 이 회로는 폭 2, 깊이 3이에요. 깊이가 깊을수록 노이즈가 쌓이고, shots가 많을수록 확률 추정이 정확해져 오차가 1/√shots에 비례해 줄어요.',
      'A quantum program is a circuit of gates and measurements on qubit wires, and its result is the distribution of bit strings over many runs (shots).',
      'A quantum circuit is drawn as horizontal wires, one per qubit, carrying gates in sequence; time runs left to right, and a double line below holds classical bits for measurement results. In Qiskit, QuantumCircuit(2, 2) creates two qubits and two classical bits, h(0) and cx(0, 1) prepare a Bell state, and measure writes the outcomes into the classical bits. One run yields a single bit string such as 11, so the same circuit is run many times, for example 1,024 shots, and the results are counted: for a Bell state something like 518 × 00 and 506 × 11, with a few 01 and 10 results mixed in by noise on real hardware. A circuit’s width is its qubit count and its depth the number of gate layers, here 2 and 3. Deeper circuits accumulate more noise, and more shots give more precise probability estimates, with the error shrinking in proportion to 1/√shots.', sCircuit()),
    item('qc-nocloning', '복제 불가 정리', 'The no-cloning theorem',
      '모르는 양자 상태를 똑같이 복사하는 장치는 없어요. CNOT은 |0⟩, |1⟩은 복사하지만 |+⟩는 벨 상태로 만들어 버려요.',
      '고전 비트는 얼마든지 복사할 수 있지만 양자 상태는 그렇지 않아요. CNOT으로 복사를 시도해 보면, q1을 |0⟩으로 두고 q0을 제어로 걸었을 때 q0이 |0⟩이면 |00⟩, |1⟩이면 |11⟩이 되어 성공한 것처럼 보여요. 그런데 q0이 |+⟩ = (|0⟩ + |1⟩)/√2이면 결과는 (|00⟩ + |11⟩)/√2, 곧 벨 상태예요. 원했던 |+⟩|+⟩는 (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2로 네 진폭이 모두 0.5인 전혀 다른 상태죠. 게이트가 선형이라 기저 상태에 대한 결과가 그대로 중첩되기 때문이고, 이 논리를 일반화하면 어떤 회로로도 임의의 미지 상태를 복사할 수 없어요. 이것이 복제 불가 정리예요. 알고 있는 상태는 다시 준비하면 되지만 모르는 상태는 백업할 수 없어서, 양자 오류 정정은 복사 대신 얽힘으로 정보를 여러 큐비트에 퍼뜨리고, BB84 같은 양자 키 분배에서는 도청자가 몰래 복사해 둘 수 없어 흔적을 남기게 돼요.',
      'No device can copy an unknown quantum state: CNOT copies |0⟩ and |1⟩, but turns |+⟩ into a Bell state instead of two copies.',
      'Classical bits can be copied freely, but quantum states cannot. Trying to copy with CNOT, with q1 set to |0⟩ and q0 as the control, seems to work: |0⟩ becomes |00⟩ and |1⟩ becomes |11⟩. But if q0 is |+⟩ = (|0⟩ + |1⟩)/√2 the result is (|00⟩ + |11⟩)/√2, a Bell state, whereas the wanted |+⟩|+⟩ = (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2, with all four amplitudes 0.5, is an entirely different state. Because gates are linear, their results on basis states are simply superposed, and generalizing this argument shows that no circuit can copy an arbitrary unknown state: the no-cloning theorem. Known states can be prepared again, but unknown ones cannot be backed up, so quantum error correction spreads information across qubits with entanglement instead of copies, and in quantum key distribution such as BB84 an eavesdropper cannot quietly keep a copy and so leaves traces.', sNoClone())
  ]),
  sec('qc-proto', '양자 프로토콜과 첫 알고리즘', 'Protocols and first algorithms', '얽힘과 간섭을 쓰는 법', 'Putting entanglement and interference to work', '벨 쌍과 고전 2비트로 상태를 옮기는 순간이동, 큐비트 하나로 2비트를 보내는 초고밀도 코딩, 도청을 들키게 하는 BB84 키 분배, 질의 한 번으로 답을 얻는 도이치-조사와 번스타인-바지라니 알고리즘을 봐요.', 'Teleportation, which moves a state with a Bell pair and two classical bits, superdense coding, which sends two bits with one qubit, BB84 key distribution, which exposes eavesdroppers, and the one-query Deutsch–Jozsa and Bernstein–Vazirani algorithms.', [
    item('qc-teleport', '양자 순간이동', 'Quantum teleportation',
      '미리 나눈 벨 쌍과 고전 2비트로 큐비트 상태를 옮겨요. 밥은 받은 2비트에 따라 X, Z로 보정하고, 원본은 측정으로 사라져요.',
      '양자 순간이동은 큐비트를 직접 보내지 않고 그 상태 ψ를 멀리 옮기는 방법이에요. 먼저 앨리스와 밥이 H와 CNOT으로 만든 벨 쌍(q1, q2)을 하나씩 나눠 가져요. 앨리스는 보낼 큐비트 q0 = ψ와 자기 쪽 q1에 CNOT과 H를 걸어 세 큐비트를 얽은 뒤 q0과 q1을 측정해 2비트 m0, m1을 얻어요. 이 순간 밥의 q2는 ψ에 X나 Z가 걸린 네 가지 상태 중 하나가 되어 있어요. 앨리스가 2비트를 전화나 인터넷 같은 고전 채널로 보내면, 밥은 m1이 1이면 X, m0이 1이면 Z를 걸어 정확히 ψ를 얻어요. 고전 통신이 도착해야 끝나므로 빛보다 빠르지 않고, 앨리스의 원본은 측정으로 사라지므로 복제 불가 정리도 어기지 않아요. 물질이 아니라 상태가 옮겨가는 것이고, 양자 네트워크와 양자 중계기의 기본 연산이에요.',
      'A pre-shared Bell pair and two classical bits move a qubit state: Bob corrects with X and Z according to the bits, and the original is destroyed by measurement.',
      'Quantum teleportation moves a state ψ to a distant place without sending the qubit itself. First Alice and Bob each take one half of a Bell pair (q1, q2) made with H and CNOT. Alice applies CNOT and H to the qubit to be sent, q0 = ψ, and her half q1, entangling all three, then measures q0 and q1 to obtain two bits m0 and m1. At that moment Bob’s q2 is already ψ with some combination of X and Z applied, one of four possibilities. Alice sends the two bits over an ordinary classical channel, and Bob applies X if m1 is 1 and Z if m0 is 1 to hold exactly ψ. Because the protocol must wait for the classical message it is no faster than light, and because Alice’s original is destroyed by her measurement it does not violate the no-cloning theorem. The state travels, not the matter, and teleportation is the basic operation of quantum networks and quantum repeaters.', sTeleport()),
    item('qc-superdense', '초고밀도 코딩', 'Superdense coding',
      '미리 나눈 벨 쌍이 있으면 큐비트 하나를 보내 고전 2비트를 전할 수 있어요. 앨리스는 I, X, Z, ZX 중 하나를 걸고, 밥은 벨 측정으로 읽어요.',
      '초고밀도 코딩은 순간이동과 짝을 이루는 프로토콜로, 큐비트 하나를 보내 고전 2비트를 전해요. 앨리스와 밥이 벨 쌍을 나눠 가진 상태에서, 앨리스는 보낼 2비트 b0b1에 따라 자기 큐비트에만 연산을 걸어요. 00이면 아무것도(I), 01이면 X, 10이면 Z, 11이면 X 다음 Z를 걸면, 두 큐비트 상태가 서로 직교하는 네 벨 상태 Φ+, Ψ+, Φ−, Ψ− 중 하나가 돼요. 앨리스가 자기 큐비트를 밥에게 보내면, 밥은 CNOT과 H로 벨 측정을 해서 2비트를 그대로 읽어요. 얽힘 없이는 큐비트 하나로 고전 정보를 1비트까지만 보낼 수 있다는 홀레보 한계가 있으므로, 미리 나눈 얽힘이 전송 용량을 두 배로 만든 셈이에요. 중간에 그 큐비트 하나만 가로챈 도청자는 어떤 메시지든 똑같이 완전히 무작위인 상태를 보게 되어 아무 정보도 얻지 못해요.',
      'With a pre-shared Bell pair, sending one qubit delivers two classical bits: Alice applies I, X, Z or ZX, and Bob reads them with a Bell measurement.',
      'Superdense coding, the mirror image of teleportation, delivers two classical bits by sending one qubit. With a Bell pair already shared, Alice acts on her qubit alone according to the two bits b0b1: nothing (I) for 00, X for 01, Z for 10, and X then Z for 11, which turns the pair into one of four mutually orthogonal Bell states Φ+, Ψ+, Φ− and Ψ−. She sends her qubit to Bob, who performs a Bell measurement with CNOT and H and reads both bits. The Holevo bound says a qubit can carry at most one classical bit without entanglement, so the pre-shared entanglement doubles the capacity. An eavesdropper who intercepts the transmitted qubit sees the same completely random state whatever the message and learns nothing.', sDense()),
    item('qc-bb84', '양자 키 분배(BB84)', 'Quantum key distribution (BB84)',
      '앨리스와 밥이 무작위 기준으로 광자를 보내고 재서, 기준이 같은 자리만 키로 남겨요. 도청하면 25% 오류가 생겨 들켜요.',
      'BB84는 양자 상태로 비밀 키를 나누는 프로토콜이에요. 앨리스는 무작위 비트를 무작위로 고른 기준(+ 또는 ×)으로 광자에 실어 보내요. 밥도 광자마다 기준을 무작위로 골라 측정하는데, 기준이 같으면 앨리스의 비트를 그대로 얻고 다르면 결과가 무작위예요. 이후 둘은 비트는 숨긴 채 어떤 기준을 썼는지만 공개해 같은 자리만 남겨요. 평균 절반이 남고, 예에서는 8개 중 5개가 남아 키 00101이 돼요. 도청자가 광자를 가로채 재고 다시 보내면 절반은 기준을 틀리고, 그때 밥의 결과가 절반 확률로 틀려서 남긴 키에 0.5 × 0.5 = 25%의 오류가 생겨요. 그래서 키 일부를 공개해 비교하고 오류율이 높으면 키를 버려요. 복제 불가 정리 때문에 도청자는 흔적 없이 엿볼 수 없고, 안전성이 계산 난이도가 아니라 물리 법칙에서 나와요. 실제 시스템은 전송 거리 제한과 장비의 결함을 노린 공격이 과제예요.',
      'Alice and Bob send and measure photons in random bases and keep only positions where the bases match; an eavesdropper introduces 25% errors and is caught.',
      'BB84 shares a secret key using quantum states. Alice encodes random bits in photons, each in a randomly chosen basis, + or ×. Bob measures each photon in a randomly chosen basis of his own, obtaining Alice’s bit when the bases match and a random result when they do not. Afterward they publish which bases they used, never the bits, and keep only the matching positions, about half on average: in the example 5 of 8 remain, giving the key 00101. An eavesdropper who intercepts, measures and resends each photon picks the wrong basis half the time, and then Bob’s result is wrong half the time, so 0.5 × 0.5 = 25% of the kept key is corrupted. Publicly comparing a sample of the key therefore exposes the intrusion, and a high error rate means discarding the key. The no-cloning theorem prevents eavesdropping without a trace, so the security rests on physics rather than computational hardness. Practical systems still face limited transmission distance and attacks on imperfect equipment.', sBB84()),
    item('qc-deutsch', '도이치-조사 알고리즘', 'The Deutsch–Jozsa algorithm',
      '함수가 상수인지 균형인지를 오라클 한 번으로 판별해요. 위상 오라클과 H의 간섭으로 |00…0⟩의 진폭이 1 또는 0이 돼요.',
      '도이치-조사 알고리즘은 함수 f가 모든 입력에 같은 값을 주는 상수 함수인지, 입력의 절반에 0을 주고 절반에 1을 주는 균형 함수인지를 가려요. 먼저 n개 큐비트에 H를 걸어 모든 입력의 균등 중첩을 만들고, 오라클이 f(x)를 위상 (−1)^f(x)로 새기게 해요(위상 킥백). 상수 함수면 모든 부호가 같고, f = x0 ⊕ x1 같은 균형 함수면 절반이 음수가 돼요. 다시 H를 걸면 |00…0⟩의 진폭은 부호들의 평균이 되어, 상수면 정확히 1이고 균형이면 정확히 0이에요. 그래서 측정 결과가 모두 0이면 상수, 아니면 균형이에요. 고전적으로 확실히 판별하려면 최악의 경우 2^(n−1) + 1번 물어야 해서 n = 10이면 513번이지만, 양자로는 1번이에요. 다만 무작위 고전 알고리즘도 몇 번 물어보면 높은 확률로 맞히므로 실용적 이점보다는 간섭의 원리를 보여주는 예이고, H → 오라클 → H 패턴은 많은 양자 알고리즘의 뼈대가 돼요.',
      'One oracle call decides whether a function is constant or balanced: a phase oracle and Hadamard interference make the amplitude of |00…0⟩ exactly 1 or 0.',
      'The Deutsch–Jozsa algorithm decides whether a function f is constant, giving the same value for every input, or balanced, giving 0 for half the inputs and 1 for the other half. It applies H to n qubits to create an even superposition of all inputs and lets the oracle write f(x) into the phase (−1)^f(x), a trick called phase kickback. A constant function leaves all the signs equal, while a balanced function such as f = x0 ⊕ x1 makes half of them negative. After another round of H the amplitude of |00…0⟩ is the average of the signs, exactly 1 for constant and exactly 0 for balanced, so an all-zero measurement means constant and anything else balanced. A deterministic classical algorithm may need 2^(n−1) + 1 queries, 513 for n = 10, versus a single quantum query. A randomized classical algorithm is right with high probability after a few queries, so the example illustrates the principle of interference more than a practical speedup, and its H → oracle → H pattern underlies many quantum algorithms.', sDJ()),
    item('qc-bv', '번스타인-바지라니 알고리즘', 'The Bernstein–Vazirani algorithm',
      '숨은 비트열 s를 f(x) = s·x mod 2 질의 한 번으로 찾아요. 오라클이 만든 부호 패턴 (−1)^(s·x)를 H가 정확히 |s⟩로 모아요.',
      '숨은 n비트 문자열 s가 있고, 입력 x에 대해 f(x) = s·x mod 2(비트별 곱의 합의 홀짝)만 물어볼 수 있다고 해요. 고전적으로는 100, 010, 001처럼 한 비트씩 켠 입력을 차례로 물어 s의 비트를 하나씩, 모두 n번 알아내야 해요. 양자로는 n개 큐비트에 H를 걸어 균등 중첩을 만들고 오라클을 한 번 걸면, 각 입력의 진폭 부호가 (−1)^(s·x)가 되어 s = 101의 패턴이 부호 전체에 새겨져요. 다시 H를 걸면 이 부호 패턴이 정확히 |101⟩ 하나로 모여서, 측정하면 항상 s가 나와요. n = 1,000이라면 고전 1,000번과 양자 1번의 차이예요. 다만 이 이점은 오라클 질의 횟수를 세는 모형에서의 이야기라, 실제 문제에 쓰려면 오라클을 효율적으로 구현할 수 있어야 해요. 패턴 전체를 한 번에 읽어내는 이 아이디어는 사이먼 알고리즘과 주기를 찾는 쇼어 알고리즘으로 이어져요.',
      'A hidden string s is found with a single query of f(x) = s·x mod 2: Hadamards focus the oracle’s sign pattern (−1)^(s·x) exactly onto |s⟩.',
      'Suppose a hidden n-bit string s can only be probed through f(x) = s·x mod 2, the parity of the bitwise product. Classically one queries 100, 010, 001 and so on, learning one bit of s per query, n queries in all. Quantumly, H on n qubits creates a uniform superposition and a single oracle call gives each input’s amplitude the sign (−1)^(s·x), imprinting the pattern of s = 101 across all the signs. Another round of H focuses this sign pattern onto exactly |101⟩, so measurement always returns s. For n = 1,000 that is 1,000 classical queries against 1 quantum query. The advantage is counted in the oracle model, though, so real applications depend on implementing the oracle efficiently. This idea of reading a whole pattern at once leads to Simon’s algorithm and to Shor’s period finding.', sBV())
  ]),
  sec('qc-algo', '양자 알고리즘', 'Quantum algorithms', '어디서 빨라지는가', 'Where the speedups come from', '진폭 증폭으로 검색하는 그로버, 주기를 봉우리로 바꾸는 양자 푸리에 변환, 고유값의 위상을 읽는 위상 추정, 인수분해를 주기 찾기로 푸는 쇼어, 고전 최적화와 함께 도는 VQE, 그리고 양자 컴퓨터가 잘하는 문제와 못하는 문제를 봐요.', 'Grover search by amplitude amplification, the quantum Fourier transform, phase estimation, Shor’s factoring by period finding, the hybrid VQE, and which problems quantum computers do and do not speed up.', [
    item('qc-grover', '그로버 검색', 'Grover search',
      '오라클로 정답의 부호를 뒤집고 평균에 대해 반전하길 약 √N번 반복해 정답의 진폭을 키워요. 구조 없는 검색에서 제곱근 속도 향상이에요.',
      '그로버 알고리즘은 N개 후보 중 조건을 만족하는 하나를 찾아요. N = 8에서 정답이 101이라면, 먼저 H로 모든 후보에 같은 진폭 1/√8 = 0.354를 줘요. 오라클은 정답의 부호만 뒤집는데, 확률은 그대로라 이때 측정해도 소용없어요. 이어지는 확산 연산은 모든 진폭을 평균에 대해 뒤집어요(새 진폭 = 2 × 평균 − 진폭). 평균이 0.265이므로 음수였던 정답은 0.884로 커지고 나머지는 0.177로 작아져 정답 확률이 0.781이 돼요. 한 번 더 반복하면 정답 진폭 0.972, 확률 0.945예요. 반복할 때마다 진폭이 일정한 각도씩 정답 쪽으로 회전하는 셈이라 최적 횟수는 약 (π/4)√N번이고, 더 돌리면 지나쳐서 3번째에는 0.330으로 떨어져요. 백만 개라면 약 785번으로, 고전적으로 평균 50만 번 확인해야 하는 것보다 훨씬 적어요. 구조 없는 검색에서는 이 제곱근 향상이 최선이라고 증명돼 있고, 대칭키 암호의 키 탐색도 √N이 되므로 키 길이를 두 배로 늘려 대비해요.',
      'Repeating an oracle sign flip and an inversion about the mean about √N times amplifies the answer’s amplitude: a quadratic speedup for unstructured search.',
      'Grover’s algorithm finds the one item among N candidates that satisfies a condition. With N = 8 and the answer 101, Hadamards first give every candidate the same amplitude 1/√8 = 0.354. The oracle flips only the answer’s sign, which leaves probabilities unchanged, so measuring at this point would not help. The diffusion step then inverts every amplitude about the mean (new amplitude = 2 × mean − amplitude). With a mean of 0.265, the negative answer grows to 0.884 while the others shrink to 0.177, a success probability of 0.781, and one more round gives an amplitude of 0.972 and a probability of 0.945. Each round rotates the state by a fixed angle toward the answer, so about (π/4)√N rounds are optimal and more overshoot, falling to 0.330 on the third round here. A million items need about 785 rounds, far fewer than the 500,000 checks a classical search needs on average. This quadratic speedup is provably optimal for unstructured search, and since brute-force key search also drops to √N, symmetric ciphers respond by doubling their key lengths.', sGrover()),
    item('qc-qft', '양자 푸리에 변환', 'The quantum Fourier transform',
      'QFT는 진폭에 이산 푸리에 변환을 해서 주기를 봉우리 위치로 바꿔요. n큐비트를 약 n²/2개 게이트로 변환하지만 출력은 하나만 측정할 수 있어요.',
      '양자 푸리에 변환(QFT)은 2^n개 진폭에 이산 푸리에 변환을 적용해요. numpy로 쓰면 역 FFT에 √N을 곱한 것과 같아요. 3큐비트(N = 8)에서 1과 5에만 진폭 0.707이 있는, 곧 주기 r = 4인 상태를 넣으면, 출력은 N/r = 2의 배수인 0, 2, 4, 6에만 확률 0.25씩 나와요. 주기가 봉우리 간격으로 바뀌는 거예요. 그래서 측정한 값에서 주기를 거꾸로 알아낼 수 있고, 이것이 위상 추정과 쇼어 알고리즘의 핵심이에요. 회로는 큐비트마다 H 하나와 제어 위상 회전들로 이루어져 n(n+1)/2개 게이트면 되므로 n = 30이면 465개예요. 같은 크기의 고전 FFT는 n·2^n번, 약 3.2 × 10¹⁰번의 연산이 필요하죠. 하지만 측정으로는 봉우리 하나만 읽을 수 있어서 모든 푸리에 계수를 얻는 것은 아니고, 고전 FFT를 대체하지는 못해요. QFT의 힘은 주기 같은 전체 구조를 한 번의 측정으로 드러내는 데 있어요.',
      'The QFT applies a discrete Fourier transform to the amplitudes, turning a period into peak positions; it needs only about n²/2 gates, but just one output can be measured.',
      'The quantum Fourier transform applies a discrete Fourier transform to 2^n amplitudes, equivalent in numpy to the inverse FFT times √N. Feeding three qubits (N = 8) a state with amplitude 0.707 only on 1 and 5, a period of r = 4, produces probability 0.25 at each multiple of N/r = 2, namely 0, 2, 4 and 6: the period becomes the spacing between peaks. The period can therefore be read back from measured values, which is the heart of phase estimation and Shor’s algorithm. The circuit uses one H per qubit plus controlled phase rotations, n(n+1)/2 gates in all, so 465 for n = 30, whereas a classical FFT of that size takes n·2^n, about 3.2 × 10¹⁰ operations. A measurement, however, reads only one peak, not every Fourier coefficient, so the QFT does not replace the FFT; its power lies in exposing global structure such as a period in a single measurement.', sQFT()),
    item('qc-phaseest', '위상 추정', 'Phase estimation',
      '고유 상태에 제어 U^(2^k)를 걸어 위상을 계수 큐비트로 되돌린 뒤, 역 QFT로 고유값의 위상 φ를 이진수로 읽어요.',
      '유니터리 U의 고유 상태 |u⟩는 U를 걸어도 위상만 e^(2πiφ) 생기고 그대로예요. 위상 추정은 이 φ를 알아내요. 계수 큐비트 t개에 H를 걸고, k번째 큐비트가 U를 2^k번 제어하게 하면, 고유 상태의 위상이 제어 큐비트로 되돌아가(위상 킥백) k번째 큐비트에 2^k·φ의 위상이 새겨져요. 이 위상 패턴에 역 QFT를 걸면 φ의 이진 표현이 측정값으로 나와요. U가 T 게이트이고 |u⟩ = |1⟩이면 φ = 1/8 = 0.001₂라서 3비트로 항상 001이 나와요. φ = 1/3처럼 t비트로 딱 떨어지지 않으면 가장 가까운 값 011(0.375)이 0.69의 확률로 나오고 이웃 값이 나머지를 나눠 가져요. t비트를 쓰면 약 2^−t의 정밀도를 얻어요. U^(2^k)를 효율적으로 만들 수 있을 때 쓸모가 있으며, 쇼어 알고리즘의 주기 찾기와 분자 에너지를 구하는 양자 화학 계산의 핵심 부품이에요.',
      'Controlled U^(2^k) on an eigenstate kicks phases back into counting qubits, and an inverse QFT reads the eigenphase φ in binary.',
      'An eigenstate |u⟩ of a unitary U is unchanged by U except for a phase e^(2πiφ), and phase estimation finds φ. Hadamards go on t counting qubits, and qubit k controls U applied 2^k times; the eigenstate’s phase kicks back into the controls, leaving qubit k with phase 2^k·φ. An inverse QFT on this phase pattern yields the binary representation of φ as the measured value. With U the T gate and |u⟩ = |1⟩, φ = 1/8 = 0.001₂, so three bits always read 001. When φ does not fit in t bits, as with 1/3, the closest value 011 (0.375) appears with probability 0.69 and neighboring values share the rest; t bits give a precision of about 2^−t. The method pays off when U^(2^k) can be implemented efficiently, and it is the core of the period finding in Shor’s algorithm and of quantum chemistry methods that compute molecular energies.', sQPE()),
    item('qc-shor', '쇼어 알고리즘', 'Shor’s algorithm',
      '인수분해를 a^x mod N의 주기 찾기로 바꾸고, 주기는 양자 위상 추정으로, 인수는 gcd로 구해요. RSA를 다항 시간에 깰 수 있어요.',
      '쇼어 알고리즘은 큰 수 N의 인수분해를 주기 찾기 문제로 바꿔요. N = 15에서 a = 7을 고르면 7^x mod 15는 1, 7, 4, 13, 1, 7, 4, 13…으로 주기 r = 4예요. 이 주기를 찾는 부분만 양자 컴퓨터가 해요. 모듈러 거듭제곱을 중첩 상태에 계산한 뒤 위상 추정(QFT)을 하면 측정값 k가 k/2^t ≈ s/r을 만족해서, 3비트라면 k = 2에서 2/8 = 1/4, 곧 r = 4를 얻어요. 0처럼 정보가 없는 값이 나오면 다시 하면 돼요. r이 짝수이면 a^(r/2) − 1과 a^(r/2) + 1이 N과 공통 인수를 가질 가능성이 커서, gcd(48, 15) = 3과 gcd(50, 15) = 5로 15 = 3 × 5를 얻어요. 이 과정이 다항 시간에 끝나므로 큰 수의 인수분해가 어렵다는 데 기대는 RSA와, 같은 원리로 이산 로그에 기대는 타원 곡선 암호가 위협받아요. 다만 RSA-2048을 깨려면 2019년 추정으로 노이즈 큐비트 2천만 개로 8시간, 2025년 추정으로도 100만 개 가까이 필요해서 지금 기계와는 거리가 멀어요. 그래도 미리 저장한 암호문을 나중에 풀 수 있으므로 양자 내성 암호로의 전환이 진행 중이에요.',
      'Factoring becomes finding the period of a^x mod N: quantum phase estimation finds the period and gcd extracts the factors, breaking RSA in polynomial time.',
      'Shor’s algorithm turns factoring a large number N into period finding. With N = 15 and a = 7, 7^x mod 15 runs 1, 7, 4, 13, 1, 7, 4, 13…, a period of r = 4, and only finding this period needs a quantum computer. Modular exponentiation is computed on a superposition, then phase estimation with a QFT gives a measured value k with k/2^t ≈ s/r: with three bits, k = 2 gives 2/8 = 1/4 and so r = 4, while uninformative values such as 0 just mean running again. For even r, a^(r/2) − 1 and a^(r/2) + 1 are likely to share factors with N, and indeed gcd(48, 15) = 3 and gcd(50, 15) = 5 give 15 = 3 × 5. Because the whole procedure runs in polynomial time, it threatens RSA, which relies on factoring being hard, and elliptic-curve cryptography, which relies on discrete logarithms. Breaking RSA-2048 was estimated in 2019 to need 20 million noisy qubits for 8 hours and in 2025 still close to a million, far beyond today’s machines, but because ciphertext stored today could be decrypted later, migration to post-quantum cryptography is already under way.', sShor()),
    item('qc-vqe', '변분 양자 고유값 풀이(VQE)', 'The variational quantum eigensolver (VQE)',
      '매개변수 회로로 상태를 만들어 에너지를 측정하고, 고전 최적화기가 매개변수를 바꿔 최소 에너지를 찾아요. 변분 원리 덕분에 최소값이 바닥 에너지에 다가가요.',
      'VQE는 해밀토니언 H의 가장 낮은 고유값, 곧 바닥 에너지를 찾는 양자-고전 혼합 알고리즘이에요. 예로 H = 0.5Z + 0.8X를 생각해요. 매개변수 회로 Ry(θ)|0⟩로 상태를 만들면 ⟨Z⟩ = cos θ, ⟨X⟩ = sin θ라서, 양자 컴퓨터에서 측정한 값으로 에너지 E(θ) = 0.5 cos θ + 0.8 sin θ를 추정할 수 있어요. 고전 최적화기는 이 값을 보고 θ를 바꿔요. 2.5에서 시작해 3.3, 3.9를 거쳐 4.15에 이르면 에너지가 −0.943까지 내려가는데, 이것은 정확한 바닥 에너지 −√(0.5² + 0.8²)와 같아요. 변분 원리에 따라 어떤 상태의 에너지도 바닥 에너지보다 낮을 수 없으므로, 최소화할수록 답에 다가가요. 회로가 짧아 노이즈가 있는 지금의 기계에서도 시도할 수 있어 분자 시뮬레이션에 쓰이지만, 에너지를 정확히 추정하는 데 측정이 많이 들고, 회로 모양(ansatz) 선택과 기울기가 사라지는 평평한 지형(barren plateau)이 어려운 점이에요.',
      'A parameterized circuit prepares a state whose energy is measured, and a classical optimizer tunes the parameters toward the minimum; by the variational principle that minimum approaches the ground energy.',
      'VQE is a hybrid quantum–classical algorithm for the lowest eigenvalue of a Hamiltonian H, its ground energy. Take H = 0.5Z + 0.8X. A parameterized circuit Ry(θ)|0⟩ gives ⟨Z⟩ = cos θ and ⟨X⟩ = sin θ, so measurements on the quantum computer estimate the energy E(θ) = 0.5 cos θ + 0.8 sin θ. A classical optimizer reads these values and adjusts θ: starting at 2.5 and passing 3.3 and 3.9, it reaches 4.15, where the energy is −0.943, exactly the ground energy −√(0.5² + 0.8²). The variational principle guarantees that no state’s energy is below the ground energy, so minimizing approaches the answer. Its short circuits make VQE feasible on today’s noisy machines and it is used for molecular simulation, but estimating energies precisely takes many measurements, and choosing the circuit shape (the ansatz) and avoiding flat landscapes with vanishing gradients (barren plateaus) are the hard parts.', sVQE()),
    item('qc-complexity', '양자 복잡도', 'Quantum complexity',
      '양자 컴퓨터는 인수분해·시뮬레이션처럼 구조가 있는 문제에서 지수적으로, 구조 없는 검색에서는 제곱근만큼 빨라요. NP-완전 문제를 효율적으로 푼다는 증거는 없어요.',
      'BQP는 양자 컴퓨터가 높은 확률로 효율적으로(다항 시간에) 푸는 문제들의 집합이에요. 고전적으로 쉬운 P를 포함하고, NP와는 일부만 겹친다고 여겨져요. 지수적 속도 향상이 알려진 대표 문제는 인수분해와 이산 로그(쇼어), 그리고 분자와 물질 같은 양자계 자체의 시뮬레이션이에요. 인수분해는 NP에 속하지만 P에 속하는지는 알려지지 않았어요. 구조 없는 검색은 그로버 알고리즘으로 N에서 √N이 되는 제곱근 향상뿐이라, 2^128가지를 2^64로 줄일 뿐 여전히 지수예요. SAT나 외판원 문제 같은 NP-완전 문제를 양자 컴퓨터가 효율적으로 푼다는 증거는 없고, 대부분의 연구자는 BQP 밖에 있다고 봐요. 또 큰 데이터를 양자 상태로 올리고 결과를 읽어내는 비용이 이점을 지우기도 하고, 제곱근 향상은 오류 정정 비용 때문에 실제 이득이 작아질 수 있어요. 그래서 양자 컴퓨터는 모든 계산을 빠르게 하는 기계라기보다 특정 구조의 문제에 강한 가속기에 가까워요.',
      'Quantum computers give exponential speedups on structured problems such as factoring and simulation and only quadratic ones on unstructured search; there is no evidence they solve NP-complete problems efficiently.',
      'BQP is the class of problems a quantum computer solves efficiently, in polynomial time, with high probability. It contains the classically easy class P and is believed to overlap NP only partly. The best-known exponential speedups are for factoring and discrete logarithms (Shor) and for simulating quantum systems such as molecules and materials. Factoring belongs to NP but is not known to be in P. Unstructured search gains only Grover’s quadratic speedup from N to √N, shrinking 2^128 possibilities to 2^64, which is still exponential. There is no evidence that quantum computers solve NP-complete problems such as SAT or the traveling salesman efficiently, and most researchers believe they lie outside BQP. Loading large data into quantum states and reading results out can also erase an advantage, and quadratic speedups may shrink to little once error-correction overheads are counted. Quantum computers are therefore better seen as accelerators for problems with particular structure than as machines that speed up everything.', sComplex())
  ]),
  sec('qc-noise', '노이즈와 오류 정정', 'Noise and error correction', '큐비트는 금방 망가져요', 'Qubits are fragile', '시간이 지나며 정보를 잃는 결어긋남(T1, T2), 게이트마다 곱으로 쌓이는 오류, 3큐비트 반복 코드로 보는 오류 정정의 원리, 문턱값 아래에서 오류를 지수적으로 줄이는 표면 코드, 그리고 하드웨어 방식별 장단점을 봐요.', 'Decoherence over time (T1 and T2), errors that compound gate by gate, the principle of error correction through the three-qubit repetition code, the surface code that suppresses errors exponentially below threshold, and the trade-offs between hardware platforms.', [
    item('qc-noise', '결어긋남', 'Decoherence',
      '큐비트는 환경과 상호작용하며 T1(에너지 이완)과 T2(위상 소실)의 시간 척도로 정보를 잃어요. 결맞음 시간 안에 할 수 있는 연산 수가 제한돼요.',
      '큐비트는 주변 환경과 조금씩 상호작용하면서 정보를 잃어요. T1은 |1⟩이 에너지를 잃고 |0⟩으로 떨어지는 시간 척도로, |1⟩이 남아 있을 확률이 e^(−t/T1)로 줄어요. T2는 중첩의 상대 위상이 무작위로 흐트러지는 시간 척도로, 간섭 무늬(램지 진동)의 크기가 e^(−t/T2)로 약해지며 항상 T2 ≤ 2T1이에요. 예를 들어 T1 = 100 µs, T2 = 80 µs라면 10 µs 뒤 |1⟩이 남을 확률은 e^(−0.1) = 0.905, 결맞음은 e^(−0.125) = 0.882예요. 2큐비트 게이트 하나에 50 ns가 걸린다면 T2 안에 약 1,600번의 연산만 할 수 있어서, 수십억 번의 연산이 필요한 쇼어 알고리즘 같은 계산은 오류 정정 없이는 불가능해요. 원인은 열, 전자기 잡음, 재료의 결함, 이웃 큐비트와의 간섭 등이고, 초전도 큐비트는 그래서 희석 냉동기로 약 10 mK까지 식히고 차폐해요. 큐비트 종류마다 결맞음 시간과 게이트 속도가 크게 달라요.',
      'Qubits lose information through their environment on the time scales T1 (energy relaxation) and T2 (dephasing), which limits how many operations fit within the coherence time.',
      'Qubits gradually lose information through tiny interactions with their surroundings. T1 is the time scale on which |1⟩ loses energy and falls to |0⟩, the probability of remaining in |1⟩ decaying as e^(−t/T1). T2 is the time scale on which the relative phase of a superposition scatters randomly, so interference fringes (Ramsey oscillations) shrink as e^(−t/T2), and always T2 ≤ 2T1. With T1 = 100 µs and T2 = 80 µs, after 10 µs the probability of still being |1⟩ is e^(−0.1) = 0.905 and the coherence e^(−0.125) = 0.882. If a two-qubit gate takes 50 ns, only about 1,600 operations fit within T2, so computations needing billions of operations, such as Shor’s algorithm, are impossible without error correction. The causes include heat, electromagnetic noise, material defects and crosstalk between neighbors, which is why superconducting qubits are cooled to about 10 mK in dilution refrigerators and carefully shielded. Coherence times and gate speeds differ widely between qubit types.', sNoise()),
    item('qc-fidelity', '게이트 충실도', 'Gate fidelity',
      '게이트마다 조금씩 생기는 오류는 곱으로 쌓여, 회로의 성공 확률이 대략 F^(게이트 수)가 돼요. 99.9% 게이트도 1,000개면 0.368이에요.',
      '게이트 충실도 F는 게이트가 의도대로 동작하는 정도예요. 오류가 독립적이라면 g개 게이트로 된 회로가 오류 없이 끝날 확률은 대략 F^g예요. 충실도 99.9%의 게이트도 100개면 0.999^100 = 0.905, 1,000개면 0.368로 떨어져요. 99%라면 100개에서 이미 0.366이라 실행의 3분의 2가 실패하죠. 대부분의 하드웨어에서 2큐비트 게이트의 충실도가 가장 낮아서(대략 99~99.9%) 회로 비용과 성능을 좌우해요. 오류율을 10배 줄여 99.99%가 되면 10,000개에서 0.368이 되므로 쓸 수 있는 회로 깊이가 10배 늘지만, 수십억 번의 게이트가 필요한 알고리즘에는 여전히 턱없이 부족해요. 그래서 큰 계산에는 오류 정정이 필요하고, 그 전까지는 결과를 통계적으로 보정하는 오류 완화 기법을 쓰는데, 이는 실행 횟수가 크게 늘어나는 대가가 있어요.',
      'Small per-gate errors compound, so a circuit succeeds with probability of roughly F^(gate count): even 99.9% gates give only 0.368 after 1,000 gates.',
      'Gate fidelity F measures how closely a gate does what it should. If errors are independent, a circuit of g gates finishes error-free with probability of roughly F^g. Even 99.9% gates give 0.999^100 = 0.905 after 100 gates and 0.368 after 1,000, and at 99% the figure is already 0.366 after 100 gates, so two-thirds of runs fail. On most hardware two-qubit gates have the lowest fidelity, roughly 99–99.9%, and they dominate circuit cost and performance. A tenfold improvement to 99.99% gives 0.368 after 10,000 gates, ten times the usable depth, yet algorithms needing billions of gates remain far out of reach. Large computations therefore require error correction, and until then error-mitigation techniques correct results statistically, at the price of many more runs.', sFid()),
    item('qc-errorcorr', '양자 오류 정정의 원리', 'The principle of quantum error correction',
      '상태를 복사하는 대신 여러 큐비트에 얽어 퍼뜨리고, 패리티(신드롬)만 측정해 상태를 건드리지 않고 오류 위치를 찾아 고쳐요.',
      '고전 통신에서는 비트를 세 번 반복해 보내고 다수결로 고치지만, 양자 상태는 복사할 수 없고 측정하면 무너져요. 3큐비트 반복 코드는 CNOT 두 개로 α|0⟩ + β|1⟩을 α|000⟩ + β|111⟩로 얽어 정보를 퍼뜨려요. 가운데 큐비트가 뒤집히면 α|010⟩ + β|101⟩이 되는데, 이웃끼리의 패리티 q0⊕q1과 q1⊕q2만 보조 큐비트로 측정하면 (1, 1)이 나와요. 이 신드롬은 어느 큐비트가 뒤집혔는지만 알려줄 뿐 α와 β에 대해서는 아무것도 드러내지 않아서, 중첩을 깨지 않고 가운데 큐비트에 X를 걸어 고칠 수 있어요. 큐비트마다 뒤집힐 확률이 p면 둘 이상 틀려야 실패하므로 논리 오류는 3p² − 2p³이고, p = 1%면 약 0.03%로 줄어요. p < 0.5일 때만 이득이라는 점이 문턱값의 원형이에요. 이 코드는 위상(Z) 오류를 고치지 못해서, 실제로는 쇼어의 9큐비트 코드나 표면 코드처럼 비트와 위상 오류를 모두 다루는 코드를 써요.',
      'Instead of copying, the state is spread across qubits by entanglement, and measuring only parities (syndromes) locates and fixes errors without disturbing the state.',
      'Classical communication repeats a bit three times and fixes errors by majority vote, but quantum states cannot be copied and collapse when measured. The three-qubit repetition code uses two CNOTs to spread α|0⟩ + β|1⟩ into the entangled α|000⟩ + β|111⟩. If the middle qubit flips, the state becomes α|010⟩ + β|101⟩, and measuring only the neighbor parities q0⊕q1 and q1⊕q2 with helper qubits returns (1, 1). This syndrome reveals which qubit flipped and nothing about α and β, so applying X to the middle qubit fixes the error without breaking the superposition. With flip probability p per qubit, failure needs two or more flips, giving a logical error of 3p² − 2p³, about 0.03% for p = 1%; the code helps only when p < 0.5, the prototype of a threshold. It cannot correct phase (Z) errors, so practical schemes such as Shor’s nine-qubit code or the surface code handle both bit and phase errors.', sECC()),
    item('qc-surface', '표면 코드', 'The surface code',
      '2차원 격자의 데이터 큐비트 사이에서 이웃 패리티를 반복 측정하는 코드예요. 물리 오류가 문턱값(약 1%)보다 낮으면 거리 d를 키울수록 논리 오류가 지수적으로 줄어요.',
      '표면 코드는 가장 유력한 양자 오류 정정 방식이에요. 2차원 격자에 데이터 큐비트를 두고, 그 사이의 측정 큐비트가 이웃 데이터 큐비트들의 X 패리티 또는 Z 패리티를 반복해서 재요. 이웃끼리만 상호작용하면 되어 초전도 칩의 배치와 잘 맞아요. 코드 거리 d = 3이면 데이터 9개와 측정 8개, 모두 2d² − 1 = 17개 큐비트가 논리 큐비트 하나를 이루고, d = 7이면 97개예요. 논리 오류율은 대략 0.1 × (p/p_th)^((d+1)/2)인데, 물리 오류율 p가 문턱값 p_th(약 1%)의 10분의 1이면 d를 2씩 늘릴 때마다 논리 오류가 10배씩 줄어 d = 3, 5, 7에서 10⁻³, 10⁻⁴, 10⁻⁵이 돼요. 반대로 문턱값보다 나쁘면 큐비트를 늘릴수록 더 나빠져요. Google의 Willow 칩(2024)은 d를 3, 5, 7로 키울 때마다 논리 오류가 약 2.1배씩 줄어드는 것을 보여, 문턱값 아래의 동작을 처음으로 분명히 증명했어요. 그래도 실용적인 오류율에는 논리 큐비트 하나에 물리 큐비트 수백~1,000개가 필요하고, 신드롬을 해석하는 디코딩도 실시간으로 빨라야 해요.',
      'Neighbor parities are measured repeatedly between data qubits on a 2D lattice; below a threshold of about 1% physical error, increasing the distance d suppresses logical errors exponentially.',
      'The surface code is the leading approach to quantum error correction. Data qubits sit on a 2D lattice, and measure qubits between them repeatedly check the X or Z parity of their neighboring data qubits; only nearest-neighbor interactions are needed, which suits superconducting chip layouts. At code distance d = 3, 9 data and 8 measure qubits, 2d² − 1 = 17 in all, form one logical qubit, and d = 7 needs 97. The logical error rate is roughly 0.1 × (p/p_th)^((d+1)/2): with a physical error rate p a tenth of the threshold p_th of about 1%, each increase of d by 2 cuts the logical error tenfold, giving 10⁻³, 10⁻⁴ and 10⁻⁵ at d = 3, 5 and 7, whereas above threshold more qubits only make things worse. Google’s Willow chip (2024) showed the logical error falling about 2.1× with each step from d = 3 to 5 to 7, the first clear demonstration below threshold. Practical error rates still require hundreds to a thousand physical qubits per logical qubit, and decoding the syndromes must keep up in real time.', sSurface()),
    item('qc-hardware', '양자 하드웨어', 'Quantum hardware',
      '초전도는 빠르지만 결맞음이 짧고, 이온 트랩은 충실도와 연결성이 좋지만 느려요. 중성 원자와 광자도 경쟁 중이며 아직 승자는 없어요.',
      '큐비트를 만드는 물리적 방식은 여럿이고 장단점이 뚜렷해요. 초전도 큐비트(IBM, Google)는 조지프슨 접합으로 만든 회로를 희석 냉동기에서 약 10 mK까지 식혀 써요. 게이트가 수십 ns로 빠르고 반도체 공정으로 만들 수 있지만, 결맞음이 100 µs 안팎이고 이웃 큐비트끼리만 연결돼요. 이온 트랩(Quantinuum, IonQ)은 진공 속에 전기장으로 띄운 이온을 레이저로 조작해요. 결맞음이 초 단위 이상으로 길고 2큐비트 충실도가 높으며 모든 이온끼리 게이트를 걸 수 있지만, 게이트가 마이크로초 단위로 느리고 큐비트 수를 늘리기 어려워요. 중성 원자(QuEra, Pasqal)는 광학 핀셋으로 수백~천 개의 원자를 배열하고 계산 중에 옮길 수도 있어요. 광자 방식(PsiQuantum, Xanadu)은 상온에 가까운 부품과 통신 친화성이 장점이지만 광자 손실이 과제예요. 아직 정답은 없고, 큐비트 수만이 아니라 2큐비트 충실도, 연결성, 속도, 오류 정정을 했을 때의 총비용을 함께 비교해야 해요. 표의 수치는 대략적인 범위이고, 대부분의 기기를 클라우드로 써 볼 수 있어요.',
      'Superconducting qubits are fast but short-lived, trapped ions have high fidelity and full connectivity but are slow, and neutral atoms and photons compete too; no platform has won yet.',
      'Qubits can be built in several physical ways, each with clear trade-offs. Superconducting qubits (IBM, Google) are Josephson-junction circuits cooled to about 10 mK in dilution refrigerators: gates take tens of nanoseconds and chips use semiconductor fabrication, but coherence lasts around 100 µs and only neighbors connect. Trapped ions (Quantinuum, IonQ) are held in vacuum by electric fields and driven by lasers: coherence lasts seconds or more, two-qubit fidelities are high and any pair can interact, but gates take microseconds and scaling up is hard. Neutral atoms (QuEra, Pasqal) are arranged by optical tweezers in arrays of hundreds to a thousand and can even be moved during a computation. Photonic approaches (PsiQuantum, Xanadu) offer near-room-temperature components and a natural fit with communication but must overcome photon loss. There is no winner yet: two-qubit fidelity, connectivity, speed and the total cost once error correction is included matter as much as qubit counts. The figures shown are rough ranges, and most devices can be tried through the cloud.', sHW())
  ]),
  sec('qc-practice', '실무와 암호', 'Practice and cryptography', '오늘의 양자 컴퓨터를 쓰는 법', 'Working with today’s quantum computers', '칩 구조에 맞춰 회로를 바꾸는 트랜스파일, 고전 컴퓨터로 회로를 시뮬레이션하는 비용, 쇼어 이후를 대비하는 양자 내성 암호, 최적화 문제를 노리는 QAOA, 그리고 양자 우위 실험이 실제로 보여준 것을 봐요.', 'Transpiling circuits to fit a chip, the cost of simulating circuits classically, post-quantum cryptography for the post-Shor era, QAOA for optimization, and what quantum-advantage experiments have actually shown.', [
    item('qc-transpile', '회로 컴파일(트랜스파일)', 'Compiling circuits (transpilation)',
      '트랜스파일러는 논리 회로를 칩에 배치하고, 연결되지 않은 큐비트 사이에 SWAP을 넣고, 기본 게이트로 바꾼 뒤 최적화해요. 칩 구조에 따라 비용이 크게 달라져요.',
      '실제 양자 칩은 정해진 큐비트 쌍끼리만 2큐비트 게이트를 걸 수 있고, 지원하는 기본 게이트도 정해져 있어요. 그래서 작성한 회로를 그대로 실행할 수 없고 트랜스파일러가 바꿔 줘야 해요. 먼저 배치(layout) 단계에서 논리 큐비트를 물리 큐비트에 대응시키는데, 자주 상호작용하는 큐비트는 가깝게, 오류율이 낮은 큐비트와 연결에 두려고 해요. 물리 큐비트가 0–1–2 일직선으로만 연결된 칩에서 q0 → q2 CNOT이 필요하면, 라우팅(routing) 단계가 SWAP으로 상태를 옮겨 이웃으로 만들어요. SWAP 하나는 CNOT 3개라서 2큐비트 게이트 1개가 4개가 되고 깊이도 늘어요. 이어서 기저 변환 단계가 게이트를 하드웨어의 기본 게이트로 바꿔요. 예를 들어 H는 RZ(π/2)·SX·RZ(π/2)가 돼요(전체 위상 무시). 마지막으로 최적화 단계가 겹친 회전을 합치고 서로 지우는 게이트를 없애요. 같은 알고리즘도 칩 구조에 따라 비용이 크게 달라서, 트랜스파일된 회로의 CX 수와 깊이로 실제 실행 비용을 가늠해요.',
      'A transpiler maps the logical circuit onto the chip, inserts SWAPs between uncoupled qubits, translates to native gates and optimizes; the chip’s topology changes the cost a lot.',
      'Real quantum chips allow two-qubit gates only between specific coupled pairs and support only certain native gates, so a written circuit cannot run as is and must be rewritten by a transpiler. The layout stage first assigns logical qubits to physical ones, placing frequently interacting qubits close together and on low-error qubits and links. On a chip whose qubits are coupled only in a line 0–1–2, a CNOT from q0 to q2 forces the routing stage to move states with SWAPs until the qubits are neighbors; each SWAP is three CNOTs, so one two-qubit gate becomes four and the depth grows. Basis translation then rewrites every gate in the hardware’s native set, H becoming RZ(π/2)·SX·RZ(π/2) up to a global phase, and an optimization pass merges consecutive rotations and removes gates that cancel. The same algorithm can cost very different amounts on different topologies, and the transpiled circuit’s CX count and depth are the practical measures of cost.', sTranspile()),
    item('qc-sim', '양자 회로 시뮬레이션', 'Simulating quantum circuits',
      '상태 벡터 시뮬레이션은 2^n개 진폭을 저장하고 게이트마다 전체를 갱신해 메모리와 시간이 큐비트마다 두 배가 돼요. 클리퍼드 회로나 얽힘이 적은 회로는 더 싸게 시뮬레이션해요.',
      '양자 알고리즘의 개발과 디버깅은 대부분 고전 컴퓨터의 시뮬레이터에서 해요. 상태 벡터 시뮬레이터는 2^n개 진폭을 배열에 그대로 저장해서, 4큐비트면 16개 진폭이고 처음에는 |0000⟩에만 1이 있어요. 배열을 큐비트마다 축 하나인 텐서로 보면, 1큐비트 게이트는 그 비트만 다른 진폭 쌍들에 2×2 행렬을 곱하는 일이 돼요. 큐비트 1에 게이트를 걸면 8쌍을 갱신하므로, 게이트 하나에도 2^n에 비례하는 계산이 들어요. 진폭 하나가 16바이트라 30큐비트는 17 GB로 좋은 노트북이면 되지만, 40큐비트는 18 TB로 슈퍼컴퓨터가 필요하고, 50큐비트는 18 PB로 가장 큰 기계의 메모리도 넘어서요. 큐비트가 하나 늘 때마다 메모리와 시간이 두 배가 되는 거죠. 다른 길도 있어요. H, S, CNOT만 쓰는 클리퍼드 회로는 고틀리프-닐 정리에 따라 다항 시간에 시뮬레이션되고, 얽힘이 적거나 얕은 회로는 텐서 네트워크로 수백 큐비트까지 다룰 수 있어요. 노이즈 모델을 넣어 실제 기기를 흉내 내기도 하고, 양자 우위 주장은 결국 이런 고전 방법과의 경주예요.',
      'Statevector simulation stores 2^n amplitudes and touches all of them per gate, doubling memory and time with every qubit; Clifford and low-entanglement circuits can be simulated far more cheaply.',
      'Most quantum algorithm development and debugging happens on classical simulators. A statevector simulator stores all 2^n amplitudes in an array: 16 for four qubits, starting with 1 on |0000⟩ only. Viewing the array as a tensor with one axis per qubit, a single-qubit gate multiplies each pair of amplitudes that differ only in that bit by a 2×2 matrix; a gate on qubit 1 updates 8 pairs, so every gate costs work proportional to 2^n. At 16 bytes per amplitude, 30 qubits need 17 GB, within reach of a strong laptop, 40 qubits need 18 TB and a supercomputer, and 50 qubits need 18 PB, beyond the memory of the largest machines; each extra qubit doubles memory and time. Other routes exist: Clifford circuits using only H, S and CNOT simulate in polynomial time by the Gottesman–Knill theorem, and low-entanglement or shallow circuits reach hundreds of qubits with tensor networks. Noise models let simulators mimic real devices, and quantum-advantage claims are ultimately a race against such classical methods.', sSim()),
    item('qc-pqc', '양자 내성 암호', 'Post-quantum cryptography',
      '쇼어 알고리즘에 깨지는 RSA·타원 곡선 대신 격자 기반 ML-KEM 같은 알고리즘으로 옮겨 가요. NIST가 2024년에 표준을 발표했고 TLS에는 하이브리드 방식이 이미 쓰여요.',
      '쇼어 알고리즘은 RSA와 타원 곡선 암호(ECDH, ECDSA)의 바탕인 인수분해와 이산 로그를 다항 시간에 풀기 때문에, 오류 정정된 대형 양자 컴퓨터가 나오면 오늘날의 공개 키 암호 대부분이 깨져요. 반면 AES 같은 대칭키 암호와 SHA-256 같은 해시는 그로버 알고리즘으로 탐색이 √N이 될 뿐이라 AES-128이 64비트 수준으로 약해지는 정도이고, AES-256을 쓰면 충분해요. 양자 내성 암호는 양자 컴퓨터로도 어렵다고 여겨지는 수학 문제를 써요. 대표인 ML-KEM(옛 이름 Kyber)은 b = A·s + e처럼 비밀 s에 작은 오차 e를 섞은 값에서 s를 되찾기 어려운 격자 문제(LWE)에 기대요. 대가는 크기로, ML-KEM-768의 공개 키는 1,184바이트, 암호문은 1,088바이트로 X25519의 32바이트보다 훨씬 커요. NIST는 2024년 8월 ML-KEM(FIPS 203), ML-DSA(FIPS 204), SLH-DSA(FIPS 205)를 표준으로 발표했어요. 지금 가로챈 암호문을 나중에 양자 컴퓨터로 풀 수 있으므로(harvest now, decrypt later) 오래 지켜야 할 데이터부터 전환하고 있고, TLS는 X25519와 ML-KEM-768을 함께 쓰는 하이브리드 키 교환을 이미 배포하고 있어요. 전환에는 몇 년이 걸리므로 알고리즘을 쉽게 바꿀 수 있는 설계, 곧 암호 민첩성이 중요해요.',
      'RSA and elliptic curves, which Shor’s algorithm breaks, are being replaced by algorithms such as lattice-based ML-KEM; NIST published standards in 2024 and TLS already uses hybrid schemes.',
      'Shor’s algorithm solves factoring and discrete logarithms, the foundations of RSA and elliptic-curve cryptography (ECDH, ECDSA), in polynomial time, so a large error-corrected quantum computer would break most of today’s public-key cryptography. Symmetric ciphers such as AES and hashes such as SHA-256 face only Grover’s √N search, which weakens AES-128 to a 64-bit level, so AES-256 is sufficient. Post-quantum cryptography relies on mathematical problems believed hard even for quantum computers. The leading example, ML-KEM (formerly Kyber), rests on the lattice problem LWE: recovering a secret s from b = A·s + e, where a small error e has been mixed in. The price is size: an ML-KEM-768 public key is 1,184 bytes and a ciphertext 1,088 bytes, against 32 bytes for X25519. In August 2024 NIST published ML-KEM (FIPS 203), ML-DSA (FIPS 204) and SLH-DSA (FIPS 205) as standards. Because ciphertext captured today could be decrypted by a future quantum computer (harvest now, decrypt later), long-lived data is being migrated first, and TLS already deploys hybrid key exchange combining X25519 with ML-KEM-768. Migration takes years, which makes crypto agility, designing systems to swap algorithms easily, important.', sPQC()),
    item('qc-qaoa', '양자 근사 최적화(QAOA)', 'The quantum approximate optimization algorithm (QAOA)',
      '비용 위상 층과 섞기 층을 번갈아 걸고 각도를 고전적으로 최적화해 조합 최적화 문제의 좋은 답을 찾아요. 4노드 고리 MaxCut에서 p = 1이면 최적의 75%예요.',
      'QAOA는 조합 최적화 문제를 위한 변분 양자 알고리즘이에요. 예로 4개 노드가 고리로 연결된 그래프의 MaxCut, 곧 노드를 두 편으로 나눠 서로 다른 편을 잇는 간선(끊기는 간선)의 수를 최대로 만드는 문제를 생각해요. 최적 답은 0101이나 1010처럼 번갈아 나누는 것으로 4개 간선이 모두 끊겨요. QAOA는 균등 중첩에서 시작해, 간선마다 비용에 따른 위상을 주는 RZZ(2γ)와 큐비트마다 상태를 섞는 RX(2β)를 한 층으로 삼아 p번 반복해요. p = 1에서 각도를 γ = π/4, β = π/8로 맞추면 끊기는 간선이 4개인 비트열이 0.53, 2개가 0.44, 0개가 0.03의 확률로 나와 기대값이 3.0, 최적의 75%가 돼요. 각도는 측정 결과를 보고 고전 최적화기가 조정하고, 측정한 비트열 중 가장 좋은 것을 답으로 써요. 층을 늘리면 더 좋아지지만 회로가 깊어져 노이즈가 쌓이고, 고에만스-윌리엄슨 알고리즘(최적의 0.878배 보장)처럼 강력한 고전 방법을 확실히 넘는다는 증거는 아직 없어요. D-Wave 같은 양자 어닐러도 비슷한 최적화 문제를 노려요.',
      'Alternating cost-phase and mixing layers, with angles tuned classically, finds good solutions to combinatorial problems; on a 4-node ring MaxCut, p = 1 reaches 75% of the optimum.',
      'QAOA is a variational quantum algorithm for combinatorial optimization. Take MaxCut on a ring of four nodes: split the nodes into two sides so that as many edges as possible connect opposite sides. The optimum alternates, as in 0101 or 1010, cutting all four edges. QAOA starts from a uniform superposition and repeats p layers, each applying RZZ(2γ), a cost-dependent phase, on every edge and RX(2β), a mixing rotation, on every qubit. At p = 1 with γ = π/4 and β = π/8, bit strings cutting four edges appear with probability 0.53, two edges with 0.44 and none with 0.03, an expected cut of 3.0, or 75% of the optimum. A classical optimizer tunes the angles from measurement results, and the best measured bit string is taken as the answer. More layers improve the result but deepen the circuit and add noise, and there is no clear evidence yet that QAOA beats strong classical methods such as the Goemans–Williamson algorithm, which guarantees 0.878 of the optimum. Quantum annealers such as D-Wave target similar optimization problems.', sQAOA()),
    item('qc-advantage', '양자 우위', 'Quantum advantage',
      '무작위 회로 샘플링에서 양자 칩이 슈퍼컴퓨터를 압도한다는 실험들이 있었지만, 고전 알고리즘도 발전하며 격차를 좁혔어요. 다음 목표는 유용한 문제에서의 이점이에요.',
      '양자 우위는 양자 컴퓨터가 어떤 고전 컴퓨터로도 현실적인 시간 안에 할 수 없는 계산을 해내는 것을 말해요. 이를 보이기 위해 주로 무작위 회로 샘플링(RCS)을 써요. 무작위 게이트로 만든 회로의 출력 분포에서 비트열을 뽑는 과제로, 쓸모보다는 고전적으로 흉내 내기 어렵도록 고른 과제예요. 2019년 Google의 53큐비트 Sycamore는 RCS를 200초 만에 했고, 당시 슈퍼컴퓨터로는 1만 년이 걸린다고 주장했어요. 그 뒤 텐서 네트워크 같은 고전 방법이 발전해 같은 과제를 수 시간 수준으로 재현하면서 격차가 크게 줄었어요. 2024년 105큐비트 Willow는 더 큰 RCS를 5분 안에 수행해 고전 추정 10^25년과의 격차를 크게 벌렸고, 같은 칩에서 오류 정정이 문턱값 아래에서 동작함도 보였어요. 이처럼 우위는 고전 알고리즘의 발전과 계속 경쟁하는 움직이는 목표예요. RCS 자체는 쓸모 있는 계산이 아니므로, 화학과 재료 시뮬레이션처럼 유용한 문제에서 고전을 이기는 것과, 오류 정정된 논리 큐비트의 수와 품질을 늘리는 것이 다음 이정표예요.',
      'Experiments showed quantum chips overwhelming supercomputers at random circuit sampling, while improving classical algorithms narrowed the gap; advantage on useful problems is the next goal.',
      'Quantum advantage means a quantum computer completing a computation that no classical computer can finish in reasonable time. Demonstrations usually rely on random circuit sampling (RCS): drawing bit strings from the output distribution of a circuit built from random gates, a task chosen to be hard to mimic classically rather than to be useful. In 2019 Google’s 53-qubit Sycamore performed RCS in 200 seconds and claimed that a supercomputer would need 10,000 years. Classical methods such as tensor networks then improved enough to reproduce the task in hours, shrinking the gap considerably. In 2024 the 105-qubit Willow ran a larger RCS in under five minutes against a classical estimate of 10^25 years, and the same chip showed error correction operating below threshold. Advantage is thus a moving target in a race with improving classical algorithms. Because RCS is not itself useful, the next milestones are beating classical methods on useful problems such as chemistry and materials simulation and growing the number and quality of error-corrected logical qubits.', sAdv())
  ]),
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
