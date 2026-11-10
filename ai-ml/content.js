(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const off = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c ai-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const code = (S, k, x, y, w, t, st, h) => cell(S, k, x, y, t, { w, h: h || 2, cls: 'cz-c ai-code', s: st });
function fly(S, k, a, b, st, lab, sty, o = {}) { const r = o.r || .7; dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) }); S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r); if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' }); return S; }
const dash = c => `repeating-linear-gradient(90deg,var(--${c}) 0 .45em,transparent .45em .8em)`;
const ink = { background: 'var(--ink-3)' };
const col = (S, k, x, y, w, h) => S.el(k, { x, y, w, h, css: 'border-radius:.8em;background:color-mix(in srgb,var(--line) 40%,transparent)' });
/* polyline from points; reveal at step (or always) */
const curve = (S, pfx, pts, st, color, h) => { for (let i = 1; i < pts.length; i++) { edge(S, pfx + i, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], { h: h || .18, s: st ? hid({ background: `var(--${color || 'accent'})` }) : { background: `var(--${color || 'accent'})` } }); if (st) S.set(pfx + i, typeof st === 'function' ? st(i) : st, { opacity: '1' }); } };
const vline = (S, k, x, y, h, color, o = {}) => S.el(k, { x: x - .08, y, w: .16, h, css: o.dash ? `background:repeating-linear-gradient(180deg,var(--${color}) 0 .45em,transparent .45em .8em)` : `background:var(--${color})`, s: o.s || {} });
const f2 = n => n.toFixed(2);

/* ---------- basics ---------- */
function sTypes() {
  const S = scene({ id: 'ai-types', steps: 6, per: 1.25 });
  const X = [1, 11.4, 21.8];
  [['지도 학습', 'Supervised'], ['비지도 학습', 'Unsupervised'], ['강화 학습', 'Reinforcement']].forEach((l, i) => { col(S, 'c' + i, X[i], 2.6, 9.4, 15.6); text(S, 'h' + i, X[i] + .2, 1, l, { cls: 'cz-t ai-b' }); });
  [['사진 → 고양이', 'photo → cat'], ['사진 → 개', 'photo → dog'], ['사진 → 고양이', 'photo → cat']].forEach((l, i) => { chip(S, 'sx' + i, 1.6, 3.4 + i * 2.5, 8.2, l, hid(C.soft), { h: 2.1, cls: 'ai-p' }); S.set('sx' + i, 1, { opacity: '1' }); });
  arrow(S, 'sa', 5.7, 11, 5.7, 12.6, { s: hid() }); box(S, 'sm', 1.6, 12.8, 8.2, 2.6, ['모델', 'model'], { s: hid() });
  chip(S, 'sp', 1.6, 15.8, 8.2, ['새 사진 → 고양이?', 'new photo → cat?'], hid(C.ok), { h: 2.1, cls: 'ai-p' }); show(S, ['sa', 'sm', 'sp'], 1);
  const U = [[13, 5], [14.6, 4.2], [13.8, 6.6], [18, 6], [19.2, 4.6], [18.6, 7.4], [15, 12.6], [16.6, 13.6], [14.4, 14.4]], UC = ['accent', 'accent', 'accent', 'ok', 'ok', 'ok', 'warn', 'warn', 'warn'];
  U.forEach(([x, y], i) => { dot(S, 'u' + i, x, y, '', { r: .6, s: hid({ background: 'var(--ink-3)', 'border-color': 'transparent' }) }); S.set('u' + i, 2, { opacity: '1' }).set('u' + i, 3, { background: `var(--${UC[i]})` }); });
  text(S, 'ut', 11.8, 16.4, ['정답 없이 비슷한 것끼리', 'no labels: group by similarity'], { cls: 'cz-t', s: hid() }); S.set('ut', 3, { opacity: '1' });
  node(S, 'ag', 26.5, 6.2, ['에이전트', 'agent'], { r: 2.2, cls: 'cz-n ai-nsm', s: hid(C.soft) }); box(S, 'env', 23, 12.4, 7, 3.4, ['환경', 'environment'], { s: hid() });
  arrow(S, 'aa', 28.4, 8.2, 28.4, 12.2, { s: hid() }); arrow(S, 'ab', 24.6, 12.2, 24.6, 8.2, { s: hid() });
  text(S, 'at', 28.8, 9.6, ['행동', 'act'], { cls: 'cz-t', s: hid() }); text(S, 'bt', 22.2, 9.6, ['보상', 'reward'], { cls: 'cz-t ai-g', s: hid() }); show(S, ['ag', 'env', 'aa', 'ab', 'at', 'bt'], 4);
  pill(S, 'rw', 22.6, 16.4, ['+1 점! 이 행동을 더 하자', '+1! do more of that'], { w: 8.6, h: 1.8, s: hid(C.ok) }); S.set('rw', 5, { opacity: '1' });
  S.cap(1, '지도 학습: 정답이 붙은 예시로 배우고 새 입력을 예측', 'Supervised: learn from labelled examples, predict new ones')
    .cap(2, '비지도 학습: 정답 없이 데이터의 구조를 찾아요', 'Unsupervised: find structure without labels')
    .cap(3, '비슷한 것끼리 묶기 (군집화)', 'such as clusters of similar items')
    .cap(4, '강화 학습: 행동하고 보상을 받으며 배워요', 'Reinforcement: learn by acting and getting rewards')
    .cap(6, '스팸 분류는 지도, 고객 세분화는 비지도, 게임·로봇은 강화', 'Spam filters: supervised · customer segments: unsupervised · games, robots: RL');
  return S;
}
function sLinReg() {
  const S = scene({ id: 'ai-linreg', steps: 6, per: 1.3 });
  const X = x => 3 + x * 2.6, Y = y => 17 - y * 1.4;
  const PT = [[1, 2.2], [2, 2.4], [3, 3.6], [4, 4.0], [5, 5.2], [6, 5.4], [7, 6.9], [8, 7.1], [9, 8.3]];
  edge(S, 'ax', 3, 17, 30, 17, { s: ink }); edge(S, 'ay', 3, 17, 3, 2.4, { s: ink });
  text(S, 'xl', 22, 17.4, ['집 크기', 'house size'], { cls: 'cz-t' }); text(S, 'yl', 3.6, 1.6, ['가격', 'price'], { cls: 'cz-t' });
  const L = [[0, 5], [.4, 3], [.8, 1.2]];
  const mse = ([m, b]) => PT.reduce((s, [x, y]) => s + (y - (m * x + b)) ** 2, 0) / PT.length;
  L.forEach(([m, b], i) => {
    edge(S, 'L' + i, X(0), Y(b), X(10), Y(m * 10 + b), { h: .2, s: hid({ background: i === 2 ? 'var(--ok)' : 'var(--warn)' }) });
    S.set('L' + i, i + 2, { opacity: '1' }); if (i < 2) S.set('L' + i, i + 3, { opacity: '0' });
    PT.forEach(([x, y], j) => { const yh = m * x + b; vline(S, `r${i}_${j}`, X(x), Math.min(Y(y), Y(yh)), Math.abs(Y(y) - Y(yh)), 'danger', { s: hid() }); S.set(`r${i}_${j}`, i + 2, { opacity: '.7' }); if (i < 2) S.set(`r${i}_${j}`, i + 3, { opacity: '0' }); });
  });
  PT.forEach(([x, y], j) => dot(S, 'p' + j, X(x), Y(y), '', { r: .45, s: C.cur }));
  S.label('mse', { cls: 'cz-t ai-l', x: 5, y: 3, w: 12 }, [[0, ''], [2, `MSE = ${f2(mse(L[0]))}`], [3, `MSE = ${f2(mse(L[1]))}`], [4, `MSE = ${f2(mse(L[2]))} ✓`]]);
  text(S, 'eq', 5, 4.6, 'y = 0.8x + 1.2', { cls: 'cz-t cz-mono ai-l', s: hid() }); S.set('eq', 5, { opacity: '1' });
  const nx = 7.5, ny = .8 * nx + 1.2;
  vline(S, 'pv', X(nx), Y(ny), 17 - Y(ny), 'ink-3', { dash: true, s: hid() }); dot(S, 'pp', X(nx), Y(ny), '', { r: .55, s: hid(C.okf) });
  text(S, 'pt', X(nx) + .8, Y(ny) - 2.2, [`예측: ${ny.toFixed(1)}`, `prediction: ${ny.toFixed(1)}`], { cls: 'cz-t ai-g', s: hid() }); show(S, ['pv', 'pp', 'pt'], 5);
  S.cap(1, '데이터 점들 사이의 관계를 직선으로 표현하려 해요', 'Try to describe the data with a straight line')
    .cap(2, '아무 직선이나 그으면 오차(빨간 선)가 커요', 'A random line leaves big errors (red)')
    .cap(3, '오차 제곱의 평균(MSE)을 줄이는 쪽으로 기울기·절편을 조정', 'Adjust slope and intercept to shrink the mean squared error')
    .cap(4, 'MSE가 가장 작은 직선이 정답', 'The line with the smallest MSE wins')
    .cap(5, '새 입력은 직선 위의 값으로 예측', 'Predict new inputs by reading off the line')
    .cap(6, '가장 단순한 모델이지만 많은 문제의 출발점이에요', 'The simplest model, and the starting point for many problems');
  return S;
}
function sGD() {
  const S = scene({ id: 'ai-gd', steps: 7, per: 1.15 });
  const Lf = w => (w - 6) ** 2 / 3 + 1, X = w => 2 + w * 2.33, Y = l => 17.5 - (l - 1) * 1.05;
  const pts = []; for (let i = 0; i <= 36; i++) { const w = i / 3; pts.push([X(w), Y(Lf(w))]); }
  curve(S, 'c', pts, 0, 'ink-3', .16);
  edge(S, 'ax', 2, 18.2, 30.4, 18.2, { s: ink });
  text(S, 'xl', 25.6, 18.5, ['가중치 w', 'weight w'], { cls: 'cz-t' }); text(S, 'yl', 1, 1.6, ['손실 (오차)', 'loss (error)'], { cls: 'cz-t' });
  code(S, 'f', 12.6, 1.2, 18.4, 'w ← w − η · ∂L/∂w&nbsp;&nbsp;&nbsp;(η = 0.6)', C.soft, 2.2);
  const eta = .6, W = [.5]; for (let k = 0; k < 6; k++) { const w = W[W.length - 1]; W.push(w - eta * 2 * (w - 6) / 3); }
  const r = .7, pos = w => [X(w), Y(Lf(w)) - r];
  W.forEach((w, k) => { if (k === 0 || k === 6) return; const [x, y] = pos(w); dot(S, 'tr' + k, x, y, '', { r: .28, s: hid({ background: 'var(--accent)', 'border-color': 'transparent' }) }); S.set('tr' + k, k + 1, { opacity: '.55' }); });
  const [bx, by] = pos(W[0]); dot(S, 'ball', bx, by, '', { r, s: C.cur });
  W.forEach((w, k) => { if (!k) return; const [x, y] = pos(w); S.move('ball', k, x - r, y - r); });
  S.label('lv', { cls: 'cz-t cz-mono ai-l', x: 12.6, y: 4, w: 18.4 }, W.map((w, k) => [k, `w = ${w.toFixed(2)} · loss = ${Lf(w).toFixed(2)}`]));
  S.label('gv', { cls: 'cz-t cz-mono', x: 12.6, y: 5.6, w: 18.4 }, W.map((w, k) => [k, [`기울기 = ${(2 * (w - 6) / 3).toFixed(2)}`, `gradient = ${(2 * (w - 6) / 3).toFixed(2)}`]]));
  S.cap(1, '현재 위치의 기울기를 보고 내려가는 방향으로 한 걸음', 'Read the slope here and step downhill')
    .cap(2, '기울기가 가파를수록 크게 움직여요', 'Steeper slope, bigger step')
    .cap(4, '바닥에 가까울수록 기울기가 작아져 천천히', 'Near the bottom the slope flattens and steps shrink')
    .cap(6, '손실이 가장 작은 지점(최솟값)에 수렴', 'It converges on the minimum loss')
    .cap(7, '실제 모델은 수십억 개 가중치로 같은 일을 해요 (미니배치 SGD·Adam)', 'Real models do this for billions of weights (mini-batch SGD, Adam)');
  return S;
}
function sLR() {
  const S = scene({ id: 'ai-lr', steps: 5, per: 1.4 });
  const Lf = w => (w - 6) ** 2 / 3 + 1;
  const P = [[1, ['너무 작음', 'too small'], .1, 'ai-w'], [11.4, ['적당함', 'just right'], .9, 'ai-g'], [21.8, ['너무 큼', 'too large'], 3.15, 'ai-r']];
  P.forEach(([px, l, eta, cl], p) => {
    col(S, 'c' + p, px, 2.6, 9.4, 15.6); text(S, 'h' + p, px + .2, 1, l, { cls: 'cz-t ai-b ' + cl }); text(S, 'e' + p, px + 5.4, 1, `η = ${eta}`, { cls: 'cz-t cz-mono' });
    const X = w => px + .38 + w * .72, Y = l => 15.6 - (l - 1) * .82;
    const pts = []; for (let i = 0; i <= 24; i++) { const w = i / 2; pts.push([X(w), Y(Lf(w))]); } curve(S, `k${p}_`, pts, 0, 'ink-3', .14);
    const W = [2]; for (let k = 0; k < 4; k++) { const w = W[W.length - 1]; W.push(w - eta * 2 * (w - 6) / 3); }
    const r = .55, pos = w => { const c = Math.max(0, Math.min(12, w)); return [X(c), Y(Lf(c)) - r]; };
    const [bx, by] = pos(W[0]); dot(S, 'b' + p, bx, by, '', { r, s: p === 2 ? C.badf : p === 1 ? C.okf : C.warn });
    W.forEach((w, k) => { if (!k) return; const [x, y] = pos(w); S.move('b' + p, k, x - r, y - r); dot(S, `t${p}_${k}`, ...pos(W[k - 1]), '', { r: .22, s: hid({ background: 'var(--ink-3)', 'border-color': 'transparent' }) }); S.set(`t${p}_${k}`, k, { opacity: '.7' }); });
    text(S, 'n' + p, px + .4, 16.6, [['한참 걸려요', '수렴 ✓', '튕겨 나가요 (발산)'][p], ['takes forever', 'converges ✓', 'bounces out (diverges)'][p]], { cls: 'cz-t ' + cl, s: hid() }); S.set('n' + p, 4, { opacity: '1' });
  });
  S.cap(1, '학습률(η)은 한 걸음의 크기예요', 'The learning rate η sets the step size')
    .cap(2, '작으면 느리고, 크면 바닥을 지나쳐 튕겨요', 'Too small is slow; too large overshoots')
    .cap(4, '적당한 값을 찾는 게 학습의 핵심 튜닝', 'Finding the right value is key tuning work')
    .cap(5, '처음엔 크게, 갈수록 작게 줄이는 스케줄을 많이 써요', 'Schedules often start large and decay over time');
  return S;
}
function sClassify() {
  const S = scene({ id: 'ai-classify', steps: 5, per: 1.35 });
  edge(S, 'ax', 3, 17.6, 30, 17.6, { s: ink }); edge(S, 'ay', 3, 17.6, 3, 2.4, { s: ink });
  text(S, 'xl', 22.6, 18, ['링크 수', 'links'], { cls: 'cz-t' }); text(S, 'yl', 3.6, 1.6, ['느낌표 수', 'exclamation marks'], { cls: 'cz-t' });
  const H = [[5, 14], [7, 15], [6, 11.5], [9, 13], [11, 15.5], [8, 10], [12, 12.5]], SP = [[18, 6], [21, 8], [24, 5], [20, 4.5], [26, 9], [17, 9.5], [23, 11]];
  edge(S, 'bad', 3, 10.5, 30, 10.5, { h: .2, s: hid({ background: dash('warn') }) }); S.set('bad', 2, { opacity: '1' }).set('bad', 3, { opacity: '0' });
  [[8, 10], [23, 11]].forEach(([x, y], i) => { dot(S, 'mx' + i, x, y, '', { r: 1.05, s: hid({ background: 'transparent', 'border-color': 'var(--danger)' }) }); S.set('mx' + i, 2, { opacity: '1' }).set('mx' + i, 3, { opacity: '0' }); });
  edge(S, 'good', 13, 17.6, 20.2, 2.4, { h: .22, s: hid({ background: 'var(--ok)' }) }); S.set('good', 3, { opacity: '1' });
  H.forEach(([x, y], i) => dot(S, 'h' + i, x, y, '', { r: .5, s: C.cur }));
  SP.forEach(([x, y], i) => dot(S, 's' + i, x, y, '', { r: .5, s: C.warn }));
  text(S, 'lh', 4, 3, ['● 정상 메일', '● normal mail'], { cls: 'cz-t ai-a' }); text(S, 'ls', 4, 4.4, ['● 스팸', '● spam'], { cls: 'cz-t ai-w' });
  dot(S, 'q', 19, 13.5, '?', { r: .8, s: hid(C.cmp) }); S.set('q', 4, { opacity: '1' });
  text(S, 'qp', 20.2, 14.6, ['P(스팸) = 0.83 → 스팸', 'P(spam) = 0.83 → spam'], { cls: 'cz-t cz-mono ai-w', s: hid() }); S.set('qp', 4, { opacity: '1' });
  S.label('acc', { cls: 'cz-t ai-l', x: 22, y: 1.6, w: 9 }, [[0, ''], [2, ['오분류 2개', '2 errors']], [3, ['오분류 0개 ✓', '0 errors ✓']]]);
  S.cap(1, '특징(링크 수, 느낌표 수)으로 두 종류를 나누고 싶어요', 'Separate two classes using features (links, exclamation marks)')
    .cap(2, '아무 경계선이나 그으면 틀린 점이 생겨요', 'A careless boundary misclassifies points')
    .cap(3, '오차를 줄이도록 학습한 결정 경계', 'Training finds a boundary that minimizes errors')
    .cap(4, '새 메일은 경계 어느 쪽인지로 판정 · 확률도 함께', 'New mail is judged by which side it falls on, with a probability')
    .cap(5, '로지스틱 회귀·SVM·결정 트리가 대표적인 분류 모델', 'Logistic regression, SVMs and decision trees are classic classifiers');
  return S;
}
function sKMeans() {
  const S = scene({ id: 'ai-kmeans', steps: 6, per: 1.3 });
  const P = [[5.5, 5], [7.5, 4.5], [8, 7], [6, 7.5], [22, 5.5], [25.5, 6], [24, 8.5], [26, 8.6], [13, 14], [16.5, 13.5], [14.5, 16.5], [17, 16]];
  const COL = ['accent', 'ok', 'warn'];
  let Cn = [[10, 4], [12, 9.5], [20, 12]];
  const assign = cs => P.map(([x, y]) => { let b = 0, bd = 1e9; cs.forEach(([cx, cy], i) => { const d = (x - cx) ** 2 + (y - cy) ** 2; if (d < bd) { bd = d; b = i; } }); return b; });
  const mean = a => Cn.map((c, i) => { const m = P.filter((_, j) => a[j] === i); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : c; });
  P.forEach(([x, y], j) => { dot(S, 'p' + j, x, y, '', { r: .55, s: { background: 'var(--ink-3)', 'border-color': 'transparent' } }); });
  const r = 1;
  Cn.forEach(([x, y], i) => { dot(S, 'c' + i, x, y, '×', { r, s: hid({ background: 'var(--ui)', 'border-color': `var(--${COL[i]})`, color: `var(--${COL[i]})` }) }); S.set('c' + i, 2, { opacity: '1' }); });
  const a1 = assign(Cn); a1.forEach((c, j) => S.set('p' + j, 3, { background: `var(--${COL[c]})` }));
  Cn = mean(a1); Cn.forEach(([x, y], i) => S.move('c' + i, 4, x - r, y - r));
  const a2 = assign(Cn); a2.forEach((c, j) => { if (c !== a1[j]) S.set('p' + j, 5, { background: `var(--${COL[c]})`, transform: 'scale(1.5)' }); else S.set('p' + j, 5, {}); });
  Cn = mean(a2); Cn.forEach(([x, y], i) => S.move('c' + i, 6, x - r, y - r));
  const changed = a2.filter((c, j) => c !== a1[j]).length;
  S.label('it', { cls: 'cz-t ai-l', x: 1, y: 18.4, w: 30 }, [[0, ''], [3, ['1회차: 가까운 중심에 배정', 'round 1: assign to nearest centre']], [4, ['중심을 평균 위치로 이동', 'move centres to the mean']], [5, [`2회차: ${changed}개 점의 소속이 바뀜`, `round 2: ${changed} point(s) switch`]], [6, ['더 이상 안 바뀌면 끝 (수렴)', 'stop when nothing changes']]]);
  S.cap(1, '정답 없는 점들을 K개(여기선 3) 묶음으로 나누려 해요', 'Split unlabelled points into K groups (here 3)')
    .cap(2, '중심 K개를 아무 데나 놓고', 'Drop K centres anywhere')
    .cap(3, '각 점은 가장 가까운 중심에 소속', 'Each point joins its nearest centre')
    .cap(4, '중심을 소속 점들의 평균으로 옮기고', 'Move each centre to its points’ mean')
    .cap(5, '다시 배정 → 이동을 반복', 'Repeat: reassign, move')
    .cap(6, '고객 세분화·이미지 색 압축에 써요 · K는 사람이 정해요', 'Used for customer segments and colour quantization · you choose K');
  return S;
}
function sSplit() {
  const S = scene({ id: 'ai-split', steps: 5, per: 1.4 });
  text(S, 'h', 1, .9, ['전체 데이터 10,000개', 'All data: 10,000 rows'], { cls: 'cz-t ai-b' });
  S.el('all', { cls: 'cz-c', x: 1, y: 2.4, w: 30, h: 2.6, s: { background: 'var(--line)' } }); S.set('all', 2, { opacity: '0' });
  const SG = [['tr', 1, 21, ['학습 70%', 'train 70%'], C.soft], ['va', 22, 4.4, ['검증 15%', 'val 15%'], C.cmp], ['te', 26.6, 4.4, ['테스트 15%', 'test 15%'], C.ok]];
  SG.forEach(([k, x, w, l, st]) => { chip(S, k, x, 2.4, w - .2, l, hid(st), { h: 2.6, cls: 'ai-p' }); S.set(k, 2, { opacity: '1' }); });
  box(S, 'm', 11, 9.4, 10, 4.2, ['모델', 'model'], { s: C.soft });
  arrow(S, 'a1', 8, 5.2, 11.2, 9.6, { s: hid() }); text(S, 'a1t', 1, 11.8, ['① 학습: 가중치를 맞춰요', '① train: fit the weights'], { cls: 'cz-t ai-b', s: hid() }); show(S, ['a1', 'a1t'], 3);
  arrow(S, 'a2', 24, 5.2, 21.2, 10.2, { s: hid() }); text(S, 'a2t', 10.4, 8.2, ['② 검증: 설정 고르기', '② validate: pick settings'], { w: 10.4, cls: 'cz-t ai-l', css: 'text-align:right', s: hid() }); show(S, ['a2', 'a2t'], 3);
  arrow(S, 'a3', 28.8, 5.2, 21.2, 12.8, { s: hid({ background: 'var(--ok)', 'border-color': 'var(--ok)' }) }); text(S, 'a3t', 21.4, 14.4, ['③ 테스트: 마지막에 한 번만', '③ test: once, at the very end'], { cls: 'cz-t ai-g', s: hid() }); show(S, ['a3', 'a3t'], 4);
  pill(S, 'sc', 11, 15, ['테스트 정확도 91%', 'test accuracy 91%'], { w: 10, h: 2.2, s: hid(C.okf) }); S.set('sc', 4, { opacity: '1' }).set('sc', 5, { opacity: '0' });
  pill(S, 'lk', 7, 15, ['테스트가 학습에 섞이면 99%? → 실전에선 70%', 'test leaked into training: 99%? → 70% live'], { w: 18, h: 2.2, s: hid(C.badf) }); S.set('lk', 5, { opacity: '1' });
  S.cap(1, '모든 데이터로 학습하면 실력을 잴 방법이 없어요', 'Train on everything and you can’t measure real skill')
    .cap(2, '학습·검증·테스트로 나눠요', 'Split into train, validation and test sets')
    .cap(3, '학습으로 배우고, 검증으로 모델과 설정을 골라요', 'Learn on train; choose models and settings on validation')
    .cap(4, '테스트는 처음 보는 데이터에 대한 최종 성적표', 'Test is the final grade on unseen data')
    .cap(5, '데이터 누수: 시험 문제를 미리 보면 점수만 부풀어요', 'Data leakage: seeing the exam early only inflates the score');
  return S;
}

