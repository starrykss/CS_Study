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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono pr-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono pr-xs', st); };
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

window.UX = page([
  sec('pr-base', '확률 기초', 'Basics', '확률의 기초', 'Probability basics',
    '사건, 조건부 확률, 독립, 그리고 베이즈 정리예요.', 'Events, conditional probability, independence and Bayes’ theorem.', [
    item('pr-sample', '표본공간, 사건, 확률의 공리', 'Sample spaces, events and axioms', '시행의 모든 결과를 모은 집합이 표본공간이고, 그 부분집합이 사건이에요. 확률은 0 ≤ P ≤ 1, P(S) = 1, 배반 사건의 합은 확률의 합이라는 세 공리를 따라요.', 'P(A∪B) = P(A) + P(B) − P(A∩B). 예: P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2 → 0.7. 여사건 P(Aᶜ) = 1 − P(A). "적어도 하나"는 여사건으로: 주사위 4번 중 6이 한 번 이상 = 1 − (5/6)⁴ ≈ 0.52.', 'The sample space is every outcome; events are its subsets. Probability obeys three axioms: 0 ≤ P ≤ 1, P(S) = 1, and additivity for disjoint events.', 'P(A∪B) = P(A) + P(B) − P(A∩B): 0.5 + 0.4 − 0.2 = 0.7. Complement P(Aᶜ) = 1 − P(A). “At least one” via the complement: a six in four rolls has probability 1 − (5/6)⁴ ≈ 0.52.', sSample()),
    item('pr-cond', '조건부 확률', 'Conditional probability', 'B가 일어났다는 정보가 있을 때 A의 확률이에요. 표본공간을 B로 줄여서 그 안에서 A의 비율을 봐요.', 'P(A|B) = P(A∩B)/P(B), 곱셈 법칙 P(A∩B) = P(B)P(A|B). 예: 두 주사위 합 ≥ 9(10가지)일 때 첫째가 6일 확률 = 4/10. P(A|B) ≠ P(B|A)에 주의 (검사 양성일 때 병 vs 병일 때 양성).', 'The probability of A once you know B happened: shrink the sample space to B and take A’s share of it.', 'P(A|B) = P(A∩B)/P(B); multiplication rule P(A∩B) = P(B)P(A|B). With two dice summing to at least 9 (10 outcomes), the first die is a six in 4 of them: 0.4. Beware P(A|B) ≠ P(B|A).', sCond()),
    item('pr-indep', '독립 사건', 'Independent events', '한 사건이 일어나도 다른 사건의 확률이 변하지 않으면 독립이에요. 그때 P(A∩B) = P(A)P(B)예요.', '⟺ P(A|B) = P(A). 예: 첫째 짝수(½)와 둘째 ≤ 2(⅓) → 겹침 6/36 = ½·⅓. 배반(동시에 못 일어남)과 독립은 다른 개념이고, 확률이 양수인 배반 사건은 종속이에요. 서로 독립인 n개 사건이 모두 일어날 확률 = 곱.', 'Independent means one event doesn’t change the other’s probability, so P(A∩B) = P(A)P(B).', 'Equivalently P(A|B) = P(A). First die even (½) and second die ≤ 2 (⅓) overlap in 6/36 = ½·⅓. Disjoint is not the same as independent; disjoint events with positive probability are dependent. For independent events, all happening = product.', sIndep()),
    item('pr-tree', '확률 트리와 전확률 공식', 'Probability trees and total probability', '단계별 확률을 가지로 그리고 경로를 따라 곱해요. 같은 결과로 가는 경로를 더하면 전확률이에요.', 'P(D) = Σ P(D|Bᵢ)P(Bᵢ). 예: 기계 A 60%(불량 2%), B 40%(불량 5%) → P(불량) = 0.012 + 0.020 = 0.032. 거꾸로 P(B|불량) = 0.020/0.032 = 0.625. Bᵢ들은 표본공간을 빠짐없이 겹치지 않게 나눠야 해요(분할).', 'Draw each stage as branches and multiply along paths; add the paths that reach the same outcome for the total probability.', 'P(D) = Σ P(D|Bᵢ)P(Bᵢ). Machine A makes 60% with 2% defects, B 40% with 5%: P(defect) = 0.012 + 0.020 = 0.032, and P(B | defect) = 0.020/0.032 = 0.625. The Bᵢ must partition the sample space.', sTree()),
    item('pr-bayes', '베이즈 정리', 'Bayes’ theorem', '관측(증거)을 보고 원인의 확률을 갱신해요. 사후확률 ∝ 가능도 × 사전확률이에요.', 'P(H|E) = P(E|H)P(H) / P(E). 예: 유병률 1%, 민감도 99%, 위양성 5% → 양성일 때 실제 환자일 확률 ≈ 16.7%(유병률 10%면 68.8%). 스팸 필터(나이브 베이즈), 의료 진단, A/B 테스트의 베이지안 해석에 써요.', 'Update the probability of a cause after seeing evidence: posterior ∝ likelihood × prior.', 'P(H|E) = P(E|H)P(H) / P(E). With 1% prevalence, 99% sensitivity and 5% false positives, a positive test means only ≈16.7% chance of disease (68.8% at 10% prevalence). Used in naive Bayes spam filters, diagnosis and Bayesian A/B testing.', sBayes())
  ]),
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
  ]),
  sec('pr-lim', '극한·시뮬레이션', 'Limits & simulation', '극한 정리와 시뮬레이션', 'Limit theorems and simulation',
    '표본이 많아질 때 무슨 일이 일어나는지, 그리고 그것을 계산에 쓰는 법이에요.', 'What happens as samples grow, and how to compute with it.', [
    item('pr-lln', '큰 수의 법칙', 'Law of large numbers', '같은 시행을 많이 반복하면 표본평균이 기댓값에 가까워져요.', 'X̄ₙ → μ (n → ∞). 동전 앞면 비율이 0.5로 수렴. 오차 크기는 대략 σ/√n. 과거 결과를 "보정"하는 힘은 없고 희석될 뿐이에요(도박사의 오류). 보험료 산정, 카지노 수익의 근거.', 'Repeat a trial many times and the sample mean approaches the expected value.', 'X̄ₙ → μ as n → ∞: the share of heads tends to 0.5. Typical error is about σ/√n. Past luck is diluted, never corrected (gambler’s fallacy). Why insurers and casinos can plan.', sLln()),
    item('pr-clt', '중심극한정리', 'Central limit theorem', '독립이고 같은 분포를 따르는 변수를 많이 더하거나 평균 내면, 원래 분포와 상관없이 정규분포에 가까워져요.', 'X̄ ≈ N(μ, σ²/n), 합 ≈ N(nμ, nσ²). 예: 주사위 10개 합은 평균 35, 분산 29.2인 정규분포에 가까워요. 보통 n ≥ 30이면 충분(치우침이 크면 더). 신뢰구간과 가설검정의 바탕이에요.', 'Add or average many i.i.d. variables and the result approaches a normal distribution, whatever the original shape.', 'X̄ ≈ N(μ, σ²/n), sum ≈ N(nμ, nσ²). Ten dice sum to roughly normal with mean 35 and variance 29.2. Often n ≥ 30 suffices (more for heavy skew). It underpins confidence intervals and tests.', sClt()),
    item('pr-cheb', '마르코프·체비쇼프 부등식', 'Markov and Chebyshev inequalities', '분포를 몰라도 평균과 분산만으로 꼬리 확률의 상한을 줘요.', '마르코프: X ≥ 0이면 P(X ≥ a) ≤ E[X]/a. 체비쇼프: P(|X − μ| ≥ kσ) ≤ 1/k². 예: k = 2면 최대 25%(지수분포의 실제 값은 5%). 큰 수의 법칙 증명, 알고리즘 성능 분석에 써요.', 'Upper bounds on tail probabilities using only the mean and variance, for any distribution.', 'Markov: for X ≥ 0, P(X ≥ a) ≤ E[X]/a. Chebyshev: P(|X − μ| ≥ kσ) ≤ 1/k², so at most 25% for k = 2 (an exponential actually has 5%). Used to prove the law of large numbers and bound algorithm runtimes.', sCheb()),
    item('pr-montecarlo', '몬테카를로 방법', 'Monte Carlo methods', '무작위 표본을 많이 뽑아 확률·적분·기댓값을 어림해요. 차원이 높아도 쓸 수 있어요.', '예: 정사각형에 점을 찍어 사분원 안 비율 × 4 ≈ π. 오차 ∝ 1/√n이라 정확도 10배엔 표본 100배. 고차원 적분, 금융 위험(VaR), 렌더링(경로 추적), 게임 AI(MCTS), 베이지안 추론(MCMC).', 'Estimate probabilities, integrals and expectations from many random samples; works in high dimensions too.', 'Random points in a square: 4 × (share inside the quarter circle) ≈ π. Error ∝ 1/√n, so 10× accuracy costs 100× samples. Used for high-dimensional integrals, financial risk, path-traced rendering, game AI (MCTS) and Bayesian inference (MCMC).', sMonte())
  ]),
  sec('pr-inf', '통계적 추론', 'Inference', '통계적 추론', 'Statistical inference',
    '표본으로 모집단을 추정하고, 데이터로 주장을 검정해요.', 'Estimate populations from samples and test claims with data.', [
    item('pr-se', '표본분포와 표준오차', 'Sampling distributions and standard error', '표본평균도 확률변수예요. 그 분포는 μ를 중심으로 하고, 표준편차(표준오차)는 σ/√n이에요.', 'SE = σ/√n (σ를 모르면 s/√n). 예: σ = 1, n = 4 → 0.5, n = 25 → 0.2. 정밀도를 2배로 하려면 표본 4배. 표본분산은 n − 1로 나눠야 불편추정량이에요.', 'The sample mean is itself random, centered on μ with spread σ/√n: the standard error.', 'SE = σ/√n (s/√n when σ is unknown): σ = 1 gives 0.5 at n = 4 and 0.2 at n = 25. Doubling precision takes four times the data. Dividing the sample variance by n − 1 makes it unbiased.', sSe()),
    item('pr-ci', '신뢰구간', 'Confidence intervals', '추정값에 오차 범위를 붙인 구간이에요. 95% 신뢰구간은 같은 방법을 반복하면 95%가 참값을 포함한다는 뜻이에요.', 'x̄ ± z·σ/√n (95%: z = 1.96, 99%: 2.58). 예: n = 100, x̄ = 52, s = 10 → 52 ± 1.96 = [50.0, 54.0]. σ를 모르고 n이 작으면 t분포(자유도 n − 1). 비율은 p̂ ± 1.96√(p̂(1 − p̂)/n).', 'An estimate with an error margin; a 95% interval comes from a method that captures the true value 95% of the time.', 'x̄ ± z·σ/√n (z = 1.96 for 95%, 2.58 for 99%). With n = 100, x̄ = 52, s = 10: 52 ± 1.96 = [50.0, 54.0]. Small samples with unknown σ use t with n − 1 degrees of freedom. Proportions: p̂ ± 1.96√(p̂(1 − p̂)/n).', sCi()),
    item('pr-test', '가설검정과 p-값', 'Hypothesis tests and p-values', '귀무가설 H₀가 참이라고 가정하고, 관측한 데이터가 그 아래서 얼마나 극단적인지(p-값)를 봐요. p-값이 유의수준 α보다 작으면 H₀를 기각해요.', '예: 동전 100번 중 앞면 61번 → z = (61 − 50)/5 = 2.2, 양측 p ≈ 0.028 < 0.05 → 기각. p-값은 "H₀가 참일 확률"이 아니고, 효과의 크기도 말해주지 않아요. 단측/양측, z/t/χ² 검정.', 'Assume H₀ and ask how extreme the data are under it (the p-value); reject H₀ if p is below the significance level α.', '61 heads in 100 flips: z = (61 − 50)/5 = 2.2, two-sided p ≈ 0.028 < 0.05, so reject. A p-value is not the probability that H₀ is true and says nothing about effect size. One- vs two-sided; z, t and χ² tests.', sTest()),
    item('pr-errors', '1종·2종 오류와 검정력', 'Type I/II errors and power', '참인 H₀를 기각하는 1종 오류(확률 α)와 거짓인 H₀를 놓치는 2종 오류(확률 β)가 있어요. 1 − β가 검정력이에요.', '예: H₀: μ = 0, H₁: μ = 3(σ = 1), 단측 α = 0.05(기준 1.645) → β = Φ(1.645 − 3) ≈ 0.09, 검정력 ≈ 0.91. 기준을 옮기면 α와 β는 반대로 움직이고, 표본을 늘리면 둘 다 줄어요. 실험 전 검정력 분석으로 n을 정해요.', 'A type I error rejects a true H₀ (probability α); a type II error misses a false one (β). Power is 1 − β.', 'H₀: μ = 0 vs H₁: μ = 3 (σ = 1), one-sided α = 0.05 (cutoff 1.645): β = Φ(1.645 − 3) ≈ 0.09, power ≈ 0.91. Moving the cutoff trades α for β; more data shrinks both. Power analysis sets n before an experiment.', sErrors()),
    item('pr-mle', '최대우도추정', 'Maximum likelihood estimation', '관측한 데이터가 나올 가능성(가능도)을 가장 크게 만드는 모수를 추정값으로 골라요.', '예: 10번 중 앞면 7번 → L(p) = p⁷(1 − p)³, d/dp ln L = 0 → p̂ = 0.7. 정규분포 μ̂ = x̄, σ̂² = Σ(x − x̄)²/n. 로그가능도의 음수가 머신러닝의 손실 함수(교차 엔트로피)예요.', 'Choose the parameter that makes the observed data most likely.', 'Seven heads in ten: L(p) = p⁷(1 − p)³ and d/dp ln L = 0 gives p̂ = 0.7. For a normal sample μ̂ = x̄ and σ̂² = Σ(x − x̄)²/n. The negative log-likelihood is machine learning’s loss (cross-entropy).', sMle()),
    item('pr-regression', '회귀분석과 결정계수', 'Regression and R²', '최소제곱법으로 y = b₀ + b₁x를 맞추고, 설명된 변동의 비율 R²로 적합도를 봐요.', 'b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s_y/s_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, 단순회귀에서 R² = r². 잔차 그림으로 선형성·등분산 가정을 확인하고, 범위 밖 외삽과 인과 해석은 조심해요.', 'Fit y = b₀ + b₁x by least squares and judge it by R², the share of variation explained.', 'b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s_y/s_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, which equals r² in simple regression. Check linearity and constant variance with residual plots; beware extrapolation and causal claims.', sRegression()),
    item('pr-abtest', 'A/B 테스트', 'A/B testing', '사용자를 무작위로 두 그룹에 나눠 한 가지만 바꾼 뒤, 지표 차이가 우연인지 통계적으로 판단해요.', '예: A 100/2000 = 5%, B 130/2000 = 6.5% → 합동 p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041 → 5% 수준에서 유의. 표본 크기는 미리 정하고, 중간에 몰래 보고 멈추지 말고(peeking), 지표가 여럿이면 다중 비교를 보정해요.', 'Randomly split users, change one thing, and test whether the metric difference is more than chance.', 'A converts 100/2000 = 5%, B 130/2000 = 6.5%: pooled p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041, significant at 5%. Fix the sample size in advance, don’t peek and stop early, and correct for multiple metrics.', sAb())
  ])
]);
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
