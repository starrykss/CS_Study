(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c dm-m' + (o.cls ? ' ' + o.cls : ''), s: st });
const svg = (vb, inner) => `<svg viewBox="${vb}" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">${inner}</svg>`;

/* ---------- sets & logic ---------- */
function sVenn() {
  const S = scene({ id: 'dm-venn', steps: 5, per: 1.3 });
  const X = 4, Y = 1.4, W = 24, H = 16, vb = '0 0 240 160';
  const reg = { a: 'M120,31 A55,55 0 1,0 120,129 A55,55 0 0,1 120,31 Z', b: 'M120,31 A55,55 0 1,1 120,129 A55,55 0 0,0 120,31 Z', ab: 'M120,31 A55,55 0 0,1 120,129 A55,55 0 0,1 120,31 Z' };
  Object.entries(reg).forEach(([k, d]) => S.el('r' + k, { x: X, y: Y, w: W, h: H, html: svg(vb, `<path d="${d}" style="fill:var(--accent);fill-opacity:.55"/>`), s: { opacity: '0' } }));
  S.el('ol', { x: X, y: Y, w: W, h: H, html: svg(vb, '<rect x="2" y="2" width="236" height="156" rx="10" style="fill:none;stroke:var(--line);stroke-width:1.5"/><circle cx="95" cy="80" r="55" style="fill:none;stroke:var(--ink-2);stroke-width:2"/><circle cx="145" cy="80" r="55" style="fill:none;stroke:var(--ink-2);stroke-width:2"/>') });
  text(S, 'la', X + 3.4, Y + 1.6, 'A', { cls: 'cz-t dm-big' }); text(S, 'lb', X + W - 5, Y + 1.6, 'B', { cls: 'cz-t dm-big' });
  const on = { 1: ['a', 'b', 'ab'], 2: ['ab'], 3: ['a'], 4: ['a', 'b'] };
  for (let st = 1; st <= 4; st++) ['a', 'b', 'ab'].forEach(k => S.set('r' + k, st, { opacity: on[st].includes(k) ? '1' : '0' }));
  S.label('op', { cls: 'cz-pill cz-mono', x: 10, y: 18.2, w: 12, h: 2, s: C.soft }, [[0, 'A, B'], [1, 'A ∪ B'], [2, 'A ∩ B'], [3, 'A − B'], [4, 'A △ B']]);
  S.cap(1, '합집합: 둘 중 하나에라도', 'Union: in either set').cap(2, '교집합: 둘 다에', 'Intersection: in both').cap(3, '차집합: A에만', 'Difference: only in A').cap(4, '대칭차: 한쪽에만 (XOR)', 'Symmetric difference: in exactly one')
    .cap(5, 'SQL의 UNION·INTERSECT·EXCEPT, Set 자료구조가 그대로 이 연산', 'SQL UNION/INTERSECT/EXCEPT and Set types are exactly these');
  return S;
}
function sLogic() {
  const S = scene({ id: 'dm-logic', steps: 5, per: 1.3 });
  text(S, 'ex', 1.2, 1, ['p: 비가 온다   q: 우산을 쓴다', 'p: it rains   q: I take an umbrella'], { cls: 'cz-t dm-b' });
  const H = ['p', 'q', 'p → q'], R = [['T', 'T', 'T'], ['T', 'F', 'F'], ['F', 'T', 'T'], ['F', 'F', 'T']];
  H.forEach((h, j) => chip(S, 'h' + j, 2 + j * 7.6, 3, 7.2, h, { background: 'var(--line)' }, { h: 2.4 }));
  R.forEach((row, i) => { row.forEach((v, j) => chip(S, `c${i}_${j}`, 2 + j * 7.6, 6 + i * 2.9, 7.2, v, hid(j === 2 ? (v === 'T' ? C.ok : C.bad) : {}), { h: 2.4 })); row.forEach((_, j) => S.set(`c${i}_${j}`, i + 1, { opacity: '1' })); });
  S.label('n', { cls: 'cz-t', x: 25, y: 6.4, w: 7 }, [[0, ''], [2, ['약속을 어김 ✗', 'promise broken ✗']], [3, ['비가 안 오면', 'if it doesn’t rain,']], [4, ['약속은 지켜진 것', 'it’s not broken']]]);
  S.cap(1, '"비가 오면 우산을 쓴다"', '“If it rains, I take an umbrella”').cap(2, '거짓은 오직 비가 오는데 우산이 없을 때', 'False only when it rains and there is no umbrella')
    .cap(4, '전제가 거짓이면 함의는 참 (공허한 참)', 'A false premise makes the implication true (vacuous truth)').cap(5, '"p이면 q" ≡ "q가 아니면 p도 아니다" (대우)', '“p implies q” ≡ “not q implies not p” (contrapositive)');
  return S;
}
function sQuant() {
  const S = scene({ id: 'dm-quant', steps: 6, per: 1.1 });
  const V = [3, 7, 12, 5, 9];
  V.forEach((v, i) => chip(S, 'v' + i, 2 + i * 5.8, 2.4, 5, String(v), {}, { h: 3.4, cls: 'dm-big' }));
  pill(S, 'q1', 2, 7.4, ['∀x: x > 0   (모두 양수?)', '∀x: x > 0   (all positive?)'], { w: 16, h: 2, cls: 'cz-pill cz-mono', s: hid(C.soft) });
  pill(S, 'q2', 2, 12.4, ['∃x: x는 짝수   (짝수가 하나라도?)', '∃x: x is even   (any even?)'], { w: 18, h: 2, cls: 'cz-pill cz-mono', s: hid(C.soft) });
  S.set('q1', 1, { opacity: '1' });
  [0, 1, 2, 3, 4].forEach(i => S.set('v' + i, i < 3 ? 1 : 2, C.ok));
  S.label('r1', { cls: 'cz-t dm-b', x: 19, y: 7.8, w: 12 }, [[0, ''], [2, ['모두 확인 → 참', 'checked all → true']]]);
  [0, 1, 2, 3, 4].forEach(i => S.set('v' + i, 3, C.idle)); S.set('q2', 3, { opacity: '1' });
  S.set('v0', 4, C.bad).set('v1', 4, C.bad).set('v2', 5, C.ok);
  S.label('r2', { cls: 'cz-t dm-b', x: 21, y: 12.8, w: 10 }, [[0, ''], [5, ['12 발견 → 참 (멈춤)', 'found 12 → true (stop)']]]);
  cell(S, 'code', 2, 16.2, 'arr.every(x => x > 0)   ·   arr.some(x => x % 2 === 0)', { w: 28, h: 2.2, cls: 'cz-c dm-code', s: hid() }); S.set('code', 6, { opacity: '1' });
  S.cap(1, '전칭(∀): 모든 원소가 만족하나', 'For all (∀): does every element satisfy it?').cap(2, '하나라도 어기면 거짓', 'One counterexample makes it false').cap(3, '존재(∃): 만족하는 게 하나라도 있나', 'There exists (∃): is there at least one?')
    .cap(5, '찾는 순간 참', 'True the moment one is found').cap(6, '코드의 every·some, SQL의 ALL·EXISTS가 바로 이것', 'every/some in code, ALL/EXISTS in SQL');
  return S;
}
function sInduction() {
  const S = scene({ id: 'dm-induction', steps: 8, per: .85 });
  for (let i = 0; i < 7; i++) { S.el('d' + i, { cls: 'cz-c', x: 1.6 + i * 3.6, y: 6, w: 1.6, h: 7, css: 'transform-origin:100% 100%;border-radius:.2em', html: String(i + 1), s: i ? {} : C.cur }); S.set('d' + i, i + 2, Object.assign({ transform: 'rotate(55deg)' }, C.ok)); }
  S.set('d0', 1, C.cur);
  text(S, 'b', 1.6, 15, ['① 기초: 1번이 넘어진다', '① Base: domino 1 falls'], { cls: 'cz-t dm-b', s: hid() }); S.set('b', 1, { opacity: '1' });
  text(S, 'k', 1.6, 17, ['② 귀납: k번이 넘어지면 k+1번도 넘어진다', '② Step: if k falls, so does k+1'], { cls: 'cz-t dm-b', s: hid() }); S.set('k', 2, { opacity: '1' });
  S.cap(1, '첫 번째가 성립함을 보이고', 'Show the first case holds').cap(2, 'k에서 성립하면 k+1에서도 성립함을 보이면', 'and that k implies k + 1')
    .cap(5, '도미노처럼 모든 자연수에서 성립해요', 'then it holds for every natural number, like dominoes').cap(8, '재귀 함수·반복문이 올바른지 증명하는 방법 (루프 불변식)', 'The same reasoning proves recursion and loops correct (loop invariants)');
  return S;
}

/* ---------- counting & probability ---------- */
function sPerm() {
  const S = scene({ id: 'dm-perm', steps: 4, per: 1.5 });
  text(S, 't', 1, 1, ['A, B, C, D 중 2개 고르기', 'pick 2 of A, B, C, D'], { cls: 'cz-t dm-b' });
  const L = ['A', 'B', 'C', 'D'], P = []; L.forEach(a => L.forEach(b => { if (a !== b) P.push(a + b); }));
  P.forEach((p, i) => { const x = 1 + (i % 6) * 5.1, y = 3 + Math.floor(i / 6) * 3; chip(S, 'p' + i, x, y, 4.6, p, hid(C.soft), { h: 2.4 }); S.set('p' + i, 1, { opacity: '1' }); if (p[0] > p[1]) S.set('p' + i, 2, { opacity: '.18' }); else S.set('p' + i, 2, C.ok); });
  S.label('f', { cls: 'cz-t dm-b', x: 1, y: 10.4, w: 30 }, [[0, ''], [1, ['순열 ₄P₂ = 4 × 3 = 12 (순서 다르면 다른 것)', 'permutations ₄P₂ = 4 × 3 = 12 (order matters)']], [2, ['조합 ₄C₂ = 12 ÷ 2! = 6 (순서 무시)', 'combinations ₄C₂ = 12 ÷ 2! = 6 (order ignored)']]]);
  cell(S, 'ex', 1, 13.6, ['비밀번호 4자리 숫자: 10⁴ = 10,000가지 · 45명 중 6명 뽑기: ₄₅C₆ ≈ 814만', '4-digit PIN: 10⁴ = 10,000 · choose 6 of 45: ₄₅C₆ ≈ 8.1 million'], { w: 30, h: 2.4, cls: 'cz-c dm-code', s: hid() }); S.set('ex', 3, { opacity: '1' });
  S.cap(1, '순서까지 따지면 12가지', 'With order: 12 ways').cap(2, 'AB와 BA를 같은 것으로 보면 6가지', 'Treat AB and BA as the same: 6').cap(3, '경우의 수가 폭발하는 속도를 감 잡게 해 줘요', 'It builds intuition for how fast possibilities explode')
    .cap(4, '완전 탐색이 가능한지, 무차별 대입이 얼마나 걸릴지 판단해요', 'Use it to judge brute-force feasibility and password strength');
  return S;
}
function sPigeon() {
  const S = scene({ id: 'dm-pigeon', steps: 6, per: 1.1 });
  for (let h = 0; h < 4; h++) box(S, 'h' + h, 2 + h * 7.4, 10, 6.6, 6, '', {});
  for (let h = 0; h < 4; h++) text(S, 'hl' + h, 2 + h * 7.4, 16.4, ['칸 ', 'hole '].map(t => t + (h + 1)), { w: 6.6, cls: 'cz-t cz-tc' });
  const tgt = [0, 1, 2, 3, 1];
  tgt.forEach((h, i) => { const x = 3 + i * 6, dx = 2 + h * 7.4 + (i === 4 ? 4.4 : 2.2); dot(S, 'p' + i, x, 3, String(i + 1), { r: 1.1, s: C.cur }); S.move('p' + i, i + 1, dx - 1.1, 13 - 1.1); });
  S.set('h1', 5, C.bad).set('p4', 5, C.badf).set('p1', 5, C.badf);
  S.cap(1, '비둘기 5마리, 칸 4개', 'Five pigeons, four holes').cap(4, '4마리는 각자 다른 칸에 들어갔지만', 'Four can take separate holes').cap(5, '5번째는 반드시 어딘가와 겹쳐요', 'but the fifth must share')
    .cap(6, '해시값보다 데이터가 많으면 충돌은 피할 수 없어요 · 생일 역설도 같은 원리', 'More keys than hash values guarantees collisions · see also the birthday paradox');
  return S;
}
function sPascal() {
  const S = scene({ id: 'dm-binom', steps: 7, per: .95 });
  const R = []; for (let n = 0; n <= 6; n++) { const row = [1]; for (let k = 1; k <= n; k++) row.push(R[n - 1][k - 1] + (R[n - 1][k] || 0)); R.push(row); }
  R.forEach((row, n) => row.forEach((v, k) => { const x = 16 - n * 1.9 + k * 3.8 - 1.6; chip(S, `c${n}_${k}`, x, 1.2 + n * 2.6, 3.2, String(v), hid(), { h: 2.2 }); S.set(`c${n}_${k}`, n === 0 ? 0 : n, { opacity: '1' }); }));
  S.set('c0_0', 0, { opacity: '1' });
  S.set('c4_2', 5, C.cmp).set('c3_1', 5, C.soft).set('c3_2', 5, C.soft);
  [0, 1, 2, 3, 4].forEach(k => S.set(`c4_${k}`, 6, C.ok)); S.set('c3_1', 6, C.idle).set('c3_2', 6, C.idle).set('c4_2', 6, C.ok);
  S.label('n', { cls: 'cz-t dm-b', x: 1, y: 19.4, w: 30 }, [[0, ''], [5, ['위의 두 수를 더해요: 3 + 3 = 6', 'add the two above: 3 + 3 = 6']], [6, ['4번째 줄 = ₄C₀ … ₄C₄ = (a+b)⁴의 계수', 'row 4 = ₄C₀ … ₄C₄ = coefficients of (a+b)⁴']]]);
  S.cap(1, '파스칼의 삼각형: 양 끝은 1', 'Pascal’s triangle: edges are 1').cap(5, '안쪽은 바로 위 두 수의 합', 'each inner number is the sum of the two above').cap(6, 'n번째 줄 k번째 = nCk (조합의 수)', 'row n, position k = nCk')
    .cap(7, 'DP로 조합 수를 계산하는 방법이 바로 이 표', 'Computing combinations with DP fills exactly this table');
  return S;
}
function sBayes() {
  const S = scene({ id: 'dm-prob', steps: 5, per: 1.4 });
  const fp = [7, 23, 41, 58, 76, 94];
  for (let i = 0; i < 100; i++) S.el('p' + i, { x: 1.6 + (i % 20) * 1.45, y: 1.4 + Math.floor(i / 20) * 1.45, w: 1.2, h: 1.2, css: 'border-radius:.2em', s: { background: 'var(--line)' } });
  S.set('p55', 1, { background: 'var(--danger)' });
  fp.forEach(i => S.set('p' + i, 2, { background: 'var(--warn)' }));
  for (let i = 0; i < 100; i++) if (i !== 55 && !fp.includes(i)) S.set('p' + i, 3, { opacity: '.2' });
  S.label('t', { cls: 'cz-t dm-b', x: 1.6, y: 9.4, w: 29 }, [[0, ['100명 중 1명이 병에 걸려 있어요 (1%)', '1 in 100 people has the disease (1%)']], [1, ['환자 1명 (빨강)', 'one patient (red)']], [2, ['검사는 99% 정확하지만 건강한 사람 6%도 양성 (주황)', 'test is 99% sensitive but 6% of healthy people test positive (orange)']], [3, ['양성 7명 중 진짜 환자는 1명', 'of 7 positives only 1 is sick']], [4, ['P(병|양성) = 1/7 ≈ 14%', 'P(sick | positive) = 1/7 ≈ 14%']]]);
  cell(S, 'f', 1.6, 12.6, 'P(A|B) = P(B|A) · P(A) / P(B)', { w: 29, h: 2.4, cls: 'cz-c dm-code', s: hid(C.soft) }); S.set('f', 4, { opacity: '1' });
  S.cap(1, '드문 사건일수록', 'For rare events').cap(2, '오탐이 진짜보다 많아질 수 있어요', 'false positives can outnumber real ones').cap(4, '베이즈 정리: 사전 확률(1%)을 꼭 반영해야 해요', 'Bayes’ theorem: always include the base rate')
    .cap(5, '스팸 필터, 이상 탐지 알림, A/B 테스트 해석에 그대로 적용돼요', 'Applies directly to spam filters, anomaly alerts and A/B tests');
  return S;
}

/* ---------- relations & number theory ---------- */
function sFunc() {
  const S = scene({ id: 'dm-func', steps: 4, per: 1.5 });
  const D = [[['단사 (일대일)', 'injective'], 1, [[0, 0], [1, 2], [2, 3]], 3, 4], [['전사 (위로)', 'surjective'], 11.4, [[0, 0], [1, 0], [2, 1]], 3, 2], [['전단사', 'bijective'], 21.8, [[0, 1], [1, 2], [2, 0]], 3, 3]];
  D.forEach(([l, x, map, na, nb], g) => {
    const st = g + 1;
    text(S, 't' + g, x, .8, l, { w: 9.4, cls: 'cz-t cz-tc dm-b', s: hid() }); S.set('t' + g, st, { opacity: '1' });
    S.el('A' + g, { x, y: 3, w: 3.6, h: 14, css: 'border-radius:2em;border:.12em solid var(--line)', s: hid() }); S.el('B' + g, { x: x + 5.8, y: 3, w: 3.6, h: 14, css: 'border-radius:2em;border:.12em solid var(--line)', s: hid() });
    const ya = i => 5 + i * (10 / Math.max(na - 1, 1)), yb = i => 5 + i * (10 / Math.max(nb - 1, 1));
    for (let i = 0; i < na; i++) { dot(S, `a${g}${i}`, x + 1.8, ya(i), '', { r: .6, s: hid(C.cur) }); }
    for (let i = 0; i < nb; i++) { dot(S, `b${g}${i}`, x + 7.6, yb(i), '', { r: .6, s: hid(C.ok) }); }
    map.forEach(([a, b], i) => { link(S, `m${g}${i}`, [x + 1.8, ya(a)], [x + 7.6, yb(b)], .7, .75, { s: hid() }); });
    show(S, ['A' + g, 'B' + g, ...Array.from({ length: na }, (_, i) => `a${g}${i}`), ...Array.from({ length: nb }, (_, i) => `b${g}${i}`), ...map.map((_, i) => `m${g}${i}`)], st);
  });
  text(S, 'n0', 1, 18, ['남는 게 있어도 겹치지 않음', 'no two share a target'], { w: 9.4, cls: 'cz-t cz-tc', s: hid() }); text(S, 'n1', 11.4, 18, ['모든 대상에 도착', 'every target is hit'], { w: 9.4, cls: 'cz-t cz-tc', s: hid() }); text(S, 'n2', 21.8, 18, ['딱 하나씩 짝 → 역함수', 'perfect pairs → invertible'], { w: 9.4, cls: 'cz-t cz-tc', s: hid() });
  show(S, ['n0'], 1); show(S, ['n1'], 2); show(S, ['n2'], 3);
  S.cap(1, '서로 다른 입력은 서로 다른 출력으로', 'Different inputs map to different outputs').cap(2, '모든 출력이 어떤 입력에서 와요', 'Every output is reached').cap(3, '둘 다면 되돌릴 수 있어요', 'Both together means it can be reversed')
    .cap(4, '해시 함수는 단사가 아니라 충돌이 생기고, 암호화는 전단사라 복호화돼요', 'Hashes aren’t injective (collisions); encryption is bijective (decryptable)');
  return S;
}
function sEquiv() {
  const S = scene({ id: 'dm-rel', steps: 4, per: 1.5 });
  const cols = [C.soft, C.cmp, C.ok];
  for (let n = 0; n < 12; n++) { chip(S, 'n' + n, 1.6 + n * 2.45, 3, 2.1, String(n), {}, { h: 2.4 }); S.set('n' + n, 1, cols[n % 3]); const r = n % 3, idx = Math.floor(n / 3); S.move('n' + n, 2, 1.9 + r * 10.2 + idx * 2.3, 9.6); }
  [0, 1, 2].forEach(r => { box(S, 'g' + r, 1.4 + r * 10.2, 8.4, 9.8, 4.8, '', { s: hid({ background: 'transparent' }) }); text(S, 'gl' + r, 1.4 + r * 10.2, 13.6, [`나머지 ${r}`, `remainder ${r}`], { w: 9.8, cls: 'cz-t cz-tc dm-b', s: hid() }); show(S, ['g' + r, 'gl' + r], 2); });
  text(S, 'p', 1.6, 16.4, ['반사·대칭·추이를 만족하면 겹치지 않는 묶음으로 나뉘어요', 'Reflexive, symmetric, transitive → disjoint classes'], { cls: 'cz-t', s: hid() }); S.set('p', 3, { opacity: '1' });
  S.cap(1, '"3으로 나눈 나머지가 같다"는 관계로 보면', 'Relate numbers with the same remainder mod 3').cap(2, '정확히 세 묶음(동치류)으로 나뉘어요', 'They split into exactly three equivalence classes')
    .cap(4, '샤딩(id % N), 대소문자 무시 비교, 파티셔닝이 이런 분류예요', 'Sharding by id % N, case-insensitive matching and partitioning all classify this way');
  return S;
}
function sMod() {
  const S = scene({ id: 'dm-mod', steps: 5, per: 1.3 });
  const cx = 9, cy = 10, R = 7;
  S.el('ring', { x: cx - R, y: cy - R, w: R * 2, h: R * 2, css: 'border-radius:50%;border:.14em solid var(--line)' });
  for (let h = 0; h < 12; h++) { const a = (h / 12) * 2 * Math.PI - Math.PI / 2; node(S, 'h' + h, cx + R * Math.cos(a), cy + R * Math.sin(a), String(h), { r: 1 }); }
  S.set('h9', 1, C.soft);
  for (let k = 1; k <= 5; k++) S.set('h' + ((9 + k) % 12), 2, k === 5 ? C.cur : { background: 'var(--accent-soft)' });
  S.label('eq', { cls: 'cz-t cz-mono dm-big', x: 18.4, y: 3, w: 13 }, [[0, ''], [1, '9 + 5'], [2, '= 14'], [3, '≡ 2 (mod 12)']]);
  cell(S, 'hs', 18.4, 10.6, 'bucket = hash(key) % 8', { w: 13, h: 2.4, cls: 'cz-c dm-code', s: hid(C.soft) }); S.set('hs', 4, { opacity: '1' });
  cell(S, 'rsa', 18.4, 13.8, 'RSA: c = mᵉ mod n', { w: 13, h: 2.4, cls: 'cz-c dm-code', s: hid(C.cmp) }); S.set('rsa', 4, { opacity: '1' });
  S.cap(1, '시계는 12에서 다시 0으로 돌아가요', 'A clock wraps from 12 back to 0').cap(2, '9시에서 5시간 뒤는', 'Five hours after 9').cap(3, '14가 아니라 2시 · 나머지만 남아요', 'is 2, not 14: only the remainder counts')
    .cap(4, '해시 테이블 인덱스, 원형 버퍼, 암호(RSA)가 모듈러 연산', 'Hash indexes, ring buffers and RSA all use modular arithmetic').cap(5, '음수 % 결과는 언어마다 달라요 (JS −1 % 12 = −1)', 'Negative % differs by language (JS: −1 % 12 = −1)');
  return S;
}
function sGCD() {
  const S = scene({ id: 'dm-gcd', steps: 5, per: 1.3 });
  const L = ['1071 = 2 × 462 + 147', '462 = 3 × 147 + 21', '147 = 7 × 21 + 0', 'gcd(1071, 462) = 21'];
  L.forEach((t, i) => { cell(S, 'l' + i, 3, 2.4 + i * 3.4, t, { w: 26, h: 2.6, cls: 'cz-c dm-code dm-lg', s: hid(i === 3 ? C.ok : {}) }); S.set('l' + i, i + 1, { opacity: '1' }); });
  S.set('l0', 2, { opacity: '.5' }).set('l1', 3, { opacity: '.5' });
  text(S, 'n', 3, 16.4, ['큰 수를 작은 수로 나눈 나머지로 계속 바꿔요 · O(log n)', 'keep replacing the larger by the remainder · O(log n)'], { cls: 'cz-t dm-b', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, 'gcd(a, b) = gcd(b, a mod b)', 'gcd(a, b) = gcd(b, a mod b)').cap(3, '나머지가 0이 되면', 'When the remainder hits 0').cap(4, '직전 나누는 수가 최대공약수', 'the last divisor is the GCD')
    .cap(5, '분수 약분, 화면 비율(16:9) 계산, RSA 키 생성에 써요', 'Used to reduce fractions, compute aspect ratios and generate RSA keys');
  return S;
}

/* ---------- graph theory ---------- */
function sGraph() {
  const S = scene({ id: 'dm-graph', steps: 5, per: 1.3 });
  const P = { A: [5, 4], B: [14, 3], C: [24, 5], D: [9, 13], E: [20, 14], F: [28, 15] };
  const E = [['A', 'B'], ['B', 'C'], ['A', 'D'], ['B', 'D'], ['D', 'E'], ['B', 'E'], ['C', 'F']];
  E.forEach(([a, b]) => edge(S, 'e' + a + b, P[a][0], P[a][1], P[b][0], P[b][1]));
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.4 }));
  S.set('B', 1, C.cur); ['eAB', 'eBC', 'eBD', 'eBE'].forEach(e => S.set(e, 1, { background: 'var(--accent)' }));
  ['eAB', 'eBC', 'eBD', 'eBE'].forEach(e => S.set(e, 2, { background: 'var(--line)' })); S.set('B', 2, C.idle);
  ['eAD', 'eDE', 'eBE', 'eBC', 'eCF'].forEach(e => S.set(e, 2, { background: 'var(--ok)' })); ['A', 'D', 'E', 'B', 'C', 'F'].forEach(k => S.set(k, 2, C.ok));
  ['eAD', 'eDE', 'eBE', 'eBC', 'eCF'].forEach(e => S.set(e, 3, { background: 'var(--line)' })); ['A', 'D', 'E', 'B', 'C', 'F'].forEach(k => S.set(k, 3, C.idle));
  ['eAB', 'eBD', 'eAD'].forEach(e => S.set(e, 3, { background: 'var(--warn)' })); ['A', 'B', 'D'].forEach(k => S.set(k, 3, C.cmp));
  S.label('d', { cls: 'cz-t dm-b', x: 1, y: 18.2, w: 30 }, [[0, ['정점 6개, 간선 7개', '6 vertices, 7 edges']], [1, ['B의 차수 = 4 (연결된 간선 수)', 'degree of B = 4']], [2, ['경로: A–D–E–B–C–F', 'path: A–D–E–B–C–F']], [3, ['사이클: A–B–D–A', 'cycle: A–B–D–A']], [4, ['차수의 합 = 간선 수 × 2 = 14', 'sum of degrees = 2 × edges = 14']]]);
  S.cap(0, '점(정점)과 선(간선)으로 관계를 표현해요', 'Vertices and edges model relationships').cap(1, '차수: 한 점에 붙은 선의 수', 'Degree: edges touching a vertex').cap(2, '경로: 선을 따라 이어지는 길', 'Path: a walk along edges')
    .cap(3, '사이클: 출발점으로 돌아오는 경로', 'Cycle: a path that returns to its start').cap(5, '친구 관계, 지도, 의존성, 네트워크가 모두 그래프', 'Friendships, maps, dependencies and networks are all graphs');
  return S;
}
function sEuler() {
  const S = scene({ id: 'dm-euler', steps: 7, per: 1 });
  const P = { N: [16, 3.2], W: [5, 10], E: [27, 10], S: [16, 16.8] };
  const E = [['N', 'W', -.9], ['N', 'W', .9], ['S', 'W', -.9], ['S', 'W', .9], ['N', 'E', 0], ['S', 'E', 0], ['W', 'E', 0]];
  E.forEach(([a, b, o], i) => { const [x1, y1] = P[a], [x2, y2] = P[b]; const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny); edge(S, 'e' + i, x1 + nx / L * o, y1 + ny / L * o, x2 + nx / L * o, y2 + ny / L * o, { h: .24 }); });
  const deg = { N: [[0, ''], [1, '3']], W: [[0, ''], [1, '5'], [3, '4']], E: [[0, ''], [1, '3'], [3, '2']], S: [[0, ''], [1, '3']] };
  Object.entries(P).forEach(([k, [x, y]]) => { node(S, k, x, y, k, { r: 1.6 }); S.label('d' + k, { cls: 'cz-pill', x: x + 1.8, y: y - 2.6, w: 2, h: 1.6, s: C.bad }, deg[k]); Object.assign(S.get('d' + k + '~0').s, { opacity: '0' }); if (deg[k][2]) Object.assign(S.get('d' + k + '~2').s, C.ok); });
  S.set('e6', 3, { opacity: '.12' });
  [[0, 4], [1, 4], [4, 5], [5, 5], [2, 6], [3, 6]].forEach(([e, st]) => S.set('e' + e, st, { background: 'var(--ok)' }));
  S.label('t', { cls: 'cz-t dm-b', x: 1, y: 19.6, w: 30 }, [[0, ''], [1, ['홀수 차수 점이 4개 → 한붓그리기 불가', '4 odd-degree vertices → impossible']], [3, ['다리 하나를 없애면 홀수 점 2개 → 가능', 'remove one bridge → 2 odd → possible']]]);
  S.cap(0, '쾨니히스베르크의 다리 7개를 한 번씩만 건널 수 있을까?', 'Can you cross each of Königsberg’s 7 bridges exactly once?').cap(1, '각 땅의 차수를 세면 모두 홀수', 'Count each land’s degree: all odd')
    .cap(2, '들어가면 나와야 하니 중간 지점은 짝수여야 해요', 'Every pass-through needs an in and an out, so middles must be even').cap(4, '홀수 점에서 시작해 다른 홀수 점에서 끝나요', 'Start at one odd vertex and end at the other')
    .cap(7, '그래프 이론의 시작 · 우편 배달·청소 로봇 경로 문제', 'Where graph theory began · postal routes, cleaning robots');
  return S;
}
function sTree() {
  const S = scene({ id: 'dm-tree', steps: 5, per: 1.3 });
  const P = { a: [16, 3], b: [9, 8.6], c: [23, 8.6], d: [5, 14.2], e: [13, 14.2], f: [20, 14.2], g: [27, 14.2] };
  const E = [['a', 'b'], ['a', 'c'], ['b', 'd'], ['b', 'e'], ['c', 'f'], ['c', 'g']];
  E.forEach(([x, y]) => edge(S, 'e' + x + y, P[x][0], P[x][1], P[y][0], P[y][1]));
  edge(S, 'xef', P.e[0], P.e[1], P.f[0], P.f[1], { s: hid({ background: 'var(--danger)' }) });
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, k, { r: 1.3 }));
  S.label('n', { cls: 'cz-t dm-b', x: 1, y: 18, w: 30 }, [[0, ['정점 7개 · 간선 6개 (항상 n − 1)', '7 vertices · 6 edges (always n − 1)']], [1, ['두 점 사이 경로는 딱 하나', 'exactly one path between any two']], [2, ['간선을 하나 더하면 사이클이 생기고', 'add an edge and a cycle appears']], [3, ['간선을 하나 빼면 끊어져요', 'remove one and it disconnects']]]);
  ['eab', 'ebe'].forEach(e => S.set(e, 1, { background: 'var(--accent)' })); S.set('e', 1, C.cur).set('a', 1, C.cur);
  ['eab', 'ebe'].forEach(e => S.set(e, 2, { background: 'var(--line)' })); S.set('e', 2, C.idle).set('a', 2, C.idle);
  S.set('xef', 2, { opacity: '1' }); ['eab', 'ebe', 'eac', 'ecf'].forEach(e => S.set(e, 2, { background: 'var(--danger)' }));
  S.set('xef', 3, { opacity: '0' }); ['eab', 'ebe', 'eac', 'ecf'].forEach(e => S.set(e, 3, { background: 'var(--line)' })); S.set('eac', 3, { opacity: '.1' }); ['c', 'f', 'g'].forEach(k => S.set(k, 3, C.bad));
  S.set('eac', 4, { opacity: '1' }); ['c', 'f', 'g'].forEach(k => S.set(k, 4, C.idle));
  S.cap(0, '트리 = 사이클 없이 모두 연결된 그래프', 'A tree is a connected graph with no cycles').cap(2, '최소한의 선으로 모두를 잇는 구조', 'The fewest edges that keep everything connected')
    .cap(5, '폴더 구조, DOM, 조직도, 스패닝 트리 프로토콜(루프 방지)', 'Folders, the DOM, org charts and spanning-tree protocol');
  return S;
}
function sColor() {
  const S = scene({ id: 'dm-color', steps: 7, per: .95 });
  const P = { 수학: [6, 4], 영어: [16, 3], 과학: [26, 4], 국어: [6, 14], 역사: [16, 15], 음악: [26, 14] };
  const EN = { 수학: 'Math', 영어: 'Eng', 과학: 'Sci', 국어: 'Kor', 역사: 'Hist', 음악: 'Music' };
  const E = [['수학', '영어'], ['영어', '과학'], ['수학', '국어'], ['영어', '역사'], ['국어', '역사'], ['과학', '음악'], ['역사', '음악'], ['영어', '국어']];
  E.forEach(([a, b], i) => edge(S, 'e' + i, P[a][0], P[a][1], P[b][0], P[b][1]));
  Object.entries(P).forEach(([k, [x, y]]) => node(S, k, x, y, [k, EN[k]], { r: 1.8 }));
  const cols = [C.soft, C.ok, C.cmp], ord = ['영어', '수학', '과학', '국어', '역사', '음악'], col = {};
  ord.forEach((v, i) => { const used = new Set(E.filter(e => e.includes(v)).map(e => e[0] === v ? e[1] : e[0]).filter(u => col[u] != null).map(u => col[u])); let c = 0; while (used.has(c)) c++; col[v] = c; S.set(v, i + 1, cols[c]); });
  S.label('n', { cls: 'cz-t dm-b', x: 1, y: 18.6, w: 30 }, [[0, ''], [6, ['색 3개 = 시험 시간대 3개면 충분', '3 colours = 3 exam slots suffice']]]);
  S.cap(0, '선으로 이어진 과목은 수강생이 겹쳐 같은 시간에 못 봐요', 'Linked courses share students, so their exams can’t coincide').cap(1, '연결된 점끼리 다른 색이 되도록', 'Colour so neighbours always differ')
    .cap(6, '최소 색 수 = 필요한 시간대 수', 'The minimum number of colours = slots needed').cap(7, '컴파일러 레지스터 할당, 주파수 배정에도 같은 문제', 'Register allocation and frequency assignment are the same problem');
  return S;
}

