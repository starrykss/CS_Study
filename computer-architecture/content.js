(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
function fly(S, k, a, b, st, lab, sty, o = {}) {
  const r = o.r || .8;
  dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) });
  S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r);
  if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' });
  return S;
}
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c ar-m' + (o.cls ? ' ' + o.cls : ''), s: st });

/* ---------- data representation ---------- */
function sBin() {
  const S = scene({ id: 'ar-bin', steps: 5, per: 1.3 });
  const PV = [128, 64, 32, 16, 8, 4, 2, 1], x = i => 2.2 + i * 3.5;
  PV.forEach((p, i) => { text(S, 'p' + i, x(i), 3, String(p), { w: 3, cls: 'cz-t cz-tc cz-mono' }); });
  const V = [5, 13, 42, 255];
  PV.forEach((p, i) => S.label('b' + i, { cls: 'cz-c ar-big', x: x(i), y: 5, w: 3, h: 3.4 }, [[0, '0'], ...V.map((v, k) => [k + 1, (v & p) ? '1' : '0'])]));
  V.forEach((v, k) => PV.forEach((p, i) => { if (v & p) Object.assign(S.get(`b${i}~${k + 1}`).s, C.soft); }));
  S.label('dec', { cls: 'cz-t ar-b', x: 2.2, y: 10.4, w: 28 }, [[0, ['10진수 0', 'decimal 0']], ...V.map((v, k) => [k + 1, [`10진수 ${v} = ${PV.filter(p => v & p).join(' + ')}`, `decimal ${v} = ${PV.filter(p => v & p).join(' + ')}`]])]);
  S.label('hex', { cls: 'cz-t cz-mono ar-b', x: 2.2, y: 13, w: 28 }, [[0, '0x00'], ...V.map((v, k) => [k + 1, ['16진수 0x' + v.toString(16).toUpperCase().padStart(2, '0') + '  (4비트씩 한 글자)', 'hex 0x' + v.toString(16).toUpperCase().padStart(2, '0') + '  (one digit per 4 bits)']])]);
  S.cap(0, '비트 8개 = 1바이트 · 자리마다 2배씩 커져요', '8 bits = 1 byte · each place is worth double').cap(1, '켜진 자리 값을 더하면 10진수', 'Add the places that are on')
    .cap(4, '8비트로 0~255까지', '8 bits hold 0 to 255').cap(5, '색상 #FF8800, 권한 755, MAC 주소가 모두 이 표기', 'Colours like #FF8800, file modes and MAC addresses use these');
  return S;
}
function sTwos() {
  const S = scene({ id: 'ar-twos', steps: 6, per: 1.25 });
  const row = (k, y, bits, lab, st, step) => { bits.split('').forEach((b, i) => chip(S, `${k}${i}`, 8 + i * 3, y, 2.6, b, hid(st), { h: 2.4, cls: 'ar-big' })); text(S, k + 'l', 1, y + .7, lab, { cls: 'cz-t ar-b', s: hid() }); text(S, k + 'v', 21, y + .7, '', { cls: 'cz-t' }); for (let i = 0; i < 4; i++) S.set(`${k}${i}`, step, { opacity: '1' }); S.set(k + 'l', step, { opacity: '1' }); };
  row('a', 2, '0101', '+5', {}, 0);
  row('b', 5.4, '1010', ['뒤집기', 'invert'], C.cmp, 1);
  row('c', 8.8, '1011', '−5', C.soft, 2);
  row('d', 12.6, '0000', '5 + (−5)', C.ok, 3);
  text(S, 'cy', 21, 13.2, ['넘친 자리올림은 버려요', 'carry out is dropped'], { cls: 'cz-t', s: hid() }); S.set('cy', 3, { opacity: '1' });
  row('e', 16.4, '1000', '7 + 1', C.bad, 5);
  text(S, 'ov', 21, 17, ['= −8 (오버플로)', '= −8 (overflow)'], { cls: 'cz-t ar-b', s: hid() }); S.set('ov', 5, { opacity: '1' });
  text(S, 'pl', 21, 9.4, ['+1 → 맨 앞 1 = 음수', '+1 → leading 1 = negative'], { cls: 'cz-t', s: hid() }); S.set('pl', 2, { opacity: '1' });
  S.cap(0, '4비트로 음수를 표현하려면', 'To represent negatives in 4 bits').cap(1, '비트를 모두 뒤집고', 'flip every bit').cap(2, '1을 더하면 −5 (2의 보수)', 'and add 1: that is −5 (two’s complement)')
    .cap(3, '덧셈 회로 하나로 뺄셈까지 해결돼요', 'One adder now does subtraction too').cap(4, '범위는 −8 ~ +7', 'The range is −8 to +7').cap(5, '최댓값에 1을 더하면 음수로 뒤집혀요', 'Max + 1 wraps to the most negative')
    .cap(6, 'int 오버플로로 금액·ID가 음수가 되는 버그의 원인', 'Why int overflows turn amounts or ids negative');
  return S;
}
function sFloat() {
  const S = scene({ id: 'ar-float', steps: 5, per: 1.4 });
  const G = [['s', 1, 1, ['부호', 'sign'], C.bad], ['e', 8, 2, ['지수 8비트', 'exponent 8 bits'], C.cmp], ['m', 23, 10, ['가수 23비트', 'fraction 23 bits'], C.soft]];
  let x = 1.2; G.forEach(([k, n, , l, st]) => { const w = n * .9 + (n > 1 ? 0 : .4); S.el(k, { cls: 'cz-c', x, y: 2.4, w, h: 2.6, s: st }); text(S, k + 'l', x, k === 's' ? .9 : 5.4, l, { w: Math.max(w, 3), cls: 'cz-t' }); x += w + .2; });
  chip(S, 'fm', 1.2, 8.4, 29.6, '(−1)^부호 × 1.가수 × 2^(지수 − 127)', hid(), { h: 2.4, cls: 'ar-code' }); S.get('fm').html = CZ.bi(['(−1)^부호 × 1.가수 × 2^(지수 − 127)', '(−1)^sign × 1.fraction × 2^(exp − 127)']); S.set('fm', 1, { opacity: '1' });
  chip(S, 'x1', 1.2, 12, 29.6, ['0.1 → 실제로는 0.100000001490116…', '0.1 → really 0.100000001490116…'], hid(C.cmp), { h: 2.4, cls: 'ar-code' }); S.set('x1', 2, { opacity: '1' });
  chip(S, 'x2', 1.2, 15.4, 29.6, '0.1 + 0.2 = 0.30000000000000004', hid(C.bad), { h: 2.4, cls: 'ar-code' }); S.set('x2', 3, { opacity: '1' });
  S.cap(0, '실수는 부호·지수·가수로 나눠 저장해요 (IEEE 754)', 'Floats store sign, exponent and fraction (IEEE 754)').cap(1, '과학적 표기법의 2진수 버전', 'Scientific notation in binary')
    .cap(2, '0.1은 2진수로 끝없이 이어져 근사값이 돼요', '0.1 never ends in binary, so it is approximated').cap(3, '그래서 이런 결과가 나와요', 'which gives results like this')
    .cap(4, '돈은 정수(원·센트)나 Decimal로 계산하세요', 'Compute money in integers or Decimal').cap(5, '비교는 == 대신 오차 범위로', 'Compare floats within a tolerance, not with ==');
  return S;
}
function sEndian() {
  const S = scene({ id: 'ar-endian', steps: 4, per: 1.5 });
  text(S, 'v', 1, 1.4, ['값: 0x12345678 (4바이트)', 'value: 0x12345678 (4 bytes)'], { cls: 'cz-t ar-b' });
  const B = ['12', '34', '56', '78'], col = [C.bad, C.cmp, C.ok, C.soft];
  ['0x100', '0x101', '0x102', '0x103'].forEach((a, i) => text(S, 'ad' + i, 9 + i * 5.4, 4, a, { w: 5, cls: 'cz-t cz-tc cz-mono' }));
  text(S, 'bl', 1, 6.6, ['빅 엔디언', 'Big endian'], { cls: 'cz-t ar-b' }); text(S, 'll', 1, 12.6, ['리틀 엔디언', 'Little endian'], { cls: 'cz-t ar-b' });
  B.forEach((b, i) => { chip(S, 'b' + i, 9 + i * 5.4, 5.8, 5, b, hid(col[i]), { h: 3, cls: 'ar-big' }); S.set('b' + i, 1, { opacity: '1' }); chip(S, 'l' + i, 9 + (3 - i) * 5.4, 11.8, 5, b, hid(col[i]), { h: 3, cls: 'ar-big' }); S.set('l' + i, 2, { opacity: '1' }); });
  text(S, 'bn', 9, 9.2, ['사람이 읽는 순서 · 네트워크 바이트 순서', 'reading order · network byte order'], { cls: 'cz-t', s: hid() }); S.set('bn', 1, { opacity: '1' });
  text(S, 'ln', 9, 15.2, ['작은 자리부터 · x86·ARM 대부분', 'least significant first · most x86/ARM'], { cls: 'cz-t', s: hid() }); S.set('ln', 2, { opacity: '1' });
  S.cap(0, '여러 바이트짜리 값을 메모리에 어떤 순서로 둘까?', 'In what order do multi-byte values sit in memory?').cap(1, '큰 자리부터 낮은 주소에', 'Most significant byte at the lowest address').cap(2, '작은 자리부터 낮은 주소에', 'Least significant byte first')
    .cap(4, '바이너리 파일·네트워크 프로토콜을 직접 다룰 때 꼭 맞춰야 해요', 'It matters when parsing binary files or network protocols');
  return S;
}
function sChar() {
  const S = scene({ id: 'ar-char', steps: 5, per: 1.3 });
  const R = [['A', 'U+0041', ['41'], C.ok], ['é', 'U+00E9', ['C3', 'A9'], C.soft], ['한', 'U+D55C', ['ED', '95', '9C'], C.cmp], ['😀', 'U+1F600', ['F0', '9F', '98', '80'], C.bad]];
  R.forEach(([ch, cp, bytes, st], i) => {
    const y = 1.8 + i * 4.4, s = i + 1;
    chip(S, 'c' + i, 1, y, 3.6, i === 3 ? ['이모지', 'emoji'] : ch, hid(), { h: 3.2, cls: i === 3 ? 'ar-xs' : 'ar-big' }); text(S, 'p' + i, 5.2, y + 1, cp, { cls: 'cz-t cz-mono', s: hid() });
    bytes.forEach((b, j) => chip(S, `b${i}_${j}`, 12 + j * 3.6, y, 3.2, b, hid(st), { h: 3.2, cls: 'ar-big' }));
    text(S, 'n' + i, 27, y + 1, [`${bytes.length}바이트`, `${bytes.length} byte${bytes.length > 1 ? 's' : ''}`], { cls: 'cz-t ar-b', s: hid() });
    show(S, ['c' + i, 'p' + i, 'n' + i, ...bytes.map((_, j) => `b${i}_${j}`)], s);
  });
  S.cap(1, '모든 문자에는 번호(유니코드 코드 포인트)가 있고', 'Every character has a Unicode code point').cap(2, 'UTF-8은 번호에 따라 1~4바이트로 저장해요', 'UTF-8 stores it in 1 to 4 bytes')
    .cap(3, '한글은 3바이트', 'Korean syllables take 3 bytes').cap(4, '이모지는 4바이트 · JS의 length는 2로 나와요', 'Emoji take 4 bytes · JavaScript reports length 2')
    .cap(5, 'DB 컬럼 길이·글자 수 제한은 바이트와 문자를 구분하세요 (MySQL은 utf8mb4)', 'Separate bytes from characters in limits (MySQL: use utf8mb4)');
  return S;
}

