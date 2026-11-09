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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'nu-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono nu-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono nu-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c nu-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- numerical-analysis helpers ---- */
const SUPM = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = s => String(s).split('').map(c => SUPM[c] || c).join(''), sub = n => String(n).split('').map(c => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('');
const fmtE = (v, d = 2) => { const [m, e] = v.toExponential(d).split('e'); return `${m} × 10${sup(+e)}`; };
const ell = (S, k, cx, cy, rx, ry, color, st, o = {}) => { S.el(k, { x: cx - rx, y: cy - ry, w: 2 * rx, h: 2 * ry, css: `border-radius:50%;border:${o.w || .1}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const mpoly = (S, k, F, pts, o = {}) => pts.slice(1).forEach((q, i) => mline(S, k + i, F, pts[i], q, Object.assign({}, o, { st: typeof o.st === 'function' ? o.st(i) : o.st })));
const mdots = (S, k, F, pts, st, sty, r, o) => pts.forEach((p, i) => { const x = p[0], y = p[1]; if (x >= F.x0 && x <= F.x1 && y >= F.y0 && y <= F.y1) mpt(S, k + i, F, p, typeof st === 'function' ? st(i) : st, sty, r, o); });
const xticks = (S, k, F, vals, lab, st) => vals.forEach((v, i) => T(S, k + i, F.X(v) - 1.5, F.B + .3, lab ? lab(v) : String(v), 'cz-tc cz-mono nu-xs', st, { w: 3 }));
const yticks = (S, k, F, vals, lab, st) => vals.forEach((v, i) => T(S, k + i, F.L - 3.2, F.Y(v) - .55, lab ? lab(v) : String(v), 'cz-mono nu-xs', st, { w: 3, css: 'text-align:right' }));
const hseg = (S, k, F, x0, y0, m, len, color, st, o = {}) => { const ux = (F.R - F.L) / (F.x1 - F.x0), uy = (F.B - F.T) / (F.y1 - F.y0), dt = len / Math.hypot(ux, uy * m) / 2; seg(S, k, [F.X(x0 - dt), F.Y(y0 - m * dt)], [F.X(x0 + dt), F.Y(y0 + m * dt)], st, color, o.h || .14, o); };
const S2 = Math.SQRT2;
const axLB = (S, k, F, st) => { hl(S, k + 'x', F.L, F.R, F.B, 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.L, F.T, F.B, 'ink-3', st, { w: .12 }); };

/* ================= errors & floating point ================= */
function sFloat() {
  const S = scene({ id: 'nu-float', steps: 5, per: 1.4 });
  const ex = '01111111011', fb = '1001'.repeat(12) + '1010';
  T(S, 'ls', 1.4, 1, ['부호', 'sign'], 'nu-xs'); T(S, 'le', 3.2, 1, ['지수 11비트', 'exponent, 11 bits'], 'nu-xs nu-w'); T(S, 'lf', 13.8, 1, ['가수 52비트', 'fraction, 52 bits'], 'nu-xs nu-a');
  cell(S, 's', 1.4, 2.4, 1.4, 1.8, '0', 'line', 40, 0);
  ex.split('').forEach((b, i) => { cell(S, 'e' + i, 3.2 + i * .92, 2.4, .82, 1.8, b, 'line', 40, 0); tsets(S, 'e' + i, [[2, 'warn', 45]]); });
  rect(S, 'f', 13.8, 2.4, 16.8, 1.8, 'line', 40, 0, { cls: 'cz-c cz-mono nu-fb', html: fb }); tsets(S, 'f', [[3, 'accent', 35]]);
  T(S, 'v1', 1.4, 5.4, '(−1)ˢ × 1.f × 2^(e − 1023)', 'cz-mono nu-l', 2);
  T(S, 'v2', 1.4, 7.2, ['e = 1019 → 2⁻⁴ · 1.f ≈ 1.6 → 1.6 × 0.0625 = 0.1', 'e = 1019 → 2⁻⁴ · 1.f ≈ 1.6 → 1.6 × 0.0625 = 0.1'], 'cz-mono nu-s', 2);
  T(S, 'v3', 1.4, 9.2, ['0.1 = 0.000110011001100…₂ 끝없이 반복 → 52비트에서 반올림', '0.1 = 0.000110011001100…₂ repeats forever → rounded at 52 bits'], 'nu-s', 3);
  T(S, 'v4', 1.4, 10.8, ['실제 저장값 0.1000000000000000055511…', 'actually stored: 0.1000000000000000055511…'], 'cz-mono nu-xs', 3);
  T(S, 'v5', 1.4, 12.8, '0.1 + 0.2 = 0.30000000000000004', 'cz-mono nu-l nu-r', 4);
  T(S, 'v6', 1.4, 14.6, ['그래서 a == b 대신 |a − b| < ε 로 비교해요', 'so compare |a − b| < ε instead of a == b'], 'nu-s', 4);
  T(S, 'v7', 1.4, 16.8, ['float32 유효숫자 약 7자리 · float64 약 16자리 · 최댓값 약 1.8 × 10³⁰⁸', 'float32 ≈ 7 significant digits · float64 ≈ 16 · max ≈ 1.8 × 10³⁰⁸'], 'nu-xs', 5);
  T(S, 'v8', 1.4, 18.2, ['돈 계산은 정수(원·센트 단위)나 decimal 타입으로', 'keep money in integer cents or a decimal type'], 'nu-xs nu-g', 5);
  S.cap(1, 'double 하나는 64비트: 부호, 지수, 가수', 'A double is 64 bits: sign, exponent, fraction')
    .cap(2, '과학적 표기법처럼 1.f × 2의 거듭제곱', 'Like scientific notation: 1.f times a power of two')
    .cap(3, '0.1은 이진수로 끝나지 않아 반올림돼요', '0.1 never terminates in binary, so it gets rounded')
    .cap(4, '작은 반올림 오차가 계산 결과에 드러나요', 'Those tiny rounding errors surface in results')
    .cap(5, 'IEEE 754: 거의 모든 언어와 CPU가 쓰는 표준', 'IEEE 754: the standard nearly every language and CPU uses');
  return S;
}
function sEps() {
  const S = scene({ id: 'nu-eps', steps: 5, per: 1.4 });
  const X = v => 2 + v * 7, Y0 = 7.4;
  T(S, 'h', 2, 1.4, ['가수 3비트짜리 장난감 부동소수점', 'a toy float with a 3-bit fraction'], 'nu-s');
  hl(S, 'ax', X(0), X(4.1), Y0, 'ink-3', 0, { w: .1 }); [0, 1, 2, 3, 4].forEach(v => T(S, 'n' + v, X(v) - 1, Y0 + 1.3, String(v), 'cz-tc cz-mono nu-xs', 0, { w: 2 }));
  [-1, 0, 1].forEach((e, j) => { for (let m = 0; m < 8; m++) vl(S, `t${j}_${m}`, X((1 + m / 8) * 2 ** e), Y0 - .9, Y0 + .9, ['ok', 'accent', 'warn'][j], j + 1, { w: .14 }); });
  vl(S, 't4', X(4), Y0 - .9, Y0 + .9, 'warn', 3, { w: .14 });
  T(S, 'g0', X(.5), Y0 - 2.6, ['간격 1/16', 'gap 1/16'], 'cz-mono nu-xs nu-g', 1); T(S, 'g1', X(1.2), Y0 - 2.6, ['간격 1/8', 'gap 1/8'], 'cz-mono nu-xs nu-a', 2); T(S, 'g2', X(2.6), Y0 - 2.6, ['간격 1/4', 'gap 1/4'], 'cz-mono nu-xs nu-w', 3);
  pt(S, 'p', X(2.6), Y0 + 2.9, 4, C.badf, .28); ar(S, 'pa', [X(2.6) - .1, Y0 + 2.9], [X(2.5) + .1, Y0 + 1.1], 'danger', 4, { h: .1 });
  T(S, 'pl', X(2.6) + .6, Y0 + 2.4, ['2.6 → 2.5로 반올림', '2.6 rounds to 2.5'], 'cz-mono nu-xs nu-r', 4);
  T(S, 'r1', 2, 12.4, ['2의 거듭제곱마다 간격이 2배 → 상대 간격은 일정', 'the gap doubles at each power of two → constant relative spacing'], 'nu-s', 3);
  T(S, 'r2', 2, 14, ['사이 값은 가장 가까운 수로: 상대 오차 ≤ ε/2', 'values in between round to the nearest: relative error ≤ ε/2'], 'nu-s nu-r', 4);
  T(S, 'r3', 2, 16, ['double의 기계 엡실론 ε = 2⁻⁵² ≈ 2.2 × 10⁻¹⁶', 'machine epsilon for doubles: ε = 2⁻⁵² ≈ 2.2 × 10⁻¹⁶'], 'cz-mono nu-s', 5);
  T(S, 'r4', 2, 17.6, ['1 + 10⁻¹⁷ == 1 · 2⁵³ + 1 == 2⁵³ (자바스크립트의 안전한 정수 한계)', '1 + 10⁻¹⁷ == 1 · 2⁵³ + 1 == 2⁵³ (JavaScript’s safe-integer limit)'], 'cz-mono nu-xs', 5);
  S.cap(1, '0.5~1 사이에는 1/16 간격으로 8개', 'Between 0.5 and 1: eight numbers, 1/16 apart')
    .cap(2, '1~2 사이에도 8개지만 간격은 1/8', 'Between 1 and 2: eight again, now 1/8 apart')
    .cap(3, '2~4 사이는 1/4 간격 · 클수록 듬성듬성', '2 to 4: 1/4 apart, sparser as numbers grow')
    .cap(4, '표현할 수 없는 값은 가장 가까운 수로 반올림', 'Anything else rounds to the nearest representable value')
    .cap(5, '1 바로 다음 수까지의 간격이 기계 엡실론', 'The gap just above 1 is machine epsilon');
  return S;
}
function sCancel() {
  const S = scene({ id: 'nu-cancel', steps: 5, per: 1.4 });
  const x = 1e15, a = Math.sqrt(x + 1), b = Math.sqrt(x), d = a - b, g = 1 / (a + b), A = a.toPrecision(17), B = b.toPrecision(17);
  let cp = 0; while (A[cp] === B[cp]) cp++;
  const dimd = s => `<span class="nu-dim">${s.slice(0, cp)}</span><span class="nu-red">${s.slice(cp)}</span>`, pct = Math.round(Math.abs(d - g) / g * 100);
  const D = ' '.repeat(A.indexOf('.') - 1) + d.toFixed(A.length - A.indexOf('.') - 1);
  T(S, 'h', 1.4, 1.2, ['x = 10¹⁵ 에서 √(x + 1) − √x 계산', 'computing √(x + 1) − √x at x = 10¹⁵'], 'cz-mono nu-s');
  T(S, 'la', 1.4, 3.6, '√(x + 1)', 'cz-mono nu-s'); T(S, 'lb', 1.4, 5.4, '√x', 'cz-mono nu-s');
  T(S, 'a1', 7, 3.4, A, 'cz-mono nu-l', 0, { off: 2 }); T(S, 'b1', 7, 5.2, B, 'cz-mono nu-l', 0, { off: 2 });
  T(S, 'a2', 7, 3.4, dimd(A), 'cz-mono nu-l', 2); T(S, 'b2', 7, 5.2, dimd(B), 'cz-mono nu-l', 2);
  hl(S, 'ln', 7, 17.4, 7.2, 'ink-2', 2, { w: .1 }); T(S, 'ld', 1.4, 7.8, ['차이', 'diff'], 'nu-s', 2); T(S, 'dd', 7, 7.6, D, 'cz-mono nu-l nu-r', 2);
  T(S, 'c1', 19.4, 3.6, ['둘 다 17자리까지 정확', 'both good to 17 digits'], 'nu-xs', 1);
  T(S, 'c2', 19.4, 5.4, [`앞 ${cp - 1}자리가 같아 빼면 사라져요`, `the first ${cp - 1} digits cancel`], 'nu-xs nu-r', 2);
  T(S, 'c3', 19.4, 7.8, [`계산값 ${fmtE(d)}`, `computed ${fmtE(d)}`], 'cz-mono nu-xs nu-r', 3);
  T(S, 'c4', 19.4, 9.2, [`참값 ${fmtE(g)}`, `true ${fmtE(g)}`], 'cz-mono nu-xs nu-g', 3);
  T(S, 'c5', 19.4, 10.6, [`상대 오차 ${pct}%`, `relative error ${pct}%`], 'nu-s nu-r', 3);
  T(S, 'w1', 1.4, 12.4, '√(x + 1) − √x = 1 / (√(x + 1) + √x)', 'cz-mono nu-s', 4);
  T(S, 'w2', 1.4, 14, [`= ${fmtE(g, 10)} · 뺄셈이 없어 정확 ✓`, `= ${fmtE(g, 10)} · no subtraction, full precision ✓`], 'cz-mono nu-s nu-g', 4);
  T(S, 'n1', 1.4, 16.4, ['근의 공식도 b² ≫ 4ac 이면 같은 문제 → 큰 근을 먼저 구하고 x₂ = c / (a·x₁)', 'the quadratic formula hits this when b² ≫ 4ac → find the large root first, then x₂ = c / (a·x₁)'], 'nu-xs', 5);
  T(S, 'n2', 1.4, 17.8, ['log1p·expm1 함수, 분산의 웰퍼드 알고리즘이 같은 이유로 있어요', 'log1p, expm1 and Welford’s variance algorithm exist for the same reason'], 'nu-xs', 5);
  S.cap(1, '거의 같은 두 수를 각각 정확히 계산해도', 'Compute two nearly equal numbers, each accurately')
    .cap(2, '빼는 순간 앞자리가 모두 지워지고', 'Subtracting wipes out the leading digits')
    .cap(3, '남은 건 반올림 오차뿐이라 결과가 크게 틀려요', 'What’s left is mostly rounding noise')
    .cap(4, '식을 바꿔 뺄셈을 없애면 정확해요', 'Rewrite the formula to avoid the subtraction')
    .cap(5, '파국적 상쇄: 수치 코드에서 가장 흔한 정밀도 손실', 'Catastrophic cancellation: the most common loss of precision');
  return S;
}
function sCond() {
  const S = scene({ id: 'nu-cond', steps: 5, per: 1.4 });
  const L = fr(-.5, 2.5, -.5, 2.5, 1.6, 14.6, 2.6, 15.6), R = fr(-.5, 2.5, -.5, 2.5, 17.4, 30.4, 2.6, 15.6);
  [[L, 'l', 0], [R, 'r', 3]].forEach(([F, k, st]) => { hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .08 }); vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .08 }); });
  T(S, 'tl', 1.6, 1, ['잘 조건화된 문제', 'well-conditioned'], 'nu-s nu-g'); T(S, 'tr', 17.4, 1, ['나쁜 조건의 문제', 'ill-conditioned'], 'nu-s nu-r', 3);
  mline(S, 'l1', L, [-1, 3], [3, -1], { color: 'accent', h: .14 }); mline(S, 'l2', L, [-1, -1], [3, 3], { color: 'warn', h: .14 });
  mline(S, 'l3', L, [-1, -1.1], [3, 2.9], { st: 2, color: 'warn', h: .12, dash: 1 });
  mpt(S, 'lp', L, [1, 1], 1, C.cur, .34); mpt(S, 'lq', L, [1.05, .95], 2, C.okf, .34);
  mline(S, 'r1', R, [-1, 3], [3, -1], { st: 3, color: 'accent', h: .14 }); mline(S, 'r2', R, [-1, (2.1 + 1) / 1.1], [3, (2.1 - 3) / 1.1], { st: 3, color: 'warn', h: .14 });
  mline(S, 'r3', R, [-1, (2.2 + 1) / 1.1], [3, (2.2 - 3) / 1.1], { st: 4, color: 'warn', h: .12, dash: 1 });
  mpt(S, 'rp', R, [1, 1], 3, C.cur, .34); mpt(S, 'rq', R, [0, 2], 4, C.badf, .34); mar(S, 'rj', R, [.92, 1.08], [.1, 1.9], 'danger', 4, { h: .1 });
  T(S, 'k1', 1.6, 16.4, ['κ = 1 · 오른쪽 변 0.1 변화 → 해 0.07 이동', 'κ = 1 · right side moves 0.1 → solution moves 0.07'], 'nu-xs nu-g', 2);
  T(S, 'k2', 17.4, 16.4, ['κ ≈ 42 · 같은 0.1 변화 → 해 1.41 이동', 'κ ≈ 42 · the same 0.1 → solution moves 1.41'], 'nu-xs nu-r', 4);
  T(S, 'k3', 1, 18, ['κ(A) = ‖A‖·‖A⁻¹‖ · 입력의 상대 오차가 최대 κ배로 커져서 대략 log₁₀κ 자리를 잃어요', 'κ(A) = ‖A‖·‖A⁻¹‖ · relative input error can grow κ-fold, costing about log₁₀κ digits'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'k4', 1, 19.4, ['10×10 힐베르트 행렬은 κ ≈ 1.6 × 10¹³ · 스케일 조정과 정규화로 완화해요', 'the 10×10 Hilbert matrix has κ ≈ 1.6 × 10¹³ · rescaling and regularization help'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '넓은 각도로 만나는 두 직선 (연립방정식)', 'Two lines crossing at a wide angle (a linear system)')
    .cap(2, '식을 조금 바꿔도 교점은 조금만 움직여요', 'Nudge one equation and the solution barely moves')
    .cap(3, '거의 평행한 두 직선은', 'Two nearly parallel lines')
    .cap(4, '같은 크기의 변화에도 교점이 멀리 튀어요', 'jump far for the same small nudge')
    .cap(5, '조건수는 입력 오차가 출력에서 몇 배로 커지는지 알려줘요', 'The condition number bounds how much input error gets amplified');
  return S;
}
function sTrunc() {
  const S = scene({ id: 'nu-trunc', steps: 5, per: 1.4 });
  const F = fr(-16.5, .5, -12.5, 1, 4.4, 21.4, 2.6, 15.4), lg10 = v => Math.log10(Math.max(v, 1e-13));
  const fw = [], ce = []; for (let k = 0; k <= 16; k++) { const h = 10 ** -k; fw.push([-k, lg10(Math.abs((Math.sin(1 + h) - Math.sin(1)) / h - Math.cos(1)))]); ce.push([-k, lg10(Math.abs((Math.sin(1 + h) - Math.sin(1 - h)) / (2 * h) - Math.cos(1)))]); }
  axLB(S, 'ga', F); xticks(S, 'xt', F, [-16, -12, -8, -4, 0], v => '10' + sup(v)); yticks(S, 'yt', F, [-12, -8, -4, 0], v => '10' + sup(v));
  T(S, 'xl', F.R - 2, F.B + 1.6, 'h', 'cz-mono nu-xs'); T(S, 'h', 4.4, 1, ['(sin(1 + h) − sin 1) / h 의 오차', 'error of (sin(1 + h) − sin 1) / h'], 'cz-mono nu-xs');
  const fa = fw.slice().reverse(), ca = ce.slice().reverse();
  mpoly(S, 'f', F, fa, { st: i => i < 8 ? 1 : 2, color: 'accent', h: .12 }); mdots(S, 'fd', F, fa, i => i <= 8 ? 1 : 2, C.cur, .26);
  mpoly(S, 'c', F, ca, { st: 4, color: 'warn', h: .12 }); mdots(S, 'cd', F, ca, 4, C.warn, .24);
  ring(S, 'mn', F.X(-8), F.Y(fw[8][1]), .9, 'ok', 3, { w: .14 });
  T(S, 'r1', 23, 2.6, ['h가 크면: 절단 오차 ∝ h', 'large h: truncation ∝ h'], 'nu-xs', 1);
  T(S, 'r2', 23, 4.2, ['h가 작으면: 반올림 오차 ∝ ε/h', 'tiny h: rounding ∝ ε/h'], 'nu-xs nu-r', 2);
  T(S, 'r3', 23, 6.2, ['최적 h ≈ √ε ≈ 10⁻⁸', 'best h ≈ √ε ≈ 10⁻⁸'], 'cz-mono nu-xs nu-g', 3); T(S, 'r4', 23, 7.6, ['오차 ≈ 10⁻⁸ (8자리)', 'error ≈ 10⁻⁸ (8 digits)'], 'nu-xs', 3);
  T(S, 'r5', 23, 9.8, ['중앙 차분: 오차 ∝ h²', 'central: error ∝ h²'], 'nu-xs nu-w', 4); T(S, 'r6', 23, 11.2, ['h ≈ 10⁻⁵에서 10⁻¹¹', '10⁻¹¹ at h ≈ 10⁻⁵'], 'cz-mono nu-xs nu-w', 4);
  T(S, 'f', 1, 18.6, ['h를 무작정 줄이면 오히려 나빠져요 · 자동 미분은 이 문제가 없어요', 'shrinking h blindly backfires · automatic differentiation avoids the problem'], 'cz-tc nu-s', 5, { w: 30 });
  S.cap(1, '전진 차분으로 sin의 도함수를 근사: h를 줄이면 오차도 줄다가', 'Approximate sin′ with a forward difference: shrinking h helps at first')
    .cap(2, '너무 작아지면 반올림 오차 때문에 다시 커져요', 'then rounding error takes over and it climbs again')
    .cap(3, '두 오차가 만나는 곳이 최적의 h', 'The best h sits where the two errors meet')
    .cap(4, '중앙 차분은 절단 오차가 h²라 더 정확해요', 'Central differences, with h² truncation error, do better')
    .cap(5, '수치 오차 = 절단 오차 + 반올림 오차', 'Numerical error = truncation error + rounding error');
  return S;
}

/* ================= root finding ================= */
const f2 = x => x * x - 2;
function sBisect() {
  const S = scene({ id: 'nu-bisect', steps: 5, per: 1.4 });
  const F = fr(.8, 2.2, -1.6, 2.6, 2, 19, 2.6, 15.6), iv = [[1, 2]];
  for (let i = 0; i < 4; i++) { const [a, b] = iv[i], m = (a + b) / 2; iv.push(f2(m) > 0 ? [a, m] : [m, b]); }
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .1 }); mplot(S, 'c', F, x => [x, f2(x)], .8, 2.2, { n: 40, color: 'accent', h: .2 });
  T(S, 'h', 2, 1, 'f(x) = x² − 2', 'cz-mono nu-s'); xticks(S, 'xt', F, [1, 1.5, 2], null);
  iv.forEach(([a, b], n) => { hl(S, 'iv' + n, F.X(a), F.X(b), F.Y(0) + 1.4, ['accent', 'warn', 'ok', 'accent', 'warn'][n], n, { w: .5, off: n < 4 ? n + 1 : 0 });
    T(S, 'tb' + n, 20.4, 2.6 + n * 1.5, `[${a}, ${b}]`, 'cz-mono nu-s', n); });
  iv.slice(0, 4).forEach(([a, b], n) => { const m = (a + b) / 2, st = n + 1; vl(S, 'mv' + n, F.X(m), F.Y(0), F.Y(f2(m)), 'ink-3', st, { w: .08, dash: 1, off: st + 1 }); mpt(S, 'md' + n, F, [m, f2(m)], st, f2(m) > 0 ? C.badf : C.okf, .32);
    mT(S, 'ms' + n, F, [m, f2(m)], .4, f2(m) > 0 ? -1.2 : .2, f2(m) > 0 ? '+' : '−', 'cz-mono nu-l', st, { off: st + 1 }); });
  T(S, 'r1', 20.4, 10.6, ['폭 = 2⁻ⁿ', 'width = 2⁻ⁿ'], 'cz-mono nu-s', 4);
  T(S, 'r2', 20.4, 12.2, ['10자리 정확도 ≈ 34번', '10 digits ≈ 34 steps'], 'nu-xs', 5); T(S, 'r3', 20.4, 13.6, ['느리지만 반드시 수렴', 'slow but guaranteed'], 'nu-xs nu-g', 5);
  T(S, 'f', 1, 18.2, ['조건: f(a)와 f(b)의 부호가 달라야 해요 (중간값 정리) · git bisect도 같은 아이디어', 'needs f(a) and f(b) of opposite signs (intermediate value theorem) · git bisect uses the same idea'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '[1, 2]의 중점 1.5에서 f > 0 → 근은 왼쪽 절반에', 'At the midpoint 1.5, f > 0, so the root is in the left half')
    .cap(2, '1.25에서 f < 0 → 오른쪽 절반', 'At 1.25, f < 0: keep the right half')
    .cap(3, '1.375에서 f < 0 → 다시 오른쪽 절반', 'At 1.375, f < 0: right half again')
    .cap(4, '1.4375에서 f > 0 → 구간이 계속 절반으로', 'At 1.4375, f > 0: the interval keeps halving')
    .cap(5, '이분법: 한 번에 1비트씩 근을 알아내요', 'Bisection learns the root one bit per step');
  return S;
}
function sNewton() {
  const S = scene({ id: 'nu-newton', steps: 5, per: 1.4 });
  const F = fr(.9, 2.3, -1.4, 3.2, 2, 19, 2.6, 15.6), xs = [2]; for (let i = 0; i < 4; i++) { const x = xs[i]; xs.push(x - f2(x) / (2 * x)); }
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .1 }); mplot(S, 'c', F, x => [x, f2(x)], .9, 2.3, { n: 40, color: 'accent', h: .2 }); xticks(S, 'xt', F, [1, 1.5, 2], null);
  mpt(S, 'p0', F, [2, 2], 0, C.cur, .32);
  for (let n = 0; n < 3; n++) { const x = xs[n], y = f2(x), x1 = xs[n + 1], st = n + 1;
    mline(S, 't' + n, F, [x + .12, y + .24 * x], [x1 - .08, -.16 * x], { st, color: 'warn', h: .12 });
    vl(S, 'v' + n, F.X(x1), F.Y(0), F.Y(f2(x1)), 'ink-3', st, { w: .08, dash: 1 }); mpt(S, 'p' + (n + 1), F, [x1, f2(x1)], st, C.cur, .3); mpt(S, 'z' + n, F, [x1, 0], st, C.warn, .22); }
  const tru = '1.41421356237310', dig = v => { const s = v.toFixed(14); let i = 0; while (s[i] === tru[i]) i++; return `<span class="nu-ok">${s.slice(0, i)}</span>${s.slice(i)}`; };
  xs.forEach((x, n) => T(S, 'r' + n, 20.2, 2.6 + n * 1.5, `x${sub(n)} = ${dig(x)}`, 'cz-mono nu-xs', n));
  T(S, 'g1', 20.2, 10.4, ['맞는 자리 1 → 3 → 6 → 12', 'correct digits 1 → 3 → 6 → 12'], 'nu-s nu-g', 4); T(S, 'g2', 20.2, 12, ['이차 수렴: 매번 두 배', 'quadratic: doubling each step'], 'nu-xs', 4);
  T(S, 'f1', 1, 17.2, 'xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)', 'cz-tc cz-mono nu-l', 1, { w: 30 });
  T(S, 'f2', 1, 19, ['f′가 필요하고, 시작점이 나쁘면 발산할 수 있어요 · sqrt 구현, 2차 최적화에 써요', 'needs f′ and can diverge from a bad start · used in sqrt routines and second-order optimizers'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, 'x₀ = 2에서 접선을 긋고 x축과 만나는 점으로', 'Draw the tangent at x₀ = 2 and move to where it meets the axis')
    .cap(2, '그 점에서 다시 접선', 'Repeat from the new point')
    .cap(3, '세 번 만에 √2에 거의 붙어요', 'After three steps it is practically on √2')
    .cap(4, '맞는 자릿수가 매번 두 배로 늘어요', 'The number of correct digits doubles each time')
    .cap(5, '뉴턴 방법: 곡선을 접선으로 바꿔 푸는 반복', 'Newton’s method: replace the curve by its tangent, again and again');
  return S;
}
function sSecant() {
  const S = scene({ id: 'nu-secant', steps: 5, per: 1.4 });
  const F = fr(.9, 2.3, -1.4, 3.2, 2, 19, 2.6, 15.6), xs = [1, 2]; for (let i = 1; i < 5; i++) { const a = xs[i - 1], b = xs[i]; xs.push(b - f2(b) * (b - a) / (f2(b) - f2(a))); }
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .1 }); mplot(S, 'c', F, x => [x, f2(x)], .9, 2.3, { n: 40, color: 'accent', h: .2 }); xticks(S, 'xt', F, [1, 1.5, 2], null);
  mpt(S, 'p0', F, [1, -1], 0, C.cur, .32); mpt(S, 'p1', F, [2, 2], 0, C.cur, .32);
  for (let n = 1; n <= 3; n++) { const a = xs[n - 1], b = xs[n], c = xs[n + 1], s = (f2(b) - f2(a)) / (b - a), lo = Math.min(a, b, c) - .06, hi = Math.max(a, b, c) + .06, st = n;
    mline(S, 's' + n, F, [lo, f2(a) + s * (lo - a)], [hi, f2(a) + s * (hi - a)], { st, color: 'warn', h: .12 });
    vl(S, 'v' + n, F.X(c), F.Y(0), F.Y(f2(c)), 'ink-3', st, { w: .08, dash: 1 }); mpt(S, 'p' + (n + 1), F, [c, f2(c)], st, C.cur, .3); }
  xs.forEach((x, n) => T(S, 'r' + n, 20.2, 2.6 + n * 1.4, `x${sub(n)} = ${x.toFixed(6)}`, 'cz-mono nu-xs', Math.max(0, n - 1)));
  T(S, 'g1', 20.2, 11.4, ['수렴 차수 ≈ 1.618', 'order ≈ 1.618'], 'nu-s nu-a', 4); T(S, 'g2', 20.2, 12.9, ['도함수 없이 함숫값만', 'no derivative needed'], 'nu-xs', 4);
  T(S, 'f1', 1, 17.2, 'xₙ₊₁ = xₙ − f(xₙ)·(xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))', 'cz-tc cz-mono nu-s', 1, { w: 30 });
  T(S, 'f2', 1, 19, ['브렌트 방법(scipy brentq)은 이분법의 안전성과 할선법의 속도를 합쳐요', 'Brent’s method (scipy’s brentq) pairs bisection’s safety with secant speed'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '두 점을 잇는 할선이 x축과 만나는 곳으로', 'Join two points and move to where the secant meets the axis')
    .cap(2, '가장 최근 두 점으로 반복', 'Repeat with the two newest points')
    .cap(3, '도함수 없이도 빠르게 다가가요', 'It closes in fast without any derivative')
    .cap(4, '수렴 차수는 황금비 1.618', 'Its order of convergence is the golden ratio, 1.618')
    .cap(5, '실무에선 이분법과 섞은 브렌트 방법을 많이 써요', 'In practice Brent’s method blends it with bisection');
  return S;
}
function sFixed() {
  const S = scene({ id: 'nu-fixed', steps: 5, per: 1.4 });
  const F = fr(0, 1.6, 0, 1.3, 2, 18, 2.6, 15.6), xs = [.2]; for (let i = 0; i < 10; i++) xs.push(Math.cos(xs[i]));
  ax2(S, 'ga', F, 'x', 'y'); mplot(S, 'c', F, x => [x, Math.cos(x)], 0, 1.6, { n: 40, color: 'accent', h: .2 }); mline(S, 'id', F, [0, 0], [1.3, 1.3], { color: 'ink-3', h: .12 });
  T(S, 'lc', F.X(1.25), F.Y(Math.cos(1.25)) + .2, 'y = cos x', 'cz-mono nu-xs nu-a'); T(S, 'li', F.X(1.05), F.Y(1.25) - .4, 'y = x', 'cz-mono nu-xs');
  mpt(S, 'p0', F, [xs[0], 0], 0, C.warn, .26);
  for (let n = 0; n < 9; n++) { const x = xs[n], y = xs[n + 1], st = n < 2 ? 2 : 3;
    mline(S, 'u' + n, F, [x, n ? x : 0], [x, y], { st, color: 'warn', h: .1 }); mline(S, 'w' + n, F, [x, y], [y, y], { st, color: 'warn', h: .1 }); }
  mpt(S, 'fp', F, [.739085, .739085], 4, C.okf, .34);
  T(S, 'r1', 19.6, 2.6, 'xₙ₊₁ = cos(xₙ)', 'cz-mono nu-l', 1);
  T(S, 'r2', 19.6, 4.4, `${xs[0].toFixed(3)} → ${xs[1].toFixed(3)} → ${xs[2].toFixed(3)}`, 'cz-mono nu-xs', 2);
  T(S, 'r3', 19.6, 5.8, `→ ${xs[3].toFixed(3)} → ${xs[4].toFixed(3)} → ${xs[5].toFixed(3)} …`, 'cz-mono nu-xs', 3);
  T(S, 'r4', 19.6, 8, 'x* = cos x* = 0.739085', 'cz-mono nu-s nu-g', 4);
  T(S, 'r5', 19.6, 9.8, '|g′(x*)| = sin 0.739 ≈ 0.67', 'cz-mono nu-xs', 4); T(S, 'r6', 19.6, 11.2, ['→ 오차가 매번 약 0.67배', '→ error × 0.67 per step'], 'nu-xs', 4);
  T(S, 'r7', 19.6, 13.2, ['|g′| > 1 이면 발산', 'diverges if |g′| > 1'], 'nu-xs nu-r', 5);
  T(S, 'f', 1, 18, ['PageRank, 강화학습의 가치 반복, “바뀌지 않을 때까지 반복”하는 계산은 모두 고정점 반복이에요', 'PageRank, value iteration in RL and every “repeat until it stops changing” loop are fixed-point iterations'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, 'x = cos x 를 풀려면', 'To solve x = cos x')
    .cap(2, '결과를 다시 넣는 걸 반복해요', 'feed the output back in, again and again')
    .cap(3, '거미줄처럼 감기며 교점으로 다가가요', 'The cobweb spirals in on the crossing')
    .cap(4, '교점에서 기울기의 크기가 1보다 작아서 수렴', 'It converges because the slope there is smaller than 1 in size')
    .cap(5, '고정점 반복: 가장 단순한 반복법', 'Fixed-point iteration: the simplest iterative method');
  return S;
}
function sConv() {
  const S = scene({ id: 'nu-conv', steps: 5, per: 1.4 });
  const F = fr(0, 12, -16, .5, 4.4, 21.4, 2.6, 15.4), r = S2, L = e => Math.max(Math.log10(Math.max(e, 1e-16)), -16);
  const bi = [], se = [], ne = []; let a = 1, b = 2; for (let n = 0; n <= 60; n++) { const m = (a + b) / 2; bi.push(Math.abs(m - r)); if (f2(m) > 0) b = m; else a = m; }
  let p = 1, q = 2; se.push(Math.abs(p - r), Math.abs(q - r)); for (let n = 0; n < 12 && f2(q) !== f2(p); n++) { const c = q - f2(q) * (q - p) / (f2(q) - f2(p)); p = q; q = c; se.push(Math.abs(c - r)); }
  let x = 2; ne.push(Math.abs(x - r)); for (let n = 0; n < 8; n++) { x = x - f2(x) / (2 * x); ne.push(Math.abs(x - r)); }
  const cnt = arr => arr.findIndex(e => e < 1e-15), nb = cnt(bi), ns = cnt(se), nn = cnt(ne);
  const cut = arr => { const i = arr.findIndex(e => e < 1e-15); return (i < 0 ? arr : arr.slice(0, i + 1)).slice(0, 13).map((e, n) => [n, L(e)]); };
  axLB(S, 'ga', F); xticks(S, 'xt', F, [0, 4, 8, 12], null); yticks(S, 'yt', F, [0, -4, -8, -12, -16], v => '10' + sup(v));
  T(S, 'xl', F.R - 5, F.B + 1.6, ['반복 횟수', 'iterations'], 'nu-xs'); T(S, 'yl', 4.4, 1, ['√2까지의 오차', 'error from √2'], 'nu-xs');
  [[bi, 'b', 'warn', C.warn, 1], [se, 's', 'accent', C.cur, 2], [ne, 'n', 'ok', C.okf, 3]].forEach(([arr, k, c, sty, st]) => { const pts = cut(arr); mpoly(S, k, F, pts, { st, color: c, h: .14 }); mdots(S, k + 'd', F, pts, st, sty, .24); });
  T(S, 'l1', 23, 2.6, ['이분법: 선형', 'bisection: linear'], 'nu-s nu-w', 1); T(S, 'l1b', 23, 4, ['매번 오차 × ½', 'error × ½ per step'], 'nu-xs', 1);
  T(S, 'l2', 23, 6, ['할선법: 초선형', 'secant: superlinear'], 'nu-s nu-a', 2); T(S, 'l2b', 23, 7.4, 'eₙ₊₁ ∝ eₙ^1.618', 'cz-mono nu-xs', 2);
  T(S, 'l3', 23, 9.4, ['뉴턴: 이차', 'Newton: quadratic'], 'nu-s nu-g', 3); T(S, 'l3b', 23, 10.8, 'eₙ₊₁ ∝ eₙ²', 'cz-mono nu-xs', 3);
  T(S, 'f1', 1, 17.8, [`10⁻¹⁵까지 이분법 ${nb}번, 할선법 ${ns}번, 뉴턴 ${nn}번`, `to 10⁻¹⁵: bisection ${nb} steps, secant ${ns}, Newton ${nn}`], 'cz-tc nu-s', 4, { w: 30 });
  T(S, 'f2', 1, 19.4, ['대신 뉴턴은 도함수가, 이분법은 부호가 바뀌는 구간이 필요해요', 'but Newton needs a derivative and bisection a sign-changing bracket'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '근까지의 오차를 로그 눈금으로 보면 이분법은 직선', 'On a log scale, bisection’s error falls in a straight line')
    .cap(2, '할선법은 점점 가팔라지고', 'Secant bends ever steeper')
    .cap(3, '뉴턴은 거의 수직으로 떨어져요', 'Newton drops almost straight down')
    .cap(4, '같은 정확도까지 필요한 반복 횟수가 크게 달라요', 'The steps needed for the same accuracy differ hugely')
    .cap(5, '수렴 차수 1 · 1.618 · 2', 'Orders of convergence: 1, 1.618, 2');
  return S;
}

/* ================= linear systems & optimization ================= */
function sPivot() {
  const S = scene({ id: 'nu-pivot', steps: 5, per: 1.4 });
  T(S, 's1', 1.4, 1.2, '0.0001x + y = 1', 'cz-mono nu-s'); T(S, 's2', 1.4, 2.7, 'x + y = 2', 'cz-mono nu-s');
  T(S, 's3', 13.4, 1.2, ['참값 x ≈ 1.0001, y ≈ 0.9999', 'exact x ≈ 1.0001, y ≈ 0.9999'], 'cz-mono nu-xs'); T(S, 's4', 13.4, 2.7, ['모든 계산을 유효숫자 3자리로 반올림', 'every result rounded to 3 significant digits'], 'nu-xs');
  rect(S, 'pl', 1, 4.4, 14.6, 10.4, 'danger', 8, 2, { r: .5 }); rect(S, 'pr', 16.4, 4.4, 14.6, 10.4, 'ok', 8, 3, { r: .5 });
  T(S, 'a0', 1.6, 5, ['피벗 없이', 'no pivoting'], 'nu-s nu-r', 2);
  T(S, 'a1', 1.6, 6.6, ['피벗 0.0001 → 곱수 m = 10000', 'pivot 0.0001 → multiplier m = 10000'], 'nu-xs', 2);
  T(S, 'a2', 1.6, 8.2, '(1 − 10000)y = 2 − 10000', 'cz-mono nu-xs', 2);
  T(S, 'a3', 1.6, 9.6, '−9999 → −10000, −9998 → −10000', 'cz-mono nu-xs', 2);
  T(S, 'a4', 1.6, 11.2, 'y = 1.00', 'cz-mono nu-s', 2); T(S, 'a5', 1.6, 12.8, 'x = (1 − 1.00) / 0.0001 = 0 ✗', 'cz-mono nu-s nu-r', 2);
  T(S, 'b0', 17, 5, ['행을 바꿔 큰 수를 피벗으로', 'swap rows: big pivot first'], 'nu-s nu-g', 3);
  T(S, 'b1', 17, 6.6, ['x + y = 2 가 위로 → m = 0.0001', 'x + y = 2 goes on top → m = 0.0001'], 'nu-xs', 3);
  T(S, 'b2', 17, 8.2, '(1 − 0.0001)y = 1 − 0.0002', 'cz-mono nu-xs', 4);
  T(S, 'b3', 17, 9.6, '0.9999 → 1.00, 0.9998 → 1.00', 'cz-mono nu-xs', 4);
  T(S, 'b4', 17, 11.2, 'y = 1.00', 'cz-mono nu-s', 4); T(S, 'b5', 17, 12.8, 'x = 2 − 1.00 = 1.00 ✓', 'cz-mono nu-s nu-g', 4);
  T(S, 'f1', 1, 16.4, ['작은 피벗으로 나누면 곱수가 커져 반올림 오차가 증폭돼요 → 열에서 절댓값이 가장 큰 원소를 피벗으로', 'a tiny pivot makes huge multipliers that amplify rounding → pick the largest entry in the column'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 17.8, ['LAPACK·NumPy의 solve가 기본으로 해요 (PA = LU) · 비용 약 2n³/3', 'LAPACK and NumPy’s solve do it by default (PA = LU) · cost ≈ 2n³/3'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '아주 작은 계수가 맨 앞에 있는 연립방정식', 'A system with a tiny coefficient in the top-left corner')
    .cap(2, '그대로 소거하면 곱수 10000 때문에 정보가 반올림으로 사라져요', 'Eliminating as is, the 10000× multiplier rounds the information away')
    .cap(3, '절댓값이 큰 행을 위로 바꾸면', 'Swap the row with the larger entry to the top')
    .cap(4, '같은 3자리 계산으로도 정답이 나와요', 'and the same 3-digit arithmetic gets it right')
    .cap(5, '부분 피벗팅: 가우스 소거의 기본 안전장치', 'Partial pivoting: Gaussian elimination’s standard safeguard');
  return S;
}
function sIter() {
  const S = scene({ id: 'nu-iter', steps: 5, per: 1.4 });
  const F = fr(-.2, 2.4, -.1, 2.5, 2, 15, 2.6, 15.6);
  ax2(S, 'ga', F, 'x', 'y'); xticks(S, 'xt', F, [1, 2], null);
  mline(S, 'l1', F, [.875, 2.5], [1.55, -.2], { color: 'accent', h: .16 }); mline(S, 'l2', F, [-.2, 7.2 / 3], [2.4, 4.6 / 3], { color: 'warn', h: .16 });
  const p = [[0, 0]], sw = [[0, 0]]; let x = 0, y = 0; for (let i = 0; i < 5; i++) { x = (6 - y) / 4; p.push([x, y]); y = (7 - x) / 3; p.push([x, y]); sw.push([x, y]); }
  mpoly(S, 'g', F, p, { st: i => i < 2 ? 2 : 3, color: 'danger', h: .12 }); mdots(S, 'gd', F, p.slice(1), i => i < 2 ? 2 : 3, C.badf, .2);
  mpt(S, 'p0', F, [0, 0], 1, C.badf, .3); mpt(S, 'sol', F, [1, 2], 4, C.okf, .36);
  T(S, 'e1', 17.4, 2.4, '4x + y = 6', 'cz-mono nu-s nu-a'); T(S, 'e2', 17.4, 3.9, 'x + 3y = 7', 'cz-mono nu-s nu-w');
  T(S, 'g1', 17.4, 5.8, 'x ← (6 − y) / 4', 'cz-mono nu-xs', 1); T(S, 'g2', 17.4, 7.1, 'y ← (7 − x) / 3', 'cz-mono nu-xs', 1);
  sw.forEach(([a, b], k) => T(S, 'tr' + k, 17.4, 9.2 + k * 1.25, `${k} · (${a.toFixed(4)}, ${b.toFixed(4)})`, 'cz-mono nu-xs', k === 0 ? 1 : k < 2 ? 2 : 3));
  T(S, 'r1', 17.4, 16.8, ['→ (1, 2)로 수렴', '→ converges to (1, 2)'], 'nu-s nu-g', 4);
  T(S, 'f1', 1, 18.2, ['대각 원소가 큰(대각 우세) 행렬이면 수렴 · 야코비는 이전 값만, 가우스-자이델은 방금 구한 값을 바로 써요', 'diagonal dominance guarantees convergence · Jacobi uses only old values, Gauss–Seidel uses new ones at once'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 19.5, ['수백만 미지수의 희소 행렬(PDE, 시뮬레이션)에는 켤레 기울기법·멀티그리드', 'huge sparse systems (PDEs, simulation) use conjugate gradients and multigrid'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '두 식을 각각 한 변수에 대해 풀어 두고 (0, 0)에서 시작', 'Solve each equation for one variable and start from (0, 0)')
    .cap(2, '첫 식으로 x를, 둘째 식으로 y를 갱신', 'Update x from the first equation, then y from the second')
    .cap(3, '계단처럼 오가며 해에 다가가요', 'The path zigzags toward the solution')
    .cap(4, '몇 번 만에 (1, 2)에 가까워져요', 'Within a few rounds it is close to (1, 2)')
    .cap(5, '반복법: 행렬 분해 없이 곱셈과 대입만으로 풀어요', 'Iterative solvers need no factorization, only products and updates');
  return S;
}
function sPower() {
  const S = scene({ id: 'nu-power', steps: 5, per: 1.4 });
  const F = fr(-.25, 1.15, -.25, 1.15, 3, 17, 2.6, 16.6), vs = [[1, 0]], Av = v => [2 * v[0] + v[1], v[0] + 2 * v[1]];
  for (let i = 0; i < 4; i++) { const w = Av(vs[i]), n = Math.hypot(w[0], w[1]); vs.push([w[0] / n, w[1] / n]); }
  ax2(S, 'ga', F, '', ''); mline(S, 'ev', F, [-.25, -.25], [1.15, 1.15], { color: 'ok', h: .1, dash: 1 });
  mT(S, 'evl', F, [.78, 1.1], -5.6, -.4, ['고유벡터 방향 (1, 1)', 'eigenvector direction (1, 1)'], 'nu-xs nu-g', 0);
  vs.forEach((v, n) => { mar(S, 'v' + n, F, [0, 0], v, n === 4 ? 'ok' : 'accent', n, { h: .16, dim: n < 4 ? n + 1 : 0 }); mT(S, 'vl' + n, F, v, .3, -.3, 'v' + sub(n), 'cz-mono nu-xs', n, { off: n < 4 ? n + 1 : 0 }); });
  T(S, 'm', 18.6, 2.4, 'A = [[2, 1], [1, 2]]', 'cz-mono nu-s');
  vs.forEach((v, n) => { const w = Av(v), rq = v[0] * w[0] + v[1] * w[1]; T(S, 'r' + n, 18.6, 4.4 + n * 1.45, `v${sub(n)} = (${v[0].toFixed(3)}, ${v[1].toFixed(3)})` + (n ? ` · λ ≈ ${rq.toFixed(3)}` : ''), 'cz-mono nu-xs', n); });
  T(S, 'g1', 18.6, 12.2, ['→ 고유벡터 (0.707, 0.707)', '→ eigenvector (0.707, 0.707)'], 'cz-mono nu-xs nu-g', 4); T(S, 'g2', 18.6, 13.5, ['가장 큰 고윳값 λ = 3', 'top eigenvalue λ = 3'], 'nu-xs nu-g', 4);
  T(S, 'g3', 18.6, 15, ['다른 성분은 매번 1/3로', 'the rest shrinks ×1/3 per step'], 'nu-xs', 4);
  T(S, 'f', 1, 18.4, ['곱하고 정규화하기만 반복 · 구글 PageRank가 수십억 페이지의 링크 행렬에 쓴 방법', 'just multiply and normalize · Google’s PageRank ran it on a link matrix of billions of pages'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '아무 벡터에 행렬 A를 곱하고 길이를 1로 맞추면', 'Multiply any vector by A and rescale it to length 1')
    .cap(2, '가장 큰 고윳값의 방향으로 조금 돌아가요', 'It turns toward the dominant eigenvector')
    .cap(3, '반복할수록 다른 성분은 1/3씩 줄어들어', 'Other components shrink by 1/3 each round')
    .cap(4, '고유벡터와 가장 큰 고윳값 3이 남아요', 'leaving the eigenvector and the top eigenvalue, 3')
    .cap(5, '거듭제곱법: 큰 행렬의 고윳값을 곱셈만으로', 'Power iteration: eigenvalues of huge matrices from products alone');
  return S;
}
function sGd() {
  const S = scene({ id: 'nu-gd', steps: 5, per: 1.4 });
  const F = fr(-5, 5, -2.2, 2.2, 2, 30, 3, 15.3), ux = (F.R - F.L) / 10, uy = (F.B - F.T) / 4.4;
  hl(S, 'ax', F.L, F.R, F.Y(0), 'line', 0, { w: .08 }); vl(S, 'ay', F.X(0), F.T, F.B, 'line', 0, { w: .08 });
  [1, 4, 9, 16, 25].forEach((c, i) => ell(S, 'e' + i, F.X(0), F.Y(0), Math.sqrt(c) * ux, Math.sqrt(c / 10) * uy, 'ink-3', 0, { w: .1 }));
  mpt(S, 'o', F, [0, 0], 0, C.okf, .24);
  const p = [[-4.5, 1.6]]; for (let i = 0; i < 14; i++) p.push([p[i][0] * .82, p[i][1] * -.8]);
  mpoly(S, 'g', F, p, { st: i => i < 3 ? 2 : 3, color: 'accent', h: .14 }); mdots(S, 'gd', F, p.slice(1), i => i < 3 ? 2 : 3, C.cur, .2);
  mpt(S, 's', F, p[0], 1, C.badf, .32); mar(S, 'nt', F, p[0], [-.12, .04], 'ok', 4, { h: .14 });
  T(S, 'h', 2, 1, ['f(x, y) = x² + 10y² · 학습률 0.09', 'f(x, y) = x² + 10y² · step size 0.09'], 'cz-mono nu-s');
  T(S, 'r1', 1, 16.2, ['y 방향은 가팔라서 왔다 갔다, x 방향은 완만해서 느려요 (조건수 10)', 'steep in y, so it bounces; shallow in x, so it crawls (condition number 10)'], 'cz-tc nu-xs nu-r', 3, { w: 30 });
  T(S, 'r2', 1, 17.6, ['뉴턴 방법은 곡률로 나눠 이차 함수의 최솟값으로 한 번에', 'Newton’s method divides by curvature and lands on a quadratic’s minimum in one step'], 'cz-tc nu-xs nu-g', 4, { w: 30 });
  T(S, 'r3', 1, 19, ['특성 스케일 맞추기, 모멘텀, Adam이 이 지그재그를 줄여요', 'feature scaling, momentum and Adam all fight this zigzag'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '길쭉한 그릇 모양 함수의 한 점에서', 'Start on the side of a long, narrow bowl')
    .cap(2, '기울기 반대 방향으로 한 걸음씩 내려가면', 'and step downhill against the gradient')
    .cap(3, '좁은 방향으로 지그재그하며 느리게 다가가요', 'It zigzags across the narrow direction and creeps forward')
    .cap(4, '곡률 정보를 쓰면 바로 최솟값으로', 'Using curvature jumps straight to the minimum')
    .cap(5, '경사 하강법: 머신러닝 학습의 기본 반복', 'Gradient descent: the workhorse loop of machine learning');
  return S;
}

/* ================= interpolation ================= */
const lagr = (xs, ys, x) => xs.reduce((a, xi, i) => a + ys[i] * xs.reduce((m, xj, j) => j === i ? m : m * (x - xj) / (xi - xj), 1), 0);
function sLagrange() {
  const S = scene({ id: 'nu-lagrange', steps: 5, per: 1.4 });
  const P = [[0, 1], [1, 3], [2, 2], [3, 4]], X = P.map(p => p[0]), Y = P.map(p => p[1]), F = fr(-.4, 3.4, -.5, 5, 2, 20, 2.6, 15.6);
  const Lb = (i, x) => X.reduce((m, xj, j) => j === i ? m : m * (x - xj) / (X[i] - xj), 1);
  ax2(S, 'ga', F, 'x', 'y'); xticks(S, 'xt', F, [0, 1, 2, 3], null);
  mpoly(S, 'ln', F, P, { st: 2, color: 'ink-3', h: .12, dash: 1 });
  mplot(S, 'c', F, x => [x, lagr(X, Y, x)], -.4, 3.4, { st: 3, n: 60, color: 'accent', h: .2 });
  mplot(S, 'b', F, x => [x, 3 * Lb(1, x)], -.4, 3.4, { st: 4, n: 60, color: 'warn', h: .14 });
  mdots(S, 'd', F, P, 1, C.cur, .34);
  T(S, 'r1', 21, 2.6, ['점 4개 → 3차식 하나', '4 points → one cubic'], 'nu-s', 1);
  T(S, 'r2', 21, 4.4, ['n + 1개 점을 지나는', 'the degree-≤ n polynomial'], 'nu-xs', 3); T(S, 'r2b', 21, 5.6, ['n차 이하 다항식은 유일', 'through n + 1 points is unique'], 'nu-xs', 3);
  T(S, 'r3', 21, 7.6, 'p(x) = Σ yᵢ Lᵢ(x)', 'cz-mono nu-s', 4);
  T(S, 'r4', 21, 9.2, ['주황 = 3·L₁(x)', 'orange = 3·L₁(x)'], 'cz-mono nu-xs nu-w', 4); T(S, 'r5', 21, 10.4, ['x = 1에서만 3, 나머지 0', '3 at x = 1, 0 at the rest'], 'nu-xs', 4);
  T(S, 'r6', 21, 12.4, ['뉴턴 분할 차분은', 'Newton’s divided differences'], 'nu-xs', 5); T(S, 'r7', 21, 13.6, ['점 추가가 쉬워요', 'make adding points easy'], 'nu-xs', 5);
  T(S, 'f', 1, 18, ['측정값 사이 채우기, 애니메이션 키프레임, 센서 보정표, 수치 적분 공식의 기초', 'filling gaps between measurements, animation keyframes, sensor tables, and the basis of quadrature rules'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '측정값 네 개가 있을 때', 'Given four measurements')
    .cap(2, '직선으로 이으면 꺾이지만', 'joining them with straight lines leaves corners')
    .cap(3, '네 점을 모두 지나는 3차식은 딱 하나', 'Exactly one cubic passes through all four')
    .cap(4, '한 점에서만 1이 되는 기저 다항식을 더해 만들어요', 'Build it from basis polynomials that are 1 at one point and 0 at the others')
    .cap(5, '라그랑주 보간', 'Lagrange interpolation');
  return S;
}
function sRunge() {
  const S = scene({ id: 'nu-runge', steps: 5, per: 1.4 });
  const f = x => 1 / (1 + 25 * x * x), F = fr(-1.05, 1.05, -.4, 2.1, 2, 22, 2.6, 15.6);
  const eq = [...Array(11)].map((_, i) => -1 + i / 5), ch = [...Array(11)].map((_, i) => Math.cos((2 * i + 1) * Math.PI / 22));
  let mc = 0; for (let t = -1; t <= 1; t += .002) mc = Math.max(mc, Math.abs(lagr(ch, ch.map(f), t) - f(t)));
  ax2(S, 'ga', F, '', ''); xticks(S, 'xt', F, [-1, 0, 1], null);
  mplot(S, 'f', F, x => [x, f(x)], -1, 1, { n: 60, color: 'ink-2', h: .16 });
  mdots(S, 'e', F, eq.map(x => [x, f(x)]), 2, C.cur, .26, { off: 4 });
  mplot(S, 'pe', F, x => [x, lagr(eq, eq.map(f), x)], -1, 1, { st: 3, off: 4, n: 140, color: 'danger', h: .16 });
  mdots(S, 'c', F, ch.map(x => [x, f(x)]), 4, C.okf, .26);
  mplot(S, 'pc', F, x => [x, lagr(ch, ch.map(f), x)], -1, 1, { st: 4, n: 120, color: 'ok', h: .16 });
  T(S, 'r1', 23, 2.6, '1 / (1 + 25x²)', 'cz-mono nu-s');
  T(S, 'r2', 23, 4.6, ['같은 간격 11점', '11 equally spaced'], 'nu-xs', 2);
  T(S, 'r3', 23, 6, ['10차 보간', 'degree-10 fit'], 'nu-xs nu-r', 3); T(S, 'r4', 23, 7.2, ['양 끝 오차 ≈ 1.9', 'edge error ≈ 1.9'], 'nu-xs nu-r', 3);
  T(S, 'r5', 23, 9.2, ['체비쇼프 노드 11점', '11 Chebyshev nodes'], 'nu-xs nu-g', 4); T(S, 'r6', 23, 10.4, [`최대 오차 ≈ ${mc.toFixed(2)}`, `max error ≈ ${mc.toFixed(2)}`], 'nu-xs nu-g', 4);
  T(S, 'r7', 23, 12, 'xₖ = cos((2k + 1)π / 22)', 'cz-mono nu-xs', 4);
  T(S, 'f', 1, 18, ['같은 간격이면 점을 늘릴수록 더 나빠져요 → 끝에 점을 몰거나 조각별 다항식(스플라인)을 써요', 'more equally spaced points only make it worse → bunch nodes at the ends or use piecewise polynomials (splines)'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '부드러운 종 모양 함수를', 'Take a smooth bell-shaped function')
    .cap(2, '같은 간격의 11점에서 재고', 'sample it at 11 equally spaced points')
    .cap(3, '10차 다항식으로 보간하면 양 끝이 크게 출렁여요', 'and the degree-10 interpolant swings wildly near the ends')
    .cap(4, '끝 쪽에 점을 촘촘히 두면 잘 맞아요', 'Nodes bunched toward the ends fix it')
    .cap(5, '룽게 현상: 고차 다항식 보간의 함정', 'Runge’s phenomenon: the trap of high-degree interpolation');
  return S;
}
function spline(P) {
  const n = P.length - 1, h = P.slice(1).map((p, i) => p[0] - P[i][0]), M = Array(n + 1).fill(0), a = [], b = [], c = [], d = [];
  for (let i = 1; i < n; i++) { a.push(h[i - 1]); b.push(2 * (h[i - 1] + h[i])); c.push(h[i]); d.push(6 * ((P[i + 1][1] - P[i][1]) / h[i] - (P[i][1] - P[i - 1][1]) / h[i - 1])); }
  const m = b.length; for (let i = 1; i < m; i++) { const w = a[i] / b[i - 1]; b[i] -= w * c[i - 1]; d[i] -= w * d[i - 1]; }
  const x = Array(m); x[m - 1] = d[m - 1] / b[m - 1]; for (let i = m - 2; i >= 0; i--) x[i] = (d[i] - c[i] * x[i + 1]) / b[i]; x.forEach((v, i) => M[i + 1] = v);
  return t => { let i = P.findIndex((p, j) => j < n && t <= P[j + 1][0]); if (i < 0) i = n - 1; const [x0, y0] = P[i], [x1, y1] = P[i + 1], hh = x1 - x0;
    return M[i] * (x1 - t) ** 3 / (6 * hh) + M[i + 1] * (t - x0) ** 3 / (6 * hh) + (y0 / hh - M[i] * hh / 6) * (x1 - t) + (y1 / hh - M[i + 1] * hh / 6) * (t - x0); };
}
function sSpline() {
  const S = scene({ id: 'nu-spline', steps: 5, per: 1.4 });
  const P = [[0, 1], [1, 2.6], [2, 1.4], [3, 3.2], [4, 2.2], [5, 2.8]], sp = spline(P), F = fr(-.3, 5.3, 0, 4, 2, 22, 2.6, 15.6);
  ax2(S, 'ga', F, '', ''); xticks(S, 'xt', F, [0, 1, 2, 3, 4, 5], null);
  mpoly(S, 'ln', F, P, { st: 2, color: 'ink-3', h: .12, dash: 1 });
  mplot(S, 'c', F, x => [x, sp(x)], 0, 5, { st: 3, n: 100, color: 'accent', h: .2 });
  mplot(S, 'k', F, x => [x, sp(x)], 2, 3, { st: 4, off: 5, n: 24, color: 'warn', h: .3 });
  mdots(S, 'd', F, P, 1, C.cur, .32);
  [2, 3].forEach((x, i) => vl(S, 'kv' + i, F.X(x), F.T + 1, F.B, 'warn', 4, { w: .08, dash: 1, off: 5 }));
  T(S, 'r1', 23, 2.6, ['직선 연결: 꺾임', 'straight pieces: kinks'], 'nu-xs', 2);
  T(S, 'r2', 23, 4.2, ['3차 스플라인: 매끈', 'cubic spline: smooth'], 'nu-xs nu-a', 3);
  T(S, 'r3', 23, 6.4, ['구간마다 3차식 하나', 'one cubic per gap'], 'nu-xs nu-w', 4); T(S, 'r4', 23, 7.8, ['이음매에서 값·기울기·', 'value, slope and'], 'nu-xs', 4); T(S, 'r5', 23, 9, ['곡률이 같아요', 'curvature match'], 'nu-xs', 4);
  T(S, 'r6', 23, 11.2, ['삼중대각 연립방정식', 'one tridiagonal system'], 'nu-xs', 5); T(S, 'r7', 23, 12.4, ['O(n)에 풀려요', 'solved in O(n)'], 'nu-xs', 5);
  T(S, 'f', 1, 18, ['폰트 윤곽(베지어, B-스플라인), CAD, 애니메이션 경로, 차트의 부드러운 선', 'font outlines (Bézier, B-splines), CAD, animation paths, smooth chart lines'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '여섯 점을 부드럽게 잇고 싶어요', 'We want a smooth curve through six points')
    .cap(2, '직선으로 이으면 모서리가 생기고', 'Straight segments leave corners')
    .cap(3, '구간별 3차식을 매끄럽게 붙이면 자연스러운 곡선', 'Piecewise cubics glued smoothly give a natural curve')
    .cap(4, '조각마다 차수가 낮아 출렁이지 않아요', 'Each piece stays low-degree, so nothing oscillates')
    .cap(5, '3차 스플라인: 보간의 실무 표준', 'Cubic splines: the practical default for interpolation');
  return S;
}

/* ================= numerical calculus ================= */
function sDiff() {
  const S = scene({ id: 'nu-diff', steps: 5, per: 1.4 });
  const E = Math.exp, F = fr(0, 2, 0, 7.6, 2, 19, 2.6, 15.6), fd = h => (E(1 + h) - E(1)) / h, cd = h => (E(1 + h) - E(1 - h)) / (2 * h), e = Math.E;
  ax2(S, 'ga', F, 'x', ''); xticks(S, 'xt', F, [.5, 1, 1.5], null);
  mplot(S, 'c', F, x => [x, E(x)], 0, 2, { n: 40, color: 'accent', h: .2 });
  thru(S, 'tg', F, [1, e], { p: [1, e], st: 1, color: 'ok', h: .14 });
  thru(S, 'fw', F, [.5, E(1.5) - e], { p: [1, e], st: 2, color: 'danger', h: .12 });
  thru(S, 'ce', F, [1, E(1.5) - E(.5)], { p: [.5, E(.5)], st: 3, color: 'warn', h: .12 });
  mpt(S, 'p1', F, [1, e], 0, C.cur, .3); mpt(S, 'p2', F, [1.5, E(1.5)], 2, C.badf, .28); mpt(S, 'p0', F, [.5, E(.5)], 3, C.warn, .28);
  T(S, 'r1', 20.4, 2.4, "f′(1) = e = 2.718", 'cz-mono nu-s nu-g', 1);
  T(S, 'r2', 20.4, 4.2, ['전진: (f(1+h) − f(1)) / h', 'forward: (f(1+h) − f(1)) / h'], 'cz-mono nu-xs nu-r', 2); T(S, 'r3', 20.4, 5.5, `= ${fd(.5).toFixed(3)} (h = 0.5)`, 'cz-mono nu-xs', 2);
  T(S, 'r4', 20.4, 7.3, ['중앙: (f(1+h) − f(1−h)) / 2h', 'central: (f(1+h) − f(1−h)) / 2h'], 'cz-mono nu-xs nu-w', 3); T(S, 'r5', 20.4, 8.6, `= ${cd(.5).toFixed(3)} (h = 0.5)`, 'cz-mono nu-xs', 3);
  T(S, 't0', 20.4, 10.6, ['h · 전진 오차 · 중앙 오차', 'h · forward · central error'], 'nu-xs', 4);
  [.5, .25].forEach((h, i) => T(S, 't' + (i + 1), 20.4, 11.9 + i * 1.25, `${h} · ${(fd(h) - e).toFixed(3)} · ${(cd(h) - e).toFixed(3)}`, 'cz-mono nu-xs', 4));
  T(S, 't3', 20.4, 14.5, ['→ ½배 · ¼배', '→ ×½ · ×¼'], 'nu-xs nu-g', 4);
  T(S, 'f', 1, 18, ['전진 오차 O(h), 중앙 O(h²) · 2계 도함수 (f(x+h) − 2f(x) + f(x−h)) / h²', 'forward error O(h), central O(h²) · second derivative (f(x+h) − 2f(x) + f(x−h)) / h²'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '접선의 기울기(도함수)를 함숫값만으로 구하려면', 'To get a tangent slope from function values alone')
    .cap(2, '앞쪽 한 점과 잇는 전진 차분은 꽤 틀려요', 'a forward difference to one neighbor is noticeably off')
    .cap(3, '양쪽 점을 잇는 중앙 차분은 접선과 거의 평행', 'a central difference through both neighbors is nearly parallel')
    .cap(4, 'h를 절반으로 줄이면 오차가 ½배, ¼배', 'Halving h cuts the errors by ½ and by ¼')
    .cap(5, '유한 차분: 시뮬레이션과 기울기 검사의 기본', 'Finite differences: the basis of simulations and gradient checks');
  return S;
}
const tq = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,transparent)`;
function trapz(S, k, F, f, a, b, n, color, st, off) { const h = (b - a) / n; for (let i = 0; i < n; i++) { const x0 = a + i * h, x1 = x0 + h;
  poly2(S, `${k}${i}`, [[F.X(x0), F.Y(0)], [F.X(x0), F.Y(f(x0))], [F.X(x1), F.Y(f(x1))], [F.X(x1), F.Y(0)]], tq(color, 30), st, { off });
  seg(S, `${k}t${i}`, [F.X(x0), F.Y(f(x0))], [F.X(x1), F.Y(f(x1))], st, color, .12, { off }); vl(S, `${k}v${i}`, F.X(x1), F.Y(f(x1)), F.Y(0), color, st, { w: .06, off }); } }
function sTrap() {
  const S = scene({ id: 'nu-trap', steps: 5, per: 1.4 });
  const f = Math.sin, P = Math.PI, F = fr(-.1, 3.3, -.1, 1.2, 2, 22, 2.6, 15.6), Tn = n => { const h = P / n; let s = 0; for (let i = 1; i < n; i++) s += f(i * h); return h * s; }, t4 = Tn(4), t8 = Tn(8);
  ax2(S, 'ga', F, 'x', ''); xticks(S, 'xt', F, [0, P / 2, P], v => ['0', 'π/2', 'π'][Math.round(v / (P / 2))]);
  shade(S, 'ar', F, f, 0, P, 'accent', 14, 1, { off: 2 });
  trapz(S, 'a', F, f, 0, P, 4, 'warn', 2, 3); trapz(S, 'b', F, f, 0, P, 8, 'ok', 3, 0);
  mplot(S, 'c', F, x => [x, f(x)], 0, P, { n: 50, color: 'accent', h: .2 });
  T(S, 'r0', 23, 2.4, '∫₀^π sin x dx = 2', 'cz-mono nu-s');
  T(S, 'r1', 23, 4.4, `n = 4 → ${t4.toFixed(4)}`, 'cz-mono nu-xs nu-w', 2); T(S, 'r2', 23, 5.7, [`오차 ${(2 - t4).toFixed(3)}`, `error ${(2 - t4).toFixed(3)}`], 'nu-xs', 2);
  T(S, 'r3', 23, 7.5, `n = 8 → ${t8.toFixed(4)}`, 'cz-mono nu-xs nu-g', 3); T(S, 'r4', 23, 8.8, [`오차 ${(2 - t8).toFixed(3)}`, `error ${(2 - t8).toFixed(3)}`], 'nu-xs', 3);
  T(S, 'r5', 23, 10.8, ['h 절반 → 오차 ¼', 'half h → ¼ error'], 'nu-xs nu-g', 4); T(S, 'r6', 23, 12.1, 'O(h²)', 'cz-mono nu-xs', 4);
  T(S, 'f1', 1, 17.6, [`리처드슨 외삽: (4·T₈ − T₄)/3 = ${((4 * t8 - t4) / 3).toFixed(4)} (롬베르크 적분)`, `Richardson extrapolation: (4·T₈ − T₄)/3 = ${((4 * t8 - t4) / 3).toFixed(4)} (Romberg integration)`], 'cz-tc cz-mono nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 19, ['표로 된 측정값에도 바로 쓸 수 있어요 (numpy.trapezoid)', 'works directly on tabulated data (numpy.trapezoid)'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '곡선 아래 넓이를 구하려면', 'To find the area under a curve')
    .cap(2, '구간을 나눠 사다리꼴로 근사하고', 'split it into trapezoids')
    .cap(3, '더 잘게 나누면 더 정확해져요', 'and finer pieces get closer')
    .cap(4, '간격을 절반으로 줄이면 오차는 4분의 1', 'Halving the width quarters the error')
    .cap(5, '사다리꼴 공식: 가장 단순한 수치 적분', 'The trapezoid rule: the simplest numerical integration');
  return S;
}
function sSimpson() {
  const S = scene({ id: 'nu-simpson', steps: 5, per: 1.4 });
  const f = Math.sin, P = Math.PI, F = fr(-.1, 3.3, -.1, 1.2, 2, 22, 2.6, 15.6);
  const Sn = n => { const h = P / n; let s = f(0) + f(P); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(i * h); return h / 3 * s; }, s4 = Sn(4), s8 = Sn(8), t4 = (() => { const h = P / 4; let s = 0; for (let i = 1; i < 4; i++) s += f(i * h); return h * s; })();
  ax2(S, 'ga', F, 'x', ''); xticks(S, 'xt', F, [0, P / 2, P], v => ['0', 'π/2', 'π'][Math.round(v / (P / 2))]);
  [0, 1].forEach(j => { const xs = [0, 1, 2].map(i => (2 * j + i) * P / 4), ys = xs.map(f), q = x => lagr(xs, ys, x), st = j + 2, pts = [[F.X(xs[0]), F.Y(0)]];
    for (let i = 0; i <= 30; i++) { const x = xs[0] + (xs[2] - xs[0]) * i / 30; pts.push([F.X(x), F.Y(q(x))]); } pts.push([F.X(xs[2]), F.Y(0)]);
    poly2(S, 'pa' + j, pts, tq('warn', 30), st); mplot(S, 'pq' + j, F, x => [x, q(x)], xs[0], xs[2], { st, n: 24, color: 'warn', h: .14 }); mdots(S, 'pd' + j, F, xs.map((x, i) => [x, ys[i]]), st, C.warn, .26); });
  mplot(S, 'c', F, x => [x, f(x)], 0, P, { n: 50, color: 'accent', h: .16 });
  T(S, 'r1', 23, 2.4, ['세 점 → 포물선', '3 points → a parabola'], 'nu-xs', 2);
  T(S, 'r2', 23, 4, `n = 4 → ${s4.toFixed(4)}`, 'cz-mono nu-xs nu-w', 3);
  T(S, 't0', 23, 6.2, ['오차 비교', 'errors'], 'nu-xs', 4);
  T(S, 't1', 23, 7.5, [`사다리꼴 n=4 · ${(2 - t4).toFixed(3)}`, `trapezoid n=4 · ${(2 - t4).toFixed(3)}`], 'nu-xs nu-r', 4);
  T(S, 't2', 23, 8.8, [`심프슨 n=4 · ${(s4 - 2).toFixed(4)}`, `Simpson n=4 · ${(s4 - 2).toFixed(4)}`], 'nu-xs', 4);
  T(S, 't3', 23, 10.1, [`심프슨 n=8 · ${(s8 - 2).toFixed(5)}`, `Simpson n=8 · ${(s8 - 2).toFixed(5)}`], 'nu-xs', 4);
  T(S, 't4', 23, 11.6, ['h 절반 → 오차 1/16', 'half h → error / 16'], 'nu-xs nu-g', 4);
  T(S, 'f0', 1, 17, '(h/3)(f₀ + 4f₁ + 2f₂ + 4f₃ + f₄)', 'cz-tc cz-mono nu-s', 3, { w: 30 });
  T(S, 'f', 1, 18.8, ['3차식까지 정확해요 · 적응형 적분(scipy.integrate.quad)은 오차가 큰 곳만 더 잘게 나눠요', 'exact for cubics · adaptive integrators (scipy.integrate.quad) refine only where the error is large'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '같은 넓이를 이번엔 곡선 조각으로', 'Same area, this time with curved pieces')
    .cap(2, '세 점을 지나는 포물선 아래 넓이를 쓰고', 'Use the area under the parabola through three points')
    .cap(3, '두 조각만으로 2.0046', 'Just two pieces give 2.0046')
    .cap(4, '간격 절반에 오차 16분의 1 (O(h⁴))', 'Halving h divides the error by 16 (O(h⁴))')
    .cap(5, '심프슨 공식: 사다리꼴과 같은 점으로 훨씬 정확', 'Simpson’s rule: same samples as trapezoids, far more accurate');
  return S;
}
function sGquad() {
  const S = scene({ id: 'nu-gquad', steps: 5, per: 1.4 });
  const f = x => x ** 3 + x * x + 1, F = fr(-1.2, 1.2, -.3, 3.4, 2, 20, 2.6, 15.6), g = 1 / Math.sqrt(3);
  ax2(S, 'ga', F, 'x', ''); xticks(S, 'xt', F, [-1, -g, 0, g, 1], v => Math.abs(v) === 1 ? String(v) : v === 0 ? '0' : (v < 0 ? '−' : '') + '0.577');
  shade(S, 'ar', F, f, -1, 1, 'accent', 16, 1);
  poly2(S, 'tz', [[F.X(-1), F.Y(0)], [F.X(-1), F.Y(f(-1))], [F.X(1), F.Y(f(1))], [F.X(1), F.Y(0)]], tq('danger', 22), 2, { off: 3 });
  seg(S, 'tzt', [F.X(-1), F.Y(f(-1))], [F.X(1), F.Y(f(1))], 2, 'danger', .14, { off: 3 });
  [[-1, 0, -g], [0, 1, g]].forEach(([a, b, x], i) => { poly2(S, 'gq' + i, [[F.X(a), F.Y(0)], [F.X(a), F.Y(f(x))], [F.X(b), F.Y(f(x))], [F.X(b), F.Y(0)]], tq('ok', 26), 3);
    hl(S, 'gt' + i, F.X(a), F.X(b), F.Y(f(x)), 'ok', 3, { w: .12 }); vl(S, 'gv' + i, F.X(x), F.Y(0), F.Y(f(x)), 'ok', 3, { w: .08, dash: 1 }); mpt(S, 'gp' + i, F, [x, f(x)], 3, C.okf, .28); });
  mplot(S, 'c', F, x => [x, f(x)], -1.2, 1.2, { n: 50, color: 'accent', h: .2 });
  T(S, 'r0', 21.4, 2.4, 'f = x³ + x² + 1', 'cz-mono nu-s');
  T(S, 'r1', 21.4, 4.2, ['참값 8/3 = 2.667', 'exact 8/3 = 2.667'], 'cz-mono nu-xs', 1);
  T(S, 'r2', 21.4, 6, ['양 끝 두 점: 4.000 ✗', 'endpoints: 4.000 ✗'], 'nu-xs nu-r', 2);
  T(S, 'r3', 21.4, 7.8, ['±1/√3 두 점: 2.667 ✓', '±1/√3: 2.667 ✓'], 'nu-xs nu-g', 3);
  T(S, 'r4', 21.4, 9.2, 'f(−0.577) + f(0.577)', 'cz-mono nu-xs', 3); T(S, 'r5', 21.4, 10.5, `= ${f(-g).toFixed(3)} + ${f(g).toFixed(3)}`, 'cz-mono nu-xs', 3);
  T(S, 'r6', 21.4, 12.6, ['n점이면 2n − 1차까지', 'n points: exact up to'], 'nu-xs', 4); T(S, 'r7', 21.4, 13.8, ['정확해요', 'degree 2n − 1'], 'nu-xs', 4);
  T(S, 'f', 1, 18, ['점의 위치까지 골라 같은 계산 횟수로 두 배 차수 · 유한요소법과 물리 시뮬레이션의 표준', 'choosing the points too doubles the exact degree at the same cost · standard in finite element and physics codes'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '[−1, 1]에서 3차 함수 아래 넓이', 'The area under a cubic on [−1, 1]')
    .cap(2, '양 끝 두 점만 쓰면 크게 틀려요', 'Two endpoints alone get it badly wrong')
    .cap(3, '두 점을 ±1/√3에 두면 정확히 맞아요', 'Put the two points at ±1/√3 and it is exact')
    .cap(4, '점의 위치를 잘 고르면 적은 계산으로 높은 정확도', 'Well-placed points buy accuracy cheaply')
    .cap(5, '가우스 구적법', 'Gaussian quadrature');
  return S;
}

/* ================= differential equations ================= */
const eulerPts = (h, T1) => { const p = [[0, 1]]; let y = 1; for (let t = 0; t < T1 - 1e-9; t += h) { y += h * y; p.push([t + h, y]); } return p; };
function sEuler() {
  const S = scene({ id: 'nu-euler', steps: 5, per: 1.4 });
  const F = fr(0, 2.1, 0, 8, 2, 20, 2.6, 15.6), e1 = eulerPts(.5, 2), e2 = eulerPts(.25, 2), E2 = Math.exp(2);
  ax2(S, 'ga', F, 't', 'y'); xticks(S, 'xt', F, [0, .5, 1, 1.5, 2], null);
  mplot(S, 'c', F, t => [t, Math.exp(t)], 0, 2.05, { n: 40, color: 'ok', h: .2 });
  mpoly(S, 'a', F, e1, { st: 2, color: 'danger', h: .14 }); mdots(S, 'ad', F, e1, 2, C.badf, .26);
  mpoly(S, 'b', F, e2, { st: 4, color: 'warn', h: .12 }); mdots(S, 'bd', F, e2, 4, C.warn, .22);
  T(S, 'r0', 21.4, 2.4, "y′ = y, y(0) = 1", 'cz-mono nu-s');
  T(S, 'r1', 21.4, 4.2, 'yₙ₊₁ = yₙ + h·f(tₙ, yₙ)', 'cz-mono nu-xs', 1);
  T(S, 'r2', 21.4, 6, `h = 0.5 → ${e1[4][1].toFixed(2)}`, 'cz-mono nu-xs nu-r', 3); T(S, 'r3', 21.4, 7.3, [`참값 e² = ${E2.toFixed(2)}`, `exact e² = ${E2.toFixed(2)}`], 'cz-mono nu-xs nu-g', 3);
  T(S, 'r4', 21.4, 9.1, `h = 0.25 → ${e2[8][1].toFixed(2)}`, 'cz-mono nu-xs nu-w', 4);
  T(S, 'r5', 21.4, 10.4, [`오차 ${(E2 - e1[4][1]).toFixed(2)} → ${(E2 - e2[8][1]).toFixed(2)}`, `error ${(E2 - e1[4][1]).toFixed(2)} → ${(E2 - e2[8][1]).toFixed(2)}`], 'cz-mono nu-xs', 4);
  T(S, 'r6', 21.4, 12.2, ['전역 오차 O(h)', 'global error O(h)'], 'nu-xs', 5);
  T(S, 'f', 1, 18, ['지금 기울기로 직선 한 걸음 · 단순하지만 정확하려면 h가 아주 작아야 해요', 'one straight step along the current slope · simple, but accuracy needs a tiny h'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '변화율만 알 때 앞으로의 값을 구하려면', 'Knowing only the rate of change, predict what comes next')
    .cap(2, '지금 기울기 방향으로 h만큼 직선으로 가요', 'Step a distance h along the current slope')
    .cap(3, '곡선이 휘는 만큼 오차가 쌓여요', 'Error builds up as the curve bends away')
    .cap(4, '간격을 반으로 줄이면 오차도 대략 반', 'Halving h roughly halves the error')
    .cap(5, '오일러 방법: 가장 단순한 미분방정식 풀이', 'Euler’s method: the simplest ODE solver');
  return S;
}
function sRk4() {
  const S = scene({ id: 'nu-rk4', steps: 5, per: 1.4 });
  const F = fr(0, 2.1, 0, 8, 2, 20, 2.6, 15.6), e1 = eulerPts(.5, 2), h = .5, rk = [[0, 1]];
  let y = 1; for (let i = 0; i < 4; i++) { const k1 = y, k2 = y + h * k1 / 2, k3 = y + h * k2 / 2, k4 = y + h * k3; y += h * (k1 + 2 * k2 + 2 * k3 + k4) / 6; rk.push([(i + 1) * h, y]); }
  ax2(S, 'ga', F, 't', 'y'); xticks(S, 'xt', F, [0, .5, 1, 1.5, 2], null);
  mplot(S, 'c', F, t => [t, Math.exp(t)], 0, 2.05, { n: 40, color: 'ok', h: .2 });
  mpoly(S, 'a', F, e1, { st: 1, color: 'danger', h: .12 }); mdots(S, 'ad', F, e1, 1, C.badf, .22);
  const k1 = 1, k2 = 1 + h * k1 / 2, k3 = 1 + h * k2 / 2, k4 = 1 + h * k3;
  [[0, 1, k1], [.25, 1 + .25 * k1, k2], [.25, 1 + .25 * k2, k3], [.5, 1 + .5 * k3, k4]].forEach(([t, yy, m], i) => { hseg(S, 'k' + i, F, t, yy, m, 2.4, ['accent', 'warn', 'warn', 'accent'][i], 2, { h: .14, off: 3 }); mpt(S, 'kp' + i, F, [t, yy], 2, C.idle, .18, { off: 3 }); });
  mpoly(S, 'b', F, rk, { st: 3, color: 'accent', h: .14 }); mdots(S, 'bd', F, rk, 3, C.cur, .26);
  T(S, 'r1', 21.4, 2.4, ['한 걸음에 기울기 4번', '4 slopes per step'], 'nu-xs', 2);
  T(S, 'r2', 21.4, 3.7, `k₁ = ${k1} · k₂ = ${k2}`, 'cz-mono nu-xs', 2); T(S, 'r3', 21.4, 4.9, `k₃ = ${k3} · k₄ = ${k4.toFixed(3)}`, 'cz-mono nu-xs', 2);
  T(S, 'r4', 21.4, 6.2, '(k₁ + 2k₂ + 2k₃ + k₄) / 6', 'cz-mono nu-xs', 2);
  T(S, 't0', 21.4, 8.4, ['t = 2에서', 'at t = 2'], 'nu-xs', 4);
  T(S, 't1', 21.4, 9.7, [`오일러 h=0.5 · ${e1[4][1].toFixed(3)}`, `Euler h=0.5 · ${e1[4][1].toFixed(3)}`], 'nu-xs nu-r', 4);
  T(S, 't2', 21.4, 11, [`RK4 h=0.5 · ${rk[4][1].toFixed(3)}`, `RK4 h=0.5 · ${rk[4][1].toFixed(3)}`], 'nu-xs nu-a', 4);
  T(S, 't3', 21.4, 12.3, [`참값 · ${Math.exp(2).toFixed(3)}`, `exact · ${Math.exp(2).toFixed(3)}`], 'nu-xs nu-g', 4);
  T(S, 'f1', 1, 17.6, ['전역 오차 O(h⁴): h를 절반으로 줄이면 오차 16분의 1', 'global error O(h⁴): halve h and the error drops 16-fold'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 19, ['scipy solve_ivp·MATLAB ode45는 오차를 보며 h를 조절하는 RK45를 써요', 'scipy’s solve_ivp and MATLAB’s ode45 use RK45, adapting h to an error estimate'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '같은 h = 0.5에서 오일러는 크게 빗나가요', 'With the same h = 0.5, Euler drifts far off')
    .cap(2, 'RK4는 한 걸음 안에서 기울기를 네 번 재서 평균을 내고', 'RK4 samples the slope four times within each step and averages')
    .cap(3, '같은 걸음 수로 곡선에 거의 딱 붙어요', 'and stays on the curve with the same number of steps')
    .cap(4, `오차 ${(Math.exp(2) - e1[4][1]).toFixed(2)} 대 ${(Math.exp(2) - rk[4][1]).toFixed(3)}`, `Error ${(Math.exp(2) - e1[4][1]).toFixed(2)} versus ${(Math.exp(2) - rk[4][1]).toFixed(3)}`)
    .cap(5, '4차 룽게-쿠타: 가장 많이 쓰는 미분방정식 풀이법', 'Fourth-order Runge–Kutta: the go-to ODE solver');
  return S;
}
function sStab() {
  const S = scene({ id: 'nu-stab', steps: 5, per: 1.4 });
  const F = fr(0, 2.05, -6, 6, 2, 22, 2.6, 15.6), run = (h, g, T1) => { const p = [[0, 1]]; let y = 1; for (let t = h; t <= T1 + 1e-9; t += h) { y = g(y, h); p.push([t, y]); } return p; };
  const ex = run(.25, (y, h) => (1 - 10 * h) * y, 1.75), sm = run(.05, (y, h) => (1 - 10 * h) * y, 2), im = run(.25, (y, h) => y / (1 + 10 * h), 2);
  ax2(S, 'ga', F, 't', 'y'); xticks(S, 'xt', F, [.5, 1, 1.5, 2], null); yticks(S, 'yt', F, [-4, 0, 4], null);
  mplot(S, 'c', F, t => [t, Math.exp(-10 * t)], 0, 2, { n: 60, color: 'ink-2', h: .18 });
  mpoly(S, 'a', F, ex, { st: 2, color: 'danger', h: .14 }); mdots(S, 'ad', F, ex, 2, C.badf, .26);
  mpoly(S, 'b', F, sm, { st: 3, color: 'warn', h: .12 });
  mpoly(S, 'd', F, im, { st: 4, color: 'ok', h: .14 }); mdots(S, 'dd', F, im, 4, C.okf, .26);
  T(S, 'r0', 23, 2.4, "y′ = −10y", 'cz-mono nu-s');
  T(S, 'r1', 23, 4.2, ['명시적, h = 0.25', 'explicit, h = 0.25'], 'nu-xs nu-r', 2); T(S, 'r2', 23, 5.5, '× (1 − 10h) = × (−1.5)', 'cz-mono nu-xs', 2);
  T(S, 'r3', 23, 7.3, ['h < 0.2 여야 안정', 'stable only if h < 0.2'], 'nu-xs nu-w', 3);
  T(S, 'r4', 23, 9.1, ['암시적, h = 0.25', 'implicit, h = 0.25'], 'nu-xs nu-g', 4); T(S, 'r5', 23, 10.4, '× 1/(1 + 10h) = × 0.29', 'cz-mono nu-xs', 4);
  T(S, 'r6', 23, 11.7, ['어떤 h에서도 안정', 'stable for any h'], 'nu-xs nu-g', 4);
  T(S, 'f1', 1, 17.6, ['빠른 성분이 섞인 강성(stiff) 문제(화학 반응, 회로)는 암시적 방법이 필요해요', 'stiff problems mixing fast and slow parts (chemistry, circuits) need implicit methods'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 19, ['매 걸음 방정식을 풀지만 큰 h로도 안정 · solve_ivp(method="BDF")', 'each step solves an equation, but big steps stay stable · solve_ivp(method="BDF")'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '빠르게 0으로 줄어드는 해', 'A solution that decays to zero quickly')
    .cap(2, '명시적 오일러는 h가 크면 부호를 바꾸며 폭발해요', 'Explicit Euler with a large h flips sign and explodes')
    .cap(3, '간격을 충분히 줄여야 안정해요', 'Only a small enough step keeps it stable')
    .cap(4, '다음 값을 미지수로 두는 암시적 오일러는 큰 h에서도 안정', 'Implicit Euler, solving for the next value, stays stable even with large h')
    .cap(5, '정확도보다 먼저 안정성을 따져야 해요', 'Stability comes before accuracy');
  return S;
}
function sSim() {
  const S = scene({ id: 'nu-sim', steps: 5, per: 1.4 });
  const F = fr(-2.6, 2.6, -2.6, 2.6, 3, 16.6, 2.6, 16.2), h = .3, ex = [[1, 0]], se = [[1, 0]];
  for (let i = 0; i < 26; i++) { const [x, v] = ex[i]; ex.push([x + h * v, v - h * x]); const [a, b] = se[i], b2 = b - h * a; se.push([a + h * b2, b2]); }
  ax2(S, 'ga', F, 'x', 'v'); ring(S, 'c', F.X(0), F.Y(0), F.X(1) - F.X(0), 'ink-3', 1, { w: .12, dash: 1 });
  mpt(S, 's0', F, [1, 0], 0, C.cur, .3);
  mpoly(S, 'a', F, ex, { st: 2, color: 'danger', h: .12 }); mdots(S, 'ad', F, ex, 2, C.badf, .16);
  mpoly(S, 'b', F, se, { st: 3, color: 'ok', h: .14 }); mdots(S, 'bd', F, se, 3, C.okf, .16);
  T(S, 'h', 18.4, 2.2, ['x″ = −x (용수철)', 'x″ = −x (a spring)'], 'cz-mono nu-s');
  T(S, 'c1', 18.4, 4.2, ['명시적 오일러', 'explicit Euler'], 'nu-xs nu-r', 2); T(S, 'c2', 18.4, 5.4, 'x, v = x + h·v, v − h·x', 'cz-mono nu-xs', 2);
  T(S, 'c3', 18.4, 6.6, ['에너지가 매번 9%씩 증가', 'energy grows 9% per step'], 'nu-xs nu-r', 2);
  T(S, 'c4', 18.4, 8.6, ['반암시적(심플렉틱) 오일러', 'semi-implicit (symplectic) Euler'], 'nu-xs nu-g', 3); T(S, 'c5', 18.4, 9.8, 'v −= h·x; x += h·v', 'cz-mono nu-xs', 3);
  T(S, 'c6', 18.4, 11, ['에너지가 일정 범위에 머물러요', 'energy stays bounded'], 'nu-xs nu-g', 3);
  T(S, 'c7', 18.4, 13, ['계산량은 같고 순서만 달라요', 'same cost, different order'], 'nu-s nu-a', 4);
  T(S, 'f1', 1, 17.6, ['Box2D 같은 게임 물리 엔진은 반암시적 오일러, 분자 동역학·천 시뮬레이션은 베를레 적분', 'game physics engines such as Box2D use semi-implicit Euler; molecular dynamics and cloth use Verlet'], 'cz-tc nu-xs', 5, { w: 30 });
  T(S, 'f2', 1, 19, ['오래 돌리는 시뮬레이션은 에너지를 보존하는 적분법을 골라야 해요', 'long-running simulations need integrators that respect energy'], 'cz-tc nu-xs', 5, { w: 30 });
  S.cap(1, '용수철에 매달린 물체의 (위치, 속도)는 원을 그려요', 'A mass on a spring traces a circle in (position, velocity)')
    .cap(2, '명시적 오일러로 돌리면 바깥으로 나선을 그리며 에너지가 늘어요', 'Explicit Euler spirals outward, gaining energy')
    .cap(3, '속도를 먼저, 새 속도로 위치를 갱신하면 궤도에 머물러요', 'Update velocity first, then position with the new velocity, and it stays in orbit')
    .cap(4, '코드 두 줄의 순서 차이', 'The difference is the order of two lines')
    .cap(5, '게임과 물리 시뮬레이션이 적분법을 고르는 기준', 'How games and simulations choose an integrator');
  return S;
}

window.UX = page([
  sec('nu-err', '오차와 부동소수점', 'Errors & floating point', '오차와 부동소수점', 'Errors and floating point',
    '컴퓨터가 실수를 다루는 방식과 그 한계예요.', 'How computers handle real numbers, and where that breaks.', [
    item('nu-float', '부동소수점 수', 'Floating-point numbers', '실수를 부호·지수·가수로 나눠 2진 과학적 표기법으로 저장해요. 대부분의 소수는 정확히 표현되지 않아 반올림돼요.', 'IEEE 754 double = 부호 1 + 지수 11 + 가수 52비트, 값 = (−1)ˢ × 1.f × 2^(e − 1023). 0.1은 2진수로 무한 소수라 0.1 + 0.2 = 0.30000000000000004. 그래서 실수는 ==가 아니라 허용 오차로 비교하고, 돈은 정수(최소 단위)나 decimal로 다뤄요. 0, 무한대, NaN, 비정규 수는 특별한 비트 패턴이에요.', 'Real numbers are stored in binary scientific notation as sign, exponent and fraction. Most decimals can’t be represented exactly, so they’re rounded.', 'An IEEE 754 double is 1 sign bit, 11 exponent bits and 52 fraction bits: (−1)ˢ × 1.f × 2^(e − 1023). 0.1 is an infinite binary fraction, hence 0.1 + 0.2 = 0.30000000000000004. Compare floats with a tolerance rather than ==, and keep money in integer cents or a decimal type. Zero, infinities, NaN and subnormals get special bit patterns.', sFloat()),
    item('nu-eps', '기계 엡실론과 반올림', 'Machine epsilon and rounding', '표현 가능한 수 사이의 간격은 수의 크기에 비례해요. 1 바로 다음 수까지의 간격이 기계 엡실론이고, 반올림의 상대 오차는 그 절반 이하예요.', 'double의 ε = 2⁻⁵² ≈ 2.2 × 10⁻¹⁶ (유효숫자 약 16자리). 큰 수일수록 간격이 넓어 2⁵³을 넘는 정수는 홀수를 표현하지 못해요(자바스크립트 Number.MAX_SAFE_INTEGER). 큰 수에 작은 수를 더하면 사라지므로 합계는 작은 수부터 더하거나 카한 합산을 써요.', 'The gap between representable numbers grows with their size. The gap just above 1 is machine epsilon, and rounding’s relative error is at most half of it.', 'For doubles ε = 2⁻⁵² ≈ 2.2 × 10⁻¹⁶, about 16 significant digits. The gaps widen with magnitude, so above 2⁵³ odd integers vanish (JavaScript’s Number.MAX_SAFE_INTEGER). Adding a small number to a large one can change nothing, so sum small values first or use Kahan summation.', sEps()),
    item('nu-cancel', '파국적 상쇄', 'Catastrophic cancellation', '거의 같은 두 수를 빼면 앞자리가 지워지고 반올림 오차만 남아 상대 오차가 폭발해요. 식을 바꿔 뺄셈을 피하는 게 해결책이에요.', '예: x = 10¹⁵에서 √(x + 1) − √x를 그대로 계산하면 18% 틀리지만 1/(√(x + 1) + √x)로 바꾸면 끝자리까지 정확해요. 근의 공식(b² ≫ 4ac), 작은 x의 1 − cos x, 분산 E[x²] − E[x]²도 같은 함정. log1p, expm1, 웰퍼드 알고리즘이 그래서 있어요.', 'Subtracting two nearly equal numbers erases the leading digits and leaves rounding noise, so the relative error explodes. The cure is to rewrite the formula without the subtraction.', 'At x = 10¹⁵, √(x + 1) − √x computed directly is 18% off, while 1/(√(x + 1) + √x) is right to the last digit. The quadratic formula (b² ≫ 4ac), 1 − cos x for small x and the variance E[x²] − E[x]² hide the same trap; that is why log1p, expm1 and Welford’s algorithm exist.', sCancel()),
    item('nu-cond', '조건수', 'Condition number', '입력이 조금 바뀔 때 답이 얼마나 크게 바뀌는지를 나타내요. 조건수가 크면 아무리 좋은 알고리즘도 정확한 답을 낼 수 없어요.', '행렬의 조건수 κ(A) = ‖A‖·‖A⁻¹‖ = σ_max / σ_min. 상대 오차가 최대 κ배로 커져 대략 log₁₀κ 자리를 잃어요. 거의 평행한 두 직선은 κ ≈ 42, 10×10 힐베르트 행렬은 약 10¹³. 조건은 문제 자체의 성질이고, 안정성은 알고리즘의 성질이에요.', 'How much the answer moves when the input moves a little. With a large condition number no algorithm can deliver an accurate answer.', 'For a matrix, κ(A) = ‖A‖·‖A⁻¹‖ = σ_max / σ_min. Relative errors can grow κ-fold, losing about log₁₀κ digits. Two nearly parallel lines give κ ≈ 42; the 10×10 Hilbert matrix about 10¹³. Conditioning belongs to the problem; stability belongs to the algorithm.', sCond()),
    item('nu-trunc', '절단 오차와 반올림 오차', 'Truncation versus rounding error', '무한 과정을 유한하게 자르는 데서 생기는 절단 오차와 유한 자릿수 때문에 생기는 반올림 오차는 서로 반대로 움직여요.', '전진 차분의 오차 ≈ (h/2)|f″| + ε|f|/h → 최적 h ≈ √ε ≈ 10⁻⁸에서 약 8자리. 중앙 차분은 h ≈ ε^(1/3) ≈ 10⁻⁵에서 약 11자리. h를 무작정 줄이면 오히려 나빠져요. 자동 미분(PyTorch, JAX)은 차분이 아니라 연쇄 법칙을 그대로 계산해 이 문제가 없어요.', 'Truncation error comes from cutting an infinite process short; rounding error from finite digits. Shrinking a step trades one for the other.', 'A forward difference errs by about (h/2)|f″| + ε|f|/h, so the best h ≈ √ε ≈ 10⁻⁸ gives about 8 digits; a central difference reaches about 11 digits at h ≈ ε^(1/3) ≈ 10⁻⁵. Shrinking h further makes things worse. Automatic differentiation (PyTorch, JAX) applies the chain rule exactly and sidesteps the issue.', sTrunc())
  ]),
  sec('nu-root', '방정식의 근', 'Root finding', '방정식의 근', 'Root finding',
    '식을 0으로 만드는 값을 반복으로 찾아가요.', 'Homing in on where a function hits zero.', [
    item('nu-bisect', '이분법', 'Bisection', '부호가 다른 두 점 사이에는 근이 있어요. 중점의 부호를 보고 근이 있는 절반만 남기는 일을 반복해요.', '예: x² − 2 = 0, [1, 2] → [1, 1.5] → [1.25, 1.5] → … n번 후 폭 2⁻ⁿ, 10자리에 약 34번. 연속이고 f(a)·f(b) < 0이면 반드시 수렴해요(중간값 정리). 느리지만 안전해서 다른 방법의 안전장치로 써요. git bisect, 이진 탐색과 같은 원리예요.', 'A continuous function that changes sign has a root in between. Check the midpoint’s sign and keep the half that still brackets the root.', 'For x² − 2 = 0: [1, 2] → [1, 1.5] → [1.25, 1.5] → … After n steps the width is 2⁻ⁿ, so 10 digits take about 34 steps. If f is continuous and f(a)·f(b) < 0 it always converges (intermediate value theorem). Slow but safe, it backs up faster methods. git bisect and binary search share the idea.', sBisect()),
    item('nu-newton', '뉴턴 방법', 'Newton’s method', '현재 점에서 접선을 그어 그 접선이 0이 되는 곳으로 이동해요. 근 근처에서는 맞는 자릿수가 매번 두 배로 늘어요.', 'xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). √2: 2 → 1.5 → 1.41667 → 1.4142157 → 1.41421356237 (맞는 자리 1, 3, 6, 12). 이차 수렴이지만 도함수가 필요하고, f′ ≈ 0이거나 시작점이 멀면 발산·진동해요. 하드웨어 나눗셈·제곱근, 최적화의 뉴턴 단계, 비선형 연립방정식(야코비 행렬)에 써요.', 'Draw the tangent at the current point and move to where it hits zero. Near the root the number of correct digits doubles every step.', 'xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). For √2: 2 → 1.5 → 1.41667 → 1.4142157 → 1.41421356237, with 1, 3, 6, 12 correct digits. Quadratic convergence, but it needs f′ and can diverge or cycle when f′ ≈ 0 or the start is far. Used for hardware division and square roots, Newton steps in optimization, and nonlinear systems via the Jacobian.', sNewton()),
    item('nu-secant', '할선법', 'Secant method', '도함수 대신 최근 두 점을 잇는 직선(할선)을 써요. 함숫값만으로 뉴턴에 가까운 속도를 내요.', 'xₙ₊₁ = xₙ − f(xₙ)(xₙ − xₙ₋₁)/(f(xₙ) − f(xₙ₋₁)). 수렴 차수는 황금비 ≈ 1.618이고, 한 걸음에 함숫값 계산이 한 번이라 실제로는 뉴턴보다 빠를 때도 많아요. 실무 표준인 브렌트 방법(scipy.optimize.brentq)은 이분법·할선법·역이차보간을 섞어 안전하고 빨라요.', 'Replace the derivative with the line through the last two points. Function values alone give nearly Newton-like speed.', 'xₙ₊₁ = xₙ − f(xₙ)(xₙ − xₙ₋₁)/(f(xₙ) − f(xₙ₋₁)). Its order is the golden ratio ≈ 1.618, and with one function evaluation per step it often beats Newton in wall time. Brent’s method (scipy.optimize.brentq), the practical default, mixes bisection, secant and inverse quadratic interpolation for speed with a safety net.', sSecant()),
    item('nu-fixed', '고정점 반복', 'Fixed-point iteration', 'x = g(x) 꼴로 바꿔 결과를 다시 넣는 걸 반복해요. 고정점에서 |g′| < 1이면 수렴해요.', '예: x = cos x → 0.2, 0.980, 0.557, 0.849, … → 0.739085. 오차가 매번 |g′(x*)| ≈ 0.67배로 줄어요(선형 수렴). 뉴턴 방법도 g(x) = x − f/f′인 고정점 반복이에요. PageRank, 강화학습의 가치 반복, 연립방정식의 반복 해법이 모두 이 구조예요.', 'Rewrite the equation as x = g(x) and keep feeding the output back in. It converges when |g′| < 1 at the fixed point.', 'x = cos x gives 0.2, 0.980, 0.557, 0.849, … → 0.739085, the error shrinking by |g′(x*)| ≈ 0.67 each step (linear convergence). Newton’s method is itself fixed-point iteration with g(x) = x − f/f′. PageRank, value iteration in reinforcement learning and iterative linear solvers share this shape.', sFixed()),
    item('nu-conv', '수렴 속도', 'Rates of convergence', '오차가 eₙ₊₁ ≈ C·eₙᵖ로 줄어들 때 p를 수렴 차수라 해요. 같은 정확도까지 필요한 반복 횟수가 크게 달라져요.', '선형(p = 1): 이분법·고정점 반복, 반복마다 일정 비율. 초선형(p ≈ 1.618): 할선법. 이차(p = 2): 뉴턴, 맞는 자리가 두 배씩. √2를 10⁻¹⁵까지 구하는 데 이분법 약 50번, 할선법과 뉴턴은 몇 번이면 충분해요. 대신 빠른 방법일수록 좋은 시작점과 도함수 같은 추가 정보가 필요해요.', 'If the error shrinks like eₙ₊₁ ≈ C·eₙᵖ, p is the order of convergence. It decides how many steps a given accuracy costs.', 'Linear (p = 1): bisection and fixed-point iteration, a constant factor per step. Superlinear (p ≈ 1.618): secant. Quadratic (p = 2): Newton, doubling correct digits. Reaching 10⁻¹⁵ on √2 takes bisection about 50 steps but secant and Newton only a handful. Faster methods ask for better starts and extra information such as derivatives.', sConv())
  ]),
  sec('nu-lin', '선형 시스템과 최적화', 'Linear systems & optimization', '선형 시스템과 최적화', 'Linear systems and optimization',
    '큰 연립방정식과 최솟값 문제를 안정적으로 푸는 법이에요.', 'Solving large systems and minimization problems reliably.', [
    item('nu-pivot', '피벗팅과 가우스 소거', 'Gaussian elimination with pivoting', '소거할 때 작은 수로 나누면 곱수가 커져 반올림 오차가 증폭돼요. 각 열에서 절댓값이 가장 큰 원소를 피벗으로 고르면 안정해져요.', '예: 0.0001x + y = 1, x + y = 2를 유효숫자 3자리로 풀면 피벗 없이 x = 0(오답), 행을 바꾸면 x = 1.00(정답). 부분 피벗팅은 행 교환, 완전 피벗팅은 행·열 교환. 비용 약 2n³/3. LAPACK의 getrf, NumPy·MATLAB의 solve가 기본으로 해요(PA = LU).', 'Dividing by a tiny pivot creates huge multipliers that amplify rounding. Choosing the largest entry in each column as the pivot keeps elimination stable.', 'Solving 0.0001x + y = 1, x + y = 2 with 3-digit rounding gives x = 0 without pivoting but x = 1.00 after a row swap. Partial pivoting swaps rows; complete pivoting swaps rows and columns. Cost is about 2n³/3. LAPACK’s getrf and the solve routines in NumPy and MATLAB do it by default (PA = LU).', sPivot()),
    item('nu-iter', '반복법 (야코비, 가우스-자이델)', 'Iterative solvers (Jacobi, Gauss–Seidel)', '각 식을 한 변수에 대해 풀어 두고, 추정값을 넣어 갱신하는 걸 반복해요. 행렬을 분해하지 않아 거대한 희소 행렬에 적합해요.', '야코비는 이전 값만 쓰고, 가우스-자이델은 방금 구한 값을 바로 써서 보통 두 배쯤 빨라요. 대각 우세 행렬이면 수렴이 보장돼요. 예: 4x + y = 6, x + 3y = 7 → (1, 2). 실무에서는 켤레 기울기법(CG), GMRES, 멀티그리드가 PDE·유한요소·그래프 문제의 수백만 미지수를 풀어요.', 'Solve each equation for one unknown and keep plugging in the latest estimates. With no factorization, it suits huge sparse systems.', 'Jacobi uses only old values; Gauss–Seidel uses fresh ones immediately and is typically about twice as fast. Diagonally dominant matrices guarantee convergence. Example: 4x + y = 6, x + 3y = 7 → (1, 2). In practice conjugate gradients, GMRES and multigrid solve millions of unknowns from PDEs, finite elements and graphs.', sIter()),
    item('nu-power', '거듭제곱법', 'Power iteration', '벡터에 행렬을 곱하고 정규화하기를 반복하면 가장 큰 고윳값의 고유벡터 방향으로 수렴해요.', '예: A = [[2, 1], [1, 2]], v₀ = (1, 0) → (0.894, 0.447) → (0.781, 0.625) → … → (0.707, 0.707), λ = 3. 수렴 속도는 |λ₂/λ₁|(여기선 1/3). 레일리 몫 vᵀAv로 고윳값을 추정해요. PageRank가 대표적이고, 역반복·QR 알고리즘·란초스 방법으로 확장돼요.', 'Multiply a vector by the matrix and normalize, over and over: it swings toward the eigenvector of the largest eigenvalue.', 'With A = [[2, 1], [1, 2]] and v₀ = (1, 0): (0.894, 0.447) → (0.781, 0.625) → … → (0.707, 0.707), λ = 3. The rate is |λ₂/λ₁|, here 1/3, and the Rayleigh quotient vᵀAv estimates the eigenvalue. PageRank is the famous case; inverse iteration, the QR algorithm and Lanczos build on it.', sPower()),
    item('nu-gd', '경사 하강법과 조건', 'Gradient descent and conditioning', '기울기의 반대 방향으로 조금씩 내려가 최솟값을 찾아요. 방향마다 곡률이 크게 다르면(조건수가 크면) 지그재그하며 느려져요.', 'xₖ₊₁ = xₖ − η∇f(xₖ). f = x² + 10y²(조건수 10)에서 η가 크면 y 방향으로 튀고 x 방향으로는 기어가요. 수렴 속도는 대략 (κ − 1)/(κ + 1). 해결책: 특성 스케일링, 모멘텀, Adam, 뉴턴·준뉴턴(L-BFGS) 방법. 신경망 학습의 기본 반복이에요.', 'Step against the gradient to slide toward a minimum. When curvature differs wildly by direction (a large condition number), it zigzags and crawls.', 'xₖ₊₁ = xₖ − η∇f(xₖ). On f = x² + 10y² (condition number 10) a large η bounces across y while x crawls; the rate is roughly (κ − 1)/(κ + 1). Remedies: feature scaling, momentum, Adam, and Newton or quasi-Newton (L-BFGS) steps. It is the core loop of neural-network training.', sGd())
  ]),
  sec('nu-interp', '보간', 'Interpolation', '보간', 'Interpolation',
    '점들 사이를 매끄럽게 채우는 곡선이에요.', 'Curves that fill in between data points.', [
    item('nu-lagrange', '다항식 보간', 'Polynomial interpolation', 'n + 1개의 점을 모두 지나는 n차 이하 다항식은 하나뿐이에요. 각 점에서만 1이 되는 기저 다항식을 더해 만들어요.', '라그랑주 형태 p(x) = Σ yᵢLᵢ(x), Lᵢ(x) = Π(x − xⱼ)/(xᵢ − xⱼ). 뉴턴 분할 차분 형태는 점을 추가하기 쉬워요. 실제 계산은 수치적으로 안정한 무게중심(barycentric) 공식을 써요. 수치 적분·미분 공식, 키프레임 애니메이션, 표 보간의 기초예요.', 'Exactly one polynomial of degree at most n passes through n + 1 points. Build it from basis polynomials that are 1 at one point and 0 at the rest.', 'Lagrange form p(x) = Σ yᵢLᵢ(x) with Lᵢ(x) = Π(x − xⱼ)/(xᵢ − xⱼ). The Newton divided-difference form makes adding points easy, and the barycentric formula is the numerically stable way to evaluate it. It underlies quadrature and differentiation rules, keyframe animation and table lookup.', sLagrange()),
    item('nu-runge', '룽게 현상', 'Runge’s phenomenon', '같은 간격의 점에서 고차 다항식으로 보간하면 양 끝에서 크게 출렁여요. 점을 늘릴수록 오히려 나빠져요.', '예: 1/(1 + 25x²)을 11개 등간격 점으로 보간하면 끝에서 오차 약 1.9. 끝 쪽에 점을 몰아 둔 체비쇼프 노드 xₖ = cos((2k + 1)π/2n)을 쓰면 오차가 약 0.11로 줄고, 점을 늘릴수록 수렴해요. 아니면 낮은 차수 조각을 이어 붙이는 스플라인을 써요.', 'Interpolating with a high-degree polynomial at equally spaced points makes it swing wildly near the ends, and adding points makes it worse.', 'Fitting 1/(1 + 25x²) at 11 equally spaced points leaves an error of about 1.9 near the ends. Chebyshev nodes xₖ = cos((2k + 1)π/2n), bunched toward the ends, cut it to about 0.11 and converge as points are added. Otherwise use splines, gluing low-degree pieces.', sRunge()),
    item('nu-spline', '3차 스플라인', 'Cubic splines', '구간마다 3차식을 두고 이음매에서 값·기울기·곡률이 같도록 이어 붙여요. 출렁임 없이 부드러운 곡선이 돼요.', '양 끝의 2계 도함수를 0으로 두는 자연 스플라인은 삼중대각 연립방정식 하나로 O(n)에 구해요. 휘어짐 에너지를 최소로 하는 가장 매끈한 보간이에요. 폰트 윤곽(베지어, B-스플라인), CAD, 애니메이션 경로, 차트 라이브러리의 부드러운 선, scipy의 CubicSpline.', 'Put a cubic on each interval and glue them so value, slope and curvature match at the joints: a smooth curve with no wild swings.', 'The natural spline, with zero second derivative at the ends, comes from one tridiagonal system solved in O(n). It is the smoothest interpolant in the sense of minimal bending energy. Font outlines (Bézier, B-splines), CAD, animation paths, smooth chart lines and scipy’s CubicSpline all build on it.', sSpline())
  ]),
  sec('nu-int', '수치 미분과 적분', 'Numerical calculus', '수치 미분과 적분', 'Numerical differentiation and integration',
    '함숫값만으로 기울기와 넓이를 구해요.', 'Slopes and areas from function values alone.', [
    item('nu-diff', '수치 미분 (유한 차분)', 'Numerical differentiation', '가까운 두 점의 기울기로 도함수를 근사해요. 양쪽 점을 쓰는 중앙 차분이 한쪽만 쓰는 전진 차분보다 훨씬 정확해요.', '전진 (f(x + h) − f(x))/h: 오차 O(h). 중앙 (f(x + h) − f(x − h))/2h: 오차 O(h²). eˣ의 x = 1에서 h = 0.5면 전진 오차 0.81, 중앙 0.12. 2계 도함수는 (f(x + h) − 2f(x) + f(x − h))/h². 열·파동 시뮬레이션의 격자 계산, 신경망의 기울기 검사에 써요.', 'Approximate a derivative by the slope between nearby points. Central differences, using both sides, beat one-sided forward differences by far.', 'Forward (f(x + h) − f(x))/h has O(h) error; central (f(x + h) − f(x − h))/2h has O(h²). For eˣ at x = 1 with h = 0.5 the errors are 0.81 and 0.12. The second derivative is (f(x + h) − 2f(x) + f(x − h))/h². Used on simulation grids for heat and waves, and for gradient checks in neural networks.', sDiff()),
    item('nu-trap', '사다리꼴 공식', 'Trapezoid rule', '구간을 잘게 나눠 곡선을 직선으로 잇고 사다리꼴 넓이를 더해요. 간격을 절반으로 줄이면 오차가 4분의 1이 돼요.', 'T = h(f₀/2 + f₁ + … + fₙ₋₁ + fₙ/2), 오차 O(h²). ∫₀^π sin x dx = 2를 n = 4로 1.896, n = 8로 1.974. 두 결과를 (4T₂ₙ − Tₙ)/3로 섞으면 2.0003(리처드슨 외삽, 롬베르크 적분). 표로 된 측정값에 바로 쓸 수 있고(numpy.trapezoid), 주기 함수에는 특히 정확해요.', 'Chop the interval, join the curve with straight lines and add up the trapezoids. Halving the width quarters the error.', 'T = h(f₀/2 + f₁ + … + fₙ₋₁ + fₙ/2) with O(h²) error. ∫₀^π sin x dx = 2 gives 1.896 with n = 4 and 1.974 with n = 8; combining them as (4T₂ₙ − Tₙ)/3 gives 2.0003 (Richardson extrapolation, Romberg integration). It works directly on tabulated data (numpy.trapezoid) and is remarkably accurate for periodic functions.', sTrap()),
    item('nu-simpson', '심프슨 공식', 'Simpson’s rule', '세 점을 지나는 포물선 아래 넓이로 근사해요. 같은 점을 쓰면서 사다리꼴보다 훨씬 정확해요.', 'S = (h/3)(f₀ + 4f₁ + 2f₂ + 4f₃ + … + fₙ), n은 짝수, 오차 O(h⁴). ∫₀^π sin x dx를 n = 4로 2.0046, n = 8로 2.00027. 3차식까지 정확해요. scipy.integrate.quad 같은 적응형 적분기는 오차가 큰 구간만 더 잘게 나눠요(가우스-크론로드).', 'Use the area under the parabola through each three points. With the same samples it is far more accurate than trapezoids.', 'S = (h/3)(f₀ + 4f₁ + 2f₂ + 4f₃ + … + fₙ) for even n, with O(h⁴) error. ∫₀^π sin x dx comes out 2.0046 with n = 4 and 2.00027 with n = 8, and cubics are integrated exactly. Adaptive integrators such as scipy.integrate.quad subdivide only where the error is large (Gauss–Kronrod).', sSimpson()),
    item('nu-gquad', '가우스 구적법', 'Gaussian quadrature', '점의 위치까지 최적으로 골라, n개의 점으로 2n − 1차 다항식까지 정확히 적분해요.', '두 점 공식: ∫₋₁¹ f ≈ f(−1/√3) + f(1/√3), 3차식까지 정확. 예: x³ + x² + 1 → 2.667(참값 8/3), 양 끝점 사다리꼴은 4.0. 점은 르장드르 다항식의 근이에요. 함수를 아무 곳에서나 계산할 수 있을 때 가장 효율적이라 유한요소법·물리 시뮬레이션·렌더링에서 표준으로 써요.', 'Choose where to sample as well as the weights, and n points integrate polynomials up to degree 2n − 1 exactly.', 'Two points: ∫₋₁¹ f ≈ f(−1/√3) + f(1/√3), exact through cubics. For x³ + x² + 1 it gives 2.667 = 8/3, while the endpoint trapezoid gives 4.0. The nodes are roots of Legendre polynomials. When f can be evaluated anywhere it is the most efficient choice, standard in finite elements, physics codes and rendering.', sGquad())
  ]),
  sec('nu-ode', '미분방정식', 'Differential equations', '미분방정식', 'Differential equations',
    '변화율로부터 시간에 따른 값을 한 걸음씩 계산해요.', 'Stepping forward in time from rates of change.', [
    item('nu-euler', '오일러 방법', 'Euler’s method', '미분방정식 y′ = f(t, y)에서 현재 기울기 방향으로 h만큼 직선으로 가는 걸 반복해 해를 따라가요.', 'yₙ₊₁ = yₙ + h·f(tₙ, yₙ). y′ = y, y(0) = 1을 t = 2까지: h = 0.5 → 5.06, h = 0.25 → 5.96, 참값 e² = 7.39. 전역 오차 O(h)라 정확도를 얻으려면 걸음이 아주 많이 필요해요. 단순해서 게임 루프, 간단한 시뮬레이션, 다른 방법을 이해하는 출발점이에요.', 'For y′ = f(t, y), repeatedly step a distance h along the current slope to trace the solution.', 'yₙ₊₁ = yₙ + h·f(tₙ, yₙ). Solving y′ = y, y(0) = 1 to t = 2 gives 5.06 with h = 0.5 and 5.96 with h = 0.25 against e² = 7.39. Global error is O(h), so accuracy demands many steps. Its simplicity makes it the default in game loops, quick simulations and as the starting point for better methods.', sEuler()),
    item('nu-rk4', '룽게-쿠타 방법 (RK4)', 'Runge–Kutta (RK4)', '한 걸음 안에서 기울기를 네 번 재서 가중 평균으로 나아가요. 같은 간격에서 오일러보다 훨씬 정확해요.', 'k₁ = f(t, y), k₂ = f(t + h/2, y + hk₁/2), k₃ = f(t + h/2, y + hk₂/2), k₄ = f(t + h, y + hk₃), yₙ₊₁ = yₙ + h(k₁ + 2k₂ + 2k₃ + k₄)/6. 전역 오차 O(h⁴). y′ = y를 h = 0.5로 t = 2까지 풀면 7.384(참값 7.389). scipy solve_ivp·MATLAB ode45는 오차를 추정하며 h를 조절하는 RK45(도르만드-프린스)를 써요.', 'Sample the slope four times within each step and advance by their weighted average: far more accurate than Euler at the same step size.', 'k₁ = f(t, y), k₂ = f(t + h/2, y + hk₁/2), k₃ = f(t + h/2, y + hk₂/2), k₄ = f(t + h, y + hk₃), yₙ₊₁ = yₙ + h(k₁ + 2k₂ + 2k₃ + k₄)/6, with O(h⁴) global error. For y′ = y with h = 0.5 it reaches 7.384 at t = 2 against 7.389. scipy’s solve_ivp and MATLAB’s ode45 use RK45 (Dormand–Prince), adjusting h from an error estimate.', sRk4()),
    item('nu-stab', '안정성과 강성', 'Stability and stiffness', '명시적 방법은 걸음이 너무 크면 오차가 매번 증폭돼 폭발해요. 빠른 성분이 섞인 강성 문제는 암시적 방법이 필요해요.', 'y′ = −10y에 명시적 오일러를 쓰면 yₙ₊₁ = (1 − 10h)yₙ → h > 0.2면 |1 − 10h| > 1이라 발산. 암시적 오일러 yₙ₊₁ = yₙ/(1 + 10h)는 모든 h에서 안정. 대신 매 걸음 방정식을 풀어야 해요. 화학 반응, 회로 시뮬레이터(SPICE), 접촉이 많은 물리 시뮬레이션은 BDF 같은 암시적 방법을 써요.', 'With too large a step, an explicit method amplifies the error every step and blows up. Stiff problems, mixing fast and slow parts, need implicit methods.', 'Explicit Euler on y′ = −10y gives yₙ₊₁ = (1 − 10h)yₙ, which diverges once h > 0.2 because |1 − 10h| > 1. Implicit Euler, yₙ₊₁ = yₙ/(1 + 10h), is stable for every h at the price of solving an equation each step. Chemical kinetics, circuit simulators (SPICE) and contact-rich physics use implicit methods such as BDF.', sStab()),
    item('nu-sim', '시뮬레이션과 에너지 보존', 'Simulation and energy conservation', '물리 시뮬레이션을 오래 돌리면 적분법의 성질이 드러나요. 명시적 오일러는 에너지가 계속 늘지만, 반암시적 오일러는 궤도에 머물러요.', '용수철 x″ = −x에서 명시적 오일러는 매 걸음 에너지가 (1 + h²)배. 속도를 먼저 갱신하고 새 속도로 위치를 갱신하는 반암시적(심플렉틱) 오일러는 같은 비용으로 에너지가 일정 범위에 머물러요. Box2D 같은 게임 물리 엔진은 반암시적 오일러, 분자 동역학·천 시뮬레이션은 베를레 적분을 써요.', 'Run a physics simulation long enough and the integrator’s character shows: explicit Euler keeps gaining energy, while semi-implicit Euler stays in orbit.', 'For a spring x″ = −x, explicit Euler multiplies the energy by (1 + h²) every step. Semi-implicit (symplectic) Euler, updating velocity first and then position with the new velocity, keeps energy bounded at the same cost. Game physics engines such as Box2D use semi-implicit Euler; molecular dynamics and cloth use Verlet integration.', sSim())
  ])
]);
window.UX[0].css += `
.nu-b .in{font-weight:800;color:var(--ink)}
.nu-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.nu-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.nu-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.nu-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.nu-r .in{color:var(--danger);font-weight:800}
.nu-g .in{color:var(--ok);font-weight:800}
.nu-a .in{color:var(--accent);font-weight:800}
.nu-w .in{color:var(--warn);font-weight:800}
.nu-c .in{font-size:.62em;font-weight:700}
.nu-fb .in{font-size:.5em;font-weight:700;letter-spacing:0;white-space:nowrap}
.nu-dim{opacity:.35}.nu-red{color:var(--danger)}.nu-ok{color:var(--ok)}
.nu-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
