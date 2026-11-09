(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C } = CZ;
CZ.tr({"title: 보고서": "title: Report", "style: 기본": "style: default", "title: 보고서 v2": "title: Report v2", "v1: 안녕": "v1: Hi", "v2: 안녕하세요": "v2: Hello", "v3: 안녕하세요!!!": "v3: Hello!!!"});
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const IF = 'border-style:dashed';
/* a message dot that appears at a and flies to b at step st, then fades at st+1 (unless keep) */
function fly(S, k, a, b, st, lab, sty, o = {}) {
  const r = o.r || .8;
  dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) });
  S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r);
  if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' });
  return S;
}
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const hide = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
const ctr = (x, y, w, h) => [x + w / 2, y + h / 2];

/* ---------- SOLID ---------- */
function sSRP() {
  const S = scene({ id: 'dp-srp', steps: 4, per: 1.4 });
  box(S, 'big', 9, 2, 14, 9.6, '', { css: 'border-color:var(--ink-3)' });
  text(S, 'bt', 9.8, 2.4, 'UserService', { cls: 'cz-t cz-mono dp-b' });
  [['save()', 'DB'], ['sendEmail()', 'Email'], ['makeReport()', 'PDF']].forEach(([m], i) => cell(S, 'm' + i, 10, 4.6 + i * 2.3, m, { w: 12, h: 1.9, cls: 'cz-c dp-t' }));
  pill(S, 'chg', 22, 13.4, ['이메일 형식 변경!', 'Change email format!'], { w: 9, h: 1.9, s: hid(C.warn) });
  S.set('chg', 1, { opacity: '1' }).set('big', 1, C.bad).set('m1', 1, C.cmp);
  const parts = [['UserRepository', 'save()'], ['EmailSender', 'send()'], ['ReportMaker', 'make()']];
  parts.forEach(([n, m], i) => { box(S, 'p' + i, 1 + i * 10.4, 13, 9.6, 4.6, n, { cls: 'cz-box cz-bx cz-mono', s: hid() }); S.set('p' + i, 3, { opacity: '1' }); });
  ['big', 'bt', 'm0', 'm1', 'm2'].forEach(k => S.set(k, 3, { opacity: '.25' })); S.set('chg', 3, { opacity: '0' }).set('big', 3, C.idle).set('m1', 3, C.idle);
  pill(S, 'chg2', 11.2, 18.2, ['이메일 형식 변경!', 'Change email format!'], { w: 9, h: 1.9, s: hid(C.warn) });
  S.set('p1', 4, C.cmp).set('chg2', 4, { opacity: '1' });
  S.cap(0, '한 클래스가 저장·메일·리포트를 다 해요', 'One class saves, emails and reports').cap(1, '메일만 바꾸려 해도', 'Changing only email…').cap(2, '클래스 전체를 다시 테스트·배포해야 해요', 'means retesting and redeploying the whole class')
    .cap(3, '변경 이유가 하나씩 되도록 나누면', 'Split so each has one reason to change').cap(4, '바뀌는 곳만 바뀌어요', 'Now only the email part changes');
  return S;
}
function sOCP() {
  const S = scene({ id: 'dp-ocp', steps: 5, per: 1.3 });
  box(S, 'code', 1.5, 2, 13, 9, '', { cls: 'cz-box' });
  ['pay(type) {', "  if (type == 'card') …", "  else if (type == 'bank') …", "  else if (type == 'kakao') …", '}'].forEach((t, i) => text(S, 'c' + i, 2.3, 2.7 + i * 1.6, t, { cls: 'cz-t cz-mono', s: i === 3 ? hid() : {} }));
  S.set('c3', 1, { opacity: '1' }).set('code', 1, C.bad);
  text(S, 'cx', 2.3, 11.6, ['기존 코드를 고쳐야 해요 ✗', 'existing code must change ✗'], { cls: 'cz-t', s: hid() }); S.set('cx', 1, { opacity: '1' });
  ['code', 'cx', 'c0', 'c1', 'c2', 'c3', 'c4'].forEach(k => S.set(k, 2, { opacity: '.2' }));
  box(S, 'if', 18, 2, 11, 3.2, '«interface» PaymentMethod', { cls: 'cz-box cz-bx cz-mono', css: IF, s: hid() });
  const impl = [['Card', 16.4], ['Bank', 23.6], ['KakaoPay', 20]];
  impl.forEach(([n, x], i) => { const y = i < 2 ? 8.6 : 14.4; box(S, 'i' + i, x, y, 6.6, 3, n, { cls: 'cz-box cz-bx cz-mono', s: hid(i === 2 ? C.ok : {}) }); link(S, 'l' + i, [x + 3.3, y], [23.5, 5.2], 0, .05, { s: hid() }); S.set('i' + i, i < 2 ? 3 : 4, { opacity: '1' }).set('l' + i, i < 2 ? 3 : 4, { opacity: '1' }); });
  S.set('if', 2, { opacity: '1' });
  S.cap(1, '새 결제 수단마다 if를 추가하면', 'Adding an if for every new payment type…').cap(2, '공통 인터페이스를 두고', 'Instead, define a common interface').cap(3, '각 방식은 구현 클래스로', 'Each method is its own class')
    .cap(4, '새 방식은 클래스만 추가 · 기존 코드는 그대로', 'New types just add a class; old code stays untouched').cap(5, '확장에는 열려 있고 수정에는 닫혀 있게', 'Open for extension, closed for modification');
  return S;
}
function sLSP() {
  const S = scene({ id: 'dp-lsp', steps: 5, per: 1.3 });
  text(S, 'cl', 2, 2, 'r.setWidth(5); r.setHeight(4);', { cls: 'cz-t cz-mono' });
  S.label('nm', { cls: 'cz-t dp-b', x: 2, y: 4, w: 14 }, [[0, 'Rectangle r'], [3, 'Square r']]);
  S.el('rect', { x: 4, y: 7, w: 10, h: 8, css: 'border:.15em solid var(--accent);border-radius:.3em;transform-origin:0 0', s: { background: 'var(--accent-soft)' } });
  S.label('dim', { cls: 'cz-t cz-mono', x: 15, y: 10, w: 16 }, [[0, ''], [1, 'w = 5, h = 4'], [2, ['넓이 20 ✓', 'area 20 ✓']], [3, ''], [4, ['w = 4, h = 4 (정사각형이라 같이 바뀜)', 'w = 4, h = 4 (square syncs both)']], [5, ['넓이 16 ✗ 기대 20', 'area 16 ✗ expected 20']]]);
  S.set('rect', 3, { transform: 'scale(.8,1)', 'border-color': 'var(--warn)', background: 'var(--warn-soft)' }).set('rect', 4, { transform: 'scale(.8,1)' }).set('rect', 5, { background: 'var(--danger-soft)', 'border-color': 'var(--danger)' });
  S.cap(1, '직사각형은 너비와 높이를 따로 정해요', 'A rectangle sets width and height separately').cap(2, '기대한 대로 동작', 'It works as expected').cap(3, '정사각형을 같은 자리에 넣으면', 'Swap in a Square subclass')
    .cap(4, '한 변을 바꾸면 다른 변도 바뀌어서', 'Setting one side changes the other').cap(5, '부모를 쓰던 코드가 깨져요 · 자식은 부모를 대신할 수 있어야 해요', 'Code expecting the parent breaks: subtypes must be substitutable');
  return S;
}
function sISP() {
  const S = scene({ id: 'dp-isp', steps: 4, per: 1.4 });
  box(S, 'fat', 2, 1.6, 12, 7.2, '', { css: IF });
  text(S, 'ft', 2.8, 2, '«interface» Machine', { cls: 'cz-t cz-mono' });
  ['print()', 'scan()', 'fax()'].forEach((m, i) => cell(S, 'f' + i, 3, 3.6 + i * 1.7, m, { w: 10, h: 1.5, cls: 'cz-c dp-t' }));
  box(S, 'sp', 2, 12, 12, 5.4, '', {});
  text(S, 'spt', 2.8, 12.4, 'SimplePrinter', { cls: 'cz-t cz-mono dp-b' });
  ['print() ✓', 'scan() → throw ✗', 'fax() → throw ✗'].forEach((m, i) => cell(S, 's' + i, 3, 13.8 + i * 1.2, m, { w: 10, h: 1.1, cls: 'cz-c dp-t dp-xs', s: i ? C.bad : C.ok }));
  link(S, 'ln', [8, 12], [8, 8.8], 0, .05);
  S.set('sp', 1, C.cmp);
  ['Printer', 'Scanner', 'Fax'].forEach((n, i) => { box(S, 'n' + i, 17 + (i % 2) * 7.4, 1.6 + Math.floor(i / 2) * 4.6, 6.8, 3, '«if» ' + n, { cls: 'cz-box cz-bx cz-mono', css: IF, s: hid() }); S.set('n' + i, 2, { opacity: '1' }); });
  box(S, 'sp2', 17, 12, 6.8, 3, 'SimplePrinter', { cls: 'cz-box cz-bx cz-mono', s: hid(C.ok) }); link(S, 'l2', [20.4, 12], [20.4, 4.6], 0, .05, { s: hid() });
  box(S, 'mf', 24.4, 12, 6.8, 3, 'OfficeMFP', { cls: 'cz-box cz-bx cz-mono', s: hid(C.soft) });
  [['m0', [27.8, 12], [20.4, 4.6]], ['m1', [27.8, 12], [27.8, 4.6]], ['m2', [27.8, 12], [20.4, 9.2]]].forEach(([k, a, b]) => link(S, k, a, b, 0, .05, { s: hid() }));
  S.set('sp2', 3, { opacity: '1' }).set('l2', 3, { opacity: '1' }); ['mf', 'm0', 'm1', 'm2'].forEach(k => S.set(k, 4, { opacity: '1' }));
  S.cap(0, '기능을 몽땅 담은 큰 인터페이스', 'One fat interface with everything').cap(1, '단순 프린터도 쓰지 않는 메서드를 억지로 구현해요', 'A simple printer must stub methods it can’t support')
    .cap(2, '역할별로 작게 나누면', 'Split it by role').cap(3, '필요한 것만 구현', 'Each class implements only what it needs').cap(4, '복합기는 여러 개를 함께 구현', 'A multifunction device implements several');
  return S;
}
function sDIP() {
  const S = scene({ id: 'dp-dip', steps: 4, per: 1.4 });
  box(S, 'os', 10, 2, 12, 3.2, 'OrderService', { cls: 'cz-box cz-bx cz-mono' });
  box(S, 'my', 3, 14.6, 10, 3.2, 'MySQLRepo', { cls: 'cz-box cz-bx cz-mono' });
  arrow(S, 'd1', 14, 5.4, 9, 14.4);
  text(S, 'n1', 1.5, 9, ['고수준이 저수준에 직접 의존', 'high level depends on low level'], { cls: 'cz-t' });
  S.set('my', 1, C.bad).set('os', 1, C.cmp);
  box(S, 'if', 10, 8.6, 12, 3.2, '«interface» OrderRepo', { cls: 'cz-box cz-bx cz-mono', css: IF, s: hid(C.soft) });
  arrow(S, 'd2', 16, 5.4, 16, 8.4, { s: hid() }); arrow(S, 'd3', 8, 14.4, 13, 12, { s: hid() });
  box(S, 'mem', 19, 14.6, 10, 3.2, 'MemoryRepo', { cls: 'cz-box cz-bx cz-mono', s: hid(C.ok) }); arrow(S, 'd4', 24, 14.4, 19, 12, { s: hid() });
  S.set('d1', 2, { opacity: '0' }).set('n1', 2, { opacity: '0' }).set('my', 2, C.idle).set('os', 2, C.idle); show(S, ['if', 'd2', 'd3'], 2); show(S, ['mem', 'd4'], 3);
  S.cap(1, 'DB를 바꾸면 비즈니스 로직까지 고쳐야 해요', 'Switching DBs means editing business logic').cap(2, '둘 다 추상(인터페이스)에 의존하게 뒤집어요', 'Make both depend on an abstraction')
    .cap(3, '테스트용 메모리 저장소로도 갈아끼울 수 있어요', 'Now an in-memory repo can be swapped in for tests').cap(4, 'DI 컨테이너가 이 연결을 대신 해 줘요', 'A DI container wires this up for you');
  return S;
}

