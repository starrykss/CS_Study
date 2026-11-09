(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const off = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
const ink = { background: 'var(--ink-3)' };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
function axes(S, k, F, o = {}) {
  const yA = F.y0 <= 0 && F.y1 >= 0 ? F.Y(0) : F.B, xA = F.x0 <= 0 && F.x1 >= 0 ? F.X(0) : F.L;
  edge(S, k + 'x', F.L, yA, F.R, yA, { s: ink }); edge(S, k + 'y', xA, F.B, xA, F.T, { s: ink });
  if (o.xl) text(S, k + 'xl', F.R - 1, yA + .2, o.xl, { cls: 'cz-t cz-mono' });
  if (o.yl) text(S, k + 'yl', xA + .35, F.T - .2, o.yl, { cls: 'cz-t cz-mono' });
}
function seg(S, k, a, b, st, color, h) { h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L * h * .45, uy = dy / L * h * .45; edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: `var(--${color})` }) : { background: `var(--${color})` } }); if (st) S.set(k, st, { opacity: '1' }); }
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; const k = pfx + (n++); seg(S, k, a, b, st, o.color || 'accent', o.h); if (o.off) S.set(k, o.off, { opacity: '0' }); } return n; }
function plot(S, pfx, F, f, o = {}) { const n = o.n || 40, a = o.a ?? F.x0, b = o.b ?? F.x1, pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); pts.push(isFinite(y) && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null); } return poly(S, pfx, pts, o); }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* line through (px,py) with slope m, clipped to the frame */
function line(S, k, F, px, py, m, o = {}) {
  let a = F.x0, b = F.x1; if (m !== 0) { const xa = px + (F.y0 - py) / m, xb = px + (F.y1 - py) / m; a = Math.max(a, Math.min(xa, xb)); b = Math.min(b, Math.max(xa, xb)); }
  seg(S, k, [F.X(a), F.Y(py + m * (a - px))], [F.X(b), F.Y(py + m * (b - px))], o.st, o.color || 'warn', o.h || .16); if (o.off) S.set(k, o.off, { opacity: '0' });
}
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - .07, y: Math.min(y1, y2), w: .14, h: Math.abs(y2 - y1), css: o.dash ? `background:repeating-linear-gradient(180deg,var(--${color}) 0 .4em,transparent .4em .75em)` : `background:var(--${color})`, s: st ? hid() : {} }); if (st) S.set(k, st, { opacity: '1' }); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - .07, w: Math.abs(x2 - x1), h: .14, css: o.dash ? `background:repeating-linear-gradient(90deg,var(--${color}) 0 .4em,transparent .4em .75em)` : `background:var(--${color})`, s: st ? hid() : {} }); if (st) S.set(k, st, { opacity: '1' }); };
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: o.html || '', cls: o.cls || '', css: `border-radius:${o.r ?? .12}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); if (st) S.set(k, st, { opacity: '1' }); if (o.off) S.set(k, o.off, { opacity: '0' }); };
const pt = (S, k, x, y, st, sty, r) => { dot(S, k, x, y, '', { r: r || .42, s: st ? hid(sty || C.cur) : (sty || C.cur) }); if (st) S.set(k, st, { opacity: '1' }); };
const hole = (S, k, x, y, st) => { dot(S, k, x, y, '', { r: .42, s: Object.assign(st ? hid() : {}, { background: 'var(--ui)', 'border-color': 'var(--accent)' }) }); if (st) S.set(k, st, { opacity: '1' }); };
const T = (S, k, x, y, t, cls, st, o = {}) => { text(S, k, x, y, t, Object.assign({ cls: 'cz-t ' + (cls || ''), s: st ? hid() : {} }, o)); if (st) S.set(k, st, { opacity: '1' }); if (o.off) S.set(k, o.off, { opacity: '0' }); };
const ar = (S, k, a, b, color, st, o = {}) => { arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .14, s: Object.assign(st ? hid() : {}, color ? { background: `var(--${color})`, 'border-color': `var(--${color})` } : {}) }); if (st) S.set(k, st, { opacity: '1' }); if (o.off) S.set(k, o.off, { opacity: '0' }); };
const f2 = n => n.toFixed(2);

/* ---------- limits ---------- */
function sLimit() {
  const S = scene({ id: 'ca-limit', steps: 5, per: 1.3 });
  const F = fr(-1, 3, -.5, 4.5, 2, 19, 1.6, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, x => x + 1, { a: -1, b: .95, n: 12 }); plot(S, 'q', F, x => x + 1, { a: 1.05, b: 3, n: 12 });
  hole(S, 'h', F.X(1), F.Y(2));
  pt(S, 'dl', F.X(0), F.Y(1), 1, C.cur); [[2, .5], [3, .9], [4, .99]].forEach(([st, x]) => S.move('dl', st, F.X(x) - .42, F.Y(x + 1) - .42));
  pt(S, 'dr', F.X(2), F.Y(3), 1, C.warn); [[2, 1.5], [3, 1.1], [4, 1.01]].forEach(([st, x]) => S.move('dr', st, F.X(x) - .42, F.Y(x + 1) - .42));
  vl(S, 'g1', F.X(1), F.Y(0), F.Y(2), 'ink-3', 5, { dash: 1 }); hl(S, 'g2', F.X(0), F.X(1), F.Y(2), 'ink-3', 5, { dash: 1 });
  T(S, 'fx', 20.4, 1.6, 'f(x) = (x² − 1) / (x − 1)', 'cz-mono ca-b');
  T(S, 'l1', 20.4, 4.4, ['왼쪽에서 다가가면', 'from the left'], 'ca-a', 1);
  S.label('tl', { cls: 'cz-t cz-mono ca-l', x: 20.4, y: 5.8, w: 11 }, [[0, ''], [1, 'x = 0 → 1'], [2, 'x = 0.5 → 1.5'], [3, 'x = 0.9 → 1.9'], [4, 'x = 0.99 → 1.99']]);
  T(S, 'l2', 20.4, 8.4, ['오른쪽에서 다가가면', 'from the right'], 'ca-w', 1);
  S.label('tr', { cls: 'cz-t cz-mono ca-l', x: 20.4, y: 9.8, w: 11 }, [[0, ''], [1, 'x = 2 → 3'], [2, 'x = 1.5 → 2.5'], [3, 'x = 1.1 → 2.1'], [4, 'x = 1.01 → 2.01']]);
  T(S, 're', 20.4, 13, 'lim f(x) = 2', 'cz-mono ca-big ca-g', 5);
  T(S, 're2', 20.4, 15.4, ['x→1', 'x→1'], 'cz-mono', 5);
  S.cap(1, 'x = 1에서는 0/0이라 값이 없지만', 'At x = 1 the formula is 0/0: undefined')
    .cap(2, '양쪽에서 1에 가까워지면', 'but approach 1 from both sides')
    .cap(4, 'f(x)는 2에 한없이 가까워져요', 'and f(x) gets arbitrarily close to 2')
    .cap(5, '극한은 그 점의 값이 아니라 다가가는 값이에요', 'A limit is the value approached, not the value at the point');
  return S;
}
function sOneSided() {
  const S = scene({ id: 'ca-onesided', steps: 5, per: 1.3 });
  const F = fr(-1, 3, 0, 6, 2, 19, 1.6, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, x => x + 1, { a: -1, b: .95, n: 10 }); plot(S, 'q', F, x => x + 3, { a: 1, b: 3, n: 10 });
  hole(S, 'h', F.X(1), F.Y(2)); pt(S, 'c', F.X(1), F.Y(4), 0, C.cur);
  pt(S, 'dl', F.X(0), F.Y(1), 1, C.cur); S.move('dl', 2, F.X(.96) - .42, F.Y(1.96) - .42);
  pt(S, 'dr', F.X(2.4), F.Y(5.4), 3, C.warn); S.move('dr', 4, F.X(1.04) - .42, F.Y(4.04) - .42);
  T(S, 'fx', 20.4, 1.6, ['f(x) = x + 1 (x < 1)', 'f(x) = x + 1 (x < 1)'], 'cz-mono ca-b');
  T(S, 'fx2', 20.4, 3, ['f(x) = x + 3 (x ≥ 1)', 'f(x) = x + 3 (x ≥ 1)'], 'cz-mono ca-b');
  T(S, 'r1', 20.4, 6, ['왼쪽 극한 = 2', 'left limit = 2'], 'ca-l ca-a', 2);
  T(S, 'r2', 20.4, 8, ['오른쪽 극한 = 4', 'right limit = 4'], 'ca-l ca-w', 4);
  T(S, 'r3', 20.4, 10.6, ['2 ≠ 4 → 극한 없음', '2 ≠ 4 → no limit'], 'ca-l ca-r', 5);
  T(S, 'r4', 20.4, 12.4, ['x = 1에서 불연속 (점프)', 'jump discontinuity at x = 1'], '', 5);
  S.cap(1, '왼쪽에서 1로 다가가면', 'Approach 1 from the left')
    .cap(2, '2에 가까워져요 (왼쪽 극한)', 'and f heads to 2 (left-hand limit)')
    .cap(3, '오른쪽에서 다가가면', 'Approach from the right')
    .cap(4, '4에 가까워져요 (오른쪽 극한)', 'and f heads to 4 (right-hand limit)')
    .cap(5, '양쪽 극한이 같고 그 값이 f(a)와 같아야 연속이에요', 'Continuity needs both one-sided limits to equal f(a)');
  return S;
}
function sEpsDelta() {
  const S = scene({ id: 'ca-epsdelta', steps: 5, per: 1.35 });
  const F = fr(0, 4, 0, 4, 3, 19, 2, 18);
  S.el('eb', { x: 3, y: F.Y(3), w: 16, h: 8, css: 'transform-origin:50% 50%;background:color-mix(in srgb,var(--warn) 18%,transparent)', s: hid({ transform: 'none' }) });
  S.set('eb', 1, { opacity: '1' }).set('eb', 3, { transform: 'scaleY(.5)' }).set('eb', 4, { transform: 'scaleY(.25)' });
  S.el('db', { x: 3, y: 2, w: 16, h: 16, css: 'transform-origin:50% 50%;background:color-mix(in srgb,var(--accent) 14%,transparent)', s: hid({ transform: 'none' }) });
  S.set('db', 2, { opacity: '1' }).set('db', 3, { transform: 'scaleX(.5)' }).set('db', 4, { transform: 'scaleX(.25)' });
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, x => .5 * x + 1, { n: 4 });
  pt(S, 'c', F.X(2), F.Y(2));
  T(S, 'lL', .6, F.Y(2) - .5, 'L', 'cz-mono ca-b'); T(S, 'la', F.X(2) - .3, 18.3, 'a', 'cz-mono ca-b');
  T(S, 'fx', 20.4, 1.6, 'f(x) = x/2 + 1', 'cz-mono ca-b'); T(S, 'fx2', 20.4, 3, 'a = 2, L = 2', 'cz-mono');
  S.label('ev', { cls: 'cz-t cz-mono ca-l', x: 20.4, y: 6, w: 11 }, [[0, ''], [1, 'ε = 1'], [3, 'ε = 0.5'], [4, 'ε = 0.25']]);
  S.label('dv', { cls: 'cz-t cz-mono ca-l', x: 20.4, y: 8, w: 11 }, [[0, ''], [2, 'δ = 2'], [3, 'δ = 1'], [4, 'δ = 0.5']]);
  T(S, 'rule', 20.4, 11, ['δ = 2ε로 잡으면 항상 성립', 'δ = 2ε always works'], 'ca-g ca-b', 5);
  T(S, 'def', 20.4, 13.4, '0 < |x − a| < δ', 'cz-mono', 5); T(S, 'def2', 20.4, 14.8, '⇒ |f(x) − L| < ε', 'cz-mono', 5);
  S.cap(1, '먼저 L 주변의 허용 오차 ε를 정하면', 'Pick any tolerance ε around L')
    .cap(2, 'x가 a의 δ 안이면 f(x)가 그 띠 안에 들어와요', 'then a δ keeps f(x) inside that band')
    .cap(3, 'ε를 아무리 줄여도', 'However small ε gets')
    .cap(4, '맞는 δ를 늘 찾을 수 있으면 극한은 L', 'if a matching δ always exists, the limit is L')
    .cap(5, '"한없이 가까워진다"를 엄밀하게 쓴 정의예요', 'The rigorous meaning of “arbitrarily close”');
  return S;
}
function sSqueeze() {
  const S = scene({ id: 'ca-squeeze', steps: 4, per: 1.5 });
  const F = fr(-1, 1, -1, 1, 2, 19, 2, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  poly(S, 'u', [[F.X(-1), F.Y(1)], [F.X(0), F.Y(0)], [F.X(1), F.Y(1)]], { st: 1, color: 'warn', h: .2 });
  poly(S, 'd', [[F.X(-1), F.Y(-1)], [F.X(0), F.Y(0)], [F.X(1), F.Y(-1)]], { st: 1, color: 'warn', h: .2 });
  const pts = []; for (let i = 0; i <= 120; i++) { const x = -1 + 2 * i / 120; pts.push(Math.abs(x) < .012 ? null : [F.X(x), F.Y(x * Math.sin(1 / x))]); }
  poly(S, 'w', pts, { st: 2, color: 'accent', h: .12 });
  pt(S, 'o', F.X(0), F.Y(0), 3, C.okf, .5);
  T(S, 'i1', 20, 3, '−|x| ≤ x·sin(1/x) ≤ |x|', 'cz-mono ca-b', 1);
  T(S, 'i2', 20, 6, ['양쪽 끝이 0으로 가면', 'both bounds → 0'], 'ca-l', 3);
  T(S, 'i3', 20, 7.6, ['가운데도 0으로', 'so the middle → 0'], 'ca-l ca-g', 3);
  T(S, 'i4', 20, 11, 'lim x·sin(1/x) = 0', 'cz-mono ca-b', 3);
  T(S, 'i5', 20, 13.6, ['같은 방법:', 'Same idea:'], '', 4);
  T(S, 'i6', 20, 15, 'lim sin x / x = 1', 'cz-mono ca-b', 4);
  S.cap(1, '0으로 가는 두 함수 −|x|, |x| 사이에', 'Between −|x| and |x|, both heading to 0')
    .cap(2, 'x·sin(1/x)는 끝없이 진동하지만', 'x·sin(1/x) oscillates forever')
    .cap(3, '두 함수 사이에 갇혀 있어서 극한은 0이에요', 'but it is trapped between them, so the limit is 0')
    .cap(4, '직접 계산하기 어려운 극한을 위아래로 눌러서 구해요', 'Squeeze limits you can’t compute directly');
  return S;
}
function sIVT() {
  const S = scene({ id: 'ca-ivt', steps: 4, per: 1.5 });
  const F = fr(.9, 2.1, -1.5, 5.5, 2, 21, 1.6, 18); const f = x => x ** 3 - x - 1;
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { a: .92, b: 2.05, n: 30 });
  pt(S, 'A', F.X(1), F.Y(-1), 1, C.badf); pt(S, 'B', F.X(2), F.Y(5), 1, C.okf);
  T(S, 'tA', F.X(1) + .6, F.Y(-1) - .2, 'f(1) = −1', 'cz-mono', 1); T(S, 'tB', F.X(2) - 6.6, F.Y(5) - .4, 'f(2) = 5', 'cz-mono', 1);
  hl(S, 'k', F.L, F.R, F.Y(2), 'warn', 2, { dash: 1 }); T(S, 'tk', F.R - 2.6, F.Y(2) - 1.3, 'y = 2', 'cz-mono ca-w', 2);
  let c = 1.5; for (let i = 0; i < 40; i++) c = c - (c ** 3 - c - 3) / (3 * c * c - 1);
  pt(S, 'c', F.X(c), F.Y(2), 3, C.cur, .5); vl(S, 'cv', F.X(c), F.Y(2), F.Y(0), 'accent', 3, { dash: 1 });
  T(S, 'tc', F.X(c) + .5, F.Y(0) + .3, `c ≈ ${c.toFixed(3)}`, 'cz-mono ca-a', 3);
  T(S, 'n1', 22, 3, ['[1, 2]에서 연속', 'continuous on [1, 2]'], 'ca-l');
  T(S, 'n2', 22, 5, 'f(1) < 2 < f(2)', 'cz-mono', 1);
  T(S, 'n3', 22, 7, ['→ f(c) = 2인', '→ some c has'], 'ca-l', 3); T(S, 'n4', 22, 8.6, ['c가 반드시 있어요', 'f(c) = 2'], 'ca-l ca-g', 3);
  S.cap(1, '연속함수의 양 끝값이 -1과 5라면', 'A continuous function goes from −1 to 5')
    .cap(2, '그 사이의 어떤 값 k(=2)도', 'so any value k in between')
    .cap(3, '구간 안 어딘가에서 반드시 지나가요', 'is hit somewhere inside the interval')
    .cap(4, '방정식의 근이 있다는 증명과 이분법의 바탕이에요', 'It proves roots exist and powers the bisection method');
  return S;
}

/* ---------- derivatives ---------- */
function sDeriv() {
  const S = scene({ id: 'ca-derivative', steps: 5, per: 1.3 });
  const F = fr(0, 6, -1, 9, 2, 21, 1.6, 18); const f = x => x * x / 4, a = 2;
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { n: 30 });
  pt(S, 'A', F.X(a), F.Y(f(a)), 0, C.cur);
  [[1, 3], [2, 1.5], [3, .5]].forEach(([st, h]) => line(S, 's' + st, F, a, f(a), (f(a + h) - f(a)) / h, { st, off: st + 1, color: 'warn' }));
  line(S, 't', F, a, f(a), 1, { st: 4, color: 'ok', h: .2 });
  pt(S, 'B', F.X(5), F.Y(f(5)), 1, C.warn); S.move('B', 2, F.X(3.5) - .42, F.Y(f(3.5)) - .42).move('B', 3, F.X(2.5) - .42, F.Y(f(2.5)) - .42); S.set('B', 4, { opacity: '0' });
  T(S, 'f0', 22, 1.6, 'f(x) = x²/4, a = 2', 'cz-mono ca-b');
  S.label('hv', { cls: 'cz-t cz-mono ca-l', x: 22, y: 4.4, w: 9.6 }, [[0, ''], [1, 'h = 3'], [2, 'h = 1.5'], [3, 'h = 0.5'], [4, 'h → 0']]);
  S.label('mv', { cls: 'cz-t cz-mono ca-l', x: 22, y: 6.2, w: 9.6 }, [[0, ''], [1, ['기울기 1.75', 'slope 1.75']], [2, ['기울기 1.375', 'slope 1.375']], [3, ['기울기 1.125', 'slope 1.125']], [4, ["f′(2) = 1", "f′(2) = 1"]]]);
  T(S, 'df', 22, 10, "f′(a) = lim", 'cz-mono', 5); T(S, 'df2', 22, 11.4, '(f(a+h) − f(a)) / h', 'cz-mono', 5);
  S.cap(1, '두 점을 잇는 할선의 기울기 = 평균 변화율', 'A secant’s slope is the average rate of change')
    .cap(2, 'h를 줄이면', 'Shrink h')
    .cap(3, '할선이 한 점에 붙어 가요', 'and the secant hugs the point')
    .cap(4, '극한에서 접선이 되고, 그 기울기가 미분계수', 'In the limit it becomes the tangent: the derivative')
    .cap(5, '순간 변화율 = 속도, 한계비용, 그래디언트의 기본', 'Instantaneous rate: velocity, marginal cost, gradients');
  return S;
}
function sProduct() {
  const S = scene({ id: 'ca-product', steps: 5, per: 1.35 });
  rect(S, 'fg', 3, 8, 12, 9, 'accent', 22, 0, { html: 'f · g', cls: 'cz-c ca-xl', css: 'border:.14em solid var(--accent)' });
  rect(S, 'df', 15.1, 8, 3, 9, 'warn', 30, 2, { html: 'g·Δf', cls: 'cz-c ca-sm', css: 'border:.14em solid var(--warn)' });
  rect(S, 'dg', 3, 4.9, 12, 3, 'ok', 30, 3, { html: 'f·Δg', cls: 'cz-c ca-sm', css: 'border:.14em solid var(--ok)' });
  rect(S, 'dd', 15.1, 4.9, 3, 3, 'danger', 22, 3, { html: 'ΔfΔg', cls: 'cz-c ca-xs', css: 'border:.14em solid var(--danger)' });
  T(S, 'lf', 8.6, 17.4, 'f', 'cz-mono ca-b'); T(S, 'lg', 1.8, 12, 'g', 'cz-mono ca-b');
  T(S, 'ldf', 16.2, 17.4, 'Δf', 'cz-mono ca-w', 2); T(S, 'ldg', 1.2, 5.8, 'Δg', 'cz-mono ca-g', 3);
  T(S, 'e1', 19.2, 3, 'Δ(fg) = g·Δf + f·Δg + Δf·Δg', 'cz-mono ca-s', 3);
  T(S, 'e2', 19.2, 5.4, ['ΔfΔg는 아주 작아서 → 0', 'ΔfΔg vanishes → 0'], 'ca-r', 4);
  T(S, 'e3', 19.2, 8.4, "(fg)′ = f′g + fg′", 'cz-mono ca-big', 4);
  T(S, 'e4', 19.2, 11.4, ['몫의 미분', 'quotient rule'], 'ca-b', 5); T(S, 'e5', 19.2, 12.8, "(f/g)′ = (f′g − fg′) / g²", 'cz-mono', 5);
  T(S, 'e6', 19.2, 15, ['예', 'e.g.'], 'ca-b', 5); T(S, 'e7', 19.2, 16.4, "(x²·sin x)′", 'cz-mono', 5); T(S, 'e8', 19.2, 17.8, "= 2x·sin x + x²·cos x", 'cz-mono', 5);
  S.cap(1, '곱 f·g를 직사각형 넓이로 보면', 'Picture f·g as a rectangle’s area')
    .cap(2, 'f가 조금 늘면 g·Δf만큼', 'Grow f a little: you gain g·Δf')
    .cap(3, 'g가 늘면 f·Δg만큼 넓어져요', 'Grow g: you gain f·Δg')
    .cap(4, '모서리 ΔfΔg는 무시할 만큼 작아서 곱의 미분 공식이 나와요', 'The corner ΔfΔg is negligible, giving the product rule')
    .cap(5, '몫의 미분은 분자 순서와 부호를 조심', 'For quotients, mind the order and the minus sign');
  return S;
}
function sChain() {
  const S = scene({ id: 'ca-chain', steps: 4, per: 1.5 });
  const G = [[5.5, 9, 3.2, 'x', 90], [16, 9, 2.6, 'u = g(x)', 270], [26.2, 9, 2.2, 'y = f(u)', 540]];
  G.forEach(([x, y, r, l, d], i) => {
    node(S, 'g' + i, x, y, '', { r, s: i ? (i === 1 ? C.soft : C.cmp) : C.idle });
    S.el('h' + i, { x, y: y - .11, w: r - .5, h: .22, css: 'transform-origin:0 50%;border-radius:.11em;z-index:3', s: { transform: 'rotate(0deg)', background: 'var(--ink)' } });
    for (let st = 1; st <= 3; st++) S.set('h' + i, st, { transform: `rotate(${d * st}deg)` });
    T(S, 'n' + i, x - 4, y + r + .5, l, 'cz-tc cz-mono ca-b', 0, { w: 8 });
  });
  ar(S, 'a1', [9, 9], [13.2, 9], 'ink-2', 0); ar(S, 'a2', [18.8, 9], [23.8, 9], 'ink-2', 0);
  T(S, 'r1', 9.2, 7.2, 'du/dx = 3', 'cz-mono ca-s', 1); T(S, 'r2', 19.2, 7.2, 'dy/du = 2', 'cz-mono ca-s', 1);
  S.label('cnt', { cls: 'cz-t cz-tc ca-l', x: 1, y: 15.2, w: 30 }, [[0, ''], [1, ['x가 ¼바퀴 → u는 ¾바퀴 → y는 1½바퀴', 'x turns ¼ → u turns ¾ → y turns 1½']], [3, ['x가 1바퀴 도는 동안 y는 6배 빨리', 'y turns 6× as fast as x']]]);
  T(S, 'f1', 1, 17.4, "dy/dx = dy/du · du/dx = 2 · 3 = 6", 'cz-mono ca-b cz-tc', 3, { w: 30 });
  T(S, 'f2', 1, 19, "((3x + 1)²)′ = 2(3x + 1) · 3", 'cz-mono cz-tc', 4, { w: 30 });
  S.cap(1, '합성함수는 맞물린 톱니바퀴처럼 돌아요', 'A composite turns like meshed gears')
    .cap(2, '각 단계의 변화율이', 'Each stage’s rate')
    .cap(3, '곱해져서 전체 변화율이 돼요', 'multiplies into the overall rate')
    .cap(4, '겉미분 × 속미분 · 역전파도 이 규칙이에요', 'Outer × inner derivative; backprop is this rule');
  return S;
}
function sImplicit() {
  const S = scene({ id: 'ca-implicit', steps: 4, per: 1.5 });
  const F = fr(-6, 6, -6, 6, 3, 19, 2, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  pplot(S, 'c', t => [F.X(5 * Math.cos(t)), F.Y(5 * Math.sin(t))], 0, 2 * Math.PI, { n: 56 });
  const P = [[3, 4, 2], [-4, 3, 3]];
  P.forEach(([x, y, st], i) => { pt(S, 'p' + i, F.X(x), F.Y(y), st, C.warn, .48); line(S, 't' + i, F, x, y, -x / y, { st, off: st + 1, color: 'warn' }); if (st === 3) { } });
  S.set('p0', 3, { opacity: '.35' });
  pt(S, 'p2', F.X(5), F.Y(0), 4, C.warn, .48); vl(S, 't2', F.X(5), F.Y(-5), F.Y(5), 'warn', 4);
  T(S, 'e0', 20.4, 1.8, 'x² + y² = 25', 'cz-mono ca-b');
  T(S, 'e1', 20.4, 4, ['양변을 x로 미분', 'differentiate in x'], '', 1);
  T(S, 'e2', 20.4, 5.4, "2x + 2y·y′ = 0", 'cz-mono', 1); T(S, 'e3', 20.4, 7, "y′ = −x / y", 'cz-mono ca-big', 1);
  S.label('ev', { cls: 'cz-t cz-mono ca-l', x: 20.4, y: 10.4, w: 11 }, [[0, ''], [2, "(3, 4): y′ = −3/4"], [3, "(−4, 3): y′ = 4/3"], [4, ['(5, 0): 수직 접선', '(5, 0): vertical']]]);
  S.cap(1, 'y를 x의 함수로 풀지 않고 식째로 미분해요 (y는 연쇄 법칙)', 'Differentiate the whole equation, treating y via the chain rule')
    .cap(2, '(3, 4)에서 접선 기울기 −3/4', 'At (3, 4) the slope is −3/4')
    .cap(3, '(−4, 3)에서는 4/3', 'At (−4, 3) it is 4/3')
    .cap(4, 'y = 0이면 분모가 0 → 수직 접선', 'Where y = 0 the slope is undefined: a vertical tangent');
  return S;
}
function sRelated() {
  const S = scene({ id: 'ca-related', steps: 4, per: 1.5 });
  vl(S, 'w', 2, 2, 17, 'ink-2'); hl(S, 'gr', 2, 19, 17, 'ink-2');
  const L = [[3, 4, 0, 3], [4, 3, 3, 0]];
  L.forEach(([x, y, st, offAt], i) => { const b = [2 + 3 * x, 17], t = [2, 17 - 3 * y]; seg(S, 'l' + i, t, b, st, i ? 'warn' : 'accent', .32); if (offAt) S.set('l' + i, offAt, { opacity: '.25' }); pt(S, 'b' + i, ...b, st, i ? C.warn : C.cur, .45); pt(S, 't' + i, ...t, st, i ? C.warn : C.cur, .45); if (offAt) S.set('b' + i, offAt, { opacity: '.25' }).set('t' + i, offAt, { opacity: '.25' }); });
  T(S, 'x0', 6.4, 17.4, 'x = 3', 'cz-mono', 0, { off: 3 }); T(S, 'y0', 2.4, 10, 'y = 4', 'cz-mono', 0, { off: 3 });
  T(S, 'x1', 9.2, 17.4, 'x = 4', 'cz-mono ca-w', 3); T(S, 'y1', 2.4, 12, 'y = 3', 'cz-mono ca-w', 3);
  T(S, 'e0', 20, 1.8, ['사다리 5 m, 아래가 1 m/s로 미끄러짐', '5 m ladder, base slides at 1 m/s'], 'ca-s');
  T(S, 'e1', 20, 4, 'x² + y² = 25', 'cz-mono ca-b');
  T(S, 'e2', 20, 5.6, "2x·x′ + 2y·y′ = 0", 'cz-mono', 1); T(S, 'e3', 20, 7.2, "y′ = −(x / y)·x′", 'cz-mono ca-b', 1);
  T(S, 'e4', 20, 10, "x = 3: y′ = −0.75 m/s", 'cz-mono ca-a', 2); T(S, 'e5', 20, 11.8, "x = 4: y′ = −1.33 m/s", 'cz-mono ca-w', 3);
  T(S, 'e6', 20, 14.2, ['아래로 갈수록 더 빨리 떨어져요', 'the top falls faster and faster'], 'ca-r', 4);
  S.cap(1, '변수들 사이의 관계식을 시간 t로 미분하면', 'Differentiate the relation with respect to time')
    .cap(2, '한 변화율로 다른 변화율을 구할 수 있어요', 'and one rate gives you the other')
    .cap(3, '같은 속도로 밀어도 위쪽은 점점 빨라져요', 'Same push, yet the top speeds up')
    .cap(4, '식 세우기 → t로 미분 → 그 순간 값 대입', 'Write the relation, differentiate in t, then plug in');
  return S;
}
function sExtrema() {
  const S = scene({ id: 'ca-extrema', steps: 5, per: 1.3 });
  const F = fr(-2.4, 2.4, -3.2, 3.2, 2, 22, 1.6, 14.6); const f = x => x ** 3 - 3 * x;
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { a: -2.2, b: 2.2, n: 40 });
  [[-1, 2], [1, -2]].forEach(([x, y], i) => { pt(S, 'c' + i, F.X(x), F.Y(y), 1, C.warn, .48); hl(S, 'h' + i, F.X(x - .55), F.X(x + .55), F.Y(y), 'warn', 1); });
  hl(S, 'nl', 2, 22, 17.4, 'ink-3', 2);
  T(S, 'fp', 23, 16.9, "f′ = 3x² − 3", 'cz-mono ca-s', 2);
  [[-1, 'x = −1'], [1, 'x = 1']].forEach(([x, l], i) => { vl(S, 'tk' + i, F.X(x), 16.9, 17.9, 'ink-2', 2); T(S, 'tl' + i, F.X(x) - 1.6, 18.2, l, 'cz-mono cz-tc', 2, { w: 3.2 }); });
  [[-1.8, '+ ↗', 'ca-g'], [0, '− ↘', 'ca-r'], [1.8, '+ ↗', 'ca-g']].forEach(([x, l, c], i) => T(S, 'sg' + i, F.X(x) - 1.5, 15.4, l, 'cz-tc ca-b ' + c, 3, { w: 3 }));
  T(S, 'mx', F.X(-1) - 2, F.Y(2) - 1.6, ['극대 2', 'local max 2'], 'ca-b ca-w', 4); T(S, 'mn', F.X(1) - 2, F.Y(-2) + .7, ['극소 −2', 'local min −2'], 'ca-b ca-w', 4);
  T(S, 'f0', 23, 1.8, 'f(x) = x³ − 3x', 'cz-mono ca-b');
  T(S, 'e1', 23, 4, ["f′(x) = 0 → x = ±1", "f′(x) = 0 → x = ±1"], 'cz-mono', 1);
  T(S, 'e2', 23, 7, ['닫힌 구간이면', 'On a closed interval'], 'ca-b', 5); T(S, 'e3', 23, 8.4, ['끝점 값도 비교', 'also check endpoints'], '', 5);
  S.cap(1, '접선이 수평인 곳(f′ = 0)이 극값 후보예요', 'Candidates are where the tangent is flat (f′ = 0)')
    .cap(2, 'f′의 부호를 표로 정리하면', 'Tabulate the sign of f′')
    .cap(3, '+ → −는 극대, − → +는 극소', '+ to − is a max, − to + is a min')
    .cap(4, 'x = −1에서 극대 2, x = 1에서 극소 −2', 'Max 2 at x = −1, min −2 at x = 1')
    .cap(5, '최댓값·최솟값은 임계점과 끝점을 모두 비교해요', 'Global extremes: compare critical points and endpoints');
  return S;
}
function sConcavity() {
  const S = scene({ id: 'ca-concavity', steps: 4, per: 1.5 });
  const F = fr(-2.4, 2.4, -3.6, 3.6, 2, 22, 1.6, 18); const f = x => x ** 3 / 4;
  rect(S, 'L', 2, 1.6, 10, 16.4, 'danger', 10, 1, { r: 0 }); rect(S, 'R', 12, 1.6, 10, 16.4, 'ok', 12, 2, { r: 0 });
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { n: 40 });
  line(S, 't1', F, -1.5, f(-1.5), .75 * 1.5 * 1.5, { st: 1, color: 'danger' }); line(S, 't2', F, 1.5, f(1.5), .75 * 1.5 * 1.5, { st: 2, color: 'ok' });
  pt(S, 'i', F.X(0), F.Y(0), 3, C.warn, .55);
  T(S, 'l1', 2.6, 2, ['f″ < 0 · 위로 볼록', 'f″ < 0 · concave down'], 'ca-b ca-r', 1);
  T(S, 'l2', 12.6, 15.8, ['f″ > 0 · 아래로 볼록', 'f″ > 0 · concave up'], 'ca-b ca-g', 2);
  T(S, 'l3', F.X(0) + .8, F.Y(0) + .4, ['변곡점', 'inflection'], 'ca-b ca-w', 3);
  T(S, 'e0', 23, 1.8, 'f(x) = x³/4', 'cz-mono ca-b'); T(S, 'e1', 23, 3.4, "f″(x) = 3x/2", 'cz-mono');
  T(S, 'e2', 23, 6.4, ['접선이 곡선 위', 'tangent above curve'], 'ca-r', 1); T(S, 'e3', 23, 8, ['접선이 곡선 아래', 'tangent below curve'], 'ca-g', 2);
  T(S, 'e4', 23, 10.6, ['f″ 부호가 바뀌는 점', 'where f″ changes sign'], 'ca-w', 3);
  T(S, 'e5', 23, 13.4, ['2계 판정', 'second-derivative test'], 'ca-b', 4); T(S, 'e6', 23, 14.8, "f′ = 0, f″ < 0 → max", 'cz-mono', 4); T(S, 'e7', 23, 16.2, "f′ = 0, f″ > 0 → min", 'cz-mono', 4);
  S.cap(1, 'f″ < 0이면 기울기가 줄어드는 위로 볼록', 'f″ < 0: slope decreasing, concave down')
    .cap(2, 'f″ > 0이면 기울기가 늘어나는 아래로 볼록', 'f″ > 0: slope increasing, concave up')
    .cap(3, '볼록의 방향이 바뀌는 점이 변곡점', 'An inflection point is where concavity flips')
    .cap(4, 'f″의 부호로 극대·극소를 바로 판정할 수 있어요', 'The sign of f″ classifies critical points');
  return S;
}
function sMVT() {
  const S = scene({ id: 'ca-mvt', steps: 5, per: 1.3 });
  const F = fr(-.3, 4.5, -.3, 2.6, 2, 19, 2, 18); const f = x => Math.sqrt(Math.max(x, 0));
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { a: 0, b: 4.5, n: 44 });
  pt(S, 'A', F.X(0), F.Y(0), 0, C.cur); pt(S, 'B', F.X(4), F.Y(2), 0, C.cur);
  T(S, 'tA', F.X(0) + .4, F.Y(0) + .3, 'A', 'cz-mono ca-b'); T(S, 'tB', F.X(4) + .4, F.Y(2) + .2, 'B', 'cz-mono ca-b');
  seg(S, 'ab', [F.X(0), F.Y(0)], [F.X(4), F.Y(2)], 1, 'accent', .2);
  [[2, 3], [3, .4], [4, 1]].forEach(([st, c]) => { const m = 1 / (2 * Math.sqrt(c)); line(S, 't' + st, F, c, f(c), m, { st, off: st < 4 ? st + 1 : 0, color: st === 4 ? 'ok' : 'warn' }); pt(S, 'c' + st, F.X(c), F.Y(f(c)), st, st === 4 ? C.okf : C.warn, .45); if (st < 4) S.set('c' + st, st + 1, { opacity: '0' }); });
  T(S, 'e0', 20, 1.8, 'f(x) = √x, [0, 4]', 'cz-mono ca-b');
  T(S, 'e1', 20, 3.6, ['평균 기울기', 'average slope'], '', 1); T(S, 'e2', 20, 5, "(2 − 0)/(4 − 0) = 0.5", 'cz-mono', 1);
  S.label('ev', { cls: 'cz-t cz-mono ca-l', x: 20, y: 7.6, w: 11 }, [[0, ''], [2, "f′(3) ≈ 0.29"], [3, "f′(0.4) ≈ 0.79"], [4, "f′(1) = 0.5 ✓"]]);
  T(S, 'e3', 20, 10.6, ['f′(c) =', 'f′(c) ='], 'cz-mono', 5); T(S, 'e4', 20, 12, '(f(b) − f(a)) / (b − a)', 'cz-mono ca-b', 5);
  T(S, 'e5', 20, 14.4, ['f(a) = f(b)이면', 'if f(a) = f(b):'], '', 5); T(S, 'e6', 20, 15.8, ["f′(c) = 0 (롤의 정리)", "f′(c) = 0 (Rolle)"], 'cz-mono', 5);
  S.cap(1, '구간 양 끝을 잇는 직선의 기울기(평균 변화율)', 'The chord’s slope is the average rate')
    .cap(2, '접선을 옮겨 보면', 'Slide a tangent along the curve')
    .cap(3, '어딘가에서', 'and somewhere')
    .cap(4, '평균 기울기와 똑같은 순간 기울기가 있어요 (c = 1)', 'an instant slope equals the average (c = 1)')
    .cap(5, '구간 평균 속도와 같은 순간 속도가 반드시 있다는 뜻', 'You must hit your average speed at some instant');
  return S;
}
function sLHopital() {
  const S = scene({ id: 'ca-lhopital', steps: 4, per: 1.5 });
  const F = fr(-1.5, 1.5, -1.5, 1.5, 3, 19, 2, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 's', F, Math.sin, { n: 30, color: 'accent', h: .2 }); plot(S, 'l', F, x => x, { n: 4, color: 'warn', h: .14 });
  T(S, 'ls', F.X(1.1) - .4, F.Y(Math.sin(1.1)) + .6, 'sin x', 'cz-mono ca-a'); T(S, 'll', F.X(1.45) - 3.4, F.Y(1.45) - .3, 'y = x', 'cz-mono ca-w');
  pt(S, 'o', F.X(0), F.Y(0), 1, C.badf, .5);
  T(S, 'e0', 20.4, 1.8, 'lim sin x / x', 'cz-mono ca-b'); T(S, 'e0b', 20.4, 3.2, 'x→0', 'cz-mono');
  T(S, 'e1', 20.4, 5.4, ['둘 다 0 → 0/0 꼴', 'both → 0: form 0/0'], 'ca-r', 1);
  T(S, 'e2', 20.4, 8, ['분자·분모를 각각 미분', 'differentiate top and bottom'], '', 2);
  T(S, 'e3', 20.4, 9.6, '= lim cos x / 1', 'cz-mono ca-b', 2);
  T(S, 'e4', 20.4, 11.6, '= cos 0 = 1', 'cz-mono ca-big ca-g', 3);
  T(S, 'e5', 20.4, 14.6, ['예', 'e.g.'], 'ca-b', 4); T(S, 'e6', 20.4, 16, 'lim (eˣ − 1)/x = 1', 'cz-mono', 4); T(S, 'e7', 20.4, 17.4, 'lim ln x / x = 0 (∞/∞)', 'cz-mono', 4);
  S.cap(1, '분자·분모가 함께 0으로 가는 0/0 꼴', 'Numerator and denominator both go to 0')
    .cap(2, '0 근처에서 두 곡선의 기울기를 비교하면', 'Compare their slopes near 0')
    .cap(3, '극한은 도함수의 비로 구해져요', 'and the limit is the ratio of derivatives')
    .cap(4, '0/0, ∞/∞ 꼴에만 써요 · 다른 꼴은 먼저 변형', 'Only for 0/0 or ∞/∞; rewrite other forms first');
  return S;
}

/* ---------- integrals ---------- */
function sRiemann() {
  const S = scene({ id: 'ca-riemann', steps: 5, per: 1.3 });
  const F = fr(0, 4.4, 0, 4.6, 2, 20, 2, 18); const f = x => x * x / 4;
  const sums = [];
  [4, 8, 16].forEach((n, k) => { const d = 4 / n; let s = 0; for (let i = 0; i < n; i++) { const x = i * d, h = f(x); s += h * d; if (h > 0) rect(S, `r${k}_${i}`, F.X(x) + .03, F.Y(h), F.X(d) - F.X(0) - .06, F.Y(0) - F.Y(h), 'accent', 35, k + 1, { off: k < 2 ? k + 2 : 4, css: 'border:.08em solid var(--accent)' }); } sums.push(s); });
  for (let i = 0; i < 44; i++) { const x0 = i * 4 / 44, x1 = (i + 1) * 4 / 44, h = f((x0 + x1) / 2); rect(S, 'm' + i, F.X(x0), F.Y(h), F.X(x1) - F.X(x0) + .02, F.Y(0) - F.Y(h), 'ok', 40, 4, { r: 0 }); }
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, f, { a: 0, b: 4.3, n: 30, h: .2 });
  T(S, 'e0', 21.4, 1.8, '∫₀⁴ x²/4 dx', 'cz-mono ca-b');
  S.label('nv', { cls: 'cz-t cz-mono ca-l', x: 21.4, y: 4.6, w: 10 }, [[0, ''], [1, 'n = 4'], [2, 'n = 8'], [3, 'n = 16'], [4, 'n → ∞']]);
  S.label('sv', { cls: 'cz-t cz-mono ca-l', x: 21.4, y: 6.4, w: 10 }, [[0, ''], [1, `Σ = ${f2(sums[0])}`], [2, `Σ = ${f2(sums[1])}`], [3, `Σ = ${f2(sums[2])}`], [4, '= 16/3 ≈ 5.33']]);
  T(S, 'e1', 21.4, 10, 'Σ f(xᵢ)·Δx', 'cz-mono', 1); T(S, 'e2', 21.4, 11.6, ['직사각형 넓이의 합', 'sum of rectangle areas'], '', 1);
  T(S, 'e3', 21.4, 14.4, ['정적분 = 그 극한', 'integral = the limit'], 'ca-b ca-g', 5);
  S.cap(1, '구간을 n등분해 직사각형으로 넓이를 어림하면', 'Approximate the area with n rectangles')
    .cap(2, 'n을 늘릴수록', 'The more rectangles')
    .cap(3, '오차가 줄어요', 'the smaller the error')
    .cap(4, '극한값이 정적분 = 곡선 아래 넓이', 'The limit is the definite integral: the area')
    .cap(5, '컴퓨터의 수치 적분도 같은 아이디어예요', 'Numerical integration works the same way');
  return S;
}
function sFTC() {
  const S = scene({ id: 'ca-ftc', steps: 5, per: 1.3 });
  const Ft = fr(0, 4.4, 0, 3.4, 3, 20, 1.4, 9.4), f = t => 1 + t / 2, A = x => x + x * x / 4;
  for (let i = 0; i < 24; i++) { const x0 = i / 6, x1 = (i + 1) / 6, h = f((x0 + x1) / 2); rect(S, 'b' + i, Ft.X(x0), Ft.Y(h), Ft.X(x1) - Ft.X(x0) + .02, Ft.Y(0) - Ft.Y(h), 'accent', 30, Math.floor(i / 6) + 1, { r: 0 }); }
  axes(S, 'ta', Ft, { xl: 't', yl: 'f' }); plot(S, 'tp', Ft, f, { a: 0, b: 4.3, n: 4, h: .2 });
  const Fb = fr(0, 4.4, 0, 8.8, 3, 20, 11, 19.6);
  axes(S, 'ba', Fb, { xl: 'x', yl: 'A' }); plot(S, 'bp', Fb, A, { a: 0, b: 4, n: 24, st: i => Math.ceil(i / 6), color: 'warn', h: .2 });
  vl(S, 'mk', Ft.X(1), Ft.T, Fb.B, 'ink-3', 1, { dash: 1 }); [2, 3, 4].forEach(x => S.move('mk', x, Ft.X(x) - .07, Ft.T));
  pt(S, 'pa', Fb.X(1), Fb.Y(A(1)), 1, C.warn, .45); [2, 3, 4].forEach(x => S.move('pa', x, Fb.X(x) - .45, Fb.Y(A(x)) - .45));
  T(S, 'e0', 21.4, 1.6, 'f(t) = 1 + t/2', 'cz-mono ca-b'); T(S, 'e1', 21.4, 3, 'A(x) = ∫₀ˣ f(t) dt', 'cz-mono');
  S.label('av', { cls: 'cz-t cz-mono ca-l', x: 21.4, y: 5.4, w: 10 }, [[0, ''], [1, 'A(1) = 1.25'], [2, 'A(2) = 3'], [3, 'A(3) = 5.25'], [4, 'A(4) = 8']]);
  T(S, 'e2', 21.4, 8.6, ["A′(x) = f(x)", "A′(x) = f(x)"], 'cz-mono ca-big ca-g', 4);
  T(S, 'e3', 21.4, 12, ['그래서', 'so'], '', 5); T(S, 'e4', 21.4, 13.4, "∫ₐᵇ f dx = F(b) − F(a)", 'cz-mono ca-b', 5);
  T(S, 'e5', 21.4, 15.4, ["F′ = f인 아무 F", "any F with F′ = f"], '', 5);
  S.cap(1, '0부터 x까지 쌓인 넓이를 A(x)라 하면', 'Let A(x) be the area accumulated from 0 to x')
    .cap(2, 'x가 커질수록 A가 늘어나고', 'As x grows, A grows')
    .cap(3, '늘어나는 속도는 그 자리의 높이 f(x)', 'at a rate equal to the height f(x)')
    .cap(4, '적분해서 미분하면 원래 함수 (미적분학의 기본 정리)', 'Integrate, then differentiate: you get f back')
    .cap(5, '정적분은 부정적분(원시함수)의 차로 계산해요', 'So a definite integral is a difference of antiderivatives');
  return S;
}
function sSubst() {
  const S = scene({ id: 'ca-subst', steps: 5, per: 1.4 });
  const L = [[2, '∫ 2x · cos(x²) dx', 0, 'ca-xl'], [6, ['∫ cos(<b class="h1">x²</b>) · <b class="h2">2x dx</b>', '∫ cos(<b class="h1">x²</b>) · <b class="h2">2x dx</b>'], 1, 'ca-xl'], [10, ['= ∫ cos(<b class="h1">u</b>) <b class="h2">du</b>', '= ∫ cos(<b class="h1">u</b>) <b class="h2">du</b>'], 2, 'ca-xl'], [14, '= sin u + C', 3, 'ca-xl'], [18, '= sin(x²) + C', 4, 'ca-xl ca-g']];
  L.forEach(([y, t, st, c], i) => T(S, 'l' + i, 1, y, t, 'cz-mono cz-tc ' + c, st, { w: 30 }));
  pill(S, 'u', 1.4, 6.4, 'u = x²', { w: 6, h: 2, s: hid(C.soft) }); pill(S, 'du', 24.6, 6.4, 'du = 2x dx', { w: 6.4, h: 2, s: hid(C.cmp) }); show(S, ['u', 'du'], 1);
  S.cap(1, '안쪽 함수 x²와 그 도함수 2x가 함께 있으면', 'Spot an inner function x² next to its derivative 2x')
    .cap(2, 'u = x²로 바꾸면 du = 2x dx라서 식이 단순해져요', 'Set u = x²; du = 2x dx swallows the rest')
    .cap(3, '쉬운 적분으로 풀고', 'Integrate the easy form')
    .cap(4, '다시 x로 되돌려요', 'then substitute back')
    .cap(5, '정적분이면 적분 구간도 u 기준으로 바꿔요', 'For definite integrals, convert the limits too');
  return S;
}
function sParts() {
  const S = scene({ id: 'ca-parts', steps: 5, per: 1.35 });
  const F = fr(0, 4.6, 0, 2.6, 3, 18, 2, 17);
  for (let i = 0; i < 18; i++) { const u0 = 1 + i / 6, u1 = 1 + (i + 1) / 6, h = Math.sqrt((u0 + u1) / 2); rect(S, 'v' + i, F.X(u0), F.Y(h), F.X(u1) - F.X(u0) + .02, F.Y(0) - F.Y(h), 'accent', 30, 2, { r: 0 }); }
  for (let i = 0; i < 10; i++) { const v0 = 1 + i / 10, v1 = 1 + (i + 1) / 10, w = ((v0 + v1) / 2) ** 2; rect(S, 'h' + i, F.X(0), F.Y(v1), F.X(w) - F.X(0), F.Y(v0) - F.Y(v1) + .02, 'warn', 34, 3, { r: 0 }); }
  rect(S, 'sq', F.X(0), F.Y(1), F.X(1) - F.X(0), F.Y(0) - F.Y(1), 'ink-3', 30, 4, { r: 0 });
  S.el('box', { x: F.X(0), y: F.Y(2), w: F.X(4) - F.X(0), h: F.Y(0) - F.Y(2), css: 'border:.16em dashed var(--ok)', s: hid() }); S.set('box', 4, { opacity: '1' });
  axes(S, 'a', F, { xl: 'u', yl: 'v' });
  plot(S, 'p', F, Math.sqrt, { a: 1, b: 4, n: 24, h: .22, color: 'ink' });
  T(S, 'tv', F.X(2.2), F.Y(.7), '∫ v du', 'cz-mono ca-b', 2); T(S, 'tu', F.X(.6), F.Y(1.6), '∫ u dv', 'cz-mono ca-b', 3);
  T(S, 'e0', 19, 1.8, ['곡선 v = √u, 1 ≤ u ≤ 4', 'curve v = √u, 1 ≤ u ≤ 4'], 'cz-mono ca-s');
  T(S, 'e1', 19, 4, '∫ v du = 14/3', 'cz-mono ca-a', 2); T(S, 'e2', 19, 5.6, '∫ u dv = 7/3', 'cz-mono ca-w', 3);
  T(S, 'e3', 19, 7.6, '[uv] = 8 − 1 = 7', 'cz-mono ca-g', 4);
  T(S, 'e4', 19, 10.4, "∫u dv = uv − ∫v du", 'cz-mono ca-big', 5);
  T(S, 'e5', 19, 13.4, ['예', 'e.g.'], 'ca-b', 5); T(S, 'e6', 19, 14.8, '∫ x·eˣ dx', 'cz-mono', 5); T(S, 'e7', 19, 16.2, '= x·eˣ − eˣ + C', 'cz-mono', 5);
  S.cap(1, '곱의 미분을 거꾸로 쓰는 적분법이에요', 'Integration by parts reverses the product rule')
    .cap(2, '곡선 아래 넓이가 ∫v du', 'The area under the curve is ∫v du')
    .cap(3, '왼쪽 넓이가 ∫u dv', 'the area to its left is ∫u dv')
    .cap(4, '둘을 더하면 큰 사각형에서 작은 사각형을 뺀 [uv]', 'Together they make the [uv] rectangle difference')
    .cap(5, 'u는 미분하면 단순해지는 쪽으로 (LIATE 순서)', 'Pick u to simplify when differentiated (LIATE)');
  return S;
}
function sPartialFrac() {
  const S = scene({ id: 'ca-partialfrac', steps: 4, per: 1.5 });
  const L = [[2.4, '∫ 1 / (x² − 1) dx', 0, ''], [6.4, '1 / (x² − 1) = 1 / ((x − 1)(x + 1))', 1, 'ca-a'], [10.4, '= A / (x − 1) + B / (x + 1)', 2, ''], [14.4, ['x = 1 대입 → A = 1/2,  x = −1 대입 → B = −1/2', 'x = 1 → A = 1/2,  x = −1 → B = −1/2'], 3, 'ca-w'], [18.2, '∫ = ½ ln|x − 1| − ½ ln|x + 1| + C', 4, 'ca-g']];
  L.forEach(([y, t, st, c], i) => T(S, 'l' + i, 1, y, t, 'cz-mono cz-tc ca-l ' + c, st, { w: 30 }));
  S.cap(1, '분모를 인수분해하고', 'Factor the denominator')
    .cap(2, '간단한 분수들의 합으로 나눠요', 'Split into simple fractions')
    .cap(3, '근을 대입하면 계수가 바로 나와요 (가리기 방법)', 'Plug in the roots to read off the coefficients')
    .cap(4, '각각은 ln으로 적분돼요 · 유리함수 적분의 기본', 'Each piece integrates to a log: the standard route for rational functions');
  return S;
}
function sImproper() {
  const S = scene({ id: 'ca-improper', steps: 4, per: 1.5 });
  const P = [[1.5, x => 1 / (x * x), ['1/x²', '1/x²'], ['b = 2: 0.50', 'b = 4: 0.75', 'b = 8: 0.88', '→ 1 (수렴)'], ['b = 2: 0.50', 'b = 4: 0.75', 'b = 8: 0.88', '→ 1 (converges)'], 'ok'], [17, x => 1 / x, ['1/x', '1/x'], ['ln 2 = 0.69', 'ln 4 = 1.39', 'ln 8 = 2.08', '→ ∞ (발산)'], ['ln 2 = 0.69', 'ln 4 = 1.39', 'ln 8 = 2.08', '→ ∞ (diverges)'], 'danger']];
  P.forEach(([L, f, n, ko, en, c], p) => {
    const F = fr(0, 8.6, 0, 1.1, L, L + 13.5, 3.4, 15);
    for (let i = 0; i < 56; i++) { const x0 = 1 + i / 8, x1 = 1 + (i + 1) / 8, h = f((x0 + x1) / 2), st = x1 <= 2 ? 1 : x1 <= 4 ? 2 : 3; rect(S, `b${p}_${i}`, F.X(x0), F.Y(h), F.X(x1) - F.X(x0) + .02, F.Y(0) - F.Y(h), p ? 'danger' : 'ok', 30, st, { r: 0 }); }
    axes(S, 'a' + p, F, {}); plot(S, 'p' + p, F, f, { a: .92, b: 8.6, n: 40, h: .2 });
    T(S, 'h' + p, L, 1.4, `∫₁^∞ ${n[0]} dx`, 'cz-mono ca-b');
    S.label('v' + p, { cls: 'cz-t cz-mono ca-l ca-' + (p ? 'r' : 'g'), x: L, y: 16, w: 13.5 }, [[0, ''], [1, [ko[0], en[0]]], [2, [ko[1], en[1]]], [3, [ko[2], en[2]]], [4, [ko[3], en[3]]]]);
  });
  S.cap(1, '끝이 무한대인 적분은 b까지 적분한 뒤 b → ∞ 극한으로', 'Integrate to b, then let b → ∞')
    .cap(2, '1/x²은 넓이가 1에 다가가고', '1/x² approaches an area of 1')
    .cap(3, '1/x은 끝없이 커져요', 'while 1/x keeps growing')
    .cap(4, '∫₁^∞ 1/xᵖ dx는 p > 1일 때만 수렴', '∫₁^∞ 1/xᵖ dx converges only when p > 1');
  return S;
}
function sVolume() {
  const S = scene({ id: 'ca-volume', steps: 4, per: 1.5 });
  const F = fr(-.2, 4.6, -2.4, 2.4, 2, 18, 2, 18);
  [.5, 1.5, 2.5, 3.5].forEach((x, i) => { const r = Math.sqrt(x); S.el('d' + i, { x: F.X(x) - .55, y: F.Y(r), w: 1.1, h: F.Y(-r) - F.Y(r), css: 'border-radius:50%;border:.14em solid var(--accent)', s: hid({ background: tint('accent', 25) }) }); S.set('d' + i, 3, { opacity: '1' }); });
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'p', F, x => Math.sqrt(Math.max(0, x)), { a: 0, b: 4.4, n: 30, h: .22 });
  plot(S, 'm', F, x => -Math.sqrt(Math.max(0, x)), { a: 0, b: 4.4, n: 30, h: .16, st: 2, color: 'ink-3' });
  ar(S, 'rot', [F.X(4.3), F.Y(1.6)], [F.X(4.3), F.Y(-1.6)], 'ink-2', 2);
  vl(S, 'rr', F.X(2.5), F.Y(0), F.Y(Math.sqrt(2.5)), 'warn', 3); T(S, 'rt', F.X(2.5) + .4, F.Y(.8), 'r = √x', 'cz-mono ca-w', 3);
  T(S, 'e0', 19, 1.8, 'y = √x, 0 ≤ x ≤ 4', 'cz-mono ca-b');
  T(S, 'e1', 19, 4, ['x축 둘레로 회전', 'spin around the x-axis'], '', 2);
  T(S, 'e2', 19, 6.4, ['원판 넓이 π r²', 'disk area π r²'], '', 3);
  T(S, 'e3', 19, 9.4, 'V = π∫₀⁴ (√x)² dx', 'cz-mono', 4); T(S, 'e4', 19, 11, '= π∫₀⁴ x dx = 8π', 'cz-mono ca-big ca-g', 4);
  T(S, 'e5', 19, 14.6, ['원통껍질법', 'shell method'], 'ca-b', 4); T(S, 'e6', 19, 16, 'V = 2π∫ x·f(x) dx', 'cz-mono', 4);
  S.cap(1, '곡선 y = √x 아래 영역을', 'Take the region under y = √x')
    .cap(2, 'x축 둘레로 돌리면 입체가 생겨요', 'and spin it around the x-axis')
    .cap(3, '얇은 원판(π r² · dx)들을 쌓으면', 'Stack thin disks of volume π r² dx')
    .cap(4, '부피 = π∫ r² dx (원판법)', 'Volume = π∫ r² dx (disk method)');
  return S;
}
function sPolar() {
  const S = scene({ id: 'ca-polar', steps: 4, per: 1.5 });
  const cx = 8, cy = 10.5, k = 5, P = th => { const r = 1 + Math.cos(th); return [cx + k * r * Math.cos(th), cy - k * r * Math.sin(th)]; };
  hl(S, 'ax', 2, 19, cy, 'ink-3'); vl(S, 'ay', cx, 3, 18, 'ink-3');
  pplot(S, 'c', P, 0, 2 * Math.PI, { n: 48, st: i => Math.min(4, Math.ceil(i / 12)), h: .22 });
  [Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI - .001].forEach((th, i) => { const p = P(th); seg(S, 'ry' + i, [cx, cy], p, i + 1, 'warn', .14); if (i < 3) S.set('ry' + i, i + 2, { opacity: '0' }); });
  T(S, 'e0', 21, 1.8, 'r = 1 + cos θ', 'cz-mono ca-b');
  S.label('th', { cls: 'cz-t cz-mono ca-l', x: 21, y: 4, w: 10 }, [[0, ''], [1, 'θ = π/2'], [2, 'θ = π'], [3, 'θ = 3π/2'], [4, 'θ = 2π']]);
  T(S, 'e1', 21, 7.4, 'A = ½∫₀²ᵖ r² dθ'.replace('ᵖ', 'π'), 'cz-mono', 4);
  T(S, 'e2', 21, 9, '= ½∫(1 + cos θ)² dθ', 'cz-mono', 4); T(S, 'e3', 21, 10.8, '= 3π/2', 'cz-mono ca-big ca-g', 4);
  T(S, 'e4', 21, 14, ['작은 부채꼴 넓이', 'thin wedge area'], '', 2); T(S, 'e5', 21, 15.4, '½ r² dθ', 'cz-mono ca-b', 2);
  S.cap(1, '극좌표는 원점에서의 거리 r과 각도 θ로 점을 나타내요', 'Polar coordinates: distance r and angle θ')
    .cap(2, 'θ가 돌아가며 심장형 곡선이 그려지고', 'As θ turns, a cardioid is traced')
    .cap(3, '넓이는 얇은 부채꼴 ½r²dθ를 더해서', 'Area sums thin wedges ½r²dθ')
    .cap(4, '심장형의 넓이는 3π/2', 'The cardioid’s area is 3π/2');
  return S;
}

/* ---------- series ---------- */
function sGeometric() {
  const S = scene({ id: 'ca-geometric', steps: 6, per: 1.15 });
  let x = 3, y = 3, w = 15, h = 15; const L = ['1/2', '1/4', '1/8', '1/16', '1/32', '1/64'];
  S.el('sq', { x: 3, y: 3, w: 15, h: 15, css: 'border:.16em solid var(--ink-2);border-radius:.2em' });
  L.forEach((l, i) => { let r; if (i % 2 === 0) { r = [x, y, w / 2, h]; x += w / 2; w /= 2; } else { r = [x, y, w, h / 2]; y += h / 2; h /= 2; } rect(S, 'p' + i, r[0] + .06, r[1] + .06, r[2] - .12, r[3] - .12, i % 2 ? 'warn' : 'accent', 30 + i * 6, Math.min(i + 1, 6), { html: i < 4 ? l : '', cls: 'cz-c ' + (i < 2 ? 'ca-l' : 'ca-xs') }); });
  T(S, 'e0', 20, 1.8, '½ + ¼ + ⅛ + …', 'cz-mono ca-b');
  S.label('sv', { cls: 'cz-t cz-mono ca-l', x: 20, y: 4.4, w: 11 }, [[0, ''], [1, 'S₁ = 0.5'], [2, 'S₂ = 0.75'], [3, 'S₃ = 0.875'], [4, 'S₄ = 0.9375'], [5, 'S₅ = 0.96875'], [6, 'S∞ = 1']]);
  T(S, 'e1', 20, 8.6, 'Σ a·rⁿ = a / (1 − r)', 'cz-mono ca-l', 6); T(S, 'e2', 20, 10.6, ['|r| < 1일 때', 'when |r| < 1'], '', 6);
  T(S, 'e3', 20, 13, '½ / (1 − ½) = 1', 'cz-mono ca-g', 6);
  T(S, 'e4', 20, 15.6, ['예: 0.999… = 9/10 ÷ (1 − 1/10)', 'e.g. 0.999… = 9/10 ÷ (1 − 1/10)'], 'ca-s', 6);
  S.cap(1, '정사각형 넓이 1의 절반을 칠하고', 'Shade half of a unit square')
    .cap(2, '남은 부분의 절반을 계속 칠해요', 'then half of what remains')
    .cap(4, '부분합이 1에 한없이 가까워져요', 'The partial sums creep toward 1')
    .cap(6, '공비 |r| < 1인 등비급수는 a/(1 − r)로 수렴', 'A geometric series with |r| < 1 sums to a/(1 − r)');
  return S;
}
function sTests() {
  const S = scene({ id: 'ca-tests', steps: 5, per: 1.3 });
  const F = fr(0, 31, 0, 4.4, 2, 20, 2.4, 18);
  axes(S, 'a', F, { xl: 'n', yl: 'Sₙ' });
  hl(S, 'as', F.L, F.R, F.Y(Math.PI ** 2 / 6), 'ok', 3, { dash: 1 });
  let h = 0, p = 0;
  for (let n = 1; n <= 30; n++) { h += 1 / n; p += 1 / (n * n); const st = Math.ceil(n / 10); pt(S, 'h' + n, F.X(n), F.Y(h), st, C.badf, .22); pt(S, 'q' + n, F.X(n), F.Y(p), st, C.okf, .22); }
  T(S, 'th', F.X(22) - 1, F.Y(4.1) - .3, 'Σ 1/n → ∞', 'cz-mono ca-r', 3); T(S, 'tp', F.X(20), F.Y(1.645) + .5, 'Σ 1/n² → π²/6', 'cz-mono ca-g', 3);
  [['비교 판정', 'Comparison'], ['비 판정 · L < 1', 'Ratio · L < 1'], ['적분 판정', 'Integral test'], ['교대급수 판정', 'Alternating series']].forEach((l, i) => pill(S, 't' + i, 21.4, 3 + i * 2.8, l, { w: 9.8, h: 2.2, s: hid(i % 2 ? C.cmp : C.soft) }));
  show(S, ['t0', 't1', 't2', 't3'], 4);
  T(S, 'ex', 21.4, 15, ['p급수 Σ1/nᵖ', 'p-series Σ1/nᵖ'], 'ca-b', 5); T(S, 'ex2', 21.4, 16.4, ['p > 1이면 수렴', 'converges iff p > 1'], '', 5);
  S.cap(1, '항이 0으로 가도 합이 수렴한다는 보장은 없어요', 'Terms going to 0 doesn’t guarantee a finite sum')
    .cap(2, '조화급수 Σ1/n은 느리지만 끝없이 커지고', 'The harmonic series grows forever, slowly')
    .cap(3, 'Σ1/n²은 π²/6에 수렴해요', 'while Σ1/n² converges to π²/6')
    .cap(4, '수렴은 판정법으로 확인해요', 'Use a convergence test to decide')
    .cap(5, '비 판정: |aₙ₊₁/aₙ| → L, L < 1 수렴 · L > 1 발산', 'Ratio test: L < 1 converges, L > 1 diverges');
  return S;
}
function sPower() {
  const S = scene({ id: 'ca-power', steps: 5, per: 1.3 });
  const F = fr(-1.6, 1.6, -1, 6.5, 2, 20, 1.6, 18);
  rect(S, 'iv', F.X(-1), F.Y(0) - .3, F.X(1) - F.X(-1), .6, 'ok', 60, 4, { r: .3 });
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  plot(S, 'g', F, x => 1 / (1 - x), { a: -1.6, b: .845, n: 36, h: .24, color: 'ink' });
  [[1, 1], [2, 3], [3, 8]].forEach(([st, N]) => plot(S, 'P' + N + '_', F, x => { let s = 0; for (let k = 0; k <= N; k++) s += x ** k; return s; }, { n: 40, st, off: st < 3 ? st + 1 : 0, color: 'warn', h: .18 }));
  vl(S, 'b1', F.X(-1), F.T, F.B, 'ok', 4, { dash: 1 }); vl(S, 'b2', F.X(1), F.T, F.B, 'ok', 4, { dash: 1 });
  T(S, 'e0', 21, 1.8, '1 + x + x² + x³ + …', 'cz-mono ca-b'); T(S, 'e0b', 21, 3.2, '= 1 / (1 − x)', 'cz-mono');
  S.label('nv', { cls: 'cz-t cz-mono ca-l ca-w', x: 21, y: 5.6, w: 10 }, [[0, ''], [1, 'N = 1'], [2, 'N = 3'], [3, 'N = 8']]);
  T(S, 'e1', 21, 8.4, ['비 판정: |x| < 1', 'ratio test: |x| < 1'], '', 4); T(S, 'e2', 21, 10, ['수렴 반경 R = 1', 'radius R = 1'], 'ca-b ca-g', 4);
  T(S, 'e3', 21, 13, ['끝점 x = ±1은 따로', 'check x = ±1 separately'], '', 5);
  T(S, 'e4', 21, 14.6, ['Σ xⁿ/n: −1 포함', 'Σ xⁿ/n includes −1'], 'ca-s', 5);
  S.cap(1, '거듭제곱급수의 부분합은 다항식이에요', 'Partial sums of a power series are polynomials')
    .cap(2, '항을 늘리면 구간 안에서는 원래 함수에 붙고', 'More terms hug the function inside an interval')
    .cap(3, '밖에서는 오히려 멀어져요', 'and fly away outside it')
    .cap(4, '수렴하는 구간의 반지름이 수렴 반경', 'The half-width of that interval is the radius of convergence')
    .cap(5, '반경 안에서는 항별로 미분·적분할 수 있어요', 'Inside it you can differentiate and integrate term by term');
  return S;
}
function sTaylor() {
  const S = scene({ id: 'ca-taylor', steps: 6, per: 1.15 });
  const F = fr(-6.6, 6.6, -2.2, 2.2, 1.5, 30.5, 3, 18);
  axes(S, 'a', F, { xl: 'x' });
  plot(S, 's', F, Math.sin, { n: 60, color: 'ink', h: .24 });
  const fact = n => n <= 1 ? 1 : n * fact(n - 1);
  const P = N => x => { let s = 0; for (let k = 0; 2 * k + 1 <= N; k++) s += (k % 2 ? -1 : 1) * x ** (2 * k + 1) / fact(2 * k + 1); return s; };
  [1, 3, 5, 7, 9].forEach((N, i) => plot(S, 'p' + N + '_', F, P(N), { n: 60, st: i + 1, off: i < 4 ? i + 2 : 0, color: 'warn', h: .2 }));
  S.label('pv', { cls: 'cz-t cz-mono ca-l ca-w', x: 1.6, y: .6, w: 30 }, [[0, ''], [1, 'P₁ = x'], [2, 'P₃ = x − x³/3!'], [3, 'P₅ = x − x³/3! + x⁵/5!'], [4, 'P₇ = … − x⁷/7!'], [5, 'P₉ = … + x⁹/9!']]);
  T(S, 'e0', 1.6, 18.6, 'f(x) = Σ f⁽ⁿ⁾(a) (x − a)ⁿ / n!', 'cz-mono ca-b', 6);
  T(S, 'e1', 17, 18.6, 'eˣ = 1 + x + x²/2! + …', 'cz-mono', 6);
  S.cap(1, 'sin x를 x = 0 근처에서 다항식으로 흉내 내요', 'Imitate sin x near 0 with polynomials')
    .cap(2, '차수를 올릴수록', 'Each extra degree')
    .cap(3, '맞는 구간이 넓어져요', 'widens the matching region')
    .cap(5, '도함수 정보만으로 함수를 재구성해요', 'Rebuilt from derivatives at a single point')
    .cap(6, '근삿값 계산, 극한, 물리 근사(sin θ ≈ θ)에 써요', 'Used for approximations, limits and physics (sin θ ≈ θ)');
  return S;
}

/* ---------- multivariable ---------- */
function sPartialD() {
  const S = scene({ id: 'ca-partialderiv', steps: 4, per: 1.5 });
  const xs = [-2, -1.5, -1, -.5, 0, .5, 1, 1.5, 2], ys = [1.5, 1, .5, 0, -.5, -1], f = (x, y) => x * x + 3 * y;
  xs.forEach((x, i) => ys.forEach((y, j) => { const v = (f(x, y) + 4.5) / 13; cell(S, `c${i}_${j}`, 1 + i * 1.6, 2.6 + j * 2.1, '', { w: 1.5, h: 2, s: { background: `color-mix(in srgb,var(--accent) ${Math.round(8 + v * 80)}%,var(--ui))`, 'border-color': 'transparent' } }); }));
  T(S, 'gx', 6, 15.4, ['x →', 'x →'], 'cz-mono'); T(S, 'gy', .2, 1.2, ['y ↑ (f = x² + 3y)', 'y ↑ (f = x² + 3y)'], 'cz-mono ca-s');
  S.el('row', { x: .9, y: 4.6, w: 14.6, h: 2.2, css: 'border:.18em solid var(--warn);border-radius:.3em;z-index:4', s: hid() }); S.set('row', 2, { opacity: '1' }).set('row', 3, { opacity: '0' });
  S.el('col', { x: 1 + 6 * 1.6 - .1, y: 2.5, w: 1.7, h: 12.8, css: 'border:.18em solid var(--ok);border-radius:.3em;z-index:4', s: hid() }); S.set('col', 3, { opacity: '1' });
  pt(S, 'P', 1 + 6 * 1.6 + .75, 4.6 + 1.05, 2, C.badf, .4);
  const R = fr(-2, 2.2, -1, 8, 18, 31, 3, 15);
  axes(S, 'ra', R, {});
  plot(S, 'sx', R, x => x * x + 3, { a: -2, b: 2.2, n: 28, st: 2, off: 3, color: 'warn' }); line(S, 'tx', R, 1, 4, 2, { st: 2, off: 3, color: 'danger' });
  plot(S, 'sy', R, y => 1 + 3 * y, { a: -.6, b: 2.2, n: 4, st: 3, color: 'ok' }); line(S, 'ty', R, 1, 4, 3, { st: 3, color: 'danger', h: .1 });
  S.label('rl', { cls: 'cz-t cz-mono ca-l', x: 18, y: .8, w: 13 }, [[0, ''], [2, ['y = 1로 자르면 z = x² + 3', 'slice y = 1: z = x² + 3']], [3, ['x = 1로 자르면 z = 1 + 3y', 'slice x = 1: z = 1 + 3y']]]);
  S.label('rv', { cls: 'cz-t cz-mono ca-l', x: 18, y: 16, w: 13 }, [[0, ''], [2, '∂f/∂x = 2x = 2'], [3, '∂f/∂y = 3'], [4, '∇f(1, 1) = (2, 3)']]);
  S.cap(1, '두 변수 함수 f(x, y)를 색으로 칠한 지도', 'A two-variable function f(x, y) as a colour map')
    .cap(2, 'y를 고정하고 x 방향으로만 미분하면 ∂f/∂x', 'Fix y and differentiate in x: ∂f/∂x')
    .cap(3, 'x를 고정하면 ∂f/∂y', 'Fix x instead: ∂f/∂y')
    .cap(4, '편미분들을 모은 벡터가 그래디언트 ∇f', 'Stack them into the gradient ∇f');
  return S;
}
function sGradient() {
  const S = scene({ id: 'ca-gradient', steps: 5, per: 1.3 });
  const cx = 10.5, cy = 10.2, k = 2.6, X = x => cx + k * x, Y = y => cy - k * y;
  [1, 2, 4, 6, 9].forEach((c, i) => pplot(S, 'e' + i + '_', t => [X(Math.sqrt(c) * Math.cos(t)), Y(Math.sqrt(c / 2) * Math.sin(t))], 0, 2 * Math.PI, { n: 40, color: 'ink-3', h: .1 }));
  const G = [[1, 1], [-2, .5], [0, -1.5], [2.4, 0], [-1.2, -1]];
  G.forEach(([x, y], i) => ar(S, 'g' + i, [X(x), Y(y)], [X(x + .3 * 2 * x), Y(y + .3 * 4 * y)], 'accent', 2, { h: .16 }));
  pt(S, 'P', X(1), Y(1), 3, C.badf, .45);
  ar(S, 'u', [X(1), Y(1)], [X(1 + .6 * 1.6), Y(1 + .8 * 1.6)], 'warn', 4, { h: .18 });
  T(S, 'e0', 21.6, 1.8, 'f = x² + 2y²', 'cz-mono ca-b'); T(S, 'e0b', 21.6, 3.2, ['회색 = 등고선', 'grey = contours'], 'ca-s');
  T(S, 'e1', 21.6, 5.6, '∇f = (2x, 4y)', 'cz-mono', 2);
  T(S, 'e2', 21.6, 7.4, '∇f(1, 1) = (2, 4)', 'cz-mono ca-b', 3);
  T(S, 'e3', 21.6, 10, 'u = (0.6, 0.8)', 'cz-mono ca-w', 4); T(S, 'e4', 21.6, 11.6, 'Dᵤf = ∇f · u = 4.4', 'cz-mono ca-w', 4);
  T(S, 'e5', 21.6, 14.4, ['최대 증가율 |∇f|', 'max rate |∇f|'], '', 5); T(S, 'e6', 21.6, 15.8, '= √20 ≈ 4.47', 'cz-mono ca-b', 5);
  S.cap(1, '등고선 지도에서', 'On a contour map')
    .cap(2, '그래디언트는 등고선에 수직, 가장 가파르게 오르는 방향', 'the gradient is perpendicular to contours, pointing uphill')
    .cap(3, '각 성분이 편미분이에요', 'Its components are the partial derivatives')
    .cap(4, '방향도함수 = 그래디언트와 단위벡터의 내적', 'A directional derivative is ∇f · u')
    .cap(5, '경사 하강법은 −∇f 방향으로 내려가요', 'Gradient descent walks along −∇f');
  return S;
}
function sSaddle() {
  const S = scene({ id: 'ca-saddle', steps: 4, per: 1.5 });
  const P = [[1, ['극소', 'Minimum'], 'f = x² + y²', ['D > 0, fₓₓ > 0', 'D > 0, fₓₓ > 0'], 'accent'], [11.4, ['극대', 'Maximum'], 'f = −x² − y²', ['D > 0, fₓₓ < 0', 'D > 0, fₓₓ < 0'], 'warn'], [21.8, ['안장점', 'Saddle point'], 'f = x² − y²', ['D < 0', 'D < 0'], 'danger']];
  P.forEach(([px, t, f, d, c], p) => {
    S.el('bg' + p, { x: px, y: 2.6, w: 9.4, h: 15.4, css: 'border-radius:.8em;background:color-mix(in srgb,var(--line) 40%,transparent)', s: hid() }); S.set('bg' + p, p + 1, { opacity: '1' });
    const cx = px + 4.7, cy = 8.6, k = 1.9;
    if (p < 2) [.7, 1.4, 2.1].forEach((r, i) => { S.el(`r${p}_${i}`, { x: cx - r * k, y: cy - r * k, w: 2 * r * k, h: 2 * r * k, css: `border-radius:50%;border:.14em solid color-mix(in srgb,var(--${c}) ${p ? 90 - i * 25 : 40 + i * 25}%,var(--ui))`, s: hid() }); S.set(`r${p}_${i}`, p + 1, { opacity: '1' }); });
    else [.6, 1.5].forEach((cc, i) => [1, -1].forEach(sg => { pplot(S, `h${i}${sg}x`, t => [cx + sg * k * Math.sqrt(cc + t * t), cy - k * t], -1.6, 1.6, { n: 16, st: 3, color: 'warn', h: .12 }); pplot(S, `h${i}${sg}y`, t => [cx + k * t, cy - sg * k * Math.sqrt(cc + t * t)], -1.6, 1.6, { n: 16, st: 3, color: 'accent', h: .12 }); }));
    pt(S, 'c' + p, cx, cy, p + 1, p === 2 ? C.badf : (p ? C.warn : C.cur), .4);
    T(S, 't' + p, px + .4, 3, t, 'ca-b', p + 1); T(S, 'f' + p, px + .4, 13.6, f, 'cz-mono ca-s', p + 1); T(S, 'd' + p, px + .4, 15.4, d, 'cz-mono ca-s', p + 1);
  });
  T(S, 'D', 1, 18.6, 'D = fₓₓ·fᵧᵧ − (fₓᵧ)²', 'cz-mono ca-b', 4); T(S, 'D2', 16, 18.6, ['D = 0이면 판정 불가', 'D = 0: inconclusive'], '', 4);
  S.cap(1, '모든 방향으로 올라가면 극소', 'Uphill in every direction: a minimum')
    .cap(2, '모든 방향으로 내려가면 극대', 'Downhill in every direction: a maximum')
    .cap(3, '한쪽은 오르고 한쪽은 내려가면 안장점', 'Up one way, down another: a saddle')
    .cap(4, '임계점(∇f = 0)에서 판별식 D로 구분해요', 'At ∇f = 0, the discriminant D tells them apart');
  return S;
}
function sLagrange() {
  const S = scene({ id: 'ca-lagrange', steps: 5, per: 1.35 });
  const F = fr(0, 5, 0, 5, 2, 17, 3, 18);
  axes(S, 'a', F, { xl: 'x', yl: 'y' });
  [1, 2, 4, 6].forEach((c, i) => plot(S, 'h' + c + '_', F, x => c / x, { a: c / 5, b: 5, n: 26, st: 2, color: c === 4 ? 'ok' : 'ink-3', h: c === 4 ? .18 : .1 }));
  seg(S, 'g', [F.X(0), F.Y(4)], [F.X(4), F.Y(0)], 1, 'warn', .22);
  pt(S, 'P', F.X(.6), F.Y(3.4), 3, C.cur, .45); S.move('P', 4, F.X(2) - .45, F.Y(2) - .45);
  ar(S, 'gf', [F.X(2), F.Y(2)], [F.X(3.2), F.Y(3.2)], 'accent', 4, { h: .18 }); ar(S, 'gg', [F.X(2), F.Y(2)], [F.X(2.6), F.Y(2.6)], 'warn', 4, { h: .3 });
  T(S, 'e0', 19, 1.8, ['f = xy 최대화', 'maximize f = xy'], 'cz-mono ca-b'); T(S, 'e0b', 19, 3.2, ['조건 g: x + y = 4', 'subject to x + y = 4'], 'cz-mono ca-w');
  S.label('pv', { cls: 'cz-t cz-mono ca-l', x: 19, y: 5.8, w: 12 }, [[0, ''], [3, '(0.6, 3.4): f = 2.04'], [4, '(2, 2): f = 4']]);
  T(S, 'e1', 19, 8.6, ['등고선이 조건선에 접할 때', 'contour touches the line'], '', 4);
  T(S, 'e2', 19, 10.6, '∇f = λ∇g', 'cz-mono ca-big', 5); T(S, 'e3', 19, 12.6, '(y, x) = λ(1, 1)', 'cz-mono', 5);
  T(S, 'e4', 19, 14.2, ['→ x = y = 2, 최댓값 4', '→ x = y = 2, max 4'], 'cz-mono ca-g', 5);
  S.cap(1, '조건(직선) 위에서만 움직일 수 있을 때', 'You may only move along the constraint')
    .cap(2, 'f의 등고선과 겹쳐 보면', 'Overlay the contours of f')
    .cap(3, '조건선을 따라가며 f가 커지다가', 'Moving along the line, f increases')
    .cap(4, '등고선과 접하는 점에서 최대 · 두 그래디언트가 평행', 'and peaks where a contour is tangent: the gradients align')
    .cap(5, 'λ(라그랑주 승수)를 넣고 연립방정식을 풀어요', 'Introduce λ and solve the system');
  return S;
}
function sDouble() {
  const S = scene({ id: 'ca-double', steps: 5, per: 1.35 });
  const cs = [.25, .75, 1.25, 1.75];
  cs.forEach((x, i) => cs.forEach((y, j) => { const v = x + y; cell(S, `c${i}_${j}`, 2 + i * 3.2, 2.6 + (3 - j) * 3.2, v.toFixed(1), { w: 3, h: 3, cls: 'cz-c ca-s', s: { background: `color-mix(in srgb,var(--accent) ${Math.round(12 + v * 18)}%,var(--ui))`, 'border-color': 'transparent' } }); }));
  T(S, 'gx', 2, 15.6, ['x: 0 → 2', 'x: 0 → 2'], 'cz-mono ca-s'); T(S, 'gy', 2, 1.2, ['y: 0 → 2 · 칸 값 = f(x, y) = x + y', 'y: 0 → 2 · cell = f(x, y) = x + y'], 'cz-mono ca-s');
  cs.forEach((x, i) => { S.el('col' + i, { x: 1.9 + i * 3.2, y: 2.5, w: 3.2, h: 12.9, css: 'border:.16em solid var(--warn);border-radius:.3em;z-index:4', s: hid() }); S.set('col' + i, 2, { opacity: '1' }).set('col' + i, 4, { opacity: '0' }); pill(S, 'A' + i, 2 + i * 3.2, 16.4, (2 * x + 2).toFixed(1), { w: 3, h: 1.8, s: hid(C.cmp) }); S.set('A' + i, 2, { opacity: '1' }); });
  cs.forEach((y, j) => { S.el('row' + j, { x: 1.9, y: 2.5 + (3 - j) * 3.2, w: 12.9, h: 3.2, css: 'border:.16em solid var(--ok);border-radius:.3em;z-index:4', s: hid() }); S.set('row' + j, 4, { opacity: '1' }); });
  T(S, 'e0', 16.6, 1.8, 'R = [0,2]²: ∬ (x + y) dA', 'cz-mono ca-b');
  T(S, 'e1', 16.6, 4.4, ['안쪽: y로 먼저 적분', 'inner: integrate in y'], '', 2); T(S, 'e2', 16.6, 5.8, 'A(x) = ∫₀² (x + y) dy = 2x + 2', 'cz-mono', 2);
  T(S, 'e3', 16.6, 8.4, ['바깥: x로 적분', 'outer: integrate in x'], '', 3); T(S, 'e4', 16.6, 9.8, '∫₀² (2x + 2) dx = 8', 'cz-mono ca-big ca-g', 3);
  T(S, 'e5', 16.6, 12.8, ['순서를 바꿔도 8 (푸비니)', 'swap the order: still 8 (Fubini)'], 'ca-g', 4);
  T(S, 'e6', 16.6, 15, ['칸 합 × 칸 넓이 0.25', 'cell sum × cell area 0.25'], 'ca-s', 5); T(S, 'e7', 16.6, 16.4, '= 32 × 0.25 = 8', 'cz-mono', 5);
  S.cap(1, '영역을 작은 칸으로 나누고 각 칸의 높이 f를 보면', 'Split the region into cells, each with height f')
    .cap(2, '한 줄씩 y로 적분해 단면적 A(x)를 만들고', 'Integrate each strip in y to get a cross-section A(x)')
    .cap(3, '그걸 다시 x로 적분하면 부피', 'then integrate A(x) in x for the volume')
    .cap(4, '연속함수면 적분 순서를 바꿔도 같아요', 'For continuous f the order doesn’t matter')
    .cap(5, '이중적분 = 칸(높이 × 넓이) 합의 극한', 'A double integral is the limit of height × area sums');
  return S;
}
function sPolarInt() {
  const S = scene({ id: 'ca-polarint', steps: 5, per: 1.3 });
  const cx = 10, cy = 10.6, k = 2;
  [1, 2, 3, 4].forEach(r => S.el('c' + r, { x: cx - r * k, y: cy - r * k, w: 2 * r * k, h: 2 * r * k, css: 'border-radius:50%;border:.1em solid var(--ink-3)' }));
  for (let a = 0; a < 360; a += 30) { const t = a * Math.PI / 180; seg(S, 'ray' + a, [cx, cy], [cx + 4 * k * Math.cos(t), cy - 4 * k * Math.sin(t)], 0, 'ink-3', .08); }
  const wedge = (key, r1, r2, st, c) => { const pts = []; for (let i = 0; i <= 8; i++) { const t = (30 + 30 * i / 8) * Math.PI / 180; pts.push([r2 * Math.cos(t), r2 * Math.sin(t)]); } for (let i = 8; i >= 0; i--) { const t = (30 + 30 * i / 8) * Math.PI / 180; pts.push([r1 * Math.cos(t), r1 * Math.sin(t)]); }
    const x0 = cx - 4 * k, y0 = cy - 4 * k; S.el(key, { x: x0, y: y0, w: 8 * k, h: 8 * k, css: `clip-path:polygon(${pts.map(([x, y]) => `${(cx + k * x - x0).toFixed(2)}em ${(cy - k * y - y0).toFixed(2)}em`).join(',')});background:${tint(c, 70)}`, s: hid() }); S.set(key, st, { opacity: '1' }); };
  wedge('w1', 1, 1.6, 2, 'accent'); wedge('w2', 3.2, 3.8, 3, 'warn');
  T(S, 'e0', 20, 1.8, 'x = r cos θ, y = r sin θ', 'cz-mono ca-b');
  T(S, 'e1', 20, 4.4, ['작은 칸 넓이', 'a small cell’s area'], '', 2); T(S, 'e2', 20, 5.8, 'ΔA ≈ r · Δr · Δθ', 'cz-mono ca-a', 2);
  T(S, 'e3', 20, 8, ['바깥 칸일수록 넓어요', 'outer cells are larger'], 'ca-w', 3);
  T(S, 'e4', 20, 10.6, 'dA = r dr dθ', 'cz-mono ca-big', 4);
  T(S, 'e5', 20, 13.6, '∬ e^(−x²−y²) dA', 'cz-mono', 5); T(S, 'e6', 20, 15, '= ∫∫ e^(−r²) r dr dθ = π', 'cz-mono ca-s', 5);
  T(S, 'e7', 20, 16.6, ['→ ∫ e^(−x²) dx = √π', '→ ∫ e^(−x²) dx = √π'], 'cz-mono ca-g', 5);
  S.cap(1, '원·부채꼴 모양 영역은 극좌표 격자로 나누면 편해요', 'Circular regions split neatly on a polar grid')
    .cap(2, '칸 하나의 넓이는 r · Δr · Δθ', 'Each cell has area r · Δr · Δθ')
    .cap(3, '같은 Δr, Δθ라도 바깥 칸이 더 넓어서', 'Same Δr and Δθ, yet outer cells are bigger')
    .cap(4, '넓이 요소에 r이 붙어요', 'so the area element carries an r')
    .cap(5, '가우스 적분도 이 변환으로 풀려요', 'This is how the Gaussian integral is solved');
  return S;
}
function sJacobian() {
  const S = scene({ id: 'ca-jacobian', steps: 5, per: 1.35 });
  for (let i = 0; i <= 2; i++) { hl(S, 'gh' + i, 2.4, 9.6, 15 - i * 3, 'line'); vl(S, 'gv' + i, 3 + i * 3, 8.4, 15.6, 'line'); }
  rect(S, 'sq', 3, 12, 3, 3, 'accent', 45, 0, { r: 0, css: 'border:.14em solid var(--accent)' });
  T(S, 'ul', 9.8, 14.6, 'u', 'cz-mono ca-b'); T(S, 'vl', 2.6, 7, 'v', 'cz-mono ca-b'); T(S, 'a1', 3, 16, ['넓이 1', 'area 1'], 'ca-s');
  ar(S, 'map', [10.6, 11], [15.4, 11], 'ink-2', 2); T(S, 'mt', 10.6, 8, 'x = 2u + v', 'cz-mono ca-s', 2); T(S, 'mt2', 10.6, 9.2, 'y = u + 2v', 'cz-mono ca-s', 2);
  hl(S, 'xa', 17, 30, 17, 'ink-3'); vl(S, 'ya', 17, 4, 17, 'ink-3'); T(S, 'xl', 29.6, 17.3, 'x', 'cz-mono'); T(S, 'yl', 17.4, 3.6, 'y', 'cz-mono');
  S.el('pg', { x: 17, y: 8, w: 9, h: 9, css: `clip-path:polygon(0em 9em,6em 6em,9em 0em,3em 3em);background:${tint('warn', 55)}`, s: hid() }); S.set('pg', 3, { opacity: '1' });
  T(S, 'a3', 19.4, 11.6, ['넓이 3', 'area 3'], 'ca-b cz-tc', 3, { w: 4 });
  T(S, 'J', 1, 18.4, 'J = |∂(x,y)/∂(u,v)| = |2·2 − 1·1| = 3', 'cz-mono ca-b', 4);
  T(S, 'J2', 1, 19.8, ['극좌표: |J| = r → dA = r dr dθ', 'polar: |J| = r → dA = r dr dθ'], 'cz-mono', 5);
  S.cap(1, '(u, v) 평면의 넓이 1인 정사각형이', 'A unit square in the (u, v) plane')
    .cap(2, '변수변환으로', 'is mapped by the change of variables')
    .cap(3, '넓이 3인 평행사변형이 돼요', 'to a parallelogram of area 3')
    .cap(4, '넓이가 늘어나는 비율이 야코비안 행렬식', 'The area scale factor is the Jacobian determinant')
    .cap(5, 'dA = |J| du dv · 극좌표의 r도 여기서 나와요', 'dA = |J| du dv, which is where polar’s r comes from');
  return S;
}

/* ---------- vector calculus ---------- */
function sCurve() {
  const S = scene({ id: 'ca-curve', steps: 5, per: 1.3 });
  const cx = 11, cy = 10.5, k = 3, P = t => [cx + k * 3 * Math.cos(t), cy - k * 2 * Math.sin(t)];
  hl(S, 'ax', 1, 21, cy, 'ink-3'); vl(S, 'ay', cx, 3, 18, 'ink-3');
  pplot(S, 'c', P, 0, 2 * Math.PI, { n: 56, h: .2, color: 'ink-2' });
  const TS = [.4, 1.3, 2.4, 3.5];
  TS.forEach((t, i) => { const [x, y] = P(t), v = [-3 * Math.sin(t), 2 * Math.cos(t)], a = [-3 * Math.cos(t), -2 * Math.sin(t)]; const st = i + 1;
    ar(S, 'v' + i, [x, y], [x + 1.3 * v[0], y - 1.3 * v[1]], 'accent', st, { off: st < 4 ? st + 1 : 0, h: .18 }); ar(S, 'a' + i, [x, y], [x + 1.3 * a[0], y - 1.3 * a[1]], 'warn', st, { off: st < 4 ? st + 1 : 0, h: .18 }); });
  pt(S, 'p', ...P(TS[0]), 1, C.cur, .45); TS.forEach((t, i) => { if (i) { const [x, y] = P(t); S.move('p', i + 1, x - .45, y - .45); } });
  T(S, 'e0', 21.4, 1.8, 'r(t) = (3cos t, 2sin t)', 'cz-mono ca-b');
  T(S, 'e1', 21.4, 4, ["v = r′(t) · 접선 방향", "v = r′(t) · tangent"], 'cz-mono ca-a ca-s', 1);
  T(S, 'e2', 21.4, 5.6, ["a = r″(t) · 안쪽으로", "a = r″(t) · inward"], 'cz-mono ca-w ca-s', 1);
  T(S, 'e3', 21.4, 8.6, ['곡률', 'curvature'], 'ca-b', 5); T(S, 'e4', 21.4, 10, "κ = |r′ × r″| / |r′|³", 'cz-mono', 5);
  T(S, 'e5', 21.4, 12, 'κ(0) = 6/8 = 0.75', 'cz-mono ca-s', 5); T(S, 'e6', 21.4, 13.4, 'κ(π/2) = 6/27 ≈ 0.22', 'cz-mono ca-s', 5);
  T(S, 'e7', 21.4, 15.4, ['호의 길이 ∫|r′(t)| dt', 'arc length ∫|r′(t)| dt'], 'ca-s', 5);
  S.cap(1, '매개변수 곡선 위를 움직이는 점의 속도는 접선 방향', 'Velocity points along the tangent')
    .cap(2, '가속도는 곡선이 휘는 안쪽을 향해요', 'acceleration points into the bend')
    .cap(4, '같은 속력이라도 휘는 정도에 따라 가속도가 달라요', 'How sharply it bends changes the acceleration')
    .cap(5, '곡률 κ: 끝부분은 뾰족(0.75), 옆은 완만(0.22)', 'Curvature κ: sharp at the tips, gentle at the sides');
  return S;
}
function sVecField() {
  const S = scene({ id: 'ca-vecfield', steps: 4, per: 1.5 });
  const cx = 10.5, cy = 10.5, sp = 3.4;
  const field = (key, Fv, st, off, c) => { for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { if (!i && !j) continue; const [fx, fy] = Fv(i, j), x = cx + i * sp, y = cy - j * sp; ar(S, `${key}${i + 2}${j + 2}`, [x, y], [x + .5 * fx, y - .5 * fy], c, st, { off, h: .13 }); } };
  field('r', (x, y) => [-y, x], 1, 3, 'accent'); field('s', (x, y) => [x, y], 3, 0, 'warn');
  S.el('orb', { x: cx - 1.5 * sp, y: cy - 1.5 * sp, w: 3 * sp, h: 3 * sp, css: 'border-radius:50%;border:.16em dashed var(--ok)', s: hid() }); S.set('orb', 2, { opacity: '1' }).set('orb', 3, { opacity: '0' });
  S.el('orw', { x: cx - 1.5 * sp, y: cy - 1.5 * sp, w: 3 * sp, h: 3 * sp, cls: 'ca-orw', html: '<b class="ca-orb"></b>', css: 'transform-origin:50% 50%;z-index:4', s: hid({ transform: 'rotate(0deg)' }) }); S.set('orw', 2, { opacity: '1', transform: 'rotate(-200deg)' }).set('orw', 3, { opacity: '0' });
  pt(S, 'pb', cx + .5 * sp, cy - .5 * sp, 3, C.okf, .5); S.move('pb', 4, cx + 1.9 * sp - .5, cy - 1.9 * sp - .5);
  T(S, 'e0', 21.4, 1.8, ['벡터장 F(x, y)', 'vector field F(x, y)'], 'ca-b');
  T(S, 'e1', 21.4, 4.4, 'F = (−y, x)', 'cz-mono ca-a', 1); T(S, 'e2', 21.4, 5.8, ['원점 둘레로 회전', 'swirls around 0'], '', 1);
  T(S, 'e3', 21.4, 9, 'F = (x, y)', 'cz-mono ca-w', 3); T(S, 'e4', 21.4, 10.4, ['바깥으로 퍼짐', 'spreads outward'], '', 3);
  T(S, 'e5', 21.4, 13.6, ['예: 바람, 물의 흐름,', 'e.g. wind, water flow,'], 'ca-s', 4); T(S, 'e6', 21.4, 15, ['전기장, ∇f', 'electric fields, ∇f'], 'ca-s', 4);
  S.cap(1, '공간의 모든 점에 화살표(벡터)를 하나씩 붙인 것', 'An arrow attached to every point in space')
    .cap(2, '입자는 화살표를 따라 흘러가요', 'A particle drifts along the arrows')
    .cap(3, '장의 모양이 바뀌면 흐름도 달라져요', 'Change the field and the flow changes')
    .cap(4, '선적분·발산·회전은 모두 벡터장에 대한 계산이에요', 'Line integrals, divergence and curl all act on fields');
  return S;
}
function sLineInt() {
  const S = scene({ id: 'ca-lineint', steps: 5, per: 1.3 });
  const X = x => 3 + 13 * x, Y = y => 17.5 - 13 * y;
  for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) { const x = i / 4, y = j / 4; ar(S, `f${i}${j}`, [X(x), Y(y)], [X(x + .1 * y), Y(y + .1 * x)], 'line', 0, { h: .1 }); }
  hl(S, 'ax', 2.4, 17.4, Y(0), 'ink-3'); vl(S, 'ay', X(0), 3.6, 18.2, 'ink-3');
  const pts = []; for (let i = 0; i <= 20; i++) { const t = i / 20; pts.push([X(t), Y(t * t)]); }
  poly(S, 'c', pts, { st: i => Math.min(4, Math.ceil(i / 5)), color: 'ok', h: .26 });
  [.25, .5, .75, 1].forEach((t, i) => { const st = i + 1, [x, y] = [X(t), Y(t * t)]; ar(S, 'F' + i, [x, y], [X(t + .22 * t * t), Y(t * t + .22 * t)], 'accent', st, { off: st < 4 ? st + 1 : 0, h: .18 }); ar(S, 'T' + i, [x, y], [X(t + .12), Y(t * t + .24 * t)], 'warn', st, { off: st < 4 ? st + 1 : 0, h: .16 }); });
  pt(S, 'p', X(.25), Y(.0625), 1, C.okf, .4); [[2, .5], [3, .75], [4, 1]].forEach(([st, t]) => S.move('p', st, X(t) - .4, Y(t * t) - .4));
  T(S, 'e0', 19.4, 1.8, 'W = ∫_C F · dr', 'cz-mono ca-b');
  T(S, 'e1', 19.4, 3.4, ['F = (y, x) · 파랑', 'F = (y, x) · blue'], 'cz-mono ca-a ca-s'); T(S, 'e2', 19.4, 4.8, ['r(t) = (t, t²) · 주황 = 진행 방향', 'r(t) = (t, t²) · orange = direction'], 'cz-mono ca-w ca-s');
  S.label('wv', { cls: 'cz-t cz-mono ca-l ca-g', x: 19.4, y: 7.4, w: 12 }, [[0, ''], [1, 'W(0.25) ≈ 0.016'], [2, 'W(0.5) = 0.125'], [3, 'W(0.75) ≈ 0.42'], [4, 'W(1) = 1']]);
  T(S, 'e3', 19.4, 10.6, '= ∫₀¹ (t²·1 + t·2t) dt', 'cz-mono ca-s', 5); T(S, 'e4', 19.4, 12, '= ∫₀¹ 3t² dt = 1', 'cz-mono ca-b', 5);
  S.cap(1, '경로를 따라가며 힘 F와 진행 방향이 얼마나 같은지(내적)를', 'Along the path, measure how much F points the way you move')
    .cap(2, '조금씩 더해 나가요', 'and keep adding it up')
    .cap(4, '끝까지 더한 값이 한 일 W', 'The total is the work W')
    .cap(5, 'r(t)로 매개화해서 t에 대한 보통 적분으로 바꿔요', 'Parametrize with r(t) to get an ordinary integral in t');
  return S;
}
function sConservative() {
  const S = scene({ id: 'ca-conservative', steps: 5, per: 1.3 });
  const X = x => 3 + 13 * x, Y = y => 17.5 - 13 * y;
  [.15, .4, .7].forEach((c, i) => { const pts = []; for (let k = 0; k <= 16; k++) { const x = c + (1.2 - c) * k / 16; pts.push(x <= 1.25 && c / x <= 1.25 ? [X(x), Y(c / x)] : null); } poly(S, 'h' + i + '_', pts, { color: 'line', h: .1 }); });
  hl(S, 'ax', 2.4, 19, Y(0), 'ink-3'); vl(S, 'ay', X(0), 2.4, 18.2, 'ink-3');
  pt(S, 'A', X(0), Y(0)); pt(S, 'B', X(1), Y(1)); T(S, 'tA', X(0) - 1.2, Y(0) + .2, 'A', 'cz-mono ca-b'); T(S, 'tB', X(1) + .5, Y(1) - .6, 'B', 'cz-mono ca-b');
  seg(S, 'p1', [X(0), Y(0)], [X(1), Y(1)], 1, 'accent', .24);
  seg(S, 'p2a', [X(0), Y(0)], [X(1), Y(0)], 2, 'warn', .24); seg(S, 'p2b', [X(1), Y(0)], [X(1), Y(1)], 2, 'warn', .24);
  const c3 = []; for (let i = 0; i <= 16; i++) { const t = i / 16; c3.push([X(t), Y(t ** 3)]); } poly(S, 'p3', c3, { st: 3, color: 'ok', h: .24 });
  T(S, 'e0', 20.4, 1.8, 'F = (y, x) = ∇(xy)', 'cz-mono ca-b');
  T(S, 'w1', 20.4, 4.4, ['직선: W = 1', 'straight: W = 1'], 'cz-mono ca-a', 1); T(S, 'w2', 20.4, 6, ['꺾은 길: 0 + 1 = 1', 'L-path: 0 + 1 = 1'], 'cz-mono ca-w', 2); T(S, 'w3', 20.4, 7.6, ['y = x³: W = 1', 'y = x³: W = 1'], 'cz-mono ca-g', 3);
  T(S, 'e1', 20.4, 10.4, 'W = φ(B) − φ(A)', 'cz-mono ca-big', 4); T(S, 'e2', 20.4, 12.2, ['φ = xy → 1 − 0', 'φ = xy → 1 − 0'], 'cz-mono', 4);
  T(S, 'e3', 20.4, 14.8, ['판정: ∂Q/∂x = ∂P/∂y', 'test: ∂Q/∂x = ∂P/∂y'], 'cz-mono ca-s', 5); T(S, 'e4', 20.4, 16.2, ['닫힌 경로면 W = 0', 'closed loop: W = 0'], 'ca-s', 5);
  S.cap(1, '퍼텐셜 φ의 그래디언트인 장(보존장)에서는', 'In a gradient (conservative) field')
    .cap(2, '어떤 길로 가도', 'any path')
    .cap(3, '한 일이 같아요', 'does the same work')
    .cap(4, '시작·끝의 퍼텐셜 차이만 중요 (선적분의 기본 정리)', 'Only the potential at the ends matters')
    .cap(5, '중력·정전기력이 보존력 · 마찰력은 아니에요', 'Gravity and electrostatics are conservative; friction is not');
  return S;
}
function sDivCurl() {
  const S = scene({ id: 'ca-divcurl', steps: 5, per: 1.3 });
  const P = [[1, (x, y) => [x, y], ['발산 > 0 (원천)', 'div > 0 (source)'], 'div F = 2', 'warn'], [11.4, (x, y) => [-x, -y], ['발산 < 0 (흡수)', 'div < 0 (sink)'], 'div F = −2', 'accent'], [21.8, (x, y) => [-y, x], ['회전 ≠ 0', 'curl ≠ 0'], 'curl F = 2', 'ok']];
  P.forEach(([px, Fv, t, v, c], p) => {
    const cx = px + 4.7, cy = 8.4, sp = 2.6;
    S.el('bg' + p, { x: px, y: 1.4, w: 9.4, h: 15, css: 'border-radius:.8em;background:color-mix(in srgb,var(--line) 40%,transparent)', s: hid() }); S.set('bg' + p, p + 1, { opacity: '1' });
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { if (!i && !j) continue; const [fx, fy] = Fv(i, j), x = cx + i * sp, y = cy - j * sp; ar(S, `a${p}${i + 1}${j + 1}`, [x, y], [x + .6 * fx, y - .6 * fy], c, p + 1, { h: .14 }); }
    if (p < 2) { S.el('ci' + p, { x: cx - 1.4, y: cy - 1.4, w: 2.8, h: 2.8, css: `border-radius:50%;border:.14em dashed var(--${c})`, s: hid({ transform: p ? 'scale(1.3)' : 'scale(.7)' }) }); S.set('ci' + p, p + 1, { opacity: '1' }).set('ci' + p, Math.min(p + 2, 4), { transform: p ? 'scale(.7)' : 'scale(1.3)' }); }
    else { node(S, 'pw', cx, cy, '', { r: 1, s: hid() }); S.el('ph', { x: cx, y: cy - .1, w: .9, h: .2, css: 'transform-origin:0 50%;z-index:3', s: hid({ transform: 'rotate(0deg)', background: 'var(--ok)' }) }); S.set('pw', 3, { opacity: '1' }).set('ph', 3, { opacity: '1' }).set('ph', 4, { transform: 'rotate(-180deg)' }).set('ph', 5, { transform: 'rotate(-360deg)' }); }
    T(S, 't' + p, px + .4, 1.8, t, 'ca-b ca-s', p + 1); T(S, 'v' + p, px + .4, 14.4, v, 'cz-mono ca-b', p + 1);
  });
  T(S, 'f1', 1, 17.4, 'div F = ∂P/∂x + ∂Q/∂y', 'cz-mono ca-b', 4); T(S, 'f2', 16.6, 17.4, 'curl F = ∂Q/∂x − ∂P/∂y', 'cz-mono ca-b', 4);
  T(S, 'f3', 1, 19, ['3차원: div F = ∇ · F, curl F = ∇ × F', '3D: div F = ∇ · F, curl F = ∇ × F'], 'cz-mono ca-s', 5);
  S.cap(1, '한 점에서 흘러 나가는 양이 많으면 발산이 양수', 'More flowing out than in: positive divergence')
    .cap(2, '빨려 들어가면 음수', 'flowing in: negative')
    .cap(3, '작은 물레방아를 돌리는 정도가 회전(curl)', 'How fast a tiny paddle wheel spins is the curl')
    .cap(4, '편미분으로 계산해요', 'Both are computed from partial derivatives')
    .cap(5, '발산 정리·스토크스 정리의 재료예요', 'They feed the divergence and Stokes theorems');
  return S;
}
function sGreen() {
  const S = scene({ id: 'ca-green', steps: 5, per: 1.3 });
  rect(S, 'D', 4, 4, 12, 12, 'accent', 12, 0, { r: 0 });
  for (let i = 1; i <= 2; i++) { vl(S, 'iv' + i, 4 + i * 4, 4, 16, 'ink-3', 2, { dash: 1 }); hl(S, 'ih' + i, 4, 16, 4 + i * 4, 'ink-3', 2, { dash: 1 }); }
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) T(S, `r${i}${j}`, 4 + i * 4, 4.9 + j * 4, '↺', 'cz-tc ca-big ca-a', 1, { w: 4 });
  ar(S, 'b1', [4, 16], [16, 16], 'ok', 3, { h: .24 }); ar(S, 'b2', [16, 16], [16, 4], 'ok', 3, { h: .24 }); ar(S, 'b3', [16, 4], [4, 4], 'ok', 3, { h: .24 }); ar(S, 'b4', [4, 4], [4, 16], 'ok', 3, { h: .24 });
  T(S, 'tD', 13.6, 14.4, 'D', 'cz-mono ca-b'); T(S, 'tC', 16.6, 9.4, 'C', 'cz-mono ca-g', 3);
  T(S, 'n2', 4, 17, ['안쪽 경계는 양쪽에서 반대로 돌아 상쇄', 'inner edges cancel in pairs'], 'ca-s', 2);
  T(S, 'e0', 18.6, 2, '∮_C P dx + Q dy', 'cz-mono ca-b', 4); T(S, 'e1', 18.6, 3.6, '= ∬_D (∂Q/∂x − ∂P/∂y) dA', 'cz-mono ca-b', 4);
  T(S, 'e2', 18.6, 7, ['경계를 도는 양 =', 'circulation on the boundary ='], 'ca-s', 4); T(S, 'e3', 18.6, 8.4, ['안쪽 회전(curl)의 합', 'sum of curl inside'], 'ca-s ca-a', 4);
  T(S, 'e4', 18.6, 11.4, ['넓이 공식', 'area formula'], 'ca-b', 5); T(S, 'e5', 18.6, 12.8, 'A = ½∮(x dy − y dx)', 'cz-mono', 5);
  T(S, 'e6', 18.6, 14.6, ['반시계 방향이 양의 방향', 'counterclockwise is positive'], 'ca-s', 5);
  S.cap(1, '영역을 작은 칸으로 나누면 칸마다 조금씩 회전(curl)이 있어요', 'Cut the region into cells, each with a little curl')
    .cap(2, '이웃 칸이 맞닿은 변에서는 서로 반대로 돌아 사라지고', 'Shared edges are traversed both ways and cancel')
    .cap(3, '바깥 경계만 남아요', 'leaving only the outer boundary')
    .cap(4, '경계 선적분 = 영역의 회전 적분 (그린 정리)', 'Boundary line integral = double integral of curl')
    .cap(5, '선적분과 이중적분을 서로 바꿔 계산할 수 있어요', 'Swap a line integral for a double integral, or back');
  return S;
}
function sFlux() {
  const S = scene({ id: 'ca-flux', steps: 4, per: 1.5 });
  for (let j = 0; j < 5; j++) ar(S, 'f' + j, [2, 3 + j * 3.5], [19.4, 3 + j * 3.5], 'ink-3', 0, { h: .12 });
  const O = [[[14, 7.75], [14, 15.75], [17.2, 11.75]], [[11.17, 14.58], [16.83, 8.92], [16.26, 14.01]], [[10, 11.75], [18, 11.75], [14, 8.55]]];
  O.forEach(([a, b, n], i) => { const st = i + 1; seg(S, 's' + i, a, b, st, 'warn', .5); if (i < 2) S.set('s' + i, st + 1, { opacity: '0' }); ar(S, 'n' + i, [14, 11.75], n, 'accent', st, { off: i < 2 ? st + 1 : 0, h: .2 }); });
  T(S, 'e0', 21.4, 1.8, 'Φ = ∬_S F · n dS', 'cz-mono ca-b');
  S.label('th', { cls: 'cz-t cz-mono ca-l', x: 21.4, y: 4.6, w: 10 }, [[0, ''], [1, ['θ = 0° → Φ 최대', 'θ = 0° → max Φ']], [2, 'θ = 45° → × 0.71'], [3, 'θ = 90° → Φ = 0']]);
  T(S, 'e1', 21.4, 7.6, ['n: 면의 단위 법선', 'n: unit normal'], 'ca-a ca-s');
  T(S, 'e2', 21.4, 10, ['평평한 면이면', 'for a flat patch'], '', 4); T(S, 'e3', 21.4, 11.4, 'Φ = |F|·A·cos θ', 'cz-mono ca-b', 4);
  T(S, 'e4', 21.4, 14, ['곡면은 r(u, v)로 매개화', 'parametrize curved S by r(u, v)'], 'ca-s', 4); T(S, 'e5', 21.4, 15.4, 'dS = |r_u × r_v| du dv', 'cz-mono ca-s', 4);
  S.cap(1, '흐름에 수직으로 막으면 가장 많이 통과하고', 'A surface facing the flow catches the most')
    .cap(2, '기울이면 cos θ만큼 줄고', 'tilted, it catches cos θ as much')
    .cap(3, '나란하면 하나도 통과하지 않아요', 'edge-on, it catches nothing')
    .cap(4, '면을 지나는 흐름의 양 = 플럭스 (면적분)', 'That amount is the flux, a surface integral');
  return S;
}
function sDivThm() {
  const S = scene({ id: 'ca-divthm', steps: 4, per: 1.5 });
  const cx = 10.5, cy = 10.5, R = 7;
  S.el('ball', { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, css: 'border-radius:50%;border:.18em solid var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent)' });
  [[-2.5, -2], [2, -2.6], [0, 1], [-3, 2.4], [3, 2.2], [.6, -4.2]].forEach(([x, y], i) => { pt(S, 's' + i, cx + x, cy + y, 1, C.okf, .35); [0, 90, 180, 270].forEach(a => { const t = a * Math.PI / 180; ar(S, `sa${i}_${a}`, [cx + x + .5 * Math.cos(t), cy + y - .5 * Math.sin(t)], [cx + x + 1.3 * Math.cos(t), cy + y - 1.3 * Math.sin(t)], 'ok', 1, { h: .1 }); }); });
  for (let a = 0; a < 360; a += 30) { const t = a * Math.PI / 180; ar(S, 'o' + a, [cx + R * Math.cos(t), cy - R * Math.sin(t)], [cx + (R + 1.8) * Math.cos(t), cy - (R + 1.8) * Math.sin(t)], 'warn', 2, { h: .16 }); }
  T(S, 'e0', 20.6, 1.8, ['안: 발산의 합', 'inside: total divergence'], 'ca-g ca-b', 1); T(S, 'e0b', 20.6, 3.2, '∭_V div F dV', 'cz-mono', 1);
  T(S, 'e1', 20.6, 5.8, ['밖: 나가는 플럭스', 'boundary: outward flux'], 'ca-w ca-b', 2); T(S, 'e1b', 20.6, 7.2, '∯_S F · n dS', 'cz-mono', 2);
  T(S, 'e2', 20.6, 10, ['둘이 같아요', 'they are equal'], 'ca-big', 3);
  T(S, 'e3', 20.6, 13, ['예: F = (x, y, z)', 'e.g. F = (x, y, z)'], 'cz-mono ca-s', 4); T(S, 'e4', 20.6, 14.4, ['반지름 R인 구', 'sphere of radius R'], 'ca-s', 4);
  T(S, 'e5', 20.6, 15.8, 'div F = 3 → 3·(4/3)πR³ = 4πR³', 'cz-mono ca-s', 4);
  S.cap(1, '닫힌 곡면 안의 작은 원천들이 만들어 낸 양은', 'What sources inside a closed surface produce')
    .cap(2, '결국 표면을 뚫고 밖으로 나가요', 'must eventually leave through the surface')
    .cap(3, '면적분(플럭스) = 부피 적분(발산) · 가우스 발산 정리', 'Flux out = integral of divergence (Gauss’s theorem)')
    .cap(4, '어려운 면적분을 쉬운 부피 적분으로 바꿔요 (가우스 법칙)', 'Turn hard surface integrals into volume ones');
  return S;
}
function sStokes() {
  const S = scene({ id: 'ca-stokes', steps: 5, per: 1.3 });
  const cx = 11, by = 15;
  pplot(S, 'dome', t => [cx + 8 * Math.cos(t), by - 10 * Math.sin(t)], 0, Math.PI, { n: 36, color: 'accent', h: .2 });
  pplot(S, 'back', t => [cx + 8 * Math.cos(t), by - 2 * Math.sin(t)], 0, Math.PI, { n: 24, color: 'ink-3', h: .14 });
  pplot(S, 'front', t => [cx + 8 * Math.cos(t), by + 2 * Math.sin(t)], 0, Math.PI, { n: 24, color: 'ok', h: .24, st: 3 });
  [[0, 0], [1, 1], [1, -1], [2, 0], [2.2, 1.6], [2.2, -1.6]].forEach(([r, s], i) => T(S, 'lp' + i, cx + s * 2.4 - 1, by - 3 - r * 2.6, '↺', 'cz-tc ca-big ca-a', 2, { w: 2 }));
  [[.7, .6], [1.6, 1.5], [2.4, 2.3]].forEach(([a, b], i) => { const P = t => [cx + 8 * Math.cos(t), by + 2 * Math.sin(t)]; ar(S, 'ba' + i, P(Math.PI - a), P(Math.PI - b), 'ok', 3, { h: .26 }); });
  T(S, 'tS', cx - 1, 7.2, 'S', 'cz-mono ca-b ca-a'); T(S, 'tC', cx - 1, by + 2.6, 'C', 'cz-mono ca-b ca-g', 3);
  T(S, 'e0', 20.6, 2, '∮_C F · dr', 'cz-mono ca-b', 4); T(S, 'e1', 20.6, 3.6, '= ∬_S (∇ × F) · n dS', 'cz-mono ca-b', 4);
  T(S, 'e2', 20.6, 6.6, ['경계를 도는 양 =', 'circulation on C ='], 'ca-s', 4); T(S, 'e3', 20.6, 8, ['곡면 위 회전의 합', 'curl summed over S'], 'ca-s ca-a', 4);
  T(S, 'e4', 20.6, 11, ['평평한 S → 그린 정리', 'flat S → Green’s theorem'], 'ca-s', 5);
  T(S, 'e5', 20.6, 12.6, ['경계가 같으면', 'any surface with'], 'ca-s', 5); T(S, 'e6', 20.6, 14, ['어떤 곡면이든 결과 같음', 'the same boundary works'], 'ca-s', 5);
  S.cap(1, '경계 C를 가진 곡면 S가 있을 때', 'Take a surface S with boundary curve C')
    .cap(2, '곡면을 작은 조각으로 나누면 조각마다 회전이 있고', 'Each small patch carries some curl')
    .cap(3, '안쪽은 상쇄되고 경계를 도는 양만 남아요', 'Interior edges cancel, leaving the boundary circulation')
    .cap(4, '경계 선적분 = 회전의 면적분 (스토크스 정리)', 'Line integral on C = surface integral of curl')
    .cap(5, '그린 정리를 3차원 곡면으로 넓힌 것', 'Green’s theorem, lifted to curved surfaces');
  return S;
}

window.UX = page([
  sec('ca-lim', '극한', 'Limits', '극한과 연속', 'Limits and continuity',
    '미적분학의 모든 정의가 극한 위에 서 있어요.', 'Every definition in calculus rests on limits.', [
    item('ca-limit', '극한', 'Limit', 'x가 a에 한없이 가까워질 때 f(x)가 한없이 가까워지는 값이에요. 그 점에서 함수값이 없어도 극한은 있을 수 있어요.', '0/0 꼴은 인수분해·유리화로 약분해요. 예: lim(x→1) (x²−1)/(x−1) = lim(x→1)(x+1) = 2. 극한 법칙: 합·곱·몫의 극한은 극한의 합·곱·몫 (분모 극한 ≠ 0).', 'The value f(x) approaches as x approaches a; it can exist even where f(a) is undefined.', 'Cancel 0/0 forms by factoring or rationalizing: lim(x→1) (x²−1)/(x−1) = lim(x→1) (x+1) = 2. Limits of sums, products and quotients are the sums, products and quotients of limits (nonzero denominator).', sLimit()),
    item('ca-onesided', '한쪽 극한과 연속', 'One-sided limits and continuity', '왼쪽·오른쪽에서 다가갈 때의 극한이 각각 있어요. 둘이 같아야 극한이 존재하고, 그 값이 f(a)와 같아야 연속이에요.', '연속 조건 3가지: f(a) 정의, lim f(x) 존재, 둘이 같음. 불연속 종류: 제거 가능(구멍), 점프, 무한. 구간별 함수는 경계에서 양쪽 극한을 따로 계산해요.', 'Limits from the left and the right exist separately; the limit exists only if they agree, and f is continuous at a if it also equals f(a).', 'Three conditions: f(a) defined, the limit exists, and they are equal. Discontinuities are removable (holes), jumps or infinite. For piecewise functions compute both sides at each breakpoint.', sOneSided()),
    item('ca-epsdelta', 'ε-δ 정의', 'Epsilon–delta definition', '"한없이 가까워진다"를 엄밀하게 쓴 정의예요. 어떤 ε > 0에 대해서도 0 < |x − a| < δ이면 |f(x) − L| < ε가 되는 δ가 있으면 lim f(x) = L이에요.', '증명 요령: |f(x) − L|을 |x − a|로 묶어 δ를 ε로 표현해요. 예: f(x) = x/2 + 1, L = 2일 때 |f(x) − 2| = |x − 2|/2 < ε → δ = 2ε.', 'The rigorous form of “arbitrarily close”: lim f(x) = L if for every ε > 0 there is a δ with 0 < |x − a| < δ ⇒ |f(x) − L| < ε.', 'Proof recipe: bound |f(x) − L| by a multiple of |x − a| and solve for δ. For f(x) = x/2 + 1, |f(x) − 2| = |x − 2|/2 < ε gives δ = 2ε.', sEpsDelta()),
    item('ca-squeeze', '조임 정리', 'Squeeze theorem', 'g(x) ≤ f(x) ≤ h(x)이고 g, h의 극한이 같은 L이면 f의 극한도 L이에요.', '대표 결과: lim(x→0) sin x / x = 1, lim(x→0) (1 − cos x)/x = 0, lim x·sin(1/x) = 0. 진동하는 항은 −1 ≤ sin ≤ 1로 묶어요.', 'If g ≤ f ≤ h near a and g, h share the limit L, then f has limit L too.', 'Key results: lim(x→0) sin x / x = 1, lim(x→0) (1 − cos x)/x = 0, lim x·sin(1/x) = 0. Bound oscillating parts with −1 ≤ sin ≤ 1.', sSqueeze()),
    item('ca-ivt', '중간값 정리', 'Intermediate value theorem', '닫힌 구간에서 연속인 함수는 양 끝값 사이의 모든 값을 반드시 한 번 이상 지나요.', 'f(a)·f(b) < 0이면 (a, b)에 근이 있어요. 예: f(x) = x³ − x − 1은 f(1) = −1, f(2) = 5라서 1과 2 사이에 근이 있어요. 최대·최소 정리와 짝으로 나와요.', 'A function continuous on [a, b] takes every value between f(a) and f(b).', 'If f(a)·f(b) < 0 there is a root in (a, b): x³ − x − 1 has f(1) = −1 and f(2) = 5, so a root lies between. Often paired with the extreme value theorem.', sIVT())
  ]),
  sec('ca-diff', '미분', 'Derivatives', '미분과 응용', 'Derivatives and applications',
    '순간 변화율을 구하고 그래프의 모양과 최적값을 알아내요.', 'Instantaneous rates of change, curve shapes and optimization.', [
    item('ca-derivative', '미분계수와 도함수', 'The derivative', '할선의 기울기에서 h → 0으로 보낸 극한, 즉 접선의 기울기예요. f′(a) = lim(h→0) (f(a + h) − f(a))/h.', '기본 공식: (xⁿ)′ = nxⁿ⁻¹, (eˣ)′ = eˣ, (ln x)′ = 1/x, (sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec²x. 미분 가능하면 연속이지만 역은 아니에요 (|x|는 0에서 미분 불가).', 'The limit of secant slopes as h → 0: the tangent’s slope. f′(a) = lim(h→0) (f(a + h) − f(a))/h.', 'Core rules: (xⁿ)′ = nxⁿ⁻¹, (eˣ)′ = eˣ, (ln x)′ = 1/x, (sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec²x. Differentiable implies continuous, not conversely (|x| at 0).', sDeriv()),
    item('ca-product', '곱과 몫의 미분', 'Product and quotient rules', '(fg)′ = f′g + fg′. 곱을 직사각형 넓이로 보면 두 변이 늘 때 늘어나는 넓이가 바로 이 두 항이에요.', '(f/g)′ = (f′g − fg′)/g². 예: (x² sin x)′ = 2x sin x + x² cos x, (tan x)′ = (sin x/cos x)′ = sec²x. 세 개의 곱은 (fgh)′ = f′gh + fg′h + fgh′.', '(fg)′ = f′g + fg′: viewing fg as a rectangle, these are the two strips added when each side grows.', '(f/g)′ = (f′g − fg′)/g². e.g. (x² sin x)′ = 2x sin x + x² cos x; (tan x)′ = sec²x. For three factors, (fgh)′ = f′gh + fg′h + fgh′.', sProduct()),
    item('ca-chain', '연쇄 법칙', 'Chain rule', '합성함수 y = f(g(x))의 도함수는 dy/dx = f′(g(x))·g′(x), 즉 각 단계 변화율의 곱이에요.', '예: ((3x + 1)²)′ = 6(3x + 1), (sin x²)′ = 2x cos x², (e^(−x²))′ = −2x e^(−x²). 역함수 미분: (f⁻¹)′(y) = 1/f′(x). 신경망 역전파가 연쇄 법칙이에요.', 'For y = f(g(x)), dy/dx = f′(g(x))·g′(x): the product of each stage’s rate.', 'e.g. ((3x + 1)²)′ = 6(3x + 1), (sin x²)′ = 2x cos x², (e^(−x²))′ = −2x e^(−x²). Inverse functions: (f⁻¹)′(y) = 1/f′(x). Backpropagation is the chain rule.', sChain()),
    item('ca-implicit', '음함수 미분', 'Implicit differentiation', 'y를 x로 풀지 않고, 식 전체를 x로 미분하면서 y가 들어간 항은 연쇄 법칙으로 y′를 붙여요.', '예: x² + y² = 25 → 2x + 2yy′ = 0 → y′ = −x/y. 로그 미분: y = xˣ → ln y = x ln x → y′/y = ln x + 1 → y′ = xˣ(ln x + 1).', 'Differentiate the whole equation in x without solving for y, attaching y′ to y terms via the chain rule.', 'x² + y² = 25 → 2x + 2yy′ = 0 → y′ = −x/y. Logarithmic differentiation: y = xˣ → ln y = x ln x → y′ = xˣ(ln x + 1).', sImplicit()),
    item('ca-related', '관련 변화율', 'Related rates', '여러 양이 관계식으로 묶여 있을 때, 관계식을 시간 t로 미분해 한 양의 변화율로 다른 양의 변화율을 구해요.', '풀이 순서: 그림 → 변수 정의 → 관계식 → t로 미분 → 그 순간 값 대입(미분 후에!). 예: 5 m 사다리, x = 3에서 dx/dt = 1이면 dy/dt = −3/4 m/s.', 'When quantities are linked by an equation, differentiate it in time to get one rate from another.', 'Steps: sketch, name variables, write the relation, differentiate in t, then substitute values (after differentiating). 5 m ladder with x = 3, dx/dt = 1 gives dy/dt = −3/4 m/s.', sRelated()),
    item('ca-extrema', '극값과 증감', 'Extrema and monotonicity', 'f′ > 0이면 증가, f′ < 0이면 감소해요. f′ = 0이거나 정의되지 않는 임계점에서 부호가 바뀌면 극값이에요.', '예: f = x³ − 3x, f′ = 3(x − 1)(x + 1) → x = −1 극대 2, x = 1 극소 −2. 닫힌 구간 최댓값·최솟값은 임계점과 양 끝점 값을 모두 비교해요.', 'f′ > 0 means increasing, f′ < 0 decreasing; a sign change at a critical point (f′ = 0 or undefined) marks an extremum.', 'f = x³ − 3x, f′ = 3(x − 1)(x + 1): local max 2 at x = −1, local min −2 at x = 1. On a closed interval compare critical points and endpoints.', sExtrema()),
    item('ca-concavity', '오목·볼록과 변곡점', 'Concavity and inflection', 'f″ > 0이면 아래로 볼록(기울기 증가), f″ < 0이면 위로 볼록이에요. f″의 부호가 바뀌는 점이 변곡점이에요.', '2계도함수 판정: f′(c) = 0이고 f″(c) < 0이면 극대, > 0이면 극소, = 0이면 판정 불가. 그래프 개형은 정의역 → 절편 → 점근선 → 증감 → 오목 순서로 그려요.', 'f″ > 0 means concave up (slope increasing), f″ < 0 concave down; an inflection point is where f″ changes sign.', 'Second-derivative test: f′(c) = 0 with f″(c) < 0 is a max, > 0 a min, = 0 inconclusive. Sketch graphs via domain, intercepts, asymptotes, monotonicity, then concavity.', sConcavity()),
    item('ca-mvt', '평균값 정리', 'Mean value theorem', '[a, b]에서 연속, (a, b)에서 미분 가능하면 f′(c) = (f(b) − f(a))/(b − a)인 c가 있어요. f(a) = f(b)인 경우가 롤의 정리예요.', '예: f = √x, [0, 4]에서 평균 기울기 1/2 = 1/(2√c) → c = 1. 따름 정리: f′ = 0이면 상수, f′ = g′이면 f − g는 상수. 부등식 증명에 자주 써요.', 'If f is continuous on [a, b] and differentiable inside, some c has f′(c) = (f(b) − f(a))/(b − a); Rolle’s theorem is the case f(a) = f(b).', 'f = √x on [0, 4]: average slope 1/2 = 1/(2√c) gives c = 1. Corollaries: f′ = 0 means constant; f′ = g′ means f − g is constant. Handy for proving inequalities.', sMVT()),
    item('ca-lhopital', '로피탈 정리', 'L’Hôpital’s rule', '0/0 또는 ∞/∞ 꼴의 극한은 분자·분모를 각각 미분한 극한과 같아요 (그 극한이 존재할 때).', '예: lim sin x/x = lim cos x/1 = 1, lim ln x/x = lim (1/x)/1 = 0. 0·∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰은 몫이나 ln으로 바꾼 뒤 적용해요. 예: lim(1 + 1/x)ˣ = e.', 'For 0/0 or ∞/∞ forms, the limit equals the limit of the ratio of derivatives, when that exists.', 'lim sin x/x = lim cos x = 1; lim ln x/x = 0. Turn 0·∞, ∞ − ∞, 1^∞, 0⁰ and ∞⁰ into quotients or take logs first: lim (1 + 1/x)ˣ = e.', sLHopital())
  ]),
  sec('ca-int', '적분', 'Integrals', '적분과 응용', 'Integrals and applications',
    '쌓인 양을 구하는 방법과 대표적인 적분 기법이에요.', 'Accumulation, and the main integration techniques.', [
    item('ca-riemann', '리만 합과 정적분', 'Riemann sums', '구간을 잘게 나눠 직사각형 넓이를 더하고, 칸 수를 무한히 늘린 극한이 정적분이에요.', '∫ₐᵇ f dx = lim Σ f(xᵢ*)Δx, Δx = (b − a)/n. 성질: 선형성, 구간 덧셈, f ≤ g이면 ∫f ≤ ∫g. 극한을 정적분으로 바꾸는 문제: lim (1/n)Σ(k/n)² = ∫₀¹ x² dx = 1/3.', 'Add up rectangle areas over a fine partition; the limit as the pieces shrink is the definite integral.', '∫ₐᵇ f dx = lim Σ f(xᵢ*)Δx with Δx = (b − a)/n. Linear, additive over intervals, monotone. Recognise sums as integrals: lim (1/n)Σ(k/n)² = ∫₀¹ x² dx = 1/3.', sRiemann()),
    item('ca-ftc', '미적분학의 기본 정리', 'Fundamental theorem of calculus', '쌓인 넓이 A(x) = ∫ₐˣ f(t)dt를 미분하면 f(x)예요. 그래서 정적분은 원시함수 F의 차 F(b) − F(a)로 계산해요.', '응용: d/dx ∫ₐ^g(x) f(t) dt = f(g(x))·g′(x). 예: d/dx ∫₀^(x²) cos t dt = 2x cos x². 정적분 ∫₁² 2x dx = [x²]₁² = 3.', 'The accumulated area A(x) = ∫ₐˣ f(t)dt has derivative f(x), so ∫ₐᵇ f = F(b) − F(a) for any antiderivative F.', 'With a variable limit: d/dx ∫ₐ^g(x) f(t) dt = f(g(x))·g′(x); e.g. d/dx ∫₀^(x²) cos t dt = 2x cos x². ∫₁² 2x dx = [x²]₁² = 3.', sFTC()),
    item('ca-subst', '치환적분', 'Substitution', '안쪽 함수 u = g(x)와 그 도함수 g′(x)dx가 함께 있으면 u로 바꿔 쉬운 적분으로 만들어요.', '∫f(g(x))g′(x)dx = ∫f(u)du. 예: ∫2x cos x² dx = sin x² + C, ∫x/(x² + 1) dx = ½ln(x² + 1) + C. 정적분은 적분 구간도 u 값으로 바꿔요. 삼각치환: √(a² − x²)엔 x = a sin θ.', 'When an inner function u = g(x) appears with its derivative g′(x)dx, switch to u for an easier integral.', '∫f(g(x))g′(x)dx = ∫f(u)du. ∫2x cos x² dx = sin x² + C; ∫x/(x² + 1) dx = ½ln(x² + 1) + C. Convert the limits for definite integrals. Trig substitution: x = a sin θ for √(a² − x²).', sSubst()),
    item('ca-parts', '부분적분', 'Integration by parts', '곱의 미분을 거꾸로 쓴 공식 ∫u dv = uv − ∫v du예요. 미분하면 단순해지는 쪽을 u로 잡아요.', 'u 고르는 순서 LIATE: 로그 → 역삼각 → 다항 → 삼각 → 지수. 예: ∫x eˣ dx = x eˣ − eˣ + C, ∫ln x dx = x ln x − x + C, ∫eˣ sin x dx는 두 번 적용해 원래 식으로 풀어요. 표 방법(tabular)도 유용.', 'The product rule run backwards: ∫u dv = uv − ∫v du; choose u to simplify under differentiation.', 'Pick u by LIATE: logs, inverse trig, algebraic, trig, exponential. ∫x eˣ dx = x eˣ − eˣ + C; ∫ln x dx = x ln x − x + C; ∫eˣ sin x dx loops back to itself after two passes. Tabular integration helps.', sParts()),
    item('ca-partialfrac', '부분분수 분해', 'Partial fractions', '유리함수를 간단한 분수들의 합으로 나눠 각각을 ln이나 arctan으로 적분해요.', '분자 차수 ≥ 분모 차수면 먼저 나눗셈. 꼴: 1차 인수 → A/(x − a), 중복 → A/(x − a) + B/(x − a)², 기약 2차 → (Ax + B)/(x² + px + q). 예: ∫1/(x² − 1)dx = ½ln|(x − 1)/(x + 1)| + C, ∫1/(x² + 1)dx = arctan x + C.', 'Split a rational function into simple fractions that integrate to logs or arctangents.', 'Divide first if the numerator’s degree is not lower. Forms: A/(x − a); repeated factors add B/(x − a)²; irreducible quadratics take (Ax + B)/(x² + px + q). ∫1/(x² − 1)dx = ½ln|(x − 1)/(x + 1)| + C; ∫1/(x² + 1)dx = arctan x + C.', sPartialFrac()),
    item('ca-improper', '이상적분', 'Improper integrals', '구간이 무한하거나 함수가 발산하는 점이 있는 적분이에요. 유한한 값으로 바꾼 뒤 극한을 취해 수렴·발산을 판정해요.', '∫₁^∞ 1/xᵖ dx는 p > 1이면 1/(p − 1)로 수렴, p ≤ 1이면 발산. ∫₀¹ 1/xᵖ dx는 p < 1이면 수렴. 비교 판정: 0 ≤ f ≤ g이고 ∫g 수렴이면 ∫f 수렴. ∫₀^∞ e^(−x) dx = 1.', 'Integrals over infinite intervals or through blow-ups: integrate to a finite bound, then take the limit.', '∫₁^∞ 1/xᵖ dx converges to 1/(p − 1) iff p > 1; ∫₀¹ 1/xᵖ dx converges iff p < 1. Comparison: 0 ≤ f ≤ g with ∫g finite gives ∫f finite. ∫₀^∞ e^(−x) dx = 1.', sImproper()),
    item('ca-volume', '회전체 부피', 'Volumes of revolution', '영역을 축 둘레로 돌린 입체의 부피를 얇은 원판(또는 원통 껍질)을 쌓아 구해요.', '원판법 V = π∫ f(x)² dx, 와셔법 V = π∫ (R² − r²) dx, 원통껍질법 V = 2π∫ x f(x) dx (y축 회전). 예: y = √x, 0 ≤ x ≤ 4를 x축 회전 → 8π. 단면적을 아는 입체는 V = ∫A(x)dx.', 'Build a solid of revolution from thin disks (or cylindrical shells) and add their volumes.', 'Disks V = π∫ f(x)² dx, washers V = π∫ (R² − r²) dx, shells V = 2π∫ x f(x) dx (about the y-axis). y = √x on [0, 4] about the x-axis gives 8π. Known cross-sections: V = ∫A(x)dx.', sVolume()),
    item('ca-polar', '극좌표와 넓이', 'Polar coordinates and area', '점을 원점까지의 거리 r과 각 θ로 나타내요. 넓이는 얇은 부채꼴 ½r²dθ를 더해서 구해요.', 'x = r cos θ, y = r sin θ, r² = x² + y². 넓이 A = ½∫ r² dθ, 곡선 길이 L = ∫√(r² + (dr/dθ)²) dθ. 예: 심장형 r = 1 + cos θ의 넓이는 3π/2. 매개곡선 길이 L = ∫√(x′² + y′²) dt.', 'Locate points by distance r and angle θ; area adds thin wedges ½r²dθ.', 'x = r cos θ, y = r sin θ, r² = x² + y². Area ½∫ r² dθ; length ∫√(r² + (dr/dθ)²) dθ. The cardioid r = 1 + cos θ has area 3π/2. Parametric length ∫√(x′² + y′²) dt.', sPolar())
  ]),
  sec('ca-ser', '급수', 'Series', '수열과 급수', 'Sequences and series',
    '무한히 많은 항의 합이 언제 유한한지, 함수를 다항식으로 어떻게 펼치는지예요.', 'When infinite sums are finite, and how functions unfold into polynomials.', [
    item('ca-geometric', '등비급수', 'Geometric series', '공비 r인 등비수열의 합 a + ar + ar² + …은 |r| < 1이면 a/(1 − r)로 수렴하고, 아니면 발산해요.', '부분합 Sₙ = a(1 − rⁿ)/(1 − r). 예: Σ(1/2)ⁿ (n ≥ 1) = 1, 0.999… = 1, Σ(−1/3)ⁿ (n ≥ 0) = 3/4. 망원급수 Σ 1/(n(n + 1)) = Σ(1/n − 1/(n + 1)) = 1도 함께 알아 두세요.', 'a + ar + ar² + … converges to a/(1 − r) when |r| < 1 and diverges otherwise.', 'Partial sums Sₙ = a(1 − rⁿ)/(1 − r). Σ(1/2)ⁿ from n = 1 is 1; 0.999… = 1; Σ(−1/3)ⁿ from 0 is 3/4. Telescoping: Σ 1/(n(n + 1)) = 1.', sGeometric()),
    item('ca-tests', '수렴 판정법', 'Convergence tests', '급수의 수렴 여부를 직접 합하지 않고 판정하는 방법들이에요. 먼저 aₙ → 0인지(발산 판정) 확인해요.', '비교·극한비교, 비 판정(|aₙ₊₁/aₙ| → L), 근 판정(ⁿ√|aₙ| → L): L < 1 수렴, L > 1 발산, L = 1 불명. 적분 판정, p급수(p > 1 수렴), 교대급수(|aₙ| 감소 → 0이면 수렴). 절대수렴이면 수렴.', 'Ways to decide convergence without summing. First check aₙ → 0 (the divergence test).', 'Comparison and limit comparison; ratio |aₙ₊₁/aₙ| → L and root ⁿ√|aₙ| → L (L < 1 converges, > 1 diverges, = 1 unknown); integral test; p-series (p > 1); alternating series (|aₙ| decreasing to 0). Absolute convergence implies convergence.', sTests()),
    item('ca-power', '거듭제곱급수', 'Power series', 'Σ cₙ(x − a)ⁿ 꼴의 급수예요. 중심 a에서 반지름 R 안에서는 수렴하고 밖에서는 발산해요.', 'R은 비 판정으로: lim|cₙ₊₁/cₙ|·|x − a| < 1. 끝점은 따로 확인. 반경 안에서 항별 미분·적분 가능: 1/(1 − x) = Σxⁿ → 1/(1 − x)² = Σnxⁿ⁻¹, −ln(1 − x) = Σxⁿ/n, arctan x = Σ(−1)ⁿx²ⁿ⁺¹/(2n + 1).', 'A series Σ cₙ(x − a)ⁿ; it converges within radius R of the centre and diverges beyond.', 'Find R with the ratio test, then test the endpoints separately. Inside, differentiate or integrate term by term: from 1/(1 − x) = Σxⁿ get 1/(1 − x)² = Σnxⁿ⁻¹, −ln(1 − x) = Σxⁿ/n, arctan x = Σ(−1)ⁿx²ⁿ⁺¹/(2n + 1).', sPower()),
    item('ca-taylor', '테일러 급수', 'Taylor series', '한 점에서의 도함수 값만으로 함수를 다항식의 무한합으로 펼쳐요. f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!.', '매클로린: eˣ = Σxⁿ/n!, sin x = x − x³/3! + x⁵/5! − …, cos x = 1 − x²/2! + x⁴/4! − …, ln(1 + x) = x − x²/2 + x³/3 − …, (1 + x)ᵏ = Σ(k choose n)xⁿ. 오차는 라그랑주 나머지 f⁽ⁿ⁺¹⁾(c)xⁿ⁺¹/(n + 1)!.', 'Expand a function into an infinite polynomial from its derivatives at one point: f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!.', 'Maclaurin: eˣ = Σxⁿ/n!, sin x = x − x³/3! + …, cos x = 1 − x²/2! + …, ln(1 + x) = x − x²/2 + …, (1 + x)ᵏ = Σ(k choose n)xⁿ. Error bound: Lagrange remainder f⁽ⁿ⁺¹⁾(c)xⁿ⁺¹/(n + 1)!.', sTaylor())
  ]),
  sec('ca-multi', '다변수', 'Multivariable', '다변수 미적분', 'Multivariable calculus',
    '변수가 여럿인 함수의 미분과 적분이에요.', 'Differentiation and integration with several variables.', [
    item('ca-partialderiv', '편미분', 'Partial derivatives', '다른 변수를 상수로 고정하고 한 변수로만 미분해요. 곡면을 한 방향으로 자른 단면의 기울기예요.', '예: f = x²y + sin y → fₓ = 2xy, f_y = x² + cos y. 혼합편미분 fₓᵧ = fᵧₓ (연속이면). 전미분 df = fₓdx + fᵧdy, 다변수 연쇄 법칙 dz/dt = fₓ·dx/dt + fᵧ·dy/dt. 접평면 z − z₀ = fₓ(x − x₀) + fᵧ(y − y₀).', 'Hold the other variables fixed and differentiate in one: the slope of a slice through the surface.', 'f = x²y + sin y gives fₓ = 2xy, f_y = x² + cos y. Mixed partials agree when continuous. Total differential df = fₓdx + fᵧdy; chain rule dz/dt = fₓ·dx/dt + fᵧ·dy/dt; tangent plane z − z₀ = fₓ(x − x₀) + fᵧ(y − y₀).', sPartialD()),
    item('ca-gradient', '그래디언트와 방향도함수', 'Gradient and directional derivative', '∇f = (fₓ, fᵧ, f_z)는 가장 가파르게 증가하는 방향이고 등고선(등위면)에 수직이에요.', '방향도함수 Dᵤf = ∇f·u (u는 단위벡터), 최댓값 |∇f|. 예: f = x² + 2y², (1, 1)에서 ∇f = (2, 4), u = (0.6, 0.8)이면 4.4. 등위면 F = c의 법선은 ∇F → 접평면 ∇F·(r − r₀) = 0.', '∇f = (fₓ, fᵧ, f_z) points in the direction of steepest increase and is perpendicular to level curves.', 'Directional derivative Dᵤf = ∇f·u for unit u, maximized at |∇f|. f = x² + 2y² at (1, 1): ∇f = (2, 4); with u = (0.6, 0.8), Dᵤf = 4.4. The normal to F = c is ∇F, giving the tangent plane ∇F·(r − r₀) = 0.', sGradient()),
    item('ca-saddle', '다변수 극값과 안장점', 'Extrema and saddle points', '∇f = 0인 임계점을 2계 판정 D = fₓₓfᵧᵧ − fₓᵧ²로 극소·극대·안장점으로 나눠요.', 'D > 0, fₓₓ > 0 → 극소 · D > 0, fₓₓ < 0 → 극대 · D < 0 → 안장점 · D = 0 → 판정 불가. 예: f = x² − y²는 원점이 안장점. 닫힌 유계 영역의 최댓값·최솟값은 내부 임계점과 경계를 함께 비교해요.', 'Classify critical points (∇f = 0) with D = fₓₓfᵧᵧ − fₓᵧ²: minimum, maximum or saddle.', 'D > 0 and fₓₓ > 0: min; D > 0 and fₓₓ < 0: max; D < 0: saddle; D = 0: inconclusive. f = x² − y² has a saddle at the origin. On closed bounded regions compare interior critical points with the boundary.', sSaddle()),
    item('ca-lagrange', '라그랑주 승수법', 'Lagrange multipliers', '조건 g = c 위에서 f의 최대·최소는 등고선이 조건 곡선에 접하는 곳, 즉 ∇f = λ∇g인 점에서 생겨요.', '연립: ∇f = λ∇g, g = c. 예: x + y = 4에서 xy 최대 → (y, x) = λ(1, 1) → x = y = 2, 최댓값 4. 조건이 둘이면 ∇f = λ∇g + μ∇h. 경제학 효용 최대화, ML의 제약 최적화(SVM)의 바탕이에요.', 'Optima of f on g = c occur where a level curve of f touches the constraint: ∇f = λ∇g.', 'Solve ∇f = λ∇g with g = c. Maximizing xy on x + y = 4: (y, x) = λ(1, 1) so x = y = 2, max 4. With two constraints, ∇f = λ∇g + μ∇h. Underlies utility maximization and constrained ML (SVMs).', sLagrange()),
    item('ca-double', '이중적분', 'Double integrals', '영역을 작은 칸으로 나눠 높이 × 넓이를 더한 극한이에요. 한 변수씩 차례로 적분(반복적분)해서 계산해요.', '푸비니: 직사각형 영역이면 순서 교환 가능. 일반 영역은 경계를 함수로: ∫ₐᵇ∫_(g₁(x))^(g₂(x)) f dy dx. 순서를 바꾸면 쉬워지는 문제(예: ∫₀¹∫ₓ¹ e^(y²) dy dx)가 단골이에요. 넓이 = ∬1 dA, 평균값 = (1/A)∬f dA.', 'The limit of height × area sums over small cells, computed as iterated single integrals.', 'Fubini lets you swap the order on rectangles; general regions use variable limits ∫ₐᵇ∫_(g₁(x))^(g₂(x)) f dy dx. Classic trick: swap the order of ∫₀¹∫ₓ¹ e^(y²) dy dx. Area = ∬1 dA; average = (1/A)∬f dA.', sDouble()),
    item('ca-polarint', '극좌표 이중적분', 'Double integrals in polar form', '원·부채꼴 영역은 극좌표로 바꾸면 쉬워요. 넓이 요소가 dA = r dr dθ가 돼요.', '예: ∬_(x² + y² ≤ 1) (x² + y²) dA = ∫₀²π∫₀¹ r²·r dr dθ = π/2. 가우스 적분: ∬e^(−(x² + y²))dA = π → ∫e^(−x²)dx = √π. 3차원은 원통좌표 dV = r dr dθ dz, 구면좌표 dV = ρ² sin φ dρ dφ dθ.', 'Circular regions become simple in polar form, with area element dA = r dr dθ.', '∬ over the unit disk of (x² + y²) dA = ∫₀²π∫₀¹ r³ dr dθ = π/2. Gaussian: ∬e^(−(x² + y²))dA = π, so ∫e^(−x²)dx = √π. In 3D: cylindrical dV = r dr dθ dz, spherical dV = ρ² sin φ dρ dφ dθ.', sPolarInt()),
    item('ca-jacobian', '변수변환과 야코비안', 'Change of variables and the Jacobian', '변수를 바꾸면 작은 넓이(부피)가 늘거나 줄어요. 그 배율이 야코비안 행렬식 |∂(x, y)/∂(u, v)|예요.', '∬f dx dy = ∬f |J| du dv. 예: x = 2u + v, y = u + 2v → |J| = 3. 극좌표 |J| = r, 구면좌표 |J| = ρ² sin φ. 영역 모양을 단순하게 만드는 변환(예: u = x + y, v = x − y)을 고르는 게 요령이에요.', 'Changing variables stretches small areas (volumes); the stretch factor is the Jacobian determinant |∂(x, y)/∂(u, v)|.', '∬f dx dy = ∬f |J| du dv. x = 2u + v, y = u + 2v has |J| = 3; polar |J| = r; spherical |J| = ρ² sin φ. Choose maps that straighten the region, such as u = x + y, v = x − y.', sJacobian())
  ]),
  sec('ca-vec', '벡터해석', 'Vector calculus', '벡터해석', 'Vector calculus',
    '곡선·곡면 위의 적분과 그린·발산·스토크스 정리예요.', 'Integrals along curves and surfaces, and the theorems of Green, Gauss and Stokes.', [
    item('ca-curve', '공간곡선과 곡률', 'Space curves and curvature', '매개변수 곡선 r(t)의 도함수 r′(t)는 속도(접선 방향), r″(t)는 가속도예요. 곡률은 곡선이 휘는 정도예요.', '속력 |r′|, 호의 길이 L = ∫|r′(t)|dt, 단위접선 T = r′/|r′|, 곡률 κ = |r′ × r″|/|r′|³ (평면곡선 y = f(x): κ = |f″|/(1 + f′²)^(3/2)). 가속도 = 접선 성분 + 법선 성분(κ·속력²).', 'For a curve r(t), r′(t) is velocity (along the tangent) and r″(t) acceleration; curvature measures bending.', 'Speed |r′|; arc length L = ∫|r′(t)|dt; unit tangent T = r′/|r′|; curvature κ = |r′ × r″|/|r′|³ (for y = f(x): κ = |f″|/(1 + f′²)^(3/2)). Acceleration splits into tangential and normal (κ·speed²) parts.', sCurve()),
    item('ca-vecfield', '벡터장', 'Vector fields', '공간의 각 점에 벡터를 대응시킨 함수 F(x, y, z)예요. 바람, 유체의 흐름, 전기장·중력장이 벡터장이에요.', '그래디언트장 ∇f는 대표적인 벡터장이에요. 흐름선(적분곡선)은 r′(t) = F(r(t))를 만족해요. 예: F = (−y, x)의 흐름선은 원점 중심의 원.', 'A vector attached to every point: F(x, y, z). Wind, fluid flow, electric and gravitational fields are vector fields.', 'Gradient fields ∇f are the classic example. Flow lines satisfy r′(t) = F(r(t)); for F = (−y, x) they are circles about the origin.', sVecField()),
    item('ca-lineint', '선적분', 'Line integrals', '곡선을 따라 벡터장의 접선 성분을 적분한 값으로, 힘이 한 일을 나타내요. W = ∫_C F·dr.', 'r(t)로 매개화: ∫_C F·dr = ∫ₐᵇ F(r(t))·r′(t) dt. 예: F = (y, x), r(t) = (t, t²)이면 ∫₀¹ 3t² dt = 1. 스칼라 선적분 ∫_C f ds = ∫ f(r(t))|r′(t)| dt는 곡선 질량 등에 써요.', 'Integrate the tangential component of a field along a curve: the work done, W = ∫_C F·dr.', 'Parametrize: ∫_C F·dr = ∫ₐᵇ F(r(t))·r′(t) dt. F = (y, x) along r(t) = (t, t²) gives ∫₀¹ 3t² dt = 1. Scalar line integrals ∫_C f ds = ∫ f(r(t))|r′(t)| dt give, for example, a wire’s mass.', sLineInt()),
    item('ca-conservative', '보존장과 퍼텐셜', 'Conservative fields', 'F = ∇φ인 장에서는 선적분이 경로와 무관하고 φ(B) − φ(A)만으로 정해져요. 닫힌 경로에서는 0이에요.', '판정(단순연결 영역): 2차원 ∂Q/∂x = ∂P/∂y, 3차원 ∇ × F = 0. 퍼텐셜 찾기: φₓ = P를 x로 적분한 뒤 y 의존 항을 맞춰요. 예: F = (y, x) → φ = xy.', 'If F = ∇φ, line integrals depend only on the endpoints, φ(B) − φ(A), and vanish on closed loops.', 'Test on simply connected regions: ∂Q/∂x = ∂P/∂y in 2D, ∇ × F = 0 in 3D. Find φ by integrating φₓ = P in x and fixing the y-dependent term; F = (y, x) has φ = xy.', sConservative()),
    item('ca-divcurl', '발산과 회전', 'Divergence and curl', '발산 ∇·F는 한 점에서 퍼져 나가는 정도, 회전 ∇×F는 그 점 주변을 휘감아 도는 정도예요.', 'div F = Pₓ + Q_y + R_z, curl F = (R_y − Q_z, P_z − Rₓ, Qₓ − P_y). 항등식: ∇·(∇×F) = 0, ∇×(∇f) = 0, ∇·∇f = ∇²f (라플라시안). 예: F = (x, y) → div 2, F = (−y, x) → curl 2.', 'Divergence ∇·F measures spreading out at a point; curl ∇×F measures swirling around it.', 'div F = Pₓ + Q_y + R_z; curl F = (R_y − Q_z, P_z − Rₓ, Qₓ − P_y). Identities: div curl F = 0, curl ∇f = 0, div ∇f = ∇²f (Laplacian). F = (x, y) has div 2; F = (−y, x) has curl 2.', sDivCurl()),
    item('ca-green', '그린 정리', 'Green’s theorem', '평면 영역 D의 경계 C를 반시계 방향으로 도는 선적분은 D 안의 회전(Qₓ − P_y)의 이중적분과 같아요.', '∮_C P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dA. 넓이 A = ½∮(x dy − y dx). 예: 단위원에서 F = (−y, x)이면 ∬2 dA = 2π. 구멍 있는 영역은 안쪽 경계를 시계 방향으로 더해요.', 'The counterclockwise line integral around the boundary of D equals the double integral of Qₓ − P_y over D.', '∮_C P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dA; area A = ½∮(x dy − y dx). For F = (−y, x) on the unit disk, ∬2 dA = 2π. For regions with holes, add the inner boundary clockwise.', sGreen()),
    item('ca-flux', '면적분과 플럭스', 'Surface integrals and flux', '곡면을 지나가는 흐름의 양이에요. 벡터장의 법선 성분 F·n을 곡면 위에서 적분해요.', '곡면 r(u, v): dS = |r_u × r_v| du dv, 플럭스 ∬F·n dS = ∬F·(r_u × r_v) du dv. 그래프 z = g(x, y)는 dS = √(1 + gₓ² + g_y²) dA. 방향(법선 방향)을 먼저 정해요.', 'The amount of flow through a surface: integrate the normal component F·n over it.', 'For r(u, v): dS = |r_u × r_v| du dv and flux ∬F·n dS = ∬F·(r_u × r_v) du dv. For z = g(x, y), dS = √(1 + gₓ² + g_y²) dA. Fix the orientation (normal direction) first.', sFlux()),
    item('ca-divthm', '발산 정리', 'Divergence theorem', '닫힌 곡면을 빠져나가는 전체 플럭스는 그 안의 발산을 모두 더한 것과 같아요.', '∯_S F·n dS = ∭_V ∇·F dV. 예: F = (x, y, z), 반지름 R 구 → 3·(4/3)πR³ = 4πR³. 전자기학의 가우스 법칙과 연속 방정식의 수학적 바탕이에요.', 'The total flux out of a closed surface equals the total divergence inside it.', '∯_S F·n dS = ∭_V ∇·F dV. For F = (x, y, z) and a sphere of radius R: 3·(4/3)πR³ = 4πR³. The maths behind Gauss’s law and the continuity equation.', sDivThm()),
    item('ca-stokes', '스토크스 정리', 'Stokes’ theorem', '곡면 S의 경계 C를 도는 선적분은 S 위에서 회전 ∇×F의 플럭스와 같아요. 그린 정리를 3차원으로 넓힌 거예요.', '∮_C F·dr = ∬_S (∇×F)·n dS. 경계 방향은 오른손 법칙(법선 방향에 엄지). 같은 경계를 가진 더 쉬운 곡면(평면 원판 등)으로 바꿔 계산하는 게 요령이에요.', 'The circulation around the boundary C equals the flux of ∇×F through S: Green’s theorem in 3D.', '∮_C F·dr = ∬_S (∇×F)·n dS, with C oriented by the right-hand rule. Swap S for any easier surface with the same boundary, such as a flat disk.', sStokes())
  ])
]);
window.UX[0].css += `
.ca-b .in{font-weight:800;color:var(--ink)}
.ca-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.ca-s .in{font-size:.62em}
.ca-xs .in{font-size:.55em}
.ca-sm .in{font-size:.62em;font-weight:700}
.ca-xl .in{font-size:1.15em;font-weight:800;color:var(--ink)}
.ca-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.ca-r .in{color:var(--danger);font-weight:800}
.ca-g .in{color:var(--ok);font-weight:800}
.ca-a .in{color:var(--accent);font-weight:800}
.ca-w .in{color:var(--warn);font-weight:800}
.ca-xl .h1{color:var(--accent)}.ca-xl .h2{color:var(--warn)}
.ca-orb{position:absolute;right:-.5em;top:calc(50% - .5em);width:1em;height:1em;border-radius:50%;background:var(--ok);border:.12em solid var(--ui)}`;
})();
