(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const RH = 1.9, RG = .25;
/* table helper: cols [[label, width]], rows [[...cells]] */
function tbl(S, p, x, y, cols, rows, o = {}) {
  let cx = x;
  cols.forEach(([name, w], c) => {
    cell(S, `${p}h${c}`, cx, y, name, { w: w - .15, h: RH, cls: 'cz-c db-t db-h', s: Object.assign({}, o.hide ? { opacity: '0' } : {}) });
    rows.forEach((r, ri) => cell(S, `${p}${ri}_${c}`, cx, y + (ri + 1) * (RH + RG), r[c], { w: w - .15, h: RH, cls: 'cz-c db-t', s: Object.assign({}, o.hide ? { opacity: '0' } : {}, o.rs ? o.rs(ri, c) : {}) }));
    cx += w;
  });
  return { ry: ri => y + (ri + 1) * (RH + RG), rc: ri => y + (ri + 1) * (RH + RG) + RH / 2, right: cx - .15 };
}
const showT = (S, p, nc, nr, step, st) => { for (let c = 0; c < nc; c++) { S.set(`${p}h${c}`, step, { opacity: '1' }); for (let r = 0; r < nr; r++) S.set(`${p}${r}_${c}`, step, Object.assign({ opacity: '1' }, st || {})); } };
const rowSet = (S, p, r, nc, step, st) => { for (let c = 0; c < nc; c++) S.set(`${p}${r}_${c}`, step, st); };

/* ---------- modeling ---------- */
function sTable() {
  const S = scene({ id: 'db-table', steps: 5, per: 1.2 });
  text(S, 'ut', 1.5, 1.6, 'users', { cls: 'cz-t cz-mono' }); text(S, 'ot', 15.5, 1.6, 'orders', { cls: 'cz-t cz-mono' });
  const U = tbl(S, 'u', 1.5, 3, [['id', 3], ['name', 7]], [['1', 'Kim'], ['2', 'Lee'], ['3', 'Park']]);
  const O = tbl(S, 'o', 15.5, 3, [['user_id', 5.4], ['id', 3], ['item', 6.4]], [['1', '10', ['책', 'book']], ['3', '11', ['컵', 'cup']], ['1', '12', ['펜', 'pen']]], { hide: 1 });
  [0, 1, 2].forEach(r => S.set(`u${r}_0`, 1, C.soft)); S.set('uh0', 1, C.cur);
  showT(S, 'o', 3, 3, 2);
  [0, 1, 2].forEach(r => S.set(`o${r}_0`, 3, C.cmp)); S.set('oh0', 3, C.warn);
  [[0, 0], [1, 2], [2, 0]].forEach(([o, u], i) => { link(S, 'fk' + i, [15.4, O.rc(o)], [U.right, U.rc(u)], 0, .1, { s: hid(AR.warn) }); S.set('fk' + i, 3, { opacity: '1' }); });
  cell(S, 'bad', 15.5, O.ry(3), ['9 · 13 · 잉크 ✗', '9 · 13 · ink ✗'], { w: 14.65, h: RH, cls: 'cz-c db-t', s: hid(C.bad) }); S.set('bad', 4, { opacity: '1' });
  S.cap(0, '데이터를 행과 열로 된 표(테이블)에 담아요', 'Data lives in tables of rows and columns').cap(1, '기본 키(PK): 행마다 겹치지 않는 식별자', 'Primary key: a unique id for every row')
    .cap(2, '주문 테이블은', 'The orders table').cap(3, '외래 키(FK)로 사용자를 가리켜요', 'points to users through a foreign key')
    .cap(4, '없는 사용자(9)를 가리키면 DB가 거부해요 (참조 무결성)', 'A reference to a missing user (9) is rejected');
  return S;
}
function sNorm() {
  const S = scene({ id: 'db-norm', steps: 5, per: 1.3 });
  tbl(S, 'w', 2, 3, [['order', 4], ['customer', 6], ['phone', 8.4], ['item', 6]], [['1', 'Kim', '010-1111', ['책', 'book']], ['2', 'Kim', '010-1111', ['펜', 'pen']], ['3', 'Kim', '010-1111', ['컵', 'cup']], ['4', 'Lee', '010-2222', ['책', 'book']]]);
  [0, 1, 2].forEach(r => { S.set(`w${r}_1`, 1, C.cmp).set(`w${r}_2`, 1, C.cmp); });
  S.label('w1_2x', { cls: 'cz-c db-t', x: 12, y: 3 + 2 * (RH + RG), w: 8.25, h: RH, css: 'z-index:2' }, [[0, ''], [2, '010-9999']]);
  Object.assign(S.get('w1_2x~0').s, { opacity: '0' }); Object.assign(S.get('w1_2x~1').s, C.bad);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) S.set(`w${r}_${c}`, 3, { opacity: '0' });
  for (let c = 0; c < 4; c++) S.set('wh' + c, 3, { opacity: '0' });
  S.set('w1_2x~1', 3, { opacity: '0' });
  tbl(S, 'c', 1.2, 3.4, [['id', 2.8], ['name', 5], ['phone', 6.6]], [['1', 'Kim', '010-1111'], ['2', 'Lee', '010-2222']], { hide: 1 });
  tbl(S, 'o', 17, 3.4, [['order', 4], ['cust', 3.6], ['item', 6.2]], [['1', '1', ['책', 'book']], ['2', '1', ['펜', 'pen']], ['3', '1', ['컵', 'cup']], ['4', '2', ['책', 'book']]], { hide: 1 });
  showT(S, 'c', 3, 2, 3); showT(S, 'o', 3, 4, 3);
  [0, 1, 2, 3].forEach(r => S.set(`o${r}_1`, 4, C.soft)); S.set('c0_2', 4, C.ok);
  S.cap(0, '한 테이블에 다 담았더니', 'Everything in one table…').cap(1, '같은 고객 정보가 반복돼요', 'The same customer data repeats').cap(2, '한 줄만 고치면 정보가 서로 달라져요 (갱신 이상)', 'Update one row and the copies disagree (update anomaly)')
    .cap(3, '고객과 주문으로 나누면', 'Split into customers and orders').cap(4, '전화번호는 한 곳에만 · 고칠 곳도 하나', 'The phone lives in one place, so one fix')
    .cap(5, '읽기 성능을 위해 일부러 합치기도 해요 (역정규화)', 'Sometimes you merge on purpose for read speed (denormalization)');
  return S;
}
function sER() {
  const S = scene({ id: 'db-er', steps: 4, per: 1.4 });
  box(S, 'st', 1.5, 3.5, 7.5, 3.4, ['학생', 'Student']); box(S, 'co', 23, 3.5, 7.5, 3.4, ['과목', 'Course']);
  S.el('ln', { x: 9, y: 5.15, w: 14, h: .14, css: 'background:var(--ink-3)' });
  pill(S, 'nm', 12.4, 1.6, 'N : M', { w: 7.2, h: 1.8, s: C.cmp });
  text(S, 'nt', 9.5, 7.6, ['학생은 여러 과목, 과목엔 여러 학생', 'many students ⇄ many courses'], { cls: 'cz-t' });
  box(S, 'en', 11.8, 12.4, 8.4, 3.4, ['수강 (연결 테이블)', 'Enrollment (join table)'], { s: hid(C.soft) });
  text(S, 'ek', 11.8, 16.2, 'student_id · course_id', { w: 8.4, cls: 'cz-t cz-tc cz-mono', s: hid() });
  link(S, 'l1', [5.25, 6.9], [13, 12.4], 0, .1, { s: hid() }); link(S, 'l2', [26.75, 6.9], [19, 12.4], 0, .1, { s: hid() });
  text(S, 'c1', 6.4, 8.4, '1', { cls: 'cz-t cz-mono os-lg', s: hid() }); text(S, 'c2', 11.6, 10.6, 'N', { cls: 'cz-t cz-mono os-lg', s: hid() });
  text(S, 'c3', 24.6, 8.4, '1', { cls: 'cz-t cz-mono os-lg', s: hid() }); text(S, 'c4', 19.6, 10.6, 'N', { cls: 'cz-t cz-mono os-lg', s: hid() });
  S.set('ln', 2, { opacity: '0' }).set('nm', 2, { opacity: '0' }).set('nt', 2, { opacity: '0' });
  ['en', 'ek', 'l1', 'l2'].forEach(k => S.set(k, 2, { opacity: '1' })); ['c1', 'c2', 'c3', 'c4'].forEach(k => S.set(k, 3, { opacity: '1' }));
  S.cap(0, '현실의 대상(엔티티)과 관계를 그려 설계해요', 'Design by drawing entities and their relationships').cap(1, '학생과 과목은 다대다 관계', 'Students and courses are many-to-many')
    .cap(2, '테이블로는 연결 테이블을 하나 둬요', 'In tables, add a join table').cap(3, '1:N 두 개로 풀려요', 'It becomes two one-to-many links').cap(4, '수강 테이블에 성적·수강일도 담을 수 있어요', 'The join table can also hold grade and date');
  return S;
}

