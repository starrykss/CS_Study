(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c tc-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const ACC = { 'box-shadow': '0 0 0 .22em var(--ui), 0 0 0 .36em var(--ok)' };
/* input tape with a moving cursor */
function tape(S, k, x, y, str, w = 2.6) { str.split('').forEach((c, i) => chip(S, `${k}${i}`, x + i * w, y, w - .3, c, {}, { h: 2.4, cls: 'tc-big' })); S.el(k + 'cur', { x: x - .15, y: y - .3, w: w, h: 3, css: 'border:.2em solid var(--warn);border-radius:.4em;z-index:3', s: { opacity: '0' } }); }
const at = (S, k, x, i, st, w = 2.6) => S.set(k + 'cur', st, { opacity: '1' }).move(k + 'cur', st, x - .15 + i * w, S.get(k + 'cur').y);

/* ---------- automata ---------- */
function sDFA() {
  const S = scene({ id: 'toc-dfa', steps: 6, per: 1.15 });
  text(S, 'in', 1, 1.2, ['입력 "1001" (= 9)', 'input "1001" (= 9)'], { cls: 'cz-t tc-b' });
  tape(S, 't', 10, .6, '1001');
  const P = { q0: [6, 12], q1: [16, 12], q2: [26, 12] };
  arrow(S, 'a01', 7.8, 11.2, 14.2, 11.2); arrow(S, 'a10', 14.2, 12.8, 7.8, 12.8); arrow(S, 'a12', 17.8, 11.2, 24.2, 11.2); arrow(S, 'a21', 24.2, 12.8, 17.8, 12.8);
  [['l01', 10.6, 9.8, '1'], ['l10', 10.6, 13.2, '1'], ['l12', 20.6, 9.8, '0'], ['l21', 20.6, 13.2, '0']].forEach(([k, x, y, t]) => text(S, k, x, y, t, { cls: 'cz-t cz-mono tc-b' }));
  text(S, 'lp0', 5, 8.2, '↺ 0', { cls: 'cz-t cz-mono tc-b' }); text(S, 'lp2', 25, 8.2, '↺ 1', { cls: 'cz-t cz-mono tc-b' });
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.7, s: k === 'q0' ? ACC : {} }));
  text(S, 'rm', 1, 16.4, ['상태 = 지금까지 읽은 수를 3으로 나눈 나머지 · q0 = 받아들임', 'state = value so far mod 3 · q0 accepts'], { cls: 'cz-t' });
  const path = ['q0', 'q1', 'q2', 'q1', 'q0'];
  S.set('q0', 0, Object.assign({}, C.cur, ACC));
  path.forEach((q, i) => { if (!i) return; at(S, 't', 10, i - 1, i); S.set(q, i, Object.assign({}, C.cur, q === 'q0' ? ACC : {})); if (path[i - 1] !== q) S.set(path[i - 1], i, Object.assign({}, C.idle, path[i - 1] === 'q0' ? ACC : {})); S.set('t' + (i - 1), i, C.soft); });
  S.set('q0', 5, Object.assign({}, C.okf, ACC)).set('tcur', 5, { opacity: '0' });
  S.cap(0, '3의 배수인 2진수를 알아보는 기계', 'A machine that recognises binary multiples of 3').cap(1, '한 글자씩 읽으며 화살표를 따라 상태를 옮겨요', 'Read one symbol at a time and follow the arrow')
    .cap(4, '기억은 현재 상태 하나뿐', 'The only memory is the current state').cap(5, 'q0에서 끝났으니 받아들여요 ✓', 'It ends in q0, so the input is accepted ✓')
    .cap(6, '자판기, 신호등, 주문 상태, 정규식 엔진, 토크나이저가 모두 DFA', 'Vending machines, order states, regex engines and lexers are DFAs');
  return S;
}
function sNFA() {
  const S = scene({ id: 'toc-nfa', steps: 5, per: 1.3 });
  text(S, 'in', 1, 1.2, ['"ab"를 포함하나? 입력 "aab"', 'contains "ab"? input "aab"'], { cls: 'cz-t tc-b' });
  tape(S, 't', 16, .6, 'aab');
  const P = { s0: [6, 11.6], s1: [16, 11.6], s2: [26, 11.6] };
  arrow(S, 'a1', 7.8, 11.6, 14.2, 11.6); arrow(S, 'a2', 17.8, 11.6, 24.2, 11.6);
  text(S, 'l1', 10.6, 10.2, 'a', { cls: 'cz-t cz-mono tc-b' }); text(S, 'l2', 20.6, 10.2, 'b', { cls: 'cz-t cz-mono tc-b' });
  text(S, 'lp0', 4.4, 7.8, '↺ a,b', { cls: 'cz-t cz-mono tc-b' }); text(S, 'lp2', 24.4, 7.8, '↺ a,b', { cls: 'cz-t cz-mono tc-b' });
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.7, s: k === 's2' ? ACC : {} }));
  const sets = [['s0'], ['s0', 's1'], ['s0', 's1'], ['s0', 's2']];
  sets.forEach((set, i) => { if (i) at(S, 't', 16, i - 1, i); ['s0', 's1', 's2'].forEach(q => S.set(q, i, Object.assign({}, set.includes(q) ? C.cur : C.idle, q === 's2' ? ACC : {}))); });
  S.label('set', { cls: 'cz-t cz-mono tc-b', x: 1, y: 16, w: 30 }, sets.map((s, i) => [i, ['활성 상태 {' + s.join(', ') + '}', 'active {' + s.join(', ') + '}']]));
  S.set('s2', 4, Object.assign({}, C.okf, ACC)).set('tcur', 4, { opacity: '0' });
  S.cap(1, '"a"를 읽으면 두 갈래로 동시에 가요', 'Reading "a" branches both ways at once').cap(2, '여러 상태가 동시에 살아 있어요', 'Several states stay active').cap(3, '하나라도 받아들임 상태에 닿으면 ✓', 'If any branch reaches accept, it’s accepted')
    .cap(5, 'NFA는 같은 힘의 DFA로 바꿀 수 있어요 (부분집합 구성)', 'Every NFA converts to an equivalent DFA (subset construction)');
  return S;
}
function sRegex() {
  const S = scene({ id: 'toc-regex', steps: 6, per: 1.15 });
  text(S, 'rx', 1, 1, '/colou?r/', { cls: 'cz-t cz-mono tc-big2' });
  const L = ['c', 'o', 'l', 'o', 'u', 'r'], X = i => 2.4 + i * 4.6;
  for (let i = 0; i <= 6; i++) node(S, 'n' + i, X(i), 9, String(i), { r: 1.2, s: i === 6 ? ACC : {} });
  L.forEach((c, i) => { arrow(S, 'e' + i, X(i) + 1.3, 9, X(i + 1) - 1.3, 9); text(S, 'el' + i, X(i) + 2, 7.2, c, { cls: 'cz-t cz-mono tc-b' }); });
  S.el('skip', { x: X(4), y: 11.2, w: X(5) - X(4), h: 2.2, css: 'border:.14em dashed var(--warn);border-top:0;border-radius:0 0 1.2em 1.2em' });
  text(S, 'sk', X(4) + 1.3, 13.6, ['u 생략', 'skip u'], { cls: 'cz-t' });
  const W = [['color', 1, ['n0', 'n1', 'n2', 'n3', 'n4', 'n6']], ['colour', 1, ['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6']], ['colouur', 0, ['n0', 'n1', 'n2', 'n3', 'n4', 'n5']]];
  W.forEach(([w, ok, path], j) => { const st = j * 2 + 1; pill(S, 'w' + j, 2 + j * 10, 16.2, `"${w}" ${ok ? '✓' : '✗'}`, { w: 9, h: 2, cls: 'cz-pill cz-mono', s: hid(ok ? C.ok : C.bad) }); S.set('w' + j, st + 1, { opacity: '1' }); path.forEach(n => S.set(n, st, ok ? C.soft : C.bad).set(n, st + 1, n === 'n6' ? ACC : C.idle)); });
  S.cap(0, '정규식은 유한 오토마타로 바뀌어 실행돼요', 'A regex compiles into a finite automaton').cap(1, '"color": u를 건너뛰는 길로 도착 ✓', '"color" reaches the end via the skip path ✓')
    .cap(3, '"colour": u를 지나서 도착 ✓', '"colour" passes through u ✓').cap(5, '"colouur": u가 두 번이라 길이 없어요 ✗', '"colouur": no path for a second u ✗')
    .cap(6, '백트래킹 엔진에선 (a+)+ 같은 패턴이 지수 시간이 걸려요 (ReDoS)', 'Backtracking engines can blow up on patterns like (a+)+ (ReDoS)');
  return S;
}
function sPDA() {
  const S = scene({ id: 'toc-pda', steps: 8, per: .95 });
  const str = '(()())';
  text(S, 'in', 1, 1.2, ['입력', 'input'], { cls: 'cz-t tc-b' });
  tape(S, 't', 6, .6, str);
  box(S, 'stk', 22, 5, 7, 13, '', { css: 'border-top:0;border-radius:0 0 .8em .8em;background:transparent' }); text(S, 'sl', 22, 18.4, ['스택', 'stack'], { w: 7, cls: 'cz-t cz-tc' });
  let depth = 0; const pushes = [];
  str.split('').forEach((c, i) => { const st = i + 1; at(S, 't', 6, i, st); if (c === '(') { const k = 'p' + i; chip(S, k, 22.6, 16.2 - depth * 2.4, 5.8, '(', hid(C.soft), { h: 2 }); S.set(k, st, { opacity: '1' }); pushes.push(k); depth++; } else { const k = pushes.pop(); S.set(k, st, { opacity: '0' }); depth--; } });
  S.set('tcur', 7, { opacity: '0' });
  S.label('r', { cls: 'cz-t tc-b', x: 1, y: 6, w: 19 }, [[0, ''], [1, ['( → 넣기 (push)', '( → push']], [3, [') → 꺼내기 (pop)', ') → pop']], [7, ['끝에 스택이 비면 짝이 맞아요 ✓', 'empty at the end → balanced ✓']]]);
  text(S, 'n', 1, 10.6, ['DFA는 몇 개 열렸는지 셀 수 없지만', 'A DFA can’t count unbounded nesting'], { cls: 'cz-t', s: hid() }); text(S, 'n2', 1, 12.2, ['스택을 가지면 가능해요', 'but a stack can'], { cls: 'cz-t', s: hid() }); show(S, ['n', 'n2'], 8);
  S.cap(1, '여는 괄호는 스택에 쌓고', 'Push every opening bracket').cap(3, '닫는 괄호는 하나 꺼내요', 'Pop one for every closing bracket').cap(7, '끝에 비어 있으면 올바른 괄호', 'An empty stack at the end means balanced')
    .cap(8, '프로그래밍 언어 문법(중첩 블록)을 읽는 파서의 원리', 'How parsers handle nested programming-language syntax');
  return S;
}
function sChomsky() {
  const S = scene({ id: 'toc-chomsky', steps: 5, per: 1.3 });
  const L = [['re', 1, ['재귀 열거 · 튜링 기계', 'Recursively enumerable · Turing machine'], 'var(--line)'], ['cs', 3, ['문맥 의존 · 선형 제한 오토마타', 'Context-sensitive · LBA'], 'var(--warn-soft)'], ['cf', 5, ['문맥 자유 · 푸시다운 오토마타', 'Context-free · PDA'], 'var(--accent-soft)'], ['rg', 7, ['정규 · 유한 오토마타', 'Regular · finite automaton'], 'color-mix(in srgb,var(--ok) 25%,var(--ui))']];
  L.forEach(([k, m, l, bg], i) => { S.el(k, { x: 1 + i * 2.4, y: 1 + i * 2.6, w: 30 - i * 4.8, h: 18 - i * 4.2, css: `border-radius:1.2em;border:.14em solid var(--line);background:${bg}`, s: hid() }); text(S, k + 'l', 1.8 + i * 2.4, 1.5 + i * 2.6, l, { cls: 'cz-t tc-b', s: hid() }); show(S, [k, k + 'l'], i + 1); });
  const ex = [['e0', 2, 17.4, ['임의의 프로그램이 받아들이는 입력', 'inputs any program accepts'], 1], ['e1', 4.4, 15.8, 'aⁿbⁿcⁿ', 2], ['e2', 6.8, 14.2, ['괄호 짝, 코드 문법', 'brackets, code syntax'], 3], ['e3', 9.2, 11.2, ['정규식, 토큰, 전화번호 형식', 'regex, tokens, phone formats'], 4]];
  ex.forEach(([k, x, y, t, st]) => { text(S, k, x, y, t, { cls: 'cz-t cz-mono', s: hid() }); S.set(k, st, { opacity: '1' }); });
  S.cap(1, '튜링 기계가 다룰 수 있는 가장 큰 집합', 'The largest class: what Turing machines handle').cap(3, '프로그래밍 언어 문법은 대부분 문맥 자유', 'Most programming-language syntax is context-free')
    .cap(4, '안쪽일수록 단순한 기계로 빠르게 처리돼요', 'Inner classes are handled by simpler, faster machines').cap(5, '그래서 정규식으로 HTML 전체를 파싱하면 안 돼요', 'Which is why you can’t parse HTML with a regex');
  return S;
}
function sCFG() {
  const S = scene({ id: 'toc-cfg', steps: 5, per: 1.3 });
  ['E → E + T | T', 'T → T × F | F', 'F → ( E ) | num'].forEach((r, i) => text(S, 'g' + i, 1, 1.4 + i * 1.6, r, { cls: 'cz-t cz-mono tc-b' }));
  text(S, 'ex', 19, 1.4, '2 + 3 × 4', { cls: 'cz-t cz-mono tc-big2' });
  const N = { E: [16, 6.4, 'E', 1], E1: [9, 10, 'E', 2], plus: [16, 10, '+', 2], T: [23, 10, 'T', 2], T1: [9, 13.4, 'T', 3], T2: [19, 13.4, 'T', 3], x: [23, 13.4, '×', 3], F: [27, 13.4, 'F', 3], F1: [9, 16.8, '2', 4], F2: [19, 16.8, '3', 4], n4: [27, 16.8, '4', 4] };
  const E = [['E', 'E1'], ['E', 'plus'], ['E', 'T'], ['E1', 'T1'], ['T', 'T2'], ['T', 'x'], ['T', 'F'], ['T1', 'F1'], ['T2', 'F2'], ['F', 'n4']];
  E.forEach(([a, b]) => { edge(S, 'e' + a + b, N[a][0], N[a][1], N[b][0], N[b][1], { s: hid() }); S.set('e' + a + b, N[b][3], { opacity: '1' }); });
  Object.entries(N).forEach(([k, [x, y, l, st]]) => { node(S, k, x, y, l, { r: 1.2, s: hid(['2', '3', '4', '+', '×'].includes(l) ? C.cmp : C.soft) }); S.set(k, st, { opacity: '1' }); });
  S.set('T', 5, C.ok).set('x', 5, C.ok).set('T2', 5, C.ok).set('F', 5, C.ok).set('F2', 5, C.ok).set('n4', 5, C.ok);
  S.cap(1, '문법 규칙을 위에서부터 펼쳐 나무를 만들어요', 'Expand the grammar rules top-down into a tree').cap(4, '잎을 이으면 원래 식이 돼요 (파스 트리)', 'Reading the leaves gives the original expression (parse tree)')
    .cap(5, '× 가 더 깊이 있어서 먼저 계산돼요 → 연산자 우선순위', '× sits deeper, so it is evaluated first: operator precedence');
  return S;
}

/* ---------- computability ---------- */
function sTuring() {
  const S = scene({ id: 'toc-turing', steps: 8, per: .9 });
  text(S, 't', 1, 1.2, ['2진수에 1 더하기: 1011 → 1100', 'add 1 in binary: 1011 → 1100'], { cls: 'cz-t tc-b' });
  const init = ['_', '1', '0', '1', '1', '_'], W = 3.4, x0 = 5.6;
  const states = [init.slice()]; const heads = [1]; const st = ['→ 오른쪽 끝으로'];
  const cells = init.slice();
  for (let h = 2; h <= 5; h++) { heads.push(h); states.push(cells.slice()); }
  let h = 4; const back = [];
  cells[4] = '0'; back.push([4, cells.slice()]); cells[3] = '0'; back.push([3, cells.slice()]); cells[2] = '1'; back.push([2, cells.slice()]);
  const seq = [[1, init], [5, init], [4, init], ...back.map(([hh, c], i) => [hh, c])];
  init.forEach((_, i) => S.label('c' + i, { cls: 'cz-c tc-m tc-big', x: x0 + i * W, y: 7, w: W - .3, h: 3 }, (() => { const l = [[0, init[i]]]; seq.forEach(([, c], k) => { if (k && c[i] !== seq[k - 1][1][i]) l.push([k + 1, c[i]]); }); return l; })()));
  S.el('hd', { x: x0 + 1 * W + .5, y: 10.6, w: W - 1.3, h: 2.2, html: '▲', cls: 'tc-head', s: { color: 'var(--warn)' } });
  seq.forEach(([hh], k) => { if (k) S.move('hd', k + 1, x0 + hh * W + .5, 10.6); });
  S.label('q', { cls: 'cz-pill', x: 9, y: 14, w: 14, h: 2.2, s: C.soft }, [[0, ['상태: 오른쪽으로', 'state: go right']], [3, ['상태: 올림 (1→0, 왼쪽)', 'state: carry (1→0, left)']], [6, ['상태: 0→1, 멈춤', 'state: 0→1, halt']]]);
  Object.assign(S.get('q~2').s, C.ok);
  S.cap(1, '테이프·헤드·상태만으로 된 가장 단순한 컴퓨터', 'The simplest computer: a tape, a head and a state').cap(2, '끝까지 이동한 뒤', 'Move to the end').cap(4, '1이면 0으로 바꾸며 왼쪽으로 (올림)', 'Turn 1s into 0s moving left (carry)')
    .cap(6, '0을 만나면 1로 바꾸고 멈춰요', 'Turn the first 0 into 1 and halt').cap(8, '계산 가능한 모든 것은 이 기계로 할 수 있어요 (처치-튜링 논제)', 'Anything computable can be done this way (Church–Turing thesis)');
  return S;
}
function sHalting() {
  const S = scene({ id: 'toc-halting', steps: 6, per: 1.2 });
  box(S, 'h', 2, 2, 12, 5, '', { s: C.soft }); text(S, 'hl', 2, 2.6, ['H(P, x): P가 멈추나?', 'H(P, x): does P halt?'], { w: 12, cls: 'cz-t cz-tc tc-b' }); text(S, 'hl2', 2, 4.6, ['(완벽한 판정기라고 가정)', '(assume it is perfect)'], { w: 12, cls: 'cz-t cz-tc' });
  box(S, 'd', 18, 2, 12, 9, '', { s: hid(C.cmp) }); S.set('d', 2, { opacity: '1' });
  [['D(P):', 2.6], ['if H(P, P) = 멈춤', 4.4], ['   → 무한 반복', 6], ['else → 멈춤', 7.6]].forEach(([t, y], i) => { text(S, 'dl' + i, 18.8, y, i === 1 ? ['if H(P, P) = 멈춤', 'if H(P, P) = halts'] : i === 2 ? ['   → 무한 반복', '   → loop forever'] : i === 3 ? ['else → 멈춤', 'else → halt'] : t, { cls: 'cz-t cz-mono', s: hid() }); S.set('dl' + i, 2, { opacity: '1' }); });
  pill(S, 'q', 9, 12.6, 'D(D) = ?', { w: 14, h: 2.4, cls: 'cz-pill cz-mono', s: hid(C.cur) }); S.set('q', 3, { opacity: '1' });
  text(S, 'c1', 2, 15.8, ['멈춘다고 하면 → 무한 반복 ✗', 'if it halts → it loops ✗'], { cls: 'cz-t tc-b', s: hid() }); text(S, 'c2', 17, 15.8, ['안 멈춘다고 하면 → 멈춤 ✗', 'if it loops → it halts ✗'], { cls: 'cz-t tc-b', s: hid() });
  S.set('c1', 4, { opacity: '1' }).set('c2', 4, { opacity: '1' });
  pill(S, 'x', 9, 18, ['모순 → 그런 H는 없다', 'contradiction → no such H'], { w: 14, h: 2, s: hid(C.badf) }); S.set('x', 5, { opacity: '1' });
  S.cap(1, '모든 프로그램이 멈추는지 판정하는 H가 있다고 해 봐요', 'Suppose H decides whether any program halts').cap(2, 'H의 답과 반대로 행동하는 D를 만들고', 'Build D that does the opposite of H’s answer')
    .cap(3, 'D에 자기 자신을 넣으면', 'Feed D to itself').cap(5, '어느 쪽이든 모순이에요', 'Either answer contradicts itself').cap(6, '그래서 완벽한 무한루프 탐지기·버그 검출기는 만들 수 없어요', 'So perfect infinite-loop or bug detectors are impossible');
  return S;
}

