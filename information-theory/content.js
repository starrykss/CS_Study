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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'it-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono it-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono it-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c it-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

const lg = x => Math.log2(x);
const bitcells = (S, k, x, y, bits, o = {}) => bits.split('').forEach((b, i) => cell(S, k + i, x + i * (o.cw || 1.5), y, (o.cw || 1.5) - .14, o.h || 1.6, b, o.color ? o.color(i, b) : (b === '1' ? 'accent' : 'line'), o.pct || 40, o.st, { off: o.off }));

/* ================= information & entropy ================= */
function sBits() {
  const S = scene({ id: 'it-bits', steps: 5, per: 1.35 });
  for (let i = 0; i < 8; i++) { cell(S, 'b' + i, 2 + i * 2.4, 3, 2, 2.6, String(i + 1), 'line', 40, 0); if (i >= 4) S.set('b' + i, 1, { opacity: '.25' }); if (i < 2) S.set('b' + i, 2, { opacity: '.25' }); if (i === 3) S.set('b' + i, 3, { opacity: '.25' }); }
  tsets(S, 'b2', [[3, 'ok', 50]]);
  L(S, 'q', 2, 6.6, 20, 'it-s', [[1, ['Q1: 4 이하? → 예', 'Q1: ≤ 4? → yes']], [2, ['Q2: 3 이상? → 예', 'Q2: ≥ 3? → yes']], [3, ['Q3: 3? → 예 · 질문 3번 = log₂8 = 3비트', 'Q3: is it 3? → yes · 3 questions = log₂8 = 3 bits']]]);
  T(S, 'f', 2, 9.4, 'I(x) = −log₂ p(x)', 'cz-mono it-big', 4);
  [[['동전 앞면', 'coin heads'], '1/2', '1 bit'], [['주사위 6', 'die shows 6'], '1/6', '2.58 bits'], [['8개 중 하나', 'one of 8'], '1/8', '3 bits'], [['1024개 중 하나', 'one of 1024'], '1/1024', '10 bits']].forEach(([n, p, b], i) => {
    T(S, 'n' + i, 2, 12 + i * 1.6, n, 'it-s', 4); T(S, 'p' + i, 12, 12 + i * 1.6, 'p = ' + p, 'cz-mono it-s', 4); T(S, 'v' + i, 20, 12 + i * 1.6, b, 'cz-mono it-s it-a', 4); });
  T(S, 'e', 1, 19.2, ['드문 사건일수록 정보량이 커요 · 독립 사건의 정보량은 더해져요', 'rarer events carry more information · independent information adds'], 'cz-tc it-s', 5, { w: 30 });
  S.cap(1, '1~8 중 하나를 예/아니오 질문으로 맞히기', 'Guess a number from 1 to 8 with yes/no questions')
    .cap(2, '질문마다 후보가 절반으로 줄어요', 'Each answer halves the candidates')
    .cap(3, '세 번이면 확정 · 1비트 = 예/아니오 하나', 'Three answers settle it: one bit is one yes/no')
    .cap(4, '확률 p인 사건의 정보량은 −log₂p 비트', 'An event of probability p carries −log₂p bits')
    .cap(5, '놀라울수록 정보가 많아요', 'The more surprising, the more information');
  return S;
}
function sEntropy() {
  const S = scene({ id: 'it-entropy', steps: 5, per: 1.35 });
  const F = fr(0, 1, 0, 1.08, 2.4, 19, 2.6, 16.4), H = p => p <= 0 || p >= 1 ? 0 : -p * lg(p) - (1 - p) * lg(1 - p);
  ax2(S, 'ga', F, 'p', 'H(p)'); mplot(S, 'c', F, p => [p, H(p)], 0, 1, { st: 1, n: 40, color: 'accent', h: .2 });
  pt(S, 'd', F.X(.5), F.Y(1), 2, C.badf, .4); S.move('d', 3, F.X(.9) - .4, F.Y(H(.9)) - .4); S.move('d', 4, F.X(1) - .4, F.Y(0) - .4);
  L(S, 'v', 20.4, 2.6, 11, 'cz-mono it-l', [[2, 'p = 0.5 → 1 bit'], [3, 'p = 0.9 → 0.47'], [4, 'p = 1 → 0']]);
  L(S, 'vd', 20.4, 4.2, 11, 'it-s', [[2, ['가장 예측 불가', 'least predictable']], [3, ['거의 앞면 → 정보 적음', 'mostly heads → little info']], [4, ['결과가 정해짐', 'no uncertainty']]]);
  T(S, 'f1', 20.4, 7, 'H(X) = −Σ p log₂ p', 'cz-mono it-l', 1); T(S, 'f2', 20.4, 8.6, ['= 평균 정보량', '= average information'], 'it-s', 1);
  T(S, 'f3', 20.4, 11, '0 ≤ H ≤ log₂ n', 'cz-mono it-l', 5); T(S, 'f4', 20.4, 12.6, ['균등분포일 때 최대', 'max when uniform'], 'it-s', 5);
  T(S, 'f5', 20.4, 14.4, ['무손실 압축의 한계', 'limit of lossless compression'], 'it-s it-g', 5);
  S.cap(1, '앞면 확률 p인 동전의 엔트로피', 'Entropy of a coin with heads probability p')
    .cap(2, '공정한 동전은 매번 1비트의 불확실성', 'A fair coin carries 1 bit per flip')
    .cap(3, '한쪽으로 치우치면 덜 놀라워요', 'A biased coin is less surprising')
    .cap(4, '결과가 확실하면 엔트로피 0', 'A certain outcome has zero entropy')
    .cap(5, '엔트로피는 평균적으로 필요한 최소 비트 수', 'Entropy is the minimum average bits needed');
  return S;
}
function sMutual() {
  const S = scene({ id: 'it-mutual', steps: 5, per: 1.35 });
  ring(S, 'X', 9, 10, 5.4, 'accent', 1, { w: .16, fill: tint('accent', 28) }); ring(S, 'Y', 15, 10, 5.4, 'warn', 2, { w: .16, fill: 'color-mix(in srgb,var(--warn) 28%,transparent)', css: 'z-index:2' });
  T(S, 'hx', 3.8, 9.4, 'H(X|Y)', 'cz-mono it-s it-a', 3); T(S, 'hy', 16.6, 9.4, 'H(Y|X)', 'cz-mono it-s it-w', 3); T(S, 'i', 10, 9.4, 'I(X;Y)', 'cz-tc cz-mono it-s it-g', 3, { w: 4 });
  T(S, 'lx', 5, 3.6, 'H(X)', 'cz-mono it-l it-a', 1); T(S, 'ly', 16, 3.6, 'H(Y)', 'cz-mono it-l it-w', 2);
  T(S, 'e0', 21.4, 2.4, ['X = 날씨, Y = 우산', 'X = weather, Y = umbrella'], 'it-s');
  T(S, 'e1', 21.4, 4.6, 'H(X,Y) = H(X) + H(Y|X)', 'cz-mono it-xs', 3);
  T(S, 'e2', 21.4, 6.6, 'I(X;Y) = H(X) − H(X|Y)', 'cz-mono it-xs it-g', 4); T(S, 'e3', 21.4, 8, ['Y를 보면 줄어드는', 'uncertainty about X'], 'it-xs', 4); T(S, 'e4', 21.4, 9.2, ['X의 불확실성', 'removed by seeing Y'], 'it-xs', 4);
  T(S, 'e5', 21.4, 11.6, ['독립 → I = 0', 'independent → I = 0'], 'it-s', 5); T(S, 'e6', 21.4, 13, ['조건은 엔트로피를', 'conditioning never'], 'it-xs', 5); T(S, 'e7', 21.4, 14.2, ['늘리지 않아요', 'increases entropy'], 'it-xs', 5);
  S.cap(1, 'X의 불확실성을 원으로', 'Draw X’s uncertainty as a circle')
    .cap(2, 'Y의 불확실성과 겹치는 부분이 있어요', 'It overlaps Y’s')
    .cap(3, '겹치지 않는 부분이 조건부 엔트로피', 'The non-overlapping parts are conditional entropies')
    .cap(4, '겹친 부분이 상호정보량 = 공유하는 정보', 'The overlap is mutual information, what they share')
    .cap(5, '특징 선택, 결정 트리의 정보 이득에 써요', 'Used for feature selection and decision-tree information gain');
  return S;
}
function sKl() {
  const S = scene({ id: 'it-kl', steps: 5, per: 1.35 });
  const F = fr(0, 4, 0, .62, 2.4, 19, 3, 15), P = [.5, .25, .25], Q = [.25, .25, .5];
  ax2(S, 'ga', F, '', ''); ['A', 'B', 'C'].forEach((l, i) => T(S, 'x' + i, F.X(i + 1) - 1, F.B + .3, l, 'cz-tc cz-mono it-s', 0, { w: 2 }));
  bars(S, 'p', F, [.8, 1.8, 2.8], P, { bw: .36, color: 'accent', st: 1 }); bars(S, 'q', F, [1.2, 2.2, 3.2], Q, { bw: .36, color: 'warn', st: 2 });
  T(S, 'lp', 2.6, 1.4, ['P: 실제 분포', 'P: true distribution'], 'it-s it-a', 1); T(S, 'lq', 11, 1.4, ['Q: 모델의 예측', 'Q: model prediction'], 'it-s it-w', 2);
  T(S, 'e1', 20.4, 2.6, 'H(P) = 1.5 bits', 'cz-mono it-l', 1);
  T(S, 'e2', 20.4, 4.8, 'H(P, Q) = −Σ p log q', 'cz-mono it-s', 3); T(S, 'e3', 20.4, 6.2, '= 0.5·2 + 0.25·2 + 0.25·1', 'cz-mono it-xs', 3); T(S, 'e4', 20.4, 7.6, '= 1.75 bits', 'cz-mono it-l it-w', 3);
  T(S, 'e5', 20.4, 10, 'D(P‖Q) = H(P,Q) − H(P)', 'cz-mono it-s', 4); T(S, 'e6', 20.4, 11.4, '= 0.25 bits ≥ 0', 'cz-mono it-l it-r', 4);
  T(S, 'e7', 20.4, 13.8, ['분류 모델 손실 = 교차 엔트로피', 'classifier loss = cross-entropy'], 'it-xs', 5); T(S, 'e8', 20.4, 15.2, ['D(P‖Q) ≠ D(Q‖P)', 'D(P‖Q) ≠ D(Q‖P)'], 'cz-mono it-xs', 5);
  S.cap(1, '실제 분포 P의 엔트로피는 1.5비트', 'The true distribution P has entropy 1.5 bits')
    .cap(2, '모델 Q가 다르게 예측하면', 'A model Q predicts differently')
    .cap(3, 'Q 기준으로 부호화할 때 평균 길이가 교차 엔트로피', 'Coding with Q costs the cross-entropy on average')
    .cap(4, '더 드는 비트가 KL 발산 · 항상 0 이상', 'The extra bits are the KL divergence, never negative')
    .cap(5, '교차 엔트로피를 줄이면 Q가 P에 가까워져요', 'Minimizing cross-entropy pulls Q toward P');
  return S;
}

