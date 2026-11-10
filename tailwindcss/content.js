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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'twx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono twx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono twx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c twx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono twx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c twx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'twx-s twx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono twx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono twx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono twx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono twx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono twx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'twx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'twx-xs', 5));


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'twx-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono twx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'twx-a', g: 'twx-g', r: 'twx-r', w: 'twx-w', m: 'cz-mono', s: 'twx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'twx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono twx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono twx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'twx-xs ') + clsOf(c), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

const CSSX = `
.twx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.twx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.twx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.twx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.twx-r .in{color:var(--danger);font-weight:800}
.twx-g .in{color:var(--ok);font-weight:800}
.twx-a .in{color:var(--accent);font-weight:800}
.twx-w .in{color:var(--warn);font-weight:800}
.twx-c .in{font-size:.6em;font-weight:700}
.twx-c2 .in{font-size:.5em;font-weight:700}
.twx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.twx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.twx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
/* ===== Tailwind CSS · 1. utility-first basics, 2. layout ===== */
const CSSY = '.twx-ic .in{color:inherit!important}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc twx-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const SKY = ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'];

function sUtilityFirst() {
  return CW('tw-utility-first', {
    code: ['<button class="px-4 py-2 rounded-lg', '  bg-sky-600 text-white font-semibold', '  hover:bg-sky-700 shadow-sm">', ['  저장', '  Save'], '</button>', ['/* 전통 방식: 이름 짓고 CSS 파일에 */', '/* the traditional way: name it in CSS */'], '.btn-primary { padding: .5rem 1rem; … }'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [5, 2]],
    draw: (S) => {
      const X = 19.4, bx = X + 3.0, by = 2.0;
      sw(S, 'bt', bx, by, 6.0, 2.2, 'var(--ui)', 0, { css: 'border:.06em solid var(--line);z-index:2' });
      S.set('bt', 0, { background: 'var(--ui)', 'border-radius': '.05em', transform: 'scale(.6)' }); S.set('bt', 1, { transform: 'scale(1)', 'border-radius': '.6em' });
      S.set('bt', 2, { background: '#0284c7' }); S.set('bt', 3, { background: '#0369a1', 'box-shadow': '0 .15em .4em rgba(0,0,0,.25)' }); S.set('bt', 4, { background: '#0284c7', 'box-shadow': 'none' });
      cl(S, 'btl', bx, by + .65, 6.0, ['저장', 'Save'], 'twx-ic', 0, { css: 'z-index:3' }); S.set('btl', 0, { color: 'var(--ink)' }); S.set('btl', 2, { color: '#fff' });
      lbl(S, 'm1', X, 5.2, 'px-4 → padding-inline: 1rem', 'm a', 1, { off: 2 }); lbl(S, 'm1b', X, 6.3, 'rounded-lg → border-radius', 'm', 1, { off: 2 });
      lbl(S, 'm2', X, 5.2, 'bg-sky-600 → background', 'm g', 2, { off: 3 }); lbl(S, 'm2b', X, 6.3, 'text-white → color', 'm', 2, { off: 3 });
      lbl(S, 'm3', X, 5.2, ['hover: 마우스를 올렸을 때만', 'hover: only under the pointer'], 'w', 3, { off: 4 }); T(S, 'cur', bx + 4.6, by + 1.4, '👆', 'twx-l', 3, { off: 4 });
      lbl(S, 'm4', X, 5.2, ['이름 짓기·CSS 파일 오가기가 없어요', 'no naming, no switching to CSS files'], 'g', 4, { w: 12 }); lbl(S, 'm5', X, 6.3, ['스타일이 그 요소에만 · 지워도 안전', 'styles stay local, safe to delete'], 'g', 4, { w: 12 });
    },
    notes: [['클래스 하나가 CSS 선언 하나예요 · px-4는 좌우 패딩, rounded-lg는 둥근 모서리', 'each class is one CSS declaration: px-4 sets horizontal padding and rounded-lg rounds the corners'], ['bg-sky-600, text-white처럼 색과 글자도 클래스로 정해요 · HTML만 보고도 모양을 알 수 있어요', 'colors and text are classes too, such as bg-sky-600 and text-white, so the markup alone tells you the look'], ['hover:처럼 접두사를 붙이면 그 상태일 때만 적용돼요', 'a prefix such as hover: applies a class only in that state'], ['클래스 이름을 짓거나 CSS 파일을 오갈 필요가 없고, 요소를 지우면 스타일도 함께 사라져 CSS가 쌓이지 않아요', 'there are no class names to invent or CSS files to switch to, and deleting an element deletes its styles, so CSS never piles up']],
    fin: [['유틸리티 우선: 미리 정의된 작은 단일 목적 클래스를 조합해 마크업에서 바로 스타일을 입히는 방식', 'utility-first styling composes small single-purpose classes directly in the markup', 'twx-xs twx-a'], ['디자인 토큰(간격·색 단계)을 벗어나기 어려워 화면이 일관돼요', 'the design tokens (spacing and color scales) keep screens consistent'], ['클래스가 길어지면 컴포넌트로 추출해 반복을 줄여요', 'when class lists grow long, extract components to avoid repetition']],
    caps: [['클래스 = 선언', 'A class is a declaration'], ['색과 글자', 'Color and text'], ['상태 접두사', 'State prefixes'], ['왜 유틸리티인가', 'Why utilities'], ['유틸리티 우선', 'Utility-first']]
  });
}

function sScale() {
  return CW('tw-scale', {
    code: ['<div class="p-4">        /* 1rem = 16px */', '<div class="mt-8">       /* 2rem = 32px */', '<div class="w-64 h-32">  /* 16rem × 8rem */', '<div class="gap-2.5">    /* 0.625rem */', ['/* 1단위 = --spacing = 0.25rem (4px) */', '/* one unit = --spacing = 0.25rem (4px) */'], '<div class="w-1/2 max-w-prose size-10">'],
    hl: [[0, 2], [4, 1, 'ok'], [2, 2], [5, 1]],
    draw: (S) => {
      const X = 19.4, U = .6;
      hl(S, 'rl', X, X + 16 * U, 2.0, 'ink-3', 0, { w: .08 }); [0, 1, 2, 4, 8, 12, 16].forEach(n => { vl(S, 't' + n, X + n * U, 1.6, 2.0, 'ink-3', 0, { w: .06 }); cl(S, 'tl' + n, X + n * U - .5, .7, 1.0, '' + n, 'm', 0); });
      sw(S, 'p4', X, 2.6, 4 * U, .6, tint('accent', 50), 1, { off: 3 }); lbl(S, 'p4l', X + 4 * U + .3, 2.5, 'p-4 = 16px', 'm a', 1, { off: 3 });
      sw(S, 'm8', X, 3.6, 8 * U, .6, tint('ok', 50), 1, { off: 3 }); lbl(S, 'm8l', X + 8 * U + .3, 3.5, 'mt-8 = 32px', 'm g', 1, { off: 3 });
      lbl(S, 'n2', X, 5.0, ['숫자 × 4px · 모든 간격이 같은 박자', 'number × 4px: one rhythm for all spacing'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'w64', X, 2.6, 9.6, 4.8, tint('warn', 30), 3, { off: 4, css: 'border:.08em dashed var(--warn)' }); cl(S, 'w64l', X, 4.6, 9.6, 'w-64 h-32', 'm', 3, { off: 4 });
      [['w-1/2', 'width: 50%'], ['max-w-prose', 'max-width: 65ch'], ['size-10', 'w + h: 2.5rem']].forEach(([a, b], i) => { lbl(S, 'f' + i, X, 2.6 + i * 1.1, a, 'm a', 4); lbl(S, 'fb' + i, X + 4.4, 2.6 + i * 1.1, b, 'm', 4); });
    },
    notes: [['p-4는 padding: 1rem(16px), mt-8은 margin-top: 2rem이에요 · 숫자는 간격 단위의 개수예요', 'p-4 means padding: 1rem (16px) and mt-8 margin-top: 2rem; the number counts spacing units'], ['한 단위는 --spacing 변수(기본 0.25rem = 4px)라서 모든 간격이 4px 박자를 따라요', 'one unit is the --spacing variable (0.25rem = 4px by default), so all spacing follows a 4px rhythm'], ['w-64·h-32도 같은 스케일이에요 · 2.5처럼 반 단위도 써요', 'w-64 and h-32 use the same scale, and half steps such as 2.5 work too'], ['w-1/2 같은 분수는 퍼센트, max-w-prose는 읽기 좋은 폭, size-10은 너비와 높이를 함께 정해요', 'fractions such as w-1/2 are percentages, max-w-prose a readable width, and size-10 sets width and height together']],
    fin: [['간격 스케일: 4px 단위의 일관된 숫자로 패딩·마진·크기를 정하는 디자인 토큰', 'the spacing scale is a design token setting padding, margin and size in consistent 4px units', 'twx-xs twx-a'], ['v4는 --spacing 하나로 모든 숫자를 계산해서 w-13 같은 값도 바로 써요', 'v4 derives every number from --spacing, so values such as w-13 just work'], ['음수는 -mt-4처럼 앞에 -를 붙여요', 'negative values prefix a dash, as in -mt-4']],
    caps: [['숫자 = 단위 개수', 'Numbers count units'], ['4px 박자', 'A 4px rhythm'], ['크기도 같은 스케일', 'Sizes share the scale'], ['분수와 특별한 값', 'Fractions and special values'], ['간격과 크기 스케일', 'Spacing and size scales']]
  });
}

function sColors() {
  return CW('tw-colors', {
    code: ['<p class="text-slate-700">', '<div class="bg-sky-500 border-sky-700">', ['<div class="bg-black/50">   /* 50% 투명 */', '<div class="bg-black/50">   /* 50% alpha */'], ['<div class="bg-[#1da1f2]">  /* 임의 색 */', '<div class="bg-[#1da1f2]">  /* any color */'], ['/* v4: 팔레트가 oklch로 정의돼요 */', '/* v4: the palette is defined in oklch */'], '--color-sky-500: oklch(…);'],
    hl: [[0, 2], [1, 1, 'ok'], [2, 2], [4, 2]],
    draw: (S) => {
      const X = 19.4, L = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      L.forEach((n, i) => { sw(S, 'k' + i, X + i * 1.09, 1.2, 1.0, 2.0, SKY[i], 1); cl(S, 'kl' + i, X + i * 1.09 - .2, 3.4, 1.4, '' + n, 'm', 1); });
      lbl(S, 'h', X, .2, 'sky-50 … sky-950', 'm a', 1);
      lbl(S, 'n1', X, 4.6, ['색 이름 + 밝기 단계 50~950', 'a color name plus a shade from 50 to 950'], 'a', 1, { off: 2, w: 12 });
      S.set('k5', 2, { background: SKY[5], 'box-shadow': '0 0 0 .15em var(--ink)' }); S.set('k5', 0, { background: SKY[5], 'box-shadow': 'none' }); S.set('k5', 3, { 'box-shadow': 'none' });
      lbl(S, 'n2', X, 4.6, ['bg-, text-, border- 어디에나 같은 이름', 'the same names for bg-, text- and border-'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'ck', X + 1.0, 5.6, 4.4, 2.4, 'repeating-conic-gradient(#ccc 0 25%, #fff 0 50%) 0 0/.8em .8em', 3, { off: 4 }); sw(S, 'ov', X + 1.0, 5.6, 4.4, 2.4, 'rgba(0,0,0,.5)', 3, { off: 4 }); lbl(S, 'ovl', X + 6.0, 6.4, 'bg-black/50', 'm', 3, { off: 4 });
      lbl(S, 'n3', X, 4.6, ['/숫자로 투명도, [ ]로 팔레트 밖 색', '/n sets opacity; [ ] escapes the palette'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.6, ['oklch: 단계마다 밝기가 고르게 변해요', 'oklch: lightness steps evenly'], 'g', 4, { w: 12 });
    },
    notes: [['색은 slate, sky처럼 이름에 50부터 950까지의 밝기 단계를 붙여 써요', 'colors combine a name such as slate or sky with a shade from 50 to 950'], ['같은 색 이름을 bg-(배경), text-(글자), border-(테두리), ring- 등 어디에나 쓸 수 있어요', 'the same color names work with bg-, text-, border-, ring- and more'], ['bg-black/50처럼 /숫자로 투명도를 주고, bg-[#1da1f2]처럼 대괄호로 팔레트 밖 색도 써요', 'a slash adds opacity, as in bg-black/50, and brackets allow colors outside the palette, as in bg-[#1da1f2]'], ['v4의 기본 팔레트는 oklch로 정의되어 단계마다 밝기가 고르게 변하고 더 선명한 색을 써요', 'v4’s default palette is defined in oklch, with evenly stepped lightness and more vivid colors']],
    fin: [['색 유틸리티: {속성}-{색}-{단계}/{투명도} 형식 · 팔레트가 곧 디자인 시스템의 색 토큰이에요', 'color utilities follow {property}-{color}-{shade}/{opacity}, and the palette doubles as the design system’s color tokens', 'twx-xs twx-a'], ['브랜드 색은 @theme에 --color-brand-500처럼 추가해요', 'add brand colors in @theme, such as --color-brand-500'], ['글자와 배경의 대비(4.5:1)는 단계 차이로 쉽게 맞춰요', 'shade differences make 4.5:1 text contrast easy to hit']],
    caps: [['색 단계', 'Color shades'], ['어디에나 같은 이름', 'Same names everywhere'], ['투명도와 임의 색', 'Opacity and arbitrary colors'], ['oklch 팔레트', 'The oklch palette'], ['색과 투명도', 'Colors and opacity']]
  });
}

function sTypo() {
  return CW('tw-typography', {
    code: ['<h1 class="text-4xl font-bold tracking-tight">', '<p class="text-base/7 text-gray-600">', ['<p class="truncate">       /* 한 줄 말줄임 */', '<p class="truncate">       /* one-line … */'], ['<p class="line-clamp-2">   /* 두 줄까지 */', '<p class="line-clamp-2">   /* two lines max */'], ['<h2 class="text-balance">  /* 줄 고르게 */', '<h2 class="text-balance">  /* even lines */'], '<article class="prose dark:prose-invert">'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 2, 'warn'], [4, 2]],
    side: [
      [['text-4xl → 2.25rem', 'm a'], ['font-bold → 700', 'm'], [['tracking-tight: 자간 좁게', 'tracking-tight: tighter letters'], '']],
      [['text-base/7', 'm g'], [['크기/줄 간격을 한 번에', 'size and line height at once'], ''], [['본문은 gray-600~700으로 부드럽게', 'body text in gray-600 to 700'], '']],
      [[['truncate: 한 줄 + …', 'truncate: one line with …'], 'w'], [['line-clamp-2: 두 줄 + …', 'line-clamp-2: two lines with …'], 'w']],
      [[['text-balance: 제목 줄 길이 균형', 'text-balance evens heading lines'], 'a'], [['prose: 마크다운 HTML 일괄 스타일', 'prose styles markdown HTML at once'], 'g']]
    ],
    notes: [['text-4xl은 글자 크기, font-bold는 굵기, tracking-tight는 자간이에요 · 큰 제목은 자간을 살짝 좁히면 단단해 보여요', 'text-4xl sets size, font-bold weight and tracking-tight letter spacing; large headings look tighter with less tracking'], ['text-base/7처럼 슬래시로 글자 크기와 줄 간격을 함께 정해요 · 본문은 회색 600~700이 눈에 편해요', 'a slash sets size and line height together, as in text-base/7, and body text reads easily in gray 600 to 700'], ['truncate는 한 줄 말줄임, line-clamp-2는 두 줄까지만 보이고 말줄임을 해요', 'truncate cuts to one line with an ellipsis, and line-clamp-2 to two lines'], ['text-balance는 제목의 줄 길이를 고르게, prose 클래스(typography 플러그인)는 마크다운 HTML 전체를 보기 좋게 꾸며요', 'text-balance evens heading lines, and the prose class from the typography plugin styles whole markdown documents']],
    fin: [['글자 유틸리티: 크기·굵기·자간·줄 간격·줄바꿈을 클래스로 · 크기는 rem 기반이라 사용자 설정을 존중해요', 'typography utilities cover size, weight, tracking, line height and wrapping, with rem-based sizes that respect user settings', 'twx-xs twx-a'], ['font-sans·font-mono는 @theme의 --font-* 변수로 바꿔요', 'font-sans and font-mono map to --font-* variables in @theme'], ['한글 본문은 줄 간격을 1.7 안팎으로 넉넉하게', 'Korean body text likes a roomy line height around 1.7']],
    caps: [['크기·굵기·자간', 'Size, weight and tracking'], ['크기/줄 간격', 'Size/line height'], ['말줄임', 'Truncation'], ['균형과 prose', 'Balance and prose'], ['글자 유틸리티', 'Typography utilities']]
  });
}

function sArbitrary() {
  return CW('tw-arbitrary', {
    code: ['<div class="w-[37px] top-[117px]">', '<div class="bg-[#bada55] text-[22px]">', '<div class="grid-cols-[200px_1fr]">', '<div class="[mask-type:luminance]">', ['<div class="bg-(--brand)"> /* v4: 변수 */', '<div class="bg-(--brand)"> /* v4: a var */'], '<div class="w-[calc(100%-2rem)]">'],
    hl: [[0, 2], [2, 1], [3, 1, 'warn'], [4, 2, 'ok']],
    side: [
      [[['[ ] 안에 아무 값이나', 'any value inside [ ]'], 'a'], ['w-[37px] → width: 37px', 'm'], [['디자인 시안의 딱 그 숫자', 'that exact number from the mockup'], '']],
      [[['공백은 _로 적어요', 'write spaces as _'], 'a'], ['200px_1fr → 200px 1fr', 'm']],
      [[['[속성:값]으로 없는 속성도', '[property:value] for any property'], 'w'], [['정말 드문 경우에만', 'only for rare cases'], '']],
      [['bg-(--brand) = var(--brand)', 'm g'], [['calc()도 그대로 써요', 'calc() works as is'], ''], [['자주 쓰면 @theme에 토큰으로', 'frequent values belong in @theme'], 'g']]
    ],
    notes: [['스케일에 없는 값은 w-[37px]처럼 대괄호에 넣어 그 자리에서 만들어요', 'values off the scale go in brackets, as in w-[37px], and are generated on the spot'], ['대괄호 안에서 공백은 밑줄(_)로 적어요 · grid-cols-[200px_1fr]는 200px 1fr이 돼요', 'spaces inside brackets are written as underscores, so grid-cols-[200px_1fr] becomes 200px 1fr'], ['[mask-type:luminance]처럼 유틸리티가 없는 CSS 속성도 직접 쓸 수 있어요', 'properties with no utility can be written directly, as in [mask-type:luminance]'], ['v4에서는 bg-(--brand)처럼 괄호로 CSS 변수를 쓰고, 자주 반복되는 값은 @theme 토큰으로 올려요', 'v4 uses parentheses for CSS variables, as in bg-(--brand), and recurring values should become @theme tokens']],
    fin: [['임의 값: 대괄호 문법으로 디자인 스케일 밖의 값을 즉석에서 쓰는 탈출구', 'arbitrary values are a bracket-syntax escape hatch for values outside the design scale', 'twx-xs twx-a'], ['남발하면 일관성이 깨지니 일회성 값에만 써요', 'overuse breaks consistency, so keep them for one-offs'], ['hover:[…]처럼 변형 접두사와도 함께 써요', 'they combine with variants, as in hover:[…]']],
    caps: [['임의 값', 'Arbitrary values'], ['공백은 밑줄', 'Underscores for spaces'], ['임의 속성', 'Arbitrary properties'], ['CSS 변수와 calc', 'CSS variables and calc'], ['임의 값', 'Arbitrary values']]
  });
}

function sJit() {
  return CW('tw-jit', {
    code: [['/* 소스를 훑어 쓰인 클래스만 CSS로 */', '/* scan sources; emit only used classes */'], '<div class="text-red-500">  → .text-red-500', ['const c = `text-${color}-500`;  // ✗ 못 찾음', 'const c = `text-${color}-500`;  // ✗ unseen'], 'const c = color === "red"', '  ? "text-red-500" : "text-blue-500"; // ✓', ['@source "../packages/ui";  /* 추가 경로 */', '@source "../packages/ui";  /* extra path */']],
    hl: [[0, 2], [2, 1, 'danger'], [3, 2, 'ok'], [5, 1]],
    draw: (S) => {
      const X = 19.4;
      ['App.tsx', 'Card.tsx', 'index.html'].forEach((t, i) => nd(S, 'f' + i, X, .8 + i * 1.4, 4.0, t, 'line', 1, { h: 1.1 }));
      ar(S, 'a1', [X + 4.2, 2.2], [X + 5.2, 2.2], 'ink-3', 1, { h: .1 }); nd(S, 'sc', X + 5.4, 1.6, 2.6, ['스캔', 'scan'], 'accent', 1, { h: 1.2 }); ar(S, 'a2', [X + 8.1, 2.2], [X + 9.1, 2.2], 'ink-3', 1, { h: .1 });
      nd(S, 'cs', X + 9.2, 1.1, 2.8, 'CSS', 'ok', 1, { h: 2.2 });
      lbl(S, 'n1', X, 5.0, ['수천 개 중 실제로 쓴 클래스만 생성 · 작은 CSS', 'only the classes you use are generated'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 5.0, ['문자열을 조립하면 스캐너가 완성된 이름을 못 봐요', 'assembled strings hide the full name from the scanner'], 'r', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.0, ['완전한 클래스 이름을 그대로 적어 두기', 'always write complete class names'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 5.0, ['기본은 자동 감지(.gitignore 제외)', 'detection is automatic, honoring .gitignore'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 6.1, ['다른 패키지는 @source로 추가', 'add other packages with @source'], '', 4);
    },
    notes: [['Tailwind는 프로젝트 파일을 훑어 실제로 쓰인 클래스 이름만 CSS로 만들어요 · 그래서 결과 CSS가 아주 작아요', 'Tailwind scans project files and generates CSS only for class names actually used, keeping the output tiny'], ['`text-${color}-500`처럼 문자열을 조립하면 스캐너가 완성된 이름을 볼 수 없어서 스타일이 빠져요', 'assembling names such as `text-${color}-500` hides the full name from the scanner, so the style is missing'], ['조건에 따라 바뀌어도 "text-red-500"처럼 완전한 이름을 코드에 그대로 적어 두면 돼요', 'even when classes vary by condition, write complete names such as "text-red-500" in the code'], ['v4는 .gitignore를 존중하며 소스를 자동으로 찾고, 모노레포의 다른 패키지는 @source로 추가해요', 'v4 finds sources automatically while honoring .gitignore, and other monorepo packages are added with @source']],
    fin: [['필요한 것만 생성: 소스의 클래스 이름을 정적으로 찾아 쓰인 유틸리티만 만드는 빌드 방식', 'on-demand generation statically finds class names in sources and builds only the utilities used', 'twx-xs twx-a'], ['클래스 이름은 실행 중이 아니라 빌드 때 결정된다는 점을 기억해요', 'remember that class names are resolved at build time, not at run time'], ['데이터에서 오는 색은 style 속성이나 CSS 변수로 넘겨요', 'pass data-driven colors through the style attribute or CSS variables']],
    caps: [['쓰인 것만 생성', 'Generating only what is used'], ['조립한 이름의 함정', 'The assembled-name trap'], ['완전한 이름 쓰기', 'Writing complete names'], ['감지 범위', 'What gets scanned'], ['클래스 탐지와 생성', 'Class detection and generation']]
  });
}

function sFlexTw() {
  return CW('tw-flex', {
    code: ['<nav class="flex items-center', '            justify-between gap-4">', '  <Logo class="shrink-0" />', '  <ul class="flex gap-2">…</ul>', '  <Search class="flex-1 min-w-0" />', '</nav>', '<div class="flex flex-col md:flex-row">'],
    hl: [[0, 1], [1, 1, 'ok'], [4, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, Y = 1.4;
      sw(S, 'nav', X, Y, 12.0, 2.4, 'var(--ui)', 0, { css: 'border:.1em solid var(--line)', r: .4 });
      const pk = [[X + .3, Y + .6], [X + 2.8, Y + .6], [X + 6.1, Y + .6]], bt = [[X + .3, Y + .6], [X + 4.5, Y + .6], [X + 9.1, Y + .6]];
      const P = [pk, pk, bt, pk, pk], W = [[2.2, 3.0, 2.6], [2.2, 3.0, 2.6], [2.2, 3.0, 2.6], [2.2, 3.0, 5.6], [2.2, 3.0, 5.6]];
      [['Logo', 'accent'], ['ul', 'warn'], ['Search', 'ok']].forEach(([t, c], i) => { chip(S, 'it' + i, P[0][i][0], P[0][i][1], W[0][i], t, c, 0, { h: 1.2, pct: 30 }); S.set('it' + i, 0, { width: W[0][i] + 'em', transform: 'translate(0,0)' }); for (let s = 1; s <= 4; s++) S.move('it' + i, s, P[s][i][0], P[s][i][1], { width: W[s][i] + 'em' }); });
      lbl(S, 'n1', X, 4.6, 'flex items-center', 'm a', 1, { off: 2 }); lbl(S, 'n1b', X, 5.7, ['가로로 나란히, 세로 가운데', 'side by side, vertically centered'], '', 1, { off: 2 });
      lbl(S, 'n2', X, 4.6, 'justify-between gap-4', 'm g', 2, { off: 3 }); lbl(S, 'n2b', X, 5.7, ['양 끝 정렬과 일정한 간격', 'ends aligned, even gaps'], '', 2, { off: 3 });
      lbl(S, 'n3', X, 4.6, 'flex-1 min-w-0', 'm w', 3, { off: 4 }); lbl(S, 'n3b', X, 5.7, ['검색창이 남은 공간을 채워요', 'search fills the remaining space'], '', 3, { off: 4 });
      lbl(S, 'n4', X, 4.6, 'flex-col md:flex-row', 'm a', 4); lbl(S, 'n4b', X, 5.7, ['모바일은 세로, 넓으면 가로', 'stacked on mobile, a row when wide'], '', 4);
    },
    notes: [['flex는 자식을 가로로 나란히, items-center는 세로 가운데 정렬이에요', 'flex lines children up in a row, and items-center centers them vertically'], ['justify-between은 양 끝에 붙이고 사이를 균등하게, gap-4는 아이템 사이 간격이에요', 'justify-between pins items to the ends with even space, and gap-4 sets the gap between items'], ['flex-1은 남은 공간을 모두 차지하고, min-w-0은 긴 내용도 줄어들 수 있게 해요 · shrink-0은 로고가 찌그러지지 않게 해요', 'flex-1 takes the remaining space, min-w-0 lets long content shrink, and shrink-0 keeps the logo from squashing'], ['flex-col md:flex-row처럼 화면이 좁을 땐 세로, 넓어지면 가로로 바꿔요', 'flex-col md:flex-row stacks vertically on narrow screens and switches to a row on wider ones']],
    fin: [['Flexbox 유틸리티: flex, items-*, justify-*, gap-*, flex-1, shrink-0 등으로 한 방향 배치를 클래스로', 'Flexbox utilities such as flex, items-*, justify-*, gap-*, flex-1 and shrink-0 express one-directional layout as classes', 'twx-xs twx-a'], ['items는 교차축, justify는 주축 · CSS의 이름과 그대로 대응해요', 'items is the cross axis and justify the main axis, mirroring CSS'], ['space-x-* 보다 gap-*이 줄바꿈과 숨김 요소에 안전해요', 'gap-* is safer than space-x-* with wrapping and hidden elements']],
    caps: [['flex와 items-center', 'flex and items-center'], ['justify와 gap', 'justify and gap'], ['flex-1', 'flex-1'], ['방향 바꾸기', 'Switching direction'], ['Flexbox 유틸리티', 'Flexbox utilities']]
  });
}

function sGridTw() {
  return CW('tw-grid', {
    code: ['<ul class="grid grid-cols-1 gap-6', '           sm:grid-cols-2 lg:grid-cols-4">', '<li class="col-span-2 row-span-2">', '<div class="grid grid-cols-[240px_1fr]">', '<div class="grid place-items-center h-dvh">'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [3, 2]],
    draw: (S) => {
      const X = 19.4, G = .3, grid = (p, cols, st, off, span, N = 8) => { const w = (12.0 - (cols - 1) * G) / cols; let i = 0, r = 0, c = 0; const used = {}; for (let n = 0; n < N; n++) { while (used[r + ',' + c]) { c++; if (c >= cols) { c = 0; r++; } } const big = span && n === 0; const cw = big ? 2 * w + G : w, ch = big ? 2 * 1.2 + G : 1.2; chip(S, p + n, X + c * (w + G), .8 + r * (1.2 + G), cw, big ? 'span 2' : '' + (n + 1), big ? 'warn' : 'accent', st, { off, h: ch, pct: 26 }); if (big) { used[r + ',' + (c + 1)] = used[(r + 1) + ',' + c] = used[(r + 1) + ',' + (c + 1)] = 1; } c += big ? 2 : 1; if (c >= cols) { c = 0; r++; } } };
      grid('a', 1, 1, 2, 0, 0, 4); grid('b', 2, 2, 3, 0); grid('c', 4, 3, 4, 1);
      lbl(S, 'n1', X, 7.8, ['기본(모바일)은 1열', 'one column by default (mobile)'], 'a', 1, { off: 2 }); lbl(S, 'n2', X, 7.8, ['sm 이상 2열, lg 이상 4열', '2 columns from sm, 4 from lg'], 'g', 2, { off: 3 }); lbl(S, 'n3', X, 7.8, ['col-span-2 row-span-2: 큰 카드', 'col-span-2 row-span-2: a feature card'], 'w', 3, { off: 4 });
      chip(S, 'sb', X, .8, 3.6, '240px', 'ok', 4, { h: 4.0 }); chip(S, 'mn', X + 3.9, .8, 8.1, '1fr', 'accent', 4, { h: 4.0 }); lbl(S, 'n4', X, 5.4, ['임의 값으로 고정 열 + 유연한 열', 'a fixed column plus a flexible one'], 'a', 4); lbl(S, 'n5', X, 6.5, ['place-items-center: 한 줄 가운데 정렬', 'place-items-center: centering in one class'], 'g', 4, { w: 12 });
    },
    notes: [['grid grid-cols-1 gap-6은 한 열짜리 그리드예요 · 접두사 없는 클래스는 모바일부터 모든 화면에 적용돼요', 'grid grid-cols-1 gap-6 is a one-column grid; unprefixed classes apply to every screen, starting with mobile'], ['sm:grid-cols-2 lg:grid-cols-4처럼 화면이 넓어질수록 열을 늘려요', 'sm:grid-cols-2 lg:grid-cols-4 adds columns as the screen widens'], ['col-span-2 row-span-2는 두 칸씩 차지하는 큰 카드를 만들어요', 'col-span-2 row-span-2 makes a feature card spanning two tracks each way'], ['grid-cols-[240px_1fr]로 고정 사이드바 + 유연한 본문을, place-items-center로 가운데 정렬을 한 줄에 해요', 'grid-cols-[240px_1fr] gives a fixed sidebar and flexible main area, and place-items-center centers in one class']],
    fin: [['Grid 유틸리티: grid-cols-*, col-span-*, gap-*에 반응형 접두사를 붙여 카드 목록과 페이지 골격을 만들어요', 'Grid utilities such as grid-cols-*, col-span-* and gap-*, with responsive prefixes, build card lists and page skeletons', 'twx-xs twx-a'], ['grid-cols-12 같은 열 수와 subgrid도 지원해요', 'column counts such as grid-cols-12 and subgrid are supported'], ['반복 열은 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]처럼 임의 값으로', 'repeating columns use arbitrary values such as grid-cols-[repeat(auto-fill,minmax(200px,1fr))]']],
    caps: [['1열 시작', 'Starting with one column'], ['화면별 열 수', 'Columns per screen'], ['칸 합치기', 'Spanning tracks'], ['임의 열과 가운데 정렬', 'Custom tracks and centering'], ['Grid 유틸리티', 'Grid utilities']]
  });
}

function sResponsive() {
  return CW('tw-responsive', {
    code: ['<img class="w-full md:w-1/2 lg:w-1/3">', ['/* 접두사 없음 = 모든 크기(모바일부터) */', '/* no prefix = every size, mobile up */'], '/* sm 40 · md 48 · lg 64 · xl 80 (rem) */', '<p class="text-sm md:text-base">', '<nav class="hidden md:flex">', ['<div class="max-md:hidden">  /* md 미만에서 */', '<div class="max-md:hidden">  /* below md */']],
    hl: [[0, 2], [2, 1], [3, 2, 'ok'], [5, 1, 'warn']],
    draw: (S) => {
      const D = [['ph', 19.4, 2.6, '375'], ['tb', 22.4, 3.8, '820'], ['dt', 26.6, 4.8, '1280']], Y = 1.6;
      D.forEach(([k, x, w, t]) => { frame(S, k, x, Y, w, 5.0, 'ink-3', 0, { w: .1, r: .4 }); lbl(S, k + 'l', x, .6, t, 'm', 0); });
      sw(S, 'i0', 19.6, Y + .3, 2.2, 1.6, tint('accent', 40), 1); sw(S, 'i1', 22.6, Y + .3, 1.7, 1.6, tint('ok', 40), 2); sw(S, 'i2', 26.8, Y + .3, 1.5, 1.6, tint('warn', 40), 2);
      lbl(S, 'w0', 19.4, 7.0, 'w-full', 'm a', 1); lbl(S, 'w1', 22.4, 7.0, 'md:w-1/2', 'm g', 2); lbl(S, 'w2', 26.6, 7.0, 'lg:w-1/3', 'm w', 2);
      lbl(S, 'n1', 19.4, 8.2, ['접두사 없는 클래스가 모바일 기본값', 'unprefixed classes are the mobile base'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', 19.4, 8.2, ['md: = 48rem(768px) 이상에서', 'md: means from 48rem (768px) up'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'nv1', 22.6, Y + 2.3, 3.4, 'nav', 'ok', 3); chip(S, 'nv2', 26.8, Y + 2.3, 4.4, 'nav', 'ok', 3); lbl(S, 'n3', 19.4, 8.2, ['hidden md:flex: 넓은 화면에서만 보이기', 'hidden md:flex shows it on wide screens only'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', 19.4, 8.2, ['max-md: 처럼 “미만” 범위도 지정해요', 'max-md: targets “below” ranges'], 'a', 4, { w: 12 });
    },
    notes: [['반응형 접두사는 “그 크기 이상에서”라는 뜻이에요 · 접두사 없는 w-full이 모바일 기본값이에요', 'responsive prefixes mean “from this size up”, so the unprefixed w-full is the mobile default'], ['md:w-1/2는 48rem(768px) 이상, lg:w-1/3은 64rem 이상에서 덮어써요 · 모바일 우선 방식이에요', 'md:w-1/2 overrides from 48rem (768px) and lg:w-1/3 from 64rem: mobile first'], ['hidden md:flex는 좁은 화면에서는 숨기고 넓은 화면에서만 보여줘요', 'hidden md:flex hides an element on narrow screens and shows it on wider ones'], ['max-md:처럼 max-를 붙이면 그 크기 “미만”에만 적용돼요 · md:max-lg:로 범위도 만들어요', 'a max- prefix such as max-md: applies only below that size, and md:max-lg: targets a range']],
    fin: [['반응형 접두사: sm·md·lg·xl·2xl로 화면 크기별 스타일을 클래스에 바로 적는 모바일 우선 방식', 'responsive prefixes (sm, md, lg, xl, 2xl) write per-screen styles right in the class list, mobile first', 'twx-xs twx-a'], ['“sm:은 휴대폰용”이 아니라 “40rem 이상”이에요 · 흔한 착각이에요', 'sm: does not mean phones; it means 40rem and up, a common confusion'], ['@theme의 --breakpoint-*로 기준을 추가하거나 바꿔요', 'add or change breakpoints with --breakpoint-* in @theme']],
    caps: [['모바일 기본값', 'The mobile base'], ['크기별 덮어쓰기', 'Overriding by size'], ['보이기·숨기기', 'Showing and hiding'], ['미만과 범위', 'Below and ranges'], ['반응형 디자인', 'Responsive design']]
  });
}

function sContainerTw() {
  return CW('tw-container-q', {
    code: ['<div class="@container">', '  <div class="flex flex-col @md:flex-row">', '    <img class="@md:w-40" />', '    <p class="text-sm @lg:text-base">…</p>', '  </div>', '</div>', ['/* v4에 기본 내장 · @sm @md @lg … */', '/* built into v4: @sm @md @lg … */']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'sd', X, .8, 4.0, 5.2, 'warn', 1, { w: .1, dash: 1 }); lbl(S, 'sdl', X + .2, .9, '@container', 'm w', 1);
      frame(S, 'mn', X + 4.4, .8, 7.6, 5.2, 'accent', 1, { w: .1, dash: 1 }); lbl(S, 'mnl', X + 4.6, .9, '@container', 'm a', 1);
      sw(S, 's1', X + .3, 2.0, 3.4, 1.8, tint('ok', 40), 2); sw(S, 's2', X + .3, 4.0, 3.4, 1.4, tint('line', 14), 2); cl(S, 's2l', X + .3, 4.35, 3.4, 'text', 'm', 2);
      sw(S, 'm1', X + 4.7, 2.0, 2.6, 1.8, tint('ok', 40), 2); sw(S, 'm2', X + 7.5, 2.0, 4.2, 1.8, tint('line', 14), 2); cl(S, 'm2l', X + 7.5, 2.6, 4.2, 'text', 'm', 2);
      lbl(S, 'n1', X, 6.4, ['부모를 컨테이너로 지정', 'mark the parent as a container'], 'a', 1, { off: 2 });
      lbl(S, 'n2', X, 6.4, ['@md: 화면이 아니라 부모 폭 기준', '@md: by parent width, not the screen'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 6.4, ['같은 컴포넌트가 칸에 따라 다르게', 'one component, laid out per slot'], 'a', 3, { off: 4 });
      lbl(S, 'n4', X, 6.4, ['v4는 플러그인 없이 바로 써요', 'v4 needs no plugin for this'], 'g', 4);
    },
    notes: [['@container를 준 요소는 자식들이 크기를 물어볼 수 있는 컨테이너가 돼요', 'an element with @container becomes a container its children can query'], ['@md:flex-row는 화면이 아니라 그 컨테이너의 폭이 md 이상일 때 적용돼요', '@md:flex-row applies when the container, not the screen, is at least md wide'], ['그래서 같은 카드가 좁은 사이드바에서는 세로로, 넓은 본문에서는 가로로 놓여요', 'so the same card stacks in a narrow sidebar and sits side by side in a wide main area'], ['v4는 컨테이너 쿼리를 기본으로 지원해 플러그인 없이 @sm, @md, @lg를 쓸 수 있어요', 'v4 supports container queries out of the box, so @sm, @md and @lg need no plugin']],
    fin: [['컨테이너 쿼리 유틸리티: @container와 @md: 같은 접두사로 부모 크기에 반응하는 컴포넌트', 'container query utilities, @container plus prefixes such as @md:, make components respond to their parent’s size', 'twx-xs twx-a'], ['@container/name과 @md/name으로 이름 붙인 컨테이너를 고를 수 있어요', 'named containers use @container/name and @md/name'], ['페이지는 md:, 컴포넌트 안쪽은 @md:로 나눠 쓰면 재사용성이 높아져요', 'use md: for pages and @md: inside components for better reuse']],
    caps: [['@container', '@container'], ['@md:', '@md:'], ['자리마다 다른 배치', 'Layouts per slot'], ['v4 기본 지원', 'Built into v4'], ['컨테이너 쿼리', 'Container queries']]
  });
}

function sSizing() {
  return CW('tw-sizing', {
    code: [['<img class="size-12 rounded-full"> /* 3rem */', '<img class="size-12 rounded-full"> /* 3rem */'], '<main class="w-full max-w-3xl mx-auto px-4">', ['<div class="min-h-dvh">  /* 화면 높이 */', '<div class="min-h-dvh">  /* screen height */'], '<div class="aspect-video">  /* 16:9 */', '<span class="w-fit h-px">'],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1], [3, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'av', X + 4.6, 1.2, 2.8, 2.8, tint('accent', 40), 1, { off: 2, r: 1.4 }); lbl(S, 'avl', X, 4.6, ['size-12: 너비와 높이를 한 번에', 'size-12 sets width and height at once'], 'a', 1, { off: 2 });
      frame(S, 'vw', X, .8, 12.0, 4.4, 'ink-3', 2, { off: 3, w: .08 }); sw(S, 'mx', X + 2.0, 1.2, 8.0, 3.6, tint('ok', 30), 2, { off: 3 }); cl(S, 'mxl', X + 2.0, 2.7, 8.0, 'max-w-3xl mx-auto', 'm', 2, { off: 3 });
      lbl(S, 'n2', X, 5.8, ['최대 폭을 정하고 가운데로 · 본문 레이아웃의 기본', 'cap the width and center it: the classic page body'], 'g', 2, { off: 3, w: 12 });
      frame(S, 'ph', X + 4.0, .6, 3.4, 6.0, 'ink-3', 3, { off: 4, w: .1, r: .4 }); sw(S, 'dv', X + 4.2, .8, 3.0, 5.6, tint('warn', 30), 3, { off: 4 }); cl(S, 'dvl', X + 4.0, 3.3, 3.4, 'min-h-dvh', 'm', 3, { off: 4 });
      lbl(S, 'n3', X, 7.2, ['dvh: 모바일 주소창이 바뀌어도 정확한 높이', 'dvh tracks mobile toolbars accurately'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'vd', X + 1.0, .8, 8.0, 4.5, tint('accent', 30), 4); cl(S, 'vdl', X + 1.0, 2.7, 8.0, 'aspect-video · 16:9', 'm', 4); lbl(S, 'n4', X, 5.8, ['비율 고정 · 영상·썸네일 자리 확보', 'a fixed ratio reserves space for media'], 'a', 4, { w: 12 });
    },
    notes: [['size-12는 너비와 높이를 함께 3rem으로 정해요 · rounded-full과 함께 동그란 아바타를 만들어요', 'size-12 sets both width and height to 3rem, and with rounded-full makes a round avatar'], ['w-full max-w-3xl mx-auto는 “최대 폭을 정하고 가운데로”라는 본문 레이아웃의 기본 조합이에요', 'w-full max-w-3xl mx-auto is the classic page body: cap the width and center it'], ['min-h-dvh는 화면 높이만큼을 최소로 · 모바일 주소창이 나타나고 사라져도 정확해요', 'min-h-dvh makes it at least the screen height, accurate even as mobile toolbars come and go'], ['aspect-video는 16:9 비율을 고정해 영상과 썸네일의 자리를 미리 확보해요', 'aspect-video locks a 16:9 ratio, reserving space for videos and thumbnails']],
    fin: [['크기 유틸리티: w-*, h-*, size-*, min-/max-*, aspect-* · 스케일 값, 분수, 화면 단위를 모두 써요', 'sizing utilities w-*, h-*, size-*, min-/max-* and aspect-* accept scale values, fractions and viewport units', 'twx-xs twx-a'], ['w-screen보다 w-full이 스크롤바 문제를 덜 일으켜요', 'w-full causes fewer scrollbar issues than w-screen'], ['max-w-prose는 본문 글에 알맞은 약 65ch 폭이에요', 'max-w-prose is about 65ch, ideal for body text']],
    caps: [['size-*', 'size-*'], ['최대 폭과 가운데', 'Max width and centering'], ['화면 높이', 'Screen height'], ['비율 고정', 'Fixed ratios'], ['크기 유틸리티', 'Sizing utilities']]
  });
}
/* ===== Tailwind CSS · 2b. position, 3. variants ===== */
function sPositionTw() {
  return CW('tw-position', {
    code: ['<div class="relative">', '  <img class="rounded-xl" />', '  <span class="absolute top-2 right-2">', '  <div class="absolute inset-0 bg-black/40"/>', '</div>', '<header class="sticky top-0 z-10">', '<button class="fixed bottom-4 right-4">'],
    hl: [[0, 1], [2, 1, 'ok'], [3, 1, 'warn'], [5, 2]],
    draw: (S) => {
      const X = 19.4, cx = X + 2.0, cy = 1.0;
      sw(S, 'cd', cx, cy, 8.0, 5.0, tint('accent', 30), 0, { r: .6, off: 4 }); frame(S, 'rf', cx, cy, 8.0, 5.0, 'accent', 1, { off: 2, w: .1, dash: 1 });
      lbl(S, 'n1', X, 6.6, ['relative: 자식 absolute의 기준점', 'relative anchors absolute children'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'bd', cx + 5.6, cy + .5, 1.9, 'NEW', 'ok', 2, { h: .9, css: 'z-index:3', off: 4 }); lbl(S, 'n2', X, 6.6, ['top-2 right-2: 모서리에서 0.5rem', 'top-2 right-2: 0.5rem from the corner'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'ov', cx, cy, 8.0, 5.0, 'rgba(0,0,0,.4)', 3, { off: 4, r: .6 }); lbl(S, 'n3', X, 6.6, ['inset-0: 네 변 0 · 부모를 꽉 덮기', 'inset-0 covers the parent fully'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'hd', X, .8, 12.0, 1.1, tint('accent', 50), 4, { css: 'z-index:3' }); cl(S, 'hdl', X, 1.0, 12.0, 'sticky top-0 z-10', 'm', 4, { css: 'z-index:4' });
      [0, 1, 2].forEach(i => sw(S, 'ln' + i, X, 2.3 + i * 1.0, 12.0 - i * 2.4, .45, tint('line', 30), 4)); chip(S, 'fab', X + 10.0, 5.0, 1.8, '+', 'ok', 4, { h: 1.4 });
      lbl(S, 'n4', X, 6.6, ['sticky: 스크롤해도 위에 · fixed: 화면 기준', 'sticky stays on top; fixed follows the screen'], 'a', 4, { w: 12 });
    },
    notes: [['relative를 준 부모가 absolute 자식의 위치 기준이 돼요', 'a relative parent becomes the reference box for absolute children'], ['absolute top-2 right-2는 기준 상자의 오른쪽 위 모서리에서 0.5rem 떨어진 곳에 배지를 놓아요', 'absolute top-2 right-2 places a badge 0.5rem from the top-right corner of that box'], ['inset-0은 top·right·bottom·left를 모두 0으로 · 이미지 위를 꽉 덮는 어두운 오버레이를 만들어요', 'inset-0 sets all four sides to 0, making an overlay that covers the image'], ['sticky top-0은 스크롤해도 위에 붙는 헤더, fixed는 화면 기준으로 고정된 버튼이에요 · z-10으로 겹침 순서를 정해요', 'sticky top-0 makes a header that sticks while scrolling, fixed pins a button to the screen, and z-10 sets the stacking order']],
    fin: [['위치 유틸리티: relative·absolute·fixed·sticky와 inset-*, top-*, z-*로 겹치는 요소를 배치해요', 'position utilities, relative, absolute, fixed and sticky with inset-*, top-* and z-*, place overlapping elements', 'twx-xs twx-a'], ['absolute는 가장 가까운 position 있는 조상을 기준으로 해요', 'absolute positions against the nearest positioned ancestor'], ['sticky가 안 붙으면 조상의 overflow:hidden을 의심해요', 'if sticky fails, suspect overflow: hidden on an ancestor']],
    caps: [['기준점 만들기', 'Creating an anchor'], ['모서리 배지', 'A corner badge'], ['꽉 덮는 오버레이', 'A full overlay'], ['sticky와 fixed', 'sticky and fixed'], ['위치 지정', 'Positioning']]
  });
}

function sStates() {
  return CW('tw-states', {
    code: ['<button class="bg-sky-600', '  hover:bg-sky-700', '  active:scale-95', '  focus-visible:outline-2', '  focus-visible:outline-offset-2', '  disabled:opacity-50', '  disabled:cursor-not-allowed">'],
    hl: [[1, 1], [2, 1, 'ok'], [3, 2, 'warn'], [5, 2]],
    draw: (S) => {
      const X = 19.4, bx = X + 3.0, by = 2.0;
      sw(S, 'bt', bx, by, 6.0, 2.0, '#0284c7', 0, { css: 'z-index:2', r: .5 }); cl(S, 'btl', bx, by + .55, 6.0, ['저장', 'Save'], 'twx-ic', 0, { css: 'z-index:3;color:#fff' });
      S.set('bt', 0, { background: '#0284c7', transform: 'scale(1)', 'box-shadow': 'none', opacity: '1' });
      S.set('bt', 1, { background: '#0369a1' }); S.set('bt', 2, { transform: 'scale(.95)' }); S.set('bt', 3, { transform: 'scale(1)', background: '#0284c7', 'box-shadow': '0 0 0 .15em var(--ui),0 0 0 .3em var(--accent)' }); S.set('bt', 4, { 'box-shadow': 'none', opacity: '.5' });
      T(S, 'cur', bx + 4.4, by + 1.2, '👆', 'twx-l', 1, { off: 3 });
      lbl(S, 'n1', X, 5.0, ['hover: 포인터를 올렸을 때', 'hover: under the pointer'], 'a', 1, { off: 2 }); lbl(S, 'n2', X, 5.0, ['active: 누르고 있는 동안', 'active: while pressed'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 5.0, ['focus-visible: 키보드로 왔을 때만 링', 'focus-visible: a ring only for keyboard focus'], 'w', 3, { off: 4, w: 12 }); T(S, 'kb', bx - 2.6, by + .3, '⌨', 'twx-l', 3, { off: 4 });
      lbl(S, 'n4', X, 5.0, ['disabled: 비활성 상태 표시', 'disabled: the inactive state'], 'a', 4);
      lbl(S, 'v', X, 6.6, 'dark:md:hover:bg-sky-500', 'm', 4); lbl(S, 'vb', X, 7.7, ['변형은 쌓을 수 있어요(왼쪽부터 적용)', 'variants stack, applied left to right'], '', 4, { w: 12 });
    },
    notes: [['hover:를 붙인 클래스는 포인터를 올렸을 때만 적용돼요 · v4는 실제 hover가 가능한 기기에서만 동작해요', 'a hover: class applies only under the pointer, and in v4 only on devices that can actually hover'], ['active:는 누르고 있는 동안이에요 · scale-95로 눌리는 느낌을 줘요', 'active: applies while pressed, and scale-95 gives a pressed feel'], ['focus-visible:은 키보드로 이동했을 때만 초점 링을 보여줘서 마우스 사용자를 방해하지 않아요', 'focus-visible: shows the focus ring only for keyboard navigation, so mouse users are not distracted'], ['disabled:는 비활성 버튼의 모양이에요 · dark:md:hover:처럼 변형을 겹쳐 조건을 좁힐 수 있어요', 'disabled: styles an inactive button, and variants such as dark:md:hover: stack to narrow the condition']],
    fin: [['상태 변형: hover·focus·active·disabled 같은 의사 클래스를 접두사로 붙여 상태별 스타일을 같은 자리에 적어요', 'state variants turn pseudo-classes such as hover, focus, active and disabled into prefixes, keeping every state in one place', 'twx-xs twx-a'], ['접두사가 없는 기본 스타일 위에 조건별로 덮어쓰는 구조예요', 'each variant overrides the unprefixed base style under its condition'], ['first:, last:, odd:, required:, invalid:도 같은 방식이에요', 'first:, last:, odd:, required: and invalid: work the same way']],
    caps: [['hover', 'hover'], ['active', 'active'], ['focus-visible', 'focus-visible'], ['disabled와 쌓기', 'disabled and stacking'], ['상태 변형', 'State variants']]
  });
}

function sGroupPeer() {
  return CW('tw-group-peer', {
    code: ['<a class="group p-4 hover:bg-sky-50">', '  <h3 class="group-hover:text-sky-700">', '  <span class="group-hover:translate-x-1">→', '<input type="email" class="peer" />', '<p class="hidden peer-invalid:block">', ['  이메일 형식이 아니에요', '  Not a valid email'], '<li class="group/item"> … group-hover/item:'],
    hl: [[0, 1], [1, 2, 'ok'], [3, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'cd', X, .8, 12.0, 3.2, 'var(--ui)', 0, { css: 'border:.08em solid var(--line)', r: .5 }); S.set('cd', 0, { background: 'var(--ui)' }); S.set('cd', 2, { background: tint('accent', 12) }); S.set('cd', 3, { background: 'var(--ui)' });
      T(S, 'h', X + .6, 1.3, ['문서 보기', 'Read the docs'], 'twx-s twx-ic', 0, { css: 'z-index:3' }); S.set('h', 0, { color: 'var(--ink)' }); S.set('h', 2, { color: 'var(--accent)' }); S.set('h', 3, { color: 'var(--ink)' });
      T(S, 'ar', X + 9.6, 1.2, '→', 'twx-l', 0, { css: 'z-index:3' }); S.set('ar', 0, { transform: 'translate(0,0)' }); S.set('ar', 2, { transform: 'translate(.6em,0)' }); S.set('ar', 3, { transform: 'translate(0,0)' });
      T(S, 'cur', X + 6.0, 2.4, '👆', 'twx-l', 2, { off: 3 });
      lbl(S, 'n1', X, 4.4, ['group: 부모에 표시', 'group marks the parent'], 'a', 1, { off: 2 }); lbl(S, 'n2', X, 4.4, ['부모에 올리면 자식이 함께 변해요', 'hovering the parent changes the children'], 'g', 2, { off: 3, w: 12 });
      sw(S, 'in', X, 5.8, 12.0, 1.3, 'var(--ui)', 3, { off: 4, css: 'border:.08em solid var(--line)', r: .3 }); S.set('in', 3, { 'border-color': 'var(--danger)' }); T(S, 'iv', X + .4, 6.05, 'kim@', 'cz-mono twx-s', 3, { off: 4 });
      lbl(S, 'er', X, 7.4, ['이메일 형식이 아니에요', 'Not a valid email'], 'r', 3, { off: 4 }); lbl(S, 'n3', X, 8.6, ['peer: 앞 형제의 상태에 반응', 'peer reacts to a previous sibling'], 'w', 3, { off: 4 });
      lbl(S, 'n4', X, 5.8, ['group/item: 이름 붙인 그룹', 'group/item: a named group'], 'a', 4); lbl(S, 'n5', X, 6.9, ['중첩돼도 어느 부모인지 골라요', 'pick the right parent when nested'], '', 4, { w: 12 });
    },
    notes: [['부모에 group 클래스를 달면 자식이 그 부모의 상태를 볼 수 있어요', 'a group class on the parent lets children read the parent’s state'], ['group-hover:는 카드 어디에 올려도 제목 색과 화살표가 함께 움직이게 해요', 'group-hover: makes the title color and arrow change wherever the card is hovered'], ['peer를 단 input 뒤의 형제는 peer-invalid:로 입력이 틀렸을 때만 오류 문구를 보여줘요 · peer는 앞에 있어야 해요', 'a sibling after an input marked peer uses peer-invalid: to show an error only when the input is invalid; the peer must come first'], ['group/item처럼 이름을 붙이면 중첩된 그룹 중 어느 부모의 상태를 볼지 고를 수 있어요', 'naming a group, as in group/item, chooses which parent’s state to read when groups nest']],
    fin: [['group과 peer: 부모나 앞 형제의 상태에 따라 다른 요소를 꾸미는 변형 · JS 없이 상호작용을 표현해요', 'group and peer style an element by the state of its parent or previous sibling, expressing interaction without JS', 'twx-xs twx-a'], ['group-focus-within:, peer-checked:, group-has-*:로 응용해요', 'extend it with group-focus-within:, peer-checked: and group-has-*:'], ['v4는 in-*: 변형으로 group 없이도 조상 상태를 볼 수 있어요', 'v4’s in-*: variant reads ancestor state even without a group class']],
    caps: [['group 표시', 'Marking a group'], ['group-hover', 'group-hover'], ['peer-invalid', 'peer-invalid'], ['이름 붙인 그룹', 'Named groups'], ['group과 peer', 'group and peer']]
  });
}

function sDarkTw() {
  return CW('tw-dark', {
    code: ['<div class="bg-white text-slate-900', '  dark:bg-slate-900 dark:text-white">', ['/* 기본: 운영체제 설정을 따라요 */', '/* default: follows the OS setting */'], '@media (prefers-color-scheme: dark)', ['/* 직접 토글: 클래스로 바꾸기 */', '/* manual toggle: switch by class */'], '@custom-variant dark', '  (&:where(.dark, .dark *));', 'document.documentElement', '  .classList.toggle("dark")'],
    hl: [[0, 2], [2, 2, 'ok'], [4, 3, 'warn'], [7, 2]],
    draw: (S) => {
      const X = 19.4, cx = X + 1.5, cy = 1.0;
      sw(S, 'cd', cx, cy, 9.0, 4.4, '#ffffff', 0, { css: 'border:.08em solid var(--line)', r: .6 }); S.set('cd', 0, { background: '#ffffff' }); S.set('cd', 1, { background: '#0f172a' }); S.set('cd', 2, { background: '#ffffff' }); S.set('cd', 3, { background: '#0f172a' });
      T(S, 'tt', cx + .7, cy + .6, ['오늘의 할 일', 'Today'], 'twx-l twx-ic', 0, { css: 'z-index:3' }); S.set('tt', 0, { color: '#0f172a' }); S.set('tt', 1, { color: '#ffffff' }); S.set('tt', 2, { color: '#0f172a' }); S.set('tt', 3, { color: '#ffffff' });
      [0, 1].forEach(i => { sw(S, 'ln' + i, cx + .7, cy + 2.0 + i * .9, 6.0 - i * 2, .4, '#cbd5e1', 0, { css: 'z-index:3' }); S.set('ln' + i, 0, { background: '#cbd5e1' }); S.set('ln' + i, 1, { background: '#475569' }); S.set('ln' + i, 2, { background: '#cbd5e1' }); S.set('ln' + i, 3, { background: '#475569' }); });
      lbl(S, 'n1', X, 6.0, ['dark: 어두운 모드일 때만 덮어써요', 'dark: overrides only in dark mode'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.0, ['기본은 OS 설정(prefers-color-scheme)', 'by default it follows the OS setting'], 'g', 2, { off: 3, w: 12 }); T(S, 'os', X + 10.6, 1.0, '⚙', 'twx-l', 2, { off: 3 });
      lbl(S, 'n3', X, 6.0, ['.dark 클래스가 있으면 dark: 적용', 'dark: applies under a .dark class'], 'w', 3, { off: 4, w: 12 }); chip(S, 'tg', X + 9.4, 1.0, 2.4, '☾', 'warn', 3, { off: 4, h: 1.1 });
      lbl(S, 'n4', X, 6.0, ['선택을 localStorage에 저장', 'store the choice in localStorage'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 7.1, ['첫 그리기 전에 적용해 깜빡임 방지', 'apply before first paint to avoid a flash'], '', 4, { w: 12 });
    },
    notes: [['dark:를 붙인 클래스는 어두운 모드일 때만 적용돼요 · 밝은 기본값 옆에 어두운 값을 나란히 적어요', 'dark: classes apply only in dark mode, written right next to the light defaults'], ['기본 설정에서는 운영체제의 prefers-color-scheme을 따라 자동으로 바뀌어요', 'by default dark mode follows the operating system’s prefers-color-scheme'], ['사용자가 직접 고르게 하려면 @custom-variant로 dark를 “.dark 클래스 아래”로 바꾸고 html에 클래스를 토글해요', 'to let users choose, redefine dark with @custom-variant as “under a .dark class” and toggle that class on html'], ['선택은 localStorage에 저장하고, 페이지가 그려지기 전에 head의 작은 스크립트로 적용해 깜빡임을 막아요', 'store the choice in localStorage and apply it with a small script in head before paint to prevent a flash']],
    fin: [['다크 모드 변형: dark: 접두사로 어두운 테마 스타일을 같은 요소에 적어요 · 기준은 미디어 쿼리 또는 클래스', 'the dark: variant writes dark-theme styles on the same element, keyed on a media query or a class', 'twx-xs twx-a'], ['색이 많으면 CSS 변수 토큰(--background 등)을 바꾸는 방식이 더 깔끔해요', 'with many colors, swapping CSS variable tokens such as --background is cleaner'], ['data-theme 속성 기준으로도 @custom-variant를 만들 수 있어요', '@custom-variant can key on a data-theme attribute as well']],
    caps: [['dark:', 'dark:'], ['OS 설정 따르기', 'Following the OS'], ['클래스로 토글', 'Toggling by class'], ['선택 저장', 'Saving the choice'], ['다크 모드', 'Dark mode']]
  });
}

function sDataAria() {
  return CW('tw-data-aria', {
    code: ['<button aria-expanded="true"', '  class="aria-expanded:bg-sky-50">', '  <svg class="in-aria-expanded:rotate-180"/>', '<div data-state="open"', '  class="data-[state=open]:block">', '<label class="has-checked:ring-2', '  has-checked:ring-sky-500">', '<li class="not-last:border-b">'],
    hl: [[0, 3], [3, 2, 'ok'], [5, 2, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'ac', X, .8, 12.0, 1.4, 'var(--ui)', 1, { off: 3, css: 'border:.08em solid var(--line)', r: .3 }); S.set('ac', 1, { background: tint('accent', 12) });
      T(S, 'acl', X + .5, 1.15, ['배송 안내', 'Shipping'], 'twx-s', 1, { off: 3 }); T(S, 'chv', X + 10.6, .95, '⌄', 'twx-l', 1, { off: 3 }); S.set('chv', 1, { transform: 'rotate(180deg)' });
      lbl(S, 'n1', X, 4.6, ['aria-expanded 속성이 곧 스타일 조건', 'the aria-expanded attribute is the condition'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'pn', X, 2.3, 12.0, 1.6, tint('line', 14), 2, { off: 3, r: .3 }); T(S, 'pnl', X + .5, 2.7, ['3일 안에 도착해요', 'Arrives in 3 days'], 'twx-xs', 2, { off: 3 });
      lbl(S, 'n2', X, 4.6, ['data-[state=open]: 상태를 data 속성으로', 'state carried in a data attribute'], 'g', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => { sw(S, 'rc' + i, X + i * 4.1, 1.0, 3.8, 2.4, 'var(--ui)', 3, { off: 4, css: 'border:.08em solid var(--line)', r: .4 }); T(S, 'rd' + i, X + i * 4.1 + .4, 1.3, i === 1 ? '◉' : '○', 'twx-s', 3, { off: 4 }); T(S, 'rt' + i, X + i * 4.1 + .4, 2.2, ['플랜 ' + 'ABC'[i], 'Plan ' + 'ABC'[i]], 'twx-xs', 3, { off: 4 }); });
      S.set('rc1', 3, { 'box-shadow': '0 0 0 .15em var(--accent)' }); S.set('rc1', 0, { 'box-shadow': 'none' });
      lbl(S, 'n3', X, 4.6, ['has-checked: 안의 라디오가 선택되면', 'has-checked: when a radio inside is checked'], 'w', 3, { off: 4, w: 12 });
      [0, 1, 2].forEach(i => { T(S, 'li' + i, X + .3, 1.0 + i * 1.2, ['항목 ', 'Item '].map(s => s + (i + 1)), 'twx-s', 4); if (i < 2) hl(S, 'lb' + i, X, X + 12.0, 1.95 + i * 1.2, 'line', 4, { w: .06 }); });
      lbl(S, 'n4', X, 4.6, ['not-last: 마지막만 빼고 구분선', 'not-last: dividers except the last'], 'a', 4, { w: 12 });
    },
    notes: [['aria-expanded:는 aria-expanded="true"일 때 적용돼요 · in-aria-expanded:로 안쪽 아이콘도 회전시켜요', 'aria-expanded: applies when aria-expanded="true", and in-aria-expanded: rotates the icon inside'], ['data-[state=open]:처럼 data 속성 값을 조건으로 써요 · Radix 같은 라이브러리가 상태를 data 속성으로 알려줘요', 'data-[state=open]: uses a data attribute value as the condition, which libraries such as Radix expose'], ['has-checked:는 안에 선택된 input이 있을 때 · CSS :has()로 부모가 자식 상태에 반응해요', 'has-checked: applies when a checked input is inside, letting a parent react to a child through CSS :has()'], ['not-last:는 마지막 항목만 빼고 적용돼요 · not-*로 어떤 변형이든 뒤집을 수 있어요', 'not-last: applies to every item except the last, and not-* negates any variant']],
    fin: [['속성 변형: aria-*, data-*, has-*, not-*, in-*으로 HTML 속성과 구조를 스타일 조건으로 써요', 'attribute variants, aria-*, data-*, has-*, not-* and in-*, turn HTML attributes and structure into style conditions', 'twx-xs twx-a'], ['접근성 속성을 그대로 스타일에 쓰면 상태와 모양이 어긋나지 않아요', 'styling from accessibility attributes keeps state and look in sync'], ['data-active: 같은 값 없는 속성은 존재 여부로 판단해요', 'valueless attributes such as data-active: match on presence']],
    caps: [['aria 속성', 'aria attributes'], ['data 속성', 'data attributes'], ['has-*', 'has-*'], ['not-*', 'not-*'], ['속성과 구조 변형', 'Attribute and structure variants']]
  });
}

function sPseudoEl() {
  return CW('tw-pseudo-el', {
    code: ['<label class="after:content-[\'*\']', '  after:ml-0.5 after:text-red-500">', ['  이메일</label>', '  Email</label>'], '<input class="placeholder:text-slate-400">', '<input type="file" class="file:rounded-full', '  file:bg-sky-50 file:px-4">', '<ul class="list-disc marker:text-sky-500">', '<p class="selection:bg-amber-200">'],
    hl: [[0, 3], [3, 1, 'ok'], [4, 2, 'warn'], [6, 2]],
    draw: (S) => {
      const X = 19.4;
      T(S, 'lb', X, 1.0, ['이메일', 'Email'], 'twx-s', 1, { off: 2 }); T(S, 'as', X + 2.6, .95, '*', 'twx-l twx-r', 1, { off: 2 });
      lbl(S, 'n1', X, 2.6, ['after: 가상 요소를 HTML 없이', 'after: adds a pseudo-element, no HTML'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'in', X, .9, 12.0, 1.4, 'var(--ui)', 2, { off: 3, css: 'border:.08em solid var(--line)', r: .3 }); T(S, 'ph', X + .5, 1.2, 'you@example.com', 'cz-mono twx-xs', 2, { off: 3, css: 'opacity:.6' });
      lbl(S, 'n2', X, 2.6, ['placeholder: 안내 문구만 연하게', 'placeholder: dims just the hint'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'fb', X, 1.0, 4.4, ['파일 선택', 'Choose file'], 'accent', 3, { off: 4, h: 1.1 }); S.set('fb', 3, { 'border-radius': '1em' }); S.set('fb', 0, { 'border-radius': '.2em' }); T(S, 'fn', X + 4.8, 1.2, 'photo.png', 'cz-mono twx-xs', 3, { off: 4 });
      lbl(S, 'n3', X, 2.6, ['file: 브라우저 기본 버튼 꾸미기', 'file: styles the native button'], 'w', 3, { off: 4, w: 12 });
      [0, 1].forEach(i => { T(S, 'mk' + i, X + .2, .9 + i * 1.0, '•', 'twx-l twx-a', 4); T(S, 'mt' + i, X + 1.0, 1.0 + i * 1.0, [['장보기', '빨래'][i], ['Groceries', 'Laundry'][i]], 'twx-s', 4); });
      sw(S, 'sel', X + 6.0, .95, 4.0, 1.0, '#fde68a', 4); T(S, 'selt', X + 6.2, 1.05, ['선택한 글', 'selected'], 'twx-s', 4, { css: 'color:#000' });
      lbl(S, 'n4', X, 3.2, ['marker: 글머리표, selection: 드래그 영역', 'marker: bullets; selection: highlighted text'], 'a', 4, { w: 12 });
    },
    notes: [['after:content-[\'*\']는 ::after 가상 요소로 별표를 붙여요 · HTML을 건드리지 않고 장식을 더해요', 'after:content-[\'*\'] adds an asterisk through ::after, decorating without touching the HTML'], ['placeholder:는 입력창의 안내 문구만 연하게 꾸며요', 'placeholder: dims only the input’s hint text'], ['file:은 파일 입력의 브라우저 기본 버튼을 둥글고 색 있게 바꿔요', 'file: restyles the browser’s native file button, here rounded and colored'], ['marker:는 목록 글머리표, selection:은 드래그로 선택한 글자의 색이에요', 'marker: colors list bullets, and selection: the highlighted text']],
    fin: [['가상 요소 변형: before·after·placeholder·file·marker·selection·first-line처럼 ::가상 요소를 접두사로 꾸며요', 'pseudo-element variants such as before, after, placeholder, file, marker, selection and first-line style ::pseudo-elements by prefix', 'twx-xs twx-a'], ['before:/after:는 content-*가 있어야 나타나요(v4는 기본 content 자동 설정)', 'before:/after: need content; v4 sets an empty content automatically'], ['*: 변형은 직접 자식 전체에 스타일을 줘요', 'the *: variant styles all direct children']],
    caps: [['after:', 'after:'], ['placeholder:', 'placeholder:'], ['file:', 'file:'], ['marker와 selection', 'marker and selection'], ['가상 요소 변형', 'Pseudo-element variants']]
  });
}

function sMotionTw() {
  return CW('tw-motion', {
    code: ['<div class="transition duration-200', '  ease-out hover:-translate-y-1', '  hover:shadow-lg">', '<svg class="animate-spin size-5">', '<span class="animate-ping">', '<div class="motion-reduce:transition-none', '  motion-reduce:hover:translate-y-0">', '<dialog class="starting:opacity-0">'],
    hl: [[0, 3], [3, 2, 'ok'], [5, 2, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      sw(S, 'cd', X + 2.0, 1.4, 8.0, 3.4, 'var(--ui)', 1, { off: 2, css: 'border:.08em solid var(--line)', r: .6 }); S.set('cd', 1, { transform: 'translate(0,-.25em)', 'box-shadow': '0 .5em 1em rgba(0,0,0,.18)' }); S.set('cd', 0, { transform: 'translate(0,0)', 'box-shadow': 'none' });
      T(S, 'cur', X + 7.6, 3.4, '👆', 'twx-l', 1, { off: 2 }); lbl(S, 'n1', X, 5.6, ['transition: 바뀌는 값을 200ms 동안 부드럽게', 'transition eases changes over 200ms'], 'a', 1, { off: 2, w: 12 });
      ring(S, 'sp', X + 3.0, 2.6, 1.0, 'accent', 2, { off: 3, w: .2 }); S.set('sp', 2, { 'border-top-color': 'transparent' }); S.set('sp', 0, { 'border-top-color': 'transparent' });
      ring(S, 'pg', X + 8.0, 2.6, .5, 'ok', 2, { off: 3, fill: 1 }); ring(S, 'pg2', X + 8.0, 2.6, 1.1, 'ok', 2, { off: 3, w: .08 });
      lbl(S, 'n2', X, 5.6, ['spin·ping·pulse·bounce 기본 애니메이션', 'built-in spin, ping, pulse and bounce'], 'g', 2, { off: 3, w: 12 });
      T(S, 'ac', X + .4, 1.4, '♿', 'twx-l', 3, { off: 4 }); lbl(S, 'n3', X + 2.0, 1.5, ['동작 줄이기 설정을 켠 사용자', 'users with reduce-motion on'], '', 3, { off: 4, w: 10 });
      lbl(S, 'n3b', X, 5.6, ['motion-reduce: 움직임을 끄거나 줄여요', 'motion-reduce: turns motion off'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'dg', X + 2.0, 1.4, 8.0, 3.4, tint('accent', 20), 4, { r: .6 }); S.set('dg', 0, { transform: 'scale(.85)' }); S.set('dg', 4, { transform: 'scale(1)' }); cl(S, 'dgl', X + 2.0, 2.7, 8.0, 'dialog', 'm', 4);
      lbl(S, 'n4', X, 5.6, ['starting: 처음 나타날 때의 시작값', 'starting: the values on first appearance'], 'a', 4, { w: 12 });
    },
    notes: [['transition duration-200 ease-out을 주면 hover로 바뀌는 위치와 그림자가 0.2초 동안 부드럽게 변해요', 'transition duration-200 ease-out smooths the hover change in position and shadow over 0.2 s'], ['animate-spin(로딩), animate-ping(알림 점), animate-pulse(스켈레톤), animate-bounce가 기본으로 있어요', 'animate-spin (loading), animate-ping (notification dots), animate-pulse (skeletons) and animate-bounce are built in'], ['motion-reduce:는 운영체제에서 “동작 줄이기”를 켠 사용자에게만 적용돼요 · 멀미를 막는 접근성 배려예요', 'motion-reduce: applies only to users who enabled “reduce motion”, an accessibility courtesy against motion sickness'], ['starting:은 CSS @starting-style로, dialog나 팝오버가 처음 나타날 때의 시작값을 정해 등장 애니메이션을 만들어요', 'starting: maps to CSS @starting-style, setting initial values so dialogs and popovers animate in']],
    fin: [['전환과 애니메이션 유틸리티: transition·duration·ease·delay와 animate-*, 그리고 motion-safe/motion-reduce 변형', 'transition and animation utilities, transition, duration, ease, delay and animate-*, plus the motion-safe and motion-reduce variants', 'twx-xs twx-a'], ['transform·opacity만 움직이면 레이아웃 계산 없이 매끄러워요', 'animating only transform and opacity avoids layout work'], ['직접 만든 @keyframes는 @theme의 --animate-*로 등록해요', 'register custom @keyframes with --animate-* in @theme']],
    caps: [['부드러운 전환', 'Smooth transitions'], ['기본 애니메이션', 'Built-in animations'], ['동작 줄이기', 'Reduced motion'], ['등장 애니메이션', 'Entry animations'], ['전환과 애니메이션', 'Transitions and animation']]
  });
}
/* ===== Tailwind CSS · 4. v4 configuration ===== */
function sSetup() {
  return CW('tw-setup', {
    code: ['npm i tailwindcss @tailwindcss/vite', ['// vite.config.ts', '// vite.config.ts'], 'import tailwindcss from "@tailwindcss/vite";', 'export default { plugins: [tailwindcss()] };', ['/* app.css — 이 한 줄이 전부 */', '/* app.css: this one line is it */'], '@import "tailwindcss";', ['/* PostCSS·CLI·webpack용 패키지도 있어요 */', '/* packages for PostCSS, CLI, webpack too */']],
    hl: [[0, 1], [1, 3, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pk', X, .9, 12.0, 'npm i tailwindcss', 'line', 1, { h: 1.1 });
      nd(S, 'vt', X, 2.5, 5.6, 'Vite', 'accent', 2, { h: 1.1 }); nd(S, 'pl', X + 6.4, 2.5, 5.6, 'plugin', 'accent', 2, { h: 1.1 }); arw(S, 'a1', [X + 5.65, 3.05], [X + 6.35, 3.05], 2);
      nd(S, 'cs', X, 4.1, 12.0, '@import "tailwindcss";', 'warn', 3, { h: 1.1 });
      arw(S, 'a2', [X + 6.0, 5.3], [X + 6.0, 6.0], 4); nd(S, 'ox', X, 6.1, 12.0, ['Oxide 엔진(Rust): 스캔 + 생성', 'Oxide engine (Rust): scan and generate'], 'ok', 4, { h: 1.1 });
      arw(S, 'a3', [X + 6.0, 7.3], [X + 6.0, 8.0], 4); ['theme', 'base', 'components', 'utilities'].forEach((t, i) => nd(S, 'ly' + i, X + (i % 2) * 6.1, 8.1 + Math.floor(i / 2) * 1.2, 5.9, t, 'line', 4, { h: 1.0 }));
      lbl(S, 'n2', X, 6.1, ['설정 파일 없이 시작 · 콘텐츠 경로도 자동', 'no config file, content paths found automatically'], 'g', 3, { w: 12, off: 4 });
    },
    notes: [['tailwindcss와 빌드 도구용 플러그인을 설치해요 · Vite는 @tailwindcss/vite가 가장 빨라요', 'install tailwindcss and a plugin for your build tool; @tailwindcss/vite is fastest with Vite'], ['vite.config에 플러그인을 추가해요 · Next.js처럼 PostCSS를 쓰면 @tailwindcss/postcss를 써요', 'add the plugin to vite.config, or use @tailwindcss/postcss with PostCSS-based setups such as Next.js'], ['CSS 파일에 @import "tailwindcss" 한 줄이면 끝이에요 · v3의 tailwind.config.js와 content 설정이 필요 없어요', 'one line, @import "tailwindcss", in a CSS file is all it takes, with no v3-style tailwind.config.js or content list'], ['Rust로 만든 Oxide 엔진이 소스를 훑어 theme·base·components·utilities 네 개의 캐스케이드 레이어로 CSS를 만들어요', 'the Rust-based Oxide engine scans sources and emits CSS in four cascade layers: theme, base, components and utilities']],
    fin: [['v4 설치: 패키지 + 빌드 플러그인 + CSS 한 줄 · 설정은 CSS 안에서(CSS-first)', 'a v4 setup is a package, a build plugin and one CSS line, with configuration living in CSS (CSS-first)', 'twx-xs twx-a'], ['전체 빌드는 v3보다 수 배, 증분 빌드는 훨씬 더 빨라졌어요', 'full builds are several times faster than v3, and incremental builds far faster'], ['v4.2부터 webpack 전용 플러그인(@tailwindcss/webpack)도 있어요', 'since v4.2 there is a dedicated webpack plugin, @tailwindcss/webpack']],
    caps: [['설치', 'Installing'], ['빌드 플러그인', 'The build plugin'], ['CSS 한 줄', 'One CSS line'], ['엔진과 레이어', 'Engine and layers'], ['v4 시작하기', 'Getting started with v4']]
  });
}

function sThemeTw() {
  return CW('tw-theme', {
    code: ['@import "tailwindcss";', '@theme {', '  --color-brand-500: oklch(0.62 0.19 255);', '  --font-display: "Pretendard", sans-serif;', '  --breakpoint-3xl: 120rem;', '  --radius-card: 1.25rem;', '}', '.chart { stroke: var(--color-brand-500); }'],
    hl: [[1, 2], [3, 1, 'ok'], [4, 2, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'tk', X, .8, 12.0, '--color-brand-500', 'accent', 1, { h: 1.1, off: 2 });
      arw(S, 'a1', [X + 6.0, 2.0], [X + 6.0, 2.7], 1, { off: 2 }); ['bg-brand-500', 'text-brand-500', 'border-brand-500'].forEach((t, i) => lbl(S, 'u' + i, X + 1.0, 2.9 + i * 1.0, t, 'm a', 1, { off: 2 }));
      lbl(S, 'n1', X, 6.2, ['토큰 하나 → 관련 유틸리티가 모두 생겨요', 'one token creates every related utility'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'fd', X, .8, 12.0, '--font-display', 'ok', 2, { off: 3, h: 1.1 }); arw(S, 'a2', [X + 6.0, 2.0], [X + 6.0, 2.7], 2, { off: 3 }); lbl(S, 'u3', X + 1.0, 2.9, 'font-display', 'm g', 2, { off: 3 });
      lbl(S, 'n2', X, 4.2, ['접두사(네임스페이스)가 유틸리티 종류를 정해요', 'the namespace decides the utility type'], 'g', 2, { off: 3, w: 12 });
      [['--color-*', 'bg- text-'], ['--font-*', 'font-'], ['--breakpoint-*', 'sm: md:'], ['--radius-*', 'rounded-'], ['--shadow-*', 'shadow-']].forEach(([a, b], i) => { lbl(S, 'ns' + i, X, .6 + i * .9, a, 'm w', 3, { off: 4 }); lbl(S, 'nb' + i, X + 5.4, .6 + i * .9, b, 'm', 3, { off: 4 }); });
      lbl(S, 'n3', X, 5.4, ['3xl: 변형과 rounded-card가 새로 생겨요', 'new 3xl: variant and rounded-card utility'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'rt', X, .8, 12.0, ':root { --color-brand-500: … }', 'accent', 4, { h: 1.1 }); lbl(S, 'n4', X, 2.4, ['모든 토큰이 CSS 변수로도 나와요', 'every token is also emitted as a CSS variable'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 3.5, ['차트·인라인 style·JS에서 그대로 사용', 'use it in charts, inline styles and JS'], '', 4, { w: 12 });
    },
    notes: [['@theme 안의 --color-brand-500 같은 변수가 디자인 토큰이에요 · bg-, text-, border-brand-500 유틸리티가 자동으로 생겨요', 'variables inside @theme, such as --color-brand-500, are design tokens that automatically create bg-, text- and border-brand-500'], ['--font-display는 font-display 유틸리티가 돼요 · 변수 이름의 접두사(네임스페이스)가 어떤 유틸리티인지 정해요', '--font-display becomes the font-display utility, because the variable’s prefix (namespace) decides the utility type'], ['--breakpoint-3xl은 3xl: 반응형 변형을, --radius-card는 rounded-card를 만들어요', '--breakpoint-3xl adds a 3xl: responsive variant, and --radius-card a rounded-card utility'], ['모든 토큰은 :root의 CSS 변수로도 출력돼서 차트 라이브러리나 인라인 style에서 var()로 쓸 수 있어요', 'every token is also emitted as a CSS variable on :root, usable with var() in chart libraries or inline styles']],
    fin: [['@theme: CSS 변수로 디자인 토큰을 정의하면 유틸리티와 변수가 함께 생기는 v4의 설정 방식', '@theme defines design tokens as CSS variables, generating both utilities and variables: v4’s way of configuring', 'twx-xs twx-a'], ['--color-*: initial로 기본 팔레트를 지우고 내 색만 남길 수 있어요', '--color-*: initial clears the default palette, leaving only your colors'], ['다른 변수를 참조할 땐 @theme inline을 써요', 'use @theme inline when tokens reference other variables']],
    caps: [['색 토큰', 'Color tokens'], ['네임스페이스', 'Namespaces'], ['새 변형과 유틸리티', 'New variants and utilities'], ['CSS 변수로도', 'Also CSS variables'], ['@theme 토큰', '@theme tokens']]
  });
}

function sLayersTw() {
  return CW('tw-layers', {
    code: ['@layer theme, base, components, utilities;', '@layer base {', '  h1 { @apply text-2xl font-bold; }', '}', '@layer components {', '  .card { @apply rounded-xl p-6 shadow; }', '}', ['<div class="card p-2">  /* p-2가 이김 */', '<div class="card p-2">  /* p-2 wins */']],
    hl: [[0, 1], [1, 3, 'ok'], [4, 3, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4, L = [['theme', 'line'], ['base', 'ok'], ['components', 'warn'], ['utilities', 'accent']];
      L.forEach(([t, c], i) => nd(S, 'L' + i, X + i * .4, 6.2 - i * 1.6, 12.0 - i * .8, t, c, 1, { h: 1.3 }));
      ar(S, 'up', [X + 11.6, 6.8], [X + 11.6, 1.4], 'ink-3', 1, { h: .1 }); lbl(S, 'upl', X + 8.0, 7.8, ['아래로 갈수록 약해요', 'lower layers lose'], 'm', 1);
      lbl(S, 'n1', X, 8.9, ['레이어 순서가 명시도보다 먼저', 'layer order beats specificity'], 'a', 1, { off: 2 });
      tsets(S, 'L1', [[2, 'ok', 50], [3, 'ok', 14]]); lbl(S, 'n2', X, 8.9, ['base: 태그 기본 스타일', 'base: element defaults'], 'g', 2, { off: 3 });
      tsets(S, 'L2', [[3, 'warn', 50], [4, 'warn', 14]]); lbl(S, 'n3', X, 8.9, ['components: 재사용 클래스', 'components: reusable classes'], 'w', 3, { off: 4 });
      tsets(S, 'L3', [[4, 'accent', 50]]); lbl(S, 'n4', X, 8.9, ['utilities가 항상 마지막 → 덮어쓰기 쉬움', 'utilities come last, so they override'], 'a', 4, { w: 12 });
    },
    notes: [['v4는 브라우저의 진짜 캐스케이드 레이어(@layer)를 써요 · 나중에 선언된 레이어가 명시도와 상관없이 이겨요', 'v4 uses real browser cascade layers (@layer), where a later layer wins regardless of specificity'], ['base 레이어에는 h1, a 같은 태그의 기본 스타일을 둬요', 'the base layer holds element defaults such as h1 and a'], ['components 레이어에는 .card 같은 재사용 클래스를 둬요 · 유틸리티보다 약하게 들어가요', 'the components layer holds reusable classes such as .card, which stay weaker than utilities'], ['utilities가 마지막이라 class="card p-2"에서 p-2가 .card의 p-6을 이겨요 · 덮어쓰기가 예측 가능해요', 'utilities come last, so in class="card p-2" the p-2 beats .card’s p-6, making overrides predictable']],
    fin: [['캐스케이드 레이어: theme → base → components → utilities 순서로 우선순위를 고정해 충돌을 예측 가능하게 해요', 'cascade layers fix the priority order theme, base, components, utilities, so conflicts are predictable', 'twx-xs twx-a'], ['레이어 밖의 일반 CSS는 모든 레이어를 이겨요 · 주의해요', 'unlayered CSS beats every layer, so be careful'], ['직접 만든 유틸리티는 @layer utilities 대신 @utility로 등록해요', 'register custom utilities with @utility rather than @layer utilities']],
    caps: [['레이어 순서', 'Layer order'], ['base', 'base'], ['components', 'components'], ['utilities가 마지막', 'Utilities last'], ['캐스케이드 레이어', 'Cascade layers']]
  });
}

function sCustomTw() {
  return CW('tw-custom', {
    code: ['@utility content-auto {', '  content-visibility: auto;', '}', '@utility tab-* {', '  tab-size: --value(integer);', '}', '@custom-variant pointer-coarse', '  (@media (pointer: coarse));', '.btn { @variant dark { color: white; } }'],
    hl: [[0, 3], [3, 3, 'ok'], [6, 2, 'warn'], [8, 1]],
    side: [
      [[['나만의 유틸리티 등록', 'register your own utility'], 'a'], ['class="content-auto"', 'm'], [['변형과도 같이 써요', 'works with variants'], ''], ['lg:content-auto', 'm']],
      [[['* 자리에 값을 받는 유틸리티', 'a utility that takes a value at *'], 'g'], ['tab-2 → tab-size: 2', 'm'], ['tab-8 → tab-size: 8', 'm']],
      [[['나만의 변형 만들기', 'define your own variant'], 'w'], ['pointer-coarse:p-4', 'm'], [['터치 기기에서 넓은 터치 영역', 'bigger touch targets on touch devices'], '']],
      [[['CSS 안에서 변형 쓰기', 'use a variant inside CSS'], 'a'], [['@variant dark { … }', '@variant dark { … }'], 'm']]
    ],
    notes: [['@utility로 Tailwind에 없는 유틸리티를 등록하면 hover:, lg: 같은 변형과 함께 쓸 수 있고, 쓰일 때만 생성돼요', '@utility registers a missing utility that works with variants such as hover: and lg: and is generated only when used'], ['이름 끝이 -*인 함수형 유틸리티는 --value()로 값을 받아요 · tab-2, tab-8처럼 숫자를 바꿔 써요', 'functional utilities ending in -* take a value through --value(), so tab-2 and tab-8 both work'], ['@custom-variant로 미디어 쿼리나 선택자를 새 변형으로 만들어요 · pointer-coarse:처럼 써요', '@custom-variant turns a media query or selector into a new variant, used as pointer-coarse:'], ['@variant는 일반 CSS 안에서 dark 같은 변형을 적용해요', '@variant applies a variant such as dark inside ordinary CSS']],
    fin: [['CSS 지시어로 확장: @utility(유틸리티), @custom-variant(변형), @variant(CSS 안 변형) · JS 플러그인 없이 확장해요', 'CSS directives extend Tailwind without JS plugins: @utility for utilities, @custom-variant for variants and @variant inside CSS', 'twx-xs twx-a'], ['v4.3부터 @variant hover:focus처럼 겹쳐 쓸 수 있어요', 'since v4.3, @variant can stack, as in @variant hover:focus'], ['--value()에 --default()로 기본값도 줄 수 있어요(v4.3)', '--value() accepts a --default() fallback (v4.3)']],
    caps: [['@utility', '@utility'], ['함수형 유틸리티', 'Functional utilities'], ['@custom-variant', '@custom-variant'], ['@variant', '@variant'], ['CSS로 확장하기', 'Extending in CSS']]
  });
}

function sApplyTw() {
  return CW('tw-apply', {
    code: ['.btn {', '  @apply rounded-lg px-4 py-2 font-semibold;', '}', '.post a { @apply text-sky-600 underline; }', ['/* Vue·Svelte의 style 블록에서는 */', '/* in Vue or Svelte style blocks */'], '@reference "../app.css";', ['/* 대부분은 컴포넌트 추출이 더 나아요 */', '/* usually, extract a component instead */']],
    hl: [[0, 3], [3, 1, 'ok'], [4, 2, 'warn'], [6, 1, 'danger']],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ap', X, .9, 12.0, '@apply px-4 py-2 …', 'accent', 1, { h: 1.1 }); arw(S, 'a1', [X + 6.0, 2.1], [X + 6.0, 2.8], 1); nd(S, 'cs', X, 2.9, 12.0, 'padding: .5rem 1rem; …', 'line', 1, { h: 1.1 });
      lbl(S, 'n1', X, 4.6, ['유틸리티를 일반 CSS 규칙 안에 펼쳐요', 'expands utilities into a normal CSS rule'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 4.6, ['내가 못 바꾸는 HTML(마크다운, 외부 위젯)에 유용', 'useful for HTML you cannot edit'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 4.6, ['@reference: CSS를 중복 출력하지 않고 토큰만 참조', '@reference reads tokens without duplicating CSS'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.6, ['남발하면 이름 짓기와 CSS 파일이 되돌아와요', 'overuse brings back naming and CSS files'], 'r', 4, { w: 12 }); lbl(S, 'n5', X, 5.7, ['반복은 React·Vue 컴포넌트로 묶기', 'wrap repetition in a component instead'], 'g', 4, { w: 12 });
    },
    notes: [['@apply는 유틸리티 클래스들을 일반 CSS 규칙 안에 펼쳐 넣어요 · 결과는 평범한 CSS 선언이에요', '@apply expands utility classes into an ordinary CSS rule, producing plain declarations'], ['마크다운 결과물이나 외부 위젯처럼 클래스를 직접 달 수 없는 HTML을 꾸밀 때 유용해요', 'it helps style HTML you cannot add classes to, such as rendered markdown or third-party widgets'], ['Vue·Svelte 컴포넌트의 style 블록에서는 @reference로 메인 CSS의 토큰만 불러와 중복 출력을 막아요', 'in Vue or Svelte style blocks, @reference imports the main CSS’s tokens without duplicating output'], ['모든 걸 @apply로 묶으면 이름 짓기와 CSS 파일 오가기가 되살아나요 · 반복은 컴포넌트로 추출하는 게 Tailwind다운 방식이에요', 'wrapping everything in @apply brings back naming and file switching, so extracting components is the Tailwind way to handle repetition']],
    fin: [['@apply: 유틸리티를 CSS 규칙에 인라인하는 지시어 · 손댈 수 없는 HTML에 한정해 쓰는 탈출구', '@apply inlines utilities into CSS rules, an escape hatch best kept for HTML you cannot touch', 'twx-xs twx-a'], ['@apply 안에서도 hover: 같은 변형을 쓸 수 있어요', 'variants such as hover: work inside @apply'], ['컴포넌트 안에서는 그냥 클래스를 쓰는 게 가장 단순해요', 'inside components, plain classes are simplest']],
    caps: [['@apply', '@apply'], ['쓰기 좋은 곳', 'Where it fits'], ['@reference', '@reference'], ['남발 주의', 'Do not overuse'], ['@apply', '@apply']]
  });
}

function sPreflight() {
  return CW('tw-preflight', {
    code: [['/* Preflight: 기본 스타일 초기화 */', '/* Preflight: resetting defaults */'], '*, ::before, ::after { margin: 0; padding: 0;', '  box-sizing: border-box; border: 0 solid; }', 'h1, h2, h3 { font-size: inherit;', '  font-weight: inherit; }', 'ol, ul { list-style: none; }', 'img { display: block; max-width: 100%; }'],
    hl: [[1, 2], [3, 2, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      frame(S, 'pg', X, .8, 12.0, 8.0, 'ink-3', 0, { w: .08 });
      T(S, 'h', X + .6, 1.2, ['큰 제목', 'Big heading'], 'twx-l twx-ic', 0); S.set('h', 0, { transform: 'scale(1.3)', 'transform-origin': 'left top' }); S.set('h', 2, { transform: 'scale(.8)' });
      T(S, 'p', X + .6, 2.8, ['본문 문단', 'A paragraph'], 'twx-s', 0); S.set('p', 0, { transform: 'translate(0,.6em)' }); S.set('p', 1, { transform: 'translate(0,0)' });
      [0, 1].forEach(i => { T(S, 'b' + i, X + .6, 4.0 + i * .9, '•', 'twx-s', 0, { off: 3 }); T(S, 'li' + i, X + 1.4, 4.0 + i * .9, [['항목 ', 'Item '][0] + (i + 1), 'Item ' + (i + 1)], 'twx-xs', 0); S.set('li' + i, 0, { transform: 'translate(0,0)' }); S.set('li' + i, 3, { transform: 'translate(-.8em,0)' }); });
      sw(S, 'im', X + .6, 6.2, 5.0, 2.2, tint('accent', 40), 0); S.set('im', 0, { width: '5em' }); S.set('im', 4, { width: '10.8em' });
      lbl(S, 'n1', X, 9.4, ['여백 0 · border-box', 'zero margins, border-box'], 'a', 1, { off: 2 }); lbl(S, 'n2', X, 9.4, ['제목도 본문과 같은 크기', 'headings look like body text'], 'g', 2, { off: 3 });
      lbl(S, 'n3', X, 9.4, ['목록 글머리표 제거', 'list bullets removed'], 'w', 3, { off: 4 }); lbl(S, 'n4', X, 9.4, ['이미지는 block · 폭 100% 넘지 않게', 'images are block, max 100% wide'], 'a', 4, { w: 12 });
    },
    notes: [['Preflight는 브라우저마다 다른 기본 스타일을 지우는 초기화 CSS예요 · 모든 여백이 0, 크기는 border-box가 돼요', 'Preflight is the reset that removes browsers’ inconsistent defaults: margins become 0 and sizing becomes border-box'], ['h1~h6도 본문과 같은 크기와 굵기가 돼요 · 제목 모양은 text-2xl font-bold처럼 직접 정해요', 'h1 to h6 inherit body size and weight, so headings are styled explicitly, as with text-2xl font-bold'], ['ul·ol의 글머리표도 사라져요 · 필요하면 list-disc를 달아요(스크린 리더용 role="list"도 고려)', 'ul and ol lose their bullets; add list-disc when needed, and consider role="list" for screen readers'], ['이미지와 영상은 block이 되고 부모 폭을 넘지 않아요 · 테두리는 border 클래스만 달면 실선으로 나와요', 'images and video become block and never exceed their parent, and a bare border class draws a solid line']],
    fin: [['Preflight: Tailwind의 base 레이어에 들어 있는 초기화 CSS · 모든 모양을 유틸리티로 명시하게 만들어요', 'Preflight is the reset in Tailwind’s base layer, making every visual choice explicit through utilities', 'twx-xs twx-a'], ['v4는 border·ring 기본색이 currentColor예요', 'in v4, border and ring default to currentColor'], ['기존 CSS와 섞을 땐 Preflight 없이 필요한 레이어만 import할 수 있어요', 'when mixing with legacy CSS, import only the layers you need, without Preflight']],
    caps: [['여백 초기화', 'Resetting spacing'], ['제목 초기화', 'Resetting headings'], ['목록 초기화', 'Resetting lists'], ['이미지와 테두리', 'Images and borders'], ['Preflight', 'Preflight']]
  });
}

function sPluginsTw() {
  return CW('tw-plugins', {
    code: ['@import "tailwindcss";', '@plugin "@tailwindcss/typography";', '@plugin "@tailwindcss/forms";', '@source "../node_modules/@acme/ui";', '@source not "./legacy";', '@source inline("bg-red-500 bg-green-500");', '@config "./tailwind.config.js";  /* v3 */'],
    hl: [[1, 1], [2, 1, 'ok'], [3, 3, 'warn'], [6, 1]],
    side: [
      [['@plugin typography', 'm a'], [['prose 클래스: 글 전체 스타일', 'the prose class styles whole articles'], ''], ['<article class="prose">', 'm']],
      [['@plugin forms', 'm g'], [['입력창·체크박스를 초기화해', 'resets inputs and checkboxes'], ''], [['유틸리티로 꾸미기 쉽게', 'so utilities can style them'], '']],
      [['@source', 'm w'], [['자동 감지 밖 경로 추가', 'adds paths beyond auto-detection'], ''], ['@source not', 'm w'], [['빼고 싶은 경로', 'excludes paths'], ''], ['@source inline()', 'm w'], [['항상 만들 클래스(safelist)', 'classes to always generate'], '']],
      [['@config', 'm a'], [['v3의 JS 설정 파일 불러오기', 'loads a v3 JS config'], ''], [['점진적 마이그레이션용', 'for gradual migration'], '']]
    ],
    notes: [['@plugin으로 공식 플러그인을 불러와요 · typography는 마크다운 글 전체를 꾸미는 prose 클래스를 줘요', '@plugin loads official plugins; typography adds the prose class that styles whole markdown articles'], ['forms 플러그인은 입력창과 체크박스의 브라우저 기본 모양을 초기화해서 유틸리티로 꾸미기 쉽게 해요', 'the forms plugin resets native input and checkbox styles so utilities can style them'], ['@source로 자동 감지 밖의 경로를 추가하고, @source not으로 빼고, @source inline()으로 항상 만들 클래스를 지정해요', '@source adds paths beyond auto-detection, @source not excludes them, and @source inline() lists classes to always generate'], ['@config로 v3의 tailwind.config.js를 불러올 수 있어 한 번에 다 옮기지 않아도 돼요', '@config loads a v3 tailwind.config.js, so migration need not happen all at once']],
    fin: [['CSS 지시어로 구성: @plugin, @source, @config · 설정이 모두 CSS 파일 한 곳에 모여요', 'configuration through CSS directives, @plugin, @source and @config, keeps everything in one CSS file', 'twx-xs twx-a'], ['플러그인은 꼭 필요한 것만 · 대부분은 @utility로 충분해요', 'add plugins sparingly; @utility covers most needs'], ['데이터에서 오는 클래스는 @source inline으로 안전하게', 'data-driven classes are safe with @source inline']],
    caps: [['typography', 'typography'], ['forms', 'forms'], ['@source', '@source'], ['@config', '@config'], ['플러그인과 소스', 'Plugins and sources']]
  });
}

function sV4() {
  return CW('tw-v4', {
    code: ['npx @tailwindcss/upgrade', ['/* v3 → v4 이름 변경 */', '/* v3 to v4 renames */'], 'shadow-sm → shadow-xs   rounded → rounded-sm', 'outline-none → outline-hidden', 'bg-opacity-50 → bg-black/50', '!font-bold → font-bold!', 'bg-[--brand] → bg-(--brand)'],
    hl: [[0, 1], [2, 2, 'ok'], [4, 2, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4, rows = [['', 'v3', 'v4'], [['설정', 'Config'], ['JS 파일', 'JS file'], '@theme (CSS)'], [['엔진', 'Engine'], 'JS', 'Oxide (Rust)'], [['콘텐츠', 'Content'], ['content: [...]', 'content: [...]'], ['자동 감지', 'automatic']], [['색', 'Colors'], 'rgb', 'oklch'], [['레이어', 'Layers'], ['흉내', 'emulated'], '@layer']];
      rows.forEach((r, i) => r.forEach((t, j) => t && lbl(S, 'r' + i + j, X + [0, 2.8, 7.6][j], .8 + i * 1.0, t, i === 0 ? 'm a' : (j === 0 ? '' : 'm'), 1, { off: 2 })));
      lbl(S, 'n1', X, 7.2, ['자동 업그레이드 도구가 대부분 바꿔 줘요', 'the upgrade tool converts most of it'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, .8, ['크기 이름이 한 단계씩 밀렸어요', 'size names shifted by one step'], 'g', 2, { off: 3, w: 12 }); lbl(S, 'n2b', X, 1.9, ['ring 기본 3px → 1px', 'ring default 3px to 1px'], 'm', 2, { off: 3 }); lbl(S, 'n2c', X, 3.0, ['border 기본색 → currentColor', 'border default color: currentColor'], 'm', 2, { off: 3 });
      lbl(S, 'n3', X, .8, ['투명도는 /숫자로 통일', 'opacity unified as /n'], 'w', 3, { off: 4 }); lbl(S, 'n3b', X, 1.9, ['important(!)는 끝에', 'important (!) goes at the end'], 'm', 3, { off: 4 });
      lbl(S, 'n4', X, .8, ['CSS 변수는 괄호로', 'CSS variables use parentheses'], 'a', 4); lbl(S, 'n4b', X, 1.9, ['변형은 왼쪽부터 적용', 'variants apply left to right'], 'm', 4); lbl(S, 'n4c', X, 3.0, ['Safari 16.4+ 등 최신 브라우저 필요', 'needs modern browsers such as Safari 16.4+'], 'w', 4, { w: 12 });
    },
    notes: [['v4는 설정을 CSS로, 엔진을 Rust로 바꾼 큰 개편이에요 · npx @tailwindcss/upgrade가 대부분의 변경을 자동으로 해 줘요', 'v4 is a major rewrite that moves configuration into CSS and the engine to Rust, and npx @tailwindcss/upgrade automates most changes'], ['shadow-sm은 shadow-xs, rounded는 rounded-sm처럼 크기 이름이 한 단계씩 밀렸고, ring 기본 두께와 border 기본색도 바뀌었어요', 'size names shifted a step, such as shadow-sm to shadow-xs and rounded to rounded-sm, and the default ring width and border color changed'], ['bg-opacity-* 같은 투명도 유틸리티는 사라지고 /50 형식으로 통일됐어요 · important 표시 !는 클래스 끝으로 갔어요', 'opacity utilities such as bg-opacity-* are gone in favor of the /50 modifier, and the important mark ! moved to the end'], ['CSS 변수는 bg-(--brand)처럼 괄호로 쓰고, 변형은 왼쪽부터 적용돼요 · @property·color-mix 같은 최신 CSS를 써서 최신 브라우저가 필요해요', 'CSS variables use parentheses as in bg-(--brand), variants apply left to right, and modern CSS such as @property and color-mix requires modern browsers']],
    fin: [['Tailwind v4: CSS-first 설정, Rust 엔진, 자동 소스 감지, 네이티브 캐스케이드 레이어와 oklch 팔레트', 'Tailwind v4 brings CSS-first configuration, a Rust engine, automatic source detection, native cascade layers and an oklch palette', 'twx-xs twx-a'], ['오래된 브라우저를 지원해야 하면 v3.4에 머무는 선택도 있어요', 'projects that must support old browsers can stay on v3.4'], ['업그레이드 후 화면을 눈으로 비교하며 확인해요', 'after upgrading, compare screens visually']],
    caps: [['v3와 v4', 'v3 and v4'], ['이름 변경', 'Renames'], ['문법 변경', 'Syntax changes'], ['변수와 브라우저', 'Variables and browsers'], ['v4로 옮기기', 'Moving to v4']]
  });
}
/* ===== Tailwind CSS · 5. patterns ===== */
function sComponentsTw() {
  return CW('tw-components', {
    code: ['function Button({ children, ...props }) {', '  return <button className="rounded-lg', '    bg-sky-600 px-4 py-2 text-white"', '    {...props}>{children}</button>;', '}', '{items.map(i => <Card key={i.id} {...i} />)}', ['<Button>저장</Button> <Button>취소</Button>', '<Button>Save</Button> <Button>Cancel</Button>']],
    hl: [[1, 2, 'warn'], [0, 5, 'ok'], [5, 1], [6, 1, 'ok']],
    draw: (S) => {
      const X = 19.4;
      [0, 1, 2].forEach(i => { lbl(S, 'rp' + i, X, .8 + i * 1.0, 'rounded-lg bg-sky-600 px-4 …', 'm', 1, { off: 2 }); });
      lbl(S, 'n1', X, 4.2, ['같은 클래스 묶음이 여러 곳에 반복', 'the same class list repeated everywhere'], 'w', 1, { off: 2, w: 12 });
      nd(S, 'bt', X, .8, 12.0, '<Button>', 'ok', 2, { h: 1.3 }); [0, 1, 2].forEach(i => { arw(S, 'ba' + i, [X + 2.0 + i * 4.0, 2.2], [X + 2.0 + i * 4.0, 2.9], 2); nd(S, 'bu' + i, X + i * 4.0, 3.0, 3.8, ['화면 ', 'page '].map(s => s + 'ABC'[i]), 'line', 2, { h: 1.0 }); });
      lbl(S, 'n2', X, 4.6, ['한 곳만 고치면 모두 바뀌어요', 'change it once, it updates everywhere'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 4.6, ['반복문 안의 클래스는 한 번만 적은 셈', 'a class in a loop is written only once'], 'a', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.6, ['컴포넌트 이름이 곧 의미 있는 이름', 'the component name carries the meaning'], 'g', 4, { w: 12 }); lbl(S, 'n5', X, 5.7, ['@apply보다 먼저 고려해요', 'reach for this before @apply'], '', 4);
    },
    notes: [['같은 클래스 묶음을 여러 곳에 복사하면 디자인을 바꿀 때 모든 곳을 찾아 고쳐야 해요', 'copying the same class list everywhere means hunting down every copy when the design changes'], ['React·Vue 컴포넌트로 감싸면 클래스는 한 곳에만 있고 화면들은 컴포넌트를 써요', 'wrapping it in a React or Vue component keeps the classes in one place while pages use the component'], ['map 같은 반복문 안의 클래스는 실제로는 한 번만 적은 거라 추출이 필요 없어요', 'classes inside a loop such as map are written only once, so they need no extraction'], ['컴포넌트 이름(Button, Card)이 CSS 클래스 이름의 역할을 대신해요 · @apply보다 먼저 고려해요', 'component names such as Button and Card replace CSS class names, so consider this before @apply']],
    fin: [['반복 관리: 유틸리티 반복은 컴포넌트·템플릿 조각·반복문으로 해결하는 게 Tailwind의 기본 전략이에요', 'managing repetition with components, template partials and loops is Tailwind’s core strategy', 'twx-xs twx-a'], ['에디터의 다중 커서 편집도 작은 반복에는 충분해요', 'multi-cursor editing is enough for small repetition'], ['props로 variant를 받아 클래스 조합을 바꿔요(cva 참고)', 'take a variant prop to switch class combinations (see cva)']],
    caps: [['반복의 문제', 'The repetition problem'], ['컴포넌트로 추출', 'Extracting a component'], ['반복문은 괜찮아요', 'Loops are fine'], ['이름이 의미', 'Names carry meaning'], ['컴포넌트 추출', 'Extracting components']]
  });
}

function sCnTw() {
  return CW('tw-cn', {
    code: ['import { clsx } from "clsx";', 'import { twMerge } from "tailwind-merge";', 'const cn = (...v) => twMerge(clsx(v));', 'cn("px-4 py-2", isActive && "bg-sky-600",', '   { "opacity-50": disabled })', 'cn("px-4 py-2 bg-sky-600", className)', ['// className="px-2" → "py-2 bg-sky-600 px-2"', '// className="px-2" → "py-2 bg-sky-600 px-2"']],
    hl: [[0, 3], [3, 2, 'ok'], [5, 2, 'warn'], [2, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'cx', X, .8, 5.6, 'clsx', 'accent', 1, { h: 1.1 }); nd(S, 'tm', X + 6.4, .8, 5.6, 'tailwind-merge', 'ok', 1, { h: 1.1 }); arw(S, 'a0', [X + 5.65, 1.35], [X + 6.35, 1.35], 1);
      lbl(S, 'n1', X, 2.4, ['조건 조합 → 충돌 정리', 'combine conditions, then resolve conflicts'], 'a', 1, { off: 2, w: 12 });
      [['px-4 py-2', 'line'], ['bg-sky-600', 'accent'], ['opacity-50', 'line']].forEach(([t, c], i) => nd(S, 'c' + i, X + i * 4.1, 2.4, 3.8, t, c, 2, { off: 3, h: 1.1 })); S.set('c2', 2, { opacity: '.3' });
      lbl(S, 'n2', X, 4.0, ['true인 것만 남겨 문자열로', 'keeps truthy parts in one string'], 'g', 2, { off: 3, w: 12 });
      ['px-4', 'py-2', 'bg-sky-600', 'px-2'].forEach((t, i) => nd(S, 'm' + i, X + [0, 2.7, 5.4, 9.6][i], 2.4, [2.4, 2.4, 3.9, 2.4][i], t, i === 0 ? 'danger' : (i === 3 ? 'ok' : 'line'), 3, { h: 1.1 })); S.set('m0', 4, { opacity: '.25' });
      lbl(S, 'n3', X, 4.0, ['px-4와 px-2가 충돌 · 뒤의 것만 남김', 'px-4 and px-2 clash; the later one stays'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 4.0, ['밖에서 className으로 안전하게 덮어쓰기', 'callers can safely override with className'], 'g', 4, { w: 12 });
    },
    notes: [['clsx는 조건에 따라 클래스를 붙이고, tailwind-merge는 충돌하는 Tailwind 클래스를 정리해요 · 둘을 합친 cn() 함수가 흔한 패턴이에요', 'clsx joins classes conditionally and tailwind-merge resolves conflicting Tailwind classes; combining them as cn() is a common pattern'], ['isActive && "bg-sky-600"처럼 참일 때만, 객체 형태로 조건별 클래스를 넣을 수 있어요', 'add a class only when true, as in isActive && "bg-sky-600", or map conditions with an object'], ['그냥 문자열을 이으면 px-4와 px-2가 둘 다 남아 CSS 순서에 따라 결과가 달라져요 · twMerge는 뒤에 온 px-2만 남겨요', 'plain concatenation keeps both px-4 and px-2, leaving the result to CSS order, while twMerge keeps only the later px-2'], ['그래서 컴포넌트가 className prop을 받아 cn()으로 합치면 쓰는 쪽에서 스타일을 안전하게 덮어쓸 수 있어요', 'so a component that merges a className prop through cn() lets callers override styles safely']],
    fin: [['cn(): clsx로 조건부 클래스를 만들고 tailwind-merge로 같은 속성의 충돌을 마지막 값으로 정리하는 헬퍼', 'cn() builds conditional classes with clsx and resolves same-property conflicts to the last value with tailwind-merge', 'twx-xs twx-a'], ['twMerge는 px-4와 p-2처럼 범위가 겹치는 것도 이해해요', 'twMerge understands overlapping utilities such as px-4 and p-2'], ['@theme로 만든 커스텀 클래스는 설정에 알려줘야 정확히 합쳐요', 'custom classes from @theme must be registered for accurate merging']],
    caps: [['clsx + tailwind-merge', 'clsx plus tailwind-merge'], ['조건부 클래스', 'Conditional classes'], ['충돌 정리', 'Resolving conflicts'], ['안전한 덮어쓰기', 'Safe overrides'], ['cn() 헬퍼', 'The cn() helper']]
  });
}

function sCvaTw() {
  return CW('tw-cva', {
    code: ['const button = cva("rounded-lg font-medium", {', '  variants: {', '    intent: { primary: "bg-sky-600",', '              ghost: "hover:bg-slate-100" },', '    size: { sm: "h-8 px-3", lg: "h-12 px-6" },', '  },', '  defaultVariants: {', '    intent: "primary", size: "sm" },', '});', 'button({ intent: "ghost", size: "lg" })'],
    hl: [[0, 1], [1, 5, 'ok'], [6, 2, 'warn'], [9, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'bs', X, .8, 12.0, 'rounded-lg font-medium', 'line', 1, { h: 1.1, off: 2 }); lbl(S, 'n1', X, 2.4, ['모든 버튼에 공통인 기본 클래스', 'base classes shared by all buttons'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'hi', X + 2.6, .8, 'primary', 'm a', 2); lbl(S, 'hg', X + 7.6, .8, 'ghost', 'm a', 2); lbl(S, 'vs', X, 2.2, 'sm', 'm g', 2); lbl(S, 'vl', X, 4.4, 'lg', 'm g', 2);
      const B = (k, x, y, w, h, prim, st) => { sw(S, k, x, y, w, h, prim ? '#0284c7' : 'var(--ui)', st, { r: .4, css: prim ? 'z-index:2' : 'border:.08em solid var(--line);z-index:2' }); cl(S, k + 'l', x, y + h / 2 - .45, w, ['버튼', 'Button'], prim ? 'twx-ic' : '', st, { css: 'z-index:3' + (prim ? ';color:#fff' : '') }); };
      B('b00', X + 2.0, 2.0, 3.6, 1.0, 1, 2); B('b01', X + 7.0, 2.0, 3.6, 1.0, 0, 2); B('b10', X + 1.4, 3.8, 4.8, 1.6, 1, 2); B('b11', X + 6.4, 3.8, 4.8, 1.6, 0, 2);
      lbl(S, 'n2', X, 6.2, ['variant 조합마다 클래스가 정해져요', 'each variant combination maps to classes'], 'g', 2, { w: 12 });
      lbl(S, 'n3', X, 7.3, ['아무것도 안 주면 primary · sm', 'with no props: primary, sm'], 'w', 3, { off: 4, w: 12 }); frame(S, 'f0', X + 1.8, 1.8, 4.0, 1.4, 'warn', 3, { off: 4, w: .12 });
      frame(S, 'f1', X + 6.2, 3.6, 5.2, 2.0, 'accent', 4, { w: .12 }); lbl(S, 'n4', X, 7.3, ['타입까지 자동: intent는 primary | ghost', 'typed too: intent is primary | ghost'], 'a', 4, { w: 12 });
    },
    notes: [['cva(class-variance-authority)의 첫 인자는 모든 변형에 공통인 기본 클래스예요', 'cva’s (class-variance-authority) first argument holds base classes shared by every variant'], ['variants에 intent와 size 같은 축을 두고, 값마다 붙일 클래스를 적어요 · 조합은 cva가 계산해요', 'variants define axes such as intent and size with classes per value, and cva computes the combinations'], ['defaultVariants는 props를 생략했을 때 쓸 기본값이에요', 'defaultVariants supplies the values used when props are omitted'], ['button({ intent: "ghost", size: "lg" })가 클래스 문자열을 돌려줘요 · TypeScript가 허용 값을 자동으로 검사해요', 'button({ intent: "ghost", size: "lg" }) returns the class string, and TypeScript checks the allowed values']],
    fin: [['cva: 컴포넌트의 변형(크기·의도·상태)을 선언적으로 정의해 클래스 조합을 관리하는 라이브러리', 'cva declares a component’s variants (size, intent, state) to manage class combinations', 'twx-xs twx-a'], ['compoundVariants로 “primary이면서 lg일 때”만의 클래스도 줘요', 'compoundVariants add classes for combinations such as primary plus lg'], ['tailwind-variants는 슬롯과 병합까지 지원하는 비슷한 대안이에요', 'tailwind-variants is a similar alternative with slots and built-in merging']],
    caps: [['기본 클래스', 'Base classes'], ['변형 축', 'Variant axes'], ['기본값', 'Defaults'], ['호출과 타입', 'Calling and types'], ['cva 변형', 'cva variants']]
  });
}

function sShadcn() {
  return CW('tw-shadcn', {
    code: ['npx shadcn@latest add button', ['// → components/ui/button.tsx 가 내 코드로', '// → components/ui/button.tsx, now your code'], ':root { --primary: oklch(0.21 0.03 265); }', '.dark { --primary: oklch(0.92 0 0); }', '@theme inline {', '  --color-primary: var(--primary);', '}', '<Button variant="outline">'],
    hl: [[0, 2], [2, 2, 'ok'], [4, 3, 'warn'], [7, 1]],
    draw: (S) => {
      const X = 19.4;
      nd(S, 'np', X, .8, 4.0, 'npm', 'line', 1, { h: 1.1 }); arw(S, 'a1', [X + 4.1, 1.35], [X + 5.1, 1.35], 1); nd(S, 'pj', X + 5.2, .8, 6.8, ['내 프로젝트 소스', 'my project source'], 'ok', 1, { h: 1.1 });
      lbl(S, 'n1', X, 2.4, ['라이브러리가 아니라 소스 복사 · 직접 고쳐요', 'copied source, not a dependency: edit it'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'lt', X, 2.4, 5.6, 2.0, '#ffffff', 2, { off: 3, css: 'border:.08em solid var(--line)', r: .4 }); chip(S, 'lb', X + .8, 2.9, 4.0, '--primary', 'ink', 2, { off: 3, h: 1.0 });
      sw(S, 'dk', X + 6.4, 2.4, 5.6, 2.0, '#0f172a', 2, { off: 3, r: .4 }); chip(S, 'db', X + 7.2, 2.9, 4.0, '--primary', 'line', 2, { off: 3, h: 1.0, css: 'z-index:3' });
      lbl(S, 'n2', X, 4.8, ['의미 이름 토큰을 테마마다 다른 값으로', 'semantic tokens with per-theme values'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'th', X, 2.4, 12.0, '--color-primary → bg-primary', 'warn', 3, { off: 4, h: 1.1 }); lbl(S, 'n3', X, 4.0, ['bg-primary 하나로 라이트·다크 모두', 'one bg-primary for light and dark'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 2.4, ['Radix 등 접근성 프리미티브 + Tailwind + cva', 'accessible primitives plus Tailwind and cva'], 'a', 4, { w: 12 }); lbl(S, 'n5', X, 3.5, ['디자인 시스템의 출발점으로 써요', 'a starting point for a design system'], 'g', 4, { w: 12 });
    },
    notes: [['shadcn/ui는 npm 패키지가 아니라 CLI가 컴포넌트 소스를 내 프로젝트에 복사해 주는 방식이에요 · 받은 뒤엔 내 코드라 마음대로 고쳐요', 'shadcn/ui is not an npm dependency; its CLI copies component source into your project, where it is yours to change'], ['--primary, --background 같은 의미 중심 토큰을 :root와 .dark에 서로 다른 값으로 정의해요', 'semantic tokens such as --primary and --background get different values on :root and .dark'], ['@theme inline이 그 변수를 Tailwind 색으로 연결해서 bg-primary 하나로 라이트와 다크를 모두 처리해요', '@theme inline maps those variables to Tailwind colors, so a single bg-primary handles light and dark'], ['내부는 Radix 같은 접근성 프리미티브 + Tailwind + cva 조합이라, 다룬 개념들이 한데 모인 실전 예제예요', 'inside it combines accessible primitives such as Radix with Tailwind and cva, bringing these concepts together in practice']],
    fin: [['shadcn/ui 패턴: 접근성 프리미티브 위에 Tailwind와 CSS 변수 토큰으로 만든 컴포넌트를 소스째 가져와 소유하는 방식', 'the shadcn/ui pattern copies and owns components built on accessible primitives with Tailwind and CSS variable tokens', 'twx-xs twx-a'], ['업데이트는 자동으로 오지 않아요 · 대신 의존성 문제도 없어요', 'updates do not arrive automatically, but neither do dependency conflicts'], ['토큰만 바꿔 브랜드 테마를 입혀요', 'brand themes come from changing tokens']],
    caps: [['소스 복사', 'Copying source'], ['의미 토큰', 'Semantic tokens'], ['@theme inline', '@theme inline'], ['구성 요소', 'What is inside'], ['shadcn/ui 패턴', 'The shadcn/ui pattern']]
  });
}

function sA11yTw() {
  return CW('tw-a11y', {
    code: [['<button aria-label="닫기">', '<button aria-label="Close">'], '  <XIcon class="size-4" aria-hidden="true"/>', ['<span class="sr-only">새 알림 3개</span>', '<span class="sr-only">3 new alerts</span>'], '<a class="focus-visible:outline-2', '  focus-visible:outline-sky-500">', '<div class="motion-safe:animate-bounce">', '<p class="contrast-more:text-black">'],
    hl: [[2, 1], [3, 2, 'ok'], [5, 1, 'warn'], [6, 1]],
    draw: (S) => {
      const X = 19.4;
      T(S, 'bl', X + .2, .9, '🔔', 'twx-l', 1, { off: 2 }); chip(S, 'bn', X + 1.4, .7, 1.2, '3', 'danger', 1, { off: 2, h: .9 });
      nd(S, 'sr', X + 3.8, .8, 8.2, ['스크린 리더: “새 알림 3개”', 'screen reader: “3 new alerts”'], 'accent', 1, { off: 2, h: 1.1 });
      lbl(S, 'n1', X, 2.6, ['sr-only: 눈엔 안 보이고 읽어 주기만', 'sr-only: read aloud, never shown'], 'a', 1, { off: 2, w: 12 });
      ['Home', 'Docs', 'Blog'].forEach((t, i) => { nd(S, 'lk' + i, X + i * 4.0, .8, 3.6, t, 'line', 2, { off: 3, h: 1.1 }); }); S.set('lk1', 2, { 'box-shadow': '0 0 0 .12em var(--ui),0 0 0 .26em var(--accent)' }); S.set('lk1', 0, { 'box-shadow': 'none' });
      lbl(S, 'n2', X, 2.6, ['Tab으로 이동할 때 초점이 분명하게', 'a clear focus ring for Tab navigation'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, .8, 'motion-safe:', 'm w', 3, { off: 4 }); lbl(S, 'n3b', X, 1.9, ['동작 줄이기를 안 켠 사용자에게만', 'only for users without reduce-motion'], '', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, .8, 'contrast-more:', 'm a', 4); lbl(S, 'n4b', X, 1.9, ['고대비 설정 사용자에게 더 진한 글자', 'darker text for high-contrast users'], '', 4, { w: 12 }); lbl(S, 'n4c', X, 3.0, ['forced-colors: 윈도 고대비 모드', 'forced-colors: Windows high contrast'], 'm', 4, { w: 12 });
    },
    notes: [['아이콘만 있는 버튼은 aria-label로 이름을 주고, 숫자 배지 같은 시각 정보는 sr-only 글로 함께 읽어 주게 해요', 'icon-only buttons get a name through aria-label, and visual cues such as a count badge get sr-only text that is read aloud'], ['focus-visible:outline으로 키보드 초점을 분명히 보여줘요 · Preflight 이후에도 초점 표시는 꼭 남겨요', 'focus-visible:outline makes keyboard focus obvious, and focus indicators must survive any reset'], ['motion-safe:는 동작 줄이기를 켜지 않은 사용자에게만 애니메이션을 줘요', 'motion-safe: animates only for users who have not enabled reduced motion'], ['contrast-more:, forced-colors: 변형으로 고대비 설정 사용자에게 맞춰요', 'the contrast-more: and forced-colors: variants adapt to users’ high-contrast settings']],
    fin: [['접근성 유틸리티와 변형: sr-only, focus-visible, motion-safe/reduce, contrast-more, forced-colors, aria-*', 'accessibility utilities and variants: sr-only, focus-visible, motion-safe/reduce, contrast-more, forced-colors and aria-*', 'twx-xs twx-a'], ['스타일 도구가 의미 있는 HTML을 대신하진 않아요 · button은 button으로', 'styling never replaces semantic HTML: a button should be a button'], ['색 대비는 팔레트 단계 차이로 확인해요', 'check color contrast through shade differences']],
    caps: [['sr-only', 'sr-only'], ['초점 표시', 'Focus indicators'], ['motion-safe', 'motion-safe'], ['고대비', 'High contrast'], ['접근성', 'Accessibility']]
  });
}

function sToolingTw() {
  return CW('tw-tooling', {
    code: [['// 정렬 전', '// before sorting'], '<div class="text-white p-4 hover:bg-sky-700', '  flex bg-sky-600">', ['// prettier-plugin-tailwindcss 후', '// after prettier-plugin-tailwindcss'], '<div class="flex bg-sky-600 p-4 text-white', '  hover:bg-sky-700">', ['// 긴 목록은 줄을 나누거나 컴포넌트로', '// split long lists or extract a component']],
    hl: [[1, 2, 'danger'], [4, 2, 'ok'], [0, 6], [6, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ie', X, .8, 12.0, 'Tailwind CSS IntelliSense', 'accent', 1, { h: 1.1, off: 2 }); ['bg-sky-500', 'bg-sky-600', 'bg-sky-700'].forEach((t, i) => { sw(S, 'sq' + i, X + .3, 2.3 + i * 1.0, .7, .7, SKY[5 + i], 1, { off: 2 }); lbl(S, 'ac' + i, X + 1.4, 2.2 + i * 1.0, t, 'm', 1, { off: 2 }); });
      lbl(S, 'n1', X, 5.6, ['자동 완성 · 색 미리보기 · 실제 CSS 보기', 'autocomplete, color swatches, generated CSS'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'pr', X, .8, 12.0, 'prettier-plugin-tailwindcss', 'ok', 2, { off: 3, h: 1.1 }); ['layout', 'box', 'color', 'text', 'variants'].forEach((t, i) => nd(S, 'or' + i, X + [0, 2.65, 4.7, 7.05, 9.1][i], 2.4, [2.4, 1.8, 2.1, 1.8, 2.9][i], t, 'line', 2, { off: 3, h: 1.0 }));
      lbl(S, 'n2', X, 5.6, ['정해진 순서로 자동 정렬 · 리뷰가 쉬워요', 'automatic, consistent order eases review'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 5.6, ['겹치는 클래스는 IntelliSense가 경고해요', 'IntelliSense flags conflicting classes'], 'w', 3, { off: 4, w: 12 }); nd(S, 'wr', X, .8, 12.0, ['⚠ p-4와 px-2 충돌', '⚠ p-4 conflicts with px-2'], 'warn', 3, { off: 4, h: 1.1 });
      nd(S, 'l1', X, .8, 12.0, ['class="… 클래스 20개 이상 …"', 'class="… 20+ classes …"'], 'warn', 4, { h: 1.1 }); arw(S, 'l1a', [X + 6.0, 2.0], [X + 6.0, 2.8], 4); nd(S, 'l2', X, 2.9, 12.0, ['줄 나누기 또는 <Card /> 추출', 'split lines or extract <Card />'], 'ok', 4, { h: 1.1 });
      lbl(S, 'n4', X, 5.6, ['도구가 일관성을 지켜 줘서 팀이 편해요', 'tools keep the team consistent'], 'a', 4, { w: 12 });
    },
    notes: [['정렬 규칙이 없으면 사람마다 클래스 순서가 달라 읽기 어렵고 리뷰에서 변경점이 잘 안 보여요', 'without an ordering rule, class order varies by author, making markup hard to read and diffs hard to review'], ['prettier-plugin-tailwindcss는 저장할 때 레이아웃 → 박스 → 색 → 글자 → 변형 순처럼 정해진 순서로 자동 정렬해요', 'prettier-plugin-tailwindcss sorts classes on save into a fixed order, roughly layout, box, color, text and then variants'], ['VS Code의 Tailwind CSS IntelliSense는 자동 완성, 색 미리보기, 생성될 CSS 보기, 충돌 경고를 줘요', 'Tailwind CSS IntelliSense in VS Code offers autocomplete, color previews, generated CSS on hover and conflict warnings'], ['클래스 목록이 너무 길면 줄을 나누거나 컴포넌트로 추출하는 게 신호예요', 'very long class lists are a signal to split lines or extract a component']],
    fin: [['Tailwind 도구: IntelliSense(자동 완성·미리보기·경고)와 Prettier 플러그인(클래스 정렬)이 사실상 필수예요', 'Tailwind tooling, IntelliSense for completion, previews and warnings plus the Prettier plugin for sorting, is close to essential', 'twx-xs twx-a'], ['cn(), cva 함수 안 문자열도 정렬하도록 설정할 수 있어요', 'both can be configured to cover strings inside cn() and cva'], ['ESLint 플러그인으로 잘못된 클래스를 잡기도 해요', 'ESLint plugins can also catch invalid classes']],
    caps: [['정렬 전', 'Before sorting'], ['자동 정렬', 'Automatic sorting'], ['IntelliSense', 'IntelliSense'], ['긴 목록의 신호', 'When lists grow long'], ['Tailwind 도구', 'Tailwind tooling']]
  });
}

function sCompareTw() {
  return CW('tw-compare', {
    code: [['/* 1. Tailwind: 클래스로 */', '/* 1. Tailwind: classes */'], '<button class="px-4 py-2 bg-sky-600">', ['/* 2. CSS Modules: 파일 단위 스코프 */', '/* 2. CSS Modules: file-scoped */'], 'import s from "./Button.module.css";', ['/* 3. CSS-in-JS: JS 안에서 */', '/* 3. CSS-in-JS: inside JS */'], 'const Btn = styled.button`padding: …`;', ['/* 4. 일반 CSS + BEM 이름 규칙 */', '/* 4. plain CSS with BEM naming */'], '.button--primary { … }'],
    hl: [[0, 2, 'ok'], [2, 2], [4, 2, 'warn'], [6, 2]],
    side: [
      [[['장점: 빠른 작성 · 작은 CSS · 일관된 토큰', 'pros: fast to write, small CSS, consistent tokens'], 'g'], [['단점: HTML이 길어짐 · 문법 학습', 'cons: verbose markup, a syntax to learn'], 'r']],
      [[['장점: 진짜 CSS · 이름 충돌 없음', 'pros: real CSS, no name collisions'], 'g'], [['단점: 파일 오가기 · 토큰은 직접 관리', 'cons: file switching, tokens are on you'], 'r']],
      [[['장점: props로 동적 스타일 · 같은 파일', 'pros: prop-driven styles, colocated'], 'g'], [['단점: 런타임 비용 · 서버 컴포넌트와 궁합', 'cons: runtime cost, friction with server components'], 'r']],
      [[['장점: 도구 불필요 · 누구나 앎', 'pros: no tooling, universally known'], 'g'], [['단점: 이름 짓기 · CSS가 계속 커짐', 'cons: naming, CSS keeps growing'], 'r']]
    ],
    notes: [['Tailwind는 클래스로 바로 스타일을 입혀 빠르고, 쓰인 것만 생성해 CSS가 작아요 · 대신 마크업이 길어져요', 'Tailwind styles directly with classes, fast to write and with small generated CSS, at the cost of longer markup'], ['CSS Modules는 진짜 CSS 파일을 쓰면서 클래스 이름을 파일 단위로 격리해 충돌을 막아요', 'CSS Modules keep real CSS files while scoping class names per file to prevent collisions'], ['styled-components 같은 런타임 CSS-in-JS는 props로 동적 스타일을 주기 좋지만, 실행 중 비용이 있고 서버 컴포넌트와 잘 맞지 않아요', 'runtime CSS-in-JS such as styled-components makes prop-driven styles easy, but costs run time and fits poorly with server components'], ['일반 CSS + BEM은 도구가 필요 없지만 이름 짓기와 쌓이는 CSS를 사람이 관리해야 해요', 'plain CSS with BEM needs no tooling, but people must manage naming and growing stylesheets']],
    fin: [['스타일링 방식 비교: 정답은 없고 팀의 규모·디자인 시스템·렌더링 방식(서버 컴포넌트 여부)에 맞춰 골라요', 'there is no single best styling approach; choose by team size, design system and rendering model, including server components', 'twx-xs twx-a'], ['Tailwind와 CSS Modules는 함께 쓸 수도 있어요', 'Tailwind and CSS Modules can coexist'], ['어떤 방식이든 디자인 토큰을 한 곳에 두는 게 핵심이에요', 'whatever the approach, keep design tokens in one place']],
    caps: [['Tailwind', 'Tailwind'], ['CSS Modules', 'CSS Modules'], ['CSS-in-JS', 'CSS-in-JS'], ['일반 CSS + BEM', 'Plain CSS and BEM'], ['스타일링 방식 비교', 'Comparing styling approaches']]
  });
}
return { css: CSSX + CSSY, secs: [
  sec('tw-basics', '기초', 'Basics', '유틸리티 우선의 기초', 'Utility-first basics', '작은 단일 목적 클래스를 조합해 스타일을 입히는 사고방식과, 간격·색·글자 스케일, 그리고 쓰인 클래스만 만드는 원리예요.', 'The mindset of composing small single-purpose classes, the spacing, color and type scales, and how only used classes get generated.', [
    item('tw-utility-first', '유틸리티 우선', 'Utility-first', 'px-4, bg-sky-600처럼 CSS 선언 하나에 해당하는 작은 클래스를 HTML에 조합해 스타일을 입히는 방식이에요. 클래스 이름을 짓고 CSS 파일을 오갈 필요가 없어요.', '전통적인 CSS는 .btn-primary 같은 이름을 짓고 별도 파일에 규칙을 적어요. 유틸리티 우선 방식은 class="px-4 py-2 rounded-lg bg-sky-600 text-white"처럼 이미 준비된 클래스를 마크업에서 바로 조합해요. 스타일이 그 요소에만 걸려서 다른 화면을 깨뜨릴 걱정이 적고, 요소를 지우면 스타일도 함께 사라져 쓰지 않는 CSS가 쌓이지 않아요. 값이 디자인 토큰(간격 단계, 색 단계)에서 나와서 여러 사람이 만들어도 화면이 일관돼요. 인라인 style과 달리 hover:, md:, dark: 같은 상태·반응형 조건도 쓸 수 있어요. 대신 클래스 목록이 길어지므로 반복은 컴포넌트로 추출해 관리해요.', 'Utility-first styling composes small classes, each matching one CSS declaration such as px-4 or bg-sky-600, directly in the HTML, with no class names to invent and no CSS files to switch to.', 'Traditional CSS names things like .btn-primary and writes rules in a separate file. Utility-first combines ready-made classes in the markup, as in class="px-4 py-2 rounded-lg bg-sky-600 text-white". Styles apply only to that element, so changes rarely break other screens, and deleting an element deletes its styles, so unused CSS never piles up. Values come from design tokens (spacing and color scales), keeping screens consistent across many authors. Unlike inline styles, utilities support conditions such as hover:, md: and dark:. The trade-off is long class lists, which are managed by extracting components.', sUtilityFirst()),
    item('tw-scale', '간격과 크기 스케일', 'Spacing and size scales', 'p-4, mt-8, w-64의 숫자는 간격 단위의 개수예요. 한 단위는 --spacing(기본 0.25rem = 4px)이라 모든 간격이 같은 박자를 따라요.', 'p-4는 padding: 1rem(16px), mt-8은 margin-top: 2rem(32px)이에요. v4에서는 모든 숫자가 calc(var(--spacing) * n)으로 계산돼서 w-13이나 gap-2.5처럼 목록에 없던 숫자도 바로 써요. 같은 스케일이 패딩·마진·gap·너비·높이·inset에 공통으로 쓰여 요소 사이 리듬이 맞아요. w-1/2 같은 분수는 퍼센트, w-full·w-screen·max-w-prose 같은 이름 있는 값도 있고, size-10은 너비와 높이를 한꺼번에 정해요. 음수 마진은 -mt-4처럼 앞에 -를 붙여요. --spacing 값 하나를 바꾸면 프로젝트 전체 밀도를 조절할 수 있어요.', 'The numbers in p-4, mt-8 and w-64 count spacing units, and one unit is --spacing (0.25rem, or 4px, by default), so all spacing follows the same rhythm.', 'p-4 means padding: 1rem (16px) and mt-8 margin-top: 2rem (32px). In v4 every number is computed as calc(var(--spacing) * n), so values not in a fixed list, such as w-13 or gap-2.5, just work. The same scale serves padding, margin, gap, width, height and inset, keeping rhythm between elements. Fractions such as w-1/2 are percentages, named values such as w-full, w-screen and max-w-prose exist, and size-10 sets width and height at once. Negative margins prefix a dash, as in -mt-4. Changing --spacing alone adjusts the density of the whole project.', sScale()),
    item('tw-colors', '색 팔레트와 투명도', 'Color palette and opacity', '색은 sky-500처럼 색 이름과 50~950 단계로 써요. 같은 이름을 bg-, text-, border-에 쓰고, /50으로 투명도를 줘요.', '기본 팔레트에는 slate, gray, red, sky 같은 색이 50부터 950까지 11단계로 있어요(v4.2에 mauve, olive, mist, taupe가 추가됐어요). bg-sky-500, text-sky-700, border-sky-200, ring-sky-500처럼 속성 접두사만 바꿔 같은 색을 써요. bg-black/50처럼 슬래시 뒤 숫자로 투명도를 주고, 내부적으로는 color-mix()로 계산돼요. v4 팔레트는 oklch로 정의되어 단계마다 밝기가 고르게 변하고 넓은 색 영역 화면에서 더 선명해요. 팔레트 밖 색은 bg-[#1da1f2]처럼 대괄호로, 브랜드 색은 @theme에 --color-brand-500으로 추가해 정식 토큰으로 만들어요. 글자는 600~900, 배경은 50~100처럼 단계 차이를 크게 두면 대비 기준도 쉽게 맞아요.', 'Colors combine a name and a shade from 50 to 950, as in sky-500, use the same names for bg-, text- and border-, and take opacity with /50.', 'The default palette has colors such as slate, gray, red and sky in 11 shades from 50 to 950, with mauve, olive, mist and taupe added in v4.2. Only the property prefix changes, as in bg-sky-500, text-sky-700, border-sky-200 and ring-sky-500. A slash adds opacity, as in bg-black/50, computed internally with color-mix(). The v4 palette is defined in oklch, so lightness steps evenly and colors look more vivid on wide-gamut screens. Colors outside the palette use brackets, as in bg-[#1da1f2], while brand colors become proper tokens in @theme, such as --color-brand-500. Keeping text at 600 to 900 and backgrounds at 50 to 100 makes contrast requirements easy to meet.', sColors()),
    item('tw-typography', '글자 유틸리티', 'Typography utilities', 'text-4xl(크기), font-bold(굵기), tracking-tight(자간), text-base/7(크기/줄 간격), truncate·line-clamp(말줄임)로 글자를 다뤄요.', '글자 크기는 text-xs부터 text-9xl까지 rem 단위라 사용자의 브라우저 글꼴 크기 설정을 존중해요. text-base/7처럼 슬래시로 줄 간격을 함께 주고, leading-*로 따로 정할 수도 있어요. 굵기는 font-normal·medium·semibold·bold, 자간은 tracking-tight·wide로 조절해요. 한 줄 말줄임은 truncate, 여러 줄은 line-clamp-2처럼 써요. text-balance는 제목의 줄 길이를 고르게, text-pretty는 마지막 줄에 단어 하나만 남는 걸 막아요. 블로그 본문처럼 마크다운으로 만든 HTML 전체는 typography 플러그인의 prose 클래스로 한 번에 꾸미고, 한글 본문은 줄 간격을 넉넉하게 두는 게 좋아요.', 'Typography is handled with text-4xl (size), font-bold (weight), tracking-tight (letter spacing), text-base/7 (size with line height) and truncate or line-clamp (ellipsis).', 'Sizes from text-xs to text-9xl use rem, respecting the browser’s font size setting. A slash adds line height, as in text-base/7, or leading-* sets it separately. Weights run through font-normal, medium, semibold and bold, and tracking-tight or wide adjusts letter spacing. truncate cuts to one line with an ellipsis, and line-clamp-2 to several lines. text-balance evens heading lines, and text-pretty avoids a lone word on the last line. Whole markdown-generated HTML, such as blog posts, is styled at once with the prose class from the typography plugin, and Korean body text benefits from generous line height.', sTypo()),
    item('tw-arbitrary', '임의 값', 'Arbitrary values', '스케일에 없는 값은 w-[37px]처럼 대괄호에 넣어 즉석에서 만들어요. CSS 변수는 bg-(--brand)처럼 괄호로 써요.', '디자인 시안의 딱 그 숫자가 필요할 때 top-[117px], bg-[#bada55], grid-cols-[200px_1fr]처럼 대괄호 안에 값을 적어요. 대괄호 안에서 공백은 밑줄(_)로 적어요. 유틸리티가 없는 CSS 속성은 [mask-type:luminance]처럼 속성과 값을 통째로 써요. v4에서는 CSS 변수를 bg-(--brand)처럼 소괄호로 써서 var()를 생략해요. calc(), min(), clamp() 같은 함수도 그대로 넣을 수 있어요. 편리하지만 남발하면 디자인 스케일이 무너지니 일회성 값에만 쓰고, 두 번 이상 쓰는 값은 @theme 토큰으로 올려요.', 'Values off the scale go in brackets, as in w-[37px], and are generated on the spot, while CSS variables use parentheses, as in bg-(--brand).', 'When a mockup needs an exact number, write the value inside brackets, as in top-[117px], bg-[#bada55] or grid-cols-[200px_1fr]. Spaces inside brackets are written as underscores. Properties without a utility take the whole declaration, as in [mask-type:luminance]. In v4, CSS variables use parentheses, as in bg-(--brand), dropping the var(). Functions such as calc(), min() and clamp() work too. They are convenient, but overuse erodes the design scale, so keep them for one-offs and promote any value used twice to an @theme token.', sArbitrary()),
    item('tw-jit', '쓰인 클래스만 생성', 'Generating only used classes', 'Tailwind는 소스 파일을 훑어 실제로 쓰인 클래스 이름만 CSS로 만들어요. 그래서 클래스 이름은 문자열을 조립하지 말고 완전한 형태로 적어야 해요.', '가능한 유틸리티는 수십만 개지만 결과 CSS에는 프로젝트가 쓴 것만 들어가서 보통 수십 KB 이하예요. 스캐너는 코드를 실행하지 않고 텍스트에서 클래스처럼 보이는 토큰을 찾아요. 그래서 `text-${color}-500`처럼 조립한 이름은 찾지 못해 스타일이 빠져요. 조건에 따라 바뀌어도 color === "red" ? "text-red-500" : "text-blue-500"처럼 완전한 이름을 적어 두면 돼요. v4는 .gitignore에 있는 경로와 바이너리를 빼고 소스를 자동으로 찾고, 모노레포의 다른 패키지는 @source로 추가해요. DB에서 오는 색처럼 정말 동적인 값은 style 속성이나 CSS 변수로 넘겨요.', 'Tailwind scans source files and generates CSS only for class names actually used, so class names must be written whole, never assembled from strings.', 'Hundreds of thousands of utilities are possible, but the output holds only what the project uses, usually tens of kilobytes at most. The scanner does not run code; it looks for class-like tokens in text. So an assembled name such as `text-${color}-500` is never seen and the style goes missing. Even when classes vary, writing complete names, as in color === "red" ? "text-red-500" : "text-blue-500", works. v4 finds sources automatically while skipping .gitignore paths and binaries, and other monorepo packages are added with @source. Truly dynamic values, such as colors from a database, go through the style attribute or CSS variables.', sJit())
  ]),
  sec('tw-layout', '레이아웃', 'Layout', '레이아웃과 반응형', 'Layout and responsiveness', 'Flexbox와 Grid, 반응형 접두사와 컨테이너 쿼리, 크기와 위치 지정을 클래스로 표현하는 방법이에요.', 'Expressing Flexbox, Grid, responsive prefixes, container queries, sizing and positioning as classes.', [
    item('tw-flex', 'Flexbox 유틸리티', 'Flexbox utilities', 'flex, items-center, justify-between, gap-4, flex-1로 한 방향 배치를 만들어요. 내비게이션 바와 버튼 줄의 기본이에요.', 'flex를 주면 자식이 가로로 나란히 놓이고, flex-col로 세로로 바꿔요. items-*는 교차축(보통 세로) 정렬, justify-*는 주축(보통 가로) 배분이에요. gap-4는 아이템 사이 간격을 주는데, 줄바꿈(flex-wrap)이나 숨긴 요소가 있어도 안전해서 space-x-*보다 권장돼요. flex-1은 남은 공간을 차지하고, 긴 글이 넘칠 땐 min-w-0을 함께 줘야 줄어들어요. shrink-0은 로고나 아바타가 찌그러지지 않게 막아요. flex-col md:flex-row처럼 반응형 접두사로 방향을 바꾸는 패턴이 아주 흔해요.', 'flex, items-center, justify-between, gap-4 and flex-1 build one-directional layouts, the foundation of navigation bars and button rows.', 'flex lines children up in a row, and flex-col switches to a column. items-* aligns on the cross axis (usually vertical) and justify-* distributes along the main axis (usually horizontal). gap-4 spaces items and stays correct with wrapping (flex-wrap) or hidden elements, so it is preferred over space-x-*. flex-1 takes the remaining space, and long text needs min-w-0 alongside it to shrink. shrink-0 keeps logos and avatars from squashing. Switching direction with a responsive prefix, as in flex-col md:flex-row, is a very common pattern.', sFlexTw()),
    item('tw-grid', 'Grid 유틸리티', 'Grid utilities', 'grid grid-cols-3 gap-6처럼 열 수와 간격을 정해 2차원 배치를 만들어요. col-span-2로 칸을 합치고 반응형 접두사로 열 수를 바꿔요.', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4는 카드 목록의 단골 패턴으로, 화면이 넓어질수록 열이 늘어나요. col-span-2, row-span-2로 큰 카드를 만들고, col-start-*로 시작 위치를 정해요. grid-cols-[240px_1fr]처럼 임의 값으로 고정 사이드바와 유연한 본문을 만들 수 있어요. 열 개수를 고정하지 않고 자동으로 채우려면 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]처럼 써요. place-items-center는 한 줄로 가로세로 가운데 정렬을 해요. subgrid도 지원해서 카드 안 제목과 버튼 줄을 이웃 카드와 맞출 수 있어요.', 'grid grid-cols-3 gap-6 sets column count and gaps for two-dimensional layout, col-span-2 merges tracks, and responsive prefixes change the column count.', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 is the classic card list, adding columns as the screen widens. col-span-2 and row-span-2 make feature cards, and col-start-* sets a start line. Arbitrary values such as grid-cols-[240px_1fr] create a fixed sidebar beside a flexible main area. To fill columns automatically, write grid-cols-[repeat(auto-fill,minmax(200px,1fr))]. place-items-center centers both ways in one class. subgrid is supported too, aligning titles and buttons across neighboring cards.', sGridTw()),
    item('tw-responsive', '반응형 접두사', 'Responsive prefixes', 'sm:, md:, lg: 접두사는 “그 크기 이상에서”라는 뜻이에요. 접두사 없는 클래스가 모바일 기본값이고, 넓어질수록 덮어써요.', '기본 기준점은 sm 40rem(640px), md 48rem(768px), lg 64rem(1024px), xl 80rem, 2xl 96rem이에요. w-full md:w-1/2 lg:w-1/3이면 모바일은 꽉 차게, 태블릿 이상은 반, 데스크톱은 3분의 1이에요. 그래서 “sm:은 휴대폰용”이 아니라 “40rem 이상”이라는 점이 가장 흔한 착각이에요. hidden md:flex로 넓은 화면에서만 보이게 하고, max-md:처럼 max-를 붙이면 “미만”에, md:max-lg:로 범위에 적용해요. 기준점은 @theme의 --breakpoint-*로 추가하거나 바꿔요. 모바일부터 설계하면 작은 화면에서 필요한 것만 남기게 돼서 더 단순해져요.', 'The sm:, md: and lg: prefixes mean “from this size up”; unprefixed classes are the mobile default, overridden as the screen widens.', 'The default breakpoints are sm 40rem (640px), md 48rem (768px), lg 64rem (1024px), xl 80rem and 2xl 96rem. w-full md:w-1/2 lg:w-1/3 is full width on mobile, half from tablets and a third on desktops. The most common confusion is reading sm: as “for phones” when it means “40rem and up”. hidden md:flex shows an element only on wide screens, a max- prefix such as max-md: targets “below”, and md:max-lg: targets a range. Breakpoints are added or changed with --breakpoint-* in @theme. Designing mobile first keeps only what small screens need, which tends to simplify things.', sResponsive()),
    item('tw-container-q', '컨테이너 쿼리', 'Container queries', '@container를 준 부모의 폭을 기준으로 @md: 같은 접두사가 동작해요. 같은 컴포넌트가 놓인 자리에 따라 다르게 배치돼요.', '반응형 접두사(md:)는 화면 폭을 보지만, 카드처럼 재사용되는 컴포넌트는 화면보다 자기가 놓인 칸의 폭이 중요해요. 부모에 @container를 주면 자식들이 @sm:, @md:, @lg:로 그 부모의 폭에 반응해요. 그래서 같은 카드가 좁은 사이드바에서는 세로로, 넓은 본문에서는 가로로 놓여요. v4는 플러그인 없이 기본으로 지원하고, @max-md:로 미만 범위도 써요. 여러 컨테이너가 중첩되면 @container/main과 @lg/main처럼 이름으로 골라요. v4.3에는 cqh 같은 높이 단위를 쓰기 위한 @container-size도 추가됐어요.', 'Prefixes such as @md: respond to the width of a parent marked @container, so one component lays out differently depending on where it sits.', 'Responsive prefixes (md:) read the screen width, but reusable components such as cards care more about the width of their slot. With @container on the parent, children react to it through @sm:, @md: and @lg:. The same card can stack in a narrow sidebar and sit side by side in a wide main area. v4 supports this out of the box, and @max-md: targets ranges below. With nested containers, names pick the right one, as in @container/main and @lg/main. v4.3 added @container-size for height-based units such as cqh.', sContainerTw()),
    item('tw-sizing', '크기 유틸리티', 'Sizing utilities', 'w-*, h-*, size-*, min-/max-*, aspect-*로 크기를 정해요. max-w-3xl mx-auto는 본문 폭을 정하고 가운데 놓는 기본 조합이에요.', 'w-64처럼 스케일 값, w-1/2처럼 분수, w-full·w-screen·w-fit 같은 키워드를 써요. size-12는 너비와 높이를 함께 정해서 아바타와 아이콘에 편해요. w-full max-w-3xl mx-auto px-4는 넓은 화면에서도 읽기 좋은 폭을 유지하는 페이지 본문의 기본형이에요. 높이는 h-screen보다 h-dvh나 min-h-dvh가 모바일 주소창 변화에 정확해요. aspect-video(16:9), aspect-square로 비율을 고정하면 이미지가 늦게 와도 자리가 밀리지 않아요. v4.2부터는 inline-*, block-* 같은 논리 크기 유틸리티도 있어요.', 'w-*, h-*, size-*, min-/max-* and aspect-* set sizes, and max-w-3xl mx-auto is the standard combination for a centered, width-capped page body.', 'Use scale values such as w-64, fractions such as w-1/2 and keywords such as w-full, w-screen and w-fit. size-12 sets width and height together, handy for avatars and icons. w-full max-w-3xl mx-auto px-4 is the classic page body that stays readable on wide screens. For height, h-dvh or min-h-dvh track mobile toolbars more accurately than h-screen. aspect-video (16:9) and aspect-square lock ratios so late-loading images do not shift the layout. Since v4.2 there are logical sizing utilities such as inline-* and block-* as well.', sSizing()),
    item('tw-position', '위치 지정', 'Positioning', 'relative 부모 안에서 absolute top-2 right-2로 배지를, inset-0으로 오버레이를 놓아요. sticky top-0은 스크롤해도 붙는 헤더예요.', 'absolute 요소는 position이 있는 가장 가까운 조상을 기준으로 놓이므로 부모에 relative를 줘요. top-2 right-2처럼 간격 스케일로 위치를 정하고, inset-0은 네 변을 모두 0으로 해 부모를 꽉 덮어요. sticky top-0은 스크롤하다 위에 닿으면 붙는 헤더를 만들고, fixed는 화면 기준이라 떠 있는 버튼에 써요. 겹치는 순서는 z-10, z-50 같은 z-index 유틸리티로 정해요. sticky가 동작하지 않으면 조상에 overflow:hidden이 있는지 먼저 확인해요. v4.2부터 inset-s-*, inset-e-* 같은 논리 방향 인셋도 있어요.', 'Inside a relative parent, absolute top-2 right-2 places a badge and inset-0 an overlay, while sticky top-0 makes a header that stays while scrolling.', 'An absolute element is placed against its nearest positioned ancestor, so the parent gets relative. Offsets use the spacing scale, as in top-2 right-2, and inset-0 sets all four sides to 0 to cover the parent. sticky top-0 makes a header that sticks once it reaches the top, while fixed is relative to the screen, suited to floating buttons. Stacking order uses z-index utilities such as z-10 and z-50. If sticky does not work, first check ancestors for overflow: hidden. Since v4.2 there are logical insets such as inset-s-* and inset-e-*.', sPositionTw())
  ]),
  sec('tw-variants', '변형', 'Variants', '상태와 조건 변형', 'State and condition variants', 'hover:, group-hover:, dark:, aria-*, before: 같은 접두사로 상태·관계·테마·속성 조건에 따라 스타일을 바꾸는 방법이에요.', 'Changing styles by state, relationship, theme or attribute with prefixes such as hover:, group-hover:, dark:, aria-* and before:.', [
    item('tw-states', '상태 변형', 'State variants', 'hover:, focus-visible:, active:, disabled: 같은 접두사를 붙이면 그 상태일 때만 적용돼요. dark:md:hover:처럼 여러 조건을 쌓을 수 있어요.', '변형(variant)은 CSS 의사 클래스와 미디어 쿼리를 접두사로 바꾼 거예요. hover:bg-sky-700은 .hover\\:bg-sky-700:hover 규칙으로 만들어지고, v4에서는 hover를 지원하는 기기에서만 적용돼 터치 화면에서 hover 상태가 남는 문제를 피해요. focus:보다 focus-visible:을 쓰면 키보드로 이동할 때만 초점 링이 보여요. active:scale-95로 누르는 느낌을, disabled:opacity-50으로 비활성 상태를 표현해요. first:, last:, odd:, required:, invalid:, open: 등도 같은 방식이에요. 변형은 겹쳐 쓸 수 있고 v4에서는 왼쪽부터 적용돼요.', 'Prefixes such as hover:, focus-visible:, active: and disabled: apply a class only in that state, and conditions stack, as in dark:md:hover:.', 'A variant is a CSS pseudo-class or media query turned into a prefix. hover:bg-sky-700 compiles to a rule on :hover, and in v4 it applies only on devices that support hover, avoiding sticky hover states on touch screens. focus-visible: instead of focus: shows the ring only for keyboard navigation. active:scale-95 conveys a press, and disabled:opacity-50 an inactive state. first:, last:, odd:, required:, invalid:, open: and others work the same way. Variants stack, and in v4 they apply from left to right.', sStates()),
    item('tw-group-peer', 'group과 peer', 'group and peer', '부모에 group을 달면 자식이 group-hover:로 부모 상태에 반응하고, input에 peer를 달면 뒤 형제가 peer-invalid:로 반응해요. JS 없이 상호작용을 표현해요.', '카드 전체에 마우스를 올렸을 때 안쪽 화살표만 움직이고 싶다면 카드에 group, 화살표에 group-hover:translate-x-1을 줘요. peer는 형제 관계에 쓰여서 input.peer 뒤의 p에 peer-invalid:block을 주면 잘못 입력했을 때만 오류 문구가 보여요. CSS의 형제 선택자 원리라서 peer 요소가 반드시 앞에 있어야 해요. 그룹이 중첩되면 group/item과 group-hover/item처럼 이름을 붙여 어느 부모를 볼지 정해요. group-focus-within:, peer-checked:, group-has-*: 같은 조합도 가능해요. v4의 in-*: 변형은 group 표시 없이도 조상의 상태에 반응해요.', 'A group class on a parent lets children react through group-hover:, and a peer on an input lets later siblings react through peer-invalid:, expressing interaction without JS.', 'To move only the inner arrow when hovering anywhere on a card, put group on the card and group-hover:translate-x-1 on the arrow. peer handles siblings: after input.peer, a p with peer-invalid:block shows an error only for invalid input. It relies on CSS sibling selectors, so the peer must come first. With nested groups, names such as group/item and group-hover/item choose which parent to read. Combinations such as group-focus-within:, peer-checked: and group-has-*: are possible. v4’s in-*: variant reacts to ancestor state without a group marker.', sGroupPeer()),
    item('tw-dark', '다크 모드', 'Dark mode', 'dark:bg-slate-900처럼 dark: 접두사로 어두운 테마의 값을 같은 요소에 적어요. 기본은 OS 설정을 따르고, 직접 토글하려면 @custom-variant로 클래스 기준으로 바꿔요.', 'dark: 변형은 기본적으로 prefers-color-scheme: dark 미디어 쿼리를 써서 운영체제 설정을 따라요. 사용자가 직접 고르게 하려면 CSS에 @custom-variant dark (&:where(.dark, .dark *));를 적고 html 요소에 dark 클래스를 토글해요. 선택은 localStorage에 저장하고, head 안의 작은 스크립트로 첫 그리기 전에 적용해야 새로고침할 때 하얗게 깜빡이지 않아요. 색이 많은 앱이라면 모든 요소에 dark:를 붙이기보다 --background, --foreground 같은 CSS 변수 토큰을 테마별로 바꾸는 방식이 관리하기 쉬워요. data-theme 속성을 기준으로 변형을 정의할 수도 있어요. 다크 모드에서는 순수한 검정보다 짙은 남색·회색이 눈에 편해요.', 'The dark: prefix writes dark-theme values on the same element, as in dark:bg-slate-900; it follows the OS by default, and @custom-variant switches it to a class for manual toggles.', 'By default the dark: variant uses the prefers-color-scheme: dark media query, following the operating system. To let users choose, add @custom-variant dark (&:where(.dark, .dark *)); to the CSS and toggle a dark class on html. Store the choice in localStorage and apply it with a small script in head before first paint, or the page flashes white on reload. Apps with many colors are easier to manage by swapping CSS variable tokens such as --background and --foreground per theme instead of adding dark: everywhere. The variant can also key on a data-theme attribute. In dark mode, deep navy or gray is easier on the eyes than pure black.', sDarkTw()),
    item('tw-data-aria', '속성과 구조 변형', 'Attribute and structure variants', 'aria-expanded:, data-[state=open]:, has-checked:, not-last: 처럼 HTML 속성과 자식·형제 구조를 조건으로 스타일을 바꿔요.', 'aria-expanded:rotate-180은 aria-expanded="true"일 때만 적용돼서 접근성 속성과 모양이 어긋나지 않아요. Radix 같은 헤드리스 라이브러리는 상태를 data-state="open"처럼 알려주므로 data-[state=open]:block으로 받아요. 값 없는 속성은 data-active:처럼 존재 여부로 판단해요. has-checked:ring-2는 CSS :has()를 써서 안의 라디오가 선택된 카드 전체를 강조해요. not-last:border-b처럼 not-*은 어떤 변형이든 뒤집고, in-*은 조상의 상태에 반응해요. JavaScript로 클래스를 붙였다 떼는 대신 이미 있는 상태 속성을 그대로 스타일 조건으로 쓰는 게 핵심이에요.', 'Variants such as aria-expanded:, data-[state=open]:, has-checked: and not-last: change styles based on HTML attributes and on child or sibling structure.', 'aria-expanded:rotate-180 applies only when aria-expanded="true", keeping accessibility state and appearance in sync. Headless libraries such as Radix expose state as data-state="open", picked up with data-[state=open]:block. Valueless attributes match on presence, as in data-active:. has-checked:ring-2 uses CSS :has() to highlight a whole card when a radio inside is checked. not-* negates any variant, as in not-last:border-b, and in-* reacts to ancestor state. The key idea is to style from state attributes that already exist instead of toggling classes with JavaScript.', sDataAria()),
    item('tw-pseudo-el', '가상 요소 변형', 'Pseudo-element variants', 'before:, after:, placeholder:, file:, marker:, selection: 접두사로 ::before 같은 가상 요소와 브라우저 기본 부품을 꾸며요.', '필수 입력 표시 별표처럼 장식은 after:content-[\'*\'] after:text-red-500으로 HTML 없이 붙여요. v4는 before:/after:를 쓰면 content를 빈 값으로 자동 설정해서 장식 상자를 만들기 쉬워요. placeholder:text-slate-400은 입력창 안내 문구만, file:rounded-full file:bg-sky-50은 파일 입력의 기본 버튼만 꾸며요. marker:text-sky-500은 목록 글머리표, selection:bg-amber-200은 드래그로 선택한 글자의 색이에요. first-line:, first-letter:로 첫 줄·첫 글자 장식도 가능해요. *: 변형은 직접 자식 전체에 같은 스타일을 줄 때 써요.', 'The before:, after:, placeholder:, file:, marker: and selection: prefixes style pseudo-elements such as ::before and the browser’s built-in parts.', 'Decorations such as a required-field asterisk are added without HTML through after:content-[\'*\'] after:text-red-500. In v4, using before: or after: sets an empty content automatically, making decorative boxes easy. placeholder:text-slate-400 styles only an input’s hint, and file:rounded-full file:bg-sky-50 only the native file button. marker:text-sky-500 colors list bullets, and selection:bg-amber-200 the highlighted text. first-line: and first-letter: decorate the first line or letter. The *: variant applies the same style to all direct children.', sPseudoEl()),
    item('tw-motion', '전환과 애니메이션', 'Transitions and animation', 'transition duration-200 ease-out으로 상태 변화를 부드럽게, animate-spin·ping·pulse로 기본 애니메이션을 줘요. motion-reduce:로 움직임에 민감한 사용자를 배려해요.', 'transition은 색·투명도·transform 같은 흔한 속성의 변화를 부드럽게 하고, duration-*, ease-*, delay-*로 시간과 곡선을 정해요. hover:-translate-y-1 hover:shadow-lg와 함께 쓰면 카드가 살짝 떠오르는 효과가 돼요. animate-spin은 로딩, animate-ping은 알림 점, animate-pulse는 스켈레톤 화면, animate-bounce는 주의 끌기에 써요. motion-reduce:는 OS에서 “동작 줄이기”를 켠 사용자에게만 적용돼 움직임을 끄거나 줄이고, motion-safe:는 그 반대예요. starting: 변형은 CSS @starting-style을 써서 dialog나 팝오버가 처음 나타날 때의 등장 애니메이션을 만들어요. 직접 만든 @keyframes는 @theme의 --animate-* 변수로 등록해 animate-* 클래스로 써요.', 'transition duration-200 ease-out smooths state changes, animate-spin, ping and pulse supply built-in animations, and motion-reduce: respects users sensitive to motion.', 'transition smooths changes to common properties such as color, opacity and transform, and duration-*, ease-* and delay-* set timing and curves. Combined with hover:-translate-y-1 hover:shadow-lg, a card lifts slightly. animate-spin serves loading, animate-ping notification dots, animate-pulse skeleton screens and animate-bounce attention. motion-reduce: applies only to users who enabled “reduce motion” in the OS, turning motion off or down, and motion-safe: is its opposite. The starting: variant uses CSS @starting-style to animate dialogs and popovers on first appearance. Custom @keyframes are registered as --animate-* variables in @theme and used as animate-* classes.', sMotionTw())
  ]),
  sec('tw-config', 'v4 설정', 'v4 config', 'v4 설정과 확장', 'Configuring and extending v4', 'CSS 한 줄로 시작하는 설치, @theme 토큰, 캐스케이드 레이어, @utility와 @custom-variant, Preflight, 플러그인, 그리고 v3에서 바뀐 점이에요.', 'One-line CSS setup, @theme tokens, cascade layers, @utility and @custom-variant, Preflight, plugins, and what changed from v3.', [
    item('tw-setup', 'v4 설치와 구조', 'Setting up v4', 'tailwindcss와 빌드 플러그인을 설치하고 CSS에 @import "tailwindcss" 한 줄을 쓰면 끝이에요. 설정 파일과 콘텐츠 경로 목록이 필요 없어요.', 'Vite 프로젝트는 @tailwindcss/vite, Next.js처럼 PostCSS를 쓰는 곳은 @tailwindcss/postcss, 빌드 도구가 없으면 @tailwindcss/cli를 써요(v4.2부터 @tailwindcss/webpack도 있어요). CSS 파일의 @import "tailwindcss"가 theme, base(Preflight), components, utilities 레이어를 한꺼번에 불러와요. Rust로 다시 만든 Oxide 엔진이 소스를 자동으로 찾아 쓰인 클래스만 생성하고, v3보다 전체 빌드는 수 배, 증분 빌드는 훨씬 빨라졌어요. 설정은 JS 파일 대신 CSS 안의 @theme, @source, @plugin 같은 지시어로 해요. 결과 CSS는 네이티브 캐스케이드 레이어, @property, color-mix() 같은 최신 CSS를 써요.', 'Install tailwindcss and a build plugin, write @import "tailwindcss" in your CSS, and you are done, with no config file or content path list.', 'Vite projects use @tailwindcss/vite, PostCSS-based setups such as Next.js use @tailwindcss/postcss, and projects without a bundler use @tailwindcss/cli, with @tailwindcss/webpack available since v4.2. @import "tailwindcss" pulls in the theme, base (Preflight), components and utilities layers at once. The Oxide engine, rewritten in Rust, finds sources automatically and generates only used classes, with full builds several times faster than v3 and incremental builds far faster. Configuration moves from a JS file to CSS directives such as @theme, @source and @plugin. The output uses modern CSS: native cascade layers, @property and color-mix().', sSetup()),
    item('tw-theme', '@theme 디자인 토큰', '@theme design tokens', '@theme 안에 --color-brand-500 같은 CSS 변수를 정의하면 bg-brand-500 같은 유틸리티와 :root의 CSS 변수가 함께 생겨요.', '변수 이름의 접두사(네임스페이스)가 유틸리티 종류를 정해요. --color-*는 bg-·text-·border- 색, --font-*는 font-*, --breakpoint-*는 반응형 변형, --radius-*는 rounded-*, --shadow-*는 shadow-*, --animate-*는 animate-*가 돼요. 모든 토큰은 :root의 CSS 변수로도 출력되어 차트 라이브러리, 인라인 style, JS에서 var(--color-brand-500)로 그대로 써요. --color-*: initial;로 기본 팔레트를 지우고 내 색만 남길 수 있어요. 다른 변수를 참조하는 토큰은 @theme inline을 써야 값이 제대로 풀려요. 토큰이 CSS에 있으니 디자인 시스템의 단일 출처가 되고, 디자이너가 쓰는 변수와 이름을 맞추기도 쉬워요.', 'Defining CSS variables such as --color-brand-500 inside @theme creates utilities such as bg-brand-500 and matching CSS variables on :root.', 'The variable’s prefix (namespace) decides the utility type: --color-* yields bg-, text- and border- colors, --font-* font-*, --breakpoint-* responsive variants, --radius-* rounded-*, --shadow-* shadow-* and --animate-* animate-*. Every token is also emitted as a CSS variable on :root, usable as var(--color-brand-500) in chart libraries, inline styles and JS. --color-*: initial; clears the default palette, leaving only your colors. Tokens that reference other variables need @theme inline to resolve correctly. With tokens in CSS, the stylesheet becomes the design system’s single source of truth, easy to align with the variables designers use.', sThemeTw()),
    item('tw-layers', '캐스케이드 레이어', 'Cascade layers', 'v4는 theme → base → components → utilities 순서의 네이티브 @layer를 써요. 유틸리티가 마지막이라 명시도와 상관없이 컴포넌트 클래스를 이겨요.', 'CSS 캐스케이드 레이어에서는 나중에 선언된 레이어가 선택자의 명시도와 상관없이 이겨요. base 레이어에는 h1, a 같은 태그 기본값을, components 레이어에는 .card 같은 재사용 클래스를 둬요. utilities가 마지막이라 class="card p-2"에서 p-2가 .card의 패딩을 확실히 덮어써요. 레이어에 넣지 않은 일반 CSS는 모든 레이어를 이기므로, 기존 CSS를 섞을 땐 @layer components 안에 넣는 게 안전해요. 직접 만든 유틸리티는 @layer utilities가 아니라 @utility로 등록해야 변형과 함께 동작해요. v3는 레이어를 흉내만 냈지만 v4는 브라우저의 진짜 레이어라 개발자 도구에서도 순서가 보여요.', 'v4 uses native @layer in the order theme, base, components, utilities, so utilities come last and beat component classes regardless of specificity.', 'With CSS cascade layers, a later layer wins regardless of selector specificity. The base layer holds element defaults such as h1 and a, and the components layer reusable classes such as .card. Because utilities come last, p-2 reliably overrides .card’s padding in class="card p-2". Unlayered CSS beats every layer, so legacy CSS is safest inside @layer components. Custom utilities should be registered with @utility rather than @layer utilities so they work with variants. v3 only emulated layers, while v4 uses real browser layers, visible in developer tools.', sLayersTw()),
    item('tw-custom', '@utility와 @custom-variant', '@utility and @custom-variant', '@utility로 나만의 유틸리티를, @custom-variant로 나만의 변형을 CSS 안에서 만들어요. JS 플러그인 없이 확장할 수 있어요.', '@utility content-auto { content-visibility: auto; }처럼 등록하면 hover:content-auto, lg:content-auto처럼 변형과 함께 쓰이고, 쓰일 때만 생성돼요. 이름이 tab-*처럼 끝나는 함수형 유틸리티는 --value(integer)나 --value(--tab-size-*)로 값을 받아 tab-2, tab-8을 모두 처리해요. v4.3부터 --default()로 값 없이 쓴 tab의 기본값도 정할 수 있어요. @custom-variant pointer-coarse (@media (pointer: coarse));처럼 미디어 쿼리나 선택자를 새 변형으로 만들어요. @variant dark { … }는 일반 CSS 규칙 안에서 변형을 적용하고, v4.3부터 @variant hover:focus처럼 겹쳐 쓸 수 있어요. 덕분에 대부분의 확장이 CSS 파일 하나에서 끝나요.', '@utility creates your own utilities and @custom-variant your own variants inside CSS, extending Tailwind without JS plugins.', 'Registering @utility content-auto { content-visibility: auto; } makes it work with variants such as hover:content-auto and lg:content-auto, generated only when used. Functional utilities whose names end in -*, such as tab-*, take values through --value(integer) or --value(--tab-size-*), handling tab-2 and tab-8 alike. Since v4.3, --default() sets the value for a bare tab. @custom-variant pointer-coarse (@media (pointer: coarse)); turns a media query or selector into a variant. @variant dark { … } applies a variant inside ordinary CSS, and since v4.3 it can stack, as in @variant hover:focus. Most extensions now live in a single CSS file.', sCustomTw()),
    item('tw-apply', '@apply', '@apply', '@apply는 유틸리티 클래스를 일반 CSS 규칙 안에 펼쳐 넣는 지시어예요. 클래스를 달 수 없는 HTML을 꾸밀 때 유용하지만 남발하면 Tailwind의 장점이 사라져요.', '.btn { @apply rounded-lg px-4 py-2; }는 같은 값의 평범한 CSS 선언으로 바뀌어요. 마크다운에서 생성된 HTML, CMS 콘텐츠, 외부 위젯처럼 클래스를 직접 달 수 없는 곳에 쓰기 좋아요. Vue·Svelte·CSS Modules의 style 블록처럼 메인 CSS와 따로 처리되는 곳에서는 @reference "../app.css";로 토큰과 유틸리티 정의만 불러와 CSS가 중복 출력되지 않게 해요. 모든 컴포넌트를 @apply 클래스로 감싸면 이름 짓기, 파일 오가기, 쌓이는 CSS라는 원래 문제가 되돌아와요. 반복은 먼저 컴포넌트로 추출하고, @apply는 탈출구로만 써요. @apply 안에서도 hover: 같은 변형을 쓸 수 있어요.', '@apply expands utility classes into an ordinary CSS rule, useful for HTML you cannot add classes to, but overuse erases Tailwind’s benefits.', '.btn { @apply rounded-lg px-4 py-2; } becomes plain CSS declarations with the same values. It suits places where classes cannot be added directly, such as markdown-generated HTML, CMS content and third-party widgets. In style blocks processed separately from the main CSS, such as Vue, Svelte or CSS Modules, @reference "../app.css"; imports token and utility definitions without duplicating output. Wrapping every component in @apply classes brings back the original problems: naming, file switching and growing CSS. Extract components first for repetition and keep @apply as an escape hatch. Variants such as hover: work inside @apply.', sApplyTw()),
    item('tw-preflight', 'Preflight', 'Preflight', 'Preflight는 Tailwind의 base 레이어에 들어 있는 초기화 CSS예요. 여백·제목 크기·목록 기호를 지워서 모든 모양을 유틸리티로 명시하게 만들어요.', 'modern-normalize를 바탕으로 모든 요소의 margin과 padding을 0으로, box-sizing을 border-box로 바꿔요. h1~h6은 본문과 같은 크기와 굵기가 되어, 제목 모양은 text-2xl font-bold처럼 직접 정해요. ul·ol의 글머리표가 사라지므로 필요하면 list-disc를 달고, Safari VoiceOver가 목록으로 읽도록 role="list"를 고려해요. img·video는 display:block에 max-width:100%가 되어 부모를 넘지 않아요. 테두리는 border-style: solid, width 0으로 초기화되어 border 클래스 하나만 달아도 실선이 보이고, v4에서는 기본색이 currentColor예요. 기존 CSS와 섞어야 하면 @import로 theme와 utilities 레이어만 불러와 Preflight를 뺄 수 있어요.', 'Preflight is the reset in Tailwind’s base layer, removing margins, heading sizes and list bullets so every visual choice is made explicitly with utilities.', 'Built on modern-normalize, it sets every element’s margin and padding to 0 and box-sizing to border-box. h1 to h6 inherit body size and weight, so headings are styled explicitly, as with text-2xl font-bold. ul and ol lose their bullets; add list-disc when needed, and consider role="list" so Safari VoiceOver still announces a list. img and video become display: block with max-width: 100%, never overflowing their parent. Borders reset to solid with zero width, so a bare border class draws a line, and in v4 the default color is currentColor. To mix with legacy CSS, import only the theme and utilities layers and leave Preflight out.', sPreflight()),
    item('tw-plugins', '플러그인과 소스 지정', 'Plugins and sources', '@plugin으로 typography·forms 같은 플러그인을, @source로 스캔할 경로를, @config로 v3 설정 파일을 CSS에서 불러와요.', '@plugin "@tailwindcss/typography";는 마크다운 글 전체를 보기 좋게 꾸미는 prose 클래스를 줘요. @tailwindcss/forms는 input, select, checkbox의 브라우저 기본 모양을 초기화해 유틸리티로 꾸미기 쉽게 해요. 자동 감지는 프로젝트 소스를 찾지만 node_modules 안의 UI 패키지는 @source "../node_modules/@acme/ui";로 추가해야 해요. v4.1부터 @source not으로 경로를 빼고, @source inline("…")으로 항상 생성할 클래스(예전의 safelist)를 지정해요. @config "./tailwind.config.js";는 v3의 JS 설정을 불러와 점진적으로 옮길 수 있게 해 줘요. 대부분의 확장은 @utility와 @theme로 충분하니 플러그인은 꼭 필요할 때만 더해요.', 'From CSS, @plugin loads plugins such as typography and forms, @source sets paths to scan, and @config loads a v3 config file.', '@plugin "@tailwindcss/typography"; adds the prose class that styles whole markdown articles. @tailwindcss/forms resets native input, select and checkbox styles so utilities can style them. Automatic detection finds project sources, but UI packages inside node_modules need @source "../node_modules/@acme/ui";. Since v4.1, @source not excludes paths, and @source inline("…") lists classes to always generate, the old safelist. @config "./tailwind.config.js"; loads a v3 JS config, enabling gradual migration. @utility and @theme cover most extensions, so add plugins only when truly needed.', sPluginsTw()),
    item('tw-v4', 'v3에서 v4로', 'From v3 to v4', 'v4는 설정을 CSS로, 엔진을 Rust로 바꾼 큰 개편이에요. 일부 유틸리티 이름과 문법이 바뀌었고 npx @tailwindcss/upgrade가 대부분을 자동으로 옮겨 줘요.', '설정은 tailwind.config.js에서 CSS의 @theme로, 콘텐츠 경로는 자동 감지로, 레이어는 흉내에서 네이티브 @layer로, 색은 rgb에서 oklch로 바뀌었어요. 크기 이름이 한 단계씩 밀려 shadow-sm은 shadow-xs, shadow는 shadow-sm, rounded는 rounded-sm이 됐고, outline-none은 outline-hidden이 됐어요. ring의 기본 두께는 3px에서 1px로, border와 ring의 기본색은 currentColor로 바뀌었어요. bg-opacity-* 같은 투명도 유틸리티는 bg-black/50 형식으로 통일되고, important 표시는 font-bold!처럼 끝에 붙여요. CSS 변수는 bg-(--brand)처럼 괄호로 쓰고, 변형은 왼쪽부터 적용돼요. Safari 16.4+, Chrome 111+, Firefox 128+ 같은 최신 브라우저가 필요해서, 오래된 브라우저를 지원해야 하면 v3.4에 머물러요.', 'v4 is a major rewrite moving configuration into CSS and the engine to Rust; some utility names and syntax changed, and npx @tailwindcss/upgrade migrates most of it automatically.', 'Configuration moved from tailwind.config.js to @theme in CSS, content paths to automatic detection, emulated layers to native @layer, and colors from rgb to oklch. Size names shifted a step: shadow-sm became shadow-xs, shadow became shadow-sm, rounded became rounded-sm, and outline-none became outline-hidden. The default ring width dropped from 3px to 1px, and border and ring now default to currentColor. Opacity utilities such as bg-opacity-* gave way to the bg-black/50 modifier, and the important mark goes at the end, as in font-bold!. CSS variables use parentheses, as in bg-(--brand), and variants apply left to right. Modern browsers are required (Safari 16.4+, Chrome 111+, Firefox 128+), so projects supporting older browsers stay on v3.4.', sV4())
  ]),
  sec('tw-patterns', '실무 패턴', 'Patterns', '실무 패턴과 도구', 'Patterns and tooling', '반복을 컴포넌트로 다루고, cn()과 cva로 클래스를 조합하고, shadcn/ui 방식과 접근성, 도구, 다른 스타일링 방식과의 비교까지예요.', 'Handling repetition with components, composing classes with cn() and cva, the shadcn/ui approach, accessibility, tooling, and comparisons with other styling methods.', [
    item('tw-components', '컴포넌트로 반복 줄이기', 'Reducing repetition with components', '같은 클래스 묶음이 여러 곳에 반복되면 @apply보다 먼저 React·Vue 컴포넌트로 추출해요. 컴포넌트 이름이 클래스 이름의 역할을 해요.', '버튼 클래스를 화면마다 복사해 두면 디자인이 바뀔 때 모든 복사본을 찾아 고쳐야 해요. Button 컴포넌트로 감싸면 클래스는 한 곳에만 있고, 화면들은 Button을 써요. map 같은 반복문 안의 클래스는 실제로는 한 번만 적은 거라 추출이 필요 없어요. 몇 줄 안 되는 반복은 에디터의 다중 커서 편집으로도 충분해요. 컴포넌트가 variant, size 같은 props를 받아 클래스 조합을 바꾸게 하면 디자인 시스템의 기본 단위가 돼요. 이 흐름에서 cn()과 cva가 자연스럽게 등장해요.', 'When the same class list repeats, extract a React or Vue component before reaching for @apply; the component name takes the role of a class name.', 'Copying button classes onto every screen means hunting down every copy when the design changes. A Button component keeps the classes in one place while screens use Button. Classes inside a loop such as map are written only once, so they need no extraction. A few lines of repetition are fine to handle with multi-cursor editing. Letting components take props such as variant and size to switch class combinations makes them the basic units of a design system. This is where cn() and cva naturally come in.', sComponentsTw()),
    item('tw-cn', 'cn()과 tailwind-merge', 'cn() and tailwind-merge', 'clsx로 조건부 클래스를 만들고 tailwind-merge로 px-4와 px-2 같은 충돌을 마지막 값으로 정리하는 cn() 헬퍼가 사실상 표준이에요.', '문자열을 그냥 이어 붙이면 "px-4 px-2"처럼 충돌하는 클래스가 둘 다 남고, 어느 쪽이 이길지는 CSS 안의 순서가 정해서 예측하기 어려워요. clsx는 isActive && "bg-sky-600"이나 { "opacity-50": disabled }처럼 조건에 맞는 것만 남겨 문자열을 만들어요. tailwind-merge는 Tailwind 클래스의 의미를 알아서 같은 속성을 건드리는 클래스 중 뒤에 온 것만 남겨요. px-4와 p-2처럼 범위가 겹치는 경우도 이해해요. const cn = (...v) => twMerge(clsx(v))로 묶고, 컴포넌트가 cn(기본 클래스, className)으로 합치면 쓰는 쪽에서 안전하게 덮어쓸 수 있어요. @theme로 만든 커스텀 크기나 색은 tailwind-merge 설정에 알려줘야 정확히 합쳐져요.', 'The cn() helper, clsx for conditional classes plus tailwind-merge to resolve conflicts such as px-4 versus px-2 to the last value, is the de facto standard.', 'Plain concatenation keeps conflicting classes such as "px-4 px-2", and which one wins depends on the order inside the CSS, which is hard to predict. clsx keeps only what matches, as in isActive && "bg-sky-600" or { "opacity-50": disabled }, and returns a string. tailwind-merge understands Tailwind classes and keeps only the last class touching the same property, including overlaps such as px-4 and p-2. Combine them as const cn = (...v) => twMerge(clsx(v)), and when components merge cn(baseClasses, className), callers can override safely. Custom sizes or colors from @theme must be registered in tailwind-merge’s config to merge correctly.', sCnTw()),
    item('tw-cva', 'cva로 변형 관리', 'Managing variants with cva', 'cva(class-variance-authority)는 기본 클래스, variants(축별 값), defaultVariants를 선언하면 조합에 맞는 클래스 문자열을 돌려줘요. TypeScript 타입도 자동으로 생겨요.', 'cva("rounded-lg font-medium", { variants: { intent: {...}, size: {...} } })처럼 공통 클래스와 변형 축을 선언해요. button({ intent: "ghost", size: "lg" })를 부르면 기본 클래스와 각 축의 클래스가 합쳐진 문자열이 나와요. defaultVariants는 props를 생략했을 때의 값이고, compoundVariants는 “primary이면서 lg일 때”처럼 조합 전용 클래스를 줘요. VariantProps<typeof button>로 props 타입을 뽑으면 허용되지 않는 값이 컴파일 단계에서 걸려요. 결과를 cn()으로 className과 합치면 외부 덮어쓰기도 안전해요. 슬롯과 병합을 기본 지원하는 tailwind-variants도 비슷한 대안이에요.', 'cva (class-variance-authority) takes base classes, variants per axis and defaultVariants, and returns the class string for any combination, with TypeScript types generated automatically.', 'Declare shared classes and variant axes, as in cva("rounded-lg font-medium", { variants: { intent: {...}, size: {...} } }). Calling button({ intent: "ghost", size: "lg" }) returns the base classes merged with each axis’s classes. defaultVariants supply values when props are omitted, and compoundVariants add classes for combinations such as primary plus lg. Extracting props with VariantProps<typeof button> catches disallowed values at compile time. Merging the result with className through cn() keeps outside overrides safe. tailwind-variants is a similar alternative with built-in slots and merging.', sCvaTw()),
    item('tw-shadcn', 'shadcn/ui 방식', 'The shadcn/ui approach', 'shadcn/ui는 CLI로 컴포넌트 소스를 내 프로젝트에 복사해 소유하는 방식이에요. 접근성 프리미티브 위에 Tailwind, cva, CSS 변수 토큰을 얹었어요.', 'npx shadcn@latest add button을 실행하면 components/ui/button.tsx가 생기고, 그때부터는 내 코드라 마음대로 고쳐요. --primary, --background, --muted 같은 의미 중심 토큰을 :root와 .dark에 서로 다른 oklch 값으로 정의해요. @theme inline이 이 변수를 Tailwind 색으로 연결해서 bg-primary, text-muted-foreground 하나로 라이트·다크를 모두 처리해요. 내부는 Radix 같은 헤드리스 접근성 프리미티브, Tailwind 클래스, cva 변형, cn() 병합의 조합이에요. 패키지 업데이트가 자동으로 오지 않는 대신 의존성 충돌이 없고, 토큰만 바꿔 브랜드 테마를 입혀요. 디자인 시스템을 처음부터 만들기보다 출발점으로 쓰기 좋아요.', 'shadcn/ui copies component source into your project through a CLI so you own it, layering Tailwind, cva and CSS variable tokens over accessible primitives.', 'Running npx shadcn@latest add button creates components/ui/button.tsx, which from then on is your code to change. Semantic tokens such as --primary, --background and --muted get different oklch values on :root and .dark. @theme inline maps these variables to Tailwind colors, so a single bg-primary or text-muted-foreground covers light and dark. Inside, it combines headless accessible primitives such as Radix, Tailwind classes, cva variants and cn() merging. Updates do not arrive automatically, but there are no dependency conflicts, and brand themes come from changing tokens. It works well as a starting point instead of building a design system from scratch.', sShadcn()),
    item('tw-a11y', '접근성 유틸리티', 'Accessibility utilities', 'sr-only(화면엔 숨기고 읽어 주기), focus-visible:(키보드 초점), motion-safe/reduce:(동작 줄이기), contrast-more:(고대비)로 다양한 사용자를 배려해요.', '아이콘만 있는 버튼은 aria-label로 이름을 주고, 아이콘에는 aria-hidden="true"를 달아요. 숫자 배지처럼 눈으로만 알 수 있는 정보는 sr-only 글로 함께 적어 스크린 리더가 읽게 해요. focus-visible:outline-2 focus-visible:outline-sky-500으로 키보드 초점을 분명히 보여주고, 초점 표시를 지우기만 하는 outline-hidden은 대체 표시 없이 쓰지 않아요. motion-safe:와 motion-reduce:로 동작 줄이기 설정을, contrast-more:와 forced-colors:로 고대비 설정을 존중해요. Tailwind는 스타일 도구일 뿐이라 button은 button으로, 제목은 h 태그로 쓰는 의미 있는 HTML이 먼저예요. 색 대비는 팔레트 단계 차이를 크게 두면 쉽게 맞아요.', 'sr-only (hidden but read aloud), focus-visible: (keyboard focus), motion-safe/reduce: (reduced motion) and contrast-more: (high contrast) accommodate a wide range of users.', 'Icon-only buttons get a name through aria-label, and the icon itself gets aria-hidden="true". Visual-only information, such as a count badge, gets sr-only text so screen readers announce it. focus-visible:outline-2 focus-visible:outline-sky-500 makes keyboard focus obvious, and outline-hidden should never remove focus without a replacement. motion-safe: and motion-reduce: respect reduced-motion settings, and contrast-more: and forced-colors: respect high-contrast settings. Tailwind is only a styling tool, so semantic HTML comes first: a button is a button and headings use heading tags. Color contrast is easy to meet with large shade differences.', sA11yTw()),
    item('tw-tooling', '도구와 클래스 정렬', 'Tooling and class sorting', 'VS Code의 Tailwind CSS IntelliSense는 자동 완성·색 미리보기·충돌 경고를, prettier-plugin-tailwindcss는 클래스 순서를 자동으로 정렬해 줘요.', '클래스 순서가 사람마다 다르면 같은 요소도 읽기 어렵고, 코드 리뷰에서 무엇이 바뀌었는지 잘 보이지 않아요. Prettier 플러그인은 저장할 때 레이아웃, 박스, 색, 글자, 변형처럼 Tailwind가 CSS를 출력하는 순서에 맞춰 클래스를 정렬해요. IntelliSense는 클래스를 입력할 때 후보와 색 견본을 보여주고, 마우스를 올리면 생성될 CSS를 보여주며, p-4와 px-2처럼 충돌하는 클래스를 경고해요. 두 도구 모두 cn(), cva() 같은 함수 안의 문자열도 처리하도록 설정할 수 있어요. 클래스 목록이 한 화면을 넘을 만큼 길어지면 줄을 나누거나 컴포넌트로 추출하라는 신호예요. ESLint 플러그인으로 존재하지 않는 클래스를 잡기도 해요.', 'Tailwind CSS IntelliSense for VS Code provides autocomplete, color previews and conflict warnings, and prettier-plugin-tailwindcss sorts classes automatically.', 'When class order varies by author, the same element is hard to read and code review struggles to show what changed. The Prettier plugin sorts classes on save to match the order Tailwind emits CSS, roughly layout, box, color, text and then variants. IntelliSense suggests classes with color swatches while typing, shows generated CSS on hover and warns about conflicts such as p-4 with px-2. Both tools can be configured to handle strings inside functions such as cn() and cva(). A class list longer than a screen is a signal to split lines or extract a component. ESLint plugins can also catch classes that do not exist.', sToolingTw()),
    item('tw-compare', '스타일링 방식 비교', 'Comparing styling approaches', 'Tailwind, CSS Modules, CSS-in-JS, 일반 CSS + BEM은 각자 장단점이 있어요. 팀 규모, 디자인 시스템, 서버 컴포넌트 사용 여부에 맞춰 골라요.', 'Tailwind는 작성이 빠르고 토큰이 일관되며 결과 CSS가 작지만, 마크업이 길어지고 문법을 익혀야 해요. CSS Modules는 진짜 CSS를 쓰면서 클래스 이름을 파일 단위로 격리하지만, 파일을 오가고 토큰을 직접 관리해야 해요. styled-components 같은 런타임 CSS-in-JS는 props로 동적 스타일을 주기 편하지만 실행 중 스타일 계산 비용이 있고 React 서버 컴포넌트와 잘 맞지 않아서, vanilla-extract·Panda CSS 같은 빌드 타임 방식으로 옮겨 가는 추세예요. 일반 CSS + BEM은 도구가 필요 없고 누구나 알지만 이름 짓기와 쌓이는 CSS를 사람이 관리해야 해요. 여러 방식을 함께 쓸 수도 있고, 어떤 방식이든 디자인 토큰을 한 곳에 두는 게 핵심이에요.', 'Tailwind, CSS Modules, CSS-in-JS and plain CSS with BEM each have trade-offs; choose by team size, design system and whether server components are in play.', 'Tailwind is fast to write, keeps tokens consistent and produces small CSS, but markup grows long and there is syntax to learn. CSS Modules keep real CSS while scoping class names per file, at the cost of file switching and self-managed tokens. Runtime CSS-in-JS such as styled-components makes prop-driven styles easy but computes styles at run time and fits poorly with React server components, so teams are moving to build-time tools such as vanilla-extract and Panda CSS. Plain CSS with BEM needs no tooling and is universally known, but people must manage naming and growing stylesheets. Approaches can be mixed, and whichever you choose, keeping design tokens in one place is what matters.', sCompareTw())
  ])
], add: {} };
})();

window.UX = page([
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
})();
