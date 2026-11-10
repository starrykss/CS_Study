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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'irx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono irx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono irx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c irx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono irx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c irx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'irx-s irx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono irx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono irx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono irx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono irx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono irx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'irx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'irx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'irx-xs irx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono irx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'irx-a', g: 'irx-g', r: 'irx-r', w: 'irx-w', m: 'cz-mono', s: 'irx-s', f: 'cz-math' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'irx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono irx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono irx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'irx-xs ') + clsOf(c) + (o.w ? ' irx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.irx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.irx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.irx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.irx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.irx-r .in{color:var(--danger);font-weight:800}
.irx-g .in{color:var(--ok);font-weight:800}
.irx-a .in{color:var(--accent);font-weight:800}
.irx-w .in{color:var(--warn);font-weight:800}
.irx-c .in{font-size:.6em;font-weight:700}
.irx-c2 .in{font-size:.5em;font-weight:700}
.irx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.irx-wr .in{white-space:normal!important}
.irx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.irx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== IR · helpers (shared with the circuits page pattern) ===== */
const CSSY = '.irx-sv svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}';
const F = (S, k, x, y, t, c, st, o = {}) => lbl(S, k, x, y, t, 'f ' + (c || ''), st, o);
/* plots: data x in [a, b], y in [lo, hi] mapped to a box at (x0, y0) of size w × h */
const PF = (x0, y0, w, h, a, b, lo, hi) => ({ X: x => x0 + (x - a) / (b - a) * w, Y: y => y0 + h - (y - lo) / (hi - lo) * h, x0, y0, w, h, a, b, lo, hi });
const axes = (S, k, P, st, o = {}) => { const yz = P.Y(Math.max(P.lo, Math.min(P.hi, 0))); hl(S, k + 'x', P.x0, P.x0 + P.w, yz, 'ink-3', st, { w: .06, off: o.off }); if (!o.noy) vl(S, k + 'y', P.X(Math.max(P.a, Math.min(P.b, 0))), P.y0, P.y0 + P.h, 'ink-3', st, { w: .06, off: o.off }); };
const ticks = (S, k, P, xs, ys, st, o = {}) => { const yb = o.yb ?? P.Y(Math.max(P.lo, Math.min(P.hi, 0))) + .12; (xs || []).forEach(([v, t], i) => T(S, k + 'x' + i, P.X(v) - .9, yb, t, 'cz-mono cz-tc irx-tiny', st, { w: 1.8, off: o.off })); (ys || []).forEach(([v, t], i) => T(S, k + 'y' + i, P.x0 - 2.0, P.Y(v) - .3, t, 'cz-mono irx-tiny', st, { w: 1.8, css: 'text-align:right', off: o.off })); };
/* one SVG path per curve */
const spoly = (S, k, pts, o = {}) => {
  const ok = pts.filter(Boolean); if (ok.length < 2) return;
  const pad = .3, xs = ok.map(p => p[0]), ys = ok.map(p => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, w = Math.max(...xs) + pad - x0, h = Math.max(...ys) + pad - y0;
  let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + r3(p[0] - x0) + ' ' + r3(p[1] - y0); pen = true; });
  S.el(k, { x: x0, y: y0, w, h, cls: 'irx-sv', html: `<svg viewBox="0 0 ${r3(w)} ${r3(h)}" preserveAspectRatio="none"><path d="${d}" style="fill:none;stroke:${cv(o.color || 'accent')};stroke-width:${o.h || .09};stroke-linejoin:round;stroke-linecap:round${o.dash ? ';stroke-dasharray:.25 .2' : ''}"/></svg>`, s: o.st ? hid() : {} });
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
const SV = (S, k, parts, st, o = {}) => { const [x, y, w, h] = o.box || [18.2, 0, 13.8, 15]; S.el(k, { x, y, w, h, cls: 'irx-sv', html: `<svg viewBox="${x} ${y} ${w} ${h}">${[].concat(parts).join('')}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
/* value grid as one SVG: M is rows × cols of 0..1, drawn with tint of color */
const GR = (S, k, x0, y0, cs, M, color, st, o = {}) => { const R = M.length, Cn = M[0].length; let r = ''; M.forEach((row, i) => row.forEach((v, j) => { const c = typeof color === 'function' ? color(v, i, j) : color; r += `<rect x="${r3(j * cs)}" y="${r3(i * cs)}" width="${r3(cs - (o.gap ?? .04))}" height="${r3(cs - (o.gap ?? .04))}" style="fill:${tint(c, Math.round(6 + 80 * Math.max(0, Math.min(1, Math.abs(v)))))}"/>`; })); S.el(k, { x: x0, y: y0, w: Cn * cs, h: R * cs, cls: 'irx-sv', html: `<svg viewBox="0 0 ${r3(Cn * cs)} ${r3(R * cs)}">${r}</svg>`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const nb = (S, k, x, y, w, h, label, color, st, o = {}) => box2(S, k, x, y, w, h, label, color, st, Object.assign({ pct: 22 }, o));
const gauss1 = (m, s) => x => Math.exp(-Math.pow((x - m) / s, 2) / 2);
const tokW = t => .5 + .34 * [...t].reduce((a, c) => a + (/[가-힣]/.test(c) ? 1.7 : 1), 0);
const toks = (S, k, x, y, list, color, st, o = {}) => { let xx = x; list.forEach((t, i) => { const w = o.w || tokW(t); chip(S, k + i, xx, y, w, t, typeof color === 'function' ? color(t, i) : color, st, { off: o.off, h: o.h || .9 }); xx += w + (o.gap ?? .12); }); return xx; };
const tpos = (x, list, gap = .12) => { let xx = x; return list.map(t => { const w = tokW(t), r = [xx, w]; xx += w + gap; return r; }); };
/* ===== IR · 1. indexing ===== */
const prow = (S, k, x, y, list, color, st, o = {}) => list.forEach((v, i) => chip(S, k + i, x + i * (o.dx || 1.1), y, o.w || .95, String(v), typeof color === 'function' ? color(v, i) : color, st, { h: o.h || .8, off: o.off }));

function sInv() {
  const D = ['d1: new home sales top forecasts', 'd2: home sales rise in july', 'd3: increase in home sales in july', 'd4: july new home sales rise'];
  const IX = [['forecasts', [1]], ['home', [1, 2, 3, 4]], ['in', [2, 3]], ['increase', [3]], ['july', [2, 3, 4]], ['new', [1, 4]], ['rise', [2, 4]], ['sales', [1, 2, 3, 4]], ['top', [1]]];
  return CW('ir-invindex', {
    code: ['index = defaultdict(list)', 'for doc_id, text in enumerate(docs, 1):', '    for term in set(tokenize(text)):', ['        index[term].append(doc_id)  # 번호순', '        index[term].append(doc_id)  # sorted'], "index['july']  # [2, 3, 4]"],
    hl: [[1, 1], [2, 2, 'accent'], [4, 1, 'ok'], [4, 1, 'ok']],
    draw: (S) => {
      D.forEach((t, i) => box2(S, 'd' + i, 19.0, .3 + i * .9, 12.4, .75, t, 'ink', 1, { pct: 14 }));
      IX.forEach(([t, ps], i) => { const y = 4.2 + i * .86; T(S, 'tm' + i, 19.0, y + .02, t, 'cz-mono irx-xs' + (t === 'july' ? ' irx-g' : ''), 2, { w: 3.0 }); prow(S, 'ps' + i + '_', 22.4, y, ps, t === 'july' ? 'ok' : 'accent', 2, { h: .78, w: .9, dx: 1.05 }); });
      lbl(S, 'qy', 27.2, 7.65, ['july → 2, 3, 4번만 읽기', 'july → read only 2, 3, 4'], 'g', 3, { w: 4.2 });
      lbl(S, 'sc', 1, 7.0, ['색인 없이 찾으면 모든 문서를 처음부터 읽어야 해요', 'without an index, every document must be scanned'], 'r', 1, { w: 16.0 });
      lbl(S, 'pl', 1, 8.4, ['역색인: 사전(단어, 정렬) → 포스팅 리스트(문서 번호순)', 'inverted index: a sorted dictionary of terms → posting lists in document order'], 'a', 2, { w: 16.0 });
      lbl(S, 'fs', 1, 10.0, ['문서가 수억 개여도 질의 단어의 포스팅만 읽어요', 'even with hundreds of millions of documents, only the query terms’ postings are read'], 'g', 4, { w: 16.0 });
      lbl(S, 'ex', 1, 11.4, ['실제로는 단어 빈도와 위치도 함께 저장해요', 'real indexes also store term frequencies and positions'], '', 4, { w: 16.0 });
    },
    notes: [['검색 엔진은 문서를 미리 색인해 둬요 · 예로 짧은 문서 4개를 써요', 'search engines index documents ahead of time; here are four short documents'], ['역색인은 단어마다 그 단어가 나오는 문서 번호 목록(포스팅 리스트)을 저장해요 · 사전의 단어는 정렬하고, 포스팅은 문서 번호순이에요', 'an inverted index stores, for every term, the list of documents containing it (its posting list), with the dictionary sorted and postings in document order'], ['july를 찾으면 사전에서 july를 찾아 포스팅 [2, 3, 4]만 읽으면 돼요 · 모든 문서를 훑을 필요가 없어요', 'a search for july looks up july in the dictionary and reads only its postings [2, 3, 4], with no need to scan every document'], ['문서가 수억 개라도 질의 단어들의 포스팅만 읽으므로 빨라요 · 실제로는 단어 빈도와 위치도 함께 저장해 순위 매기기와 구절 검색에 써요', 'even with hundreds of millions of documents only the query terms’ postings are read; real indexes also store term frequencies and positions for ranking and phrase search']],
    fin: [['역색인: 단어 → 문서 번호 목록, 검색 엔진의 핵심 자료 구조', 'the inverted index maps each term to its documents, the core data structure of search engines', 'irx-xs irx-a'], ['사전은 해시나 정렬 배열·트라이로, 포스팅은 압축 배열로 저장해요', 'the dictionary is a hash, sorted array or trie, and postings are compressed arrays'], ['Lucene, Elasticsearch 모두 역색인 위에 지어졌어요', 'Lucene and Elasticsearch are built on inverted indexes']],
    caps: [['문서 모음', 'The collection'], ['포스팅 리스트', 'Posting lists'], ['단어 찾기', 'Looking up a term'], ['왜 빠른가', 'Why it is fast'], ['역색인', 'The inverted index']]
  });
}

function sAnalysis() {
  const R1 = ['The', 'Runners', 'were', 'RUNNING'], R2 = ['the', 'runners', 'were', 'running'], R4 = ['runner', 'run'];
  return CW('ir-analysis', {
    code: [["toks = re.findall(r'\\w+', text)  # 토큰화", "toks = re.findall(r'\\w+', text)  # tokenize"], ['toks = [t.lower() for t in toks] # 소문자', 'toks = [t.lower() for t in toks] # lowercase'], 'toks = [t for t in toks if t not in STOP]', ['toks = [stem(t) for t in toks]   # 어간 추출', 'toks = [stem(t) for t in toks]   # stemming'], ['# 한국어: 형태소 분석이나 바이그램', '# Korean: morphology or bigrams']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'danger'], [3, 2, 'ok']],
    draw: (S) => {
      box2(S, 'src', 19.0, .3, 9.4, .8, '"The Runners were RUNNING!"', 'ink', 1, { pct: 14 });
      toks(S, 'r1', 18.8, 1.5, R1, 'ink', 1); lbl(S, 'l1', 28.4, 1.55, ['토큰화', 'tokenize'], '', 1, { w: 3.0 });
      toks(S, 'r2', 18.8, 2.7, R2, 'warn', 2); lbl(S, 'l2', 28.4, 2.75, ['소문자', 'lowercase'], 'w', 2, { w: 3.0 });
      toks(S, 'r3', 18.8, 3.9, R2, (t) => t === 'the' || t === 'were' ? 'danger' : 'warn', 3); lbl(S, 'l3', 28.4, 3.95, ['불용어 제거', 'stop words'], 'r', 3, { w: 3.0 });
      toks(S, 'r4', 18.8, 5.1, R4, 'ok', 4); lbl(S, 'l4', 28.4, 5.15, ['어간 추출', 'stemming'], 'g', 4, { w: 3.0 });
      lbl(S, 'sw', 19.0, 6.4, ['the, were처럼 흔한 단어는 변별력이 낮아 빼요 (구절 검색엔 남기기도)', 'very common words like the and were carry little signal and are dropped (or kept for phrase search)'], 'r', 3, { w: 12.4 });
      lbl(S, 'same', 19.0, 8.6, ['문서와 질의에 같은 분석기 → running 검색에 runners 문서도 걸려요', 'with one analyzer for documents and queries, a search for running also finds runners'], 'g', 4, { w: 12.4 });
      lbl(S, 'ko', 1, 7.0, ['한국어 "검색엔진을"은 띄어쓰기만으로 못 나눠요', 'Korean “검색엔진을” cannot be split on spaces alone'], 'a', 4, { w: 16.0 });
      lbl(S, 'km', 1, 8.2, ['형태소 분석', 'morphology'], 'm', 4); toks(S, 'kmt', 5.4, 8.1, ['검색', '엔진'], 'ok', 4); lbl(S, 'kmn', 9.6, 8.2, ['조사 "을" 제거', 'particle 을 dropped'], '', 4, { w: 7.6 });
      lbl(S, 'kb', 1, 9.5, ['바이그램', 'bigrams'], 'm', 4); toks(S, 'kbt', 5.4, 9.4, ['검색', '색엔', '엔진', '진을'], 'accent', 4);
      lbl(S, 'kn', 1, 10.8, ['형태소는 정확, 바이그램은 사전 없이 튼튼하지만 색인이 커져요', 'morphology is precise; bigrams need no dictionary but enlarge the index'], '', 4, { w: 16.0 });
    },
    notes: [['색인 전에 글을 토큰으로 잘라요 · "The Runners were RUNNING!"은 The, Runners, were, RUNNING이 돼요', 'before indexing, text is split into tokens: “The Runners were RUNNING!” becomes The, Runners, were and RUNNING'], ['대소문자를 통일해 the, runners, were, running으로 만들어요', 'case is normalized, giving the, runners, were and running'], ['the, were처럼 너무 흔해 변별력이 없는 불용어는 빼요 · 다만 "to be or not to be" 같은 구절 검색에는 필요할 수 있어 요즘은 남기기도 해요', 'stop words such as the and were are so common that they carry little signal and are removed, though they are often kept today for phrase searches like “to be or not to be”'], ['어간 추출로 runners → runner, running → run처럼 변형을 묶어요 · 한국어는 띄어쓰기만으로 안 되어 형태소 분석으로 조사를 떼거나 2글자씩(바이그램) 잘라요 · 문서와 질의에 같은 분석기를 써야 해요', 'stemming groups variants, runners → runner and running → run; Korean needs morphological analysis to strip particles, or two-character bigrams, and documents and queries must share the same analyzer']],
    fin: [['분석: 토큰화 → 정규화 → 불용어 → 어간 추출', 'analysis: tokenize → normalize → stop words → stemming', 'irx-xs irx-a'], ['문서와 질의는 반드시 같은 분석을 거쳐야 해요', 'documents and queries must go through the same analysis'], ['어간 추출은 재현율을 높이지만 뜻을 섞기도 해요 (university, universe → univers)', 'stemming raises recall but can conflate meanings (university, universe → univers)']],
    caps: [['토큰화', 'Tokenization'], ['소문자로', 'Lowercasing'], ['불용어', 'Stop words'], ['어간 추출과 한국어', 'Stemming and Korean'], ['텍스트 분석', 'Text analysis']]
  });
}

function sBool() {
  const BR = [1, 2, 4, 11, 31, 45, 173, 174], CA = [1, 2, 4, 5, 6, 16, 57, 132], X0 = 21.3, DX = 1.24, HIT = new Set([1, 2, 4]);
  return CW('ir-boolean', {
    code: ['while i < len(a) and j < len(b):', '    if a[i] == b[j]:', '        out.append(a[i]); i += 1; j += 1', '    elif a[i] < b[j]: i += 1', '    else: j += 1'],
    hl: [[0, 1], [1, 2, 'ok'], [3, 2, 'warn'], [3, 1, 'accent']],
    draw: (S) => {
      T(S, 'nb', 19.0, 1.25, 'Brutus', 'cz-mono irx-xs', 1, { w: 2.2 }); prow(S, 'b', X0, 1.2, BR, 'accent', 1, { dx: DX, w: 1.18 });
      T(S, 'nc', 19.0, 2.65, 'Caesar', 'cz-mono irx-xs', 1, { w: 2.2 }); prow(S, 'c', X0, 2.6, CA, 'warn', 1, { dx: DX, w: 1.18 });
      BR.forEach((v, i) => { if (HIT.has(v)) chip(S, 'hb' + i, X0 + i * DX, 1.2, 1.18, String(v), 'ok', 2, { h: .8 }); }); CA.forEach((v, i) => { if (HIT.has(v)) chip(S, 'hc' + i, X0 + i * DX, 2.6, 1.18, String(v), 'ok', 2, { h: .8 }); });
      F(S, 'out', 19.0, 3.9, 'out = [1, 2, 4]', 'g', 2, { w: 12.4 });
      lbl(S, 'cost', 19.0, 5.0, ['작은 쪽 포인터만 전진: 비교는 많아야 x + y번, O(x + y)', 'only the smaller pointer advances: at most x + y comparisons, O(x + y)'], 'w', 3, { w: 12.4 });
      SV(S, 'sk', [zW([[X0 + .5, 1.15], [X0 + .5, .55], [X0 + 3 * DX + .5, .55], [X0 + 3 * DX + .5, 1.15]], 'accent', .05), zW([[X0 + 3 * DX + .5, 1.15], [X0 + 3 * DX + .5, .55], [X0 + 6 * DX + .5, .55], [X0 + 6 * DX + .5, 1.15]], 'accent', .05)], 4);
      lbl(S, 'skl', 19.0, 6.5, ['건너뛰기 포인터(위 연결선): 상대보다 작으면 √L칸씩 건너뛰어요', 'skip pointers (arcs above) jump √L entries while still smaller than the other list'], 'a', 4, { w: 12.4 });
      lbl(S, 'ord', 19.0, 8.1, ['단어가 여러 개면 가장 짧은 포스팅부터 교집합', 'with many terms, intersect the shortest lists first'], 'g', 4, { w: 12.4 });
      lbl(S, 'q', 1, 7.0, ['Brutus AND Caesar: 두 포스팅의 교집합', 'Brutus AND Caesar: intersect the two posting lists'], 'a', 1, { w: 16.0 });
      lbl(S, 'ornot', 1, 8.4, ['OR는 합집합, NOT은 차집합으로 같은 방식의 병합', 'OR (union) and NOT (difference) merge the same way'], '', 3, { w: 16.0 });
      lbl(S, 'nr', 1, 9.8, ['불리언 검색은 순위가 없어 정밀한 필터에 주로 써요', 'Boolean search has no ranking, so it mostly serves as a precise filter'], 'r', 4, { w: 16.0 });
    },
    notes: [['불리언 검색은 AND, OR, NOT으로 문서 집합을 만들어요 · Brutus AND Caesar는 두 단어의 포스팅 리스트의 교집합이에요', 'Boolean retrieval builds document sets with AND, OR and NOT; Brutus AND Caesar is the intersection of the two terms’ posting lists'], ['두 리스트가 문서 번호순으로 정렬돼 있어서, 두 포인터를 앞에서부터 움직이며 같으면 결과에 넣어요 · 결과는 [1, 2, 4]예요', 'both lists are sorted by document number, so two pointers move from the front and equal values go into the result: [1, 2, 4]'], ['더 작은 쪽 포인터만 전진하므로 비교는 많아야 두 길이의 합, 곧 O(x + y)예요 · OR와 NOT도 같은 방식으로 병합해요', 'only the pointer at the smaller value advances, so comparisons never exceed the sum of the lengths, O(x + y); OR and NOT merge the same way'], ['건너뛰기 포인터를 두면 상대보다 작을 때 √L칸씩 건너뛸 수 있어요 · 단어가 여러 개면 가장 짧은 포스팅부터 교집합해 중간 결과를 작게 유지해요', 'skip pointers let a pointer jump √L entries while it is still behind; with many terms, intersecting the shortest lists first keeps intermediate results small']],
    fin: [['포스팅 교집합: 정렬된 두 리스트를 두 포인터로 O(x + y)', 'posting intersection walks two sorted lists with two pointers in O(x + y)', 'irx-xs irx-a'], ['짧은 리스트부터 처리하는 것이 질의 최적화의 기본이에요', 'processing the shortest lists first is basic query optimization'], ['검색 엔진의 필터(카테고리, 날짜)도 같은 교집합이에요', 'search-engine filters such as category or date use the same intersection']],
    caps: [['두 포스팅', 'Two posting lists'], ['병합', 'Merging'], ['비용', 'Cost'], ['건너뛰기와 순서', 'Skips and ordering'], ['불리언 검색과 교집합', 'Boolean search and intersection']]
  });
}

function sPos() {
  const TO = [8, 16, 190, 429, 433], BE = [17, 191, 291, 430, 434], X0 = 22.0, DX = 1.9, OK = [1, 1, 0, 1, 1];
  return CW('ir-positional', {
    code: ["to = pos['to'][4]  # [8, 16, 190, 429, 433]", "be = pos['be'][4]  # [17, 191, 291, 430, 434]", 's = set(to)', ['hits = [p for p in be if p - 1 in s]  # 4곳', 'hits = [p for p in be if p - 1 in s]  # 4 hits'], ['# 위치를 저장하면 색인이 2~4배 커져요', '# positions make the index 2–4× larger']],
    hl: [[0, 2, 'accent'], [2, 2, 'warn'], [3, 1, 'ok'], [4, 1, 'danger']],
    draw: (S) => {
      lbl(S, 'h', 19.0, .3, ['문서 4의 단어 위치', 'word positions in document 4'], 'm', 1);
      T(S, 'nt', 19.0, 1.25, 'to', 'cz-mono irx-xs', 1, { w: 2.8 }); prow(S, 't', X0, 1.2, TO, 'accent', 1, { dx: DX, w: 1.75 });
      T(S, 'nb', 19.0, 2.45, 'be', 'cz-mono irx-xs', 1, { w: 2.8 }); prow(S, 'b', X0, 2.4, BE, 'warn', 1, { dx: DX, w: 1.75 });
      T(S, 'nm', 19.0, 3.65, 'be − 1', 'cz-mono irx-xs', 2, { w: 2.8 }); prow(S, 'm', X0, 3.6, BE.map(p => p - 1), 'ink', 2, { dx: DX, w: 1.75 });
      OK.forEach((v, i) => T(S, 'ck' + i, X0 + i * DX, 4.5, v ? '✓' : '✗', 'cz-tc irx-xs ' + (v ? 'irx-g' : 'irx-r'), 3, { w: 1.75 }));
      TO.forEach((p, i) => { if (p !== 8) chip(S, 'tt' + i, X0 + i * DX, 1.2, 1.75, String(p), 'ok', 3, { h: .8 }); });
      F(S, 'hits', 19.0, 5.6, '(16, 17) (190, 191) (429, 430) (433, 434)', 'g', 3, { w: 12.4 });
      lbl(S, 'q', 1, 7.0, ['구절 "to be": 어느 문서인지뿐 아니라 어디에 있는지 필요', 'the phrase “to be” needs where the words occur, not just which documents'], 'a', 1, { w: 16.0 });
      lbl(S, 'px', 1, 8.6, ['근접 검색 "to /3 be": 위치 차이 3 이하', 'proximity search “to /3 be”: positions within 3'], '', 4, { w: 16.0 });
      lbl(S, 'bw', 1, 9.8, ['바이워드 색인: 자주 쓰는 "to be"를 한 단어처럼 색인', 'biword index: index common pairs such as “to be” as single terms'], '', 4, { w: 16.0 });
      lbl(S, 'sz', 1, 11.2, ['위치를 저장하면 색인이 2~4배 커져요', 'storing positions makes the index 2–4× larger'], 'r', 4, { w: 16.0 });
    },
    notes: [['구절 "to be"를 찾으려면 단어가 어느 문서에 있는지뿐 아니라 어디에 있는지 알아야 해요 · 위치 색인은 문서마다 단어의 위치 목록을 저장해요', 'finding the phrase “to be” requires knowing where the words occur, not just which documents contain them, so a positional index stores each term’s positions per document'], ['be의 위치에서 1을 빼 to의 위치와 맞춰 봐요', 'subtract 1 from each position of be and compare with the positions of to'], ['16, 190, 429, 433이 to에도 있어서 구절이 4곳에서 나와요 · 291 − 1 = 290은 없어서 제외예요', '16, 190, 429 and 433 also appear for to, so the phrase occurs 4 times; 291 − 1 = 290 does not, so it is excluded'], ['위치 차이를 k 이하로 허용하면 근접 검색이 돼요 · 위치 저장은 색인을 2~4배 키워서, 자주 쓰는 구절은 바이워드 색인으로 따로 두기도 해요', 'allowing a gap of up to k gives proximity search; positions make the index 2–4 times larger, so frequent phrases are sometimes kept in a separate biword index']],
    fin: [['위치 색인: 문서별 위치 목록으로 구절·근접 검색', 'a positional index stores positions per document for phrase and proximity search', 'irx-xs irx-a'], ['구절 검색 = 위치 목록의 오프셋 교집합', 'a phrase query is an offset intersection of position lists'], ['위치는 검색어 하이라이트에도 써요', 'positions also drive result highlighting']],
    caps: [['위치 목록', 'Position lists'], ['오프셋 맞추기', 'Aligning offsets'], ['구절 찾기', 'Finding the phrase'], ['근접 검색과 비용', 'Proximity and cost'], ['위치 색인과 구절 검색', 'Positional indexes and phrase queries']]
  });
}

function sComp() {
  const PO = [283047, 283154, 283159, 283202], GP = [283047, 107, 5, 43], VB = [['00010001', '00100011', '10100111'], ['11101011'], ['10000101'], ['10101011']];
  return CW('ir-compress', {
    code: ['gaps = np.diff(post, prepend=0)', ['# → [283047, 107, 5, 43]: 작은 수가 많아요', '# → [283047, 107, 5, 43]: mostly small'], "enc = b''.join(vbyte(g) for g in gaps)", ['len(enc)  # 6바이트 (원래 4 × 4 = 16)', 'len(enc)  # 6 bytes (vs 4 × 4 = 16)'], ['# 7비트씩 끊고 마지막 바이트에 표시 비트', '# 7-bit chunks, a flag bit on the last byte']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      T(S, 'np', 19.0, 1.05, ['문서 번호', 'doc ids'], 'irx-xs', 1, { w: 2.6 }); PO.forEach((v, i) => box2(S, 'p' + i, 21.8 + i * 2.4, 1.0, 2.2, .8, String(v), 'ink', 1, { pct: 18 }));
      T(S, 'ng', 19.0, 2.25, ['간격', 'gaps'], 'irx-xs irx-w', 1, { w: 2.6 }); GP.forEach((v, i) => box2(S, 'g' + i, 21.8 + i * 2.4, 2.2, 2.2, .8, String(v), 'warn', 1));
      lbl(S, 'gl', 19.0, 3.3, ['차이(gap)를 저장하면 큰 번호도 작은 수가 돼요', 'storing gaps turns large ids into small numbers'], 'w', 1, { w: 12.4 });
      GP.forEach((g, i) => { const y = 4.5 + i * .95; T(S, 'vg' + i, 19.0, y + .05, String(g), 'cz-mono irx-xs', 2, { w: 2.4 }); VB[i].forEach((b, j) => box2(S, 'vb' + i + '_' + j, 21.6 + j * 3.2, y, 3.0, .75, b, j === VB[i].length - 1 ? 'ok' : 'accent', 2)); });
      lbl(S, 'vl', 19.0, 8.4, ['바이트마다 7비트는 값, 맨 앞 1비트는 "마지막 바이트" 표시(초록)', 'each byte carries 7 value bits; the leading bit marks the last byte (green)'], 'w', 2, { w: 12.4 });
      F(S, 'tot', 19.0, 9.9, '3 + 1 + 1 + 1 = 6 B  vs  4 × 4 = 16 B', 'g', 3, { w: 12.4 });
      lbl(S, 'f1', 1, 7.0, ['자주 나오는 단어일수록 간격이 작아 압축이 잘 돼요', 'frequent terms have small gaps and compress best'], 'a', 4, { w: 16.0 });
      lbl(S, 'f2', 1, 8.4, ['작은 색인 = 메모리에 더 많이, 디스크 읽기 감소 → 오히려 빨라져요', 'a smaller index fits more in memory and reads less from disk, so it gets faster'], 'g', 4, { w: 16.0 });
      lbl(S, 'f3', 1, 10.0, ['실무: 128개씩 블록으로 묶는 SIMD 친화 압축(Lucene, PForDelta)', 'in practice: SIMD-friendly block codecs over 128 entries (Lucene, PForDelta)'], '', 4, { w: 16.0 });
    },
    notes: [['포스팅의 문서 번호는 커지기 쉬워요 · 대신 앞 번호와의 차이(gap)를 저장하면 283047, 283154, 283159, 283202가 283047, 107, 5, 43이 돼요', 'document numbers in postings grow large, so the differences from the previous number are stored instead: 283047, 283154, 283159, 283202 become 283047, 107, 5, 43'], ['가변 바이트(VByte)는 수를 7비트씩 끊어 바이트에 담고, 마지막 바이트의 맨 앞 비트를 1로 표시해요 · 107, 5, 43은 1바이트, 283047은 3바이트예요', 'variable-byte coding splits a number into 7-bit chunks, one per byte, and sets the leading bit of the last byte: 107, 5 and 43 take one byte each and 283047 takes three'], ['모두 6바이트로, 4바이트 정수 4개(16바이트)의 절반도 안 돼요', 'that is 6 bytes in all, less than half of four 4-byte integers (16 bytes)'], ['자주 나오는 단어일수록 간격이 작아 압축이 잘 돼요 · 색인이 작으면 메모리에 더 많이 올라가고 디스크 읽기가 줄어 오히려 빨라져요 · 실무에선 128개씩 블록으로 묶는 SIMD 친화 압축을 써요', 'frequent terms have the smallest gaps and compress best; a smaller index fits more in memory and needs fewer disk reads, so it is faster too, and production engines use SIMD-friendly codecs over blocks of 128']],
    fin: [['간격 + 가변 길이 부호화로 포스팅을 크게 줄여요', 'gaps plus variable-length codes shrink postings dramatically', 'irx-xs irx-a'], ['압축 해제가 디스크 읽기보다 빨라서 압축이 성능도 올려요', 'decompression beats disk reads, so compression also improves speed'], ['비트 단위 감마 코드는 더 작지만 디코딩이 느려요', 'bit-level gamma codes are smaller but slower to decode']],
    caps: [['간격 저장', 'Storing gaps'], ['가변 바이트', 'Variable-byte codes'], ['절약한 크기', 'The savings'], ['속도까지', 'Speed as well'], ['색인 압축', 'Index compression']]
  });
}
/* ===== IR · 2. ranking models ===== */
const hbar = (S, k, x, y, w, c, st, o = {}) => rect(S, k, x, y, Math.max(.05, w), o.h || .6, c, o.pct || 55, st, { r: .06, off: o.off });

function sTFIDF() {
  const ID = [['jaguar', 'df 10', 2, 'accent'], ['speed', 'df 100', 1, 'warn'], ['the', 'df 1,000', 0, 'ink-3']];
  const DOC = [['A', '3', '1', '3.95', 'ok'], ['B', '1', '5', '3.70', 'accent'], ['C', '0', '10', '2.00', 'ink-3']];
  return CW('ir-tfidf', {
    code: [['idf = math.log10(N / df)   # 희귀할수록 큼', 'idf = math.log10(N / df)   # rarer = higher'], ['tf_w = 1 + math.log10(tf)  # 로그로 완만하게', 'tf_w = 1 + math.log10(tf)  # damped by log'], 'score = sum(tf_w[t] * idf[t] for t in q)', '# jaguar: df 10 → idf 2, the: df 1000 → 0', ['# 문서 A 3.95 > B 3.70 > C 2.00', '# doc A 3.95 > B 3.70 > C 2.00']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2]],
    draw: (S) => {
      lbl(S, 'h1', 19.0, .2, ['문서 1,000개에서 idf = log(N/df)', 'idf = log(N/df) over 1,000 documents'], 'm', 1, { w: 12.4 });
      ID.forEach(([t, d, v, c], i) => { const y = 1.1 + i * .9; T(S, 'it' + i, 19.0, y, t, 'cz-mono irx-xs', 1, { w: 2.2 }); T(S, 'id' + i, 21.2, y, d, 'cz-mono irx-tiny', 1, { w: 2.0 }); hbar(S, 'ib' + i, 23.4, y + .05, v * 3.0, c, 1); T(S, 'iv' + i, 23.6 + Math.max(v * 3.0, .5), y, String(v), 'cz-mono irx-xs', 1, { w: 1.0 }); });
      F(S, 'tf', 19.0, 4.1, 'tf 1 → 1,   tf 10 → 2,   tf 100 → 3', 'w', 2, { w: 12.4 });
      lbl(S, 'tfl', 19.0, 5.0, ['20번 나와도 20배가 아니라 1 + log 20 = 2.3', 'appearing 20 times counts 1 + log 20 = 2.3, not 20'], 'w', 2, { w: 12.4 });
      [['', 'jaguar', 'speed', ['점수', 'score']]].concat(DOC.map(r => r.slice(0, 4))).forEach((r, i) => r.forEach((t, j) => T(S, 'dt' + i + '_' + j, 19.0 + [0, 1.6, 4.6, 7.6][j], 6.5 + i * .85, t, 'cz-mono irx-xs' + (i ? (j === 3 ? ' irx-g' : '') : ' irx-a'), 3, { w: [1.4, 2.8, 2.8, 2.6][j] })));
      lbl(S, 'ex', 19.0, 10.2, ['A: 1.48 × 2 + 1 × 1 = 3.95', 'A: 1.48 × 2 + 1 × 1 = 3.95'], 'm g', 3, { w: 12.4 });
      lbl(S, 'r0', 1, 7.0, ['많은 문서에 나오는 단어는 변별력이 낮아요', 'terms found in many documents discriminate poorly'], 'a', 1, { w: 16.0 });
      lbl(S, 'the', 1, 8.6, ['the가 20번 나와도 idf = 0이라 점수 영향 없음', 'the may appear 20 times, but idf = 0 means it adds nothing'], 'g', 4, { w: 16.0 });
      lbl(S, 'long', 1, 10.0, ['긴 문서는 단어가 많아 유리해요 → 길이 보정(코사인, BM25) 필요', 'long documents contain more terms and gain unfairly, so length normalization (cosine, BM25) is needed'], 'r', 4, { w: 16.0 });
    },
    notes: [['질의 단어가 많은 문서에 흔하게 나오면 변별력이 낮아요 · 역문서 빈도 idf = log(N/df)는 1,000개 문서 중 10개에만 나오는 jaguar에 2, 100개의 speed에 1, 모든 문서의 the에 0을 줘요', 'a term common across documents discriminates poorly: inverse document frequency idf = log(N/df) gives jaguar, in 10 of 1,000 documents, a weight of 2, speed (100) 1 and the (all 1,000) 0'], ['문서 안에서 많이 나올수록 관련성이 높지만 비례하진 않아요 · 단어 빈도는 1 + log tf로 완만하게 해서 20번이면 2.3이에요', 'more occurrences in a document suggest relevance, but not proportionally, so term frequency is damped to 1 + log tf, 2.3 for 20 occurrences'], ['점수는 질의 단어마다 tf 가중치 × idf를 더해요 · A는 jaguar 3번, speed 1번으로 3.95, B는 1번, 5번으로 3.70, C는 speed만 10번이라 2.00이에요', 'the score adds tf weight × idf over the query terms: A, with jaguar 3 times and speed once, scores 3.95, B (1 and 5) 3.70, and C (speed 10 times only) 2.00'], ['the가 20번 나와도 idf가 0이라 점수에 영향이 없어요 · 다만 긴 문서는 단어가 많아 유리해서, 길이를 보정하는 코사인 정규화나 BM25가 필요해요', 'even 20 occurrences of the add nothing because its idf is 0; long documents still gain from containing more terms, which calls for length normalization such as cosine or BM25']],
    fin: [['TF-IDF: 문서 안에서 자주(tf), 전체에서 드물게(idf) 나오는 단어가 중요', 'TF-IDF: terms frequent in the document (tf) and rare in the collection (idf) matter most', 'irx-xs irx-a'], ['로그는 빈도와 희귀성의 효과가 점점 줄어들게 해요', 'logarithms damp the effects of frequency and rarity'], ['변형이 많아 SMART 표기법으로 구분해요', 'its many variants are labeled with SMART notation']],
    caps: [['역문서 빈도', 'Inverse document frequency'], ['단어 빈도', 'Term frequency'], ['점수 계산', 'Computing scores'], ['한계', 'Limits'], ['TF-IDF', 'TF-IDF']]
  });
}

function sVSM() {
  const P = PF(20.0, .8, 10.0, 4.55, 0, 5.5, 0, 2.5), O = [P.X(0), P.Y(0)], V = { A: [2.954, 1.0], B: [2.0, 1.699], C: [0, 2.0], D: [4.954, 2.0] }, tip = v => [P.X(v[0]), P.Y(v[1])];
  return CW('ir-vsm', {
    code: ['def cos(q, d):', '    return q @ d / (norm(q) * norm(d))', ['# 길이로 나눠 방향(각도)만 비교', '# divide by lengths: compare directions'], ['cos(q, B)  # 0.997 (A 0.90, C 0.71)', 'cos(q, B)  # 0.997 (A 0.90, C 0.71)'], ['# 긴 문서 D(A×10): 내적 6.95, 코사인 0.92', '# long doc D (A×10): dot 6.95, cosine 0.92']],
    hl: [[0, 1, 'accent'], [1, 3, 'ok'], [4, 1, 'warn'], [4, 1, 'warn']],
    draw: (S) => {
      axes(S, 'ax', P, 1); T(S, 'xa', P.X(5.5) - 1.6, P.Y(0) + .15, 'jaguar', 'cz-mono irx-tiny', 1, { w: 1.6 }); T(S, 'ya', P.x0 + .15, P.y0 - .45, 'speed', 'cz-mono irx-tiny', 1, { w: 1.6 });
      SV(S, 'qv', [zW([O, tip([2.5, 2.5])], 'ink-2', .05, true)], 1); T(S, 'ql', P.X(2.5) + .1, P.Y(2.5) - .1, 'q', 'cz-mono irx-xs', 1, { w: .8 });
      SV(S, 'abc', ['A', 'B', 'C'].map(k => zA(O, tip(V[k]), k === 'B' ? 'ok' : 'accent', .07)), 1);
      [['A', .15, -.2], ['B', .1, -.55], ['C', .2, -.2]].forEach(([k, dx, dy]) => T(S, 'vl' + k, tip(V[k])[0] + dx, tip(V[k])[1] + dy, k, 'cz-mono irx-xs', 1, { w: .8 }));
      lbl(S, 'h1', 1, 7.0, ['문서와 질의를 단어 축 위의 TF-IDF 벡터로', 'documents and queries become TF-IDF vectors over term axes'], 'a', 1, { w: 16.0 });
      [['cos(q, B) = 0.997', 'g'], ['cos(q, A) = 0.90', ''], ['cos(q, C) = 0.71', '']].forEach(([t, c], i) => F(S, 'cs' + i, 19.0, 6.3 + i * .85, t, c, 2, { w: 6.0 }));
      lbl(S, 'rk', 25.4, 6.4, ['순위: B > A > C (단순 합과 달라요)', 'ranking: B > A > C, unlike the raw sum'], 'g', 2, { w: 6.0 });
      SV(S, 'dv', [zA(O, tip(V.D), 'warn', .07)], 3); T(S, 'dl', tip(V.D)[0] - .9, tip(V.D)[1] - .65, 'D', 'cz-mono irx-xs irx-w', 3, { w: .8 });
      lbl(S, 'dd', 19.0, 9.2, ['D = A를 10번 이어 붙인 문서: 내적 6.95(A의 1.8배), 코사인 0.92(A와 비슷)', 'D is A repeated ten times: dot product 6.95 (1.8× A), cosine 0.92 (close to A)'], 'w', 3, { w: 12.4 });
      lbl(S, 'sp', 1, 8.6, ['차원 = 어휘 수(수십만)라 대부분 0인 희소 벡터', 'dimensions = vocabulary size (hundreds of thousands), so vectors are sparse'], '', 4, { w: 16.0 });
      lbl(S, 'pv', 1, 10.0, ['코사인은 긴 문서를 지나치게 깎기도 해 피벗 정규화, BM25가 나왔어요', 'cosine can over-penalize long documents, which led to pivoted normalization and BM25'], 'r', 4, { w: 16.0 });
    },
    notes: [['벡터 공간 모델은 문서와 질의를 단어마다 축이 하나인 공간의 TF-IDF 벡터로 봐요 · 두 단어(jaguar, speed)만 보면 평면 위의 화살표예요', 'the vector space model treats documents and queries as TF-IDF vectors with one axis per term; with only jaguar and speed they are arrows in a plane'], ['코사인 유사도는 내적을 두 길이로 나눠 방향만 비교해요 · A는 0.90, B는 0.997, C는 0.71이라 단순 합과 달리 B가 1등이에요', 'cosine similarity divides the dot product by both lengths to compare directions only: A gets 0.90, B 0.997 and C 0.71, so B ranks first, unlike with the raw sum'], ['A를 10번 이어 붙인 긴 문서 D는 내적이 6.95로 A의 1.8배지만 코사인은 0.92로 비슷해요 · 길이 때문에 점수가 부풀지 않게 해 줘요', 'a long document D made of A repeated ten times has a dot product of 6.95, 1.8 times A’s, but a cosine of 0.92, close to A’s, so length no longer inflates the score'], ['실제 공간은 어휘 수만큼 차원이 많고 대부분 0인 희소 벡터예요 · 코사인이 긴 문서를 지나치게 불리하게 만들기도 해서 피벗 정규화와 BM25 같은 개선이 나왔어요', 'real spaces have as many dimensions as the vocabulary and the vectors are mostly zeros; cosine can over-penalize long documents, which motivated pivoted normalization and BM25']],
    fin: [['벡터 공간 모델: TF-IDF 벡터 + 코사인 유사도', 'the vector space model: TF-IDF vectors and cosine similarity', 'irx-xs irx-a'], ['길이 정규화로 긴 문서의 이점을 줄여요', 'length normalization curbs the advantage of long documents'], ['밀집 임베딩 검색도 같은 코사인 아이디어를 써요', 'dense embedding search relies on the same cosine idea']],
    caps: [['벡터로 보기', 'Documents as vectors'], ['코사인 유사도', 'Cosine similarity'], ['길이 정규화', 'Length normalization'], ['고차원 희소 벡터', 'High-dimensional sparse vectors'], ['벡터 공간 모델', 'The vector space model']]
  });
}

function sBM25() {
  const P = PF(20.6, .8, 10.2, 3.6, 0, 20, 0, 2.4), sat = r => tf => tf * 2.2 / (tf + 1.2 * (.25 + .75 * r));
  return CW('ir-bm25', {
    code: [['K = k1 * (1 - b + b * dl / avgdl)  # 길이 보정', 'K = k1 * (1 - b + b * dl / avgdl)  # length'], ['tf_part = tf * (k1 + 1) / (tf + K) # 포화', 'tf_part = tf * (k1 + 1) / (tf + K) # saturate'], 'idf = log(1 + (N - df + 0.5) / (df + 0.5))', 'score = sum(idf * tf_part for t in q)', ['# k1 = 1.2, b = 0.75 (흔한 기본값)', '# k1 = 1.2, b = 0.75 (common defaults)']],
    hl: [[1, 1, 'accent'], [0, 1, 'warn'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      axes(S, 'ax', P, 1); ticks(S, 'tk', P, [[1, '1'], [5, '5'], [10, '10'], [19.2, 'tf']], [[2.2, '2.2']], 1);
      hl(S, 'as', P.x0, P.x0 + P.w, P.Y(2.2), 'ink-3', 1, { w: .04, dash: 1 });
      curve(S, 'c1', P, sat(1), 1, { color: 'accent', n: 60 });
      [[1, 1.0], [5, 1.774], [10, 1.964]].forEach(([x, y], i) => pt(S, 'p' + i, P.X(x), P.Y(y), 1, C.cur, .13));
      lbl(S, 'sl', 1, 7.0, ['같은 단어가 더 나와도 점수는 k1 + 1 = 2.2에 수렴: 1번 1.0, 5번 1.77, 10번 1.96', 'more repeats push a term toward k1 + 1 = 2.2: 1.0 once, 1.77 at 5, 1.96 at 10'], 'a', 1, { w: 16.0 });
      curve(S, 'c0', P, sat(.5), 2, { color: 'ok', n: 60 }); curve(S, 'c2', P, sat(2), 2, { color: 'danger', n: 60 });
      lbl(S, 'lk', 19.0, 5.2, ['초록 짧은 문서(평균의 ½) · 파랑 평균 · 빨강 긴 문서(2배)', 'green short (½ average) · blue average · red long (2×)'], '', 2, { w: 12.4 });
      F(S, 'l3', 19.0, 6.6, ['tf = 3일 때: 1.76 / 1.57 / 1.29', 'at tf = 3: 1.76 / 1.57 / 1.29'], 'w', 2, { w: 12.4 });
      F(S, 'i1', 19.0, 7.7, 'idf(jaguar) = ln(1 + 990.5 / 10.5) = 4.56', 'a', 3, { w: 12.4 }); F(S, 'i2', 19.0, 8.6, 'idf(speed) = ln(1 + 900.5 / 100.5) = 2.30', 'a', 3, { w: 12.4 });
      F(S, 'sa', 19.0, 9.7, 'A = 4.56 × 1.57 + 2.30 × 1.00 = 9.46', 'g', 3, { w: 12.4 });
      lbl(S, 'kk1', 1, 8.6, ['k1: 포화 속도 (0이면 tf 무시, 크면 TF-IDF에 가까움)', 'k1 sets saturation (0 ignores tf; large approaches raw tf)'], '', 4, { w: 16.0 });
      lbl(S, 'bb', 1, 9.8, ['b: 길이 보정 강도 (0이면 없음, 1이면 완전 보정)', 'b sets the strength of length normalization (0 none, 1 full)'], '', 4, { w: 16.0 });
      lbl(S, 'bl', 1, 11.0, ['Lucene·Elasticsearch의 기본 순위 함수이자 신경 검색의 강력한 기준선', 'the default ranker of Lucene and Elasticsearch and a strong baseline for neural retrieval'], 'g', 4, { w: 16.0 });
    },
    notes: [['BM25는 TF-IDF를 확률 모형으로 다듬은 순위 함수예요 · 단어 빈도 효과를 tf(k1 + 1)/(tf + k1)로 포화시켜, 1번이면 1.0, 5번이면 1.77, 10번이면 1.96으로 2.2에 수렴해요', 'BM25 is a ranking function that refines TF-IDF using a probabilistic model; it saturates term frequency as tf(k1 + 1)/(tf + k1), giving 1.0 for one occurrence, 1.77 for five and 1.96 for ten, approaching 2.2'], ['문서 길이도 보정해요 · 평균의 절반 길이 문서에서 3번 나오면 1.76, 평균이면 1.57, 두 배 길이면 1.29로 긴 문서일수록 같은 빈도의 가치가 낮아요', 'it also normalizes for length: three occurrences are worth 1.76 in a half-average document, 1.57 in an average one and 1.29 in one twice as long'], ['점수는 질의 단어마다 idf × 빈도 항을 더해요 · 1,000개 문서 중 jaguar(df 10)의 idf는 4.56, speed(df 100)는 2.30이라 A는 4.56 × 1.57 + 2.30 × 1.00 = 9.46이에요', 'the score adds idf × the frequency term over query terms: among 1,000 documents, jaguar (df 10) has idf 4.56 and speed (df 100) 2.30, so A scores 4.56 × 1.57 + 2.30 × 1.00 = 9.46'], ['k1은 포화 속도를, b는 길이 보정 강도를 정해요(흔히 1.2와 0.75) · Lucene과 Elasticsearch의 기본 순위 함수이고, 신경 검색이 넘어야 할 강력한 기준선이에요', 'k1 controls saturation and b the strength of length normalization, commonly 1.2 and 0.75; BM25 is the default ranker in Lucene and Elasticsearch and a strong baseline neural retrieval must beat']],
    fin: [['BM25 = idf × 포화된 tf × 길이 보정', 'BM25 = idf × saturated tf with length normalization', 'irx-xs irx-a'], ['수십 년 된 공식이지만 여전히 1단계 검색의 표준이에요', 'decades old, it is still the standard first-stage ranker'], ['여러 필드로 확장한 것이 BM25F예요', 'BM25F extends it to multiple fields']],
    caps: [['빈도 포화', 'Term-frequency saturation'], ['길이 보정', 'Length normalization'], ['전체 점수', 'The full score'], ['매개변수', 'Parameters'], ['BM25', 'BM25']]
  });
}

function sLM() {
  const ML = [['A', .015, .005], ['B', .005, .025], ['C', 0, .05]], B0 = 3.6, SC = 50;
  return CW('ir-lm', {
    code: [['pc = cf[t] / n_tokens           # 컬렉션 확률', 'pc = cf[t] / n_tokens           # P(t | C)'], ['p = (tf + mu * pc) / (dl + mu)  # 평활화', 'p = (tf + mu * pc) / (dl + mu)  # smoothing'], 'score = sum(log(p) for t in q)  # log P(q|d)', ['# 평활화가 없으면 단어 하나 없어도 확률 0', '# unsmoothed, one missing term gives 0'], '# μ = 100: B −9.77 > A −10.21 > C −13.70'],
    hl: [[2, 1, 'accent'], [0, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    draw: (S) => {
      ML.forEach(([d, j, s], i) => { const x = 19.6 + i * 4.0; [[j, 'accent'], [s, 'warn']].forEach(([v, c], k) => { if (v) rect(S, 'm' + i + '_' + k, x + k * 1.2, B0 - v * SC, 1.0, v * SC, c, 60, 1, { r: .06 }); }); T(S, 'md' + i, x, B0 + .15, d, 'cz-mono cz-tc irx-xs', 1, { w: 2.2 }); });
      hl(S, 'mb', 19.4, 30.8, B0, 'ink-3', 1, { w: .04 });
      lbl(S, 'lg', 19.0, .2, ['문서별 단어 확률 (파랑 jaguar, 주황 speed)', 'per-document word probabilities (blue jaguar, orange speed)'], 'm', 1, { w: 12.4 });
      lbl(S, 'h1', 1, 7.0, ['각 문서가 질의 "jaguar speed"를 만들어 낼 확률로 순위', 'rank documents by how likely each is to generate the query “jaguar speed”'], 'a', 1, { w: 16.0 });
      F(S, 'sm', 19.0, 4.6, 'P(t|d) = (tf + μ·P(t|C)) / (dl + μ)', 'a', 2, { w: 12.4 });
      lbl(S, 'sml', 19.0, 5.6, ['컬렉션 전체 확률을 μ만큼 섞어요 (μ = 100, 문서 길이 200)', 'mix in the collection probability with weight μ (μ = 100, documents of length 200)'], '', 2, { w: 12.4 });
      rect(S, 'zz', 27.6, B0 - .25, 1.0, .25, 'danger', 80, 3, { r: .04 });
      lbl(S, 'zr', 19.0, 7.0, ['평활화 없이: C는 jaguar가 없어 확률 0 → 점수 −∞', 'without smoothing C has no jaguar: probability 0, score −∞'], 'r', 3, { w: 12.4 });
      [['B: ln 0.0034 + ln 0.017 = −9.77', 'g'], ['A: ln 0.0100 + ln 0.0037 = −10.21', ''], ['C: ln 0.000033 + ln 0.034 = −13.70', '']].forEach(([t, c], i) => F(S, 'sc' + i, 19.0, 8.5 + i * .9, t, c, 4, { w: 12.4 }));
      lbl(S, 'ci', 1, 8.6, ['평활화는 흔한 단어의 영향을 줄여 idf와 비슷한 효과를 내요', 'smoothing reduces the influence of common words, much like idf'], '', 4, { w: 16.0 });
      lbl(S, 'cb', 1, 10.0, ['성능은 BM25와 비슷하고, 확률 모형이라 확장하기 좋아요', 'it performs about as well as BM25 and extends naturally as a probabilistic model'], 'g', 4, { w: 16.0 });
    },
    notes: [['질의 우도 모델은 각 문서를 단어 확률 분포(언어 모델)로 보고, 그 문서가 질의를 만들어 낼 확률 P(q|d)로 순위를 매겨요 · A는 jaguar 3/200, speed 1/200이에요', 'the query likelihood model treats each document as a word distribution, a language model, and ranks by the probability P(q|d) that it generates the query; A gives jaguar 3/200 and speed 1/200'], ['문서에 없는 단어는 확률이 0이 되므로 컬렉션 전체 확률을 섞어요 · 디리클레 평활화는 (tf + μ·P(t|C)) / (dl + μ)이고 μ = 100을 써요', 'words missing from a document would get probability 0, so the collection probability is mixed in: Dirichlet smoothing uses (tf + μ·P(t|C)) / (dl + μ), here with μ = 100'], ['평활화가 없다면 jaguar가 없는 C는 확률 0, 점수 −∞가 돼요 · 질의 단어 하나만 빠져도 완전히 탈락하는 셈이에요', 'without smoothing, C, which lacks jaguar, would get probability 0 and a score of −∞, eliminated by one missing query term'], ['로그 확률을 더하면 B −9.77, A −10.21, C −13.70 순이에요 · 평활화는 흔한 단어의 영향을 줄여 idf와 비슷한 효과를 내고, 성능은 BM25와 비슷해요', 'summing log probabilities ranks B (−9.77) above A (−10.21) and C (−13.70); smoothing reduces the weight of common words much like idf, and performance is close to BM25']],
    fin: [['질의 우도: 평활화한 문서 언어 모델로 P(q|d) 계산', 'query likelihood computes P(q|d) with a smoothed document language model', 'irx-xs irx-a'], ['디리클레 평활화는 짧은 문서일수록 컬렉션 확률을 더 섞어요', 'Dirichlet smoothing mixes in more collection probability for short documents'], ['LLM의 다음 토큰 확률과 같은 "언어 모델" 개념이에요', 'it is the same “language model” idea as an LLM’s next-token probabilities']],
    caps: [['문서 언어 모델', 'Document language models'], ['평활화', 'Smoothing'], ['0의 문제', 'The zero problem'], ['점수', 'Scores'], ['질의 우도 모델', 'The query likelihood model']]
  });
}

function sRocchio() {
  const P = PF(20.4, .6, 8.4, 6.0, 0, 1.4, 0, 1.0), O = [P.X(0), P.Y(0)], at = v => [P.X(v[0]), P.Y(v[1])];
  return CW('ir-rocchio', {
    code: ['q2 = a * q + b * mean(rel) - c * mean(nonrel)', ['# α = 1, β = 0.75, γ = 0.15 (흔한 값)', '# α = 1, β = 0.75, γ = 0.15 (common values)'], ['# q (0.5, 0.5) → q′ (1.12, 0.48): 자동차 쪽', '# q (0.5, 0.5) → q′ (1.12, 0.48): toward cars'], ['# 가짜 피드백: 상위 k개를 적합하다고 가정', '# pseudo feedback: top k assumed relevant'], ['# 확장 단어: jaguar → + xf, sedan, v8', '# expansion: jaguar → + xf, sedan, v8']],
    hl: [[0, 1], [0, 3, 'accent'], [3, 1, 'warn'], [4, 1, 'ok']],
    draw: (S) => {
      axes(S, 'ax', P, 1); T(S, 'xa', P.X(1.4) - 1.6, P.Y(0) + .15, ['자동차', 'cars'], 'irx-tiny', 1, { w: 1.6 }); T(S, 'ya', P.x0 + .2, P.y0 - .3, ['동물', 'animals'], 'irx-tiny', 1, { w: 1.6 });
      [[.9, .2], [.8, .1]].forEach((v, i) => pt(S, 'r' + i, ...at(v), 1, C.okf, .17)); pt(S, 'n0', ...at([.1, .9]), 1, C.badf, .17);
      SV(S, 'qv', [zA(O, at([.5, .5]), 'accent', .08)], 1); T(S, 'ql', at([.5, .5])[0] - .2, at([.5, .5])[1] - .75, 'q', 'cz-mono irx-xs irx-a', 1, { w: .8 });
      lbl(S, 'h1', 1, 7.0, ['질의 "jaguar": 사용자가 자동차 문서 둘은 적합(초록), 동물 문서는 부적합(빨강)', 'query “jaguar”: the user marks two car documents relevant (green) and an animal one not (red)'], 'a', 1, { w: 16.0 });
      SV(S, 'q2', [zA(O, at([1.1225, .4775]), 'warn', .08)], 2); T(S, 'q2l', at([1.1225, .4775])[0] + .1, at([1.1225, .4775])[1] - .5, 'q′', 'cz-mono irx-xs irx-w', 2, { w: .8 });
      F(S, 'f1', 1, 8.5, 'q′ = q + 0.75·mean(rel) − 0.15·mean(non) = (1.12, 0.48)', 'w', 2, { w: 16.0 });
      lbl(S, 'pr', 19.0, 7.4, ['가짜(의사) 피드백: 사용자 없이 상위 k개를 적합으로 가정 → 재현율 ↑, 틀리면 질의 표류', 'pseudo relevance feedback assumes the top k are relevant without asking: better recall, but query drift when they are wrong'], 'w', 3, { w: 12.4 });
      lbl(S, 'ex', 1, 9.8, ['질의 확장', 'expansion'], '', 4, { w: 3.8 }); toks(S, 'et', 5.0, 9.7, ['jaguar', '+ xf', '+ sedan', '+ v8'], (t, i) => i ? 'ok' : 'accent', 4);
      lbl(S, 'imp', 1, 11.1, ['사용자는 표시를 잘 안 해서 웹 검색에선 드물고, 클릭 같은 암묵적 피드백을 대신 써요', 'users rarely mark results, so web search relies on implicit feedback such as clicks instead'], '', 4, { w: 16.0 });
    },
    notes: [['질의 "jaguar"는 자동차와 동물 사이에서 모호해요 · 사용자가 결과 중 자동차 문서 둘은 적합, 동물 문서 하나는 부적합이라고 표시해요', 'the query “jaguar” is ambiguous between cars and animals; the user marks two car documents as relevant and an animal document as not'], ['로키오 알고리즘은 질의 벡터를 적합 문서의 평균 쪽으로 당기고 부적합 문서 평균에서 밀어내요 · α = 1, β = 0.75, γ = 0.15면 (0.5, 0.5)가 (1.12, 0.48)로 자동차 쪽을 향해요', 'the Rocchio algorithm pulls the query vector toward the mean of the relevant documents and away from the non-relevant mean: with α = 1, β = 0.75 and γ = 0.15, (0.5, 0.5) becomes (1.12, 0.48), pointing toward cars'], ['사용자 표시 없이 상위 k개를 적합하다고 가정하는 가짜(의사) 적합성 피드백도 있어요 · 대부분 재현율을 높이지만 상위 결과가 틀리면 엉뚱한 쪽으로 흘러가요(질의 표류)', 'pseudo relevance feedback skips the user and assumes the top k results are relevant; it usually improves recall but drifts off topic when the top results are wrong'], ['결과적으로 질의에 xf, sedan, v8 같은 단어가 더해지는 질의 확장이 돼요 · 사용자가 표시를 잘 하지 않아 웹 검색에선 드물고, 클릭 같은 암묵적 피드백을 대신 써요', 'in effect the query is expanded with terms such as xf, sedan and v8; since users rarely mark results, web search uses implicit feedback such as clicks instead']],
    fin: [['로키오: q′ = αq + β·평균(적합) − γ·평균(부적합)', 'Rocchio: q′ = αq + β·mean(relevant) − γ·mean(non-relevant)', 'irx-xs irx-a'], ['가짜 피드백은 자동 질의 확장 방법이에요', 'pseudo relevance feedback is a form of automatic query expansion'], ['같은 생각이 밀집 검색의 질의 벡터 보정에도 쓰여요', 'the same idea adjusts query vectors in dense retrieval']],
    caps: [['모호한 질의', 'An ambiguous query'], ['질의 벡터 이동', 'Moving the query vector'], ['가짜 피드백', 'Pseudo relevance feedback'], ['질의 확장', 'Query expansion'], ['적합성 피드백(로키오)', 'Relevance feedback (Rocchio)']]
  });
}

function sFields() {
  const RS = [['X', ['제목 1 + 본문 2', 'title 1 + body 2'], '3 + 2 = 5', 1.774, 'ok'], ['Y', ['본문 5', 'body 5'], '5', 1.774, 'accent'], ['Z', ['제목 1', 'title 1'], '3', 1.571, 'warn']];
  return CW('ir-fields', {
    code: ['w = 3*t_title + t_body + 2*t_anchor', ['sat = w * 2.2 / (w + 1.2)  # 한 번만 포화', 'sat = w * 2.2 / (w + 1.2)  # saturate once'], ['# X: 제목 1 + 본문 2 → 3 + 2 = 5 → 1.77', '# X: title 1 + body 2 → 3 + 2 = 5 → 1.77'], ['# Z: 제목만 1 → 3 → 1.57', '# Z: title only 1 → 3 → 1.57'], ['# 앵커: 다른 페이지가 이 페이지를 부르는 말', '# anchor: what other pages call this page']],
    hl: [[4, 1], [0, 1, 'accent'], [1, 3, 'ok'], [1, 1, 'warn']],
    draw: (S) => {
      box2(S, 'ft', 19.0, .3, 7.6, .8, 'title: Jaguar XF review', 'accent', 1);
      rect(S, 'fb', 19.0, 1.3, 7.6, 1.9, 'ink-3', 12, 1, { r: .15 }); lbl(S, 'fbt', 19.3, 1.45, ['본문: 재규어 XF는 승차감이 좋고…', 'body: the Jaguar XF rides smoothly…'], '', 1, { w: 7.0 });
      ['“jaguar sedan”', '“XF review”'].forEach((t, i) => box2(S, 'fa' + i, 27.0, .3 + i * 1.0, 4.4, .8, t, 'ok', 1));
      lbl(S, 'fal', 27.0, 2.4, ['앵커 텍스트(다른 페이지의 링크 글)', 'anchor text (link text on other pages)'], 'g', 1, { w: 4.4 });
      [['title', '× 3', 'accent'], ['body', '× 1', 'ink'], ['anchor', '× 2', 'ok']].forEach(([f, w, c], i) => { T(S, 'wf' + i, 19.0, 4.5 + i * .9, f, 'cz-mono irx-xs', 2, { w: 2.4 }); chip(S, 'ww' + i, 21.6, 4.4 + i * .9, 1.6, w, c, 2, { h: .8 }); });
      lbl(S, 'wl', 23.8, 4.6, ['제목에 나오면 본문의 3배로 쳐요', 'a title match counts three body matches'], 'a', 2, { w: 7.4 });
      RS.forEach(([d, t, s, v, c], i) => { const y = 7.4 + i * .95; T(S, 'rd' + i, 19.0, y, d, 'cz-mono irx-xs', 3, { w: .8 }); T(S, 'rt' + i, 19.8, y, t, 'irx-xs', 3, { w: 4.2 }); T(S, 'rs' + i, 24.3, y, s, 'cz-mono irx-xs', 3, { w: 2.4 }); hbar(S, 'rb' + i, 26.9, y + .05, v * 1.8, c, 3); T(S, 'rv' + i, 27.1 + v * 1.8, y, v.toFixed(2), 'cz-mono irx-xs', 3, { w: 1.1 }); });
      lbl(S, 'h1', 1, 7.0, ['문서는 제목, 본문, 앵커 텍스트 같은 여러 필드로 이뤄져요', 'documents consist of fields such as title, body and anchor text'], 'a', 1, { w: 16.0 });
      lbl(S, 'why', 1, 8.6, ['필드마다 BM25를 따로 더하면 여러 필드에 조금씩 나온 문서가 과대평가 → 합친 뒤 한 번 포화(BM25F)', 'summing per-field BM25 over-rewards terms spread across fields, so BM25F combines first and saturates once'], 'w', 4, { w: 16.0 });
      lbl(S, 'tune', 1, 10.6, ['가중치는 평가 데이터로 조정하고, 앵커 텍스트는 웹 검색의 강한 신호예요', 'weights are tuned on evaluation data, and anchor text is a strong web-search signal'], 'g', 4, { w: 16.0 });
    },
    notes: [['문서는 제목, 본문, 그리고 다른 페이지가 이 페이지를 가리키며 쓴 앵커 텍스트 같은 여러 필드로 이뤄져요', 'a document consists of fields such as its title, its body and the anchor text other pages use when linking to it'], ['제목에 나온 단어가 본문보다 중요하므로 필드마다 가중치를 줘요 · 예로 제목 3, 본문 1, 앵커 2예요', 'a word in the title matters more than one in the body, so each field gets a weight, here title 3, body 1 and anchor 2'], ['BM25F는 가중치로 빈도를 먼저 합친 뒤 한 번만 포화시켜요 · 제목 1번과 본문 2번인 X는 5가 되어 1.77, 본문에만 5번인 Y도 1.77, 제목에만 1번인 Z는 1.57이에요', 'BM25F first combines the weighted frequencies and then saturates once: X, with one title and two body matches, totals 5 and scores 1.77, Y with five body matches also 1.77, and Z with one title match 1.57'], ['필드마다 BM25를 따로 계산해 더하면 여러 필드에 조금씩 나온 문서가 과대평가돼요 · 그래서 합친 뒤 포화시키고, 가중치는 평가 데이터로 조정해요 · 앵커 텍스트는 웹 검색의 특히 강한 신호예요', 'computing BM25 per field and summing over-rewards documents with a few matches in many fields, so frequencies are combined before saturation, weights are tuned on evaluation data, and anchor text is an especially strong web-search signal']],
    fin: [['BM25F: 필드 가중 빈도를 합쳐 한 번만 포화', 'BM25F combines field-weighted frequencies and saturates once', 'irx-xs irx-a'], ['제목·앵커처럼 짧고 요약적인 필드가 강한 신호예요', 'short, summary-like fields such as titles and anchors are strong signals'], ['Elasticsearch의 combined_fields 질의가 BM25F 방식이에요', 'Elasticsearch’s combined_fields query follows the BM25F approach']],
    caps: [['문서의 필드', 'Document fields'], ['필드 가중치', 'Field weights'], ['합친 뒤 포화', 'Combine, then saturate'], ['왜 합치나', 'Why combine first'], ['필드 가중치와 BM25F', 'Field weights and BM25F']]
  });
}
/* ===== IR · 3. evaluation ===== */
const REL = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1];
const rrow = (S, k, x, y, rel, st, o = {}) => rel.forEach((r, i) => chip(S, k + i, x + i * (o.dx || 1.2), y, o.w || 1.0, String(i + 1), r ? 'ok' : 'ink-3', st, { h: .8, off: o.off }));

function sPR() {
  const PK = [1, .5, .667, .75, .6, .5, .571, .5, .444, .5], RK = [.125, .125, .25, .375, .375, .375, .5, .5, .5, .625];
  const P = PF(3.0, 8.4, 13.0, 4.4, 0, 1, 0, 1), PTS = [[.125, 1], [.25, .667], [.375, .75], [.5, .571], [.625, .5]], INT = [[0, 1], [.125, 1], [.125, .75], [.375, .75], [.375, .571], [.5, .571], [.5, .5], [.625, .5]];
  return CW('ir-precision', {
    code: ['rel = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1]', ['P_at_k = sum(rel[:k]) / k        # 정밀도', 'P_at_k = sum(rel[:k]) / k        # precision'], ['R_at_k = sum(rel[:k]) / R_total  # 재현율', 'R_at_k = sum(rel[:k]) / R_total  # recall'], ['f1 = 2 * P * R / (P + R)         # 조화 평균', 'f1 = 2 * P * R / (P + R)         # harmonic'], '# P@10 = 0.5, R@10 = 5/8 = 0.625, F1 = 0.56'],
    hl: [[0, 1], [1, 1, 'accent'], [2, 1, 'warn'], [3, 2, 'ok']],
    draw: (S) => {
      lbl(S, 'h', 19.0, .1, ['상위 10개 결과 · 초록 = 관련 · 관련 문서는 모두 8개', 'top 10 · green = relevant · 8 relevant in all'], '', 1, { w: 12.4 });
      T(S, 'dn', 18.9, 1.35, 'k', 'cz-mono irx-tiny', 1, { w: 1.4 }); rrow(S, 'r', 20.4, 1.35, REL, 1, { dx: 1.06, w: .92 });
      T(S, 'pn', 18.9, 2.3, 'P@k', 'cz-mono irx-tiny irx-a', 2, { w: 1.4 }); PK.forEach((v, i) => T(S, 'pk' + i, 20.4 + i * 1.06, 2.3, v === 1 ? '1' : v.toFixed(2).replace(/^0/, ''), 'cz-mono cz-tc irx-tiny irx-a', 2, { w: .92 }));
      T(S, 'rn', 18.9, 3.1, 'R@k', 'cz-mono irx-tiny irx-w', 3, { w: 1.4 }); RK.forEach((v, i) => T(S, 'rk' + i, 20.4 + i * 1.06, 3.1, v.toFixed(2).replace(/^0/, ''), 'cz-mono cz-tc irx-tiny irx-w', 3, { w: .92 }));
      lbl(S, 'pl', 19.0, 4.6, ['정밀도: 상위 k개 중 관련 비율 → P@1 1.0, P@4 0.75, P@10 0.5', 'precision: the relevant share of the top k → P@1 1.0, P@4 0.75, P@10 0.5'], 'a', 2, { w: 12.4 });
      lbl(S, 'rl', 19.0, 6.0, ['재현율: 관련 문서 8개 중 찾은 비율 → 10개까지 5/8 = 0.625', 'recall: the share of the 8 relevant documents found → 5/8 = 0.625 by 10'], 'w', 3, { w: 12.4 });
      F(S, 'f1', 19.0, 7.6, 'F1@10 = 2 · 0.5 · 0.625 / 1.125 = 0.56', 'g', 4, { w: 12.4 });
      lbl(S, 'tr', 19.0, 8.7, ['하나를 올리면 다른 하나가 떨어지기 쉬워요: 웹 검색은 상위 정밀도, 법률·특허 검색은 재현율이 중요', 'raising one tends to lower the other: web search values top precision, legal and patent search recall'], '', 4, { w: 12.4 });
      lbl(S, 'pc', 1, 7.0, ['PR 곡선: 재현율(가로)에 따른 정밀도, 점선은 보간', 'the PR curve: precision versus recall, interpolation dashed'], 'a', 4, { w: 16.0 });
      axes(S, 'ax', P, 4); ticks(S, 'tk', P, [[.5, '0.5'], [1, '1']], [[.5, '0.5'], [1, '1']], 4);
      spoly(S, 'iv', INT.map(([x, y]) => [P.X(x), P.Y(y)]), { st: 4, color: 'warn', dash: 1, h: .05 });
      PTS.forEach(([x, y], i) => pt(S, 'pp' + i, P.X(x), P.Y(y), 4, C.okf, .14));
    },
    notes: [['검색 결과 상위 10개 중 관련 있는 문서(초록)가 5개 있고, 전체 컬렉션에는 관련 문서가 8개 있어요', 'five of the top 10 results are relevant (green), and the collection holds 8 relevant documents in all'], ['정밀도 P@k는 상위 k개 중 관련 문서의 비율이에요 · P@1은 1.0, P@4는 0.75, P@10은 0.5예요', 'precision P@k is the share of the top k that is relevant: P@1 is 1.0, P@4 0.75 and P@10 0.5'], ['재현율 R@k는 전체 관련 문서 중 찾아낸 비율이에요 · 10개까지 5/8 = 0.625라 3개는 놓쳤어요', 'recall R@k is the share of all relevant documents retrieved: 5/8 = 0.625 by rank 10, so three were missed'], ['둘은 서로 줄다리기라 F1 = 2PR/(P + R) = 0.56로 묶거나, 재현율에 따른 정밀도 곡선(PR 곡선)으로 봐요 · 웹 검색은 상위 정밀도가, 법률·특허 검색은 재현율이 더 중요해요', 'the two pull against each other, so they are combined as F1 = 2PR/(P + R) = 0.56 or drawn as a precision–recall curve; web search values top precision while legal and patent search value recall']],
    fin: [['정밀도 = 찾은 것 중 맞은 비율, 재현율 = 맞는 것 중 찾은 비율', 'precision is the relevant share of what was retrieved; recall is the retrieved share of what is relevant', 'irx-xs irx-a'], ['순위가 있는 결과는 컷오프 k를 정해 P@k, R@k로 봐요', 'ranked results are evaluated at a cutoff k'], ['관련성 판단(정답)은 사람이 만든 평가 데이터에서 와요', 'relevance judgments come from human-built test collections']],
    caps: [['순위 결과', 'Ranked results'], ['정밀도', 'Precision'], ['재현율', 'Recall'], ['F1과 PR 곡선', 'F1 and the PR curve'], ['정밀도와 재현율', 'Precision and recall']]
  });
}

function sMAP() {
  const HP = [[0, '1.0'], [2, '.67'], [3, '.75'], [6, '.57'], [9, '.50']], QA = [['q1', .436], ['q2', .80], ['q3', .25]];
  return CW('ir-map', {
    code: ['hits, s = 0, 0', 'for k, r in enumerate(rel, 1):', ['    if r: hits += 1; s += hits / k  # P@k 누적', '    if r: hits += 1; s += hits / k  # add P@k'], 'ap = s / R_total                    # 0.436', ['mAP = mean(aps)                     # 질의 평균', 'mAP = mean(aps)                     # queries']],
    hl: [[0, 3, 'accent'], [3, 1, 'ok'], [1, 2, 'warn'], [4, 1]],
    draw: (S) => {
      rrow(S, 'r', 19.0, .8, REL, 1); HP.forEach(([i, t], j) => T(S, 'hp' + j, 18.95 + i * 1.2, 1.75, t, 'cz-mono cz-tc irx-tiny irx-g', 1, { w: 1.1 }));
      lbl(S, 'hpl', 19.0, 2.4, ['관련 문서가 나온 위치마다의 P@k', 'P@k at each position holding a relevant document'], 'g', 1, { w: 12.4 });
      F(S, 'ap', 19.0, 3.8, 'AP = (1.00 + 0.67 + 0.75 + 0.57 + 0.50) / 8 = 0.436', 'g', 2, { w: 12.4 });
      lbl(S, 'apn', 19.0, 4.8, ['못 찾은 관련 문서 3개는 0으로 들어가요 (전체 8로 나눔)', 'the 3 relevant documents never retrieved count as 0 (divide by all 8)'], '', 2, { w: 12.4 });
      T(S, 'xn', 19.0, 6.15, 'X', 'cz-mono irx-xs', 3, { w: .6 }); rrow(S, 'x', 19.7, 6.1, [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 3, { dx: .85, w: .76 }); T(S, 'xa', 28.4, 6.15, 'AP 0.625', 'cz-mono irx-xs irx-g', 3, { w: 3.0 });
      T(S, 'yn', 19.0, 7.15, 'Y', 'cz-mono irx-xs', 3, { w: .6 }); rrow(S, 'y', 19.7, 7.1, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], 3, { dx: .85, w: .76 }); T(S, 'ya', 28.4, 7.15, 'AP 0.222', 'cz-mono irx-xs irx-r', 3, { w: 3.0 });
      lbl(S, 'xy', 19.0, 8.3, ['둘 다 P@10 = 0.5지만 정답을 위에 둔 X가 훨씬 높아요: AP는 순서를 반영해요', 'both have P@10 = 0.5, but X, with its hits on top, scores far higher: AP reflects order'], 'w', 3, { w: 12.4 });
      lbl(S, 'mh', 1, 7.0, ['질의 여러 개의 AP 평균 = MAP', 'MAP = the mean AP over many queries'], 'a', 4, { w: 16.0 });
      QA.forEach(([q, v], i) => { const y = 8.0 + i * .95; T(S, 'qn' + i, 1.0, y, q, 'cz-mono irx-xs', 4, { w: 1.2 }); T(S, 'qv' + i, 2.2, y, v.toFixed(3), 'cz-mono irx-xs', 4, { w: 1.6 }); hbar(S, 'qb' + i, 4.0, y + .05, v * 12.0, 'accent', 4); });
      vl(S, 'mm', 4.0 + .495 * 12.0, 7.85, 10.8, 'ok', 4, { w: .06, dash: 1 });
      F(S, 'mv', 1, 11.3, 'MAP = (0.436 + 0.80 + 0.25) / 3 = 0.495', 'g', 4, { w: 16.0 });
    },
    notes: [['평균 정밀도(AP)는 관련 문서가 나온 위치마다의 정밀도를 모아요 · 1, 3, 4, 7, 10위에서 1.00, 0.67, 0.75, 0.57, 0.50이에요', 'average precision (AP) collects the precision at every position holding a relevant document: 1.00, 0.67, 0.75, 0.57 and 0.50 at ranks 1, 3, 4, 7 and 10'], ['이를 더해 전체 관련 문서 수 8로 나누면 AP = 0.436이에요 · 끝내 못 찾은 3개는 0으로 들어가요', 'summing these and dividing by all 8 relevant documents gives AP = 0.436, with the 3 never retrieved counting as 0'], ['X와 Y는 모두 P@10이 0.5지만, 정답 5개가 1~5위인 X는 AP 0.625, 6~10위인 Y는 0.222예요 · AP는 순서와 재현율을 한 숫자에 담아요', 'X and Y both have P@10 = 0.5, but X, with its five hits at ranks 1–5, has AP 0.625 while Y, with them at 6–10, has 0.222: AP captures order and recall in one number'], ['여러 질의의 AP를 평균하면 MAP예요 · 0.436, 0.80, 0.25면 0.495로, 연구용 평가에서 오래 표준으로 쓰였어요', 'averaging AP over queries gives MAP: 0.436, 0.80 and 0.25 average 0.495, long the standard metric in research evaluations']],
    fin: [['AP: 관련 문서 위치마다의 정밀도 평균, MAP: 질의들의 AP 평균', 'AP averages precision at each relevant position; MAP averages AP over queries', 'irx-xs irx-a'], ['순서와 재현율을 함께 반영하는 단일 지표예요', 'a single number reflecting both order and recall'], ['관련/비관련 두 단계만 다뤄서, 등급이 있으면 nDCG를 써요', 'it handles binary relevance only; graded judgments call for nDCG']],
    caps: [['맞힌 위치의 정밀도', 'Precision at each hit'], ['평균 정밀도', 'Average precision'], ['순서의 차이', 'Order matters'], ['MAP', 'MAP'], ['평균 정밀도와 MAP', 'Average precision and MAP']]
  });
}

function sNDCG() {
  const G = [3, 2, 3, 0, 1, 2], ID = [3, 3, 2, 2, 1, 0], GN = g => Math.pow(2, g) - 1, DS = [1, 1.585, 2, 2.322, 2.585, 2.807], X = i => 21.6 + i * 1.6, GC = g => ['ink-3', 'accent', 'warn', 'ok'][g];
  return CW('ir-ndcg', {
    code: ['gain = 2**rel - 1                 # 3 → 7', 'disc = np.log2(np.arange(k) + 2)  # 1, 1.58…', 'dcg = np.sum(gain / disc)         # 13.85', 'ndcg = dcg / ideal_dcg            # 0.95', ['# 이상적 순서 [3, 3, 2, 2, 1, 0]의 DCG = 14.60', '# ideal order [3, 3, 2, 2, 1, 0] gives 14.60']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 1, 'ok'], [3, 2]],
    draw: (S) => {
      T(S, 'lr', 18.9, 1.05, ['등급', 'grade'], 'irx-xs', 1, { w: 2.6 }); G.forEach((g, i) => chip(S, 'g' + i, X(i), 1.0, 1.4, String(g), GC(g), 1, { h: .8 }));
      T(S, 'lg', 18.9, 2.05, ['이득', 'gain'], 'irx-xs irx-a', 1, { w: 2.6 }); G.forEach((g, i) => T(S, 'gn' + i, X(i), 2.05, String(GN(g)), 'cz-mono cz-tc irx-xs irx-a', 1, { w: 1.4 }));
      T(S, 'ld', 18.9, 2.85, ['할인', 'discount'], 'irx-xs irx-w', 2, { w: 2.6 }); DS.forEach((d, i) => T(S, 'ds' + i, X(i), 2.85, d.toFixed(2), 'cz-mono cz-tc irx-xs irx-w', 2, { w: 1.4 }));
      G.forEach((g, i) => { const v = GN(g) / DS[i]; if (v) rect(S, 'cb' + i, X(i) + .2, 6.4 - v * .32, 1.0, v * .32, 'ok', 55, 3, { r: .06 }); T(S, 'cv' + i, X(i), 6.5, v.toFixed(2), 'cz-mono cz-tc irx-tiny irx-g', 3, { w: 1.4 }); });
      F(S, 'dcg', 19.0, 7.3, 'DCG = 7 + 1.89 + 3.5 + 0 + 0.39 + 1.07 = 13.85', 'g', 3, { w: 12.4 });
      T(S, 'li', 18.9, 8.65, ['이상적', 'ideal'], 'irx-xs', 4, { w: 2.6 }); ID.forEach((g, i) => chip(S, 'ig' + i, X(i), 8.6, 1.4, String(g), GC(g), 4, { h: .8 }));
      F(S, 'nd', 19.0, 9.8, 'IDCG = 14.60 → nDCG = 13.85 / 14.60 = 0.95', 'a', 4, { w: 12.4 });
      lbl(S, 'l1', 1, 7.0, ['관련성 0~3 등급: 아주 관련 있을수록 이득이 지수적으로 커요 (2^등급 − 1)', 'graded relevance 0–3: gains grow exponentially with the grade (2^grade − 1)'], 'a', 1, { w: 16.0 });
      lbl(S, 'l2', 1, 8.6, ['아래로 갈수록 log₂(위치 + 1)로 나눠 할인', 'lower positions are discounted by log₂(position + 1)'], 'w', 2, { w: 16.0 });
      lbl(S, 'l4', 1, 10.0, ['0~1로 정규화돼 질의끼리 평균 낼 수 있어요 · 웹 검색과 추천의 대표 지표', 'normalized to 0–1 so it averages across queries; the standard metric for web search and recommendation'], 'g', 4, { w: 16.0 });
    },
    notes: [['관련성이 0~3 등급으로 매겨져 있어요 · nDCG는 등급이 높을수록 이득을 2^등급 − 1로 크게 줘서 3등급은 7, 2등급은 3이에요', 'relevance is graded from 0 to 3, and nDCG turns higher grades into much larger gains, 2^grade − 1: 7 for grade 3 and 3 for grade 2'], ['사용자는 위쪽 결과를 더 많이 보니 아래 위치일수록 log₂(위치 + 1)로 나눠 할인해요 · 1위는 1, 2위는 1.58, 3위는 2예요', 'users look at top results more, so each position divides its gain by log₂(position + 1): 1 at rank 1, 1.58 at rank 2 and 2 at rank 3'], ['할인된 이득을 더하면 DCG = 13.85예요', 'summing the discounted gains gives DCG = 13.85'], ['같은 문서들을 이상적인 순서 [3, 3, 2, 2, 1, 0]으로 놓으면 14.60이라, nDCG = 13.85 / 14.60 = 0.95예요 · 0~1로 정규화돼 질의끼리 평균을 낼 수 있어요', 'the same documents in the ideal order [3, 3, 2, 2, 1, 0] give 14.60, so nDCG = 13.85 / 14.60 = 0.95, normalized to 0–1 so it can be averaged across queries']],
    fin: [['nDCG: 등급별 이득을 위치로 할인해 더하고 이상적 순서로 나눈 값', 'nDCG sums position-discounted graded gains and divides by the ideal ordering', 'irx-xs irx-a'], ['보통 상위 몇 개(nDCG@10)만 계산해요', 'it is usually computed for the top few, as nDCG@10'], ['이득으로 등급을 그대로 쓰는 변형도 있어요', 'some variants use the grade itself as the gain']],
    caps: [['등급과 이득', 'Grades and gains'], ['위치 할인', 'Position discount'], ['DCG', 'DCG'], ['정규화', 'Normalization'], ['nDCG', 'nDCG']]
  });
}

function sMRR() {
  const Q = [['q1', [1, 0, 0, 1, 0], '1/1 = 1.00', 1], ['q2', [0, 0, 1, 0, 1], '1/3 = 0.33', 1], ['q3', [0, 1, 0, 0, 0], '1/2 = 0.50', 1], ['q4', [0, 0, 0, 0, 0], ['없음 → 0', 'none → 0'], 2]];
  return CW('ir-mrr', {
    code: ['def rr(rel):', '    for k, r in enumerate(rel, 1):', '        if r: return 1 / k     # 1 / rank', ['    return 0                   # 정답 없음', '    return 0                   # no hit'], 'mrr = mean(rr(q) for q in runs)  # 0.458'],
    hl: [[0, 3, 'accent'], [3, 1, 'danger'], [4, 1, 'ok'], [4, 1, 'ok']],
    draw: (S) => {
      Q.forEach(([q, rel, t, st], i) => { const y = 1.15 + i * 1.05; T(S, 'qn' + i, 19.0, y + .05, q, 'cz-mono irx-xs', st, { w: 1.6 }); let first = true; rel.forEach((r, j) => { const hit = r && first; if (hit) first = false; chip(S, 'q' + i + '_' + j, 20.8 + j * 1.15, y, 1.0, String(j + 1), hit ? 'ok' : r ? 'accent' : 'ink-3', st, { h: .8 }); }); lbl(S, 'qv' + i, 26.8, y + .05, t, 'm' + (i === 3 ? ' r' : ' g'), st, { w: 4.4 }); });
      lbl(S, 'h', 19.0, .1, ['초록 = 첫 정답, 파랑 = 이후 정답(무시)', 'green = first hit, blue = later (ignored)'], '', 1, { w: 12.4 });
      F(S, 'mr', 19.0, 5.5, 'MRR = (1 + 0.33 + 0.5 + 0) / 4 = 0.458', 'g', 3, { w: 12.4 });
      lbl(S, 'use', 19.0, 6.7, ['정답 하나만 찾으면 되는 검색(이름으로 찾기, 질의응답)에 맞아요', 'fits searches that need just one right answer (known-item search, question answering)'], 'a', 4, { w: 12.4 });
      lbl(S, 'h1', 1, 7.0, ['첫 정답이 몇 위에 나오는지가 중요한 검색', 'when the rank of the first correct answer is what matters'], 'a', 1, { w: 16.0 });
      lbl(S, 'hk', 1, 8.6, ['Hit@k: 상위 k에 정답이 하나라도 있는 비율 (여기선 3/4 = 0.75)', 'Hit@k: the share of queries with any hit in the top k (here 3/4 = 0.75)'], '', 4, { w: 16.0 });
      lbl(S, 'rag', 1, 10.0, ['RAG의 검색 단계는 Recall@k로: LLM이 볼 상위 k에 근거가 들어 있는가', 'a RAG retriever is judged by Recall@k: does the evidence reach the top k the LLM sees'], 'g', 4, { w: 16.0 });
    },
    notes: [['사용자가 정답 하나만 찾으면 되는 검색에서는 첫 정답이 몇 위에 나오는지가 중요해요 · q1은 1위, q2는 3위, q3는 2위에 첫 정답이 있어요', 'when a user needs just one right answer, what matters is the rank of the first correct result: rank 1 for q1, 3 for q2 and 2 for q3'], ['역순위는 1/순위라 1.00, 0.33, 0.50이에요 · q4처럼 상위 5개 안에 정답이 없으면 0이에요', 'the reciprocal ranks are 1.00, 0.33 and 0.50, and a query like q4 with no hit in the top 5 scores 0'], ['이를 평균한 MRR은 (1 + 0.33 + 0.5 + 0)/4 = 0.458이에요', 'their mean, the MRR, is (1 + 0.33 + 0.5 + 0)/4 = 0.458'], ['상위 k 안에 정답이 하나라도 있는지만 보는 Hit@k(여기선 0.75)도 자주 써요 · 이름으로 찾기, 질의응답, RAG의 검색 단계 평가에 잘 맞아요', 'Hit@k, whether any hit appears in the top k (0.75 here), is also common; these metrics suit known-item search, question answering and evaluating the retrieval step of RAG']],
    fin: [['MRR: 첫 정답의 역순위 평균', 'MRR is the mean reciprocal rank of the first correct answer', 'irx-xs irx-a'], ['첫 정답 이후의 결과는 보지 않아요', 'it ignores everything after the first hit'], ['정답이 여러 개면 MAP나 nDCG가 더 맞아요', 'with many relevant answers, MAP or nDCG fit better']],
    caps: [['첫 정답', 'The first hit'], ['역순위', 'Reciprocal rank'], ['평균', 'The mean'], ['Hit@k와 쓰임', 'Hit@k and uses'], ['평균 역순위(MRR)', 'Mean reciprocal rank (MRR)']]
  });
}

function sOnline() {
  const PB = [.30, .15, .10, .07, .05];
  return CW('ir-online', {
    code: [['# A/B: 사용자를 반씩 나눠 클릭률 비교', '# A/B: split users, compare click-through'], ['mix = team_draft(a, b)     # 번갈아 섞기', 'mix = team_draft(a, b)     # alternate picks'], ['win = credit(clicks, mix)  # 클릭한 쪽이 승', 'win = credit(clicks, mix)  # clicks decide'], ['# 인터리빙은 같은 사용자 안에서 비교해 훨씬 민감', '# interleaving compares within one user'], ['# 위치 편향: 위에 있으면 덜 관련돼도 더 클릭', '# position bias: higher gets more clicks']],
    hl: [[0, 1, 'accent'], [1, 1, 'warn'], [2, 2, 'ok'], [4, 1, 'danger']],
    draw: (S) => {
      F(S, 'ab', 19.0, .4, 'CTR  A 31.0%  vs  B 32.0%', 'a', 1, { w: 12.4 });
      lbl(S, 'abl', 19.0, 1.4, ['차이가 작으면 결론까지 아주 많은 질의가 필요해요', 'small differences need a great many queries to reach a conclusion'], '', 1, { w: 12.4 });
      T(S, 'na', 19.0, 3.05, 'A', 'cz-mono irx-xs irx-a', 2, { w: .8 }); toks(S, 'ra', 20.0, 3.0, ['a1', 'a2', 'a3'], 'accent', 2);
      T(S, 'nb', 19.0, 4.05, 'B', 'cz-mono irx-xs irx-w', 2, { w: .8 }); toks(S, 'rb', 20.0, 4.0, ['b1', 'a1', 'b2'], 'warn', 2);
      lbl(S, 'mx', 24.4, 3.0, ['팀 드래프트: A와 B가 번갈아 자기 결과를 뽑아 한 목록으로', 'team draft: A and B take turns picking their results into one list'], 'w', 2, { w: 7.0 });
      T(S, 'nm', 19.0, 5.45, ['합친 목록', 'merged'], 'irx-xs', 2, { w: 2.4 }); toks(S, 'rm', 21.6, 5.4, ['a1', 'b1', 'a2', 'b2'], (t, i) => i % 2 ? 'warn' : 'accent', 2);
      [1, 3].forEach((i, j) => T(S, 'ck' + j, 21.6 + i * 1.32, 6.4, ['클릭', 'click'], 'cz-tc irx-tiny irx-g', 3, { w: 1.2 }));
      F(S, 'wn', 19.0, 7.1, ['B 2 : 0 A → B 승', 'B 2 : 0 A → B wins'], 'g', 3, { w: 12.4 });
      lbl(S, 'sens', 19.0, 8.1, ['같은 사용자 안에서 비교해 A/B보다 훨씬 적은 질의로 차이를 찾아요', 'comparing within one user finds differences with far fewer queries than A/B'], 'g', 3, { w: 12.4 });
      lbl(S, 'pb', 1, 7.0, ['위치별 클릭률 (예시): 관련성이 같아도 위일수록 더 클릭', 'click-through by position (illustrative): higher results get more clicks at equal relevance'], 'r', 4, { w: 16.0 });
      PB.forEach((v, i) => { const x = 2.0 + i * 2.8; rect(S, 'pbb' + i, x, 12.6 - v * 10.0, 1.6, v * 10.0, 'danger', 50, 4, { r: .06 }); T(S, 'pbv' + i, x - .2, 12.6 - v * 10.0 - .55, Math.round(v * 100) + '%', 'cz-mono cz-tc irx-tiny', 4, { w: 2.0 }); T(S, 'pbn' + i, x - .2, 12.75, [(i + 1) + '위', 'rank ' + (i + 1)], 'cz-tc irx-tiny', 4, { w: 2.0 }); });
      lbl(S, 'cm', 19.0, 9.7, ['클릭률을 그대로 관련성으로 쓰면 안 돼요 → 클릭 모델로 위치 편향을 보정', 'raw click-through is not relevance; click models correct for position bias'], 'r', 4, { w: 12.4 });
    },
    notes: [['실제 사용자로 평가하는 A/B 테스트는 사용자를 둘로 나눠 클릭률 같은 지표를 비교해요 · 차이가 작으면 유의한 결론까지 많은 트래픽이 필요해요', 'an A/B test evaluates with real users by splitting them in two and comparing metrics such as click-through; small differences need a great deal of traffic before they are significant'], ['인터리빙은 두 순위를 한 결과 목록에 번갈아 섞어 같은 사용자에게 보여줘요 · 팀 드래프트 방식으로 A와 B가 차례로 자기 결과를 뽑아요', 'interleaving merges both rankings into one list shown to the same user; in team draft, A and B take turns picking their next result'], ['사용자가 클릭한 결과가 어느 팀 것인지 세어 승자를 정해요 · b1, b2를 클릭했다면 B가 2 대 0으로 이겨요 · 같은 사용자 안에서 비교해 A/B보다 훨씬 적은 질의로 차이를 찾아요', 'clicks are credited to the team that contributed each result, so clicks on b1 and b2 make B the winner 2 to 0; comparing within one user detects differences with far fewer queries than A/B testing'], ['클릭은 위치 편향이 있어요 · 위에 있는 결과는 덜 관련 있어도 더 클릭되니 클릭률을 그대로 관련성으로 쓰면 안 되고, 클릭 모델로 보정해요', 'clicks suffer from position bias: higher results get more clicks even when less relevant, so raw click-through is not relevance and must be corrected with click models']],
    fin: [['온라인 평가: A/B 테스트, 인터리빙, 그리고 클릭 편향 보정', 'online evaluation: A/B tests, interleaving and correcting click bias', 'irx-xs irx-a'], ['오프라인 지표(nDCG)와 온라인 지표가 어긋나기도 해요', 'offline metrics such as nDCG and online metrics can disagree'], ['체류 시간, 재검색, 이탈 같은 신호도 함께 봐요', 'dwell time, query reformulation and abandonment are watched too']],
    caps: [['A/B 테스트', 'A/B tests'], ['인터리빙', 'Interleaving'], ['승자 정하기', 'Picking a winner'], ['위치 편향', 'Position bias'], ['온라인 평가', 'Online evaluation']]
  });
}
/* ===== IR · 4. web search ===== */
const cEdge = (a, b, hw, hh, g = .12) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.min(dx ? (hw + g) / Math.abs(dx) : 9, dy ? (hh + g) / Math.abs(dy) : 9); return [[a[0] + dx * t, a[1] + dy * t], [b[0] - dx * t, b[1] - dy * t]]; };
const cOff = ([a, b], d) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), ox = -dy / n * d, oy = dx / n * d; return [[a[0] + ox, a[1] + oy], [b[0] + ox, b[1] + oy]]; };

function sCrawl() {
  const NP = { A: [19.4, 2.4], B: [23.4, .8], C: [23.4, 4.0], D: [27.0, 2.4], E: [29.6, 2.4] }, ctr = n => [NP[n][0] + .8, NP[n][1] + .5];
  const ED = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['C', 'B'], ['D', 'E']];
  const TR = [[['A 꺼냄 → 새 링크 B, C → 프런티어 [B, C]', 'pop A → new links B, C → frontier [B, C]'], 'a', 2], [['B 꺼냄 → 새 링크 D → [C, D]', 'pop B → new link D → [C, D]'], 'a', 3], [['C 꺼냄 → D, B는 이미 봄 → [D]', 'pop C → D, B already seen → [D]'], 'w', 3], [['D 꺼냄 → 새 링크 E → [E]', 'pop D → new link E → [E]'], 'a', 3]];
  return CW('ir-crawl', {
    code: ['frontier, seen = deque([seed]), {seed}', 'while frontier:', ['    url = frontier.popleft()        # BFS 순서', '    url = frontier.popleft()        # BFS'], ['    if not robots_ok(url): continue # 규칙 확인', '    if not robots_ok(url): continue # rules'], ['    new = links(fetch(url)) - seen  # 새 링크만', '    new = links(fetch(url)) - seen  # new only'], '    seen |= new; frontier += new'],
    hl: [[0, 1, 'accent'], [1, 2, 'accent'], [4, 2, 'warn'], [3, 1, 'danger']],
    draw: (S) => {
      Object.entries(NP).forEach(([n, [x, y]]) => chip(S, 'n' + n, x, y, 1.6, n, n === 'A' ? 'accent' : 'ink-3', 1, { h: 1.0 }));
      T(S, 'sd', 19.4, 1.7, 'seed', 'cz-mono cz-tc irx-tiny irx-a', 1, { w: 1.6 });
      ED.forEach(([a, b], i) => { const [p, q] = cEdge(ctr(a), ctr(b), .8, .5); arw(S, 'e' + i, p, q, 1); });
      lbl(S, 'f0', 19.0, 5.6, ['프런티어 [A] · 본 집합 {A}', 'frontier [A] · seen {A}'], 'a', 1, { w: 12.4 });
      TR.forEach(([t, c, st], i) => lbl(S, 'tr' + i, 1, 8.2 + i * 1.0, t, 'm ' + c, st, { w: 16.0 }));
      lbl(S, 'sn', 19.0, 6.6, ['본 집합 {A, B, C, D, E}: 같은 URL은 한 번만 가져와요', 'seen {A, B, C, D, E}: each URL is fetched once'], 'w', 3, { w: 12.4 });
      T(S, 'rt0', 19.0, 7.9, 'robots.txt', 'cz-mono irx-xs irx-r', 4, { w: 4.0 });
      rect(S, 'rtb', 19.0, 8.5, 5.8, 2.3, 'ink-3', 12, 4, { r: .15 });
      ['User-agent: *', 'Disallow: /private/', 'Crawl-delay: 2'].forEach((t, i) => T(S, 'rt' + (i + 1), 19.25, 8.65 + i * .7, t, 'cz-mono irx-tiny', 4, { w: 5.4 }));
      T(S, 'hq', 25.6, 7.9, ['호스트별 큐', 'per-host queues'], 'irx-xs irx-w', 4, { w: 5.6 });
      T(S, 'h1n', 25.6, 8.65, 'ex.com', 'cz-mono irx-tiny', 4, { w: 2.4 }); toks(S, 'h1q', 28.0, 8.5, ['/a', '/b'], 'warn', 4);
      T(S, 'h2n', 25.6, 9.75, 'news.org', 'cz-mono irx-tiny', 4, { w: 2.4 }); toks(S, 'h2q', 28.0, 9.6, ['/x'], 'warn', 4);
      lbl(S, 'pol', 19.0, 11.2, ['막힌 경로는 건너뛰고, 같은 호스트에는 간격을 두고 요청해요', 'skip disallowed paths and space out requests to each host'], 'w', 4, { w: 12.4 });
      lbl(S, 'nz', 1, 12.4, ['URL 정규화: HTTP://Ex.com/a/../b?utm_source=x → http://ex.com/b', 'URL normalization: HTTP://Ex.com/a/../b?utm_source=x → http://ex.com/b'], 'g', 4, { w: 16.0 });
    },
    notes: [['크롤러는 시드 URL에서 시작해 페이지를 가져오고, 그 안의 링크를 따라 웹을 넓혀가요 · 가져올 URL을 담는 큐가 프런티어예요', 'a crawler starts from seed URLs, fetches pages and follows their links outward; the queue of URLs waiting to be fetched is the frontier'], ['A를 꺼내 가져오면 B와 C 링크가 나와요 · 처음 보는 URL만 본 집합에 넣고 프런티어 뒤에 붙여서 너비 우선으로 퍼져요', 'fetching A yields links to B and C; only unseen URLs go into the seen set and onto the back of the frontier, so the crawl spreads breadth first'], ['B에서 D를 찾고, C의 링크 D와 B는 이미 본 URL이라 건너뛰어요 · 링크가 순환해도 같은 페이지를 한 번만 가져와요', 'B yields D, and C’s links to D and B are already seen and skipped, so each page is fetched once even when links form cycles'], ['예의도 필요해요 · robots.txt가 막은 경로는 가져오지 않고, 호스트별 큐로 같은 서버에 간격을 두고 요청해요 · URL 정규화로 같은 페이지의 다른 주소를 합쳐요', 'crawlers must be polite: they skip paths robots.txt disallows and use per-host queues to space out requests, while URL normalization merges different addresses of the same page']],
    fin: [['크롤러: 프런티어 큐 + 본 집합 + 예의 규칙', 'a crawler is a frontier queue, a seen set and politeness rules', 'irx-xs irx-a'], ['자주 바뀌는 페이지일수록 더 자주 다시 가져와요', 'pages that change often are revisited more often'], ['실제로는 수천 대가 호스트별로 나눠 병렬로 크롤링해요', 'real crawlers split hosts across thousands of machines']],
    caps: [['링크 그래프', 'The link graph'], ['너비 우선 탐색', 'Breadth-first crawl'], ['중복 URL 건너뛰기', 'Skipping seen URLs'], ['예의와 정규화', 'Politeness and normalization'], ['웹 크롤링', 'Web crawling']]
  });
}

function sDedup() {
  const SA = ['the quick', 'quick brown', 'brown fox', 'fox jumps'], SB = ['the quick', 'quick brown', 'brown fox', 'fox leaps'];
  const GA = [3, 12, 7, 1, 9, 4], GB = [3, 5, 7, 1, 2, 4], BA = '10110000', BB = '00110010';
  return CW('ir-dedup', {
    code: [['sh = set(zip(w, w[1:]))           # 2-그램', 'sh = set(zip(w, w[1:]))           # 2-grams'], 'jac = len(A & B) / len(A | B)     # 0.6', 'sig = [min(map(h, A)) for h in H] # MinHash', 'est = mean(a == b for a, b in zip(sa, sb))', 'near = popcount(fa ^ fb) <= 3     # SimHash'],
    hl: [[0, 1, 'accent'], [1, 1, 'ok'], [2, 2, 'warn'], [4, 1, 'danger']],
    draw: (S) => {
      lbl(S, 'tx', 19.0, .1, 'A = the quick brown fox jumps · B = … fox leaps', '', 1, { w: 12.4 });
      SA.forEach((t, i) => chip(S, 'sa' + i, 19.0, 1.0 + i * 1.0, 5.6, t, i < 3 ? 'ok' : 'accent', 1, { h: .8 }));
      SB.forEach((t, i) => chip(S, 'sb' + i, 25.6, 1.0 + i * 1.0, 5.6, t, i < 3 ? 'ok' : 'warn', 1, { h: .8 }));
      F(S, 'jc', 19.0, 5.15, 'J(A, B) = |A ∩ B| / |A ∪ B| = 3 / 5 = 0.6', 'g', 2, { w: 12.4 });
      [['sig(A)', GA, 6.3], ['sig(B)', GB, 7.3]].forEach(([n, g, y], r) => { T(S, 'gn' + r, 19.0, y + .1, n, 'cz-mono irx-tiny', 3, { w: 2.1 }); g.forEach((v, i) => chip(S, 'g' + r + '_' + i, 21.2 + i * 1.05, y, .9, String(v), GA[i] === GB[i] ? 'ok' : 'warn', 3, { h: .8 })); });
      T(S, 'ge', 27.7, 6.85, ['4/6 ≈ 0.67', '4/6 ≈ 0.67'], 'cz-mono irx-xs irx-g', 3, { w: 3.6 });
      [['A', BA, 8.7], ['B', BB, 9.7]].forEach(([n, b, y], r) => { T(S, 'bn' + r, 19.0, y + .1, n, 'cz-mono irx-xs', 4, { w: 1.0 }); [...b].forEach((v, i) => chip(S, 'b' + r + '_' + i, 20.2 + i * .9, y, .8, v, BA[i] === BB[i] ? 'ink-3' : 'danger', 4, { h: .8 })); });
      T(S, 'hd', 27.7, 9.25, ['거리 2', 'distance 2'], 'cz-mono irx-xs irx-r', 4, { w: 3.6 });
      lbl(S, 'sim', 19.0, 10.9, ['실제로는 64비트 지문에서 3비트 이하로 다르면 거의 중복으로 봐요', 'in practice, 64-bit fingerprints within 3 bits count as near-duplicates'], 'r', 4, { w: 12.4 });
      lbl(S, 'l1', 1, 7.0, ['연속한 단어 2개(슁글)의 집합으로 문서를 나타내요 · 3개 공유, 합집합 5개', 'each document becomes its set of 2-word shingles: 3 shared, 5 in the union'], 'a', 1, { w: 16.0 });
      lbl(S, 'l3', 1, 8.6, ['해시 h마다 최솟값이 같을 확률 = 자카드 유사도', 'for each hash h, P(the minima match) = the Jaccard similarity'], 'w', 3, { w: 16.0 });
      lbl(S, 'l3b', 1, 10.0, ['LSH: 서명을 밴드로 나눠 한 밴드라도 같은 쌍만 비교해 모든 쌍 비교를 피해요', 'LSH splits signatures into bands and compares only pairs that match in some band, avoiding all-pairs comparison'], '', 3, { w: 16.0 });
      lbl(S, 'l4', 1, 11.6, ['SimHash: 특성 해시의 비트별 가중 합의 부호 → 비슷한 문서는 비슷한 지문', 'SimHash takes the sign of a weighted per-bit sum of feature hashes, so similar documents get similar fingerprints'], 'r', 4, { w: 16.0 });
    },
    notes: [['웹에는 광고나 날짜만 다른 거의 같은 페이지가 아주 많아요 · 문서를 연속한 단어 2개(슁글)의 집합으로 나타내면 A와 B는 4개 중 3개를 공유해요', 'the web is full of pages that differ only in ads or dates; as sets of 2-word shingles, A and B share 3 of their 4'], ['두 집합의 자카드 유사도는 교집합 크기를 합집합 크기로 나눈 값이라 3/5 = 0.6이에요', 'their Jaccard similarity, the size of the intersection over the size of the union, is 3/5 = 0.6'], ['MinHash는 해시 함수마다 집합의 최솟값을 서명으로 남겨요 · 두 문서의 최솟값이 같을 확률이 자카드 유사도라, 서명 6칸 중 4칸이 같으면 0.67로 추정해요 · LSH로 비슷한 쌍만 골라 비교해요', 'MinHash keeps the minimum hash of the set under each hash function as a signature; two minima match with probability equal to the Jaccard similarity, so 4 matches out of 6 estimate 0.67, and LSH picks out only likely pairs to compare'], ['SimHash는 문서 전체를 짧은 지문 하나로 줄여요 · 비슷한 문서는 비트가 조금만 달라서, 해밍 거리가 작으면(64비트 중 3 이하) 거의 중복으로 보고 색인에서 빼요', 'SimHash reduces a whole document to one short fingerprint; similar documents differ in only a few bits, so a small Hamming distance (3 or fewer of 64) marks a near-duplicate to drop from the index']],
    fin: [['슁글 + 자카드 → MinHash로 추정, LSH로 후보, SimHash로 지문', 'shingles and Jaccard, estimated by MinHash, candidates by LSH, fingerprints by SimHash', 'irx-xs irx-a'], ['크롤링 비용과 검색 결과의 중복을 줄여요', 'it saves crawl cost and keeps duplicate results off the page'], ['LLM 학습 데이터의 중복 제거에도 같은 방법을 써요', 'the same tools deduplicate LLM training data']],
    caps: [['슁글', 'Shingles'], ['자카드 유사도', 'Jaccard similarity'], ['MinHash', 'MinHash'], ['SimHash', 'SimHash'], ['거의 중복 탐지', 'Near-duplicate detection']]
  });
}

function sPageRank() {
  const NP = { A: [19.4, 1.0], B: [28.0, 1.0], C: [23.7, 4.4], D: [28.0, 4.4] }, ctr = n => [NP[n][0] + 1.1, NP[n][1] + .5];
  const ED = [['A', 'B', 0], ['A', 'C', .22], ['C', 'A', .22], ['B', 'C', 0], ['D', 'C', 0]];
  const IT = [['0', [.25, .25, .25, .25]], ['1', [.25, .144, .569, .038]], ['2', [.521, .144, .298, .038]], ['3', [.291, .259, .413, .038]], ['∞', [.373, .196, .394, .038]]], FR = { A: .373, B: .196, C: .394, D: .038 };
  return CW('ir-pagerank', {
    code: ['r = np.full(n, 1 / n)', ['for _ in range(50):            # 수렴까지', 'for _ in range(50):            # until stable'], '    r = (1 - d) / n + d * M @ r', ['# M[j, i] = 1/out(i)  (링크 i → j)', '# M[j, i] = 1/out(i)  (link i → j)'], ['# d = 0.85: 15%는 아무 곳으로 순간이동', '# d = 0.85: teleport 15% of the time']],
    hl: [[3, 1, 'accent'], [4, 1, 'warn'], [0, 3, 'ok'], [2, 1, 'ok']],
    draw: (S) => {
      Object.entries(NP).forEach(([n, [x, y]]) => chip(S, 'n' + n, x, y, 2.2, n, 'accent', 1, { h: 1.0 }));
      ED.forEach(([a, b, o], i) => { const [p, q] = cOff(cEdge(ctr(a), ctr(b), 1.1, .5), o); arw(S, 'e' + i, p, q, 1); });
      lbl(S, 'l1', 19.0, 6.4, ['C는 A, B, D 세 곳에서 링크를 받고, A는 C의 점수를 전부 받아요', 'C is linked from A, B and D, and A receives all of C’s score'], 'a', 1, { w: 12.4 });
      lbl(S, 'rs', 19.0, 7.8, ['무작위 서퍼: 85%는 링크를 따라가고 15%는 아무 페이지로 순간이동', 'random surfer: follows a link 85% of the time and teleports anywhere 15%'], 'w', 2, { w: 12.4 });
      F(S, 'fm', 19.0, 9.1, 'PR(p) = (1 − d)/N + d · Σ PR(q) / out(q)', 'a', 2, { w: 12.4 });
      T(S, 'ith', 1.0, 7.1, ['반복', 'iter'], 'irx-xs', 3, { w: 2.0 }); ['A', 'B', 'C', 'D'].forEach((n, j) => T(S, 'hd' + j, 3.4 + j * 3.2, 7.1, n, 'cz-mono cz-tc irx-xs irx-a', 3, { w: 2.6 }));
      IT.forEach(([t, v], i) => { const y = 7.85 + i * .75, fin = i === 4, st = fin ? 4 : 3, cl = fin ? ' irx-g' : ''; T(S, 'itn' + i, 1.0, y, t, 'cz-mono irx-xs' + cl, st, { w: 2.0 }); v.forEach((x, j) => T(S, 'pr' + i + '_' + j, 3.4 + j * 3.2, y, x.toFixed(3), 'cz-mono cz-tc irx-xs' + cl, st, { w: 2.6 })); });
      lbl(S, 'cv', 1, 11.9, ['균등하게 시작해 반복하면 한 값으로 수렴해요 (거듭제곱 반복)', 'starting uniform, repeated updates converge to one vector (power iteration)'], 'g', 3, { w: 16.0 });
      Object.entries(NP).forEach(([n, [x, y]]) => T(S, 'fv' + n, x, n === 'C' || n === 'D' ? y + 1.15 : y - .7, FR[n].toFixed(3), 'cz-mono cz-tc irx-xs irx-g', 4, { w: 2.2 }));
      lbl(S, 'dn', 19.0, 10.4, ['D는 들어오는 링크가 없어 순간이동 몫 0.15/4 ≈ 0.038만 받아요', 'D has no inlinks and keeps only the teleport share 0.15/4 ≈ 0.038'], 'w', 4, { w: 12.4 });
      lbl(S, 'cb', 19.0, 11.8, ['질의와 무관하게 미리 계산해 BM25 같은 관련성 점수와 결합해요', 'computed offline, independent of the query, and combined with relevance scores such as BM25'], 'g', 4, { w: 12.4 });
    },
    notes: [['페이지랭크는 링크를 추천으로 봐요 · 중요한 페이지로부터 링크를 많이 받을수록 중요하고, 각 페이지는 자기 점수를 나가는 링크 수로 나눠 전해요', 'PageRank treats links as endorsements: a page matters more when many important pages link to it, and each page splits its score evenly across its outgoing links'], ['무작위 서퍼로 보면, 링크를 따라 돌아다니다 15% 확률로 아무 페이지로 순간이동해요(d = 0.85) · 덕분에 순환에 갇히거나 링크 없는 페이지에서 멈추지 않아요', 'as a random surfer, it follows links but teleports to a random page 15% of the time (d = 0.85), so it never gets stuck in cycles or at pages without links'], ['모두 0.25로 시작해 이 식을 반복 적용하면 값이 흔들리다 한 벡터로 수렴해요 · 거듭제곱 반복이라고 하고, 수십 번이면 충분해요', 'starting from 0.25 each and applying the update repeatedly, the values oscillate and then converge to one vector; this power iteration needs only a few dozen rounds'], ['C는 0.394, C의 점수를 다 받는 A는 0.373, B는 0.196이고, 들어오는 링크가 없는 D는 순간이동 몫 0.038만 받아요 · 질의와 무관하게 미리 계산해 관련성 점수와 함께 써요', 'C ends at 0.394, A, which receives all of C’s score, at 0.373 and B at 0.196, while D, with no inlinks, keeps only its teleport share of 0.038; it is computed offline and combined with relevance scores']],
    fin: [['페이지랭크: 무작위 서퍼가 각 페이지에 머무는 확률', 'PageRank is the share of time a random surfer spends on each page', 'irx-xs irx-a'], ['링크 그래프의 고유벡터를 거듭제곱 반복으로 구해요', 'it is an eigenvector of the link graph, found by power iteration'], ['링크 농장 같은 스팸이 생겨, 지금은 수많은 신호 중 하나예요', 'link farms and other spam made it one signal among many']],
    caps: [['링크 그래프', 'The link graph'], ['무작위 서퍼', 'The random surfer'], ['거듭제곱 반복', 'Power iteration'], ['최종 점수', 'Final scores'], ['페이지랭크', 'PageRank']]
  });
}

function sSpell() {
  const RW = ['ε', 's', 'e', 'r', 'c', 'h'], CL = ['ε', 's', 'e', 'a', 'r', 'c', 'h'];
  const DT = [[0, 1, 2, 3, 4, 5, 6], [1, 0, 1, 2, 3, 4, 5], [2, 1, 0, 1, 2, 3, 4], [3, 2, 1, 1, 1, 2, 3], [4, 3, 2, 2, 2, 1, 2], [5, 4, 3, 3, 3, 2, 1]], PATH = ['0_0', '1_1', '2_2', '2_3', '3_4', '4_5', '5_6'];
  const CD = [['search', '1', '2.0e-4', '1e-3', '2.0e-7', 1], ['perch', '1', '5.0e-6', '2e-4', '1.0e-9', 0], ['sketch', '2', '3.0e-5', '1e-6', '3.0e-11', 0]], CX = [19.0, 21.7, 23.3, 25.7, 28.1], CWD = [2.6, 1.5, 2.3, 2.3, 3.2];
  return CW('ir-spell', {
    code: ['cands = [c for c in vocab', ['         if lev(w, c) <= 2]        # 편집 거리', '         if lev(w, c) <= 2]        # distance'], 'best = max(cands, key=lambda c:', ['           P(c) * P(w | c))        # 잡음 채널', '           P(c) * P(w | c))        # channel'], ['# 실제로는 BK-트리, SymSpell로 빠르게', '# fast lookup: BK-trees, SymSpell']],
    hl: [[1, 1, 'warn'], [0, 2, 'accent'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      RW.forEach((t, i) => T(S, 'rw' + i, 19.2, 1.25 + i * .85, t, 'cz-mono cz-tc irx-xs', 1, { w: 1.0 }));
      CL.forEach((t, j) => T(S, 'cw' + j, 20.6 + j * 1.4, .45, t, 'cz-mono cz-tc irx-xs', 1, { w: 1.25 }));
      DT.forEach((r, i) => r.forEach((v, j) => chip(S, 'd' + i + '_' + j, 20.6 + j * 1.4, 1.2 + i * .85, 1.25, String(v), PATH.includes(i + '_' + j) ? (i === 2 && j === 3 ? 'warn' : 'ok') : 'ink-3', 1, { h: .8 })));
      lbl(S, 'l1', 1, 7.0, ['편집 거리: 삽입·삭제·치환의 최소 횟수 · serch → search는 a 삽입 1번', 'edit distance: the fewest insertions, deletions and substitutions; serch → search inserts one a'], 'w', 1, { w: 16.0 });
      [['후보', 'word'], ['거리', 'dist'], 'P(c)', 'P(w|c)', ['곱', 'score']].forEach((t, j) => T(S, 'th' + j, CX[j], 6.75, t, 'cz-mono irx-tiny' + (j > 1 ? '' : ' irx-a'), j > 1 ? 3 : 2, { w: CWD[j] }));
      CD.forEach((r, i) => r.slice(0, 5).forEach((t, j) => T(S, 'cd' + i + '_' + j, CX[j], 7.5 + i * .75, t, 'cz-mono irx-xs' + (r[5] && j === 4 ? ' irx-g' : ''), j > 1 ? 3 : 2, { w: CWD[j] })));
      lbl(S, 'l2', 19.0, 9.95, ['사전에서 거리 2 이내의 단어가 후보예요', 'dictionary words within distance 2 are the candidates'], 'a', 2, { w: 12.4, off: 3 });
      lbl(S, 'l3', 19.0, 9.95, ['search가 perch보다 200배 그럴듯 → “search로 검색할까요?”', 'search is 200× likelier than perch → “did you mean search?”'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4a', 1, 8.6, ['문맥: “serch engine”이면 P(search engine) ≫ P(perch engine)', 'context: in “serch engine”, P(search engine) ≫ P(perch engine)'], 'a', 4, { w: 16.0 });
      lbl(S, 'l4b', 1, 10.1, ['질의 로그: 사용자가 곧바로 고쳐 다시 친 쌍에서 오타 모델을 배워요', 'query logs: learn the error model from pairs users immediately retyped'], '', 4, { w: 16.0 });
      lbl(S, 'l4c', 1, 11.6, ['한/영 전환 오타도 고쳐요: dkssud → 안녕', 'wrong-keyboard typos too: dkssud → 안녕'], 'g', 4, { w: 16.0 });
    },
    notes: [['두 단어의 편집 거리는 한쪽을 다른 쪽으로 바꾸는 삽입·삭제·치환의 최소 횟수예요 · 동적 계획법 표의 오른쪽 아래 값이 답이라 serch와 search는 1이에요', 'the edit distance between two words is the fewest insertions, deletions and substitutions turning one into the other; the bottom-right cell of the dynamic programming table gives 1 for serch and search'], ['사전에서 거리 2 이내의 단어를 후보로 모아요 · serch에는 search, perch(1)와 sketch(2) 등이 있어요', 'dictionary words within distance 2 become candidates: search and perch at 1 and sketch at 2 for serch'], ['잡음 채널 모델은 P(c) × P(w | c)가 가장 큰 c를 골라요 · 흔한 단어일수록 P(c)가 크고, 그 단어를 w로 잘못 칠 확률이 P(w | c)예요 · search가 perch보다 200배 그럴듯해요', 'the noisy channel model picks the c maximizing P(c) × P(w | c): P(c) favors common words and P(w | c) is the chance of mistyping c as w, which makes search 200 times likelier than perch'], ['실제 검색에서는 앞뒤 단어의 문맥, 사용자가 바로 고쳐 다시 친 질의 로그를 함께 써요 · 한글 검색에서는 한/영 전환을 잊고 친 dkssud를 안녕으로 되돌리는 교정도 흔해요', 'real search engines add the surrounding words and query logs of immediate retypes, and Korean search also restores text typed in the wrong keyboard layout, turning dkssud back into 안녕']],
    fin: [['철자 교정 = 후보 생성(편집 거리) + 잡음 채널 순위', 'spelling correction is candidate generation by edit distance plus noisy-channel ranking', 'irx-xs irx-a'], ['확신이 크면 바로 고친 결과를, 아니면 제안만 보여줘요', 'confident corrections are applied; uncertain ones are only suggested'], ['고유명사와 신조어는 사전보다 질의 로그가 잘 알아요', 'query logs know names and new words better than dictionaries']],
    caps: [['편집 거리', 'Edit distance'], ['후보 생성', 'Generating candidates'], ['잡음 채널', 'The noisy channel'], ['문맥과 로그', 'Context and logs'], ['철자 교정', 'Spelling correction']]
  });
}

function sAuto() {
  const PN = [['ro', 19.0, 2.9, 1.5, 'root'], ['s', 21.0, 2.9, .9, 's'], ['e', 22.4, 2.9, .9, 'e'], ['a', 23.8, 2.9, .9, 'a']];
  const KD = [['rch', .7, 'search', 500], ['son', 2.1, 'season', 300], ['ttle', 3.5, 'seattle', 200], ['l', 4.9, 'seal', 80]];
  return CW('ir-autocomplete', {
    code: ['node = trie.root', ['for ch in prefix:            # 접두사 따라', 'for ch in prefix:            # walk prefix'], '    node = node.child[ch]', ['return node.top_k            # 미리 계산', 'return node.top_k            # precomputed'], ['# 점수: 빈도 + 최신성 + 개인화', '# score: frequency + freshness + you']],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      PN.forEach(([k, x, y, w, t], i) => chip(S, 'p' + k, x, y, w, t, i ? 'warn' : 'ink-3', 1, { h: .9 }));
      PN.slice(1).forEach(([, x], i) => arw(S, 'pa' + i, [PN[i][1] + PN[i][3] + .08, 3.35], [x - .08, 3.35], 1));
      KD.forEach(([t, y, wd, n], i) => { chip(S, 'k_' + i, 26.0, y, 1.8, t, 'ink-3', 1, { h: .9 }); seg(S, 'kl' + i, [24.75, 3.35], [25.95, y + .45], 1, 'ink-3', .07); T(S, 'kc' + i, 28.1, y + .1, wd + ' ' + n, 'cz-mono irx-tiny', 1, { w: 3.3 }); });
      lbl(S, 'l1', 1, 7.0, ['질의 로그의 빈도로 트라이를 만들어요 · 공통 접두사는 한 경로를 공유', 'build a trie from query-log counts; shared prefixes share one path'], 'a', 1, { w: 16.0 });
      box2(S, 'in', 19.0, .5, 4.4, 1.0, 'sea▏', 'accent', 2);
      lbl(S, 'l2', 19.0, 6.2, ['입력할 때마다 접두사 s → e → a를 따라 내려가요', 'each keystroke walks the prefix s → e → a'], 'w', 2, { w: 12.4 });
      T(S, 'tkh', 19.0, 7.55, ['‘sea’의 상위 3', 'top 3 at ‘sea’'], 'irx-xs irx-g', 3, { w: 3.8 }); toks(S, 'tk', 23.0, 7.4, ['search', 'season', 'seattle'], 'ok', 3);
      lbl(S, 'l3', 1, 8.6, ['노드마다 상위 k개를 미리 저장해 두면 조회는 접두사 길이만큼만 걸려요', 'storing the top k at every node makes lookup cost only the prefix length'], 'g', 3, { w: 16.0 });
      lbl(S, 'l4a', 19.0, 8.8, ['오타 허용: seach → search', 'typo tolerance: seach → search'], 'a', 4, { w: 12.4 });
      lbl(S, 'l4b', 19.0, 10.0, ['최신성: 지금 뜨는 질의를 위로 · 개인화와 부적절한 제안 거르기', 'freshness lifts trending queries; add personalization and filter unsafe suggestions'], '', 4, { w: 12.4 });
      lbl(S, 'l4c', 1, 10.2, ['한글은 자모로 풀어 색인해 ‘검ㅅ’처럼 덜 친 음절도 ‘검색’에 맞춰요', 'Korean is indexed by jamo so a half-typed syllable such as 검ㅅ still matches 검색'], 'w', 4, { w: 16.0 });
    },
    notes: [['자동 완성은 질의 로그에서 자주 검색된 질의와 빈도로 트라이를 만들어요 · search, season, seattle, seal은 sea라는 경로를 공유해요', 'autocomplete builds a trie from frequent queries and their counts in the query log; search, season, seattle and seal share the path sea'], ['사용자가 sea를 칠 때마다 루트에서 s, e, a를 따라 그 노드로 내려가요', 'as the user types sea, each keystroke walks from the root down s, e and a to that node'], ['그 아래의 모든 질의를 매번 뒤지지 않도록, 노드마다 점수 상위 k개를 미리 저장해요 · 그래서 키 입력마다 접두사 길이만큼의 시간에 search, season, seattle을 보여줘요', 'rather than scanning every query below it on each keystroke, each node stores its top k in advance, so search, season and seattle appear in time proportional to the prefix length'], ['실제 서비스는 오타를 허용하고, 지금 뜨는 질의와 사용자의 기록을 반영하며, 부적절한 제안을 걸러요 · 한글은 자모 단위로 풀어 색인해야 입력 중인 음절도 맞출 수 있어요', 'production systems tolerate typos, boost trending queries and the user’s history, and filter unsafe suggestions, while Korean must be indexed by jamo to match syllables still being typed']],
    fin: [['자동 완성: 트라이 + 노드별 상위 k + 점수', 'autocomplete is a trie with a top k per node and a scoring function', 'irx-xs irx-a'], ['메모리를 아끼려 Lucene은 유한 상태 변환기(FST)를 써요', 'Lucene uses finite-state transducers (FSTs) to save memory'], ['응답은 키 입력마다 수십 ms 안에 와야 해요', 'answers must arrive within tens of milliseconds per keystroke']],
    caps: [['트라이', 'The trie'], ['접두사 따라가기', 'Walking the prefix'], ['미리 계산한 상위 k', 'Precomputed top k'], ['실제 서비스', 'In production'], ['자동 완성', 'Autocomplete']]
  });
}
/* ===== IR · 5. query processing and systems ===== */
function sDAAT() {
  const DOCS = [1, 2, 5, 9, 12], DX = j => 21.6 + j * 1.9, PJ = { 2: 3, 5: 1, 9: 2 }, PS = { 1: 1, 5: 4, 9: 1, 12: 2 }, SC = [1, 6, 6, 5, 2];
  return CW('ir-daat', {
    code: [['heap = []                           # 상위 k', 'heap = []                           # top k'], 'while (d := min(c.doc for c in cs)) < END:', ['    s = sum(c.score(d) for c in cs) # 점수 합', '    s = sum(c.score(d) for c in cs) # sum'], '    push_topk(heap, (s, d), k)', ['    for c in cs: c.skip_past(d)     # 함께 전진', '    for c in cs: c.skip_past(d)     # advance']],
    hl: [[0, 1, 'accent'], [0, 1], [1, 2, 'warn'], [3, 1, 'ok']],
    draw: (S) => {
      T(S, 'dh', 19.0, .55, ['문서', 'doc'], 'irx-xs', 1, { w: 2.4 }); DOCS.forEach((d, j) => T(S, 'dc' + j, DX(j), .55, String(d), 'cz-mono cz-tc irx-xs', 1, { w: 1.6 }));
      [['jaguar ×2', PJ, 1.3, 'accent'], ['speed ×1', PS, 2.3, 'warn']].forEach(([n, P, y, c], r) => { T(S, 'pn' + r, 19.0, y + .1, n, 'cz-mono irx-tiny', 1, { w: 2.5 }); DOCS.forEach((d, j) => { if (P[d]) chip(S, 'p' + r + '_' + j, DX(j), y, 1.6, 'tf ' + P[d], c, 1, { h: .8 }); }); });
      T(S, 'sh', 19.0, 3.45, ['점수', 'score'], 'irx-xs irx-g', 3, { w: 2.4 }); SC.forEach((v, j) => T(S, 'sc' + j, DX(j), 3.45, String(v), 'cz-mono cz-tc irx-xs ' + (v >= 6 ? 'irx-g' : 'irx-r'), j < 3 ? 3 : 4, { w: 1.6 }));
      lbl(S, 'l3', 19.0, 4.4, ['DAAT: 커서들이 가장 작은 문서 ID로 함께 전진하며 문서를 하나씩 완성해요', 'DAAT: cursors advance together to the smallest doc ID, finishing one document at a time'], 'w', 3, { w: 12.4 });
      F(S, 'hp', 19.0, 6.0, ['상위 2 힙: 문서 2 (6), 문서 5 (6) · θ = 6', 'top-2 heap: doc 2 (6), doc 5 (6) · θ = 6'], 'g', 4, { w: 12.4 });
      lbl(S, 'l4', 19.0, 7.1, ['문서 9 (5)와 12 (2)는 θ보다 낮아 버려요 → 아예 계산을 건너뛰는 게 WAND', 'docs 9 (5) and 12 (2) fall below θ and are dropped; skipping their scoring entirely is WAND'], 'r', 4, { w: 12.4 });
      T(S, 'ta', 1.0, 7.0, ['TAAT 누산기', 'TAAT accumulators'], 'irx-xs irx-a', 2, { w: 6.0 });
      T(S, 'ta1', 1.0, 7.85, ['jaguar 후', 'after jaguar'], 'cz-mono irx-tiny', 2, { w: 3.6 }); toks(S, 'ac', 4.8, 7.7, ['2:6', '5:2', '9:4'], 'accent', 2);
      T(S, 'ta2', 1.0, 8.95, ['speed 후', 'after speed'], 'cz-mono irx-tiny', 2, { w: 3.6 }); toks(S, 'bc', 4.8, 8.8, ['1:1', '2:6', '5:6', '9:5', '12:2'], 'warn', 2);
      lbl(S, 'l2', 1, 10.2, ['TAAT: 단어 하나씩 목록 끝까지 읽어 문서별 점수를 쌓아요 · 후보 수만큼 메모리', 'TAAT reads one term’s whole list at a time, accumulating per-document scores in memory proportional to the candidates'], 'a', 2, { w: 16.0 });
    },
    notes: [['질의 jaguar speed의 두 역색인 목록이에요 · 문서 ID 순으로 정렬돼 있고, 단어 가중치(jaguar 2, speed 1)와 tf를 곱해 점수를 더해요', 'these are the postings for the query jaguar speed, sorted by document ID; each contributes its tf times the term weight (2 for jaguar, 1 for speed)'], ['단어 단위 처리(TAAT)는 한 단어의 목록을 끝까지 읽어 문서별 누산기에 점수를 더한 뒤 다음 단어로 넘어가요 · 단순하지만 후보 문서 수만큼 메모리가 필요해요', 'term-at-a-time (TAAT) reads one term’s list to the end, adding into per-document accumulators before moving to the next term: simple, but memory grows with the number of candidates'], ['문서 단위 처리(DAAT)는 목록마다 커서를 두고 가장 작은 문서 ID로 함께 전진하며 문서 하나의 점수를 완성해요 · 문서 1은 1, 2는 6, 5는 2 + 4 = 6이에요', 'document-at-a-time (DAAT) keeps a cursor per list, advancing them together to the smallest document ID and finishing one document’s score at a time: 1 for doc 1, 6 for doc 2 and 2 + 4 = 6 for doc 5'], ['상위 k개만 최소 힙에 두면 k번째 점수가 문턱 θ가 돼요 · 문서 9(5)와 12(2)는 θ = 6보다 낮아 버려지고, 이런 문서는 아예 계산하지 않고 건너뛸 수 있어요', 'keeping only the top k in a min-heap makes the kth score a threshold θ; docs 9 (5) and 12 (2) fall below θ = 6 and are dropped, and such documents can be skipped without scoring at all']],
    fin: [['TAAT는 단어 하나씩, DAAT는 문서 하나씩 점수를 완성해요', 'TAAT finishes one term at a time, DAAT one document at a time', 'irx-xs irx-a'], ['대형 검색 엔진은 메모리가 작고 가지치기가 쉬운 DAAT를 주로 써요', 'large engines mostly use DAAT for its small memory and easy pruning'], ['상위 k 힙의 문턱이 다음 주제인 동적 가지치기의 출발점이에요', 'the top-k threshold is the starting point for dynamic pruning']],
    caps: [['역색인 목록', 'Posting lists'], ['단어 단위(TAAT)', 'Term at a time'], ['문서 단위(DAAT)', 'Document at a time'], ['상위 k 힙', 'The top-k heap'], ['질의 처리: TAAT와 DAAT', 'Query processing: TAAT and DAAT']]
  });
}

function sWAND() {
  const TX = d => 21.6 + d * .38, TR = [['A', 2.0, 10, 1.2], ['B', 1.5, 15, 2.4], ['C', 4.0, 22, 3.6]];
  return CW('ir-wand', {
    code: ['curs.sort(key=lambda c: c.doc)', 'acc = 0', ['for c in curs:                     # 상한 누적', 'for c in curs:                     # add UBs'], '    acc += c.ub', '    if acc > theta: pivot = c.doc; break', ['for c in curs: c.skip_to(pivot)    # 건너뛰기', 'for c in curs: c.skip_to(pivot)    # jump']],
    hl: [[0, 1, 'accent'], [1, 4, 'warn'], [5, 1, 'ok'], [5, 1, 'ok']],
    draw: (S) => {
      TR.forEach(([n, ub, d, y], i) => { T(S, 'tn' + i, 19.0, y - .3, n + ' · UB ' + ub.toFixed(1), 'cz-mono irx-tiny', 1, { w: 2.6 }); hl(S, 'tl' + i, TX(0), TX(25), y, 'ink-3', 1, { w: .06 }); chip(S, 'cu' + i, TX(d) - .6, y - .4, 1.2, 'd' + d, 'accent', 1, { h: .8, off: i < 2 ? 3 : 0 }); });
      F(S, 'th', 19.0, 4.4, ['θ = 현재 2번째 점수 = 5.0', 'θ = the current 2nd score = 5.0'], 'r', 1, { w: 12.4 });
      F(S, 'ua', 19.0, 5.3, 'Σ UB: 2.0 → 3.5 → 7.5 > θ', 'w', 2, { w: 12.4 });
      lbl(S, 'pv', 19.0, 6.2, ['상한을 커서 순서로 더해 θ를 처음 넘는 곳이 피벗: 문서 22', 'adding bounds in cursor order, the first to pass θ is the pivot: doc 22'], 'w', 2, { w: 12.4 });
      [0, 1].forEach(i => { const [, , d, y] = TR[i]; rect(S, 'sk' + i, TX(d) + .7, y - .2, TX(22) - TX(d) - 1.4, .4, 'danger', 25, 3, { r: .1 }); chip(S, 'cv' + i, TX(22) - .6, y - .4, 1.2, 'd22', 'ok', 3, { h: .8 }); });
      lbl(S, 'sk', 19.0, 7.6, ['22 앞의 문서는 A + B 최대 3.5 < θ라 상위에 못 들어요 → 건너뛰기', 'documents before 22 can reach at most A + B = 3.5 < θ, so the cursors jump'], 'r', 3, { w: 12.4 });
      lbl(S, 'fs', 19.0, 9.0, ['모든 커서가 22에 모이면 그때만 실제 점수를 계산해요', 'only when every cursor sits on 22 is the real score computed'], 'g', 4, { w: 12.4 });
      lbl(S, 'l1', 1, 8.1, ['UB: 그 단어가 어떤 문서에 줄 수 있는 최대 점수', 'UB: the most a term can add to any document'], 'a', 1, { w: 16.0 });
      lbl(S, 'l4', 1, 9.5, ['결과는 모두 계산한 것과 똑같은 정확한 상위 k예요', 'the result is the exact top k, identical to exhaustive scoring'], 'g', 4, { w: 16.0 });
      lbl(S, 'l4b', 1, 10.9, ['Block-Max WAND: 블록마다 상한을 둬 더 촘촘히 건너뛰어요 · MaxScore도 비슷한 방법', 'Block-Max WAND keeps a bound per block to skip more finely; MaxScore is a close cousin'], '', 4, { w: 16.0 });
    },
    notes: [['단어마다 그 목록에서 어떤 문서에 줄 수 있는 최대 점수(상한 UB)를 미리 저장해요 · 지금 상위 k의 마지막 점수가 문턱 θ = 5.0이에요', 'each term stores in advance the most it can add to any document in its list (its upper bound, UB), and the last score in the current top k is the threshold θ = 5.0'], ['커서를 현재 문서 순으로 정렬하고 상한을 차례로 더해요 · A 2.0, A + B 3.5, A + B + C 7.5로 처음 θ를 넘는 C의 문서 22가 피벗이에요', 'cursors are sorted by their current document and bounds are summed in order: 2.0 for A, 3.5 for A + B and 7.5 with C, so C’s document 22, the first to pass θ, is the pivot'], ['22보다 앞의 문서는 A와 B만 가질 수 있어 최대 3.5라 θ를 넘지 못해요 · 그래서 A와 B 커서를 22로 바로 건너뛰고 그 사이 문서는 계산하지 않아요', 'documents before 22 can only contain A and B, worth at most 3.5, which cannot beat θ, so the A and B cursors jump straight to 22 without scoring anything between'], ['모든 커서가 22에 모였을 때만 실제 점수를 계산하고, 결과는 전부 계산한 것과 똑같아요 · 블록마다 상한을 두는 Block-Max WAND는 더 촘촘히 건너뛰어요', 'only when every cursor reaches 22 is the full score computed, and the result is exactly the same as exhaustive scoring; Block-Max WAND keeps a bound per block to skip even more']],
    fin: [['WAND: 상한의 합이 θ를 못 넘는 구간은 건너뛰는 동적 가지치기', 'WAND is dynamic pruning that skips stretches whose bound sum cannot beat θ', 'irx-xs irx-a'], ['θ가 오를수록 더 많이 건너뛰어 빨라져요', 'as θ rises, more is skipped and queries speed up'], ['Lucene은 Block-Max WAND로 상위 k 검색을 가속해요', 'Lucene speeds up top-k search with Block-Max WAND']],
    caps: [['상한과 문턱', 'Bounds and threshold'], ['피벗 찾기', 'Finding the pivot'], ['건너뛰기', 'Skipping'], ['정확한 상위 k', 'Exact top k'], ['WAND 동적 가지치기', 'WAND dynamic pruning']]
  });
}

function sShard() {
  const SX = i => 19.0 + i * 3.15, TOP = [['d7 .91', 'd3 .72', 'd9 .60'], ['d40 .88', 'd41 .70', 'd44 .52'], ['d22 .85', 'd25 .81', 'd20 .55'], ['d63 .66', 'd61 .58', 'd67 .40']], LAT = [20, 25, 22, 90];
  return CW('ir-shard', {
    code: ['reps = [pick(r) for r in shard_replicas]', 'hits = gather(r.search(q, k) for r in reps)', ['top = heapq.nlargest(k, chain(*hits))  # 병합', 'top = heapq.nlargest(k, chain(*hits))  # merge'], ['# 질의는 모든 샤드로 (scatter-gather)', '# every shard gets the query'], ['# 가장 느린 샤드가 응답 시간을 정해요', '# the slowest shard sets the latency']],
    hl: [[1, 1, 'accent'], [2, 1, 'ok'], [0, 1, 'warn'], [4, 1, 'danger']],
    draw: (S) => {
      chip(S, 'co', 22.6, .4, 5.0, ['조정 노드', 'coordinator'], 'accent', 1, { h: 1.0 });
      [0, 1, 2, 3].forEach(i => { chip(S, 'sd' + i, SX(i), 3.0, 2.8, ['샤드 ' + (i + 1), 'shard ' + (i + 1)], 'ink-3', 1, { h: .9 }); arw(S, 'ba' + i, [25.1 + (i - 1.5) * .6, 1.5], [SX(i) + 1.4, 2.9], 1); });
      lbl(S, 'l1', 1, 7.0, ['문서를 나눠 샤드마다 자기 색인을 가져요 · 질의는 모든 샤드로', 'documents are partitioned so each shard holds its own index, and every query goes to all shards'], 'a', 1, { w: 16.0 });
      TOP.forEach((ls, i) => ls.forEach((t, j) => T(S, 't' + i + '_' + j, SX(i), 5.2 + j * .55, t, 'cz-mono cz-tc irx-tiny' + ((i === 0 && j === 0) || (i === 1 && j === 0) || (i === 2 && j === 0) ? ' irx-g' : ''), 2, { w: 2.8 })));
      T(S, 'mh', 19.0, 7.25, ['병합 상위 3', 'merged top 3'], 'irx-xs irx-g', 2, { w: 3.6 }); toks(S, 'mg', 22.8, 7.1, ['d7 .91', 'd40 .88', 'd22 .85'], 'ok', 2);
      [0, 1, 2, 3].forEach(i => ['r1', 'r2'].forEach((t, j) => chip(S, 'rp' + i + '_' + j, SX(i) + j * 1.5, 4.05, 1.3, t, 'warn', 3, { h: .8 })));
      lbl(S, 'l3', 19.0, 8.5, ['샤드마다 복제본을 둬 처리량을 늘리고 장애를 견뎌요', 'replicas per shard add throughput and survive failures'], 'w', 3, { w: 12.4 });
      LAT.forEach((v, i) => { const y = 8.4 + i * .8; T(S, 'ln' + i, 1.0, y, ['샤드 ' + (i + 1), 'shard ' + (i + 1)], 'cz-mono irx-tiny', 4, { w: 2.4 }); hbar(S, 'lb' + i, 3.6, y + .05, v * .11, v > 50 ? 'danger' : 'accent', 4); T(S, 'lv' + i, 3.8 + v * .11, y, v + ' ms', 'cz-mono irx-tiny', 4, { w: 2.0 }); });
      lbl(S, 'l4', 1, 11.8, ['헤지 요청: 30 ms가 지나면 다른 복제본에도 보내 먼저 온 답을 써요', 'hedged requests: after 30 ms, ask another replica and use whichever answers first'], 'r', 4, { w: 16.0 });
    },
    notes: [['색인이 한 기계에 다 들어가지 않으면 문서를 나눠 여러 샤드에 둬요 · 조정 노드는 질의를 모든 샤드에 보내요(scatter)', 'when the index outgrows one machine, documents are partitioned across shards, and a coordinator sends each query to every shard (scatter)'], ['각 샤드는 자기 문서에서 상위 k개를 찾아 돌려주고, 조정 노드가 이를 합쳐 전체 상위 k를 만들어요(gather) · 상위 3이면 샤드마다 3개씩, 12개 중 3개를 골라요', 'each shard returns its own top k, and the coordinator merges them into the global top k (gather): with k = 3, 3 from each shard, picking 3 of the 12'], ['샤드마다 복제본을 여러 개 두면 질의를 나눠 받아 처리량이 늘고, 기계 하나가 죽어도 다른 복제본이 응답해요', 'several replicas per shard share the query load for more throughput and keep answering when a machine fails'], ['응답은 가장 느린 샤드를 기다려야 해서, 샤드 하나가 90 ms 걸리면 전체도 90 ms예요 · 샤드가 많을수록 이런 꼬리 지연이 흔해져서, 늦으면 다른 복제본에도 보내는 헤지 요청으로 줄여요', 'the answer waits for the slowest shard, so one shard at 90 ms makes the whole query 90 ms; with many shards such tail latency becomes common, and hedged requests to a second replica cut it']],
    fin: [['문서 분할 + scatter-gather + 복제', 'document partitioning, scatter-gather and replication', 'irx-xs irx-a'], ['샤드마다 idf가 달라지지 않게 전역 통계를 쓰기도 해요', 'global statistics keep idf consistent across shards'], ['꼬리 지연이 대규모 검색의 응답 시간을 좌우해요', 'tail latency dominates response time at scale']],
    caps: [['샤딩', 'Sharding'], ['scatter-gather', 'Scatter-gather'], ['복제', 'Replication'], ['꼬리 지연', 'Tail latency'], ['분산 검색', 'Distributed search']]
  });
}

function sSegments() {
  const SG = [['seg1', ['d1', 'd2', 'd3'], .7], ['seg2', ['d4', 'd5'], 1.8], ['seg3', ['d6', 'd7'], 2.9]], DEL = { d2: 1, d5: 1 };
  return CW('ir-segments', {
    code: [['writer.add(doc)            # 메모리 버퍼로', 'writer.add(doc)            # to RAM buffer'], ['reader = refresh(writer)   # 새 세그먼트', 'reader = refresh(writer)   # new segment'], ['writer.delete(id)          # 삭제 비트만 표시', 'writer.delete(id)          # mark deleted'], ['merge(small_segments)      # 합치며 삭제분 정리', 'merge(small_segments)      # drop deletes'], ['writer.commit()            # 디스크에 확정', 'writer.commit()            # fsync to disk']],
    hl: [[0, 2, 'accent'], [2, 1, 'danger'], [3, 1, 'ok'], [4, 1, 'warn']],
    draw: (S) => {
      T(S, 'bh', 19.0, .65, ['메모리 버퍼', 'RAM buffer'], 'irx-xs irx-a', 1, { w: 3.6 });
      toks(S, 'bf', 19.0, 1.3, ['d8', 'd9'], 'accent', 1);
      chip(S, 'bn', 21.6, 1.3, 1.5, 'd5′', 'warn', 2, { h: .9 });
      arw(S, 'ra', [22.2, 2.6], [23.6, 2.6], 1);
      SG.forEach(([n, ds, y], i) => { T(S, 'gn' + i, 24.0, y + .1, n, 'cz-mono irx-tiny', 1, { w: 1.6 }); tpos(25.7, ds).forEach(([x, w], j) => { const d = ds[j]; chip(S, 'g' + i + '_' + j, x, y, w, d, 'ink-3', 1, { h: .9, off: DEL[d] ? 2 : 0 }); if (DEL[d]) chip(S, 'gx' + i + '_' + j, x, y, w, d + '✕', 'danger', 2, { h: .9 }); }); });
      lbl(S, 'l1', 19.0, 4.2, ['refresh(기본 1초)마다 버퍼가 새 세그먼트가 돼 검색에 보여요', 'every refresh (1 s by default) turns the buffer into a new searchable segment'], 'a', 1, { w: 12.4 });
      lbl(S, 'l2', 19.0, 5.6, ['세그먼트는 바뀌지 않아요: 삭제는 삭제 비트만, 수정은 삭제 + 새로 추가', 'segments never change: a delete sets a bit, an update is a delete plus an add'], 'r', 2, { w: 12.4 });
      T(S, 'mn', 19.0, 7.25, 'seg4', 'cz-mono irx-tiny irx-g', 3, { w: 1.6 }); toks(S, 'mg', 20.7, 7.1, ['d1', 'd3', 'd4', 'd6', 'd7'], 'ok', 3);
      lbl(S, 'l3', 19.0, 8.3, ['작은 세그먼트를 합치며 삭제된 문서를 실제로 지워요', 'merging small segments physically drops deleted documents'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4', 19.0, 9.7, ['트랜스로그: 커밋 전 변경을 기록해 장애 뒤 복구해요', 'the translog records changes since the last commit for crash recovery'], 'w', 4, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['역색인은 정렬·압축돼 있어 제자리 수정이 어려워요 → 불변 세그먼트를 쌓아요', 'inverted indexes are sorted and compressed, hard to edit in place, so immutable segments pile up'], 'a', 1, { w: 16.0 });
      lbl(S, 'm3', 1, 8.6, ['검색은 모든 세그먼트를 보고 결과를 합쳐요 · 세그먼트가 많으면 느려져 병합해요', 'a search visits every segment and merges the results, so many segments slow it down and get merged'], '', 3, { w: 16.0 });
      lbl(S, 'm4', 1, 10.2, ['색인 후 약 1초면 검색되는 준실시간(NRT) 검색', 'near-real-time (NRT) search: documents become searchable about a second after indexing'], 'g', 4, { w: 16.0 });
    },
    notes: [['Lucene과 Elasticsearch는 새 문서를 메모리 버퍼에 모았다가, refresh(기본 1초)마다 바뀌지 않는 작은 세그먼트로 써서 검색에 보이게 해요', 'Lucene and Elasticsearch collect new documents in a memory buffer and, at each refresh (every second by default), write them out as a small immutable segment that becomes searchable'], ['세그먼트는 고치지 않아요 · 삭제는 삭제 비트만 켜서 검색에서 빼고, 수정은 옛 문서를 삭제하고 새 버전 d5′를 추가하는 거예요', 'segments are never edited: a delete only sets a bit that hides the document, and an update deletes the old version and adds the new d5′'], ['세그먼트가 쌓이면 검색이 모든 세그먼트를 봐야 해서 느려져요 · 배경에서 작은 세그먼트들을 합치며 삭제된 문서를 실제로 지워요', 'as segments pile up, searches must visit all of them and slow down, so small segments are merged in the background, physically dropping deleted documents'], ['커밋은 세그먼트를 디스크에 fsync로 확정하는 비싼 작업이라 가끔 하고, 그 사이 변경은 트랜스로그에 기록해 장애 뒤 복구해요', 'a commit, which fsyncs segments to disk, is expensive and done rarely; changes in between are recorded in a translog for crash recovery']],
    fin: [['불변 세그먼트 + 삭제 비트 + 병합 + 트랜스로그', 'immutable segments, deletion bits, merging and a translog', 'irx-xs irx-a'], ['불변이라 캐시가 잘 맞고 동시성 처리가 쉬워요', 'immutability makes caching and concurrency easy'], ['LSM 트리와 같은 쓰기 구조예요', 'it is the same write structure as an LSM tree']],
    caps: [['버퍼와 refresh', 'Buffer and refresh'], ['삭제와 수정', 'Deletes and updates'], ['병합', 'Merging'], ['커밋과 트랜스로그', 'Commits and the translog'], ['세그먼트와 실시간 색인', 'Segments and near-real-time indexing']]
  });
}

function sFacets() {
  const BR = [['Apple', 40], ['Dell', 35], ['Lenovo', 30], ['Asus', 15]], PR0 = [['< $1k', 50], ['$1–2k', 55], ['> $2k', 15]], PR1 = [18, 15, 2];
  const QB = '10110110', FB = '00100111';
  return CW('ir-facets', {
    code: [['hits = search("laptop")           # 120개', 'hits = search("laptop")           # 120 hits'], 'by_brand = Counter(d.brand for d in hits)', ['dell = hits & F["brand:Dell"]     # 비트셋 AND', 'dell = hits & F["brand:Dell"]     # bitset AND'], 'by_price = Counter(d.band for d in dell)', ['# 필터는 점수 없이, 캐시된 비트셋으로', '# filters: no scoring, cached bitsets']],
    hl: [[0, 2, 'accent'], [3, 1, 'warn'], [2, 2, 'ok'], [4, 1]],
    draw: (S) => {
      lbl(S, 'q', 19.0, .2, ['“laptop” 결과 120개', '“laptop”: 120 results'], 'a', 1, { w: 12.4 });
      T(S, 'bh', 19.0, 1.2, ['브랜드', 'brand'], 'irx-xs irx-a', 1, { w: 3.0 });
      BR.forEach(([n, v], i) => { const y = 1.9 + i * .8; if (n === 'Dell') { T(S, 'bn' + i, 19.0, y, n, 'cz-mono irx-tiny', 1, { w: 2.6, off: 3 }); chip(S, 'bs', 19.0, y - .1, 2.5, 'Dell ✓', 'ok', 3, { h: .8 }); } else T(S, 'bn' + i, 19.0, y, n, 'cz-mono irx-tiny', 1, { w: 2.6 }); hbar(S, 'bb' + i, 21.8, y + .02, v * .2, 'accent', 1); T(S, 'bv' + i, 22.0 + v * .2, y, String(v), 'cz-mono irx-tiny', 1, { w: 1.4 }); });
      T(S, 'ph', 19.0, 5.3, ['가격', 'price'], 'irx-xs irx-w', 2, { w: 3.0 });
      PR0.forEach(([n, v], i) => { const y = 6.0 + i * .8; T(S, 'pn' + i, 19.0, y, n, 'cz-mono irx-tiny', 2, { w: 2.6 }); hbar(S, 'pb' + i, 21.8, y + .02, v * .14, 'warn', 2, { off: 3 }); T(S, 'pv' + i, 22.0 + v * .14, y, String(v), 'cz-mono irx-tiny', 2, { w: 1.4, off: 3 }); hbar(S, 'pc' + i, 21.8, y + .02, PR1[i] * .14, 'ok', 3); T(S, 'pw' + i, 22.0 + PR1[i] * .14, y, String(PR1[i]), 'cz-mono irx-tiny irx-g', 3, { w: 1.4 }); });
      lbl(S, 'l3', 19.0, 8.6, ['Dell을 고르면 35개로 좁혀지고 가격 패싯이 다시 계산돼요 · 브랜드 패싯은 자기 필터를 빼고 세서 다른 브랜드도 고를 수 있어요', 'picking Dell narrows to 35 and recounts the price facet; the brand facet ignores its own filter so other brands stay selectable'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4', 19.0, 10.9, ['필터는 점수에 영향이 없어 비트셋으로 캐시해 재사용해요', 'filters do not affect scores, so they are cached as bitsets and reused'], 'a', 4, { w: 12.4 });
      lbl(S, 'l1', 1, 7.0, ['패싯: 결과 집합을 범주별로 센 개수 · 눌러서 좁혀가요', 'facets count the result set by category; click one to narrow down'], 'a', 1, { w: 16.0 });
      [['laptop', QB, 8.5], ['brand:Dell', FB, 9.4], ['AND', [...QB].map((b, i) => +b & +FB[i]).join(''), 10.3]].forEach(([n, b, y], r) => { T(S, 'xn' + r, 1.0, y + .1, n, 'cz-mono irx-tiny' + (r === 2 ? ' irx-g' : ''), 4, { w: 3.2 }); [...b].forEach((v, i) => chip(S, 'x' + r + '_' + i, 4.4 + i * .95, y, .8, v, v === '1' ? (r === 2 ? 'ok' : 'accent') : 'ink-3', 4, { h: .8 })); });
      T(S, 'xc', 12.3, 10.4, '→ 3', 'cz-mono irx-xs irx-g', 4, { w: 2.0 });
      lbl(S, 'l4b', 1, 11.6, ['문서별 값을 열로 저장한 doc values로 빠르게 집계하고 정렬해요', 'doc values store per-document values by column for fast aggregation and sorting'], '', 4, { w: 16.0 });
    },
    notes: [['쇼핑 검색에서 laptop 결과 120개를 브랜드별로 세어 보여주는 것이 패싯이에요 · 사용자는 개수를 보며 눌러서 결과를 좁혀가요', 'in shopping search, counting the 120 laptop results by brand gives a facet; users read the counts and click to narrow the results'], ['가격 같은 숫자 필드는 구간으로 나눠 세요 · 패싯 개수는 질의 결과 집합에서 계산하니 질의가 바뀔 때마다 새로 세요', 'numeric fields such as price are counted in ranges, and because counts come from the result set they are recomputed for every query'], ['Dell을 고르면 결과가 35개로 좁혀지고 가격 패싯도 18, 15, 2로 다시 계산돼요 · 브랜드 패싯은 자기 필터를 빼고 세서 Lenovo도 함께 고를 수 있게 해요', 'choosing Dell narrows the results to 35 and recounts the price facet as 18, 15 and 2, while the brand facet is counted without its own filter so Lenovo can be added too'], ['필터는 점수에 영향을 주지 않아서 문서 비트셋으로 만들어 캐시해 두고, 질의 결과와 AND로 겹쳐요 · 개수 세기와 정렬은 문서별 값을 열로 저장한 doc values로 빠르게 해요', 'filters do not change scores, so they are cached as document bitsets and ANDed with the results, while counting and sorting run on doc values, a column store of per-document values']],
    fin: [['패싯: 결과 집합의 범주별 개수 + 필터로 좁히기', 'facets are per-category counts over the results plus filters to narrow them', 'irx-xs irx-a'], ['필터(점수 없음)와 질의(점수 있음)를 구분하면 캐시가 잘 맞아요', 'separating filters (no score) from queries (scored) makes caching effective'], ['Elasticsearch에서는 집계(aggregation)로 만들어요', 'in Elasticsearch, facets are built with aggregations']],
    caps: [['브랜드 패싯', 'The brand facet'], ['범위 패싯', 'Range facets'], ['필터로 좁히기', 'Narrowing with a filter'], ['비트셋과 doc values', 'Bitsets and doc values'], ['패싯 검색', 'Faceted search']]
  });
}
/* ===== IR · 6. learning and neural retrieval ===== */
function sLTR() {
  const CX = [19.0, 20.8, 23.0, 25.0, 27.0, 29.0], CWs = [1.6, 2.0, 1.8, 1.8, 1.8, 2.2];
  const HD = [['문서', 'doc'], 'BM25', 'PR', ['제목', 'title'], ['최신', 'fresh'], ['정답', 'label']], RS = [['d1', '12.1', '.37', '1', '.2', '2'], ['d2', '9.8', '.80', '0', '.9', '3'], ['d3', '14.0', '.05', '1', '.1', '0']];
  const CS = [['BM25 · 1000', 'accent', 1.0], ['LTR · 100', 'warn', 6.6], [['신경망 · 10', 'neural · 10'], 'ok', 12.2]];
  return CW('ir-ltr', {
    code: [['X = features(q, docs)   # BM25, PR, 제목 일치…', 'X = features(q, docs)   # BM25, PR, title…'], 'model = LGBMRanker(objective="lambdarank")', ['model.fit(X, y, group=q_sizes)  # 질의별 묶음', 'model.fit(X, y, group=q_sizes)  # per query'], 'order = docs[np.argsort(-model.predict(X))]', ['# 1단계 BM25 → 2단계 LTR → 3단계 신경망', '# stage 1 BM25 → 2 LTR → 3 neural']],
    hl: [[0, 1, 'accent'], [2, 1, 'warn'], [1, 2, 'ok'], [4, 1]],
    draw: (S) => {
      HD.forEach((t, j) => T(S, 'th' + j, CX[j], .4, t, 'cz-mono irx-tiny' + (j === 5 ? ' irx-g' : ' irx-a'), 1, { w: CWs[j] }));
      RS.forEach((r, i) => r.forEach((t, j) => T(S, 'tv' + i + '_' + j, CX[j], 1.2 + i * .75, t, 'cz-mono irx-xs' + (j === 5 ? ' irx-g' : ''), 1, { w: CWs[j] })));
      lbl(S, 'l1', 1, 7.0, ['특성: BM25, 페이지랭크, 제목 일치, 최신성, 클릭률… 수백 개', 'features: BM25, PageRank, title match, freshness, click rate… hundreds of them'], 'a', 1, { w: 16.0 });
      [[['점별: 정답 등급을 회귀해요', 'pointwise: regress each grade'], 3.5, ''], [['쌍별: d2 > d1, d1 > d3 같은 순서 쌍을 맞혀요', 'pairwise: order pairs like d2 > d1 correctly'], 4.5, 'w'], [['목록별: nDCG 같은 목록 지표를 직접 노려요', 'listwise: target a list metric such as nDCG'], 5.5, 'a']].forEach(([t, y, c], i) => lbl(S, 'ap' + i, 19.0, y, t, c, 2, { w: 12.4 }));
      F(S, 'lm', 19.0, 6.7, 'λ_ij ∝ |ΔnDCG_ij|', 'g', 3, { w: 12.4 });
      lbl(S, 'l3', 19.0, 7.6, ['2·3위를 바꾸면 nDCG가 0.036, 5·6위는 0.004 바뀌어 위쪽 쌍에 약 8배 큰 기울기', 'swapping ranks 2 and 3 moves nDCG by 0.036 and ranks 5 and 6 by 0.004, so the higher pair gets about 8× the gradient'], 'g', 3, { w: 12.4 });
      CS.forEach(([t, c, x], i) => { chip(S, 'cs' + i, x, 8.6, 4.4, t, c, 4, { h: .9 }); if (i) arw(S, 'ca' + i, [x - 1.1, 9.05], [x - .1, 9.05], 4); });
      lbl(S, 'l4', 1, 10.0, ['단계마다 후보를 줄이며 더 비싼 모델을 써요', 'each stage shrinks the candidates and affords a costlier model'], 'g', 4, { w: 16.0 });
    },
    notes: [['학습 기반 순위(LTR)는 질의-문서 쌍마다 BM25, 페이지랭크, 제목 일치, 최신성 같은 특성을 모으고, 사람이 매긴 관련성 등급을 정답으로 순위 함수를 배워요', 'learning to rank (LTR) gathers features for each query–document pair, such as BM25, PageRank, title match and freshness, and learns a ranking function from human relevance grades'], ['접근은 세 가지예요 · 점별은 등급을 회귀하고, 쌍별은 d2 > d1처럼 두 문서의 순서를 맞히고, 목록별은 nDCG 같은 목록 전체의 지표를 노려요', 'there are three approaches: pointwise regresses the grade, pairwise gets the order of two documents such as d2 > d1 right, and listwise targets a whole-list metric such as nDCG'], ['LambdaMART는 쌍별 기울기에 두 문서를 바꿨을 때의 nDCG 변화를 곱해요 · 위쪽 순위의 실수를 훨씬 크게 고치고, 기울기 부스팅 트리로 학습해 오랫동안 표준이었어요', 'LambdaMART multiplies each pairwise gradient by the change in nDCG from swapping the two documents, fixing mistakes near the top much harder, and trains gradient-boosted trees; it was the standard for years'], ['실제로는 단계별로 써요 · BM25로 1,000개를 고르고, LTR로 100개로 줄이고, 비싼 신경망 재순위 모델로 상위 10개를 정해요', 'in practice it runs in stages: BM25 picks 1,000 candidates, LTR narrows them to 100, and an expensive neural reranker settles the top 10']],
    fin: [['LTR: 특성 + 정답 등급 → 순위 함수 학습', 'LTR learns a ranking function from features and graded labels', 'irx-xs irx-a'], ['LambdaMART: 쌍별 기울기 × |ΔnDCG|, 기울기 부스팅 트리', 'LambdaMART weights pairwise gradients by |ΔnDCG| and trains boosted trees'], ['다단계 순위로 비용과 품질을 맞춰요', 'multi-stage ranking balances cost and quality']],
    caps: [['특성', 'Features'], ['점별·쌍별·목록별', 'Pointwise, pairwise, listwise'], ['LambdaMART', 'LambdaMART'], ['다단계 순위', 'Multi-stage ranking'], ['학습 기반 순위', 'Learning to rank']]
  });
}

function sClicks() {
  const PE = [.9, .6, .35, .2, .12], BX = i => 19.6 + i * 2.3;
  const HD = [['문서', 'doc'], ['순위', 'rank'], 'CTR', ['보정', 'debiased']], RX = [19.0, 21.4, 23.8, 26.6], RW = [2.0, 2.0, 2.4, 3.0], RS = [['dX', '1', '30%', '.30/.9 = .33'], ['dY', '4', '6%', '.06/.2 = .30']];
  return CW('ir-clicks', {
    code: [['# P(클릭) = P(봄 | 순위) × P(관련)   ← PBM', '# P(click) = P(seen | rank) × P(rel) ← PBM'], ['p_exam = [.9, .6, .35, .2, .12]     # 순위별', 'p_exam = [.9, .6, .35, .2, .12]     # by rank'], ['rel = ctr / p_exam[rank]            # 보정', 'rel = ctr / p_exam[rank]            # debiased'], 'w = 1 / p_exam[rank]                # IPS', ['# 위 결과 섞기 실험으로 p_exam 추정', '# estimate p_exam by swapping results']],
    hl: [[0, 2, 'accent'], [2, 1, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      lbl(S, 'pt', 19.0, .2, ['순위별로 결과를 볼 확률 (예시)', 'chance a result is seen, by rank (illustrative)'], 'a', 1, { w: 12.4 });
      PE.forEach((v, i) => { rect(S, 'pb' + i, BX(i), 4.6 - v * 3.4, 1.6, v * 3.4, 'accent', 50, 1, { r: .06 }); T(S, 'pv' + i, BX(i) - .2, 4.6 - v * 3.4 - .5, String(v), 'cz-mono cz-tc irx-tiny', 1, { w: 2.0 }); T(S, 'pn' + i, BX(i) - .2, 4.7, [(i + 1) + '위', 'rank ' + (i + 1)], 'cz-tc irx-tiny', 1, { w: 2.0 }); });
      HD.forEach((t, j) => T(S, 'th' + j, RX[j], 5.7, t, 'cz-mono irx-tiny irx-a', 2, { w: RW[j] }));
      RS.forEach((r, i) => r.forEach((t, j) => T(S, 'tv' + i + '_' + j, RX[j], 6.4 + i * .75, t, 'cz-mono irx-xs' + (j === 3 ? ' irx-g' : ''), 2, { w: RW[j] })));
      lbl(S, 'l2', 19.0, 8.1, ['클릭률은 5배 차이지만 관련성은 비슷해요', 'a 5× gap in click rate, yet similar relevance'], 'w', 2, { w: 12.4 });
      F(S, 'ips', 19.0, 9.2, ['IPS 가중치: 1위 클릭 ×1.1, 4위 클릭 ×5', 'IPS weights: a click at rank 1 ×1.1, at rank 4 ×5'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4', 19.0, 10.3, ['상위 결과를 가끔 무작위로 섞어 p_exam을 추정해요', 'occasionally swap top results to estimate p_exam'], 'a', 4, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['클릭하려면 보고, 관련 있어야 해요 · 아래 결과는 보지도 않아 클릭이 적어요', 'a click needs the result to be seen and relevant; lower results often go unseen'], 'a', 1, { w: 16.0 });
      lbl(S, 'm3', 1, 8.6, ['드물게 보이는 위치의 클릭에 더 큰 가중치 → 편향 없는 학습 목표', 'clicks at rarely seen positions weigh more, giving an unbiased training objective'], 'g', 3, { w: 16.0 });
      lbl(S, 'm4', 1, 10.2, ['캐스케이드 모델: 위에서부터 훑다 만족하면 멈춰요', 'the cascade model: users scan from the top and stop once satisfied'], '', 4, { w: 16.0 });
      lbl(S, 'm4b', 1, 11.6, ['편향을 보정한 클릭으로 학습하는 것이 반사실적 LTR이에요', 'learning from debiased clicks is counterfactual learning to rank'], 'g', 4, { w: 16.0 });
    },
    notes: [['클릭 로그는 사람이 매긴 정답보다 훨씬 많고 싸지만 편향돼 있어요 · 위치 기반 모델은 클릭을 그 순위를 볼 확률과 관련 있을 확률의 곱으로 봐요', 'click logs are far larger and cheaper than human judgments but biased; the position-based model treats a click as the chance of seeing that rank times the chance of relevance'], ['1위의 dX는 클릭률 30%, 4위의 dY는 6%지만, 볼 확률 0.9와 0.2로 나누면 관련성은 0.33과 0.30으로 비슷해요', 'dX at rank 1 has a 30% click rate and dY at rank 4 has 6%, but dividing by their chances of being seen, 0.9 and 0.2, gives similar relevance of 0.33 and 0.30'], ['학습할 때는 클릭마다 볼 확률의 역수로 가중해요(역성향 가중, IPS) · 드물게 보이는 위치의 클릭이 더 크게 쳐져서 기대값에서 편향이 사라져요', 'during training each click is weighted by the inverse of its chance of being seen (inverse propensity scoring, IPS), so clicks at rarely seen positions count more and the bias cancels in expectation'], ['볼 확률은 상위 결과를 가끔 무작위로 섞는 실험으로 추정해요 · 위에서부터 훑다 만족하면 멈춘다는 캐스케이드 모델 같은 다른 클릭 모델도 있어요', 'the chances of being seen are estimated by occasionally swapping top results, and other click models exist, such as the cascade model, in which users scan from the top and stop once satisfied']],
    fin: [['클릭 = 봄 × 관련 · 볼 확률의 역수로 가중해 편향 보정', 'a click is seen × relevant; weighting by the inverse chance of being seen removes the bias', 'irx-xs irx-a'], ['반사실적 LTR은 로그만으로 순위 모델을 배워요', 'counterfactual LTR learns rankers from logs alone'], ['신뢰 편향, 표현 편향 같은 다른 편향도 있어요', 'trust bias and presentation bias also exist']],
    caps: [['볼 확률', 'Examination'], ['편향 보정', 'Debiasing'], ['역성향 가중', 'Inverse propensity weighting'], ['추정과 클릭 모델', 'Estimation and click models'], ['클릭 데이터와 편향', 'Clicks and their biases']]
  });
}

function sDense() {
  const QV = ['.6', '.1', '.7', '.2'], DV = ['.5', '.2', '.8', '.1'], MX = [['.90', '.12', '.25'], ['.15', '.77', '.05'], ['.30', '.12', '.69']];
  return CW('ir-dense', {
    code: [['q, D = enc_q(query), enc_d(docs)  # 따로 인코딩', 'q, D = enc_q(query), enc_d(docs)  # apart'], ['scores = q @ D.T                  # 내적', 'scores = q @ D.T                  # dot'], 'loss = cross_entropy(Q @ D.T / tau, arange(B))', ['# 배치 안의 다른 문서가 음성 예시', '# other docs in the batch are negatives'], ['# 문서 벡터는 미리 계산해 ANN 색인에 저장', '# doc vectors go into an ANN index']],
    hl: [[0, 1, 'accent'], [1, 1, 'ok'], [2, 2, 'warn'], [4, 1]],
    draw: (S) => {
      box2(S, 'qt', 19.0, .3, 6.0, 1.0, 'how to fix a flat tire', 'accent', 1);
      box2(S, 'dt', 25.3, .3, 6.0, 1.0, 'patch a punctured tube', 'warn', 1);
      [[22.0, 'enc_q', 'accent', QV, 19.2], [28.3, 'enc_d', 'warn', DV, 25.5]].forEach(([cx, n, c, v, vx], i) => { arw(S, 'ea' + i, [cx, 1.4], [cx, 2.0], 1); chip(S, 'en' + i, cx - 1.5, 2.1, 3.0, n, c, 1, { h: .9 }); arw(S, 'eb' + i, [cx, 3.1], [cx, 3.7], 1); v.forEach((t, j) => chip(S, 'v' + i + '_' + j, vx + j * 1.45, 3.8, 1.25, t, c, 1, { h: .8 })); });
      F(S, 'dp', 19.0, 5.0, 'q · d = .30 + .02 + .56 + .02 = 0.90', 'g', 2, { w: 12.4 });
      lbl(S, 'l2', 19.0, 5.75, ['공유 단어가 없어 BM25는 0이지만 의미가 가까워요', 'no shared words (BM25 = 0), yet close in meaning'], 'g', 2, { w: 12.4 });
      ['d1', 'd2', 'd3'].forEach((t, j) => T(S, 'mh' + j, 21.6 + j * 2.3, 7.4, t, 'cz-mono cz-tc irx-xs irx-w', 3, { w: 2.0 }));
      MX.forEach((r, i) => { T(S, 'mq' + i, 19.0, 8.2 + i * .9, 'q' + (i + 1), 'cz-mono irx-xs irx-a', 3, { w: 1.6 }); r.forEach((t, j) => chip(S, 'm' + i + '_' + j, 21.6 + j * 2.3, 8.1 + i * .9, 2.0, t, i === j ? 'ok' : 'ink-3', 3, { h: .8 })); });
      lbl(S, 'l3', 19.0, 11.0, ['대각선(정답 쌍)은 높이고 나머지는 낮추게 학습해요', 'training raises the diagonal (true pairs) and lowers the rest'], 'w', 3, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['질의와 문서를 따로 인코딩 → 문서 벡터는 미리 계산해 둬요', 'queries and documents are encoded separately, so document vectors are precomputed'], 'a', 1, { w: 16.0 });
      lbl(S, 'm3', 1, 8.6, ['BM25가 높게 준 오답(어려운 음성)을 섞으면 더 잘 배워요', 'mixing in hard negatives that BM25 ranks highly sharpens training'], 'w', 3, { w: 16.0 });
      lbl(S, 'm4', 1, 10.0, ['상품 코드, 고유명사 같은 정확한 일치에는 약해 BM25와 섞어 써요(하이브리드)', 'weak on exact matches such as product codes and names, so it is mixed with BM25 (hybrid)'], 'r', 4, { w: 16.0 });
    },
    notes: [['밀집 검색은 질의와 문서를 각각의 인코더로 수백 차원 벡터로 바꿔요(바이인코더) · 문서 벡터는 미리 계산해 둘 수 있어요', 'dense retrieval maps queries and documents to vectors of a few hundred dimensions with separate encoders (a bi-encoder), so document vectors can be computed in advance'], ['관련성은 두 벡터의 내적이에요 · fix a flat tire와 patch a punctured tube는 공유 단어가 없어 BM25는 0이지만 내적은 0.90으로 높아요', 'relevance is the dot product of the two vectors: fix a flat tire and patch a punctured tube share no words, so BM25 gives 0, but the dot product is a high 0.90'], ['대조 학습으로 훈련해요 · 배치 안의 질의-정답 쌍은 점수를 높이고, 다른 질의의 정답은 음성으로 써서 낮춰요 · BM25가 높게 준 오답을 섞으면 더 잘 배워요', 'it is trained contrastively: scores of true query–document pairs in a batch go up while the other queries’ documents serve as negatives and go down, and hard negatives that BM25 ranks highly sharpen training'], ['의미는 잘 잡지만 상품 코드나 고유명사 같은 정확한 일치와 학습하지 않은 분야에는 약해서, BM25 결과와 섞는 하이브리드 검색을 많이 써요', 'it captures meaning well but is weak on exact matches such as product codes and names and on unfamiliar domains, so hybrid search that blends in BM25 results is common']],
    fin: [['바이인코더: 따로 인코딩 → 내적 → 대조 학습', 'a bi-encoder encodes separately, scores by dot product and trains contrastively', 'irx-xs irx-a'], ['DPR, E5, BGE 같은 모델이 대표적이에요', 'DPR, E5 and BGE are well-known examples'], ['함께 인코딩하는 크로스 인코더는 정확하지만 느려 재순위에 써요', 'cross-encoders, which read query and document together, are more accurate but slow, so they rerank']],
    caps: [['두 개의 인코더', 'Two encoders'], ['내적으로 점수', 'Scoring by dot product'], ['배치 내 음성', 'In-batch negatives'], ['하이브리드', 'Hybrid search'], ['밀집 검색', 'Dense retrieval']]
  });
}

function sHNSW() {
  const LY = [['L2', 1.1, [20.6, 27.0]], ['L1', 2.9, [20.6, 23.5, 27.0, 29.5]], ['L0', 4.7, [20.6, 21.6, 22.5, 23.5, 24.6, 25.4, 27.0, 28.1, 29.5, 30.6]]], QX = 25.75;
  return CW('ir-ann', {
    code: [['ep = entry_point                   # 맨 위 층', 'ep = entry_point                   # top layer'], 'for layer in range(top, 0, -1):', ['    ep = greedy(q, ep, layer)      # 탐욕 이동', '    ep = greedy(q, ep, layer)      # greedy'], ['return search_layer(q, ep, 0, ef)  # 맨 아래 층', 'return search_layer(q, ep, 0, ef)  # bottom'], ['# M: 이웃 수 · ef: 후보 폭 → 정확도 ↔ 속도', '# M: neighbors, ef: beam → recall vs speed']],
    hl: [[0, 1, 'accent'], [0, 1, 'accent'], [1, 3, 'ok'], [4, 1, 'warn']],
    draw: (S) => {
      LY.forEach(([n, y, xs], i) => { rect(S, 'lb' + i, 19.0, y - .7, 12.4, 1.4, 'ink-3', 8, 1, { r: .2 }); T(S, 'ln' + i, 19.2, y - .3, n, 'cz-mono irx-xs', 1, { w: 1.0 }); hl(S, 'le' + i, xs[0], xs[xs.length - 1], y, 'ink-3', 1, { w: .05 }); xs.forEach((x, j) => pt(S, 'p' + i + '_' + j, x, y, 1, C.soft, .16)); });
      T(S, 'ep', 19.9, .05, 'entry', 'cz-mono cz-tc irx-tiny irx-a', 1, { w: 1.4 });
      vl(S, 'qv', QX, .5, 5.4, 'danger', 2, { w: .05, dash: 1 }); pt(S, 'qp', QX, 4.7, 2, C.badf, .14); T(S, 'qt', QX - .7, 5.55, 'q', 'cz-mono cz-tc irx-xs irx-r', 2, { w: 1.4 });
      arw(S, 'gm2', [20.85, .75], [26.75, .75], 3, { color: 'ok' }); arw(S, 'gd2', [27.0, 1.3], [27.0, 2.7], 3, { color: 'ok' }); arw(S, 'gd1', [27.0, 3.1], [27.0, 4.5], 3, { color: 'ok' }); arw(S, 'gm0', [26.8, 5.1], [25.6, 5.1], 3, { color: 'ok' });
      pt(S, 'rs', 25.4, 4.7, 3, C.okf, .2);
      lbl(S, 'l1', 19.0, 6.2, ['위층일수록 노드가 적고 링크가 길어요 (1차원으로 단순화)', 'higher layers have fewer nodes and longer links (simplified to 1-D)'], 'a', 1, { w: 12.4 });
      lbl(S, 'l3', 19.0, 7.6, ['위층에서 크게 이동하고, 내려가며 세밀하게 좁혀 가장 가까운 25.4에 도착', 'big jumps on top, finer steps on the way down, ending at the nearest point, 25.4'], 'g', 3, { w: 12.4 });
      lbl(S, 'l4', 19.0, 9.0, ['ef를 키우면 정확도는 오르고 속도는 느려져요 · 그래프는 메모리를 많이 써요', 'a larger ef raises recall and slows search, and the graph is memory-hungry'], 'w', 4, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['정확한 kNN은 질의마다 벡터 N개와 모두 비교해서, 10억 개면 너무 느려요', 'exact kNN compares the query with all N vectors, far too slow at a billion'], 'r', 1, { w: 16.0 });
      lbl(S, 'm2', 1, 8.6, ['질의 q와 가까운 점을 찾는 것이 목표 (근사 최근접 이웃, ANN)', 'the goal is points close to the query q (approximate nearest neighbors, ANN)'], 'r', 2, { w: 16.0 });
      lbl(S, 'm4', 1, 10.2, ['IVF(클러스터), PQ(압축), DiskANN(디스크)과 함께 벡터 DB의 핵심이에요', 'with IVF clustering, PQ compression and disk-based DiskANN, it is the core of vector databases'], 'g', 4, { w: 16.0 });
    },
    notes: [['밀집 검색은 질의 벡터와 가장 가까운 문서 벡터를 찾아야 해요 · 10억 개와 모두 비교하면 너무 느려서, 약간의 정확도를 내주고 빠르게 찾는 근사 최근접 이웃(ANN)을 써요', 'dense retrieval must find the document vectors nearest the query; comparing against a billion is too slow, so approximate nearest neighbor (ANN) search trades a little accuracy for speed'], ['HNSW는 여러 층의 근접 그래프예요 · 맨 아래 층에는 모든 점이 가까운 이웃과 연결돼 있고, 위층으로 갈수록 무작위로 뽑힌 적은 점이 긴 링크로 이어져요(스킵 리스트와 비슷)', 'HNSW is a multi-layer proximity graph: the bottom layer links every point to its near neighbors, and each higher layer holds a random sparser subset joined by longer links, much like a skip list'], ['맨 위 층의 진입점에서 시작해 질의에 더 가까운 이웃으로 탐욕적으로 옮기고, 더 못 가까워지면 한 층 내려가요 · 맨 아래 층에서 후보 폭 ef만큼 탐색해 가장 가까운 점들을 돌려줘요', 'starting from the entry point on the top layer, the search greedily moves to neighbors closer to the query and drops a layer when it can get no closer, then explores the bottom layer with a beam of width ef to return the nearest points'], ['이웃 수 M과 탐색 폭 ef를 키우면 정확도(recall)는 오르고 속도와 메모리는 나빠져요 · 클러스터로 나누는 IVF, 압축하는 PQ와 함께 벡터 DB의 핵심 기술이에요', 'raising the neighbor count M and the beam ef increases recall at the cost of speed and memory; with IVF clustering and PQ compression, it is a core technique of vector databases']],
    fin: [['HNSW: 층마다 탐욕 이동으로 내려가는 근접 그래프 탐색', 'HNSW descends a layered proximity graph by greedy moves', 'irx-xs irx-a'], ['정확한 답 대신 recall@k로 품질을 재요', 'quality is measured as recall@k against exact search'], ['FAISS, Lucene, pgvector 등이 HNSW를 지원해요', 'FAISS, Lucene and pgvector all support HNSW']],
    caps: [['정확한 kNN의 한계', 'The cost of exact kNN'], ['층 구조 그래프', 'A layered graph'], ['탐욕 하강', 'Greedy descent'], ['정확도와 속도', 'Recall versus speed'], ['근사 최근접 이웃: HNSW', 'Approximate nearest neighbors: HNSW']]
  });
}

function sPQ() {
  const XV = ['.2', '-.4', '.9', '0', '-.2', '.7', '.5', '-.1'], GC = ['accent', 'warn', 'ok', 'danger'], CD = ['17', '203', '64', '9'], TV = ['.12', '.31', '.05', '.22'], GX = j => 19.0 + j * 3.0;
  return CW('ir-pq', {
    code: [['subs = np.split(x, m)           # m조각', 'subs = np.split(x, m)           # m pieces'], ['code = [C[j].nearest(s)         # 가장 가까운', 'code = [C[j].nearest(s)         # nearest'], '        for j, s in enumerate(subs)]', 'T = [C[j].dists(qs[j]) for j in range(m)]', 'd = sum(T[j][c] for j, c in enumerate(code))'],
    hl: [[0, 1, 'accent'], [1, 2, 'warn'], [3, 2, 'ok'], [0, 5]],
    draw: (S) => {
      XV.forEach((t, i) => chip(S, 'x' + i, 19.0 + i * 1.5, .5, 1.4, t, GC[Math.floor(i / 2)], 1, { h: .8 }));
      [0, 1, 2, 3].forEach(j => T(S, 'sn' + j, GX(j), 1.45, ['부분 ' + (j + 1), 'piece ' + (j + 1)], 'cz-tc irx-tiny', 1, { w: 2.9 }));
      [0, 1, 2, 3].forEach(j => { arw(S, 'ca' + j, [GX(j) + 1.45, 2.0], [GX(j) + 1.45, 2.7], 2); chip(S, 'cd' + j, GX(j) + .25, 2.8, 2.4, CD[j], GC[j], 2, { h: .9 }); });
      lbl(S, 'l2', 19.0, 4.0, ['부분마다 코드북 256개 중심 가운데 가장 가까운 번호 (1바이트)', 'each piece becomes the ID of its nearest of 256 codebook centroids (1 byte)'], 'w', 2, { w: 12.4 });
      [0, 1, 2, 3].forEach(j => T(S, 'tv' + j, GX(j), 5.5, 'T' + (j + 1) + ' → ' + TV[j], 'cz-mono cz-tc irx-tiny irx-g', 3, { w: 2.9 }));
      F(S, 'ds', 19.0, 6.4, 'd(q, x) ≈ .12 + .31 + .05 + .22 = 0.70', 'g', 3, { w: 12.4 });
      lbl(S, 'l4a', 19.0, 7.6, ['768차원 float32 = 3,072바이트 → m = 96이면 96바이트 (32배 압축)', '768-dim float32 = 3,072 bytes → 96 bytes with m = 96 (32× smaller)'], 'a', 4, { w: 12.4 });
      lbl(S, 'l4b', 19.0, 9.0, ['IVF: 먼저 가까운 클러스터 nprobe개만 골라 그 안에서 PQ 거리를 계산', 'IVF first picks the nprobe nearest clusters and computes PQ distances only inside them'], 'w', 4, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['벡터 10억 개 × 768차원 float32 ≈ 3TB → 메모리에 안 들어가요', 'a billion 768-dim float32 vectors take about 3 TB, too much for memory'], 'r', 1, { w: 16.0 });
      lbl(S, 'm3', 1, 8.6, ['질의는 압축하지 않고, 부분마다 256개 중심까지의 거리 표를 한 번 만들면 이후엔 더하기만', 'the query stays uncompressed: one table of distances to the 256 centroids per piece, then only additions'], 'g', 3, { w: 16.0 });
      lbl(S, 'm4', 1, 10.2, ['FAISS의 IVF-PQ, ScaNN, DiskANN이 이런 압축과 색인을 결합해요', 'FAISS’s IVF-PQ, ScaNN and DiskANN combine such compression with indexing'], '', 4, { w: 16.0 });
    },
    notes: [['10억 개의 768차원 벡터는 float32로 약 3TB라 메모리에 담기 어려워요 · 곱 양자화(PQ)는 벡터를 m개의 부분 벡터로 나눠요', 'a billion 768-dimensional float32 vectors take about 3 TB, hard to hold in memory, so product quantization (PQ) first splits each vector into m subvectors'], ['부분마다 k-평균으로 만든 256개 중심(코드북) 중 가장 가까운 중심의 번호 하나, 즉 1바이트로 바꿔요 · 8차원 벡터가 4바이트 코드 [17, 203, 64, 9]가 돼요', 'each subvector is replaced by the ID of its nearest of 256 centroids learned by k-means (its codebook), one byte, so an 8-dimensional vector becomes the 4-byte code [17, 203, 64, 9]'], ['질의는 압축하지 않고 부분마다 256개 중심까지의 거리 표를 한 번 만들어요 · 그러면 각 문서와의 거리는 코드로 표를 찾아 더하기만 하면 돼서 0.70처럼 아주 빠르게 근사해요', 'the query stays uncompressed and builds, once, a table of distances to the 256 centroids for each piece; the distance to any document is then just table lookups and additions, such as 0.70'], ['768차원 float32 3,072바이트가 m = 96이면 96바이트로 32배 작아져요 · 가까운 클러스터만 보는 IVF와 합친 IVF-PQ가 대규모 벡터 검색의 기본이에요', 'with m = 96, the 3,072 bytes of a 768-dimensional float32 vector shrink 32-fold to 96 bytes, and IVF-PQ, which adds IVF’s search of only the nearest clusters, is a staple of large-scale vector search']],
    fin: [['PQ: 부분 벡터마다 코드북 번호로 압축하고 거리는 표 찾기로', 'PQ compresses each subvector to a codebook ID and computes distances by table lookup', 'irx-xs irx-a'], ['압축할수록 정확도가 떨어져 원본으로 재순위하기도 해요', 'heavier compression costs accuracy, so results may be reranked with full vectors'], ['스칼라 양자화(int8)와 이진 양자화도 많이 써요', 'scalar (int8) and binary quantization are popular too']],
    caps: [['부분 벡터', 'Subvectors'], ['코드북 번호', 'Codebook IDs'], ['거리 표', 'Distance tables'], ['압축률과 IVF', 'Compression and IVF'], ['곱 양자화(PQ)', 'Product quantization (PQ)']]
  });
}

function sSplade() {
  const DW = [['bike', 1.4, 0], ['tube', 1.2, 0], ['punctured', 1.1, 0], ['tire', .9, 1], ['bicycle', .8, 1], ['repair', .7, 1], ['flat', .6, 1]], QW = [['tire', 1.5, 0], ['flat', 1.3, 0], ['fix', 1.2, 0], ['repair', .5, 1]];
  return CW('ir-splade', {
    code: [['logits = mlm_head(bert(text))       # 토큰×어휘', 'logits = mlm_head(bert(text))       # vocab'], ['w = log1p(relu(logits)).max(dim=0)  # 가중치', 'w = log1p(relu(logits)).max(dim=0)  # weights'], ['loss = rank_loss + lam * flops(w)   # 희소 규제', 'loss = rank_loss + lam * flops(w)   # sparsity'], 'score = sum(qw[t] * dw[t] for t in qw)', ['# 역색인에 그대로 넣어 BM25처럼 검색', '# stored in an inverted index, like BM25']],
    hl: [[0, 2, 'accent'], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    draw: (S) => {
      box2(S, 'dt', 19.0, .3, 6.0, .9, 'd: punctured bike tube', 'accent', 1);
      box2(S, 'qt', 25.4, .3, 6.0, .9, 'q: fix flat tire', 'warn', 3);
      DW.forEach(([t, v, e], i) => { const y = 1.55 + i * .62, st = e ? 2 : 1, c = e ? 'warn' : 'accent'; T(S, 'dn' + i, 19.0, y - .05, t, 'cz-mono irx-tiny', st, { w: 3.0 }); hbar(S, 'db' + i, 22.2, y, v * 3.2, c, st, { h: .45 }); T(S, 'dv' + i, 22.4 + v * 3.2, y - .05, v.toFixed(1), 'cz-mono irx-tiny', st, { w: 1.2 }); });
      QW.forEach(([t, v, e], i) => { const y = 1.55 + i * .62; T(S, 'qn' + i, 28.0, y - .05, t, 'cz-mono irx-tiny' + (e ? ' irx-w' : ''), 3, { w: 2.0 }); T(S, 'qv' + i, 30.0, y - .05, v.toFixed(1), 'cz-mono irx-tiny', 3, { w: 1.2 }); });
      lbl(S, 'l2', 19.0, 6.2, ['원문에 없는 tire, repair, flat으로 확장했어요', 'expanded to tire, repair and flat, which the text never says'], 'w', 2, { w: 12.4 });
      F(S, 'sc', 19.0, 7.5, 'score = 1.5·0.9 + 1.3·0.6 + 0.5·0.7 = 2.48', 'g', 4, { w: 12.4 });
      lbl(S, 'l4', 19.0, 8.5, ['공유 단어가 없는 BM25는 0 · 겹치는 단어만 곱해 더해요', 'BM25 scores 0 with no shared words; only overlapping terms are multiplied and summed'], 'g', 4, { w: 12.4 });
      lbl(S, 'm1', 1, 7.0, ['BERT의 언어 모델 머리가 어휘 약 3만 단어 각각의 가중치를 내요', 'BERT’s language-model head scores each of its roughly 30,000 vocabulary words'], 'a', 1, { w: 16.0 });
      lbl(S, 'm2', 1, 8.6, ['대부분은 0이 되도록 규제해 희소하게 · 남은 단어는 확장과 재가중', 'regularized so most weights are 0; the rest expand and reweight terms'], 'w', 2, { w: 16.0 });
      lbl(S, 'm3', 1, 10.0, ['질의도 같은 방식으로 바꿔요 · fix에서 repair가 나와요', 'queries are encoded the same way, so fix also yields repair'], '', 3, { w: 16.0 });
      lbl(S, 'm4', 1, 11.4, ['정확한 일치와 의미 매칭을 함께 · 해석 가능하고 기존 역색인을 그대로 써요', 'exact and semantic matching at once, interpretable, and runs on existing inverted indexes'], 'g', 4, { w: 16.0 });
    },
    notes: [['학습된 희소 표현은 단어 가중치 벡터를 신경망으로 만들어요 · SPLADE는 BERT의 언어 모델 머리로 어휘 약 3만 단어 각각에 대한 가중치를 내요', 'learned sparse retrieval builds term-weight vectors with a neural network: SPLADE uses BERT’s masked-language-model head to score every word of its roughly 30,000-word vocabulary'], ['대부분의 가중치가 0이 되도록 규제해 희소하게 만들면, 문서에 없는 tire, repair, flat 같은 관련 단어가 확장되고 원래 단어의 중요도도 다시 매겨져요', 'regularization drives most weights to 0, leaving a sparse vector that expands to related words absent from the text, such as tire, repair and flat, and reweights the original terms'], ['질의도 같은 방식으로 바꿔서 fix에서 repair 같은 단어가 나와요', 'queries are encoded the same way, so fix also produces words such as repair'], ['점수는 겹치는 단어의 가중치 곱의 합이라 1.5 × 0.9 + 1.3 × 0.6 + 0.5 × 0.7 = 2.48이에요 · 공유 단어가 없어 BM25는 0이지만, 역색인에 그대로 넣어 BM25처럼 빠르게 검색해요', 'the score sums the products of weights over shared terms, 1.5 × 0.9 + 1.3 × 0.6 + 0.5 × 0.7 = 2.48; BM25 gives 0 with no shared words, yet the vectors fit a standard inverted index and search as fast as BM25']],
    fin: [['학습된 희소 표현: 신경망이 정한 단어 가중치 + 확장', 'learned sparse retrieval: neural term weights plus expansion', 'irx-xs irx-a'], ['SPLADE, uniCOIL, doc2query가 대표적이에요', 'SPLADE, uniCOIL and doc2query are leading examples'], ['토큰마다 벡터를 두는 ColBERT는 또 다른 중간 지점이에요', 'ColBERT, with a vector per token, is another middle ground']],
    caps: [['어휘 가중치', 'Vocabulary weights'], ['확장과 희소화', 'Expansion and sparsity'], ['질의 인코딩', 'Encoding the query'], ['역색인으로 검색', 'Searching an inverted index'], ['학습된 희소 검색(SPLADE)', 'Learned sparse retrieval (SPLADE)']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('ir-index', '색인', 'Indexing', '찾기 쉽게 미리 정리하기', 'Organizing for fast lookup', '단어에서 문서로 가는 역색인, 토큰화와 어간 추출 같은 텍스트 분석, 포스팅 교집합으로 하는 불리언 검색, 구절을 찾는 위치 색인, 간격과 가변 바이트로 하는 색인 압축을 봐요.', 'The inverted index from terms to documents, text analysis such as tokenization and stemming, Boolean search by posting intersection, positional indexes for phrases, and index compression with gaps and variable-byte codes.', [
    item('ir-invindex', '역색인', 'The inverted index',
      '역색인은 단어마다 그 단어가 나오는 문서 번호 목록(포스팅 리스트)을 저장해요. 질의 단어의 포스팅만 읽으면 되어 문서가 많아도 빨라요.',
      '책 뒤의 찾아보기처럼, 검색 엔진은 문서를 미리 색인해 둬요. 역색인은 정렬된 사전의 단어마다 그 단어가 나오는 문서 번호 목록, 곧 포스팅 리스트를 문서 번호순으로 저장해요. "new home sales top forecasts", "home sales rise in july", "increase in home sales in july", "july new home sales rise"라는 네 문서라면 home과 sales는 [1, 2, 3, 4], july는 [2, 3, 4], new는 [1, 4]가 돼요. july를 찾을 때는 사전에서 july를 찾아 포스팅 [2, 3, 4]만 읽으면 되고, 모든 문서를 처음부터 훑을 필요가 없어요. 그래서 문서가 수억 개라도 질의 단어들의 포스팅만 읽으면 돼요. 실제 색인은 문서 번호와 함께 단어 빈도와 위치도 저장해 순위 매기기와 구절 검색에 쓰고, 사전은 해시·정렬 배열·트라이로, 포스팅은 압축된 배열로 저장해요. Lucene과 Elasticsearch 같은 검색 엔진이 모두 이 구조 위에 지어졌어요.',
      'An inverted index stores, for each term, the list of documents containing it (its posting list), so only the query terms’ postings need reading however large the collection.',
      'Like the index at the back of a book, a search engine indexes documents ahead of time. An inverted index keeps a sorted dictionary of terms, each pointing to a posting list of the documents that contain it, in document order. For the four documents “new home sales top forecasts”, “home sales rise in july”, “increase in home sales in july” and “july new home sales rise”, home and sales map to [1, 2, 3, 4], july to [2, 3, 4] and new to [1, 4]. Searching for july means finding july in the dictionary and reading only its postings [2, 3, 4], with no need to scan every document, so even hundreds of millions of documents cost only the query terms’ postings. Real indexes also store term frequencies and positions for ranking and phrase search; the dictionary is a hash, sorted array or trie, and postings are compressed arrays. Search engines such as Lucene and Elasticsearch are all built on this structure.', sInv()),
    item('ir-analysis', '텍스트 분석', 'Text analysis',
      '색인 전에 글을 토큰으로 자르고, 대소문자를 맞추고, 불용어를 빼고, 어간을 추출해요. 한국어는 형태소 분석이나 바이그램으로 나눠요.',
      '검색 엔진은 원문을 그대로 색인하지 않고 분석기를 거쳐 단어(토큰)로 바꿔요. "The Runners were RUNNING!"은 토큰화로 The, Runners, were, RUNNING이 되고, 소문자로 통일해 the, runners, were, running이 돼요. the, were처럼 거의 모든 문서에 나와 변별력이 없는 불용어는 빼는데, "to be or not to be" 같은 구절 검색을 위해 요즘은 남기기도 해요. 어간 추출은 runners → runner, running → run처럼 변형을 묶어서 running을 검색해도 runners가 든 문서를 찾게 해 줘요. 다만 university와 universe가 모두 univers가 되는 것처럼 뜻이 다른 단어를 섞기도 해요. 한국어는 "검색엔진을"처럼 조사가 붙고 띄어쓰기가 일정하지 않아, 형태소 분석으로 "검색", "엔진"을 뽑고 조사 "을"을 떼거나, 사전 없이 두 글자씩 자른 바이그램 "검색", "색엔", "엔진", "진을"을 써요. 형태소 분석은 정확하고, 바이그램은 신조어에 강하지만 색인이 커져요. 가장 중요한 원칙은 문서와 질의에 같은 분석기를 쓰는 거예요.',
      'Before indexing, text is tokenized, case-normalized, stripped of stop words and stemmed; Korean is split by morphological analysis or bigrams.',
      'Search engines do not index raw text; an analyzer turns it into terms. Tokenizing “The Runners were RUNNING!” gives The, Runners, were and RUNNING, and lowercasing gives the, runners, were and running. Stop words such as the and were appear in nearly every document and carry little signal, so they are dropped, although many engines now keep them for phrase searches like “to be or not to be”. Stemming groups variants, runners → runner and running → run, so a search for running finds documents containing runners, though it can also conflate different words, as when university and universe both become univers. Korean attaches particles and spaces inconsistently, as in “검색엔진을”, so it is split either by morphological analysis into 검색 and 엔진 with the particle 을 removed, or into dictionary-free two-character bigrams 검색, 색엔, 엔진, 진을; morphology is precise while bigrams handle new words but enlarge the index. The cardinal rule is that documents and queries go through the same analyzer.', sAnalysis()),
    item('ir-boolean', '불리언 검색과 교집합', 'Boolean search and intersection',
      'AND 질의는 정렬된 포스팅 리스트 두 개를 두 포인터로 병합해 교집합을 구해요. O(x + y)이고, 건너뛰기 포인터와 짧은 리스트 우선 처리로 더 빨라져요.',
      '불리언 검색은 AND, OR, NOT으로 조건에 맞는 문서 집합을 구해요. Brutus AND Caesar는 Brutus의 포스팅 [1, 2, 4, 11, 31, 45, 173, 174]와 Caesar의 포스팅 [1, 2, 4, 5, 6, 16, 57, 132]의 교집합이에요. 두 리스트가 문서 번호순으로 정렬돼 있으므로, 두 포인터를 앞에서부터 움직이며 값이 같으면 결과에 넣고 둘 다 전진하고, 다르면 작은 쪽만 전진해요. 결과는 [1, 2, 4]이고 비교 횟수는 많아야 두 길이의 합이라 O(x + y)예요. OR은 합집합, NOT은 차집합으로 같은 방식으로 병합해요. 포스팅에 √L 간격으로 건너뛰기 포인터를 두면, 상대보다 아직 작을 때 여러 칸을 한 번에 건너뛸 수 있어요. 단어가 여러 개인 AND는 가장 짧은 포스팅부터 교집합해 중간 결과를 작게 유지하는 것이 질의 최적화의 기본이에요. 불리언 검색은 순위가 없어서 오늘날에는 카테고리나 날짜 같은 정밀한 필터에 주로 쓰여요.',
      'An AND query merges two sorted posting lists with two pointers to find their intersection in O(x + y), sped up by skip pointers and processing the shortest lists first.',
      'Boolean retrieval finds the set of documents matching AND, OR and NOT. Brutus AND Caesar is the intersection of Brutus’s postings [1, 2, 4, 11, 31, 45, 173, 174] and Caesar’s [1, 2, 4, 5, 6, 16, 57, 132]. Because both lists are sorted by document number, two pointers move from the front: equal values go into the result and both advance, otherwise only the smaller one advances. The result is [1, 2, 4], and the number of comparisons never exceeds the sum of the lengths, O(x + y). OR (union) and NOT (difference) merge the same way. Skip pointers placed every √L entries let a pointer that is still behind jump several entries at once. For AND queries with many terms, intersecting the shortest lists first keeps intermediate results small, the most basic query optimization. Boolean search has no ranking, so today it mostly serves as a precise filter on attributes such as category or date.', sBool()),
    item('ir-positional', '위치 색인과 구절 검색', 'Positional indexes and phrase queries',
      '위치 색인은 문서마다 단어의 위치 목록을 저장해요. 구절 "to be"는 be의 위치 − 1이 to의 위치에 있는 곳이고, 색인은 2~4배 커져요.',
      '구절 "to be"를 찾으려면 두 단어가 같은 문서에 있는지만으로는 부족하고, 붙어서 나오는지 알아야 해요. 위치 색인은 포스팅에 문서 번호와 함께 그 문서 안에서 단어가 나온 위치 목록을 저장해요. 문서 4에서 to의 위치가 [8, 16, 190, 429, 433], be의 위치가 [17, 191, 291, 430, 434]라면, be의 각 위치에서 1을 뺀 [16, 190, 290, 429, 433] 중 to의 위치에도 있는 16, 190, 429, 433의 네 곳에서 구절이 나와요. 이렇게 구절 검색은 위치 목록의 오프셋 교집합이에요. 위치 차이를 k 이하로 허용하면 "to /3 be" 같은 근접 검색이 되고, 위치는 검색 결과에서 검색어를 강조하는 데도 써요. 대가는 크기라서 위치를 저장하면 색인이 2~4배 커지고, 자주 쓰는 구절은 "to be" 자체를 한 단어처럼 색인하는 바이워드 색인으로 따로 두기도 해요.',
      'A positional index stores each term’s positions per document; the phrase “to be” occurs wherever a position of be minus one is a position of to, at the cost of a 2–4× larger index.',
      'Finding the phrase “to be” requires knowing not just that both words occur in a document but that they occur next to each other. A positional index stores, alongside each document number in a posting, the list of positions where the term appears. If in document 4 to appears at [8, 16, 190, 429, 433] and be at [17, 191, 291, 430, 434], subtracting 1 from each position of be gives [16, 190, 290, 429, 433], and the phrase occurs at the four positions also found for to: 16, 190, 429 and 433. A phrase query is thus an offset intersection of position lists. Allowing a gap of up to k gives proximity queries such as “to /3 be”, and positions also drive the highlighting of query terms in results. The cost is size, as positions make the index 2–4 times larger, so frequent phrases are sometimes indexed as single terms in a separate biword index.', sPos()),
    item('ir-compress', '색인 압축', 'Index compression',
      '포스팅에는 문서 번호 대신 앞 번호와의 간격을 저장하고, 가변 바이트 같은 가변 길이 부호로 작은 수를 짧게 써요. 색인이 작아지면 오히려 빨라져요.',
      '포스팅의 문서 번호는 크지만 서로 가까운 경우가 많아요. 그래서 번호 대신 앞 번호와의 차이(gap)를 저장하면 283047, 283154, 283159, 283202가 283047, 107, 5, 43으로 바뀌어 작은 수가 많아져요. 가변 바이트(VByte) 부호는 수를 7비트씩 끊어 한 바이트에 하나씩 담고, 마지막 바이트의 맨 앞 비트를 1로 표시해 끝을 알려요. 107, 5, 43은 각각 1바이트, 283047은 3바이트라 모두 6바이트로, 4바이트 정수 4개인 16바이트의 절반도 안 돼요. 자주 나오는 단어일수록 간격이 작아 압축이 더 잘 돼요. 압축 해제는 디스크나 메모리에서 데이터를 읽는 것보다 빨라서, 색인이 작아지면 메모리에 더 많이 올라가고 읽을 양이 줄어 검색이 오히려 빨라져요. 비트 단위의 감마 코드는 더 작게 만들지만 디코딩이 느리고, 실무 엔진은 Lucene처럼 128개씩 블록으로 묶어 SIMD로 빠르게 푸는 PForDelta 계열 부호를 써요.',
      'Postings store gaps between document numbers instead of the numbers, with variable-length codes such as VByte writing small values in few bytes; a smaller index is also faster.',
      'Document numbers in postings are large but often close together, so storing the difference from the previous number instead turns 283047, 283154, 283159, 283202 into 283047, 107, 5, 43, mostly small values. Variable-byte (VByte) coding splits a number into 7-bit chunks, one per byte, and sets the leading bit of the last byte to mark the end. 107, 5 and 43 take one byte each and 283047 three, six bytes in all, less than half of the 16 bytes for four 4-byte integers. The more frequent the term, the smaller its gaps and the better it compresses. Decompression is faster than reading data from disk or even memory, so a smaller index keeps more in memory, reads less and makes search faster. Bit-level gamma codes compress further but decode slowly, and production engines such as Lucene use PForDelta-style codecs over blocks of 128 entries that decode quickly with SIMD instructions.', sComp())
  ]),
  sec('ir-rank', '순위 모델', 'Ranking models', '무엇이 더 관련 있는가', 'What makes a document relevant', '단어 빈도와 희귀성을 곱하는 TF-IDF, 벡터 사이 각도로 비교하는 벡터 공간 모델, 포화와 길이 보정을 더한 BM25, 문서 언어 모델의 질의 우도, 사용자 피드백으로 질의를 고치는 로키오, 제목과 본문을 함께 쓰는 BM25F를 봐요.', 'TF-IDF, which multiplies frequency and rarity, the vector space model with cosine similarity, BM25 with saturation and length normalization, query likelihood with document language models, Rocchio relevance feedback, and BM25F across title and body fields.', [
    item('ir-tfidf', 'TF-IDF', 'TF-IDF',
      '문서 안에서 자주 나오고(tf), 전체 문서에서는 드물게 나오는(idf) 단어일수록 점수를 많이 줘요. 질의 단어마다 (1 + log tf) × log(N/df)를 더해요.',
      '관련 있는 문서는 질의 단어를 자주 포함하지만, 모든 단어가 같은 가치를 갖지는 않아요. 역문서 빈도 idf = log(N/df)는 단어가 나오는 문서 수 df가 적을수록 커져서, 1,000개 문서 중 10개에만 나오는 jaguar는 2, 100개의 speed는 1, 모든 문서에 나오는 the는 0이에요. 단어 빈도 tf는 많이 나올수록 관련성이 높다는 신호지만 비례하지는 않아서 1 + log tf로 완만하게 써요. 20번 나와도 20배가 아니라 2.3이죠. 질의 "jaguar speed"에 대해 jaguar 3번, speed 1번인 문서 A는 1.48 × 2 + 1 × 1 = 3.95, jaguar 1번, speed 5번인 B는 2 + 1.70 = 3.70, speed만 10번인 C는 2.00점이에요. the는 아무리 많이 나와도 idf가 0이라 점수에 영향이 없어요. 다만 긴 문서는 단어가 많아 불리하지 않게 보정해야 해서 코사인 정규화나 BM25로 이어져요. 로그의 밑과 정규화 방식에 따라 변형이 많아 SMART 표기법으로 구분해요.',
      'Terms that are frequent in a document (tf) but rare in the collection (idf) earn the most: each query term adds (1 + log tf) × log(N/df).',
      'Relevant documents contain the query terms often, but not every term is equally valuable. Inverse document frequency idf = log(N/df) grows as the number of documents containing the term shrinks: among 1,000 documents, jaguar, found in 10, gets 2, speed (100) gets 1 and the, found everywhere, gets 0. Term frequency signals relevance but not proportionally, so it is damped to 1 + log tf: 20 occurrences count 2.3, not 20. For the query “jaguar speed”, document A with jaguar 3 times and speed once scores 1.48 × 2 + 1 × 1 = 3.95, B with jaguar once and speed 5 times 2 + 1.70 = 3.70, and C with speed 10 times only 2.00. However often the appears, its idf of 0 adds nothing. Long documents still gain from containing more terms, which calls for length normalization such as cosine or BM25. Variants in log base and normalization abound and are labeled with SMART notation.', sTFIDF()),
    item('ir-vsm', '벡터 공간 모델', 'The vector space model',
      '문서와 질의를 단어 축 위의 TF-IDF 벡터로 보고 코사인 유사도로 비교해요. 길이로 나눠 방향만 보므로 긴 문서가 부당하게 유리해지지 않아요.',
      '벡터 공간 모델은 어휘의 단어마다 축이 하나인 공간에서 문서와 질의를 TF-IDF 벡터로 나타내요. jaguar와 speed 두 축만 보면 질의 q = (1, 1)과 문서 A = (2.95, 1.00), B = (2.00, 1.70), C = (0, 2.00)이 평면 위의 화살표가 돼요. 코사인 유사도는 내적을 두 벡터의 길이로 나눠 방향만 비교해요. A는 0.90, B는 0.997, C는 0.71로, 단순 합과 달리 질의와 방향이 가장 비슷한 B가 1등이에요. 길이 정규화의 효과는 A를 10번 이어 붙인 긴 문서 D에서 보여요. 내적은 6.95로 A의 1.8배지만 코사인은 0.92로 A와 비슷해서, 길이 때문에 점수가 부풀지 않아요. 실제 공간은 어휘 수만큼, 수십만 차원이고 벡터는 대부분 0인 희소 벡터예요. 코사인은 긴 문서를 지나치게 깎는 경향이 있어 피벗 길이 정규화와 BM25 같은 개선이 나왔고, 밀집 임베딩 검색도 같은 코사인 아이디어를 써요.',
      'Documents and queries become TF-IDF vectors over term axes and are compared by cosine similarity, which divides out length so long documents gain no unfair advantage.',
      'The vector space model represents documents and queries as TF-IDF vectors in a space with one axis per vocabulary term. Looking only at the jaguar and speed axes, the query q = (1, 1) and documents A = (2.95, 1.00), B = (2.00, 1.70) and C = (0, 2.00) are arrows in a plane. Cosine similarity divides the dot product by both lengths to compare directions alone: A scores 0.90, B 0.997 and C 0.71, so B, whose direction is closest to the query, ranks first, unlike with the raw sum. Length normalization shows in a long document D made of A repeated ten times: its dot product of 6.95 is 1.8 times A’s, yet its cosine of 0.92 is close to A’s, so length does not inflate the score. Real spaces have hundreds of thousands of dimensions, one per term, and the vectors are mostly zeros. Cosine tends to over-penalize long documents, which led to pivoted length normalization and BM25, and dense embedding search relies on the same cosine idea.', sVSM()),
    item('ir-bm25', 'BM25', 'BM25',
      'BM25는 단어 빈도를 k1 + 1로 포화시키고 문서 길이를 b로 보정한 뒤 idf를 곱해요. 검색 엔진의 기본 순위 함수이자 강력한 기준선이에요.',
      'BM25는 확률적 관련성 모형에서 나온 순위 함수로, TF-IDF의 두 약점을 고쳐요. 첫째, 단어 빈도 효과를 tf(k1 + 1)/(tf + K)로 포화시켜요. k1 = 1.2이고 평균 길이 문서라면 1번 나올 때 1.0, 5번이면 1.77, 10번이면 1.96으로 k1 + 1 = 2.2에 수렴해요. 둘째, K = k1(1 − b + b·dl/avgdl)로 문서 길이를 보정해요. b = 0.75일 때 단어가 3번 나오면 평균의 절반 길이 문서에서는 1.76, 평균 길이에서는 1.57, 두 배 길이에서는 1.29로 긴 문서일수록 같은 빈도의 가치가 낮아요. 여기에 idf를 곱해 질의 단어마다 더해요. Lucene식 idf = ln(1 + (N − df + 0.5)/(df + 0.5))로 문서 1,000개 중 jaguar(df 10)는 4.56, speed(df 100)는 2.30이라, jaguar 3번과 speed 1번인 평균 길이 문서 A는 4.56 × 1.57 + 2.30 × 1.00 = 9.46점이에요. k1은 포화 속도(0이면 빈도 무시), b는 길이 보정 강도(0이면 보정 없음)를 정하고 흔히 1.2와 0.75를 써요. Lucene과 Elasticsearch의 기본 순위 함수이고, 신경망 검색 모델이 넘어야 할 강력한 기준선이에요.',
      'BM25 saturates term frequency toward k1 + 1, normalizes document length with b and multiplies by idf: the default ranking function of search engines and a strong baseline.',
      'BM25 is a ranking function derived from the probabilistic relevance framework that fixes two weaknesses of TF-IDF. First, it saturates term frequency as tf(k1 + 1)/(tf + K): with k1 = 1.2 and an average-length document, one occurrence is worth 1.0, five 1.77 and ten 1.96, approaching k1 + 1 = 2.2. Second, K = k1(1 − b + b·dl/avgdl) normalizes for document length: with b = 0.75, three occurrences are worth 1.76 in a half-average document, 1.57 in an average one and 1.29 in one twice as long. Each query term’s value is multiplied by idf and summed. With Lucene’s idf = ln(1 + (N − df + 0.5)/(df + 0.5)) over 1,000 documents, jaguar (df 10) gets 4.56 and speed (df 100) 2.30, so an average-length document A with jaguar 3 times and speed once scores 4.56 × 1.57 + 2.30 × 1.00 = 9.46. k1 controls saturation (0 ignores frequency) and b the strength of length normalization (0 disables it), commonly 1.2 and 0.75. BM25 is the default ranker of Lucene and Elasticsearch and a strong baseline that neural retrieval models must beat.', sBM25()),
    item('ir-lm', '질의 우도 모델', 'The query likelihood model',
      '각 문서를 단어 확률 분포로 보고 질의를 만들어 낼 확률 P(q|d)로 순위를 매겨요. 없는 단어 때문에 확률이 0이 되지 않도록 컬렉션 확률로 평활화해요.',
      '질의 우도 모델은 각 문서를 단어가 나올 확률 분포, 곧 언어 모델로 보고, 그 문서가 질의를 만들어 낼 확률 P(q|d)가 높은 순으로 순위를 매겨요. 길이 200인 문서 A에 jaguar가 3번, speed가 1번 나오면 P(jaguar|A) = 3/200, P(speed|A) = 1/200이에요. 문제는 문서에 없는 단어예요. jaguar가 없는 문서 C는 P(jaguar|C) = 0이라 질의 확률도 0, 로그 점수는 −∞가 되어 질의 단어 하나만 빠져도 완전히 탈락해요. 그래서 컬렉션 전체에서의 단어 확률을 섞는 평활화를 해요. 디리클레 평활화는 P(t|d) = (tf + μ·P(t|C)) / (dl + μ)로, 짧은 문서일수록 컬렉션 확률을 더 많이 섞어요. μ = 100, P(jaguar|C) = 0.0001, P(speed|C) = 0.001로 계산하면 로그 확률의 합은 B −9.77, A −10.21, C −13.70 순이에요. 평활화는 흔한 단어의 영향을 줄여 idf와 비슷한 효과를 내고, 성능은 BM25와 비슷하며 확률 모형이라 다른 정보를 결합하기 좋아요. LLM의 다음 토큰 확률과 같은 "언어 모델"이라는 개념이에요.',
      'Each document is a word distribution, and documents are ranked by the probability P(q|d) of generating the query, smoothed with collection probabilities so missing words do not zero it out.',
      'The query likelihood model treats each document as a probability distribution over words, a language model, and ranks documents by the probability P(q|d) that they generate the query. If a document A of length 200 contains jaguar 3 times and speed once, then P(jaguar|A) = 3/200 and P(speed|A) = 1/200. Missing words are the problem: a document C without jaguar has P(jaguar|C) = 0, so its query probability is 0 and its log score −∞, eliminated by a single missing term. Smoothing therefore mixes in each word’s probability across the whole collection. Dirichlet smoothing uses P(t|d) = (tf + μ·P(t|C)) / (dl + μ), mixing in more collection probability for shorter documents. With μ = 100, P(jaguar|C) = 0.0001 and P(speed|C) = 0.001, the summed log probabilities rank B (−9.77) above A (−10.21) and C (−13.70). Smoothing reduces the influence of common words much as idf does, performance is close to BM25, and the probabilistic form makes it easy to combine other evidence. It is the same “language model” idea as an LLM’s next-token probabilities.', sLM()),
    item('ir-rocchio', '적합성 피드백(로키오)', 'Relevance feedback (Rocchio)',
      '사용자가 표시한 적합 문서 쪽으로 질의 벡터를 당기고 부적합 문서에서 밀어내요. 상위 결과를 적합하다고 가정하면 자동 질의 확장이 돼요.',
      '"jaguar" 같은 질의는 자동차와 동물 사이에서 모호해요. 적합성 피드백은 첫 결과에 대해 사용자가 적합한 문서와 부적합한 문서를 표시하면 그 정보로 질의를 고쳐요. 로키오 알고리즘은 q′ = αq + β·평균(적합) − γ·평균(부적합)으로 질의 벡터를 적합 문서들의 평균 쪽으로 당기고 부적합 문서 평균에서 밀어내요. 자동차와 동물 두 축에서 q = (0.5, 0.5), 적합한 자동차 문서 (0.9, 0.2)와 (0.8, 0.1), 부적합한 동물 문서 (0.1, 0.9)라면, α = 1, β = 0.75, γ = 0.15로 q′ = (1.12, 0.48)이 되어 자동차 쪽을 향해요. 사용자가 표시하지 않아도 상위 k개 결과를 적합하다고 가정하는 가짜(의사) 적합성 피드백을 쓸 수 있는데, 대체로 재현율을 높이지만 상위 결과가 틀리면 질의가 엉뚱한 쪽으로 흘러가요(질의 표류). 결과적으로 질의에 xf, sedan, v8 같은 관련 단어가 더해지는 질의 확장이 돼요. 사용자는 표시를 잘 하지 않으므로 웹 검색에서는 클릭 같은 암묵적 피드백을 대신 활용해요.',
      'The query vector is pulled toward documents the user marked relevant and pushed away from non-relevant ones; assuming the top results are relevant turns this into automatic query expansion.',
      'A query such as “jaguar” is ambiguous between cars and animals. Relevance feedback has the user mark relevant and non-relevant documents among the first results and uses that to improve the query. The Rocchio algorithm computes q′ = αq + β·mean(relevant) − γ·mean(non-relevant), pulling the query vector toward the relevant documents’ mean and away from the non-relevant mean. On car and animal axes, with q = (0.5, 0.5), relevant car documents (0.9, 0.2) and (0.8, 0.1) and a non-relevant animal document (0.1, 0.9), α = 1, β = 0.75 and γ = 0.15 give q′ = (1.12, 0.48), pointing toward cars. Without the user, pseudo relevance feedback assumes the top k results are relevant; it usually improves recall but lets the query drift off topic when those results are wrong. In effect the query is expanded with related terms such as xf, sedan and v8. Since users rarely mark results, web search draws on implicit feedback such as clicks instead.', sRocchio()),
    item('ir-fields', '필드 가중치와 BM25F', 'Field weights and BM25F',
      '제목, 본문, 앵커 텍스트처럼 필드마다 가중치를 줘서 빈도를 합친 뒤 한 번만 포화시켜요(BM25F). 제목과 앵커는 특히 강한 신호예요.',
      '웹 문서는 제목, 본문, URL, 그리고 다른 페이지가 이 페이지에 링크를 걸며 쓴 앵커 텍스트 같은 여러 필드로 이뤄져요. 짧고 요약적인 제목에 단어가 나오면 긴 본문에 나올 때보다 훨씬 강한 신호라서 필드마다 가중치를 줘요. 예를 들어 제목 3, 본문 1, 앵커 2로 두면, BM25F는 가중치를 곱한 빈도를 먼저 합친 뒤(필드별 길이 보정 포함) 한 번만 포화시켜요. 제목 1번과 본문 2번인 문서 X는 3 + 2 = 5가 되어 5 × 2.2/(5 + 1.2) = 1.77, 본문에만 5번인 Y도 1.77, 제목에만 1번인 Z는 3이 되어 1.57이에요. 필드마다 BM25를 따로 계산해 더하면 각 필드에서 포화가 따로 일어나 여러 필드에 조금씩 나온 문서가 과대평가되므로, 합친 뒤 포화시키는 것이 핵심이에요. 앵커 텍스트는 페이지 스스로가 아니라 다른 사람이 그 페이지를 부르는 말이라 웹 검색에서 특히 강한 신호예요. 가중치는 평가 데이터로 조정하고, Elasticsearch에서는 combined_fields 질의가 BM25F 방식을 따라요.',
      'Fields such as title, body and anchor text get weights, and the weighted frequencies are combined before saturating once (BM25F); titles and anchors are especially strong signals.',
      'Web documents consist of fields such as the title, body, URL and anchor text, the words other pages use when linking to them. A term in a short, summary-like title is a far stronger signal than one in a long body, so each field gets a weight, for example title 3, body 1 and anchor 2. BM25F multiplies frequencies by these weights and adds them, with per-field length normalization, before saturating once. Document X with one title match and two body matches totals 3 + 2 = 5 and scores 5 × 2.2/(5 + 1.2) = 1.77; Y with five body matches also scores 1.77; Z with a single title match totals 3 and scores 1.57. Computing BM25 per field and summing would saturate each field separately and over-reward documents with a few matches in many fields, so combining before saturation is the key. Anchor text describes a page in other people’s words rather than its own, which makes it an especially strong web-search signal. Weights are tuned on evaluation data, and Elasticsearch’s combined_fields query follows the BM25F approach.', sFields())
  ]),
  sec('ir-eval', '평가', 'Evaluation', '검색이 잘 되는지 어떻게 재는가', 'How to measure whether search works', '찾은 것 중 맞은 비율과 맞는 것 중 찾은 비율인 정밀도와 재현율, 순서를 반영하는 평균 정밀도와 MAP, 등급이 있는 관련성을 위한 nDCG, 첫 정답의 위치를 보는 MRR, 실제 사용자로 비교하는 A/B 테스트와 인터리빙을 봐요.', 'Precision and recall, the share of results that are relevant and of relevant documents that are found; average precision and MAP, which reflect order; nDCG for graded relevance; MRR for the rank of the first right answer; and A/B tests and interleaving with real users.', [
    item('ir-precision', '정밀도와 재현율', 'Precision and recall',
      '정밀도는 찾은 결과 중 관련 있는 비율, 재현율은 관련 있는 문서 중 찾아낸 비율이에요. 순위 결과는 상위 k개로 잘라 P@k, R@k로 봐요.',
      '검색 평가는 질의 모음, 문서 모음, 그리고 사람이 판단한 관련성 정답으로 이루어진 평가 데이터로 해요. 1960년대 크랜필드 실험에서 시작해 TREC 같은 평가 대회로 이어진 방식이에요. 상위 10개 결과 중 5개가 관련 있고 컬렉션 전체의 관련 문서가 8개라면, 정밀도 P@10은 5/10 = 0.5, 재현율 R@10은 5/8 = 0.625예요. k를 키우면 재현율은 오르거나 그대로지만 정밀도는 떨어지기 쉬워서 둘은 줄다리기 관계예요. 둘을 하나로 묶는 F1은 조화 평균 2PR/(P + R)로 여기선 0.56이고, 재현율을 더 중시하면 Fβ를 써요. 순위 전체를 보려면 관련 문서가 나올 때마다의 (재현율, 정밀도) 점을 이은 PR 곡선을 그리는데, 보통 그 재현율 이상에서의 최대 정밀도로 보간해 계단 모양으로 만들어요. 웹 검색은 사용자가 첫 페이지만 보니 상위 정밀도가, 법률 증거 개시나 특허·체계적 문헌 검색은 하나도 놓치면 안 되니 재현율이 더 중요해요. 큰 컬렉션에서는 관련 문서를 전부 알 수 없어서, 여러 시스템의 상위 결과를 모아 판단하는 풀링으로 정답을 만들어요.',
      'Precision is the share of retrieved results that are relevant; recall is the share of relevant documents that are retrieved. Ranked results are cut at k and measured as P@k and R@k.',
      'Search is evaluated on test collections made of queries, documents and human relevance judgments, a method that began with the Cranfield experiments of the 1960s and continued in campaigns such as TREC. If 5 of the top 10 results are relevant and the collection holds 8 relevant documents, precision P@10 is 5/10 = 0.5 and recall R@10 is 5/8 = 0.625. Raising k can only keep or raise recall but tends to lower precision, so the two pull against each other. F1, their harmonic mean 2PR/(P + R), combines them into 0.56 here, and Fβ weights recall more heavily when needed. To see the whole ranking, a precision–recall curve joins the (recall, precision) points at each relevant result, usually interpolated as the maximum precision at any higher recall, which turns it into a staircase. Web search users look at the first page, so top precision matters most, while legal discovery and patent or systematic-review search cannot afford misses, so recall dominates. In large collections the full set of relevant documents is unknown, so the judgments are built by pooling the top results of many systems.', sPR()),
    item('ir-map', '평균 정밀도(MAP)', 'Average precision (MAP)',
      '관련 문서가 나온 위치마다의 정밀도를 평균한 값이 AP예요. 순서와 재현율을 함께 반영하고, 질의들에 대해 평균하면 MAP예요.',
      '정밀도와 재현율은 컷오프 k 하나에서만 보지만, 평균 정밀도(AP)는 순위 전체를 한 숫자로 요약해요. 관련 문서가 나온 위치마다 그 지점까지의 정밀도를 구해 더하고, 전체 관련 문서 수로 나눠요. 1, 3, 4, 7, 10위에 관련 문서가 있으면 정밀도는 1.00, 0.67, 0.75, 0.57, 0.50이고, 합 3.49를 전체 관련 문서 8로 나눠 AP = 0.436이에요. 끝내 찾지 못한 3개는 0으로 들어가서 재현율도 반영돼요. 같은 P@10 = 0.5여도 정답 5개가 1~5위에 몰린 X는 AP 0.625, 6~10위에 있는 Y는 0.222로, 정답을 위에 둘수록 높아요. AP는 PR 곡선 아래 면적의 근사이기도 해요. 여러 질의의 AP를 산술 평균하면 MAP(평균 정밀도의 평균)로, 0.436, 0.80, 0.25면 0.495예요. TREC에서 오랫동안 대표 지표로 쓰였고 안정적이라 시스템 비교에 좋지만, 관련/비관련 두 단계만 다룬다는 한계가 있어 등급 판단이 있으면 nDCG를 써요. 객체 탐지에서 쓰는 mAP도 같은 아이디어를 클래스별로 적용한 거예요.',
      'Average precision (AP) averages the precision at each position holding a relevant document. It reflects both order and recall, and its mean over queries is MAP.',
      'Precision and recall look at a single cutoff k, while average precision (AP) summarizes the whole ranking in one number. At every position holding a relevant document it takes the precision up to that point, sums these, and divides by the total number of relevant documents. With relevant documents at ranks 1, 3, 4, 7 and 10 the precisions are 1.00, 0.67, 0.75, 0.57 and 0.50, and their sum of 3.49 divided by the 8 relevant documents gives AP = 0.436. The 3 documents never retrieved count as 0, so recall is reflected too. With the same P@10 = 0.5, X, whose five hits are at ranks 1–5, has AP 0.625, while Y, with them at 6–10, has 0.222: putting hits higher earns more. AP also approximates the area under the precision–recall curve. The arithmetic mean of AP over queries is MAP (mean average precision), so 0.436, 0.80 and 0.25 give 0.495. It was long the headline metric at TREC and is stable enough for comparing systems, but it handles only binary relevance, so graded judgments call for nDCG. The mAP used in object detection applies the same idea per class.', sMAP()),
    item('ir-ndcg', 'nDCG', 'nDCG',
      '관련성 등급에서 나온 이득을 위치가 아래일수록 log로 할인해 더한 DCG를, 이상적인 순서의 DCG로 나눠 0~1로 만든 지표예요.',
      '실제 관련성은 "아주 관련", "조금 관련"처럼 등급이 있어서, nDCG(정규화 할인 누적 이득)는 이를 그대로 반영해요. 등급 g의 이득은 흔히 2^g − 1로 둬서 3등급은 7, 2등급은 3, 1등급은 1처럼 아주 관련 있는 문서를 크게 보상해요. 사용자는 위쪽 결과를 더 많이 보니, i번째 위치의 이득은 log₂(i + 1)로 나눠 할인해요. 1위는 1, 2위는 1.58, 3위는 2, 6위는 2.81로 나누는 거죠. 등급이 [3, 2, 3, 0, 1, 2]인 순위의 DCG는 7 + 1.89 + 3.5 + 0 + 0.39 + 1.07 = 13.85예요. 같은 문서들을 이상적인 순서 [3, 3, 2, 2, 1, 0]으로 놓은 IDCG는 14.60이라 nDCG = 0.95예요. 정규화 덕분에 관련 문서가 많은 질의와 적은 질의를 공정하게 평균할 수 있어요. 보통 상위 10개만 계산하는 nDCG@10을 쓰고, 웹 검색, 추천, 학습 기반 순위의 표준 지표예요. 이득으로 등급을 그대로 쓰는 원래 정의와 2^g − 1 변형이 있어서, 결과를 비교할 때는 어느 쪽인지 확인해야 해요.',
      'nDCG sums gains from graded relevance, discounted logarithmically by position, and divides by the DCG of the ideal order to land between 0 and 1.',
      'Real relevance comes in grades such as highly relevant and somewhat relevant, and nDCG (normalized discounted cumulative gain) uses them directly. The gain for grade g is commonly 2^g − 1, giving 7 for grade 3, 3 for grade 2 and 1 for grade 1, so highly relevant documents are rewarded heavily. Users look at top results more, so the gain at position i is discounted by log₂(i + 1): divided by 1 at rank 1, 1.58 at rank 2, 2 at rank 3 and 2.81 at rank 6. A ranking with grades [3, 2, 3, 0, 1, 2] has DCG 7 + 1.89 + 3.5 + 0 + 0.39 + 1.07 = 13.85. The same documents in the ideal order [3, 3, 2, 2, 1, 0] give an IDCG of 14.60, so nDCG = 0.95. Normalization lets queries with many and few relevant documents be averaged fairly. It is usually computed over the top 10 as nDCG@10 and is the standard metric for web search, recommendation and learned ranking. The original definition uses the grade itself as the gain while the 2^g − 1 variant is common too, so check which one a result uses before comparing.', sNDCG()),
    item('ir-mrr', 'MRR과 Hit@k', 'MRR and Hit@k',
      '첫 번째 정답이 나온 순위의 역수를 질의들에 대해 평균한 지표예요. 정답 하나만 찾으면 되는 검색과 질의응답에 맞아요.',
      '이름으로 특정 페이지를 찾거나 질문에 대한 답 하나를 찾을 때는, 첫 정답이 몇 위에 나오는지가 사용자 경험을 결정해요. 역순위(RR)는 첫 정답 순위의 역수라, 1위면 1, 2위면 0.5, 3위면 0.33이고 정답이 없으면 0이에요. 첫 정답이 1, 3, 2위에 나오고 한 질의는 정답이 없다면 평균 역순위 MRR = (1 + 0.33 + 0.5 + 0)/4 = 0.458이에요. 1위와 2위의 차이(0.5)가 9위와 10위의 차이(0.01)보다 훨씬 커서, 맨 위를 맞히는 것을 강하게 보상해요. 첫 정답 이후의 결과는 전혀 보지 않으니, 관련 문서가 여러 개인 일반 검색에는 MAP나 nDCG가 더 맞아요. 상위 k개 안에 정답이 하나라도 있으면 1인 Hit@k(성공률)도 흔히 쓰는데, 여기선 4개 중 3개라 0.75예요. RAG의 검색 단계는 LLM에 넘길 상위 k개 안에 근거 문서가 들어 있는지가 중요해서 Recall@k나 Hit@k로 평가하고, 질의응답 데이터셋과 MS MARCO 순위 평가는 MRR@10을 써요.',
      'MRR averages, over queries, the reciprocal of the rank of the first correct answer. It suits searches that need just one right answer and question answering.',
      'When a user looks for a specific page by name or for one answer to a question, the rank of the first correct result shapes the experience. The reciprocal rank (RR) is one over that rank: 1 at rank 1, 0.5 at rank 2, 0.33 at rank 3, and 0 if nothing is found. With first hits at ranks 1, 3 and 2 and one query with no hit, the mean reciprocal rank is MRR = (1 + 0.33 + 0.5 + 0)/4 = 0.458. The step from rank 1 to 2 (0.5) is far larger than from 9 to 10 (0.01), so getting the top right is rewarded heavily. Everything after the first hit is ignored, so MAP or nDCG fit general search with many relevant documents better. Hit@k, 1 if any correct answer appears in the top k, is also common and is 3 out of 4 = 0.75 here. The retrieval step of RAG depends on whether the evidence lands in the top k passed to the LLM, so it is measured with Recall@k or Hit@k, and question-answering benchmarks and MS MARCO passage ranking report MRR@10.', sMRR()),
    item('ir-online', '온라인 평가', 'Online evaluation',
      '실제 사용자의 행동으로 순위 방식을 비교해요. 사용자를 나누는 A/B 테스트와, 두 순위를 한 목록에 섞는 인터리빙이 있어요.',
      '평가 데이터는 만들기 비싸고 실제 사용자의 만족을 다 담지 못해서, 서비스 중인 검색은 실제 사용 데이터로도 평가해요. A/B 테스트는 사용자를 무작위로 나눠 한쪽엔 기존 순위 A, 다른 쪽엔 새 순위 B를 보여주고 클릭률, 성공한 검색 비율, 재검색률 같은 지표를 비교해요. 다만 31.0%와 32.0%처럼 차이가 작으면 사용자 간 편차에 묻혀서 유의한 결론까지 많은 트래픽과 시간이 필요해요. 인터리빙은 같은 사용자에게 두 순위를 섞은 한 목록을 보여줘요. 팀 드래프트 방식은 두 팀이 선수를 뽑듯 A와 B가 번갈아 아직 들어가지 않은 자기 최상위 결과를 넣어서, A [a1, a2, a3]와 B [b1, a1, b2]는 a1, b1, a2, b2가 돼요. 사용자가 b1과 b2를 클릭하면 B가 2 대 0으로 이겨요. 같은 사용자 안에서 비교하니 A/B보다 수십 배 적은 데이터로 차이를 찾아요. 클릭에는 위치 편향이 있어서 위에 있으면 덜 관련 있어도 더 클릭되고, 결과를 보고 만족해 클릭 없이 떠나는 경우도 있어요. 그래서 클릭을 바로 관련성으로 쓰지 않고 클릭 모델로 보정하며, 체류 시간이나 재검색 같은 신호와 함께 봐요.',
      'Ranking methods are compared on real user behavior, either by splitting users in an A/B test or by interleaving two rankings into one list.',
      'Test collections are expensive and cannot capture everything real users care about, so live search systems are also evaluated on usage. An A/B test randomly splits users, shows the current ranking A to one group and the new ranking B to the other, and compares metrics such as click-through rate, successful-search rate and query reformulation. When the difference is small, such as 31.0% against 32.0%, it hides in the variance between users, so reaching a significant result takes much traffic and time. Interleaving shows the same user a single list that mixes both rankings. In team draft, A and B take turns adding their highest result not yet in the list, like captains picking teams, so A [a1, a2, a3] and B [b1, a1, b2] become a1, b1, a2, b2. If the user clicks b1 and b2, B wins 2 to 0. Because the comparison happens within one user, interleaving finds differences with dozens of times less data than A/B testing. Clicks suffer from position bias, so higher results are clicked more even when less relevant, and a user may leave satisfied without clicking at all. Clicks are therefore corrected with click models rather than used as relevance directly, and they are read alongside signals such as dwell time and reformulation.', sOnline())
  ]),
  sec('ir-web', '웹 검색', 'Web search', '웹이라는 거대한 컬렉션 다루기', 'Handling the web as a collection', '링크를 따라 페이지를 모으는 크롤링, 거의 같은 페이지를 걸러내는 MinHash와 SimHash, 링크 구조로 중요도를 매기는 페이지랭크, 오타를 고치는 철자 교정, 키 입력마다 질의를 제안하는 자동 완성을 봐요.', 'Crawling that gathers pages by following links, MinHash and SimHash for filtering near-duplicate pages, PageRank for importance from link structure, spelling correction for typos, and autocomplete that suggests queries at every keystroke.', [
    item('ir-crawl', '웹 크롤링', 'Web crawling',
      '시드 URL에서 시작해 페이지를 가져오고 링크를 따라 넓혀가요. 프런티어 큐, 본 URL 집합, robots.txt와 요청 간격 같은 예의 규칙이 핵심이에요.',
      '검색 엔진은 색인할 페이지를 크롤러로 모아요. 시드 URL을 프런티어라는 큐에 넣고, 하나씩 꺼내 가져온 뒤 그 안의 링크를 추출해요. 이미 본 URL은 건너뛰고 새 URL만 프런티어에 넣어서, 링크가 순환해도 같은 페이지를 반복해 가져오지 않아요. A에서 B, C를 찾고, B에서 D를 찾고, C의 링크 D와 B는 이미 봤으니 건너뛰는 식이죠. 같은 페이지가 여러 주소로 보이지 않도록 대소문자, ../ 경로, 추적용 파라미터를 정리하는 URL 정규화가 필요하고, 수십억 개의 본 URL은 블룸 필터 같은 구조로 관리해요. 크롤러는 예의를 지켜야 해서 robots.txt의 Disallow 경로는 가져오지 않고, 호스트별 큐를 두어 한 서버에 요청이 몰리지 않게 간격을 둬요. 무엇을 먼저 가져올지는 너비 우선을 기본으로 페이지 중요도와 변경 빈도로 우선순위를 정하고, 뉴스처럼 자주 바뀌는 페이지는 더 자주 다시 크롤링해요. 링크가 없는 페이지를 위해 사이트맵을 읽고, 자바스크립트로 그려지는 페이지는 브라우저로 렌더링해서 가져오기도 해요. 실제로는 수천 대의 기계가 호스트를 나눠 맡아 병렬로 돌아요.',
      'Starting from seed URLs, a crawler fetches pages and follows their links. Its core is a frontier queue, a set of seen URLs, and politeness rules such as robots.txt and request spacing.',
      'Search engines gather pages to index with crawlers. Seed URLs go into a queue called the frontier; the crawler takes them out one at a time, fetches each page and extracts its links. URLs already seen are skipped and only new ones join the frontier, so pages are not fetched again when links form cycles. A yields B and C, B yields D, and C’s links to D and B are skipped because both were seen. URL normalization of case, ../ segments and tracking parameters keeps one page from appearing under many addresses, and billions of seen URLs are tracked with structures such as Bloom filters. Crawlers must be polite: they skip paths that robots.txt disallows and keep per-host queues so requests to one server are spaced out. Breadth first is the baseline order, refined by page importance and change rate, and pages that change often, such as news, are recrawled more often. Sitemaps reveal pages without inbound links, and pages drawn by JavaScript may be rendered in a browser before indexing. In practice thousands of machines crawl in parallel, each responsible for a share of the hosts.', sCrawl()),
    item('ir-dedup', '거의 중복 탐지', 'Near-duplicate detection',
      '문서를 단어 슁글 집합으로 보고 자카드 유사도로 비교해요. MinHash 서명과 LSH로 빠르게 후보를 찾고, SimHash는 문서를 짧은 지문 하나로 줄여요.',
      '웹 페이지의 상당수는 광고, 날짜, 메뉴만 다른 거의 같은 페이지라, 그대로 색인하면 저장 공간이 낭비되고 결과 목록이 같은 내용으로 채워져요. 정확히 같은 문서는 해시로 바로 찾지만, 조금이라도 다르면 해시가 완전히 달라져서 다른 방법이 필요해요. 문서를 연속한 단어 k개의 묶음(슁글) 집합으로 나타내면, "the quick brown fox jumps"와 "… fox leaps"는 2-그램 4개 중 3개를 공유하고 자카드 유사도는 교집합 3을 합집합 5로 나눈 0.6이에요. 수십억 문서의 모든 쌍을 비교할 수는 없으니, MinHash는 해시 함수마다 집합 원소들의 최소 해시값을 서명으로 남겨요. 두 집합의 최솟값이 같을 확률이 정확히 자카드 유사도라서, 서명이 일치하는 비율로 유사도를 추정해요. LSH는 서명을 여러 밴드로 나눠 어느 한 밴드라도 같은 쌍만 후보로 비교해 모든 쌍 비교를 피해요. SimHash는 특성마다 해시 비트에 가중치를 더하거나 빼서 그 부호로 지문을 만들어, 비슷한 문서는 해밍 거리가 작은 지문을 가져요. 구글은 64비트 지문이 3비트 이하로 다르면 거의 중복으로 판단하는 방법을 크롤링에 썼어요. 같은 기법이 표절 탐지와 LLM 학습 데이터의 중복 제거에도 쓰여요.',
      'Documents become sets of word shingles compared by Jaccard similarity; MinHash signatures and LSH find candidates quickly, and SimHash reduces a document to one short fingerprint.',
      'Many web pages are near-copies that differ only in ads, dates or menus; indexing them all wastes space and fills result pages with the same content. Exact copies are found with a hash, but any small change produces an entirely different hash, so another method is needed. Representing a document as its set of k-word shingles, "the quick brown fox jumps" and "… fox leaps" share 3 of their 4 2-grams, and their Jaccard similarity is the intersection of 3 over the union of 5, or 0.6. Comparing every pair among billions of documents is impossible, so MinHash keeps, for each hash function, the minimum hash over the set as a signature. Two sets share the same minimum with probability exactly equal to their Jaccard similarity, so the fraction of matching signature entries estimates it. LSH splits signatures into bands and compares only pairs that match in at least one band, avoiding all-pairs comparison. SimHash adds or subtracts each feature’s weight per hash bit and takes the signs as a fingerprint, so similar documents get fingerprints at a small Hamming distance. Google used 64-bit fingerprints differing in 3 bits or fewer to flag near-duplicates while crawling. The same techniques detect plagiarism and deduplicate LLM training data.', sDedup()),
    item('ir-pagerank', '페이지랭크', 'PageRank',
      '링크를 추천으로 보고 중요한 페이지에서 링크를 많이 받는 페이지일수록 중요하다고 매겨요. 무작위 서퍼가 각 페이지에 머무는 확률이에요.',
      '1998년 구글 창업자들이 제안한 페이지랭크는 웹의 링크 구조로 페이지의 중요도를 매겨요. 링크를 하나의 추천으로 보고, 중요한 페이지로부터 링크를 받을수록 중요하다고 봐요. 각 페이지는 자기 점수를 나가는 링크 수로 똑같이 나눠 연결된 페이지에 전해요. 이는 링크를 따라 무작위로 돌아다니는 서퍼가 각 페이지에 머무는 확률과 같아요. 다만 링크만 따라가면 순환에 갇히거나 나가는 링크가 없는 페이지에서 멈추니, 확률 d = 0.85로 링크를 따르고 0.15로 아무 페이지로 순간이동한다고 둬요. 그러면 PR(p) = (1 − d)/N + d · Σ PR(q)/out(q)이고, 모든 페이지를 1/N로 시작해 이 식을 반복하면 값이 수렴해요(거듭제곱 반복). A → B, C, B → C, C → A, D → C인 그래프에서는 세 곳에서 링크를 받는 C가 0.394, C의 점수를 모두 받는 A가 0.373, B가 0.196이고, 들어오는 링크가 없는 D는 순간이동 몫 0.15/4 ≈ 0.038만 받아요. 질의와 무관하게 미리 계산하는 정적 점수라 BM25 같은 관련성 점수와 결합해 순위에 써요. 링크를 사고파는 링크 농장 같은 스팸이 생기면서, 지금은 수많은 순위 신호 중 하나예요. 같은 아이디어가 소셜 네트워크의 영향력, 논문 인용 분석, 추천에도 쓰여요.',
      'Treating links as endorsements, PageRank rates a page as important when many important pages link to it; it is the share of time a random surfer spends there.',
      'Proposed by Google’s founders in 1998, PageRank rates pages by the link structure of the web. Each link is an endorsement, and a page matters more when important pages link to it. Every page splits its score evenly among its outgoing links, which equals the probability that a random surfer following links is on that page. Following links alone could trap the surfer in cycles or strand it at pages without outgoing links, so it follows a link with probability d = 0.85 and teleports to a random page with probability 0.15. This gives PR(p) = (1 − d)/N + d · Σ PR(q)/out(q); starting from 1/N everywhere and applying it repeatedly converges (power iteration). In the graph A → B, C, B → C, C → A and D → C, C, linked from three pages, scores 0.394, A, which receives all of C’s score, 0.373 and B 0.196, while D, with no inlinks, keeps only its teleport share of 0.15/4 ≈ 0.038. As a static, query-independent score it is precomputed and combined with relevance scores such as BM25. Spam such as link farms made it one ranking signal among many today. The same idea measures influence in social networks, ranks citations and powers recommendation.', sPageRank()),
    item('ir-spell', '철자 교정', 'Spelling correction',
      '편집 거리로 사전에서 가까운 후보를 모으고, 잡음 채널 모델 P(c) × P(w | c)로 가장 그럴듯한 단어를 골라요. 문맥과 질의 로그로 정확도를 높여요.',
      '검색 질의의 상당수에 오타가 있어서, 고치지 않으면 결과가 없거나 엉뚱해져요. 두 단어의 편집 거리(레벤시테인 거리)는 한쪽을 다른 쪽으로 바꾸는 삽입, 삭제, 치환의 최소 횟수로, 동적 계획법 표를 채워 구해요. serch와 search는 a 하나를 넣으면 되니 1이에요. 사전에서 거리 2 이내의 단어를 후보로 모으면 search, perch, sketch 등이 나와요. 잡음 채널 모델은 사용자가 원래 단어 c를 치다가 잡음이 섞여 w가 됐다고 보고, P(c) × P(w | c)가 가장 큰 c를 골라요. P(c)는 그 단어가 얼마나 흔한지(언어 모델), P(w | c)는 c를 w로 잘못 칠 확률(오타 모델)로, 자판에서 가까운 글자의 치환이나 글자 빠뜨리기가 더 흔해요. 그래서 search가 perch보다 200배 그럴듯해요. 실제 검색은 앞뒤 단어도 봐서 "serch engine"이면 search engine이 훨씬 자연스럽다는 문맥을 쓰고, 사용자가 질의를 치고 곧바로 고쳐 다시 친 쌍을 질의 로그에서 모아 오타 모델과 고유명사, 신조어를 배워요. 한글 검색에서는 한/영 전환을 잊고 친 dkssud를 안녕으로 되돌리는 교정도 흔해요. 후보 탐색은 BK-트리나 SymSpell로 빠르게 하고, 확신이 크면 고친 결과를 바로, 아니면 "이것을 찾으셨나요?"로 제안해요.',
      'Edit distance gathers nearby dictionary candidates, and the noisy channel model P(c) × P(w | c) picks the likeliest word; context and query logs make it more accurate.',
      'A large share of search queries contain typos, which otherwise return nothing or the wrong results. The edit (Levenshtein) distance between two words is the fewest insertions, deletions and substitutions turning one into the other, computed by filling a dynamic programming table; serch and search are at distance 1, since inserting one a suffices. Collecting dictionary words within distance 2 yields candidates such as search, perch and sketch. The noisy channel model assumes the user meant c but noise turned it into w, and picks the c maximizing P(c) × P(w | c). P(c) is how common the word is (the language model) and P(w | c) is the chance of mistyping c as w (the error model), where substituting neighboring keys or dropping a letter is more common. That makes search 200 times likelier than perch. Real search engines also use the neighboring words, so “serch engine” clearly wants search engine, and mine query logs for pairs that users typed and immediately retyped, learning the error model along with names and new words. Korean search also commonly restores text typed in the wrong keyboard layout, turning dkssud back into 안녕. Candidate lookup is sped up with BK-trees or SymSpell, and confident corrections are applied directly while uncertain ones are offered as “did you mean”.', sSpell()),
    item('ir-autocomplete', '자동 완성', 'Autocomplete',
      '질의 로그로 만든 트라이에서 입력한 접두사를 따라 내려가고, 노드마다 미리 저장한 상위 k개 질의를 보여줘요.',
      '자동 완성은 키 입력마다 사용자가 칠 법한 질의를 제안해서 입력을 줄이고 더 좋은 질의로 이끌어요. 질의 로그에서 자주 검색된 질의와 빈도를 모아 트라이(접두사 트리)를 만들면, search, season, seattle, seal은 sea라는 경로를 공유해요. 사용자가 sea를 치면 루트에서 s, e, a를 따라 그 노드로 내려가고, 그 아래 질의 중 점수가 높은 것을 보여줘요. 매번 아래의 모든 질의를 뒤지면 느리니, 노드마다 상위 k개를 미리 저장해 두면 조회 시간이 접두사 길이에만 비례해요. 응답은 키 입력마다 수십 ms 안에 와야 하고, 메모리를 아끼려 Lucene은 공통 접미사까지 공유하는 유한 상태 변환기(FST)를 써요. 점수는 빈도에 더해 지금 뜨는 질의를 올리는 최신성, 사용자의 기록과 위치에 따른 개인화를 반영하고, 부적절하거나 불쾌한 제안은 걸러내요. seach처럼 오타가 있어도 search를 제안하도록 편집 거리를 허용하기도 해요. 한글은 입력 중에 음절이 조합되므로 ‘검ㅅ’처럼 덜 친 음절도 ‘검색’에 맞추려면 자모 단위로 풀어 색인하고, 초성만 친 ‘ㄱㅅ’으로 찾는 초성 검색도 지원하곤 해요.',
      'A trie built from query logs is walked down the typed prefix, and the top k queries stored in advance at each node are shown.',
      'Autocomplete suggests likely queries at each keystroke, saving typing and steering users toward better queries. Collecting frequent queries and their counts from the query log into a trie (prefix tree), search, season, seattle and seal share the path sea. When the user types sea, the system walks from the root down s, e and a and shows the highest-scoring queries below that node. Scanning every query underneath on each keystroke is slow, so each node stores its top k in advance and lookup time grows only with the prefix length. Answers must arrive within tens of milliseconds per keystroke, and to save memory Lucene uses finite-state transducers (FSTs), which share common suffixes as well. Scores add freshness, lifting trending queries, and personalization from the user’s history and location to plain frequency, and inappropriate or offensive suggestions are filtered out. Allowing a small edit distance lets a typo such as seach still suggest search. Korean syllables are composed while typing, so matching a half-typed syllable such as 검ㅅ to 검색 requires indexing by jamo, and search by initial consonants alone, such as ㄱㅅ, is often supported too.', sAuto())
  ]),
  sec('ir-sys', '질의 처리와 시스템', 'Query processing and systems', '수십억 문서를 밀리초 안에', 'Billions of documents in milliseconds', '역색인 목록을 단어 단위와 문서 단위로 처리하는 방식, 상한으로 계산을 건너뛰는 WAND, 색인을 나눠 여러 기계에서 검색하는 샤딩과 복제, Lucene의 불변 세그먼트와 준실시간 색인, 결과를 범주별로 세고 좁히는 패싯 검색을 봐요.', 'Processing postings term at a time versus document at a time, WAND, which skips work using upper bounds, sharding and replication across machines, Lucene’s immutable segments and near-real-time indexing, and faceted search that counts and narrows results by category.', [
    item('ir-daat', '질의 처리: TAAT와 DAAT', 'Query processing: TAAT and DAAT',
      '단어 단위(TAAT)는 목록 하나씩 끝까지 읽어 누산기에 점수를 쌓고, 문서 단위(DAAT)는 모든 목록의 커서를 함께 움직이며 문서 하나씩 점수를 완성해요.',
      '질의 단어들의 역색인 목록을 읽어 문서 점수를 구하는 방법은 크게 두 가지예요. 단어 단위 처리(TAAT, term-at-a-time)는 한 단어의 목록을 끝까지 읽으며 문서별 누산기에 점수를 더하고 다음 단어로 넘어가요. jaguar 목록 뒤 누산기는 {2: 6, 5: 2, 9: 4}이고 speed까지 읽으면 {1: 1, 2: 6, 5: 6, 9: 5, 12: 2}가 돼요. 단순하고 목록을 순서대로 읽어 캐시에 좋지만, 후보 문서 수만큼 누산기 메모리가 들어요. 문서 단위 처리(DAAT, document-at-a-time)는 목록마다 커서를 두고, 가장 작은 문서 ID로 커서들을 함께 전진시키며 그 문서의 점수를 한 번에 완성해요. 문서 1은 1, 2는 6, 5는 jaguar 2와 speed 4를 더한 6이에요. 완성된 점수는 크기 k의 최소 힙에 넣으면 되니 메모리가 작고, 힙의 k번째 점수가 문턱 θ가 되어 θ = 6보다 낮은 문서 9(5)와 12(2)는 버려져요. 이 문턱을 이용하면 점수를 계산하기도 전에 가망 없는 문서를 건너뛸 수 있어서, WAND 같은 동적 가지치기로 이어져요. 목록 안의 건너뛰기는 스킵 포인터나 블록 단위 압축으로 빠르게 해요. 대형 검색 엔진과 Lucene은 주로 DAAT를 써요.',
      'Term at a time (TAAT) reads one list to the end, piling scores into accumulators, while document at a time (DAAT) moves cursors over all lists together and finishes each document’s score in one go.',
      'There are two broad ways to score documents from the query terms’ posting lists. Term-at-a-time (TAAT) processing reads one term’s list to the end, adding into per-document accumulators, then moves to the next term. After the jaguar list the accumulators are {2: 6, 5: 2, 9: 4}, and after speed they are {1: 1, 2: 6, 5: 6, 9: 5, 12: 2}. It is simple and reads lists sequentially, which suits caches, but accumulator memory grows with the number of candidates. Document-at-a-time (DAAT) processing keeps a cursor per list and advances them together to the smallest document ID, completing that document’s score in one step: 1 for doc 1, 6 for doc 2 and 6 for doc 5, from jaguar’s 2 plus speed’s 4. Finished scores go into a min-heap of size k, so memory stays small, and the heap’s kth score becomes a threshold θ: docs 9 (5) and 12 (2) fall below θ = 6 and are dropped. That threshold lets hopeless documents be skipped before they are even scored, which leads to dynamic pruning such as WAND. Skipping within a list is made fast with skip pointers or block-wise compression. Large search engines and Lucene mostly use DAAT.', sDAAT()),
    item('ir-wand', 'WAND 동적 가지치기', 'WAND dynamic pruning',
      '단어마다 줄 수 있는 최대 점수(상한)를 두고, 상한의 합이 상위 k의 문턱을 못 넘는 문서는 계산 없이 건너뛰어요. 결과는 전부 계산한 것과 같아요.',
      '대부분의 문서는 상위 k에 들지 못하는데, 이를 모두 계산하는 것은 낭비예요. WAND(Weak AND)는 단어마다 그 목록의 어떤 문서에 줄 수 있는 최대 점수, 즉 상한 UB를 색인할 때 미리 저장해 둬요. 질의 처리 중에는 상위 k 힙의 마지막 점수가 문턱 θ예요. 커서들을 현재 문서 ID 순으로 정렬하고 상한을 차례로 더해, 처음 θ를 넘는 커서의 문서를 피벗으로 정해요. A(UB 2.0)가 문서 10, B(1.5)가 15, C(4.0)가 22에 있고 θ = 5.0이면, 합이 2.0, 3.5, 7.5라 C의 문서 22가 피벗이에요. 22보다 앞의 문서는 A와 B만 가질 수 있어 최대 3.5라 θ를 넘을 수 없으니, A와 B의 커서를 22로 바로 건너뛰어요. 모든 커서가 피벗에 모이면 그때만 실제 점수를 계산하고, θ를 넘으면 힙에 넣어 θ가 올라가요. θ가 오를수록 더 많이 건너뛰어 점점 빨라지고, 그러면서도 결과는 모든 문서를 계산한 것과 똑같은 정확한 상위 k예요. 목록을 블록으로 나눠 블록마다 상한을 두는 Block-Max WAND는 전체 상한보다 촘촘해 더 많이 건너뛰고, Lucene 8부터 상위 k 검색에 쓰여요. 비슷한 방법으로 상한이 작은 단어를 필수가 아닌 것으로 다루는 MaxScore가 있어요.',
      'Each term stores the most it can add to any document (its upper bound), and documents whose bound sum cannot beat the top-k threshold are skipped unscored. The result is identical to exhaustive scoring.',
      'Most documents never make the top k, so scoring them all is wasted work. WAND (Weak AND) stores for each term, at indexing time, the most it can add to any document in its list: its upper bound, UB. During query processing, the last score in the top-k heap is the threshold θ. The cursors are sorted by their current document ID and their bounds summed in order, and the document of the first cursor to push the sum past θ becomes the pivot. With A (UB 2.0) at document 10, B (1.5) at 15, C (4.0) at 22 and θ = 5.0, the sums are 2.0, 3.5 and 7.5, so C’s document 22 is the pivot. Documents before 22 can contain only A and B, worth at most 3.5, which cannot beat θ, so the A and B cursors jump straight to 22. Only when every cursor reaches the pivot is the real score computed, and if it beats θ it enters the heap and raises θ. As θ climbs, more is skipped and queries speed up, yet the result is the exact top k that scoring every document would give. Block-Max WAND splits lists into blocks with a bound per block, tighter than the global bound, so it skips even more; Lucene has used it for top-k search since version 8. MaxScore, a related method, treats terms with small bounds as non-essential.', sWAND()),
    item('ir-shard', '분산 검색: 샤딩과 복제', 'Distributed search: sharding and replication',
      '문서를 나눠 여러 샤드에 색인하고, 질의를 모든 샤드에 보내 각자의 상위 k를 합쳐요. 샤드마다 복제본을 두어 처리량과 가용성을 높여요.',
      '웹 규모의 색인은 기계 한 대에 들어가지 않아서 여러 기계에 나눠요. 가장 흔한 방식은 문서 분할로, 문서들을 샤드에 나누고 각 샤드가 자기 문서의 역색인을 가져요. 조정 노드는 질의를 모든 샤드에 보내고(scatter), 각 샤드는 자기 상위 k개를 돌려주며, 조정 노드가 이를 합쳐 전체 상위 k를 만들어요(gather). 상위 3이면 샤드 4개가 3개씩 보낸 12개 중 점수 높은 3개를 골라요. 단어별로 나누는 단어 분할도 있지만, 한 질의가 여러 기계를 거쳐야 하고 부하가 쏠려 잘 쓰지 않아요. 샤드마다 idf 같은 통계가 달라지면 점수를 비교하기 어려워서, 문서를 무작위로 고르게 나누거나 전역 통계를 먼저 모으기도 해요(Elasticsearch의 dfs_query_then_fetch). 샤드마다 복제본을 여러 개 두면 질의를 나눠 받아 처리량이 늘고, 기계가 죽어도 다른 복제본이 응답해요. 응답은 가장 느린 샤드를 기다려야 해서, 샤드가 수백 개면 그중 하나는 거의 항상 느려요. 이런 꼬리 지연을 줄이려 일정 시간이 지나면 다른 복제본에도 같은 요청을 보내 먼저 온 답을 쓰는 헤지 요청을 써요. 자주 오는 질의는 결과 캐시로 바로 답해요.',
      'Documents are partitioned into shards, each query goes to every shard, and their top-k lists are merged; replicas per shard raise throughput and availability.',
      'A web-scale index does not fit on one machine, so it is split across many. The most common scheme is document partitioning: documents are divided among shards, each holding the inverted index of its own documents. A coordinator sends the query to every shard (scatter), each shard returns its own top k, and the coordinator merges them into the global top k (gather): with k = 3 and four shards, it picks the 3 best of the 12 returned. Term partitioning, which splits by term instead, makes one query hop across machines and concentrates load, so it is rarely used. When statistics such as idf differ between shards, scores are hard to compare, so documents are spread randomly and evenly, or global statistics are gathered first, as in Elasticsearch’s dfs_query_then_fetch. Several replicas per shard share the query load for more throughput and keep answering when a machine fails. The answer must wait for the slowest shard, and with hundreds of shards one is almost always slow. To cut this tail latency, hedged requests resend a query to another replica after a short delay and use whichever answer arrives first. Frequent queries are answered straight from a result cache.', sShard()),
    item('ir-segments', '세그먼트와 실시간 색인', 'Segments and near-real-time indexing',
      'Lucene은 새 문서를 바뀌지 않는 작은 세그먼트로 써서 1초 안에 검색되게 하고, 삭제는 비트로 표시하며, 세그먼트를 합치며 정리해요.',
      '역색인은 정렬되고 압축돼 있어서 문서 하나를 넣으려고 제자리에서 고치기 어려워요. Lucene과 이를 쓰는 Elasticsearch, OpenSearch, Solr는 새 문서를 메모리 버퍼에 모았다가 refresh 때 바뀌지 않는 작은 세그먼트로 써요. Elasticsearch는 기본 1초마다 refresh해서, 색인한 문서가 약 1초 뒤 검색되는 준실시간(NRT) 검색이 돼요. 검색은 모든 세그먼트를 각각 보고 결과를 합쳐요. 세그먼트는 고치지 않으니 삭제는 세그먼트의 삭제 비트만 켜서 검색에서 빼고, 수정은 옛 문서를 삭제하고 새 버전을 추가하는 거예요. 세그먼트가 계속 쌓이면 검색이 느려지고 삭제된 문서가 공간을 차지하니, 배경에서 비슷한 크기의 세그먼트들을 합치며(Lucene의 계층 병합 정책) 삭제된 문서를 실제로 지워요. 세그먼트를 디스크에 fsync로 확정하는 커밋은 비싸서 가끔 하고, 그 사이의 변경은 트랜스로그에 기록해 장애가 나도 복구해요. 불변 세그먼트는 운영체제 파일 캐시와 잘 맞고 읽기와 쓰기가 서로 막지 않아 동시성이 쉬워요. 메모리에 쌓았다가 불변 파일로 내리고 배경에서 병합하는 구조는 LSM 트리와 같아요.',
      'Lucene writes new documents as small immutable segments searchable within a second, marks deletes with bits, and cleans up by merging segments.',
      'An inverted index is sorted and compressed, so adding a document by editing it in place is hard. Lucene, and Elasticsearch, OpenSearch and Solr built on it, collect new documents in a memory buffer and write them at each refresh as a small immutable segment. Elasticsearch refreshes every second by default, so indexed documents become searchable about a second later: near-real-time (NRT) search. A search visits every segment and merges the results. Because segments are never edited, a delete only sets a bit in the segment’s deletion bitmap to hide the document, and an update deletes the old version and adds a new one. As segments accumulate, searches slow down and deleted documents waste space, so similarly sized segments are merged in the background (Lucene’s tiered merge policy), physically dropping deleted documents. A commit, which fsyncs segments to disk, is expensive and done rarely; changes in between are recorded in a translog so they survive a crash. Immutable segments work well with the operating system’s file cache, and reads and writes never block each other, which simplifies concurrency. Buffering in memory, flushing immutable files and merging in the background is the same structure as an LSM tree.', sSegments()),
    item('ir-facets', '패싯 검색과 필터', 'Faceted search and filters',
      '검색 결과를 브랜드, 가격대 같은 범주별로 세어 보여주고, 눌러서 좁혀가게 해요. 필터는 점수 없이 캐시된 비트셋으로 빠르게 적용해요.',
      '쇼핑, 도서관, 채용 검색은 키워드에 더해 범주로 좁혀가는 패싯 탐색을 제공해요. laptop 결과 120개를 브랜드별로 세면 Apple 40, Dell 35, Lenovo 30, Asus 15이고, 가격대별로 세면 1,000달러 미만 50, 1,000~2,000달러 55, 그 이상 15예요. 개수는 현재 결과 집합에서 계산하니 질의가 바뀔 때마다 다시 세요. Dell을 고르면 결과가 35개로 좁혀지고 가격 패싯은 18, 15, 2로 다시 계산돼요. 이때 브랜드 패싯은 자기 필터를 빼고 세야 Lenovo도 함께 고르는 다중 선택이 자연스러워요. 브랜드 같은 조건은 관련성 점수와 무관한 예/아니오 필터라, 조건에 맞는 문서를 비트셋으로 만들어 캐시해 두고 질의 결과와 AND로 겹치면 돼요. 그래서 점수를 매기는 질의와 점수 없는 필터를 구분하면 캐시가 잘 맞아요. 개수 세기와 정렬은 역색인이 아니라 문서마다 값을 열로 저장한 doc values(열 지향 저장)로 빠르게 해요. Elasticsearch에서는 terms, range 같은 집계(aggregation)로 패싯을 만들고, 값이 아주 많은 필드는 근사 개수를 쓰기도 해요.',
      'Search results are counted by category, such as brand or price range, and users click to narrow them; filters apply quickly as cached, unscored bitsets.',
      'Shopping, library and job search offer faceted navigation, narrowing by category in addition to keywords. Counting the 120 laptop results by brand gives Apple 40, Dell 35, Lenovo 30 and Asus 15, and by price range gives 50 under $1k, 55 from $1–2k and 15 above. The counts come from the current result set, so they are recomputed for every query. Choosing Dell narrows the results to 35 and recounts the price facet as 18, 15 and 2. The brand facet itself must be counted without its own filter so that adding Lenovo as well works naturally as a multi-select. Conditions such as brand are yes-or-no filters unrelated to relevance, so the matching documents are cached as a bitset and ANDed with the query results. Separating scored queries from unscored filters therefore makes caching effective. Counting and sorting run not on the inverted index but on doc values, a column-oriented store of per-document values. Elasticsearch builds facets with aggregations such as terms and range, and fields with very many values may use approximate counts.', sFacets())
  ]),
  sec('ir-neural', '학습과 신경 검색', 'Learning and neural retrieval', '데이터로 배우는 순위와 의미 검색', 'Ranking learned from data, and semantic search', '특성으로 순위 함수를 배우는 LTR, 편향을 보정해 클릭으로 배우는 방법, 질의와 문서를 벡터로 바꾸는 밀집 검색, 가까운 벡터를 빠르게 찾는 HNSW, 벡터를 압축하는 곱 양자화, 신경망이 단어 가중치를 정하는 학습된 희소 검색을 봐요.', 'Learning to rank from features, learning from clicks with bias correction, dense retrieval that turns queries and documents into vectors, HNSW for finding nearby vectors quickly, product quantization for compressing them, and learned sparse retrieval with neural term weights.', [
    item('ir-ltr', '학습 기반 순위(LTR)', 'Learning to rank (LTR)',
      '질의-문서 쌍의 여러 특성과 사람이 매긴 관련성 등급으로 순위 함수를 학습해요. LambdaMART가 오랜 표준이고, 실제로는 여러 단계로 나눠 써요.',
      'BM25 하나로는 페이지 품질, 최신성, 제목 일치 같은 신호를 반영하기 어려워서, 검색 엔진은 수백 개의 특성을 조합하는 순위 함수를 데이터로 배워요. 질의-문서 쌍마다 BM25, 페이지랭크, 제목 일치, 최신성, 클릭률 같은 특성 벡터를 만들고, 사람이 매긴 관련성 등급을 정답으로 써요. 접근은 세 가지예요. 점별(pointwise)은 각 문서의 등급을 회귀나 분류로 맞히고, 쌍별(pairwise)은 d2가 d1보다 관련 있다는 식의 순서 쌍을 맞히며(RankNet), 목록별(listwise)은 nDCG 같은 목록 전체의 지표를 노려요. LambdaMART는 쌍별 기울기에 두 문서를 바꿨을 때의 nDCG 변화량 |ΔnDCG|를 곱해 사실상 nDCG를 직접 최적화하는데, 앞의 nDCG 예에서 2·3위를 바꾸면 0.036, 5·6위는 0.004 바뀌니 위쪽 실수를 약 8배 크게 고쳐요. 기울기 부스팅 트리로 학습하며, Yahoo! 순위 학습 대회 우승 이후 오랫동안 표준이었고 LightGBM과 XGBoost에 구현돼 있어요. 비싼 모델을 모든 문서에 쓸 수 없으니 실제로는 BM25로 1,000개를 고르고, LTR로 100개로 줄이고, 신경망 재순위 모델로 상위 10개를 정하는 다단계 순위를 써요.',
      'A ranking function is learned from many features of each query–document pair and human relevance grades. LambdaMART has long been the standard, and in practice ranking runs in several stages.',
      'BM25 alone cannot capture signals such as page quality, freshness and title matches, so search engines learn ranking functions that combine hundreds of features. Each query–document pair gets a feature vector of BM25, PageRank, title match, freshness, click rate and more, and human relevance grades serve as labels. There are three approaches. Pointwise methods predict each document’s grade by regression or classification; pairwise methods get ordered pairs right, such as d2 being more relevant than d1 (RankNet); listwise methods target a whole-list metric such as nDCG. LambdaMART multiplies each pairwise gradient by |ΔnDCG|, the change in nDCG from swapping the two documents, effectively optimizing nDCG directly: in the earlier nDCG example, swapping ranks 2 and 3 changes it by 0.036 and ranks 5 and 6 by 0.004, so mistakes near the top are corrected about 8 times harder. It trains gradient-boosted trees, was the standard for years after winning the Yahoo! Learning to Rank Challenge, and is implemented in LightGBM and XGBoost. Expensive models cannot score every document, so ranking runs in stages: BM25 selects 1,000 candidates, LTR narrows them to 100, and a neural reranker settles the top 10.', sLTR()),
    item('ir-clicks', '클릭으로 배우기', 'Learning from clicks',
      '클릭은 풍부하지만 위치 편향이 있어요. 클릭을 "봤을 확률 × 관련 있을 확률"로 보고 볼 확률의 역수로 가중하면 편향 없이 배울 수 있어요.',
      '사람이 매긴 관련성 판단은 비싸고 양이 적지만, 클릭 로그는 매일 엄청나게 쌓여요. 다만 클릭은 관련성 그대로가 아니에요. 사용자는 위쪽 결과를 주로 보니 아래 결과는 관련 있어도 보지 못해 클릭되지 않아요. 위치 기반 모델(PBM)은 클릭 확률을 그 순위를 볼 확률과 관련 있을 확률의 곱으로 봐요. 1위의 문서가 클릭률 30%, 4위의 문서가 6%라도, 볼 확률 0.9와 0.2로 나누면 관련성은 0.33과 0.30으로 비슷해요. 학습할 때는 각 클릭을 볼 확률의 역수로 가중하는 역성향 가중(IPS)을 써서, 4위의 클릭을 5배로 쳐요. 그러면 기대값에서 위치 편향이 사라져 로그만으로 편향 없는 순위 모델을 배울 수 있고, 이를 반사실적 LTR이라고 해요. 볼 확률은 상위 결과 두 개를 가끔 무작위로 바꿔 보여주는 실험이나, 같은 문서가 여러 위치에 나온 기록으로 추정해요. 사용자가 위에서부터 훑다가 만족하면 멈춘다는 캐스케이드 모델, 결과를 보고도 믿지 않는 신뢰 편향을 다루는 모델 등 다른 클릭 모델도 있어요. 클릭 없이 결과 화면만 보고 답을 얻는 경우도 있어서 체류 시간이나 재검색 같은 신호와 함께 봐요.',
      'Clicks are plentiful but position-biased. Modeling a click as the chance of being seen times the chance of relevance, and weighting by the inverse chance of being seen, allows unbiased learning.',
      'Human relevance judgments are expensive and scarce, while click logs grow enormously every day. Clicks are not relevance, though: users mostly look at the top results, so lower results go unclicked even when relevant because they are never seen. The position-based model (PBM) treats the probability of a click as the probability of examining that rank times the probability of relevance. A document at rank 1 with a 30% click rate and one at rank 4 with 6% look very different, but dividing by their examination probabilities, 0.9 and 0.2, gives similar relevance of 0.33 and 0.30. During training, inverse propensity scoring (IPS) weights each click by the inverse of its examination probability, counting a click at rank 4 five times. Position bias then cancels in expectation, letting an unbiased ranker be learned from logs alone; this is counterfactual learning to rank. Examination probabilities are estimated by occasionally swapping two top results, or from records of the same document shown at different positions. Other click models exist, such as the cascade model, in which users scan from the top and stop once satisfied, and models of trust bias, where users click top results even when doubtful. Some queries are answered on the results page without any click, so clicks are read alongside dwell time and reformulation.', sClicks()),
    item('ir-dense', '밀집 검색(바이인코더)', 'Dense retrieval (bi-encoders)',
      '질의와 문서를 각각 인코더로 벡터로 바꾸고 내적으로 관련성을 재요. 단어가 달라도 의미가 가까우면 찾지만, 정확한 일치에는 약해 BM25와 섞어 써요.',
      'BM25는 단어가 겹쳐야 점수를 줘서, "how to fix a flat tire"로 "patch a punctured tube" 문서를 찾지 못해요. 밀집 검색은 BERT 같은 트랜스포머 인코더로 질의와 문서를 수백 차원의 벡터로 바꾸고, 두 벡터의 내적(또는 코사인 유사도)을 관련성으로 써요. 질의 인코더와 문서 인코더가 따로 동작하는 바이인코더 구조라서 문서 벡터는 미리 계산해 색인에 넣어 두고, 질의 때는 질의 하나만 인코딩하면 돼요. 학습은 대조 학습으로 해요. 배치 안의 질의-정답 문서 쌍은 내적을 높이고, 다른 질의의 정답 문서는 음성 예시로 써서 낮추며(배치 내 음성), 소프트맥스 교차 엔트로피로 정답을 맞히게 해요. BM25가 높게 줬지만 정답이 아닌 어려운 음성을 섞으면 더 잘 배워요. 2020년 DPR이 질의응답 검색에서 BM25를 크게 앞서면서 널리 퍼졌고, E5, BGE 같은 범용 임베딩 모델이 RAG의 기본 검색기가 됐어요. 다만 상품 코드, 고유명사, 드문 단어 같은 정확한 일치와 학습 데이터와 다른 분야에는 약해서, BM25 결과와 순위를 섞는 하이브리드 검색을 많이 써요. 질의와 문서를 함께 넣어 읽는 크로스 인코더는 더 정확하지만 문서마다 계산해야 해서 상위 후보의 재순위에 써요.',
      'Queries and documents are encoded into vectors separately and scored by dot product. It finds matches in meaning despite different words but is weak on exact matches, so it is mixed with BM25.',
      'BM25 needs overlapping words, so “how to fix a flat tire” cannot find a document saying “patch a punctured tube”. Dense retrieval encodes queries and documents with a transformer such as BERT into vectors of a few hundred dimensions and uses their dot product (or cosine similarity) as relevance. Because the query and document encoders run separately in this bi-encoder design, document vectors are computed in advance and indexed, and only the query is encoded at search time. Training is contrastive: in a batch, the dot product of each query with its relevant document is pushed up while the other queries’ documents serve as negatives and are pushed down (in-batch negatives), using a softmax cross-entropy over the candidates. Adding hard negatives, documents that BM25 ranks highly but that are not relevant, improves learning further. DPR’s large gains over BM25 in question-answering retrieval in 2020 made the approach mainstream, and general embedding models such as E5 and BGE became the default retrievers for RAG. It is weak, however, on exact matches such as product codes, names and rare words, and on domains unlike its training data, so hybrid search that fuses its ranking with BM25’s is common. A cross-encoder, which reads the query and document together, is more accurate but must run per document, so it reranks the top candidates.', sDense()),
    item('ir-ann', '근사 최근접 이웃(HNSW)', 'Approximate nearest neighbors (HNSW)',
      '수십억 벡터 중 가까운 것을 찾으려 층 구조의 근접 그래프를 만들고, 위층에서 크게 이동하며 아래층으로 내려가 좁혀요. 약간의 정확도를 내주고 속도를 얻어요.',
      '밀집 검색은 질의 벡터와 가장 가까운 문서 벡터 k개를 찾아야 하는데, 10억 개의 768차원 벡터와 모두 비교하면 질의 하나에 수천억 번의 곱셈이 들어요. 근사 최근접 이웃(ANN)은 정답 일부를 놓칠 수 있는 대신 훨씬 빠르게 찾고, 품질은 정확한 검색 대비 recall@k로 재요. 가장 널리 쓰이는 HNSW(계층적 탐색 가능한 작은 세상 그래프)는 여러 층의 근접 그래프예요. 맨 아래 층에는 모든 점이 가까운 이웃 M개와 연결되고, 각 점은 무작위로 정한 높이까지의 위층에도 들어가서 위층일수록 점이 적고 링크가 길어요. 스킵 리스트와 비슷한 구조죠. 검색은 맨 위 층의 진입점에서 시작해 질의에 더 가까운 이웃으로 탐욕적으로 옮겨 가다 더 가까워질 수 없으면 한 층 내려가요. 위에서 크게 이동하고 아래에서 세밀하게 좁히는 거예요. 맨 아래 층에서는 후보 목록 크기 ef만큼 넓게 탐색해 가장 가까운 k개를 돌려줘요. M과 ef를 키우면 recall은 오르지만 속도와 메모리가 나빠지는 줄다리기가 있어요. 그래프는 메모리를 많이 써서, 벡터를 클러스터로 나눠 가까운 클러스터만 보는 IVF, 벡터를 압축하는 PQ, SSD에 그래프를 두는 DiskANN 등과 함께 써요. FAISS, Lucene, pgvector와 여러 벡터 DB가 HNSW를 지원해요.',
      'To find near vectors among billions, HNSW builds a layered proximity graph, taking big steps on upper layers and narrowing down on the way to the bottom, trading a little accuracy for speed.',
      'Dense retrieval must find the k document vectors nearest the query, and comparing against a billion 768-dimensional vectors would take hundreds of billions of multiplications per query. Approximate nearest neighbor (ANN) search may miss some true neighbors but is far faster, and its quality is measured as recall@k against exact search. The most widely used method, HNSW (hierarchical navigable small world), is a multi-layer proximity graph. In the bottom layer every point links to M near neighbors, and each point also joins upper layers up to a randomly drawn height, so higher layers have fewer points and longer links, much like a skip list. A search starts at the entry point of the top layer, greedily moves to neighbors closer to the query, and drops a layer when it can get no closer, taking big strides on top and fine steps below. On the bottom layer it explores more broadly, with a candidate list of size ef, and returns the k nearest. Raising M and ef improves recall at the cost of speed and memory. The graph is memory-hungry, so it is combined with IVF, which clusters vectors and searches only the nearest clusters, PQ, which compresses vectors, and DiskANN, which keeps the graph on SSD. FAISS, Lucene, pgvector and many vector databases support HNSW.', sHNSW()),
    item('ir-pq', '벡터 압축(곱 양자화)', 'Vector compression (product quantization)',
      '벡터를 여러 부분으로 나누고 부분마다 가장 가까운 코드북 중심의 번호로 바꿔 수십 배 압축해요. 거리는 미리 만든 표를 찾아 더하기만 하면 돼요.',
      '10억 개의 768차원 벡터를 float32로 저장하면 약 3TB라 메모리에 담기 어려워요. 곱 양자화(PQ)는 벡터를 m개의 부분 벡터로 나누고, 부분마다 k-평균으로 미리 학습한 256개의 중심(코드북) 중 가장 가까운 중심의 번호로 바꿔요. 번호는 0~255라 1바이트면 되니, 8차원 벡터를 4조각으로 나누면 [17, 203, 64, 9] 같은 4바이트 코드가 되고, 768차원 벡터는 m = 96이면 3,072바이트에서 96바이트로 32배 작아져요. 부분마다 256개씩이라 전체로는 256^m가지 조합을 표현할 수 있어서, 작은 코드북으로도 공간을 촘촘히 덮어요. 거리 계산은 질의를 압축하지 않은 채로 해요. 질의의 각 부분에서 256개 중심까지의 거리 표를 한 번 만들어 두면, 문서마다 코드로 표를 찾아 m개를 더하기만 하면 근사 거리가 나와요(비대칭 거리 계산). 압축할수록 정확도가 떨어지니 후보를 넉넉히 뽑고 원본 벡터로 재순위하기도 해요. 실제로는 먼저 벡터를 클러스터로 나눠 가까운 nprobe개 클러스터만 보는 IVF와 합친 IVF-PQ를 많이 쓰고, FAISS, ScaNN이 대표적인 구현이에요. 더 단순한 스칼라 양자화(float32 → int8, 4배)와 1비트 이진 양자화도 많이 써요.',
      'Vectors are split into pieces, and each piece is replaced by the ID of its nearest codebook centroid, compressing them dozens of times; distances become table lookups and additions.',
      'Storing a billion 768-dimensional vectors as float32 takes about 3 TB, which is hard to keep in memory. Product quantization (PQ) splits each vector into m subvectors and replaces each with the ID of its nearest of 256 centroids (a codebook) learned in advance by k-means. IDs run from 0 to 255 and fit in one byte, so an 8-dimensional vector split into 4 pieces becomes a 4-byte code such as [17, 203, 64, 9], and a 768-dimensional vector with m = 96 shrinks 32-fold from 3,072 bytes to 96. With 256 choices per piece, the codes can express 256^m combinations, covering the space finely with small codebooks. Distances are computed with the query left uncompressed: a table of distances from each query piece to the 256 centroids is built once, after which each document’s approximate distance is just m table lookups added together (asymmetric distance computation). Heavier compression costs accuracy, so extra candidates are often retrieved and reranked with the full vectors. In practice PQ is combined with IVF, which clusters vectors and searches only the nprobe nearest clusters, as IVF-PQ, with FAISS and ScaNN as leading implementations. Simpler scalar quantization (float32 to int8, 4×) and 1-bit binary quantization are popular too.', sPQ()),
    item('ir-splade', '학습된 희소 검색(SPLADE)', 'Learned sparse retrieval (SPLADE)',
      '신경망이 어휘 전체에 대한 단어 가중치를 정해, 문서에 없는 관련 단어로 확장하고 중요도를 다시 매겨요. 결과는 희소 벡터라 역색인으로 빠르게 검색해요.',
      '밀집 벡터는 의미를 잘 잡지만 역색인을 쓸 수 없고 정확한 일치에 약해요. 학습된 희소 검색은 그 중간으로, 신경망이 단어 가중치 벡터를 만들어요. SPLADE는 BERT의 마스크 언어 모델 머리가 각 토큰 위치에서 어휘 약 3만 단어마다 내는 점수를 log(1 + ReLU(·))로 바꿔 위치별 최댓값을 취해요. 그대로면 거의 모든 단어에 가중치가 생기니, FLOPS 규제로 대부분이 0이 되게 학습해 희소 벡터를 만들어요. "punctured bike tube" 문서는 원래 단어의 중요도가 다시 매겨지고, 원문에 없는 tire, bicycle, repair, flat 같은 관련 단어로 확장돼요. 질의도 같은 방식으로 바꾸면 fix에서 repair가 나와요. 점수는 겹치는 단어의 가중치 곱의 합이라 1.5 × 0.9 + 1.3 × 0.6 + 0.5 × 0.7 = 2.48이고, 공유 단어가 없는 BM25는 0이에요. 결과가 단어별 가중치라 기존 역색인에 그대로 넣어 BM25처럼 빠르게 검색하고, 어떤 단어 때문에 맞았는지 해석할 수 있어요. 정확한 일치와 의미 매칭을 함께 잡아 학습하지 않은 분야에서도 강한 편이에요. 비슷한 방법으로 문서에 생성한 질의를 덧붙이는 doc2query, 단어 가중치만 학습하는 uniCOIL이 있고, 토큰마다 벡터를 두고 늦게 상호작용하는 ColBERT는 밀집과 희소의 또 다른 중간 지점이에요.',
      'A neural network sets term weights over the whole vocabulary, expanding to related words absent from the document and reweighting terms. The result is a sparse vector searched quickly with an inverted index.',
      'Dense vectors capture meaning well but cannot use inverted indexes and are weak on exact matches. Learned sparse retrieval sits in between, with a neural network producing term-weight vectors. SPLADE takes the scores BERT’s masked-language-model head gives every word of its roughly 30,000-word vocabulary at each token position, transforms them with log(1 + ReLU(·)) and keeps the maximum over positions. Left alone, nearly every word would get a weight, so a FLOPS regularizer trains most of them to 0, producing a sparse vector. The document “punctured bike tube” has its own terms reweighted and is expanded to related words it never says, such as tire, bicycle, repair and flat. Queries are encoded the same way, so fix also yields repair. The score is the sum of weight products over shared terms, 1.5 × 0.9 + 1.3 × 0.6 + 0.5 × 0.7 = 2.48, while BM25, with no shared words, gives 0. Because the output is per-term weights, it goes straight into an existing inverted index, searches as fast as BM25, and shows which words caused a match. Combining exact and semantic matching, it holds up well on unfamiliar domains. Related methods include doc2query, which appends generated queries to documents, and uniCOIL, which learns only term weights, while ColBERT, with a vector per token and late interaction, is another middle ground between dense and sparse.', sSplade())
  ]),
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
})();