/* ---------- CPU ---------- */
function sVN() {
  const S = scene({ id: 'ar-vonneumann', steps: 5, per: 1.3 });
  box(S, 'cpu', 1.4, 2, 12, 10, '', {}); text(S, 'cpl', 2, 2.4, 'CPU', { cls: 'cz-t ar-b' });
  chip(S, 'cu', 2.4, 4.4, 10, ['제어 장치', 'Control unit'], {}, { h: 2.2 }); chip(S, 'alu', 2.4, 7, 4.8, 'ALU', {}, { h: 2.2 }); chip(S, 'reg', 7.6, 7, 4.8, ['레지스터', 'Registers'], {}, { h: 2.2 });
  box(S, 'mem', 20, 2, 11, 10, '', {}); text(S, 'mml', 20.6, 2.4, ['메모리', 'Memory'], { cls: 'cz-t ar-b' });
  chip(S, 'ins', 21, 4.4, 9, ['명령어 (프로그램)', 'instructions'], C.soft, { h: 2.4 }); chip(S, 'dat', 21, 7.4, 9, ['데이터', 'data'], C.cmp, { h: 2.4 });
  S.el('bus', { x: 1.4, y: 14.4, w: 29.6, h: 1.4, css: 'border-radius:1em', s: { background: 'var(--line)' } }); text(S, 'bsl', 13.8, 16.2, ['버스', 'bus'], { cls: 'cz-t' });
  S.el('v1', { x: 7, y: 12, w: .2, h: 2.4, css: 'background:var(--line)' }); S.el('v2', { x: 25.4, y: 12, w: .2, h: 2.4, css: 'background:var(--line)' });
  box(S, 'io', 11.5, 17.6, 9, 2.6, ['입출력 장치', 'I/O devices'], {}); S.el('v3', { x: 15.9, y: 15.8, w: .2, h: 1.8, css: 'background:var(--line)' });
  const trip = (k, st, lab, sty, back) => { dot(S, k, back ? 7.1 : 25.5, 15.1, lab, { r: 1, s: hid(sty) }); S.set(k, st, { opacity: '1' }).move(k, st, (back ? 25.5 : 7.1) - 1, 15.1 - 1).set(k, st + 1, { opacity: '0' }); };
  S.set('ins', 1, C.cur); trip('t1', 1, ['명령', 'instr'], C.soft); S.set('cu', 2, C.soft);
  S.set('ins', 2, C.soft).set('dat', 2, C.warn); trip('t2', 2, ['값', 'data'], C.cmp); S.set('alu', 3, C.cmp).set('cu', 3, C.idle);
  trip('t3', 3, ['결과', 'result'], C.ok, 1); S.set('dat', 4, C.ok).set('alu', 4, C.idle);
  S.set('bus', 5, { background: 'var(--danger)' });
  S.cap(0, '명령어와 데이터를 같은 메모리에 두는 구조 (프로그램 내장)', 'Instructions and data share one memory (stored program)').cap(1, 'CPU가 명령어를 가져오고', 'The CPU fetches an instruction')
    .cap(2, '필요한 데이터를 가져와', 'then the data it needs').cap(3, 'ALU에서 계산한 결과를 다시 써요', 'computes in the ALU and writes back').cap(5, '모든 것이 버스 하나를 지나서 병목이 돼요 → 캐시의 등장', 'Everything crosses one bus: the bottleneck caches fix');
  return S;
}
function sCycle() {
  const S = scene({ id: 'ar-cycle', steps: 7, per: 1.05 });
  const MEM = ['LOAD 10', 'ADD 11', 'STORE 12', '…'];
  text(S, 'ml', 21, 1.2, ['메모리', 'Memory'], { cls: 'cz-t' });
  MEM.forEach((t, i) => { text(S, 'ma' + i, 18.6, 2.9 + i * 2.4, String(i), { cls: 'cz-t cz-mono' }); chip(S, 'm' + i, 21, 2.4 + i * 2.4, 10, t, {}, { h: 2, cls: 'ar-code' }); });
  [['10', '7'], ['11', '5'], ['12', '?']].forEach(([a, v], i) => { text(S, 'da' + i, 18, 13.2 + i * 2.4, a, { cls: 'cz-t cz-mono' }); S.label('d' + i, { cls: 'cz-c ar-m', x: 21, y: 12.7 + i * 2.4, w: 10, h: 2 }, i === 2 ? [[0, '?'], [7, '12']] : [[0, v]]); });
  const reg = (k, y, l, list) => { text(S, k + 'l', 1, y + .55, l, { cls: 'cz-t ar-b' }); S.label(k, { cls: 'cz-c ar-m', x: 5, y, w: 9, h: 2.2 }, list); };
  reg('pc', 2.4, 'PC', [[0, '0'], [3, '1'], [6, '2']]); reg('ir', 5.6, 'IR', [[0, '—'], [1, 'LOAD 10'], [4, 'ADD 11'], [7, 'STORE 12']]); reg('acc', 8.8, 'ACC', [[0, '0'], [2, '7'], [5, '12']]);
  box(S, 'alu', 5, 13, 9, 3.4, 'ALU', {});
  S.label('ph', { cls: 'cz-t ar-b', x: 1, y: 18.2, w: 20 }, [[0, ''], [1, ['① 인출 (Fetch)', '① Fetch']], [2, ['② 해독·실행', '② Decode · Execute']], [3, ['PC + 1', 'PC + 1']], [4, ['① 인출', '① Fetch']], [5, ['② 실행: 7 + 5', '② Execute: 7 + 5']], [6, 'PC + 1'], [7, ['① 인출 → 실행: 저장', 'Fetch → Execute: store']]]);
  S.set('m0', 1, C.soft).set('m0', 2, C.idle).set('d0~0', 2, C.cmp).set('d0~0', 3, C.idle);
  S.set('m1', 4, C.soft).set('m1', 5, C.idle).set('d1~0', 5, C.cmp).set('alu', 5, C.cmp).set('d1~0', 6, C.idle).set('alu', 6, C.idle);
  S.set('m2', 7, C.soft).set('d2~1', 7, C.ok);
  S.cap(1, 'PC가 가리키는 명령어를 IR로 가져와요', 'Fetch the instruction at PC into IR').cap(2, '해석해서 실행: 10번지 값을 ACC에', 'Decode and run it: load address 10 into ACC').cap(3, 'PC를 다음으로', 'Advance PC')
    .cap(5, 'ADD: ALU가 더해요', 'ADD: the ALU adds').cap(7, '이 반복을 초당 수십억 번 (GHz)', 'This loop runs billions of times a second (GHz)');
  return S;
}
function sPipe() {
  const S = scene({ id: 'ar-pipe', steps: 9, per: .85 });
  const ST = ['IF', 'ID', 'EX', 'MEM', 'WB'], col = [C.soft, C.cmp, C.ok, { background: 'var(--accent)', color: 'var(--accent-ink)', 'border-color': 'var(--accent)' }, C.bad];
  const x0 = 6, cw = 2.75, y0 = 3.2, rh = 2.6;
  for (let c = 0; c < 9; c++) text(S, 't' + c, x0 + c * cw, 1.4, String(c + 1), { w: cw - .2, cls: 'cz-t cz-tc cz-mono' });
  for (let i = 0; i < 5; i++) { text(S, 'i' + i, .8, y0 + i * rh + .6, ['명령 ', 'instr '].map(t => t + (i + 1)), { cls: 'cz-t' }); ST.forEach((s, j) => { const c = i + j; chip(S, `c${i}_${j}`, x0 + c * cw, y0 + i * rh, cw - .2, s, hid(col[j]), { h: rh - .3, cls: 'ar-xs' }); S.set(`c${i}_${j}`, c + 1, { opacity: '1' }); }); }
  S.label('n', { cls: 'cz-t ar-b', x: 1, y: 17.6, w: 30 }, [[0, ''], [5, ['5단계가 모두 동시에 일하는 중', 'all 5 stages busy at once']], [9, ['9클럭에 5개 완료 (파이프라인 없으면 25클럭)', '5 done in 9 cycles (25 without pipelining)']]]);
  S.cap(1, '명령 하나를 5단계로 나눠요: 인출·해독·실행·메모리·저장', 'Split each instruction into 5 stages').cap(2, '앞 명령이 다음 단계로 가면 바로 다음 명령이 들어와요', 'The next instruction enters as soon as a stage frees up')
    .cap(5, '세탁기·건조기를 동시에 돌리는 것과 같아요', 'Like running the washer and dryer at the same time').cap(9, '한 명령은 여전히 5클럭이지만 처리량은 클럭당 1개', 'Each still takes 5 cycles, but throughput is one per cycle');
  return S;
}
function sHazard() {
  const S = scene({ id: 'ar-hazard', steps: 5, per: 1.4 });
  const ST = ['IF', 'ID', 'EX', 'MEM', 'WB'], x0 = 9.4, cw = 2.6;
  text(S, 'a', .6, 2.4, 'ADD R1 ← R2+R3', { cls: 'cz-t cz-mono' }); text(S, 'b', .6, 5.2, 'SUB R4 ← R1−R5', { cls: 'cz-t cz-mono' });
  ST.forEach((s, j) => chip(S, 'a' + j, x0 + j * cw, 1.8, cw - .2, s, C.soft, { h: 2.2, cls: 'ar-xs' }));
  const B = ['IF', 'ID', '⏸', '⏸', 'EX', 'MEM', 'WB'];
  B.forEach((s, j) => { chip(S, 'b' + j, x0 + (j + 1) * cw, 4.6, cw - .2, s, hid(s === '⏸' ? C.bad : C.cmp), { h: 2.2, cls: 'ar-xs' }); S.set('b' + j, 1, { opacity: '1' }); });
  text(S, 'n1', .6, 8, ['R1이 아직 안 써져서 2클럭을 기다려요 (데이터 해저드)', 'R1 isn’t written yet: wait 2 cycles (data hazard)'], { cls: 'cz-t', s: hid() }); S.set('n1', 2, { opacity: '1' });
  text(S, 'c', .6, 12.6, ['포워딩 적용', 'with forwarding'], { cls: 'cz-t ar-b', s: hid() }); S.set('c', 3, { opacity: '1' });
  ST.forEach((s, j) => { chip(S, 'f' + j, x0 + j * cw, 11.6, cw - .2, s, hid(C.soft), { h: 2.2, cls: 'ar-xs' }); chip(S, 'g' + j, x0 + (j + 1) * cw, 14.4, cw - .2, s, hid(C.cmp), { h: 2.2, cls: 'ar-xs' }); S.set('f' + j, 3, { opacity: '1' }).set('g' + j, 3, { opacity: '1' }); });
  arrow(S, 'fw', x0 + 2 * cw + 1.2, 13.9, x0 + 3 * cw + .8, 14.5, { s: hid(AR.ok) }); S.set('fw', 4, { opacity: '1' });
  text(S, 'n2', .6, 17.6, ['EX 결과를 바로 다음 명령의 EX로 넘겨 기다리지 않아요', 'pass the EX result straight to the next EX: no wait'], { cls: 'cz-t', s: hid() }); S.set('n2', 4, { opacity: '1' });
  S.cap(1, '다음 명령이 앞 명령의 결과를 쓰면', 'When an instruction needs the previous result').cap(2, '파이프라인이 멈춰요 (버블)', 'the pipeline stalls (bubbles)').cap(3, '하드웨어가 결과를 지름길로 넘기면', 'If hardware forwards the result')
    .cap(4, '멈춤 없이 이어가요', 'there is no stall').cap(5, '컴파일러도 명령 순서를 바꿔 해저드를 줄여요', 'Compilers also reorder instructions to avoid hazards');
  return S;
}
function sBranch() {
  const S = scene({ id: 'ar-branch', steps: 5, per: 1.4 });
  const x0 = 9, cw = 2.6;
  const R = [['if (x > 0)', 0, C.cmp], [['예측: 참쪽 A', 'guess: A'], 1, C.soft], [['예측: 참쪽 B', 'guess: B'], 2, C.soft], [['실제: 거짓쪽 C', 'actual: C'], 3, C.ok]];
  R.forEach(([t, i, st], r) => { text(S, 'l' + r, .6, 2.6 + r * 3 + .4, t, { cls: 'cz-t cz-mono', s: r === 3 ? hid() : {} }); ['IF', 'ID', 'EX'].forEach((s, j) => { chip(S, `c${r}_${j}`, x0 + (i + j) * cw, 2.6 + r * 3, cw - .2, s, r < 3 ? hid(st) : hid(st), { h: 2.4, cls: 'ar-xs' }); S.set(`c${r}_${j}`, r === 3 ? 4 : r + 1, { opacity: '1' }); }); });
  S.set('l3', 4, { opacity: '1' });
  [1, 2].forEach(r => ['0', '1', '2'].forEach(j => S.set(`c${r}_${j}`, 3, C.badf)));
  text(S, 'fl', x0, 15.2, ['예측 실패 → 버리고(flush) 다시 · 10~20클럭 손해', 'mispredicted → flush and refetch · 10–20 cycles lost'], { cls: 'cz-t ar-b', s: hid() }); S.set('fl', 3, { opacity: '1' });
  S.cap(1, '조건 결과가 나오기 전에', 'Before the condition is known').cap(2, 'CPU는 결과를 예측해 미리 실행해요', 'the CPU guesses and runs ahead').cap(3, '틀리면 미리 한 일을 버려요', 'A wrong guess throws that work away')
    .cap(4, '맞는 쪽부터 다시', 'and restarts on the right path').cap(5, '예측 정확도는 95%+ · 정렬된 데이터의 반복문이 빠른 이유', 'Predictors hit 95%+ · why loops over sorted data run faster');
  return S;
}
function sISA() {
  const S = scene({ id: 'ar-isa', steps: 4, per: 1.5 });
  text(S, 'c', 1, 1.4, ['CISC (x86): 길이가 제각각, 명령 하나가 많은 일', 'CISC (x86): variable length, rich instructions'], { cls: 'cz-t ar-b' });
  const ci = [[3, 'MOV'], [7, 'ADD [mem], R1'], [2, 'RET'], [5, 'IMUL …'], [4, 'PUSH …']];
  let x = 1; ci.forEach(([w, t], i) => { chip(S, 'ci' + i, x, 3, w * 1.15, t, hid(C.cmp), { h: 2.4, cls: 'ar-xs' }); S.set('ci' + i, 1, { opacity: '1' }); x += w * 1.15 + .2; });
  text(S, 'r', 1, 8, ['RISC (ARM·RISC-V): 4바이트 고정, 단순한 명령 여러 개', 'RISC (ARM, RISC-V): fixed 4 bytes, simple instructions'], { cls: 'cz-t ar-b' });
  ['LOAD R2, [mem]', 'ADD R2, R2, R1', 'STORE R2, [mem]', 'RET'].forEach((t, i) => { chip(S, 'ri' + i, 1 + i * 7.6, 9.6, 7.2, t, hid(C.soft), { h: 2.4, cls: 'ar-xs' }); S.set('ri' + i, 2, { opacity: '1' }); });
  text(S, 'n', 1, 13.6, ['같은 일을 RISC는 3개로 나눠 하지만 해독·파이프라인이 단순해 효율적', 'RISC needs 3 instructions here, but decoding and pipelining stay simple'], { cls: 'cz-t', s: hid() }); S.set('n', 3, { opacity: '1' });
  pill(S, 'arm', 1, 16, ['애플 M 시리즈·스마트폰 = ARM', 'Apple M-series & phones = ARM'], { w: 14, h: 2, s: hid(C.soft) }); pill(S, 'x86', 16.4, 16, ['대부분의 PC·서버 = x86', 'Most PCs & servers = x86'], { w: 14, h: 2, s: hid(C.cmp) }); S.set('arm', 4, { opacity: '1' }).set('x86', 4, { opacity: '1' });
  S.cap(1, 'CISC는 복잡한 명령이 많아요', 'CISC has many complex instructions').cap(2, 'RISC는 단순하고 길이가 같아요', 'RISC instructions are simple and uniform').cap(3, '요즘은 x86도 내부적으로 RISC처럼 쪼개 실행해요', 'Modern x86 splits instructions into RISC-like micro-ops inside')
    .cap(4, '빌드·도커 이미지는 CPU 아키텍처(amd64/arm64)에 맞춰야 해요', 'Builds and Docker images must match the architecture (amd64/arm64)');
  return S;
}
function sMulti() {
  const S = scene({ id: 'ar-multicore', steps: 6, per: 1.2 });
  const N = [1, 2, 4, 8, 64], u = 2.1, X0 = 6;
  N.forEach((n, i) => {
    const y = 1.6 + i * 3.4, par = 8 / n;
    text(S, 'l' + i, .6, y + .6, [`코어 ${n}개`, `${n} core${n > 1 ? 's' : ''}`], { cls: 'cz-t', s: hid() });
    S.el('s' + i, { cls: 'cz-c', x: X0, y, w: 2 * u, h: 2.4, html: ['순차 2s', 'serial 2s'], s: hid(C.bad) });
    S.el('p' + i, { cls: 'cz-c', x: X0 + 2 * u, y, w: Math.max(par * u, .5), h: 2.4, html: par >= 2 ? [`병렬 ${par}s`, `parallel ${par}s`] : par >= 1 ? `${par}s` : '', s: hid(C.soft) });
    text(S, 't' + i, X0 + (2 + par) * u + .6, y + .6, `= ${(2 + par).toFixed(par < 1 ? 2 : 0)}s`, { cls: 'cz-t cz-mono ar-b', s: hid() });
    show(S, ['l' + i, 's' + i, 'p' + i, 't' + i], i + 1);
  });
  S.cap(1, '10초짜리 일 중 2초는 나눌 수 없어요', 'Of a 10 s job, 2 s cannot be parallelized').cap(2, '코어를 2배로 늘리면 6초', 'Two cores: 6 s').cap(4, '8개면 3초', 'Eight cores: 3 s')
    .cap(5, '아무리 늘려도 2초 아래로는 못 가요 (암달의 법칙)', 'No number of cores beats 2 s (Amdahl’s law)').cap(6, '병렬화보다 순차 구간·락 경합을 줄이는 게 먼저예요', 'Shrink the serial part and lock contention first');
  return S;
}

