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
  arrow(S, 'ca', 9.6, 2.6, 16.6, 8.2, {}); text(S, 'cat', 12.8, 3.1, 'http://api-svc', { cls: 'cz-t cz-mono' });
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
  [['GET /checkout', 0, 8.4, C.soft], ['auth', 0, 2.2, C.soft], ['db', 2.4, 4.0, C.soft], ['payment', 4.2, 8.2, C.bad]].forEach(([l, a, b, st], i) => hbar(S, 't' + i, 22.3 + a, 3.6 + i * 2.6, b - a, 2, st, 3, l));
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


/* ===== shared helpers for language / framework pages ===== */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'opx-xs opx-wr', i + 1, { off: i + 2, w: 30.4 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono opx-code ' + (o.cls || ''), st, { off }));
const CLS = { a: 'opx-a', g: 'opx-g', r: 'opx-r', w: 'opx-w', m: 'cz-mono', s: 'opx-s' };
const clsOf = c => (c || '').split(' ').filter(Boolean).map(t => CLS[t] || t).join(' ');
/* panel of text lines: lines = [[text, 'a m', {w, x, dy}], ...] shown from st until off */
const lines = (S, k, x, y, list, st, off, o = {}) => { let yy = y; list.forEach((ln, i) => { if (!ln) { yy += (o.gap || .5); return; } const [t, c, p = {}] = ln; T(S, k + i, x + (p.x || 0), yy + (p.dy || 0), t, (/\bs\b/.test(c || '') ? '' : 'opx-xs ') + clsOf(c), st, { off, w: p.w || o.w }); yy += (p.lh || o.lh || 1.1); }); };
/* code-walk scene: a code panel whose lines light up step by step, with a side panel per step */
function CW(id, o) {
  const S = scene({ id, steps: 5, per: o.per || 1.7 });
  const lh = o.lh || 1.12, cx = o.cx ?? .6, cy = o.cy ?? .4, cw = o.cw ?? 17.4, code = o.code || [];
  if (code.length) {
    rect(S, 'cbg', cx, cy, cw, code.length * lh + .6, 'ink', 6, o.cst || 0, { r: .4, off: o.coff });
    if (o.file) T(S, 'cfn', cx + cw - 6.2, cy - .05, o.file, 'cz-mono opx-tiny', o.cst || 0, { w: 6, css: 'text-align:right', off: o.coff });
    code.forEach((t, i) => T(S, 'cl' + i, cx + .4, cy + .3 + i * lh, t, 'cz-mono opx-cw', o.cst || 0, { off: o.coff }));
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
const lbl = (S, k, x, y, t, c, st, o = {}) => T(S, k, x, y, t, (/\bs\b/.test(c || '') ? '' : 'opx-xs ') + clsOf(c) + (o.w ? ' opx-wr' : ''), st, o);
const arw = (S, k, a, b, st, o = {}) => ar(S, k, a, b, o.color || 'ink-2', st, { h: o.h || .1, off: o.off, dash: o.dash });

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
.opx-cw .in{font-size:.6em;white-space:pre;color:var(--ink);font-weight:600}
.opx-wr .in{white-space:normal!important}
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
  tsets(S, 'n1', [[2, 'danger', 35], [4, 'accent', 30]]); xm(S, 'kx', 10.0, 1.15, 2, { off: 4 }); T(S, 'kt', 1, 2.7, ['장애 주입: 인스턴스 2 강제 종료 (폭발 반경은 작게)', 'inject: kill instance 2 (keep the blast radius small)'], 'opx-xs opx-r', 2, { off: 4 });
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

/* ================= split-out cards ================= */
function sIngress() {
  const S = scene({ id: 'op-ingress', steps: 5, per: 1.7 });
  const SV = [['web-svc', 2.0], ['api-svc', 7.6], ['admin-svc', 13.2]];
  SV.forEach(([n, x], i) => { box2(S, 's' + i, x, 8.6, 4.8, 1.3, n, 'ok', 0, { pct: 24 }); for (let j = 0; j < 2; j++) cell(S, `p${i}${j}`, x + .3 + j * 2.2, 10.6, 2.0, 1.0, 'pod', 'line', 12, 0); seg(S, `pl${i}`, [x + 2.4, 9.9], [x + 2.4, 10.6], 0, 'ink-3', .06); });
  SV.forEach(([n, x], i) => { box2(S, 'lb' + i, x, 4.6, 4.8, 1.3, ['LB ' + (i + 1), 'LB ' + (i + 1)], 'warn', 0, { pct: 24, off: 2 }); ar(S, 'la' + i, [x + 2.4, 5.9], [x + 2.4, 8.6], 'warn', 0, { h: .1, off: 2 }); ar(S, 'li' + i, [x + 2.4, 2.6], [x + 2.4, 4.6], 'ink-3', 0, { h: .1, off: 2 }); });
  T(S, 'cost', 1, .6, ['서비스마다 외부 로드 밸런서 · IP와 비용이 서비스 수만큼', 'one external load balancer per service · IPs and cost multiply'], 'opx-xs opx-r', 1, { off: 2 });
  box2(S, 'one', 2.0, 1.2, 16.0, 1.3, ['외부 LB 하나', 'one external LB'], 'warn', 2, { pct: 24 });
  box2(S, 'ic', 2.0, 4.6, 16.0, 1.3, ['인그레스 컨트롤러 (nginx · Envoy · Traefik)', 'ingress controller (nginx · Envoy · Traefik)'], 'accent', 2, { pct: 26 });
  ar(S, 'oi', [10.0, 2.5], [10.0, 4.6], 'ink-2', 2, { h: .1 }); SV.forEach(([n, x], i) => ar(S, 'ia' + i, [x + 2.4, 5.9], [x + 2.4, 8.6], 'accent', 2, { h: .1 }));
  const R = 19.6;
  rect(S, 'ybg', R - .4, .4, 12.2, 6.8, 'ink', 6, 2, { r: .4, off: 4 });
  codeLines(S, 'y', R, .6, ['rules:', '- host: shop.example.com', '  paths:', '  - /api → api-svc:80', '  - /    → web-svc:80', '- host: admin.example.com', '  paths:', '  - /    → admin-svc:80'], 2, 4, { lh: .8 });
  T(S, 'yn', R - .4, 7.6, ['호스트와 경로로 서비스에 나눠 줘요', 'route to services by host and path'], 'opx-xs opx-g', 2, { off: 3 });
  T(S, 'tl', R - .4, 7.6, ['TLS는 인그레스에서 종료', 'TLS terminates at the ingress'], 'opx-xs opx-a', 3, { off: 4 });
  T(S, 'tl2', R - .4, 8.7, ['cert-manager가 Let’s Encrypt 인증서를 자동 갱신', 'cert-manager renews Let’s Encrypt certificates'], 'opx-xs', 3, { off: 4, w: 12.2 });
  T(S, 'tl3', R - .4, 9.8, ['재작성·레이트 리밋·인증도 여기서', 'rewrites, rate limits and auth live here too'], 'opx-xs', 3, { off: 4 });
  T(S, 'tlk', 7.4, 3.0, 'HTTPS', 'cz-mono opx-xs opx-g', 3, { off: 4 }); T(S, 'tlk2', 10.6, 6.6, 'HTTP', 'cz-mono opx-xs', 3, { off: 4 });
  T(S, 'g0', R - .4, .6, ['다음 세대: Gateway API', 'next generation: Gateway API'], 'opx-xs opx-a', 4);
  [['GatewayClass', ['어떤 구현을 쓸지', 'which implementation']], ['Gateway', ['인프라팀: 입구와 인증서', 'infra team: listeners and certs']], ['HTTPRoute', ['앱팀: 경로 규칙', 'app team: route rules']]].forEach(([a, b], i) => { cell(S, 'g' + (i + 1), R - .4, 1.8 + i * 1.6, 5.0, 1.2, a, 'accent', 22, 4); T(S, 'gt' + i, R + 4.9, 1.9 + i * 1.6, b, 'opx-xs', 4); });
  T(S, 'g4', R - .4, 6.8, ['헤더 매칭, 가중치 분할(카나리 90/10)도 표준으로', 'header matching and weighted splits (canary 90/10) are standard'], 'opx-xs opx-g', 4, { w: 12.2 });
  notesSplit(S, 'k', 15.6, [['서비스마다 외부 로드 밸런서를 두면 IP, 인증서, 비용이 서비스 수만큼 늘어나요', 'giving every service its own external load balancer multiplies IPs, certificates and cost'], ['인그레스는 입구를 하나로 모으고, 호스트·경로 규칙에 따라 안쪽 서비스로 나눠 줘요', 'an ingress gathers traffic at one entrance and routes it to services by host and path'], ['HTTPS는 인그레스에서 풀고 인증서는 자동으로 갱신해요 · 재작성, 레이트 리밋, 인증도 여기서 걸어요', 'HTTPS terminates at the ingress with automatically renewed certificates, and rewrites, rate limits and auth attach there too'], ['Gateway API는 인프라팀과 앱팀의 몫을 나누고 가중치 분할 같은 기능을 표준으로 담아요', 'the Gateway API separates infrastructure and application roles and standardizes features such as weighted splits']]);
  fin(S, 'z', 15.6, [['인그레스: 클러스터 밖의 HTTP(S) 요청을 호스트·경로 규칙으로 안쪽 서비스에 연결하는 입구', 'an ingress is the entrance that routes outside HTTP(S) requests to services by host and path rules', 'opx-xs opx-a'], ['규칙(Ingress 리소스)과 실제로 트래픽을 처리하는 컨트롤러는 따로예요 · 컨트롤러를 꼭 설치해야 해요', 'the rules (Ingress resources) and the controller that handles traffic are separate, so a controller must be installed'], ['HTTP가 아닌 TCP·UDP 서비스는 LoadBalancer 서비스나 Gateway API의 TCPRoute로 열어요', 'non-HTTP TCP and UDP services use LoadBalancer services or Gateway API TCPRoutes']]);
  S.cap(1, '서비스마다 LB', 'One LB per service').cap(2, '입구 하나, 규칙으로 분배', 'One entrance, routed by rules').cap(3, 'TLS와 부가 기능', 'TLS and extras').cap(4, 'Gateway API', 'The Gateway API').cap(5, '인그레스', 'Ingress');
  return S;
}

function sMetrics() {
  const S = scene({ id: 'op-metrics', steps: 5, per: 1.7 });
  T(S, 'nm', 1, .4, 'http_requests_total{method="GET", status="200"}', 'cz-mono opx-xs opx-a', 0);
  const F = fr(0, 10, 0, 1700, 2.0, 15.0, 2.0, 7.6), G = fr(0, 10, 0, 300, 18.0, 31.0, 2.0, 7.6);
  [F, G].forEach((f, i) => { hl(S, 'ax' + i, f.L, f.R, f.B, 'ink-3', i ? 1 : 0, { w: .08 }); vl(S, 'ay' + i, f.L, f.T, f.B, 'ink-3', i ? 1 : 0, { w: .08 }); });
  const cnt = t => 60 * t + 18 * t * t * .3 + (t > 6 ? 120 * (t - 6) : 0);
  mplot(S, 'c', F, t => [t, cnt(t)], 0, 10, { st: 0, color: 'accent', h: .12, n: 40 });
  mplot(S, 'r', G, t => [t, 60 + 10.8 * t + (t > 6 ? 120 : 0)], 0, 10, { st: 1, color: 'ok', h: .12, n: 40 });
  T(S, 'cl', F.L, 8.0, ['카운터: 계속 늘기만 해요', 'counter: only ever goes up'], 'opx-xs', 0); T(S, 'rl', G.L, 8.0, 'rate(…[1m]) → req/s', 'cz-mono opx-xs opx-g', 1);
  T(S, 'sp', G.L + 6.6, .9, ['트래픽 급증', 'traffic spike'], 'opx-xs opx-r', 1);
  const TY = [['counter', ['누적 횟수 · rate로 봐요', 'cumulative count · read with rate']], ['gauge', ['오르내리는 현재 값 · 메모리, 큐 길이', 'current value, up or down · memory, queue length']], ['histogram', ['구간별 개수 → 지연 p50 · p99', 'bucket counts → latency p50 · p99']]];
  TY.forEach(([a, b], i) => { cell(S, 'ty' + i, 1, 9.6 + i * 1.5, 5.4, 1.2, a, 'accent', 22, 2, { off: 3 }); T(S, 'tyt' + i, 7.0, 9.7 + i * 1.5, b, 'opx-xs', 2, { off: 3 }); });
  T(S, 'cd0', 1, 9.4, ['라벨 조합 하나 = 시계열 하나', 'each label combination = one time series'], 'opx-xs opx-a', 3, { off: 4 });
  cell(S, 'cd1', 1, 10.6, 14.0, 1.1, 'method × status × route = 4 × 5 × 30 = 600', 'ok', 22, 3, { off: 4 }); cell(S, 'cd2', 16.0, 10.6, 15.0, 1.1, ['+ user_id (100만 명) = 6억 개 ✗', '+ user_id (1M users) = 600M series ✗'], 'danger', 26, 3, { off: 4 });
  T(S, 'cd3', 1, 12.2, ['라벨 값은 개수가 정해진 것만: 상태 코드, 메서드, 경로 템플릿(/users/:id)', 'only bounded label values: status, method, route template (/users/:id)'], 'opx-xs opx-g', 3, { off: 4 });
  T(S, 'm0', 1, 9.4, ['무엇을 잴까', 'what to measure'], 'opx-xs opx-a', 4);
  T(S, 'm1', 1, 10.5, ['서비스 → RED: 요청 수(Rate), 오류(Errors), 지연(Duration)', 'services → RED: Rate, Errors, Duration'], 'opx-xs', 4);
  T(S, 'm2', 1, 11.6, ['자원 → USE: 사용률, 포화도(대기열), 오류', 'resources → USE: Utilization, Saturation, Errors'], 'opx-xs', 4);
  T(S, 'm3', 1, 12.7, ['Prometheus는 15초마다 /metrics를 긁어 가요(pull)', 'Prometheus scrapes /metrics every 15 seconds (pull)'], 'opx-xs opx-w', 4);
  notesSplit(S, 'k', 15.6, [['메트릭은 이름 + 라벨 + 시간별 숫자 · 요청 수 카운터는 계속 쌓이기만 해요', 'a metric is a name plus labels plus numbers over time · a request counter only accumulates'], ['카운터는 rate()로 초당 변화량을 봐야 의미가 있어요 · 게이지와 히스토그램도 함께 써요', 'counters become meaningful through rate(), alongside gauges and histograms'], ['라벨 값 조합마다 시계열이 따로 생겨요 · 사용자 ID 같은 라벨은 저장소를 폭발시켜요', 'every label combination is its own series · labels such as user IDs explode storage'], ['서비스는 RED, 자원은 USE로 잴 것을 고르고, 메트릭으로 알림을 걸어요', 'pick what to measure with RED for services and USE for resources, and alert on metrics']]);
  fin(S, 'z', 15.6, [['메트릭: 시간에 따른 숫자를 싸게 모아 추세를 보고 알림을 거는 관측 신호', 'metrics are cheap numeric time series used to watch trends and fire alerts', 'opx-xs opx-a'], ['평균 지연보다 히스토그램의 p99가 사용자가 겪는 느림을 잘 보여 줘요', 'a histogram’s p99 reflects user-facing slowness far better than the mean'], ['개별 요청의 사연은 로그와 트레이스에서 · 메트릭은 “얼마나, 언제부터”에 답해요', 'individual stories live in logs and traces; metrics answer “how much, since when”']]);
  S.cap(1, '이름, 라벨, 숫자', 'Name, labels, numbers').cap(2, 'rate와 메트릭 종류', 'rate() and metric types').cap(3, '카디널리티', 'Cardinality').cap(4, 'RED와 USE', 'RED and USE').cap(5, '메트릭', 'Metrics');
  return S;
}

function sLogs() {
  const S = scene({ id: 'op-logs', steps: 5, per: 1.7 });
  rect(S, 'pbg', .6, .4, 30.6, 2.0, 'danger', 8, 0, { r: .4, off: 2 });
  T(S, 'pl', 1.0, .5, ['텍스트 로그', 'plain-text log'], 'opx-xs opx-r', 0, { off: 2 });
  codeLines(S, 'pt', 1.0, 1.4, ['2026-11-10 12:04:01 ERROR payment failed for user 42 order 991 after 3 retries'], 0, 2);
  T(S, 'pq', 1, 3.0, ['order 991의 오류만 찾으려면? → 정규식, 형식이 조금만 바뀌어도 깨져요', 'errors for order 991 only? → regexes that break whenever wording changes'], 'opx-xs opx-r', 1, { off: 2 });
  rect(S, 'jbg', .6, .4, 15.6, 8.2, 'ok', 8, 2, { r: .4 });
  codeLines(S, 'j', 1.0, .6, ['{', '  "ts": "2026-11-10T12:04:01Z",', '  "level": "error",', '  "msg": "payment failed",', '  "user_id": 42,', '  "order_id": 991,', '  "retries": 3,', '  "trace_id": "4bf92f35…"', '}'], 2, 0, { lh: .85 });
  T(S, 'q0', 17.4, .6, ['필드로 바로 검색·집계', 'query and aggregate by field'], 'opx-xs opx-a', 2, { off: 3 });
  codeLines(S, 'q1', 17.4, 1.8, ['level = "error" AND order_id = 991', 'count() by msg, level'], 2, 3);
  const SV = [['gateway', 1.0], ['orders', 8.6], ['payment', 16.2]];
  T(S, 'tr0', 17.4, .6, ['같은 trace_id로 서비스를 가로질러', 'follow one trace_id across services'], 'opx-xs opx-a', 3, { off: 4 });
  SV.forEach(([n, x], i) => { cell(S, 'ts' + i, x, 9.6, 6.8, 1.2, n, 'accent', 20, 3, { off: 4 }); T(S, 'tt' + i, x, 11.0, 'trace_id=4bf92f35…', 'cz-mono opx-xs opx-g', 3, { w: 6.8, off: 4 }); if (i) ar(S, 'ta' + i, [x - .8, 10.2], [x, 10.2], 'ink-2', 3, { h: .1, off: 4 }); });
  T(S, 'tr1', 17.4, 1.8, ['트레이스에서 로그로, 로그에서 트레이스로 이동', 'jump from traces to logs and back'], 'opx-xs', 3, { off: 4 });
  T(S, 'tr2', 17.4, 2.9, ['레벨: DEBUG < INFO < WARN < ERROR', 'levels: DEBUG < INFO < WARN < ERROR'], 'cz-mono opx-xs', 3, { off: 4 });
  T(S, 'w0', 17.4, .6, ['남기면 안 되는 것', 'never log'], 'opx-xs opx-r', 4);
  codeLines(S, 'w1', 17.4, 1.8, ['"password": "hunter2"     ✗', '"card": "4111 1111 …"     ✗', '"token": "eyJhbGci…"      ✗'], 4, 0, { cls: 'opx-r' });
  T(S, 'w2', 17.4, 5.4, ['→ 수집 단계에서 자동으로 가리기(redaction)', '→ redact automatically at collection'], 'opx-xs opx-g', 4);
  T(S, 'w3', 17.4, 6.6, ['양이 곧 비용 · DEBUG는 샘플링, 보관 기간을 나눠요', 'volume is cost · sample DEBUG and tier retention'], 'opx-xs opx-w', 4);
  notesSplit(S, 'k', 15.6, [['문장으로 쓴 로그는 사람은 읽기 쉽지만, 기계가 특정 주문의 오류만 골라내기는 어려워요', 'sentence-style logs are easy for people to read but hard for machines to filter by order'], ['구조화된 로그는 JSON처럼 필드로 남겨서, 필드 조건으로 바로 검색하고 집계해요', 'structured logs record fields, as JSON, so you can filter and aggregate by field directly'], ['모든 서비스가 같은 trace_id를 남기면 한 요청의 로그를 서비스를 가로질러 이어 볼 수 있어요', 'when every service logs the same trace_id, one request’s logs can be followed across services'], ['비밀번호, 카드 번호, 토큰은 절대 남기지 말고 자동으로 가려요 · 양은 비용이라 샘플링과 보관 정책을 둬요', 'never log passwords, card numbers or tokens and redact them automatically · volume is cost, so sample and tier retention']]);
  fin(S, 'z', 15.6, [['구조화된 로그: 메시지 대신 키-값 필드로 사건을 기록해 기계가 검색·집계할 수 있게 하기', 'structured logging records events as key-value fields so machines can search and aggregate them', 'opx-xs opx-a'], ['메트릭과 달리 user_id 같은 고유 값도 필드로 넣어도 돼요 · 그게 로그의 강점이에요', 'unlike metrics, logs can carry unique values such as user_id as fields; that is their strength'], ['OpenTelemetry 로그 표준, Loki·Elasticsearch·CloudWatch Logs 같은 저장소와 함께 써요', 'pair it with the OpenTelemetry log model and stores such as Loki, Elasticsearch or CloudWatch Logs']]);
  S.cap(1, '문장으로 쓴 로그', 'Logs as sentences').cap(2, '필드로 쓴 로그', 'Logs as fields').cap(3, 'trace_id로 잇기', 'Linking with trace_id').cap(4, '남기면 안 되는 것', 'What never to log').cap(5, '구조화된 로그', 'Structured logging');
  return S;
}

function sErrBudget() {
  const S = scene({ id: 'op-errbudget', steps: 5, per: 1.7 });
  T(S, 'slo', 1, .4, ['SLO: 30일 동안 요청의 99.9% 성공', 'SLO: 99.9% of requests succeed over 30 days'], 'opx-s opx-a', 0);
  [['0.1%', ['허용 실패율', 'allowed failure rate']], [['43.2분', '43.2 min'], ['전면 장애로 치면', 'as full downtime']], [['10,000건', '10,000 failures'], ['월 1,000만 요청 중', 'of 10M requests a month']]].forEach(([a, b], i) => { cell(S, 'b' + i, 1 + i * 10.2, 2.0, 9.6, 1.5, a, i ? 'line' : 'warn', i ? 12 : 28, 1); T(S, 'bl' + i, 1 + i * 10.2, 3.7, b, 'cz-tc opx-xs', 1, { w: 9.6 }); });
  const F = fr(0, 30, 0, 100, 3.0, 20.0, 5.6, 13.4);
  hl(S, 'fx', F.L, F.R, F.B, 'ink-3', 2, { w: .08 }); vl(S, 'fy', F.L, F.T, F.B, 'ink-3', 2, { w: .08 });
  mline(S, 'ideal', F, [0, 100], [30, 0], { st: 2, color: 'ink-3', h: .06, dash: 1 });
  const B = [[0, 100], [8, 92], [8, 52], [15, 45], [15.4, 30], [22, 24]];
  poly(S, 'bud', B.map(([d, v]) => [F.X(d), F.Y(v)]), { st: 2, color: 'accent', h: .14 });
  T(S, 'inc', F.X(8) + .4, F.Y(96) - .3, ['배포 버그: −40%', 'bad deploy: −40%'], 'opx-xs opx-r', 2);
  [[0, '0'], [50, '50%'], [100, '100%']].forEach(([v, l]) => T(S, 'yl' + v, F.L - 2.6, F.Y(v) - .5, l, 'cz-mono opx-xs', 2, { w: 2.2, css: 'text-align:right' }));
  T(S, 'xl', F.R - 6, F.B + .3, ['날짜 (30일)', 'day (30 days)'], 'opx-xs', 2, { w: 6, css: 'text-align:right' }); T(S, 'yt', F.L + .3, F.T - 1.0, ['남은 예산', 'budget left'], 'opx-xs opx-a', 2);
  const R = 21.4;
  T(S, 'br0', R, 5.6, ['소진 속도(burn rate)', 'burn rate'], 'opx-xs opx-a', 3);
  T(S, 'br1', R, 6.7, ['1 = 딱 월말에 다 씀', '1 = exactly used up at month end'], 'opx-xs', 3);
  T(S, 'br2', R, 7.8, ['14.4 = 1시간에 2% 소진', '14.4 = 2% gone in one hour'], 'opx-xs opx-r', 3);
  T(S, 'br3', R, 8.9, ['→ 1시간·5분 창 모두 넘으면 호출', '→ page when both 1 h and 5 min windows exceed it'], 'opx-xs opx-w', 3, { w: 10.2 });
  T(S, 'p0', R, 10.4, ['예산 정책', 'budget policy'], 'opx-xs opx-a', 4);
  T(S, 'p1', R, 11.5, ['남았으면 → 과감히 출시·실험', 'left over → ship and experiment'], 'opx-xs opx-g', 4);
  T(S, 'p2', R, 12.6, ['바닥나면 → 위험한 배포 동결, 안정화', 'used up → freeze risky launches, fix reliability'], 'opx-xs opx-r', 4, { w: 10.2 });
  notesSplit(S, 'k', 15.6, [['SLO가 99.9%라면 0.1%는 실패해도 된다는 뜻 · 이 허용량이 에러 예산이에요', 'an SLO of 99.9% means 0.1% may fail, and that allowance is the error budget'], ['예산은 장애와 버그가 날 때마다 깎여요 · 점선은 한 달에 고르게 쓰는 속도예요', 'outages and bugs spend it down · the dashed line is an even pace over the month'], ['소진 속도가 14.4면 1시간에 예산의 2%를 써요 · 긴 창과 짧은 창이 함께 넘을 때 호출해요', 'a burn rate of 14.4 spends 2% of the budget in an hour · page when long and short windows both exceed it'], ['예산이 남으면 빠르게 출시하고, 바닥나면 출시를 멈추고 안정화에 집중해요', 'with budget left, ship fast; when it is gone, pause launches and focus on reliability']]);
  fin(S, 'z', 15.6, [['에러 예산: 100% − SLO · 신뢰성과 출시 속도 사이를 숫자로 조율하는 도구', 'error budget = 100% − SLO, a number that arbitrates between reliability and release speed', 'opx-xs opx-a'], ['100%를 목표로 하지 않아요 · 사용자는 99.9%와 100%를 구분 못 하고 비용은 급격히 커져요', 'never aim for 100% · users cannot tell 99.9% from 100%, while costs soar'], ['정책은 제품팀과 SRE가 미리 합의해 둬야 장애 뒤에 다툼이 없어요', 'agree the policy between product and SRE in advance so incidents do not become arguments']]);
  S.cap(1, '허용된 실패', 'Allowed failure').cap(2, '예산 소진', 'Spending the budget').cap(3, '소진 속도와 알림', 'Burn rate and alerts').cap(4, '예산 정책', 'Budget policy').cap(5, '에러 예산', 'Error budgets');
  return S;
}

function sPostmortem() {
  const S = scene({ id: 'op-postmortem', steps: 5, per: 1.7 });
  const X0 = 3.0, U = 1.3, tx = m => X0 + (m - 2) * U;
  hl(S, 'tl', tx(2), tx(22), 3.2, 'ink-3', 0, { w: .1 });
  const EV = [[2, '14:02', ['v2.3 배포', 'deploy v2.3'], 'ink-2'], [5, '14:05', ['오류 급증 알림', 'error alert'], 'danger'], [9, '14:09', ['장애 선언', 'incident declared'], 'warn'], [15, '14:15', ['롤백', 'rollback'], 'accent'], [21, '14:21', ['복구', 'recovered'], 'ok']];
  EV.forEach(([m, t, l, c], i) => { pt(S, 'e' + i, tx(m), 3.2, 0, { background: `var(--${c})` }, .3); T(S, 'et' + i, tx(m) - 1.6, i % 2 ? 3.7 : 1.1, t, 'cz-tc cz-mono opx-xs', 0, { w: 3.2 }); T(S, 'el' + i, tx(m) - 2.6, i % 2 ? 4.6 : 2.0, l, 'cz-tc opx-xs', 0, { w: 5.2 }); });
  rect(S, 'ttd', tx(2), 5.9, tx(5) - tx(2), .8, 'danger', 30, 1, { r: .1 }); T(S, 'ttdl', tx(2), 6.8, ['감지 3분', 'detect: 3 min'], 'opx-xs opx-r', 1);
  rect(S, 'ttm', tx(5), 5.9, tx(21) - tx(5), .8, 'warn', 30, 1, { r: .1 }); T(S, 'ttml', tx(5) + .3, 6.8, ['완화까지 16분 · 결제 실패 12%', '16 min to mitigate · 12% of checkouts failed'], 'opx-xs opx-w', 1);
  const WH = [['왜 결제가 실패했나?', 'why did checkout fail?', '설정값 timeout=0이 배포됨', 'timeout=0 shipped in config'], ['왜 배포됐나?', 'why was it deployed?', '설정 검증이 없었음', 'no config validation'], ['왜 늦게 막았나?', 'why so slow to stop?', '이번엔 카나리를 건너뜀', 'the canary was skipped this time']];
  WH.forEach(([a, ae, b, be], i) => { T(S, 'wq' + i, 1, 8.4 + i * 1.6, [a, ae], 'opx-xs opx-a', 2, { off: 3 }); T(S, 'wa' + i, 11.0, 8.4 + i * 1.6, ['→ ' + b, '→ ' + be], 'opx-xs', 2, { off: 3 }); });
  cell(S, 'bl0', 1, 8.4, 14.2, 1.3, ['“배포한 사람이 설정을 잘못 넣었다” ✗', '“the deployer pushed a bad config” ✗'], 'danger', 22, 3, { off: 4 });
  cell(S, 'bl1', 16.4, 8.4, 14.6, 1.3, ['“검증 없이 배포될 수 있었다” ✓', '“a config could ship unvalidated” ✓'], 'ok', 26, 3, { off: 4 });
  T(S, 'bl2', 1, 10.2, ['사람을 탓하면 다음엔 숨겨요 · 같은 실수를 시스템이 막게 고쳐요', 'blame makes people hide things next time · fix the system so the mistake cannot recur'], 'opx-xs', 3, { off: 4 });
  const AI = [['P1', ['설정 스키마 검증 추가', 'add config schema validation'], ['플랫폼팀', 'platform'], '11/17'], ['P1', ['카나리 단계를 필수로', 'make the canary stage mandatory'], ['릴리스팀', 'release'], '11/20'], ['P2', ['결제 오류율 알림 임계값 조정', 'tune the checkout error alert'], ['결제팀', 'payments'], '11/24']];
  T(S, 'ai0', 1, 8.2, ['조치 항목: 담당자 · 기한 · 우선순위', 'action items: owner · due date · priority'], 'opx-xs opx-a', 4);
  AI.forEach(([p, t, o, d], i) => { const y = 9.3 + i * 1.25; cell(S, 'aip' + i, 1, y, 2.0, 1.05, p, i < 2 ? 'danger' : 'warn', 26, 4); T(S, 'ait' + i, 3.6, y + .05, t, 'opx-xs', 4); T(S, 'aio' + i, 18.0, y + .05, o, 'opx-xs', 4); T(S, 'aid' + i, 22.0, y + .05, d, 'cz-mono opx-xs', 4); });
  notesSplit(S, 'k', 15.6, [['장애가 끝나면 타임라인부터 · 언제 시작돼서 언제 알아채고, 언제 막았는지 분 단위로 적어요', 'after an incident, start with a minute-by-minute timeline of when it began, was noticed and was stopped'], ['영향(얼마나 오래, 몇 %)과 원인을 “왜?”를 거듭하며 찾아요 · 원인은 대개 하나가 아니에요', 'record the impact and dig for causes by asking “why?” repeatedly; there is rarely just one'], ['비난 없는 회고: 누가 실수했나가 아니라 왜 시스템이 그 실수를 허용했나를 물어요', 'blameless review asks not who erred but why the system let the error through'], ['담당자와 기한이 있는 조치 항목으로 끝내고, 끝까지 추적해 완료해요', 'end with action items that have owners and due dates, and track them to completion']]);
  fin(S, 'z', 15.6, [['포스트모템: 장애의 타임라인·영향·원인·조치를 비난 없이 기록해 같은 장애를 막는 문서', 'a postmortem records an incident’s timeline, impact, causes and actions without blame, to prevent repeats', 'opx-xs opx-a'], ['감지 시간(TTD)과 완화 시간(TTM)을 재서 알림과 롤백 절차도 함께 개선해요', 'measuring time to detect and time to mitigate improves alerting and rollback too'], ['널리 공유할수록 가치가 커요 · 다른 팀도 같은 함정을 피할 수 있어요', 'share them widely; other teams avoid the same traps']]);
  S.cap(1, '타임라인', 'The timeline').cap(2, '왜?를 거듭하기', 'Asking why, repeatedly').cap(3, '비난 없는 회고', 'Blameless review').cap(4, '조치 항목', 'Action items').cap(5, '포스트모템', 'Postmortems');
  return S;
}


/* ===== DevOps expansion: helpers ===== */
const CSSY = '.opx-ic .in{color:inherit!important}';
const sw = (S, k, x, y, w, h, bg, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${/--line\)/.test(bg) && !o.css ? 'border:.06em solid var(--line);' : ''}${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: bg }) }); vis(S, k, st, o.off); };
const cl = (S, k, x, y, w, t, c, st, o = {}) => T(S, k, x, y, t, 'cz-tc opx-xs ' + clsOf(c), st, Object.assign({ w }, o));
const nd = (S, k, x, y, w, label, color, st, o = {}) => chip(S, k, x, y, w, label, color || 'line', st, Object.assign({ pct: 14 }, o));
const ed = (S, k, a, b, st, o = {}) => seg(S, k, a, b, st, o.color || 'ink-3', o.h || .08, { off: o.off });
const tbox = (S, k, x, y, w, h, title, color, st, o = {}) => { frame(S, k, x, y, w, h, color, st, { w: .1, off: o.off, dash: o.dash, r: .4 }); lbl(S, k + 't', x + .3, y + .15, title, 'm ' + (o.tc || ''), st, { off: o.off }); };
const zup = (S, ks) => ks.forEach(k => S.set(k, 0, { 'z-index': '3' }));

