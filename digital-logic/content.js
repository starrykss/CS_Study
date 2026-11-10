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
  for (let i = 0; i < 3; i++) { const x = 1.6 + (3 - i) * 7.4; arrow(S, 'c' + i, x - .2, 8.2, x - 1.2, 8.2, { s: Object.assign({ opacity: '.35' }, AR.ink) }); S.set('c' + i, i + 2, Object.assign({ opacity: '1' }, AR.acc)); text(S, 'cl' + i, x - 1.0, 6.9, '1', { cls: 'cz-t cz-mono lg-b', s: hid() }); S.set('cl' + i, i + 2, { opacity: '1' }); }
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'lgx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono lgx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono lgx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c lgx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono lgx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c lgx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'lgx-s lgx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono lgx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono lgx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono lgx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono lgx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono lgx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'lgx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'lgx-xs', 5));


const CSSX = `
.lgx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.lgx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.lgx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.lgx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.lgx-r .in{color:var(--danger);font-weight:800}
.lgx-g .in{color:var(--ok);font-weight:800}
.lgx-a .in{color:var(--accent);font-weight:800}
.lgx-w .in{color:var(--warn);font-weight:800}
.lgx-c .in{font-size:.6em;font-weight:700}
.lgx-c2 .in{font-size:.5em;font-weight:700}
.lgx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.lgx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

/* ---- logic extension helpers (reuse wire / wv / val / gate from the page) ---- */
const wave = (S, k, x0, y, u, bits, h, color, st, o = {}) => { let x = x0, prev = null; bits.forEach((b, i) => { const yy = y - b * h; if (prev !== null && prev !== b) seg(S, `${k}v${i}`, [x, y - prev * h], [x, yy], st, color, .1, { off: o.off }); seg(S, `${k}h${i}`, [x, yy], [x + u, yy], st, color, .1, { off: o.off }); x += u; prev = b; }); };
const lbl = (S, k, x, y, t, cls, st, o) => T(S, k, x, y, t, cls || 'lgx-xs', st || 0, o);

/* ================= gates & boolean extras ================= */
function sCmos() {
  const S = scene({ id: 'lg-cmos', steps: 5, per: 1.5 });
  lbl(S, 'h1', 1, .8, ['CMOS 인버터 (NOT)', 'CMOS inverter (NOT)'], 'lgx-xs lgx-a', 0);
  hl(S, 'vdd', 3, 11, 2, 'danger', 0, { w: .16 }); lbl(S, 'vl', 11.4, 1.6, 'VDD (1)', 'cz-mono lgx-xs lgx-r'); hl(S, 'gnd', 3, 11, 14.4, 'ink-3', 0, { w: .16 }); lbl(S, 'gl', 11.4, 14, 'GND (0)', 'cz-mono lgx-xs');
  const A = [0, 0, 1, 1, 1, 1];
  box2(S, 'p', 6, 3.4, 3, 2.4, 'PMOS', 'line', 0, { pct: 45 }); box2(S, 'n', 6, 10.4, 3, 2.4, 'NMOS', 'line', 0, { pct: 45 });
  tsets(S, 'p', [[1, 'ok', 45], [2, 'line', 45]]); tsets(S, 'n', [[2, 'ok', 45]]);
  wire(S, 'wp', [[7.5, 2], [7.5, 3.4]]); wire(S, 'wp2', [[7.5, 5.8], [7.5, 8.1]]); wire(S, 'wn', [[7.5, 8.1], [7.5, 10.4]]); wire(S, 'wn2', [[7.5, 12.8], [7.5, 14.4]]);
  wv(S, 'wp', [0, 1, 0, 0, 0, 0]); wv(S, 'wp2', [0, 1, 0, 0, 0, 0]); wv(S, 'wn', [0, 0, 1, 1, 1, 1]); wv(S, 'wn2', [0, 0, 1, 1, 1, 1]);
  val(S, 'a', 1, 7, A); lbl(S, 'al', 1.2, 5.6, 'A', 'lgx-s', 0); wire(S, 'wo', [[7.5, 8.1], [10.6, 8.1]]); val(S, 'o', 10.8, 7, A.map(v => 1 - v));
  lbl(S, 'pn', 1, 15.4, ['P: 입력 0일 때 켜져 출력을 1로 끌어올림', 'P turns on for 0 and pulls the output up to 1'], 'lgx-xs', 1); lbl(S, 'nn', 1, 16.6, ['N: 입력 1일 때 켜져 출력을 0으로 끌어내림', 'N turns on for 1 and pulls the output down to 0'], 'lgx-xs', 2);
  lbl(S, 'h2', 16.4, .8, ['CMOS NAND', 'CMOS NAND'], 'lgx-xs lgx-a', 3);
  hl(S, 'vdd2', 17, 30, 2, 'danger', 3, { w: .16 }); hl(S, 'gnd2', 17, 30, 14.4, 'ink-3', 3, { w: .16 });
  box2(S, 'pa', 18, 3.4, 3, 2.4, 'P(A)', 'line', 3, { pct: 45 }); box2(S, 'pb', 24, 3.4, 3, 2.4, 'P(B)', 'line', 3, { pct: 45 });
  box2(S, 'na', 21, 9.2, 3, 2.2, 'N(A)', 'line', 3, { pct: 45 }); box2(S, 'nb', 21, 12, 3, 2.2, 'N(B)', 'line', 3, { pct: 45 });
  tsets(S, 'na', [[3, 'ok', 45]]); tsets(S, 'pb', [[3, 'ok', 45], [4, 'line', 45]]); tsets(S, 'nb', [[4, 'ok', 45]]);
  seg(S, 'nw1', [19.5, 5.8], [19.5, 7.6], 3, 'ink-3', .12); seg(S, 'nw2', [25.5, 5.8], [25.5, 7.6], 3, 'ink-3', .12); seg(S, 'nw3', [19.5, 7.6], [27.6, 7.6], 3, 'ink-3', .12); seg(S, 'nw4', [22.5, 7.6], [22.5, 9.2], 3, 'ink-3', .12);
  T(S, 'ab3', 16.4, 15.4, ['A=1, B=0 → 위쪽 P(B)가 켜져 출력 1', 'A=1, B=0 → P(B) on, output 1'], 'lgx-xs', 3, { off: 4 });
  T(S, 'ab4', 16.4, 15.4, ['A=1, B=1 → 아래 N 두 개가 모두 켜져 출력 0', 'A=1, B=1 → both N on, output 0'], 'lgx-xs lgx-r', 4);
  val(S, 'o2', 28, 6.5, [0, 0, 0, 1, 0, 0]); S.set('o20', 0, hid()); vis(S, 'o20', 3); seg(S, 'nw5', [27.6, 7.6], [28, 7.6], 3, 'ink-3', .12);
  fin(S, 'z', 17.8, [['P는 1 쪽으로, N은 0 쪽으로 · 항상 한쪽만 켜져 평소엔 전류가 거의 안 흘러요 (저전력)', 'P pulls toward 1, N toward 0 · only one side conducts, so idle current is tiny (low power)', 'lgx-xs lgx-a'], ['NAND는 트랜지스터 4개, AND는 NAND + NOT으로 6개 · 그래서 칩은 NAND로 생각해요', 'NAND takes 4 transistors, AND needs 6 (NAND + NOT) · chips are built around NAND']]);
  S.cap(1, '입력 0: 위쪽 스위치가 켜져요', 'Input 0: the top switch closes').cap(2, '입력 1: 아래쪽 스위치가 켜져요', 'Input 1: the bottom switch closes').cap(3, 'NAND: P는 병렬, N은 직렬', 'NAND: P in parallel, N in series').cap(4, '둘 다 1일 때만 0', 'Only both 1s give 0').cap(5, '트랜지스터로 만드는 게이트 (CMOS)', 'Gates from transistors (CMOS)');
  return S;
}
function sSop() {
  const S = scene({ id: 'lg-sop', steps: 5, per: 1.5 });
  lbl(S, 'th', 1, 1, 'A B C │ F', 'cz-mono lgx-s lgx-a');
  for (let m = 0; m < 8; m++) { const a = m >> 2 & 1, b = m >> 1 & 1, c = m & 1, f = a + b + c >= 2 ? 1 : 0, y = 2.4 + m * 1.2;
    rect(S, 'rb' + m, .8, y - .1, 9.2, 1.1, f ? 'ok' : 'line', f ? 10 : 20, 0, { r: .15 }); if (f) tsets(S, 'rb' + m, [[2, 'ok', 40]]);
    lbl(S, 'r' + m, 1, y, `${a} ${b} ${c} │ ${f}`, 'cz-mono lgx-s'); lbl(S, 'mn' + m, 7.6, y + .1, 'm' + m, 'cz-mono lgx-xs ' + (f ? 'lgx-g' : ''), 2); }
  lbl(S, 'f1', 1, 12.4, ['다수결: 셋 중 둘 이상이 1이면 1', 'majority: 1 when at least two inputs are 1'], 'lgx-xs', 1);
  const TM = ["A'BC", "AB'C", "ABC'", 'ABC'];
  TM.forEach((t, i) => { box2(S, 'tm' + i, 12 + i * 4.8, 2.2, 4.4, 1.6, t, 'ok', 3, { pct: 30 }); });
  lbl(S, 'sop', 12, 4.4, "F = A'BC + AB'C + ABC' + ABC", 'cz-mono lgx-s lgx-a', 3); lbl(S, 'sopn', 12, 5.6, ['1인 줄마다 AND 항 하나 → 모두 OR (곱의 합, SOP)', 'one AND term per 1-row, all ORed (sum of products)'], 'lgx-xs', 3);
  TM.forEach((t, i) => { gate(S, 'g' + i, 13, 7.2 + i * 2, 4, 1.6, 'AND'); seg(S, 'gw' + i, [17.1, 8 + i * 2], [21.9, 11], 4, 'ink-3', .1); });
  gate(S, 'go', 22, 9.8, 4, 2.4, 'OR'); seg(S, 'gow', [26.1, 11], [28, 11], 4, 'ink-3', .1); lbl(S, 'gol', 28.2, 10.5, 'F', 'cz-mono lgx-s', 4);
  ['g0', 'g1', 'g2', 'g3', 'go'].forEach(k => { S.set(k, 0, hid()); vis(S, k, 4); });
  lbl(S, 'pos', 12, 16, ["POS: 0인 줄로 OR 항 → F = (A+B+C)(A+B+C')(A+B'+C)(A'+B+C)", "POS: OR terms from 0-rows → F = (A+B+C)(A+B+C')(A+B'+C)(A'+B+C)"], 'cz-mono lgx-tiny', 5);
  lbl(S, 'simp', 12, 17.2, ["카르노 맵으로 줄이면 F = AB + BC + AC", 'a Karnaugh map shrinks it to F = AB + BC + AC'], 'lgx-xs lgx-g', 5);
  notes(S, 'n', 15.3, [['진리표가 주어졌어요', 'start from a truth table'], ['출력이 1인 줄(최소항)을 찾아요', 'find the rows where the output is 1 (minterms)'], ['그 줄을 그대로 AND 항으로 적고 OR로 묶어요', 'write each as an AND term and OR them together'], ['AND 층 + OR 층 = 2단 회로 · 어떤 함수든 이렇게 만들 수 있어요', 'an AND layer plus an OR layer: any function can be built this way']], 'lgx-xs');
  S.cap(1, '진리표', 'A truth table').cap(2, '1이 나오는 줄', 'The rows that output 1').cap(3, '줄마다 AND 항', 'One AND term per row').cap(4, 'AND–OR 2단 회로', 'A two-level AND–OR circuit').cap(5, '진리표에서 논리식으로 (SOP·POS)', 'From truth table to formula (SOP, POS)');
  return S;
}
function sBoolAlg() {
  const S = scene({ id: 'lg-boolalg', steps: 5, per: 1.5 });
  const LAW = [['A + 0 = A', 'A · 1 = A', ['항등', 'identity']], ['A + 1 = 1', 'A · 0 = 0', ['지배', 'null']], ["A + A' = 1", "A · A' = 0", ['보수', 'complement']], ['A + AB = A', 'A(A + B) = A', ['흡수', 'absorption']], ['A(B + C) = AB + AC', 'A + BC = (A+B)(A+C)', ['분배', 'distributive']]];
  LAW.forEach(([l, r, n], i) => { lbl(S, 'ln' + i, 1, 1.2 + i * 1.3, n, 'lgx-xs lgx-a', 1); lbl(S, 'll' + i, 6, 1.2 + i * 1.3, l, 'cz-mono lgx-xs', 1); lbl(S, 'lr' + i, 17, 1.2 + i * 1.3, r, 'cz-mono lgx-xs', 1); });
  const ST = [["F = AB + AB' + A'B", 2, ''], ["  = A(B + B') + A'B", 3, ['분배로 A를 묶어요', 'factor A out (distributive)']], ["  = A · 1 + A'B = A + A'B", 3, ['B + B\' = 1 (보수)', 'B + B\' = 1 (complement)']], ['  = A + B', 4, ["A + A'B = A + B", "A + A'B = A + B"]]];
  ST.forEach(([e, st, why], i) => { lbl(S, 'e' + i, 1, 8.4 + i * 1.4, e, 'cz-mono lgx-s ' + (i === 3 ? 'lgx-g' : ''), st); if (why) lbl(S, 'w' + i, 17, 8.5 + i * 1.4, why, 'lgx-xs', st); });
  lbl(S, 'g1', 1, 14.4, ['간소화 전: AND 3개 + NOT 2개 + OR 1개', 'before: 3 ANDs, 2 NOTs and an OR'], 'lgx-xs lgx-r', 4); lbl(S, 'g2', 17, 14.4, ['간소화 후: OR 하나', 'after: a single OR gate'], 'lgx-xs lgx-g', 4);
  notes(S, 'n', 16, [['불 대수의 기본 법칙들', 'the basic laws of Boolean algebra'], ['이 식을 줄여 봐요', 'let’s simplify this expression'], ['법칙을 하나씩 적용해요', 'apply the laws one at a time'], ['같은 동작, 훨씬 적은 게이트', 'same behavior, far fewer gates']], 'lgx-s');
  fin(S, 'z', 16, [['게이트가 줄면 칩 면적·전력·지연이 함께 줄어요', 'fewer gates mean less area, power and delay', 'lgx-xs lgx-a'], ['손으론 카르노 맵, 변수가 많으면 콰인–매클러스키나 합성 도구(Yosys 등)가 해요', 'by hand use Karnaugh maps; with many variables Quine–McCluskey or synthesis tools (e.g. Yosys)']]);
  S.cap(1, '불 대수 법칙', 'Laws of Boolean algebra').cap(2, '줄일 식', 'An expression to simplify').cap(3, '법칙을 적용해요', 'Apply the laws').cap(4, 'A + B로 줄었어요', 'It reduces to A + B').cap(5, '불 대수로 간소화', 'Simplifying with Boolean algebra');
  return S;
}
function sTri() {
  const S = scene({ id: 'lg-tri', steps: 5, per: 1.5 });
  hl(S, 'bus', 2, 30, 11, 'ink-3', 0, { w: .3 }); lbl(S, 'bl', 2, 11.6, ['공유 버스 (선 하나)', 'shared bus (one wire)'], 'lgx-xs');
  const D = [['CPU', 1, 3], ['RAM', 2, 1], ['I/O', 3, 0]], EN = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0]];
  D.forEach(([n], i) => { const x = 3 + i * 9; box2(S, 'd' + i, x, 2, 6, 2.2, n, 'accent', 0, { pct: 22 }); seg(S, 'dw' + i, [x + 3, 4.3], [x + 3, 6.2], 0, 'ink-3', .12);
    gate(S, 'tb' + i, x + 1.6, 6.2, 2.8, 2, 'TRI'); seg(S, 'tw' + i, [x + 3, 8.3], [x + 3, 10.8], 0, 'ink-3', .12);
    lbl(S, 'en' + i, x + 4.8, 6.6, 'EN', 'cz-mono lgx-xs');
    EN.forEach((row, s) => { const st = s + 1; T(S, `ev${i}_${s}`, x + 4.8, 7.6, row[i] ? '1' : '0', 'cz-mono lgx-s ' + (row[i] ? 'lgx-g' : ''), st, { off: st + 1 > 4 ? 0 : st + 1 }); if (row[i]) S.set('tw' + i, st, { background: 'var(--ok)' }); else S.set('tw' + i, st, { background: 'var(--line)' }); }); });
  [['CPU가 버스를 써요 · 나머지는 Z (끊김)', 'the CPU drives the bus · the rest are Z (disconnected)', 1], ['RAM 차례 · CPU는 손을 떼요', 'the RAM’s turn · the CPU lets go', 2], ['I/O 차례', 'the I/O device’s turn', 3]].forEach(([a, b, s]) => T(S, 'bs' + s, 2, 13, [a, b], 'lgx-s lgx-g', s, { off: s + 1 }));
  T(S, 'bx', 2, 13, ['둘이 동시에 켜지면 충돌 ✗ (1과 0이 맞붙어 과전류)', 'two drivers at once collide ✗ (1 fights 0, overcurrent)'], 'lgx-s lgx-r', 4); xm(S, 'bxx', 16, 11, 4);
  fin(S, 'z', 15.2, [['3상태 버퍼: EN=1이면 입력을 그대로, EN=0이면 높은 임피던스(Z) = 선에서 빠진 것처럼', 'a tri-state buffer passes its input when EN = 1 and floats (high impedance, Z) when EN = 0', 'lgx-xs lgx-a'], ['디코더가 EN을 하나만 켜 주는 덕분에 여러 장치가 선 하나를 나눠 써요', 'a decoder enables exactly one, so many devices share one wire'], ['I²C 같은 버스는 오픈 드레인으로 충돌 없이 여럿이 0을 끌어내리게 해요', 'buses like I²C use open drain so several devices can safely pull the line low']]);
  S.cap(1, '버스는 선 하나를 나눠 써요', 'A bus is one shared wire').cap(2, 'EN으로 차례를 정해요', 'EN decides whose turn it is').cap(3, '나머지는 Z로 빠져요', 'Everyone else floats at Z').cap(4, '둘이 켜지면 충돌', 'Two drivers collide').cap(5, '3상태 버퍼와 버스', 'Tri-state buffers and buses');
  return S;
}
function sParity() {
  const S = scene({ id: 'lg-parity', steps: 5, per: 1.5 });
  const B = [1, 0, 1, 1, 0, 0, 1], X = i => 2 + i * 2.6;
  lbl(S, 'hs', 1, .8, ['보내는 쪽', 'sender'], 'lgx-xs lgx-a');
  B.forEach((b, i) => box2(S, 'b' + i, X(i), 2, 2.2, 1.8, String(b), 'accent', 0, { pct: 22 }));
  box2(S, 'pb', X(7) + .4, 2, 2.2, 1.8, '0', 'warn', 1, { pct: 40 }); lbl(S, 'pbl', X(7) + .2, 4.1, ['패리티', 'parity'], 'lgx-xs lgx-w', 1);
  lbl(S, 'px', 1, 4.4, ['1의 개수 = 4 (짝수) → XOR 트리 = 0', 'four 1s (even) → XOR tree = 0'], 'cz-mono lgx-xs', 1);
  [[2.2, 6.4], [7.4, 6.4], [12.6, 6.4], [4.8, 8.8], [10.4, 8.8], [7.6, 11.2]].forEach(([x, y], i) => gate(S, 'xg' + i, x, y, 3.6, 1.6, 'XOR'));
  ['xg0', 'xg1', 'xg2', 'xg3', 'xg4', 'xg5'].forEach(k => { S.set(k, 0, hid()); vis(S, k, 1, 3); });
  lbl(S, 'hr', 17, 6.2, ['받는 쪽: 한 비트가 뒤집혀 도착', 'receiver: one bit flipped in transit'], 'lgx-xs lgx-r', 3);
  [1, 0, 0, 1, 0, 0, 1, 0].forEach((b, i) => box2(S, 'r' + i, 17 + i * 1.75, 7.6, 1.55, 1.6, String(b), i === 2 ? 'danger' : i === 7 ? 'warn' : 'accent', 3, { pct: i === 2 ? 45 : 22 }));
  lbl(S, 'rx', 17, 9.8, ['8비트 XOR = 1 → 오류 감지 ✗', 'XOR of all 8 bits = 1 → error detected ✗'], 'cz-mono lgx-xs lgx-r', 3);
  lbl(S, 'r2', 17, 11.4, ['두 비트가 뒤집히면 XOR = 0 → 못 알아채요', 'two flipped bits give XOR = 0 → undetected'], 'lgx-xs', 4);
  lbl(S, 'hm', 17, 12.8, ['해밍 코드: 패리티 여러 개로 위치까지 찾아 고쳐요', 'Hamming codes locate and fix the error'], 'lgx-xs lgx-g', 4);
  notes(S, 'n', 14.6, [['짝수 패리티: 1의 개수가 짝수가 되도록 비트 하나를 덧붙여요', 'even parity: append one bit so the count of 1s is even'], ['XOR 게이트 트리가 그 비트를 계산해요', 'a tree of XOR gates computes it'], ['받는 쪽이 다시 XOR → 1이면 홀수 개 오류', 'the receiver XORs again → 1 means an odd number of errors'], ['짝수 개 오류는 놓쳐요 → 더 강한 부호가 필요', 'an even number of errors slips through → stronger codes help']], 'lgx-xs');
  fin(S, 'z', 14.6, [['UART 직렬 통신, 옛 RAM, RAID 5(블록 XOR)에 쓰여요', 'used in UART serial links, older RAM and RAID 5 (block XOR)', 'lgx-xs lgx-a'], ['ECC 메모리는 해밍 계열 부호로 1비트를 고치고 2비트를 감지해요 (SECDED)', 'ECC memory uses Hamming-style codes to fix 1 bit and detect 2 (SECDED)']]);
  S.cap(1, '패리티 비트를 붙여요', 'Append a parity bit').cap(2, 'XOR 트리가 계산해요', 'An XOR tree computes it').cap(3, '도착한 쪽이 검사해요', 'The receiver checks it').cap(4, '한계와 해밍 코드', 'Limits, and Hamming codes').cap(5, '패리티와 오류 검출', 'Parity and error detection');
  return S;
}

/* ================= combinational extras ================= */
function sEncoder() {
  const S = scene({ id: 'lg-encoder', steps: 5, per: 1.5 });
  const I = [[0, 0, 1, 0], [0, 1, 0, 1], [1, 1, 0, 1], [0, 0, 0, 0]];
  const seqI = j => [0].concat(I.map(r => r[3 - j])).concat([I[3][3 - j]]);
  [3, 2, 1, 0].forEach((j, r) => { lbl(S, 'il' + j, 1, 2.6 + r * 2.8, 'I' + j, 'cz-mono lgx-s', 0); val(S, 'i' + j, 3, 2 + r * 2.8, seqI(j)); wire(S, 'wi' + j, [[5.4, 3.1 + r * 2.8], [10, 3.1 + r * 2.8]]); wv(S, 'wi' + j, seqI(j)); });
  box2(S, 'pe', 10.2, 1.8, 7, 11, ['우선순위 인코더', 'priority encoder'], 'accent', 0, { pct: 18 });
  const Y1 = [0, 0, 1, 1, 0, 0], Y0 = [0, 1, 0, 1, 0, 0], V = [0, 1, 1, 1, 0, 0];
  [['Y1', Y1, 3.4], ['Y0', Y0, 6.4], ['V', V, 9.4]].forEach(([n, sq, y], i) => { wire(S, 'wo' + i, [[17.4, y + 1.1], [21, y + 1.1]]); wv(S, 'wo' + i, sq); val(S, 'o' + i, 21.2, y, sq); lbl(S, 'ol' + i, 24, y + .5, n, 'cz-mono lgx-s', 0); });
  [['I1만 1 → 01', 'only I1 → 01', 1], ['I2와 I0 → 높은 I2가 이겨요 → 10', 'I2 and I0 → the higher I2 wins → 10', 2], ['I3·I2·I0 → I3가 이겨요 → 11', 'I3, I2 and I0 → I3 wins → 11', 3], ['아무것도 없음 → V = 0 (출력 무효)', 'nothing set → V = 0 (output invalid)', 4]].forEach(([a, b, s]) => T(S, 'c' + s, 1, 14, [a, b], 'lgx-s', s, { off: s + 1 }));
  fin(S, 'z', 14, [['인코더: 2ⁿ개 입력 중 켜진 것의 번호를 n비트로 (디코더의 반대)', 'an encoder turns which-of-2ⁿ-inputs into an n-bit number (the decoder’s inverse)', 'lgx-xs lgx-a'], ['우선순위 인코더는 여러 개가 켜져도 가장 높은 것만 골라요', 'a priority encoder picks the highest when several are on'], ['인터럽트 컨트롤러가 가장 급한 요청을 고를 때, 키보드 스캔에 써요', 'interrupt controllers use it to pick the most urgent request; so do keyboard scanners']]);
  S.cap(1, '하나만 켜졌을 때', 'One input on').cap(2, '여러 개가 켜지면 높은 쪽', 'Several on: the higher wins').cap(3, '가장 높은 I3가 이겨요', 'I3, the highest, wins').cap(4, '아무것도 없으면 무효', 'None on: invalid').cap(5, '우선순위 인코더', 'Priority encoder');
  return S;
}
function sCmp() {
  const S = scene({ id: 'lg-cmp', steps: 5, per: 1.5 });
  const A = '1011', B = '1001';
  lbl(S, 'al', 1, 2.3, 'A', 'cz-mono lgx-s lgx-a'); lbl(S, 'bl', 1, 4.7, 'B', 'cz-mono lgx-s lgx-w');
  A.split('').forEach((c, i) => { box2(S, 'a' + i, 3 + i * 3.2, 1.8, 2.8, 1.8, c, 'accent', 0, { pct: 22 }); box2(S, 'b' + i, 3 + i * 3.2, 4.2, 2.8, 1.8, B[i], 'warn', 0, { pct: 22 }); });
  lbl(S, 'msb', 3, .5, 'MSB →', 'cz-mono lgx-tiny', 0);
  [0, 1, 2].forEach(i => { const st = i + 1, eq = A[i] === B[i]; T(S, 'r' + i, 3 + i * 3.2, 6.4, eq ? '=' : '>', 'cz-tc cz-mono lgx-l ' + (eq ? 'lgx-a' : 'lgx-g'), st, { w: 2.8 }); tsets(S, 'a' + i, [[st, eq ? 'accent' : 'ok', 50]]); tsets(S, 'b' + i, [[st, eq ? 'warn' : 'line', 50]]); });
  lbl(S, 'xn', 16.6, 1.8, ['자리마다 XNOR = 같음', 'per bit: XNOR = equal'], 'lgx-xs', 1);
  lbl(S, 'f1', 16.6, 3.2, ['위 자리가 같으면 다음 자리를 봐요', 'equal so far → look at the next bit'], 'lgx-xs', 2);
  lbl(S, 'f2', 16.6, 4.6, ['처음 다른 자리에서 결정: 1 > 0', 'the first differing bit decides: 1 > 0'], 'lgx-xs lgx-g', 3);
  [['A > B', 1], ['A = B', 0], ['A < B', 0]].forEach(([n, v], i) => { box2(S, 'o' + i, 16.6 + i * 4.8, 7.6, 4.4, 2, n, 'line', 0, { pct: 40 }); if (v) tsets(S, 'o' + i, [[3, 'ok', 50]]); });
  lbl(S, 'eq', 1, 10.4, 'A>B = A₃B₃′ + (A₃⊙B₃)·A₂B₂′ + (A₃⊙B₃)(A₂⊙B₂)·A₁B₁′ + …', 'cz-mono lgx-xs lgx-a', 4);
  lbl(S, 'eq2', 1, 11.6, ['⊙ = XNOR(같음) · 위 자리가 모두 같고 이 자리에서 A가 1, B가 0', '⊙ = XNOR (equal) · all higher bits equal and here A is 1, B is 0'], 'lgx-xs', 4);
  notes(S, 'n', 13.4, [['두 4비트 수 A = 11, B = 9를 비교해요', 'compare two 4-bit numbers, A = 11 and B = 9'], ['맨 앞 자리가 같아요', 'the top bits match'], ['다음 자리도 같아요', 'so do the next ones'], ['세 번째 자리에서 A가 1, B가 0 → A > B', 'at the third bit A has 1, B has 0 → A > B']], 'lgx-s');
  fin(S, 'z', 13.4, [['크기 비교기는 높은 자리부터 “같음”을 이어 가다 처음 달라지는 곳에서 결정해요', 'a magnitude comparator chains “equal so far” from the top and decides at the first difference', 'lgx-xs lgx-a'], ['74HC85처럼 칩끼리 이어 붙여 8·16비트로 넓힐 수 있어요', 'chips like the 74HC85 cascade to 8 or 16 bits'], ['CPU는 대개 A − B를 계산해 플래그(Z, N, C)로 비교해요', 'CPUs usually compute A − B and compare via flags (Z, N, C)']]);
  S.cap(1, '높은 자리부터 비교', 'Compare from the top bit').cap(2, '같으면 다음 자리', 'Equal? Move to the next bit').cap(3, '처음 다른 자리에서 결정', 'The first difference decides').cap(4, '회로로 쓰면', 'As a circuit').cap(5, '크기 비교기', 'Magnitude comparator');
  return S;
}
function sCla() {
  const S = scene({ id: 'lg-cla', steps: 5, per: 1.5 });
  lbl(S, 'h1', 1, .8, ['리플 캐리: 올림이 한 자리씩 차례로', 'ripple carry: the carry crawls bit by bit'], 'lgx-xs lgx-r', 1);
  for (let i = 0; i < 8; i++) { rect(S, 'rp' + i, 2 + i * 1.6, 2 + i * .2, 1.5, .9, 'danger', 40, 1, { r: .1 }); }
  lbl(S, 'rpl', 15.4, 3, ['C₈은 게이트 지연 × 8 뒤에야', 'C₈ arrives after 8 gate delays'], 'lgx-xs', 1);
  const A = '1011', B = '0111';
  lbl(S, 'tab', 1, 5.6, ['자리 i:  A  B │ G = A·B  P = A⊕B', 'bit i:  A  B │ G = A·B  P = A⊕B'], 'cz-mono lgx-xs lgx-a', 2);
  [3, 2, 1, 0].forEach((i, r) => { const a = +A[3 - i], b = +B[3 - i]; lbl(S, 'tr' + i, 1, 6.8 + r * 1.1, `  ${i}     ${a}  ${b} │    ${a & b}         ${a ^ b}`, 'cz-mono lgx-xs', 2); });
  lbl(S, 'gp', 17, 5.6, ['G: 여기서 올림을 만들어요', 'G: this bit generates a carry'], 'lgx-xs', 2); lbl(S, 'gp2', 17, 6.8, ['P: 들어온 올림을 넘겨줘요', 'P: this bit propagates a carry'], 'lgx-xs', 2);
  ['C₁ = G₀ + P₀C₀', 'C₂ = G₁ + P₁G₀ + P₁P₀C₀', 'C₃ = G₂ + P₂G₁ + P₂P₁G₀ + P₂P₁P₀C₀'].forEach((l, i) => lbl(S, 'cf' + i, 1, 11.6 + i * 1.1, l, 'cz-mono lgx-xs lgx-g', 3));
  lbl(S, 'cfn', 17, 11.6, ['모든 올림을 G·P로 바로 계산', 'every carry straight from G and P'], 'lgx-xs', 3); lbl(S, 'cfn2', 17, 12.7, ['→ AND 한 층 + OR 한 층', '→ one AND level + one OR level'], 'lgx-xs', 3);
  for (let i = 0; i < 8; i++) rect(S, 'cl' + i, 2 + i * 1.6, 15.2, 1.5, .9, 'ok', 45, 4, { r: .1 });
  lbl(S, 'cll', 15.4, 15.1, ['룩어헤드: 모든 올림이 거의 동시에', 'lookahead: all carries at nearly once'], 'lgx-xs lgx-g', 4);
  notes(S, 'n', 17, [['리플 캐리는 올림이 앞자리 결과를 기다려 느려요 (O(n))', 'ripple carry waits on every lower bit: O(n)'], ['자리마다 G(생성)와 P(전파)를 먼저 구해요', 'first compute generate (G) and propagate (P) for each bit'], ['올림을 G·P만으로 펼쳐 쓰면 기다릴 필요가 없어요', 'expanding carries in G and P removes the waiting'], ['결과: 덧셈 시간이 자릿수와 거의 무관해져요', 'result: addition time barely grows with width']], 'lgx-xs');
  fin(S, 'z', 17, [['자리가 많으면 식이 길어져서 4비트 블록을 계층으로 묶어요 (O(log n))', 'wide adders group 4-bit blocks hierarchically (O(log n))', 'lgx-xs lgx-a'], ['CPU의 64비트 덧셈기는 콕–스톤 같은 병렬 접두 덧셈기를 써요', '64-bit CPU adders use parallel-prefix designs such as Kogge–Stone']]);
  S.cap(1, '리플 캐리는 느려요', 'Ripple carry is slow').cap(2, '생성 G와 전파 P', 'Generate G and propagate P').cap(3, '올림을 미리 계산해요', 'Compute carries ahead of time').cap(4, '모든 올림이 한꺼번에', 'All carries at once').cap(5, '캐리 룩어헤드 가산기', 'Carry-lookahead adder');
  return S;
}
function sAlu() {
  const S = scene({ id: 'lg-alu', steps: 5, per: 1.5 });
  poly2(S, 'alu', [[6, 4], [26, 4], [22, 12], [10, 12]], tint('accent', 18), 0, { css: 'border:none' });
  lbl(S, 'aluL', 6, 7.4, 'ALU', 'cz-tc cz-mono lgx-l', 0, { w: 20 });
  box2(S, 'a', 7, 1.2, 6.4, 1.8, 'A = 0110 (6)', 'accent', 0, { pct: 25 }); box2(S, 'b', 18.6, 1.2, 6.4, 1.8, 'B = 0011 (3)', 'warn', 0, { pct: 25 });
  seg(S, 'aw', [10.2, 3.1], [10.2, 4.4], 0, 'ink-3', .12); seg(S, 'bw', [21.8, 3.1], [21.8, 4.4], 0, 'ink-3', .12);
  const OPS = [['00 AND', '0010', 'Z0 N0 C0 V0'], ['01 OR', '0111', 'Z0 N0 C0 V0'], ['10 ADD', '1001', 'Z0 N1 C0 V1'], ['11 SUB', '0011', 'Z0 N0 C1 V0']];
  OPS.forEach(([op, r, f], i) => { const st = i + 1, o = { off: st + 1 > 4 ? 0 : st + 1 };
    T(S, 'op' + i, .6, 8.6, 'op = ' + op, 'cz-mono lgx-xs lgx-a', st, o);
    T(S, 'rs' + i, 10, 13.6, 'Y = ' + r, 'cz-tc cz-mono lgx-l', st, { ...o, w: 12 }); T(S, 'fl' + i, 22.6, 13.8, f, 'cz-mono lgx-xs ' + (i === 2 ? 'lgx-r' : ''), st, o); });
  ar(S, 'opa', [4.8, 9.1], [8.6, 9.1], 'accent', 0, { h: .1 }); seg(S, 'yw', [16, 12], [16, 13.4], 0, 'ink-3', .12);
  T(S, 'vx', 1, 15.6, ['6 + 3 = 9 인데 4비트 부호 있는 수로는 −7 → 오버플로 V = 1', '6 + 3 = 9, but as a signed 4-bit value that is −7 → overflow V = 1'], 'lgx-xs lgx-r', 3, { off: 4 });
  T(S, 'cx', 1, 15.6, ['뺄셈은 A + B′ + 1 · 빌림이 없으면 C = 1', 'subtraction is A + B′ + 1 · no borrow means C = 1'], 'lgx-xs', 4, { off: 5 });
  fin(S, 'z', 15.6, [['ALU = 연산마다 만든 회로 + 결과를 고르는 멀티플렉서', 'an ALU is one circuit per operation plus a multiplexer that picks the result', 'lgx-xs lgx-a'], ['플래그 Z(0인가) · N(음수) · C(올림) · V(오버플로)로 비교와 분기를 해요', 'flags Z (zero), N (negative), C (carry) and V (overflow) drive comparisons and branches'], ['CPU 명령어 ADD, AND, CMP, SUB가 모두 이 회로 하나를 써요', 'CPU instructions ADD, AND, CMP and SUB all use this one circuit']]);
  S.cap(1, 'op = AND', 'op = AND').cap(2, 'op = OR', 'op = OR').cap(3, 'op = ADD: 오버플로!', 'op = ADD: overflow!').cap(4, 'op = SUB', 'op = SUB').cap(5, '산술 논리 장치 (ALU)', 'The arithmetic logic unit (ALU)');
  return S;
}
function sAddSub() {
  const S = scene({ id: 'lg-addsub', steps: 5, per: 1.5 });
  const A = '0110', B = '0010', BN = '1101';
  lbl(S, 'al', 1, 2.1, 'A', 'cz-mono lgx-s lgx-a'); A.split('').forEach((c, i) => box2(S, 'a' + i, 3 + i * 2.6, 1.6, 2.2, 1.6, c, 'accent', 0, { pct: 22 }));
  lbl(S, 'bl', 1, 4.5, 'B', 'cz-mono lgx-s lgx-w'); B.split('').forEach((c, i) => box2(S, 'b' + i, 3 + i * 2.6, 4, 2.2, 1.6, c, 'warn', 0, { pct: 22 }));
  B.split('').forEach((c, i) => { gate(S, 'x' + i, 3 + i * 2.6, 6.4, 2.2, 1.6, 'XOR'); T(S, 'xo' + i, 3 + i * 2.6, 8.4, c, 'cz-tc cz-mono lgx-s', 1, { w: 2.2, off: 3 }); T(S, 'xn' + i, 3 + i * 2.6, 8.4, BN[i], 'cz-tc cz-mono lgx-s lgx-r', 3, { w: 2.2 }); });
  lbl(S, 'm0', 14, 6.8, 'M = 0', 'cz-mono lgx-s', 1, { off: 3 }); lbl(S, 'm1', 14, 6.8, 'M = 1', 'cz-mono lgx-s lgx-r', 3);
  lbl(S, 'mn', 18, 6.9, ['B ⊕ M: M=1이면 B를 뒤집어요', 'B ⊕ M: M = 1 flips B'], 'lgx-xs', 1);
  box2(S, 'add', 3, 10.4, 10, 2, ['4비트 가산기', '4-bit adder'], 'accent', 0, { pct: 22 }); lbl(S, 'cin0', 14, 10.8, 'Cin = M = 0', 'cz-mono lgx-xs', 1, { off: 3 }); lbl(S, 'cin1', 14, 10.8, 'Cin = M = 1', 'cz-mono lgx-xs lgx-r', 3);
  T(S, 'r0', 3, 13.2, '0110 + 0010 = 1000 (6 + 2 = 8)', 'cz-mono lgx-s lgx-g', 2, { off: 3 });
  T(S, 'r1', 3, 13.2, '0110 + 1101 + 1 = 0100 (6 − 2 = 4)', 'cz-mono lgx-s lgx-g', 4);
  [['덧셈 모드 M = 0: B가 그대로 들어가요', 'add mode M = 0: B passes unchanged'], ['A + B = 8', 'A + B = 8'], ['뺄셈 모드 M = 1: B를 뒤집고 올림 입력도 1', 'subtract mode M = 1: B is inverted and the carry-in is 1'], ['A + B′ + 1 = A − B (2의 보수)', 'A + B′ + 1 = A − B (two’s complement)']].forEach((t, i) => T(S, 'n' + i, 1, 15.2, t, 'lgx-s', i + 1, { off: i + 2 }));
  fin(S, 'z', 15.2, [['XOR 게이트 몇 개만 더해 가산기 하나로 덧셈과 뺄셈을 모두 해요', 'a handful of XOR gates lets one adder both add and subtract', 'lgx-xs lgx-a'], ['2의 보수 덕분에 CPU는 별도의 뺄셈기가 필요 없어요', 'thanks to two’s complement, CPUs need no separate subtractor']]);
  S.cap(1, 'M = 0: 덧셈 모드', 'M = 0: add mode').cap(2, '6 + 2 = 8', '6 + 2 = 8').cap(3, 'M = 1: B를 뒤집고 +1', 'M = 1: invert B and add 1').cap(4, '6 − 2 = 4', '6 − 2 = 4').cap(5, '가감산기', 'Adder–subtractor');
  return S;
}
function sDelay() {
  const S = scene({ id: 'lg-delay', steps: 5, per: 1.5 });
  lbl(S, 'ex', 1, .8, "F = A·B + A'·C   (B = C = 1)", 'cz-mono lgx-s lgx-a', 0);
  const u = 2.2, X0 = 6;
  [['A', [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 3.6, 1], ["A'", [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 6.4, 2], ['A·B', [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 9.2, 2], ["A'·C", [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], 12, 3], ['F', [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], 14.8, 3]].forEach(([n, bits, y, st], i) => {
    lbl(S, 'wn' + i, 1, y - 1.1, n, 'cz-mono lgx-s', st); wave(S, 'w' + i, X0, y, u, bits, 1.4, n === 'F' ? 'danger' : 'accent', st); });
  rect(S, 'dl', X0 + 3 * u, 1.6, u, 13.6, 'warn', 12, 2, { r: 0 }); lbl(S, 'dll', X0 + 3 * u, .9, ['NOT 지연', 'NOT delay'], 'cz-tc lgx-xs lgx-w', 2, { w: u * 2 });
  lbl(S, 'gl', X0 + 5 * u + .4, 12.1, ['글리치: 잠깐 0', 'glitch: a brief 0'], 'lgx-xs lgx-r', 3);
  lbl(S, 'fx', 1, 15.9, ["해결: 합의항 B·C 추가 → F = AB + A'C + BC", "fix: add the consensus term → F = AB + A'C + BC"], 'lgx-xs lgx-g', 4, { off: 5 });
  notes(S, 'n', 17.2, [['게이트마다 출력이 바뀌기까지 시간이 걸려요 (피코초 단위)', 'every gate takes time to switch (picoseconds)'], ["A가 1 → 0이 될 때 A'는 NOT 지연만큼 늦게 1이 돼요", "when A falls, A' rises only after the NOT delay"], ['그 틈에 두 AND가 모두 0 → F가 잠깐 0으로 튀어요 (해저드)', 'in that gap both ANDs are 0 → F dips briefly (a hazard)'], ['중복 항을 넣어 덮거나, 클록에 맞춰 값이 안정된 뒤에 읽어요', 'cover it with a redundant term, or read values only after they settle on a clock edge']], 'lgx-xs');
  fin(S, 'z', 17.2, [['동기식 회로는 클록 주기 안에 모든 신호가 안정되도록 설계해요', 'synchronous circuits are designed so every signal settles within one clock period', 'lgx-xs lgx-a'], ['임계 경로를 줄이는 게 CPU 클록을 높이는 핵심 (파이프라이닝도 그 방법)', 'shortening the critical path is how clocks get faster (pipelining is one way)']]);
  S.cap(1, 'A가 1에서 0으로', 'A falls from 1 to 0').cap(2, "A'는 조금 늦게", "A' follows a little late").cap(3, 'F에 글리치가 생겨요', 'F glitches').cap(4, '합의항으로 막아요', 'A consensus term prevents it').cap(5, '전파 지연과 해저드', 'Propagation delay and hazards');
  return S;
}

/* ================= sequential extras ================= */
function sJk() {
  const S = scene({ id: 'lg-jk', steps: 5, per: 1.5 });
  const J = [0, 0, 0, 1, 1, 1], K = [0, 0, 1, 0, 1, 1], Q = [0, 0, 0, 1, 0, 1];
  lbl(S, 'jl', 1, 2.3, 'J', 'cz-mono lgx-s'); val(S, 'j', 2.6, 1.8, J); wire(S, 'wj', [[5, 2.9], [8, 2.9]]); wv(S, 'wj', J);
  lbl(S, 'kl', 1, 7.3, 'K', 'cz-mono lgx-s'); val(S, 'k', 2.6, 6.8, K); wire(S, 'wk', [[5, 7.9], [8, 7.9]]); wv(S, 'wk', K);
  gate(S, 'ff', 8.2, 1.2, 6, 8, 'JK'); lbl(S, 'clk', 8.6, 4.8, '▷ CLK', 'cz-mono lgx-xs');
  wire(S, 'wq', [[14.4, 2.9], [17, 2.9]]); wv(S, 'wq', Q); val(S, 'q', 17.2, 1.8, Q); lbl(S, 'ql', 19.8, 2.3, 'Q', 'cz-mono lgx-s');
  [['J K = 0 0 → 유지', 'J K = 0 0 → hold'], ['J K = 0 1 → 0으로 (리셋)', 'J K = 0 1 → reset to 0'], ['J K = 1 0 → 1로 (셋)', 'J K = 1 0 → set to 1'], ['J K = 1 1 → 뒤집기 (토글)', 'J K = 1 1 → toggle']].forEach((t, i) => T(S, 'c' + i, 22, 1.8 + i * 1.3, t, 'cz-mono lgx-xs', i + 1));
  lbl(S, 'th', 1, 10.6, ['T 플립플롭 (T = 1, 클록마다 토글)', 'T flip-flop (T = 1: toggle every clock)'], 'lgx-xs lgx-a', 4);
  lbl(S, 'tc', 1, 12.4, 'CLK', 'cz-mono lgx-xs', 4); wave(S, 'cw', 5, 12.8, .9, [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 1, 'ink-3', 4);
  lbl(S, 'tq', 1, 14.6, 'Q', 'cz-mono lgx-xs', 4); wave(S, 'qw', 5, 15, .9, [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1], 1, 'ok', 4);
  lbl(S, 'tn', 17, 10.6, ['주파수가 절반 → 이어 붙이면 2진 카운터', 'half the frequency → chain for a counter'], 'lgx-xs lgx-g', 4);
  fin(S, 'z', 16.8, [['JK는 SR 래치의 금지 입력(1, 1)을 “토글”로 바꿔 쓸모 있게 만든 플립플롭이에요', 'JK turns the SR latch’s forbidden (1, 1) input into a useful toggle', 'lgx-xs lgx-a'], ['T 플립플롭 = J와 K를 묶은 JK · 분주기·리플 카운터의 부품', 'a T flip-flop is a JK with J and K tied together · the building block of dividers and ripple counters']]);
  S.cap(1, '0 0: 그대로', '0 0: hold').cap(2, '0 1: 리셋', '0 1: reset').cap(3, '1 0: 셋', '1 0: set').cap(4, '1 1: 토글', '1 1: toggle').cap(5, 'JK와 T 플립플롭', 'JK and T flip-flops');
  return S;
}
function sSeqDet() {
  const S = scene({ id: 'lg-seqdet', steps: 5, per: 1.5 });
  const P = { s0: [4, 6], s1: [11, 6], s2: [18, 6], s3: [25, 6] }, L = { s0: 'S0', s1: 'S1', s2: 'S2', s3: 'S3/1' };
  Object.entries(P).forEach(([k, [x, y]]) => stt(S, k, x, y, L[k], k === 's3' ? 'ok' : 'ink-3', 0, { r: 1.3, start: k === 's0', acc: k === 's3' }));
  const o = { r: 1.3 };
  trn(S, 'a01', P.s0, P.s1, '1', 0, o); trn(S, 'a12', P.s1, P.s2, '0', 0, o); trn(S, 'a23', P.s2, P.s3, '1', 0, o);
  lp(S, 'l0', 4, 6, '0', 0, o); lp(S, 'l1', 11, 6, '1', 0, o);
  trn(S, 'a20', P.s2, P.s0, '0', 0, { ...o, bend: -2.6, ld: -.6 }); trn(S, 'a32', P.s3, P.s2, '0', 0, { ...o, bend: 1.2, ld: .6 }); trn(S, 'a31', P.s3, P.s1, '1', 0, { ...o, bend: 3.4, ld: .6 });
  lbl(S, 'h', 1, .8, ['“101”을 찾는 무어 기계 (겹쳐도 인정)', 'a Moore machine that detects “101” (overlaps allowed)'], 'lgx-xs lgx-a', 0);
  const IN = '110101', PATH = ['s0', 's1', 's1', 's2', 's3', 's2', 's3'];
  IN.split('').forEach((c, i) => box2(S, 'in' + i, 2 + i * 2.4, 12.6, 2.1, 1.6, c, 'accent', 1, { pct: 20 }));
  lbl(S, 'inl', 2, 11.4, ['입력', 'input'], 'lgx-xs', 1); lbl(S, 'outl', 2, 14.6, ['출력 (S3에서 1)', 'output (1 in S3)'], 'lgx-xs', 1);
  ['0', '0', '0', '1', '0', '1'].forEach((c, i) => T(S, 'out' + i, 2 + i * 2.4, 15.6, c, 'cz-tc cz-mono lgx-s ' + (c === '1' ? 'lgx-g' : ''), [1, 1, 2, 3, 4, 4][i], { w: 2.1 }));
  const at = [[1, 2], [2, 3], [3, 4], [4, 6]];
  frame(S, 'tok', P.s1[0] - 1.6, P.s1[1] - 1.6, 3.2, 3.2, 'warn', 1, { r: 1.6, w: .22 });
  at.forEach(([st, idx]) => { const [x, y] = P[PATH[idx]]; S.move('tok', st, x - 1.6, y - 1.6); });
  rect(S, 'cur', 2 - .15, 12.45, 2.4, 1.9, 'warn', 0, 1, { css: 'background:transparent;border:.18em solid var(--warn)', r: .3 });
  at.forEach(([st, idx]) => S.move('cur', st, 2 + (idx - 1) * 2.4 - .15, 12.45));
  lbl(S, 'impl', 17, 11.4, ['구현: 상태 4개 → 플립플롭 2개', 'implementation: 4 states → 2 flip-flops'], 'lgx-xs', 4); lbl(S, 'impl2', 17, 12.6, ['상태표 → 카르노 맵 → 다음 상태 논리', 'state table → K-map → next-state logic'], 'lgx-xs', 4);
  fin(S, 'z', 17.6, [['순차 회로 설계 = 상태도 그리기 → 상태 할당 → 플립플롭 입력식 구하기', 'sequential design: draw states → assign codes → derive flip-flop inputs', 'lgx-xs lgx-a'], ['통신 프로토콜의 프레임 시작 검출, 자판기, 엘리베이터 제어기가 이렇게 만들어져요', 'frame-start detectors, vending machines and elevator controllers are built this way']]);
  S.cap(1, '1 → S1', '1 → S1').cap(2, '10 → S2', '10 → S2').cap(3, '101 → S3: 출력 1', '101 → S3: output 1').cap(4, '01 → 겹쳐서 또 101', 'Overlap: 101 again').cap(5, '순차 회로 설계: 시퀀스 검출기', 'Sequential design: a sequence detector');
  return S;
}
function sSetup() {
  const S = scene({ id: 'lg-setup', steps: 5, per: 1.5 });
  const u = 1.1, X0 = 5;
  lbl(S, 'cl', 1, 2.2, 'CLK', 'cz-mono lgx-s'); wave(S, 'ck', X0, 3.4, u, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1.6, 'ink-3', 0);
  const edge = X0 + 10 * u;
  rect(S, 'win', edge - 3 * u, 1.4, 4.5 * u, 11.2, 'warn', 14, 1, { r: 0 }); lbl(S, 'su', edge - 3 * u, 12.8, 't_su', 'cz-mono lgx-xs lgx-w', 1); lbl(S, 'ho', edge + .2, 12.8, 't_h', 'cz-mono lgx-xs lgx-w', 1);
  vl(S, 'ed', edge, 1.2, 12.6, 'accent', 0, { dash: 1, w: .08 });
  lbl(S, 'dl', 1, 5.8, 'D', 'cz-mono lgx-s'); wave(S, 'dg', X0, 7, u, [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1.4, 'ok', 2);
  wave(S, 'db', X0, 7, u, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1.4, 'danger', 3);
  S.set('dgv4', 3, hid()); for (let i = 0; i < 23; i++) S.set('dgh' + i, 3, hid());
  lbl(S, 'okl', 18.4, 5.6, ['창 밖에서 바뀜 → Q = 1 ✓', 'changed outside the window → Q = 1 ✓'], 'lgx-xs lgx-g', 2, { off: 3 });
  lbl(S, 'bdl', 18.4, 5.6, ['창 안에서 바뀜 → 위반', 'changed inside the window → violation'], 'lgx-xs lgx-r', 3);
  lbl(S, 'ql', 1, 9.6, 'Q', 'cz-mono lgx-s', 2);
  wave(S, 'qg', X0, 10.8, u, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1.4, 'ok', 2, { off: 3 });
  const mx = edge + u; for (let i = 0; i < 6; i++) seg(S, 'mt' + i, [mx + i * .6, 10.1 + (i % 2 ? -.5 : .5)], [mx + (i + 1) * .6, 10.1 + (i % 2 ? .5 : -.5)], 3, 'danger', .1);
  seg(S, 'mt9', [mx + 3.6, 9.6], [mx + 9, 9.6], 3, 'danger', .1); lbl(S, 'mtl', mx + 4, 8.2, ['메타안정: 0도 1도 아닌 채 흔들림', 'metastable: neither 0 nor 1 for a while'], 'lgx-xs lgx-r', 3);
  lbl(S, 'sy', 1, 14.2, ['해결: 다른 클록 영역에서 온 신호는 플립플롭 2단(동기화기)으로 받아요', 'fix: signals from another clock domain pass through two flip-flops (a synchronizer)'], 'lgx-xs lgx-g', 4);
  lbl(S, 'sy2', 1, 15.4, ['첫 단이 흔들려도 한 주기 안에 거의 확실히 정착해요', 'even if the first stage wobbles, it almost surely settles within a cycle'], 'lgx-xs', 4);
  fin(S, 'z', 17, [['셋업 시간: 클록 엣지 전 D가 가만히 있어야 하는 시간 · 홀드 시간: 엣지 후', 'setup time: D must be stable before the edge · hold time: after it', 'lgx-xs lgx-a'], ['셋업 위반은 클록을 늦추면 풀리지만 홀드 위반은 경로에 지연을 더해야 해요', 'setup violations go away with a slower clock; hold violations need added path delay'], ['정적 타이밍 분석(STA) 도구가 칩의 모든 경로를 이 기준으로 검사해요', 'static timing analysis (STA) checks every path on a chip against these limits']]);
  S.cap(1, '엣지 주변의 금지 구간', 'A keep-out window around the edge').cap(2, '창 밖에서 바뀌면 정상', 'Changes outside the window are fine').cap(3, '창 안에서 바뀌면 메타안정', 'Inside the window: metastability').cap(4, '동기화기로 막아요', 'A synchronizer contains it').cap(5, '셋업·홀드 시간과 메타안정성', 'Setup, hold and metastability');
  return S;
}
function sSram() {
  const S = scene({ id: 'lg-sram', steps: 5, per: 1.5 });
  lbl(S, 'c1', 1, .8, ['SRAM 셀: 서로 물린 인버터 2개가 비트를 붙잡아요', 'SRAM cell: two cross-coupled inverters hold a bit'], 'lgx-xs lgx-a', 1);
  gate(S, 'i1', 2, 2.2, 3.4, 1.6, 'NOT'); gate(S, 'i2', 2, 5, 3.4, 1.6, 'NOT');
  elb(S, 'f1', [[5.5, 3], [6.6, 3], [6.6, 5.8], [5.5, 5.8]], 'accent', 1, { h: .1 }); elb(S, 'f2', [[2, 5.8], [1, 5.8], [1, 3], [1.9, 3]], 'accent', 1, { h: .1 });
  lbl(S, 'c1n', 1, 7.6, ['접근 트랜지스터 2개 더해 6T', '+2 access transistors = 6T'], 'lgx-xs', 1);
  const RX = 14, CY = r => 2.4 + r * 2.4, CX = c => RX + 2.4 + c * 3.4;
  ['00', '01', '10', '11'].forEach((a, r) => { lbl(S, 'ad' + r, RX - .6, CY(r) + .3, a, 'cz-mono lgx-xs', 2); hl(S, 'wl' + r, RX + 1.6, CX(3) + 3.1, CY(r) + .75, 'line', 2, { w: .1 }); });
  for (let c = 0; c < 4; c++) vl(S, 'bl' + c, CX(c) + 1.5, 1.8, CY(3) + 2.2, 'line', 2, { w: .1 });
  const DATA = ['0110', '1001', '0000', '1100'];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const k = `m${r}_${c}`; box2(S, k, CX(c), CY(r), 3, 1.5, DATA[r][c], 'line', 2, { pct: 40 }); }
  lbl(S, 'wh', RX + 1.4, .8, ['워드 라인(행) × 비트 라인(열)', 'word lines (rows) × bit lines (columns)'], 'lgx-xs', 2);
  ['1', '0', '1', '1'].forEach((b, c) => { T(S, `w2_${c}`, CX(c), CY(2) + .1, b, 'cz-tc cz-mono lgx-s lgx-r', 3, { w: 3 }); S.set(`m2_${c}`, 3, { opacity: '.15' }); tsets(S, `m2_${c}`, [[4, 'ok', 45]]); });
  S.set('wl2', 3, { background: 'var(--danger)' }); S.set('wl2', 4, { background: 'var(--ok)' });
  T(S, 'wr', 1, 14.2, ['쓰기: 주소 10 → 디코더가 2번 워드 라인을 켜고 비트 라인에 1011', 'write: address 10 → the decoder raises word line 2 and bit lines carry 1011'], 'lgx-xs lgx-r', 3, { off: 4 });
  ['1', '0', '1', '1'].forEach((b, c) => box2(S, 'rd' + c, CX(c), CY(3) + 2.6, 3, 1.4, b, 'ok', 4, { pct: 40 }));
  T(S, 'rdl', 1, 14.2, ['읽기: 같은 행을 켜면 값이 비트 라인으로 나와 감지 증폭기가 읽어요', 'read: raising the same row puts its bits on the bit lines for the sense amps'], 'lgx-xs lgx-g', 4);
  fin(S, 'z', 15.6, [['SRAM: 셀당 트랜지스터 6개, 빠르고 새로고침 불필요 → CPU 캐시·레지스터 파일', 'SRAM: 6 transistors per cell, fast, no refresh → CPU caches and register files', 'lgx-xs lgx-a'], ['DRAM: 트랜지스터 1개 + 커패시터 → 촘촘하지만 전하가 새서 계속 새로고침 → 주 메모리', 'DRAM: 1 transistor + 1 capacitor → dense, but leaky and refreshed constantly → main memory'], ['레지스터 파일은 읽기 포트가 여러 개라 한 클록에 두 값을 동시에 읽어요', 'register files have several read ports to fetch two operands per clock']]);
  S.cap(1, '비트 하나를 붙잡는 셀', 'A cell that holds one bit').cap(2, '셀을 격자로 배열', 'Cells arranged in a grid').cap(3, '한 행에 쓰기', 'Write one row').cap(4, '한 행 읽기', 'Read one row').cap(5, 'SRAM과 메모리 배열', 'SRAM and memory arrays');
  return S;
}
function sFpga() {
  const S = scene({ id: 'lg-fpga', steps: 5, per: 1.5 });
  lbl(S, 'h', 1, .8, ['2입력 LUT: 작은 메모리 4칸 + 멀티플렉서', '2-input LUT: 4 memory bits + a multiplexer'], 'lgx-xs lgx-a', 1);
  const XOR = '0110', AND = '0001';
  ['00', '01', '10', '11'].forEach((a, i) => { lbl(S, 'la' + i, 1, 2.5 + i * 2, a, 'cz-mono lgx-xs', 1);
    box2(S, 'b' + i, 3, 2.1 + i * 2, 2.6, 1.6, XOR[i], 'accent', 1, { pct: 25 }); T(S, 'b2' + i, 3, 2.25 + i * 2, AND[i], 'cz-tc cz-mono lgx-s lgx-w', 3, { w: 2.6 }); S.set('b' + i, 3, { opacity: '.12' });
    seg(S, 'bw' + i, [5.7, 2.9 + i * 2], [8, 2.9 + i * 2], 1, 'ink-3', .08); });
  gate(S, 'mux', 8, 1.8, 3.6, 8, 'MUX'); lbl(S, 'sel', 8, 10.3, 'A B', 'cz-tc cz-mono lgx-s', 1, { w: 3.6 });
  [['A B = 1 0 → 3번째 칸 = 1', 'A B = 1 0 → slot 3 = 1', 2, 3], ['A B = 1 1 → 4번째 칸 = 1', 'A B = 1 1 → slot 4 = 1', 4, 5]].forEach(([a, b, s, o], i) => T(S, 'r' + i, 12.6, 5.4, [a, b], 'cz-mono lgx-xs lgx-g', s, { off: o }));
  rect(S, 'pick', 2.85, 5.95, 2.9, 1.9, 'ok', 0, 2, { css: 'background:transparent;border:.18em solid var(--ok)', r: .3 }); S.move('pick', 4, 2.85, 7.95);
  lbl(S, 'fx', 12.6, 2.4, ['저장값 0110 = XOR', 'stored 0110 = XOR'], 'cz-mono lgx-xs lgx-a', 1, { off: 3 }); lbl(S, 'fa', 12.6, 2.4, ['다시 써서 0001 = AND', 'rewritten 0001 = AND'], 'cz-mono lgx-xs lgx-w', 3);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 13 + c * 4.6, y = 8.6 + r * 2.6; box2(S, `cb${r}_${c}`, x, y, 3, 1.8, 'LUT+FF', 'accent', 4, { pct: 22 }); if (c < 3) seg(S, `rh${r}_${c}`, [x + 3, y + .9], [x + 4.6, y + .9], 4, 'ink-3', .08); if (r < 2) seg(S, `rv${r}_${c}`, [x + 1.5, y + 1.8], [x + 1.5, y + 2.6], 4, 'ink-3', .08); }
  lbl(S, 'gl', 13, 16.6, ['LUT·플립플롭 블록 + 프로그래머블 배선 = FPGA', 'LUT/flip-flop blocks + programmable routing = FPGA'], 'lgx-xs lgx-a', 4);
  fin(S, 'z', 17.8, [['Verilog·VHDL로 회로를 쓰면 합성 도구가 LUT와 배선 설정(비트스트림)으로 바꿔요', 'circuits written in Verilog or VHDL are synthesized into LUT and routing settings (a bitstream)', 'lgx-xs'], ['칩 시제품, 통신 장비, 초저지연 거래에 써요 · 대량 생산은 전용 칩(ASIC)이 더 싸고 빨라요', 'used for chip prototypes, telecom gear and low-latency trading · ASICs win at volume', 'lgx-xs lgx-a']]);
  S.cap(1, 'LUT = 진리표를 담은 메모리', 'A LUT is a memory holding a truth table').cap(2, '입력이 칸을 골라요', 'The inputs select a slot').cap(3, '내용만 바꾸면 다른 함수', 'Rewrite it for a different function').cap(4, '수많은 LUT를 배선으로 연결', 'Thousands of LUTs, wired together').cap(5, 'LUT와 FPGA', 'LUTs and FPGAs');
  return S;
}

return { css: CSSX, secs: [], add: {
  'lg-gates': [
    item('lg-cmos', '트랜지스터와 CMOS 게이트', 'Transistors and CMOS gates', '게이트는 트랜지스터 스위치로 만들어요. CMOS는 1 쪽으로 끌어올리는 PMOS와 0 쪽으로 끌어내리는 NMOS를 짝지어요.', '인버터는 PMOS 하나와 NMOS 하나로, 입력이 0이면 PMOS가 켜져 출력이 1, 입력이 1이면 NMOS가 켜져 출력이 0이 돼요. NAND는 PMOS 두 개를 병렬로, NMOS 두 개를 직렬로 이어 둘 다 1일 때만 0을 내요. 항상 한쪽만 켜져 평소에 전류가 거의 흐르지 않아 저전력이고, NAND가 트랜지스터 4개로 가장 싸서 칩 설계의 기본 단위가 돼요.', 'Gates are built from transistor switches; CMOS pairs PMOS transistors that pull up to 1 with NMOS transistors that pull down to 0.', 'An inverter uses one PMOS and one NMOS: input 0 turns the PMOS on and the output becomes 1; input 1 turns the NMOS on and the output becomes 0. NAND puts two PMOS in parallel and two NMOS in series, giving 0 only when both inputs are 1. Only one side ever conducts, so idle current is tiny, and NAND needs just four transistors, making it the workhorse of chip design.', sCmos()),
    item('lg-sop', '진리표에서 논리식으로', 'From truth tables to formulas', '진리표에서 출력이 1인 줄마다 AND 항을 만들어 OR로 묶으면 어떤 함수든 회로로 만들 수 있어요 (곱의 합, SOP).', '셋 중 둘 이상이 1이면 1인 다수결 함수는 최소항 m3, m5, m6, m7을 OR한 F = A′BC + AB′C + ABC′ + ABC예요. 이는 AND 층과 OR 층의 2단 회로가 되고, 반대로 0인 줄로 OR 항을 만들어 AND하면 합의 곱(POS)이에요. 표준형은 기계적으로 만들 수 있지만 길어서, 카르노 맵으로 F = AB + BC + AC처럼 줄여요.', 'Write one AND term for each row where the output is 1 and OR them together: any function can be built this way (sum of products).', 'The majority function, 1 when at least two of three inputs are 1, is F = A′BC + AB′C + ABC′ + ABC, the OR of minterms m3, m5, m6 and m7. That is a two-level AND–OR circuit; building OR terms from the 0 rows and ANDing them gives the product of sums (POS) instead. Canonical forms are mechanical but long, so Karnaugh maps reduce them, here to F = AB + BC + AC.', sSop()),
    item('lg-boolalg', '불 대수로 간소화', 'Simplifying with Boolean algebra', '항등·보수·흡수·분배 같은 법칙으로 논리식을 줄이면, 같은 동작을 훨씬 적은 게이트로 만들 수 있어요.', 'A + 0 = A, A + A′ = 1, A + AB = A, A + A′B = A + B 같은 법칙을 차례로 적용하면 F = AB + AB′ + A′B가 A + B, 즉 OR 게이트 하나가 돼요. 게이트가 줄면 칩 면적·전력·지연이 함께 줄어요. 변수가 적으면 손이나 카르노 맵으로, 많으면 콰인–매클러스키 알고리즘이나 Yosys 같은 논리 합성 도구가 자동으로 줄여요.', 'Laws such as identity, complement, absorption and distribution shrink a formula so the same behavior needs far fewer gates.', 'Applying A + 0 = A, A + A′ = 1, A + AB = A and A + A′B = A + B in turn reduces F = AB + AB′ + A′B to A + B, a single OR gate. Fewer gates mean less area, power and delay. Small cases are done by hand or with Karnaugh maps; larger ones by the Quine–McCluskey algorithm or synthesis tools such as Yosys.', sBoolAlg()),
    item('lg-tri', '3상태 버퍼와 버스', 'Tri-state buffers and buses', '출력을 0, 1뿐 아니라 “연결 끊김(Z)” 상태로도 만들 수 있는 버퍼예요. 여러 장치가 선 하나(버스)를 차례로 나눠 써요.', 'EN이 1이면 입력을 그대로 내보내고, 0이면 높은 임피던스(Z)가 되어 선에서 빠진 것처럼 행동해요. 디코더가 한 번에 한 장치의 EN만 켜 주면 CPU, RAM, I/O가 같은 데이터 버스를 공유할 수 있어요. 두 장치가 동시에 구동하면 1과 0이 맞붙어 과전류가 흐르는 버스 충돌이 생겨요. I²C 같은 버스는 오픈 드레인 방식으로 이 문제를 피해요.', 'A buffer whose output can be 0, 1 or disconnected (Z), letting many devices take turns on one wire, a bus.', 'With EN = 1 it passes its input; with EN = 0 it goes high-impedance (Z) and behaves as if unplugged. When a decoder enables exactly one device at a time, the CPU, memory and I/O can share one data bus. Two drivers at once fight, 1 against 0, causing bus contention and overcurrent. Buses such as I²C avoid this with open-drain outputs.', sTri()),
    item('lg-parity', '패리티와 오류 검출', 'Parity and error detection', '1의 개수가 짝수가 되도록 비트 하나를 덧붙여, 전송 중 비트 하나가 뒤집히면 알아채요. XOR 게이트 트리로 계산해요.', '보내는 쪽은 데이터 비트를 모두 XOR한 값을 패리티 비트로 붙이고, 받는 쪽은 전체를 다시 XOR해 1이 나오면 홀수 개 오류로 판단해요. 두 비트가 동시에 뒤집히면 못 알아채요. 해밍 코드는 패리티 비트를 여러 개 두어 오류 위치를 찾아 고치고, ECC 메모리는 1비트 정정·2비트 검출(SECDED)을 해요. UART 통신과 RAID 5도 XOR 패리티를 써요.', 'Append one bit so the number of 1s is even; if a single bit flips in transit, the receiver notices. An XOR tree computes it.', 'The sender appends the XOR of all data bits, and the receiver XORs everything again: a 1 means an odd number of errors. Two simultaneous flips go unnoticed. Hamming codes use several parity bits to locate and correct errors, and ECC memory corrects one bit and detects two (SECDED). UART links and RAID 5 rely on XOR parity too.', sParity())
  ],
  'lg-comb': [
    item('lg-encoder', '우선순위 인코더', 'Priority encoder', '켜진 입력의 번호를 2진수로 바꿔요(디코더의 반대). 여러 개가 켜지면 가장 높은 것을 골라요.', '4→2 우선순위 인코더는 I3이 켜지면 11, I2면 10처럼 가장 높은 활성 입력의 번호를 내고, 아무것도 켜지지 않으면 유효 비트 V를 0으로 내려요. 인터럽트 컨트롤러가 여러 요청 중 가장 급한 것을 고르거나, 키보드가 눌린 키를 번호로 바꾸는 데 써요.', 'Turns which input is on into a binary number (the decoder’s inverse), picking the highest when several are on.', 'A 4-to-2 priority encoder outputs 11 when I3 is on, 10 for I2 and so on, always reporting the highest active input, and drops the valid bit V to 0 when nothing is on. Interrupt controllers use it to pick the most urgent request, and keyboards to turn a pressed key into a code.', sEncoder()),
    item('lg-cmp', '크기 비교기', 'Magnitude comparator', '두 2진수를 높은 자리부터 비교해 A > B, A = B, A < B를 알려 주는 회로예요.', '자리마다 XNOR로 같은지 보고, 위 자리가 모두 같다가 처음 달라지는 자리에서 A가 1이고 B가 0이면 A > B로 결정해요. 식으로는 A>B = A₃B₃′ + (A₃⊙B₃)A₂B₂′ + …처럼 이어져요. 74HC85 같은 칩은 여러 개를 이어 8·16비트로 넓히고, CPU는 보통 A − B를 계산해 플래그로 비교해요.', 'A circuit that compares two binary numbers from the top bit and reports A > B, A = B or A < B.', 'Each bit pair is checked for equality with XNOR; at the first position where higher bits were all equal and A has 1 while B has 0, the answer is A > B, written A>B = A₃B₃′ + (A₃⊙B₃)A₂B₂′ + …. Chips like the 74HC85 cascade to 8 or 16 bits, while CPUs usually compute A − B and compare via flags.', sCmp()),
    item('lg-cla', '캐리 룩어헤드 가산기', 'Carry-lookahead adder', '올림을 한 자리씩 기다리지 않고, 자리마다의 생성(G)·전파(P) 신호로 모든 올림을 한꺼번에 계산하는 빠른 가산기예요.', 'G = A·B는 그 자리에서 올림을 만들고, P = A⊕B는 들어온 올림을 넘겨준다는 뜻이에요. C₂ = G₁ + P₁G₀ + P₁P₀C₀처럼 모든 올림을 G와 P로 펼쳐 쓰면 AND 한 층과 OR 한 층으로 끝나 리플 캐리의 O(n) 지연이 사라져요. 자리가 많으면 4비트 블록을 계층으로 묶어 O(log n)으로 만들고, CPU의 64비트 덧셈기는 콕–스톤 같은 병렬 접두 구조를 써요.', 'A fast adder that computes every carry at once from per-bit generate (G) and propagate (P) signals instead of waiting bit by bit.', 'G = A·B means a bit creates a carry; P = A⊕B means it passes one along. Expanding each carry, such as C₂ = G₁ + P₁G₀ + P₁P₀C₀, needs only an AND level and an OR level, removing ripple carry’s O(n) delay. Wide adders group 4-bit blocks hierarchically for O(log n), and 64-bit CPU adders use parallel-prefix designs such as Kogge–Stone.', sCla()),
    item('lg-alu', '산술 논리 장치 (ALU)', 'Arithmetic logic unit (ALU)', 'AND, OR, 덧셈, 뺄셈 같은 연산 회로를 모두 두고, 연산 코드로 결과 하나를 골라 내보내는 CPU의 계산기예요.', '두 입력을 모든 연산 회로에 동시에 넣고, op 신호가 멀티플렉서로 결과를 골라요. 결과와 함께 Z(0인가), N(음수인가), C(올림), V(부호 있는 오버플로) 플래그를 내서 비교와 분기에 써요. 예를 들어 4비트에서 6 + 3 = 9는 부호 있는 수로 −7이 되어 V = 1이에요. ADD, AND, CMP, SUB 같은 명령어가 모두 이 회로를 공유해요.', 'The CPU’s calculator: circuits for AND, OR, addition and subtraction side by side, with an opcode selecting which result comes out.', 'Both operands feed every operation at once, and the op signal drives a multiplexer that picks one result. Alongside it come the flags Z (zero), N (negative), C (carry) and V (signed overflow) used for comparisons and branches; in 4 bits, 6 + 3 = 9 reads as −7 signed, so V = 1. Instructions such as ADD, AND, CMP and SUB all share this circuit.', sAlu()),
    item('lg-addsub', '가감산기', 'Adder–subtractor', 'XOR 게이트 몇 개를 더해 가산기 하나로 덧셈과 뺄셈을 모두 해요. 2의 보수 덕분이에요.', '모드 신호 M을 B의 각 비트와 XOR하고 올림 입력에도 넣어요. M = 0이면 A + B, M = 1이면 B가 뒤집히고 1이 더해져 A + B′ + 1 = A − B가 돼요. 예: 0110 + 1101 + 1 = 0100(6 − 2 = 4). 그래서 CPU에는 별도의 뺄셈기가 필요 없어요.', 'A few XOR gates let one adder both add and subtract, thanks to two’s complement.', 'The mode signal M is XORed with every bit of B and also fed in as the carry-in. With M = 0 the circuit computes A + B; with M = 1, B is inverted and 1 is added, giving A + B′ + 1 = A − B, e.g. 0110 + 1101 + 1 = 0100 (6 − 2 = 4). That is why CPUs need no separate subtractor.', sAddSub()),
    item('lg-delay', '전파 지연과 해저드', 'Propagation delay and hazards', '게이트는 출력이 바뀌는 데 시간이 걸려요. 경로마다 지연이 달라 출력이 잠깐 튀는 글리치가 생길 수 있어요.', 'F = AB + A′C에서 B = C = 1일 때 A가 1에서 0으로 바뀌면, A′가 NOT 지연만큼 늦게 1이 되어 잠깐 두 항이 모두 0이 되고 F가 튀어요(정적 해저드). 합의항 BC를 더하면 막을 수 있어요. 가장 긴 게이트 사슬인 임계 경로의 지연이 최대 클록 주파수를 정하고, 동기식 회로는 값이 안정된 뒤 클록 엣지에서만 읽어 글리치를 무시해요.', 'Gates take time to switch, and unequal path delays can make an output glitch briefly.', 'In F = AB + A′C with B = C = 1, when A falls from 1 to 0, A′ rises only after the NOT delay, so both terms are briefly 0 and F dips (a static hazard); adding the consensus term BC prevents it. The delay of the longest gate chain, the critical path, caps the clock frequency, and synchronous circuits ignore glitches by sampling only on clock edges after values settle.', sDelay())
  ],
  'lg-seq': [
    item('lg-jk', 'JK·T 플립플롭', 'JK and T flip-flops', 'JK 플립플롭은 클록마다 유지·리셋·셋·토글 중 하나를 해요. J와 K를 묶은 T 플립플롭은 클록마다 값을 뒤집어요.', 'JK = 00이면 유지, 01이면 0, 10이면 1, 11이면 토글이에요. SR 래치에서 금지였던 (1, 1) 입력을 쓸모 있는 토글로 바꾼 셈이에요. T = 1로 둔 T 플립플롭은 출력 주파수가 클록의 절반이 되어 분주기가 되고, 여러 개를 이어 붙이면 2진 리플 카운터가 돼요.', 'A JK flip-flop holds, resets, sets or toggles on each clock; a T flip-flop, J and K tied together, flips every clock.', 'JK = 00 holds, 01 resets to 0, 10 sets to 1 and 11 toggles, turning the SR latch’s forbidden (1, 1) input into something useful. A T flip-flop with T = 1 outputs half the clock frequency, a frequency divider, and chaining several gives a binary ripple counter.', sJk()),
    item('lg-seqdet', '순차 회로 설계: 시퀀스 검출기', 'Sequential design: a sequence detector', '“101”이 들어오면 1을 내는 회로를 상태 기계로 설계해요. 상태도 → 상태 할당 → 플립플롭 입력식 순서예요.', '상태는 S0(아직 없음), S1(1을 봄), S2(10을 봄), S3(101을 봄, 출력 1) 네 개이고, 겹치는 패턴도 인정하려면 S3에서 0이 오면 S2로 가요. 상태 4개는 플립플롭 2개로 저장하고, 상태표를 카르노 맵으로 줄여 다음 상태 논리를 만들어요. 통신의 프레임 시작 검출, 자판기, 엘리베이터 제어기가 이렇게 설계돼요.', 'Design a circuit that outputs 1 whenever “101” arrives, as a state machine: state diagram → state assignment → flip-flop input equations.', 'The states are S0 (nothing yet), S1 (saw 1), S2 (saw 10) and S3 (saw 101, output 1); to catch overlapping patterns, a 0 in S3 leads back to S2. Four states fit in two flip-flops, and Karnaugh maps of the state table give the next-state logic. Frame-start detectors, vending machines and elevator controllers are designed this way.', sSeqDet()),
    item('lg-setup', '셋업·홀드 시간과 메타안정성', 'Setup, hold and metastability', '플립플롭은 클록 엣지 앞뒤의 짧은 구간 동안 입력이 가만히 있어야 해요. 그 사이에 바뀌면 출력이 한동안 0도 1도 아닌 상태로 흔들려요.', '엣지 전 D가 안정해야 하는 시간이 셋업, 엣지 후가 홀드예요. 이를 어기면 출력이 메타안정 상태로 흔들리다 무작위 값으로 정착해요. 셋업 위반은 클록을 늦추면 풀리지만 홀드 위반은 경로에 지연을 더해야 해요. 다른 클록 영역에서 온 신호는 플립플롭 2단짜리 동기화기로 받아 위험을 거의 없애고, 정적 타이밍 분석(STA)이 칩의 모든 경로를 검사해요.', 'Inputs must stay still in a short window around the clock edge; changes inside it can leave the output hovering between 0 and 1.', 'Setup time is how long D must be stable before the edge, hold time after it. Violations can make the output metastable, wobbling before settling at a random value. Setup violations disappear with a slower clock, but hold violations need added path delay. Signals crossing from another clock domain go through a two-flip-flop synchronizer, and static timing analysis (STA) checks every path on a chip.', sSetup()),
    item('lg-sram', 'SRAM과 메모리 배열', 'SRAM and memory arrays', '서로 물린 인버터 두 개가 비트 하나를 붙잡는 SRAM 셀을 격자로 늘어놓고, 행(워드 라인)과 열(비트 라인)로 읽고 써요.', '주소를 디코더가 풀어 한 워드 라인을 켜면 그 행의 셀들이 비트 라인에 연결되어, 쓰기 땐 값을 밀어 넣고 읽기 땐 감지 증폭기가 값을 읽어요. SRAM은 셀당 트랜지스터 6개로 빠르고 새로고침이 필요 없어 CPU 캐시와 레지스터 파일에 쓰이고, DRAM은 트랜지스터 1개와 커패시터로 촘촘하지만 계속 새로고침해야 해 주 메모리에 써요.', 'SRAM cells, two cross-coupled inverters holding a bit, are tiled into a grid and accessed by rows (word lines) and columns (bit lines).', 'A decoder turns the address into one active word line, connecting that row’s cells to the bit lines: writes drive values in, reads let sense amplifiers detect them. SRAM uses six transistors per cell, is fast and needs no refresh, so it serves CPU caches and register files; DRAM uses one transistor and a capacitor, denser but constantly refreshed, for main memory.', sSram()),
    item('lg-fpga', 'LUT와 FPGA', 'LUTs and FPGAs', 'LUT는 진리표를 담은 작은 메모리예요. 내용만 바꾸면 어떤 함수든 되고, 수많은 LUT를 배선으로 연결한 칩이 FPGA예요.', '2입력 LUT는 4칸 메모리와 멀티플렉서로, 입력이 칸을 골라 그 값을 내보내요. 0110을 넣으면 XOR, 0001을 넣으면 AND가 돼요. FPGA는 LUT·플립플롭 블록과 프로그래머블 배선으로 이뤄져, Verilog·VHDL로 쓴 회로를 합성 도구가 비트스트림으로 바꿔 올려요. 칩 시제품, 통신 장비, 초저지연 거래에 쓰이고 대량 생산은 전용 칩(ASIC)이 유리해요.', 'A LUT is a tiny memory holding a truth table, so rewriting it changes the function; an FPGA is thousands of LUTs joined by programmable wiring.', 'A 2-input LUT is four memory bits and a multiplexer: the inputs select a slot and its value comes out, so 0110 makes XOR and 0001 makes AND. An FPGA combines LUT/flip-flop blocks with programmable routing; circuits written in Verilog or VHDL are synthesized into a bitstream that configures it. FPGAs serve chip prototypes, telecom gear and low-latency trading, while ASICs win at high volume.', sFpga())
  ]
} };
})();

window.UX = page([
  sec('lg-gates', '논리 게이트', 'Logic gates', '논리 게이트와 불 대수', 'Logic gates and Boolean algebra',
    '모든 디지털 회로는 0과 1을 다루는 작은 게이트로 만들어져요. 파란 선은 1, 회색 선은 0이에요.', 'Every digital circuit is built from tiny gates on 0s and 1s. Blue wires carry 1, grey wires 0.', [
    item('lg-and', 'AND · OR · NOT', 'AND · OR · NOT', 'AND는 입력이 모두 1일 때, OR는 하나라도 1일 때 1을 내고, NOT은 값을 뒤집어요.', '코드의 &&, ||, ! 과 같아요. 조건문을 단순하게 만들 때 이 규칙을 그대로 써요.', 'AND outputs 1 only if all inputs are 1, OR if any is, and NOT flips the value.', 'They are the same as &&, || and ! in code, and the same rules simplify conditions.', sBasic()),
    item('lg-xor', 'XOR · NAND · NOR', 'XOR · NAND · NOR', 'XOR는 두 입력이 다를 때 1, NAND·NOR는 AND·OR의 결과를 뒤집은 거예요. 진리표로 모든 경우를 정리해요.', 'XOR는 덧셈의 합, 패리티 검사, 간단한 암호화, 두 값 교환 트릭에 쓰여요.', 'XOR is 1 when inputs differ; NAND and NOR invert AND and OR. A truth table lists every case.', 'XOR is the sum bit of addition and appears in parity checks, simple ciphers and swap tricks.', sTruth()),
    item('lg-nand', 'NAND의 완전성', 'NAND universality', 'NAND 게이트 하나만 있으면 NOT, AND, OR, 결국 모든 회로를 만들 수 있어요.', '실제 칩은 만들기 쉬운 NAND·NOR 셀을 많이 써요. "NAND to Tetris" 강의가 바로 이걸로 컴퓨터를 만들어요.', 'With NAND alone you can build NOT, AND, OR and therefore any circuit.', 'Real chips lean on easy-to-make NAND and NOR cells; the “NAND to Tetris” course builds a whole computer this way.', sNAND()),
    item('lg-bool', '드모르간 법칙', 'De Morgan’s laws', 'NOT(A AND B) = NOT A OR NOT B, NOT(A OR B) = NOT A AND NOT B. 부정이 안으로 들어가면 AND와 OR가 바뀌어요.', '복잡하게 중첩된 부정 조건문을 읽기 쉽게 바꾸거나, SQL WHERE 조건을 정리할 때 바로 써요.', 'NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B: pushing a negation inside swaps AND and OR.', 'Use it to untangle nested negated conditions in code or SQL WHERE clauses.', sDeMorgan()),
    item('lg-kmap', '카르노 맵', 'Karnaugh map', '진리표를 격자로 펼쳐 인접한 1끼리 크게 묶어서 논리식을 가장 간단하게 줄이는 방법이에요.', '게이트 수가 줄면 칩이 작고 빨라져요. 요즘은 합성 도구가 자동으로 하지만 조건 단순화 감각을 기르는 데 좋아요.', 'Lay the truth table out as a grid and group adjacent 1s as large as possible to get the simplest expression.', 'Fewer gates mean smaller, faster chips. Tools automate it now, but it trains your feel for simplifying conditions.', sKmap())
  ].concat(XT.add['lg-gates'] || [])),
  sec('lg-comb', '조합 회로', 'Combinational', '조합 회로', 'Combinational circuits',
    '현재 입력만으로 출력이 정해지는 회로예요.', 'Circuits whose output depends only on the current inputs.', [
    item('lg-hadd', '반가산기', 'Half adder', '1비트 두 개를 더해 합(XOR)과 올림(AND)을 내요.', '컴퓨터의 모든 산술은 이 작은 회로에서 시작해요.', 'Adds two single bits, producing a sum (XOR) and a carry (AND).', 'All computer arithmetic grows from this little circuit.', sHalf()),
    item('lg-fadd', '전가산기', 'Full adder', '두 비트와 아랫자리에서 올라온 올림까지 세 비트를 더해 합과 올림을 내요. 반가산기 두 개와 OR로 만들어요.', '전가산기를 이어 붙이면 몇 비트든 더하는 가산기가 되고, 2의 보수와 합치면 뺄셈도 해요. ALU의 핵심 부품이에요.', 'Adds two bits plus the carry from the previous column, built from two half adders and an OR.', 'Chain full adders for any width; with two’s complement they also subtract. It is the heart of the ALU.', sFull()),
    item('lg-ripple', '리플 캐리 가산기', 'Ripple-carry adder', '전가산기를 일렬로 이어 여러 비트를 더해요. 올림이 아랫자리부터 차례로 전달돼서 비트 수만큼 지연돼요.', '실제 CPU는 올림을 미리 계산하는 캐리 룩어헤드 가산기로 지연을 줄여요. 회로 깊이가 클럭 속도를 정해요.', 'Full adders chained in a row add multi-bit numbers, but the carry ripples through one stage at a time.', 'Real CPUs use carry-lookahead adders to cut the delay; circuit depth limits clock speed.', sRipple()),
    item('lg-mux', '멀티플렉서', 'Multiplexer', '선택 신호에 따라 여러 입력 중 하나를 출력으로 보내는 전자 스위치예요.', 'CPU에서 ALU 입력을 레지스터 중 하나로 고르는 등 데이터 경로 곳곳에 있어요. 코드의 switch문과 같은 역할이에요.', 'An electronic switch that forwards one of several inputs, chosen by select lines.', 'It appears throughout CPU datapaths, such as choosing which register feeds the ALU; it is a hardware switch statement.', sMux()),
    item('lg-decoder', '디코더', 'Decoder', 'n비트 입력을 받아 2ⁿ개의 출력 중 정확히 하나만 켜요.', '메모리 주소로 어느 칩·행을 쓸지 고르고, 명령어의 종류를 해석하는 데 써요.', 'Takes an n-bit input and turns on exactly one of 2ⁿ outputs.', 'It selects memory chips or rows from an address and decodes instruction types.', sDecoder())
  ].concat(XT.add['lg-comb'] || [])),
  sec('lg-seq', '순차 회로', 'Sequential', '순차 회로와 기억', 'Sequential circuits and memory',
    '되먹임과 클럭으로 이전 상태를 기억하는 회로예요.', 'Circuits that remember using feedback and a clock.', [
    item('lg-latch', 'SR 래치', 'SR latch', '두 NOR 게이트의 출력을 서로의 입력으로 되먹이면, 입력을 떼도 값을 유지하는 1비트 기억 장치가 돼요.', '되먹임이 기억을 만들어요. CPU 캐시(SRAM)는 이런 래치 수십억 개로 이뤄져 있어요.', 'Cross-feeding two NOR gates creates a one-bit memory that holds its value after the inputs are released.', 'Feedback creates memory; CPU caches (SRAM) are billions of such cells.', sLatch()),
    item('lg-dff', 'D 플립플롭', 'D flip-flop', '클럭이 올라가는 순간에만 입력 D를 저장하고, 그 외엔 값을 유지해요.', '모든 레지스터와 상태 기계가 클럭에 맞춰 동시에 바뀌게 해 주는 부품이에요. 클럭 속도(GHz)가 바로 이 박자예요.', 'Captures input D only at the rising clock edge and holds it otherwise.', 'It makes registers and state machines change in lockstep; the clock speed in GHz is this beat.', sDFF()),
    item('lg-counter', '카운터', 'Counter', '플립플롭을 이어 클럭마다 값이 1씩 올라가게 만든 회로예요.', '타이머, 프로그램 카운터(PC), 주파수 분주기에 써요. 범위를 넘으면 0으로 돌아가는 것도 정수 오버플로와 같아요.', 'Flip-flops chained so the value goes up by one every clock tick.', 'Used for timers, the program counter and frequency dividers; wrapping to zero is the same as integer overflow.', sCounter()),
    item('lg-shift', '시프트 레지스터', 'Shift register', '클럭마다 저장된 비트들을 한 칸씩 옮겨요. 직렬 데이터를 병렬로(또는 반대로) 바꿀 수 있어요.', 'USB·SPI 같은 직렬 통신에 써요. 소프트웨어의 비트 시프트(<<, >>)가 2배·절반 연산인 이유도 같아요.', 'Moves its stored bits one place on every clock, converting serial data to parallel or back.', 'Used in serial links like USB and SPI; it is also why software bit shifts (<<, >>) multiply or divide by two.', sShift())
  ].concat(XT.add['lg-seq'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.lg-v .in{font-family:var(--f-mono);font-size:.95em;font-weight:800}
.lg-g .in{font-size:.8em;font-weight:900;letter-spacing:.04em}
.lg-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.lg-big .in{font-size:1.1em;font-weight:800;color:var(--ink)}
.lg-big2 .in{font-size:1.6em;font-weight:900;color:var(--ink)}
.lg-code{place-items:center start!important;padding-left:.7em}
.lg-code .in{font-family:var(--f-mono);font-size:.6em}`;
})();