/* ---------- SQL ---------- */
function sSelect() {
  const S = scene({ id: 'db-select', steps: 8, per: .95 });
  const L = ['SELECT dept, AVG(pay)', 'FROM emp', 'WHERE year >= 2020', 'GROUP BY dept', 'HAVING AVG(pay) > 5000', 'ORDER BY 2 DESC', 'LIMIT 2;'];
  const ord = [5, 1, 2, 3, 4, 6, 7];
  const N = [['1000행', '1000 rows'], ['120행', '120 rows'], ['8그룹', '8 groups'], ['3그룹', '3 groups'], ['2열 선택', '2 columns'], ['정렬됨', 'sorted'], ['2행', '2 rows']];
  L.forEach((t, i) => { cell(S, 'l' + i, 4, 2 + i * 2.5, t, { w: 15.5, h: 2.1, cls: 'cz-c db-t db-code' }); cell(S, 'n' + i, 1.2, 2.15 + i * 2.5, String(ord[i]), { w: 1.8, h: 1.8, cls: 'cz-c db-t', s: hid(C.cur) }); });
  const byStep = [1, 2, 3, 4, 0, 5, 6];
  byStep.forEach((li, k) => { const s = k + 1; S.set('l' + li, s, C.soft).set('n' + li, s, { opacity: '1' }); if (k) S.set('l' + byStep[k - 1], s, C.idle); });
  S.set('l6', 8, C.idle);
  S.label('cnt', { cls: 'cz-t cz-tc db-big', x: 21, y: 8, w: 10 }, [[0, ''], ...N.map((t, k) => [k + 1, t])]);
  S.cap(0, '쓰는 순서와 실행 순서가 달라요', 'SQL is written in one order and run in another').cap(1, '① 어느 테이블에서', '① FROM: which table').cap(2, '② 행을 거르고', '② WHERE: filter rows').cap(3, '③ 묶고', '③ GROUP BY: group')
    .cap(4, '④ 묶음을 거르고', '④ HAVING: filter groups').cap(5, '⑤ 이제야 열을 고르고', '⑤ SELECT: pick columns').cap(6, '⑥ 정렬하고', '⑥ ORDER BY: sort').cap(7, '⑦ 자르기', '⑦ LIMIT: cut')
    .cap(8, 'WHERE에서 SELECT의 별칭을 못 쓰는 이유예요', 'That is why WHERE cannot use SELECT aliases');
  return S;
}
function sJoin() {
  const S = scene({ id: 'db-join', steps: 6, per: 1.15 });
  text(S, 'ut', 1, 1.4, 'users', { cls: 'cz-t cz-mono' }); text(S, 'ot', 10.4, 1.4, 'orders', { cls: 'cz-t cz-mono' });
  const U = tbl(S, 'u', 1, 2.8, [['id', 2.4], ['name', 4.6]], [['1', 'Kim'], ['2', 'Lee'], ['3', 'Park']]);
  const O = tbl(S, 'o', 10.4, 2.8, [['user', 3.6], ['item', 4.4]], [['1', ['책', 'book']], ['1', ['펜', 'pen']], ['3', ['컵', 'cup']], ['4', ['잉크', 'ink']]]);
  [[0, 0, 1], [0, 1, 1], [2, 2, 2]].forEach(([u, o, st], i) => { link(S, 'm' + i, [U.right, U.rc(u)], [10.4, O.rc(o)], .1, .1, { s: hid(AR.acc) }); S.set('m' + i, st, { opacity: '1' }); });
  S.set('u0_0', 1, C.soft).set('u0_1', 1, C.soft); rowSet(S, 'o', 0, 2, 1, C.soft); rowSet(S, 'o', 1, 2, 1, C.soft);
  S.set('u2_0', 2, C.ok).set('u2_1', 2, C.ok); rowSet(S, 'o', 2, 2, 2, C.ok);
  S.label('rt', { cls: 'cz-t cz-mono db-b', x: 20.4, y: 1.4, w: 11 }, [[0, ''], [3, 'INNER JOIN'], [4, 'LEFT JOIN']]);
  const R = tbl(S, 'r', 20.4, 2.8, [['name', 5], ['item', 5.4]], [['Kim', ['책', 'book']], ['Kim', ['펜', 'pen']], ['Park', ['컵', 'cup']], ['Lee', 'NULL']], { hide: 1 });
  showT(S, 'r', 2, 3, 3); S.set('rh0', 3, { opacity: '1' }).set('rh1', 3, { opacity: '1' });
  rowSet(S, 'r', 3, 2, 4, Object.assign({ opacity: '1' }, C.cmp)); S.set('u1_0', 4, C.cmp).set('u1_1', 4, C.cmp);
  rowSet(S, 'o', 3, 2, 5, C.bad);
  S.cap(1, 'id가 같은 행끼리 짝지어요', 'Pair rows whose ids match').cap(3, 'INNER JOIN: 짝이 있는 것만', 'INNER JOIN: only matched pairs').cap(4, 'LEFT JOIN: 왼쪽은 모두, 짝이 없으면 NULL', 'LEFT JOIN: every left row, NULL if unmatched')
    .cap(5, '주인 없는 주문(4)은 어느 쪽에도 없어요 (FULL JOIN이면 포함)', 'The orphan order (4) appears in neither (FULL JOIN keeps it)').cap(6, '조인 키에 인덱스가 있어야 빨라요', 'Index the join keys to make it fast');
  return S;
}
function sGroup() {
  const S = scene({ id: 'db-group', steps: 5, per: 1.2 });
  const D = [['개발', 'Dev'], ['디자인', 'Design'], ['개발', 'Dev'], ['영업', 'Sales'], ['개발', 'Dev'], ['디자인', 'Design'], ['영업', 'Sales']];
  const P = ['6000', '4500', '7000', '5000', '5000', '5500', '4000'];
  tbl(S, 'e', 1.2, 1.4, [['dept', 6], ['pay', 4.4]], D.map((d, i) => [d, P[i]]));
  const G = [[[0, 2, 4], C.soft, 1], [[1, 5], C.cmp, 2], [[3, 6], C.ok, 3]];
  const R = tbl(S, 'r', 15, 1.4, [['dept', 6], ['COUNT', 4.4], ['AVG', 5.2]], [[['개발', 'Dev'], '3', '6000'], [['디자인', 'Design'], '2', '5000'], [['영업', 'Sales'], '2', '4500']], { hide: 1 });
  for (let c = 0; c < 3; c++) S.set('rh' + c, 1, { opacity: '1' });
  G.forEach(([rows, st, s], g) => { rows.forEach(r => rowSet(S, 'e', r, 2, s, st)); rowSet(S, 'r', g, 3, s, Object.assign({ opacity: '1' }, st)); });
  rowSet(S, 'r', 1, 3, 4, { opacity: '.3' }); rowSet(S, 'r', 2, 3, 4, { opacity: '.3' });
  pill(S, 'hv', 15, 11.6, 'HAVING COUNT(*) >= 3', { w: 12, h: 1.9, cls: 'cz-pill cz-mono', s: hid(C.cmp) }); S.set('hv', 4, { opacity: '1' });
  S.cap(0, 'GROUP BY dept: 부서별로 묶어요', 'GROUP BY dept: group by department').cap(1, '같은 값끼리 모아 한 줄로 요약', 'Rows with the same value collapse into one')
    .cap(4, 'HAVING은 묶은 뒤의 결과를 걸러요', 'HAVING filters the groups afterwards').cap(5, 'SELECT에는 묶은 열이나 집계 함수만 올 수 있어요', 'SELECT may list only grouped columns or aggregates');
  return S;
}

