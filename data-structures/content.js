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
  ]),
  sec('ds-hashing', '해시', 'Hashing', '키로 바로 찾는 해시', 'Finding by key with hashing',
    '키를 숫자로 바꿔 칸 번호로 쓰는 방법이에요. 충돌을 어떻게 처리하느냐가 핵심이에요.', 'Turning keys into numbers used as slot indexes. Handling collisions is the core problem.', [
    item('ds-hash', '해시 테이블', 'Hash table', '해시 함수가 키를 칸 번호로 바꿔 줘서, 찾기·넣기·빼기가 평균 O(1)이에요.', '딕셔너리, 맵, 집합, 캐시, 중복 제거 등 실무에서 가장 많이 쓰는 자료구조예요. 순서가 필요하면 정렬된 구조를 따로 쓰세요.', 'A hash function turns a key into a slot index, so lookup, insert and delete are O(1) on average.', 'Dictionaries, maps, sets, caches and deduplication: the most used structure in practice. If you need order, use a sorted structure alongside.', sHash()),
    item('ds-chain', '충돌과 체이닝', 'Collision · Chaining', '서로 다른 키가 같은 칸에 들어가는 걸 충돌이라고 해요. 체이닝은 그 칸에 리스트로 이어 붙여 해결해요.', '자바 HashMap은 한 칸에 너무 많이 쌓이면 리스트를 트리로 바꿔요. 칸 대비 원소 비율(적재율)이 높아지면 칸을 늘려 다시 배치해요.', 'A collision is when different keys map to the same slot. Chaining solves it by linking entries into a list in that slot.', 'Java’s HashMap even turns a long chain into a tree. When the load factor gets high, the table grows and rehashes.', sChain()),
    item('ds-probe', '개방 주소법', 'Open addressing · Linear probing', '충돌이 나면 정해진 규칙(다음 칸, 제곱 간격 등)으로 빈칸을 찾아 넣어요. 모든 데이터가 배열 안에 있어 캐시에 유리해요.', '파이썬 dict, 고성능 해시맵이 이 방식이에요. 삭제할 때는 빈칸 대신 "삭제됨" 표시를 남겨야 탐색이 끊기지 않아요.', 'On a collision, it searches for an empty slot by a fixed rule such as the next slot. Everything stays inside the array, which is cache-friendly.', 'Python dicts and high-performance hash maps use it. Deletions leave a tombstone instead of an empty slot so lookups don’t stop early.', sProbe()),
    item('ds-bloom', '블룸 필터', 'Bloom filter', '비트 배열과 해시 여러 개로 "확실히 없다" 또는 "있을 수도 있다"를 아주 적은 메모리로 답해요.', 'DB가 디스크를 읽기 전에 없는 키를 걸러내거나, 이미 본 URL·스팸을 빠르게 거를 때 써요. 거짓 양성은 있어도 거짓 음성은 없어요.', 'A bit array plus several hashes answers “definitely not” or “maybe” using very little memory.', 'Databases use it to skip disk reads for missing keys, and crawlers to skip seen URLs. It can give false positives but never false negatives.', sBloom())
  ]),
  sec('ds-tree', '트리', 'Trees', '나뭇가지처럼 뻗는 트리', 'Trees that branch out',
    '부모와 자식으로 이어진 계층 구조예요. 높이를 낮게 유지하는 게 성능의 핵심이에요.', 'Hierarchies of parents and children. Keeping the height low is the key to performance.', [
    item('ds-bst', '이진 탐색 트리', 'Binary search tree', '왼쪽 자식은 작게, 오른쪽 자식은 크게 둬서 비교할 때마다 절반을 버리며 찾아요.', '정렬된 데이터를 자주 넣고 빼면서 찾아야 할 때 써요. 정렬된 순서로 넣으면 한쪽으로 치우쳐 O(n)이 되니 균형 트리를 쓰세요.', 'Smaller keys go left and larger keys go right, so each comparison discards half the tree.', 'Use it when you insert, delete and search sorted data often. Inserting already sorted data skews it to O(n), so use a balanced tree.', sBST()),
    item('ds-trav', '트리 순회', 'Tree traversal', '트리의 모든 노드를 정해진 순서로 방문해요. 전위(자신 먼저), 중위(가운데), 후위(자식 먼저), 레벨 순서(층별)가 있어요.', '중위는 정렬 출력, 전위는 트리 복사·직렬화, 후위는 폴더 크기 계산이나 삭제, 레벨 순서는 최단 거리에 써요.', 'Visiting every node in a set order: pre-order (self first), in-order (middle), post-order (children first) and level order.', 'In-order prints sorted data, pre-order copies or serializes a tree, post-order computes folder sizes or deletes, and level order finds shortest paths.', sTrav()),
    item('ds-avl', '균형 트리와 회전', 'Balanced trees · Rotation', '한쪽으로 기운 트리를 회전으로 다시 세워 높이를 log n으로 유지해요. AVL 트리와 레드블랙 트리가 대표적이에요.', '자바 TreeMap, C++ map, 리눅스 스케줄러가 레드블랙 트리를 써요. 직접 구현할 일은 드물지만 정렬된 맵이 왜 O(log n)인지 알려줘요.', 'Rotations straighten a lopsided tree so its height stays log n. AVL and red-black trees are the best-known.', 'Java’s TreeMap, C++ std::map and the Linux scheduler use red-black trees. You rarely implement one, but it explains why sorted maps are O(log n).', sAVL()),
    item('ds-heap', '힙 · 우선순위 큐', 'Heap · Priority queue', '부모가 항상 자식보다 작은(또는 큰) 완전 이진 트리예요. 맨 위에서 최솟값을 바로 꺼낼 수 있고, 배열 하나로 표현돼요.', '작업 스케줄러, 다익스트라, 상위 K개 고르기, 타이머 관리에 써요. 전체 정렬이 아니라 "가장 급한 것"만 필요할 때 좋아요.', 'A complete binary tree where every parent is smaller (or larger) than its children. The minimum sits at the top, and the whole tree fits in one array.', 'Used for schedulers, Dijkstra, top-K selection and timers, whenever you need the most urgent item rather than full order.', sHeap()),
    item('ds-trie', '트라이', 'Trie · Prefix tree', '문자 하나가 한 단계가 되는 트리예요. 같은 접두사를 공유해서 접두사로 찾기가 아주 빨라요.', '검색어 자동 완성, 사전, IP 라우팅 테이블, 맞춤법 검사에 써요. 메모리를 많이 쓰니 압축 트라이(래딕스 트리)도 고려하세요.', 'A tree where each level is one character. Shared prefixes share nodes, so prefix lookups are very fast.', 'Used for autocomplete, dictionaries, IP routing tables and spell checking. It is memory-hungry, so consider a compressed radix tree.', sTrie()),
    item('ds-btree', 'B-트리 · B+트리', 'B-tree · B+ tree', '한 노드에 키를 여러 개 담아 자식이 많고 높이가 아주 낮은 트리예요. B+트리는 데이터를 리프에만 두고 리프끼리 연결해요.', 'MySQL·PostgreSQL 인덱스, 파일 시스템의 기본 구조예요. 디스크를 몇 번만 읽고도 수억 건에서 찾을 수 있고, 범위 검색도 빨라요.', 'A tree whose nodes hold many keys, so it has many children and very little height. A B+ tree keeps data only in leaves and links the leaves together.', 'The core of MySQL and PostgreSQL indexes and file systems. A few disk reads find one row among hundreds of millions, and range scans are fast.', sBplus())
  ]),
  sec('ds-graphs', '그래프·실무', 'Graphs & practical', '관계를 담는 구조와 실무 자료구조', 'Relationships and practical structures',
    '서로 연결된 관계를 표현하는 법과, 실무에서 자주 만나는 조합형 자료구조예요.', 'How to represent connections, and composite structures you meet in real systems.', [
    item('ds-graph', '그래프 표현', 'Graph representation', '정점과 간선을 저장하는 두 방법이에요. 인접 행렬은 연결 여부를 O(1)로 확인하고, 인접 리스트는 공간을 적게 써요.', 'SNS 친구 관계, 지도, 의존성처럼 대부분의 실제 그래프는 간선이 적어서 인접 리스트가 기본이에요.', 'Two ways to store vertices and edges. An adjacency matrix checks a connection in O(1); an adjacency list uses far less space.', 'Most real graphs, such as social networks, maps and dependencies, are sparse, so adjacency lists are the default.', sGraph()),
    item('ds-uf', '유니온 파인드', 'Union-find · Disjoint set', '원소들이 어느 그룹에 속하는지 대표 원소로 관리해요. 경로 압축과 랭크 합치기를 쓰면 거의 O(1)이에요.', '크루스칼 최소 신장 트리, 네트워크 연결 여부, 이미지의 영역 묶기, 친구 그룹 합치기에 써요.', 'Tracks which group each element belongs to via a representative. With path compression and union by rank it is almost O(1).', 'Used in Kruskal’s MST, network connectivity, image region labelling and merging friend groups.', sUF()),
    item('ds-lru', 'LRU 캐시', 'LRU cache', '가장 오래 쓰지 않은 항목부터 내보내는 캐시예요. 해시맵으로 바로 찾고, 이중 연결 리스트로 사용 순서를 관리해요.', '면접 단골 구현 문제이자 브라우저 캐시, DB 버퍼, CDN의 기본 정책이에요. 자바 LinkedHashMap으로 쉽게 만들 수 있어요.', 'A cache that evicts the least recently used item first. A hash map finds entries instantly; a doubly linked list keeps the usage order.', 'A classic interview problem and the basic policy behind browser caches, database buffers and CDNs. Java’s LinkedHashMap builds one easily.', sLRU())
  ])
]);
})();
