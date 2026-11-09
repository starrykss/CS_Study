(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const off = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c op-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const code = (S, k, x, y, w, t, st, h) => cell(S, k, x, y, t, { w, h: h || 2, cls: 'cz-c op-code', s: st });
function fly(S, k, a, b, st, lab, sty, o = {}) { const r = o.r || .7; dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) }); S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r); if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' }); return S; }
const dash = c => `repeating-linear-gradient(90deg,var(--${c}) 0 .5em,transparent .5em .9em)`;
const ink = { background: 'var(--ink-3)' };
const col = (S, k, x, y, w, h) => S.el(k, { x, y, w, h, css: 'border-radius:.8em;background:color-mix(in srgb,var(--line) 40%,transparent)' });
const fill = (S, k, x, y, w, h, color, w0) => { S.el(k + 't', { x, y, w, h, css: `border-radius:${h / 2}em;background:var(--line)` }); S.el(k + 'f', { x, y, w, h, css: `border-radius:${h / 2}em`, s: { width: (w0 || 0) + 'em', background: `var(--${color})` } }); };
const vbar = (S, k, x, base, w, h, st, step) => { S.el(k, { cls: 'cz-c', x, y: base - h, w, h, css: 'transform-origin:50% 100%;border-radius:.3em .3em 0 0', s: Object.assign({ transform: 'scaleY(0)' }, st) }); S.set(k, step, { transform: 'none' }); };
const hbar = (S, k, x, y, w, h, st, step, lab) => { S.el(k, { cls: 'cz-c op-xs', x, y, w, h, html: lab || '', css: 'transform-origin:0 50%;border-radius:.3em', s: Object.assign({ transform: 'scaleX(0)' }, st) }); S.set(k, step, { transform: 'none' }); };

/* ---------- git ---------- */
function sCommit() {
  const S = scene({ id: 'op-commit', steps: 6, per: 1.2 });
  const Z = [[1, ['작업 디렉터리', 'Working directory']], [11.4, ['스테이징 영역', 'Staging area']], [21.8, ['저장소 (커밋)', 'Repository']]];
  Z.forEach(([x, l], i) => { col(S, 'z' + i, x, 4.6, 9.4, 13); text(S, 'zh' + i, x + .2, 3, l, { cls: 'cz-t op-b' }); });
  S.label('cmd', { cls: 'cz-c op-code', x: 1, y: .4, w: 30, h: 2, s: { background: 'var(--ui)' } }, [[0, ['$ git status', '$ git status']], [1, ['# a.js, b.js 수정', '# edit a.js and b.js']], [2, '$ git add a.js'], [3, ['$ git commit -m "로그인 버그 수정"', '$ git commit -m "Fix login bug"']], [4, '$ git add b.js'], [5, ['$ git commit -m "버튼 스타일"', '$ git commit -m "Button styles"']]]);
  chip(S, 'c0', 22.4, 5.4, 8.2, 'a1f3 · init', C.ok, { h: 2.2 });
  [['a.js', 2, 3], ['b.js', 4, 5]].forEach(([f, sa, sc], j) => {
    chip(S, 'f' + j, 1.6, 5.4 + j * 2.8, 8.2, f + ' (M)', hid(C.cmp), { h: 2.2 }); S.set('f' + j, 1, { opacity: '1' });
    S.move('f' + j, sa, 12, 5.4 + j * 2.8, C.soft); S.move('f' + j, sc, 22.4, 8.2 + j * 2.8, { opacity: '0' });
    chip(S, 'c' + (j + 1), 22.4, 8.2 + j * 2.8, 8.2, [j ? '7d2e · 버튼 스타일' : 'c9b0 · 로그인 버그', j ? '7d2e · styles' : 'c9b0 · login fix'], hid(C.ok), { h: 2.2 }); S.set('c' + (j + 1), sc, { opacity: '1' });
  });
  chip(S, 'f2', 1.6, 11, 8.2, 'c.css', {}, { h: 2.2 });
  S.cap(1, '파일을 고치면 작업 디렉터리에서 "수정됨"', 'Edited files show as modified in the working directory')
    .cap(2, 'git add: 이번 커밋에 넣을 것만 골라 스테이징', 'git add picks what goes into the next commit')
    .cap(3, 'git commit: 스테이징된 내용을 하나의 스냅샷으로 저장', 'git commit stores the staged changes as one snapshot')
    .cap(4, '나머지 변경은 따로', 'The other change goes separately')
    .cap(6, '의미 단위로 작게 커밋 · 메시지는 "무엇을, 왜"', 'Small, meaningful commits · messages say what and why');
  return S;
}
function sBranch() {
  const S = scene({ id: 'op-branch', steps: 6, per: 1.2 });
  const P = { A: [3, 6], B: [7.5, 6], C: [11.5, 12], D: [16, 12], E: [15, 6], M: [21, 6] };
  const E = [['AB', 'A', 'B', 1], ['BC', 'B', 'C', 3], ['CD', 'C', 'D', 3], ['BE', 'B', 'E', 4], ['EM', 'E', 'M', 5], ['DM', 'D', 'M', 5]];
  E.forEach(([k, a, b, st]) => { edge(S, 'e' + k, ...P[a], ...P[b], { h: .2, s: hid(ink) }); S.set('e' + k, st, { opacity: '1' }); });
  const ST = { A: 1, B: 1, C: 3, D: 3, E: 4, M: 5 };
  Object.entries(P).forEach(([n, [x, y]]) => { node(S, 'n' + n, x, y, n, { r: .95, s: hid(n === 'M' ? C.ok : y > 7 ? C.cmp : C.soft) }); S.set('n' + n, ST[n], { opacity: '1' }); });
  pill(S, 'pm', P.B[0] - 2, 3.4, 'main', { w: 4, h: 1.6, s: hid(C.soft) }); S.set('pm', 1, { opacity: '1' }); S.move('pm', 4, P.E[0] - 2, 3.4); S.move('pm', 5, P.M[0] - 2, 3.4);
  pill(S, 'pf', P.B[0] - 2.4, 7.8, 'feature', { w: 4.8, h: 1.6, s: hid(C.cmp) }); S.set('pf', 2, { opacity: '1' }); S.move('pf', 3, P.D[0] - 2.4, 13.9);
  S.label('cl', { cls: 'cz-c op-code', x: 1, y: 16.6, w: 30, h: 2.2 }, [[0, ''], [2, '$ git switch -c feature'], [3, ['$ git commit … (C, D)', '$ git commit … (C, D)']], [4, ['# 그사이 main에 E가 들어옴', '# meanwhile E lands on main']], [5, '$ git switch main && git merge feature']]);
  text(S, 'mt', 21.6, 7.6, ['머지 커밋 (부모 2개)', 'merge commit (2 parents)'], { cls: 'cz-t op-g', s: hid() }); S.set('mt', 5, { opacity: '1' });
  S.cap(1, '커밋은 부모를 가리키는 스냅샷 · 브랜치는 커밋을 가리키는 이름표', 'Commits point to parents; a branch is a label pointing at a commit')
    .cap(2, '새 브랜치를 만들어', 'Create a new branch')
    .cap(3, '따로 작업해도 main은 그대로', 'and work there while main stays put')
    .cap(4, 'main도 앞으로 나아가면', 'When main moves on too')
    .cap(5, '머지 커밋으로 두 갈래를 합쳐요', 'a merge commit joins the two lines')
    .cap(6, 'main이 그대로였다면 이름표만 옮기는 fast-forward', 'If main hadn’t moved, git just fast-forwards the label');
  return S;
}
function sRebase() {
  const S = scene({ id: 'op-rebase', steps: 5, per: 1.35 });
  const P = { A: [3, 6], B: [7.5, 6], E: [12, 6], C: [11.5, 12.4], D: [16, 12.4] };
  [['AB', 'A', 'B'], ['BE', 'B', 'E'], ['BC', 'B', 'C'], ['CD', 'C', 'D']].forEach(([k, a, b]) => edge(S, 'e' + k, ...P[a], ...P[b], { h: .2, s: ink }));
  Object.entries(P).forEach(([n, [x, y]]) => node(S, 'n' + n, x, y, n, { r: .95, s: y > 7 ? C.cmp : C.soft }));
  edge(S, 'eEC', 12, 6, 17, 6, { h: .2, s: hid(ink) }); edge(S, 'eCD2', 17, 6, 22, 6, { h: .2, s: hid(ink) });
  node(S, 'c2', ...P.C, "C'", { r: .95, s: hid(C.ok) }); S.set('c2', 2, { opacity: '1' }).move('c2', 2, 17 - .95, 6 - .95); S.set('eEC', 2, { opacity: '1' });
  node(S, 'd2', ...P.D, "D'", { r: .95, s: hid(C.ok) }); S.set('d2', 3, { opacity: '1' }).move('d2', 3, 22 - .95, 6 - .95); S.set('eCD2', 3, { opacity: '1' });
  ['nC', 'nD', 'eBC', 'eCD'].forEach(k => S.set(k, 3, { opacity: '.22' }));
  pill(S, 'pm', 10, 3.4, 'main', { w: 4, h: 1.6, s: C.soft }); S.move('pm', 4, 20, 3.4);
  pill(S, 'pf', 14, 14.3, 'feature', { w: 4.8, h: 1.6, s: C.cmp }); S.move('pf', 3, 19.6, 7.6);
  text(S, 'hs', 1, 14.6, ['C, D는 새 커밋(C′, D′)으로 다시 써져요 · 해시가 바뀜', 'C and D are rewritten as new commits C′, D′ · new hashes'], { cls: 'cz-t op-w', s: hid() }); S.set('hs', 3, { opacity: '1' });
  S.label('cl', { cls: 'cz-c op-code', x: 1, y: 16.8, w: 30, h: 2.2 }, [[0, ''], [2, '$ git rebase main'], [4, '$ git switch main && git merge feature   # fast-forward']]);
  S.cap(1, 'feature가 갈라진 뒤 main에 E가 생겼어요', 'main gained E after feature branched off')
    .cap(2, '리베이스: feature의 커밋을 E 뒤에 하나씩 다시 적용', 'Rebase replays feature’s commits on top of E')
    .cap(4, '히스토리가 한 줄로 · 머지 커밋 없이 합쳐져요', 'History becomes a straight line, no merge commit')
    .cap(5, '이미 공유(push)한 브랜치는 리베이스하지 마세요', 'Never rebase a branch others already pulled');
  return S;
}
function sConflict() {
  const S = scene({ id: 'op-conflict', steps: 5, per: 1.4 });
  text(S, 'h1', 1, .9, 'main', { cls: 'cz-t cz-mono op-b' }); text(S, 'h2', 17, .9, 'feature', { cls: 'cz-t cz-mono op-b' });
  code(S, 'a0', 1, 2.4, 14.4, 'price = 100', {}); code(S, 'a1', 1, 4.8, 14.4, 'price = 120', hid(C.soft)); S.set('a1', 1, { opacity: '1' });
  code(S, 'b0', 17, 2.4, 14, 'price = 100', {}); code(S, 'b1', 17, 4.8, 14, 'price = 90', hid(C.cmp)); S.set('b1', 1, { opacity: '1' });
  text(S, 'fh', 1, 8, 'cart.js', { cls: 'cz-t cz-mono op-b', s: hid() }); S.set('fh', 2, { opacity: '1' });
  const L = [['&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD', C.bad], ['price = 120', C.soft], ['=======', C.bad], ['price = 90', C.cmp], ['&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature', C.bad]];
  L.forEach(([t, st], i) => { code(S, 'm' + i, 1, 9.4 + i * 2.2, 18, t, hid(st), 2); S.set('m' + i, 2, { opacity: '1' }).set('m' + i, 4, { opacity: '0' }); });
  text(S, 'n1', 20, 11.8, ['↑ 내 쪽 (main)', '↑ ours (main)'], { cls: 'cz-t op-l', s: hid() }); text(S, 'n2', 20, 16.2, ['↑ 들어오는 쪽', '↑ theirs (feature)'], { cls: 'cz-t op-l', s: hid() }); show(S, ['n1', 'n2'], 3); off(S, ['n1', 'n2'], 4);
  code(S, 'r', 1, 9.4, 18, ['price = 108   // 할인 반영, 팀과 합의', 'price = 108   // agreed with the team'], hid(C.ok), 2.2); S.set('r', 4, { opacity: '1' });
  code(S, 'rc', 1, 12, 18, '$ git add cart.js && git commit', hid(), 2.2); S.set('rc', 4, { opacity: '1' });
  S.cap(1, '두 브랜치가 같은 줄을 다르게 고치면', 'Two branches change the same line differently')
    .cap(2, 'git은 자동으로 못 합치고 충돌 표시를 넣어요', 'git can’t merge it and inserts conflict markers')
    .cap(3, 'HEAD 쪽이 내 브랜치, 아래가 들어오는 브랜치', 'Above is your side, below is the incoming side')
    .cap(4, '사람이 올바른 결과를 정하고 표시를 지운 뒤 커밋', 'A person picks the right result, removes markers, commits')
    .cap(5, '자주 합치고 PR을 작게 하면 충돌도 작아요', 'Merge often and keep PRs small for smaller conflicts');
  return S;
}
function sFlow() {
  const S = scene({ id: 'op-flow', steps: 5, per: 1.35 });
  text(S, 'h1', 1, .8, 'Git Flow', { cls: 'cz-t op-b' }); text(S, 'h2', 17.6, .8, ['트렁크 기반 개발', 'Trunk-based development'], { cls: 'cz-t op-b' });
  const LN = [['main', 3.4], ['hotfix', 6.2], ['release', 9], ['develop', 11.8], ['feature', 14.6]];
  LN.forEach(([l, y], i) => { text(S, 'll' + i, 1, y - .55, l, { cls: 'cz-t cz-mono op-xs2' }); edge(S, 'ln' + i, 5.4, y, 15, y, { s: hid(ink) }); S.set('ln' + i, 1, { opacity: '.6' }); });
  const D = [['d0', 6.4, 11.8, 1], ['f1', 7.6, 14.6, 2], ['f2', 9.2, 14.6, 2], ['d1', 10.6, 11.8, 2], ['r1', 12, 9, 2], ['m1', 13.6, 3.4, 2], ['h1', 8.6, 6.2, 2], ['m0', 6.4, 3.4, 1]];
  D.forEach(([k, x, y, st]) => { dot(S, k, x, y, '', { r: .5, s: hid(C.cur) }); S.set(k, st, { opacity: '1' }); });
  [['x1', 6.4, 11.8, 7.6, 14.6], ['x2', 9.2, 14.6, 10.6, 11.8], ['x3', 10.6, 11.8, 12, 9], ['x4', 12, 9, 13.6, 3.4], ['x5', 6.4, 3.4, 8.6, 6.2]].forEach(([k, a, b, c, d]) => { edge(S, k, a, b, c, d, { s: hid({ background: 'var(--accent)' }) }); S.set(k, 2, { opacity: '1' }); });
  text(S, 't1', 1, 17, ['오래 사는 브랜치 여러 개 · 릴리스 주기가 긴 제품', 'many long-lived branches · long release cycles'], { cls: 'cz-t', s: hid() }); S.set('t1', 2, { opacity: '1' });
  edge(S, 'tr', 17.6, 10, 31, 10, { h: .22, s: hid(ink) }); S.set('tr', 3, { opacity: '1' });
  text(S, 'trl', 17.6, 10.7, 'main', { cls: 'cz-t cz-mono op-xs2', s: hid() }); S.set('trl', 3, { opacity: '1' });
  [[19.4, 3], [23.4, 4], [27.4, 4]].forEach(([x, st], i) => {
    edge(S, 'u' + i, x, 10, x + 1.2, 7.4, { s: hid({ background: 'var(--ok)' }) }); edge(S, 'v' + i, x + 1.2, 7.4, x + 2.4, 10, { s: hid({ background: 'var(--ok)' }) });
    dot(S, 'w' + i, x + 1.2, 7.4, '', { r: .5, s: hid(C.okf) }); show(S, ['u' + i, 'v' + i, 'w' + i], st);
  });
  text(S, 't2', 17.6, 13, ['하루에도 여러 번 main에 합쳐요', 'merge to main many times a day'], { cls: 'cz-t', s: hid() }); S.set('t2', 4, { opacity: '1' });
  pill(S, 'fl', 17.6, 14.8, ['미완성 기능은 기능 플래그로 숨김', 'unfinished work hides behind flags'], { w: 13.4, h: 2, s: hid(C.cmp) }); S.set('fl', 4, { opacity: '1' });
  S.cap(1, 'Git Flow: 역할별로 브랜치를 오래 유지해요', 'Git Flow keeps long-lived branches per role')
    .cap(2, 'feature → develop → release → main으로 흘러가요', 'Work flows feature → develop → release → main')
    .cap(3, '트렁크 기반: main 하나에', 'Trunk-based: one main')
    .cap(4, '수명이 짧은 브랜치를 자주 합쳐요', 'with short-lived branches merged often')
    .cap(5, '요즘 웹 서비스는 트렁크 기반 + CI/CD가 흔해요', 'Most web teams now use trunk-based + CI/CD');
  return S;
}