/* ---------- indexes & performance ---------- */
function sIndex() {
  const S = scene({ id: 'db-index', steps: 8, per: .85 });
  const ids = [42, 7, 91, 15, 63, 28, 84, 3, 56, 19, 70, 35, 99, 11, 48, 77];
  text(S, 'fl', 1.6, 1.2, ['풀 스캔: 처음부터 끝까지', 'Full scan: every row'], { cls: 'cz-t' });
  ids.forEach((v, i) => cell(S, 'f' + i, 1.6 + i * 1.8, 2.6, String(v), { w: 1.6, h: 1.8, cls: 'cz-c db-t' }));
  for (let k = 0; k < 4; k++) for (let j = 0; j < 4; j++) { const i = k * 4 + j; S.set('f' + i, k + 1, i === 15 ? C.ok : C.cmp); }
  S.label('fc', { cls: 'cz-t cz-mono', x: 21, y: 1.2, w: 10, css: 'text-align:right' }, [[0, ''], [1, ['4행 검사', '4 rows']], [2, ['8행 검사', '8 rows']], [3, ['12행 검사', '12 rows']], [4, ['16행 검사 · 77 찾음', '16 rows · found 77']]]);
  text(S, 'il', 1.6, 6.4, ['인덱스 (B+트리)', 'Index (B+ tree)'], { cls: 'cz-t' });
  cell(S, 'rt', 13.5, 7.6, '50', { w: 5, h: 2, cls: 'cz-c db-t' });
  cell(S, 'i0', 5.5, 11.2, '20 · 35', { w: 6.5, h: 2, cls: 'cz-c db-t' }); cell(S, 'i1', 20, 11.2, '70 · 85', { w: 6.5, h: 2, cls: 'cz-c db-t' });
  const LV = ['3 · 7 · 15', '19 · 28 · 35', '56 · 63 · 70', '77 · 84 · 99'];
  LV.forEach((t, i) => cell(S, 'lf' + i, 1.2 + i * 7.6, 15.2, t, { w: 6.6, h: 2, cls: 'cz-c db-t' }));
  [[16, 9.6, 8.75, 11.2], [16, 9.6, 23.25, 11.2], [8.75, 13.2, 4.5, 15.2], [8.75, 13.2, 12.1, 15.2], [23.25, 13.2, 19.7, 15.2], [23.25, 13.2, 27.3, 15.2]].forEach(([a, b, c, d], i) => S.el('tl' + i, { cls: 'cz-ed', x: a, y: b, w: Math.hypot(c - a, d - b), h: .12, css: `transform:rotate(${Math.atan2(d - b, c - a) * 180 / Math.PI}deg)` }));
  for (let i = 0; i < 3; i++) arrow(S, 'nx' + i, 7.9 + i * 7.6, 16.2, 8.7 + i * 7.6, 16.2);
  S.set('rt', 5, C.soft).set('tl1', 6, { background: 'var(--accent)' }).set('i1', 6, C.soft).set('tl5', 7, { background: 'var(--accent)' }).set('lf3', 7, C.ok);
  S.label('ic', { cls: 'cz-t cz-mono', x: 21, y: 6.4, w: 10, css: 'text-align:right' }, [[0, ''], [5, ['1번', '1 step']], [6, ['2번', '2 steps']], [7, ['3번 · 77 찾음', '3 steps · found 77']]]);
  S.cap(1, '인덱스가 없으면 모든 행을 읽어요 O(n)', 'Without an index every row is read: O(n)').cap(5, '인덱스는 정렬된 트리라 77 > 50 → 오른쪽', 'An index is a sorted tree: 77 > 50, go right')
    .cap(6, '70 ≤ 77 < 85 → 가운데', '70 ≤ 77 < 85 → middle').cap(7, '3번 만에 도착 O(log n)', 'Found in 3 steps: O(log n)').cap(8, '잎이 연결돼 범위 검색도 빨라요 · 대신 쓰기는 느려져요', 'Linked leaves make ranges fast · writes get slower');
  return S;
}
function sComp() {
  const S = scene({ id: 'db-comp', steps: 5, per: 1.3 });
  const E = [['Kim', 'Ana'], ['Lee', 'Ann'], ['Lee', 'Cy'], ['Lee', 'Dan'], ['Park', 'Ann'], ['Park', 'Eve'], ['Yoon', 'Ann']];
  text(S, 'tt', 2, .4, ['인덱스 (last, first) 정렬 순서', 'index (last, first), sorted'], { cls: 'cz-t' });
  tbl(S, 'x', 2, 1.8, [['last', 5], ['first', 5]], E);
  pill(S, 'q1', 15, 4, "WHERE last = 'Lee'", { w: 15, h: 2, cls: 'cz-pill cz-mono', s: hid(C.ok) });
  pill(S, 'q2', 15, 9.4, "WHERE first = 'Ann'", { w: 15, h: 2, cls: 'cz-pill cz-mono', s: hid(C.bad) });
  S.set('q1', 1, { opacity: '1' }); [1, 2, 3].forEach(r => rowSet(S, 'x', r, 2, 2, C.ok));
  text(S, 'r1', 15, 6.6, ['한 구간에 모여 있어 바로 찾아요 ✓', 'one contiguous block ✓'], { cls: 'cz-t', s: hid() }); S.set('r1', 2, { opacity: '1' });
  S.set('q2', 3, { opacity: '1' }); [1, 2, 3].forEach(r => rowSet(S, 'x', r, 2, 3, C.idle)); [1, 4, 6].forEach(r => rowSet(S, 'x', r, 2, 4, C.bad));
  text(S, 'r2', 15, 12, ['여기저기 흩어져 있어 전부 봐야 해요 ✗', 'scattered: must scan all ✗'], { cls: 'cz-t', s: hid() }); S.set('r2', 4, { opacity: '1' });
  S.cap(1, '앞 컬럼으로 찾으면', 'Searching by the first column').cap(2, '인덱스를 탈 수 있어요', 'uses the index').cap(3, '뒤 컬럼만으로 찾으면', 'Searching by the second column alone')
    .cap(4, '정렬이 안 돼 있어 인덱스가 소용없어요', 'cannot use it: the order does not help').cap(5, '자주 거는 조건·같다(=) 조건을 앞에 두세요', 'Put frequent and equality columns first');
  return S;
}
function sN1() {
  const S = scene({ id: 'db-n1', steps: 8, per: .85 });
  text(S, 'lg', 1.6, 1.2, ['쿼리 로그', 'query log'], { cls: 'cz-t' });
  const Q = ['SELECT * FROM users LIMIT 5', 'SELECT * FROM orders WHERE user_id = 1', '… WHERE user_id = 2', '… WHERE user_id = 3', '… WHERE user_id = 4', '… WHERE user_id = 5'];
  Q.forEach((q, i) => { cell(S, 'q' + i, 1.6, 2.6 + i * 2.3, q, { w: 19, h: 1.9, cls: 'cz-c db-t db-code', s: hid(i ? C.cmp : C.soft) }); S.set('q' + i, i + 1, { opacity: '1' }).set('q' + i, 7, { opacity: '0' }); });
  cell(S, 'f0', 1.6, 2.6, 'SELECT * FROM users LIMIT 5', { w: 19, h: 1.9, cls: 'cz-c db-t db-code', s: hid(C.soft) });
  cell(S, 'f1', 1.6, 4.9, 'SELECT * FROM orders WHERE user_id IN (1,2,3,4,5)', { w: 19, h: 1.9, cls: 'cz-c db-t db-code', s: hid(C.ok) });
  S.set('f0', 7, { opacity: '1' }).set('f1', 7, { opacity: '1' });
  S.label('n', { cls: 'cz-t cz-tc db-big', x: 22, y: 6, w: 9 }, [[0, ''], [1, ['1번', '1']], [2, ['2번', '2']], [3, ['3번', '3']], [4, ['4번', '4']], [5, ['5번', '5']], [6, ['6번', '6']], [7, ['2번', '2']]]);
  text(S, 'nl', 22, 9.4, ['DB 왕복', 'round trips'], { w: 9, cls: 'cz-t cz-tc' });
  S.cap(1, '목록을 한 번 가져오고', 'Fetch the list once').cap(2, '항목마다 연관 데이터를 또 가져오면', 'then fetch related data for each item')
    .cap(6, '1 + N번의 쿼리 · 1000개면 1001번', '1 + N queries · 1001 for 1000 items').cap(7, '한 번에 묶어 가져오면 2번', 'Batch it: 2 queries')
    .cap(8, 'ORM의 지연 로딩에서 자주 생겨요 · JOIN·IN·DataLoader로 해결', 'Common with ORM lazy loading · fix with JOIN, IN or DataLoader');
  return S;
}

