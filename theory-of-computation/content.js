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

window.UX = page([
  sec('toc-auto', '오토마타', 'Automata', '오토마타와 형식 언어', 'Automata and formal languages',
    '입력을 읽고 받아들일지 정하는 추상 기계예요. 정규식, 파서, 상태 관리의 이론적 바탕이에요.', 'Abstract machines that read input and decide whether to accept it; the theory behind regex, parsers and state management.', [
    item('toc-dfa', 'DFA (결정적 유한 오토마타)', 'DFA · Deterministic finite automaton', '유한 개의 상태와 "이 상태에서 이 글자를 읽으면 저 상태로" 규칙만으로 입력을 판정하는 기계예요. 기억은 현재 상태 하나뿐이에요.', '주문·결제 상태, UI 상태(XState), 프로토콜 처리, 토크나이저를 상태 기계로 설계하면 불가능한 전이를 원천 차단해요.', 'A machine with finitely many states and “in this state, on this symbol, go there” rules; its only memory is the current state.', 'Modelling order flows, UI state (XState), protocols or tokenizers as state machines rules out impossible transitions.', sDFA()),
    item('toc-nfa', 'NFA와 부분집합 구성', 'NFA · Subset construction', '한 입력에 여러 갈래로 동시에 갈 수 있는 오토마타예요. 어느 한 갈래라도 받아들이면 받아들여요. 항상 같은 일을 하는 DFA로 바꿀 수 있어요.', '정규식 엔진은 정규식을 NFA로 만들고, 필요하면 DFA로 바꿔 빠르게 실행해요(RE2, Rust regex).', 'An automaton that can follow several branches at once and accepts if any branch does; every NFA has an equivalent DFA.', 'Regex engines compile patterns to NFAs and often to DFAs for speed (RE2, Rust regex).', sNFA()),
    item('toc-regex', '정규 표현식', 'Regular expressions', '정규식은 유한 오토마타로 바뀌어 실행돼요. 반복, 선택, 생략으로 문자열 패턴을 표현해요.', '백트래킹 엔진에서 (a+)+ 같은 패턴은 지수 시간이 걸려 서비스를 멈출 수 있어요(ReDoS). 사용자 입력엔 타임아웃이나 안전한 엔진을 쓰세요.', 'A regex compiles into a finite automaton and describes string patterns with repetition, choice and optional parts.', 'In backtracking engines, patterns like (a+)+ can take exponential time and stall services (ReDoS); use timeouts or safe engines for user input.', sRegex()),
    item('toc-pda', '푸시다운 오토마타', 'Pushdown automaton', '유한 오토마타에 스택을 하나 더한 기계예요. 괄호 짝 맞추기처럼 중첩 구조를 판정할 수 있어요.', '프로그래밍 언어의 중첩된 블록·괄호를 파서가 처리하는 원리예요. 정규식으로 중첩 구조를 완벽히 다룰 수 없는 이유이기도 해요.', 'A finite automaton plus a stack, which lets it recognise nested structures like balanced brackets.', 'It is how parsers handle nested blocks and brackets, and why regexes can’t fully handle nesting.', sPDA()),
    item('toc-chomsky', '촘스키 위계', 'Chomsky hierarchy', '언어(문자열 집합)를 정규 ⊂ 문맥 자유 ⊂ 문맥 의존 ⊂ 재귀 열거로 나누고, 각각을 처리하는 기계가 정해져 있어요.', '토큰은 정규식, 문법은 문맥 자유 파서로 나눠 처리하는 컴파일러 구조가 여기서 나와요.', 'Languages nest as regular ⊂ context-free ⊂ context-sensitive ⊂ recursively enumerable, each with a matching machine.', 'Compilers split work accordingly: regexes for tokens, context-free parsers for grammar.', sChomsky()),
    item('toc-cfg', '문맥 자유 문법과 파스 트리', 'Context-free grammar · Parse tree', '"E → E + T"처럼 기호를 다른 기호들로 바꾸는 규칙으로 언어를 정의하고, 문장을 이 규칙으로 펼친 나무가 파스 트리예요.', '연산자 우선순위와 결합 방향이 문법 구조로 정해져요. JSON·SQL·프로그래밍 언어 파서와 ANTLR 같은 도구가 이걸 써요.', 'Rules such as “E → E + T” define a language; expanding a sentence by those rules gives its parse tree.', 'Operator precedence and associativity fall out of the grammar. JSON, SQL and language parsers and tools like ANTLR use this.', sCFG())
  ]),
  sec('toc-compute', '계산 가능성', 'Computability', '계산 가능성', 'Computability',
    '컴퓨터가 원리적으로 풀 수 있는 것과 없는 것의 경계예요.', 'The line between what computers can and can’t solve in principle.', [
    item('toc-turing', '튜링 기계', 'Turing machine', '무한한 테이프, 읽고 쓰는 헤드, 상태 규칙만으로 된 가상의 기계예요. 계산 가능한 모든 것을 할 수 있다고 여겨져요.', '어떤 언어가 "튜링 완전"하다는 건 이 기계만큼 계산할 수 있다는 뜻이에요. 엑셀 수식, CSS+HTML, 마인크래프트 회로도 튜링 완전해요.', 'An imaginary machine with an infinite tape, a read/write head and state rules, believed able to compute anything computable.', '“Turing complete” means as powerful as this machine; even spreadsheet formulas and Minecraft redstone qualify.', sTuring()),
    item('toc-halting', '정지 문제', 'Halting problem', '임의의 프로그램이 멈출지 무한히 돌지 항상 정확히 판정하는 프로그램은 존재할 수 없어요. 자기 자신을 넣으면 모순이 생기거든요.', '완벽한 무한 루프 탐지기나 모든 버그를 찾는 정적 분석기가 불가능한 이유예요. 실제 도구는 근사와 타임아웃으로 타협해요.', 'No program can always correctly decide whether an arbitrary program halts; feeding it to itself produces a contradiction.', 'It is why perfect infinite-loop detectors or bug finders can’t exist; real tools settle for approximations and timeouts.', sHalting())
  ]),
  sec('toc-cx', '복잡도', 'Complexity', '계산 복잡도', 'Computational complexity',
    '문제를 풀 수 있는지보다 얼마나 빨리 풀 수 있는지를 다뤄요.', 'Not whether a problem can be solved, but how fast.', [
    item('toc-bigo', '빅오 표기법', 'Big-O notation', '입력 크기 n이 커질 때 시간이나 메모리가 얼마나 빨리 늘어나는지를 가장 큰 항으로 나타내요.', 'n이 작으면 상수가 중요하지만, 데이터가 커지면 증가율이 모든 걸 결정해요. 10만 건에 O(n²)은 이미 위험해요.', 'Describes how fast time or memory grows with input size n, keeping only the dominant term.', 'Constants matter for small n, but growth rate decides everything at scale; O(n²) on 100,000 items is already dangerous.', sBigO()),
    item('toc-pnp', 'P vs NP', 'P vs NP', 'P는 빨리 풀 수 있는 문제, NP는 답이 맞는지 빨리 확인할 수 있는 문제예요. 둘이 같은지는 아직 아무도 몰라요.', '"NP-완전"이라는 말을 들으면 정확한 최적해 대신 근사·휴리스틱·제약 완화를 찾아야 한다는 신호예요.', 'P is problems solvable quickly; NP is problems whose answers can be checked quickly. Whether they are equal is unknown.', 'Hearing “NP-complete” is your cue to look for approximations, heuristics or relaxed constraints instead of exact optimums.', sPNP()),
    item('toc-tsp', '외판원 문제와 근사', 'Travelling salesman · Heuristics', '모든 도시를 한 번씩 들르는 최단 경로를 찾는 NP-난해 문제예요. 경우의 수가 n!로 늘어서 큰 n은 정확히 풀 수 없어요.', '배달·물류·칩 배선은 그리디, 2-opt, 유전 알고리즘, OR-Tools 같은 솔버로 "충분히 좋은" 답을 찾아요.', 'Finding the shortest route through every city is NP-hard; routes grow like n!, so large instances can’t be solved exactly.', 'Delivery, logistics and chip wiring use greedy, 2-opt, genetic algorithms or solvers like OR-Tools for good-enough answers.', sTSP())
  ])
]);
window.UX[0].css += `
.tc-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.tc-big .in{font-size:1.05em;font-weight:800}
.tc-big2 .in{font-size:1.25em;font-weight:900;color:var(--ink)}
.tc-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.tc-head{display:grid!important;place-items:center}
.tc-head .in{font-size:1.4em}`;
})();