/* ---------- ci/cd ---------- */
function sCI() {
  const S = scene({ id: 'op-ci', steps: 7, per: 1.1 });
  code(S, 'push', 1, 1.2, 12, '$ git push', {}, 2.2);
  S.label('run', { cls: 'cz-t cz-mono op-b', x: 14, y: 1.7, w: 10 }, [[0, 'run #41'], [4, 'run #42']]);
  const ST = [['빌드', 'Build'], ['단위 테스트', 'Unit tests'], ['린트', 'Lint'], ['보안 검사', 'Security scan'], ['이미지', 'Image']];
  ST.forEach((l, i) => { chip(S, 's' + i, 1 + i * 6.1, 6, 5.2, l, {}, { h: 3, cls: 'op-p' }); if (i < 4) arrow(S, 'a' + i, 6.3 + i * 6.1, 7.5, 7 + i * 6.1, 7.5, {}); });
  S.set('s0', 1, C.cur).set('s0', 2, C.ok).set('s1', 2, C.cur).set('s1', 3, C.badf).set('s0', 4, C.ok).set('s1', 4, C.cur).set('s1', 5, C.ok).set('s2', 5, C.ok).set('s3', 5, C.cur).set('s3', 6, C.ok).set('s4', 6, C.ok);
  fly(S, 'cm', [6.5, 2.3], [3.8, 6.4], 1, '', C.cur); fly(S, 'cm2', [6.5, 2.3], [3.8, 6.4], 4, '', C.cur);
  S.label('res', { cls: 'cz-t op-l', x: 1, y: 11.4, w: 30 }, [[0, ''], [3, ['✗ 테스트 실패 → PR 머지 차단', '✗ tests failed → PR merge blocked']], [4, ['수정 커밋 → 파이프라인 다시 실행', 'fix commit → pipeline runs again']], [6, ['✓ 모두 통과 → 이미지 app:1.4.2 저장', '✓ all green → image app:1.4.2 stored']]]);
  Object.assign(S.get('res~1').s, { color: 'var(--danger)' });
  chip(S, 'art', 1, 14, 12, 'app:1.4.2', hid(C.ok), { h: 2.4 }); S.set('art', 6, { opacity: '1' });
  text(S, 'cache', 1, 17.4, ['의존성 캐시 · 병렬 실행으로 10분 안쪽 유지', 'cache deps and run in parallel to stay under 10 min'], { cls: 'cz-t', s: hid() }); S.set('cache', 7, { opacity: '1' });
  S.cap(1, '푸시하면 파이프라인이 자동으로 돌아요', 'Every push triggers the pipeline')
    .cap(3, '하나라도 실패하면 머지를 막아요', 'Any failure blocks the merge')
    .cap(4, '고쳐서 다시 푸시하면', 'Push a fix')
    .cap(6, '모든 검사를 통과한 결과물만 저장', 'Only artifacts that pass every check are kept')
    .cap(7, 'CI: 자주 합치고 매번 자동으로 검증해요', 'CI: integrate often and verify every change automatically');
  return S;
}
function sCD() {
  const S = scene({ id: 'op-cd', steps: 6, per: 1.3 });
  const EV = [[1, ['개발', 'Dev']], [11.4, ['스테이징', 'Staging']], [21.8, ['프로덕션', 'Production']]];
  EV.forEach(([x, l], i) => { box(S, 'e' + i, x, 6, 9.2, 8, '', {}); text(S, 'et' + i, x + .6, 6.4, l, { cls: 'cz-t op-b' }); if (i < 2) arrow(S, 'ea' + i, x + 9.4, 10, x + 10.2, 10, {}); });
  chip(S, 'art', 1.8, 9, 7.6, 'app:1.4.2', hid(C.soft), { h: 2.4 }); S.set('art', 1, { opacity: '1' }); S.move('art', 2, 12.2, 9); S.move('art', 4, 22.6, 9, C.ok);
  S.set('e0', 1, C.soft).set('e0', 2, C.idle).set('e1', 2, C.soft).set('e1', 4, C.idle).set('e2', 4, C.ok);
  text(S, 'tst', 11.4, 14.6, ['E2E 테스트 ✓', 'E2E tests ✓'], { cls: 'cz-t op-g', s: hid() }); S.set('tst', 2, { opacity: '1' });
  S.label('gate', { cls: 'cz-pill', x: 21.8, y: 2.6, w: 9.2, h: 2.2 }, [[0, ''], [3, ['승인 대기 (사람)', 'awaiting approval']], [4, ['승인 ✓', 'approved ✓']], [5, ['자동 배포 (게이트 없음)', 'automatic (no gate)']]]);
  Object.assign(S.get('gate~0').s, { background: 'transparent' }); Object.assign(S.get('gate~1').s, C.cmp); Object.assign(S.get('gate~2').s, C.ok); Object.assign(S.get('gate~3').s, C.soft);
  S.label('kind', { cls: 'cz-t op-l', x: 1, y: 17, w: 30 }, [[0, ''], [3, ['지속적 전달: 언제든 배포 가능, 마지막은 사람이 결정', 'Continuous delivery: always deployable, a human pushes the button']], [5, ['지속적 배포: 테스트를 통과하면 자동으로 프로덕션까지', 'Continuous deployment: passing changes go straight to production']]]);
  S.cap(1, '같은 결과물(이미지)을 환경마다 그대로 옮겨요', 'The same artifact moves through each environment')
    .cap(2, '스테이징에서 실제와 비슷하게 검증하고', 'Staging validates it in a production-like setup')
    .cap(4, '프로덕션으로', 'then on to production')
    .cap(6, '환경마다 다시 빌드하지 말고, 설정만 바꿔요', 'Build once; only configuration differs per environment');
  return S;
}
function sIaC() {
  const S = scene({ id: 'op-iac', steps: 5, per: 1.4 });
  text(S, 'fh', 1, .9, 'main.tf', { cls: 'cz-t cz-mono op-b' });
  ['resource "aws_instance" "web" {', '  count         = 3', '  instance_type = "t3.small"', '}'].forEach((t, i) => code(S, 'l' + i, 1, 2.4 + i * 2.2, 15, t.replace(/^ +/, m => '&nbsp;'.repeat(m.length)), i === 1 ? C.soft : {}, 2));
  text(S, 'ch', 18, .9, ['실제 클라우드', 'Actual cloud'], { cls: 'cz-t op-b' }); col(S, 'cloud', 18, 2.4, 13, 9);
  [0, 1, 2].forEach(i => { box(S, 's' + i, 18.6 + i * 4.2, 4, 3.8, 5.6, '', { s: i < 2 ? {} : hid() }); S.label('sl' + i, { cls: 'cz-bx op-xs', x: 18.6 + i * 4.2, y: 4, w: 3.8, h: 5.6, s: i < 2 ? {} : hid() }, i === 1 ? [[0, 'web-1<br>t3.small'], [4, 'web-1<br>t3.large']] : [[0, `web-${i}<br>t3.small`]]); });
  show(S, ['s2', 'sl2~0'], 3); S.set('s2', 3, C.ok).set('s2', 4, C.idle).set('s1', 4, C.bad);
  S.label('cmd', { cls: 'cz-c op-code', x: 1, y: 12.6, w: 30, h: 2.2 }, [[0, ''], [2, '$ terraform plan'], [3, '$ terraform apply'], [4, ['$ terraform plan   # 드리프트 확인', '$ terraform plan   # check for drift']]]);
  S.label('out', { cls: 'cz-c op-code', x: 1, y: 15.2, w: 30, h: 2.4 }, [[0, ''], [2, '+ aws_instance.web[2] will be created  (Plan: 1 to add)'], [3, 'Apply complete! Resources: 1 added.'], [4, '~ aws_instance.web[1]: instance_type "t3.large" → "t3.small"']]);
  Object.assign(S.get('out~0').s, { opacity: '0' }); Object.assign(S.get('cmd~0').s, { opacity: '0' }); Object.assign(S.get('out~1').s, C.ok); Object.assign(S.get('out~2').s, C.ok); Object.assign(S.get('out~3').s, C.cmp);
  S.cap(1, '원하는 인프라를 코드로 적어요: 서버 3대', 'Describe the infrastructure you want in code: 3 servers')
    .cap(2, 'plan: 코드와 실제의 차이를 미리 보여 줘요', 'plan previews the difference between code and reality')
    .cap(3, 'apply: 차이만큼 만들거나 고쳐요', 'apply creates or changes just that difference')
    .cap(4, '콘솔에서 손으로 바꾼 것(드리프트)도 찾아내요', 'It also catches manual console changes (drift)')
    .cap(5, '인프라도 코드 리뷰·버전 관리 · Terraform, Pulumi, CloudFormation', 'Infra gets reviews and history · Terraform, Pulumi, CloudFormation');
  return S;
}
function sFlag() {
  const S = scene({ id: 'op-flag', steps: 6, per: 1.3 });
  code(S, 'c0', 1, 1.2, 15, 'if (flags.on("new-checkout", user))', {}, 2);
  code(S, 'c1', 1, 3.4, 15, '&nbsp;&nbsp;renderNewCheckout()', {}, 2); code(S, 'c2', 1, 5.6, 15, 'else renderOldCheckout()', {}, 2);
  text(S, 'ph', 1, 9, ['new-checkout 출시 비율', 'new-checkout rollout'], { cls: 'cz-t op-b' });
  S.label('pct', { cls: 'cz-t op-big', x: 1, y: 10.6, w: 14 }, [[0, '0%'], [2, '5%'], [3, '25%'], [4, ['0% (킬 스위치)', '0% (kill switch)']], [5, '100%']]);
  fill(S, 'pb', 1, 14.4, 14, 1.2, 'accent'); S.set('pbf', 2, { width: '.7em' }).set('pbf', 3, { width: '3.5em' }).set('pbf', 4, { width: '0em' }).set('pbf', 5, { width: '14em' });
  text(S, 'err', 1, 16.4, ['오류 급증! 재배포 없이 즉시 끔', 'errors spike! switched off, no redeploy'], { cls: 'cz-t op-r', s: hid() }); S.set('err', 4, { opacity: '1' }).set('err', 5, { opacity: '0' });
  const ON = { 2: [7], 3: [7, 2, 13, 18, 10] };
  for (let i = 0; i < 20; i++) {
    const x = 18.4 + (i % 5) * 2.7, y = 2.6 + Math.floor(i / 5) * 3.2;
    dot(S, 'u' + i, x, y, '', { r: .95, s: { background: 'var(--line)', 'border-color': 'transparent' } });
    const on = { background: 'var(--accent)' }, offs = { background: 'var(--line)' };
    if (ON[2].includes(i)) S.set('u' + i, 2, on); else if (ON[3].includes(i)) S.set('u' + i, 3, on);
    S.set('u' + i, 4, ON[3].includes(i) ? { background: 'var(--danger)' } : offs);
    S.set('u' + i, 5, on);
  }
  text(S, 'lg', 18, 15.4, ['● 새 결제 화면을 보는 사용자', '● users seeing the new checkout'], { cls: 'cz-t op-a' });
  S.cap(1, '배포는 했지만 아직 아무도 못 봐요 (배포 ≠ 출시)', 'Shipped but invisible: deploy ≠ release')
    .cap(2, '5%에게만 먼저', 'Turn it on for 5% first')
    .cap(3, '괜찮으면 25%로', 'then 25% if it looks good')
    .cap(4, '문제가 생기면 스위치만 내리면 돼요', 'If something breaks, just flip it off')
    .cap(5, '고친 뒤 전체 공개', 'Fix it, then release to everyone')
    .cap(6, 'A/B 테스트·점진 출시에 써요 · 다 쓴 플래그는 코드에서 지우세요', 'Great for A/B tests and gradual rollouts · delete stale flags');
  return S;
}
function sCloud() {
  const S = scene({ id: 'op-cloud', steps: 5, per: 1.35 });
  const ROWS = [['애플리케이션', 'Application'], ['데이터', 'Data'], ['런타임', 'Runtime'], ['운영체제', 'OS'], ['가상화', 'Virtualization'], ['서버·네트워크', 'Servers & network']];
  const COLS = [['온프레미스', 'On-prem', 6], ['IaaS', 'IaaS', 4], ['PaaS', 'PaaS', 2], ['SaaS', 'SaaS', 0]];
  ROWS.forEach((l, r) => text(S, 'rl' + r, .6, 3.5 + r * 2.6, l, { w: 6.6, cls: 'cz-t op-xs2' }));
  COLS.forEach(([k, e, mine], c) => {
    const x = 7.4 + c * 6.1;
    text(S, 'ch' + c, x, 1, [k, e], { w: 5.7, cls: 'cz-t cz-tc op-b', s: hid() }); S.set('ch' + c, c + 1, { opacity: '1' });
    ROWS.forEach((_, r) => { cell(S, `g${c}_${r}`, x, 3 + r * 2.6, '', { w: 5.7, h: 2.2, s: hid(r < mine ? C.soft : C.ok) }); S.set(`g${c}_${r}`, c + 1, { opacity: '1' }); });
  });
  chip(S, 'k1', 7.4, 19, 1.4, '', C.soft, { h: 1.2 }); text(S, 'k1t', 9.2, 18.85, ['내가 관리', 'you manage'], { cls: 'cz-t' });
  chip(S, 'k2', 17, 19, 1.4, '', C.ok, { h: 1.2 }); text(S, 'k2t', 18.8, 18.85, ['클라우드가 관리', 'provider manages'], { cls: 'cz-t' });
  S.cap(1, '온프레미스: 서버부터 앱까지 전부 직접', 'On-prem: you run everything, hardware up')
    .cap(2, 'IaaS: 가상 서버를 빌려요 (EC2, Compute Engine)', 'IaaS: rent virtual machines (EC2, Compute Engine)')
    .cap(3, 'PaaS: 코드만 올리면 실행 (Heroku, Vercel, App Engine)', 'PaaS: push code and it runs (Heroku, Vercel, App Engine)')
    .cap(4, 'SaaS: 완성된 서비스를 써요 (Gmail, Slack)', 'SaaS: use finished software (Gmail, Slack)')
    .cap(5, '위로 갈수록 편하지만 자유도와 비용 구조가 달라져요', 'Less work as you go right, but less control and different costs');
  return S;
}

