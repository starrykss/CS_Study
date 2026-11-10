(() => {
const { scene, node, edge, cell, text, arrow, pill, item, sec, page, C, grid } = CZ;
CZ.tr({ "배열은 메모리에 붙어 있는 칸들이에요": "An array is a row of adjacent memory slots", "arr[3] → 시작 주소 + 3×4, 한 번에 접근 O(1)": "arr[3] → base address + 3×4, one jump: O(1)", "1번 자리에 4를 넣으려면…": "To insert 4 at index 1…", "뒤의 원소를 모두 한 칸씩 밀어야 해요 O(n)": "every later element shifts right: O(n)", "빈자리에 넣기 완료": "then it drops into the gap", "용량 4 / 4": "capacity 4 / 4", "새 배열 · 용량 8": "new array · capacity 8", "가득 찬 상태에서 5를 넣으려 해요": "The array is full and we push 5", "두 배 크기의 새 공간을 잡아요": "Allocate a new block twice as big", "원래 값을 하나씩 복사해요": "Copy the old values over one by one", "이제 빈자리에 5를 넣어요": "Now 5 fits in a free slot", "가끔 복사가 일어나도 평균 O(1) (분할 상환)": "Occasional copies still average O(1) (amortized)", "원하는 자리까지 head부터 따라가요 O(n)": "Walk from head to the spot: O(n)", "새 노드 6을 만들고": "Create a new node 6", "새 노드가 다음 노드(5)를 가리키게 하고": "point it at the next node (5)", "앞 노드의 화살표만 바꾸면 삽입 끝 O(1)": "and re-point the previous node: insert done in O(1)", "push(C) · 마지막에 넣은 게 맨 위": "push(C) · the last one in sits on top", "pop() → C · 나중에 넣은 것이 먼저 나와요 (LIFO)": "pop() → C · last in, first out (LIFO)", "enqueue(A) · 뒤로 들어와요": "enqueue(A) · joins at the back", "dequeue() → A · 먼저 온 것이 먼저 나가요 (FIFO)": "dequeue() → A · first in, first out (FIFO)", "쓰는 위치(write)가 한 칸씩 돌아요": "The write position moves one slot at a time", "읽은 칸은 비워서 다시 써요": "Slots that were read get reused", "끝에 닿으면 처음으로 돌아가요 · 메모리를 새로 잡지 않아요": "At the end it wraps to the start · no new memory needed", "인덱스 접근": "index access", "찾기": "search", "넣기·빼기": "insert / delete", "배열": "array", "연결 리스트": "linked list", "해시 테이블": "hash table", "균형 BST": "balanced BST", "번호로 바로 꺼내야 하면 배열": "Need items by position? Use an array", "키로 찾는 일이 많으면 해시 테이블": "Lots of lookups by key? Use a hash table", "앞뒤로 자주 넣고 빼면 연결 리스트 · 정렬 순서가 필요하면 BST": "Frequent inserts at the ends: linked list · need sorted order: BST", "키를 해시 함수에 넣으면": "Feed a key to the hash function", "항상 같은 칸 번호가 나와요": "and it always returns the same slot number", "그 칸에 바로 저장 O(1)": "Store it right there: O(1)", "\"grape\"도 같은 방법으로": "\"grape\" works the same way", "6번 칸에 저장": "stored in slot 6", "찾을 때도 계산 한 번으로 칸을 바로 찾아요": "Lookups also jump straight to the slot with one hash", "hash(\"cow\") = 2 · 이미 차 있어요 (충돌)": "hash(\"cow\") = 2 · already taken (collision)", "같은 칸에 연결 리스트로 이어 붙여요 (체이닝)": "Chain it onto the same slot as a list (chaining)", "충돌이 많아지면 칸 수를 늘려 다시 배치해요 (리해싱)": "Too many collisions? Grow the table and redistribute (rehash)", "A → 3번": "A → slot 3", "B → 3번": "B → slot 3", "A의 해시값은 3": "A hashes to 3", "3번 칸에 저장": "stored in slot 3", "B의 해시값도 3": "B also hashes to 3", "3번은 이미 차 있어요 → 다음 칸 확인": "Slot 3 is taken → check the next slot", "빈 4번 칸에 저장 (선형 탐사)": "stored in empty slot 4 (linear probing)", "찾을 때도 같은 순서로 따라가요 · 70% 넘게 차면 테이블을 늘려요": "Lookups follow the same path · grow the table past ~70% full", "apple을 해시 3개로 넣으면 1, 5, 9번 비트가 1": "Adding apple with 3 hashes sets bits 1, 5 and 9", "kiwi → 3, 5, 10번": "kiwi → bits 3, 5, 10", "melon → 1, 4, 10 · 4번이 0이라 \"확실히 없음\"": "melon → 1, 4, 10 · bit 4 is 0, so \"definitely absent\"", "grape → 3, 9, 10 · 모두 1이라 \"있을 수도 있음\" (거짓 양성)": "grape → 3, 9, 10 · all 1, so \"maybe present\" (false positive)", "없다는 답은 100% 정확, 있다는 답은 확률적 · 메모리는 아주 작아요": "\"No\" is always right, \"yes\" is probabilistic · tiny memory", "7을 찾아요 · 7 < 8 → 왼쪽": "Find 7 · 7 &lt; 8 → go left", "7 > 3 → 오른쪽": "7 > 3 → go right", "7 > 6 → 오른쪽": "7 > 6 → go right", "찾았어요 · 비교 4번": "Found · 4 comparisons", "한 번 비교할 때마다 절반을 버려요 · 균형이 맞으면 O(log n)": "Each comparison discards half · O(log n) when balanced", "중위 순회: 왼쪽 → 자신 → 오른쪽": "In-order traversal: left → self → right", "BST를 중위 순회하면 정렬된 순서가 나와요": "In-order traversal of a BST yields sorted order", "높이 차 2": "height diff 2", "insert(3) · 한쪽으로 기울어 리스트처럼 됐어요": "insert(3) · it leans to one side like a list", "왼쪽과 오른쪽 높이 차가 2 → 균형이 깨졌어요": "Left and right heights differ by 2 → unbalanced", "왼쪽으로 회전: 2가 루트로 올라가요": "Rotate left: 2 becomes the root", "높이가 다시 log n으로 유지돼요 (AVL·레드블랙 트리)": "Height stays at log n again (AVL, red-black trees)", "최소 힙에 2를 넣으면 맨 끝에 붙여요": "Insert 2 into a min-heap: it goes at the end", "부모(8)보다 작으니 자리를 바꿔요": "Smaller than its parent (8), so swap", "부모(3)보다도 작으니 한 번 더": "Smaller than parent (3) too, swap again", "루트는 항상 최솟값 · 삽입·삭제 O(log n) · 배열 하나로 표현돼요": "Root is always the minimum · insert/delete O(log n) · stored in one array", "\"c\"를 입력하면 c로 내려가요": "Type \"c\" and descend to c", "\"ca\" → a까지": "\"ca\" → down to a", "그 아래 단어 car, cat이 자동 완성 후보예요": "Words below it, car and cat, are the autocomplete suggestions", "찾는 시간은 단어 수가 아니라 글자 수에 비례해요 O(L)": "Lookup time depends on word length, not word count: O(L)", "리프끼리 연결 리스트로 이어져 있어요": "Leaves are linked to each other", "13을 찾아요 · 루트에서 10 ≤ 13 < 20": "Find 13 · at the root, 10 ≤ 13 &lt; 20", "가운데 자식으로 한 번에 내려가요": "Drop straight into the middle child", "디스크를 2번만 읽고 찾았어요": "Found with just 2 disk reads", "범위 검색 13~25: 옆 리프로 이어서 읽어요": "Range 13–25: keep reading across neighbouring leaves", "한 노드에 키를 많이 담아 높이가 낮아요 · DB 인덱스의 기본 구조": "Many keys per node keep it shallow · the standard DB index", "인접 행렬 · O(V²) 공간": "matrix · O(V²) space", "인접 리스트 · O(V+E)": "list · O(V+E)", "간선 A-B는 행렬의 두 칸, 리스트의 두 줄에 기록돼요": "Edge A–B fills two matrix cells and two list entries", "간선이 적은 그래프는 리스트, 연결 확인이 잦으면 행렬": "Sparse graphs: lists · frequent edge checks: matrix", "union(1, 2) · 2의 대표를 1로": "union(1, 2) · 2’s leader becomes 1", "union(2, 4) · 두 집합의 대표 1과 3을 이어요": "union(2, 4) · link the leaders 1 and 3", "find(4): 4 → 3 → 1 · 대표는 1": "find(4): 4 → 3 → 1 · leader is 1", "경로 압축: 4가 대표 1을 바로 가리키게 해요": "Path compression: 4 now points straight to 1", "거의 O(1)로 \"같은 그룹인가?\"를 답해요": "Answers \"same group?\" in nearly O(1)", "최근 사용 ←": "most recent ←", "→ 오래됨": "→ oldest", "용량 3 · 해시맵 + 이중 연결 리스트": "capacity 3 · hash map + doubly linked list", "get(B) · 사용한 항목은": "get(B) · a used item", "맨 앞으로 옮겨요": "moves to the front", "put(D) · 가득 찼으니 가장 오래 안 쓴 C를": "put(D) · full, so the least recently used C", "내보내고": "is evicted", "D를 맨 앞에 넣어요 · 모든 연산 O(1)": "D goes in front · every operation O(1)" });
const X = []; // items in order of sections below
const dash = { background: 'transparent', 'border-style': 'dashed' };

/* ---------- linear ---------- */
function sArray() {
  const S = scene({ id: 'ds-array', steps: 4, per: 1.4 });
  const W = 2.6, G = .3, x0 = 6, y = 8.5, vals = [7, 3, 9, 1, 5, 8];
  for (let i = 0; i < 7; i++) {
    S.el('s' + i, { cls: 'cz-c', x: x0 + i * (W + G), y, w: W, h: W, css: 'border-style:dashed;background:transparent' });
    text(S, 'i' + i, x0 + i * (W + G), y + W + .4, String(i), { w: W, cls: 'cz-t cz-tc' });
    text(S, 'a' + i, x0 + i * (W + G), y - 1.5, '0x' + (100 + i * 4), { w: W, cls: 'cz-t cz-tc cz-mono' });
  }
  vals.forEach((v, i) => cell(S, 'c' + i, x0 + i * (W + G), y, String(v), { w: W, h: W }));
  cell(S, 'n', x0 + 1 * (W + G), y, '4', { w: W, h: W, s: Object.assign({ opacity: '0' }, C.soft) });
  S.set('c3', 1, C.cur).cap(0, '배열은 메모리에 붙어 있는 칸들이에요').cap(1, 'arr[3] → 시작 주소 + 3×4, 한 번에 접근 O(1)');
  S.set('c3', 2, C.idle).cap(2, '1번 자리에 4를 넣으려면…');
  for (let i = 5; i >= 1; i--) S.move('c' + i, 3, x0 + (i + 1) * (W + G), y);
  S.cap(3, '뒤의 원소를 모두 한 칸씩 밀어야 해요 O(n)');
  S.set('n', 4, { opacity: '1' }).cap(4, '빈자리에 넣기 완료');
  return S;
}
function sDyn() {
  const S = scene({ id: 'ds-dynarr', steps: 8, per: .9 });
  const W = 2.4, G = .3, xA = 5, yA = 4.5, yB = 11.5;
  for (let i = 0; i < 4; i++) cell(S, 'a' + i, xA + i * (W + G), yA, String(i + 1), { w: W, h: W });
  S.el('cap4', { cls: 'cz-t', x: xA + 4 * (W + G) + .3, y: yA + .7, html: '용량 4 / 4' });
  for (let i = 0; i < 8; i++) S.el('b' + i, { cls: 'cz-c', x: xA + i * (W + G), y: yB, w: W, h: W, css: 'border-style:dashed;background:transparent', s: { opacity: '0' } });
  S.el('capB', { cls: 'cz-t', x: xA, y: yB + W + .5, html: '새 배열 · 용량 8', s: { opacity: '0' } });
  pill(S, 'new', 24, yA + .3, 'push(5)', { s: Object.assign({ opacity: '1' }, C.cmp) });
  cell(S, 'v5', 24.6, yA, '5', { w: W, h: W, s: { opacity: '0' } });
  S.cap(1, '가득 찬 상태에서 5를 넣으려 해요').set('new', 1, C.warn);
  for (let i = 0; i < 8; i++) S.set('b' + i, 2, { opacity: '1' });
  S.set('capB', 2, { opacity: '1' }).cap(2, '두 배 크기의 새 공간을 잡아요');
  for (let i = 0; i < 4; i++) { S.move('a' + i, 3 + i, xA + i * (W + G), yB); }
  S.cap(3, '원래 값을 하나씩 복사해요');
  S.set('new', 7, { opacity: '0' }).set('v5', 7, Object.assign({ opacity: '1' }, C.soft)).move('v5', 7, xA + 4 * (W + G), yB).cap(7, '이제 빈자리에 5를 넣어요');
  S.set('cap4', 8, { opacity: '0' }).cap(8, '가끔 복사가 일어나도 평균 O(1) (분할 상환)');
  return S;
}
function sLinked() {
  const S = scene({ id: 'ds-linked', steps: 5, per: 1.3 });
  const xs = [2.4, 9.4, 16.4, 23.4], y = 6, vals = [3, 8, 5, 2];
  const nodeBox = (k, x, y, v, p) => S.el(k, Object.assign({ cls: 'cz-c', x, y, w: 4.6, h: 2.4, html: `${v}<i class="ptr"></i>`, css: 'display:flex!important;justify-content:flex-start;padding-left:1.1em' }, p || {}));
  vals.forEach((v, i) => nodeBox('n' + i, xs[i], y, v));
  for (let i = 0; i < 3; i++) arrow(S, 'p' + i, xs[i] + 3.9, y + 1.2, xs[i + 1] - .1, y + 1.2);
  text(S, 'null', 28.6, y + .7, 'null', { cls: 'cz-t cz-mono' });
  arrow(S, 'pz', xs[3] + 3.9, y + 1.2, 28.4, y + 1.2);
  text(S, 'head', xs[0], y - 1.6, 'head', { cls: 'cz-t cz-mono' });
  nodeBox('nw', 12.6, 13.4, 6, { s: Object.assign({ opacity: '0' }, C.soft) });
  arrow(S, 'q1', xs[1] + 3.9, y + 2.2, 13.6, 13.3, { s: { opacity: '0' }, css2: '' });
  arrow(S, 'q2', 16.6, 13.4, xs[2] + .9, y + 2.5, { s: { opacity: '0' } });
  S.set('n0', 1, C.cur).cap(1, '원하는 자리까지 head부터 따라가요 O(n)');
  S.set('n0', 2, C.idle).set('n1', 2, C.cur);
  S.set('nw', 3, { opacity: '1' }).cap(3, '새 노드 6을 만들고');
  S.set('q2', 4, { opacity: '1' }).cap(4, '새 노드가 다음 노드(5)를 가리키게 하고');
  S.set('p1', 5, { opacity: '0' }).set('q1', 5, { opacity: '1' }).set('n1', 5, C.idle).cap(5, '앞 노드의 화살표만 바꾸면 삽입 끝 O(1)');
  return S;
}
function sStack() {
  const S = scene({ id: 'ds-stack', steps: 5, per: 1.1 });
  const x = 12.5, w = 7, bottom = 19.5, h = 2.4;
  S.el('box', { x: x - .4, y: 6.6, w: w + .8, h: bottom - 6.6 + .4, css: 'border:.16em solid var(--ink-3);border-top:0;border-radius:0 0 .8em .8em' });
  const names = ['A', 'B', 'C'];
  names.forEach((n, i) => cell(S, n, x, -4, n, { w, h: h - .2, s: { opacity: '0' } }));
  names.forEach((n, i) => S.set(n, i + 1, { opacity: '1' }).move(n, i + 1, x, bottom - (i + 1) * h));
  S.cap(1, 'push(A)').cap(2, 'push(B)').cap(3, 'push(C) · 마지막에 넣은 게 맨 위').set('C', 3, C.soft);
  S.move('C', 4, x, -4, { opacity: '0' }).cap(4, 'pop() → C · 나중에 넣은 것이 먼저 나와요 (LIFO)');
  S.move('B', 5, x, -4, { opacity: '0' }).cap(5, 'pop() → B');
  text(S, 'lb', 21, 17.7, '← bottom', { cls: 'cz-t' });
  return S;
}
function sQueue() {
  const S = scene({ id: 'ds-queue', steps: 6, per: 1.1 });
  const y = 8.5, W = 3, G = .4, x0 = 7.2;
  S.el('tube', { x: x0 - .5, y: y - .5, w: 5 * (W + G) + .6, h: W + 1, css: 'border:.16em solid var(--ink-3);border-left:0;border-right:0' });
  text(S, 'f', x0 - 2.4, y + 3.8, 'front', { cls: 'cz-t cz-mono' });
  text(S, 'r', x0 + 5 * (W + G) - .4, y + 3.8, 'rear', { cls: 'cz-t cz-mono' });
  const items = ['A', 'B', 'C', 'D'];
  items.forEach(n => cell(S, n, 29, y, n, { w: W, h: W, s: { opacity: '0' } }));
  const slot = i => x0 + i * (W + G);
  S.set('A', 1, { opacity: '1' }).move('A', 1, slot(0), y).cap(1, 'enqueue(A) · 뒤로 들어와요');
  S.set('B', 2, { opacity: '1' }).move('B', 2, slot(1), y).cap(2, 'enqueue(B)');
  S.set('C', 3, { opacity: '1' }).move('C', 3, slot(2), y).cap(3, 'enqueue(C)');
  S.move('A', 4, 1, y, { opacity: '0' }).move('B', 4, slot(0), y).move('C', 4, slot(1), y).cap(4, 'dequeue() → A · 먼저 온 것이 먼저 나가요 (FIFO)');
  S.set('D', 5, { opacity: '1' }).move('D', 5, slot(2), y).cap(5, 'enqueue(D)');
  S.move('B', 6, 1, y, { opacity: '0' }).move('C', 6, slot(0), y).move('D', 6, slot(1), y).cap(6, 'dequeue() → B');
  return S;
}
function sRing() {
  const S = scene({ id: 'ds-ring', steps: 7, per: 1 });
  const cx = 16, cy = 10.3, r = 6.4, N = 8, W = 2.4;
  const pos = i => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const pos2 = (i, rr) => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
  for (let i = 0; i < N; i++) { const [x, y] = pos(i); cell(S, 's' + i, x - W / 2, y - W / 2, '', { w: W, h: W }); }
  const [hx, hy] = pos2(0, 2.6), [tx, ty] = pos2(0, 9.4);
  pill(S, 'H', hx - 1.4, hy - .8, 'read', { w: 2.8, h: 1.6, s: C.soft });
  pill(S, 'T', tx - 1.4, ty - .8, 'write', { w: 2.8, h: 1.6, s: C.cmp });
  const fill = (i, st, v) => S.label('v' + i + '_' + st, { cls: 'cz-t cz-tc cz-mono', x: pos(i)[0] - 1, y: pos(i)[1] - .45, w: 2 }, [[0, ''], [st, v]]);
  const writes = [[1, 0, 'a'], [2, 1, 'b'], [3, 2, 'c']];
  writes.forEach(([st, i, v]) => { S.set('s' + i, st, C.soft); fill(i, st, v); const [x, y] = pos2(i + 1, 9.4); S.move('T', st, x - 1.4, y - .8); });
  S.cap(1, '쓰는 위치(write)가 한 칸씩 돌아요');
  S.set('s0', 4, C.idle); { const [x, y] = pos2(1, 2.6); S.move('H', 4, x - 1.4, y - .8); } S.cap(4, '읽은 칸은 비워서 다시 써요');
  S.set('s1', 5, C.idle); { const [x, y] = pos2(2, 2.6); S.move('H', 5, x - 1.4, y - .8); }
  const more = [[6, 3, 'd'], [7, 4, 'e']];
  more.forEach(([st, i, v]) => { S.set('s' + i, st, C.soft); fill(i, st, v); const [x, y] = pos2(i + 1, 9.4); S.move('T', st, x - 1.4, y - .8); });
  S.cap(6, '끝에 닿으면 처음으로 돌아가요 · 메모리를 새로 잡지 않아요');
  return S;
}

/* ---------- hashing ---------- */
function bucketCol(S, x, y0, n, h) { for (let i = 0; i < n; i++) { cell(S, 'k' + i, x, y0 + i * h, '', { w: 7.4, h: h - .25, css: 'justify-content:start' }); text(S, 'bi' + i, x - 1.6, y0 + i * h + .55, String(i), { cls: 'cz-t cz-mono' }); } }
function sHash() {
  const S = scene({ id: 'ds-hash', steps: 7, per: .95 });
  const bx = 22, by = 1.8, bh = 2.2;
  bucketCol(S, bx, by, 8, bh);
  S.el('fn', { cls: 'cz-c', x: 10, y: 7.2, w: 8.4, h: 4.8, html: 'hash(key) % 8', css: 'border-style:solid;border-color:var(--accent);place-items:end center;padding-bottom:.5em' });
  pill(S, 'k1', 1.4, 3, '"apple"', { w: 5.6 });
  pill(S, 'k2', 1.4, 14, '"grape"', { w: 5.6 });
  S.label('o1', { cls: 'cz-t cz-tc cz-mono', x: 12, y: 12.5, w: 4.4 }, [[0, ''], [2, '→ 3'], [4, ''], [5, '→ 6'], [7, '']]);
  S.move('k1', 1, 11.4, 7.8).cap(1, '키를 해시 함수에 넣으면');
  S.cap(2, '항상 같은 칸 번호가 나와요');
  S.move('k1', 3, bx + .9, by + 3 * bh + .2).set('k1', 3, C.cur).set('k3', 3, C.soft).cap(3, '그 칸에 바로 저장 O(1)');
  S.move('k2', 4, 11.4, 7.8).cap(4, '"grape"도 같은 방법으로');
  S.move('k2', 6, bx + .9, by + 6 * bh + .2).set('k2', 6, C.cur).set('k6', 6, C.soft).cap(6, '6번 칸에 저장');
  S.set('k3', 7, C.okf).cap(7, '찾을 때도 계산 한 번으로 칸을 바로 찾아요');
  return S;
}
function sChain() {
  const S = scene({ id: 'ds-chain', steps: 5, per: 1.1 });
  const bx = 5.5, by = 3, bh = 2.4;
  for (let i = 0; i < 6; i++) { cell(S, 'k' + i, bx, by + i * bh, '', { w: 3, h: bh - .3 }); text(S, 'bi' + i, bx - 1.6, by + i * bh + .6, String(i), { cls: 'cz-t cz-mono' }); }
  const ent = (k, label, row, col) => { pill(S, k, 26, row * bh + by + .2, label, { w: 4.6, h: 1.9, s: Object.assign({ opacity: '0' }, C.soft) }); return [bx + 4.4 + col * 6.2, by + row * bh + .2]; };
  const a = ent('cat', '"cat"', 2, 0), b = ent('dog', '"dog"', 4, 0), c = ent('cow', '"cow"', 2, 1);
  arrow(S, 'r1', bx + 3, by + 2 * bh + 1.05, bx + 4.3, by + 2 * bh + 1.05, { s: { opacity: '0' } });
  arrow(S, 'r2', bx + 3, by + 4 * bh + 1.05, bx + 4.3, by + 4 * bh + 1.05, { s: { opacity: '0' } });
  arrow(S, 'r3', bx + 9, by + 2 * bh + 1.05, bx + 10.5, by + 2 * bh + 1.05, { s: { opacity: '0' } });
  S.set('cat', 1, { opacity: '1' }).move('cat', 1, a[0], a[1]).set('r1', 1, { opacity: '1' }).cap(1, 'hash("cat") = 2');
  S.set('dog', 2, { opacity: '1' }).move('dog', 2, b[0], b[1]).set('r2', 2, { opacity: '1' }).cap(2, 'hash("dog") = 4');
  S.set('cow', 3, Object.assign({ opacity: '1' }, C.cmp)).cap(3, 'hash("cow") = 2 · 이미 차 있어요 (충돌)').set('k2', 3, C.cmp);
  S.move('cow', 4, c[0], c[1]).set('r3', 4, { opacity: '1' }).cap(4, '같은 칸에 연결 리스트로 이어 붙여요 (체이닝)');
  S.set('k2', 5, C.idle).set('cow', 5, C.soft).cap(5, '충돌이 많아지면 칸 수를 늘려 다시 배치해요 (리해싱)');
  return S;
}
function sProbe() {
  const S = scene({ id: 'ds-probe', steps: 6, per: 1 });
  const W = 3, G = .3, x0 = 3.2, y = 10;
  const lab = { 3: [[0, ''], [2, 'A']], 4: [[0, ''], [5, 'B']] };
  for (let i = 0; i < 8; i++) { cell(S, 's' + i, x0 + i * (W + G), y, '', { w: W, h: W }); text(S, 'i' + i, x0 + i * (W + G), y + W + .4, String(i), { w: W, cls: 'cz-t cz-tc' }); if (lab[i]) S.label('v' + i, { cls: 'cz-t cz-tc cz-mono', x: x0 + i * (W + G), y: y + 1, w: W, css: 'z-index:3' }, lab[i]); }
  pill(S, 'A', 13.5, 4, 'A → 3번', { w: 5, h: 2, s: Object.assign({ opacity: '0' }, C.soft) });
  pill(S, 'B', 13.5, 4, 'B → 3번', { w: 5, h: 2, s: Object.assign({ opacity: '0' }, C.cmp) });
  S.set('A', 1, { opacity: '1' }).cap(1, 'A의 해시값은 3');
  S.set('A', 2, { opacity: '0' }).set('s3', 2, C.soft).cap(2, '3번 칸에 저장');
  S.set('B', 3, { opacity: '1' }).cap(3, 'B의 해시값도 3');
  S.set('s3', 4, C.bad).cap(4, '3번은 이미 차 있어요 → 다음 칸 확인');
  S.set('B', 5, { opacity: '0' }).set('s3', 5, C.soft).set('s4', 5, C.ok).cap(5, '빈 4번 칸에 저장 (선형 탐사)');
  S.cap(6, '찾을 때도 같은 순서로 따라가요 · 70% 넘게 차면 테이블을 늘려요');
  return S;
}
function sBloom() {
  const S = scene({ id: 'ds-bloom', steps: 6, per: 1.3 });
  const W = 2.1, G = .2, x0 = 2.3, y = 11, N = 13, setAt = { 1: 1, 5: 1, 9: 1, 3: 2, 10: 2 };
  for (let i = 0; i < N; i++) {
    cell(S, 'b' + i, x0 + i * (W + G), y, '', { w: W, h: W });
    text(S, 'i' + i, x0 + i * (W + G), y + W + .3, String(i), { w: W, cls: 'cz-t cz-tc' });
    S.label('o' + i, { cls: 'cz-t cz-tc cz-mono', x: x0 + i * (W + G), y: y + .6, w: W, css: 'z-index:3' }, setAt[i] ? [[0, '0'], [setAt[i], '1']] : [[0, '0']]);
    if (setAt[i]) S.set('b' + i, setAt[i], C.soft);
  }
  pill(S, 'p1', 13.4, 4, 'apple', { w: 5.2 });
  pill(S, 'p2', 13.4, 4, 'kiwi', { w: 5.2, s: { opacity: '0', background: 'var(--accent-soft)', color: 'var(--ink)' } });
  pill(S, 'q1', 13.4, 4, 'melon?', { w: 5.2, s: Object.assign({ opacity: '0' }, C.cmp) });
  pill(S, 'q2', 13.4, 4, 'grape?', { w: 5.2, s: Object.assign({ opacity: '0' }, C.cmp) });
  S.set('p1', 1, C.cur).cap(1, 'apple을 해시 3개로 넣으면 1, 5, 9번 비트가 1');
  S.set('p1', 2, { opacity: '0' }).set('p2', 2, { opacity: '1' }).cap(2, 'kiwi → 3, 5, 10번');
  S.set('p2', 3, { opacity: '0' }).set('q1', 3, { opacity: '1' }).set('b4', 3, C.bad).cap(3, 'melon → 1, 4, 10 · 4번이 0이라 "확실히 없음"');
  S.set('q1', 5, { opacity: '0' }).set('b4', 5, C.idle).set('q2', 5, { opacity: '1' });
  [3, 9, 10].forEach(i => S.set('b' + i, 5, C.cmp)); S.cap(5, 'grape → 3, 9, 10 · 모두 1이라 "있을 수도 있음" (거짓 양성)');
  S.cap(6, '없다는 답은 100% 정확, 있다는 답은 확률적 · 메모리는 아주 작아요');
  return S;
}

/* ---------- trees ---------- */
const BST = { 8: [16, 3.4], 3: [9, 8.6], 10: [23, 8.6], 1: [5, 13.8], 6: [13, 13.8], 14: [27, 13.8], 4: [10.6, 19], 7: [15.4, 19], 13: [24.6, 19] };
const BSTE = [[8, 3], [8, 10], [3, 1], [3, 6], [10, 14], [6, 4], [6, 7], [14, 13]];
function drawTree(S, P, E, pfx = '') { E.forEach(([a, b]) => edge(S, pfx + 'e' + a + '_' + b, P[a][0], P[a][1], P[b][0], P[b][1])); Object.entries(P).forEach(([k, [x, y]]) => node(S, pfx + 'n' + k, x, y, k)); }
function sBST() {
  const S = scene({ id: 'ds-bst', steps: 5, per: 1.2 });
  drawTree(S, BST, BSTE);
  S.set('n8', 1, C.cur).cap(1, '7을 찾아요 · 7 < 8 → 왼쪽');
  S.set('n8', 2, C.soft).set('e8_3', 2, { background: 'var(--accent)' }).set('n3', 2, C.cur).cap(2, '7 > 3 → 오른쪽');
  S.set('n3', 3, C.soft).set('e3_6', 3, { background: 'var(--accent)' }).set('n6', 3, C.cur).cap(3, '7 > 6 → 오른쪽');
  S.set('n6', 4, C.soft).set('e6_7', 4, { background: 'var(--accent)' }).set('n7', 4, C.okf).cap(4, '찾았어요 · 비교 4번');
  S.cap(5, '한 번 비교할 때마다 절반을 버려요 · 균형이 맞으면 O(log n)');
  return S;
}
function sTrav() {
  const P = { A: [16, 3.4], B: [9, 8.6], C: [23, 8.6], D: [5, 13.8], E: [13, 13.8], F: [19, 13.8], G: [27, 13.8] };
  const E = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['C', 'G']];
  const order = ['D', 'B', 'E', 'A', 'F', 'C', 'G'];
  const S = scene({ id: 'ds-trav', steps: 8, per: .85, capY: 21.6 });
  drawTree(S, P, E);
  order.forEach((k, i) => {
    S.set('n' + k, i + 1, C.cur); if (i > 0) S.set('n' + order[i - 1], i + 1, C.ok);
    cell(S, 'r' + i, 7.6 + i * 2.5, 17.3, k, { w: 2.2, h: 2.2, s: Object.assign({ opacity: '0' }, C.soft) }); S.set('r' + i, i + 1, { opacity: '1' });
  });
  S.set('nG', 8, C.ok);
  S.cap(0, '중위 순회: 왼쪽 → 자신 → 오른쪽').cap(8, 'BST를 중위 순회하면 정렬된 순서가 나와요');
  return S;
}
function sAVL() {
  const S = scene({ id: 'ds-avl', steps: 6, per: 1.2 });
  const before = { 1: [10, 4], 2: [16, 9.5], 3: [22, 15] }, after = { 1: [10, 10.5], 2: [16, 4], 3: [22, 10.5] };
  edge(S, 'e12', 10, 4, 16, 9.5, { s: { opacity: '0' } }); edge(S, 'e23', 16, 9.5, 22, 15, { s: { opacity: '0' } });
  edge(S, 'f21', 16, 4, 10, 10.5, { s: { opacity: '0' } }); edge(S, 'f23', 16, 4, 22, 10.5, { s: { opacity: '0' } });
  [1, 2, 3].forEach(k => node(S, 'n' + k, before[k][0], before[k][1], String(k), { s: { opacity: '0' } }));
  S.label('bf', { cls: 'cz-t cz-mono', x: 6.2, y: 1.6, w: 6 }, [[0, ''], [4, '높이 차 2'], [5, '']]);
  S.set('n1', 1, { opacity: '1' }).cap(1, 'insert(1)');
  S.set('n2', 2, { opacity: '1' }).set('e12', 2, { opacity: '1' }).cap(2, 'insert(2)');
  S.set('n3', 3, { opacity: '1' }).set('e23', 3, { opacity: '1' }).cap(3, 'insert(3) · 한쪽으로 기울어 리스트처럼 됐어요');
  S.set('n1', 4, C.bad).cap(4, '왼쪽과 오른쪽 높이 차가 2 → 균형이 깨졌어요');
  [1, 2, 3].forEach(k => S.move('n' + k, 5, after[k][0] - 1.15, after[k][1] - 1.15));
  S.set('e12', 5, { opacity: '0' }).set('e23', 5, { opacity: '0' }).set('f21', 5, { opacity: '1' }).set('f23', 5, { opacity: '1' }).set('n1', 5, C.idle).cap(5, '왼쪽으로 회전: 2가 루트로 올라가요');
  [1, 2, 3].forEach(k => S.set('n' + k, 6, C.ok)); S.cap(6, '높이가 다시 log n으로 유지돼요 (AVL·레드블랙 트리)');
  return S;
}
function sHeap() {
  const S = scene({ id: 'ds-heap', steps: 6, per: 1.1, capY: 21.8 });
  const P = [[16, 2.6], [9.5, 6.9], [22.5, 6.9], [6, 11.2], [13, 11.2], [19, 11.2], [26, 11.2]];
  const vals = [3, 5, 8, 9, 6, 10, 2];
  [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].forEach(([a, b]) => edge(S, `e${a}${b}`, P[a][0], P[a][1], P[b][0], P[b][1], b === 6 ? { s: { opacity: '0' } } : {}));
  const W = 2.4, x0 = (32 - 7 * 2.6) / 2, ay = 15.8;
  vals.forEach((v, i) => {
    node(S, 't' + i, P[i][0], P[i][1], String(v), i === 6 ? { s: Object.assign({ opacity: '0' }, C.cur) } : {});
    cell(S, 'a' + i, x0 + i * 2.6, ay, String(v), { w: W, h: W, s: i === 6 ? Object.assign({ opacity: '0' }, C.cur) : {} });
    text(S, 'ai' + i, x0 + i * 2.6, ay + W + .3, String(i), { w: W, cls: 'cz-t cz-tc' });
  });
  const tmv = (i, slot, st) => S.move('t' + i, st, P[slot][0] - 1.15, P[slot][1] - 1.15);
  const amv = (i, slot, st) => S.move('a' + i, st, x0 + slot * 2.6, ay);
  S.set('t6', 1, { opacity: '1' }).set('a6', 1, { opacity: '1' }).set('e26', 1, { opacity: '1' }).cap(1, '최소 힙에 2를 넣으면 맨 끝에 붙여요');
  S.set('t2', 2, C.cmp).set('a2', 2, C.cmp).cap(2, '부모(8)보다 작으니 자리를 바꿔요');
  tmv(6, 2, 3); tmv(2, 6, 3); amv(6, 2, 3); amv(2, 6, 3); S.set('t2', 3, C.idle).set('a2', 3, C.idle);
  S.set('t0', 4, C.cmp).set('a0', 4, C.cmp).cap(4, '부모(3)보다도 작으니 한 번 더');
  tmv(6, 0, 5); tmv(0, 2, 5); amv(6, 0, 5); amv(0, 2, 5); S.set('t0', 5, C.idle).set('a0', 5, C.idle);
  S.set('t6', 6, C.okf).set('a6', 6, C.okf).cap(6, '루트는 항상 최솟값 · 삽입·삭제 O(log n) · 배열 하나로 표현돼요');
  return S;
}
function sTrie() {
  const S = scene({ id: 'ds-trie', steps: 4, per: 1.4 });
  const P = { r: [16, 2.6, '·'], c: [10, 7.2, 'c'], d: [24, 7.2, 'd'], a: [6.5, 11.8, 'a'], u: [13.5, 11.8, 'u'], o: [24, 11.8, 'o'], R: [4, 16.4, 'r'], T: [9, 16.4, 't'], p: [13.5, 16.4, 'p'], g: [24, 16.4, 'g'] };
  const E = [['r', 'c'], ['r', 'd'], ['c', 'a'], ['c', 'u'], ['d', 'o'], ['a', 'R'], ['a', 'T'], ['u', 'p'], ['o', 'g']];
  E.forEach(([a, b]) => edge(S, 'e' + a + b, P[a][0], P[a][1], P[b][0], P[b][1]));
  Object.entries(P).forEach(([k, [x, y, l]]) => node(S, 'n' + k, x, y, l, { r: 1.05 }));
  ['R', 'T', 'p', 'g'].forEach(k => S.el('w' + k, { x: P[k][0] - 1.3, y: P[k][1] - 1.3, w: 2.6, h: 2.6, css: 'border-radius:50%;border:.14em solid var(--ok);z-index:1' }));
  S.el('ip', { cls: 'cz-c', x: 23, y: 18.6, w: 7, h: 2.2, html: '', css: 'justify-content:start;padding-left:.6em' });
  S.label('typed', { cls: 'cz-t cz-mono', x: 23.6, y: 19.2, w: 6 }, [[0, ''], [1, 'c'], [2, 'ca']]);
  S.set('nc', 1, C.cur).set('erc', 1, { background: 'var(--accent)' }).cap(1, '"c"를 입력하면 c로 내려가요');
  S.set('nc', 2, C.soft).set('na', 2, C.cur).set('eca', 2, { background: 'var(--accent)' }).cap(2, '"ca" → a까지');
  S.set('nR', 3, C.okf).set('nT', 3, C.okf).set('eaR', 3, { background: 'var(--ok)' }).set('eaT', 3, { background: 'var(--ok)' }).cap(3, '그 아래 단어 car, cat이 자동 완성 후보예요');
  S.cap(4, '찾는 시간은 단어 수가 아니라 글자 수에 비례해요 O(L)');
  return S;
}
function sBplus() {
  const S = scene({ id: 'ds-btree', steps: 6, per: 1.1 });
  const key = (k, x, y, v) => cell(S, k, x, y, v, { w: 2.4, h: 2.2 });
  key('r0', 12.8, 2.6, '10'); key('r1', 15.2, 2.6, '20');
  const leaves = [[2, ['3', '5', '8']], [12, ['10', '13', '17']], [22, ['20', '25', '30']]];
  leaves.forEach(([x, ks], i) => ks.forEach((v, j) => key(`l${i}${j}`, x + j * 2.4, 11, v)));
  edge(S, 'p0', 13.4, 4.8, 5.6, 11); edge(S, 'p1', 15.2, 4.8, 15.6, 11); edge(S, 'p2', 17, 4.8, 25.6, 11);
  arrow(S, 'n0', 9.3, 12.1, 11.9, 12.1); arrow(S, 'n1', 19.3, 12.1, 21.9, 12.1);
  text(S, 'lt', 2, 14.4, '리프끼리 연결 리스트로 이어져 있어요', { cls: 'cz-t' });
  S.set('r0', 1, C.cur).set('r1', 1, C.cur).cap(1, '13을 찾아요 · 루트에서 10 ≤ 13 < 20');
  S.set('r0', 2, C.idle).set('r1', 2, C.idle).set('p1', 2, { background: 'var(--accent)' }).set('l10', 2, C.soft).set('l11', 2, C.soft).set('l12', 2, C.soft).cap(2, '가운데 자식으로 한 번에 내려가요');
  S.set('l11', 3, C.okf).cap(3, '디스크를 2번만 읽고 찾았어요');
  S.set('l12', 4, C.okf).set('n1', 4, { background: 'var(--ok)' }).cap(4, '범위 검색 13~25: 옆 리프로 이어서 읽어요');
  S.set('l20', 5, C.okf).set('l21', 5, C.okf);
  S.cap(6, '한 노드에 키를 많이 담아 높이가 낮아요 · DB 인덱스의 기본 구조');
  return S;
}

/* ---------- graphs & practical ---------- */
function sGraph() {
  const S = scene({ id: 'ds-graph', steps: 4, per: 1.3 });
  const P = { A: [4, 5], B: [10, 5], C: [4, 12], D: [10, 12] };
  const E = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
  E.forEach(([a, b]) => edge(S, 'e' + a + b, P[a][0], P[a][1], P[b][0], P[b][1]));
  Object.entries(P).forEach(([k, [x, y]]) => node(S, 'n' + k, x, y, k));
  const L = ['A', 'B', 'C', 'D'], adj = { A: 'BC', B: 'AD', C: 'AD', D: 'BC' };
  const mx = 14, my = 3.3, cs = 1.8;
  L.forEach((r, i) => { text(S, 'mr' + i, mx - 1.2, my + 1.8 + i * cs + .35, r, { cls: 'cz-t' }); text(S, 'mc' + i, mx + 1.8 + i * cs + .5, my + .2, r, { cls: 'cz-t' }); });
  L.forEach((r, i) => L.forEach((c, j) => cell(S, `m${r}${c}`, mx + 1.8 + j * cs, my + 1.8 + i * cs, adj[r].includes(c) ? '1' : '0', { w: cs - .15, h: cs - .15 })));
  L.forEach((r, i) => { cell(S, 'lr' + r, 23.6, my + 1.8 + i * 1.8, r, { w: 1.65, h: 1.65 }); text(S, 'll' + r, 25.7, my + 2.05 + i * 1.8, `→ ${adj[r].split('').join(' → ')}`, { cls: 'cz-t cz-mono' }); });
  text(S, 'th1', mx + 1.8, 13.4, '인접 행렬 · O(V²) 공간', { cls: 'cz-t' }); text(S, 'th2', 23.6, 13.4, '인접 리스트 · O(V+E)', { cls: 'cz-t' });
  E.forEach(([a, b], k) => {
    const st = k + 1;
    S.set('e' + a + b, st, { background: 'var(--accent)' }).set('m' + a + b, st, C.cur).set('m' + b + a, st, C.cur).set('lr' + a, st, C.soft).set('lr' + b, st, C.soft);
    if (k > 0) { const [p, q] = E[k - 1]; S.set('e' + p + q, st, { background: 'var(--line)' }).set('m' + p + q, st, C.idle).set('m' + q + p, st, C.idle).set('lr' + p, st, C.idle).set('lr' + q, st, C.idle); }
  });
  S.cap(1, '간선 A-B는 행렬의 두 칸, 리스트의 두 줄에 기록돼요').cap(4, '간선이 적은 그래프는 리스트, 연결 확인이 잦으면 행렬');
  return S;
}
function sUF() {
  const S = scene({ id: 'ds-uf', steps: 6, per: 1.2 });
  const top = 4, mid = 10.5, low = 17;
  const X0 = { 1: 5, 2: 10.5, 3: 16, 4: 21.5, 5: 27 };
  [1, 2, 3, 4, 5].forEach(k => node(S, 'n' + k, X0[k], top, String(k)));
  edge(S, 'a12', 5, top, 5, mid, { s: { opacity: '0' } });
  edge(S, 'a34', 16, top, 16, mid, { s: { opacity: '0' } });
  edge(S, 'a13', 5, top, 11, mid, { s: { opacity: '0' } });
  edge(S, 'a34b', 11, mid, 11, low, { s: { opacity: '0' } });
  edge(S, 'a14', 5, top, 16, mid, { s: { opacity: '0' } });
  S.move('n2', 1, 5 - 1.15, mid - 1.15).set('a12', 1, { opacity: '1' }).cap(1, 'union(1, 2) · 2의 대표를 1로');
  S.move('n4', 2, 16 - 1.15, mid - 1.15).set('a34', 2, { opacity: '1' }).cap(2, 'union(3, 4)');
  S.move('n2', 3, 1.5 - 1.15, mid - 1.15).set('a12', 3, { opacity: '0' });
  edge(S, 'a12b', 5, top, 1.5, mid, { s: { opacity: '0' } }); S.set('a12b', 3, { opacity: '1' });
  S.move('n3', 3, 11 - 1.15, mid - 1.15).move('n4', 3, 11 - 1.15, low - 1.15).set('a34', 3, { opacity: '0' }).set('a13', 3, { opacity: '1' }).set('a34b', 3, { opacity: '1' }).cap(3, 'union(2, 4) · 두 집합의 대표 1과 3을 이어요');
  S.set('n4', 4, C.cur).set('n3', 4, C.soft).set('n1', 4, C.okf).cap(4, 'find(4): 4 → 3 → 1 · 대표는 1');
  S.move('n4', 5, 16 - 1.15, mid - 1.15).set('a34b', 5, { opacity: '0' }).set('a14', 5, { opacity: '1' }).set('n3', 5, C.idle).cap(5, '경로 압축: 4가 대표 1을 바로 가리키게 해요');
  S.set('n4', 6, C.idle).set('n1', 6, C.idle).cap(6, '거의 O(1)로 "같은 그룹인가?"를 답해요');
  return S;
}
function sLRU() {
  const S = scene({ id: 'ds-lru', steps: 5, per: 1.3 });
  const W = 4, G = 1.2, x0 = 7, y = 8.5, slot = i => x0 + i * (W + G);
  text(S, 'mr', x0 - .2, y - 1.8, '최근 사용 ←', { cls: 'cz-t' }); text(S, 'lr', slot(2) + .2, y - 1.8, '→ 오래됨', { cls: 'cz-t' });
  ['A', 'B', 'C'].forEach((k, i) => cell(S, k, slot(i), y, k, { w: W, h: 3 }));
  cell(S, 'D', 26.6, y, 'D', { w: W, h: 3, s: Object.assign({ opacity: '0' }, C.soft) });
  S.el('cap3', { cls: 'cz-t', x: x0, y: y + 4.2, html: '용량 3 · 해시맵 + 이중 연결 리스트' });
  S.set('B', 1, C.cur).cap(1, 'get(B) · 사용한 항목은');
  S.move('B', 2, slot(0), y).move('A', 2, slot(1), y).cap(2, '맨 앞으로 옮겨요');
  S.set('B', 3, C.idle).set('D', 3, { opacity: '1' }).set('C', 3, C.bad).cap(3, 'put(D) · 가득 찼으니 가장 오래 안 쓴 C를');
  S.move('C', 4, 26, y + 6, { opacity: '0' }).cap(4, '내보내고');
  S.move('D', 5, slot(0), y).move('B', 5, slot(1), y).move('A', 5, slot(2), y).cap(5, 'D를 맨 앞에 넣어요 · 모든 연산 O(1)');
  return S;
}
function sCheat() {
  const S = scene({ id: 'ds-cheat', steps: 4, per: 1.5 });
  const rows = [['배열', 'O(1)', 'O(n)', 'O(n)'], ['연결 리스트', 'O(n)', 'O(n)', 'O(1)'], ['해시 테이블', '—', 'O(1)', 'O(1)'], ['균형 BST', 'O(log n)', 'O(log n)', 'O(log n)']];
  const head = ['', '인덱스 접근', '찾기', '넣기·빼기'], cw = [6.8, 6.2, 6.2, 6.2], x0 = 3, y0 = 3.2, rh = 3;
  let x = x0; head.forEach((h, j) => { text(S, 'h' + j, x, y0, h, { w: cw[j] - .2, cls: 'cz-t cz-tc' }); x += cw[j]; });
  rows.forEach((r, i) => { let x = x0; r.forEach((v, j) => { cell(S, `c${i}${j}`, x, y0 + 1.6 + i * rh, v, { w: cw[j] - .25, h: rh - .3, css: j === 0 ? 'font-family:var(--f-txt)' : '' }); x += cw[j]; }); });
  const good = [[0, 1], [2, 2], [2, 3], [1, 3]];
  good.forEach(([i, j], k) => S.set(`c${i}${j}`, k + 1, C.okf));
  S.cap(1, '번호로 바로 꺼내야 하면 배열').cap(2, '키로 찾는 일이 많으면 해시 테이블').cap(4, '앞뒤로 자주 넣고 빼면 연결 리스트 · 정렬 순서가 필요하면 BST');
  return S;
}

const CSS = `
.ds-linked .ptr{position:absolute;right:1.15em;top:50%;width:.5em;height:.5em;margin-top:-.25em;border-radius:50%;background:var(--ink-2)}
.ds-linked .cz-c::after{content:"";position:absolute;right:1.55em;top:.25em;bottom:.25em;width:.1em;background:var(--line)}
`;

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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'dsx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono dsx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono dsx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c dsx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono dsx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c dsx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'dsx-s dsx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono dsx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono dsx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono dsx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono dsx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono dsx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'dsx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'dsx-xs', 5));


const CSSX = `
.dsx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.dsx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.dsx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.dsx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.dsx-r .in{color:var(--danger);font-weight:800}
.dsx-g .in{color:var(--ok);font-weight:800}
.dsx-a .in{color:var(--accent);font-weight:800}
.dsx-w .in{color:var(--warn);font-weight:800}
.dsx-c .in{font-size:.6em;font-weight:700}
.dsx-c2 .in{font-size:.5em;font-weight:700}
.dsx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.dsx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'dsx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));
const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };

/* ================= linear ================= */
function sDeque() {
  const S = scene({ id: 'ds-deque', steps: 5, per: 1.6 });
  const X = i => 4 + i * 2.9;
  for (let i = 0; i < 8; i++) { box2(S, 's' + i, X(i), 2.6, 2.7, 1.6, '', 'line', 0, { pct: 45 }); T(S, 'si' + i, X(i), 4.35, String(i), 'cz-tc cz-mono dsx-tiny', 0, { w: 2.7 }); }
  [[2, '3', 1, 0], [3, '5', 1, 0], [4, '7', 1, 0], [1, '1', 2, 3], [5, '9', 2, 3]].forEach(([i, v, st, off]) => box2(S, 'v' + v, X(i), 2.6, 2.7, 1.6, v, st === 1 ? 'accent' : 'ok', st, { pct: 35, off }));
  [[2, 1, 2], [1, 2, 3], [2, 3, 0]].forEach(([i, st, off], j) => T(S, 'f' + j, X(i), 1.3, 'front', 'cz-tc cz-mono dsx-tiny dsx-a', st, { w: 2.7, off }));
  [[4, 1, 2], [5, 2, 3], [4, 3, 0]].forEach(([i, st, off], j) => T(S, 'b' + j, X(i), 1.3, 'back', 'cz-tc cz-mono dsx-tiny dsx-w', st, { w: 2.7, off }));
  T(S, 'o1', X(1), 5.1, ['→ 1', '→ 1'], 'cz-tc cz-mono dsx-xs dsx-r', 3, { w: 2.7 }); T(S, 'o9', X(5), 5.1, ['→ 9', '→ 9'], 'cz-tc cz-mono dsx-xs dsx-r', 3, { w: 2.7 });
  stepT(S, 'k', 1, 6.4, [['덱: 양끝에서 넣고 빼는 큐 (double-ended queue)', 'a deque: a queue you can push and pop at both ends'], ['push_front(1), push_back(9): 양끝 모두 O(1)', 'push_front(1), push_back(9): O(1) at both ends'], ['pop_back() → 9, pop_front() → 1', 'pop_back() → 9, pop_front() → 1'], ['원형 버퍼로 구현: front/back 인덱스를 모듈러로 돌려요', 'built on a ring buffer: front/back indices wrap around']], 'dsx-s');
  T(S, 'w0', 1, 8, ['응용: 슬라이딩 윈도 최댓값 (k = 3)', 'use: sliding-window maximum (k = 3)'], 'dsx-xs dsx-a', 4);
  T(S, 'w1', 1, 9.1, 'nums: 4  2  12  3  8  5  1', 'cz-mono dsx-xs', 4); T(S, 'w2', 1, 10.1, 'max :       12 12 12 8  8', 'cz-mono dsx-xs dsx-g', 4);
  T(S, 'w3', 14, 9.1, ['덱에 “감소하는 후보”만 남기면', 'keep only decreasing candidates in the deque'], 'dsx-xs', 4); T(S, 'w4', 14, 10.1, ['각 원소가 한 번씩 들어가고 나가서 O(n)', 'each element enters and leaves once: O(n)'], 'dsx-xs', 4);
  fin(S, 'z', 11.8, [['덱 = 스택 + 큐: 앞뒤 어느 쪽에서도 O(1)로 넣고 빼요', 'a deque is a stack and a queue in one: O(1) at either end', 'dsx-xs dsx-a'], ['Python collections.deque, Java ArrayDeque, C++ std::deque', 'Python collections.deque, Java ArrayDeque, C++ std::deque'], ['BFS(0-1 BFS), 작업 훔치기(work stealing) 스케줄러, 실행 취소 기록 제한에 써요', 'used in 0-1 BFS, work-stealing schedulers and capped undo histories']]);
  S.cap(1, '양끝이 열린 큐', 'A queue open at both ends').cap(2, '앞뒤로 넣기', 'Push at both ends').cap(3, '앞뒤로 빼기', 'Pop at both ends').cap(4, '응용: 윈도 최댓값', 'Use: window maximum').cap(5, '덱 (Deque)', 'Deques');
  return S;
}
function sMonoStack() {
  const S = scene({ id: 'ds-monostack', steps: 5, per: 1.6 });
  const A = [2, 7, 3, 5, 4, 6, 8], ANS = [[7, 2], [8, 3], [5, 2], [6, 3], [6, 3], [8, 3], [-1, 3]], X = i => 1 + i * 3;
  A.forEach((v, i) => { box2(S, 'a' + i, X(i), 1.6, 2.8, 1.5, String(v), 'accent', 0, { pct: 25 }); T(S, 'ai' + i, X(i), .6, 'i' + i, 'cz-tc cz-mono dsx-tiny', 0, { w: 2.8 }); });
  T(S, 'al', 22, 1.9, ['배열', 'array'], 'dsx-xs', 0);
  ANS.forEach(([v, st], i) => box2(S, 'r' + i, X(i), 3.6, 2.8, 1.5, String(v), v < 0 ? 'line' : 'ok', st, { pct: 35 }));
  T(S, 'rl', 22, 3.9, ['오른쪽 첫 큰 수', 'next greater'], 'dsx-xs dsx-g', 1);
  T(S, 'st', 26, 7.4, ['스택', 'stack'], 'dsx-xs dsx-a', 1);
  [[['7', '5'], 2, 3], [['8'], 3, 0]].forEach(([vals, st, off], j) => vals.forEach((v, i) => box2(S, `k${j}_${i}`, 26, 12 - (i + 1) * 1.6, 4, 1.4, v, 'warn', st, { pct: 35, off })));
  hl(S, 'sb', 25.6, 30.4, 12.1, 'ink-3', 1, { w: .1 });
  stepT(S, 'k', 1, 6, [['목표: 각 원소의 오른쪽에서 처음 나오는 더 큰 수 · 이중 루프면 O(n²)', 'goal: the first larger value to the right of each element · nested loops cost O(n²)'], ['7이 2를 꺼냄 → 2의 답 7 · 5가 3을 꺼냄 → 3의 답 5', '7 pops 2 → answer 7 · 5 pops 3 → answer 5'], ['6이 4, 5를 꺼냄 · 8이 6, 7을 꺼냄 · 남은 8은 -1', '6 pops 4 and 5 · 8 pops 6 and 7 · the leftover 8 gets -1'], ['스택은 항상 위로 갈수록 작아요(단조 감소)', 'the stack always decreases toward the top (monotonic)']], 'dsx-xs dsx-a');
  T(S, 'c1', 1, 7.4, ['새 원소보다 작은 것은 모두 꺼내며 답을 확정 → 새 원소를 쌓기', 'pop everything smaller than the new element, fixing answers → push it'], 'dsx-xs', 2);
  T(S, 'c2', 1, 8.6, ['각 원소는 한 번 쌓이고 한 번 꺼내져서 전체 O(n)', 'each element is pushed and popped once: O(n) overall'], 'dsx-xs dsx-g', 4);
  T(S, 'c3', 1, 9.6, ['응용: 일일 온도, 주가 스팬, 히스토그램의 가장 큰 직사각형', 'uses: daily temperatures, stock span, largest rectangle in a histogram'], 'dsx-xs', 4);
  fin(S, 'z', 13.2, [['단조 스택: 원소가 한 방향으로 정렬된 상태를 유지하는 스택', 'a monotonic stack keeps its elements sorted in one direction', 'dsx-xs dsx-a'], ['“가장 가까운 더 큰/작은 값” 문제를 O(n²)에서 O(n)으로 줄여요', 'it cuts “nearest greater/smaller element” problems from O(n²) to O(n)']]);
  S.cap(1, '오른쪽 첫 큰 수 찾기', 'Find the next greater element').cap(2, '작은 것을 꺼내며 답 확정', 'Pop smaller ones, fix answers').cap(3, '끝까지 처리', 'Finish the pass').cap(4, '왜 O(n)인가', 'Why it’s O(n)').cap(5, '단조 스택', 'Monotonic stacks');
  return S;
}
function sSkip() {
  const S = scene({ id: 'ds-skiplist', steps: 5, per: 1.6 });
  const V = [1, 4, 7, 9, 12, 17, 20, 25], X = v => v === 'H' ? 1 : 3.8 + V.indexOf(v) * 3.25, Y = [6.4, 4.2, 2], LV = [V, [7, 12, 20, 25], [12, 25]];
  LV.forEach((vals, l) => { const st = l ? 2 : 1, y = Y[l], nodes = ['H', ...vals];
    nodes.forEach(v => box2(S, `n${l}_${v}`, X(v), y, 2.4, 1.3, String(v), v === 'H' ? 'line' : 'accent', st, { pct: 30 }));
    for (let i = 1; i < nodes.length; i++) ar(S, `e${l}_${i}`, [X(nodes[i - 1]) + 2.45, y + .65], [X(nodes[i]) - .05, y + .65], 'ink-3', st, { h: .08 });
    if (l) vals.forEach(v => seg(S, `d${l}_${v}`, [X(v) + 1.2, y + 1.35], [X(v) + 1.2, Y[l - 1] - .05], st, 'line', .08)); });
  seg(S, 'dH1', [2.2, 3.35], [2.2, 4.15], 2, 'line', .08); seg(S, 'dH0', [2.2, 5.55], [2.2, 6.35], 2, 'line', .08);
  ['n2_H', 'n2_12', 'n1_12', 'n0_12', 'n0_17'].forEach(k => tsets(S, k, [[3, k === 'n0_17' ? 'ok' : 'warn', 45]]));
  ['n2_25', 'n1_20'].forEach(k => tsets(S, k, [[3, 'danger', 30]]));
  stepT(S, 'k', 1, 8.4, [['맨 아래: 정렬된 연결 리스트 → 찾으려면 O(n)', 'bottom: a sorted linked list → search is O(n)'], ['위층은 “급행 차선”: 노드마다 동전을 던져 1/2 확률로 한 층씩 올려요', 'upper levels are express lanes: each node is promoted with probability 1/2 (coin flips)'], ['17 찾기: H → 12 → (25 > 17, 내려감) → (20 > 17, 내려감) → 17 ✓', 'find 17: H → 12 → (25 > 17, go down) → (20 > 17, go down) → 17 ✓'], ['삽입: 동전으로 높이를 정하고 각 층에 끼워 넣기 · 기대 O(log n)', 'insert: flip coins for the height and splice into each level · expected O(log n)']], 'dsx-xs dsx-a');
  fin(S, 'z', 10.4, [['스킵 리스트: 여러 층의 연결 리스트로 균형 트리 같은 O(log n) 탐색을 얻어요', 'a skip list stacks linked lists to get balanced-tree O(log n) search', 'dsx-xs dsx-a'], ['회전 없이 확률로 균형을 맞춰 구현이 간단하고, 동시성 버전을 만들기도 쉬워요', 'balance comes from randomness, not rotations, so it’s simple and easy to make concurrent'], ['Redis 정렬 집합(ZSET), LevelDB·RocksDB의 memtable, Java ConcurrentSkipListMap', 'Redis sorted sets (ZSET), LevelDB/RocksDB memtables and Java’s ConcurrentSkipListMap']]);
  S.cap(1, '정렬된 연결 리스트', 'A sorted linked list').cap(2, '급행 차선 쌓기', 'Stack up express lanes').cap(3, '위에서부터 탐색', 'Search from the top').cap(4, '삽입은 동전 던지기', 'Insert by coin flips').cap(5, '스킵 리스트', 'Skip lists');
  return S;
}

/* ================= hashing ================= */
function sCuckoo() {
  const S = scene({ id: 'ds-cuckoo', steps: 5, per: 1.6 });
  const Y = i => 1.6 + i * 1.5, X1 = 4, X2 = 20;
  T(S, 't1', X1, .4, 'T1 · h1', 'cz-mono dsx-s dsx-a', 0); T(S, 't2', X2, .4, 'T2 · h2', 'cz-mono dsx-s dsx-w', 0);
  for (let i = 0; i < 5; i++) { box2(S, 'p' + i, X1, Y(i), 6, 1.3, '', 'line', 0, { pct: 45 }); box2(S, 'q' + i, X2, Y(i), 6, 1.3, '', 'line', 0, { pct: 45 }); T(S, 'pi' + i, X1 - 1.2, Y(i) + .3, String(i), 'cz-mono dsx-tiny', 0); T(S, 'qi' + i, X2 - 1.2, Y(i) + .3, String(i), 'cz-mono dsx-tiny', 0); }
  box2(S, 'A', X1 + .2, Y(1) + .1, 5.6, 1.1, 'A', 'accent', 1, { pct: 40 }); box2(S, 'B', X2 + .2, Y(3) + .1, 5.6, 1.1, 'B', 'warn', 1, { pct: 40 });
  box2(S, 'Cn', 12.4, Y(0), 4, 1.3, ['C 삽입', 'insert C'], 'ok', 2, { pct: 40, off: 3 }); box2(S, 'C', X1 + .2, Y(1) + .1, 5.6, 1.1, 'C', 'ok', 3, { pct: 45 });
  S.move('A', 3, X2 + .2, Y(3) + .1); S.move('B', 3, X1 + .2, Y(4) + .1);
  ar(S, 'k1', [10.1, Y(1) + .65], [19.9, Y(3) + .5], 'danger', 2, { h: .1, off: 4 }); T(S, 'k1l', 11.6, 3.7, ['A를 쫓아냄 → h2(A) = 3', 'A kicked → h2(A) = 3'], 'dsx-tiny dsx-r', 2, { off: 4 });
  ar(S, 'k2', [19.9, Y(3) + .9], [10.1, Y(4) + .6], 'danger', 2, { h: .1, off: 4 }); T(S, 'k2l', 11.6, 6.9, ['B를 쫓아냄 → h1(B) = 4', 'B kicked → h1(B) = 4'], 'dsx-tiny dsx-r', 2, { off: 4 });
  T(S, 'h', 26.8, 1.6, 'h1(C) = 1', 'cz-mono dsx-xs', 2); T(S, 'h2', 26.8, 2.6, 'h1(A) = 1', 'cz-mono dsx-xs', 1); T(S, 'h3', 26.8, 3.6, 'h2(A) = 3', 'cz-mono dsx-xs', 1); T(S, 'h4', 26.8, 4.6, 'h1(B) = 4', 'cz-mono dsx-xs', 1); T(S, 'h5', 26.8, 5.6, 'h2(B) = 3', 'cz-mono dsx-xs', 1);
  tsets(S, 'B', [[4, 'ok', 50]]); tsets(S, 'q3', [[4, 'line', 45]]);
  stepT(S, 'k', 1, 9.4, [['해시 함수 두 개, 테이블 두 개: 키마다 들어갈 수 있는 자리는 딱 두 곳', 'two hash functions, two tables: each key has exactly two possible homes'], ['C의 자리에 A가 있으면 A를 쫓아내고, A는 자기 다른 자리로 → 연쇄로 B도 이동', 'if A sits in C’s slot, evict A to its other home → which in turn bumps B'], ['자리가 모두 정해졌어요 · 쫓겨난 키도 결국 빈자리를 찾음', 'everyone has a slot now · the evicted keys found empty ones'], ['조회: B는 T1[h1(B)] 아니면 T2[h2(B)] → 최악에도 2곳만 확인 (O(1))', 'lookup: B is at T1[h1(B)] or T2[h2(B)] → at most two probes, worst case O(1)']], 'dsx-xs dsx-a');
  fin(S, 'z', 11.2, [['쿠쿠 해싱: 뻐꾸기처럼 남의 둥지를 빼앗아 넣고, 쫓겨난 키는 다른 자리로', 'cuckoo hashing: like the bird, take the nest and send the evicted key to its other spot', 'dsx-xs dsx-a'], ['쫓아내기가 순환하면 해시 함수를 바꿔 전체를 다시 넣어요 (적재율 약 50%까지)', 'if evictions cycle, rehash everything with new functions (load factor up to ~50%)'], ['조회 지연이 일정해야 하는 네트워크 장비, 쿠쿠 필터(블룸 필터 대안)에 써요', 'used where lookup latency must be predictable, e.g. network switches and cuckoo filters']]);
  S.cap(1, '두 테이블, 두 자리', 'Two tables, two homes').cap(2, '쫓아내며 삽입', 'Insert by evicting').cap(3, '연쇄 이동 완료', 'The chain settles').cap(4, '조회는 두 곳만', 'Lookups check two slots').cap(5, '쿠쿠 해싱', 'Cuckoo hashing');
  return S;
}
function sCms() {
  const S = scene({ id: 'ds-cms', steps: 5, per: 1.6 });
  const X = j => 6 + j * 2.6, Y = r => 2 + r * 1.8, after = [[[2, 1], [6, 2]], [[5, 3]], [[0, 1], [3, 2]]];
  for (let r = 0; r < 3; r++) { T(S, 'rl' + r, 3.4, Y(r) + .35, 'h' + (r + 1), 'cz-mono dsx-xs dsx-a', 0); for (let j = 0; j < 8; j++) { const ch = after[r].find(([c]) => c === j); box2(S, `c${r}_${j}`, X(j), Y(r), 2.4, 1.5, '', 'line', 0, { pct: 45 }); T(S, `z${r}_${j}`, X(j), Y(r) + .4, '0', 'cz-tc cz-mono dsx-xs', 0, { w: 2.4, off: ch ? 2 : 0 }); if (ch) { T(S, `n${r}_${j}`, X(j), Y(r) + .4, String(ch[1]), 'cz-tc cz-mono dsx-xs', 2, { w: 2.4 }); tsets(S, `c${r}_${j}`, [[2, 'accent', 30]]); } } }
  for (let j = 0; j < 8; j++) T(S, 'ci' + j, X(j), .9, String(j), 'cz-tc cz-mono dsx-tiny', 0, { w: 2.4 });
  T(S, 'a1', 1, 7.8, ['+1 cat → h1:2, h2:5, h3:0', '+1 cat → h1:2, h2:5, h3:0'], 'cz-mono dsx-xs', 2); T(S, 'a2', 1, 8.8, ['+2 dog → h1:6, h2:5, h3:3   (h2에서 cat과 충돌 → 3)', '+2 dog → h1:6, h2:5, h3:3   (collides with cat in h2 → 3)'], 'cz-mono dsx-xs dsx-w', 2);
  [['c0_2', 'ok'], ['c1_5', 'warn'], ['c2_0', 'ok']].forEach(([k, c]) => tsets(S, k, [[3, c, 45], [4, 'accent', 30]]));
  T(S, 'q', 1, 10.2, ['cat 추정 = min(1, 3, 1) = 1 ✓', 'estimate(cat) = min(1, 3, 1) = 1 ✓'], 'cz-mono dsx-s dsx-g', 3);
  T(S, 'q2', 1, 11.4, ['충돌은 값을 키우기만 해서 → 최솟값이 가장 정확 (과대 추정만, 과소는 없음)', 'collisions only inflate counts → the minimum is the best guess (overestimates only)'], 'dsx-xs', 3);
  T(S, 'p1', 1, 12.6, ['메모리 고정 (d × w칸) · 오차 ≈ (e / w) × 전체 개수, 확률 e^(−d)로 보장', 'fixed memory (d × w cells) · error ≈ (e / w) × total, guaranteed with probability 1 − e^(−d)'], 'dsx-xs dsx-a', 4);
  fin(S, 'z', 14, [['카운트-민 스케치: 해시 행렬에 개수를 더하고, 행들의 최솟값으로 빈도를 추정해요', 'count-min sketch: add counts into a hashed matrix and estimate frequency by the row minimum', 'dsx-xs dsx-a'], ['스트림의 인기 검색어(heavy hitters), 네트워크 트래픽 분석, 실시간 트렌드 Top-K', 'used for heavy hitters in streams, network traffic analysis and real-time trending top-K'], ['“몇 번?”은 카운트-민, “몇 종류?”는 HyperLogLog, “있나?”는 블룸 필터', '“how many times?” is count-min, “how many distinct?” HyperLogLog, “is it there?” a Bloom filter']]);
  S.cap(1, '해시 3개 × 칸 8개', 'Three hashes × eight cells').cap(2, '들어올 때마다 더하기', 'Add on every arrival').cap(3, '최솟값으로 추정', 'Estimate with the minimum').cap(4, '고정 메모리와 오차', 'Fixed memory, bounded error').cap(5, '카운트-민 스케치', 'Count-min sketch');
  return S;
}

/* ================= trees ================= */
function sRbt() {
  const S = scene({ id: 'ds-rbtree', steps: 5, per: 1.7 });
  const R = 1.1, BLK = 'ink-2', node = (k, x, y, l, st) => stt(S, k, x, y, l, BLK, st, { r: R, pct: 30 }), mv = (k, st, x, y) => { S.move(k, st, x - R, y - R); S.move(k + 'l', st, x - R, y - .45); };
  node('n20', 15, 2.4, '20', 0); node('n10', 10, 6, '10', 0); node('n5', 6, 9.6, '5', 2); node('n15', 17.5, 9.6, '15', 4);
  const red = (k, steps) => tsets(S, k, steps);
  red('n10', [[0, 'danger', 35], [3, BLK, 30]]); red('n20', [[0, BLK, 30], [3, 'danger', 35], [4, BLK, 30]]); red('n5', [[2, 'danger', 35], [4, BLK, 30]]); red('n15', [[4, 'danger', 35]]);
  mv('n10', 3, 15, 2.4); mv('n20', 3, 20, 6); mv('n5', 3, 10, 6);
  gs(S, 'e1', [15, 2.4], [10, 6], 0, 'ink-3', .1, R, { off: 3 }); gs(S, 'e2', [10, 6], [6, 9.6], 2, 'danger', .14, R, { off: 3 });
  gs(S, 'e3', [15, 2.4], [10, 6], 3, 'ink-3', .1, R); gs(S, 'e4', [15, 2.4], [20, 6], 3, 'ink-3', .1, R); gs(S, 'e5', [20, 6], [17.5, 9.6], 4, 'ink-3', .1, R);
  T(S, 'v2', 3.4, 7.4, ['빨강–빨강 ✗', 'red–red ✗'], 'dsx-xs dsx-r', 2, { off: 3 });
  [['① 노드는 빨강 또는 검정', '① red or black'], ['② 루트는 검정', '② the root is black'], ['③ 빨강이 연달아 X', '③ no two reds in a row'], ['④ 경로마다 검정 수 같음', '④ same black count per path']].forEach((t, i) => T(S, 'rule' + i, 23.2, 1.4 + i * 1.1, t, 'dsx-xs', 1));
  T(S, 'res', 23.2, 6.2, ['→ 높이 ≤ 2·log₂(n + 1)', '→ height ≤ 2·log₂(n + 1)'], 'dsx-xs dsx-g', 1);
  stepT(S, 'k', 1, 11.6, [['검정 루트 20, 빨강 자식 10 · 새 노드는 항상 빨강으로 넣어요', 'black root 20, red child 10 · new nodes always go in red'], ['5를 넣으니 10–5가 빨강–빨강 · 삼촌(20의 오른쪽)이 없음(검정)', 'inserting 5 makes 10–5 red–red · the uncle (20’s right) is empty, i.e. black'], ['삼촌이 검정 → 회전 + 색 바꾸기: 10이 검정 루트, 5와 20은 빨강', 'black uncle → rotate and recolor: 10 becomes the black root, 5 and 20 red'], ['15를 넣으니 20–15 충돌 · 삼촌 5가 빨강 → 색만 바꿔요 (5, 20 검정)', 'inserting 15 clashes 20–15 · the uncle 5 is red → just recolor (5 and 20 black)']], 'dsx-xs dsx-a');
  fin(S, 'z', 13.2, [['레드-블랙 트리: 색 규칙으로 높이를 2 log n 이하로 묶어 탐색·삽입·삭제 모두 O(log n)', 'red-black trees bound height by 2 log n with color rules: search, insert and delete in O(log n)', 'dsx-xs dsx-a'], ['AVL보다 덜 엄격해 회전이 적고 쓰기가 많은 곳에 유리해요', 'looser than AVL, so fewer rotations and better for write-heavy use'], ['Java TreeMap, C++ std::map, 리눅스 CFS 스케줄러, epoll이 써요', 'used by Java TreeMap, C++ std::map, Linux’s CFS scheduler and epoll']]);
  S.cap(1, '네 가지 색 규칙', 'Four color rules').cap(2, '빨강이 연달아 나왔어요', 'Two reds in a row').cap(3, '회전과 색 바꾸기', 'Rotate and recolor').cap(4, '색만 바꿔도 될 때', 'When recoloring is enough').cap(5, '레드-블랙 트리', 'Red-black trees');
  return S;
}
function sSegTree() {
  const S = scene({ id: 'ds-segtree', steps: 5, per: 1.6 });
  const A = [5, 8, 6, 3, 2, 7, 2, 6], LX = i => 1.5 + i * 3.6, L1 = [[13, '0–1'], [9, '2–3'], [9, '4–5'], [8, '6–7']], L2 = [[22, '0–3'], [17, '4–7']];
  const val = (k, x, y, w, v, st, nv) => { T(S, k + 't', x, y + .32, String(v), 'cz-tc cz-mono dsx-s', st, { w, off: nv !== undefined ? 4 : 0 }); if (nv !== undefined) T(S, k + 'u', x, y + .32, String(nv), 'cz-tc cz-mono dsx-s dsx-w', 4, { w }); };
  A.forEach((v, i) => { box2(S, 'a' + i, LX(i), 10.2, 3.2, 1.4, '', 'accent', 1, { pct: 25 }); val('a' + i, LX(i), 10.2, 3.2, v, 1, i === 4 ? 10 : undefined); T(S, 'ai' + i, LX(i), 11.7, 'a' + i, 'cz-tc cz-mono dsx-tiny', 1, { w: 3.2 }); });
  L1.forEach(([v, r], k) => { const x = 2.9 + k * 7.2; box2(S, 'b' + k, x, 7.4, 4, 1.4, '', 'ok', 2, { pct: 25 }); val('b' + k, x, 7.4, 4, v, 2, k === 2 ? 17 : undefined); T(S, 'br' + k, x, 6.85, r, 'cz-tc cz-mono dsx-tiny', 2, { w: 4 }); gs(S, 'eb' + k + 'a', [x + 2, 8.8], [LX(2 * k) + 1.6, 10.2], 2, 'ink-3', .07, 0); gs(S, 'eb' + k + 'b', [x + 2, 8.8], [LX(2 * k + 1) + 1.6, 10.2], 2, 'ink-3', .07, 0); });
  L2.forEach(([v, r], m) => { const x = 6.5 + m * 14.4; box2(S, 'c' + m, x, 4.6, 4, 1.4, '', 'ok', 2, { pct: 25 }); val('c' + m, x, 4.6, 4, v, 2, m === 1 ? 25 : undefined); T(S, 'cr' + m, x, 4.05, r, 'cz-tc cz-mono dsx-tiny', 2, { w: 4 }); gs(S, 'ec' + m + 'a', [x + 2, 6], [2.9 + 2 * m * 7.2 + 2, 7.4], 2, 'ink-3', .07, 0); gs(S, 'ec' + m + 'b', [x + 2, 6], [2.9 + (2 * m + 1) * 7.2 + 2, 7.4], 2, 'ink-3', .07, 0); });
  box2(S, 'root', 13.7, 1.8, 4, 1.4, '', 'ok', 2, { pct: 30 }); val('root', 13.7, 1.8, 4, 39, 2, 47); T(S, 'rr', 13.7, 1.25, '0–7', 'cz-tc cz-mono dsx-tiny', 2, { w: 4 });
  gs(S, 'er1', [15.7, 3.2], [8.5, 4.6], 2, 'ink-3', .07, 0); gs(S, 'er2', [15.7, 3.2], [22.9, 4.6], 2, 'ink-3', .07, 0);
  ['b1', 'b2', 'a6'].forEach(k => tsets(S, k, [[3, 'warn', 45], [4, k === 'b2' ? 'danger' : k === 'a6' ? 'accent' : 'ok', k === 'b2' ? 35 : 25]]));
  ['a4', 'c1', 'root'].forEach(k => tsets(S, k, [[4, 'danger', 35]]));
  T(S, 'q', 20, 1.6, ['sum(a2..a6) = 9 + 9 + 2 = 20', 'sum(a2..a6) = 9 + 9 + 2 = 20'], 'cz-mono dsx-xs dsx-w', 3, { off: 4 });
  T(S, 'u', 20, 1.6, ['a4 = 10 → 위로 4개만 갱신', 'a4 = 10 → update 4 nodes up'], 'cz-mono dsx-xs dsx-r', 4);
  stepT(S, 'k', 1, 12.6, [['배열 8칸 · 구간 합을 자주 물어요', 'an 8-element array, queried for range sums'], ['아래에서 위로 두 칸씩 합쳐 트리를 만들어요 (O(n))', 'build bottom-up by summing pairs (O(n))'], ['구간 [2, 6]은 노드 3개로 덮여요 → O(log n)', 'range [2, 6] is covered by just 3 nodes → O(log n)'], ['값 하나를 바꾸면 루트까지 경로만 갱신 → O(log n)', 'a point update touches only the path to the root → O(log n)']], 'dsx-xs dsx-a');
  fin(S, 'z', 13.8, [['세그먼트 트리: 구간마다 합(또는 최소·최대)을 저장해 구간 질의와 갱신을 모두 O(log n)', 'a segment tree stores sums (or min/max) per range: range queries and updates in O(log n)', 'dsx-xs dsx-a'], ['배열 2n칸으로 구현 · 지연 전파(lazy propagation)로 구간 갱신도 O(log n)', 'fits in a 2n array · lazy propagation makes range updates O(log n) too']]);
  S.cap(1, '원본 배열', 'The array').cap(2, '구간 합 트리 만들기', 'Build the range-sum tree').cap(3, '구간 질의', 'A range query').cap(4, '한 점 갱신', 'A point update').cap(5, '세그먼트 트리', 'Segment trees');
  return S;
}
function sFenwick() {
  const S = scene({ id: 'ds-fenwick', steps: 5, per: 1.6 });
  const A = [5, 8, 6, 3, 2, 7, 2, 6], W = 3.5, X = i => 2 + (i - 1) * W, low = i => i & -i, lvl = { 1: 0, 2: 1, 4: 2, 8: 3 }, TV = [0, 5, 13, 6, 22, 2, 9, 2, 39];
  A.forEach((v, j) => { const i = j + 1; box2(S, 'a' + i, X(i), 10.6, W - .2, 1.3, `a${i} = ${v}`, 'accent', 0, { pct: 25 }); });
  for (let i = 1; i <= 8; i++) { const L = lvl[low(i)], y = 8.8 - L * 1.6, x0 = X(i - low(i) + 1); box2(S, 't' + i, x0, y, X(i) + W - .2 - x0, 1.2, `t[${i}] = ${TV[i]}`, 'ok', 2, { pct: 30 }); }
  ['t7', 't6', 't4'].forEach(k => tsets(S, k, [[3, 'warn', 45], [4, 'ok', 30]]));
  ['t3', 't4', 't8'].forEach(k => tsets(S, k, [[4, 'danger', 35]])); tsets(S, 'a3', [[4, 'danger', 35]]);
  code(S, 'cd', 1, .6, 30, ['sum(i): while i > 0: s += t[i]; i -= i & -i      // 7 → 6 → 4 → 0', 'add(i, d): while i <= n: t[i] += d; i += i & -i  // 3 → 4 → 8'], [[0, 3], [1, 4]], { st: 3 });
  stepT(S, 'k', 1, 12.3, [['누적 합을 자주 묻고 값도 자주 바뀌는 배열', 'an array with frequent prefix-sum queries and updates'], ['t[i]는 (i − i&−i, i] 구간의 합 · 막대 길이 = i의 가장 낮은 1비트', 't[i] sums the range (i − i&−i, i] · bar length = i’s lowest set bit'], ['prefix(7) = t[7] + t[6] + t[4] = 2 + 9 + 22 = 33', 'prefix(7) = t[7] + t[6] + t[4] = 2 + 9 + 22 = 33'], ['a3 += 4 → t[3], t[4], t[8]만 고쳐요', 'a3 += 4 → fix only t[3], t[4] and t[8]']], 'dsx-xs dsx-a');
  fin(S, 'z', 13.6, [['펜윅 트리(BIT): 배열 하나와 비트 연산 i & −i만으로 누적 합 질의·갱신을 O(log n)', 'a Fenwick tree (BIT) does prefix sums and updates in O(log n) with one array and i & −i', 'dsx-xs dsx-a'], ['세그먼트 트리보다 짧고 빠르지만, 최솟값 같은 일반 구간 연산엔 덜 유연해요', 'shorter and faster than a segment tree, but less flexible for operations like range minimum'], ['구간 합 = prefix(r) − prefix(l − 1) · 순위 통계, 역순 쌍 세기에 자주 써요', 'range sum = prefix(r) − prefix(l − 1) · common in rank statistics and inversion counting']]);
  S.cap(1, '원본 배열', 'The array').cap(2, '최하위 비트만큼의 구간', 'Ranges sized by the low bit').cap(3, '누적 합: 비트를 지우며', 'Prefix sum: clear bits').cap(4, '갱신: 비트를 더하며', 'Update: add bits').cap(5, '펜윅 트리', 'Fenwick trees');
  return S;
}

/* ================= practical ================= */
function sQuad() {
  const S = scene({ id: 'ds-quadtree', steps: 5, per: 1.6 });
  rect(S, 'hit', 8.05, 8.05, 6.9, 6.9, 'ok', 18, 4, { r: .05 });
  frame(S, 'sq', 1, 1, 14, 14, 'ink-3', 0, { w: .1, r: .1 });
  const P = [[3, 3], [5.5, 3.5], [12, 2.5], [13.5, 6], [10, 10], [3, 12], [5.5, 13.5], [13, 13]];
  P.forEach(([x, y], i) => pt(S, 'p' + i, x, y, 0, C.cur, .32));
  seg(S, 'v1', [8, 1], [8, 15], 2, 'accent', .1); seg(S, 'h1', [1, 8], [15, 8], 2, 'accent', .1);
  [[4.5, 1, 8], [11.5, 1, 8], [4.5, 8, 15], [11.5, 8, 15]].forEach(([x, a, b], i) => seg(S, 'v2' + i, [x, a], [x, b], 3, 'warn', .07));
  [[4.5, 1, 8], [4.5, 8, 15], [11.5, 1, 8], [11.5, 8, 15]].forEach(([y, a, b], i) => seg(S, 'h2' + i, [a, y], [b, y], 3, 'warn', .07));
  frame(S, 'qr', 9, 9, 5, 5.4, 'danger', 4, { dash: 1, w: .12, r: .1 });
  [0, 1, 2, 3, 5, 6].forEach(i => S.set('p' + i, 4, { opacity: '.25' })); [4, 7].forEach(i => S.set('p' + i, 4, C.okf || C.cur));
  box2(S, 'root', 21.5, 1, 5, 1.3, ['루트 (8점)', 'root (8 pts)'], 'accent', 2, { pct: 30 });
  ['NW', 'NE', 'SW', 'SE'].forEach((q, i) => { const x = 17 + i * 3.6; box2(S, 'q' + i, x, 3.6, 3.3, 1.2, q + ' · 2', 'accent', 2, { pct: 20 }); gs(S, 'qe' + i, [24, 2.3], [x + 1.65, 3.6], 2, 'ink-3', .07, 0); for (let j = 0; j < 2; j++) { box2(S, `l${i}_${j}`, x + j * 1.7, 5.6, 1.5, 1, '1', 'warn', 3, { pct: 30 }); gs(S, `le${i}_${j}`, [x + 1.65, 4.8], [x + j * 1.7 + .75, 5.6], 3, 'ink-3', .06, 0); } });
  tsets(S, 'q3', [[4, 'ok', 45]]); ['q0', 'q1', 'q2'].forEach(k => S.set(k, 4, { opacity: '.35' }));
  stepT(S, 'k', 17, 7.4, [['이웃·범위 검색에 모든 점을 다 봐야 할까?', 'must every query check every point?'], ['4등분 후, 점 2개 이상인 칸만 다시 분할', 'split in four; split again where 2+ points'], ['칸마다 점이 1개가 될 때까지 재귀 분할', 'recurse until each cell has one point'], ['범위 질의: 겹치는 SE만 내려가요', 'range query: descend only into SE']], 'dsx-xs dsx-a');
  T(S, 'k5', 17, 8.4, ['나머지 3개는 통째로 건너뛰기', 'skip the other three entirely'], 'dsx-xs dsx-g', 4);
  fin(S, 'z', 15.4, [['쿼드트리: 2D 공간을 4등분하며 점을 담아, 볼 필요 없는 영역을 통째로 건너뛰어요', 'a quadtree splits 2D space into quadrants so whole regions can be skipped', 'dsx-xs dsx-a'], ['k-d 트리는 x·y를 번갈아 2등분, R-트리는 겹치는 사각형으로 묶어요 (PostGIS 공간 인덱스)', 'k-d trees alternate x/y splits; R-trees group overlapping rectangles (PostGIS spatial indexes)'], ['게임 충돌 감지, 지도 타일, 근처 가게 검색, 이미지 압축에 써요', 'used for game collision detection, map tiles, “near me” search and image compression']]);
  S.cap(1, '흩어진 점들', 'Scattered points').cap(2, '4등분', 'Split into four').cap(3, '붐비는 칸은 다시 분할', 'Split crowded cells again').cap(4, '범위 질의는 일부만', 'Range queries visit a few').cap(5, '쿼드트리와 공간 인덱스', 'Quadtrees and spatial indexes');
  return S;
}
function sPersist() {
  const S = scene({ id: 'ds-persist', steps: 5, per: 1.6 });
  T(S, 'v1l', 1, 1.6, 'v1 →', 'cz-mono dsx-s dsx-a', 1);
  [['1', 9], ['2', 13], ['3', 17]].forEach(([v, x], i) => { box2(S, 'L' + v, x, 1.3, 2.6, 1.4, v, 'accent', 1, { pct: 30 }); if (i) ar(S, 'La' + v, [x - 1.35, 2], [x - .05, 2], 'ink-3', 1, { h: .08 }); });
  ar(S, 'v1a', [4.2, 2], [8.9, 2], 'accent', 1, { h: .08 });
  T(S, 'v2l', 1, 3.9, 'v2 →', 'cz-mono dsx-s dsx-g', 2); box2(S, 'L0', 5, 3.6, 2.6, 1.4, '0', 'ok', 2, { pct: 35 });
  elb(S, 'L0a', [[7.7, 4.3], [10.3, 4.3], [10.3, 2.8]], 'ok', 2, { h: .08 });
  T(S, 'ln', 13, 3.9, ['v2 = 0 :: v1 · v1은 그대로, 1→2→3은 공유', 'v2 = 0 :: v1 · v1 untouched, 1→2→3 shared'], 'dsx-xs dsx-g', 2);
  const N = { A: [8, 6.6], B: [4.6, 9], C: [11.4, 9], D: [2.8, 11.4], E: [6.4, 11.4], F: [9.6, 11.4], G: [13.2, 11.4] }, E = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['C', 'G']];
  E.forEach(([a, b], i) => gs(S, 'te' + i, N[a], N[b], 3, 'ink-3', .08, .85));
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 't' + k, x, y, k, 'accent', 3, { r: .85, pct: 18 }));
  T(S, 'tv1', 6.6, 5.2, 'v1', 'cz-mono dsx-xs dsx-a', 3);
  const M = { A: [21, 6.6], C: [24.4, 9], G: [26.2, 11.4] };
  Object.entries(M).forEach(([k, [x, y]]) => stt(S, 'm' + k, x, y, k + "'", 'ok', 3, { r: .85, pct: 40 }));
  gs(S, 'me1', M.A, M.C, 3, 'ok', .1, .85); gs(S, 'me2', M.C, M.G, 3, 'ok', .1, .85);
  gs(S, 'sh1', M.A, N.B, 3, 'ok', .08, .85, { dash: 1 }); gs(S, 'sh2', M.C, N.F, 3, 'ok', .08, .85, { dash: 1 });
  T(S, 'tv2', 19.6, 5.2, 'v2', 'cz-mono dsx-xs dsx-g', 3);
  tsets(S, 'tG', [[3, 'line', 40]]);
  T(S, 'tn', 15.6, 12.9, ['G만 바꿨는데 새로 만든 건 경로 3개뿐 · 점선 = 공유', 'changing G copied only its 3-node path · dashed = shared'], 'dsx-xs dsx-g', 3);
  T(S, 'k4', 1, 13.9, ['되돌리기·시간 여행, Redux/Immer, Clojure·Scala 벡터, Git 커밋이 같은 원리', 'undo/time travel, Redux/Immer, Clojure/Scala vectors and Git commits all work this way'], 'dsx-xs dsx-a', 4);
  fin(S, 'z', 15.2, [['영속 자료구조: 바꿀 때 원본을 고치지 않고 새 버전을 만들되, 바뀌지 않은 부분은 공유해요', 'persistent data structures make a new version on change while sharing every unchanged part', 'dsx-xs dsx-a'], ['경로 복사 덕분에 갱신 비용은 O(log n) · 옛 버전은 그대로 읽을 수 있어 동시성에도 안전', 'path copying keeps updates at O(log n), and old versions stay readable, which is safe for concurrency']]);
  S.cap(1, '불변 리스트 v1', 'An immutable list v1').cap(2, '앞에 붙여 v2', 'Prepend to get v2').cap(3, '트리는 경로만 복사', 'Trees copy just the path').cap(4, '어디에 쓰나', 'Where it’s used').cap(5, '영속 자료구조', 'Persistent data structures');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'dsx-xs', i + 1, { off: i + 2 }));
function sBplus() {
  const S = scene({ id: 'ds-bplus', steps: 5, per: 1.7 });
  const KW = 1.7, KH = 1.25, root = [10, 20, 30], RX = 12.6, RY = 1.4;
  const leaves = [[1, 5, 8], [10, 12, 15], [20, 22, 25], [30, 33, 38]], LX = i => 1.6 + i * 7.6, LY = 7.4;
  root.forEach((k, j) => cell(S, 'r' + j, RX + j * KW, RY, KW, KH, String(k), 'accent', 22, 0));
  T(S, 'rl', RX + 3 * KW + .4, RY + .25, ['내부 노드: 길잡이 키만', 'internal node: signpost keys only'], 'dsx-xs dsx-a', 1);
  leaves.forEach((L, i) => { L.forEach((k, j) => cell(S, `l${i}${j}`, LX(i) + j * KW, LY, KW, KH, String(k), 'ok', 18, 0));
    const px = RX + i * KW - (i ? 0 : .05); seg(S, 'e' + i, [Math.min(px, RX + 3 * KW), RY + KH], [LX(i) + 1.5 * KW, LY - .05], 0, 'ink-3', .07);
    T(S, 'rw' + i, LX(i), LY + KH + .2, ['행 ×3', '3 rows'], 'cz-tc dsx-xs', 1, { w: 3 * KW });
    if (i < 3) ar(S, 'lk' + i, [LX(i) + 3 * KW + .1, LY + KH / 2], [LX(i + 1) - .1, LY + KH / 2], 'ok', 1, { h: .1 }); });
  T(S, 'll', 1.6, LY + 2.3, ['리프: 모든 키와 실제 데이터 · 옆 리프와 연결', 'leaves: every key with its data · linked side by side'], 'dsx-xs dsx-g', 1);
  tsets(S, 'r1', [[2, 'warn', 40], [3, 'accent', 22]]); tsets(S, 'l21', [[2, 'danger', 40], [3, 'warn', 40], [4, 'ok', 18]]);
  seg(S, 'sp', [RX + 2 * KW, RY + KH], [LX(2) + 1.5 * KW, LY - .05], 2, 'danger', .12, { off: 3 });
  T(S, 'q1', 1.6, 11.6, ['22 찾기: 20 ≤ 22 < 30 → 세 번째 리프로 내려가요', 'find 22: 20 ≤ 22 < 30 → down to the third leaf'], 'cz-mono dsx-xs dsx-r', 2, { off: 3 });
  ['l11', 'l12', 'l20', 'l22', 'l30', 'l31'].forEach(k => tsets(S, k, [[3, 'warn', 40], [4, 'ok', 18]]));
  T(S, 'q2', 1.6, 11.6, ['범위 12 ~ 33: 12를 찾은 뒤 옆 리프로 쭉 걸어가요', 'range 12–33: find 12, then walk the leaf links'], 'cz-mono dsx-xs dsx-w', 3, { off: 4 });
  ar(S, 'walk', [LX(1) + .4, LY + KH + 2.2], [LX(3) + 2 * KW, LY + KH + 2.2], 'warn', 3, { h: .14, off: 4 });
  T(S, 'f1', 1.6, 11.6, ['16KB 페이지에 키+포인터 ≈ 14B → 노드 하나에 자식 ~1000개', '16 KB page, ≈ 14 B per key + pointer → ~1000 children per node'], 'dsx-xs', 4);
  T(S, 'f2', 1.6, 12.8, ['3단계만으로 1000³ ≈ 10억 행 · 디스크 읽기 3번', 'three levels reach 1000³ ≈ a billion rows · three disk reads'], 'dsx-xs dsx-a', 4);
  T(S, 'f3', 1.6, 14.0, ['B-트리는 내부 노드에도 데이터 → 자식 수가 줄고 범위 검색이 위아래를 오가요', 'a B-tree keeps data in inner nodes too → fewer children, and range scans bounce up and down'], 'dsx-xs', 4);
  notesSplit(S, 'k', 15.6, [['B+트리: 내부 노드는 길을 알려 주는 키만, 실제 데이터는 모두 리프에 있어요', 'a B+ tree keeps only signpost keys inside; all the data lives in the leaves'], ['한 값 찾기는 루트에서 키를 비교하며 리프까지 한 번에 내려가요', 'a point lookup walks down from the root, comparing keys, straight to a leaf'], ['리프끼리 연결돼 있어서, 범위 검색은 시작 리프를 찾은 뒤 옆으로만 걸어가요', 'leaves are linked, so a range scan finds the first leaf and simply walks sideways'], ['내부 노드가 가벼워 자식이 수백~수천 개 · 그래서 트리가 아주 낮아요', 'light inner nodes hold hundreds to thousands of children, so the tree stays very short']]);
  fin(S, 'z', 15.6, [['B+트리: 데이터는 리프에만, 리프는 연결 리스트 · DB 인덱스의 표준', 'the B+ tree: data only in linked leaves · the standard database index', 'dsx-xs dsx-a'], ['MySQL InnoDB는 기본키 B+트리의 리프에 행 전체를 담아요(클러스터드 인덱스)', 'MySQL InnoDB stores whole rows in the primary-key B+ tree’s leaves (a clustered index)'], ['파일 시스템(NTFS, ext4의 HTree, Btrfs)과 키-값 저장소도 같은 구조를 써요', 'file systems (NTFS, ext4’s HTree, Btrfs) and key-value stores use the same structure']]);
  S.cap(1, '키는 위, 데이터는 리프', 'Keys above, data in the leaves').cap(2, '한 값 찾기', 'A point lookup').cap(3, '범위 검색', 'A range scan').cap(4, '얕고 넓은 트리', 'Short and wide').cap(5, 'B+트리', 'The B+ tree');
  return S;
}

return { css: CSSX, secs: [], add: {
  'ds-lin': [
    item('ds-deque', '덱 (Deque)', 'Deques', '앞과 뒤 양쪽에서 O(1)로 넣고 뺄 수 있는 큐예요. 스택과 큐를 하나로 합친 셈이에요.', 'push_front, push_back, pop_front, pop_back이 모두 O(1)이고, 보통 front/back 인덱스를 모듈러로 돌리는 원형 버퍼로 구현해요. 슬라이딩 윈도 최댓값은 덱에 감소하는 후보만 남겨 O(n)에 풀고, 0-1 BFS, 작업 훔치기 스케줄러(주인은 뒤에서, 도둑은 앞에서), 길이 제한이 있는 실행 취소 기록에도 써요. Python collections.deque, Java ArrayDeque가 대표 구현이에요.', 'A queue with O(1) pushes and pops at both the front and the back: a stack and a queue in one.', 'push_front, push_back, pop_front and pop_back are all O(1), usually on a ring buffer whose front/back indices wrap around. Sliding-window maximum keeps only decreasing candidates in a deque for O(n), and deques also power 0-1 BFS, work-stealing schedulers (owners pop the back, thieves steal the front) and capped undo histories. Python’s collections.deque and Java’s ArrayDeque are typical implementations.', sDeque()),
    item('ds-monostack', '단조 스택', 'Monotonic stacks', '원소가 한 방향으로 정렬된 상태를 유지하는 스택이에요. “가장 가까운 더 큰(작은) 값” 문제를 O(n)에 풀어요.', '[2, 7, 3, 5, 4, 6, 8]에서 각 원소의 오른쪽 첫 큰 수를 찾을 때, 새 원소보다 작은 스택 원소를 모두 꺼내며 답을 확정하고 새 원소를 쌓아요. 7이 2를 꺼내 2의 답은 7, 6이 4와 5를 꺼내는 식이에요. 각 원소가 한 번 쌓이고 한 번 꺼내지므로 이중 루프 O(n²)가 O(n)이 돼요. 일일 온도, 주가 스팬, 히스토그램에서 가장 큰 직사각형 문제의 기본 도구예요.', 'A stack kept sorted in one direction, solving “nearest greater (or smaller) element” problems in O(n).', 'To find the next greater element in [2, 7, 3, 5, 4, 6, 8], pop every stack entry smaller than the new element, fixing its answer, then push the new one: 7 pops 2 (answer 7), 6 pops 4 and 5, and so on. Each element is pushed and popped once, so the O(n²) nested loop becomes O(n). It is the core tool for daily temperatures, stock span and the largest rectangle in a histogram.', sMonoStack()),
    item('ds-skiplist', '스킵 리스트', 'Skip lists', '정렬된 연결 리스트 위에 “급행 차선” 층을 확률적으로 쌓아, 균형 트리처럼 O(log n)에 찾는 자료구조예요.', '맨 아래는 모든 원소의 정렬된 연결 리스트이고, 각 노드는 동전을 던져 1/2 확률로 위층에도 올라가요. 17을 찾을 땐 맨 위층에서 12까지 가고, 다음이 17보다 크면 한 층씩 내려가며 범위를 좁혀요. 회전 없이 확률로 균형을 맞춰 구현이 간단하고 동시성 버전을 만들기 쉬워서, Redis 정렬 집합, LevelDB·RocksDB의 memtable, Java ConcurrentSkipListMap이 써요.', 'Layers of randomly promoted “express lanes” over a sorted linked list give balanced-tree O(log n) search.', 'The bottom level is a sorted linked list of every element, and each node flips coins to rise to higher levels with probability 1/2. Searching for 17 runs along the top level to 12, dropping a level whenever the next node is too large. Balance comes from randomness instead of rotations, so it is simple and easy to make concurrent; Redis sorted sets, LevelDB/RocksDB memtables and Java’s ConcurrentSkipListMap use it.', sSkip())
  ],
  'ds-hashing': [
    item('ds-cuckoo', '쿠쿠 해싱', 'Cuckoo hashing', '해시 함수 두 개로 키마다 들어갈 자리를 딱 두 곳 정하고, 자리가 차 있으면 기존 키를 쫓아내 다른 자리로 보내는 해싱이에요.', 'C를 넣을 자리에 A가 있으면 A를 쫓아내고, A는 자기의 다른 자리로 가며 거기 있던 B를 다시 밀어내는 식으로 연쇄 이동해요. 덕분에 조회는 최악에도 두 곳만 확인하면 돼서 O(1)이 보장돼요. 쫓아내기가 순환하면 해시 함수를 바꿔 전체를 다시 넣고, 두 테이블 기준 적재율은 약 50%예요. 지연이 일정해야 하는 네트워크 장비와 쿠쿠 필터에 쓰여요.', 'Two hash functions give each key exactly two possible homes; inserting into an occupied one evicts the resident to its other home.', 'If A occupies C’s slot, A is evicted to its alternate slot, which may bump B in turn, and the chain continues until everyone settles. Lookups therefore check at most two places: O(1) even in the worst case. If evictions cycle, everything is rehashed with new functions; with two tables the load factor tops out around 50%. It suits network hardware that needs predictable latency, and underlies cuckoo filters.', sCuckoo()),
    item('ds-cms', '카운트-민 스케치', 'Count-min sketch', '해시 함수 여러 개로 작은 카운터 행렬에 개수를 더하고, 행들의 최솟값으로 빈도를 추정하는 확률적 자료구조예요.', 'cat이 들어오면 행마다 해시된 칸 하나씩 +1, dog가 두 번 오면 +2를 해요. 충돌하면 값이 커지기만 하므로 cat의 추정은 min(1, 3, 1) = 1처럼 최솟값을 써요. 메모리는 d × w칸으로 고정이고, 오차는 대략 (e / w) × 전체 개수, 확률 1 − e^(−d)로 보장돼요. 스트림의 인기 검색어, 네트워크 트래픽 분석, 실시간 트렌드 Top-K에 쓰고, 고유 개수는 HyperLogLog, 존재 여부는 블룸 필터와 짝을 이뤄요.', 'A probabilistic structure that adds counts into a small hashed matrix and estimates frequency by the minimum across rows.', 'Each arrival of cat adds 1 to one hashed cell per row, and two dogs add 2. Collisions only inflate counts, so the estimate takes the minimum, e.g. min(1, 3, 1) = 1 for cat. Memory is fixed at d × w cells, and error is about (e / w) × total with probability 1 − e^(−d). It finds heavy hitters in streams, analyzes network traffic and drives real-time trending top-K, alongside HyperLogLog for distinct counts and Bloom filters for membership.', sCms())
  ],
  'ds-tree': [
    item('ds-rbtree', '레드-블랙 트리', 'Red-black trees', '노드에 빨강·검정 색을 칠하고 네 가지 규칙을 지켜 높이를 2 log n 이하로 유지하는 균형 이진 탐색 트리예요.', '규칙은 루트는 검정, 빨강이 연달아 올 수 없음, 모든 경로의 검정 노드 수가 같음이에요. 새 노드는 빨강으로 넣고, 빨강–빨강이 생기면 삼촌이 검정일 땐 회전 + 색 바꾸기, 빨강일 땐 색만 바꿔 위로 문제를 넘겨요. AVL보다 덜 엄격해 회전이 적어 쓰기가 많은 곳에 유리하고, Java TreeMap, C++ std::map, 리눅스 CFS 스케줄러가 써요.', 'A balanced binary search tree that colors nodes red or black and follows four rules to keep its height under 2 log n.', 'The rules: the root is black, no red node has a red child, and every root-to-leaf path has the same number of black nodes. New nodes go in red; a red–red clash is fixed by a rotation plus recoloring when the uncle is black, or by recoloring alone (pushing the problem upward) when the uncle is red. Looser than AVL, it rotates less and suits write-heavy use; Java’s TreeMap, C++ std::map and Linux’s CFS scheduler rely on it.', sRbt()),
    item('ds-segtree', '세그먼트 트리', 'Segment trees', '배열의 구간마다 합(또는 최소·최대)을 트리로 저장해, 구간 질의와 값 갱신을 모두 O(log n)에 처리해요.', '[5, 8, 6, 3, 2, 7, 2, 6]의 두 칸씩 합을 위로 쌓아 루트에 전체 합 39를 둬요. sum(a2..a6)은 [2–3], [4–5], a6 세 노드만으로 9 + 9 + 2 = 20이 되고, a4를 10으로 바꾸면 루트까지 4개 노드만 갱신해요. 배열 2n칸으로 구현하며, 지연 전파(lazy propagation)를 쓰면 구간 갱신도 O(log n)이에요. 누적 합 배열은 갱신이 O(n)이라 갱신이 잦을 때 이 구조를 써요.', 'A tree storing the sum (or min/max) of each range of an array, so range queries and updates both take O(log n).', 'Pairs of [5, 8, 6, 3, 2, 7, 2, 6] are summed upward until the root holds the total, 39. sum(a2..a6) uses just three nodes, [2–3], [4–5] and a6, for 9 + 9 + 2 = 20, and setting a4 to 10 updates only four nodes up to the root. It fits in a 2n array, and lazy propagation brings range updates to O(log n) too. Prefix-sum arrays need O(n) per update, so this is the choice when values change often.', sSegTree()),
    item('ds-fenwick', '펜윅 트리 (BIT)', 'Fenwick trees (BIT)', '배열 하나와 비트 연산 i & −i만으로 누적 합 질의와 값 갱신을 O(log n)에 하는 자료구조예요.', 't[i]는 i의 가장 낮은 1비트 길이만큼의 구간 (i − i&−i, i]의 합을 저장해요. prefix(7)은 i에서 최하위 비트를 지우며 t[7] + t[6] + t[4] = 33, a3 갱신은 비트를 더하며 t[3], t[4], t[8]만 고쳐요. 구간 합은 prefix(r) − prefix(l − 1)이에요. 세그먼트 트리보다 코드가 짧고 빠르지만 최솟값 같은 일반 구간 연산엔 덜 유연하며, 순위 통계와 역순 쌍 세기에 자주 써요.', 'Prefix-sum queries and updates in O(log n) using a single array and the bit trick i & −i.', 't[i] stores the sum of the range (i − i&−i, i], whose length is i’s lowest set bit. prefix(7) clears low bits as it goes: t[7] + t[6] + t[4] = 33, and updating a3 adds low bits to touch only t[3], t[4] and t[8]. A range sum is prefix(r) − prefix(l − 1). Shorter and faster than a segment tree but less flexible for operations like range minimum, it is a staple of rank statistics and inversion counting.', sFenwick())
  ],
  'ds-graphs': [
    item('ds-quadtree', '쿼드트리와 공간 인덱스', 'Quadtrees and spatial indexes', '2차원 공간을 4등분하며 점을 담아, 볼 필요 없는 영역을 통째로 건너뛰게 해 주는 트리예요.', '점이 2개 이상인 칸만 다시 4등분하는 식으로 재귀적으로 나누면, 범위 질의나 가장 가까운 점 찾기에서 질의와 겹치는 칸만 내려가고 나머지는 통째로 건너뛰어요. k-d 트리는 x와 y를 번갈아 2등분하고, R-트리는 겹치는 사각형으로 묶어 PostGIS 같은 공간 DB 인덱스로 쓰여요. 게임 충돌 감지, 지도 타일, 근처 가게 검색, 이미지 압축에 쓰여요.', 'A tree that recursively splits 2D space into quadrants so whole regions can be skipped during searches.', 'Any cell with two or more points is split into four again; a range or nearest-neighbor query then descends only into cells overlapping the query and skips the rest wholesale. k-d trees alternate x and y halvings, and R-trees group overlapping rectangles, serving as spatial indexes in databases such as PostGIS. They power game collision detection, map tiles, “near me” search and image compression.', sQuad()),
    item('ds-persist', '영속 자료구조', 'Persistent data structures', '값을 바꿀 때 원본을 고치지 않고 새 버전을 만들되, 바뀌지 않은 부분은 공유해 효율적인 불변 자료구조예요.', '불변 리스트 v1 = [1, 2, 3] 앞에 0을 붙인 v2는 새 노드 하나만 만들고 나머지를 공유해요. 트리에서 G를 바꾸면 루트까지 경로(A′, C′, G′)만 복사하고 나머지 서브트리는 그대로 가리켜 O(log n)에 새 버전이 생겨요. 옛 버전도 그대로 읽을 수 있어 실행 취소·시간 여행과 동시성에 안전하고, Redux/Immer, Clojure·Scala의 32갈래 벡터, Git 커밋이 같은 원리예요.', 'Immutable structures that create a new version on every change while sharing all unchanged parts with the old one.', 'Prepending 0 to the immutable list v1 = [1, 2, 3] builds a single node and shares the rest as v2. Changing G in a tree copies only its path to the root (A′, C′, G′) and points at every untouched subtree, producing a new version in O(log n). Old versions remain readable, which enables undo, time travel and safe concurrency; Redux/Immer, Clojure and Scala’s 32-way vectors and Git commits all work this way.', sPersist())
  ]
},
after: {
  'ds-btree': [item('ds-bplus', 'B+트리', 'B+ trees', '내부 노드에는 길을 알려 주는 키만 두고, 실제 데이터는 모두 서로 연결된 리프에 두는 B-트리 변형이에요. 데이터베이스 인덱스의 표준 구조예요.', 'B+트리의 내부 노드는 “이 키보다 작으면 왼쪽” 같은 길잡이 키와 자식 포인터만 가지고, 모든 키와 실제 데이터(또는 행 위치)는 리프에 있어요. 리프들은 순서대로 연결 리스트처럼 이어져 있어요. 한 값을 찾을 때는 루트에서 키를 비교하며 리프까지 내려가고, 범위 검색은 시작 리프를 찾은 뒤 옆 리프로 계속 걸어가기만 하면 돼서 B-트리처럼 위아래를 오갈 필요가 없어요. 내부 노드가 데이터 없이 가벼우니 한 페이지에 자식을 아주 많이 담아요: 16KB 페이지에 키와 포인터가 약 14바이트면 자식이 1000개 남짓이라, 3단계만으로 약 10억 개의 행을 디스크 읽기 3번에 찾을 수 있어요. 삽입으로 노드가 넘치면 반으로 나누고 가운데 키를 부모로 올려서 항상 균형을 유지해요. MySQL InnoDB는 기본키 B+트리의 리프에 행 전체를 저장하고(클러스터드 인덱스), PostgreSQL의 btree 인덱스와 NTFS·Btrfs 같은 파일 시스템도 같은 구조를 써요.', 'A B-tree variant that keeps only signpost keys in its inner nodes and stores all data in linked leaves; the standard structure for database indexes.', 'In a B+ tree the inner nodes hold only signpost keys (“smaller than this, go left”) and child pointers, while every key and its data (or row location) lives in the leaves, which are chained in order like a linked list. A point lookup descends from the root to a leaf comparing keys, and a range scan finds the first leaf and simply walks sideways along the links, never bouncing up and down as in a B-tree. Because inner nodes carry no data, a page holds a great many children: with a 16 KB page and about 14 bytes per key and pointer, roughly a thousand, so three levels index about a billion rows with three disk reads. When an insert overfills a node, it splits in half and pushes the middle key up, keeping the tree balanced. MySQL InnoDB stores whole rows in the primary-key B+ tree’s leaves (a clustered index), and PostgreSQL’s btree indexes and file systems such as NTFS and Btrfs use the same structure.', sBplus())]
} };
})();

window.UX = page([
  sec('ds-lin', '선형 구조', 'Linear', '줄지어 담는 자료구조', 'Structures that line data up',
    '데이터를 한 줄로 늘어놓는 구조예요. 어디서 넣고 빼느냐가 성능을 결정해요.', 'Structures that lay data out in a line. Where you add and remove decides the performance.', [
    item('ds-array', '배열', 'Array', '같은 크기의 칸을 메모리에 붙여 놓은 구조예요. 번호만 알면 바로 꺼낼 수 있지만, 중간에 넣거나 빼면 뒤를 전부 밀어야 해요.', '읽기가 대부분이고 크기가 거의 안 바뀌는 데이터에 써요. 캐시 친화적이라 실제 성능은 이론보다 더 좋은 경우가 많아요.', 'Equal-size slots placed side by side in memory. Any index is reachable instantly, but inserting or deleting in the middle shifts everything after it.', 'Use it for read-heavy data whose size rarely changes. It is cache-friendly, so real performance is often better than the theory suggests.', sArray()),
    item('ds-dynarr', '동적 배열', 'Dynamic array · Amortized O(1)', '공간이 차면 두 배 크기의 새 배열을 만들고 옮겨 담아요. 가끔 느린 복사가 있어도 평균으로 보면 추가는 O(1)이에요.', '파이썬 list, 자바 ArrayList, 자바스크립트 Array가 이 구조예요. 넣을 개수를 미리 안다면 처음부터 크기를 잡아 복사를 줄이세요.', 'When full, it allocates an array twice as large and copies everything over. Despite the occasional slow copy, appends are O(1) on average.', 'Python lists, Java ArrayList and JavaScript arrays work this way. If you know the final size, reserve capacity up front to avoid copies.', sDyn()),
    item('ds-linked', '연결 리스트', 'Linked list', '각 노드가 값과 다음 노드의 주소를 들고 있어요. 위치만 알면 화살표만 바꿔 O(1)에 넣고 빼지만, 찾으려면 처음부터 따라가야 해요.', '앞뒤로 자주 넣고 빼는 큐, LRU 캐시, 운영체제의 작업 목록에 쓰여요. 노드가 흩어져 있어 순회는 배열보다 느려요.', 'Each node holds a value and the address of the next node. Insertion and deletion are O(1) once you are there, but finding a position means walking from the head.', 'Used for queues, LRU caches and OS task lists with frequent insertions and removals. Nodes are scattered in memory, so traversal is slower than an array.', sLinked(), CSS),
    item('ds-stack', '스택', 'Stack · LIFO', '마지막에 넣은 것이 가장 먼저 나오는 구조예요. 넣기(push)와 빼기(pop)가 모두 맨 위에서만 일어나요.', '함수 호출(콜 스택), 실행 취소, 괄호 짝 맞추기, 브라우저 뒤로 가기, DFS가 모두 스택이에요.', 'The last item in is the first out. Push and pop both happen at the top.', 'Function calls (the call stack), undo, bracket matching, the browser back button and DFS are all stacks.', sStack()),
    item('ds-queue', '큐', 'Queue · FIFO', '먼저 들어온 것이 먼저 나가는 줄 서기 구조예요. 뒤로 넣고(enqueue) 앞에서 빼요(dequeue).', '작업 대기열, 메시지 큐, 프린터 출력, BFS에 써요. 배열로 만들면 앞에서 뺄 때 밀기가 생기니 원형 버퍼나 덱을 쓰세요.', 'First in, first out, like a line of people. Enqueue at the back, dequeue at the front.', 'Used for job queues, message queues, print spooling and BFS. A plain array shifts on dequeue, so use a ring buffer or deque instead.', sQueue()),
    item('ds-ring', '원형 버퍼', 'Ring buffer', '고정된 칸을 원처럼 이어서, 쓰는 위치와 읽는 위치가 계속 돌아가게 해요. 메모리를 새로 잡지 않고 끝없이 재사용해요.', '오디오·네트워크 스트림 버퍼, 최근 N개 로그, 생산자-소비자 큐처럼 크기가 정해진 흐름에 딱 맞아요.', 'Fixed slots joined into a circle so the read and write positions keep wrapping around, reusing memory forever without new allocations.', 'Perfect for fixed-size streams: audio and network buffers, the last N log lines and producer-consumer queues.', sRing()),
    item('ds-cheat', '자료구조 고르는 법', 'Choosing a structure', '같은 데이터라도 무엇을 자주 하느냐에 따라 맞는 구조가 달라요. 접근, 찾기, 넣기·빼기 비용을 비교해 고르세요.', '면접 단골 질문이자 실무 성능 문제의 대부분이에요. 가장 자주 하는 연산이 O(1)이나 O(log n)이 되는 구조를 고르세요.', 'The right structure depends on which operations you do most. Compare the cost of access, search and insert or delete.', 'A classic interview topic and the root of most real performance issues. Pick the structure that makes your most frequent operation O(1) or O(log n).', sCheat())
  ].concat(XT.add['ds-lin'] || [])),
  sec('ds-hashing', '해시', 'Hashing', '키로 바로 찾는 해시', 'Finding by key with hashing',
    '키를 숫자로 바꿔 칸 번호로 쓰는 방법이에요. 충돌을 어떻게 처리하느냐가 핵심이에요.', 'Turning keys into numbers used as slot indexes. Handling collisions is the core problem.', [
    item('ds-hash', '해시 테이블', 'Hash table', '해시 함수가 키를 칸 번호로 바꿔 줘서, 찾기·넣기·빼기가 평균 O(1)이에요.', '딕셔너리, 맵, 집합, 캐시, 중복 제거 등 실무에서 가장 많이 쓰는 자료구조예요. 순서가 필요하면 정렬된 구조를 따로 쓰세요.', 'A hash function turns a key into a slot index, so lookup, insert and delete are O(1) on average.', 'Dictionaries, maps, sets, caches and deduplication: the most used structure in practice. If you need order, use a sorted structure alongside.', sHash()),
    item('ds-chain', '충돌과 체이닝', 'Collision · Chaining', '서로 다른 키가 같은 칸에 들어가는 걸 충돌이라고 해요. 체이닝은 그 칸에 리스트로 이어 붙여 해결해요.', '자바 HashMap은 한 칸에 너무 많이 쌓이면 리스트를 트리로 바꿔요. 칸 대비 원소 비율(적재율)이 높아지면 칸을 늘려 다시 배치해요.', 'A collision is when different keys map to the same slot. Chaining solves it by linking entries into a list in that slot.', 'Java’s HashMap even turns a long chain into a tree. When the load factor gets high, the table grows and rehashes.', sChain()),
    item('ds-probe', '개방 주소법', 'Open addressing · Linear probing', '충돌이 나면 정해진 규칙(다음 칸, 제곱 간격 등)으로 빈칸을 찾아 넣어요. 모든 데이터가 배열 안에 있어 캐시에 유리해요.', '파이썬 dict, 고성능 해시맵이 이 방식이에요. 삭제할 때는 빈칸 대신 "삭제됨" 표시를 남겨야 탐색이 끊기지 않아요.', 'On a collision, it searches for an empty slot by a fixed rule such as the next slot. Everything stays inside the array, which is cache-friendly.', 'Python dicts and high-performance hash maps use it. Deletions leave a tombstone instead of an empty slot so lookups don’t stop early.', sProbe()),
    item('ds-bloom', '블룸 필터', 'Bloom filter', '비트 배열과 해시 여러 개로 "확실히 없다" 또는 "있을 수도 있다"를 아주 적은 메모리로 답해요.', 'DB가 디스크를 읽기 전에 없는 키를 걸러내거나, 이미 본 URL·스팸을 빠르게 거를 때 써요. 거짓 양성은 있어도 거짓 음성은 없어요.', 'A bit array plus several hashes answers “definitely not” or “maybe” using very little memory.', 'Databases use it to skip disk reads for missing keys, and crawlers to skip seen URLs. It can give false positives but never false negatives.', sBloom())
  ].concat(XT.add['ds-hashing'] || [])),
  sec('ds-tree', '트리', 'Trees', '나뭇가지처럼 뻗는 트리', 'Trees that branch out',
    '부모와 자식으로 이어진 계층 구조예요. 높이를 낮게 유지하는 게 성능의 핵심이에요.', 'Hierarchies of parents and children. Keeping the height low is the key to performance.', [
    item('ds-bst', '이진 탐색 트리', 'Binary search tree', '왼쪽 자식은 작게, 오른쪽 자식은 크게 둬서 비교할 때마다 절반을 버리며 찾아요.', '정렬된 데이터를 자주 넣고 빼면서 찾아야 할 때 써요. 정렬된 순서로 넣으면 한쪽으로 치우쳐 O(n)이 되니 균형 트리를 쓰세요.', 'Smaller keys go left and larger keys go right, so each comparison discards half the tree.', 'Use it when you insert, delete and search sorted data often. Inserting already sorted data skews it to O(n), so use a balanced tree.', sBST()),
    item('ds-trav', '트리 순회', 'Tree traversal', '트리의 모든 노드를 정해진 순서로 방문해요. 전위(자신 먼저), 중위(가운데), 후위(자식 먼저), 레벨 순서(층별)가 있어요.', '중위는 정렬 출력, 전위는 트리 복사·직렬화, 후위는 폴더 크기 계산이나 삭제, 레벨 순서는 최단 거리에 써요.', 'Visiting every node in a set order: pre-order (self first), in-order (middle), post-order (children first) and level order.', 'In-order prints sorted data, pre-order copies or serializes a tree, post-order computes folder sizes or deletes, and level order finds shortest paths.', sTrav()),
    item('ds-avl', '균형 트리와 회전', 'Balanced trees · Rotation', '한쪽으로 기운 트리를 회전으로 다시 세워 높이를 log n으로 유지해요. AVL 트리와 레드블랙 트리가 대표적이에요.', '자바 TreeMap, C++ map, 리눅스 스케줄러가 레드블랙 트리를 써요. 직접 구현할 일은 드물지만 정렬된 맵이 왜 O(log n)인지 알려줘요.', 'Rotations straighten a lopsided tree so its height stays log n. AVL and red-black trees are the best-known.', 'Java’s TreeMap, C++ std::map and the Linux scheduler use red-black trees. You rarely implement one, but it explains why sorted maps are O(log n).', sAVL()),
    item('ds-heap', '힙 · 우선순위 큐', 'Heap · Priority queue', '부모가 항상 자식보다 작은(또는 큰) 완전 이진 트리예요. 맨 위에서 최솟값을 바로 꺼낼 수 있고, 배열 하나로 표현돼요.', '작업 스케줄러, 다익스트라, 상위 K개 고르기, 타이머 관리에 써요. 전체 정렬이 아니라 "가장 급한 것"만 필요할 때 좋아요.', 'A complete binary tree where every parent is smaller (or larger) than its children. The minimum sits at the top, and the whole tree fits in one array.', 'Used for schedulers, Dijkstra, top-K selection and timers, whenever you need the most urgent item rather than full order.', sHeap()),
    item('ds-trie', '트라이', 'Trie · Prefix tree', '문자 하나가 한 단계가 되는 트리예요. 같은 접두사를 공유해서 접두사로 찾기가 아주 빨라요.', '검색어 자동 완성, 사전, IP 라우팅 테이블, 맞춤법 검사에 써요. 메모리를 많이 쓰니 압축 트라이(래딕스 트리)도 고려하세요.', 'A tree where each level is one character. Shared prefixes share nodes, so prefix lookups are very fast.', 'Used for autocomplete, dictionaries, IP routing tables and spell checking. It is memory-hungry, so consider a compressed radix tree.', sTrie()),
    item('ds-btree', 'B-트리 · B+트리', 'B-tree · B+ tree', '한 노드에 키를 여러 개 담아 자식이 많고 높이가 아주 낮은 트리예요. B+트리는 데이터를 리프에만 두고 리프끼리 연결해요.', 'MySQL·PostgreSQL 인덱스, 파일 시스템의 기본 구조예요. 디스크를 몇 번만 읽고도 수억 건에서 찾을 수 있고, 범위 검색도 빨라요.', 'A tree whose nodes hold many keys, so it has many children and very little height. A B+ tree keeps data only in leaves and links the leaves together.', 'The core of MySQL and PostgreSQL indexes and file systems. A few disk reads find one row among hundreds of millions, and range scans are fast.', sBplus())
  ].concat(XT.add['ds-tree'] || [])),
  sec('ds-graphs', '그래프·실무', 'Graphs & practical', '관계를 담는 구조와 실무 자료구조', 'Relationships and practical structures',
    '서로 연결된 관계를 표현하는 법과, 실무에서 자주 만나는 조합형 자료구조예요.', 'How to represent connections, and composite structures you meet in real systems.', [
    item('ds-graph', '그래프 표현', 'Graph representation', '정점과 간선을 저장하는 두 방법이에요. 인접 행렬은 연결 여부를 O(1)로 확인하고, 인접 리스트는 공간을 적게 써요.', 'SNS 친구 관계, 지도, 의존성처럼 대부분의 실제 그래프는 간선이 적어서 인접 리스트가 기본이에요.', 'Two ways to store vertices and edges. An adjacency matrix checks a connection in O(1); an adjacency list uses far less space.', 'Most real graphs, such as social networks, maps and dependencies, are sparse, so adjacency lists are the default.', sGraph()),
    item('ds-uf', '유니온 파인드', 'Union-find · Disjoint set', '원소들이 어느 그룹에 속하는지 대표 원소로 관리해요. 경로 압축과 랭크 합치기를 쓰면 거의 O(1)이에요.', '크루스칼 최소 신장 트리, 네트워크 연결 여부, 이미지의 영역 묶기, 친구 그룹 합치기에 써요.', 'Tracks which group each element belongs to via a representative. With path compression and union by rank it is almost O(1).', 'Used in Kruskal’s MST, network connectivity, image region labelling and merging friend groups.', sUF()),
    item('ds-lru', 'LRU 캐시', 'LRU cache', '가장 오래 쓰지 않은 항목부터 내보내는 캐시예요. 해시맵으로 바로 찾고, 이중 연결 리스트로 사용 순서를 관리해요.', '면접 단골 구현 문제이자 브라우저 캐시, DB 버퍼, CDN의 기본 정책이에요. 자바 LinkedHashMap으로 쉽게 만들 수 있어요.', 'A cache that evicts the least recently used item first. A hash map finds entries instantly; a doubly linked list keeps the usage order.', 'A classic interview problem and the basic policy behind browser caches, database buffers and CDNs. Java’s LinkedHashMap builds one easily.', sLRU())
  ].concat(XT.add['ds-graphs'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
})();
