(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, seq, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c se-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const code = (S, k, x, y, w, t, st, h) => cell(S, k, x, y, t, { w, h: h || 2, cls: 'cz-c se-code', s: st });
const vbar = (S, k, x, base, w, h, st, step, lab) => { S.el(k, { cls: 'cz-c se-xs', x, y: base - h, w, h, html: lab || '', css: 'transform-origin:50% 100%;border-radius:.35em .35em 0 0', s: Object.assign({ transform: 'scaleY(0)' }, st) }); S.set(k, step, { transform: 'none' }); };
const BAD = { background: 'var(--danger-soft)', 'border-color': 'var(--danger)' };
const OK = { background: 'color-mix(in srgb,var(--ok) 30%,var(--ui))', 'border-color': 'var(--ok)' };
const nb = s => s.replace(/^ +/, m => '&nbsp;'.repeat(m.length));

/* ---------- process ---------- */
function sWaterfall() {
  const S = scene({ id: 'se-waterfall', steps: 6, per: 1.2 });
  text(S, 'h1', 19, 1.4, ['폭포수', 'Waterfall'], { cls: 'cz-t se-b' });
  text(S, 'h1s', 19, 3, ['한 단계를 끝내야 다음 단계로', 'finish one phase, then the next'], { cls: 'cz-t' });
  const W = [['요구사항', 'Requirements'], ['설계', 'Design'], ['구현', 'Build'], ['테스트', 'Test'], ['배포', 'Release']];
  W.forEach((l, i) => { chip(S, 'w' + i, 1 + i * 3.4, 1.4 + i * 2.1, 8, l, {}, { h: 1.8, cls: 'se-p' }); S.set('w' + i, i + 1, C.soft); if (i < 4) S.set('w' + i, i + 2, C.ok); });
  text(S, 'fb', 23.2, 10.2, ['← 첫 피드백이 이제야', '← first feedback, at last'], { cls: 'cz-t se-r', s: hid() }); S.set('fb', 5, { opacity: '1' });
  text(S, 'h2', 1, 12.8, ['반복·점진형', 'Iterative · incremental'], { cls: 'cz-t se-b' });
  ['v0.1', 'v0.2', 'v0.3', 'v1.0'].forEach((v, i) => {
    chip(S, 'v' + i, 1 + i * 7.8, 14.6, 7, v, hid(C.soft), { h: 2.4 });
    text(S, 'f' + i, 1 + i * 7.8, 17.5, ['피드백 ✓', 'feedback ✓'], { w: 7, cls: 'cz-t cz-tc se-g', s: hid() });
    show(S, ['v' + i, 'f' + i], i + 1);
  });
  S.cap(1, '폭포수는 단계를 차례로 · 반복형은 작게 만들어 자주 내보내요', 'Waterfall goes phase by phase · iterative ships small slices often')
    .cap(5, '폭포수는 마지막에야 사용자 반응을 알아요', 'Waterfall hears from users only at the end')
    .cap(6, '요구가 분명하고 잘 안 바뀌면 폭포수도 맞아요 (규제·하드웨어)', 'Waterfall still fits fixed requirements (regulated, hardware)');
  return S;
}
function sAgile() {
  const S = scene({ id: 'se-agile', steps: 5, per: 1.3 });
  text(S, 'h', 1, .9, ['애자일 선언 (2001)', 'Agile Manifesto (2001)'], { cls: 'cz-t se-b' });
  const V = [[['개인과 상호작용', 'Individuals and interactions'], ['프로세스와 도구', 'processes and tools']], [['동작하는 소프트웨어', 'Working software'], ['포괄적인 문서', 'comprehensive documentation']], [['고객과의 협력', 'Customer collaboration'], ['계약 협상', 'contract negotiation']], [['변화에 대응하기', 'Responding to change'], ['계획을 따르기', 'following a plan']]];
  V.forEach(([a, b], i) => {
    const y = 2.8 + i * 4.3;
    chip(S, 'a' + i, 1, y, 14, a, hid(C.ok), { h: 3, cls: 'se-p' });
    text(S, 'o' + i, 15.2, y + .95, ['보다', 'over'], { w: 2.4, cls: 'cz-t cz-tc', s: hid() });
    chip(S, 'b' + i, 17.8, y, 13.2, b, hid(), { h: 3, cls: 'se-p' });
    show(S, ['a' + i, 'o' + i, 'b' + i], i + 1); S.set('b' + i, i + 1, { opacity: '.45' });
  });
  S.cap(1, '왼쪽을 더 중시해요', 'We value the items on the left more')
    .cap(5, '오른쪽도 가치 있어요 · 핵심은 짧게 만들고 배우고 고치기', 'The right still matters · build in short loops, learn, adjust');
  return S;
}
function sScrum() {
  const S = scene({ id: 'se-scrum', steps: 7, per: 1.15 });
  text(S, 'hb', 1, .7, ['제품 백로그', 'Product backlog'], { cls: 'cz-t se-b' });
  box(S, 'sp', 9.6, 1.4, 13, 13.6, '', {});
  text(S, 'hs', 10.2, 1.9, ['스프린트 · 1–4주', 'Sprint · 1–4 weeks'], { cls: 'cz-t se-b' });
  node(S, 'dy', 20.2, 6.6, ['데일리<br>스크럼', 'Daily<br>scrum'], { r: 2.1, cls: 'cz-n se-nsm' });
  text(S, 'dyt', 18.1, 9.1, ['매일 15분', '15 min a day'], { w: 4.2, cls: 'cz-t cz-tc' });
  S.set('dy', 3, C.cur).set('dy', 5, C.idle);
  arrow(S, 'ab', 8.2, 6, 9.4, 6, {}); arrow(S, 'ai', 22.8, 3.6, 24, 3.6, {});
  [...'ABCDEF'].forEach((c, i) => chip(S, 'c' + i, 1, 2.4 + i * 1.9, 7, [`스토리 ${c}`, `Story ${c}`], {}, { h: 1.6, cls: 'se-p' }));
  chip(S, 'c6', 1, 2.4 + 3 * 1.9, 7, ['스토리 G', 'Story G'], hid(C.cmp), { h: 1.6, cls: 'se-p' }); S.set('c6', 6, { opacity: '1' });
  for (let i = 0; i < 3; i++) { S.move('c' + i, 2, 10.4, 4.2 + i * 2.3, C.soft); S.move('c' + i, 5, 24.6, 2.6, { opacity: '0' }); }
  for (let i = 3; i < 6; i++) S.move('c' + i, 2, 1, 2.4 + (i - 3) * 1.9);
  S.set('c0', 3, C.ok).set('c1', 3, C.cmp).set('c1', 4, C.ok).set('c2', 4, C.ok);
  box(S, 'inc', 24.2, 1.4, 7, 4.6, ['증분<br>(출시 가능)', 'Increment<br>(shippable)'], { s: hid() }); S.set('inc', 5, Object.assign({ opacity: '1' }, C.ok));
  chip(S, 'rv', 24.2, 7.4, 7, ['스프린트 리뷰', 'Sprint review'], {}, { h: 2.4, cls: 'se-p' }); S.set('rv', 6, C.soft).set('rv', 7, C.idle);
  chip(S, 'rt', 24.2, 10.6, 7, ['회고', 'Retrospective'], {}, { h: 2.4, cls: 'se-p' }); S.set('rt', 7, C.cmp);
  [['PO · 무엇을 먼저 할지', 'PO · what comes first'], ['SM · 장애물 제거', 'SM · clears blockers'], ['개발자 · 어떻게 만들지', 'Developers · decide how']]
    .forEach((l, i) => chip(S, 'ro' + i, 1 + i * 10.2, 16.4, 9.6, l, {}, { h: 2.6, cls: 'se-p' }));
  S.cap(1, '해야 할 일을 우선순위대로 줄 세운 제품 백로그', 'A product backlog ordered by priority')
    .cap(2, '스프린트 계획: 이번에 끝낼 만큼만 가져와요', 'Sprint planning pulls in what fits')
    .cap(3, '매일 15분 데일리 스크럼으로 진행·장애물 공유', 'A 15-minute daily scrum shares progress and blockers')
    .cap(5, '스프린트 끝엔 실제로 동작하는 증분', 'Each sprint ends with a working increment')
    .cap(6, '리뷰에서 받은 피드백은 다시 백로그로', 'Review feedback flows back into the backlog')
    .cap(7, '회고: 다음 스프린트는 어떻게 더 잘할까?', 'Retro: how do we work better next sprint?');
  return S;
}
/* card board: cards [[key,label,col]], moves {step:[[key,col]]}; cards stack top-down per column */
function board(S, colX, y0, gap, w, h, cards, moves, cls) {
  const order = colX.map(() => []), colOf = {};
  cards.forEach(([k, , c]) => { order[c].push(k); colOf[k] = c; });
  const place = () => { const p = {}; order.forEach((ks, c) => ks.forEach((k, j) => { p[k] = [colX[c], y0 + j * gap]; })); return p; };
  let cur = place();
  cards.forEach(([k, l]) => chip(S, k, cur[k][0], cur[k][1], w, l, {}, { h, cls }));
  Object.keys(moves).map(Number).sort((a, b) => a - b).forEach(st => {
    moves[st].forEach(([k, c]) => { order[colOf[k]].splice(order[colOf[k]].indexOf(k), 1); order[c].push(k); colOf[k] = c; });
    const nx = place();
    Object.keys(nx).forEach(k => { if (nx[k][0] !== cur[k][0] || nx[k][1] !== cur[k][1]) S.move(k, st, nx[k][0], nx[k][1]); });
    cur = nx;
  });
  return cur;
}
function sKanban() {
  const S = scene({ id: 'se-kanban', steps: 7, per: 1.1 });
  const X = [1, 11.4, 21.8];
  [['할 일', 'To do'], ['진행 중', 'Doing'], ['완료', 'Done']].forEach((l, i) => {
    S.el('col' + i, { x: X[i], y: 2.6, w: 9.4, h: 15.6, css: 'border-radius:.8em;background:color-mix(in srgb,var(--line) 40%,transparent)' });
    text(S, 'ch' + i, X[i] + .2, .9, l, { cls: 'cz-t se-b' });
  });
  pill(S, 'wip', 17.2, .7, 'WIP ≤ 2', { w: 4, h: 1.6 });
  S.set('wip', 3, C.badf).set('wip', 4, { background: 'var(--accent-soft)', color: 'var(--ink)', 'border-color': 'transparent' });
  const T = [['k0', ['로그인 버그', 'Login bug'], 0], ['k1', ['검색 필터', 'Search filter'], 0], ['k2', ['결제 API', 'Payment API'], 0], ['k3', ['알림 설정', 'Notifications'], 0], ['k4', ['다크 모드', 'Dark mode'], 0]];
  board(S, X.map(x => x + .4), 3.2, 2.8, 8.6, 2.2, T, { 1: [['k0', 1]], 2: [['k1', 1]], 4: [['k0', 2]], 5: [['k2', 1]], 6: [['k1', 2], ['k3', 1]] }, 'se-p');
  S.move('k2', 3, 3.2, 3.2, C.bad).move('k2', 4, 1.4, 3.2, C.idle);
  S.set('k0', 1, C.soft).set('k1', 2, C.soft).set('k0', 4, C.ok).set('k2', 5, C.soft).set('k1', 6, C.ok).set('k3', 6, C.soft);
  S.cap(1, '일을 카드로 보이게 하고 왼쪽에서 오른쪽으로 흘려요', 'Make work visible as cards flowing left to right')
    .cap(3, 'WIP 한도가 차면 새 일을 시작하지 않아요', 'When the WIP limit is full, nothing new starts')
    .cap(4, '하나를 끝내야 다음을 당겨와요 (풀 방식)', 'Finish one, then pull the next (pull system)')
    .cap(7, '스프린트 없이 흐름과 리드 타임을 관리 · 운영·유지보수 팀에 잘 맞아요', 'No sprints: manage flow and lead time · great for ops and support');
  return S;
}
function sStory() {
  const S = scene({ id: 'se-story', steps: 7, per: 1.05 });
  box(S, 'card', 1, 1, 30, 9.6, '', {});
  const R = [[['누가', 'As a'], ['로그인한 쇼핑객으로서', 'signed-in shopper'], C.soft], [['무엇을', 'I want'], ['장바구니가 저장되길 원해요', 'my cart to be saved'], C.cmp], [['왜', 'so that'], ['나중에 이어서 살 수 있도록', 'I can finish buying later'], C.ok]];
  R.forEach(([k, v, st], i) => { const y = 1.8 + i * 2.8; chip(S, 'k' + i, 1.8, y, 6, k, hid(st), { h: 2.2 }); text(S, 'v' + i, 8.6, y + .45, v, { cls: 'cz-t se-l', s: hid() }); show(S, ['k' + i, 'v' + i], i + 1); });
  text(S, 'ah', 1, 11.6, ['인수 조건', 'Acceptance criteria'], { cls: 'cz-t se-b', s: hid() }); S.set('ah', 4, { opacity: '1' });
  [['새로고침해도 담은 상품이 남아 있다', 'Items survive a page refresh'], ['다른 기기에서 로그인해도 보인다', 'Visible after signing in on another device'], ['30일이 지나면 비워진다', 'Cleared after 30 days']].forEach((l, j) => {
    const y = 13.2 + j * 2.5;
    cell(S, 'cb' + j, 1.4, y, '✓', { w: 1.8, h: 1.8, s: hid({ color: 'transparent' }) });
    text(S, 'ct' + j, 4, y + .3, l, { cls: 'cz-t se-l', s: hid() });
    show(S, ['cb' + j, 'ct' + j], 4); S.set('cb' + j, 5 + j, C.okf);
  });
  S.cap(1, '사용자 스토리: 누가', 'User story: who').cap(2, '무엇을 원하고', 'wants what').cap(3, '왜 필요한지 한 문장으로', 'and why, in one sentence')
    .cap(4, '구체적인 인수 조건을 붙이면', 'Add concrete acceptance criteria').cap(5, '하나씩 확인할 수 있어요', 'and each one can be checked')
    .cap(7, '인수 조건이 곧 테스트 케이스이자 "완료"의 기준이에요', 'Criteria double as test cases and the definition of done');
  return S;
}
function sBurn() {
  const S = scene({ id: 'se-burndown', steps: 7, per: 1.05 });
  const ox = 3, oy = 17, ux = 1.6, uy = .35, P = (d, p) => [ox + d * ux, oy - p * uy];
  edge(S, 'ax', ox, oy, 19.6, oy, { s: { background: 'var(--ink-3)' } }); edge(S, 'ay', ox, oy, ox, 2.4, { s: { background: 'var(--ink-3)' } });
  text(S, 'yl', 1, .9, ['남은 작업 (포인트)', 'Remaining work (points)'], { cls: 'cz-t se-b' });
  text(S, 'xl', 13.4, 17.5, ['스프린트 10일', '10-day sprint'], { cls: 'cz-t' });
  const [i1, i2] = [P(0, 40), P(10, 0)];
  edge(S, 'id', i1[0], i1[1], i2[0], i2[1], { s: { background: 'repeating-linear-gradient(90deg,var(--ink-3) 0 .5em,transparent .5em .9em)' } });
  text(S, 'lg1', 11.6, 2.4, ['- - 이상선', '- - ideal'], { cls: 'cz-t' }); text(S, 'lg2', 11.6, 3.6, ['── 실제', '── actual'], { cls: 'cz-t se-a' });
  const pts = [[0, 40], [2, 36], [4, 33], [6, 22], [8, 12], [10, 3]];
  pts.forEach((p, i) => { if (!i) return; const a = P(...pts[i - 1]), b = P(...p); edge(S, 'e' + i, a[0], a[1], b[0], b[1], { h: .2, s: hid({ background: 'var(--accent)' }) }); S.set('e' + i, i, { opacity: '1' }); });
  pts.forEach((p, i) => { const [x, y] = P(...p); dot(S, 'p' + i, x, y, '', { r: .42, s: i ? hid(C.cur) : C.cur }); if (i) S.set('p' + i, i, { opacity: '1' }); });
  text(S, 'vh', 21.8, .9, ['속도 (Velocity)', 'Velocity'], { cls: 'cz-t se-b' });
  edge(S, 'vx', 21.8, 17, 31.2, 17, { s: { background: 'var(--ink-3)' } });
  [28, 32, 30].forEach((v, i) => { vbar(S, 'vb' + i, 22.4 + i * 2.9, 17, 2.4, v * uy, C.soft, 6, String(v)); text(S, 'vl' + i, 22.4 + i * 2.9, 17.4, 'S' + (i + 1), { w: 2.4, cls: 'cz-t cz-tc' }); });
  edge(S, 'avg', 21.8, 17 - 30 * uy, 31.2, 17 - 30 * uy, { h: .16, s: hid({ background: 'repeating-linear-gradient(90deg,var(--warn) 0 .5em,transparent .5em .9em)' }) });
  text(S, 'avt', 21.8, 4.4, ['평균 30', 'avg 30'], { cls: 'cz-t se-w', s: hid() }); show(S, ['avg', 'avt'], 7);
  S.cap(1, '번다운 차트: 남은 작업이 날마다 줄어드는 모습', 'Burndown: remaining work shrinking day by day')
    .cap(3, '이상선보다 위에 있으면 일정이 밀리는 중', 'Above the ideal line means falling behind')
    .cap(4, '막힌 일을 풀면 다시 따라잡아요', 'Clearing a blocker lets the team catch up')
    .cap(6, '속도: 지난 스프린트마다 끝낸 포인트', 'Velocity: points finished in past sprints')
    .cap(7, '평균 속도로 다음 분량을 정해요 · 추정은 약속이 아니라 예측', 'Plan with average velocity · estimates are forecasts, not promises');
  return S;
}

/* ---------- testing ---------- */
function sPyramid() {
  const S = scene({ id: 'se-pyramid', steps: 5, per: 1.3 });
  const L = [[['단위 테스트', 'Unit tests'], 2, 14.6, 20, C.ok, ['수천 개 · 밀리초', 'thousands · ms']], [['통합 테스트', 'Integration'], 5.2, 11, 13.6, C.soft, ['수백 개 · 초', 'hundreds · seconds']], [['E2E · UI', 'E2E · UI'], 8.4, 7.4, 7.2, C.cmp, ['수십 개 · 분', 'dozens · minutes']]];
  L.forEach(([l, x, y, w, st, n], i) => { chip(S, 'l' + i, x, y, w, [`${l[0]}<br><span class="se-n">${n[0]}</span>`, `${l[1]}<br><span class="se-n">${n[1]}</span>`], hid(st), { h: 3.2, cls: 'se-p' }); S.set('l' + i, i + 1, { opacity: '1' }); });
  arrow(S, 'up', 23.2, 17.6, 23.2, 7.6, { s: hid() });
  text(S, 't1', 24.2, 7.2, ['느림 · 비쌈', 'slow · costly'], { cls: 'cz-t se-r', s: hid() });
  text(S, 't2', 24.2, 16.6, ['빠름 · 저렴', 'fast · cheap'], { cls: 'cz-t se-g', s: hid() });
  show(S, ['up', 't1', 't2'], 4); ['up', 't1', 't2'].forEach(k => S.set(k, 5, { opacity: '0' }));
  text(S, 'kh', 24.2, 6.4, ['✗ 아이스크림 콘', '✗ Ice-cream cone'], { cls: 'cz-t se-r', s: hid() });
  chip(S, 'k0', 24.2, 8.2, 7, 'E2E', hid(C.bad), { h: 2.4 }); chip(S, 'k1', 25.4, 10.9, 4.6, ['통합', 'Int.'], hid(C.cmp), { h: 2.4 }); chip(S, 'k2', 26.6, 13.6, 2.2, ['단위', 'Unit'], hid(C.ok), { h: 2.4, cls: 'se-xs' });
  show(S, ['kh', 'k0', 'k1', 'k2'], 5);
  S.cap(1, '가장 많이: 빠르고 싼 단위 테스트', 'Most tests: fast, cheap unit tests')
    .cap(2, '모듈이 함께 동작하는지 통합 테스트', 'Integration tests check modules together')
    .cap(3, '실제 사용자 흐름은 E2E로 꼭 필요한 만큼만', 'E2E covers key user journeys, sparingly')
    .cap(4, '위로 갈수록 느리고 비싸고 자주 깨져요', 'Higher up: slower, costlier, flakier')
    .cap(5, '거꾸로 된 모양(아이스크림 콘)이면 CI가 느리고 불안정해요', 'Upside down (ice-cream cone) makes CI slow and flaky');
  return S;
}
function sTDD() {
  const S = scene({ id: 'se-tdd', steps: 6, per: 1.25 });
  const N = { r: [7, 4.4], g: [11.6, 12.6], f: [2.6, 12.6] };
  link(S, 'rg', N.r, N.g, 2.4, 2.5, {}); link(S, 'gf', N.g, N.f, 2.4, 2.5, {}); link(S, 'fr', N.f, N.r, 2.4, 2.5, {});
  node(S, 'nr', ...N.r, ['RED<br>실패하는 테스트', 'RED<br>failing test'], { r: 2.2, cls: 'cz-n se-nsm' });
  node(S, 'ng', ...N.g, ['GREEN<br>통과시키기', 'GREEN<br>make it pass'], { r: 2.2, cls: 'cz-n se-nsm' });
  node(S, 'nf', ...N.f, ['REFACTOR<br>정리', 'REFACTOR<br>clean up'], { r: 2.2, cls: 'cz-n se-nsm' });
  S.set('nr', 1, C.badf).set('nr', 2, C.idle).set('ng', 2, C.okf).set('ng', 3, C.idle).set('nr', 3, C.badf).set('nr', 4, C.idle).set('ng', 4, C.okf).set('ng', 5, C.idle).set('nf', 5, C.cur);
  text(S, 'th', 15.6, 1, ['테스트', 'Test'], { cls: 'cz-t se-b' });
  code(S, 't0', 15.6, 2.4, 15.4, 'expect(add(2, 3)).toBe(5)', hid()); S.set('t0', 1, { opacity: '1' });
  code(S, 't1', 15.6, 4.8, 15.4, 'expect(add(1, 1)).toBe(2)', hid()); S.set('t1', 3, { opacity: '1' });
  text(S, 'chh', 15.6, 7.8, ['구현', 'Code'], { cls: 'cz-t se-b' });
  S.label('c', { cls: 'cz-c se-code', x: 15.6, y: 9.2, w: 15.4, h: 3.2 }, [[0, ['// 아직 없음', '// nothing yet']], [2, 'const add = () => 5'], [4, 'const add = (a, b) => a + b'], [5, 'const add = (a: number, b: number)<br>&nbsp;&nbsp;=> a + b']]);
  S.label('st', { cls: 'cz-pill', x: 15.6, y: 13.6, w: 9, h: 2.6 }, [[0, ''], [1, ['✗ 실패', '✗ failing']], [2, ['✓ 통과', '✓ passing']], [3, ['✗ 1개 실패', '✗ 1 failing']], [4, ['✓ 2개 통과', '✓ 2 passing']]]);
  [[0, { background: 'transparent' }], [1, C.badf], [2, C.okf], [3, C.badf], [4, C.okf]].forEach(([i, st]) => Object.assign(S.get('st~' + i).s, st));
  S.cap(1, 'RED: 원하는 동작을 테스트로 먼저 써요 (실패)', 'RED: write a test for the behaviour first (it fails)')
    .cap(2, 'GREEN: 통과할 만큼만 가장 단순하게', 'GREEN: the simplest code that passes')
    .cap(3, '다음 테스트가 가짜 구현을 깨뜨려요', 'The next test breaks the fake')
    .cap(4, '일반화해서 다시 통과', 'Generalize and pass again')
    .cap(5, 'REFACTOR: 테스트를 안전망 삼아 정리', 'REFACTOR: clean up with tests as a safety net')
    .cap(6, '몇 분 단위의 짧은 사이클 · 테스트가 설계를 이끌어요', 'Cycles of minutes · tests drive the design');
  return S;
}
function sBDD() {
  const S = scene({ id: 'se-bdd', steps: 5, per: 1.3 });
  text(S, 'h', 1, .9, ['시나리오: 잔액이 부족하면 출금 거절', 'Scenario: refuse withdrawal on low balance'], { cls: 'cz-t se-b' });
  const L = [['Given', ['잔액이 10,000원인 계좌가 있고', 'an account holds $100'], C.soft], ['When', ['20,000원을 출금하면', 'I withdraw $200'], C.cmp], ['Then', ['출금이 거절되고', 'the withdrawal is refused'], C.bad], ['And', ['잔액은 10,000원 그대로다', 'the balance stays $100'], C.ok]];
  L.forEach(([k, t, st], i) => { const y = 2.6 + i * 3.4; chip(S, 'k' + i, 1, y, 4.6, k, hid(st), { h: 2.4 }); text(S, 't' + i, 6.2, y + .55, t, { cls: 'cz-t se-l', s: hid() }); show(S, ['k' + i, 't' + i], Math.min(i + 1, 4)); });
  box(S, 'acc', 21, 2.6, 9.6, 5, ['계좌<br>10,000원', 'Account<br>$100'], { s: hid() }); S.set('acc', 1, { opacity: '1' }).set('acc', 4, C.ok);
  chip(S, 'tk', 22.6, 13, 6.4, ['출금 20,000원', 'withdraw $200'], hid(C.cmp), { h: 2.2, cls: 'se-p' }); S.move('tk', 2, 22.6, 8.2, { opacity: '1' }); S.set('tk', 3, C.bad);
  pill(S, 'rj', 21, 11, ['✗ 잔액 부족', '✗ insufficient funds'], { w: 9.6, h: 2.2, s: hid(C.badf) }); S.set('rj', 3, { opacity: '1' });
  S.cap(1, 'Given: 시작 상태', 'Given: the starting state').cap(2, 'When: 사용자의 행동', 'When: the user’s action').cap(3, 'Then: 기대하는 결과', 'Then: the expected outcome')
    .cap(5, '기획·QA·개발이 같은 문장으로 합의 → 그대로 자동 테스트 (Cucumber 등)', 'Plain sentences everyone agrees on, run as tests (Cucumber etc.)');
  return S;
}
function sDouble() {
  const S = scene({ id: 'se-double', steps: 5, per: 1.3 });
  box(S, 'sut', 1, 8.4, 8.4, 4.4, ['테스트 대상<br>OrderService', 'Under test<br>OrderService'], { s: C.soft });
  const D = [[['실제 결제 API', 'Real payments API'], 'Stub', ['결제 API 대신', 'for payments'], ['정해진 값을 돌려줘요', 'returns canned answers'], C.soft],
    [['실제 메일 발송', 'Real email sender'], 'Mock', ['메일 발송 대신', 'for email'], ['호출됐는지 검증해요', 'verifies the call'], C.cmp],
    [['실제 DB', 'Real database'], 'Fake', ['DB 대신', 'for the DB'], ['메모리로 가볍게 구현', 'light in-memory version'], C.ok],
    [['실제 분석 로거', 'Real analytics'], 'Spy', ['로거 대신', 'for analytics'], ['호출을 기록해 둬요', 'records every call'], C.soft]];
  D.forEach(([real, name, sub, desc, st], i) => {
    const y = 1.2 + i * 4.9;
    arrow(S, 'a' + i, 9.6, 10.6, 12.4, y + 1.8, {});
    box(S, 'db' + i, 12.6, y, 8.8, 3.6, '', {}); S.set('db' + i, i + 1, st);
    S.label('dl' + i, { cls: 'cz-bx', x: 12.6, y, w: 8.8, h: 3.6 }, [[0, real], [i + 1, [`${name}<br><span class="se-n">${sub[0]}</span>`, `${name}<br><span class="se-n">${sub[1]}</span>`]]]);
    text(S, 'ds' + i, 22.2, y + 1.3, desc, { cls: 'cz-t', s: hid() }); S.set('ds' + i, i + 1, { opacity: '1' });
  });
  S.cap(1, 'Stub: 정해진 응답만 돌려줘요 ("승인됨")', 'Stub: returns a fixed answer ("approved")')
    .cap(2, 'Mock: 기대한 호출이 일어났는지 검증해요', 'Mock: asserts the expected call happened')
    .cap(3, 'Fake: 실제처럼 동작하는 가벼운 구현', 'Fake: a working, lightweight implementation')
    .cap(4, 'Spy: 그대로 통과시키며 호출을 기록해요', 'Spy: lets calls through and records them')
    .cap(5, '느리고 불안정한 외부 의존을 바꿔 끼워 빠르고 결정적인 테스트로', 'Swap slow, flaky dependencies for fast, deterministic tests');
  return S;
}
function sCov() {
  const S = scene({ id: 'se-coverage', steps: 4, per: 1.5 });
  ['function fee(order) {', '  if (order.total > 50000)', '    return 0', '  return 3000', '}'].forEach((t, i) => code(S, 'c' + i, 1, 1.4 + i * 2.3, 15, nb(t), {}, 2));
  S.set('c1', 1, C.ok).set('c2', 1, C.ok).set('c3', 1, C.bad).set('c3', 2, C.ok).set('c1', 3, C.cmp);
  text(S, 'th', 17.6, 1, ['테스트', 'Tests'], { cls: 'cz-t se-b' });
  code(S, 't0', 17.6, 2.4, 13.4, 'fee({ total: 60000 })', hid()); S.set('t0', 1, { opacity: '1' });
  code(S, 't1', 17.6, 4.8, 13.4, 'fee({ total: 10000 })', hid()); S.set('t1', 2, { opacity: '1' });
  const meter = (k, y, lab, w1, w2) => {
    S.label(k + 'l', { cls: 'cz-t se-l', x: 17.6, y, w: 13.4 }, lab);
    S.el(k + 't', { x: 17.6, y: y + 1.4, w: 13.4, h: 1, css: 'border-radius:.5em;background:var(--line)' });
    S.el(k + 'f', { x: 17.6, y: y + 1.4, w: 13.4, h: 1, css: 'border-radius:.5em', s: { width: '0em', background: 'var(--ok)' } });
    S.set(k + 'f', 1, { width: w1 + 'em' }).set(k + 'f', 2, { width: w2 + 'em' });
  };
  meter('ml', 8.2, [[0, ['라인 0%', 'Lines 0%']], [1, ['라인 67%', 'Lines 67%']], [2, ['라인 100%', 'Lines 100%']]], 8.98, 13.4);
  meter('mb', 11.6, [[0, ['분기 0%', 'Branches 0%']], [1, ['분기 50%', 'Branches 50%']], [2, ['분기 100%', 'Branches 100%']]], 6.7, 13.4);
  text(S, 'nt', 1, 13.8, ['명세: "5만 원 이상 무료" → >= 여야 해요', 'Spec: “free from 50,000” → should be >='], { cls: 'cz-t se-w', s: hid() });
  code(S, 't2', 1, 15.6, 15, 'fee({ total: 50000 }) → 3000 ✗', hid(C.bad)); show(S, ['nt', 't2'], 3);
  S.cap(1, '테스트 하나로는 일부 줄만 실행돼요', 'One test runs only some of the lines')
    .cap(2, '두 번째 테스트로 모든 줄·분기 100%', 'A second test hits every line and branch: 100%')
    .cap(3, '100%여도 경계 버그(> vs >=)는 못 잡아요', 'Even 100% misses the boundary bug (> vs >=)')
    .cap(4, '커버리지는 테스트 안 된 곳을 찾는 도구 · 목표 숫자가 아니에요', 'Coverage finds untested code · it is not a goal in itself');
  return S;
}
function sBoundary() {
  const S = scene({ id: 'se-boundary', steps: 4, per: 1.5 });
  text(S, 'h', 1, .9, ['규칙: 19–64세만 가입 가능', 'Rule: ages 19–64 may sign up'], { cls: 'cz-t se-b' });
  [[2, 8, ['무효 (< 19)'.replace('<', '&lt;'), 'invalid (&lt; 19)'], C.bad], [10, 14, ['유효 (19–64)', 'valid (19–64)'], C.ok], [24, 7, ['무효 (≥ 65)', 'invalid (≥ 65)'], C.bad]]
    .forEach(([x, w, l, st], i) => { chip(S, 'z' + i, x, 3.4, w - .2, l, hid(st), { h: 2.6, cls: 'se-p' }); S.set('z' + i, 1, { opacity: '1' }); });
  edge(S, 'ln', 2, 10, 31, 10, { s: { background: 'var(--ink-3)' } });
  [10, 24].forEach((x, i) => { edge(S, 'tk' + i, x - .1, 6.2, x - .1, 10, { s: hid({ background: 'var(--ink-3)' }) }); S.set('tk' + i, 1, { opacity: '.5' }); });
  const V = [[6, '10', '✗', 2], [17, '40', '✓', 2], [27.5, '80', '✗', 2], [9.3, '18', '✗', 3], [10.7, '19', '✓', 3], [23.3, '64', '✓', 3], [24.7, '65', '✗', 3]];
  V.forEach(([x, v, r, st], i) => {
    dot(S, 'd' + i, x, 10, '', { r: st === 2 ? .8 : .6, s: hid(st === 2 ? C.soft : C.cmp) });
    text(S, 'v' + i, x - .9, 11.2, v, { w: 1.8, cls: 'cz-t cz-tc cz-mono', s: hid() });
    text(S, 'r' + i, x - .9, 12.6, r, { w: 1.8, cls: 'cz-t cz-tc ' + (r === '✓' ? 'se-g' : 'se-r'), s: hid() });
    show(S, ['d' + i, 'v' + i, 'r' + i], st);
  });
  code(S, 'bug', 1, 15.6, 30, ['if (age > 19 && age &lt; 65)&nbsp;&nbsp;&nbsp;// 19세가 거절되는 버그', 'if (age > 19 && age &lt; 65)&nbsp;&nbsp;&nbsp;// bug: 19 is rejected'], hid(C.bad), 2.4);
  S.set('bug', 4, { opacity: '1' }).set('d4', 4, C.badf);
  S.cap(1, '동등 분할: 같은 결과를 내는 입력끼리 묶어요', 'Equivalence partitions group inputs with the same outcome')
    .cap(2, '구간마다 대표값 하나씩만 테스트', 'Test one representative value per partition')
    .cap(3, '경계값 분석: 경계 바로 양쪽을 꼭 테스트', 'Boundary analysis: test both sides of every edge')
    .cap(4, '버그는 경계에 몰려요 (> 와 >= 실수)', 'Bugs cluster at the edges (> vs >=)');
  return S;
}

/* ---------- modeling ---------- */
function umlClass(S, k, x, y, w, name, parts, st) {
  const s = st || {};
  cell(S, k, x, y, name, { w, h: 1.8, cls: 'cz-c se-umln', css: 'border-radius:.4em .4em 0 0', s: Object.assign({}, s) });
  let yy = y + 1.8;
  parts.forEach(([t, h], i) => { cell(S, k + 'p' + i, x, yy, t, { w, h, cls: 'cz-c se-code se-uml', css: i === parts.length - 1 ? 'border-radius:0 0 .4em .4em' : 'border-radius:0', s: Object.assign({}, s) }); yy += h; });
  return parts.map((_, i) => k + 'p' + i).concat([k]);
}
function sUMLClass() {
  const S = scene({ id: 'se-uml-class', steps: 5, per: 1.35 });
  const ink = { background: 'var(--ink-3)' };
  const ord = umlClass(S, 'o', 11, 1, 10, 'Order', [['- id: Long<br>- status: Status', 2.6], ['+ pay(): void<br>+ total(): Money', 2.6]]);
  ord.forEach(k => S.set(k, 1, C.soft).set(k, 2, C.idle));
  edge(S, 'ea', 8, 3.1, 11, 3.1, { s: hid(ink) });
  const cu = umlClass(S, 'cu', 1, 2.2, 7, 'Customer', [['- name: String', 1.6]], hid());
  text(S, 'm1', 8.2, 1.9, '1', { cls: 'cz-t cz-mono', s: hid() }); text(S, 'm2', 10.2, 1.9, '*', { cls: 'cz-t cz-mono', s: hid() });
  edge(S, 'ec', 21.6, 3.1, 24, 3.1, { s: hid(ink) });
  text(S, 'dia', 20.9, 2.45, '◆', { w: 1.1, cls: 'cz-t cz-tc se-gl', s: hid() });
  const ol = umlClass(S, 'ol', 24, 2.2, 7, 'OrderLine', [['- qty: Int', 1.6]], hid());
  text(S, 'm3', 22.2, 1.9, '1..*', { cls: 'cz-t cz-mono', s: hid() });
  edge(S, 'ep', 16, 8, 16, 11, { s: hid(ink) });
  const pay = umlClass(S, 'py', 11.5, 11, 9, '«interface»<br>Payment', [], hid());
  S.get('py').h = 2.6; S.get('py').css = 'border-radius:.4em';
  text(S, 'tri', 15.45, 13.45, '△', { w: 1.1, cls: 'cz-t cz-tc se-gl', s: hid() });
  [['i0', 16, 14.4, 16, 15.4], ['i1', 10, 15.4, 22, 15.4], ['i2', 10, 15.4, 10, 17], ['i3', 22, 15.4, 22, 17]].forEach(([k, a, b, c, d]) => edge(S, k, a, b, c, d, { s: hid(ink) }));
  cell(S, 'cp', 5.5, 17, 'CardPayment', { w: 9, h: 2, cls: 'cz-c se-umln', s: hid() });
  cell(S, 'bt', 17.5, 17, 'BankTransfer', { w: 9, h: 2, cls: 'cz-c se-umln', s: hid() });
  const reveal = (keys, edges, st) => { keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, C.soft)).set(k, st + 1, C.idle)); edges.forEach(k => S.set(k, st, { opacity: '1', background: 'var(--accent)' }).set(k, st + 1, ink)); };
  reveal(cu, ['ea'], 2); show(S, ['m1', 'm2'], 2);
  reveal(ol, ['ec'], 3); show(S, ['dia', 'm3'], 3);
  reveal(pay.concat(['cp', 'bt']), ['ep', 'i0', 'i1', 'i2', 'i3'], 4); show(S, ['tri'], 4);
  S.cap(1, '클래스: 이름 / 속성 / 메서드 세 칸', 'A class: name / attributes / methods')
    .cap(2, '연관(—): 고객 1명이 주문 여러 개(*)', 'Association (—): one customer, many orders (*)')
    .cap(3, '합성(◆): 주문이 사라지면 주문 항목도 함께', 'Composition (◆): order lines die with their order')
    .cap(4, '상속·실현(△): 카드·계좌이체는 Payment의 한 종류', 'Inheritance (△): card and bank transfer are kinds of Payment')
    .cap(5, '토론용 스케치로 충분 · 모든 걸 그리려 하지 마세요', 'A sketch for discussion is enough · don’t draw everything');
  return S;
}
function sUMLSeq() {
  return seq('se-uml-seq', [['사용자', 'User'], ['앱', 'App'], ['주문 API', 'Order API'], 'DB'], [
    { f: 0, t: 1, l: ['주문하기 클릭', 'tap “Order”'], cap: ['시퀀스 다이어그램: 시간은 위에서 아래로', 'Sequence diagram: time flows top to bottom'] },
    { f: 1, t: 2, l: 'POST /orders' },
    { f: 2, t: 2, l: ['재고 확인', 'check stock'], cap: ['자기 자신을 부르는 메시지', 'A message to itself'] },
    { f: 2, t: 3, l: 'INSERT order', cap: ['참여자 사이의 호출 순서가 한눈에', 'The order of calls at a glance'] },
    { f: 3, t: 2, l: 'ok', c: 'ok' },
    { f: 2, t: 1, l: '201 Created', c: 'ok' },
    { f: 1, t: 0, l: ['주문 완료 화면', 'confirmation screen'], cap: ['API 연동 설계와 장애 분석에 유용 · Mermaid로 텍스트 관리', 'Great for API design and incident reviews · keep it in text with Mermaid'] }
  ], { aw: 6.4 });
}
function sDDD() {
  const S = scene({ id: 'se-ddd', steps: 5, per: 1.35 });
  box(S, 'god', 6, 1, 20, 6.8, '', {});
  text(S, 'gt', 6.6, 1.25, 'Product', { cls: 'cz-t cz-mono se-b' });
  const CX = [1, 11.4, 21.8];
  [[['카탈로그', 'Catalog'], 'Product'], [['재고', 'Inventory'], 'StockItem'], [['배송', 'Shipping'], 'Parcel']].forEach(([l, m], c) => {
    box(S, 'cx' + c, CX[c], 9.2, 9.2, 10.8, '', { s: hid() });
    text(S, 'ch' + c, CX[c] + .6, 9.6, l, { cls: 'cz-t se-b', s: hid() });
    text(S, 'cm' + c, CX[c] + .6, 11, m, { cls: 'cz-t cz-mono', s: hid() });
    show(S, ['cx' + c, 'ch' + c, 'cm' + c], c + 2); S.set('cx' + c, c + 2, C.soft).set('cx' + c, c + 3 <= 5 ? c + 3 : 5, C.idle);
  });
  const F = [[['이름', 'name'], 0], [['재고 수량', 'stock qty'], 1], [['무게', 'weight'], 2], ['SKU', 1], [['설명', 'description'], 0], [['포장', 'packaging'], 2], [['창고 위치', 'warehouse'], 1], [['크기', 'dimensions'], 2], [['이미지', 'images'], 0]];
  const cnt = [0, 0, 0];
  F.forEach(([l, c], p) => { const k = 'f' + p; chip(S, k, 6.6 + (p % 3) * 6.4, 2.8 + Math.floor(p / 3) * 1.6, 6, l, {}, { h: 1.4, cls: 'se-xs' }); S.move(k, c + 2, CX[c] + .6, 12.6 + cnt[c]++ * 2.1); });
  S.set('god', 2, { opacity: '.5' }).set('god', 4, { opacity: '0' }).set('gt', 4, { opacity: '0' });
  pill(S, 'ev', 9, 3.2, ['주문 컨텍스트 → OrderPlaced 이벤트', 'Ordering → OrderPlaced event'], { w: 14, h: 2.4, s: hid(C.cmp) });
  arrow(S, 'e1', 16, 5.8, 16, 8.9, { s: hid() }); arrow(S, 'e2', 22, 5.8, 25.4, 8.9, { s: hid() }); show(S, ['ev', 'e1', 'e2'], 5);
  S.cap(1, '하나의 Product 모델에 모든 팀의 필드가 몰려 있어요', 'One Product model carries every team’s fields')
    .cap(2, '카탈로그에서 상품은 "보여줄 것"', 'In Catalog, a product is something to show')
    .cap(3, '재고에서는 "셀 수 있는 것"', 'In Inventory, something to count')
    .cap(4, '배송에서는 "보낼 상자" · 이름도 모델도 각자', 'In Shipping, a box to send · each with its own model')
    .cap(5, '컨텍스트끼리는 이벤트·API로만 대화해요', 'Contexts talk only through events and APIs');
  return S;
}