/* ---------- containers and kubernetes ---------- */
function sImage() {
  const S = scene({ id: 'op-image', steps: 6, per: 1.3 });
  text(S, 'dh', 1, .9, 'Dockerfile', { cls: 'cz-t cz-mono op-b' });
  const DF = ['FROM node:20-alpine', 'WORKDIR /app', 'COPY package*.json ./', 'RUN npm ci', 'COPY . .', 'CMD ["node", "server.js"]'];
  DF.forEach((t, i) => code(S, 'd' + i, 1, 2.4 + i * 2.4, 15, t, {}, 2.1));
  const LY = [['node:20-alpine · 40 MB', 1, [0]], ['WORKDIR /app', 1, [1]], ['package.json', 2, [2]], ['npm ci · 120 MB', 2, [3]], ['COPY . . · 2 MB', 3, [4]]];
  text(S, 'lh', 17.6, .9, ['이미지 레이어', 'Image layers'], { cls: 'cz-t op-b' });
  LY.forEach(([l, st, src], k) => {
    const y = 16 - k * 2.6;
    code(S, 'L' + k, 17.6, y, 13.4, l, hid(C.soft), 2.2); S.set('L' + k, st, { opacity: '1' });
    src.forEach(j => S.set('d' + j, st, C.soft).set('d' + j, st + 1, C.idle));
    pill(S, 'tg' + k, 27.6, y + .3, k < 4 ? 'CACHED' : 'REBUILT', { w: 3.2, h: 1.6, s: hid(k < 4 ? C.ok : C.cmp) }); S.set('tg' + k, 4, { opacity: '1' }).set('tg' + k, 6, { opacity: '0' });
  });
  S.set('d4', 4, C.cmp).set('d4', 5, C.idle).set('L4', 4, C.cmp).set('L4', 5, C.soft);
  pill(S, 'reg', 17.6, 2.4, ['레지스트리에 push: app:1.4.2', 'pushed: registry/app:1.4.2'], { w: 13.4, h: 2.2, s: hid(C.ok) }); S.set('reg', 6, { opacity: '1' });
  S.cap(1, '명령 한 줄마다 레이어가 하나씩 쌓여요', 'Each instruction adds a layer')
    .cap(2, '의존성 설치를 먼저', 'Install dependencies first')
    .cap(3, '자주 바뀌는 소스는 마지막에', 'and copy fast-changing source last')
    .cap(4, '코드만 바꾸면 아래 레이어는 캐시 재사용 · 빌드가 빨라요', 'Change only code and lower layers come from cache')
    .cap(5, '순서가 바뀌면 매번 npm ci를 다시 돌아요', 'Get the order wrong and npm ci reruns every time')
    .cap(6, '같은 이미지가 노트북·CI·서버 어디서든 똑같이 실행', 'The same image runs identically on laptop, CI and servers');
  return S;
}
function sK8s() {
  const S = scene({ id: 'op-k8s', steps: 6, per: 1.3 });
  code(S, 'y', 1, 1.2, 11.6, 'kind: Deployment<br>replicas: 3<br>image: app:1.4.2', C.soft, 4.6);
  box(S, 'cp', 14, 1.2, 17, 4.8, '', {}); text(S, 'cpt', 14.6, 1.5, ['컨트롤 플레인', 'Control plane'], { cls: 'cz-t op-b' });
  [['API 서버', 'API server'], ['스케줄러', 'Scheduler'], ['컨트롤러', 'Controller']].forEach((l, i) => chip(S, 'k' + i, 14.6 + i * 5.4, 3.2, 5, l, {}, { h: 2.2, cls: 'op-p' }));
  arrow(S, 'ya', 12.8, 3.5, 14.4, 3.5, { s: hid() }); S.set('ya', 1, { opacity: '1' });
  S.set('k0', 1, C.soft).set('k0', 2, C.idle).set('k1', 2, C.soft).set('k1', 3, C.idle).set('k2', 4, C.soft).set('k2', 5, C.idle);
  S.label('st', { cls: 'cz-t op-l', x: 1, y: 7.4, w: 30 }, [[0, ''], [2, ['원하는 상태 3 · 실제 3 ✓', 'desired 3 · actual 3 ✓']], [3, ['원하는 상태 3 · 실제 2 ✗', 'desired 3 · actual 2 ✗']], [5, ['원하는 상태 3 · 실제 3 ✓', 'desired 3 · actual 3 ✓']]]);
  [[1, 'node-1'], [16.6, 'node-2']].forEach(([x, n], i) => { box(S, 'n' + i, x, 10, 14.4, 9, '', {}); text(S, 'nt' + i, x + .6, 10.4, n, { cls: 'cz-t cz-mono op-b' }); });
  const PD = [[1.8, 0, 2], [7, 0, 2], [17.4, 1, 2], [22.6, 1, 4]];
  PD.forEach(([x, , st], i) => { chip(S, 'p' + i, x, 13, 4.6, 'pod', hid(C.ok), { h: 3.4 }); S.set('p' + i, st, { opacity: '1' }); });
  S.set('p1', 3, C.badf).set('p1', 4, { opacity: '0' }).set('p3', 4, C.cmp).set('p3', 5, C.ok);
  text(S, 'x', 7, 16.8, ['죽음 ✗', 'crashed ✗'], { w: 4.6, cls: 'cz-t cz-tc op-r', s: hid() }); S.set('x', 3, { opacity: '1' }).set('x', 4, { opacity: '0' });
  S.cap(1, '원하는 상태를 YAML로 선언해 제출', 'Declare the desired state in YAML')
    .cap(2, '스케줄러가 노드에 파드 3개를 배치', 'The scheduler places 3 pods on nodes')
    .cap(3, '파드 하나가 죽으면', 'When a pod dies')
    .cap(4, '컨트롤러가 차이를 보고 새 파드를 띄워요', 'a controller sees the gap and starts a new one')
    .cap(6, '계속 원하는 상태로 되돌리는 재조정 루프 · 자가 치유', 'A reconcile loop keeps pulling reality back · self-healing');
  return S;
}
function sHPA() {
  const S = scene({ id: 'op-hpa', steps: 6, per: 1.3 });
  text(S, 'ch', 1, 1.6, ['평균 CPU', 'Average CPU'], { cls: 'cz-t op-b' });
  fill(S, 'cpu', 1, 3.6, 14, 1.8, 'accent', 5.6);
  S.set('cpuf', 2, { width: '13.3em', background: 'var(--danger)' }).set('cpuf', 3, { width: '8.8em', background: 'var(--accent)' }).set('cpuf', 4, { width: '2.8em' }).set('cpuf', 5, { width: '4.2em' });
  edge(S, 'th', 10.8, 3, 10.8, 6, { h: .16, s: { background: 'var(--warn)' } }); text(S, 'tht', 9, 6.3, ['목표 70%', 'target 70%'], { cls: 'cz-t op-w' });
  S.label('cv', { cls: 'cz-t op-l', x: 1, y: 8.2, w: 14 }, [[0, 'CPU 40%'], [2, 'CPU 95%'], [3, 'CPU 63%'], [4, 'CPU 20%'], [5, 'CPU 30%']]);
  S.label('tf', { cls: 'cz-t', x: 1, y: 9.8, w: 14 }, [[0, ['트래픽: 보통', 'traffic: normal']], [2, ['트래픽: 급증', 'traffic: spike']], [4, ['트래픽: 감소', 'traffic: falling']]]);
  text(S, 'ph', 17, 1.6, 'replicas', { cls: 'cz-t cz-mono op-b' });
  [0, 1, 2].forEach(i => { chip(S, 'p' + i, 17 + i * 4.8, 3, 4.2, 'pod', i < 2 ? C.ok : hid(C.cmp), { h: 3.4 }); });
  S.set('p2', 3, { opacity: '1' }).set('p2', 4, C.ok).set('p2', 5, { opacity: '0' });
  S.label('n', { cls: 'cz-t op-big', x: 17, y: 7.4, w: 14 }, [[0, '2'], [3, '3'], [5, '2']]);
  text(S, 'fh', 1, 13, ['HPA 계산식', 'HPA formula'], { cls: 'cz-t op-b' });
  code(S, 'f', 1, 14.4, 30, 'desired = ceil(current × currentCPU / targetCPU)', {}, 2.2);
  S.label('fx', { cls: 'cz-c op-code', x: 1, y: 16.9, w: 30, h: 2.2 }, [[0, ''], [3, 'ceil(2 × 95 / 70) = ceil(2.7) = 3'], [5, ['ceil(3 × 20 / 70) = 1 → 최소 2개 유지', 'ceil(3 × 20 / 70) = 1 → floor of 2']]]);
  Object.assign(S.get('fx~0').s, { opacity: '0' }); Object.assign(S.get('fx~1').s, C.cmp); Object.assign(S.get('fx~2').s, C.soft);
  S.cap(1, '평소엔 파드 2개로 충분', 'Two pods are enough most of the time')
    .cap(2, '트래픽이 몰려 CPU가 목표를 넘으면', 'A spike pushes CPU over the target')
    .cap(3, 'HPA가 파드를 늘려요', 'so the HPA adds pods')
    .cap(4, '부하가 줄어도 바로 줄이진 않고', 'When load drops it waits a while')
    .cap(5, '안정화 시간 뒤 최소 개수까지 줄여요', 'then scales back to the minimum')
    .cap(6, '노드가 모자라면 클러스터 오토스케일러가 노드도 추가', 'If nodes run out, the cluster autoscaler adds nodes too');
  return S;
}
function sSvc() {
  const S = scene({ id: 'op-svc', steps: 5, per: 1.35 });
  chip(S, 'caller', 1, 1.4, 8.4, ['다른 서비스', 'another service'], {}, { h: 2.4, cls: 'op-p' });
  arrow(S, 'ca', 9.6, 2.6, 16.6, 8.2, {}); text(S, 'cat', 9.8, 3.6, 'http://api-svc', { cls: 'cz-t cz-mono' });
  chip(S, 'u', 1, 9, 4.6, ['사용자', 'user'], hid(), { h: 2.4, cls: 'op-p' });
  box(S, 'ing', 7, 7.6, 6.6, 5.2, ['인그레스<br>shop.com', 'Ingress<br>shop.com'], { s: hid(C.soft) });
  arrow(S, 'ua', 5.8, 10.2, 6.8, 10.2, { s: hid() }); arrow(S, 'ia', 13.8, 9.4, 16.6, 9.6, { s: hid() }); text(S, 'iat', 13.6, 7.6, '/api', { cls: 'cz-t cz-mono', s: hid() });
  show(S, ['u', 'ing', 'ua', 'ia', 'iat'], 3);
  box(S, 'svc', 16.8, 7.6, 6.4, 5.2, ['서비스<br>api-svc', 'Service<br>api-svc'], { s: C.soft });
  const PY = [1.6, 8.2, 14.8];
  PY.forEach((y, i) => { box(S, 'p' + i, 25.2, y, 5.8, 3.8, '', {}); S.label('pl' + i, { cls: 'cz-bx op-xs', x: 25.2, y, w: 5.8, h: 3.8 }, i === 1 ? [[0, 'pod<br>10.0.1.7'], [2, 'pod<br>10.0.2.3']] : [[0, `pod<br>10.0.1.${i ? 9 : 4}`]]); arrow(S, 'sa' + i, 23.4, 10.2, 25, y + 1.9, {}); });
  S.set('p1', 2, C.cmp).set('p1', 3, C.idle);
  box(S, 'web', 16.8, 15, 6.4, 3.6, ['web-svc', 'web-svc'], { s: hid(C.soft) }); arrow(S, 'wa', 12, 12.9, 16.6, 16.4, { s: hid() }); text(S, 'wat', 11.4, 15.4, '/', { cls: 'cz-t cz-mono', s: hid() }); show(S, ['web', 'wa', 'wat'], 4);
  S.cap(1, '파드 IP는 수시로 바뀌니 서비스가 고정된 이름을 줘요', 'Pod IPs keep changing, so a Service gives them one stable name')
    .cap(2, '파드가 교체돼도 서비스가 알아서 새 IP로 보내요', 'When a pod is replaced, traffic follows the new IP')
    .cap(3, '외부 트래픽은 인그레스가 받아 경로별로 나눠요', 'Outside traffic enters through the Ingress')
    .cap(4, '/api는 API로, /는 웹으로', '/api goes to the API, / to the web app')
    .cap(5, '서비스 = 내부 로드 밸런서 + DNS 이름', 'A Service is an internal load balancer plus a DNS name');
  return S;
}
function sProbe() {
  const S = scene({ id: 'op-probe', steps: 6, per: 1.3 });
  box(S, 'svc', 1, 7.6, 7, 4.8, ['서비스', 'Service'], { s: C.soft });
  arrow(S, 'tr', 8.2, 10, 11.8, 10, { s: hid({ background: 'var(--accent)', 'border-color': 'var(--accent)' }) });
  S.set('tr', 2, { opacity: '1' }).set('tr', 3, { opacity: '0' }).set('tr', 5, { opacity: '1' });
  text(S, 'trx', 8.2, 7.6, ['트래픽', 'traffic'], { w: 3.6, cls: 'cz-t cz-tc' });
  box(S, 'pod', 12, 4, 10.6, 12, '', {}); text(S, 'pt', 12.6, 4.4, 'pod', { cls: 'cz-t cz-mono op-b' });
  S.label('app', { cls: 'cz-c op-p', x: 12.8, y: 7.4, w: 9, h: 5 }, [[0, ['시작 중…<br>캐시 채우는 중', 'starting…<br>warming cache']], [2, ['실행 중', 'running']], [3, ['응답 없음<br>(교착 상태)', 'stuck<br>(deadlock)']], [4, ['재시작 중…', 'restarting…']], [5, ['실행 중', 'running']]]);
  [[1, C.ok], [2, C.badf], [3, C.cmp], [4, C.ok]].forEach(([i, st]) => Object.assign(S.get('app~' + i).s, st)); Object.assign(S.get('app~0').s, C.cmp);
  S.label('rc', { cls: 'cz-t op-xs2', x: 12.8, y: 13.4, w: 9 }, [[0, ['재시작 0회', 'restarts: 0']], [4, ['재시작 1회', 'restarts: 1']]]);
  text(S, 'rh', 24, 4, 'readiness', { cls: 'cz-t cz-mono op-b' }); text(S, 'rs', 24, 5.4, ['트래픽 받을 준비?', 'ready for traffic?'], { cls: 'cz-t' });
  S.label('rv', { cls: 'cz-pill', x: 24, y: 7, w: 7, h: 2 }, [[0, '✗'], [2, '✓'], [3, '✗'], [5, '✓']]);
  text(S, 'lh', 24, 11, 'liveness', { cls: 'cz-t cz-mono op-b' }); text(S, 'ls', 24, 12.4, ['살아 있나?', 'still alive?'], { cls: 'cz-t' });
  S.label('lv', { cls: 'cz-pill', x: 24, y: 14, w: 7, h: 2 }, [[0, '✓'], [3, ['✗ ✗ ✗', '✗ ✗ ✗']], [4, '…'], [5, '✓']]);
  ['rv~0', 'rv~2', 'lv~1'].forEach(k => Object.assign(S.get(k).s, C.badf)); ['rv~1', 'rv~3', 'lv~0', 'lv~3'].forEach(k => Object.assign(S.get(k).s, C.ok)); Object.assign(S.get('lv~2').s, C.cmp);
  S.cap(1, '시작 직후엔 아직 준비 안 됨 → 트래픽을 안 보내요', 'Right after start it isn’t ready, so it gets no traffic')
    .cap(2, 'readiness 통과 → 트래픽 시작', 'Readiness passes → traffic flows')
    .cap(3, '앱이 멈추면 liveness가 연속 실패', 'If the app hangs, liveness fails repeatedly')
    .cap(4, '쿠버네티스가 컨테이너를 재시작', 'and Kubernetes restarts the container')
    .cap(5, '다시 준비되면 트래픽 재개', 'Traffic resumes once it’s ready again')
    .cap(6, 'liveness를 너무 엄격하게 잡으면 재시작이 반복돼요', 'Overly strict liveness probes cause restart loops');
  return S;
}