/* ---------- creational ---------- */
function sSingleton() {
  const S = scene({ id: 'dp-singleton', steps: 5, per: 1.2 });
  box(S, 'cfg', 19, 7.8, 10, 4.4, ['Config (단 하나)', 'Config (only one)'], { cls: 'cz-box cz-bx cz-mono', s: hid(C.soft) });
  const cl = [['A', 3], ['B', 9.8], ['C', 16.6]];
  cl.forEach(([n, y], i) => { box(S, 'c' + i, 2, y - 1.5, 6.4, 3, ['모듈 ', 'Module '].map(t => t + n), {}); arrow(S, 'a' + i, 8.6, y, 18.8, 10, { s: hid(AR.acc) }); S.set('a' + i, i + 1, { opacity: '1' }).set('c' + i, i + 1, C.soft).set('c' + i, i + 2, C.idle); });
  S.set('cfg', 1, { opacity: '1' });
  S.label('n', { cls: 'cz-t cz-mono', x: 19, y: 13, w: 12 }, [[0, ''], [1, ['getInstance() → 새로 생성', 'getInstance() → created']], [2, ['getInstance() → 같은 객체', 'getInstance() → same one']]]);
  S.cap(1, '처음 요청할 때 한 번만 만들고', 'Created once, on first request').cap(2, '다음부터는 같은 객체를 돌려줘요', 'Every later call gets the same object')
    .cap(4, '설정·로거·커넥션 풀처럼 하나여야 하는 것', 'For things that must be unique: config, logger, pool')
    .cap(5, '전역 상태라 테스트가 어려워져요 · DI 컨테이너의 싱글톤 범위를 권장', 'It is global state and hurts testing · prefer DI singletons');
  return S;
}
function sFactory() {
  const S = scene({ id: 'dp-factory', steps: 5, per: 1.2 });
  box(S, 'cl', 1.5, 8.4, 7, 3.4, ['클라이언트', 'Client']);
  box(S, 'fc', 12.5, 7.4, 8, 5.4, 'ShapeFactory', { cls: 'cz-box cz-bx cz-mono' });
  pill(S, 'r1', 1.5, 5, "create('circle')", { w: 9, h: 1.8, cls: 'cz-pill cz-mono', s: hid(C.cur) });
  pill(S, 'r2', 1.5, 13.6, "create('square')", { w: 9, h: 1.8, cls: 'cz-pill cz-mono', s: hid(C.cur) });
  S.el('circ', { x: 24.5, y: 3, w: 4.4, h: 4.4, css: 'border-radius:50%;border:.15em solid var(--accent)', s: Object.assign({ opacity: '0', transform: 'translateX(-6em) scale(.3)' }, { background: 'var(--accent-soft)' }) });
  S.el('sq', { x: 24.5, y: 12.6, w: 4.4, h: 4.4, css: 'border-radius:.4em;border:.15em solid var(--ok)', s: Object.assign({ opacity: '0', transform: 'translateX(-6em) scale(.3)' }, { background: 'color-mix(in srgb,var(--ok) 20%,var(--ui))' }) });
  S.set('r1', 1, { opacity: '1' }).set('fc', 2, C.soft).set('circ', 2, { opacity: '1', transform: 'none' }).set('fc', 3, C.idle);
  S.set('r2', 3, { opacity: '1' }).set('fc', 4, C.soft).set('sq', 4, { opacity: '1', transform: 'none' }).set('fc', 5, C.idle);
  S.cap(1, '클라이언트는 무엇이 필요한지만 말해요', 'The client only says what it needs').cap(2, '어떤 클래스를 new 할지는 팩토리가 정해요', 'The factory decides which class to instantiate')
    .cap(4, '생성 로직이 한 곳에 모여요', 'Creation logic lives in one place').cap(5, '새 도형이 생겨도 클라이언트는 그대로', 'New shapes don’t touch the client');
  return S;
}
function sAbsF() {
  const S = scene({ id: 'dp-absfactory', steps: 4, per: 1.5 });
  S.label('f', { cls: 'cz-box cz-bx cz-mono', x: 2, y: 2, w: 11, h: 3.2 }, [[0, 'LightUIFactory'], [2, 'DarkUIFactory']]);
  text(S, 'ar', 13.6, 2.9, '→', { cls: 'cz-t os-lg' });
  S.el('panel', { x: 16, y: 1.6, w: 14.5, h: 16, css: 'border-radius:1em;border:.12em solid var(--line)', s: { background: '#ffffff' } });
  S.el('btn', { x: 18, y: 4, w: 10.5, h: 3, css: 'border-radius:.6em;display:grid;place-items:center', html: 'Button', cls: 'dp-ui', s: { background: '#e8f0ff', color: '#1f5fd6' } });
  S.el('chk', { x: 18, y: 9.4, w: 2.6, h: 2.6, css: 'border-radius:.4em;border:.15em solid #1f5fd6', s: { background: '#ffffff' } });
  text(S, 'chl', 21.4, 9.9, 'Checkbox', { cls: 'cz-t' });
  S.el('inp', { x: 18, y: 13.6, w: 10.5, h: 2.6, css: 'border-radius:.5em;border:.12em solid #c9d3e0', s: { background: '#ffffff' } });
  const dark = { background: '#1b1f27' };
  S.set('panel', 2, dark).set('btn', 2, { background: '#2b3a55', color: '#9ec1ff' }).set('chk', 2, { background: '#1b1f27' }).set('inp', 2, { background: '#262b35' });
  ['createButton()', 'createCheckbox()', 'createInput()'].forEach((t, i) => text(S, 'm' + i, 2.4, 7.4 + i * 2, t, { cls: 'cz-t cz-mono' }));
  S.cap(0, '관련된 부품 묶음(가족)을 만드는 팩토리', 'A factory for a family of related parts').cap(1, '라이트 팩토리는 라이트 부품만', 'The light factory makes only light parts')
    .cap(2, '팩토리만 바꾸면 모든 부품이 함께 바뀌어요', 'Swap the factory and every part changes together').cap(4, '섞여서 어울리지 않는 조합을 막아요 (테마·OS별 UI)', 'It prevents mismatched combos (themes, per-OS UI)');
  return S;
}
function sBuilder() {
  const S = scene({ id: 'dp-builder', steps: 6, per: 1.05 });
  const code = ['new PizzaBuilder()', "  .size('L')", '  .cheese()', '  .olive()', '  .pepperoni()', '  .build()'];
  code.forEach((t, i) => { text(S, 'c' + i, 1.5, 2.4 + i * 2, t, { cls: 'cz-t cz-mono', s: i ? hid() : {} }); if (i) S.set('c' + i, i, { opacity: '1' }); });
  S.el('dough', { x: 18, y: 4, w: 11, h: 11, css: 'border-radius:50%;border:.2em solid #d9a45b', s: { background: '#f3d9a4', transform: 'scale(.7)' } });
  S.set('dough', 1, { transform: 'none' });
  S.el('cheese', { x: 19, y: 5, w: 9, h: 9, css: 'border-radius:50%', s: { background: '#ffe07a', opacity: '0' } }); S.set('cheese', 2, { opacity: '1' });
  [[21, 7], [25, 8], [22.5, 11]].forEach(([x, y], i) => { S.el('o' + i, { x, y, w: 1.2, h: 1.2, css: 'border-radius:50%;border:.25em solid #2f3b2a', s: { opacity: '0' } }); S.set('o' + i, 3, { opacity: '1' }); });
  [[23, 6.2], [20.2, 9.8], [25.6, 10.8]].forEach(([x, y], i) => { S.el('p' + i, { x, y, w: 1.8, h: 1.8, css: 'border-radius:50%', s: { background: '#c8463c', opacity: '0' } }); S.set('p' + i, 4, { opacity: '1' }); });
  pill(S, 'ok', 19.5, 16.4, ['완성된 Pizza 객체', 'finished Pizza object'], { w: 8, h: 1.9, s: hid(C.ok) }); S.set('ok', 5, { opacity: '1' });
  S.cap(0, '옵션이 많은 객체를 단계별로 조립해요', 'Assemble an object with many options step by step').cap(1, '필요한 것만 골라 체이닝', 'Chain only the options you need')
    .cap(5, 'build()에서 검증 후 완성', 'build() validates and finishes').cap(6, '생성자 인자 10개보다 읽기 쉬워요 (Lombok @Builder, OkHttp)', 'Clearer than a 10-argument constructor');
  return S;
}
function sProto() {
  const S = scene({ id: 'dp-prototype', steps: 4, per: 1.4 });
  const card = (k, x, title, st) => { box(S, k, x, 3, 11, 12, '', { s: st }); };
  card('a', 3, '', {}); text(S, 'at', 4, 3.6, ['원본 문서', 'Original'], { cls: 'cz-t dp-b' });
  ['title: 보고서', 'style: 기본', 'pages: [p1, p2]'].forEach((t, i) => text(S, 'af' + i, 4, 6 + i * 2, t, { cls: 'cz-t cz-mono' }));
  card('b', 18, '', hid(C.soft)); text(S, 'bt', 19, 3.6, ['복제본', 'Clone'], { cls: 'cz-t dp-b', s: hid() });
  S.label('bf0', { cls: 'cz-t cz-mono', x: 19, y: 6, w: 10 }, [[0, ''], [1, 'title: 보고서'], [2, 'title: 보고서 v2']]);
  ['style: 기본', 'pages: [p1, p2]'].forEach((t, i) => text(S, 'bf' + (i + 1), 19, 8 + i * 2, t, { cls: 'cz-t cz-mono', s: hid() }));
  arrow(S, 'cp', 14.4, 9, 17.6, 9, { s: hid() });
  show(S, ['b', 'bt', 'bf1', 'bf2', 'cp'], 1); S.set('b', 2, C.ok);
  text(S, 'sh', 3, 16.4, ['얕은 복사면 pages 배열을 함께 써서 한쪽 변경이 다른 쪽에 번져요', 'A shallow copy shares the pages array: edits leak across'], { cls: 'cz-t', s: hid() }); S.set('sh', 3, { opacity: '1' }).set('af2', 3, C.cmp);
  S.cap(1, '처음부터 만들지 않고 기존 객체를 복제해요', 'Copy an existing object instead of building from scratch').cap(2, '복제본만 고쳐요', 'Then tweak just the copy')
    .cap(3, '깊은 복사와 얕은 복사를 구분하세요', 'Mind deep vs shallow copy').cap(4, 'JS의 structuredClone, 게임의 몬스터 템플릿', 'structuredClone in JS, monster templates in games');
  return S;
}

