(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C } = CZ;
CZ.tr({"const x = \"전역\"": "const x = \"global\""});
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c pl-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const code = (S, k, x, y, w, t, st, h) => cell(S, k, x, y, t, { w, h: h || 2, cls: 'cz-c pl-code', s: st });

/* ---------- implementation ---------- */
function sCompile() {
  const S = scene({ id: 'pl-compile', steps: 6, per: 1.2 });
  const L = [['소스 코드', 'Source'], ['토큰 (어휘 분석)', 'Tokens (lexing)'], ['AST (구문 분석)', 'AST (parsing)'], ['최적화', 'Optimize'], ['기계어', 'Machine code']];
  L.forEach((l, i) => { text(S, 'l' + i, .8, 1.6 + i * 3.7, l, { cls: 'cz-t pl-b', s: i ? hid() : {} }); if (i) S.set('l' + i, i, { opacity: '1' }); });
  code(S, 'src', 10, 1.1, 21, 'let x = 2 + 3;', {}, 2.2);
  ['let', 'x', '=', '2', '+', '3', ';'].forEach((t, i) => { chip(S, 'tk' + i, 10 + i * 3, 4.8, 2.6, t, hid(i === 0 ? C.soft : ['2', '3'].includes(t) ? C.cmp : {}), { h: 2.2 }); S.set('tk' + i, 1, { opacity: '1' }); });
  const N = { as: [20, 8.6, '='], x: [15, 11.2, 'x'], pl: [25, 11.2, '+'], a: [22.4, 13.6, '2'], b: [27.6, 13.6, '3'] };
  [['as', 'x'], ['as', 'pl'], ['pl', 'a'], ['pl', 'b']].forEach(([p, c]) => { edge(S, 'e' + c, N[p][0], N[p][1], N[c][0], N[c][1], { s: hid() }); S.set('e' + c, 2, { opacity: '1' }); });
  Object.entries(N).forEach(([k, [x, y, l]]) => { node(S, 'n' + k, x, y, l, { r: 1, s: hid() }); S.set('n' + k, 2, { opacity: '1' }); });
  ['npl', 'na', 'nb', 'epl', 'ea', 'eb'].forEach(k => S.set(k, 3, { opacity: '.15' }));
  pill(S, 'fold', 22.4, 10.2, ['2+3 → 5 (상수 접기)', '2+3 → 5 (constant folding)'], { w: 9, h: 1.8, s: hid(C.ok) }); S.set('fold', 3, { opacity: '1' });
  code(S, 'asm', 10, 16.4, 21, 'mov dword [x], 5', hid(C.soft), 2.2); S.set('asm', 4, { opacity: '1' });
  S.cap(0, '사람이 쓴 코드가', 'The code you write').cap(1, '의미 있는 단어(토큰)로 쪼개지고', 'is split into tokens').cap(2, '문법 구조(추상 구문 트리)가 돼요', 'which become a syntax tree (AST)')
    .cap(3, '미리 계산할 수 있는 건 계산해 두고', 'computable parts are folded ahead of time').cap(4, 'CPU가 실행할 명령어로 바뀌어요', 'then turned into CPU instructions')
    .cap(6, 'Babel·TypeScript·ESLint·Prettier도 같은 단계(파싱→AST)를 써요', 'Babel, TypeScript, ESLint and Prettier use the same parse → AST steps');
  return S;
}
function sInterp() {
  const S = scene({ id: 'pl-interp', steps: 4, per: 1.5 });
  const u = 1.9, x0 = 9;
  [[['컴파일러', 'Compiler'], 'C · Go · Rust', 2.6], [['인터프리터', 'Interpreter'], 'Python · Ruby', 9.2], ['JIT', 'Java · JS(V8)', 15.8]].forEach(([l, ex, y], i) => { text(S, 'l' + i, .8, y + .2, l, { cls: 'cz-t pl-b' }); text(S, 'e' + i, .8, y + 1.7, ex, { cls: 'cz-t' }); });
  gantt(S, 'a', [[['전체 번역', 'compile'], 0, 4, C.cmp, 1], [['빠른 실행', 'fast run'], 4, 10, C.ok, 1]], x0, 2.6, u, 2.6);
  gantt(S, 'b', [[['한 줄씩 해석하며 실행 (느림)', 'interpret line by line (slower)'], 0, 11.5, C.soft, 2]], x0, 9.2, u, 2.6);
  gantt(S, 'c', [[['해석', 'interp'], 0, 3, C.soft, 3], [['자주 쓰는 코드 번역', 'compile hot code'], 3, 5, C.cmp, 3], [['빠른 실행', 'fast'], 5, 9, C.ok, 3]], x0, 15.8, u, 2.6);
  S.cap(1, '컴파일러: 미리 전부 번역 · 실행이 빠르고 배포 파일이 생겨요', 'Compiler: translate everything first · fast to run, ships a binary').cap(2, '인터프리터: 바로 실행 · 시작은 빠르지만 실행은 느려요', 'Interpreter: run right away · quick to start, slower to run')
    .cap(3, 'JIT: 실행하면서 자주 쓰는 부분만 기계어로 · 둘의 장점', 'JIT: compile hot paths while running · the best of both').cap(4, '그래서 JS·Java는 "워밍업" 후에 빨라져요', 'Which is why JS and Java speed up after warm-up');
  return S;
}

