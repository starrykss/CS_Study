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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'pax-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono pax-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono pax-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c pax-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono pax-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c pax-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'pax-s pax-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono pax-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono pax-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono pax-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono pax-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono pax-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'pax-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'pax-xs', 5));


const CSSX = `
.pax-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.pax-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.pax-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.pax-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.pax-r .in{color:var(--danger);font-weight:800}
.pax-g .in{color:var(--ok);font-weight:800}
.pax-a .in{color:var(--accent);font-weight:800}
.pax-w .in{color:var(--warn);font-weight:800}
.pax-c .in{font-size:.6em;font-weight:700}
.pax-c2 .in{font-size:.5em;font-weight:700}
.pax-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.pax-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };
/* ================= paradigms extras ================= */
function sLogic() {
  const S = scene({ id: 'pa-logic', steps: 5, per: 1.6 });
  code(S, 'c', 1, .8, 16, ['parent(tom, bob).', 'parent(bob, ann).', 'parent(bob, liz).', 'grand(X, Z) :-', '    parent(X, Y), parent(Y, Z).', '?- grand(tom, Who).'], [[0, 1], [3, 2], [5, 3]], { hoff: 5 });
  const N = { tom: [24.5, 1.8], bob: [24.5, 5.8], ann: [21, 9.8], liz: [28, 9.8] };
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, 'accent', 1, { r: 1.1 }));
  trn(S, 'e1', N.tom, N.bob, 'parent', 1, { ld: 1.6 }); gs(S, 'e2', N.bob, N.ann, 1, 'ink-3', .1, 1.1); gs(S, 'e3', N.bob, N.liz, 1, 'ink-3', .1, 1.1);
  tsets(S, 'ntom', [[3, 'warn', 40]]); tsets(S, 'nbob', [[3, 'warn', 40]]); tsets(S, 'nann', [[4, 'ok', 45]]); tsets(S, 'nliz', [[4, 'ok', 45]]);
  trn(S, 'g1', N.tom, N.bob, '', 3, { color: 'warn' }); gs(S, 'g2', N.bob, N.ann, 4, 'ok', .2, 1.1); gs(S, 'g3', N.bob, N.liz, 4, 'ok', .2, 1.1);
  T(S, 'r1', 19, 12, 'X = tom → parent(tom, Y) → Y = bob', 'cz-mono pax-xs pax-w', 3);
  T(S, 'r2', 19, 13, 'Who = ann ;', 'cz-mono pax-xs pax-g', 4); T(S, 'r3', 19, 14, ['Who = liz      (백트래킹)', 'Who = liz      (backtracking)'], 'cz-mono pax-xs pax-g', 4);
  notes(S, 'n', 10.2, [['사실: 참인 관계를 선언만 해요', 'facts: just declare what is true'], ['규칙: 오른쪽이 모두 참이면 왼쪽도 참', 'rule: the head holds if every goal in the body holds'], ['질의: 변수에 값을 맞춰 보며(단일화) 증명을 찾아요', 'query: unification tries bindings to build a proof'], ['답을 찾은 뒤 되돌아가(백트래킹) 다른 답도 찾아요', 'then it backtracks to find the other answers']], 'pax-s');
  fin(S, 'z', 15.6, [['무엇이 참인지만 말하면, 어떻게 찾을지는 엔진이 정해요 (선언형의 극단)', 'state what is true; the engine decides how to search (declarative to the extreme)', 'pax-xs pax-a'], ['Prolog, Datalog · 타입 검사기, 정책 엔진(OPA), 정적 분석 도구가 이 방식을 써요', 'Prolog, Datalog · used in type checkers, policy engines (OPA) and static analyzers'], ['SQL도 같은 정신: 결과를 묘사하면 실행 계획은 DB가 짜요', 'SQL shares the spirit: describe the result and the database plans the search']]);
  S.cap(1, '사실을 선언해요', 'Declare facts').cap(2, '규칙을 정의해요', 'Define a rule').cap(3, '질의: 단일화로 증명 찾기', 'Query: prove it by unification').cap(4, '백트래킹으로 모든 답', 'Backtrack for every answer').cap(5, '논리 프로그래밍', 'Logic programming');
  return S;
}
function sCurry() {
  const S = scene({ id: 'pa-curry', steps: 5, per: 1.5 });
  code(S, 'c', 1, .8, 30, ['const add = a => b => c => a + b + c;', 'add(1)(2)(3)                 // 6', ["const warn = log('WARN');    // 부분 적용", "const warn = log('WARN');    // partial application"], "warn('disk full');  warn('cpu hot');"], [[0, 1], [1, 3], [2, 4]], { hoff: 5 });
  box2(S, 'f0', 1, 8.4, 4, 1.8, 'add', 'accent', 1, { pct: 30 });
  ar(S, 'a1', [5.2, 9.3], [7.2, 9.3], 'ink-3', 2, { h: .12 }); T(S, 'a1l', 4.9, 7.5, 'a = 1', 'cz-tc cz-mono pax-xs pax-a', 2, { w: 2.6 });
  box2(S, 'f1', 7.4, 8.4, 8.6, 1.8, 'b => c => 1 + b + c', 'accent', 2, { pct: 18 });
  ar(S, 'a2', [16.2, 9.3], [18.2, 9.3], 'ink-3', 3, { h: .12 }); T(S, 'a2l', 15.9, 7.5, 'b = 2', 'cz-tc cz-mono pax-xs pax-a', 3, { w: 2.6 });
  box2(S, 'f2', 18.4, 8.4, 6.8, 1.8, 'c => 1 + 2 + c', 'accent', 3, { pct: 18 });
  ar(S, 'a3', [25.4, 9.3], [27.4, 9.3], 'ink-3', 3, { h: .12 }); T(S, 'a3l', 25.1, 7.5, 'c = 3', 'cz-tc cz-mono pax-xs pax-a', 3, { w: 2.6 });
  box2(S, 'f3', 27.6, 8.4, 3, 1.8, '6', 'ok', 3, { pct: 40 });
  T(S, 'n2', 1, 10.8, ['add(1)은 값이 아니라 함수를 돌려줘요', 'add(1) returns a function, not a value'], 'pax-s', 2, { off: 3 });
  T(S, 'n3', 1, 10.8, ['인자가 다 모이면 그제야 계산해요', 'once every argument has arrived, it computes'], 'pax-s pax-g', 3, { off: 4 });
  box2(S, 'lg', 1, 12.4, 7.4, 1.7, 'log(level, msg)', 'warn', 4, { pct: 25 }); ar(S, 'la', [8.6, 13.25], [13.6, 13.25], 'warn', 4, { h: .12 }); T(S, 'lal', 8.6, 11.6, "level = 'WARN'", 'cz-tc cz-mono pax-xs pax-w', 4, { w: 5 });
  box2(S, 'wn', 13.8, 12.4, 5.4, 1.7, 'warn(msg)', 'ok', 4, { pct: 30 }); T(S, 'wnl', 20.2, 12.7, ['설정은 한 번, 호출은 여러 번', 'configure once, call many times'], 'pax-xs pax-g', 4);
  fin(S, 'z', 15.2, [['커링: 인자 n개 함수 → 인자 1개 함수 n개의 사슬', 'currying: an n-argument function → a chain of n one-argument functions', 'pax-xs pax-a'], ['부분 적용: 일부 인자를 미리 고정한 새 함수 · map(add(1)), 핸들러 팩토리에 흔해요', 'partial application: fix some arguments up front · common in map(add(1)) and handler factories'], ['Haskell은 모든 함수가 자동으로 커링돼요', 'in Haskell every function is curried automatically']]);
  S.cap(1, '인자를 하나씩 받는 함수', 'One argument at a time').cap(2, '함수가 함수를 돌려줘요', 'A function returns a function').cap(3, '마지막 인자에서 계산', 'Compute at the last argument').cap(4, '부분 적용으로 설정 고정', 'Partial application fixes settings').cap(5, '커링과 부분 적용', 'Currying and partial application');
  return S;
}
function sMonad() {
  const S = scene({ id: 'pa-monad', steps: 5, per: 1.6 });
  T(S, 't1', 1, .3, ['Option: 값이 있을 수도, 없을 수도', 'Option: a value, or nothing'], 'pax-xs pax-a', 1);
  box2(S, 'o1', 1, 1.3, 4.6, 1.5, 'Some(3)', 'accent', 1, { pct: 30 }); ar(S, 'oa', [5.8, 2.05], [10.2, 2.05], 'ink-3', 1, { h: .1 }); T(S, 'ol', 5.8, 1.15, 'map(x => x * 2)', 'cz-tc cz-mono pax-tiny', 1, { w: 4.4 }); box2(S, 'o2', 10.4, 1.3, 4.6, 1.5, 'Some(6)', 'ok', 1, { pct: 35 });
  box2(S, 'n1', 1, 3.5, 4.6, 1.5, 'None', 'line', 1, { pct: 40 }); ar(S, 'na', [5.8, 4.25], [10.2, 4.25], 'ink-3', 1, { h: .1 }); T(S, 'nl', 5.8, 3.35, ['map → 건너뜀', 'map → skipped'], 'cz-tc cz-mono pax-tiny', 1, { w: 4.4 }); box2(S, 'n2', 10.4, 3.5, 4.6, 1.5, 'None', 'line', 1, { pct: 40 });
  T(S, 't2', 1, 5.5, ['List: 값이 여러 개', 'List: several values'], 'pax-xs pax-a', 2);
  box2(S, 'l1', 1, 6.9, 4.6, 1.5, '[1, 2, 3]', 'accent', 2, { pct: 30 }); ar(S, 'la', [5.8, 7.65], [10.2, 7.65], 'ink-3', 2, { h: .1 }); T(S, 'll', 5.8, 6.75, 'map(x => x * 2)', 'cz-tc cz-mono pax-tiny', 2, { w: 4.4 }); box2(S, 'l2', 10.4, 6.9, 4.6, 1.5, '[2, 4, 6]', 'ok', 2, { pct: 35 });
  T(S, 't3', 1, 9, ['상자를 돌려주는 함수라면? parse: 문자열 → Option', 'what if f returns a box? parse: string → Option'], 'pax-xs pax-a', 3);
  box2(S, 'i3', 1, 11, 4.6, 1.5, 'Some("42")', 'accent', 3, { pct: 30 });
  ar(S, 'm3a', [5.8, 11.4], [10.2, 10.75], 'warn', 3, { h: .1 }); T(S, 'm3l', 6.4, 10.1, 'map', 'cz-mono pax-tiny pax-w', 3); box2(S, 'm3', 10.4, 10, 5, 1.4, 'Some(Some(42))', 'warn', 3, { pct: 30 });
  ar(S, 'f3a', [5.8, 12.2], [10.2, 12.9], 'ok', 3, { h: .1 }); T(S, 'f3l', 6.2, 12.75, 'flatMap', 'cz-mono pax-tiny pax-g', 3); box2(S, 'f3', 10.4, 12.3, 5, 1.4, 'Some(42)', 'ok', 3, { pct: 35 });
  T(S, 't4', 1, 14, ['flatMap = map 후 한 겹 펴기', 'flatMap = map, then flatten one layer'], 'pax-xs pax-g', 3);
  code(S, 'c1', 16.6, .8, 14.4, ['findUser(id)          // Option<User>', '  .flatMap(u => u.team) // Option<Team>', '  .map(t => t.name)    // Option<String>', "  .getOrElse('none')"], [], { st: 4 });
  T(S, 'c1n', 16.6, 6.8, ['중간에 None이 나오면 나머지는 건너뛰어요', 'a None anywhere skips the rest'], 'pax-xs pax-w', 4);
  code(S, 'c2', 16.6, 8, 14.4, ['fetchUser(id)', '  .then(u => fetchTeam(u))', '  .then(t => t.name)'], [], { st: 4 });
  T(S, 'c2n', 16.6, 12.8, ['Promise도 같은 모양: then = map + flatMap', 'Promise has the same shape: then = map + flatMap'], 'pax-xs pax-a', 4);
  fin(S, 'z', 15.4, [['펑터: map을 가진 상자 · 모나드: flatMap으로 상자 안 상자를 펴며 이어 붙여요', 'functor: a box with map · monad: chains steps with flatMap, flattening nested boxes', 'pax-xs pax-a'], ['Option, List, Promise, Result가 같은 패턴 · null 검사와 에러 분기를 파이프라인에 숨겨요', 'Option, List, Promise and Result share it, hiding null checks and error branches'], ['Haskell의 do, Scala의 for, JS의 async/await가 이 체이닝의 문법 설탕이에요', 'Haskell do-notation, Scala for and JS async/await are sugar for this chaining']]);
  S.cap(1, '상자 안의 값에 map', 'Map over a value in a box').cap(2, '리스트도 상자', 'A list is a box too').cap(3, '상자가 겹치면 flatMap', 'Nested boxes need flatMap').cap(4, '체이닝으로 이어 붙이기', 'Chain the steps').cap(5, '펑터와 모나드', 'Functors and monads');
  return S;
}
function sProto() {
  const S = scene({ id: 'pa-proto', steps: 5, per: 1.6 });
  T(S, 'lt', 1, .3, ['클래스 기반 (Java, C++)', 'class-based (Java, C++)'], 'pax-s pax-a', 1);
  box2(S, 'cls', 2.5, 1.8, 9, 1.4, 'class Animal', 'accent', 1, { pct: 35 }); box2(S, 'clm', 2.5, 3.2, 9, 1.4, 'speak()  eat()', 'accent', 1, { pct: 15 });
  ar(S, 'ca1', [4, 4.7], [4, 7.3], 'ink-3', 1, { h: .1 }); ar(S, 'ca2', [10, 4.7], [10, 7.3], 'ink-3', 1, { h: .1 }); T(S, 'new', 6.2, 5.4, 'new', 'cz-mono pax-xs', 1);
  box2(S, 'i1', 1.2, 7.4, 5.6, 1.6, "a1 (Rex)", 'ok', 1, { pct: 25 }); box2(S, 'i2', 7.2, 7.4, 5.6, 1.6, "a2 (Bo)", 'ok', 1, { pct: 25 });
  T(S, 'ln', 1, 9.8, ['인스턴스는 설계도(클래스)에서 찍어내요', 'instances are stamped from a blueprint'], 'pax-xs', 1);
  T(S, 'rt', 17, .3, ['프로토타입 기반 (JavaScript)', 'prototype-based (JavaScript)'], 'pax-s pax-w', 2);
  const CH = [['dog', "dog { name: 'Rex' }", 1.4], ['ani', 'animal { speak() }', 4.4], ['op', 'Object.prototype { toString() }', 7.4]];
  CH.forEach(([k, l, y]) => box2(S, k, 18, y, 11.6, 1.6, l, 'accent', 2, { pct: 15 }));
  box2(S, 'nul', 21.8, 10.4, 4, 1.4, 'null', 'line', 2, { pct: 40 });
  [[3.1, 4.3], [6.1, 7.3], [9.1, 10.3]].forEach(([a, b], i) => { ar(S, 'pa' + i, [23.8, a], [23.8, b], 'ink-3', 2, { h: .1 }); T(S, 'pl' + i, 24.3, a + .2, '__proto__ ↓', 'cz-mono pax-tiny', 2); });
  tsets(S, 'dog', [[3, 'warn', 40]]); tsets(S, 'ani', [[3, 'ok', 45], [4, 'warn', 40]]); tsets(S, 'op', [[4, 'warn', 40]]); tsets(S, 'nul', [[4, 'danger', 40]]);
  T(S, 's3', 1, 12.4, ['dog.speak() → dog에 없음 → 위로 올라가 animal에서 찾았어요 ✓', 'dog.speak() → not on dog → walk up and find it on animal ✓'], 'cz-mono pax-xs pax-g', 3, { off: 4 });
  T(S, 's4', 1, 12.4, ['dog.fly → null까지 올라가도 없으면 undefined', 'dog.fly → missing all the way up to null → undefined'], 'cz-mono pax-xs pax-r', 4);
  fin(S, 'z', 14.4, [['클래스 기반: 설계도에서 찍어낸 인스턴스 · 프로토타입 기반: 객체가 다른 객체에 직접 위임', 'class-based: instances stamped from a blueprint · prototype-based: objects delegate to objects', 'pax-xs pax-a'], ['JavaScript의 class 문법은 프로토타입 체인 위에 얹은 문법 설탕이에요', 'JavaScript’s class syntax is sugar over the prototype chain'], ['프로토타입을 바꾸면 위임하는 모든 객체가 바로 영향을 받아요 (Lua, Self도 같은 방식)', 'changing a prototype affects every delegating object at once (as in Lua and Self)']]);
  S.cap(1, '클래스: 설계도와 인스턴스', 'Classes: blueprint and instances').cap(2, '프로토타입: 객체에서 객체로', 'Prototypes: object to object').cap(3, '찾을 때까지 위로', 'Walk up until found').cap(4, '끝까지 없으면 undefined', 'Missing all the way: undefined').cap(5, '클래스 vs 프로토타입', 'Classes vs prototypes');
  return S;
}
function sAop() {
  const S = scene({ id: 'pa-aop', steps: 5, per: 1.6 });
  T(S, 'lt', 1, .2, ['흩어진 코드', 'scattered code'], 'pax-s', 1);
  const M = [['order()', ['주문', 'order']], ['pay()', ['결제', 'charge']], ['refund()', ['환불', 'refund']]];
  const R = ['log', 'auth', 'tx begin', null, 'tx commit'];
  M.forEach(([m, core], i) => { const x = 1 + i * 5.2; box2(S, 'h' + i, x, 1.3, 4.8, 1.3, m, 'accent', 1, { pct: 35 });
    R.forEach((r, j) => { const k = `r${i}_${j}`, y = 2.9 + j * 1.3; box2(S, k, x, y, 4.8, 1.1, r || core, r ? 'line' : 'ok', 1, { pct: r ? 40 : 30 }); if (r) tsets(S, k, [[2, 'warn', 40]]); }); });
  T(S, 'dup', 1, 9.6, ['같은 코드가 메서드마다 반복돼요 (횡단 관심사)', 'the same code repeats in every method (cross-cutting concerns)'], 'pax-xs pax-w', 2);
  T(S, 'rt', 17, .2, ['관점(aspect)으로 분리', 'split into aspects'], 'pax-s pax-g', 3);
  [['Logging', 1.3], ['Auth', 2.5], ['Transaction', 3.7]].forEach(([a, y], i) => box2(S, 'as' + i, 17, y, 14, 1, a, 'warn', 3, { pct: 30 }));
  M.forEach(([m, core], i) => { const x = 17 + i * 4.9; ar(S, 'wa' + i, [x + 2.2, 4.8], [x + 2.2, 5.9], 'warn', 3, { h: .1 }); box2(S, 'm' + i, x, 6, 4.4, 1.2, m, 'accent', 3, { pct: 35 }); box2(S, 'c' + i, x, 7.4, 4.4, 1.3, core, 'ok', 3, { pct: 30 }); });
  T(S, 'wv', 17, 9, ['위빙: 실행 시 호출 앞뒤에 끼워 넣어요', 'weaving: inserted around each call at run time'], 'pax-xs pax-g', 3);
  code(S, 'cd', 1, 10.6, 30, ["@Transactional  @Logged  @Secured('USER')", 'public void pay(Order o) { charge(o); }', ['// 프록시가 호출 앞뒤로 트랜잭션·로그·권한 검사를 끼워 넣어요', '// a proxy wraps each call with tx, logging and auth checks']], [], { st: 4 });
  fin(S, 'z', 15.6, [['횡단 관심사(로깅, 인증, 트랜잭션, 캐시)를 핵심 로직에서 떼어내 한 곳에 모아요', 'pull cross-cutting concerns (logging, auth, transactions, caching) out into one place', 'pax-xs pax-a'], ['Spring AOP의 @Transactional, Python 데코레이터, 웹 미들웨어가 같은 아이디어', 'Spring’s @Transactional, Python decorators and web middleware share the idea'], ['단점: 메서드만 읽어서는 실제로 무엇이 실행되는지 안 보여요', 'downside: reading the method alone doesn’t show what actually runs']]);
  S.cap(1, '메서드마다 같은 코드', 'The same code in every method').cap(2, '횡단 관심사', 'Cross-cutting concerns').cap(3, '관점으로 떼어내기', 'Extract them into aspects').cap(4, '어노테이션과 프록시', 'Annotations and proxies').cap(5, '관점 지향 프로그래밍', 'Aspect-oriented programming');
  return S;
}
function sDod() {
  const S = scene({ id: 'pa-dod', steps: 5, per: 1.6 });
  const F = [['x', 'accent', 30], ['y', 'accent', 16], ['hp', 'danger', 30], ['nm', 'line', 45]];
  T(S, 'at', 1, .2, ['AoS (구조체의 배열): 엔티티마다 x, y, hp, name이 붙어 있어요', 'AoS (array of structs): each entity keeps x, y, hp, name together'], 'pax-xs pax-a', 1);
  for (let e = 0; e < 8; e++) F.forEach(([f, c, p], j) => { const n = e * 4 + j, x = 1 + (n % 16) * 1.8, y = 1.3 + Math.floor(n / 16) * 2, k = `a${n}`; box2(S, k, x, y, 1.7, 1.5, f, c, 1, { pct: p }); if (f !== 'hp') { S.set(k, 2, { opacity: '.3' }); S.set(k, 3, { opacity: '1' }); } else tsets(S, k, [[2, 'danger', 55], [3, 'danger', 30]]); });
  for (let q = 0; q < 4; q++) frame(S, 'cl' + q, .85 + (q % 2) * 14.4, 1.15 + Math.floor(q / 2) * 2, 14.3, 1.8, 'ink-3', 1, { dash: 1, w: .08, r: .3 });
  T(S, 'l2', 1, 5.3, ['for e in entities: e.hp -= 1 → 캐시 라인 4개를 다 읽고 각각 1/4만 써요', 'for e in entities: e.hp -= 1 → loads all 4 cache lines, uses 1/4 of each'], 'cz-mono pax-xs pax-r', 2);
  T(S, 'st', 1, 6.4, ['SoA (배열의 구조체): 필드마다 따로 연속 배열', 'SoA (struct of arrays): one contiguous array per field'], 'pax-xs pax-g', 3);
  ['xs[]', 'ys[]', 'hps[]', 'names[]'].forEach((l, j) => { const y = 7.4 + j * 1.8; T(S, 'sl' + j, 1, y + .35, l, 'cz-mono pax-xs', 3); for (let e = 0; e < 8; e++) box2(S, `s${j}_${e}`, 5 + e * 1.8, y, 1.7, 1.5, F[j][0], F[j][1], 3, { pct: F[j][2] }); });
  frame(S, 'hpf', 4.85, 10.85, 14.5, 1.8, 'danger', 3, { w: .14, r: .3 });
  T(S, 'h1', 20.4, 11, ['hp 8개 = 캐시 라인 1개', '8 hps = one cache line'], 'pax-xs pax-g', 3); T(S, 'h2', 20.4, 12, ['읽은 바이트를 전부 써요', 'every byte loaded is used'], 'pax-xs pax-g', 3);
  T(S, 'e1', 20.4, 7.4, ['ECS: 컴포넌트별 배열', 'ECS: one array per component'], 'pax-s pax-a', 4); T(S, 'e2', 20.4, 8.5, ['MoveSystem → xs, ys만', 'MoveSystem → xs, ys only'], 'cz-mono pax-xs', 4); T(S, 'e3', 20.4, 9.4, ['DamageSystem → hps만', 'DamageSystem → hps only'], 'cz-mono pax-xs', 4);
  fin(S, 'z', 15, [['데이터 지향 설계: 객체 단위가 아니라 “함께 처리되는 데이터”가 붙어 있도록 배치해요', 'data-oriented design lays out memory by what gets processed together, not by object', 'pax-xs pax-a'], ['캐시 적중률이 오르고 SIMD로 한 번에 여러 개를 처리하기도 쉬워져요', 'better cache hit rates, and SIMD can process many values at once'], ['게임 엔진(Unity DOTS, Bevy), 열 지향 DB, 데이터프레임(Arrow)이 같은 원리', 'game engines (Unity DOTS, Bevy), columnar databases and dataframes (Arrow) use the same idea']]);
  S.cap(1, 'AoS: 객체마다 필드가 모여 있어요', 'AoS: fields grouped per object').cap(2, 'hp만 바꾸는데 전부 읽어요', 'Touch only hp, load everything').cap(3, 'SoA: 필드별 배열', 'SoA: one array per field').cap(4, 'ECS로 발전', 'Grown into ECS').cap(5, '데이터 지향 설계', 'Data-oriented design');
  return S;
}
function sIoc() {
  const S = scene({ id: 'pa-ioc', steps: 5, per: 1.6 });
  T(S, 'lt', 1, .2, ['라이브러리: 내가 부른다', 'library: you call it'], 'pax-s pax-a', 1);
  box2(S, 'main', 4, 1.6, 6, 1.5, ['내 코드 main()', 'your main()'], 'accent', 1, { pct: 35 });
  seg(S, 'lv', [7, 3.2], [7, 4.4], 1, 'accent', .1); hl(S, 'lh', 3, 12, 4.4, 'accent', 1, { w: .1 });
  [['parse()', 1], ['sort()', 5.5], ['format()', 10]].forEach(([l, x], i) => { box2(S, 'lb' + i, x, 5.9, 4, 1.4, l, 'line', 1, { pct: 40 }); ar(S, 'la' + i, [x + 2, 4.4], [x + 2, 5.8], 'accent', 1, { h: .1 }); });
  T(S, 'lc', 1, 7.9, ['흐름의 주도권: 내 코드', 'control flow: your code'], 'pax-xs pax-a', 1);
  T(S, 'rt', 17, .2, ['프레임워크: 나를 부른다', 'framework: it calls you'], 'pax-s pax-w', 2);
  frame(S, 'fw', 17, 1.3, 14, 6.4, 'warn', 2, { w: .12 });
  [['start', 17.5], ['route', 21], ['render', 24.5], ['send', 28]].forEach(([l, x], i) => box2(S, 'lf' + i, x, 2, i === 3 ? 2.6 : 3, 1.3, l, 'warn', 2, { pct: 25 }));
  box2(S, 'h1', 19.5, 5.4, 5, 1.5, ['내 핸들러', 'your handler'], 'accent', 2, { pct: 35 }); box2(S, 'h2', 25.3, 5.4, 5.2, 1.5, ['내 컴포넌트', 'your component'], 'accent', 2, { pct: 35 });
  ar(S, 'fa1', [22.5, 3.4], [22.5, 5.3], 'warn', 2, { h: .1 }); ar(S, 'fa2', [26, 3.4], [26, 5.3], 'warn', 2, { h: .1 });
  T(S, 'rc', 17, 7.9, ['할리우드 원칙: “우리가 부를게요”', 'Hollywood principle: “we’ll call you”'], 'pax-xs pax-w', 2);
  code(S, 'cd', 1, 9.4, 30, [["app.get('/users', (req, res) => {    // 언제 부를지는 Express가 정해요", "app.get('/users', (req, res) => {    // Express decides when"], '  res.json(listUsers());', '});'], [], { st: 3 });
  T(S, 'mech', 1, 14.3, ['구현 수단: 콜백 · 템플릿 메서드 · 이벤트 · 의존성 주입(DI)', 'mechanisms: callbacks · template method · events · dependency injection'], 'pax-xs pax-a', 4);
  fin(S, 'z', 15.6, [['라이브러리는 도구, 프레임워크는 뼈대: 흐름의 주도권이 어디 있느냐의 차이', 'a library is a tool, a framework a skeleton: it’s about who owns the control flow', 'pax-xs pax-a'], ['테스트 러너(@Test), React 렌더링, 서블릿 컨테이너가 모두 제어의 역전', 'test runners (@Test), React rendering and servlet containers all invert control'], ['장점: 반복되는 흐름을 재사용 · 단점: 프레임워크의 규칙에 묶여요', 'pro: reuse the common flow · con: you live by the framework’s rules']]);
  S.cap(1, '라이브러리를 부를 때', 'Calling a library').cap(2, '프레임워크가 부를 때', 'When the framework calls you').cap(3, '코드로 보면', 'In code').cap(4, '구현 수단', 'How it is done').cap(5, '제어의 역전 (IoC)', 'Inversion of control');
  return S;
}
function sCore() {
  const S = scene({ id: 'pa-core', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 15.2, ['async function checkout(id) {', '  const cart = await db.get(id);', '  if (Date.now() > cart.expiresAt)', "    throw new Error('expired');", '  const total = sum(cart.items);', '  await db.save({ ...cart, total });', '}'], [[1, 1], [2, 2], [5, 3]], { hoff: 4 });
  frame(S, 'sh', 17, .8, 14, 9.8, 'warn', 2, { dash: 1, w: .12 }); T(S, 'shl', 17.4, 1, ['명령형 셸 (I/O)', 'imperative shell (I/O)'], 'pax-xs pax-w', 2);
  box2(S, 'r1', 17.6, 2.1, 5.8, 1.3, 'db.get(id)', 'warn', 2, { pct: 30 }); box2(S, 'r2', 24.6, 2.1, 5.8, 1.3, 'Date.now()', 'warn', 2, { pct: 30 }); box2(S, 'wr', 21, 8.6, 6.4, 1.4, 'db.save(…)', 'warn', 2, { pct: 30 });
  frame(S, 'co', 19.4, 4.7, 9.6, 2.8, 'accent', 2, { w: .14 }); T(S, 'col', 19.8, 4.9, ['함수형 코어 (순수)', 'functional core (pure)'], 'pax-xs pax-a', 2); T(S, 'cof', 19.8, 6.3, 'price(cart, now)', 'cz-mono pax-xs', 2);
  ar(S, 'i1', [20.5, 3.5], [20.5, 4.6], 'ink-3', 2, { h: .1 }); ar(S, 'i2', [27.5, 3.5], [27.5, 4.6], 'ink-3', 2, { h: .1 }); ar(S, 'o1', [24.2, 7.6], [24.2, 8.5], 'ink-3', 2, { h: .1 });
  notes(S, 'n', 10.9, [['I/O(DB, 시계)와 결정 로직이 뒤섞여 있어 테스트하려면 목이 필요해요', 'I/O (DB, clock) is tangled with logic, so tests need mocks'], ['셸이 입력을 모아 코어에 넘기고, 결과대로 실행해요', 'the shell gathers inputs, the core decides, the shell acts'], ['코어는 값만 받고 값만 돌려줘서 테스트가 쉬워요', 'the core takes and returns plain values, so tests are easy'], ['결정은 안쪽(순수)에서, 부작용은 바깥 껍질에서 한 번에', 'decide inside (pure), perform side effects at the edge']], 'pax-xs');
  code(S, 'ts', 1, 12, 30, ["test('expired cart', () => expect(price(cart, LATER)).toEqual(Expired));", ['// 목 없이 값을 넣고 값을 확인해요', '// no mocks: values in, values out']], [], { st: 3 });
  fin(S, 'z', 15.6, [['함수형 코어, 명령형 셸: 순수한 로직을 I/O라는 얇은 껍질로 감싸요', 'functional core, imperative shell: wrap pure logic in a thin layer of I/O', 'pax-xs pax-a'], ['코어는 빠른 단위 테스트로, 셸은 몇 개의 통합 테스트로 검증해요', 'test the core with fast unit tests and the shell with a few integration tests'], ['헥사고날(포트와 어댑터), Elm·Redux의 리듀서도 같은 분리를 해요', 'hexagonal architecture (ports and adapters) and Elm/Redux reducers make the same split']]);
  S.cap(1, '뒤섞인 함수', 'A tangled function').cap(2, '코어와 셸로 나누기', 'Split into core and shell').cap(3, '목 없는 테스트', 'Tests without mocks').cap(4, '결정과 실행의 분리', 'Deciding apart from doing').cap(5, '함수형 코어, 명령형 셸', 'Functional core, imperative shell');
  return S;
}

/* ================= clean code extras ================= */
function sComment() {
  const S = scene({ id: 'pa-comment', steps: 5, per: 1.6 });
  const row = (k, y, bad, good, st) => { code(S, k + 'b', 1, y, 14, bad, [], { st }); ar(S, k + 'a', [15.2, y + .95], [16.8, y + .95], 'ink-3', st, { h: .12 }); code(S, k + 'g', 17, y, 14, good, [], { st }); T(S, k + 'x', 13.9, y + .1, '✗', 'pax-s pax-r', st); T(S, k + 'o', 29.9, y + .1, '✓', 'pax-s pax-g', st); };
  row('r1', .8, [['i++;   // i를 1 증가', 'i++;   // increment i']], ['i++;'], 1);
  row('r2', 3.2, [['// 30일 지나면 만료', '// expire after 30 days'], 'if (days > 30) expire();'], ['const TRIAL_DAYS = 30;', 'if (days > TRIAL_DAYS) expire();'], 2);
  row('r3', 6.9, [['// 결제할 수 있는 사용자인지', '// can this user pay?'], 'if (u.card && !u.banned && u.age >= 19)'], ['if (canPay(user)) {', '  ...'], 3);
  code(S, 'r4', 1, 10.6, 21, [['// 결제사 API는 초당 1회를 넘으면 거절해서 1초 쉬어요', '// the payment API rejects >1 call/sec, so wait'], 'await sleep(1000);'], [], { st: 4 });
  T(S, 'r4t', 22.8, 11, ['이유(why)를 남기는 주석 ✓', 'a comment that says why ✓'], 'pax-xs pax-g', 4);
  notes(S, 'n', 14.1, [['코드를 그대로 읽어 주는 주석은 소음이에요', 'a comment that repeats the code is noise'], ['숫자를 설명하는 주석 → 이름 있는 상수로', 'a comment explaining a number → a named constant'], ['조건을 설명하는 주석 → 함수 추출로', 'a comment explaining a condition → an extracted function'], ['남길 주석: 이유, 경고, 공개 API 문서, 이슈가 달린 TODO', 'keep: reasons, warnings, public API docs, TODOs tied to an issue']], 'pax-xs');
  fin(S, 'z', 15.6, [['코드는 “무엇을·어떻게”, 주석은 “왜”를 말해요', 'code says what and how; comments say why', 'pax-xs pax-a'], ['설명하고 싶어지면 먼저 이름 짓기·함수 추출로 코드 자체를 고쳐 봐요', 'when tempted to explain, first try renaming or extracting a function'], ['주석은 코드와 함께 고쳐지지 않으면 거짓말이 돼요', 'comments not updated with the code turn into lies']]);
  S.cap(1, '코드를 반복하는 주석', 'Comments that repeat the code').cap(2, '매직 넘버엔 상수', 'Constants for magic numbers').cap(3, '복잡한 조건엔 함수', 'Functions for complex conditions').cap(4, '남길 만한 주석', 'Comments worth keeping').cap(5, '좋은 주석, 나쁜 주석', 'Good and bad comments');
  return S;
}
function sFlag() {
  const S = scene({ id: 'pa-flag', steps: 5, per: 1.6 });
  code(S, 'c1', 1, .8, 12, ['render(doc, true, false, 3);'], [], { st: 1 });
  T(S, 'c1t', 14, 1.15, ['true? false? 3? 호출부만 봐선 뜻을 알 수 없어요', 'true? false? 3? the call site says nothing'], 'pax-xs pax-r', 1);
  code(S, 'c2', 1, 3.6, 12, ['renderDraft(doc);', 'renderFinal(doc);'], [], { st: 2 });
  T(S, 'c2t', 14, 3.9, ['boolean 하나가 함수를 둘로 나눠요', 'one boolean splits the function in two'], 'pax-xs', 2); T(S, 'c2u', 14, 4.9, ['→ 아예 두 함수로 쪼개요', '→ make it two functions'], 'pax-xs pax-g', 2);
  code(S, 'c3', 1, 7.4, 30, ['render(doc, { draft: true, watermark: false, copies: 3 });'], [], { st: 3 });
  T(S, 'c3t', 1, 9.6, ['매개변수 객체: 이름이 붙고, 순서를 외울 필요 없고, 추가도 쉬워요', 'a parameter object: named, order-free and easy to extend'], 'pax-xs pax-g', 3);
  code(S, 'c4', 1, 10.8, 30, ['function render(doc, { draft = false, watermark = true, copies = 1 } = {}) {'], [], { st: 4 });
  T(S, 'c4t', 1, 13, ['구조 분해 + 기본값으로 선택 인자를 표현해요', 'destructuring with defaults expresses optional arguments'], 'pax-xs pax-a', 4);
  fin(S, 'z', 14.6, [['플래그 인자(boolean)는 “이 함수는 두 가지 일을 해요”라는 신호예요', 'a boolean flag argument signals that the function does two things', 'pax-xs pax-a'], ['인자가 3~4개를 넘으면 매개변수 객체나 빌더로 묶어요', 'past three or four arguments, group them into a parameter object or builder'], ['언어가 지원하면 이름 있는 인자(Kotlin, Python, Swift)도 좋은 해법이에요', 'named arguments (Kotlin, Python, Swift) solve it too where available']]);
  S.cap(1, '알 수 없는 인자들', 'Mystery arguments').cap(2, '플래그는 함수 분리로', 'Split on the flag').cap(3, '매개변수 객체', 'A parameter object').cap(4, '기본값과 구조 분해', 'Defaults and destructuring').cap(5, '플래그 인자와 매개변수 객체', 'Flag arguments and parameter objects');
  return S;
}
function sDemeter() {
  const S = scene({ id: 'pa-demeter', steps: 5, per: 1.6 });
  code(S, 'c1', 1, .8, 30, ['const ok = order.getCustomer().getWallet().pay(total);'], [], { st: 1, off: 3 });
  code(S, 'c2', 1, .8, 30, [['order.pay(total);        // 바로 옆 친구에게만 말하기', 'order.pay(total);        // talk only to your friends']], [], { st: 3 });
  T(S, 'p2', 1, 3.3, ['호출자가 Customer와 Wallet의 내부 구조까지 알아야 해요 → 하나만 바뀌어도 깨져요', 'the caller must know the insides of Customer and Wallet → any change breaks it'], 'pax-xs pax-r', 2, { off: 3 });
  T(S, 'p3', 1, 3.3, ['Order에게 시키면, 각 객체는 바로 이웃에게만 위임해요 (묻지 말고 시켜라)', 'tell Order; each object delegates only to its neighbor (tell, don’t ask)'], 'pax-xs pax-g', 3);
  const B = [['cl', 1, 5, ['호출자', 'caller'], 'line'], ['or', 9, 5, 'Order', 'accent'], ['cu', 17, 6, 'Customer', 'accent'], ['wa', 26, 5, 'Wallet', 'accent']];
  B.forEach(([k, x, w, l, c]) => box2(S, k, x, 5.4, w, 2, l, c, 1, { pct: 30 }));
  ar(S, 'a0', [6.1, 6.4], [8.9, 6.4], 'ink-3', 1, { h: .12 });
  ar(S, 'h1', [14.1, 6.4], [16.9, 6.4], 'ink-3', 1, { h: .1, off: 3 }); ar(S, 'h2', [23.1, 6.4], [25.9, 6.4], 'ink-3', 1, { h: .1, off: 3 });
  ar(S, 'g1', [14.1, 6.4], [16.9, 6.4], 'ok', 3, { h: .14 }); ar(S, 'g2', [23.1, 6.4], [25.9, 6.4], 'ok', 3, { h: .14 });
  elb(S, 'x1', [[4.4, 7.5], [4.4, 8.7], [20, 8.7], [20, 7.5]], 'danger', 2, { h: .12, off: 3 });
  elb(S, 'x2', [[2.6, 7.5], [2.6, 9.7], [28.5, 9.7], [28.5, 7.5]], 'danger', 2, { h: .12, off: 3 });
  T(S, 'x1l', 8, 7.85, 'getCustomer()', 'cz-mono pax-tiny pax-r', 2, { off: 3 }); T(S, 'x2l', 8, 8.95, 'getWallet()', 'cz-mono pax-tiny pax-r', 2, { off: 3 });
  T(S, 'r4', 1, 11.4, ['메서드 안에서 부를 수 있는 것: 자기 자신 · 매개변수 · 직접 만든 객체 · 자기 필드', 'inside a method, call only: this · parameters · objects you create · your own fields'], 'pax-xs pax-a', 4);
  T(S, 'r4b', 1, 12.5, ['(스트림·빌더처럼 같은 종류를 돌려주는 체이닝은 괜찮아요)', '(fluent chains returning the same kind, like streams or builders, are fine)'], 'pax-xs', 4);
  fin(S, 'z', 14.4, [['디미터 법칙(최소 지식 원칙): 낯선 객체의 내부를 줄줄이 따라가지 말아요', 'the Law of Demeter (least knowledge): don’t reach through strangers’ insides', 'pax-xs pax-a'], ['a.getB().getC().do() 같은 “기차 충돌” 코드는 결합도가 높다는 신호', 'train wrecks like a.getB().getC().do() signal tight coupling'], ['대신 위임 메서드가 늘어나니 균형이 필요해요', 'the trade-off: more small delegating methods']]);
  S.cap(1, '줄줄이 이어진 호출', 'A chain of calls').cap(2, '낯선 객체까지 알아야 해요', 'Knowing strangers’ insides').cap(3, '묻지 말고 시켜라', 'Tell, don’t ask').cap(4, '호출해도 되는 대상', 'Who you may call').cap(5, '디미터 법칙', 'The Law of Demeter');
  return S;
}
function sCqs() {
  const S = scene({ id: 'pa-cqs', steps: 5, per: 1.6 });
  [['balance()', ['조회 (Query)', 'Query'], 'ok'], ['deposit(x)', ['명령 (Command)', 'Command'], 'warn'], ['nextId()', ['둘 다 ✗', 'both ✗'], 'danger']].forEach(([m, t, c], i) => { const y = 1 + i * 1.8; box2(S, 'm' + i, 1, y, 7.4, 1.4, m, 'line', 1, { pct: 40 }); box2(S, 't' + i, 8.8, y, 5.8, 1.4, t, c, 1, { pct: 35 }); });
  T(S, 'lg1', 1, 6.6, ['조회: 값을 돌려주고 상태는 그대로', 'query: returns a value, changes nothing'], 'pax-xs pax-g', 1); T(S, 'lg2', 1, 7.6, ['명령: 상태를 바꾸고 값은 안 돌려줘요', 'command: changes state, returns nothing'], 'pax-xs pax-w', 1);
  code(S, 'c1', 17, .8, 14, [['log(nextId());   // 디버깅용 한 줄', 'log(nextId());   // a debug line'], 'save(item, nextId());'], [], { st: 2 });
  box2(S, 'k0', 17, 4.6, 3.4, 1.3, 'id 41', 'line', 2, { pct: 40 }); ar(S, 'ka', [20.6, 5.25], [21.6, 5.25], 'ink-3', 2, { h: .1 }); box2(S, 'k1', 21.8, 4.6, 3.4, 1.3, '42 log', 'warn', 2, { pct: 35 }); ar(S, 'kb', [25.4, 5.25], [26.4, 5.25], 'ink-3', 2, { h: .1 }); box2(S, 'k2', 26.6, 4.6, 4.4, 1.3, '43 save', 'danger', 2, { pct: 35 });
  T(S, 'kt', 17, 6.4, ['로그 한 줄 때문에 저장된 ID가 바뀌었어요', 'one log line changed the saved ID'], 'pax-xs pax-r', 2);
  code(S, 'c3', 1, 9, 30, [['const id = ids.current();   // 조회: 몇 번 불러도 같아요', 'const id = ids.current();   // query: same answer every time'], ['ids.advance();              // 명령: 상태만 바꿔요', 'ids.advance();              // command: only changes state'], 'log(id);  save(item, id);'], [], { st: 3 });
  T(S, 'ex', 1, 14, ['예외: pop(), compareAndSet()처럼 동시성 때문에 읽기와 바꾸기가 한 번에 일어나야 할 때', 'exceptions: pop() or compareAndSet(), where concurrency needs read-and-change in one step'], 'pax-xs pax-w', 4);
  fin(S, 'z', 15.4, [['메서드는 질문에 답하거나(조회) 일을 하거나(명령), 둘 중 하나만 (버트런드 마이어)', 'a method should answer a question or do something, not both (Bertrand Meyer)', 'pax-xs pax-a'], ['조회는 마음 놓고 여러 번 부를 수 있어 디버깅·캐시·테스트가 쉬워요', 'queries are safe to repeat, which helps debugging, caching and tests'], ['아키텍처 수준으로 키운 것이 CQRS예요', 'scaled up to architecture, it becomes CQRS']]);
  S.cap(1, '조회와 명령', 'Queries and commands').cap(2, '둘 다 하는 메서드의 함정', 'The trap of doing both').cap(3, '조회와 명령으로 나누기', 'Split query from command').cap(4, '실용적인 예외', 'Pragmatic exceptions').cap(5, '명령-조회 분리 (CQS)', 'Command–query separation');
  return S;
}
function sCyclo() {
  const S = scene({ id: 'pa-cyclo', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 16.4, ['function grade(s) {', "  if (s < 0) return 'invalid';", "  if (s >= 90) return 'A';", "  if (s >= 80) return 'B';", '  for (const p of penalties) s -= p;', "  return s >= 60 ? 'C' : 'F';", '}'], [], {});
  const Y = [1.4, 4, 6.6, 9.2, 11.8], L = ['if', 'if', 'if', 'for', '?:'];
  Y.forEach((y, i) => { stt(S, 'd' + i, 21, y, L[i], 'warn', 2, { r: .85, pct: 25 }); tsets(S, 'd' + i, [[3, 'danger', 40]]); if (i) trn(S, 'v' + i, [21, Y[i - 1]], [21, y], '', 2, { r: .85 }); });
  [['invalid', 0], ['A', 1], ['B', 2]].forEach(([l, i]) => { box2(S, 'x' + i, 24.6, Y[i] - .55, 4.4, 1.1, `'${l}'`, 'ok', 2, { pct: 30 }); ar(S, 'xa' + i, [21.9, Y[i]], [24.5, Y[i]], 'ink-3', 2, { h: .1 }); });
  elb(S, 'lp', [[20.45, 8.75], [19.2, 8.75], [19.2, 9.65], [20.35, 9.65]], 'ink-3', 2, { h: .08 });
  box2(S, 'xc', 24.6, 10.6, 2.6, 1.1, "'C'", 'ok', 2, { pct: 30 }); ar(S, 'xca', [21.8, 11.5], [24.5, 11.15], 'ink-3', 2, { h: .1 });
  box2(S, 'xf', 24.6, 12.4, 2.6, 1.1, "'F'", 'ok', 2, { pct: 30 }); ar(S, 'xfa', [21.8, 12.1], [24.5, 12.95], 'ink-3', 2, { h: .1 });
  T(S, 'g', 1, 10.9, ['M = 결정 지점 + 1 = 5 + 1 = 6', 'M = decision points + 1 = 5 + 1 = 6'], 'cz-mono pax-s pax-a', 3);
  T(S, 'g2', 1, 12.1, ['= E − N + 2 (흐름 그래프의 간선·노드로도 같은 값)', '= E − N + 2 (same from the flow graph’s edges and nodes)'], 'pax-xs', 3);
  T(S, 'g3', 1, 13.1, ['→ 독립 경로 6개 = 분기를 다 덮는 최소 테스트 수의 기준', '→ 6 independent paths: a baseline for test count'], 'pax-xs', 3);
  [[1, ['1–10 단순', '1–10 simple'], 'ok'], [11.3, ['11–20 복잡', '11–20 complex'], 'warn'], [21.6, ['21+ 위험 → 쪼개기', '21+ risky → split'], 'danger']].forEach(([x, l, c], i) => box2(S, 'th' + i, x, 14.4, 9.6, 1.4, l, c, 4, { pct: 30 }));
  fin(S, 'z', 16.4, [['순환 복잡도(McCabe): 코드를 지나는 독립 경로의 수 · if, for, while, case, &&, ||, ?: 마다 +1', 'cyclomatic complexity (McCabe): independent paths · +1 for each if, for, while, case, &&, ||, ?:', 'pax-xs pax-a'], ['가드 절, 표 조회, 다형성, 함수 추출로 줄여요 · 린터(ESLint complexity, SonarQube)가 측정해 줘요', 'reduce it with guard clauses, lookup tables, polymorphism and extraction · linters measure it']]);
  S.cap(1, '분기가 많은 함수', 'A function with many branches').cap(2, '흐름 그래프로 그리면', 'As a flow graph').cap(3, '복잡도 계산', 'Compute the complexity').cap(4, '기준값', 'Thresholds').cap(5, '순환 복잡도', 'Cyclomatic complexity');
  return S;
}
function sContract() {
  const S = scene({ id: 'pa-contract', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 19.4, ['withdraw(amount) {', ['  require(amount > 0);          // 사전 조건', '  require(amount > 0);          // precondition'], '  require(amount <= balance);', '  const before = balance;', '  balance -= amount;', ['  ensure(balance == before - amount); // 사후', '  ensure(balance == before - amount); // post'], '}', ['invariant balance >= 0;         // 불변식', 'invariant balance >= 0;         // invariant']], [[1, 1], [5, 2], [7, 3]], { hoff: 4 });
  box2(S, 'caller', 22, .8, 8, 1.4, ['호출자', 'caller'], 'line', 1, { pct: 40 });
  ar(S, 'pre', [26, 2.3], [26, 4.9], 'accent', 1, { h: .12 }); T(S, 'prel', 26.4, 3, ['사전 조건 ✓', 'pre ✓'], 'pax-xs pax-a', 1);
  frame(S, 'inv', 21.5, 4.4, 9, 3.6, 'warn', 3, { dash: 1, w: .12 }); T(S, 'invl', 21.7, 8.15, 'balance ≥ 0', 'cz-mono pax-xs pax-w', 3);
  box2(S, 'm', 22.5, 5.1, 7, 2.2, 'withdraw()', 'accent', 1, { pct: 30 });
  ar(S, 'post', [26, 7.4], [26, 10.4], 'ok', 2, { h: .12 }); T(S, 'postl', 26.4, 8.9, ['사후 조건 ✓', 'post ✓'], 'pax-xs pax-g', 2);
  box2(S, 'res', 22, 10.5, 8, 1.4, ['결과', 'result'], 'ok', 2, { pct: 30 });
  tsets(S, 'caller', [[4, 'danger', 40]]);
  T(S, 'v1', 1, 12.4, ['withdraw(-5) → 사전 조건 위반 = 호출자 버그 → 즉시 실패', 'withdraw(-5) → precondition fails = the caller’s bug → fail fast'], 'cz-mono pax-xs pax-r', 4);
  T(S, 'v2', 1, 13.5, ['사후 조건 위반 = 구현 버그 · 불변식은 모든 공개 메서드 앞뒤로 참', 'postcondition fails = the implementer’s bug · invariants hold around every public call'], 'pax-xs', 4);
  fin(S, 'z', 15, [['계약: 호출자는 사전 조건을, 구현은 사후 조건·불변식을 책임져요 (Eiffel)', 'callers guarantee preconditions; implementers guarantee postconditions and invariants', 'pax-xs pax-a'], ['assert, Kotlin require/check, 타입으로 표현 못 하는 규칙을 코드로 남겨요', 'assert, Kotlin require/check: write down the rules types can’t express'], ['하위 클래스는 사전 조건을 약하게, 사후 조건을 강하게만 바꿀 수 있어요 (리스코프)', 'subclasses may only weaken preconditions and strengthen postconditions (Liskov)']]);
  S.cap(1, '사전 조건: 호출자의 의무', 'Preconditions: the caller’s duty').cap(2, '사후 조건: 구현의 약속', 'Postconditions: the implementer’s promise').cap(3, '불변식: 언제나 참', 'Invariants: always true').cap(4, '위반하면 누구 책임?', 'Whose bug is it?').cap(5, '계약에 의한 설계', 'Design by contract');
  return S;
}

return { css: CSSX, secs: [], add: {
  'pa-paradigm': [
    item('pa-logic', '논리 프로그래밍', 'Logic programming', '사실과 규칙만 선언하면, 질의에 답하는 방법(탐색)은 엔진이 알아서 찾는 패러다임이에요. Prolog가 대표적이에요.', 'parent(tom, bob) 같은 사실과 grand(X, Z) :- parent(X, Y), parent(Y, Z) 같은 규칙을 적고 ?- grand(tom, Who)라고 물으면, 엔진이 변수에 값을 맞춰 보는 단일화(unification)로 증명을 찾고, 백트래킹으로 다른 답(ann, liz)도 찾아 줘요. Datalog는 데이터베이스 질의와 정적 분석에, 비슷한 규칙 엔진은 타입 검사와 권한 정책(OPA)에 쓰여요.', 'Declare facts and rules, and the engine works out how to answer queries by search. Prolog is the classic example.', 'Write facts like parent(tom, bob) and rules like grand(X, Z) :- parent(X, Y), parent(Y, Z), then ask ?- grand(tom, Who): the engine builds a proof by unification, binding variables, and backtracks to find every answer (ann, liz). Datalog powers database queries and static analysis, and similar rule engines drive type checkers and policy engines such as OPA.', sLogic()),
    item('pa-curry', '커링과 부분 적용', 'Currying and partial application', '커링은 인자 여러 개를 받는 함수를 인자 하나씩 받는 함수의 사슬로 바꾸는 것, 부분 적용은 일부 인자를 미리 고정해 새 함수를 만드는 거예요.', 'add = a => b => c => a + b + c에서 add(1)은 값이 아니라 b => c => 1 + b + c라는 함수를 돌려주고, 인자가 다 모이면 계산해요. log(level, msg)에 level만 \'WARN\'으로 고정하면 warn(msg)라는 새 함수가 생겨서, 설정은 한 번 하고 호출은 여러 번 할 수 있어요. map(add(1)), 이벤트 핸들러 팩토리에 흔하고, Haskell은 모든 함수가 자동으로 커링돼요.', 'Currying turns a multi-argument function into a chain of one-argument functions; partial application fixes some arguments up front to make a new function.', 'With add = a => b => c => a + b + c, add(1) returns the function b => c => 1 + b + c, and the sum is computed once every argument arrives. Fixing log(level, msg) at level \'WARN\' yields a new warn(msg): configure once, call many times. It shows up in map(add(1)) and handler factories, and in Haskell every function is curried automatically.', sCurry()),
    item('pa-monad', '펑터와 모나드', 'Functors and monads', 'map을 가진 “상자”가 펑터, 상자를 돌려주는 단계를 flatMap으로 이어 붙일 수 있는 상자가 모나드예요. Option, List, Promise가 모두 그래요.', 'Some(3).map(x => x * 2)은 Some(6)이고 None은 건너뛰어요. 리스트도 같은 상자예요. 그런데 상자를 돌려주는 함수(parse: 문자열 → Option)에 map을 쓰면 Some(Some(42))처럼 겹치니, map 후 한 겹 펴는 flatMap을 써요. findUser(id).flatMap(u => u.team).map(t => t.name)처럼 이어 붙이면 중간에 None이 나와도 null 검사 없이 안전하게 흘러가요. Promise의 then, async/await도 같은 모양이에요.', 'A functor is a box you can map over; a monad is a box whose steps, each returning a box, chain with flatMap. Option, List and Promise all qualify.', 'Some(3).map(x => x * 2) is Some(6), while None is skipped; a list is the same kind of box. Mapping a function that itself returns a box (parse: string → Option) nests them, Some(Some(42)), so flatMap maps and flattens one layer. Chains like findUser(id).flatMap(u => u.team).map(t => t.name) then flow safely past a None without null checks. Promise.then and async/await have the same shape.', sMonad()),
    item('pa-proto', '클래스 기반 vs 프로토타입 기반', 'Classes vs prototypes', '클래스 기반은 설계도(클래스)로 인스턴스를 찍어내고, 프로토타입 기반은 객체가 다른 객체에 직접 연결되어 없는 속성을 위임해요.', 'Java, C++에서는 class Animal로 a1, a2를 만들고 메서드는 클래스에 있어요. JavaScript에서는 dog 객체가 __proto__로 animal 객체에 연결되어, dog.speak()를 부르면 dog에 없으니 animal에서 찾고, 끝내 null까지 없으면 undefined가 돼요. JS의 class 문법은 이 프로토타입 체인 위의 문법 설탕이고, 프로토타입을 바꾸면 위임하는 모든 객체가 바로 영향을 받아요(Lua, Self도 같은 방식).', 'Class-based languages stamp instances from a blueprint; prototype-based languages link objects directly to other objects and delegate missing properties.', 'In Java or C++, class Animal produces a1 and a2, and methods live in the class. In JavaScript, dog links via __proto__ to an animal object: dog.speak() isn’t on dog, so the lookup walks up to animal, and if nothing is found by null the result is undefined. JS class syntax is sugar over this prototype chain, and changing a prototype instantly affects every object delegating to it (as in Lua and Self).', sProto()),
    item('pa-aop', '관점 지향 프로그래밍', 'Aspect-oriented programming', '로깅, 인증, 트랜잭션처럼 여러 메서드에 흩어지는 횡단 관심사를 “관점(aspect)”으로 떼어내 한 곳에서 관리해요.', 'order(), pay(), refund()마다 로그, 권한 검사, 트랜잭션 시작·커밋 코드가 반복되면, 그 부분을 관점으로 빼내고 핵심 로직만 남겨요. 실행 시 프레임워크가 프록시 등으로 호출 앞뒤에 관점 코드를 끼워 넣는데(위빙), Spring의 @Transactional, Python 데코레이터, 웹 미들웨어가 같은 아이디어예요. 대신 메서드만 읽어서는 실제로 무엇이 실행되는지 보이지 않는다는 단점이 있어요.', 'Pull cross-cutting concerns such as logging, auth and transactions out of the methods they’re scattered across, into “aspects” managed in one place.', 'When order(), pay() and refund() each repeat logging, permission checks and transaction begin/commit, move that code into aspects and leave only the business logic. At run time the framework weaves the aspect code around each call, often via a proxy; Spring’s @Transactional, Python decorators and web middleware share the idea. The downside is that reading a method no longer shows everything that runs.', sAop()),
    item('pa-dod', '데이터 지향 설계', 'Data-oriented design', '객체 단위가 아니라 “함께 처리되는 데이터”가 메모리에 붙어 있도록 배치해 캐시를 잘 쓰는 설계 방식이에요. AoS 대신 SoA가 대표적이에요.', '엔티티마다 x, y, hp, name을 모은 구조체 배열(AoS)에서 hp만 줄이는 루프는 캐시 라인을 전부 읽고 그중 1/4만 써요. 필드별로 연속 배열을 두는 SoA로 바꾸면 hp 8개가 캐시 라인 하나에 들어가 읽은 바이트를 모두 쓰고, SIMD로 한 번에 처리하기도 쉬워요. 게임 엔진의 ECS(Unity DOTS, Bevy), 열 지향 DB, Arrow 데이터프레임이 같은 원리예요.', 'Lay out memory by what gets processed together rather than by object, so the cache is used well. Struct-of-arrays instead of array-of-structs is the classic move.', 'In an array of structs (AoS) holding x, y, hp and name per entity, a loop that only decrements hp loads every cache line and uses a quarter of each. Switching to a struct of arrays (SoA), one contiguous array per field, packs 8 hps into one cache line so every loaded byte is used, and SIMD can process them together. Game-engine ECS (Unity DOTS, Bevy), columnar databases and Arrow dataframes apply the same idea.', sDod()),
    item('pa-ioc', '제어의 역전 (IoC)', 'Inversion of control', '내 코드가 라이브러리를 부르는 대신, 프레임워크가 정해진 흐름 속에서 내 코드를 불러요. “우리가 부를게요”(할리우드 원칙).', '라이브러리를 쓸 때는 main()이 parse(), sort()를 직접 불러 흐름의 주도권이 내게 있어요. 프레임워크는 시작 → 라우팅 → 렌더링 → 응답이라는 흐름을 쥐고, 내가 등록한 핸들러와 컴포넌트를 알맞은 때에 불러요(app.get(\'/users\', handler)). 콜백, 템플릿 메서드, 이벤트, 의존성 주입이 이를 구현하는 수단이고, 테스트 러너의 @Test, React 렌더링, 서블릿 컨테이너가 모두 제어의 역전이에요.', 'Instead of your code calling a library, a framework owns the flow and calls your code at the right moments: “don’t call us, we’ll call you.”', 'With a library, main() calls parse() and sort() itself, so you own the control flow. A framework runs the flow (start → route → render → respond) and invokes the handlers and components you registered when it decides, as in app.get(\'/users\', handler). Callbacks, template methods, events and dependency injection implement it; test runners (@Test), React rendering and servlet containers are all inversion of control.', sIoc()),
    item('pa-core', '함수형 코어, 명령형 셸', 'Functional core, imperative shell', '결정을 내리는 순수한 로직(코어)과 DB·네트워크·시계 같은 I/O(셸)를 분리해, 로직은 값만 주고받게 만드는 구조예요.', 'DB를 읽고, 현재 시각을 확인하고, 계산하고, 저장하는 코드가 한 함수에 섞여 있으면 테스트에 목이 잔뜩 필요해요. 셸이 db.get과 Date.now()로 입력을 모아 price(cart, now) 같은 순수 함수에 넘기고, 결과대로 db.save를 실행하게 나누면, 코어는 값만 넣고 값만 확인하는 빠른 단위 테스트로 검증할 수 있어요. 헥사고날 아키텍처, Elm·Redux의 리듀서도 같은 분리를 해요.', 'Separate the pure logic that makes decisions (the core) from I/O such as the database, network and clock (the shell), so the logic only exchanges values.', 'A function that reads the database, checks the clock, computes and saves all at once needs piles of mocks to test. Let the shell gather inputs with db.get and Date.now(), pass them to a pure function like price(cart, now), and act on the result with db.save; the core is then verified by fast unit tests with values in and values out. Hexagonal architecture and Elm/Redux reducers make the same split.', sCore())
  ],
  'pa-clean': [
    item('pa-comment', '좋은 주석, 나쁜 주석', 'Good and bad comments', '코드는 “무엇을·어떻게”, 주석은 “왜”를 말해요. 코드를 반복하는 주석은 소음이고, 설명이 필요하면 먼저 코드를 고쳐요.', 'i++ // i를 1 증가 같은 주석은 지워요. “30일 지나면 만료”를 설명하는 주석은 TRIAL_DAYS 같은 이름 있는 상수로, 복잡한 조건을 설명하는 주석은 canPay(user) 같은 함수 추출로 대신해요. 반면 “결제사 API가 초당 1회를 넘으면 거절해서 1초 쉰다” 같은 결정의 이유, 경고, 공개 API 문서, 이슈 번호가 달린 TODO는 남길 가치가 있어요. 코드와 함께 고쳐지지 않는 주석은 거짓말이 돼요.', 'Code says what and how; comments say why. A comment that repeats the code is noise, and when explanation is needed, improve the code first.', 'Delete comments like i++ // increment i. Replace a comment explaining “expire after 30 days” with a named constant such as TRIAL_DAYS, and a comment explaining a complex condition with an extracted function like canPay(user). Reasons behind decisions (“the payment API rejects more than one call per second, so wait”), warnings, public API docs and TODOs tied to an issue are worth keeping. Comments that aren’t updated with the code turn into lies.', sComment()),
    item('pa-flag', '플래그 인자와 매개변수 객체', 'Flag arguments and parameter objects', 'render(doc, true, false, 3)처럼 의미 없는 boolean·숫자 인자는 호출부를 읽을 수 없게 만들어요. 함수를 나누거나 이름 있는 매개변수 객체로 바꿔요.', 'boolean 플래그 하나는 “이 함수는 두 가지 일을 한다”는 신호라서 renderDraft, renderFinal처럼 나누는 게 좋아요. 인자가 많으면 render(doc, { draft: true, watermark: false, copies: 3 })처럼 매개변수 객체로 묶으면 이름이 붙고 순서를 외울 필요가 없고 항목 추가도 쉬워요. 정의 쪽은 구조 분해와 기본값으로 선택 인자를 표현하고, 이름 있는 인자를 지원하는 언어(Kotlin, Python, Swift)라면 그걸 써도 돼요.', 'Bare boolean and number arguments, as in render(doc, true, false, 3), make call sites unreadable; split the function or pass a named parameter object.', 'A boolean flag signals that the function does two things, so split it into renderDraft and renderFinal. With many arguments, group them into a parameter object: render(doc, { draft: true, watermark: false, copies: 3 }) is named, order-free and easy to extend. On the definition side, destructuring with defaults expresses optional arguments, and languages with named arguments (Kotlin, Python, Swift) solve it directly.', sFlag()),
    item('pa-demeter', '디미터 법칙', 'The Law of Demeter', '메서드는 바로 옆 “친구”에게만 말하고, 낯선 객체의 내부를 줄줄이 따라가지 않아야 한다는 원칙이에요(최소 지식 원칙).', 'order.getCustomer().getWallet().pay(total) 같은 “기차 충돌” 코드는 호출자가 Customer와 Wallet의 구조까지 알아야 해서, 어느 하나만 바뀌어도 깨져요. order.pay(total)처럼 시키면 각 객체가 바로 이웃에게만 위임해요(묻지 말고 시켜라). 메서드 안에서는 자기 자신, 매개변수, 직접 만든 객체, 자기 필드의 메서드만 부르는 게 원칙이고, 스트림·빌더처럼 같은 종류를 돌려주는 체이닝은 괜찮아요. 대신 위임 메서드가 늘어나니 균형이 필요해요.', 'A method should talk only to its immediate friends and not reach through the insides of strangers: the principle of least knowledge.', 'Train wrecks like order.getCustomer().getWallet().pay(total) make the caller depend on the structure of Customer and Wallet, so any change breaks it. Telling instead, order.pay(total), lets each object delegate only to its neighbor (tell, don’t ask). Inside a method, call only methods of this, parameters, objects you create and your own fields; fluent chains that return the same kind, such as streams or builders, are fine. The trade-off is more small delegating methods.', sDemeter()),
    item('pa-cqs', '명령-조회 분리 (CQS)', 'Command–query separation', '메서드는 값을 돌려주는 조회이거나 상태를 바꾸는 명령이거나, 둘 중 하나만 해야 한다는 원칙이에요(버트런드 마이어).', 'nextId()처럼 값을 돌려주면서 카운터도 올리는 메서드는 log(nextId()) 한 줄만 추가해도 저장되는 ID가 바뀌는 버그를 만들어요. ids.current()(조회)와 ids.advance()(명령)로 나누면 조회는 몇 번 불러도 안전해서 디버깅·캐시·테스트가 쉬워져요. 다만 stack.pop()이나 compareAndSet()처럼 동시성 때문에 읽기와 바꾸기가 한 번에 일어나야 하는 경우는 예외예요. 이 원칙을 아키텍처 수준으로 키운 것이 CQRS예요.', 'A method should either return a value (a query) or change state (a command), never both, as Bertrand Meyer put it.', 'A method like nextId() that returns a value and bumps a counter means adding log(nextId()) silently changes which ID gets saved. Splitting it into ids.current() (query) and ids.advance() (command) makes queries safe to repeat, which helps debugging, caching and testing. Exceptions are operations like stack.pop() or compareAndSet(), where concurrency requires reading and changing in one step. Scaled up to architecture, the idea becomes CQRS.', sCqs()),
    item('pa-cyclo', '순환 복잡도', 'Cyclomatic complexity', '코드를 지나는 서로 독립인 경로의 수로, 분기가 얼마나 복잡한지 재는 지표예요. 결정 지점 수 + 1로 쉽게 구해요.', 'if 세 개, for 하나, 삼항 연산자 하나가 있는 grade 함수는 결정 지점이 5개라 M = 6이고, 흐름 그래프의 간선·노드 수로 M = E − N + 2를 계산해도 같아요. 이는 분기를 모두 덮는 데 필요한 테스트 수의 기준이 돼요. 대략 1–10은 단순, 11–20은 복잡, 21 이상은 쪼개야 할 위험 신호예요. 가드 절, 표 조회, 다형성, 함수 추출로 줄이고, ESLint의 complexity 규칙이나 SonarQube가 자동으로 측정해 줘요.', 'The number of independent paths through code, a measure of branching complexity, computed simply as decision points + 1.', 'A grade function with three ifs, a for loop and a ternary has 5 decision points, so M = 6; computing M = E − N + 2 from the flow graph’s edges and nodes gives the same result, a baseline for how many tests cover every branch. Roughly, 1–10 is simple, 11–20 complex and 21+ a sign to split. Guard clauses, lookup tables, polymorphism and extraction reduce it, and ESLint’s complexity rule or SonarQube measure it automatically.', sCyclo()),
    item('pa-contract', '계약에 의한 설계', 'Design by contract', '함수마다 사전 조건(호출자의 의무), 사후 조건(구현의 약속), 불변식(언제나 참)을 명시하고 어기면 바로 실패하게 하는 설계 방법이에요.', 'withdraw(amount)는 amount > 0, amount ≤ balance를 사전 조건으로 요구하고, 끝나면 balance가 정확히 amount만큼 줄었음을 사후 조건으로 보장하며, balance ≥ 0은 모든 공개 메서드 앞뒤로 지켜지는 불변식이에요. withdraw(-5)처럼 사전 조건을 어기면 호출자 버그, 사후 조건이 깨지면 구현 버그라 책임이 분명해져요. Eiffel에서 시작했고 assert, Kotlin의 require/check로 실천하며, 하위 클래스는 사전 조건을 약하게·사후 조건을 강하게만 바꿀 수 있어요(리스코프).', 'State each function’s preconditions (the caller’s duty), postconditions (the implementer’s promise) and invariants (always true), and fail immediately when one is broken.', 'withdraw(amount) requires amount > 0 and amount ≤ balance, guarantees afterwards that balance dropped by exactly amount, and keeps balance ≥ 0 as an invariant around every public call. A call like withdraw(-5) breaks a precondition, so it’s the caller’s bug; a broken postcondition is the implementer’s bug. It began in Eiffel and lives on in assert and Kotlin’s require/check; subclasses may only weaken preconditions and strengthen postconditions (Liskov).', sContract())
  ]
} };
})();

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
  ].concat(XT.add['pa-paradigm'] || [])),
  sec('pa-clean', '클린 코드', 'Clean code', '클린 코드와 리팩터링', 'Clean code and refactoring',
    '다른 사람(미래의 나 포함)이 읽고 고치기 쉬운 코드를 만드는 습관이에요.', 'Habits for code that others, including future you, can read and change.', [
    item('pa-naming', '의미 있는 이름', 'Meaningful names', '변수·함수 이름에 의도와 단위를 담아 주석 없이도 읽히게 해요.', '축약어·한 글자 이름은 반복문 인덱스 정도만 허용하세요. boolean은 is·has·can으로, 함수는 동사로 시작해요.', 'Put intent and units into names so code reads without comments.', 'Allow one-letter names only for loop indexes. Start booleans with is/has/can and functions with verbs.', sNaming()),
    item('pa-func', '작은 함수', 'Small functions', '함수는 한 가지 일만, 한 수준의 추상화로 짧게 써요. 긴 함수는 의미 있는 이름의 작은 함수들로 나눠요.', '함수 이름이 "그리고"로 길어지면 나눌 때예요. 작게 나누면 테스트와 재사용이 쉬워져요.', 'Functions should do one thing at one level of abstraction; split long ones into well-named smaller ones.', 'If a function name needs “and”, split it; small pieces are easier to test and reuse.', sSmallFn()),
    item('pa-dry', 'DRY · KISS · YAGNI', 'DRY · KISS · YAGNI', '같은 지식은 한 곳에(DRY), 최대한 단순하게(KISS), 지금 필요 없는 건 만들지 않기(YAGNI).', '세 번째 중복이 보일 때 추출하세요(Rule of Three). 우연히 비슷한 코드를 억지로 합치면 오히려 결합이 생겨요.', 'Keep each piece of knowledge in one place (DRY), keep things simple (KISS) and don’t build what you don’t need yet (YAGNI).', 'Extract on the third repetition (rule of three); merging merely similar code creates coupling.', sDRY()),
    item('pa-guard', '조기 반환 (가드 절)', 'Guard clauses', '예외 상황을 함수 앞쪽에서 먼저 처리하고 반환해서, 핵심 로직의 들여쓰기를 얕게 만들어요.', '"화살표 모양" 코드가 보이면 조건을 뒤집어 일찍 반환하세요. 에러 처리 경로도 한눈에 보여요.', 'Handle edge cases at the top and return early so the main logic stays shallow.', 'When you see arrow-shaped code, invert the conditions and return early; error paths become obvious.', sGuard()),
    item('pa-refactor', '리팩터링', 'Refactoring', '외부 동작은 바꾸지 않고 내부 구조를 개선하는 작업이에요. 작은 단계로 나눠 매번 테스트로 확인해요.', '기능 추가와 리팩터링을 같은 커밋에 섞지 마세요. IDE의 자동 리팩터링(이름 변경, 추출)을 쓰면 실수가 줄어요.', 'Improving internal structure without changing external behaviour, in small steps verified by tests.', 'Keep refactors and features in separate commits, and use IDE automated refactorings to avoid mistakes.', sRefactor()),
    item('pa-smell', '코드 스멜', 'Code smells', '긴 함수, 거대한 클래스, 중복, 긴 매개변수 목록처럼 당장 버그는 아니지만 문제가 생길 징후예요.', '스멜마다 대응하는 리팩터링이 정리되어 있어요(마틴 파울러, 『리팩터링』). 리뷰에서 공통 어휘로 쓰세요.', 'Long methods, god classes, duplication and long parameter lists: not bugs yet, but signs of trouble.', 'Each smell has a matching refactoring (Martin Fowler’s Refactoring); use them as shared review vocabulary.', sSmell()),
    item('pa-coupling', '결합도와 응집도', 'Coupling · Cohesion', '모듈 사이의 의존(결합)은 약하게, 모듈 안의 관련성(응집)은 강하게 만들어야 변경이 퍼지지 않아요.', '"이걸 고치려면 파일 몇 개를 건드려야 하나?"가 결합도의 체감 지표예요. 기능 단위로 폴더를 나누면 응집이 높아져요.', 'Keep dependencies between modules loose and relatedness within modules strong, so changes don’t spread.', '“How many files must I touch for this change?” is coupling you can feel; feature-based folders raise cohesion.', sCoupling())
  ].concat(XT.add['pa-clean'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.pa-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.pa-code{place-items:center start!important;padding-left:.7em}
.pa-code .in{font-family:var(--f-mono);font-size:.58em;font-weight:600}
.pa-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.pa-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.pa-xs .in{font-size:.55em}`;
})();