/* ---------- structural ---------- */
function sAdapter() {
  const S = scene({ id: 'dp-adapter', steps: 5, per: 1.2 });
  box(S, 'cl', 1.5, 7.6, 7.4, 4.4, ['클라이언트', 'Client'], {}); text(S, 'cle', 1.5, 12.4, 'pay(amount)', { w: 7.4, cls: 'cz-t cz-tc cz-mono' });
  box(S, 'ad', 12.3, 7.6, 7.4, 4.4, 'Adapter', { cls: 'cz-box cz-bx cz-mono', s: hid(C.soft) });
  box(S, 'old', 23.1, 7.6, 7.4, 4.4, ['옛 결제 SDK', 'Legacy SDK'], {}); text(S, 'ole', 23.1, 12.4, 'sendMoney(won, krw)', { w: 7.4, cls: 'cz-t cz-tc cz-mono' });
  pill(S, 'x', 10.3, 4.4, ['인터페이스가 안 맞아요 ✗', 'interfaces don’t match ✗'], { w: 11.4, h: 1.9, s: C.bad });
  S.set('x', 1, { opacity: '0' }).set('ad', 1, { opacity: '1' });
  fly(S, 'm1', [9.2, 9.8], [12, 9.8], 2, 'pay', C.cur);
  fly(S, 'm2', [19.9, 9.8], [22.8, 9.8], 3, 'send', C.warn);
  S.set('ad', 3, C.cmp).set('old', 4, C.ok).set('ad', 4, C.soft);
  S.cap(0, '쓰고 싶은 라이브러리의 모양이 달라요', 'The library you need has a different shape').cap(1, '중간에 어댑터를 두면', 'Put an adapter in between')
    .cap(2, '클라이언트는 원래 쓰던 대로 부르고', 'The client calls what it always calls').cap(3, '어댑터가 옛 방식으로 바꿔 전달해요', 'and the adapter translates to the old API')
    .cap(5, '외부 API·레거시 연동의 기본 · 돼지코 콘센트와 같아요', 'Standard for third-party and legacy integration, like a travel plug');
  return S;
}
function sBridge() {
  const S = scene({ id: 'dp-bridge', steps: 4, per: 1.5 });
  const combos = [['RedCircle', 2, 2], ['BlueCircle', 9.6, 2], ['GreenCircle', 17.2, 2], ['RedSquare', 2, 6], ['BlueSquare', 9.6, 6], ['GreenSquare', 17.2, 6]];
  combos.forEach(([n, x, y], i) => box(S, 'c' + i, x, y, 7.2, 3.2, n, { cls: 'cz-box cz-bx cz-mono dp-xs' }));
  text(S, 'cn', 2, 9.5, ['도형 × 색 = 6개 클래스', 'shapes × colors = 6 classes'], { cls: 'cz-t' });
  S.set('cn', 1, C.bad); combos.forEach((_, i) => S.set('c' + i, 1, C.cmp));
  combos.forEach((_, i) => S.set('c' + i, 2, { opacity: '.12' })); S.set('cn', 2, { opacity: '0' });
  ['Shape', 'Circle', 'Square'].forEach((n, i) => { box(S, 's' + i, i ? 1.5 + (i - 1) * 6.8 : 4.9, i ? 15.6 : 10.6, 6, 2.8, n, { cls: 'cz-box cz-bx cz-mono', s: hid(i ? {} : C.soft) }); S.set('s' + i, 2, { opacity: '1' }); });
  ['Color', 'Red', 'Blue', 'Green'].forEach((n, i) => { box(S, 'k' + i, i ? 15.5 + (i - 1) * 5.4 : 20.5, i ? 15.6 : 10.6, i ? 5 : 6, 2.8, n, { cls: 'cz-box cz-bx cz-mono', s: hid(i ? {} : C.ok) }); S.set('k' + i, 2, { opacity: '1' }); });
  arrow(S, 'br', 11.1, 12, 20.3, 12, { s: hid(AR.acc) }); text(S, 'brl', 12, 10.6, ['has-a (다리)', 'has-a (bridge)'], { cls: 'cz-t', s: hid() }); show(S, ['br', 'brl'], 3);
  S.cap(1, '두 방향으로 늘어나면 상속 조합이 폭발해요', 'Two dimensions of inheritance explode into combos').cap(2, '두 축을 따로 계층으로 분리하고', 'Separate the two axes into their own hierarchies')
    .cap(3, '도형이 색을 "가지게" 연결해요', 'and let shapes *have* a color').cap(4, '2 + 3개로 6가지 조합 · 드라이버·렌더러 분리에 써요', '2 + 3 classes cover 6 combos · used for drivers and renderers');
  return S;
}
function sComposite() {
  const S = scene({ id: 'dp-composite', steps: 5, per: 1.2 });
  const N = { root: [16, 3, ['프로젝트/', 'project/']], src: [8.8, 9, 'src/'], docs: [24, 9, 'docs/'], a: [4.6, 15.2, 'a.js 4KB'], b: [13, 15.2, 'b.js 6KB'], r: [24, 15.2, 'readme 2KB'] };
  const E = [['root', 'src'], ['root', 'docs'], ['src', 'a'], ['src', 'b'], ['docs', 'r']];
  E.forEach(([p, c]) => edge(S, 'e' + c, N[p][0], N[p][1] + 1.3, N[c][0], N[c][1] - 1.3));
  Object.entries(N).forEach(([k, [x, y, l]]) => box(S, k, x - 3.8, y - 1.3, 7.6, 2.6, l, { cls: 'cz-box cz-bx dp-xs' }));
  const tot = (k, x, y, v, st) => { pill(S, 't' + k, x - 2.6, y + 1.5, v, { w: 5.2, h: 1.6, s: hid(C.ok) }); S.set('t' + k, st, { opacity: '1' }); };
  ['a', 'b', 'r'].forEach(k => S.set(k, 1, C.soft));
  tot('src', 8.8, 9, '10KB', 2); tot('docs', 24, 9, '2KB', 2); S.set('src', 2, C.ok).set('docs', 2, C.ok);
  tot('root', 16, 3, '12KB', 3); S.set('root', 3, C.ok);
  S.cap(0, '파일과 폴더를 같은 방식으로 다뤄요', 'Treat files and folders the same way').cap(1, 'size()를 부르면 파일은 자기 크기를', 'size() on a file returns its own size')
    .cap(2, '폴더는 자식들의 size()를 더해요', 'a folder sums its children’s size()').cap(3, '맨 위에서 한 번 부르면 전체가 계산돼요', 'One call at the top computes everything')
    .cap(5, 'UI 컴포넌트 트리, 조직도, 메뉴 구조가 모두 이 모양', 'UI component trees, org charts and menus share this shape');
  return S;
}
function sDecorator() {
  const S = scene({ id: 'dp-decorator', steps: 4, per: 1.4 });
  const L = [['coffee', 12, 8, 8, 4, ['커피 3000', 'Coffee 3000'], C.soft], ['milk', 9.5, 5.5, 13, 9, ['+ 우유 500', '+ Milk 500'], {}], ['syrup', 7, 3, 18, 14, ['+ 시럽 300', '+ Syrup 300'], {}]];
  L.forEach(([k, x, y, w, h, l, st], i) => { S.el(k, { cls: 'cz-box', x, y, w, h, css: `border-radius:1em;z-index:${3 - i}`, s: i ? Object.assign({ opacity: '0', transform: 'scale(.9)' }, st) : st }); text(S, k + 'l', x + .6, y + .4, l, { cls: 'cz-t dp-b', css: 'z-index:5', s: i ? hid() : {} }); if (i) { S.set(k, i, { opacity: '1', transform: 'none' }).set(k + 'l', i, { opacity: '1' }); } });
  S.label('cost', { cls: 'cz-t cz-tc db-big', x: 7, y: 18.2, w: 18 }, [[0, 'cost() = 3000'], [1, 'cost() = 3500'], [2, 'cost() = 3800']]);
  S.cap(0, '기본 객체가 있고', 'Start with a base object').cap(1, '같은 인터페이스로 감싸 기능을 덧붙여요', 'Wrap it in objects with the same interface to add behaviour')
    .cap(2, '여러 겹 감쌀 수 있어요 · 각 층이 cost()를 더해요', 'Wrap as many layers as you like; each adds to cost()').cap(4, '상속 없이 조합으로 확장 · 자바 I/O 스트림, 미들웨어', 'Extension by composition, not inheritance · Java streams, middleware');
  return S;
}
function sFacade() {
  const S = scene({ id: 'dp-facade', steps: 4, per: 1.4 });
  box(S, 'cl', 1.2, 8.3, 6.4, 3.4, ['클라이언트', 'Client']);
  box(S, 'fa', 10.4, 7.3, 8.6, 5.4, '', { s: C.soft }); text(S, 'fat', 10.4, 8.2, 'HomeTheater', { w: 8.6, cls: 'cz-t cz-tc cz-mono dp-b' }); text(S, 'fam', 10.4, 10.2, 'watchMovie()', { w: 8.6, cls: 'cz-t cz-tc cz-mono' });
  const sub = [['TV.on()', 1.6], ['Sound.setVolume(7)', 5.9], ['Lights.dim()', 10.2], ['Player.play()', 14.5]];
  sub.forEach(([t, y], i) => { box(S, 's' + i, 22.2, y, 8.8, 3.2, t, { cls: 'cz-box cz-bx cz-mono dp-xs' }); arrow(S, 'a' + i, 19.2, 10, 22, y + 1.6, { s: hid(AR.acc) }); S.set('a' + i, 2, { opacity: '1' }).set('s' + i, 2, C.ok); });
  fly(S, 'm', [8, 10], [10.2, 10], 1, '', C.cur);
  S.cap(1, '클라이언트는 메서드 하나만 불러요', 'The client calls one method').cap(2, '파사드가 복잡한 하위 시스템들을 순서대로 다뤄요', 'The facade drives the complex subsystems in order')
    .cap(4, '복잡함을 숨긴 간단한 창구 · SDK, 서비스 레이어', 'A simple front over complexity · SDKs, service layers');
  return S;
}
function sFlyweight() {
  const S = scene({ id: 'dp-flyweight', steps: 4, per: 1.4 });
  const T = [['🌲 Pine', 4], ['🌳 Oak', 14], ['🌴 Palm', 24]];
  T.forEach(([n, x], i) => box(S, 't' + i, x, 14.4, 7, 3.4, '', { s: hid([C.ok, C.soft, C.cmp][i]) }));
  T.forEach(([n, x], i) => { text(S, 'tn' + i, x, 15, ['텍스처·모델 ', 'mesh+texture '].map(t => t + n.split(' ')[1]), { w: 7, cls: 'cz-t cz-tc', s: hid() }); show(S, ['t' + i, 'tn' + i], 2); });
  const pts = []; for (let i = 0; i < 18; i++) pts.push([2.5 + (i % 9) * 3.3 + (Math.floor(i / 9) ? 1.4 : 0), 3.2 + Math.floor(i / 9) * 4.2, i % 3]);
  pts.forEach(([x, y, t], i) => { dot(S, 'p' + i, x, y, '', { r: .7, s: [C.okf, C.cur, C.warn][t] }); });
  pts.forEach(([x, y, t], i) => { if (i % 4 === 0) { link(S, 'l' + i, [x, y], [[7.5, 17.5, 27.5][t], 14.4], .7, .1, { s: hid() }); S.set('l' + i, 3, { opacity: '.6' }); } });
  S.label('mem', { cls: 'cz-t cz-tc db-big', x: 4, y: 18.4, w: 24 }, [[0, ['나무 1000그루 × 모델 = 2GB', '1000 trees × model = 2 GB']], [2, ['공유 3개 + 위치만 = 20MB', '3 shared + positions = 20 MB']]]);
  S.cap(0, '나무마다 무거운 모델을 따로 가지면 메모리가 넘쳐요', 'Each tree holding its own heavy model wastes memory').cap(2, '변하지 않는 부분은 몇 개만 만들어 공유하고', 'Share the few immutable parts')
    .cap(3, '나무는 위치·크기만 가지고 공유 객체를 가리켜요', 'Each tree keeps only position and points to a shared type').cap(4, '게임 오브젝트, 글자 렌더링, 문자열 인터닝', 'Game objects, glyph rendering, string interning');
  return S;
}
function sProxy() {
  const S = scene({ id: 'dp-proxy', steps: 6, per: 1.15 });
  box(S, 'cl', 1.2, 8.3, 6.4, 3.4, ['클라이언트', 'Client']);
  box(S, 'px', 12.2, 8.3, 7.6, 3.4, 'ImageProxy', { cls: 'cz-box cz-bx cz-mono', s: C.soft });
  box(S, 'rl', 24, 8.3, 7, 3.4, ['진짜 이미지 (20MB)', 'Real image (20 MB)'], { s: hid() });
  fly(S, 'm1', [8, 10], [12, 10], 1, 'show', C.cur);
  S.set('rl', 2, { opacity: '1' }).set('rl', 2, C.cmp); fly(S, 'm2', [20, 10], [23.8, 10], 2, 'load', C.warn);
  text(S, 'n2', 22, 12.4, ['처음 한 번만 무겁게 로딩', 'heavy load, first time only'], { cls: 'cz-t', s: hid() }); S.set('n2', 2, { opacity: '1' }).set('n2', 4, { opacity: '0' });
  S.set('rl', 3, C.ok);
  fly(S, 'm3', [8, 10], [12, 10], 4, 'show', C.cur); S.set('px', 5, C.ok);
  text(S, 'n5', 11.4, 12.4, ['캐시된 것을 바로', 'served from cache'], { cls: 'cz-t', s: hid() }); S.set('n5', 5, { opacity: '1' });
  pill(S, 'deny', 1, 14.6, ['권한 없음 → 프록시가 차단', 'no permission → proxy blocks'], { w: 13, h: 1.9, s: hid(C.bad) }); S.set('deny', 6, { opacity: '1' });
  S.cap(0, '진짜 객체 앞에 같은 모양의 대리인을 둬요', 'A stand-in with the same interface sits in front').cap(1, '요청은 프록시가 먼저 받아요', 'Requests hit the proxy first').cap(2, '필요할 때만 진짜를 만들고 (지연 로딩)', 'It creates the real object only when needed (lazy)')
    .cap(4, '다시 요청하면', 'On the next request').cap(5, '진짜를 건드리지 않고 답해요 (캐싱)', 'it answers without touching the real one (caching)').cap(6, '접근 제어·로깅도 가능 · JPA 지연 로딩, 리버스 프록시', 'Also access control and logging · ORM lazy loading, reverse proxies');
  return S;
}