/* ---------- teamwork ---------- */
function sReview() {
  const S = scene({ id: 'se-review', steps: 7, per: 1.1 });
  const ink = { background: 'var(--ink-3)' };
  text(S, 'mn', 1, 1.2, 'main', { cls: 'cz-t cz-mono se-b' });
  edge(S, 'ml', 1, 3.2, 31, 3.2, { s: ink });
  dot(S, 'm0', 3, 3.2, '', { r: .6, s: ink }); dot(S, 'm1', 7, 3.2, '', { r: .6, s: ink });
  edge(S, 'b0', 7, 3.2, 10, 7.4, { s: hid(ink) }); edge(S, 'b1', 10, 7.4, 22, 7.4, { s: hid(ink) });
  text(S, 'bn', 19.6, 8.2, 'feature/cart', { cls: 'cz-t cz-mono', s: hid() });
  dot(S, 'f0', 11, 7.4, '', { r: .6, s: hid(C.cur) }); dot(S, 'f1', 14.5, 7.4, '', { r: .6, s: hid(C.cur) }); dot(S, 'f2', 18.5, 7.4, '', { r: .6, s: hid(C.cur) });
  show(S, ['b0', 'b1', 'bn', 'f0', 'f1'], 1); show(S, ['f2'], 5);
  box(S, 'pr', 1, 10, 30, 9.8, '', { s: hid() });
  text(S, 'pt', 1.8, 10.6, ['PR #42 · 장바구니 저장 기능', 'PR #42 · Save the cart'], { cls: 'cz-t se-b', s: hid() });
  text(S, 'pd', 25.4, 10.7, '+120 / −8', { cls: 'cz-t cz-mono', s: hid() });
  show(S, ['pr', 'pt', 'pd'], 2);
  chip(S, 'k0', 1.8, 12.6, 8.4, ['CI 테스트 ✓', 'CI tests ✓'], hid(C.ok), { cls: 'se-p' }); chip(S, 'k1', 10.6, 12.6, 6, ['린트 ✓', 'Lint ✓'], hid(C.ok), { cls: 'se-p' }); show(S, ['k0', 'k1'], 3);
  [['리뷰어: 이 변수명은 의미가 모호해요', 'Reviewer: this name is unclear'], ['리뷰어: 저장에 실패하면 어떻게 되나요?', 'Reviewer: what if saving fails?']].forEach((l, i) => {
    chip(S, 'r' + i, 1.8, 15.2 + i * 2.2, 20.6, l, hid(C.cmp), { h: 1.9, cls: 'se-p' }); S.set('r' + i, 4, { opacity: '1' }).set('r' + i, 5, C.ok);
    pill(S, 'rs' + i, 23, 15.2 + i * 2.2, ['해결됨 ✓', 'resolved ✓'], { w: 7.4, h: 1.9, s: hid(C.ok) }); S.set('rs' + i, 5, { opacity: '1' });
  });
  pill(S, 'ap', 23, 12.6, ['승인됨 ✓', 'Approved ✓'], { w: 7.4, h: 2, s: hid(C.okf) }); S.set('ap', 6, { opacity: '1' });
  edge(S, 'mg', 18.5, 7.4, 25, 3.2, { s: hid({ background: 'var(--ok)' }) }); dot(S, 'm2', 25, 3.2, '', { r: .7, s: hid(C.okf) }); show(S, ['mg', 'm2'], 7);
  S.cap(1, '기능 브랜치에서 작업하고', 'Work on a feature branch').cap(2, 'PR을 열어 무엇을, 왜 바꿨는지 설명해요', 'Open a pull request explaining what and why')
    .cap(3, 'CI가 테스트·린트를 자동으로 돌려요', 'CI runs tests and lint automatically').cap(4, '리뷰어가 질문하고 제안해요', 'Reviewers ask and suggest')
    .cap(5, '수정 커밋으로 답하고', 'Answer with fix commits').cap(6, '승인을 받으면', 'Once approved')
    .cap(7, 'main에 병합 · PR은 작게, 리뷰는 사람이 아니라 코드에', 'merge to main · keep PRs small, review the code, not the person');
  return S;
}
function sSemver() {
  const S = scene({ id: 'se-semver', steps: 5, per: 1.3 });
  const X = [4, 13, 22];
  ['MAJOR', 'MINOR', 'PATCH'].forEach((h, i) => text(S, 'h' + i, X[i], 1.4, h, { w: 6, cls: 'cz-t cz-tc cz-mono se-b' }));
  [['호환 깨짐', 'breaking change'], ['기능 추가 (호환)', 'new feature (compatible)'], ['버그 수정', 'bug fix']].forEach((l, i) => text(S, 's' + i, X[i] - 1.5, 9.8, l, { w: 9, cls: 'cz-t cz-tc' }));
  [10, 19].forEach((x, i) => text(S, 'dt' + i, x, 4.4, '.', { w: 3, cls: 'cz-t cz-tc se-dot2' }));
  const D = [[[0, '2'], [3, '3']], [[0, '4'], [2, '5'], [3, '0']], [[0, '1'], [1, '2'], [2, '0']]];
  D.forEach((list, i) => S.label('v' + i, { cls: 'cz-c se-dig', x: X[i], y: 3.2, w: 6, h: 6 }, list));
  [['v2~1', C.soft], ['v1~1', C.soft], ['v0~1', C.bad]].forEach(([k, st]) => Object.assign(S.get(k).s, st));
  S.label('ev', { cls: 'cz-t cz-tc se-l', x: 1, y: 12, w: 30 }, [[0, ''], [1, ['버그 수정 → 2.4.2', 'bug fix → 2.4.2']], [2, ['기능 추가 → 2.5.0 (PATCH는 0으로)', 'new feature → 2.5.0 (PATCH resets)']], [3, ['API 호환 깨짐 → 3.0.0', 'breaking API change → 3.0.0']]]);
  code(S, 'r0', 4, 14.6, 24, ['^2.4.1&nbsp;&nbsp;→&nbsp;&nbsp;2.x.x 범위 안에서 업데이트 허용', '^2.4.1&nbsp;&nbsp;→&nbsp;&nbsp;allows any 2.x.x update'], hid(C.soft), 2.2);
  code(S, 'r1', 4, 17.2, 24, ['~2.4.1&nbsp;&nbsp;→&nbsp;&nbsp;2.4.x 패치만 허용', '~2.4.1&nbsp;&nbsp;→&nbsp;&nbsp;patch updates (2.4.x) only'], hid(C.cmp), 2.2);
  show(S, ['r0', 'r1'], 4);
  S.cap(1, '버그만 고쳤다면 PATCH', 'Bug fix only: bump PATCH').cap(2, '호환되는 기능 추가는 MINOR', 'Compatible feature: bump MINOR')
    .cap(3, '기존 사용자를 깨뜨리면 MAJOR', 'Breaks existing users: bump MAJOR').cap(4, 'package.json의 ^, ~ 범위가 이 약속을 믿어요', 'The ^ and ~ ranges in package.json trust this promise')
    .cap(5, '버전 번호는 "업데이트해도 안전한가"에 대한 약속이에요', 'A version number is a promise about upgrade safety');
  return S;
}
function sDebt() {
  const S = scene({ id: 'se-debt', steps: 6, per: 1.2 });
  const A = [2, 3, 4.5, 6.5, 9], B = [3, 3, 3.2, 3, 3.1], u = 1.4;
  edge(S, 'ax', 2, 17, 31, 17, { s: { background: 'var(--ink-3)' } });
  chip(S, 'lg0', 1, 1.2, 1.2, '', BAD, { h: 1 }); text(S, 'lt0', 2.6, 1.05, ['빚을 쌓는 팀: 기능 하나에 걸리는 시간', 'Team piling up debt: time per feature'], { cls: 'cz-t' });
  chip(S, 'lg1', 1, 2.6, 1.2, '', OK, { h: 1 }); text(S, 'lt1', 2.6, 2.45, ['꾸준히 갚는 팀', 'Team paying it down'], { cls: 'cz-t' });
  A.forEach((v, i) => {
    const x = 3 + i * 5.8;
    vbar(S, 'a' + i, x, 17, 2.2, v * u, BAD, i + 1); vbar(S, 'b' + i, x + 2.5, 17, 2.2, B[i] * u, OK, i + 1);
    text(S, 'x' + i, x - .4, 17.4, [`기능 ${i + 1}`, `Feature ${i + 1}`], { w: 5.4, cls: 'cz-t cz-tc' });
  });
  text(S, 'int', 19.2, 6.2, ['이자 ↑', 'interest ↑'], { cls: 'cz-t se-r', s: hid() }); S.set('int', 4, { opacity: '1' });
  S.cap(1, '처음엔 대충 짜는 쪽이 빨라 보여요', 'At first, cutting corners looks faster')
    .cap(3, '쌓인 빚 때문에 기능 하나에 드는 시간이 늘어요', 'Accumulated debt makes every feature take longer')
    .cap(4, '이게 기술 부채의 "이자"예요', 'That slowdown is the interest on the debt')
    .cap(6, '의도한 빚은 기록하고, 매 스프린트 일부를 갚는 데 써요', 'Record deliberate debt and spend part of each sprint repaying it');
  return S;
}
function sConway() {
  const S = scene({ id: 'se-conway', steps: 6, per: 1.2 });
  text(S, 'h1', 1, 1, ['조직 구조', 'Org structure'], { cls: 'cz-t se-b' }); text(S, 'h2', 18, 1, ['시스템 구조', 'System structure'], { cls: 'cz-t se-b' });
  const T = [['프론트엔드 팀', 'Frontend team'], ['백엔드 팀', 'Backend team'], ['DB 팀', 'DB team']], Ly = [['UI 레이어', 'UI layer'], ['API 레이어', 'API layer'], ['DB 레이어', 'DB layer']];
  const FT = [['주문', 'Orders'], ['결제', 'Payments'], ['검색', 'Search']];
  T.forEach((l, i) => { chip(S, 't' + i, 1, 3.4 + i * 4.4, 13, l, {}, { h: 3.2, cls: 'se-p' }); S.set('t' + i, 1, C.soft).set('t' + i, 3, C.cmp).set('t' + i, 4, { opacity: '0' }); });
  Ly.forEach((l, i) => { chip(S, 'y' + i, 18, 3.4 + i * 4.4, 13, l, hid(C.soft), { h: 3.2, cls: 'se-p' }); S.set('y' + i, 2, { opacity: '1' }).set('y' + i, 5, { opacity: '0' }); });
  arrow(S, 'ar', 14.6, 9.4, 17.4, 9.4, { s: hid() }); S.set('ar', 2, { opacity: '1' });
  edge(S, 'cr', 24.5, 2.8, 24.5, 16, { h: .2, s: hid({ background: 'var(--danger)' }) });
  text(S, 'crt', 18, 16.6, ['기능 1개 수정 = 3팀 협의', '1 change = 3 teams in a meeting'], { cls: 'cz-t se-r', s: hid() });
  show(S, ['cr', 'crt'], 3); ['cr', 'crt'].forEach(k => S.set(k, 4, { opacity: '0' }));
  FT.forEach(([k, e], i) => {
    chip(S, 'ft' + i, 1 + i * 4.5, 3.4, 4.1, [`${k}<br>팀<br><span class="se-n">FE·BE·DB</span>`, `${e}<br>team<br><span class="se-n">FE·BE·DB</span>`], hid(C.ok), { h: 12, cls: 'se-p' }); S.set('ft' + i, 4, { opacity: '1' });
    chip(S, 'sv' + i, 18 + i * 4.5, 3.4, 4.1, [`${k}<br>서비스<br><span class="se-n">자체 DB</span>`, `${e}<br>service<br><span class="se-n">own DB</span>`], hid(C.ok), { h: 12, cls: 'se-p' }); S.set('sv' + i, 5, { opacity: '1' });
  });
  S.cap(1, '기술별로 팀을 나누면', 'Split teams by technology').cap(2, '시스템도 똑같이 층으로 나뉘어요 (콘웨이의 법칙)', 'and the system splits into the same layers (Conway’s law)')
    .cap(3, '기능 하나 바꾸려면 세 팀이 모두 움직여야 해요', 'One feature change needs all three teams').cap(4, '기능(도메인)별 팀으로 바꾸면', 'Reorganize into feature teams')
    .cap(5, '시스템도 독립 배포되는 서비스로 나뉘어요', 'and the system splits into independently deployable services')
    .cap(6, '역 콘웨이 전략: 원하는 아키텍처에 맞춰 팀을 짜요', 'Inverse Conway: shape teams to fit the architecture you want');
  return S;
}
function sBrooks() {
  const S = scene({ id: 'se-brooks', steps: 4, per: 1.6 });
  const cx = 10.5, cy = 10.4, R = 7.2, NS = [3, 5, 8], r = .9;
  const pos = (n, i) => [cx + R * Math.cos(-Math.PI / 2 + 2 * Math.PI * i / n), cy + R * Math.sin(-Math.PI / 2 + 2 * Math.PI * i / n)];
  NS.forEach((n, si) => {
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      const [x1, y1] = pos(n, a), [x2, y2] = pos(n, b), k = `e${si}_${a}_${b}`;
      edge(S, k, x1, y1, x2, y2, { s: hid() }); S.set(k, si + 1, { opacity: '1' }); if (si < 2) S.set(k, si + 2, { opacity: '0' });
    }
  });
  for (let i = 0; i < 8; i++) {
    const first = i < 3 ? 0 : i < 5 ? 1 : 2, [x, y] = pos(NS[first], i);
    node(S, 'n' + i, x, y, '', { r, s: hid(first ? C.cur : C.soft) });
    S.set('n' + i, first + 1, { opacity: '1' });
    if (first) S.set('n' + i, first + 2 <= 3 ? first + 2 : 3, first + 2 <= 3 ? C.soft : {});
    for (let si = first + 1; si < 3; si++) { const [px, py] = pos(NS[si], i); S.move('n' + i, si + 1, px - r, py - r); }
  }
  text(S, 'ph', 19.8, 3.6, ['소통 경로', 'Communication paths'], { cls: 'cz-t se-b' });
  S.label('cnt', { cls: 'cz-t se-big3', x: 19.8, y: 5.4, w: 11 }, [[0, ''], [1, ['3명 → 3개', '3 people → 3']], [2, ['5명 → 10개', '5 people → 10']], [3, ['8명 → 28개', '8 people → 28']]]);
  text(S, 'fm', 19.8, 8.4, 'n(n − 1) / 2', { cls: 'cz-t cz-mono se-l' });
  text(S, 'bl1', 19.8, 12.2, ['늦은 프로젝트에 사람을 더하면', 'Adding people to a late'], { cls: 'cz-t se-l', s: hid() });
  text(S, 'bl2', 19.8, 13.8, ['더 늦어져요', 'project makes it later'], { cls: 'cz-t se-l se-r', s: hid() });
  show(S, ['bl1', 'bl2'], 4);
  S.cap(1, '3명이면 대화 경로는 3개', 'Three people: three communication paths').cap(2, '5명이면 10개', 'Five people: ten')
    .cap(3, '8명이면 28개 · 사람은 선형으로, 소통은 제곱으로 늘어요', 'Eight: 28 · people grow linearly, paths quadratically')
    .cap(4, '새 사람은 적응하는 동안 기존 팀원의 시간도 써요 (브룩스의 법칙)', 'Newcomers also eat the team’s time while ramping up (Brooks’s law)');
  return S;
}