/* ---------- memory hierarchy ---------- */
function sHier() {
  const S = scene({ id: 'ar-hier', steps: 7, per: .95 });
  const L = [[['레지스터', 'Register'], '0.3ns', ['1초', '1 s'], 4.5], ['L1', '1ns', ['3초', '3 s'], 7], ['L2', '4ns', ['13초', '13 s'], 9.5], ['L3', '15ns', ['50초', '50 s'], 12], ['RAM', '100ns', ['5분', '5 min'], 14.5], ['SSD', '100µs', ['4일', '4 days'], 17], ['HDD', '10ms', ['1년', '1 year'], 19.5]];
  L.forEach(([n, t, h, w], i) => { const y = 1.4 + i * 2.6, x = 11 - w / 2; chip(S, 'l' + i, x, y, w, n, hid([C.bad, C.cmp, C.cmp, C.soft, C.soft, C.ok, C.idle][i]), { h: 2.2 }); text(S, 't' + i, 23.6, y + .5, t, { cls: 'cz-t cz-mono ar-b', s: hid() }); text(S, 'h' + i, 28, y + .5, h, { cls: 'cz-t', s: hid() }); show(S, ['l' + i, 't' + i, 'h' + i], i + 1); });
  text(S, 'hh', 26.4, .2, ['사람 시간으로', 'human scale'], { cls: 'cz-t' });
  S.cap(1, '위로 갈수록 빠르고 작고 비싸요', 'Higher means faster, smaller, pricier').cap(5, 'RAM은 L1보다 100배 느리고', 'RAM is 100× slower than L1').cap(6, 'SSD는 RAM보다 1000배', 'SSD is 1000× slower than RAM')
    .cap(7, '자주 쓰는 데이터를 위층에 두는 게 모든 성능 최적화의 기본', 'Keeping hot data higher up is the root of all optimization');
  return S;
}
function sCache() {
  const S = scene({ id: 'ar-cache', steps: 7, per: 1 });
  box(S, 'cpu', 1, 2, 5.6, 3.2, 'CPU'); box(S, 'ca', 9.6, 1.6, 12, 4, '', {}); text(S, 'cal', 10.2, 1.9, ['캐시', 'Cache'], { cls: 'cz-t' });
  text(S, 'ml', 1, 8.4, ['메모리 (64바이트 = 캐시 라인 하나)', 'Memory (64 bytes = one cache line)'], { cls: 'cz-t' });
  for (let i = 0; i < 16; i++) chip(S, 'm' + i, 1 + i * 1.88, 9.8, 1.7, 'a' + i, i < 8 ? {} : { opacity: '.5' }, { h: 2, cls: 'ar-xs' });
  S.el('line', { x: .8, y: 9.5, w: 15.2, h: 2.6, css: 'border:.18em solid var(--accent);border-radius:.4em;z-index:3', s: hid() });
  for (let i = 0; i < 8; i++) chip(S, 'c' + i, 10.2 + i * 1.4, 3.2, 1.3, 'a' + i, hid(C.soft), { h: 1.8, cls: 'ar-xs' });
  S.label('st', { cls: 'cz-t ar-b', x: 1, y: 14.4, w: 30 }, [[0, ''], [1, ['a0 요청 → 캐시 미스 (100ns)', 'a0 → cache miss (100 ns)']], [2, ['주변 8개를 한 줄로 통째로 가져와요', 'the whole line of 8 neighbours is loaded']], [3, ['a1 → 히트 (1ns)', 'a1 → hit (1 ns)']], [4, ['a2 → 히트', 'a2 → hit']], [5, ['a3…a7 → 모두 히트', 'a3…a7 → all hits']], [6, ['미스 1번 + 히트 7번', '1 miss + 7 hits']]]);
  S.set('m0', 1, C.bad); S.set('line', 2, { opacity: '1' }); for (let i = 0; i < 8; i++) S.set('c' + i, 2, { opacity: '1' });
  S.set('c1', 3, C.ok).set('c2', 4, C.ok); for (let i = 3; i < 8; i++) S.set('c' + i, 5, C.ok);
  S.cap(1, 'CPU가 메모리 값을 처음 읽으면', 'The first read of a value').cap(2, '캐시 라인 단위로 가져와요', 'loads a whole cache line').cap(3, '바로 옆 값은 이미 캐시에', 'Its neighbours are already cached')
    .cap(7, '배열처럼 연속된 데이터가 링크드 리스트보다 훨씬 빠른 이유', 'Why arrays beat linked lists in practice');
  return S;
}
function sLocal() {
  const S = scene({ id: 'ar-locality', steps: 6, per: 1.15 });
  text(S, 'g', 1, 1, ['2차원 배열 a[4][4]', '2D array a[4][4]'], { cls: 'cz-t' });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) chip(S, `g${r}${c}`, 1 + c * 2.6, 2.4 + r * 2.6, 2.3, `${r}${c}`, {}, { h: 2.3, cls: 'ar-xs' });
  text(S, 'm', 12.6, 1, ['메모리에는 행 순서로 한 줄', 'stored row by row in memory'], { cls: 'cz-t' });
  for (let i = 0; i < 16; i++) chip(S, 'm' + i, 12.6 + (i % 8) * 2.3, 2.4 + Math.floor(i / 8) * 2.8, 2.1, `${Math.floor(i / 4)}${i % 4}`, {}, { h: 2.3, cls: 'ar-xs' });
  const rowOrder = [0, 1, 2, 3], colOrder = [0, 4, 8, 12];
  rowOrder.forEach((i, k) => { S.set('m' + i, 1, C.ok); S.set(`g0${i}`, 1, C.ok); });
  [4, 5, 6, 7].forEach(i => S.set('m' + i, 2, C.ok)); [0, 1, 2, 3].forEach(c => S.set(`g1${c}`, 2, C.ok));
  for (let i = 0; i < 16; i++) S.set('m' + i, 3, C.idle); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) S.set(`g${r}${c}`, 3, C.idle);
  colOrder.forEach(i => S.set('m' + i, 4, C.bad)); [0, 1, 2, 3].forEach(r => S.set(`g${r}0`, 4, C.bad));
  [1, 5, 9, 13].forEach(i => S.set('m' + i, 5, C.bad)); [0, 1, 2, 3].forEach(r => S.set(`g${r}1`, 5, C.bad));
  S.label('t', { cls: 'cz-t ar-b', x: 1, y: 14.2, w: 30 }, [[0, ''], [1, ['행 방향: 메모리를 순서대로 → 캐시 히트 ✓', 'row-wise: sequential → cache hits ✓']], [3, ''], [4, ['열 방향: 멀리 뛰어다녀요 → 캐시 미스 ✗', 'column-wise: strided jumps → misses ✗']], [6, ['큰 행렬에선 수 배 차이', 'several times slower on big matrices']]]);
  S.cap(1, 'for i: for j: a[i][j]', 'for i: for j: a[i][j]').cap(4, 'for j: for i: a[i][j]', 'for j: for i: a[i][j]').cap(6, '같은 계산도 메모리 접근 순서가 성능을 정해요 (공간 지역성)', 'Access order alone decides speed (spatial locality)');
  return S;
}
function sFalse() {
  const S = scene({ id: 'ar-falseshare', steps: 6, per: 1.15 });
  box(S, 'k1', 1, 2, 9, 3.2, ['코어 1', 'Core 1']); box(S, 'k2', 22, 2, 9, 3.2, ['코어 2', 'Core 2']);
  const line = (p, x) => { chip(S, p + 'a', x, 6, 4.4, 'a', C.soft, { h: 2.2 }); chip(S, p + 'b', x + 4.6, 6, 4.4, 'b', C.cmp, { h: 2.2 }); };
  line('l1', 1); line('l2', 22);
  text(S, 'n', 10.6, 6.5, ['같은 캐시 라인', 'same cache line'], { cls: 'cz-t' });
  text(S, 'w1', 1, 8.8, ['a++ 만 써요', 'writes only a'], { cls: 'cz-t' }); text(S, 'w2', 22, 8.8, ['b++ 만 써요', 'writes only b'], { cls: 'cz-t' });
  fly(S, 'i1', [10.2, 7.1], [21.8, 7.1], 1, ['무효화', 'invalidate'], C.badf, { r: 1.3 }); S.set('l2a', 1, C.bad).set('l2b', 1, C.bad);
  fly(S, 'i2', [21.8, 7.1], [10.2, 7.1], 2, ['무효화', 'invalidate'], C.badf, { r: 1.3 }); S.set('l1a', 2, C.bad).set('l1b', 2, C.bad).set('l2a', 2, C.soft).set('l2b', 2, C.cmp);
  fly(S, 'i3', [10.2, 7.1], [21.8, 7.1], 3, ['무효화', 'invalidate'], C.badf, { r: 1.3 }); S.set('l2a', 3, C.bad).set('l2b', 3, C.bad).set('l1a', 3, C.soft).set('l1b', 3, C.cmp);
  chip(S, 'f1', 1, 13, 4.4, 'a', hid(C.soft), { h: 2.2 }); chip(S, 'pad', 5.6, 13, 20.8, ['패딩 (64바이트 띄우기)', 'padding (64 bytes apart)'], hid({ 'border-style': 'dashed', background: 'transparent' }), { h: 2.2 }); chip(S, 'f2', 26.6, 13, 4.4, 'b', hid(C.cmp), { h: 2.2 });
  show(S, ['f1', 'pad', 'f2'], 5);
  S.cap(0, '두 코어가 서로 다른 변수를 쓰는데', 'Two cores write different variables').cap(1, '같은 캐시 라인이라 한쪽이 쓸 때마다', 'but they share a cache line, so every write')
    .cap(2, '상대 캐시를 무효화해요', 'invalidates the other core’s copy').cap(3, '공유하지 않는데도 핑퐁 (거짓 공유)', 'Ping-pong without real sharing: false sharing')
    .cap(5, '변수를 다른 캐시 라인에 떨어뜨리면 해결', 'Fix it by putting them on separate lines').cap(6, '멀티스레드 카운터가 이상하게 느릴 때 의심하세요', 'Suspect it when multithreaded counters are oddly slow');
  return S;
}