/* ---------- generalization and evaluation ---------- */
function sOverfit() {
  const S = scene({ id: 'ai-overfit', steps: 4, per: 1.6 });
  const D = [[.5, 7.6], [1.8, 4.9], [3, 3.4], [4.2, 2.1], [5.5, 2.4], [6.7, 3.0], [8, 5.2], [9.4, 7.4]], T = [[2.4, 4.6], [7.4, 3.6], [9, 6.8]];
  const lag = x => D.reduce((s, [xi, yi], i) => s + yi * D.reduce((p, [xj], j) => i === j ? p : p * (x - xj) / (xi - xj), 1), 0);
  const F = [x => 4.5, x => .26 * (x - 4.9) ** 2 + 2.1, lag];
  const P = [[1, ['과소적합', 'Underfit'], 'ai-w', ['학습 ✗ · 테스트 ✗', 'train ✗ · test ✗']], [11.4, ['적절', 'Good fit'], 'ai-g', ['학습 ✓ · 테스트 ✓', 'train ✓ · test ✓']], [21.8, ['과적합', 'Overfit'], 'ai-r', ['학습 ✓✓ · 테스트 ✗', 'train ✓✓ · test ✗']]];
  P.forEach(([px, l, cl, res], p) => {
    col(S, 'c' + p, px, 2.6, 9.4, 15.6); text(S, 'h' + p, px + .2, 1, l, { cls: 'cz-t ai-b ' + cl, s: hid() }); S.set('h' + p, p + 1, { opacity: '1' });
    const X = x => px + .5 + x * .84, Y = y => Math.max(3, Math.min(16.4, 15.4 - y * 1.3));
    const pts = []; for (let i = 0; i <= 40; i++) { const x = i / 4; pts.push([X(x), Y(F[p](x))]); }
    curve(S, `f${p}_`, pts, p + 1, p === 2 ? 'danger' : p === 1 ? 'ok' : 'warn', .18);
    D.forEach(([x, y], j) => dot(S, `d${p}_${j}`, X(x), Y(y), '', { r: .38, s: C.cur }));
    T.forEach(([x, y], j) => { dot(S, `t${p}_${j}`, X(x), Y(y), '', { r: .42, s: hid({ background: 'var(--ui)', 'border-color': 'var(--warn)' }) }); S.set(`t${p}_${j}`, 4, { opacity: '1' }); });
    text(S, 'r' + p, px + .4, 16.8, res, { cls: 'cz-t ' + cl, s: hid() }); S.set('r' + p, 4, { opacity: '1' });
  });
  S.cap(1, '너무 단순하면 패턴을 못 잡아요', 'Too simple misses the pattern')
    .cap(2, '적절한 모델은 흐름을 따라가고', 'A good model follows the trend')
    .cap(3, '너무 복잡하면 잡음까지 외워요', 'Too complex memorizes the noise')
    .cap(4, '처음 보는 데이터(○)에서 차이가 드러나요', 'New data (○) reveals the difference');
  return S;
}
function sEarly() {
  const S = scene({ id: 'ai-early', steps: 5, per: 1.4 });
  const X = e => 3 + e * 1.3, Y = l => 17 - l * 13;
  const tr = e => .9 * Math.exp(-e / 6) + .05, va = e => .9 * Math.exp(-e / 6) + .12 + Math.max(0, e - 8) ** 1.5 * .012;
  edge(S, 'ax', 3, 17, 30, 17, { s: ink }); edge(S, 'ay', 3, 17, 3, 2.4, { s: ink });
  text(S, 'xl', 25.4, 17.4, ['에폭 (반복)', 'epochs'], { cls: 'cz-t' }); text(S, 'yl', 3.6, 1.6, ['손실', 'loss'], { cls: 'cz-t' });
  const seg = e => e <= 7 ? 1 : e <= 14 ? 2 : 3;
  const tp = [], vp = []; for (let e = 0; e <= 20; e += .5) { tp.push([X(e), Y(tr(e))]); vp.push([X(e), Y(va(e))]); }
  curve(S, 't', tp, i => seg(i / 2), 'accent', .2); curve(S, 'v', vp, i => seg(i / 2), 'warn', .2);
  text(S, 'lt', 5, 14.6, ['── 학습 손실', '── train loss'], { cls: 'cz-t ai-a' }); text(S, 'lv', 5, 16, ['── 검증 손실', '── validation loss'], { cls: 'cz-t ai-w' });
  let best = 0; for (let e = 0; e <= 20; e += 1) if (va(e) < va(best)) best = e;
  vline(S, 'es', X(best), 3.4, 13.6, 'ok', { dash: true, s: hid() }); S.set('es', 4, { opacity: '1' });
  text(S, 'est', X(best) + .4, 3.2, [`여기서 멈춤 (에폭 ${best})`, `stop here (epoch ${best})`], { cls: 'cz-t ai-g', s: hid() }); S.set('est', 4, { opacity: '1' });
  text(S, 'ov', X(15.8), Y(va(15.8)) + .8, ['과적합 시작 ↑', 'overfitting ↑'], { cls: 'cz-t ai-r', s: hid() }); S.set('ov', 3, { opacity: '1' });
  S.cap(1, '처음엔 학습·검증 손실이 함께 줄어요', 'At first both train and validation loss fall')
    .cap(2, '어느 순간 검증 손실이 멈추고', 'Then validation loss levels off')
    .cap(3, '학습 손실만 계속 줄면 과적합', 'Train loss still falling alone means overfitting')
    .cap(4, '검증 손실이 가장 낮을 때 멈춰요 (조기 종료)', 'Stop where validation loss is lowest (early stopping)')
    .cap(5, '데이터 늘리기·드롭아웃·가중치 감소(L2)도 과적합을 막아요', 'More data, dropout and weight decay (L2) also fight overfitting');
  return S;
}
function sConfusion() {
  const S = scene({ id: 'ai-confusion', steps: 5, per: 1.4 });
  text(S, 'h', 1, .9, ['질병 검사 100명 (실제 환자 10명)', 'Disease test, 100 people (10 actually sick)'], { cls: 'cz-t ai-b' });
  text(S, 'p1', 8.4, 3, ['예측: 양성', 'predicted +'], { w: 5, cls: 'cz-t cz-tc ai-l' }); text(S, 'p2', 13.6, 3, ['예측: 음성', 'predicted −'], { w: 5, cls: 'cz-t cz-tc ai-l' });
  text(S, 'r1', .6, 6.4, ['실제: 양성', 'actual +'], { w: 7.4, cls: 'cz-t ai-l' }); text(S, 'r2', .6, 11.6, ['실제: 음성', 'actual −'], { w: 7.4, cls: 'cz-t ai-l' });
  const M = [['tp', 8.4, 4.6, ['TP 8', 'TP 8'], C.ok], ['fn', 13.6, 4.6, ['FN 2', 'FN 2'], C.bad], ['fp', 8.4, 9.8, ['FP 9', 'FP 9'], C.bad], ['tn', 13.6, 9.8, ['TN 81', 'TN 81'], C.ok]];
  M.forEach(([k, x, y, l, st]) => cell(S, k, x, y, l, { w: 5, h: 5, cls: 'cz-c ai-big', s: st }));
  const hl = { 'box-shadow': '0 0 0 .3em var(--accent)' }, nohl = { 'box-shadow': 'none' };
  S.set('tp', 2, hl).set('tn', 2, hl).set('tn', 3, nohl).set('fp', 3, hl).set('fp', 4, nohl).set('fn', 4, hl).set('tp', 5, nohl).set('fn', 5, nohl);
  const F = [['정확도', 'Accuracy', '(8 + 81) / 100 = 89%', 2], ['정밀도', 'Precision', '8 / (8 + 9) = 47%', 3], ['재현율', 'Recall', '8 / (8 + 2) = 80%', 4]];
  F.forEach(([k, e, f, st], i) => { text(S, 'fk' + i, 20.4, 4.4 + i * 4, [k, e], { cls: 'cz-t ai-b', s: hid() }); text(S, 'ff' + i, 20.4, 5.8 + i * 4, f, { cls: 'cz-t cz-mono ai-l', s: hid() }); show(S, ['fk' + i, 'ff' + i], st); });
  text(S, 'q1', 20.4, 16.6, ['양성이라 한 것 중 진짜는? → 정밀도', 'of the flagged, how many are real? → precision'], { cls: 'cz-t', s: hid() }); S.set('q1', 3, { opacity: '1' });
  text(S, 'q2', 20.4, 18, ['진짜 중 찾아낸 건? → 재현율', 'of the real ones, how many caught? → recall'], { cls: 'cz-t', s: hid() }); S.set('q2', 4, { opacity: '1' });
  S.get('q1').x = 1; S.get('q2').x = 1;
  S.cap(1, '예측과 실제를 2×2 표로 정리해요', 'Lay predictions against reality in a 2×2 table')
    .cap(2, '정확도 89% · 그런데 "모두 음성"이라 해도 90%예요', 'Accuracy 89% · yet “always negative” scores 90%')
    .cap(3, '정밀도: 양성 판정의 신뢰도', 'Precision: how trustworthy a positive is')
    .cap(4, '재현율: 진짜 양성을 놓치지 않는 정도', 'Recall: how many real positives you catch')
    .cap(5, '불균형 데이터에선 정확도보다 정밀도·재현율·F1을 봐요', 'With imbalanced data, look at precision, recall and F1, not accuracy');
  return S;
}
function sPR() {
  const S = scene({ id: 'ai-pr', steps: 5, per: 1.4 });
  const X = s => 3 + s * 26;
  const NEG = [.05, .1, .15, .2, .25, .3, .35, .42, .55, .62], POS = [.38, .5, .6, .68, .72, .8, .85, .9, .95];
  edge(S, 'ax', 3, 14.4, 29, 14.4, { s: ink });
  [0, .25, .5, .75, 1].forEach(t => text(S, 'tk' + t, X(t) - 1.5, 14.8, String(t), { w: 3, cls: 'cz-t cz-tc cz-mono' }));
  text(S, 'xl', 3, 16.2, ['모델이 매긴 "스팸 점수"', 'the model’s spam score'], { cls: 'cz-t' });
  text(S, 'ln', .6, 6.4, ['정상', 'ham'], { cls: 'cz-t ai-a' }); text(S, 'lp', .6, 10.4, ['스팸', 'spam'], { cls: 'cz-t ai-w' });
  NEG.forEach((s, i) => dot(S, 'n' + i, X(s), 7, '', { r: .55, s: C.cur }));
  POS.forEach((s, i) => dot(S, 'p' + i, X(s), 11, '', { r: .55, s: C.warn }));
  const TH = [.5, .75, .3];
  const pr = t => { const tp = POS.filter(s => s >= t).length, fp = NEG.filter(s => s >= t).length; return [tp / (tp + fp), tp / POS.length]; };
  S.el('th', { x: X(TH[0]) - .08, y: 4.4, w: .16, h: 9.4, css: 'background:var(--ink)' });
  S.el('sh', { x: X(TH[0]), y: 4.4, w: 29 - X(TH[0]), h: 9.4, css: 'background:color-mix(in srgb,var(--danger) 10%,transparent);transform-origin:100% 50%', s: { width: (29 - X(TH[0])) + 'em' } });
  TH.forEach((t, i) => { if (!i) return; S.move('th', i + 1, X(t) - .08, 4.4); S.move('sh', i + 1, X(t), 4.4, { width: (29 - X(t)) + 'em' }); });
  S.label('tl', { cls: 'cz-t cz-mono ai-l', x: 3, y: 2.4, w: 28 }, TH.map((t, i) => [i ? i + 1 : 0, [`임계값 ${t} 이상 → 스팸 처리`, `threshold ${t}: flag as spam`]]));
  S.label('pv', { cls: 'cz-t cz-mono ai-l', x: 3, y: 17.8, w: 28 }, TH.map((t, i) => { const [p, r] = pr(t); return [i ? i + 1 : 0, [`정밀도 ${Math.round(p * 100)}% · 재현율 ${Math.round(r * 100)}%`, `precision ${Math.round(p * 100)}% · recall ${Math.round(r * 100)}%`]]; }));
  S.cap(1, '점수가 임계값보다 높으면 양성(스팸)으로 판정', 'Scores above the threshold are flagged as spam')
    .cap(2, '높이면: 확실한 것만 → 정밀도↑ 재현율↓', 'Raise it: only sure cases → precision up, recall down')
    .cap(3, '낮추면: 넓게 잡음 → 재현율↑ 정밀도↓', 'Lower it: cast a wide net → recall up, precision down')
    .cap(4, '둘은 시소처럼 움직여요', 'The two move like a seesaw')
    .cap(5, '정상 메일이 사라지면 곤란한 스팸 필터는 정밀도, 암 검진은 재현율 우선', 'Spam filters favour precision; cancer screening favours recall');
  return S;
}