/* ---------- transactions ---------- */
function sACID() {
  const S = scene({ id: 'db-acid', steps: 5, per: 1.4 });
  const A = [['A', ['원자성', 'Atomicity'], ['전부 되거나 전혀 안 되거나', 'all or nothing']], ['C', ['일관성', 'Consistency'], ['규칙(제약 조건)을 항상 지켜요', 'rules always hold']], ['I', ['격리성', 'Isolation'], ['동시에 실행해도 따로 한 것처럼', 'concurrent = as if alone']], ['D', ['지속성', 'Durability'], ['커밋하면 정전에도 남아요', 'committed survives crashes']]];
  A.forEach(([l, n, d], i) => { const x = 1.5 + (i % 2) * 15, y = 1.6 + Math.floor(i / 2) * 9.6; box(S, 'b' + i, x, y, 14, 8.6, ''); text(S, 'l' + i, x + .9, y + .6, l, { cls: 'cz-t db-letter' }); text(S, 'n' + i, x + 4.6, y + 1.7, n, { cls: 'cz-t db-b' }); text(S, 'd' + i, x + .9, y + 5.4, d, { cls: 'cz-t', s: { opacity: '.35' } }); S.set('b' + i, i + 1, C.soft).set('d' + i, i + 1, { opacity: '1' }); if (i) S.set('b' + (i - 1), i + 1, C.idle); });
  S.set('b3', 5, C.idle);
  S.cap(0, '트랜잭션이 지켜야 할 네 가지 성질', 'Four guarantees a transaction gives').cap(1, '계좌 이체 중 오류가 나면 출금도 취소', 'If a transfer fails midway, the withdrawal is undone too')
    .cap(2, '잔액이 음수가 될 수 없다는 규칙 유지', 'A “balance ≥ 0” rule is never broken').cap(3, '두 이체가 동시에 일어나도 서로 꼬이지 않게', 'Two transfers at once don’t interfere')
    .cap(4, '"완료" 응답 후엔 서버가 꺼져도 유지', 'Once it says “done”, a crash won’t lose it').cap(5, 'NoSQL은 성능을 위해 일부를 완화하기도 해요', 'Some NoSQL stores relax these for speed');
  return S;
}
function sTx() {
  const S = scene({ id: 'db-tx', steps: 7, per: 1.05 });
  box(S, 'a', 2, 3, 8, 4.2, ''); box(S, 'b', 2, 10, 8, 4.2, '');
  text(S, 'al', 2.8, 3.4, ['계좌 A', 'Account A'], { cls: 'cz-t' }); text(S, 'bl', 2.8, 10.4, ['계좌 B', 'Account B'], { cls: 'cz-t' });
  S.label('av', { cls: 'cz-t cz-tc db-big', x: 2, y: 4.8, w: 8 }, [[0, '500'], [2, '400'], [4, '500'], [5, '400']]);
  S.label('bv', { cls: 'cz-t cz-tc db-big', x: 2, y: 11.8, w: 8 }, [[0, '300'], [6, '400']]);
  const LOG = [['BEGIN', C.soft, 1], ['UPDATE A −100', C.soft, 2], [['UPDATE B +100 ✗ 오류', 'UPDATE B +100 ✗ error'], C.bad, 3], ['ROLLBACK', C.cmp, 4], ['BEGIN · A −100', C.soft, 5], ['B +100', C.soft, 6], ['COMMIT ✓', C.ok, 7]];
  LOG.forEach(([t, st, s], i) => { cell(S, 'g' + i, 13, 1.4 + i * 2.5, t, { w: 17.5, h: 2.1, cls: 'cz-c db-t db-code', s: hid(st) }); S.set('g' + i, s, { opacity: '1' }); });
  [0, 1, 2].forEach(i => S.set('g' + i, 4, { opacity: '.35' }));
  S.set('a', 2, C.cmp).set('a', 4, C.idle).set('a', 5, C.cmp).set('b', 6, C.cmp).set('a', 7, C.ok).set('b', 7, C.ok);
  S.cap(1, 'A에서 B로 100을 보내요', 'Send 100 from A to B').cap(2, 'A에서 빠졌는데', 'A is debited').cap(3, 'B에 넣다가 실패하면', 'but crediting B fails')
    .cap(4, '롤백: A도 원래대로 · 돈이 사라지지 않아요', 'Rollback restores A: no money vanishes').cap(5, '다시 시도', 'Try again').cap(7, '커밋하면 두 변경이 함께 확정돼요', 'Commit makes both changes permanent together');
  return S;
}
function sIso() {
  const S = scene({ id: 'db-iso', steps: 6, per: 1.15 });
  const LV = ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'];
  const AN = [['더티 리드', 'Dirty read'], ['반복 불가 읽기', 'Non-repeatable'], ['팬텀', 'Phantom']];
  const M = [[1, 1, 1], [0, 1, 1], [0, 0, 1], [0, 0, 0]];
  AN.forEach((a, j) => cell(S, 'a' + j, 12.4 + j * 6.4, 1.6, a, { w: 6.1, h: 2.2, cls: 'cz-c db-t db-h' }));
  LV.forEach((l, i) => {
    const y = 4.4 + i * 3;
    cell(S, 'l' + i, 1, y, l, { w: 11.1, h: 2.6, cls: 'cz-c db-t db-code' });
    M[i].forEach((m, j) => { cell(S, `c${i}_${j}`, 12.4 + j * 6.4, y, m ? ['발생', 'occurs'] : ['방지', 'prevented'], { w: 6.1, h: 2.6, cls: 'cz-c db-t', s: hid(m ? C.bad : C.ok) }); S.set(`c${i}_${j}`, i + 1, { opacity: '1' }); });
    S.set('l' + i, i + 1, C.soft); if (i) S.set('l' + (i - 1), i + 1, C.idle);
  });
  S.set('l3', 5, C.idle);
  text(S, 'pg', 1, 17, ['기본값 · PostgreSQL·Oracle: READ COMMITTED · MySQL: REPEATABLE READ', 'Defaults · PostgreSQL, Oracle: READ COMMITTED · MySQL: REPEATABLE READ'], { cls: 'cz-t', s: hid() }); S.set('pg', 5, { opacity: '1' });
  S.cap(0, '격리 수준이 높을수록 이상 현상이 줄고 동시성은 떨어져요', 'Higher isolation: fewer anomalies, less concurrency').cap(1, '커밋 안 된 값까지 보여요', 'Even uncommitted data is visible')
    .cap(2, '커밋된 것만 · 다시 읽으면 값이 바뀔 수 있어요', 'Only committed data, but a re-read may change').cap(3, '같은 행은 같은 값 · 새 행이 끼어들 수 있어요', 'Same rows stay the same; new rows may appear')
    .cap(4, '차례로 실행한 것과 같아요 · 가장 느려요', 'As if run one by one · the slowest').cap(6, '대부분은 기본값 + 필요한 곳에만 잠금을 써요', 'Usually: the default level plus targeted locks');
  return S;
}
function sMVCC() {
  const S = scene({ id: 'db-mvcc', steps: 6, per: 1.2 });
  cell(S, 'v1', 11.5, 4, ['v1 · price = 100', 'v1 · price = 100'], { w: 9, h: 2.6, cls: 'cz-c db-t' });
  cell(S, 'v2', 11.5, 11, ['v2 · price = 120', 'v2 · price = 120'], { w: 9, h: 2.6, cls: 'cz-c db-t', s: hid({ 'border-style': 'dashed' }) });
  link(S, 'vl', [16, 6.6], [16, 11], 0, .1, { s: hid() });
  dot(S, 'r1', 4, 5.3, 'T15', { r: 1.4, s: C.ok }); dot(S, 'w', 28, 12.3, 'T20', { r: 1.4, s: hid(C.warn) }); dot(S, 'r2', 4, 12.3, 'T25', { r: 1.4, s: hid(C.cur) });
  arrow(S, 'ra', 5.6, 5.3, 11.3, 5.3, { s: hid(AR.ok) });
  arrow(S, 'wa', 26.4, 12.3, 20.7, 12.3, { s: hid(AR.warn) });
  arrow(S, 'r2a', 5.6, 12.3, 11.3, 12.3, { s: hid(AR.acc) });
  S.label('rv', { cls: 'cz-t db-b', x: 1.6, y: 7.3, w: 10 }, [[0, ''], [1, ['읽음: 100', 'reads 100']], [4, ['다시 읽음: 100', 'reads 100 again']]]);
  S.set('ra', 1, { opacity: '1' }).set('ra', 2, { opacity: '0' });
  S.set('w', 2, { opacity: '1' }).set('wa', 2, { opacity: '1' }).set('v2', 2, Object.assign({ opacity: '.6' }, C.cmp)).set('vl', 2, { opacity: '1' });
  S.set('v2', 3, { opacity: '1', 'border-style': 'solid', background: 'var(--accent-soft)', 'border-color': 'var(--accent)' }).set('wa', 3, { opacity: '0' });
  S.set('ra', 4, { opacity: '1' }); S.set('ra', 5, { opacity: '0' });
  S.set('r2', 5, { opacity: '1' }).set('r2a', 5, { opacity: '1' });
  text(S, 'r2v', 1.6, 14.3, ['읽음: 120', 'reads 120'], { cls: 'cz-t db-b', s: hid() }); S.set('r2v', 5, { opacity: '1' });
  S.cap(1, 'T15가 시작하며 스냅숏을 찍고 100을 읽어요', 'T15 starts with a snapshot and reads 100').cap(2, 'T20이 값을 바꾸면 덮어쓰지 않고 새 버전을 만들어요', 'T20 writes a new version instead of overwriting')
    .cap(3, 'T20 커밋', 'T20 commits').cap(4, 'T15는 여전히 자기 스냅숏(100)을 봐요', 'T15 still sees its snapshot (100)').cap(5, '나중에 시작한 T25는 120을 봐요', 'T25, started later, sees 120')
    .cap(6, '읽기와 쓰기가 서로 막지 않아요 · 옛 버전은 VACUUM이 정리', 'Readers and writers don’t block each other · VACUUM cleans old versions');
  return S;
}
function sWAL() {
  const S = scene({ id: 'db-wal', steps: 7, per: 1.05 });
  box(S, 'cl', 1, 2.5, 6, 3.2, ['앱', 'App']); box(S, 'mem', 12, 2.5, 8, 3.2, ['메모리 (버퍼)', 'Memory (buffer)']); box(S, 'df', 25, 2.5, 6, 3.2, ['데이터 파일', 'Data file']);
  text(S, 'wl', 9, 9.6, ['WAL 로그 (뒤에 이어 쓰기만)', 'WAL (append-only)'], { cls: 'cz-t' });
  ['#101', '#102', '#103'].forEach((t, i) => cell(S, 'w' + i, 9 + i * 4.8, 11, t, { w: 4.4, h: 2.2, cls: 'cz-c db-t', s: i < 2 ? { opacity: '.5' } : hid(C.cmp) }));
  dot(S, 'u', 7.8, 4.1, 'UPDATE', { r: 1.3, s: C.cur });
  S.move('u', 1, 16 - 1.3, 7.4 - 1.3).set('mem', 1, C.soft);
  S.set('w2', 2, { opacity: '1' }).move('u', 2, 19.4 - 1.3, 12.1 - 1.3).set('u', 2, { opacity: '0' });
  pill(S, 'ok', 1, 7, ['커밋 완료', 'committed'], { w: 6, h: 1.9, s: hid(C.ok) }); S.set('ok', 3, { opacity: '1' }).set('ok', 7, { opacity: '0' });
  S.label('dv', { cls: 'cz-t cz-tc', x: 25, y: 6.2, w: 6 }, [[0, ['옛 값', 'old']], [4, ['새 값 ✓', 'new ✓']]]);
  S.set('df', 4, C.ok);
  S.set('mem', 5, { opacity: '.2' }).set('df', 5, C.idle);
  S.label('dv2', { cls: 'cz-t cz-tc', x: 12, y: 6.2, w: 8 }, [[0, ''], [5, ['장애 · 메모리 내용 사라짐', 'crash · memory lost']], [6, ['재시작 · 로그 재실행', 'restart · replay log']], [7, '']]);
  S.set('mem', 6, { opacity: '1' }).set('w2', 6, C.soft).set('mem', 7, C.ok);
  S.cap(1, '변경은 먼저 메모리에서 하고', 'Changes happen in memory first').cap(2, '로그 끝에 기록(순차 쓰기라 빨라요)', 'and are appended to the log (fast, sequential)')
    .cap(3, '로그만 디스크에 쓰이면 커밋 완료', 'Once the log is on disk, the commit is done').cap(4, '데이터 파일은 나중에 모아서 써요 (체크포인트)', 'Data files are written later in batches (checkpoint)')
    .cap(5, '그 전에 서버가 죽어도', 'Even if the server dies first').cap(6, '로그를 다시 실행해 복구해요', 'replaying the log restores everything').cap(7, '복제·CDC도 이 로그를 활용해요', 'Replication and CDC reuse this log');
  return S;
}