/* ---------- I/O & storage ---------- */
function sDMA() {
  const S = scene({ id: 'ar-dma', steps: 5, per: 1.35 });
  const u = 2, x0 = 8;
  text(S, 'l1', .8, 2.6, ['DMA 없이', 'Without DMA'], { cls: 'cz-t ar-b' }); text(S, 'l1b', .8, 4, 'CPU', { cls: 'cz-t' });
  gantt(S, 'a', [[['디스크→메모리 복사 (CPU가 직접)', 'copy disk→RAM (CPU does it)'], 0, 8, C.bad, 1], [['내 일', 'my work'], 8, 11, C.soft, 2]], x0, 3, u, 2.4);
  text(S, 'l2', .8, 9.6, ['DMA 사용', 'With DMA'], { cls: 'cz-t ar-b' }); text(S, 'l2b', .8, 11, 'CPU', { cls: 'cz-t' }); text(S, 'l2c', .8, 14.4, 'DMA', { cls: 'cz-t' });
  gantt(S, 'b', [[['지시', 'setup'], 0, 1, C.cmp, 3], [['내 일', 'my work'], 1, 4, C.soft, 4], [['완료', 'done'], 8, 9, C.ok, 4]], x0, 10, u, 2.4);
  gantt(S, 'c', [[['DMA 컨트롤러가 복사', 'DMA controller copies'], 1, 8, C.cmp, 4]], x0, 13.4, u, 2.4);
  arrow(S, 'ir', x0 + 8 * u, 13.2, x0 + 8 * u, 12.6, { s: hid(AR.ok) }); S.set('ir', 4, { opacity: '1' });
  S.cap(1, 'CPU가 데이터를 한 조각씩 옮기면', 'If the CPU moves data piece by piece').cap(2, '그동안 다른 일을 못 해요', 'it can’t do anything else').cap(3, 'DMA는 CPU가 시작만 지시하면', 'With DMA the CPU just starts the transfer')
    .cap(4, '전용 장치가 옮기고 끝나면 인터럽트로 알려요', 'a dedicated controller copies and interrupts when done').cap(5, '디스크·네트워크 카드·GPU 전송이 모두 DMA', 'Disks, NICs and GPU transfers all use DMA');
  return S;
}
function sSSD() {
  const S = scene({ id: 'ar-ssd', steps: 5, per: 1.3 });
  text(S, 'h', 1, 1.2, 'HDD', { cls: 'cz-t ar-b' }); text(S, 's', 17.4, 1.2, 'SSD', { cls: 'cz-t ar-b' });
  S.el('plat', { x: 2, y: 3, w: 12, h: 12, css: 'border-radius:50%;border:.14em solid var(--line)', s: { background: 'var(--ui)' } });
  S.el('hub', { x: 7.4, y: 8.4, w: 1.2, h: 1.2, css: 'border-radius:50%', s: { background: 'var(--ink-3)' } });
  S.el('arm', { x: 8.6, y: 15.3, w: 7, h: .35, css: 'transform-origin:100% 50%;border-radius:1em;background:var(--ink-2)', s: { transform: 'rotate(30deg)' } });
  [[48, 1], [18, 2], [58, 3], [36, 4]].forEach(([a, st]) => S.set('arm', st, { transform: `rotate(${a}deg)` }));
  [[4.2, 6.2], [9.6, 4.4], [5, 11.6], [11, 9.6]].forEach(([x, y], i) => { S.el('t' + i, { x, y, w: .9, h: .9, css: 'border-radius:50%', s: hid({ background: 'var(--warn)' }) }); S.set('t' + i, i + 1, { opacity: '1' }); });
  text(S, 'hn', 1, 16, ['바늘이 움직여 찾아가요 · 랜덤 읽기 ~100 IOPS', 'the head must seek · ~100 random IOPS'], { cls: 'cz-t', s: hid() }); S.set('hn', 2, { opacity: '1' });
  for (let i = 0; i < 8; i++) { chip(S, 'f' + i, 17.4 + (i % 4) * 3.5, 3.4 + Math.floor(i / 4) * 4.2, 3, '', {}, { h: 3.6 }); S.set('f' + i, 3, C.ok).set('f' + i, 4, C.idle).set('f' + i, 5, C.ok); }
  text(S, 'sn', 17.4, 12.6, ['칩 여러 개를 동시에 · ~100,000 IOPS', 'many chips in parallel · ~100,000 IOPS'], { cls: 'cz-t', s: hid() }); S.set('sn', 3, { opacity: '1' });
  S.cap(1, 'HDD는 원판을 돌리고 바늘을 옮겨 읽어요', 'An HDD spins platters and moves a head').cap(2, '흩어진 데이터를 읽으면 이동 시간이 대부분', 'Scattered reads are mostly seek time')
    .cap(3, 'SSD는 움직이는 부품 없이 여러 칩을 동시에', 'An SSD has no moving parts and reads chips in parallel').cap(5, 'DB·OS 디스크는 SSD · 대용량 백업은 HDD·테이프가 여전히 싸요', 'Use SSDs for databases and OS; HDD and tape stay cheap for bulk backups');
  return S;
}
function sGPU() {
  const S = scene({ id: 'ar-gpu', steps: 5, per: 1.3 });
  text(S, 'c', 1, 1.2, ['CPU: 크고 똑똑한 코어 몇 개', 'CPU: a few big, smart cores'], { cls: 'cz-t ar-b' });
  for (let i = 0; i < 4; i++) chip(S, 'c' + i, 1 + (i % 2) * 6.6, 3 + Math.floor(i / 2) * 5.2, 6, ['코어', 'core'], {}, { h: 4.6 });
  text(S, 'g', 15.4, 1.2, ['GPU: 단순한 코어 수천 개', 'GPU: thousands of simple cores'], { cls: 'cz-t ar-b' });
  for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) S.el(`g${r}_${c}`, { x: 15.4 + c * 1.3, y: 3 + r * 1.3, w: 1.1, h: 1.1, css: 'border-radius:.2em', s: { background: 'var(--line)' } });
  for (let i = 0; i < 4; i++) { S.set('c' + i, 1, C.soft); S.set('c' + i, 2, C.ok); S.set('c' + i, 3, C.soft); S.set('c' + i, 4, C.ok); }
  for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) S.set(`g${r}_${c}`, 1, { background: 'var(--ok)' });
  S.label('n', { cls: 'cz-t ar-b', x: 1, y: 15, w: 30 }, [[0, ['픽셀 96개에 같은 계산', 'same maths on 96 pixels']], [1, ['GPU: 한 번에 끝 · CPU: 4개씩', 'GPU: all at once · CPU: 4 at a time']], [4, ['CPU는 아직 계속…', 'CPU still going…']]]);
  S.cap(1, '같은 연산을 대량 데이터에 반복하는 일은', 'For the same operation over huge data').cap(2, 'GPU가 압도적으로 빨라요', 'GPUs win by far').cap(4, '대신 분기가 많은 복잡한 로직은 CPU가 유리', 'but branchy, complex logic suits the CPU')
    .cap(5, '그래픽·딥러닝(행렬 곱)·암호화폐 채굴이 GPU를 쓰는 이유', 'Why graphics, deep learning (matrix maths) and mining use GPUs');
  return S;
}