/* ---------- behavioral ---------- */
function sChain() {
  const S = scene({ id: 'dp-chain', steps: 7, per: .95 });
  const H = [['Auth', 4.6], ['RateLimit', 11.6], ['Logger', 18.6], ['Handler', 25.6]];
  H.forEach(([n, x], i) => { box(S, 'h' + i, x - 3, 7.6, 6, 3.4, n, { cls: 'cz-box cz-bx cz-mono dp-xs' }); if (i) arrow(S, 'a' + i, x - 4, 9.3, x - 3.2, 9.3); });
  const rq = (k, path, st0, sty) => { dot(S, k, 1, 9.3, '', { r: .8, s: hid(sty) }); S.set(k, st0, { opacity: '1' }); path.forEach((x, i) => S.move(k, st0 + i, x - .8, 5.4 - .8)); };
  rq('r1', [4.6, 11.6, 18.6, 25.6], 1, C.cur); S.set('r1', 5, { opacity: '0' });
  [0, 1, 2, 3].forEach(i => S.set('h' + i, i + 1, C.ok).set('h' + i, i + 2 > 7 ? 7 : i + 2, C.idle));
  dot(S, 'r2', 1, 9.3, '', { r: .8, s: hid(C.warn) }); S.set('r2', 5, { opacity: '1' }).move('r2', 6, 4.6 - .8, 5.4 - .8).set('h0', 6, C.bad);
  pill(S, 'x', .8, 13, ['401 거절 · 뒤로는 안 가요', '401 · stops here'], { w: 11, h: 1.9, s: hid(C.bad) }); S.set('x', 6, { opacity: '1' });
  S.cap(1, '요청이 처리기 사슬을 차례로 지나가요', 'A request passes along a chain of handlers').cap(4, '각자 자기 일만 하고 다음으로 넘겨요', 'Each does its part and passes it on')
    .cap(6, '중간에서 멈출 수도 있어요', 'Any link can stop it').cap(7, 'Express·Spring 미들웨어·필터, 이벤트 버블링', 'Express/Spring middleware and filters, event bubbling');
  return S;
}
function sCommand() {
  const S = scene({ id: 'dp-command', steps: 7, per: 1 });
  box(S, 'doc', 2, 3, 13, 8, '', {});
  S.label('txt', { cls: 'cz-t dp-doc', x: 3, y: 5.6, w: 11 }, [[0, ''], [1, 'Hi'], [2, 'Hi there'], [3, '<b>Hi there</b>'], [5, 'Hi there'], [6, 'Hi'], [7, 'Hi']]);
  text(S, 'ht', 18, 1.4, ['실행 기록 (스택)', 'history (stack)'], { cls: 'cz-t' });
  const cmds = [["Type('Hi')", 1], ["Type(' there')", 2], ['Bold()', 3]];
  cmds.forEach(([t, st], i) => { cell(S, 'c' + i, 18, 13 - i * 2.5, t, { w: 11, h: 2.1, cls: 'cz-c db-t db-code', s: Object.assign({ opacity: '0', transform: 'translateY(-2em)' }, C.soft) }); S.set('c' + i, st, { opacity: '1', transform: 'none' }); });
  S.set('c2', 5, { opacity: '0', transform: 'translateX(3em)' }).set('c1', 6, { opacity: '0', transform: 'translateX(3em)' });
  pill(S, 'u', 3, 13.4, 'Ctrl+Z → undo()', { w: 10, h: 1.9, cls: 'cz-pill cz-mono', s: hid(C.cmp) }); S.set('u', 4, { opacity: '1' }).set('u', 7, { opacity: '0' });
  S.cap(1, '동작을 객체로 만들어 실행하고 기록해요', 'Each action is an object that is executed and recorded').cap(3, '명령이 스택에 쌓여요', 'Commands pile up on a stack')
    .cap(4, '되돌리기는', 'Undo').cap(5, '마지막 명령의 undo()를 부르는 것', 'calls undo() on the last command').cap(7, '실행 취소, 작업 큐, 매크로, 트랜잭션 로그에 써요', 'Used for undo, job queues, macros and logs');
  return S;
}
function sIterator() {
  const S = scene({ id: 'dp-iterator', steps: 7, per: .9 });
  const N = { A: [16, 3.4], B: [9, 9], C: [23, 9], D: [5, 14.6], E: [13, 14.6] };
  [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E']].forEach(([a, b]) => edge(S, 'e' + b, N[a][0], N[a][1], N[b][0], N[b][1]));
  Object.entries(N).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.3 }));
  const ord = ['A', 'B', 'D', 'E', 'C'];
  text(S, 'ol', 18, 13, ['for (x of tree) →', 'for (x of tree) →'], { cls: 'cz-t cz-mono' });
  ord.forEach((k, i) => { S.set(k, i + 1, C.cur); if (i) S.set(ord[i - 1], i + 1, C.ok); cell(S, 'o' + i, 18 + i * 2.6, 14.8, k, { w: 2.2, h: 2.2, s: hid(C.ok) }); S.set('o' + i, i + 1, { opacity: '1' }); });
  S.set('C', 6, C.ok);
  S.label('hn', { cls: 'cz-t cz-mono', x: 18, y: 18, w: 13 }, [[0, 'hasNext() = true'], [6, 'hasNext() = false']]);
  S.cap(0, '컬렉션 내부 구조를 몰라도 차례로 꺼내요', 'Walk a collection without knowing its insides').cap(1, 'next()가 다음 원소를 줘요', 'next() returns the next element')
    .cap(6, '끝나면 hasNext()가 false', 'At the end, hasNext() is false').cap(7, 'for…of, 제너레이터, 스트림이 이 패턴이에요', 'for…of, generators and streams are this pattern');
  return S;
}
function sMediator() {
  const S = scene({ id: 'dp-mediator', steps: 5, per: 1.3 });
  const P = [[16, 2.6], [27, 8.6], [23, 17.4], [9, 17.4], [5, 8.6]], M = [16, 10.6];
  let k = 0; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) { edge(S, 'm' + k, P[i][0], P[i][1], P[j][0], P[j][1], { s: { background: 'var(--danger)' } }); S.set('m' + k, 2, { opacity: '0' }); k++; }
  text(S, 'mc', 1, 1.2, ['연결 10개', '10 links'], { cls: 'cz-t', s: C.bad }); S.set('mc', 2, { opacity: '0' });
  P.forEach((p, i) => { edge(S, 's' + i, p[0], p[1], M[0], M[1], { s: hid({ background: 'var(--accent)' }) }); S.set('s' + i, 2, { opacity: '1' }); });
  box(S, 'md', M[0] - 3.4, M[1] - 1.5, 6.8, 3, ['채팅방', 'Chat room'], { s: hid(C.soft), css: 'z-index:3' }); S.set('md', 2, { opacity: '1' });
  P.forEach((p, i) => node(S, 'u' + i, p[0], p[1], 'U' + (i + 1), { r: 1.3 }));
  fly(S, 'f0', P[4], M, 3, '', C.cur);
  [0, 1, 2, 3].forEach(i => fly(S, 'g' + i, M, P[i], 4, '', C.ok));
  S.cap(1, '서로 직접 연결하면 n² 으로 얽혀요', 'Direct links tangle into n² connections').cap(2, '중재자를 두면 각자 하나씩만 연결', 'With a mediator, each has one link')
    .cap(3, 'U5가 보내면 중재자가', 'U5 sends to the mediator').cap(4, '나머지에게 전달해요', 'which relays it to the others').cap(5, '채팅방, 관제탑, 폼 컨트롤 간 조율', 'Chat rooms, air traffic control, form field coordination');
  return S;
}
function sMemento() {
  const S = scene({ id: 'dp-memento', steps: 7, per: 1 });
  box(S, 'ed', 2, 3, 13, 6, '', {}); text(S, 'edl', 2.6, 3.3, ['편집기', 'Editor'], { cls: 'cz-t' });
  S.label('tx', { cls: 'cz-t dp-doc', x: 3, y: 5.5, w: 11 }, [[0, 'v1: 안녕'], [2, 'v2: 안녕하세요'], [4, 'v3: 안녕하세요!!!'], [6, 'v2: 안녕하세요']]);
  text(S, 'hl', 18, 1.4, ['스냅숏 보관함', 'snapshots'], { cls: 'cz-t' });
  [['v1', 1], ['v2', 3], ['v3', 5]].forEach(([v, st], i) => { cell(S, 's' + i, 18, 3 + i * 2.6, ['저장 ', 'saved '].map(p => p + v), { w: 9, h: 2.2, cls: 'cz-c db-t', s: hid(C.soft) }); S.set('s' + i, st, { opacity: '1' }); });
  fly(S, 'save', [15.2, 6], [18, 3 + 1.1], 1, '', C.cur);
  S.set('s1', 6, C.ok); fly(S, 'rest', [18, 3 + 2.6 + 1.1], [15.2, 6], 6, '', C.ok);
  S.cap(1, '상태를 스냅숏으로 저장해요', 'Save the state as a snapshot').cap(3, '변경할 때마다 보관', 'Keep one for every change').cap(6, '원하는 시점으로 되돌리기', 'Restore any earlier point')
    .cap(7, '내부 구조를 드러내지 않고 저장 · 게임 세이브, 상태 관리 툴', 'Saved without exposing internals · game saves, state devtools');
  return S;
}
function sObserver() {
  const S = scene({ id: 'dp-observer', steps: 6, per: 1.1 });
  box(S, 'sub', 1.5, 7.6, 9, 4.8, '', { s: C.soft }); text(S, 'st', 1.5, 8.4, ['채널 (Subject)', 'Channel (Subject)'], { w: 9, cls: 'cz-t cz-tc dp-b' }); text(S, 'sm', 1.5, 10.4, 'notify()', { w: 9, cls: 'cz-t cz-tc cz-mono' });
  const O = [['A', 3.4], ['B', 8.6], ['C', 13.8], ['D', 19]];
  O.forEach(([n, y], i) => { box(S, 'o' + i, 22, y - 1.4, 8.4, 2.8, ['구독자 ', 'Subscriber '].map(t => t + n), { s: i === 3 ? hid() : {} }); edge(S, 'e' + i, 10.5, 10, 22, y, { s: i === 3 ? hid() : { opacity: '.5' } }); });
  S.set('o3', 1, { opacity: '1' }).set('e3', 1, { opacity: '.5' });
  pill(S, 'nv', 1.5, 4.4, ['새 영상 업로드!', 'New video!'], { w: 9, h: 1.9, s: hid(C.warn) }); S.set('nv', 2, { opacity: '1' }).set('nv', 4, { opacity: '0' });
  O.forEach(([n, y], i) => { fly(S, 'n' + i, [10.5, 10], [21.6, y], 3, '!', C.cur, { r: .9 }); S.set('o' + i, 3, C.ok).set('o' + i, 4, C.idle); });
  S.set('o1', 5, { opacity: '.25' }).set('e1', 5, { opacity: '0' });
  [0, 2, 3].forEach(i => { fly(S, 'q' + i, [10.5, 10], [21.6, O[i][1]], 6, '!', C.cur, { r: .9 }); S.set('o' + i, 6, C.ok); });
  S.cap(0, '관심 있는 객체들이 구독해 둬요', 'Interested objects subscribe').cap(1, '구독자는 언제든 추가', 'Subscribers can join any time').cap(2, '상태가 바뀌면', 'When the state changes')
    .cap(3, '모든 구독자에게 알려요 · 서로 몰라도 돼요', 'everyone is notified; they need not know each other').cap(5, 'B가 구독을 끊으면', 'B unsubscribes').cap(6, '이제 B에겐 안 가요 · 이벤트 리스너, RxJS, 반응형 상태', 'and stops receiving · event listeners, RxJS, reactive state');
  return S;
}
function sState() {
  const S = scene({ id: 'dp-state', steps: 5, per: 1.3 });
  const ST = [['Draft', 4.5], ['Review', 16], ['Published', 27.5]];
  ST.forEach(([n, x], i) => { box(S, 's' + i, x - 4, 4, 8, 3.4, n, { cls: 'cz-box cz-bx cz-mono' }); if (i) arrow(S, 'a' + i, x - 7.3, 5.7, x - 4.2, 5.7); });
  S.set('s0', 0, C.soft);
  const call = (k, st, ok, lab) => { pill(S, k, 9, 11.2, 'doc.publish()', { w: 14, h: 2, cls: 'cz-pill cz-mono', s: hid(C.cur) }); S.set(k, st, { opacity: '1' }).set(k, st + 1, { opacity: '0' }); };
  call('p1', 1); S.set('s0', 2, C.idle).set('s1', 2, C.soft);
  call('p2', 3); S.set('s1', 4, C.idle).set('s2', 4, C.ok);
  S.label('r', { cls: 'cz-t cz-tc', x: 4, y: 14.4, w: 24 }, [[0, ''], [1, ['Draft: 검토 요청으로 바꿔요', 'Draft: sends for review']], [3, ['Review: 관리자면 게시해요', 'Review: publishes if admin']], [5, ['Published: 아무 일도 안 해요', 'Published: does nothing']]]);
  S.cap(0, '같은 메서드가 상태에 따라 다르게 동작해요', 'The same method behaves differently per state').cap(1, 'publish()를 부르면', 'Call publish()').cap(2, '초안 → 검토', 'Draft → Review').cap(4, '검토 → 게시', 'Review → Published')
    .cap(5, '거대한 if/switch 대신 상태 객체가 행동을 맡아요 · 주문·결제 흐름', 'State objects replace giant if/switch blocks · order and payment flows');
  return S;
}
function sStrategy() {
  const S = scene({ id: 'dp-strategy', steps: 4, per: 1.5 });
  node(S, 'A', 4, 15, 'A', { r: 1.3, s: C.cmp }); node(S, 'B', 28, 4, 'B', { r: 1.3, s: C.cmp });
  const path = (k, pts, st, col, keep) => { for (let i = 0; i < pts.length - 1; i++) { edge(S, k + i, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { h: .3, s: hid({ background: col }) }); S.set(k + i, st, { opacity: '1' }); if (!keep) S.set(k + i, st + 1, { opacity: '0' }); } };
  path('c', [[4, 15], [16, 15], [16, 4], [28, 4]], 1, 'var(--accent)');
  path('w', [[4, 15], [10, 11], [18, 9], [28, 4]], 2, 'var(--ok)');
  path('b', [[4, 15], [4, 9], [22, 9], [22, 4], [28, 4]], 3, 'var(--warn)', 1);
  S.label('st', { cls: 'cz-pill cz-mono', x: 8, y: 18, w: 16, h: 2, s: C.soft }, [[0, 'route(strategy)'], [1, 'CarStrategy'], [2, 'WalkStrategy'], [3, 'TransitStrategy'], [4, 'route(strategy)']]);
  S.cap(0, '같은 일을 하는 여러 방법(알고리즘)이 있을 때', 'When there are several ways to do the same job').cap(1, '자동차 전략', 'Car strategy').cap(2, '도보 전략으로 갈아끼우면 경로만 바뀌어요', 'Swap in walking: only the route changes')
    .cap(3, '호출하는 코드는 그대로', 'The calling code stays the same').cap(4, '정렬 비교 함수, 결제·할인 정책, 압축 방식 선택', 'Sort comparators, pricing rules, compression choices');
  return S;
}
function sTemplate() {
  const S = scene({ id: 'dp-template', steps: 5, per: 1.3 });
  const steps = [['boilWater()', 0], ['brew()', 1], ['pour()', 0], ['addExtras()', 1]];
  text(S, 'h', 2, 1.6, ['makeDrink() 템플릿', 'makeDrink() template'], { cls: 'cz-t dp-b' });
  steps.forEach(([t, ab], i) => cell(S, 'c' + i, 2, 3.4 + i * 3.6, t, { w: 11, h: 2.8, cls: 'cz-c db-t db-code', css: ab ? IF : '', s: ab ? C.cmp : {} }));
  S.label('tea', { cls: 'cz-t dp-b', x: 16, y: 1.6, w: 14 }, [[0, ''], [1, 'Tea'], [3, 'Coffee']]);
  const fills = { 1: [['티백 우리기', 'steep tea bag'], ['레몬 추가', 'add lemon']], 3: [['원두 내리기', 'drip coffee'], ['우유·설탕', 'milk & sugar']] };
  Object.entries(fills).forEach(([st, [a, b]], j) => { [[1, a], [3, b]].forEach(([row, t], i) => { cell(S, `f${j}${i}`, 16, 3.4 + row * 3.6, t, { w: 13, h: 2.8, cls: 'cz-c db-t', s: hid(j ? C.ok : C.soft) }); S.set(`f${j}${i}`, +st, { opacity: '1' }); if (!j) S.set(`f${j}${i}`, 3, { opacity: '0' }); }); });
  [0, 2].forEach(r => { text(S, 'same' + r, 16, 4.4 + r * 3.6, ['(공통 · 그대로)', '(shared, unchanged)'], { cls: 'cz-t', s: hid() }); S.set('same' + r, 1, { opacity: '1' }); });
  S.cap(0, '알고리즘의 뼈대는 부모가 정하고', 'The parent fixes the algorithm’s skeleton').cap(1, '바뀌는 단계만 자식이 채워요', 'Subclasses fill in only the varying steps')
    .cap(3, '커피도 같은 순서, 다른 내용', 'Coffee: same order, different content').cap(5, '프레임워크 훅(onCreate, setUp/tearDown)이 이 방식', 'Framework hooks like onCreate and setUp/tearDown work this way');
  return S;
}
function sVisitor() {
  const S = scene({ id: 'dp-visitor', steps: 6, per: 1.1 });
  const E = [['Circle', 4], ['Rect', 12.5], ['Text', 21]];
  E.forEach(([n, x], i) => box(S, 'e' + i, x, 4, 7, 3.4, n, { cls: 'cz-box cz-bx cz-mono' }));
  S.label('vn', { cls: 'cz-pill cz-mono', x: 9, y: 9.4, w: 14, h: 2, s: C.soft }, [[0, 'AreaVisitor'], [4, 'SvgExportVisitor']]);
  const out = [['78.5', '24', '0'], ['&lt;circle/&gt;', '&lt;rect/&gt;', '&lt;text/&gt;']];
  out.forEach((row, v) => row.forEach((t, i) => { cell(S, `o${v}${i}`, E[i][1], 13 + v * 3, t, { w: 7, h: 2.4, cls: 'cz-c db-t db-code', s: hid(v ? C.ok : C.cmp) }); const st = v * 3 + i + 1; S.set(`o${v}${i}`, st, { opacity: '1' }); S.set('e' + i, st, v ? C.ok : C.cmp).set('e' + i, st + 1 > 6 ? 6 : st + 1, C.idle); }));
  S.set('e2', 6, C.idle);
  S.cap(0, '데이터 구조는 그대로 두고 연산을 밖에서 추가해요', 'Add operations without changing the element classes').cap(1, '방문자가 원소를 돌며 넓이를 계산하고', 'A visitor walks the elements computing area')
    .cap(4, '새 연산(SVG 내보내기)은 방문자만 새로 만들면 돼요', 'A new operation (SVG export) is just a new visitor').cap(6, '컴파일러 AST 처리, 린터 규칙이 대표 예', 'Compiler AST passes and lint rules are the classic use');
  return S;
}
function sInterp() {
  const S = scene({ id: 'dp-interpreter', steps: 5, per: 1.3 });
  text(S, 'ex', 2, 1.4, '3 + 4 × 2', { cls: 'cz-t cz-mono db-big' });
  const N = { p: [16, 4.4, '+'], n3: [9, 10.4, '3'], m: [23, 10.4, '×'], n4: [18.5, 16.4, '4'], n2: [27.5, 16.4, '2'] };
  [['p', 'n3'], ['p', 'm'], ['m', 'n4'], ['m', 'n2']].forEach(([a, b]) => edge(S, 'e' + b, N[a][0], N[a][1], N[b][0], N[b][1]));
  Object.entries(N).forEach(([k, [x, y, l]]) => node(S, k, x, y, l, { r: 1.5 }));
  const val = (k, v, st) => { const leaf = k[0] === 'n'; pill(S, 'v' + k, leaf ? N[k][0] - 1.7 : N[k][0] + 1.8, leaf ? N[k][1] + 1.8 : N[k][1] - 2.4, v, { w: 3.4, h: 1.6, cls: 'cz-pill cz-mono', s: hid(C.ok) }); S.set('v' + k, st, { opacity: '1' }); };
  ['n3', 'n4', 'n2'].forEach(k => { S.set(k, 1, C.soft); val(k, N[k][2], 1); });
  S.set('m', 2, C.ok); val('m', '8', 2); S.set('p', 3, C.ok); val('p', '11', 3);
  S.cap(0, '문법을 클래스 트리로 표현해요', 'Represent a grammar as a tree of classes').cap(1, '숫자 노드는 자기 값을', 'Number nodes return themselves').cap(2, '연산 노드는 자식을 계산해 합쳐요', 'Operator nodes evaluate their children')
    .cap(3, '루트에서 결과가 나와요 = 11', 'The root yields the result: 11').cap(5, '정규식 엔진, SQL 파서, 수식 계산기, 템플릿 엔진', 'Regex engines, SQL parsers, calculators, template engines');
  return S;
}