/* ---------- types ---------- */
function sStatic() {
  const S = scene({ id: 'pl-static', steps: 5, per: 1.3 });
  text(S, 'h1', .8, 1, ['정적 타입 (TypeScript·Java)', 'Static (TypeScript, Java)'], { cls: 'cz-t pl-b' });
  code(S, 'c1', .8, 2.6, 14.6, 'add(1, "2")', {}, 2.4);
  S.el('sq', { x: 6.6, y: 4.4, w: 4.2, h: .3, css: 'border-radius:1em', s: hid({ background: 'var(--danger)' }) }); S.set('sq', 1, { opacity: '1' });
  pill(S, 'e1', .8, 6, ['저장하자마자 에디터가 빨간 줄 ✗', 'red squiggle as you type ✗'], { w: 14.6, h: 2, s: hid(C.bad) }); S.set('e1', 1, { opacity: '1' });
  text(S, 'h2', 16.6, 1, ['동적 타입 (Python·JS)', 'Dynamic (Python, JS)'], { cls: 'cz-t pl-b' });
  code(S, 'c2', 16.6, 2.6, 14.6, 'add(1, "2")', {}, 2.4);
  pill(S, 'ok2', 16.6, 6, ['실행 전엔 문제없어 보여요', 'looks fine before running'], { w: 14.6, h: 2, s: hid(C.ok) }); S.set('ok2', 2, { opacity: '1' }).set('ok2', 3, { opacity: '0' });
  pill(S, 'e2', 16.6, 6, ['실행 중 사용자가 그 줄에 닿으면 에러 ✗', 'crashes when a user hits that line ✗'], { w: 14.6, h: 2, s: hid(C.badf) }); S.set('e2', 3, { opacity: '1' });
  text(S, 'n', .8, 11, ['타입 추론: let n = 5 만 써도 number로 알아요', 'type inference: let n = 5 is known to be a number'], { cls: 'cz-t', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, '정적 타입은 실행 전에 타입 오류를 잡아요', 'Static typing catches type errors before running').cap(2, '동적 타입은 실행해 봐야 알아요', 'Dynamic typing finds out at runtime').cap(3, '운영 중에 터질 수 있어요', 'possibly in production')
    .cap(4, '요즘 정적 언어는 추론으로 타입을 덜 써도 돼요', 'Modern static languages infer most types').cap(5, '큰 코드베이스·팀일수록 정적 타입이 리팩터링을 안전하게 해요', 'The bigger the codebase, the more static types make refactoring safe');
  return S;
}
function sCoerce() {
  const S = scene({ id: 'pl-coerce', steps: 6, per: 1.15 });
  const R = [["'1' + 1", "'11'", C.bad], ["'5' - 2", '3', C.cmp], ["0 == ''", 'true', C.bad], ['null == undefined', 'true', C.cmp], ["0 === ''", 'false', C.ok]];
  R.forEach(([a, b, st], i) => { code(S, 'a' + i, 2, 1.6 + i * 3.2, 15, a, hid(), 2.4); chip(S, 'b' + i, 19, 1.6 + i * 3.2, 11, b, hid(st), { h: 2.4 }); arrow(S, 'r' + i, 17.2, 2.8 + i * 3.2, 18.8, 2.8 + i * 3.2, { s: hid() }); show(S, ['a' + i, 'b' + i, 'r' + i], i + 1); });
  S.cap(1, 'JS는 문자열 + 숫자를 문자열로 이어 붙이고', 'JS joins string + number as text').cap(2, '빼기는 숫자로 바꿔 계산해요', 'but subtraction converts to numbers').cap(3, '== 는 타입을 맞추려 몰래 변환해요', '== silently converts types')
    .cap(5, '=== 는 타입까지 비교 · 항상 이걸 쓰세요', '=== also compares types · use it always').cap(6, '약한 타입 변환은 편하지만 버그의 단골 원인 (강타입: Python·Rust)', 'Implicit coercion is convenient but bug-prone (strongly typed: Python, Rust)');
  return S;
}
function sGeneric() {
  const S = scene({ id: 'pl-generic', steps: 5, per: 1.3 });
  box(S, 'tpl', 9, 1.4, 14, 5, '', { s: C.soft }); text(S, 'tt', 9, 2, 'class Box&lt;T&gt;', { w: 14, cls: 'cz-t cz-tc cz-mono pl-b' }); text(S, 'tv', 9, 3.8, 'value: T', { w: 14, cls: 'cz-t cz-tc cz-mono' });
  const inst = [['bn', 1.6, 'Box<number>', 'value: 42', 1, C.ok], ['bs', 17.6, 'Box<string>', 'value: "hi"', 2, C.ok]];
  inst.forEach(([k, x, n, v, st, c]) => { box(S, k, x, 9.4, 12.8, 5, '', { s: hid(c) }); text(S, k + 'n', x, 10, n.replace(/</g, '&lt;'), { w: 12.8, cls: 'cz-t cz-tc cz-mono pl-b', s: hid() }); text(S, k + 'v', x, 11.8, v, { w: 12.8, cls: 'cz-t cz-tc cz-mono', s: hid() }); link(S, k + 'l', [16, 6.4], [x + 6.4, 9.4], 0, .1, { s: hid() }); show(S, [k, k + 'n', k + 'v', k + 'l'], st); });
  pill(S, 'err', 1.6, 15.6, ['Box<number>에 "hi"를 넣으면 컴파일 에러 ✗'.replace(/</g, '&lt;'), 'putting "hi" in Box<number> fails to compile ✗'.replace(/</g, '&lt;')], { w: 28.8, h: 2, s: hid(C.bad) }); S.set('err', 3, { opacity: '1' });
  S.cap(0, '타입을 매개변수로 받는 틀을 하나 만들어', 'Write one template that takes a type parameter').cap(1, '숫자 상자로도', 'Use it as a number box').cap(2, '문자열 상자로도 써요', 'or a string box')
    .cap(3, '복사·붙여넣기 없이 재사용하면서 타입 안전성도 지켜요', 'Reuse without copy-paste, and keep type safety').cap(5, 'List<T>, Map<K,V>, Promise<T>가 모두 제네릭'.replace(/</g, '&lt;'), 'List<T>, Map<K,V> and Promise<T> are all generics'.replace(/</g, '&lt;'));
  return S;
}
function sNull() {
  const S = scene({ id: 'pl-null', steps: 5, per: 1.3 });
  const CH = [['user', 1.6], ['.address', 9.4], ['.city', 18.6]];
  [['a', 2.4, 'user.address.city', 3], ['b', 11.6, 'user?.address?.city', 2]].forEach(([p, y, t]) => { code(S, p + 'c', 1.6, y, 16, t, {}, 2.2); });
  CH.forEach(([t, x], i) => { chip(S, 'x' + i, x, 5.6, 8, t, hid(i === 0 ? C.ok : i === 1 ? C.bad : {}), { h: 2.2 }); });
  S.label('xv', { cls: 'cz-t cz-mono', x: 9.4, y: 8.2, w: 9 }, [[0, ''], [1, '= null']]);
  show(S, ['x0'], 1); show(S, ['x1'], 1);
  pill(S, 'ea', 18.6, 2.4, 'TypeError ✗', { w: 12, h: 2.2, cls: 'cz-pill cz-mono', s: hid(C.badf) }); S.set('ea', 2, { opacity: '1' });
  pill(S, 'eb', 18.6, 11.6, ['undefined (멈추지 않음) ✓', 'undefined (no crash) ✓'], { w: 12, h: 2.2, s: hid(C.ok) }); S.set('eb', 3, { opacity: '1' });
  code(S, 'k', 1.6, 15.4, 29, ['Kotlin String? · Swift Optional · TS strictNullChecks', 'Kotlin String? · Swift Optional · TS strictNullChecks'], hid(C.soft), 2.2); S.set('k', 4, { opacity: '1' });
  S.cap(1, '주소 정보가 없는 사용자라면', 'For a user without an address').cap(2, 'null의 속성을 읽는 순간 프로그램이 죽어요', 'reading a property of null crashes').cap(3, '?. 는 null이면 거기서 멈추고 undefined를 돌려줘요', '?. stops at null and returns undefined')
    .cap(4, 'null이 될 수 있는지를 타입으로 표시하면 컴파일러가 확인해 줘요', 'Marking nullability in types lets the compiler check it').cap(5, '"10억 달러짜리 실수" · null 체크 누락은 가장 흔한 런타임 에러', 'The “billion-dollar mistake”: missing null checks are the most common crash');
  return S;
}

/* ---------- memory & execution ---------- */
function sStackHeap() {
  const S = scene({ id: 'pl-stackheap', steps: 6, per: 1.15 });
  text(S, 'sl', 1.4, 1, ['스택', 'Stack'], { cls: 'cz-t pl-b' }); text(S, 'hl', 17.4, 1, ['힙', 'Heap'], { cls: 'cz-t pl-b' });
  box(S, 'st', 1.4, 2.6, 13, 16, '', { css: 'background:transparent;border-top:0;border-radius:0 0 .8em .8em' }); box(S, 'hp', 17.4, 2.6, 13.4, 16, '', { css: 'background:transparent;border-style:dashed' });
  chip(S, 'a', 2.2, 15.8, 11.4, 'a = 10', hid(C.soft), { h: 2.2 }); S.set('a', 1, { opacity: '1' });
  chip(S, 'p', 2.2, 13.2, 11.4, 'p = 0x7f30 →', hid(C.soft), { h: 2.2 }); S.set('p', 2, { opacity: '1' });
  chip(S, 'o', 19, 4.4, 10.4, '{ name: "Kim" }', hid(C.cmp), { h: 3 }); S.set('o', 2, { opacity: '1' });
  arrow(S, 'pr', 13.8, 14.3, 18.8, 6, { s: hid(AR.acc) }); S.set('pr', 2, { opacity: '1' });
  box(S, 'fr', 2, 6.4, 11.8, 6.2, '', { s: hid({ background: 'var(--accent-soft)' }) }); text(S, 'frl', 2.6, 6.8, ['함수 f() 프레임', 'frame of f()'], { cls: 'cz-t', s: hid() }); chip(S, 'q', 2.6, 9, 10.6, 'q = 0x8a10 →', hid(C.soft), { h: 2.2 });
  chip(S, 'o2', 19, 10, 10.4, '[1, 2, 3]', hid(C.cmp), { h: 3 }); arrow(S, 'qr', 13.4, 10.1, 18.8, 11.3, { s: hid(AR.acc) });
  show(S, ['fr', 'frl', 'q', 'o2', 'qr'], 3);
  ['fr', 'frl', 'q', 'qr'].forEach(k => S.set(k, 4, { opacity: '0' })); S.set('o2', 4, { opacity: '.35' });
  text(S, 'g', 19, 13.6, ['아무도 안 가리킴 → GC 대상', 'unreferenced → garbage'], { cls: 'cz-t', s: hid() }); S.set('g', 4, { opacity: '1' }).set('o2', 5, { opacity: '0' }).set('g', 5, { opacity: '0' });
  S.cap(1, '작은 값은 스택에 바로', 'Small values live on the stack').cap(2, '객체는 힙에, 스택엔 주소(참조)만', 'Objects live on the heap; the stack holds a reference').cap(3, '함수를 부르면 프레임이 쌓이고', 'A call pushes a frame')
    .cap(4, '끝나면 프레임은 바로 사라져요 · 힙의 객체는 남아요', 'which vanishes on return; heap objects remain').cap(5, '아무도 가리키지 않는 힙 객체는 GC가 치워요', 'Unreferenced heap objects are garbage collected')
    .cap(6, '스택은 빠르고 자동, 힙은 유연하지만 관리 비용이 있어요', 'The stack is fast and automatic; the heap is flexible but costs management');
  return S;
}
function sValue() {
  const S = scene({ id: 'pl-value', steps: 5, per: 1.3 });
  code(S, 'f', 1.4, 1.2, 29, 'function f(n, arr) { n = 99; arr.push(4) }', {}, 2.2);
  text(S, 'cl', 1.4, 4.6, ['호출한 쪽', 'caller'], { cls: 'cz-t pl-b' }); text(S, 'fl', 17.4, 4.6, ['함수 안', 'inside f'], { cls: 'cz-t pl-b' });
  S.label('n', { cls: 'cz-c pl-m', x: 1.4, y: 6.4, w: 12, h: 2.4 }, [[0, 'x = 1']]);
  S.label('n2', { cls: 'cz-c pl-m', x: 17.4, y: 6.4, w: 12, h: 2.4, s: { opacity: '0' } }, [[0, 'n = 1'], [2, 'n = 99']]);
  ['n2~0', 'n2~1'].forEach(k => Object.assign(S.get(k).s, { opacity: '0' })); S.set('n2~0', 1, { opacity: '1' }).set('n2~0', 2, { opacity: '0' }).set('n2~1', 2, { opacity: '1' });
  Object.assign(S.get('n2~1').s, C.cmp);
  chip(S, 'r1', 1.4, 11, 12, 'list →', {}, { h: 2.4 }); chip(S, 'r2', 17.4, 11, 12, 'arr →', hid(), { h: 2.4 }); S.set('r2', 1, { opacity: '1' });
  S.label('obj', { cls: 'cz-c pl-m', x: 9.4, y: 15.6, w: 12, h: 2.6, s: C.soft }, [[0, '[1, 2, 3]'], [3, '[1, 2, 3, 4]']]); Object.assign(S.get('obj~1').s, C.cmp);
  arrow(S, 'p1', 7.4, 13.6, 11.4, 15.4, { s: AR.acc }); arrow(S, 'p2', 23.4, 13.6, 19.4, 15.4, { s: hid(AR.acc) }); S.set('p2', 1, { opacity: '1' });
  S.label('res', { cls: 'cz-t pl-b', x: 1.4, y: 19, w: 30 }, [[0, ''], [4, ['x는 그대로 1 (값 복사) · list는 4가 추가됨 (같은 객체)', 'x stays 1 (copied) · list gained 4 (same object)']]]);
  S.cap(1, 'f(x, list)를 부르면 숫자는 값이 복사되고, 배열은 주소가 복사돼요', 'f(x, list): the number is copied; the array’s reference is copied').cap(2, '함수 안에서 n을 바꿔도 x는 그대로', 'Changing n leaves x alone')
    .cap(3, '배열을 고치면 같은 객체라 바깥도 바뀌어요', 'Mutating the array changes the caller’s too').cap(5, '원본을 지키려면 복사본(spread, structuredClone)을 넘기세요', 'Pass a copy (spread, structuredClone) to protect the original');
  return S;
}
function sGC() {
  const S = scene({ id: 'pl-gc', steps: 5, per: 1.3 });
  box(S, 'root', 1.2, 8.2, 5.4, 3.4, ['루트', 'Roots'], { s: C.cur });
  const P = { A: [11, 4], B: [11, 14], Cc: [19, 4], D: [19, 14], E: [27, 9], F: [27, 17] };
  const E = [['root', 'A'], ['root', 'B'], ['A', 'Cc'], ['B', 'D'], ['E', 'F'], ['F', 'E']];
  E.forEach(([a, b]) => { const pa = a === 'root' ? [6.6, 9.9] : P[a]; link(S, 'e' + a + b, pa, P[b], a === 'root' ? 0 : 1.3, 1.3); });
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k === 'Cc' ? 'C' : k, { r: 1.3 }));
  ['A', 'B'].forEach(k => S.set(k, 1, C.ok)); ['Cc', 'D'].forEach(k => S.set(k, 2, C.ok));
  ['E', 'F'].forEach(k => S.set(k, 3, C.bad)); ['E', 'F', 'eEF', 'eFE'].forEach(k => S.set(k, 4, { opacity: '0' }));
  S.label('ph', { cls: 'cz-t pl-b', x: 1, y: 19.4, w: 30 }, [[0, ''], [1, ['① 표시: 루트에서 닿는 객체를 따라가며 표시', '① Mark: follow references from the roots']], [3, ['닿지 않는 E, F (서로만 가리킴)', 'E and F are unreachable (they only point at each other)']], [4, ['② 정리: 표시 안 된 것을 해제', '② Sweep: free everything unmarked']]]);
  S.cap(0, '루트 = 전역 변수·스택에 있는 참조', 'Roots are globals and references on the stack').cap(2, '연결된 것은 모두 살아 있어요', 'Everything reachable is alive')
    .cap(3, '순환 참조라도 루트에서 못 닿으면 쓰레기', 'Even a cycle is garbage if roots can’t reach it').cap(4, '메모리를 회수해요', 'Their memory is reclaimed')
    .cap(5, 'GC가 도는 동안 멈춤(STW)이 생겨 지연 튀는 원인이 돼요', 'Stop-the-world pauses during GC cause latency spikes');
  return S;
}
function sRC() {
  const S = scene({ id: 'pl-refcount', steps: 6, per: 1.15 });
  const P = { A: [8, 5], B: [24, 5], X: [8, 14], Y: [24, 14] };
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.6 }));
  const cnt = (k, list) => { S.label('c' + k, { cls: 'cz-pill', x: P[k][0] + 1.8, y: P[k][1] - 3, w: 2.6, h: 1.6, s: C.soft }, list); };
  cnt('A', [[0, '1'], [1, '0']]); cnt('B', [[0, '1'], [2, '0']]); cnt('X', [[0, '2'], [3, '1']]); cnt('Y', [[0, '2'], [3, '1']]);
  link(S, 'xy', P.X, P.Y, 1.7, 1.7); link(S, 'yx', [P.Y[0], P.Y[1] + .8], [P.X[0], P.X[1] + .8], 1.7, 1.7);
  text(S, 'v1', 1, 1.4, ['변수 a → A', 'var a → A'], { cls: 'cz-t cz-mono' }); text(S, 'v2', 22, 1.4, ['변수 b → B', 'var b → B'], { cls: 'cz-t cz-mono' }); text(S, 'v3', 1, 10, ['변수 → X', 'var → X'], { cls: 'cz-t cz-mono' }); text(S, 'v4', 23, 10, ['변수 → Y', 'var → Y'], { cls: 'cz-t cz-mono' });
  S.set('A', 1, { opacity: '.15' }).set('v1', 1, { opacity: '.3' }); S.set('B', 2, { opacity: '.15' }).set('v2', 2, { opacity: '.3' });
  S.set('v3', 3, { opacity: '.3' }).set('v4', 3, { opacity: '.3' }); S.set('X', 3, C.bad).set('Y', 3, C.bad);
  S.label('n', { cls: 'cz-t pl-b', x: 1, y: 18, w: 30 }, [[0, ''], [1, ['참조가 0이 되는 순간 즉시 해제', 'freed the instant the count hits 0']], [3, ['서로 가리키면 1에서 멈춰 영원히 남아요 (누수)', 'a cycle stays at 1 forever (leak)']], [5, ['한쪽을 약한 참조(weak)로 → 해결', 'make one side weak → fixed']]]);
  S.cap(1, '각 객체가 몇 곳에서 가리키는지 세요', 'Each object counts its references').cap(3, '변수를 없애도 X와 Y는 서로를 가리켜요', 'Drop the variables, and X and Y still point at each other')
    .cap(5, 'Swift ARC, Python, C++ shared_ptr이 이 방식 · 순환은 weak로 끊어요', 'Swift ARC, Python and C++ shared_ptr work this way; break cycles with weak refs');
  return S;
}
function sScope() {
  const S = scene({ id: 'pl-scope', steps: 5, per: 1.3 });
  const B = [['g', 1, 1.2, 30, 18.4, ['전역', 'global'], 'const x = "전역"'], ['o', 3, 5.6, 26, 13, 'function outer()', 'const y = "outer"'], ['i', 5, 10, 22, 7.6, 'function inner()', 'console.log(x, y, z)']];
  B.forEach(([k, x, y, w, h, l, v], i) => { S.el(k, { x, y, w, h, css: 'border-radius:1em;border:.14em solid var(--line)', s: { background: ['var(--ui)', 'var(--accent-soft)', 'color-mix(in srgb,var(--ok) 18%,var(--ui))'][i] } }); text(S, k + 'l', x + .8, y + .5, l, { cls: 'cz-t pl-b' }); text(S, k + 'v', x + .8, y + 2.1, v, { cls: 'cz-t cz-mono' }); });
  const look = [['z', 'i', 1, C.bad], ['y', 'o', 2, C.ok], ['x', 'g', 3, C.ok]];
  pill(S, 'q', 16, 12.6, ['z? 못 찾음 → 에러', 'z? not found → error'], { w: 10, h: 1.8, s: hid(C.bad) });
  S.set('i', 1, { 'border-color': 'var(--warn)' }).set('o', 2, { 'border-color': 'var(--warn)' }).set('g', 3, { 'border-color': 'var(--warn)' });
  S.set('iv', 1, C.cmp);
  S.label('lk', { cls: 'cz-t pl-b', x: 7, y: 15.2, w: 22 }, [[0, ''], [1, ['inner에서 먼저 찾고', 'look in inner first']], [2, ['없으면 바깥 outer에서 y 발견', 'not there → outer has y']], [3, ['더 바깥 전역에서 x 발견', 'further out → global has x']], [4, ['z는 끝까지 없어서 ReferenceError', 'z is nowhere → ReferenceError']]]);
  S.set('q', 4, { opacity: '1' });
  S.cap(0, '변수는 선언된 위치(코드 구조)로 범위가 정해져요', 'Scope is set by where code is written (lexical scope)').cap(1, '안쪽에서 바깥쪽으로 차례로 찾아요 (스코프 체인)', 'Lookups go from inner to outer (the scope chain)')
    .cap(4, '바깥에선 안쪽 변수를 볼 수 없어요', 'Outer code can’t see inner variables').cap(5, '전역 변수는 어디서나 바뀔 수 있어 최소로', 'Keep globals to a minimum: anything can change them');
  return S;
}
function sClosure() {
  const S = scene({ id: 'pl-closure', steps: 6, per: 1.15 });
  code(S, 'c', 1, 1, 30, 'function makeCounter(){ let count = 0; return () => ++count }', {}, 2.2);
  const mk = (k, x, lab, st) => { box(S, k, x, 5.2, 13, 8.6, '', { s: hid(C.soft) }); text(S, k + 'l', x, 5.8, lab, { w: 13, cls: 'cz-t cz-tc cz-mono pl-b', s: hid() }); box(S, k + 'bp', x + 1.4, 8.2, 10.2, 4.2, '', { s: hid(C.cmp) }); text(S, k + 'bl', x + 1.4, 8.6, ['가방 (환경)', 'backpack (env)'], { w: 10.2, cls: 'cz-t cz-tc', s: hid() }); show(S, [k, k + 'l', k + 'bp', k + 'bl'], st); };
  mk('a', 1.4, 'counterA', 1); mk('b', 17.6, 'counterB', 4);
  S.label('av', { cls: 'cz-t cz-tc cz-mono pl-big', x: 2.8, y: 10.3, w: 10.2 }, [[0, ''], [1, 'count = 0'], [2, 'count = 1'], [3, 'count = 2']]);
  S.label('bv', { cls: 'cz-t cz-tc cz-mono pl-big', x: 19, y: 10.3, w: 10.2 }, [[0, ''], [4, 'count = 0'], [5, 'count = 1']]);
  S.label('call', { cls: 'cz-t cz-mono pl-b', x: 1.4, y: 15.4, w: 30 }, [[0, ''], [2, 'counterA() → 1'], [3, 'counterA() → 2'], [5, ['counterB() → 1 (따로 세요)', 'counterB() → 1 (independent)']]]);
  S.cap(1, '함수가 만들어질 때 주변 변수를 가방에 담아 가요', 'A function packs its surrounding variables into a backpack').cap(2, 'makeCounter가 끝나도 count는 살아 있어요', 'count lives on after makeCounter returns')
    .cap(4, '새로 만들면 가방도 새로', 'A new call creates a new backpack').cap(6, '외부에서 직접 못 건드리는 비공개 상태 · React 훅·이벤트 핸들러의 기반', 'Private state no one else can touch · the basis of React hooks and handlers');
  return S;
}