window.UX = page([
  sec('se-proc', '프로세스', 'Process', '개발 프로세스와 애자일', 'Development process and agile',
    '팀이 일을 나누고 계획하고 피드백을 받는 방식이에요.', 'How teams split, plan and get feedback on work.', [
    item('se-waterfall', '폭포수 vs 반복형', 'Waterfall vs iterative', '폭포수는 요구사항→설계→구현→테스트→배포를 한 번씩 차례로 끝내고, 반복형은 작은 단위로 이 과정을 여러 번 돌며 자주 내보내요.', '요구가 바뀌기 쉬운 서비스는 반복형이 유리해요. 규제가 강하거나 하드웨어처럼 되돌리기 비싼 분야는 지금도 단계별 관리를 많이 써요.', 'Waterfall runs requirements, design, build, test and release once, in order; iterative development loops through them in small slices and ships often.', 'Products whose requirements shift favour iterative work; regulated or hardware projects, where changes are costly, still lean on phase gates.', sWaterfall()),
    item('se-agile', '애자일 선언', 'The Agile Manifesto', '2001년 개발자들이 정리한 4가지 가치예요. 프로세스·문서·계약·계획보다 사람, 동작하는 소프트웨어, 고객 협력, 변화 대응을 더 중시해요.', '애자일은 특정 도구나 회의가 아니라 짧게 만들고 피드백 받아 고치는 태도예요. 스크럼·칸반·XP는 이를 실천하는 방법들이에요.', 'Four values written by developers in 2001: people, working software, customer collaboration and responding to change, valued over process, documents, contracts and plans.', 'Agile is not a tool or a meeting but a habit of building in short loops and adjusting from feedback; Scrum, Kanban and XP are ways to practise it.', sAgile()),
    item('se-scrum', '스크럼', 'Scrum', '1–4주 스프린트 단위로 백로그에서 일을 가져와 만들고, 매일 짧게 공유하고, 끝에 리뷰와 회고를 해요. PO·스크럼 마스터·개발자 세 역할이 있어요.', '스프린트 중엔 목표를 바꾸지 않는 게 원칙이에요. 회고에서 나온 개선점을 다음 스프린트에 실제로 반영해야 의미가 있어요.', 'Work is pulled from the backlog into 1–4 week sprints, synced in a short daily scrum, and closed with a review and a retrospective. Three roles: product owner, scrum master, developers.', 'Don’t change the sprint goal mid-sprint, and make sure retro actions actually land in the next sprint.', sScrum()),
    item('se-kanban', '칸반', 'Kanban', '일을 카드로 보드에 올리고 "진행 중" 칸의 개수(WIP)를 제한해서, 새로 시작하기보다 끝내는 데 집중하게 해요.', '스프린트 없이 계속 흐르는 일(운영, 고객 지원, 유지보수)에 잘 맞아요. 리드 타임과 막힌 칸을 보면 병목이 보여요.', 'Work items sit on a board as cards and the number in progress (WIP) is capped, so the team finishes before starting more.', 'Fits continuous work without sprints, like ops, support and maintenance; lead time and stuck columns reveal bottlenecks.', sKanban()),
    item('se-story', '사용자 스토리와 인수 조건', 'User stories and acceptance criteria', '"누가, 무엇을, 왜"를 한 문장으로 쓰고, 완료를 판단할 구체적인 조건을 붙여요.', '인수 조건이 모호하면 "다 됐다"의 기준이 사람마다 달라져요. 잘 쓴 조건은 그대로 테스트 케이스가 돼요.', 'State who wants what and why in one sentence, then attach concrete conditions that decide when it’s done.', 'Vague criteria mean everyone has a different idea of done; good criteria become test cases directly.', sStory()),
    item('se-burndown', '번다운 차트와 속도', 'Burndown and velocity', '스프린트 동안 남은 작업량이 줄어드는 모습을 그리고, 스프린트마다 끝낸 양(속도)으로 다음 계획을 세워요.', '속도는 팀 내부의 계획 도구예요. 팀끼리 비교하거나 성과 지표로 쓰면 포인트만 부풀려져요.', 'Plot remaining work shrinking through the sprint, and use how much each sprint finished (velocity) to plan the next.', 'Velocity is a team-internal planning tool; comparing teams or using it as a KPI just inflates the points.', sBurn())
  ]),
  sec('se-test', '테스트', 'Testing', '소프트웨어 테스트', 'Software testing',
    '버그를 일찍, 싸게 찾는 방법이에요.', 'Ways to find bugs early and cheaply.', [
    item('se-pyramid', '테스트 피라미드', 'Test pyramid', '빠르고 싼 단위 테스트를 가장 많이, 통합 테스트는 적당히, 느린 E2E 테스트는 핵심 흐름만 두는 구조예요.', 'E2E가 대부분이면 CI가 느리고 자주 깨져요. 실패 원인을 좁히기 쉬운 아래층을 두텁게 하세요.', 'Lots of fast, cheap unit tests, a moderate layer of integration tests, and slow end-to-end tests only for key flows.', 'A suite made mostly of E2E tests makes CI slow and flaky; thicken the lower layers, where failures are easy to pinpoint.', sPyramid()),
    item('se-tdd', 'TDD (테스트 주도 개발)', 'TDD (test-driven development)', '실패하는 테스트를 먼저 쓰고(Red), 통과할 최소 코드를 쓰고(Green), 정리(Refactor)하는 짧은 사이클을 반복해요.', '테스트하기 쉬운 구조가 자연스럽게 나와요. 요구가 분명한 로직(계산, 파서, 규칙)에서 특히 효과가 커요.', 'Write a failing test (red), write the least code that passes (green), then clean up (refactor), in short repeated cycles.', 'It naturally yields testable designs and pays off most on well-defined logic like calculations, parsers and business rules.', sTDD()),
    item('se-bdd', 'BDD (행동 주도 개발)', 'BDD (behaviour-driven development)', 'Given-When-Then 형식의 문장으로 기대하는 행동을 적고, 그 문장을 그대로 자동화 테스트로 실행해요.', '기획·QA·개발이 같은 문장을 보며 합의할 수 있어요. Cucumber, SpecFlow 같은 도구가 문장을 코드와 연결해요.', 'Describe expected behaviour as Given–When–Then sentences and run those sentences as automated tests.', 'Product, QA and developers agree on the same text; tools like Cucumber and SpecFlow bind the sentences to code.', sBDD()),
    item('se-double', '테스트 더블', 'Test doubles', '테스트할 때 실제 의존성(결제, 메일, DB) 대신 끼워 넣는 대역이에요. Stub·Mock·Fake·Spy로 나뉘어요.', 'Mock을 과하게 쓰면 구현 세부에 묶인 깨지기 쉬운 테스트가 돼요. 가능하면 결과(상태)를 검증하세요.', 'Stand-ins for real dependencies such as payments, email and databases during tests: stubs, mocks, fakes and spies.', 'Over-mocking ties tests to implementation details; verify outcomes and state where you can.', sDouble()),
    item('se-coverage', '코드 커버리지', 'Code coverage', '테스트가 코드의 몇 %를 실행했는지예요. 줄(라인) 기준과 분기(브랜치) 기준이 있어요.', '커버리지가 낮은 곳은 확실히 위험하지만, 높다고 안전한 건 아니에요. 숫자 목표보다 핵심 로직의 분기를 챙기세요.', 'The share of code your tests execute, measured by lines or by branches.', 'Low coverage flags real risk, but high coverage proves little; care about the branches in core logic, not the number.', sCov()),
    item('se-boundary', '경계값 분석 · 동등 분할', 'Boundary values · equivalence partitions', '입력을 같은 결과를 내는 구간으로 나누고(동등 분할), 구간 경계의 바로 양쪽 값을 집중적으로 테스트해요.', '> 와 >=, 0과 1, 빈 목록과 하나짜리 목록처럼 버그는 경계에 몰려요. 테스트 케이스 수는 줄이고 효과는 높여요.', 'Group inputs into ranges that behave the same, then test values on both sides of each boundary.', 'Bugs cluster at edges: > vs >=, zero vs one, empty vs single-item lists. Fewer test cases, more bugs caught.', sBoundary())
  ]),
  sec('se-model', '모델링', 'Modeling', '설계와 모델링', 'Design and modeling',
    '코드를 쓰기 전에 구조와 흐름, 도메인을 정리하는 도구예요.', 'Tools for shaping structure, flow and domain before code.', [
    item('se-uml-class', 'UML 클래스 다이어그램', 'UML class diagrams', '클래스의 이름·속성·메서드와 클래스 사이의 관계(연관, 합성, 상속)를 그림으로 나타내요.', '설계 토론이나 문서화할 때 핵심 관계만 스케치하세요. 코드와 1:1로 모든 걸 그리면 금방 낡아요.', 'Shows each class’s name, attributes and methods, plus how classes relate: association, composition and inheritance.', 'Sketch only the key relationships for design talks and docs; diagrams that mirror every line of code go stale fast.', sUMLClass()),
    item('se-uml-seq', 'UML 시퀀스 다이어그램', 'UML sequence diagrams', '참여자들이 시간 순서대로 주고받는 메시지를 위에서 아래로 그려요.', 'API 연동 설계, 인증 흐름 설명, 장애 원인 분석에 많이 써요. Mermaid 같은 텍스트 도구로 코드처럼 관리할 수 있어요.', 'Draws the messages participants exchange, in time order from top to bottom.', 'Handy for API integration design, auth flows and incident analysis; tools like Mermaid keep them in text alongside code.', sUMLSeq()),
    item('se-ddd', 'DDD · 바운디드 컨텍스트', 'DDD · bounded contexts', '같은 단어도 맥락마다 의미가 달라요. 도메인을 경계(컨텍스트)로 나누고 각자 자기 모델과 용어를 가져요.', '거대한 공용 모델 하나가 모든 팀을 묶는 걸 막아줘요. 마이크로서비스 경계를 정할 때 출발점으로 많이 써요.', 'The same word means different things in different parts of a business. Split the domain into bounded contexts, each with its own model and vocabulary.', 'Stops one giant shared model from coupling every team, and is a common starting point for drawing microservice boundaries.', sDDD())
  ]),
  sec('se-team', '협업', 'Teamwork', '협업과 품질', 'Collaboration and quality',
    '여럿이 함께 오래 유지할 수 있는 소프트웨어를 만드는 원칙이에요.', 'Principles for software many people can maintain for years.', [
    item('se-review', '코드 리뷰와 PR', 'Code review and pull requests', '변경을 병합하기 전에 동료가 읽고 질문·제안하는 과정이에요. CI 검사와 승인을 거쳐 main에 들어가요.', 'PR은 작게 나누고 "왜"를 설명하세요. 스타일은 린터에 맡기고 리뷰는 설계·버그·가독성에 집중해요.', 'Before a change merges, teammates read it, ask questions and suggest fixes; it lands on main after CI checks and approval.', 'Keep PRs small and explain why; leave style to linters and spend review time on design, bugs and readability.', sReview()),
    item('se-semver', '시맨틱 버저닝', 'Semantic versioning', 'MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요. 호환이 깨지면 MAJOR, 기능 추가는 MINOR, 버그 수정은 PATCH를 올려요.', 'npm의 ^·~ 범위가 이 약속을 믿고 자동 업데이트해요. 라이브러리를 공개한다면 꼭 지켜야 해요. 0.x는 언제든 깨질 수 있다는 뜻이에요.', 'MAJOR.MINOR.PATCH tells users what changed: bump MAJOR for breaking changes, MINOR for features, PATCH for fixes.', 'npm’s ^ and ~ ranges trust this promise when auto-updating, so libraries must keep it; 0.x versions may break at any time.', sSemver()),
    item('se-debt', '기술 부채', 'Technical debt', '지금 빨리 가려고 택한 임시방편이 나중에 이자처럼 개발 속도를 갉아먹는 현상이에요.', '빚 자체는 전략이 될 수 있지만 기록하고 갚아야 해요. 스프린트의 일정 비율을 정리 작업에 꾸준히 쓰는 팀이 많아요.', 'Shortcuts taken to go fast now that later charge interest by slowing every change.', 'Debt can be a valid strategy if it’s recorded and repaid; many teams reserve a fixed share of each sprint for cleanup.', sDebt()),
    item('se-conway', '콘웨이의 법칙', 'Conway’s law', '시스템의 구조는 그것을 만드는 조직의 소통 구조를 닮아요.', '원하는 아키텍처가 있다면 팀 구성부터 맞추세요(역 콘웨이 전략). 마이크로서비스는 팀 자율성과 함께 갈 때 효과가 있어요.', 'A system’s structure mirrors the communication structure of the organization that builds it.', 'If you want a certain architecture, organize teams to match it first (inverse Conway); microservices pay off only with autonomous teams.', sConway()),
    item('se-brooks', '브룩스의 법칙', 'Brooks’s law', '늦어진 프로젝트에 인력을 추가하면 더 늦어져요. 사람이 n명이면 소통 경로는 n(n−1)/2개로 늘어나요.', '일정이 밀리면 사람을 더하기보다 범위를 줄이세요. 팀을 작게 유지하고 경계를 분명히 하면 소통 비용이 줄어요.', 'Adding people to a late project makes it later; n people have n(n−1)/2 communication paths.', 'When you slip, cut scope rather than add people; small teams with clear boundaries keep communication cheap.', sBrooks())
  ])
]);
window.UX[0].css += `
.se-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.se-p .in{font-family:inherit;font-size:.72em;font-weight:700;line-height:1.25;text-align:center}
.se-code{place-items:center start!important;padding-left:.7em}
.se-code .in{font-family:var(--f-mono);font-size:.58em;font-weight:600}
.se-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.se-l .in{font-size:.9em;color:var(--ink);font-weight:700}
.se-xs .in{font-size:.55em}
.se-n{font-size:.8em;font-weight:600;opacity:.75}
.se-r .in{color:var(--danger);font-weight:800}
.se-g .in{color:var(--ok);font-weight:800}
.se-a .in{color:var(--accent);font-weight:800}
.se-w .in{color:var(--warn);font-weight:800}
.se-dig .in{font-size:2.6em;font-weight:900}
.se-dot2 .in{font-size:2.6em;font-weight:900;color:var(--ink)}
.se-big3 .in{font-size:1.3em;font-weight:900;color:var(--ink)}
.se-nsm .in{font-size:.6em}
.se-uml .in{font-size:.55em;line-height:1.4}
.se-umln .in{font-family:var(--f-mono);font-size:.62em;font-weight:800;text-align:center;line-height:1.25}
.se-gl .in{font-size:1em;color:var(--ink)}`;
})();
