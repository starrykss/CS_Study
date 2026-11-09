(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c pa-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const code = (S, k, x, y, w, t, st, h) => cell(S, k, x, y, t, { w, h: h || 2, cls: 'cz-c pa-code', s: st });
function fly(S, k, a, b, st, lab, sty, o = {}) { const r = o.r || .8; dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) }); S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r); if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' }); return S; }

/* ---------- paradigms ---------- */
function sDecl() {
  const S = scene({ id: 'pa-imperative', steps: 5, per: 1.3 });
  text(S, 'h1', 1, 1, ['명령형: 어떻게', 'Imperative: how'], { cls: 'cz-t pa-b' }); text(S, 'h2', 17, 1, ['선언형: 무엇을', 'Declarative: what'], { cls: 'cz-t pa-b' });
  ['const out = []', 'for (const n of nums)', '  if (n % 2 === 0)', '    out.push(n * 2)'].forEach((t, i) => code(S, 'a' + i, 1, 2.6 + i * 2.3, 14.6, t, {}, 2));
  ['nums', '  .filter(n => n % 2 === 0)', '  .map(n => n * 2)'].forEach((t, i) => code(S, 'b' + i, 17, 2.6 + i * 2.3, 14.4, t, {}, 2));
  const row = (k, y, vals, st, step) => vals.forEach((v, i) => { chip(S, `${k}${i}`, 1 + i * 2.6, y, 2.3, String(v), step ? hid(st) : st, { h: 2.2 }); if (step) S.set(`${k}${i}`, step, { opacity: '1' }); });
  row('r0', 12.6, [1, 2, 3, 4, 5, 6], {}, 0); row('r1', 15.4, [2, 4, 6], C.soft, 2); row('r2', 18.2, [4, 8, 12], C.ok, 3);
  text(S, 'f', 17, 15.8, '.filter →', { cls: 'cz-t cz-mono', s: hid() }); text(S, 'm', 17, 18.6, '.map →', { cls: 'cz-t cz-mono', s: hid() }); S.set('f', 2, { opacity: '1' }).set('m', 3, { opacity: '1' });
  [1, 2, 3].forEach(i => S.set('a' + i, 1, C.cmp)); S.set('b1', 2, C.soft).set('b2', 3, C.ok);
  S.cap(1, '명령형은 반복·조건·상태 변경을 하나하나 지시해요', 'Imperative code spells out loops, branches and state changes').cap(2, '선언형은 원하는 결과를 설명해요: 짝수만', 'Declarative code describes the result: keep evens')
    .cap(3, '두 배로', 'and double them').cap(5, 'SQL·HTML·React JSX도 선언형 · 읽기 쉽고 실수가 적어요', 'SQL, HTML and JSX are declarative too · easier to read, fewer bugs');
  return S;
}
function sOOP() {
  const S = scene({ id: 'pa-oop', steps: 5, per: 1.4 });
  const A = [[['캡슐화', 'Encapsulation'], ['데이터를 숨기고 메서드로만 다뤄요', 'hide data behind methods']], [['상속', 'Inheritance'], ['부모의 기능을 물려받아 확장', 'extend a parent’s behaviour']], [['다형성', 'Polymorphism'], ['같은 호출, 객체마다 다른 동작', 'same call, different behaviour']], [['추상화', 'Abstraction'], ['핵심만 드러내고 세부는 감춰요', 'expose essentials, hide details']]];
  A.forEach(([n, d], i) => { const x = 1.5 + (i % 2) * 15, y = 1.6 + Math.floor(i / 2) * 9.6; box(S, 'b' + i, x, y, 14, 8.6, ''); text(S, 'n' + i, x + .8, y + .8, n, { cls: 'cz-t pa-big' }); text(S, 'd' + i, x + .8, y + 4.4, d, { cls: 'cz-t', s: { opacity: '.35' } }); S.set('b' + i, i + 1, C.soft).set('d' + i, i + 1, { opacity: '1' }); if (i) S.set('b' + (i - 1), i + 1, C.idle); });
  S.set('b3', 5, C.idle);
  S.cap(0, '객체지향의 네 가지 기둥', 'The four pillars of object-oriented programming').cap(1, '은행 계좌의 잔액은 입출금 메서드로만 바꿔요', 'A bank balance changes only via deposit and withdraw')
    .cap(2, '관리자는 사용자를 확장한 것', 'An admin extends a user').cap(3, '도형마다 area()가 다르게 계산돼요', 'Each shape computes area() its own way').cap(4, '결제 인터페이스만 알면 카드인지 계좌인지 몰라도 돼요', 'Code only needs the payment interface, not the card details');
  return S;
}
function sEncap() {
  const S = scene({ id: 'pa-encap', steps: 5, per: 1.3 });
  box(S, 'obj', 10, 3, 12.4, 12, '', { s: C.soft }); text(S, 'ot', 10, 3.6, 'Account', { w: 12.4, cls: 'cz-t cz-tc cz-mono pa-b' });
  S.label('bal', { cls: 'cz-c pa-m', x: 11.2, y: 6, w: 10, h: 2.4 }, [[0, '#balance = 1000'], [4, '#balance = 1100']]);
  Object.assign(S.get('bal~1').s, C.ok);
  text(S, 'lk', 11.2, 8.8, ['private · 밖에서 직접 못 건드려요', 'private · no direct access'], { cls: 'cz-t' });
  chip(S, 'dep', 11.2, 10.8, 10, 'deposit(amount)', C.idle, { h: 2.2 }); chip(S, 'chk', 11.2, 13.2, 10, ['if (amount ≤ 0) 거부', 'if (amount ≤ 0) reject'], hid(C.cmp), { h: 1.6, cls: 'pa-xs' });
  code(S, 'bad', 1, 17.2, 14, 'acc.balance = -100', hid(C.bad), 2.2); S.set('bad', 1, { opacity: '1' });
  pill(S, 'bx', 1, 19.6, ['접근 불가 ✗', 'not accessible ✗'], { w: 14, h: 1.6, s: hid(C.badf) }); S.set('bx', 2, { opacity: '1' });
  code(S, 'good', 17.2, 17.2, 14, 'acc.deposit(100)', hid(C.ok), 2.2); S.set('good', 3, { opacity: '1' });
  S.set('dep', 3, C.ok).set('chk', 3, { opacity: '1' });
  S.cap(1, '바깥에서 잔액을 마음대로 바꾸려 하면', 'Outside code trying to set the balance directly').cap(2, '막혀요', 'is blocked').cap(3, '정해진 메서드를 통해서만', 'Only through the method')
    .cap(4, '검증을 거쳐 바뀌어요 · 규칙이 한곳에 모여요', 'it changes after validation · the rules live in one place').cap(5, '내부를 바꿔도 쓰는 쪽 코드는 그대로', 'Internals can change without breaking callers');
  return S;
}
function sPoly() {
  const S = scene({ id: 'pa-poly', steps: 5, per: 1.3 });
  code(S, 'c', 1, 1, 30, 'for (const s of shapes) total += s.area()', {}, 2.2);
  const SH = [['circ', 4, 'Circle', 'π r² = 12.6', 'border-radius:50%'], ['sq', 14, 'Square', 'a² = 9', 'border-radius:.3em'], ['tri', 24, 'Triangle', '½ b h = 6', 'clip-path:polygon(50% 0,100% 100%,0 100%)']];
  SH.forEach(([k, x, n, f, shape], i) => { S.el(k, { x, y: 5, w: 5, h: 5, css: shape, s: { background: ['var(--accent-soft)', 'var(--warn-soft)', 'color-mix(in srgb,var(--ok) 25%,var(--ui))'][i] } }); text(S, k + 'n', x - 1.5, 10.6, n, { w: 8, cls: 'cz-t cz-tc cz-mono pa-b' }); chip(S, k + 'r', x - 1.5, 12.4, 8, f, hid(C.ok), { h: 2.2 }); S.set(k, i + 1, { transform: 'scale(1.12)' }).set(k, i + 2, { transform: 'none' }).set(k + 'r', i + 1, { opacity: '1' }); });
  S.label('t', { cls: 'cz-t cz-mono pa-big', x: 1, y: 16, w: 30 }, [[0, 'total = 0'], [1, 'total = 12.6'], [2, 'total = 21.6'], [3, 'total = 27.6']]);
  S.cap(1, '같은 area() 호출이', 'The same area() call').cap(2, '객체 종류에 맞는 계산으로 바뀌어요', 'runs whichever calculation fits the object').cap(4, '호출하는 쪽은 도형 종류를 몰라도 돼요', 'The caller never checks the type')
    .cap(5, '새 도형을 추가해도 반복문은 그대로 (OCP) · if/switch 분기를 없애요', 'Add a shape without touching the loop · no if/switch on types');
  return S;
}
function sInherit() {
  const S = scene({ id: 'pa-inherit', steps: 5, per: 1.4 });
  text(S, 'h1', 1, .8, ['상속', 'Inheritance'], { cls: 'cz-t pa-b' });
  const T = { an: [8, 3.4, 'Animal'], bd: [8, 8.4, 'Bird · fly()'], eg: [3.6, 13.6, 'Eagle'], pg: [12.4, 13.6, 'Penguin'] };
  [['an', 'bd'], ['bd', 'eg'], ['bd', 'pg']].forEach(([a, b]) => link(S, 'i' + a + b, [T[b][0], T[b][1] - 1.2], [T[a][0], T[a][1] + 1.2], 0, .1));
  Object.entries(T).forEach(([k, [x, y, l]]) => box(S, k, x - 3.8, y - 1.2, 7.6, 2.4, l, { cls: 'cz-box cz-bx cz-mono pa-xs' }));
  S.set('pg', 1, C.bad); pill(S, 'px', 2, 16.6, ['펭귄도 fly()를 물려받음 ✗', 'Penguin inherits fly() ✗'], { w: 13, h: 1.8, s: hid(C.bad) }); S.set('px', 1, { opacity: '1' });
  text(S, 'h2', 17.6, .8, ['합성', 'Composition'], { cls: 'cz-t pa-b', s: hid() }); S.set('h2', 2, { opacity: '1' });
  const CP = [['ce', 17.6, 3.4, 'Eagle', [['Fly', C.soft], ['Eat', C.ok]]], ['cp', 17.6, 10.4, 'Penguin', [['Swim', C.cmp], ['Eat', C.ok]]]];
  CP.forEach(([k, x, y, n, parts]) => { box(S, k, x, y, 13.4, 5.6, '', { s: hid() }); text(S, k + 'n', x + .6, y + .4, n, { cls: 'cz-t cz-mono pa-b', s: hid() }); parts.forEach(([p, st], j) => chip(S, `${k}${j}`, x + .8 + j * 6.2, y + 2.6, 5.6, p, hid(st), { h: 2.2 })); show(S, [k, k + 'n', ...parts.map((_, j) => `${k}${j}`)], 3); });
  S.cap(1, '깊은 상속은 필요 없는 기능까지 물려받아요', 'Deep inheritance drags in behaviour you don’t want').cap(3, '합성은 필요한 능력을 부품처럼 조립해요', 'Composition assembles abilities like parts')
    .cap(4, '"is-a"보다 "has-a" · 상속은 진짜 동일한 관계에서만', 'Prefer has-a over is-a · inherit only for true sameness').cap(5, '게임 엔진의 ECS, React 컴포넌트 조합이 합성 방식', 'Game ECS and React component composition work this way');
  return S;
}
function sPure() {
  const S = scene({ id: 'pa-pure', steps: 6, per: 1.15 });
  text(S, 'h1', 1, .8, ['순수 함수', 'Pure function'], { cls: 'cz-t pa-b' }); text(S, 'h2', 1, 10.6, ['순수하지 않은 함수', 'Impure function'], { cls: 'cz-t pa-b' });
  box(S, 'f', 11, 2.6, 9, 4, 'double(x) = x × 2', { cls: 'cz-box cz-bx cz-mono', s: C.ok });
  box(S, 'g', 11, 12.4, 9, 4, 'addTax(x)', { cls: 'cz-box cz-bx cz-mono', s: C.cmp });
  code(S, 'gl', 22.4, 11.2, 9, 'let rate = 0.1', {}, 2); S.label('glv', { cls: 'cz-t cz-mono', x: 22.4, y: 13.6, w: 9 }, [[0, ''], [4, ['누군가 0.2로 바꿈', 'someone set 0.2']]]);
  const io = (k, y, step, inp, out, st, hideAt) => { chip(S, k + 'i', 2, y, 6.4, inp, hid(), { h: 2.4 }); chip(S, k + 'o', 22.4, y, 8.6, out, hid(st), { h: 2.4 }); arrow(S, k + 'a', 8.6, y + 1.2, 10.8, y + 1.2, { s: hid() }); arrow(S, k + 'b', 20.2, y + 1.2, 22.2, y + 1.2, { s: hid() }); show(S, [k + 'i', k + 'a', k + 'b', k + 'o'], step); if (hideAt) [k + 'i', k + 'a', k + 'b', k + 'o'].forEach(x => S.set(x, hideAt, { opacity: '0' })); };
  io('p1', 3.4, 1, '3', '6', C.ok, 2); io('p2', 3.4, 2, '3', ['6 (항상 같음)', '6 (always)'], C.ok);
  io('q1', 13.2, 3, '100', '110', C.cmp, 5); io('q2', 13.2, 5, '100', ['120 ?!', '120 ?!'], C.bad);
  pill(S, 'se', 22.4, 17.2, ['+ DB에 기록 (부수 효과)', '+ writes to DB (side effect)'], { w: 9, h: 1.8, s: hid(C.badf) }); S.set('se', 5, { opacity: '1' });
  S.cap(1, '같은 입력엔 언제나 같은 출력', 'Same input, same output, every time').cap(2, '바깥 상태를 읽지도 바꾸지도 않아요', 'It neither reads nor changes outside state')
    .cap(3, '바깥 변수에 기대는 함수는', 'A function that depends on outside state').cap(5, '같은 입력에도 결과가 달라지고 다른 곳까지 바꿔요', 'gives different results and changes things elsewhere')
    .cap(6, '순수 함수는 테스트·캐시·병렬화가 쉬워요 · 부수 효과는 가장자리로 몰아요', 'Pure functions are easy to test, cache and parallelize · push side effects to the edges');
  return S;
}
function sImmut() {
  const S = scene({ id: 'pa-immut', steps: 5, per: 1.35 });
  text(S, 'h1', 1, .8, ['변경 (mutation)', 'Mutation'], { cls: 'cz-t pa-b' }); text(S, 'h2', 17, .8, ['불변 (immutable)', 'Immutable'], { cls: 'cz-t pa-b' });
  chip(S, 'r1', 1, 3, 4.4, 'a →', {}, { h: 2.2 }); chip(S, 'r2', 1, 6.4, 4.4, 'b →', {}, { h: 2.2 });
  S.label('o1', { cls: 'cz-c pa-m', x: 7.4, y: 4.4, w: 8, h: 3 }, [[0, '{ age: 30 }'], [1, '{ age: 31 }']]); Object.assign(S.get('o1~1').s, C.bad);
  arrow(S, 'ra', 5.6, 4.1, 7.2, 5.4); arrow(S, 'rb', 5.6, 7.5, 7.2, 6.4);
  text(S, 'n1', 1, 9.6, ['a.age = 31 → b도 바뀜 (모르는 새에)', 'a.age = 31 → b changed too (surprise)'], { cls: 'cz-t', s: hid() }); S.set('n1', 1, { opacity: '1' });
  chip(S, 's1', 17, 3, 4.4, 'a →', {}, { h: 2.2 }); chip(S, 's2', 17, 6.4, 4.4, 'b →', {}, { h: 2.2 });
  chip(S, 'p1', 23.4, 4.4, 8, '{ age: 30 }', {}, { h: 3 }); arrow(S, 'sa', 21.6, 4.1, 23.2, 5.4); arrow(S, 'sb', 21.6, 7.5, 23.2, 6.4);
  chip(S, 'p2', 23.4, 10.4, 8, '{ age: 31 }', hid(C.ok), { h: 3 }); S.set('p2', 3, { opacity: '1' }); code(S, 'up', 17, 14.4, 14.4, 'const a2 = { ...a, age: 31 }', hid(C.soft), 2.2); S.set('up', 2, { opacity: '1' });
  text(S, 'n2', 1, 18.6, ['원본은 그대로 · 바뀐 걸 비교 한 번(a !== a2)으로 감지', 'original intact · change detected with a !== a2'], { cls: 'cz-t', s: hid() }); S.set('n2', 4, { opacity: '1' });
  S.cap(1, '객체를 직접 고치면 같은 객체를 보던 모든 곳이 바뀌어요', 'Mutating an object changes it for everyone holding it').cap(2, '불변 방식은 바꾼 복사본을 새로 만들어요', 'The immutable way creates an updated copy')
    .cap(4, '이전 값이 남아 있어 비교·되돌리기·디버깅이 쉬워요', 'Old values remain, so diffing, undo and debugging are easy').cap(5, 'React·Redux 상태 업데이트, 멀티스레드 안전성의 기본', 'The foundation of React/Redux updates and thread safety');
  return S;
}
function sHOF() {
  const S = scene({ id: 'pa-hof', steps: 6, per: 1.15 });
  const ST = [['orders', 1], ['.filter(paid)', 9], ['.map(o => o.amount)', 17], ['.reduce(sum)', 25.4]];
  ST.forEach(([t, x], i) => code(S, 's' + i, x, 1.4, i === 3 ? 6.4 : 7.4, t, i ? hid(C.soft) : {}, 2.2));
  [1, 2, 3].forEach(i => S.set('s' + i, i + 1, { opacity: '1' }));
  const O = [['A', 300, 1], ['B', 500, 0], ['C', 200, 1], ['D', 400, 1]];
  O.forEach(([n, a, paid], i) => { const y = 5.4 + i * 3.2; chip(S, 'o' + i, 1.4, y, 6.6, `${n} · ${a} · ${paid ? '✓' : '✗'}`, paid ? {} : C.bad, { h: 2.4, cls: 'pa-xs' }); if (paid) { chip(S, 'f' + i, 9.4, y, 6.6, `${n} · ${a}`, hid(C.ok), { h: 2.4, cls: 'pa-xs' }); S.set('f' + i, 2, { opacity: '1' }); chip(S, 'm' + i, 17.4, y, 6.6, String(a), hid(C.soft), { h: 2.4 }); S.set('m' + i, 3, { opacity: '1' }); } });
  chip(S, 'sum', 25.4, 9.4, 6.4, '900', hid(C.okf), { h: 3, cls: 'pa-big' }); S.set('sum', 4, { opacity: '1' });
  text(S, 'n', 1, 18.4, ['함수를 인자로 받는 함수 = 고차 함수', 'functions that take functions = higher-order functions'], { cls: 'cz-t pa-b', s: hid() }); S.set('n', 5, { opacity: '1' });
  S.cap(1, '주문 목록에서', 'From a list of orders').cap(2, '결제된 것만 걸러', 'keep the paid ones').cap(3, '금액만 뽑아', 'pick out the amounts').cap(4, '모두 더해요', 'and add them up')
    .cap(6, '반복문 없이 "무엇을" 할지만 이어 붙여요 · 각 단계는 따로 테스트 가능', 'Chain what to do, no loops · each step is testable on its own');
  return S;
}
function sCompose() {
  const S = scene({ id: 'pa-compose', steps: 5, per: 1.3 });
  code(S, 'c', 1, 1, 30, 'const slug = pipe(trim, toLower, replaceSpaces)', {}, 2.2);
  const F = [['trim', 1.6], ['toLower', 11.6], ['replaceSpaces', 21.6]];
  F.forEach(([n, x]) => box(S, 'f' + n, x, 8, 8.8, 3.6, n, { cls: 'cz-box cz-bx cz-mono pa-xs' }));
  for (let i = 0; i < 2; i++) arrow(S, 'a' + i, 10.6 + i * 10, 9.8, 11.4 + i * 10, 9.8);
  const V = ['"  Hello World  "', '"Hello World"', '"hello world"', '"hello-world"'];
  S.label('v', { cls: 'cz-c pa-m', x: 6, y: 14.4, w: 20, h: 2.8, s: C.soft }, V.map((v, i) => [i, v]));
  Object.assign(S.get('v~3').s, C.ok);
  ['ftrim', 'ftoLower', 'freplaceSpaces'].forEach((k, i) => S.set(k, i + 1, C.soft).set(k, i + 2, C.idle));
  S.cap(0, '작은 함수들을 이어 붙여 새 함수를 만들어요', 'Join small functions into a new one').cap(1, '공백을 자르고', 'trim the spaces').cap(2, '소문자로 바꾸고', 'lower-case it').cap(3, '공백을 -로', 'swap spaces for dashes')
    .cap(5, '레고처럼 조합 · 각 조각은 재사용·테스트가 쉬워요 (Unix 파이프와 같은 생각)', 'Combine like Lego · each piece is reusable and testable (like Unix pipes)');
  return S;
}
function sReactive() {
  const S = scene({ id: 'pa-reactive', steps: 6, per: 1.1 });
  const lanes = [['ev', 2.4, ['입력 이벤트', 'keyup events']], ['fl', 8.2, ['filter(길이 ≥ 2)', 'filter(len ≥ 2)']], ['db', 14, 'debounce(300ms)']];
  lanes.forEach(([k, y, l]) => { text(S, k + 'l', .8, y - 1.4, l, { cls: 'cz-t cz-mono pa-b' }); S.el(k + 'ln', { x: 1, y: y + 1, w: 30, h: .14, css: 'background:var(--ink-3)' }); });
  const E = [[2, 'k'], [5, 'ke'], [7, 'key'], [13, 'keyb'], [15, 'keybo'], [17, 'keybo'], [24, 'keyboa']];
  E.forEach(([t, v], i) => { dot(S, 'e' + i, 2 + t * 1.05, 3.4, v.length > 3 ? '' : v, { r: .9, s: hid(C.soft) }); S.set('e' + i, 1 + Math.floor(i / 3), { opacity: '1' }); if (v.length >= 2) { dot(S, 'f' + i, 2 + t * 1.05, 9.2, '', { r: .9, s: hid(C.cmp) }); S.set('f' + i, 2 + Math.floor(i / 3), { opacity: '1' }); } });
  [[8.4, 'key', 4], [20, 'keybo', 5], [25.4, 'keyboa', 6]].forEach(([t, v, st], i) => { dot(S, 'd' + i, 2 + t * 1.05 - 1.2, 15, '', { r: 1, s: hid(C.ok) }); S.set('d' + i, st, { opacity: '1' }); text(S, 'dt' + i, 2 + t * 1.05 - 3.6, 16.8, `"${v}"`, { w: 4.8, cls: 'cz-t cz-tc cz-mono', s: hid() }); S.set('dt' + i, st, { opacity: '1' }); });
  text(S, 'api', 1, 18.6, ['→ 검색 API는 3번만 호출', '→ search API called only 3 times'], { cls: 'cz-t pa-b', s: hid() }); S.set('api', 6, { opacity: '1' });
  S.cap(1, '이벤트를 시간 위의 흐름(스트림)으로 다뤄요', 'Treat events as a stream over time').cap(2, '연산자로 거르고', 'Filter with operators').cap(4, '잠잠해질 때만 통과시켜', 'let through only after a pause')
    .cap(6, 'RxJS, Kotlin Flow, 반응형 UI 상태가 이 방식 · 비동기 흐름을 선언적으로', 'RxJS, Kotlin Flow and reactive UI state work this way · async made declarative');
  return S;
}