/* ---------- concurrency ---------- */
function sAsync() {
  const S = scene({ id: 'pl-async', steps: 4, per: 1.5 });
  const P = [[['콜백 지옥', 'Callback hell'], ['getUser(id, (u) => {', '  getOrders(u, (o) => {', '    getItem(o[0], (i) => {', '      render(i) }) }) })'], C.bad], ['Promise', ['getUser(id)', '  .then(getOrders)', '  .then(o => getItem(o[0]))', '  .then(render)'], C.cmp], ['async / await', ['const u = await getUser(id)', 'const o = await getOrders(u)', 'const i = await getItem(o[0])', 'render(i)'], C.ok]];
  P.forEach(([t, lines, st], i) => { const x = .8 + i * 10.4; text(S, 't' + i, x, 1, t, { cls: 'cz-t pl-b', s: hid() }); box(S, 'b' + i, x, 2.6, 10, 11, '', { s: hid(st) }); lines.forEach((l, j) => text(S, `l${i}${j}`, x + .5, 3.4 + j * 2.2, l, { cls: 'cz-t cz-mono pl-xs', s: hid() })); show(S, ['t' + i, 'b' + i, ...lines.map((_, j) => `l${i}${j}`)], i + 1); });
  text(S, 'n', .8, 15.6, ['셋 다 같은 일을 해요 · 기다리는 동안 스레드는 다른 일을 해요', 'All three do the same work · the thread is free while waiting'], { cls: 'cz-t', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, '콜백을 중첩하면 오른쪽으로 끝없이 들어가요', 'Nested callbacks march off to the right').cap(2, 'Promise로 체인을 만들면 평평해지고', 'Promise chains flatten it').cap(3, 'async/await는 동기 코드처럼 읽혀요', 'async/await reads like synchronous code')
    .cap(4, '서로 상관없는 요청은 Promise.all로 동시에 보내세요', 'Fire independent requests together with Promise.all');
  return S;
}
function sCoroutine() {
  const S = scene({ id: 'pl-coroutine', steps: 5, per: 1.3 });
  text(S, 'l1', .8, 1, ['OS 스레드: 하나에 ~1MB, 수천 개가 한계', 'OS threads: ~1 MB each, thousands max'], { cls: 'cz-t pl-b' });
  for (let i = 0; i < 4; i++) { S.el('t' + i, { cls: 'cz-c', x: 1 + i * 7.6, y: 2.8, w: 7, h: 4.2, html: ['스레드 ', 'thread '].map(t => t + (i + 1)), s: hid(C.cmp) }); S.set('t' + i, 1, { opacity: '1' }); }
  text(S, 'l2', .8, 8.8, ['코루틴: 몇 KB, 수십만 개도 가능', 'coroutines: a few KB, hundreds of thousands'], { cls: 'cz-t pl-b', s: hid() }); S.set('l2', 2, { opacity: '1' });
  for (let i = 0; i < 60; i++) { S.el('c' + i, { x: 1 + (i % 20) * 1.5, y: 10.6 + Math.floor(i / 20) * 1.5, w: 1.1, h: 1.1, css: 'border-radius:50%', s: hid({ background: 'var(--accent)' }) }); S.set('c' + i, 2, { opacity: '1' }); }
  S.el('lane', { x: 1, y: 16.4, w: 30, h: 2.2, css: 'border-radius:.4em;border:.12em solid var(--line)' }); text(S, 'll', 1, 18.9, ['스레드 1개 위에서 await 지점마다 번갈아 실행', 'one thread switching at each await'], { cls: 'cz-t', s: hid() }); S.set('ll', 3, { opacity: '1' });
  const seg = [[0, 4, C.soft], [4, 7, C.ok], [7, 10, C.cmp], [10, 13, C.soft], [13, 17, C.ok], [17, 20, C.cmp]];
  seg.forEach(([a, b, st], i) => { S.el('s' + i, { cls: 'cz-c', x: 1.1 + a * 1.49, y: 16.5, w: (b - a) * 1.49, h: 2, css: 'transform-origin:0 50%', s: Object.assign({ transform: 'scaleX(0)' }, st) }); S.set('s' + i, 3 + Math.floor(i / 3), { transform: 'none' }); });
  S.cap(1, '스레드는 OS가 강제로 번갈아 실행해요 (선점형)', 'The OS preempts threads to take turns').cap(2, '코루틴은 아주 가벼워서 엄청 많이 만들 수 있어요', 'Coroutines are tiny, so you can have huge numbers')
    .cap(3, '스스로 양보(yield·await)할 때만 바뀌어요 (협력형)', 'They switch only when they yield or await (cooperative)').cap(5, 'Go 고루틴, Kotlin 코루틴, Python asyncio, Java 가상 스레드', 'Go goroutines, Kotlin coroutines, Python asyncio, Java virtual threads');
  return S;
}
function sException() {
  const S = scene({ id: 'pl-exception', steps: 6, per: 1.15 });
  const F = [['main()', ''], ['order()', 'try { … } catch'], ['pay()', ''], ['charge()', ['throw 잔액 부족', 'throw InsufficientFunds']]];
  F.forEach(([n, t], i) => { const y = 16 - i * 3.6; chip(S, 'f' + i, 4, y, 14, n, hid(i === 1 ? C.soft : {}), { h: 3, cls: 'pl-big' }); if (t) text(S, 'ft' + i, 19, y + .9, t, { cls: 'cz-t cz-mono' + (i === 3 ? '' : ''), s: hid() }); S.set('f' + i, i + 1 > 3 ? 3 : i + 1 === 4 ? 3 : Math.min(i + 1, 3), { opacity: '1' }); if (t) S.set('ft' + i, Math.min(i + 1, 3), { opacity: '1' }); });
  S.set('f3', 3, { opacity: '1' });
  S.set('f3', 4, C.badf); dot(S, 'ex', 2.4, 6.7, '!', { r: 1, s: hid(C.badf) }); S.set('ex', 4, { opacity: '1' }).move('ex', 5, 2.4 - 1, 10.3 - 1).set('f3', 5, { opacity: '0' }).set('f2', 5, C.bad);
  S.move('ex', 6, 2.4 - 1, 13.9 - 1).set('f2', 6, { opacity: '0' }).set('f1', 6, C.ok).set('ex', 6, C.ok);
  text(S, 'n', 19, 10.8, ['여기서 잡아 처리 ✓', 'caught and handled here ✓'], { cls: 'cz-t pl-b', s: hid() }); S.set('n', 6, { opacity: '1' });
  S.cap(1, '함수가 차례로 호출되며 스택이 쌓이고', 'Calls stack up').cap(4, '맨 위에서 예외가 던져지면', 'An exception is thrown at the top').cap(5, 'catch를 만날 때까지 프레임을 하나씩 버리며 올라가요', 'Frames unwind until a catch is found')
    .cap(6, '잡지 못하면 프로그램 종료 · 예외를 삼키지 말고 의미 있게 처리하세요', 'Uncaught means a crash · never swallow exceptions silently');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'plx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono plx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono plx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c plx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono plx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c plx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'plx-s plx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono plx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono plx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono plx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono plx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono plx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'plx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'plx-xs', 5));


const CSSX = `
.plx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.plx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.plx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.plx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.plx-r .in{color:var(--danger);font-weight:800}
.plx-g .in{color:var(--ok);font-weight:800}
.plx-a .in{color:var(--accent);font-weight:800}
.plx-w .in{color:var(--warn);font-weight:800}
.plx-c .in{font-size:.6em;font-weight:700}
.plx-c2 .in{font-size:.5em;font-weight:700}
.plx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.plx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

/* ---- stack helper: cells stacked bottom-up ---- */
const stackCell = (S, k, x, base, i, label, color, st, off, o = {}) => box2(S, k, x, base - (i + 1) * (o.h || 1.7), o.w || 5, (o.h || 1.7) - .15, label, color, st, { pct: o.pct || 30, off });

/* ================= implementation extras ================= */
function sBytecode() {
  const S = scene({ id: 'pl-bytecode', steps: 5, per: 1.5 });
  T(S, 'src', 1, .8, 'x = (2 + 3) * 4', 'cz-mono plx-s plx-a');
  code(S, 'bc', 1, 2.4, 10, ['PUSH 2', 'PUSH 3', 'ADD', 'PUSH 4', 'MUL', 'STORE x'], [[1, 1], [2, 2], [4, 3], [5, 4]], { hoff: 5 });
  T(S, 'bcl', 1, 11.2, ['바이트코드 (가상 기계용 명령어)', 'bytecode (instructions for a virtual machine)'], 'plx-xs');
  frame(S, 'stk', 13.6, 3, 5.8, 9.6, 'ink-3', 0, { r: .3, w: .12 }); T(S, 'stl', 13.6, 12.9, ['피연산자 스택', 'operand stack'], 'cz-tc plx-xs', 0, { w: 5.8 });
  stackCell(S, 's2', 14, 12.4, 0, '2', 'accent', 1, 2); stackCell(S, 's3', 14, 12.4, 1, '3', 'accent', 1, 2);
  stackCell(S, 's5', 14, 12.4, 0, '5', 'warn', 2, 4); stackCell(S, 's4', 14, 12.4, 1, '4', 'accent', 3, 3);
  stackCell(S, 's20', 14, 12.4, 0, '20', 'ok', 3, 4, { pct: 40 });
  box2(S, 'var', 23, 4, 7, 2.2, 'x = 20', 'ok', 4, { pct: 35 }); T(S, 'varl', 23, 6.5, ['지역 변수 칸', 'local variable slot'], 'cz-tc plx-xs', 4, { w: 7 });
  [['PUSH: 값을 스택 위에 올려요', 'PUSH puts a value on top of the stack'], ['ADD: 위의 두 개를 꺼내 더한 값을 다시 올려요', 'ADD pops two values and pushes their sum'], ['PUSH 4, MUL → 20', 'PUSH 4, MUL → 20'], ['STORE: 스택 꼭대기를 변수에 저장', 'STORE saves the top of the stack into a variable']].forEach((t, i) => T(S, 'n' + i, 1, 14.4, t, 'plx-s', i + 1, { off: i + 2 }));
  fin(S, 'z', 14.4, [['소스를 기계어 대신 가상 기계의 바이트코드로 → 어디서나 같은 VM이 실행', 'compile to bytecode for a virtual machine instead of machine code → the same VM runs it anywhere', 'plx-xs plx-a'], ['JVM · CPython · WebAssembly는 스택 기계, Lua · Dalvik은 레지스터 기계', 'the JVM, CPython and WebAssembly are stack machines; Lua and Dalvik are register machines'], ['자주 도는 바이트코드는 JIT가 기계어로 다시 번역해 빠르게 만들어요', 'hot bytecode is recompiled to machine code by a JIT']]);
  S.cap(1, '두 값을 스택에 올려요', 'Push two values').cap(2, 'ADD가 둘을 꺼내 더해요', 'ADD pops and adds').cap(3, '곱하기까지', 'Then multiply').cap(4, '결과를 변수에 저장', 'Store the result').cap(5, '바이트코드와 스택 가상 기계', 'Bytecode and stack virtual machines');
  return S;
}
function sEval() {
  const S = scene({ id: 'pl-eval', steps: 5, per: 1.5 });
  code(S, 'c1', 1, 1.2, 14.4, ['def first(a, b): return a', 'first(1, slow())'], [], { st: 1 });
  box2(S, 'e1', 17, 1.4, 6.6, 1.6, ['1 계산 ✓', '1 evaluated ✓'], 'ok', 1, { pct: 30 }); box2(S, 'e2', 24.2, 1.4, 6.8, 1.6, ['slow() 계산 ✗ 낭비', 'slow() evaluated ✗'], 'danger', 1, { pct: 30 });
  T(S, 'e3', 17, 3.4, ['조급한 평가: 인자를 먼저 다 계산', 'eager: arguments are computed first'], 'plx-xs', 1);
  code(S, 'c2', 1, 5.4, 14.4, ['user && user.name'], [], { st: 2 });
  box2(S, 'f1', 17, 5.6, 6.6, 1.6, 'user = null', 'warn', 2, { pct: 30 }); box2(S, 'f2', 24.2, 5.6, 6.8, 1.6, ['user.name 건너뜀', 'user.name skipped'], 'line', 2, { pct: 40 });
  T(S, 'f3', 17, 7.6, ['단락 평가: 앞에서 결과가 정해지면 멈춰요', 'short-circuit: stop once the result is known'], 'plx-xs', 2);
  code(S, 'c3', 1, 9.6, 14.4, [['nums = [1..]        -- 무한', 'nums = [1..]        -- infinite'], 'take 3 (map (*2) nums)'], [], { st: 3 });
  for (let i = 0; i < 7; i++) box2(S, 'lz' + i, 17 + i * 2, 9.8, 1.8, 1.6, i < 3 ? String((i + 1) * 2) : '…', i < 3 ? 'ok' : 'line', 3, { pct: i < 3 ? 35 : 30 });
  T(S, 'lz', 17, 11.8, ['지연 평가: 필요한 3개만 계산 · 나머지는 약속(thunk)으로', 'lazy: only the 3 needed values are computed'], 'plx-xs plx-g', 3);
  box2(S, 'th', 17, 13.4, 6, 1.6, 'thunk', 'warn', 4, { pct: 30 }); ar(S, 'tha', [23.1, 14.2], [24.6, 14.2], 'ink-3', 4, { h: .1 }); box2(S, 'thv', 24.7, 13.4, 6, 1.6, ['값 (캐시)', 'value (cached)'], 'ok', 4, { pct: 35 });
  T(S, 'thl', 1, 13.8, ['한 번 계산한 thunk는 값으로 바꿔 두고 다시 안 계산해요', 'once forced, a thunk is replaced by its value and never recomputed'], 'plx-xs', 4);
  fin(S, 'z', 16.2, [['대부분의 언어(JS · Python · Java)는 조급한 평가 + 단락 평가(&&, ||, and, or)', 'most languages (JS, Python, Java) are eager, plus short-circuit &&, ||, and, or', 'plx-xs plx-a'], ['Haskell은 기본이 지연 평가 · 다른 언어는 제너레이터·스트림·lazy 값으로 흉내 내요', 'Haskell is lazy by default · others emulate it with generators, streams and lazy values'], ['지연 평가는 부수 효과의 순서를 예측하기 어렵게 만들어요', 'laziness makes the order of side effects harder to predict']]);
  S.cap(1, '조급한 평가', 'Eager evaluation').cap(2, '단락 평가', 'Short-circuit evaluation').cap(3, '지연 평가', 'Lazy evaluation').cap(4, '한 번만 계산 (메모이제이션)', 'Computed only once (memoized)').cap(5, '평가 전략', 'Evaluation strategies');
  return S;
}
function sDispatch() {
  const S = scene({ id: 'pl-dispatch', steps: 5, per: 1.5 });
  box2(S, 'an', 10, 1, 8, 1.8, 'Animal.speak()', 'ink-3', 1, { pct: 22 }); box2(S, 'dg', 3, 4.4, 8, 1.8, 'Dog.speak() 🐶', 'accent', 1, { pct: 25 }); box2(S, 'ct', 17, 4.4, 8, 1.8, 'Cat.speak() 🐱', 'warn', 1, { pct: 25 });
  ar(S, 'i1', [7, 4.3], [12, 2.9], 'ink-3', 1, { h: .1 }); ar(S, 'i2', [21, 4.3], [16, 2.9], 'ink-3', 1, { h: .1 });
  box2(S, 'o1', 1, 8.4, 6, 2.6, ['Dog 객체', 'a Dog'], 'accent', 2, { pct: 18 }); T(S, 'o1v', 1.3, 10.3, 'vptr', 'cz-mono plx-xs plx-a', 2);
  box2(S, 'o2', 1, 12, 6, 2.6, ['Cat 객체', 'a Cat'], 'warn', 2, { pct: 18 }); T(S, 'o2v', 1.3, 13.9, 'vptr', 'cz-mono plx-xs plx-w', 2);
  box2(S, 'vt1', 11, 8.4, 8, 2.2, ['Dog vtable: [0] → Dog::speak', 'Dog vtable: [0] → Dog::speak'], 'accent', 2, { pct: 30 }); box2(S, 'vt2', 11, 12, 8, 2.2, ['Cat vtable: [0] → Cat::speak', 'Cat vtable: [0] → Cat::speak'], 'warn', 2, { pct: 30 });
  ar(S, 'p1', [7.1, 9.7], [10.9, 9.5], 'accent', 2, { h: .12 }); ar(S, 'p2', [7.1, 13.3], [10.9, 13.1], 'warn', 2, { h: .12 });
  code(S, 'cl', 20.6, 8.2, 10.4, ['Animal a = pick();', 'a.speak();'], [[1, 3]], { st: 3 });
  T(S, 's1', 20.6, 11.4, ['① a의 vptr을 읽고', '① load a’s vptr'], 'plx-xs', 3); T(S, 's2', 20.6, 12.5, ['② vtable[0]을 읽고', '② load vtable[0]'], 'plx-xs', 3); T(S, 's3', 20.6, 13.6, ['③ 그 주소를 호출', '③ call that address'], 'plx-xs plx-g', 3);
  tsets(S, 'vt1', [[3, 'accent', 55]]);
  T(S, 'cost', 1, 15.4, ['간접 호출 1번 = 메모리 읽기 2번 · 인라인이 막혀요 → JIT는 인라인 캐시로 흔한 타입을 바로 호출', 'one indirect call = two memory loads and no inlining → JITs use inline caches for the common type'], 'plx-xs', 4);
  notes(S, 'n', 17, [['같은 speak()인데 타입마다 다르게 동작해요', 'the same speak() behaves differently per type'], ['객체는 자기 클래스의 함수 표(vtable)를 가리키는 포인터를 품어요', 'each object holds a pointer to its class’s function table (vtable)'], ['실행 중에 표를 거쳐 실제 함수를 찾아 불러요 (동적 디스패치)', 'at run time the call goes through the table (dynamic dispatch)'], ['정적 디스패치보다 살짝 느려서 컴파일러·JIT가 줄이려 애써요', 'slightly slower than static dispatch, so compilers and JITs try to remove it']], 'plx-xs');
  fin(S, 'z', 17, [['C++ virtual · Java(기본이 가상) · C# virtual · Rust dyn Trait(팻 포인터)', 'C++ virtual, Java (virtual by default), C# virtual, Rust dyn Trait (fat pointers)', 'plx-xs plx-a'], ['Python · JS는 사전(딕셔너리)·히든 클래스로 메서드를 찾아요', 'Python and JS look methods up in dictionaries or hidden classes']]);
  S.cap(1, '하나의 메서드, 여러 구현', 'One method, many implementations').cap(2, '객체 → vtable 포인터', 'Objects point to vtables').cap(3, '표를 거쳐 호출', 'Call through the table').cap(4, '비용과 최적화', 'Cost and optimizations').cap(5, '동적 디스패치와 vtable', 'Dynamic dispatch and vtables');
  return S;
}
function sMacro() {
  const S = scene({ id: 'pl-macro', steps: 5, per: 1.5 });
  code(S, 'd', 1, 1.2, 14, ['#define SQ(x) x * x', 'int r = SQ(1 + 2);'], [], { st: 1 });
  T(S, 'ex', 1, 4.6, ['텍스트 그대로 바꿔치기 →', 'plain text substitution →'], 'plx-xs plx-r', 2); code(S, 'e', 1, 5.8, 14, ['int r = 1 + 2 * 1 + 2;'], [], { st: 2 });
  T(S, 'res', 1, 8, ['곱셈이 먼저 → r = 5 ✗ (기대값 9)', 'multiplication binds first → r = 5 ✗ (expected 9)'], 'plx-s plx-r', 3);
  T(S, 'fx', 1, 9.4, ['C에서는 괄호로 막아요: #define SQ(x) ((x) * (x))', 'in C, parenthesize: #define SQ(x) ((x) * (x))'], 'cz-mono plx-xs', 3);
  T(S, 'ah', 17, 1.2, ['구문 트리 매크로 (Rust · Lisp)', 'syntax-tree macros (Rust, Lisp)'], 'plx-xs plx-g', 4);
  stt(S, 'm', 23.5, 4.6, '*', 'ok', 4, { r: .9 }); stt(S, 'p1', 20.5, 8, '+', 'accent', 4, { r: .9 }); stt(S, 'p2', 26.5, 8, '+', 'accent', 4, { r: .9 });
  seg(S, 'e1', [23.5, 4.6], [20.5, 8], 4, 'ink-3', .1); seg(S, 'e2', [23.5, 4.6], [26.5, 8], 4, 'ink-3', .1);
  [[19, 11], [22, 11], [25, 11], [28, 11]].forEach(([x, y], i) => { stt(S, 'l' + i, x, y, i % 2 ? '2' : '1', 'ink-3', 4, { r: .8 }); seg(S, 'f' + i, [i < 2 ? 20.5 : 26.5, 8], [x, y], 4, 'ink-3', .1); });
  T(S, 'ar', 17, 12.8, ['(1 + 2) 덩어리가 통째로 들어가 → 9 ✓', 'the (1 + 2) subtree goes in whole → 9 ✓'], 'plx-xs plx-g', 4);
  notes(S, 'n', 14.6, [['매크로: 컴파일 전에 코드를 다른 코드로 바꿔 주는 규칙', 'a macro rewrites code into other code before compiling'], ['C 전처리기는 글자 그대로 붙여 넣어요', 'the C preprocessor pastes text literally'], ['그래서 연산자 우선순위가 엉켜 엉뚱한 값이 나와요', 'so operator precedence tangles and the value is wrong'], ['구문 트리 단위 매크로는 식을 한 덩어리로 다뤄 안전해요 (위생적 매크로)', 'syntax-tree macros treat expressions as units, so they are safe (hygienic macros)']], 'plx-xs');
  fin(S, 'z', 14.6, [['Rust macro_rules! · #[derive], Lisp defmacro, Scala·Kotlin 컴파일러 플러그인', 'Rust macro_rules! and #[derive], Lisp defmacro, Scala and Kotlin compiler plugins', 'plx-xs plx-a'], ['반복 코드 자동 생성(직렬화, 테스트), DSL 만들기에 써요 · 남용하면 디버깅이 어려워요', 'used to generate boilerplate (serialization, tests) and build DSLs · overuse hurts debugging']]);
  S.cap(1, '매크로 정의', 'Defining a macro').cap(2, '글자 그대로 펼쳐요', 'It expands as raw text').cap(3, '결과가 틀려요', 'The result is wrong').cap(4, '트리 단위 매크로는 안전', 'Tree-based macros are safe').cap(5, '매크로와 메타프로그래밍', 'Macros and metaprogramming');
  return S;
}

/* ================= types extras ================= */
function sMono() {
  const S = scene({ id: 'pl-mono', steps: 5, per: 1.5 });
  code(S, 'g', 1, 1.2, 16, ['<T extends Comparable<T>>', 'T max(T a, T b) { … }', 'max(3, 7); max("a", "b");'], [], { st: 1 });
  T(S, 'eh', 1, 6, ['타입 소거 (Java)', 'type erasure (Java)'], 'plx-s plx-w', 2);
  box2(S, 'e1', 1, 7.4, 13, 1.8, 'Comparable max(Comparable a, …)', 'warn', 2, { pct: 25 });
  T(S, 'e2', 1, 9.6, ['기계 코드 1벌 · 호출하는 쪽에 형 변환 삽입', 'one compiled copy · casts inserted at call sites'], 'plx-xs', 2); T(S, 'e3', 1, 10.8, ['실행 중엔 T를 몰라요: List<String>인지 검사 불가', 'T is gone at run time: can’t test for List<String>'], 'plx-xs plx-r', 2);
  T(S, 'mh', 17, 6, ['단형화 (C++ · Rust)', 'monomorphization (C++, Rust)'], 'plx-s plx-g', 3);
  box2(S, 'm1', 17, 7.4, 14, 1.8, 'max_i32(i32, i32)', 'ok', 3, { pct: 25 }); box2(S, 'm2', 17, 9.6, 14, 1.8, 'max_str(&str, &str)', 'ok', 3, { pct: 25 });
  T(S, 'm3', 17, 11.8, ['타입마다 전용 코드: 빠름 ✓ · 바이너리는 커져요', 'per-type code: fast ✓, bigger binaries'], 'plx-xs', 3);
  T(S, 'rf', 1, 13.6, ['C#·.NET은 실행 중에도 T를 아는 “구체화된” 제네릭: 값 타입은 따로, 참조 타입은 공유', 'C#/.NET generics are reified: T is known at run time, value types specialized, reference types shared'], 'plx-xs plx-a', 4);
  notes(S, 'n', 15.4, [['하나의 제네릭 함수를 여러 타입으로 불러요', 'one generic function, called with several types'], ['소거: 타입 정보를 지우고 하나로 컴파일', 'erasure: drop the type parameters and compile once'], ['단형화: 쓰인 타입마다 복사해서 컴파일', 'monomorphization: compile a copy per type used'], ['세 번째 길: 런타임에 타입을 유지하는 구체화', 'a third way: reification keeps types at run time']], 'plx-s');
  fin(S, 'z', 15.4, [['소거는 하위 호환과 작은 코드, 단형화는 속도, 구체화는 그 사이의 균형', 'erasure buys compatibility and small code, monomorphization speed, reification a balance', 'plx-xs plx-a'], ['Go 제네릭은 GC 모양별로 묶는 절충(GC shape stenciling)을 써요', 'Go generics compromise with GC-shape stenciling']]);
  S.cap(1, '하나의 제네릭 함수', 'One generic function').cap(2, '소거: 한 벌로', 'Erasure: one copy').cap(3, '단형화: 타입마다', 'Monomorphization: one per type').cap(4, '구체화된 제네릭', 'Reified generics').cap(5, '제네릭은 어떻게 구현될까', 'How generics are implemented');
  return S;
}
function sVariance() {
  const S = scene({ id: 'pl-subtype', steps: 5, per: 1.5 });
  box2(S, 'an', 2, 1.2, 7, 1.6, 'Animal', 'ink-3', 0, { pct: 22 }); box2(S, 'dg', 2, 4.4, 7, 1.6, 'Dog', 'accent', 0, { pct: 25 }); ar(S, 'sb', [5.5, 4.3], [5.5, 2.9], 'ink-3', 0, { h: .12 });
  T(S, 'sbl', 9.6, 3.2, ['Dog <: Animal (Dog은 Animal 자리에 쓸 수 있어요)', 'Dog <: Animal (a Dog can stand in for an Animal)'], 'plx-xs', 0);
  T(S, 'c1', 1, 7, ['읽기 전용 목록: ReadonlyList<Dog> → ReadonlyList<Animal> ✓', 'read-only list: ReadonlyList<Dog> → ReadonlyList<Animal> ✓'], 'cz-mono plx-xs plx-g', 1);
  T(S, 'c1n', 1, 8.1, ['꺼내기만 하니 Dog를 Animal로 봐도 안전 → 공변(같은 방향)', 'only reading, so treating Dogs as Animals is safe → covariant'], 'plx-xs', 1);
  code(S, 'bad', 1, 9.6, 18, ['Dog[] dogs = new Dog[1];', ['Animal[] as = dogs;   // 자바 배열은 공변', 'Animal[] as = dogs;   // Java arrays are covariant'], 'as[0] = new Cat();    // 💥 ArrayStoreException'], [], { st: 2 });
  T(S, 'badn', 20, 10, ['넣기까지 하면 Dog 목록에 Cat이 들어가요', 'with writes, a Cat sneaks into a Dog list'], 'plx-xs plx-r', 2); T(S, 'badn2', 20, 11.2, ['→ 변경 가능한 List<T>는 무변', '→ a mutable List<T> must be invariant'], 'plx-xs plx-r', 2);
  T(S, 'ct', 1, 14, ['Comparator<Animal>은 Comparator<Dog> 자리에 OK → 반공변(반대 방향)', 'a Comparator<Animal> works where a Comparator<Dog> is needed → contravariant'], 'cz-mono plx-xs plx-a', 3);
  T(S, 'ctn', 1, 15.1, ['함수의 인자 자리는 반공변, 반환 자리는 공변이에요', 'function parameters are contravariant, return types covariant'], 'plx-xs', 3);
  T(S, 'pe', 1, 16.6, ['PECS: Producer Extends, Consumer Super · Kotlin out T / in T · C# out / in', 'PECS: Producer Extends, Consumer Super · Kotlin out T / in T · C# out / in'], 'cz-mono plx-xs plx-g', 4);
  fin(S, 'z', 17.9, [['변성 = “부품 타입의 관계가 컨테이너 타입에 어떻게 전해지나”의 규칙', 'variance says how subtyping of parts carries over to the container', 'plx-xs plx-a'], ['TypeScript 메서드 인자는 이변(bivariant)이라 일부 버그를 못 잡아요 (strictFunctionTypes로 보완)', 'TypeScript method parameters are bivariant and miss some bugs (strictFunctionTypes helps)']]);
  S.cap(1, '꺼내기만 하면 공변', 'Read-only containers are covariant').cap(2, '넣을 수 있으면 깨져요', 'Writable ones break').cap(3, '소비자는 반공변', 'Consumers are contravariant').cap(4, '선언하는 문법', 'Declaring variance').cap(5, '서브타이핑과 변성', 'Subtyping and variance');
  return S;
}
function sAdt() {
  const S = scene({ id: 'pl-adt', steps: 5, per: 1.5 });
  code(S, 'd', 1, 1.2, 15, ['enum Shape {', '  Circle(r),', '  Rect(w, h),', '  Tri(a, b, c),', '}'], [], { st: 1 });
  [['Circle(1.0)', 'accent'], ['Rect(2, 3)', 'warn'], ['Tri(3, 4, 5)', 'ok']].forEach(([t, c], i) => box2(S, 'v' + i, 18, 1.4 + i * 2.2, 8, 1.8, t, c, 2, { pct: 28 }));
  T(S, 'vl', 18, 8.2, ['값은 셋 중 정확히 하나 (합 타입)', 'a value is exactly one of the three (a sum type)'], 'plx-xs', 2);
  code(S, 'm', 1, 9.4, 15, ['match s {', '  Circle(r) => π·r²,', '  Rect(w, h) => w·h,', '  Tri(a,b,c) => heron(a,b,c),', '}'], [[2, 3]], { st: 3, hoff: 4 });
  code(S, 'm2', 17, 9.4, 14, ['match s {', '  Circle(r) => π·r²,', '  Rect(w, h) => w·h,', '}'], [], { st: 4 });
  T(S, 'err', 17, 15, ['✗ 컴파일 오류: Tri가 빠졌어요', '✗ compile error: Tri not covered'], 'plx-s plx-r', 4);
  T(S, 'opt', 1, 16.4, ['null 대신 Option<T> = Some(x) | None → 빈 값 처리를 강제', 'instead of null, Option<T> = Some(x) | None forces you to handle absence'], 'plx-xs plx-g', 4);
  notes(S, 'n', 17.8, [['도형은 원·사각형·삼각형 중 하나', 'a shape is a circle, rectangle or triangle'], ['각 경우가 자기 데이터를 들고 다녀요', 'each case carries its own data'], ['패턴 매칭으로 경우마다 꺼내 계산해요', 'pattern matching takes each case apart'], ['빠뜨린 경우는 컴파일러가 잡아 줘요 (빠짐 검사)', 'the compiler flags any missing case (exhaustiveness)']], 'plx-xs');
  fin(S, 'z', 17.8, [['Rust enum · Swift enum · Kotlin sealed class · TS 판별 유니온 · Haskell data', 'Rust enums, Swift enums, Kotlin sealed classes, TS discriminated unions, Haskell data', 'plx-xs plx-a'], ['곱 타입(구조체: A 그리고 B) + 합 타입(A 또는 B) = 대수적 자료형', 'product types (structs: A and B) + sum types (A or B) = algebraic data types']]);
  S.cap(1, '경우를 나열한 타입', 'A type that lists its cases').cap(2, '값은 그중 하나', 'A value is one of them').cap(3, '패턴 매칭', 'Pattern matching').cap(4, '빠짐없이 다뤘는지 검사', 'Exhaustiveness checking').cap(5, '대수적 자료형과 패턴 매칭', 'Algebraic data types and pattern matching');
  return S;
}
function sStructural() {
  const S = scene({ id: 'pl-structural', steps: 5, per: 1.5 });
  T(S, 'nh', 1, .8, ['명목적 타입 (Java · C#)', 'nominal typing (Java, C#)'], 'plx-s plx-w', 1);
  code(S, 'n', 1, 2, 14.4, ['interface Named { String name(); }', 'class User { String name() {…} }', 'Named n = new User(); // ✗'], [[2, 1]], { st: 1 });
  T(S, 'nn', 1, 6.6, ['모양이 같아도 implements를 선언해야 해요', 'same shape, but it must declare implements'], 'plx-xs plx-r', 1);
  T(S, 'sh', 17, .8, ['구조적 타입 (TypeScript · Go)', 'structural typing (TypeScript, Go)'], 'plx-s plx-g', 2);
  code(S, 's', 17, 2, 14, ['interface Named { name: string }', 'const u = { name: "Ann", age: 3 }', 'const n: Named = u; // ✓'], [[2, 2]], { st: 2 });
  T(S, 'sn', 17, 6.6, ['필요한 필드만 있으면 통과 (모양이 곧 타입)', 'having the needed fields is enough (shape is type)'], 'plx-xs plx-g', 2);
  code(S, 'g', 1, 8.6, 14.4, ['type Stringer interface {', '  String() string', ['}  // 선언 없이 메서드만 맞으면 됨', '}  // matching methods are enough']], [], { st: 3 });
  T(S, 'gn', 1, 13, ['Go: 인터페이스를 몰라도 메서드만 맞으면 구현한 것', 'Go: matching methods implement an interface implicitly'], 'plx-xs', 3);
  code(S, 'p', 17, 8.6, 14, ['def greet(x):', ['  return x.name()  # 실행할 때 확인', '  return x.name()  # checked at run time']], [], { st: 4 });
  T(S, 'pn', 17, 11.6, ['덕 타이핑 (Python · Ruby): 실행 중에 확인', 'duck typing (Python, Ruby): checked at run time'], 'plx-xs plx-a', 4);
  fin(S, 'z', 15, [['명목적: 의도를 명시, 우연한 일치를 막아요 · 구조적: 유연하고 재사용이 쉬워요', 'nominal: explicit intent, no accidental matches · structural: flexible and easy to reuse', 'plx-xs plx-a'], ['TS에서 명목성이 필요하면 “브랜드 타입”(type UserId = string & {__brand})을 써요', 'TS emulates nominal types with “branded” types (type UserId = string & {__brand})']]);
  S.cap(1, '명목적: 이름과 선언으로', 'Nominal: by name and declaration').cap(2, '구조적: 모양으로', 'Structural: by shape').cap(3, 'Go의 암묵적 인터페이스', 'Go’s implicit interfaces').cap(4, '덕 타이핑은 실행 중에', 'Duck typing at run time').cap(5, '명목적 타입과 구조적 타입', 'Nominal vs structural typing');
  return S;
}
function sTrait() {
  const S = scene({ id: 'pl-trait', steps: 5, per: 1.5 });
  code(S, 't', 1, 1.2, 15, ['trait Describe {', '  fn describe(&self) -> String;', '  fn shout(&self) -> String {', '    self.describe().to_uppercase() }', '}'], [], { st: 1 });
  code(S, 'i', 17, 1.2, 14, ['impl Describe for Point {', '  fn describe(&self) -> String', '  { format!("({}, {})", …) }', '}', 'impl Describe for i32 { … }'], [[4, 3]], { st: 2, hoff: 4 });
  T(S, 'il', 17, 8.4, ['남이 만든 타입(i32)에도 나중에 붙일 수 있어요', 'can be added later even to types you didn’t write (i32)'], 'plx-xs plx-g', 3);
  code(S, 'f', 1, 9.4, 15, ['fn show<T: Describe>(x: T) {', '  println!("{}", x.shout());', '}'], [], { st: 4 });
  T(S, 'fl', 1, 13.8, ['제약(T: Describe)을 만족하는 타입만 받아요 · shout는 기본 구현', 'only types meeting the bound T: Describe · shout comes with a default'], 'plx-xs plx-a', 4);
  T(S, 'cmp', 17, 10.4, ['상속: “무엇인가(is-a)”를 클래스 계층에 묶음', 'inheritance ties “is-a” into a class hierarchy'], 'plx-xs', 4); T(S, 'cmp2', 17, 11.6, ['트레잇: “무엇을 할 수 있나”를 따로 붙임', 'traits attach “can-do” behavior separately'], 'plx-xs plx-g', 4);
  notes(S, 'n', 15.6, [['트레잇: 타입이 가져야 할 동작의 목록 (기본 구현 포함 가능)', 'a trait lists behavior a type must provide (defaults allowed)'], ['타입마다 따로 구현을 붙여요', 'each type gets its own implementation'], ['이미 있는 타입에도 새 동작을 붙일 수 있어요', 'existing types can gain new behavior'], ['제네릭 함수는 트레잇을 조건으로 받아요', 'generic functions take traits as bounds']], 'plx-xs');
  fin(S, 'z', 15.6, [['Rust trait · Haskell type class · Swift protocol · Go interface · Java interface(default 메서드)', 'Rust traits, Haskell type classes, Swift protocols, Go and Java interfaces (with default methods)', 'plx-xs plx-a'], ['다중 상속의 다이아몬드 문제 없이 여러 능력을 조합해요', 'combine many capabilities without the diamond problem of multiple inheritance']]);
  S.cap(1, '동작의 계약을 정의', 'Define a behavior contract').cap(2, '타입마다 구현을 붙여요', 'Implement it per type').cap(3, '남의 타입에도', 'Even on foreign types').cap(4, '제네릭의 조건으로', 'Use it as a generic bound').cap(5, '트레잇·인터페이스·타입 클래스', 'Traits, interfaces and type classes');
  return S;
}

/* ================= memory extras ================= */
function sOwnership() {
  const S = scene({ id: 'pl-ownership', steps: 5, per: 1.5 });
  code(S, 'c', 1, 1.2, 15, ['let a = String::from("hi");', ['let b = a;          // 이동', 'let b = a;          // move'], 'println!("{}", a);  // ✗', 'let r1 = &b; let r2 = &b;', 'let w = &mut b;     // ✗', ['}  // b 해제(drop)', '}  // b is dropped']], [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);
  rect(S, 'heap', 21, 2, 7, 2, 'ok', 30, 1, { r: .3, cls: 'cz-c plx-c2', html: '"hi"' }); T(S, 'hpl', 21, 4.2, ['힙의 문자열', 'heap string'], 'cz-tc plx-xs', 1, { w: 7 });
  box2(S, 'va', 17, 6.4, 3.4, 1.6, 'a', 'accent', 1, { pct: 30 }); ar(S, 'pa', [20.5, 6.8], [22, 4.1], 'accent', 1, { h: .1, off: 2 }); S.set('va', 2, { opacity: '.25' });
  box2(S, 'vb', 24, 6.4, 3.4, 1.6, 'b', 'ok', 2, { pct: 35 }); ar(S, 'pb', [25.7, 6.3], [25.4, 4.1], 'ok', 2, { h: .1 });
  T(S, 'mv', 17, 8.6, ['소유권 이동: a는 더 이상 못 써요', 'ownership moved: a is no longer usable'], 'plx-xs plx-r', 2);
  box2(S, 'r1', 17, 10.4, 3.4, 1.6, '&b', 'accent', 3, { pct: 25 }); box2(S, 'r2', 21, 10.4, 3.4, 1.6, '&b', 'accent', 3, { pct: 25 });
  T(S, 'rl', 17, 12.4, ['읽기 빌림은 여러 개 OK', 'many shared borrows are fine'], 'plx-xs plx-g', 3); T(S, 'wl', 17, 13.6, ['그 사이 &mut은 ✗ (읽는 중엔 못 바꿔요)', '&mut meanwhile ✗ (no writes during reads)'], 'plx-xs plx-r', 4);
  S.set('heap', 5, { opacity: '.15' }); xm(S, 'drop', 27.6, 2.4, 5);
  notes(S, 'n', 15.4, [['값마다 주인(소유자)은 딱 하나', 'every value has exactly one owner'], ['대입하면 소유권이 옮겨 가요 → 옛 변수는 무효', 'assignment moves ownership → the old variable is invalid'], ['빌림(&)은 여러 개가 동시에 읽을 수 있어요', 'many shared borrows (&) can read at once'], ['쓰기 빌림(&mut)은 혼자만 · 컴파일 때 검사해요 (빌림 검사기)', 'a mutable borrow (&mut) must be alone · checked at compile time (the borrow checker)']], 'plx-xs');
  fin(S, 'z', 15.4, [['주인이 스코프를 벗어나면 자동 해제 → GC 없이도 해제 시점이 정확해요', 'values are freed when their owner goes out of scope → precise freeing without a GC', 'plx-xs plx-a'], ['댕글링 포인터·이중 해제·데이터 경쟁을 컴파일 단계에서 막아요 (Rust)', 'dangling pointers, double frees and data races are rejected at compile time (Rust)', 'plx-xs plx-g']]);
  S.cap(1, '값과 주인', 'A value and its owner').cap(2, '소유권 이동', 'Ownership moves').cap(3, '공유 빌림', 'Shared borrows').cap(4, '변경 빌림은 혼자', 'Mutable borrows are exclusive').cap(5, '소유권과 빌림', 'Ownership and borrowing');
  return S;
}
function sRaii() {
  const S = scene({ id: 'pl-raii', steps: 5, per: 1.5 });
  code(S, 'bad', 1, 1.2, 14.6, ['f = open("log.txt")', ['if error: return      # ✗ 안 닫힘', 'if error: return      # ✗ never closed'], ['data = f.read()      # 예외면 ✗', 'data = f.read()      # ✗ on exception'], 'f.close()'], [[1, 1], [2, 2]], { st: 1, hoff: 3 });
  T(S, 'badn', 1, 6.9, ['일찍 나가거나 예외가 나면 close()를 건너뛰어 누수', 'an early return or exception skips close() → leak'], 'plx-xs plx-r', 1);
  code(S, 'good', 17, 1.2, 14, ['with open("log.txt") as f:', '    data = f.read()', ['# 어떻게 나가든 여기서 닫힘', '# closed here, however we leave']], [], { st: 3 });
  T(S, 'cpp', 17, 6.2, ['C++: 소멸자가 스코프 끝에서 자동 호출', 'C++: the destructor runs at scope exit'], 'plx-xs plx-g', 3);
  rect(S, 'sc', 3, 9, 26, 5.6, 'accent', 6, 2, { r: .5, css: 'border:.12em dashed var(--accent)' }); T(S, 'scl', 3.4, 9.2, ['스코프 { }', 'scope { }'], 'cz-mono plx-xs plx-a', 2);
  box2(S, 'ac', 4.6, 10.8, 7, 2, ['생성자: 파일 열기', 'constructor: open'], 'ok', 2, { pct: 30 }); ar(S, 'a1', [11.7, 11.8], [13.4, 11.8], 'ink-3', 2, { h: .1 });
  box2(S, 'use', 13.5, 10.8, 5, 2, ['사용', 'use'], 'line', 2, { pct: 40 }); ar(S, 'a2', [18.6, 11.8], [20.3, 11.8], 'ink-3', 2, { h: .1 });
  box2(S, 'dt', 20.4, 10.8, 7.6, 2, ['소멸자: 닫기', 'destructor: close'], 'warn', 3, { pct: 30 });
  T(S, 'exc', 13.5, 13.3, ['💥 예외가 나도 → 스택 풀기 중에 소멸자 실행', '💥 even on exceptions → destructors run during unwinding'], 'plx-xs plx-r', 4);
  notes(S, 'n', 15.6, [['직접 열고 닫으면 빠뜨리기 쉬워요', 'opening and closing by hand is easy to get wrong'], ['RAII: 자원의 수명을 객체의 수명에 묶어요', 'RAII ties a resource’s lifetime to an object’s'], ['스코프를 벗어나는 순간 자동으로 정리', 'leaving the scope cleans up automatically'], ['예외로 빠져나가도 소멸자가 불려요', 'even an exception triggers the destructor']], 'plx-xs');
  fin(S, 'z', 15.6, [['C++ 소멸자 · Rust Drop · Python with · C# using · Java try-with-resources · Go defer', 'C++ destructors, Rust Drop, Python with, C# using, Java try-with-resources, Go defer', 'plx-xs plx-a'], ['파일·소켓·락·DB 연결처럼 GC가 언제 돌지 모르는 자원에 꼭 필요해요', 'essential for files, sockets, locks and DB connections, where GC timing is unpredictable']]);
  S.cap(1, '수동 정리는 새기 쉬워요', 'Manual cleanup leaks').cap(2, '자원을 객체 수명에 묶어요', 'Bind the resource to an object').cap(3, '스코프 끝에서 자동 정리', 'Automatic cleanup at scope exit').cap(4, '예외에도 안전', 'Safe even with exceptions').cap(5, 'RAII와 결정적 해제', 'RAII and deterministic cleanup');
  return S;
}
function sTail() {
  const S = scene({ id: 'pl-tailcall', steps: 5, per: 1.5 });
  code(S, 'a', 1, 1.2, 14.6, ['fact(n):', '  if n == 0: return 1', '  return n * fact(n - 1)'], [], { st: 1 });
  ['fact(4)', 'fact(3)', 'fact(2)', 'fact(1)', 'fact(0)'].forEach((t, i) => stackCell(S, 'f' + i, 1, 15, i, i < 4 ? `${t}  ${4 - i}×…` : t, 'warn', 1, 3, { w: 8, h: 1.6 }));
  T(S, 'fl', 10, 13.4, ['곱셈이 남아 있어 프레임을 못 버려요 → 깊이 n', 'a pending multiply keeps every frame → depth n'], 'plx-xs plx-r', 2, { off: 3 });
  code(S, 'b', 17, 1.2, 14, ['fact(n, acc = 1):', '  if n == 0: return acc', '  return fact(n - 1, n * acc)'], [[2, 3]], { st: 3, hoff: 5 });
  box2(S, 't0', 17, 9, 9, 1.6, 'fact(4, 1)', 'ok', 3, { pct: 30, off: 4 }); box2(S, 't1', 17, 9, 9, 1.6, 'fact(2, 12)', 'ok', 4, { pct: 30 });
  T(S, 'tl', 17, 11, ['꼬리 호출: 호출 뒤 할 일이 없어 같은 프레임을 재사용', 'tail call: nothing left to do, so the frame is reused'], 'plx-xs plx-g', 3);
  T(S, 'tl2', 17, 12.2, ['스택 깊이 1 · 사실상 반복문', 'stack depth 1 · effectively a loop'], 'plx-xs plx-g', 4);
  notes(S, 'n', 16.8, [['재귀 팩토리얼', 'recursive factorial'], ['n번 호출하면 프레임 n개가 쌓여요 (너무 깊으면 스택 오버플로)', 'n calls stack n frames (too deep: stack overflow)'], ['누적값을 인자로 넘기면 마지막 동작이 호출 자체가 돼요', 'pass an accumulator and the call becomes the last action'], ['컴파일러가 점프로 바꿔 프레임을 재사용해요 (꼬리 호출 최적화)', 'the compiler turns it into a jump and reuses the frame (TCO)']], 'plx-xs');
  fin(S, 'z', 16.8, [['Scheme은 꼬리 호출 최적화를 보장 · Python · Java는 하지 않아요 (재귀 한도)', 'Scheme guarantees TCO · Python and Java do not (recursion limits)', 'plx-xs plx-a'], ['보장이 없으면 반복문으로 바꾸거나 트램펄린 기법을 써요', 'without it, rewrite as a loop or use a trampoline']]);
  S.cap(1, '평범한 재귀', 'Plain recursion').cap(2, '프레임이 계속 쌓여요', 'Frames pile up').cap(3, '꼬리 재귀로 바꿔요', 'Rewrite as tail recursion').cap(4, '프레임 하나로 충분', 'One frame is enough').cap(5, '꼬리 호출 최적화', 'Tail-call optimization');
  return S;
}

/* ================= concurrency & errors extras ================= */
function sGen() {
  const S = scene({ id: 'pl-generator', steps: 5, per: 1.5 });
  code(S, 'g', 1, 1.2, 14.6, ['def fib():', '    a, b = 0, 1', '    while True:', '        yield a', '        a, b = b, a + b'], [[3, 1], [3, 2], [3, 3], [3, 4]], { hoff: 5 });
  T(S, 'cl', 17, 1.2, ['호출하는 쪽', 'caller'], 'plx-xs plx-a');
  [['next() → 0', 1], ['next() → 1', 2], ['next() → 1', 3], ['next() → 2', 4]].forEach(([t, s], i) => box2(S, 'v' + i, 17, 2.4 + i * 2, 8, 1.6, t, 'ok', s, { pct: 30 }));
  T(S, 'st', 1, 8.8, ['멈춘 상태 저장: a, b와 “yield 다음 줄”', 'paused state saved: a, b and “the line after yield”'], 'plx-xs plx-w', 1);
  [['a = 0, b = 1', 1, 2], ['a = 1, b = 1', 2, 3], ['a = 1, b = 2', 3, 4], ['a = 2, b = 3', 4, 0]].forEach(([t, s, o], i) => T(S, 'sv' + i, 1, 10, t, 'cz-mono plx-s', s, { off: o }));
  T(S, 'inf', 17, 11, ['무한 수열인데 필요한 만큼만 계산', 'an infinite sequence, computed on demand'], 'plx-xs plx-g', 4);
  notes(S, 'n', 13.2, [['yield에서 값을 내주고 그 자리에 멈춰요', 'at yield the function hands out a value and pauses'], ['next()가 오면 멈춘 곳부터 이어서 실행', 'the next next() resumes right where it paused'], ['지역 변수가 호출 사이에 살아 있어요', 'local variables survive between calls'], ['while True여도 꺼낼 때만 계산하니 안전', 'even with while True, values are made only when pulled']], 'plx-s');
  fin(S, 'z', 13.2, [['for x in fib(): 처럼 이터레이터 규약을 따라 반복문에 그대로 써요', 'it follows the iterator protocol, so for x in fib(): just works', 'plx-xs plx-a'], ['Python yield · JS function* · C# yield return · Kotlin sequence', 'Python yield, JS function*, C# yield return, Kotlin sequences'], ['대용량 파일 줄 단위 처리, 지연 파이프라인, 그리고 async/await의 뿌리', 'used for line-by-line file processing, lazy pipelines, and as the root of async/await']]);
  S.cap(1, '첫 값을 내주고 멈춰요', 'Yield the first value and pause').cap(2, '이어서 다음 값', 'Resume for the next value').cap(3, '상태가 유지돼요', 'State is preserved').cap(4, '무한해도 괜찮아요', 'Infinite is fine').cap(5, '제너레이터와 이터레이터', 'Generators and iterators');
  return S;
}
function sCsp() {
  const S = scene({ id: 'pl-csp', steps: 5, per: 1.5 });
  T(S, 'h1', 1, .8, ['CSP: 채널로 주고받기 (Go)', 'CSP: talk over channels (Go)'], 'plx-s plx-a', 1);
  box2(S, 'g1', 1, 2.4, 6, 2, ['고루틴 A', 'goroutine A'], 'accent', 1, { pct: 25 }); box2(S, 'g2', 22, 2.4, 6, 2, ['고루틴 B', 'goroutine B'], 'accent', 1, { pct: 25 });
  rect(S, 'ch', 9, 2.8, 11, 1.2, 'ink-3', 10, 1, { r: .6, css: 'border:.12em solid var(--ink-3)' }); T(S, 'chl', 9, 4.3, 'ch := make(chan int)', 'cz-tc cz-mono plx-xs', 1, { w: 11 });
  pt(S, 'msg', 8, 3.4, 2, C.okf, .45); S.move('msg', 3, 20.3 - .45, 3.4 - .45);
  T(S, 's1', 1, 5.6, 'ch <- 42', 'cz-mono plx-xs', 2); T(S, 's2', 22, 5.6, 'x := <-ch', 'cz-mono plx-xs', 2);
  T(S, 'sy', 1, 6.8, ['버퍼 없는 채널: 보내는 쪽은 받는 쪽이 올 때까지 기다려요 (만남)', 'unbuffered: the sender waits until the receiver arrives (a rendezvous)'], 'plx-xs', 3);
  T(S, 'h2', 1, 9, ['액터 모델: 우편함 (Erlang · Akka)', 'actor model: mailboxes (Erlang, Akka)'], 'plx-s plx-w', 4);
  box2(S, 'ac', 18, 10.2, 7, 3, ['액터 (상태 소유)', 'actor (owns its state)'], 'warn', 4, { pct: 25 });
  ['m1', 'm2', 'm3'].forEach((m, i) => box2(S, 'mb' + i, 10 + i * 2.4, 10.8, 2.1, 1.8, m, 'line', 4, { pct: 45 })); T(S, 'mbl', 10, 13, ['우편함: 한 번에 하나씩 처리', 'mailbox: one message at a time'], 'plx-xs', 4);
  ar(S, 'in', [3, 11.7], [9.8, 11.7], 'ink-3', 4, { h: .1 }); T(S, 'inl', 1, 10.2, ['누구나 메시지를 보내요', 'anyone can send'], 'plx-xs', 4);
  fin(S, 'z', 15, [['“메모리를 공유해서 소통하지 말고, 소통으로 메모리를 공유하라” (Go)', '“Don’t communicate by sharing memory; share memory by communicating” (Go)', 'plx-xs plx-a'], ['락 없이 동시성 버그를 줄여요 · 대신 교착이나 메시지 폭주를 조심', 'fewer lock bugs · watch for deadlocks and message floods instead'], ['Erlang은 액터가 죽으면 감독자가 다시 띄워요 (“let it crash”) → 통신 장비의 높은 가용성', 'in Erlang, supervisors restart crashed actors (“let it crash”) → famously high availability']]);
  S.cap(1, '채널로 연결된 두 고루틴', 'Two goroutines joined by a channel').cap(2, '보내기와 받기', 'Send and receive').cap(3, '받을 때까지 기다려요', 'Senders wait for receivers').cap(4, '액터는 우편함으로', 'Actors use mailboxes').cap(5, '채널(CSP)과 액터 모델', 'Channels (CSP) and the actor model');
  return S;
}
function sResult() {
  const S = scene({ id: 'pl-result', steps: 5, per: 1.5 });
  T(S, 'h1', 1, .8, ['예외: 보이지 않는 탈출구', 'exceptions: an invisible exit'], 'plx-s plx-r', 1);
  code(S, 'ex', 1, 2, 14.6, [['int n = parse(s);   // 던질 수도?', 'int n = parse(s);   // may throw?'], ['save(n);            // 던질 수도?', 'save(n);            // may throw?'], 'log("ok");'], [], { st: 1 });
  T(S, 'exn', 1, 6.4, ['시그니처만 봐선 어디서 튈지 몰라요', 'the signatures don’t show what may throw'], 'plx-xs', 1);
  T(S, 'h2', 17, .8, ['결과 타입: 실패도 값', 'result types: failure is a value'], 'plx-s plx-g', 2);
  code(S, 'rs', 17, 2, 14, ['fn parse(s) -> Result<i32, Err>', 'match parse(s) {', '  Ok(n) => save(n),', '  Err(e) => report(e),', '}'], [], { st: 2 });
  T(S, 'rsn', 17, 8.8, ['반환 타입에 실패가 보이고, 처리하지 않으면 컴파일러가 경고', 'failure shows in the type, and ignoring it gets flagged'], 'plx-xs plx-g', 2);
  code(S, 'q', 1, 10.4, 14.6, ['fn load() -> Result<Cfg, Err> {', '  let t = read(path)?;', '  let c = parse(t)?;', '  Ok(c) }'], [[1, 3], [2, 3]], { st: 3, hoff: 4 });
  T(S, 'qn', 1, 16.5, ['? = 실패면 그 자리에서 Err를 그대로 돌려줘요', '? returns the Err right there on failure'], 'plx-xs plx-a', 3);
  code(S, 'go', 17, 10.4, 14, ['n, err := parse(s)', 'if err != nil {', '    return err', '}'], [], { st: 4 });
  T(S, 'gon', 17, 16.5, ['Go: 값 두 개로 돌려주고 매번 검사', 'Go: return two values, check every time'], 'plx-xs', 4);
  fin(S, 'z', 17.8, [['예외는 코드가 짧지만 흐름이 숨어요 · 결과 타입은 길지만 실패 경로가 드러나요', 'exceptions are concise but hide control flow · result types are wordier but make failure paths explicit', 'plx-xs plx-a'], ['Rust Result · Swift throws(표시 필수) · Kotlin Result · Haskell Either · Go (val, err)', 'Rust Result, Swift throws (must be marked), Kotlin Result, Haskell Either, Go (val, err)']]);
  S.cap(1, '예외는 어디서 튈지 몰라요', 'Exceptions can fly from anywhere').cap(2, '실패를 값으로 돌려줘요', 'Return failure as a value').cap(3, '?로 간단히 전파', 'Propagate with ?').cap(4, 'Go의 오류 값', 'Go’s error values').cap(5, '예외 vs 결과 타입', 'Exceptions vs result types');
  return S;
}

return { css: CSSX, secs: [], add: {
  'pl-impl': [
    item('pl-bytecode', '바이트코드와 가상 기계', 'Bytecode and virtual machines', '소스를 특정 CPU의 기계어 대신 가상 기계용 명령어(바이트코드)로 바꾸고, VM이 그 명령어를 실행해요.', '스택 기계는 PUSH 2, PUSH 3, ADD처럼 피연산자 스택에 값을 올리고 꺼내며 계산해요. JVM, CPython, WebAssembly가 스택 기계이고, Lua와 안드로이드의 Dalvik은 레지스터 기계예요. 한 번 컴파일한 바이트코드를 어느 운영체제에서나 같은 VM으로 실행할 수 있고, 자주 실행되는 부분은 JIT가 기계어로 다시 번역해 빠르게 해요.', 'Compile source into instructions for a virtual machine (bytecode) rather than for a specific CPU, then let the VM execute them.', 'A stack machine computes by pushing and popping an operand stack: PUSH 2, PUSH 3, ADD. The JVM, CPython and WebAssembly are stack machines; Lua and Android’s Dalvik are register machines. Bytecode compiled once runs on any OS with the same VM, and a JIT recompiles hot paths into machine code for speed.', sBytecode()),
    item('pl-eval', '평가 전략', 'Evaluation strategies', '식을 언제 계산하느냐의 규칙이에요. 인자를 먼저 다 계산하는 조급한 평가, 필요할 때 계산하는 지연 평가, 결과가 정해지면 멈추는 단락 평가가 있어요.', '대부분의 언어는 함수 호출 전에 인자를 모두 계산해서 쓰지 않을 인자도 계산해요. &&, ||는 앞에서 결과가 정해지면 뒤를 계산하지 않아 user && user.name 같은 안전 장치가 돼요. Haskell은 기본이 지연 평가라 무한 리스트에서 필요한 만큼만 꺼내고, 한 번 계산한 값(thunk)은 기억해 다시 계산하지 않아요. 지연 평가는 부수 효과의 순서를 예측하기 어렵게 만들어요.', 'Rules for when expressions are computed: eager evaluation computes arguments first, lazy evaluation waits until a value is needed, and short-circuiting stops once the result is known.', 'Most languages evaluate every argument before a call, even unused ones. && and || skip the right side when the left already decides, which makes guards like user && user.name safe. Haskell is lazy by default, so it can take just what it needs from an infinite list, and a forced thunk is remembered rather than recomputed. Laziness makes the order of side effects harder to predict.', sEval()),
    item('pl-dispatch', '동적 디스패치와 vtable', 'Dynamic dispatch and vtables', '같은 메서드 호출이 객체의 실제 타입에 따라 다른 함수로 연결되는 방법이에요. 객체가 함수 표(vtable)를 가리켜요.', '각 객체는 자기 클래스의 vtable을 가리키는 포인터를 품고, 호출 시 vptr을 읽고 → 표의 칸을 읽고 → 그 주소를 불러요. 간접 호출이라 인라인이 막혀 조금 느리기 때문에, JIT는 자주 오는 타입을 바로 부르는 인라인 캐시로 최적화해요. C++ virtual, Java(기본이 가상), Rust dyn Trait(팻 포인터)가 이 방식이고 Python·JS는 사전이나 히든 클래스로 메서드를 찾아요.', 'How one method call reaches different functions depending on an object’s real type: the object points at a function table (vtable).', 'Each object carries a pointer to its class’s vtable; a call loads the vptr, loads the table slot and calls that address. The indirection blocks inlining and costs a little, so JITs use inline caches that call the common type directly. C++ virtual functions, Java (virtual by default) and Rust dyn Trait (fat pointers) work this way, while Python and JS look methods up in dictionaries or hidden classes.', sDispatch()),
    item('pl-macro', '매크로와 메타프로그래밍', 'Macros and metaprogramming', '컴파일 전에 코드를 다른 코드로 바꿔 주는 규칙이에요. 텍스트를 바꾸는 매크로는 위험하고, 구문 트리를 바꾸는 매크로는 안전해요.', 'C 전처리기의 #define SQ(x) x * x는 SQ(1 + 2)를 1 + 2 * 1 + 2로 펼쳐 5가 나와요(기대값 9). Rust macro_rules!, Lisp defmacro 같은 구문 트리 매크로는 (1 + 2)를 한 덩어리로 다루고 이름 충돌도 막아요(위생적 매크로). 직렬화·테스트 같은 반복 코드 생성과 DSL에 쓰이지만, 남용하면 디버깅이 어려워요.', 'Rules that rewrite code into other code before compilation: text macros are risky, syntax-tree macros are safe.', 'The C preprocessor’s #define SQ(x) x * x expands SQ(1 + 2) into 1 + 2 * 1 + 2, giving 5 instead of 9. Syntax-tree macros such as Rust’s macro_rules! and Lisp’s defmacro treat (1 + 2) as a unit and avoid name capture (hygiene). They generate boilerplate such as serialization and tests and build DSLs, but overuse makes debugging hard.', sMacro())
  ],
  'pl-types': [
    item('pl-mono', '제네릭 구현: 소거와 단형화', 'Implementing generics: erasure vs monomorphization', '제네릭 함수 하나를 기계 코드로 만드는 방법은 크게 둘이에요. 타입을 지워 한 벌로 만들거나, 타입마다 복사본을 만들어요.', 'Java는 타입 매개변수를 지우고(소거) Object로 한 번 컴파일한 뒤 호출하는 쪽에 형 변환을 넣어서, 실행 중엔 List<String>인지 알 수 없어요. C++ 템플릿과 Rust는 쓰인 타입마다 전용 코드를 만들어(단형화) 빠르지만 바이너리가 커져요. C#·.NET은 실행 중에도 타입을 아는 구체화된 제네릭으로 둘 사이를 절충하고, Go는 GC 모양별로 묶어요.', 'A generic function becomes machine code in one of two main ways: erase the types and compile once, or copy it per type.', 'Java erases type parameters, compiles once against Object and inserts casts at call sites, so a List<String> can’t be detected at run time. C++ templates and Rust generate specialized code for each type used (monomorphization): fast, but binaries grow. C#/.NET keeps types at run time with reified generics, and Go groups instantiations by GC shape.', sMono()),
    item('pl-subtype', '서브타이핑과 변성', 'Subtyping and variance', 'Dog가 Animal의 하위 타입일 때, Dog 목록도 Animal 목록의 하위 타입일까요? 읽기만 하면 예(공변), 쓰기도 하면 아니요(무변)예요.', '꺼내기만 하는 생산자(읽기 전용 목록, 반환값)는 공변, 받기만 하는 소비자(비교기, 함수 인자)는 반공변이에요. 넣고 꺼내는 변경 가능 목록은 무변이어야 하는데, Java 배열은 공변이라 Cat을 넣으면 ArrayStoreException이 나요. Java는 PECS(? extends / ? super), Kotlin·C#은 out/in으로 변성을 선언해요.', 'If Dog is a subtype of Animal, is a list of Dogs a list of Animals? For reading, yes (covariant); with writing, no (invariant).', 'Producers you only read from (read-only lists, return values) are covariant, consumers you only feed (comparators, function parameters) are contravariant, and mutable containers must be invariant; Java arrays are covariant, so storing a Cat throws ArrayStoreException. Java expresses variance with PECS (? extends / ? super), Kotlin and C# with out/in.', sVariance()),
    item('pl-adt', '대수적 자료형과 패턴 매칭', 'Algebraic data types and pattern matching', '“원이거나, 사각형이거나, 삼각형”처럼 경우를 나열한 타입(합 타입)을 만들고, 패턴 매칭으로 경우마다 꺼내 처리해요.', '각 경우는 자기 데이터를 들고 다니고(Circle(r), Rect(w, h)), match로 경우를 나눠 꺼내요. 컴파일러가 빠진 경우를 잡아 주는 빠짐 검사 덕분에 새 경우를 추가하면 고칠 곳이 모두 드러나요. null 대신 Option<T> = Some(x) | None을 쓰면 빈 값 처리를 강제할 수 있어요. 구조체 같은 곱 타입과 합 타입을 합쳐 대수적 자료형이라고 불러요.', 'Define a type by listing its cases (a sum type), such as “a circle, a rectangle or a triangle”, and take values apart with pattern matching.', 'Each case carries its own data (Circle(r), Rect(w, h)), and match splits on the case. Exhaustiveness checking makes the compiler flag missing cases, so adding a case reveals every place to update. Option<T> = Some(x) | None replaces null and forces you to handle absence. Product types (structs) plus sum types make algebraic data types, found in Rust, Swift, Kotlin sealed classes, TypeScript discriminated unions and Haskell.', sAdt()),
    item('pl-structural', '명목적 타입과 구조적 타입', 'Nominal vs structural typing', '타입이 맞는지를 이름과 선언으로 판단하면 명목적, 필드·메서드의 모양으로 판단하면 구조적 타입이에요.', 'Java·C#은 모양이 같아도 implements를 선언해야 하지만, TypeScript는 필요한 필드만 있으면 통과하고 Go는 메서드만 맞으면 인터페이스를 구현한 것으로 봐요. Python·Ruby의 덕 타이핑은 같은 판단을 실행 중에 해요. 명목적은 의도를 드러내 우연한 일치를 막고, 구조적은 유연해요. TS에서는 브랜드 타입으로 명목성을 흉내 내요.', 'Nominal typing decides compatibility by names and declarations; structural typing by the shape of fields and methods.', 'Java and C# require an explicit implements even when shapes match, while TypeScript accepts any value with the needed fields and Go treats matching methods as implementing an interface. Duck typing in Python and Ruby makes the same judgment at run time. Nominal typing states intent and blocks accidental matches; structural typing is flexible. TypeScript emulates nominal types with branded types.', sStructural()),
    item('pl-trait', '트레잇·인터페이스·타입 클래스', 'Traits, interfaces and type classes', '타입이 “무엇을 할 수 있는지”를 동작의 계약으로 정의하고, 타입마다 따로 구현을 붙여요. 상속 없이 능력을 조합해요.', '트레잇은 필요한 메서드 목록과 기본 구현을 담고, impl Describe for Point처럼 타입마다 구현을 붙여요. 이미 있는 타입(i32)에도 나중에 붙일 수 있고, 제네릭 함수는 T: Describe처럼 트레잇을 조건으로 받아요. 상속이 “무엇인가(is-a)”를 계층에 묶는다면 트레잇은 “무엇을 할 수 있나”를 따로 붙여 다이아몬드 문제를 피해요. Rust trait, Haskell type class, Swift protocol, Go·Java interface가 이 계열이에요.', 'Define what a type can do as a behavior contract and attach implementations per type, combining capabilities without inheritance.', 'A trait lists required methods plus default implementations, and impl Describe for Point attaches one per type, even to existing types like i32. Generic functions take traits as bounds, as in T: Describe. Where inheritance ties “is-a” into a hierarchy, traits attach “can-do” separately and avoid the diamond problem. Rust traits, Haskell type classes, Swift protocols and Go and Java interfaces belong to this family.', sTrait())
  ],
  'pl-mem': [
    item('pl-ownership', '소유권과 빌림', 'Ownership and borrowing', '값마다 주인이 하나뿐이고, 다른 곳은 값을 “빌려” 써요. 규칙을 컴파일러가 검사해 GC 없이 메모리 안전성을 얻어요 (Rust).', '대입하면 소유권이 옮겨 가서 옛 변수는 더 쓸 수 없고, 주인이 스코프를 벗어나면 값이 자동으로 해제돼요. 읽기 빌림(&)은 여러 개가 동시에 가능하지만, 쓰기 빌림(&mut)은 혼자만 가능해요. 빌림 검사기가 이 규칙으로 댕글링 포인터, 이중 해제, 데이터 경쟁을 컴파일 단계에서 막아요.', 'Every value has exactly one owner and others “borrow” it; the compiler enforces the rules, giving memory safety without a garbage collector (Rust).', 'Assignment moves ownership, so the old variable becomes unusable, and a value is freed automatically when its owner leaves scope. Many shared borrows (&) may coexist, but a mutable borrow (&mut) must be alone. The borrow checker uses these rules to reject dangling pointers, double frees and data races at compile time.', sOwnership()),
    item('pl-raii', 'RAII와 결정적 해제', 'RAII and deterministic cleanup', '자원(파일, 락, 연결)의 수명을 객체의 수명에 묶어서, 스코프를 벗어나는 순간 자동으로 정리되게 해요.', '파일을 직접 열고 닫으면 일찍 return하거나 예외가 날 때 close()를 건너뛰어 누수가 생겨요. RAII는 생성자에서 자원을 얻고 소멸자에서 놓아, 예외로 빠져나가도 스택을 풀며 소멸자가 불려요. C++ 소멸자, Rust Drop, Python with, C# using, Java try-with-resources, Go defer가 같은 목적이고, GC가 언제 돌지 모르는 자원에 꼭 필요해요.', 'Tie a resource’s lifetime (file, lock, connection) to an object’s lifetime, so it is released automatically when the scope ends.', 'Opening and closing a file by hand leaks it whenever an early return or exception skips close(). RAII acquires the resource in a constructor and releases it in a destructor, which still runs while the stack unwinds after an exception. C++ destructors, Rust Drop, Python with, C# using, Java try-with-resources and Go defer serve the same purpose, essential for resources whose release can’t wait for an unpredictable GC.', sRaii()),
    item('pl-tailcall', '꼬리 호출 최적화', 'Tail-call optimization', '함수의 마지막 동작이 다른 함수 호출이면, 지금 프레임을 버리고 재사용할 수 있어요. 재귀가 반복문처럼 스택을 쓰지 않아요.', 'n * fact(n − 1)은 호출 뒤 곱셈이 남아 프레임이 n개 쌓이고 깊으면 스택 오버플로가 나요. 누적값을 인자로 넘기는 fact(n − 1, n * acc)는 호출이 마지막 동작이라 컴파일러가 점프로 바꿔 프레임 하나로 끝내요. Scheme은 이를 보장하지만 Python·Java는 하지 않아서 반복문으로 바꾸거나 트램펄린 기법을 써요.', 'When a function’s last action is a call, the current frame can be discarded and reused, so recursion runs in constant stack like a loop.', 'n * fact(n − 1) still has a multiply pending after the call, so n frames pile up and deep inputs overflow the stack. Passing an accumulator, fact(n − 1, n * acc), makes the call the final action, so the compiler turns it into a jump within one frame. Scheme guarantees this, but Python and Java don’t, so code there is rewritten as loops or uses trampolines.', sTail())
  ],
  'pl-conc': [
    item('pl-generator', '제너레이터와 이터레이터', 'Generators and iterators', 'yield로 값을 하나 내주고 그 자리에 멈췄다가, 다음 요청이 오면 이어서 실행하는 함수예요. 무한한 수열도 필요한 만큼만 만들어요.', '제너레이터는 지역 변수와 “다음에 실행할 줄”을 저장해 두고 next()마다 다음 yield까지만 실행해요. 이터레이터 규약을 따라 for 문에 바로 쓸 수 있고, 큰 파일을 한 줄씩 처리하거나 지연 파이프라인을 만들 때 메모리를 아껴요. Python yield, JS function*, C# yield return이 대표적이고, async/await도 이 원리 위에 세워졌어요.', 'A function that hands out a value with yield, pauses there, and resumes on the next request; even infinite sequences are produced only as needed.', 'A generator saves its local variables and “the next line to run”, executing only up to the next yield on each next(). It follows the iterator protocol, so it plugs straight into for loops, and it saves memory when processing huge files line by line or building lazy pipelines. Python yield, JS function* and C# yield return are common forms, and async/await is built on the same idea.', sGen()),
    item('pl-csp', '채널(CSP)과 액터 모델', 'Channels (CSP) and the actor model', '공유 메모리와 락 대신 메시지를 주고받아 협력하는 동시성 모델이에요. Go는 채널, Erlang·Akka는 액터의 우편함을 써요.', 'Go의 고루틴은 채널로 값을 주고받고, 버퍼 없는 채널은 보내는 쪽과 받는 쪽이 만날 때까지 기다려 동기화도 해 줘요. 액터는 자기 상태를 혼자 소유하고 우편함의 메시지를 하나씩 처리해서 락이 필요 없어요. Erlang은 죽은 액터를 감독자가 다시 띄우는 “let it crash” 철학으로 높은 가용성을 얻어요. 대신 교착 상태와 메시지 폭주는 여전히 조심해야 해요.', 'Concurrency models that cooperate by passing messages instead of sharing memory under locks: Go uses channels, Erlang and Akka use actor mailboxes.', 'Goroutines exchange values over channels, and an unbuffered channel makes sender and receiver meet, synchronizing them. An actor owns its state alone and processes mailbox messages one at a time, so it needs no locks. Erlang’s supervisors restart crashed actors (“let it crash”), a key to its famous availability. Deadlocks and message floods still need care.', sCsp()),
    item('pl-result', '예외 vs 결과 타입', 'Exceptions vs result types', '오류를 보이지 않는 탈출구(예외)로 던질지, 반환 값(Result)으로 돌려줄지의 선택이에요.', '예외는 코드가 짧지만 시그니처만 봐서는 어디서 튈지 알 수 없어요. Rust의 Result<T, E>나 Haskell의 Either는 실패가 타입에 드러나고, 처리하지 않으면 컴파일러가 경고해요. ? 연산자는 실패하면 그 자리에서 오류를 그대로 돌려줘 간결하게 전파하고, Go는 (값, err) 두 개를 돌려주고 매번 검사해요. Swift는 던지는 함수에 throws와 try 표시를 강제해 중간을 택했어요.', 'Should errors escape through an invisible exit (exceptions) or come back as values (results)?', 'Exceptions keep code short, but signatures don’t reveal what may throw. Rust’s Result<T, E> and Haskell’s Either put failure in the type, and ignoring it draws a compiler warning. The ? operator returns the error on the spot for concise propagation, while Go returns (value, err) and checks every time. Swift takes a middle road by requiring throws and try markers.', sResult())
  ]
} };
})();

window.UX = page([
  sec('pl-impl', '언어 구현', 'Implementation', '코드가 실행되기까지', 'From code to execution',
    '우리가 쓴 코드가 컴퓨터가 실행하는 형태로 바뀌는 과정이에요.', 'How the code we write becomes something a computer runs.', [
    item('pl-compile', '컴파일 과정', 'Compilation pipeline', '소스 코드는 토큰으로 쪼개지고(어휘 분석), 문법 트리(AST)가 되고(구문 분석), 최적화를 거쳐 기계어나 바이트코드가 돼요.', '린터·포매터·번들러·코드 변환기가 모두 AST를 다뤄요. 에러 메시지의 "unexpected token"은 파싱 단계에서 났다는 뜻이에요.', 'Source is split into tokens (lexing), shaped into a syntax tree (parsing), optimized and emitted as machine code or bytecode.', 'Linters, formatters, bundlers and codemods all work on ASTs; “unexpected token” means the parser gave up.', sCompile()),
    item('pl-interp', '컴파일러 · 인터프리터 · JIT', 'Compiler · Interpreter · JIT', '컴파일러는 미리 전부 번역하고, 인터프리터는 읽으면서 바로 실행하고, JIT는 실행하면서 자주 쓰는 부분만 기계어로 바꿔요.', 'V8·JVM이 JIT라서 처음엔 느리다가 빨라져요(워밍업). 서버리스의 콜드 스타트 문제도 여기서 생겨요.', 'A compiler translates everything up front, an interpreter runs as it reads, and a JIT compiles hot code while running.', 'V8 and the JVM are JITs, so they start slower and speed up (warm-up); serverless cold starts come from this.', sInterp())
  ].concat(XT.add['pl-impl'] || [])),
  sec('pl-types', '타입', 'Types', '타입 시스템', 'Type systems',
    '값의 종류를 약속해서 실수를 미리 막는 장치예요.', 'Promises about kinds of values that catch mistakes early.', [
    item('pl-static', '정적 vs 동적 타입', 'Static vs dynamic typing', '정적 타입은 실행 전에 타입을 검사하고, 동적 타입은 실행하면서 확인해요. 요즘 정적 언어는 타입 추론으로 덜 써도 돼요.', '큰 팀·긴 수명의 코드는 TypeScript·Kotlin 같은 정적 타입이 리팩터링과 자동 완성을 크게 도와요.', 'Static typing checks types before running; dynamic typing checks while running. Modern static languages infer most types.', 'For large teams and long-lived code, static types (TypeScript, Kotlin) make refactoring and autocomplete far better.', sStatic()),
    item('pl-coerce', '암묵적 형 변환', 'Implicit type coercion', '언어가 타입이 다른 값을 몰래 바꿔 계산하는 거예요. JS의 == 와 + 연산이 대표적이에요.', '항상 ===를 쓰고, 숫자 변환은 Number()로 명시하세요. 폼 입력값은 항상 문자열로 들어와요.', 'The language silently converts values of different types to make an operation work; JS’s == and + are infamous.', 'Always use ===, convert explicitly with Number(), and remember form inputs arrive as strings.', sCoerce()),
    item('pl-generic', '제네릭', 'Generics', '타입을 매개변수로 받아, 하나의 코드로 여러 타입을 안전하게 다뤄요.', 'List<T>, Promise<T>, API 응답 래퍼처럼 컨테이너를 만들 때 필수예요. any로 도망가지 말고 제네릭으로 타입을 이어 주세요.', 'Take types as parameters so one piece of code safely handles many types.', 'Essential for containers like List<T>, Promise<T> and API response wrappers; reach for generics instead of any.', sGeneric()),
    item('pl-null', 'null 안전성', 'Null safety', 'null일 수 있는 값을 타입으로 표시하고, ?. 같은 연산자로 안전하게 접근해요. 컴파일러가 null 체크 누락을 잡아 줘요.', 'TypeScript strictNullChecks, Kotlin의 String?, Swift Optional을 켜 두세요. NullPointerException이 크게 줄어요.', 'Mark values that may be null in their types and access them safely with operators like ?.; the compiler flags missing checks.', 'Turn on TypeScript strictNullChecks or use Kotlin String? and Swift Optional; null-pointer crashes drop sharply.', sNull())
  ].concat(XT.add['pl-types'] || [])),
  sec('pl-mem', '메모리·스코프', 'Memory & scope', '메모리, 스코프, 클로저', 'Memory, scope and closures',
    '변수가 어디에 살고 언제 사라지는지에 대한 규칙이에요.', 'Rules for where variables live and when they disappear.', [
    item('pl-stackheap', '스택과 힙', 'Stack vs heap', '함수 호출마다 쌓이는 스택에는 지역 변수와 참조가, 힙에는 객체가 저장돼요. 스택은 자동으로 정리되고 힙은 GC나 직접 해제가 필요해요.', '재귀가 깊으면 스택이 넘치고, 힙 객체를 계속 붙잡으면 메모리 누수가 생겨요.', 'Each call pushes a stack frame of locals and references; objects live on the heap. The stack cleans itself; the heap needs GC or manual freeing.', 'Deep recursion overflows the stack; holding onto heap objects leaks memory.', sStackHeap()),
    item('pl-value', '값 전달 vs 참조 전달', 'Pass by value vs reference', '숫자 같은 원시값은 복사되어 전달되고, 객체·배열은 같은 객체를 가리키는 참조가 전달돼요.', '함수 안에서 인자로 받은 배열을 고치면 호출한 쪽도 바뀌어요. React 상태를 직접 수정하면 안 되는 이유예요.', 'Primitives like numbers are copied; objects and arrays are passed as references to the same object.', 'Mutating an array argument changes the caller’s array too, which is why React state must not be mutated.', sValue()),
    item('pl-gc', '가비지 컬렉션', 'Garbage collection', '루트(전역·스택)에서 닿을 수 있는 객체를 표시하고, 닿지 않는 객체를 자동으로 해제해요.', 'GC 멈춤이 응답 지연 튐의 원인이 되기도 해요. 큰 캐시·전역 맵·해제 안 한 리스너가 대표적인 누수예요.', 'Marks objects reachable from roots (globals, stack) and automatically frees the rest.', 'GC pauses can cause latency spikes. Big caches, global maps and forgotten listeners are classic leaks.', sGC()),
    item('pl-refcount', '참조 카운팅', 'Reference counting', '객체마다 가리키는 곳의 수를 세서 0이 되면 바로 해제해요. 서로를 가리키는 순환은 0이 안 돼서 새요.', 'Swift(ARC)·Python·C++ shared_ptr이 이 방식이에요. 델리게이트·부모 참조는 weak로 두세요.', 'Each object counts its references and is freed when the count reaches zero; cycles never reach zero and leak.', 'Swift ARC, Python and C++ shared_ptr use it. Make delegate and parent references weak.', sRC()),
    item('pl-scope', '스코프', 'Scope', '변수를 찾을 수 있는 범위예요. 코드에 쓰인 위치로 정해지고, 안쪽에서 바깥쪽 순서로 찾아요.', 'let·const의 블록 스코프를 쓰고 var는 피하세요. 같은 이름을 안쪽에 다시 선언하면 바깥 변수가 가려져요(섀도잉).', 'Where a variable can be seen, decided by where it is written and searched from inner to outer scopes.', 'Prefer block-scoped let/const over var. Redeclaring a name inside hides the outer one (shadowing).', sScope()),
    item('pl-closure', '클로저', 'Closure', '함수가 만들어질 때의 주변 변수를 기억해서, 바깥 함수가 끝난 뒤에도 그 변수를 쓸 수 있어요.', '비공개 상태, 콜백, React 훅이 클로저예요. 반복문 안의 비동기 콜백이 마지막 값만 보는 버그도 클로저 때문이에요.', 'A function remembers the variables around it when created and can use them after the outer function has returned.', 'Private state, callbacks and React hooks are closures; so is the classic bug where loop callbacks all see the last value.', sClosure())
  ].concat(XT.add['pl-mem'] || [])),
  sec('pl-conc', '비동기·예외', 'Async & errors', '비동기와 예외 처리', 'Asynchrony and exceptions',
    '기다리는 일과 실패하는 일을 다루는 방법이에요.', 'Handling work that waits and work that fails.', [
    item('pl-async', '콜백 → Promise → async/await', 'Callbacks → Promises → async/await', '비동기 작업을 콜백으로 이으면 중첩이 깊어지고, Promise는 체인으로 펴고, async/await는 동기 코드처럼 읽히게 해요.', 'await를 반복문에서 하나씩 쓰면 순차 실행돼 느려요. 독립적인 요청은 Promise.all로 동시에 보내고, 에러는 try/catch로 잡으세요.', 'Chaining async work with callbacks nests deeply; promises flatten it into chains; async/await reads like synchronous code.', 'Awaiting in a loop runs requests one by one; send independent ones together with Promise.all and catch errors with try/catch.', sAsync()),
    item('pl-coroutine', '스레드 vs 코루틴', 'Threads vs coroutines', '스레드는 OS가 강제로 번갈아 실행하는 무거운 실행 단위이고, 코루틴은 스스로 양보하며 번갈아 실행되는 가벼운 단위예요.', '동시 연결이 많은 서버는 코루틴(Go, Kotlin, Java 가상 스레드)으로 적은 자원에 많은 작업을 처리해요.', 'Threads are heavy units the OS preempts; coroutines are light units that take turns by yielding voluntarily.', 'Servers with many connections use coroutines (Go, Kotlin, Java virtual threads) to handle lots of work cheaply.', sCoroutine()),
    item('pl-exception', '예외 처리', 'Exception handling', '예외가 던져지면 catch를 만날 때까지 호출 스택을 거슬러 올라가며 프레임을 정리해요(스택 되감기).', '예외를 잡고 아무것도 안 하면 버그가 숨어요. 처리할 수 있는 곳에서 잡고, 나머지는 로깅 후 상위로 보내세요. finally로 자원을 정리하세요.', 'A thrown exception unwinds the call stack, frame by frame, until a catch handles it.', 'Catching and ignoring hides bugs. Catch where you can act, log and rethrow otherwise, and clean up in finally.', sException())
  ].concat(XT.add['pl-conc'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.pl-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.pl-code{place-items:center start!important;padding-left:.7em}
.pl-code .in{font-family:var(--f-mono);font-size:.6em;font-weight:600}
.pl-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.pl-big .in{font-size:.95em;font-weight:800}
.pl-xs .in{font-size:.52em}`;
})();