/* ---------- scaling & NoSQL ---------- */
function sRepl() {
  const S = scene({ id: 'db-repl', steps: 6, per: 1.2 });
  box(S, 'app', 1, 8.6, 5.6, 3.2, ['앱', 'App']);
  box(S, 'p', 11, 3, 8.4, 3.6, ['주 서버 (쓰기)', 'Primary (writes)']);
  box(S, 'r1', 23, 3, 7.6, 3.6, ['복제본 1', 'Replica 1']); box(S, 'r2', 23, 13, 7.6, 3.6, ['복제본 2', 'Replica 2']);
  const mv = (k, a, b, st, lab, sty) => { dot(S, k, a[0], a[1], lab, { r: .9, s: hid(sty) }); S.set(k, st, { opacity: '1' }).move(k, st + 1, b[0] - .9, b[1] - .9).set(k, st + 2 > 6 ? 6 : st + 2, { opacity: '0' }); };
  mv('w', [7.4, 10.2], [10.4, 4.8], 0, 'W', C.warn);
  mv('s1', [20, 4.8], [22.4, 4.8], 1, 'log', C.soft);
  dot(S, 's2', 20, 6.6, 'log', { r: .9, s: hid(C.soft) }); S.set('s2', 2, { opacity: '1' }).move('s2', 4, 22.4 - .9, 14.8 - .9).set('s2', 5, { opacity: '0' });
  S.set('r1', 2, C.ok).set('r2', 4, C.ok);
  arrow(S, 'q1', 6.8, 9.6, 22.8, 5.6, { s: hid(AR.ok) }); arrow(S, 'q2', 6.8, 11, 22.8, 14.4, { s: hid(AR.red) });
  S.set('q1', 3, { opacity: '1' }).set('q2', 3, { opacity: '1' }).set('q1', 4, { opacity: '0' }).set('q2', 4, { opacity: '0' });
  text(S, 'n1', 14, 8.4, ['새 값 ✓', 'new ✓'], { cls: 'cz-t', s: hid() }); text(S, 'n2', 14, 13.4, ['옛 값 (지연) ✗', 'stale (lag) ✗'], { cls: 'cz-t', s: hid() });
  S.set('n1', 3, { opacity: '1' }).set('n2', 3, { opacity: '1' }).set('n1', 4, { opacity: '0' }).set('n2', 4, { opacity: '0' }).set('r2', 3, C.bad);
  S.set('p', 5, Object.assign({ opacity: '.35' }, C.bad)); S.label('r1l', { cls: 'cz-t cz-tc', x: 23, y: 7, w: 7.6 }, [[0, ''], [5, ['→ 주 서버로 승격', '→ promoted']]]);
  S.set('r1', 5, C.cur);
  S.cap(0, '쓰기는 주 서버에만', 'Writes go only to the primary').cap(1, '변경 로그를 복제본에 보내요', 'Its change log streams to replicas').cap(3, '읽기는 복제본으로 분산 · 늦게 따라오면 옛 값을 볼 수 있어요', 'Reads spread to replicas · a lagging one returns stale data')
    .cap(5, '주 서버가 죽으면 복제본을 승격 (페일오버)', 'If the primary dies, a replica is promoted (failover)').cap(6, '"방금 쓴 글이 안 보여요"는 복제 지연 때문인 경우가 많아요', '“My post vanished” is often replication lag');
  return S;
}
function sShard() {
  const S = scene({ id: 'db-shard', steps: 5, per: 1.2 });
  box(S, 'rt', 12, 1.6, 8, 3.2, ['라우터', 'Router']);
  const SX = [2, 12, 22];
  SX.forEach((x, i) => { box(S, 's' + i, x, 13.5, 8, 5, ''); text(S, 'sl' + i, x + .6, 13.9, [`샤드 ${i}`, `shard ${i}`], { cls: 'cz-t' }); });
  text(S, 'hf', 9, 6, 'shard = user_id % 3', { w: 14, cls: 'cz-t cz-tc cz-mono' });
  const ids = [7, 12, 5, 9, 1, 14];
  ids.forEach((id, i) => {
    const sh = id % 3, st = Math.floor(i / 2) + 1, slot = ids.slice(0, i).filter(v => v % 3 === sh).length;
    dot(S, 'k' + i, 16 + (i % 2 ? 1.2 : -1.2), 8.6, String(id), { r: 1, s: hid(C.cur) });
    S.set('k' + i, st, { opacity: '1' }).move('k' + i, st + 1 > 5 ? 5 : st + 1, SX[sh] + 1.8 + slot * 2.4 - 1 + 1, 16.6 - 1);
  });
  S.cap(1, '키로 어느 서버에 둘지 정해요', 'A key decides which server stores the row').cap(3, '데이터와 부하가 여러 대로 나뉘어요', 'Data and load spread across machines')
    .cap(4, '대신 샤드를 넘나드는 조인·트랜잭션이 어려워요', 'Cross-shard joins and transactions get hard').cap(5, '서버를 늘릴 때 재배치를 줄이려고 일관된 해싱을 써요', 'Consistent hashing limits reshuffling when you add servers');
  return S;
}
function sNoSQL() {
  const S = scene({ id: 'db-nosql', steps: 5, per: 1.3 });
  const Q = [['Key-Value', 'Redis · DynamoDB', 1.2, 1.2], ['Document', 'MongoDB · Firestore', 16.4, 1.2], ['Wide-column', 'Cassandra · HBase', 1.2, 11.2], ['Graph', 'Neo4j · Neptune', 16.4, 11.2]];
  Q.forEach(([t, ex, x, y], i) => { box(S, 'q' + i, x, y, 14.4, 9.4, '', { s: hid() }); text(S, 't' + i, x + .8, y + .6, t, { cls: 'cz-t db-b', s: hid() }); text(S, 'e' + i, x + .8, y + 8, ex, { cls: 'cz-t', s: hid() }); [`q${i}`, `t${i}`, `e${i}`].forEach(k => S.set(k, i + 1, { opacity: '1' })); });
  const ins = (k, i, x, y, w, h, t, st) => { cell(S, k, x, y, t, { w, h, cls: 'cz-c db-t db-code', s: hid(st) }); S.set(k, i + 1, { opacity: '1' }); };
  ins('kv0', 0, 2, 3.2, 5.2, 1.8, 'user:7', C.soft); ins('kv1', 0, 8, 3.2, 6.8, 1.8, '{…}', {}); ins('kv2', 0, 2, 5.4, 5.2, 1.8, 'cart:7', C.soft); ins('kv3', 0, 8, 5.4, 6.8, 1.8, '[3 items]', {});
  ins('dc', 1, 17.2, 3.2, 12.8, 4.2, '{ "name": "Kim", "tags": ["a","b"] }', C.soft);
  ins('wc0', 2, 2, 13.2, 12.8, 1.8, 'row1: a b c', {}); ins('wc1', 2, 2, 15.4, 12.8, 1.8, 'row2: a d e f g', {});
  node(S, 'g0', 19.5, 15.5, 'A', { r: 1.2, s: hid(C.soft) }); node(S, 'g1', 24, 13.6, 'B', { r: 1.2, s: hid(C.soft) }); node(S, 'g2', 27.5, 16.6, 'C', { r: 1.2, s: hid(C.soft) });
  edge(S, 'ge0', 19.5, 15.5, 24, 13.6, { s: hid() }); edge(S, 'ge1', 24, 13.6, 27.5, 16.6, { s: hid() }); ['g0', 'g1', 'g2', 'ge0', 'ge1'].forEach(k => S.set(k, 4, { opacity: '1' }));
  S.cap(1, '키로 값을 바로 꺼내요 · 캐시·세션', 'Get a value by key · caches, sessions').cap(2, 'JSON 문서째 저장 · 스키마가 유연', 'Store whole JSON documents · flexible schema')
    .cap(3, '행마다 열이 달라도 돼요 · 대량 쓰기·시계열', 'Rows can have different columns · heavy writes, time series').cap(4, '관계 자체가 데이터 · 추천·소셜 그래프', 'Relationships are the data · recommendations, social')
    .cap(5, '수평 확장이 쉬운 대신 조인·트랜잭션은 제한적이에요', 'They scale out easily but limit joins and transactions');
  return S;
}
function sCache() {
  const S = scene({ id: 'db-cache', steps: 7, per: 1 });
  box(S, 'app', 1, 8.4, 6, 3.4, ['앱', 'App']); box(S, 'rd', 13, 2.4, 7.4, 3.4, ['캐시 (Redis)', 'Cache (Redis)']); box(S, 'db', 13, 14.6, 7.4, 3.4, 'DB');
  S.label('t', { cls: 'cz-t cz-tc', x: 22, y: 9.4, w: 9 }, [[0, ''], [1, ['캐시 미스', 'miss']], [2, ['DB 조회 (느림)', 'DB read (slow)']], [3, ['캐시에 저장 (TTL 60s)', 'store (TTL 60s)']], [5, ['캐시 히트 · 1ms', 'hit · 1 ms']], [7, ['데이터가 바뀌면 삭제', 'delete on change']]]);
  const at = (k, x, y, st) => S.move(k, st, x - 1, y - 1);
  dot(S, 'a', 8.2, 10.1, '1', { r: 1, s: C.cur }); dot(S, 'b', 8.2, 10.1, '2', { r: 1, s: hid(C.cur) });
  at('a', 11.8, 4.1, 1); S.set('rd', 1, C.bad);
  at('a', 11.8, 16.3, 2); S.set('rd', 2, C.idle).set('db', 2, C.cmp);
  at('a', 11.8, 4.1, 3); S.set('db', 3, C.idle).set('rd', 3, C.soft);
  at('a', 8.2, 10.1, 4); S.set('rd', 4, C.idle).set('a', 4, C.ok).set('a', 5, { opacity: '0' });
  S.set('b', 5, { opacity: '1' }); at('b', 11.8, 4.1, 5); S.set('rd', 5, C.ok); at('b', 8.2, 10.1, 6); S.set('b', 6, C.ok).set('rd', 6, C.idle);
  S.set('rd', 7, C.cmp);
  S.cap(0, '캐시 어사이드: 앱이 캐시를 먼저 확인', 'Cache-aside: the app checks the cache first').cap(1, '없으면', 'On a miss').cap(2, 'DB에서 읽고', 'read from the DB').cap(3, '캐시에 넣어 둬요', 'and store it in the cache')
    .cap(5, '다음 요청은 캐시에서 바로', 'The next request is served from the cache').cap(7, '어려운 건 무효화 · 오래된 값이 남지 않게 TTL과 삭제를 함께 써요', 'The hard part is invalidation: combine TTLs and deletes');
  return S;
}