/* ================= lossless compression ================= */
function sPrefix() {
  const S = scene({ id: 'it-prefix', steps: 5, per: 1.35 });
  const bits = '0101100111', groups = [[0, 1, 'A'], [1, 3, 'B'], [3, 6, 'C'], [6, 7, 'A'], [7, 10, 'D']], X = 2, cw = 1.5;
  bitcells(S, 'b', X, 3.4, bits, { cw, color: () => 'line' });
  groups.forEach(([a, b, l], i) => { const st = i + 1; for (let j = a; j < b; j++) tsets(S, 'b' + j, [[st, ['accent', 'warn', 'ok', 'accent', 'danger'][i], 45]]);
    T(S, 'o' + i, X + a * cw, 6, l, 'cz-tc cz-mono it-l', st, { w: (b - a) * cw }); });
  T(S, 'cb', 1, 9, ['부호표', 'code table'], 'it-b'); [['A', '0'], ['B', '10'], ['C', '110'], ['D', '111']].forEach(([s, c], i) => T(S, 'c' + i, 1, 10.6 + i * 1.5, `${s} → ${c}`, 'cz-mono it-l'));
  const tn = (k, x, y, l) => cell(S, k, x - .7, y - .8, 1.4, 1.6, l, l.length === 1 && l !== '·' ? 'accent' : 'line', 35, 0);
  tn('r', 23.6, 2.6, '·'); tn('nA', 20.2, 6.6, 'A'); tn('n1', 27, 6.6, '·'); tn('nB', 24, 10.6, 'B'); tn('n2', 29.8, 10.6, '·'); tn('nC', 27.4, 14.6, 'C'); tn('nD', 30.8, 14.6, 'D');
  [['r', 23.6, 2.6, 20.2, 6.6, '0'], ['r', 23.6, 2.6, 27, 6.6, '1'], ['1', 27, 6.6, 24, 10.6, '0'], ['1', 27, 6.6, 29.8, 10.6, '1'], ['2', 29.8, 10.6, 27.4, 14.6, '0'], ['2', 29.8, 10.6, 30.8, 14.6, '1']].forEach(([_, a, b, c, d, l], i) => { seg(S, 'te' + i, [a, b + .8], [c, d - .8], 0, 'ink-3', .1); T(S, 'tl' + i, (a + c) / 2 - (l === '0' ? 1 : -.3), (b + d) / 2 - .6, l, 'cz-mono it-xs'); });
  T(S, 'f', 1, 18.4, ['어떤 부호도 다른 부호의 앞부분이 아니라서 구분자 없이 바로 해독돼요', 'no codeword is a prefix of another, so decoding needs no separators'], 'cz-tc it-s', 5, { w: 30 });
  T(S, 'f2', 1, 19.8, 'Kraft: Σ 2^(−ℓᵢ) ≤ 1', 'cz-tc cz-mono it-s', 5, { w: 30 });
  S.cap(1, '0을 읽자마자 A로 확정', 'Read 0: it can only be A')
    .cap(2, '10은 B', '10 is B')
    .cap(3, '110은 C · 트리의 잎에 닿으면 끝', '110 is C: stop when you reach a leaf')
    .cap(4, '다시 루트에서 시작', 'Start again from the root')
    .cap(5, '접두 부호는 왼쪽에서 오른쪽으로 한 번에 해독돼요', 'Prefix codes decode in one left-to-right pass');
  return S;
}
function sHuffman() {
  const S = scene({ id: 'it-huffman', steps: 5, per: 1.35 });
  const N = (k, x, y, l, c, st) => cell(S, k, x - 1.5, y - .9, 3, 1.8, l, c, 40, st);
  [['A', 4, '0.4'], ['B', 10, '0.3'], ['C', 16, '0.2'], ['D', 22, '0.1']].forEach(([s, x, p], i) => N('l' + s, x, 15.6, `${s} ${p}`, 'accent', 0));
  N('cd', 19, 11.4, '0.3', 'warn', 2); N('bcd', 14.5, 7.4, '0.6', 'warn', 3); N('rt', 9.2, 3.4, '1.0', 'ok', 4);
  const E = (k, a, b, l, st) => { seg(S, k, a, b, st, 'ink-3', .12); T(S, k + 't', (a[0] + b[0]) / 2 + (l === '0' ? -1 : .3), (a[1] + b[1]) / 2 - .7, l, 'cz-mono it-s it-a', 4); };
  E('e1', [19, 12.3], [16, 14.7], '0', 2); E('e2', [19, 12.3], [22, 14.7], '1', 2); E('e3', [14.5, 8.3], [10, 14.7], '0', 3); E('e4', [14.5, 8.3], [19, 10.5], '1', 3);
  E('e5', [9.2, 4.3], [4, 14.7], '0', 4); E('e6', [9.2, 4.3], [14.5, 6.5], '1', 4);
  [['A', 4, '0'], ['B', 10, '10'], ['C', 16, '110'], ['D', 22, '111']].forEach(([s, x, c]) => T(S, 'c' + s, x - 1.5, 17, c, 'cz-tc cz-mono it-l it-g', 4, { w: 3 }));
  L(S, 'st', 24.6, 3, 7, 'it-s', [[1, ['가장 작은 둘부터', 'two smallest first']], [2, 'C + D → 0.3'], [3, 'B + CD → 0.6'], [4, 'A + BCD → 1.0']]);
  T(S, 'f1', 24.6, 7, ['평균 1.9비트', 'average 1.9 bits'], 'it-s it-g', 5); T(S, 'f2', 24.6, 8.4, ['엔트로피 1.85', 'entropy 1.85'], 'it-s', 5); T(S, 'f3', 24.6, 9.8, ['고정 2비트', 'fixed 2 bits'], 'it-s it-r', 5);
  S.cap(1, '확률이 작은 기호부터', 'Start from the least likely symbols')
    .cap(2, '두 개를 묶어 하나의 노드로 만들고', 'and merge the two smallest into one node')
    .cap(3, '남은 것 중 다시 가장 작은 둘을 묶어요', 'Repeat with the two smallest that remain')
    .cap(4, '루트에서 잎까지 0/1을 적으면 부호', 'Read 0/1 from root to leaf for each code')
    .cap(5, '자주 나오는 기호가 짧아져 평균 길이가 엔트로피에 가까워요', 'Frequent symbols get short codes, near the entropy bound');
  return S;
}
function sArith() {
  const S = scene({ id: 'it-arith', steps: 5, per: 1.35 });
  const bar = (k, y, lo, hi, st, off) => { const x0 = 2, W = 26, seg3 = [['A', .6, 'accent'], ['B', .3, 'warn'], ['C', .1, 'ok']]; let a = 0;
    seg3.forEach(([l, p, c], i) => { rect(S, `${k}${i}`, x0 + a * W, y, p * W - .1, 2, c, 40, st, { off, cls: 'cz-c it-c', html: l, r: .1 }); a += p; });
    T(S, k + 'lo', x0 - .4, y + 2.2, lo, 'cz-mono it-xs', st, { off }); T(S, k + 'hi', x0 + W - 2.4, y + 2.2, hi, 'cz-mono it-xs', st, { off }); };
  bar('a', 2.4, '0', '1', 0); bar('b', 8, '0', '0.6', 2); bar('c', 13.6, '0.36', '0.54', 4);
  rect(S, 'hA', 2, 2.2, 15.6, 2.4, 'ink', 0, 1, { css: 'border:.16em solid var(--danger);background:none' });
  seg(S, 'z1', [2, 4.6], [2, 8], 2, 'ink-3', .08, { dash: 1 }); seg(S, 'z2', [17.6, 4.6], [28, 8], 2, 'ink-3', .08, { dash: 1 });
  rect(S, 'hB', 2 + .6 * 26, 7.8, .3 * 26, 2.4, 'ink', 0, 3, { css: 'border:.16em solid var(--danger);background:none' });
  seg(S, 'z3', [17.6, 10.2], [2, 13.6], 4, 'ink-3', .08, { dash: 1 }); seg(S, 'z4', [25.4, 10.2], [28, 13.6], 4, 'ink-3', .08, { dash: 1 });
  T(S, 'm', 1, 18, ['"AB" → [0.36, 0.54) 안의 아무 수 · 폭 0.18 = 0.6 × 0.3 → 약 −log₂0.18 ≈ 2.5비트', '“AB” → any number in [0.36, 0.54) · width 0.18 = 0.6 × 0.3 → about −log₂0.18 ≈ 2.5 bits'], 'cz-tc it-s', 5, { w: 30 });
  T(S, 'm2', 1, 19.4, ['기호마다 정수 비트에 묶이지 않아 엔트로피에 더 가까워요', 'not tied to whole bits per symbol, so closer to the entropy'], 'cz-tc it-xs', 5, { w: 30 });
  S.cap(1, '[0, 1)을 확률 비율로 나누고 첫 기호 A의 구간을 골라요', 'Split [0, 1) by probability and pick A’s slice')
    .cap(2, '그 구간을 다시 같은 비율로 나누고', 'Split that slice the same way')
    .cap(3, '두 번째 기호 B의 구간을 골라요', 'and pick B’s part')
    .cap(4, '메시지가 길어질수록 구간이 좁아져요', 'Each symbol narrows the interval')
    .cap(5, '최종 구간 안의 수 하나가 메시지 전체를 나타내요', 'One number in the final interval encodes the whole message');
  return S;
}
function sRle() {
  const S = scene({ id: 'it-rle', steps: 5, per: 1.35 });
  const s = 'AAAABBBCCD', runs = [[0, 4, 'A'], [4, 7, 'B'], [7, 9, 'C'], [9, 10, 'D']], cw = 2.2, X = 2;
  s.split('').forEach((c, i) => cell(S, 's' + i, X + i * cw, 3, cw - .14, 2, c, 'line', 40, 0));
  runs.forEach(([a, b, c], i) => { const st = i + 1; for (let j = a; j < b; j++) tsets(S, 's' + j, [[st, ['accent', 'warn', 'ok', 'danger'][i], 45]]);
    cell(S, 'o' + i, 4 + i * 4.4, 8.4, 4, 2, `${b - a}${c}`, ['accent', 'warn', 'ok', 'danger'][i], 40, st); });
  T(S, 'ol', 1, 7, ['출력', 'output'], 'it-s'); T(S, 'n', 22, 8.8, ['10 → 8글자', '10 → 8 chars'], 'it-l', 4);
  T(S, 'bad', 1, 12.6, ['반복이 없으면 오히려 커져요', 'without runs it grows'], 'it-s it-r', 5); bitcells(S, 'x', 2, 14.2, 'ABCD', { cw: 2.2, st: 5, color: () => 'line' }); T(S, 'ar', 11.4, 14.4, '→', 'cz-mono it-l', 5);
  bitcells(S, 'y', 13.4, 14.2, '1A1B1C1D', { cw: 2.2, st: 5, color: () => 'danger', pct: 25 });
  T(S, 'u', 1, 18.6, ['팩스, BMP·TIFF 이미지, 다른 압축의 마지막 단계에 써요', 'used in fax, BMP/TIFF images and as a final stage of other codecs'], 'cz-tc it-s', 5, { w: 30 });
  S.cap(1, '같은 글자가 이어지는 구간(런)을 찾아', 'Find runs of the same symbol')
    .cap(2, '"개수 + 글자"로 바꿔요', 'and write each as count + symbol')
    .cap(3, '런이 길수록 많이 줄어요', 'Long runs shrink a lot')
    .cap(4, '해독은 개수만큼 반복하면 끝', 'Decoding just repeats each symbol')
    .cap(5, '데이터의 성질에 맞는 압축을 골라야 해요', 'Pick a scheme that matches your data');
  return S;
}
function sLz() {
  const S = scene({ id: 'it-lz77', steps: 5, per: 1.35 });
  const s = 'abcabcabcx', cw = 2.4, X = 2;
  s.split('').forEach((c, i) => cell(S, 's' + i, X + i * cw, 3.4, cw - .14, 2, c, 'line', 40, 0));
  [0, 1, 2].forEach(i => tsets(S, 's' + i, [[1, 'accent', 40]])); [3, 4, 5, 6, 7, 8].forEach(i => tsets(S, 's' + i, [[3, 'ok', 45]])); tsets(S, 's9', [[4, 'accent', 40]]);
  rect(S, 'win', X - .2, 3.2, 3 * cw, 2.4, 'warn', 0, 2, { css: 'border:.16em dashed var(--warn);background:none', off: 4 });
  ar(S, 'bk', [X + 3 * cw + 1, 2.6], [X + 1, 2.6], 'warn', 2, { h: .14, off: 4 });
  T(S, 'bl', X + 3 * cw - 1, 1, ['3칸 뒤로', '3 back'], 'it-xs it-w', 2, { off: 4 });
  const toks = [['a', 1, 'accent'], ['b', 1, 'accent'], ['c', 1, 'accent'], ['(3, 6)', 3, 'ok'], ['x', 4, 'accent']];
  T(S, 'ol', 1, 8, ['출력 토큰', 'output tokens'], 'it-s'); toks.forEach(([t, st, c], i) => cell(S, 't' + i, 2 + i * 4.2, 9.6, 3.8, 2, t, c, 35, st));
  T(S, 'e1', 1, 13.4, ['(거리 3, 길이 6): 3칸 앞에서 6글자 복사', '(distance 3, length 6): copy 6 chars from 3 back'], 'it-s it-g', 3);
  T(S, 'e2', 1, 15, ['복사 길이가 거리보다 길어도 돼요 (겹쳐 복사)', 'the copy may overlap itself (length > distance)'], 'it-xs', 4);
  T(S, 'e3', 1, 17.4, ['gzip·zip·PNG = LZ77 + 허프만 (DEFLATE) · LZW는 GIF', 'gzip, zip, PNG = LZ77 + Huffman (DEFLATE) · LZW in GIF'], 'it-s', 5);
  S.cap(1, '처음 보는 글자는 그대로 내보내고', 'Unseen characters go out as literals')
    .cap(2, '이미 나온 문자열이 다시 나오면', 'When a repeat of earlier text appears')
    .cap(3, '"몇 칸 뒤에서 몇 글자"라는 참조로 바꿔요', 'replace it with a back-reference (distance, length)')
    .cap(4, '자기 자신과 겹치게 복사해 반복을 압축해요', 'Overlapping copies compress repetition')
    .cap(5, '사전을 따로 보내지 않는 적응형 압축', 'An adaptive scheme with no dictionary sent');
  return S;
}

/* ================= signals ================= */
function sSampling() {
  const S = scene({ id: 'it-sampling', steps: 5, per: 1.35 });
  const F = fr(0, 4, -1.3, 1.3, 2.4, 29.6, 2.6, 13.6), f = t => Math.sin(2 * Math.PI * t);
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .1 });
  mplot(S, 'sig', F, t => [t, f(t)], 0, 4, { n: 80, color: 'ink-3', h: .14 });
  for (let i = 0; i <= 32; i++) { const t = i / 8; vl(S, 'sl' + i, F.X(t), F.Y(f(t)), F.Y(0), 'accent', 2, { w: .08, off: 4 }); mpt(S, 'sp' + i, F, [t, f(t)], 2, C.cur, .22, { off: 4 }); }
  mplot(S, 'rec', F, t => [t, f(t)], 0, 4, { st: 3, off: 4, n: 80, color: 'accent', h: .2 });
  for (let i = 0; i <= 5; i++) { const t = i * .8; mpt(S, 'up' + i, F, [t, f(t)], 4, C.badf, .3); }
  mplot(S, 'al', F, t => [t, -Math.sin(2 * Math.PI * .25 * t)], 0, 4, { st: 4, n: 60, color: 'danger', h: .18 });
  L(S, 'k', 1, 15, 30, 'cz-tc cz-mono it-l', [[2, ['신호 1 Hz, 표본화 8 Hz', 'signal 1 Hz, sampling 8 Hz']], [3, ['fs > 2f → 원래 신호 복원', 'fs > 2f → perfect reconstruction']], [4, ['fs = 1.25 Hz < 2f → 0.25 Hz로 보임 (에일리어싱)', 'fs = 1.25 Hz < 2f → looks like 0.25 Hz (aliasing)']]]);
  T(S, 'f', 1, 17.4, ['나이퀴스트: fs > 2·f_max · CD 44.1 kHz는 20 kHz까지', 'Nyquist: fs > 2·f_max · CD audio at 44.1 kHz covers 20 kHz'], 'cz-tc it-s', 5, { w: 30 });
  T(S, 'f2', 1, 18.8, ['표본화 전에 저역통과 필터로 높은 주파수를 잘라요', 'an anti-aliasing low-pass filter runs before sampling'], 'cz-tc it-xs', 5, { w: 30 });
  S.cap(1, '연속 신호를 일정 간격으로 재면 디지털 신호', 'Measuring at regular intervals turns a signal digital')
    .cap(2, '충분히 촘촘하게 재면', 'Sample densely enough')
    .cap(3, '표본만으로 원래 곡선을 정확히 되살려요', 'and the samples recover the curve exactly')
    .cap(4, '너무 드물게 재면 전혀 다른 느린 신호로 보여요', 'Too sparse, and it masquerades as a slower signal')
    .cap(5, '최고 주파수의 두 배보다 빠르게 표본화해야 해요', 'Sample faster than twice the highest frequency');
  return S;
}
function sQuant() {
  const S = scene({ id: 'it-quant', steps: 5, per: 1.35 });
  const F = fr(0, 1, -1.1, 1.1, 2.4, 22, 2.6, 15.6), f = t => .9 * Math.sin(2 * Math.PI * t) + .1 * Math.sin(6 * Math.PI * t), q = v => Math.max(-.875, Math.min(.875, Math.round((v + .125) / .25) * .25 - .125));
  for (let k = -3; k <= 4; k++) { const y = k * .25 - .125; mline(S, 'lv' + k, F, [0, y], [1, y], { st: 2, color: 'line', h: .08 }); }
  mplot(S, 'sig', F, t => [t, f(t)], 0, 1, { n: 60, color: 'accent', h: .2 });
  const pts = []; for (let i = 0; i < 32; i++) { const t0 = i / 32, t1 = (i + 1) / 32, v = q(f((t0 + t1) / 2)); pts.push([F.X(t0), F.Y(v)], [F.X(t1), F.Y(v)]); }
  poly(S, 'stair', pts, { st: 3, color: 'warn', h: .2 });
  for (let i = 0; i < 32; i++) { const t = (i + .5) / 32; vl(S, 'er' + i, F.X(t), F.Y(f(t)), F.Y(q(f(t))), 'danger', 4, { w: .3 }); }
  T(S, 'e1', 23.4, 2.6, ['3비트 = 8단계', '3 bits = 8 levels'], 'it-l', 2); T(S, 'e2', 23.4, 4.6, ['가장 가까운 단계로 반올림', 'round to nearest level'], 'it-xs', 3);
  T(S, 'e3', 23.4, 6.6, ['빨강 = 양자화 오차', 'red = quantization error'], 'it-xs it-r', 4); T(S, 'e4', 23.4, 8, ['되돌릴 수 없어요', 'cannot be undone'], 'it-xs', 4);
  T(S, 'e5', 23.4, 10.4, 'SQNR ≈ 6.02N + 1.76 dB', 'cz-mono it-xs', 5); T(S, 'e6', 23.4, 11.8, ['1비트마다 +6 dB', '+6 dB per bit'], 'it-xs', 5); T(S, 'e7', 23.4, 13.2, ['CD 16비트 ≈ 98 dB', 'CD 16-bit ≈ 98 dB'], 'it-xs it-g', 5);
  S.cap(1, '연속적인 값을', 'A continuous value')
    .cap(2, '정해진 몇 개의 단계로', 'mapped onto a fixed set of levels')
    .cap(3, '반올림하면 계단 모양이 돼요', 'becomes a staircase')
    .cap(4, '그 차이가 양자화 오차 · 손실 압축의 핵심', 'The difference is quantization error, the heart of lossy coding')
    .cap(5, '비트를 늘릴수록 오차가 줄어요', 'More bits, less error');
  return S;
}
function sDct() {
  const S = scene({ id: 'it-dct', steps: 5, per: 1.35 });
  const x = [52, 55, 61, 66, 70, 61, 64, 73], N = 8, Xc = [...Array(N)].map((_, k) => x.reduce((a, v, n) => a + v * Math.cos(Math.PI / N * (n + .5) * k), 0) * Math.sqrt((k ? 2 : 1) / N));
  const keep = Xc.map((v, k) => k < 3 ? v : 0), rec = [...Array(N)].map((_, n) => keep.reduce((a, v, k) => a + v * Math.sqrt((k ? 2 : 1) / N) * Math.cos(Math.PI / N * (n + .5) * k), 0));
  const F = fr(-.6, 7.6, 0, 80, 2, 14, 3, 13), G = fr(-.6, 7.6, -20, 190, 17.4, 30, 3, 13);
  ax2(S, 'fa', F, '', ['픽셀 값', 'pixels']); bars(S, 'x', F, [...Array(N).keys()], x, { color: 'accent', pct: 45 });
  rec.forEach((v, n) => mpt(S, 'r' + n, F, [n, v], 4, C.badf, .3));
  ax2(S, 'ga', G, 'k', ['DCT 계수', 'DCT coeffs'], 2);
  Xc.forEach((v, k) => { const top = Math.max(v, 0), bot = Math.min(v, 0); rect(S, 'c' + k, G.X(k - .35), G.Y(top), G.X(.7) - G.X(0), Math.max(G.Y(bot) - G.Y(top), .08), k < 3 ? 'warn' : 'ink-3', 55, 2, { r: .06 }); if (k >= 3) S.set('c' + k, 3, { opacity: '.12' }); });
  T(S, 'e1', 1, 14.8, ['8개 픽셀 → 8개 주파수 계수 · 에너지가 앞쪽(저주파)에 몰려요', '8 pixels → 8 frequency coefficients · energy gathers at low frequency'], 'it-s', 2);
  T(S, 'e2', 1, 16.4, ['작은 고주파 계수를 0으로 (양자화) → 3개만 저장', 'zero the small high-frequency ones (quantize) → keep 3'], 'it-s it-w', 3);
  T(S, 'e3', 1, 18, ['역변환한 빨간 점이 원래 값과 거의 같아요', 'the inverse transform (red dots) is almost the original'], 'it-s it-r', 4);
  T(S, 'e4', 1, 19.4, ['JPEG = 8×8 DCT + 양자화 + 허프만 · MP3·AAC는 MDCT', 'JPEG = 8×8 DCT + quantization + Huffman · MP3/AAC use the MDCT'], 'it-xs', 5);
  S.cap(1, '이미지의 한 줄 8픽셀', 'Eight pixels from one image row')
    .cap(2, 'DCT로 바꾸면 대부분의 정보가 낮은 주파수에', 'After a DCT most of the information sits in low frequencies')
    .cap(3, '눈에 덜 띄는 고주파를 버리고', 'Discard the high frequencies the eye barely notices')
    .cap(4, '되돌려도 거의 같은 모양', 'and the reconstruction still looks the same')
    .cap(5, '변환 + 양자화 + 엔트로피 부호화 = 손실 압축의 기본 틀', 'Transform, quantize, entropy-code: the lossy recipe');
  return S;
}