/* ---------- clean code ---------- */
function sNaming() {
  const S = scene({ id: 'pa-naming', steps: 4, per: 1.5 });
  const P = [['const d = 7', 'const elapsedDays = 7'], ['fn(x)', 'calculateShippingFee(order)'], ['let flag = true', 'let isEmailVerified = true'], ['list2', 'activeUsers']];
  P.forEach(([a, b], i) => { const y = 1.6 + i * 4.4; code(S, 'a' + i, 1, y, 13, a, C.bad, 2.6); arrow(S, 'r' + i, 14.4, y + 1.3, 16.6, y + 1.3, { s: hid() }); code(S, 'b' + i, 17, y, 14.4, b, hid(C.ok), 2.6); S.set('r' + i, Math.min(i + 1, 3), { opacity: '1' }).set('b' + i, Math.min(i + 1, 3), { opacity: '1' }); });
  text(S, 'n', 1, 19, ['주석으로 설명해야 하면 이름을 먼저 고치세요', 'If it needs a comment, rename it first'], { cls: 'cz-t pa-b', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, '단위·의미를 이름에 담아요', 'Put meaning and units in the name').cap(2, '함수는 동사로 무엇을 하는지', 'Functions get verbs saying what they do').cap(3, 'boolean은 is·has·can으로 시작', 'Booleans read as is/has/can')
    .cap(4, '코드는 쓰는 시간보다 읽히는 시간이 10배 길어요', 'Code is read ten times more than it is written');
  return S;
}
function sSmallFn() {
  const S = scene({ id: 'pa-func', steps: 5, per: 1.35 });
  box(S, 'big', 1, 1.4, 13, 17.6, '', {}); text(S, 'bt', 1.6, 1.8, ['processOrder() · 120줄', 'processOrder() · 120 lines'], { cls: 'cz-t cz-mono pa-b' });
  const P = [[['검증', 'validate'], C.cmp], [['가격 계산', 'pricing'], C.soft], [['저장', 'save'], C.ok], [['알림', 'notify'], C.bad]];
  P.forEach(([l, st], i) => chip(S, 'p' + i, 1.8, 4 + i * 3.6, 11.4, l, st, { h: 3.2 }));
  const N = ['validate(order)', 'price(order)', 'save(order)', 'notify(user)'];
  text(S, 'mt', 17, 1.8, 'processOrder()', { cls: 'cz-t cz-mono pa-b', s: hid() }); S.set('mt', 1, { opacity: '1' });
  N.forEach((n, i) => { code(S, 'n' + i, 17, 4 + i * 3.6, 14, n, hid(P[i][1]), 3.2); S.set('n' + i, i + 1, { opacity: '1' }).set('p' + i, i + 1, { opacity: '.25' }); });
  S.cap(1, '긴 함수 안의 덩어리마다 이름을 붙여 꺼내요', 'Extract each chunk of a long function into a named one').cap(4, '본문은 무엇을 하는지 목차처럼 읽혀요', 'The body now reads like a table of contents')
    .cap(5, '한 함수는 한 가지 일, 한 단계의 추상화 · 테스트도 조각별로', 'One function, one job, one level of abstraction · test each piece');
  return S;
}
function sDRY() {
  const S = scene({ id: 'pa-dry', steps: 5, per: 1.35 });
  const dup = ['email = email.trim().toLowerCase()', 'email = email.trim().toLowerCase()', 'email = email.trim().toLowerCase()'];
  dup.forEach((t, i) => { code(S, 'd' + i, 1, 1.6 + i * 2.8, 18, t, C.bad, 2.2); S.move('d' + i, 2, 1, 1.6 + 2.8); S.set('d' + i, 2, i === 1 ? C.ok : { opacity: '0' }); });
  S.label('dn', { cls: 'cz-t pa-b', x: 1, y: 9.6, w: 30 }, [[0, ''], [1, ['같은 코드 3곳 · 고칠 때 하나를 빠뜨려요', '3 copies · one gets missed']], [2, ['normalizeEmail() 하나로', 'one normalizeEmail()']]]);
  const PR = [['DRY', ['반복하지 마세요 (지식은 한 곳에)', 'Don’t repeat yourself (one source of truth)'], C.soft], ['KISS', ['단순하게 유지하세요', 'Keep it simple'], C.ok], ['YAGNI', ['지금 필요 없는 건 만들지 마세요', 'You aren’t gonna need it'], C.cmp]];
  PR.forEach(([n, d, st], i) => { pill(S, 'pr' + i, 1, 11 + i * 3, n, { w: 6.4, h: 2.2, cls: 'cz-pill pa-m', s: hid(st) }); text(S, 'pd' + i, 8.4, 11.5 + i * 3, d, { cls: 'cz-t', s: hid() }); show(S, ['pr' + i, 'pd' + i], i + 2); });
  S.cap(1, '똑같은 로직이 여러 곳에 있으면', 'The same logic in several places').cap(2, '하나로 모아요', 'gets pulled into one').cap(3, '복잡한 해법보다 단순한 해법', 'Simple beats clever')
    .cap(4, '"나중에 필요할지도"는 대부분 필요 없어요', '“Might need it later” usually never comes').cap(5, '단, 우연히 비슷한 코드까지 억지로 합치면 오히려 결합이 생겨요', 'But forcing merely similar code together creates coupling');
  return S;
}
function sGuard() {
  const S = scene({ id: 'pa-guard', steps: 4, per: 1.5 });
  text(S, 'h1', 1, .8, ['중첩된 if', 'Nested ifs'], { cls: 'cz-t pa-b' }); text(S, 'h2', 17, .8, ['조기 반환', 'Guard clauses'], { cls: 'cz-t pa-b', s: hid() }); S.set('h2', 2, { opacity: '1' });
  ['if (user) {', '  if (user.active) {', '    if (cart.size > 0) {', '      checkout()', '    } else return "빈 장바구니"', '  } else return "비활성"', '} else return "로그인 필요"'].forEach((t, i) => code(S, 'a' + i, 1, 2.4 + i * 2.3, 14.8, t.replace(/"([^"]+)"/, (m, p) => ({ '빈 장바구니': '"empty"', '비활성': '"inactive"', '로그인 필요': '"login"' }[p] || m)), i === 3 ? C.ok : {}, 2));
  S.set('a3', 1, C.cmp);
  ['if (!user) return "login"', 'if (!user.active) return "inactive"', 'if (cart.size === 0) return "empty"', '', 'checkout()'].forEach((t, i) => { if (!t) return; code(S, 'b' + i, 17, 2.4 + i * 2.3, 14.4, t, hid(i === 4 ? C.ok : C.soft), 2); S.set('b' + i, 2, { opacity: '1' }); });
  S.cap(1, '핵심 로직이 들여쓰기 깊숙이 묻혀요', 'The main logic is buried deep in indentation').cap(2, '예외 상황을 먼저 걸러 바로 반환하면', 'Handle the edge cases first and return early')
    .cap(3, '핵심 로직이 맨 아래 평평하게 남아요', 'and the main path stays flat at the bottom').cap(4, '읽을 때 머릿속에 쌓아 둘 조건이 줄어요', 'Readers juggle fewer conditions');
  return S;
}
function sRefactor() {
  const S = scene({ id: 'pa-refactor', steps: 7, per: 1.05 });
  const steps = [['이름 바꾸기', 'Rename'], ['함수 추출', 'Extract function'], ['중복 제거', 'Remove duplication'], ['조건문 단순화', 'Simplify conditional']];
  S.el('code', { x: 2, y: 2, w: 14, h: 15, css: 'border-radius:.8em;border:.14em solid var(--line)', s: { background: 'var(--ui)' } });
  const blocks = [[2.8, 3, 12, 3.6], [2.8, 7.2, 12, 5], [2.8, 12.8, 12, 3.4]];
  blocks.forEach(([x, y, w, h], i) => { S.el('bl' + i, { x, y, w, h, css: 'border-radius:.4em', s: { background: ['var(--warn-soft)', 'var(--danger-soft)', 'var(--warn-soft)'][i], height: h + 'em' } }); });
  steps.forEach((l, i) => { chip(S, 's' + i, 18.4, 2 + i * 3.2, 12.6, l, hid(C.soft), { h: 2.4 }); const st = i + 1; S.set('s' + i, st, { opacity: '1' }); });
  S.set('bl1', 2, { height: '3em', background: 'var(--accent-soft)' }).set('bl0', 3, { background: 'var(--accent-soft)' }).set('bl2', 3, { opacity: '0' }).set('bl1', 4, { background: 'color-mix(in srgb,var(--ok) 25%,var(--ui))' }).set('bl0', 4, { background: 'color-mix(in srgb,var(--ok) 25%,var(--ui))' });
  S.label('t', { cls: 'cz-pill', x: 18.4, y: 15.4, w: 12.6, h: 2.4, s: C.ok }, [[0, ['테스트 128개 통과 ✓', '128 tests pass ✓']], [5, ['동작은 그대로 ✓', 'behaviour unchanged ✓']]]);
  S.cap(0, '리팩터링: 동작은 그대로 두고 구조만 개선해요', 'Refactoring: improve structure without changing behaviour').cap(1, '작은 단계 하나씩', 'One small step at a time').cap(2, '매 단계마다 테스트를 돌려요', 'run the tests after every step')
    .cap(5, '기능 추가와 리팩터링을 한 커밋에 섞지 마세요', 'Never mix refactoring and new features in one commit').cap(7, '테스트가 없으면 먼저 테스트부터 · IDE 자동 리팩터링 기능을 쓰세요', 'No tests? Write them first · use your IDE’s automated refactorings');
  return S;
}
function sSmell() {
  const S = scene({ id: 'pa-smell', steps: 7, per: 1 });
  const L = [[['긴 함수', 'Long method'], ['함수 추출', 'extract function']], [['거대한 클래스', 'God class'], ['책임별로 분리', 'split by responsibility']], [['중복 코드', 'Duplicate code'], ['공통 함수로', 'extract shared code']], [['긴 매개변수 목록', 'Long parameter list'], ['객체로 묶기', 'introduce parameter object']], [['기능 욕심', 'Feature envy'], ['메서드를 데이터 쪽으로 이동', 'move method to the data']], [['산탄총 수술', 'Shotgun surgery'], ['흩어진 변경을 한 모듈로', 'gather scattered changes']]];
  L.forEach(([s, f], i) => { const y = 1.4 + i * 3.1; chip(S, 's' + i, 1, y, 13, s, hid(C.bad), { h: 2.5 }); arrow(S, 'a' + i, 14.4, y + 1.25, 16.6, y + 1.25, { s: hid() }); chip(S, 'f' + i, 17, y, 14.4, f, hid(C.ok), { h: 2.5 }); show(S, ['s' + i, 'a' + i, 'f' + i], i + 1); });
  S.cap(1, '코드 스멜: 당장 버그는 아니지만 문제가 생길 징후', 'Code smells: not bugs yet, but warning signs').cap(3, '각 스멜엔 짝이 되는 리팩터링이 있어요', 'Each smell has a matching refactoring')
    .cap(7, '코드 리뷰에서 "왜 불편한지"를 말할 공통 어휘가 돼요', 'They give reviews a shared vocabulary for “why this feels wrong”');
  return S;
}
function sCoupling() {
  const S = scene({ id: 'pa-coupling', steps: 5, per: 1.35 });
  text(S, 'h1', 1, .8, ['강한 결합', 'Tight coupling'], { cls: 'cz-t pa-b' }); text(S, 'h2', 17, .8, ['느슨한 결합 · 높은 응집', 'Loose coupling · high cohesion'], { cls: 'cz-t pa-b' });
  const A = { a: [4, 5], b: [12, 5], c: [4, 13], d: [12, 13] };
  [['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd'], ['c', 'd']].forEach(([x, y]) => edge(S, 'ea' + x + y, A[x][0], A[x][1], A[y][0], A[y][1]));
  Object.entries(A).forEach(([k, [x, y]]) => box(S, 'm' + k, x - 2.4, y - 1.6, 4.8, 3.2, k.toUpperCase(), {}));
  S.set('ma', 1, C.cmp); ['mb', 'mc', 'md'].forEach(k => S.set(k, 2, C.bad)); ['eaab', 'eaac', 'eaad'].forEach(k => S.set(k, 2, { background: 'var(--danger)' }));
  text(S, 'n1', 1, 16.8, ['A를 고치면 B·C·D도 깨져요', 'change A, break B, C and D'], { cls: 'cz-t', s: hid() }); S.set('n1', 2, { opacity: '1' });
  const B = { a: [20, 5], b: [28, 5], c: [20, 13], d: [28, 13] };
  box(S, 'if', 21.6, 7.6, 4.8, 2.8, 'API', { cls: 'cz-box cz-bx cz-mono', css: 'border-style:dashed', s: hid(C.soft) }); S.set('if', 3, { opacity: '1' });
  Object.entries(B).forEach(([k, [x, y]]) => { box(S, 'n' + k, x - 2.4, y - 1.6, 4.8, 3.2, k.toUpperCase(), { s: hid() }); link(S, 'l' + k, [x, y], [24, 9], 1.7, 1.9, { s: hid() }); show(S, ['n' + k, 'l' + k], 3); });
  S.set('na', 4, C.cmp); ['nb', 'nc', 'nd'].forEach(k => S.set(k, 4, C.ok));
  text(S, 'n2', 17, 16.8, ['A 내부를 고쳐도 API가 같으면 안전 ✓', 'A changes inside; same API → safe ✓'], { cls: 'cz-t', s: hid() }); S.set('n2', 4, { opacity: '1' });
  S.cap(1, '모듈들이 서로의 내부를 직접 알고 쓰면', 'When modules reach into each other’s internals').cap(2, '하나의 변경이 연쇄적으로 번져요', 'one change ripples everywhere')
    .cap(3, '정해진 인터페이스로만 소통하면', 'Talk only through defined interfaces').cap(4, '변경이 그 모듈 안에 갇혀요', 'and changes stay contained').cap(5, '관련된 것끼리 모으고(응집), 경계는 얇게(결합)', 'Keep related things together (cohesion) and boundaries thin (coupling)');
  return S;
}

window.UX = page([
  sec('pa-paradigm', '패러다임', 'Paradigms', '프로그래밍 패러다임', 'Programming paradigms',
    '문제를 코드로 표현하는 서로 다른 사고방식이에요. 실무에선 여러 패러다임을 섞어 써요.', 'Different ways of expressing problems in code; real projects mix them.', [
    item('pa-imperative', '명령형 vs 선언형', 'Imperative vs declarative', '명령형은 "어떻게" 할지 단계별로 지시하고, 선언형은 "무엇을" 원하는지 설명해요.', 'SQL, HTML, CSS, React JSX, map/filter가 선언형이에요. 읽기 쉽고 실수가 적지만 내부 동작(성능)은 알고 써야 해요.', 'Imperative code says how, step by step; declarative code says what you want.', 'SQL, HTML, CSS, JSX and map/filter are declarative: easier to read, but know what they do under the hood.', sDecl()),
    item('pa-oop', '객체지향 4대 특성', 'Four pillars of OOP', '캡슐화, 상속, 다형성, 추상화로 데이터와 동작을 객체 단위로 묶어 복잡도를 다뤄요.', 'Java·C#·Kotlin·Swift 생태계의 기본이에요. 클래스 계층을 깊게 만들기보다 작은 객체를 조합하는 쪽이 유지보수가 쉬워요.', 'Encapsulation, inheritance, polymorphism and abstraction bundle data and behaviour into objects to manage complexity.', 'The backbone of Java, C#, Kotlin and Swift codebases; composing small objects usually beats deep class hierarchies.', sOOP()),
    item('pa-encap', '캡슐화', 'Encapsulation', '객체의 데이터를 숨기고 정해진 메서드로만 바꾸게 해서, 규칙(불변식)을 한곳에서 지켜요.', 'getter/setter를 기계적으로 다 만드는 건 캡슐화가 아니에요. "잔액은 음수가 될 수 없다" 같은 규칙을 객체 안에 두세요.', 'Hide an object’s data and change it only through methods, so its rules (invariants) are enforced in one place.', 'Auto-generating getters and setters for everything isn’t encapsulation; keep rules like “balance can’t go negative” inside.', sEncap()),
    item('pa-poly', '다형성', 'Polymorphism', '같은 메서드 호출이 객체의 실제 타입에 따라 다르게 동작해요.', '타입별 if/switch를 다형성으로 바꾸면 새 타입을 추가해도 기존 코드를 안 고쳐도 돼요(OCP).', 'The same method call behaves differently depending on the object’s actual type.', 'Replacing type-based if/switch with polymorphism lets you add types without editing existing code (open–closed).', sPoly()),
    item('pa-inherit', '상속보다 합성', 'Composition over inheritance', '상속은 부모의 모든 것을 물려받아 강하게 묶이고, 합성은 필요한 기능을 가진 객체를 조립해요.', '상속은 진짜 "is-a" 관계이고 깊이가 얕을 때만 쓰세요. 대부분은 인터페이스 + 합성이 변경에 강해요.', 'Inheritance binds a child tightly to everything in its parent; composition assembles objects that provide the needed abilities.', 'Inherit only for genuine, shallow is-a relationships; interfaces plus composition handle change better.', sInherit()),
    item('pa-pure', '순수 함수', 'Pure functions', '같은 입력엔 항상 같은 출력을 내고, 바깥 상태를 읽거나 바꾸지 않는(부수 효과 없는) 함수예요.', '테스트·캐싱·병렬 처리가 쉬워요. DB·네트워크 같은 부수 효과는 프로그램의 가장자리로 몰고 핵심 로직은 순수하게 두세요.', 'A function that always returns the same output for the same input and has no side effects.', 'Easy to test, cache and parallelize. Push side effects like DB and network calls to the edges and keep core logic pure.', sPure()),
    item('pa-immut', '불변성', 'Immutability', '값을 직접 고치지 않고, 바뀐 새 값을 만들어요. 원본은 그대로 남아요.', 'React·Redux는 참조 비교로 변경을 감지해서 불변 업데이트가 필수예요. 멀티스레드에서도 공유 데이터 버그를 없애 줘요.', 'Instead of changing a value in place, create a new one with the change; the original stays intact.', 'React and Redux detect changes by reference, so immutable updates are required; it also removes shared-data bugs in threads.', sImmut()),
    item('pa-hof', '고차 함수 · map/filter/reduce', 'Higher-order functions', '함수를 인자로 받거나 함수를 돌려주는 함수예요. map·filter·reduce로 데이터 변환을 파이프라인처럼 이어요.', '반복문보다 의도가 잘 드러나요. 다만 큰 데이터에서 단계마다 배열을 새로 만드니 성능이 중요하면 측정하세요.', 'Functions that take or return functions; map, filter and reduce chain data transformations like a pipeline.', 'Intent reads more clearly than loops, but each step allocates a new array, so measure on large data.', sHOF()),
    item('pa-compose', '함수 합성', 'Function composition', '작은 함수들을 이어서 새로운 함수를 만들어요. 앞 함수의 출력이 다음 함수의 입력이 돼요.', '유닉스 파이프(cat | grep | sort)와 같은 생각이에요. 미들웨어 체인, 데이터 정제 파이프라인에 써요.', 'Join small functions into a new one, where each output feeds the next input.', 'Same idea as Unix pipes (cat | grep | sort); used for middleware chains and data-cleaning pipelines.', sCompose()),
    item('pa-reactive', '반응형 프로그래밍', 'Reactive programming', '이벤트·데이터를 시간에 따라 흐르는 스트림으로 보고, 연산자로 거르고 합치고 변환해요.', '자동 완성, 실시간 대시보드, 드래그 처리처럼 비동기 이벤트가 얽힌 곳에 강해요(RxJS, Kotlin Flow). 과하게 쓰면 디버깅이 어려워요.', 'Treat events and data as streams over time and filter, merge and transform them with operators.', 'Shines with tangled async events like autocomplete, live dashboards and drag handling (RxJS, Kotlin Flow); overuse hurts debugging.', sReactive())
  ]),
  sec('pa-clean', '클린 코드', 'Clean code', '클린 코드와 리팩터링', 'Clean code and refactoring',
    '다른 사람(미래의 나 포함)이 읽고 고치기 쉬운 코드를 만드는 습관이에요.', 'Habits for code that others, including future you, can read and change.', [
    item('pa-naming', '의미 있는 이름', 'Meaningful names', '변수·함수 이름에 의도와 단위를 담아 주석 없이도 읽히게 해요.', '축약어·한 글자 이름은 반복문 인덱스 정도만 허용하세요. boolean은 is·has·can으로, 함수는 동사로 시작해요.', 'Put intent and units into names so code reads without comments.', 'Allow one-letter names only for loop indexes. Start booleans with is/has/can and functions with verbs.', sNaming()),
    item('pa-func', '작은 함수', 'Small functions', '함수는 한 가지 일만, 한 수준의 추상화로 짧게 써요. 긴 함수는 의미 있는 이름의 작은 함수들로 나눠요.', '함수 이름이 "그리고"로 길어지면 나눌 때예요. 작게 나누면 테스트와 재사용이 쉬워져요.', 'Functions should do one thing at one level of abstraction; split long ones into well-named smaller ones.', 'If a function name needs “and”, split it; small pieces are easier to test and reuse.', sSmallFn()),
    item('pa-dry', 'DRY · KISS · YAGNI', 'DRY · KISS · YAGNI', '같은 지식은 한 곳에(DRY), 최대한 단순하게(KISS), 지금 필요 없는 건 만들지 않기(YAGNI).', '세 번째 중복이 보일 때 추출하세요(Rule of Three). 우연히 비슷한 코드를 억지로 합치면 오히려 결합이 생겨요.', 'Keep each piece of knowledge in one place (DRY), keep things simple (KISS) and don’t build what you don’t need yet (YAGNI).', 'Extract on the third repetition (rule of three); merging merely similar code creates coupling.', sDRY()),
    item('pa-guard', '조기 반환 (가드 절)', 'Guard clauses', '예외 상황을 함수 앞쪽에서 먼저 처리하고 반환해서, 핵심 로직의 들여쓰기를 얕게 만들어요.', '"화살표 모양" 코드가 보이면 조건을 뒤집어 일찍 반환하세요. 에러 처리 경로도 한눈에 보여요.', 'Handle edge cases at the top and return early so the main logic stays shallow.', 'When you see arrow-shaped code, invert the conditions and return early; error paths become obvious.', sGuard()),
    item('pa-refactor', '리팩터링', 'Refactoring', '외부 동작은 바꾸지 않고 내부 구조를 개선하는 작업이에요. 작은 단계로 나눠 매번 테스트로 확인해요.', '기능 추가와 리팩터링을 같은 커밋에 섞지 마세요. IDE의 자동 리팩터링(이름 변경, 추출)을 쓰면 실수가 줄어요.', 'Improving internal structure without changing external behaviour, in small steps verified by tests.', 'Keep refactors and features in separate commits, and use IDE automated refactorings to avoid mistakes.', sRefactor()),
    item('pa-smell', '코드 스멜', 'Code smells', '긴 함수, 거대한 클래스, 중복, 긴 매개변수 목록처럼 당장 버그는 아니지만 문제가 생길 징후예요.', '스멜마다 대응하는 리팩터링이 정리되어 있어요(마틴 파울러, 『리팩터링』). 리뷰에서 공통 어휘로 쓰세요.', 'Long methods, god classes, duplication and long parameter lists: not bugs yet, but signs of trouble.', 'Each smell has a matching refactoring (Martin Fowler’s Refactoring); use them as shared review vocabulary.', sSmell()),
    item('pa-coupling', '결합도와 응집도', 'Coupling · Cohesion', '모듈 사이의 의존(결합)은 약하게, 모듈 안의 관련성(응집)은 강하게 만들어야 변경이 퍼지지 않아요.', '"이걸 고치려면 파일 몇 개를 건드려야 하나?"가 결합도의 체감 지표예요. 기능 단위로 폴더를 나누면 응집이 높아져요.', 'Keep dependencies between modules loose and relatedness within modules strong, so changes don’t spread.', '“How many files must I touch for this change?” is coupling you can feel; feature-based folders raise cohesion.', sCoupling())
  ])
]);
window.UX[0].css += `
.pa-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.pa-code{place-items:center start!important;padding-left:.7em}
.pa-code .in{font-family:var(--f-mono);font-size:.58em;font-weight:600}
.pa-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.pa-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.pa-xs .in{font-size:.55em}`;
})();