/* ---------- release strategies ---------- */
function sRolling() {
  const S = scene({ id: 'op-rolling', steps: 9, per: .85 });
  text(S, 'h', 1, .9, ['파드 4개 · maxSurge 1 · maxUnavailable 0', '4 pods · maxSurge 1 · maxUnavailable 0'], { cls: 'cz-t cz-mono op-b' });
  for (let i = 0; i < 4; i++) {
    const x = 1.6 + i * 7.4;
    chip(S, 'o' + i, x, 9, 6, 'v1', C.soft, { h: 4 });
    chip(S, 'n' + i, x, 3, 6, 'v2', hid(C.cmp), { h: 4 });
    text(S, 'ns' + i, x, 7.2, ['준비 중…', 'starting…'], { w: 6, cls: 'cz-t cz-tc op-w', s: hid() }); S.set('ns' + i, 2 * i + 1, { opacity: '1' }).set('ns' + i, 2 * i + 2, { opacity: '0' });
    S.set('n' + i, 2 * i + 1, { opacity: '1' }).move('n' + i, 2 * i + 2, x, 9, C.ok).set('o' + i, 2 * i + 2, { opacity: '0' });
  }
  S.label('mix', { cls: 'cz-t op-l', x: 1, y: 15.4, w: 30 }, [[0, 'v1 ×4 · v2 ×0'], [2, 'v1 ×3 · v2 ×1'], [4, 'v1 ×2 · v2 ×2'], [6, 'v1 ×1 · v2 ×3'], [8, 'v1 ×0 · v2 ×4 ✓']]);
  S.cap(1, '새 버전 파드를 하나 띄우고', 'Start one new-version pod')
    .cap(2, '준비되면 옛 파드 하나를 내려요', 'once ready, retire one old pod')
    .cap(3, '한 칸씩 반복', 'Repeat, one at a time')
    .cap(8, '중단 없이 전부 교체', 'Everything replaced with no downtime')
    .cap(9, '쿠버네티스 기본 방식 · 중간엔 v1과 v2가 섞여 돌아 서로 호환돼야 해요', 'Kubernetes’ default · v1 and v2 run side by side, so they must be compatible');
  return S;
}
function sBlueGreen() {
  const S = scene({ id: 'op-bluegreen', steps: 5, per: 1.4 });
  chip(S, 'u', 1, 8.8, 4.6, ['사용자', 'users'], {}, { h: 2.6, cls: 'op-p' }); arrow(S, 'ua', 5.8, 10.1, 8.4, 10.1, {});
  box(S, 'rt', 8.6, 7.6, 5, 5, ['라우터', 'Router'], { s: C.soft });
  box(S, 'bl', 18, 1.6, 13, 7, '', { s: { 'border-color': 'var(--accent)' } }); text(S, 'blt', 18.6, 2, 'blue', { cls: 'cz-t cz-mono op-b' });
  chip(S, 'bv', 19.4, 4.2, 10.2, ['v1 · 운영 중', 'v1 · live'], C.soft, { h: 3, cls: 'op-p' }); S.set('bv', 3, { opacity: '.45' }).set('bv', 4, { opacity: '1' });
  box(S, 'gr', 18, 11.4, 13, 7, '', { s: { 'border-color': 'var(--ok)' } }); text(S, 'grt', 18.6, 11.8, 'green', { cls: 'cz-t cz-mono op-b' });
  S.label('gv', { cls: 'cz-c op-m op-p', x: 19.4, y: 14, w: 10.2, h: 3 }, [[0, ['비어 있음', 'idle']], [1, ['v2 배포됨', 'v2 deployed']], [2, ['v2 · 내부 테스트 ✓', 'v2 · smoke tests ✓']], [3, ['v2 · 운영 중', 'v2 · live']], [4, ['v2 · 대기 (롤백됨)', 'v2 · standby (rolled back)']]]);
  [[1, C.cmp], [2, C.ok], [3, C.ok], [4, C.cmp]].forEach(([i, st]) => Object.assign(S.get('gv~' + i).s, st));
  const A = { background: 'var(--accent)', 'border-color': 'var(--accent)' };
  arrow(S, 'tb', 13.8, 9, 17.8, 5.6, { h: .22, s: Object.assign({}, A) }); arrow(S, 'tg', 13.8, 11.2, 17.8, 15, { h: .22, s: hid(A) });
  S.set('tb', 3, { opacity: '0' }).set('tg', 3, { opacity: '1' }).set('tb', 4, { opacity: '1' }).set('tg', 4, { opacity: '0' });
  S.cap(1, '운영 중인 blue 옆 green에 새 버전을 배포', 'Deploy the new version to green, next to live blue')
    .cap(2, '실제 트래픽 없이 미리 검증', 'Verify it before it sees real traffic')
    .cap(3, '라우터를 한 번에 green으로 전환', 'Flip the router to green in one step')
    .cap(4, '문제가 생기면 즉시 blue로 되돌려요', 'If anything breaks, flip straight back to blue')
    .cap(5, '즉시 전환·즉시 롤백 · 대신 환경이 두 배, DB는 양쪽과 호환', 'Instant switch and rollback · double the infra, DB must suit both');
  return S;
}
function sCanary() {
  const S = scene({ id: 'op-canary', steps: 7, per: 1.2 });
  box(S, 'lb', 1, 7.6, 5.6, 4.8, 'LB', { s: C.soft });
  box(S, 'v1', 10, 1.4, 9.6, 7.8, '', {}); text(S, 'v1t', 10.6, 1.8, ['안정 버전 v1', 'stable v1'], { cls: 'cz-t op-b' });
  box(S, 'v2', 10, 11, 9.6, 7.8, '', { s: { 'border-color': 'var(--warn)' } }); text(S, 'v2t', 10.6, 11.4, ['카나리 v2', 'canary v2'], { cls: 'cz-t op-b' });
  arrow(S, 'a1', 6.8, 9.2, 9.8, 5.4, {}); arrow(S, 'a2', 6.8, 10.8, 9.8, 14.8, { s: hid() }); S.set('a2', 2, { opacity: '1' });
  S.label('p1', { cls: 'cz-t op-l', x: 6.2, y: 3.4, w: 4 }, [[0, '100%'], [2, '95%'], [4, '75%'], [5, '50%'], [6, '0%']]);
  S.label('p2', { cls: 'cz-t op-l', x: 6.2, y: 16.2, w: 4 }, [[0, '0%'], [2, '5%'], [4, '25%'], [5, '50%'], [6, '100%']]);
  const pos = i => [10.8 + (i % 2) * 4.4, 3.4 + Math.floor(i / 2) * 2.8];
  for (let i = 0; i < 4; i++) {
    const [x, y] = pos(i);
    chip(S, 'o' + i, x, y, 4, 'v1', C.soft, { h: 2.4 });
    chip(S, 'n' + i, x, y + 9.6, 4, 'v2', hid(C.cmp), { h: 2.4 });
  }
  S.set('n0', 1, { opacity: '1' }).set('n1', 4, { opacity: '1' }).set('n2', 5, { opacity: '1' }).set('n3', 6, { opacity: '1' });
  S.set('o3', 4, { opacity: '0' }).set('o2', 5, { opacity: '0' }).set('o1', 6, { opacity: '0' }).set('o0', 6, { opacity: '0' });
  text(S, 'mh', 21.4, 1.4, ['카나리 지표 비교', 'Canary analysis'], { cls: 'cz-t op-b' });
  text(S, 'm1', 21.4, 3.4, ['오류율', 'error rate'], { cls: 'cz-t op-b' }); S.label('m1v', { cls: 'cz-t cz-mono', x: 21.4, y: 4.8, w: 9.6 }, [[0, ''], [3, 'v1 0.21% · v2 0.19% ✓']]);
  text(S, 'm2', 21.4, 7.2, ['p99 지연', 'p99 latency'], { cls: 'cz-t op-b' }); S.label('m2v', { cls: 'cz-t cz-mono', x: 21.4, y: 8.6, w: 9.6 }, [[0, ''], [3, 'v1 180ms · v2 172ms ✓']]);
  pill(S, 'ar', 21.4, 11, ['나빠지면 자동 롤백', 'auto-rollback if worse'], { w: 9.6, h: 2, s: hid(C.cmp) }); S.set('ar', 3, { opacity: '1' });
  pill(S, 'dn', 21.4, 14, ['v2 100% · 완료 ✓', 'v2 at 100% · done ✓'], { w: 9.6, h: 2, s: hid(C.okf) }); S.set('dn', 6, { opacity: '1' });
  S.cap(1, '새 버전을 소수의 파드로 먼저 배포', 'Deploy the new version to a few pods first')
    .cap(2, '트래픽 5%만 카나리로', 'Send just 5% of traffic to the canary')
    .cap(3, '오류율·지연을 기존 버전과 비교', 'Compare error rate and latency with the stable version')
    .cap(4, '괜찮으면 25%', 'Healthy? Go to 25%')
    .cap(5, '50%', '50%')
    .cap(6, '100% · 옛 버전 정리', '100% · retire the old version')
    .cap(7, '문제가 생겨도 일부 사용자만 영향 · Argo Rollouts·Flagger가 자동화', 'Problems hit only a few users · Argo Rollouts and Flagger automate it');
  return S;
}

