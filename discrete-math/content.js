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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'dmx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono dmx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono dmx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c dmx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono dmx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c dmx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'dmx-s dmx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono dmx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono dmx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono dmx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono dmx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono dmx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'dmx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'dmx-xs', 5));


const CSSX = `
.dmx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.dmx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.dmx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.dmx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.dmx-r .in{color:var(--danger);font-weight:800}
.dmx-g .in{color:var(--ok);font-weight:800}
.dmx-a .in{color:var(--accent);font-weight:800}
.dmx-w .in{color:var(--warn);font-weight:800}
.dmx-c .in{font-size:.6em;font-weight:700}
.dmx-c2 .in{font-size:.5em;font-weight:700}
.dmx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.dmx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const lines = (S, pre, x, y, dy, list) => list.forEach(([t, st, cls, o], i) => T(S, pre + i, x, y + i * dy, t, cls || 'dmx-xs', st, o || {}));
const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };
const gnode = (S, k, x, y, l, c, st, o = {}) => stt(S, k, x, y, l, c || 'ink-3', st, { r: o.r || .85, pct: o.pct ?? 14 });

/* ================= sets & logic extras ================= */
function sProof() {
  const S = scene({ id: 'dm-proof', steps: 5, per: 1.5 });
  lines(S, 'd', 1, 1, 1.15, [[['직접 증명: n이 홀수면 n²도 홀수', 'direct proof: if n is odd, n² is odd'], 1, 'dmx-s dmx-a'], ['n = 2k + 1', 1, 'cz-mono dmx-xs'], [['n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1  → 홀수 ✓', 'n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1  → odd ✓'], 1, 'cz-mono dmx-xs']]);
  lines(S, 'c', 1, 5, 1.15, [[['대우 증명: n²이 짝수면 n도 짝수', 'contrapositive: if n² is even, n is even'], 2, 'dmx-s dmx-w'], [['p → q 는 ¬q → ¬p 와 같아요', 'p → q is equivalent to ¬q → ¬p'], 2, 'cz-mono dmx-xs'], [['“n이 홀수면 n²도 홀수”를 보이면 끝 (위에서 보였어요)', 'so show “n odd → n² odd”, done above'], 2, 'dmx-xs dmx-g']]);
  lines(S, 'k', 1, 9, 1.15, [[['귀류법: √2는 무리수', 'contradiction: √2 is irrational'], 3, 'dmx-s dmx-r'], [['√2 = p/q (기약분수)라고 가정 → p² = 2q²', 'assume √2 = p/q in lowest terms → p² = 2q²'], 3, 'cz-mono dmx-xs'], [['→ p는 짝수, p = 2r → 4r² = 2q² → q² = 2r²', '→ p is even, p = 2r → 4r² = 2q² → q² = 2r²'], 4, 'cz-mono dmx-xs'], [['→ q도 짝수 → 기약분수라는 가정과 모순 ✗', '→ q is even too → contradicts lowest terms ✗'], 4, 'cz-mono dmx-xs dmx-r']]);
  T(S, 'ce', 1, 14, ['반례 하나면 “모든 ~”을 무너뜨려요: “모든 소수는 홀수” ✗ (2)', 'one counterexample topples “for all”: “every prime is odd” ✗ (2)'], 'dmx-xs dmx-a', 5);
  fin(S, 'z', 15.6, [['직접: P → Q · 대우: ¬Q → ¬P · 귀류: ¬Q를 가정해 모순 도출', 'direct: P → Q · contrapositive: ¬Q → ¬P · contradiction: assume ¬Q, reach absurdity', 'dmx-xs'], ['경우 나누기, 수학적 귀납법도 자주 쓰는 증명 기법이에요', 'proof by cases and induction are other everyday tools'], ['알고리즘의 정확성 증명(루프 불변식)도 같은 도구로 해요', 'algorithm correctness proofs (loop invariants) use the same toolkit', 'dmx-xs dmx-a']]);
  S.cap(1, '직접 증명', 'Direct proof').cap(2, '대우로 증명', 'Proof by contrapositive').cap(3, '귀류법: 반대를 가정', 'Contradiction: assume the opposite').cap(4, '모순에 도달', 'Reach a contradiction').cap(5, '증명 기법', 'Proof techniques');
  return S;
}
function sInfer() {
  const S = scene({ id: 'dm-infer', steps: 5, per: 1.5 });
  const R = [['긍정 논법 (modus ponens)', 'modus ponens', 'p → q,  p', 'q', ['비 → 젖음, 비가 옴 ⇒ 젖음', 'rain → wet, it rains ⇒ wet'], 'accent'],
    ['부정 논법 (modus tollens)', 'modus tollens', 'p → q,  ¬q', '¬p', ['비 → 젖음, 안 젖음 ⇒ 비 안 옴', 'rain → wet, dry ⇒ no rain'], 'warn'],
    ['가언 삼단 논법', 'hypothetical syllogism', 'p → q,  q → r', 'p → r', ['비 → 젖음 → 미끄러움 ⇒ 비 → 미끄러움', 'rain → wet → slippery ⇒ rain → slippery'], 'ok']];
  R.forEach(([k, e, pre, con, ex, c], i) => { const y = 1 + i * 3.6, st = i + 1;
    T(S, 'rn' + i, 1, y, [k, e], 'dmx-s dmx-' + ({ accent: 'a', warn: 'w', ok: 'g' })[c], st); box2(S, 'rp' + i, 1, y + 1.2, 9, 1.5, pre, c, st, { pct: 22 }); ar(S, 'ra' + i, [10.1, y + 1.95], [11.9, y + 1.95], 'ink-3', st, { h: .1 });
    box2(S, 'rc' + i, 12, y + 1.2, 5, 1.5, '∴ ' + con, c, st, { pct: 40 }); T(S, 'rx' + i, 18, y + 1.45, ex, 'dmx-xs', st); });
  T(S, 'fn', 1, 11.8, ['오류: 후건 긍정 (affirming the consequent)', 'fallacy: affirming the consequent'], 'dmx-s dmx-r', 4);
  box2(S, 'fp', 1, 13, 9, 1.5, 'p → q,  q', 'danger', 4, { pct: 22 }); ar(S, 'fa', [10.1, 13.75], [11.9, 13.75], 'danger', 4, { h: .1 }); box2(S, 'fc', 12, 13, 5, 1.5, '∴ p ✗', 'danger', 4, { pct: 40 });
  T(S, 'fx', 18, 13.25, ['젖었다 ⇒ 비? 물을 뿌렸을 수도', 'wet ⇒ rain? maybe a sprinkler'], 'dmx-xs dmx-r', 4);
  fin(S, 'z', 15.6, [['추론 규칙: 참인 전제에서 항상 참인 결론을 끌어내는 형식', 'inference rules always take true premises to true conclusions', 'dmx-xs dmx-a'], ['자동 정리 증명기와 Prolog는 이 규칙(특히 융해법, resolution)을 기계적으로 적용해요', 'automated theorem provers and Prolog apply them mechanically (especially resolution)'], ['코드 리뷰에서도: “테스트가 통과했다 → 버그 없다”는 후건 긍정 오류', 'in code review too: “tests pass → no bugs” is affirming the consequent']]);
  S.cap(1, '긍정 논법', 'Modus ponens').cap(2, '부정 논법', 'Modus tollens').cap(3, '삼단 논법', 'Syllogism').cap(4, '흔한 오류', 'A common fallacy').cap(5, '추론 규칙', 'Rules of inference');
  return S;
}
function sPower() {
  const S = scene({ id: 'dm-power', steps: 5, per: 1.5 });
  T(S, 'a', 1, 1, 'A = { a, b, c }', 'cz-mono dmx-s dmx-a', 1);
  const SUB = ['∅', '{c}', '{b}', '{b,c}', '{a}', '{a,c}', '{a,b}', '{a,b,c}'];
  SUB.forEach((s, m) => { const y = 2.6 + m * 1.45; box2(S, 'bm' + m, 1, y, 3.4, 1.25, m.toString(2).padStart(3, '0'), 'warn', 2, { pct: 25 }); ar(S, 'ba' + m, [4.5, y + .62], [5.7, y + .62], 'ink-3', 2, { h: .08 }); box2(S, 'ss' + m, 5.8, y, 5.4, 1.25, s, 'accent', 2, { pct: 20 }); });
  T(S, 'bl', 1, 14.4, ['각 원소를 넣을까(1) 말까(0) → 2³ = 8개', 'each element in (1) or out (0) → 2³ = 8 subsets'], 'dmx-xs', 2);
  T(S, 'ph', 14, 1, 'A × B,  B = { 1, 2 }', 'cz-mono dmx-s dmx-g', 3);
  ['a', 'b', 'c'].forEach((r, i) => { T(S, 'pr' + i, 14, 3.2 + i * 2, r, 'cz-mono dmx-s', 3); [1, 2].forEach((c, j) => box2(S, `pc${i}${j}`, 16 + j * 5, 2.8 + i * 2, 4.6, 1.6, `(${r}, ${c})`, 'ok', 3, { pct: 25 })); });
  [1, 2].forEach((c, j) => T(S, 'pcl' + j, 16 + j * 5, 2, String(c), 'cz-tc cz-mono dmx-s', 3, { w: 4.6 }));
  T(S, 'f1', 14, 9.6, '|P(A)| = 2ⁿ', 'cz-mono dmx-l dmx-a', 4); T(S, 'f2', 14, 11.4, '|A × B| = |A| · |B| = 6', 'cz-mono dmx-l dmx-g', 4);
  fin(S, 'z', 15.8, [['멱집합 = 모든 부분집합의 집합 · 곱집합 = 순서쌍 전체', 'the power set is the set of all subsets · the product is every ordered pair', 'dmx-xs dmx-a'], ['비트마스크로 부분집합을 0 ~ 2ⁿ−1 정수로 다뤄요 (완전 탐색, 비트 DP)', 'bitmasks turn subsets into integers 0 … 2ⁿ−1 (brute force, bitmask DP)'], ['데이터베이스의 관계(테이블)는 곱집합의 부분집합이에요', 'a database relation (table) is a subset of a Cartesian product']]);
  S.cap(1, '원소 3개짜리 집합', 'A set of three elements').cap(2, '부분집합 = 3비트 문자열', 'Subsets are 3-bit strings').cap(3, '곱집합: 모든 순서쌍', 'The product: every ordered pair').cap(4, '크기 공식', 'Size formulas').cap(5, '멱집합과 곱집합', 'Power sets and Cartesian products');
  return S;
}

/* ================= counting extras ================= */
function sIncl() {
  const S = scene({ id: 'dm-incl', steps: 5, per: 1.5 });
  ring(S, 'A', 7, 7, 4, 'accent', 1, { w: .14, fill: 'color-mix(in srgb,var(--accent) 12%,transparent)' }); ring(S, 'B', 11.4, 7, 4, 'warn', 1, { w: .14, fill: 'color-mix(in srgb,var(--warn) 12%,transparent)' });
  ring(S, 'C', 9.2, 10.6, 4, 'ok', 3, { w: .14, fill: 'color-mix(in srgb,var(--ok) 12%,transparent)' });
  T(S, 'q', 17, .4, ['1 ~ 100에서 세기', 'counting within 1–100'], 'dmx-s dmx-a', 1);
  T(S, 'al', 2.6, 1.6, ['2의 배수 50', 'multiples of 2: 50'], 'dmx-xs dmx-a', 1); T(S, 'bl', 11.4, 1.6, ['3의 배수 33', 'of 3: 33'], 'dmx-xs dmx-w', 1); T(S, 'cl', 6.6, 15, ['5의 배수 20', 'of 5: 20'], 'dmx-xs dmx-g', 3);
  T(S, 'dbl', 8.6, 5.4, '×2', 'cz-mono dmx-s dmx-r', 1, { off: 2 });
  T(S, 'f1', 17, 2, '|A ∪ B| = |A| + |B| − |A ∩ B|', 'cz-mono dmx-xs', 1); T(S, 'f1n', 17, 3.2, ['겹친 부분(6의 배수 16)을 두 번 셌어요', 'the overlap (16 multiples of 6) was counted twice'], 'dmx-xs dmx-r', 1);
  T(S, 'f2', 17, 4.6, '50 + 33 − 16 = 67', 'cz-mono dmx-s dmx-a', 2);
  T(S, 'f3x', 17, 6.4, ['|A∪B∪C| = Σ|하나| − Σ|둘| + |셋|', '|A∪B∪C| = Σ|one| − Σ|two| + |three|'], 'cz-mono dmx-xs', 3);
  T(S, 'f4', 17, 7.8, '= (50 + 33 + 20)', 'cz-mono dmx-xs', 4); T(S, 'f5', 17, 9, '− (16 + 10 + 6)', 'cz-mono dmx-xs dmx-r', 4); T(S, 'f6', 17, 10.2, '+ 3', 'cz-mono dmx-xs dmx-g', 4); T(S, 'f7', 17, 11.4, '= 74', 'cz-mono dmx-l dmx-a', 4);
  T(S, 'f7b', 17, 13, ['2, 3, 5 중 하나로 나누어지는 수의 개수', 'numbers divisible by 2, 3 or 5'], 'dmx-xs', 4);
  fin(S, 'z', 16.2, [['더하고, 겹친 만큼 빼고, 너무 많이 뺀 만큼 다시 더해요 (부호를 번갈아)', 'add, subtract the overlaps, add back what was over-subtracted (alternating signs)', 'dmx-xs dmx-a'], ['교란 순열(아무도 자기 모자를 못 받는 경우)의 수 = n!(1 − 1/1! + 1/2! − …) ≈ n!/e', 'derangements (nobody gets their own hat) = n!(1 − 1/1! + 1/2! − …) ≈ n!/e'], ['오일러 피 함수 φ(n)도 포함-배제로 구해요', 'Euler’s totient φ(n) also comes from inclusion–exclusion']]);
  S.cap(1, '두 집합을 더하면 겹친 곳이 두 번', 'Adding two sets counts the overlap twice').cap(2, '겹친 만큼 빼요', 'Subtract the overlap').cap(3, '집합이 셋이면', 'With three sets').cap(4, '1~100에서 계산', 'Counting 1 to 100').cap(5, '포함-배제의 원리', 'Inclusion–exclusion');
  return S;
}
function sStars() {
  const S = scene({ id: 'dm-stars', steps: 5, per: 1.5 });
  T(S, 'q', 1, 1, ['똑같은 사탕 5개를 아이 3명에게 나누는 방법은? (0개도 가능)', 'ways to give 5 identical candies to 3 kids (zero allowed)?'], 'dmx-s dmx-a', 1);
  const AR = [['★★|★|★★', '2, 1, 2'], ['★★★★★||', '5, 0, 0'], ['|★★|★★★', '0, 2, 3']];
  AR.forEach(([s, d], i) => { const y = 3.2 + i * 2.2; s.split('').forEach((c, j) => box2(S, `c${i}_${j}`, 1 + j * 1.6, y, 1.4, 1.6, c, c === '|' ? 'danger' : 'warn', 2, { pct: c === '|' ? 40 : 25 })); T(S, 'd' + i, 13, y + .35, ['→ 아이별 ' + d, '→ kids get ' + d], 'dmx-xs', 2); });
  T(S, 's1', 1, 10.2, ['별 5개 + 칸막이 2개 = 7자리 중 칸막이 자리 2개 고르기', '5 stars + 2 bars = choose 2 of 7 positions for the bars'], 'dmx-xs', 3);
  T(S, 's2', 1, 11.6, 'C(7, 2) = 21', 'cz-mono dmx-l dmx-g', 3);
  T(S, 'g1', 1, 13.6, ['일반형: n개를 k명에게 = C(n + k − 1, k − 1) (중복조합 H(k, n))', 'in general: n items to k people = C(n + k − 1, k − 1)'], 'cz-mono dmx-xs dmx-a', 4);
  T(S, 'g2', 1, 14.8, ['한 명당 최소 1개면 먼저 1개씩 주고 나머지를 나눠요 → C(n − 1, k − 1) = C(4, 2) = 6', 'at least one each: hand out one first → C(n − 1, k − 1) = C(4, 2) = 6'], 'cz-mono dmx-xs', 4);
  fin(S, 'z', 16.6, [['“구별 없는 물건을 구별되는 상자에” 나누는 문제를 별과 막대 배열로 바꿔 세요', 'it turns “identical items into distinct boxes” into arranging stars and bars', 'dmx-xs dmx-a'], ['x + y + z = 5의 음이 아닌 정수해 개수도 같은 21개', 'the nonnegative integer solutions of x + y + z = 5 are the same 21'], ['다항식 전개의 항 개수, 중복을 허용한 선택에도 써요', 'also counts terms of polynomial expansions and selections with repetition']]);
  S.cap(1, '나눠 주는 방법 세기', 'Counting distributions').cap(2, '별과 막대로 그려요', 'Draw it with stars and bars').cap(3, '막대 자리 고르기', 'Choose positions for the bars').cap(4, '일반 공식', 'The general formula').cap(5, '중복조합 (별과 막대)', 'Stars and bars');
  return S;
}
function sRecur() {
  const S = scene({ id: 'dm-recur', steps: 5, per: 1.5 });
  T(S, 'h', 1, .8, ['하노이 탑: 원판 n개를 옮기는 최소 횟수 aₙ', 'Tower of Hanoi: minimum moves aₙ for n disks'], 'dmx-s dmx-a', 1);
  [['n−1개를 보조 기둥으로', 'move n−1 to the spare', 'aₙ₋₁', 'accent'], ['가장 큰 원판 이동', 'move the largest', '1', 'warn'], ['n−1개를 다시 위로', 'move n−1 back on top', 'aₙ₋₁', 'accent']].forEach(([k, e, v, c], i) => { box2(S, 'st' + i, 1 + i * 7.4, 2.4, 6.8, 2, [k, e], c, 1, { pct: 22 }); T(S, 'sv' + i, 1 + i * 7.4, 4.6, v, 'cz-tc cz-mono dmx-s', 1, { w: 6.8 }); });
  T(S, 'rec', 23.6, 3, 'aₙ = 2aₙ₋₁ + 1', 'cz-mono dmx-s dmx-g', 1); T(S, 'rec2', 23.6, 4.2, 'a₁ = 1', 'cz-mono dmx-xs', 1);
  [1, 2, 3, 4, 5, 6].forEach((n, i) => { box2(S, 'tn' + i, 1 + i * 3.4, 7, 3, 1.4, 'n=' + n, 'line', 2, { pct: 40 }); box2(S, 'tv' + i, 1 + i * 3.4, 8.6, 3, 1.6, String(2 ** n - 1), 'ok', 2, { pct: 30 }); });
  T(S, 'cf', 22.6, 8, 'aₙ = 2ⁿ − 1', 'cz-mono dmx-l dmx-g', 3); T(S, 'cf2', 1, 10.6, ['귀납법으로 확인: 2(2ⁿ⁻¹ − 1) + 1 = 2ⁿ − 1 ✓', 'check by induction: 2(2ⁿ⁻¹ − 1) + 1 = 2ⁿ − 1 ✓'], 'cz-mono dmx-xs dmx-g', 3);
  T(S, 'fb', 1, 11.9, 'Fₙ = Fₙ₋₁ + Fₙ₋₂ : 1, 1, 2, 3, 5, 8, 13, 21 …', 'cz-mono dmx-s dmx-w', 4);
  T(S, 'fb2', 1, 13.2, ['특성방정식 x² = x + 1 → φ = (1 + √5)/2 ≈ 1.618 → Fₙ ≈ φⁿ/√5 (비네 공식)', 'characteristic equation x² = x + 1 → φ = (1 + √5)/2 ≈ 1.618 → Fₙ ≈ φⁿ/√5 (Binet)'], 'cz-mono dmx-xs', 4);
  notes(S, 'n', 14.6, [['n개 문제를 n−1개 문제 두 번 + 1로 쪼갤 수 있어요', 'n disks split into two (n−1)-disk problems plus one move'], ['값을 몇 개 계산해 규칙을 봐요', 'compute a few values and look for a pattern'], ['닫힌 식을 추측하고 귀납법으로 증명해요', 'guess a closed form and prove it by induction'], ['선형 점화식은 특성방정식의 근으로 풀어요', 'linear recurrences are solved through the roots of their characteristic equation']], 'dmx-s');
  fin(S, 'z', 14.6, [['점화식 = 문제를 더 작은 같은 문제로 표현한 식 · 재귀 알고리즘의 실행 시간 분석에 필수', 'a recurrence expresses a problem through smaller copies · essential for analyzing recursive algorithms', 'dmx-xs dmx-a'], ['분할 정복의 T(n) = aT(n/b) + f(n)은 마스터 정리로 한 번에 풀어요', 'divide-and-conquer recurrences T(n) = aT(n/b) + f(n) fall to the master theorem']]);
  S.cap(1, '작은 문제로 쪼개기', 'Break it into smaller copies').cap(2, '값을 나열해요', 'List the values').cap(3, '닫힌 식 aₙ = 2ⁿ − 1', 'Closed form aₙ = 2ⁿ − 1').cap(4, '피보나치와 특성방정식', 'Fibonacci and the characteristic equation').cap(5, '점화식', 'Recurrence relations');
  return S;
}
function sCatalan() {
  const S = scene({ id: 'dm-catalan', steps: 5, per: 1.5 });
  const P = ['((()))', '(()())', '(())()', '()(())', '()()()'];
  T(S, 'h', 1, .8, ['괄호 3쌍을 올바르게 짝짓는 방법', 'ways to balance 3 pairs of parentheses'], 'dmx-s dmx-a', 1);
  P.forEach((p, i) => { const x = 1 + i * 6.1; box2(S, 'p' + i, x, 2.2, 5.6, 1.6, p, 'accent', 1, { pct: 22 });
    let h = 0, pts = [[x + .3, 8.6]]; p.split('').forEach(c => { h += c === '(' ? 1 : -1; pts.push([pts[pts.length - 1][0] + .83, 8.6 - h * 1.2]); });
    hl(S, 'bs' + i, x + .3, x + 5.3, 8.6, 'line', 2, { w: .06 }); poly(S, 'dp' + i, pts, { st: 2, color: 'warn', h: .12 }); });
  T(S, 'dl', 1, 9.2, ['( = 위로, ) = 아래로: 바닥 아래로 내려가지 않는 산 모양 (디크 경로)', '( = up, ) = down: mountains that never dip below ground (Dyck paths)'], 'dmx-xs dmx-w', 2);
  const TR = [[[0, 0], [-1, 1], [-2, 2]], [[0, 0], [-1, 1], [0, 2]], [[0, 0], [-1, 1], [1, 1]], [[0, 0], [1, 1], [0, 2]], [[0, 0], [1, 1], [2, 2]]];
  TR.forEach((t, i) => { const cx = 3.8 + i * 6.1; const pts = t.map(([dx, dy]) => [cx + dx * 1.1, 10.7 + dy * 1.3]);
    if (i === 2) { seg(S, `te${i}a`, pts[0], pts[1], 3, 'ink-3', .08); seg(S, `te${i}b`, pts[0], pts[2], 3, 'ink-3', .08); } else { seg(S, `te${i}a`, pts[0], pts[1], 3, 'ink-3', .08); seg(S, `te${i}b`, pts[1], pts[2], 3, 'ink-3', .08); }
    pts.forEach(([x, y], j) => pt(S, `tn${i}_${j}`, x, y, 3, C.okf, .32)); });
  T(S, 'tl', 1, 14.4, ['노드 3개짜리 이진 트리 모양도 5가지', 'binary trees with 3 nodes: also 5 shapes'], 'dmx-xs dmx-g', 3);
  T(S, 'f', 17, 14.2, 'Cₙ = C(2n, n) / (n + 1)', 'cz-mono dmx-s dmx-a', 4); T(S, 'fs', 17, 15.4, '1, 1, 2, 5, 14, 42, 132 …', 'cz-mono dmx-xs', 4);
  fin(S, 'z', 16.8, [['카탈랑 수: 괄호 짝, 디크 경로, 이진 트리, 삼각분할 등 여러 문제의 답이 같은 수열', 'Catalan numbers count balanced parentheses, Dyck paths, binary trees, triangulations, …', 'dmx-xs dmx-a'], ['점화식 Cₙ₊₁ = Σ CᵢCₙ₋ᵢ : 첫 괄호 쌍 안과 밖으로 나눠 세요', 'recurrence Cₙ₊₁ = Σ CᵢCₙ₋ᵢ: split by what sits inside and after the first pair']]);
  S.cap(1, '올바른 괄호 5가지', 'Five balanced strings').cap(2, '산 모양 경로로 보기', 'As mountain paths').cap(3, '이진 트리도 5가지', 'Five binary trees too').cap(4, '공식', 'The formula').cap(5, '카탈랑 수', 'Catalan numbers');
  return S;
}

/* ================= relations & number theory extras ================= */
function sPoset() {
  const S = scene({ id: 'dm-poset', steps: 5, per: 1.5 });
  const P = { n1: [8, 13, '1'], n2: [4, 9.5, '2'], n3: [12, 9.5, '3'], n4: [2, 6, '4'], n6: [8, 6, '6'], n12: [8, 2.5, '12'] };
  const E = [['n1', 'n2'], ['n1', 'n3'], ['n2', 'n4'], ['n2', 'n6'], ['n3', 'n6'], ['n4', 'n12'], ['n6', 'n12']];
  E.forEach(([a, b], i) => gs(S, 'e' + i, [P[a][0], P[a][1]], [P[b][0], P[b][1]], 2, 'ink-3', .1, 1));
  Object.entries(P).forEach(([k, [x, y, l]]) => gnode(S, k, x, y, l, 'accent', 1, { r: 1 }));
  T(S, 'r', 15, 1.4, ['관계: a | b (a가 b를 나눔)', 'relation: a | b (a divides b)'], 'dmx-s dmx-a', 1);
  [['반사: a | a', 'reflexive: a | a'], ['반대칭: a | b, b | a → a = b', 'antisymmetric: a | b and b | a → a = b'], ['추이: a | b, b | c → a | c', 'transitive: a | b and b | c → a | c']].forEach((t, i) => T(S, 'pp' + i, 15, 2.8 + i * 1.1, t, 'cz-mono dmx-xs', 1));
  T(S, 'hs', 15, 6.4, ['하세 도표: 바로 위 관계만 선으로', 'Hasse diagram: only direct covers, upward'], 'dmx-xs', 2);
  T(S, 'hs2', 15, 7.4, ['(추이·반사로 나오는 선은 생략)', '(edges implied by transitivity are omitted)'], 'dmx-xs', 2);
  tsets(S, 'n2', [[3, 'warn', 40], [4, 'ok', 45]]); tsets(S, 'n3', [[3, 'warn', 40], [4, 'accent', 14]]);
  T(S, 'ic', 15, 8.8, ['2와 3은 비교할 수 없어요', '2 and 3 are incomparable:'], 'dmx-xs dmx-w', 3); T(S, 'ic2', 15, 9.8, ['어느 쪽도 나누지 않으니까 → 부분 순서', 'neither divides the other → a partial order'], 'dmx-xs dmx-w', 3);
  tsets(S, 'n4', [[4, 'accent', 40]]); tsets(S, 'n6', [[4, 'accent', 40]]); tsets(S, 'n12', [[4, 'ok', 45]]);
  T(S, 'lt', 15, 11.2, ['4, 6의 최소 상계 = 12 (최소공배수)', 'join of 4 and 6 = 12 (lcm)'], 'dmx-xs dmx-g', 4); T(S, 'lt2', 15, 12.2, ['최대 하계 = 2 (최대공약수) → 격자', 'meet = 2 (gcd) → a lattice'], 'dmx-xs dmx-g', 4);
  T(S, 'tp', 15, 13.4, ['위상 정렬로 한 줄 세우기: 1, 2, 3, 4, 6, 12', 'topological sort: 1, 2, 3, 4, 6, 12'], 'dmx-xs', 4);
  fin(S, 'z', 15.4, [['부분 순서: 반사·반대칭·추이를 만족하지만 모든 쌍이 비교되지는 않는 순서', 'a partial order is reflexive, antisymmetric and transitive, but not every pair need compare', 'dmx-xs dmx-a'], ['작업 의존성(빌드 순서), 집합의 포함 관계, 분산 시스템의 사건 순서(happens-before)', 'task dependencies (build order), set inclusion, event order in distributed systems (happens-before)']]);
  S.cap(1, '나누어떨어짐 관계', 'The divisibility relation').cap(2, '하세 도표', 'A Hasse diagram').cap(3, '비교할 수 없는 쌍', 'Incomparable pairs').cap(4, '최소 상계와 최대 하계', 'Joins and meets').cap(5, '부분 순서 집합', 'Partially ordered sets');
  return S;
}
function sClosureRel() {
  const S = scene({ id: 'dm-closure', steps: 5, per: 1.5 });
  const P = { 1: [3, 3], 2: [11, 3], 3: [11, 10], 4: [3, 10] }, E = [[1, 2], [2, 3], [3, 4]];
  Object.entries(P).forEach(([k, [x, y]]) => gnode(S, 'v' + k, x, y, k, 'accent', 1, { r: 1 }));
  E.forEach(([a, b], i) => trn(S, 'e' + i, P[a], P[b], '', 1, { r: 1, color: 'ink-3' }));
  const M = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0]], MC = [[0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1], [0, 0, 0, 0]];
  [1, 2, 3, 4].forEach((h, j) => { T(S, 'mh' + j, 17.6 + j * 2.4, 1.2, String(h), 'cz-tc cz-mono dmx-xs', 1, { w: 2.2 }); T(S, 'mr' + j, 16.2, 2.6 + j * 2, String(h), 'cz-mono dmx-xs', 1); });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const k = `m${i}_${j}`, x = 17.6 + j * 2.4, y = 2.2 + i * 2, s = i === 0 && j === 3 ? 4 : 3;
    box2(S, k, x, y, 2.2, 1.7, '', M[i][j] ? 'accent' : 'line', 1, { pct: M[i][j] ? 30 : 40 });
    if (M[i][j]) T(S, k + 'd', x, y + .35, '1', 'cz-tc cz-mono dmx-s dmx-a', 1, { w: 2.2 });
    else if (MC[i][j]) { T(S, k + 'd', x, y + .35, '0', 'cz-tc cz-mono dmx-s', 1, { w: 2.2, off: s }); T(S, k + 'n', x, y + .35, '1', 'cz-tc cz-mono dmx-s dmx-g', s, { w: 2.2 }); tsets(S, k, [[s, 'ok', 40]]); }
    else T(S, k + 'd', x, y + .35, '0', 'cz-tc cz-mono dmx-s', 1, { w: 2.2 }); }
  T(S, 'pr', 1, 12.6, ['반사 ✗ (1→1 없음) · 대칭 ✗ (1→2인데 2→1 없음) · 추이 ✗ (1→2→3인데 1→3 없음)', 'reflexive ✗ (no 1→1) · symmetric ✗ (1→2 but no 2→1) · transitive ✗ (1→2→3 but no 1→3)'], 'dmx-xs dmx-r', 2, { off: 3 });
  trn(S, 'n1', P[1], P[3], '', 3, { r: 1, color: 'ok' }); trn(S, 'n2', P[2], P[4], '', 3, { r: 1, color: 'ok' });
  trn(S, 'n3', P[1], P[4], '', 4, { r: 1, color: 'ok' });
  T(S, 'ws', 1, 12.6, ['와셜 알고리즘: k = 1…n 마다 “i→k이고 k→j면 i→j” 추가 · O(n³)', 'Warshall: for k = 1…n add i→j whenever i→k and k→j · O(n³)'], 'dmx-xs dmx-g', 3);
  T(S, 'ws2', 1, 13.8, ['결과 = 추이적 폐포: “i에서 j로 갈 수 있나”의 표', 'the result is the transitive closure: “can i reach j?”'], 'dmx-xs dmx-g', 4);
  fin(S, 'z', 15.4, [['관계 = 순서쌍의 집합 · 그래프와 0/1 행렬로 같은 것을 나타내요', 'a relation is a set of ordered pairs · graphs and 0/1 matrices represent the same thing', 'dmx-xs dmx-a'], ['폐포: 성질을 만족하도록 최소한으로 쌍을 더한 관계 (반사·대칭·추이 폐포)', 'a closure adds the fewest pairs needed for a property (reflexive, symmetric, transitive)'], ['SQL의 WITH RECURSIVE, 조직도의 모든 상사 찾기, 친구의 친구 검색이 추이 폐포', 'SQL WITH RECURSIVE, finding every manager up an org chart and friends-of-friends are transitive closures']]);
  S.cap(1, '관계를 그래프와 행렬로', 'A relation as a graph and a matrix').cap(2, '세 가지 성질 검사', 'Check the three properties').cap(3, '경유해서 가는 쌍 추가', 'Add pairs reachable through others').cap(4, '추이적 폐포 완성', 'The transitive closure').cap(5, '관계의 성질과 폐포', 'Properties and closures of relations');
  return S;
}
function sSieve() {
  const S = scene({ id: 'dm-prime', steps: 5, per: 1.5 });
  const X = n => 1 + ((n - 2) % 10) * 2.6, Y = n => 1.4 + Math.floor((n - 2) / 10) * 2, isP = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const firstDiv = n => { for (const d of [2, 3, 5, 7]) if (n % d === 0 && n !== d) return d; return 0; }, ST = { 2: 1, 3: 2, 5: 3, 7: 3 };
  for (let n = 2; n <= 51; n++) { const k = 'c' + n; box2(S, k, X(n), Y(n), 2.3, 1.7, String(n), 'line', 0, { pct: 40 }); const d = firstDiv(n);
    if (d) { tsets(S, k, [[ST[d], 'danger', 18]]); S.set(k, ST[d], { opacity: '.35' }); } else if (isP(n)) tsets(S, k, [[ST[n] || 4, 'ok', 45]]); }
  T(S, 's1', 1, 12, ['2를 남기고 2의 배수를 지워요', 'keep 2, cross out its multiples'], 'dmx-s', 1, { off: 2 }); T(S, 's2', 1, 12, ['다음 남은 수 3의 배수를 지워요', 'next survivor 3: cross out its multiples'], 'dmx-s', 2, { off: 3 });
  T(S, 's3', 1, 12, ['5, 7의 배수까지 · √51 ≈ 7.1 이라 여기서 끝', 'then 5 and 7 · √51 ≈ 7.1, so we can stop'], 'dmx-s', 3, { off: 4 });
  T(S, 's4', 1, 12, ['남은 수가 모두 소수: 2, 3, 5, 7, 11, … 47', 'everything left is prime: 2, 3, 5, 7, 11, … 47'], 'dmx-s dmx-g', 4);
  T(S, 'ft', 1, 13.6, ['산술의 기본 정리: 360 = 2³ · 3² · 5 (소인수분해는 하나뿐)', 'fundamental theorem of arithmetic: 360 = 2³ · 3² · 5 (a unique factorization)'], 'cz-mono dmx-xs dmx-a', 4);
  fin(S, 'z', 15.2, [['에라토스테네스의 체: O(n log log n) · 지울 때 p²부터 시작하면 충분', 'the sieve of Eratosthenes runs in O(n log log n) · crossing out can start at p²', 'dmx-xs dmx-a'], ['소수는 무한히 많아요 (유클리드: p₁p₂…pₖ + 1을 생각)', 'there are infinitely many primes (Euclid: consider p₁p₂…pₖ + 1)'], ['큰 수의 소인수분해가 어렵다는 사실이 RSA의 안전성을 받쳐요', 'the difficulty of factoring large numbers underpins RSA']]);
  S.cap(1, '2의 배수 지우기', 'Cross out multiples of 2').cap(2, '3의 배수 지우기', 'Cross out multiples of 3').cap(3, '5와 7까지', 'Then 5 and 7').cap(4, '남은 것이 소수', 'What remains is prime').cap(5, '소수와 에라토스테네스의 체', 'Primes and the sieve of Eratosthenes');
  return S;
}
function sRsa() {
  const S = scene({ id: 'dm-rsa', steps: 5, per: 1.5 });
  lines(S, 'k', 1, 1, 1.3, [[['① 소수 p = 5, q = 11', '① primes p = 5, q = 11'], 1, 'cz-mono dmx-s'], ['② n = pq = 55', 1, 'cz-mono dmx-s'], ['③ φ(n) = (p−1)(q−1) = 40', 1, 'cz-mono dmx-s']]);
  lines(S, 'e', 1, 5.4, 1.3, [[['④ e = 3  (gcd(3, 40) = 1)', '④ e = 3  (gcd(3, 40) = 1)'], 2, 'cz-mono dmx-s dmx-a'], [['⑤ d = 27  (3 · 27 = 81 ≡ 1 mod 40)', '⑤ d = 27  (3 · 27 = 81 ≡ 1 mod 40)'], 2, 'cz-mono dmx-s dmx-r']]);
  T(S, 'eu', 1, 8.2, ['d = e의 모듈러 역원 (확장 유클리드)', 'd = e⁻¹ mod φ(n) (extended Euclid)'], 'dmx-xs', 2);
  box2(S, 'pub', 18, 1.2, 12, 2, ['공개키 (n, e) = (55, 3)', 'public key (n, e) = (55, 3)'], 'accent', 2, { pct: 25 }); box2(S, 'prv', 18, 3.8, 12, 2, ['개인키 d = 27 (비밀)', 'private key d = 27 (secret)'], 'danger', 2, { pct: 25 });
  T(S, 'enc', 1, 10, 'c = mᵉ mod n = 7³ mod 55 = 343 mod 55 = 13', 'cz-mono dmx-s dmx-a', 3); box2(S, 'm', 18, 7, 4, 1.8, 'm = 7', 'ok', 3, { pct: 30 }); ar(S, 'ma', [22.1, 7.9], [24.9, 7.9], 'accent', 3, { h: .12 }); box2(S, 'c', 25, 7, 5, 1.8, 'c = 13', 'accent', 3, { pct: 30 });
  T(S, 'dec', 1, 11.6, 'm = cᵈ mod n = 13²⁷ mod 55', 'cz-mono dmx-s dmx-r', 4);
  T(S, 'sq', 1, 12.9, ['반복 제곱: 13² ≡ 4, 13⁴ ≡ 16, 13⁸ ≡ 36, 13¹⁶ ≡ 31', 'repeated squaring: 13² ≡ 4, 13⁴ ≡ 16, 13⁸ ≡ 36, 13¹⁶ ≡ 31'], 'cz-mono dmx-xs', 4);
  T(S, 'sq2', 1, 14, '13²⁷ = 13¹⁶·13⁸·13²·13 ≡ 31·36·4·13 ≡ 7 ✓', 'cz-mono dmx-xs dmx-g', 4);
  ar(S, 'ca', [27.5, 9], [27.5, 10.2], 'danger', 4, { h: .1 }); box2(S, 'm2', 25, 10.3, 5, 1.6, 'm = 7 ✓', 'ok', 4, { pct: 35 });
  fin(S, 'z', 15.6, [['왜 될까? 오일러 정리 m^φ(n) ≡ 1 (mod n) → m^(ed) = m^(1 + kφ) ≡ m', 'why it works: Euler’s theorem m^φ(n) ≡ 1 (mod n) → m^(ed) = m^(1 + kφ) ≡ m', 'cz-mono dmx-xs dmx-a'], ['n은 공개돼도 p, q를 모르면 φ(n)과 d를 구할 수 없어요 → 소인수분해의 어려움이 안전성', 'n is public, but without p and q you can’t find φ(n) or d → security rests on factoring'], ['실제 키는 2048비트 이상 · 거듭제곱은 반복 제곱으로 O(log e)번 곱셈', 'real keys are 2048+ bits · exponentiation takes O(log e) multiplications by repeated squaring']]);
  S.cap(1, '두 소수로 n과 φ(n)', 'n and φ(n) from two primes').cap(2, '공개 지수와 비밀 지수', 'Public and private exponents').cap(3, '암호화: 거듭제곱의 나머지', 'Encrypt: a power, mod n').cap(4, '복호화로 원래 값', 'Decrypt back to the original').cap(5, '정수론으로 보는 RSA', 'RSA through number theory');
  return S;
}

/* ================= graph extras ================= */
function sHamilton() {
  const S = scene({ id: 'dm-hamilton', steps: 5, per: 1.5 });
  const P = { a: [4, 3], b: [11, 2.4], c: [14.6, 7.4], d: [11, 12], e: [4, 11.6], f: [8, 7.4] }, E = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'a'], ['a', 'f'], ['b', 'f'], ['f', 'd'], ['c', 'f']];
  E.forEach(([u, v], i) => gs(S, 'e' + i, P[u], P[v], 0, 'ink-3', .1, .9));
  Object.entries(P).forEach(([k, [x, y]]) => gnode(S, 'v' + k, x, y, k, 'accent', 0, { r: .9 }));
  T(S, 'eu', 17, 1.2, ['오일러: 모든 간선을 한 번씩', 'Euler: every edge once'], 'dmx-s dmx-a', 1); T(S, 'eu2', 17, 2.4, ['→ 차수만 보면 판정 (쉬움)', '→ check the degrees (easy)'], 'dmx-xs', 1);
  T(S, 'ha', 17, 4, ['해밀턴: 모든 정점을 한 번씩', 'Hamilton: every vertex once'], 'dmx-s dmx-w', 2); T(S, 'ha2', 17, 5.2, ['→ 쉬운 판정법 없음 (NP-완전)', '→ no easy test (NP-complete)'], 'dmx-xs dmx-r', 2);
  const H = ['a', 'b', 'c', 'f', 'd', 'e', 'a'];
  for (let i = 0; i < H.length - 1; i++) gs(S, 'h' + i, P[H[i]], P[H[i + 1]], 3, 'ok', .2, .9);
  T(S, 'hc', 17, 6.8, ['백트래킹으로 찾은 회로', 'a cycle found by backtracking'], 'dmx-xs dmx-g', 3); T(S, 'hc2', 17, 7.8, 'a → b → c → f → d → e → a', 'cz-mono dmx-xs dmx-g', 3);
  T(S, 'di', 17, 9.4, ['디랙 정리: 모든 차수 ≥ n/2 → 회로 존재', 'Dirac: all degrees ≥ n/2 → a cycle exists'], 'dmx-xs dmx-a', 4);
  T(S, 'di2', 17, 10.5, ['충분조건일 뿐이에요:', 'only a sufficient condition:'], 'dmx-xs', 4); T(S, 'di3', 17, 11.5, ['e의 차수 2 < 3인데도 회로가 있어요', 'deg(e) = 2 < 3, yet a cycle exists'], 'dmx-xs', 4);
  tsets(S, 've', [[4, 'warn', 40]]);
  fin(S, 'z', 14.6, [['비슷해 보이는 두 문제가 난이도는 하늘과 땅: 간선 기준은 쉽고, 정점 기준은 어려워요', 'two look-alike problems, worlds apart: edges are easy, vertices are hard', 'dmx-xs dmx-a'], ['가중치를 붙이면 외판원 문제(TSP) · 배송 경로, 회로 기판 드릴 순서', 'add weights and it becomes the travelling salesman problem: delivery routes, PCB drilling order'], ['작은 n은 비트마스크 DP O(2ⁿn²), 큰 n은 근사·휴리스틱', 'small n: bitmask DP in O(2ⁿn²); large n: approximation and heuristics']]);
  S.cap(1, '오일러 경로는 쉬워요', 'Euler paths are easy').cap(2, '해밀턴은 어려워요', 'Hamiltonian ones are hard').cap(3, '하나 찾았어요', 'Found one').cap(4, '충분조건', 'A sufficient condition').cap(5, '해밀턴 경로와 회로', 'Hamiltonian paths and cycles');
  return S;
}
function sBipartite() {
  const S = scene({ id: 'dm-bipartite', steps: 5, per: 1.5 });
  const W = ['민지', '준호', '서연', '도윤'], WE = ['Mina', 'Jun', 'Seo', 'Dan'], J = ['FE', 'BE', 'DB', 'QA'];
  const E = [[0, 2], [1, 1], [1, 2], [2, 0], [2, 3], [3, 2]], MATCH = [[0, 2], [1, 1], [2, 0]];
  W.forEach((w, i) => gnode(S, 'w' + i, 4, 2.6 + i * 3, [w, WE[i]], 'ink-3', 0, { r: 1.1 })); J.forEach((j, i) => gnode(S, 'j' + i, 14, 2.6 + i * 3, j, 'ink-3', 0, { r: 1.1 }));
  E.forEach(([a, b], i) => seg(S, 'e' + i, [5.1, 2.6 + a * 3], [12.9, 2.6 + b * 3], 0, 'ink-3', .08));
  W.forEach((w, i) => tsets(S, 'w' + i, [[1, 'accent', 40]])); J.forEach((j, i) => tsets(S, 'j' + i, [[1, 'warn', 40]]));
  T(S, 'c1', 17, 1, ['두 색으로 칠할 수 있으면 이분 그래프', 'bipartite = two-colorable'], 'dmx-s dmx-a', 1); T(S, 'c2', 17, 2.2, ['같은 색끼리는 간선이 없어요', 'no edge joins two same colors'], 'dmx-xs', 1); T(S, 'c3', 17, 3.2, ['BFS로 번갈아 칠해서 확인', 'check by alternating colors with BFS'], 'dmx-xs', 1);
  [[22, 6.4], [28, 6.4], [25, 10.4]].forEach(([x, y], i) => gnode(S, 'o' + i, x, y, '', i === 2 ? 'danger' : i ? 'warn' : 'accent', 2, { r: .8, pct: 40 }));
  seg(S, 'oe0', [22.8, 6.4], [27.2, 6.4], 2, 'ink-3', .08); seg(S, 'oe1', [22.5, 7.1], [24.5, 9.7], 2, 'ink-3', .08); seg(S, 'oe2', [27.5, 7.1], [25.5, 9.7], 2, 'danger', .12);
  T(S, 'oc', 17, 11.4, ['홀수 사이클이 있으면 이분 그래프가 아니에요', 'an odd cycle means not bipartite'], 'dmx-xs dmx-r', 2);
  MATCH.forEach(([a, b], i) => seg(S, 'm' + i, [5.1, 2.6 + a * 3], [12.9, 2.6 + b * 3], 3, 'ok', .22));
  T(S, 'mt', 17, 12.8, ['매칭: 사람–일을 겹치지 않게 짝짓기', 'matching: pair people and jobs, no sharing'], 'dmx-xs dmx-g', 3, { off: 4 });
  T(S, 'mt2', 17, 13.8, ['민지–DB, 준호–BE, 서연–FE (3쌍)', 'Mina–DB, Jun–BE, Seo–FE (3 pairs)'], 'dmx-xs dmx-g', 3, { off: 4 });
  T(S, 'mx', 17, 12.8, ['민지·도윤은 둘 다 DB만 가능', 'Mina and Dan can only take DB'], 'dmx-xs dmx-w', 4);
  T(S, 'mx2', 17, 13.8, ['2명에 이웃 1개 → 홀 조건 위반, 최대 3쌍', '2 people, 1 neighbor → Hall fails: max 3'], 'dmx-xs dmx-w', 4);
  tsets(S, 'w3', [[4, 'danger', 40]]); tsets(S, 'w0', [[4, 'danger', 40]]); tsets(S, 'j2', [[4, 'danger', 40]]);
  fin(S, 'z', 15.6, [['최대 매칭은 증가 경로를 찾아 늘려 가요 (호프크로프트–카프 O(E√V))', 'maximum matching grows via augmenting paths (Hopcroft–Karp in O(E√V))', 'dmx-xs dmx-a'], ['홀의 정리: 왼쪽 어떤 k명도 오른쪽 이웃이 k개 이상이면 모두 짝지을 수 있어요', 'Hall: everyone on the left can be matched iff every group of k has at least k neighbors'], ['업무 배정, 수강 신청, 추천 시스템의 사용자–상품 그래프', 'task assignment, course allocation, user–item graphs in recommenders']]);
  S.cap(1, '두 쪽으로 나뉜 그래프', 'A graph with two sides').cap(2, '홀수 사이클이면 실패', 'Odd cycles break it').cap(3, '매칭 찾기', 'Find a matching').cap(4, '모두 짝지을 수 있을까', 'Can everyone be matched?').cap(5, '이분 그래프와 매칭', 'Bipartite graphs and matching');
  return S;
}
function sPlanar() {
  const S = scene({ id: 'dm-planar', steps: 5, per: 1.5 });
  const A = [3, 3], B = [13, 3], Cc = [13, 13], D = [3, 13];
  [[A, B], [B, Cc], [Cc, D], [D, A], [A, Cc]].forEach(([p, q], i) => gs(S, 'k' + i, p, q, 0, 'ink-3', .1, .9));
  gs(S, 'x', B, D, 1, 'danger', .12, .9, { off: 2 }); xm(S, 'xx', 8, 8.3, 1, { off: 2 });
  poly(S, 'r', [[13, 2.1], [13, 1], [16, 1], [16, 15.6], [3, 15.6], [3, 13.9]], { st: 2, color: 'ok', h: .12 });
  [[A, 'a'], [B, 'b'], [Cc, 'c'], [D, 'd']].forEach(([[x, y], l]) => gnode(S, 'v' + l, x, y, l, 'accent', 0, { r: .9 }));
  T(S, 'k4', 1, .2, ['K₄: 정점 4개가 모두 연결', 'K₄: four mutually connected vertices'], 'dmx-xs dmx-a', 0);
  T(S, 'f1', 9.4, 4.8, 'F1', 'cz-mono dmx-s dmx-w', 3); T(S, 'f2', 4.8, 9.8, 'F2', 'cz-mono dmx-s dmx-w', 3); T(S, 'f3', 14.1, 8.4, 'F3', 'cz-mono dmx-s dmx-w', 3); T(S, 'f4', 16.8, 13.4, ['F4 (바깥)', 'F4 (outer)'], 'cz-mono dmx-s dmx-w', 3);
  T(S, 'eq', 19, 2.4, 'V − E + F = 2', 'cz-mono dmx-l dmx-g', 3); T(S, 'eq2', 19, 4.2, '4 − 6 + 4 = 2 ✓', 'cz-mono dmx-s', 3);
  T(S, 'k5', 19, 6.4, ['K₅: V = 5, E = 10', 'K₅: V = 5, E = 10'], 'cz-mono dmx-s dmx-r', 4); T(S, 'k5b', 19, 7.8, ['평면이면 E ≤ 3V − 6 = 9 인데 10 ✗', 'planar needs E ≤ 3V − 6 = 9, but E = 10 ✗'], 'dmx-xs dmx-r', 4);
  T(S, 'k5c', 19, 9, ['K₅, K₃,₃는 평면에 못 그려요', 'K₅ and K₃,₃ are not planar'], 'dmx-xs', 4); T(S, 'k5d', 19, 10, ['(쿠라토프스키 정리)', '(Kuratowski’s theorem)'], 'dmx-xs', 4);
  fin(S, 'z', 16.8, [['평면 그래프: 간선이 교차하지 않게 그릴 수 있는 그래프 · 오일러 공식 V − E + F = 2', 'planar graphs can be drawn without crossings · Euler’s formula V − E + F = 2', 'dmx-xs dmx-a'], ['회로 기판 배선, 지하철 노선도, 지도 색칠(4색 정리)과 이어져요', 'connected to circuit-board routing, transit maps and map coloring (the four color theorem)']]);
  S.cap(1, '교차하는 그림', 'A drawing with a crossing').cap(2, '돌려 그리면 교차가 사라져요', 'Reroute an edge and it vanishes').cap(3, '면을 세면 V − E + F = 2', 'Count faces: V − E + F = 2').cap(4, 'K₅는 불가능', 'K₅ is impossible').cap(5, '평면 그래프와 오일러 공식', 'Planar graphs and Euler’s formula');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'dmx-xs', i + 1, { off: i + 2 }));
function sAugment() {
  const S = scene({ id: 'dm-augment', steps: 5, per: 1.7 });
  const LY = i => 2.4 + i * 3.1, LX = 4, RX = 13.6, LN = ['A', 'B', 'C', 'D'], RN = ['1', '2', '3', '4'];
  const E = [[0, 0], [0, 1], [1, 1], [1, 3], [2, 0], [2, 2], [3, 1]], M0 = [[0, 0], [1, 1], [2, 2]], M1 = [[0, 0], [1, 3], [2, 2], [3, 1]];
  const P = (a, b) => [[LX + 1.1, LY(a)], [RX - 1.1, LY(b)]];
  LN.forEach((n, i) => gnode(S, 'l' + i, LX, LY(i), n, 'accent', 0, { r: 1.0, pct: 20 })); RN.forEach((n, i) => gnode(S, 'r' + i, RX, LY(i), n, 'warn', 0, { r: 1.0, pct: 20 }));
  T(S, 'lh', LX - 2, .2, ['사람', 'people'], 'cz-tc dmx-xs dmx-a', 0, { w: 4 }); T(S, 'rh', RX - 2, .2, ['일', 'jobs'], 'cz-tc dmx-xs dmx-w', 0, { w: 4 });
  E.forEach(([a, b], i) => seg(S, 'e' + i, ...P(a, b), 0, 'line', .08));
  M0.forEach(([a, b], i) => seg(S, 'm' + i, ...P(a, b), 2, 'ok', .24, { off: a === 1 ? 4 : 0 }));
  tsets(S, 'l3', [[2, 'danger', 35], [4, 'ok', 30]]); tsets(S, 'r3', [[2, 'danger', 35], [4, 'ok', 30]]);
  [[3, 1, 'warn'], [1, 1, 'danger'], [1, 3, 'warn']].forEach(([a, b, c], i) => seg(S, 'ap' + i, ...P(a, b), 3, c, .14, { dash: c === 'warn' ? 1 : 0, off: 4 }));
  [[3, 1], [1, 3]].forEach(([a, b], i) => seg(S, 'n' + i, ...P(a, b), 4, 'ok', .24));
  const R = 17.6;
  T(S, 'r1', R, .8, ['매칭: 겹치지 않게 짝지은 간선들', 'a matching: edges with no shared vertex'], 'dmx-xs', 1, { w: 13.4 });
  T(S, 'r2', R, 2.4, ['욕심껏 3쌍 · D와 4가 남았어요', 'greedy finds 3 pairs · D and 4 are left'], 'dmx-xs dmx-r', 2, { w: 13.4 });
  T(S, 'r3', R, 4.2, ['증가 경로: 빈 정점에서 빈 정점까지', 'augmenting path: free vertex to free vertex'], 'dmx-xs dmx-w', 3, { w: 13.4 });
  T(S, 'r4', R, 5.4, ['D – 2 = B – 4', 'D – 2 = B – 4'], 'cz-mono dmx-s dmx-w', 3);
  T(S, 'r5', R, 6.6, ['안 쓴 간선(–)과 쓴 간선(=)이 번갈아', 'unused (–) and used (=) edges alternate'], 'dmx-xs', 3, { w: 13.4 });
  T(S, 'r6', R, 8.4, ['경로의 간선을 모두 뒤집으면', 'flip every edge on the path'], 'dmx-xs dmx-g', 4, { w: 13.4 });
  T(S, 'r7', R, 9.6, ['쓴 것 1개 → 안 씀, 안 쓴 것 2개 → 씀', '1 used → unused, 2 unused → used'], 'dmx-xs', 4, { w: 13.4 });
  T(S, 'r8', R, 10.8, ['매칭 3 → 4 (완전 매칭) ✓', 'matching 3 → 4 (perfect) ✓'], 'dmx-s dmx-g', 4);
  notesSplit(S, 'k', 15.6, [['사람 4명과 일 4개, 할 수 있는 조합이 간선이에요 · 겹치지 않게 최대한 많이 짝지으려 해요', 'four people, four jobs, edges for who can do what · pair up as many as possible without sharing'], ['앞에서부터 욕심껏 짝지으면 3쌍에서 막혀요 · D와 4번 일이 남아요', 'greedy pairing from the top gets stuck at 3 · D and job 4 are left over'], ['빈 D에서 시작해 안 쓴 간선과 쓴 간선을 번갈아 밟아 빈 4에 닿는 길이 증가 경로', 'a path from free D to free 4 that alternates unused and used edges is an augmenting path'], ['그 길의 간선을 모두 뒤집으면 짝이 하나 늘어요 · B는 4번 일로 옮기고 D가 2번을 맡아요', 'flipping its edges adds one pair · B moves to job 4 and D takes job 2']]);
  fin(S, 'z', 15.6, [['베르주 정리: 증가 경로가 없을 때에만 최대 매칭이에요', 'Berge’s theorem: a matching is maximum exactly when no augmenting path exists', 'dmx-xs dmx-a'], ['증가 경로를 BFS·DFS로 찾아 반복 · 호프크로프트–카프는 O(E√V)', 'repeat with BFS or DFS to find paths · Hopcroft–Karp runs in O(E√V)'], ['배정 문제(가중치가 있으면 헝가리안 알고리즘), 최대 유량 문제와 같은 원리예요', 'assignment problems (the Hungarian algorithm with weights) and maximum flow share the idea']]);
  S.cap(1, '누가 어떤 일을 할 수 있나', 'Who can do which job').cap(2, '욕심껏 짝지으면 3쌍', 'Greedy stops at three').cap(3, '증가 경로 찾기', 'Find an augmenting path').cap(4, '뒤집으면 하나 더', 'Flip it for one more').cap(5, '증가 경로와 최대 매칭', 'Augmenting paths and maximum matching');
  return S;
}

return { css: CSSX, secs: [], add: {
  'dm-sets': [
    item('dm-proof', '증명 기법', 'Proof techniques', '수학에서 “항상 참”임을 보이는 대표적인 방법: 직접 증명, 대우 증명, 귀류법, 그리고 반례예요.', '직접 증명은 가정에서 결론으로 바로 가요(n이 홀수면 n² = 2(2k² + 2k) + 1도 홀수). 대우 증명은 p → q 대신 동치인 ¬q → ¬p를 보이고, 귀류법은 결론의 부정을 가정해 모순을 끌어내요(√2가 유리수라면 분자·분모가 모두 짝수가 되어 모순). “모든 ~”이라는 주장은 반례 하나로 무너뜨릴 수 있어요. 알고리즘의 정확성 증명(루프 불변식)도 이 도구들을 써요.', 'The standard ways to show something is always true: direct proof, contrapositive, contradiction, and counterexamples.', 'A direct proof goes from hypothesis to conclusion (if n is odd, n² = 2(2k² + 2k) + 1 is odd). A contrapositive proof shows the equivalent ¬q → ¬p instead of p → q, and proof by contradiction assumes the negation and derives an absurdity (if √2 were rational, numerator and denominator would both be even). A single counterexample refutes a “for all” claim. Algorithm correctness proofs (loop invariants) use the same tools.', sProof()),
    item('dm-infer', '추론 규칙', 'Rules of inference', '참인 전제에서 항상 참인 결론을 끌어내는 논리의 형식이에요. 긍정 논법, 부정 논법, 삼단 논법이 대표적이에요.', '“p → q이고 p이면 q”(긍정 논법), “p → q이고 ¬q이면 ¬p”(부정 논법), “p → q, q → r이면 p → r”(가언 삼단 논법)은 항상 타당해요. 반면 “p → q이고 q이면 p”는 후건 긍정의 오류예요. 땅이 젖었다고 비가 왔다는 보장은 없어요. 자동 정리 증명기와 Prolog는 이런 규칙(특히 융해법)을 기계적으로 적용해요.', 'Logical forms that always take true premises to true conclusions, such as modus ponens, modus tollens and syllogisms.', '“p → q and p, therefore q” (modus ponens), “p → q and ¬q, therefore ¬p” (modus tollens) and “p → q and q → r, therefore p → r” (hypothetical syllogism) are always valid. “p → q and q, therefore p” is the fallacy of affirming the consequent: wet ground doesn’t prove it rained. Automated theorem provers and Prolog apply such rules, especially resolution, mechanically.', sInfer()),
    item('dm-power', '멱집합과 곱집합', 'Power sets and Cartesian products', '멱집합은 모든 부분집합의 집합(크기 2ⁿ), 곱집합은 두 집합에서 하나씩 뽑은 순서쌍 전체(크기 |A|·|B|)예요.', '원소 n개의 부분집합은 각 원소를 넣을까 말까를 정하는 n비트 문자열과 1:1로 대응해서 2ⁿ개예요. 그래서 프로그램에서는 부분집합을 0 ~ 2ⁿ−1 정수(비트마스크)로 다뤄 완전 탐색과 비트 DP를 해요. 곱집합 A × B는 (a, b) 순서쌍 전체이고, 데이터베이스의 테이블(관계)은 열 값 집합들의 곱집합의 부분집합이에요.', 'The power set is the set of all subsets (size 2ⁿ); the Cartesian product is every ordered pair drawn from two sets (size |A|·|B|).', 'Subsets of an n-element set correspond one-to-one with n-bit strings, one bit per “in or out”, so there are 2ⁿ of them; programs therefore treat subsets as integers 0 … 2ⁿ−1 (bitmasks) for brute force and bitmask DP. A × B is all ordered pairs (a, b), and a database table (relation) is a subset of the product of its column domains.', sPower())
  ],
  'dm-count': [
    item('dm-incl', '포함-배제의 원리', 'Inclusion–exclusion', '여러 집합의 합집합 크기를 셀 때, 더하고 겹친 만큼 빼고 너무 뺀 만큼 다시 더해요.', '|A ∪ B| = |A| + |B| − |A ∩ B|이고, 세 집합이면 하나씩 더하고 둘씩 겹친 것을 빼고 셋 다 겹친 것을 더해요. 1~100 중 2, 3, 5 중 하나로 나누어지는 수는 (50 + 33 + 20) − (16 + 10 + 6) + 3 = 74개예요. 아무도 자기 모자를 못 받는 교란 순열의 수 n!(1 − 1/1! + 1/2! − …) ≈ n!/e와 오일러 피 함수도 같은 원리로 구해요.', 'To count a union of sets, add the sets, subtract the overlaps, then add back what was subtracted too often.', '|A ∪ B| = |A| + |B| − |A ∩ B|; for three sets add the singles, subtract the pairwise overlaps and add the triple overlap. Among 1–100, the numbers divisible by 2, 3 or 5 number (50 + 33 + 20) − (16 + 10 + 6) + 3 = 74. Derangements, where nobody gets their own hat, number n!(1 − 1/1! + 1/2! − …) ≈ n!/e, and Euler’s totient follows the same principle.', sIncl()),
    item('dm-stars', '중복조합 (별과 막대)', 'Stars and bars', '구별 없는 물건을 구별되는 상자에 나누는 방법의 수를, 별과 칸막이를 늘어놓는 문제로 바꿔 세요.', '사탕 5개를 3명에게 나누는 방법은 별 5개와 칸막이 2개를 배열하는 방법, 즉 7자리 중 칸막이 자리 2개를 고르는 C(7, 2) = 21가지예요. 일반적으로 n개를 k명에게 = C(n + k − 1, k − 1)이고, 모두 최소 1개씩이면 먼저 하나씩 주고 C(n − 1, k − 1)이에요. x + y + z = 5의 음이 아닌 정수해 개수, 중복을 허용한 선택의 수도 같은 식이에요.', 'Count ways to put identical items into distinct boxes by arranging stars and dividers.', 'Five candies for three kids is an arrangement of 5 stars and 2 bars, i.e. choosing 2 of 7 positions for the bars: C(7, 2) = 21. In general n items to k people gives C(n + k − 1, k − 1), and if everyone needs at least one, hand those out first for C(n − 1, k − 1). The number of nonnegative integer solutions to x + y + z = 5 and selections with repetition follow the same formula.', sStars()),
    item('dm-recur', '점화식', 'Recurrence relations', '문제를 더 작은 같은 문제로 표현한 식이에요. 값을 나열하고 닫힌 식을 추측해 귀납법으로 증명해요.', '하노이 탑은 n−1개를 옮기고, 가장 큰 것을 옮기고, n−1개를 다시 옮기므로 aₙ = 2aₙ₋₁ + 1, 풀면 aₙ = 2ⁿ − 1이에요. 피보나치 Fₙ = Fₙ₋₁ + Fₙ₋₂처럼 선형 점화식은 특성방정식 x² = x + 1의 근(황금비 φ)으로 풀어 Fₙ ≈ φⁿ/√5가 돼요. 분할 정복 알고리즘의 시간 T(n) = aT(n/b) + f(n)은 마스터 정리로 풀어요.', 'An equation expressing a problem through smaller copies of itself; list values, guess a closed form, prove it by induction.', 'The Tower of Hanoi moves n−1 disks, the largest disk, then n−1 again, so aₙ = 2aₙ₋₁ + 1, solving to aₙ = 2ⁿ − 1. Linear recurrences such as Fibonacci, Fₙ = Fₙ₋₁ + Fₙ₋₂, are solved through the roots of the characteristic equation x² = x + 1 (the golden ratio φ), giving Fₙ ≈ φⁿ/√5. Divide-and-conquer running times T(n) = aT(n/b) + f(n) fall to the master theorem.', sRecur()),
    item('dm-catalan', '카탈랑 수', 'Catalan numbers', '올바른 괄호 짝, 바닥 아래로 안 내려가는 산 모양 경로, 이진 트리 모양 등 수많은 문제의 답이 1, 1, 2, 5, 14, 42…로 같아요.', '괄호 3쌍의 올바른 배열은 ((())), (()()), (())(), ()(()), ()()() 5가지이고, ( 를 위로 ) 를 아래로 그리면 바닥 아래로 안 내려가는 디크 경로가 돼요. 노드 3개 이진 트리 모양, 오각형의 삼각분할도 5가지예요. 공식은 Cₙ = C(2n, n)/(n + 1)이고, 첫 괄호 쌍의 안과 밖으로 나눠 Cₙ₊₁ = Σ CᵢCₙ₋ᵢ 점화식을 얻어요.', 'Balanced parentheses, mountain paths that never dip below ground, binary tree shapes and many more problems share the answer 1, 1, 2, 5, 14, 42, …', 'Three pairs of parentheses balance in 5 ways: ((())), (()()), (())(), ()(()), ()()(); drawing ( as up and ) as down gives Dyck paths that never go below the start. Binary trees with 3 nodes and triangulations of a pentagon also number 5. The formula is Cₙ = C(2n, n)/(n + 1), and splitting on what lies inside and after the first pair gives Cₙ₊₁ = Σ CᵢCₙ₋ᵢ.', sCatalan())
  ],
  'dm-relnum': [
    item('dm-poset', '부분 순서와 하세 도표', 'Partial orders and Hasse diagrams', '반사·반대칭·추이를 만족하지만 모든 쌍이 비교되지는 않는 순서예요. 나누어떨어짐 관계가 대표적이에요.', '{1, 2, 3, 4, 6, 12}에서 “a가 b를 나눈다”는 부분 순서이고, 하세 도표는 바로 위 관계만 아래에서 위로 선을 그어요. 2와 3은 서로 나누지 않아 비교할 수 없어요. 두 원소의 최소 상계는 최소공배수, 최대 하계는 최대공약수라 격자를 이뤄요. 빌드 순서 같은 작업 의존성, 집합의 포함 관계, 분산 시스템의 happens-before가 부분 순서이고, 위상 정렬로 한 줄로 세워요.', 'An order that is reflexive, antisymmetric and transitive, yet leaves some pairs incomparable; divisibility is the classic example.', 'On {1, 2, 3, 4, 6, 12}, “a divides b” is a partial order, and its Hasse diagram draws only direct covers, upward. 2 and 3 divide neither way, so they are incomparable. The least upper bound of two elements is their lcm and the greatest lower bound their gcd, forming a lattice. Task dependencies such as build order, set inclusion and happens-before in distributed systems are partial orders, linearized by topological sorting.', sPoset()),
    item('dm-closure', '관계의 성질과 폐포', 'Properties and closures of relations', '관계는 순서쌍의 집합이에요. 반사·대칭·추이 성질을 확인하고, 모자란 쌍을 최소한으로 더해 폐포를 만들어요.', '관계는 방향 그래프나 0/1 행렬로 나타낼 수 있어요. 1→2→3→4는 반사·대칭·추이를 모두 만족하지 않아요. 추이적 폐포는 “i에서 j로 갈 수 있나”의 표로, 와셜 알고리즘이 k마다 i→k, k→j이면 i→j를 더해 O(n³)에 구해요. SQL의 WITH RECURSIVE, 조직도에서 모든 상사 찾기, 친구의 친구 검색이 추이적 폐포 계산이에요.', 'A relation is a set of ordered pairs; check reflexivity, symmetry and transitivity, and add the fewest pairs needed to reach a closure.', 'Relations can be drawn as directed graphs or 0/1 matrices. 1→2→3→4 is neither reflexive, symmetric nor transitive. Its transitive closure records “can i reach j?”, which Warshall’s algorithm builds in O(n³) by adding i→j whenever i→k and k→j. SQL WITH RECURSIVE, finding all managers up an org chart and friends-of-friends searches compute transitive closures.', sClosureRel()),
    item('dm-prime', '소수와 에라토스테네스의 체', 'Primes and the sieve', '2부터 차례로, 남아 있는 수의 배수를 지워 나가면 끝까지 남는 수가 소수예요.', '2의 배수, 3의 배수, 5의 배수, 7의 배수를 지우면 51까지의 소수가 모두 남아요. √n까지만 체로 거르면 충분하고, p의 배수는 p²부터 지워도 돼요(O(n log log n)). 산술의 기본 정리에 따라 모든 정수는 소수의 곱으로 유일하게 분해되고(360 = 2³·3²·5), 유클리드는 소수가 무한함을 증명했어요. 큰 수의 소인수분해가 어렵다는 사실이 RSA를 지켜요.', 'Starting from 2, cross out multiples of each surviving number; what is left at the end are the primes.', 'Crossing out multiples of 2, 3, 5 and 7 leaves every prime up to 51; sieving up to √n suffices, and multiples of p can start at p², for O(n log log n). By the fundamental theorem of arithmetic every integer factors uniquely into primes (360 = 2³·3²·5), and Euclid proved there are infinitely many primes. The difficulty of factoring large numbers protects RSA.', sSieve()),
    item('dm-rsa', '정수론으로 보는 RSA', 'RSA through number theory', '두 소수의 곱, 오일러 피 함수, 모듈러 역원, 거듭제곱의 나머지만으로 공개키 암호가 만들어져요.', 'p = 5, q = 11이면 n = 55, φ(n) = 40이고, e = 3에 대해 3·d ≡ 1 (mod 40)인 d = 27을 확장 유클리드 호제법으로 구해요. 메시지 7은 7³ mod 55 = 13으로 암호화되고, 13²⁷ mod 55를 반복 제곱으로 계산하면 다시 7이 나와요. 오일러 정리 m^φ(n) ≡ 1 덕분에 m^(ed) ≡ m이 되고, p, q를 모르면 d를 구할 수 없어요. 실제 키는 2048비트 이상이에요.', 'Public-key encryption built from nothing more than a product of primes, Euler’s totient, a modular inverse and modular powers.', 'With p = 5 and q = 11, n = 55 and φ(n) = 40; for e = 3 the extended Euclidean algorithm finds d = 27 with 3·d ≡ 1 (mod 40). The message 7 encrypts to 7³ mod 55 = 13, and computing 13²⁷ mod 55 by repeated squaring returns 7. Euler’s theorem m^φ(n) ≡ 1 makes m^(ed) ≡ m, and without p and q nobody can find d. Real keys are 2048 bits or more.', sRsa())
  ],
  'dm-graphs': [
    item('dm-hamilton', '해밀턴 경로와 회로', 'Hamiltonian paths and cycles', '모든 정점을 정확히 한 번씩 지나는 경로예요. 모든 간선을 지나는 오일러 경로와 달리 간단한 판정법이 없어요.', '오일러 경로는 홀수 차수 정점 개수만 보면 판정되지만, 해밀턴 회로 존재 여부는 NP-완전이라 일반적으로 백트래킹이나 비트마스크 DP(O(2ⁿn²))가 필요해요. 디랙 정리는 모든 정점의 차수가 n/2 이상이면 해밀턴 회로가 있다고 말하지만 충분조건일 뿐이에요. 간선에 거리를 붙이면 외판원 문제(TSP)가 돼 배송 경로, 기판 드릴 순서 문제로 이어져요.', 'A path visiting every vertex exactly once; unlike Euler paths through every edge, no simple test is known.', 'Euler paths are decided just by counting odd-degree vertices, but deciding whether a Hamiltonian cycle exists is NP-complete, so in general it takes backtracking or bitmask DP (O(2ⁿn²)). Dirac’s theorem guarantees a Hamiltonian cycle when every degree is at least n/2, but that is only sufficient. Adding distances turns it into the travelling salesman problem: delivery routes and PCB drilling order.', sHamilton()),
    item('dm-bipartite', '이분 그래프와 매칭', 'Bipartite graphs and matching', '정점을 두 쪽으로 나눠 간선이 항상 양쪽을 잇는 그래프예요. 사람과 일을 겹치지 않게 짝짓는 매칭 문제의 무대예요.', 'BFS로 번갈아 두 색을 칠해 충돌이 없으면 이분 그래프이고, 홀수 길이 사이클이 있으면 아니에요. 매칭은 서로 겹치지 않는 간선 집합으로, 증가 경로를 찾아 늘려 가며 최대 매칭을 구해요(호프크로프트–카프 O(E√V)). 홀의 정리: 왼쪽의 어떤 k명도 오른쪽 이웃이 k개 이상이면 모두 짝지을 수 있어요. 업무 배정, 수강 신청, 추천 시스템에 쓰여요.', 'A graph whose vertices split into two sides with every edge crossing between them: the stage for matching people to jobs.', 'Coloring alternately with BFS succeeds exactly when the graph is bipartite; an odd cycle makes it fail. A matching is a set of edges sharing no vertex, and maximum matchings grow along augmenting paths (Hopcroft–Karp in O(E√V)). Hall’s theorem: everyone on the left can be matched iff every group of k left vertices has at least k neighbors. Used for task assignment, course allocation and recommenders.', sBipartite()),
    item('dm-planar', '평면 그래프와 오일러 공식', 'Planar graphs and Euler’s formula', '간선이 교차하지 않게 평면에 그릴 수 있는 그래프예요. 정점·간선·면의 수는 항상 V − E + F = 2를 만족해요.', 'K₄는 대각선 하나를 바깥으로 돌려 그리면 교차가 사라지고, 정점 4·간선 6·면 4(바깥 포함)로 4 − 6 + 4 = 2예요. 이 공식에서 평면 그래프는 E ≤ 3V − 6이어야 함이 나오고, K₅는 E = 10 > 9라 평면에 그릴 수 없어요. 쿠라토프스키 정리에 따르면 K₅나 K₃,₃를 품은 그래프만 비평면이에요. 회로 기판 배선, 지도 색칠(4색 정리)과 이어져요.', 'A graph that can be drawn without crossing edges; its vertices, edges and faces always satisfy V − E + F = 2.', 'K₄ loses its crossing once one diagonal is rerouted outside, leaving 4 vertices, 6 edges and 4 faces (including the outer one): 4 − 6 + 4 = 2. The formula implies E ≤ 3V − 6 for planar graphs, so K₅ with E = 10 > 9 can’t be drawn flat. Kuratowski’s theorem says a graph is nonplanar exactly when it contains a subdivision of K₅ or K₃,₃. Related to circuit-board routing and map coloring (the four color theorem).', sPlanar())
  ]
},
after: {
  'dm-bipartite': [item('dm-augment', '증가 경로와 최대 매칭', 'Augmenting paths and maximum matching', '짝이 없는 두 정점을, 안 쓴 간선과 쓴 간선을 번갈아 밟으며 잇는 길을 찾아 뒤집으면 매칭이 하나 늘어요. 이런 길이 없으면 최대 매칭이에요.', '매칭은 정점을 공유하지 않는 간선들의 집합이에요. 앞에서부터 욕심껏 짝지으면 더 늘릴 수 없는 극대 매칭에서 멈출 수 있지만, 그게 최대라는 보장은 없어요. 증가 경로는 짝이 없는 정점에서 시작해 매칭에 없는 간선과 있는 간선을 번갈아 지나 짝이 없는 다른 정점에서 끝나는 경로예요. 이 경로의 간선을 모두 뒤집으면(있던 것은 빼고 없던 것은 넣으면) 안 쓴 간선이 하나 더 많으므로 매칭 크기가 정확히 1 늘어요. 예시에서 욕심쟁이 매칭은 3쌍이지만, D–2=B–4라는 증가 경로를 뒤집어 B를 4번 일로 옮기고 D가 2번 일을 맡으면 4쌍의 완전 매칭이 돼요. 베르주 정리에 따르면 증가 경로가 하나도 없을 때가 바로 최대 매칭이에요. 이분 그래프에서는 BFS·DFS로 증가 경로를 반복해서 찾으면 되고, 여러 경로를 한꺼번에 찾는 호프크로프트–카프는 O(E√V)예요. 가중치가 있는 배정 문제는 헝가리안 알고리즘으로 풀고, 최대 유량 문제와도 같은 원리예요. 쾨니그 정리에 따르면 이분 그래프의 최대 매칭 크기는 최소 정점 덮개의 크기와 같아요.', 'Find a path between two unmatched vertices that alternates unused and used edges, flip it, and the matching grows by one; when no such path exists, the matching is maximum.', 'A matching is a set of edges sharing no vertex. Greedy pairing can stop at a maximal matching that cannot be extended, with no guarantee that it is maximum. An augmenting path starts at an unmatched vertex, alternates between edges outside and inside the matching, and ends at another unmatched vertex. Flipping its edges, removing the matched ones and adding the others, increases the matching by exactly one because the path has one more unmatched edge. In the example the greedy matching has three pairs, but flipping the augmenting path D–2=B–4 moves B to job 4 and gives job 2 to D, a perfect matching of four. Berge’s theorem says a matching is maximum exactly when no augmenting path exists. In bipartite graphs, repeatedly finding augmenting paths with BFS or DFS solves the problem, and Hopcroft–Karp, which finds many at once, runs in O(E√V). Weighted assignment problems use the Hungarian algorithm, maximum flow rests on the same idea, and König’s theorem says that in bipartite graphs the maximum matching size equals the minimum vertex cover size.', sAugment())]
} };
})();

window.UX = page([
  sec('dm-sets', '집합·논리', 'Sets & logic', '집합과 논리', 'Sets and logic',
    '조건문, 쿼리, 증명의 바탕이 되는 언어예요.', 'The language beneath conditions, queries and proofs.', [
    item('dm-venn', '집합 연산', 'Set operations', '합집합(∪), 교집합(∩), 차집합(−), 대칭차(△)로 두 집합을 조합해요.', 'SQL의 UNION·INTERSECT·EXCEPT, 언어의 Set 타입, 권한 계산(허용 − 차단)이 모두 집합 연산이에요.', 'Combine two sets with union (∪), intersection (∩), difference (−) and symmetric difference (△).', 'SQL’s UNION, INTERSECT and EXCEPT, Set types and permission maths (allowed − denied) are all set operations.', sVenn()),
    item('dm-logic', '명제와 함의', 'Propositions · Implication', '"p이면 q"는 p가 참인데 q가 거짓일 때만 거짓이에요. 대우(¬q → ¬p)와는 항상 진릿값이 같아요.', '조건문 리팩터링, 테스트 케이스 설계, 요구사항 해석에서 "그 외의 경우"를 빠뜨리지 않게 해 줘요.', '“p implies q” is false only when p is true and q is false, and it always matches its contrapositive (¬q → ¬p).', 'It keeps you from missing “the other cases” when refactoring conditions, designing tests or reading requirements.', sLogic()),
    item('dm-quant', '한정자 (∀, ∃)', 'Quantifiers (∀, ∃)', '∀는 "모든 원소가", ∃는 "적어도 하나가" 조건을 만족하는지 말해요. ∀는 반례 하나로, ∃는 예 하나로 결정돼요.', '코드의 every/some, SQL의 ALL/EXISTS예요. "모든 X가 아니다"와 "X인 게 없다"를 헷갈리지 마세요.', '∀ says every element satisfies a condition; ∃ says at least one does. One counterexample settles ∀, one example settles ∃.', 'They are every/some in code and ALL/EXISTS in SQL. Don’t confuse “not all X” with “no X”.', sQuant()),
    item('dm-induction', '수학적 귀납법', 'Mathematical induction', '첫 번째 경우가 참이고, k번째가 참이면 k+1번째도 참임을 보이면 모든 자연수에서 참이에요.', '재귀 함수의 정확성과 반복문 불변식 증명이 같은 구조예요. 종료 조건(기초)과 진행(귀납)을 함께 확인하세요.', 'If the first case holds and case k implies case k + 1, the statement holds for every natural number.', 'Proving recursion correct and reasoning with loop invariants follow the same shape: check the base case and the step.', sInduction())
  ].concat(XT.add['dm-sets'] || [])),
  sec('dm-count', '경우의 수', 'Counting', '경우의 수와 확률', 'Counting and probability',
    '가능성을 세고 불확실성을 다루는 도구예요.', 'Tools for counting possibilities and handling uncertainty.', [
    item('dm-perm', '순열과 조합', 'Permutations · Combinations', '순서를 따지면 순열(nPr), 순서를 무시하면 조합(nCr)이에요. 조합은 순열을 r!로 나눈 값이에요.', '완전 탐색이 가능한 크기인지, 비밀번호 무차별 대입이 얼마나 걸리는지, 테스트 조합이 몇 개인지 계산해요.', 'Counting with order gives permutations (nPr); without order, combinations (nCr = nPr / r!).', 'Use it to judge whether brute force is feasible, how strong a password is or how many test combinations exist.', sPerm()),
    item('dm-pigeon', '비둘기집 원리', 'Pigeonhole principle', 'n개의 칸에 n+1개를 넣으면 적어도 한 칸에는 2개 이상이 들어가요.', '해시 충돌은 피할 수 없다는 근거예요. 23명만 모여도 생일이 같은 쌍이 있을 확률이 50%를 넘어요(생일 역설).', 'Put n + 1 items into n boxes and at least one box holds two.', 'It proves hash collisions are unavoidable. With just 23 people, a shared birthday is more likely than not (birthday paradox).', sPigeon()),
    item('dm-binom', '이항계수와 파스칼의 삼각형', 'Binomial coefficients · Pascal’s triangle', '각 수는 바로 위 두 수의 합이고, n번째 줄은 nC0 … nCn이에요.', 'nCk를 DP로 계산하는 방법이자, 격자 경로 수 세기 같은 문제의 기본이에요. 큰 수는 오버플로에 주의하세요.', 'Each number is the sum of the two above it; row n lists nC0 … nCn.', 'It is how you compute nCk with DP and the basis of grid-path counting; watch for overflow on big values.', sPascal()),
    item('dm-prob', '조건부 확률과 베이즈', 'Conditional probability · Bayes', '어떤 일이 일어났다는 조건에서의 확률이에요. 드문 사건은 검사가 정확해도 양성의 대부분이 오탐일 수 있어요.', '이상 탐지 알림이 거의 다 오탐인 이유, 스팸 필터, A/B 테스트 해석에 꼭 필요한 감각이에요.', 'Probability given that something has happened. For rare events, most positives can be false even with an accurate test.', 'It explains why anomaly alerts are mostly false alarms and underpins spam filters and A/B test interpretation.', sBayes())
  ].concat(XT.add['dm-count'] || [])),
  sec('dm-relnum', '관계·정수론', 'Relations & numbers', '함수, 관계, 정수론', 'Functions, relations and number theory',
    '데이터를 짝짓고 나누는 규칙이에요.', 'Rules for pairing and partitioning data.', [
    item('dm-func', '함수: 단사·전사·전단사', 'Injective · Surjective · Bijective', '단사는 다른 입력이 다른 출력으로, 전사는 모든 출력이 어떤 입력에서, 전단사는 둘 다라서 거꾸로 되돌릴 수 있어요.', '해시는 단사가 아니라 충돌이 나고, 암호화·인코딩은 전단사라 복원돼요. ID 매핑 설계에도 써요.', 'Injective: different inputs give different outputs. Surjective: every output is hit. Bijective: both, so it can be inverted.', 'Hashes aren’t injective, so they collide; encryption and encodings are bijective, so they decode. Useful for designing ID mappings.', sFunc()),
    item('dm-rel', '동치 관계', 'Equivalence relations', '반사·대칭·추이를 만족하는 관계는 원소들을 겹치지 않는 묶음(동치류)으로 나눠요.', 'id % N 샤딩, 대소문자 무시 비교, 같은 사람으로 묶는 중복 제거가 모두 동치류 만들기예요.', 'A reflexive, symmetric and transitive relation splits elements into non-overlapping classes.', 'Sharding by id % N, case-insensitive matching and deduplicating “the same person” all form equivalence classes.', sEquiv()),
    item('dm-mod', '모듈러 연산', 'Modular arithmetic', '나눈 나머지만 보는 연산이에요. 시계처럼 끝에 닿으면 처음으로 돌아가요.', '해시 테이블 인덱스, 원형 버퍼, 요일 계산, RSA 암호가 모두 모듈러 연산이에요. 음수 나머지는 언어마다 다르니 조심하세요.', 'Arithmetic that keeps only remainders, wrapping around like a clock.', 'Hash indexes, ring buffers, weekday maths and RSA use it. Negative remainders differ between languages.', sMod()),
    item('dm-gcd', '유클리드 호제법', 'Euclidean algorithm', '두 수의 최대공약수를 큰 수를 작은 수로 나눈 나머지로 바꾸기를 반복해 빠르게 구해요.', '분수 약분, 화면 비율 계산, RSA 키 생성(확장 유클리드)에 써요. 반복 횟수가 O(log n)이라 아주 커도 빨라요.', 'Finds the greatest common divisor by repeatedly replacing the larger number with the remainder.', 'Used to reduce fractions, compute aspect ratios and generate RSA keys (extended Euclid). It runs in O(log n).', sGCD())
  ].concat(XT.add['dm-relnum'] || [])),
  sec('dm-graphs', '그래프 이론', 'Graph theory', '그래프 이론', 'Graph theory',
    '연결 구조를 수학적으로 다뤄요.', 'The mathematics of connections.', [
    item('dm-graph', '그래프 기본 용어', 'Graph basics', '정점과 간선으로 관계를 표현하고, 차수·경로·사이클·연결 같은 말로 구조를 설명해요.', '모든 그래프에서 차수의 합은 간선 수의 2배예요. 데이터를 그래프로 볼 수 있으면 BFS·최단 경로 같은 도구를 바로 쓸 수 있어요.', 'Vertices and edges model relations; degree, path, cycle and connectivity describe their structure.', 'In any graph the degrees sum to twice the edges. Seeing data as a graph unlocks tools like BFS and shortest paths.', sGraph()),
    item('dm-euler', '오일러 경로', 'Euler path', '모든 간선을 정확히 한 번씩 지나는 경로예요. 홀수 차수인 정점이 0개나 2개일 때만 존재해요.', '쾨니히스베르크 다리 문제에서 그래프 이론이 시작됐어요. 우편 배달·도로 청소 경로 최적화에 써요.', 'A route that uses every edge exactly once; it exists only when 0 or 2 vertices have odd degree.', 'Graph theory began with the Königsberg bridges. It is used for mail delivery and street-sweeping routes.', sEuler()),
    item('dm-tree', '트리의 성질', 'Properties of trees', '사이클 없이 모두 연결된 그래프로, 정점 n개면 간선은 항상 n−1개이고 두 점 사이 경로가 하나뿐이에요.', '간선을 더하면 사이클, 빼면 분리가 생겨요. 네트워크 스위치의 루프 방지(STP), 최소 신장 트리가 이 성질을 써요.', 'A connected graph with no cycles: n vertices always have n − 1 edges and exactly one path between any two.', 'Add an edge and you get a cycle; remove one and it splits. Spanning-tree protocol and minimum spanning trees rely on this.', sTree()),
    item('dm-color', '그래프 색칠', 'Graph colouring', '이웃한 정점끼리 다른 색이 되도록 칠할 때 필요한 최소 색 수를 구하는 문제예요.', '시험 시간표, 회의실 배정, 컴파일러 레지스터 할당, 주파수 배정이 모두 이 문제예요. 일반적으로 어렵지만 그리디로 꽤 잘 풀려요.', 'Colour vertices so neighbours differ, using as few colours as possible.', 'Exam timetables, room booking, register allocation and frequency planning are all colouring; it is hard in general but greedy works well.', sColor())
  ].concat(XT.add['dm-graphs'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.dm-m .in{font-family:var(--f-mono);font-size:.72em;font-weight:700}
.dm-big .in{font-size:1.15em;font-weight:900;color:var(--ink)}
.dm-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.dm-code{place-items:center start!important;padding-left:.7em}
.dm-code .in{font-family:var(--f-mono);font-size:.62em}
.dm-lg .in{font-size:.85em}`;
})();
