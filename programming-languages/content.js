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

window.UX = page([
  sec('pl-impl', '언어 구현', 'Implementation', '코드가 실행되기까지', 'From code to execution',
    '우리가 쓴 코드가 컴퓨터가 실행하는 형태로 바뀌는 과정이에요.', 'How the code we write becomes something a computer runs.', [
    item('pl-compile', '컴파일 과정', 'Compilation pipeline', '소스 코드는 토큰으로 쪼개지고(어휘 분석), 문법 트리(AST)가 되고(구문 분석), 최적화를 거쳐 기계어나 바이트코드가 돼요.', '린터·포매터·번들러·코드 변환기가 모두 AST를 다뤄요. 에러 메시지의 "unexpected token"은 파싱 단계에서 났다는 뜻이에요.', 'Source is split into tokens (lexing), shaped into a syntax tree (parsing), optimized and emitted as machine code or bytecode.', 'Linters, formatters, bundlers and codemods all work on ASTs; “unexpected token” means the parser gave up.', sCompile()),
    item('pl-interp', '컴파일러 · 인터프리터 · JIT', 'Compiler · Interpreter · JIT', '컴파일러는 미리 전부 번역하고, 인터프리터는 읽으면서 바로 실행하고, JIT는 실행하면서 자주 쓰는 부분만 기계어로 바꿔요.', 'V8·JVM이 JIT라서 처음엔 느리다가 빨라져요(워밍업). 서버리스의 콜드 스타트 문제도 여기서 생겨요.', 'A compiler translates everything up front, an interpreter runs as it reads, and a JIT compiles hot code while running.', 'V8 and the JVM are JITs, so they start slower and speed up (warm-up); serverless cold starts come from this.', sInterp())
  ]),
  sec('pl-types', '타입', 'Types', '타입 시스템', 'Type systems',
    '값의 종류를 약속해서 실수를 미리 막는 장치예요.', 'Promises about kinds of values that catch mistakes early.', [
    item('pl-static', '정적 vs 동적 타입', 'Static vs dynamic typing', '정적 타입은 실행 전에 타입을 검사하고, 동적 타입은 실행하면서 확인해요. 요즘 정적 언어는 타입 추론으로 덜 써도 돼요.', '큰 팀·긴 수명의 코드는 TypeScript·Kotlin 같은 정적 타입이 리팩터링과 자동 완성을 크게 도와요.', 'Static typing checks types before running; dynamic typing checks while running. Modern static languages infer most types.', 'For large teams and long-lived code, static types (TypeScript, Kotlin) make refactoring and autocomplete far better.', sStatic()),
    item('pl-coerce', '암묵적 형 변환', 'Implicit type coercion', '언어가 타입이 다른 값을 몰래 바꿔 계산하는 거예요. JS의 == 와 + 연산이 대표적이에요.', '항상 ===를 쓰고, 숫자 변환은 Number()로 명시하세요. 폼 입력값은 항상 문자열로 들어와요.', 'The language silently converts values of different types to make an operation work; JS’s == and + are infamous.', 'Always use ===, convert explicitly with Number(), and remember form inputs arrive as strings.', sCoerce()),
    item('pl-generic', '제네릭', 'Generics', '타입을 매개변수로 받아, 하나의 코드로 여러 타입을 안전하게 다뤄요.', 'List<T>, Promise<T>, API 응답 래퍼처럼 컨테이너를 만들 때 필수예요. any로 도망가지 말고 제네릭으로 타입을 이어 주세요.', 'Take types as parameters so one piece of code safely handles many types.', 'Essential for containers like List<T>, Promise<T> and API response wrappers; reach for generics instead of any.', sGeneric()),
    item('pl-null', 'null 안전성', 'Null safety', 'null일 수 있는 값을 타입으로 표시하고, ?. 같은 연산자로 안전하게 접근해요. 컴파일러가 null 체크 누락을 잡아 줘요.', 'TypeScript strictNullChecks, Kotlin의 String?, Swift Optional을 켜 두세요. NullPointerException이 크게 줄어요.', 'Mark values that may be null in their types and access them safely with operators like ?.; the compiler flags missing checks.', 'Turn on TypeScript strictNullChecks or use Kotlin String? and Swift Optional; null-pointer crashes drop sharply.', sNull())
  ]),
  sec('pl-mem', '메모리·스코프', 'Memory & scope', '메모리, 스코프, 클로저', 'Memory, scope and closures',
    '변수가 어디에 살고 언제 사라지는지에 대한 규칙이에요.', 'Rules for where variables live and when they disappear.', [
    item('pl-stackheap', '스택과 힙', 'Stack vs heap', '함수 호출마다 쌓이는 스택에는 지역 변수와 참조가, 힙에는 객체가 저장돼요. 스택은 자동으로 정리되고 힙은 GC나 직접 해제가 필요해요.', '재귀가 깊으면 스택이 넘치고, 힙 객체를 계속 붙잡으면 메모리 누수가 생겨요.', 'Each call pushes a stack frame of locals and references; objects live on the heap. The stack cleans itself; the heap needs GC or manual freeing.', 'Deep recursion overflows the stack; holding onto heap objects leaks memory.', sStackHeap()),
    item('pl-value', '값 전달 vs 참조 전달', 'Pass by value vs reference', '숫자 같은 원시값은 복사되어 전달되고, 객체·배열은 같은 객체를 가리키는 참조가 전달돼요.', '함수 안에서 인자로 받은 배열을 고치면 호출한 쪽도 바뀌어요. React 상태를 직접 수정하면 안 되는 이유예요.', 'Primitives like numbers are copied; objects and arrays are passed as references to the same object.', 'Mutating an array argument changes the caller’s array too, which is why React state must not be mutated.', sValue()),
    item('pl-gc', '가비지 컬렉션', 'Garbage collection', '루트(전역·스택)에서 닿을 수 있는 객체를 표시하고, 닿지 않는 객체를 자동으로 해제해요.', 'GC 멈춤이 응답 지연 튐의 원인이 되기도 해요. 큰 캐시·전역 맵·해제 안 한 리스너가 대표적인 누수예요.', 'Marks objects reachable from roots (globals, stack) and automatically frees the rest.', 'GC pauses can cause latency spikes. Big caches, global maps and forgotten listeners are classic leaks.', sGC()),
    item('pl-refcount', '참조 카운팅', 'Reference counting', '객체마다 가리키는 곳의 수를 세서 0이 되면 바로 해제해요. 서로를 가리키는 순환은 0이 안 돼서 새요.', 'Swift(ARC)·Python·C++ shared_ptr이 이 방식이에요. 델리게이트·부모 참조는 weak로 두세요.', 'Each object counts its references and is freed when the count reaches zero; cycles never reach zero and leak.', 'Swift ARC, Python and C++ shared_ptr use it. Make delegate and parent references weak.', sRC()),
    item('pl-scope', '스코프', 'Scope', '변수를 찾을 수 있는 범위예요. 코드에 쓰인 위치로 정해지고, 안쪽에서 바깥쪽 순서로 찾아요.', 'let·const의 블록 스코프를 쓰고 var는 피하세요. 같은 이름을 안쪽에 다시 선언하면 바깥 변수가 가려져요(섀도잉).', 'Where a variable can be seen, decided by where it is written and searched from inner to outer scopes.', 'Prefer block-scoped let/const over var. Redeclaring a name inside hides the outer one (shadowing).', sScope()),
    item('pl-closure', '클로저', 'Closure', '함수가 만들어질 때의 주변 변수를 기억해서, 바깥 함수가 끝난 뒤에도 그 변수를 쓸 수 있어요.', '비공개 상태, 콜백, React 훅이 클로저예요. 반복문 안의 비동기 콜백이 마지막 값만 보는 버그도 클로저 때문이에요.', 'A function remembers the variables around it when created and can use them after the outer function has returned.', 'Private state, callbacks and React hooks are closures; so is the classic bug where loop callbacks all see the last value.', sClosure())
  ]),
  sec('pl-conc', '비동기·예외', 'Async & errors', '비동기와 예외 처리', 'Asynchrony and exceptions',
    '기다리는 일과 실패하는 일을 다루는 방법이에요.', 'Handling work that waits and work that fails.', [
    item('pl-async', '콜백 → Promise → async/await', 'Callbacks → Promises → async/await', '비동기 작업을 콜백으로 이으면 중첩이 깊어지고, Promise는 체인으로 펴고, async/await는 동기 코드처럼 읽히게 해요.', 'await를 반복문에서 하나씩 쓰면 순차 실행돼 느려요. 독립적인 요청은 Promise.all로 동시에 보내고, 에러는 try/catch로 잡으세요.', 'Chaining async work with callbacks nests deeply; promises flatten it into chains; async/await reads like synchronous code.', 'Awaiting in a loop runs requests one by one; send independent ones together with Promise.all and catch errors with try/catch.', sAsync()),
    item('pl-coroutine', '스레드 vs 코루틴', 'Threads vs coroutines', '스레드는 OS가 강제로 번갈아 실행하는 무거운 실행 단위이고, 코루틴은 스스로 양보하며 번갈아 실행되는 가벼운 단위예요.', '동시 연결이 많은 서버는 코루틴(Go, Kotlin, Java 가상 스레드)으로 적은 자원에 많은 작업을 처리해요.', 'Threads are heavy units the OS preempts; coroutines are light units that take turns by yielding voluntarily.', 'Servers with many connections use coroutines (Go, Kotlin, Java virtual threads) to handle lots of work cheaply.', sCoroutine()),
    item('pl-exception', '예외 처리', 'Exception handling', '예외가 던져지면 catch를 만날 때까지 호출 스택을 거슬러 올라가며 프레임을 정리해요(스택 되감기).', '예외를 잡고 아무것도 안 하면 버그가 숨어요. 처리할 수 있는 곳에서 잡고, 나머지는 로깅 후 상위로 보내세요. finally로 자원을 정리하세요.', 'A thrown exception unwinds the call stack, frame by frame, until a catch handles it.', 'Catching and ignoring hides bugs. Catch where you can act, log and rethrow otherwise, and clean up in finally.', sException())
  ])
]);
window.UX[0].css += `
.pl-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.pl-code{place-items:center start!important;padding-left:.7em}
.pl-code .in{font-family:var(--f-mono);font-size:.6em;font-weight:600}
.pl-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.pl-big .in{font-size:.95em;font-weight:800}
.pl-xs .in{font-size:.52em}`;
})();
