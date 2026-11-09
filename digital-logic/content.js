(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const ON = { background: 'var(--accent)' }, OFF = { background: 'var(--line)' };
const HI = { background: 'var(--accent)', color: 'var(--accent-ink)', 'border-color': 'var(--accent)' };
/* wire: polyline of edges; value per step */
function wire(S, k, pts) { for (let i = 0; i < pts.length - 1; i++) edge(S, `${k}_${i}`, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { h: .2 }); S.get(`${k}_0`).nseg = pts.length - 1; return S; }
function wv(S, k, seq) { const n = S.get(`${k}_0`).nseg; seq.forEach((v, st) => { if (st === 0 || v !== seq[st - 1]) for (let i = 0; i < n; i++) S.set(`${k}_${i}`, st, v ? ON : OFF); }); }
/* a 0/1 value box that changes per step */
function val(S, k, x, y, seq, o = {}) {
  const w = o.w || 2.4, h = o.h || 2.2;
  cell(S, k + '0', x, y, o.l0 || '0', { w, h, cls: 'cz-c lg-v' });
  cell(S, k + '1', x, y, o.l1 || '1', { w, h, cls: 'cz-c lg-v', s: Object.assign({ opacity: '0' }, HI) });
  seq.forEach((v, st) => { if (st === 0 || v !== seq[st - 1]) S.set(k + '1', st, { opacity: v ? '1' : '0' }); });
}
const gate = (S, k, x, y, w, h, l) => box(S, k, x, y, w, h, l, { cls: 'cz-box cz-bx cz-mono lg-g' });

/* ---------- gates ---------- */
function sBasic() {
  const S = scene({ id: 'lg-and', steps: 5, per: 1.25 });
  const A = [0, 0, 0, 1, 1, 1], B = [0, 0, 1, 0, 1, 1];
  const rows = [['AND', 1.4, (a, b) => a & b, 'A · B'], ['OR', 8, (a, b) => a | b, 'A + B'], ['NOT', 14.6, a => 1 - a, '¬A']];
  rows.forEach(([g, y, f, ex], r) => {
    val(S, 'a' + r, 1.6, y, A); if (g !== 'NOT') val(S, 'b' + r, 1.6, y + 2.8, B);
    wire(S, 'wa' + r, [[4, y + 1.1], [9.8, y + 1.1]]); wv(S, 'wa' + r, A);
    if (g !== 'NOT') { wire(S, 'wb' + r, [[4, y + 3.9], [9.8, y + 3.9]]); wv(S, 'wb' + r, B); }
    gate(S, 'g' + r, 10, y - .2, 6.4, g === 'NOT' ? 2.6 : 5.4, g);
    const out = A.map((a, i) => f(a, B[i])), oy = g === 'NOT' ? y + 1.1 : y + 2.5;
    wire(S, 'wo' + r, [[16.6, oy], [20.4, oy]]); wv(S, 'wo' + r, out);
    val(S, 'o' + r, 20.6, oy - 1.1, out);
    text(S, 'ex' + r, 24.4, oy - .5, ex, { cls: 'cz-t cz-mono lg-b' });
  });
  S.cap(0, '입력 0, 0', 'Inputs 0, 0').cap(1, '입력 0, 0', 'Inputs 0, 0').cap(2, 'B만 1', 'Only B is 1').cap(3, 'A만 1', 'Only A is 1').cap(4, '둘 다 1 → AND도 1', 'Both 1 → AND is 1 too')
    .cap(5, 'AND는 모두 1일 때, OR는 하나라도 1일 때, NOT은 뒤집기', 'AND needs all 1s, OR any 1, NOT flips');
  return S;
}
function sTruth() {
  const S = scene({ id: 'lg-xor', steps: 5, per: 1.25 });
  const H = ['A', 'B', 'XOR', 'NAND', 'NOR'], R = [[0, 0, 0, 1, 1], [0, 1, 1, 1, 0], [1, 0, 1, 1, 0], [1, 1, 0, 0, 0]];
  H.forEach((h, j) => cell(S, 'h' + j, 2 + j * 5.8, 1.6, h, { w: 5.4, h: 2.4, cls: 'cz-c lg-v', s: { background: 'var(--line)' } }));
  R.forEach((row, i) => { row.forEach((v, j) => cell(S, `c${i}_${j}`, 2 + j * 5.8, 4.6 + i * 3, String(v), { w: 5.4, h: 2.6, cls: 'cz-c lg-v', s: hid(j >= 2 && v ? HI : {}) })); row.forEach((_, j) => S.set(`c${i}_${j}`, i + 1, { opacity: '1' })); });
  text(S, 'n', 2, 17.6, ['XOR: 서로 다르면 1 → 덧셈·패리티·암호화', 'XOR: 1 when different → addition, parity, crypto'], { cls: 'cz-t lg-b', s: hid() }); S.set('n', 5, { opacity: '1' });
  S.cap(1, '입력 조합마다 결과를 표로 정리한 것이 진리표', 'A truth table lists the output for every input').cap(2, 'XOR은 둘이 다를 때만 1', 'XOR is 1 only when inputs differ').cap(4, 'NAND는 AND의 반대, NOR는 OR의 반대', 'NAND is NOT-AND, NOR is NOT-OR')
    .cap(5, 'a ^ b ^ b = a · 값 교환, 오류 검출에 써요', 'a ^ b ^ b = a · used for swaps and error checks');
  return S;
}
function sNAND() {
  const S = scene({ id: 'lg-nand', steps: 4, per: 1.5 });
  const row = (k, y, parts, out, st) => { let x = 1.4; parts.forEach(([t, w, g], i) => { if (g) gate(S, `${k}${i}`, x, y, w, 2.8, t); else text(S, `${k}${i}`, x, y + .8, t, { cls: 'cz-t cz-mono lg-b' }); S.set(`${k}${i}`, 0, { opacity: '0' }); S.set(`${k}${i}`, st, { opacity: '1' }); if (i < parts.length - 1) { arrow(S, `${k}a${i}`, x + w + .2, y + 1.4, x + w + 1.6, y + 1.4, { s: hid() }); S.set(`${k}a${i}`, st, { opacity: '1' }); } x += w + 1.8; }); text(S, k + 'o', 26, y + .8, out, { cls: 'cz-t lg-b', s: hid() }); S.set(k + 'o', st, { opacity: '1' }); };
  row('n', 2, [['A, A', 3.4], ['NAND', 5, 1]], '= NOT A', 1);
  row('a', 7.4, [['A, B', 3.4], ['NAND', 5, 1], ['NAND', 5, 1]], '= A AND B', 2);
  row('o', 12.8, [['¬A, ¬B', 3.4], ['NAND', 5, 1]], '= A OR B', 3);
  S.cap(0, 'NAND 하나만으로', 'With NAND gates alone').cap(1, '같은 입력을 넣으면 NOT', 'feed one input twice for NOT').cap(2, 'NAND 뒤에 NOT을 붙이면 AND', 'NAND then NOT gives AND').cap(3, '입력을 각각 뒤집어 NAND하면 OR', 'NAND of inverted inputs gives OR')
    .cap(4, '모든 회로를 NAND만으로 만들 수 있어요 · 실제 칩 설계의 기본 단위', 'Any circuit can be built from NAND alone · a basic building block of chips');
  return S;
}
function sDeMorgan() {
  const S = scene({ id: 'lg-bool', steps: 5, per: 1.25 });
  const H = ['A', 'B', '¬(A∧B)', '¬A ∨ ¬B'], R = [[0, 0, 1, 1], [0, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 0]];
  H.forEach((h, j) => cell(S, 'h' + j, 1.6 + j * 7.4, 1.4, h, { w: 7, h: 2.4, cls: 'cz-c lg-v', s: { background: 'var(--line)' } }));
  R.forEach((row, i) => { row.forEach((v, j) => cell(S, `c${i}_${j}`, 1.6 + j * 7.4, 4.4 + i * 2.8, String(v), { w: 7, h: 2.4, cls: 'cz-c lg-v', s: hid(j >= 2 ? (v ? C.ok : C.bad) : {}) })); row.forEach((_, j) => S.set(`c${i}_${j}`, i + 1, { opacity: '1' })); });
  cell(S, 'code', 1.6, 16.4, 'if (!(loggedIn && isAdmin))  ==  if (!loggedIn || !isAdmin)', { w: 29, h: 2.4, cls: 'cz-c lg-code', s: hid(C.soft) }); S.set('code', 5, { opacity: '1' });
  S.cap(0, '드모르간 법칙: NOT은 안으로 들어가며 AND↔OR를 바꿔요', 'De Morgan: pushing NOT inside swaps AND and OR').cap(4, '모든 경우에 두 식의 결과가 같아요', 'Both sides agree for every input')
    .cap(5, '복잡한 조건문을 읽기 쉽게 바꿀 때 써요', 'Use it to simplify tangled conditions');
  return S;
}
function sKmap() {
  const S = scene({ id: 'lg-kmap', steps: 4, per: 1.5 });
  const cols = ['00', '01', '11', '10'], V = [[0, 1, 1, 0], [1, 1, 1, 1]];
  text(S, 'ax', 1, 1.4, 'A \\ BC', { cls: 'cz-t cz-mono' });
  cols.forEach((c, j) => text(S, 'c' + j, 7 + j * 5, 1.4, c, { w: 4.6, cls: 'cz-t cz-tc cz-mono' }));
  [0, 1].forEach(i => { text(S, 'r' + i, 4, 4.5 + i * 4.6, String(i), { cls: 'cz-t cz-mono' }); V[i].forEach((v, j) => cell(S, `k${i}_${j}`, 7 + j * 5, 3.2 + i * 4.6, String(v), { w: 4.6, h: 4.2, cls: 'cz-c lg-v' })); });
  S.el('g1', { x: 6.6, y: 7.5, w: 20.8, h: 5, css: 'border:.22em solid var(--ok);border-radius:1em;z-index:3', s: hid() });
  S.el('g2', { x: 11.6, y: 2.8, w: 10.8, h: 9.8, css: 'border:.22em solid var(--warn);border-radius:1em;z-index:3', s: hid() });
  S.set('g1', 1, { opacity: '1' }).set('g2', 2, { opacity: '1' });
  S.label('f', { cls: 'cz-t cz-mono lg-big', x: 1.4, y: 14.6, w: 29 }, [[0, ['F = 1인 칸 6개 → 항 6개?', 'F = 1 in 6 cells → 6 terms?']], [1, 'F = A + …'], [2, 'F = A + C'], [3, 'F = A + C']]);
  S.cap(1, '인접한 1을 2ⁿ 크기로 크게 묶어요: 아래 줄 = A', 'Group adjacent 1s in powers of two: the bottom row is A').cap(2, '가운데 두 열 = C', 'The middle two columns are C')
    .cap(3, '복잡한 식이 A + C로 줄어요 · 게이트 수가 줄어요', 'The expression shrinks to A + C, fewer gates').cap(4, '요즘은 합성 도구가 자동으로 하지만 원리는 같아요', 'Synthesis tools do this automatically now, on the same principle');
  return S;
}

/* ---------- combinational ---------- */
function sHalf() {
  const S = scene({ id: 'lg-hadd', steps: 5, per: 1.25 });
  const A = [0, 0, 0, 1, 1, 1], B = [0, 0, 1, 0, 1, 1], Sm = A.map((a, i) => a ^ B[i]), Cy = A.map((a, i) => a & B[i]);
  val(S, 'a', 1.6, 4, A); val(S, 'b', 1.6, 12, B);
  wire(S, 'a1', [[4, 5.1], [8, 5.1], [8, 5.2], [11.4, 5.2]]); wire(S, 'a2', [[8, 5.1], [8, 13.6], [11.4, 13.6]]); wv(S, 'a1', A); wv(S, 'a2', A);
  wire(S, 'b1', [[4, 13.1], [6.4, 13.1], [6.4, 7], [11.4, 7]]); wire(S, 'b2', [[6.4, 13.1], [6.4, 15.4], [11.4, 15.4]]); wv(S, 'b1', B); wv(S, 'b2', B);
  gate(S, 'x', 11.6, 4, 6.4, 4.2, 'XOR'); gate(S, 'n', 11.6, 12.4, 6.4, 4.2, 'AND');
  wire(S, 'so', [[18.2, 6.1], [23, 6.1]]); wire(S, 'co', [[18.2, 14.5], [23, 14.5]]); wv(S, 'so', Sm); wv(S, 'co', Cy);
  val(S, 's', 23.2, 5, Sm); val(S, 'c', 23.2, 13.4, Cy);
  text(S, 'sl', 26.2, 5.6, ['합 S', 'sum S'], { cls: 'cz-t lg-b' }); text(S, 'cl', 26.2, 14, ['올림 C', 'carry C'], { cls: 'cz-t lg-b' });
  S.cap(1, '0 + 0 = 0', '0 + 0 = 0').cap(2, '0 + 1 = 1', '0 + 1 = 1').cap(3, '1 + 0 = 1', '1 + 0 = 1').cap(4, '1 + 1 = 10 (합 0, 올림 1)', '1 + 1 = 10 (sum 0, carry 1)')
    .cap(5, 'XOR가 합, AND가 올림 · 1비트 덧셈 완성', 'XOR gives the sum, AND the carry: 1-bit addition');
  return S;
}
function sFull() {
  const S = scene({ id: 'lg-fadd', steps: 5, per: 1.3 });
  const A = [0, 1, 1, 1, 0, 0], B = [0, 1, 1, 0, 1, 1], Ci = [0, 0, 1, 1, 0, 0];
  const X1 = A.map((a, i) => a ^ B[i]), Sm = X1.map((x, i) => x ^ Ci[i]), N1 = A.map((a, i) => a & B[i]), N2 = X1.map((x, i) => x & Ci[i]), Co = N1.map((n, i) => n | N2[i]);
  val(S, 'a', 1, 2.4, A); val(S, 'b', 1, 6.4, B); val(S, 'ci', 1, 13.8, Ci);
  text(S, 'al', .9, 1, 'A', { cls: 'cz-t lg-b' }); text(S, 'bl', .9, 5, 'B', { cls: 'cz-t lg-b' }); text(S, 'cil', .9, 12.4, 'Cin', { cls: 'cz-t lg-b' });
  wire(S, 'wa', [[3.4, 3.5], [7.6, 3.5]]); wire(S, 'wb', [[3.4, 7.5], [5.4, 7.5], [5.4, 5.3], [7.6, 5.3]]); wv(S, 'wa', A); wv(S, 'wb', B);
  wire(S, 'wa2', [[6.4, 3.5], [6.4, 9.6], [7.6, 9.6]]); wire(S, 'wb2', [[5.4, 7.5], [5.4, 11.2], [7.6, 11.2]]); wv(S, 'wa2', A); wv(S, 'wb2', B);
  gate(S, 'x1', 7.8, 2.6, 5, 3.6, 'XOR'); gate(S, 'n1', 7.8, 8.8, 5, 3.6, 'AND');
  wire(S, 'w1', [[13, 4.4], [15.4, 4.4], [15.4, 5.6], [16.6, 5.6]]); wire(S, 'w1b', [[15.4, 5.6], [15.4, 13.6], [16.6, 13.6]]); wv(S, 'w1', X1); wv(S, 'w1b', X1);
  wire(S, 'wc', [[3.4, 14.9], [14.4, 14.9], [14.4, 7.4], [16.6, 7.4]]); wire(S, 'wc2', [[14.4, 14.9], [14.4, 15.4], [16.6, 15.4]]); wv(S, 'wc', Ci); wv(S, 'wc2', Ci);
  gate(S, 'x2', 16.8, 4.6, 5, 3.6, 'XOR'); gate(S, 'n2', 16.8, 12.6, 5, 3.6, 'AND');
  wire(S, 'wn1', [[13, 10.6], [22.8, 10.6], [22.8, 11.4], [24, 11.4]]); wire(S, 'wn2', [[22, 14.4], [23.2, 14.4], [23.2, 13.2], [24, 13.2]]); wv(S, 'wn1', N1); wv(S, 'wn2', N2);
  gate(S, 'or', 24.2, 10.4, 4.2, 3.8, 'OR');
  wire(S, 'ws', [[22, 6.4], [28.4, 6.4]]); wv(S, 'ws', Sm); val(S, 's', 28.6, 5.3, Sm, { w: 2.4 }); text(S, 'sl', 28.4, 3.8, 'S', { cls: 'cz-t lg-b' });
  wire(S, 'wco', [[28.6, 12.3], [28.8, 12.3]]); val(S, 'co', 28.6, 15.6, Co, { w: 2.4 }); wire(S, 'wco2', [[28.6, 12.3], [29.8, 12.3], [29.8, 15.6]]); wv(S, 'wco2', Co); text(S, 'col', 28, 18.2, 'Cout', { cls: 'cz-t lg-b' });
  S.cap(1, '1 + 1 + 0 = 10 → S 0, 올림 1', '1 + 1 + 0 = 10 → S 0, carry 1').cap(2, '1 + 1 + 1 = 11 → S 1, 올림 1', '1 + 1 + 1 = 11 → S 1, carry 1').cap(3, '1 + 0 + 1 = 10 → S 0, 올림 1', '1 + 0 + 1 = 10 → S 0, carry 1')
    .cap(4, '0 + 1 + 0 = 01 → S 1, 올림 0', '0 + 1 + 0 = 01 → S 1, carry 0').cap(5, '반가산기 2개 + OR = 앞자리 올림까지 더하는 전가산기', 'Two half adders + OR: a full adder that includes the incoming carry');
  return S;
}
function sRipple() {
  const S = scene({ id: 'lg-ripple', steps: 6, per: 1.1 });
  text(S, 'eq', 1, 1.2, '0111 + 0001 = 1000', { cls: 'cz-t cz-mono lg-big' });
  const A = [0, 1, 1, 1], B = [0, 0, 0, 1];
  for (let k = 0; k < 4; k++) {
    const i = 3 - k, x = 1.6 + k * 7.4;
    text(S, 'ab' + i, x, 4.4, `A${i}=${A[k]} B${i}=${B[k]}`, { w: 6, cls: 'cz-t cz-tc cz-mono' });
    gate(S, 'fa' + i, x, 6, 6, 4.4, 'FA' + i);
    const ini = A[k] ^ B[k], fin = [0, 0, 0, 1][i]; val(S, 's' + i, x + 1.8, 12.8, Array.from({ length: 7 }, (_, st) => st < i + 1 ? ini : fin));
    text(S, 'sl' + i, x, 15.4, 'S' + i, { w: 6, cls: 'cz-t cz-tc cz-mono' });
  }
  for (let i = 0; i < 3; i++) { const x = 1.6 + (3 - i) * 7.4; arrow(S, 'c' + i, x - .2, 8.2, x - 1.2, 8.2, { s: Object.assign({ opacity: '.35' }, AR.ink) }); S.set('c' + i, i + 2, Object.assign({ opacity: '1' }, AR.acc)); text(S, 'cl' + i, x - 1.6, 6.4, '1', { cls: 'cz-t cz-mono lg-b', s: hid() }); S.set('cl' + i, i + 2, { opacity: '1' }); }
  [0, 1, 2, 3].forEach(i => S.set('fa' + i, i + 1, C.soft).set('fa' + i, i + 2, C.idle));
  text(S, 'n', 1, 17, ['올림이 한 칸씩 전달되느라 비트 수만큼 기다려요', 'the carry ripples one stage at a time'], { cls: 'cz-t lg-b', s: hid() }); S.set('n', 5, { opacity: '1' });
  S.cap(1, '맨 오른쪽 자리부터 더하고', 'Add the rightmost bit first').cap(2, '올림이 다음 자리로', 'its carry moves left').cap(4, '도미노처럼 끝까지 전달돼요', 'all the way like dominoes')
    .cap(6, '64비트면 64단계 지연 → 실제 CPU는 올림 예측(carry-lookahead)으로 빠르게', '64 bits = 64 delays, so CPUs use carry-lookahead adders');
  return S;
}
function sMux() {
  const S = scene({ id: 'lg-mux', steps: 5, per: 1.25 });
  const D = [['D0', 1], ['D1', 0], ['D2', 1], ['D3', 1]];
  D.forEach(([l, v], i) => { const y = 2.4 + i * 3.6; text(S, 'dl' + i, .8, y + .5, l, { cls: 'cz-t cz-mono lg-b' }); val(S, 'd' + i, 3.4, y, [v]); wire(S, 'w' + i, [[5.8, y + 1.1], [11.8, y + 1.1]]); wv(S, 'w' + i, [v]); });
  S.el('mx', { cls: 'cz-box cz-bx cz-mono lg-g', x: 12, y: 1.6, w: 6, h: 14.8, html: 'MUX', css: 'clip-path:polygon(0 0,100% 18%,100% 82%,0 100%)' });
  const sel = [0, 0, 1, 2, 3];
  S.label('sv', { cls: 'cz-c lg-v', x: 12.6, y: 17.6, w: 4.8, h: 2.2 }, [[0, 'S=00'], [2, 'S=01'], [3, 'S=10'], [4, 'S=11']]);
  arrow(S, 'sa', 15, 17.4, 15, 15.2);
  sel.forEach((s, st) => { if (st) { for (let i = 0; i < 4; i++) S.set(`w${i}_0`, st, i === s ? { background: 'var(--warn)' } : (D[i][1] ? ON : OFF)); } });
  const out = sel.map(s => D[s][1]);
  wire(S, 'wo', [[18.2, 9], [23, 9]]); wv(S, 'wo', out); val(S, 'o', 23.2, 7.9, out); text(S, 'ol', 26, 8.4, ['출력', 'out'], { cls: 'cz-t lg-b' });
  S.cap(1, '선택 신호 S가 00이면 D0이 출력으로', 'With select S = 00, D0 goes out').cap(2, '01이면 D1', '01 picks D1').cap(3, '10이면 D2', '10 picks D2').cap(4, '11이면 D3', '11 picks D3')
    .cap(5, '여러 입력 중 하나를 골라 보내는 스위치 · CPU 데이터 경로 곳곳에', 'A switch that picks one input · all over CPU datapaths');
  return S;
}
function sDecoder() {
  const S = scene({ id: 'lg-decoder', steps: 5, per: 1.25 });
  const IN = [[0, 0], [0, 0], [0, 1], [1, 0], [1, 1]];
  val(S, 'i1', 1.6, 6.2, IN.map(p => p[0])); val(S, 'i0', 1.6, 10.4, IN.map(p => p[1]));
  text(S, 'i1l', 1.6, 4.8, 'A1', { cls: 'cz-t lg-b' }); text(S, 'i0l', 1.6, 13, 'A0', { cls: 'cz-t lg-b' });
  wire(S, 'w1', [[4, 7.3], [10, 7.3]]); wire(S, 'w0', [[4, 11.5], [10, 11.5]]); wv(S, 'w1', IN.map(p => p[0])); wv(S, 'w0', IN.map(p => p[1]));
  gate(S, 'dc', 10.2, 2, 7, 15, ['2→4 디코더', '2→4 decoder']);
  for (let k = 0; k < 4; k++) { const y = 2.6 + k * 3.7, seq = IN.map(([a, b]) => (a * 2 + b) === k ? 1 : 0); wire(S, 'o' + k, [[17.4, y + 1.1], [22.4, y + 1.1]]); wv(S, 'o' + k, seq); val(S, 'y' + k, 22.6, y, seq); text(S, 'yl' + k, 25.4, y + .5, ['Y' + k + ' → 메모리 칩 ' + k, 'Y' + k + ' → memory chip ' + k], { cls: 'cz-t' }); }
  S.cap(1, '입력 00이면 Y0 하나만 켜져요', 'Input 00 lights Y0 only').cap(2, '01이면 Y1', '01 lights Y1').cap(3, '10이면 Y2', '10 lights Y2').cap(4, '11이면 Y3 · 항상 정확히 하나만 1', '11 lights Y3 · exactly one output is ever 1')
    .cap(5, '주소를 보고 어느 메모리 칩·레지스터를 쓸지 고르는 데 써요', 'Used to pick a memory chip or register from an address');
  return S;
}

/* ---------- sequential ---------- */
function sLatch() {
  const S = scene({ id: 'lg-latch', steps: 6, per: 1.15 });
  const Sg = [0, 1, 0, 0, 0, 0], Rg = [0, 0, 0, 1, 0, 0], Q = [0, 1, 1, 0, 0, 0];
  text(S, 'sl', 1, 3, 'S (set)', { cls: 'cz-t lg-b' }); text(S, 'rl', 1, 13.4, 'R (reset)', { cls: 'cz-t lg-b' });
  val(S, 's', 1.4, 4.4, Sg); val(S, 'r', 1.4, 14.8, Rg);
  wire(S, 'ws', [[3.8, 5.5], [10, 5.5]]); wire(S, 'wr', [[3.8, 15.9], [10, 15.9]]); wv(S, 'ws', Sg); wv(S, 'wr', Rg);
  gate(S, 'g1', 10.2, 3.6, 6, 4.4, 'NOR'); gate(S, 'g2', 10.2, 13, 6, 4.4, 'NOR');
  wire(S, 'f1', [[16.4, 15.2], [18, 15.2], [18, 9.4], [9, 9.4], [9, 7], [10, 7]]); wire(S, 'f2', [[16.4, 5.8], [19.4, 5.8], [19.4, 11], [9, 11], [9, 14.4], [10, 14.4]]);
  wv(S, 'f2', Q); wv(S, 'f1', Q.map(q => 1 - q));
  wire(S, 'wq', [[19.4, 5.8], [23.2, 5.8]]); wv(S, 'wq', Q); val(S, 'q', 23.4, 4.7, Q); text(S, 'ql', 26.4, 5.2, 'Q', { cls: 'cz-t lg-b' });
  S.label('m', { cls: 'cz-t lg-b', x: 21, y: 13.2, w: 10 }, [[0, ''], [1, ['S=1 → Q=1', 'S=1 → Q=1']], [2, ['S를 떼도 Q=1 유지!', 'S released, Q stays 1!']], [3, ['R=1 → Q=0', 'R=1 → Q=0']], [4, ['R을 떼도 Q=0 유지', 'R released, Q stays 0']]]);
  S.cap(1, 'S에 잠깐 1을 주면 Q가 1이 되고', 'A pulse on S sets Q to 1').cap(2, '입력을 떼도 출력이 되먹임으로 유지돼요', 'and feedback keeps it there').cap(3, 'R을 주면 0으로', 'A pulse on R clears it')
    .cap(4, '역시 유지 · 이것이 1비트 기억 장치', 'and it stays · one bit of memory').cap(6, '되먹임(출력이 입력으로)이 기억을 만들어요 · SRAM 캐시의 원리', 'Feedback creates memory · the principle of SRAM caches');
  return S;
}
function sDFF() {
  const S = scene({ id: 'lg-dff', steps: 8, per: .9 });
  const T = 12, u = 2.1, x0 = 5.4;
  const clk = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], D = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1];
  const q = []; let cur = 0; for (let t = 0; t < T; t++) { if (t > 0 && clk[t] === 1 && clk[t - 1] === 0) cur = D[t]; q.push(cur); }
  const wave = (k, y, sig, hidden) => { sig.forEach((v, t) => { S.el(`${k}${t}`, { x: x0 + t * u, y: v ? y : y + 2.2, w: u, h: .2, css: 'border-radius:.1em', s: hidden ? { background: 'var(--accent)', opacity: '0' } : { background: 'var(--ink-2)' } }); if (t && sig[t - 1] !== v) S.el(`${k}v${t}`, { x: x0 + t * u - .1, y, w: .2, h: 2.4, s: hidden ? { background: 'var(--accent)', opacity: '0' } : { background: 'var(--ink-2)' } }); }); };
  [['CLK', 2.4], ['D', 7.4], ['Q', 12.4]].forEach(([l, y]) => text(S, 'l' + l, .8, y + .7, l, { cls: 'cz-t lg-b' }));
  wave('c', 2.4, clk); wave('d', 7.4, D); wave('q', 12.4, q, 1);
  const stepAt = t => Math.min(8, 1 + Math.floor(t * 8 / T));
  q.forEach((_, t) => { S.set('q' + t, stepAt(t), { opacity: '1' }); if (S.has('qv' + t)) S.set('qv' + t, stepAt(t), { opacity: '1' }); });
  S.el('cur', { x: x0, y: 1.6, w: .16, h: 14.6, css: 'z-index:3', s: { background: 'var(--warn)' } });
  for (let s = 1; s <= 8; s++) S.move('cur', s, x0 + Math.min(T, s * T / 8) * u - .08, 1.6);
  clk.forEach((v, t) => { if (t && v && !clk[t - 1]) text(S, 'e' + t, x0 + t * u - .6, .4, '↑', { cls: 'cz-t lg-b' }); });
  S.cap(1, '클럭이 0→1로 올라가는 순간에만', 'Only at the instant the clock rises').cap(3, 'D 값을 찍어 Q에 저장해요', 'is D captured into Q').cap(5, '그 사이에 D가 바뀌어도 Q는 그대로', 'Changes to D in between are ignored')
    .cap(8, 'CPU의 모든 레지스터가 클럭에 맞춰 이렇게 동시에 바뀌어요', 'Every CPU register updates in lockstep like this');
  return S;
}
function sCounter() {
  const S = scene({ id: 'lg-counter', steps: 8, per: .85 });
  ['Q2', 'Q1', 'Q0'].forEach((l, i) => text(S, 'l' + i, 5.6 + i * 6, 2, l, { w: 5, cls: 'cz-t cz-tc cz-mono lg-b' }));
  for (let b = 0; b < 3; b++) { const seq = Array.from({ length: 9 }, (_, n) => (Math.min(n, 7) >> (2 - b)) & 1); val(S, 'b' + b, 5.6 + b * 6, 3.6, seq, { w: 5, h: 5 }); }
  S.label('d', { cls: 'cz-t cz-tc lg-big2', x: 23.4, y: 4.6, w: 8 }, Array.from({ length: 8 }, (_, n) => [n, '= ' + n]));
  text(S, 'ck', 5.6, 11, ['클럭', 'clock'], { cls: 'cz-t lg-b' });
  for (let n = 1; n <= 7; n++) { S.el('p' + n, { x: 5.6 + (n - 1) * 3.4, y: 12.6, w: 2.4, h: 2.4, css: 'border-radius:.3em', s: hid({ background: 'var(--warn)' }) }); S.set('p' + n, n, { opacity: '1' }); }
  text(S, 'n', 1, 17, ['Q0는 매번, Q1은 2번마다, Q2는 4번마다 뒤집혀요', 'Q0 flips every tick, Q1 every 2, Q2 every 4'], { cls: 'cz-t', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, '클럭이 한 번 칠 때마다 1씩 올라가요', 'Each clock tick adds one').cap(4, '각 자리가 2배 느리게 깜박여요', 'Each bit toggles half as often as the one to its right')
    .cap(7, '111 = 7 다음엔 000으로 돌아가요', 'After 111 = 7 it wraps to 000').cap(8, '타이머·프로그램 카운터(PC)·주파수 분주기의 바탕', 'The basis of timers, the program counter and frequency dividers');
  return S;
}
function sShift() {
  const S = scene({ id: 'lg-shift', steps: 6, per: 1.1 });
  const inSeq = [1, 0, 1, 1];
  text(S, 'il', .8, 2, ['입력 →', 'in →'], { cls: 'cz-t lg-b' });
  const states = [[0, 0, 0, 0]]; inSeq.forEach(b => { const p = states[states.length - 1]; states.push([b, p[0], p[1], p[2]]); });
  states.push(states[states.length - 1]);
  for (let i = 0; i < 4; i++) val(S, 'r' + i, 5 + i * 5.6, 1, states.map(s => s[i]), { w: 5, h: 5 });
  S.label('in', { cls: 'cz-c lg-v', x: .8, y: 3.6, w: 3.2, h: 2.4 }, [[0, String(inSeq[0])], [1, String(inSeq[1])], [2, String(inSeq[2])], [3, String(inSeq[3])], [4, '–']]);
  for (let i = 0; i < 3; i++) arrow(S, 'a' + i, 10.1 + i * 5.6, 3.5, 10.5 + i * 5.6, 3.5);
  S.label('v', { cls: 'cz-t cz-mono lg-big', x: 5, y: 8.6, w: 22 }, states.map((s, k) => [k, s.join('') + ' (2) = ' + parseInt(s.join(''), 2)]));
  text(S, 'n', 1, 13, ['한 칸 오른쪽 이동 = 2로 나누기 · 왼쪽 이동 = 2배 (x << 1)', 'shift right = divide by 2 · shift left = ×2 (x << 1)'].map(t => t.replace(/</g, '&lt;')), { cls: 'cz-t lg-b', s: hid() }); S.set('n', 5, { opacity: '1' });
  S.cap(1, '클럭마다 모든 비트가 한 칸씩 이동하고', 'On each clock every bit moves one place').cap(2, '왼쪽에서 새 비트가 들어와요', 'and a new bit enters on the left')
    .cap(5, '직렬 데이터를 병렬로 바꿔요 (USB·SPI 통신)', 'It turns serial data into parallel (USB, SPI)').cap(6, '비트 연산 시프트가 곱셈·나눗셈보다 빠른 이유', 'Why bit shifts are cheaper than multiply or divide');
  return S;
}

window.UX = page([
  sec('lg-gates', '논리 게이트', 'Logic gates', '논리 게이트와 불 대수', 'Logic gates and Boolean algebra',
    '모든 디지털 회로는 0과 1을 다루는 작은 게이트로 만들어져요. 파란 선은 1, 회색 선은 0이에요.', 'Every digital circuit is built from tiny gates on 0s and 1s. Blue wires carry 1, grey wires 0.', [
    item('lg-and', 'AND · OR · NOT', 'AND · OR · NOT', 'AND는 입력이 모두 1일 때, OR는 하나라도 1일 때 1을 내고, NOT은 값을 뒤집어요.', '코드의 &&, ||, ! 과 같아요. 조건문을 단순하게 만들 때 이 규칙을 그대로 써요.', 'AND outputs 1 only if all inputs are 1, OR if any is, and NOT flips the value.', 'They are the same as &&, || and ! in code, and the same rules simplify conditions.', sBasic()),
    item('lg-xor', 'XOR · NAND · NOR', 'XOR · NAND · NOR', 'XOR는 두 입력이 다를 때 1, NAND·NOR는 AND·OR의 결과를 뒤집은 거예요. 진리표로 모든 경우를 정리해요.', 'XOR는 덧셈의 합, 패리티 검사, 간단한 암호화, 두 값 교환 트릭에 쓰여요.', 'XOR is 1 when inputs differ; NAND and NOR invert AND and OR. A truth table lists every case.', 'XOR is the sum bit of addition and appears in parity checks, simple ciphers and swap tricks.', sTruth()),
    item('lg-nand', 'NAND의 완전성', 'NAND universality', 'NAND 게이트 하나만 있으면 NOT, AND, OR, 결국 모든 회로를 만들 수 있어요.', '실제 칩은 만들기 쉬운 NAND·NOR 셀을 많이 써요. "NAND to Tetris" 강의가 바로 이걸로 컴퓨터를 만들어요.', 'With NAND alone you can build NOT, AND, OR and therefore any circuit.', 'Real chips lean on easy-to-make NAND and NOR cells; the “NAND to Tetris” course builds a whole computer this way.', sNAND()),
    item('lg-bool', '드모르간 법칙', 'De Morgan’s laws', 'NOT(A AND B) = NOT A OR NOT B, NOT(A OR B) = NOT A AND NOT B. 부정이 안으로 들어가면 AND와 OR가 바뀌어요.', '복잡하게 중첩된 부정 조건문을 읽기 쉽게 바꾸거나, SQL WHERE 조건을 정리할 때 바로 써요.', 'NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B: pushing a negation inside swaps AND and OR.', 'Use it to untangle nested negated conditions in code or SQL WHERE clauses.', sDeMorgan()),
    item('lg-kmap', '카르노 맵', 'Karnaugh map', '진리표를 격자로 펼쳐 인접한 1끼리 크게 묶어서 논리식을 가장 간단하게 줄이는 방법이에요.', '게이트 수가 줄면 칩이 작고 빨라져요. 요즘은 합성 도구가 자동으로 하지만 조건 단순화 감각을 기르는 데 좋아요.', 'Lay the truth table out as a grid and group adjacent 1s as large as possible to get the simplest expression.', 'Fewer gates mean smaller, faster chips. Tools automate it now, but it trains your feel for simplifying conditions.', sKmap())
  ]),
  sec('lg-comb', '조합 회로', 'Combinational', '조합 회로', 'Combinational circuits',
    '현재 입력만으로 출력이 정해지는 회로예요.', 'Circuits whose output depends only on the current inputs.', [
    item('lg-hadd', '반가산기', 'Half adder', '1비트 두 개를 더해 합(XOR)과 올림(AND)을 내요.', '컴퓨터의 모든 산술은 이 작은 회로에서 시작해요.', 'Adds two single bits, producing a sum (XOR) and a carry (AND).', 'All computer arithmetic grows from this little circuit.', sHalf()),
    item('lg-fadd', '전가산기', 'Full adder', '두 비트와 아랫자리에서 올라온 올림까지 세 비트를 더해 합과 올림을 내요. 반가산기 두 개와 OR로 만들어요.', '전가산기를 이어 붙이면 몇 비트든 더하는 가산기가 되고, 2의 보수와 합치면 뺄셈도 해요. ALU의 핵심 부품이에요.', 'Adds two bits plus the carry from the previous column, built from two half adders and an OR.', 'Chain full adders for any width; with two’s complement they also subtract. It is the heart of the ALU.', sFull()),
    item('lg-ripple', '리플 캐리 가산기', 'Ripple-carry adder', '전가산기를 일렬로 이어 여러 비트를 더해요. 올림이 아랫자리부터 차례로 전달돼서 비트 수만큼 지연돼요.', '실제 CPU는 올림을 미리 계산하는 캐리 룩어헤드 가산기로 지연을 줄여요. 회로 깊이가 클럭 속도를 정해요.', 'Full adders chained in a row add multi-bit numbers, but the carry ripples through one stage at a time.', 'Real CPUs use carry-lookahead adders to cut the delay; circuit depth limits clock speed.', sRipple()),
    item('lg-mux', '멀티플렉서', 'Multiplexer', '선택 신호에 따라 여러 입력 중 하나를 출력으로 보내는 전자 스위치예요.', 'CPU에서 ALU 입력을 레지스터 중 하나로 고르는 등 데이터 경로 곳곳에 있어요. 코드의 switch문과 같은 역할이에요.', 'An electronic switch that forwards one of several inputs, chosen by select lines.', 'It appears throughout CPU datapaths, such as choosing which register feeds the ALU; it is a hardware switch statement.', sMux()),
    item('lg-decoder', '디코더', 'Decoder', 'n비트 입력을 받아 2ⁿ개의 출력 중 정확히 하나만 켜요.', '메모리 주소로 어느 칩·행을 쓸지 고르고, 명령어의 종류를 해석하는 데 써요.', 'Takes an n-bit input and turns on exactly one of 2ⁿ outputs.', 'It selects memory chips or rows from an address and decodes instruction types.', sDecoder())
  ]),
  sec('lg-seq', '순차 회로', 'Sequential', '순차 회로와 기억', 'Sequential circuits and memory',
    '되먹임과 클럭으로 이전 상태를 기억하는 회로예요.', 'Circuits that remember using feedback and a clock.', [
    item('lg-latch', 'SR 래치', 'SR latch', '두 NOR 게이트의 출력을 서로의 입력으로 되먹이면, 입력을 떼도 값을 유지하는 1비트 기억 장치가 돼요.', '되먹임이 기억을 만들어요. CPU 캐시(SRAM)는 이런 래치 수십억 개로 이뤄져 있어요.', 'Cross-feeding two NOR gates creates a one-bit memory that holds its value after the inputs are released.', 'Feedback creates memory; CPU caches (SRAM) are billions of such cells.', sLatch()),
    item('lg-dff', 'D 플립플롭', 'D flip-flop', '클럭이 올라가는 순간에만 입력 D를 저장하고, 그 외엔 값을 유지해요.', '모든 레지스터와 상태 기계가 클럭에 맞춰 동시에 바뀌게 해 주는 부품이에요. 클럭 속도(GHz)가 바로 이 박자예요.', 'Captures input D only at the rising clock edge and holds it otherwise.', 'It makes registers and state machines change in lockstep; the clock speed in GHz is this beat.', sDFF()),
    item('lg-counter', '카운터', 'Counter', '플립플롭을 이어 클럭마다 값이 1씩 올라가게 만든 회로예요.', '타이머, 프로그램 카운터(PC), 주파수 분주기에 써요. 범위를 넘으면 0으로 돌아가는 것도 정수 오버플로와 같아요.', 'Flip-flops chained so the value goes up by one every clock tick.', 'Used for timers, the program counter and frequency dividers; wrapping to zero is the same as integer overflow.', sCounter()),
    item('lg-shift', '시프트 레지스터', 'Shift register', '클럭마다 저장된 비트들을 한 칸씩 옮겨요. 직렬 데이터를 병렬로(또는 반대로) 바꿀 수 있어요.', 'USB·SPI 같은 직렬 통신에 써요. 소프트웨어의 비트 시프트(<<, >>)가 2배·절반 연산인 이유도 같아요.', 'Moves its stored bits one place on every clock, converting serial data to parallel or back.', 'Used in serial links like USB and SPI; it is also why software bit shifts (<<, >>) multiply or divide by two.', sShift())
  ])
]);
window.UX[0].css += `
.lg-v .in{font-family:var(--f-mono);font-size:.95em;font-weight:800}
.lg-g .in{font-size:.8em;font-weight:900;letter-spacing:.04em}
.lg-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.lg-big .in{font-size:1.1em;font-weight:800;color:var(--ink)}
.lg-big2 .in{font-size:1.6em;font-weight:900;color:var(--ink)}
.lg-code{place-items:center start!important;padding-left:.7em}
.lg-code .in{font-family:var(--f-mono);font-size:.6em}`;
})();