/* ================= channels & error correction ================= */
function sChannel() {
  const S = scene({ id: 'it-channel', steps: 5, per: 1.35 });
  cell(S, 'i0', 2, 3, 2.4, 2, '0', 'line', 40, 0); cell(S, 'i1', 2, 10, 2.4, 2, '1', 'line', 40, 0); cell(S, 'o0', 12, 3, 2.4, 2, '0', 'line', 40, 0); cell(S, 'o1', 12, 10, 2.4, 2, '1', 'line', 40, 0);
  ar(S, 'a00', [4.6, 4], [11.8, 4], 'ok', 0, { h: .16 }); ar(S, 'a11', [4.6, 11], [11.8, 11], 'ok', 0, { h: .16 }); ar(S, 'a01', [4.6, 4.6], [11.8, 10.4], 'danger', 1, { h: .12 }); ar(S, 'a10', [4.6, 10.4], [11.8, 4.6], 'danger', 1, { h: .12 });
  T(S, 'l1', 6.4, 2.4, '1 − p', 'cz-mono it-xs it-g'); T(S, 'l2', 6.4, 6.6, 'p', 'cz-mono it-xs it-r', 1);
  const F = fr(0, 1, 0, 1.1, 17.4, 30, 2.6, 12.4), H = p => p <= 0 || p >= 1 ? 0 : -p * lg(p) - (1 - p) * lg(1 - p);
  ax2(S, 'ga', F, 'p', 'C', 2); mplot(S, 'c', F, p => [p, 1 - H(p)], 0, 1, { st: 2, n: 40, color: 'accent', h: .2 });
  mpt(S, 'd', F, [.11, 1 - H(.11)], 3, C.badf, .34); mT(S, 'dl', F, [.11, 1 - H(.11)], .5, -.3, 'p = 0.11 → C ≈ 0.5', 'cz-mono it-xs', 3);
  T(S, 'e1', 1, 14, ['이진 대칭 채널: C = 1 − H(p) 비트/전송', 'binary symmetric channel: C = 1 − H(p) bits per use'], 'it-s', 2);
  T(S, 'e2', 1, 15.6, ['C보다 낮은 속도면 오류를 원하는 만큼 줄이는 부호가 존재 (섀넌)', 'below C, codes exist with arbitrarily small error (Shannon)'], 'it-s it-g', 4);
  T(S, 'e3', 1, 17.4, 'C = B log₂(1 + S/N)', 'cz-mono it-l', 5); T(S, 'e4', 13, 17.6, ['3 kHz, SNR 30 dB → 약 30 kbit/s', '3 kHz, 30 dB SNR → about 30 kbit/s'], 'it-xs', 5);
  S.cap(1, '잡음 있는 채널은 확률 p로 비트를 뒤집어요', 'A noisy channel flips each bit with probability p')
    .cap(2, '채널 용량은 p에 따라 달라지고', 'Its capacity depends on p')
    .cap(3, '11% 확률로 뒤집혀도 절반의 정보는 보낼 수 있어요', 'Even at 11% flips, half a bit per use gets through')
    .cap(4, '용량 이하라면 오류 정정 부호로 신뢰성 있게 보낼 수 있어요', 'Below capacity, error-correcting codes make it reliable')
    .cap(5, '대역폭과 신호 대 잡음비가 최대 전송 속도를 정해요', 'Bandwidth and SNR cap the data rate');
  return S;
}
function sParity() {
  const S = scene({ id: 'it-parity', steps: 5, per: 1.35 });
  const d = '1011001', cw = 2.4, X = 2;
  bitcells(S, 'd', X, 3, d, { cw }); cell(S, 'p', X + 7 * cw, 3, cw - .14, 1.6, '0', 'ok', 50, 1);
  T(S, 'pl', X + 7 * cw, 1.4, ['패리티', 'parity'], 'it-xs it-g', 1); T(S, 'c1', 1, 6, ['1의 개수 = 4 (짝수) → 패리티 0', 'four 1s (even) → parity 0'], 'it-s', 1);
  cell(S, 'f1', X + 2 * cw, 3, cw - .14, 1.6, '0', 'danger', 45, 2, { off: 4 });
  T(S, 'c2', 1, 8.4, ['비트 하나가 뒤집히면 1이 홀수 → 오류 검출 ✓', 'one flipped bit makes the count odd → detected ✓'], 'it-s it-g', 3);
  cell(S, 'f2a', X + 2 * cw, 3, cw - .14, 1.6, '0', 'danger', 45, 4); cell(S, 'f2b', X + 5 * cw, 3, cw - .14, 1.6, '1', 'danger', 45, 4);
  T(S, 'c3', 1, 10.4, ['두 개가 뒤집히면 다시 짝수 → 못 잡아요 ✗', 'two flips keep it even → missed ✗'], 'it-s it-r', 4);
  T(S, 'c4', 1, 13, ['어느 비트인지는 몰라서 고칠 수 없어요 → 재전송', 'it can’t tell which bit, so it can’t fix it → resend'], 'it-s', 5);
  T(S, 'c5', 1, 14.6, ['RAID 5, UART 직렬 통신, 메모리 패리티', 'RAID 5, UART serial links, memory parity'], 'it-xs', 5);
  S.cap(1, '데이터 끝에 1의 개수를 짝수로 맞추는 비트를 붙여요', 'Append a bit that makes the number of 1s even')
    .cap(2, '전송 중 비트 하나가 뒤집히면', 'If one bit flips in transit')
    .cap(3, '1의 개수가 홀수가 되어 오류를 알아채요', 'the count turns odd and the error is detected')
    .cap(4, '짝수 개가 뒤집히면 알아채지 못해요', 'An even number of flips slips through')
    .cap(5, '단순하고 싸지만 검출만 가능해요', 'Cheap and simple, but detection only');
  return S;
}
function sHamming() {
  const S = scene({ id: 'it-hamming', steps: 5, per: 1.35 });
  const C3 = [[9.4, 7.6, 'accent', 'P1'], [14.6, 7.6, 'warn', 'P2'], [12, 12, 'ok', 'P3']];
  C3.forEach(([x, y, c, l], i) => { ring(S, 'c' + i, x, y, 4.6, c, 0, { w: .16, fill: `color-mix(in srgb,var(--${c}) 12%,transparent)` }); });
  T(S, 'l0', 4, 3.4, 'P1', 'cz-mono it-s it-a'); T(S, 'l1', 18.6, 3.4, 'P2', 'cz-mono it-s it-w'); T(S, 'l2', 16.6, 16, 'P3', 'cz-mono it-s it-g');
  const reg = { d1: [12, 5.6], d2: [9.4, 11], d3: [14.6, 11], d4: [12, 9], p1: [7.4, 6.6], p2: [16.6, 6.6], p3: [12, 14.6] };
  const V = (k, v, st, c, off) => T(S, k, reg[k.slice(0, 2)][0] - 1, reg[k.slice(0, 2)][1] - .6, v, 'cz-tc cz-mono it-l' + (c ? ' it-' + c : ''), st, { w: 2, off, css: 'z-index:6' });
  V('d1', '1', 1); V('d2', '0', 1); V('d4', '1', 1); V('d3', '1', 1, '', 3); V('d3x', '0', 3, 'r', 5); V('d3y', '1', 5, 'g');
  V('p1', '0', 2, 'a'); V('p2', '1', 2, 'w'); V('p3', '0', 2, 'g');
  T(S, 'data', 21.6, 2.4, ['데이터 1011', 'data 1011'], 'cz-mono it-l', 1);
  T(S, 'cw', 21.6, 4.4, ['각 원의 1을 짝수로', 'make each circle even'], 'it-xs', 2); T(S, 'cw2', 21.6, 5.8, 'p1 p2 d1 p3 d2 d3 d4', 'cz-mono it-xs', 2); T(S, 'cw3', 21.6, 7, '0 1 1 0 0 1 1', 'cz-mono it-s it-a', 2);
  T(S, 'er', 21.6, 9.2, ['d3이 뒤집힘', 'd3 flips'], 'it-s it-r', 3);
  ring(S, 'h1', 14.6, 7.6, 4.6, 'danger', 4, { w: .3, off: 5 }); ring(S, 'h2', 12, 12, 4.6, 'danger', 4, { w: .3, off: 5 });
  T(S, 'sy', 21.6, 11, ['P2, P3만 홀수', 'only P2, P3 odd'], 'it-s it-r', 4); T(S, 'sy2', 21.6, 12.4, ['→ 둘의 공통 영역 = d3', '→ their shared region = d3'], 'it-xs', 4);
  T(S, 'fx', 21.6, 14.4, ['d3을 뒤집어 복구 ✓', 'flip d3 back ✓'], 'it-s it-g', 5); T(S, 'fx2', 21.6, 16, ['해밍 거리 3: 1개 정정', 'distance 3: corrects 1'], 'it-xs', 5);
  S.cap(1, '데이터 4비트를 세 원이 겹치는 영역에 배치', 'Place four data bits in the overlaps of three circles')
    .cap(2, '각 원 안의 1이 짝수가 되도록 패리티 3비트를 채워요', 'Fill three parity bits so each circle has an even number of 1s')
    .cap(3, '전송 중 비트 하나가 뒤집히면', 'One bit flips in transit')
    .cap(4, '홀수가 된 원들의 공통 영역이 오류 위치', 'The circles that turn odd point to exactly one region')
    .cap(5, '그 비트를 뒤집으면 복구 · ECC 메모리, QR 코드의 원리', 'Flip it back: the idea behind ECC memory and QR codes');
  return S;
}
function sCrc() {
  const S = scene({ id: 'it-crc', steps: 5, per: 1.35 });
  const data = '11010011101100', gen = '1011', r = (() => { const a = (data + '000').split('').map(Number); for (let i = 0; i <= a.length - 4; i++) if (a[i]) for (let j = 0; j < 4; j++) a[i + j] ^= +gen[j]; return a.slice(-3).join(''); })();
  T(S, 'g', 1, 1.4, ['생성 다항식 x³ + x + 1 = 1011', 'generator x³ + x + 1 = 1011'], 'cz-mono it-s');
  bitcells(S, 'd', 1.4, 3, data, { cw: 1.6 }); bitcells(S, 'z', 1.4 + 14 * 1.6, 3, '000', { cw: 1.6, st: 1, color: () => 'line', pct: 20 });
  T(S, 's1', 1, 6, ['데이터 뒤에 0을 3개 붙이고 1011로 XOR 나눗셈', 'append three 0s and divide by 1011 with XOR'], 'it-s', 1);
  T(S, 's2', 1, 7.8, ['나머지 = ' + r, 'remainder = ' + r], 'cz-mono it-l it-w', 2);
  bitcells(S, 'tx', 1.4, 10, data, { cw: 1.6, st: 3 }); bitcells(S, 'tr', 1.4 + 14 * 1.6, 10, r, { cw: 1.6, st: 3, color: () => 'warn', pct: 50 });
  T(S, 's3', 1, 13, ['나머지를 붙여 보내면 전체가 1011로 나눠떨어져요', 'append it: the frame is now divisible by 1011'], 'it-s', 3);
  T(S, 's4', 1, 14.8, ['수신 측 나머지 000 → 정상 ✓ · 0이 아니면 오류', 'receiver remainder 000 → OK ✓ · nonzero → error'], 'it-s it-g', 4);
  T(S, 's5', 1, 16.8, ['연속된 r비트 이하의 버스트 오류는 모두 검출 (r = 차수)', 'catches every burst error up to r bits (r = degree)'], 'it-xs', 5);
  T(S, 's6', 1, 18.2, ['이더넷·Wi-Fi는 CRC-32, ZIP·PNG도 CRC로 무결성 확인', 'Ethernet and Wi-Fi use CRC-32; ZIP and PNG check integrity with CRC'], 'it-xs', 5);
  S.cap(1, '데이터를 다항식의 계수로 보고', 'Treat the data bits as polynomial coefficients')
    .cap(2, '생성 다항식으로 나눈 나머지를 구해요 (자리올림 없는 XOR)', 'Divide by the generator using carry-free XOR')
    .cap(3, '나머지를 붙여 보내면', 'Send the data with the remainder attached')
    .cap(4, '받는 쪽에서 다시 나눠 0인지 확인해요', 'The receiver divides again and checks for zero')
    .cap(5, '하드웨어로 빠르고 버스트 오류에 강해요', 'Fast in hardware and strong against burst errors');
  return S;
}