window.UX = page([
  sec('dm-sets', '집합·논리', 'Sets & logic', '집합과 논리', 'Sets and logic',
    '조건문, 쿼리, 증명의 바탕이 되는 언어예요.', 'The language beneath conditions, queries and proofs.', [
    item('dm-venn', '집합 연산', 'Set operations', '합집합(∪), 교집합(∩), 차집합(−), 대칭차(△)로 두 집합을 조합해요.', 'SQL의 UNION·INTERSECT·EXCEPT, 언어의 Set 타입, 권한 계산(허용 − 차단)이 모두 집합 연산이에요.', 'Combine two sets with union (∪), intersection (∩), difference (−) and symmetric difference (△).', 'SQL’s UNION, INTERSECT and EXCEPT, Set types and permission maths (allowed − denied) are all set operations.', sVenn()),
    item('dm-logic', '명제와 함의', 'Propositions · Implication', '"p이면 q"는 p가 참인데 q가 거짓일 때만 거짓이에요. 대우(¬q → ¬p)와는 항상 진릿값이 같아요.', '조건문 리팩터링, 테스트 케이스 설계, 요구사항 해석에서 "그 외의 경우"를 빠뜨리지 않게 해 줘요.', '“p implies q” is false only when p is true and q is false, and it always matches its contrapositive (¬q → ¬p).', 'It keeps you from missing “the other cases” when refactoring conditions, designing tests or reading requirements.', sLogic()),
    item('dm-quant', '한정자 (∀, ∃)', 'Quantifiers (∀, ∃)', '∀는 "모든 원소가", ∃는 "적어도 하나가" 조건을 만족하는지 말해요. ∀는 반례 하나로, ∃는 예 하나로 결정돼요.', '코드의 every/some, SQL의 ALL/EXISTS예요. "모든 X가 아니다"와 "X인 게 없다"를 헷갈리지 마세요.', '∀ says every element satisfies a condition; ∃ says at least one does. One counterexample settles ∀, one example settles ∃.', 'They are every/some in code and ALL/EXISTS in SQL. Don’t confuse “not all X” with “no X”.', sQuant()),
    item('dm-induction', '수학적 귀납법', 'Mathematical induction', '첫 번째 경우가 참이고, k번째가 참이면 k+1번째도 참임을 보이면 모든 자연수에서 참이에요.', '재귀 함수의 정확성과 반복문 불변식 증명이 같은 구조예요. 종료 조건(기초)과 진행(귀납)을 함께 확인하세요.', 'If the first case holds and case k implies case k + 1, the statement holds for every natural number.', 'Proving recursion correct and reasoning with loop invariants follow the same shape: check the base case and the step.', sInduction())
  ]),
  sec('dm-count', '경우의 수', 'Counting', '경우의 수와 확률', 'Counting and probability',
    '가능성을 세고 불확실성을 다루는 도구예요.', 'Tools for counting possibilities and handling uncertainty.', [
    item('dm-perm', '순열과 조합', 'Permutations · Combinations', '순서를 따지면 순열(nPr), 순서를 무시하면 조합(nCr)이에요. 조합은 순열을 r!로 나눈 값이에요.', '완전 탐색이 가능한 크기인지, 비밀번호 무차별 대입이 얼마나 걸리는지, 테스트 조합이 몇 개인지 계산해요.', 'Counting with order gives permutations (nPr); without order, combinations (nCr = nPr / r!).', 'Use it to judge whether brute force is feasible, how strong a password is or how many test combinations exist.', sPerm()),
    item('dm-pigeon', '비둘기집 원리', 'Pigeonhole principle', 'n개의 칸에 n+1개를 넣으면 적어도 한 칸에는 2개 이상이 들어가요.', '해시 충돌은 피할 수 없다는 근거예요. 23명만 모여도 생일이 같은 쌍이 있을 확률이 50%를 넘어요(생일 역설).', 'Put n + 1 items into n boxes and at least one box holds two.', 'It proves hash collisions are unavoidable. With just 23 people, a shared birthday is more likely than not (birthday paradox).', sPigeon()),
    item('dm-binom', '이항계수와 파스칼의 삼각형', 'Binomial coefficients · Pascal’s triangle', '각 수는 바로 위 두 수의 합이고, n번째 줄은 nC0 … nCn이에요.', 'nCk를 DP로 계산하는 방법이자, 격자 경로 수 세기 같은 문제의 기본이에요. 큰 수는 오버플로에 주의하세요.', 'Each number is the sum of the two above it; row n lists nC0 … nCn.', 'It is how you compute nCk with DP and the basis of grid-path counting; watch for overflow on big values.', sPascal()),
    item('dm-prob', '조건부 확률과 베이즈', 'Conditional probability · Bayes', '어떤 일이 일어났다는 조건에서의 확률이에요. 드문 사건은 검사가 정확해도 양성의 대부분이 오탐일 수 있어요.', '이상 탐지 알림이 거의 다 오탐인 이유, 스팸 필터, A/B 테스트 해석에 꼭 필요한 감각이에요.', 'Probability given that something has happened. For rare events, most positives can be false even with an accurate test.', 'It explains why anomaly alerts are mostly false alarms and underpins spam filters and A/B test interpretation.', sBayes())
  ]),
  sec('dm-relnum', '관계·정수론', 'Relations & numbers', '함수, 관계, 정수론', 'Functions, relations and number theory',
    '데이터를 짝짓고 나누는 규칙이에요.', 'Rules for pairing and partitioning data.', [
    item('dm-func', '함수: 단사·전사·전단사', 'Injective · Surjective · Bijective', '단사는 다른 입력이 다른 출력으로, 전사는 모든 출력이 어떤 입력에서, 전단사는 둘 다라서 거꾸로 되돌릴 수 있어요.', '해시는 단사가 아니라 충돌이 나고, 암호화·인코딩은 전단사라 복원돼요. ID 매핑 설계에도 써요.', 'Injective: different inputs give different outputs. Surjective: every output is hit. Bijective: both, so it can be inverted.', 'Hashes aren’t injective, so they collide; encryption and encodings are bijective, so they decode. Useful for designing ID mappings.', sFunc()),
    item('dm-rel', '동치 관계', 'Equivalence relations', '반사·대칭·추이를 만족하는 관계는 원소들을 겹치지 않는 묶음(동치류)으로 나눠요.', 'id % N 샤딩, 대소문자 무시 비교, 같은 사람으로 묶는 중복 제거가 모두 동치류 만들기예요.', 'A reflexive, symmetric and transitive relation splits elements into non-overlapping classes.', 'Sharding by id % N, case-insensitive matching and deduplicating “the same person” all form equivalence classes.', sEquiv()),
    item('dm-mod', '모듈러 연산', 'Modular arithmetic', '나눈 나머지만 보는 연산이에요. 시계처럼 끝에 닿으면 처음으로 돌아가요.', '해시 테이블 인덱스, 원형 버퍼, 요일 계산, RSA 암호가 모두 모듈러 연산이에요. 음수 나머지는 언어마다 다르니 조심하세요.', 'Arithmetic that keeps only remainders, wrapping around like a clock.', 'Hash indexes, ring buffers, weekday maths and RSA use it. Negative remainders differ between languages.', sMod()),
    item('dm-gcd', '유클리드 호제법', 'Euclidean algorithm', '두 수의 최대공약수를 큰 수를 작은 수로 나눈 나머지로 바꾸기를 반복해 빠르게 구해요.', '분수 약분, 화면 비율 계산, RSA 키 생성(확장 유클리드)에 써요. 반복 횟수가 O(log n)이라 아주 커도 빨라요.', 'Finds the greatest common divisor by repeatedly replacing the larger number with the remainder.', 'Used to reduce fractions, compute aspect ratios and generate RSA keys (extended Euclid). It runs in O(log n).', sGCD())
  ]),
  sec('dm-graphs', '그래프 이론', 'Graph theory', '그래프 이론', 'Graph theory',
    '연결 구조를 수학적으로 다뤄요.', 'The mathematics of connections.', [
    item('dm-graph', '그래프 기본 용어', 'Graph basics', '정점과 간선으로 관계를 표현하고, 차수·경로·사이클·연결 같은 말로 구조를 설명해요.', '모든 그래프에서 차수의 합은 간선 수의 2배예요. 데이터를 그래프로 볼 수 있으면 BFS·최단 경로 같은 도구를 바로 쓸 수 있어요.', 'Vertices and edges model relations; degree, path, cycle and connectivity describe their structure.', 'In any graph the degrees sum to twice the edges. Seeing data as a graph unlocks tools like BFS and shortest paths.', sGraph()),
    item('dm-euler', '오일러 경로', 'Euler path', '모든 간선을 정확히 한 번씩 지나는 경로예요. 홀수 차수인 정점이 0개나 2개일 때만 존재해요.', '쾨니히스베르크 다리 문제에서 그래프 이론이 시작됐어요. 우편 배달·도로 청소 경로 최적화에 써요.', 'A route that uses every edge exactly once; it exists only when 0 or 2 vertices have odd degree.', 'Graph theory began with the Königsberg bridges. It is used for mail delivery and street-sweeping routes.', sEuler()),
    item('dm-tree', '트리의 성질', 'Properties of trees', '사이클 없이 모두 연결된 그래프로, 정점 n개면 간선은 항상 n−1개이고 두 점 사이 경로가 하나뿐이에요.', '간선을 더하면 사이클, 빼면 분리가 생겨요. 네트워크 스위치의 루프 방지(STP), 최소 신장 트리가 이 성질을 써요.', 'A connected graph with no cycles: n vertices always have n − 1 edges and exactly one path between any two.', 'Add an edge and you get a cycle; remove one and it splits. Spanning-tree protocol and minimum spanning trees rely on this.', sTree()),
    item('dm-color', '그래프 색칠', 'Graph colouring', '이웃한 정점끼리 다른 색이 되도록 칠할 때 필요한 최소 색 수를 구하는 문제예요.', '시험 시간표, 회의실 배정, 컴파일러 레지스터 할당, 주파수 배정이 모두 이 문제예요. 일반적으로 어렵지만 그리디로 꽤 잘 풀려요.', 'Colour vertices so neighbours differ, using as few colours as possible.', 'Exam timetables, room booking, register allocation and frequency planning are all colouring; it is hard in general but greedy works well.', sColor())
  ])
]);
window.UX[0].css += `
.dm-m .in{font-family:var(--f-mono);font-size:.72em;font-weight:700}
.dm-big .in{font-size:1.15em;font-weight:900;color:var(--ink)}
.dm-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.dm-code{place-items:center start!important;padding-left:.7em}
.dm-code .in{font-family:var(--f-mono);font-size:.62em}
.dm-lg .in{font-size:.85em}`;
})();