/* ---------- deep learning ---------- */
function sNeuron() {
  const S = scene({ id: 'ai-neuron', steps: 5, per: 1.4 });
  const IN = [[4.6, 4.4, '1.0', 'x1', '0.8'], [4.6, 10.4, '0.5', 'x2', '−0.4'], [4.6, 16.4, '−1.0', 'x3', '0.3']];
  const SUM = [16, 10.4];
  IN.forEach(([x, y, v, n, w], i) => {
    link(S, 'e' + i, [x, y], SUM, 1.5, 2.3, {}); S.set('e' + i, 2, { background: 'var(--accent)', 'border-color': 'var(--accent)' });
    node(S, 'x' + i, x, y, v, { r: 1.4, s: hid(C.soft) }); S.set('x' + i, 1, { opacity: '1' });
    text(S, 'n' + i, .6, y - .5, n, { cls: 'cz-t cz-mono ai-b' });
    text(S, 'w' + i, [7, 7, 7.6][i], [4.5, 9.1, 15.5][i], `w${i + 1} = ${w}`, { cls: 'cz-t cz-mono ai-a', s: hid() }); S.set('w' + i, 2, { opacity: '1' });
  });
  node(S, 'sum', ...SUM, 'Σ', { r: 2.2, cls: 'cz-n ai-big2', s: {} }); S.set('sum', 3, C.soft);
  text(S, 'b', 14.2, 13.4, 'b = 0.1', { cls: 'cz-t cz-mono', s: hid() }); S.set('b', 3, { opacity: '1' });
  arrow(S, 'sa', 18.4, 10.4, 21, 10.4, {}); box(S, 'act', 21.2, 8.2, 4.4, 4.4, 'σ', { cls: 'cz-box cz-bx ai-big2' }); S.set('act', 4, C.soft);
  arrow(S, 'oa', 25.8, 10.4, 27.6, 10.4, {}); node(S, 'out', 29.4, 10.4, '0.60', { r: 1.6, s: hid(C.okf) }); S.set('out', 4, { opacity: '1' });
  S.label('fx', { cls: 'cz-c ai-code', x: 1, y: 18.6, w: 30, h: 2.2 }, [[0, ''], [3, 'z = 1.0×0.8 + 0.5×(−0.4) + (−1.0)×0.3 + 0.1 = 0.4'], [4, 'σ(0.4) = 1 / (1 + e^−0.4) ≈ 0.60']]);
  Object.assign(S.get('fx~0').s, { opacity: '0' });
  S.cap(1, '입력값들이 들어와요', 'Inputs arrive')
    .cap(2, '각 입력에 가중치(중요도)를 곱하고', 'Each is multiplied by a weight (its importance)')
    .cap(3, '모두 더하고 편향(b)을 더해요', 'Sum them and add a bias b')
    .cap(4, '활성화 함수를 통과해 출력 (시그모이드: 0~1)', 'An activation function gives the output (sigmoid: 0–1)')
    .cap(5, '학습이란 결국 이 가중치와 편향을 맞추는 일', 'Learning means tuning these weights and biases');
  return S;
}
function sMLP() {
  const S = scene({ id: 'ai-mlp', steps: 6, per: 1.25 });
  const LAY = [[4, 3], [11.5, 4], [19, 4], [25, 2]];
  const ACT = [[.9, .3, .6], [.2, .8, .5, .7], [.9, .1, .6, .4], [.92, .08]];
  const pos = (l, j) => [LAY[l][0], 10.4 + (j - (LAY[l][1] - 1) / 2) * 3.8];
  for (let l = 1; l < 4; l++) for (let a = 0; a < LAY[l - 1][1]; a++) for (let b = 0; b < LAY[l][1]; b++) {
    const k = `e${l}_${a}_${b}`; edge(S, k, ...pos(l - 1, a), ...pos(l, b), { h: .1, s: { background: 'var(--line)' } });
    S.set(k, l + 1, { background: `color-mix(in srgb,var(--accent) ${Math.round(ACT[l - 1][a] * 90)}%,var(--line))` }).set(k, l + 2 <= 5 ? l + 2 : 5, { background: 'var(--line)' });
  }
  LAY.forEach(([x, n], l) => { for (let j = 0; j < n; j++) { node(S, `n${l}_${j}`, ...pos(l, j), '', { r: 1.15 }); S.set(`n${l}_${j}`, l + 1, { background: `color-mix(in srgb,var(--accent) ${Math.round(ACT[l][j] * 100)}%,var(--ui))`, 'border-color': 'var(--accent)' }); } });
  [['입력층', 'input'], ['은닉층 1', 'hidden 1'], ['은닉층 2', 'hidden 2'], ['출력층', 'output']].forEach((l, i) => text(S, 'lh' + i, LAY[i][0] - 3, 1.2, l, { w: 6, cls: 'cz-t cz-tc ai-b' }));
  text(S, 'in', .6, 17.6, ['픽셀 값', 'pixel values'], { cls: 'cz-t' });
  text(S, 'o0', 26.6, pos(3, 0)[1] - .6, ['고양이 0.92', 'cat 0.92'], { cls: 'cz-t ai-l ai-g', s: hid() }); text(S, 'o1', 26.6, pos(3, 1)[1] - .6, ['개 0.08', 'dog 0.08'], { cls: 'cz-t', s: hid() }); show(S, ['o0', 'o1'], 5);
  S.cap(1, '입력층에 데이터가 들어오면', 'Data enters the input layer')
    .cap(2, '층마다 가중합 + 활성화로 다음 층 값을 계산', 'Each layer computes weighted sums and activations')
    .cap(4, '깊어질수록 더 추상적인 특징을 표현', 'Deeper layers capture more abstract features')
    .cap(5, '출력층은 클래스별 확률 (소프트맥스)', 'The output layer gives class probabilities (softmax)')
    .cap(6, '이 계산 흐름이 순전파 · 층이 많으면 "딥"러닝', 'This flow is the forward pass · many layers make it “deep”');
  return S;
}
function sBackprop() {
  const S = scene({ id: 'ai-backprop', steps: 6, per: 1.3 });
  const N = { x1: [4, 5], x2: [4, 15.6], h1: [13, 5], h2: [13, 15.6], y: [21.6, 10.3] };
  const E = [['x1', 'h1', '0.50', '0.47'], ['x1', 'h2', '−0.20', '−0.18'], ['x2', 'h1', '0.30', '0.29'], ['x2', 'h2', '0.80', '0.74'], ['h1', 'y', '0.60', '0.52'], ['h2', 'y', '−0.40', '−0.35']];
  E.forEach(([a, b, w0, w1], i) => {
    edge(S, 'e' + i, ...N[a], ...N[b], { h: .14, s: { background: 'var(--line)' } });
    const t = .34, mx = N[a][0] + (N[b][0] - N[a][0]) * t, my = N[a][1] + (N[b][1] - N[a][1]) * t;
    S.label('w' + i, { cls: 'cz-t cz-tc cz-mono ai-s', x: mx - 1.9, y: my - 1.3, w: 3.8 }, [[0, w0], [5, w1]]);
    Object.assign(S.get('w' + i + '~1').s, { color: 'var(--danger)' });
  });
  Object.entries(N).forEach(([k, [x, y]]) => node(S, 'n' + k, x, y, k, { r: 1.5 }));
  box(S, 'loss', 25.6, 8, 5.6, 4.6, ['손실', 'loss'], {}); edge(S, 'el', 23.1, 10.3, 25.6, 10.3, { s: ink });
  S.label('lv', { cls: 'cz-t cz-tc cz-mono ai-l', x: 25.6, y: 13, w: 5.6 }, [[0, ''], [3, '0.42'], [6, '0.31']]);
  S.set('loss', 3, C.bad).set('loss', 6, C.ok);
  fly(S, 'f1', N.x1, N.h1, 1, '', C.cur); fly(S, 'f2', N.x2, N.h2, 1, '', C.cur);
  fly(S, 'f3', N.h1, N.y, 2, '', C.cur); fly(S, 'f4', N.h2, N.y, 2, '', C.cur);
  fly(S, 'b1', [25.6, 10.3], N.y, 4, '∂', C.badf, { r: .8 }); fly(S, 'b2', N.y, N.h1, 5, '∂', C.badf, { r: .8 }); fly(S, 'b3', N.y, N.h2, 5, '∂', C.badf, { r: .8 });
  ['e4', 'e5'].forEach(k => S.set(k, 4, { background: 'var(--danger)' }).set(k, 6, { background: 'var(--line)' })); ['e0', 'e1', 'e2', 'e3'].forEach(k => S.set(k, 5, { background: 'var(--danger)' }).set(k, 6, { background: 'var(--line)' }));
  S.cap(1, '순전파: 입력에서 출력까지 계산하고', 'Forward pass: compute from input to output')
    .cap(3, '정답과 비교해 손실을 구해요', 'Compare with the answer to get the loss')
    .cap(4, '역전파: 손실이 각 가중치 탓인 정도(기울기)를 뒤에서부터', 'Backprop: work out each weight’s share of the blame, from the back')
    .cap(5, '연쇄 법칙으로 앞 층까지 전달하고 가중치를 조금씩 수정', 'The chain rule carries it to earlier layers; weights get nudged')
    .cap(6, '다음 순전파에선 손실이 줄어요 · 이걸 수백만 번 반복', 'Next pass, the loss is lower · repeat millions of times');
  return S;
}
function sCNN() {
  const S = scene({ id: 'ai-cnn', steps: 7, per: 1.15 });
  const IMG = (r, c) => c >= 3 ? 1 : 0, K = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], cs = 2;
  text(S, 'ih', 1, .9, ['입력 이미지 (6×6)', 'Input image (6×6)'], { cls: 'cz-t ai-b' });
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) cell(S, `i${r}_${c}`, 1 + c * cs, 2.6 + r * cs, String(IMG(r, c)), { w: cs - .1, h: cs - .1, cls: 'cz-c ai-xs', s: IMG(r, c) ? { background: 'var(--ink-2)', color: 'var(--ui)' } : {} });
  text(S, 'kh', 14.4, .9, ['필터 (3×3)', 'Filter (3×3)'], { cls: 'cz-t ai-b' });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cell(S, `k${r}_${c}`, 14.4 + c * 1.5, 2.6 + r * 1.5, String(K[r][c]).replace('-', '−'), { w: 1.4, h: 1.4, cls: 'cz-c ai-xs', s: C.cmp });
  const out = (r, c) => { let s = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += IMG(r + i, c + j) * K[i][j]; return s; };
  text(S, 'oh', 21.4, .9, ['특징 맵 (4×4)', 'Feature map (4×4)'], { cls: 'cz-t ai-b' });
  const ORDER = [[0, 0, 1], [0, 1, 2], [0, 2, 3], [0, 3, 4]];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const o = ORDER.find(([a, b]) => a === r && b === c), st = o ? o[2] : 5, v = out(r, c); cell(S, `o${r}_${c}`, 21.4 + c * cs, 2.6 + r * cs, String(v), { w: cs - .1, h: cs - .1, cls: 'cz-c ai-xs', s: hid(v ? C.okf : {}) }); S.set(`o${r}_${c}`, st, { opacity: '1' }); }
  S.el('win', { x: 1, y: 2.6, w: 3 * cs - .1, h: 3 * cs - .1, css: 'border:.22em solid var(--warn);border-radius:.3em;z-index:5', s: hid() });
  S.set('win', 1, { opacity: '1' }); ORDER.forEach(([r, c, st]) => S.move('win', st, 1 + c * cs, 2.6 + r * cs)); S.move('win', 5, 1 + 3 * cs, 2.6 + 3 * cs, { opacity: '0' });
  S.label('calc', { cls: 'cz-t cz-mono ai-l', x: 1, y: 15.4, w: 30 }, [[0, ''], [1, ['왼쪽 −1 × 0 + 오른쪽 +1 × 0 → 0', 'left −1 × 0 + right +1 × 0 → 0']], [2, ['왼쪽 0, 오른쪽 1이 3줄 → 3', 'left 0, right 1 on three rows → 3']], [4, ['양쪽 다 1이면 상쇄 → 0', 'both sides 1 → cancels to 0']], [5, ['세로 경계가 있는 곳만 크게 반응', 'strong response only on the vertical edge']]]);
  S.cap(1, '작은 필터를 이미지 위에 겹쳐 곱하고 더해요 (합성곱)', 'Slide a small filter over the image, multiply and add (convolution)')
    .cap(2, '밝기가 바뀌는 곳에서 값이 커져요', 'Values jump where brightness changes')
    .cap(5, '전체를 훑으면 "세로 경계" 특징 맵 완성', 'Sweep the whole image to get a vertical-edge feature map')
    .cap(6, '필터 값은 사람이 아니라 학습으로 정해져요', 'The filter values are learned, not hand-written')
    .cap(7, '층을 쌓으면 선 → 모양 → 눈·바퀴 → 물체 순으로 인식', 'Stacked layers go from edges to shapes to parts to objects');
  return S;
}

