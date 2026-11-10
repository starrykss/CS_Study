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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'dbx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono dbx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono dbx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c dbx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono dbx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c dbx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'dbx-s dbx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono dbx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono dbx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono dbx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono dbx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono dbx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'dbx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'dbx-xs', 5));


const CSSX = `
.dbx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.dbx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.dbx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.dbx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.dbx-r .in{color:var(--danger);font-weight:800}
.dbx-g .in{color:var(--ok);font-weight:800}
.dbx-a .in{color:var(--accent);font-weight:800}
.dbx-w .in{color:var(--warn);font-weight:800}
.dbx-c .in{font-size:.6em;font-weight:700}
.dbx-c2 .in{font-size:.5em;font-weight:700}
.dbx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.dbx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const tb = (S, p, x, y, ws, rows, st, o = {}) => { const rh = o.rh || 1.3; rows.forEach((r, i) => { let cx = x; r.forEach((v, j) => { box2(S, `${p}${i}_${j}`, cx, y + i * rh, ws[j] - .1, rh - .12, v, i === 0 ? (o.hc || 'accent') : (o.c || 'line'), st, { pct: i === 0 ? 30 : 40 }); cx += ws[j]; }); }); return i => y + i * rh; };
const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };
const rowSt = (S, p, i, n, step, sty) => { for (let j = 0; j < n; j++) S.set(`${p}${i}_${j}`, step, sty); };
const rowT = (S, p, i, n, list) => { for (let j = 0; j < n; j++) tsets(S, `${p}${i}_${j}`, list); };

/* ================= modeling ================= */
function sRelalg() {
  const S = scene({ id: 'db-relalg', steps: 5, per: 1.6 });
  T(S, 'et', 1, .2, 'emp', 'cz-mono dbx-s', 0);
  tb(S, 'e', 1, 1.1, [4, 3, 3], [['name', 'dept', 'salary'], ['Kim', 'dev', '500'], ['Lee', 'ops', '400'], ['Park', 'dev', '600'], ['Choi', 'hr', '450']], 0);
  T(S, 'dt', 12.5, .2, 'dept', 'cz-mono dbx-s', 0);
  tb(S, 'd', 12.5, 1.1, [3, 3], [['dept', 'floor'], ['dev', '3'], ['ops', '2'], ['hr', '1']], 0);
  [2, 4].forEach(i => { rowSt(S, 'e', i, 3, 1, { opacity: '.3' }); rowSt(S, 'e', i, 3, 3, { opacity: '1' }); });
  [1, 3].forEach(i => { rowT(S, 'e', i, 3, [[1, 'warn', 35], [3, 'line', 40]]); tsets(S, `e${i}_0`, [[2, 'ok', 50]]); S.set(`e${i}_1`, 2, { opacity: '.3' }); S.set(`e${i}_2`, 2, { opacity: '.3' }); S.set(`e${i}_1`, 3, { opacity: '1' }); S.set(`e${i}_2`, 3, { opacity: '1' }); });
  T(S, 'rt', 20, .2, 'emp ⋈ dept', 'cz-mono dbx-s dbx-g', 3);
  tb(S, 'r', 20, 1.1, [4, 3, 3], [['name', 'dept', 'floor'], ['Kim', 'dev', '3'], ['Lee', 'ops', '2'], ['Park', 'dev', '3'], ['Choi', 'hr', '1']], 3, { hc: 'ok' });
  notes(S, 'n', 7.9, [['σ (선택) dept = dev: 조건에 맞는 행만 → Kim, Park', 'σ (select) dept = dev: keep matching rows → Kim, Park'], ['π (투영) name: 원하는 열만 → Kim, Park의 이름', 'π (project) name: keep chosen columns → their names'], ['⋈ (조인): dept 값이 같은 행끼리 이어 붙여요', '⋈ (join): glue rows with equal dept values'], ['SQL은 이런 연산의 식(트리)으로 바뀌어 최적화돼요', 'SQL compiles to a tree of these operators and is optimized']], 'dbx-s');
  code(S, 'cd', 1, 9.4, 30, ["SELECT name FROM emp WHERE dept = 'dev';", "π name ( σ dept = 'dev' ( emp ) )"], [], { st: 4 });
  T(S, 'op', 1, 12.6, ['옵티마이저는 결과가 같은 더 싼 식으로 바꿔요 (선택을 조인 아래로 밀어 내리기)', 'the optimizer rewrites it to a cheaper equivalent (pushing selections below joins)'], 'dbx-xs dbx-a', 4);
  fin(S, 'z', 14.4, [['관계 대수: 테이블(관계)을 받아 테이블을 돌려주는 연산들 — σ 선택, π 투영, ⋈ 조인, ∪, −, ×', 'relational algebra: operators taking tables (relations) to tables — σ, π, ⋈, ∪, −, ×', 'dbx-xs dbx-a'], ['결과도 테이블이라 연산을 자유롭게 조합할 수 있어요', 'results are tables too, so operators compose freely'], ['SQL은 “무엇을” 말하고, 관계 대수는 “어떤 순서로” 계산할지 나타내요', 'SQL says what you want; relational algebra spells out an order of evaluation']]);
  S.cap(1, 'σ 선택: 행 고르기', 'σ select: pick rows').cap(2, 'π 투영: 열 고르기', 'π project: pick columns').cap(3, '⋈ 조인: 이어 붙이기', '⋈ join: glue tables').cap(4, 'SQL과의 관계', 'How SQL relates').cap(5, '관계 대수', 'Relational algebra');
  return S;
}
function sNull() {
  const S = scene({ id: 'db-null', steps: 5, per: 1.6 });
  T(S, 'ut', 1, .2, 'users', 'cz-mono dbx-s', 0);
  tb(S, 'u', 1, 1.1, [4, 3.4], [['name', 'age'], ['Kim', '20'], ['Lee', 'NULL'], ['Park', '35']], 0);
  tsets(S, 'u2_1', [[1, 'warn', 40]]);
  T(S, 'q1', 9.6, 1.4, 'age > 30  → Park', 'cz-mono dbx-xs', 1); T(S, 'q2', 9.6, 2.5, 'age <= 30 → Kim', 'cz-mono dbx-xs', 1); T(S, 'q3', 9.6, 3.6, ['Lee는 어디에도 없어요!', 'Lee is in neither!'], 'dbx-xs dbx-r', 1);
  T(S, 'tt', 20, .2, ['AND의 진리표 (U = UNKNOWN)', 'AND truth table (U = UNKNOWN)'], 'dbx-xs dbx-a', 2);
  const TV = [['AND', 'T', 'F', 'U'], ['T', 'T', 'F', 'U'], ['F', 'F', 'F', 'F'], ['U', 'U', 'F', 'U']];
  TV.forEach((r, i) => r.forEach((v, j) => box2(S, `t${i}_${j}`, 20 + j * 2.6, 1.1 + i * 1.3, 2.5, 1.18, v, i === 0 || j === 0 ? 'accent' : v === 'U' ? 'warn' : v === 'T' ? 'ok' : 'line', 2, { pct: 30 })));
  T(S, 'u1', 20, 6.6, 'NULL = NULL → UNKNOWN', 'cz-mono dbx-xs dbx-w', 2); T(S, 'u2', 20, 7.6, ['WHERE는 TRUE인 행만 남겨요', 'WHERE keeps only TRUE rows'], 'dbx-xs', 2);
  code(S, 'c3', 1, 6.4, 17, [['WHERE age IS NULL        -- = NULL은 안 돼요', 'WHERE age IS NULL        -- not = NULL'], ['COALESCE(age, 0)         -- NULL이면 0', 'COALESCE(age, 0)         -- 0 when NULL']], [], { st: 3 });
  T(S, 'p1', 1, 10.2, ['함정 1: x NOT IN (1, NULL) → 결과가 항상 비어요', 'trap 1: x NOT IN (1, NULL) → always empty'], 'cz-mono dbx-xs dbx-r', 4);
  T(S, 'p2', 1, 11.3, ['함정 2: COUNT(age) = 2, COUNT(*) = 3 (집계는 NULL을 건너뛰어요)', 'trap 2: COUNT(age) = 2, COUNT(*) = 3 (aggregates skip NULL)'], 'cz-mono dbx-xs dbx-r', 4);
  T(S, 'p3', 1, 12.4, ['함정 3: UNIQUE 열에 NULL이 여러 개 들어갈 수 있어요 (DB마다 다름)', 'trap 3: a UNIQUE column may hold several NULLs (varies by DB)'], 'dbx-xs dbx-r', 4);
  fin(S, 'z', 14.2, [['NULL은 값이 아니라 “모름”: 비교하면 TRUE도 FALSE도 아닌 UNKNOWN', 'NULL means “unknown”, not a value: comparisons yield UNKNOWN, neither TRUE nor FALSE', 'dbx-xs dbx-a'], ['IS NULL / IS NOT NULL, COALESCE, NOT EXISTS로 다뤄요', 'handle it with IS NULL / IS NOT NULL, COALESCE and NOT EXISTS'], ['가능하면 NOT NULL 제약과 기본값으로 NULL 자체를 줄여요', 'where possible, avoid NULLs with NOT NULL constraints and defaults']]);
  S.cap(1, '사라진 행', 'The vanishing row').cap(2, '3값 논리', 'Three-valued logic').cap(3, 'NULL을 제대로 다루기', 'Handling NULL properly').cap(4, '자주 빠지는 함정', 'Common traps').cap(5, 'NULL과 3값 논리', 'NULL and three-valued logic');
  return S;
}

/* ================= SQL ================= */
function sSubq() {
  const S = scene({ id: 'db-subq', steps: 5, per: 1.6 });
  T(S, 'ct', 1, .2, 'customers', 'cz-mono dbx-s', 0);
  tb(S, 'c', 1, 1.1, [2.6, 4.4], [['id', 'name'], ['1', 'Kim'], ['2', 'Lee'], ['3', 'Park']], 0);
  T(S, 'ot', 9, .2, 'orders', 'cz-mono dbx-s', 0);
  tb(S, 'o', 9, 1.1, [3.6, 3.6], [['cust_id', 'amount'], ['1', '30'], ['3', '12'], ['1', '50'], ['3', '8']], 0);
  code(S, 'cd', 17.6, .8, 13.4, ['SELECT name', 'FROM customers c', 'WHERE EXISTS (', '  SELECT 1 FROM orders o', '  WHERE o.cust_id = c.id', ');'], [[4, 2]], { hoff: 4 });
  rowT(S, 'c', 1, 2, [[2, 'ok', 40]]); rowT(S, 'o', 1, 2, [[2, 'warn', 40], [3, 'line', 40]]);
  rowT(S, 'c', 2, 2, [[3, 'danger', 35]]); rowT(S, 'c', 3, 2, [[3, 'ok', 40]]); rowT(S, 'o', 2, 2, [[3, 'warn', 40], [4, 'line', 40]]);
  notes(S, 'n', 8.4, [['주문을 한 번이라도 한 고객은?', 'which customers have ordered?'], ['c.id = 1: 안쪽 쿼리 실행 → 첫 일치에서 멈춤 ✓', 'c.id = 1: run the inner query → stop at first match ✓'], ['c.id = 2: 일치 없음 ✗ · c.id = 3: 일치 ✓', 'c.id = 2: no match ✗ · c.id = 3: match ✓'], ['결과: Kim, Park', 'result: Kim, Park']], 'dbx-xs');
  T(S, 'j1', 1, 10, ['JOIN으로 쓰면 주문이 2건인 Kim이 두 번 나와요 → DISTINCT 필요', 'a JOIN returns Kim twice (two orders) → needs DISTINCT'], 'dbx-xs dbx-w', 4);
  T(S, 'j2', 1, 11.1, ['EXISTS는 첫 일치에서 멈추는 세미 조인이라 중복이 없어요', 'EXISTS is a semi-join that stops at the first match: no duplicates'], 'dbx-xs dbx-g', 4);
  T(S, 'j3', 1, 12.2, ['NOT EXISTS는 NULL에도 안전 · NOT IN은 NULL이 하나만 있어도 결과가 비어요', 'NOT EXISTS is NULL-safe · NOT IN returns nothing if any NULL appears'], 'dbx-xs dbx-r', 4);
  fin(S, 'z', 14, [['서브쿼리: 쿼리 안의 쿼리 · 상관 서브쿼리는 바깥 행의 값을 참조해요', 'a subquery is a query inside a query; a correlated one references the outer row', 'dbx-xs dbx-a'], ['스칼라(값 하나), IN/EXISTS(존재 여부), FROM 절(파생 테이블)에 쓸 수 있어요', 'used as a scalar, with IN/EXISTS, or in FROM as a derived table'], ['옵티마이저가 상관 서브쿼리를 조인으로 바꿔 실행하는 경우가 많아요', 'optimizers often rewrite correlated subqueries into joins']]);
  S.cap(1, '주문한 고객 찾기', 'Find customers who ordered').cap(2, '바깥 행마다 검사', 'Check per outer row').cap(3, '없으면 탈락', 'No match, no row').cap(4, 'JOIN · IN과 비교', 'Compared with JOIN and IN').cap(5, '서브쿼리와 EXISTS', 'Subqueries and EXISTS');
  return S;
}
function sWindow() {
  const S = scene({ id: 'db-window', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 30, ['SELECT dept, name, amt, RANK() OVER w AS rk, SUM(amt) OVER w AS run', 'FROM sales WINDOW w AS (PARTITION BY dept ORDER BY amt DESC);'], [[1, 2]], { hoff: 5 });
  const R = [['dev', 'Park', '600', '1', '600'], ['dev', 'Kim', '500', '2', '1100'], ['dev', 'Lee', '300', '3', '1400'], ['ops', 'Choi', '450', '1', '450'], ['ops', 'Han', '400', '2', '850']], W = [3, 3.6, 3, 2.6, 3.4];
  ['dept', 'name', 'amt', 'rk', 'run'].forEach((h, j) => box2(S, 'h' + j, 1 + W.slice(0, j).reduce((a, b) => a + b, 0), 4, W[j] - .1, 1.18, h, j > 2 ? 'ok' : 'accent', j > 2 ? j : 0, { pct: 30 }));
  R.forEach((r, i) => { let x = 1; r.forEach((v, j) => { const y = 5.4 + i * 1.3 + (i > 2 ? .5 : 0); box2(S, `r${i}_${j}`, x, y, W[j] - .1, 1.18, j > 2 ? '' : v, 'line', 0, { pct: 40 }); if (j > 2) T(S, `v${i}_${j}`, x, y + .3, v, 'cz-tc cz-mono dbx-xs dbx-g', j, { w: W[j] - .1 }); x += W[j]; }); });
  frame(S, 'p0', .8, 5.25, 15.8, 4.1, 'warn', 2, { w: .12, r: .3 }); frame(S, 'p1', .8, 9.75, 15.8, 2.8, 'warn', 2, { w: .12, r: .3 });
  [['영업 사원별 매출 표', 'sales per person'], ['PARTITION BY dept: 부서별로 나눠 정렬', 'PARTITION BY dept: split, then sort'], ['RANK(): 파티션 안의 순위', 'RANK(): rank within the partition'], ['SUM() OVER: 위에서부터 누적 합계', 'SUM() OVER: running total from the top']].forEach((t, i) => T(S, 'n' + i, 18, 5.4, t, 'dbx-xs dbx-a', i + 1, { off: i + 2 }));
  T(S, 'gb', 18, 9.9, ['GROUP BY dept라면 → 2행으로 접혀요', 'GROUP BY dept → collapses into 2 rows'], 'dbx-xs dbx-w', 4);
  T(S, 'gb2', 18, 10.9, ['윈도 함수는 5행을 그대로 두고 열만 더해요', 'window functions keep all 5 rows and add columns'], 'dbx-xs dbx-g', 4);
  fin(S, 'z', 13.6, [['윈도 함수: 행을 줄이지 않고 “주변 행들”을 보고 값을 계산해요', 'window functions compute over surrounding rows without collapsing them', 'dbx-xs dbx-a'], ['ROW_NUMBER, RANK, LAG/LEAD(이전·다음 행), 이동 평균(ROWS BETWEEN 6 PRECEDING …)', 'ROW_NUMBER, RANK, LAG/LEAD (previous/next row), moving averages (ROWS BETWEEN 6 PRECEDING …)'], ['부서별 1등, 전월 대비 증감, 누적 매출 같은 분석 쿼리의 기본기예요', 'the basis of “top per group”, month-over-month change and running totals']]);
  S.cap(1, '원본 행', 'The source rows').cap(2, '파티션으로 나누기', 'Partition the rows').cap(3, '파티션 안의 순위', 'Rank within each partition').cap(4, '누적 합계', 'A running total').cap(5, '윈도 함수', 'Window functions');
  return S;
}
function sCte() {
  const S = scene({ id: 'db-cte', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 16.6, ['WITH RECURSIVE sub AS (', '  SELECT id, name, 0 AS lvl', '  FROM emp WHERE id = 1', '  UNION ALL', '  SELECT e.id, e.name, s.lvl + 1', '  FROM emp e JOIN sub s', '    ON e.boss_id = s.id', ')', 'SELECT * FROM sub;'], [[1, 2], [4, 3]], { hoff: 5 });
  const N = { ceo: [24.5, 1.8, 'CEO', 2], kim: [21, 5.2, 'Kim', 3], lee: [28, 5.2, 'Lee', 3], park: [21, 8.6, 'Park', 4], choi: [21, 12, 'Choi', 4] };
  Object.entries(N).forEach(([k, [x, y, l, s]]) => { stt(S, 'n' + k, x, y, l, 'accent', 1, { r: 1.1 }); tsets(S, 'n' + k, [[s, 'ok', 45]]); });
  [['ceo', 'kim'], ['ceo', 'lee'], ['kim', 'park'], ['park', 'choi']].forEach(([a, b], i) => gs(S, 'e' + i, N[a], N[b], 1, 'ink-3', .1, 1.1));
  [['CEO · 0', 2], ['Kim · 1', 3], ['Lee · 1', 3], ['Park · 2', 4], ['Choi · 3', 4]].forEach(([l, s], i) => box2(S, 'o' + i, 25.4, 7.6 + i * 1.3, 5.6, 1.15, l, 'ok', s, { pct: 30 }));
  T(S, 'ot', 25.4, 6.7, ['결과 (이름 · lvl)', 'result (name · lvl)'], 'dbx-xs', 2);
  notes(S, 'n', 13.8, [['emp(id, name, boss_id): 상사를 가리키는 트리', 'emp(id, name, boss_id): a tree of bosses'], ['앵커: 시작 행 CEO (lvl 0)', 'anchor: the starting row, CEO (lvl 0)'], ['재귀 단계: 직전 결과와 조인 → 부하 Kim, Lee (lvl 1)', 'recursive step: join with the last result → reports Kim, Lee (lvl 1)'], ['반복 → Park, Choi · 새 행이 없으면 멈춰요', 'repeat → Park, Choi · stops when no new rows appear']], 'dbx-xs');
  fin(S, 'z', 14.6, [['CTE(WITH): 이름 붙은 임시 결과로 긴 쿼리를 단계별로 읽기 쉽게 나눠요', 'a CTE (WITH) names an intermediate result to split long queries into readable steps', 'dbx-xs dbx-a'], ['재귀 CTE: 조직도, 카테고리 트리, 그래프 도달 가능성(추이적 폐포)을 SQL로', 'recursive CTEs handle org charts, category trees and graph reachability in SQL'], ['사이클이 있으면 무한 반복할 수 있으니 방문 기록이나 깊이 제한을 둬요', 'cycles can loop forever, so track visited rows or cap the depth']]);
  S.cap(1, '상사-부하 테이블', 'A boss–report table').cap(2, '앵커 행', 'The anchor row').cap(3, '한 단계 내려가기', 'One level down').cap(4, '더 이상 없으면 끝', 'Stop when nothing new').cap(5, 'CTE와 재귀 쿼리', 'CTEs and recursive queries');
  return S;
}

/* ================= performance ================= */
function sExplain() {
  const S = scene({ id: 'db-explain', steps: 5, per: 1.6 });
  code(S, 'q', 1, .8, 30, ['EXPLAIN SELECT * FROM orders WHERE user_id = 42;'], [], {});
  code(S, 'p1', 1, 3.2, 30, ['Seq Scan on orders  (cost=0.00..18334 rows=12)', '  Filter: (user_id = 42)   Rows Removed by Filter: 999988'], [], { st: 1, off: 2 });
  code(S, 'p2', 1, 3.2, 30, ['Index Scan using idx_orders_user on orders', '  (cost=0.42..8.64 rows=12)   Index Cond: (user_id = 42)'], [], { st: 2 });
  T(S, 't1', 1, 6.2, ['1,000,000행을 전부 읽고 12행만 남겨요', 'reads all 1,000,000 rows to keep 12'], 'dbx-xs dbx-r', 1, { off: 2 });
  T(S, 't2', 1, 6.2, 'CREATE INDEX idx_orders_user ON orders(user_id);', 'cz-mono dbx-xs dbx-g', 2);
  rect(S, 'tbl', 1, 7.3, 30, 1.1, 'line', 50, 0, { r: .2 }); T(S, 'tbll', 1, 8.6, ['orders 테이블 (100만 행)', 'orders table (1M rows)'], 'dbx-tiny', 0);
  rect(S, 'scan', 1, 7.3, 30, 1.1, 'warn', 45, 1, { r: .2, off: 2 });
  [4.2, 9.8, 13.1, 21.7, 26.3].forEach((x, i) => rect(S, 'hit' + i, x, 7.3, .35, 1.1, 'ok', 90, 2, { r: .05 }));
  T(S, 's3', 1, 9.6, ["WHERE status = 'done' (90%) 이라면?", "what about WHERE status = 'done' (90% of rows)?"], 'cz-mono dbx-xs dbx-a', 3);
  rect(S, 'b1', 1, 10.7, 26, 1, 'danger', 40, 3, { r: .2 }); T(S, 'b1l', 1.4, 10.85, ['Index Scan: 90만 번 무작위 읽기', 'Index Scan: 900k random reads'], 'dbx-tiny', 3);
  rect(S, 'b2', 1, 11.9, 6, 1, 'ok', 45, 3, { r: .2 }); T(S, 'b2l', 7.4, 12.05, ['Seq Scan: 페이지를 순서대로 → 이쪽을 골라요 ✓', 'Seq Scan: pages in order → chosen ✓'], 'dbx-tiny dbx-g', 3);
  T(S, 's4', 1, 13.3, ['EXPLAIN ANALYZE: 추정 rows=12 vs 실제 rows=4800 → 통계가 낡았으면 ANALYZE', 'EXPLAIN ANALYZE: estimated rows=12 vs actual 4800 → stale stats? run ANALYZE'], 'cz-mono dbx-xs dbx-w', 4);
  fin(S, 'z', 14.8, [['실행 계획: 옵티마이저가 고른 접근 방법(스캔·조인 순서·알고리즘)과 비용 추정', 'the execution plan shows the chosen access paths, join order, algorithms and cost estimates', 'dbx-xs dbx-a'], ['비용 기반 옵티마이저는 통계(행 수, 값 분포)로 선택도를 추정해요', 'a cost-based optimizer estimates selectivity from statistics (row counts, value distributions)'], ['느린 쿼리는 추측 말고 EXPLAIN부터: 풀 스캔, 잘못된 행 수 추정을 찾아요', 'for a slow query, start with EXPLAIN: look for full scans and bad row estimates']]);
  S.cap(1, '인덱스 없이: 전체 스캔', 'Without an index: a full scan').cap(2, '인덱스를 타면', 'With an index').cap(3, '인덱스가 항상 이기진 않아요', 'Indexes don’t always win').cap(4, '추정과 실제 비교', 'Estimates vs reality').cap(5, '실행 계획 읽기 (EXPLAIN)', 'Reading plans (EXPLAIN)');
  return S;
}
function sCovering() {
  const S = scene({ id: 'db-covering', steps: 5, per: 1.6 });
  code(S, 'q', 1, .8, 30, ["SELECT name FROM users WHERE email = 'ann@x.com';"], [], {});
  T(S, 'it', 1, 3, ['인덱스 (email)', 'index on (email)'], 'dbx-xs dbx-a', 1);
  [['ann@ → p7'], ['bob@ → p2'], ['cat@ → p9']].forEach(([l], i) => box2(S, 'lf' + i, 1 + i * 5.6, 4, 5.4, 1.4, l, 'accent', 1, { pct: 25 }));
  tsets(S, 'lf0', [[2, 'warn', 40], [3, 'accent', 25]]);
  T(S, 'ht', 20, 3, ['테이블 (힙)', 'table (heap)'], 'dbx-xs', 1);
  [['p2: bob, Bob, …', 4], ['p7: ann, Ann, …', 5.6], ['p9: cat, Cat, …', 7.2]].forEach(([l, y], i) => { box2(S, 'hp' + i, 20, y, 11, 1.4, l, 'line', 1, { pct: 40 }); S.set('hp' + i, 3, { opacity: '.3' }); });
  tsets(S, 'hp1', [[2, 'warn', 40], [3, 'line', 40]]);
  elb(S, 'jump', [[3.7, 5.5], [3.7, 6.3], [19.9, 6.3]], 'warn', 2, { h: .12, off: 3 });
  T(S, 'j1', 1, 7.3, ['행마다 테이블을 한 번 더 읽어요', 'an extra table read for every row'], 'dbx-xs dbx-w', 2); T(S, 'j2', 1, 8.3, ['(무작위 I/O) → 1,000행이면 1,000번', '(random I/O) → 1,000 rows, 1,000 reads'], 'dbx-xs dbx-w', 2);
  T(S, 'ct', 1, 9.7, ['커버링 인덱스 (email) INCLUDE (name)', 'covering index on (email) INCLUDE (name)'], 'cz-mono dbx-xs dbx-g', 3);
  [['ann@ | Ann'], ['bob@ | Bob'], ['cat@ | Cat']].forEach(([l], i) => box2(S, 'cv' + i, 1 + i * 5.6, 10.7, 5.4, 1.4, l, 'ok', 3, { pct: 30 }));
  T(S, 'cvt', 18.4, 11, ['인덱스만 읽고 끝 (Index Only Scan)', 'answered by the index alone (Index Only Scan)'], 'dbx-xs dbx-g', 3);
  T(S, 'k1', 1, 12.6, ['대가: 인덱스가 커지고 쓰기가 느려져요 → 자주 쓰는 조회에만', 'cost: a bigger index and slower writes → only for hot queries'], 'dbx-xs', 4);
  T(S, 'k2', 1, 13.6, ['MySQL “Using index”, PostgreSQL “Index Only Scan”으로 확인해요', 'look for “Using index” (MySQL) or “Index Only Scan” (PostgreSQL)'], 'dbx-xs', 4);
  fin(S, 'z', 15, [['커버링 인덱스: 쿼리에 필요한 열이 모두 인덱스에 있어 테이블을 안 읽어요', 'a covering index holds every column the query needs, so the table is never touched', 'dbx-xs dbx-a'], ['복합 인덱스 (email, name)로도 같은 효과를 낼 수 있어요', 'a composite index on (email, name) has the same effect'], ['SELECT *를 피하고 필요한 열만 고르는 습관이 이 최적화를 가능하게 해요', 'selecting only the columns you need (not SELECT *) makes this possible']]);
  S.cap(1, '인덱스엔 위치만 있어요', 'The index stores only a location').cap(2, '테이블을 다시 읽어요', 'Back to the table').cap(3, '필요한 열을 인덱스에', 'Put the needed column in the index').cap(4, '대가와 확인 방법', 'Costs and how to check').cap(5, '커버링 인덱스', 'Covering indexes');
  return S;
}
function sJoinAlgo() {
  const S = scene({ id: 'db-joinalgo', steps: 5, per: 1.6 });
  const R = [3, 1, 4, 2], Sx = [2, 4, 1, 4, 3], y0 = 2.2, dy = 1.2;
  const col = (k, x, vals, c, st) => vals.forEach((v, i) => box2(S, k + i, x, y0 + i * dy, 2.4, 1, String(v), c, st, { pct: 30 }));
  /* nested loop */
  T(S, 'nt', 1, .2, 'Nested Loop', 'dbx-s dbx-a', 1); T(S, 'nr', 1.5, 1.2, 'users', 'cz-mono dbx-tiny', 1); T(S, 'ns', 7.3, 1.2, 'orders', 'cz-mono dbx-tiny', 1);
  col('nR', 1.5, R, 'accent', 1); col('nS', 7.5, Sx, 'line', 1);
  Sx.forEach((v, i) => seg(S, 'nf' + i, [3.95, y0 + .5], [7.45, y0 + i * dy + .5], 1, v === R[0] ? 'ok' : 'warn', .07));
  T(S, 'n1', 1, 8.5, ['행마다 상대 전체를 훑어요: 4 × 5 = 20번', 'every row scans the other side: 4 × 5 = 20'], 'dbx-tiny', 1); T(S, 'n2', 1, 9.4, 'O(N · M)', 'cz-mono dbx-xs dbx-a', 1);
  /* hash join */
  T(S, 'ht', 11.5, .2, 'Hash Join', 'dbx-s dbx-a', 2); T(S, 'hb', 12, 1.2, ['해시 테이블 (id mod 3)', 'hash table (id mod 3)'], 'cz-mono dbx-tiny', 2); T(S, 'hs', 18.8, 1.2, 'orders', 'cz-mono dbx-tiny', 2);
  [['b0: 3', 0], ['b1: 1, 4', 1], ['b2: 2', 2]].forEach(([l, i]) => box2(S, 'hb' + i, 12, y0 + i * dy, 4.6, 1, l, 'accent', 2, { pct: 25 }));
  col('hS', 18, Sx, 'line', 2);
  Sx.forEach((v, i) => seg(S, 'hp' + i, [17.95, y0 + i * dy + .5], [16.65, y0 + (v % 3) * dy + .5], 2, 'ok', .07));
  T(S, 'h1', 11.5, 8.5, ['작은 쪽으로 해시 테이블 → 큰 쪽은 한 번씩 조회', 'build on the small side → probe once per row'], 'dbx-tiny', 2); T(S, 'h2', 11.5, 9.4, ['O(N + M) · 메모리 필요', 'O(N + M) · needs memory'], 'cz-mono dbx-xs dbx-a', 2);
  /* merge */
  T(S, 'mt', 22, .2, 'Sort-Merge Join', 'dbx-s dbx-a', 3); T(S, 'mr', 22.5, 1.2, ['정렬', 'sorted'], 'cz-mono dbx-tiny', 3); T(S, 'ms', 28.3, 1.2, ['정렬', 'sorted'], 'cz-mono dbx-tiny', 3);
  col('mR', 22.5, [1, 2, 3, 4], 'accent', 3); col('mS', 28.5, [1, 2, 3, 4, 4], 'line', 3);
  [[0, 0], [1, 1], [2, 2], [3, 3], [3, 4]].forEach(([a, b], i) => seg(S, 'mm' + i, [24.95, y0 + a * dy + .5], [28.45, y0 + b * dy + .5], 3, 'ok', .08));
  T(S, 'm1', 22, 8.5, ['두 포인터가 함께 전진', 'two pointers advance together'], 'dbx-tiny', 3); T(S, 'm2', 22, 9.4, 'O(N log N + M log M)', 'cz-mono dbx-xs dbx-a', 3);
  [[1, ['작은 바깥 + 안쪽 인덱스', 'small outer + inner index']], [11.5, ['큰 테이블 등가 조인', 'large equality joins']], [22, ['이미 정렬됨 · 범위 조인', 'pre-sorted · range joins']]].forEach(([x, l], i) => box2(S, 'w' + i, x, 10.6, 9.4, 1.5, l, 'ok', 4, { pct: 30 }));
  T(S, 'w', 1, 12.5, ['옵티마이저가 통계(행 수, 인덱스, 메모리)를 보고 골라요', 'the optimizer chooses using statistics (row counts, indexes, memory)'], 'dbx-xs dbx-a', 4);
  fin(S, 'z', 14, [['같은 조인도 알고리즘에 따라 비용이 수백 배 차이 나요', 'the same join can differ in cost by orders of magnitude', 'dbx-xs dbx-a'], ['EXPLAIN에 Nested Loop / Hash Join / Merge Join으로 나타나요', 'EXPLAIN shows them as Nested Loop, Hash Join and Merge Join'], ['조인 키에 인덱스가 없고 테이블이 크면 해시 조인이 메모리를 넘쳐 디스크로 흘러요', 'without an index on large tables, a hash join may spill from memory to disk']]);
  S.cap(1, '중첩 루프', 'Nested loop').cap(2, '해시 조인', 'Hash join').cap(3, '정렬 병합 조인', 'Sort-merge join').cap(4, '언제 무엇을', 'When to use which').cap(5, '조인 알고리즘', 'Join algorithms');
  return S;
}
function sPage() {
  const S = scene({ id: 'db-page', steps: 5, per: 1.6 });
  code(S, 'c1', 1, .8, 30, ['SELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 0;'], [], { st: 1, off: 2 });
  code(S, 'c2', 1, .8, 30, ['SELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 100000;'], [], { st: 2 });
  rect(S, 'bar', 1, 3.3, 30, 1.1, 'line', 50, 0, { r: .2 });
  rect(S, 'pg1', 1, 3.3, .6, 1.1, 'ok', 80, 1, { r: .1, off: 2 }); T(S, 'pg1l', 1, 4.7, ['1페이지: 20행만 읽어요', 'page 1: reads 20 rows'], 'dbx-xs dbx-g', 1, { off: 2 });
  rect(S, 'skip', 1, 3.3, 25, 1.1, 'danger', 30, 2, { r: .2 }); rect(S, 'pg2', 26.1, 3.3, .6, 1.1, 'ok', 80, 2, { r: .1 });
  T(S, 'skl', 1, 4.7, ['10만 행을 읽고 버린 뒤 20행만 돌려줘요 → 뒤 페이지일수록 느려요', 'reads and discards 100,000 rows to return 20 → later pages get slower'], 'dbx-xs dbx-r', 2);
  T(S, 'dl', 1, 6.1, ['3개씩 보는 중에 새 글 11이 올라오면', 'paging 3 at a time while post 11 arrives'], 'dbx-xs dbx-a', 3);
  ['10', '9', '8'].forEach((v, i) => box2(S, 'a' + i, 1 + i * 2.6, 7.2, 2.4, 1.3, v, 'accent', 3, { pct: 25 }));
  box2(S, 'nw', 9.6, 7.2, 3.4, 1.3, ['새 11', 'new 11'], 'warn', 3, { pct: 40 });
  ar(S, 'da', [13.4, 7.85], [15.3, 7.85], 'ink-3', 3, { h: .1 });
  ['8', '7', '6'].forEach((v, i) => box2(S, 'b' + i, 15.6 + i * 2.6, 7.2, 2.4, 1.3, v, i ? 'accent' : 'danger', 3, { pct: i ? 25 : 40 }));
  T(S, 'dlt', 24, 7.45, ['8이 두 번 나와요', '8 shows up twice'], 'dbx-xs dbx-r', 3);
  code(S, 'c3', 1, 9.4, 30, ['SELECT * FROM posts WHERE id < :last_id ORDER BY id DESC LIMIT 20;', ['-- 마지막으로 본 id 바로 다음부터 (인덱스로 점프)', '-- continue right after the last id seen (index jump)']], [], { st: 4 });
  T(S, 'kt', 1, 12.9, ['키셋(커서) 방식: 항상 20행만 읽고, 새 글이 끼어도 중복이 없어요', 'keyset (cursor) paging: always reads 20 rows, no duplicates when posts arrive'], 'dbx-xs dbx-g', 4);
  T(S, 'kt2', 1, 13.9, ['대신 “237페이지로 바로 가기”는 못 해요 · 다음 커서를 토큰으로 넘겨요', 'but no “jump to page 237” · pass the next cursor as a token'], 'dbx-xs', 4);
  fin(S, 'z', 15.2, [['OFFSET은 건너뛸 행도 모두 읽어서 페이지가 깊어질수록 O(offset)', 'OFFSET still reads every skipped row, so deep pages cost O(offset)', 'dbx-xs dbx-a'], ['무한 스크롤·피드·API 목록엔 키셋, 페이지 번호가 필요한 관리 화면엔 OFFSET', 'use keysets for infinite scroll, feeds and APIs; OFFSET for admin screens with page numbers'], ['정렬 키가 겹치면 (created_at, id)처럼 고유한 열을 덧붙여요', 'if the sort key isn’t unique, add a tiebreaker like (created_at, id)']]);
  S.cap(1, 'OFFSET 1페이지', 'OFFSET, page 1').cap(2, '깊은 페이지는 느려요', 'Deep pages are slow').cap(3, '중복과 누락', 'Duplicates and gaps').cap(4, '키셋(커서) 페이지네이션', 'Keyset (cursor) pagination').cap(5, '오프셋 vs 커서 페이지네이션', 'Offset vs cursor pagination');
  return S;
}
function sLsm() {
  const S = scene({ id: 'db-lsm', steps: 5, per: 1.6 });
  T(S, 'put', 1, .2, 'put(c, 7)', 'cz-mono dbx-s dbx-a', 1);
  box2(S, 'mem', 1, 1.4, 9, 2.8, '', 'accent', 1, { pct: 22 }); T(S, 'meml', 1.4, 1.6, ['memtable (메모리, 정렬)', 'memtable (memory, sorted)'], 'dbx-xs dbx-a', 1);
  T(S, 'memk', 1.4, 2.8, 'a:1  c:7  f:2', 'cz-mono dbx-s', 1);
  box2(S, 'wal', 1, 4.8, 9, 1.2, ['WAL (끝에 덧붙이기만)', 'WAL (append only)'], 'warn', 1, { pct: 30 });
  frame(S, 'disk', 12, 1, 19, 8.6, 'ink-3', 2, { dash: 1, w: .1 }); T(S, 'diskl', 12.3, 1.2, ['디스크', 'disk'], 'dbx-xs', 2);
  ar(S, 'fl', [10.1, 3.4], [12.9, 3.4], 'accent', 2, { h: .12 }); T(S, 'fll', 10.3, 2.4, 'flush', 'cz-mono dbx-tiny dbx-a', 2);
  [['SST 3 (a…f)', 13], ['SST 2 (b…x)', 19], ['SST 1 (a…z)', 25]].forEach(([l, x], i) => { box2(S, 'l0' + i, x, 2.6, 5.6, 1.6, l, 'accent', 2, { pct: 25 }); S.set('l0' + i, 3, { opacity: '.3' }); ar(S, 'cm' + i, [x + 2.8, 4.3], [x + 2.8, 6.5], 'ok', 3, { h: .1 }); });
  T(S, 'l0l', 15.2, 1.25, ['L0: 꽉 찰 때마다 통째로 순차 쓰기', 'L0: each full memtable written sequentially'], 'dbx-tiny', 2);
  box2(S, 'l1', 13, 6.6, 17.6, 1.6, ['L1: 병합·정렬된 큰 SST (옛 값 정리)', 'L1: merged, sorted SST (old values dropped)'], 'ok', 3, { pct: 30 });
  T(S, 'cpl', 13, 8.5, ['컴팩션: 백그라운드에서 병합', 'compaction: merged in the background'], 'dbx-tiny dbx-g', 3);
  T(S, 'rd', 1, 10.4, ['get(f): memtable → L0 (블룸 필터로 건너뛰기) → L1', 'get(f): memtable → L0 (skip via Bloom filters) → L1'], 'cz-mono dbx-xs dbx-a', 4);
  box2(S, 'cb', 1, 11.6, 14.6, 1.5, ['B+트리: 제자리 수정 · 읽기에 강함', 'B+ tree: update in place · read-friendly'], 'line', 4, { pct: 40 });
  box2(S, 'cl', 16.4, 11.6, 14.6, 1.5, ['LSM: 순차 쓰기만 · 쓰기에 강함', 'LSM: sequential writes only · write-friendly'], 'ok', 4, { pct: 30 });
  fin(S, 'z', 13.8, [['LSM 트리: 쓰기를 메모리에 모았다가 정렬된 파일로 한꺼번에 내리고, 나중에 병합해요', 'LSM trees buffer writes in memory, flush sorted files in bulk and merge them later', 'dbx-xs dbx-a'], ['대가: 읽기는 여러 곳을 확인하고(읽기 증폭), 컴팩션이 디스크를 다시 써요(쓰기 증폭)', 'costs: reads check several places (read amplification); compaction rewrites data (write amplification)'], ['RocksDB, LevelDB, Cassandra, ScyllaDB · B+트리는 MySQL InnoDB, PostgreSQL', 'RocksDB, LevelDB, Cassandra and ScyllaDB use LSM; MySQL InnoDB and PostgreSQL use B+ trees']]);
  S.cap(1, '쓰기는 메모리와 로그로', 'Writes go to memory and a log').cap(2, '가득 차면 파일로 내리기', 'Flush when full').cap(3, '컴팩션으로 병합', 'Merge by compaction').cap(4, '읽기 경로와 B+트리 비교', 'Read path vs B+ trees').cap(5, 'LSM 트리', 'LSM trees');
  return S;
}

/* ================= transactions ================= */
function sLock() {
  const S = scene({ id: 'db-lock', steps: 5, per: 1.6 });
  T(S, 'mt', 1, .2, ['잠금 호환표', 'lock compatibility'], 'dbx-xs dbx-a', 1);
  const M = [['', 'S', 'X'], ['S', '✓', '✗'], ['X', '✗', '✗']];
  M.forEach((r, i) => r.forEach((v, j) => box2(S, `m${i}_${j}`, 1 + j * 3, 1.1 + i * 1.4, 2.9, 1.28, v, i === 0 || j === 0 ? 'accent' : v === '✓' ? 'ok' : 'danger', 1, { pct: 30 })));
  T(S, 'ml', 1, 5.5, ['읽기(S)끼리는 함께, 쓰기(X)는 혼자', 'readers (S) share; a writer (X) is alone'], 'dbx-xs', 1);
  T(S, 'pt', 12, .2, ['2단계 잠금 (2PL)', 'two-phase locking (2PL)'], 'dbx-xs dbx-a', 2);
  hl(S, 'ax', 12.5, 30.5, 5.8, 'ink-3', 2, { w: .08 }); seg(S, 'ay', [12.5, 1.2], [12.5, 5.8], 2, 'ink-3', .08);
  poly(S, 'pl', [[12.6, 5.6], [15.5, 4.6], [18.5, 3.5], [22, 2]], { st: 2, color: 'accent', h: .14 }); seg(S, 'pd', [22, 2], [22, 5.6], 2, 'warn', .14);
  T(S, 'g1', 13.4, 2.2, ['획득 단계 ↑', 'growing ↑'], 'dbx-tiny dbx-a', 2); T(S, 'g2', 22.5, 2.6, ['커밋 때 한꺼번에 해제', 'release all at commit'], 'dbx-tiny dbx-w', 2); T(S, 'g3', 27.5, 6, ['시간', 'time'], 'dbx-tiny', 2);
  T(S, 'g4', 12, 6.6, ['해제를 시작하면 더 이상 잠그지 않음 → 직렬화 가능 보장', 'no new locks once releasing starts → guarantees serializability'], 'dbx-xs', 2);
  stt(S, 't1', 4, 10, 'T1', 'accent', 3, { r: 1.2 }); stt(S, 't2', 27, 10, 'T2', 'accent', 3, { r: 1.2 });
  box2(S, 'ra', 13.2, 7.8, 5, 1.4, ['행 A', 'row A'], 'line', 3, { pct: 40 }); box2(S, 'rb', 13.2, 11.2, 5, 1.4, ['행 B', 'row B'], 'line', 3, { pct: 40 });
  ar(S, 'h1', [5.2, 9.5], [13.1, 8.6], 'ok', 3, { h: .12 }); T(S, 'h1l', 7, 8.2, ['X 보유', 'holds X'], 'dbx-tiny dbx-g', 3);
  ar(S, 'h2', [25.8, 10.6], [18.3, 11.8], 'ok', 3, { h: .12 }); T(S, 'h2l', 21.6, 11.9, ['X 보유', 'holds X'], 'dbx-tiny dbx-g', 3);
  ar(S, 'w1', [5.2, 10.5], [13.1, 11.8], 'danger', 3, { h: .1, dash: 1 }); T(S, 'w1l', 7, 11.6, ['대기', 'waits'], 'dbx-tiny dbx-r', 3);
  ar(S, 'w2', [25.8, 9.4], [18.3, 8.6], 'danger', 3, { h: .1, dash: 1 }); T(S, 'w2l', 21.6, 8.2, ['대기', 'waits'], 'dbx-tiny dbx-r', 3);
  tsets(S, 't2', [[4, 'danger', 40]]); S.set('w1', 4, { opacity: '.25' }); S.set('h2', 4, { opacity: '.25' }); S.set('w2', 4, { opacity: '.25' });
  T(S, 'v1', 1, 13, ['DB가 대기 그래프의 사이클을 찾아 T2를 롤백 → T1 진행', 'the DB finds the wait-for cycle and rolls back T2 → T1 proceeds'], 'dbx-xs dbx-r', 4);
  T(S, 'v2', 1, 14, ['예방: 항상 같은 순서로 잠그고, 트랜잭션은 짧게, 실패하면 재시도', 'prevent it: lock in one order, keep transactions short, retry on failure'], 'dbx-xs', 4);
  fin(S, 'z', 15.4, [['공유(S)·배타(X) 잠금으로 동시 수정을 막고, 2PL로 직렬화 가능성을 보장해요', 'shared (S) and exclusive (X) locks prevent conflicting updates; 2PL guarantees serializability', 'dbx-xs dbx-a'], ['서로의 잠금을 기다리면 교착 상태 → DB가 감지해 한쪽을 희생자로 롤백', 'waiting on each other’s locks is a deadlock → the DB detects it and rolls back a victim'], ['MVCC 덕분에 읽기는 대부분 잠금 없이, 쓰기끼리만 충돌해요', 'thanks to MVCC most reads take no locks; only writes collide']]);
  S.cap(1, '공유 잠금과 배타 잠금', 'Shared and exclusive locks').cap(2, '2단계 잠금', 'Two-phase locking').cap(3, '서로 기다리면 교착', 'Waiting on each other: deadlock').cap(4, '감지하고 롤백', 'Detect and roll back').cap(5, '잠금과 교착 상태', 'Locks and deadlocks');
  return S;
}
function sOptLock() {
  const S = scene({ id: 'db-optlock', steps: 5, per: 1.6 });
  T(S, 'la', 1, 1.6, 'A', 'cz-mono dbx-s dbx-a', 1); T(S, 'lb', 1, 3.6, 'B', 'cz-mono dbx-s dbx-w', 1);
  hl(S, 'lna', 3, 30, 2.05, 'line', 1, { w: .06 }); hl(S, 'lnb', 3, 30, 4.05, 'line', 1, { w: .06 });
  [['a1', 4, 1.4, ['읽기: 10', 'read 10'], 'accent'], ['b1', 10, 3.4, ['읽기: 10', 'read 10'], 'warn'], ['a2', 16, 1.4, ['쓰기: 9', 'write 9'], 'accent'], ['b2', 22, 3.4, ['쓰기: 9', 'write 9'], 'danger']].forEach(([k, x, y, l, c]) => box2(S, k, x, y, 5.4, 1.3, l, c, 1, { pct: 30 }));
  T(S, 'lu', 1, 5.1, ['재고 10에서 둘 다 1개씩 뺐는데 결과는 9 (8이어야 해요) → 갱신 분실', 'both subtracted 1 from 10 but stock is 9, not 8 → a lost update'], 'dbx-xs dbx-r', 1);
  T(S, 'pt', 1, 6.4, ['비관적 잠금: 먼저 잠그고 수정', 'pessimistic: lock first, then modify'], 'dbx-xs dbx-a', 2);
  code(S, 'pc', 1, 7.3, 14.6, ['BEGIN;', 'SELECT stock FROM item', '  WHERE id = 1 FOR UPDATE;', ['-- B는 A가 커밋할 때까지 대기', '-- B waits until A commits']], [], { st: 2 });
  T(S, 'ot', 16.4, 6.4, ['낙관적 잠금: 버전으로 충돌 감지', 'optimistic: detect conflicts by version'], 'dbx-xs dbx-g', 3);
  code(S, 'oc', 16.4, 7.3, 14.6, ['UPDATE item', '  SET stock = 9, version = 6', '  WHERE id = 1 AND version = 5;', ['-- 0행 갱신 → 다시 읽고 재시도', '-- 0 rows → re-read and retry']], [], { st: 3 });
  T(S, 'c1', 1, 13.5, ['경합이 잦으면 비관적, 드물거나 사용자가 오래 머물면(웹 폼) 낙관적', 'frequent contention → pessimistic; rare contention or long edits (web forms) → optimistic'], 'dbx-xs dbx-a', 4);
  T(S, 'c2', 1, 14.5, ['단순 차감은 UPDATE … SET stock = stock - 1 처럼 한 문장으로', 'for a plain decrement, use one atomic UPDATE … SET stock = stock - 1'], 'cz-mono dbx-xs', 4);
  fin(S, 'z', 15.8, [['비관적: 충돌이 날 거라 보고 미리 잠가요 · 낙관적: 충돌이 드물다고 보고 쓸 때 확인해요', 'pessimistic assumes conflicts and locks early; optimistic assumes they’re rare and checks at write time', 'dbx-xs dbx-a'], ['JPA @Version, Rails lock_version, HTTP의 ETag + If-Match가 낙관적 잠금이에요', 'JPA @Version, Rails lock_version and HTTP ETag + If-Match are optimistic locking']]);
  S.cap(1, '갱신 분실', 'A lost update').cap(2, '비관적 잠금', 'Pessimistic locking').cap(3, '낙관적 잠금', 'Optimistic locking').cap(4, '언제 무엇을', 'When to use which').cap(5, '낙관적 vs 비관적 잠금', 'Optimistic vs pessimistic locking');
  return S;
}

/* ================= scale ================= */
function sFts() {
  const S = scene({ id: 'db-fts', steps: 5, per: 1.6 });
  T(S, 'dt', 1, .2, ['문서', 'documents'], 'dbx-xs dbx-a', 1);
  [['d1: fast db index'], ['d2: db lock wait'], ['d3: fast lock free']].forEach(([l], i) => box2(S, 'd' + i, 1, 1.2 + i * 1.6, 13, 1.3, l, 'line', 1, { pct: 40 }));
  tsets(S, 'd2', [[3, 'ok', 40]]);
  T(S, 'it', 17, .2, ['역색인: 단어 → 문서 목록', 'inverted index: term → postings'], 'dbx-xs dbx-a', 2);
  const P = [['db', [1, 2]], ['fast', [1, 3]], ['index', [1]], ['lock', [2, 3]], ['wait', [2]], ['free', [3]]];
  P.forEach(([t, ps], i) => { const y = 1.2 + i * 1.3; box2(S, 'pt' + i, 17, y, 4.4, 1.15, t, 'accent', 2, { pct: 30 }); ps.forEach((d, j) => box2(S, `pp${i}_${j}`, 21.8 + j * 2, y, 1.8, 1.15, 'd' + d, 'line', 2, { pct: 40 })); });
  [1, 3].forEach(i => { tsets(S, 'pt' + i, [[3, 'warn', 45]]); });
  tsets(S, 'pp1_1', [[3, 'ok', 45]]); tsets(S, 'pp3_1', [[3, 'ok', 45]]);
  T(S, 'tk', 1, 6.4, ['토큰으로 쪼개 단어마다 문서 번호를 기록해요', 'split into tokens and record document ids per term'], 'dbx-xs', 2);
  T(S, 'q', 1, 7.6, ['검색: fast AND lock', 'search: fast AND lock'], 'cz-mono dbx-s dbx-w', 3);
  T(S, 'qi', 1, 8.8, '[d1, d3] ∩ [d2, d3] = [d3]', 'cz-mono dbx-s dbx-g', 3);
  T(S, 'a1', 1, 10.2, ['분석기: 소문자화, 어간 추출(running → run), 불용어 제거', 'analyzers: lowercasing, stemming (running → run), stop words'], 'dbx-xs', 4);
  T(S, 'a2', 1, 11.2, ["LIKE '%lock%'은 B+트리 인덱스를 못 써서 전체를 훑어요", "LIKE '%lock%' can’t use a B+ tree index and scans everything"], 'cz-mono dbx-xs dbx-r', 4);
  T(S, 'a3', 1, 12.2, ['순위: TF-IDF·BM25 — 드문 단어가 자주 나온 문서를 위로', 'ranking: TF-IDF / BM25 — documents rich in rare terms rank higher'], 'dbx-xs dbx-a', 4);
  fin(S, 'z', 13.8, [['역색인: 단어마다 그 단어가 나오는 문서 목록 (책 뒤의 찾아보기)', 'an inverted index lists, for each term, the documents containing it, like a book’s index', 'dbx-xs dbx-a'], ['Lucene·Elasticsearch, PostgreSQL tsvector + GIN, MySQL FULLTEXT가 이 구조예요', 'Lucene/Elasticsearch, PostgreSQL tsvector + GIN and MySQL FULLTEXT use it'], ['한국어는 형태소 분석기(nori 등)나 n-gram으로 토큰을 나눠요', 'Korean text needs a morphological analyzer (e.g., nori) or n-grams to tokenize']]);
  S.cap(1, '검색할 문서들', 'Documents to search').cap(2, '역색인 만들기', 'Build the inverted index').cap(3, '목록의 교집합', 'Intersect the postings').cap(4, '분석기와 순위', 'Analyzers and ranking').cap(5, '전문 검색과 역색인', 'Full-text search and inverted indexes');
  return S;
}

return { css: CSSX, secs: [], add: {
  'db-model': [
    item('db-relalg', '관계 대수', 'Relational algebra', '테이블을 받아 테이블을 돌려주는 연산(σ 선택, π 투영, ⋈ 조인 등)의 체계예요. SQL은 이 연산의 식으로 바뀌어 실행·최적화돼요.', 'σ dept = dev(emp)는 조건에 맞는 행만, π name은 원하는 열만 남기고, emp ⋈ dept는 dept 값이 같은 행끼리 이어 붙여요. 결과도 테이블이라 연산을 자유롭게 조합할 수 있고, SELECT name FROM emp WHERE dept = \'dev\'는 π name(σ dept=\'dev\'(emp))와 같아요. 옵티마이저는 이 식을 결과가 같은 더 싼 식으로 바꿔요(예: 선택을 조인 아래로 밀어 내리기).', 'A set of operators that take tables and return tables (σ select, π project, ⋈ join, …). SQL is compiled into expressions of these operators and optimized.', 'σ dept = dev(emp) keeps matching rows, π name keeps chosen columns, and emp ⋈ dept glues rows with equal dept values. Results are tables too, so operators compose freely: SELECT name FROM emp WHERE dept = \'dev\' equals π name(σ dept=\'dev\'(emp)). The optimizer rewrites such expressions into cheaper equivalents, for example pushing selections below joins.', sRelalg()),
    item('db-null', 'NULL과 3값 논리', 'NULL and three-valued logic', 'NULL은 값이 아니라 “모름”이라 비교 결과가 TRUE도 FALSE도 아닌 UNKNOWN이 돼요. WHERE는 TRUE인 행만 남겨요.', 'age가 NULL인 Lee는 age > 30에도 age <= 30에도 안 나와요. NULL = NULL도 UNKNOWN이라 IS NULL로 검사하고, COALESCE(age, 0)로 기본값을 줘요. x NOT IN (1, NULL)은 항상 빈 결과, COUNT(age)는 NULL을 건너뛰어 COUNT(*)와 달라요. 가능하면 NOT NULL 제약과 기본값으로 NULL 자체를 줄여요.', 'NULL means “unknown”, not a value, so comparisons yield UNKNOWN rather than TRUE or FALSE, and WHERE keeps only TRUE rows.', 'Lee, whose age is NULL, matches neither age > 30 nor age <= 30. Even NULL = NULL is UNKNOWN, so test with IS NULL and supply defaults with COALESCE(age, 0). x NOT IN (1, NULL) is always empty, and COUNT(age) skips NULLs unlike COUNT(*). Where possible, avoid NULLs with NOT NULL constraints and defaults.', sNull())
  ],
  'db-sql': [
    item('db-subq', '서브쿼리와 EXISTS', 'Subqueries and EXISTS', '쿼리 안의 쿼리예요. 바깥 행의 값을 참조하는 상관 서브쿼리와 EXISTS로 “관련 행이 있는지”를 물을 수 있어요.', 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.cust_id = c.id)는 고객마다 주문이 있는지 확인하고 첫 일치에서 멈춰요(세미 조인). 같은 걸 JOIN으로 쓰면 주문이 여러 건인 고객이 중복돼 DISTINCT가 필요해요. NOT EXISTS는 NULL에도 안전하지만 NOT IN은 NULL이 하나만 있어도 결과가 비어요. 서브쿼리는 스칼라 값, IN/EXISTS, FROM 절의 파생 테이블로 쓸 수 있고, 옵티마이저가 조인으로 바꿔 실행하기도 해요.', 'A query inside a query. Correlated subqueries reference the outer row, and EXISTS asks whether any related row exists.', 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.cust_id = c.id) checks each customer for an order and stops at the first match (a semi-join). Written as a JOIN, customers with several orders repeat and need DISTINCT. NOT EXISTS is NULL-safe, whereas NOT IN returns nothing if any NULL appears. Subqueries work as scalars, with IN/EXISTS or as derived tables in FROM, and optimizers often turn them into joins.', sSubq()),
    item('db-window', '윈도 함수', 'Window functions', '행을 줄이지 않고, 각 행 “주변의 행들”을 보고 순위·누적 합·이전 값 등을 계산하는 함수예요.', 'RANK() OVER (PARTITION BY dept ORDER BY amt DESC)는 부서별로 나눠 매출 순위를 매기고, SUM(amt) OVER 같은 창에서는 누적 합계를 구해요. GROUP BY는 부서마다 한 행으로 접지만, 윈도 함수는 5행을 그대로 두고 열만 더해요. ROW_NUMBER, LAG/LEAD(이전·다음 행), ROWS BETWEEN으로 이동 평균을 구할 수 있어 부서별 1등, 전월 대비 증감 같은 분석 쿼리의 기본기예요.', 'Functions that compute ranks, running totals, previous values and more over the rows surrounding each row, without collapsing them.', 'RANK() OVER (PARTITION BY dept ORDER BY amt DESC) ranks sales within each department, and SUM(amt) over the same window gives a running total. GROUP BY would collapse each department into one row, while window functions keep all rows and add columns. With ROW_NUMBER, LAG/LEAD and ROWS BETWEEN for moving averages, they underpin queries like top-per-group and month-over-month change.', sWindow()),
    item('db-cte', 'CTE와 재귀 쿼리', 'CTEs and recursive queries', 'WITH로 이름 붙은 임시 결과를 만들어 긴 쿼리를 단계별로 나눠요. WITH RECURSIVE는 트리·그래프를 따라가요.', '재귀 CTE는 시작 행(앵커)을 고른 뒤, 직전 결과와 테이블을 조인해 다음 단계 행을 만드는 일을 새 행이 없을 때까지 반복해요. boss_id로 이어진 직원 테이블에서 CEO부터 Kim·Lee, Park, Choi까지 단계(lvl)와 함께 뽑을 수 있어요. 조직도, 카테고리 트리, 그래프 도달 가능성에 쓰이며, 사이클이 있으면 무한 반복할 수 있어 방문 기록이나 깊이 제한을 둬요.', 'WITH names an intermediate result so long queries split into readable steps; WITH RECURSIVE walks trees and graphs.', 'A recursive CTE picks starting rows (the anchor), then repeatedly joins the previous result with the table to produce the next level, until no new rows appear. On an employee table linked by boss_id, it lists the CEO, then Kim and Lee, then Park and Choi, each with a level. It serves org charts, category trees and graph reachability; since cycles can loop forever, track visited rows or cap the depth.', sCte())
  ],
  'db-perf': [
    item('db-explain', '실행 계획 (EXPLAIN)', 'Execution plans (EXPLAIN)', '옵티마이저가 쿼리를 어떤 방법(스캔 방식, 조인 순서·알고리즘)으로 실행할지와 그 비용 추정을 보여 줘요.', '인덱스가 없으면 Seq Scan으로 100만 행을 다 읽고 12행만 남기지만, 인덱스를 만들면 Index Scan으로 바로 찾아가요. 그렇다고 인덱스가 늘 이기진 않아서, 90%의 행이 해당하는 조건이면 무작위 읽기가 많아 순차 스캔을 골라요. 비용 기반 옵티마이저는 통계로 선택도를 추정하니, EXPLAIN ANALYZE로 추정과 실제 행 수를 비교하고 차이가 크면 ANALYZE로 통계를 갱신해요.', 'Shows how the optimizer will run a query (scan methods, join order and algorithms) along with its cost estimates.', 'Without an index, a Seq Scan reads all 1M rows to keep 12; after creating one, an Index Scan jumps straight to them. Indexes don’t always win: if a condition matches 90% of rows, random reads cost more, so the planner picks a sequential scan. A cost-based optimizer estimates selectivity from statistics, so compare estimated and actual rows with EXPLAIN ANALYZE and refresh stale statistics with ANALYZE.', sExplain()),
    item('db-covering', '커버링 인덱스', 'Covering indexes', '쿼리에 필요한 열이 모두 인덱스 안에 있어서, 테이블(힙)을 다시 읽지 않고 인덱스만으로 답하는 거예요.', '(email) 인덱스는 email과 행의 위치만 갖고 있어서 name을 얻으려면 행마다 테이블을 한 번 더 읽어야 해요(무작위 I/O). (email) INCLUDE (name)이나 복합 인덱스 (email, name)로 만들면 인덱스만 읽고 끝나는 Index Only Scan이 돼요. 대신 인덱스가 커지고 쓰기가 느려지니 자주 쓰는 조회에만 쓰고, SELECT * 대신 필요한 열만 고르는 습관이 이 최적화를 가능하게 해요.', 'Every column a query needs lives in the index, so it is answered from the index alone without revisiting the table (heap).', 'An index on (email) stores only email and a row location, so fetching name means one extra table read per row (random I/O). Building (email) INCLUDE (name), or a composite (email, name), turns it into an Index Only Scan. The index grows and writes slow down, so reserve it for hot queries; selecting only needed columns instead of SELECT * is what makes it possible.', sCovering()),
    item('db-joinalgo', '조인 알고리즘', 'Join algorithms', 'DB는 같은 조인을 중첩 루프, 해시 조인, 정렬 병합 조인 중 하나로 실행해요. 데이터 크기와 인덱스에 따라 비용이 크게 달라요.', '중첩 루프는 바깥 행마다 안쪽을 훑어 O(N·M)이지만, 바깥이 작고 안쪽에 인덱스가 있으면 가장 빨라요. 해시 조인은 작은 쪽으로 해시 테이블을 만들고 큰 쪽을 한 번씩 조회해 O(N + M)이지만 메모리가 필요해요. 정렬 병합 조인은 양쪽을 정렬한 뒤 두 포인터로 맞춰 가며, 이미 정렬된 입력이나 범위 조인에 유리해요. 옵티마이저가 통계로 고르고 EXPLAIN에 이름이 나와요.', 'A database runs a join as a nested loop, a hash join or a sort-merge join, and the cost varies hugely with data size and indexes.', 'A nested loop scans the inner side for every outer row, O(N·M), yet is fastest with a small outer side and an index on the inner. A hash join builds a hash table from the smaller input and probes it once per row of the larger, O(N + M), but needs memory. A sort-merge join sorts both sides and advances two pointers, ideal for pre-sorted inputs and range joins. The optimizer chooses using statistics, and EXPLAIN names the choice.', sJoinAlgo()),
    item('db-page', '오프셋 vs 커서 페이지네이션', 'Offset vs cursor pagination', 'OFFSET은 건너뛸 행도 모두 읽어서 뒤 페이지일수록 느려요. 마지막으로 본 키에서 이어 읽는 키셋(커서) 방식이 대안이에요.', 'LIMIT 20 OFFSET 100000은 10만 행을 읽고 버린 뒤 20행을 돌려줘요. 게다가 읽는 사이 새 글이 끼면 같은 글이 두 번 나오거나 빠져요. WHERE id < :last_id ORDER BY id DESC LIMIT 20처럼 쓰면 인덱스로 바로 점프해 항상 20행만 읽고 중복도 없어요. 대신 특정 페이지 번호로 바로 갈 수는 없어서, 피드·무한 스크롤·API엔 키셋, 페이지 번호가 필요한 관리 화면엔 OFFSET을 써요.', 'OFFSET reads every skipped row, so later pages get slower; keyset (cursor) paging continues from the last key seen instead.', 'LIMIT 20 OFFSET 100000 reads and discards 100,000 rows to return 20, and posts arriving mid-browse cause duplicates or gaps. WHERE id < :last_id ORDER BY id DESC LIMIT 20 jumps straight there via the index, always reads 20 rows and never repeats. It can’t jump to an arbitrary page number, so use keysets for feeds, infinite scroll and APIs, and OFFSET for admin screens with page numbers.', sPage()),
    item('db-lsm', 'LSM 트리', 'LSM trees', '쓰기를 메모리(memtable)에 모았다가 정렬된 파일(SSTable)로 한꺼번에 내리고, 나중에 백그라운드에서 병합(컴팩션)하는 저장 구조예요.', 'put은 WAL에 덧붙이고 memtable에 넣기만 해서 빨라요. memtable이 차면 순차 쓰기로 SST 파일을 만들고, 쌓인 파일은 컴팩션으로 병합하며 덮어쓴 값과 삭제 표시를 정리해요. 읽기는 memtable → L0 → L1 순으로 확인하고 블룸 필터로 없는 파일을 건너뛰어요. 제자리 수정하는 B+트리보다 쓰기에 강하지만 읽기·쓰기 증폭이 있어요. RocksDB, LevelDB, Cassandra가 써요.', 'A storage structure that buffers writes in memory (the memtable), flushes them as sorted files (SSTables) in bulk, and merges them later in the background (compaction).', 'A put just appends to the WAL and inserts into the memtable, so it’s fast. A full memtable is written sequentially as an SST file, and compaction merges accumulated files, dropping overwritten values and tombstones. Reads check the memtable, then L0, then L1, skipping files via Bloom filters. It beats in-place B+ trees at writes but pays in read and write amplification. RocksDB, LevelDB and Cassandra use it.', sLsm())
  ],
  'db-trx': [
    item('db-lock', '잠금과 교착 상태', 'Locks and deadlocks', '공유(S)·배타(X) 잠금으로 동시 수정을 막고, 2단계 잠금(2PL)으로 직렬화 가능성을 보장해요. 서로의 잠금을 기다리면 교착 상태가 돼요.', '읽기(S) 잠금끼리는 함께 걸 수 있지만 쓰기(X)는 혼자만 가능해요. 2PL은 잠금을 얻기만 하는 단계와 놓기만 하는 단계를 나누고, 보통 커밋 때 한꺼번에 해제해요. T1이 A를, T2가 B를 잠근 채 서로의 것을 기다리면 대기 그래프에 사이클이 생기고, DB는 이를 감지해 한쪽을 롤백해요. 항상 같은 순서로 잠그고 트랜잭션을 짧게 유지하며, 실패하면 재시도하는 게 예방책이에요.', 'Shared (S) and exclusive (X) locks prevent conflicting changes, and two-phase locking (2PL) guarantees serializability. Waiting on each other’s locks causes a deadlock.', 'Several readers can hold S locks together, but an X lock is exclusive. 2PL separates a phase that only acquires locks from one that only releases them, usually all at commit. If T1 holds A and T2 holds B while each waits for the other, the wait-for graph has a cycle; the database detects it and rolls one back. Locking in a consistent order, keeping transactions short and retrying on failure prevent it.', sLock()),
    item('db-optlock', '낙관적 vs 비관적 잠금', 'Optimistic vs pessimistic locking', '두 사용자가 같은 값을 읽고 고치면 한쪽 변경이 사라져요(갱신 분실). 미리 잠그거나(비관적) 쓸 때 버전으로 확인해(낙관적) 막아요.', '재고 10을 A와 B가 동시에 읽고 각각 9로 쓰면 결과는 8이 아니라 9예요. 비관적 잠금은 SELECT … FOR UPDATE로 먼저 잠가 B가 기다리게 하고, 낙관적 잠금은 UPDATE … WHERE version = 5로 쓰고 0행이 바뀌면 다시 읽어 재시도해요. 경합이 잦으면 비관적, 드물거나 사용자가 오래 머무는 웹 폼이면 낙관적이 좋아요. 단순 차감은 SET stock = stock - 1처럼 한 문장으로 처리해요.', 'When two users read and update the same value, one change can vanish (a lost update). Prevent it by locking first (pessimistic) or checking a version at write time (optimistic).', 'If A and B both read stock 10 and each write 9, the result is 9 instead of 8. Pessimistic locking takes the lock first with SELECT … FOR UPDATE so B waits; optimistic locking writes with UPDATE … WHERE version = 5 and, if zero rows change, re-reads and retries. Prefer pessimistic under frequent contention and optimistic when conflicts are rare or users linger in web forms. A plain decrement is best done atomically as SET stock = stock - 1.', sOptLock())
  ],
  'db-scale': [
    item('db-fts', '전문 검색과 역색인', 'Full-text search and inverted indexes', '단어마다 그 단어가 나오는 문서 목록을 저장한 역색인으로, 문장 속 단어를 빠르게 찾고 관련도 순으로 정렬해요.', '문서를 토큰으로 쪼개 db → [d1, d2], lock → [d2, d3]처럼 기록하면, “fast AND lock”은 두 목록의 교집합 [d3]으로 바로 답이 나와요. 분석기가 소문자화, 어간 추출, 불용어 제거를 하고, TF-IDF나 BM25로 순위를 매겨요. LIKE \'%lock%\'은 B+트리 인덱스를 못 써서 전체를 훑어요. Lucene·Elasticsearch, PostgreSQL tsvector + GIN, MySQL FULLTEXT가 이 구조이고, 한국어는 형태소 분석기나 n-gram으로 토큰을 나눠요.', 'An inverted index stores, for each term, the documents containing it, so words inside text are found fast and ranked by relevance.', 'Tokenize documents and record postings such as db → [d1, d2] and lock → [d2, d3]; then “fast AND lock” is just the intersection of two lists, [d3]. Analyzers lowercase, stem and drop stop words, and TF-IDF or BM25 ranks the results. LIKE \'%lock%\' can’t use a B+ tree index and scans everything. Lucene/Elasticsearch, PostgreSQL tsvector + GIN and MySQL FULLTEXT use this structure; Korean needs a morphological analyzer or n-grams.', sFts())
  ]
} };
})();

window.UX = page([
  sec('db-model', '모델링', 'Modeling', '데이터 모델과 설계', 'Data models and design',
    '데이터를 어떤 모양의 표로 나눠 담을지 정하는 단계예요.', 'Deciding how data is split into tables.', [
    item('db-table', '테이블 · 키', 'Tables · Keys', '관계형 DB는 데이터를 테이블(행과 열)에 담고, 기본 키로 행을 구분하고, 외래 키로 다른 테이블의 행을 가리켜요.', '기본 키는 의미 없는 값(자동 증가, UUID)을 쓰는 게 안전해요. 외래 키 제약은 잘못된 참조를 DB 차원에서 막아 줘요.', 'A relational database stores data in tables of rows and columns, identifies rows by primary keys and links tables through foreign keys.', 'Prefer meaningless primary keys (auto-increment, UUID). Foreign key constraints stop bad references at the database level.', sTable()),
    item('db-norm', '정규화', 'Normalization', '같은 정보가 여러 곳에 반복되지 않도록 테이블을 쪼개는 과정이에요. 반복이 있으면 일부만 고쳐서 데이터가 어긋나요.', '기본은 3정규형까지 맞추고, 조회가 너무 느린 곳만 일부러 합쳐요(역정규화). 이때는 동기화 책임이 생겨요.', 'Splitting tables so the same fact is not repeated; repetition lets copies drift apart when only some are updated.', 'Aim for third normal form, then denormalize deliberately only where reads are too slow, accepting the job of keeping copies in sync.', sNorm()),
    item('db-er', 'ER 모델 · 관계', 'ER model · Relationships', '엔티티(학생, 과목)와 관계(1:1, 1:N, N:M)를 그림으로 설계해요. N:M 관계는 연결 테이블로 풀어요.', '설계 리뷰 때 ERD를 그려 보면 빠진 관계나 중복을 일찍 찾아요. 연결 테이블에는 관계 자체의 속성(수강일, 성적)을 담아요.', 'Model entities (students, courses) and relationships (1:1, 1:N, N:M) as a diagram; N:M becomes a join table.', 'Drawing an ERD in design reviews catches missing or duplicate relations early. Join tables can hold attributes of the relationship itself.', sER())
  ].concat(XT.add['db-model'] || [])),
  sec('db-sql', 'SQL', 'SQL', 'SQL 기본기', 'SQL essentials',
    '데이터를 꺼내고 합치고 요약하는 질의 언어예요.', 'The query language for fetching, combining and summarizing data.', [
    item('db-select', 'SELECT 실행 순서', 'SELECT execution order', 'SQL은 SELECT부터 쓰지만 실제로는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT 순서로 실행돼요.', 'WHERE에서 SELECT의 별칭을 못 쓰는 이유, HAVING과 WHERE의 차이가 모두 이 순서로 설명돼요. 행을 일찍 줄일수록 빨라요.', 'SQL is written starting with SELECT, but it runs FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.', 'This order explains why WHERE cannot use SELECT aliases and how HAVING differs from WHERE. Filtering rows early is faster.', sSelect()),
    item('db-join', '조인', 'JOIN', '두 테이블에서 키가 같은 행끼리 짝지어 하나의 결과로 합쳐요. INNER는 짝이 있는 것만, LEFT는 왼쪽을 모두 남겨요.', 'LEFT JOIN 뒤에 WHERE로 오른쪽 열을 거르면 INNER JOIN처럼 돼 버려요. 조인 키에는 인덱스를 꼭 거세요.', 'Combines two tables by pairing rows with matching keys. INNER keeps only matches; LEFT keeps every left row.', 'Filtering right-side columns in WHERE after a LEFT JOIN silently turns it into an INNER JOIN. Always index join keys.', sJoin()),
    item('db-group', 'GROUP BY · 집계', 'GROUP BY · Aggregates', '같은 값을 가진 행을 묶어 COUNT, SUM, AVG 같은 집계로 한 줄씩 요약해요. 묶은 뒤의 조건은 HAVING으로 걸러요.', '대시보드·리포트 쿼리의 대부분이 이것이에요. 큰 테이블에선 미리 집계한 테이블이나 머티리얼라이즈드 뷰를 써요.', 'Groups rows with the same value and summarizes each group with aggregates like COUNT, SUM and AVG; HAVING filters groups.', 'Most dashboard and report queries are this. On big tables, use pre-aggregated tables or materialized views.', sGroup())
  ].concat(XT.add['db-sql'] || [])),
  sec('db-perf', '인덱스·성능', 'Indexes & performance', '빠르게 찾는 법', 'Finding things fast',
    '느린 쿼리의 대부분은 인덱스와 쿼리 패턴 문제예요.', 'Most slow queries come down to indexes and query patterns.', [
    item('db-index', '인덱스 (B+트리)', 'Index · B+ tree', '인덱스는 컬럼 값을 정렬해 둔 트리라서, 전체를 읽지 않고 몇 단계 만에 원하는 행을 찾아요.', 'EXPLAIN으로 인덱스를 타는지 확인하세요. 인덱스는 쓰기를 느리게 하고 공간을 차지하니 자주 쓰는 조건에만 만들어요.', 'An index is a sorted tree of column values, so the right row is found in a few steps instead of reading everything.', 'Check with EXPLAIN that queries use it. Indexes slow writes and take space, so add them only for frequent conditions.', sIndex()),
    item('db-comp', '복합 인덱스', 'Composite index', '여러 컬럼을 묶은 인덱스는 앞 컬럼 순서대로 정렬돼요. 그래서 앞 컬럼 없이 뒤 컬럼만으로는 인덱스를 쓰기 어려워요.', '(last, first) 인덱스는 last 조건, last+first 조건에 쓰이지만 first만으로는 못 써요. 컬럼 순서가 성능을 좌우해요.', 'A multi-column index is sorted by its first column, then the next, so it rarely helps a query on a later column alone.', 'An index on (last, first) serves “last” and “last + first” queries, but not “first” alone. Column order decides performance.', sComp()),
    item('db-n1', 'N+1 쿼리', 'N+1 queries', '목록을 1번 가져온 뒤, 항목마다 관련 데이터를 따로 조회해서 쿼리가 1+N번 나가는 문제예요.', 'ORM의 지연 로딩에서 흔해요. 개발 땐 데이터가 적어 모르다가 운영에서 터져요. JOIN, IN 절, fetch join, DataLoader로 묶으세요.', 'Fetching a list once and then querying related data separately for every item: 1 + N queries.', 'Common with ORM lazy loading; invisible with little dev data, painful in production. Batch with JOINs, IN clauses, fetch joins or DataLoader.', sN1())
  ].concat(XT.add['db-perf'] || [])),
  sec('db-trx', '트랜잭션', 'Transactions', '트랜잭션과 동시성', 'Transactions and concurrency',
    '여러 작업을 하나로 묶고, 동시에 일어나는 요청을 안전하게 처리해요.', 'Grouping work into one unit and handling concurrent requests safely.', [
    item('db-acid', 'ACID', 'ACID', '트랜잭션은 원자성, 일관성, 격리성, 지속성을 보장해요. 돈·재고처럼 틀리면 안 되는 데이터의 기본이에요.', '분산 시스템이나 NoSQL은 성능과 확장을 위해 일부를 완화하기도 해요(BASE). 무엇을 포기했는지 알고 써야 해요.', 'Transactions guarantee atomicity, consistency, isolation and durability: the baseline for money, stock and anything that must be right.', 'Distributed stores and NoSQL may relax some of these (BASE) for scale. Know what was traded away.', sACID()),
    item('db-tx', '커밋과 롤백', 'Commit · Rollback', 'BEGIN으로 시작한 변경은 COMMIT해야 확정되고, 중간에 실패하면 ROLLBACK으로 모두 되돌려요.', '트랜잭션 안에서 외부 API 호출처럼 오래 걸리는 일을 하면 잠금이 길어져요. 트랜잭션은 짧게 유지하세요.', 'Changes after BEGIN become permanent only on COMMIT; if anything fails, ROLLBACK undoes them all.', 'Slow work inside a transaction, like external API calls, holds locks for long. Keep transactions short.', sTx()),
    item('db-iso', '격리 수준', 'Isolation levels', '동시에 실행되는 트랜잭션이 서로의 변경을 얼마나 볼 수 있는지 정하는 단계예요. 높을수록 안전하지만 느려요.', '재고 차감처럼 경합이 있는 곳은 SELECT … FOR UPDATE나 낙관적 락(버전 컬럼)을 함께 써요.', 'How much concurrent transactions can see of each other’s changes; higher levels are safer but slower.', 'For contended updates like stock counts, add SELECT … FOR UPDATE or optimistic locking with a version column.', sIso()),
    item('db-mvcc', 'MVCC', 'MVCC · Multiversion concurrency', '값을 덮어쓰지 않고 새 버전을 만들어, 읽는 트랜잭션은 시작 시점의 스냅숏을 보게 해요. 읽기와 쓰기가 서로를 막지 않아요.', 'PostgreSQL, MySQL InnoDB, Oracle이 모두 써요. 오래 열린 트랜잭션은 옛 버전 정리를 막아 테이블이 부풀어요.', 'Instead of overwriting, writes create new versions and readers see the snapshot from when they started, so reads and writes don’t block each other.', 'PostgreSQL, InnoDB and Oracle all use it. A long-open transaction blocks cleanup of old versions and bloats tables.', sMVCC()),
    item('db-wal', 'WAL · 로그 선행 기록', 'Write-ahead logging', '데이터 파일을 고치기 전에 변경 내용을 로그에 먼저 순서대로 기록해요. 서버가 죽어도 로그를 다시 실행해 복구해요.', '순차 쓰기라 빠르고, 복제·특정 시점 복구(PITR)·CDC도 이 로그를 써요. 디스크 fsync 설정이 지속성을 좌우해요.', 'Every change is appended to a log before data files are touched; after a crash the log is replayed to recover.', 'Sequential writes are fast, and replication, point-in-time recovery and CDC all reuse the log. fsync settings decide real durability.', sWAL())
  ].concat(XT.add['db-trx'] || [])),
  sec('db-scale', '확장·NoSQL', 'Scaling & NoSQL', '더 많은 데이터와 요청', 'More data, more requests',
    '한 대로 감당이 안 될 때 쓰는 방법들이에요.', 'What to do when one machine is not enough.', [
    item('db-repl', '복제', 'Replication', '주 서버의 변경 로그를 복제본에 보내 같은 데이터를 유지해요. 읽기를 나누고, 장애 때 복제본을 승격해요.', '비동기 복제는 지연이 있어서 방금 쓴 데이터를 복제본에서 못 읽을 수 있어요. 중요한 읽기는 주 서버로 보내세요.', 'The primary streams its change log to replicas so they hold the same data; reads are spread out and a replica takes over on failure.', 'Asynchronous replication lags, so a replica may miss what you just wrote. Send critical reads to the primary.', sRepl()),
    item('db-shard', '샤딩', 'Sharding', '데이터를 키 기준으로 나눠 여러 DB 서버에 나눠 담아요. 한 대의 용량과 쓰기 한계를 넘어설 수 있어요.', '샤드 키를 잘못 고르면 한쪽에 몰려요(핫스팟). 샤드 간 조인이 어려워서 최후의 수단으로 쓰고, 먼저 복제·캐시·파티셔닝을 검토하세요.', 'Data is split by key across several database servers to go beyond one machine’s capacity and write limits.', 'A bad shard key creates hotspots, and cross-shard joins are hard, so treat it as a last resort after replicas, caching and partitioning.', sShard()),
    item('db-nosql', 'NoSQL 종류', 'NoSQL families', '키-값, 문서, 와이드 컬럼, 그래프처럼 표가 아닌 모양으로 데이터를 저장하는 DB들이에요.', '접근 패턴이 단순하고 규모가 크면 NoSQL이 유리하고, 관계와 트랜잭션이 중요하면 관계형이 유리해요. 둘을 함께 쓰는 경우가 많아요.', 'Databases that store data in shapes other than tables: key-value, document, wide-column and graph.', 'NoSQL suits simple access patterns at large scale; relational suits rich relations and transactions. Many systems use both.', sNoSQL()),
    item('db-cache', '캐시 (캐시 어사이드)', 'Caching · Cache-aside', '자주 읽는 데이터를 메모리 캐시(Redis 등)에 두고, 없을 때만 DB에서 읽어 채워요.', '캐시 무효화가 가장 어려워요. TTL을 두고, 데이터가 바뀌면 캐시를 지우세요. 인기 키가 동시에 만료되면 DB가 몰려 죽는 캐시 스탬피드도 조심해요.', 'Keep frequently read data in an in-memory cache such as Redis, and read from the database only on a miss.', 'Invalidation is the hard part: set TTLs and delete on change. Beware stampedes when a hot key expires and everyone hits the database.', sCache())
  ].concat(XT.add['db-scale'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
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