window.UX = page([
  sec('ar-data', '데이터 표현', 'Data representation', '컴퓨터가 수와 글자를 담는 방법', 'How computers store numbers and text',
    '모든 데이터는 결국 0과 1이에요. 그 약속을 알아야 이상한 버그가 이해돼요.', 'All data is 0s and 1s in the end; knowing the conventions explains strange bugs.', [
    item('ar-bin', '2진수와 16진수', 'Binary · Hexadecimal', '컴퓨터는 0과 1(비트)로 수를 표현해요. 자리마다 2배씩 커지고, 4비트를 16진수 한 글자로 줄여 써요.', '색상(#FF8800), 메모리 주소, 해시값, 파일 권한(chmod 755=2진 111 101 101)이 모두 이 표기예요.', 'Computers write numbers in bits; each place is worth double the previous, and hex packs 4 bits into one digit.', 'Colours (#FF8800), memory addresses, hashes and file modes (chmod 755 = 111 101 101) all use these notations.', sBin()),
    item('ar-twos', '2의 보수', 'Two’s complement', '음수는 비트를 뒤집고 1을 더해 표현해요. 덧셈 회로 하나로 뺄셈까지 처리할 수 있어요.', '정수형은 범위를 넘으면 반대쪽 끝으로 넘어가요(오버플로). 32비트 int는 약 21억이 한계라 금액·ID엔 64비트를 쓰세요.', 'Negative numbers are formed by inverting the bits and adding one, so a single adder handles subtraction.', 'Integers wrap around past their range (overflow). A 32-bit int tops out near 2.1 billion, so use 64-bit for money and ids.', sTwos()),
    item('ar-float', '부동소수점', 'Floating point', '실수를 부호·지수·가수로 나눠 저장하는 방식(IEEE 754)이에요. 0.1처럼 2진수로 딱 떨어지지 않는 수는 근사값이 돼요.', '0.1 + 0.2 ≠ 0.3 이에요. 돈 계산은 정수(최소 단위)나 Decimal 타입을 쓰고, 실수 비교는 오차 범위로 하세요.', 'Real numbers are stored as sign, exponent and fraction (IEEE 754); values like 0.1 that don’t terminate in binary are approximated.', '0.1 + 0.2 ≠ 0.3. Do money in integer minor units or Decimal, and compare floats within a tolerance.', sFloat()),
    item('ar-endian', '엔디언', 'Endianness', '여러 바이트로 된 값을 메모리에 큰 자리부터(빅 엔디언) 둘지, 작은 자리부터(리틀 엔디언) 둘지의 약속이에요.', '대부분의 CPU는 리틀 엔디언, 네트워크는 빅 엔디언이에요. 바이너리 파일·소켓 프로토콜을 파싱할 때 순서를 꼭 맞추세요.', 'Whether a multi-byte value is stored most-significant byte first (big-endian) or least-significant first (little-endian).', 'Most CPUs are little-endian; network protocols are big-endian. Match the order when parsing binary files or sockets.', sEndian()),
    item('ar-char', '문자 인코딩 (UTF-8)', 'Character encoding · UTF-8', '모든 문자에 유니코드 번호를 붙이고, UTF-8은 이를 1~4바이트로 저장해요. 영문은 1바이트, 한글은 3바이트예요.', '글자가 깨지면(문자 깨짐) 저장과 읽기 인코딩이 다른 거예요. MySQL은 이모지 때문에 utf8이 아닌 utf8mb4를 써야 해요.', 'Every character has a Unicode number, and UTF-8 stores it in 1–4 bytes: 1 for English letters, 3 for Korean syllables.', 'Garbled text means writing and reading used different encodings. In MySQL use utf8mb4, not utf8, so emoji fit.', sChar())
  ]),
  sec('ar-cpu', 'CPU', 'CPU', 'CPU의 동작', 'How the CPU works',
    '명령어 하나가 실행되는 과정과 그것을 빠르게 만드는 기법들이에요.', 'How one instruction runs, and the tricks that make it fast.', [
    item('ar-vonneumann', '폰 노이만 구조', 'Von Neumann architecture', '명령어와 데이터를 같은 메모리에 두고, CPU가 버스를 통해 하나씩 가져와 실행하는 구조예요. 오늘날 거의 모든 컴퓨터의 기본이에요.', 'CPU는 빨라졌지만 메모리와 버스는 상대적으로 느려서 병목이 생겨요. 캐시·프리페치가 이 문제를 줄이기 위해 존재해요.', 'Instructions and data share one memory, and the CPU fetches them over a bus one at a time; nearly every computer works this way.', 'CPUs got fast while memory and buses lagged, creating a bottleneck that caches and prefetching exist to hide.', sVN()),
    item('ar-cycle', '명령어 사이클', 'Instruction cycle', 'CPU는 PC가 가리키는 명령어를 가져오고(인출), 해석하고(해독), 실행한 뒤 다음 명령으로 넘어가는 일을 반복해요.', '3GHz CPU는 1초에 이 사이클을 30억 번 돌려요. 디버거의 "한 줄 실행"이 이 반복을 사람 속도로 보는 거예요.', 'The CPU fetches the instruction PC points to, decodes it, executes it and moves to the next, over and over.', 'A 3 GHz CPU turns this loop three billion times a second; stepping in a debugger watches it at human speed.', sCycle()),
    item('ar-pipe', '파이프라인', 'Pipelining', '명령어 처리를 여러 단계로 나눠, 앞 명령이 다음 단계로 가면 바로 다음 명령을 시작해요. 동시에 여러 명령이 서로 다른 단계에 있어요.', '명령 하나의 시간은 같지만 처리량이 크게 늘어요. 최신 CPU는 여기에 여러 명령을 동시에 내보내는 슈퍼스칼라, 순서를 바꾸는 비순차 실행까지 더해요.', 'Instruction processing is split into stages so a new instruction starts as soon as the previous one moves on, with several in flight at once.', 'Latency per instruction is unchanged but throughput soars. Modern CPUs add superscalar issue and out-of-order execution on top.', sPipe()),
    item('ar-hazard', '파이프라인 해저드', 'Pipeline hazards', '다음 명령이 앞 명령의 결과를 필요로 하면 파이프라인이 기다려야 해요(데이터 해저드). 포워딩으로 결과를 지름길로 넘겨 줄여요.', '컴파일러가 명령 순서를 바꿔(스케줄링) 기다림을 줄여요. 의존성이 긴 계산 사슬은 병렬화가 어려운 이유이기도 해요.', 'When an instruction needs the result of the one before, the pipeline must wait (a data hazard); forwarding passes the result via a shortcut.', 'Compilers reorder instructions to hide stalls. Long dependency chains are also why some code resists parallelism.', sHazard()),
    item('ar-branch', '분기 예측', 'Branch prediction', 'if문의 결과가 나오기 전에 CPU가 어느 쪽일지 예측해서 미리 실행해요. 틀리면 미리 한 일을 버리고 다시 해요.', '정렬된 데이터로 반복하면 예측이 잘 맞아 빨라져요(유명한 StackOverflow 질문). 스펙터 같은 보안 취약점도 이 추측 실행에서 나왔어요.', 'Before an if is resolved, the CPU guesses the outcome and runs ahead; a wrong guess means discarding that work.', 'Loops over sorted data run faster because predictions hit (a famous Stack Overflow question). Spectre-style attacks came from this speculation.', sBranch()),
    item('ar-isa', 'CISC vs RISC', 'CISC vs RISC', 'CISC(x86)는 복잡하고 길이가 다양한 명령어를, RISC(ARM, RISC-V)는 단순하고 길이가 같은 명령어를 써요.', '애플 실리콘·스마트폰은 ARM, 대부분의 서버·PC는 x86이에요. 도커 이미지와 네이티브 라이브러리는 아키텍처(amd64/arm64)를 맞춰야 해요.', 'CISC (x86) uses complex, variable-length instructions; RISC (ARM, RISC-V) uses simple, fixed-length ones.', 'Apple silicon and phones are ARM; most servers and PCs are x86. Docker images and native libraries must match the architecture (amd64/arm64).', sISA()),
    item('ar-multicore', '멀티코어와 암달의 법칙', 'Multicore · Amdahl’s law', '코어를 늘려도 나눌 수 없는 순차 구간이 있으면 속도 향상에 한계가 있어요. 순차 비율이 20%면 최대 5배까지예요.', '스레드를 늘리기 전에 락 경합·순차 처리 구간을 먼저 줄이세요. 서버는 요청 단위로 나눠 코어를 잘 활용해요.', 'Adding cores can only speed up the parallel part; with 20% serial work, the best possible speed-up is 5×.', 'Before adding threads, cut lock contention and serial sections. Servers use cores well by splitting work per request.', sMulti())
  ]),
  sec('ar-mem', '메모리 계층', 'Memory hierarchy', '메모리 계층과 캐시', 'Memory hierarchy and caches',
    '빠른 메모리는 작고 비싸서 여러 층으로 나눠 써요.', 'Fast memory is small and expensive, so it comes in layers.', [
    item('ar-hier', '메모리 계층 구조', 'Memory hierarchy', '레지스터 → L1·L2·L3 캐시 → RAM → SSD → HDD 순으로 느려지고, 커지고, 싸져요.', '"L1 접근이 1초라면 RAM은 5분, SSD는 며칠"이라는 감각을 가지면 어디를 최적화할지 보여요.', 'Registers, then L1/L2/L3 caches, RAM, SSD and HDD: each level is slower, larger and cheaper.', 'Think “if L1 took one second, RAM would take five minutes and SSD days” to see where optimization pays.', sHier()),
    item('ar-cache', '캐시와 캐시 라인', 'Cache · Cache lines', 'CPU는 메모리를 64바이트 묶음(캐시 라인)으로 가져와 캐시에 둬요. 한 번 미스가 나면 주변 데이터는 히트가 돼요.', '배열이 링크드 리스트보다 실제로 훨씬 빠른 이유예요. 데이터를 연속으로 배치하는 게 알고리즘 복잡도만큼 중요해요.', 'The CPU pulls memory in 64-byte chunks (cache lines), so after one miss the neighbouring data hits.', 'This is why arrays beat linked lists in practice; laying data out contiguously matters as much as big-O.', sCache()),
    item('ar-locality', '지역성', 'Locality', '최근 쓴 데이터를 곧 다시 쓰고(시간 지역성), 가까운 데이터를 이어서 쓰는(공간 지역성) 경향이에요. 캐시는 이걸 믿고 동작해요.', '2차원 배열은 행 순서로 돌고, 구조체 배열(AoS)과 배열 구조체(SoA) 중 접근 패턴에 맞게 고르세요.', 'Programs tend to reuse recent data (temporal locality) and touch nearby data next (spatial locality); caches bet on it.', 'Iterate 2D arrays row by row, and choose array-of-structs or struct-of-arrays to match your access pattern.', sLocal()),
    item('ar-falseshare', '거짓 공유', 'False sharing', '서로 다른 코어가 다른 변수를 쓰는데, 두 변수가 같은 캐시 라인에 있어서 캐시가 계속 서로를 무효화하는 현상이에요.', '멀티스레드 카운터·큐가 이유 없이 느리면 의심하세요. 패딩이나 @Contended, 스레드별 카운터로 해결해요.', 'Cores writing different variables keep invalidating each other because those variables share one cache line.', 'Suspect it when multithreaded counters or queues are inexplicably slow; fix with padding, @Contended or per-thread counters.', sFalse())
  ]),
  sec('ar-io', '입출력·저장', 'I/O & storage', '입출력과 저장 장치', 'I/O and storage',
    '데이터를 옮기고 오래 보관하는 장치들이에요.', 'Devices that move and keep data.', [
    item('ar-dma', 'DMA', 'DMA · Direct memory access', '대량 데이터 전송을 CPU 대신 전용 컨트롤러가 메모리로 직접 옮기고, 끝나면 인터럽트로 알려요.', '덕분에 CPU는 디스크·네트워크 전송 중에도 다른 일을 해요. 제로 카피(sendfile) 같은 고성능 I/O 기법의 바탕이에요.', 'A dedicated controller moves bulk data straight into memory instead of the CPU, raising an interrupt when done.', 'The CPU keeps working during disk and network transfers; it underpins zero-copy I/O like sendfile.', sDMA()),
    item('ar-ssd', 'SSD vs HDD', 'SSD vs HDD', 'HDD는 원판을 돌리고 헤드를 움직여 읽어서 흩어진 데이터에 느리고, SSD는 플래시 칩을 병렬로 읽어 수천 배 빨라요.', 'DB·서버 디스크는 SSD가 기본이에요. SSD는 쓰기 횟수에 수명이 있고, 클라우드 디스크는 IOPS 한도를 확인하세요.', 'HDDs spin platters and move a head, so scattered reads are slow; SSDs read flash chips in parallel and are thousands of times faster.', 'SSDs are the default for databases and servers. They wear with writes, and cloud disks have IOPS limits to check.', sSSD()),
    item('ar-gpu', 'CPU vs GPU', 'CPU vs GPU', 'CPU는 복잡한 일을 빠르게 하는 큰 코어 몇 개, GPU는 같은 단순 계산을 대량으로 하는 작은 코어 수천 개예요.', '딥러닝의 행렬 곱, 그래픽, 영상 인코딩에 GPU를 써요. 데이터를 GPU로 옮기는 비용이 있어서 작은 작업은 오히려 손해예요.', 'A CPU has a few big cores for complex work; a GPU has thousands of small ones for the same simple maths on lots of data.', 'Deep learning’s matrix maths, graphics and video encoding run on GPUs. Copying data to the GPU costs time, so tiny jobs lose.', sGPU())
  ])
]);
window.UX[0].css += `
.ar-m .in{font-family:var(--f-mono);font-size:.66em;font-weight:700}
.ar-xs .in{font-size:.54em}
.ar-big .in{font-size:1.05em;font-weight:800}
.ar-code{place-items:center start!important;padding-left:.7em}
.ar-code .in{font-family:var(--f-mono);font-size:.62em}
.ar-b .in{font-weight:800;color:var(--ink);font-size:.8em}`;
})();