/* ---------- architecture ---------- */
function sMVC() {
  const S = scene({ id: 'dp-mvc', steps: 5, per: 1.25 });
  const V = [5, 15], Cc = [27, 15], M = [16, 4];
  box(S, 'v', V[0] - 4, V[1] - 2, 8, 4, 'View'); box(S, 'c', Cc[0] - 4, Cc[1] - 2, 8, 4, 'Controller'); box(S, 'm', M[0] - 4, M[1] - 2, 8, 4, 'Model');
  arrow(S, 'vc', 9.2, 15, 22.8, 15); arrow(S, 'cm', 24, 12.8, 19, 6.2); arrow(S, 'mv', 13, 6.2, 8, 12.8);
  text(S, 't1', 12, 15.5, ['클릭', 'click'], { cls: 'cz-t' }); text(S, 't2', 22.6, 8.4, ['변경', 'update'], { cls: 'cz-t' }); text(S, 't3', 6.6, 8.4, ['새 데이터', 'new data'], { cls: 'cz-t' });
  fly(S, 'a', [9.2, 13.8], [22.8, 13.8], 1, '', C.cur); S.set('c', 2, C.soft).set('c', 3, C.idle);
  fly(S, 'b', [23.4, 11.6], [19.4, 5.6], 2, '', C.cur); S.set('m', 3, C.soft).set('m', 4, C.idle);
  fly(S, 'd', [12.4, 5.8], [8.4, 11.8], 3, '', C.ok); S.set('v', 4, C.ok);
  S.cap(0, '화면, 데이터, 흐름 제어를 나눠요', 'Separate screen, data and control flow').cap(1, '사용자 입력은 컨트롤러로', 'User input goes to the controller').cap(2, '컨트롤러가 모델을 바꾸고', 'which updates the model')
    .cap(3, '뷰는 모델의 새 데이터로 다시 그려요', 'and the view re-renders from it').cap(5, 'Spring MVC, Rails, Django(MTV)의 기본 구조', 'The basis of Spring MVC, Rails and Django');
  return S;
}
function sMVVM() {
  const S = scene({ id: 'dp-mvvm', steps: 5, per: 1.2 });
  box(S, 'v', 1.5, 3, 11, 13, '', {}); text(S, 'vt', 2.2, 3.4, 'View', { cls: 'cz-t dp-b' });
  S.el('in', { x: 2.5, y: 6, w: 9, h: 2.4, css: 'border-radius:.4em;border:.12em solid var(--line)', s: { background: 'var(--ui)' } });
  S.label('iv', { cls: 'cz-t cz-mono', x: 3.1, y: 6.6, w: 8 }, [[0, 'Ki'], [1, 'Kim'], [2, 'Kim'], [4, 'Lee']]);
  S.label('lb', { cls: 'cz-t dp-b', x: 2.5, y: 10, w: 9 }, [[0, ['안녕, Ki', 'Hi, Ki']], [2, ['안녕, Kim', 'Hi, Kim']], [4, ['안녕, Lee', 'Hi, Lee']]]);
  box(S, 'vm', 16, 6, 9, 6.4, '', { s: C.soft }); text(S, 'vmt', 16.6, 6.4, 'ViewModel', { cls: 'cz-t dp-b' });
  S.label('vmv', { cls: 'cz-t cz-mono', x: 16.6, y: 8.8, w: 8 }, [[0, "name = 'Ki'"], [1, "name = 'Kim'"], [4, "name = 'Lee'"]]);
  box(S, 'md', 27, 7.2, 4, 4, 'Model', {});
  arrow(S, 'b1', 12.6, 8, 15.8, 8, { s: { opacity: '.6' } }); arrow(S, 'b2', 15.8, 10.4, 12.6, 10.4, { s: { opacity: '.6' } });
  text(S, 'bl', 12.4, 12, ['양방향 바인딩', 'two-way binding'], { cls: 'cz-t' });
  S.set('in', 1, C.soft).set('in', 2, C.idle).set('vm', 1, C.cmp).set('vm', 2, C.soft).set('vm', 4, C.cmp).set('vm', 5, C.soft);
  pill(S, 'srv', 18, 14.6, ['서버 응답: Lee', 'server: Lee'], { w: 9, h: 1.9, s: hid(C.ok) }); S.set('srv', 3, { opacity: '1' }).set('srv', 5, { opacity: '0' });
  S.cap(1, '입력하면 뷰모델 값이 자동으로 바뀌고', 'Typing updates the view-model automatically').cap(2, '그 값을 쓰는 화면도 자동 갱신', 'and everything bound to it re-renders')
    .cap(3, '코드에서 값을 바꿔도', 'Change the value from code').cap(4, '화면이 따라와요 · DOM을 직접 만지지 않아요', 'and the screen follows: no manual DOM work').cap(5, 'Vue, SwiftUI, Jetpack Compose, WPF', 'Vue, SwiftUI, Jetpack Compose, WPF');
  return S;
}
function sDI() {
  const S = scene({ id: 'dp-di', steps: 5, per: 1.3 });
  box(S, 'us', 9, 2, 14, 6.4, '', {}); text(S, 'ust', 9.8, 2.4, 'SignupService', { cls: 'cz-t cz-mono dp-b' });
  S.label('code', { cls: 'cz-t cz-mono', x: 9.8, y: 4.6, w: 13 }, [[0, 'mail = new SmtpMail()'], [2, 'constructor(mail: Mailer)']]);
  S.set('us', 1, C.bad).set('us', 2, C.idle);
  text(S, 'n1', 9, 9, ['직접 만들면 바꿀 수 없어요 · 테스트 때 진짜 메일이 나가요', 'Hard-wired: tests send real email'], { cls: 'cz-t', s: hid() }); S.set('n1', 1, { opacity: '1' }).set('n1', 2, { opacity: '0' });
  box(S, 'ct', 1.5, 12.6, 9, 4, ['DI 컨테이너', 'DI container'], { s: hid(C.soft) }); S.set('ct', 2, { opacity: '1' });
  box(S, 'sm', 13, 12.6, 8, 3.2, 'SmtpMail', { cls: 'cz-box cz-bx cz-mono', s: hid() }); box(S, 'mm', 23, 12.6, 8, 3.2, 'FakeMail', { cls: 'cz-box cz-bx cz-mono', s: hid(C.ok) });
  S.set('sm', 2, { opacity: '1' }).set('mm', 4, { opacity: '1' });
  fly(S, 'i1', [17, 12.4], [16, 8.6], 3, '', C.cur); fly(S, 'i2', [27, 12.4], [16, 8.6], 4, '', C.ok);
  S.label('env', { cls: 'cz-t', x: 13, y: 17.2, w: 18 }, [[0, ''], [3, ['운영: 진짜 메일 주입', 'prod: inject real mail']], [4, ['테스트: 가짜 메일 주입', 'test: inject fake mail']]]);
  S.cap(1, '필요한 객체를 안에서 직접 만들면', 'Creating dependencies inside').cap(2, '밖에서 넣어 주게 바꿔요 (생성자 주입)', 'Instead, receive them from outside (constructor injection)')
    .cap(3, '컨테이너가 알맞은 구현을 넣어 줘요', 'The container supplies an implementation').cap(4, '테스트에선 가짜로 바꿔 끼워요', 'Tests plug in a fake').cap(5, 'Spring, NestJS, Angular, Dagger/Hilt', 'Spring, NestJS, Angular, Dagger/Hilt');
  return S;
}
function sLayered() {
  const S = scene({ id: 'dp-layered', steps: 5, per: 1.3 });
  const R = [['ui', 9.4, ['UI · 웹·앱', 'UI · web, app'], 'var(--line)'], ['app', 7, ['애플리케이션 (유스케이스)', 'Application (use cases)'], 'var(--warn-soft)'], ['dom', 4.4, ['도메인 (규칙)', 'Domain (rules)'], 'var(--accent-soft)']];
  R.forEach(([k, r, l, bg], i) => { S.el(k, { x: 16 - r, y: 10.4 - r * .95, w: r * 2, h: r * 1.9, css: `border-radius:50%;border:.14em solid var(--line);background:${bg}`, s: { opacity: '0', transform: 'scale(.6)' } }); S.set(k, i + 1, { opacity: '1', transform: 'none' }); text(S, k + 'l', 16 - 7, 10.4 - r * .95 + .5, l, { w: 14, cls: 'cz-t cz-tc dp-b', s: hid() }); S.set(k + 'l', i + 1, { opacity: '1' }); });
  text(S, 'db', 23.6, 17.6, 'DB · API', { cls: 'cz-t dp-b', s: hid() }); S.set('db', 1, { opacity: '1' });
  [[3, 4], [29, 4], [3, 17], [29, 17]].forEach(([x, y], i) => { const L = Math.hypot(16 - x, 10.4 - y); arrow(S, 'a' + i, x, y, x + (16 - x) * 6.5 / L, y + (10.4 - y) * 6.5 / L, { s: hid(AR.acc) }); S.set('a' + i, 4, { opacity: '1' }); });
  S.cap(1, '바깥: 화면·DB 같은 자주 바뀌는 기술', 'Outside: UI and DB, the parts that change often').cap(2, '가운데: 기능 흐름', 'Middle: the use-case flow').cap(3, '중심: 핵심 비즈니스 규칙', 'Core: business rules')
    .cap(4, '의존성은 항상 안쪽으로만 · 안쪽은 바깥을 몰라요', 'Dependencies point inward only; the core knows nothing outside').cap(5, '프레임워크·DB를 바꿔도 핵심이 안전 (클린·헥사고날 아키텍처)', 'Swap frameworks or DBs safely: clean/hexagonal architecture');
  return S;
}
function sRepo() {
  const S = scene({ id: 'dp-repo', steps: 5, per: 1.3 });
  box(S, 'svc', 1.5, 8, 8.6, 4, ['도메인 코드', 'Domain code'], {});
  text(S, 'call', 1.5, 12.6, 'repo.findById(7)', { w: 8.6, cls: 'cz-t cz-tc cz-mono' });
  box(S, 'rp', 13, 7.4, 7.6, 5.2, '', { css: IF, s: C.soft }); text(S, 'rpt', 13, 8.6, '«interface»', { w: 7.6, cls: 'cz-t cz-tc cz-mono' }); text(S, 'rpn', 13, 10.2, 'UserRepository', { w: 7.6, cls: 'cz-t cz-tc cz-mono dp-b' });
  const B = [['SQL (JPA)', 2.6, C.cmp], ['MongoDB', 8.4, C.ok], ['REST API', 14.2, C.soft]];
  B.forEach(([n, y, st], i) => { box(S, 'b' + i, 23.6, y, 7.4, 3, n, { cls: 'cz-box cz-bx cz-mono dp-xs', s: { opacity: '.35' } }); });
  fly(S, 'q', [10.4, 10], [12.8, 10], 1, '', C.cur);
  const route = (st, i) => { S.set('b' + i, st, Object.assign({ opacity: '1' }, B[i][2])); if (st > 2) S.set('b' + (i - 1), st, { opacity: '.35', background: 'var(--ui)', 'border-color': 'var(--line)' }); fly(S, 'r' + i, [20.8, 10], [23.4, B[i][1] + 1.5], st, '', C.cur); };
  route(2, 0); route(3, 1); route(4, 2);
  S.cap(1, '도메인은 "7번 사용자 줘"라고만 해요', 'The domain just asks for user 7').cap(2, '저장 방식은 리포지토리 구현이 숨겨요', 'The repository implementation hides storage details')
    .cap(3, 'DB를 바꿔도', 'Switch the database').cap(4, '도메인 코드는 그대로', 'and the domain code is unchanged').cap(5, 'Spring Data, Prisma처럼 자동 생성되기도 해요', 'Often generated for you: Spring Data, Prisma');
  return S;
}