/* ---------- language models ---------- */
function sToken() {
  const S = scene({ id: 'ai-token', steps: 5, per: 1.4 });
  chip(S, 'tx', 1, 1.6, 30, ['고양이가 매트 위에 앉았다', 'Unbelievably, cats nap'], C.soft, { h: 3, cls: 'ai-p ai-lg' });
  const TK = [['고양', 'Un', 21932], ['이가', 'believ', 3011], ['&nbsp;매트', 'ably', 8540], ['&nbsp;위에', ',', 11], ['&nbsp;앉', '&nbsp;cats', 19987], ['았다', '&nbsp;nap', 25103]];
  TK.forEach(([k, e, id], i) => {
    const x = 1 + i * 5.1;
    chip(S, 't' + i, x, 7, 4.6, [k, e], hid([C.soft, C.cmp, C.ok][i % 3]), { h: 2.6 }); S.set('t' + i, 2, { opacity: '1' });
    arrow(S, 'a' + i, x + 2.3, 9.8, x + 2.3, 11.6, { s: hid() }); code(S, 'id' + i, x, 11.8, 4.6, String(id), hid(), 2.2); show(S, ['a' + i, 'id' + i], 3);
  });
  text(S, 'nt', 1, 15.4, ['숫자는 예시예요 · 토크나이저마다 달라요', 'IDs are illustrative · every tokenizer differs'], { cls: 'cz-t', s: hid() }); S.set('nt', 3, { opacity: '1' });
  pill(S, 'cw', 1, 17.2, ['컨텍스트 창·요금·속도 모두 토큰 수로 계산', 'context window, price and speed are all counted in tokens'], { w: 30, h: 2.2, s: hid(C.cmp) }); S.set('cw', 4, { opacity: '1' });
  S.cap(1, '모델은 글자를 그대로 읽지 못해요', 'Models can’t read raw text')
    .cap(2, '자주 나오는 조각(토큰) 단위로 잘라요', 'Text is cut into frequent pieces called tokens')
    .cap(3, '토큰마다 번호가 있고, 모델은 이 숫자 열을 봐요', 'Each token has an ID; the model sees the sequence of numbers')
    .cap(4, '한국어는 영어보다 같은 뜻에 토큰이 더 드는 편', 'Korean often needs more tokens than English for the same meaning')
    .cap(5, 'BPE 같은 방식으로 학습 데이터에서 어휘를 만들어요', 'Vocabularies are learned from data with methods like BPE');
  return S;
}
function sEmbed() {
  const S = scene({ id: 'ai-embed', steps: 6, per: 1.3 });
  const W = [['m', 16, 14, ['남자', 'man'], 'r'], ['w', 23, 14, ['여자', 'woman'], 'r'], ['k', 16, 6, ['왕', 'king'], 'r'], ['q', 23, 6, ['여왕', 'queen'], 'r'], ['c', 4, 14.6, ['고양이', 'cat'], 'a'], ['d', 7.4, 16.6, ['개', 'dog'], 'a'], ['ap', 4.4, 5, ['사과', 'apple'], 'f'], ['bn', 8, 3.6, ['바나나', 'banana'], 'f']];
  const G = { r: 'accent', a: 'ok', f: 'warn' };
  W.forEach(([k, x, y, l, g]) => { dot(S, k, x, y, '', { r: .55, s: hid({ background: 'var(--ink-2)', 'border-color': 'transparent' }) }); S.set(k, 1, { opacity: '1' }).set(k, 2, { background: `var(--${G[g]})` }); text(S, k + 't', x - 3, y - 2, l, { w: 6, cls: 'cz-t cz-tc ai-l', s: hid() }); S.set(k + 't', 1, { opacity: '1' }); });
  [['ga', 2.4, 12.8, 8, 6, 'ok'], ['gf', 2.6, 2, 8.4, 4.6, 'warn'], ['gr', 14.6, 4.4, 12, 11.4, 'accent']].forEach(([k, x, y, w, h, c]) => { S.el(k, { x, y, w, h, css: `border-radius:1.4em;border:.14em dashed var(--${c})`, s: hid() }); S.set(k, 2, { opacity: '.8' }).set(k, 3, { opacity: '0' }); });
  arrow(S, 'mw', 16.7, 14, 22.3, 14, { h: .2, s: hid({ background: 'var(--danger)', 'border-color': 'var(--danger)' }) }); S.set('mw', 3, { opacity: '1' });
  text(S, 'mwt', 17, 14.6, ['"여성" 방향', 'the “female” direction'], { cls: 'cz-t ai-r', s: hid() }); S.set('mwt', 3, { opacity: '1' });
  arrow(S, 'kq', 16.7, 6, 22.3, 6, { h: .2, s: hid({ background: 'var(--danger)', 'border-color': 'var(--danger)' }) }); S.set('kq', 4, { opacity: '1' });
  code(S, 'eq', 1, 18.6, 30, ['왕 − 남자 + 여자 ≈ 여왕', 'king − man + woman ≈ queen'], hid(C.ok), 2.2); S.set('eq', 4, { opacity: '1' });
  text(S, 'cos', 24.6, 8.4, ['cos(왕, 여왕) = 0.78', 'cos(king, queen) = 0.78'], { cls: 'cz-t cz-mono', s: hid() }); S.set('cos', 5, { opacity: '1' });
  text(S, 'cos2', 24.6, 9.8, ['cos(왕, 바나나) = 0.05', 'cos(king, banana) = 0.05'], { cls: 'cz-t cz-mono', s: hid() }); S.set('cos2', 5, { opacity: '1' });
  S.get('cos').x = 17.2; S.get('cos2').x = 17.2; S.get('cos').y = 9.2; S.get('cos2').y = 10.6;
  S.cap(1, '단어(토큰)를 수백~수천 차원의 숫자 벡터로 바꿔요', 'Words (tokens) become vectors with hundreds or thousands of numbers')
    .cap(2, '의미가 비슷하면 공간에서 가까워요', 'Similar meanings sit close together')
    .cap(3, '방향에도 의미가 담겨요', 'Directions carry meaning too')
    .cap(4, '같은 방향으로 옮기면 비슷한 관계', 'Moving the same way gives the analogous word')
    .cap(5, '코사인 유사도로 얼마나 가까운지 재요', 'Cosine similarity measures closeness')
    .cap(6, '검색·추천·RAG가 모두 이 거리를 이용해요 (그림은 2차원으로 줄인 것)', 'Search, recommendations and RAG all use this distance (shown in 2D)');
  return S;
}
function sAttn() {
  const S = scene({ id: 'ai-attn', steps: 6, per: 1.3 });
  const T = ['The', 'animal', 'didn’t', 'cross', 'the', 'street', 'because', 'it', 'was', 'tired'];
  const WT = [.03, .62, .02, .04, .02, .12, .03, .05, .03, .04];
  const X = i => 1 + i * 3.02, w = 2.8;
  T.forEach((t, i) => chip(S, 't' + i, X(i), 6.2, w, t, {}, { h: 2.2, cls: 'ai-p ai-sm' }));
  S.set('t7', 2, C.cmp);
  T.forEach((t, i) => { const h = WT[i] * 11; S.el('b' + i, { cls: 'cz-c ai-xs', x: X(i) + .5, y: 18 - h, w: w - 1, h, html: '', css: 'transform-origin:50% 100%;border-radius:.3em .3em 0 0', s: { transform: 'scaleY(0)', background: 'var(--accent-soft)', 'border-color': 'var(--accent)' } }); S.set('b' + i, 3, { transform: 'none' }); text(S, 'v' + i, X(i), 18 - h - 1.4, WT[i].toFixed(2), { w, cls: 'cz-t cz-tc cz-mono', s: hid() }); S.set('v' + i, 3, { opacity: '1' }); });
  S.set('b1', 4, { background: 'var(--accent)' }).set('b5', 4, { background: 'color-mix(in srgb,var(--accent) 45%,var(--ui))' });
  const a = X(1) + w / 2, b = X(7) + w / 2;
  S.el('arc', { x: a, y: 3.6, w: b - a, h: 2.6, css: 'border:.22em solid var(--accent);border-bottom:none;border-radius:50% 50% 0 0 / 100% 100% 0 0', s: hid() }); S.set('arc', 4, { opacity: '1' });
  const c2 = X(5) + w / 2;
  S.el('arc2', { x: c2, y: 4.6, w: b - c2, h: 1.6, css: 'border:.14em solid color-mix(in srgb,var(--accent) 50%,var(--ui));border-bottom:none;border-radius:50% 50% 0 0 / 100% 100% 0 0', s: hid() }); S.set('arc2', 4, { opacity: '1' });
  code(S, 'mix', 1, .8, 30, ['it의 새 벡터 = 0.62 × animal + 0.12 × street + …', 'new vector for “it” = 0.62 × animal + 0.12 × street + …'], hid(C.ok), 2.2); S.set('mix', 5, { opacity: '1' });
  text(S, 'qk', 1, 8.8, ['"it"이 다른 모든 토큰에 묻는 관련도 (Query · Key)', 'how relevant every token is to “it” (query · key)'], { cls: 'cz-t', s: hid() }); S.set('qk', 3, { opacity: '1' });
  S.cap(1, '문장 속 단어의 뜻은 주변 단어에 따라 달라요', 'A word’s meaning depends on its neighbours')
    .cap(2, '"it"은 무엇을 가리킬까?', 'What does “it” refer to?')
    .cap(3, '모든 토큰과 관련도를 계산해 합이 1이 되게 (소프트맥스)', 'Score every token, then softmax so weights sum to 1')
    .cap(4, '가장 크게 주목한 건 animal', 'The strongest attention goes to “animal”')
    .cap(5, '관련도만큼 섞어 문맥이 반영된 새 표현을 만들어요', 'Blend values by those weights for a context-aware vector')
    .cap(6, '여러 헤드가 문법·지시 대상 등 다른 관계를 동시에 봐요', 'Many heads look at different relations (grammar, reference) at once');
  return S;
}
function sTransformer() {
  const S = scene({ id: 'ai-transformer', steps: 7, per: 1.2 });
  ['The', 'cat', 'sat', 'on', 'the'].forEach((t, i) => chip(S, 'tk' + i, 9 + i * 2.9, 18, 2.6, t, C.soft, { h: 1.8, cls: 'ai-xs' }));
  chip(S, 'emb', 9, 15.2, 14, ['임베딩 + 위치 정보', 'embedding + position'], {}, { h: 2.2, cls: 'ai-p' });
  [2, 1].forEach(k => S.el('bk' + k, { x: 9 + k * .6, y: 4.6 - k * .6, w: 14, h: 9.2, css: 'border-radius:.8em;border:.14em solid var(--rule);background:var(--ui)', s: hid() }));
  S.el('blk', { x: 9, y: 4.6, w: 14, h: 9.2, css: 'border-radius:.8em;border:.14em solid var(--rule);background:var(--ui)' });
  chip(S, 'att', 10, 10.6, 12, ['멀티헤드 셀프 어텐션', 'multi-head self-attention'], {}, { h: 2.2, cls: 'ai-p' });
  chip(S, 'n1', 10, 8.8, 12, 'add & norm', {}, { h: 1.4, cls: 'ai-xs' });
  chip(S, 'ffn', 10, 6.4, 12, ['피드포워드 신경망', 'feed-forward network'], {}, { h: 2.2, cls: 'ai-p' });
  chip(S, 'n2', 10, 5, 12, 'add & norm', {}, { h: 1.4, cls: 'ai-xs' });
  chip(S, 'outl', 9, 1.2, 14, ['선형 + 소프트맥스', 'linear + softmax'], {}, { h: 2.2, cls: 'ai-p' });
  [[16, 17.9, 16, 17.5], [16, 15.1, 16, 13.9], [16, 4.5, 16, 3.5]].forEach(([a, b, c, d], i) => arrow(S, 'up' + i, a, b, c, d, {}));
  text(S, 'xn', 1, 8.4, ['× N층', '× N layers'], { cls: 'cz-t ai-big', s: hid() }); text(S, 'xn2', 1, 10.4, ['(예: 32~100+)', '(e.g. 32–100+)'], { cls: 'cz-t', s: hid() }); show(S, ['xn', 'xn2', 'bk1', 'bk2'], 5);
  S.set('tk0', 1, {}); S.set('emb', 2, C.soft).set('emb', 3, C.idle).set('att', 3, C.soft).set('att', 4, C.idle).set('ffn', 4, C.soft).set('ffn', 5, C.idle).set('outl', 6, C.soft);
  text(S, 'ah', 1.2, 12.6, ['단어끼리 정보 교환', 'tokens share info'], { cls: 'cz-t ai-a', s: hid() }); S.set('ah', 3, { opacity: '1' }).set('ah', 5, { opacity: '0' });
  text(S, 'fh', 1.2, 6.6, ['각 토큰을 따로 가공', 'each token processed'], { cls: 'cz-t ai-a', s: hid() }); S.set('fh', 4, { opacity: '1' }).set('fh', 5, { opacity: '0' });
  [['mat', .41], ['floor', .18], ['sofa', .12], ['bed', .08]].forEach(([t, p], i) => {
    text(S, 'pl' + i, 24.2, 1.4 + i * 2.2, t, { cls: 'cz-t cz-mono', s: hid() });
    S.el('pb' + i, { x: 27.4, y: 1.6 + i * 2.2, w: p * 8, h: 1.2, css: 'transform-origin:0 50%;border-radius:.3em', s: { transform: 'scaleX(0)', background: i ? 'var(--accent-soft)' : 'var(--accent)' } });
    S.set('pl' + i, 6, { opacity: '1' }).set('pb' + i, 6, { transform: 'none' });
  });
  S.cap(1, '입력: "The cat sat on the"', 'Input: “The cat sat on the”')
    .cap(2, '토큰을 벡터로 바꾸고 순서 정보를 더해요', 'Tokens become vectors plus position information')
    .cap(3, '어텐션: 토큰끼리 서로 참고해 문맥 반영', 'Attention lets tokens draw on each other')
    .cap(4, '피드포워드: 토큰마다 지식을 꺼내 가공', 'Feed-forward layers transform each token')
    .cap(5, '이 블록을 수십 층 쌓아요', 'Stack dozens of these blocks')
    .cap(6, '마지막에 다음 토큰의 확률 분포', 'The end produces a probability for every next token')
    .cap(7, 'GPT·Claude·Gemini 같은 LLM의 기본 구조 (2017 "Attention Is All You Need")', 'The core of LLMs like GPT, Claude and Gemini (2017, “Attention Is All You Need”)');
  return S;
}
function sNext() {
  const S = scene({ id: 'ai-nexttoken', steps: 6, per: 1.3 });
  const ctx = [['오늘', 'The'], ['날씨가', 'weather'], ['정말', 'is'], ['', 'really']];
  [['오늘', 'Today'], ['날씨가', 'the weather'], ['정말', 'is really']].forEach((l, i) => chip(S, 'c' + i, 1 + i * 6.4, 1.4, 6, l, C.soft, { h: 2.2, cls: 'ai-p' }));
  chip(S, 'nw', 20.2, 1.4, 6, ['좋네요', 'nice'], hid(C.okf), { h: 2.2, cls: 'ai-p' }); S.set('nw', 3, { opacity: '1' });
  const CAND = [['좋네요', 'nice'], ['흐려요', 'cloudy'], ['덥네요', 'hot'], ['이상해요', 'strange']];
  const PR = [[0, 0, 0, 0], [.52, .21, .14, .06], [.52, .21, .14, .06], [.52, .21, .14, .06], [.9, .07, .02, .01], [.31, .25, .23, .21]];
  CAND.forEach((l, i) => {
    const y = 6.4 + i * 2.8;
    text(S, 'cl' + i, 1, y + .3, l, { w: 6, cls: 'cz-t ai-l' });
    S.el('cb' + i, { x: 7.6, y, w: 18, h: 2, css: 'border-radius:.3em', s: { width: '0em', background: i ? 'var(--accent-soft)' : 'var(--accent)' } });
    S.label('cp' + i, { cls: 'cz-t cz-mono', x: 26.4, y: y + .3, w: 5 }, PR.map((p, st) => [st, st ? p[i].toFixed(2) : '']).filter((v, k, a) => k === 0 || a[k - 1][1] !== v[1]));
    PR.forEach((p, st) => { if (st) S.set('cb' + i, st, { width: (p[i] * 18 / .9).toFixed(2) + 'em' }); });
  });
  S.set('cb0', 3, { background: 'var(--ok)' }).set('cb0', 4, { background: 'var(--accent)' });
  S.label('tp', { cls: 'cz-pill', x: 1, y: 17.8, w: 14, h: 2, s: C.cmp }, [[0, ['온도 1.0', 'temperature 1.0']], [4, ['온도 0.2 · 거의 항상 1등', 'temp 0.2 · nearly always top']], [5, ['온도 1.5 · 다양하지만 엉뚱', 'temp 1.5 · varied, riskier']]]);
  S.cap(1, '지금까지의 문장을 보고', 'Given the text so far')
    .cap(2, '다음에 올 토큰마다 확률을 계산해요', 'the model scores every possible next token')
    .cap(3, '그중 하나를 뽑아 붙이고, 다시 다음 토큰을 예측 (반복)', 'It samples one, appends it, and predicts again')
    .cap(4, '온도를 낮추면 확률이 높은 쪽으로 몰려 일관적', 'Lower temperature sharpens the odds: consistent output')
    .cap(5, '높이면 고르게 퍼져 창의적이지만 엉뚱해질 수 있어요', 'Higher temperature flattens them: creative but less reliable')
    .cap(6, 'LLM의 글쓰기는 결국 "다음 토큰 예측"의 반복', 'All LLM writing is repeated next-token prediction');
  return S;
}
function sVector() {
  const S = scene({ id: 'ai-vector', steps: 5, per: 1.4 });
  col(S, 'map', 1, 1.2, 18.4, 17.4);
  const D = [['d0', 9, 5.6, ['반품 정책', 'return policy']], ['d1', 12.4, 3.6, ['환불 처리 기간', 'refund timeline']], ['d2', 6.4, 8.6, ['교환 방법', 'how to exchange']], ['d3', 15, 13.4, ['배송 조회', 'track a parcel']], ['d4', 4, 15, ['회원 탈퇴', 'delete account']], ['d5', 11, 16.4, ['포인트 적립', 'reward points']], ['d6', 16.4, 10, ['배송비 안내', 'shipping fees']]];
  D.forEach(([k, x, y, l]) => { dot(S, k, x, y, '', { r: .55, s: { background: 'var(--ink-3)', 'border-color': 'transparent' } }); if (k === 'd0' || k === 'd6' || k === 'd3') text(S, k + 't', x - 8.8, y - .5, l, { cls: 'cz-t', w: 8, css: 'text-align:right' }); else if (k === 'd2') text(S, k + 't', x - 4, y + .8, l, { cls: 'cz-t cz-tc', w: 8 }); else text(S, k + 't', x + .8, y - .5, l, { cls: 'cz-t' }); });
  dot(S, 'q', 10.6, 7.6, 'Q', { r: .85, s: hid(C.badf) }); S.set('q', 2, { opacity: '1' });
  chip(S, 'qt', 20.4, 1.2, 10.6, ['"돈 언제 돌려받아요?"', '"When do I get my money back?"'], hid(C.bad), { h: 2.6, cls: 'ai-p' }); S.set('qt', 2, { opacity: '1' });
  const NN = [['d1', 12.4, 3.6, '0.91'], ['d0', 9, 5.6, '0.88'], ['d2', 6.4, 8.6, '0.79']];
  NN.forEach(([k, x, y], i) => { edge(S, 'l' + i, 10.6, 7.6, x, y, { h: .16, s: hid({ background: 'var(--danger)' }) }); S.set('l' + i, 3, { opacity: '1' }); S.set(k, 3, { background: 'var(--danger)', transform: 'scale(1.3)' }); });
  NN.forEach(([k, , , sc], i) => { chip(S, 'r' + i, 20.4, 5 + i * 2.8, 10.6, [`${i + 1}. ${D.find(d => d[0] === k)[3][0]} · ${sc}`, `${i + 1}. ${D.find(d => d[0] === k)[3][1]} · ${sc}`], hid(i ? C.soft : C.ok), { h: 2.2, cls: 'ai-p' }); S.set('r' + i, 4, { opacity: '1' }); });
  text(S, 'kw', 20.4, 14, ['"환불"이라는 단어가 없어도', 'no word “refund” in the query,'], { cls: 'cz-t', s: hid() }); text(S, 'kw2', 20.4, 15.4, ['의미로 찾아요 ✓', 'yet found by meaning ✓'], { cls: 'cz-t ai-g', s: hid() }); show(S, ['kw', 'kw2'], 4);
  S.cap(1, '문서들을 미리 임베딩 벡터로 저장해 둬요', 'Documents are stored as embedding vectors ahead of time')
    .cap(2, '질문도 같은 방식으로 벡터로 바꾸고', 'The question is embedded the same way')
    .cap(3, '가장 가까운(코사인 유사도가 높은) 문서를 찾아요', 'and the nearest documents by cosine similarity are found')
    .cap(4, '키워드가 달라도 뜻이 가까우면 찾아요', 'It matches meaning, not just keywords')
    .cap(5, '수백만 개도 빠르게: 근사 최근접 탐색(HNSW) · pgvector, FAISS, Pinecone', 'Fast at millions: approximate nearest neighbour (HNSW) · pgvector, FAISS, Pinecone');
  return S;
}
function sRAG() {
  const S = scene({ id: 'ai-rag', steps: 6, per: 1.3 });
  chip(S, 'q', 1, 1.4, 12.6, ['Q: 환불은 며칠 걸려요?', 'Q: How long do refunds take?'], C.cmp, { h: 2.6, cls: 'ai-p' });
  arrow(S, 'a1', 13.8, 2.7, 15, 2.7, {}); box(S, 'emb', 15.2, 1.4, 6.6, 2.6, ['임베딩', 'embed'], {});
  arrow(S, 'a2', 22, 2.7, 23.2, 2.7, {}); box(S, 'vdb', 23.4, 1.4, 7.6, 2.6, ['벡터 DB', 'vector DB'], {});
  S.set('emb', 2, C.soft).set('emb', 3, C.idle).set('vdb', 2, C.soft).set('vdb', 3, C.idle);
  fly(S, 'd1', [13.8, 2.7], [23.6, 2.7], 2, '', C.cur);
  const DOC = [['[1] 환불: 영업일 3–5일', '[1] Refunds: 3–5 business days'], ['[2] 카드 취소는 카드사 기준', '[2] Card reversals follow the issuer'], ['[3] 부분 환불 조건', '[3] Partial refund rules']];
  DOC.forEach((l, i) => { chip(S, 'k' + i, 20.4, 6 + i * 2.6, 10.6, l, hid(C.ok), { h: 2.2, cls: 'ai-p ai-sm' }); S.set('k' + i, 3, { opacity: '1' }); S.move('k' + i, 4, 1.6, 9.4 + i * 2.2, { opacity: '0' }); });
  arrow(S, 'a3', 27.2, 4.2, 27.2, 5.8, { s: hid() }); S.set('a3', 3, { opacity: '1' });
  box(S, 'pr', 1, 5.6, 17.6, 9.2, '', { s: hid() }); S.set('pr', 4, { opacity: '1' });
  text(S, 'prh', 1.6, 6, ['프롬프트', 'Prompt'], { cls: 'cz-t ai-b', s: hid() }); S.set('prh', 4, { opacity: '1' });
  [['아래 문서에 근거해 답하고 출처를 달아요.', 'Answer from the documents below; cite sources.'], ['문서: [1] [2] [3]', 'Docs: [1] [2] [3]'], ['질문: 환불은 며칠 걸려요?', 'Q: How long do refunds take?']].forEach((l, i) => { text(S, 'pl' + i, 1.6, 8 + i * 2, l, { cls: 'cz-t', s: hid() }); S.set('pl' + i, 4, { opacity: '1' }); });
  box(S, 'llm', 1, 15.8, 6, 3.6, 'LLM', { s: hid(C.soft) }); S.set('llm', 5, { opacity: '1' });
  arrow(S, 'a4', 7.2, 17.6, 9.2, 17.6, { s: hid() }); S.set('a4', 5, { opacity: '1' });
  chip(S, 'ans', 9.4, 15.8, 21.6, ['영업일 기준 3–5일 걸려요. [1]', 'It takes 3–5 business days. [1]'], hid(C.ok), { h: 3.6, cls: 'ai-p' }); S.set('ans', 5, { opacity: '1' });
  S.cap(1, '사용자가 질문하면', 'A user asks a question')
    .cap(2, '질문을 임베딩해 벡터 DB에서 검색', 'It’s embedded and searched in a vector DB')
    .cap(3, '관련 문서 몇 개를 찾아', 'The most relevant passages come back')
    .cap(4, '질문과 함께 프롬프트에 넣고', 'and go into the prompt with the question')
    .cap(5, 'LLM이 문서에 근거해 출처와 함께 답해요', 'The LLM answers from them, with citations')
    .cap(6, '재학습 없이 최신·사내 지식을 쓰고, 근거로 환각을 줄여요', 'Fresh or private knowledge without retraining · grounding cuts hallucinations');
  return S;
}
function sTrain() {
  const S = scene({ id: 'ai-train', steps: 5, per: 1.5 });
  const ST = [[['사전학습', 'Pretraining'], ['웹·책·코드 수조 토큰', 'trillions of tokens of web, books, code'], ['다음 토큰 예측', 'predict the next token']], [['지시 미세조정', 'Instruction tuning'], ['질문–모범 답안 예시', 'question → model answer pairs'], ['대화 형식을 익힘', 'learns to follow requests']], [['선호 학습', 'Preference tuning'], ['사람·AI가 더 나은 답을 고름', 'people or AI pick better answers'], ['RLHF · 헌법 기반 학습', 'RLHF, constitutional AI']], [['평가·배포', 'Eval & release'], ['안전성·능력 평가', 'safety and capability evals'], ['API·앱으로 제공', 'served via API and apps']]];
  ST.forEach(([h, a, b], i) => {
    const x = 1 + i * 7.8;
    chip(S, 's' + i, x, 1.4, 7, h, hid(C.soft), { h: 3.2, cls: 'ai-p' }); S.set('s' + i, i + 1, { opacity: '1' });
    if (i < 3) { arrow(S, 'a' + i, x + 7.1, 3, x + 7.7, 3, { s: hid() }); S.set('a' + i, i + 2, { opacity: '1' }); }
    text(S, 'ta' + i, x, 5.4, a, { w: 7, cls: 'cz-t ai-xs2', s: hid() }); text(S, 'tb' + i, x, 7, b, { w: 7, cls: 'cz-t ai-xs2 ai-a', s: hid() }); show(S, ['ta' + i, 'tb' + i], i + 1);
  });
  S.label('ex', { cls: 'cz-c ai-code ai-codeL', x: 1, y: 11, w: 30, h: 6.4 }, [[0, ''], [1, ['"고양이가 매트 위에" → "앉았다"<br>빈칸 맞히기를 끝없이 반복하며 언어와 지식을 익혀요', '"The cat sat on the" → "mat"<br>endless fill-in-the-blank teaches language and knowledge']], [2, ['질문: 대한민국의 수도는?<br>답: 서울이에요. 정치·경제의 중심지예요.', 'Q: What is the capital of France?<br>A: Paris. It is the political and economic centre.']], [3, ['답변 A: 친절하고 정확 ✓<br>답변 B: 장황하고 틀림 ✗  → A 쪽으로 조정', 'Answer A: helpful and correct ✓<br>Answer B: rambling and wrong ✗  → shift toward A']], [4, ['벤치마크·레드팀 테스트를 통과하면 공개', 'released after benchmarks and red-team testing']]]);
  Object.assign(S.get('ex~0').s, { opacity: '0' });
  S.cap(1, '1단계: 방대한 글로 다음 토큰 예측을 학습', 'Stage 1: learn next-token prediction on huge text corpora')
    .cap(2, '2단계: 질문에 답하는 방식을 예시로 학습', 'Stage 2: learn to answer from examples')
    .cap(3, '3단계: 더 좋은 답을 고르는 피드백으로 다듬기', 'Stage 3: refine with feedback on which answer is better')
    .cap(4, '평가를 거쳐 서비스로', 'Evaluate, then ship')
    .cap(5, '사전학습이 비용의 대부분 · 그 뒤 단계가 "쓸모 있는 조수"를 만들어요', 'Pretraining costs the most · later stages make it a useful assistant');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'aix-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono aix-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono aix-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c aix-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono aix-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c aix-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'aix-s aix-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono aix-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono aix-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono aix-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono aix-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono aix-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'aix-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'aix-xs', 5));


const CSSX = `
.aix-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.aix-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.aix-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.aix-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.aix-r .in{color:var(--danger);font-weight:800}
.aix-g .in{color:var(--ok);font-weight:800}
.aix-a .in{color:var(--accent);font-weight:800}
.aix-w .in{color:var(--warn);font-weight:800}
.aix-c .in{font-size:.6em;font-weight:700}
.aix-c2 .in{font-size:.5em;font-weight:700}
.aix-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.aix-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'aix-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= basics ================= */
function sTree() {
  const S = scene({ id: 'ai-tree', steps: 5, per: 1.6 });
  frame(S, 'pf', 1, 1, 13, 10, 'ink-3', 0, { w: .08, r: .1 });
  const PX = x => 1 + x * 1.3, PY = y => 11 - y * 1.0;
  const A = [[1, 2], [2, 6], [2.5, 4], [3, 8], [3.8, 3], [1.5, 8.5], [4.2, 6.5], [6, 1.5], [7.5, 2.2], [8.8, 1], [6.8, .8]], B = [[6.5, 5], [7.2, 8], [8.5, 6.5], [9.2, 9], [7.8, 4], [9.5, 4.8], [6.2, 7.5]];
  A.forEach(([x, y], i) => pt(S, 'a' + i, PX(x), PY(y), 0, C.cur, .3)); B.forEach(([x, y], i) => pt(S, 'b' + i, PX(x), PY(y), 0, C.badf, .3));
  seg(S, 's1', [PX(5), 1], [PX(5), 11], 2, 'ink-2', .1); T(S, 's1l', PX(5) + .2, 1.2, 'x < 5', 'cz-mono aix-xs', 2);
  seg(S, 's2', [PX(5), PY(3)], [14, PY(3)], 3, 'ink-2', .1); T(S, 's2l', PX(8.4), PY(3) - .85, 'y < 3', 'cz-mono aix-xs', 3);
  rect(S, 'rA', 1.05, 1.05, PX(5) - 1.1, 9.9, 'accent', 10, 2, { r: 0 }); rect(S, 'rB', PX(5) + .05, 1.05, 14 - PX(5) - .1, PY(3) - 1.1, 'danger', 10, 3, { r: 0 }); rect(S, 'rC', PX(5) + .05, PY(3) + .05, 14 - PX(5) - .1, 11 - PY(3) - .1, 'accent', 10, 3, { r: 0 });
  box2(S, 'n0', 20, 1, 6.4, 1.4, 'x < 5 ?', 'line', 2, { pct: 40 });
  box2(S, 'n1', 16.2, 4.2, 5.6, 1.4, ['파랑 (Gini 0.08)', 'blue (Gini 0.08)'], 'accent', 2, { pct: 30 }); seg(S, 'e1', [23.2, 2.45], [19, 4.15], 2, 'ink-3', .07); T(S, 'e1l', 18.6, 2.9, ['예', 'yes'], 'aix-tiny', 2);
  box2(S, 'n2', 24.4, 4.2, 6.4, 1.4, 'y < 3 ?', 'line', 3, { pct: 40 }); seg(S, 'e2', [23.2, 2.45], [27.6, 4.15], 3, 'ink-3', .07); T(S, 'e2l', 26.4, 2.9, ['아니오', 'no'], 'aix-tiny', 3);
  box2(S, 'n3', 21.4, 7.4, 4.6, 1.4, ['파랑', 'blue'], 'accent', 3, { pct: 30 }); box2(S, 'n4', 26.6, 7.4, 4.4, 1.4, ['빨강', 'red'], 'danger', 3, { pct: 30 }); seg(S, 'e3', [27.6, 5.65], [23.7, 7.35], 3, 'ink-3', .07); seg(S, 'e4', [27.6, 5.65], [28.8, 7.35], 3, 'ink-3', .07);
  [['tree 1 → A', 'accent'], ['tree 2 → B', 'danger'], ['tree 3 → A', 'accent']].forEach(([t, c], i) => box2(S, 'f' + i, 16.2 + i * 5.1, 9.4, 4.8, 1.3, t, c, 4, { pct: 30 }));
  T(S, 'fv', 16.2, 10.9, ['랜덤 포레스트: 다수결 → A', 'random forest: majority → A'], 'aix-xs aix-a', 4);
  stepT(S, 'k', 1, 12.1, [['두 종류의 점을 나누는 규칙을 찾고 싶어요', 'we want rules that separate two kinds of points'], ['질문 하나로 공간을 둘로 · 불순도(Gini = 1 − Σp²)가 가장 많이 줄어드는 질문을 골라요', 'one question splits the space · pick the one that most reduces impurity (Gini = 1 − Σp²)'], ['한쪽을 다시 나누면 순수한 잎이 돼요 · 너무 깊으면 과적합', 'split again for pure leaves · too deep means overfitting']], 'aix-xs aix-a');
  fin(S, 'z', 13.3, [['결정 트리: “예/아니오 질문”을 이어 붙인 해석하기 쉬운 모델', 'a decision tree chains yes/no questions into an easy-to-read model', 'aix-xs aix-a'], ['랜덤 포레스트는 서로 다른 표본·특성으로 만든 나무들의 투표예요', 'random forests vote over trees built on different samples and features'], ['부스팅(XGBoost, LightGBM)은 앞 나무들의 오차를 다음 나무가 고쳐 나가요', 'boosting (XGBoost, LightGBM) adds trees that fix the earlier trees’ errors'], ['표 형태(정형) 데이터에선 지금도 딥러닝보다 강한 경우가 많아요', 'on tabular data they still often beat deep learning']]);
  S.cap(1, '두 종류의 데이터', 'Two classes of data').cap(2, '첫 번째 질문', 'The first question').cap(3, '한 번 더 나누기', 'Split once more').cap(4, '나무 여러 그루의 투표', 'A vote of many trees').cap(5, '결정 트리와 앙상블', 'Decision trees and ensembles');
  return S;
}
function sQlearn() {
  const S = scene({ id: 'ai-qlearn', steps: 5, per: 1.6 });
  const CW = 3.2, X = c => 1 + c * CW, Y = r => 1.2 + r * CW;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const k = `g${r}_${c}`, wall = r === 1 && c === 1, goal = r === 0 && c === 3, pit = r === 1 && c === 3; box2(S, k, X(c), Y(r), CW - .1, CW - .1, goal ? 'G +10' : pit ? ['함정 −10', 'pit −10'] : wall ? ['벽', 'wall'] : '', goal ? 'ok' : pit ? 'danger' : wall ? 'ink-2' : 'line', 0, { pct: goal || pit ? 40 : wall ? 60 : 35 }); }
  T(S, 'st', X(0) + .2, Y(2) + .2, 'S', 'cz-mono aix-s aix-a', 0);
  elb(S, 'ep', [[X(0) + 1.6, Y(2) + 1.6], [X(2) + 1.6, Y(2) + 1.6], [X(2) + 1.6, Y(1) + 1.6], [X(3) + .4, Y(1) + 1.6]], 'danger', 2, { h: .1, off: 3 });
  T(S, 'qv', X(2) + .3, Y(1) + .25, 'Q(→) = −5', 'cz-mono aix-tiny aix-r', 2, { off: 3 });
  const POL = [[0, 0, '→', '6.6'], [0, 1, '→', '7.3'], [0, 2, '→', '8.1'], [1, 0, '↑', '5.9'], [1, 2, '↑', '7.3'], [2, 0, '↑', '5.3'], [2, 1, '→', '5.9'], [2, 2, '↑', '6.6'], [2, 3, '←', '5.9']];
  POL.forEach(([r, c, a, v], i) => { T(S, 'pa' + i, X(c), Y(r) + .7, a, 'cz-tc aix-l aix-g', 3, { w: CW - .1 }); T(S, 'pv' + i, X(c), Y(r) + 2.1, v, 'cz-tc cz-mono aix-tiny', 3, { w: CW - .1 }); });
  code(S, 'cd', 15.4, 1.2, 15.6, ["Q(s,a) ← Q(s,a) + α·[ r + γ·max Q(s′,·) − Q(s,a) ]"], [], { st: 1 });
  T(S, 'c1', 15.4, 3.3, ['α 학습률 · γ 할인율(미래 보상의 가치)', 'α learning rate · γ discount (value of future reward)'], 'aix-xs', 1);
  T(S, 'c2', 15.4, 4.6, ['처음엔 아무렇게나 → 함정에 빠지면 그 행동의 Q가 내려가요', 'random at first → falling in the pit lowers that action’s Q'], 'aix-xs aix-r', 2, { off: 3 });
  T(S, 'c3', 15.4, 4.6, ['수많은 에피소드 뒤: 보상이 거꾸로 퍼져 정책(화살표)이 목표로', 'many episodes later, reward flows back: arrows lead to G'], 'aix-xs aix-g', 3);
  T(S, 'c4', 15.4, 6, ['ε-탐욕: 가끔은 일부러 새로운 행동 (탐험 vs 활용)', 'ε-greedy: sometimes try something new (explore vs exploit)'], 'aix-xs aix-a', 4);
  T(S, 'c5', 15.4, 7.2, ['상태가 너무 많으면 표 대신 신경망으로 Q를 근사 (DQN, 아타리 게임)', 'too many states → approximate Q with a network (DQN, Atari)'], 'aix-xs', 4);
  fin(S, 'z', 11.6, [['강화 학습: 정답 대신 보상을 받으며 시행착오로 “어떤 상태에서 무엇을 할지(정책)”를 배워요', 'reinforcement learning learns a policy, what to do in each state, from rewards by trial and error', 'aix-xs aix-a'], ['Q-러닝은 각 (상태, 행동)의 미래 보상 기대치 Q를 벨만 방정식으로 갱신해요', 'Q-learning updates the expected future reward Q of each (state, action) with the Bellman equation'], ['알파고, 로봇 제어, LLM의 RLHF가 강화 학습을 써요', 'AlphaGo, robot control and RLHF for LLMs all use reinforcement learning']]);
  S.cap(1, '격자 세계와 보상', 'A grid world and rewards').cap(2, '실패에서 배우기', 'Learning from failure').cap(3, '정책이 생겨요', 'A policy emerges').cap(4, '탐험과 확장', 'Exploration and scaling up').cap(5, 'Q-러닝', 'Q-learning');
  return S;
}

/* ================= evaluation ================= */
function sCv() {
  const S = scene({ id: 'ai-cv', steps: 5, per: 1.6 });
  const SC = ['0.86', '0.81', '0.85', '0.83', '0.84'];
  T(S, 't1', 1, .3, ['검증 세트를 한 번만 떼면 운에 따라 점수가 흔들려요', 'a single validation split makes the score depend on luck'], 'aix-xs aix-r', 1, { off: 2 });
  for (let r = 0; r < 5; r++) for (let j = 0; j < 5; j++) { const k = `f${r}_${j}`, v = r === j; box2(S, k, 1 + j * 4.2, 1.4 + r * 1.35, 4, 1.15, v ? ['검증', 'validate'] : ['학습', 'train'], v ? 'warn' : 'accent', r === 0 ? 1 : 2, { pct: v ? 40 : 22 }); }
  for (let r = 0; r < 5; r++) T(S, 's' + r, 22, 1.65 + r * 1.35, SC[r], 'cz-mono aix-xs', 2);
  rect(S, 'test', 25.4, 1.4, 5.6, 6.55, 'ink-3', 20, 1, { r: .2, html: ['테스트 🔒', 'test 🔒'], cls: 'cz-c aix-c2' }); T(S, 'testl', 25.4, 5.6, ['마지막에 한 번만', 'once, at the end'], 'cz-tc aix-tiny', 1, { w: 5.6 });
  T(S, 'mean', 1, 8.4, ['평균 0.84 ± 0.02 → 더 믿을 만한 추정 · 하이퍼파라미터 고르는 데 써요', 'mean 0.84 ± 0.02 → a steadier estimate · use it to pick hyperparameters'], 'aix-xs aix-g', 3);
  T(S, 'ts', 1, 9.6, ['시계열은 섞으면 안 돼요: 과거로 학습, 미래로 검증', 'time series must not be shuffled: train on the past, validate on the future'], 'aix-xs aix-a', 4);
  [[1, 2], [2, 3], [3, 4]].forEach(([n, v], r) => { for (let j = 0; j < n; j++) box2(S, `t${r}_${j}`, 1 + j * 3.4, 10.6 + r * 1.1, 3.2, .95, ['학습', 'train'], 'accent', 4, { pct: 22 }); box2(S, `tv${r}`, 1 + n * 3.4, 10.6 + r * 1.1, 3.2, .95, ['검증', 'validate'], 'warn', 4, { pct: 40 }); });
  T(S, 'lk', 1, 14.1, ['누수 주의: 정규화·특성 선택도 학습 폴드 안에서만', 'avoid leakage: fit scaling and feature selection inside training folds only'], 'aix-xs aix-r', 4);
  fin(S, 'z', 15.5, [['k-겹 교차 검증: 데이터를 k등분해 돌아가며 검증해 성능을 더 안정적으로 추정해요', 'k-fold cross-validation rotates the validation fold for a steadier performance estimate', 'aix-xs aix-a'], ['계층화(클래스 비율 유지), 그룹·시계열 분할처럼 데이터 구조에 맞게 나눠요', 'split to match the data: stratified (keep class ratios), grouped or time-ordered']]);
  S.cap(1, '한 번 나누면 운', 'One split is luck').cap(2, '돌아가며 검증', 'Rotate the validation fold').cap(3, '평균과 편차', 'Mean and spread').cap(4, '시계열과 누수', 'Time series and leakage').cap(5, '교차 검증', 'Cross-validation');
  return S;
}
function sReg() {
  const S = scene({ id: 'ai-reg', steps: 5, per: 1.6 });
  const X = t => 1.4 + t * 1.25, Y = v => 5 - v * 2.6;
  hl(S, 'ax', 1.2, 14.4, 8.4, 'ink-3', 0, { w: .06 });
  const P = [[0, -.3], [1, .75], [2, .95], [3, .2], [4, -.65], [5, -1.05], [6, -.35], [7, .55], [8, 1.05], [9, .4], [10, -.5]];
  P.forEach(([t, v], i) => pt(S, 'p' + i, X(t), Y(v), 0, C.cur, .25));
  poly(S, 'ov', [[X(0), Y(-.3)], [X(.5), Y(.55)], [X(1), Y(.75)], [X(1.5), Y(1.3)], [X(2), Y(.95)], [X(2.5), Y(.2)], [X(3), Y(.2)], [X(3.5), Y(-.6)], [X(4), Y(-.65)], [X(4.5), Y(-1.2)], [X(5), Y(-1.05)], [X(5.5), Y(-.4)], [X(6), Y(-.35)], [X(6.5), Y(.3)], [X(7), Y(.55)], [X(7.5), Y(1.3)], [X(8), Y(1.05)], [X(8.5), Y(.9)], [X(9), Y(.4)], [X(9.5), Y(-.2)], [X(10), Y(-.5)]], { st: 1, color: 'danger', h: .1, off: 3 });
  poly(S, 'sm', [...Array(21)].map((_, i) => { const t = i / 2; return [X(t), Y(Math.sin(t * 1.047 - .52) * .95)]; }), { st: 2, color: 'ok', h: .12 });
  T(S, 'o1', 1, .2, ['규제 없음: 점을 다 지나가려고 출렁여요 (과적합)', 'no regularization: wiggles through every point (overfit)'], 'aix-xs aix-r', 1, { off: 2 });
  T(S, 'o2', 1, .2, ['손실 + λ·‖w‖² → 큰 가중치에 벌점 → 부드러워져요', 'loss + λ·‖w‖² → penalize large weights → smoother'], 'aix-xs aix-g', 2);
  T(S, 'wt', 16.4, .2, ['가중치 크기', 'weight sizes'], 'aix-xs aix-a', 3);
  const W = [[3.2, 2.1, .4, 2.8, 1.5], [1.4, 1.0, .3, 1.2, .7], [1.8, 0, 0, 1.5, 0]];
  [['없음', 'none', 'danger'], ['L2 (릿지)', 'L2 (ridge)', 'accent'], ['L1 (라소)', 'L1 (lasso)', 'ok']].forEach(([k, e, c], g) => { T(S, 'wl' + g, 16.4 + g * 5, 6.9, [k, e], 'cz-tc aix-tiny', 3, { w: 4.6 }); W[g].forEach((h, j) => rect(S, `w${g}_${j}`, 16.6 + g * 5 + j * .9, 6.6 - h * 1.6, .7, Math.max(h * 1.6, .06), c, 50, 3, { r: .05 })); });
  T(S, 'wn', 16.4, 7.8, ['L2는 골고루 줄이고, L1은 일부를 0으로 (특성 선택)', 'L2 shrinks all; L1 zeroes some (feature selection)'], 'aix-xs', 3);
  const N = [[3, [9.6, 11.2, 12.8]], [7.5, [9.2, 10.6, 12, 13.4]], [12, [10.4, 12.2]]];
  N.forEach(([x, ys], l) => ys.forEach((y, j) => { stt(S, `n${l}_${j}`, x, y, '', 'accent', 4, { r: .45, pct: 30 }); }));
  [[0, 1], [1, 3]].forEach(([l, j]) => { tsets(S, `n${l}_${j}`, [[4, 'line', 30]]); xm(S, `dx${l}${j}`, N[l][0], N[l][1][j] + .1, 4); });
  const DROP = { '0_1': 1, '1_3': 1 }; N.slice(0, 2).forEach(([x, ys], l) => ys.forEach((y, j) => N[l + 1][1].forEach((y2, k) => DROP[l + '_' + j] || DROP[(l + 1) + '_' + k] || seg(S, `ce${l}_${j}_${k}`, [x + .45, y], [N[l + 1][0] - .45, y2], 4, 'line', .04))));
  T(S, 'do', 15, 9.6, ['드롭아웃: 학습 때마다 뉴런 일부를 무작위로 끔', 'dropout: randomly switch off neurons on each training step'], 'aix-xs aix-a', 4); T(S, 'do2', 15, 10.6, ['특정 뉴런에 의존하지 못해 일반화가 좋아져요', 'no neuron can be relied on → better generalization'], 'aix-xs', 4); T(S, 'do3', 15, 11.6, ['추론 때는 전부 켜서 써요', 'at inference, all neurons are on'], 'aix-xs', 4);
  fin(S, 'z', 14, [['정규화: 모델이 훈련 데이터에 과하게 맞추지 못하도록 복잡도에 벌점을 주는 기법', 'regularization penalizes complexity so a model can’t over-fit its training data', 'aix-xs aix-a'], ['L1·L2 가중치 벌점, 드롭아웃, 조기 종료, 데이터 증강이 대표적이에요 · λ는 교차 검증으로 골라요', 'L1/L2 penalties, dropout, early stopping and data augmentation are the usual tools · choose λ by cross-validation']]);
  S.cap(1, '출렁이는 과적합', 'A wiggly overfit').cap(2, '가중치 벌점', 'A weight penalty').cap(3, 'L1과 L2', 'L1 vs L2').cap(4, '드롭아웃', 'Dropout').cap(5, '정규화', 'Regularization');
  return S;
}

/* ================= deep learning ================= */
function sAct() {
  const S = scene({ id: 'ai-act', steps: 5, per: 1.6 });
  const X = z => 7.5 + z * 1.1, Y = v => 7 - v * 4.2;
  hl(S, 'ax', 1.4, 13.6, Y(0), 'ink-3', 0, { w: .06 }); seg(S, 'ay', [X(0), 1.4], [X(0), 8.2], 0, 'ink-3', .06);
  const sg = z => 1 / (1 + Math.exp(-z));
  poly(S, 'sg', [...Array(25)].map((_, i) => { const z = -5.5 + i * .46; return [X(z), Y(sg(z))]; }), { st: 1, color: 'accent', h: .12 });
  poly(S, 'sd', [...Array(25)].map((_, i) => { const z = -5.5 + i * .46; return [X(z), Y(sg(z) * (1 - sg(z)))]; }), { st: 1, color: 'warn', h: .1 });
  T(S, 'sgl', 1.2, .4, ['시그모이드 (파랑)와 기울기 (주황, 최대 0.25)', 'sigmoid (blue) and its gradient (orange, max 0.25)'], 'aix-xs aix-a', 1, { off: 3 });
  poly(S, 'rl', [[X(-5.5), Y(0)], [X(0), Y(0)], [X(1.4), Y(1.4 / 1.1 * .26)]], { st: 3, color: 'ok', h: .14 });
  T(S, 'rll', 1.2, .4, ['ReLU = max(0, z): 양수면 기울기 1', 'ReLU = max(0, z): gradient 1 for positive inputs'], 'aix-xs aix-g', 3);
  T(S, 'bt', 16, .4, ['층을 거꾸로 지날 때 기울기 크기', 'gradient size, layer by layer backward'], 'aix-xs aix-a', 2);
  for (let l = 0; l < 8; l++) { const h1 = Math.max(6 * Math.pow(.25, l / 1.6), .08); rect(S, 'gs' + l, 16.4 + l * 1.8, 7.6 - h1, 1.3, h1, 'warn', 50, 2, { r: .05, off: 3 }); rect(S, 'gr' + l, 16.4 + l * 1.8, 7.6 - 5.6 + l * .05, 1.3, 5.6 - l * .05, 'ok', 45, 3, { r: .05 }); T(S, 'gl' + l, 16.2 + l * 1.8, 7.8, 'L' + (8 - l), 'cz-tc cz-mono aix-tiny', 2, { w: 1.7 }); }
  T(S, 'bs', 1, 8.8, ['시그모이드: 0.25씩 곱해져 앞쪽 층은 거의 0 → 기울기 소실', 'sigmoid: ×0.25 per layer, early layers get ~0 → vanishing gradients'], 'aix-xs aix-r', 2, { off: 3 });
  T(S, 'br', 1, 8.8, ['ReLU: 크기가 유지돼 깊은 망도 학습 · 음수 입력은 0 (죽은 ReLU)', 'ReLU keeps the size, so deep nets train · negatives give 0 (dead ReLU)'], 'aix-xs aix-g', 3);
  T(S, 'k4', 1, 10.1, ['요즘 트랜스포머는 GELU·SiLU를 쓰고, 잔차 연결(x + f(x))이 기울기의 지름길이 돼요', 'modern transformers use GELU/SiLU; residual connections (x + f(x)) give gradients a shortcut'], 'aix-xs aix-a', 4); T(S, 'k5', 1, 11.1, ['LayerNorm으로 값의 크기를 고르게, He·Xavier 초기화로 출발점을 잘 잡아요', 'LayerNorm keeps activations in range; He/Xavier init gives a good starting scale'], 'aix-xs', 4);
  fin(S, 'z', 12.6, [['활성화 함수: 뉴런에 비선형성을 줘서 층을 쌓는 의미를 만들어요 (없으면 여러 층 = 한 층)', 'activation functions add non-linearity, which is what makes stacking layers useful', 'aix-xs aix-a'], ['역전파는 층마다 기울기를 곱하므로, 1보다 작으면 사라지고 크면 폭발해요', 'backprop multiplies gradients layer by layer: below 1 they vanish, above 1 they explode'], ['폭발엔 기울기 클리핑, 소실엔 ReLU·잔차 연결·정규화가 처방이에요', 'clip gradients for explosions; use ReLU, residuals and normalization for vanishing']]);
  S.cap(1, '시그모이드와 기울기', 'Sigmoid and its gradient').cap(2, '기울기 소실', 'Vanishing gradients').cap(3, 'ReLU', 'ReLU').cap(4, '현대적 처방', 'Modern remedies').cap(5, '활성화 함수와 기울기 소실', 'Activations and vanishing gradients');
  return S;
}

/* ================= LLM ================= */
function sLora() {
  const S = scene({ id: 'ai-lora', steps: 5, per: 1.6 });
  rect(S, 'W', 1.5, 1.6, 7, 7, 'ink-3', 30, 0, { r: .2, html: ['W (4096 × 4096)', 'W (4096 × 4096)'], cls: 'cz-c aix-c2' });
  tsets(S, 'W', [[1, 'danger', 30], [2, 'ink-3', 30]]); T(S, 'Wl', 1.5, 8.9, ['사전 학습된 가중치', 'pretrained weights'], 'aix-tiny', 0);
  T(S, 'ft', 1.5, .4, ['전체 미세 조정: W 전체(행렬마다 1,677만 개)를 갱신 · GPU 메모리 많이 필요', 'full fine-tuning updates all of W (16.7M per matrix) · lots of GPU memory'], 'aix-xs aix-r', 1, { off: 2 });
  T(S, 'lk', 1.9, 1.9, '🔒', 'aix-l', 2); T(S, 'fz', 1.5, .4, ['LoRA: W는 얼리고 작은 두 행렬 B·A만 학습', 'LoRA: freeze W and train only two small matrices B and A'], 'aix-xs aix-g', 2);
  T(S, 'pl', 9.2, 4.5, '+', 'aix-l', 2);
  rect(S, 'B', 10.6, 1.6, 1, 7, 'ok', 40, 2, { r: .15 }); T(S, 'Bl', 10, 8.9, 'B (4096 × 8)', 'cz-mono aix-tiny aix-g', 2);
  T(S, 'mx', 11.9, 1.5, '×', 'aix-l', 2);
  rect(S, 'A', 13, 1.6, 7, 1, 'ok', 40, 2, { r: .15 }); T(S, 'Al', 13, 2.8, 'A (8 × 4096)', 'cz-mono aix-tiny aix-g', 2);
  T(S, 'eq', 20.6, 4.5, '=', 'aix-l', 2); rect(S, 'dW', 22, 1.6, 7, 7, 'ok', 12, 2, { r: .2, html: ['ΔW (낮은 랭크 r = 8)', 'ΔW (low rank r = 8)'], cls: 'cz-c aix-c2', css: 'border:.1em dashed var(--ok)' });
  T(S, 'out', 13, 4.4, 'h = W·x + B·A·x', 'cz-mono aix-s aix-a', 2);
  T(S, 'pc', 1, 10, ['학습할 파라미터 (행렬 하나)', 'trainable parameters (one matrix)'], 'aix-xs aix-a', 3);
  rect(S, 'p1', 1, 10.9, 24, 1, 'danger', 40, 3, { r: .2, html: ['전체 16,777,216', 'full 16,777,216'], cls: 'cz-c aix-c2' }); rect(S, 'p2', 1, 12.1, .4, 1, 'ok', 70, 3, { r: .1 }); T(S, 'p2l', 1.8, 12.2, ['LoRA 65,536 (0.4%)', 'LoRA 65,536 (0.4%)'], 'cz-mono aix-xs aix-g', 3);
  T(S, 'k4', 1, 13.5, ['작업마다 작은 어댑터만 바꿔 끼워요 · QLoRA는 W를 4비트로 양자화해 더 아껴요', 'swap small adapters per task · QLoRA quantizes W to 4 bits to save more'], 'aix-xs aix-a', 4); T(S, 'k5', 1, 14.5, ['새 지식을 넣을 땐 RAG, 말투·형식을 바꿀 땐 미세 조정이 잘 맞아요', 'new knowledge suits RAG; tone and format suit fine-tuning'], 'aix-xs', 4);
  fin(S, 'z', 15.9, [['LoRA: 큰 모델은 그대로 두고 저랭크 행렬 두 개로 변화량만 학습하는 효율적 미세 조정', 'LoRA fine-tunes efficiently by learning only a low-rank update with two small matrices', 'aix-xs aix-a'], ['미세 조정으로 바뀌는 방향은 랭크가 낮다는 관찰에서 출발해요 · 추론 때는 W에 합쳐 속도 손해가 없어요', 'it rests on the observation that fine-tuning updates are low-rank · merged into W at inference, it costs no speed']]);
  S.cap(1, '전체 미세 조정의 부담', 'The cost of full fine-tuning').cap(2, 'W는 얼리고 B·A만', 'Freeze W, train B·A').cap(3, '파라미터 비교', 'Parameter counts').cap(4, '어댑터와 QLoRA', 'Adapters and QLoRA').cap(5, '미세 조정과 LoRA', 'Fine-tuning and LoRA');
  return S;
}
function sAgent() {
  const S = scene({ id: 'ai-agent', steps: 5, per: 1.6 });
  box2(S, 'user', 1, 1.4, 5, 1.6, ['사용자', 'user'], 'line', 0, { pct: 40 }); box2(S, 'llm', 10.5, 1.4, 7, 1.6, 'LLM', 'accent', 0, { pct: 35 });
  [['weather', 1.2], ['search', 2.8], ['run_code', 4.4]].forEach(([t, y], i) => box2(S, 't' + i, 23.4, y, 7.6, 1.3, t + '()', 'warn', 0, { pct: 30 }));
  T(S, 'tl', 23.4, .3, ['도구 (런타임이 실행)', 'tools (run by the runtime)'], 'aix-tiny aix-w', 0);
  ar(S, 'u1', [6.1, 1.95], [10.4, 1.95], 'ink-3', 1, { h: .1 });
  ar(S, 'c1', [17.6, 1.85], [23.3, 1.85], 'warn', 2, { h: .1 }); T(S, 'c1l', 17.8, .9, ['도구 호출', 'tool call'], 'aix-tiny aix-w', 2);
  ar(S, 'c2', [23.3, 2.55], [17.6, 2.55], 'ok', 3, { h: .1 }); T(S, 'c2l', 17.8, 3.2, ['관찰 결과', 'observation'], 'aix-tiny aix-g', 3);
  ar(S, 'u2', [10.4, 2.55], [6.1, 2.55], 'accent', 3, { h: .1 });
  code(S, 'tr', 1, 6, 30, [['user: 서울 날씨 어때? 우산 챙길까?', 'user: weather in Seoul? should I take an umbrella?'], 'assistant → tool_call weather({"city": "Seoul"})', 'tool → {"rain_prob": 0.8, "temp": 14}', ['assistant: 비 올 확률 80%예요. 우산 챙기세요.', 'assistant: 80% chance of rain, take an umbrella.']], [[0, 1], [1, 2], [3, 3], [2, 4]], { hoff: 5 });
  T(S, 'lp', 1, 4.3, ['생각 → 도구 호출 → 관찰 → … → 최종 답 (루프)', 'think → call a tool → observe → … → final answer (a loop)'], 'aix-xs aix-a', 2);
  [['도구 결과는 데이터일 뿐: 그 안의 “지시”를 따르면 프롬프트 인젝션', 'tool output is data: obeying “instructions” inside it is prompt injection'], ['권한 최소화 · 위험한 행동은 사람 승인 · 단계 수 제한 · 모든 호출 기록', 'least privilege · human approval for risky actions · step limits · log every call']].forEach((t, i) => T(S, 'r' + i, 1, 12 + i * 1.1, t, 'aix-xs' + (i ? '' : ' aix-r'), 4));
  fin(S, 'z', 14.4, [['에이전트: LLM이 도구를 골라 부르고 결과를 보며 여러 단계를 스스로 이어 가는 구조', 'an agent lets an LLM choose and call tools, read the results and chain several steps itself', 'aix-xs aix-a'], ['모델은 구조화된 호출(JSON)만 내고, 실제 실행과 권한 관리는 런타임이 맡아요', 'the model only emits structured calls (JSON); the runtime executes them and enforces permissions']]);
  S.cap(1, '질문이 들어와요', 'A question arrives').cap(2, '도구를 부르기로 결정', 'Decide to call a tool').cap(3, '결과를 보고 답하기', 'Answer from the result').cap(4, '안전장치', 'Guardrails').cap(5, 'LLM 에이전트와 도구 사용', 'LLM agents and tool use');
  return S;
}

return { css: CSSX, secs: [], add: {
  'ai-basics': [
    item('ai-tree', '결정 트리와 앙상블', 'Decision trees and ensembles', '“x < 5인가?” 같은 예/아니오 질문을 이어 붙여 데이터를 나누는 모델이에요. 여러 나무를 모으면(앙상블) 훨씬 강해져요.', '각 단계에서 불순도(Gini = 1 − Σp²)가 가장 많이 줄어드는 특성과 임계값으로 공간을 둘로 나누고, 순수해질 때까지 반복해요. 해석하기 쉽지만 너무 깊으면 과적합해요. 랜덤 포레스트는 서로 다른 표본과 특성으로 만든 나무들의 다수결, 그래디언트 부스팅(XGBoost, LightGBM)은 앞 나무들의 오차를 다음 나무가 고쳐 나가요. 표 형태 데이터에선 지금도 딥러닝보다 강한 경우가 많아요.', 'A model that splits data with a chain of yes/no questions such as “x < 5?”; combining many trees (an ensemble) makes it far stronger.', 'At each step it splits on the feature and threshold that most reduce impurity (Gini = 1 − Σp²), repeating until leaves are pure. Trees are easy to read but overfit when too deep. Random forests take a majority vote over trees built on different samples and features, while gradient boosting (XGBoost, LightGBM) adds trees that fix the previous ones’ errors. On tabular data they still often beat deep learning.', sTree()),
    item('ai-qlearn', 'Q-러닝 (강화 학습)', 'Q-learning (reinforcement learning)', '정답 대신 보상을 받으며 시행착오로 “어떤 상태에서 무엇을 할지(정책)”를 배우는 강화 학습의 대표 알고리즘이에요.', '격자 세계에서 에이전트는 각 (상태, 행동)의 미래 보상 기대치 Q를 Q ← Q + α[r + γ·max Q(s′) − Q]로 갱신해요. 처음엔 함정에 빠지며 그 행동의 Q가 내려가고, 에피소드가 쌓이면 목표의 보상이 거꾸로 퍼져 목표로 향하는 정책이 생겨요. ε-탐욕으로 탐험과 활용을 섞고, 상태가 많으면 신경망으로 Q를 근사해요(DQN). 알파고, 로봇 제어, LLM의 RLHF가 강화 학습을 써요.', 'The classic reinforcement-learning algorithm: learn by trial and error from rewards, rather than labels, which action to take in each state (a policy).', 'In a grid world the agent updates the expected future reward Q of each (state, action) with Q ← Q + α[r + γ·max Q(s′) − Q]. Early on, falling into the pit lowers that action’s Q; over many episodes the goal’s reward propagates back and a policy pointing to the goal emerges. ε-greedy mixes exploration and exploitation, and with many states a neural network approximates Q (DQN). AlphaGo, robot control and RLHF for LLMs all use reinforcement learning.', sQlearn())
  ],
  'ai-eval': [
    item('ai-cv', '교차 검증', 'Cross-validation', '데이터를 k등분해 돌아가며 한 조각으로 검증하고 나머지로 학습해, 성능을 운에 덜 흔들리게 추정하는 방법이에요.', '검증 세트를 한 번만 떼면 어떤 데이터가 걸렸는지에 따라 점수가 흔들려요. 5-겹 교차 검증은 다섯 번 돌아가며 0.86, 0.81 … 같은 점수를 얻어 평균 0.84 ± 0.02처럼 보고, 하이퍼파라미터를 고르는 데 써요. 테스트 세트는 따로 떼어 마지막에 한 번만 봐요. 시계열은 섞지 말고 과거로 학습·미래로 검증하고, 정규화나 특성 선택도 학습 폴드 안에서만 해야 정보 누수가 없어요.', 'Split the data into k folds and rotate which one is used for validation, giving a performance estimate less swayed by luck.', 'With a single validation split, the score depends on which examples landed in it. Five-fold cross-validation rotates through five splits, reporting scores like 0.86, 0.81, … as a mean of 0.84 ± 0.02, and guides hyperparameter choice. The test set stays locked away until one final check. Time series must not be shuffled: train on the past and validate on the future, and fit scaling or feature selection inside training folds only to avoid leakage.', sCv()),
    item('ai-reg', '정규화와 드롭아웃', 'Regularization and dropout', '모델이 훈련 데이터에 과하게 맞추지 못하도록 복잡도에 벌점을 주는 기법들이에요. L1·L2 벌점, 드롭아웃, 조기 종료가 대표적이에요.', '벌점이 없으면 모델이 잡음까지 따라가며 출렁여요. 손실에 λ·‖w‖²(L2, 릿지)를 더하면 큰 가중치가 억제돼 곡선이 부드러워지고, λ·‖w‖₁(L1, 라소)은 일부 가중치를 정확히 0으로 만들어 특성 선택 효과가 있어요. 드롭아웃은 학습 단계마다 뉴런 일부를 무작위로 꺼서 특정 뉴런에 기대지 못하게 하고, 추론 때는 모두 켜요. λ 같은 강도는 교차 검증으로 골라요.', 'Techniques that penalize complexity so a model can’t over-fit its training data: L1/L2 penalties, dropout and early stopping are the staples.', 'Without a penalty the model chases noise and wiggles. Adding λ·‖w‖² (L2, ridge) to the loss restrains large weights and smooths the fit, while λ·‖w‖₁ (L1, lasso) drives some weights exactly to zero, selecting features. Dropout randomly switches off some neurons at each training step so none can be relied on, with all of them active at inference. Choose strengths like λ by cross-validation.', sReg())
  ],
  'ai-deep': [
    item('ai-act', '활성화 함수와 기울기 소실', 'Activations and vanishing gradients', '활성화 함수는 뉴런에 비선형성을 줘요. 그런데 시그모이드처럼 기울기가 작으면, 역전파 때 층을 지날수록 기울기가 사라져 깊은 망이 학습되지 않아요.', '시그모이드의 기울기는 최대 0.25라서 층마다 곱해지면 앞쪽 층에는 거의 0이 도착해요(기울기 소실). ReLU = max(0, z)는 양수에서 기울기 1이라 크기가 유지돼 깊은 망을 학습할 수 있지만, 음수 입력만 받으면 죽은 ReLU가 돼요. 요즘 트랜스포머는 GELU·SiLU를 쓰고, 잔차 연결(x + f(x))이 기울기의 지름길이 되며, LayerNorm과 He 초기화도 함께 써요. 기울기 폭발은 클리핑으로 막아요.', 'Activation functions give neurons non-linearity, but with small gradients like the sigmoid’s, backpropagated gradients fade layer by layer and deep networks stop learning.', 'The sigmoid’s gradient peaks at 0.25, so multiplied across layers almost nothing reaches the early ones: vanishing gradients. ReLU = max(0, z) has gradient 1 for positive inputs, preserving magnitude so deep nets can train, though units that only see negatives die. Modern transformers use GELU or SiLU, residual connections (x + f(x)) give gradients a shortcut, and LayerNorm and He initialization help; exploding gradients are clipped.', sAct())
  ],
  'ai-llm': [
    item('ai-lora', '미세 조정과 LoRA', 'Fine-tuning and LoRA', '사전 학습된 큰 모델을 내 작업에 맞게 추가 학습하는 게 미세 조정이에요. LoRA는 원래 가중치는 얼리고 작은 저랭크 행렬 두 개만 학습해 비용을 크게 줄여요.', '4096 × 4096 가중치 행렬 하나를 통째로 갱신하면 파라미터가 1,677만 개지만, LoRA는 W를 고정하고 ΔW = B·A(4096 × 8, 8 × 4096)만 학습해 65,536개(0.4%)면 돼요. 출력은 W·x + B·A·x이고, 추론 때는 ΔW를 W에 합쳐 속도 손해가 없어요. 작업마다 작은 어댑터만 바꿔 끼우고, QLoRA는 W를 4비트로 양자화해 더 아껴요. 새로운 지식은 RAG, 말투·형식은 미세 조정이 잘 맞아요.', 'Fine-tuning further trains a pretrained model for your task; LoRA freezes the original weights and trains just two small low-rank matrices, slashing the cost.', 'Updating a single 4096 × 4096 weight matrix means 16.7 million parameters, but LoRA freezes W and learns only ΔW = B·A (4096 × 8 and 8 × 4096): 65,536 parameters, 0.4%. The output is W·x + B·A·x, and at inference ΔW merges into W at no speed cost. Small adapters are swapped per task, and QLoRA saves more by quantizing W to 4 bits. New knowledge suits RAG; tone and format suit fine-tuning.', sLora()),
    item('ai-agent', 'LLM 에이전트와 도구 사용', 'LLM agents and tool use', 'LLM이 필요한 도구를 골라 호출하고, 결과를 보고 다음 행동을 정하는 일을 반복해 여러 단계의 작업을 해내는 구조예요.', '“서울 날씨 어때? 우산 챙길까?”라는 질문에 모델은 weather({"city": "Seoul"}) 같은 구조화된 호출(JSON)을 내고, 런타임이 실제로 실행해 {"rain_prob": 0.8}을 돌려주면 그걸 읽고 답해요. 생각 → 호출 → 관찰을 끝날 때까지 반복해요. 도구 결과는 데이터일 뿐이라 그 안의 “지시”를 따르면 프롬프트 인젝션이 되니, 권한을 최소화하고 위험한 행동은 사람 승인을 받고, 단계 수를 제한하고 모든 호출을 기록해요.', 'A setup where an LLM picks and calls tools, reads the results and decides the next action, repeating to complete multi-step tasks.', 'Asked “weather in Seoul? should I take an umbrella?”, the model emits a structured call (JSON) such as weather({"city": "Seoul"}); the runtime executes it and returns {"rain_prob": 0.8}, which the model reads to answer. Think → call → observe repeats until done. Tool output is only data, and obeying “instructions” inside it is prompt injection, so keep privileges minimal, require human approval for risky actions, cap the number of steps and log every call.', sAgent())
  ]
} };
})();

window.UX = page([
  sec('ai-basics', '기초', 'Basics', '머신러닝 기초', 'Machine learning basics',
    '데이터로부터 규칙을 배우는 기본 방식과 도구예요.', 'The core ways and tools for learning rules from data.', [
    item('ai-types', '지도 · 비지도 · 강화 학습', 'Supervised, unsupervised, reinforcement', '정답이 있는 예시로 배우면 지도, 정답 없이 구조를 찾으면 비지도, 행동하고 보상을 받으며 배우면 강화 학습이에요.', '대부분의 실무 문제(분류, 예측)는 지도 학습이에요. 라벨이 부족하면 자기지도 학습(LLM 사전학습)도 많이 써요.', 'Learning from labelled examples is supervised, finding structure without labels is unsupervised, and learning by acting for rewards is reinforcement learning.', 'Most practical problems (classification, prediction) are supervised; when labels are scarce, self-supervised learning (as in LLM pretraining) is common.', sTypes()),
    item('ai-linreg', '선형 회귀', 'Linear regression', '데이터를 가장 잘 설명하는 직선(y = ax + b)을 찾아요. 오차 제곱의 평균(MSE)이 가장 작은 직선이 답이에요.', '집값·수요 예측 같은 수치 예측의 기본선(baseline)이에요. 복잡한 모델을 쓰기 전에 꼭 먼저 비교해 보세요.', 'Find the straight line (y = ax + b) that best describes the data: the one with the smallest mean squared error.', 'The baseline for numeric predictions like prices and demand; always compare against it before reaching for complex models.', sLinReg()),
    item('ai-gd', '경사 하강법', 'Gradient descent', '손실(오차)이 줄어드는 방향, 즉 기울기의 반대 방향으로 가중치를 조금씩 움직여 최솟값을 찾아요.', '딥러닝 학습의 엔진이에요. 실제로는 데이터를 조금씩 나눠(미니배치) 쓰는 SGD, Adam 같은 변형을 써요.', 'Repeatedly nudge the weights against the gradient, the direction in which loss falls, until you reach a minimum.', 'The engine of deep learning; in practice, mini-batch variants such as SGD and Adam are used.', sGD()),
    item('ai-lr', '학습률', 'Learning rate', '경사 하강법에서 한 번에 움직이는 크기예요. 너무 작으면 느리고, 너무 크면 최솟값을 지나쳐 발산해요.', '가장 먼저 튜닝하는 하이퍼파라미터예요. 처음엔 크게 시작해 점점 줄이는 스케줄(워밍업·코사인 감소)을 많이 써요.', 'The step size in gradient descent: too small is slow, too large overshoots and diverges.', 'Usually the first hyperparameter to tune; schedules with warm-up and cosine decay are common.', sLR()),
    item('ai-classify', '분류와 결정 경계', 'Classification and decision boundaries', '입력이 어느 종류(클래스)인지 예측해요. 모델은 특징 공간을 나누는 경계를 학습하고, 확률도 함께 내요.', '스팸 필터, 사기 탐지, 이미지 분류가 모두 분류 문제예요. 로지스틱 회귀, 결정 트리, 그래디언트 부스팅(XGBoost)이 실무 단골이에요.', 'Predict which class an input belongs to; the model learns a boundary through feature space and outputs probabilities.', 'Spam filters, fraud detection and image labelling are all classification; logistic regression, decision trees and gradient boosting (XGBoost) are workhorses.', sClassify()),
    item('ai-kmeans', 'K-평균 군집화', 'K-means clustering', '중심 K개를 정하고, 점을 가장 가까운 중심에 배정한 뒤 중심을 평균으로 옮기는 과정을 반복해 데이터를 묶어요.', '고객 세분화, 문서 묶기, 이미지 색 줄이기에 써요. K는 사람이 정하고(엘보 방법), 시작 위치에 따라 결과가 달라질 수 있어요.', 'Pick K centres, assign each point to the nearest one, move centres to the mean, and repeat to form groups.', 'Used for customer segments, document grouping and colour reduction; you choose K (e.g. the elbow method) and results depend on the start.', sKMeans()),
    item('ai-split', '학습 · 검증 · 테스트 분리', 'Train, validation and test splits', '데이터를 학습용, 검증용(설정 고르기), 테스트용(최종 평가)으로 나눠 처음 보는 데이터에 대한 실력을 재요.', '테스트 데이터가 학습에 섞이는 데이터 누수를 조심하세요. 시간 순서가 있는 데이터는 무작위가 아니라 시간으로 나눠요.', 'Split data into training, validation (for choosing settings) and test (for the final grade) to measure performance on unseen data.', 'Watch for data leakage into training; split time-ordered data by time, not at random.', sSplit())
  ].concat(XT.add['ai-basics'] || [])),
  sec('ai-eval', '평가', 'Evaluation', '일반화와 평가', 'Generalization and evaluation',
    '처음 보는 데이터에서도 잘 맞히는지 확인하고 측정하는 방법이에요.', 'Checking and measuring how well a model handles unseen data.', [
    item('ai-overfit', '과적합 vs 과소적합', 'Overfitting vs underfitting', '너무 단순하면 패턴을 못 잡고(과소적합), 너무 복잡하면 잡음까지 외워 새 데이터에서 틀려요(과적합).', '학습 점수만 높고 검증 점수가 낮으면 과적합이에요. 데이터를 늘리거나 모델을 단순하게, 정규화를 강하게 하세요.', 'Too simple misses the pattern (underfitting); too complex memorizes noise and fails on new data (overfitting).', 'High training but low validation scores signal overfitting; add data, simplify the model or regularize more.', sOverfit()),
    item('ai-early', '학습 곡선과 조기 종료', 'Learning curves and early stopping', '에폭마다 학습·검증 손실을 그려 보면 과적합이 시작되는 지점이 보여요. 검증 손실이 가장 낮을 때 학습을 멈춰요.', '드롭아웃, 가중치 감소(L2), 데이터 증강도 과적합을 줄여요. 학습 곡선은 모든 실험에서 기본으로 확인하세요.', 'Plotting training and validation loss per epoch shows where overfitting begins; stop when validation loss is lowest.', 'Dropout, weight decay (L2) and data augmentation also curb overfitting; always check learning curves.', sEarly()),
    item('ai-confusion', '혼동 행렬 · 정밀도 · 재현율', 'Confusion matrix, precision, recall', '예측과 실제를 2×2 표(TP·FP·FN·TN)로 정리하고, 정밀도(양성 판정의 정확도)와 재현율(실제 양성을 찾은 비율)을 계산해요.', '양성이 드문 데이터에선 정확도가 속여요. 둘을 함께 보는 F1 점수와, 클래스별 지표를 확인하세요.', 'Tabulate predictions against reality (TP, FP, FN, TN), then compute precision (how right the positives are) and recall (how many real positives were found).', 'Accuracy misleads when positives are rare; look at F1, which balances both, and at per-class metrics.', sConfusion()),
    item('ai-pr', '임계값과 정밀도-재현율 트레이드오프', 'Thresholds and the precision–recall trade-off', '모델 점수를 양성으로 판정하는 기준선(임계값)을 올리면 정밀도가, 내리면 재현율이 올라가요.', '오탐과 미탐 중 무엇이 더 비싼지로 임계값을 정하세요. PR 곡선과 ROC 곡선으로 전체 모양을 비교해요.', 'Raising the score threshold for a positive call boosts precision; lowering it boosts recall.', 'Pick the threshold by which mistake costs more, false alarms or misses; compare models with PR and ROC curves.', sPR())
  ].concat(XT.add['ai-eval'] || [])),
  sec('ai-deep', '딥러닝', 'Deep learning', '신경망과 딥러닝', 'Neural networks and deep learning',
    '뉴런을 층층이 쌓아 복잡한 패턴을 학습하는 방법이에요.', 'Stacking layers of neurons to learn complex patterns.', [
    item('ai-neuron', '인공 뉴런 (퍼셉트론)', 'Artificial neuron', '입력에 가중치를 곱해 더하고 편향을 더한 뒤 활성화 함수를 통과시켜 출력해요.', '활성화 함수는 ReLU가 가장 흔하고, 확률이 필요한 마지막 층엔 시그모이드·소프트맥스를 써요. 비선형 함수가 있어야 복잡한 패턴을 표현해요.', 'Multiply inputs by weights, add them up with a bias, and pass the result through an activation function.', 'ReLU is the most common activation, with sigmoid or softmax on output layers that need probabilities; non-linearity is what lets networks model complex patterns.', sNeuron()),
    item('ai-mlp', '신경망과 순전파', 'Neural networks and the forward pass', '뉴런을 여러 층으로 연결해 입력층 → 은닉층 → 출력층으로 값을 계산해 나가요.', '층이 깊을수록 더 추상적인 특징을 배워요. 표 형식 데이터는 여전히 그래디언트 부스팅이 강한 경우가 많아요.', 'Neurons are wired in layers, and values are computed from the input layer through hidden layers to the output.', 'Deeper layers learn more abstract features; on tabular data, gradient boosting often still wins.', sMLP()),
    item('ai-backprop', '역전파', 'Backpropagation', '출력의 오차를 뒤에서부터 연쇄 법칙으로 나눠 각 가중치의 기울기를 구하고, 경사 하강법으로 가중치를 고쳐요.', 'PyTorch, JAX 같은 프레임워크가 자동 미분으로 대신 계산해요. 기울기가 너무 작아지거나 커지는 문제는 정규화 층·잔차 연결로 막아요.', 'Propagate the output error backwards with the chain rule to get each weight’s gradient, then update weights with gradient descent.', 'Frameworks like PyTorch and JAX do it with automatic differentiation; normalization layers and residual connections tame vanishing or exploding gradients.', sBackprop()),
    item('ai-cnn', '합성곱 신경망 (CNN)', 'Convolutional neural networks', '작은 필터를 이미지 위로 밀며 곱하고 더해, 경계·질감 같은 지역 패턴을 찾는 특징 맵을 만들어요.', '이미지 분류, 물체 탐지, 의료 영상에 많이 써요. 요즘은 비전 트랜스포머(ViT)와 함께 쓰거나 비교해 골라요.', 'Slide small filters across an image, multiplying and summing, to build feature maps that detect local patterns such as edges and textures.', 'Common in image classification, object detection and medical imaging; today often combined with or compared against vision transformers (ViT).', sCNN())
  ].concat(XT.add['ai-deep'] || [])),
  sec('ai-llm', '언어 모델', 'Language models', '언어 모델과 LLM', 'Language models and LLMs',
    '글을 숫자로 바꾸고, 문맥을 이해하고, 다음 말을 만들어 내는 방법이에요.', 'Turning text into numbers, modelling context, and generating what comes next.', [
    item('ai-token', '토큰화', 'Tokenization', '글을 모델이 다루는 작은 조각(토큰)으로 자르고 각 조각에 번호를 붙여요.', '컨텍스트 창, API 요금, 응답 속도 모두 토큰 수로 계산돼요. 한국어는 같은 내용에 토큰이 더 드는 편이에요.', 'Split text into small pieces (tokens) the model works with, and give each piece an ID.', 'Context windows, API pricing and speed are all measured in tokens; some languages need more tokens for the same content.', sToken()),
    item('ai-embed', '임베딩', 'Embeddings', '단어나 문장을 의미를 담은 숫자 벡터로 바꿔요. 뜻이 비슷하면 벡터 공간에서 가까워요.', '의미 검색, 추천, 중복 탐지, 분류의 입력으로 써요. 같은 임베딩 모델로 만든 벡터끼리만 비교할 수 있어요.', 'Turn words or sentences into vectors of numbers that capture meaning; similar meanings land close together.', 'Used for semantic search, recommendations, duplicate detection and as classifier inputs; only compare vectors from the same embedding model.', sEmbed()),
    item('ai-attn', '어텐션', 'Attention', '각 토큰이 다른 모든 토큰과의 관련도를 계산하고, 그 비율만큼 정보를 섞어 문맥을 반영한 표현을 만들어요.', '트랜스포머의 핵심이에요. 계산량이 문장 길이의 제곱으로 늘어서 긴 컨텍스트에선 효율화 기법(FlashAttention 등)을 써요.', 'Each token scores its relevance to every other token and blends their information by those weights, producing a context-aware representation.', 'The heart of the transformer; cost grows with the square of sequence length, so long contexts rely on optimizations like FlashAttention.', sAttn()),
    item('ai-transformer', '트랜스포머', 'Transformer', '임베딩 위에 어텐션과 피드포워드 층으로 된 블록을 수십 층 쌓고, 마지막에 다음 토큰의 확률을 내요.', '현재 LLM, 번역, 음성 인식, 이미지 모델 대부분의 기본 구조예요. 2017년 논문 "Attention Is All You Need"에서 나왔어요.', 'Stack dozens of blocks of attention and feed-forward layers on top of embeddings, ending in a probability for each next token.', 'The backbone of today’s LLMs, translation, speech recognition and many image models, introduced in the 2017 paper “Attention Is All You Need”.', sTransformer()),
    item('ai-nexttoken', '다음 토큰 예측과 온도', 'Next-token prediction and temperature', 'LLM은 지금까지의 글을 보고 다음 토큰의 확률을 계산해 하나를 뽑고, 붙이고, 다시 예측하기를 반복해요.', '온도가 낮으면 일관되고, 높으면 다양하지만 엉뚱해져요. 코드·사실 답변은 낮게, 아이디어 내기는 높게 써요.', 'An LLM scores every possible next token, samples one, appends it and repeats.', 'Low temperature gives consistent output, high temperature varied but riskier output; use low for code and facts, higher for brainstorming.', sNext()),
    item('ai-vector', '벡터 검색', 'Vector search', '문서를 임베딩 벡터로 저장해 두고, 질문 벡터와 가장 가까운 문서를 찾아요. 단어가 달라도 뜻으로 찾아요.', 'pgvector, FAISS, Pinecone 같은 도구가 근사 최근접 탐색(HNSW)으로 빠르게 찾아요. 키워드 검색(BM25)과 섞는 하이브리드 검색이 실무에서 강해요.', 'Store documents as embedding vectors and find the ones closest to the question’s vector, matching meaning rather than exact words.', 'Tools like pgvector, FAISS and Pinecone use approximate nearest-neighbour indexes (HNSW); hybrid search mixing in keyword search (BM25) works well in practice.', sVector()),
    item('ai-rag', 'RAG (검색 증강 생성)', 'RAG (retrieval-augmented generation)', '질문과 관련된 문서를 검색해 프롬프트에 함께 넣고, LLM이 그 문서에 근거해 답하게 해요.', '재학습 없이 최신·사내 지식을 쓸 수 있고 출처를 보여 줄 수 있어요. 품질은 문서 쪼개기(청킹)와 검색 정확도에 크게 좌우돼요.', 'Retrieve documents relevant to the question, put them in the prompt, and have the LLM answer from them.', 'Brings in fresh or private knowledge without retraining and enables citations; quality depends heavily on chunking and retrieval accuracy.', sRAG()),
    item('ai-train', 'LLM 학습 단계', 'How LLMs are trained', '방대한 글로 다음 토큰 예측을 배우는 사전학습, 지시를 따르게 하는 미세조정, 더 나은 답을 고르는 선호 학습을 거쳐요.', '사전학습이 비용의 대부분이에요. 회사에서는 보통 처음부터 학습하지 않고 프롬프트, RAG, 미세조정 순서로 검토해요.', 'Pretraining on vast text to predict the next token, instruction tuning to follow requests, and preference tuning to favour better answers.', 'Pretraining is most of the cost; companies usually try prompting, then RAG, then fine-tuning rather than training from scratch.', sTrain())
  ].concat(XT.add['ai-llm'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.ai-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.ai-p .in{font-family:inherit;font-size:.72em;font-weight:700;line-height:1.25;text-align:center}
.ai-sm .in{font-size:.62em}
.ai-code{place-items:center start!important;padding-left:.7em}
.ai-code .in{font-family:var(--f-mono);font-size:.6em;font-weight:600;line-height:1.5}
.ai-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.ai-l .in{font-size:.9em;color:var(--ink);font-weight:700}
.ai-s .in{font-size:.6em;color:var(--ink-2);font-weight:700}
.ai-xs .in{font-size:.55em;font-weight:700}
.ai-xs2 .in{font-size:.6em;white-space:normal}
.ai-r .in{color:var(--danger);font-weight:800}
.ai-g .in{color:var(--ok);font-weight:800}
.ai-a .in{color:var(--accent);font-weight:800}
.ai-w .in{color:var(--warn);font-weight:800}
.ai-big .in{font-size:1.4em;font-weight:900;color:var(--ink)}
.ai-big2 .in{font-size:1.5em;font-weight:900}
.ai-nsm .in{font-size:.6em}
.ai-lg .in{font-size:1.05em}
.ai-codeL .in{font-size:.78em}`;
})();