/* ---------- complexity ---------- */
function sBigO() {
  const S = scene({ id: 'toc-bigo', steps: 7, per: .95 });
  const X0 = 4, Y0 = 18, ux = 3, uy = .26, top = 1.4;
  S.el('ax', { x: X0, y: Y0, w: 25, h: .12, css: 'background:var(--ink-3)' }); S.el('ay', { x: X0, y: top, w: .12, h: Y0 - top, css: 'background:var(--ink-3)' });
  text(S, 'xl', 26, Y0 + .4, 'n →', { cls: 'cz-t' }); text(S, 'yl', .6, 1.4, ['시간', 'time'], { cls: 'cz-t' });
  const F = [['O(1)', n => 1, 'var(--ok)'], ['O(log n)', n => Math.log2(Math.max(n, 1)), 'var(--ok)'], ['O(n)', n => n, 'var(--accent)'], ['O(n log n)', n => n * Math.log2(Math.max(n, 1)), 'var(--accent)'], ['O(n²)', n => n * n, 'var(--warn)'], ['O(2ⁿ)', n => 2 ** n, 'var(--danger)']];
  const yv = v => Math.max(top, Y0 - v * uy);
  const COL = ['var(--ok)', '#14b8a6', 'var(--accent)', '#8b5cf6', 'var(--warn)', 'var(--danger)'];
  F.forEach(([l, f], j) => {
    const col = COL[j]; let last = null;
    for (let n = 1; n <= 8; n++) { const p = [X0 + n * ux, yv(f(n))]; if (last) { edge(S, `f${j}_${n}`, last[0], last[1], p[0], p[1], { h: .22, s: hid({ background: col }) }); S.set(`f${j}_${n}`, j + 1, { opacity: '1' }); } last = p; if (yv(f(n)) <= top) break; }
    S.el('sw' + j, { x: 5.6, y: 2.3 + j * 1.75, w: 1.4, h: .3, css: 'border-radius:1em', s: hid({ background: col }) }); text(S, 'l' + j, 7.4, 1.75 + j * 1.75, l, { cls: 'cz-t cz-mono tc-b', s: hid() }); show(S, ['sw' + j, 'l' + j], j + 1);
  });
  S.cap(1, '입력이 늘어도 시간은 그대로', 'Time stays flat as input grows').cap(2, '로그는 거의 평평해요 (이진 탐색)', 'Logarithmic is nearly flat (binary search)').cap(3, '선형: 한 번 훑기', 'Linear: one pass')
    .cap(4, 'n log n: 좋은 정렬의 한계', 'n log n: the best general sorting').cap(5, 'n²: 이중 반복 · 10만 개면 100억 번', 'n²: nested loops · 10 billion steps at n = 100,000').cap(6, '2ⁿ: n이 조금만 커져도 불가능', '2ⁿ: hopeless as soon as n grows')
    .cap(7, '상수보다 증가율이 중요해요 · 입력 크기를 보고 알고리즘을 고르세요', 'Growth rate beats constants · choose algorithms by input size');
  return S;
}
function sPNP() {
  const S = scene({ id: 'toc-pnp', steps: 5, per: 1.3 });
  text(S, 'l1', 1, 1, ['확인하기: 답이 주어지면', 'Verify: given an answer'], { cls: 'cz-t tc-b' });
  const G = [[5, 3, 4], [4, 6, 2], [9, 1, 7]];
  G.forEach((row, r) => row.forEach((v, c) => chip(S, `g${r}${c}`, 1.4 + c * 2.6, 2.8 + r * 2.6, 2.3, String(v), {}, { h: 2.3 })));
  for (let r = 0; r < 3; r++) { S.set(`g${r}0`, 1, C.ok).set(`g${r}1`, 1, C.ok).set(`g${r}2`, 1, C.ok); }
  text(S, 'v', 1.4, 11, ['조건을 한 번씩 확인 → 금방 ✓', 'check each rule once → fast ✓'], { cls: 'cz-t', s: hid() }); S.set('v', 1, { opacity: '1' });
  text(S, 'l2', 12.4, 1, ['풀기: 답을 찾으려면', 'Solve: find an answer'], { cls: 'cz-t tc-b' });
  const T = []; const add = (x, y, d, st) => { const k = 'n' + T.length; T.push(k); dot(S, k, x, y, '', { r: .45, s: hid(C.cur) }); S.set(k, st, { opacity: '1' }); if (d < 3) { [-1, 1].forEach(s => { const nx = x + s * (4.2 / (d + 1)), ny = y + 3.4; const ek = 'te' + T.length + s; edge(S, ek, x, y, nx, ny, { s: hid() }); S.set(ek, st + 1, { opacity: '1' }); add(nx, ny, d + 1, st + 1); }); } };
  add(21.6, 3.2, 0, 1);
  text(S, 's', 12.4, 17.2, ['경우의 수가 폭발해 시간이 지수적으로 늘어요', 'the search tree explodes exponentially'], { cls: 'cz-t', s: hid() }); S.set('s', 4, { opacity: '1' });
  S.cap(1, 'NP: 답이 맞는지는 빨리 확인할 수 있는 문제들', 'NP: problems whose answers are quick to check').cap(2, '하지만 답을 찾는 빠른 방법은 아직 몰라요', 'but no fast way to find answers is known')
    .cap(4, 'P = NP인가? 컴퓨터 과학 최대의 미해결 문제', 'Is P = NP? The biggest open question in computer science').cap(5, '암호는 "풀기는 어렵고 확인은 쉬운" 성질에 기대고 있어요', 'Cryptography relies on “hard to solve, easy to check”');
  return S;
}
function sTSP() {
  const S = scene({ id: 'toc-tsp', steps: 8, per: .9 });
  const P = [[4, 4], [11, 2.6], [19, 4.6], [27, 3.4], [25, 11.4], [16, 10], [7, 12.4], [13, 16]];
  P.forEach(([x, y], i) => node(S, 'c' + i, x, y, String(i + 1), { r: 1.1 }));
  const vis = [0]; let cur = 0; const route = [];
  while (vis.length < P.length) { let best = -1, bd = 1e9; P.forEach((p, i) => { if (!vis.includes(i)) { const d = Math.hypot(p[0] - P[cur][0], p[1] - P[cur][1]); if (d < bd) { bd = d; best = i; } } }); route.push([cur, best]); vis.push(best); cur = best; }
  route.push([cur, 0]);
  route.forEach(([a, b], i) => { edge(S, 'r' + i, P[a][0], P[a][1], P[b][0], P[b][1], { h: .22, s: hid({ background: 'var(--accent)' }) }); S.set('r' + i, Math.min(i + 1, 8), { opacity: '1' }); });
  S.set('c0', 0, C.cur);
  S.label('cnt', { cls: 'cz-t tc-b', x: 1, y: 18.6, w: 30 }, [[0, ['도시 8개의 경로 = 2,520가지 · 20개면 6×10¹⁶가지', '8 cities = 2,520 routes · 20 cities = 6×10¹⁶']], [3, ['가장 가까운 도시부터 가는 근사법 (그리디)', 'nearest-neighbour heuristic (greedy)']], [8, ['최적은 아니지만 빠르고 꽤 좋아요', 'not optimal, but fast and decent']]]);
  S.cap(0, '모든 도시를 한 번씩 들르는 가장 짧은 길은?', 'The shortest route visiting every city once?').cap(1, '모두 따져 보면 경우의 수가 n!로 폭발해요 (NP-난해)', 'Trying all routes explodes like n! (NP-hard)')
    .cap(5, '실무에선 근사·휴리스틱으로 충분히 좋은 답을 찾아요', 'In practice heuristics find good-enough answers').cap(8, '배달 경로, 칩 배선, 물류 최적화가 이 문제', 'Delivery routing, chip wiring and logistics are this problem');
  return S;
}

