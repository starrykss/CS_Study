(() => {
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
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: o.html || '', cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'pr-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R + .3, F.Y(Math.max(F.y0, 0)) - .35, xl, 'cz-mono pr-xs', st); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono pr-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c pr-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ================= basics ================= */
function sSample() {
  const S = scene({ id: 'pr-sample', steps: 5, per: 1.35 });
  S.el('S', { x: 2, y: 2.4, w: 18, h: 15, css: 'border:.16em solid var(--ink-2);border-radius:.6em' }); T(S, 'Sl', 2.6, 2.8, ['표본공간 S', 'sample space S'], 'pr-s');
  ring(S, 'A', 8.6, 10, 4.6, 'accent', 2, { w: .16, fill: tint('accent', 30) }); ring(S, 'B', 13.4, 10, 4.6, 'warn', 3, { w: .16, fill: 'color-mix(in srgb,var(--warn) 30%,transparent)', css: 'z-index:2' });
  T(S, 'Al', 5.4, 9.4, 'A', 'cz-mono pr-big pr-a', 2); T(S, 'Bl', 15.6, 9.4, 'B', 'cz-mono pr-big pr-w', 3); T(S, 'ABl', 10, 9.6, 'A∩B', 'cz-tc cz-mono pr-s', 4, { w: 2 });
  T(S, 'e1', 21.6, 2.4, ['시행의 모든 결과 = S', 'all outcomes = S'], 'pr-s', 1);
  T(S, 'e2', 21.6, 4.2, 'P(A) = 0.5', 'cz-mono pr-l pr-a', 2); T(S, 'e3', 21.6, 5.8, 'P(B) = 0.4', 'cz-mono pr-l pr-w', 3);
  T(S, 'e4', 21.6, 7.4, 'P(A∩B) = 0.2', 'cz-mono pr-l', 4); T(S, 'e5', 21.6, 9.4, 'P(A∪B)', 'cz-mono pr-l', 4); T(S, 'e6', 21.6, 10.8, '= 0.5 + 0.4 − 0.2 = 0.7', 'cz-mono pr-s pr-g', 4);
  T(S, 'e7', 21.6, 13, '0 ≤ P(A) ≤ 1, P(S) = 1', 'cz-mono pr-xs', 5); T(S, 'e8', 21.6, 14.4, 'P(Aᶜ) = 1 − P(A)', 'cz-mono pr-xs', 5); T(S, 'e9', 21.6, 15.8, ['배반: P(A∪B) = P(A) + P(B)', 'disjoint: P(A∪B) = P(A) + P(B)'], 'pr-xs', 5);
  S.cap(1, '일어날 수 있는 모든 결과의 집합이 표본공간', 'The set of every possible outcome is the sample space')
    .cap(2, '사건 A는 그 부분집합이에요', 'An event A is a subset of it')
    .cap(3, '사건 B와 겹치는 부분이 있으면', 'If B overlaps A')
    .cap(4, '합집합의 확률에서 겹친 부분을 한 번 빼요', 'subtract the overlap once for the union')
    .cap(5, '콜모고로프의 세 공리에서 모든 성질이 나와요', 'Everything follows from Kolmogorov’s three axioms');
  return S;
}
function diceGrid(S, k, X, Y, cw, fn) { for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) { const key = `${k}${a}${b}`; cell(S, key, X + (b - 1) * cw, Y + (a - 1) * cw, cw - .16, cw - .16, String(a + b), 'line', 60, 0); if (fn) fn(key, a, b); }
  for (let i = 1; i <= 6; i++) { T(S, `${k}r${i}`, X - 1.2, Y + (i - 1) * cw + cw / 2 - .5, String(i), 'cz-mono pr-xs'); T(S, `${k}c${i}`, X + (i - 1) * cw + cw / 2 - .3, Y - 1.2, String(i), 'cz-mono pr-xs'); } }
function sCond() {
  const S = scene({ id: 'pr-cond', steps: 5, per: 1.35 });
  diceGrid(S, 'g', 3.4, 3.4, 2.1, (key, a, b) => { const B = a + b >= 9, A = a === 6; if (B) tsets(S, key, [[2, 'warn', 45]]); else S.set(key, 2, { opacity: '.25' }); if (A && B) tsets(S, key, [[3, 'accent', 55]]); });
  T(S, 'ax', 1, 1.2, ['행: 첫째 주사위 · 열: 둘째 · 칸: 합', 'rows: first die · columns: second · cell: sum'], 'pr-xs');
  T(S, 'e1', 18, 3.4, ['B: 합 ≥ 9 (10칸)', 'B: sum ≥ 9 (10 cells)'], 'pr-l pr-w', 2);
  T(S, 'e2', 18, 5.2, ['A: 첫째 = 6', 'A: first die = 6'], 'pr-l pr-a', 3); T(S, 'e3', 18, 6.8, ['A∩B: 4칸', 'A∩B: 4 cells'], 'pr-s pr-a', 3);
  T(S, 'e4', 18, 8.8, 'P(A|B) = 4/10 = 0.4', 'cz-mono pr-l', 4); T(S, 'e5', 18, 10.4, ['P(A) = 1/6 ≈ 0.17보다 커요', 'vs P(A) = 1/6 ≈ 0.17'], 'pr-s', 4);
  T(S, 'e6', 18, 12.8, 'P(A|B) = P(A∩B) / P(B)', 'cz-mono pr-l pr-g', 5); T(S, 'e7', 18, 14.4, 'P(A∩B) = P(B) P(A|B)', 'cz-mono pr-s', 5);
  S.cap(1, '주사위 두 개를 던진 36가지 결과', 'The 36 outcomes of rolling two dice')
    .cap(2, 'B가 일어났다는 정보를 알면 표본공간이 B로 줄어요', 'Knowing B happened shrinks the sample space to B')
    .cap(3, '그 안에서 A인 결과를 세면', 'Count the outcomes in A inside it')
    .cap(4, 'B 안에서 A의 비율이 조건부 확률', 'The share of B that is also A is the conditional probability')
    .cap(5, '곱셈 법칙으로 동시 확률도 구해요', 'The multiplication rule gives joint probabilities');
  return S;
}
function sIndep() {
  const S = scene({ id: 'pr-indep', steps: 5, per: 1.35 });
  diceGrid(S, 'g', 3.4, 3.4, 2.1, (key, a, b) => { const A = a % 2 === 0, B = b <= 2; if (A) tsets(S, key, [[1, 'accent', 30]]); if (B) tsets(S, key, [[2, A ? 'accent' : 'warn', A ? 30 : 40]]); if (A && B) tsets(S, key, [[3, 'ok', 60]]); });
  T(S, 'e1', 18, 3.4, ['A: 첫째가 짝수 (18칸)', 'A: first die even (18)'], 'pr-l pr-a', 1);
  T(S, 'e2', 18, 5.2, ['B: 둘째 ≤ 2 (12칸)', 'B: second ≤ 2 (12)'], 'pr-l pr-w', 2);
  T(S, 'e3', 18, 7.2, ['A∩B: 6칸', 'A∩B: 6 cells'], 'pr-l pr-g', 3); T(S, 'e4', 18, 8.8, '6/36 = (18/36)(12/36)', 'cz-mono pr-s', 3);
  T(S, 'e5', 18, 11, 'P(A∩B) = P(A)P(B)', 'cz-mono pr-l', 4); T(S, 'e6', 18, 12.6, '⟺ P(A|B) = P(A)', 'cz-mono pr-s', 4);
  T(S, 'e7', 18, 14.8, ['배반 ≠ 독립', 'disjoint ≠ independent'], 'pr-l pr-r', 5); T(S, 'e8', 18, 16.4, ['배반이면 한쪽이 다른 쪽을 막아요', 'disjoint events block each other'], 'pr-xs', 5);
  S.cap(1, '첫째 주사위가 짝수인 사건 A', 'Event A: the first die is even')
    .cap(2, '둘째 주사위가 2 이하인 사건 B', 'Event B: the second die is at most 2')
    .cap(3, '겹치는 칸이 정확히 확률의 곱만큼', 'The overlap is exactly the product of the probabilities')
    .cap(4, '한 사건이 다른 사건의 확률을 바꾸지 않으면 독립', 'Independent: one event doesn’t change the other’s chance')
    .cap(5, '서로 배반인 사건은 오히려 강하게 종속이에요', 'Mutually exclusive events are strongly dependent');
  return S;
}
function sTree() {
  const S = scene({ id: 'pr-tree', steps: 5, per: 1.35 });
  const N = (k, x, y, label, c, st) => cell(S, k, x - 2.2, y - .9, 4.4, 1.8, label, c, 35, st);
  N('r', 3.4, 10.4, ['제품', 'item'], 'line', 0);
  [[6, 'A', .6, 'accent', [[3.4, .02, 'danger', ['불량', 'defect']], [8.6, .98, 'ok', ['정상', 'ok']]]], [14.8, 'B', .4, 'warn', [[12.2, .05, 'danger', ['불량', 'defect']], [17.4, .95, 'ok', ['정상', 'ok']]]]].forEach(([y, m, p, c, ch], i) => {
    seg(S, 'e' + i, [5.6, 10.4], [10, y], 1, 'ink-3', .12); T(S, 'p' + i, 6.4, (10.4 + y) / 2 - (i ? -.2 : 1.1), String(p), 'cz-mono pr-xs', 1); N('m' + i, 12.2, y, ['기계 ' + m, 'machine ' + m], c, 1);
    ch.forEach(([yy, q, cc, lab], j) => { seg(S, `f${i}${j}`, [14.4, y], [18.8, yy], 2, 'ink-3', .1); T(S, `q${i}${j}`, 15.4, (y + yy) / 2 - .9, String(q), 'cz-mono pr-xs', 2);
      N(`l${i}${j}`, 21, yy, lab, cc, 2); T(S, `pp${i}${j}`, 23.8, yy - .45, `${p} × ${q} = ${+(p * q).toFixed(3)}`, 'cz-mono pr-xs' + (j ? '' : ' pr-r'), 3); }); });
  T(S, 's1', 1, 19.2, ['P(불량) = 0.012 + 0.020 = 0.032', 'P(defect) = 0.012 + 0.020 = 0.032'], 'cz-mono pr-l pr-r', 4);
  T(S, 's2', 17, 19.2, ['P(B | 불량) = 0.020 / 0.032 = 0.625', 'P(B | defect) = 0.020 / 0.032 = 0.625'], 'cz-mono pr-s', 5);
  S.cap(1, '기계 A가 60%, B가 40%를 생산하고', 'Machine A makes 60% of items, B makes 40%')
    .cap(2, '불량률은 A 2%, B 5%', 'with defect rates of 2% and 5%')
    .cap(3, '가지를 따라 확률을 곱하면 각 경로의 확률', 'Multiply along each branch for its probability')
    .cap(4, '불량으로 끝나는 경로를 더하면 전확률', 'Add the paths ending in a defect: total probability')
    .cap(5, '거꾸로, 불량품이 B에서 왔을 확률은 베이즈 정리로', 'Reversing it, Bayes gives the chance a defect came from B');
  return S;
}
function sBayes() {
  const S = scene({ id: 'pr-bayes', steps: 5, per: 1.35 });
  const N = (k, x, y, label, c, st) => cell(S, k, x, y, 5.6, 1.8, label, c, 35, st);
  N('r', 1, 9.6, ['1000명', '1000 people'], 'line', 0);
  N('d', 8, 4.4, ['환자 10', 'sick 10'], 'danger', 1); N('h', 8, 14.8, ['건강 990', 'healthy 990'], 'ok', 1);
  seg(S, 'e1', [6.6, 10.5], [8, 5.3], 1, 'ink-3', .1); seg(S, 'e2', [6.6, 10.5], [8, 15.7], 1, 'ink-3', .1);
  T(S, 't1', 7.6, 6.6, ['양성 99% → 약 10', 'test + 99% → ~10'], 'pr-xs pr-r', 2); T(S, 't2', 7.6, 12.8, ['양성 5% → 약 50', 'test + 5% → ~50'], 'pr-xs', 2);
  for (let i = 0; i < 60; i++) { const x = 16.4 + (i % 10) * 1.4, y = 3.6 + Math.floor(i / 10) * 1.4; pt(S, 'p' + i, x, y, 2, i < 10 ? C.badf : { background: tint('ink-3', 60), 'border-color': 'var(--ink-3)' }, .45); if (i >= 10) S.set('p' + i, 3, { opacity: '.35' }); }
  T(S, 'pl', 16, 1.6, ['양성 판정 약 60명', '~60 positive results'], 'pr-s', 2);
  T(S, 'r1', 16, 12.4, ['그중 실제 환자는 10명뿐', 'only 10 are actually sick'], 'pr-l pr-r', 3);
  T(S, 'f1', 16, 14.6, 'P(D|+) = P(+|D)P(D) / P(+)', 'cz-mono pr-s', 4); T(S, 'f2', 16, 16, '= 0.0099 / 0.0594 ≈ 16.7%', 'cz-mono pr-l pr-g', 4);
  T(S, 'f3', 16, 18, ['유병률 10%면 68.8%', 'with 10% prevalence: 68.8%'], 'pr-s', 5);
  S.cap(1, '유병률 1%인 병을 99% 정확한 검사로 찾을 때', 'A disease with 1% prevalence and a 99% sensitive test')
    .cap(2, '건강한 990명 중 5%도 양성이 나와요', '5% of the 990 healthy people also test positive')
    .cap(3, '양성 60명 중 진짜 환자는 10명', 'Of about 60 positives, only 10 are sick')
    .cap(4, '양성일 때 실제 환자일 확률은 약 17%', 'So a positive result means about a 17% chance of disease')
    .cap(5, '사전확률(유병률)이 결과를 크게 바꿔요', 'The prior (prevalence) changes the answer dramatically');
  return S;
}

/* ================= distributions ================= */
function sPmf() {
  const S = scene({ id: 'pr-pmf', steps: 5, per: 1.35 });
  const F = fr(1, 13, 0, .19, 2.4, 21, 3, 17.4), xs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ps = xs.map(x => (6 - Math.abs(x - 7)) / 36);
  ax2(S, 'ga', F, '', 'P(X = x)');
  bars(S, 'b', F, xs, ps, { st: 2, color: (i, x) => x === 7 ? 'danger' : x <= 4 ? 'warn' : 'accent', pct: 50 });
  xs.forEach(x => T(S, 'x' + x, F.X(x) - .8, F.B + .3, String(x), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  T(S, 'e0', 22.6, 2.4, ['X = 두 주사위의 합', 'X = sum of two dice'], 'pr-l', 1);
  T(S, 'e1', 22.6, 4.6, 'P(X = x) = (6 − |x − 7|)/36', 'cz-mono pr-xs', 2);
  T(S, 'e2', 22.6, 6.6, 'P(X = 7) = 6/36', 'cz-mono pr-l pr-r', 3);
  T(S, 'e3', 22.6, 8.6, 'P(X ≤ 4) = 6/36', 'cz-mono pr-l pr-w', 4); T(S, 'e4', 22.6, 10, ['= F(4) (누적분포)', '= F(4), the CDF'], 'pr-xs', 4);
  T(S, 'e5', 22.6, 12.4, 'Σ P(X = x) = 1', 'cz-mono pr-l pr-g', 5);
  S.cap(1, '결과에 숫자를 붙인 것이 확률변수', 'A random variable assigns a number to each outcome')
    .cap(2, '각 값의 확률을 나열한 것이 확률질량함수', 'Listing each value’s probability gives the PMF')
    .cap(3, '7이 나올 방법이 6가지로 가장 많아요', 'Seven has the most ways: six')
    .cap(4, '누적분포함수 F(x) = P(X ≤ x)', 'The CDF F(x) = P(X ≤ x)')
    .cap(5, '모든 확률을 더하면 1', 'All the probabilities add up to 1');
  return S;
}
function sExpect() {
  const S = scene({ id: 'pr-expect', steps: 5, per: 1.35 });
  const F = fr(0, 7, 0, .3, 2.4, 20, 3, 13);
  hl(S, 'beam', F.X(.4), F.X(6.6), F.Y(0), 'ink-2', 0, { w: .22 });
  bars(S, 'b', F, [1, 2, 3, 4, 5, 6], [1, 1, 1, 1, 1, 1].map(v => v / 6), { color: 'accent', pct: 45 });
  [1, 2, 3, 4, 5, 6].forEach(x => T(S, 'x' + x, F.X(x) - .8, F.B + .9, String(x), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  poly2(S, 'ful', [[F.X(3.5), F.B + .1], [F.X(3.5) - .9, F.B + 1.6], [F.X(3.5) + .9, F.B + 1.6]], tint('danger', 70), 2);
  T(S, 'mu', F.X(3.5) - 2, F.B + 1.9, 'μ = 3.5', 'cz-tc cz-mono pr-s pr-r', 2, { w: 4 });
  [1, 2, 3, 4, 5, 6].forEach((x, i) => ar(S, 'd' + x, [F.X(3.5), 15.6 + i * .5], [F.X(x), 15.6 + i * .5], x < 3.5 ? 'warn' : 'ok', 3, { h: .1 }));
  T(S, 'e1', 21.6, 2.4, 'E[X] = Σ x·p(x)', 'cz-mono pr-l', 1); T(S, 'e2', 21.6, 3.9, '= (1+…+6)/6 = 3.5', 'cz-mono pr-s', 1);
  T(S, 'e3', 21.6, 6, ['무게중심 = 기댓값', 'balance point = mean'], 'pr-s pr-r', 2);
  T(S, 'e4', 21.6, 8, 'Var = E[(X − μ)²]', 'cz-mono pr-l', 3); T(S, 'e5', 21.6, 9.5, '= E[X²] − μ² = 35/12', 'cz-mono pr-s', 4); T(S, 'e6', 21.6, 10.9, 'σ ≈ 1.71', 'cz-mono pr-s', 4);
  T(S, 'e7', 21.6, 13.2, 'E[aX + b] = aE[X] + b', 'cz-mono pr-xs', 5); T(S, 'e8', 21.6, 14.6, 'Var(aX + b) = a²Var X', 'cz-mono pr-xs', 5); T(S, 'e9', 21.6, 16, ['독립: Var(X+Y) = VarX + VarY', 'indep.: Var(X+Y) = VarX + VarY'], 'pr-xs', 5);
  S.cap(1, '주사위 눈의 확률분포', 'The distribution of one die')
    .cap(2, '막대들이 균형을 이루는 지점이 기댓값', 'The point where it balances is the expected value')
    .cap(3, '평균에서 얼마나 퍼져 있는지가', 'How far values spread from the mean')
    .cap(4, '분산과 표준편차', 'is the variance and standard deviation')
    .cap(5, '기댓값은 선형, 분산은 제곱으로 늘어요', 'Expectation is linear; variance scales with the square');
  return S;
}
function sBinom() {
  const S = scene({ id: 'pr-binom', steps: 5, per: 1.35 });
  const F = fr(-.6, 10.6, 0, .32, 2.4, 20, 3.4, 17), ks = [...Array(11).keys()], pm = p => ks.map(k => C2(10, k) * p ** k * (1 - p) ** (10 - k));
  ax2(S, 'ga', F, 'k', 'P(X = k)');
  for (let i = 0; i < 10; i++) T(S, 'c' + i, 2.6 + i * 1.6, 1.4, i === 2 || i === 5 || i === 7 ? 'H' : 'T', 'cz-tc cz-mono pr-s ' + (i === 2 || i === 5 || i === 7 ? 'pr-a' : ''), 1, { w: 1.4, off: 2 });
  bars(S, 'a', F, ks, pm(.5), { st: 2, off: 3, color: 'accent' }); bars(S, 'b', F, ks, pm(.2), { st: 3, color: 'warn' });
  ks.forEach(k => T(S, 'x' + k, F.X(k) - .8, F.B + .3, String(k), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  vl(S, 'm1', F.X(5), F.T, F.B, 'danger', 2, { dash: 1, w: .1, off: 3 }); vl(S, 'm2', F.X(2), F.T, F.B, 'danger', 3, { dash: 1, w: .1 });
  T(S, 'e0', 21.6, 2.4, ['n번 시행, 성공 확률 p', 'n trials, success p'], 'pr-l');
  L(S, 'e1', 21.6, 4.4, 10, 'cz-mono pr-l', [[2, 'n = 10, p = 0.5'], [3, 'n = 10, p = 0.2']]);
  L(S, 'e2', 21.6, 6, 10, 'cz-mono pr-s pr-r', [[2, 'E = np = 5'], [3, 'E = np = 2']]);
  T(S, 'e3', 21.6, 8.2, 'Var = np(1 − p)', 'cz-mono pr-l', 4);
  T(S, 'e4', 21.6, 10.4, 'P(X=k) = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ', 'cz-mono pr-xs', 5); T(S, 'e5', 21.6, 11.8, 'P(X=3 | 10, ½) = 120/1024', 'cz-mono pr-xs', 5);
  S.cap(1, '동전을 10번 던져 앞면 수를 세면', 'Flip a coin 10 times and count heads')
    .cap(2, '이항분포 B(10, 0.5) · 평균 5에서 가장 높아요', 'Binomial B(10, 0.5) peaks at the mean 5')
    .cap(3, 'p가 작으면 왼쪽으로 치우쳐요', 'A small p skews it to the left')
    .cap(4, '평균 np, 분산 np(1 − p)', 'Mean np, variance np(1 − p)')
    .cap(5, 'k번 성공하는 경우의 수 × 각 경우의 확률', 'Ways to get k successes × probability of each');
  return S;
}
function sGeom() {
  const S = scene({ id: 'pr-geom', steps: 5, per: 1.35 });
  ['✗', '✗', '✗', '✓'].forEach((c, i) => cell(S, 's' + i, 2 + i * 2.6, 1.6, 2.2, 2.2, c, i === 3 ? 'ok' : 'danger', 30, 1));
  T(S, 'sl', 12.8, 2.2, ['첫 6이 4번째에 나옴', 'first six on roll 4'], 'pr-s', 1);
  const F = fr(.3, 15.7, 0, .19, 2.4, 20, 5.6, 17.4), ks = [...Array(15)].map((_, i) => i + 1), p = 1 / 6;
  ax2(S, 'ga', F, 'k', 'P(X = k)');
  bars(S, 'b', F, ks, ks.map(k => (1 - p) ** (k - 1) * p), { st: 2, color: (i, k) => k > 3 ? 'accent' : 'accent', pct: 50 });
  [1, 5, 10, 15].forEach(k => T(S, 'x' + k, F.X(k) - .8, F.B + .3, String(k), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  vl(S, 'mu', F.X(6), F.T, F.B, 'danger', 3, { dash: 1, w: .1 }); T(S, 'mul', F.X(6) + .2, F.T, 'E = 1/p = 6', 'cz-mono pr-xs pr-r', 3);
  rect(S, 'tail', F.X(3.5), F.T, F.R - F.X(3.5), F.B - F.T, 'warn', 14, 4, { r: 0 });
  T(S, 'e1', 21.6, 6, 'P(X = k) = (1−p)ᵏ⁻¹p', 'cz-mono pr-s', 2); T(S, 'e2', 21.6, 7.6, 'p = 1/6', 'cz-mono pr-s', 2);
  T(S, 'e3', 21.6, 9.6, 'E = 1/p, Var = (1−p)/p²', 'cz-mono pr-xs', 3);
  T(S, 'e4', 21.6, 11.8, ['무기억성', 'memoryless'], 'pr-l pr-w', 4); T(S, 'e5', 21.6, 13.4, 'P(X > m+n | X > m)', 'cz-mono pr-xs', 4); T(S, 'e6', 21.6, 14.8, '= P(X > n)', 'cz-mono pr-xs', 4);
  T(S, 'e7', 21.6, 17, ['"이번엔 나오겠지"는 착각', '“it’s due” is a fallacy'], 'pr-s pr-r', 5);
  S.cap(1, '첫 성공이 나올 때까지 몇 번 던지나', 'How many tries until the first success?')
    .cap(2, '기하분포: 매번 같은 비율로 줄어요', 'Geometric distribution: each bar shrinks by the same ratio')
    .cap(3, '평균 1/p번 · 주사위면 6번', 'On average 1/p tries: 6 for a die')
    .cap(4, '이미 3번 실패해도 앞으로의 분포는 처음과 같아요', 'After 3 failures, the future looks exactly the same')
    .cap(5, '독립 시행은 과거를 기억하지 않아요', 'Independent trials have no memory');
  return S;
}
function sPoisson() {
  const S = scene({ id: 'pr-poisson', steps: 5, per: 1.35 });
  hl(S, 'tl', 2, 30, 3.6, 'ink-3', 0, { w: .12 });
  const counts = [2, 4, 3, 1, 5, 3]; let n = 0;
  counts.forEach((c, h) => { vl(S, 'hk' + h, 2 + h * 4.6, 2.8, 4.4, 'ink-3', 0, { w: .1 }); T(S, 'hc' + h, 2 + h * 4.6, 4.6, `${c}`, 'cz-tc cz-mono pr-s pr-a', 1, { w: 4.6 });
    for (let i = 0; i < c; i++) { pt(S, 'ev' + n, 2.4 + h * 4.6 + rnd() * 3.8, 3.6, 0, C.badf, .26); n++; } });
  vl(S, 'hk6', 29.6, 2.8, 4.4, 'ink-3', 0, { w: .1 }); T(S, 'tll', 2, 1.4, ['한 시간에 평균 3건 (무작위 도착)', 'on average 3 arrivals per hour, at random'], 'pr-xs');
  const F = fr(-.6, 10.6, 0, .25, 2.4, 20, 7.6, 18), ks = [...Array(11).keys()], pm = l => ks.map(k => Math.exp(-l) * l ** k / fact(k));
  ax2(S, 'ga', F, 'k', 'P(X = k)');
  bars(S, 'a', F, ks, pm(3), { st: 2, color: 'accent' }); bars(S, 'b', F, ks, pm(1), { st: 3, color: 'warn', pct: 30, off: 4 });
  ks.forEach(k => T(S, 'x' + k, F.X(k) - .8, F.B + .3, String(k), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  T(S, 'e1', 21.6, 7.8, 'P(X=k) = e⁻λλᵏ/k!', 'cz-mono pr-s', 2); T(S, 'e2', 21.6, 9.4, 'λ = 3: P(3) = 0.224', 'cz-mono pr-s pr-a', 2);
  T(S, 'e3', 21.6, 11.2, ['λ = 1 (주황)', 'λ = 1 (orange)'], 'pr-s pr-w', 3, { off: 4 });
  T(S, 'e4', 21.6, 13, 'E = Var = λ', 'cz-mono pr-l', 4);
  T(S, 'e5', 21.6, 15, ['n 크고 p 작으면', 'large n, small p:'], 'pr-xs', 5); T(S, 'e6', 21.6, 16.4, 'B(n, p) ≈ Poisson(np)', 'cz-mono pr-xs', 5);
  S.cap(1, '일정 시간 동안 드물게, 독립적으로 일어나는 사건의 수', 'Counts of rare, independent events in a fixed interval')
    .cap(2, '포아송 분포 · 평균 λ = 3', 'follow a Poisson distribution with mean λ = 3')
    .cap(3, 'λ가 작으면 0과 1에 몰려요', 'A small λ piles up near 0 and 1')
    .cap(4, '평균과 분산이 모두 λ', 'Mean and variance both equal λ')
    .cap(5, '서버 요청 수, 오타 수, 콜센터 전화 수 모델링', 'Models server requests, typos and call-center traffic');
  return S;
}
function sPdf() {
  const S = scene({ id: 'pr-pdf', steps: 5, per: 1.35 });
  const F = fr(-.2, 2.3, 0, 1.15, 2.4, 19, 2.6, 11), G = fr(-.2, 2.3, 0, 1.15, 2.4, 19, 12.6, 19.4), f = x => x >= 0 && x <= 2 ? x / 2 : 0;
  ax2(S, 'fa', F, 'x', 'f(x)');
  for (let i = 0; i < 10; i++) { const a = i * .2, h = (a + .1) / 2 * (.85 + .3 * rnd()); rect(S, 'h' + i, F.X(a) + .04, F.Y(h), F.X(.2) - F.X(0) - .08, F.Y(0) - F.Y(h), 'ink-3', 45, 1, { off: 2, r: .06 }); }
  shade(S, 'ar', F, f, 1, 2, 'ok', 45, 3);
  mplot(S, 'fc', F, x => [x, f(x)], 0, 2, { st: 2, n: 4, color: 'accent', h: .2 }); mline(S, 'fd', F, [2, 1], [2, 0], { st: 2, color: 'accent', h: .14 });
  ax2(S, 'ga', G, 'x', 'F(x)', 4); mplot(S, 'Fc', G, x => [x, x < 0 ? 0 : x > 2 ? 1 : x * x / 4], -.2, 2.3, { st: 4, n: 30, color: 'warn', h: .2 });
  mline(S, 'g1', G, [1, .25], [2, .25], { st: 4, color: 'ink-3', h: .08, dash: 1 }); mline(S, 'g2', G, [2, .25], [2, 1], { st: 4, color: 'ok', h: .16 });
  T(S, 'e1', 20.6, 2.6, 'f(x) = x/2 (0 ≤ x ≤ 2)', 'cz-mono pr-s', 2);
  T(S, 'e2', 20.6, 4.6, 'P(1 ≤ X ≤ 2) = ∫₁² f dx', 'cz-mono pr-s pr-g', 3); T(S, 'e3', 20.6, 6, '= 3/4', 'cz-mono pr-l pr-g', 3);
  T(S, 'e4', 20.6, 13, 'F(x) = ∫ f = x²/4', 'cz-mono pr-s pr-w', 4); T(S, 'e5', 20.6, 14.4, 'F(2) − F(1) = 3/4', 'cz-mono pr-s', 4);
  T(S, 'e6', 20.6, 16.6, 'P(X = a) = 0', 'cz-mono pr-l', 5); T(S, 'e7', 20.6, 18, ["f = F′, ∫f = 1", "f = F′, ∫f = 1"], 'cz-mono pr-xs', 5);
  S.cap(1, '연속인 값은 히스토그램 칸을 좁히면', 'Narrow the histogram bins of a continuous quantity')
    .cap(2, '곡선(확률밀도함수)이 돼요', 'and it becomes a curve: the density')
    .cap(3, '확률은 곡선 아래 넓이', 'Probability is area under the curve')
    .cap(4, '누적분포함수의 차로도 구해요', 'or a difference of the CDF')
    .cap(5, '한 점의 확률은 0 · 밀도는 확률이 아니에요', 'Any single point has probability 0; density is not probability');
  return S;
}
function sExpo() {
  const S = scene({ id: 'pr-expo', steps: 5, per: 1.35 });
  const F = fr(0, 10, 0, .55, 2.4, 20, 3, 17.4), l = .5, f = x => l * Math.exp(-l * x);
  ax2(S, 'ga', F, ['x (분)', 'x (min)'], 'f(x)');
  shade(S, 's1', F, f, 3, 10, 'warn', 45, 2, { off: 3 }); shade(S, 's2', F, f, 2, 10, 'line', 60, 3); shade(S, 's3', F, f, 5, 10, 'warn', 50, 3);
  mplot(S, 'c', F, x => [x, f(x)], 0, 10, { n: 40, color: 'accent', h: .2 });
  [3, 5].forEach(x => T(S, 'x' + x, F.X(x) - .8, F.B + .3, String(x), 'cz-tc cz-mono pr-xs', 0, { w: 1.6 }));
  T(S, 'e1', 21.6, 2.6, 'f(x) = λe^(−λx)', 'cz-mono pr-l'); T(S, 'e2', 21.6, 4.2, ['λ = 0.5 → 평균 2분', 'λ = 0.5 → mean 2 min'], 'pr-s');
  T(S, 'e3', 21.6, 6.4, 'P(X > 3) = e^(−1.5) ≈ 0.22', 'cz-mono pr-xs pr-w', 2);
  T(S, 'e4', 21.6, 8.6, 'P(X > 5 | X > 2)', 'cz-mono pr-s', 3); T(S, 'e5', 21.6, 10, '= P(X > 3) ≈ 0.22', 'cz-mono pr-s pr-w', 3);
  T(S, 'e6', 21.6, 12.4, ['포아송 사건 사이의 간격', 'gaps between Poisson events'], 'pr-xs', 4); T(S, 'e7', 21.6, 13.8, 'E = 1/λ, Var = 1/λ²', 'cz-mono pr-xs', 4);
  T(S, 'e8', 21.6, 16, ['부품 수명, 대기 시간 모델', 'lifetimes, waiting times'], 'pr-xs', 5);
  S.cap(1, '다음 손님이 올 때까지의 대기 시간', 'The waiting time until the next customer')
    .cap(2, '3분 넘게 기다릴 확률은 오른쪽 꼬리 넓이', 'The chance of waiting over 3 minutes is the tail area')
    .cap(3, '이미 2분 기다렸어도 3분 더 기다릴 확률은 같아요', 'Already waited 2 minutes? 3 more is just as likely: memoryless')
    .cap(4, '포아송 과정에서 사건 사이 간격이 지수분포', 'In a Poisson process the gaps are exponential')
    .cap(5, '연속형 중 유일하게 무기억성을 가져요', 'It is the only memoryless continuous distribution');
  return S;
}
function sNormal() {
  const S = scene({ id: 'pr-normal', steps: 5, per: 1.35 });
  const F = fr(-3.8, 3.8, 0, .45, 2.4, 29.6, 3.4, 15.4), f = x => npdf(x);
  [[3, 'ink-3', 22, 4], [2, 'warn', 30, 3], [1, 'accent', 40, 2]].forEach(([k, c, p, st]) => shade(S, 's' + k, F, f, -k, k, c, p, st));
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .12 });
  mplot(S, 'c', F, x => [x, f(x)], -3.8, 3.8, { n: 50, color: 'ink', h: .2 });
  [-3, -2, -1, 0, 1, 2, 3].forEach(k => { vl(S, 't' + k, F.X(k), F.Y(0), F.Y(0) + .4, 'ink-3', 0, { w: .1 }); T(S, 'tl' + k, F.X(k) - 1.4, F.Y(0) + .5, k ? `${k > 0 ? '+' : '−'}${Math.abs(k)}σ` : 'μ', 'cz-tc cz-mono pr-xs', 0, { w: 2.8 }); });
  L(S, 'p', 1, 1.4, 30, 'cz-tc cz-mono pr-l', [[2, ['μ ± 1σ: 68%', 'μ ± 1σ: 68%']], [3, 'μ ± 2σ: 95%'], [4, 'μ ± 3σ: 99.7%']]);
  T(S, 'z1', 1, 17.4, 'Z = (X − μ) / σ ~ N(0, 1)', 'cz-tc cz-mono pr-l', 5, { w: 30 });
  T(S, 'z2', 1, 19, ['IQ μ = 100, σ = 15: 130 → z = 2 → 상위 2.3%', 'IQ μ = 100, σ = 15: 130 → z = 2 → top 2.3%'], 'cz-tc pr-s', 5, { w: 30 });
  S.cap(1, '평균 μ를 중심으로 대칭인 종 모양 분포', 'A symmetric bell around the mean μ')
    .cap(2, '평균 ±1σ 안에 약 68%', 'About 68% lies within one σ')
    .cap(3, '±2σ 안에 약 95%', 'about 95% within two')
    .cap(4, '±3σ 안에 99.7%', 'and 99.7% within three')
    .cap(5, '표준화하면 하나의 표준정규분포표로 계산해요', 'Standardize to use a single Z table');
  return S;
}
function sJoint() {
  const S = scene({ id: 'pr-joint', steps: 5, per: 1.35 });
  const sets = [[.9, 'accent', 'r ≈ 0.9'], [0, 'ink-3', 'r ≈ 0'], [-.7, 'warn', 'r ≈ −0.7'], [2, 'danger', ['y = x², r ≈ 0', 'y = x², r ≈ 0']]];
  sets.forEach(([r, c, lab], i) => { const x0 = 1 + i * 7.75, F = fr(-2.6, 2.6, -2.6, 2.6, x0, x0 + 7, 3.6, 10.6), st = i + 1;
    S.el('bx' + i, { x: F.L, y: F.T, w: 7, h: 7, css: 'border:.1em solid var(--line);border-radius:.3em', s: hid() }); S.set('bx' + i, st, { opacity: '1' });
    for (let j = 0; j < 36; j++) { const x = gauss(), e = gauss(); let y = r === 2 ? x * x - 1 + .25 * e : r * x + Math.sqrt(1 - r * r) * e; y = Math.max(-2.5, Math.min(2.5, y)); mpt(S, `p${i}_${j}`, F, [Math.max(-2.5, Math.min(2.5, x)), y], st, { background: tint(c, 70), 'border-color': `var(--${c})` }, .2); }
    T(S, 'l' + i, x0, 11.2, lab, 'cz-tc cz-mono pr-s', st, { w: 7 }); });
  T(S, 'f1', 1, 13.6, 'Cov(X, Y) = E[(X − μₓ)(Y − μᵧ)]', 'cz-tc cz-mono pr-l', 2, { w: 30 });
  T(S, 'f2', 1, 15.2, 'r = Cov / (σₓσᵧ) ∈ [−1, 1]', 'cz-tc cz-mono pr-l', 3, { w: 30 });
  T(S, 'f3', 1, 17, ['r은 직선 관계만 재요 · r = 0이어도 독립이 아닐 수 있어요', 'r measures only linear relation · r = 0 does not mean independent'], 'cz-tc pr-s pr-r', 4, { w: 30 });
  T(S, 'f4', 1, 18.6, ['상관관계 ≠ 인과관계', 'correlation ≠ causation'], 'cz-tc pr-l', 5, { w: 30 });
  S.cap(1, '두 변수가 함께 커지면 양의 상관', 'Rising together: positive correlation')
    .cap(2, '관계가 없으면 r ≈ 0', 'No relation: r ≈ 0')
    .cap(3, '한쪽이 클수록 다른 쪽이 작으면 음의 상관', 'One up, the other down: negative correlation')
    .cap(4, '곡선 관계는 r로 잡히지 않아요', 'Curved relationships slip past r')
    .cap(5, '상관이 있다고 원인이라는 뜻은 아니에요', 'Correlation does not imply causation');
  return S;
}

/* ================= limits & simulation ================= */
function sLln() {
  const S = scene({ id: 'pr-lln', steps: 4, per: 1.5 });
  const F = fr(0, 400, 0, 1, 2.4, 29.6, 3, 16.6);
  ax2(S, 'ga', F, ['n (던진 횟수)', 'n (flips)'], ['앞면 비율', 'heads share']);
  hl(S, 'h', F.L, F.R, F.Y(.5), 'danger', 0, { dash: 1, w: .1 }); T(S, 'hl', F.R - 3.4, F.Y(.5) - 1.2, 'p = 0.5', 'cz-mono pr-s pr-r');
  let h = 0; const pts = []; for (let n = 1; n <= 400; n++) { h += rnd() < .5 ? 1 : 0; if (n % 4 === 0 || n < 20) pts.push([F.X(n), F.Y(h / n)]); }
  poly(S, 'p', pts, { st: (i, N) => Math.min(3, 1 + Math.floor(3 * i / N)), color: 'accent', h: .16 });
  T(S, 'e1', 1, 18, ['처음엔 크게 흔들리지만 n이 커질수록 0.5에 붙어요 · X̄ₙ → μ', 'wild at first, then it settles on 0.5 · X̄ₙ → μ'], 'cz-tc pr-s', 3, { w: 30 });
  T(S, 'e2', 1, 19.4, ['"연속 뒷면 뒤엔 앞면" 같은 보정은 없어요 (도박사의 오류)', 'no “catching up” after a streak (gambler’s fallacy)'], 'cz-tc pr-s pr-r', 4, { w: 30 });
  S.cap(1, '동전을 던질 때마다 앞면 비율을 기록하면', 'Track the share of heads after every flip')
    .cap(2, '횟수가 늘수록 흔들림이 줄고', 'The swings shrink as n grows')
    .cap(3, '표본평균이 기댓값으로 수렴해요 (큰 수의 법칙)', 'The sample mean converges to the expected value')
    .cap(4, '희석될 뿐, 과거 결과를 되갚지 않아요', 'Early luck is diluted, never paid back');
  return S;
}
function sClt() {
  const S = scene({ id: 'pr-clt', steps: 5, per: 1.35 });
  const dist = n => { let d = [1]; for (let i = 0; i < n; i++) { const nd = Array(d.length + 6).fill(0); d.forEach((v, j) => { for (let f = 1; f <= 6; f++) nd[j + f] += v / 6; }); d = nd; } return d.map((v, s) => [s, v]).filter(([s]) => s >= n); };
  [[1, 0, 0], [2, 1, 0], [5, 0, 1], [10, 1, 1]].forEach(([n, cx, cy], i) => { const d = dist(n), mx = Math.max(...d.map(v => v[1])), x0 = 1.2 + cx * 15.4, y0 = 2 + cy * 8.4, st = i + 1;
    const F = fr(n - .5, 6 * n + .5, 0, mx * 1.15, x0, x0 + 14, y0 + 1, y0 + 7);
    hl(S, 'b' + i, F.L, F.R, F.B, 'ink-3', st, { w: .1 });
    d.forEach(([s, v], j) => rect(S, `r${i}_${j}`, F.X(s - .45), F.Y(v), Math.max(F.X(s + .45) - F.X(s - .45), .06), F.B - F.Y(v), 'accent', 50, st, { r: .04 }));
    if (n >= 5) { const m = 3.5 * n, sd = Math.sqrt(35 / 12 * n); mplot(S, 'n' + i, F, x => [x, npdf(x, m, sd)], F.x0, F.x1, { st: 5, n: 30, color: 'danger', h: .14 }); }
    T(S, 't' + i, x0, y0, ['주사위 ' + n + '개의 합', 'sum of ' + n + ' dice'], 'pr-s', st); });
  T(S, 'f', 1, 18.6, ['X̄ ≈ N(μ, σ²/n) · 원래 분포가 무엇이든', 'X̄ ≈ N(μ, σ²/n), whatever the original distribution'], 'cz-tc cz-mono pr-l', 5, { w: 30 });
  S.cap(1, '주사위 하나는 균등분포', 'One die is uniform')
    .cap(2, '두 개를 더하면 삼각형', 'Two dice make a triangle')
    .cap(3, '다섯 개면 벌써 종 모양', 'Five already look bell-shaped')
    .cap(4, '열 개면 거의 정규분포', 'Ten are almost normal')
    .cap(5, '독립인 것을 많이 더하면 정규분포로 (중심극한정리)', 'Sums of many independent pieces become normal: the CLT');
  return S;
}
function sCheb() {
  const S = scene({ id: 'pr-cheb', steps: 5, per: 1.35 });
  const F = fr(0, 6, 0, 1.05, 2.4, 20, 3, 17), f = x => Math.exp(-x);
  ax2(S, 'ga', F, 'x', 'f(x)');
  shade(S, 'tl', F, f, 3, 6, 'danger', 55, 3);
  mplot(S, 'c', F, x => [x, f(x)], 0, 6, { n: 40, color: 'accent', h: .2 });
  vl(S, 'mu', F.X(1), F.T, F.B, 'ink-2', 1, { dash: 1, w: .1 }); T(S, 'mul', F.X(1) + .2, F.T, 'μ = 1', 'cz-mono pr-xs', 1);
  vl(S, 'k2', F.X(3), F.T, F.B, 'danger', 2, { dash: 1, w: .1 }); T(S, 'k2l', F.X(3) + .2, F.T, 'μ + 2σ', 'cz-mono pr-xs pr-r', 2);
  T(S, 'e1', 21.4, 3, ['지수분포 λ = 1', 'exponential λ = 1'], 'pr-l'); T(S, 'e2', 21.4, 4.6, 'μ = 1, σ = 1', 'cz-mono pr-s');
  T(S, 'e3', 21.4, 6.8, ['실제 P(X ≥ 3)', 'actual P(X ≥ 3)'], 'pr-s', 3); T(S, 'e4', 21.4, 8.2, '= e⁻³ ≈ 5%', 'cz-mono pr-l pr-r', 3);
  T(S, 'e5', 21.4, 10.4, ['체비쇼프 상한', 'Chebyshev bound'], 'pr-s', 4); T(S, 'e6', 21.4, 11.8, 'P(|X−μ| ≥ kσ) ≤ 1/k²', 'cz-mono pr-xs', 4); T(S, 'e7', 21.4, 13.2, '= 1/4 = 25%', 'cz-mono pr-l', 4);
  T(S, 'e8', 21.4, 15.4, ['마르코프', 'Markov'], 'pr-s', 5); T(S, 'e9', 21.4, 16.8, 'P(X ≥ a) ≤ E[X]/a', 'cz-mono pr-xs', 5);
  S.cap(1, '분포를 몰라도 평균과 분산만 알면', 'Know only the mean and variance?')
    .cap(2, '평균에서 2σ 이상 떨어질 확률을', 'Then the chance of landing 2σ away')
    .cap(3, '실제로는 5%지만', 'which is really 5% here')
    .cap(4, '어떤 분포든 25%를 넘지 않는다고 보장해요', 'can never exceed 25% for any distribution')
    .cap(5, '느슨하지만 가정이 거의 없는 안전한 상한', 'Loose but assumption-free bounds');
  return S;
}
function sMonte() {
  const S = scene({ id: 'pr-montecarlo', steps: 4, per: 1.5 });
  const X0 = 2.4, Y0 = 2.6, Wd = 15;
  S.el('sq', { x: X0, y: Y0, w: Wd, h: Wd, css: 'border:.14em solid var(--ink-2)' });
  S.el('qc', { x: X0 - Wd, y: Y0, w: 2 * Wd, h: 2 * Wd, css: 'border-radius:50%;border:.14em solid var(--danger);clip-path:inset(0 0 50% 50%)' });
  let inC = 0; const est = [];
  for (let i = 0; i < 200; i++) { const x = rnd(), y = rnd(), ins = x * x + y * y <= 1; if (ins) inC++; const st = i < 20 ? 1 : i < 60 ? 2 : i < 120 ? 3 : 4;
    pt(S, 'p' + i, X0 + x * Wd, Y0 + Wd - y * Wd, st, ins ? { background: tint('accent', 80), 'border-color': 'var(--accent)' } : { background: tint('ink-3', 70), 'border-color': 'var(--ink-3)' }, .2);
    if ([19, 59, 119, 199].includes(i)) est.push([i + 1, 4 * inC / (i + 1)]); }
  L(S, 'n', 19.6, 3, 12, 'cz-mono pr-l', est.map(([n, v], i) => [i + 1, `n = ${n}: π ≈ ${v.toFixed(2)}`]));
  T(S, 'e1', 19.6, 5.6, ['원 안 비율 ≈ π/4', 'share inside ≈ π/4'], 'pr-s'); T(S, 'e2', 19.6, 7.2, ['π ≈ 4 × (안 / 전체)', 'π ≈ 4 × (inside / total)'], 'cz-mono pr-s');
  T(S, 'e3', 19.6, 9.6, ['오차 ∝ 1/√n', 'error ∝ 1/√n'], 'pr-l pr-r', 3); T(S, 'e4', 19.6, 11.2, ['정확도 10배 → 표본 100배', '10× accuracy → 100× samples'], 'pr-xs', 3);
  T(S, 'e5', 19.6, 13.4, ['고차원 적분, 금융 리스크', 'high-dim integrals, finance risk'], 'pr-xs', 4); T(S, 'e6', 19.6, 14.8, ['렌더링, 게임 AI (MCTS)', 'rendering, game AI (MCTS)'], 'pr-xs', 4);
  S.cap(1, '정사각형 안에 무작위로 점을 찍고', 'Drop random points in a square')
    .cap(2, '사분원 안에 떨어진 비율을 세면', 'count the share inside the quarter circle')
    .cap(3, '넓이 비 π/4에 다가가요', 'and it approaches the area ratio π/4')
    .cap(4, '무작위 표본으로 답을 어림하는 몬테카를로 방법', 'Estimating answers with random samples: Monte Carlo');
  return S;
}

/* ================= inference ================= */
function sSe() {
  const S = scene({ id: 'pr-se', steps: 5, per: 1.35 });
  const F = fr(0, 6, 0, 1.05, 2.4, 20, 2.6, 8.6), G = fr(0, 3, 0, 2.2, 2.4, 20, 10.6, 18.4);
  ax2(S, 'fa', F, 'x', ['모집단', 'population']); mplot(S, 'pop', F, x => [x, Math.exp(-x)], 0, 6, { n: 30, color: 'ink-2', h: .18 });
  vl(S, 'pm', F.X(1), F.T, F.B, 'danger', 0, { dash: 1, w: .08 });
  [[.3, 1], [.8, 1], [2.1, 1], [.5, 1]].forEach(([x], i) => mpt(S, 'sp' + i, F, [x, .04], 2, C.badf, .3));
  T(S, 'sm', 1, 9.2, ['표본 4개 평균 = 0.93', 'mean of 4 draws = 0.93'], 'pr-xs pr-r', 2);
  ax2(S, 'ga', G, 'x̄', ['표본평균의 분포', 'distribution of x̄'], 3);
  mplot(S, 'n4', G, x => [x, npdf(x, 1, .5)], 0, 3, { st: 3, n: 40, color: 'accent', h: .18 }); mplot(S, 'n25', G, x => [x, npdf(x, 1, .2)], 0, 3, { st: 4, n: 40, color: 'ok', h: .2 });
  T(S, 'e1', 21.4, 2.6, ['치우친 모집단', 'skewed population'], 'pr-s'); T(S, 'e2', 21.4, 4, 'μ = 1, σ = 1', 'cz-mono pr-s');
  T(S, 'e3', 21.4, 10.8, ['n = 4: SE = 1/√4 = 0.5', 'n = 4: SE = 1/√4 = 0.5'], 'cz-mono pr-xs pr-a', 3);
  T(S, 'e4', 21.4, 12.4, ['n = 25: SE = 0.2', 'n = 25: SE = 0.2'], 'cz-mono pr-xs pr-g', 4);
  T(S, 'e5', 21.4, 14.6, 'SE = σ / √n', 'cz-mono pr-big', 5); T(S, 'e6', 21.4, 16.4, ['정밀도 2배 → n 4배', '2× precision → 4× n'], 'pr-xs', 5);
  S.cap(1, '모집단에서 표본을 뽑아', 'Draw a sample from the population')
    .cap(2, '평균을 내면 매번 조금씩 달라요', 'and its mean varies from sample to sample')
    .cap(3, '표본평균들의 분포는 μ 주변의 정규분포', 'Sample means form a normal curve around μ')
    .cap(4, '표본이 클수록 좁아져요', 'that narrows as n grows')
    .cap(5, '그 폭이 표준오차 σ/√n', 'Its width is the standard error σ/√n');
  return S;
}
function sCi() {
  const S = scene({ id: 'pr-ci', steps: 5, per: 1.35 });
  const F = fr(46, 58, 0, 21, 3, 22, 1.6, 18.4), mu = 52;
  vl(S, 'mu', F.X(mu), F.T, F.B, 'danger', 1, { w: .14 }); T(S, 'mul', F.X(mu) - 1, F.B + .2, 'μ', 'cz-tc cz-mono pr-l pr-r', 1, { w: 2 });
  const cs = [52.4, 51.1, 53.2, 50.6, 52.9, 51.8, 53.6, 52.2, 50.9, 51.5, 52.7, 49.6, 53.1, 51.2, 52.5, 50.8, 53.4, 51.9, 52.1, 53.7];
  cs.forEach((c, i) => { const miss = Math.abs(c - mu) > 1.96, y = F.Y(20 - i), st = i < 5 ? 2 : 3, col = miss ? 'danger' : 'ok';
    seg(S, 'ci' + i, [F.X(c - 1.96), y], [F.X(c + 1.96), y], st, col, .18); pt(S, 'cm' + i, F.X(c), y, st, { background: `var(--${col})`, 'border-color': `var(--${col})` }, .2);
    if (miss) T(S, 'ms' + i, F.X(c + 1.96) + .3, y - .5, '✗', 'cz-mono pr-s pr-r', 4); });
  T(S, 'e1', 23.4, 2, 'x̄ ± 1.96 σ/√n', 'cz-mono pr-l'); T(S, 'e2', 23.4, 3.6, ['표본마다 구간', 'one interval per sample'], 'pr-xs');
  T(S, 'e3', 23.4, 6, ['20개 중 19개가', '19 of 20'], 'pr-s', 4); T(S, 'e4', 23.4, 7.4, ['μ를 포함', 'contain μ'], 'pr-s pr-g', 4);
  T(S, 'e5', 23.4, 9.8, ['n = 100, x̄ = 52,', 'n = 100, x̄ = 52,'], 'cz-mono pr-xs', 5); T(S, 'e6', 23.4, 11.2, 's = 10 → 52 ± 1.96', 'cz-mono pr-xs', 5);
  T(S, 'e7', 23.4, 13.4, ['σ 모르면 t분포', 'unknown σ: use t'], 'pr-xs', 5);
  S.cap(1, '진짜 평균 μ는 고정돼 있지만 모르는 값', 'The true mean μ is fixed but unknown')
    .cap(2, '표본을 뽑을 때마다 신뢰구간을 하나 만들어요', 'Each sample produces one confidence interval')
    .cap(3, '구간은 표본마다 움직여요', 'The intervals move from sample to sample')
    .cap(4, '같은 방법을 반복하면 95%가 μ를 포함해요', 'Repeated, the method captures μ 95% of the time')
    .cap(5, '"μ가 이 구간에 있을 확률 95%"라는 뜻은 아니에요', 'It does not mean μ is in this interval with 95% probability');
  return S;
}
function sTest() {
  const S = scene({ id: 'pr-test', steps: 5, per: 1.35 });
  const F = fr(-3.8, 3.8, 0, .45, 2.4, 29.6, 3.6, 15), f = x => npdf(x);
  shade(S, 'rl', F, f, -3.8, -1.96, 'danger', 30, 2); shade(S, 'rr', F, f, 1.96, 3.8, 'danger', 30, 2);
  shade(S, 'pl', F, f, -3.8, -2.2, 'warn', 70, 4); shade(S, 'pr', F, f, 2.2, 3.8, 'warn', 70, 4);
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .12 }); mplot(S, 'c', F, x => [x, f(x)], -3.8, 3.8, { n: 50, color: 'ink', h: .2 });
  [-1.96, 1.96].forEach((z, i) => { vl(S, 'cv' + i, F.X(z), F.Y(.2), F.Y(0), 'danger', 2, { dash: 1, w: .1 }); T(S, 'cl' + i, F.X(z) - 1.6, F.Y(0) + .4, (z > 0 ? '' : '−') + '1.96', 'cz-tc cz-mono pr-xs pr-r', 2, { w: 3.2 }); });
  vl(S, 'obs', F.X(2.2), F.Y(.36), F.Y(0), 'accent', 3, { w: .2 }); T(S, 'obl', F.X(2.2) - 1.4, F.Y(.36) - 1.2, 'z = 2.2', 'cz-tc cz-mono pr-s pr-a', 3, { w: 2.8 });
  T(S, 'h0', 1, 1.2, ['H₀: 공정한 동전 (p = 0.5) · 100번 중 앞면 61번', 'H₀: fair coin (p = 0.5) · 61 heads in 100'], 'cz-tc pr-s', 0, { w: 30 });
  T(S, 'e1', 1, 16.4, 'z = (61 − 50) / 5 = 2.2', 'cz-tc cz-mono pr-l', 3, { w: 30 });
  T(S, 'e2', 1, 17.9, ['p-값 = 2 × P(Z ≥ 2.2) ≈ 0.028 < α = 0.05 → H₀ 기각', 'p-value = 2 × P(Z ≥ 2.2) ≈ 0.028 < α = 0.05 → reject H₀'], 'cz-tc pr-s pr-g', 4, { w: 30 });
  T(S, 'e3', 1, 19.3, ['p-값은 "H₀가 참일 확률"이 아니에요', 'a p-value is not the probability that H₀ is true'], 'cz-tc pr-s pr-r', 5, { w: 30 });
  S.cap(1, '귀무가설이 참이라고 가정할 때의 검정통계량 분포', 'The test statistic’s distribution if H₀ is true')
    .cap(2, '유의수준 5%의 기각역', 'The 5% rejection region')
    .cap(3, '관측값 z = 2.2가 기각역에 들어와요', 'The observed z = 2.2 lands inside it')
    .cap(4, '이만큼 극단적일 확률(p-값)이 0.028', 'Results this extreme have probability 0.028: the p-value')
    .cap(5, 'p-값은 H₀ 아래에서 데이터가 얼마나 이상한지를 재요', 'It measures how surprising the data are under H₀');
  return S;
}
function sErrors() {
  const S = scene({ id: 'pr-errors', steps: 5, per: 1.35 });
  const F = fr(-3.4, 6.4, 0, .45, 2.4, 29.6, 3.4, 15.4), c = 1.645, f0 = x => npdf(x), f1 = x => npdf(x, 3);
  shade(S, 'al', F, f0, c, 6.4, 'danger', 45, 3); shade(S, 'be', F, f1, -3.4, c, 'warn', 45, 4); shade(S, 'pw', F, f1, c, 6.4, 'ok', 30, 4);
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .12 });
  mplot(S, 'c0', F, x => [x, f0(x)], -3.4, 6.4, { n: 50, color: 'accent', h: .2 }); mplot(S, 'c1', F, x => [x, f1(x)], -3.4, 6.4, { st: 2, n: 50, color: 'ink-2', h: .2 });
  T(S, 'l0', F.X(0) - 2, F.Y(.42) - .4, 'H₀', 'cz-tc cz-mono pr-l pr-a', 0, { w: 4 }); T(S, 'l1', F.X(3) - 2, F.Y(.42) - .4, 'H₁', 'cz-tc cz-mono pr-l', 2, { w: 4 });
  vl(S, 'cv', F.X(c), F.T, F.B, 'ink', 3, { dash: 1, w: .1 });
  T(S, 'a', 1, 16.6, ['α = 0.05: 1종 오류 (참인 H₀를 기각)', 'α = 0.05: type I error (reject a true H₀)'], 'cz-tc pr-s pr-r', 3, { w: 30 });
  T(S, 'b', 1, 18, ['β ≈ 0.09: 2종 오류 (거짓 H₀를 못 잡음) · 검정력 1 − β ≈ 0.91', 'β ≈ 0.09: type II error (miss a false H₀) · power 1 − β ≈ 0.91'], 'cz-tc pr-s pr-w', 4, { w: 30 });
  T(S, 'c', 1, 19.4, ['기준을 옮기면 α↓ β↑ · 표본을 늘리면 둘 다 ↓', 'move the cutoff: α↓ β↑ · more data: both ↓'], 'cz-tc pr-s', 5, { w: 30 });
  S.cap(1, '효과가 없다는 H₀ 분포와', 'The distribution under H₀ (no effect)')
    .cap(2, '효과가 있는 H₁ 분포가 겹쳐 있어요', 'overlaps the one under H₁ (an effect)')
    .cap(3, '기준선 오른쪽이면 기각 · H₀인데 기각하는 실수가 α', 'Reject right of the cutoff; rejecting a true H₀ is α')
    .cap(4, 'H₁인데 놓치는 실수가 β, 잡아내는 확률이 검정력', 'Missing a true effect is β; catching it is power')
    .cap(5, '두 오류는 서로 줄다리기를 해요', 'The two errors pull against each other');
  return S;
}
function sMle() {
  const S = scene({ id: 'pr-mle', steps: 5, per: 1.35 });
  'HHTHHTHHTH'.split('').forEach((c, i) => cell(S, 'c' + i, 2 + i * 2.2, 1.4, 1.9, 1.9, c, c === 'H' ? 'accent' : 'line', 40, 0));
  T(S, 'cl', 24.4, 1.9, ['앞면 7 / 10', 'heads 7 / 10'], 'pr-l');
  const F = fr(0, 1, 0, 1.12, 2.4, 22, 5.6, 18), Lk = p => p ** 7 * (1 - p) ** 3, mx = Lk(.7);
  ax2(S, 'ga', F, 'p', 'L(p)');
  mplot(S, 'c', F, p => [p, Lk(p) / mx], 0, 1, { st: 2, n: 50, color: 'accent', h: .2 });
  vl(S, 'p5', F.X(.5), F.Y(Lk(.5) / mx), F.Y(0), 'warn', 3, { dash: 1, w: .1 }); mpt(S, 'p5d', F, [.5, Lk(.5) / mx], 3, C.warn, .32); mT(S, 'p5l', F, [.5, Lk(.5) / mx], -2.4, -1.2, 'p = 0.5', 'cz-mono pr-xs pr-w', 3);
  vl(S, 'p7', F.X(.7), F.Y(1), F.Y(0), 'ok', 4, { dash: 1, w: .1 }); mpt(S, 'p7d', F, [.7, 1], 4, C.okf, .36); mT(S, 'p7l', F, [.7, 1], .4, -.6, 'p̂ = 0.7', 'cz-mono pr-s pr-g', 4);
  T(S, 'e1', 23.4, 5.6, 'L(p) = p⁷(1 − p)³', 'cz-mono pr-s', 2);
  T(S, 'e2', 23.4, 7.6, 'L(0.5) ≈ 0.00098', 'cz-mono pr-xs pr-w', 3); T(S, 'e3', 23.4, 9, 'L(0.7) ≈ 0.00222', 'cz-mono pr-xs pr-g', 4);
  T(S, 'e4', 23.4, 11.2, 'd/dp ln L = 0', 'cz-mono pr-s', 4); T(S, 'e5', 23.4, 12.6, '→ p̂ = k/n', 'cz-mono pr-l pr-g', 4);
  T(S, 'e6', 23.4, 15, ['정규분포: μ̂ = x̄', 'normal: μ̂ = x̄'], 'pr-xs', 5); T(S, 'e7', 23.4, 16.4, 'σ̂² = Σ(x − x̄)²/n', 'cz-mono pr-xs', 5);
  S.cap(1, '동전을 10번 던져 앞면이 7번 나왔어요', 'Ten flips gave seven heads')
    .cap(2, 'p마다 이 데이터가 나올 가능도 L(p)를 그리면', 'Plot how likely this data is for each p')
    .cap(3, 'p = 0.5보다', 'p = 0.5 explains it less well')
    .cap(4, 'p = 0.7에서 가장 커요 · 최대우도추정값', 'than p = 0.7, the maximum: the MLE')
    .cap(5, '로그를 취해 미분 = 0으로 풀어요 · 머신러닝 손실 함수의 뿌리', 'Solve d/dp ln L = 0; the root of ML loss functions');
  return S;
}
function sRegression() {
  const S = scene({ id: 'pr-regression', steps: 5, per: 1.35 });
  const xs = [1, 2, 3, 4, 5, 6, 7, 8], ys = [2.4, 2.6, 4.4, 4.2, 6.3, 6.1, 7.9, 8.5], n = 8;
  const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n, sxy = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0), sxx = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
  const b1 = sxy / sxx, b0 = my - b1 * mx, sst = ys.reduce((a, y) => a + (y - my) ** 2, 0), sse = ys.reduce((a, y, i) => a + (y - b0 - b1 * xs[i]) ** 2, 0), R2 = 1 - sse / sst;
  const F = fr(0, 9, 0, 10, 2.4, 19.6, 2.4, 18);
  ax2(S, 'ga', F, 'x', 'y');
  mline(S, 'my', F, [0, my], [9, my], { st: 2, off: 3, color: 'warn', h: .14, dash: 1 });
  xs.forEach((x, i) => { vl(S, 'dt' + i, F.X(x), F.Y(ys[i]), F.Y(my), 'warn', 2, { w: .1, off: 3 }); vl(S, 'rs' + i, F.X(x), F.Y(ys[i]), F.Y(b0 + b1 * x), 'danger', 3, { w: .12 }); mpt(S, 'p' + i, F, [x, ys[i]], 0, C.cur, .32); });
  mline(S, 'fit', F, [0, b0], [9, b0 + b1 * 9], { st: 3, color: 'ok', h: .2 });
  T(S, 'e1', 21, 2.6, `ŷ = ${b0.toFixed(2)} + ${b1.toFixed(2)}x`, 'cz-mono pr-l pr-g', 3);
  T(S, 'e2', 21, 4.6, `SST = ${sst.toFixed(1)}`, 'cz-mono pr-s pr-w', 2); T(S, 'e3', 21, 6, `SSE = ${sse.toFixed(2)}`, 'cz-mono pr-s pr-r', 3);
  T(S, 'e4', 21, 8.2, 'R² = 1 − SSE/SST', 'cz-mono pr-l', 4); T(S, 'e5', 21, 9.8, `= ${R2.toFixed(3)}`, 'cz-mono pr-big pr-g', 4);
  T(S, 'e6', 21, 12.4, 'b₁ = r · s_y / s_x', 'cz-mono pr-xs', 5); T(S, 'e7', 21, 13.8, ['R² = r² (단순회귀)', 'R² = r² (simple regression)'], 'pr-xs', 5); T(S, 'e8', 21, 15.2, ['외삽은 위험해요', 'beware extrapolation'], 'pr-xs pr-r', 5);
  S.cap(1, 'x와 y의 관계를 직선으로 설명하고 싶어요', 'Explain y by x with a straight line')
    .cap(2, '평균선 기준 전체 변동(SST)', 'Total variation around the mean (SST)')
    .cap(3, '최소제곱 직선의 남은 오차(SSE)', 'Leftover error of the least-squares line (SSE)')
    .cap(4, '설명된 변동의 비율이 결정계수 R²', 'The explained share is R²')
    .cap(5, '높은 R²도 인과를 증명하지는 않아요', 'A high R² still does not prove causation');
  return S;
}
function sAb() {
  const S = scene({ id: 'pr-abtest', steps: 5, per: 1.35 });
  for (let i = 0; i < 16; i++) { const g = i % 2, y = 2.2 + Math.floor(i / 2) * .9; pt(S, 'u' + i, 3, 4.4, 0, C.idle, .26); S.move('u' + i, 1, (g ? 9.4 : 6.6) - .26 + (i % 4 < 2 ? 0 : .7), y - .26); }
  T(S, 'ul', 1, 1.2, ['사용자를 무작위로 반반', 'users split at random'], 'pr-xs');
  const F = fr(0, 3, 0, .085, 13.4, 22, 2.6, 13.6);
  ax2(S, 'ga', F, '', ['전환율', 'conversion']);
  [[1, .05, .00955, 'accent', 'A'], [2, .065, .0108, 'warn', 'B']].forEach(([x, p, ci, c, l]) => { rect(S, 'b' + l, F.X(x - .3), F.Y(p), F.X(.6) - F.X(0), F.Y(0) - F.Y(p), c, 50, 2, { r: .1 });
    vl(S, 'ci' + l, F.X(x), F.Y(p + ci), F.Y(p - ci), 'ink', 3, { w: .12 }); hl(S, 'ct' + l, F.X(x) - .4, F.X(x) + .4, F.Y(p + ci), 'ink', 3, { w: .12 }); hl(S, 'cb' + l, F.X(x) - .4, F.X(x) + .4, F.Y(p - ci), 'ink', 3, { w: .12 });
    T(S, 'bl' + l, F.X(x) - 1.6, F.B + .3, l, 'cz-tc cz-mono pr-l', 0, { w: 3.2 }); T(S, 'bv' + l, F.X(x) - 2, F.Y(p + ci) - 1.3, (p * 100).toFixed(1) + '%', 'cz-tc cz-mono pr-xs', 2, { w: 4 }); });
  T(S, 'e1', 23.4, 2.6, 'A: 100 / 2000', 'cz-mono pr-s pr-a', 2); T(S, 'e2', 23.4, 4, 'B: 130 / 2000', 'cz-mono pr-s pr-w', 2);
  T(S, 'e3', 23.4, 6.2, ['95% 신뢰구간', '95% intervals'], 'pr-xs', 3);
  T(S, 'e4', 23.4, 8.2, 'z = 0.015 / 0.0074', 'cz-mono pr-xs', 4); T(S, 'e5', 23.4, 9.6, '≈ 2.04, p ≈ 0.041', 'cz-mono pr-s pr-g', 4);
  T(S, 'f1', 1, 15.6, ['p̂ = 230/4000, SE = √(p̂(1 − p̂)(1/n₁ + 1/n₂)) · 5%에서 유의', 'pooled p̂ = 230/4000, SE = √(p̂(1 − p̂)(1/n₁ + 1/n₂)) · significant at 5%'], 'cz-tc cz-mono pr-xs', 4, { w: 30 });
  T(S, 'f2', 1, 17.4, ['표본 크기는 미리 정하고, 중간에 몰래 보지 않기 (peeking)', 'fix the sample size up front; don’t peek and stop early'], 'cz-tc pr-s pr-r', 5, { w: 30 });
  T(S, 'f3', 1, 18.8, ['여러 지표를 동시에 보면 다중 비교 보정', 'many metrics at once → correct for multiple comparisons'], 'cz-tc pr-s', 5, { w: 30 });
  S.cap(1, '사용자를 무작위로 A안과 B안에 나눠요', 'Randomly split users between version A and B')
    .cap(2, 'B의 전환율이 높아 보이지만', 'B looks better')
    .cap(3, '신뢰구간이 꽤 겹쳐요', 'but the intervals overlap a lot')
    .cap(4, '두 비율 차이의 z검정: p ≈ 0.04로 유의', 'A two-proportion z-test gives p ≈ 0.04: significant')
    .cap(5, '실험 설계가 결과를 좌우해요', 'Experiment design decides whether to trust it');
  return S;
}

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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'prx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono prx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono prx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c prx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono prx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c prx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'prx-s prx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono prx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono prx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono prx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono prx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono prx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'prx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'prx-xs', 5));


const CSSX = `
.prx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.prx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.prx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.prx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.prx-r .in{color:var(--danger);font-weight:800}
.prx-g .in{color:var(--ok);font-weight:800}
.prx-a .in{color:var(--accent);font-weight:800}
.prx-w .in{color:var(--warn);font-weight:800}
.prx-c .in{font-size:.6em;font-weight:700}
.prx-c2 .in{font-size:.5em;font-weight:700}
.prx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.prx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'prx-xs', i + 1, { off: i + 2 }));
const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
const sdev = a => { const m = avg(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1)); };

/* ================= basics ================= */
function sBirthday() {
  const S = scene({ id: 'pr-birthday', steps: 5, per: 1.6 });
  const F = fr(0, 60, 0, 1, 2.6, 17.4, 1.6, 12.6);
  const P = []; let q = 1; for (let n = 0; n <= 60; n++) { P.push(1 - q); q *= (365 - n) / 365; }
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .12 }); vl(S, 'ay', F.X(0), F.T, F.B, 'ink-3', 0, { w: .12 });
  mline(S, 'h5', F, [0, .5], [60, .5], { color: 'line', h: .08, dash: 1 }); mline(S, 'h1', F, [0, 1], [60, 1], { color: 'line', h: .06, dash: 1 });
  [10, 20, 30, 40, 50, 60].forEach(n => T(S, 'tx' + n, F.X(n) - 1, F.B + .2, String(n), 'cz-tc cz-mono prx-xs', 0, { w: 2 }));
  T(S, 'ty5', .7, F.Y(.5) - .45, '0.5', 'cz-mono prx-xs', 0); T(S, 'ty1', 1.3, F.Y(1) - .45, '1', 'cz-mono prx-xs', 0);
  T(S, 'xl', F.R - 5, F.B + 1.15, ['사람 수 n', 'people n'], 'prx-xs', 0, { w: 5, css: 'text-align:right' });
  T(S, 'yl', F.L + .4, .3, ['생일이 겹칠 확률', 'P(shared birthday)'], 'prx-xs', 0);
  poly(S, 'cv', P.map((p, n) => [F.X(n), F.Y(p)]), { st: i => (i <= 23 ? 2 : 3), color: 'accent', h: .14 });
  const pc = n => (P[n] * 100).toFixed(1) + '%';
  mline(S, 'v23', F, [23, 0], [23, P[23]], { st: 2, color: 'ok', h: .08, dash: 1 });
  mpt(S, 'p23', F, [23, P[23]], 2, C.okf, .32); mT(S, 'l23', F, [23, P[23]], .5, .45, ['23명 → ' + pc(23), '23 people → ' + pc(23)], 'prx-s prx-g', 2);
  mline(S, 'v50', F, [50, 0], [50, P[50]], { st: 3, color: 'ok', h: .08, dash: 1 });
  mpt(S, 'p50', F, [50, P[50]], 3, C.okf, .32); mT(S, 'l50', F, [50, P[50]], .45, .4, ['50명 → ' + pc(50), '50 → ' + pc(50)], 'prx-s prx-g', 3);
  const RX = 20.6;
  T(S, 'f0', RX, 1.3, ['P(모두 다름)', 'P(all different)'], 'cz-mono prx-s', 1);
  T(S, 'f1', RX, 2.6, '= 365/365 · 364/365 · …', 'cz-mono prx-xs', 1);
  T(S, 'f2', RX, 3.7, '  · (365 − n + 1)/365', 'cz-mono prx-code', 1);
  T(S, 'f3', RX, 5.0, ['P(겹침) = 1 − P(모두 다름)', 'P(shared) = 1 − P(all diff.)'], 'cz-mono prx-xs prx-a', 1);
  T(S, 'q1', RX, 6.8, ['23명 → 쌍 C(23, 2) = 253개', '23 people → C(23, 2) = 253 pairs'], 'prx-xs', 3);
  T(S, 'q2', RX, 7.9, ['쌍마다 1/365씩 → 금방 쌓여요', '1/365 per pair adds up fast'], 'prx-xs', 3);
  T(S, 'h0', RX, 9.5, ['해시 값이 N가지라면', 'with N possible hash values'], 'prx-xs prx-w', 4);
  T(S, 'h1', RX, 10.6, ['≈ 1.18√N개에서 50%', '50% at ≈ 1.18√N'], 'cz-mono prx-xs', 4);
  T(S, 'h2', RX, 11.7, ['32비트 → 약 7.7만 개', '32-bit → ≈ 77,000'], 'cz-mono prx-xs', 4);
  T(S, 'h3', RX, 12.8, ['64비트 → 약 50억 개', '64-bit → ≈ 5 billion'], 'cz-mono prx-xs', 4);
  stepT(S, 'k', 1, 15.4, [['n명 중 생일이 같은 쌍이 하나라도 있을 확률 · “모두 다를 확률”을 구해 1에서 빼요', 'the chance that at least two of n people share a birthday · find “all different” and subtract'], ['23명만 모여도 50%를 넘어요', 'just 23 people push it past 50%'], ['50명이면 97% · 비교할 쌍의 수가 사람 수의 제곱으로 늘기 때문이에요', '50 people give 97% · the number of pairs grows with the square'], ['해시도 같아요: 출력이 N가지면 √N개쯤에서 충돌이 흔해져요', 'hashes behave the same: with N outputs, collisions appear around √N']]);
  fin(S, 'z', 15.4, [['생일 역설: 쌍이 n²으로 늘어 생각보다 빨리 겹쳐요 · P ≈ 1 − e^(−n²/2N)', 'the birthday paradox: pairs grow as n², so matches come early · P ≈ 1 − e^(−n²/2N)', 'prx-xs prx-a'], ['생일 공격: n비트 해시의 충돌 저항은 n/2비트 · SHA-256 → 128비트', 'birthday attack: an n-bit hash resists collisions only to n/2 bits · SHA-256 → 128'], ['해시 테이블 크기, UUID·랜덤 ID 길이를 정할 때도 같은 계산을 써요', 'the same math sizes hash tables, UUIDs and random IDs']]);
  S.cap(1, '생일이 겹칠 확률', 'Chance of a shared birthday').cap(2, '23명이면 반반', 'Even odds at 23').cap(3, '쌍의 수가 빨리 늘어요', 'Pairs pile up fast').cap(4, '해시 충돌도 같은 원리', 'Hash collisions work the same way').cap(5, '생일 역설', 'The birthday paradox');
  return S;
}

/* ================= distributions ================= */
function sCov() {
  const S = scene({ id: 'pr-cov', steps: 5, per: 1.6 });
  const xs = [1, 2, 2.5, 3.5, 4.2, 5, 5.5, 6.4, 7, 8, 8.5, 9.2], ys = [2.2, 1.6, 3.6, 3.0, 5.8, 4.4, 6.2, 4.6, 7.4, 6.6, 8.4, 8.0], n = xs.length;
  const mx = avg(xs), my = avg(ys), cov = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / (n - 1), r = cov / (sdev(xs) * sdev(ys));
  const F = fr(0, 10, 0, 10, 1.6, 14.4, 1.2, 13.0);
  ax2(S, 'ga', F, 'X', 'Y', 0);
  xs.forEach((x, i) => { const c = (x - mx) * (ys[i] - my) > 0 ? 'ok' : 'danger', a = F.X(Math.min(x, mx)), b = F.Y(Math.max(ys[i], my));
    rect(S, 'r' + i, a, b, Math.abs(F.X(x) - F.X(mx)), Math.abs(F.Y(ys[i]) - F.Y(my)), c, 0, 2, { r: 0, css: `background:color-mix(in srgb,var(--${c}) 22%,transparent)!important`, off: 3 }); });
  mline(S, 'mx', F, [mx, 0], [mx, 10], { st: 1, color: 'warn', h: .08, dash: 1 }); mline(S, 'my', F, [0, my], [10, my], { st: 1, color: 'warn', h: .08, dash: 1 });
  xs.forEach((x, i) => mpt(S, 'p' + i, F, [x, ys[i]], 0, C.cur, .3));
  mpt(S, 'c', F, [mx, my], 1, C.badf, .3); T(S, 'clx', F.X(mx) + .3, .3, 'x̄', 'cz-mono prx-s prx-w', 1); T(S, 'cly', F.R + .25, F.Y(my) - .5, 'ȳ', 'cz-mono prx-s prx-w', 1);
  mline(S, 'fit', F, [0, my - r * sdev(ys) / sdev(xs) * mx], [10, my + r * sdev(ys) / sdev(xs) * (10 - mx)], { st: 3, color: 'ok', h: .1 });
  const RX = 16.2;
  T(S, 'm1', RX, 1.2, `x̄ = ${mx.toFixed(2)} · ȳ = ${my.toFixed(2)}`, 'cz-mono prx-xs', 1);
  T(S, 'c1', RX, 2.5, 'Cov = Σ(x − x̄)(y − ȳ) / (n − 1)', 'cz-mono prx-xs', 2);
  T(S, 'c2', RX, 3.6, ['초록(+) 넓이가 빨강(−)보다 훨씬 커요', 'green (+) areas outweigh red (−)'], 'prx-xs', 2);
  T(S, 'c3', RX, 4.7, `= ${cov.toFixed(2)}`, 'cz-mono prx-s prx-g', 2);
  T(S, 'r1', RX, 6.2, 'r = Cov / (sx · sy)', 'cz-mono prx-xs', 3);
  T(S, 'r2', RX, 7.3, `= ${r.toFixed(2)}`, 'cz-mono prx-s prx-g', 3);
  T(S, 'r3', RX, 8.5, ['−1 ≤ r ≤ 1 · 단위를 바꿔도 그대로', '−1 ≤ r ≤ 1 · unchanged by units'], 'prx-xs', 3);
  const NZ = [.04, -.05, .06, -.03, -.06, .05, .02, -.04, .06, -.05, .03, -.02, .05, -.04], XX = NZ.map((_, i) => .08 + i * .84 / 13);
  const PN = [XX.map((x, i) => [x, .5 + .8 * (x - .5) + NZ[i]]), [[.1, .6], [.18, .22], [.27, .86], [.34, .42], [.42, .12], [.5, .68], [.56, .3], [.63, .9], [.7, .16], [.77, .55], [.85, .8], [.91, .36]], XX.map((x, i) => [x, .5 - .75 * (x - .5) + 1.6 * NZ[13 - i]]), XX.map(x => [x, .12 + 2.9 * (x - .5) ** 2])];
  PN.forEach((pts, j) => {
    const px = pts.map(q => q[0]), py = pts.map(q => q[1]);
    const rr = px.reduce((s, x, i) => s + (x - avg(px)) * (py[i] - avg(py)), 0) / ((px.length - 1) * sdev(px) * sdev(py));
    const x0 = RX + j * 3.8, y0 = 10.0, W = 3.3, st = j < 3 ? 3 : 4;
    rect(S, 'mb' + j, x0, y0, W, W, j < 3 ? 'line' : 'danger', j < 3 ? 22 : 12, st, { r: .25 });
    px.forEach((x, i) => pt(S, `mp${j}_${i}`, x0 + x * W, y0 + (1 - py[i]) * W, st, j < 3 ? C.cur : C.badf, .13));
    T(S, 'ml' + j, x0 - .3, y0 + W + .15, (j < 3 ? 'r = ' : 'r = ') + (Math.abs(rr) < .005 ? '0.00' : rr.toFixed(2)) + (j < 3 ? '' : ' ?!'), 'cz-tc cz-mono prx-xs' + (j < 3 ? '' : ' prx-r'), st, { w: W + .6 });
  });
  stepT(S, 'k', 1, 15.4, [['키와 몸무게처럼 함께 움직이는 두 변수 · 평균선이 평면을 네 칸으로 나눠요', 'two variables that move together, like height and weight · the means split the plane in four'], ['평균에서의 편차를 곱한 넓이의 평균이 공분산 · 같은 방향이면 +, 반대면 −', 'covariance averages the products of deviations (the areas) · same direction +, opposite −'], ['두 표준편차로 나누면 상관계수 r · −1에서 1 사이라 서로 비교할 수 있어요', 'divide by both standard deviations to get r · between −1 and 1, comparable across data'], ['r은 직선 관계만 재요 · U자처럼 뚜렷한 관계도 r ≈ 0일 수 있어요', 'r only measures straight-line relationships · a clear U shape can still give r ≈ 0']]);
  fin(S, 'z', 15.4, [['상관은 인과가 아니에요: 아이스크림 판매와 물놀이 사고는 둘 다 기온 따라 올라요', 'correlation is not causation: ice-cream sales and drownings both rise with temperature', 'prx-xs prx-a'], ['Cov(X, Y) = E[XY] − E[X]E[Y] · 독립이면 0 (0이라고 독립은 아님)', 'Cov(X, Y) = E[XY] − E[X]E[Y] · independent ⇒ 0 (not the reverse)'], ['Var(X + Y) = Var X + Var Y + 2Cov(X, Y) · 포트폴리오 위험이 이렇게 더해져요', 'Var(X + Y) = Var X + Var Y + 2Cov(X, Y) · how portfolio risk adds up']]);
  S.cap(1, '두 변수의 흩어짐', 'Two variables together').cap(2, '공분산 = 넓이의 평균', 'Covariance = average area').cap(3, '상관계수 r', 'The correlation coefficient r').cap(4, 'r이 놓치는 것', 'What r misses').cap(5, '공분산과 상관', 'Covariance and correlation');
  return S;
}

/* ================= limits & simulation ================= */
function sMarkov() {
  const S = scene({ id: 'pr-markov', steps: 5, per: 1.7 });
  const NM = [['맑음', 'sunny', 'warn'], ['흐림', 'cloudy', 'ink-3'], ['비', 'rainy', 'accent']];
  const XS = [6, 16, 26], Y = 5.6, R = 1.5, P = [[.7, .3, 0], [.3, .4, .3], [0, .5, .5]];
  NM.forEach(([ko, en, c], i) => { stt(S, 's' + i, XS[i], Y, [ko, en], c, 0, { r: R, pct: 24 }); lp(S, 'l' + i, XS[i], Y, String(P[i][i]), 1, { r: R, color: c }); });
  [[0, 1], [1, 0], [1, 2], [2, 1]].forEach(([a, b]) => trn(S, `t${a}${b}`, [XS[a], Y], [XS[b], Y], String(P[a][b]), 1, { r: R, bend: -.45, ld: -.75 }));
  const NK = [['맑음', 'sunny'], ['흐림', 'cloudy'], ['비', 'rainy']];
  T(S, 'pm', 1, 9.0, 'P =', 'cz-mono prx-s', 2);
  NK.forEach((l, j) => T(S, 'ch' + j, 4.2 + j * 2.5, 9.15, l, 'cz-tc prx-xs', 2, { w: 2.3 }));
  NK.forEach((l, i) => { T(S, 'rh' + i, .6, 10.35 + i * 1.3, l, 'prx-xs', 2, { w: 3.3, css: 'text-align:right' }); P[i].forEach((p, j) => cell(S, `c${i}${j}`, 4.2 + j * 2.5, 10.2 + i * 1.3, 2.3, 1.15, String(p), i === j ? 'accent' : 'line', i === j ? 24 : 16, 2)); });
  T(S, 'rs', 1, 14.2, ['행 = 오늘, 열 = 내일 · 각 행의 합 = 1', 'row = today, column = tomorrow · rows sum to 1'], 'prx-xs', 2);
  let d = [1, 0, 0]; const D = [d];
  for (let t = 1; t <= 8; t++) { d = [0, 1, 2].map(j => d.reduce((s, v, i) => s + v * P[i][j], 0)); D.push(d); }
  const BX = t => 14.4 + t * 1.8, BT = 10.0, BH = 4.0, COL = ['warn', 'ink-3', 'accent'];
  T(S, 'bh', 14.4, 8.15, ['맑은 날에서 시작한 날씨 분포', 'weather distribution, starting sunny'], 'prx-xs', 3);
  D.forEach((dd, t) => { const st = t <= 3 ? 3 : 4; let y = BT + BH;
    dd.forEach((v, j) => { if (v < .004) return; const h = v * BH; y -= h; rect(S, `b${t}_${j}`, BX(t), y, 1.3, h, COL[j], 45, st, { r: .05 }); });
    T(S, 'bt' + t, BX(t) - .35, BT + BH + .15, String(t), 'cz-tc cz-mono prx-xs', st, { w: 2 }); });
  let q = [1, 0, 0]; for (let t = 0; t < 400; t++) q = [0, 1, 2].map(j => q.reduce((s, v, i) => s + v * P[i][j], 0));
  const pi = q.map(v => v.toFixed(2));
  [q[0], q[0] + q[1]].forEach((c, i) => hl(S, 'st' + i, BX(3.5), BX(8) + 1.5, BT + BH - c * BH, 'ok', 4, { w: .08, dash: 1 }));
  T(S, 'pi', 14.4, 9.1, `π = (${pi.join(', ')}) = πP`, 'cz-mono prx-xs prx-g', 4);
  stepT(S, 'k', 1, 15.6, [['내일 날씨는 오늘 날씨에만 달려요 · 화살표의 숫자는 옮겨 갈 확률', 'tomorrow’s weather depends only on today’s · arrows carry transition probabilities'], ['전이 행렬 P에 모으면 지금 상태의 행이 다음 상태의 확률이에요', 'collected in the transition matrix P, each row gives the odds for the next state'], ['맑은 날에서 시작해 분포를 πₜ₊₁ = πₜP로 하루씩 굴려요', 'start on a sunny day and roll the distribution forward: πₜ₊₁ = πₜP'], ['며칠 지나면 시작과 상관없이 π = πP인 정상 분포에 머물러요', 'after a few days it settles at the stationary distribution π = πP, whatever the start']]);
  fin(S, 'z', 15.6, [['마르코프 체인: 다음 상태가 지금 상태에만 달린 확률 과정', 'a Markov chain: the next state depends only on the current one', 'prx-xs prx-a'], ['PageRank = 링크를 무작위로 따라가는 서퍼의 정상 분포', 'PageRank is the stationary distribution of a random surfer'], ['MCMC 샘플링, 큐잉 모델, n-gram 텍스트 생성에도 쓰여요', 'also behind MCMC sampling, queueing models and n-gram text generation']]);
  S.cap(1, '상태와 전이 확률', 'States and transition probabilities').cap(2, '전이 행렬', 'The transition matrix').cap(3, '하루씩 굴리기', 'Step it day by day').cap(4, '정상 분포로 수렴', 'Converging to the stationary distribution').cap(5, '마르코프 체인', 'Markov chains');
  return S;
}

function sBoot() {
  const S = scene({ id: 'pr-bootstrap', steps: 5, per: 1.6 });
  const D = [12, 15, 9, 22, 14, 18, 11, 30, 16, 13], n = D.length, CX = i => 5.2 + i * 2.2;
  T(S, 'sl', 1, 1.45, ['표본 (분)', 'sample (min)'], 'prx-xs', 0, { w: 4 });
  D.forEach((v, i) => box2(S, 'd' + i, CX(i), 1.2, 1.9, 1.4, String(v), 'accent', 0, { pct: 26 }));
  T(S, 'sm', 27.6, 1.45, `x̄ = ${avg(D).toFixed(1)}`, 'cz-mono prx-s prx-a', 0);
  for (let r = 0; r < 3; r++) { const y = 3.3 + r * 1.9, v = D.map(() => D[Math.floor(rnd() * n)]);
    T(S, 'rl' + r, 1, y + .3, ['다시 뽑기 ' + (r + 1), 'resample ' + (r + 1)], 'prx-xs', 2, { w: 4 });
    v.forEach((x, i) => box2(S, `r${r}_${i}`, CX(i), y, 1.9, 1.4, String(x), 'warn', 2, { pct: 24 }));
    T(S, 'rm' + r, 27.6, y + .3, `x̄* = ${avg(v).toFixed(1)}`, 'cz-mono prx-xs', 2); }
  const M = []; for (let b = 0; b < 1000; b++) { let s = 0; for (let i = 0; i < n; i++) s += D[Math.floor(rnd() * n)]; M.push(s / n); }
  M.sort((a, b) => a - b); const lo = M[24], hi = M[974], se = sdev(M);
  const W = .5, X0 = 10, X1 = 23, NB = Math.round((X1 - X0) / W), cnt = Array(NB).fill(0);
  M.forEach(m => { const b = Math.floor((m - X0) / W); if (b >= 0 && b < NB) cnt[b]++; });
  const F = fr(X0, X1, 0, Math.max(...cnt) * 1.06, 5.2, 25.6, 9.6, 13.6), ctr = cnt.map((_, i) => X0 + (i + .5) * W);
  T(S, 'hh', 1, 8.75, ['1000번 다시 뽑은 x̄*의 분포', 'x̄* from 1000 resamples'], 'prx-xs prx-a', 3);
  bars(S, 'hb', F, ctr, cnt, { bw: W * .86, color: 'accent', pct: 45, st: 3 });
  ctr.forEach((c, i) => { if ((c < lo || c > hi) && cnt[i] > 0) tsets(S, 'hb' + i, [[4, 'danger', 50]]); });
  hl(S, 'hx', F.L, F.R, F.Y(0), 'ink-3', 3, { w: .1 });
  [10, 12, 14, 16, 18, 20, 22].forEach(v => T(S, 'hx' + v, F.X(v) - 1, F.B + .15, String(v), 'cz-tc cz-mono prx-xs', 3, { w: 2 }));
  T(S, 'se', 26.2, 9.8, `SE ≈ ${se.toFixed(1)}`, 'cz-mono prx-xs', 3);
  vl(S, 'qlo', F.X(lo), F.T - .1, F.B, 'danger', 4, { w: .08, dash: 1 }); vl(S, 'qhi', F.X(hi), F.T - .1, F.B, 'danger', 4, { w: .08, dash: 1 });
  T(S, 'ci0', 26.2, 11.2, ['95% 구간', '95% interval'], 'prx-xs prx-g', 4);
  T(S, 'ci1', 26.2, 12.3, `[${lo.toFixed(1)}, ${hi.toFixed(1)}]`, 'cz-mono prx-xs prx-g', 4);
  stepT(S, 'k', 1, 15.4, [[`가진 건 표본 10개뿐 · 평균 ${avg(D).toFixed(1)}분은 얼마나 믿을 만할까요?`, `all we have is 10 values · how reliable is the mean of ${avg(D).toFixed(1)} minutes?`], ['표본에서 복원 추출로 10개를 다시 뽑아요 · 같은 값이 여러 번 나올 수 있어요', 'resample 10 values with replacement · the same value can appear more than once'], ['이걸 1000번 반복하면 평균이 흔들리는 모양(표본분포)이 보여요', 'repeat 1000 times and the spread of the mean (its sampling distribution) appears'], ['가운데 95%를 자르면 신뢰구간 · 공식 없이도 구해요', 'cut out the middle 95% for a confidence interval · no formula needed']]);
  fin(S, 'z', 15.4, [['부트스트랩: 표본을 모집단 삼아 다시 뽑아서 추정값의 불확실성을 재요', 'the bootstrap resamples the sample itself to measure an estimate’s uncertainty', 'prx-xs prx-a'], ['중앙값·상관계수·모델 정확도처럼 공식이 어려운 통계량에도 그대로 써요', 'it works the same for medians, correlations and model accuracy, where formulas are hard'], ['표본이 너무 작거나 치우치면 한계 · 랜덤 포레스트의 배깅도 같은 아이디어', 'tiny or biased samples break it · bagging in random forests uses the same idea']]);
  S.cap(1, '표본 하나뿐', 'Only one sample').cap(2, '복원 추출로 다시 뽑기', 'Resample with replacement').cap(3, '1000번 반복', 'Repeat 1000 times').cap(4, '가운데 95%', 'The middle 95%').cap(5, '부트스트랩', 'The bootstrap');
  return S;
}

/* ================= inference ================= */
const lnG = z => { const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < .5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnG(1 - z); z -= 1; let x = .99999999999980993; g.forEach((c, i) => { x += c / (z + i + 1); }); const t = z + 7.5; return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x); };
const tpdf = (x, v) => Math.exp(lnG((v + 1) / 2) - lnG(v / 2) - .5 * Math.log(v * Math.PI) - (v + 1) / 2 * Math.log(1 + x * x / v));
function sTtest() {
  const S = scene({ id: 'pr-ttest', steps: 5, per: 1.7 });
  const A = [252, 268, 241, 275, 259, 283, 247, 262], B = [240, 251, 236, 262, 248, 229, 257, 243];
  const ma = avg(A), mb = avg(B), va = sdev(A) ** 2, vb = sdev(B) ** 2, se = Math.sqrt(va / 8 + vb / 8), t = (mb - ma) / se;
  const df = se ** 4 / ((va / 8) ** 2 / 7 + (vb / 8) ** 2 / 7);
  let p = 0; { const a = Math.abs(t), b = 40, N = 4000, h = (b - a) / N; for (let i = 0; i <= N; i++) { const w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2; p += w * tpdf(a + i * h, df); } p = 2 * p * h / 3; }
  const X = v => 4.6 + (v - 220) * .25;
  T(S, 'la', 1, 1.45, ['기존', 'old'], 'prx-s', 0); T(S, 'lb', 1, 3.45, ['개선', 'new'], 'prx-s prx-a', 0);
  A.forEach((v, i) => pt(S, 'a' + i, X(v), 1.9, 0, { background: 'var(--ink-3)', 'border-color': 'transparent' }, .32)); B.forEach((v, i) => pt(S, 'b' + i, X(v), 3.9, 0, C.cur, .32));
  hl(S, 'ax', X(220), X(300), 5.5, 'ink-3', 0, { w: .1 });
  [220, 240, 260, 280, 300].forEach(v => T(S, 'tx' + v, X(v) - 1.2, 5.65, String(v), 'cz-tc cz-mono prx-xs', 0, { w: 2.4 }));
  T(S, 'ms', X(300) + 1.0, 5.65, 'ms', 'cz-mono prx-xs', 0);
  vl(S, 'mA', X(ma), 1.0, 2.8, 'ink', 1, { w: .14 }); vl(S, 'mB', X(mb), 3.0, 4.8, 'accent', 1, { w: .14 });
  T(S, 'mal', 25.4, 1.45, `x̄₁ = ${ma.toFixed(1)}`, 'cz-mono prx-xs', 1); T(S, 'mbl', 25.4, 3.45, `x̄₂ = ${mb.toFixed(1)}`, 'cz-mono prx-xs prx-a', 1);
  T(S, 'dif', 1, 6.9, [`평균 차이 = ${(mb - ma).toFixed(1)} ms`, `difference in means = ${(mb - ma).toFixed(1)} ms`], 'prx-s prx-a', 1);
  T(S, 'f1', 1, 8.3, 't = (x̄₂ − x̄₁) / √(s₁²/n₁ + s₂²/n₂)', 'cz-mono prx-xs', 2);
  T(S, 'f2', 1, 9.4, `= ${(mb - ma).toFixed(1)} / ${se.toFixed(2)} = ${t.toFixed(2)}`, 'cz-mono prx-s prx-a', 2);
  T(S, 'f3', 1, 10.7, `s₁ = ${Math.sqrt(va).toFixed(1)} · s₂ = ${Math.sqrt(vb).toFixed(1)} · n = 8`, 'cz-mono prx-xs', 2);
  const F = fr(-4.5, 4.5, 0, .42, 14.2, 31, 7.8, 13.6);
  hl(S, 'px', F.L, F.R, F.Y(0), 'ink-3', 3, { w: .1 });
  [-4, -2, 0, 2, 4].forEach(v => T(S, 'pt' + v, F.X(v) - 1, F.B + .15, String(v), 'cz-tc cz-mono prx-xs', 3, { w: 2 }));
  shade(S, 'sl', F, u => tpdf(u, df), -4.5, -Math.abs(t), 'danger', 70, 4); shade(S, 'sr', F, u => tpdf(u, df), Math.abs(t), 4.5, 'danger', 70, 4);
  mplot(S, 'nc', F, u => [u, npdf(u)], -4.5, 4.5, { st: 3, color: 'ink-3', h: .07, n: 72 });
  mplot(S, 'tc', F, u => [u, tpdf(u, df)], -4.5, 4.5, { st: 3, color: 'accent', h: .13, n: 72 });
  mline(S, 'tv', F, [t, 0], [t, .3], { st: 4, color: 'danger', h: .1 });
  mT(S, 'tvl', F, [t, .3], -2.2, -.95, `t = ${t.toFixed(2)}`, 'cz-tc cz-mono prx-xs prx-r', 4, { w: 4.4 });
  T(S, 'd1', 1, 12.0, [`t분포 (자유도 ≈ ${Math.round(df)}) · 회색은 정규분포`, `t distribution (df ≈ ${Math.round(df)}) · grey is the normal`], 'prx-xs prx-a', 3);
  T(S, 'd2', 1, 13.2, [`p = ${p.toFixed(3)} < 0.05 → 유의해요 ✓`, `p = ${p.toFixed(3)} < 0.05 → significant ✓`], 'cz-mono prx-xs prx-g', 4);
  const pp = Math.round(p * 100);
  stepT(S, 'k', 1, 15.6, [[`기존과 개선 페이지의 로딩 시간 8번씩 · 평균이 ${Math.abs(mb - ma).toFixed(0)}ms 줄었는데, 진짜 줄었을까요?`, `load times, 8 runs each for the old and new page · the mean fell by ${Math.abs(mb - ma).toFixed(0)} ms. Is it real?`], ['t = 평균 차이 ÷ 그 차이의 표준오차 · 차이가 잡음보다 몇 배 큰지예요', 't = difference in means ÷ its standard error · how many times bigger than the noise'], ['σ를 모르고 표본이 작으면 정규분포보다 꼬리가 두꺼운 t분포로 판단해요', 'with σ unknown and small samples, judge against the heavier-tailed t distribution'], [`차이가 없다면 이만큼 극단적인 t가 나올 확률(p값)은 약 ${pp}% → 5% 기준으로 유의해요`, `if there were no difference, a t this extreme has about a ${pp}% chance (p) → significant at 5%`]]);
  fin(S, 'z', 15.6, [['t 검정: 평균의 차이가 표본의 흩어짐에 비해 충분히 큰지 판단해요', 'the t-test asks whether a difference in means beats the scatter of the samples', 'prx-xs prx-a'], ['같은 대상을 전후로 재면 대응 t 검정 · 셋 이상 그룹은 분산분석(ANOVA)', 'same subjects measured twice → paired t-test · three or more groups → ANOVA'], ['표본이 크면 t분포는 정규분포에 가까워져요 · 유의함이 곧 큰 효과는 아니에요', 'for large samples t approaches the normal · significant does not mean large']]);
  S.cap(1, '두 그룹의 평균', 'Two group means').cap(2, '차이 ÷ 잡음', 'Difference over noise').cap(3, 't분포', 'The t distribution').cap(4, 'p값', 'The p-value').cap(5, 't 검정', 'The t-test');
  return S;
}

return { css: CSSX, secs: [], add: {
  'pr-base': [
    item('pr-birthday', '생일 문제와 해시 충돌', 'The birthday problem and hash collisions', '23명만 모여도 생일이 같은 두 사람이 있을 확률이 50%를 넘어요. 비교할 쌍의 수가 사람 수의 제곱으로 늘기 때문이에요.', 'n명의 생일이 모두 다를 확률은 365/365 × 364/365 × … × (365 − n + 1)/365이고, 1에서 빼면 겹칠 확률이에요. 23명이면 50.7%, 50명이면 97%예요. 사람은 23명뿐이어도 쌍은 C(23, 2) = 253개라서, 쌍마다 1/365인 작은 확률이 금방 쌓여요. 근사식은 P ≈ 1 − e^(−n²/2N)이고, 값이 N가지일 때 약 1.18√N개를 뽑으면 충돌 확률이 50%가 돼요. 그래서 32비트 해시는 약 7만 7천 개, 64비트는 약 50억 개에서 충돌이 반반이에요. 이를 이용한 생일 공격 때문에 n비트 해시의 충돌 저항은 n/2비트뿐이라, SHA-256의 충돌 저항은 128비트로 봐요. 해시 테이블 크기, UUID·랜덤 ID 길이를 정할 때도 같은 계산을 써요.', 'With just 23 people, the chance that two share a birthday tops 50%, because the number of pairs grows with the square of the group size.', 'The probability that n birthdays are all different is 365/365 × 364/365 × … × (365 − n + 1)/365; subtracting it from 1 gives the chance of a match. It is 50.7% for 23 people and 97% for 50. Only 23 people, but C(23, 2) = 253 pairs, and the small 1/365 chance per pair adds up quickly. Approximately P ≈ 1 − e^(−n²/2N), so with N possible values a collision becomes a coin flip after about 1.18√N draws: roughly 77,000 for a 32-bit hash and 5 billion for a 64-bit one. The birthday attack exploits this, which is why an n-bit hash offers only n/2 bits of collision resistance (128 bits for SHA-256). The same calculation sizes hash tables, UUIDs and random IDs.', sBirthday())
  ],
  'pr-rv': [
    item('pr-cov', '공분산과 상관계수', 'Covariance and correlation', '두 변수가 함께 움직이는 정도예요. 공분산은 방향을, 상관계수 r은 그 세기를 −1부터 1 사이로 알려 줘요.', '공분산 Cov(X, Y) = E[(X − μx)(Y − μy)]는 평균에서의 편차를 곱해 평균 낸 값이에요. 두 변수가 같은 방향으로 움직이면 곱이 대부분 양수라 공분산이 +, 반대면 −예요. 표본에서는 Σ(x − x̄)(y − ȳ)/(n − 1)로 구하고, Cov(X, Y) = E[XY] − E[X]E[Y]로도 계산해요. 공분산은 단위에 따라 크기가 바뀌므로 두 표준편차로 나눈 상관계수 r = Cov(X, Y)/(σx σy)를 써요. r은 −1에서 1 사이이고, ±1이면 완벽한 직선 관계, 0이면 직선 관계가 없다는 뜻이에요. 하지만 r은 직선 관계만 재서 U자 같은 뚜렷한 관계도 0이 될 수 있고, 이상치 하나에 크게 흔들려요. 독립이면 공분산이 0이지만 그 역은 성립하지 않아요. Var(X + Y) = Var X + Var Y + 2Cov(X, Y)라서 포트폴리오 위험 계산에 쓰이고, 상관이 있어도 인과라는 뜻은 아니에요.', 'How strongly two variables move together. Covariance gives the direction; the correlation coefficient r gives the strength on a scale from −1 to 1.', 'Covariance Cov(X, Y) = E[(X − μx)(Y − μy)] averages the products of deviations from the means. When the variables move together most products are positive and the covariance is positive; when they move oppositely it is negative. From a sample it is Σ(x − x̄)(y − ȳ)/(n − 1), and it also equals E[XY] − E[X]E[Y]. Because covariance depends on units, we divide by both standard deviations to get the correlation r = Cov(X, Y)/(σx σy). r lies between −1 and 1: ±1 is a perfect straight line and 0 means no linear relationship. r measures only straight-line relationships, so a clear U shape can give r = 0, and a single outlier can swing it a lot. Independence implies zero covariance, but not the other way round. Var(X + Y) = Var X + Var Y + 2Cov(X, Y) is how portfolio risk is computed, and correlation never proves causation.', sCov())
  ],
  'pr-lim': [
    item('pr-markov', '마르코프 체인', 'Markov chains', '다음 상태가 지금 상태에만 달린 확률 과정이에요. 오래 굴리면 시작과 상관없이 정상 분포에 머물러요.', '마르코프 성질은 “미래는 현재에만 달리고 과거와는 무관하다”는 거예요. 상태 사이를 옮겨 갈 확률을 전이 행렬 P에 모으면 각 행의 합은 1이에요. 지금 분포가 πₜ이면 다음 분포는 πₜ₊₁ = πₜP이고, n단계 뒤는 π₀Pⁿ이에요. 예시의 날씨 체인은 맑은 날에서 시작해도 비 오는 날에서 시작해도 며칠 뒤에는 (5/13, 5/13, 3/13) ≈ (0.38, 0.38, 0.23)에 머물러요. 이렇게 π = πP를 만족하는 분포를 정상 분포라고 하고, 모든 상태가 서로 오갈 수 있고(기약) 주기가 없으면 하나로 수렴해요. 구글의 PageRank는 링크를 무작위로 따라가는 서퍼의 정상 분포이고, MCMC 샘플링, 큐잉 이론, n-gram 텍스트 생성, 강화학습의 마르코프 결정 과정도 같은 틀이에요.', 'A random process whose next state depends only on the current one. Run it long enough and it settles into a stationary distribution, whatever the start.', 'The Markov property says the future depends only on the present, not on the past. Transition probabilities between states form the matrix P, whose rows each sum to 1. If the current distribution is πₜ, the next is πₜ₊₁ = πₜP, and after n steps it is π₀Pⁿ. The example weather chain, started on a sunny day or a rainy one, settles after a few days at (5/13, 5/13, 3/13) ≈ (0.38, 0.38, 0.23). A distribution with π = πP is called stationary, and if every state can reach every other (irreducible) and there is no periodicity, the chain converges to a unique one. Google’s PageRank is the stationary distribution of a surfer following random links, and MCMC sampling, queueing theory, n-gram text generation and the Markov decision processes of reinforcement learning share the same framework.', sMarkov()),
    item('pr-bootstrap', '부트스트랩', 'The bootstrap', '가진 표본을 모집단처럼 여기고 복원 추출로 여러 번 다시 뽑아, 추정값이 얼마나 흔들리는지 재는 방법이에요.', '모집단에서 표본을 더 뽑을 수 없을 때, 가진 표본 n개에서 복원 추출로 n개를 다시 뽑아(같은 값이 여러 번 나올 수 있어요) 통계량을 계산하는 일을 수백~수천 번 반복해요. 이렇게 얻은 값들의 분포가 그 통계량의 표본분포를 흉내 내요. 그 표준편차가 표준오차의 추정값이고, 가운데 95%(2.5%와 97.5% 백분위)를 자르면 백분위 신뢰구간이 돼요. 평균처럼 공식이 있는 경우뿐 아니라 중앙값, 상관계수, 비율의 차이, 머신러닝 모델의 정확도처럼 공식이 어렵거나 없는 통계량에도 그대로 쓸 수 있는 게 장점이에요. 다만 표본이 너무 작거나 모집단을 대표하지 못하면 결과도 틀리고, 최댓값 같은 극단 통계량에는 잘 맞지 않아요. 랜덤 포레스트의 배깅(bootstrap aggregating)도 같은 아이디어예요.', 'Treat the sample you have as the population, resample it with replacement many times, and see how much an estimate wobbles.', 'When you cannot draw more data from the population, draw n values with replacement from your own n (the same value may repeat), compute the statistic, and repeat hundreds or thousands of times. The distribution of those values mimics the statistic’s sampling distribution. Its standard deviation estimates the standard error, and cutting out the middle 95% (the 2.5th and 97.5th percentiles) gives a percentile confidence interval. It works not only where formulas exist, like the mean, but also for medians, correlations, differences in proportions and the accuracy of machine-learning models, where formulas are hard or missing. It fails when the sample is tiny or unrepresentative, and it handles extreme statistics such as the maximum poorly. Bagging (bootstrap aggregating) in random forests uses the same idea.', sBoot())
  ],
  'pr-inf': [
    item('pr-ttest', 't 검정', 'The t-test', '두 그룹의 평균 차이가 우연인지 판단하는 검정이에요. 차이를 그 차이의 표준오차로 나눈 t를 t분포에 비춰 봐요.', '두 그룹의 평균 차이를 표준오차로 나누면 t = (x̄₂ − x̄₁)/√(s₁²/n₁ + s₂²/n₂)이에요. 차이가 잡음보다 몇 배 큰지를 나타내요. 모집단의 σ를 모르고 표본으로 추정하면 그 불확실성 때문에 정규분포보다 꼬리가 두꺼운 t분포를 따라요. 자유도가 작을수록 꼬리가 두껍고, 자유도가 커지면 정규분포에 가까워져요. 귀무가설(차이 없음)에서 관측한 t만큼 극단적인 값이 나올 확률이 p값이고, 보통 0.05보다 작으면 유의하다고 해요. 분산이 다를 수 있으면 웰치(Welch) t 검정을, 같은 대상을 전후로 재면 차이를 한 표본으로 보는 대응 t 검정을 써요. 셋 이상 그룹은 분산분석(ANOVA)으로 비교해요. 데이터가 대략 정규분포이거나 표본이 충분히 커야 하고, 유의하다는 것이 효과가 크다는 뜻은 아니니 효과 크기와 신뢰구간도 함께 봐요.', 'A test of whether the difference between two group means is just chance: divide the difference by its standard error and compare t with the t distribution.', 'Dividing the difference in means by its standard error gives t = (x̄₂ − x̄₁)/√(s₁²/n₁ + s₂²/n₂): how many times larger the difference is than the noise. Because σ is unknown and estimated from the sample, t follows the t distribution, whose tails are heavier than the normal’s; the fewer the degrees of freedom, the heavier the tails, and with many it approaches the normal. The p-value is the chance of a t at least this extreme if there were no difference (the null hypothesis), and below 0.05 is the usual bar for significance. Welch’s t-test allows unequal variances, the paired t-test treats before-and-after differences on the same subjects as one sample, and ANOVA compares three or more groups. The data should be roughly normal or the samples reasonably large, and significance is not size, so report effect sizes and confidence intervals too.', sTtest())
  ]
} };
})();

window.UX = page([
  sec('pr-base', '확률 기초', 'Basics', '확률의 기초', 'Probability basics',
    '사건, 조건부 확률, 독립, 그리고 베이즈 정리예요.', 'Events, conditional probability, independence and Bayes’ theorem.', [
    item('pr-sample', '표본공간, 사건, 확률의 공리', 'Sample spaces, events and axioms', '시행의 모든 결과를 모은 집합이 표본공간이고, 그 부분집합이 사건이에요. 확률은 0 ≤ P ≤ 1, P(S) = 1, 배반 사건의 합은 확률의 합이라는 세 공리를 따라요.', 'P(A∪B) = P(A) + P(B) − P(A∩B). 예: P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2 → 0.7. 여사건 P(Aᶜ) = 1 − P(A). "적어도 하나"는 여사건으로: 주사위 4번 중 6이 한 번 이상 = 1 − (5/6)⁴ ≈ 0.52.', 'The sample space is every outcome; events are its subsets. Probability obeys three axioms: 0 ≤ P ≤ 1, P(S) = 1, and additivity for disjoint events.', 'P(A∪B) = P(A) + P(B) − P(A∩B): 0.5 + 0.4 − 0.2 = 0.7. Complement P(Aᶜ) = 1 − P(A). “At least one” via the complement: a six in four rolls has probability 1 − (5/6)⁴ ≈ 0.52.', sSample()),
    item('pr-cond', '조건부 확률', 'Conditional probability', 'B가 일어났다는 정보가 있을 때 A의 확률이에요. 표본공간을 B로 줄여서 그 안에서 A의 비율을 봐요.', 'P(A|B) = P(A∩B)/P(B), 곱셈 법칙 P(A∩B) = P(B)P(A|B). 예: 두 주사위 합 ≥ 9(10가지)일 때 첫째가 6일 확률 = 4/10. P(A|B) ≠ P(B|A)에 주의 (검사 양성일 때 병 vs 병일 때 양성).', 'The probability of A once you know B happened: shrink the sample space to B and take A’s share of it.', 'P(A|B) = P(A∩B)/P(B); multiplication rule P(A∩B) = P(B)P(A|B). With two dice summing to at least 9 (10 outcomes), the first die is a six in 4 of them: 0.4. Beware P(A|B) ≠ P(B|A).', sCond()),
    item('pr-indep', '독립 사건', 'Independent events', '한 사건이 일어나도 다른 사건의 확률이 변하지 않으면 독립이에요. 그때 P(A∩B) = P(A)P(B)예요.', '⟺ P(A|B) = P(A). 예: 첫째 짝수(½)와 둘째 ≤ 2(⅓) → 겹침 6/36 = ½·⅓. 배반(동시에 못 일어남)과 독립은 다른 개념이고, 확률이 양수인 배반 사건은 종속이에요. 서로 독립인 n개 사건이 모두 일어날 확률 = 곱.', 'Independent means one event doesn’t change the other’s probability, so P(A∩B) = P(A)P(B).', 'Equivalently P(A|B) = P(A). First die even (½) and second die ≤ 2 (⅓) overlap in 6/36 = ½·⅓. Disjoint is not the same as independent; disjoint events with positive probability are dependent. For independent events, all happening = product.', sIndep()),
    item('pr-tree', '확률 트리와 전확률 공식', 'Probability trees and total probability', '단계별 확률을 가지로 그리고 경로를 따라 곱해요. 같은 결과로 가는 경로를 더하면 전확률이에요.', 'P(D) = Σ P(D|Bᵢ)P(Bᵢ). 예: 기계 A 60%(불량 2%), B 40%(불량 5%) → P(불량) = 0.012 + 0.020 = 0.032. 거꾸로 P(B|불량) = 0.020/0.032 = 0.625. Bᵢ들은 표본공간을 빠짐없이 겹치지 않게 나눠야 해요(분할).', 'Draw each stage as branches and multiply along paths; add the paths that reach the same outcome for the total probability.', 'P(D) = Σ P(D|Bᵢ)P(Bᵢ). Machine A makes 60% with 2% defects, B 40% with 5%: P(defect) = 0.012 + 0.020 = 0.032, and P(B | defect) = 0.020/0.032 = 0.625. The Bᵢ must partition the sample space.', sTree()),
    item('pr-bayes', '베이즈 정리', 'Bayes’ theorem', '관측(증거)을 보고 원인의 확률을 갱신해요. 사후확률 ∝ 가능도 × 사전확률이에요.', 'P(H|E) = P(E|H)P(H) / P(E). 예: 유병률 1%, 민감도 99%, 위양성 5% → 양성일 때 실제 환자일 확률 ≈ 16.7%(유병률 10%면 68.8%). 스팸 필터(나이브 베이즈), 의료 진단, A/B 테스트의 베이지안 해석에 써요.', 'Update the probability of a cause after seeing evidence: posterior ∝ likelihood × prior.', 'P(H|E) = P(E|H)P(H) / P(E). With 1% prevalence, 99% sensitivity and 5% false positives, a positive test means only ≈16.7% chance of disease (68.8% at 10% prevalence). Used in naive Bayes spam filters, diagnosis and Bayesian A/B testing.', sBayes())
  ].concat(XT.add['pr-base'] || [])),
  sec('pr-rv', '분포', 'Distributions', '확률변수와 확률분포', 'Random variables and distributions',
    '결과를 숫자로 바꾸고, 자주 쓰는 분포의 모양과 평균·분산을 익혀요.', 'Turn outcomes into numbers and learn the common distributions.', [
    item('pr-pmf', '확률변수와 확률질량함수', 'Random variables and the PMF', '표본공간의 각 결과에 숫자를 대응시킨 함수가 확률변수예요. 이산형이면 각 값의 확률 p(x) = P(X = x)를 나열해요.', '예: 두 주사위 합 P(X = x) = (6 − |x − 7|)/36, 7이 6/36으로 최대. 누적분포함수 F(x) = P(X ≤ x)는 비감소이고 0에서 1까지 올라가요. Σp(x) = 1.', 'A random variable assigns a number to each outcome; for discrete ones the PMF lists p(x) = P(X = x).', 'Sum of two dice: P(X = x) = (6 − |x − 7|)/36, peaking at 7 with 6/36. The CDF F(x) = P(X ≤ x) rises from 0 to 1 and never decreases. Σp(x) = 1.', sPmf()),
    item('pr-expect', '기댓값과 분산', 'Expectation and variance', '기댓값 E[X] = Σx·p(x)는 분포의 무게중심이고, 분산 Var X = E[(X − μ)²]은 퍼진 정도예요.', '주사위: E = 3.5, Var = E[X²] − μ² = 91/6 − 12.25 = 35/12, σ ≈ 1.71. E[aX + b] = aE[X] + b, Var(aX + b) = a²Var X. E[X + Y] = E[X] + E[Y]는 항상, Var(X + Y) = VarX + VarY는 독립일 때.', 'E[X] = Σx·p(x) is the balance point; Var X = E[(X − μ)²] measures spread.', 'A die has E = 3.5 and Var = E[X²] − μ² = 91/6 − 12.25 = 35/12, σ ≈ 1.71. E[aX + b] = aE[X] + b; Var(aX + b) = a²Var X. E[X + Y] = E[X] + E[Y] always; Var(X + Y) = VarX + VarY when independent.', sExpect()),
    item('pr-binom', '이항분포', 'Binomial distribution', '성공 확률 p인 독립 시행을 n번 할 때 성공 횟수의 분포예요. B(n, p)로 써요.', 'P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ, E = np, Var = np(1 − p). 예: 동전 10번 중 앞면 3번 = 120/1024 ≈ 0.117. n이 크면 정규분포 N(np, np(1 − p))로 근사해요. 베르누이 분포는 n = 1인 경우.', 'The number of successes in n independent trials with success probability p: B(n, p).', 'P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ, mean np, variance np(1 − p). Three heads in ten flips: 120/1024 ≈ 0.117. For large n it is approximately N(np, np(1 − p)). Bernoulli is the case n = 1.', sBinom()),
    item('pr-geom', '기하분포', 'Geometric distribution', '첫 성공이 나올 때까지의 시행 횟수예요. 매 단계 같은 비율 (1 − p)로 확률이 줄어요.', 'P(X = k) = (1 − p)ᵏ⁻¹p, E = 1/p, Var = (1 − p)/p². 예: 주사위로 6이 나올 때까지 평균 6번. 무기억성: P(X > m + n | X > m) = P(X > n). 재시도 횟수, 첫 버그까지의 테스트 수.', 'The number of trials until the first success; each probability is (1 − p) times the previous one.', 'P(X = k) = (1 − p)ᵏ⁻¹p, mean 1/p, variance (1 − p)/p²: a six takes 6 rolls on average. Memoryless: P(X > m + n | X > m) = P(X > n). Models retries until success.', sGeom()),
    item('pr-poisson', '포아송 분포', 'Poisson distribution', '일정한 시간·공간에서 드물게, 독립적으로 일어나는 사건의 수예요. 평균 λ 하나로 정해져요.', 'P(X = k) = e^(−λ)λᵏ/k!, E = Var = λ. 예: 시간당 평균 3건 → 정확히 3건 0.224, 0건 0.050. n 크고 p 작으면 B(n, p) ≈ Poisson(np). 서버 요청, 고장, 콜센터 트래픽 모델링.', 'Counts of rare, independent events in a fixed interval, set by a single mean λ.', 'P(X = k) = e^(−λ)λᵏ/k!, mean = variance = λ. At 3 per hour: exactly 3 has probability 0.224, none 0.050. For large n and small p, B(n, p) ≈ Poisson(np). Models server requests, failures and call traffic.', sPoisson()),
    item('pr-pdf', '연속확률변수와 확률밀도함수', 'Continuous variables and densities', '연속형은 한 점의 확률이 0이고, 구간의 확률이 밀도 곡선 아래 넓이예요.', 'P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx = F(b) − F(a), f = F′, ∫f = 1, f ≥ 0(1보다 클 수도 있어요). 예: f(x) = x/2 (0 ≤ x ≤ 2) → P(1 ≤ X ≤ 2) = 3/4. E[X] = ∫x f(x)dx. 균등분포 U(a, b)는 f = 1/(b − a).', 'For continuous variables single points have probability 0; probability is area under the density.', 'P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx = F(b) − F(a), with f = F′, ∫f = 1 and f ≥ 0 (possibly above 1). For f(x) = x/2 on [0, 2], P(1 ≤ X ≤ 2) = 3/4. E[X] = ∫x f(x)dx. Uniform U(a, b) has f = 1/(b − a).', sPdf()),
    item('pr-expo', '지수분포', 'Exponential distribution', '포아송 과정에서 다음 사건까지 기다리는 시간의 분포예요. 연속 분포 중 유일하게 무기억성을 가져요.', 'f(x) = λe^(−λx), P(X > t) = e^(−λt), E = 1/λ, Var = 1/λ². 예: λ = 0.5/분 → 평균 2분, 3분 넘게 기다릴 확률 e^(−1.5) ≈ 0.22, 이미 2분 기다렸어도 같아요. 부품 수명, 패킷 도착 간격.', 'The waiting time between events of a Poisson process; the only memoryless continuous distribution.', 'f(x) = λe^(−λx), P(X > t) = e^(−λt), mean 1/λ, variance 1/λ². With λ = 0.5 per minute the mean wait is 2 minutes and waiting over 3 has probability e^(−1.5) ≈ 0.22, even after already waiting 2. Lifetimes, packet gaps.', sExpo()),
    item('pr-normal', '정규분포', 'Normal distribution', '평균 μ를 중심으로 대칭인 종 모양 분포예요. 표준화 Z = (X − μ)/σ로 하나의 표로 계산해요.', '68-95-99.7 규칙(±1σ, ±2σ, ±3σ). 예: IQ μ = 100, σ = 15에서 130은 z = 2로 상위 약 2.3%. 독립 정규변수의 합도 정규. 측정 오차, 키, 표본평균(중심극한정리) 등 어디서나 나와요.', 'A symmetric bell around μ; standardize with Z = (X − μ)/σ to use one table.', 'The 68-95-99.7 rule for ±1σ, ±2σ, ±3σ. With IQ μ = 100, σ = 15, a score of 130 is z = 2, about the top 2.3%. Sums of independent normals are normal. It appears in measurement error, heights and, through the CLT, sample means.', sNormal()),
    item('pr-joint', '공분산과 상관계수', 'Covariance and correlation', '두 변수가 함께 변하는 정도가 공분산, 이를 −1에서 1로 표준화한 것이 상관계수예요.', 'Cov(X, Y) = E[XY] − E[X]E[Y], r = Cov/(σₓσᵧ). 독립이면 Cov = 0이지만 역은 아니에요(y = x²). Var(X + Y) = VarX + VarY + 2Cov. r은 직선 관계만 재고, 상관은 인과가 아니에요.', 'Covariance measures how two variables move together; correlation scales it to between −1 and 1.', 'Cov(X, Y) = E[XY] − E[X]E[Y], r = Cov/(σₓσᵧ). Independence implies Cov = 0 but not conversely (y = x²). Var(X + Y) = VarX + VarY + 2Cov. r captures only linear relations, and correlation is not causation.', sJoint())
  ].concat(XT.add['pr-rv'] || [])),
  sec('pr-lim', '극한·시뮬레이션', 'Limits & simulation', '극한 정리와 시뮬레이션', 'Limit theorems and simulation',
    '표본이 많아질 때 무슨 일이 일어나는지, 그리고 그것을 계산에 쓰는 법이에요.', 'What happens as samples grow, and how to compute with it.', [
    item('pr-lln', '큰 수의 법칙', 'Law of large numbers', '같은 시행을 많이 반복하면 표본평균이 기댓값에 가까워져요.', 'X̄ₙ → μ (n → ∞). 동전 앞면 비율이 0.5로 수렴. 오차 크기는 대략 σ/√n. 과거 결과를 "보정"하는 힘은 없고 희석될 뿐이에요(도박사의 오류). 보험료 산정, 카지노 수익의 근거.', 'Repeat a trial many times and the sample mean approaches the expected value.', 'X̄ₙ → μ as n → ∞: the share of heads tends to 0.5. Typical error is about σ/√n. Past luck is diluted, never corrected (gambler’s fallacy). Why insurers and casinos can plan.', sLln()),
    item('pr-clt', '중심극한정리', 'Central limit theorem', '독립이고 같은 분포를 따르는 변수를 많이 더하거나 평균 내면, 원래 분포와 상관없이 정규분포에 가까워져요.', 'X̄ ≈ N(μ, σ²/n), 합 ≈ N(nμ, nσ²). 예: 주사위 10개 합은 평균 35, 분산 29.2인 정규분포에 가까워요. 보통 n ≥ 30이면 충분(치우침이 크면 더). 신뢰구간과 가설검정의 바탕이에요.', 'Add or average many i.i.d. variables and the result approaches a normal distribution, whatever the original shape.', 'X̄ ≈ N(μ, σ²/n), sum ≈ N(nμ, nσ²). Ten dice sum to roughly normal with mean 35 and variance 29.2. Often n ≥ 30 suffices (more for heavy skew). It underpins confidence intervals and tests.', sClt()),
    item('pr-cheb', '마르코프·체비쇼프 부등식', 'Markov and Chebyshev inequalities', '분포를 몰라도 평균과 분산만으로 꼬리 확률의 상한을 줘요.', '마르코프: X ≥ 0이면 P(X ≥ a) ≤ E[X]/a. 체비쇼프: P(|X − μ| ≥ kσ) ≤ 1/k². 예: k = 2면 최대 25%(지수분포의 실제 값은 5%). 큰 수의 법칙 증명, 알고리즘 성능 분석에 써요.', 'Upper bounds on tail probabilities using only the mean and variance, for any distribution.', 'Markov: for X ≥ 0, P(X ≥ a) ≤ E[X]/a. Chebyshev: P(|X − μ| ≥ kσ) ≤ 1/k², so at most 25% for k = 2 (an exponential actually has 5%). Used to prove the law of large numbers and bound algorithm runtimes.', sCheb()),
    item('pr-montecarlo', '몬테카를로 방법', 'Monte Carlo methods', '무작위 표본을 많이 뽑아 확률·적분·기댓값을 어림해요. 차원이 높아도 쓸 수 있어요.', '예: 정사각형에 점을 찍어 사분원 안 비율 × 4 ≈ π. 오차 ∝ 1/√n이라 정확도 10배엔 표본 100배. 고차원 적분, 금융 위험(VaR), 렌더링(경로 추적), 게임 AI(MCTS), 베이지안 추론(MCMC).', 'Estimate probabilities, integrals and expectations from many random samples; works in high dimensions too.', 'Random points in a square: 4 × (share inside the quarter circle) ≈ π. Error ∝ 1/√n, so 10× accuracy costs 100× samples. Used for high-dimensional integrals, financial risk, path-traced rendering, game AI (MCTS) and Bayesian inference (MCMC).', sMonte())
  ].concat(XT.add['pr-lim'] || [])),
  sec('pr-inf', '통계적 추론', 'Inference', '통계적 추론', 'Statistical inference',
    '표본으로 모집단을 추정하고, 데이터로 주장을 검정해요.', 'Estimate populations from samples and test claims with data.', [
    item('pr-se', '표본분포와 표준오차', 'Sampling distributions and standard error', '표본평균도 확률변수예요. 그 분포는 μ를 중심으로 하고, 표준편차(표준오차)는 σ/√n이에요.', 'SE = σ/√n (σ를 모르면 s/√n). 예: σ = 1, n = 4 → 0.5, n = 25 → 0.2. 정밀도를 2배로 하려면 표본 4배. 표본분산은 n − 1로 나눠야 불편추정량이에요.', 'The sample mean is itself random, centered on μ with spread σ/√n: the standard error.', 'SE = σ/√n (s/√n when σ is unknown): σ = 1 gives 0.5 at n = 4 and 0.2 at n = 25. Doubling precision takes four times the data. Dividing the sample variance by n − 1 makes it unbiased.', sSe()),
    item('pr-ci', '신뢰구간', 'Confidence intervals', '추정값에 오차 범위를 붙인 구간이에요. 95% 신뢰구간은 같은 방법을 반복하면 95%가 참값을 포함한다는 뜻이에요.', 'x̄ ± z·σ/√n (95%: z = 1.96, 99%: 2.58). 예: n = 100, x̄ = 52, s = 10 → 52 ± 1.96 = [50.0, 54.0]. σ를 모르고 n이 작으면 t분포(자유도 n − 1). 비율은 p̂ ± 1.96√(p̂(1 − p̂)/n).', 'An estimate with an error margin; a 95% interval comes from a method that captures the true value 95% of the time.', 'x̄ ± z·σ/√n (z = 1.96 for 95%, 2.58 for 99%). With n = 100, x̄ = 52, s = 10: 52 ± 1.96 = [50.0, 54.0]. Small samples with unknown σ use t with n − 1 degrees of freedom. Proportions: p̂ ± 1.96√(p̂(1 − p̂)/n).', sCi()),
    item('pr-test', '가설검정과 p-값', 'Hypothesis tests and p-values', '귀무가설 H₀가 참이라고 가정하고, 관측한 데이터가 그 아래서 얼마나 극단적인지(p-값)를 봐요. p-값이 유의수준 α보다 작으면 H₀를 기각해요.', '예: 동전 100번 중 앞면 61번 → z = (61 − 50)/5 = 2.2, 양측 p ≈ 0.028 < 0.05 → 기각. p-값은 "H₀가 참일 확률"이 아니고, 효과의 크기도 말해주지 않아요. 단측/양측, z/t/χ² 검정.', 'Assume H₀ and ask how extreme the data are under it (the p-value); reject H₀ if p is below the significance level α.', '61 heads in 100 flips: z = (61 − 50)/5 = 2.2, two-sided p ≈ 0.028 < 0.05, so reject. A p-value is not the probability that H₀ is true and says nothing about effect size. One- vs two-sided; z, t and χ² tests.', sTest()),
    item('pr-errors', '1종·2종 오류와 검정력', 'Type I/II errors and power', '참인 H₀를 기각하는 1종 오류(확률 α)와 거짓인 H₀를 놓치는 2종 오류(확률 β)가 있어요. 1 − β가 검정력이에요.', '예: H₀: μ = 0, H₁: μ = 3(σ = 1), 단측 α = 0.05(기준 1.645) → β = Φ(1.645 − 3) ≈ 0.09, 검정력 ≈ 0.91. 기준을 옮기면 α와 β는 반대로 움직이고, 표본을 늘리면 둘 다 줄어요. 실험 전 검정력 분석으로 n을 정해요.', 'A type I error rejects a true H₀ (probability α); a type II error misses a false one (β). Power is 1 − β.', 'H₀: μ = 0 vs H₁: μ = 3 (σ = 1), one-sided α = 0.05 (cutoff 1.645): β = Φ(1.645 − 3) ≈ 0.09, power ≈ 0.91. Moving the cutoff trades α for β; more data shrinks both. Power analysis sets n before an experiment.', sErrors()),
    item('pr-mle', '최대우도추정', 'Maximum likelihood estimation', '관측한 데이터가 나올 가능성(가능도)을 가장 크게 만드는 모수를 추정값으로 골라요.', '예: 10번 중 앞면 7번 → L(p) = p⁷(1 − p)³, d/dp ln L = 0 → p̂ = 0.7. 정규분포 μ̂ = x̄, σ̂² = Σ(x − x̄)²/n. 로그가능도의 음수가 머신러닝의 손실 함수(교차 엔트로피)예요.', 'Choose the parameter that makes the observed data most likely.', 'Seven heads in ten: L(p) = p⁷(1 − p)³ and d/dp ln L = 0 gives p̂ = 0.7. For a normal sample μ̂ = x̄ and σ̂² = Σ(x − x̄)²/n. The negative log-likelihood is machine learning’s loss (cross-entropy).', sMle()),
    item('pr-regression', '회귀분석과 결정계수', 'Regression and R²', '최소제곱법으로 y = b₀ + b₁x를 맞추고, 설명된 변동의 비율 R²로 적합도를 봐요.', 'b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s_y/s_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, 단순회귀에서 R² = r². 잔차 그림으로 선형성·등분산 가정을 확인하고, 범위 밖 외삽과 인과 해석은 조심해요.', 'Fit y = b₀ + b₁x by least squares and judge it by R², the share of variation explained.', 'b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s_y/s_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, which equals r² in simple regression. Check linearity and constant variance with residual plots; beware extrapolation and causal claims.', sRegression()),
    item('pr-abtest', 'A/B 테스트', 'A/B testing', '사용자를 무작위로 두 그룹에 나눠 한 가지만 바꾼 뒤, 지표 차이가 우연인지 통계적으로 판단해요.', '예: A 100/2000 = 5%, B 130/2000 = 6.5% → 합동 p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041 → 5% 수준에서 유의. 표본 크기는 미리 정하고, 중간에 몰래 보고 멈추지 말고(peeking), 지표가 여럿이면 다중 비교를 보정해요.', 'Randomly split users, change one thing, and test whether the metric difference is more than chance.', 'A converts 100/2000 = 5%, B 130/2000 = 6.5%: pooled p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041, significant at 5%. Fix the sample size in advance, don’t peek and stop early, and correct for multiple metrics.', sAb())
  ].concat(XT.add['pr-inf'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.pr-b .in{font-weight:800;color:var(--ink)}
.pr-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.pr-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.pr-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.pr-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.pr-r .in{color:var(--danger);font-weight:800}
.pr-g .in{color:var(--ok);font-weight:800}
.pr-a .in{color:var(--accent);font-weight:800}
.pr-w .in{color:var(--warn);font-weight:800}
.pr-c .in{font-size:.6em;font-weight:700}
.pr-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
