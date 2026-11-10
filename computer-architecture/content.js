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
  text(S, 'n', 10.4, 9.3, ['같은 캐시 라인', 'same cache line'], { cls: 'cz-t cz-tc', w: 11.2 });
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'arx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono arx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono arx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c arx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono arx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c arx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'arx-s arx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono arx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono arx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono arx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono arx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono arx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'arx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'arx-xs', 5));


const CSSX = `
.arx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.arx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.arx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.arx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.arx-r .in{color:var(--danger);font-weight:800}
.arx-g .in{color:var(--ok);font-weight:800}
.arx-a .in{color:var(--accent);font-weight:800}
.arx-w .in{color:var(--warn);font-weight:800}
.arx-c .in{font-size:.6em;font-weight:700}
.arx-c2 .in{font-size:.5em;font-weight:700}
.arx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.arx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'arx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= data representation ================= */
function sMult() {
  const S = scene({ id: 'ar-mult', steps: 5, per: 1.6 });
  const X = c => 20 - c * 1.4, bits = (k, s, y, st, c, o = {}) => s.split('').reverse().forEach((b, i) => box2(S, `${k}${i}`, X(i + (o.sh || 0)), y, 1.3, 1.1, b, c, st, { pct: b === '1' ? 35 : 15 }));
  bits('a', '1011', 1, 0, 'accent'); T(S, 'al', 1, 1.2, '1011 = 11', 'cz-mono arx-xs', 0);
  bits('b', '1101', 2.3, 0, 'warn'); T(S, 'bl', 1, 2.5, '× 1101 = 13', 'cz-mono arx-xs', 0);
  hl(S, 'l1', 9.8, 21.4, 3.7, 'ink-3', 1, { w: .08 });
  [['p0', '1011', 0, 4.1, ['bit0 = 1 → 그대로', 'bit0 = 1 → as is'], 'ok'], ['p1', '0000', 1, 5.4, ['bit1 = 0 → 0', 'bit1 = 0 → 0'], 'line'], ['p2', '1011', 2, 6.7, ['bit2 = 1 → 2칸 시프트', 'bit2 = 1 → shift by 2'], 'ok'], ['p3', '1011', 3, 8, ['bit3 = 1 → 3칸 시프트', 'bit3 = 1 → shift by 3'], 'ok']].forEach(([k, s, sh, y, t, c]) => { bits(k, s, y, sh < 2 ? 1 : 2, c, { sh }); T(S, k + 't', 22.6, y + .15, t, 'arx-xs', sh < 2 ? 1 : 2); });
  hl(S, 'l2', 9.8, 21.4, 9.5, 'ink-3', 3, { w: .08 });
  bits('s', '10001111', 9.9, 3, 'ok'); T(S, 'sl', 22.6, 10.05, '= 143 = 11 × 13 ✓', 'cz-mono arx-s arx-g', 3);
  T(S, 'n1', 1, 4.3, ['곱하는 수의 비트마다', 'for each multiplier bit:'], 'arx-xs arx-a', 1); T(S, 'n2', 1, 5.3, ['1이면 시프트해서 더해요', 'if 1, shift and add'], 'arx-xs arx-a', 1);
  code(S, 'cd', 1, 11.6, 16, ['x * 8  == x << 3', 'x * 10 == (x << 3) + (x << 1)'], [], { st: 4 });
  T(S, 'h1', 18, 11.8, ['부스 인코딩: 1이 연속된 구간을 빼기 한 번으로', 'Booth encoding: a run of 1s becomes one subtract'], 'arx-xs', 4); T(S, 'h2', 18, 12.8, ['월리스 트리: 부분곱을 병렬로 더해요', 'Wallace tree: add partial products in parallel'], 'arx-xs', 4);
  fin(S, 'z', 14.6, [['2진 곱셈 = 시프트와 덧셈의 반복 (손으로 하는 세로 곱셈과 같아요)', 'binary multiplication is repeated shift-and-add, just like long multiplication by hand', 'arx-xs arx-a'], ['나눗셈은 시프트와 빼기의 반복이라 곱셈보다 훨씬 느려요 (수십 사이클)', 'division repeats shift-and-subtract and is far slower than multiplication (tens of cycles)'], ['컴파일러는 상수 곱셈을 시프트·덧셈으로, 상수 나눗셈을 곱셈으로 바꿔요', 'compilers turn constant multiplies into shifts and adds, and constant divides into multiplies']]);
  S.cap(1, '비트마다 부분곱', 'A partial product per bit').cap(2, '자리만큼 시프트', 'Shift by position').cap(3, '모두 더하면 곱', 'Add them up').cap(4, '하드웨어와 컴파일러의 요령', 'Hardware and compiler tricks').cap(5, '곱셈과 나눗셈 하드웨어', 'Multiplication and division hardware');
  return S;
}
function sHamming() {
  const S = scene({ id: 'ar-hamming', steps: 5, per: 1.6 });
  const L = ['1·p1', '2·p2', '3·d1', '4·p4', '5·d2', '6·d3', '7·d4'], V = '0110011', X = i => 1 + i * 2.5;
  L.forEach((l, i) => { T(S, 'l' + i, X(i), .5, l, 'cz-tc cz-mono arx-tiny', 0, { w: 2.4 }); const p = [0, 1, 3].includes(i); box2(S, 'v' + i, X(i), 1.3, 2.4, 1.4, p ? '' : V[i], p ? 'warn' : 'accent', 0, { pct: 25 }); if (p) T(S, 'vp' + i, X(i), 1.65, V[i], 'cz-tc cz-mono arx-s arx-w', 2, { w: 2.4 }); });
  T(S, 'dl', 18.6, 1.6, ['데이터 1011 (d1~d4)', 'data 1011 (d1–d4)'], 'arx-xs arx-a', 1);
  const G = [['p1', [0, 2, 4, 6], 'p1 = d1⊕d2⊕d4 = 0'], ['p2', [1, 2, 5, 6], 'p2 = d1⊕d3⊕d4 = 1'], ['p4', [3, 4, 5, 6], 'p4 = d2⊕d3⊕d4 = 0']];
  G.forEach(([g, cov, f], r) => { const y = 3.6 + r * 1.3; cov.forEach(i => box2(S, `g${r}_${i}`, X(i), y, 2.4, 1.1, V[i], 'ok', 2, { pct: 25 })); T(S, 'gf' + r, 18.6, y + .15, f, 'cz-mono arx-xs', 2); });
  T(S, 'rl', 18.6, 8, ['전송 중 6번 비트가 뒤집힘', 'bit 6 flips in transit'], 'arx-xs arx-r', 3);
  '0110001'.split('').forEach((b, i) => { box2(S, 'r' + i, X(i), 7.8, 2.4, 1.4, i === 5 ? '' : b, i === 5 ? 'danger' : 'line', 3, { pct: 35 }); });
  T(S, 'r5a', X(5), 8.15, '0', 'cz-tc cz-mono arx-s arx-r', 3, { w: 2.4, off: 4 }); T(S, 'r5b', X(5), 8.15, '1', 'cz-tc cz-mono arx-s arx-g', 4, { w: 2.4 });
  tsets(S, 'r5', [[4, 'ok', 45]]); T(S, 'r5f', X(5), 9.25, ['→ 1로 복구', '→ fixed to 1'], 'cz-tc arx-tiny arx-g', 4, { w: 2.4 });
  [['p1 그룹 (1,3,5,7): 0⊕1⊕0⊕1 = 0 ✓', 'p1 group (1,3,5,7): 0⊕1⊕0⊕1 = 0 ✓', ''], ['p2 그룹 (2,3,6,7): 1⊕1⊕0⊕1 = 1 ✗', 'p2 group (2,3,6,7): 1⊕1⊕0⊕1 = 1 ✗', ' arx-r'], ['p4 그룹 (4,5,6,7): 0⊕0⊕0⊕1 = 1 ✗', 'p4 group (4,5,6,7): 0⊕0⊕0⊕1 = 1 ✗', ' arx-r'], ['신드롬 (p4 p2 p1) = 110₂ = 6 → 6번 비트를 뒤집어 복구 ✓', 'syndrome (p4 p2 p1) = 110₂ = 6 → flip bit 6 back ✓', ' arx-g']].forEach(([k, e, c], i) => T(S, 'sy' + i, 1, 10 + i * 1.05, [k, e], 'cz-mono arx-xs' + c, 4));
  fin(S, 'z', 14.6, [['해밍 코드: 패리티 비트를 2의 거듭제곱 자리에 두고, 각자 겹치는 자리 묶음을 검사해요', 'Hamming code: parity bits sit at powers of two, each checking an overlapping group of positions', 'arx-xs arx-a'], ['어긋난 검사들의 번호를 합치면 오류 위치가 바로 나와요 → 1비트 정정', 'the failed checks spell out the error position in binary → single-bit correction'], ['ECC 메모리(서버 RAM), SSD·통신에서 쓰여요 · 비트 하나를 더하면 2비트 오류 검출(SECDED)', 'used in ECC server RAM, SSDs and links · one extra bit adds double-error detection (SECDED)']]);
  S.cap(1, '데이터 비트 배치', 'Place the data bits').cap(2, '패리티 비트 계산', 'Compute the parity bits').cap(3, '전송 중 오류', 'An error in transit').cap(4, '신드롬으로 위치 찾기', 'Locate it with the syndrome').cap(5, '해밍 코드와 ECC', 'Hamming codes and ECC');
  return S;
}

/* ================= CPU ================= */
function sPerf() {
  const S = scene({ id: 'ar-perf', steps: 5, per: 1.6 });
  box2(S, 'ic', 1, 1.2, 7.2, 1.8, ['명령어 수 (IC)', 'instruction count'], 'accent', 1, { pct: 30 }); T(S, 'x1', 8.5, 1.55, '×', 'arx-l', 1);
  box2(S, 'cpi', 10, 1.2, 6.4, 1.8, ['명령당 사이클 (CPI)', 'cycles per instr. (CPI)'], 'warn', 1, { pct: 30 }); T(S, 'x2', 16.7, 1.55, '×', 'arx-l', 1);
  box2(S, 'clk', 18.2, 1.2, 6.6, 1.8, ['클럭 주기', 'clock period'], 'ok', 1, { pct: 30 }); T(S, 'eq', 25.1, 1.55, '=', 'arx-l', 1);
  box2(S, 'tm', 26.6, 1.2, 4.4, 1.8, ['CPU 시간', 'CPU time'], 'danger', 1, { pct: 30 });
  [['10⁹', 1, 7.2], ['2', 10, 6.4], ['1 / 2 GHz = 0.5 ns', 18.2, 6.6], ['1 s', 26.6, 4.4]].forEach(([v, x, w], i) => T(S, 'v' + i, x, 3.3, v, 'cz-tc cz-mono arx-xs', 1, { w }));
  [[['알고리즘 · 컴파일러 · ISA', 'algorithm · compiler · ISA'], 1, 7.2], [['파이프라인 · 캐시 미스', 'pipeline · cache misses'], 10, 6.4], [['공정 · 전력', 'process · power'], 18.2, 6.6]].forEach(([t, x, w], i) => T(S, 'f' + i, x, 4.6, t, 'cz-tc arx-tiny', 2, { w }));
  T(S, 'ct', 1, 6.4, ['같은 프로그램(10⁹개 명령)을 두 CPU에서 돌리면', 'the same program (10⁹ instructions) on two CPUs'], 'arx-xs arx-a', 3);
  T(S, 'cx', 1, 7.6, 'X: 2 GHz, CPI 2.0', 'cz-mono arx-xs', 3); rect(S, 'bx', 9.6, 7.5, 15, 1, 'ok', 45, 3, { r: .2 }); T(S, 'cxv', 25, 7.6, '1.00 s', 'cz-mono arx-xs arx-g', 3);
  T(S, 'cy', 1, 9, 'Y: 3 GHz, CPI 3.5', 'cz-mono arx-xs', 3); rect(S, 'by', 9.6, 8.9, 17.5, 1, 'danger', 40, 3, { r: .2 }); T(S, 'cyv', 27.4, 9, '1.17 s', 'cz-mono arx-xs arx-r', 3);
  T(S, 'k1', 1, 10.6, ['클럭이 빠른 Y가 더 느려요 → GHz만으로는 비교할 수 없어요', 'Y has the faster clock yet is slower → GHz alone says little'], 'arx-xs arx-r', 4);
  T(S, 'k2', 1, 11.6, ['전력 벽: 클럭을 더 못 올려서 멀티코어와 IPC(= 1/CPI) 향상으로 갔어요', 'the power wall stopped clock growth, so designs turned to multicore and higher IPC (= 1/CPI)'], 'arx-xs', 4);
  fin(S, 'z', 13.2, [['CPU 시간 = 명령어 수 × CPI × 클럭 주기 (성능의 “철칙”)', 'CPU time = instruction count × CPI × clock period (the “iron law” of performance)', 'arx-xs arx-a'], ['세 요소가 서로 얽혀 있어요: 명령을 줄이는 ISA가 CPI를 키우기도 해요', 'the factors interact: an ISA that cuts instructions may raise CPI'], ['진짜 성능은 실제 작업을 끝내는 시간 → SPEC 같은 벤치마크로 재요', 'real performance is time to finish real work → measured with benchmarks like SPEC']]);
  S.cap(1, '성능 공식', 'The performance equation').cap(2, '각 요소를 좌우하는 것', 'What drives each factor').cap(3, '두 CPU 비교', 'Comparing two CPUs').cap(4, '클럭의 함정과 전력 벽', 'The clock trap and the power wall').cap(5, 'CPU 성능 식', 'The CPU performance equation');
  return S;
}
function sInstFmt() {
  const S = scene({ id: 'ar-instfmt', steps: 5, per: 1.6 });
  const K = .875, row = (k, y, F, st, c, vs) => { let x = 2.5; F.forEach(([n, b, v], i) => { const w = b * K; box2(S, `${k}${i}`, x, y, w - .08, 1.5, `${n} ${b}`, c, st, { pct: 25 }); if (v !== undefined) T(S, `${k}v${i}`, x, y + 1.65, v, 'cz-tc cz-mono arx-tiny', vs || st + 1, { w: w - .08 }); x += w; }); T(S, k + 'l', .7, y + .3, k.toUpperCase(), 'cz-mono arx-s arx-a', st); };
  T(S, 'ra', 2.5, .4, 'add $t0, $s1, $s2', 'cz-mono arx-xs arx-a', 1);
  row('r', 1.3, [['op', 6, '000000'], ['rs', 5, '10001'], ['rt', 5, '10010'], ['rd', 5, '01000'], ['shamt', 5, '00000'], ['funct', 6, '100000']], 1, 'accent');
  T(S, 'ia', 2.5, 5.2, 'lw $t0, 32($s3)', 'cz-mono arx-xs arx-w', 3);
  row('i', 6.1, [['op', 6, '100011'], ['rs', 5, '10011'], ['rt', 5, '01000'], ['immediate', 16, '0000 0000 0010 0000']], 3, 'warn', 3);
  T(S, 'ja', 2.5, 10, 'j 0x00400000', 'cz-mono arx-xs arx-g', 4);
  row('j', 10.9, [['op', 6], ['address', 26]], 4, 'ok');
  T(S, 'n2', 2.5, 4.4, ['레지스터 3개 연산: 레지스터 번호 5비트 × 3 + 함수 코드', 'three-register ops: three 5-bit register numbers + a function code'], 'arx-xs', 2);
  T(S, 'n4', 2.5, 12.8, ['RISC: 모든 명령이 32비트 → 해독이 단순하고 파이프라인에 유리 · x86은 1~15바이트 가변 길이', 'RISC: every instruction is 32 bits → simple decoding, pipeline-friendly · x86 spans 1–15 bytes'], 'arx-xs', 4);
  fin(S, 'z', 14.2, [['명령어 형식: 32비트를 연산 코드(op)와 피연산자 필드로 나눈 약속', 'an instruction format splits 32 bits into an opcode and operand fields', 'arx-xs arx-a'], ['R형은 레지스터끼리, I형은 상수·메모리 주소, J형은 점프 목적지를 담아요', 'R-type works on registers, I-type carries a constant or address offset, J-type a jump target'], ['RISC-V도 비슷한 형식(R/I/S/B/U/J)을 써요 · 어셈블러가 이 비트를 만들어요', 'RISC-V uses similar formats (R/I/S/B/U/J) · the assembler emits these bits']]);
  S.cap(1, 'R형: 레지스터 연산', 'R-type: register operations').cap(2, '필드에 값 채우기', 'Fill in the fields').cap(3, 'I형: 상수와 메모리', 'I-type: constants and memory').cap(4, 'J형과 고정 길이', 'J-type and fixed length').cap(5, '명령어 형식 (MIPS)', 'Instruction formats (MIPS)');
  return S;
}
function sAddr() {
  const S = scene({ id: 'ar-addr', steps: 5, per: 1.6 });
  const R = [[['즉시', 'immediate'], 'ADD R1, #5', ['상수 5', 'the constant 5'], 1], [['레지스터', 'register'], 'ADD R1, R2', 'R2 = 200', 1], [['직접', 'direct'], 'LOAD R1, [200]', 'M[200] = 42', 2], [['레지스터 간접', 'register indirect'], 'LOAD R1, [R2]', 'M[R2] = M[200] = 42', 2], [['베이스 + 오프셋', 'base + offset'], 'LOAD R1, 8(R3)', 'M[300 + 8] = 17', 3], [['PC 상대', 'PC-relative'], 'BEQ +12', 'PC + 12 = 1012', 4]];
  R.forEach(([n, c, r, st], i) => { const y = 1 + i * 1.5; box2(S, 'n' + i, 1, y, 5.6, 1.25, n, 'accent', st, { pct: 25 }); box2(S, 'c' + i, 6.8, y, 6.6, 1.25, c, 'line', st, { pct: 40 }); T(S, 'r' + i, 13.8, y + .25, r, 'cz-mono arx-xs', st); });
  T(S, 'rt', 23, .2, ['레지스터', 'registers'], 'arx-xs arx-a', 1); T(S, 'mt', 27.4, .2, ['메모리', 'memory'], 'arx-xs arx-a', 1);
  [['R1 = 7', 1], ['R2 = 200', 1], ['R3 = 300', 1], ['PC = 1000', 1]].forEach(([l], i) => box2(S, 'rg' + i, 23, 1 + i * 1.5, 4, 1.25, l, 'line', 1, { pct: 40 }));
  [['200: 42'], ['204: 9'], ['308: 17'], ['1012: …']].forEach(([l], i) => box2(S, 'mm' + i, 27.4, 1 + i * 1.5, 3.6, 1.25, l, 'line', 1, { pct: 40 }));
  tsets(S, 'rg1', [[2, 'warn', 40], [3, 'line', 40]]); tsets(S, 'mm0', [[2, 'warn', 40], [3, 'line', 40]]);
  tsets(S, 'rg2', [[3, 'ok', 45], [4, 'line', 40]]); tsets(S, 'mm2', [[3, 'ok', 45], [4, 'line', 40]]);
  tsets(S, 'rg3', [[4, 'accent', 35]]); tsets(S, 'mm3', [[4, 'accent', 35]]);
  stepT(S, 'k', 1, 10.4, [['피연산자가 명령어나 레지스터 안에 바로 있어요 (메모리 접근 없음)', 'the operand sits in the instruction or a register (no memory access)'], ['주소를 계산해 메모리를 한 번 읽어요 · [R2]는 C의 *p와 같아요', 'compute an address and read memory once · [R2] is C’s *p'], ['배열 a[i], 구조체 필드 p->x, 스택 변수(8(sp))가 이 방식', 'arrays a[i], struct fields p->x and stack slots (8(sp)) use this'], ['PC 상대: 어디에 올려도 동작하는 코드(PIC) · x86은 [base + index×4 + disp]까지 한 번에', 'PC-relative makes position-independent code · x86 even does [base + index×4 + disp]']], 'arx-xs arx-a');
  fin(S, 'z', 12.6, [['주소 지정 방식: 명령어가 피연산자를 어디서 찾는지 정하는 규칙', 'addressing modes define where an instruction finds its operands', 'arx-xs arx-a'], ['RISC는 몇 가지만(즉시·레지스터·베이스+오프셋), CISC는 복잡한 조합까지 지원해요', 'RISC keeps a few (immediate, register, base + offset); CISC supports elaborate combinations'], ['컴파일러는 변수 위치(레지스터·스택·전역)에 맞는 방식을 골라 코드를 만들어요', 'compilers pick modes to match where each variable lives (register, stack, global)']]);
  S.cap(1, '즉시와 레지스터', 'Immediate and register').cap(2, '직접과 간접', 'Direct and indirect').cap(3, '베이스 + 오프셋', 'Base plus offset').cap(4, 'PC 상대', 'PC-relative').cap(5, '주소 지정 방식', 'Addressing modes');
  return S;
}
function sDatapath() {
  const S = scene({ id: 'ar-datapath', steps: 5, per: 1.6 });
  T(S, 'ins', 1, .2, 'lw $t0, 32($s3)', 'cz-mono arx-s arx-a', 0);
  const B = [['pc', 1, 4, 2.6, 'PC'], ['im', 4.8, 4, 4.6, ['명령어 메모리', 'instr. memory']], ['rf', 11.4, 4, 5, ['레지스터 파일', 'register file']], ['alu', 18.8, 4, 3.4, 'ALU'], ['dm', 24.4, 4, 5, ['데이터 메모리', 'data memory']]];
  B.forEach(([k, x, y, w, l]) => box2(S, k, x, y, w, 3, l, 'line', 0, { pct: 40 }));
  box2(S, 'add4', 1, 1.2, 3.6, 1.3, 'PC + 4', 'line', 0, { pct: 40 }); box2(S, 'se', 14.4, 1.2, 3.8, 1.3, ['부호 확장', 'sign-extend'], 'line', 0, { pct: 40 });
  ar(S, 'a0', [2.3, 3.9], [2.3, 2.6], 'ink-3', 1, { h: .1 }); ar(S, 'a1', [3.7, 5.5], [4.7, 5.5], 'ink-3', 1, { h: .1 });
  ar(S, 'a2', [9.5, 5.5], [11.3, 5.5], 'ink-3', 2, { h: .1 }); elb(S, 'a3', [[9.5, 4.6], [10.4, 4.6], [10.4, 1.85], [14.3, 1.85]], 'ink-3', 2, { h: .1 });
  ar(S, 'a4', [16.5, 5.5], [18.7, 5.5], 'ink-3', 3, { h: .1 }); elb(S, 'a5', [[18.3, 1.85], [20.5, 1.85], [20.5, 3.9]], 'ink-3', 3, { h: .1 }); ar(S, 'a6', [22.3, 5.5], [24.3, 5.5], 'ink-3', 3, { h: .1 });
  elb(S, 'wb', [[26.9, 7.1], [26.9, 8.6], [13.9, 8.6], [13.9, 7.1]], 'ok', 4, { h: .12 }); T(S, 'wbl', 17, 8.75, ['쓰기 → $t0', 'write → $t0'], 'cz-mono arx-tiny arx-g', 4);
  tsets(S, 'pc', [[1, 'warn', 40], [2, 'line', 40]]); tsets(S, 'im', [[1, 'warn', 40], [2, 'line', 40]]); tsets(S, 'add4', [[1, 'warn', 40], [2, 'line', 40]]);
  tsets(S, 'rf', [[2, 'accent', 35], [3, 'line', 40], [4, 'ok', 45]]); tsets(S, 'se', [[2, 'accent', 35], [3, 'line', 40]]);
  tsets(S, 'alu', [[3, 'accent', 35], [4, 'line', 40]]); tsets(S, 'dm', [[3, 'accent', 35], [4, 'ok', 45]]);
  stepT(S, 'k', 1, 10, [['인출: PC가 가리키는 명령어를 읽고, 다음 PC = PC + 4', 'fetch: read the instruction at PC; next PC = PC + 4'], ['해독: $s3을 레지스터 파일에서 읽고, 32를 32비트로 부호 확장', 'decode: read $s3 from the register file; sign-extend 32 to 32 bits'], ['실행·메모리: ALU가 $s3 + 32로 주소 계산 → 데이터 메모리 읽기', 'execute/memory: the ALU computes $s3 + 32 → read data memory'], ['쓰기: 읽은 값을 $t0에 저장 · 제어 신호 RegWrite=1, ALUSrc=1, MemRead=1, MemToReg=1', 'write back: store the value in $t0 · control: RegWrite=1, ALUSrc=1, MemRead=1, MemToReg=1']], 'arx-xs arx-a');
  fin(S, 'z', 12, [['데이터패스: 명령어가 흘러가는 길(PC, 메모리, 레지스터, ALU)과 그 연결', 'the datapath is the route an instruction travels: PC, memories, registers, ALU and their wiring', 'arx-xs arx-a'], ['제어 유닛이 명령어 종류(op)에 따라 멀티플렉서와 쓰기 신호를 켜고 꺼요', 'the control unit sets multiplexers and write enables based on the opcode'], ['단일 사이클은 가장 긴 명령(lw)에 클럭을 맞춰야 해서 느려요 → 파이프라인으로 단계를 겹쳐요', 'a single-cycle design clocks at the slowest instruction (lw) → pipelining overlaps the stages']]);
  S.cap(1, '인출', 'Fetch').cap(2, '해독과 레지스터 읽기', 'Decode and read registers').cap(3, '주소 계산과 메모리 읽기', 'Address and memory read').cap(4, '레지스터에 쓰기', 'Write back').cap(5, '단일 사이클 데이터패스', 'A single-cycle datapath');
  return S;
}
function sOoo() {
  const S = scene({ id: 'ar-ooo', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 13, ['i1  LOAD r1, [a]', 'i2  ADD  r2, r1, 1', 'i3  MUL  r3, r4, r5', 'i4  SUB  r6, r7, 2'], [], {});
  T(S, 'm1', 1, 6.8, ['i1: 캐시 미스 → 오래 걸림', 'i1: cache miss → slow'], 'arx-xs arx-r', 1); T(S, 'm2', 1, 7.8, ['i2는 r1이 필요 → i1을 기다려야', 'i2 needs r1 → must wait for i1'], 'arx-xs arx-w', 1); T(S, 'm3', 1, 8.8, ['i3, i4는 상관없음', 'i3 and i4 are independent'], 'arx-xs arx-g', 1);
  const U = 1.5, X0 = 17.6, bar = (k, r, y, a, b, c, st) => { rect(S, k, X0 + a * U, y, (b - a) * U - .08, .95, c, 45, st, { r: .15 }); T(S, k + 'l', X0 - 2, y + .1, 'i' + r, 'cz-mono arx-xs', st); };
  T(S, 'it', 15.6, .2, ['순서대로 (in-order)', 'in-order'], 'arx-xs arx-a', 2);
  [[1, 0, 6, 'danger'], [2, 6, 7, 'accent'], [3, 7, 8, 'accent'], [4, 8, 9, 'accent']].forEach(([r, a, b, c], i) => bar('ib' + i, r, 1.2 + i * 1.15, a, b, c, 2));
  T(S, 'iT', X0 + 9 * U + .2, 4.7, '9', 'cz-mono arx-xs arx-r', 2);
  T(S, 'ot', 15.6, 6.2, ['비순차 (out-of-order)', 'out-of-order'], 'arx-xs arx-g', 3);
  [[1, 0, 6, 'danger'], [2, 6, 7, 'accent'], [3, 1, 2, 'ok'], [4, 2, 3, 'ok']].forEach(([r, a, b, c], i) => bar('ob' + i, r, 7.2 + i * 1.15, a, b, c, 3));
  T(S, 'oT', X0 + 7 * U + .2, 10.7, '7', 'cz-mono arx-xs arx-g', 3);
  T(S, 'rb', 1, 12, ['재정렬 버퍼(ROB): 실행은 뒤섞여도 결과 확정(retire)은 i1 → i4 순서대로', 'reorder buffer (ROB): execute out of order, retire i1 → i4 in order'], 'arx-xs arx-a', 4);
  T(S, 'rn', 1, 13, ['레지스터 리네이밍: 같은 r3를 다시 쓰는 명령은 물리 레지스터 p7로 → 가짜 의존 제거', 'register renaming: a later write to r3 gets physical p7 → false dependencies vanish'], 'arx-xs', 4);
  fin(S, 'z', 14.4, [['비순차 실행: 피연산자가 준비된 명령부터 실행해 멈춤(스톨) 시간을 메워요', 'out-of-order execution runs whichever instructions have their operands ready, filling stall time', 'arx-xs arx-a'], ['토마술로 알고리즘 · 예약 스테이션 · ROB로 구현하고, 결과는 순서대로 확정해 정확한 예외를 지켜요', 'built from Tomasulo-style reservation stations and a ROB; in-order retirement keeps exceptions precise'], ['현대 x86·ARM 고성능 코어는 수백 개 명령을 동시에 들고 있어요 (Spectre류 취약점의 배경)', 'modern high-end cores keep hundreds of instructions in flight (the backdrop to Spectre-style attacks)']]);
  S.cap(1, '의존 관계 보기', 'Spot the dependencies').cap(2, '순서대로면 다 같이 대기', 'In order: everyone waits').cap(3, '준비된 것부터 실행', 'Run whatever is ready').cap(4, '순서대로 확정', 'Retire in order').cap(5, '비순차 실행', 'Out-of-order execution');
  return S;
}
function sSimd() {
  const S = scene({ id: 'ar-simd', steps: 5, per: 1.6 });
  const X = i => 1 + i * 2.4;
  [['a', 1.2, i => i + 1], ['b', 2.6, i => (i + 1) * 10], ['c', 4.4, i => (i + 1) * 11]].forEach(([k, y, f], r) => { for (let i = 0; i < 8; i++) box2(S, `${k}${i}`, X(i), y, 2.2, 1.2, String(f(i)), r === 2 ? 'ok' : 'accent', r === 2 ? 1 : 0, { pct: r === 2 ? 35 : 22 }); T(S, k + 'l', 20.4, y + .2, `${k}[ ]`, 'cz-mono arx-xs', r === 2 ? 1 : 0); });
  hl(S, 'eqln', 1, 19.6, 4.05, 'ink-3', 0, { w: .06 });
  for (let i = 0; i < 8; i++) box2(S, 'sc' + i, X(i), 6.2, 2.2, 1, 'ADD', 'warn', 1, { pct: 35 });
  T(S, 'scl', 20.4, 6.3, ['스칼라: 명령 8번', 'scalar: 8 instructions'], 'arx-xs arx-w', 1);
  frame(S, 'f0', .85, 1.05, 9.7, 4.75, 'ok', 2, { w: .14, r: .3 }); frame(S, 'f1', 10.45, 1.05, 9.7, 4.75, 'ok', 2, { w: .14, r: .3 });
  box2(S, 'v0', 1, 7.6, 9.4, 1, 'VADDPS (4 lanes)', 'ok', 2, { pct: 40 }); box2(S, 'v1', 10.6, 7.6, 9.4, 1, 'VADDPS (4 lanes)', 'ok', 2, { pct: 40 });
  T(S, 'vl', 20.4, 7.7, ['SIMD: 명령 2번', 'SIMD: 2 instructions'], 'arx-xs arx-g', 2);
  T(S, 'rl', 22.4, 1.4, ['128비트 레지스터 =', 'a 128-bit register ='], 'arx-xs', 2); T(S, 'rl2', 22.4, 2.4, ['float 4개', '4 floats'], 'arx-xs', 2);
  code(S, 'cd', 1, 9.2, 30, ['__m128 va = _mm_load_ps(a), vb = _mm_load_ps(b);', ['_mm_store_ps(c, _mm_add_ps(va, vb));      // 4개를 한 번에', '_mm_store_ps(c, _mm_add_ps(va, vb));      // four at once']], [], { st: 3 });
  T(S, 'av', 1, 12.4, ['보통은 컴파일러 자동 벡터화(-O3)에 맡겨요: 연속 메모리 · 분기 없는 루프일수록 잘 돼요', 'usually left to compiler auto-vectorization (-O3): contiguous data and branch-free loops help'], 'arx-xs arx-a', 3);
  T(S, 'us', 1, 13.4, ['SSE 128 · AVX2 256 · AVX-512 · ARM NEON/SVE — 이미지 처리, simdjson, ML 추론, 코덱', 'SSE 128 · AVX2 256 · AVX-512 · ARM NEON/SVE — image processing, simdjson, ML inference, codecs'], 'arx-xs', 4);
  fin(S, 'z', 14.8, [['SIMD: 명령 하나로 여러 데이터(레인)를 동시에 처리해요 (Single Instruction, Multiple Data)', 'SIMD processes several data lanes with one instruction (single instruction, multiple data)', 'arx-xs arx-a'], ['GPU의 SIMT는 같은 생각을 수천 스레드로 확장한 것이에요', 'a GPU’s SIMT stretches the same idea across thousands of threads']]);
  S.cap(1, '하나씩 더하기', 'One add at a time').cap(2, '레인 4개를 한 번에', 'Four lanes at once').cap(3, '코드로 보면', 'In code').cap(4, '어디에 쓰나', 'Where it’s used').cap(5, 'SIMD 벡터 명령', 'SIMD vector instructions');
  return S;
}

/* ================= memory ================= */
function sCacheMap() {
  const S = scene({ id: 'ar-cachemap', steps: 5, per: 1.6 });
  [['tag', 19, 'accent'], ['index', 4, 'warn'], ['offset', 6, 'ok']].reduce((x, [n, b, c], i) => { const w = b * .9; box2(S, 'af' + i, x, .8, w - .08, 1.4, `${n} (${b})`, c, 1, { pct: 30 }); return x + w; }, 1.4);
  T(S, 'an', 1.4, 2.4, ['주소 = 태그 | 인덱스(몇 번 줄) | 오프셋(줄 안 위치, 64B → 6비트)', 'address = tag | index (which line) | offset (within a 64 B line → 6 bits)'], 'arx-xs', 1);
  T(S, 'dt', 1, 3.8, ['직접 사상 (8줄)', 'direct-mapped (8 lines)'], 'arx-xs arx-a', 2);
  for (let i = 0; i < 8; i++) { box2(S, 'd' + i, 1, 4.8 + i * 1.1, 8, .98, i === 0 ? ['줄 0: 블록 0 ↔ 8', 'line 0: block 0 ↔ 8'] : 'line ' + i, i === 0 ? 'danger' : 'line', 2, { pct: i === 0 ? 35 : 40 }); }
  T(S, 'dx', 1, 13.7, ['0,8,0,8 → 4번 다 미스 ✗', '0,8,0,8 → 4 misses ✗'], 'arx-xs arx-r', 2);
  T(S, 'st', 11.4, 3.8, ['2-way 집합 연관 (4집합)', '2-way set associative (4 sets)'], 'arx-xs arx-a', 3);
  for (let s = 0; s < 4; s++) for (let w = 0; w < 2; w++) box2(S, `s${s}_${w}`, 11.4 + w * 4.2, 4.8 + s * 2.2, 4, 2, s === 0 ? (w ? ['블록 8', 'block 8'] : ['블록 0', 'block 0']) : `set ${s}`, s === 0 ? 'ok' : 'line', 3, { pct: s === 0 ? 40 : 40 });
  T(S, 'sx', 11.4, 13.7, ['집합 0에 둘 다: 미스 2번 ✓', 'both in set 0: 2 misses ✓'], 'arx-xs arx-g', 3);
  T(S, 'ft', 21.4, 3.8, ['완전 연관', 'fully associative'], 'arx-xs arx-a', 4);
  for (let i = 0; i < 8; i++) box2(S, 'f' + i, 21.4 + (i % 2) * 4.8, 4.8 + Math.floor(i / 2) * 2.2, 4.6, 2, i === 3 ? ['블록 0', 'block 0'] : i === 6 ? ['블록 8', 'block 8'] : '', i === 3 || i === 6 ? 'ok' : 'line', 4, { pct: 40 });
  T(S, 'fx', 21.4, 13.7, ['어디든 OK · 태그 전부 비교', 'anywhere · compare all tags'], 'arx-xs', 4);
  fin(S, 'z', 15, [['n-way 연관도가 높을수록 충돌 미스 ↓, 대신 비교기·전력·지연 ↑', 'more ways cut conflict misses but cost comparators, power and latency', 'arx-xs arx-a'], ['실제 L1은 보통 8-way, 미스의 3C: 처음(compulsory)·용량(capacity)·충돌(conflict)', 'real L1 caches are typically 8-way · the 3 Cs of misses: compulsory, capacity, conflict'], ['같은 간격(2의 거듭제곱 스트라이드)으로 뛰는 배열 접근이 충돌 미스를 부르기 쉬워요', 'power-of-two strides through arrays are a classic cause of conflict misses']]);
  S.cap(1, '주소를 세 부분으로', 'Split the address in three').cap(2, '직접 사상: 충돌', 'Direct-mapped: conflicts').cap(3, '집합 연관: 공존', 'Set associative: they coexist').cap(4, '완전 연관', 'Fully associative').cap(5, '캐시 매핑 방식', 'Cache mapping');
  return S;
}
function sWritePol() {
  const S = scene({ id: 'ar-writepol', steps: 5, per: 1.6 });
  const panel = (p, x, title, c, st, cache, mem, memc) => { T(S, p + 't', x, .2, title, 'arx-s arx-' + c, st); box2(S, p + 'cpu', x + 2.5, 1.3, 9, 1.4, ['CPU: x = 1, 2, 3 쓰기', 'CPU: write x = 1, 2, 3'], 'line', st, { pct: 40 }); ar(S, p + 'a1', [x + 7, 2.8], [x + 7, 4], 'ink-3', st, { h: .1 }); box2(S, p + 'ca', x + 2.5, 4.1, 9, 1.6, cache, 'accent', st, { pct: 30 }); box2(S, p + 'me', x + 2.5, 7.4, 9, 1.6, mem, memc, st, { pct: 30 }); };
  panel('t', 1, ['라이트 스루 (write-through)', 'write-through'], 'a', 1, ['캐시 x = 3', 'cache x = 3'], ['메모리 x = 3 (항상 최신)', 'memory x = 3 (always current)'], 'ok');
  ar(S, 'ta2', [8, 5.8], [8, 7.3], 'warn', 1, { h: .12 }); T(S, 'tw', 8.4, 6.15, ['쓸 때마다 ×3', '×3, every write'], 'arx-xs arx-w', 1);
  T(S, 'tn', 1, 9.4, ['단순하고 일관적이지만 메모리 쓰기가 많아요', 'simple and consistent, but many memory writes'], 'arx-xs', 2);
  panel('b', 16.5, ['라이트 백 (write-back)', 'write-back'], 'g', 3, ['캐시 x = 3 · D = 1 (더러움)', 'cache x = 3 · D = 1 (dirty)'], ['메모리 x = 0 (옛 값)', 'memory x = 0 (stale)'], 'line');
  ar(S, 'ba2', [23.5, 5.8], [23.5, 7.3], 'ok', 3, { h: .12, dash: 1 }); T(S, 'bw', 23.9, 6.15, ['쫓겨날 때 1번만', 'once, on eviction'], 'arx-xs arx-g', 3);
  T(S, 'bn', 16.5, 9.4, ['쓰기 3번이 캐시에서 끝나요 · 대신 메모리가 잠시 낡아요', 'three writes stay in cache · memory is briefly stale'], 'arx-xs', 3);
  T(S, 'k1', 1, 11, ['쓰기 할당(write-allocate): 쓰기 미스면 라인을 가져와서 써요 (보통 라이트 백과 짝)', 'write-allocate: on a write miss, fetch the line then write (usually paired with write-back)'], 'arx-xs arx-a', 4);
  T(S, 'k2', 1, 12, ['쓰기 버퍼: 라이트 스루의 메모리 쓰기를 모아 CPU가 기다리지 않게 해요', 'a write buffer queues write-through traffic so the CPU doesn’t wait'], 'arx-xs', 4);
  T(S, 'k3', 1, 13, ['다른 코어·DMA가 최신 값을 보려면 캐시 일관성 프로토콜이 필요해요', 'other cores and DMA need a coherence protocol to see the latest value'], 'arx-xs', 4);
  fin(S, 'z', 14.4, [['라이트 스루: 캐시와 메모리를 함께 갱신 · 라이트 백: 캐시만 갱신하고 더티 비트로 표시', 'write-through updates cache and memory together; write-back updates the cache and marks it dirty', 'arx-xs arx-a'], ['현대 CPU의 L1·L2·L3는 대부분 라이트 백이에요 (메모리 대역폭이 귀하니까)', 'modern L1/L2/L3 caches are mostly write-back, since memory bandwidth is precious'], ['같은 선택이 디스크 캐시, CDN, 애플리케이션 캐시(write-behind)에도 나와요', 'the same choice reappears in disk caches, CDNs and application caches (write-behind)']]);
  S.cap(1, '라이트 스루', 'Write-through').cap(2, '쓰기마다 메모리로', 'Memory on every write').cap(3, '라이트 백과 더티 비트', 'Write-back and the dirty bit').cap(4, '할당 정책과 쓰기 버퍼', 'Allocation and write buffers').cap(5, '캐시 쓰기 정책', 'Cache write policies');
  return S;
}
function sCoherence() {
  const S = scene({ id: 'ar-coherence', steps: 5, per: 1.6 });
  box2(S, 'c1', 2, .8, 9, 1.4, 'Core 1', 'accent', 0, { pct: 30 }); box2(S, 'c2', 21, .8, 9, 1.4, 'Core 2', 'accent', 0, { pct: 30 });
  box2(S, 'l1', 2, 3, 9, 1.8, '', 'line', 0, { pct: 40 }); box2(S, 'l2', 21, 3, 9, 1.8, '', 'line', 0, { pct: 40 });
  T(S, 'l1h', 2.3, 3.1, ['캐시', 'cache'], 'arx-tiny', 0); T(S, 'l2h', 21.3, 3.1, ['캐시', 'cache'], 'arx-tiny', 0);
  hl(S, 'bus', 1, 31, 6.4, 'ink-3', 0, { w: .14 }); T(S, 'busl', 1, 6.7, ['버스', 'bus'], 'arx-tiny', 0);
  seg(S, 'v1', [6.5, 4.9], [6.5, 6.35], 0, 'ink-3', .08); seg(S, 'v2', [25.5, 4.9], [25.5, 6.35], 0, 'ink-3', .08); seg(S, 'v3', [16, 6.45], [16, 7.6], 0, 'ink-3', .08);
  box2(S, 'mem', 12, 7.7, 8, 1.4, '', 'line', 0, { pct: 40 });
  const C1 = ['x = 0 · E', 'x = 0 · S', 'x = 1 · M', 'x = 1 · S'], C2 = ['—  (I)', 'x = 0 · S', 'x = 0 · I', 'x = 1 · S'], M = ['x = 0', 'x = 0', ['x = 0 (낡음)', 'x = 0 (stale)'], 'x = 1'];
  C1.forEach((t, i) => { T(S, 'a' + i, 2, 3.75, t, 'cz-tc cz-mono arx-s', i + 1, { w: 9, off: i < 3 ? i + 2 : 0 }); tsets(S, 'l1', [[i + 1, ['ok', 'accent', 'warn', 'accent'][i], 40]]); });
  C2.forEach((t, i) => { T(S, 'b' + i, 21, 3.75, t, 'cz-tc cz-mono arx-s', i + 1, { w: 9, off: i < 3 ? i + 2 : 0 }); tsets(S, 'l2', [[i + 1, ['line', 'accent', 'danger', 'accent'][i], 40]]); });
  M.forEach((t, i) => T(S, 'm' + i, 12, 8.05, t, 'cz-tc cz-mono arx-xs', i + 1, { w: 8, off: i < 3 ? i + 2 : 0 }));
  stepT(S, 'e', 1, 10.2, [['① Core 1이 x를 읽음 → 아무도 없으니 E(독점)', '① Core 1 reads x → nobody else has it: E (exclusive)'], ['② Core 2도 읽음 → 둘 다 S(공유)', '② Core 2 reads too → both S (shared)'], ['③ Core 1이 x = 1 쓰기 → 무효화 신호 → Core 2는 I, Core 1은 M', '③ Core 1 writes x = 1 → invalidate → Core 2 goes I, Core 1 M'], ['④ Core 2가 다시 읽음 → Core 1이 값을 넘기고 메모리도 갱신 → 둘 다 S', '④ Core 2 reads again → Core 1 supplies the data, memory updates → both S']], 'arx-xs arx-a');
  T(S, 'lg', 1, 11.6, ['M 수정됨(나만, 메모리와 다름) · E 독점(나만, 깨끗) · S 공유(읽기 전용) · I 무효', 'M modified (only me, differs from memory) · E exclusive (only me, clean) · S shared (read-only) · I invalid'], 'arx-xs', 1);
  fin(S, 'z', 13.2, [['캐시 일관성: 코어마다 캐시가 있어도 같은 주소는 같은 값으로 보이게 하는 규칙', 'cache coherence makes every core see one value per address despite private caches', 'arx-xs arx-a'], ['MESI: 쓰기 전에 다른 복사본을 무효화해요 (스누핑 또는 디렉터리 방식)', 'MESI invalidates other copies before a write (via snooping or a directory)'], ['같은 라인을 여러 코어가 번갈아 쓰면 무효화가 오가며 느려져요 → 거짓 공유', 'cores taking turns writing one line bounce invalidations back and forth → false sharing']]);
  S.cap(1, '혼자 읽으면 E', 'Read alone: E').cap(2, '같이 읽으면 S', 'Read together: S').cap(3, '쓰면 남의 복사본은 I', 'A write invalidates others').cap(4, '다시 읽으면 S', 'Read again: S').cap(5, '캐시 일관성 (MESI)', 'Cache coherence (MESI)');
  return S;
}

/* ================= I/O & storage ================= */
function sRaid() {
  const S = scene({ id: 'ar-raid', steps: 5, per: 1.6 });
  const disk = (k, x, y, blocks, st, o = {}) => { frame(S, k, x - .15, y - .25, 3.4, blocks.length * 1.15 + .4, 'ink-3', st, { w: .1, r: .5 }); blocks.forEach((b, i) => box2(S, `${k}_${i}`, x, y + i * 1.15, 3.1, 1, b, /p$/.test(b) ? 'warn' : (o.c || 'accent'), st, { pct: 30 })); };
  T(S, 'r0', 1, 1, ['RAID 0', 'RAID 0'], 'arx-s arx-a', 1); T(S, 'r0s', 1, 2, ['스트라이핑', 'striping'], 'arx-tiny', 1);
  for (let d = 0; d < 4; d++) disk('a' + d, 6 + d * 3.8, .9, ['A' + (d + 1), 'B' + (d + 1)], 1);
  T(S, 'r0t', 22, 1, ['속도 ×4 · 용량 100%', 'speed ×4 · 100% capacity'], 'arx-xs arx-g', 1); T(S, 'r0u', 22, 2, ['한 개 고장 = 전부 손실', 'one failure = total loss'], 'arx-xs arx-r', 1);
  T(S, 'r1', 1, 4.9, ['RAID 1', 'RAID 1'], 'arx-s arx-a', 2); T(S, 'r1s', 1, 5.9, ['미러링', 'mirroring'], 'arx-tiny', 2);
  for (let d = 0; d < 2; d++) disk('b' + d, 6 + d * 3.8, 4.8, ['A1', 'A2'], 2, { c: 'ok' });
  T(S, 'r1t', 22, 4.9, ['읽기 ×2 · 용량 50%', 'reads ×2 · 50% capacity'], 'arx-xs arx-g', 2); T(S, 'r1u', 22, 5.9, ['한 개 고장 나도 OK', 'survives one failure'], 'arx-xs arx-g', 2);
  T(S, 'r5', 1, 8.9, ['RAID 5', 'RAID 5'], 'arx-s arx-a', 3); T(S, 'r5s', 1, 9.9, ['분산 패리티', 'distributed parity'], 'arx-tiny', 3);
  const R5 = [['A1', 'B1', 'C1'], ['A2', 'B2', 'Cp'], ['A3', 'Bp', 'C2'], ['Ap', 'B3', 'C3']];
  R5.forEach((bl, d) => disk('c' + d, 6 + d * 3.8, 8.8, bl, 3));
  T(S, 'r5t', 22, 8.9, ['용량 (n−1)/n = 75%', '(n−1)/n = 75% capacity'], 'arx-xs arx-g', 3); T(S, 'r5u', 22, 9.9, ['패리티를 돌아가며 저장', 'parity rotates across disks'], 'arx-xs', 3);
  ['c2', 'c2_0', 'c2_1', 'c2_2'].forEach(k => S.set(k, 4, { opacity: '.25' })); xm(S, 'xx', 15.2, 10.6, 4);
  T(S, 'rb', 22, 11.1, 'A3 = A1 ⊕ A2 ⊕ Ap', 'cz-mono arx-xs arx-r', 4); T(S, 'rb2', 22, 12.1, ['나머지로 다시 계산해 복구', 'rebuilt from the others'], 'arx-xs arx-g', 4);
  fin(S, 'z', 13.6, [['RAID: 여러 디스크를 묶어 속도(스트라이핑)와 안전(중복·패리티)을 얻어요', 'RAID combines disks for speed (striping) and safety (mirroring, parity)', 'arx-xs arx-a'], ['RAID 6은 패리티 2개(2개 고장까지), RAID 10은 미러 + 스트라이프', 'RAID 6 keeps two parities (survives two failures); RAID 10 stripes across mirrors'], ['RAID는 백업이 아니에요: 실수로 지운 파일, 랜섬웨어는 그대로 복제돼요', 'RAID is not a backup: accidental deletes and ransomware are faithfully replicated']]);
  S.cap(1, 'RAID 0: 나눠 쓰기', 'RAID 0: striping').cap(2, 'RAID 1: 똑같이 쓰기', 'RAID 1: mirroring').cap(3, 'RAID 5: 패리티 분산', 'RAID 5: distributed parity').cap(4, '디스크 고장과 복구', 'A failed disk, rebuilt').cap(5, 'RAID', 'RAID');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'arx-xs', i + 1, { off: i + 2 }));
function sMcArch() {
  const S = scene({ id: 'ar-mcarch', steps: 5, per: 1.7 });
  const CX = i => 1.0 + i * 4.6, CW = 4.0;
  rect(S, 'die', .5, .3, 18.9, 13.0, 'ink', 4, 0, { r: .6 });
  for (let i = 0; i < 4; i++) {
    const x = CX(i);
    box2(S, 'c' + i, x, .8, CW, 2.2, `Core ${i}`, 'accent', 0, { pct: 22, css: 'align-items:start;padding-top:.3em' });
    cell(S, 'l1i' + i, x, 3.3, 1.9, 1.0, 'L1i', 'accent', 12, 1); cell(S, 'l1d' + i, x + 2.1, 3.3, 1.9, 1.0, 'L1d', 'accent', 12, 1);
    cell(S, 'l2' + i, x, 4.6, CW, 1.1, 'L2', 'ok', 14, 1);
    vl(S, 'v' + i, x + CW / 2, 5.7, 7.6, 'ink-3', 2, { w: .1 });
    cell(S, 'l3' + i, x + .3, 8.3, CW - .6, 1.2, ['L3 조각', 'L3 slice'], 'warn', 16, 2);
  }
  frame(S, 'ring', .9, 7.6, 17.9, 2.6, 'ink-3', 2, { r: 1.3, w: .14 });
  T(S, 'rl', 1.3, 10.4, ['링 연결망', 'ring interconnect'], 'arx-xs', 2);
  vl(S, 'mv', 9.85, 10.2, 11.4, 'ink-3', 2, { w: .1 }); cell(S, 'mc', 6.6, 11.4, 6.5, 1.2, ['메모리 컨트롤러 → DRAM', 'memory controller → DRAM'], 'line', 16, 2);
  [['T0', 'T1'], ['T0', 'T1'], ['T0'], ['T0']].forEach((ts, i) => ts.forEach((t, j) => cell(S, `t${i}${j}`, CX(i) + .3 + j * 1.8, 2.0, 1.6, .8, t, i < 2 ? 'accent' : 'warn', 34, 4)));
  ['c2', 'c3'].forEach(k => tsets(S, k, [[4, 'warn', 22]]));
  T(S, 'pl', CX(0), .0, ['P코어', 'P-cores'], 'arx-xs arx-a', 4); T(S, 'el', CX(2), .0, ['E코어', 'E-cores'], 'arx-xs arx-w', 4);
  ar(S, 'w0', [CX(0) + 3.05, 4.3], [CX(0) + 3.05, 7.7], 'danger', 3, { h: .12, off: 4 });
  hl(S, 'w1', CX(0) + 3.05, CX(2) + 3.05, 7.6, 'danger', 3, { w: .16, off: 4 });
  ar(S, 'w2', [CX(2) + 3.05, 7.6], [CX(2) + 3.05, 4.35], 'danger', 3, { h: .12, off: 4 });
  tsets(S, 'l1d2', [[3, 'danger', 40], [4, 'accent', 12]]);
  T(S, 'wl', CX(0) + 3.4, 5.9, ['x에 쓰기', 'write x'], 'arx-xs arx-r', 3, { off: 4 });
  const R = 20.4;
  T(S, 'r1', R, .8, ['코어마다 전용', 'private per core'], 'arx-s arx-a', 1, { off: 2 });
  T(S, 'r1b', R, 2.1, ['L1 명령·데이터 각 32~64 KB', 'L1 instr + data, 32–64 KB each'], 'arx-xs', 1, { off: 2 });
  T(S, 'r1c', R, 3.1, ['L2 1~2 MB', 'L2, 1–2 MB'], 'arx-xs', 1, { off: 2 });
  T(S, 'r2', R, .8, ['접근 지연 (대략)', 'access latency (roughly)'], 'arx-s arx-a', 2, { off: 3 });
  [['L1', '4 사이클', '4 cycles'], ['L2', '14 사이클', '14 cycles'], ['L3', '50 사이클', '50 cycles'], ['DRAM', '250+ 사이클', '250+ cycles']].forEach(([a, b, c], i) => { T(S, 'la' + i, R, 2.2 + i * 1.1, a, 'cz-mono arx-xs', 2, { off: 3 }); T(S, 'lb' + i, R + 3.4, 2.2 + i * 1.1, [b, c], 'cz-mono arx-xs ' + (i === 3 ? 'arx-r' : 'arx-g'), 2, { off: 3 }); });
  T(S, 'r2f', R, 6.8, ['L3는 모든 코어가 나눠 써요', 'every core shares the L3'], 'arx-xs', 2, { off: 3 });
  T(S, 'r3', R, .8, ['같은 줄을 가진 다른 코어', 'other cores holding the line'], 'arx-xs arx-r', 3, { off: 4 });
  T(S, 'r3b', R, 1.9, ['→ 링으로 무효화 메시지', '→ invalidated over the ring'], 'arx-xs', 3, { off: 4 });
  T(S, 'r3c', R, 3.0, ['MESI 같은 일관성 프로토콜', 'a coherence protocol such as MESI'], 'arx-xs arx-a', 3, { off: 4 });
  T(S, 'r4', R, .8, ['SMT: 코어 하나에 스레드 2개', 'SMT: two threads per core'], 'arx-xs arx-a', 4);
  T(S, 'r4b', R, 1.9, ['놀던 실행 유닛을 채워 +15~30%', 'fills idle units: +15–30%'], 'arx-xs', 4);
  T(S, 'r4c', R, 3.4, ['P코어: 크고 빠름', 'P-cores: big and fast'], 'arx-xs arx-a', 4);
  T(S, 'r4d', R, 4.5, ['E코어: 작고 전력 효율적', 'E-cores: small and frugal'], 'arx-xs arx-w', 4);
  notesSplit(S, 'k', 15.6, [['멀티코어 칩에는 독립된 코어가 여러 개 · 각 코어는 자기만 쓰는 L1과 L2 캐시를 가져요', 'a multicore chip holds several independent cores, each with its own private L1 and L2 caches'], ['큰 L3는 조각으로 나뉘어 링(또는 메시)으로 이어져 모든 코어가 함께 써요 · 아래로 갈수록 느려요', 'a large L3 is split into slices on a ring (or mesh) that all cores share · each level down is slower'], ['한 코어가 쓰면, 같은 줄을 가진 다른 코어의 복사본을 연결망으로 무효화해 값을 맞춰요', 'when one core writes, copies of that line in other cores are invalidated over the interconnect'], ['코어 하나가 스레드 둘을 번갈아 돌리기도(SMT) 하고, 크고 빠른 코어와 작은 코어를 섞기도 해요', 'a core may run two threads at once (SMT), and chips mix big fast cores with small efficient ones']]);
  fin(S, 'z', 15.6, [['멀티코어 칩: 전용 L1·L2를 가진 코어들 + 공유 L3 + 이들을 잇는 연결망', 'a multicore chip: cores with private L1/L2, a shared L3 and the interconnect between them', 'arx-xs arx-a'], ['코어가 수십 개면 링 대신 메시를 쓰고, AMD는 여러 칩렛을 한 패키지로 묶어요', 'with dozens of cores a mesh replaces the ring, and AMD packages several chiplets together'], ['멀리 있는 L3 조각과 메모리는 더 느려서 OS가 스레드를 가까운 코어에 배치해요(NUMA)', 'distant L3 slices and memory are slower, so the OS places threads near their data (NUMA)']]);
  S.cap(1, '코어마다 전용 캐시', 'Private caches per core').cap(2, '함께 쓰는 L3와 연결망', 'A shared L3 and interconnect').cap(3, '코어 사이의 일관성', 'Coherence between cores').cap(4, 'SMT와 P·E 코어', 'SMT and P/E cores').cap(5, '멀티코어 프로세서 구조', 'Multicore processor design');
  return S;
}

return { css: CSSX, secs: [], add: {
  'ar-data': [
    item('ar-mult', '곱셈과 나눗셈 하드웨어', 'Multiplication and division hardware', '2진 곱셈은 곱하는 수의 비트마다 “1이면 시프트해서 더하기”를 반복하는 세로 곱셈이에요. 나눗셈은 시프트와 빼기의 반복이에요.', '1011(11) × 1101(13)은 비트 0, 2, 3이 1이라 1011을 0, 2, 3칸 시프트한 부분곱을 더해 10001111(143)이 돼요. 하드웨어는 시프트 레지스터와 가산기를 반복 사용하거나, 부스 인코딩(연속된 1을 빼기 한 번으로)과 월리스 트리(부분곱 병렬 덧셈)로 빠르게 해요. 나눗셈은 훨씬 느려서, 컴파일러는 x * 10을 (x << 3) + (x << 1)로, 상수 나눗셈을 곱셈으로 바꿔요.', 'Binary multiplication is long multiplication: for each multiplier bit, shift and add if it is 1. Division repeats shift-and-subtract.', '1011 (11) × 1101 (13) has bits 0, 2 and 3 set, so adding 1011 shifted by 0, 2 and 3 gives 10001111 (143). Hardware loops a shift register and an adder, or speeds things up with Booth encoding (a run of 1s becomes one subtract) and Wallace trees (adding partial products in parallel). Division is much slower, so compilers rewrite x * 10 as (x << 3) + (x << 1) and constant divides as multiplies.', sMult()),
    item('ar-hamming', '해밍 코드와 ECC', 'Hamming codes and ECC', '패리티 비트 몇 개를 정해진 자리에 끼워 넣어, 1비트 오류가 어디서 났는지 찾아 고칠 수 있게 하는 부호예요.', '해밍(7,4)은 1, 2, 4번 자리에 패리티를 두고, p1은 1·3·5·7번, p2는 2·3·6·7번, p4는 4·5·6·7번 자리의 짝수 패리티를 맞춰요. 데이터 1011은 0110011이 되고, 6번 비트가 뒤집히면 p2와 p4 검사가 실패해 신드롬 110₂ = 6이 오류 위치를 가리켜요. 서버의 ECC 메모리, SSD, 통신에서 쓰이고, 전체 패리티 비트를 하나 더하면 2비트 오류도 검출해요(SECDED).', 'A code that inserts a few parity bits at fixed positions so a single flipped bit can be located and corrected.', 'Hamming(7,4) puts parity at positions 1, 2 and 4: p1 covers 1·3·5·7, p2 covers 2·3·6·7 and p4 covers 4·5·6·7, each with even parity. Data 1011 becomes 0110011; if bit 6 flips, the p2 and p4 checks fail and the syndrome 110₂ = 6 points at the error. It is used in ECC server memory, SSDs and links, and one extra overall parity bit adds double-error detection (SECDED).', sHamming())
  ],
  'ar-cpu': [
    item('ar-perf', 'CPU 성능 식', 'The CPU performance equation', 'CPU 시간 = 명령어 수 × 명령당 사이클(CPI) × 클럭 주기. 셋 중 하나만 보고 성능을 판단하면 틀려요.', '10⁹개 명령, CPI 2, 2 GHz면 1초예요. 명령어 수는 알고리즘·컴파일러·ISA가, CPI는 파이프라인·캐시 미스·분기 예측이, 클럭은 공정과 전력이 좌우해요. 3 GHz지만 CPI 3.5인 CPU는 2 GHz·CPI 2인 CPU보다 느려요(1.17초 vs 1초). 전력 벽으로 클럭 상승이 멈추자 설계는 멀티코어와 IPC 향상으로 방향을 틀었어요.', 'CPU time = instruction count × cycles per instruction (CPI) × clock period. Judging performance by one factor alone misleads.', '10⁹ instructions at CPI 2 on a 2 GHz clock take 1 s. Instruction count depends on the algorithm, compiler and ISA; CPI on the pipeline, cache misses and branch prediction; the clock on process and power. A 3 GHz CPU with CPI 3.5 loses to a 2 GHz one with CPI 2 (1.17 s vs 1 s). When the power wall halted clock growth, designs turned to multicore and higher IPC.', sPerf()),
    item('ar-instfmt', '명령어 형식 (MIPS)', 'Instruction formats (MIPS)', '32비트 명령어를 연산 코드(op)와 레지스터·상수·주소 필드로 나눈 약속이에요. MIPS는 R, I, J 세 형식을 써요.', 'R형은 op 6 · rs 5 · rt 5 · rd 5 · shamt 5 · funct 6비트로, add $t0, $s1, $s2 같은 레지스터 연산을 담아요. I형은 16비트 상수를 담아 lw $t0, 32($s3) 같은 메모리 접근과 즉시 연산에, J형은 26비트 주소로 점프에 써요. RISC는 길이가 고정이라 해독이 단순하고 파이프라인에 유리하고, x86은 1~15바이트 가변 길이예요. RISC-V도 비슷한 형식을 써요.', 'A convention splitting a 32-bit instruction into an opcode and register, constant or address fields. MIPS uses three formats: R, I and J.', 'R-type is op 6 · rs 5 · rt 5 · rd 5 · shamt 5 · funct 6 bits and holds register operations like add $t0, $s1, $s2. I-type carries a 16-bit constant for memory access and immediates such as lw $t0, 32($s3), and J-type a 26-bit jump address. Fixed length keeps RISC decoding simple and pipeline-friendly, while x86 instructions span 1–15 bytes. RISC-V uses similar formats.', sInstFmt()),
    item('ar-addr', '주소 지정 방식', 'Addressing modes', '명령어가 피연산자를 어디서 찾는지 정하는 규칙이에요. 즉시, 레지스터, 직접, 간접, 베이스 + 오프셋, PC 상대 등이 있어요.', '즉시(#5)와 레지스터(R2)는 메모리에 가지 않고, 직접([200])과 레지스터 간접([R2])은 주소를 정해 메모리를 읽어요([R2]는 C의 *p). 베이스 + 오프셋(8(R3))은 배열 원소, 구조체 필드, 스택 변수 접근에 쓰이고, PC 상대는 분기와 위치 독립 코드(PIC)를 가능하게 해요. RISC는 몇 가지만 두고, x86은 [base + index×4 + disp]처럼 복잡한 조합까지 지원해요.', 'Rules for where an instruction finds its operands: immediate, register, direct, indirect, base plus offset, PC-relative and more.', 'Immediate (#5) and register (R2) modes never touch memory, while direct ([200]) and register indirect ([R2], like C’s *p) compute an address and read memory. Base plus offset (8(R3)) reaches array elements, struct fields and stack slots, and PC-relative addressing enables branches and position-independent code. RISC keeps only a few modes; x86 even supports combinations like [base + index×4 + disp].', sAddr()),
    item('ar-datapath', '단일 사이클 데이터패스', 'A single-cycle datapath', '명령어가 PC → 명령어 메모리 → 레지스터 파일 → ALU → 데이터 메모리 → 레지스터로 흘러가는 길과, 그 길을 조종하는 제어 신호예요.', 'lw $t0, 32($s3)는 PC로 명령어를 읽고(PC + 4), $s3을 읽고 32를 부호 확장한 뒤, ALU가 주소를 계산해 데이터 메모리를 읽고, 그 값을 $t0에 써요. 제어 유닛은 op에 따라 RegWrite, ALUSrc, MemRead, MemToReg 같은 신호로 멀티플렉서와 쓰기를 조절해요. 단일 사이클 설계는 가장 긴 명령에 클럭을 맞춰야 해서 느리고, 그래서 단계를 겹치는 파이프라인으로 발전해요.', 'The path an instruction travels, PC → instruction memory → register file → ALU → data memory → registers, plus the control signals that steer it.', 'For lw $t0, 32($s3), the CPU fetches at PC (and computes PC + 4), reads $s3 and sign-extends 32, lets the ALU compute the address, reads data memory and writes the value into $t0. The control unit drives signals like RegWrite, ALUSrc, MemRead and MemToReg from the opcode to set multiplexers and write enables. A single-cycle design must clock at its slowest instruction, which motivates pipelining.', sDatapath()),
    item('ar-ooo', '비순차 실행', 'Out-of-order execution', '앞 명령이 캐시 미스 등으로 멈춰도, 피연산자가 준비된 뒤쪽 명령을 먼저 실행해 빈 시간을 메우는 기법이에요.', 'LOAD가 미스로 오래 걸리면 순서대로 실행하는 CPU는 상관없는 MUL, SUB까지 기다려요. 비순차 CPU는 이들을 먼저 실행해 전체 시간을 줄이고, 재정렬 버퍼(ROB)로 결과 확정은 원래 순서대로 해서 정확한 예외를 지켜요. 레지스터 리네이밍은 같은 레지스터 이름 때문에 생기는 가짜 의존(WAR, WAW)을 없애요. 현대 고성능 코어는 수백 개 명령을 동시에 들고 있고, Spectre 같은 취약점도 이 투기적 실행에서 나왔어요.', 'When an earlier instruction stalls, for example on a cache miss, later instructions whose operands are ready run first to fill the gap.', 'If a LOAD misses the cache, an in-order CPU makes the unrelated MUL and SUB wait too; an out-of-order CPU runs them early and finishes sooner, while a reorder buffer (ROB) retires results in program order to keep exceptions precise. Register renaming removes false dependencies (WAR, WAW) caused by reused register names. Modern high-end cores keep hundreds of instructions in flight, and attacks like Spectre grew out of this speculative execution.', sOoo()),
    item('ar-simd', 'SIMD 벡터 명령', 'SIMD vector instructions', '명령 하나로 여러 데이터(레인)를 동시에 처리하는 명령어예요. 128비트 레지스터 하나에 float 4개를 담아 한 번에 더해요.', '배열 8개를 더할 때 스칼라는 ADD 8번, SSE의 VADDPS는 4개씩 2번이면 끝나요. AVX2(256비트), AVX-512, ARM NEON/SVE로 레인 수가 늘었어요. 보통은 컴파일러의 자동 벡터화(-O3)에 맡기는데, 연속된 메모리와 분기 없는 루프일수록 잘 돼요. 이미지 처리, simdjson, ML 추론, 영상 코덱이 SIMD로 빨라지고, GPU의 SIMT는 같은 생각을 수천 스레드로 확장한 거예요.', 'Instructions that process several data lanes at once, such as adding four floats held in one 128-bit register.', 'Adding eight array elements takes eight scalar ADDs but only two SSE VADDPS instructions, four lanes each; AVX2 (256-bit), AVX-512 and ARM NEON/SVE widen the lanes further. Usually the compiler auto-vectorizes at -O3, which works best on contiguous data and branch-free loops. Image processing, simdjson, ML inference and video codecs speed up with SIMD, and a GPU’s SIMT stretches the idea to thousands of threads.', sSimd())
  ],
  'ar-mem': [
    item('ar-cachemap', '캐시 매핑 방식', 'Cache mapping', '메모리 블록이 캐시의 어느 줄에 들어갈 수 있는지 정하는 방식이에요. 직접 사상, n-way 집합 연관, 완전 연관이 있어요.', '주소는 태그 | 인덱스 | 오프셋으로 나뉘어요. 직접 사상은 블록마다 들어갈 줄이 하나라, 같은 줄에 대응하는 블록 0과 8을 번갈아 읽으면 매번 서로를 쫓아내요(충돌 미스). 2-way 집합 연관이면 둘이 한 집합에 공존해 처음 두 번만 미스예요. 완전 연관은 어디든 넣을 수 있지만 모든 태그를 동시에 비교해야 해 비싸요. 실제 L1은 보통 8-way이고, 미스는 처음·용량·충돌(3C)로 나눠요.', 'Rules for which cache lines a memory block may occupy: direct-mapped, n-way set associative or fully associative.', 'An address splits into tag | index | offset. In a direct-mapped cache each block has exactly one line, so alternating between blocks 0 and 8, which share a line, evicts every time (conflict misses). With 2-way set associativity both fit in one set and only the first two accesses miss. A fully associative cache accepts any line but must compare every tag at once. Real L1 caches are typically 8-way, and misses are classed as compulsory, capacity or conflict (the 3 Cs).', sCacheMap()),
    item('ar-writepol', '캐시 쓰기 정책', 'Cache write policies', '쓰기를 캐시와 메모리에 동시에 반영할지(라이트 스루), 캐시에만 하고 나중에 내릴지(라이트 백) 정하는 방식이에요.', '라이트 스루는 x = 1, 2, 3을 쓸 때마다 메모리에도 써서 단순하고 항상 최신이지만 메모리 쓰기가 많아요(쓰기 버퍼로 지연을 숨겨요). 라이트 백은 캐시만 고치고 더티 비트를 켠 뒤, 줄이 쫓겨날 때 한 번만 메모리에 써요. 쓰기 미스 때 줄을 가져오는 write-allocate는 보통 라이트 백과 짝을 이뤄요. 현대 CPU 캐시는 대부분 라이트 백이고, 다른 코어·DMA와의 일관성은 별도 프로토콜이 맡아요.', 'Whether a write updates cache and memory together (write-through) or only the cache, to be flushed later (write-back).', 'Write-through sends x = 1, 2, 3 to memory on every write: simple and always current, but heavy on memory traffic (a write buffer hides the delay). Write-back updates only the cache, sets a dirty bit and writes memory once when the line is evicted. Write-allocate, fetching the line on a write miss, usually pairs with write-back. Modern CPU caches are mostly write-back, and a separate coherence protocol keeps other cores and DMA consistent.', sWritePol()),
    item('ar-coherence', '캐시 일관성 (MESI)', 'Cache coherence (MESI)', '코어마다 캐시가 따로 있어도 같은 주소는 같은 값으로 보이게 하는 규칙이에요. MESI 프로토콜이 대표적이에요.', '각 캐시 줄은 M(수정됨), E(독점), S(공유), I(무효) 중 하나예요. Core 1만 읽으면 E, Core 2도 읽으면 둘 다 S, Core 1이 쓰면 다른 복사본을 무효화해 Core 2는 I, Core 1은 M이 되고, Core 2가 다시 읽으면 Core 1이 값을 넘기며 둘 다 S가 돼요. 스누핑 버스나 디렉터리로 구현하고, 여러 코어가 같은 줄을 번갈아 쓰면 무효화가 오가며 느려지는 거짓 공유가 생겨요.', 'Rules that make every core see a single value per address despite private caches; the MESI protocol is the classic example.', 'Each cache line is Modified, Exclusive, Shared or Invalid. If only Core 1 reads x it is E; when Core 2 reads too both are S; when Core 1 writes, other copies are invalidated, so Core 2 goes I and Core 1 M; when Core 2 reads again, Core 1 supplies the data and both return to S. It is implemented with bus snooping or directories, and cores taking turns writing one line bounce invalidations, which is false sharing.', sCoherence())
  ],
  'ar-io': [
    item('ar-raid', 'RAID', 'RAID', '여러 디스크를 하나처럼 묶어 속도(스트라이핑)나 안전(미러링, 패리티)을 얻는 방법이에요.', 'RAID 0은 데이터를 나눠 써서 빠르지만 하나만 고장 나도 전부 잃고, RAID 1은 똑같이 복제해 용량이 절반이에요. RAID 5는 패리티를 디스크마다 돌아가며 저장해 용량 (n−1)/n으로 한 개 고장을 견디고, 고장 난 블록은 A3 = A1 ⊕ A2 ⊕ Ap처럼 XOR로 다시 계산해요. RAID 6은 두 개까지, RAID 10은 미러 위에 스트라이프를 얹어요. RAID는 백업이 아니라서 실수로 지운 파일이나 랜섬웨어는 그대로 복제돼요.', 'Grouping several disks to act as one, gaining speed (striping) or safety (mirroring, parity).', 'RAID 0 splits data across disks for speed but loses everything if one fails; RAID 1 mirrors at half capacity. RAID 5 rotates parity across disks for (n−1)/n capacity and survives one failure, rebuilding lost blocks with XOR, e.g. A3 = A1 ⊕ A2 ⊕ Ap. RAID 6 tolerates two failures and RAID 10 stripes across mirrors. RAID is not a backup: accidental deletes and ransomware are faithfully replicated.', sRaid())
  ]
},
after: {
  'ar-multicore': [item('ar-mcarch', '멀티코어 프로세서 구조', 'Multicore processor design', '한 칩에 코어 여러 개가 들어 있고, 코어마다 전용 L1·L2 캐시를, 모두가 나눠 쓰는 L3와 이를 잇는 연결망을 가져요.', '멀티코어 칩의 각 코어는 명령어를 따로 실행하는 완전한 CPU이고, 코어마다 전용 L1 명령·데이터 캐시(각 32~64 KB)와 L2 캐시(1~2 MB)를 가져요. 큰 L3 캐시는 여러 조각으로 나뉘어 링이나 메시 연결망에 붙어 있고 모든 코어가 함께 써요. 접근 지연은 대략 L1 4사이클, L2 14사이클, L3 50사이클, DRAM 250사이클 이상이라 아래로 갈수록 크게 느려져요. 한 코어가 데이터를 쓰면, 같은 캐시 줄을 가진 다른 코어의 복사본은 연결망을 통해 무효화되어 모든 코어가 같은 값을 보게 돼요(MESI 같은 캐시 일관성 프로토콜). 코어 하나가 하드웨어 스레드 두 개를 번갈아 실행하는 SMT(하이퍼스레딩)는 한 스레드가 메모리를 기다릴 때 노는 실행 유닛을 채워 15~30% 정도 처리량을 올려요. 요즘 칩은 크고 빠른 P코어와 작고 전력 효율이 좋은 E코어를 섞고, 운영체제 스케줄러가 일의 성격에 맞게 배치해요. 코어가 수십 개인 서버 칩은 링 대신 메시를, AMD는 여러 칩렛을 한 패키지로 묶어요. 먼 L3 조각이나 다른 소켓의 메모리는 더 느리기 때문에(NUMA) 스레드를 데이터 가까이에 두는 것이 중요해요.', 'A chip holding several cores, each with private L1 and L2 caches, plus a shared L3 and the interconnect that ties them together.', 'Each core on a multicore chip is a complete CPU running its own instruction stream, with private L1 instruction and data caches (32–64 KB each) and an L2 cache (1–2 MB). A large L3 is split into slices attached to a ring or mesh interconnect and shared by every core. Latency rises steeply down the hierarchy: roughly 4 cycles for L1, 14 for L2, 50 for L3 and 250 or more for DRAM. When one core writes, copies of that cache line in other cores are invalidated over the interconnect so every core sees the same value (a coherence protocol such as MESI). Simultaneous multithreading (SMT, Hyper-Threading) lets one core interleave two hardware threads, filling execution units that would sit idle while one thread waits on memory and raising throughput by roughly 15–30%. Recent chips mix big, fast P-cores with small, power-efficient E-cores, and the OS scheduler places work accordingly. Server chips with dozens of cores replace the ring with a mesh, and AMD packages several chiplets together. Distant L3 slices and memory on another socket are slower (NUMA), so keeping threads near their data matters.', sMcArch())]
} };
})();

window.UX = page([
  sec('ar-data', '데이터 표현', 'Data representation', '컴퓨터가 수와 글자를 담는 방법', 'How computers store numbers and text',
    '모든 데이터는 결국 0과 1이에요. 그 약속을 알아야 이상한 버그가 이해돼요.', 'All data is 0s and 1s in the end; knowing the conventions explains strange bugs.', [
    item('ar-bin', '2진수와 16진수', 'Binary · Hexadecimal', '컴퓨터는 0과 1(비트)로 수를 표현해요. 자리마다 2배씩 커지고, 4비트를 16진수 한 글자로 줄여 써요.', '색상(#FF8800), 메모리 주소, 해시값, 파일 권한(chmod 755=2진 111 101 101)이 모두 이 표기예요.', 'Computers write numbers in bits; each place is worth double the previous, and hex packs 4 bits into one digit.', 'Colours (#FF8800), memory addresses, hashes and file modes (chmod 755 = 111 101 101) all use these notations.', sBin()),
    item('ar-twos', '2의 보수', 'Two’s complement', '음수는 비트를 뒤집고 1을 더해 표현해요. 덧셈 회로 하나로 뺄셈까지 처리할 수 있어요.', '정수형은 범위를 넘으면 반대쪽 끝으로 넘어가요(오버플로). 32비트 int는 약 21억이 한계라 금액·ID엔 64비트를 쓰세요.', 'Negative numbers are formed by inverting the bits and adding one, so a single adder handles subtraction.', 'Integers wrap around past their range (overflow). A 32-bit int tops out near 2.1 billion, so use 64-bit for money and ids.', sTwos()),
    item('ar-float', '부동소수점', 'Floating point', '실수를 부호·지수·가수로 나눠 저장하는 방식(IEEE 754)이에요. 0.1처럼 2진수로 딱 떨어지지 않는 수는 근사값이 돼요.', '0.1 + 0.2 ≠ 0.3 이에요. 돈 계산은 정수(최소 단위)나 Decimal 타입을 쓰고, 실수 비교는 오차 범위로 하세요.', 'Real numbers are stored as sign, exponent and fraction (IEEE 754); values like 0.1 that don’t terminate in binary are approximated.', '0.1 + 0.2 ≠ 0.3. Do money in integer minor units or Decimal, and compare floats within a tolerance.', sFloat()),
    item('ar-endian', '엔디언', 'Endianness', '여러 바이트로 된 값을 메모리에 큰 자리부터(빅 엔디언) 둘지, 작은 자리부터(리틀 엔디언) 둘지의 약속이에요.', '대부분의 CPU는 리틀 엔디언, 네트워크는 빅 엔디언이에요. 바이너리 파일·소켓 프로토콜을 파싱할 때 순서를 꼭 맞추세요.', 'Whether a multi-byte value is stored most-significant byte first (big-endian) or least-significant first (little-endian).', 'Most CPUs are little-endian; network protocols are big-endian. Match the order when parsing binary files or sockets.', sEndian()),
    item('ar-char', '문자 인코딩 (UTF-8)', 'Character encoding · UTF-8', '모든 문자에 유니코드 번호를 붙이고, UTF-8은 이를 1~4바이트로 저장해요. 영문은 1바이트, 한글은 3바이트예요.', '글자가 깨지면(문자 깨짐) 저장과 읽기 인코딩이 다른 거예요. MySQL은 이모지 때문에 utf8이 아닌 utf8mb4를 써야 해요.', 'Every character has a Unicode number, and UTF-8 stores it in 1–4 bytes: 1 for English letters, 3 for Korean syllables.', 'Garbled text means writing and reading used different encodings. In MySQL use utf8mb4, not utf8, so emoji fit.', sChar())
  ].concat(XT.add['ar-data'] || [])),
  sec('ar-cpu', 'CPU', 'CPU', 'CPU의 동작', 'How the CPU works',
    '명령어 하나가 실행되는 과정과 그것을 빠르게 만드는 기법들이에요.', 'How one instruction runs, and the tricks that make it fast.', [
    item('ar-vonneumann', '폰 노이만 구조', 'Von Neumann architecture', '명령어와 데이터를 같은 메모리에 두고, CPU가 버스를 통해 하나씩 가져와 실행하는 구조예요. 오늘날 거의 모든 컴퓨터의 기본이에요.', 'CPU는 빨라졌지만 메모리와 버스는 상대적으로 느려서 병목이 생겨요. 캐시·프리페치가 이 문제를 줄이기 위해 존재해요.', 'Instructions and data share one memory, and the CPU fetches them over a bus one at a time; nearly every computer works this way.', 'CPUs got fast while memory and buses lagged, creating a bottleneck that caches and prefetching exist to hide.', sVN()),
    item('ar-cycle', '명령어 사이클', 'Instruction cycle', 'CPU는 PC가 가리키는 명령어를 가져오고(인출), 해석하고(해독), 실행한 뒤 다음 명령으로 넘어가는 일을 반복해요.', '3GHz CPU는 1초에 이 사이클을 30억 번 돌려요. 디버거의 "한 줄 실행"이 이 반복을 사람 속도로 보는 거예요.', 'The CPU fetches the instruction PC points to, decodes it, executes it and moves to the next, over and over.', 'A 3 GHz CPU turns this loop three billion times a second; stepping in a debugger watches it at human speed.', sCycle()),
    item('ar-pipe', '파이프라인', 'Pipelining', '명령어 처리를 여러 단계로 나눠, 앞 명령이 다음 단계로 가면 바로 다음 명령을 시작해요. 동시에 여러 명령이 서로 다른 단계에 있어요.', '명령 하나의 시간은 같지만 처리량이 크게 늘어요. 최신 CPU는 여기에 여러 명령을 동시에 내보내는 슈퍼스칼라, 순서를 바꾸는 비순차 실행까지 더해요.', 'Instruction processing is split into stages so a new instruction starts as soon as the previous one moves on, with several in flight at once.', 'Latency per instruction is unchanged but throughput soars. Modern CPUs add superscalar issue and out-of-order execution on top.', sPipe()),
    item('ar-hazard', '파이프라인 해저드', 'Pipeline hazards', '다음 명령이 앞 명령의 결과를 필요로 하면 파이프라인이 기다려야 해요(데이터 해저드). 포워딩으로 결과를 지름길로 넘겨 줄여요.', '컴파일러가 명령 순서를 바꿔(스케줄링) 기다림을 줄여요. 의존성이 긴 계산 사슬은 병렬화가 어려운 이유이기도 해요.', 'When an instruction needs the result of the one before, the pipeline must wait (a data hazard); forwarding passes the result via a shortcut.', 'Compilers reorder instructions to hide stalls. Long dependency chains are also why some code resists parallelism.', sHazard()),
    item('ar-branch', '분기 예측', 'Branch prediction', 'if문의 결과가 나오기 전에 CPU가 어느 쪽일지 예측해서 미리 실행해요. 틀리면 미리 한 일을 버리고 다시 해요.', '정렬된 데이터로 반복하면 예측이 잘 맞아 빨라져요(유명한 StackOverflow 질문). 스펙터 같은 보안 취약점도 이 추측 실행에서 나왔어요.', 'Before an if is resolved, the CPU guesses the outcome and runs ahead; a wrong guess means discarding that work.', 'Loops over sorted data run faster because predictions hit (a famous Stack Overflow question). Spectre-style attacks came from this speculation.', sBranch()),
    item('ar-isa', 'CISC vs RISC', 'CISC vs RISC', 'CISC(x86)는 복잡하고 길이가 다양한 명령어를, RISC(ARM, RISC-V)는 단순하고 길이가 같은 명령어를 써요.', '애플 실리콘·스마트폰은 ARM, 대부분의 서버·PC는 x86이에요. 도커 이미지와 네이티브 라이브러리는 아키텍처(amd64/arm64)를 맞춰야 해요.', 'CISC (x86) uses complex, variable-length instructions; RISC (ARM, RISC-V) uses simple, fixed-length ones.', 'Apple silicon and phones are ARM; most servers and PCs are x86. Docker images and native libraries must match the architecture (amd64/arm64).', sISA()),
    item('ar-multicore', '멀티코어와 암달의 법칙', 'Multicore · Amdahl’s law', '코어를 늘려도 나눌 수 없는 순차 구간이 있으면 속도 향상에 한계가 있어요. 순차 비율이 20%면 최대 5배까지예요.', '스레드를 늘리기 전에 락 경합·순차 처리 구간을 먼저 줄이세요. 서버는 요청 단위로 나눠 코어를 잘 활용해요.', 'Adding cores can only speed up the parallel part; with 20% serial work, the best possible speed-up is 5×.', 'Before adding threads, cut lock contention and serial sections. Servers use cores well by splitting work per request.', sMulti())
  ].concat(XT.add['ar-cpu'] || [])),
  sec('ar-mem', '메모리 계층', 'Memory hierarchy', '메모리 계층과 캐시', 'Memory hierarchy and caches',
    '빠른 메모리는 작고 비싸서 여러 층으로 나눠 써요.', 'Fast memory is small and expensive, so it comes in layers.', [
    item('ar-hier', '메모리 계층 구조', 'Memory hierarchy', '레지스터 → L1·L2·L3 캐시 → RAM → SSD → HDD 순으로 느려지고, 커지고, 싸져요.', '"L1 접근이 1초라면 RAM은 5분, SSD는 며칠"이라는 감각을 가지면 어디를 최적화할지 보여요.', 'Registers, then L1/L2/L3 caches, RAM, SSD and HDD: each level is slower, larger and cheaper.', 'Think “if L1 took one second, RAM would take five minutes and SSD days” to see where optimization pays.', sHier()),
    item('ar-cache', '캐시와 캐시 라인', 'Cache · Cache lines', 'CPU는 메모리를 64바이트 묶음(캐시 라인)으로 가져와 캐시에 둬요. 한 번 미스가 나면 주변 데이터는 히트가 돼요.', '배열이 링크드 리스트보다 실제로 훨씬 빠른 이유예요. 데이터를 연속으로 배치하는 게 알고리즘 복잡도만큼 중요해요.', 'The CPU pulls memory in 64-byte chunks (cache lines), so after one miss the neighbouring data hits.', 'This is why arrays beat linked lists in practice; laying data out contiguously matters as much as big-O.', sCache()),
    item('ar-locality', '지역성', 'Locality', '최근 쓴 데이터를 곧 다시 쓰고(시간 지역성), 가까운 데이터를 이어서 쓰는(공간 지역성) 경향이에요. 캐시는 이걸 믿고 동작해요.', '2차원 배열은 행 순서로 돌고, 구조체 배열(AoS)과 배열 구조체(SoA) 중 접근 패턴에 맞게 고르세요.', 'Programs tend to reuse recent data (temporal locality) and touch nearby data next (spatial locality); caches bet on it.', 'Iterate 2D arrays row by row, and choose array-of-structs or struct-of-arrays to match your access pattern.', sLocal()),
    item('ar-falseshare', '거짓 공유', 'False sharing', '서로 다른 코어가 다른 변수를 쓰는데, 두 변수가 같은 캐시 라인에 있어서 캐시가 계속 서로를 무효화하는 현상이에요.', '멀티스레드 카운터·큐가 이유 없이 느리면 의심하세요. 패딩이나 @Contended, 스레드별 카운터로 해결해요.', 'Cores writing different variables keep invalidating each other because those variables share one cache line.', 'Suspect it when multithreaded counters or queues are inexplicably slow; fix with padding, @Contended or per-thread counters.', sFalse())
  ].concat(XT.add['ar-mem'] || [])),
  sec('ar-io', '입출력·저장', 'I/O & storage', '입출력과 저장 장치', 'I/O and storage',
    '데이터를 옮기고 오래 보관하는 장치들이에요.', 'Devices that move and keep data.', [
    item('ar-dma', 'DMA', 'DMA · Direct memory access', '대량 데이터 전송을 CPU 대신 전용 컨트롤러가 메모리로 직접 옮기고, 끝나면 인터럽트로 알려요.', '덕분에 CPU는 디스크·네트워크 전송 중에도 다른 일을 해요. 제로 카피(sendfile) 같은 고성능 I/O 기법의 바탕이에요.', 'A dedicated controller moves bulk data straight into memory instead of the CPU, raising an interrupt when done.', 'The CPU keeps working during disk and network transfers; it underpins zero-copy I/O like sendfile.', sDMA()),
    item('ar-ssd', 'SSD vs HDD', 'SSD vs HDD', 'HDD는 원판을 돌리고 헤드를 움직여 읽어서 흩어진 데이터에 느리고, SSD는 플래시 칩을 병렬로 읽어 수천 배 빨라요.', 'DB·서버 디스크는 SSD가 기본이에요. SSD는 쓰기 횟수에 수명이 있고, 클라우드 디스크는 IOPS 한도를 확인하세요.', 'HDDs spin platters and move a head, so scattered reads are slow; SSDs read flash chips in parallel and are thousands of times faster.', 'SSDs are the default for databases and servers. They wear with writes, and cloud disks have IOPS limits to check.', sSSD()),
    item('ar-gpu', 'CPU vs GPU', 'CPU vs GPU', 'CPU는 복잡한 일을 빠르게 하는 큰 코어 몇 개, GPU는 같은 단순 계산을 대량으로 하는 작은 코어 수천 개예요.', '딥러닝의 행렬 곱, 그래픽, 영상 인코딩에 GPU를 써요. 데이터를 GPU로 옮기는 비용이 있어서 작은 작업은 오히려 손해예요.', 'A CPU has a few big cores for complex work; a GPU has thousands of small ones for the same simple maths on lots of data.', 'Deep learning’s matrix maths, graphics and video encoding run on GPUs. Copying data to the GPU costs time, so tiny jobs lose.', sGPU())
  ].concat(XT.add['ar-io'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.ar-m .in{font-family:var(--f-mono);font-size:.66em;font-weight:700}
.ar-xs .in{font-size:.54em}
.ar-big .in{font-size:1.05em;font-weight:800}
.ar-code{place-items:center start!important;padding-left:.7em}
.ar-code .in{font-family:var(--f-mono);font-size:.62em}
.ar-b .in{font-weight:800;color:var(--ink);font-size:.8em}`;
})();