/* ---------- observability and operations ---------- */
function sPillars() {
  const S = scene({ id: 'op-pillars', steps: 4, per: 1.6 });
  const X = [1, 11.4, 21.8];
  [['로그', 'Logs'], ['메트릭', 'Metrics'], ['트레이스', 'Traces']].forEach((l, i) => { col(S, 'c' + i, X[i], 2.6, 9.4, 15.6); text(S, 'h' + i, X[i] + .2, 1, l, { cls: 'cz-t op-b' }); S.set('c' + i, i + 1, { background: 'color-mix(in srgb,var(--accent) 12%,transparent)' }); });
  [['INFO GET /cart 200', {}], ['INFO GET /me 200', {}], ['WARN slow query 1.2s', C.cmp], ['ERROR pay timeout', C.bad], ['INFO GET /cart 200', {}]].forEach(([t, st], i) => { code(S, 'l' + i, 1.5, 3.4 + i * 2.5, 8.4, t, hid(st), 2); S.set('l' + i, 1, { opacity: '1' }); });
  text(S, 'ld', 1.5, 16.2, ['무슨 일이 있었나', 'what happened'], { cls: 'cz-t', s: hid() }); S.set('ld', 1, { opacity: '1' });
  [3, 3.4, 2.8, 3.6, 3.2, 9, 3.4, 3].forEach((h, i) => vbar(S, 'm' + i, 12.2 + i * 1.05, 14.8, .8, h, h > 5 ? { background: 'var(--danger)', 'border-color': 'var(--danger)' } : { background: 'var(--accent)', 'border-color': 'var(--accent)' }, 2));
  text(S, 'md', 12, 16.2, ['얼마나·언제 (숫자 추세)', 'how much, when (trends)'], { cls: 'cz-t', s: hid() }); S.set('md', 2, { opacity: '1' });
  [['GET /checkout', 0, 8.4, C.soft], ['auth', 0, 1.2, C.soft], ['db', 1.4, 3, C.soft], ['payment', 3.2, 8.2, C.bad]].forEach(([l, a, b, st], i) => hbar(S, 't' + i, 22.3 + a, 3.6 + i * 2.6, b - a, 2, st, 3, l));
  text(S, 'td', 22.3, 16.2, ['어디서 느렸나 (요청 경로)', 'where it was slow'], { cls: 'cz-t', s: hid() }); S.set('td', 3, { opacity: '1' });
  S.cap(1, '로그: 개별 사건의 자세한 기록', 'Logs: detailed records of individual events')
    .cap(2, '메트릭: 숫자로 모은 추세 · 알림의 출발점', 'Metrics: aggregated numbers · where alerts start')
    .cap(3, '트레이스: 한 요청이 거쳐 간 서비스와 시간', 'Traces: the services and time one request went through')
    .cap(4, '메트릭으로 감지 → 트레이스로 위치 → 로그로 원인', 'Metrics detect → traces locate → logs explain');
  return S;
}
function sTrace() {
  const S = scene({ id: 'op-trace', steps: 6, per: 1.25 });
  text(S, 'h', 1, .9, 'trace 4bf92f3577b34da6', { cls: 'cz-t cz-mono op-b' });
  const x0 = 10.6, u = 20 / 800;
  const SP = [['gateway', 0, 800, C.soft], ['order-svc', 20, 780, C.soft], ['inventory-svc', 60, 180, C.ok], ['payment-svc', 200, 760, C.cmp], ['└ bank API', 230, 740, C.bad]];
  SP.forEach(([l, a, b, st], i) => { const y = 3 + i * 2.8; text(S, 'l' + i, 1, y + .4, l, { cls: 'cz-t cz-mono', s: hid() }); hbar(S, 'b' + i, x0 + a * u, y, (b - a) * u, 2, st, i + 1, `${b - a}ms`); S.set('l' + i, i + 1, { opacity: '1' }); });
  edge(S, 'ax', x0, 17.4, x0 + 20, 17.4, { s: ink });
  [0, 200, 400, 600, 800].forEach(t => text(S, 't' + t, x0 + t * u - 1.5, 17.8, `${t}`, { w: 3, cls: 'cz-t cz-tc cz-mono' }));
  text(S, 'ms', x0 - 2.4, 17.8, 'ms', { cls: 'cz-t cz-mono' });
  S.cap(1, '요청 하나에 trace ID를 붙여 서비스마다 전달', 'One trace ID travels with the request through every service')
    .cap(2, '각 서비스는 자기 구간(span)을 기록', 'Each service records its own span')
    .cap(4, '하위 호출도 중첩해서', 'nested under its caller')
    .cap(5, '전체 800ms 중 510ms가 외부 은행 API · 병목 발견', '510 of 800 ms is the bank API · bottleneck found')
    .cap(6, 'OpenTelemetry로 수집 · trace ID를 로그에도 찍어 연결', 'Collect with OpenTelemetry · put trace IDs in logs too');
  return S;
}
function sPct() {
  const S = scene({ id: 'op-percentile', steps: 5, per: 1.4 });
  const V = [60, 70, 80, 85, 90, 95, 100, 105, 110, 115, 120, 130, 140, 150, 165, 180, 210, 260, 450, 2100];
  const H = v => v <= 600 ? v / 600 * 10 : 13.4, X = i => 2 + i * 1.45;
  V.forEach((v, i) => vbar(S, 'b' + i, X(i), 17, 1.15, H(v), i === 19 ? { background: 'var(--danger)', 'border-color': 'var(--danger)' } : i === 18 ? { background: 'var(--warn)', 'border-color': 'var(--warn)' } : { background: 'var(--accent-soft)', 'border-color': 'var(--accent)' }, 1));
  edge(S, 'ax', 1.6, 17, 31, 17, { s: ink });
  text(S, 'xl', 2, 17.5, ['요청 100개를 느린 순으로 정렬 (막대 1개 = 5%)', '100 requests sorted by latency (one bar = 5%)'], { cls: 'cz-t' });
  edge(S, 'avg', 1.6, 17 - H(241), 31, 17 - H(241), { h: .16, s: hid({ background: dash('ink-2') }) }); text(S, 'avt', 2, 17 - H(241) - 1.4, ['평균 241ms', 'avg 241 ms'], { cls: 'cz-t op-b', s: hid() }); show(S, ['avg', 'avt'], 2);
  text(S, 'p50', X(10) - 1.6, 17 - H(120) - 3.2, 'p50 120ms', { cls: 'cz-t cz-mono op-a', s: hid() }); S.set('p50', 3, { opacity: '1' });
  text(S, 'p95', X(18) - 4.4, 17 - H(450) - 1.4, 'p95 450ms', { cls: 'cz-t cz-mono op-w', s: hid() }); S.set('p95', 4, { opacity: '1' });
  text(S, 'p99', X(19) - 7.6, 2.2, 'p99 2.1s', { cls: 'cz-t cz-mono op-r', s: hid() }); S.set('p99', 4, { opacity: '1' });
  text(S, 'brk', X(19) - .2, 6.4, '≈', { w: 1.6, cls: 'cz-t cz-tc op-b' });
  S.cap(1, '응답 시간은 대부분 빠르지만 일부가 아주 느려요', 'Most responses are fast, a few are very slow')
    .cap(2, '평균은 이 꼬리를 숨겨요', 'The average hides that tail')
    .cap(3, 'p50(중앙값): 절반은 이보다 빨라요', 'p50 (median): half are faster than this')
    .cap(4, 'p99: 100명 중 1명은 2초 넘게 기다려요', 'p99: one user in a hundred waits over 2 s')
    .cap(5, '목표와 알림은 p95·p99로 · 페이지 하나가 요청 수십 개면 꼬리는 흔한 일', 'Set targets on p95/p99 · with dozens of calls per page, the tail is common');
  return S;
}
function sSLO() {
  const S = scene({ id: 'op-slo', steps: 6, per: 1.3 });
  text(S, 's1', 1, 1, ['SLI: 성공한 요청 ÷ 전체 요청', 'SLI: successful requests ÷ all requests'], { cls: 'cz-t op-l', s: hid() }); S.set('s1', 1, { opacity: '1' });
  text(S, 's2', 1, 2.8, ['SLO: 30일 동안 99.9% 이상', 'SLO: at least 99.9% over 30 days'], { cls: 'cz-t op-l', s: hid() }); S.set('s2', 2, { opacity: '1' });
  text(S, 's3', 1, 4.6, ['에러 예산 = 0.1% = 한 달에 약 43분', 'Error budget = 0.1% ≈ 43 minutes a month'], { cls: 'cz-t op-l op-w', s: hid() }); S.set('s3', 2, { opacity: '1' });
  fill(S, 'bud', 1, 7.4, 30, 3, 'ok', 0);
  S.set('budf', 2, { width: '30em' }).set('budf', 3, { width: '23.06em' }).set('budf', 4, { width: '5.7em', background: 'var(--warn)' });
  S.label('rem', { cls: 'cz-t op-big', x: 1, y: 10.8, w: 30 }, [[0, ''], [2, ['남은 예산 43분', '43 min left']], [3, ['남은 예산 33분', '33 min left']], [4, ['남은 예산 8분 ⚠', '8 min left ⚠']]]);
  chip(S, 'i1', 1, 14.4, 14.4, ['장애 #1 · 10분', 'Incident #1 · 10 min'], hid(C.bad), { h: 2.4, cls: 'op-p' }); S.set('i1', 3, { opacity: '1' });
  chip(S, 'i2', 16.6, 14.4, 14.4, ['장애 #2 · 25분', 'Incident #2 · 25 min'], hid(C.bad), { h: 2.4, cls: 'op-p' }); S.set('i2', 4, { opacity: '1' });
  pill(S, 'pol', 1, 17.6, ['정책: 위험한 배포 중단 · 안정화 작업 우선', 'Policy: freeze risky releases · fix reliability first'], { w: 30, h: 2.2, s: hid(C.cmp) }); S.set('pol', 5, { opacity: '1' });
  S.cap(1, 'SLI: 사용자 경험을 숫자로 재는 지표', 'SLI: a number that measures user experience')
    .cap(2, 'SLO 목표에서 허용되는 실패량이 에러 예산', 'The failures the SLO allows form an error budget')
    .cap(3, '장애가 날 때마다 예산을 써요', 'Every incident spends budget')
    .cap(5, '예산이 바닥나면 기능보다 안정성', 'When it runs low, reliability beats features')
    .cap(6, '100%는 목표가 아니에요 · 예산이 남으면 더 과감하게 출시', '100% isn’t the goal · spare budget means you can ship faster');
  return S;
}
function sIncident() {
  const S = scene({ id: 'op-incident', steps: 6, per: 1.3 });
  edge(S, 'ax', 1, 9, 31, 9, { h: .2, s: ink });
  const EV = [[2, '13:58', ['배포 (원인)', 'deploy (cause)'], C.badf, 0], [7.4, '14:02', ['감지 · 알림', 'detect · alert'], C.cmp, 1], [13, '14:05', ['분류 · 장애 선언', 'triage · declare'], C.cmp, 2], [19, '14:09', ['완화 · 롤백', 'mitigate · roll back'], C.soft, 3], [24.6, '14:21', ['복구 확인', 'resolved'], C.okf, 4], [29.6, ['+2일', '+2 days'], ['회고', 'postmortem'], C.ok, 5]];
  EV.forEach(([x, t, l, st, step], i) => {
    dot(S, 'e' + i, x, 9, '', { r: .7, s: step ? hid(st) : st }); if (step) S.set('e' + i, step, { opacity: '1' });
    const up = i % 2 === 0;
    text(S, 't' + i, Math.min(Math.max(.4, x - 2.5), 26.6), up ? 5.2 : 10.4, t, { w: 5, cls: 'cz-t cz-tc cz-mono', s: step ? hid() : {} });
    text(S, 'l' + i, Math.min(Math.max(.4, x - 3), 25.6), up ? 6.6 : 11.8, l, { w: 6, cls: 'cz-t cz-tc op-b', s: step ? hid() : {} });
    if (step) show(S, ['t' + i, 'l' + i], step);
  });
  edge(S, 'd1', 2, 15.2, 7.4, 15.2, { h: .2, s: hid({ background: 'var(--warn)' }) }); text(S, 'd1t', 2, 15.8, ['감지까지 4분', '4 min to detect'], { cls: 'cz-t op-w', s: hid() }); show(S, ['d1', 'd1t'], 1);
  edge(S, 'd2', 2, 17.8, 24.6, 17.8, { h: .2, s: hid({ background: 'var(--accent)' }) }); text(S, 'd2t', 2, 18.4, ['복구까지 23분 (MTTR)', '23 min to recover (MTTR)'], { cls: 'cz-t op-a', s: hid() }); show(S, ['d2', 'd2t'], 4);
  S.cap(1, '좋은 알림은 사용자보다 먼저 알아채요', 'Good alerts notice before users do')
    .cap(2, '심각도를 정하고 대응 책임자를 정해요', 'Set severity and name an incident lead')
    .cap(3, '원인 분석보다 먼저 피해를 멈춰요 (롤백·플래그 끄기)', 'Stop the damage before root-causing it (roll back, flip flags)')
    .cap(4, '지표가 정상인지 확인', 'Confirm the metrics are healthy')
    .cap(5, '비난 없는 회고: 사람 말고 시스템을 고쳐요', 'Blameless postmortem: fix the system, not the person')
    .cap(6, '감지·복구 시간을 줄이는 게 장애를 없애는 것보다 현실적', 'Shrinking detect and recover time beats hoping for zero incidents');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'opx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono opx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono opx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c opx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono opx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c opx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'opx-s opx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono opx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono opx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono opx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono opx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono opx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'opx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'opx-xs', 5));


const CSSX = `
.opx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.opx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.opx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.opx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.opx-r .in{color:var(--danger);font-weight:800}
.opx-g .in{color:var(--ok);font-weight:800}
.opx-a .in{color:var(--accent);font-weight:800}
.opx-w .in{color:var(--warn);font-weight:800}
.opx-c .in{font-size:.6em;font-weight:700}
.opx-c2 .in{font-size:.5em;font-weight:700}
.opx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.opx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'opx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= git ================= */
function sBisect() {
  const S = scene({ id: 'op-bisect', steps: 5, per: 1.6 });
  const X = i => 1.4 + i * 1.86, ST = { 0: ['ok', 0], 15: ['danger', 0], 7: ['ok', 2], 11: ['danger', 3], 9: ['ok', 3], 10: ['danger', 4] };
  hl(S, 'ln', X(0) + .4, X(15) + .4, 3.3, 'ink-3', 0, { w: .08 });
  for (let i = 0; i < 16; i++) { box2(S, 'c' + i, X(i), 2.7, 1.3, 1.2, '', 'line', 0, { pct: 45 }); T(S, 'cl' + i, X(i) - .3, 4.05, 'c' + (i + 1), 'cz-tc cz-mono opx-tiny', 0, { w: 1.9 }); if (ST[i]) tsets(S, 'c' + i, [[ST[i][1], ST[i][0], 50]]); }
  T(S, 'g', X(0) - .2, 1.6, ['좋음 ✓', 'good ✓'], 'opx-tiny opx-g', 0); T(S, 'b', X(15) - .6, 1.6, ['망가짐 ✗', 'bad ✗'], 'opx-tiny opx-r', 0);
  frame(S, 'r2', X(8) - .2, 2.45, X(15) - X(8) + 1.7, 1.7, 'warn', 2, { dash: 1, w: .1, off: 3 }); T(S, 'r2l', X(7) - .4, 1.6, ['c8 테스트: 좋음', 'test c8: good'], 'opx-tiny opx-g', 2, { off: 3 });
  frame(S, 'r3', X(10) - .2, 2.45, X(11) - X(10) + 1.7, 1.7, 'warn', 3, { dash: 1, w: .1, off: 4 }); T(S, 'r3l', X(8), 1, ['c12 망가짐 → c10 좋음 → 남은 후보 c11·c12', 'c12 bad → c10 good → c11 or c12 left'], 'opx-tiny opx-w', 3, { off: 4 });
  ring(S, 'cul', X(10) + .65, 3.3, 1.2, 'danger', 4, { w: .14 }); T(S, 'culp', X(10) - 1.4, 1.1, ['범인: c11 (테스트 4번)', 'culprit: c11 (4 tests)'], 'opx-xs opx-r', 4);
  code(S, 'cd', 1, 5.4, 30, ['git bisect start', ['git bisect bad                # 지금 버전은 망가짐', 'git bisect bad                # the current version is broken'], ['git bisect good v1.0          # 이때는 됐음', 'git bisect good v1.0          # this one worked'], ['git bisect run npm test       # 자동으로 반씩 좁혀 가요', 'git bisect run npm test       # halve the range automatically']], [[1, 1], [2, 2], [3, 3]], { hoff: 5 });
  fin(S, 'z', 11.6, [['git bisect: 좋은 커밋과 나쁜 커밋 사이를 이진 탐색해 버그를 들여온 커밋을 찾아요', 'git bisect binary-searches between a good and a bad commit to find the one that introduced a bug', 'opx-xs opx-a'], ['커밋 1,000개도 약 10번이면 끝 (log₂ n) · 테스트 스크립트가 있으면 완전 자동', '1,000 commits take about 10 tests (log₂ n) · fully automatic with a test script'], ['작은 커밋을 자주 남겨야 범인 커밋도 작아서 원인이 바로 보여요', 'small, frequent commits keep the culprit small and the cause obvious']]);
  S.cap(1, '좋음과 나쁨 사이', 'Between good and bad').cap(2, '가운데를 시험', 'Test the middle').cap(3, '반씩 좁히기', 'Halve again').cap(4, '범인 커밋', 'The culprit').cap(5, 'git bisect', 'git bisect');
  return S;
}
function sUndo() {
  const S = scene({ id: 'op-undo', steps: 5, per: 1.6 });
  const row = (p, y, st, lbl) => { T(S, p + 't', 1, y - .2, lbl, 'opx-xs opx-a', st); ['A', 'B', 'C', 'D'].forEach((c, i) => { stt(S, p + c, 4 + i * 3.6, y + 1.4, c, c === 'D' ? 'danger' : 'accent', st, { r: .8, pct: 25 }); if (i) hl(S, p + 'e' + i, 4.8 + (i - 1) * 3.6, 3.2 + i * 3.6, y + 1.4, 'ink-3', st, { w: .08 }); }); };
  row('a', 1, 1, ['revert: 되돌리는 커밋을 새로 추가', 'revert: add a commit that undoes it']);
  hl(S, 'ae4', 15.6, 17.6, 2.4, 'ok', 2, { w: .08 }); stt(S, 'aR', 18.4, 2.4, "D'", 'ok', 2, { r: .8, pct: 40 });
  box2(S, 'am', 13.8, .2, 3.2, .9, 'main', 'warn', 1, { pct: 40 }); S.move('am', 2, 16.8, .2);
  T(S, 'an', 20.6, 2.1, ['히스토리는 그대로 · 공유 브랜치에 안전 ✓', 'history kept · safe when shared ✓'], 'opx-xs opx-g', 2);
  row('b', 4.8, 3, ['reset --hard C: 브랜치를 뒤로 옮김', 'reset --hard C: move the branch back']);
  box2(S, 'bm', 9.6, 7.2, 3.2, .9, 'main', 'warn', 3, { pct: 40 }); S.move('bm', 4, 13.2, 7.2); S.set('bD', 3, { opacity: '.35' }); S.set('bDl', 3, { opacity: '.35' }); tsets(S, 'bD', [[4, 'danger', 25]]); S.set('bD', 4, { opacity: '1' }); S.set('bDl', 4, { opacity: '1' });
  T(S, 'bn', 17.8, 5.6, ['D가 안 보여요', 'D disappears from view'], 'opx-xs opx-r', 3, { off: 4 }); T(S, 'bn2', 17.8, 6.6, ['이미 푸시했다면 남들과 꼬여요 ✗', 'if pushed, it tangles others ✗'], 'opx-xs opx-r', 3, { off: 4 });
  code(S, 'rl', 1, 8.6, 30, ['$ git reflog', 'a1b2c3 HEAD@{0}: reset: moving to C', 'f9e8d7 HEAD@{1}: commit: D', ['$ git reset --hard HEAD@{1}      # D를 되살려요', '$ git reset --hard HEAD@{1}      # bring D back']], [[2, 4]], { st: 4 });
  T(S, 'bn4', 17.8, 5.6, ['reflog로 되살려요 ✓', 'recovered via the reflog ✓'], 'opx-xs opx-g', 4);
  fin(S, 'z', 14.6, [['공유된 커밋은 revert(새 커밋으로 취소), 내 로컬 커밋은 reset(포인터 이동)', 'undo shared commits with revert (a new commit); local ones with reset (move the pointer)', 'opx-xs opx-a'], ['실수해도 reflog에 약 90일간 남아요 · 파일 하나는 git restore, 마지막 커밋 수정은 --amend', 'mistakes stay in the reflog for about 90 days · git restore for a file, --amend for the last commit']]);
  S.cap(1, '나쁜 커밋 D', 'A bad commit D').cap(2, 'revert로 취소', 'Undo with revert').cap(3, 'reset으로 되감기', 'Rewind with reset').cap(4, 'reflog로 구조', 'Rescue with the reflog').cap(5, 'Git에서 되돌리기', 'Undoing things in Git');
  return S;
}

/* ================= delivery ================= */
function sGitops() {
  const S = scene({ id: 'op-gitops', steps: 5, per: 1.6 });
  box2(S, 'dev', 1, 1.6, 4.6, 1.5, ['개발자', 'developer'], 'line', 0, { pct: 40 }); ar(S, 'pr', [5.7, 2.35], [11.9, 2.35], 'accent', 1, { h: .08 }); T(S, 'prl', 6, 1.2, ['PR 리뷰 → 병합', 'PR review → merge'], 'opx-tiny opx-a', 1);
  rect(S, 'git', 12, 1.2, 6.6, 3.2, 'accent', 15, 0, { r: .3, css: 'border:.1em solid var(--accent)' }); T(S, 'gitl', 12.3, 1.35, ['Git 저장소', 'Git repository'], 'opx-xs opx-a', 0);
  T(S, 'r2', 12.4, 2.6, 'replicas: 2', 'cz-mono opx-xs', 0, { off: 1 }); T(S, 'r3', 12.4, 2.6, 'replicas: 3', 'cz-mono opx-xs opx-a', 1);
  frame(S, 'cl', 20.4, .8, 10.6, 9.4, 'ink-3', 0, { dash: 1, w: .1 }); T(S, 'cll', 20.7, .9, ['쿠버네티스 클러스터', 'Kubernetes cluster'], 'opx-tiny', 0);
  box2(S, 'ctl', 21, 1.8, 9.4, 1.6, ['GitOps 컨트롤러 (Argo CD)', 'GitOps controller (Argo CD)'], 'ok', 0, { pct: 30 });
  elb(S, 'pull', [[21, 2.6], [19.6, 2.6], [19.6, 3.4], [18.7, 3.4]], 'ok', 2, { h: .08, dash: 1 });
  ar(S, 'ap', [25.7, 3.5], [25.7, 5.4], 'ok', 2, { h: .08 }); T(S, 'apl', 26.1, 4.2, ['비교 → 적용', 'diff → apply'], 'opx-tiny opx-g', 2);
  for (let i = 0; i < 5; i++) { box2(S, 'p' + i, 21 + i * 1.9, 5.6, 1.7, 1.4, 'pod', i < 2 ? 'accent' : i === 2 ? 'ok' : 'danger', i < 2 ? 0 : i === 2 ? 2 : 3, { pct: 35, off: i > 2 ? 4 : 0 }); }
  T(S, 'dr', 21, 7.4, ['누가 kubectl로 5개로 바꿈 → 곧 3개로 되돌려요', 'someone kubectl-scales to 5 → reverted to 3'], 'opx-tiny opx-r', 3, { off: 4 });
  T(S, 'rb', 21, 7.4, ['롤백 = git revert 한 번', 'rollback = one git revert'], 'opx-tiny opx-a', 4);
  stepT(S, 'k', 1, 10.6, [['원하는 상태(매니페스트)를 Git에 두고 PR로만 바꿔요', 'desired state (manifests) lives in Git and changes only via PRs'], ['클러스터 안 컨트롤러가 Git을 당겨 와 실제 상태와 비교하고 맞춰요 (조정 루프)', 'a controller in the cluster pulls Git, diffs it with reality and converges (reconcile loop)'], ['손으로 바꾼 차이(드리프트)도 Git 기준으로 되돌려요 (자가 치유)', 'manual drift is reverted to what Git says (self-healing)'], ['CI가 클러스터 권한을 가질 필요가 없고, 모든 변경이 Git 이력에 남아요', 'CI needs no cluster credentials, and every change is in the Git history']], 'opx-xs opx-a');
  fin(S, 'z', 12, [['GitOps: Git을 단일 진실 공급원으로, 클러스터가 스스로 그 상태로 수렴하는 배포 방식', 'GitOps makes Git the single source of truth and lets the cluster converge to it on its own', 'opx-xs opx-a'], ['Argo CD, Flux가 대표 도구 · 쿠버네티스의 “선언하면 맞춰 준다”는 철학을 배포 전체로 넓혔어요', 'Argo CD and Flux are the main tools · it extends Kubernetes’ declarative reconcile idea to deployment']]);
  S.cap(1, 'Git에서 변경', 'Change it in Git').cap(2, '컨트롤러가 맞춰요', 'The controller converges').cap(3, '드리프트 되돌리기', 'Revert drift').cap(4, '롤백도 Git으로', 'Roll back with Git').cap(5, 'GitOps', 'GitOps');
  return S;
}
function s12f() {
  const S = scene({ id: 'op-12factor', steps: 5, per: 1.6 });
  const F = [['① 코드베이스 하나', '① one codebase'], ['② 의존성 명시', '② explicit deps'], ['③ 설정은 환경에', '③ config in env'], ['④ 백엔드 서비스 = 부착물', '④ backing services'], ['⑤ 빌드·릴리스·실행 분리', '⑤ build, release, run'], ['⑥ 무상태 프로세스', '⑥ stateless processes'], ['⑦ 포트 바인딩', '⑦ port binding'], ['⑧ 프로세스로 확장', '⑧ scale by processes'], ['⑨ 빠른 시작·종료', '⑨ disposability'], ['⑩ 개발·운영 일치', '⑩ dev/prod parity'], ['⑪ 로그 = 이벤트 스트림', '⑪ logs as streams'], ['⑫ 관리 작업도 같은 환경', '⑫ admin processes']];
  const HL = { 2: 3, 3: 3, 4: 2, 5: 4, 8: 4, 10: 4 };
  F.forEach((t, i) => { box2(S, 'f' + i, 1 + (i % 4) * 7.6, 1 + Math.floor(i / 4) * 1.6, 7.4, 1.35, t, 'line', 1, { pct: 40 }); if (HL[i]) tsets(S, 'f' + i, [[HL[i], 'accent', 35]]); });
  [['build', ['코드 → 이미지', 'code → image']], ['release', ['이미지 + 설정', 'image + config']], ['run', ['실행', 'run it']]].forEach(([k, t], i) => { box2(S, 'b' + i, 1 + i * 10.4, 6.2, 9, 1.5, [`${k}: ${t[0]}`, `${k}: ${t[1]}`], 'ok', 2, { pct: 30 }); if (i < 2) ar(S, 'ba' + i, [10.1 + i * 10.4, 6.95], [11.3 + i * 10.4, 6.95], 'ink-3', 2, { h: .08 }); });
  T(S, 'bn', 1, 7.9, ['같은 이미지를 스테이징·운영에 그대로 → 설정만 다르게', 'promote the same image to staging and production → only config differs'], 'opx-xs opx-g', 2);
  code(S, 'cb', 1, 9, 14.6, ['db = connect("10.0.0.5:5432",', '              "prod", "s3cr3t")'], [], { st: 3 }); T(S, 'cbx', 13.8, 9.15, '✗', 'opx-s opx-r', 3);
  code(S, 'cg', 16.4, 9, 14.6, ['db = connect(env.DATABASE_URL)', ['# 운영·테스트는 값만 바꿔요', '# swap values per environment']], [], { st: 3 }); T(S, 'cgx', 29.9, 9.15, '✓', 'opx-s opx-g', 3);
  T(S, 'k4', 1, 12.6, ['상태는 DB·캐시에, 로그는 stdout으로, 언제 죽여도 되게 → 컨테이너·쿠버네티스와 딱 맞아요', 'keep state in DBs and caches, log to stdout, be killable any time → a natural fit for containers and Kubernetes'], 'opx-xs opx-a', 4);
  fin(S, 'z', 14, [['12-Factor App: 클라우드에서 쉽게 배포·확장·운영하기 위한 앱 설계 원칙 12가지 (Heroku, 2011)', 'the Twelve-Factor App: twelve principles for apps that deploy, scale and operate easily in the cloud (Heroku, 2011)', 'opx-xs opx-a'], ['핵심은 코드와 설정의 분리, 무상태 프로세스, 환경 간 일치예요', 'the core ideas: separate code from config, stateless processes and environment parity']]);
  S.cap(1, '열두 가지 원칙', 'Twelve principles').cap(2, '빌드 · 릴리스 · 실행', 'Build, release, run').cap(3, '설정은 환경 변수로', 'Config in the environment').cap(4, '무상태와 로그', 'Statelessness and logs').cap(5, '12-Factor App', 'The Twelve-Factor App');
  return S;
}

/* ================= containers ================= */
function sMesh() {
  const S = scene({ id: 'op-mesh', steps: 5, per: 1.6 });
  const PX = [1, 11.6, 22.2];
  ['A', 'B', 'C'].forEach((n, i) => { const x = PX[i]; frame(S, 'pod' + n, x, 2, 8.8, 3.4, 'ink-3', 0, { w: .1, r: .3 }); T(S, 'pl' + n, x + .3, 2.1, ['파드 ' + n, 'pod ' + n], 'opx-tiny', 0); box2(S, 'app' + n, x + .4, 2.9, 4, 2, ['앱 ' + n, 'app ' + n], 'accent', 0, { pct: 30 }); box2(S, 'sc' + n, x + 4.6, 2.9, 3.8, 2, ['사이드카', 'sidecar'], 'warn', 2, { pct: 35 }); });
  [[0, 1], [1, 2]].forEach(([a, b], i) => { elb(S, 'd' + i, [[PX[a] + 2.4, 2.85], [PX[a] + 2.4, 1.3], [PX[b] + 2.4, 1.3], [PX[b] + 2.4, 2.85]], 'ink-3', 1, { h: .08, off: 2 }); });
  T(S, 'dn', 1, .2, ['앱끼리 직접 호출 · 재시도·TLS·타임아웃을 언어마다 라이브러리로 구현', 'apps call each other directly · retries, TLS and timeouts reimplemented per language'], 'opx-xs opx-r', 1, { off: 2 });
  [[0, 1], [1, 2]].forEach(([a, b], i) => elb(S, 's' + i, [[PX[a] + 6.5, 2.85], [PX[a] + 6.5, 1.3], [PX[b] + 6.5, 1.3], [PX[b] + 6.5, 2.85]], 'warn', 2, { h: .1 }));
  T(S, 'sn', 1, .2, ['모든 트래픽이 사이드카 프록시(Envoy)를 거쳐요 · 앱 코드는 그대로', 'all traffic flows through sidecar proxies (Envoy) · app code unchanged'], 'opx-xs opx-w', 2);
  box2(S, 'cp', 10.6, 6.8, 10.8, 1.6, ['컨트롤 플레인 (Istio, Linkerd)', 'control plane (Istio, Linkerd)'], 'ok', 3, { pct: 35 });
  ['A', 'B', 'C'].forEach((n, i) => seg(S, 'cl' + n, [16, 6.75], [PX[i] + 6.5, 4.95], 3, 'ok', .07, { dash: 1 }));
  [['mTLS', 'mTLS'], ['재시도·타임아웃', 'retries · timeouts'], ['서킷 브레이커', 'circuit breaking'], ['트래픽 90/10 분할', '90/10 traffic split'], ['메트릭·트레이스', 'metrics · traces']].forEach((t, i) => box2(S, 'f' + i, 1 + i * 6.05, 9.2, 5.85, 1.4, t, 'ok', 3, { pct: 25 }));
  T(S, 'k4', 1, 11.2, ['대가: 홉마다 지연이 조금 늘고 운영할 구성 요소가 많아져요 · 사이드카 없는 eBPF·ambient 방식도 나왔어요', 'costs: a little latency per hop and more moving parts · sidecar-less eBPF and ambient modes now exist'], 'opx-xs opx-r', 4);
  fin(S, 'z', 12.6, [['서비스 메시: 서비스 간 통신 기능(보안·신뢰성·관측)을 앱 밖의 프록시 계층으로 뽑아낸 것', 'a service mesh moves inter-service concerns (security, reliability, observability) into a proxy layer outside the app', 'opx-xs opx-a'], ['서비스가 수십 개 이상이고 언어가 섞였을 때 효과가 커요 · 작다면 라이브러리로 충분해요', 'it pays off with dozens of services in mixed languages · for a few, libraries are enough']]);
  S.cap(1, '앱끼리 직접 통신', 'Apps talk directly').cap(2, '사이드카 프록시', 'Sidecar proxies').cap(3, '컨트롤 플레인이 설정', 'The control plane configures').cap(4, '대가와 대안', 'Costs and alternatives').cap(5, '서비스 메시', 'Service mesh');
  return S;
}

/* ================= observability ================= */
function sChaos() {
  const S = scene({ id: 'op-chaos', steps: 5, per: 1.6 });
  for (let i = 0; i < 4; i++) box2(S, 'n' + i, 1 + i * 4.8, 1, 4.4, 1.4, ['인스턴스 ' + (i + 1), 'instance ' + (i + 1)], 'accent', 0, { pct: 30 });
  tsets(S, 'n1', [[2, 'danger', 35], [4, 'accent', 30]]); xm(S, 'kx', 7.6, 1.9, 2, { off: 4 }); T(S, 'kt', 1, 2.7, ['장애 주입: 인스턴스 2 강제 종료 (폭발 반경은 작게)', 'inject: kill instance 2 (keep the blast radius small)'], 'opx-xs opx-r', 2, { off: 4 });
  const X = t => 1.5 + t * 1.8, Y = v => 9.2 - v * .05;
  hl(S, 'ax', 1.5, 19.6, 9.4, 'ink-3', 0, { w: .06 }); seg(S, 'ay', [1.5, 3.8], [1.5, 9.4], 0, 'ink-3', .06); T(S, 'yl', 1.8, 3.6, ['p99 지연 (ms)', 'p99 latency (ms)'], 'opx-tiny', 0);
  seg(S, 'th', [1.5, Y(60)], [19.6, Y(60)], 1, 'danger', .07, { dash: 1 }); T(S, 'thl', 15.4, Y(60) - .8, ['SLO 300ms', 'SLO 300 ms'], 'cz-mono opx-tiny opx-r', 1);
  poly(S, 's1', [[X(0), Y(30)], [X(1), Y(32)], [X(2), Y(29)], [X(3), Y(31)], [X(4), Y(30)]], { st: 1, color: 'ok', h: .12 });
  poly(S, 's3', [[X(4), Y(30)], [X(5), Y(95)], [X(6), Y(88)], [X(7), Y(40)], [X(8), Y(31)], [X(10), Y(30)]], { st: 3, color: 'danger', h: .12, off: 4 });
  poly(S, 's4', [[X(4), Y(30)], [X(5), Y(45)], [X(6), Y(36)], [X(7), Y(31)], [X(10), Y(30)]], { st: 4, color: 'ok', h: .12 });
  T(S, 'ss', 21, 3.8, ['정상 상태: p99 150ms, 오류율 0.05%', 'steady: p99 150 ms, 0.05% errors'], 'opx-xs opx-g', 1);
  T(S, 'hy', 21, 5, ['가설: 하나가 죽어도 SLO 안', 'hypothesis: lose one, stay in SLO'], 'opx-xs opx-a', 2);
  T(S, 'f3', 21, 6.2, ['결과: 지연 급등 ✗', 'result: latency spikes ✗'], 'opx-xs opx-r', 3, { off: 4 }); T(S, 'f3b', 21, 7.2, ['헬스 체크가 늦고 재시도가 없었어요', 'slow health checks, no retries'], 'opx-xs opx-r', 3, { off: 4 });
  T(S, 'f4', 21, 6.2, ['고친 뒤 재실험: SLO 안 ✓', 'after the fix, rerun: within SLO ✓'], 'opx-xs opx-g', 4); T(S, 'f4b', 21, 7.2, ['게임 데이·자동화로 반복해요', 'repeat in game days, automate'], 'opx-xs opx-g', 4);
  fin(S, 'z', 10.8, [['카오스 엔지니어링: 일부러 작은 장애를 일으켜, 진짜 장애 전에 약점을 찾는 실험', 'chaos engineering injects small failures on purpose to find weaknesses before real outages do', 'opx-xs opx-a'], ['정상 상태 정의 → 가설 → 장애 주입 → 관찰 → 개선 · 폭발 반경을 작게 시작해 점점 넓혀요', 'define steady state → hypothesize → inject → observe → improve · start with a small blast radius'], ['넷플릭스 Chaos Monkey에서 시작 · 지연 주입, AZ 장애, 의존성 차단 등으로 확장', 'pioneered by Netflix’s Chaos Monkey · extended to latency, zone outages and dependency failures']]);
  S.cap(1, '정상 상태 정의', 'Define the steady state').cap(2, '가설과 장애 주입', 'Hypothesis and injection').cap(3, '약점 발견', 'A weakness found').cap(4, '고치고 다시 실험', 'Fix and rerun').cap(5, '카오스 엔지니어링', 'Chaos engineering');
  return S;
}
function sAlert() {
  const S = scene({ id: 'op-alert', steps: 5, per: 1.6 });
  T(S, 'nt', 1, .2, ['밤사이 알림 40개…', '40 alerts overnight…'], 'opx-xs opx-r', 1);
  [['CPU 82%', 'line'], ['disk 70%', 'line'], ['pod restart', 'line'], ['GC pause 400ms', 'line'], ['queue depth 1200', 'line'], ['5xx 증가', 'danger']].forEach(([t, c], i) => box2(S, 'a' + i, 1 + (i % 2) * 7, 1.2 + Math.floor(i / 2) * 1.5, 6.6, 1.25, i === 5 ? ['결제 오류 급증', 'checkout errors up'] : t, c, 1, { pct: 35 }));
  T(S, 'ft', 1, 5.8, ['대부분 할 일이 없어 무시 → 진짜도 놓쳐요', 'mostly nothing to do → real ones missed'], 'opx-xs opx-r', 1);
  box2(S, 'pg', 16.4, 1.2, 14.6, 1.6, ['호출(page): 사용자에게 영향 · 지금 행동', 'page: users affected · act now'], 'danger', 2, { pct: 30 });
  box2(S, 'tk', 16.4, 3.2, 14.6, 1.6, ['티켓: 근무 시간에 처리', 'ticket: handle in work hours'], 'warn', 2, { pct: 30 });
  box2(S, 'db', 16.4, 5.2, 14.6, 1.4, ['대시보드: 원인 조사용 지표', 'dashboard: metrics for diagnosis'], 'line', 2, { pct: 40 });
  tsets(S, 'a5', [[2, 'danger', 45]]); ['a0', 'a1', 'a2', 'a3', 'a4'].forEach(k => S.set(k, 2, { opacity: '.4' }));
  elb(S, 'r5', [[14.7, 4.85], [15.4, 4.85], [15.4, 2], [16.3, 2]], 'danger', 2, { h: .08 });
  T(S, 'sy', 16.4, 6.9, ['증상으로 호출, 원인 지표는 대시보드로', 'page on symptoms; causes go to dashboards'], 'opx-xs opx-a', 2);
  const X = t => 2 + t * 1.9, Y = v => 12.6 - v * .045;
  hl(S, 'bx', 2, 21, 12.6, 'ink-3', 3, { w: .06 }); T(S, 'byl', 1, 8, ['에러 예산 소진율', 'error-budget burn rate'], 'opx-tiny opx-a', 3);
  seg(S, 'b1', [2, Y(14 * 4)], [21, Y(14 * 4)], 3, 'danger', .07, { dash: 1 }); T(S, 'b1l', 21.4, Y(56) - .3, ['14배 · 1시간 창 → 호출', '14× over 1 h → page'], 'opx-tiny opx-r', 3);
  seg(S, 'b2', [2, Y(6 * 4)], [21, Y(24)], 3, 'warn', .07, { dash: 1 }); T(S, 'b2l', 21.4, Y(24) - .3, ['6배 · 6시간 창 → 티켓', '6× over 6 h → ticket'], 'opx-tiny opx-w', 3);
  poly(S, 'bc', [[X(0), Y(4)], [X(2), Y(6)], [X(4), Y(5)], [X(5), Y(30)], [X(6), Y(70)], [X(7), Y(64)], [X(8), Y(20)], [X(10), Y(6)]], { st: 3, color: 'accent', h: .12 });
  T(S, 'k4', 1, 13.2, ['알림마다 담당자 · 심각도 · 런북 링크 · “지금 무엇을 할지”가 있어야 해요 · 회고 때 알림도 점검', 'every alert needs an owner, a severity, a runbook link and a clear action · review alerts in postmortems'], 'opx-xs opx-a', 4);
  fin(S, 'z', 14.6, [['좋은 알림: 드물고, 사용자 영향과 직결되고, 받는 즉시 할 일이 분명해요', 'good alerts are rare, tied to user impact and immediately actionable', 'opx-xs opx-a'], ['SLO 소진율 기반 다중 창 알림이 노이즈를 줄이고 큰 장애는 빨리 잡아요 (Google SRE)', 'multi-window SLO burn-rate alerts cut noise while catching big incidents fast (Google SRE)']]);
  S.cap(1, '알림 피로', 'Alert fatigue').cap(2, '증상으로 호출', 'Page on symptoms').cap(3, '에러 예산 소진율', 'Error-budget burn rate').cap(4, '행동할 수 있는 알림', 'Actionable alerts').cap(5, '알림 설계', 'Alert design');
  return S;
}

return { css: CSSX, secs: [], add: {
  'op-git': [
    item('op-bisect', 'git bisect', 'git bisect', '잘 되던 커밋과 망가진 커밋 사이를 이진 탐색해, 버그를 들여온 커밋을 찾아 주는 Git 기능이에요.', 'c1은 좋고 c16은 나쁘면 가운데 c8을 시험하고, 결과에 따라 남은 범위를 반씩 좁혀 4번 만에 범인 c11을 찾아요. 커밋 1,000개도 약 10번이면 끝나고(log₂ n), git bisect run에 테스트 스크립트를 주면 완전히 자동으로 돌아요. 작은 커밋을 자주 남겨야 찾아낸 커밋도 작아서 원인이 바로 보여요.', 'A Git feature that binary-searches between a known-good and a known-bad commit to find the one that introduced a bug.', 'With c1 good and c16 bad, test the middle c8 and halve the remaining range on each result, pinning the culprit c11 in four tests. Even 1,000 commits take about 10 tests (log₂ n), and git bisect run with a test script automates the whole search. Small, frequent commits keep the culprit small so the cause is obvious.', sBisect()),
    item('op-undo', 'Git에서 되돌리기', 'Undoing things in Git', '이미 공유한 커밋은 revert로 “취소 커밋”을 새로 만들고, 내 로컬 커밋은 reset으로 브랜치 포인터를 옮겨요. 실수해도 reflog로 되살려요.', 'revert는 D를 취소하는 D′를 추가해 히스토리를 그대로 두므로 공유 브랜치에 안전해요. reset --hard C는 main을 C로 옮겨 D가 사라진 것처럼 보이는데, 이미 푸시했다면 다른 사람의 히스토리와 꼬여요. 실수로 지웠어도 reflog에 HEAD가 지나간 자리가 약 90일간 남아 git reset --hard HEAD@{1}로 복구할 수 있어요. 파일 하나는 git restore, 마지막 커밋 수정은 --amend를 써요.', 'Undo shared commits with revert, which adds an undo commit; move a local branch pointer with reset; and recover mistakes with the reflog.', 'revert adds D′ undoing D while keeping history intact, so it is safe on shared branches. reset --hard C moves main back to C and D seems to vanish, which tangles others’ history if it was already pushed. Even then, the reflog keeps where HEAD has been for about 90 days, so git reset --hard HEAD@{1} brings it back. Use git restore for a single file and --amend for the last commit.', sUndo())
  ],
  'op-delivery': [
    item('op-gitops', 'GitOps', 'GitOps', 'Git에 둔 원하는 상태를 클러스터 안의 컨트롤러가 스스로 당겨 와 맞추는 배포 방식이에요. 모든 변경은 PR로, 롤백은 git revert로 해요.', '개발자가 replicas를 2에서 3으로 바꾸는 PR을 병합하면, Argo CD 같은 컨트롤러가 Git과 실제 상태를 비교해 파드를 3개로 맞춰요. 누가 kubectl로 손수 5개로 바꿔도 Git 기준으로 되돌리는 자가 치유가 일어나요. CI가 클러스터 권한을 가질 필요가 없고 모든 변경이 Git 이력과 리뷰로 남아요. Argo CD와 Flux가 대표 도구예요.', 'A deployment approach where a controller inside the cluster pulls the desired state from Git and converges to it; changes go through PRs and rollbacks are git reverts.', 'When a developer merges a PR changing replicas from 2 to 3, a controller such as Argo CD diffs Git against the live state and scales to three pods. If someone hand-edits it to five with kubectl, the controller self-heals back to what Git says. CI needs no cluster credentials, and every change stays in Git history and review. Argo CD and Flux are the main tools.', sGitops()),
    item('op-12factor', '12-Factor App', 'The Twelve-Factor App', '클라우드에서 쉽게 배포·확장·운영할 수 있는 앱을 만들기 위한 12가지 설계 원칙이에요 (Heroku, 2011).', '핵심은 빌드(코드 → 이미지)·릴리스(이미지 + 설정)·실행의 분리로, 같은 이미지를 스테이징과 운영에 그대로 올리고 설정만 환경 변수로 바꿔요. DB 주소·비밀번호를 코드에 박지 않고 DATABASE_URL처럼 주입하며, 백엔드 서비스는 갈아 끼울 수 있는 부착물로 다뤄요. 프로세스는 무상태로 두고 상태는 DB·캐시에, 로그는 stdout으로 흘려보내고, 언제 죽여도 빠르게 다시 뜨게 만들어 컨테이너·쿠버네티스와 잘 맞아요.', 'Twelve design principles for apps that deploy, scale and operate easily in the cloud (Heroku, 2011).', 'The heart is separating build (code → image), release (image + config) and run, so one image is promoted to staging and production with only environment variables changing. Database addresses and passwords are injected, e.g. DATABASE_URL, rather than hard-coded, and backing services are swappable attached resources. Processes stay stateless with state in databases and caches, logs stream to stdout, and instances start and stop fast, a natural fit for containers and Kubernetes.', s12f())
  ],
  'op-k8s-sec': [
    item('op-mesh', '서비스 메시', 'Service mesh', '서비스 사이 통신에 필요한 보안·신뢰성·관측 기능을 각 파드 옆의 사이드카 프록시로 뽑아내, 앱 코드를 바꾸지 않고 제공하는 인프라 계층이에요.', '서비스끼리 직접 호출하면 재시도, TLS, 타임아웃을 언어마다 라이브러리로 다시 구현해야 해요. 서비스 메시는 모든 트래픽이 Envoy 같은 사이드카를 거치게 하고, Istio·Linkerd의 컨트롤 플레인이 mTLS, 재시도·타임아웃, 서킷 브레이커, 90/10 트래픽 분할, 메트릭·트레이스를 설정해요. 대신 홉마다 지연이 늘고 구성 요소가 많아져서, 서비스가 많고 언어가 섞였을 때 효과가 커요. 사이드카 없는 eBPF·ambient 방식도 나왔어요.', 'An infrastructure layer that moves inter-service security, reliability and observability into sidecar proxies beside each pod, without changing app code.', 'When services call each other directly, retries, TLS and timeouts get reimplemented per language. A mesh routes all traffic through sidecars such as Envoy, and a control plane like Istio or Linkerd configures mTLS, retries and timeouts, circuit breaking, 90/10 traffic splits and metrics and traces. It adds a little latency per hop and more moving parts, so it pays off with many services in mixed languages; sidecar-less eBPF and ambient modes have also appeared.', sMesh())
  ],
  'op-obs': [
    item('op-chaos', '카오스 엔지니어링', 'Chaos engineering', '운영 환경과 비슷한 곳에 일부러 작은 장애를 일으켜, 진짜 장애가 나기 전에 시스템의 약점을 찾는 실험이에요.', '먼저 정상 상태(p99 지연, 오류율)를 정의하고 “인스턴스 하나가 죽어도 SLO 안”이라는 가설을 세운 뒤, 폭발 반경을 작게 해 인스턴스를 강제 종료해요. 지연이 급등하면 느린 헬스 체크나 재시도 부재 같은 약점이 드러난 것이니 고치고 다시 실험해요. 넷플릭스 Chaos Monkey에서 시작해 지연 주입, 가용 영역 장애, 의존성 차단으로 넓어졌고, 게임 데이와 자동화로 반복해요.', 'Deliberately injecting small failures into production-like systems to find weaknesses before real outages do.', 'Define the steady state (p99 latency, error rate), hypothesize that losing one instance stays within the SLO, then kill an instance with a small blast radius. A latency spike exposes weaknesses such as slow health checks or missing retries, which you fix and test again. It began with Netflix’s Chaos Monkey and grew to latency injection, zone outages and dependency failures, repeated through game days and automation.', sChaos()),
    item('op-alert', '알림 설계', 'Alert design', '사람을 깨우는 알림은 드물고, 사용자 영향과 직결되고, 받는 즉시 할 일이 분명해야 해요. 그렇지 않으면 알림 피로로 진짜 알림을 놓쳐요.', 'CPU 82%, 디스크 70% 같은 원인 지표로 호출하면 대부분 행동할 게 없어 무시되고 결국 결제 오류 급증 같은 진짜 신호도 묻혀요. 사용자 영향(증상)으로만 호출하고, 급하지 않은 것은 티켓, 원인 지표는 대시보드로 보내요. SLO 에러 예산 소진율로 1시간 창에서 14배면 호출, 6시간 창에서 6배면 티켓처럼 다중 창 알림을 쓰면 노이즈는 줄고 큰 장애는 빨리 잡아요. 알림마다 담당자, 심각도, 런북 링크가 있어야 해요.', 'Alerts that wake people should be rare, tied to user impact and immediately actionable; otherwise alert fatigue buries the real ones.', 'Paging on causes like CPU at 82% or disk at 70% mostly produces nothing to do, so people ignore pages and miss real signals such as a spike in checkout errors. Page only on symptoms (user impact), send non-urgent issues to tickets and causes to dashboards. Multi-window SLO burn-rate alerts, e.g. page at 14× over one hour and ticket at 6× over six hours, cut noise while catching big incidents fast. Every alert needs an owner, a severity and a runbook link.', sAlert())
  ]
} };
})();

window.UX = page([
  sec('op-git', 'Git', 'Git', 'Git과 버전 관리', 'Git and version control',
    '변경 이력을 남기고, 갈라서 작업하고, 다시 합치는 방법이에요.', 'Recording history, branching off and merging back.', [
    item('op-commit', '커밋과 스테이징', 'Commits and staging', '고친 파일 중 이번에 묶을 것만 스테이징(add)하고, 그 묶음을 하나의 스냅샷으로 커밋해요.', '한 커밋엔 한 가지 의도만 담으세요. git add -p로 파일 일부만 골라 담을 수 있어요. 메시지는 무엇을, 왜 바꿨는지.', 'Stage (add) just the changes you want to group, then commit them as one snapshot.', 'Keep one intent per commit; git add -p stages parts of a file. Messages should say what changed and why.', sCommit()),
    item('op-branch', '브랜치와 머지', 'Branches and merges', '브랜치는 커밋을 가리키는 이름표예요. 따로 작업한 갈래를 머지하면 두 히스토리가 합쳐져요.', 'main은 항상 배포 가능하게 두고, 작업은 짧게 사는 브랜치에서 하세요. 갈라진 적이 없으면 fast-forward로 이름표만 옮겨요.', 'A branch is a movable label on a commit; merging joins two lines of history.', 'Keep main always deployable and work on short-lived branches; if main hasn’t moved, git simply fast-forwards.', sBranch()),
    item('op-rebase', '리베이스', 'Rebase', '내 브랜치의 커밋들을 다른 브랜치의 최신 커밋 뒤에 다시 적용해 히스토리를 한 줄로 만들어요.', '커밋 해시가 바뀌므로 이미 공유한 브랜치에는 쓰지 마세요. 내 로컬 브랜치를 최신 main에 맞출 때 유용해요.', 'Replays your branch’s commits on top of another branch’s latest commit, producing a straight history.', 'It rewrites commit hashes, so never rebase shared branches; great for updating your own branch onto the latest main.', sRebase()),
    item('op-conflict', '머지 충돌', 'Merge conflicts', '두 브랜치가 같은 부분을 다르게 바꾸면 git이 자동으로 합치지 못하고 충돌 표시를 남겨요.', '표시(<<<<<<<, =======, >>>>>>>)를 지우고 올바른 결과를 직접 정한 뒤 커밋해요. 자주 머지할수록 충돌이 작아요.', 'When two branches change the same lines differently, git can’t merge automatically and leaves conflict markers.', 'Remove the markers, decide the correct result yourself, then commit; merging often keeps conflicts small.', sConflict()),
    item('op-flow', '브랜치 전략', 'Branching strategies', 'Git Flow는 main·develop·release 등 오래 사는 브랜치를 역할별로 두고, 트렁크 기반은 main 하나에 짧은 브랜치를 자주 합쳐요.', '여러 버전을 동시에 유지하는 제품은 Git Flow가, 매일 배포하는 웹 서비스는 트렁크 기반 + 기능 플래그가 잘 맞아요.', 'Git Flow keeps long-lived branches per role (main, develop, release); trunk-based development merges short branches into one main frequently.', 'Products maintaining several versions suit Git Flow; web services deploying daily suit trunk-based plus feature flags.', sFlow())
  ].concat(XT.add['op-git'] || [])),
  sec('op-delivery', 'CI/CD', 'CI/CD', 'CI/CD와 인프라', 'CI/CD and infrastructure',
    '코드를 자동으로 검증하고 안전하게 내보내는 파이프라인이에요.', 'Pipelines that verify code automatically and ship it safely.', [
    item('op-ci', '지속적 통합 (CI)', 'Continuous integration', '푸시할 때마다 빌드·테스트·린트·보안 검사를 자동으로 돌려, 깨진 코드가 main에 들어오지 못하게 해요.', 'GitHub Actions, GitLab CI, Jenkins가 대표적이에요. 파이프라인은 10분 안쪽으로 빠르게, 실패하면 머지를 막도록 설정하세요.', 'Every push runs build, tests, lint and security checks automatically so broken code never reaches main.', 'GitHub Actions, GitLab CI and Jenkins are common; keep pipelines under about 10 minutes and make failures block merges.', sCI()),
    item('op-cd', '지속적 전달·배포 (CD)', 'Continuous delivery and deployment', '검증된 결과물을 개발 → 스테이징 → 프로덕션으로 옮겨요. 마지막 승인을 사람이 하면 전달, 자동이면 배포예요.', '환경마다 다시 빌드하지 말고 같은 이미지를 설정만 바꿔 쓰세요. 배포가 잦을수록 한 번의 위험은 작아져요.', 'Verified artifacts move from dev to staging to production; a human final approval is delivery, fully automatic is deployment.', 'Build once and promote the same image with different config; frequent releases make each one less risky.', sCD()),
    item('op-iac', '코드형 인프라 (IaC)', 'Infrastructure as code', '서버·네트워크·DB 같은 인프라를 코드로 선언하고, 도구가 실제 상태와 비교해 차이만큼 만들거나 고쳐요.', 'Terraform, Pulumi, CloudFormation이 대표적이에요. 콘솔에서 손으로 바꾸면 코드와 어긋나는 드리프트가 생기니 피하세요.', 'Declare servers, networks and databases in code; the tool compares it with reality and applies just the difference.', 'Terraform, Pulumi and CloudFormation are typical; avoid manual console edits, which cause drift from the code.', sIaC()),
    item('op-flag', '기능 플래그', 'Feature flags', '코드는 배포해 두고, 기능을 켤지 말지와 대상 비율을 설정으로 바꿔요. 배포와 출시를 분리해요.', '점진 출시, A/B 테스트, 장애 시 킬 스위치로 써요. LaunchDarkly, Unleash 등이 있고, 다 쓴 플래그는 꼭 코드에서 지우세요.', 'Ship the code dark and toggle who sees a feature through configuration, separating deploy from release.', 'Use them for gradual rollouts, A/B tests and kill switches (LaunchDarkly, Unleash); remove stale flags from the code.', sFlag()),
    item('op-cloud', 'IaaS · PaaS · SaaS', 'IaaS · PaaS · SaaS', '클라우드가 어디까지 관리해 주는지에 따라 나뉘어요. IaaS는 가상 서버, PaaS는 코드 실행 환경, SaaS는 완성된 서비스예요.', '직접 관리할수록 자유도가 높고 운영 부담도 커요. 서버리스(Lambda)는 PaaS보다 한 단계 더 맡기는 형태예요.', 'Cloud models differ by how much the provider runs: IaaS gives virtual machines, PaaS a place to run code, SaaS finished software.', 'More control means more operational work; serverless functions (Lambda) hand off even more than PaaS.', sCloud())
  ].concat(XT.add['op-delivery'] || [])),
  sec('op-k8s-sec', '컨테이너', 'Containers', '컨테이너와 쿠버네티스', 'Containers and Kubernetes',
    '어디서나 똑같이 실행되는 패키지와, 그걸 여러 대에서 굴리는 방법이에요.', 'Packages that run the same everywhere, and running them across many machines.', [
    item('op-image', '컨테이너 이미지와 레이어', 'Container images and layers', 'Dockerfile의 명령마다 레이어가 쌓여 이미지가 돼요. 바뀌지 않은 레이어는 캐시로 재사용해요.', '의존성 설치를 소스 복사보다 먼저 두면 빌드가 빨라요. 작은 베이스 이미지(alpine, distroless)와 멀티 스테이지 빌드로 크기를 줄여요.', 'Each Dockerfile instruction adds a layer to the image, and unchanged layers are reused from cache.', 'Install dependencies before copying source for faster builds; slim base images and multi-stage builds cut size.', sImage()),
    item('op-k8s', '쿠버네티스', 'Kubernetes', '원하는 상태(파드 몇 개, 어떤 이미지)를 선언하면 컨트롤 플레인이 노드에 배치하고, 어긋나면 계속 되돌려요.', '파드가 죽거나 노드가 사라져도 자동으로 복구해요. 작은 서비스라면 관리형(EKS, GKE)이나 더 단순한 PaaS도 고려하세요.', 'Declare the desired state (how many pods, which image) and the control plane schedules them and keeps reconciling.', 'It heals dead pods and lost nodes automatically; for small services, consider managed clusters (EKS, GKE) or a simpler PaaS.', sK8s()),
    item('op-hpa', '오토스케일링', 'Autoscaling', 'CPU·요청 수 같은 지표가 목표를 넘으면 파드를 늘리고, 줄면 다시 줄여요(HPA).', '최소·최대 개수를 꼭 정하세요. 너무 자주 오르내리지 않게 안정화 시간을 둬요. 노드가 부족하면 클러스터 오토스케일러가 노드를 추가해요.', 'When a metric such as CPU or request rate exceeds its target, pods are added, and removed again as it drops (HPA).', 'Always set minimum and maximum counts and a stabilization window; the cluster autoscaler adds nodes when they run out.', sHPA()),
    item('op-svc', '서비스와 인그레스', 'Services and Ingress', '서비스는 계속 바뀌는 파드들에 고정된 이름과 내부 로드 밸런싱을 주고, 인그레스는 외부 요청을 경로별로 서비스에 나눠 줘요.', '서비스끼리는 http://서비스이름 으로 불러요. 인그레스에서 TLS 인증서와 도메인·경로 라우팅을 관리해요.', 'A Service gives ever-changing pods a stable name and internal load balancing; an Ingress routes outside requests to services by path.', 'Services call each other by name (http://service-name); TLS certificates and host/path routing live in the Ingress.', sSvc()),
    item('op-probe', '헬스 체크 (프로브)', 'Health probes', 'readiness는 트래픽을 받을 준비가 됐는지, liveness는 프로세스가 살아 있는지 확인해요. 실패하면 트래픽을 빼거나 재시작해요.', 'readiness에 DB 같은 외부 의존을 넣으면 DB 장애 때 전부 빠질 수 있어요. 느린 앱은 startup 프로브로 시작 시간을 따로 줘요.', 'Readiness checks whether a pod can take traffic; liveness checks whether it’s still alive. Failures remove traffic or trigger a restart.', 'Putting external dependencies like the DB in readiness can pull every pod at once; give slow apps a separate startup probe.', sProbe())
  ].concat(XT.add['op-k8s-sec'] || [])),
  sec('op-release', '배포 전략', 'Releases', '배포 전략', 'Release strategies',
    '새 버전을 사용자에게 안전하게 내보내는 방법이에요.', 'Ways to put a new version in front of users safely.', [
    item('op-rolling', '롤링 업데이트', 'Rolling update', '파드를 하나씩 새 버전으로 교체해 중단 없이 배포해요.', '쿠버네티스 기본 방식이에요. 중간엔 두 버전이 함께 돌아서 API와 DB 스키마가 양쪽과 호환돼야 해요.', 'Replaces pods with the new version one at a time, with no downtime.', 'The Kubernetes default; both versions run together mid-rollout, so APIs and schemas must work with both.', sRolling()),
    item('op-bluegreen', '블루그린 배포', 'Blue-green deployment', '운영 환경(blue) 옆에 같은 환경(green)을 만들어 새 버전을 올리고, 검증 후 트래픽을 한 번에 전환해요.', '롤백이 라우터 전환 한 번이라 빨라요. 대신 인프라가 두 배 필요하고, DB 마이그레이션은 양쪽과 호환되게 해야 해요.', 'Run an identical green environment beside live blue, deploy there, verify, then switch all traffic at once.', 'Rollback is one router flip, but you need double infrastructure and backward-compatible database migrations.', sBlueGreen()),
    item('op-canary', '카나리 배포', 'Canary release', '새 버전에 트래픽 일부(예: 5%)만 보내 지표를 비교하고, 괜찮으면 비율을 점점 늘려요.', '문제가 생겨도 일부 사용자만 영향을 받아요. 비교할 지표(오류율, 지연)를 미리 정하고 자동 롤백을 걸어 두세요(Argo Rollouts, Flagger).', 'Send a small share of traffic (say 5%) to the new version, compare metrics, then increase the share step by step.', 'Problems only reach a few users; define the metrics (error rate, latency) up front and automate rollback (Argo Rollouts, Flagger).', sCanary())
  ].concat(XT.add['op-release'] || [])),
  sec('op-obs', '관측성', 'Observability', '관측성과 운영', 'Observability and operations',
    '시스템이 지금 어떤 상태인지 알고, 문제가 생기면 빨리 고치는 방법이에요.', 'Knowing what a system is doing, and fixing it fast when it misbehaves.', [
    item('op-pillars', '로그 · 메트릭 · 트레이스', 'Logs, metrics, traces', '로그는 개별 사건 기록, 메트릭은 숫자 추세, 트레이스는 한 요청이 거쳐 간 경로와 시간이에요.', '로그는 JSON 같은 구조화된 형식으로 남기세요. 메트릭으로 알림을 걸고, 트레이스로 위치를 찾고, 로그로 원인을 봐요.', 'Logs record individual events, metrics track numeric trends, and traces show one request’s path and timing.', 'Write structured (JSON) logs; alert on metrics, locate with traces and explain with logs.', sPillars()),
    item('op-trace', '분산 트레이싱', 'Distributed tracing', '요청에 trace ID를 붙여 서비스마다 전달하고, 각 구간(span)의 시간을 모아 폭포수 그림으로 보여 줘요.', 'OpenTelemetry로 수집해 Jaeger, Tempo, Datadog 등으로 봐요. trace ID를 로그에도 남기면 바로 이어서 찾을 수 있어요.', 'A trace ID travels with each request across services, and the timing of every span is collected into a waterfall view.', 'Collect with OpenTelemetry and view in Jaeger, Tempo or Datadog; logging the trace ID ties logs to traces.', sTrace()),
    item('op-percentile', '지연 백분위수 (p50 · p99)', 'Latency percentiles (p50 · p99)', '응답 시간을 정렬했을 때 50%, 99% 위치의 값이에요. 평균은 느린 꼬리를 가려요.', '목표와 알림은 p95·p99로 잡아요. 페이지 하나가 요청 수십 개를 부르면 대부분의 사용자가 p99를 겪어요.', 'The values at the 50th and 99th positions of sorted response times; averages hide the slow tail.', 'Set targets and alerts on p95/p99; when a page makes dozens of calls, most users hit the p99.', sPct()),
    item('op-slo', 'SLI · SLO · 에러 예산', 'SLI, SLO and error budgets', 'SLI는 사용자 경험을 재는 지표, SLO는 그 목표치, 에러 예산은 목표가 허용하는 실패량이에요.', '예산이 남으면 과감하게 출시하고, 바닥나면 안정화를 우선해요. 99.9%는 한 달에 약 43분, 99.99%는 약 4분이에요.', 'An SLI measures user experience, an SLO is its target, and the error budget is the failure the target allows.', 'Ship boldly while budget remains and prioritize reliability when it runs out; 99.9% is about 43 minutes a month, 99.99% about 4.', sSLO()),
    item('op-incident', '장애 대응과 회고', 'Incident response and postmortems', '감지 → 분류·선언 → 완화 → 복구 → 회고 순서로 움직여요. 원인 분석보다 피해를 먼저 멈춰요.', '대응 책임자와 소통 채널을 정해 두세요. 회고는 비난 없이(blameless) 시스템과 절차를 고치는 데 집중해요.', 'Move through detect, triage, mitigate, resolve and review; stop the damage before hunting for root cause.', 'Name an incident lead and a comms channel up front; run blameless postmortems that fix systems and processes.', sIncident())
  ].concat(XT.add['op-obs'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.op-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.op-p .in{font-family:inherit;font-size:.72em;font-weight:700;line-height:1.25;text-align:center}
.op-code{place-items:center start!important;padding-left:.7em}
.op-code .in{font-family:var(--f-mono);font-size:.58em;font-weight:600;line-height:1.35}
.op-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.op-l .in{font-size:.9em;color:var(--ink);font-weight:700}
.op-xs .in{font-size:.55em;font-weight:700}
.op-xs2 .in{font-size:.62em}
.op-r .in{color:var(--danger);font-weight:800}
.op-g .in{color:var(--ok);font-weight:800}
.op-a .in{color:var(--accent);font-weight:800}
.op-w .in{color:var(--warn);font-weight:800}
.op-big .in{font-size:1.5em;font-weight:900;color:var(--ink)}`;
})();