window.UX = page([
  sec('dp-solid', 'SOLID', 'SOLID', 'SOLID 객체지향 설계 원칙', 'SOLID design principles',
    '바뀌기 쉬운 코드를 만드는 다섯 가지 원칙이에요.', 'Five principles for code that is easy to change.', [
    item('dp-srp', '단일 책임 원칙 (SRP)', 'Single responsibility', '클래스는 바뀌어야 할 이유가 하나여야 해요. 여러 일을 한 클래스에 몰면 한 가지 변경이 전체에 영향을 줘요.', '"그리고"가 들어가는 클래스 설명(저장하고 메일 보내고…)은 나눌 신호예요. 너무 잘게 쪼개 파일만 늘리는 것도 피하세요.', 'A class should have one reason to change; piling jobs into one class makes every change risky.', 'If describing a class needs “and” (saves and emails and…), split it, but don’t shred code into needless files either.', sSRP()),
    item('dp-ocp', '개방-폐쇄 원칙 (OCP)', 'Open–closed', '새 기능은 기존 코드를 고치지 않고 확장(새 클래스 추가)으로 넣을 수 있게 만들어요.', '타입별 if/switch가 여러 곳에 반복되면 인터페이스와 다형성으로 바꿀 때예요. 플러그인 구조가 대표적이에요.', 'New behaviour should be added by extension, such as a new class, without editing existing code.', 'When type-based if/switch blocks repeat across the code, move to interfaces and polymorphism. Plugin systems are the classic case.', sOCP()),
    item('dp-lsp', '리스코프 치환 원칙 (LSP)', 'Liskov substitution', '자식 클래스는 부모 클래스를 대신 써도 프로그램이 똑같이 올바르게 동작해야 해요.', '"정사각형은 직사각형이다"처럼 현실의 is-a가 코드에선 깨질 수 있어요. 오버라이드에서 예외를 던지거나 조건을 바꾸면 위반이에요.', 'A subclass must be usable anywhere its parent is, without breaking correctness.', 'A real-world is-a (“a square is a rectangle”) can break in code. Overrides that throw or change the rules violate it.', sLSP()),
    item('dp-isp', '인터페이스 분리 원칙 (ISP)', 'Interface segregation', '쓰지 않는 메서드에 의존하지 않도록 큰 인터페이스를 역할별로 작게 나눠요.', '구현 클래스에 "지원 안 함" 예외가 보이면 인터페이스가 너무 큰 거예요.', 'Split fat interfaces by role so no class depends on methods it doesn’t use.', 'If implementations throw “not supported”, the interface is too big.', sISP()),
    item('dp-dip', '의존성 역전 원칙 (DIP)', 'Dependency inversion', '중요한 비즈니스 로직이 DB·외부 API 같은 세부 구현에 직접 의존하지 않고, 둘 다 인터페이스에 의존하게 해요.', '테스트에서 가짜 구현으로 바꿔 끼울 수 있어요. DI(의존성 주입)는 이 원칙을 실현하는 도구예요.', 'Core business logic should not depend directly on details like databases or APIs; both depend on an abstraction.', 'It lets tests swap in fakes. Dependency injection is the tool that makes it practical.', sDIP())
  ]),
  sec('dp-create', '생성', 'Creational', '생성 패턴', 'Creational patterns',
    '객체를 어떻게 만들지를 감추고 유연하게 해요.', 'Hide and flex how objects are created.', [
    item('dp-singleton', '싱글톤', 'Singleton', '클래스의 인스턴스를 딱 하나만 만들고, 어디서든 그 하나를 쓰게 해요.', '전역 상태가 되어 테스트와 동시성 문제를 만들기 쉬워요. 요즘은 DI 컨테이너가 싱글톤 범위로 관리하게 하는 걸 권해요.', 'Ensures a class has exactly one instance, shared everywhere.', 'It becomes global state that complicates tests and concurrency; prefer letting a DI container manage singleton scope.', sSingleton()),
    item('dp-factory', '팩토리 메서드', 'Factory method', '어떤 클래스의 객체를 만들지 결정하는 일을 별도 메서드(팩토리)에 맡겨요. 클라이언트는 구체 클래스를 몰라도 돼요.', '설정·입력값에 따라 다른 구현을 골라야 할 때 써요. 생성 로직이 여기저기 흩어지는 걸 막아요.', 'Delegates the choice of which class to instantiate to a factory method, so clients don’t know concrete classes.', 'Useful when config or input picks the implementation; it keeps creation logic from scattering.', sFactory()),
    item('dp-absfactory', '추상 팩토리', 'Abstract factory', '서로 어울리는 객체 묶음(가족)을 한 번에 만드는 팩토리예요. 팩토리를 바꾸면 묶음 전체가 바뀌어요.', '테마, OS별 UI 위젯, DB별 드라이버 묶음처럼 섞이면 안 되는 조합에 써요.', 'A factory that creates a whole family of matching objects; switching the factory switches the family.', 'Used for themes, per-OS widgets or per-database driver sets that must not be mixed.', sAbsF()),
    item('dp-builder', '빌더', 'Builder', '선택 항목이 많은 복잡한 객체를 단계별로 조립하고, 마지막에 build()로 완성해요.', '생성자 인자가 많을 때 읽기 쉽고 실수가 줄어요. 불변 객체를 만들 때 특히 좋아요.', 'Builds a complex object with many options step by step, finishing with build().', 'Much clearer than long constructors and great for immutable objects.', sBuilder()),
    item('dp-prototype', '프로토타입', 'Prototype', '새로 만드는 대신 기존 객체를 복제(clone)해서 조금 고쳐 써요.', '생성 비용이 크거나 설정이 복잡한 객체에 유용해요. 얕은 복사와 깊은 복사의 차이를 꼭 확인하세요.', 'Create new objects by cloning an existing one and tweaking it.', 'Handy when construction is costly or configuration complex. Always check shallow versus deep copy.', sProto())
  ]),
  sec('dp-struct', '구조', 'Structural', '구조 패턴', 'Structural patterns',
    '클래스와 객체를 조합해 더 큰 구조를 만드는 방법이에요.', 'Ways to compose classes and objects into larger structures.', [
    item('dp-adapter', '어댑터', 'Adapter', '맞지 않는 인터페이스 사이에 변환기를 둬서 함께 동작하게 해요.', '외부 라이브러리·레거시 시스템 연동에 써요. 외부 API를 어댑터 뒤에 두면 교체도 쉬워져요.', 'A converter between incompatible interfaces so they can work together.', 'Used for third-party and legacy integration; hiding external APIs behind adapters also makes them replaceable.', sAdapter()),
    item('dp-bridge', '브리지', 'Bridge', '기능 계층과 구현 계층을 분리하고 "가지는" 관계로 연결해, 두 축이 따로 늘어날 수 있게 해요.', '도형×색, 리모컨×기기처럼 조합이 폭발할 때 써요. 상속보다 조합을 선택하는 대표 예예요.', 'Separates an abstraction from its implementation and links them by composition so each can vary independently.', 'Use it when combinations explode (shape × color, remote × device): a textbook case of composition over inheritance.', sBridge()),
    item('dp-composite', '컴포지트', 'Composite', '개별 객체와 객체 묶음을 같은 인터페이스로 다뤄 트리 구조를 재귀적으로 처리해요.', '파일 시스템, UI 컴포넌트 트리, 조직도, 메뉴처럼 부분-전체 구조에 써요.', 'Treats single objects and groups through the same interface, so trees are handled recursively.', 'Used for part–whole structures: file systems, UI component trees, org charts and menus.', sComposite()),
    item('dp-decorator', '데코레이터', 'Decorator', '같은 인터페이스를 가진 객체로 감싸서 기존 객체에 기능을 덧붙여요. 여러 겹으로 감쌀 수 있어요.', '자바 I/O 스트림, 파이썬 @데코레이터, 웹 미들웨어가 같은 아이디어예요. 상속 없이 조합으로 확장해요.', 'Wraps an object in another with the same interface to add behaviour; wrappers can be stacked.', 'Java I/O streams, Python decorators and web middleware share the idea: extension by composition.', sDecorator()),
    item('dp-facade', '파사드', 'Facade', '복잡한 하위 시스템 앞에 간단한 창구 하나를 둬서 쓰기 쉽게 해요.', '서비스 레이어나 SDK가 파사드 역할을 해요. 너무 커지면 모든 걸 아는 "신 객체"가 되니 조심하세요.', 'Puts one simple entry point in front of a complex subsystem.', 'Service layers and SDKs act as facades. Watch that it doesn’t grow into an all-knowing god object.', sFacade()),
    item('dp-flyweight', '플라이웨이트', 'Flyweight', '변하지 않는 무거운 데이터를 여러 객체가 공유하고, 객체마다 다른 값만 따로 가져서 메모리를 아껴요.', '게임의 나무·총알, 글꼴 글리프, 문자열 인터닝에 써요. 공유 데이터는 반드시 불변이어야 해요.', 'Many objects share heavy immutable data and keep only their varying state, saving memory.', 'Used for game trees and bullets, font glyphs and string interning. The shared part must be immutable.', sFlyweight()),
    item('dp-proxy', '프록시', 'Proxy', '진짜 객체 앞에 같은 모양의 대리 객체를 둬서 지연 로딩, 캐싱, 접근 제어 같은 일을 대신해요.', 'JPA·Hibernate의 지연 로딩 엔티티, Nginx 리버스 프록시, 자바스크립트 Proxy가 모두 이 패턴이에요.', 'A stand-in with the same interface that adds lazy loading, caching or access control in front of the real object.', 'ORM lazy-loaded entities, reverse proxies like Nginx and JavaScript’s Proxy all follow it.', sProxy())
  ]),
  sec('dp-behav', '행위', 'Behavioral', '행위 패턴', 'Behavioral patterns',
    '객체끼리 책임을 나누고 소통하는 방법이에요.', 'How objects divide responsibilities and communicate.', [
    item('dp-chain', '책임 연쇄', 'Chain of responsibility', '요청을 처리기 사슬에 흘려보내고, 각 처리기는 처리하거나 다음으로 넘기거나 중단해요.', '웹 프레임워크의 미들웨어·필터, DOM 이벤트 버블링이 대표 예예요. 순서가 결과를 바꾸니 주의하세요.', 'Passes a request along a chain of handlers; each one handles it, forwards it or stops it.', 'Web middleware and filters and DOM event bubbling are classic examples. Order matters.', sChain()),
    item('dp-command', '커맨드', 'Command', '동작 자체를 객체로 만들어 실행·저장·취소·재실행할 수 있게 해요.', '실행 취소/다시 실행, 작업 큐, 매크로 녹화, 트랜잭션 로그에 써요.', 'Turns an action into an object that can be executed, stored, undone and redone.', 'Used for undo/redo, job queues, macro recording and transaction logs.', sCommand()),
    item('dp-iterator', '이터레이터', 'Iterator', '컬렉션의 내부 구조를 드러내지 않고 원소를 하나씩 차례로 꺼내는 방법을 제공해요.', 'for…of, 파이썬 제너레이터, 자바 스트림이 이 패턴이에요. 지연 평가로 큰 데이터도 조금씩 처리해요.', 'Provides a way to visit elements one by one without exposing the collection’s structure.', 'for…of, Python generators and Java streams follow it, and lazy iteration handles huge data piece by piece.', sIterator()),
    item('dp-mediator', '중재자', 'Mediator', '객체들이 서로 직접 소통하지 않고 중재자를 통해서만 이야기하게 해서 얽힘을 줄여요.', '채팅방 서버, 복잡한 폼 필드 간 연동, 항공 관제가 예예요. 중재자가 너무 커지지 않게 주의하세요.', 'Objects talk only through a mediator instead of to each other, cutting the tangle of links.', 'Chat servers, interdependent form fields and air traffic control are examples. Keep the mediator from bloating.', sMediator()),
    item('dp-memento', '메멘토', 'Memento', '객체의 상태를 캡슐화를 깨지 않고 스냅숏으로 저장했다가 나중에 그대로 되돌려요.', '게임 세이브, 편집기 되돌리기, Redux DevTools의 시간 여행 디버깅이 같은 원리예요. 스냅숏이 많으면 메모리를 신경 쓰세요.', 'Saves an object’s state as a snapshot, without breaking encapsulation, and restores it later.', 'Game saves, editor undo and time-travel debugging work like this. Many snapshots cost memory.', sMemento()),
    item('dp-observer', '옵저버', 'Observer', '한 객체의 상태가 바뀌면 그 객체를 구독한 모든 객체에게 자동으로 알려 줘요.', '이벤트 리스너, RxJS, 반응형 UI 상태, 메시지 구독이 모두 이 패턴이에요. 구독 해제를 안 하면 메모리 누수가 생겨요.', 'When one object changes, every object subscribed to it is notified automatically.', 'Event listeners, RxJS, reactive UI state and pub/sub messaging all use it. Forgetting to unsubscribe leaks memory.', sObserver()),
    item('dp-state', '상태', 'State', '객체의 상태를 별도 객체로 만들어, 같은 메서드라도 현재 상태에 따라 다르게 동작하게 해요.', '주문(결제 대기→배송→완료), 문서 결재처럼 상태 전이가 있는 곳의 거대한 switch문을 없애요.', 'Represents each state as its own object so the same method behaves differently in each state.', 'It removes giant switch statements from workflows with state transitions, like orders or approvals.', sState()),
    item('dp-strategy', '전략', 'Strategy', '같은 목적의 여러 알고리즘을 각각 객체로 만들어, 실행 중에 갈아끼울 수 있게 해요.', '정렬 기준, 할인 정책, 경로 탐색 방식, 결제 수단 선택에 써요. 함수를 값으로 넘기는 것도 전략 패턴이에요.', 'Wraps interchangeable algorithms in objects so they can be swapped at runtime.', 'Used for sort orders, discount rules, routing modes and payment choices. Passing a function as a value is the same idea.', sStrategy()),
    item('dp-template', '템플릿 메서드', 'Template method', '알고리즘의 순서(뼈대)는 부모 클래스가 정하고, 달라지는 단계만 자식 클래스가 구현해요.', '프레임워크의 생명주기 훅(onCreate, setUp/tearDown)이 이 방식이에요. 상속을 강제하니 전략 패턴과 비교해 고르세요.', 'The parent class fixes the algorithm’s steps and subclasses implement only the parts that vary.', 'Framework lifecycle hooks (onCreate, setUp/tearDown) work like this. It forces inheritance, so weigh it against Strategy.', sTemplate()),
    item('dp-visitor', '비지터', 'Visitor', '데이터 구조의 클래스는 그대로 두고, 그 구조를 도는 방문자 객체로 새로운 연산을 추가해요.', '컴파일러의 AST 처리, 린터·코드 변환기(Babel 플러그인)가 대표 예예요. 원소 종류가 자주 늘면 불리해요.', 'Adds new operations as visitor objects that walk a structure, leaving the element classes untouched.', 'Compiler AST passes, linters and code transformers (Babel plugins) are the classic users. It suits stable element types.', sVisitor()),
    item('dp-interpreter', '인터프리터', 'Interpreter', '간단한 언어의 문법 규칙을 클래스로 표현하고, 문장을 트리로 만들어 재귀적으로 해석해요.', '정규식, SQL·수식 파서, 템플릿 엔진, 규칙 엔진의 기초예요. 문법이 커지면 파서 생성기를 쓰세요.', 'Represents grammar rules of a small language as classes and evaluates sentences as trees, recursively.', 'Underlies regex engines, SQL and expression parsers, template and rule engines. For big grammars use a parser generator.', sInterp())
  ]),
  sec('dp-arch', '아키텍처', 'Architecture', '아키텍처 패턴', 'Architectural patterns',
    '애플리케이션 전체를 나누고 연결하는 큰 틀이에요.', 'The big shapes for splitting and connecting a whole application.', [
    item('dp-mvc', 'MVC', 'MVC · Model–View–Controller', '화면(View), 데이터와 규칙(Model), 입력 처리(Controller)를 나눠 서로의 변경 영향을 줄여요.', '대부분의 서버 웹 프레임워크가 이 구조예요. 컨트롤러에 로직이 몰리는 "뚱뚱한 컨트롤러"를 조심하세요.', 'Splits the screen (View), data and rules (Model) and input handling (Controller) to limit how changes spread.', 'Most server-side web frameworks use it. Watch out for fat controllers that swallow all the logic.', sMVC()),
    item('dp-mvvm', 'MVVM', 'MVVM · Model–View–ViewModel', '뷰모델의 상태와 화면을 데이터 바인딩으로 연결해, 값이 바뀌면 화면이 자동으로 따라오게 해요.', 'Vue, SwiftUI, Jetpack Compose, WPF가 이 방식이에요. UI 로직을 뷰모델에서 테스트할 수 있어요.', 'Binds a view-model’s state to the screen so the UI updates automatically when values change.', 'Vue, SwiftUI, Jetpack Compose and WPF work this way, and UI logic becomes testable in the view-model.', sMVVM()),
    item('dp-di', '의존성 주입 (DI)', 'Dependency injection', '객체가 필요한 의존 객체를 직접 만들지 않고 생성자 등을 통해 밖에서 받아요.', '설정만으로 구현을 바꾸고, 테스트에서 가짜를 넣을 수 있어요. Spring, NestJS, Angular, Hilt가 컨테이너를 제공해요.', 'Objects receive their dependencies from outside (e.g. through the constructor) instead of creating them.', 'Implementations can be swapped by configuration and faked in tests. Spring, NestJS, Angular and Hilt provide containers.', sDI()),
    item('dp-layered', '레이어드·클린 아키텍처', 'Layered · Clean architecture', '핵심 비즈니스 규칙을 중심에 두고, UI·DB 같은 바깥 기술이 안쪽을 의존하게 해요. 안쪽은 바깥을 몰라요.', '프레임워크나 DB를 바꿔도 핵심 로직이 안전하고 테스트가 쉬워요. 작은 프로젝트에 과하게 적용하면 파일만 늘어나요.', 'Keeps business rules at the centre and makes outer technologies like UI and databases depend inward, never the reverse.', 'Frameworks and databases can change without touching the core, and tests get easy. Overkill for small projects.', sLayered()),
    item('dp-repo', '리포지토리', 'Repository', '데이터 저장·조회를 컬렉션처럼 다루는 인터페이스 뒤에 숨겨서, 도메인 코드가 저장 방식을 모르게 해요.', 'Spring Data, Prisma, TypeORM이 자동으로 만들어 줘요. 쿼리 성능 문제는 숨겨질 뿐 사라지지 않으니 주의하세요.', 'Hides storage behind a collection-like interface so domain code never knows how data is stored.', 'Spring Data, Prisma and TypeORM generate them. Query performance issues are hidden, not removed.', sRepo())
  ])
]);
window.UX[0].css += `
.os-lg .in{font-size:.9em;font-weight:700;color:var(--ink)}
.db-t .in{font-size:.66em;font-weight:600}
.db-code{place-items:center start!important;padding-left:.7em}
.db-code .in{font-family:var(--f-mono);font-size:.62em}
.db-big .in{font-size:1.15em;font-weight:800;color:var(--ink)}
.dp-b .in{font-weight:800;color:var(--ink);font-size:.78em}
.dp-t .in{font-size:.7em}
.dp-xs .in{font-size:.56em}
.dp-doc .in{font-size:.95em;color:var(--ink);font-weight:600}
.dp-ui{font-weight:700}
.dp-ui .in{font-size:.8em}`;
})();