const XT = (() => {
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'tx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono tx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono tx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c tx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono tx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c tx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'tx-s tx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono tx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono tx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

const CSSX = `
.tx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.tx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.tx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.tx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.tx-r .in{color:var(--danger);font-weight:800}
.tx-g .in{color:var(--ok);font-weight:800}
.tx-a .in{color:var(--accent);font-weight:800}
.tx-w .in{color:var(--warn);font-weight:800}
.tx-c .in{font-size:.6em;font-weight:700}
.tx-c2 .in{font-size:.5em;font-weight:700}
.tx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.tx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono tx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono tx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono tx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'tx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'tx-xs', 5));

/* ================= automata extras ================= */
function sLang() {
  const S = scene({ id: 'toc-lang', steps: 5, per: 1.5 });
  T(S, 'sg', 1, 1.3, 'Σ = { a, b }', 'cz-mono tx-s tx-a', 1);
  const R = [['ε'], ['a', 'b'], ['aa', 'ab', 'ba', 'bb'], ['aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb']];
  R.forEach((row, n) => { T(S, 'rl' + n, 1, 3.15 + n * 1.8, ['길이 ' + n, 'len ' + n], 'tx-xs', 2);
    row.forEach((w, j) => { const k = `w${n}_${j}`, ev = (w.split('a').length - 1) % 2 === 0; box2(S, k, 5 + j * 3.2, 2.8 + n * 1.8, 2.9, 1.5, w, 'accent', 2, { pct: 18 });
      if (ev) tsets(S, k, [[3, 'ok', 45]]); else S.set(k, 3, { opacity: '.25' }); }); });
  T(S, 's2', 5, 10.2, ['Σ* = 길이 0, 1, 2, … 인 모든 문자열 (무한)', 'Σ* = every string of length 0, 1, 2, … (infinite)'], 'tx-xs tx-a', 2);
  T(S, 's3', 18, 1.3, ['L = a가 짝수 개인 문자열', 'L = strings with an even number of a’s'], 'tx-xs tx-g', 3);
  T(S, 'op1', 1, 11.8, '{a, ab} · {b, ba} = {ab, aba, abb, abba}', 'cz-mono tx-xs', 4);
  T(S, 'op2', 1, 13, 'L₁ ∪ L₂ · L₁ ∩ L₂ · L* = {ε} ∪ L ∪ LL ∪ LLL ∪ …', 'cz-mono tx-xs', 4);
  notes(S, 'n', 15, [['알파벳 Σ: 쓸 수 있는 기호들의 유한 집합', 'an alphabet Σ is a finite set of symbols'], ['Σ*: 그 기호로 만들 수 있는 모든 문자열 (빈 문자열 ε 포함)', 'Σ*: every string over those symbols, including the empty string ε'], ['언어: Σ*의 부분집합 · “이 문자열이 L에 속할까?”', 'a language is a subset of Σ* · “is this string in L?”'], ['언어끼리 이어 붙이고(·), 합치고(∪), 반복(*)할 수 있어요', 'languages concatenate (·), unite (∪) and repeat (*)']]);
  fin(S, 'z', 15, [['모든 결정 문제는 “입력이 어떤 언어에 속하나?”로 바꿔 쓸 수 있어요', 'every decision problem can be phrased as “is the input in some language?”', 'tx-xs tx-a'], ['기계가 어떤 언어를 인식할 수 있는지가 계산 이론의 출발점이에요', 'which languages a machine can recognize is where the theory begins']]);
  S.cap(1, '알파벳: 기호의 유한 집합', 'An alphabet: a finite set of symbols').cap(2, 'Σ*: 만들 수 있는 모든 문자열', 'Σ*: all possible strings').cap(3, '언어 = 문자열의 집합', 'A language is a set of strings').cap(4, '언어의 연산', 'Operations on languages').cap(5, '알파벳·문자열·언어', 'Alphabets, strings, languages');
  return S;
}
function sMin() {
  const S = scene({ id: 'toc-min', steps: 5, per: 1.5 });
  const P = { A: [4, 4], B: [12, 4], C: [4, 11], D: [12, 11] }, G1 = { A: 1, C: 1 };
  Object.entries(P).forEach(([k, [x, y]]) => { stt(S, 's' + k, x, y, k, 'ink-3', 0, { acc: !G1[k], start: k === 'A' }); tsets(S, 's' + k, [[2, G1[k] ? 'accent' : 'ok', 35]]); });
  trn(S, 'ab', P.A, P.B, '1', 0); trn(S, 'ac', P.A, P.C, '0', 0, { bend: .4 }); trn(S, 'ca', P.C, P.A, '0', 0, { bend: .4 }); trn(S, 'cd', P.C, P.D, '1', 0, { ld: -.55 });
  trn(S, 'bd', P.B, P.D, '1', 0, { bend: .4 }); trn(S, 'db', P.D, P.B, '1', 0, { bend: .4 }); trn(S, 'bc', P.B, P.C, '0', 0, { bend: .3 }); trn(S, 'da', P.D, P.A, '0', 0, { bend: .3 });
  T(S, 'th', 18, 2.2, ['상태 · 0→ · 1→', 'state · 0→ · 1→'], 'tx-xs', 3);
  [['A', 'C', 'B'], ['C', 'A', 'D'], ['B', 'C', 'D'], ['D', 'A', 'B']].forEach(([s, z, o], i) => { const g = q => (G1[q] ? '①' : '②');
    T(S, 'tr' + i, 18, 3.4 + i * 1.2, `${s} : ${z}${g(z)} · ${o}${g(o)}`, 'cz-mono tx-xs ' + (G1[s] ? 'tx-a' : 'tx-g'), 3); });
  T(S, 'tz', 18, 8.4, ['그룹 안 신호가 같아요 → 더 쪼갤 게 없음', 'signatures match inside each group → stable'], 'tx-xs', 3);
  stt(S, 'm1', 21, 14, 'AC', 'accent', 4, { start: true, pct: 30 }); stt(S, 'm2', 28, 14, 'BD', 'ok', 4, { acc: true, pct: 30 });
  lp(S, 'm1l', 21, 14, '0', 4); lp(S, 'm2l', 28, 14, '1', 4); trn(S, 'mt1', [21, 14], [28, 14], '1', 4, { bend: .4 }); trn(S, 'mt2', [28, 14], [21, 14], '0', 4, { bend: .4 });
  notes(S, 'n', 17, [['“1로 끝나는 문자열”을 받는 상태 4개짜리 DFA', 'a 4-state DFA accepting “ends with 1”'], ['먼저 수락 / 비수락 상태로 나눠요', 'first split accepting from non-accepting states'], ['각 상태가 0·1에서 어느 그룹으로 가는지 비교해 다르면 쪼개요', 'split a group when its states go to different groups on some symbol'], ['더 안 쪼개지면 같은 그룹을 한 상태로 합쳐요 → 2개면 충분', 'when nothing splits, merge each group into one state → 2 suffice']], 'tx-xs');
  fin(S, 'z', 17, [['같은 언어의 최소 DFA는 (이름만 빼고) 하나뿐이에요 (마이힐–네로드 정리)', 'the minimal DFA for a language is unique up to renaming (Myhill–Nerode)', 'tx-xs tx-a'], ['홉크로프트 알고리즘은 O(n log n) · 정규식 엔진과 어휘 분석기가 써요', 'Hopcroft’s algorithm runs in O(n log n) · used by regex engines and lexers']]);
  S.cap(1, '중복된 상태가 있는 DFA', 'A DFA with redundant states').cap(2, '수락 여부로 먼저 나눠요', 'Split by accepting or not').cap(3, '전이가 같은지 확인해요', 'Compare where transitions lead').cap(4, '같은 상태끼리 합쳐요', 'Merge equivalent states').cap(5, 'DFA 최소화', 'DFA minimization');
  return S;
}
function sPump() {
  const S = scene({ id: 'toc-pump', steps: 5, per: 1.5 });
  const s = 'aaaaabbbbb'.split(''), X = i => 3 + i * 2.2;
  T(S, 'hd', 1, 1, ['L = { aⁿbⁿ } · 상태 p = 5개인 DFA가 있다고 가정', 'L = { aⁿbⁿ } · suppose a DFA with p = 5 states exists'], 'tx-xs tx-a', 1);
  s.forEach((c, i) => box2(S, 'c' + i, X(i), 2.6, 2, 1.8, c, c === 'a' ? 'accent' : 'warn', 1, { pct: 22 }));
  ['q0', 'q1', 'q2', 'q3', 'q4', 'q2'].forEach((q, i) => { stt(S, 'q' + i, X(i) - .1, 6.6, q, i === 2 || i === 5 ? 'danger' : 'ink-3', 2, { r: .8, pct: i === 2 || i === 5 ? 30 : 12 }); if (i) ar(S, 'qa' + i, [X(i - 1) + .75, 6.6], [X(i) - .95, 6.6], 'ink-3', 2, { h: .08 }); });
  T(S, 'pg', X(5) + 1.2, 6.15, ['6번째 상태 = 반복 (비둘기집)', '6th state repeats (pigeonhole)'], 'tx-xs tx-r', 2);
  [['x', 0, 2, 'ink-3'], ['y', 2, 5, 'danger'], ['z', 5, 10, 'warn']].forEach(([l, a, b, c], i) => { frame(S, 'f' + l, X(a) - .1, 2.45, X(b) - X(a) - .0, 2.1, c, 3, { r: .3, w: .14 }); T(S, 'fl' + l, X(a), 4.7, l, 'cz-tc cz-mono tx-s', 3, { w: X(b) - X(a) - .2 }); });
  T(S, 'yl', 1, 8.6, ['y = aaa 는 q2 → q2 고리 · |xy| ≤ p, |y| ≥ 1', 'y = aaa loops q2 → q2 · |xy| ≤ p, |y| ≥ 1'], 'tx-xs tx-r', 3);
  'aaaaaaaabbbbb'.split('').forEach((c, i) => box2(S, 'p' + i, 3 + i * 1.95, 10.2, 1.8, 1.6, c, i >= 5 && i < 8 ? 'danger' : c === 'a' ? 'accent' : 'warn', 4, { pct: i >= 5 && i < 8 ? 40 : 22 }));
  T(S, 'pl', 1, 12.2, ['xy²z = a⁸b⁵ 도 같은 고리를 한 번 더 돌 뿐 → 수락돼요', 'xy²z = a⁸b⁵ just loops once more → accepted'], 'tx-xs', 4); T(S, 'pl2', 1, 13.4, ['하지만 a⁸b⁵ ∉ L → 모순 → L은 정규 언어가 아니에요', 'but a⁸b⁵ ∉ L → contradiction → L is not regular'], 'tx-xs tx-r', 4);
  notes(S, 'n', 15, [['정규라면 상태 p개 DFA가 있어요 · 길이 ≥ p인 s = a⁵b⁵를 골라요', 'if L were regular, some p-state DFA exists · pick s = a⁵b⁵ of length ≥ p'], ['a 다섯 개를 읽는 동안 상태 6개를 지나니 하나는 겹쳐요', 'reading five a’s visits six states, so one must repeat'], ['겹친 구간 y는 고리라서 몇 번이든 반복할 수 있어요', 'the repeated stretch y is a loop that can be pumped any number of times'], ['펌핑한 문자열도 수락되지만 L에 없어요 → 처음 가정이 틀렸어요', 'the pumped string is accepted yet not in L → the assumption was wrong']], 'tx-xs');
  fin(S, 'z', 15, [['정규 언어 = 유한한 기억 → 개수를 셀 수 없어요 (aⁿbⁿ, 괄호 짝 맞추기)', 'regular = finite memory → it can’t count (aⁿbⁿ, balanced parentheses)', 'tx-xs tx-a'], ['스택이 있는 푸시다운 오토마타는 aⁿbⁿ을 인식해요 (문맥 자유 언어)', 'a pushdown automaton with a stack recognizes aⁿbⁿ (context-free)']]);
  S.cap(1, 'aⁿbⁿ을 받는 DFA가 있다고 해 봐요', 'Suppose a DFA accepts aⁿbⁿ').cap(2, '상태가 반복될 수밖에 없어요', 'Some state must repeat').cap(3, '반복 구간 y를 찾았어요', 'The repeated part y is a loop').cap(4, 'y를 늘려도 수락 → 모순', 'Pumping y still accepts → contradiction').cap(5, '정규 언어의 펌핑 보조정리', 'The pumping lemma for regular languages');
  return S;
}
function sClosure() {
  const S = scene({ id: 'toc-closure', steps: 5, per: 1.5 });
  T(S, 'h1', 1, .9, ['M₁: a가 짝수 개', 'M₁: even number of a’s'], 'tx-xs tx-a'); T(S, 'h2', 17.6, .9, ['M₂: b로 끝남', 'M₂: ends with b'], 'tx-xs tx-w');
  stt(S, 'e', 4, 5, 'E', 'accent', 0, { acc: true, start: true }); stt(S, 'o', 11, 5, 'O', 'accent', 0);
  trn(S, 'eo', [4, 5], [11, 5], 'a', 0, { bend: .4 }); trn(S, 'oe', [11, 5], [4, 5], 'a', 0, { bend: .4 }); lp(S, 'el', 4, 5, 'b', 0); lp(S, 'ol', 11, 5, 'b', 0);
  stt(S, 'n', 21, 5, 'N', 'warn', 0, { start: true }); stt(S, 'y', 28, 5, 'Y', 'warn', 0, { acc: true });
  trn(S, 'ny', [21, 5], [28, 5], 'b', 0, { bend: .4 }); trn(S, 'yn', [28, 5], [21, 5], 'a', 0, { bend: .4 }); lp(S, 'nl', 21, 5, 'a', 0); lp(S, 'yl', 28, 5, 'b', 0);
  const Q = { EN: [6, 9.6], EY: [15, 9.6], ON: [6, 15.2], OY: [15, 15.2] };
  Object.entries(Q).forEach(([k, [x, y]]) => { stt(S, 'p' + k, x, y, k[0] + ',' + k[1], 'ink-3', 2, { r: 1.3, start: k === 'EN' }); });
  tsets(S, 'pEY', [[4, 'ok', 45]]); ['pEN', 'pOY'].forEach(k => tsets(S, k, [[5, 'ok', 30]])); tsets(S, 'pEY', [[4, 'ok', 45]]);
  const o = { r: 1.3 };
  trn(S, 'q1', Q.EN, Q.ON, 'a', 3, { ...o, bend: .4 }); trn(S, 'q2', Q.ON, Q.EN, 'a', 3, { ...o, bend: .4 }); trn(S, 'q3', Q.EN, Q.EY, 'b', 3, o); trn(S, 'q4', Q.ON, Q.OY, 'b', 3, { ...o, ld: -.55 });
  trn(S, 'q5', Q.EY, Q.ON, 'a', 3, o); trn(S, 'q6', Q.OY, Q.EN, 'a', 3, { ...o, ld: -.55 }); lp(S, 'q7', 15, 9.6, 'b', 3, o); lp(S, 'q8', 15, 15.2, 'b', 3, { r: 1.3 });
  T(S, 'r1', 19.4, 10, ['∩: 둘 다 수락 → (E,Y)만', '∩: both accept → only (E,Y)'], 'tx-xs tx-g', 4);
  T(S, 'r2', 19.4, 11.4, ['∪: 하나라도 수락 → 3개 상태', '∪: either accepts → 3 states'], 'tx-xs', 5);
  T(S, 'r3', 19.4, 12.8, ['여집합: 수락 상태를 뒤집기', 'complement: flip accepting states'], 'tx-xs', 5);
  notes(S, 'n', 17.6, [['두 정규 언어를 각각 받는 DFA가 있어요', 'two DFAs, each for a regular language'], ['곱 구성: 상태 = (M₁ 상태, M₂ 상태) 쌍', 'product construction: states are pairs (M₁ state, M₂ state)'], ['두 기계를 동시에 한 칸씩 움직여요', 'both machines step together on each symbol'], ['둘 다 수락하는 쌍만 수락 → 교집합도 정규', 'accept pairs where both accept → the intersection is regular']], 'tx-xs');
  fin(S, 'z', 17.6, [['정규 언어는 ∪ · ∩ · 여집합 · 이어 붙이기 · * · 뒤집기에 닫혀 있어요', 'regular languages are closed under ∪, ∩, complement, concatenation, * and reversal', 'tx-xs tx-a'], ['그래서 여러 패턴 조건을 하나의 오토마타로 합쳐 한 번에 검사할 수 있어요', 'so many pattern rules can be merged into one automaton and checked in one pass']]);
  S.cap(1, '두 언어, 두 DFA', 'Two languages, two DFAs').cap(2, '상태를 쌍으로 묶어요', 'Pair up the states').cap(3, '두 기계를 함께 움직여요', 'Run both machines in lockstep').cap(4, '둘 다 수락하면 교집합', 'Both accept: intersection').cap(5, '정규 언어의 닫힘 성질', 'Closure properties');
  return S;
}
function sThompson() {
  const S = scene({ id: 'toc-thompson', steps: 5, per: 1.5 });
  const P = [[2, 9], [5.5, 9], [9, 6.4], [13, 6.4], [9, 11.6], [13, 11.6], [16.5, 9], [20, 9], [24, 9], [28, 9]], r = .9, o = { r };
  const ST = [3, 2, 1, 1, 1, 1, 2, 3, 4, 4];
  P.forEach(([x, y], i) => stt(S, 's' + i, x, y, String(i), i === 9 ? 'ok' : 'ink-3', ST[i], { r, acc: i === 9, start: i === 0, pct: 14 }));
  T(S, 'rx', 1, .9, '( a | b )* a b', 'cz-mono tx-l', 0);
  trn(S, 'ta', P[2], P[3], 'a', 1, o); trn(S, 'tb', P[4], P[5], 'b', 1, o);
  trn(S, 'u1', P[1], P[2], 'ε', 2, o); trn(S, 'u2', P[1], P[4], 'ε', 2, o); trn(S, 'u3', P[3], P[6], 'ε', 2, o); trn(S, 'u4', P[5], P[6], 'ε', 2, o);
  trn(S, 'k1', P[0], P[1], 'ε', 3, o); trn(S, 'k2', P[6], P[7], 'ε', 3, o);
  elb(S, 'kb', [[16.5, 8.1], [16.5, 3.4], [5.5, 3.4], [5.5, 8]], 'warn', 3, { h: .1 }); T(S, 'kbl', 10.4, 2.4, ['ε (다시 반복)', 'ε (repeat)'], 'tx-xs tx-w', 3);
  elb(S, 'ks', [[2, 9.95], [2, 14.4], [20, 14.4], [20, 10]], 'warn', 3, { h: .1 }); T(S, 'ksl', 9.4, 14.6, ['ε (0번 반복)', 'ε (zero times)'], 'tx-xs tx-w', 3);
  trn(S, 'c1', P[7], P[8], 'a', 4, o); trn(S, 'c2', P[8], P[9], 'b', 4, o);
  notes(S, 'n', 16.4, [['기호 하나 = 상태 2개와 화살표 하나', 'one symbol = two states and one arrow'], ['선택 a|b: ε로 두 갈래를 열고 다시 합쳐요', 'union a|b: ε-edges branch out and join again'], ['반복 *: 되돌아가는 ε와 건너뛰는 ε를 더해요', 'star *: add an ε back-edge and an ε skip'], ['이어 붙이기 ab: 조각을 차례로 연결해요', 'concatenation ab: chain the fragments']], 'tx-s');
  fin(S, 'z', 16.4, [['상태 수는 정규식 길이에 비례 · 그다음 부분집합 구성으로 DFA를 만들어요', 'state count grows linearly with the regex · the subset construction then builds a DFA', 'tx-xs tx-a'], ['grep · lex · RE2가 이 방식 · 역참조 \\1 같은 기능은 정규 언어를 벗어나요', 'grep, lex and RE2 work this way · backreferences like \\1 go beyond regular languages']]);
  S.cap(1, '기호마다 작은 조각', 'A tiny fragment per symbol').cap(2, '선택(|)은 ε로 갈라요', 'Union branches with ε').cap(3, '반복(*)은 ε로 되돌아가요', 'Star loops back with ε').cap(4, '이어 붙이면 완성', 'Concatenate to finish').cap(5, '정규식 → NFA (톰슨 구성)', 'Regex to NFA (Thompson’s construction)');
  return S;
}
function sMealy() {
  const S = scene({ id: 'toc-mealy', steps: 5, per: 1.5 });
  T(S, 'h1', 1, .9, ['무어 기계: 신호등', 'Moore machine: traffic light'], 'tx-xs tx-a', 1);
  const L = { G: [4, 5, 'ok'], Y: [12, 5, 'warn'], R: [8, 11.4, 'danger'] };
  Object.entries(L).forEach(([k, [x, y, c]]) => stt(S, 'l' + k, x, y, k, c, 1, { r: 1.3, pct: 40, start: k === 'G' }));
  const o = { r: 1.3 }; trn(S, 'gy', [4, 5], [12, 5], ['타이머', 'timer'], 1, o); trn(S, 'yr', [12, 5], [8, 11.4], ['타이머', 'timer'], 1, { ...o, ld: -.7 }); trn(S, 'rg', [8, 11.4], [4, 5], ['타이머', 'timer'], 1, { ...o, ld: -.7 });
  T(S, 'mo', 1, 13.6, ['출력 = 상태 그 자체 (불빛 색)', 'output = the state itself (the light)'], 'tx-xs', 2);
  frame(S, 'cy', 1.6, 2.6, 13, 10.6, 'accent', 2, { dash: 1, r: .8 });
  T(S, 'h2', 17.4, .9, ['밀리 기계: 자판기 (음료 1,000원)', 'Mealy machine: vending (drink costs 1,000)'], 'tx-xs tx-w', 3);
  stt(S, 'v0', 20, 6, '0', 'ink-3', 3, { r: 1.4, start: true, pct: 20 }); stt(S, 'v5', 28, 6, '500', 'ink-3', 3, { r: 1.4, pct: 20 });
  trn(S, 'v1', [20, 6], [28, 6], ['500 / –', '500 / –'], 3, { r: 1.4, bend: .5, ld: .6 }); trn(S, 'v2', [28, 6], [20, 6], ['500 / 음료', '500 / drink'], 3, { r: 1.4, bend: .5, ld: .6, lc: 'tx-g' });
  trn(S, 'v3', [28, 6], [20, 6], ['반환 / 500', 'refund / 500'], 3, { r: 1.4, bend: -1.9, ld: -.6 });
  T(S, 'run', 17.4, 11.6, ['입력 500, 500 →', 'input 500, 500 →'], 'tx-xs', 4); T(S, 'run2', 23, 11.6, ['출력 –, 음료', 'output –, drink'], 'tx-xs tx-g', 4);
  tsets(S, 'v5', [[4, 'warn', 35]]);
  notes(S, 'n', 15.2, [['무어 기계: 상태마다 출력이 정해져 있어요', 'Moore: each state has a fixed output'], ['타이머가 울릴 때마다 초록 → 노랑 → 빨강을 돌아요', 'each timer tick cycles green → yellow → red'], ['밀리 기계: 출력이 전이(입력 / 출력)에 붙어 있어요', 'Mealy: outputs ride on transitions (input / output)'], ['500원 두 번이면 두 번째 전이에서 음료가 나와요', 'two 500 coins: the second transition outputs a drink']], 'tx-s');
  fin(S, 'z', 15.2, [['둘은 표현력이 같고, 밀리 쪽이 상태 수가 적고 반응이 한 박자 빨라요', 'both are equally expressive; Mealy needs fewer states and reacts one step sooner', 'tx-xs tx-a'], ['디지털 회로의 제어기, 통신 프로토콜, 게임 AI, UI 상태 관리(XState)에 써요', 'used in circuit controllers, protocols, game AI and UI state machines (XState)']]);
  S.cap(1, '출력이 있는 유한 상태 기계', 'Finite-state machines with output').cap(2, '무어: 상태가 출력', 'Moore: the state is the output').cap(3, '밀리: 전이가 출력', 'Mealy: transitions produce output').cap(4, '입력열을 출력열로 바꿔요', 'Input sequence in, output sequence out').cap(5, '무어 기계와 밀리 기계', 'Moore and Mealy machines');
  return S;
}
function sAmbig() {
  const S = scene({ id: 'toc-ambig', steps: 5, per: 1.5 });
  T(S, 'g', 1, .9, 'E → E + E | E * E | num', 'cz-mono tx-s tx-a', 1); T(S, 'w', 20, .9, ['입력: 1 + 2 * 3', 'input: 1 + 2 * 3'], 'cz-mono tx-s', 1);
  const tree = (pfx, st, N, E, c) => { E.forEach(([a, b], i) => seg(S, pfx + 'e' + i, N[a].slice(1), N[b].slice(1), st, 'ink-3', .1)); Object.entries(N).forEach(([k, [l, x, y]]) => stt(S, pfx + k, x, y, l, c, st, { r: .9, pct: 18 })); };
  tree('a', 2, { m: ['*', 7.5, 4.4], p: ['+', 4.5, 7.4], n3: ['3', 10.5, 7.4], n1: ['1', 2.5, 10.4], n2: ['2', 6.5, 10.4] }, [['m', 'p'], ['m', 'n3'], ['p', 'n1'], ['p', 'n2']], 'warn');
  T(S, 'av', 1.5, 12, '(1 + 2) * 3 = 9', 'cz-mono tx-s tx-r', 2);
  tree('b', 3, { p: ['+', 23, 4.4], n1: ['1', 20, 7.4], m: ['*', 26, 7.4], n2: ['2', 24, 10.4], n3: ['3', 28, 10.4] }, [['p', 'n1'], ['p', 'm'], ['m', 'n2'], ['m', 'n3']], 'ok');
  T(S, 'bv', 19.5, 12, '1 + (2 * 3) = 7', 'cz-mono tx-s tx-g', 3);
  T(S, 'x', 13.2, 7, ['같은 문자열,', 'same string,'], 'tx-xs tx-r', 3); T(S, 'x2', 13.2, 8.1, ['다른 트리', 'two trees'], 'tx-xs tx-r', 3);
  ['E → E + T | T', 'T → T * F | F', 'F → num | ( E )'].forEach((l, i) => T(S, 'f' + i, 1, 13.6 + i * 1.1, l, 'cz-mono tx-xs tx-g', 4));
  T(S, 'fn', 12, 14.7, ['층을 나눠 * 가 + 보다 먼저 묶이게 → 트리가 하나뿐', 'layers make * bind tighter than + → only one tree'], 'tx-xs', 4);
  notes(S, 'n', 17.4, [['이 문법으로 1 + 2 * 3 을 파싱해 봐요', 'parse 1 + 2 * 3 with this grammar'], ['+ 를 먼저 묶으면 9', 'grouping + first gives 9'], ['* 를 먼저 묶어도 문법에 맞아요 → 7 · 모호한 문법', '* first is also valid → 7 · the grammar is ambiguous'], ['우선순위별로 비단말을 나누면 모호성이 사라져요', 'splitting nonterminals by precedence removes the ambiguity']], 'tx-xs');
  fin(S, 'z', 17.4, [['유명한 예: if-else가 어느 if에 붙는지 (dangling else) → “가장 가까운 if”로 정해요', 'classic case: which if an else belongs to (dangling else) → the nearest one wins', 'tx-xs tx-a'], ['yacc·bison은 %left · %right 우선순위 선언으로 모호성을 풀어요', 'yacc and bison resolve ambiguity with %left and %right precedence declarations']]);
  S.cap(1, '모호할 수 있는 문법', 'A grammar that may be ambiguous').cap(2, '첫 번째 파스 트리', 'One parse tree').cap(3, '두 번째 파스 트리', 'Another parse tree').cap(4, '우선순위로 문법을 고쳐요', 'Fix it with precedence levels').cap(5, '모호한 문법', 'Ambiguous grammars');
  return S;
}
function sCyk() {
  const S = scene({ id: 'toc-cyk', steps: 5, per: 1.5 });
  const W = 'baaba'.split(''), cx = (j, n) => 1 + j * 4.8 + (n - 1) * 2.4, cy = n => 13 - (n - 1) * 2.2;
  W.forEach((c, j) => T(S, 'w' + j, cx(j, 1), 15.3, c, 'cz-tc cz-mono tx-s', 0, { w: 4.6 }));
  const TB = { 1: ['B', 'A,C', 'A,C', 'B', 'A,C'], 2: ['S,A', 'B', 'S,C', 'S,A'], 3: ['∅', 'B', 'B'], 4: ['∅', 'S,C,A'], 5: ['S,A,C'] }, STP = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 4 };
  Object.entries(TB).forEach(([n, row]) => row.forEach((v, j) => { const top = +n === 5; box2(S, `t${n}_${j}`, cx(j, +n), cy(+n), 4.6, 1.9, v, top ? 'ok' : v === '∅' ? 'line' : 'accent', STP[n], { pct: top ? 45 : v === '∅' ? 40 : 20 }); }));
  ['S → AB | BC', 'A → BA | a', 'B → CC | b', 'C → AB | a'].forEach((l, i) => T(S, 'g' + i, 26.4, 1.6 + i * 1.2, l, 'cz-mono tx-xs tx-a', 0));
  T(S, 'ex', 1, 1, ['칸 (i, 길이) = 그 부분 문자열을 만들 수 있는 비단말들', 'cell (i, length) = nonterminals that derive that substring'], 'tx-xs', 2);
  T(S, 'ex2', 1, 2.2, ['예: “aa” = C·C → B', 'e.g. “aa” = C·C → B'], 'cz-mono tx-xs tx-a', 2, { off: 3 });
  T(S, 'ex3', 1, 2.2, ['길이 3: 자르는 위치 2곳을 모두 조합', 'length 3: try both split points'], 'tx-xs tx-a', 3, { off: 4 });
  T(S, 'ok', 13, 3.4, ['맨 위에 S → 수락 ✓', 'S at the top → accepted ✓'], 'tx-s tx-g', 4);
  notes(S, 'n', 17.4, [['촘스키 정규형 문법: 규칙이 A → BC 또는 A → a 뿐', 'Chomsky normal form: every rule is A → BC or A → a'], ['길이 2 부분 문자열마다 두 칸을 조합해요', 'each length-2 substring combines two cells'], ['길이가 길수록 아래 칸들을 모든 위치에서 잘라 조합해요', 'longer substrings combine lower cells at every split'], ['전체 문자열 칸에 S가 있으면 문법이 만들 수 있는 문자열', 'if S is in the full-string cell, the grammar derives the string']], 'tx-xs');
  fin(S, 'z', 17.4, [['CYK = 동적 계획법 · O(n³ · |문법|) 로 모든 문맥 자유 언어를 판정해요', 'CYK is dynamic programming · decides any context-free language in O(n³ · |G|)', 'tx-xs tx-a'], ['확률 버전(PCFG)은 자연어 문장의 가장 그럴듯한 구문 트리를 찾는 데 써요', 'its probabilistic version (PCFG) finds the most likely parse of natural-language sentences']]);
  S.cap(1, '글자 하나씩: 맨 아래 줄', 'One letter at a time: the bottom row').cap(2, '길이 2 부분 문자열', 'Substrings of length 2').cap(3, '길이 3: 모든 자르기 시도', 'Length 3: try every split').cap(4, '맨 위 칸에 S가 있나?', 'Is S in the top cell?').cap(5, 'CYK 알고리즘', 'The CYK algorithm');
  return S;
}

/* ================= computability extras ================= */
function sUtm() {
  const S = scene({ id: 'toc-utm', steps: 5, per: 1.5 });
  T(S, 'mh', 1, .9, ['기계 M의 규칙표', 'machine M’s rule table'], 'tx-xs tx-a', 1);
  ['q0, 0 → q0, 1, R', 'q0, 1 → q1, 1, R', 'q1, _ → halt'].forEach((l, i) => T(S, 'mr' + i, 1, 2.1 + i * 1.1, l, 'cz-mono tx-xs', 1));
  T(S, 'eh', 14, .9, ['규칙을 0과 1로 적으면 그냥 문자열 ⟨M⟩', 'written in 0s and 1s, the rules are just a string ⟨M⟩'], 'tx-xs tx-w', 2);
  '010110100110111010'.split('').forEach((b, i) => box2(S, 'e' + i, 14 + i * .95, 2.2, .85, 1.3, b, 'warn', 2, { pct: 25 }));
  T(S, 'uh', 1, 6.4, ['범용 튜링 기계 U의 테이프', 'tape of the universal machine U'], 'tx-xs', 3);
  for (let i = 0; i < 12; i++) box2(S, 'um' + i, 1 + i * 1.3, 7.6, 1.2, 1.6, '01101001011'[i] || '1', 'warn', 3, { pct: 25 });
  box2(S, 'sh', 16.6, 7.6, 1.2, 1.6, '#', 'ink-3', 3, { pct: 30 });
  '0011'.split('').forEach((b, i) => box2(S, 'uw' + i, 18.2 + i * 1.3, 7.6, 1.2, 1.6, b, 'ok', 3, { pct: 30 }));
  T(S, 'ul1', 1, 9.5, '⟨M⟩', 'cz-tc cz-mono tx-s tx-w', 3, { w: 15.4 }); T(S, 'ul2', 18.2, 9.5, 'w', 'cz-tc cz-mono tx-s tx-g', 3, { w: 5.1 });
  rect(S, 'hd', 1.25, 6.9, .7, .6, 'accent', 80, 3, { r: .1 }); S.move('hd', 4, 18.45, 6.9);
  T(S, 'um1', 1, 11, ['① 테이프의 ⟨M⟩에서 지금 상태·기호에 맞는 규칙을 찾고', '① look up the matching rule in ⟨M⟩'], 'tx-xs', 4); T(S, 'um2', 1, 12.1, ['② w 쪽으로 가서 그 규칙대로 쓰고 움직여요', '② go to w and apply it, step by step'], 'tx-xs', 4);
  notes(S, 'n', 14.6, [['튜링 기계 M은 규칙표 하나로 정해져요', 'a Turing machine M is just a rule table'], ['규칙표도 0과 1의 문자열로 적을 수 있어요', 'the table itself can be written as a string of 0s and 1s'], ['U는 ⟨M⟩과 입력 w를 함께 받아요', 'U takes both ⟨M⟩ and an input w'], ['U는 M이 할 일을 그대로 흉내 내요 → 프로그램도 데이터', 'U simulates M step by step → programs are data']], 'tx-s');
  fin(S, 'z', 14.6, [['처치–튜링 논제: 알고리즘으로 계산할 수 있는 것 = 튜링 기계로 계산할 수 있는 것', 'Church–Turing thesis: anything an algorithm can compute, a Turing machine can', 'tx-xs tx-a'], ['프로그램을 메모리에 넣고 실행하는 오늘날 컴퓨터(폰 노이만 구조)의 이론적 원형', 'the theoretical blueprint for stored-program (von Neumann) computers'], ['람다 계산 · 파이썬 · C · 엑셀 수식까지, 튜링 완전한 것들은 서로 흉내 낼 수 있어요', 'lambda calculus, Python, C, even spreadsheet formulas: Turing-complete systems simulate each other']]);
  S.cap(1, '튜링 기계 = 규칙표', 'A Turing machine is a rule table').cap(2, '규칙표를 문자열로', 'Encode the table as a string').cap(3, '기계와 입력을 한 테이프에', 'Machine and input on one tape').cap(4, '범용 기계가 흉내 내요', 'The universal machine simulates it').cap(5, '범용 튜링 기계와 처치–튜링 논제', 'Universal machines and the Church–Turing thesis');
  return S;
}
function sDiag() {
  const S = scene({ id: 'toc-diag', steps: 5, per: 1.5 });
  const B = ['01101100', '11010011', '00111010', '10100110', '01011001', '11100101'], X = j => 6 + j * 2, Y = i => 2.2 + i * 1.6;
  B.forEach((r, i) => { T(S, 'rl' + i, 1, Y(i) + .25, 's' + (i + 1), 'cz-mono tx-xs', 1); T(S, 'dots' + i, X(8) + .2, Y(i) + .25, '…', 'tx-xs', 1);
    r.split('').forEach((b, j) => { const k = `b${i}_${j}`; box2(S, k, X(j), Y(i), 1.8, 1.4, b, i === j ? 'warn' : 'line', 1, { pct: i === j ? 22 : 40 }); if (i === j) tsets(S, k, [[2, 'warn', 55]]); }); });
  T(S, 'more', X(0) + .55, Y(6) - .5, '⋮', 'tx-s', 1);
  T(S, 'dl', 1, 13.2, 'd', 'cz-mono tx-s tx-r', 3);
  B.forEach((r, j) => { const f = r[j] === '0' ? '1' : '0'; box2(S, 'd' + j, X(j), 13.0, 1.8, 1.4, f, 'danger', 3, { pct: 40 }); });
  T(S, 'dd', X(6) + .4, 13.25, ['대각선을 뒤집은 수열', 'the flipped diagonal'], 'tx-xs tx-r', 3);
  T(S, 'cmp', 23.4, 3, ['d ≠ s1 (1번째 자리)', 'd ≠ s1 (digit 1)'], 'tx-xs tx-r', 4); T(S, 'cmp2', 23.4, 4.2, ['d ≠ s2 (2번째 자리)', 'd ≠ s2 (digit 2)'], 'tx-xs tx-r', 4); T(S, 'cmp3', 23.4, 5.4, ['… d는 어느 줄과도 달라요', '… d differs from every row'], 'tx-xs tx-r', 4);
  T(S, 'cmp4', 23.4, 7, ['→ 목록에 없음: 셀 수 없음', '→ not listed: uncountable'], 'tx-xs tx-g', 4);
  notes(S, 'n', 14.6, [['무한 0/1 수열을 빠짐없이 한 줄씩 나열했다고 가정해요', 'suppose every infinite 0/1 sequence is listed, one per row'], ['대각선 자리(i번째 줄의 i번째 숫자)를 봐요', 'look at the diagonal: digit i of row i'], ['대각선을 모두 뒤집은 새 수열 d를 만들어요', 'build d by flipping every diagonal digit'], ['d는 i번째 줄과 i번째 자리에서 달라서 목록 어디에도 없어요', 'd differs from row i at digit i, so it is nowhere in the list']], 'tx-s');
  fin(S, 'z', 14.6, [['칸토어(1891): 실수는 자연수보다 “더 많다”', 'Cantor (1891): there are “more” reals than natural numbers', 'tx-xs tx-a'], ['프로그램은 유한 문자열이라 셀 수 있지만 언어(Σ*의 부분집합)는 셀 수 없어요', 'programs are finite strings and countable, but languages (subsets of Σ*) are not'], ['→ 어떤 프로그램으로도 인식할 수 없는 언어가 반드시 있어요 · 정지 문제 증명도 같은 생각', '→ some languages no program can recognize · the halting proof uses the same idea', 'tx-xs tx-r']]);
  S.cap(1, '모든 수열을 나열했다면', 'If every sequence were listed').cap(2, '대각선을 봐요', 'Look along the diagonal').cap(3, '대각선을 뒤집어요', 'Flip the diagonal').cap(4, '목록에 없는 수열', 'A sequence missing from the list').cap(5, '대각선 논법', 'The diagonal argument');
  return S;
}
function sReduce() {
  const S = scene({ id: 'toc-reduce', steps: 5, per: 1.5 });
  box2(S, 'x', 1, 3, 5.6, 2.2, ['A의 입력 x', 'instance x of A'], 'ink-3', 1, { pct: 20 }); ar(S, 'a1', [6.7, 4.1], [8.9, 4.1], 'ink-3', 1, { h: .12 });
  box2(S, 'f', 9, 3, 5, 2.2, ['변환 f', 'transform f'], 'accent', 1, { pct: 30 }); ar(S, 'a2', [14.1, 4.1], [16.3, 4.1], 'ink-3', 1, { h: .12 });
  box2(S, 'fx', 16.4, 3, 5.4, 2.2, ['B의 입력 f(x)', 'instance f(x) of B'], 'ink-3', 1, { pct: 20 }); ar(S, 'a3', [21.9, 4.1], [23.5, 4.1], 'ink-3', 1, { h: .12 });
  box2(S, 'b', 23.6, 3, 7.4, 2.2, ['B를 푸는 기계', 'solver for B'], 'warn', 2, { pct: 30 }); frame(S, 'wrap', .6, 2.2, 30.8, 3.8, 'ok', 2, { dash: 1, r: .5 });
  T(S, 'wl', 1, 6.3, ['전체 = A를 푸는 기계 · “x ∈ A ⇔ f(x) ∈ B”', 'the whole = a solver for A · “x ∈ A ⇔ f(x) ∈ B”'], 'tx-xs tx-g', 2);
  T(S, 'c1', 1, 8, ['B를 풀 수 있으면 → A도 풀 수 있어요', 'if B is solvable → so is A'], 'tx-s', 2);
  T(S, 'c2', 1, 9.4, ['A를 못 풀면 → B도 못 풀어요 (대우)', 'if A is unsolvable → so is B (contrapositive)'], 'tx-s tx-r', 3);
  code(S, 'p', 1, 11, 18, ['def P_prime(input):', ['    M(w)            # M이 w에서 멈추면…', '    M(w)            # if M halts on w…'], '    print("hello")'], [], { st: 4 });
  T(S, 'pe', 20, 11.4, ['P′가 hello를 출력', 'P′ prints hello'], 'tx-xs', 4); T(S, 'pe2', 20, 12.5, ['⇔ M이 w에서 멈춤', '⇔ M halts on w'], 'tx-xs tx-r', 4);
  T(S, 'pe3', 20, 13.8, ['→ “hello 출력 판정”도 불가능', '→ “prints hello?” is undecidable too'], 'tx-xs tx-r', 4);
  notes(S, 'n', 15.8, [['문제 A의 입력을 문제 B의 입력으로 바꾸는 계산 f가 있어요', 'a computable f turns instances of A into instances of B'], ['B의 해법에 f를 붙이면 A의 해법이 돼요 (A ≤ B)', 'plug f in front of a B-solver and you solve A (A ≤ B)'], ['정지 문제처럼 못 푸는 A에서 B로 환원되면 B도 못 풀어요', 'reduce an unsolvable A (like halting) to B, and B is unsolvable too'], ['예: “이 프로그램이 hello를 출력할까?”도 결정 불가능', 'e.g. “does this program print hello?” is undecidable']], 'tx-s');
  fin(S, 'z', 15.8, [['환원은 “B가 A만큼은 어렵다”를 보이는 도구예요', 'a reduction shows “B is at least as hard as A”', 'tx-xs tx-a'], ['f를 다항 시간으로 제한하면 NP-완전성 증명에 그대로 쓰여요', 'restrict f to polynomial time and it proves NP-completeness']]);
  S.cap(1, 'A의 입력을 B의 입력으로 바꿔요', 'Turn instances of A into instances of B').cap(2, 'B를 풀면 A도 풀려요', 'Solve B, solve A').cap(3, '거꾸로: A가 불가능하면 B도', 'Conversely: A impossible means B impossible').cap(4, '정지 문제에서 환원하기', 'Reducing from the halting problem').cap(5, '환원', 'Reductions');
  return S;
}
function sRice() {
  const S = scene({ id: 'toc-rice', steps: 5, per: 1.5 });
  frame(S, 'u', 1, 1.6, 18, 11.6, 'ink-3', 1, { r: .8, w: .12 }); T(S, 'ul', 1.4, 1.9, ['모든 프로그램', 'all programs'], 'tx-xs', 1);
  const P = []; for (let i = 0; i < 26; i++) P.push([2.2 + rnd() * 15.6, 3.2 + rnd() * 9]);
  P.forEach(([x, y], i) => { const has = x + (y - 7) * .4 < 10; pt(S, 'p' + i, x, y, 1, C.idle, .32); S.set('p' + i, 2, has ? C.okf : C.idle); });
  seg(S, 'cut', [11.8, 1.8], [8, 13], 2, 'ok', .1, { dash: 1 });
  T(S, 'yes', 2.2, 12, ['성질 있음', 'has property'], 'tx-xs tx-g', 2); T(S, 'no', 12.6, 12, ['성질 없음', 'lacks it'], 'tx-xs', 2);
  T(S, 'pr', 20, 2, ['성질 예: “빈 문자열을 받는가?”', 'property: “accepts the empty string?”'], 'tx-xs tx-a', 2);
  T(S, 'pr2', 20, 3.2, ['· 같은 동작이면 같은 쪽', '· same behavior, same side'], 'tx-xs', 2);
  T(S, 'nt', 20, 5, ['자명하지 않음: 양쪽 다 비어 있지 않아요', 'nontrivial: neither side is empty'], 'tx-xs', 3);
  T(S, 'th', 20, 6.8, ['→ 판정하는 알고리즘은 없어요 ✗', '→ no algorithm decides it ✗'], 'tx-s tx-r', 4);
  T(S, 'sy', 20, 8.6, ['반면 코드 모양(문법적 성질)은 판정 가능 ✓', 'but syntactic properties are decidable ✓'], 'tx-xs tx-g', 4); T(S, 'sy2', 20, 9.8, ['예: “100줄이 넘나?” · “변수 x를 쓰나?”', 'e.g. “over 100 lines?” · “uses variable x?”'], 'tx-xs', 4);
  notes(S, 'n', 14.6, [['세상의 모든 프로그램을 점으로 찍어 봐요', 'picture every program as a dot'], ['프로그램이 “무엇을 하는가”에 대한 성질로 둘로 나눠요', 'split them by a property of what they do (their language)'], ['양쪽 모두에 프로그램이 있으면 자명하지 않은 성질이에요', 'if both sides are inhabited, the property is nontrivial'], ['라이스 정리: 그런 성질은 모두 결정 불가능해요', 'Rice’s theorem: every such property is undecidable']], 'tx-s');
  fin(S, 'z', 14.6, [['“이 코드는 바이러스인가?”, “항상 멈추나?”, “두 함수가 같은 일을 하나?” 모두 완벽한 판정 불가', '“is it a virus?”, “does it always halt?”, “do two functions do the same?”: none perfectly decidable', 'tx-xs tx-r'], ['그래서 정적 분석·백신은 근삿값: 놓치거나(미탐) 잘못 경고(오탐)하는 쪽을 골라요', 'so static analyzers and antivirus approximate, trading misses against false alarms', 'tx-xs tx-a']]);
  S.cap(1, '모든 프로그램의 집합', 'The set of all programs').cap(2, '동작에 관한 성질로 나눠요', 'Split by a behavioral property').cap(3, '양쪽 다 있으면 자명하지 않아요', 'Both sides inhabited: nontrivial').cap(4, '결정 불가능', 'Undecidable').cap(5, '라이스 정리', 'Rice’s theorem');
  return S;
}
function sDecid() {
  const S = scene({ id: 'toc-decid', steps: 5, per: 1.5 });
  const R = [[1, 1.2, 30, 13.6, 'ink-3', ['모든 언어', 'all languages'], 5], [2.4, 2.6, 23, 10.8, 'danger', ['인식 가능 (RE)', 'recognizable (RE)'], 4], [3.8, 4, 16.4, 8, 'warn', ['결정 가능', 'decidable'], 3], [5.2, 5.4, 10.4, 5.2, 'accent', ['문맥 자유', 'context-free'], 2], [6.6, 6.8, 5, 2.6, 'ok', ['정규', 'regular'], 1]];
  R.forEach(([x, y, w, h, c, l, st], i) => { rect(S, 'r' + i, x, y, w, h, c, 8, st, { r: .8, css: `border:.12em solid var(--${c})` }); T(S, 'rl' + i, x + .4, y + .25, l, 'tx-xs tx-' + ({ 'ink-3': 'a', danger: 'r', warn: 'w', accent: 'a', ok: 'g' })[c], st); });
  [['a*b*', 7, 8, 1], ['aⁿbⁿ', 12, 8, 2], ['aⁿbⁿcⁿ', 17, 8, 3], [['정지 문제 HALT', 'HALT'], 21, 9.5, 4], [['HALT의 여집합', 'complement of HALT'], 25.5, 12.6, 5]].forEach(([t, x, y, st], i) => T(S, 'ex' + i, x, y, t, 'cz-mono tx-xs', st));
  T(S, 'k', 1, 15.4, ['결정 가능 = 인식 가능 ∩ 여집합도 인식 가능', 'decidable = recognizable ∩ co-recognizable'], 'tx-xs tx-a', 4);
  notes(S, 'n', 16.8, [['정규 언어: 유한 오토마타로 판정 (a*b*)', 'regular: decided by finite automata (a*b*)'], ['문맥 자유: 스택이 있는 오토마타 (aⁿbⁿ)', 'context-free: automata with a stack (aⁿbⁿ)'], ['결정 가능: 항상 멈추며 예·아니오를 내는 튜링 기계 (aⁿbⁿcⁿ)', 'decidable: a Turing machine that always halts with yes or no (aⁿbⁿcⁿ)'], ['인식 가능: “예”면 언젠가 멈추지만 “아니오”면 영원히 돌 수도 (HALT)', 'recognizable: halts on “yes”, may run forever on “no” (HALT)']], 'tx-xs');
  fin(S, 'z', 16.8, [['HALT의 여집합은 인식조차 불가능 · 세상 대부분의 언어가 그 바깥에 있어요', 'the complement of HALT isn’t even recognizable · most languages lie out there', 'tx-xs tx-r'], ['포함 관계는 모두 진부분집합이에요: 각 경계 사이에 예가 있어요', 'every inclusion is strict: each ring has an example the inner one lacks']]);
  S.cap(1, '정규 언어', 'Regular languages').cap(2, '문맥 자유 언어', 'Context-free languages').cap(3, '결정 가능한 언어', 'Decidable languages').cap(4, '인식 가능한 언어', 'Recognizable languages').cap(5, '언어의 계층', 'The hierarchy of languages');
  return S;
}
function sLambda() {
  const S = scene({ id: 'toc-lambda', steps: 5, per: 1.5 });
  T(S, 's1', 1, 1, ['문법은 세 가지뿐', 'only three forms'], 'tx-xs tx-a', 1);
  [['x', ['변수', 'variable']], ['λx. M', ['함수 만들기 (추상화)', 'make a function (abstraction)']], ['M N', ['함수 적용', 'apply a function']]].forEach(([e, d], i) => { T(S, 'g' + i, 1, 2.2 + i * 1.2, e, 'cz-mono tx-s', 1); T(S, 'gd' + i, 6.6, 2.3 + i * 1.2, d, 'tx-xs', 1); });
  const ROW = (k, y, parts, st) => { let x = 1; parts.forEach(([t, c], i) => { T(S, k + i, x, y, t, 'cz-mono tx-s ' + (c || ''), st); x += t.length * .4 + .25; }); };
  ROW('r1', 6.4, [['(λx. x × x)', 'tx-a'], ['3', 'tx-w']], 2); T(S, 'r1n', 14, 6.5, ['x 자리에 3을 넣어요 (베타 축약)', 'substitute 3 for x (beta reduction)'], 'tx-xs', 2);
  ROW('r2', 7.6, [['→ 3 × 3', ''], ['→ 9', 'tx-g']], 2);
  ROW('r3', 9.4, [['(λx. λy. x + y)', 'tx-a'], ['2', 'tx-w'], ['5', 'tx-w']], 3); T(S, 'r3n', 18, 9.5, ['인자를 하나씩 (커링)', 'one argument at a time (currying)'], 'tx-xs', 3);
  ROW('r4', 10.6, [['→ (λy. 2 + y) 5', ''], ['→ 7', 'tx-g']], 3);
  T(S, 'c0', 1, 12.4, ['숫자도 함수로: ', 'numbers as functions: '], 'tx-xs', 4); T(S, 'c1', 7.4, 12.3, '2 = λf. λx. f (f x)', 'cz-mono tx-s tx-a', 4);
  T(S, 'c2', 1, 13.6, ['참·거짓도: TRUE = λa. λb. a · 재귀는 Y 조합자로', 'booleans too: TRUE = λa. λb. a · recursion via the Y combinator'], 'tx-xs', 4);
  notes(S, 'n', 15.4, [['람다 계산: 변수·함수 만들기·함수 적용만으로 된 계산 모델 (처치, 1936)', 'lambda calculus: a model of computation with only variables, functions and application (Church, 1936)'], ['계산 = 인자를 몸통에 대입하는 일의 반복', 'computing is repeatedly substituting arguments into bodies'], ['여러 인자 함수는 함수를 돌려주는 함수로 (커링)', 'multi-argument functions return functions (currying)'], ['숫자·참거짓·재귀까지 함수로 만들 수 있어 튜링 기계와 같은 힘', 'numbers, booleans and recursion are all functions: as powerful as Turing machines']], 'tx-xs');
  fin(S, 'z', 15.4, [['Lisp · Haskell · OCaml 같은 함수형 언어의 뿌리', 'the root of functional languages such as Lisp, Haskell and OCaml', 'tx-xs tx-a'], ['JS의 x => x * x, 파이썬의 lambda, 클로저가 모두 여기서 왔어요', 'JS arrow functions, Python’s lambda and closures all come from here']]);
  S.cap(1, '람다 계산의 문법', 'The syntax of lambda calculus').cap(2, '대입하면서 계산해요', 'Compute by substitution').cap(3, '인자를 하나씩 받기', 'Take arguments one at a time').cap(4, '숫자도 함수로', 'Even numbers are functions').cap(5, '람다 계산', 'Lambda calculus');
  return S;
}

/* ================= complexity extras ================= */
function sNpc() {
  const S = scene({ id: 'toc-npc', steps: 5, per: 1.5 });
  rect(S, 'np', 1, 2, 13, 10, 'accent', 8, 1, { r: 5, css: 'border:.12em solid var(--accent)' }); T(S, 'npl', 1.8, 2.6, 'NP', 'cz-mono tx-s tx-a', 1);
  rect(S, 'p', 2.2, 6.4, 6, 4.6, 'ok', 15, 1, { r: 2.3, css: 'border:.12em solid var(--ok)' }); T(S, 'pl', 2.6, 8.2, ['P (정렬, 최단 경로)', 'P (sorting, paths)'], 'tx-xs tx-g', 1);
  rect(S, 'nh', 9.6, 1.4, 21.4, 11.2, 'danger', 6, 2, { r: 5.6, css: 'border:.12em dashed var(--danger)' }); T(S, 'nhl', 22, 2.2, 'NP-hard', 'cz-mono tx-s tx-r', 2);
  rect(S, 'npc', 9.6, 3.4, 4.4, 7.2, 'warn', 30, 2, { r: 2.2 }); T(S, 'npcl', 9.6, 6.4, 'NPC', 'cz-tc cz-mono tx-s tx-w', 2, { w: 4.4 });
  T(S, 'v', 1, 13.2, ['NP: 답 확인은 빠름 (스도쿠 정답 검사)', 'NP: answers are quick to check (a sudoku)'], 'tx-xs tx-a', 1);
  const N = { sat: ['SAT', 16, 4.2, 3], s3: ['3-SAT', 16, 7.4, 4], col: ['3-COLOR', 16, 10.6, 4], cl: ['CLIQUE', 22, 4.2, 4], vc: ['VERTEX COVER', 22, 7.4, 4], hc: ['HAM-CYCLE', 22, 10.6, 4], ss: ['SUBSET-SUM', 27, 4.2, 4], tsp: ['TSP', 27.4, 10.6, 4] };
  Object.entries(N).forEach(([k, [l, x, y, st]]) => box2(S, k, x, y, k === 'vc' ? 4.6 : k === 'ss' ? 4 : 3.6, 1.4, l, 'warn', st, { pct: k === 'sat' ? 45 : 25 }));
  [['sat', 's3'], ['s3', 'cl'], ['s3', 'vc'], ['s3', 'col'], ['vc', 'hc'], ['hc', 'tsp'], ['vc', 'ss']].forEach(([a, b], i) => { const A = N[a], B = N[b]; ar(S, 'e' + i, [A[1] + 1.8, A[2] + 1.45], [B[1] + 1.6, B[2] - .05], 'ink-3', 4, { h: .08 }); });
  T(S, 'ck', 15.4, 13.4, ['쿡–레빈 정리 (1971): SAT가 첫 NP-완전 문제', 'Cook–Levin (1971): SAT is the first NP-complete problem'], 'tx-xs tx-w', 3);
  notes(S, 'n', 15, [['NP: 정답 후보가 맞는지는 다항 시간에 확인할 수 있는 문제들', 'NP: problems whose proposed solutions can be verified in polynomial time'], ['NP-hard: 모든 NP 문제가 다항 시간에 환원되는 문제 · NP-완전 = NP ∩ NP-hard', 'NP-hard: every NP problem reduces to it · NP-complete = NP ∩ NP-hard'], ['SAT가 NP-완전임이 먼저 증명됐어요', 'SAT was the first problem proven NP-complete'], ['그다음은 SAT에서 환원해 하나씩 늘었어요 (카프의 21개 문제)', 'others followed by reduction from SAT (Karp’s 21 problems)']], 'tx-xs');
  fin(S, 'z', 15, [['NP-완전 하나라도 다항 시간에 풀리면 P = NP · 아직 아무도 몰라요 (밀레니엄 문제)', 'solve any NP-complete problem in polynomial time and P = NP · still open (a Millennium Prize problem)', 'tx-xs tx-r'], ['실무에선 근사 알고리즘, 휴리스틱, SAT·ILP 솔버로 큰 실제 문제를 풀어요', 'in practice, approximation, heuristics and SAT/ILP solvers handle large real instances', 'tx-xs tx-a']]);
  S.cap(1, 'NP: 검증은 빠른 문제들', 'NP: quick to verify').cap(2, 'NP-hard와 NP-완전', 'NP-hard and NP-complete').cap(3, '첫 NP-완전 문제: SAT', 'The first NP-complete problem: SAT').cap(4, '환원으로 이어진 문제들', 'A web of reductions').cap(5, 'NP-완전성', 'NP-completeness');
  return S;
}
function sSat() {
  const S = scene({ id: 'toc-sat', steps: 5, per: 1.5 });
  const CL = ['x ∨ y', '¬x ∨ z', '¬y ∨ ¬z', '¬x ∨ y'];
  CL.forEach((c, i) => { box2(S, 'c' + i, 1 + i * 7.6, 1.4, 7, 1.6, c, 'line', 1, { pct: 40 }); });
  tsets(S, 'c2', [[3, 'danger', 40], [4, 'ok', 35]]); [0, 1, 3].forEach(i => tsets(S, 'c' + i, [[2, 'ok', 30], [3, 'line', 40], [4, 'ok', 35]]));
  T(S, 'f', 1, .3, ['CNF: 절(괄호)들이 모두 참이 되는 값이 있을까?', 'CNF: is there an assignment making every clause true?'], 'tx-xs', 1);
  stt(S, 'rt', 15.6, 5.4, '?', 'ink-3', 1, { r: .9 });
  stt(S, 'xt', 8, 9, 'x=T', 'accent', 2, { r: 1.3, pct: 20 }); trn(S, 'e1', [15.6, 5.4], [8, 9], '', 2, { r: .9, rb: 1.3 });
  T(S, 'u1', 1, 11.2, ['절 2 → z = T (단위 전파)', 'clause 2 → z = T (unit propagation)'], 'tx-xs', 2); T(S, 'u2', 1, 12.4, ['절 4 → y = T', 'clause 4 → y = T'], 'tx-xs', 2);
  T(S, 'cf', 1, 13.6, ['절 3: ¬y ∨ ¬z = 거짓 ✗ 충돌', 'clause 3: ¬y ∨ ¬z = false ✗ conflict'], 'tx-xs tx-r', 3); tsets(S, 'xt', [[3, 'danger', 30]]);
  stt(S, 'xf', 23, 9, 'x=F', 'accent', 4, { r: 1.3, pct: 20 }); trn(S, 'e2', [15.6, 5.4], [23, 9], '', 4, { r: .9, rb: 1.3 }); tsets(S, 'xf', [[4, 'ok', 40]]);
  T(S, 'v1', 18.4, 11.2, ['절 1 → y = T', 'clause 1 → y = T'], 'tx-xs', 4); T(S, 'v2', 18.4, 12.4, ['절 3 → z = F', 'clause 3 → z = F'], 'tx-xs', 4); T(S, 'v3', 18.4, 13.6, ['모든 절 참 ✓ (x=F, y=T, z=F)', 'all clauses true ✓ (x=F, y=T, z=F)'], 'tx-xs tx-g', 4);
  T(S, 'bt', 12, 9.6, ['↩ 되돌아가기', '↩ backtrack'], 'tx-xs tx-w', 3);
  notes(S, 'n', 15.4, [['변수에 참·거짓을 정해 모든 절을 참으로 만들 수 있을까?', 'can we pick true/false for each variable so every clause holds?'], ['x를 참으로 정하면, 남은 문자가 하나뿐인 절이 값을 강제해요', 'set x = true; clauses with one free literal force values'], ['강제된 값끼리 부딪히면 충돌 → 마지막 선택을 되돌려요', 'forced values clash → undo the last choice'], ['x를 거짓으로 바꾸니 모두 만족 → 답을 찾았어요', 'with x = false everything is satisfied → solved']], 'tx-xs');
  fin(S, 'z', 15.4, [['DPLL = 백트래킹 + 단위 전파 · 현대 CDCL 솔버는 충돌에서 새 절을 배워요', 'DPLL = backtracking + unit propagation · modern CDCL solvers learn new clauses from conflicts', 'tx-xs tx-a'], ['최악은 지수 시간이지만 실전에선 변수 수백만 개도 풀어요', 'exponential in the worst case, yet real instances with millions of variables get solved'], ['칩 설계 검증, 패키지 의존성 해결(apt·conda), 일정 짜기에 써요', 'used for chip verification, package dependency resolution (apt, conda) and scheduling']]);
  S.cap(1, '논리식을 만족시킬 수 있을까?', 'Can the formula be satisfied?').cap(2, '하나 정하면 나머지가 따라와요', 'One choice forces others').cap(3, '충돌이면 되돌아가요', 'Conflict: backtrack').cap(4, '다른 선택으로 만족', 'The other branch works').cap(5, 'SAT와 DPLL', 'SAT and DPLL');
  return S;
}
function sVc() {
  const S = scene({ id: 'toc-vc', steps: 5, per: 1.5 });
  const P = { a: [3, 3], b: [9, 3], c: [14, 6], d: [9, 10], e: [3, 10], f: [8, 6.5] }, E = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'a'], ['a', 'f'], ['b', 'f']];
  E.forEach(([u, v], i) => { seg(S, 'e' + i, P[u], P[v], 0, 'ink-3', .1); });
  Object.entries(P).forEach(([k, [x, y]]) => { stt(S, 'v' + k, x, y, k, 'ink-3', 0, { r: .9, pct: 12 }); });
  const I = ['c', 'e', 'f'], Cv = ['a', 'b', 'd'];
  I.forEach(k => tsets(S, 'v' + k, [[2, 'ok', 45], [3, 'ok', 20]])); Cv.forEach(k => tsets(S, 'v' + k, [[3, 'warn', 45]]));
  E.forEach((e, i) => S.set('e' + i, 3, { background: 'var(--warn)' }));
  T(S, 'il', 17, 2, ['독립 집합 {c, e, f}: 서로 이어진 간선 없음', 'independent set {c, e, f}: no edges among them'], 'tx-xs tx-g', 2);
  T(S, 'cl', 17, 3.4, ['나머지 {a, b, d} = 정점 덮개', 'the rest {a, b, d} = a vertex cover'], 'tx-xs tx-w', 3); T(S, 'cl2', 17, 4.6, ['모든 간선이 덮개 정점에 닿아요', 'every edge touches the cover'], 'tx-xs', 3);
  const Q = { a: [19, 9], b: [25, 9], c: [30, 12], d: [25, 15], e: [19, 15], f: [24, 12] }, ALL = Object.keys(Q), ES = new Set(E.map(([u, v]) => u + v).concat(E.map(([u, v]) => v + u)));
  let n = 0; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const u = ALL[i], v = ALL[j]; if (!ES.has(u + v)) seg(S, 'q' + (n++), Q[u], Q[v], 4, (I.includes(u) && I.includes(v)) ? 'ok' : 'line', (I.includes(u) && I.includes(v)) ? .14 : .08); }
  Object.entries(Q).forEach(([k, [x, y]]) => stt(S, 'w' + k, x, y, k, I.includes(k) ? 'ok' : 'ink-3', 4, { r: .8, pct: I.includes(k) ? 40 : 12 }));
  T(S, 'ql', 17, 7, ['여집합 그래프에서 {c, e, f}는 클리크(삼각형)', 'in the complement graph {c, e, f} is a clique'], 'tx-xs tx-g', 4);
  notes(S, 'n', 16.6, [['정점 6개, 간선 7개인 그래프', 'a graph with 6 vertices and 7 edges'], ['독립 집합: 서로 이웃이 아닌 정점들', 'independent set: vertices with no edges among them'], ['그 나머지는 정점 덮개: 모든 간선의 한쪽 끝을 포함', 'its complement is a vertex cover: it touches every edge'], ['간선을 뒤집은 그래프에선 독립 집합이 클리크가 돼요', 'in the complement graph the independent set becomes a clique']], 'tx-xs');
  fin(S, 'z', 16.6, [['크기 k 독립 집합 ⇔ 크기 n−k 정점 덮개 ⇔ 여집합의 크기 k 클리크', 'independent set of size k ⇔ vertex cover of size n−k ⇔ clique of size k in the complement', 'tx-xs tx-a'], ['다항 시간 변환으로 이어져 있어 셋 중 하나만 풀어도 모두 풀려요', 'polynomial-time transformations link them, so solving one solves all'], ['정점 덮개는 극대 매칭으로 최적의 2배 이내 근사가 가능해요', 'vertex cover has a 2-approximation via a maximal matching']]);
  S.cap(1, '그래프 하나', 'A graph').cap(2, '독립 집합', 'An independent set').cap(3, '나머지는 정점 덮개', 'The rest is a vertex cover').cap(4, '여집합 그래프에선 클리크', 'A clique in the complement').cap(5, '다항 시간 환원의 예', 'Polynomial-time reductions in action');
  return S;
}
function sSpace() {
  const S = scene({ id: 'toc-space', steps: 5, per: 1.5 });
  const R = [[1, 1.2, 30, 13.8, 'danger', 'EXPTIME', 4], [2.4, 2.8, 24, 10.6, 'warn', 'PSPACE', 3], [3.8, 4.4, 17, 7.4, 'accent', 'NP', 2], [5.2, 6, 10, 4.2, 'ok', 'P', 1], [6, 7.6, 5.4, 2.2, 'ink-3', 'L', 1]];
  R.forEach(([x, y, w, h, c, l, st], i) => { rect(S, 'r' + i, x, y, w, h, c, 8, st, { r: .9, css: `border:.12em solid var(--${c})` }); T(S, 'rl' + i, x + w - (l.length * .45 + .8), y + .2, l, 'cz-mono tx-s', st); });
  [[['무방향 연결성', 'undirected connectivity'], 6.4, 8.8, 1, 'tx-tiny'], [['정렬·최단 경로', 'sorting, paths'], 11.8, 8.4, 1, 'tx-tiny'], [['SAT · 스도쿠', 'SAT · sudoku'], 15.8, 8.4, 2, 'tx-xs'], [['QBF · 일반화한 오목·지리 게임', 'QBF · generalized games'], 15, 12.2, 3, 'tx-xs'], [['일반화한 체스 · 바둑(일본 규칙)', 'generalized chess and Go'], 16.6, 13.8, 4, 'tx-xs']].forEach(([t, x, y, st, c], i) => T(S, 'ex' + i, x, y, t, c, st));
  T(S, 'k1', 1, 15.6, 'L ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME', 'cz-mono tx-s tx-a', 4); T(S, 'k2', 17, 15.7, ['P ≠ EXPTIME 는 증명됨', 'P ≠ EXPTIME is proven'], 'tx-xs tx-g', 4);
  notes(S, 'n', 17.2, [['L: 로그 크기 메모리만으로 · P: 다항 시간에 풀려요', 'L: log-size memory only · P: solvable in polynomial time'], ['NP: 다항 시간에 검증돼요', 'NP: verifiable in polynomial time'], ['PSPACE: 시간은 얼마든, 메모리는 다항 크기로', 'PSPACE: any amount of time, polynomial memory'], ['EXPTIME: 지수 시간이면 풀려요', 'EXPTIME: solvable in exponential time']], 'tx-xs');
  fin(S, 'z', 17.2, [['공간은 다시 쓸 수 있어서 시간보다 강력해요 · 사비치 정리: NPSPACE = PSPACE', 'space can be reused, so it is more powerful than time · Savitch: NPSPACE = PSPACE', 'tx-xs tx-a'], ['포함 관계 대부분은 아직 같은지 다른지 몰라요 (P vs NP, P vs PSPACE…)', 'most of these inclusions are not known to be strict (P vs NP, P vs PSPACE…)']]);
  S.cap(1, 'L과 P', 'L and P').cap(2, 'NP', 'NP').cap(3, 'PSPACE', 'PSPACE').cap(4, 'EXPTIME까지', 'Up to EXPTIME').cap(5, '시간·공간 복잡도 클래스', 'Time and space complexity classes');
  return S;
}
function sRandom() {
  const S = scene({ id: 'toc-random', steps: 5, per: 1.5 });
  T(S, 'q', 1, 1, ['n = 221 은 소수일까? (2048비트 수라면 나눠 보기는 불가능)', 'is n = 221 prime? (for 2048-bit numbers trial division is hopeless)'], 'tx-xs tx-a', 1);
  T(S, 'mr', 1, 2.6, ['밀러–라빈: 무작위 밑 a를 골라 검사', 'Miller–Rabin: test with a random base a'], 'tx-xs', 2);
  const LI = { 3: 1 };
  for (let i = 0; i < 12; i++) { const liar = LI[i]; box2(S, 'a' + i, 1 + i * 2.5, 3.8, 2.2, 1.6, liar ? '?' : '✗', liar ? 'line' : 'danger', i < 1 ? 2 : 3, { pct: liar ? 40 : 30 }); }
  T(S, 'mr2', 1, 5.8, ['✗ = 합성수라는 확실한 증거 · ? = “아마 소수” (거짓말쟁이 밑)', '✗ = proof that n is composite · ? = “probably prime” (a liar base)'], 'tx-xs', 3);
  T(S, 'mr3', 1, 7, ['합성수면 밑의 3/4 이상이 증거 → 한 번에 놓칠 확률 ≤ 1/4', 'for a composite, ≥ 3/4 of bases are witnesses → miss chance ≤ 1/4 per round'], 'tx-xs tx-r', 3);
  [1, 2, 3, 4, 5, 6, 8, 10].forEach((k, i) => { const h = Math.max(.12, 4.8 * Math.pow(.25, k - 1) * .25 * 4); rect(S, 'eb' + i, 2 + i * 2.2, 13.6 - h, 1.6, h, 'danger', 45, 4, { r: .1 }); T(S, 'ek' + i, 1.6 + i * 2.2, 13.8, 'k=' + k, 'cz-tc cz-mono tx-tiny', 4, { w: 2.4 }); });
  T(S, 'eh', 1, 8.4, ['k번 반복하면 오류 확률 ≤ (1/4)ᵏ · 40번이면 2⁻⁸⁰', 'k rounds: error ≤ (1/4)ᵏ · 40 rounds give 2⁻⁸⁰'], 'tx-xs tx-w', 4);
  T(S, 'lv', 20.4, 9.6, ['라스베이거스 알고리즘', 'Las Vegas algorithms'], 'tx-s tx-g', 4); T(S, 'lv2', 20.4, 11, ['답은 항상 정확, 시간이 무작위', 'always correct, random running time'], 'tx-xs', 4); T(S, 'lv3', 20.4, 12.2, ['예: 무작위 피벗 퀵정렬', 'e.g. random-pivot quicksort'], 'tx-xs', 4);
  notes(S, 'n', 15.4, [['큰 수의 소수 판정은 나눠 보기로는 끝나지 않아요', 'trial division can’t settle primality of huge numbers'], ['무작위 밑으로 시험해 증거를 찾아요', 'test with a random base and look for a witness'], ['합성수면 대부분의 밑이 증거라 쉽게 들켜요', 'most bases expose a composite'], ['여러 번 반복하면 오류 확률이 기하급수적으로 줄어요 (몬테카를로)', 'repeating shrinks the error exponentially (Monte Carlo)']], 'tx-xs');
  fin(S, 'z', 15.4, [['BPP: 오류 확률이 작은 무작위 다항 시간 알고리즘으로 풀리는 문제들', 'BPP: problems solved by randomized polynomial-time algorithms with small error', 'tx-xs tx-a'], ['RSA 키 생성은 밀러–라빈을 써요 · 결정적 AKS(2002)는 다항 시간이지만 더 느려요', 'RSA key generation uses Miller–Rabin · the deterministic AKS test (2002) is polynomial but slower'], ['해시 테이블, 블룸 필터, 몬테카를로 시뮬레이션도 무작위성을 활용해요', 'hash tables, Bloom filters and Monte Carlo simulation also exploit randomness']]);
  S.cap(1, '큰 수는 소수일까?', 'Is a huge number prime?').cap(2, '무작위 밑으로 시험', 'Test with random bases').cap(3, '증거는 흔해요', 'Witnesses are plentiful').cap(4, '반복하면 오류가 사라져요', 'Repeat and the error vanishes').cap(5, '확률적 알고리즘', 'Randomized algorithms');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'tx-xs', i + 1, { off: i + 2 }));
function sSubset() {
  const S = scene({ id: 'toc-subset', steps: 5, per: 1.7 });
  stt(S, 'q0', 3.6, 4.2, 'q0', 'ink-3', 0, { start: 1 }); stt(S, 'q1', 8.8, 4.2, 'q1', 'ink-3', 0); stt(S, 'q2', 14.0, 4.2, 'q2', 'ok', 0, { acc: 1 });
  lp(S, 'l0', 3.6, 4.2, 'a, b', 0); trn(S, 't01', [3.6, 4.2], [8.8, 4.2], 'a', 0); trn(S, 't12', [8.8, 4.2], [14.0, 4.2], 'b', 0);
  T(S, 'nl', 1.0, 6.3, ['NFA: "ab"로 끝나는 문자열', 'NFA: strings ending in "ab"'], 'tx-xs', 0);
  const TX = 17.4, CW = [4.6, 4.6, 4.2], cx = c => TX + CW.slice(0, c).reduce((a, b) => a + b, 0);
  [['DFA 상태', 'DFA state'], 'a', 'b'].forEach((h, c) => T(S, 'th' + c, cx(c), 1.0, h, 'cz-tc tx-xs tx-a', 1, { w: CW[c] }));
  const rows = [['{q0}', '{q0,q1}', '{q0}', 2], ['{q0,q1}', '{q0,q1}', '{q0,q2}', 3], ['{q0,q2}', '{q0,q1}', '{q0}', 3]];
  rows.forEach((r, i) => r.slice(0, 3).forEach((v, c) => cell(S, `tc${i}${c}`, cx(c) + .1, 2.2 + i * 1.35, CW[c] - .2, 1.15, v, c ? 'line' : (i === 2 ? 'ok' : 'accent'), c ? 12 : 26, r[3])));
  T(S, 'nw', TX, 6.5, ['새로 나온 집합은 표에 행으로 추가', 'each new set becomes a new row'], 'tx-xs tx-w', 3);
  const D = [[4.6, 11.4], [13.6, 11.4], [22.6, 11.4]], R = 1.55;
  stt(S, 'd0', ...D[0], '{q0}', 'accent', 4, { r: R, start: 1 }); stt(S, 'd1', ...D[1], '{q0,q1}', 'accent', 4, { r: R }); stt(S, 'd2', ...D[2], '{q0,q2}', 'ok', 4, { r: R, acc: 1 });
  lp(S, 'dl0', ...D[0], 'b', 4, { r: R }); lp(S, 'dl1', ...D[1], 'a', 4, { r: R });
  trn(S, 'd01', D[0], D[1], 'a', 4, { r: R, bend: -.45, ld: -.7 }); trn(S, 'd12', D[1], D[2], 'b', 4, { r: R, bend: -.45, ld: -.7 }); trn(S, 'd21', D[2], D[1], 'a', 4, { r: R, bend: -.45, ld: -.7 });
  elb(S, 'd20', [[D[2][0], D[2][1] + R], [D[2][0], 14.2], [D[0][0], 14.2], [D[0][0], D[0][1] + R + .05]], 'ink-3', 4, { h: .1 }); T(S, 'd20l', 13.0, 13.4, 'b', 'cz-tc cz-mono tx-xs', 4, { w: 1.2 });
  notesSplit(S, 'k', 15.6, [['NFA는 한 입력에 여러 상태가 동시에 살아 있어요 · 이 NFA는 "ab"로 끝나는 문자열을 받아요', 'an NFA can be in several states at once · this one accepts strings ending in "ab"'], ['“지금 살아 있을 수 있는 상태들의 집합”을 DFA의 상태 하나로 봐요 · 시작은 {q0}', 'treat each set of possibly-active states as one DFA state · start with {q0}'], ['각 집합에서 a, b를 읽은 뒤의 집합을 구하고, 처음 보는 집합이면 새 상태로 추가해요', 'for each set compute where a and b lead, adding any unseen set as a new state'], ['q2를 포함한 집합이 받아들임 상태 · 3개짜리 DFA가 완성돼요', 'sets containing q2 accept · the result is a three-state DFA']]);
  fin(S, 'z', 15.6, [['부분집합 구성: NFA를 같은 언어의 DFA로 바꾸는 방법', 'the subset construction turns an NFA into a DFA for the same language', 'tx-xs tx-a'], ['최악의 경우 상태가 2ⁿ개까지 늘어요 · 그래서 필요한 집합만 그때그때 만들어요', 'in the worst case the DFA needs 2ⁿ states, so engines build sets lazily as needed'], ['렉서 생성기(flex)와 RE2 같은 정규식 엔진이 이 방법으로 선형 시간 매칭을 보장해요', 'lexer generators (flex) and regex engines such as RE2 use it to guarantee linear-time matching']]);
  S.cap(1, 'NFA', 'An NFA').cap(2, '상태의 집합을 하나로', 'A set of states as one state').cap(3, '새 집합 찾기', 'Discover new sets').cap(4, '완성된 DFA', 'The finished DFA').cap(5, '부분집합 구성', 'The subset construction');
  return S;
}

function sApprox() {
  const S = scene({ id: 'toc-approx', steps: 5, per: 1.7 });
  const N = { c1: [4.6, 7.2], c2: [9.8, 7.2], c3: [15.0, 7.2], a1: [1.8, 2.8], a2: [1.8, 11.6], b1: [7.8, 2.4], b2: [11.8, 12.0], d1: [17.6, 2.8], d2: [17.6, 11.6] };
  const E = [['c1', 'a1'], ['c1', 'a2'], ['c2', 'b1'], ['c2', 'b2'], ['c3', 'd1'], ['c3', 'd2'], ['c1', 'c2'], ['c2', 'c3']];
  const picks = [['c1', 'a1', 2], ['c2', 'b1', 3], ['c3', 'd1', 3]], dimAt = e => { const st = picks.find(([u, v, s]) => e.includes(u) || e.includes(v)); return st ? st[2] : 0; };
  E.forEach((e, i) => { seg(S, 'e' + i, N[e[0]], N[e[1]], 0, 'ink-3', .1); const st = picks.findIndex(([u, v]) => (e[0] === u && e[1] === v)); if (st < 0) { const d = dimAt(e); if (d) S.set('e' + i, d, { opacity: '.25' }); } });
  picks.forEach(([u, v, st], i) => seg(S, 'p' + i, N[u], N[v], st, 'danger', .22));
  Object.entries(N).forEach(([k, [x, y]]) => { stt(S, 'n' + k, x, y, '', 'ink-3', 0, { r: .7 }); const p = picks.find(([u, v]) => u === k || v === k); if (p) tsets(S, 'n' + k, [[p[2], 'danger', 45]]); });
  ['c1', 'c2', 'c3'].forEach((k, i) => ring(S, 'opt' + i, N[k][0], N[k][1], 1.15, 'ok', 4, { w: .16 }));
  const R = 20.4;
  T(S, 'r1', R, .8, ['정점 덮개', 'vertex cover'], 'tx-s tx-a', 1);
  T(S, 'r1b', R, 2.0, ['모든 간선의 끝을 하나 이상 덮기', 'touch every edge at least once'], 'tx-xs', 1);
  T(S, 'r2', R, 3.1, ['가장 작은 덮개 찾기는 NP-난해', 'the smallest one is NP-hard'], 'tx-xs tx-r', 1);
  T(S, 'r3', R, 4.6, ['간선 하나 → 양 끝 모두 넣기', 'take an edge → add both ends'], 'tx-xs tx-r', 2);
  T(S, 'r4', R, 6.2, ['우리 답 6개', 'ours: 6'], 'tx-s tx-r', 3); T(S, 'r5', R, 7.5, ['최적 3개', 'optimum: 3'], 'tx-s tx-g', 4);
  T(S, 'r6', R, 9.0, ['고른 간선 3개는 끝점이 안 겹쳐요', 'the 3 picked edges share no endpoint'], 'tx-xs', 4);
  T(S, 'r6b', R, 10.0, ['→ 최적도 3개 이상 필요', '→ OPT needs at least 3'], 'tx-xs', 4);
  T(S, 'r7', R, 11.6, '6 ≤ 2 × 3 ✓', 'cz-mono tx-s tx-g', 4);
  notesSplit(S, 'k', 15.6, [['정점 덮개: 모든 간선의 한쪽 끝을 덮는 가장 작은 정점 집합 · 정확히 구하는 건 NP-난해예요', 'vertex cover: the fewest vertices touching every edge · finding it exactly is NP-hard'], ['아직 안 덮인 간선 하나를 골라 양 끝을 모두 넣고, 덮인 간선을 지워요', 'pick any uncovered edge, add both its ends, and remove the edges now covered'], ['간선이 남지 않을 때까지 반복하면 덮개 완성 · 여기서는 정점 6개', 'repeat until no edge is left and the cover is done · here, six vertices'], ['최적은 가운데 3개 · 우리 답은 언제나 최적의 2배를 넘지 않아요', 'the optimum is the three middle vertices · ours is never more than twice the optimum']]);
  fin(S, 'z', 15.6, [['근사 알고리즘: 최적은 못 찾아도, 최적의 몇 배 이내라고 보장하는 빠른 알고리즘', 'an approximation algorithm runs fast and guarantees a result within a known factor of optimal', 'tx-xs tx-a'], ['외판원 문제(삼각 부등식)는 MST로 2배, 크리스토피데스로 1.5배 이내', 'metric TSP: within 2× via the MST, within 1.5× via Christofides'], ['P ≠ NP라면 어떤 배수로도 근사할 수 없는 문제도 있어요 · 일반 TSP, 최대 클리크', 'if P ≠ NP some problems cannot be approximated within any factor · general TSP, maximum clique']]);
  S.cap(1, 'NP-난해한 정점 덮개', 'Vertex cover is NP-hard').cap(2, '간선의 양 끝을 넣기', 'Take both ends of an edge').cap(3, '덮개 완성', 'The cover is done').cap(4, '최적의 2배 이내', 'Within twice the optimum').cap(5, '근사 알고리즘', 'Approximation algorithms');
  return S;
}

return { css: CSSX, secs: [], add: {
  'toc-auto': [
    item('toc-lang', '알파벳·문자열·언어', 'Alphabets, strings and languages', '계산 이론은 기호의 유한 집합(알파벳), 그 기호로 만든 문자열, 문자열의 집합(언어)에서 시작해요.', 'Σ*는 빈 문자열 ε를 포함해 Σ로 만들 수 있는 모든 문자열이고, 언어는 그 부분집합이에요. 언어끼리는 이어 붙이기(·), 합집합(∪), 클리니 스타(*)로 새 언어를 만들어요. “입력이 언어 L에 속하는가?”라는 형태로 모든 결정 문제를 표현할 수 있어서, 어떤 기계가 어떤 언어를 인식하는지가 이론 전체의 뼈대가 돼요.', 'The theory starts from a finite set of symbols (an alphabet), strings over it, and sets of strings (languages).', 'Σ* contains every string over Σ, including the empty string ε, and a language is any subset of it. Languages combine by concatenation (·), union (∪) and the Kleene star (*). Every decision problem can be phrased as “is the input in language L?”, so which machines recognize which languages is the backbone of the whole theory.', sLang()),
    item('toc-min', 'DFA 최소화', 'DFA minimization', '같은 언어를 받는 DFA 중 상태가 가장 적은 것을 찾아요. 구별할 수 없는 상태들을 하나로 합쳐요.', '먼저 수락·비수락 상태로 나누고, 같은 그룹 안에서 어떤 입력에 대해 서로 다른 그룹으로 가는 상태를 쪼개는 일을 더 쪼갤 게 없을 때까지 반복해요(분할 정제). 마지막에 같은 그룹의 상태를 하나로 합치면 최소 DFA예요. 마이힐–네로드 정리에 따라 최소 DFA는 이름만 빼고 유일하고, 홉크로프트 알고리즘은 O(n log n)에 만들어요.', 'Find the DFA with the fewest states for a language by merging states that can’t be told apart.', 'Split accepting from non-accepting states, then keep splitting any group whose members move to different groups on some symbol until nothing changes (partition refinement). Merging each final group gives the minimal DFA. By the Myhill–Nerode theorem it is unique up to renaming, and Hopcroft’s algorithm builds it in O(n log n).', sMin()),
    item('toc-pump', '펌핑 보조정리', 'The pumping lemma', '어떤 언어가 정규 언어가 아님을 보이는 도구예요. 긴 문자열을 읽다 보면 상태가 반복되고, 그 고리를 늘려도 수락돼야 해요.', '상태 p개인 DFA가 길이 p 이상의 문자열을 읽으면 비둘기집 원리로 어떤 상태가 반복돼요. 그래서 s = xyz (|xy| ≤ p, |y| ≥ 1)로 나눌 수 있고 모든 i에 대해 xyⁱz도 수락돼야 해요. aⁿbⁿ에서 y를 늘리면 a만 많아져 L을 벗어나므로 모순이에요. 정규 언어는 유한한 기억만 가져 개수를 셀 수 없다는 뜻이에요.', 'A tool for proving a language is not regular: reading a long string must repeat a state, and pumping that loop must still be accepted.', 'When a p-state DFA reads a string of length at least p, some state repeats by the pigeonhole principle. So s = xyz with |xy| ≤ p and |y| ≥ 1, and xyⁱz must be accepted for every i. For aⁿbⁿ, pumping y adds only a’s and leaves the language: a contradiction. Regular languages have finite memory and cannot count.', sPump()),
    item('toc-closure', '닫힘 성질과 곱 구성', 'Closure and the product construction', '정규 언어끼리 합치고, 겹치고, 뒤집어도 여전히 정규 언어예요. 두 DFA를 쌍으로 묶어 동시에 돌리면 돼요.', '곱 구성은 상태를 (M₁ 상태, M₂ 상태) 쌍으로 만들고 두 기계를 한 칸씩 함께 움직여요. 둘 다 수락하는 쌍만 수락하면 교집합, 하나라도 수락하면 합집합이에요. 여집합은 DFA의 수락 상태를 뒤집으면 되고, 이어 붙이기와 스타는 NFA로 보여요. 이 성질 덕분에 여러 패턴 조건을 하나의 오토마타로 합쳐 한 번에 검사해요.', 'Combining, intersecting or complementing regular languages yields regular languages; just run two DFAs in lockstep as pairs.', 'The product construction uses pairs (M₁ state, M₂ state) as states and moves both machines together. Accepting when both accept gives the intersection; when either accepts, the union. Complement flips a DFA’s accepting states, while concatenation and star follow from NFAs. These properties let many pattern rules merge into one automaton checked in a single pass.', sClosure()),
    item('toc-thompson', '정규식 → NFA (톰슨 구성)', 'Regex to NFA (Thompson)', '정규식을 기호·선택·반복·이어 붙이기 조각으로 나눠, ε 전이로 이어 붙여 NFA를 만들어요.', '기호 하나는 상태 두 개와 화살표 하나, 선택 a|b는 ε로 갈라졌다 다시 합치는 조각, 반복 *은 되돌아가는 ε와 건너뛰는 ε를 더한 조각이에요. 상태 수가 정규식 길이에 비례해서 빠르게 만들 수 있고, 이후 부분집합 구성으로 DFA로 바꾸거나 NFA를 그대로 시뮬레이션해요. grep, lex, RE2가 이 원리를 써요. 역참조(\\1) 같은 기능은 정규 언어를 벗어나 백트래킹이 필요해요.', 'Break a regex into symbol, union, star and concatenation pieces, then glue them with ε-transitions into an NFA.', 'A symbol is two states and an arrow; a|b branches out with ε-edges and joins again; * adds an ε back-edge and an ε skip. The state count grows linearly with the regex, so construction is fast; the NFA is then simulated directly or turned into a DFA by the subset construction. grep, lex and RE2 work this way. Features such as backreferences (\\1) go beyond regular languages and need backtracking.', sThompson()),
    item('toc-mealy', '무어 기계와 밀리 기계', 'Moore and Mealy machines', '입력을 받아 출력을 내는 유한 상태 기계예요. 무어는 상태에, 밀리는 전이에 출력이 붙어요.', '신호등처럼 지금 상태가 곧 출력인 것은 무어 기계, 자판기처럼 “500원 투입 / 음료 출력”처럼 전이마다 출력이 나오는 것은 밀리 기계예요. 둘은 표현력이 같고, 밀리 기계가 상태 수가 적고 반응이 한 박자 빨라요. 디지털 회로의 제어기, 통신 프로토콜, 게임 AI, XState 같은 UI 상태 관리에 그대로 쓰여요.', 'Finite-state machines that turn inputs into outputs: Moore machines attach outputs to states, Mealy machines to transitions.', 'A traffic light, whose state is its output, is a Moore machine; a vending machine that emits “drink” on the transition “insert 500” is a Mealy machine. They are equally expressive, but Mealy machines need fewer states and react one step sooner. They model circuit controllers, communication protocols, game AI and UI state machines such as XState.', sMealy()),
    item('toc-ambig', '모호한 문법', 'Ambiguous grammars', '한 문자열에 파스 트리가 둘 이상 나오는 문법이에요. 1 + 2 * 3이 9도 되고 7도 될 수 있어요.', 'E → E + E | E * E | num은 덧셈과 곱셈 중 무엇을 먼저 묶을지 정하지 않아 모호해요. 우선순위마다 비단말을 나눠 E → E + T, T → T * F처럼 쓰면 트리가 하나뿐이 돼요. if-else가 어느 if에 붙는지 정하는 dangling else 문제도 같은 종류예요. yacc·bison 같은 파서 생성기는 %left, %right 우선순위 선언으로 모호성을 풀어요.', 'A grammar that gives a string more than one parse tree, so 1 + 2 * 3 can mean 9 or 7.', 'E → E + E | E * E | num never says which operator binds first, so it is ambiguous. Introducing a nonterminal per precedence level (E → E + T, T → T * F) leaves exactly one tree. The dangling-else problem, deciding which if an else belongs to, is the same kind. Parser generators such as yacc and bison resolve ambiguity with %left and %right precedence declarations.', sAmbig()),
    item('toc-cyk', 'CYK 알고리즘', 'The CYK algorithm', '촘스키 정규형 문법으로 문자열을 만들 수 있는지, 짧은 부분 문자열부터 표를 채우며 판정하는 동적 계획법이에요.', '표의 각 칸에는 그 부분 문자열을 만들 수 있는 비단말을 적어요. 길이 1은 A → a 규칙으로, 길이가 길어지면 모든 자르는 위치에서 아래 칸 두 개를 A → BC 규칙으로 조합해요. 전체 문자열 칸에 시작 기호 S가 있으면 수락이에요. O(n³·|G|)으로 모든 문맥 자유 언어를 판정하고, 확률 버전(PCFG)은 자연어의 가장 그럴듯한 구문을 찾아요.', 'Dynamic programming that decides whether a Chomsky-normal-form grammar generates a string, filling a table from short substrings up.', 'Each cell holds the nonterminals that derive its substring. Length-1 cells come from rules A → a; longer cells combine two lower cells at every split point via rules A → BC. If the start symbol S appears in the full-string cell, the string is accepted. It decides any context-free language in O(n³·|G|), and its probabilistic version (PCFG) finds the most likely parse of a sentence.', sCyk())
  ],
  'toc-compute': [
    item('toc-utm', '범용 튜링 기계', 'Universal Turing machine', '다른 튜링 기계의 설명 ⟨M⟩과 입력 w를 받아 M이 w에서 하는 일을 그대로 흉내 내는 기계예요. 프로그램도 데이터라는 뜻이에요.', '튜링 기계는 규칙표 하나로 정해지고, 규칙표는 0과 1의 문자열로 적을 수 있어요. 범용 기계 U는 테이프의 ⟨M⟩에서 지금 상태·기호에 맞는 규칙을 찾아 w 쪽에 적용하기를 반복해요. 이것이 프로그램을 메모리에 넣고 실행하는 폰 노이만 컴퓨터의 이론적 원형이에요. 처치–튜링 논제는 “알고리즘으로 계산할 수 있는 것 = 튜링 기계로 계산할 수 있는 것”이라고 말해요.', 'A machine that takes a description ⟨M⟩ of another Turing machine plus an input w and simulates M on w: programs are data.', 'A Turing machine is fully described by its rule table, which can be written as a string of 0s and 1s. The universal machine U repeatedly looks up the matching rule in ⟨M⟩ and applies it to w. This is the theoretical blueprint for stored-program (von Neumann) computers. The Church–Turing thesis states that whatever an algorithm can compute, a Turing machine can.', sUtm()),
    item('toc-diag', '대각선 논법', 'The diagonal argument', '목록을 다 만들었다고 가정하고, 대각선을 뒤집어 목록에 없는 원소를 만들어 내는 증명 기법이에요.', '무한 0/1 수열을 한 줄씩 다 나열했다고 가정하고, i번째 줄의 i번째 숫자를 모두 뒤집은 수열 d를 만들면 d는 어느 줄과도 한 자리 이상 달라요. 그래서 실수는 자연수보다 많고(칸토어), 프로그램(유한 문자열)은 셀 수 있지만 언어는 셀 수 없어 인식 불가능한 언어가 반드시 존재해요. 정지 문제의 결정 불가능성 증명도 같은 생각이에요.', 'Assume a complete list exists, then flip the diagonal to build an element that cannot be on it.', 'List every infinite 0/1 sequence, one per row, and build d by flipping digit i of row i: d differs from every row somewhere. Hence the reals outnumber the naturals (Cantor), and since programs are countable finite strings while languages are uncountable, some languages cannot be recognized by any program. The undecidability of the halting problem uses the same idea.', sDiag()),
    item('toc-reduce', '환원', 'Reductions', '문제 A의 입력을 문제 B의 입력으로 바꾸는 계산 f가 있으면, B의 해법으로 A를 풀 수 있어요 (A ≤ B).', '“x ∈ A ⇔ f(x) ∈ B”인 f가 있으면 B가 풀리면 A도 풀리고, 거꾸로 A가 불가능하면 B도 불가능해요. 예를 들어 “M(w)를 실행한 뒤 hello를 출력”하는 프로그램을 만들면, hello 출력 여부를 판정하는 문제가 정지 문제만큼 어려워져 결정 불가능해요. f를 다항 시간으로 제한하면 같은 방식으로 NP-완전성을 증명해요.', 'If a computable f turns instances of A into instances of B, a solver for B solves A (A ≤ B).', 'With x ∈ A ⇔ f(x) ∈ B, solving B solves A, and conversely if A is impossible so is B. For example, the program “run M on w, then print hello” prints hello exactly when M halts on w, so deciding whether a program prints hello is as hard as halting: undecidable. Restricting f to polynomial time gives the same technique for NP-completeness proofs.', sReduce()),
    item('toc-rice', '라이스 정리', 'Rice’s theorem', '프로그램이 “무엇을 하는가”에 관한 자명하지 않은 성질은 모두 결정 불가능하다는 정리예요.', '“빈 문자열을 받는가?”, “항상 멈추는가?”, “두 함수가 같은 일을 하는가?”, “바이러스인가?”처럼 프로그램의 동작(인식하는 언어)에 관한 성질은, 그 성질을 가진 프로그램과 안 가진 프로그램이 모두 있는 한 완벽히 판정할 수 없어요. 반면 “100줄이 넘나?” 같은 코드 모양(문법적 성질)은 판정할 수 있어요. 그래서 정적 분석기와 백신은 미탐과 오탐 사이에서 근사해요.', 'Every nontrivial property of what a program does is undecidable.', 'Questions about behavior, the language a program recognizes, such as “accepts the empty string?”, “always halts?”, “do two functions compute the same thing?” or “is it a virus?”, can’t be decided perfectly whenever some programs have the property and others don’t. Syntactic questions like “is it over 100 lines?” remain decidable. Static analyzers and antivirus tools therefore approximate, trading missed cases against false alarms.', sRice()),
    item('toc-decid', '결정 가능과 인식 가능', 'Decidable vs recognizable', '항상 멈추며 예·아니오를 내면 결정 가능, “예”일 때만 멈춤이 보장되면 인식 가능이에요. 언어들은 겹겹의 계층을 이뤄요.', '정규(a*b*) ⊂ 문맥 자유(aⁿbⁿ) ⊂ 결정 가능(aⁿbⁿcⁿ) ⊂ 인식 가능(정지 문제 HALT) ⊂ 모든 언어 순으로 진부분집합이에요. 결정 가능 = 인식 가능이면서 여집합도 인식 가능한 언어예요. HALT는 인식 가능하지만 결정 불가능하고, HALT의 여집합은 인식조차 못 해요. 세상 대부분의 언어는 이 바깥에 있어요.', 'Decidable means a machine always halts with yes or no; recognizable only guarantees halting on yes. Languages form nested classes.', 'Regular (a*b*) ⊂ context-free (aⁿbⁿ) ⊂ decidable (aⁿbⁿcⁿ) ⊂ recognizable (the halting language HALT) ⊂ all languages, each inclusion strict. A language is decidable exactly when it and its complement are both recognizable. HALT is recognizable but undecidable, and its complement is not even recognizable. Most languages lie beyond all of these.', sDecid()),
    item('toc-lambda', '람다 계산', 'Lambda calculus', '변수, 함수 만들기(λx. M), 함수 적용(M N) 세 가지만으로 된 계산 모델이에요. 튜링 기계와 같은 힘을 가져요.', '계산은 인자를 함수 몸통에 대입하는 베타 축약의 반복이에요: (λx. x × x) 3 → 3 × 3 → 9. 여러 인자는 함수를 돌려주는 함수로 받고(커링), 숫자(처치 수), 참·거짓, 재귀(Y 조합자)까지 모두 함수로 만들 수 있어요. 처치가 1936년에 제안했고, Lisp·Haskell 같은 함수형 언어와 화살표 함수·클로저의 뿌리예요.', 'A model of computation with only variables, function definitions (λx. M) and application (M N), as powerful as Turing machines.', 'Computation is repeated beta reduction, substituting arguments into bodies: (λx. x × x) 3 → 3 × 3 → 9. Multiple arguments come one at a time (currying), and numbers (Church numerals), booleans and recursion (the Y combinator) are all encoded as functions. Church introduced it in 1936; it is the root of functional languages such as Lisp and Haskell, and of arrow functions and closures.', sLambda())
  ],
  'toc-cx': [
    item('toc-npc', 'NP-완전성', 'NP-completeness', 'NP 문제 중 가장 어려운 것들이에요. 하나라도 다항 시간에 풀리면 모든 NP 문제가 풀려요.', 'NP는 답 후보를 다항 시간에 검증할 수 있는 문제, NP-hard는 모든 NP 문제가 다항 시간에 환원되는 문제, NP-완전은 둘 다인 문제예요. 쿡–레빈 정리(1971)로 SAT가 처음 NP-완전임이 증명됐고, 카프가 SAT에서 환원해 클리크, 정점 덮개, 해밀턴 회로, 3-색칠, 부분집합 합 등 21개를 보였어요. 실무에선 근사 알고리즘, 휴리스틱, SAT·ILP 솔버로 큰 사례를 풀어요.', 'The hardest problems in NP: if any one is solvable in polynomial time, every NP problem is.', 'NP contains problems whose proposed answers can be verified in polynomial time; NP-hard problems are those every NP problem reduces to; NP-complete problems are both. The Cook–Levin theorem (1971) proved SAT NP-complete first, and Karp then reduced SAT to 21 problems including clique, vertex cover, Hamiltonian cycle, 3-coloring and subset sum. In practice, approximation, heuristics and SAT/ILP solvers handle large instances.', sNpc()),
    item('toc-sat', 'SAT와 DPLL', 'SAT and DPLL', '논리식의 변수에 참·거짓을 정해 식 전체를 참으로 만들 수 있는지 묻는 문제예요. 첫 NP-완전 문제지만 실전에선 놀랍도록 잘 풀려요.', 'DPLL은 변수 하나를 정하고, 문자가 하나 남은 절이 강제하는 값을 연쇄로 정한 뒤(단위 전파), 충돌하면 마지막 선택을 되돌리는 백트래킹이에요. 현대 CDCL 솔버는 충돌의 원인을 새 절로 배워 같은 실수를 반복하지 않아 변수 수백만 개짜리 문제도 풀어요. 칩 설계 검증, 패키지 의존성 해결(apt·conda), 일정 계획에 쓰여요.', 'Can true/false values be chosen so a logical formula becomes true? The first NP-complete problem, yet surprisingly tractable in practice.', 'DPLL picks a variable, propagates values forced by clauses with one free literal (unit propagation), and backtracks on conflicts. Modern CDCL solvers learn a new clause from each conflict so they never repeat the mistake, solving instances with millions of variables. They power chip verification, package dependency resolution (apt, conda) and scheduling.', sSat()),
    item('toc-vc', '다항 시간 환원의 예', 'A polynomial-time reduction', '독립 집합, 정점 덮개, 클리크는 간단한 변환으로 서로 바뀌어요. 하나를 풀면 셋 다 풀려요.', '크기 k인 독립 집합(서로 이웃이 아닌 정점들)의 나머지는 크기 n−k인 정점 덮개(모든 간선의 한쪽 끝을 포함)이고, 간선을 뒤집은 여집합 그래프에서는 크기 k인 클리크가 돼요. 이런 다항 시간 변환으로 NP-완전 문제들이 서로 연결돼 있어요. 정점 덮개는 극대 매칭을 이용해 최적의 2배 이내로 근사할 수 있어요.', 'Independent set, vertex cover and clique transform into each other with simple changes; solve one and you solve all three.', 'The complement of an independent set of size k (no two vertices adjacent) is a vertex cover of size n−k (touching every edge), and in the complement graph the same set is a clique of size k. Such polynomial-time transformations tie NP-complete problems together. Vertex cover also has a 2-approximation using a maximal matching.', sVc()),
    item('toc-space', '시간·공간 복잡도 클래스', 'Time and space complexity classes', '문제를 필요한 시간과 메모리로 분류하면 L ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME의 계층이 생겨요.', 'L은 로그 크기 메모리, P는 다항 시간, NP는 다항 시간 검증, PSPACE는 다항 크기 메모리, EXPTIME은 지수 시간으로 풀리는 문제예요. 양화 논리식(QBF)과 일반화한 게임은 PSPACE-완전, 일반화한 체스는 EXPTIME-완전이에요. 공간은 다시 쓸 수 있어 시간보다 강력하고(사비치: NPSPACE = PSPACE), P ≠ EXPTIME은 증명됐지만 나머지 포함 관계는 대부분 미해결이에요.', 'Classifying problems by the time and memory they need gives the hierarchy L ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME.', 'L uses logarithmic memory, P polynomial time, NP polynomial-time verification, PSPACE polynomial memory and EXPTIME exponential time. Quantified Boolean formulas (QBF) and generalized games are PSPACE-complete; generalized chess is EXPTIME-complete. Space can be reused, making it more powerful than time (Savitch: NPSPACE = PSPACE). P ≠ EXPTIME is proven, but most other separations remain open.', sSpace()),
    item('toc-random', '확률적 알고리즘', 'Randomized algorithms', '무작위성을 써서 아주 작은 오류 확률을 받아들이는 대신 훨씬 빠르게 푸는 알고리즘이에요.', '밀러–라빈 소수 판정은 무작위 밑을 골라 시험하는데, 합성수라면 밑의 3/4 이상이 증거가 되어 한 번에 놓칠 확률이 1/4 이하예요. k번 반복하면 오류 확률이 (1/4)ᵏ로 줄어 RSA 키 생성에 쓰여요(몬테카를로). 답은 항상 정확하고 시간만 무작위인 것은 라스베이거스 알고리즘으로, 무작위 피벗 퀵정렬이 예예요. 이런 알고리즘으로 풀리는 문제의 클래스가 BPP예요.', 'Algorithms that use randomness and accept a tiny chance of error in exchange for far greater speed.', 'Miller–Rabin primality testing picks a random base; for a composite number at least 3/4 of bases are witnesses, so one round misses with probability at most 1/4, and k rounds drive the error to (1/4)ᵏ. It is used for RSA key generation (a Monte Carlo algorithm). Las Vegas algorithms are always correct with random running time, like random-pivot quicksort. Problems solvable this way form the class BPP.', sRandom())
  ]
},
after: {
  'toc-nfa': [item('toc-subset', '부분집합 구성', 'The subset construction', 'NFA가 동시에 머물 수 있는 상태들의 집합을 DFA의 상태 하나로 보고, 입력마다 다음 집합을 구해 같은 언어를 받는 DFA를 만들어요.', 'NFA는 한 입력에 여러 상태로 동시에 갈 수 있지만, 매 순간 “지금 있을 수 있는 상태들의 집합”은 하나로 정해져요. 부분집합 구성은 이 집합 하나하나를 DFA의 상태로 삼아요. 시작 상태는 {q0}(ε-전이가 있으면 ε-폐포)이고, 각 집합에서 기호 a를 읽었을 때 갈 수 있는 모든 상태를 모은 집합이 다음 상태예요. 처음 보는 집합이 나오면 표에 새 행으로 추가하고, 더 새로운 집합이 없을 때까지 반복해요. NFA의 받아들임 상태를 하나라도 포함한 집합이 DFA의 받아들임 상태예요. "ab"로 끝나는 문자열의 NFA(q0 –a→ q1 –b→ q2)에서는 {q0}, {q0,q1}, {q0,q2} 세 상태의 DFA가 나와요. 최악의 경우 n개 상태의 NFA가 2ⁿ개 상태의 DFA가 되므로, 실제 정규식 엔진(RE2 등)은 입력을 읽으면서 필요한 집합만 그때그때 만들고 캐시해요. DFA는 입력 한 글자당 상태 전이 한 번이라서 매칭이 입력 길이에 선형으로 보장되고, 렉서 생성기 flex도 이 방법 뒤에 DFA 최소화를 해요.', 'Treat each set of states an NFA can occupy at once as a single DFA state, compute the next set for every input symbol, and you get a DFA accepting the same language.', 'An NFA may branch into several states on one input, but at every moment the set of states it could be in is uniquely determined. The subset construction makes each such set a DFA state. The start state is {q0} (its ε-closure if there are ε-moves), and the next state on symbol a is the set of all states reachable from the current set by a. Any set not seen before becomes a new row in the table, and the process repeats until no new sets appear. A set containing at least one accepting NFA state is an accepting DFA state. For the NFA of strings ending in "ab" (q0 –a→ q1 –b→ q2), the result is a three-state DFA: {q0}, {q0,q1} and {q0,q2}. In the worst case an n-state NFA needs a 2ⁿ-state DFA, so practical regex engines such as RE2 build sets lazily while reading input and cache them. A DFA takes one transition per character, guaranteeing matching in linear time, and lexer generators like flex follow the construction with DFA minimization.', sSubset())],
  'toc-tsp': [item('toc-approx', '근사 알고리즘', 'Approximation algorithms', 'NP-난해한 최적화 문제에서 최적해는 포기하는 대신, 빠르게 돌면서 결과가 최적의 몇 배 이내라고 보장하는 알고리즘이에요.', '최소 정점 덮개(모든 간선의 한쪽 끝을 덮는 가장 작은 정점 집합)는 NP-난해해서 큰 그래프에서 정확히 풀 수 없어요. 대신 아직 덮이지 않은 간선 하나를 골라 양 끝을 모두 넣고, 덮인 간선을 지우기를 반복하면 다항 시간에 덮개를 얻어요. 이렇게 고른 간선들은 서로 정점을 공유하지 않으므로, 최적 덮개도 간선마다 적어도 한 정점은 가져야 해서 최적 ≥ 고른 간선 수 k예요. 우리 답은 2k이므로 언제나 최적의 2배 이내이고, 이 배수를 근사 비율이라고 해요. 예시에서 우리 답은 6개, 최적은 가운데 3개라 딱 2배예요. 삼각 부등식이 성립하는 외판원 문제는 최소 신장 트리를 두 번 도는 방법으로 2배, 크리스토피데스 알고리즘으로 1.5배 이내를 보장해요. 원하는 만큼 1에 가깝게 만들 수 있는 근사 방식(PTAS)이 있는 문제도 있고, 반대로 P ≠ NP라면 어떤 상수 배로도 근사할 수 없는 문제(일반 외판원 문제, 최대 클리크)도 있어요. 배송 경로, 시설 배치, 스케줄링 같은 실제 최적화 문제에서 많이 써요.', 'For NP-hard optimization problems, give up on the optimum but run fast and guarantee a result within a known factor of it.', 'Minimum vertex cover, the smallest set of vertices touching every edge, is NP-hard, so large instances cannot be solved exactly. Instead, repeatedly pick an uncovered edge, add both its endpoints and delete the edges now covered; this yields a cover in polynomial time. The picked edges share no vertices, so any optimal cover needs at least one vertex per picked edge: OPT ≥ k. Our cover has 2k vertices, so it is always within twice the optimum, a factor called the approximation ratio. In the example ours has 6 vertices and the optimum 3, exactly twice. For the travelling salesman problem with the triangle inequality, walking a minimum spanning tree twice gives a 2-approximation and Christofides’ algorithm 1.5. Some problems admit schemes that get as close to 1 as desired (PTAS), while others, such as general TSP and maximum clique, cannot be approximated within any constant factor unless P = NP. Approximation algorithms are widely used for routing, facility placement and scheduling.', sApprox())]
} };
})();

window.UX = page([
  sec('toc-auto', '오토마타', 'Automata', '오토마타와 형식 언어', 'Automata and formal languages',
    '입력을 읽고 받아들일지 정하는 추상 기계예요. 정규식, 파서, 상태 관리의 이론적 바탕이에요.', 'Abstract machines that read input and decide whether to accept it; the theory behind regex, parsers and state management.', [
    item('toc-dfa', 'DFA (결정적 유한 오토마타)', 'DFA · Deterministic finite automaton', '유한 개의 상태와 "이 상태에서 이 글자를 읽으면 저 상태로" 규칙만으로 입력을 판정하는 기계예요. 기억은 현재 상태 하나뿐이에요.', '주문·결제 상태, UI 상태(XState), 프로토콜 처리, 토크나이저를 상태 기계로 설계하면 불가능한 전이를 원천 차단해요.', 'A machine with finitely many states and “in this state, on this symbol, go there” rules; its only memory is the current state.', 'Modelling order flows, UI state (XState), protocols or tokenizers as state machines rules out impossible transitions.', sDFA()),
    item('toc-nfa', 'NFA와 부분집합 구성', 'NFA · Subset construction', '한 입력에 여러 갈래로 동시에 갈 수 있는 오토마타예요. 어느 한 갈래라도 받아들이면 받아들여요. 항상 같은 일을 하는 DFA로 바꿀 수 있어요.', '정규식 엔진은 정규식을 NFA로 만들고, 필요하면 DFA로 바꿔 빠르게 실행해요(RE2, Rust regex).', 'An automaton that can follow several branches at once and accepts if any branch does; every NFA has an equivalent DFA.', 'Regex engines compile patterns to NFAs and often to DFAs for speed (RE2, Rust regex).', sNFA()),
    item('toc-regex', '정규 표현식', 'Regular expressions', '정규식은 유한 오토마타로 바뀌어 실행돼요. 반복, 선택, 생략으로 문자열 패턴을 표현해요.', '백트래킹 엔진에서 (a+)+ 같은 패턴은 지수 시간이 걸려 서비스를 멈출 수 있어요(ReDoS). 사용자 입력엔 타임아웃이나 안전한 엔진을 쓰세요.', 'A regex compiles into a finite automaton and describes string patterns with repetition, choice and optional parts.', 'In backtracking engines, patterns like (a+)+ can take exponential time and stall services (ReDoS); use timeouts or safe engines for user input.', sRegex()),
    item('toc-pda', '푸시다운 오토마타', 'Pushdown automaton', '유한 오토마타에 스택을 하나 더한 기계예요. 괄호 짝 맞추기처럼 중첩 구조를 판정할 수 있어요.', '프로그래밍 언어의 중첩된 블록·괄호를 파서가 처리하는 원리예요. 정규식으로 중첩 구조를 완벽히 다룰 수 없는 이유이기도 해요.', 'A finite automaton plus a stack, which lets it recognise nested structures like balanced brackets.', 'It is how parsers handle nested blocks and brackets, and why regexes can’t fully handle nesting.', sPDA()),
    item('toc-chomsky', '촘스키 위계', 'Chomsky hierarchy', '언어(문자열 집합)를 정규 ⊂ 문맥 자유 ⊂ 문맥 의존 ⊂ 재귀 열거로 나누고, 각각을 처리하는 기계가 정해져 있어요.', '토큰은 정규식, 문법은 문맥 자유 파서로 나눠 처리하는 컴파일러 구조가 여기서 나와요.', 'Languages nest as regular ⊂ context-free ⊂ context-sensitive ⊂ recursively enumerable, each with a matching machine.', 'Compilers split work accordingly: regexes for tokens, context-free parsers for grammar.', sChomsky()),
    item('toc-cfg', '문맥 자유 문법과 파스 트리', 'Context-free grammar · Parse tree', '"E → E + T"처럼 기호를 다른 기호들로 바꾸는 규칙으로 언어를 정의하고, 문장을 이 규칙으로 펼친 나무가 파스 트리예요.', '연산자 우선순위와 결합 방향이 문법 구조로 정해져요. JSON·SQL·프로그래밍 언어 파서와 ANTLR 같은 도구가 이걸 써요.', 'Rules such as “E → E + T” define a language; expanding a sentence by those rules gives its parse tree.', 'Operator precedence and associativity fall out of the grammar. JSON, SQL and language parsers and tools like ANTLR use this.', sCFG())
  ].concat(XT.add['toc-auto'] || [])),
  sec('toc-compute', '계산 가능성', 'Computability', '계산 가능성', 'Computability',
    '컴퓨터가 원리적으로 풀 수 있는 것과 없는 것의 경계예요.', 'The line between what computers can and can’t solve in principle.', [
    item('toc-turing', '튜링 기계', 'Turing machine', '무한한 테이프, 읽고 쓰는 헤드, 상태 규칙만으로 된 가상의 기계예요. 계산 가능한 모든 것을 할 수 있다고 여겨져요.', '어떤 언어가 "튜링 완전"하다는 건 이 기계만큼 계산할 수 있다는 뜻이에요. 엑셀 수식, CSS+HTML, 마인크래프트 회로도 튜링 완전해요.', 'An imaginary machine with an infinite tape, a read/write head and state rules, believed able to compute anything computable.', '“Turing complete” means as powerful as this machine; even spreadsheet formulas and Minecraft redstone qualify.', sTuring()),
    item('toc-halting', '정지 문제', 'Halting problem', '임의의 프로그램이 멈출지 무한히 돌지 항상 정확히 판정하는 프로그램은 존재할 수 없어요. 자기 자신을 넣으면 모순이 생기거든요.', '완벽한 무한 루프 탐지기나 모든 버그를 찾는 정적 분석기가 불가능한 이유예요. 실제 도구는 근사와 타임아웃으로 타협해요.', 'No program can always correctly decide whether an arbitrary program halts; feeding it to itself produces a contradiction.', 'It is why perfect infinite-loop detectors or bug finders can’t exist; real tools settle for approximations and timeouts.', sHalting())
  ].concat(XT.add['toc-compute'] || [])),
  sec('toc-cx', '복잡도', 'Complexity', '계산 복잡도', 'Computational complexity',
    '문제를 풀 수 있는지보다 얼마나 빨리 풀 수 있는지를 다뤄요.', 'Not whether a problem can be solved, but how fast.', [
    item('toc-bigo', '빅오 표기법', 'Big-O notation', '입력 크기 n이 커질 때 시간이나 메모리가 얼마나 빨리 늘어나는지를 가장 큰 항으로 나타내요.', 'n이 작으면 상수가 중요하지만, 데이터가 커지면 증가율이 모든 걸 결정해요. 10만 건에 O(n²)은 이미 위험해요.', 'Describes how fast time or memory grows with input size n, keeping only the dominant term.', 'Constants matter for small n, but growth rate decides everything at scale; O(n²) on 100,000 items is already dangerous.', sBigO()),
    item('toc-pnp', 'P vs NP', 'P vs NP', 'P는 빨리 풀 수 있는 문제, NP는 답이 맞는지 빨리 확인할 수 있는 문제예요. 둘이 같은지는 아직 아무도 몰라요.', '"NP-완전"이라는 말을 들으면 정확한 최적해 대신 근사·휴리스틱·제약 완화를 찾아야 한다는 신호예요.', 'P is problems solvable quickly; NP is problems whose answers can be checked quickly. Whether they are equal is unknown.', 'Hearing “NP-complete” is your cue to look for approximations, heuristics or relaxed constraints instead of exact optimums.', sPNP()),
    item('toc-tsp', '외판원 문제와 근사', 'Travelling salesman · Heuristics', '모든 도시를 한 번씩 들르는 최단 경로를 찾는 NP-난해 문제예요. 경우의 수가 n!로 늘어서 큰 n은 정확히 풀 수 없어요.', '배달·물류·칩 배선은 그리디, 2-opt, 유전 알고리즘, OR-Tools 같은 솔버로 "충분히 좋은" 답을 찾아요.', 'Finding the shortest route through every city is NP-hard; routes grow like n!, so large instances can’t be solved exactly.', 'Delivery, logistics and chip wiring use greedy, 2-opt, genetic algorithms or solvers like OR-Tools for good-enough answers.', sTSP())
  ].concat(XT.add['toc-cx'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.tc-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.tc-big .in{font-size:1.05em;font-weight:800}
.tc-big2 .in{font-size:1.25em;font-weight:900;color:var(--ink)}
.tc-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.tc-head{display:grid!important;place-items:center}
.tc-head .in{font-size:1.4em}`;
})();