/* ================= more scenes ================= */
const px = (S, k, x, y, w, h, c, st, o = {}) => { S.el(k, { x, y, w, h, css: `background:${c};border-radius:.14em;${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
function huffLen(ps) { let nodes = ps.map((p, i) => ({ p, lv: [i] })); const Ls = ps.map(() => 0); while (nodes.length > 1) { nodes.sort((a, b) => a.p - b.p); const [a, b] = nodes.splice(0, 2); a.lv.concat(b.lv).forEach(i => Ls[i]++); nodes.push({ p: a.p + b.p, lv: a.lv.concat(b.lv) }); } return Ls; }
function sSource() {
  const S = scene({ id: 'it-source', steps: 5, per: 1.35 });
  const p = .9, H = -p * lg(p) - (1 - p) * lg(1 - p);
  const avg = n => { const ps = []; for (let m = 0; m < 1 << n; m++) { let q = 1; for (let j = 0; j < n; j++) q *= (m >> j) & 1 ? 1 - p : p; ps.push(q); } const Ls = huffLen(ps); return ps.reduce((a, q, i) => a + q * Ls[i], 0) / n; };
  const vals = [1, avg(2), avg(3), avg(4)], F = fr(.4, 4.6, 0, 1.15, 17, 30.4, 3, 15.4);
  ax2(S, 'ga', F, '', ['비트/기호', 'bits/symbol']);
  vals.forEach((v, i) => { const st = [1, 2, 3, 3][i]; rect(S, 'b' + i, F.X(i + 1 - .32), F.Y(v), F.X(.64) - F.X(0), F.Y(0) - F.Y(v), i ? 'accent' : 'ink-3', 50, st, { r: .08 });
    T(S, 'bv' + i, F.X(i + 1) - 1.4, F.Y(v) - 1.3, v.toFixed(3), 'cz-tc cz-mono it-xs', st, { w: 2.8 }); T(S, 'bx' + i, F.X(i + 1) - 1.4, F.B + .3, 'n = ' + (i + 1), 'cz-tc cz-mono it-xs', 0, { w: 2.8 }); });
  hl(S, 'h', F.L, F.R, F.Y(H), 'danger', 4, { w: .12, dash: 1 });
  T(S, 't1h', 1, 2.4, ['한 기호씩 (p(A) = 0.9)', 'one symbol at a time (p(A) = 0.9)'], 'it-s', 1, { off: 2 });
  [['A', '0.9', '0'], ['B', '0.1', '1']].forEach(([s, q, c], i) => T(S, 't1' + i, 1, 4 + i * 1.5, `${s} · ${q} → ${c}`, 'cz-mono it-s', 1, { off: 2 }));
  T(S, 't2h', 1, 2.4, ['두 개씩 묶어 허프만', 'pairs, Huffman-coded'], 'it-s', 2);
  [['AA', '0.81', '0'], ['AB', '0.09', '10'], ['BA', '0.09', '110'], ['BB', '0.01', '111']].forEach(([s, q, c], i) => T(S, 't2' + i, 1, 4 + i * 1.5, `${s} · ${q} → ${c}`, 'cz-mono it-s', 2));
  T(S, 't2a', 1, 10.2, '(0.81·1 + 0.09·2 + 0.09·3 + 0.01·3) / 2', 'cz-mono it-xs', 2);
  T(S, 't3', 1, 11.6, ['= 0.645비트/기호', '= 0.645 bits/symbol'], 'cz-mono it-s it-a', 2);
  T(S, 't4', 1, 13.4, [`세 개씩 ${vals[2].toFixed(3)} · 네 개씩 ${vals[3].toFixed(3)}`, `triples ${vals[2].toFixed(3)} · quads ${vals[3].toFixed(3)}`], 'it-xs', 3);
  T(S, 't5', 1, 15, [`점선 = 엔트로피 ${H.toFixed(3)}`, `dashed = entropy ${H.toFixed(3)}`], 'it-xs it-r', 4);
  T(S, 't6', 1, 18.2, ['평균 부호 길이 ≥ H · 블록을 키우면 H에 얼마든지 가까워져요', 'average length ≥ H, and longer blocks get as close as you like'], 'cz-tc it-s', 5, { w: 30 });
  S.cap(1, '앞면이 90%인 동전 결과를 한 기호씩 부호화하면 1비트', 'Coding a 90/10 source one symbol at a time costs 1 bit')
    .cap(2, '두 개씩 묶어 허프만 부호를 만들면 0.645비트', 'Huffman on pairs: 0.645 bits per symbol')
    .cap(3, '더 길게 묶을수록 줄어들어요', 'Longer blocks do better')
    .cap(4, '하지만 엔트로피 아래로는 내려갈 수 없어요', 'but never below the entropy')
    .cap(5, '엔트로피가 무손실 압축의 정확한 한계 (섀넌의 원천 부호화 정리)', 'Entropy is the exact limit of lossless coding (Shannon)');
  return S;
}
function sBwt() {
  const S = scene({ id: 'it-bwt', steps: 5, per: 1.35 });
  const w = 'banana$', n = 7, rots = [...Array(n)].map((_, i) => w.slice(i) + w.slice(0, i)), order = rots.map((r, i) => i).sort((a, b) => rots[a] < rots[b] ? -1 : 1), cw = 1.5, X = 2, Y = 2.6, rh = 1.9;
  rots.forEach((r, i) => { const pos = order.indexOf(i); r.split('').forEach((c, j) => { const k = `c${i}_${j}`; cell(S, k, X + j * cw, Y + i * rh, cw - .14, 1.6, c, 'line', 35, 0); S.move(k, 2, X + j * cw, Y + pos * rh); if (j === n - 1) tsets(S, k, [[3, 'warn', 55]]); }); });
  T(S, 'lh', X + (n - 1) * cw - 1.2, 1, ['마지막 열', 'last column'], 'cz-tc it-xs it-w', 3, { w: 3.8 });
  T(S, 'r1', 14, 2.6, ['회전 7개를 사전순으로 정렬', 'sort all 7 rotations'], 'it-s', 2);
  T(S, 'r2', 14, 4.6, ['마지막 열만 내보내요', 'output only the last column'], 'it-s', 3);
  bitcells(S, 'o', 14, 6.6, 'annb$aa', { cw: 1.8, st: 4, color: (i, b) => b === 'a' ? 'accent' : b === 'n' ? 'ok' : 'line', pct: 45 });
  T(S, 'r3', 14, 9, ['같은 글자가 뭉쳐요 → 런 길이·MTF로 잘 줄어요', 'like letters cluster → RLE and move-to-front shrink it'], 'it-xs', 4);
  T(S, 'r4', 14, 11, ['끝 표시 $ 덕분에 원래 문자열로 되돌릴 수 있어요', 'the $ end marker makes it reversible'], 'it-xs', 5);
  T(S, 'r5', 14, 12.6, ['bzip2 = BWT + MTF + 허프만', 'bzip2 = BWT + MTF + Huffman'], 'it-s it-g', 5);
  T(S, 'r6', 14, 14.2, ['유전체 검색(FM 인덱스)에도 써요', 'also powers genome search (FM-index)'], 'it-xs', 5);
  S.cap(1, '문자열 banana$의 모든 회전을 만들고', 'Write out every rotation of banana$')
    .cap(2, '사전순으로 정렬해요', 'Sort them')
    .cap(3, '마지막 열을 읽으면', 'Read off the last column')
    .cap(4, 'annb$aa: 같은 글자가 붙어 있어 압축이 쉬워요', 'annb$aa: like letters sit together, easy to compress')
    .cap(5, '정보는 그대로 두고 배치만 바꾸는 변환', 'Same information, rearranged to compress better');
  return S;
}
function sVarint() {
  const S = scene({ id: 'it-varint', steps: 5, per: 1.35 });
  const v = [1000, 1003, 1004, 1010], d = [1000, 3, 1, 6];
  T(S, 'vh', 1, 1.4, ['타임스탬프', 'timestamps'], 'it-s');
  v.forEach((x, i) => cell(S, 'v' + i, 2 + i * 4.4, 2.8, 4, 1.8, String(x), 'line', 40, 0));
  T(S, 'dh', 1, 5.4, ['앞 값과의 차이 (델타)', 'difference from the previous value (delta)'], 'it-s', 1);
  d.forEach((x, i) => cell(S, 'd' + i, 2 + i * 4.4, 6.8, 4, 1.8, (i ? '+' : '') + x, 'accent', 40, 1));
  T(S, 'bh', 1, 9.8, ['int32 고정: 4바이트 × 4 = 16바이트', 'fixed int32: 4 bytes × 4 = 16 bytes'], 'it-s it-r', 2);
  for (let i = 0; i < 16; i++) cell(S, 'fx' + i, 2 + i * 1.08, 11.2, .94, 1.2, '', 'danger', 25, 2);
  T(S, 'vh2', 1, 13.4, ['varint: 2 + 1 + 1 + 1 = 5바이트', 'varint: 2 + 1 + 1 + 1 = 5 bytes'], 'it-s it-g', 3);
  for (let i = 0; i < 5; i++) cell(S, 'vb' + i, 2 + i * 1.08, 14.8, .94, 1.2, '', 'ok', 45, 3);
  T(S, 'e0', 20.4, 9.8, ['300을 varint로', '300 as a varint'], 'it-s', 4);
  T(S, 'e1', 20.4, 11.2, '300 = 100101100₂', 'cz-mono it-xs', 4);
  T(S, 'e2', 20.4, 12.6, '0000010 | 0101100', 'cz-mono it-xs', 4);
  T(S, 'e3', 20.4, 14, ['하위 7비트부터 + 계속 비트', 'low 7 bits first + more-bit'], 'it-xs', 4);
  T(S, 'e4', 20.4, 15.4, '10101100 00000010', 'cz-mono it-xs it-a', 4); T(S, 'e5', 20.4, 16.8, '= AC 02', 'cz-mono it-s it-a', 4);
  T(S, 'u', 1, 18.6, ['Protocol Buffers, SQLite, Git 팩 파일, 검색 엔진 역색인, Parquet', 'Protocol Buffers, SQLite, Git packfiles, search posting lists, Parquet'], 'cz-tc it-xs', 5, { w: 30 });
  S.cap(1, '비슷한 값이 이어지면 차이만 저장해요', 'When values are close, store the differences')
    .cap(2, '고정 길이로 쓰면 작은 수도 4바이트씩', 'Fixed width spends 4 bytes even on tiny numbers')
    .cap(3, '가변 길이 정수는 작은 수를 1바이트로', 'A varint stores small numbers in one byte')
    .cap(4, '7비트씩 끊고 맨 앞 비트로 "다음 바이트 있음"을 표시', 'Seven bits per byte; the top bit says “more follows”')
    .cap(5, '델타 + varint는 정렬된 ID·시간 데이터의 기본 압축', 'Delta + varint is the default for sorted IDs and timestamps');
  return S;
}
function sLimit() {
  const S = scene({ id: 'it-limit', steps: 5, per: 1.35 });
  const ins = ['000', '001', '010', '011', '100', '101', '110', '111'], outs = ['ε', '0', '1', '00', '01', '10', '11'];
  T(S, 'ih', 2, 1, ['3비트 입력 8개', 'eight 3-bit inputs'], 'it-s');
  ins.forEach((s, i) => cell(S, 'i' + i, 2, 2.4 + i * 2, 4, 1.6, s, 'line', 40, 0));
  T(S, 'oh', 15, 1, ['더 짧은 출력 7개', 'seven shorter outputs'], 'it-s', 2);
  outs.forEach((s, i) => cell(S, 'o' + i, 15, 2.4 + i * 2, 4, 1.6, s, 'accent', 35, 2));
  outs.forEach((s, i) => ar(S, 'a' + i, [6.3, 3.2 + i * 2], [14.7, 3.2 + i * 2], 'ok', 3, { h: .1 }));
  ar(S, 'ax', [6.3, 3.2 + 14], [14.7, 3.2 + 12.4], 'danger', 4, { h: .12 });
  tsets(S, 'i7', [[4, 'danger', 45]]); tsets(S, 'o6', [[4, 'danger', 45]]);
  T(S, 'r1', 21, 2.6, '2³ = 8 > 7 = 2³ − 1', 'cz-mono it-s', 3);
  T(S, 'r2', 21, 4.2, ['짧은 문자열이 하나 모자라요', 'one short string too few'], 'it-xs', 3);
  T(S, 'r3', 21, 6.2, ['두 입력이 같은 출력 → 복원 불가', 'two inputs collide → irreversible'], 'it-xs it-r', 4);
  T(S, 'r4', 21, 8.8, ['무작위·암호화 데이터는 안 줄어요', 'random/encrypted data won’t shrink'], 'it-xs', 5);
  T(S, 'r5', 21, 10.2, ['압축한 파일을 또 압축해도 그대로', 're-zipping a zip gains nothing'], 'it-xs', 5);
  T(S, 'r6', 21, 11.6, ['압축 = 흔한 데이터에 짧은 이름', 'short names for likely data'], 'it-xs it-g', 5);
  S.cap(1, '3비트 문자열은 모두 8개', 'There are eight 3-bit strings')
    .cap(2, '그보다 짧은 문자열은 빈 문자열까지 7개뿐', 'Only seven are shorter, counting the empty one')
    .cap(3, '7개는 더 짧게 줄일 수 있지만', 'Seven inputs can map to shorter outputs')
    .cap(4, '마지막 하나는 이미 쓴 출력과 겹쳐요', 'The eighth must collide with one of them')
    .cap(5, '모든 입력을 줄이는 무손실 압축은 없어요 (비둘기집 원리)', 'No lossless compressor shrinks every input (pigeonhole)');
  return S;
}
function sFourier() {
  const S = scene({ id: 'it-fourier', steps: 5, per: 1.35 });
  const P2 = 2 * Math.PI, F = fr(0, P2, -1.5, 1.5, 1.6, 20, 2.6, 14.6), sq = n => x => { let s = 0; for (let k = 1; k <= n; k += 2) s += Math.sin(k * x) / k; return 4 / Math.PI * s; };
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .1 });
  seg(S, 'q0', [F.X(0), F.Y(1)], [F.X(Math.PI), F.Y(1)], 0, 'ink-3', .1, { dash: 1 }); seg(S, 'q1', [F.X(Math.PI), F.Y(1)], [F.X(Math.PI), F.Y(-1)], 0, 'ink-3', .1, { dash: 1 }); seg(S, 'q2', [F.X(Math.PI), F.Y(-1)], [F.X(P2), F.Y(-1)], 0, 'ink-3', .1, { dash: 1 });
  mplot(S, 'h3', F, x => [x, 4 / Math.PI * Math.sin(3 * x) / 3], 0, P2, { st: 2, off: 4, n: 60, color: 'warn', h: .12 });
  mplot(S, 'h5', F, x => [x, 4 / Math.PI * Math.sin(5 * x) / 5], 0, P2, { st: 3, off: 4, n: 60, color: 'ok', h: .12 });
  [[1, 1, 2], [3, 2, 3], [5, 3, 4], [21, 4, 0]].forEach(([n, st, off], i) => mplot(S, 'c' + i, F, x => [x, sq(n)(x)], 0, P2, { st, off, n: i === 3 ? 120 : 72, color: 'accent', h: .2 }));
  const G = fr(0, 10, 0, 1.15, 22.4, 30.6, 2.6, 14.6); ax2(S, 'ga', G, '', ['크기', 'size']);
  [1, 3, 5, 7, 9].forEach((k, i) => { const st = [1, 2, 3, 4, 4][i]; rect(S, 's' + k, G.X(k - .4), G.Y(1 / k), G.X(.8) - G.X(0), G.Y(0) - G.Y(1 / k), ['accent', 'warn', 'ok', 'accent', 'accent'][i], 55, st, { r: .06 }); T(S, 'sk' + k, G.X(k) - 1, G.B + .3, k + 'f', 'cz-tc cz-mono it-xs', st, { w: 2 }); });
  T(S, 'gl', 22.4, 16.4, ['주파수 성분 (스펙트럼)', 'components (spectrum)'], 'it-xs', 1);
  T(S, 'f1', 1, 16.2, '(4/π)(sin x + sin 3x / 3 + sin 5x / 5 + …)', 'cz-mono it-s', 1);
  T(S, 'f2', 1, 17.8, ['항이 늘수록 가까워지지만 모서리의 약 9% 튀는 부분은 남아요 (깁스 현상)', 'more terms get closer, yet a ~9% overshoot stays at the jumps (Gibbs)'], 'it-xs', 4);
  T(S, 'f3', 1, 19.2, ['FFT로 O(n log n)에 계산 · 이퀄라이저, 음성 인식, 이미지 필터, OFDM 무선', 'the FFT computes it in O(n log n) · equalizers, speech, image filters, OFDM radio'], 'it-xs', 5);
  S.cap(1, '기본 주파수의 사인파 하나에서 시작해', 'Start from one sine wave at the base frequency')
    .cap(2, '3배 주파수를 1/3 크기로 더하고', 'Add three times the frequency at a third of the size')
    .cap(3, '5배 주파수를 1/5 크기로 더하면', 'then five times at a fifth')
    .cap(4, '점점 사각파에 가까워져요', 'and it closes in on a square wave')
    .cap(5, '주기 신호는 사인파의 합 · 성분의 크기를 모은 게 스펙트럼', 'Periodic signals are sums of sines; the sizes form the spectrum');
  return S;
}
function sPerceptual() {
  const S = scene({ id: 'it-perceptual', steps: 5, per: 1.35 });
  const base = [[[70, 150, 230], [235, 140, 50]], [[70, 170, 90], [150, 85, 195]]], fk = [[.7, 1], [1.12, .85]];
  const cl = v => Math.max(0, Math.min(255, Math.round(v))), rgb = c => `rgb(${c.map(cl).join(',')})`;
  const toY = ([r, g, b]) => [.299 * r + .587 * g + .114 * b, 128 - .168736 * r - .331264 * g + .5 * b, 128 + .5 * r - .418688 * g - .081312 * b];
  const toR = ([y, cb, cr]) => [y + 1.402 * (cr - 128), y - .344136 * (cb - 128) - .714136 * (cr - 128), y + 1.772 * (cb - 128)];
  const pix = [...Array(4)].map((_, r) => [...Array(4)].map((_, c) => base[r >> 1][c >> 1].map(v => v * fk[r & 1][c & 1] * (1 + .06 * ((r + 2 * c) % 3 - 1))))), ycc = pix.map(row => row.map(toY));
  const avg = (br, bc) => [1, 2].map(j => (ycc[2 * br][2 * bc][j] + ycc[2 * br][2 * bc + 1][j] + ycc[2 * br + 1][2 * bc][j] + ycc[2 * br + 1][2 * bc + 1][j]) / 4);
  const cs = 1.7, G = (k, x0, st, f) => { for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) px(S, `${k}${r}${c}`, x0 + c * cs, 2.6 + r * cs, cs - .1, cs - .1, f(r, c), st); };
  G('o', 1.4, 0, (r, c) => rgb(pix[r][c]));
  G('y', 10.2, 2, (r, c) => { const y = cl(ycc[r][c][0]); return `rgb(${y},${y},${y})`; });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) { const [cb, cr] = avg(r, c); px(S, `c${r}${c}`, 19 + c * cs, 2.6 + r * cs, cs - .1, cs - .1, rgb(toR([150, cb, cr])), 3); }
  G('r', 24.6, 4, (r, c) => { const [cb, cr] = avg(r >> 1, c >> 1); return rgb(toR([ycc[r][c][0], cb, cr])); });
  T(S, 'lo', 1.4, 1, ['원본 RGB', 'RGB original'], 'it-xs'); T(S, 'ly', 10.2, 1, ['밝기 Y', 'luma Y'], 'it-xs', 2); T(S, 'lc', 19, 1, ['색 Cb·Cr', 'chroma'], 'it-xs', 3); T(S, 'lr', 24.6, 1, ['다시 합침', 'recombined'], 'it-xs', 4);
  T(S, 'no', 1.4, 9.6, '16 × 3 = 48', 'cz-mono it-xs'); T(S, 'ny', 10.2, 9.6, '16', 'cz-mono it-xs', 2); T(S, 'nc', 19, 6.4, '4 × 2 = 8', 'cz-mono it-xs', 3);
  T(S, 'n1', 1.4, 12, ['값 개수: 48 → 16 + 4 + 4 = 24 (절반)', 'values: 48 → 16 + 4 + 4 = 24 (half)'], 'it-s it-g', 4);
  T(S, 'n2', 1.4, 13.6, ['눈은 밝기의 세부는 잘 보지만 색의 세부에는 둔해요 (4:2:0 크로마 서브샘플링)', 'eyes resolve brightness detail far better than color detail (4:2:0 chroma subsampling)'], 'it-xs', 4);
  T(S, 'n3', 1.4, 15.8, ['소리도 같아요: 큰 소리 옆의 작은 주파수는 가려져 들리지 않아 MP3·AAC가 버려요 (마스킹)', 'audio too: quiet tones next to loud ones are masked, so MP3 and AAC drop them'], 'it-xs', 5);
  T(S, 'n4', 1.4, 17.2, ['JPEG, H.264, 대부분의 스트리밍 영상이 4:2:0을 써요', 'JPEG, H.264 and most streaming video use 4:2:0'], 'it-xs', 5);
  S.cap(1, '4×4 픽셀 컬러 이미지', 'A 4×4 color image')
    .cap(2, '밝기(Y)는 픽셀마다 그대로 두고', 'Keep brightness (Y) for every pixel')
    .cap(3, '색(Cb, Cr)은 2×2 블록마다 평균 하나만', 'Keep one average color per 2×2 block')
    .cap(4, '다시 합치면 거의 같아 보이는데 데이터는 절반', 'Recombined it looks nearly the same at half the data')
    .cap(5, '사람이 덜 민감한 정보부터 버리는 게 지각 부호화', 'Perceptual coding drops what people notice least');
  return S;
}
function sRs() {
  const S = scene({ id: 'it-rs', steps: 5, per: 1.35 });
  const F = fr(0, 5, 0, 11, 2, 17, 2.6, 16.4);
  ax2(S, 'ga', F, 'x', 'y'); [1, 2, 3, 4].forEach(x => T(S, 'tx' + x, F.X(x) - 1, F.B + .3, String(x), 'cz-tc cz-mono it-xs', 0, { w: 2 }));
  mline(S, 'ln', F, [0, 1], [5, 11], { st: 2, off: 3, color: 'ink-3', h: .1 }); mline(S, 'ln2', F, [0, 1], [5, 11], { st: 4, color: 'ok', h: .12 });
  mpt(S, 'p1', F, [1, 3], 1, C.cur, .42, { off: 3 }); mpt(S, 'p2', F, [2, 5], 1, C.cur, .42); mpt(S, 'p3', F, [3, 7], 2, C.warn, .42, { off: 3 }); mpt(S, 'p4', F, [4, 9], 2, C.warn, .42);
  [[1, 3], [3, 7]].forEach(([x, y], i) => { mT(S, 'x' + i, F, [x, y], -1, -.9, '✕', 'cz-tc it-l it-r', 3, { w: 2, off: 4 }); mpt(S, 'q' + i, F, [x, y], 4, C.okf, .42); });
  [[1, 3], [2, 5], [3, 7], [4, 9]].forEach(([x, y], i) => mT(S, 'v' + i, F, [x, y], -1.8, -.5, String(y), 'cz-mono it-xs', i < 2 ? 1 : 2));
  T(S, 'r1', 19, 2.6, ['데이터 2개: 3, 5', '2 data values: 3, 5'], 'it-s', 1);
  T(S, 'r2', 19, 4.2, ['→ 직선 y = 2x + 1의 x = 1, 2 값', '→ line y = 2x + 1 at x = 1, 2'], 'it-xs', 1);
  T(S, 'r3', 19, 6, ['x = 3, 4의 값 7, 9를 덧붙여 보내요', 'also send x = 3, 4: values 7, 9'], 'it-xs it-w', 2);
  T(S, 'r4', 19, 8, ['두 값이 사라져도 (소실)', 'two values get lost (erasures)'], 'it-xs it-r', 3);
  T(S, 'r5', 19, 9.6, ['남은 두 점이 직선을 정해요', 'the two left pin down the line'], 'it-xs it-g', 4);
  T(S, 'r6', 19, 11, '→ 3, 7', 'cz-mono it-s it-g', 4);
  T(S, 'r7', 19, 13.2, ['k개 데이터 + 2t개 여분', 'k data + 2t extra values'], 'it-xs', 5);
  T(S, 'r8', 19, 14.6, ['→ 오류 t개 또는 소실 2t개 복구', '→ fixes t errors or 2t erasures'], 'it-xs', 5);
  T(S, 'r9', 19, 16.2, ['실제로는 유한체 GF(2⁸)에서 계산', 'real codes work over GF(2⁸)'], 'it-xs', 5);
  T(S, 'u', 1, 18.6, ['QR 코드, CD·DVD, RAID 6, 우주 탐사선 통신, 클라우드 저장소의 이레이저 코딩', 'QR codes, CDs and DVDs, RAID 6, deep-space links, erasure-coded cloud storage'], 'cz-tc it-xs', 5, { w: 30 });
  S.cap(1, '데이터 두 개를 다항식(여기선 직선)의 값으로 봐요', 'Treat two data values as points on a polynomial, here a line')
    .cap(2, '같은 직선의 값 두 개를 더 보내요', 'Send two more values from the same line')
    .cap(3, '전송 중 두 값이 사라져도', 'Even if two values are lost')
    .cap(4, '남은 두 점으로 직선을 되살려 모두 복구', 'the remaining two rebuild the line and everything else')
    .cap(5, '리드-솔로몬 부호의 원리예요', 'That’s the idea behind Reed–Solomon codes');
  return S;
}
function sInter() {
  const S = scene({ id: 'it-interleave', steps: 5, per: 1.35 });
  const cw = 2.2, X = 2, col = { A: 'accent', B: 'warn', C: 'ok' };
  const seq = ['A', 'B', 'C'].flatMap(c => [1, 2, 3, 4].map(i => c + i)), inter = [1, 2, 3, 4].flatMap(i => ['A', 'B', 'C'].map(c => c + i));
  T(S, 'h1', 1, 1.2, ['순서대로 보낼 때', 'sent in order'], 'it-s');
  seq.forEach((s, i) => cell(S, 's' + i, X + i * cw, 2.6, cw - .14, 1.8, s, col[s[0]], 35, 0));
  rect(S, 'b1', X + 5 * cw - .15, 2.3, 3 * cw + .16, 2.4, 'danger', 0, 2, { css: 'border:.2em solid var(--danger);background:none' });
  [5, 6, 7].forEach(i => tsets(S, 's' + i, [[2, 'danger', 50]]));
  T(S, 'r1', X, 5.2, ['B에만 오류 3개 → 1개까지만 고칠 수 있어 실패 ✗', 'three errors all in B, which can fix one → fails ✗'], 'it-s it-r', 2);
  T(S, 'h2', 1, 8.2, ['번갈아 섞어서(인터리빙) 보낼 때', 'interleaved'], 'it-s', 3);
  inter.forEach((s, i) => cell(S, 't' + i, X + i * cw, 9.6, cw - .14, 1.8, s, col[s[0]], 35, 3));
  rect(S, 'b2', X + 5 * cw - .15, 9.3, 3 * cw + .16, 2.4, 'danger', 0, 4, { css: 'border:.2em solid var(--danger);background:none' });
  [5, 6, 7].forEach(i => tsets(S, 't' + i, [[4, 'danger', 50]]));
  T(S, 'r2', X, 12.2, ['같은 버스트가 C, A, B에 하나씩 → 모두 정정 ✓', 'the same burst hits C, A, B once each → all fixed ✓'], 'it-s it-g', 4);
  T(S, 'r3', 1, 15.4, ['연속 오류(디스크 긁힘, 무선 페이딩)를 흩어 각 부호어가 감당할 만큼 나눠요', 'it spreads a burst (a scratch, a radio fade) thin enough for each codeword'], 'it-xs', 5);
  T(S, 'r4', 1, 16.8, ['CD는 리드-솔로몬 두 겹 + 인터리빙(CIRC)으로 약 3,500비트 연속 오류도 복구', 'CDs pair two Reed–Solomon layers with interleaving (CIRC) to fix bursts of ~3,500 bits'], 'it-xs', 5);
  S.cap(1, '부호어 A, B, C는 각각 오류 1개까지 고쳐요', 'Codewords A, B and C can each fix one error')
    .cap(2, '순서대로 보내면 연속 오류가 B 하나에 몰려요', 'Sent in order, a burst lands entirely in B')
    .cap(3, '기호를 번갈아 섞어서 보내면', 'Interleave the symbols instead')
    .cap(4, '같은 버스트가 세 부호어에 하나씩 흩어져요', 'and the same burst spreads one error to each')
    .cap(5, '버스트 오류를 흩어진 오류로 바꾸는 기법', 'Interleaving turns bursts into scattered errors');
  return S;
}
function sLuhn() {
  const S = scene({ id: 'it-luhn', steps: 5, per: 1.35 });
  const ds = '7992739871'.split('').map(Number), n = ds.length, cw = 2.2, X = 2, dbl = ds.map((d, i) => (n - 1 - i) % 2 === 0), val = ds.map((d, i) => dbl[i] ? (d * 2 > 9 ? d * 2 - 9 : d * 2) : d), sum = val.reduce((a, b) => a + b, 0), ck = (10 - sum % 10) % 10;
  T(S, 'h', 1, 1.2, ['검사 숫자를 붙일 번호', 'number to protect'], 'it-s');
  ds.forEach((d, i) => { cell(S, 'd' + i, X + i * cw, 2.6, cw - .14, 1.8, String(d), 'line', 40, 0); if (dbl[i]) tsets(S, 'd' + i, [[1, 'warn', 45]]); });
  ds.forEach((d, i) => { if (dbl[i]) T(S, 'x' + i, X + i * cw, 4.6, '×2', 'cz-tc cz-mono it-xs it-w', 1, { w: cw - .14 }); });
  ds.forEach((d, i) => cell(S, 'v' + i, X + i * cw, 6.4, cw - .14, 1.8, String(val[i]), dbl[i] ? 'warn' : 'line', 40, 2));
  T(S, 'r2', 1, 8.8, ['2배가 10 이상이면 두 자리를 더해요 (16 → 7, 18 → 9)', 'a double of 10 or more becomes its digit sum (16 → 7, 18 → 9)'], 'it-xs', 2);
  T(S, 'r3', 1, 10.6, [`합 = ${sum} → 검사 숫자 = (10 − ${sum % 10}) mod 10 = ${ck}`, `sum = ${sum} → check digit = (10 − ${sum % 10}) mod 10 = ${ck}`], 'cz-mono it-s', 3);
  cell(S, 'ck', X + n * cw, 2.6, cw - .14, 1.8, String(ck), 'ok', 55, 3);
  cell(S, 'd3x', X + 3 * cw, 2.6, cw - .14, 1.8, '5', 'danger', 50, 4); cell(S, 'v3x', X + 3 * cw, 6.4, cw - .14, 1.8, '1', 'danger', 50, 4);
  T(S, 'r4', 1, 12.6, [`2를 5로 잘못 쓰면: ${sum - 3} + ${ck} = ${sum - 3 + ck} → 10의 배수가 아님 ✗`, `typo 2 → 5: ${sum - 3} + ${ck} = ${sum - 3 + ck}, not a multiple of 10 ✗`], 'cz-mono it-s it-r', 4);
  T(S, 'r5', 1, 15, ['한 자리 오류는 모두, 이웃한 두 자리 바꿈은 09 ↔ 90만 빼고 잡아요', 'it catches every single-digit error and every adjacent swap except 09 ↔ 90'], 'it-xs', 5);
  T(S, 'r6', 1, 16.4, ['카드 번호·IMEI는 룬 · ISBN-13은 가중치 1, 3 · ISBN-10은 mod 11', 'card numbers and IMEI use Luhn · ISBN-13 weights 1, 3 · ISBN-10 uses mod 11'], 'it-xs', 5);
  S.cap(1, '맨 오른쪽부터 한 칸 걸러 숫자를 2배로', 'Double every second digit, starting from the right')
    .cap(2, '두 자리가 되면 각 자리를 더해요', 'Two-digit results become their digit sum')
    .cap(3, '합이 10의 배수가 되도록 검사 숫자를 붙여요', 'Append the digit that makes the total a multiple of 10')
    .cap(4, '한 자리라도 틀리면 합이 어긋나요', 'A single wrong digit breaks the total')
    .cap(5, '고치지는 못해도 옮겨 적는 실수를 바로 잡아내요 (룬 알고리즘)', 'It can’t fix errors, but catches typos instantly (Luhn)');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'itx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono itx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono itx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c itx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono itx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c itx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'itx-s itx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono itx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono itx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono itx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono itx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono itx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'itx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'itx-xs', 5));


const CSSX = `
.itx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.itx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.itx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.itx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.itx-r .in{color:var(--danger);font-weight:800}
.itx-g .in{color:var(--ok);font-weight:800}
.itx-a .in{color:var(--accent);font-weight:800}
.itx-w .in{color:var(--warn);font-weight:800}
.itx-c .in{font-size:.6em;font-weight:700}
.itx-c2 .in{font-size:.5em;font-weight:700}
.itx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.itx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'itx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };

/* ================= entropy ================= */
function sPwent() {
  const S = scene({ id: 'it-pwent', steps: 5, per: 1.6 });
  T(S, 'f', 1, .2, ['H = L × log₂N   (N: 고를 수 있는 기호 수, L: 길이)', 'H = L × log₂N   (N: number of symbols, L: length)'], 'cz-mono itx-xs itx-a', 0);
  const ROWS = [[['PIN 숫자 4자리', '4-digit PIN'], '10⁴', 13.3, 'danger', 1], [['소문자 8자', '8 lowercase letters'], '26⁸', 37.6, 'warn', 2], [['출력 가능 문자 8자', '8 printable characters'], '95⁸', 52.6, 'accent', 2], [['무작위 단어 4개', '4 random words'], '7776⁴', 51.7, 'ok', 3], [['무작위 단어 6개', '6 random words'], '7776⁶', 77.5, 'ok', 3]];
  ROWS.forEach(([lab, n, b, c, st], i) => {
    const y = 1.5 + i * 1.35;
    T(S, 'rl' + i, 1, y + .1, lab, 'itx-xs', st);
    T(S, 'rn' + i, 7.6, y + .1, n, 'cz-mono itx-xs', st);
    rect(S, 'rb' + i, 10.6, y, b * .22, 1, c, 40, st, { r: .15 });
    T(S, 'rv' + i, 10.9 + b * .22, y + .1, b + ' bit', 'cz-mono itx-xs', st);
  });
  T(S, 'ct', 1, 8.6, ['초당 100억 번 추측할 때 (유출된 해시를 오프라인 공격)', 'at 10 billion guesses per second (offline attack on a leaked hash)'], 'itx-xs itx-a', 4);
  [[['13.3 bit → 즉시', '13.3 bit → instant'], 'danger'], [['37.6 bit → 21초', '37.6 bit → 21 s'], 'warn'], [['52.6 bit → 8일', '52.6 bit → 8 days'], 'accent'], [['77.5 bit → 68만 년', '77.5 bit → 680,000 yr'], 'ok']].forEach(([t, c], i) => box2(S, 'tc' + i, 1 + i * 7.6, 9.6, 7.2, 1.1, t, c, 4, { pct: 30 }));
  stepT(S, 'k', 1, 11.2, [['무작위로 고르면 엔트로피 = 길이 × log₂(기호 수) · PIN 4자리는 13.3비트', 'for a random choice, entropy = length × log₂(symbols) · a 4-digit PIN is 13.3 bits'], ['기호 종류를 늘리면 글자당 비트가 늘어요: 소문자 4.7 → 출력 가능 문자 6.6비트', 'more kinds of symbols add bits per character: lowercase 4.7 → printable 6.6 bits'], ['7,776개 중 무작위 단어 하나는 12.9비트 → 길이가 복잡함을 이겨요', 'a random word out of 7,776 is 12.9 bits → length beats complexity'], ['사람이 고른 P@ssw0rd1 같은 건 패턴이라 실제 엔트로피가 훨씬 낮아요', 'human picks like P@ssw0rd1 follow patterns, so their real entropy is far lower']]);
  fin(S, 'z', 12.6, [['비밀번호의 강도는 “얼마나 무작위로 골랐나”로 정해져요 · 1비트 늘 때마다 경우의 수가 2배', 'password strength is about how randomly it was chosen · each extra bit doubles the possibilities', 'itx-xs itx-a'], ['비밀번호 관리자로 무작위 생성 · 서버는 bcrypt·Argon2로 추측 속도를 늦춰요', 'generate passwords randomly with a manager · servers slow guessing with bcrypt or Argon2']]);
  S.cap(1, '길이 × 글자당 비트', 'Length × bits per character').cap(2, '기호 종류 늘리기', 'More kinds of symbols').cap(3, '길이가 이겨요', 'Length wins').cap(4, '깨는 데 걸리는 시간', 'Time to crack').cap(5, '비밀번호 엔트로피', 'Password entropy');
  return S;
}

/* ================= encoding ================= */
function sBase64() {
  const S = scene({ id: 'it-base64', steps: 5, per: 1.6 });
  const CH = [['M', 77], ['a', 97], ['n', 110]], BC = ['accent', 'warn', 'ok'], GC = ['accent', 'warn', 'ok', 'danger'];
  CH.forEach(([c, v], i) => box2(S, 'by' + i, 1 + i * 9.6, 1.2, 9.2, 1.2, `'${c}' = ${v}`, BC[i], 0, { pct: 25 }));
  const bits = CH.map(([, v]) => v.toString(2).padStart(8, '0')).join('');
  [...bits].forEach((b, j) => { box2(S, 'b' + j, 1 + j * 1.2, 2.9, 1.1, 1.2, b, BC[Math.floor(j / 8)], 0, { pct: 18 }); tsets(S, 'b' + j, [[2, GC[Math.floor(j / 6)], 30]]); });
  const G = [[19, 'T'], [22, 'W'], [5, 'F'], [46, 'u']];
  G.forEach(([v, ch], g) => {
    seg(S, 'gl' + g, [1.1 + g * 7.2, 4.35], [7.9 + g * 7.2, 4.35], 2, GC[g], .1);
    box2(S, 'gv' + g, 2.6 + g * 7.2, 4.7, 3.8, 1.1, String(v), GC[g], 2, { pct: 30 });
    ar(S, 'ga' + g, [4.5 + g * 7.2, 5.85], [4.5 + g * 7.2, 6.75], 'ink-3', 3, { h: .08 });
    box2(S, 'gc' + g, 2.6 + g * 7.2, 6.8, 3.8, 1.3, ch, GC[g], 3, { pct: 45 });
  });
  T(S, 'tbl', 1, 8.5, 'A–Z = 0–25 · a–z = 26–51 · 0–9 = 52–61 · + = 62 · / = 63', 'cz-mono itx-xs', 3);
  T(S, 'pad', 1, 9.5, ['"Ma" → TWE= · "M" → TQ== · 모자란 바이트는 = 로 표시', '"Ma" → TWE= · "M" → TQ== · = marks missing bytes'], 'cz-mono itx-xs itx-a', 4);
  stepT(S, 'k', 1, 10.8, [['글자 3개 = 3바이트 = 24비트', '3 characters = 3 bytes = 24 bits'], ['24비트를 6비트씩 네 묶음으로 다시 나눠요 (6비트 = 0~63)', 'regroup the 24 bits into four 6-bit groups (6 bits = 0 to 63)'], ['각 값을 64글자 표에서 찾으면 "TWFu"', 'look each value up in the 64-character table → "TWFu"'], ['3바이트가 안 되면 0을 채우고 =로 표시 · 크기는 4/3배 (33% 늘어요)', 'pad with zeros and mark with = when short · the output is 4/3 the size (33% larger)']]);
  fin(S, 'z', 12.2, [['Base64: 바이너리를 안전한 64개 글자로만 표현하는 인코딩 · 압축도 암호화도 아니에요', 'Base64 writes binary using only 64 safe characters · it is neither compression nor encryption', 'itx-xs itx-a'], ['이메일 첨부(MIME), data: URL, JWT(base64url은 + / 대신 - _)에 쓰여요', 'used in email attachments (MIME), data: URLs and JWTs (base64url uses - _ instead of + /)']]);
  S.cap(1, '3바이트 = 24비트', '3 bytes = 24 bits').cap(2, '6비트씩 다시 묶기', 'Regroup by 6 bits').cap(3, '64글자 표에서 찾기', 'Look up the 64-character table').cap(4, '패딩과 크기', 'Padding and size').cap(5, 'Base64', 'Base64');
  return S;
}

/* ================= signals ================= */
function sDither() {
  const S = scene({ id: 'it-dither', steps: 5, per: 1.6 });
  const NC = 30, NR = 6, CW = 2 / 3, PY = [1.4, 6.0, 10.6];
  const br = c => (c + .5) / NC;
  rect(S, 'orig', 1, PY[0], NC * CW, NR * CW, 'ink', 50, 0, { r: 0, css: 'background:linear-gradient(90deg,var(--ink),var(--ui))!important;border:.06em solid var(--line)' });
  rect(S, 'th0', 1, PY[1], NC * CW / 2, NR * CW, 'ink', 100, 2, { r: 0 }); rect(S, 'th1', 1 + NC * CW / 2, PY[1], NC * CW / 2, NR * CW, 'ink', 0, 2, { r: 0, css: 'border:.06em solid var(--line)' });
  const M = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const FS = []; { const e = [...Array(NR)].map((_, r) => [...Array(NC)].map((_, c) => br(c))); for (let r = 0; r < NR; r++) { FS.push([]); for (let c = 0; c < NC; c++) { const o = e[r][c] >= .5 ? 1 : 0, er = e[r][c] - o; FS[r].push(o); if (c + 1 < NC) e[r][c + 1] += er * 7 / 16; if (r + 1 < NR) { if (c) e[r + 1][c - 1] += er * 3 / 16; e[r + 1][c] += er * 5 / 16; if (c + 1 < NC) e[r + 1][c + 1] += er / 16; } } } }
  frame(S, 'pf', .95, PY[2] - .05, NC * CW + .1, NR * CW + .1, 'line', 3, { w: .06, r: 0 });
  for (let r = 0; r < NR; r++) for (let c = 0; c < NC; c++) {
    const on = br(c) > (M[r % 4][c % 4] + .5) / 16;
    if (!on) rect(S, `bd${r}_${c}`, 1 + c * CW, PY[2] + r * CW, CW, CW, 'ink', 100, 3, { r: 0, off: 4 });
    if (!FS[r][c]) rect(S, `fd${r}_${c}`, 1 + c * CW, PY[2] + r * CW, CW, CW, 'ink', 100, 4, { r: 0 });
  }
  T(S, 'l0', 21.8, PY[0] + 1.4, ['원본: 매끄러운 회색', 'original: smooth gray'], 'itx-xs', 0);
  T(S, 'l1', 21.8, PY[1] + 1.4, ['0.5 기준으로 자르기 → 띠', 'threshold at 0.5 → banding'], 'itx-xs itx-r', 2);
  T(S, 'l2', 21.8, PY[2] + 1.4, ['순서 디더링 (베이어 4×4)', 'ordered dither (Bayer 4×4)'], 'itx-xs itx-a', 3, { off: 4 });
  T(S, 'l3', 21.8, PY[2] + 1.4, ['오차 확산 (플로이드-스타인버그)', 'error diffusion (Floyd–Steinberg)'], 'itx-xs itx-g', 4);
  stepT(S, 'k', 1, 15.2, [['회색 단계를 흑과 백, 두 값으로만 나타내야 해요 (픽셀당 1비트)', 'gray levels must be shown with just black and white (1 bit per pixel)'], ['그냥 반올림하면 경계에 뚜렷한 띠가 생겨요 · 양자화 오차가 한곳에 몰려요', 'plain rounding makes a hard band · the quantization error piles up in one place'], ['위치마다 다른 기준값을 쓰면 점의 밀도로 회색이 보여요', 'a different threshold at each position shows gray as dot density'], ['오차를 이웃 픽셀로 나눠 넘기면 더 자연스러워요 (7/16 · 3/16 · 5/16 · 1/16)', 'passing each error on to neighbours looks more natural (7/16 · 3/16 · 5/16 · 1/16)']]);
  fin(S, 'z', 16.6, [['디더링: 일부러 섞은 잡음으로 양자화 오차를 흩어, 적은 비트로도 중간 톤을 보여 줘요', 'dithering scatters quantization error with deliberate noise so a few bits can show in-between tones', 'itx-xs itx-a'], ['GIF, 전자잉크, 프린터 하프톤, 오디오 비트 깊이를 줄일 때 써요', 'used in GIFs, e-ink, printer halftones and when reducing audio bit depth']]);
  S.cap(1, '흑백 두 값뿐', 'Only black and white').cap(2, '반올림하면 띠', 'Rounding makes bands').cap(3, '순서 디더링', 'Ordered dithering').cap(4, '오차 확산', 'Error diffusion').cap(5, '디더링', 'Dithering');
  return S;
}

/* ================= channel ================= */
function sShannon() {
  const S = scene({ id: 'it-shannon', steps: 5, per: 1.6 });
  T(S, 'f', 1, .2, 'C = B · log₂(1 + S/N)', 'cz-mono itx-s itx-a', 0);
  T(S, 'fd', 11.2, .35, ['B: 대역폭(Hz) · S/N: 신호 대 잡음비', 'B: bandwidth (Hz) · S/N: signal-to-noise ratio'], 'itx-xs', 0);
  const X = d => 2.4 + d * .35, Y = v => 10 - v * .58;
  hl(S, 'ax', 2.2, 16.4, 10, 'ink-3', 1, { w: .06 }); seg(S, 'ay', [2.4, 1.8], [2.4, 10.1], 1, 'ink-3', .06);
  [0, 10, 20, 30, 40].forEach(d => T(S, 'xt' + d, X(d) - 1, 10.2, String(d), 'cz-tc cz-mono itx-tiny', 1, { w: 2 }));
  T(S, 'xl', 10.4, 10.9, 'SNR (dB)', 'cz-mono itx-tiny', 1);
  [0, 5, 10].forEach(v => T(S, 'yt' + v, 1, Y(v) - .3, String(v), 'cz-mono itx-tiny', 1));
  T(S, 'yl', 2.8, 1.5, ['비트/초/Hz', 'bit/s/Hz'], 'itx-tiny', 1);
  poly(S, 'cv', [...Array(41)].map((_, i) => [X(i), Y(Math.log2(1 + Math.pow(10, i / 10)))]), { st: 1, color: 'accent', h: .12 });
  [[30, 'accent', 2], [33, 'warn', 3], [27, 'ok', 3]].forEach(([d, c, st], i) => pt(S, 'p' + i, X(d), Y(Math.log2(1 + Math.pow(10, d / 10))), st, { background: `var(--${c})` }, .3));
  const B = [[['기준: 20 MHz, SNR 30 dB', 'base: 20 MHz, SNR 30 dB'], 199, 'accent', 2], [['전력 2배 → 33 dB', '2× power → 33 dB'], 219, 'warn', 3], [['대역폭 2배 (같은 전력이라 27 dB)', '2× bandwidth (same power → 27 dB)'], 359, 'ok', 3]];
  B.forEach(([lab, v, c, st], i) => { T(S, 'bl' + i, 18.4, 1.9 + i * 2.2, lab, 'itx-xs', st); rect(S, 'bb' + i, 18.4, 2.85 + i * 2.2, v * .035, 1, c, 35, st, { r: .15 }); T(S, 'bv' + i, 18.7, 2.95 + i * 2.2, v + ' Mbps', 'cz-mono itx-xs', st); });
  T(S, 'gain', 18.4, 8.6, ['+10% vs +80%', '+10% vs +80%'], 'cz-mono itx-s itx-g', 3);
  stepT(S, 'k', 1, 11.8, [['C: 오류 없이 보낼 수 있는 최대 속도 · 그래프는 SNR에 따른 Hz당 속도', 'C: the fastest error-free rate · the curve is bits per Hz versus SNR'], ['Wi-Fi 20 MHz, SNR 30 dB(1000배) → 20M × log₂1001 ≈ 199 Mbps', 'Wi-Fi at 20 MHz and 30 dB SNR (1000×) → 20M × log₂1001 ≈ 199 Mbps'], ['SNR은 로그로만 늘고 대역폭은 그대로 곱해져요 → 대역폭 2배가 훨씬 효과적', 'SNR helps only logarithmically while bandwidth multiplies → doubling bandwidth wins'], ['실제 통신은 QAM 변조와 LDPC 부호로 이 한계 가까이 가고, MIMO로 경로를 늘려요', 'real links get close with QAM modulation and LDPC codes, and MIMO adds parallel paths']]);
  fin(S, 'z', 13.2, [['섀넌-하틀리 정리: 대역폭과 SNR이 정하는 통신 속도의 이론적 상한', 'the Shannon–Hartley theorem: the theoretical speed limit set by bandwidth and SNR', 'itx-xs itx-a'], ['그래서 5G와 Wi-Fi 6·7은 더 넓은 채널(80·160·320 MHz)을 확보하려고 해요', 'that is why 5G and Wi-Fi 6/7 chase wider channels (80, 160, 320 MHz)']]);
  S.cap(1, '대역폭과 잡음', 'Bandwidth and noise').cap(2, '와이파이의 한계', 'A Wi-Fi channel’s limit').cap(3, '전력 vs 대역폭', 'Power vs bandwidth').cap(4, '한계에 다가가기', 'Approaching the limit').cap(5, '섀넌-하틀리 정리', 'The Shannon–Hartley theorem');
  return S;
}
function sViterbi() {
  const S = scene({ id: 'it-viterbi', steps: 5, per: 1.6 });
  T(S, 'enc', 1, .2, ['보낸 비트 u = 1 0 1 1  →  부호 11 10 00 01', 'sent bits u = 1 0 1 1  →  code 11 10 00 01'], 'cz-mono itx-xs itx-a', 1);
  T(S, 'rcv', 1, 1.25, ['받은 신호 11 11 00 01 · 1비트 뒤집힘', 'received 11 11 00 01 · 1 bit flipped'], 'cz-mono itx-xs itx-r', 2);
  const ST = ['00', '01', '10', '11'], SY = { '00': 3.8, '01': 5.7, '10': 7.6, '11': 9.5 }, TX = t => 4.2 + t * 5.6, R = .42;
  ST.forEach(s => T(S, 'sl' + s, .8, SY[s] - .32, s, 'cz-mono itx-xs', 2));
  ['11', '11', '00', '01'].forEach((r, t) => T(S, 'rx' + t, (TX(t) + TX(t + 1)) / 2 - 1, 2.5, r, 'cz-tc cz-mono itx-xs' + (t === 1 ? ' itx-r' : ''), 2, { w: 2 }));
  const nxt = (s, u) => String(u) + s[0];
  const active = [['00'], ['00', '10'], ST, ST, ST];
  for (let t = 0; t < 4; t++) active[t].forEach(s => [0, 1].forEach(u => { const n = nxt(s, u); gs(S, `e${t}_${s}_${u}`, [TX(t), SY[s]], [TX(t + 1), SY[n]], 2, 'line', .06, R); }));
  for (let t = 0; t <= 4; t++) ST.forEach(s => stt(S, `n${t}_${s}`, TX(t), SY[s], '', active[t].includes(s) ? 'accent' : 'line', 2, { r: R, pct: 20 }));
  const PM = [{ '00': 0 }, { '00': 2, '10': 0 }, { '00': 4, '01': 1, '10': 2, '11': 1 }, { '00': 3, '01': 2, '10': 1, '11': 2 }, { '00': 3, '01': 2, '10': 3, '11': 1 }];
  PM.forEach((m, t) => Object.entries(m).forEach(([s, v]) => T(S, `m${t}_${s}`, TX(t) + .45, SY[s] - 1.05, String(v), 'cz-mono itx-tiny itx-w', 3)));
  const PATH = [['00', 1], ['10', 0], ['01', 1], ['10', 1]];
  PATH.forEach(([s, u], t) => { gs(S, 'bp' + t, [TX(t), SY[s]], [TX(t + 1), SY[nxt(s, u)]], 4, 'ok', .16, R); T(S, 'du' + t, (TX(t) + TX(t + 1)) / 2 - 1, 10.4, 'u=' + u, 'cz-tc cz-mono itx-xs itx-g', 4, { w: 2 }); });
  tsets(S, 'n4_11', [[4, 'ok', 60]]);
  stepT(S, 'k', 1, 11.6, [['컨볼루션 부호: 입력 1비트마다 최근 3비트를 섞어 2비트를 내보내요 (부호율 1/2)', 'a convolutional code mixes the last 3 bits into 2 output bits per input bit (rate 1/2)'], ['두 번째 묶음에서 1비트가 뒤집혀 도착 · 격자(트렐리스)의 상태 = 직전 두 비트', 'one bit of the second pair arrives flipped · each trellis state = the previous two bits'], ['경로마다 받은 비트와 다른 개수를 누적하고, 상태마다 가장 작은 경로만 남겨요', 'add up each path’s disagreements and keep only the best path into each state'], ['끝에서 가장 작은 상태(거리 1)부터 거꾸로 따라가면 1011 → 오류가 고쳐졌어요', 'trace back from the best final state (distance 1) → 1011, error corrected']]);
  fin(S, 'z', 13.0, [['비터비 알고리즘: 격자 위의 동적 계획법으로 가장 그럴듯한 송신 비트열을 찾아요', 'the Viterbi algorithm finds the most likely sent sequence by dynamic programming over the trellis', 'itx-xs itx-a'], ['계산량이 길이에 비례해 실시간 복호가 돼요 · 위성 통신, Wi-Fi, HMM 음성 인식에 쓰였어요', 'its cost grows linearly with length, so it decodes in real time · used in satellites, Wi-Fi and HMM speech recognition']]);
  S.cap(1, '컨볼루션 부호', 'A convolutional code').cap(2, '오류와 격자', 'An error and the trellis').cap(3, '경로 거리 누적', 'Accumulating path distances').cap(4, '거꾸로 따라가기', 'Tracing back').cap(5, '비터비 복호', 'Viterbi decoding');
  return S;
}

return { css: CSSX, secs: [], add: {
  'it-ent': [
    item('it-pwent', '비밀번호 엔트로피', 'Password entropy', '무작위로 고른 비밀번호의 강도는 “길이 × log₂(기호 수)” 비트로 잴 수 있어요. 비트가 하나 늘 때마다 공격자가 해 봐야 할 경우의 수가 2배가 돼요.', '숫자 4자리 PIN은 10⁴가지라 13.3비트, 소문자 8자는 37.6비트, 출력 가능한 95가지 문자 8자는 52.6비트예요. 7,776개 단어 목록(다이스웨어)에서 무작위 단어 6개를 고르면 77.5비트로, 초당 100억 번 추측해도 68만 년이 걸려요. 길이를 늘리는 것이 기호 종류를 늘리는 것보다 효과가 커요. 다만 이 계산은 “무작위로 골랐을 때”만 맞고, 사람이 고른 P@ssw0rd1 같은 비밀번호는 사전과 변형 규칙으로 금방 맞혀져요. 그래서 비밀번호 관리자로 무작위 생성하고, 서버는 bcrypt나 Argon2로 해시해 추측을 느리게 만들어요.', 'The strength of a randomly chosen password is length × log₂(number of symbols) bits; each extra bit doubles the guesses an attacker must try.', 'A 4-digit PIN has 10⁴ possibilities, 13.3 bits; 8 lowercase letters give 37.6 bits and 8 of the 95 printable characters 52.6 bits. Six random words from a 7,776-word Diceware list give 77.5 bits, about 680,000 years at ten billion guesses per second. Adding length helps more than adding symbol kinds. The calculation only holds for random choices: human picks like P@ssw0rd1 fall quickly to dictionaries and substitution rules. So generate passwords with a manager, and have servers hash them with bcrypt or Argon2 to slow guessing.', sPwent())
  ],
  'it-comp': [
    item('it-base64', 'Base64 인코딩', 'Base64 encoding', '바이너리 데이터를 A–Z, a–z, 0–9, +, / 의 64개 “안전한” 글자로만 표현하는 인코딩이에요. 텍스트만 다룰 수 있는 곳에 바이너리를 실어 보낼 때 써요.', '"Man"의 3바이트(77, 97, 110)는 24비트예요. 이를 6비트씩 네 묶음(19, 22, 5, 46)으로 다시 나누고, 각 값을 64글자 표에서 찾으면 "TWFu"가 돼요. 3바이트가 안 되면 0비트를 채우고 =를 붙여요("Ma" → "TWE="). 그래서 결과는 원본의 4/3배로 커져요. 압축도 암호화도 아니고 누구나 되돌릴 수 있어요. 이메일 첨부(MIME), data: URL, JWT 등에 쓰이고, URL용 base64url은 +, / 대신 -, _를 써요.', 'An encoding that writes binary data using only 64 “safe” characters (A–Z, a–z, 0–9, + and /), used to carry binary through places that only handle text.', 'The 3 bytes of "Man" (77, 97, 110) are 24 bits. Regrouped into four 6-bit values (19, 22, 5, 46) and looked up in the 64-character table, they become "TWFu". When fewer than 3 bytes remain, zero bits are added and = marks the gap ("Ma" → "TWE="). The output is therefore 4/3 the size of the input. It is neither compression nor encryption, and anyone can reverse it. It appears in email attachments (MIME), data: URLs and JWTs; the URL-safe base64url swaps + and / for - and _.', sBase64())
  ],
  'it-sig': [
    item('it-dither', '디더링', 'Dithering', '색이나 비트 수가 부족할 때, 일부러 잡음 같은 점 패턴을 섞어 양자화 오차를 흩뜨려서 중간 톤이 보이게 하는 기법이에요.', '회색 그라데이션을 흑백 두 값으로 그냥 반올림하면 한가운데에 뚜렷한 경계(밴딩)가 생겨요. 순서 디더링은 베이어 행렬처럼 위치마다 다른 기준값을 써서 점의 밀도로 밝기를 표현해요. 오차 확산(플로이드-스타인버그)은 각 픽셀의 양자화 오차를 오른쪽 7/16, 아래 왼쪽 3/16, 아래 5/16, 아래 오른쪽 1/16로 이웃에 넘겨 더 자연스러운 결과를 내요. GIF, 전자잉크, 프린터 하프톤, 오디오 비트 깊이를 줄일 때 써요.', 'When colours or bits are scarce, dithering mixes in a noise-like dot pattern to scatter quantization error so in-between tones still show.', 'Rounding a gray gradient to just black and white leaves a hard edge in the middle, called banding. Ordered dithering uses a different threshold at each position, as in a Bayer matrix, so brightness shows as dot density. Error diffusion (Floyd–Steinberg) passes each pixel’s quantization error on to its neighbours, 7/16 right, 3/16 down-left, 5/16 down and 1/16 down-right, for a more natural look. It is used in GIFs, e-ink, printer halftones and when reducing audio bit depth.', sDither())
  ],
  'it-ch': [
    item('it-shannon', '섀넌-하틀리 정리', 'The Shannon–Hartley theorem', '잡음이 있는 채널로 오류 없이 보낼 수 있는 최대 속도는 C = B·log₂(1 + S/N)이에요. 대역폭 B와 신호 대 잡음비 S/N이 통신 속도의 천장을 정해요.', '20 MHz Wi-Fi 채널의 SNR이 30 dB(1000배)라면 C = 20M × log₂1001 ≈ 199 Mbps예요. 전력을 2배로 올려 33 dB가 되면 219 Mbps로 10%만 늘지만, 같은 전력으로 대역폭을 2배(40 MHz, SNR은 27 dB로 하락)로 넓히면 359 Mbps로 80% 늘어요. SNR은 로그 안에 있고 대역폭은 밖에서 곱해지기 때문이에요. 실제 시스템은 QAM 변조와 LDPC 부호로 이 한계에 가까이 가고, MIMO로 경로를 늘려요. 5G와 Wi-Fi 6·7이 넓은 채널을 확보하려는 이유예요.', 'The fastest error-free rate over a noisy channel is C = B·log₂(1 + S/N): bandwidth B and the signal-to-noise ratio set the ceiling on speed.', 'A 20 MHz Wi-Fi channel with 30 dB SNR (1000×) gives C = 20M × log₂1001 ≈ 199 Mbps. Doubling the power to 33 dB raises it only 10% to 219 Mbps, while doubling the bandwidth to 40 MHz at the same power (SNR falls to 27 dB) gives 359 Mbps, 80% more, because SNR sits inside the logarithm and bandwidth multiplies outside it. Real systems approach the limit with QAM modulation and LDPC codes, and MIMO adds parallel paths, which is why 5G and Wi-Fi 6/7 chase wider channels.', sShannon()),
    item('it-viterbi', '컨볼루션 부호와 비터비 복호', 'Convolutional codes and Viterbi decoding', '컨볼루션 부호는 최근 몇 비트를 섞어 여분의 비트를 만들고, 비터비 알고리즘은 받은 신호와 가장 가까운 송신 비트열을 격자 위 동적 계획법으로 찾아 오류를 고쳐요.', '부호율 1/2, 구속장 3인 부호는 입력 1비트마다 최근 3비트를 XOR해 2비트를 내보내요(1011 → 11 10 00 01). 상태는 직전 두 비트라 4가지이고, 시간에 따라 펼친 그림이 격자(트렐리스)예요. 받은 비트와 각 경로의 해밍 거리를 누적하고, 상태마다 가장 작은 경로(생존 경로)만 남겨요. 끝에서 거리가 가장 작은 상태부터 거꾸로 따라가면 1비트 오류가 있던 11 11 00 01에서도 1011을 복원해요. 계산량이 길이에 비례해 실시간으로 복호할 수 있고, 위성 통신, 이동 통신, HMM 음성 인식에 널리 쓰였어요.', 'Convolutional codes add redundancy by mixing recent bits, and the Viterbi algorithm corrects errors by finding the sent sequence closest to what arrived, using dynamic programming over a trellis.', 'A rate-1/2 code with constraint length 3 XORs the last 3 bits into 2 output bits per input bit (1011 → 11 10 00 01). The state is the previous two bits, so there are 4, and unrolling them over time gives the trellis. The decoder accumulates each path’s Hamming distance from the received bits and keeps only the best (surviving) path into each state. Tracing back from the final state with the smallest distance recovers 1011 even from 11 11 00 01, which has one flipped bit. Its cost grows linearly with length, so it decodes in real time, and it has been used widely in satellite and mobile links and in HMM speech recognition.', sViterbi())
  ]
} };
})();

window.UX = page([
  sec('it-ent', '정보와 엔트로피', 'Information & entropy', '정보와 엔트로피', 'Information and entropy',
    '정보를 비트로 재는 법과 불확실성의 크기예요.', 'Measuring information in bits and the size of uncertainty.', [
    item('it-bits', '정보량과 비트', 'Information and bits', '확률이 낮은 사건일수록 일어났을 때 얻는 정보가 커요. 확률 p인 사건의 정보량은 −log₂p 비트예요.', '예: 동전 1비트, 주사위 한 면 log₂6 ≈ 2.58비트, 1024개 중 하나 10비트. n개 중 하나를 고르려면 예/아니오 질문 ⌈log₂n⌉번(이진 탐색). 독립 사건의 정보량은 더해져요.', 'Rarer events carry more information: an event of probability p carries −log₂p bits.', 'A coin flip is 1 bit, a die face log₂6 ≈ 2.58 bits, one of 1024 options 10 bits. Picking one of n takes ⌈log₂n⌉ yes/no questions (binary search). Information from independent events adds.', sBits()),
    item('it-entropy', '엔트로피', 'Entropy', '확률분포의 평균 정보량 H = −Σp log₂p예요. 불확실성의 크기이자 무손실 압축으로 줄일 수 있는 한계예요.', '공정한 동전 1비트, p = 0.9면 0.47비트, 확정이면 0. 0 ≤ H ≤ log₂n(균등할 때 최대). 영어 텍스트는 글자당 약 1~1.5비트라 8비트 ASCII는 크게 압축돼요. 결정 트리의 분할 기준으로도 써요.', 'The average information of a distribution, H = −Σp log₂p: its uncertainty and the floor for lossless compression.', 'A fair coin has 1 bit, p = 0.9 only 0.47, a certain outcome 0. 0 ≤ H ≤ log₂n, maximized by the uniform distribution. English carries about 1 to 1.5 bits per letter, so 8-bit ASCII compresses well. Decision trees split on it.', sEntropy()),
    item('it-mutual', '조건부 엔트로피와 상호정보량', 'Conditional entropy and mutual information', 'Y를 알고 난 뒤 남은 X의 불확실성이 H(X|Y), 줄어든 양이 상호정보량 I(X;Y)예요.', 'H(X,Y) = H(X) + H(Y|X), I(X;Y) = H(X) − H(X|Y) = H(X) + H(Y) − H(X,Y) ≥ 0. 독립이면 I = 0. 결정 트리의 정보 이득, 특징 선택, 통신 채널 분석에 써요.', 'H(X|Y) is the uncertainty about X left after seeing Y; mutual information I(X;Y) is how much it dropped.', 'H(X,Y) = H(X) + H(Y|X); I(X;Y) = H(X) − H(X|Y) = H(X) + H(Y) − H(X,Y) ≥ 0, zero when independent. Used for decision-tree information gain, feature selection and channel analysis.', sMutual()),
    item('it-kl', '교차 엔트로피와 KL 발산', 'Cross-entropy and KL divergence', '실제 분포 P를 모델 Q로 부호화할 때 평균 비트 수가 교차 엔트로피, 엔트로피보다 더 드는 양이 KL 발산이에요.', 'H(P,Q) = −Σp log q, D(P‖Q) = Σp log(p/q) = H(P,Q) − H(P) ≥ 0. 예: P = (½, ¼, ¼), Q = (¼, ¼, ½) → 1.75 − 1.5 = 0.25비트. 비대칭이라 거리가 아니에요. 분류 모델의 손실, VAE, 지식 증류에 써요.', 'Coding data from P with a model Q costs the cross-entropy; the excess over the entropy is the KL divergence.', 'H(P,Q) = −Σp log q, D(P‖Q) = Σp log(p/q) = H(P,Q) − H(P) ≥ 0. With P = (½, ¼, ¼) and Q = (¼, ¼, ½): 1.75 − 1.5 = 0.25 bits. It is asymmetric, so not a distance. Used as classifier loss, in VAEs and distillation.', sKl()),
    item('it-source', '원천 부호화 정리', 'Source coding theorem', '어떤 무손실 부호든 기호당 평균 길이는 엔트로피보다 짧을 수 없고, 기호를 묶어서 부호화하면 엔트로피에 얼마든지 가까워질 수 있어요.', '예: p(A) = 0.9인 원천의 엔트로피는 0.469비트. 한 기호씩이면 1비트, 두 개씩 허프만이면 0.645, 세 개씩 0.533. 길이 n 블록이면 H ≤ L < H + 1/n. 산술 부호화는 블록 없이도 이 한계에 다가가요.', 'No lossless code averages fewer bits per symbol than the entropy, and coding symbols in blocks gets as close as you like.', 'A source with p(A) = 0.9 has entropy 0.469 bits. One symbol at a time costs 1 bit, Huffman on pairs 0.645, on triples 0.533. With blocks of n, H ≤ L < H + 1/n. Arithmetic coding approaches the bound without blocks.', sSource())
  ].concat(XT.add['it-ent'] || [])),
  sec('it-comp', '무손실 압축', 'Lossless compression', '무손실 압축', 'Lossless compression',
    '정보를 하나도 잃지 않고 크기를 줄이는 부호화예요.', 'Shrinking data without losing a single bit.', [
    item('it-prefix', '접두 부호', 'Prefix codes', '어떤 부호어도 다른 부호어의 앞부분이 아니면, 구분 기호 없이 왼쪽부터 읽으며 바로 해독할 수 있어요. 이진 트리의 잎이 부호어예요.', '예: A=0, B=10, C=110, D=111 → 0101100111 = A B C A D. 크래프트 부등식 Σ2^(−ℓᵢ) ≤ 1을 만족하면 그런 부호가 존재해요. 허프만·DEFLATE 모두 접두 부호예요.', 'If no codeword is the start of another, a bit stream decodes left to right with no separators; codewords are leaves of a binary tree.', 'A=0, B=10, C=110, D=111: 0101100111 reads A B C A D. Kraft’s inequality Σ2^(−ℓᵢ) ≤ 1 says when such a code exists. Huffman and DEFLATE codes are prefix codes.', sPrefix()),
    item('it-huffman', '허프만 부호화', 'Huffman coding', '가장 확률이 작은 두 기호를 반복해서 묶어 트리를 만들면, 자주 나오는 기호에 짧은 부호를 주는 최적의 접두 부호가 돼요.', '예: A .4, B .3, C .2, D .1 → A 0, B 10, C 110, D 111, 평균 1.9비트(엔트로피 1.85, 고정 길이 2). 평균 길이는 H ≤ L < H + 1. 우선순위 큐로 O(n log n). JPEG, DEFLATE(zip, PNG), MP3에 들어가요.', 'Repeatedly merge the two least likely symbols; the resulting tree is the optimal prefix code, giving frequent symbols short codes.', 'A .4, B .3, C .2, D .1 give A 0, B 10, C 110, D 111: 1.9 bits on average versus entropy 1.85 and fixed-length 2. H ≤ L < H + 1. A priority queue builds it in O(n log n). Inside JPEG, DEFLATE (zip, PNG) and MP3.', sHuffman()),
    item('it-arith', '산술 부호화', 'Arithmetic coding', '메시지 전체를 [0, 1) 안의 구간 하나로 바꿔요. 기호마다 현재 구간을 확률 비율로 나눠 해당 부분을 골라요.', '예: A .6, B .3, C .1에서 "AB" → [0.36, 0.54), 폭 0.18 → 약 2.5비트. 기호당 정수 비트에 묶이지 않아 엔트로피에 거의 도달해요. 범위 부호화(range coding), ANS가 현대식 변형이에요(zstd, JPEG XL).', 'Turn the whole message into one sub-interval of [0, 1): each symbol narrows the current interval in proportion to its probability.', 'With A .6, B .3, C .1, “AB” becomes [0.36, 0.54), width 0.18, about 2.5 bits. Not tied to whole bits per symbol, it nearly reaches the entropy. Range coding and ANS are modern variants (zstd, JPEG XL).', sArith()),
    item('it-rle', '런 길이 부호화', 'Run-length encoding', '같은 값이 연속으로 나오는 구간을 "개수 + 값"으로 바꿔요. 가장 단순한 무손실 압축이에요.', '예: AAAABBBCCD → 4A3B2C1D. 반복이 없으면 오히려 커져요(ABCD → 1A1B1C1D). 팩스, 단색이 많은 이미지(BMP, TIFF), JPEG의 0 계수 압축, 다른 알고리즘의 전처리로 써요.', 'Replace runs of the same value with count + value: the simplest lossless scheme.', 'AAAABBBCCD becomes 4A3B2C1D, but ABCD grows to 1A1B1C1D. Used in fax, flat-color images (BMP, TIFF), JPEG’s zero runs and as a preprocessing step.', sRle()),
    item('it-lz77', 'LZ77 사전 압축', 'LZ77 dictionary compression', '이미 지나온 데이터(슬라이딩 윈도)에서 같은 문자열을 찾아 "거리, 길이" 참조로 바꿔요. 사전을 따로 보내지 않아요.', '예: abcabcabcx → a b c (3, 6) x. 복사 길이가 거리보다 길어도 돼요(자기 겹침). DEFLATE = LZ77 + 허프만(gzip, zip, PNG), LZW는 GIF, LZ4·zstd·brotli도 이 계열이에요.', 'Find repeats in the recently seen data (a sliding window) and replace them with (distance, length) references; no dictionary is sent.', 'abcabcabcx becomes a b c (3, 6) x; a copy may overlap itself. DEFLATE = LZ77 + Huffman (gzip, zip, PNG); LZW is in GIF; LZ4, zstd and brotli belong to this family.', sLz()),
    item('it-bwt', '버로우즈-휠러 변환', 'Burrows–Wheeler transform', '문자열의 모든 회전을 정렬해 마지막 열을 읽으면 같은 글자가 뭉쳐요. 정보는 그대로라 되돌릴 수 있고, 그 뒤의 압축이 훨씬 잘 돼요.', '예: banana$ → annb$aa. 뒤따르는 문맥이 같은 글자끼리 모이기 때문이에요. bzip2 = BWT + MTF(앞으로 옮기기) + 허프만. 접미사 배열로 O(n)에 계산하고, 유전체 정렬 도구의 FM 인덱스(BWA, Bowtie)도 이 변환을 써요.', 'Sort every rotation of a string and read the last column: equal letters cluster. Nothing is lost, so it reverses, and the result compresses much better.', 'banana$ becomes annb$aa, because characters followed by the same context end up adjacent. bzip2 = BWT + move-to-front + Huffman. Suffix arrays compute it in O(n), and the FM-index inside genome aligners (BWA, Bowtie) is built on it.', sBwt()),
    item('it-varint', '델타 부호화와 가변 길이 정수', 'Delta encoding and varints', '비슷한 값이 이어지면 차이만 저장하고, 작은 수는 적은 바이트로 담는 가변 길이 정수로 써요.', '예: 1000, 1003, 1004, 1010 → 1000, +3, +1, +6. varint는 바이트마다 7비트를 담고 최상위 비트로 "다음 바이트 있음"을 표시해요: 300 → AC 02. 고정 int32로 16바이트인 값이 5바이트로. Protocol Buffers, SQLite, Git 팩 파일, 검색 엔진 역색인, Parquet 같은 열 지향 포맷에 써요.', 'When values sit close together, store only the differences, and write small numbers in fewer bytes with variable-length integers.', '1000, 1003, 1004, 1010 become 1000, +3, +1, +6. A varint holds 7 bits per byte and uses the top bit for “more bytes follow”: 300 is AC 02. Sixteen bytes of fixed int32 shrink to five. Used by Protocol Buffers, SQLite, Git packfiles, search-engine posting lists and columnar formats like Parquet.', sVarint()),
    item('it-limit', '압축의 한계', 'Limits of compression', '모든 입력을 줄이는 무손실 압축은 없어요. n비트 문자열은 2ⁿ개인데 더 짧은 문자열은 2ⁿ − 1개뿐이라 반드시 두 입력이 겹쳐요.', '압축은 흔한 데이터를 짧게, 드문 데이터를 길게 만드는 맞바꿈이에요. 무작위·암호화 데이터나 이미 압축한 파일(zip, jpg, mp4)은 거의 줄지 않아요. 문자열을 출력하는 가장 짧은 프로그램의 길이를 콜모고로프 복잡도라 하는데, 일반적으로 계산할 수 없어요.', 'No lossless compressor shrinks every input: there are 2ⁿ strings of n bits but only 2ⁿ − 1 shorter ones, so two inputs must collide.', 'Compression trades short codes for likely data against longer codes for unlikely data. Random or encrypted data and already-compressed files (zip, jpg, mp4) barely shrink. The length of the shortest program that prints a string is its Kolmogorov complexity, which is uncomputable in general.', sLimit())
  ].concat(XT.add['it-comp'] || [])),
  sec('it-sig', '신호와 손실 압축', 'Signals & lossy coding', '신호와 손실 압축', 'Signals and lossy coding',
    '연속 신호를 디지털로 바꾸고, 사람이 못 느끼는 정보를 버려 크게 줄여요.', 'Digitizing signals, and shrinking them by dropping what people won’t notice.', [
    item('it-sampling', '표본화 정리', 'Sampling theorem', '연속 신호를 최고 주파수의 2배보다 빠르게 표본화하면 표본만으로 원래 신호를 정확히 복원할 수 있어요.', 'fs > 2·f_max(나이퀴스트 주파수 fs/2). 부족하면 높은 주파수가 낮은 주파수로 둔갑해요(에일리어싱: 영상 속 바퀴가 거꾸로 도는 현상). CD 44.1 kHz는 가청 한계 20 kHz를 위한 값. 표본화 전 저역통과 필터로 막아요.', 'Sample faster than twice the highest frequency and the samples determine the signal exactly.', 'fs > 2·f_max (Nyquist frequency fs/2). Too slow and high frequencies masquerade as low ones: aliasing, like wagon wheels spinning backwards on film. CD audio uses 44.1 kHz for the 20 kHz hearing limit. An anti-aliasing low-pass filter runs first.', sSampling()),
    item('it-quant', '양자화', 'Quantization', '연속적인 값을 정해진 단계 중 가장 가까운 것으로 반올림해요. 그 차이(양자화 오차)는 되돌릴 수 없어요.', 'N비트 = 2ᴺ단계, SQNR ≈ 6.02N + 1.76 dB(1비트마다 +6 dB). CD 16비트 ≈ 98 dB. 손실 압축은 중요한 성분은 촘촘히, 덜 중요한 성분은 거칠게 양자화해요. 신경망 양자화(FP32 → INT8)도 같은 원리.', 'Round a continuous value to the nearest of a fixed set of levels; the difference, quantization error, is lost for good.', 'N bits give 2ᴺ levels and SQNR ≈ 6.02N + 1.76 dB, +6 dB per bit; 16-bit CD audio reaches about 98 dB. Lossy codecs quantize important components finely and others coarsely. Neural-network quantization (FP32 → INT8) is the same idea.', sQuant()),
    item('it-fourier', '푸리에 급수와 스펙트럼', 'Fourier series and spectra', '주기 신호는 여러 주파수 사인파의 합으로 나타낼 수 있어요. 각 주파수 성분의 크기를 모은 것이 스펙트럼이에요.', '예: 사각파 = (4/π)(sin x + sin 3x/3 + sin 5x/5 + …). 불연속점 근처에는 항을 늘려도 약 9% 튀는 깁스 현상이 남아요. 고속 푸리에 변환(FFT)은 O(n log n). 이퀄라이저, 음성 인식, 이미지 필터, 무선 통신(OFDM)의 기본 도구예요.', 'A periodic signal is a sum of sine waves at different frequencies; the sizes of those components form its spectrum.', 'A square wave is (4/π)(sin x + sin 3x/3 + sin 5x/5 + …). Near the jumps a ~9% overshoot survives any number of terms (the Gibbs phenomenon). The fast Fourier transform runs in O(n log n) and underlies equalizers, speech recognition, image filters and OFDM radio.', sFourier()),
    item('it-dct', '변환 부호화 (DCT)', 'Transform coding (DCT)', '신호를 주파수 성분으로 바꾸면 에너지가 소수의 저주파 계수에 몰려요. 작은 고주파 계수를 버리고 나머지만 저장해요.', 'DCT-II: Xₖ = Σxₙcos(π/N(n + ½)k). JPEG: 8×8 블록 DCT → 양자화 표로 나눔 → 지그재그 순서 + 런 길이 + 허프만. MP3·AAC는 MDCT, 영상(H.264)은 정수 DCT. 압축률이 높으면 블록 경계가 보여요(블로킹).', 'Converting to frequency components packs the energy into a few low-frequency coefficients; drop the small high-frequency ones and keep the rest.', 'DCT-II: Xₖ = Σxₙcos(π/N(n + ½)k). JPEG: 8×8 block DCT, divide by a quantization table, zigzag, run-length and Huffman. MP3 and AAC use the MDCT, H.264 an integer DCT. Push compression too far and blocks become visible.', sDct()),
    item('it-perceptual', '지각 부호화', 'Perceptual coding', '사람이 잘 느끼지 못하는 정보부터 버려요. 눈은 색보다 밝기에 민감하고, 귀는 큰 소리 옆의 작은 소리를 잘 듣지 못해요.', '크로마 서브샘플링 4:2:0: 밝기(Y)는 픽셀마다, 색(Cb, Cr)은 2×2 블록마다 하나 → 데이터 절반. 오디오 코덱(MP3, AAC)은 심리음향 모델로 가려지는 주파수를 버려요. 같은 체감 품질에서 파일이 훨씬 작아져요.', 'Throw away what people barely perceive first: eyes care more about brightness than color, and ears miss quiet sounds next to loud ones.', 'Chroma subsampling 4:2:0 keeps brightness (Y) for every pixel but one color sample (Cb, Cr) per 2×2 block, halving the data. Audio codecs (MP3, AAC) use a psychoacoustic model to drop masked frequencies. Files get far smaller at the same perceived quality.', sPerceptual())
  ].concat(XT.add['it-sig'] || [])),
  sec('it-ch', '채널과 오류 정정', 'Channels & error correction', '채널과 오류 정정', 'Channels and error correction',
    '잡음 속에서도 정확히 전달하기 위해 일부러 덧붙이는 정보예요.', 'Deliberate redundancy that lets data survive noise.', [
    item('it-channel', '채널 용량과 섀넌 정리', 'Channel capacity and Shannon’s theorem', '잡음 있는 채널에도 넘을 수 없는 최대 전송률(용량)이 있고, 그보다 낮은 속도라면 오류를 원하는 만큼 줄일 수 있는 부호가 존재해요.', '이진 대칭 채널 C = 1 − H(p)(p = 0.11이면 약 0.5). 섀넌-하틀리 C = B log₂(1 + S/N): 3 kHz, 30 dB → 약 30 kbit/s. 5G·Wi-Fi의 LDPC, 터보 부호가 이 한계에 근접해요.', 'Every noisy channel has a maximum rate, its capacity; below it, codes exist that make errors as rare as you like.', 'Binary symmetric channel C = 1 − H(p), about 0.5 at p = 0.11. Shannon–Hartley C = B log₂(1 + S/N): 3 kHz at 30 dB gives about 30 kbit/s. LDPC and turbo codes in 5G and Wi-Fi come close to the limit.', sChannel()),
    item('it-parity', '패리티 비트', 'Parity bits', '1의 개수를 짝수(또는 홀수)로 맞추는 비트 하나를 붙여요. 비트 하나가 뒤집히면 검출해요.', '짝수 개의 오류는 못 잡고, 위치를 모르니 고치지 못해요(재전송 필요). 2차원 패리티(행·열)는 1비트 정정 가능. RAID 5는 디스크들의 XOR 패리티로 한 디스크를 복구해요.', 'One extra bit makes the count of 1s even (or odd), so any single flipped bit is detected.', 'It misses an even number of errors and can’t locate the flip, so data must be resent. Two-dimensional (row and column) parity corrects one bit. RAID 5 rebuilds a lost disk from XOR parity.', sParity()),
    item('it-luhn', '검사 숫자', 'Check digits', '번호 끝에 숫자 하나를 덧붙여 손으로 옮겨 적을 때의 실수를 잡아요. 대표적인 방법이 룬(Luhn) 알고리즘이에요.', '룬: 오른쪽부터 한 칸 걸러 2배(10 이상이면 두 자리 합), 모두 더해 10의 배수가 되도록 검사 숫자를 정해요. 예: 7992739871 → 합 67 → 검사 숫자 3. 한 자리 오류는 모두, 이웃 자리 바꿈은 09 ↔ 90만 빼고 잡아요. 카드 번호, IMEI. ISBN-13은 가중치 1·3, ISBN-10은 mod 11을 써요.', 'One extra digit at the end of a number catches mistakes made when copying it by hand; the Luhn algorithm is the best known.', 'Luhn: from the right, double every second digit (taking the digit sum if it reaches 10), add everything, and pick the check digit that makes the total a multiple of 10. 7992739871 sums to 67, so its check digit is 3. It catches every single-digit error and every adjacent swap except 09 ↔ 90. Card numbers and IMEI use it; ISBN-13 uses weights 1 and 3, ISBN-10 mod 11.', sLuhn()),
    item('it-hamming', '해밍 부호', 'Hamming codes', '패리티 비트 여러 개가 서로 다른 비트 묶음을 검사하게 하면, 어느 검사가 실패했는지로 오류 위치를 알아내 고칠 수 있어요.', '해밍(7,4): 데이터 4비트 + 패리티 3비트. 신드롬(실패한 검사들)이 오류 위치를 가리켜요. 해밍 거리 d면 ⌊(d − 1)/2⌋개 정정, d − 1개 검출(7,4는 d = 3). SECDED ECC 메모리, 더 강한 리드-솔로몬은 QR 코드·CD·SSD에.', 'Let several parity bits check overlapping groups; which checks fail pinpoints the error so it can be fixed.', 'Hamming(7,4) adds 3 parity bits to 4 data bits; the syndrome of failed checks names the bad position. With distance d a code corrects ⌊(d − 1)/2⌋ errors and detects d − 1 (here d = 3). SECDED ECC memory; stronger Reed–Solomon codes protect QR codes, CDs and SSDs.', sHamming()),
    item('it-crc', '순환 중복 검사 (CRC)', 'Cyclic redundancy check', '데이터를 다항식으로 보고 생성 다항식으로 나눈 나머지를 붙여 보내요. 받는 쪽에서 나눠 0이 아니면 오류예요.', '덧셈 = XOR(자리올림 없음). 예: 11010011101100을 1011로 → 나머지 100. 차수 r이면 r비트 이하 버스트 오류를 모두 검출. 시프트 레지스터로 하드웨어 구현이 쉬워요. 이더넷·Wi-Fi CRC-32, ZIP·PNG. 의도적 변조는 못 막아요(해시·MAC 필요).', 'Treat data as a polynomial, divide by a generator and append the remainder; a nonzero remainder at the receiver means an error.', 'Arithmetic is XOR with no carries: 11010011101100 divided by 1011 leaves 100. A degree-r generator catches every burst of r bits or fewer, and shift registers make it cheap in hardware. CRC-32 guards Ethernet, Wi-Fi, ZIP and PNG. It offers no protection against deliberate tampering; use a hash or MAC.', sCrc()),
    item('it-rs', '리드-솔로몬 부호', 'Reed–Solomon codes', '데이터를 다항식의 값으로 보고 같은 다항식의 값을 여분으로 더 보내요. 도착한 값만으로 다항식을 되살려 잃어버린 값을 복구해요.', 'k개 데이터 + 2t개 여분이면 오류 t개 또는 위치를 아는 소실 2t개를 복구해요. 실제로는 유한체 GF(2⁸)에서 바이트 단위로 계산해요. QR 코드(최대 30% 손상 복구), CD·DVD, RAID 6, 보이저 탐사선, 클라우드 저장소의 이레이저 코딩에 써요.', 'Treat the data as values of a polynomial and send extra values of the same polynomial; whatever arrives is enough to rebuild it and restore what was lost.', 'k data symbols plus 2t extra ones correct t errors, or 2t erasures at known positions. Real codes work byte-wise over the finite field GF(2⁸). Used in QR codes (up to 30% damage), CDs and DVDs, RAID 6, the Voyager probes and erasure-coded cloud storage.', sRs()),
    item('it-interleave', '인터리빙', 'Interleaving', '여러 부호어의 기호를 번갈아 섞어 보내요. 한꺼번에 터지는 연속 오류가 여러 부호어에 조금씩 흩어져 각각 고칠 수 있게 돼요.', '예: A, B, C가 각각 오류 1개를 고칠 수 있을 때, 순서대로 보내면 길이 3의 버스트가 한 부호어를 망가뜨리지만 섞어 보내면 하나씩만 맞아요. CD의 CIRC(리드-솔로몬 두 겹 + 인터리빙)는 약 3,500비트 연속 오류를 복구해요. 무선 페이딩, 디스크 긁힘에 대비하는 방법이에요.', 'Send the symbols of several codewords in alternation, so a burst of errors spreads thinly across them and each stays correctable.', 'If codewords A, B and C can each fix one error, a burst of three ruins one codeword when sent in order but hits each once when interleaved. The CD’s CIRC (two Reed–Solomon layers plus interleaving) repairs bursts of about 3,500 bits. It guards against radio fading and disc scratches.', sInter())
  ].concat(XT.add['it-ch'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.it-b .in{font-weight:800;color:var(--ink)}
.it-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.it-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.it-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.it-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.it-r .in{color:var(--danger);font-weight:800}
.it-g .in{color:var(--ok);font-weight:800}
.it-a .in{color:var(--accent);font-weight:800}
.it-w .in{color:var(--warn);font-weight:800}
.it-c .in{font-size:.62em;font-weight:700}`;
})();