window.UX = page([
  sec('db-model', '모델링', 'Modeling', '데이터 모델과 설계', 'Data models and design',
    '데이터를 어떤 모양의 표로 나눠 담을지 정하는 단계예요.', 'Deciding how data is split into tables.', [
    item('db-table', '테이블 · 키', 'Tables · Keys', '관계형 DB는 데이터를 테이블(행과 열)에 담고, 기본 키로 행을 구분하고, 외래 키로 다른 테이블의 행을 가리켜요.', '기본 키는 의미 없는 값(자동 증가, UUID)을 쓰는 게 안전해요. 외래 키 제약은 잘못된 참조를 DB 차원에서 막아 줘요.', 'A relational database stores data in tables of rows and columns, identifies rows by primary keys and links tables through foreign keys.', 'Prefer meaningless primary keys (auto-increment, UUID). Foreign key constraints stop bad references at the database level.', sTable()),
    item('db-norm', '정규화', 'Normalization', '같은 정보가 여러 곳에 반복되지 않도록 테이블을 쪼개는 과정이에요. 반복이 있으면 일부만 고쳐서 데이터가 어긋나요.', '기본은 3정규형까지 맞추고, 조회가 너무 느린 곳만 일부러 합쳐요(역정규화). 이때는 동기화 책임이 생겨요.', 'Splitting tables so the same fact is not repeated; repetition lets copies drift apart when only some are updated.', 'Aim for third normal form, then denormalize deliberately only where reads are too slow, accepting the job of keeping copies in sync.', sNorm()),
    item('db-er', 'ER 모델 · 관계', 'ER model · Relationships', '엔티티(학생, 과목)와 관계(1:1, 1:N, N:M)를 그림으로 설계해요. N:M 관계는 연결 테이블로 풀어요.', '설계 리뷰 때 ERD를 그려 보면 빠진 관계나 중복을 일찍 찾아요. 연결 테이블에는 관계 자체의 속성(수강일, 성적)을 담아요.', 'Model entities (students, courses) and relationships (1:1, 1:N, N:M) as a diagram; N:M becomes a join table.', 'Drawing an ERD in design reviews catches missing or duplicate relations early. Join tables can hold attributes of the relationship itself.', sER())
  ]),
  sec('db-sql', 'SQL', 'SQL', 'SQL 기본기', 'SQL essentials',
    '데이터를 꺼내고 합치고 요약하는 질의 언어예요.', 'The query language for fetching, combining and summarizing data.', [
    item('db-select', 'SELECT 실행 순서', 'SELECT execution order', 'SQL은 SELECT부터 쓰지만 실제로는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT 순서로 실행돼요.', 'WHERE에서 SELECT의 별칭을 못 쓰는 이유, HAVING과 WHERE의 차이가 모두 이 순서로 설명돼요. 행을 일찍 줄일수록 빨라요.', 'SQL is written starting with SELECT, but it runs FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.', 'This order explains why WHERE cannot use SELECT aliases and how HAVING differs from WHERE. Filtering rows early is faster.', sSelect()),
    item('db-join', '조인', 'JOIN', '두 테이블에서 키가 같은 행끼리 짝지어 하나의 결과로 합쳐요. INNER는 짝이 있는 것만, LEFT는 왼쪽을 모두 남겨요.', 'LEFT JOIN 뒤에 WHERE로 오른쪽 열을 거르면 INNER JOIN처럼 돼 버려요. 조인 키에는 인덱스를 꼭 거세요.', 'Combines two tables by pairing rows with matching keys. INNER keeps only matches; LEFT keeps every left row.', 'Filtering right-side columns in WHERE after a LEFT JOIN silently turns it into an INNER JOIN. Always index join keys.', sJoin()),
    item('db-group', 'GROUP BY · 집계', 'GROUP BY · Aggregates', '같은 값을 가진 행을 묶어 COUNT, SUM, AVG 같은 집계로 한 줄씩 요약해요. 묶은 뒤의 조건은 HAVING으로 걸러요.', '대시보드·리포트 쿼리의 대부분이 이것이에요. 큰 테이블에선 미리 집계한 테이블이나 머티리얼라이즈드 뷰를 써요.', 'Groups rows with the same value and summarizes each group with aggregates like COUNT, SUM and AVG; HAVING filters groups.', 'Most dashboard and report queries are this. On big tables, use pre-aggregated tables or materialized views.', sGroup())
  ]),
  sec('db-perf', '인덱스·성능', 'Indexes & performance', '빠르게 찾는 법', 'Finding things fast',
    '느린 쿼리의 대부분은 인덱스와 쿼리 패턴 문제예요.', 'Most slow queries come down to indexes and query patterns.', [
    item('db-index', '인덱스 (B+트리)', 'Index · B+ tree', '인덱스는 컬럼 값을 정렬해 둔 트리라서, 전체를 읽지 않고 몇 단계 만에 원하는 행을 찾아요.', 'EXPLAIN으로 인덱스를 타는지 확인하세요. 인덱스는 쓰기를 느리게 하고 공간을 차지하니 자주 쓰는 조건에만 만들어요.', 'An index is a sorted tree of column values, so the right row is found in a few steps instead of reading everything.', 'Check with EXPLAIN that queries use it. Indexes slow writes and take space, so add them only for frequent conditions.', sIndex()),
    item('db-comp', '복합 인덱스', 'Composite index', '여러 컬럼을 묶은 인덱스는 앞 컬럼 순서대로 정렬돼요. 그래서 앞 컬럼 없이 뒤 컬럼만으로는 인덱스를 쓰기 어려워요.', '(last, first) 인덱스는 last 조건, last+first 조건에 쓰이지만 first만으로는 못 써요. 컬럼 순서가 성능을 좌우해요.', 'A multi-column index is sorted by its first column, then the next, so it rarely helps a query on a later column alone.', 'An index on (last, first) serves “last” and “last + first” queries, but not “first” alone. Column order decides performance.', sComp()),
    item('db-n1', 'N+1 쿼리', 'N+1 queries', '목록을 1번 가져온 뒤, 항목마다 관련 데이터를 따로 조회해서 쿼리가 1+N번 나가는 문제예요.', 'ORM의 지연 로딩에서 흔해요. 개발 땐 데이터가 적어 모르다가 운영에서 터져요. JOIN, IN 절, fetch join, DataLoader로 묶으세요.', 'Fetching a list once and then querying related data separately for every item: 1 + N queries.', 'Common with ORM lazy loading; invisible with little dev data, painful in production. Batch with JOINs, IN clauses, fetch joins or DataLoader.', sN1())
  ]),
  sec('db-trx', '트랜잭션', 'Transactions', '트랜잭션과 동시성', 'Transactions and concurrency',
    '여러 작업을 하나로 묶고, 동시에 일어나는 요청을 안전하게 처리해요.', 'Grouping work into one unit and handling concurrent requests safely.', [
    item('db-acid', 'ACID', 'ACID', '트랜잭션은 원자성, 일관성, 격리성, 지속성을 보장해요. 돈·재고처럼 틀리면 안 되는 데이터의 기본이에요.', '분산 시스템이나 NoSQL은 성능과 확장을 위해 일부를 완화하기도 해요(BASE). 무엇을 포기했는지 알고 써야 해요.', 'Transactions guarantee atomicity, consistency, isolation and durability: the baseline for money, stock and anything that must be right.', 'Distributed stores and NoSQL may relax some of these (BASE) for scale. Know what was traded away.', sACID()),
    item('db-tx', '커밋과 롤백', 'Commit · Rollback', 'BEGIN으로 시작한 변경은 COMMIT해야 확정되고, 중간에 실패하면 ROLLBACK으로 모두 되돌려요.', '트랜잭션 안에서 외부 API 호출처럼 오래 걸리는 일을 하면 잠금이 길어져요. 트랜잭션은 짧게 유지하세요.', 'Changes after BEGIN become permanent only on COMMIT; if anything fails, ROLLBACK undoes them all.', 'Slow work inside a transaction, like external API calls, holds locks for long. Keep transactions short.', sTx()),
    item('db-iso', '격리 수준', 'Isolation levels', '동시에 실행되는 트랜잭션이 서로의 변경을 얼마나 볼 수 있는지 정하는 단계예요. 높을수록 안전하지만 느려요.', '재고 차감처럼 경합이 있는 곳은 SELECT … FOR UPDATE나 낙관적 락(버전 컬럼)을 함께 써요.', 'How much concurrent transactions can see of each other’s changes; higher levels are safer but slower.', 'For contended updates like stock counts, add SELECT … FOR UPDATE or optimistic locking with a version column.', sIso()),
    item('db-mvcc', 'MVCC', 'MVCC · Multiversion concurrency', '값을 덮어쓰지 않고 새 버전을 만들어, 읽는 트랜잭션은 시작 시점의 스냅숏을 보게 해요. 읽기와 쓰기가 서로를 막지 않아요.', 'PostgreSQL, MySQL InnoDB, Oracle이 모두 써요. 오래 열린 트랜잭션은 옛 버전 정리를 막아 테이블이 부풀어요.', 'Instead of overwriting, writes create new versions and readers see the snapshot from when they started, so reads and writes don’t block each other.', 'PostgreSQL, InnoDB and Oracle all use it. A long-open transaction blocks cleanup of old versions and bloats tables.', sMVCC()),
    item('db-wal', 'WAL · 로그 선행 기록', 'Write-ahead logging', '데이터 파일을 고치기 전에 변경 내용을 로그에 먼저 순서대로 기록해요. 서버가 죽어도 로그를 다시 실행해 복구해요.', '순차 쓰기라 빠르고, 복제·특정 시점 복구(PITR)·CDC도 이 로그를 써요. 디스크 fsync 설정이 지속성을 좌우해요.', 'Every change is appended to a log before data files are touched; after a crash the log is replayed to recover.', 'Sequential writes are fast, and replication, point-in-time recovery and CDC all reuse the log. fsync settings decide real durability.', sWAL())
  ]),
  sec('db-scale', '확장·NoSQL', 'Scaling & NoSQL', '더 많은 데이터와 요청', 'More data, more requests',
    '한 대로 감당이 안 될 때 쓰는 방법들이에요.', 'What to do when one machine is not enough.', [
    item('db-repl', '복제', 'Replication', '주 서버의 변경 로그를 복제본에 보내 같은 데이터를 유지해요. 읽기를 나누고, 장애 때 복제본을 승격해요.', '비동기 복제는 지연이 있어서 방금 쓴 데이터를 복제본에서 못 읽을 수 있어요. 중요한 읽기는 주 서버로 보내세요.', 'The primary streams its change log to replicas so they hold the same data; reads are spread out and a replica takes over on failure.', 'Asynchronous replication lags, so a replica may miss what you just wrote. Send critical reads to the primary.', sRepl()),
    item('db-shard', '샤딩', 'Sharding', '데이터를 키 기준으로 나눠 여러 DB 서버에 나눠 담아요. 한 대의 용량과 쓰기 한계를 넘어설 수 있어요.', '샤드 키를 잘못 고르면 한쪽에 몰려요(핫스팟). 샤드 간 조인이 어려워서 최후의 수단으로 쓰고, 먼저 복제·캐시·파티셔닝을 검토하세요.', 'Data is split by key across several database servers to go beyond one machine’s capacity and write limits.', 'A bad shard key creates hotspots, and cross-shard joins are hard, so treat it as a last resort after replicas, caching and partitioning.', sShard()),
    item('db-nosql', 'NoSQL 종류', 'NoSQL families', '키-값, 문서, 와이드 컬럼, 그래프처럼 표가 아닌 모양으로 데이터를 저장하는 DB들이에요.', '접근 패턴이 단순하고 규모가 크면 NoSQL이 유리하고, 관계와 트랜잭션이 중요하면 관계형이 유리해요. 둘을 함께 쓰는 경우가 많아요.', 'Databases that store data in shapes other than tables: key-value, document, wide-column and graph.', 'NoSQL suits simple access patterns at large scale; relational suits rich relations and transactions. Many systems use both.', sNoSQL()),
    item('db-cache', '캐시 (캐시 어사이드)', 'Caching · Cache-aside', '자주 읽는 데이터를 메모리 캐시(Redis 등)에 두고, 없을 때만 DB에서 읽어 채워요.', '캐시 무효화가 가장 어려워요. TTL을 두고, 데이터가 바뀌면 캐시를 지우세요. 인기 키가 동시에 만료되면 DB가 몰려 죽는 캐시 스탬피드도 조심해요.', 'Keep frequently read data in an in-memory cache such as Redis, and read from the database only on a miss.', 'Invalidation is the hard part: set TTLs and delete on change. Beware stampedes when a hot key expires and everyone hits the database.', sCache())
  ])
]);
window.UX[0].css += `
.os-lg .in{font-size:.9em;font-weight:700;color:var(--ink)}
.db-t .in{font-size:.66em;font-weight:600}
.db-h{font-weight:800}
.db-h .in{font-weight:800}
.db-code{place-items:center start!important;padding-left:.7em}
.db-code .in{font-family:var(--f-mono);font-size:.62em}
.db-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.db-big .in{font-size:1.25em;font-weight:800;color:var(--ink)}
.db-letter .in{font-size:2.4em;font-weight:900;color:var(--accent);line-height:1}`;
})();