/* ===== DevOps · culture and metrics ===== */
function sDevops() {
  return CW('op-devops', {
    code: [['# 개발팀: 빨리 바꾸고 싶어요', '# dev: wants to change things fast'], ['# 운영팀: 안정적으로 지키고 싶어요', '# ops: wants to keep things stable'], ['# → 담장 너머로 던지고 책임 미루기', '# → throw it over the wall'], ['# DevOps: 한 팀 · 하나의 흐름', '# DevOps: one team, one flow'], ['# CALMS: 문화·자동화·린·측정·공유', '# CALMS: culture, automation, lean,'], ['#   “만든 팀이 운영까지”', '#   measurement, sharing']],
    hl: [[0, 3, 'danger'], [3, 1, 'ok'], [4, 2, 'warn'], [5, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'dev', X, 1.3, 4.2, 'Dev', 'accent', 0, { h: 1.0 }); nd(S, 'ops', X + 7.8, 1.3, 4.2, 'Ops', 'warn', 0, { h: 1.0 });
      sw(S, 'wall', X + 5.6, .5, .8, 2.6, tint('danger', 45), 1, { off: 2, css: 'border:0' }); arw(S, 'th', [X + 4.3, 1.0], [X + 7.7, 1.0], 1, { off: 2, dash: 1 }); zup(S, ['th']);
      lbl(S, 'thl', X + 3.0, 3.3, ['장애 나면 서로 탓', 'blame on both sides'], 'm r', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['목표가 엇갈린 두 팀 · 배포는 드물고 무서워져요', 'two teams with clashing goals; releases get rare and scary'], 'r', 1, { off: 2, w: 12 });
      tbox(S, 'team', X - .2, .5, 12.4, 2.1, ['한 팀', 'one team'], 'ok', 2, { tc: 'g' });
      [['plan', 0], ['code', 1], ['build', 2], ['test', 3], ['release', 3], ['deploy', 2], ['operate', 1], ['monitor', 0]].forEach(([t, c], i) => nd(S, 'lp' + i, X + c * 3.03, i < 4 ? 3.0 : 4.3, 2.9, t, i < 4 ? 'accent' : 'ok', 2, { h: 1.0, off: 3 }));
      lbl(S, 'n2', X, 6.6, ['계획부터 운영·모니터링까지 하나의 고리로 계속 돌려요', 'one loop from planning to operating and monitoring'], 'g', 2, { off: 3, w: 12 });
      [['C', ['문화: 비난 없는 협업', 'culture: blameless collaboration']], ['A', ['자동화: 반복은 파이프라인으로', 'automation: pipelines for repeats']], ['L', ['린: 작게, 자주 흘려보내기', 'lean: small batches, fast flow']], ['M', ['측정: 숫자로 개선하기', 'measurement: improve with data']], ['S', ['공유: 지식과 책임 나누기', 'sharing: knowledge and ownership']]].forEach(([a, t], i) => { lbl(S, 'ca' + i, X, 2.9 + i * .72, a, 'm a', 3, { off: 4 }); lbl(S, 'ct' + i, X + 1.0, 2.9 + i * .72, t, '', 3, { off: 4 }); });
      lbl(S, 'n3', X, 6.6, ['도구보다 문화가 먼저 · CALMS로 점검해요', 'culture before tools; check yourself with CALMS'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'fb', [X + 7.7, 2.05], [X + 4.3, 2.05], 4, { color: 'ok' }); zup(S, ['fb']); chip(S, 'yb', X + 1.0, 3.4, 10.0, ['만든 팀이 운영까지', 'you build it, you run it'], 'ok', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['운영의 고통이 개발로 돌아와야 품질이 올라가요', 'feeling the pain of operations drives quality up'], 'a', 4, { w: 12 });
    },
    notes: [['개발팀은 기능을 빨리 내보내고 싶고 운영팀은 시스템을 안정적으로 지키고 싶어서, 결과물을 담장 너머로 던지고 문제가 생기면 서로 탓하기 쉬워요', 'developers want to ship fast while operators want stability, so work gets thrown over the wall and problems turn into blame'], ['DevOps는 두 역할을 하나의 흐름으로 묶어요 · 계획, 코드, 빌드, 테스트, 릴리스, 배포, 운영, 모니터링이 끊김 없는 고리가 돼요', 'DevOps joins both roles into one flow, where planning, coding, building, testing, releasing, deploying, operating and monitoring form an unbroken loop'], ['CALMS는 DevOps를 점검하는 다섯 가지 축이에요 · 문화, 자동화, 린(작은 단위로 빠르게), 측정, 공유', 'CALMS gives five lenses for checking DevOps: culture, automation, lean (small batches, fast flow), measurement and sharing'], ['“만든 팀이 운영까지(you build it, you run it)” 하면 장애와 운영 부담이 개발 결정으로 바로 돌아와 품질이 좋아져요', 'with “you build it, you run it,” incidents and operational burden feed straight back into development decisions, raising quality']],
    fin: [['DevOps: 개발과 운영을 한 팀·한 흐름으로 묶는 문화와 실천 · 도구는 그 다음', 'DevOps joins development and operations into one team and flow; tools come second', 'opx-xs opx-a'], ['DevOps는 직함이나 팀 이름이 아니에요', 'DevOps is not a job title or a team name'], ['작게 자주 배포할수록 위험이 줄어요', 'smaller, frequent releases lower risk']],
    caps: [['담장 너머로', 'Over the wall'], ['하나의 고리', 'One loop'], ['CALMS', 'CALMS'], ['만든 팀이 운영까지', 'You build it, you run it'], ['DevOps란', 'What DevOps is']]
  });
}

function sDora() {
  return CW('op-dora', {
    code: [['# DORA 핵심 지표', '# the DORA key metrics'], ['# 처리량: 배포 빈도 · 변경 리드 타임', '# throughput: deploy frequency, lead time'], ['# 안정성: 변경 실패율 · 복구 시간', '# stability: change fail rate, recovery time'], ['# 최상위 팀: 필요할 때마다 배포,', '# top teams: deploy on demand,'], ['#   리드 타임 하루 미만, 복구 1시간 미만', '#   lead time < 1 day, restore < 1 hour'], ['# 속도와 안정성은 함께 좋아져요', '# speed and stability improve together']],
    hl: [[1, 1, 'ok'], [2, 1, 'warn'], [3, 2], [5, 1, 'ok']],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      [[['배포 빈도', 'deploy freq'], ['필요할 때마다', 'on demand'], 'ok', 0, 0], [['리드 타임', 'lead time'], ['< 1일', '< 1 day'], 'ok', 1, 0], [['변경 실패율', 'change fail %'], ['낮을수록', 'lower'], 'warn', 0, 1], [['복구 시간', 'time to restore'], ['< 1시간', '< 1 hour'], 'warn', 1, 1]].forEach(([t, v, c, j, r], i) => { nd(S, 'm' + i, X + j * 6.2, .5 + r * 2.0, 5.8, t, c, 1 + r, { h: 1.0 }); lbl(S, 'v' + i, X + j * 6.2, 1.6 + r * 2.0, v, 'm ' + (c === 'ok' ? 'g' : 'w'), 1 + r); });
      lbl(S, 'n1', X, 6.6, ['처리량: 얼마나 자주, 얼마나 빨리 내보내나', 'throughput: how often and how fast changes ship'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['안정성: 배포가 얼마나 자주 깨지고, 얼마나 빨리 고치나', 'stability: how often releases break and how fast you recover'], 'w', 2, { off: 3, w: 12 });
      [['git', 0], ['CI/CD', 1], [['장애 기록', 'incidents'], 2]].forEach(([t, j]) => nd(S, 's' + j, X + j * 4.1, 4.4, 3.8, t, 'line', 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['커밋·배포·장애 기록에서 자동으로 계산해요', 'compute them automatically from commits, deploys and incidents'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'gd', X, 5.5, 12.0, ['팀 순위표·목표치로 쓰면 숫자만 좋아져요', 'as targets, only numbers improve'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['추세를 보며 병목을 찾는 데 써요', 'use trends to find bottlenecks, not to rank teams'], 'a', 4, { w: 12 });
    },
    notes: [['DORA(DevOps Research and Assessment) 연구는 소프트웨어 전달 성과를 처리량 지표 두 개로 재요 · 배포 빈도와, 커밋이 운영에 나가기까지 걸리는 변경 리드 타임이에요', 'DORA (DevOps Research and Assessment) measures delivery throughput with two metrics: deployment frequency and lead time for changes from commit to production'], ['안정성 지표 두 개는 배포가 장애를 일으키는 비율(변경 실패율)과 실패한 배포에서 복구하는 데 걸리는 시간이에요', 'two stability metrics complete the set: the share of deployments causing failures (change failure rate) and the time to recover from a failed deployment'], ['지표는 사람이 적지 말고 Git 커밋, CI/CD 배포 기록, 장애 관리 도구에서 자동으로 계산해야 꾸준히 볼 수 있어요', 'metrics should be computed automatically from Git commits, CI/CD deploy records and incident tools rather than filled in by hand'], ['연구에서 최상위 팀은 속도와 안정성이 함께 높아요 · 다만 팀 순위나 목표치로 쓰면 숫자를 꾸미게 되니 병목을 찾는 데 써요', 'research shows top teams excel at speed and stability together, but turning metrics into rankings or targets invites gaming, so use them to find bottlenecks']],
    fin: [['DORA 지표: 배포 빈도·리드 타임(속도)과 실패율·복구 시간(안정성)', 'DORA metrics: deploy frequency and lead time for speed; fail rate and restore time for stability', 'opx-xs opx-a'], ['작은 배치가 네 지표를 함께 끌어올려요', 'small batches lift all four together'], ['최근에는 재작업률 같은 지표도 더해졌어요', 'newer reports add measures such as rework rate']],
    caps: [['처리량', 'Throughput'], ['안정성', 'Stability'], ['자동 측정', 'Measuring automatically'], ['올바른 사용', 'Using them well'], ['DORA 지표', 'DORA metrics']]
  });
}

function sSre() {
  return CW('op-sre', {
    code: [['# SRE: 운영을 소프트웨어로 풀기', '# SRE: solve operations with software'], ['# 수고(toil): 손으로 반복하는 일', '# toil: manual, repetitive work'], ['#   자동화 가능 · 가치가 쌓이지 않음', '#   automatable, no lasting value'], ['# 수고는 업무 시간의 50% 이하로', '# keep toil under 50% of time'], ['# 에러 예산이 출시 속도를 조절해요', '# error budgets pace releases'], ['# DevOps는 철학, SRE는 구현 방법', '# DevOps is the idea; SRE implements it']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'ok'], [4, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      lbl(S, 'b0', X, .4, ['수고 80% · 개선 20%', 'toil 80% · engineering 20%'], 'm r', 1, { off: 3 }); sw(S, 't0', X, 1.1, 9.6, .7, tint('danger', 55), 1, { off: 3, css: 'border:0' }); sw(S, 'e0', X + 9.6, 1.1, 2.4, .7, tint('ok', 55), 1, { off: 3, css: 'border:0' });
      ['restart', 'resize', 'rotate', 'ticket'].forEach((t, i) => nd(S, 'tk' + i, X + i * 3.03, 2.3, 2.9, t, 'danger', 1, { h: 1.0, off: 3 }));
      lbl(S, 'n1', X, 6.6, ['서버 재시작·수동 처리 같은 반복 작업이 시간을 먹어요', 'manual restarts and tickets eat the week'], 'r', 1, { off: 2, w: 12 });
      lbl(S, 'n2', X, 6.6, ['반복되는 일은 코드로 자동화해 없애요', 'repeated work gets automated away with code'], 'w', 2, { off: 3, w: 12 }); arw(S, 'au', [X + 6.0, 3.4], [X + 6.0, 4.3], 2, { color: 'ok', off: 3 }); chip(S, 'bot', X + 3.0, 4.4, 6.0, ['자동화 스크립트', 'automation'], 'ok', 2, { h: 1.0, off: 3 });
      lbl(S, 'b1', X, .4, ['수고 ≤ 50% · 개선 ≥ 50%', 'toil ≤ 50% · engineering ≥ 50%'], 'm g', 3); sw(S, 't1', X, 1.1, 5.4, .7, tint('warn', 55), 3, { css: 'border:0' }); sw(S, 'e1', X + 5.4, 1.1, 6.6, .7, tint('ok', 55), 3, { css: 'border:0' });
      lbl(S, 'n3', X, 6.6, ['남는 시간은 안정성을 높이는 엔지니어링에', 'freed time goes into reliability engineering'], 'g', 3, { off: 4, w: 12 });
      sw(S, 'bg', X, 2.6, 12.0, .6, tint('line', 30), 4, { css: 'border:0' }); sw(S, 'bu', X, 2.6, 8.4, .6, tint('danger', 50), 4, { css: 'border:0' }); lbl(S, 'bul', X, 3.35, ['에러 예산 70% 사용', 'error budget 70% used'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['예산이 바닥나면 기능보다 안정화가 먼저', 'when the budget runs out, reliability comes first'], 'a', 4, { w: 12 });
    },
    notes: [['SRE(사이트 신뢰성 엔지니어링)는 Google이 시작한 방식으로, 운영 문제를 소프트웨어 엔지니어가 코드와 자동화로 푸는 일이에요', 'site reliability engineering (SRE), started at Google, has software engineers solve operations problems with code and automation'], ['수고(toil)는 손으로 반복하고, 자동화할 수 있고, 해도 가치가 쌓이지 않는 운영 작업이에요 · 서비스가 커질수록 같이 늘어나요', 'toil is operational work that is manual, repetitive, automatable and leaves no lasting value, and it grows with the service'], ['SRE 팀은 수고를 업무 시간의 50% 아래로 묶고, 나머지 시간은 자동화와 안정성 개선 같은 엔지니어링에 써요', 'SRE teams cap toil below half their time and spend the rest on engineering such as automation and reliability work'], ['SLO와 에러 예산으로 출시 속도를 조절해요 · 예산이 남으면 빠르게 내보내고, 바닥나면 안정화에 집중해요 · DevOps가 철학이라면 SRE는 그 구체적 구현이에요', 'SLOs and error budgets pace releases, shipping fast while budget remains and stabilizing when it runs out; if DevOps is the philosophy, SRE is a concrete implementation']],
    fin: [['SRE: 수고를 50% 아래로 줄이고, SLO와 에러 예산으로 속도와 안정성을 조율해요', 'SRE caps toil under half the time and balances speed and reliability with SLOs and error budgets', 'opx-xs opx-a'], ['“class SRE implements DevOps”라는 말도 있어요', 'as the saying goes, “class SRE implements DevOps”'], ['장애 후엔 비난 없는 포스트모템을 써요', 'blameless postmortems follow incidents']],
    caps: [['수고', 'Toil'], ['자동화', 'Automation'], ['50% 규칙', 'The 50% rule'], ['에러 예산', 'Error budgets'], ['SRE', 'SRE']]
  });
}

function sPlatform() {
  return CW('op-platform', {
    code: [['# 플랫폼 팀 → 내부 개발자 플랫폼(IDP)', '# platform team → internal dev platform'], ['# 골든 패스: 검증된 기본 경로', '# golden path: a paved, proven road'], '$ create-service --template node-api', ['#  → 저장소 · CI/CD · 대시보드 · 런북', '#  → repo, CI/CD, dashboards, runbooks'], ['# 셀프서비스 포털: Backstage 등', '# self-service portal: Backstage, etc.'], ['# 플랫폼도 제품, 개발자가 고객', '# the platform is a product; devs are users']],
    hl: [[0, 1], [1, 3, 'ok'], [4, 1, 'warn'], [5, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      [0, 1, 2].forEach(i => nd(S, 'tm' + i, X + i * 4.1, .4, 3.8, ['팀 ' + 'ABC'[i], 'team ' + 'ABC'[i]], 'accent', 0, { h: 1.0 }));
      ['k8s', 'CI', 'IaC', 'logs', 'certs', 'DNS'].forEach((t, i) => nd(S, 'tl' + i, X + i * 2.03, 2.6, 1.9, t, 'line', 1, { h: 1.0, off: 2 }));
      [0, 1, 2].forEach(i => [0, 2, 4].forEach(j => ed(S, 'x' + i + j, [X + 1.9 + i * 4.1, 1.45], [X + .95 + (j + i % 2) * 2.03, 2.55], 1, { off: 2, color: 'danger' })));
      lbl(S, 'n1', X, 6.6, ['팀마다 인프라 도구를 다 배우느라 인지 부하가 커요', 'every team must master every infra tool: heavy cognitive load'], 'r', 1, { off: 2, w: 12 });
      nd(S, 'idp', X, 2.6, 12.0, ['내부 개발자 플랫폼', 'internal developer platform'], 'ok', 2, { h: 1.0 }); [0, 1, 2].forEach(i => arw(S, 'ua' + i, [X + 1.9 + i * 4.1, 1.45], [X + 1.9 + i * 4.1, 2.55], 2, { color: 'ok' }));
      ['k8s', 'CI', 'IaC', 'logs', 'certs', 'DNS'].forEach((t, i) => nd(S, 'tb' + i, X + i * 2.03, 4.0, 1.9, t, 'line', 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['플랫폼이 복잡함을 감추고 셀프서비스로 제공해요', 'the platform hides complexity behind self-service'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'gp', X, 5.3, 12.0, ['골든 패스: 템플릿 → 서비스 뼈대', 'golden path: template → service'], 'warn', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['권장 경로를 가장 쉬운 길로 만들어요 · 강제는 아니에요', 'make the recommended path the easiest, not mandatory'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['사용률·만족도·온보딩 시간으로 플랫폼을 평가해요', 'judge it by adoption, satisfaction and onboarding time'], 'a', 4, { w: 12 });
    },
    notes: [['서비스 팀마다 쿠버네티스, CI, IaC, 로그, 인증서, DNS를 모두 직접 다루면 배울 것이 너무 많아 정작 제품 개발이 느려져요', 'when every service team handles Kubernetes, CI, IaC, logging, certificates and DNS directly, the learning load slows actual product work'], ['플랫폼 엔지니어링은 이런 공통 인프라를 내부 개발자 플랫폼(IDP)으로 묶어 셀프서비스로 제공해요 · 팀은 필요한 것을 직접 요청하지 않고 바로 만들어 써요', 'platform engineering bundles shared infrastructure into an internal developer platform (IDP) offered as self-service, so teams create what they need without tickets'], ['골든 패스는 검증된 기본 경로예요 · 템플릿 하나로 저장소, 파이프라인, 대시보드, 런북이 갖춰진 서비스가 생기고, 다른 길도 막지는 않아요', 'golden paths are proven default routes: one template yields a service with repository, pipeline, dashboards and runbooks, without forbidding other paths'], ['Backstage 같은 포털로 서비스 목록과 문서를 모으고, 플랫폼을 제품처럼 운영해 사용률, 개발자 만족도, 첫 배포까지 걸리는 시간으로 평가해요', 'portals such as Backstage gather service catalogs and docs, and the platform is run like a product, measured by adoption, developer satisfaction and time to first deploy']],
    fin: [['플랫폼 엔지니어링: 공통 인프라를 셀프서비스 플랫폼과 골든 패스로 제공해 인지 부하를 줄여요', 'platform engineering offers shared infrastructure as self-service and golden paths, cutting cognitive load', 'opx-xs opx-a'], ['티켓으로 요청하는 운영팀과 달라요', 'unlike a ticket-driven ops team'], ['작은 조직은 관리형 서비스로도 충분해요', 'small orgs may just use managed services']],
    caps: [['인지 부하', 'Cognitive load'], ['내부 개발자 플랫폼', 'Internal developer platforms'], ['골든 패스', 'Golden paths'], ['제품으로서의 플랫폼', 'Platform as a product'], ['플랫폼 엔지니어링', 'Platform engineering']]
  });
}

function sOncall() {
  return CW('op-oncall', {
    code: [['# 온콜 순번: 1차 → 2차 → 매니저', '# rotation: primary → secondary → lead'], 'escalate_after: 15m', ['# 모든 알림에 런북 링크', '# every alert links a runbook'], ['# 근무 시간 밖 호출은 줄이고 보상', '# limit and compensate night pages'], ['# 시간대별 교대(follow-the-sun)', '# follow-the-sun across time zones'], ['# 교대 때 인계 메모와 회고', '# handoff notes and shift reviews']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 2]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'al', X, .4, 2.6, 'alert', 'danger', 1, { h: 1.0 }); nd(S, 'p1', X + 3.2, .4, 3.0, ['1차', 'primary'], 'warn', 1, { h: 1.0 }); nd(S, 'p2', X + 6.6, .4, 2.8, ['2차', 'second'], 'warn', 1, { h: 1.0 }); nd(S, 'p3', X + 9.7, .4, 2.3, 'lead', 'line', 1, { h: 1.0 });
      arw(S, 'a1', [X + 2.65, .9], [X + 3.15, .9], 1); arw(S, 'a2', [X + 6.25, .9], [X + 6.55, .9], 1, { dash: 1 }); arw(S, 'a3', [X + 9.45, .9], [X + 9.65, .9], 1, { dash: 1 }); lbl(S, 'tm', X + 5.9, 1.6, '15m', 'm w', 1);
      lbl(S, 'n1', X, 6.6, ['응답이 없으면 정해진 시간 뒤 다음 사람에게', 'no ack within the window escalates to the next person'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'rb', X + 3.2, 2.3, 7.6, ['런북: 확인 → 조치', 'runbook: check → act'], 'ok', 2, { h: 1.0 }); ed(S, 'rbe', [X + 4.7, 1.45], [X + 4.7, 2.25], 2, { color: 'ok' });
      lbl(S, 'n2', X, 6.6, ['새벽에 처음 보는 사람도 따라 할 수 있게', 'so a sleepy first-timer can follow it at 3 a.m.'], 'g', 2, { off: 3, w: 12 });
      [1, 0, 3, 0, 1, 0, 0].forEach((v, i) => { sw(S, 'pg' + i, X + i * 1.7, 5.4 - v * .5, 1.2, v * .5 + .05, tint(v > 2 ? 'danger' : 'accent', 55), 3, { css: 'border:0', off: 4 }); lbl(S, 'pd' + i, X + i * 1.7, 5.5, 'MTWTFSS'[i], 'm', 3, { off: 4 }); });
      lbl(S, 'n3', X, 6.6, ['밤 호출 횟수를 추적해 줄이고, 부담은 보상해요', 'track night pages, drive them down, compensate the load'], 'w', 3, { off: 4, w: 12 });
      [['Seoul', 'accent'], ['Berlin', 'ok'], ['SF', 'warn']].forEach(([t, c], i) => { nd(S, 'fs' + i, X + i * 4.1, 3.8, 3.8, t, c, 4, { h: 1.0 }); lbl(S, 'fh' + i, X + i * 4.1, 4.95, '8h', 'm', 4); });
      lbl(S, 'n4', X, 6.6, ['여러 시간대 팀이 낮 시간에 돌아가며 맡아요', 'teams in several time zones cover their own daytime'], 'a', 4, { w: 12 });
    },
    notes: [['온콜은 정해진 기간 동안 장애 알림을 받는 당번이에요 · 1차가 정해진 시간(예: 15분) 안에 응답하지 않으면 2차, 그다음 리드에게 자동으로 넘어가요', 'on-call is a rotation for receiving incident alerts; if the primary does not acknowledge within a window such as 15 minutes, it escalates to the secondary and then a lead'], ['모든 알림에는 무엇을 확인하고 어떻게 조치할지 적힌 런북을 연결해요 · 처음 겪는 사람도 새벽에 따라 할 수 있어야 해요', 'every alert links a runbook stating what to check and how to act, so even a first-timer can follow it in the middle of the night'], ['근무 시간 밖 호출 횟수를 추적해 시끄러운 알림부터 고치고, 온콜 부담은 휴식이나 수당으로 보상해요 · 지친 사람은 실수를 해요', 'track out-of-hours pages, fix the noisiest alerts first, and compensate on-call load with time off or pay, because exhausted people make mistakes'], ['여러 시간대에 팀이 있으면 각자의 낮 시간에 돌아가며 맡는 follow-the-sun 방식으로 밤샘을 없애요 · 교대 때는 진행 중인 일을 인계해요', 'teams across time zones can use follow-the-sun so each covers its own daytime and no one works nights, handing off ongoing issues at each shift change']],
    fin: [['온콜: 자동 에스컬레이션 · 런북 · 줄이고 보상하는 호출 · 시간대 교대로 지속 가능하게', 'sustainable on-call relies on escalation, runbooks, fewer and compensated pages and time-zone rotation', 'opx-xs opx-a'], ['PagerDuty · Opsgenie 같은 도구로 운영해요', 'tools such as PagerDuty or Opsgenie run it'], ['교대 후 알림 품질을 함께 회고해요', 'review alert quality after each shift']],
    caps: [['에스컬레이션', 'Escalation'], ['런북', 'Runbooks'], ['호출 줄이기', 'Fewer pages'], ['시간대 교대', 'Follow the sun'], ['온콜 운영', 'Running on-call']]
  });
}

/* ===== DevOps · pipelines in depth ===== */
function sPipeline() {
  return CW('op-pipeline', {
    code: ['stages:', ['  lint → unit → build   # 빠른 검사 먼저', '  lint → unit → build   # fast checks first'], ['  integration ∥ security # 병렬', '  integration ∥ security # in parallel'], '  deploy:staging → e2e → deploy:prod', ['# 실패하면 즉시 멈추고 알림', '# stop and notify on the first failure'], ['# 목표: 10분 안에 피드백', '# goal: feedback within 10 minutes']],
    hl: [[1, 1, 'ok'], [2, 1], [4, 1, 'danger'], [5, 1, 'warn']],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4, st = [['lint', 0, 0], ['unit', 1, 0], ['build', 2, 0], ['integ', 0, 1], ['sec', 1, 1], ['stage', 0, 2], ['e2e', 1, 2], ['prod', 2, 2]];
      st.forEach(([t, j, r], i) => nd(S, 'p' + i, X + (r === 1 ? 1.5 + j * 4.5 : j * 4.1), .5 + r * 1.7, r === 1 ? 4.0 : 3.8, t, r === 0 ? 'ok' : r === 1 ? 'accent' : 'warn', 0, { h: 1.0 }));
      lbl(S, 't0', X, 1.6, '30s', 'm g', 1, { off: 3 }); lbl(S, 't1', X + 4.1, 1.6, '1m', 'm g', 1, { off: 3 }); lbl(S, 't2', X + 8.2, 1.6, '2m', 'm g', 1, { off: 3 });
      lbl(S, 'n1', X, 6.6, ['싸고 빠른 검사를 앞에 · 실패할 확률이 높은 것부터', 'cheap, fast checks go first, where failures are most likely'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'pl', X + 1.5, 3.3, ['동시에 실행', 'run together'], 'm a', 2); lbl(S, 'n2', X, 6.6, ['서로 독립인 단계는 병렬로 돌려 시간을 줄여요', 'independent stages run in parallel to save time'], 'a', 2, { off: 3, w: 12 });
      sw(S, 'xr', X + 4.1, .5, 3.8, 1.0, 'rgba(220,40,40,.25)', 3, { css: 'z-index:4', off: 4 }); sw(S, 'gr', X, 2.2, 12.0, 3.0, 'rgba(160,160,160,.35)', 3, { css: 'z-index:4', off: 4 }); lbl(S, 'xl', X + 4.1, 1.6, ['실패 → 중단', 'failed → stop'], 'm r', 3, { off: 4 });
      lbl(S, 'n3', X, 6.6, ['하나라도 깨지면 바로 멈추고 작성자에게 알려요', 'any failure stops the run and pings the author'], 'r', 3, { off: 4, w: 12 });
      chip(S, 'tt', X, 5.3, 12.0, ['커밋 → 피드백 10분 이내', 'commit → feedback < 10 min'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['느린 파이프라인은 큰 배치와 우회를 부르기 때문이에요', 'slow pipelines invite big batches and workarounds'], 'a', 4, { w: 12 });
    },
    notes: [['파이프라인은 단계 순서가 중요해요 · 린트와 단위 테스트처럼 싸고 빠르며 자주 깨지는 검사를 앞에 두면 실패를 가장 빨리 알 수 있어요', 'stage order matters: cheap, fast and frequently failing checks such as linting and unit tests go first so failures surface soonest'], ['통합 테스트와 보안 검사처럼 서로 의존하지 않는 단계는 병렬로 돌려 전체 시간을 줄여요', 'independent stages such as integration tests and security scans run in parallel to cut total time'], ['한 단계라도 실패하면 뒤 단계는 건너뛰고 바로 작성자에게 알려요(fail fast) · 깨진 결과물은 절대 다음 환경으로 넘어가지 않아요', 'a failing stage skips the rest and notifies the author right away (fail fast), so broken artifacts never reach the next environment'], ['커밋부터 피드백까지 10분 안팎을 목표로 해요 · 파이프라인이 느리면 사람들이 변경을 크게 묶거나 검사를 우회하기 시작해요', 'aim for roughly ten minutes from commit to feedback, because slow pipelines push people toward big batches and skipped checks']],
    fin: [['파이프라인 설계: 빠른 검사 먼저 · 독립 단계는 병렬 · 실패는 즉시 중단 · 짧은 피드백', 'pipeline design: fast checks first, parallel independent stages, stop on failure, short feedback', 'opx-xs opx-a'], ['불안정한(flaky) 테스트는 바로 격리하고 고쳐요', 'quarantine and fix flaky tests promptly'], ['파이프라인 정의도 코드로 리뷰해요', 'review pipeline definitions as code']],
    caps: [['빠른 검사 먼저', 'Fast checks first'], ['병렬 단계', 'Parallel stages'], ['즉시 중단', 'Fail fast'], ['피드백 시간', 'Feedback time'], ['파이프라인 설계', 'Pipeline design']]
  });
}

function sGha() {
  return CW('op-gha', {
    code: ['on:', '  pull_request:', '  push: { branches: [main] }', 'jobs:', '  test:', '    runs-on: ubuntu-latest', '    strategy:', '      matrix: { node: [20, 22] }', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci && npm test'],
    hl: [[0, 3], [3, 3, 'ok'], [6, 2, 'warn'], [8, 3]],
    lh: 1.12,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'e1', X, .5, 4.6, 'pull_request', 'line', 1, { h: 1.0 }); nd(S, 'e2', X, 1.8, 4.6, 'push main', 'line', 1, { h: 1.0 }); nd(S, 'wf', X + 5.4, 1.1, 3.6, 'workflow', 'accent', 1, { h: 1.0 }); arw(S, 'ea1', [X + 4.65, 1.0], [X + 5.35, 1.45], 1); arw(S, 'ea2', [X + 4.65, 2.3], [X + 5.35, 1.75], 1);
      lbl(S, 'n1', X, 6.6, ['on: 어떤 이벤트에 워크플로를 실행할지', 'on: which events trigger the workflow'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'rn', X + 5.4, 3.0, 3.6, ['러너 VM', 'runner VM'], 'ok', 2, { h: 1.0 }); arw(S, 'ra', [X + 7.2, 2.15], [X + 7.2, 2.95], 2, { color: 'ok' });
      lbl(S, 'n2', X, 6.6, ['잡마다 새 러너에서 실행 · 잡끼리는 기본이 병렬', 'each job gets a fresh runner; jobs run in parallel by default'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'm1', X + 9.4, 2.4, 2.6, 'node 20', 'warn', 3, { h: 1.0 }); nd(S, 'm2', X + 9.4, 3.6, 2.6, 'node 22', 'warn', 3, { h: 1.0 }); arw(S, 'ma1', [X + 9.05, 3.3], [X + 9.35, 2.9], 3, { color: 'warn' }); arw(S, 'ma2', [X + 9.05, 3.6], [X + 9.35, 4.1], 3, { color: 'warn' });
      lbl(S, 'n3', X, 6.6, ['매트릭스: 조합마다 잡을 복제해 동시에 시험', 'a matrix copies the job for each combination'], 'w', 3, { off: 4, w: 12 });
      ['checkout ✓', 'npm ci ✓', 'npm test ✓'].forEach((t, i) => lbl(S, 'sp' + i, X, 3.0 + i * .7, t, 'm g', 4));
      lbl(S, 'n4', X, 6.6, ['steps: uses는 공유 액션, run은 셸 명령', 'steps: uses runs a shared action; run runs shell commands'], 'a', 4, { w: 12 });
    },
    notes: [['GitHub Actions 워크플로는 .github/workflows 아래의 YAML 파일이에요 · on에 PR 생성, main 푸시, 정해진 시간 같은 실행 조건을 적어요', 'GitHub Actions workflows are YAML files under .github/workflows, and on lists triggers such as pull requests, pushes to main or schedules'], ['jobs 아래 잡마다 runs-on으로 정한 새 러너(가상 머신)에서 실행되고, needs로 순서를 주지 않으면 잡끼리는 병렬로 돌아요', 'each job runs on a fresh runner (a virtual machine) chosen by runs-on, and jobs run in parallel unless needs orders them'], ['matrix는 Node 20과 22처럼 여러 조합으로 같은 잡을 복제해 동시에 시험해요 · 운영체제나 DB 버전 조합에도 써요', 'a matrix copies the job across combinations such as Node 20 and 22, also useful for operating systems or database versions'], ['steps는 순서대로 실행돼요 · uses는 actions/checkout 같은 공유 액션을, run은 셸 명령을 실행하고, 비밀값은 secrets로 넘겨요', 'steps run in order: uses invokes shared actions such as actions/checkout, run executes shell commands, and secrets are passed in through secrets']],
    fin: [['GitHub Actions: on(언제) · jobs와 runs-on(어디서) · matrix(조합) · steps(무엇을)', 'GitHub Actions: on (when), jobs and runs-on (where), matrix (combinations), steps (what)', 'opx-xs opx-a'], ['서드파티 액션은 커밋 SHA로 고정해요', 'pin third-party actions to a commit SHA'], ['GITHUB_TOKEN 권한은 최소로', 'keep GITHUB_TOKEN permissions minimal']],
    caps: [['트리거', 'Triggers'], ['잡과 러너', 'Jobs and runners'], ['매트릭스', 'Matrices'], ['스텝', 'Steps'], ['GitHub Actions', 'GitHub Actions']]
  });
}

function sCache() {
  return CW('op-cache', {
    code: ['- uses: actions/cache@v4', '  with:', '    path: ~/.npm', "    key: npm-${{ hashFiles('*lock.json') }}", ['# 락파일이 같으면 적중 → 설치 생략', '# same lockfile → hit, skip install'], ['# Docker: 자주 바뀌는 레이어를 뒤로', '# Docker: put changing layers last'], ['# 원격 캐시: Turborepo · Nx · Bazel', '# remote cache: Turborepo, Nx, Bazel']],
    hl: [[3, 1], [4, 1, 'ok'], [5, 1, 'warn'], [6, 1]],
    lh: 1.2,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'lk', X, .5, 4.6, 'package-lock', 'line', 1, { h: 1.0 }); arw(S, 'ha', [X + 4.65, 1.0], [X + 5.75, 1.0], 1); lbl(S, 'hl', X + 4.6, .1, 'hash', 'm', 1); nd(S, 'ky', X + 5.8, .5, 3.8, 'npm-3f9a', 'accent', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.6, ['의존성 목록의 해시로 캐시 키를 만들어요', 'the cache key is a hash of the dependency list'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'mi', X, 1.9, 'miss', 'm r', 2, { off: 3 }); sw(S, 'mb', X + 2.0, 1.95, 8.0, .5, tint('danger', 50), 2, { css: 'border:0', off: 3 }); lbl(S, 'mt', X + 10.2, 1.9, '4m', 'm r', 2, { off: 3 });
      lbl(S, 'hi', X, 2.7, 'hit', 'm g', 2, { off: 3 }); sw(S, 'hb', X + 2.0, 2.75, 2.0, .5, tint('ok', 55), 2, { css: 'border:0', off: 3 }); lbl(S, 'ht', X + 4.2, 2.7, '1m', 'm g', 2, { off: 3 });
      lbl(S, 'n2', X, 6.6, ['락파일이 그대로면 내려받기와 설치를 건너뛰어요', 'unchanged lockfiles skip downloads and installs'], 'g', 2, { off: 3, w: 12 });
      [['FROM node:22', 'line'], ['deps: npm ci', 'ok'], ['COPY . . (code)', 'warn']].forEach(([t, c], i) => nd(S, 'ly' + i, X, 5.0 - i * 1.1, 8.6, t, c, 3, { h: 1.0 })); lbl(S, 'lyl', X + 8.9, 3.0, ['여기만 재빌드', 'rebuilt'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['자주 바뀌는 코드 복사는 의존성 설치 뒤에 둬요', 'copy code after installing deps so deps stay cached'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['원격 캐시는 CI와 개발자 PC가 결과를 함께 써요', 'remote caches share build outputs across CI and laptops'], 'a', 4, { w: 12 });
    },
    notes: [['CI 러너는 매번 깨끗한 상태로 시작해서 의존성을 매번 새로 내려받아요 · 캐시는 package-lock.json 같은 락파일의 해시를 키로 저장해 둬요', 'CI runners start clean every time and re-download dependencies, so caches store them under a key built from a lockfile hash such as package-lock.json'], ['락파일이 바뀌지 않으면 키가 같아 캐시가 적중하고, 다운로드와 설치를 건너뛰어 몇 분을 아껴요 · 바뀌면 새 키로 다시 저장해요', 'an unchanged lockfile means the same key and a cache hit that skips downloads and installs, saving minutes, while changes save under a new key'], ['Docker 빌드는 레이어 단위로 캐시돼요 · 의존성 설치를 먼저 하고 자주 바뀌는 코드 복사를 뒤에 두면 코드만 바뀌어도 설치 레이어를 재사용해요', 'Docker builds cache by layer, so installing dependencies before copying frequently changing code reuses the install layer when only code changes'], ['Turborepo, Nx, Bazel 같은 도구는 작업 입력의 해시로 빌드·테스트 결과를 원격 캐시에 저장해 CI와 개발자 PC가 함께 재사용해요', 'tools such as Turborepo, Nx and Bazel store build and test outputs in remote caches keyed by input hashes, shared by CI and developer machines']],
    fin: [['빌드 캐시: 입력의 해시를 키로, 바뀐 것만 다시 · 레이어 순서와 원격 캐시로 더 빠르게', 'build caching keys on input hashes and redoes only what changed, sped up by layer order and remote caches', 'opx-xs opx-a'], ['캐시에 비밀값이 들어가지 않게 조심해요', 'keep secrets out of caches'], ['오래된 캐시는 용량 한도로 자동 정리돼요', 'old caches are evicted by size limits']],
    caps: [['캐시 키', 'Cache keys'], ['적중과 미스', 'Hits and misses'], ['레이어 캐시', 'Layer caching'], ['원격 캐시', 'Remote caching'], ['빌드 캐시', 'Build caching']]
  });
}

function sArtifact() {
  return CW('op-artifact', {
    code: ['docker build -t app:3f9a1c2 .', 'docker push registry/app:3f9a1c2', ['# 같은 이미지를 환경마다 승격', '# promote the same image per env'], '# dev → staging → prod  (app:3f9a1c2)', ['# 환경 차이는 설정으로만', '# environments differ only in config'], ['# latest 대신 커밋 SHA·다이제스트', '# commit SHA or digest, never latest']],
    hl: [[0, 2], [2, 2, 'ok'], [4, 1, 'warn'], [5, 1, 'danger']],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'src', X, .5, 2.6, 'commit', 'line', 1, { h: 1.0 }); arw(S, 'sa', [X + 2.65, 1.0], [X + 3.35, 1.0], 1); nd(S, 'img', X + 3.4, .5, 4.4, 'app:3f9a1c2', 'accent', 1, { h: 1.0 }); arw(S, 'ia', [X + 7.85, 1.0], [X + 8.55, 1.0], 1); nd(S, 'rg', X + 8.6, .5, 3.4, 'registry', 'ok', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.6, ['빌드는 딱 한 번 · 커밋 SHA로 태그해 레지스트리에', 'build once, tag with the commit SHA, push to a registry'], 'a', 1, { off: 2, w: 12 });
      [['dev', 'line'], ['staging', 'warn'], ['prod', 'ok']].forEach(([t, c], i) => { tbox(S, 'en' + i, X + i * 4.1, 2.0, 3.8, 2.4, t, c, 2); nd(S, 'ei' + i, X + .2 + i * 4.1, 2.75, 3.4, '3f9a1c2', 'accent', 2, { h: 1.0 }); }); arw(S, 'pa1', [X + 3.65, 3.2], [X + 4.25, 3.2], 2, { color: 'ok' }); arw(S, 'pa2', [X + 7.75, 3.2], [X + 8.35, 3.2], 2, { color: 'ok' }); zup(S, ['pa1', 'pa2']);
      lbl(S, 'n2', X, 6.6, ['검증된 바로 그 이미지를 다음 환경으로 승격해요', 'promote the exact image that passed the previous stage'], 'g', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => lbl(S, 'cf' + i, X + .2 + i * 4.1, 3.85, 'DB_URL=' + ['d', 's', 'p'][i], 'm w', 3));
      lbl(S, 'n3', X, 6.6, ['환경마다 다른 것은 환경 변수·설정뿐이에요', 'only environment variables and config differ'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'lt', X, 4.9, 5.8, ['latest ✗', 'latest ✗'], 'danger', 4, { h: 1.0 }); chip(S, 'dg', X + 6.2, 4.9, 5.8, 'sha256:9c1e… ✓', 'ok', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['움직이는 태그는 무엇이 배포됐는지 흐려요', 'moving tags blur what actually got deployed'], 'r', 4, { w: 12 });
    },
    notes: [['빌드는 파이프라인에서 딱 한 번 해요 · 결과 이미지에 커밋 SHA 태그를 붙여 레지스트리(ECR, Artifact Registry, GHCR)에 올려요', 'build exactly once in the pipeline and push the image, tagged with its commit SHA, to a registry such as ECR, Artifact Registry or GHCR'], ['개발, 스테이징, 운영에 같은 이미지를 차례로 승격(promote)해요 · 환경마다 다시 빌드하면 테스트한 것과 다른 것이 배포될 수 있어요', 'the same image is promoted through dev, staging and production, because rebuilding per environment can ship something other than what was tested'], ['환경 사이의 차이는 DB 주소 같은 설정과 환경 변수로만 둬요 · 코드와 이미지는 똑같아야 해요', 'differences between environments live only in config and environment variables such as database URLs, while code and image stay identical'], ['latest처럼 움직이는 태그는 지금 무엇이 돌고 있는지 흐리게 해요 · 커밋 SHA나 sha256 다이제스트로 고정해야 추적과 롤백이 정확해요', 'moving tags such as latest blur what is running, so pin commit SHAs or sha256 digests for exact tracing and rollback']],
    fin: [['한 번 빌드, 여러 번 배포: 불변 산출물을 SHA로 고정하고 환경 사이로 승격해요', 'build once, deploy many: pin an immutable artifact by SHA and promote it across environments', 'opx-xs opx-a'], ['라이브러리는 패키지 저장소에 버전으로 올려요', 'libraries go to package registries by version'], ['산출물 보관 기간과 정리 규칙을 정해요', 'set retention and cleanup rules for artifacts']],
    caps: [['한 번 빌드', 'Build once'], ['승격', 'Promotion'], ['환경별 설정', 'Per-environment config'], ['고정된 버전', 'Pinned versions'], ['불변 산출물', 'Immutable artifacts']]
  });
}

function sPreview() {
  return CW('op-preview', {
    code: [['# PR #142 열림', '# PR #142 opened'], '→ deploy pr-142.preview.acme.dev', ['# 리뷰어·기획자가 실제 화면으로 확인', '# reviewers check the real thing'], ['# 테스트 데이터로 채운 전용 DB', '# a dedicated DB with seed data'], ['# PR이 닫히면 자동 삭제 → 비용 0', '# deleted on close → no idle cost']],
    hl: [[0, 2], [2, 1, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pr', X, .5, 3.0, 'PR #142', 'accent', 1, { h: 1.0 }); arw(S, 'pa', [X + 3.05, 1.0], [X + 4.15, 1.0], 1); tbox(S, 'env', X + 4.2, .3, 7.8, 2.6, 'pr-142', 'ok', 1, { tc: 'g' }); nd(S, 'ap', X + 4.6, 1.1, 3.4, 'app', 'ok', 1, { h: 1.0 }); nd(S, 'db', X + 8.3, 1.1, 3.4, 'db', 'line', 1, { h: 1.0 });
      lbl(S, 'n1', X, 6.6, ['PR마다 독립된 임시 환경이 자동으로 떠요', 'every PR gets its own temporary environment'], 'a', 1, { off: 2, w: 12 });
      [['QA', 0], ['PM', 1], [['디자이너', 'designer'], 2]].forEach(([t, i]) => nd(S, 'rv' + i, X + i * 4.1, 3.4, 3.8, t, 'warn', 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['코드 리뷰와 함께 실제 동작을 링크 하나로 확인', 'one link shows the real behavior next to the code review'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'sd', X + 8.3, 2.25, 'seed', 'm', 3); lbl(S, 'n3', X, 6.6, ['운영 데이터 대신 테스트 데이터 · 서로 간섭 없음', 'seed data instead of production data; no interference'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'rm', X + 4.2, .3, 7.8, 2.6, 'rgba(220,40,40,.2)', 4, { css: 'z-index:4' }); chip(S, 'cl', X, 4.9, 12.0, ['PR 병합·닫힘 → 환경 자동 삭제', 'merged or closed → env deleted'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['남겨진 환경이 비용이 되지 않게 TTL도 걸어요', 'add TTLs so forgotten environments do not cost money'], 'r', 4, { w: 12 });
    },
    notes: [['프리뷰 환경은 PR이 열릴 때마다 그 브랜치를 pr-142.preview.acme.dev 같은 주소에 자동으로 배포하는 임시 환경이에요', 'preview environments deploy each pull request’s branch automatically to its own temporary address, such as pr-142.preview.acme.dev'], ['리뷰어는 코드뿐 아니라 실제로 돌아가는 화면을 링크 하나로 확인하고, QA·기획·디자인도 병합 전에 피드백할 수 있어요', 'reviewers see the running result from one link alongside the code, and QA, product and design can give feedback before merging'], ['운영 데이터 대신 테스트 데이터(seed)를 채운 전용 DB를 써서 환경끼리, 그리고 운영과 서로 간섭하지 않아요', 'each environment uses its own database filled with seed data instead of production data, so environments never interfere with each other or production'], ['PR이 병합되거나 닫히면 환경을 자동으로 지우고, 잊힌 환경을 위해 TTL도 걸어 비용이 새지 않게 해요 · Vercel, Netlify는 이를 기본으로 제공해요', 'merged or closed PRs delete their environments automatically, with TTLs catching forgotten ones, and platforms such as Vercel and Netlify do this by default']],
    fin: [['프리뷰 환경: PR마다 임시 환경을 자동 생성·삭제해 병합 전에 실제 동작을 확인해요', 'preview environments are created and deleted per PR so behavior is checked before merging', 'opx-xs opx-a'], ['쿠버네티스에서는 네임스페이스로 나눠요', 'on Kubernetes, isolate them by namespace'], ['외부에 노출되니 접근 제한을 걸어요', 'they are reachable, so restrict access']],
    caps: [['PR마다 환경', 'An environment per PR'], ['함께 확인', 'Reviewing together'], ['격리된 데이터', 'Isolated data'], ['자동 정리', 'Automatic cleanup'], ['프리뷰 환경', 'Preview environments']]
  });
}

function sSemver() {
  return CW('op-semver', {
    code: ['feat: add coupon API          → 1.4.0', 'fix: rounding in totals       → 1.4.1', 'feat!: drop v1 endpoints      → 2.0.0', '# MAJOR.MINOR.PATCH', ['# 커밋 규칙 → 버전·변경 기록 자동', '# commit rules → version, changelog'], ['# semantic-release · release-please', '# semantic-release, release-please']],
    hl: [[3, 1], [0, 3, 'ok'], [4, 1, 'warn'], [5, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      [['MAJOR', 'danger', ['호환 깨짐', 'breaking']], ['MINOR', 'ok', ['기능 추가', 'feature']], ['PATCH', 'accent', ['버그 수정', 'fix']]].forEach(([t, c, d], i) => { nd(S, 'v' + i, X + i * 4.1, .5, 3.8, t, c, 1, { h: 1.0 }); lbl(S, 'vd' + i, X + i * 4.1, 1.6, d, 'm', 1); });
      lbl(S, 'n1', X, 6.6, ['숫자만 봐도 업그레이드가 안전한지 알 수 있어요', 'the number alone tells you whether an upgrade is safe'], 'a', 1, { off: 2, w: 12 });
      [['1.3.2 → 1.4.0', 'ok'], ['1.4.0 → 1.4.1', 'accent'], ['1.4.1 → 2.0.0', 'danger']].forEach(([t, c], i) => lbl(S, 'b' + i, X, 2.5 + i * .7, t, 'm ' + (c === 'ok' ? 'g' : c === 'danger' ? 'r' : 'a'), 2));
      lbl(S, 'n2', X, 6.6, ['feat는 MINOR, fix는 PATCH, !는 MAJOR를 올려요', 'feat bumps MINOR, fix bumps PATCH, ! bumps MAJOR'], 'g', 2, { off: 3, w: 12 });
      tbox(S, 'cl', X + 6.0, 2.3, 6.0, 2.6, 'CHANGELOG', 'warn', 3, { tc: 'w' }); lbl(S, 'c1', X + 6.3, 3.2, '## 2.0.0', 'm', 3); lbl(S, 'c2', X + 6.3, 3.9, '- drop v1 ⚠', 'm r', 3);
      lbl(S, 'n3', X, 6.6, ['버전 결정·태그·변경 기록·릴리스를 자동으로', 'versioning, tags, changelog and release, all automated'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'rg', X, 5.3, 12.0, ['^1.4.0 → 1.x 자동 허용, 2.0 ✗', '^1.4.0 → accepts 1.x, not 2.0'], 'accent', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['의존하는 쪽은 범위로 안전한 업데이트만 받아요', 'consumers take only safe updates through ranges'], 'a', 4, { w: 12 });
    },
    notes: [['유의적 버전(SemVer)은 MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요 · 호환이 깨지면 MAJOR, 기능이 추가되면 MINOR, 버그만 고치면 PATCH를 올려요', 'semantic versioning (SemVer) signals change type with MAJOR.MINOR.PATCH: breaking changes bump MAJOR, new features MINOR and bug fixes PATCH'], ['Conventional Commits 규칙으로 커밋 메시지를 feat:, fix:처럼 쓰면 도구가 다음 버전을 계산할 수 있어요 · 느낌표(!)나 BREAKING CHANGE는 MAJOR예요', 'with Conventional Commits, messages such as feat: or fix: let tools compute the next version, and ! or BREAKING CHANGE means MAJOR'], ['semantic-release나 release-please는 병합된 커밋을 읽어 버전 결정, Git 태그, CHANGELOG 작성, 패키지 배포까지 자동으로 해요', 'semantic-release and release-please read merged commits to decide versions, tag Git, write the CHANGELOG and publish packages automatically'], ['의존하는 쪽은 ^1.4.0 같은 범위로 1.x의 안전한 업데이트만 자동으로 받고, 2.0 같은 MAJOR는 직접 확인하고 올려요 · 0.x는 언제든 깨질 수 있다는 뜻이에요', 'consumers use ranges such as ^1.4.0 to accept safe 1.x updates automatically and adopt MAJOR versions deliberately, while 0.x means anything may break']],
    fin: [['유의적 버전: 숫자로 호환성을 약속하고, 커밋 규칙으로 버전과 변경 기록을 자동화해요', 'semantic versioning promises compatibility in numbers, and commit rules automate versions and changelogs', 'opx-xs opx-a'], ['배포된 버전은 다시 덮어쓰지 않아요', 'never overwrite a published version'], ['락파일로 실제 설치 버전을 고정해요', 'lockfiles pin what actually installs']],
    caps: [['세 숫자', 'Three numbers'], ['커밋에서 버전으로', 'From commits to versions'], ['자동 릴리스', 'Automated releases'], ['버전 범위', 'Version ranges'], ['유의적 버전', 'Semantic versioning']]
  });
}

/* ===== DevOps · containers and Kubernetes in practice ===== */
function sDockerfile() {
  return CW('op-dockerfile', {
    code: ['FROM node:22 AS build', 'WORKDIR /app', 'COPY package*.json ./', 'RUN npm ci', 'COPY . .', 'RUN npm run build', '', 'FROM gcr.io/distroless/nodejs22', 'COPY --from=build /app/dist /app', 'USER nonroot', 'CMD ["/app/server.js"]'],
    hl: [[0, 6], [7, 2, 'ok'], [2, 2, 'warn'], [9, 1, 'danger']],
    lh: 1.12,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'b', X, .4, 5.6, 3.2, 'build', 'accent', 1, { tc: 'a' }); ['node 22', 'npm deps', 'src + dist'].forEach((t, i) => lbl(S, 'bl' + i, X + .5, 1.25 + i * .7, '▪ ' + t, 'm', 1));
      lbl(S, 'bs', X, 3.8, '~1.1 GB', 'm r', 1); lbl(S, 'n1', X, 6.6, ['빌드 단계: 컴파일러·개발 의존성까지 전부 담은 큰 이미지', 'build stage: a big image with compilers and dev deps'], 'a', 1, { off: 2, w: 12 });
      tbox(S, 'r', X + 6.4, .4, 5.6, 2.4, 'runtime', 'ok', 2, { tc: 'g' }); ['distroless', 'dist only'].forEach((t, i) => lbl(S, 'rl' + i, X + 6.9, 1.25 + i * .7, '▪ ' + t, 'm g', 2)); arw(S, 'cp', [X + 5.65, 2.7], [X + 6.65, 1.9], 2, { color: 'ok' }); lbl(S, 'rs', X + 6.4, 3.0, '~150 MB', 'm g', 2);
      lbl(S, 'n2', X, 6.6, ['결과물만 작은 실행 이미지로 복사 · 셸·패키지 매니저 없음', 'copy only the output into a small runtime image, no shell'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['의존성 설치를 코드 복사보다 먼저 · 캐시가 오래 살아요', 'install deps before copying code so the cache survives'], 'w', 3, { off: 4, w: 12 }); chip(S, 'di', X, 4.6, 5.6, '.dockerignore', 'warn', 3, { h: 1.0 });
      chip(S, 'nr', X + 5.9, 4.6, 6.1, ['root ✗ → nonroot', 'root ✗ → nonroot'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['root로 실행하지 않기 · 취약점 스캔과 태그 고정', 'never run as root; scan images and pin tags'], 'r', 4, { w: 12 });
    },
    notes: [['멀티 스테이지 빌드의 첫 단계는 컴파일러와 개발 의존성까지 담은 큰 이미지에서 코드를 빌드해요', 'the first stage of a multi-stage build compiles the code in a large image with compilers and development dependencies'], ['두 번째 단계는 distroless나 alpine 같은 작은 베이스에 빌드 결과만 복사해요 · 이미지가 작아 배포가 빠르고 공격 표면도 줄어요', 'the second stage copies only the build output onto a small base such as distroless or alpine, speeding deployments and shrinking the attack surface'], ['package.json을 먼저 복사해 설치하고 코드는 나중에 복사해야 의존성 레이어 캐시가 살아요 · .dockerignore로 node_modules와 .git, 비밀 파일을 빼요', 'copying package.json and installing before copying code keeps the dependency layer cached, and .dockerignore excludes node_modules, .git and secret files'], ['USER로 root가 아닌 사용자로 실행해 탈출 피해를 줄이고, 베이스 이미지 태그를 고정하고 빌드 때 취약점을 스캔해요', 'USER runs the process as a non-root user to limit breakout damage, while pinned base tags and build-time vulnerability scans keep images safe']],
    fin: [['좋은 Dockerfile: 멀티 스테이지 · 작은 베이스 · 캐시 친화적 순서 · non-root', 'a good Dockerfile: multi-stage, small base, cache-friendly order, non-root', 'opx-xs opx-a'], ['ENTRYPOINT는 exec 형식으로 써서 신호를 받아요', 'use exec-form ENTRYPOINT so signals arrive'], ['레이어마다 지운 파일도 용량에 남아요', 'files deleted in later layers still take space']],
    caps: [['빌드 단계', 'The build stage'], ['실행 단계', 'The runtime stage'], ['레이어 순서', 'Layer order'], ['non-root', 'Non-root'], ['좋은 Dockerfile', 'A good Dockerfile']]
  });
}

function sCompose() {
  return CW('op-compose', {
    code: ['services:', '  api:', '    build: .', '    ports: ["3000:3000"]', '    env_file: .env.local', '    depends_on:', '      db: { condition: service_healthy }', '  db:', '    image: postgres:16', '    volumes: [pgdata:/var/lib/postgresql/data]'],
    hl: [[0, 5], [5, 2, 'ok'], [9, 1, 'warn'], [0, 1]],
    lh: 1.15,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'nw', X, .4, 12.0, 3.6, ['기본 네트워크', 'default network'], 'line', 1);
      nd(S, 'api', X + .5, 1.3, 4.0, 'api :3000', 'accent', 1, { h: 1.0 }); nd(S, 'db', X + 6.9, 1.3, 4.8, 'db (postgres)', 'ok', 1, { h: 1.0 }); arw(S, 'ad', [X + 4.55, 1.8], [X + 6.85, 1.8], 1); lbl(S, 'adl', X + 4.8, 2.4, 'db:5432', 'm', 1);
      lbl(S, 'n1', X, 6.6, ['서비스 이름이 곧 호스트 이름 · 한 명령으로 함께 실행', 'service names become hostnames; one command starts all'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'hc', X + 6.9, 2.6, 4.8, 'healthy ✓', 'ok', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['DB가 준비된 뒤에 API를 띄워요', 'the API starts only after the DB is healthy'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'vol', X + 6.9, 4.6, 4.8, 'pgdata', 'warn', 3, { h: 1.0 }); ed(S, 've', [X + 9.3, 3.65], [X + 9.3, 4.55], 3, { color: 'warn' });
      lbl(S, 'n3', X, 6.6, ['볼륨에 데이터를 둬서 컨테이너를 지워도 남아요', 'volumes keep data when containers are removed'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'up', X, 4.6, 6.6, 'docker compose up', 'accent', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['새 팀원도 명령 하나로 같은 개발 환경을 받아요', 'new teammates get the same dev setup with one command'], 'a', 4, { w: 12 });
    },
    notes: [['Docker Compose는 여러 컨테이너로 된 앱을 YAML 하나로 정의하고 docker compose up 한 번에 함께 띄워요 · 서비스들은 기본 네트워크로 연결돼요', 'Docker Compose defines a multi-container app in one YAML file and starts it with a single docker compose up, connecting services on a default network'], ['같은 네트워크 안에서는 서비스 이름이 곧 호스트 이름이라 API는 db:5432로 DB에 접속해요 · depends_on에 healthcheck 조건을 걸면 DB가 준비된 뒤 API가 떠요', 'service names act as hostnames on that network, so the API reaches db:5432, and depends_on with a health condition starts the API only once the database is ready'], ['이름 붙은 볼륨(pgdata)에 데이터를 두면 컨테이너를 지우고 다시 만들어도 데이터가 남아요', 'named volumes such as pgdata keep data even when containers are removed and recreated'], ['새 팀원도 저장소를 받고 명령 하나로 같은 개발 환경을 얻어요 · 운영 배포에는 보통 쿠버네티스나 관리형 컨테이너 서비스를 써요', 'new teammates clone the repository and get the same environment with one command, while production usually runs on Kubernetes or managed container services']],
    fin: [['Docker Compose: 여러 컨테이너를 하나의 파일로 정의해 로컬 개발·테스트 환경을 재현해요', 'Docker Compose defines multiple containers in one file to reproduce local dev and test setups', 'opx-xs opx-a'], ['CI의 통합 테스트에도 그대로 써요', 'reuse it for integration tests in CI'], ['override 파일로 환경별 차이를 둬요', 'override files hold per-environment tweaks']],
    caps: [['서비스와 네트워크', 'Services and networks'], ['준비 순서', 'Startup order'], ['볼륨', 'Volumes'], ['한 명령 개발 환경', 'One-command dev setup'], ['Docker Compose', 'Docker Compose']]
  });
}

function sK8sObjects() {
  return CW('op-k8s-objects', {
    code: ['kind: Deployment', 'spec:', '  replicas: 3', '  selector: { matchLabels: { app: api } }', '  template:', '    metadata: { labels: { app: api } }', '    spec:', '      containers:', '      - name: api', '        image: api:3f9a1c2'],
    hl: [[0, 3], [3, 3, 'ok'], [9, 1, 'warn'], [0, 1]],
    lh: 1.15,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'dp', X + 3.0, .4, 6.0, 'Deployment', 'accent', 0, { h: 1.0 }); nd(S, 'rs', X + 3.0, 2.0, 6.0, 'ReplicaSet v1', 'ok', 1, { h: 1.0 }); arw(S, 'dr', [X + 6.0, 1.45], [X + 6.0, 1.95], 1, { color: 'ok' });
      [0, 1, 2].forEach(i => { nd(S, 'p' + i, X + i * 4.1, 3.6, 3.8, 'pod', 'line', 1, { h: 1.0 }); ed(S, 'pe' + i, [X + 6.0, 3.05], [X + 1.9 + i * 4.1, 3.55], 1); });
      lbl(S, 'n1', X, 6.6, ['Deployment → ReplicaSet → 파드 3개를 유지', 'Deployment → ReplicaSet → keeps three pods'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => lbl(S, 'lb' + i, X + .2 + i * 4.1, 4.75, 'app=api', 'm g', 2)); lbl(S, 'n2', X, 6.6, ['라벨 셀렉터로 “내 파드”를 찾아요 · 서비스도 같은 방식', 'label selectors find “my pods”, and Services do the same'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'rs2', X + 9.2, 2.0, 2.8, 'RS v2', 'warn', 3, { h: 1.0 }); S.set('rs', 3, { opacity: '.45' });
      lbl(S, 'n3', X, 6.6, ['이미지를 바꾸면 새 ReplicaSet으로 점진 교체', 'a new image rolls out through a new ReplicaSet'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'x', X + 4.1, 3.6, 3.8, 1.0, 'rgba(220,40,40,.25)', 4, { css: 'z-index:4' }); lbl(S, 'rp', X + 4.1, 5.35, ['지워져도 다시 생성', 'recreated'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['파드는 언제든 사라질 수 있는 소모품이에요', 'pods are disposable and may vanish at any time'], 'a', 4, { w: 12 });
    },
    notes: [['Deployment는 “api 이미지로 파드 3개”라는 원하는 상태를 적은 객체예요 · 실제로는 Deployment가 ReplicaSet을 만들고, ReplicaSet이 파드 개수를 유지해요', 'a Deployment declares a desired state such as three pods of the api image; it creates a ReplicaSet, which keeps the pod count'], ['객체끼리는 이름이 아니라 app=api 같은 라벨과 셀렉터로 연결돼요 · 서비스도 같은 셀렉터로 트래픽 보낼 파드를 찾아요', 'objects link through labels and selectors such as app=api rather than names, and Services find their pods the same way'], ['이미지를 바꾸면 Deployment가 새 ReplicaSet을 만들고 새 파드를 늘리며 옛 파드를 줄여요 · 옛 ReplicaSet은 롤백용으로 남겨둬요', 'changing the image makes the Deployment create a new ReplicaSet, scaling new pods up and old ones down, while keeping the old ReplicaSet for rollback'], ['파드는 노드 장애나 재배치로 언제든 사라지고 새 IP로 다시 생겨요 · 그래서 파드를 직접 만들지 않고 Deployment 같은 컨트롤러에 맡겨요', 'pods disappear with node failures or rescheduling and come back with new IPs, so they are managed through controllers such as Deployments rather than created directly']],
    fin: [['쿠버네티스 객체: Deployment가 ReplicaSet을, ReplicaSet이 파드를 관리 · 연결은 라벨로', 'Kubernetes objects: Deployments manage ReplicaSets, which manage pods, all linked by labels', 'opx-xs opx-a'], ['배치 작업은 Job·CronJob을 써요', 'batch work uses Jobs and CronJobs'], ['노드마다 하나씩은 DaemonSet', 'one per node is a DaemonSet']],
    caps: [['객체의 계층', 'The object hierarchy'], ['라벨과 셀렉터', 'Labels and selectors'], ['롤아웃', 'Rollouts'], ['소모품 파드', 'Disposable pods'], ['쿠버네티스 객체', 'Kubernetes objects']]
  });
}

function sK8sConfig() {
  return CW('op-k8s-config', {
    code: ['kind: ConfigMap', 'data: { LOG_LEVEL: info }', '---', 'kind: Secret', 'data: { DB_PASS: cDRzc3cwcmQ= }', ['# base64는 암호화가 아니에요', '# base64 is not encryption'], 'envFrom: [{ configMapRef: { name: app } }]', ['# 또는 파일로 마운트해 바로 갱신', '# or mount as files for live updates']],
    hl: [[0, 2], [3, 3, 'danger'], [6, 1, 'ok'], [7, 1]],
    lh: 1.2,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'img', X, .4, 4.2, 'api:3f9a1c2', 'accent', 0, { h: 1.0 }); nd(S, 'cm', X + 7.4, .4, 4.6, 'ConfigMap', 'ok', 1, { h: 1.0 }); lbl(S, 'cml', X + 7.4, 1.55, 'LOG_LEVEL=info', 'm g', 1);
      lbl(S, 'n1', X, 6.6, ['설정을 이미지 밖에 둬서 같은 이미지를 어디서나', 'config lives outside the image so it runs anywhere'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'sc', X + 7.4, 2.3, 4.6, 'Secret', 'danger', 2, { h: 1.0 }); lbl(S, 'scl', X + 7.4, 3.45, 'cDRzc3cwcmQ=', 'm r', 2);
      lbl(S, 'n2', X, 6.6, ['Secret은 base64일 뿐 · 저장소 암호화·RBAC·외부 비밀 저장소로 보호', 'Secrets are only base64: add encryption at rest, RBAC, external stores'], 'r', 2, { off: 3, w: 12 });
      nd(S, 'pod', X, 3.0, 4.2, 'pod', 'line', 3, { h: 1.0 }); arw(S, 'e1', [X + 7.35, .9], [X + 4.25, 3.3], 3, { color: 'ok' }); arw(S, 'e2', [X + 7.35, 2.8], [X + 4.25, 3.6], 3, { color: 'danger' }); lbl(S, 'env', X, 4.15, 'env', 'm g', 3);
      lbl(S, 'n3', X, 6.6, ['환경 변수로 주입 · 바꾸면 파드를 재시작해야 반영', 'injected as env vars; changes need a pod restart'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'vol', X, 4.85, '/etc/config/', 'm a', 4); lbl(S, 'n4', X, 6.6, ['파일로 마운트하면 잠시 뒤 자동으로 갱신돼요', 'mounted as files, values refresh after a short delay'], 'a', 4, { w: 12 });
    },
    notes: [['ConfigMap은 로그 수준이나 기능 설정 같은 일반 설정을 이미지 밖에 두는 객체예요 · 같은 이미지를 환경마다 다른 설정으로 실행할 수 있어요', 'ConfigMaps hold ordinary settings such as log levels or feature options outside the image, so one image runs with different config per environment'], ['Secret은 비밀번호처럼 민감한 값을 담지만 기본은 base64 인코딩일 뿐이에요 · etcd 저장 시 암호화, RBAC 제한, External Secrets 같은 외부 저장소 연동으로 보호해요', 'Secrets carry sensitive values such as passwords but are only base64-encoded by default, so protect them with encryption at rest in etcd, RBAC limits and external stores via External Secrets'], ['envFrom이나 env로 환경 변수로 넣으면 간단하지만, 값이 바뀌어도 파드를 재시작해야 반영돼요', 'injecting them as environment variables with envFrom or env is simple, but changes apply only after the pod restarts'], ['볼륨으로 마운트하면 파일로 읽히고, 값이 바뀌면 잠시 뒤 파일도 자동으로 갱신돼서 앱이 다시 읽을 수 있어요', 'mounting them as volumes exposes files that refresh automatically after a short delay, letting the app reload them']],
    fin: [['ConfigMap과 Secret: 설정은 이미지 밖에 · 비밀은 base64 이상의 보호가 필요해요', 'ConfigMaps and Secrets keep config out of images, and secrets need protection beyond base64', 'opx-xs opx-a'], ['비밀을 Git에 넣을 땐 Sealed Secrets·SOPS로 암호화', 'encrypt secrets in Git with Sealed Secrets or SOPS'], ['설정 변경 시 해시 주석으로 롤아웃을 일으켜요', 'a checksum annotation can trigger rollouts']],
    caps: [['ConfigMap', 'ConfigMaps'], ['Secret', 'Secrets'], ['환경 변수', 'Environment variables'], ['파일 마운트', 'Mounted files'], ['설정과 비밀', 'Config and secrets']]
  });
}

function sK8sResources() {
  return CW('op-k8s-resources', {
    code: ['resources:', '  requests: { cpu: 250m, memory: 256Mi }', '  limits:   { cpu: "1",  memory: 512Mi }', ['# requests: 스케줄링 기준(예약)', '# requests: what scheduling reserves'], ['# 메모리 limit 초과 → OOMKilled', '# over memory limit → OOMKilled'], ['# CPU limit 초과 → 느려짐(스로틀)', '# over CPU limit → throttled']],
    hl: [[1, 1, 'ok'], [3, 1], [4, 1, 'danger'], [5, 1, 'warn']],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'nd', X, .3, 12.0, 2.6, ['노드: CPU 4 · 메모리 8Gi', 'node: 4 CPU · 8Gi memory'], 'line', 0);
      [0, 1, 2, 3, 4, 5].forEach(i => sw(S, 'rq' + i, X + .3 + i * 1.9, 1.15, 1.7, 1.5, tint(i < 4 ? 'ok' : 'line', i < 4 ? 50 : 20), 1, { css: 'border:0' }));
      lbl(S, 'n1', X, 6.6, ['requests 합이 남은 용량에 맞는 노드에 배치돼요', 'pods land where the sum of requests still fits'], 'g', 1, { off: 2, w: 12 });
      lbl(S, 'mm', X, 3.3, 'memory', 'm', 2); sw(S, 'mr', X + 2.4, 3.35, 4.0, .5, tint('ok', 55), 2, { css: 'border:0' }); sw(S, 'ml', X + 6.4, 3.35, 4.0, .5, tint('warn', 45), 2, { css: 'border:0' }); lbl(S, 'm1', X + 2.4, 3.95, 'request', 'm g', 2); lbl(S, 'm2', X + 6.4, 3.95, 'limit', 'm w', 2);
      lbl(S, 'n2', X, 6.6, ['request는 보장되는 몫, limit은 넘을 수 없는 천장', 'requests are guaranteed; limits are a hard ceiling'], 'a', 2, { off: 3, w: 12 });
      sw(S, 'mo', X + 10.4, 3.35, 1.6, .5, tint('danger', 60), 3, { css: 'border:0' }); chip(S, 'oom', X + 6.4, 4.7, 5.6, 'OOMKilled', 'danger', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['메모리는 압축할 수 없어 넘으면 컨테이너가 죽어요', 'memory cannot be squeezed, so exceeding it kills the container'], 'r', 3, { off: 4, w: 12 });
      chip(S, 'th', X, 4.7, 5.6, ['CPU 스로틀', 'CPU throttled'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['CPU는 넘으면 느려질 뿐 · 지연이 튀면 의심해요', 'CPU over limit only slows down; suspect it on latency spikes'], 'w', 4, { w: 12 });
    },
    notes: [['requests는 컨테이너가 쓸 자원을 예약하는 값이에요 · 스케줄러는 노드에 남은 용량과 requests 합을 비교해 파드를 배치해요', 'requests reserve resources for a container, and the scheduler places pods where the sum of requests fits the node’s remaining capacity'], ['limits는 넘을 수 없는 상한이에요 · requests와 limits가 같으면 Guaranteed, 다르면 Burstable, 없으면 BestEffort 등급이 되어 자원이 모자랄 때 먼저 쫓겨나는 순서가 정해져요', 'limits are hard ceilings, and equal requests and limits make a pod Guaranteed, different ones Burstable and none BestEffort, which sets eviction order under pressure'], ['메모리는 압축할 수 없어서 limit을 넘으면 컨테이너가 OOMKilled로 종료되고 재시작돼요 · 메모리 누수나 너무 낮은 limit을 의심해요', 'memory cannot be compressed, so exceeding the limit kills the container with OOMKilled and restarts it, pointing to leaks or limits set too low'], ['CPU는 limit을 넘으면 죽지 않고 스로틀되어 느려져요 · 원인 모를 지연이 생기면 스로틀 지표를 확인하고, 많은 팀이 CPU limit은 두지 않아요', 'CPU over the limit is throttled rather than killed, so check throttling metrics on unexplained latency, and many teams skip CPU limits entirely']],
    fin: [['자원 요청과 제한: requests는 배치와 보장, limits는 상한 · 메모리 초과는 종료, CPU 초과는 스로틀', 'requests drive placement and guarantees and limits cap usage; memory overruns kill, CPU overruns throttle', 'opx-xs opx-a'], ['실제 사용량을 보고 값을 조정해요(VPA 추천)', 'tune values from real usage, e.g. VPA advice'], ['네임스페이스 쿼터로 팀별 총량을 제한해요', 'namespace quotas cap totals per team']],
    caps: [['스케줄링', 'Scheduling'], ['요청과 제한', 'Requests and limits'], ['OOMKilled', 'OOMKilled'], ['CPU 스로틀', 'CPU throttling'], ['자원 요청과 제한', 'Resource requests and limits']]
  });
}

/* ===== DevOps · Kubernetes in depth ===== */
function sK8sSched() {
  return CW('op-k8s-sched', {
    code: ['nodeSelector: { gpu: "true" }', 'tolerations:', '- { key: dedicated, value: ml,', '    effect: NoSchedule }', 'topologySpreadConstraints:', '- maxSkew: 1', '  topologyKey: topology.kubernetes.io/zone'],
    hl: [[0, 1], [1, 3, 'warn'], [4, 3, 'ok'], [0, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      [['node-1', 'line', 'zone a'], ['node-2 gpu', 'accent', 'zone b'], ['node-3 ml', 'warn', 'zone c']].forEach(([t, c, z], i) => { tbox(S, 'n' + i, X + i * 4.1, .4, 3.8, 4.2, t, c, 0, { tc: c === 'accent' ? 'a' : c === 'warn' ? 'w' : '' }); lbl(S, 'z' + i, X + i * 4.1, 4.75, z, 'm', 0); });
      nd(S, 'pg', X + 4.4, 1.2, 3.2, 'gpu pod', 'accent', 1, { h: 1.0 }); lbl(S, 'n1', X, 6.6, ['라벨로 특정 노드(GPU 등)를 골라요', 'labels pick specific nodes, such as GPU machines'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'tn', X + 8.5, 1.2, 3.0, 'taint', 'danger', 2, { h: 1.0 }); nd(S, 'pm', X + 8.5, 2.4, 3.0, 'ml pod', 'warn', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['테인트는 노드가 밀어내고, 톨러레이션을 가진 파드만 허용', 'taints repel pods unless they carry a matching toleration'], 'w', 2, { off: 3, w: 12 });
      [0, 1, 2].forEach(i => nd(S, 'w' + i, X + .3 + i * 4.1, 3.5, 3.2, 'web', 'ok', 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['복제본을 영역마다 고르게 · 한 영역이 죽어도 버텨요', 'spread replicas evenly across zones to survive one failing'], 'g', 3, { off: 4, w: 12 });
      chip(S, 'aa', X, 5.4, 12.0, ['안티 어피니티: 같은 노드에 몰리지 않게', 'anti-affinity: spread replicas'], 'line', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['어피니티는 끌어당기고, 안티 어피니티는 떼어놓아요', 'affinity attracts pods; anti-affinity keeps them apart'], 'a', 4, { w: 12 });
    },
    notes: [['스케줄러는 자원이 맞는 노드 중에서 파드를 배치해요 · nodeSelector나 노드 어피니티로 gpu=true 같은 라벨이 붙은 노드만 고르게 할 수 있어요', 'the scheduler places pods on nodes with enough resources, and nodeSelector or node affinity can restrict them to nodes labeled, for example, gpu=true'], ['테인트는 노드가 파드를 밀어내는 표시예요 · 같은 키의 톨러레이션을 가진 파드만 들어올 수 있어서 ML 전용 노드처럼 자원을 지킬 때 써요', 'taints mark nodes that repel pods, admitting only pods with matching tolerations, which protects dedicated capacity such as ML nodes'], ['topologySpreadConstraints는 복제본을 가용 영역이나 노드에 고르게 나눠요 · maxSkew 1이면 영역 간 개수 차이가 1을 넘지 않아요', 'topologySpreadConstraints spread replicas evenly across zones or nodes, and maxSkew 1 keeps per-zone counts within one of each other'], ['파드 어피니티는 캐시처럼 가까이 두고 싶은 파드끼리 끌어당기고, 안티 어피니티는 같은 서비스 복제본이 한 노드에 몰리지 않게 떼어놓아요', 'pod affinity pulls related pods such as caches together, while anti-affinity keeps replicas of one service off the same node']],
    fin: [['스케줄링 제어: 라벨·어피니티로 고르고, 테인트로 막고, 분산 규칙으로 고르게 나눠요', 'scheduling control: pick with labels and affinity, block with taints, balance with spread rules', 'opx-xs opx-a'], ['규칙이 너무 빡빡하면 파드가 Pending에 머물러요', 'overly strict rules leave pods Pending'], ['PodDisruptionBudget으로 동시 중단 수를 제한해요', 'PodDisruptionBudgets limit simultaneous disruptions']],
    caps: [['노드 선택', 'Choosing nodes'], ['테인트와 톨러레이션', 'Taints and tolerations'], ['영역 분산', 'Spreading across zones'], ['어피니티', 'Affinity'], ['스케줄링 제어', 'Scheduling control']]
  });
}

function sHelm() {
  return CW('op-helm', {
    code: ['# values-prod.yaml', 'replicaCount: 3', 'image: { tag: 3f9a1c2 }', ['# templates/deployment.yaml', '# templates/deployment.yaml'], 'replicas: {{ .Values.replicaCount }}', 'helm upgrade --install api ./chart \\', '  -f values-prod.yaml', 'helm rollback api 41'],
    hl: [[3, 2], [0, 3, 'ok'], [5, 2, 'warn'], [7, 1, 'danger']],
    lh: 1.2,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'ch', X, .4, 5.6, 3.0, 'chart', 'accent', 1, { tc: 'a' }); ['deployment', 'service', 'ingress'].forEach((t, i) => lbl(S, 'tp' + i, X + .5, 1.25 + i * .7, '▪ ' + t + '.yaml', 'm', 1));
      lbl(S, 'n1', X, 6.6, ['차트: 쿠버네티스 매니페스트를 템플릿으로 묶은 패키지', 'a chart packages Kubernetes manifests as templates'], 'a', 1, { off: 2, w: 12 });
      [['dev', 'line', '1'], ['prod', 'ok', '3']].forEach(([t, c, n], i) => { nd(S, 'v' + i, X + 6.4, .4 + i * 1.75, 5.6, 'values-' + t, c, 2, { h: 1.0 }); lbl(S, 'vr' + i, X + 6.6, 1.5 + i * 1.75, 'replicas: ' + n, 'm', 2); });
      lbl(S, 'n2', X, 6.6, ['환경마다 값 파일만 바꿔 같은 차트를 재사용', 'reuse one chart with a values file per environment'], 'g', 2, { off: 3, w: 12 });
      [38, 39, 40, 41, 42].forEach((r, i) => nd(S, 'r' + i, X + i * 2.42, 4.5, 2.2, 'r' + r, i === 4 ? 'danger' : 'ok', 3, { h: 1.0 })); lbl(S, 'rl', X, 5.65, ['릴리스 이력', 'release history'], 'm', 3);
      lbl(S, 'n3', X, 6.6, ['설치·업그레이드마다 릴리스 번호가 기록돼요', 'every install and upgrade records a numbered release'], 'w', 3, { off: 4, w: 12 });
      arw(S, 'rb', [X + 10.2, 4.35], [X + 8.4, 4.35], 4, { color: 'danger' }); zup(S, ['rb']); lbl(S, 'rbl', X + 6.0, 5.65, 'rollback → r41', 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['문제가 생기면 이전 릴리스로 한 번에 되돌려요', 'roll back to the previous release in one command'], 'r', 4, { w: 12 });
    },
    notes: [['Helm 차트는 Deployment, Service, Ingress 같은 매니페스트를 템플릿으로 묶은 패키지예요 · {{ .Values.replicaCount }}처럼 값을 바꿔 끼울 수 있어요', 'a Helm chart packages manifests such as Deployments, Services and Ingresses as templates with slots like {{ .Values.replicaCount }}'], ['환경마다 values 파일만 다르게 두고 같은 차트를 재사용해요 · 공개 차트로 Redis나 Prometheus 같은 소프트웨어도 쉽게 설치해요', 'environments reuse one chart with different values files, and public charts make installing software such as Redis or Prometheus easy'], ['helm upgrade --install은 없으면 설치하고 있으면 업그레이드하며, 그때마다 번호가 붙은 릴리스 이력을 클러스터에 남겨요', 'helm upgrade --install installs or upgrades as needed and records a numbered release history in the cluster each time'], ['문제가 생기면 helm rollback으로 이전 릴리스로 되돌려요 · Kustomize는 템플릿 없이 기본 YAML에 환경별 패치를 겹치는 다른 방식이에요', 'helm rollback returns to an earlier release, while Kustomize is an alternative that layers per-environment patches over plain YAML without templates']],
    fin: [['Helm: 매니페스트를 템플릿 차트로 묶고, 값 파일로 환경을 나누고, 릴리스 이력으로 롤백해요', 'Helm packages manifests as charts, splits environments with values files and rolls back via release history', 'opx-xs opx-a'], ['GitOps 도구(Argo CD)와 함께 쓰기도 해요', 'often paired with GitOps tools such as Argo CD'], ['helm template으로 결과 YAML을 미리 확인해요', 'preview rendered YAML with helm template']],
    caps: [['차트', 'Charts'], ['값 파일', 'Values files'], ['릴리스', 'Releases'], ['롤백', 'Rollback'], ['Helm', 'Helm']]
  });
}

function sStateful() {
  return CW('op-statefulset', {
    code: ['kind: StatefulSet', 'spec:', '  serviceName: db', '  replicas: 3', '  volumeClaimTemplates:', '  - metadata: { name: data }', '    spec:', '      storageClassName: gp3', '      resources:', '        requests: { storage: 50Gi }'],
    hl: [[0, 4], [4, 6, 'ok'], [2, 1, 'warn'], [0, 1]],
    lh: 1.12,
    draw: (S) => {
      const X = 19.4;
      ['db-0', 'db-1', 'db-2'].forEach((t, i) => nd(S, 'p' + i, X + i * 4.1, .5, 3.8, t, 'accent', 1, { h: 1.0 }));
      lbl(S, 'n1', X, 6.6, ['파드마다 고정된 이름과 순서 · 0번부터 차례로 생성', 'stable names and order: created one by one from 0'], 'a', 1, { off: 2, w: 12 });
      [0, 1, 2].forEach(i => { nd(S, 'v' + i, X + i * 4.1, 2.3, 3.8, 'data-db-' + i, 'ok', 2, { h: 1.0 }); ed(S, 've' + i, [X + 1.9 + i * 4.1, 1.55], [X + 1.9 + i * 4.1, 2.25], 2, { color: 'ok' }); });
      lbl(S, 'n2', X, 6.6, ['파드마다 자기 볼륨(PVC)이 따로 붙어요', 'each pod gets its own volume (PVC)'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'dn', X, 3.6, 'db-1.db.ns.svc', 'm w', 3); lbl(S, 'n3', X, 6.6, ['헤드리스 서비스로 파드마다 고정 DNS 이름', 'a headless Service gives each pod a stable DNS name'], 'w', 3, { off: 4, w: 12 });
      sw(S, 'x', X + 4.1, .5, 3.8, 1.0, 'rgba(220,40,40,.25)', 4, { css: 'z-index:4' }); lbl(S, 'rc', X, 4.3, ['같은 이름·같은 볼륨으로 복귀', 'back with the same name and volume'], 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['다시 생겨도 정체성과 데이터가 그대로예요', 'a replacement keeps the identity and the data'], 'a', 4, { w: 12 });
    },
    notes: [['StatefulSet은 DB나 메시지 브로커처럼 정체성이 중요한 앱을 위한 컨트롤러예요 · 파드 이름이 db-0, db-1, db-2로 고정되고 순서대로 만들어지고 지워져요', 'StatefulSets serve apps whose identity matters, such as databases or brokers, with fixed pod names db-0, db-1 and db-2 created and removed in order'], ['volumeClaimTemplates가 파드마다 PersistentVolumeClaim을 만들고, StorageClass(gp3 등)가 실제 디스크를 동적으로 준비해요', 'volumeClaimTemplates create a PersistentVolumeClaim per pod, and a StorageClass such as gp3 provisions the actual disk dynamically'], ['헤드리스 서비스(clusterIP: None)와 함께 쓰면 db-1.db.ns.svc처럼 파드마다 고정 DNS 이름이 생겨 복제 설정에 써요', 'paired with a headless Service (clusterIP: None), each pod gets a stable DNS name such as db-1.db.ns.svc for replication setup'], ['파드가 죽어도 같은 이름과 같은 볼륨으로 다시 붙어 데이터가 이어져요 · 다만 백업과 장애 조치는 직접 챙겨야 해서 관리형 DB가 더 쉬운 경우가 많아요', 'a failed pod returns with the same name and volume so data carries on, though backups and failover remain your job, which often makes managed databases easier']],
    fin: [['StatefulSet: 고정된 이름·순서·DNS와 파드별 볼륨으로 상태 있는 앱을 운영해요', 'StatefulSets run stateful apps with stable names, order, DNS and per-pod volumes', 'opx-xs opx-a'], ['볼륨은 파드를 지워도 남아요(데이터 보호)', 'volumes outlive deleted pods to protect data'], ['복잡한 DB는 오퍼레이터를 함께 써요', 'complex databases add an operator']],
    caps: [['고정된 정체성', 'Stable identity'], ['파드별 볼륨', 'Per-pod volumes'], ['고정 DNS', 'Stable DNS'], ['복구', 'Recovery'], ['StatefulSet', 'StatefulSets']]
  });
}

function sK8sRbac() {
  return CW('op-k8s-rbac', {
    code: ['kind: Role', 'metadata: { namespace: team-a }', 'rules:', '- apiGroups: ["apps"]', '  resources: ["deployments"]', '  verbs: ["get", "list", "update"]', ['# RoleBinding: 사용자·SA에 연결', '# RoleBinding: attach to a user or SA'], ['# NetworkPolicy: 파드 간 통신 제한', '# NetworkPolicy: limit pod traffic']],
    hl: [[1, 1], [2, 4, 'ok'], [6, 1, 'warn'], [7, 1, 'danger']],
    lh: 1.2,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'na', X, .4, 5.8, 4.4, 'team-a', 'accent', 1, { tc: 'a' }); tbox(S, 'nb', X + 6.2, .4, 5.8, 4.4, 'team-b', 'ok', 1, { tc: 'g' });
      lbl(S, 'n1', X, 6.6, ['네임스페이스로 팀·환경별 공간을 나눠요', 'namespaces split the cluster by team or environment'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'rl', X + .3, 1.2, 5.2, 'deploy: update', 'ok', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['Role에 허용할 동작만 나열 · 기본은 모두 거부', 'a Role lists only the allowed verbs; all else is denied'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'ci', X + .3, 2.6, 2.6, 'ci-sa', 'warn', 3, { h: 1.0 }); nd(S, 'dv', X + 3.0, 2.6, 2.5, 'alice', 'warn', 3, { h: 1.0 }); lbl(S, 'rb', X + .3, 3.75, 'RoleBinding', 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['RoleBinding으로 사람·서비스 계정에 권한을 붙여요', 'RoleBindings attach a Role to people or service accounts'], 'w', 3, { off: 4, w: 12 });
      nd(S, 'pa', X + 6.5, 1.2, 2.5, 'web', 'line', 4, { h: 1.0 }); nd(S, 'pb', X + 9.2, 1.2, 2.5, 'db', 'line', 4, { h: 1.0 }); nd(S, 'px', X + 6.5, 3.0, 2.5, 'other', 'line', 4, { h: 1.0 }); arw(S, 'ok1', [X + 9.0, 1.7], [X + 9.15, 1.7], 4, { color: 'ok' }); ed(S, 'bl', [X + 7.75, 2.95], [X + 10.45, 2.25], 4, { color: 'danger', h: .1 }); lbl(S, 'blx', X + 9.4, 2.9, '✗', 'm r', 4);
      lbl(S, 'n4', X, 6.6, ['NetworkPolicy로 “web만 db에 접속” 같은 규칙', 'NetworkPolicies enforce rules like “only web may reach db”'], 'r', 4, { w: 12 });
    },
    notes: [['네임스페이스는 한 클러스터를 팀이나 환경별 공간으로 나눠요 · 이름 충돌을 막고, 권한·쿼터·네트워크 정책의 경계가 돼요', 'namespaces split one cluster into spaces per team or environment, avoiding name clashes and bounding permissions, quotas and network policies'], ['Role은 어떤 API 그룹의 어떤 리소스에 어떤 동작(get, list, update 등)을 허용할지 적어요 · 적지 않은 것은 모두 거부돼요', 'a Role lists which verbs (get, list, update and so on) are allowed on which resources in which API groups, and everything else is denied'], ['RoleBinding이 Role을 사람이나 서비스 계정(SA)에 연결해요 · 클러스터 전체 권한은 ClusterRole과 ClusterRoleBinding으로 따로 다뤄요', 'RoleBindings attach a Role to people or service accounts (SAs), while cluster-wide permissions use ClusterRoles and ClusterRoleBindings'], ['기본적으로 모든 파드는 서로 통신할 수 있어요 · NetworkPolicy로 “web 파드만 db에 접속”처럼 허용 규칙을 두면 침입이 번지는 범위가 줄어요', 'by default every pod can talk to every other, and NetworkPolicies allowing only rules such as “web may reach db” limit how far an intrusion spreads']],
    fin: [['쿠버네티스 멀티테넌시: 네임스페이스로 나누고, RBAC로 권한을, NetworkPolicy로 통신을 최소화', 'Kubernetes multi-tenancy: split by namespace, minimize permissions with RBAC and traffic with NetworkPolicies', 'opx-xs opx-a'], ['NetworkPolicy는 지원하는 CNI가 있어야 동작해요', 'NetworkPolicies need a CNI that enforces them'], ['cluster-admin은 아주 드물게만 줘요', 'grant cluster-admin very rarely']],
    caps: [['네임스페이스', 'Namespaces'], ['Role', 'Roles'], ['RoleBinding', 'RoleBindings'], ['NetworkPolicy', 'NetworkPolicies'], ['네임스페이스와 RBAC', 'Namespaces and RBAC']]
  });
}

function sOperator() {
  return CW('op-operator', {
    code: ['kind: PostgresCluster', 'spec:', '  instances: 3', '  backups: { schedule: "0 3 * * *" }', ['# 오퍼레이터의 조정 루프', '# the operator’s reconcile loop'], ['# 관찰 → 비교 → 조치 → 반복', '# observe → diff → act → repeat']],
    hl: [[0, 4], [4, 2, 'ok'], [2, 1, 'warn'], [3, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'cr', X, .5, 5.8, 'PostgresCluster', 'accent', 1, { h: 1.0 }); lbl(S, 'crl', X, 1.65, ['새 리소스 종류(CRD)', 'custom resource'], 'm a', 1);
      lbl(S, 'n1', X, 6.6, ['CRD로 쿠버네티스에 새 종류의 리소스를 추가해요', 'CRDs add new kinds of resources to Kubernetes'], 'a', 1, { off: 2, w: 12 });
      [['observe', 0], ['diff', 1], ['act', 2]].forEach(([t, i]) => nd(S, 'lp' + i, X + 6.3 + (i === 1 ? 2.8 : 0), i === 2 ? 3.0 : .5 + (i === 1 ? 1.25 : 0), 2.9, t, 'ok', 2, { h: 1.0 }));
      arw(S, 'l1', [X + 9.0, 1.55], [X + 9.6, 1.72], 2, { color: 'ok' }); arw(S, 'l2', [X + 10.5, 2.8], [X + 9.25, 3.3], 2, { color: 'ok' }); arw(S, 'l3', [X + 7.75, 2.95], [X + 7.75, 1.55], 2, { color: 'ok' });
      lbl(S, 'n2', X, 6.6, ['컨트롤러가 원하는 상태와 실제를 계속 맞춰요', 'a controller keeps reconciling desired and actual state'], 'g', 2, { off: 3, w: 12 });
      ['pg-0', 'pg-1', 'pg-2'].forEach((t, i) => nd(S, 'pg' + i, X + i * 2.0, 3.0, 1.9, t, 'line', 3, { h: 1.0 })); chip(S, 'fo', X, 4.4, 6.8, ['장애 조치 · 백업', 'failover · backups'], 'warn', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['DB 운영자의 지식을 코드로 담아 자동으로 실행', 'encodes a DBA’s know-how and runs it automatically'], 'w', 3, { off: 4, w: 12 });
      lbl(S, 'n4', X, 6.6, ['cert-manager, Prometheus Operator도 같은 원리', 'cert-manager and the Prometheus Operator work the same way'], 'a', 4, { w: 12 });
    },
    notes: [['CRD(CustomResourceDefinition)는 쿠버네티스에 PostgresCluster 같은 새 리소스 종류를 추가해요 · kubectl과 YAML로 다른 리소스처럼 다룰 수 있어요', 'a CustomResourceDefinition (CRD) adds new resource kinds such as PostgresCluster, handled with kubectl and YAML like built-in ones'], ['오퍼레이터는 그 리소스를 지켜보는 컨트롤러예요 · 원하는 상태와 실제 상태를 관찰하고 비교해 차이를 메우는 조정 루프를 계속 돌아요', 'an operator is a controller watching those resources, running a reconcile loop that observes, compares desired and actual state, and closes the gap'], ['DB 오퍼레이터는 인스턴스 3개 생성, 복제 설정, 주 서버 장애 시 승격, 매일 새벽 백업처럼 DB 운영자가 하던 일을 코드로 자동화해요', 'a database operator automates what a DBA used to do: creating three instances, configuring replication, promoting on primary failure and running nightly backups'], ['cert-manager(인증서 발급·갱신), Prometheus Operator, Strimzi(Kafka)처럼 많은 소프트웨어가 오퍼레이터로 배포돼요 · 쿠버네티스 자체도 같은 조정 원리로 돌아가요', 'much software ships as operators, such as cert-manager for certificates, the Prometheus Operator and Strimzi for Kafka, and Kubernetes itself runs on the same reconcile principle']],
    fin: [['오퍼레이터: CRD로 원하는 상태를 선언하고, 조정 루프가 운영 지식을 자동으로 실행해요', 'operators declare desired state with CRDs and run operational know-how through reconcile loops', 'opx-xs opx-a'], ['Kubebuilder·Operator SDK로 직접 만들 수 있어요', 'build your own with Kubebuilder or Operator SDK'], ['성숙도와 유지보수 상태를 보고 골라요', 'choose by maturity and maintenance']],
    caps: [['커스텀 리소스', 'Custom resources'], ['조정 루프', 'The reconcile loop'], ['운영 자동화', 'Automated operations'], ['오퍼레이터 생태계', 'The operator ecosystem'], ['오퍼레이터와 CRD', 'Operators and CRDs']]
  });
}

/* ===== DevOps · infrastructure as code in depth ===== */
function sTerraform() {
  return CW('op-terraform', {
    code: ['resource "aws_s3_bucket" "logs" {', '  bucket = "acme-logs"', '}', '$ terraform plan', '  + aws_s3_bucket.logs  (create)', '$ terraform apply', ['# 상태 파일: 원격 저장 + 잠금', '# state: stored remotely, with locking']],
    hl: [[0, 3], [3, 2, 'ok'], [5, 1, 'warn'], [6, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'cd', X, .5, 3.2, ['코드', 'code'], 'accent', 0, { h: 1.0 }); nd(S, 'st', X + 3.9, .5, 3.4, 'state', 'warn', 0, { h: 1.0 }); nd(S, 'rl', X + 7.9, .5, 4.1, ['실제 클라우드', 'real cloud'], 'ok', 0, { h: 1.0 });
      lbl(S, 'pl', X, 2.0, '+ 1 to add, 0 to change', 'm g', 1, { off: 3 }); lbl(S, 'n1', X, 6.6, ['plan: 코드·상태·실제를 비교해 바뀔 내용을 미리 보여줘요', 'plan compares code, state and reality and previews changes'], 'g', 1, { off: 2, w: 12 });
      chip(S, 'rv', X, 2.8, 6.6, ['PR에서 plan 리뷰', 'review plan in PR'], 'accent', 1, { h: 1.0, off: 3 });
      arw(S, 'ap', [X + 1.6, 1.55], [X + 9.9, 1.55], 2, { color: 'ok', off: 3 }); lbl(S, 'n2', X, 6.6, ['apply: 승인된 계획대로 실제 리소스를 만들고 상태를 갱신', 'apply executes the approved plan and updates state'], 'w', 2, { off: 3, w: 12 });
      nd(S, 's3', X + 3.8, 2.8, 3.8, 'S3 backend', 'line', 3, { h: 1.0 }); chip(S, 'lk', X + 8.2, 2.8, 3.8, ['잠금', 'lock'], 'danger', 3, { h: 1.0 }); ed(S, 'se', [X + 5.6, 1.55], [X + 5.6, 2.75], 3);
      lbl(S, 'n3', X, 6.6, ['상태는 원격에 두고 잠가서 동시 실행 충돌을 막아요', 'remote state with locking prevents concurrent runs clashing'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'dr', X, 4.4, 12.0, ['콘솔에서 손으로 바꾸면 드리프트', 'console edits cause drift'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['모든 변경은 코드로만 · 정기 plan으로 드리프트 감지', 'change only through code; scheduled plans catch drift'], 'r', 4, { w: 12 });
    },
    notes: [['Terraform은 HCL로 원하는 인프라를 선언해요 · terraform plan은 코드, 상태 파일, 실제 클라우드를 비교해 무엇이 생기고 바뀌고 지워질지 미리 보여줘요', 'Terraform declares infrastructure in HCL, and terraform plan compares code, state and the real cloud to preview what will be created, changed or destroyed'], ['계획은 PR에서 리뷰하고, apply가 승인된 계획대로 실제 리소스를 만든 뒤 상태 파일에 기록해요', 'plans are reviewed in pull requests, and apply executes the approved plan and records the result in the state file'], ['상태 파일은 S3·GCS·Terraform Cloud 같은 원격 백엔드에 두고 잠금을 걸어 두 사람이 동시에 apply하는 사고를 막아요 · 상태에는 비밀이 들어갈 수 있어 접근도 제한해요', 'state lives in a remote backend such as S3, GCS or Terraform Cloud with locking so two people never apply at once, and access is restricted because state may contain secrets'], ['콘솔에서 손으로 바꾸면 코드와 실제가 어긋나는 드리프트가 생기고 다음 plan이 되돌리려 해요 · 변경은 코드로만 하고 정기적으로 plan을 돌려 감지해요', 'manual console edits cause drift that the next plan tries to revert, so change things only through code and run scheduled plans to detect drift']],
    fin: [['Terraform: 선언 → plan으로 미리 보기 → 리뷰 → apply · 상태는 원격·잠금', 'Terraform: declare, preview with plan, review, apply, with remote locked state', 'opx-xs opx-a'], ['OpenTofu는 오픈소스 포크예요', 'OpenTofu is an open-source fork'], ['Pulumi·CDK는 일반 언어로 써요', 'Pulumi and CDK use general-purpose languages']],
    caps: [['plan', 'Plan'], ['apply', 'Apply'], ['상태와 잠금', 'State and locking'], ['드리프트', 'Drift'], ['Terraform 워크플로', 'The Terraform workflow']]
  });
}

function sTfModules() {
  return CW('op-tf-modules', {
    code: ['module "vpc" {', '  source  = "./modules/vpc"', '  cidr    = var.cidr', '}', ['# envs/dev · envs/prod 폴더마다', '# a folder per env: envs/dev, envs/prod'], ['#   같은 모듈 + 다른 변수 + 다른 상태', '#   same modules, other vars and state'], ['# 모듈은 버전으로 고정', '# pin module versions']],
    hl: [[0, 4], [4, 2, 'ok'], [6, 1, 'warn'], [0, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      tbox(S, 'm', X, .4, 5.6, 3.0, 'modules/vpc', 'accent', 1, { tc: 'a' }); ['subnets', 'routes', 'NAT'].forEach((t, i) => lbl(S, 'mi' + i, X + .5, 1.2 + i * .7, '▪ ' + t, 'm', 1));
      lbl(S, 'n1', X, 6.6, ['자주 쓰는 리소스 묶음을 함수처럼 재사용해요', 'reuse a bundle of resources like a function'], 'a', 1, { off: 2, w: 12 });
      [['dev', 'line', '10.1.0.0/16'], ['prod', 'ok', '10.0.0.0/16']].forEach(([t, c, v], i) => { tbox(S, 'e' + i, X + 6.2, .4 + i * 2.0, 5.8, 1.7, 'envs/' + t, c, 2); lbl(S, 'ev' + i, X + 6.5, 1.15 + i * 2.0, v, 'm', 2); });
      lbl(S, 'n2', X, 6.6, ['환경마다 변수와 상태 파일을 따로 · 같은 모듈 사용', 'each environment has its own variables and state'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'vr', X, 4.5, 5.6, 'vpc v1.4.2', 'warn', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['모듈 버전을 고정하고 dev에서 먼저 올려 봐요', 'pin module versions and upgrade dev first'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'bl', X + 6.2, 4.5, 5.8, ['폭발 반경 작게', 'blast radius ↓'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['상태를 작게 나눠 한 번의 실수가 번지지 않게', 'split state so one mistake cannot spread'], 'a', 4, { w: 12 });
    },
    notes: [['모듈은 VPC, 서브넷, 라우팅, NAT처럼 함께 쓰는 리소스를 묶은 재사용 단위예요 · 입력 변수와 출력 값이 있어 함수처럼 불러 써요', 'modules bundle resources used together, such as a VPC with subnets, routes and NAT, into reusable units with input variables and outputs, called like functions'], ['envs/dev, envs/prod처럼 환경마다 폴더를 두고 같은 모듈을 다른 변수로 불러요 · 상태 파일도 환경마다 따로라 서로 영향을 주지 않아요', 'per-environment folders such as envs/dev and envs/prod call the same modules with different variables, and separate state files keep environments isolated'], ['모듈은 Git 태그나 레지스트리 버전으로 고정하고, 새 버전은 dev에서 먼저 적용해 확인한 뒤 prod로 올려요', 'pin modules to Git tags or registry versions, and roll new versions to dev first before prod'], ['상태 하나에 모든 것을 넣으면 plan이 느리고 실수 하나가 전체로 번져요 · 네트워크, 데이터, 앱처럼 상태를 나눠 폭발 반경을 줄여요', 'one state for everything makes plans slow and lets one mistake spread, so split state by layer such as network, data and apps to shrink the blast radius']],
    fin: [['Terraform 구성: 모듈로 재사용하고, 환경마다 변수·상태를 나누고, 버전을 고정해요', 'Terraform layout: reuse modules, separate variables and state per environment, pin versions', 'opx-xs opx-a'], ['Terragrunt로 반복 설정을 줄이기도 해요', 'Terragrunt can cut repeated config'], ['계층 사이 값은 출력·데이터 소스로 전달', 'pass values between layers via outputs']],
    caps: [['모듈', 'Modules'], ['환경 분리', 'Separating environments'], ['버전 고정', 'Pinned versions'], ['상태 나누기', 'Splitting state'], ['모듈과 환경', 'Modules and environments']]
  });
}

function sAnsible() {
  return CW('op-ansible', {
    code: ['- hosts: web', '  tasks:', '  - name: nginx installed', '    apt: { name: nginx, state: present }', '  - name: config deployed', '    template: { src: nginx.j2,', '                dest: /etc/nginx/nginx.conf }', ['# 몇 번 실행해도 결과가 같아요(멱등)', '# same result however often it runs']],
    hl: [[0, 4], [7, 1, 'ok'], [2, 2, 'warn'], [0, 1]],
    lh: 1.2,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'ctl', X, .5, 4.2, ['제어 노드', 'controller'], 'accent', 1, { h: 1.0 }); [0, 1, 2].forEach(i => { nd(S, 'w' + i, X + 8.6, .2 + i * 1.3, 3.4, 'web-' + (i + 1), 'line', 1, { h: 1.0 }); arw(S, 'sa' + i, [X + 4.25, 1.0], [X + 8.55, .7 + i * 1.3], 1); }); lbl(S, 'ssh', X + 4.6, 2.3, 'SSH', 'm a', 1);
      lbl(S, 'n1', X, 6.6, ['에이전트 없이 SSH로 여러 서버에 같은 설정을 적용', 'agentless: pushes the same setup to many servers over SSH'], 'a', 1, { off: 2, w: 12 });
      [['changed', 'warn'], ['ok', 'ok']].forEach(([t, c], i) => chip(S, 'r' + i, X + i * 6.2, 4.3, 5.8, (i ? ['2회차: ', 'run 2: '] : ['1회차: ', 'run 1: ']).map(p => p + t), c, 2, { h: 1.0 }));
      lbl(S, 'n2', X, 6.6, ['이미 원하는 상태면 아무것도 바꾸지 않아요', 'nothing changes when the state already matches'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['명령이 아니라 상태(present)를 적어요', 'describe the state (present), not commands'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'im', X, 5.4, 12.0, ['불변 인프라: 고치지 말고 교체', 'immutable: replace, never patch'], 'accent', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['요즘은 이미지를 굽고 서버째 교체하는 방식이 늘었어요', 'baking images and replacing servers is now common'], 'a', 4, { w: 12 });
    },
    notes: [['Ansible 같은 구성 관리 도구는 서버에 설치할 패키지와 설정 파일을 플레이북으로 적어요 · 에이전트 없이 SSH로 여러 서버에 한 번에 적용해요', 'configuration management tools such as Ansible describe packages and config files in playbooks and apply them to many servers at once over SSH, without agents'], ['멱등성이 핵심이에요 · 처음 실행하면 바뀐 것(changed)이 보고되고, 다시 실행하면 이미 원하는 상태라 아무것도 바꾸지 않아요(ok)', 'idempotence is the key: the first run reports changed, and a second run changes nothing because the state already matches (ok)'], ['그래서 apt install 같은 명령 대신 “nginx가 설치된 상태(present)”처럼 원하는 상태를 적어요 · 셸 명령을 쓸 때는 멱등하게 조건을 붙여요', 'so tasks state the desired result, such as nginx being present, rather than commands like apt install, and shell steps get conditions to stay idempotent'], ['오래 쓴 서버를 계속 고치면 서버마다 미묘하게 달라져요 · 불변 인프라는 Packer 같은 도구로 이미지를 굽고 서버를 통째로 교체해 이 문제를 피해요', 'servers patched over time slowly diverge, and immutable infrastructure avoids this by baking images with tools such as Packer and replacing servers wholesale']],
    fin: [['구성 관리: 원하는 상태를 멱등하게 적용 · 가변 서버 대신 불변 이미지 교체도 고려', 'configuration management applies desired state idempotently; consider immutable image replacement too', 'opx-xs opx-a'], ['Chef·Puppet은 에이전트 방식이에요', 'Chef and Puppet use agents'], ['컨테이너 시대엔 이미지 빌드가 그 역할을 해요', 'with containers, image builds take this role']],
    caps: [['플레이북', 'Playbooks'], ['멱등성', 'Idempotence'], ['상태로 쓰기', 'Writing state'], ['불변 인프라', 'Immutable infrastructure'], ['구성 관리', 'Configuration management']]
  });
}

function sPolicy() {
  return CW('op-policy', {
    code: ['deny[msg] {', '  input.kind == "Deployment"', '  c := input.spec.template.spec.containers[_]', '  not c.resources.limits.memory', '  msg := "memory limit required"', '}', ['# CI(conftest)와 클러스터 입장 통제에서', '# run in CI (conftest) and at admission']],
    hl: [[0, 6], [3, 1, 'danger'], [6, 1, 'ok'], [0, 1]],
    lh: 1.22,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'rg', X, .5, 4.4, 'Rego policy', 'accent', 1, { h: 1.0 }); lbl(S, 'n1', X, 6.6, ['규칙을 코드로 적어 버전 관리·리뷰·테스트해요', 'rules become code you can version, review and test'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'yml', X, 2.2, 4.4, 'deploy.yaml', 'line', 2, { h: 1.0 }); arw(S, 'ya', [X + 4.45, 2.7], [X + 5.15, 2.7], 2); chip(S, 'dn', X + 5.2, 2.2, 6.8, ['거부: limit 없음', 'denied: no limit'], 'danger', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['규칙을 어기는 매니페스트는 이유와 함께 거부돼요', 'manifests that break a rule are rejected with a reason'], 'r', 2, { off: 3, w: 12 });
      [['PR · CI', 'ok'], ['admission', 'warn']].forEach(([t, c], i) => nd(S, 'pt' + i, X + i * 6.2, 4.0, 5.8, t, c, 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['PR에서 먼저 막고, 클러스터 입구에서 한 번 더', 'block early in PRs and again at the cluster door'], 'g', 3, { off: 4, w: 12 });
      lbl(S, 'ex', X, 5.2, ['예: 공개 버킷 금지 · 이미지 출처 제한 · 태그 필수', 'e.g. no public buckets, trusted registries, required tags'], 'a', 4, { w: 12 });
      lbl(S, 'n4', X, 6.6, ['보안·비용·운영 규칙을 사람 대신 기계가 지켜요', 'machines enforce security, cost and ops rules'], 'a', 4, { w: 12 });
    },
    notes: [['정책 코드(policy as code)는 “모든 컨테이너는 메모리 limit을 가져야 한다” 같은 규칙을 OPA의 Rego 같은 언어로 적는 방식이에요 · 코드처럼 버전 관리하고 테스트해요', 'policy as code writes rules such as “every container needs a memory limit” in languages like OPA’s Rego, versioned and tested like code'], ['매니페스트나 Terraform 계획을 입력으로 넣으면 규칙을 어기는 항목을 이유와 함께 거부해요', 'manifests or Terraform plans are fed in as input, and violations are rejected with a reason'], ['conftest로 PR의 CI 단계에서 먼저 막고, OPA Gatekeeper나 Kyverno로 쿠버네티스 입장 통제(admission)에서 한 번 더 막아요', 'conftest blocks violations early in the PR’s CI stage, and OPA Gatekeeper or Kyverno blocks them again at Kubernetes admission'], ['공개 버킷 금지, 신뢰한 레지스트리의 이미지만 허용, 비용 태그 필수처럼 보안·비용·운영 규칙을 사람의 기억 대신 기계가 지켜요', 'rules such as no public buckets, images only from trusted registries and mandatory cost tags are enforced by machines instead of memory']],
    fin: [['정책 코드: 규칙을 코드로 쓰고 CI와 입장 통제에서 자동으로 지켜요', 'policy as code writes rules as code and enforces them in CI and at admission', 'opx-xs opx-a'], ['처음엔 경고 모드로 시작해 영향을 봐요', 'start in warn mode to gauge impact'], ['예외는 이유와 만료일을 붙여요', 'give exceptions a reason and an expiry']],
    caps: [['규칙을 코드로', 'Rules as code'], ['거부와 이유', 'Denials with reasons'], ['두 겹의 관문', 'Two gates'], ['쓰임새', 'Uses'], ['정책 코드', 'Policy as code']]
  });
}

/* ===== DevOps · DevSecOps ===== */
function sScan() {
  return CW('op-scan', {
    code: [['# SAST: 소스 코드의 위험한 패턴', '# SAST: risky patterns in source code'], ['# SCA: 의존성의 알려진 취약점(CVE)', '# SCA: known CVEs in dependencies'], ['# 이미지 스캔: OS 패키지 취약점', '# image scan: OS package CVEs'], ['# DAST: 실행 중인 앱을 밖에서 공격', '# DAST: attack the running app'], ['# 심각도 기준으로 차단 · 나머진 티켓', '# block on severity; ticket the rest']],
    hl: [[0, 1], [1, 2, 'warn'], [3, 1, 'danger'], [4, 1, 'ok']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, P = [['code', 0], ['deps', 1], ['image', 2], ['running', 3]];
      P.forEach(([t, i]) => nd(S, 'p' + i, X + i * 3.03, .5, 2.9, t, 'line', 0, { h: 1.0 }));
      chip(S, 'sa', X, 1.8, 2.9, 'SAST', 'accent', 1, { h: 1.0 }); lbl(S, 'n1', X, 6.6, ['SQL 인젝션 같은 위험한 코드 패턴을 정적으로 찾아요', 'static analysis finds risky code patterns such as SQL injection'], 'a', 1, { off: 2, w: 12 });
      chip(S, 'sc', X + 3.03, 1.8, 2.9, 'SCA', 'warn', 2, { h: 1.0 }); chip(S, 'im', X + 6.06, 1.8, 2.9, 'Trivy', 'warn', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['코드 대부분은 남이 쓴 것 · 의존성과 이미지의 CVE 확인', 'most code is someone else’s: check dependency and image CVEs'], 'w', 2, { off: 3, w: 12 });
      chip(S, 'da', X + 9.09, 1.8, 2.9, 'DAST', 'danger', 3, { h: 1.0 }); lbl(S, 'n3', X, 6.6, ['스테이징에서 실제로 요청을 보내 취약점을 찾아요', 'DAST probes the running app in staging'], 'r', 3, { off: 4, w: 12 });
      [['critical', 'danger', '✗ block'], ['high', 'warn', '✗ block'], ['medium', 'line', 'ticket']].forEach(([t, c, a], i) => { nd(S, 'sv' + i, X, 3.3 + i * 1.1, 3.6, t, c, 4, { h: 1.0 }); lbl(S, 'sva' + i, X + 4.0, 3.45 + i * 1.1, a, 'm', 4); });
      lbl(S, 'n4', X, 6.6, ['모든 경고로 막으면 무시당해요 · 기준을 정해 차단', 'blocking on everything gets ignored; set a threshold'], 'g', 4, { w: 12 });
    },
    notes: [['SAST(정적 분석)는 실행하지 않고 소스 코드에서 SQL 인젝션, 하드코딩된 비밀 같은 위험한 패턴을 찾아요 · Semgrep, CodeQL 같은 도구가 있어요', 'SAST (static analysis) finds risky patterns such as SQL injection or hardcoded secrets in source code without running it, using tools such as Semgrep or CodeQL'], ['요즘 앱 코드 대부분은 오픈소스 의존성이에요 · SCA는 의존성의 알려진 취약점(CVE)을, Trivy·Grype 같은 이미지 스캐너는 컨테이너의 OS 패키지 취약점을 찾아요', 'most application code is open-source dependencies, so SCA finds known CVEs in them and image scanners such as Trivy or Grype find OS package CVEs in containers'], ['DAST(동적 분석)는 스테이징에 떠 있는 앱에 실제 요청을 보내 인증 우회나 인젝션 같은 취약점을 밖에서 찾아요 · OWASP ZAP이 대표적이에요', 'DAST (dynamic analysis) sends real requests to the app running in staging to find flaws such as auth bypass or injection from outside, with OWASP ZAP a common tool'], ['모든 경고로 파이프라인을 막으면 사람들이 무시하게 돼요 · critical과 high는 막고, 나머지는 티켓으로 관리하며 거짓 양성은 이유와 함께 예외 처리해요', 'failing builds on every warning trains people to ignore them, so block critical and high findings, ticket the rest and document false positives as exceptions']],
    fin: [['보안 스캔: SAST(코드) · SCA(의존성) · 이미지 · DAST(실행)를 파이프라인에 넣고 심각도로 차단', 'security scanning puts SAST, SCA, image scans and DAST in the pipeline and blocks by severity', 'opx-xs opx-a'], ['개발자 IDE에서도 같은 규칙을 보여줘요', 'show the same rules in developers’ IDEs'], ['취약점 수정 기한(SLA)을 정해요', 'set remediation deadlines (SLAs)']],
    caps: [['SAST', 'SAST'], ['의존성과 이미지', 'Dependencies and images'], ['DAST', 'DAST'], ['차단 기준', 'Blocking thresholds'], ['보안 스캔', 'Security scanning']]
  });
}

function sSupplyChain() {
  return CW('op-supply-chain', {
    code: ['syft app:3f9a1c2 -o spdx > sbom.json', 'cosign sign registry/app@sha256:9c1e…', 'cosign verify registry/app@sha256:9c1e…', ['# SBOM: 무엇이 들어 있나', '# SBOM: what is inside'], ['# 서명·출처 증명: 누가 어떻게 빌드했나', '# signature, provenance: who built it, how'], ['# SLSA: 빌드 무결성 수준', '# SLSA: levels of build integrity']],
    hl: [[0, 1], [1, 1, 'ok'], [2, 1, 'warn'], [5, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'img', X, .5, 4.4, 'app image', 'accent', 0, { h: 1.0 });
      tbox(S, 'sb', X + 5.0, .3, 7.0, 3.0, 'SBOM', 'warn', 1, { tc: 'w' }); ['openssl 3.0.13', 'lodash 4.17.21', 'express 4.19.2'].forEach((t, i) => lbl(S, 'sbi' + i, X + 5.3, 1.05 + i * .7, t, 'm', 1));
      lbl(S, 'n1', X, 6.6, ['구성 요소 목록 · 새 CVE가 나오면 영향받는 앱을 바로 찾아요', 'a parts list: when a CVE lands, find affected apps fast'], 'w', 1, { off: 2, w: 12 });
      chip(S, 'sg', X, 1.8, 4.4, ['서명 ✓', 'signed ✓'], 'ok', 2, { h: 1.0 }); lbl(S, 'n2', X, 6.6, ['빌드 파이프라인이 이미지 다이제스트에 서명해요', 'the build pipeline signs the image digest'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'ad', X, 3.6, 4.2, ['클러스터 입장', 'admission'], 'line', 3, { h: 1.0 }); chip(S, 'vf', X + 4.5, 3.6, 3.5, 'verify ✓', 'ok', 3, { h: 1.0 }); chip(S, 'rj', X + 8.2, 3.6, 3.8, ['미서명 ✗', 'unsigned ✗'], 'danger', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['서명이 확인된 이미지만 배포를 허용해요', 'only verified, signed images may be deployed'], 'a', 3, { off: 4, w: 12 });
      chip(S, 'sl', X, 5.1, 12.0, ['출처 증명: 누가 어떻게 빌드했나', 'provenance: who built it, how'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['빌드 시스템이 오염돼도 알아챌 수 있게', 'so even a compromised build system gets noticed'], 'a', 4, { w: 12 });
    },
    notes: [['소프트웨어 공급망 보안은 코드부터 의존성, 빌드, 배포까지 이어지는 경로 전체를 지키는 일이에요 · SBOM은 이미지에 들어 있는 모든 구성 요소와 버전의 목록이에요', 'software supply chain security protects the whole path from code and dependencies to build and deploy, and an SBOM lists every component and version inside an image'], ['SBOM이 있으면 Log4Shell 같은 새 취약점이 나왔을 때 어떤 앱이 영향을 받는지 몇 분 만에 찾을 수 있어요 · syft 같은 도구가 만들어요', 'with SBOMs, a new vulnerability such as Log4Shell can be traced to affected apps within minutes, and tools such as syft generate them'], ['Sigstore의 cosign으로 빌드 파이프라인이 이미지 다이제스트에 서명하고, 클러스터 입장 통제에서 서명을 검증해 서명된 이미지만 배포해요', 'Sigstore’s cosign lets the pipeline sign image digests, and admission control verifies signatures so only signed images deploy'], ['출처 증명(provenance)은 어떤 소스 커밋을 어떤 빌더가 어떤 절차로 빌드했는지 기록해요 · SLSA는 이 무결성 수준을 단계로 정의한 프레임워크예요', 'provenance records which commit was built by which builder through which steps, and SLSA defines levels of this build integrity']],
    fin: [['공급망 보안: SBOM으로 내용을 알고, 서명으로 위변조를 막고, 출처 증명으로 빌드를 신뢰해요', 'supply chain security: know contents with SBOMs, stop tampering with signatures, trust builds via provenance', 'opx-xs opx-a'], ['의존성 출처(레지스트리)도 고정해요', 'pin dependency sources and registries'], ['빌드 러너는 격리하고 짧게 살려요', 'keep build runners isolated and ephemeral']],
    caps: [['SBOM', 'SBOMs'], ['서명', 'Signing'], ['검증', 'Verification'], ['출처 증명', 'Provenance'], ['소프트웨어 공급망 보안', 'Software supply chain security']]
  });
}

function sDeps() {
  return CW('op-deps', {
    code: ['# .github/dependabot.yml', 'updates:', '- package-ecosystem: npm', '  schedule: { interval: weekly }', '  groups: { minor: { update-types:', '      [minor, patch] } }', ['# 락파일로 설치 버전 고정', '# lockfiles pin installed versions']],
    hl: [[0, 4], [4, 2, 'ok'], [6, 1, 'warn'], [0, 1]],
    lh: 1.22,
    draw: (S) => {
      const X = 19.4;
      ['#311 bump express 4.19.2', '#312 bump zod 3.23.8', '#313 bump vite 5.4.8'].forEach((t, i) => nd(S, 'pr' + i, X, .4 + i * 1.2, 9.0, t, 'accent', 1, { h: 1.0, off: 2 }));
      lbl(S, 'n1', X, 6.6, ['봇이 새 버전마다 PR을 열고 CI가 검증해요', 'a bot opens a PR per update and CI tests it'], 'a', 1, { off: 2, w: 12 });
      nd(S, 'gr', X, .4, 9.0, ['#320 12개 묶음 업데이트', '#320 12 grouped updates'], 'ok', 2, { h: 1.0 }); chip(S, 'am', X + 9.4, .4, 2.6, 'auto ✓', 'ok', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['작은 업데이트는 묶고, 테스트가 통과하면 자동 병합', 'group small updates and auto-merge when tests pass'], 'g', 2, { off: 3, w: 12 });
      nd(S, 'lk', X, 2.0, 5.8, 'package-lock.json', 'warn', 3, { h: 1.0 }); lbl(S, 'lkl', X, 3.15, ['모든 하위 의존성 버전까지 고정', 'pins every transitive version'], 'm w', 3);
      lbl(S, 'n3', X, 6.6, ['락파일로 개발·CI·운영이 같은 버전을 설치해요', 'lockfiles make dev, CI and prod install the same versions'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'ol', X, 4.3, 12.0, ['1년 밀리면 메이저 5개를 한 번에', 'a year behind = 5 majors at once'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['업데이트를 미루면 보안 패치도 못 받아요', 'deferred updates also block security patches'], 'r', 4, { w: 12 });
    },
    notes: [['Dependabot이나 Renovate 같은 봇은 의존성의 새 버전이 나오면 업데이트 PR을 자동으로 열고, CI가 테스트로 깨지는지 검증해요', 'bots such as Dependabot and Renovate open update pull requests automatically when new dependency versions appear, and CI checks whether anything breaks'], ['PR이 너무 많으면 무시당하므로 minor·patch 업데이트는 묶고, 테스트가 통과하면 자동 병합하도록 설정해요 · 메이저는 사람이 변경 기록을 읽고 올려요', 'too many PRs get ignored, so group minor and patch updates and auto-merge them when tests pass, while major upgrades get human review of changelogs'], ['package-lock.json 같은 락파일은 직접 의존성뿐 아니라 하위 의존성 버전까지 고정해요 · 개발, CI, 운영이 정확히 같은 버전을 설치하고, CI에서는 npm ci로 락파일 그대로 설치해요', 'lockfiles such as package-lock.json pin transitive as well as direct versions so dev, CI and production install exactly the same, and CI uses npm ci to install from the lockfile'], ['업데이트를 미루면 나중에 메이저 버전 여러 개를 한 번에 올려야 하고, 급한 보안 패치도 바로 적용하기 어려워요 · 자주 조금씩 올리는 것이 가장 싸요', 'deferring updates leaves several major versions to jump at once and makes urgent security patches hard to apply, so small frequent updates are cheapest']],
    fin: [['의존성 관리: 봇으로 자주 조금씩 · 작은 건 묶어 자동 병합 · 락파일로 재현성', 'dependency hygiene: small frequent bot updates, grouped auto-merges and lockfiles for reproducibility', 'opx-xs opx-a'], ['새로 나온 버전은 며칠 지나 받는 것도 방법이에요', 'waiting a few days on brand-new releases is an option'], ['안 쓰는 의존성은 지워요', 'remove unused dependencies']],
    caps: [['업데이트 봇', 'Update bots'], ['묶음과 자동 병합', 'Grouping and auto-merge'], ['락파일', 'Lockfiles'], ['미루면 비싸요', 'Deferral is costly'], ['의존성 업데이트', 'Dependency updates']]
  });
}

function sPrecommit() {
  return CW('op-precommit', {
    code: ['# .pre-commit-config.yaml', 'repos:', '- hooks: [prettier, eslint]', '- hooks: [gitleaks]', ['# 커밋 전에 로컬에서 몇 초 만에', '# seconds, locally, before the commit'], ['# CI도 같은 검사를 다시 실행', '# CI reruns the same checks']],
    hl: [[0, 3], [3, 1, 'danger'], [4, 1, 'ok'], [5, 1]],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, C = [['IDE', 0], ['hook', 1], ['CI', 2], ['prod', 3]];
      C.forEach(([t, i]) => nd(S, 'c' + i, X + i * 3.03, .5, 2.9, t, i === 3 ? 'danger' : 'line', 0, { h: 1.0 }));
      [['$', 0], ['$$', 1], ['$$$', 2], ['$$$$', 3]].forEach(([t, i]) => lbl(S, 'cs' + i, X + .2 + i * 3.03, 1.65, t, 'm r', 0));
      lbl(S, 'n1', X, 6.6, ['문제는 늦게 발견할수록 고치는 비용이 커져요', 'the later a problem is found, the more it costs to fix'], 'a', 1, { off: 2, w: 12 });
      sw(S, 'hk', X + 3.03, .5, 2.9, 1.0, 'rgba(0,160,90,.25)', 2, { css: 'z-index:4' }); chip(S, 'fm', X, 2.6, 5.8, ['포맷·린트 자동', 'format + lint'], 'ok', 2, { h: 1.0 });
      lbl(S, 'n2', X, 6.6, ['커밋 순간 포맷·린트를 몇 초 만에 돌려요', 'format and lint run in seconds at commit time'], 'g', 2, { off: 3, w: 12 });
      chip(S, 'gl', X + 6.2, 2.6, 5.8, ['비밀 키 감지 ✗', 'secret found ✗'], 'danger', 3, { h: 1.0 });
      lbl(S, 'n3', X, 6.6, ['키가 커밋되기 전에 막아요 · 한 번 푸시되면 교체해야 해요', 'stop keys before they are committed; pushed keys must be rotated'], 'r', 3, { off: 4, w: 12 });
      chip(S, 'ci', X, 4.2, 12.0, ['CI가 최종 관문', 'CI is the final gate'], 'warn', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['로컬은 빠른 피드백, CI는 강제 · 둘 다 같은 규칙', 'local for speed, CI for enforcement, with the same rules'], 'a', 4, { w: 12 });
    },
    notes: [['시프트 레프트는 검사를 개발 흐름의 앞쪽으로 당기는 생각이에요 · 같은 문제도 IDE에서 찾으면 싸고, 운영에서 찾으면 가장 비싸요', 'shifting left pulls checks earlier in the workflow, because a problem found in the IDE is cheap while one found in production is the most expensive'], ['pre-commit 훅은 커밋하는 순간 로컬에서 Prettier, ESLint 같은 포맷·린트를 돌려 몇 초 만에 고쳐 줘요 · 리뷰에서 스타일 논쟁이 사라져요', 'pre-commit hooks run formatters and linters such as Prettier and ESLint locally at commit time, fixing things in seconds and ending style debates in review'], ['gitleaks 같은 비밀 탐지 훅은 API 키가 커밋되기 전에 막아요 · 한 번 원격에 푸시된 키는 기록에 남으므로 지우는 것이 아니라 교체해야 해요', 'secret detection hooks such as gitleaks stop API keys before they are committed, since a key pushed to a remote stays in history and must be rotated, not just deleted'], ['훅은 --no-verify로 건너뛸 수 있어서 CI에서 같은 검사를 다시 돌려 최종 관문으로 써요 · 로컬은 빠른 피드백, CI는 강제예요', 'hooks can be skipped with --no-verify, so CI reruns the same checks as the final gate: local hooks for speed, CI for enforcement']],
    fin: [['시프트 레프트: 검사를 앞으로 당겨 싸게 고치고, CI에서 같은 규칙을 강제해요', 'shift left: move checks earlier to fix cheaply, and enforce the same rules in CI', 'opx-xs opx-a'], ['훅은 빨라야 해요 · 느린 검사는 CI로', 'hooks must be fast; slow checks go to CI'], ['GitHub 푸시 보호도 비밀 유출을 막아요', 'GitHub push protection also blocks leaked secrets']],
    caps: [['발견 비용', 'The cost of finding late'], ['포맷과 린트', 'Format and lint'], ['비밀 탐지', 'Secret detection'], ['최종 관문', 'The final gate'], ['시프트 레프트', 'Shifting left']]
  });
}

/* ===== DevOps · observability additions ===== */
function sPrometheus() {
  return CW('op-prometheus', {
    code: ['# scrape: 15초마다 /metrics를 가져와요', 'http_requests_total{route="/pay",', '                    status="500"} 42', 'sum(rate(http_requests_total', '  {status=~"5.."}[5m])) by (route)', ['# 라벨 조합 수 = 시계열 수', '# label combinations = series count']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 2, 'warn'], [5, 1, 'danger']],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      nd(S, 'pm', X, .5, 4.0, 'Prometheus', 'accent', 1, { h: 1.0 }); [0, 1, 2].forEach(i => { nd(S, 't' + i, X + 8.4, .2 + i * 1.3, 3.6, 'app:9100', 'line', 1, { h: 1.0, off: 2 }); arw(S, 'pa' + i, [X + 8.35, .7 + i * 1.3], [X + 4.05, 1.0], 1, { off: 2 }); }); lbl(S, 'pl', X + 5.0, 2.2, 'pull', 'm a', 1, { off: 2 });
      lbl(S, 'n1', X, 6.6, ['Prometheus가 대상의 /metrics를 주기적으로 당겨 와요', 'Prometheus pulls each target’s /metrics on a schedule'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'ct', X, 2.0, ['카운터: 계속 증가', 'counter: grows only'], 'm g', 2); [1, 2, 3, 5, 6, 8, 9, 11].forEach((v, i) => sw(S, 'cb' + i, X + i * .55, 3.9 - v * .12, .4, v * .12, tint('ok', 55), 2, { css: 'border:0' }));
      lbl(S, 'n2', X, 6.6, ['이름+라벨 하나가 시계열 하나 · 카운터는 누적값', 'one name plus labels is one series; counters accumulate'], 'g', 2, { off: 3, w: 12 });
      lbl(S, 'rt', X + 6.6, 2.0, 'rate(...[5m])', 'm w', 3); [3, 2, 4, 2, 3, 3].forEach((v, i) => sw(S, 'rb' + i, X + 6.6 + i * .55, 3.9 - v * .25, .4, v * .25, tint('warn', 55), 3, { css: 'border:0' }));
      lbl(S, 'n3', X, 6.6, ['rate로 초당 증가율을 구하고 라벨별로 합쳐요', 'rate gives per-second growth, summed by label'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'cd', X, 4.6, 12.0, ['user_id 라벨 ✗ → 시계열 폭발', 'user_id label ✗ → series explode'], 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['값이 무한한 라벨은 메모리를 터뜨려요', 'unbounded label values blow up memory'], 'r', 4, { w: 12 });
    },
    notes: [['Prometheus는 대상 앱의 /metrics 엔드포인트를 15초마다 당겨 오는(pull) 방식으로 메트릭을 모아요 · 쿠버네티스에서는 서비스 디스커버리로 대상을 자동으로 찾아요', 'Prometheus collects metrics by pulling each target’s /metrics endpoint every 15 seconds, discovering targets automatically through Kubernetes service discovery'], ['메트릭 이름과 라벨 조합 하나가 시계열 하나예요 · http_requests_total 같은 카운터는 계속 늘어나기만 하는 누적값이라 그대로 보면 의미가 적어요', 'each metric name plus label combination is one time series, and counters such as http_requests_total only accumulate, so raw values say little'], ['PromQL의 rate()는 5분 창에서 초당 증가율을 구하고, sum by (route)로 경로별로 합쳐 오류율 같은 지표를 만들어요 · 자주 쓰는 식은 기록 규칙으로 미리 계산해요', 'PromQL’s rate() computes per-second growth over a five-minute window, and sum by (route) aggregates per route into measures such as error rate, with recording rules precomputing common queries'], ['라벨 값이 무한하면 시계열이 폭발해요 · user_id나 요청 ID 같은 값은 라벨이 아니라 로그나 트레이스에 넣어요', 'unbounded label values explode the series count, so values such as user IDs or request IDs belong in logs or traces, not labels']],
    fin: [['Prometheus: pull로 수집하고, 라벨로 나누고, rate로 계산해요 · 카디널리티는 작게', 'Prometheus pulls metrics, slices them by label and computes with rate, keeping cardinality low', 'opx-xs opx-a'], ['Grafana로 대시보드를, Alertmanager로 알림을', 'Grafana for dashboards, Alertmanager for alerts'], ['장기 보관은 Thanos·Mimir 같은 저장소로', 'long-term storage via Thanos or Mimir']],
    caps: [['pull 수집', 'Pull-based scraping'], ['시계열과 카운터', 'Series and counters'], ['rate와 집계', 'Rates and aggregation'], ['카디널리티', 'Cardinality'], ['Prometheus', 'Prometheus']]
  });
}

function sRedUse() {
  return CW('op-red-use', {
    code: [['# RED: 서비스(요청) 관점', '# RED: the service (request) view'], ['#   Rate · Errors · Duration', '#   Rate, Errors, Duration'], ['# USE: 자원 관점', '# USE: the resource view'], ['#   Utilization · Saturation · Errors', '#   Utilization, Saturation, Errors'], ['# 골든 시그널: 지연·트래픽·오류·포화', '# golden signals: latency, traffic,'], ['#   (Google SRE)', '#   errors, saturation (Google SRE)']],
    hl: [[0, 2, 'ok'], [2, 2, 'warn'], [4, 2], [0, 1]],
    lh: 1.25,
    draw: (S) => {
      const X = 19.4;
      [['Rate', '1.2k rps'], ['Errors', '0.3%'], ['Duration', 'p99 210ms']].forEach(([t, v], i) => { nd(S, 'r' + i, X + i * 4.1, .4, 3.8, t, 'ok', 1, { h: 1.0 }); lbl(S, 'rv' + i, X + i * 4.1, 1.55, v, 'm g', 1); });
      lbl(S, 'n1', X, 6.6, ['RED: 사용자가 느끼는 서비스 상태를 세 숫자로', 'RED shows what users feel in three numbers'], 'g', 1, { off: 2, w: 12 });
      [['Util', '78%'], ['Satur.', 'queue 12'], ['Errors', 'disk 0']].forEach(([t, v], i) => { nd(S, 'u' + i, X + i * 4.1, 2.4, 3.8, t, 'warn', 2, { h: 1.0 }); lbl(S, 'uv' + i, X + i * 4.1, 3.55, v, 'm w', 2); });
      lbl(S, 'n2', X, 6.6, ['USE: CPU·메모리·디스크·커넥션 풀 같은 자원마다', 'USE checks each resource: CPU, memory, disk, pools'], 'w', 2, { off: 3, w: 12 });
      lbl(S, 'n3', X, 6.6, ['골든 시그널 네 가지도 같은 생각이에요', 'the four golden signals follow the same idea'], 'a', 3, { off: 4, w: 12 }); chip(S, 'gs', X, 4.4, 12.0, ['지연 · 트래픽 · 오류 · 포화', 'latency·traffic·errors·saturation'], 'accent', 3, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['대시보드 맨 위엔 RED, 아래엔 USE로 원인 추적', 'RED on top of the dashboard, USE below for causes'], 'a', 4, { w: 12 });
    },
    notes: [['RED 방법은 서비스마다 초당 요청 수(Rate), 오류율(Errors), 응답 시간 분포(Duration) 세 가지를 봐요 · 사용자가 느끼는 상태를 바로 보여줘요', 'the RED method tracks each service’s request rate, error rate and duration distribution, showing directly what users experience'], ['USE 방법은 CPU, 메모리, 디스크, 커넥션 풀 같은 자원마다 사용률(Utilization), 포화도(Saturation: 대기열), 오류를 봐요 · 병목 자원을 찾을 때 써요', 'the USE method checks utilization, saturation (queueing) and errors for each resource such as CPU, memory, disks and connection pools, finding bottlenecks'], ['Google SRE의 네 가지 골든 시그널(지연, 트래픽, 오류, 포화)도 같은 생각이에요 · 무엇을 볼지 정해 두면 대시보드가 일관돼요', 'Google SRE’s four golden signals (latency, traffic, errors, saturation) share the idea, and agreeing on them keeps dashboards consistent'], ['대시보드 맨 위에는 RED로 “사용자에게 문제가 있나”를, 아래에는 USE로 “어느 자원 때문인가”를 두면 장애 때 위에서 아래로 따라 내려가요', 'putting RED at the top of a dashboard answers “are users affected?” and USE below answers “which resource?”, so responders drill down top to bottom']],
    fin: [['RED는 요청, USE는 자원 · 증상에서 원인으로 내려가는 대시보드를 만들어요', 'RED covers requests and USE covers resources, building dashboards that drill from symptom to cause', 'opx-xs opx-a'], ['평균 대신 백분위수로 지연을 봐요', 'use percentiles, not averages, for latency'], ['대시보드도 코드로 관리해요', 'manage dashboards as code']],
    caps: [['RED', 'RED'], ['USE', 'USE'], ['골든 시그널', 'Golden signals'], ['대시보드 구성', 'Dashboard layout'], ['RED와 USE', 'RED and USE']]
  });
}

function sLogPipeline() {
  return CW('op-log-pipeline', {
    code: [['# 앱: 표준 출력으로 JSON 로그', '# app: JSON logs to stdout'], ['# 수집기: Fluent Bit · Vector (노드마다)', '# shipper: Fluent Bit, Vector (per node)'], ['# 버퍼 → 저장소: Loki · Elasticsearch', '# buffer → store: Loki, Elasticsearch'], ['# 보존: 핫 7일 → 콜드 90일 → 삭제', '# retention: hot 7d → cold 90d → delete'], ['# 디버그 로그는 샘플링 · 개인정보 마스킹', '# sample debug logs; mask personal data']],
    hl: [[0, 1], [1, 2, 'ok'], [3, 1, 'warn'], [4, 1, 'danger']],
    lh: 1.3,
    draw: (S) => {
      const X = 19.4, St = [['app', 'line'], ['agent', 'accent'], ['buffer', 'warn'], ['store', 'ok']];
      St.forEach(([t, c], i) => { nd(S, 's' + i, X + i * 3.03, .5, 2.9, t, c, i < 2 ? 1 : 2, { h: 1.0 }); if (i) arw(S, 'sa' + i, [X + i * 3.03 - .15, 1.0], [X + i * 3.03 - .02, 1.0], i < 2 ? 1 : 2); });
      lbl(S, 'so', X, 1.65, 'stdout', 'm', 1); lbl(S, 'n1', X, 6.6, ['앱은 표준 출력에만 쓰고, 노드의 수집기가 모아 보내요', 'apps write to stdout; a node agent collects and ships'], 'a', 1, { off: 2, w: 12 });
      lbl(S, 'bf', X + 6.06, 1.65, ['급증 흡수', 'absorbs spikes'], 'm w', 2); lbl(S, 'n2', X, 6.6, ['버퍼가 폭증을 받아내고 저장소가 색인·검색해요', 'a buffer absorbs bursts while the store indexes for search'], 'g', 2, { off: 3, w: 12 });
      [['hot 7d', 'ok', 3.4], ['cold 90d', 'warn', 5.4], ['delete', 'line', 3.0]].forEach(([t, c, w], i) => nd(S, 'r' + i, X + [0, 3.6, 9.2][i], 2.6, w - .2, t, c, 3, { h: 1.0 }));
      lbl(S, 'n3', X, 6.6, ['자주 보는 최근 로그만 비싼 저장소에 · 나머지는 싸게', 'only recent logs stay in fast storage; the rest goes cheap'], 'w', 3, { off: 4, w: 12 });
      chip(S, 'mk', X, 4.2, 12.0, 'j***@acme.dev · ****1234', 'danger', 4, { h: 1.0 });
      lbl(S, 'n4', X, 6.6, ['개인정보·비밀은 수집 단계에서 가리고, 디버그는 샘플링', 'mask personal data and secrets at collection; sample debug logs'], 'r', 4, { w: 12 });
    },
    notes: [['컨테이너 앱은 로그를 파일 대신 표준 출력(stdout)에 JSON으로 쓰고, 노드마다 도는 Fluent Bit이나 Vector 같은 수집기가 모아서 보내요', 'container apps write JSON logs to stdout instead of files, and an agent on each node such as Fluent Bit or Vector collects and ships them'], ['중간에 버퍼(Kafka나 수집기 자체 버퍼)를 두면 장애나 트래픽 폭증 때도 로그를 잃지 않고, Loki나 Elasticsearch 같은 저장소가 색인해 검색하게 해줘요', 'a buffer in between, such as Kafka or the agent’s own, keeps logs safe during outages and spikes, while stores such as Loki or Elasticsearch index them for search'], ['로그는 양이 많아 비용이 커요 · 최근 7일은 빠른 핫 저장소에, 그 이후는 오브젝트 스토리지 같은 콜드 저장소에 두고 보존 기간이 지나면 지워요', 'logs are voluminous and costly, so keep the last week in fast hot storage, move older logs to cold storage such as object storage, and delete them after retention'], ['이메일, 카드 번호, 토큰 같은 개인정보와 비밀은 수집 단계에서 가리고, 디버그 로그는 샘플링해서 양을 줄여요', 'mask personal data and secrets such as emails, card numbers and tokens during collection, and sample debug logs to cut volume']],
    fin: [['로그 파이프라인: stdout → 수집기 → 버퍼 → 저장소 · 보존 계층과 마스킹으로 비용과 위험 관리', 'log pipelines run stdout, agent, buffer, store, with retention tiers and masking for cost and risk', 'opx-xs opx-a'], ['trace ID를 로그에 넣어 트레이스와 연결해요', 'add trace IDs to link logs with traces'], ['감사 로그는 별도로 길게 보관해요', 'keep audit logs separately and longer']],
    caps: [['수집', 'Collection'], ['버퍼와 저장소', 'Buffers and stores'], ['보존 계층', 'Retention tiers'], ['마스킹과 샘플링', 'Masking and sampling'], ['로그 파이프라인', 'Log pipelines']]
  });
}
return { css: CSSX + CSSY, order: ['op-culture', 'op-git', 'op-delivery', 'op-pipelines', 'op-k8s-sec', 'op-k8s-adv', 'op-release', 'op-iac-adv', 'op-devsecops', 'op-obs'], secs: [
  sec('op-culture', '문화와 지표', 'Culture & metrics', 'DevOps의 문화와 지표', 'DevOps culture and metrics', 'DevOps가 무엇인지, 성과를 재는 DORA 지표, SRE의 수고와 에러 예산, 플랫폼 엔지니어링, 지속 가능한 온콜까지 도구보다 먼저 와야 하는 일하는 방식을 다뤄요.', 'What DevOps is, the DORA metrics for measuring delivery, SRE’s toil and error budgets, platform engineering and sustainable on-call: the ways of working that come before tools.', [
    item('op-devops', 'DevOps란', 'What DevOps is', '개발과 운영이 담장 너머로 일을 던지지 않고 한 팀·한 흐름으로 계획부터 운영까지 책임지는 문화와 실천이에요. CALMS로 점검해요.', '예전에는 개발팀이 기능을 만들어 넘기면 운영팀이 배포하고 지켰어요. 개발팀은 빨리 바꾸고 싶고 운영팀은 안정적이고 싶어서, 결과물을 담장 너머로 던지고 장애가 나면 서로 탓하기 쉬웠어요. 그 결과 배포는 드물고 크고 무서운 일이 됐죠. DevOps는 두 역할을 하나의 흐름으로 묶어 계획, 코드, 빌드, 테스트, 릴리스, 배포, 운영, 모니터링을 끊김 없는 고리로 돌리는 문화와 실천이에요. CALMS는 이를 점검하는 다섯 축으로 문화(비난 없는 협업), 자동화, 린(작게 자주), 측정, 공유를 뜻해요. “만든 팀이 운영까지(you build it, you run it)” 하면 장애와 운영 부담이 개발 결정으로 곧장 돌아와 품질이 좋아져요. DevOps는 직함이나 특정 도구 이름이 아니며, 도구는 문화를 뒷받침하는 수단이에요.', 'A culture and practice in which development and operations stop throwing work over the wall and own everything from planning to operations as one team and flow, checked with CALMS.', 'Developers used to build features and hand them to operations to deploy and maintain. Developers wanted change and operators wanted stability, so work was thrown over the wall and incidents turned into blame, making releases rare, large and frightening. DevOps joins both roles into one flow, running planning, coding, building, testing, releasing, deploying, operating and monitoring as an unbroken loop. CALMS gives five lenses for checking it: culture (blameless collaboration), automation, lean (small, frequent batches), measurement and sharing. With “you build it, you run it,” incidents and operational burden feed straight back into development decisions and quality rises. DevOps is not a job title or a particular tool; tools support the culture.', sDevops()),
    item('op-dora', 'DORA 지표', 'DORA metrics', '배포 빈도·변경 리드 타임(속도)과 변경 실패율·복구 시간(안정성)으로 소프트웨어 전달 성과를 재요. 최상위 팀은 둘 다 높아요.', 'DORA(DevOps Research and Assessment) 연구는 수만 개 조직을 조사해 소프트웨어 전달 성과를 재는 핵심 지표를 정리했어요. 처리량은 얼마나 자주 운영에 배포하는지(배포 빈도)와 커밋이 운영에 나가기까지 걸리는 시간(변경 리드 타임)으로, 안정성은 배포가 장애를 일으키는 비율(변경 실패율)과 실패한 배포에서 복구하는 시간으로 재요. 최상위 팀은 필요할 때마다 배포하고, 리드 타임이 하루 미만이며, 실패해도 한 시간 안에 복구해요. 중요한 발견은 속도와 안정성이 맞바꾸는 관계가 아니라 함께 좋아진다는 점이에요. 작은 변경을 자주 내보내면 하나하나의 위험이 작고 원인을 찾기도 쉽기 때문이에요. 지표는 Git, CI/CD, 장애 관리 도구에서 자동으로 계산해야 꾸준히 볼 수 있어요. 다만 팀 순위나 목표치로 쓰면 배포를 쪼개는 식으로 숫자만 꾸미게 되니, 추세를 보며 병목을 찾는 데 써요.', 'Delivery performance measured by deployment frequency and lead time (speed) and change failure rate and recovery time (stability); top teams excel at both.', 'DORA (DevOps Research and Assessment) surveyed tens of thousands of organizations to define key measures of software delivery. Throughput is measured by how often you deploy to production (deployment frequency) and how long a commit takes to reach production (lead time for changes); stability by the share of deployments causing failures (change failure rate) and the time to recover from a failed deployment. Top teams deploy on demand, have lead times under a day and recover within an hour. The key finding is that speed and stability are not a trade-off but improve together, because small, frequent changes carry less risk each and are easier to diagnose. Metrics should be computed automatically from Git, CI/CD and incident tools to be watched consistently. Used as team rankings or targets, they invite gaming such as splitting deployments, so use trends to find bottlenecks instead.', sDora()),
    item('op-sre', 'SRE', 'Site reliability engineering', '운영 문제를 소프트웨어 엔지니어링으로 푸는 Google의 방식이에요. 수고(toil)를 50% 아래로 묶고, SLO와 에러 예산으로 속도와 안정성을 조율해요.', 'SRE(사이트 신뢰성 엔지니어링)는 Google에서 시작된 방식으로, 운영을 소프트웨어 엔지니어가 코드와 자동화로 다뤄요. 핵심 개념 중 하나가 수고(toil)예요. 손으로 반복하고, 자동화할 수 있고, 해도 가치가 쌓이지 않으며, 서비스가 커질수록 같이 늘어나는 일, 예를 들어 서버 수동 재시작이나 반복되는 티켓 처리가 여기에 해당해요. SRE 팀은 수고를 업무 시간의 50% 아래로 묶고, 남는 시간은 자동화와 안정성 개선 같은 엔지니어링에 써요. 수고가 넘치면 개발팀에 운영 일을 돌려보내는 규칙을 두기도 해요. 또 SLO와 에러 예산으로 출시 속도를 조절해서, 예산이 남으면 빠르게 내보내고 바닥나면 기능 개발보다 안정화에 집중해요. 장애 뒤에는 비난 없는 포스트모템을 써요. DevOps가 철학이라면 SRE는 그 구체적인 구현이라는 뜻에서 “class SRE implements DevOps”라는 표현도 있어요.', 'Google’s approach of solving operations with software engineering, capping toil below half of the time and balancing speed and reliability with SLOs and error budgets.', 'Site reliability engineering (SRE), born at Google, has software engineers handle operations with code and automation. A core idea is toil: work that is manual, repetitive, automatable, leaves no lasting value and grows with the service, such as manual restarts or recurring tickets. SRE teams cap toil below half their time and spend the rest on engineering such as automation and reliability improvements, sometimes handing operational work back to developers when toil overflows. SLOs and error budgets pace releases, shipping fast while budget remains and prioritizing stability over features when it runs out. Incidents are followed by blameless postmortems. If DevOps is the philosophy, SRE is a concrete implementation, hence the phrase “class SRE implements DevOps.”', sSre()),
    item('op-platform', '플랫폼 엔지니어링', 'Platform engineering', '공통 인프라를 내부 개발자 플랫폼(IDP)과 골든 패스로 셀프서비스화해 서비스 팀의 인지 부하를 줄여요. 플랫폼도 개발자를 고객으로 하는 제품이에요.', '서비스 팀마다 쿠버네티스, CI, IaC, 로그, 인증서, DNS를 모두 직접 다루면 배울 것이 너무 많아 정작 제품 개발이 느려져요. 플랫폼 엔지니어링은 이런 공통 인프라를 내부 개발자 플랫폼(IDP)으로 묶어 셀프서비스로 제공해요. 팀은 운영팀에 티켓을 쓰고 기다리는 대신 포털이나 명령 하나로 필요한 것을 바로 만들어요. 골든 패스는 검증된 기본 경로로, 템플릿 하나로 저장소, CI/CD 파이프라인, 대시보드, 알림, 런북까지 갖춘 서비스 뼈대가 생겨요. 권장 경로를 가장 쉬운 길로 만들되 다른 길을 막지는 않는 것이 요령이에요. Backstage 같은 포털로 서비스 카탈로그와 문서를 한곳에 모으기도 해요. 플랫폼은 개발자를 고객으로 하는 제품이라 사용률, 개발자 만족도, 첫 배포까지 걸리는 시간으로 평가하고, 작은 조직은 관리형 클라우드 서비스만으로도 충분할 수 있어요.', 'Self-service shared infrastructure through an internal developer platform (IDP) and golden paths, cutting service teams’ cognitive load; the platform is a product whose customers are developers.', 'When every service team handles Kubernetes, CI, IaC, logging, certificates and DNS directly, the learning load slows actual product work. Platform engineering bundles this shared infrastructure into an internal developer platform (IDP) offered as self-service, so teams create what they need from a portal or a single command instead of filing tickets and waiting. Golden paths are proven default routes: one template yields a service skeleton with repository, CI/CD pipeline, dashboards, alerts and runbooks. The trick is to make the recommended path the easiest one without forbidding others. Portals such as Backstage gather service catalogs and documentation in one place. The platform is a product with developers as customers, judged by adoption, developer satisfaction and time to first deploy, and small organizations may need nothing more than managed cloud services.', sPlatform()),
    item('op-oncall', '온콜 운영', 'Running on-call', '알림을 받는 당번을 자동 에스컬레이션·런북·호출 줄이기·보상·시간대 교대로 지속 가능하게 운영해요. 지친 사람은 실수해요.', '온콜은 정해진 기간 동안 장애 알림을 받아 대응하는 당번이에요. 1차 담당자가 15분 같은 정해진 시간 안에 응답하지 않으면 2차, 그다음 리드에게 자동으로 넘어가는 에스컬레이션 정책을 둬서 알림이 묻히지 않게 해요. 모든 알림에는 무엇을 확인하고 어떻게 조치할지 적힌 런북을 연결해서 처음 겪는 사람도 새벽에 따라 할 수 있게 해요. 근무 시간 밖 호출 횟수를 주마다 추적하고, 시끄럽거나 조치할 게 없는 알림부터 고치거나 없애요. 온콜 부담은 휴식이나 수당으로 보상하고, 교대할 때는 진행 중인 문제를 인계 메모로 넘겨요. 여러 시간대에 팀이 있다면 각자의 낮 시간에 돌아가며 맡는 follow-the-sun 방식으로 밤샘을 없앨 수 있어요. 지친 온콜은 판단 실수로 이어지기 때문에 지속 가능성이 곧 신뢰성이에요. PagerDuty, Opsgenie 같은 도구가 순번과 에스컬레이션을 관리해요.', 'Sustainable on-call through automatic escalation, runbooks, fewer and compensated pages and time-zone rotations, because exhausted people make mistakes.', 'On-call is a rotation for receiving and responding to incident alerts. Escalation policies pass an unacknowledged alert from the primary to the secondary and then a lead after a set window such as 15 minutes, so nothing gets lost. Every alert links a runbook stating what to check and how to act, so even a first-timer can follow it in the middle of the night. Track out-of-hours pages weekly and fix or remove the noisiest and least actionable alerts first. Compensate on-call load with time off or pay, and hand over ongoing issues with notes at each shift change. Teams spread across time zones can use follow-the-sun rotations so each covers its own daytime and no one works nights. Exhausted responders make poor decisions, so sustainability is reliability. Tools such as PagerDuty and Opsgenie manage rotations and escalations.', sOncall())
  ]),
  sec('op-pipelines', '파이프라인 심화', 'Pipelines in depth', 'CI/CD 파이프라인 심화', 'CI/CD pipelines in depth', '단계 설계와 빠른 실패, GitHub Actions 워크플로, 빌드 캐시, 한 번 빌드해 여러 번 배포하는 불변 산출물, PR마다 뜨는 프리뷰 환경, 유의적 버전과 자동 릴리스까지 실무 파이프라인을 다뤄요.', 'Stage design and failing fast, GitHub Actions workflows, build caching, immutable artifacts built once and deployed many times, per-PR preview environments, and semantic versioning with automated releases.', [
    item('op-pipeline', '파이프라인 설계', 'Pipeline design', '싸고 빠른 검사를 앞에, 독립 단계는 병렬로, 실패하면 즉시 멈춰요. 커밋부터 피드백까지 10분 안팎을 목표로 해요.', '파이프라인은 단계의 순서와 구성이 속도를 좌우해요. 린트, 타입 검사, 단위 테스트처럼 싸고 빠르며 자주 깨지는 검사를 앞에 두면 실패를 가장 빨리 알 수 있어요. 통합 테스트와 보안 스캔처럼 서로 의존하지 않는 단계는 병렬로 돌려 전체 시간을 줄여요. 한 단계라도 실패하면 뒤 단계는 건너뛰고 바로 작성자에게 알려요(fail fast). 이렇게 해야 깨진 결과물이 스테이징이나 운영으로 넘어가지 않아요. 커밋부터 피드백까지 10분 안팎을 목표로 하는데, 파이프라인이 느리면 사람들이 변경을 크게 묶거나 검사를 건너뛰기 시작하기 때문이에요. 가끔 실패하는 불안정한(flaky) 테스트는 신뢰를 무너뜨리므로 바로 격리하고 고쳐요. 파이프라인 정의도 저장소의 코드로 두고 리뷰하며, 단계별 소요 시간을 추적해 가장 느린 단계부터 개선해요.', 'Put cheap, fast checks first, run independent stages in parallel and stop on the first failure, aiming for feedback within about ten minutes of a commit.', 'Stage order and structure determine pipeline speed. Cheap, fast and frequently failing checks such as linting, type checks and unit tests go first so failures surface soonest. Independent stages such as integration tests and security scans run in parallel to cut total time. When any stage fails, the rest are skipped and the author is notified immediately (fail fast), so broken artifacts never reach staging or production. Aim for roughly ten minutes from commit to feedback, because slow pipelines push people toward large batches and skipped checks. Flaky tests that fail intermittently destroy trust, so quarantine and fix them right away. Keep pipeline definitions as reviewed code in the repository, track time per stage and improve the slowest first.', sPipeline()),
    item('op-gha', 'GitHub Actions 워크플로', 'GitHub Actions workflows', 'on(언제), jobs와 runs-on(어디서), matrix(조합), steps(무엇을)로 구성된 YAML 파일이에요. 잡은 새 러너에서 기본적으로 병렬로 돌아요.', 'GitHub Actions 워크플로는 저장소의 .github/workflows 폴더에 두는 YAML 파일이에요. on에는 PR 생성, main 브랜치 푸시, 정해진 시간, 수동 실행 같은 트리거를 적어요. jobs 아래 각 잡은 runs-on으로 정한 새 러너(가상 머신)에서 실행되고, needs로 순서를 정하지 않으면 잡끼리는 병렬로 돌아요. matrix는 Node 20과 22, 여러 운영체제처럼 조합마다 같은 잡을 복제해 동시에 시험해요. steps는 순서대로 실행되는데, uses는 actions/checkout처럼 다른 사람이 만든 액션을 불러오고 run은 셸 명령을 실행해요. 비밀값은 저장소나 환경의 secrets에 넣고 ${{ secrets.NAME }}으로 넘기며 로그에서는 가려져요. 보안을 위해 서드파티 액션은 태그 대신 커밋 SHA로 고정하고, GITHUB_TOKEN의 권한은 permissions로 최소화해요. 클라우드 배포는 저장된 키 대신 OIDC 연동으로 임시 자격 증명을 받아요.', 'A YAML file made of on (when), jobs with runs-on (where), matrix (combinations) and steps (what); jobs run on fresh runners in parallel by default.', 'GitHub Actions workflows are YAML files in the repository’s .github/workflows folder. on lists triggers such as pull requests, pushes to main, schedules or manual runs. Each job under jobs runs on a fresh runner (a virtual machine) chosen by runs-on, and jobs run in parallel unless needs orders them. A matrix copies a job across combinations such as Node 20 and 22 or several operating systems and tests them at once. Steps run in order: uses pulls in actions written by others, such as actions/checkout, and run executes shell commands. Secrets live in repository or environment secrets, are passed as ${{ secrets.NAME }} and are masked in logs. For safety, pin third-party actions to commit SHAs rather than tags and minimize GITHUB_TOKEN permissions with permissions. Cloud deployments use OIDC federation for temporary credentials instead of stored keys.', sGha()),
    item('op-cache', '빌드 캐시', 'Build caching', '락파일 해시 같은 입력의 해시를 키로 결과를 저장해, 바뀌지 않은 부분은 다시 하지 않아요. Docker 레이어 순서와 원격 캐시로 더 빨라져요.', 'CI 러너는 매번 깨끗한 상태로 시작해서 아무것도 하지 않으면 의존성을 매번 새로 내려받고 전부 다시 빌드해요. 빌드 캐시는 입력의 해시를 키로 결과를 저장해 두는 방식이에요. 예를 들어 package-lock.json의 해시로 npm 캐시 키를 만들면, 락파일이 그대로인 동안 키가 같아 캐시가 적중하고 다운로드와 설치를 건너뛰어 몇 분을 아껴요. 락파일이 바뀌면 새 키로 다시 저장해요. Docker 빌드는 레이어 단위로 캐시되므로, 의존성 설치를 먼저 하고 자주 바뀌는 코드 복사를 뒤에 두면 코드만 바뀌었을 때 설치 레이어를 재사용해요. CI에서는 레지스트리나 GitHub Actions 캐시에 레이어 캐시를 내보내 공유해요. Turborepo, Nx, Bazel 같은 도구는 작업 입력의 해시로 빌드·테스트 결과를 원격 캐시에 저장해서 CI와 개발자 PC가 서로의 결과를 재사용해요. 캐시에 비밀값이 섞이지 않게 주의해요.', 'Store results under a hash of their inputs, such as a lockfile hash, so unchanged work is not redone, with Docker layer order and remote caches adding more speed.', 'CI runners start clean every time, so without caching they re-download dependencies and rebuild everything on each run. A build cache stores results under a key derived from a hash of the inputs. For example, keying the npm cache on the hash of package-lock.json means the key stays the same while the lockfile does, so the cache hits and downloads and installs are skipped, saving minutes; a changed lockfile saves under a new key. Docker builds cache per layer, so installing dependencies before copying frequently changing code reuses the install layer when only code changes, and CI can export layer caches to a registry or the GitHub Actions cache to share them. Tools such as Turborepo, Nx and Bazel store build and test outputs in remote caches keyed by input hashes, letting CI and developer machines reuse each other’s work. Take care that secrets never end up in caches.', sCache()),
    item('op-artifact', '한 번 빌드, 여러 번 배포', 'Build once, deploy many', '커밋 SHA로 태그한 불변 이미지를 한 번만 빌드하고, 같은 이미지를 개발·스테이징·운영으로 승격해요. 환경 차이는 설정으로만 둬요.', '파이프라인에서 빌드는 딱 한 번 해요. 결과 이미지에 커밋 SHA를 태그로 붙여 ECR, Artifact Registry, GHCR 같은 레지스트리에 올리고, 그 이미지를 개발, 스테이징, 운영으로 차례로 승격(promote)해요. 환경마다 다시 빌드하면 그 사이 의존성이나 베이스 이미지가 바뀌어 테스트한 것과 다른 것이 배포될 수 있어요. 환경 사이의 차이는 DB 주소, 기능 플래그 같은 설정과 환경 변수로만 두고, 코드와 이미지는 똑같아야 해요. latest처럼 계속 움직이는 태그는 지금 무엇이 돌고 있는지 흐리고, 노드마다 다른 이미지를 받게 만들 수도 있어요. 커밋 SHA나 sha256 다이제스트로 고정해야 배포 기록, 장애 추적, 롤백이 정확해져요. 같은 원리가 라이브러리에도 적용돼서, 한 번 배포한 버전 번호는 다시 덮어쓰지 않아요. 레지스트리에는 보관 기간과 정리 규칙을 정해 용량을 관리해요.', 'Build an immutable image tagged with the commit SHA exactly once and promote that same image through dev, staging and production, with environments differing only in config.', 'A pipeline builds exactly once. The resulting image is tagged with its commit SHA, pushed to a registry such as ECR, Artifact Registry or GHCR, and promoted through dev, staging and production in turn. Rebuilding per environment risks dependencies or base images changing in between, shipping something other than what was tested. Differences between environments live only in config and environment variables such as database URLs and feature flags, while code and image stay identical. Moving tags such as latest blur what is running and can even give different nodes different images. Pinning commit SHAs or sha256 digests keeps deployment records, incident tracing and rollbacks exact. The same principle applies to libraries: a published version number is never overwritten. Registries need retention and cleanup rules to manage storage.', sArtifact()),
    item('op-preview', '프리뷰 환경', 'Preview environments', 'PR이 열릴 때마다 그 브랜치를 전용 주소에 자동 배포하고, 닫히면 지워요. 리뷰어가 병합 전에 실제 동작을 확인해요.', '프리뷰 환경은 PR이 열릴 때마다 그 브랜치를 pr-142.preview.acme.dev 같은 전용 주소에 자동으로 배포하는 임시 환경이에요. 리뷰어는 코드 변경과 함께 실제로 돌아가는 화면을 링크 하나로 확인하고, QA나 기획, 디자인 담당자도 병합 전에 피드백할 수 있어요. 공유 스테이징 하나를 여러 PR이 번갈아 쓰면 서로의 변경이 섞이지만, 프리뷰 환경은 PR마다 분리돼 있어요. 데이터는 운영 데이터 대신 테스트 데이터(seed)를 채운 전용 DB나 공유 테스트 DB의 분리된 스키마를 써요. PR이 병합되거나 닫히면 환경을 자동으로 지우고, 잊힌 환경을 위해 수명(TTL)도 걸어 비용이 새지 않게 해요. 쿠버네티스에서는 PR마다 네임스페이스를 만들어 구현하고, Vercel이나 Netlify 같은 플랫폼은 프런트엔드에 이 기능을 기본으로 줘요. 외부에서 접근할 수 있으니 인증이나 IP 제한을 걸어요.', 'A temporary environment that deploys each pull request’s branch to its own address and disappears when the PR closes, so reviewers see real behavior before merging.', 'Preview environments deploy each pull request’s branch automatically to its own address, such as pr-142.preview.acme.dev. Reviewers see the running result from a single link alongside the code, and QA, product and design can give feedback before merging. A single shared staging environment mixes changes from several PRs, whereas preview environments are isolated per PR. Data comes from a dedicated database seeded with test data or a separate schema in a shared test database rather than production data. Merged or closed PRs delete their environments automatically, and TTLs catch forgotten ones so costs do not leak. On Kubernetes this is typically a namespace per PR, and platforms such as Vercel and Netlify provide it by default for frontends. Because they are reachable from outside, add authentication or IP restrictions.', sPreview()),
    item('op-semver', '유의적 버전과 자동 릴리스', 'Semantic versioning and automated releases', 'MAJOR.MINOR.PATCH로 호환성을 약속하고, Conventional Commits 규칙으로 다음 버전·변경 기록·릴리스를 자동으로 만들어요.', '유의적 버전(SemVer)은 MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요. 기존 사용자를 깨뜨리는 변경은 MAJOR, 호환되는 기능 추가는 MINOR, 버그 수정은 PATCH를 올려요. 그래서 버전 번호만 보고도 업그레이드가 안전한지 판단할 수 있어요. Conventional Commits 규칙으로 커밋 메시지를 feat:, fix:처럼 쓰면 도구가 다음 버전을 계산할 수 있고, 느낌표(feat!)나 BREAKING CHANGE 꼬리말은 MAJOR를 뜻해요. semantic-release나 release-please는 병합된 커밋을 읽어 버전 결정, Git 태그, CHANGELOG 작성, 패키지 배포까지 자동으로 해줘요. 의존하는 쪽은 ^1.4.0 같은 범위로 1.x 안의 안전한 업데이트만 자동으로 받고, 2.0 같은 MAJOR는 변경 기록을 읽고 직접 올려요. 0.x 버전은 아직 안정화 전이라 MINOR에서도 깨질 수 있다는 뜻이에요. 실제 설치되는 버전은 락파일로 고정해요.', 'MAJOR.MINOR.PATCH promises compatibility in numbers, and Conventional Commits let tools produce the next version, changelog and release automatically.', 'Semantic versioning (SemVer) signals the nature of a change with three numbers, MAJOR.MINOR.PATCH: changes that break existing users bump MAJOR, compatible features bump MINOR and bug fixes bump PATCH, so the version alone tells you whether an upgrade is safe. With Conventional Commits, messages written as feat: or fix: let tools compute the next version, and an exclamation mark (feat!) or a BREAKING CHANGE footer means MAJOR. semantic-release and release-please read merged commits to decide the version, tag Git, write the CHANGELOG and publish packages automatically. Consumers use ranges such as ^1.4.0 to accept safe updates within 1.x automatically and adopt MAJOR versions such as 2.0 deliberately after reading the changelog. Versions below 1.0 are pre-stable, so even MINOR releases may break. Lockfiles pin what actually gets installed.', sSemver())
  ]),
  sec('op-k8s-adv', '쿠버네티스 심화', 'Kubernetes in depth', '쿠버네티스 운영 심화', 'Operating Kubernetes in depth', '스케줄링 제어, Helm 패키징, 상태 있는 앱을 위한 StatefulSet, 네임스페이스와 RBAC·NetworkPolicy, 그리고 운영 지식을 코드로 담는 오퍼레이터까지 쿠버네티스를 실제로 운영할 때 필요한 개념이에요.', 'Scheduling control, Helm packaging, StatefulSets for stateful apps, namespaces with RBAC and NetworkPolicies, and operators that encode operational knowledge: what running Kubernetes for real requires.', [
    item('op-k8s-sched', '스케줄링 제어', 'Scheduling control', '라벨·어피니티로 노드를 고르고, 테인트·톨러레이션으로 막고, 분산 규칙으로 복제본을 영역마다 고르게 나눠요.', '쿠버네티스 스케줄러는 자원 요청이 맞는 노드 중에서 점수를 매겨 파드를 배치해요. 특정 노드에만 보내고 싶으면 nodeSelector나 노드 어피니티로 gpu=true 같은 라벨이 붙은 노드를 고르게 해요. 반대로 테인트는 노드가 파드를 밀어내는 표시예요. 같은 키의 톨러레이션을 가진 파드만 들어올 수 있어서 GPU나 ML 전용 노드처럼 비싼 자원을 일반 파드로부터 지킬 때 써요. topologySpreadConstraints는 복제본을 가용 영역이나 노드에 고르게 나눠요. maxSkew를 1로 두면 영역 사이 파드 수 차이가 1을 넘지 않아서 한 영역이 통째로 죽어도 나머지가 버텨요. 파드 어피니티는 캐시처럼 가까이 두고 싶은 파드끼리 끌어당기고, 안티 어피니티는 같은 서비스 복제본이 한 노드에 몰리지 않게 떼어놓아요. 규칙이 너무 빡빡하면 들어갈 노드가 없어 파드가 Pending에 머무르니 required와 preferred를 구분해 써요. 노드 점검 때 동시에 몇 개까지 내려도 되는지는 PodDisruptionBudget으로 정해요.', 'Pick nodes with labels and affinity, keep pods off with taints and tolerations, and spread replicas evenly across zones with spread constraints.', 'The Kubernetes scheduler scores nodes whose capacity fits a pod’s requests and places it on the best one. To target specific nodes, nodeSelector or node affinity restricts pods to nodes labeled, for example, gpu=true. Taints work the other way: a node repels pods unless they carry a matching toleration, which protects expensive capacity such as GPU or ML nodes from ordinary workloads. topologySpreadConstraints spread replicas evenly across zones or nodes; with maxSkew set to 1, per-zone counts differ by at most one, so losing a whole zone leaves the rest standing. Pod affinity pulls related pods such as caches together, while anti-affinity keeps replicas of one service off the same node. Rules that are too strict leave pods Pending with nowhere to go, so distinguish required from preferred rules. PodDisruptionBudgets set how many pods may go down at once during node maintenance.', sK8sSched()),
    item('op-helm', 'Helm과 Kustomize', 'Helm and Kustomize', 'Helm은 매니페스트를 템플릿 차트로 묶고 값 파일로 환경을 나누며 릴리스 이력으로 롤백해요. Kustomize는 기본 YAML에 패치를 겹쳐요.', '서비스 하나를 배포하려면 Deployment, Service, Ingress, ConfigMap, HPA 같은 매니페스트가 여러 개 필요하고, 환경마다 복제본 수나 이미지 태그만 조금씩 달라요. Helm 차트는 이 매니페스트들을 {{ .Values.replicaCount }}처럼 값을 끼워 넣는 템플릿으로 묶은 패키지예요. 환경마다 values-dev.yaml, values-prod.yaml 같은 값 파일만 다르게 두고 같은 차트를 재사용하며, 공개 차트로 Redis나 Prometheus 같은 소프트웨어도 명령 하나로 설치해요. helm upgrade --install은 없으면 설치하고 있으면 업그레이드하며, 그때마다 번호가 붙은 릴리스 이력을 남겨요. 문제가 생기면 helm rollback으로 이전 릴리스로 되돌려요. Kustomize는 템플릿 없이 기본 YAML(base)에 환경별 패치(overlay)를 겹치는 방식으로 kubectl에 내장돼 있어요. 템플릿 문법이 복잡해지기 쉬운 Helm과 달리 단순하지만 패키지 배포 기능은 없어요. 둘 다 Argo CD 같은 GitOps 도구와 함께 쓰는 경우가 많아요.', 'Helm bundles manifests into templated charts, splits environments with values files and rolls back via release history, while Kustomize layers patches over plain YAML.', 'Deploying one service takes several manifests, such as a Deployment, Service, Ingress, ConfigMap and HPA, that differ slightly per environment in replica counts or image tags. A Helm chart packages them as templates with slots such as {{ .Values.replicaCount }}. Environments reuse one chart with different values files such as values-dev.yaml and values-prod.yaml, and public charts install software such as Redis or Prometheus with a single command. helm upgrade --install installs or upgrades as needed and records a numbered release each time, and helm rollback returns to an earlier release when something breaks. Kustomize, built into kubectl, takes a different approach: patches (overlays) per environment layered over plain base YAML, with no templates. It is simpler than Helm, whose templates can grow complex, but has no packaging or distribution. Both are often paired with GitOps tools such as Argo CD.', sHelm()),
    item('op-statefulset', 'StatefulSet과 볼륨', 'StatefulSets and volumes', '파드마다 고정된 이름·순서·DNS와 전용 볼륨(PVC)을 줘서 DB 같은 상태 있는 앱을 운영해요. 다시 생겨도 데이터가 그대로예요.', 'Deployment의 파드는 서로 바꿔 쓸 수 있는 소모품이라 이름도 무작위이고 볼륨도 공유하거나 없어요. 하지만 DB나 Kafka 같은 앱은 “0번이 주 서버, 1·2번이 복제본”처럼 각자의 정체성과 데이터가 중요해요. StatefulSet은 파드 이름을 db-0, db-1, db-2로 고정하고, 0번부터 순서대로 만들고 역순으로 지워요. volumeClaimTemplates가 파드마다 PersistentVolumeClaim(PVC)을 만들고, StorageClass가 gp3 같은 실제 디스크를 동적으로 준비해요. 헤드리스 서비스(clusterIP: None)와 함께 쓰면 db-1.db.ns.svc처럼 파드마다 고정 DNS 이름이 생겨 복제 설정에 쓸 수 있어요. 파드가 죽거나 다른 노드로 옮겨도 같은 이름과 같은 볼륨으로 다시 붙어 데이터가 이어져요. PVC는 StatefulSet을 지워도 기본으로 남아 데이터를 보호해요. 다만 백업, 장애 조치, 업그레이드 같은 운영은 직접 챙겨야 해서 관리형 DB가 더 쉬운 경우가 많고, 직접 운영한다면 오퍼레이터를 함께 써요.', 'Stable names, ordering and DNS plus a dedicated volume (PVC) per pod let StatefulSets run stateful apps such as databases, keeping data across restarts.', 'Pods in a Deployment are interchangeable and disposable, with random names and shared or no volumes. Databases and systems such as Kafka, however, care about identity and data, as in “0 is the primary and 1 and 2 are replicas.” A StatefulSet fixes pod names as db-0, db-1 and db-2, creating them in order from 0 and deleting them in reverse. volumeClaimTemplates create a PersistentVolumeClaim (PVC) per pod, and a StorageClass provisions real disks such as gp3 dynamically. With a headless Service (clusterIP: None), each pod gets a stable DNS name such as db-1.db.ns.svc, usable for replication setup. A pod that dies or moves to another node returns with the same name and volume, so its data carries on, and PVCs survive deleting the StatefulSet by default to protect data. Backups, failover and upgrades remain your job, which often makes managed databases easier; if you run them yourself, add an operator.', sStateful()),
    item('op-k8s-rbac', '네임스페이스·RBAC·네트워크 정책', 'Namespaces, RBAC and network policies', '네임스페이스로 공간을 나누고, Role·RoleBinding으로 권한을 최소화하고, NetworkPolicy로 파드 사이 통신을 필요한 것만 허용해요.', '여러 팀이 한 클러스터를 함께 쓰려면 경계가 필요해요. 네임스페이스는 클러스터를 team-a, team-b처럼 팀이나 환경별 공간으로 나누고, 권한, 자원 쿼터, 네트워크 정책이 적용되는 단위가 돼요. Role은 어떤 API 그룹의 어떤 리소스에 어떤 동작(get, list, update, delete)을 허용할지 적은 목록이고, 적지 않은 것은 모두 거부돼요. RoleBinding은 그 Role을 사람이나 CI 같은 서비스 계정에 연결해요. 클러스터 전체에 걸친 권한은 ClusterRole과 ClusterRoleBinding으로 따로 다루며, cluster-admin은 아주 드물게만 줘요. 네트워크 쪽은 기본적으로 모든 파드가 서로 통신할 수 있어서, 하나가 뚫리면 침입이 퍼지기 쉬워요. NetworkPolicy로 “web 파드만 db의 5432에 접속 가능”처럼 허용 규칙을 두고 나머지는 막으면 피해 범위가 줄어요. NetworkPolicy는 Calico나 Cilium처럼 이를 지원하는 CNI 플러그인이 있어야 실제로 동작해요.', 'Namespaces divide the cluster, Roles and RoleBindings minimize permissions, and NetworkPolicies allow only the pod-to-pod traffic that is needed.', 'Several teams sharing one cluster need boundaries. Namespaces divide a cluster into spaces per team or environment, such as team-a and team-b, and act as the unit for permissions, resource quotas and network policies. A Role lists which verbs (get, list, update, delete) are allowed on which resources in which API groups, and everything unlisted is denied. A RoleBinding attaches that Role to people or service accounts such as CI. Cluster-wide permissions use ClusterRoles and ClusterRoleBindings, and cluster-admin should be granted very rarely. On the network side, every pod can reach every other by default, so one compromise spreads easily. NetworkPolicies that allow only rules such as “web pods may reach db on 5432” and block the rest shrink the blast radius. They take effect only with a CNI plugin that enforces them, such as Calico or Cilium.', sK8sRbac()),
    item('op-operator', '오퍼레이터와 CRD', 'Operators and CRDs', 'CRD로 새 리소스 종류를 만들고, 오퍼레이터가 조정 루프로 원하는 상태를 맞추며 DB 장애 조치·백업 같은 운영 지식을 자동으로 실행해요.', '쿠버네티스는 Deployment, Service 같은 기본 리소스 말고도 CRD(CustomResourceDefinition)로 PostgresCluster 같은 새 리소스 종류를 추가할 수 있어요. 추가된 리소스도 kubectl과 YAML로 똑같이 다뤄요. 오퍼레이터는 그 리소스를 지켜보는 컨트롤러예요. 원하는 상태와 실제 상태를 관찰하고 비교해 차이를 메우는 조정(reconcile) 루프를 계속 돌아요. 예를 들어 DB 오퍼레이터는 “인스턴스 3개, 매일 새벽 3시 백업”이라는 선언을 받아 StatefulSet과 서비스를 만들고, 복제를 설정하고, 주 서버가 죽으면 복제본을 승격하고, 백업을 돌리는 식으로 DB 운영자가 하던 일을 코드로 자동화해요. cert-manager(TLS 인증서 발급과 갱신), Prometheus Operator, Strimzi(Kafka)처럼 많은 소프트웨어가 오퍼레이터로 배포돼요. Kubebuilder나 Operator SDK로 직접 만들 수도 있지만, 오퍼레이터는 클러스터 권한이 크니 성숙도와 유지보수 상태를 보고 골라요. 쿠버네티스 자체도 같은 조정 원리로 돌아가요.', 'CRDs add new resource kinds, and operators reconcile them toward the desired state, automating operational know-how such as database failover and backups.', 'Beyond built-in resources such as Deployments and Services, Kubernetes can gain new resource kinds such as PostgresCluster through CustomResourceDefinitions (CRDs), handled with kubectl and YAML like any other. An operator is a controller watching those resources, running a reconcile loop that observes desired and actual state, compares them and closes the gap. A database operator, for example, takes a declaration such as “three instances, backups daily at 3 a.m.” and creates StatefulSets and Services, configures replication, promotes a replica when the primary dies and runs backups, automating what a DBA used to do. Much software ships as operators, including cert-manager for issuing and renewing TLS certificates, the Prometheus Operator and Strimzi for Kafka. You can build your own with Kubebuilder or the Operator SDK, but operators hold broad cluster permissions, so choose by maturity and maintenance. Kubernetes itself runs on the same reconcile principle.', sOperator())
  ]),
  sec('op-iac-adv', 'IaC 심화', 'IaC in depth', '인프라 코드 심화', 'Infrastructure as code in depth', 'Terraform의 plan·apply·상태와 드리프트, 모듈과 환경 분리, Ansible 같은 구성 관리와 불변 인프라, 규칙을 코드로 지키는 정책 코드까지 인프라를 코드로 안전하게 다루는 방법이에요.', 'Terraform’s plan, apply, state and drift, modules and environment separation, configuration management such as Ansible versus immutable infrastructure, and policy as code: handling infrastructure safely as code.', [
    item('op-terraform', 'Terraform 워크플로', 'The Terraform workflow', '코드를 선언하고 plan으로 바뀔 내용을 미리 보고 리뷰한 뒤 apply해요. 상태는 원격에 잠금과 함께 두고, 손으로 바꾼 드리프트를 막아요.', 'Terraform은 HCL로 S3 버킷, VPC, DB 같은 원하는 인프라를 선언해요. terraform plan은 코드, 상태 파일, 실제 클라우드를 비교해 무엇이 생기고(+), 바뀌고(~), 지워질지(-) 미리 보여줘요. 이 계획을 PR에 올려 리뷰하고, 승인된 계획을 terraform apply로 실행하면 실제 리소스가 만들어지고 결과가 상태 파일에 기록돼요. 상태 파일은 코드와 실제 리소스를 잇는 장부라서 S3, GCS, Terraform Cloud 같은 원격 백엔드에 두고 잠금을 걸어 두 사람이 동시에 apply하는 사고를 막아요. 상태에는 DB 비밀번호 같은 값이 평문으로 들어갈 수 있어 접근 권한과 암호화도 챙겨요. 누군가 콘솔에서 손으로 설정을 바꾸면 코드와 실제가 어긋나는 드리프트가 생기고, 다음 plan이 이를 되돌리려 해서 혼란이 생겨요. 그래서 변경은 코드로만 하고, 정기적으로 plan을 돌려 드리프트를 감지해요. OpenTofu는 Terraform의 오픈소스 포크이고, Pulumi와 CDK는 일반 프로그래밍 언어로 같은 일을 해요.', 'Declare infrastructure, preview changes with plan, review, then apply, keeping state remote and locked and preventing drift from manual changes.', 'Terraform declares desired infrastructure such as S3 buckets, VPCs and databases in HCL. terraform plan compares code, the state file and the real cloud to preview what will be created (+), changed (~) or destroyed (-). The plan is reviewed in a pull request, and terraform apply executes the approved plan, creating real resources and recording the result in the state file. State is the ledger linking code to real resources, so it lives in a remote backend such as S3, GCS or Terraform Cloud with locking to stop two people applying at once. State may hold values such as database passwords in plain text, so access control and encryption matter too. When someone changes settings by hand in the console, code and reality drift apart and the next plan tries to revert the change, causing confusion. Change things only through code and run scheduled plans to detect drift. OpenTofu is an open-source fork of Terraform, and Pulumi and CDK do the same job in general-purpose programming languages.', sTerraform()),
    item('op-tf-modules', '모듈과 환경 분리', 'Modules and environments', '자주 쓰는 리소스 묶음을 모듈로 재사용하고, 환경마다 변수와 상태를 따로 두며, 모듈 버전을 고정하고 상태를 작게 나눠요.', '모듈은 VPC, 서브넷, 라우팅, NAT처럼 함께 쓰는 리소스를 묶은 재사용 단위예요. 입력 변수와 출력 값이 있어 함수처럼 불러 쓰고, 같은 모듈로 여러 환경과 팀의 인프라를 일관되게 만들어요. 흔한 구성은 envs/dev, envs/prod처럼 환경마다 폴더를 두고, 같은 모듈을 다른 변수(CIDR, 인스턴스 크기)로 부르는 방식이에요. 환경마다 상태 파일이 따로라 dev에서 한 실수가 prod 상태에 닿지 않아요. 모듈은 Git 태그나 레지스트리 버전으로 고정하고, 새 버전은 dev에 먼저 적용해 확인한 뒤 prod로 올려요. 모든 것을 상태 하나에 넣으면 plan이 느려지고 실수 하나가 전체로 번지므로, 네트워크, 데이터, 앱처럼 계층별로 상태를 나눠 폭발 반경을 줄여요. 계층 사이에 필요한 값은 출력과 원격 상태·데이터 소스로 전달해요. 반복되는 백엔드 설정이나 변수는 Terragrunt 같은 도구로 줄이기도 해요.', 'Reuse bundles of resources as modules, give each environment its own variables and state, pin module versions and split state to keep failures small.', 'Modules bundle resources used together, such as a VPC with subnets, routes and NAT, into reusable units with input variables and outputs, called like functions to build consistent infrastructure across environments and teams. A common layout gives each environment a folder, such as envs/dev and envs/prod, calling the same modules with different variables such as CIDRs and instance sizes. Separate state files per environment keep a mistake in dev away from production state. Modules are pinned to Git tags or registry versions, and new versions go to dev first before production. Putting everything into one state makes plans slow and lets one mistake spread, so split state by layer, such as network, data and apps, to shrink the blast radius, passing values between layers through outputs and remote state or data sources. Tools such as Terragrunt can reduce repeated backend and variable configuration.', sTfModules()),
    item('op-ansible', '구성 관리와 불변 인프라', 'Configuration management and immutable infrastructure', 'Ansible은 원하는 서버 상태를 멱등하게 적용해요. 서버를 계속 고치는 대신 이미지를 굽고 통째로 교체하는 불변 인프라도 널리 써요.', 'Ansible, Chef, Puppet 같은 구성 관리 도구는 서버에 설치할 패키지, 설정 파일, 서비스 상태를 코드로 적어 여러 서버에 똑같이 적용해요. Ansible은 에이전트 없이 SSH로 접속해 YAML 플레이북을 실행하는 방식이라 시작이 쉬워요. 핵심은 멱등성이에요. 처음 실행하면 설치와 설정이 바뀌었다고(changed) 보고하고, 다시 실행하면 이미 원하는 상태라 아무것도 바꾸지 않아요(ok). 그래서 apt install 같은 명령 대신 “nginx가 설치된 상태(present)”처럼 결과를 적고, 셸 명령을 써야 할 때는 이미 됐는지 확인하는 조건을 붙여요. 하지만 오래 운영한 서버를 계속 고치다 보면 손으로 바꾼 설정과 순서 차이로 서버마다 미묘하게 달라지는 문제(구성 드리프트)가 생겨요. 불변 인프라는 Packer 같은 도구로 완성된 이미지를 굽고, 변경이 필요하면 서버를 고치지 않고 새 이미지로 통째로 교체해 이 문제를 피해요. 컨테이너 시대에는 이미지 빌드가 그 역할을 하고, 구성 관리는 VM 기반 시스템이나 네트워크 장비에서 여전히 쓰여요.', 'Ansible applies a desired server state idempotently, while immutable infrastructure bakes images and replaces servers wholesale instead of patching them.', 'Configuration management tools such as Ansible, Chef and Puppet describe the packages, config files and service states a server should have and apply them identically across many servers. Ansible connects over SSH without agents and runs YAML playbooks, making it easy to start. The key property is idempotence: the first run reports installs and config as changed, and a second run changes nothing because the state already matches (ok). So tasks state results such as “nginx is present” rather than commands like apt install, and shell steps get conditions that check whether the work is already done. Servers patched over a long time still drift apart through manual edits and ordering differences (configuration drift). Immutable infrastructure avoids this by baking complete images with tools such as Packer and replacing servers wholesale rather than modifying them. With containers, image builds take this role, while configuration management remains common for VM-based systems and network devices.', sAnsible()),
    item('op-policy', '정책 코드', 'Policy as code', '“모든 컨테이너는 메모리 limit 필수” 같은 규칙을 Rego 등으로 코드화해 CI와 클러스터 입장 통제에서 자동으로 강제해요.', '조직에는 “모든 컨테이너는 메모리 limit을 가져야 한다”, “공개 S3 버킷 금지”, “이미지는 사내 레지스트리에서만” 같은 규칙이 많아요. 문서로만 두면 바쁠 때 잊히고 리뷰어마다 다르게 판단해요. 정책 코드(policy as code)는 이런 규칙을 OPA의 Rego, Kyverno 정책, Sentinel 같은 언어로 적어 코드처럼 버전 관리하고 테스트해요. 쿠버네티스 매니페스트나 Terraform 계획을 입력으로 넣으면 규칙을 어기는 항목을 이유와 함께 거부해요. 보통 두 겹으로 적용해요. conftest로 PR의 CI 단계에서 먼저 막아 개발자가 빨리 알게 하고, OPA Gatekeeper나 Kyverno로 쿠버네티스 입장 통제(admission)에서 한 번 더 막아 우회를 방지해요. 처음부터 강하게 막으면 기존 시스템이 줄줄이 깨지니, 경고 모드로 시작해 영향을 보고 점차 강제로 바꿔요. 예외가 필요하면 이유와 만료일을 붙여 관리해요. 이렇게 하면 보안, 비용, 운영 규칙을 사람의 기억 대신 기계가 일관되게 지켜요.', 'Rules such as “every container needs a memory limit” are written as code, for example in Rego, and enforced automatically in CI and at cluster admission.', 'Organizations accumulate rules such as “every container must have a memory limit,” “no public S3 buckets” and “images only from the internal registry.” Rules kept only in documents get forgotten under pressure and judged differently by each reviewer. Policy as code writes them in languages such as OPA’s Rego, Kyverno policies or Sentinel, versioned and tested like code. Kubernetes manifests or Terraform plans are fed in as input, and violations are rejected with a reason. Enforcement usually happens twice: conftest blocks violations in the PR’s CI stage so developers learn early, and OPA Gatekeeper or Kyverno blocks them again at Kubernetes admission to prevent bypasses. Enforcing hard from day one breaks existing systems one after another, so start in warn mode, gauge the impact and tighten gradually. Exceptions carry a reason and an expiry date. Security, cost and operational rules are then enforced consistently by machines rather than memory.', sPolicy())
  ]),
  sec('op-devsecops', 'DevSecOps', 'DevSecOps', '파이프라인 안의 보안', 'Security inside the pipeline', '코드·의존성·이미지·실행 중인 앱을 검사하는 보안 스캔, SBOM과 서명·출처 증명으로 지키는 소프트웨어 공급망, 의존성 업데이트 자동화, 그리고 커밋 전에 문제를 잡는 시프트 레프트까지 보안을 흐름 안에 넣는 방법이에요.', 'Security scans for code, dependencies, images and running apps, protecting the software supply chain with SBOMs, signatures and provenance, automated dependency updates, and shifting left to catch problems before commit: building security into the flow.', [
    item('op-scan', '파이프라인 보안 스캔', 'Security scanning in pipelines', 'SAST(코드), SCA(의존성), 이미지 스캔, DAST(실행 중인 앱)를 파이프라인에 넣고, 심각도 기준으로 차단해요.', '보안 검사는 출시 직전에 한 번 하는 것이 아니라 파이프라인 안에서 매번 자동으로 돌아야 해요. SAST(정적 분석)는 코드를 실행하지 않고 SQL 인젝션, 경로 조작, 하드코딩된 비밀 같은 위험한 패턴을 찾아요. Semgrep, CodeQL 같은 도구가 있어요. 요즘 앱 코드의 대부분은 오픈소스 의존성이라, SCA(소프트웨어 구성 분석)로 의존성의 알려진 취약점(CVE)을 확인하는 것이 중요해요. Trivy나 Grype 같은 이미지 스캐너는 컨테이너 안의 OS 패키지 취약점까지 찾아요. DAST(동적 분석)는 스테이징에 떠 있는 앱에 실제 요청을 보내 인증 우회나 인젝션 같은 취약점을 밖에서 찾아요. 모든 경고로 빌드를 실패시키면 사람들이 결과를 무시하게 되므로, critical과 high만 막고 나머지는 티켓으로 관리하며, 거짓 양성은 이유와 함께 예외 처리해요. 심각도별로 수정 기한(SLA)을 정하고, 같은 규칙을 개발자 IDE에서도 보여주면 더 일찍 고칠 수 있어요.', 'Put SAST for code, SCA for dependencies, image scans and DAST for running apps into the pipeline, and block by severity.', 'Security checks should not be a one-off before release but run automatically in the pipeline on every change. SAST (static analysis) finds risky patterns such as SQL injection, path manipulation and hardcoded secrets without running the code, using tools such as Semgrep and CodeQL. Most application code today is open-source dependencies, so SCA (software composition analysis), which checks dependencies for known vulnerabilities (CVEs), matters greatly. Image scanners such as Trivy or Grype also find OS package vulnerabilities inside containers. DAST (dynamic analysis) sends real requests to the app running in staging to find flaws such as authentication bypass or injection from outside. Failing builds on every warning trains people to ignore results, so block only critical and high findings, track the rest as tickets and document false positives as exceptions. Set remediation deadlines (SLAs) by severity, and surfacing the same rules in developers’ IDEs gets things fixed even earlier.', sScan()),
    item('op-supply-chain', '소프트웨어 공급망 보안', 'Software supply chain security', 'SBOM으로 이미지에 무엇이 들었는지 알고, 서명으로 위변조를 막고, 출처 증명(SLSA)으로 누가 어떻게 빌드했는지 확인해요.', '소프트웨어 공급망 공격은 내 코드가 아니라 의존성, 빌드 시스템, 레지스트리처럼 그 사이의 경로를 노려요. 오염된 패키지나 빌드 서버 침해로 정상 서명된 업데이트에 악성 코드가 섞인 사례들이 있었어요. 첫 번째 방어는 SBOM(소프트웨어 자재 명세서)이에요. 이미지에 들어 있는 모든 구성 요소와 버전의 목록으로, syft 같은 도구가 SPDX나 CycloneDX 형식으로 만들어요. Log4Shell 같은 새 취약점이 나왔을 때 SBOM이 있으면 어떤 앱이 영향을 받는지 몇 분 만에 찾아요. 두 번째는 서명이에요. Sigstore의 cosign으로 빌드 파이프라인이 이미지 다이제스트에 서명하고, 클러스터 입장 통제에서 서명을 검증해 서명된 이미지만 배포되게 해요. 세 번째는 출처 증명(provenance)으로, 어떤 소스 커밋을 어떤 빌더가 어떤 절차로 빌드했는지 기록해요. SLSA는 이런 빌드 무결성을 단계별 수준으로 정의한 프레임워크예요. 빌드 러너는 격리하고 짧게 살리며, 의존성을 받는 레지스트리도 고정해요.', 'Know what is in an image with SBOMs, stop tampering with signatures, and verify who built it and how with provenance (SLSA).', 'Software supply chain attacks target not your code but the path around it: dependencies, build systems and registries. There have been cases of poisoned packages and compromised build servers slipping malicious code into properly signed updates. The first defense is an SBOM (software bill of materials), a list of every component and version in an image, produced in SPDX or CycloneDX format by tools such as syft. When a new vulnerability such as Log4Shell appears, SBOMs reveal affected apps within minutes. The second is signing: with Sigstore’s cosign the pipeline signs image digests, and admission control verifies signatures so only signed images deploy. The third is provenance, recording which source commit was built by which builder through which steps, and SLSA defines levels of this build integrity. Build runners should be isolated and short-lived, and the registries dependencies come from should be pinned.', sSupplyChain()),
    item('op-deps', '의존성 업데이트 자동화', 'Automated dependency updates', 'Dependabot·Renovate가 새 버전마다 PR을 열고 CI가 검증해요. 작은 업데이트는 묶어 자동 병합하고, 락파일로 설치 버전을 고정해요.', '의존성은 가만히 두면 시간이 지날수록 오래된 버전과 알려진 취약점이 쌓여요. Dependabot이나 Renovate 같은 봇은 새 버전이 나오면 업데이트 PR을 자동으로 열고, CI가 테스트를 돌려 깨지는지 검증해요. 하지만 PR이 하루에 수십 개씩 쌓이면 아무도 보지 않게 되므로, minor와 patch 업데이트는 주 단위로 묶고 테스트가 통과하면 자동 병합하도록 설정해요. 메이저 업데이트는 호환성이 깨질 수 있으니 사람이 변경 기록을 읽고 올려요. package-lock.json 같은 락파일은 직접 의존성뿐 아니라 하위 의존성 버전까지 고정해서 개발, CI, 운영이 정확히 같은 버전을 설치하게 해요. CI에서는 npm ci처럼 락파일 그대로 설치하는 명령을 써요. 업데이트를 미루면 나중에 메이저 버전 여러 개를 한꺼번에 올려야 하고, 급한 보안 패치도 바로 적용하기 어려워져요. 자주 조금씩 올리는 것이 가장 싸고, 쓰지 않는 의존성은 지워 공격 표면을 줄여요.', 'Bots such as Dependabot and Renovate open a PR per update and CI tests it; small updates are grouped and auto-merged, and lockfiles pin installed versions.', 'Left alone, dependencies accumulate outdated versions and known vulnerabilities over time. Bots such as Dependabot and Renovate open update pull requests automatically when new versions appear, and CI runs the tests to see whether anything breaks. Dozens of PRs a day get ignored, though, so group minor and patch updates weekly and auto-merge them when tests pass, while major updates, which may break compatibility, get human review of their changelogs. Lockfiles such as package-lock.json pin transitive as well as direct dependency versions, so dev, CI and production install exactly the same set, and CI uses commands such as npm ci that install straight from the lockfile. Deferring updates leaves several major versions to jump at once and makes urgent security patches hard to apply. Small, frequent updates are the cheapest, and removing unused dependencies shrinks the attack surface.', sDeps()),
    item('op-precommit', '시프트 레프트와 pre-commit', 'Shifting left with pre-commit', '검사를 개발 흐름 앞쪽으로 당겨요. pre-commit 훅이 커밋 순간 포맷·린트·비밀 탐지를 돌리고, CI가 같은 규칙으로 최종 관문을 맡아요.', '시프트 레프트는 테스트와 보안 검사를 개발 흐름의 앞쪽(왼쪽)으로 당기는 생각이에요. 같은 문제도 IDE에서 찾으면 몇 초 만에 고치지만, 리뷰나 CI에서 찾으면 맥락을 다시 떠올려야 하고, 운영에서 찾으면 장애와 사고 비용까지 더해져요. pre-commit 같은 도구는 커밋하는 순간 로컬에서 Prettier, ESLint 같은 포맷과 린트를 돌려 자동으로 고쳐 주므로 코드 리뷰에서 스타일 논쟁이 사라져요. gitleaks 같은 비밀 탐지 훅은 API 키나 비밀번호가 커밋되기 전에 막아요. 한 번 원격에 푸시된 키는 기록에 남아 이미 유출된 것으로 봐야 하므로, 파일에서 지우는 것이 아니라 키를 교체해야 해요. 다만 훅은 --no-verify로 건너뛸 수 있고 설치하지 않은 사람도 있으니, CI에서 같은 검사를 다시 돌려 최종 관문으로 써요. 훅은 몇 초 안에 끝나야 해서 느린 검사는 CI로 보내요. GitHub의 푸시 보호 기능도 알려진 형식의 비밀이 푸시되는 것을 막아줘요.', 'Move checks earlier in the workflow: pre-commit hooks run formatting, linting and secret detection at commit time, and CI enforces the same rules as the final gate.', 'Shifting left pulls testing and security checks toward the start (the left) of the workflow. A problem found in the IDE is fixed in seconds, one found in review or CI requires recalling context, and one found in production adds incident costs. Tools such as pre-commit run formatters and linters such as Prettier and ESLint locally at commit time and fix issues automatically, ending style debates in code review. Secret detection hooks such as gitleaks stop API keys and passwords before they are committed. A key pushed to a remote stays in history and must be treated as leaked, so it has to be rotated rather than just deleted from the file. Hooks can be skipped with --no-verify and some people never install them, so CI reruns the same checks as the final gate. Hooks must finish within seconds, so slow checks belong in CI. GitHub push protection also blocks pushes containing secrets in known formats.', sPrecommit())
  ])
], add: {
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
},
after: {
  'op-svc': [item('op-ingress', '인그레스', 'Ingress', '클러스터 밖의 HTTP(S) 요청을 입구 하나로 받아 호스트·경로 규칙에 따라 안쪽 서비스로 나눠 주는 쿠버네티스 리소스예요.', '서비스마다 type: LoadBalancer로 외부 로드 밸런서를 붙이면 IP, 인증서, 클라우드 비용이 서비스 수만큼 늘어나요. 인그레스는 외부 LB 하나 뒤에 인그레스 컨트롤러(nginx, Envoy, Traefik 등)를 두고, Ingress 리소스에 적은 규칙대로 요청을 나눠요. shop.example.com/api는 api-svc, shop.example.com/은 web-svc, admin.example.com은 admin-svc로 보내는 식이에요. 규칙(Ingress 리소스)과 실제로 트래픽을 처리하는 컨트롤러는 별개라서, 컨트롤러를 설치하지 않으면 규칙만 있고 아무 일도 일어나지 않아요. HTTPS는 보통 인그레스에서 종료하고 cert-manager가 Let’s Encrypt 인증서를 자동으로 받아 갱신해요. 경로 재작성, 레이트 리밋, 외부 인증 같은 기능도 컨트롤러의 어노테이션으로 걸어요. 다만 어노테이션은 컨트롤러마다 달라 이식성이 떨어져서, 후속 표준인 Gateway API가 나왔어요. GatewayClass(어떤 구현), Gateway(인프라팀이 관리하는 입구와 인증서), HTTPRoute(앱팀이 관리하는 경로 규칙)로 역할을 나누고, 헤더 매칭이나 가중치 분할(카나리 90/10) 같은 기능을 표준으로 담아요. HTTP가 아닌 TCP·UDP는 LoadBalancer 서비스나 Gateway API의 TCPRoute로 열어요.', 'A Kubernetes resource that receives outside HTTP(S) traffic at one entrance and routes it to services by host and path rules.', 'Giving every service type: LoadBalancer multiplies external load balancers, IPs, certificates and cloud cost. An ingress puts an ingress controller (nginx, Envoy, Traefik and others) behind a single external LB and routes requests according to the rules in Ingress resources: shop.example.com/api to api-svc, shop.example.com/ to web-svc, admin.example.com to admin-svc. The rules and the controller that actually handles traffic are separate, so without an installed controller the rules do nothing. HTTPS usually terminates at the ingress, with cert-manager obtaining and renewing Let’s Encrypt certificates automatically, and features such as path rewrites, rate limiting and external auth attach through controller annotations. Because annotations differ between controllers and hurt portability, the Gateway API emerged as the successor: GatewayClass (which implementation), Gateway (listeners and certificates owned by the infrastructure team) and HTTPRoute (route rules owned by application teams) separate the roles and standardize features such as header matching and weighted splits (a 90/10 canary). Non-HTTP TCP and UDP traffic uses LoadBalancer services or Gateway API TCPRoutes.', sIngress())],
  'op-pillars': [item('op-metrics', '메트릭', 'Metrics', '이름과 라벨이 붙은 숫자를 시간에 따라 모은 시계열이에요. 싸게 모아 추세를 보고 알림을 거는 데 써요.', '메트릭은 http_requests_total{method="GET", status="200"}처럼 이름과 라벨이 붙은 숫자를 시간에 따라 기록한 시계열이에요. 종류는 크게 셋이에요. 카운터는 요청 수처럼 늘기만 하는 누적값이라 그대로 보면 의미가 없고 rate(http_requests_total[1m])처럼 초당 증가량으로 봐요. 게이지는 메모리 사용량이나 큐 길이처럼 오르내리는 현재 값이에요. 히스토그램은 지연 시간을 구간(버킷)별 개수로 세어 p50, p99 같은 백분위수를 계산하게 해 줘요. 라벨 값의 조합 하나하나가 별도의 시계열이라, method 4 × status 5 × route 30이면 600개지만 user_id 같은 라벨을 붙이면 사용자 수만큼 곱해져 저장소가 폭발해요(카디널리티 문제). 그래서 라벨에는 상태 코드, 메서드, /users/:id 같은 경로 템플릿처럼 개수가 정해진 값만 써요. 무엇을 잴지는 서비스에는 RED(요청 수 Rate, 오류 Errors, 지연 Duration), CPU·디스크 같은 자원에는 USE(사용률 Utilization, 포화도 Saturation, 오류 Errors)가 출발점이에요. Prometheus는 15초마다 각 서비스의 /metrics를 긁어 가는(pull) 방식이고, OpenTelemetry로 밀어 보내는(push) 방식도 있어요. 메트릭은 “얼마나, 언제부터”에 답하고, 개별 요청의 사연은 로그와 트레이스에서 봐요.', 'Time series of named, labelled numbers, cheap to collect and used to watch trends and fire alerts.', 'A metric is a time series of numbers with a name and labels, such as http_requests_total{method="GET", status="200"}. There are three main kinds. Counters, such as request counts, only ever go up, so they are read through rates like rate(http_requests_total[1m]). Gauges, such as memory use or queue length, are current values that rise and fall. Histograms count latencies into buckets so percentiles like p50 and p99 can be computed. Every distinct combination of label values is its own series: method 4 × status 5 × route 30 gives 600, but adding a user_id label multiplies by the number of users and explodes storage (the cardinality problem), so labels should hold only bounded values such as status codes, methods and route templates like /users/:id. For what to measure, RED (Rate, Errors, Duration) suits services and USE (Utilization, Saturation, Errors) suits resources such as CPUs and disks. Prometheus scrapes each service’s /metrics every 15 seconds (pull), while OpenTelemetry can also push. Metrics answer “how much, since when”; individual requests’ stories live in logs and traces.', sMetrics()), item('op-logs', '구조화된 로그', 'Structured logging', '로그를 문장 대신 키-값 필드(JSON)로 남겨, 기계가 필드로 검색하고 집계할 수 있게 하는 방식이에요.', '“payment failed for user 42 order 991 after 3 retries” 같은 문장 로그는 사람은 읽기 쉽지만, 주문 991의 오류만 찾으려면 정규식을 써야 하고 문구가 조금만 바뀌어도 깨져요. 구조화된 로그는 같은 사건을 {"level": "error", "msg": "payment failed", "user_id": 42, "order_id": 991, "retries": 3, "trace_id": "4bf92f35…"}처럼 필드로 남겨요. 그러면 level = "error" AND order_id = 991로 바로 거르고, msg별로 개수를 세는 집계도 쉬워요. msg는 고정된 문구로 두고 변하는 값은 필드로 빼는 게 요령이에요. 모든 서비스가 같은 trace_id(요청 ID)를 남기면 게이트웨이 → 주문 → 결제로 이어지는 한 요청의 로그를 서비스를 가로질러 모아 볼 수 있고, 트레이스와 로그 사이를 오갈 수 있어요. 레벨은 DEBUG < INFO < WARN < ERROR로 나누고, 운영에선 DEBUG를 끄거나 샘플링해요. 메트릭과 달리 user_id 같은 고유한 값도 필드로 넣어도 괜찮은 게 로그의 강점이에요. 반대로 비밀번호, 카드 번호, 토큰 같은 비밀과 개인정보는 절대 남기지 말고 수집 단계에서 자동으로 가려요. 로그의 양은 곧 저장 비용이라 보관 기간을 등급별로 나눠요. OpenTelemetry 로그 모델과 Loki, Elasticsearch, CloudWatch Logs 같은 저장소를 함께 써요.', 'Logging events as key-value fields (JSON) instead of sentences, so machines can filter and aggregate by field.', 'A sentence such as “payment failed for user 42 order 991 after 3 retries” is easy for people to read, but finding only order 991’s errors needs a regex that breaks whenever the wording changes. Structured logging records the same event as fields, for example {"level": "error", "msg": "payment failed", "user_id": 42, "order_id": 991, "retries": 3, "trace_id": "4bf92f35…"}, so level = "error" AND order_id = 991 filters directly and counting by msg is trivial; the trick is to keep msg a fixed phrase and move changing values into fields. When every service logs the same trace_id (request ID), one request’s logs from gateway to orders to payment can be gathered across services, and you can jump between traces and logs. Levels run DEBUG < INFO < WARN < ERROR, with DEBUG off or sampled in production. Unlike metrics, logs can carry unique values such as user_id, which is their strength. Secrets and personal data such as passwords, card numbers and tokens must never be logged and should be redacted automatically at collection. Volume is storage cost, so retention is tiered. Structured logs pair with the OpenTelemetry log model and stores such as Loki, Elasticsearch and CloudWatch Logs.', sLogs())],
  'op-slo': [item('op-errbudget', '에러 예산', 'Error budgets', '100% − SLO만큼 허용된 실패량이에요. 예산이 남으면 빠르게 출시하고, 바닥나면 안정화에 집중하도록 숫자로 조율해요.', 'SLO가 “30일 동안 요청의 99.9% 성공”이면 0.1%는 실패해도 된다는 뜻이고, 이 허용량이 에러 예산이에요. 전면 장애로 치면 한 달에 43.2분, 월 1,000만 요청이면 10,000건의 실패예요. 장애와 버그가 날 때마다 예산이 깎이는데, 한 번의 나쁜 배포로 40%가 사라지기도 해요. 소진 속도(burn rate)는 예산을 쓰는 속도가 한 달에 고르게 쓰는 속도의 몇 배인지예요. 1이면 정확히 월말에 다 쓰고, 14.4면 1시간 만에 예산의 2%를 써요. 그래서 “1시간 창과 5분 창의 소진 속도가 모두 14.4를 넘으면 호출” 같은 다중 창 알림을 걸어, 짧은 잡음에는 울리지 않으면서 심각한 장애는 빨리 잡아요. 예산은 제품팀과 SRE가 미리 합의한 정책과 함께 써요. 예산이 넉넉하면 과감하게 출시하고 실험하며, 바닥나면 위험한 배포를 멈추고 신뢰성 작업을 우선해요. 100%를 목표로 하지 않는 이유는, 사용자는 99.9%와 100%를 구분하지 못하는데 비용과 출시 속도의 손해는 급격히 커지기 때문이에요. 에러 예산은 “얼마나 안정적이어야 하나”를 감정이 아닌 숫자로 결정하게 해 줘요.', 'The failure allowed by 100% − SLO. It turns the trade-off between shipping fast and staying stable into a number.', 'If the SLO is “99.9% of requests succeed over 30 days”, then 0.1% may fail, and that allowance is the error budget: 43.2 minutes of full downtime a month, or 10,000 failures out of 10 million requests. Every outage and bug spends some of it, and one bad deploy can take 40%. The burn rate is how many times faster than an even monthly pace the budget is being spent: 1 uses it up exactly at month end, while 14.4 burns 2% of the budget in an hour. Multi-window alerts such as “page when both the 1-hour and 5-minute burn rates exceed 14.4” ignore brief noise but catch serious incidents quickly. The budget comes with a policy agreed in advance between product and SRE: with plenty left, ship boldly and experiment; when it is gone, freeze risky launches and prioritize reliability work. The target is never 100%, because users cannot tell 99.9% from 100% while the cost in money and release speed rises steeply. Error budgets let “how reliable must we be” be decided by numbers rather than feelings.', sErrBudget())],
  'op-incident': [item('op-postmortem', '포스트모템', 'Postmortems', '장애가 끝난 뒤 타임라인, 영향, 원인, 조치 항목을 비난 없이 기록해 같은 장애가 반복되지 않게 하는 문서예요.', '포스트모템은 분 단위 타임라인으로 시작해요. 14:02 v2.3 배포, 14:05 오류 급증 알림, 14:09 장애 선언, 14:15 롤백, 14:21 복구처럼 적으면 감지까지 3분(TTD), 완화까지 16분(TTM)이 드러나요. 다음은 영향이에요. 얼마나 오래, 어떤 사용자가, 몇 %가 영향을 받았는지(예: 19분간 결제 12% 실패)를 숫자로 적어요. 원인은 “왜?”를 거듭하며 찾아요. 왜 결제가 실패했나 → 설정값 timeout=0이 배포됐다, 왜 배포됐나 → 설정 검증이 없었다, 왜 늦게 막았나 → 이번엔 카나리를 건너뛰었다. 원인은 대개 하나가 아니라 여러 기여 요인이 겹친 결과예요. 핵심은 비난 없는(blameless) 문화예요. “배포한 사람이 설정을 잘못 넣었다”가 아니라 “검증 없이 배포될 수 있었다”라고 써야, 사람들이 다음에도 숨기지 않고 사실을 말하고 시스템이 같은 실수를 막도록 고칠 수 있어요. 끝은 조치 항목이에요. 설정 스키마 검증 추가(P1), 카나리 단계 필수화(P1), 결제 오류율 알림 조정(P2)처럼 담당 팀과 기한, 우선순위를 붙이고 완료될 때까지 추적해요. 포스트모템은 널리 공유할수록 가치가 커서 다른 팀도 같은 함정을 피할 수 있어요.', 'A blameless write-up of an incident’s timeline, impact, causes and action items, so the same failure does not happen again.', 'A postmortem starts with a minute-by-minute timeline, such as 14:02 deploy v2.3, 14:05 error alert, 14:09 incident declared, 14:15 rollback, 14:21 recovered, which exposes three minutes to detect (TTD) and sixteen to mitigate (TTM). Next comes impact in numbers: how long, which users and what share were affected (say 12% of checkouts failed for 19 minutes). Causes are found by asking “why?” repeatedly: why did checkout fail? A config with timeout=0 shipped. Why did it ship? There was no config validation. Why so slow to stop? The canary was skipped this time. There is rarely a single cause, only contributing factors that lined up. The heart of it is blamelessness: writing “a config could ship unvalidated” rather than “the deployer pushed a bad config” keeps people candid next time and points the fix at the system. It ends with action items such as adding config schema validation (P1), making the canary mandatory (P1) and tuning the checkout error alert (P2), each with an owning team, due date and priority, tracked to completion. Postmortems gain value the more widely they are shared, because other teams avoid the same traps.', sPostmortem())],
  'op-image': [
    item('op-dockerfile', '좋은 Dockerfile', 'Writing a good Dockerfile', '멀티 스테이지로 빌드 도구를 떼어내고, 작은 베이스·캐시 친화적 순서·non-root 실행으로 작고 안전한 이미지를 만들어요.', '하나의 이미지에 컴파일러와 개발 의존성까지 담으면 1GB가 넘기 쉽고, 쓰지 않는 도구가 공격 표면이 돼요. 멀티 스테이지 빌드는 첫 단계(build)에서 전체 도구로 코드를 빌드하고, 두 번째 단계에서 distroless나 alpine 같은 작은 베이스에 빌드 결과만 COPY --from=build로 가져와요. 결과 이미지가 1GB 남짓에서 150MB 안팎으로 크게 줄어 배포가 빠르고, 셸이나 패키지 매니저가 없어 공격도 어려워져요. 레이어 순서도 중요해요. package.json을 먼저 복사해 의존성을 설치하고, 자주 바뀌는 소스 코드는 그 뒤에 복사해야 코드만 바뀌었을 때 설치 레이어를 캐시에서 재사용해요. .dockerignore로 node_modules, .git, .env 같은 파일을 빌드 문맥에서 빼면 빌드가 빨라지고 비밀 유출도 막아요. USER로 root가 아닌 사용자로 실행하면 컨테이너 탈출 시 피해가 줄어요. 베이스 이미지 태그나 다이제스트를 고정하고, 빌드 때 취약점 스캔을 돌려요. CMD와 ENTRYPOINT는 exec 형식으로 써야 앱이 종료 신호를 직접 받아요.', 'Multi-stage builds drop build tools, and a small base, cache-friendly order and non-root execution produce small, safe images.', 'Putting compilers and development dependencies into one image easily exceeds a gigabyte, and unused tools widen the attack surface. A multi-stage build compiles the code with the full toolchain in a first (build) stage, and a second stage copies only the output onto a small base such as distroless or alpine with COPY --from=build. Images shrink dramatically, say from over a gigabyte to about 150 MB, deploy faster and are harder to attack without a shell or package manager. Layer order matters too: copying package.json and installing dependencies before copying frequently changing source code reuses the install layer from cache when only code changes. A .dockerignore keeping node_modules, .git and .env out of the build context speeds builds and prevents secret leaks. Running as a non-root user with USER limits the damage of a container breakout. Pin base image tags or digests and scan for vulnerabilities at build time. Writing CMD and ENTRYPOINT in exec form lets the app receive shutdown signals directly.', sDockerfile()),
    item('op-compose', 'Docker Compose', 'Docker Compose', '여러 컨테이너로 된 앱을 YAML 하나로 정의하고 명령 하나로 띄워요. 로컬 개발과 CI 통합 테스트 환경을 재현하는 데 써요.', '앱 하나를 로컬에서 띄우려 해도 API 서버, PostgreSQL, Redis처럼 여러 컨테이너가 필요해요. Docker Compose는 이것들을 compose.yaml 하나에 서비스로 정의하고 docker compose up 한 번에 함께 실행해요. 서비스들은 자동으로 만들어진 기본 네트워크에 연결되고, 서비스 이름이 곧 호스트 이름이라 API는 db:5432로 DB에 접속해요. depends_on에 condition: service_healthy를 걸면 DB의 healthcheck가 통과한 뒤에 API가 시작돼 연결 실패를 줄여요. pgdata 같은 이름 붙은 볼륨에 데이터를 두면 컨테이너를 지우고 다시 만들어도 데이터가 남아요. env_file로 로컬 설정을 넣고, compose.override.yaml로 개인별·환경별 차이를 겹쳐요. 새 팀원도 저장소를 받고 명령 하나로 같은 개발 환경을 얻으며, CI에서도 같은 파일로 통합 테스트 환경을 띄울 수 있어요. 다만 여러 서버에 걸친 운영 배포, 자동 복구, 확장에는 쿠버네티스나 관리형 컨테이너 서비스를 써요.', 'Define a multi-container app in one YAML file and start it with one command, reproducing local development and CI integration test environments.', 'Even running one app locally needs several containers, such as an API server, PostgreSQL and Redis. Docker Compose defines them as services in a single compose.yaml and starts them together with docker compose up. Services join an automatically created default network where service names act as hostnames, so the API reaches the database at db:5432. depends_on with condition: service_healthy starts the API only after the database healthcheck passes, avoiding connection failures. Named volumes such as pgdata keep data when containers are removed and recreated. env_file injects local settings, and compose.override.yaml layers per-person or per-environment differences. New teammates clone the repository and get the same development environment with one command, and CI can use the same file to start integration test environments. Production deployment across many servers, self-healing and scaling, however, call for Kubernetes or managed container services.', sCompose())
  ],
  'op-k8s': [
    item('op-k8s-objects', 'Deployment·ReplicaSet·Pod', 'Deployments, ReplicaSets and pods', 'Deployment가 ReplicaSet을, ReplicaSet이 파드 개수를 관리해요. 객체끼리는 라벨과 셀렉터로 연결되고, 파드는 언제든 사라질 수 있는 소모품이에요.', '쿠버네티스에서 앱을 배포할 때 보통 파드를 직접 만들지 않고 Deployment를 만들어요. Deployment는 “api 이미지로 파드 3개”라는 원하는 상태를 적은 객체이고, 실제로는 ReplicaSet을 만들어 파드 개수를 유지하게 해요. 파드가 죽으면 ReplicaSet이 개수를 맞추려고 새 파드를 만들어요. 객체끼리는 이름이 아니라 app=api 같은 라벨과 셀렉터로 연결돼요. ReplicaSet은 셀렉터에 맞는 파드를 “내 것”으로 세고, 서비스도 같은 셀렉터로 트래픽을 보낼 파드를 찾아요. 이미지를 바꾸면 Deployment가 새 ReplicaSet을 만들어 새 파드를 하나씩 늘리고 옛 파드를 줄이는 롤링 업데이트를 하며, 옛 ReplicaSet은 롤백을 위해 남겨둬요(kubectl rollout undo). 파드는 노드 장애, 재배치, 축소로 언제든 사라지고 새 IP로 다시 생기므로 상태나 고정 주소에 기대면 안 돼요. 이 밖에 한 번 실행하고 끝나는 일은 Job과 CronJob, 노드마다 하나씩 필요한 에이전트는 DaemonSet을 써요.', 'Deployments manage ReplicaSets and ReplicaSets keep the pod count, all linked by labels and selectors, with pods as disposable units that may vanish at any time.', 'Apps on Kubernetes are usually deployed through Deployments rather than bare pods. A Deployment declares a desired state such as three pods of the api image and creates a ReplicaSet that maintains the count, so when a pod dies the ReplicaSet creates a replacement. Objects link through labels and selectors such as app=api rather than names: the ReplicaSet counts pods matching its selector as its own, and Services use the same selector to find pods for traffic. Changing the image makes the Deployment create a new ReplicaSet and perform a rolling update, adding new pods and removing old ones step by step, while keeping the old ReplicaSet for rollback (kubectl rollout undo). Pods vanish with node failures, rescheduling or scale-down and return with new IPs, so nothing should rely on their state or address. One-off work uses Jobs and CronJobs, and per-node agents use DaemonSets.', sK8sObjects()),
    item('op-k8s-config', 'ConfigMap과 Secret', 'ConfigMaps and Secrets', '설정은 ConfigMap, 민감한 값은 Secret으로 이미지 밖에 둬요. Secret은 base64일 뿐이라 저장 암호화·RBAC·외부 비밀 저장소로 보호해요.', '같은 이미지를 개발과 운영에서 쓰려면 설정을 이미지 밖에 둬야 해요. ConfigMap은 로그 수준, 기능 옵션, 외부 API 주소 같은 일반 설정을 담는 객체예요. Secret은 DB 비밀번호나 API 키 같은 민감한 값을 담지만, 기본으로는 base64로 인코딩만 될 뿐 암호화가 아니에요. 그래서 etcd 저장 시 암호화를 켜고, RBAC로 Secret을 읽을 수 있는 사람과 서비스 계정을 제한하고, External Secrets Operator로 AWS Secrets Manager 같은 외부 저장소와 연동해요. Git에 넣어야 한다면 Sealed Secrets나 SOPS로 암호화해요. 앱에 넣는 방법은 두 가지예요. envFrom이나 env로 환경 변수로 넣으면 간단하지만 값이 바뀌어도 파드를 재시작해야 반영돼요. 볼륨으로 마운트하면 파일로 읽히고, 값이 바뀌면 잠시 뒤 파일도 자동으로 갱신돼 앱이 다시 읽을 수 있어요. 설정이 바뀔 때 롤아웃이 일어나게 하려면 설정 해시를 파드 주석에 넣는 방법을 써요.', 'ConfigMaps hold settings and Secrets hold sensitive values outside the image; Secrets are only base64, so protect them with encryption at rest, RBAC and external stores.', 'Using one image in development and production requires keeping configuration outside it. ConfigMaps hold ordinary settings such as log levels, feature options and external API addresses. Secrets carry sensitive values such as database passwords and API keys, but by default they are only base64-encoded, not encrypted. So enable encryption at rest in etcd, use RBAC to limit which people and service accounts can read Secrets, and connect external stores such as AWS Secrets Manager through the External Secrets Operator; when they must live in Git, encrypt them with Sealed Secrets or SOPS. Apps receive them in two ways. Environment variables via envFrom or env are simple, but changes apply only after the pod restarts. Volume mounts expose files that refresh automatically after a short delay when values change, letting the app reload them. To roll pods when configuration changes, put a hash of the config in a pod annotation.', sK8sConfig()),
    item('op-k8s-resources', '자원 요청과 제한', 'Resource requests and limits', 'requests는 배치 기준이자 보장되는 몫, limits는 상한이에요. 메모리 초과는 OOMKilled, CPU 초과는 스로틀로 느려져요.', '컨테이너마다 CPU와 메모리의 requests와 limits를 정해요. requests는 스케줄러가 파드를 배치할 때 쓰는 예약값이에요. 노드의 남은 용량과 파드들의 requests 합을 비교해 들어갈 수 있는 노드를 고르고, 그 몫은 보장돼요. limits는 넘을 수 없는 상한이에요. requests와 limits가 같으면 Guaranteed, 다르면 Burstable, 둘 다 없으면 BestEffort 등급이 되며, 노드 자원이 모자랄 때 BestEffort부터 쫓겨나요. 메모리는 압축할 수 없어서 limit을 넘으면 커널이 컨테이너를 강제 종료하고 OOMKilled로 재시작돼요. 재시작이 반복되면 메모리 누수나 너무 낮은 limit을 의심해요. CPU는 limit을 넘어도 죽지 않고 스로틀되어 느려지므로, 원인을 알 수 없는 지연이 튀면 스로틀 지표를 확인해요. 그래서 메모리 limit은 꼭 두되 CPU limit은 두지 않는 팀도 많아요. 값은 감으로 정하지 말고 실제 사용량 지표나 VPA 추천을 보고 조정하며, 네임스페이스에는 ResourceQuota로 팀별 총량을 제한해요.', 'Requests drive scheduling and guarantee a share while limits cap usage; exceeding memory gets a container OOMKilled, exceeding CPU throttles it.', 'Each container sets CPU and memory requests and limits. Requests are reservations the scheduler uses for placement: it compares a node’s remaining capacity with the sum of pod requests to find a fit, and that share is guaranteed. Limits are hard ceilings. Equal requests and limits make a pod Guaranteed, different values Burstable and neither BestEffort, and BestEffort pods are evicted first when a node runs short. Memory cannot be compressed, so exceeding the limit makes the kernel kill the container, which restarts as OOMKilled; repeated restarts point to leaks or limits set too low. CPU over the limit is throttled rather than killed, so check throttling metrics when unexplained latency spikes appear, which is why many teams always set memory limits but skip CPU limits. Tune values from real usage metrics or VPA recommendations rather than guesses, and cap per-team totals with namespace ResourceQuotas.', sK8sResources())
  ],
  'op-metrics': [
    item('op-prometheus', 'Prometheus와 PromQL', 'Prometheus and PromQL', '대상의 /metrics를 주기적으로 당겨 와 라벨 붙은 시계열로 저장하고, rate()로 초당 증가율을 계산해요. 라벨 값이 무한하면 시계열이 폭발해요.', 'Prometheus는 대상 앱의 /metrics 엔드포인트를 보통 15초마다 당겨 오는(pull) 방식으로 메트릭을 모아요. 쿠버네티스에서는 서비스 디스커버리로 새 파드를 자동으로 대상에 넣어요. 메트릭 이름과 라벨 조합 하나가 시계열 하나예요. 예를 들어 http_requests_total{route="/pay", status="500"}은 결제 경로의 500 응답 누적 횟수예요. 카운터는 계속 늘어나기만 하므로 그대로 보면 의미가 적고, PromQL의 rate()로 5분 창의 초당 증가율을 구해요. sum(rate(...)) by (route)처럼 라벨별로 합치면 경로별 오류율 같은 지표가 돼요. 지연은 히스토그램으로 기록해 histogram_quantile로 p99를 구해요. 자주 쓰는 식은 기록 규칙(recording rule)으로 미리 계산하고, 알림 규칙은 Alertmanager로 보내 묶고 라우팅해요. 라벨 값이 무한하면 시계열이 폭발해 메모리가 터지므로 user_id나 요청 ID 같은 값은 라벨이 아니라 로그나 트레이스에 넣어요. 장기 보관과 여러 클러스터 통합은 Thanos나 Mimir 같은 저장소로 해요.', 'Prometheus pulls targets’ /metrics on a schedule, stores labeled time series and computes per-second growth with rate(); unbounded label values explode the series count.', 'Prometheus collects metrics by pulling each target’s /metrics endpoint, typically every 15 seconds, and on Kubernetes service discovery adds new pods as targets automatically. Each metric name plus label combination is one time series; http_requests_total{route="/pay", status="500"}, for example, counts 500 responses on the payment route. Counters only increase, so raw values say little, and PromQL’s rate() computes per-second growth over a five-minute window. Aggregating as sum(rate(...)) by (route) yields measures such as error rate per route, and latency is recorded as histograms with histogram_quantile giving p99. Frequently used expressions are precomputed with recording rules, and alerting rules send to Alertmanager, which groups and routes them. Unbounded label values explode the series count and memory, so values such as user IDs or request IDs belong in logs or traces, not labels. Long-term retention and multi-cluster views come from stores such as Thanos or Mimir.', sPrometheus())
  ],
  'op-logs': [
    item('op-log-pipeline', '로그 파이프라인', 'Log pipelines', '앱은 표준 출력에 JSON으로 쓰고, 수집기 → 버퍼 → 저장소로 보내요. 보존 계층으로 비용을, 마스킹과 샘플링으로 위험과 양을 관리해요.', '컨테이너 환경에서는 앱이 로그를 파일 대신 표준 출력(stdout)에 구조화된 JSON으로 써요. 노드마다 DaemonSet으로 도는 Fluent Bit이나 Vector 같은 수집기가 컨테이너 로그를 모아 쿠버네티스 메타데이터(파드, 네임스페이스)를 붙여 보내요. 중간에 Kafka나 수집기 자체의 디스크 버퍼를 두면 저장소 장애나 트래픽 폭증 때도 로그를 잃지 않아요. Loki는 라벨로 색인하고 본문은 압축 저장해 싸고, Elasticsearch·OpenSearch는 전문 검색이 강한 대신 비싸요. 로그는 양이 많아 비용이 빨리 늘어요. 최근 7일처럼 자주 보는 로그는 빠른 핫 저장소에, 그 이후는 오브젝트 스토리지 같은 콜드 저장소에 두고, 보존 기간이 지나면 지워요. 이메일, 카드 번호, 토큰 같은 개인정보와 비밀은 수집 단계에서 마스킹해 저장소에 남지 않게 하고, 양이 많은 디버그 로그는 샘플링해요. 로그에 trace ID를 넣으면 트레이스와 서로 오가며 원인을 찾기 쉬워지고, 감사 로그는 별도로 더 오래 보관해요.', 'Apps write JSON to stdout, and logs flow from agent to buffer to store, with retention tiers controlling cost and masking and sampling controlling risk and volume.', 'In container environments apps write structured JSON logs to standard output instead of files. An agent running on every node as a DaemonSet, such as Fluent Bit or Vector, collects container logs, attaches Kubernetes metadata such as pod and namespace, and ships them. A buffer in between, such as Kafka or the agent’s own disk buffer, keeps logs safe during store outages or traffic spikes. Loki indexes only labels and compresses the bodies, keeping costs low, while Elasticsearch and OpenSearch excel at full-text search at higher cost. Logs are voluminous and costs grow fast, so keep frequently viewed logs such as the last seven days in fast hot storage, move older logs to cold storage such as object storage, and delete them after retention. Mask personal data and secrets such as emails, card numbers and tokens during collection so they never reach the store, and sample high-volume debug logs. Trace IDs in logs make it easy to jump between logs and traces, and audit logs are kept separately for longer.', sLogPipeline())
  ],
  'op-percentile': [
    item('op-red-use', 'RED와 USE 방법', 'The RED and USE methods', 'RED(요청률·오류·지연)로 서비스가 사용자에게 어떤지, USE(사용률·포화·오류)로 어느 자원이 원인인지 봐요. 대시보드를 증상에서 원인으로 구성해요.', '모니터링할 수 있는 지표는 수천 개라서 무엇을 먼저 볼지 정해 두는 방법이 필요해요. RED 방법은 서비스마다 초당 요청 수(Rate), 실패한 요청 비율(Errors), 응답 시간 분포(Duration) 세 가지를 봐요. 사용자가 느끼는 서비스 상태를 바로 보여줘서 “지금 사용자에게 문제가 있나?”에 답해요. USE 방법은 CPU, 메모리, 디스크, 네트워크, 커넥션 풀 같은 자원마다 사용률(Utilization), 포화도(Saturation: 대기열이나 기다리는 작업), 오류(Errors)를 봐요. 사용률이 낮아도 포화가 높으면 병목이 있다는 뜻이라 “어느 자원 때문인가?”에 답해요. Google SRE 책의 네 가지 골든 시그널(지연, 트래픽, 오류, 포화)도 같은 생각이에요. 대시보드 맨 위에는 서비스별 RED를, 그 아래에는 관련 자원의 USE를 두면 장애 때 위에서 아래로 증상에서 원인으로 따라 내려갈 수 있어요. 지연은 평균이 아니라 p50, p99 같은 백분위수로 보고, 대시보드도 코드로 관리해요.', 'RED (rate, errors, duration) shows how a service looks to users, and USE (utilization, saturation, errors) shows which resource is to blame, so dashboards run from symptom to cause.', 'With thousands of possible metrics, teams need a method for what to look at first. The RED method watches three things per service: requests per second (Rate), the share of failed requests (Errors) and the distribution of response times (Duration). It shows the service as users experience it, answering “are users affected right now?” The USE method checks each resource, such as CPU, memory, disks, network and connection pools, for utilization, saturation (queues or waiting work) and errors; high saturation despite low utilization still signals a bottleneck, answering “which resource is to blame?” The four golden signals from Google’s SRE book (latency, traffic, errors, saturation) share the idea. Putting per-service RED at the top of a dashboard and the related resources’ USE below lets responders drill down from symptom to cause during an incident. Latency should be read as percentiles such as p50 and p99 rather than averages, and dashboards should be managed as code.', sRedUse())
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
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
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
