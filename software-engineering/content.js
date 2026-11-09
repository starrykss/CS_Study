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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'sfx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono sfx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono sfx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c sfx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono sfx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c sfx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'sfx-s sfx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono sfx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono sfx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono sfx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono sfx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono sfx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'sfx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'sfx-xs', 5));


const CSSX = `
.sfx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.sfx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.sfx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.sfx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.sfx-r .in{color:var(--danger);font-weight:800}
.sfx-g .in{color:var(--ok);font-weight:800}
.sfx-a .in{color:var(--accent);font-weight:800}
.sfx-w .in{color:var(--warn);font-weight:800}
.sfx-c .in{font-size:.6em;font-weight:700}
.sfx-c2 .in{font-size:.5em;font-weight:700}
.sfx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.sfx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'sfx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));
const oval = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 22, st, { r: h / 2, cls: 'cz-c sfx-c2', html: label, css: `border:.1em solid var(--${color})`, off: o.off });
const actor = (S, k, x, y, label, st) => { ring(S, k + 'h', x, y, .55, 'ink-2', st, { w: .1 }); seg(S, k + 'b', [x, y + .55], [x, y + 2], st, 'ink-2', .1); seg(S, k + 'a', [x - .8, y + 1.1], [x + .8, y + 1.1], st, 'ink-2', .1); seg(S, k + 'l1', [x, y + 2], [x - .6, y + 2.9], st, 'ink-2', .1); seg(S, k + 'l2', [x, y + 2], [x + .6, y + 2.9], st, 'ink-2', .1); T(S, k + 't', x - 2, y + 3.05, label, 'cz-tc sfx-tiny', st, { w: 4 }); };

/* ================= process ================= */
function sReq() {
  const S = scene({ id: 'se-req', steps: 5, per: 1.6 });
  const R = [[['R1 비밀번호를 재설정할 수 있다', 'R1 users can reset their password'], 'F'], [['R2 주문 내역을 CSV로 내보낸다', 'R2 export order history as CSV'], 'F'], [['R3 빠르게 로딩돼야 한다', 'R3 it should load fast'], 'NF'], [['R4 개인정보는 암호화해 저장한다', 'R4 personal data is stored encrypted'], 'NF'], [['R5 연중 99.9% 가용', 'R5 99.9% availability per year'], 'NF'], [['R6 관리자는 사용자를 정지할 수 있다', 'R6 admins can suspend users'], 'F']];
  T(S, 'rt', 1, .2, ['이해관계자에게서 모은 요구사항', 'requirements gathered from stakeholders'], 'sfx-xs sfx-a', 1);
  R.forEach(([t, f], i) => { const y = 1.2 + i * 1.5; box2(S, 'r' + i, 1, y, 13.4, 1.3, t, 'line', 1, { pct: 40 }); box2(S, 'f' + i, 14.8, y, 3, 1.3, f === 'F' ? ['기능', 'functional'] : ['비기능', 'non-func.'], f === 'F' ? 'accent' : 'warn', 2, { pct: 35 }); });
  tsets(S, 'r2', [[3, 'danger', 30]]);
  T(S, 'vt', 19.4, 1.2, ['R3 “빠르게” → 테스트할 수 없어요 ✗', 'R3 “fast” can’t be tested ✗'], 'sfx-xs sfx-r', 3);
  box2(S, 'vg', 19.4, 2.4, 11.6, 1.5, ['3G에서 첫 화면 p95 ≤ 2초 ✓', 'first screen p95 ≤ 2 s on 3G ✓'], 'ok', 3, { pct: 35 });
  T(S, 'vn', 19.4, 4.2, ['측정 가능·검증 가능하게 다시 써요', 'rewrite it measurable and verifiable'], 'sfx-xs', 3);
  [['Must', 'R1 R4', 'danger'], ['Should', 'R3 R5', 'warn'], ['Could', 'R2', 'accent'], ["Won't", 'R6', 'line']].forEach(([m, r, c], i) => { box2(S, 'm' + i, 19.4 + i * 2.95, 6, 2.8, 1.3, m, c, 4, { pct: 35 }); T(S, 'mr' + i, 19.4 + i * 2.95, 7.5, r, 'cz-tc cz-mono sfx-tiny', 4, { w: 2.8 }); });
  T(S, 'mt', 19.4, 5.1, ['MoSCoW 우선순위', 'MoSCoW prioritization'], 'sfx-xs sfx-a', 4);
  T(S, 'tr', 19.4, 8.6, ['추적 매트릭스: R1 ↔ TC-12, TC-13', 'traceability: R1 ↔ TC-12, TC-13'], 'cz-mono sfx-xs', 4);
  stepT(S, 'k', 1, 10.6, [['도출: 사용자, 운영, 보안, 법무에게서 필요를 모아요', 'elicit: gather needs from users, operations, security and legal'], ['기능 요구사항(무엇을 하나) vs 비기능 요구사항(얼마나 잘 하나: 성능·보안·가용성)', 'functional (what it does) vs non-functional (how well: performance, security, availability)'], ['좋은 요구사항은 측정할 수 있고 테스트로 확인할 수 있어요', 'good requirements are measurable and testable'], ['우선순위를 정하고, 요구사항과 테스트를 서로 추적해요', 'prioritize, and trace each requirement to its tests']], 'sfx-xs sfx-a');
  fin(S, 'z', 12.2, [['요구사항 공학: 도출 → 분석 → 명세 → 검증 → 관리', 'requirements engineering: elicit → analyze → specify → validate → manage', 'sfx-xs sfx-a'], ['초기에 잡은 요구사항 오류가 가장 싸요: 출시 후 고치면 수십~수백 배', 'requirement errors are cheapest early; after release they cost tens to hundreds of times more'], ['애자일에선 사용자 스토리와 인수 조건, 비기능은 품질 속성 시나리오로 적어요', 'in agile they become user stories with acceptance criteria; non-functionals become quality scenarios']]);
  S.cap(1, '요구사항 모으기', 'Gather requirements').cap(2, '기능과 비기능', 'Functional vs non-functional').cap(3, '검증 가능하게 쓰기', 'Make them testable').cap(4, '우선순위와 추적', 'Prioritize and trace').cap(5, '요구사항 공학', 'Requirements engineering');
  return S;
}
function sVmodel() {
  const S = scene({ id: 'se-vmodel', steps: 5, per: 1.6 });
  const L = [[['요구사항 분석', 'requirements'], 1, 1.2], [['시스템 설계', 'system design'], 3, 3.6], [['아키텍처 설계', 'architecture'], 5, 6], [['모듈 설계', 'module design'], 7, 8.4]];
  const R = [[['인수 테스트', 'acceptance test'], 24.5, 1.2], [['시스템 테스트', 'system test'], 22.5, 3.6], [['통합 테스트', 'integration test'], 20.5, 6], [['단위 테스트', 'unit test'], 18.5, 8.4]];
  L.forEach(([t, x, y], i) => { box2(S, 'l' + i, x, y, 6.5, 1.6, t, 'accent', 1, { pct: 30 }); if (i) seg(S, 'ls' + i, [L[i - 1][1] + 3.25, L[i - 1][2] + 1.65], [x + 3.25, y - .05], 1, 'accent', .1); });
  box2(S, 'code', 12.75, 10.6, 6.5, 1.6, ['코딩', 'coding'], 'warn', 2, { pct: 35 });
  seg(S, 'lc', [10.25, 10.05], [14, 10.55], 2, 'accent', .1); seg(S, 'rc', [18, 10.55], [21.75, 10.05], 2, 'ok', .1);
  R.forEach(([t, x, y], i) => { box2(S, 'r' + i, x, y, 6.5, 1.6, t, 'ok', 2, { pct: 30 }); if (i) seg(S, 'rs' + i, [x + 3.25, y - .05], [R[i - 1][1] + 3.25, R[i - 1][2] + 1.65], 2, 'ok', .1); });
  L.forEach(([, x, y], i) => { seg(S, 'h' + i, [x + 6.6, y + .8], [R[i][1] - .1, y + .8], 3, 'warn', .07, { dash: 1 }); });
  [['인수 기준', 'acceptance criteria'], ['시스템 테스트 계획', 'system test plan'], ['통합 테스트 계획', 'integration plan'], ['단위 테스트 설계', 'unit test design']].forEach((t, i) => T(S, 'hl' + i, L[i][1] + 6.8, L[i][2] + .05, t, 'sfx-tiny sfx-w', 3));
  stepT(S, 'k', 1, 12.8, [['왼쪽 팔: 요구사항에서 세부 설계로 내려가요', 'left arm: descend from requirements to detailed design'], ['바닥에서 코딩한 뒤, 오른쪽 팔로 올라가며 테스트해요', 'code at the bottom, then climb the right arm testing'], ['같은 높이끼리 짝: 각 설계 단계가 그 단계를 검증할 테스트를 미리 정해요', 'levels pair up: each design stage defines the test that will verify it'], ['검증(제품을 올바르게 만들었나) vs 확인(올바른 제품을 만들었나)', 'verification (built it right?) vs validation (built the right thing?)']], 'sfx-xs sfx-a');
  fin(S, 'z', 14, [['V 모델: 폭포수의 각 단계에 짝이 되는 테스트 단계를 붙인 모델', 'the V-model pairs each waterfall phase with a matching test phase', 'sfx-xs sfx-a'], ['안전이 중요한 분야(자동차 ISO 26262, 의료, 항공)에서 지금도 많이 써요', 'still common in safety-critical fields (automotive ISO 26262, medical, aerospace)'], ['애자일 팀도 스프린트마다 작은 V를 돌고, 테스트 설계를 앞당겨요(시프트 레프트)', 'agile teams run a small V every sprint and move test design earlier (shift left)']]);
  S.cap(1, '설계로 내려가기', 'Down into design').cap(2, '테스트로 올라가기', 'Up through testing').cap(3, '같은 높이끼리 짝', 'Pair the levels').cap(4, '검증과 확인', 'Verification and validation').cap(5, 'V 모델', 'The V-model');
  return S;
}

/* ================= testing ================= */
function sMutation() {
  const S = scene({ id: 'se-mutation', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 14.5, ['function isAdult(age) {', '  return age >= 18;', '}'], [[1, 2]], { hoff: 3 });
  code(S, 'ts', 1, 6.6, 14.5, ['expect(isAdult(30)).toBe(true);', 'expect(isAdult(5)).toBe(false);'], [], {});
  code(S, 't3', 1, 10, 14.5, ['expect(isAdult(18)).toBe(true);'], [], { st: 4 });
  T(S, 'cv', 1, 5.6, ['테스트 통과 ✓ · 커버리지 100% ✓', 'tests pass ✓ · 100% coverage ✓'], 'sfx-xs sfx-g', 1);
  T(S, 'mt', 17, .2, ['돌연변이(뮤턴트)', 'mutants'], 'sfx-xs sfx-a', 2);
  const M = [['age > 18', 'danger', 'ok'], ['age <= 18', 'ok', 'ok'], ['return true', 'ok', 'ok']];
  M.forEach(([m, c3, c4], i) => { const y = 1.2 + i * 1.6; box2(S, 'm' + i, 17, y, 7.6, 1.3, m, 'warn', 2, { pct: 30 }); box2(S, 'r' + i, 25, y, 6, 1.3, i === 0 ? '' : ['죽음 ✓', 'killed ✓'], c3, 3, { pct: 35 }); });
  T(S, 'r0a', 25, 1.55, ['살아남음 ✗', 'survived ✗'], 'cz-tc sfx-xs sfx-r', 3, { w: 6, off: 4 }); T(S, 'r0b', 25, 1.55, ['죽음 ✓', 'killed ✓'], 'cz-tc sfx-xs sfx-g', 4, { w: 6 }); tsets(S, 'r0', [[4, 'ok', 35]]);
  T(S, 's3', 17, 6.2, ['점수 = 죽인 뮤턴트 / 전체 = 2/3 (67%)', 'score = killed / total = 2/3 (67%)'], 'sfx-xs sfx-r', 3, { off: 4 }); T(S, 's4', 17, 6.2, ['점수 = 3/3 (100%) ✓', 'score = 3/3 (100%) ✓'], 'sfx-xs sfx-g', 4);
  T(S, 's3b', 17, 7.2, ['18일 때를 아무도 검사 안 했어요', 'nobody tested the boundary at 18'], 'sfx-xs', 3, { off: 4 }); T(S, 's4b', 17, 7.2, ['경계값 테스트 하나로 잡았어요', 'one boundary test catches it'], 'sfx-xs', 4);
  stepT(S, 'k', 1, 12.3, [['커버리지 100%: 모든 줄이 실행됐다는 뜻일 뿐, 검사했다는 뜻은 아니에요', '100% coverage means every line ran, not that anything was checked'], ['코드를 일부러 조금씩 망가뜨린 뮤턴트를 만들어요 (>= → >, return true …)', 'make mutants by breaking the code slightly (>= → >, return true …)'], ['뮤턴트마다 테스트를 돌려요: 실패하면 죽음 ✓, 통과하면 살아남음 ✗', 'run the tests per mutant: a failure kills it ✓, a pass means it survived ✗'], ['살아남은 뮤턴트 = 빠진 테스트 · 18을 넣는 테스트로 해결', 'a surviving mutant = a missing test · fixed by testing 18']], 'sfx-xs sfx-a');
  fin(S, 'z', 13.6, [['뮤테이션 테스트: 테스트가 버그를 정말 잡는지, 버그를 심어 보고 확인해요', 'mutation testing plants bugs to check that your tests really catch them', 'sfx-xs sfx-a'], ['PIT(Java), Stryker(JS·C#), mutmut(Python) · 느려서 핵심 모듈이나 PR 변경분에만 돌려요', 'PIT (Java), Stryker (JS/C#), mutmut (Python) · slow, so run it on core modules or changed code'], ['커버리지는 “안 테스트한 곳”을, 뮤테이션 점수는 “테스트가 약한 곳”을 알려줘요', 'coverage shows what’s untested; mutation score shows where tests are weak']]);
  S.cap(1, '100% 커버리지', '100% coverage').cap(2, '뮤턴트 만들기', 'Make mutants').cap(3, '살아남은 뮤턴트', 'A survivor').cap(4, '경계값 테스트 추가', 'Add a boundary test').cap(5, '뮤테이션 테스트', 'Mutation testing');
  return S;
}
function sProperty() {
  const S = scene({ id: 'se-property', steps: 5, per: 1.6 });
  code(S, 'ex', 1, .8, 16, ['expect(mySort([3, 1, 2])).toEqual([1, 2, 3]);', 'expect(mySort([])).toEqual([]);'], [], { st: 1 });
  T(S, 'exn', 1, 4.1, ['예시 몇 개는 통과 ✓', 'a few examples pass ✓'], 'sfx-xs sfx-g', 1);
  code(S, 'pr', 1, 5.2, 16, ['fc.assert(fc.property(fc.array(fc.integer()),', '  xs => mySort(xs).length === xs.length));'], [], { st: 2 });
  T(S, 'prn', 1, 8.5, ['속성: 어떤 배열이든 정렬해도 길이는 같다', 'property: sorting any array keeps its length'], 'sfx-xs sfx-a', 2);
  T(S, 'gt', 17.6, .2, ['무작위 입력 100개 생성', '100 random inputs generated'], 'sfx-xs sfx-a', 3);
  [['#1  []', 'ok'], ['#2  [4]', 'ok'], ['#3  [9, -2]', 'ok'], ['…', 'line'], ['#37 [5, -2, 5, 9, 0]', 'danger']].forEach(([t, c], i) => box2(S, 'g' + i, 17.6, 1.2 + i * 1.4, 10, 1.2, t + (c === 'ok' ? '  ✓' : c === 'danger' ? '  ✗' : ''), c, 3, { pct: 30 }));
  T(S, 'sh', 17.6, 8.4, ['축소(shrinking)', 'shrinking'], 'sfx-xs sfx-w', 4);
  ['[5, -2, 5, 9, 0]', '[5, 5, 9]', '[5, 5]', '[0, 0]'].forEach((t, i) => { box2(S, 's' + i, 17.6 + (i % 2) * 7, 9.4 + Math.floor(i / 2) * 1.6, 6, 1.3, t, i === 3 ? 'danger' : 'warn', 4, { pct: 30 }); });
  T(S, 'bug', 1, 9.6, ['최소 반례 [0, 0] → 중복 값이 사라지는 버그!', 'minimal counterexample [0, 0] → duplicates get dropped!'], 'sfx-xs sfx-r', 4);
  stepT(S, 'k', 1, 11, [['예시 기반 테스트: 내가 떠올린 입력만 확인해요', 'example-based tests check only inputs you thought of'], ['대신 “항상 성립해야 하는 성질”을 적어요', 'instead, state a property that must always hold'], ['도구가 무작위 입력을 쏟아붓다가 37번째에서 실패를 찾았어요', 'the tool pours in random inputs and fails on case #37'], ['실패한 입력을 줄이고 줄여 가장 단순한 반례를 보여줘요', 'it shrinks the failing input down to the simplest counterexample']], 'sfx-xs sfx-a');
  fin(S, 'z', 12.6, [['속성 기반 테스트: 입력을 자동 생성해 “모든 입력에 대해” 성질이 지켜지는지 확인해요', 'property-based testing generates inputs to check a property holds for all of them', 'sfx-xs sfx-a'], ['좋은 성질: 왕복(decode(encode(x)) = x), 불변량(길이·합), 기준 구현과 비교, 멱등성', 'good properties: round trips (decode(encode(x)) = x), invariants (length, sum), oracles, idempotence'], ['QuickCheck(Haskell)에서 시작 · Hypothesis(Python), fast-check(JS), jqwik(Java)', 'pioneered by QuickCheck (Haskell) · Hypothesis (Python), fast-check (JS), jqwik (Java)']]);
  S.cap(1, '예시 기반 테스트', 'Example-based tests').cap(2, '성질을 적어요', 'State a property').cap(3, '무작위 입력으로 공격', 'Attack with random inputs').cap(4, '반례 축소', 'Shrink the counterexample').cap(5, '속성 기반 테스트', 'Property-based testing');
  return S;
}
function sFlaky() {
  const S = scene({ id: 'se-flaky', steps: 5, per: 1.6 });
  T(S, 'ht', 1, .2, ['같은 커밋, 같은 테스트를 10번 실행', 'the same commit and test, run 10 times'], 'sfx-xs sfx-a', 1);
  '✓✓✗✓✓✓✗✓✓✓'.split('').forEach((c, i) => box2(S, 'h' + i, 1 + i * 2.2, 1.2, 1.9, 1.4, c, c === '✓' ? 'ok' : 'danger', 1, { pct: 40 }));
  T(S, 'hn', 23.4, 1.5, ['20% 실패 → 불안정', '20% failures → flaky'], 'sfx-xs sfx-r', 1);
  [[['타이밍', 'timing'], ['async가 끝나기 전에 검사', 'asserts before async finishes']], [['실행 순서 의존', 'order dependence'], ['앞 테스트가 상태를 남김', 'a previous test leaves state']], [['시간·난수', 'time & randomness'], ['Date.now(), Math.random()', 'Date.now(), Math.random()']], [['외부 네트워크', 'external network'], ['느린 API, 타임아웃', 'slow APIs, timeouts']]].forEach(([t, d], i) => { box2(S, 'c' + i, 1 + i * 7.6, 3.6, 7.2, 1.4, t, 'warn', 2, { pct: 30 }); T(S, 'cd' + i, 1 + i * 7.6, 5.2, d, 'cz-tc sfx-tiny', 2, { w: 7.2 }); });
  code(S, 'bad', 1, 6.6, 14.6, ['await sleep(100);', 'expect(job.done).toBe(true);'], [], { st: 3 });
  code(S, 'good', 16.4, 6.6, 14.6, ['await waitFor(() => job.done);', 'const clock = fakeClock(t0); seed(42);'], [], { st: 3 });
  T(S, 'bx', 13.6, 6.75, '✗', 'sfx-s sfx-r', 3); T(S, 'gx', 29.9, 6.75, '✓', 'sfx-s sfx-g', 3);
  stepT(S, 'k', 1, 10.4, [['코드가 그대로인데 결과가 바뀌는 테스트', 'a test whose result changes while the code doesn’t'], ['원인은 대개 넷: 타이밍, 순서 의존, 시간·난수, 외부 의존', 'usually one of four causes: timing, order, time/randomness, external dependencies'], ['고치기: 조건을 기다리고, 상태를 매번 새로, 시계·시드를 주입, 외부는 가짜로', 'fix it: wait for conditions, fresh state each time, inject clocks and seeds, fake externals'], ['격리(quarantine)하고 불안정 비율을 추적 · 무작정 재시도는 문제를 숨겨요', 'quarantine it and track flake rates · blind retries hide the problem']], 'sfx-xs sfx-a');
  fin(S, 'z', 12, [['불안정한 테스트는 신뢰를 갉아먹어요: “그냥 다시 돌려” 문화가 되면 진짜 실패도 무시해요', 'flaky tests erode trust: once “just rerun it” is the norm, real failures get ignored too', 'sfx-xs sfx-a'], ['Google 조사에서 테스트의 약 16%가 어느 정도 불안정했어요', 'a Google study found about 16% of tests showed some flakiness'], ['테스트는 결정적이어야 해요: 같은 입력, 같은 결과', 'tests must be deterministic: same input, same result']]);
  S.cap(1, '결과가 들쭉날쭉', 'Results that flip').cap(2, '흔한 원인 넷', 'Four common causes').cap(3, '결정적으로 고치기', 'Make it deterministic').cap(4, '격리하고 추적', 'Quarantine and track').cap(5, '불안정한 테스트', 'Flaky tests');
  return S;
}
function sContractTest() {
  const S = scene({ id: 'se-contract', steps: 5, per: 1.6 });
  box2(S, 'cons', 1, 2.4, 7.4, 2.2, ['소비자: 웹 앱', 'consumer: web app'], 'accent', 0, { pct: 30 }); box2(S, 'prov', 23.6, 2.4, 7.4, 2.2, ['제공자: 사용자 API', 'provider: user API'], 'ok', 0, { pct: 30 });
  seg(S, 'e2e', [8.5, 3.5], [23.5, 3.5], 1, 'danger', .08, { dash: 1, off: 2 }); T(S, 'e2el', 9.6, 2.4, ['E2E: 둘 다 띄워야 · 느리고 불안정', 'E2E: deploy both · slow and flaky'], 'sfx-tiny sfx-r', 1, { off: 2 });
  rect(S, 'doc', 11.4, 1, 9.2, 5.2, 'warn', 14, 2, { r: .3, css: 'border:.1em solid var(--warn)' }); T(S, 'dt', 11.7, 1.15, 'pact.json', 'cz-mono sfx-xs sfx-w', 2);
  ['GET /users/1', '→ 200', '{ "id": 1,', '  "name": "Kim" }'].forEach((t, i) => T(S, 'dl' + i, 11.9, 2.2 + i * .9, t, 'cz-mono sfx-xs', 2));
  tsets(S, 'doc', [[4, 'danger', 14]]);
  ar(S, 'g', [8.5, 4.2], [11.3, 4.2], 'accent', 2, { h: .1 }); T(S, 'gl', 7.9, 5, ['생성', 'generates'], 'sfx-tiny sfx-a', 2);
  ar(S, 'v', [20.7, 4.2], [23.5, 4.2], 'ok', 3, { h: .1 }); T(S, 'vl', 20.6, 5, ['검증', 'verifies'], 'sfx-tiny sfx-g', 3);
  T(S, 'ok', 23.6, 5, ['제공자 CI: 재생 → 일치 ✓', 'provider CI: replay → match ✓'], 'sfx-xs sfx-g', 3, { off: 4 });
  T(S, 'ch', 23.6, 5, ['name → fullName 변경 ✗', 'name → fullName rename ✗'], 'cz-mono sfx-xs sfx-r', 4); T(S, 'ch2', 23.6, 6, ['can-i-deploy: 배포 차단', 'can-i-deploy: blocked'], 'cz-mono sfx-xs sfx-r', 4);
  tsets(S, 'prov', [[4, 'danger', 30]]);
  stepT(S, 'k', 1, 7.6, [['서비스 간 호환성을 E2E로만 확인하면 느리고 깨지기 쉬워요', 'checking compatibility only end-to-end is slow and brittle'], ['소비자 테스트가 가짜 제공자를 상대로 돌며 “내가 기대하는 요청·응답”을 계약 파일로 남겨요', 'consumer tests run against a mock provider and record expected requests and responses as a contract'], ['제공자는 자기 CI에서 계약을 재생해 실제 응답이 맞는지 검증해요', 'the provider replays the contract in its own CI to verify real responses'], ['소비자가 쓰는 필드를 바꾸면 배포 전에 바로 걸려요', 'renaming a field a consumer relies on fails before deployment']], 'sfx-xs sfx-a');
  fin(S, 'z', 9.4, [['소비자 주도 계약 테스트: 각 서비스를 따로 빠르게 테스트하면서도 연결이 안 깨지게 해요', 'consumer-driven contract tests keep services independently testable without breaking integrations', 'sfx-xs sfx-a'], ['Pact와 Pact Broker, Spring Cloud Contract · OpenAPI 스키마 검증도 비슷한 역할', 'Pact and the Pact Broker, Spring Cloud Contract · OpenAPI schema checks play a similar role'], ['테스트 피라미드에서 단위와 E2E 사이의 빈틈을 메워요', 'fills the gap between unit tests and E2E in the test pyramid']]);
  S.cap(1, 'E2E만으로는 힘들어요', 'E2E alone hurts').cap(2, '소비자가 계약을 만들어요', 'The consumer writes the contract').cap(3, '제공자가 검증해요', 'The provider verifies it').cap(4, '깨지는 변경을 미리 잡기', 'Catch breaking changes early').cap(5, '계약 테스트', 'Contract testing');
  return S;
}

/* ================= modeling ================= */
function sUsecase() {
  const S = scene({ id: 'se-usecase', steps: 5, per: 1.6 });
  frame(S, 'sys', 6.6, .8, 17.8, 12.6, 'ink-3', 1, { w: .1, r: .3 }); T(S, 'syst', 6.9, .95, ['쇼핑몰 시스템', 'shop system'], 'sfx-xs sfx-a', 1);
  actor(S, 'cu', 3, 3.2, ['고객', 'customer'], 1); actor(S, 'ad', 3, 9.4, ['관리자', 'admin'], 2); actor(S, 'pg', 28, 4, ['결제사', 'payment provider'], 2);
  const U = [['u1', 9, 2, ['상품 검색', 'search products'], 1], ['u2', 9, 4.8, ['주문하기', 'place order'], 1], ['u3', 9, 7.6, ['주문 취소', 'cancel order'], 1], ['u4', 17, 4.8, ['결제하기', 'pay'], 2], ['u5', 17, 2, ['쿠폰 적용', 'apply coupon'], 3], ['u6', 9, 10.8, ['상품 관리', 'manage products'], 2]];
  U.forEach(([k, x, y, l, st]) => oval(S, k, x, y, 6, 1.6, l, 'accent', st));
  [[2.8], [5.6], [8.4]].forEach(([y], i) => seg(S, 'cl' + i, [3.9, 4.6], [8.95, y], 1, 'ink-3', .07));
  seg(S, 'al', [3.9, 10.8], [8.95, 11.6], 2, 'ink-3', .07); seg(S, 'pl', [27.1, 5.4], [23.05, 5.6], 2, 'ink-3', .07);
  ar(S, 'inc', [15.05, 5.6], [16.9, 5.6], 'warn', 3, { h: .08, dash: 1 }); T(S, 'incl', 14.4, 6.5, '«include»', 'cz-mono sfx-tiny sfx-w', 3);
  elb(S, 'ext', [[20, 3.65], [20, 4.25], [13.5, 4.25], [13.5, 4.75]], 'warn', 3, { h: .08, dash: 1 }); T(S, 'extl', 14.6, 3.45, '«extend»', 'cz-mono sfx-tiny sfx-w', 3);
  stepT(S, 'k', 1, 14, [['행위자(시스템 밖의 사람·시스템)와 그들이 얻는 기능(유스케이스)', 'actors (people or systems outside) and the functions they get (use cases)'], ['관리자와 외부 결제사도 행위자예요 · 시스템 경계 밖에 그려요', 'admins and the external payment provider are actors too, drawn outside the boundary'], ['include: 주문하면 결제는 항상 포함 · extend: 쿠폰은 가끔 덧붙는 선택 흐름', 'include: placing an order always includes paying · extend: a coupon optionally extends it'], ['유스케이스마다 기본 흐름·대안 흐름·예외를 글로 적어 요구사항을 완성해요', 'each use case gets a written main flow, alternatives and exceptions']], 'sfx-xs sfx-a');
  fin(S, 'z', 15.2, [['유스케이스 다이어그램: “누가 시스템으로 무엇을 하나”를 한눈에 보여 줘요', 'a use-case diagram shows who does what with the system at a glance', 'sfx-xs sfx-a'], ['구현 방법이 아니라 사용자 관점의 목표를 그리고, 범위(경계)를 합의하는 데 써요', 'it captures user goals, not implementation, and helps agree on scope (the boundary)']]);
  S.cap(1, '행위자와 유스케이스', 'Actors and use cases').cap(2, '다른 행위자들', 'Other actors').cap(3, 'include와 extend', 'Include and extend').cap(4, '유스케이스 명세', 'Use-case specifications').cap(5, '유스케이스 다이어그램', 'Use-case diagrams');
  return S;
}
function sC4() {
  const S = scene({ id: 'se-c4', steps: 5, per: 1.6 });
  const LAD = [['Context', 'accent'], ['Container', 'ok'], ['Component', 'warn'], ['Code', 'line']];
  LAD.forEach(([l], i) => box2(S, 'z' + i, 27, 1.2 + i * 1.7, 4, 1.4, l, 'line', 0, { pct: 40 }));
  tsets(S, 'z0', [[1, 'accent', 40], [2, 'line', 40]]); tsets(S, 'z1', [[2, 'ok', 40], [3, 'line', 40]]); tsets(S, 'z2', [[3, 'warn', 40], [5, 'line', 40]]); tsets(S, 'z3', [[4, 'accent', 25], [5, 'line', 40]]);
  T(S, 'zl', 27, .3, ['확대 단계', 'zoom level'], 'sfx-tiny', 0);
  /* level 1 */
  box2(S, 'p', 1, 4, 5, 2, ['고객', 'customer'], 'line', 1, { pct: 40, off: 2 }); box2(S, 'sy', 9, 3.4, 7, 3.2, ['쇼핑몰 시스템', 'shop system'], 'accent', 1, { pct: 35, off: 2 });
  box2(S, 'x1', 19.5, 1.6, 6, 1.8, ['결제사', 'payment provider'], 'line', 1, { pct: 40, off: 2 }); box2(S, 'x2', 19.5, 6.6, 6, 1.8, ['메일 서비스', 'email service'], 'line', 1, { pct: 40, off: 2 });
  ar(S, 'pa', [6.1, 5], [8.9, 5], 'ink-3', 1, { h: .08, off: 2 }); elb(S, 'sa1', [[16.1, 4.2], [17.8, 4.2], [17.8, 2.5], [19.4, 2.5]], 'ink-3', 1, { h: .08, off: 2 }); elb(S, 'sa2', [[16.1, 5.8], [17.8, 5.8], [17.8, 7.5], [19.4, 7.5]], 'ink-3', 1, { h: .08, off: 2 });
  /* level 2 */
  frame(S, 'b2', 3, 1, 22, 9.6, 'accent', 2, { dash: 1, w: .1, off: 3 }); T(S, 'b2l', 3.3, 1.15, ['쇼핑몰 시스템', 'shop system'], 'sfx-xs sfx-a', 2, { off: 3 });
  [['w', 4, 2.2, 'Web (React)'], ['q', 14.6, 2.2, 'Queue (Kafka)'], ['a', 4, 6.8, 'API (Spring)'], ['d', 14.6, 6.8, 'DB (Postgres)']].forEach(([k, x, y, l]) => box2(S, 'c' + k, x, y, 9.4, 2, l, 'ok', 2, { pct: 30, off: 3 }));
  ar(S, 'wa', [8.7, 4.3], [8.7, 6.7], 'ink-3', 2, { h: .08, off: 3 }); ar(S, 'ad', [13.5, 7.8], [14.5, 7.8], 'ink-3', 2, { h: .08, off: 3 }); elb(S, 'aq', [[11, 6.7], [11, 5.4], [19.3, 5.4], [19.3, 4.3]], 'ink-3', 2, { h: .08, off: 3 });
  /* level 3 */
  frame(S, 'b3', 3, 1, 22, 9.6, 'ok', 3, { dash: 1, w: .1 }); T(S, 'b3l', 3.3, 1.15, 'API (Spring)', 'sfx-xs sfx-g', 3);
  [['oc', 4, 2.2, 'OrderController'], ['pc', 14.6, 2.2, 'PaymentClient'], ['os', 4, 6.8, 'OrderService'], ['or', 14.6, 6.8, 'OrderRepository']].forEach(([k, x, y, l]) => box2(S, k, x, y, 9.4, 2, l, 'warn', 3, { pct: 30 }));
  ar(S, 'm1', [8.7, 4.3], [8.7, 6.7], 'ink-3', 3, { h: .08 }); ar(S, 'm2', [13.5, 7.8], [14.5, 7.8], 'ink-3', 3, { h: .08 }); elb(S, 'm3', [[11, 6.7], [11, 5.4], [19.3, 5.4], [19.3, 4.3]], 'ink-3', 3, { h: .08 });
  stepT(S, 'k', 1, 11.4, [['① 시스템 맥락: 우리 시스템과 사용자, 외부 시스템', '① context: our system, its users and external systems'], ['② 컨테이너: 시스템 안의 배포 단위(웹, API, DB, 큐)와 통신', '② containers: deployable units inside (web, API, DB, queue) and how they talk'], ['③ 컴포넌트: 한 컨테이너 안의 주요 구성 요소', '③ components: the major parts inside one container'], ['④ 코드: 클래스 수준 · 보통 생략하고 IDE에 맡겨요', '④ code: class level · usually skipped and left to the IDE']], 'sfx-xs sfx-a');
  fin(S, 'z', 12.8, [['C4 모델: 지도를 확대하듯 Context → Container → Component → Code 네 단계로 아키텍처를 그려요', 'the C4 model draws architecture like a zoomable map: context → container → component → code', 'sfx-xs sfx-a'], ['상자와 화살표에 이름·기술·역할을 적는 단순한 표기라 개발자 아닌 사람도 읽어요', 'simple boxes and arrows labeled with name, tech and purpose, readable by non-developers too'], ['Structurizr DSL, PlantUML, Mermaid로 “다이어그램을 코드로” 관리하고 PR로 리뷰해요', 'manage “diagrams as code” with Structurizr DSL, PlantUML or Mermaid and review them in PRs']]);
  S.cap(1, '시스템 맥락', 'System context').cap(2, '컨테이너로 확대', 'Zoom into containers').cap(3, '컴포넌트로 확대', 'Zoom into components').cap(4, '코드 단계', 'The code level').cap(5, 'C4 모델', 'The C4 model');
  return S;
}
function sAdr() {
  const S = scene({ id: 'se-adr', steps: 5, per: 1.6 });
  T(S, 'q', 1, .2, ['“왜 Kafka를 썼지?” — 결정한 사람은 이미 퇴사', '“why Kafka?” — the person who decided has left'], 'sfx-xs sfx-r', 1);
  rect(S, 'doc', 1, 1.2, 18.6, 11, 'line', 25, 2, { r: .3, css: 'border:.1em solid var(--line)' });
  T(S, 'h', 1.5, 1.5, ['ADR-007: 이벤트 전달에 Kafka 사용', 'ADR-007: use Kafka for event delivery'], 'sfx-s sfx-a', 2);
  const L = [[['상태: 승인됨 (2025-03-04)', 'Status: Accepted (2025-03-04)'], 'sfx-xs sfx-g', 2], [['맥락', 'Context'], 'sfx-xs sfx-a', 2], [['주문 이벤트를 여러 서비스가 재처리할 수 있어야 함', 'several services must be able to replay order events'], 'sfx-xs', 2], [['결정', 'Decision'], 'sfx-xs sfx-a', 2], [['Kafka(보존 7일)로 이벤트를 발행한다', 'publish events to Kafka (7-day retention)'], 'sfx-xs', 2], [['결과', 'Consequences'], 'sfx-xs sfx-a', 3], [['+ 재생·확장 쉬움, 서비스 간 결합 감소', '+ easy replay and scaling, looser coupling'], 'sfx-xs sfx-g', 3], [['− 운영 부담(클러스터), 순서는 파티션 단위', '− operational load (cluster), ordering per partition only'], 'sfx-xs sfx-r', 3], [['검토한 대안: RabbitMQ, DB 폴링', 'alternatives considered: RabbitMQ, DB polling'], 'sfx-xs', 3]];
  L.forEach(([t, c, st], i) => T(S, 'l' + i, 1.6, 2.8 + i * 1, t, c, st));
  [['Proposed', 'line', 4], ['Accepted', 'ok', 2], ['Superseded by ADR-012', 'warn', 4]].forEach(([l, c, st], i) => box2(S, 's' + i, 21.4, 1.8 + i * 2.4, 9.6, 1.5, l, c, st, { pct: 35 }));
  ar(S, 'sa0', [26.2, 3.4], [26.2, 4.1], 'ink-3', 4, { h: .08 }); ar(S, 'sa1', [26.2, 5.8], [26.2, 6.5], 'ink-3', 4, { h: .08 });
  T(S, 'sn', 21.4, 8.6, ['고치지 않고 새 ADR로 대체 → 역사가 남아요', 'never edit; supersede with a new ADR'], 'sfx-xs', 4);
  T(S, 'fp', 21.4, 9.8, 'docs/adr/0007-kafka.md', 'cz-mono sfx-xs sfx-a', 4);
  stepT(S, 'k', 1, 12.8, [['코드는 “무엇”을 남기지만 “왜”는 사라지기 쉬워요', 'code keeps the “what”; the “why” evaporates'], ['ADR: 결정 하나를 맥락·결정·결과로 짧게 적은 문서', 'an ADR records one decision as context, decision and consequences'], ['장점과 대가, 검토한 대안까지 솔직하게 남겨요', 'record the upsides, the costs and the alternatives honestly'], ['저장소에 마크다운으로 두고 PR로 리뷰 · 바뀌면 새 ADR로 대체', 'keep them as markdown in the repo, review via PR, supersede when things change']], 'sfx-xs sfx-a');
  fin(S, 'z', 14.2, [['아키텍처 결정 기록(ADR): 중요한 기술 결정을 짧은 문서로 남겨 미래의 팀에게 이유를 전해요', 'architecture decision records keep significant technical decisions short and explain the “why” to future teams', 'sfx-xs sfx-a'], ['한 페이지 이내, 결정 하나에 문서 하나 · 마이클 나이가드의 템플릿이 널리 쓰여요', 'one page, one decision per document · Michael Nygard’s template is widely used']]);
  S.cap(1, '사라진 이유', 'The lost “why”').cap(2, '맥락과 결정', 'Context and decision').cap(3, '결과와 대안', 'Consequences and alternatives').cap(4, '수명 주기', 'Lifecycle').cap(5, '아키텍처 결정 기록', 'Architecture decision records');
  return S;
}

/* ================= team ================= */
function sDora() {
  const S = scene({ id: 'se-dora', steps: 5, per: 1.6 });
  const C = [[1, 1, ['배포 빈도', 'deployment frequency'], ['운영에 얼마나 자주 배포하나', 'how often you ship to production'], ['엘리트: 하루 여러 번', 'elite: several a day'], ['낮음: 월 1회 미만', 'low: < once a month'], 'accent', 1], [16.6, 1, ['변경 리드 타임', 'lead time for changes'], ['커밋 → 운영 반영까지', 'commit to running in production'], ['엘리트: 하루 이내', 'elite: under a day'], ['낮음: 1~6개월', 'low: 1–6 months'], 'accent', 1], [1, 5.9, ['변경 실패율', 'change failure rate'], ['장애·롤백을 부른 배포 비율', 'share of deploys causing failure'], ['엘리트: 0~15%', 'elite: 0–15%'], ['낮음: 46~60%', 'low: 46–60%'], 'warn', 2], [16.6, 5.9, ['서비스 복구 시간', 'time to restore service'], ['장애에서 회복까지', 'from incident to recovery'], ['엘리트: 1시간 이내', 'elite: under an hour'], ['낮음: 1주~1개월', 'low: 1 week – 1 month'], 'warn', 2]];
  C.forEach(([x, y, t, d, e, l, c, st], i) => { rect(S, 'c' + i, x, y, 14.4, 4, c, 10, st, { r: .35, css: `border:.1em solid var(--${c})` }); T(S, 't' + i, x + .4, y + .3, t, `sfx-s sfx-${c === 'accent' ? 'a' : 'w'}`, st); T(S, 'd' + i, x + .4, y + 1.35, d, 'sfx-xs', st); box2(S, 'e' + i, x + .4, y + 2.4, 6.6, 1.2, e, 'ok', 3, { pct: 35 }); box2(S, 'l' + i, x + 7.4, y + 2.4, 6.6, 1.2, l, 'danger', 3, { pct: 30 }); });
  T(S, 'g1', 1, .2, ['속도 (처리량)', 'speed (throughput)'], 'sfx-xs sfx-a', 1); T(S, 'g2', 1, 5.1, ['안정성', 'stability'], 'sfx-xs sfx-w', 2);
  stepT(S, 'k', 1, 10.3, [['처리량 지표: 얼마나 자주, 얼마나 빨리 내보내나', 'throughput: how often and how fast you ship'], ['안정성 지표: 얼마나 자주 깨지고, 얼마나 빨리 고치나', 'stability: how often things break and how fast you recover'], ['조사 결과(예시 기준): 상위 팀과 하위 팀의 차이는 수백 배', 'survey bands (illustrative): top and bottom teams differ by orders of magnitude'], ['속도와 안정성은 반비례가 아니에요: 작은 변경을 자주 내는 팀이 둘 다 좋아요', 'speed and stability aren’t a trade-off: teams shipping small changes often do well at both']], 'sfx-xs sfx-a');
  T(S, 'w', 1, 11.4, ['개인 평가가 아니라 팀·시스템 개선용 · 목표로 삼는 순간 왜곡돼요 (굿하트의 법칙)', 'for improving teams and systems, not rating people · once made targets, they get gamed (Goodhart’s law)'], 'sfx-xs sfx-r', 4);
  fin(S, 'z', 12.8, [['DORA 4대 지표: 배포 빈도, 변경 리드 타임, 변경 실패율, 복구 시간', 'the four DORA metrics: deployment frequency, lead time, change failure rate and time to restore', 'sfx-xs sfx-a'], ['『Accelerate』와 State of DevOps 보고서에서 나왔고, 조직 성과와의 상관을 보여줬어요', 'from “Accelerate” and the State of DevOps reports, which linked them to organizational performance'], ['CI/CD·작은 배치·트렁크 기반 개발·자동화된 테스트가 지표를 끌어올려요', 'CI/CD, small batches, trunk-based development and test automation move the needle']]);
  S.cap(1, '속도 지표 둘', 'Two speed metrics').cap(2, '안정성 지표 둘', 'Two stability metrics').cap(3, '상위 팀 vs 하위 팀', 'Top vs bottom performers').cap(4, '어떻게 써야 하나', 'How to use them').cap(5, 'DORA 지표', 'DORA metrics');
  return S;
}

return { css: CSSX, secs: [], add: {
  'se-proc': [
    item('se-req', '요구사항 공학', 'Requirements engineering', '무엇을 만들어야 하는지 이해관계자에게서 도출하고, 분석·명세·검증·관리하는 활동이에요.', '요구사항은 기능(무엇을 하나: 비밀번호 재설정)과 비기능(얼마나 잘 하나: 성능, 보안, 가용성 99.9%)으로 나눠요. “빠르게 로딩”처럼 모호한 요구는 “3G에서 첫 화면 p95 ≤ 2초”처럼 측정·검증 가능하게 다시 써요. MoSCoW(Must, Should, Could, Won’t)로 우선순위를 정하고, 요구사항과 테스트를 추적 매트릭스로 연결해요. 요구사항 오류는 초기에 잡을수록 싸요.', 'The work of eliciting what to build from stakeholders, then analyzing, specifying, validating and managing it.', 'Requirements split into functional ones (what it does: reset a password) and non-functional ones (how well: performance, security, 99.9% availability). Vague wishes like “loads fast” are rewritten to be measurable and testable, such as “first screen p95 ≤ 2 s on 3G”. MoSCoW (Must, Should, Could, Won’t) sets priorities, and a traceability matrix links requirements to tests. Requirement errors are cheapest to fix early.', sReq()),
    item('se-vmodel', 'V 모델', 'The V-model', '폭포수의 각 설계 단계마다 그것을 검증할 테스트 단계를 짝지어 V자로 그린 개발 모델이에요.', '왼쪽 팔은 요구사항 분석 → 시스템 설계 → 아키텍처 설계 → 모듈 설계로 내려가고, 바닥에서 코딩한 뒤 오른쪽 팔은 단위 → 통합 → 시스템 → 인수 테스트로 올라가요. 같은 높이끼리 짝이라 각 설계 단계에서 테스트 계획을 미리 세워요. 검증(제품을 올바르게 만들었나)과 확인(올바른 제품을 만들었나)을 구분하며, 자동차·의료·항공 같은 안전 분야에서 지금도 많이 써요.', 'A development model that pairs each waterfall design phase with the test phase that verifies it, drawn as a V.', 'The left arm descends from requirements analysis through system, architecture and module design; coding sits at the bottom; the right arm climbs through unit, integration, system and acceptance testing. Each level pairs with its counterpart, so test plans are written during design. It distinguishes verification (built it right?) from validation (built the right thing?) and remains common in safety-critical fields such as automotive, medical and aerospace.', sVmodel())
  ],
  'se-test': [
    item('se-mutation', '뮤테이션 테스트', 'Mutation testing', '코드를 일부러 조금씩 망가뜨린 “뮤턴트”를 만들어, 테스트가 그 버그를 잡는지 확인해 테스트의 품질을 재요.', 'isAdult(age)는 age >= 18인데 테스트가 30과 5만 확인하면 커버리지는 100%지만 >=를 >로 바꾼 뮤턴트가 살아남아요. 18을 넣는 경계값 테스트를 추가하면 그 뮤턴트도 죽어 점수가 2/3에서 3/3이 돼요. 커버리지는 실행 여부만, 뮤테이션 점수는 검사의 강도를 알려줘요. PIT(Java), Stryker(JS·C#), mutmut(Python)이 있고, 느려서 핵심 모듈이나 변경분에만 돌려요.', 'Measure test quality by planting small bugs (“mutants”) in the code and checking whether the tests catch them.', 'If isAdult(age) is age >= 18 and the tests only try 30 and 5, coverage is 100% yet a mutant changing >= to > survives. Adding a boundary test at 18 kills it, raising the score from 2/3 to 3/3. Coverage tells you what ran; mutation score tells you how hard the tests check. Tools include PIT (Java), Stryker (JS/C#) and mutmut (Python); since it is slow, run it on core modules or changed code.', sMutation()),
    item('se-property', '속성 기반 테스트', 'Property-based testing', '예시 입력 대신 “항상 성립해야 하는 성질”을 적으면, 도구가 무작위 입력을 대량으로 만들어 반례를 찾아 줘요.', 'mySort의 예시 테스트 몇 개는 통과해도, “정렬해도 길이는 같다”는 성질을 적으면 37번째 무작위 입력에서 실패하고, 도구가 입력을 줄여 [0, 0]이라는 최소 반례를 보여 줘 중복이 사라지는 버그를 드러내요. 왕복(decode(encode(x)) = x), 불변량, 기준 구현과의 비교, 멱등성이 좋은 성질이에요. QuickCheck에서 시작해 Hypothesis, fast-check, jqwik이 있어요.', 'Instead of example inputs, state a property that must always hold and let a tool generate many random inputs to find a counterexample.', 'A few example tests of mySort pass, but the property “sorting keeps the length” fails on random input #37, and shrinking reduces it to the minimal counterexample [0, 0], exposing a bug that drops duplicates. Good properties include round trips (decode(encode(x)) = x), invariants, comparison with a reference implementation and idempotence. It began with QuickCheck; Hypothesis, fast-check and jqwik followed.', sProperty()),
    item('se-flaky', '불안정한 테스트', 'Flaky tests', '코드가 그대로인데도 실행할 때마다 통과했다 실패했다 하는 테스트예요. 팀이 테스트를 믿지 못하게 만들어요.', '원인은 대개 타이밍(비동기가 끝나기 전 검사), 실행 순서 의존(공유 상태), 시간·난수, 외부 네트워크예요. sleep 대신 조건을 기다리고, 상태를 매번 새로 만들고, 시계와 시드를 주입하고, 외부 서비스는 가짜로 바꿔 결정적으로 고쳐요. 바로 못 고치면 격리하고 불안정 비율을 추적하되, 무작정 재시도로 숨기면 “그냥 다시 돌려” 문화가 생겨 진짜 실패도 놓쳐요.', 'Tests that pass and fail on different runs while the code stays the same, eroding the team’s trust in the suite.', 'Typical causes are timing (asserting before async work finishes), order dependence (shared state), time and randomness, and external networks. Make them deterministic: wait for conditions instead of sleeping, build fresh state each time, inject clocks and seeds, and fake external services. If a fix must wait, quarantine the test and track flake rates; hiding it with blind retries breeds a “just rerun it” culture that misses real failures.', sFlaky()),
    item('se-contract', '계약 테스트', 'Contract testing', '서비스 사이의 요청·응답 약속을 계약 파일로 남겨, 각 서비스를 따로 테스트하면서도 연결이 깨지지 않게 하는 방법이에요.', '소비자(웹 앱)의 테스트가 가짜 제공자를 상대로 돌며 “GET /users/1 → 200 { id, name }” 같은 기대를 계약(pact.json)으로 기록하고, 제공자는 자기 CI에서 그 계약을 재생해 실제 응답이 맞는지 검증해요. 제공자가 name을 fullName으로 바꾸면 배포 전에 실패하고 can-i-deploy가 막아요. 느리고 불안정한 E2E를 줄이며, Pact, Spring Cloud Contract가 대표 도구예요.', 'Record the request/response promises between services as contracts so each service is tested alone without breaking the integration.', 'The consumer’s tests run against a mock provider and record expectations such as “GET /users/1 → 200 { id, name }” in a contract (pact.json); the provider replays that contract in its own CI to verify its real responses. If the provider renames name to fullName, verification fails before deployment and can-i-deploy blocks the release. It reduces slow, flaky end-to-end tests; Pact and Spring Cloud Contract are typical tools.', sContractTest())
  ],
  'se-model': [
    item('se-usecase', '유스케이스 다이어그램', 'Use-case diagrams', '시스템 밖의 행위자(사람·외부 시스템)가 시스템으로 무엇을 하는지(유스케이스)를 보여 주는 UML 다이어그램이에요.', '고객은 상품 검색·주문·취소를, 관리자는 상품 관리를 하고, 외부 결제사는 결제하기와 연결돼요. 주문하면 결제가 항상 포함되므로 «include», 쿠폰 적용처럼 가끔 덧붙는 선택 흐름은 «extend»로 그려요. 시스템 경계를 그려 범위를 합의하고, 유스케이스마다 기본 흐름·대안 흐름·예외를 글로 적어 요구사항을 완성해요.', 'A UML diagram showing what actors outside the system (people or external systems) do with it (use cases).', 'Customers search, order and cancel; admins manage products; an external payment provider connects to Pay. Placing an order always includes paying, drawn as «include», while an optional flow like applying a coupon is «extend». The system boundary makes the scope explicit, and each use case is completed with a written main flow, alternatives and exceptions.', sUsecase()),
    item('se-c4', 'C4 모델', 'The C4 model', '지도를 확대하듯 시스템 맥락 → 컨테이너 → 컴포넌트 → 코드 네 단계로 소프트웨어 아키텍처를 그리는 방법이에요.', '맥락 단계는 우리 시스템과 사용자·외부 시스템을, 컨테이너 단계는 웹·API·DB·큐 같은 배포 단위와 통신을, 컴포넌트 단계는 한 컨테이너 안의 주요 구성 요소를 보여 줘요. 코드 단계는 보통 생략하고 IDE에 맡겨요. 상자와 화살표에 이름·기술·역할을 적는 단순한 표기라 비개발자도 읽을 수 있고, Structurizr DSL이나 Mermaid로 다이어그램을 코드로 관리해요.', 'A way to draw software architecture like a zoomable map in four levels: context, containers, components and code.', 'The context level shows our system with its users and external systems; the container level shows deployable units such as web, API, database and queue and how they talk; the component level shows the major parts inside one container. The code level is usually skipped and left to the IDE. Its plain boxes and arrows labeled with name, technology and purpose are readable by non-developers, and tools like Structurizr DSL or Mermaid keep diagrams as code.', sC4()),
    item('se-adr', '아키텍처 결정 기록 (ADR)', 'Architecture decision records', '중요한 기술 결정 하나를 맥락·결정·결과로 짧게 적어, 나중의 팀이 “왜”를 알 수 있게 하는 문서예요.', '“ADR-007: 이벤트 전달에 Kafka 사용”처럼 제목을 달고, 상태(승인됨), 맥락(여러 서비스가 이벤트를 재처리해야 함), 결정, 결과(장점과 운영 부담), 검토한 대안을 한 페이지 안에 적어요. 저장소에 마크다운으로 두고 PR로 리뷰하며, 결정이 바뀌면 기존 문서를 고치지 않고 새 ADR로 대체해 역사를 남겨요. 마이클 나이가드의 템플릿이 널리 쓰여요.', 'A short document recording one significant technical decision as context, decision and consequences, so future teams know the “why”.', 'Titled like “ADR-007: use Kafka for event delivery”, it lists the status (accepted), the context (several services must replay events), the decision, the consequences (benefits and operational cost) and the alternatives considered, all within a page. ADRs live as markdown in the repository and are reviewed via PRs; when a decision changes, a new ADR supersedes the old one instead of editing it. Michael Nygard’s template is widely used.', sAdr())
  ],
  'se-team': [
    item('se-dora', 'DORA 지표', 'DORA metrics', '소프트웨어 전달 성과를 재는 네 가지 지표예요: 배포 빈도, 변경 리드 타임, 변경 실패율, 서비스 복구 시간.', '앞의 둘은 속도(얼마나 자주, 빨리 내보내나), 뒤의 둘은 안정성(얼마나 자주 깨지고, 빨리 고치나)을 재요. 『Accelerate』와 State of DevOps 보고서는 상위 팀이 하루 여러 번 배포하고 한 시간 안에 복구하는 등 하위 팀과 수백 배 차이가 나며, 속도와 안정성이 함께 좋아진다는 걸 보여 줬어요. 개인 평가가 아니라 팀 개선용이고, 목표로 삼으면 왜곡돼요(굿하트의 법칙).', 'Four measures of software delivery performance: deployment frequency, lead time for changes, change failure rate and time to restore service.', 'The first two measure speed (how often and how fast you ship); the last two measure stability (how often things break and how fast you recover). “Accelerate” and the State of DevOps reports showed top teams deploying many times a day and restoring within an hour, orders of magnitude ahead of low performers, with speed and stability improving together. They are for improving teams, not rating individuals, and get gamed once turned into targets (Goodhart’s law).', sDora())
  ]
} };
})();

window.UX = page([
  sec('se-proc', '프로세스', 'Process', '개발 프로세스와 애자일', 'Development process and agile',
    '팀이 일을 나누고 계획하고 피드백을 받는 방식이에요.', 'How teams split, plan and get feedback on work.', [
    item('se-waterfall', '폭포수 vs 반복형', 'Waterfall vs iterative', '폭포수는 요구사항→설계→구현→테스트→배포를 한 번씩 차례로 끝내고, 반복형은 작은 단위로 이 과정을 여러 번 돌며 자주 내보내요.', '요구가 바뀌기 쉬운 서비스는 반복형이 유리해요. 규제가 강하거나 하드웨어처럼 되돌리기 비싼 분야는 지금도 단계별 관리를 많이 써요.', 'Waterfall runs requirements, design, build, test and release once, in order; iterative development loops through them in small slices and ships often.', 'Products whose requirements shift favour iterative work; regulated or hardware projects, where changes are costly, still lean on phase gates.', sWaterfall()),
    item('se-agile', '애자일 선언', 'The Agile Manifesto', '2001년 개발자들이 정리한 4가지 가치예요. 프로세스·문서·계약·계획보다 사람, 동작하는 소프트웨어, 고객 협력, 변화 대응을 더 중시해요.', '애자일은 특정 도구나 회의가 아니라 짧게 만들고 피드백 받아 고치는 태도예요. 스크럼·칸반·XP는 이를 실천하는 방법들이에요.', 'Four values written by developers in 2001: people, working software, customer collaboration and responding to change, valued over process, documents, contracts and plans.', 'Agile is not a tool or a meeting but a habit of building in short loops and adjusting from feedback; Scrum, Kanban and XP are ways to practise it.', sAgile()),
    item('se-scrum', '스크럼', 'Scrum', '1–4주 스프린트 단위로 백로그에서 일을 가져와 만들고, 매일 짧게 공유하고, 끝에 리뷰와 회고를 해요. PO·스크럼 마스터·개발자 세 역할이 있어요.', '스프린트 중엔 목표를 바꾸지 않는 게 원칙이에요. 회고에서 나온 개선점을 다음 스프린트에 실제로 반영해야 의미가 있어요.', 'Work is pulled from the backlog into 1–4 week sprints, synced in a short daily scrum, and closed with a review and a retrospective. Three roles: product owner, scrum master, developers.', 'Don’t change the sprint goal mid-sprint, and make sure retro actions actually land in the next sprint.', sScrum()),
    item('se-kanban', '칸반', 'Kanban', '일을 카드로 보드에 올리고 "진행 중" 칸의 개수(WIP)를 제한해서, 새로 시작하기보다 끝내는 데 집중하게 해요.', '스프린트 없이 계속 흐르는 일(운영, 고객 지원, 유지보수)에 잘 맞아요. 리드 타임과 막힌 칸을 보면 병목이 보여요.', 'Work items sit on a board as cards and the number in progress (WIP) is capped, so the team finishes before starting more.', 'Fits continuous work without sprints, like ops, support and maintenance; lead time and stuck columns reveal bottlenecks.', sKanban()),
    item('se-story', '사용자 스토리와 인수 조건', 'User stories and acceptance criteria', '"누가, 무엇을, 왜"를 한 문장으로 쓰고, 완료를 판단할 구체적인 조건을 붙여요.', '인수 조건이 모호하면 "다 됐다"의 기준이 사람마다 달라져요. 잘 쓴 조건은 그대로 테스트 케이스가 돼요.', 'State who wants what and why in one sentence, then attach concrete conditions that decide when it’s done.', 'Vague criteria mean everyone has a different idea of done; good criteria become test cases directly.', sStory()),
    item('se-burndown', '번다운 차트와 속도', 'Burndown and velocity', '스프린트 동안 남은 작업량이 줄어드는 모습을 그리고, 스프린트마다 끝낸 양(속도)으로 다음 계획을 세워요.', '속도는 팀 내부의 계획 도구예요. 팀끼리 비교하거나 성과 지표로 쓰면 포인트만 부풀려져요.', 'Plot remaining work shrinking through the sprint, and use how much each sprint finished (velocity) to plan the next.', 'Velocity is a team-internal planning tool; comparing teams or using it as a KPI just inflates the points.', sBurn())
  ].concat(XT.add['se-proc'] || [])),
  sec('se-test', '테스트', 'Testing', '소프트웨어 테스트', 'Software testing',
    '버그를 일찍, 싸게 찾는 방법이에요.', 'Ways to find bugs early and cheaply.', [
    item('se-pyramid', '테스트 피라미드', 'Test pyramid', '빠르고 싼 단위 테스트를 가장 많이, 통합 테스트는 적당히, 느린 E2E 테스트는 핵심 흐름만 두는 구조예요.', 'E2E가 대부분이면 CI가 느리고 자주 깨져요. 실패 원인을 좁히기 쉬운 아래층을 두텁게 하세요.', 'Lots of fast, cheap unit tests, a moderate layer of integration tests, and slow end-to-end tests only for key flows.', 'A suite made mostly of E2E tests makes CI slow and flaky; thicken the lower layers, where failures are easy to pinpoint.', sPyramid()),
    item('se-tdd', 'TDD (테스트 주도 개발)', 'TDD (test-driven development)', '실패하는 테스트를 먼저 쓰고(Red), 통과할 최소 코드를 쓰고(Green), 정리(Refactor)하는 짧은 사이클을 반복해요.', '테스트하기 쉬운 구조가 자연스럽게 나와요. 요구가 분명한 로직(계산, 파서, 규칙)에서 특히 효과가 커요.', 'Write a failing test (red), write the least code that passes (green), then clean up (refactor), in short repeated cycles.', 'It naturally yields testable designs and pays off most on well-defined logic like calculations, parsers and business rules.', sTDD()),
    item('se-bdd', 'BDD (행동 주도 개발)', 'BDD (behaviour-driven development)', 'Given-When-Then 형식의 문장으로 기대하는 행동을 적고, 그 문장을 그대로 자동화 테스트로 실행해요.', '기획·QA·개발이 같은 문장을 보며 합의할 수 있어요. Cucumber, SpecFlow 같은 도구가 문장을 코드와 연결해요.', 'Describe expected behaviour as Given–When–Then sentences and run those sentences as automated tests.', 'Product, QA and developers agree on the same text; tools like Cucumber and SpecFlow bind the sentences to code.', sBDD()),
    item('se-double', '테스트 더블', 'Test doubles', '테스트할 때 실제 의존성(결제, 메일, DB) 대신 끼워 넣는 대역이에요. Stub·Mock·Fake·Spy로 나뉘어요.', 'Mock을 과하게 쓰면 구현 세부에 묶인 깨지기 쉬운 테스트가 돼요. 가능하면 결과(상태)를 검증하세요.', 'Stand-ins for real dependencies such as payments, email and databases during tests: stubs, mocks, fakes and spies.', 'Over-mocking ties tests to implementation details; verify outcomes and state where you can.', sDouble()),
    item('se-coverage', '코드 커버리지', 'Code coverage', '테스트가 코드의 몇 %를 실행했는지예요. 줄(라인) 기준과 분기(브랜치) 기준이 있어요.', '커버리지가 낮은 곳은 확실히 위험하지만, 높다고 안전한 건 아니에요. 숫자 목표보다 핵심 로직의 분기를 챙기세요.', 'The share of code your tests execute, measured by lines or by branches.', 'Low coverage flags real risk, but high coverage proves little; care about the branches in core logic, not the number.', sCov()),
    item('se-boundary', '경계값 분석 · 동등 분할', 'Boundary values · equivalence partitions', '입력을 같은 결과를 내는 구간으로 나누고(동등 분할), 구간 경계의 바로 양쪽 값을 집중적으로 테스트해요.', '> 와 >=, 0과 1, 빈 목록과 하나짜리 목록처럼 버그는 경계에 몰려요. 테스트 케이스 수는 줄이고 효과는 높여요.', 'Group inputs into ranges that behave the same, then test values on both sides of each boundary.', 'Bugs cluster at edges: > vs >=, zero vs one, empty vs single-item lists. Fewer test cases, more bugs caught.', sBoundary())
  ].concat(XT.add['se-test'] || [])),
  sec('se-model', '모델링', 'Modeling', '설계와 모델링', 'Design and modeling',
    '코드를 쓰기 전에 구조와 흐름, 도메인을 정리하는 도구예요.', 'Tools for shaping structure, flow and domain before code.', [
    item('se-uml-class', 'UML 클래스 다이어그램', 'UML class diagrams', '클래스의 이름·속성·메서드와 클래스 사이의 관계(연관, 합성, 상속)를 그림으로 나타내요.', '설계 토론이나 문서화할 때 핵심 관계만 스케치하세요. 코드와 1:1로 모든 걸 그리면 금방 낡아요.', 'Shows each class’s name, attributes and methods, plus how classes relate: association, composition and inheritance.', 'Sketch only the key relationships for design talks and docs; diagrams that mirror every line of code go stale fast.', sUMLClass()),
    item('se-uml-seq', 'UML 시퀀스 다이어그램', 'UML sequence diagrams', '참여자들이 시간 순서대로 주고받는 메시지를 위에서 아래로 그려요.', 'API 연동 설계, 인증 흐름 설명, 장애 원인 분석에 많이 써요. Mermaid 같은 텍스트 도구로 코드처럼 관리할 수 있어요.', 'Draws the messages participants exchange, in time order from top to bottom.', 'Handy for API integration design, auth flows and incident analysis; tools like Mermaid keep them in text alongside code.', sUMLSeq()),
    item('se-ddd', 'DDD · 바운디드 컨텍스트', 'DDD · bounded contexts', '같은 단어도 맥락마다 의미가 달라요. 도메인을 경계(컨텍스트)로 나누고 각자 자기 모델과 용어를 가져요.', '거대한 공용 모델 하나가 모든 팀을 묶는 걸 막아줘요. 마이크로서비스 경계를 정할 때 출발점으로 많이 써요.', 'The same word means different things in different parts of a business. Split the domain into bounded contexts, each with its own model and vocabulary.', 'Stops one giant shared model from coupling every team, and is a common starting point for drawing microservice boundaries.', sDDD())
  ].concat(XT.add['se-model'] || [])),
  sec('se-team', '협업', 'Teamwork', '협업과 품질', 'Collaboration and quality',
    '여럿이 함께 오래 유지할 수 있는 소프트웨어를 만드는 원칙이에요.', 'Principles for software many people can maintain for years.', [
    item('se-review', '코드 리뷰와 PR', 'Code review and pull requests', '변경을 병합하기 전에 동료가 읽고 질문·제안하는 과정이에요. CI 검사와 승인을 거쳐 main에 들어가요.', 'PR은 작게 나누고 "왜"를 설명하세요. 스타일은 린터에 맡기고 리뷰는 설계·버그·가독성에 집중해요.', 'Before a change merges, teammates read it, ask questions and suggest fixes; it lands on main after CI checks and approval.', 'Keep PRs small and explain why; leave style to linters and spend review time on design, bugs and readability.', sReview()),
    item('se-semver', '시맨틱 버저닝', 'Semantic versioning', 'MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요. 호환이 깨지면 MAJOR, 기능 추가는 MINOR, 버그 수정은 PATCH를 올려요.', 'npm의 ^·~ 범위가 이 약속을 믿고 자동 업데이트해요. 라이브러리를 공개한다면 꼭 지켜야 해요. 0.x는 언제든 깨질 수 있다는 뜻이에요.', 'MAJOR.MINOR.PATCH tells users what changed: bump MAJOR for breaking changes, MINOR for features, PATCH for fixes.', 'npm’s ^ and ~ ranges trust this promise when auto-updating, so libraries must keep it; 0.x versions may break at any time.', sSemver()),
    item('se-debt', '기술 부채', 'Technical debt', '지금 빨리 가려고 택한 임시방편이 나중에 이자처럼 개발 속도를 갉아먹는 현상이에요.', '빚 자체는 전략이 될 수 있지만 기록하고 갚아야 해요. 스프린트의 일정 비율을 정리 작업에 꾸준히 쓰는 팀이 많아요.', 'Shortcuts taken to go fast now that later charge interest by slowing every change.', 'Debt can be a valid strategy if it’s recorded and repaid; many teams reserve a fixed share of each sprint for cleanup.', sDebt()),
    item('se-conway', '콘웨이의 법칙', 'Conway’s law', '시스템의 구조는 그것을 만드는 조직의 소통 구조를 닮아요.', '원하는 아키텍처가 있다면 팀 구성부터 맞추세요(역 콘웨이 전략). 마이크로서비스는 팀 자율성과 함께 갈 때 효과가 있어요.', 'A system’s structure mirrors the communication structure of the organization that builds it.', 'If you want a certain architecture, organize teams to match it first (inverse Conway); microservices pay off only with autonomous teams.', sConway()),
    item('se-brooks', '브룩스의 법칙', 'Brooks’s law', '늦어진 프로젝트에 인력을 추가하면 더 늦어져요. 사람이 n명이면 소통 경로는 n(n−1)/2개로 늘어나요.', '일정이 밀리면 사람을 더하기보다 범위를 줄이세요. 팀을 작게 유지하고 경계를 분명히 하면 소통 비용이 줄어요.', 'Adding people to a late project makes it later; n people have n(n−1)/2 communication paths.', 'When you slip, cut scope rather than add people; small teams with clear boundaries keep communication cheap.', sBrooks())
  ].concat(XT.add['se-team'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
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
