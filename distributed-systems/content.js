(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, seq, item, sec, page, C } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const off = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c di-m' + (o.cls ? ' ' + o.cls : ''), s: st });
function fly(S, k, a, b, st, lab, sty, o = {}) { const r = o.r || .7; dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) }); S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r); if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' }); return S; }
const dash = c => `repeating-linear-gradient(90deg,var(--${c}) 0 .5em,transparent .5em .9em)`;
const bar = (S, k, x, y, w, fill, step, color) => { S.el(k + 't', { x, y, w, h: 1.1, css: 'border-radius:.55em;background:var(--line)' }); S.el(k + 'f', { x, y, w, h: 1.1, css: 'border-radius:.55em', s: { width: '0em', background: `var(--${color})` } }); S.set(k + 'f', step, { width: fill + 'em' }); };

/* ---------- scaling ---------- */
function sScale() {
  const S = scene({ id: 'di-scale', steps: 5, per: 1.3 });
  text(S, 'h1', 1, .9, ['수직 확장 (Scale up)', 'Scale up (vertical)'], { cls: 'cz-t di-b' });
  text(S, 'h2', 17, .9, ['수평 확장 (Scale out)', 'Scale out (horizontal)'], { cls: 'cz-t di-b' });
  box(S, 'big', 3, 5, 9, 11, ['서버', 'Server'], { css: 'transform-origin:50% 100%', s: { transform: 'scale(.45)' } });
  S.set('big', 1, { transform: 'scale(.72)' }).set('big', 3, { transform: 'none' });
  S.label('bl', { cls: 'cz-t cz-tc di-l', x: 1, y: 16.6, w: 13 }, [[0, '4 vCPU · 16 GB'], [1, '16 vCPU · 64 GB'], [3, '64 vCPU · 256 GB']]);
  edge(S, 'ceil', 1, 4.4, 14, 4.4, { h: .16, s: hid({ background: dash('danger') }) });
  text(S, 'ct', 1, 2.6, ['한계: 더 큰 서버는 없거나 너무 비싸요', 'Ceiling: no bigger box, or too costly'], { cls: 'cz-t di-r', s: hid() }); show(S, ['ceil', 'ct'], 4);
  pill(S, 'lb', 21, 3, 'LB', { w: 6, h: 2.2, s: C.soft });
  for (let j = 0; j < 4; j++) {
    const x = 17.4 + j * 3.6;
    arrow(S, 'l' + j, 24, 5.3, x + 1.6, 9.2, { s: j ? hid() : {} });
    box(S, 's' + j, x, 9.4, 3.2, 4, 'S' + (j + 1), { s: j ? hid() : {} });
    if (j) show(S, ['l' + j, 's' + j], j === 1 ? 2 : 3);
  }
  S.set('s1', 4, C.badf).set('l1', 4, { opacity: '.25' });
  text(S, 'rt', 17, 14.4, ['S2가 죽어도 나머지가 처리해요', 'S2 dies, the rest carry on'], { cls: 'cz-t di-w', s: hid() }); S.set('rt', 4, { opacity: '1' });
  S.cap(1, '수직: 더 큰 서버로 바꿔요 · 코드는 그대로', 'Up: move to a bigger machine · same code')
    .cap(2, '수평: 같은 서버를 여러 대 붙여요', 'Out: add more identical machines')
    .cap(3, '수평은 거의 끝없이 늘릴 수 있어요', 'Scaling out has almost no ceiling')
    .cap(4, '수직은 한계·단일 장애점 · 수평은 한 대가 죽어도 버텨요', 'Up hits a ceiling and a single point of failure; out survives a dead node')
    .cap(5, '대신 서버가 상태를 갖지 않아야 해요 (무상태)', 'But servers must be stateless for this to work');
  return S;
}
function sLB() {
  const S = scene({ id: 'di-lb', steps: 6, per: 1.25 });
  arrow(S, 'in', 1.4, 11, 8.6, 11, {}); text(S, 'it', 1.4, 9.4, ['요청', 'requests'], { cls: 'cz-t' });
  box(S, 'lb', 8.8, 8.6, 5, 4.8, ['로드<br>밸런서', 'Load<br>balancer'], { s: C.soft });
  S.label('alg', { cls: 'cz-pill', x: 6.4, y: 3.4, w: 10, h: 2.2, s: C.cmp }, [[0, ['라운드 로빈', 'Round robin']], [4, ['최소 연결', 'Least connections']], [5, ['해시 (사용자 키)', 'Hash (user key)']], [6, ['헬스 체크', 'Health checks']]]);
  const SY = [2.4, 8.8, 15.2], lab = n => [`연결 ${n}`, `${n} open`];
  const CN = [[[0, 0], [1, 1], [4, 5], [6, 6]], [[0, 0], [2, 1], [4, 3], [5, 4]], [[0, 0], [3, 1], [4, 2]]];
  SY.forEach((y, i) => {
    box(S, 's' + i, 21, y, 10, 4.4, '', {});
    text(S, 'sn' + i, 21.6, y + .5, 'S' + (i + 1), { cls: 'cz-t cz-mono di-b' });
    S.label('c' + i, { cls: 'cz-t di-l', x: 23, y: y + 2.3, w: 7.6 }, CN[i].map(([st, n]) => [st, lab(n)]).concat(i === 2 ? [[6, ['다운 ✗', 'down ✗']]] : []));
  });
  S.set('s2', 6, C.bad);
  const to = i => [21, SY[i] + 2.2], from = [11.3, 11];
  [[1, 0], [2, 1], [3, 2], [4, 2], [5, 1], [6, 0]].forEach(([st, i], n) => fly(S, 'q' + n, from, to(i), st, st === 5 ? 'A' : '', st === 5 ? C.cmp : C.cur));
  text(S, 'hx', 4.6, 14.8, 'hash("A") % 3 → S2', { cls: 'cz-t cz-mono', s: hid() }); S.set('hx', 5, { opacity: '1' }).set('hx', 6, { opacity: '0' });
  S.cap(1, '라운드 로빈: 차례대로 돌아가며', 'Round robin: take turns')
    .cap(4, '최소 연결: 지금 가장 한가한 서버로', 'Least connections: the least busy server')
    .cap(5, '해시: 같은 사용자는 늘 같은 서버로', 'Hash: the same user always lands on the same server')
    .cap(6, '헬스 체크에 실패한 서버는 자동으로 빼요', 'Servers failing health checks are taken out');
  return S;
}
function sStateless() {
  const S = scene({ id: 'di-stateless', steps: 5, per: 1.3 });
  dot(S, 'u', 2.6, 8.6, '', { r: 1.1, s: C.soft }); text(S, 'ut', .8, 10.2, ['사용자', 'user'], { w: 3.6, cls: 'cz-t cz-tc' });
  arrow(S, 'ul', 3.9, 8.6, 5.4, 8.6, {});
  box(S, 'lb', 5.6, 7, 3.6, 3.2, 'LB', {});
  [[1.4, ['서버 1', 'Server 1']], [9.8, ['서버 2', 'Server 2']]].forEach(([y, l], i) => { box(S, 's' + i, 12, y, 10, 5.6, '', {}); text(S, 'st' + i, 12.6, y + .4, l, { cls: 'cz-t di-b' }); });
  box(S, 'rd', 24, 5.2, 7.4, 6.6, '', { s: hid() }); text(S, 'rdt', 24.6, 5.6, 'Redis', { cls: 'cz-t cz-mono di-b', s: hid() });
  edge(S, 'e1', 22, 4.2, 24, 7, { s: hid() }); edge(S, 'e2', 22, 12.6, 24, 10, { s: hid() }); show(S, ['rd', 'rdt', 'e1', 'e2'], 3);
  chip(S, 'ss', 12.8, 3.8, 6.6, ['세션: 민지', 'session: Minji'], hid(C.cmp), { h: 2.2, cls: 'di-p' }); S.set('ss', 1, { opacity: '1' }); S.move('ss', 3, 24.4, 7.8);
  fly(S, 'q1', [9.2, 8.6], [11.9, 6.2], 1); fly(S, 'q2', [9.2, 8.6], [11.9, 14.6], 2); fly(S, 'q3', [9.2, 8.6], [11.9, 14.6], 4);
  text(S, 'err', 12, 16, ['서버 2엔 세션이 없어요 → 로그아웃 ✗', 'No session on server 2 → logged out ✗'], { cls: 'cz-t di-r', s: hid() }); S.set('err', 2, { opacity: '1' }).set('err', 3, { opacity: '0' }).set('s1', 2, C.bad).set('s1', 3, C.idle);
  text(S, 'okt', 12, 16, ['서버 2도 Redis에서 세션을 찾아요 ✓', 'Server 2 finds it in Redis ✓'], { cls: 'cz-t di-g', s: hid() }); S.set('okt', 4, { opacity: '1' }).set('s1', 4, C.ok).set('s1', 5, C.idle);
  S.cap(1, '로그인 정보를 서버 메모리에 두면', 'Keep the session in server memory')
    .cap(2, '다음 요청이 다른 서버로 가면 로그아웃돼요', 'and a request on another server is logged out')
    .cap(3, '상태는 공유 저장소(Redis·DB)로 빼요', 'Move state to a shared store (Redis, DB)')
    .cap(4, '어느 서버로 가도 같은 결과', 'Any server can answer')
    .cap(5, '무상태 서버는 마음대로 늘리고 줄이고 교체할 수 있어요', 'Stateless servers can be added, removed or replaced freely');
  return S;
}
function sCHash() {
  const S = scene({ id: 'di-chash', steps: 6, per: 1.3 });
  const cx = 10, cy = 11, R = 7.6, P = a => [cx + R * Math.sin(a * Math.PI / 180), cy - R * Math.cos(a * Math.PI / 180)];
  S.el('ring', { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, css: 'border-radius:50%;border:.16em solid var(--line)' });
  const col = { A: 'accent', B: 'ok', C: 'warn', D: 'danger' };
  const KEYS = [[10, 'A'], [60, 'B'], [100, 'B'], [170, 'C', 'D'], [220, 'C'], [300, 'A'], [340, 'A']];
  KEYS.forEach(([a, o, o2], i) => {
    const [x, y] = P(a);
    dot(S, 'k' + i, x, y, '', { r: .5, s: hid({ background: 'var(--ink-3)', 'border-color': 'transparent' }) });
    S.set('k' + i, 2, { opacity: '1' }).set('k' + i, 3, { background: `var(--${col[o]})` });
    if (o2) S.set('k' + i, 5, { background: `var(--${col[o2]})`, transform: 'scale(1.6)' });
  });
  [['A', 30, C.soft], ['B', 150, C.ok], ['C', 270, C.cmp], ['D', 200, C.bad]].forEach(([n, a, st], i) => { const [x, y] = P(a); node(S, 'n' + n, x, y, n, { r: 1.2, s: hid(st) }); S.set('n' + n, i < 3 ? 1 : 4, { opacity: '1' }); });
  text(S, 'h1', 20, 1.6, ['노드를 하나 추가하면', 'Add one node, and'], { cls: 'cz-t di-b', s: hid() });
  text(S, 'h2', 20, 2.9, ['옮겨야 하는 키는?', 'how many keys move?'], { cls: 'cz-t di-b', s: hid() });
  text(S, 'r1', 20, 6, 'hash(key) % N', { cls: 'cz-t cz-mono di-l', s: hid() }); bar(S, 'b1', 20, 7.6, 11, 8.3, 6, 'danger');
  text(S, 'r1v', 20, 9.1, ['약 3/4이 이동 ✗', '≈ 3/4 move ✗'], { cls: 'cz-t di-r', s: hid() });
  text(S, 'r2', 20, 11.6, ['일관된 해싱', 'Consistent hashing'], { cls: 'cz-t di-l', s: hid() }); bar(S, 'b2', 20, 13.2, 11, 1.6, 6, 'ok');
  text(S, 'r2v', 20, 14.7, ['키 1개만 (≈ 1/N) ✓', 'one key (≈ 1/N) ✓'], { cls: 'cz-t di-g', s: hid() });
  show(S, ['h1', 'h2', 'r1', 'r1v', 'r2', 'r2v', 'b1t', 'b2t'], 6); S.get('b1t').s = hid(); S.get('b2t').s = hid();
  S.cap(1, '서버들을 해시 링 위에 올려요', 'Place servers on a hash ring')
    .cap(2, '키도 해시해서 링 위에 놓고', 'Hash each key onto the ring too')
    .cap(3, '시계 방향으로 처음 만나는 서버가 주인', 'Each key belongs to the next server clockwise')
    .cap(4, '서버 D를 추가하면', 'Add server D')
    .cap(5, 'D 바로 앞 구간의 키만 옮겨가요', 'and only the keys just before D move')
    .cap(6, '나머지 연산은 거의 전부 이동 · 링은 약 1/N만 (캐시·샤딩)', 'Modulo moves almost everything · the ring moves ~1/N (caches, sharding)');
  return S;
}
function sStampede() {
  const S = scene({ id: 'di-stampede', steps: 5, per: 1.35 });
  const RY = [3.4, 6.4, 9.4, 12.4, 15.4];
  RY.forEach((y, i) => dot(S, 'u' + i, 2.4, y, '', { r: .8, s: C.soft }));
  text(S, 'ut', 1, 17.2, ['동시 요청', 'concurrent'], { cls: 'cz-t' });
  box(S, 'cache', 11, 6, 8, 6, '', {});
  S.label('cl', { cls: 'cz-bx', x: 11, y: 6, w: 8, h: 6 }, [[0, ['캐시 ✓', 'cache ✓']], [2, ['만료!', 'expired!']], [5, ['캐시 ✓<br>(갱신됨)', 'cache ✓<br>(refreshed)']]]);
  S.set('cache', 2, C.bad).set('cache', 4, C.cmp).set('cache', 5, C.ok);
  S.el('ttlt', { x: 11, y: 13, w: 8, h: .8, css: 'border-radius:.4em;background:var(--line)' });
  S.el('ttlf', { x: 11, y: 13, w: 8, h: .8, css: 'border-radius:.4em', s: { width: '8em', background: 'var(--accent)' } });
  S.set('ttlf', 1, { width: '2.6em' }).set('ttlf', 2, { width: '0em' }).set('ttlf', 5, { width: '8em' });
  text(S, 'ttl', 11, 14.2, 'TTL', { cls: 'cz-t cz-mono' });
  box(S, 'db', 24, 6, 7, 6, 'DB', {}); S.set('db', 3, C.badf).set('db', 4, C.idle);
  text(S, 'dbt', 24, 12.6, ['과부하!', 'overloaded!'], { cls: 'cz-t di-r', s: hid() }); S.set('dbt', 3, { opacity: '1' }).set('dbt', 4, { opacity: '0' });
  pill(S, 'lk', 10.5, 3.6, ['락: 하나만 DB로', 'lock: one goes to DB'], { w: 9, h: 1.8, s: hid(C.cmp) }); S.set('lk', 4, { opacity: '1' }).set('lk', 5, { opacity: '0' });
  RY.forEach((y, i) => {
    fly(S, 'a' + i, [3.4, y], [15, 9], 1, '', C.cur);
    fly(S, 'b' + i, [3.4, y], [27.5, 9], 3, '', C.badf);
    if (i === 2) fly(S, 'c' + i, [3.4, y], [27.5, 9], 4, '', C.cur);
    else { fly(S, 'c' + i, [3.4, y], [[12.6, 7.6], [17.4, 7.6], 0, [12.6, 10.6], [17.4, 10.6]][i], 4, '', C.cmp, { keep: true }); S.set('c' + i, 5, { opacity: '0' }); }
  });
  S.cap(1, '인기 키는 캐시가 받아줘요', 'A hot key is served from cache')
    .cap(2, 'TTL이 끝나는 순간', 'The moment its TTL runs out')
    .cap(3, '모든 요청이 한꺼번에 DB로 (캐시 스탬피드)', 'every request hits the DB at once (cache stampede)')
    .cap(4, '락으로 하나만 DB에 가고 나머지는 기다리거나 이전 값을 받아요', 'A lock lets one request rebuild; the rest wait or get stale data')
    .cap(5, '만료 시간 랜덤화·미리 갱신도 함께 써요', 'Also randomize TTLs and refresh early');
  return S;
}
function sRate() {
  const S = scene({ id: 'di-ratelimit', steps: 6, per: 1.25 });
  const ink = { background: 'var(--ink-2)' };
  edge(S, 'bl', 12, 6, 12, 17.4, { h: .24, s: ink }); edge(S, 'br', 20, 6, 20, 17.4, { h: .24, s: ink }); edge(S, 'bb', 12, 17.4, 20, 17.4, { h: .24, s: ink });
  text(S, 'rf', 12, 1.2, ['초당 1개씩 충전', 'refills 1 per second'], { cls: 'cz-t di-b' }); arrow(S, 'ra', 16, 2.8, 16, 5.4, {});
  text(S, 'cap', 12.4, 17.8, ['최대 4개', 'max 4'], { w: 7.2, cls: 'cz-t cz-tc' });
  const TOK = { background: 'var(--warn)', 'border-color': 'var(--warn)' };
  for (let j = 0; j < 4; j++) dot(S, 't' + j, 16, 16.2 - j * 2.2, '', { r: .9, s: Object.assign({}, TOK) });
  S.set('t3', 1, { opacity: '0' }).set('t2', 1, { opacity: '0' }).set('t1', 2, { opacity: '0' }).set('t0', 2, { opacity: '0' }).set('t0', 3, { opacity: '1' }).set('t1', 4, { opacity: '1' }).set('t1', 5, { opacity: '0' });
  const Q = [1, 1, 2, 2, 2, 5], OKR = [true, true, true, true, false, true];
  Q.forEach((st, i) => {
    const y = 2.4 + i * 2.8;
    fly(S, 'q' + i, [2.6, y + 1.1], [16, 4.6], st, 'R' + (i + 1), C.soft, { r: .9 });
    chip(S, 'rs' + i, 22.6, y, 8.6, OKR[i] ? 'R' + (i + 1) + ' → 200 OK' : 'R' + (i + 1) + ' → 429', hid(OKR[i] ? C.ok : C.badf), { h: 2.2 });
    S.set('rs' + i, st, { opacity: '1' });
  });
  S.cap(1, '요청마다 토큰 하나씩 꺼내 써요', 'Each request spends one token')
    .cap(2, '토큰이 없으면 429 Too Many Requests', 'No token left: 429 Too Many Requests')
    .cap(3, '토큰은 일정한 속도로 다시 차요', 'Tokens refill at a steady rate')
    .cap(5, '순간 폭주는 버킷 크기만큼 허용 (토큰 버킷)', 'Bursts are allowed up to the bucket size (token bucket)')
    .cap(6, '로그인·API 남용 방지 · Retry-After로 다시 시도할 때를 알려요', 'Stops login and API abuse · Retry-After says when to come back');
  return S;
}

/* ---------- messaging ---------- */
function sMQ() {
  const S = scene({ id: 'di-mq', steps: 6, per: 1.2 });
  box(S, 'pr', 1, 8, 5.6, 4, ['주문 API', 'Order API'], {});
  arrow(S, 'pa', 6.8, 10, 8.2, 10, {});
  S.el('q', { x: 8.4, y: 8.4, w: 14.2, h: 3.2, css: 'border-radius:.6em;border:.14em dashed var(--ink-3)' });
  text(S, 'qt', 8.4, 6.8, ['메시지 큐', 'Message queue'], { cls: 'cz-t di-b' });
  const WY = [3, 12.6];
  WY.forEach((y, i) => { box(S, 'w' + i, 25, y, 6, 4.4, '', {}); text(S, 'wt' + i, 25, y - 1.4, [`워커 ${i + 1}`, `Worker ${i + 1}`], { cls: 'cz-t di-b' }); });
  arrow(S, 'qa0', 22.8, 9.4, 24.8, 5.6, {}); arrow(S, 'qa1', 22.8, 10.6, 24.8, 14.4, {});
  const slot = j => [20.4 - j * 2.3, 9];
  const ids = [0, 1, 2, 3, 4, 5];
  ids.forEach(i => chip(S, 'm' + i, 2.85, 9, 1.9, '#' + (i + 1), hid(C.soft), { h: 2, cls: 'di-xs' }));
  const plan = { 1: { enq: [0, 1, 2] }, 2: { enq: [3, 4, 5] }, 3: { deq: [[0, 0], [1, 1]] }, 4: { done: [0, 1], deq: [[2, 0], [3, 1]] }, 5: { done: [2, 3], deq: [[4, 0], [5, 1]] }, 6: { done: [4, 5] } };
  let q = [];
  for (let st = 1; st <= 6; st++) {
    const p = plan[st];
    (p.done || []).forEach(i => S.set('m' + i, st, { opacity: '0' }));
    (p.deq || []).forEach(([i, w]) => { q.splice(q.indexOf(i), 1); S.move('m' + i, st, 27.05, WY[w] + 1.2, C.ok); S.set('w' + w, st, C.soft); });
    (p.enq || []).forEach(i => { q.push(i); S.set('m' + i, st, { opacity: '1' }); });
    q.forEach((i, j) => { const [x, y] = slot(j); S.move('m' + i, st, x, y); });
  }
  S.set('w0', 6, C.idle).set('w1', 6, C.idle);
  S.cap(1, '주문이 몰려도 생산자는 큐에 넣고 바로 응답해요', 'During a spike the producer just enqueues and returns')
    .cap(2, '큐가 폭주를 흡수하고', 'The queue absorbs the burst')
    .cap(3, '워커들은 자기 속도로 꺼내 처리해요', 'Workers pull at their own pace')
    .cap(5, '워커를 늘리면 처리량도 늘어요', 'Add workers to raise throughput')
    .cap(6, '서비스끼리 느슨하게 · 실패한 메시지는 재시도 후 DLQ로', 'Services stay decoupled · failed messages retry, then go to a DLQ');
  return S;
}
function sPubSub() {
  const S = scene({ id: 'di-pubsub', steps: 6, per: 1.25 });
  text(S, 'h', 1, .9, ['토픽 orders · 파티션 0', 'topic orders · partition 0'], { cls: 'cz-t di-b' });
  pill(S, 'pd', 20.4, .7, ['프로듀서: 주문 서비스', 'producer: order service'], { w: 10.6, h: 1.8, s: C.soft });
  const cx = j => 4.6 + j * 2.6;
  const APP = [1, 1, 1, 1, 3, 3, 3, 5];
  APP.forEach((st, j) => { chip(S, 'c' + j, cx(j), 5.6, 2.3, String(j), hid(C.soft), { h: 2.3 }); S.set('c' + j, st, { opacity: '1' }).set('c' + j, st + 1 <= 6 ? st + 1 : 6, st + 1 <= 6 ? C.idle : {}); });
  text(S, 'ot', 1, 6.2, ['오프셋', 'offset'], { cls: 'cz-t' });
  const mk = (k, y, lab, pos, st0) => {
    pill(S, k, cx(pos[0][1]) + 1.15 - 2.6, y, lab, { w: 5.2, h: 1.8, s: hid(st0) }); S.set(k, 1, { opacity: '1' });
    const base = cx(pos[0][1]) + 1.15 - 2.6;
    pos.slice(1).forEach(([st, o]) => S.move(k, st, cx(o) + 1.15 - 2.6, y));
    return base;
  };
  mk('em', 9.4, ['▲ 이메일', '▲ email'], [[1, 0], [2, 3], [3, 5], [4, 6], [5, 7]], C.ok);
  mk('an', 12, ['▲ 분석', '▲ analytics'], [[1, 0], [2, 1], [3, 2], [4, 4], [5, 7], [6, 0]], C.cmp);
  S.label('lag', { cls: 'cz-t di-l', x: 1, y: 15.6, w: 30 }, [[0, ''], [3, ['분석 서비스 지연(lag) 4', 'analytics lag: 4']], [5, ['둘 다 따라잡음 · 메시지는 그대로 남아 있어요', 'both caught up · messages are still there']], [6, ['분석: 오프셋 0부터 다시 읽기 (재처리)', 'analytics: replay from offset 0']]]);
  S.cap(1, '이벤트를 로그 끝에 차례로 추가해요', 'Events are appended to the end of a log')
    .cap(2, '구독자마다 자기 위치(오프셋)를 따로 기억', 'Each subscriber tracks its own offset')
    .cap(3, '느린 구독자는 뒤처져도 괜찮아요', 'A slow subscriber can lag behind')
    .cap(5, '읽어도 지워지지 않아요 · 큐와 다른 점', 'Reading doesn’t delete · unlike a queue')
    .cap(6, '오프셋을 되돌려 과거 이벤트를 다시 처리 (Kafka)', 'Rewind the offset to reprocess history (Kafka)');
  return S;
}
function sIdem() {
  const S = scene({ id: 'di-idem', steps: 6, per: 1.3 });
  const A = 4.5, B = 16.5;
  [[A, ['클라이언트', 'Client']], [B, ['결제 서버', 'Payment API']]].forEach(([x, l], i) => { S.el('a' + i, { cls: 'cz-act', x: x - 3.5, y: 1, w: 7, h: 2.3, html: l }); S.el('ll' + i, { cls: 'cz-ll', x, y: 3.3, w: .1, h: 16 }); });
  const msg = (k, x1, x2, y, lab, st, c) => { arrow(S, k, x1, y, x2, y, { s: hid(c ? { background: `var(--${c})`, 'border-color': `var(--${c})` } : {}) }); text(S, k + 't', Math.min(x1, x2), y - 1.2, lab, { w: Math.abs(x2 - x1), cls: 'cz-t cz-tc di-s', s: hid() }); show(S, [k, k + 't'], st); };
  msg('m0', A, B, 6, 'POST /pay · Key: abc', 1);
  msg('m1', B, 10.8, 8.8, ['응답 유실', 'response lost'], 2, 'danger');
  text(S, 'x1', 9.2, 8.05, '✗', { w: 1.4, cls: 'cz-t cz-tc di-x', s: hid() }); S.set('x1', 2, { opacity: '1' });
  msg('m2', A, B, 11.6, ['같은 Key: abc로 재시도', 'retry with Key: abc'], 3);
  msg('m3', B, A, 14.4, ['200 · 저장된 결과', '200 · stored result'], 4, 'ok');
  text(S, 'lh', 21, 1.4, ['결제 기록', 'Payment ledger'], { cls: 'cz-t di-b' });
  chip(S, 'e0', 21, 3, 10, 'abc → 10,000', hid(C.ok), { h: 2.2 }); S.set('e0', 1, { opacity: '1' });
  text(S, 'n1', 21, 6, ['abc는 이미 처리됨', 'abc already processed'], { cls: 'cz-t di-g', s: hid() });
  text(S, 'n2', 21, 7.2, ['→ 다시 결제하지 않아요', '→ no second charge'], { cls: 'cz-t di-g', s: hid() }); show(S, ['n1', 'n2'], 4);
  text(S, 'wh', 21, 10.4, ['Key가 없었다면?', 'Without a key?'], { cls: 'cz-t di-b', s: hid() });
  chip(S, 'e1', 21, 12, 10, 'POST /pay → 10,000', hid(C.bad), { h: 2.2 }); chip(S, 'e2', 21, 14.6, 10, 'POST /pay → 10,000', hid(C.bad), { h: 2.2 });
  text(S, 'wt', 21, 17.2, ['같은 결제가 2번 ✗', 'charged twice ✗'], { cls: 'cz-t di-r', s: hid() }); show(S, ['wh', 'e1', 'e2', 'wt'], 5);
  S.cap(1, '요청마다 고유한 멱등성 키를 붙여 보내요', 'Send a unique idempotency key with the request')
    .cap(2, '처리는 됐는데 응답이 사라지면', 'If it succeeds but the response is lost')
    .cap(3, '클라이언트는 같은 키로 안심하고 재시도', 'the client safely retries with the same key')
    .cap(4, '서버는 키를 보고 저장된 결과를 돌려줘요', 'and the server replays the stored result')
    .cap(5, '키가 없으면 재시도가 중복 결제가 돼요', 'Without a key, a retry becomes a double charge')
    .cap(6, '네트워크는 "최소 한 번" 전달 · 받는 쪽이 중복을 걸러야 해요', 'Networks deliver at least once · receivers must dedupe');
  return S;
}
function sSaga() {
  const S = scene({ id: 'di-saga', steps: 6, per: 1.3 });
  text(S, 'h', 1, 1.4, ['각 단계 = 서비스별 로컬 트랜잭션', 'each step = one local transaction per service'], { cls: 'cz-t' });
  const F = [['주문 생성', 'Create order'], ['결제', 'Charge card'], ['재고 차감', 'Reserve stock'], ['배송 예약', 'Book shipping']];
  F.forEach((l, i) => { chip(S, 'c' + i, 1 + i * 7.8, 3.6, 7, l, {}, { h: 3.2, cls: 'di-p' }); if (i < 3) arrow(S, 'a' + i, 8.1 + i * 7.8, 5.2, 8.7 + i * 7.8, 5.2, {}); });
  S.set('c0', 1, C.ok).set('c1', 2, C.ok).set('c2', 3, C.badf).set('c3', 3, { opacity: '.35' });
  text(S, 'nf', 19.2, 7.4, ['재고 없음 ✗', 'out of stock ✗'], { cls: 'cz-t di-r', s: hid() }); S.set('nf', 3, { opacity: '1' });
  chip(S, 'k1', 8.8, 11.6, 7, ['결제 환불', 'Refund card'], hid(C.cmp), { h: 3.2, cls: 'di-p' }); chip(S, 'k0', 1, 11.6, 7, ['주문 취소', 'Cancel order'], hid(C.cmp), { h: 3.2, cls: 'di-p' });
  arrow(S, 'b1', 17.6, 7, 15.9, 11.4, { s: hid() }); arrow(S, 'b0', 8.7, 13.2, 8.1, 13.2, { s: hid() });
  show(S, ['k1', 'b1'], 4); show(S, ['k0', 'b0'], 5);
  text(S, 'kt', 1, 15.4, ['보상 트랜잭션 (역순)', 'compensating transactions (reverse order)'], { cls: 'cz-t di-w', s: hid() }); S.set('kt', 4, { opacity: '1' });
  chip(S, 'o1', 1, 17.4, 14.6, ['오케스트레이션: 중앙 조정자가 지휘', 'Orchestration: a coordinator directs'], hid(C.soft), { h: 2.4, cls: 'di-p' });
  chip(S, 'o2', 16.4, 17.4, 14.6, ['코레오그래피: 이벤트로 연쇄', 'Choreography: services react to events'], hid(C.soft), { h: 2.4, cls: 'di-p' }); show(S, ['o1', 'o2'], 6);
  S.cap(1, '여러 서비스에 걸친 작업을 단계별 로컬 트랜잭션으로', 'Split a cross-service job into local transactions')
    .cap(2, '결제까지 성공했는데', 'Payment succeeds too, but')
    .cap(3, '재고 차감이 실패하면', 'reserving stock fails')
    .cap(4, '앞 단계를 되돌리는 보상 트랜잭션을 역순으로', 'so compensating steps run in reverse')
    .cap(5, '결제 환불 → 주문 취소로 일관성 회복', 'refund, then cancel, restoring consistency')
    .cap(6, '조율 방식은 두 가지 · 분산 락 없이 최종 일관성', 'Two ways to coordinate · eventual consistency without distributed locks');
  return S;
}
function sES() {
  const S = scene({ id: 'di-es', steps: 6, per: 1.3 });
  text(S, 'h', 1, .9, ['이벤트 저장소 (추가만)', 'Event store (append-only)'], { cls: 'cz-t di-b' });
  const E = [['#1 계좌 개설', '#1 AccountOpened'], ['#2 입금 +100', '#2 Deposited +100'], ['#3 출금 −30', '#3 Withdrew −30'], ['#4 입금 +50', '#4 Deposited +50']];
  E.forEach((l, i) => { chip(S, 'e' + i, 1, 2.8 + i * 2.6, 12.4, l, hid(C.soft), { h: 2.2 }); S.set('e' + i, i + 1, { opacity: '1' }); });
  arrow(S, 'ra', 14, 7, 17.6, 7, {}); text(S, 'rt', 14, 5.4, ['재생', 'replay'], { w: 3.6, cls: 'cz-t cz-tc' });
  box(S, 'st', 18, 4.4, 13, 5.2, '', {});
  S.label('sv', { cls: 'cz-bx di-big', x: 18, y: 4.4, w: 13, h: 5.2 }, [[0, ['잔액 —', 'balance —']], [1, ['잔액 0', 'balance 0']], [2, ['잔액 100', 'balance 100']], [3, ['잔액 70', 'balance 70']], [4, ['잔액 120', 'balance 120']], [5, ['#3 시점 잔액 70', 'as of #3: 70']], [6, ['70 + 50 = 120', '70 + 50 = 120']]]);
  S.set('st', 5, C.cmp).set('st', 6, C.ok);
  S.set('e3', 5, { opacity: '.3' }).set('e3', 6, { opacity: '1' });
  edge(S, 'tm', .6, 10.65, 13.8, 10.65, { h: .2, s: hid({ background: 'var(--warn)' }) }); S.set('tm', 5, { opacity: '1' }).set('tm', 6, { opacity: '0' });
  chip(S, 'sn', 1, 14.2, 12.4, ['스냅샷 (#3까지): 70', 'snapshot (through #3): 70'], hid(C.cmp), { h: 2.2 }); S.set('sn', 6, { opacity: '1' });
  [0, 1, 2].forEach(i => S.set('e' + i, 6, { opacity: '.35' }));
  text(S, 'cmp', 18, 11.4, ['일반 DB: 잔액 = 120 (과정은 사라짐)', 'Plain DB: balance = 120 (history lost)'], { cls: 'cz-t', s: hid() }); S.set('cmp', 4, { opacity: '1' });
  S.cap(1, '현재 값 대신 일어난 사건을 차례로 저장해요', 'Store what happened, not just the current value')
    .cap(2, '상태는 이벤트를 처음부터 재생해 계산', 'State is computed by replaying events')
    .cap(4, '모든 변경 이력이 그대로 남아요', 'Every change stays on record')
    .cap(5, '과거 어느 시점의 상태도 다시 만들 수 있어요 (감사·디버깅)', 'Rebuild the state at any point in time (audit, debugging)')
    .cap(6, '이벤트가 쌓이면 스냅샷부터 재생 · CQRS와 자주 함께 써요', 'Snapshots speed up replay · often paired with CQRS');
  return S;
}

/* ---------- consistency and consensus ---------- */
function sCAP() {
  const S = scene({ id: 'di-cap', steps: 5, per: 1.4 });
  [[3, 'N1', [[0, 'x = 1'], [3, 'x = 2']]], [21, 'N2', [[0, 'x = 1']]]].forEach(([x, n, vals], i) => {
    box(S, 'n' + i, x, 4.4, 8, 5.2, '', {}); text(S, 'nt' + i, x + .6, 4.8, n, { cls: 'cz-t cz-mono di-b' });
    S.label('v' + i, { cls: 'cz-t cz-tc di-big', x, y: 6.6, w: 8 }, vals);
  });
  S.set('n0', 3, C.ok);
  edge(S, 'lk', 11, 7, 21, 7, { h: .2, s: { background: 'var(--ok)' } }); S.set('lk', 2, { background: dash('danger') });
  text(S, 'rp', 11, 5.4, ['복제 중', 'replicating'], { w: 10, cls: 'cz-t cz-tc di-g' }); S.set('rp', 2, { opacity: '0' });
  text(S, 'cut', 11, 5.2, ['✗ 네트워크 분할', '✗ network partition'], { w: 10, cls: 'cz-t cz-tc di-r', s: hid() }); S.set('cut', 2, { opacity: '1' });
  chip(S, 'ca', 3, 16.8, 8, ['클라이언트 A', 'client A'], {}, { h: 2.2, cls: 'di-p' }); chip(S, 'cb', 21, 16.8, 8, ['클라이언트 B', 'client B'], {}, { h: 2.2, cls: 'di-p' });
  arrow(S, 'wa', 7, 16.6, 7, 9.8, { s: hid() }); text(S, 'wat', 7.4, 12.4, ['x = 2 쓰기', 'write x = 2'], { cls: 'cz-t di-l', s: hid() }); show(S, ['wa', 'wat'], 3);
  arrow(S, 'rb', 25, 16.6, 25, 9.8, { s: hid() }); text(S, 'rbt', 25.4, 12.4, ['x 읽기', 'read x'], { cls: 'cz-t di-l', s: hid() }); show(S, ['rb', 'rbt'], 4);
  S.label('res', { cls: 'cz-pill', x: 11.2, y: 13.4, w: 13, h: 2.2 }, [[0, ''], [4, ['CP: 오류 반환', 'CP: return an error']], [5, ['AP: x = 1 반환 (옛 값)', 'AP: return x = 1 (stale)']]]);
  Object.assign(S.get('res~0').s, { background: 'transparent' }); Object.assign(S.get('res~1').s, C.badf); Object.assign(S.get('res~2').s, C.cmp);
  S.cap(1, '두 노드가 데이터를 복제하며 동기화', 'Two nodes replicate and stay in sync')
    .cap(2, '네트워크가 끊기면 (P: 분할)', 'The network splits (P: partition)')
    .cap(3, 'N1에만 새 값이 써져요', 'A write lands only on N1')
    .cap(4, 'CP: 틀린 값을 주느니 오류 (은행 잔액)', 'CP: refuse rather than be wrong (bank balances)')
    .cap(5, 'AP: 옛 값이라도 응답 (좋아요 수, 피드)', 'AP: answer with possibly stale data (likes, feeds)');
  return S;
}
function sConsist() {
  const S = scene({ id: 'di-consist', steps: 6, per: 1.3 });
  const nm = (k, j) => [`이름: ${k}`, `name: ${j}`];
  box(S, 'ld', 12, 1.6, 8, 4.4, '', { s: C.soft }); text(S, 'ldt', 12.6, 1.9, ['리더', 'Leader'], { cls: 'cz-t di-b' });
  S.label('lv', { cls: 'cz-t cz-tc di-l', x: 12, y: 3.8, w: 8 }, [[0, nm('지민', 'Jimin')], [1, nm('민지', 'Minji')]]);
  [[2, 'F1', 2], [21.6, 'F2', 4]].forEach(([x, n, st], i) => {
    box(S, 'f' + i, x, 12, 8.4, 4.4, '', {}); text(S, 'ft' + i, x + .6, 12.3, n, { cls: 'cz-t cz-mono di-b' });
    S.label('fv' + i, { cls: 'cz-t cz-tc di-l', x, y: 14.2, w: 8.4 }, [[0, nm('지민', 'Jimin')], [st, nm('민지', 'Minji')]]);
    S.set('f' + i, st, C.ok).set('f' + i, st + 1, C.idle);
  });
  chip(S, 'u', 1, 2.6, 7, ['사용자', 'user'], {}, { h: 2.2, cls: 'di-p' });
  arrow(S, 'w', 8.2, 3.7, 11.8, 3.7, { s: hid() }); text(S, 'wt', 8.2, 1.8, ['이름 변경', 'rename'], { cls: 'cz-t', s: hid() }); show(S, ['w', 'wt'], 1);
  fly(S, 'r1', [16, 6.2], [6.2, 12], 2, '', C.cur);
  fly(S, 'r2', [16, 6.2], [20.6, 9], 2, '', C.cur, { keep: true }); S.move('r2', 4, 25.8 - .7, 12 - .7); S.set('r2', 5, { opacity: '0' });
  text(S, 'lag', 21.4, 7.2, ['복제 지연', 'replication lag'], { cls: 'cz-t di-w', s: hid() }); S.set('lag', 2, { opacity: '1' }).set('lag', 4, { opacity: '0' });
  chip(S, 'rd', 21.6, 17.6, 8.4, ['읽기 → 지민? ✗', 'read → Jimin? ✗'], hid(C.bad), { h: 2, cls: 'di-p' }); S.set('rd', 3, { opacity: '1' }).set('rd', 5, { opacity: '0' });
  chip(S, 'rd2', 21.6, 17.6, 8.4, ['읽기 → 민지 ✓', 'read → Minji ✓'], hid(C.ok), { h: 2, cls: 'di-p' }); S.set('rd2', 5, { opacity: '1' });
  S.cap(1, '리더에 쓰기', 'A write goes to the leader')
    .cap(2, '팔로워에 비동기로 복제 · 하나는 늦어요', 'Followers replicate asynchronously; one lags')
    .cap(3, '늦은 팔로워에서 읽으면 옛 값', 'Reading the lagging follower returns the old value')
    .cap(4, '조금 뒤 복제가 도착하면', 'When replication catches up')
    .cap(5, '모두 같아져요 (최종 일관성)', 'all agree (eventual consistency)')
    .cap(6, '강한 일관성은 느리고, 최종 일관성은 빠르지만 잠깐 어긋나요', 'Strong costs latency · eventual is fast but briefly stale');
  return S;
}
function sQuorum() {
  const S = scene({ id: 'di-quorum', steps: 5, per: 1.4 });
  const X = [2, 13, 24];
  ['A', 'B', 'C'].forEach((n, i) => {
    box(S, 'r' + i, X[i], 8.4, 6, 4.6, '', {}); text(S, 'rn' + i, X[i] + .5, 8.7, n, { cls: 'cz-t cz-mono di-b' });
    S.label('rv' + i, { cls: 'cz-t cz-tc di-big', x: X[i], y: 10.2, w: 6 }, i < 2 ? [[0, 'v1'], [1, 'v2']] : [[0, 'v1']]);
  });
  S.set('r0', 1, C.ok).set('r1', 1, C.ok).set('r0', 2, C.idle).set('r1', 2, C.soft).set('r2', 2, C.soft).set('r1', 4, C.idle).set('r2', 4, C.bad);
  chip(S, 'wr', 1, 1.4, 9, ['쓰기 v2', 'write v2'], {}, { h: 2.2, cls: 'di-p' });
  fly(S, 'w0', [5.5, 3.7], [5, 8.4], 1, '', C.ok); fly(S, 'w1', [5.5, 3.7], [16, 8.4], 1, '', C.ok);
  chip(S, 'rr', 21.6, 17.4, 9.4, ['읽기', 'read'], {}, { h: 2.2, cls: 'di-p' });
  fly(S, 'g1', [16, 13], [26.3, 17.4], 2, 'v2', C.okf, { r: .9 }); fly(S, 'g2', [27, 13], [26.3, 17.4], 2, 'v1', C.cmp, { r: .9 });
  fly(S, 'g3', [27, 13], [26.3, 17.4], 4, 'v1', C.badf, { r: .9 });
  S.label('fm', { cls: 'cz-pill', x: 19, y: 1.4, w: 12, h: 2.2, s: C.soft }, [[0, 'N = 3 · W = 2 · R = 2'], [4, 'N = 3 · W = 1 · R = 1']]);
  S.label('fr', { cls: 'cz-t di-l', x: 19, y: 4.4, w: 12 }, [[0, ['W + R > N → 반드시 겹쳐요', 'W + R > N → always overlap']], [4, ['W + R ≤ N → 옛 값 가능', 'W + R ≤ N → stale reads']]]);
  S.label('ans', { cls: 'cz-t di-l', x: 1, y: 17.8, w: 20 }, [[0, ''], [3, ['v2, v1 중 최신 → v2 ✓', 'newest of v2, v1 → v2 ✓']], [4, ['C만 읽으면 → v1 ✗', 'read only C → v1 ✗']]]);
  S.cap(1, '복제본 3개 중 2개에 저장되면 쓰기 성공 (W = 2)', 'A write succeeds once 2 of 3 replicas store it (W = 2)')
    .cap(2, '읽기도 2개에서 (R = 2)', 'Read from 2 replicas as well (R = 2)')
    .cap(3, '적어도 하나는 최신 값을 가지고 있어요', 'At least one of them has the latest value')
    .cap(4, 'W·R을 줄이면 빠르지만 옛 값을 읽을 수 있어요', 'Lower W and R are faster but may read stale data')
    .cap(5, 'Cassandra·DynamoDB는 요청마다 이 값을 조절할 수 있어요', 'Cassandra and DynamoDB let you tune them per request');
  return S;
}
function sRaft() {
  const S = scene({ id: 'di-raft', steps: 8, per: 1.15 });
  const cx = 10, cy = 10.6, R = 6.8;
  const P = Array.from({ length: 5 }, (_, k) => { const a = (-90 + 72 * k) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  const F = ['팔로워', 'follower'], Cd = ['후보', 'candidate'], L = ['리더', 'leader'], D = ['다운', 'down'];
  const mk = (i, r, t) => [`S${i + 1}<br>${r[0]}<br>임기 ${t}`, `S${i + 1}<br>${r[1]}<br>term ${t}`];
  const LAB = [[[0, F, 1], [3, F, 2], [8, L, 3]], [[0, F, 1], [3, F, 2]], [[0, F, 1], [1, Cd, 2], [4, L, 2], [8, D, 2]], [[0, F, 1], [3, F, 2]], [[0, F, 1], [6, F, 2]]];
  P.forEach(([x, y], i) => { node(S, 'n' + i, x, y, '', { r: 2.1 }); S.label('t' + i, { cls: 'cz-t cz-tc di-rf', x: x - 2.1, y: y - 1.15, w: 4.2 }, LAB[i].map(([st, r, t]) => [st, mk(i, r, t)])); });
  S.set('n2', 1, C.cmp).set('n2', 4, Object.assign({}, C.soft, { 'box-shadow': '0 0 0 .35em color-mix(in srgb,var(--accent) 30%,transparent)' })).set('n2', 8, { opacity: '.3', background: 'var(--ui)', 'border-color': 'var(--line)', 'box-shadow': 'none' });
  S.set('n0', 8, Object.assign({}, C.soft, { 'box-shadow': '0 0 0 .35em color-mix(in srgb,var(--accent) 30%,transparent)' }));
  const others = [0, 1, 3, 4];
  others.forEach(i => fly(S, 'v' + i, P[2], P[i], 2, '', C.cmp, { r: .6 }));
  [0, 1, 3].forEach(i => fly(S, 'y' + i, P[i], P[2], 3, '✓', C.okf, { r: .7 }));
  others.forEach(i => fly(S, 'ae' + i, P[2], P[i], 6, '', C.soft, { r: .6 }));
  [0, 1, 3].forEach(i => fly(S, 'ak' + i, P[i], P[2], 7, '✓', C.okf, { r: .7 }));
  text(S, 'lh', 21.6, 1.4, ['리더(S3) 로그', 'Leader (S3) log'], { cls: 'cz-t di-b', s: hid() }); S.set('lh', 4, { opacity: '1' });
  chip(S, 'e0', 21.6, 3, 9.4, ['x = 3 · 커밋됨', 'x = 3 · committed'], hid(C.ok), { h: 2.2 }); S.set('e0', 4, { opacity: '1' });
  chip(S, 'e1', 21.6, 5.6, 9.4, ['x = 5 · 대기', 'x = 5 · pending'], hid(C.cmp), { h: 2.2 }); S.set('e1', 5, { opacity: '1' }).set('e1', 7, { opacity: '0' });
  chip(S, 'e2', 21.6, 5.6, 9.4, ['x = 5 · 커밋됨', 'x = 5 · committed'], hid(C.ok), { h: 2.2 }); S.set('e2', 7, { opacity: '1' });
  S.label('ack', { cls: 'cz-t di-l', x: 21.6, y: 9, w: 9.4 }, [[0, ''], [5, ['저장 1/5', 'stored 1/5']], [7, ['저장 4/5 → 과반 ✓', 'stored 4/5 → majority ✓']], [8, '']]);
  chip(S, 'cl', 21.6, 15.4, 9.4, ['클라이언트: x = 5', 'client: x = 5'], hid(C.soft), { h: 2.2, cls: 'di-p' }); S.set('cl', 5, { opacity: '1' }).set('cl', 7, C.ok).set('cl', 8, { opacity: '0' });
  arrow(S, 'ca', 21.4, 16.5, 16.3, 16.3, { s: hid() }); S.set('ca', 5, { opacity: '1' }).set('ca', 8, { opacity: '0' });
  text(S, 'nl', 21.6, 12, ['S3 다운 → S1이 임기 3 리더', 'S3 down → S1 leads term 3'], { cls: 'cz-t di-w', s: hid() }); S.set('nl', 8, { opacity: '1' });
  S.cap(1, '타이머가 먼저 끝난 S3가 후보가 되어 임기 2 선거 시작', 'S3’s timer fires first: it runs for term 2')
    .cap(2, '다른 노드들에게 투표 요청', 'It asks the others for votes')
    .cap(3, '과반(3/5 이상)의 표를 얻으면', 'With a majority of votes')
    .cap(4, '리더가 돼요 · 임기마다 리더는 하나', 'it becomes leader · one leader per term')
    .cap(5, '쓰기는 리더가 받아 로그에 추가', 'Writes go to the leader’s log')
    .cap(6, '팔로워들에게 로그 복제 (AppendEntries)', 'which replicates them (AppendEntries)')
    .cap(7, '과반이 저장하면 커밋 확정 → 응답', 'Once a majority stores it, it commits')
    .cap(8, '리더가 죽으면 새 선거 · 5대 중 2대 장애까지 버텨요', 'If the leader dies, a new election · 5 nodes survive 2 failures');
  return S;
}
function s2PC() {
  return seq('di-2pc', [['코디네이터', 'Coordinator'], ['주문 DB', 'Orders DB'], ['결제 DB', 'Payments DB']], [
    { f: 0, t: 1, l: 'PREPARE', cap: ['1단계(준비): 커밋할 수 있는지 모두에게 물어요', 'Phase 1 (prepare): ask everyone if they can commit'] },
    { f: 0, t: 2, l: 'PREPARE' },
    { f: 1, t: 0, l: ['YES (잠금 유지)', 'YES (holds locks)'], c: 'ok', cap: ['참여자는 준비를 마치고 잠금을 건 채 YES', 'Participants get ready, lock, and vote YES'] },
    { f: 2, t: 0, l: 'YES', c: 'ok' },
    { f: 0, t: 1, l: 'COMMIT', cap: ['2단계: 모두 YES면 커밋 · 하나라도 NO면 전부 롤백', 'Phase 2: all YES → commit · any NO → roll back everywhere'] },
    { f: 0, t: 2, l: 'COMMIT', cap: ['코디네이터가 죽으면 참여자는 잠긴 채 기다려요 → 서비스 간엔 사가를 더 써요', 'A dead coordinator leaves participants blocked → services prefer sagas'] }
  ], { aw: 7.4 });
}
function sLamport() {
  const S = scene({ id: 'di-lamport', steps: 6, per: 1.35 });
  const Y = [4, 10.6, 17.2];
  Y.forEach((y, i) => { text(S, 'p' + i, 1, y - .55, 'P' + (i + 1), { cls: 'cz-t cz-mono di-b' }); edge(S, 'ln' + i, 3.6, y, 31, y, { s: { background: 'var(--ink-3)' } }); });
  const E = [['a1', 6, 0, '1', 1, C.soft], ['a2', 11, 0, '2', 2, C.cmp], ['b1', 7.6, 1, '1', 1, C.soft], ['b2', 15, 1, '3', 3, C.ok], ['b3', 19, 1, '4', 4, C.cmp], ['c1', 6.4, 2, '1', 1, C.soft], ['c2', 12, 2, '2', 1, C.soft], ['c3', 24, 2, '5', 5, C.ok]];
  arrow(S, 'm1', 11.5, 4.6, 14.5, 10, { s: hid() }); text(S, 'm1t', 13.4, 6.2, 'ts=2', { cls: 'cz-t cz-mono', s: hid() }); show(S, ['m1', 'm1t'], 2);
  arrow(S, 'm2', 19.5, 11.2, 23.5, 16.6, { s: hid() }); text(S, 'm2t', 21.9, 12.8, 'ts=4', { cls: 'cz-t cz-mono', s: hid() }); show(S, ['m2', 'm2t'], 4);
  E.forEach(([k, x, p, v, st, sty]) => { dot(S, k, x, Y[p], v, { r: .85, s: hid(sty) }); S.set(k, st, { opacity: '1' }); });
  text(S, 'r1', 13.2, 12, 'max(1, 2) + 1 = 3', { cls: 'cz-t cz-mono di-g', s: hid() }); S.set('r1', 3, { opacity: '1' });
  text(S, 'r2', 21.8, 18.6, 'max(2, 4) + 1 = 5', { cls: 'cz-t cz-mono di-g', s: hid() }); S.set('r2', 5, { opacity: '1' });
  S.cap(1, '각 프로세스는 이벤트마다 자기 카운터를 1씩 올려요', 'Each process bumps its own counter per event')
    .cap(2, '메시지에 자기 시각을 실어 보내고', 'Messages carry the sender’s timestamp')
    .cap(3, '받는 쪽은 max(내 값, 받은 값) + 1', 'Receivers take max(local, received) + 1')
    .cap(5, '원인은 항상 결과보다 작은 번호를 가져요', 'A cause always gets a smaller number than its effect')
    .cap(6, '서버 시계는 어긋나니 순서는 논리 시계로 · 벡터 클록·HLC로 발전', 'Wall clocks drift, so order events logically · see vector clocks, HLC');
  return S;
}

/* ---------- architecture and resilience ---------- */
function sMicro() {
  const S = scene({ id: 'di-micro', steps: 5, per: 1.35 });
  box(S, 'mono', 1, 1.4, 13, 15.4, '', {}); text(S, 'mt', 1.6, 1.8, ['모놀리스', 'Monolith'], { cls: 'cz-t di-b' });
  chip(S, 'sdb', 3.4, 12.2, 8.2, ['공용 DB', 'shared DB'], {}, { h: 2.6, cls: 'di-p' });
  const M = [['주문', 'Orders'], ['결제', 'Payments'], ['회원', 'Users'], ['검색', 'Search']];
  const T = i => [17.6 + (i % 2) * 7.2, 2 + Math.floor(i / 2) * 8];
  [1, 2].forEach(k => { chip(S, 'dup' + k, T(3)[0] + .6 * k, T(3)[1] - .6 * k, 5.4, '', hid(C.ok), { h: 3 }); S.set('dup' + k, 3, { opacity: '1' }); });
  M.forEach((l, i) => {
    chip(S, 'm' + i, 1.8 + (i % 2) * 6, 4 + Math.floor(i / 2) * 3.6, 5.4, l, C.soft, { h: 3, cls: 'di-p' });
    S.move('m' + i, 2, ...T(i), C.ok);
    chip(S, 'd' + i, T(i)[0] + .7, T(i)[1] + 3.6, 4, 'DB', hid(), { h: 1.6, cls: 'di-xs' }); S.set('d' + i, 2, { opacity: '1' });
  });
  off(S, ['mono', 'mt', 'sdb'], 2);
  text(S, 'x3', 30, 7.3, '×3', { cls: 'cz-t di-b', s: hid() }); S.set('x3', 3, { opacity: '1' });
  [['n1', 23.2, 3.5, 24.6, 3.5], ['n2', 23.1, 4.8, 24.7, 9.8], ['n3', 23.2, 11.5, 24.6, 11.5]].forEach(([k, a, b, c, d]) => { arrow(S, k, a, b, c, d, { s: hid(Object.assign({}, { background: 'var(--danger)', 'border-color': 'var(--danger)' })) }); S.set(k, 4, { opacity: '1' }); });
  text(S, 'nt', 1, 18.4, ['네트워크 장애 · 분산 트랜잭션 · 운영 복잡도', 'network failures · distributed transactions · ops overhead'], { cls: 'cz-t di-r', s: hid() }); S.set('nt', 4, { opacity: '1' });
  S.cap(1, '모놀리스: 한 번에 빌드·배포 · 처음엔 가장 빠르고 단순해요', 'Monolith: one build, one deploy · simplest way to start')
    .cap(2, '마이크로서비스: 기능별로 쪼개 각자 DB와 배포를 가져요', 'Microservices: split by capability, each with its own DB and deploys')
    .cap(3, '바쁜 서비스만 따로 늘릴 수 있어요', 'Scale only the busy service')
    .cap(4, '대신 서비스 간 호출이 모두 네트워크를 타요', 'But every call now crosses the network')
    .cap(5, '팀과 규모가 커질 때 쪼개세요 · 시작은 모듈러 모놀리스로', 'Split when teams and scale demand it · start as a modular monolith');
  return S;
}
function sGateway() {
  const S = scene({ id: 'di-gateway', steps: 6, per: 1.25 });
  chip(S, 'cw', 1, 3.6, 6, ['웹', 'Web'], {}, { h: 2.4, cls: 'di-p' }); chip(S, 'cm', 1, 13.4, 6, ['모바일 앱', 'Mobile app'], {}, { h: 2.4, cls: 'di-p' });
  box(S, 'gw', 9.4, 1.2, 9, 18.2, '', {}); text(S, 'gt', 10, 1.5, ['API 게이트웨이', 'API gateway'], { cls: 'cz-t di-b' });
  const FN = [['TLS 종료', 'TLS termination'], ['인증 (JWT)', 'Auth (JWT)'], ['레이트 리밋', 'Rate limiting'], ['라우팅', 'Routing'], ['응답 합치기', 'Aggregation'], ['로깅·추적', 'Logging · tracing']];
  FN.forEach((l, i) => { chip(S, 'f' + i, 10, 3.6 + i * 2.6, 7.8, l, {}, { h: 2.2, cls: 'di-p' }); S.set('f' + i, i + 1, C.ok); });
  const SV = [[['주문 서비스', 'Orders'], 2], [['회원 서비스', 'Users'], 8.4], [['상품 서비스', 'Products'], 14.8]];
  SV.forEach(([l, y], i) => chip(S, 's' + i, 22, y, 9, l, {}, { h: 3.6, cls: 'di-p' }));
  fly(S, 'q0', [7.2, 14.6], [10, 9.6], 1, '', C.cur);
  fly(S, 'q1', [18.4, 10.4], [22.2, 3.8], 4, '', C.cur); fly(S, 'q2', [18.4, 10.4], [22.2, 10.2], 4, '', C.cur);
  fly(S, 'q3', [22.2, 3.8], [18.4, 10.4], 5, '', C.ok); fly(S, 'q4', [22.2, 10.2], [18.4, 10.4], 5, '', C.ok);
  fly(S, 'q5', [10, 12], [7.2, 14.6], 6, '1', C.okf, { r: .8 });
  S.cap(1, '모든 외부 요청은 게이트웨이 한 곳으로', 'All outside traffic enters through one gateway')
    .cap(2, '인증을 한 번에 처리하고', 'Auth is handled once')
    .cap(3, '과도한 요청은 막고', 'abusive traffic is throttled')
    .cap(4, '경로에 맞는 서비스로 보내요', 'requests are routed to the right services')
    .cap(5, '여러 응답을 하나로 합쳐', 'responses are combined')
    .cap(6, '클라이언트는 한 번만 호출 · 서비스는 공통 기능을 신경 쓰지 않아요', 'Clients make one call · services skip the shared plumbing');
  return S;
}
function sAPI() {
  const S = scene({ id: 'di-api', steps: 5, per: 1.35 });
  const band = (k, y, title, cl, sv, req, res, st) => {
    text(S, k + 'h', 1, y, title, { cls: 'cz-t di-b' });
    chip(S, k + 'c', 1, y + 1.6, 6, cl, {}, { h: 2.6, cls: 'di-p' }); chip(S, k + 's', 24, y + 1.6, 7, sv, {}, { h: 2.6, cls: 'di-p' });
    arrow(S, k + 'q', 7.2, y + 2.3, 23.8, y + 2.3, { s: hid() }); arrow(S, k + 'r', 23.8, y + 3.7, 7.2, y + 3.7, { s: hid({ background: 'var(--ok)', 'border-color': 'var(--ok)' }) });
    S.label(k + 'qt', { cls: 'cz-t cz-tc cz-mono di-s', x: 7.2, y: y + .9, w: 16.6, s: hid() }, req);
    S.label(k + 'rt', { cls: 'cz-t cz-tc di-s', x: 7.2, y: y + 4.1, w: 16.6, s: hid() }, res);
    show(S, [k + 'q', k + 'r'], st);
  };
  band('a', .6, 'REST', ['앱', 'App'], ['서버', 'Server'], [[0, ''], [1, 'GET /users/1'], [2, 'GET /users/1/orders']], [[0, ''], [1, ['응답: 사용자 전체 필드', 'reply: every user field']], [2, ['응답: 주문 목록 (두 번째 왕복)', 'reply: orders (second round trip)']]], 1);
  band('b', 7.4, 'GraphQL', ['앱', 'App'], ['서버', 'Server'], [[0, ''], [3, 'query { user(id: 1) { name orders(last: 3) } }']], [[0, ''], [3, ['필요한 필드만, 한 번에', 'just the fields, in one trip']]], 3);
  band('c', 14.2, 'gRPC', ['주문 서비스', 'Orders svc'], ['결제 서비스', 'Payments svc'], [[0, ''], [4, 'Payments.Charge(order_id: 42)']], [[0, ''], [4, ['바이너리(protobuf) · HTTP/2 · 스트리밍', 'binary protobuf · HTTP/2 · streaming']]], 4);
  S.cap(1, 'REST: 자원(URL)마다 요청해요', 'REST: one request per resource URL')
    .cap(2, '화면 하나에 여러 번 왕복하기도 해요', 'One screen may need several round trips')
    .cap(3, 'GraphQL: 필요한 필드를 쿼리 하나로', 'GraphQL: exactly the fields you need, in one query')
    .cap(4, 'gRPC: 스키마로 정한 함수 호출 · 작고 빨라요', 'gRPC: schema-typed remote calls · small and fast')
    .cap(5, '공개 API는 REST · 다양한 화면은 GraphQL · 서비스 간엔 gRPC', 'Public APIs: REST · varied screens: GraphQL · service to service: gRPC');
  return S;
}
function sCQRS() {
  const S = scene({ id: 'di-cqrs', steps: 5, per: 1.35 });
  text(S, 'ch', 1, 1.4, ['명령 (쓰기)', 'Command (write)'], { cls: 'cz-t di-b' }); text(S, 'qh', 1, 18.6, ['조회 (읽기)', 'Query (read)'], { cls: 'cz-t di-b' });
  chip(S, 'cl', 1, 9, 5.6, ['클라이언트', 'Client'], {}, { h: 2.6, cls: 'di-p' });
  chip(S, 'wm', 10, 1.4, 9, ['쓰기 모델<br><span class="di-n">검증 · 규칙</span>', 'Write model<br><span class="di-n">validation · rules</span>'], {}, { h: 4, cls: 'di-p' });
  chip(S, 'wd', 22.4, 1.4, 8.6, ['쓰기 DB<br><span class="di-n">정규화</span>', 'Write DB<br><span class="di-n">normalized</span>'], {}, { h: 4, cls: 'di-p' });
  chip(S, 'qm', 10, 14.6, 9, ['조회 처리', 'Query handler'], {}, { h: 4, cls: 'di-p' });
  chip(S, 'rd', 22.4, 14.6, 8.6, ['읽기 DB<br><span class="di-n">화면용 뷰</span>', 'Read DB<br><span class="di-n">view-shaped</span>'], {}, { h: 4, cls: 'di-p' });
  arrow(S, 'a1', 6.8, 9.6, 9.8, 4.4, {}); arrow(S, 'a2', 19.2, 3.4, 22.2, 3.4, {}); arrow(S, 'a3', 6.8, 11.2, 9.8, 16, {}); arrow(S, 'a4', 19.2, 16.6, 22.2, 16.6, {});
  arrow(S, 'pj', 26.7, 5.6, 26.7, 14.4, { s: hid() }); pill(S, 'ev', 22.4, 9, ['OrderCreated 이벤트', 'OrderCreated event'], { w: 8.6, h: 2.2, s: hid(C.cmp) }); show(S, ['pj', 'ev'], 3);
  fly(S, 'd1', [6.6, 9.6], [10.4, 4.4], 1, '', C.cur); fly(S, 'd2', [19.2, 3.4], [22.6, 3.4], 2, '', C.cur); fly(S, 'd3', [26.7, 5.8], [26.7, 14.6], 3, '', C.cmp); fly(S, 'd4', [6.6, 11.2], [10.4, 16], 4, '', C.ok);
  S.set('wm', 1, C.soft).set('wm', 2, C.idle).set('wd', 2, C.ok).set('wd', 3, C.idle).set('rd', 3, C.ok).set('rd', 4, C.soft).set('qm', 4, C.soft);
  text(S, 'fast', 10, 12.6, ['JOIN 없이 바로 ✓', 'no joins needed ✓'], { cls: 'cz-t di-g', s: hid() }); S.set('fast', 4, { opacity: '1' });
  text(S, 'lag', 10, 7.6, ['읽기 쪽은 잠깐 늦을 수 있어요', 'the read side may lag briefly'], { cls: 'cz-t di-w', s: hid() }); S.set('lag', 5, { opacity: '1' });
  S.cap(1, '쓰기(명령)는 규칙을 검증하는 쓰기 모델로', 'Writes (commands) go through a model that enforces rules')
    .cap(2, '정규화된 쓰기 DB에 저장', 'and land in a normalized write store')
    .cap(3, '이벤트로 화면용 읽기 모델을 갱신', 'Events update a view-shaped read model')
    .cap(4, '읽기(조회)는 읽기 DB에서 바로', 'Reads (queries) hit the read store directly')
    .cap(5, '읽기·쓰기를 따로 최적화·확장 · 대신 잠깐 어긋날 수 있어요', 'Optimize and scale each side separately · at the cost of brief staleness');
  return S;
}
function sCB() {
  const S = scene({ id: 'di-cb', steps: 5, per: 1.4 });
  const N = { c: [5.4, 6], o: [16, 6], h: [10.7, 15] };
  link(S, 'co', N.c, N.o, 2.9, 2.9, {}); link(S, 'oh', N.o, N.h, 2.9, 2.9, {}); link(S, 'hc', N.h, N.c, 2.9, 2.9, {});
  node(S, 'nc', ...N.c, ['CLOSED<br>정상 통과', 'CLOSED<br>pass through'], { r: 2.7, cls: 'cz-n di-nsm' });
  node(S, 'no', ...N.o, ['OPEN<br>즉시 실패', 'OPEN<br>fail fast'], { r: 2.7, cls: 'cz-n di-nsm' });
  node(S, 'nh', ...N.h, ['HALF-OPEN<br>시험 1건', 'HALF-OPEN<br>one trial'], { r: 2.7, cls: 'cz-n di-nsm' });
  text(S, 'l1', 7.7, 2.2, ['실패 3번', '3 failures'], { w: 6, cls: 'cz-t cz-tc' }); text(S, 'l2', 15.6, 10.4, ['30초 후', 'after 30 s'], { cls: 'cz-t' }); text(S, 'l3', 1.4, 10.4, ['성공', 'success'], { cls: 'cz-t' });
  S.set('nc', 1, C.ok).set('nc', 2, C.cmp).set('nc', 3, C.idle).set('no', 3, C.badf).set('no', 4, C.idle).set('nh', 4, C.cmp).set('nh', 5, C.idle).set('nc', 5, C.ok);
  const RW = [[1, '#1 → 200 ✓', C.ok], [1, '#2 → 200 ✓', C.ok], [2, ['#3 → 타임아웃 ✗', '#3 → timeout ✗'], C.bad], [2, ['#4 → 타임아웃 ✗', '#4 → timeout ✗'], C.bad], [2, '#5 → 500 ✗', C.bad], [3, ['#6 → 즉시 실패 (대체 응답)', '#6 → fail fast (fallback)'], C.cmp]];
  RW.forEach(([st, l, sty], i) => { chip(S, 'r' + i, 21, 1.2 + i * 2.6, 10, l, hid(sty), { h: 2.2, cls: 'di-xs2' }); S.set('r' + i, st, { opacity: '1' }); });
  S.label('r6', { cls: 'cz-c di-m di-xs2', x: 21, y: 1.2 + 6 * 2.6, w: 10, h: 2.2 }, [[0, ''], [4, ['#7 → 시험 요청…', '#7 → trial…']], [5, ['#7 → 200 ✓ 복구', '#7 → 200 ✓ recovered']]]);
  Object.assign(S.get('r6~0').s, { opacity: '0' }); Object.assign(S.get('r6~1').s, C.soft); Object.assign(S.get('r6~2').s, C.ok);
  S.label('fc', { cls: 'cz-t di-l', x: 1, y: 18.8, w: 14 }, [[0, ['실패 0/3', 'failures 0/3']], [2, ['실패 3/3 → 차단', 'failures 3/3 → trip']], [5, ['실패 0/3', 'failures 0/3']]]);
  S.cap(1, '평소엔 닫힘(CLOSED): 요청이 그대로 지나가요', 'CLOSED: calls pass straight through')
    .cap(2, '하위 서비스가 계속 실패하면', 'When the downstream keeps failing')
    .cap(3, '열림(OPEN): 기다리지 않고 바로 실패 · 대체 응답', 'OPEN: fail fast without waiting · serve a fallback')
    .cap(4, '잠시 뒤 반열림: 시험 요청 하나만 보내 봐요', 'After a pause, HALF-OPEN lets one trial through')
    .cap(5, '성공하면 다시 닫힘 · 장애가 연쇄로 번지는 걸 막아요', 'Success closes it again · failures don’t cascade');
  return S;
}
function sRetry() {
  const S = scene({ id: 'di-retry', steps: 6, per: 1.3 });
  edge(S, 'ax', 2, 6, 31, 6, { s: { background: 'var(--ink-3)' } });
  const T = [0, 1, 3, 7], X = t => 3 + t * 3.6;
  T.forEach((t, i) => { dot(S, 'at' + i, X(t), 6, i < 3 ? '✗' : '✓', { r: 1, s: hid(i < 3 ? C.badf : C.okf) }); S.set('at' + i, i + 1, { opacity: '1' }); text(S, 'tt' + i, X(t) - 1.5, 7.4, `t=${t}s`, { w: 3, cls: 'cz-t cz-tc cz-mono', s: hid() }); S.set('tt' + i, i + 1, { opacity: '1' }); });
  [[1, '+1s'], [2, '+2s'], [3, '+4s']].forEach(([i, l]) => { text(S, 'g' + i, (X(T[i - 1]) + X(T[i])) / 2 - 2, 3.4, l, { w: 4, cls: 'cz-t cz-tc cz-mono di-w', s: hid() }); S.set('g' + i, i + 1, { opacity: '1' }); });
  text(S, 'h1', 1, 10.4, ['지터 없음: 모두 같은 순간에', 'No jitter: all at once'], { cls: 'cz-t di-b', s: hid() });
  text(S, 'h2', 17, 10.4, ['지터 있음: 흩어져서', 'With jitter: spread out'], { cls: 'cz-t di-b', s: hid() });
  edge(S, 'x1', 1.4, 19, 15, 19, { s: hid({ background: 'var(--ink-3)' }) }); edge(S, 'x2', 17, 19, 31, 19, { s: hid({ background: 'var(--ink-3)' }) });
  show(S, ['h1', 'x1'], 5); show(S, ['h2', 'x2'], 6);
  let n = 0;
  [4, 8.4, 12.8].forEach(x => { for (let k = 0; k < 5; k++) { dot(S, 'sy' + n, x, 18.2 - k * 1.2, '', { r: .5, s: hid(C.badf) }); S.set('sy' + n++, 5, { opacity: '1' }); } });
  for (let i = 0; i < 15; i++) { const x = 18 + ((i * 37) % 100) / 100 * 12.4, y = 18.2 - ((i * 53) % 3) * 1.2; dot(S, 'jt' + i, x, y, '', { r: .5, s: hid(C.okf) }); S.set('jt' + i, 6, { opacity: '1' }); }
  S.cap(1, '요청 실패', 'A request fails').cap(2, '1초 뒤 재시도', 'Retry after 1 s').cap(3, '다음은 2초 뒤', 'then after 2 s')
    .cap(4, '4초 뒤 성공 · 간격을 두 배씩 (지수 백오프)', 'then 4 s: success · doubling gaps (exponential backoff)')
    .cap(5, '모두 같은 간격이면 재시도가 한꺼번에 몰려요', 'Identical delays make every client retry at once')
    .cap(6, '무작위 지터로 분산 · 최대 횟수와 상한도 꼭 두세요', 'Random jitter spreads them out · always cap attempts and delay');
  return S;
}
function sEstimate() {
  const S = scene({ id: 'di-estimate', steps: 6, per: 1.3 });
  const R = [[['일일 활성 사용자 (DAU)', 'Daily active users'], ['1,000만 명', '10 million']],
    [['1인당 하루 요청 10회', '10 requests per user per day'], ['1억 건 / 일', '100 M / day']],
    [['초당 요청 (QPS)', 'Requests per second'], ['1억 ÷ 86,400 ≈ 1,200', '100 M ÷ 86,400 ≈ 1,200']],
    [['피크 (평균의 약 3배)', 'Peak (≈ 3× average)'], ['≈ 3,500 QPS', '≈ 3,500 QPS']],
    [['하루 쓰기 100만 × 1KB', '1 M writes/day × 1 KB'], ['≈ 1 GB / 일', '≈ 1 GB / day']],
    [['5년 보관 + 복제 3벌', '5 years + 3 replicas'], ['≈ 1.8 TB × 3 ≈ 5.5 TB', '≈ 1.8 TB × 3 ≈ 5.5 TB']]];
  R.forEach(([l, v], i) => {
    const y = 1.2 + i * 3.25;
    chip(S, 'l' + i, 1, y, 13, l, hid(), { h: 2.6, cls: 'di-p' }); arrow(S, 'a' + i, 14.3, y + 1.3, 15.6, y + 1.3, { s: hid() });
    chip(S, 'v' + i, 15.8, y, 15.2, v, hid(i === 3 || i === 5 ? C.cmp : C.soft), { h: 2.6 });
    show(S, ['l' + i, 'a' + i, 'v' + i], i + 1);
  });
  S.cap(1, '대략적인 숫자로 규모부터 잡아요', 'Start with rough numbers for scale')
    .cap(3, '하루 ≈ 10만 초로 어림하면 암산이 쉬워요', 'Round a day to ~100k seconds for mental math')
    .cap(4, '평균이 아니라 피크에 맞춰 설계', 'Design for the peak, not the average')
    .cap(6, '정확한 값보다 자릿수 · 서버 몇 대, 디스크 몇 TB가 보이면 충분', 'Aim for the order of magnitude · enough to size servers and disks');
  return S;
}

window.UX = page([
  sec('di-scaling', '확장', 'Scaling', '확장과 부하 분산', 'Scaling and load',
    '사용자가 늘어도 느려지지 않게 서버와 데이터를 나누는 방법이에요.', 'Ways to split servers and data so growth doesn’t mean slowdowns.', [
    item('di-scale', '수직 vs 수평 확장', 'Scale up vs scale out', '수직 확장은 서버를 더 크게, 수평 확장은 같은 서버를 여러 대로 늘려요.', '수직은 간단하지만 한계와 단일 장애점이 있어요. 웹 서버는 수평으로, DB는 수직부터 시작해 읽기 복제·샤딩으로 넘어가는 경우가 많아요.', 'Scaling up buys a bigger machine; scaling out adds more of the same machine.', 'Up is simple but has a ceiling and a single point of failure. Web tiers usually scale out; databases often scale up first, then add replicas and shards.', sScale()),
    item('di-lb', '로드 밸런싱', 'Load balancing', '여러 서버 앞에서 요청을 나눠 주는 장치예요. 라운드 로빈, 최소 연결, 해시 같은 방식으로 고르고 죽은 서버는 빼요.', 'L4(TCP)와 L7(HTTP 경로·헤더 기반)이 있어요. Nginx, HAProxy, AWS ALB/NLB가 대표적이고, 헬스 체크 경로를 꼭 만들어 두세요.', 'A component in front of servers that spreads requests using round robin, least connections or hashing, and drops unhealthy servers.', 'Comes in L4 (TCP) and L7 (HTTP path/header) flavours, e.g. Nginx, HAProxy, AWS ALB/NLB; always expose a health-check endpoint.', sLB()),
    item('di-stateless', '무상태 서버', 'Stateless servers', '세션 같은 상태를 서버 메모리에 두지 않고 공유 저장소로 빼서, 어느 서버가 받아도 같은 결과를 내게 해요.', '스티키 세션은 임시방편이에요. 세션은 Redis나 토큰(JWT)으로, 업로드 파일은 S3 같은 오브젝트 스토리지로 옮기세요.', 'Keep state such as sessions out of server memory and in a shared store, so any server can handle any request.', 'Sticky sessions are a stopgap; move sessions to Redis or tokens (JWT) and uploads to object storage such as S3.', sStateless()),
    item('di-chash', '일관된 해싱', 'Consistent hashing', '서버와 키를 같은 해시 링 위에 놓고, 키는 시계 방향으로 처음 만나는 서버에 저장해요. 서버가 늘거나 줄어도 일부 키만 옮겨가요.', '분산 캐시(Memcached 클라이언트), DynamoDB·Cassandra 파티셔닝에 써요. 서버마다 가상 노드를 여러 개 두면 부하가 고르게 퍼져요.', 'Servers and keys share one hash ring; each key lives on the next server clockwise, so adding or removing a server moves only a few keys.', 'Used by distributed caches and by DynamoDB and Cassandra partitioning; virtual nodes per server even out the load.', sCHash()),
    item('di-stampede', '캐시 스탬피드', 'Cache stampede', '인기 있는 캐시 항목이 만료되는 순간 수많은 요청이 한꺼번에 DB로 몰려 장애를 일으키는 현상이에요.', '갱신 락(하나만 다시 계산), 만료 전 미리 갱신, TTL에 무작위 값 더하기로 막아요. 이전 값을 잠깐 내주는(stale-while-revalidate) 방식도 좋아요.', 'When a hot cache entry expires, a flood of requests hits the database at once and can take it down.', 'Prevent it with a rebuild lock, early refresh, randomized TTLs, or serving stale data while revalidating.', sStampede()),
    item('di-ratelimit', '레이트 리밋', 'Rate limiting', '일정 시간 동안 받을 수 있는 요청 수를 제한해요. 토큰 버킷은 토큰이 일정 속도로 차고, 요청마다 하나씩 써요.', '로그인 시도, 공개 API, 비싼 작업을 보호해요. 사용자·IP·API 키별로 걸고, 초과하면 429와 Retry-After 헤더를 돌려줘요.', 'Caps how many requests are accepted per time window; in a token bucket, tokens refill at a steady rate and each request spends one.', 'Protects logins, public APIs and costly endpoints; limit per user, IP or API key and answer 429 with a Retry-After header.', sRate())
  ]),
  sec('di-messaging', '메시징', 'Messaging', '비동기와 메시징', 'Async and messaging',
    '서비스들이 서로 기다리지 않고 메시지와 이벤트로 일하는 방식이에요.', 'How services work through messages and events instead of waiting on each other.', [
    item('di-mq', '메시지 큐', 'Message queues', '생산자가 메시지를 큐에 넣으면 소비자(워커)가 자기 속도로 꺼내 처리해요. 둘은 서로를 기다리지 않아요.', '이메일 발송, 이미지 변환, 결제 후처리처럼 오래 걸리는 일을 뒤로 빼요. RabbitMQ, SQS가 대표적이고 실패 메시지는 DLQ로 보내요.', 'Producers drop messages on a queue and consumers (workers) take them at their own pace; neither waits for the other.', 'Push slow work like emails, image processing and post-payment tasks to the background; RabbitMQ and SQS are common, with failed messages parked in a DLQ.', sMQ()),
    item('di-pubsub', 'Pub/Sub · 이벤트 스트리밍', 'Pub/sub and event streaming', '이벤트를 토픽에 발행하면 여러 구독자가 각자 받아요. Kafka는 이벤트를 로그로 보관하고 구독자마다 읽은 위치(오프셋)를 따로 관리해요.', '주문 이벤트 하나로 이메일·분석·재고가 각자 반응해요. 보관된 로그를 다시 읽어 재처리하거나 새 서비스를 붙일 수 있어요.', 'Publish an event to a topic and many subscribers each receive it; Kafka keeps events as a log and tracks each subscriber’s offset separately.', 'One order event can drive email, analytics and inventory independently, and the retained log can be replayed for reprocessing or new consumers.', sPubSub()),
    item('di-idem', '멱등성과 재시도', 'Idempotency and retries', '같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같도록 만드는 성질이에요. 요청마다 고유 키를 붙여 중복을 걸러요.', '결제·주문 API는 Idempotency-Key 헤더를 받으세요(Stripe 방식). 메시지 소비자도 같은 메시지가 두 번 올 수 있다고 가정하고 처리해요.', 'An operation is idempotent if doing it twice has the same effect as doing it once; a unique key per request lets the server drop duplicates.', 'Payment and order APIs should accept an Idempotency-Key header (as Stripe does); message consumers must assume duplicates.', sIdem()),
    item('di-saga', '사가 패턴', 'Saga pattern', '여러 서비스에 걸친 작업을 단계별 로컬 트랜잭션으로 나누고, 중간에 실패하면 앞 단계를 되돌리는 보상 작업을 실행해요.', '서비스마다 DB가 따로인 마이크로서비스에서 분산 트랜잭션 대신 써요. 보상 작업도 멱등하게 만들어야 해요.', 'A cross-service operation is split into local transactions; if one fails, compensating actions undo the earlier steps.', 'The usual replacement for distributed transactions when each microservice owns its database; compensations must be idempotent too.', sSaga()),
    item('di-es', '이벤트 소싱', 'Event sourcing', '현재 값만 저장하는 대신 일어난 모든 사건(이벤트)을 순서대로 저장하고, 상태는 이벤트를 재생해서 계산해요.', '금융 원장, 감사 기록이 중요한 도메인에 맞아요. 스키마 변경과 재생 비용이 커서 모든 곳에 쓰기보단 필요한 곳에만 써요.', 'Instead of storing only the current value, store every event in order and compute state by replaying them.', 'Fits ledgers and audit-heavy domains; schema evolution and replay cost make it a targeted tool rather than a default.', sES())
  ]),
  sec('di-consensus', '일관성', 'Consistency', '일관성과 합의', 'Consistency and consensus',
    '여러 대의 컴퓨터가 같은 데이터에 대해 의견을 맞추는 방법이에요.', 'How many machines agree on the same data.', [
    item('di-cap', 'CAP 정리', 'CAP theorem', '네트워크 분할(P)이 생기면 일관성(C)과 가용성(A) 중 하나를 포기해야 해요.', '분할은 피할 수 없으니 "장애 때 무엇을 택할까"의 문제예요. 은행 잔액은 CP, 좋아요 수나 피드는 AP가 자연스러워요. 평소의 지연까지 따지는 PACELC도 있어요.', 'During a network partition (P), a system must give up either consistency (C) or availability (A).', 'Partitions happen, so the real question is what to sacrifice when they do: balances lean CP, likes and feeds lean AP; PACELC adds the everyday latency trade-off.', sCAP()),
    item('di-consist', '강한 일관성 vs 최종 일관성', 'Strong vs eventual consistency', '강한 일관성은 쓰기 직후 누가 읽어도 새 값을 보장하고, 최종 일관성은 잠시 옛 값이 보일 수 있지만 결국 같아져요.', '복제 지연 때문에 "방금 바꿨는데 안 바뀌었어요" 버그가 생겨요. 내가 쓴 데이터는 리더에서 읽는 read-your-writes로 많이 해결해요.', 'Strong consistency guarantees every read after a write sees it; eventual consistency may briefly show old data but converges.', 'Replica lag causes “I just changed it but it didn’t change” bugs; read-your-writes (reading your own data from the leader) fixes most of them.', sConsist()),
    item('di-quorum', '쿼럼 (N · W · R)', 'Quorums (N · W · R)', '복제본 N개 중 W개에 쓰고 R개에서 읽을 때 W + R > N이면 읽는 집합과 쓰는 집합이 반드시 겹쳐 최신 값을 볼 수 있어요.', 'Cassandra, DynamoDB에서 일관성 수준을 이 값으로 조절해요. 흔한 설정은 N=3, W=2, R=2예요.', 'With N replicas, writing to W and reading from R guarantees an overlap, and so the latest value, when W + R > N.', 'Cassandra and DynamoDB expose consistency levels this way; N=3, W=2, R=2 is a common setup.', sQuorum()),
    item('di-raft', 'Raft 합의 알고리즘', 'Raft consensus', '노드들이 리더를 선출하고, 리더가 로그를 팔로워에게 복제해 과반이 저장하면 확정해요. 리더가 죽으면 새로 선거해요.', 'etcd(쿠버네티스), Consul, CockroachDB, Kafka KRaft가 Raft를 써요. 과반이 필요해서 노드는 3·5대처럼 홀수로 둬요.', 'Nodes elect a leader; the leader replicates its log to followers and commits an entry once a majority stores it, holding a new election if it dies.', 'Used by etcd (Kubernetes), Consul, CockroachDB and Kafka KRaft; clusters use odd sizes like 3 or 5 because a majority is required.', sRaft()),
    item('di-2pc', '2단계 커밋 (2PC)', 'Two-phase commit', '코디네이터가 모든 참여자에게 준비를 묻고(1단계), 모두 YES면 커밋, 하나라도 NO면 전부 롤백해요(2단계).', '하나의 DB 안이나 XA 트랜잭션에서 쓰여요. 코디네이터 장애 때 참여자가 잠긴 채 멈출 수 있어 마이크로서비스에선 사가를 선호해요.', 'A coordinator asks every participant to prepare (phase 1), then commits if all vote yes or rolls everyone back if any vote no (phase 2).', 'Used inside databases and XA transactions; a failed coordinator can leave participants blocked, so microservices prefer sagas.', s2PC()),
    item('di-lamport', '논리 시계 (램포트)', 'Logical clocks (Lamport)', '서버마다 시계가 어긋나므로, 이벤트마다 카운터를 올리고 메시지를 받으면 max(내 값, 받은 값) + 1로 맞춰 원인-결과 순서를 표현해요.', '분산 로그 정렬, 충돌 해결의 기초예요. 동시 발생까지 구분하려면 벡터 클록, 실제 시간과 섞으려면 HLC(하이브리드 논리 시계)를 써요.', 'Since machine clocks drift, each process bumps a counter per event and, on receiving a message, sets it to max(local, received) + 1, so causes get smaller numbers than effects.', 'The basis for ordering distributed logs and resolving conflicts; vector clocks detect concurrency and hybrid logical clocks mix in wall time.', sLamport())
  ]),
  sec('di-arch', '아키텍처', 'Architecture', '아키텍처와 장애 대응', 'Architecture and resilience',
    '서비스를 나누고 연결하고, 일부가 고장 나도 전체가 버티게 만드는 설계예요.', 'Designs for splitting and connecting services, and for surviving partial failures.', [
    item('di-micro', '모놀리스 vs 마이크로서비스', 'Monolith vs microservices', '모놀리스는 하나로 빌드·배포하고, 마이크로서비스는 기능별로 나눠 각자 DB와 배포 주기를 가져요.', '마이크로서비스는 팀이 독립적으로 움직일 때 효과가 있어요. 작은 팀이라면 경계를 잘 나눈 모듈러 모놀리스가 대부분 더 나아요.', 'A monolith is built and deployed as one unit; microservices split by capability, each with its own database and release cycle.', 'Microservices pay off when teams need to move independently; small teams are usually better served by a well-structured modular monolith.', sMicro()),
    item('di-gateway', 'API 게이트웨이', 'API gateway', '외부 요청이 들어오는 단일 입구예요. 인증, 레이트 리밋, 라우팅, 응답 합치기, 로깅 같은 공통 기능을 한곳에서 처리해요.', 'Kong, AWS API Gateway, Nginx가 대표적이에요. 화면별로 맞춘 게이트웨이(BFF)를 따로 두기도 해요. 비즈니스 로직은 넣지 마세요.', 'A single entry point for outside traffic that handles cross-cutting concerns: auth, rate limiting, routing, aggregation and logging.', 'Kong, AWS API Gateway and Nginx are common; some teams add a backend-for-frontend per client. Keep business logic out of it.', sGateway()),
    item('di-api', 'REST · GraphQL · gRPC', 'REST · GraphQL · gRPC', 'REST는 자원(URL)마다 요청하고, GraphQL은 필요한 필드를 쿼리 하나로, gRPC는 스키마로 정한 함수를 바이너리로 호출해요.', '공개 API는 REST가 무난하고, 화면이 다양한 앱은 GraphQL, 내부 서비스 간 고성능 통신은 gRPC가 잘 맞아요.', 'REST requests one resource URL at a time, GraphQL fetches exactly the needed fields in one query, and gRPC calls schema-defined functions over a binary protocol.', 'REST suits public APIs, GraphQL suits apps with many varied screens, and gRPC suits fast service-to-service calls.', sAPI()),
    item('di-cqrs', 'CQRS', 'CQRS', '쓰기(명령)와 읽기(조회)를 서로 다른 모델과 저장소로 나눠요. 쓰기 쪽 변경이 이벤트로 읽기 쪽 뷰를 갱신해요.', '읽기가 압도적으로 많거나 화면용 집계가 복잡할 때 유용해요. 읽기 모델이 잠깐 늦을 수 있다는 걸 화면에서 감안해야 해요.', 'Separates writes (commands) and reads (queries) into different models and stores, with write-side events updating read-side views.', 'Useful when reads dominate or screen-specific aggregates are complex; the UI must tolerate a briefly stale read model.', sCQRS()),
    item('di-cb', '서킷 브레이커', 'Circuit breaker', '하위 서비스가 계속 실패하면 회로를 열어 호출을 즉시 실패시키고, 잠시 뒤 시험 요청으로 회복을 확인해요.', '느린 서비스 하나가 스레드·커넥션을 다 잡아먹어 전체가 죽는 연쇄 장애를 막아요. Resilience4j, Envoy, 서비스 메시에 들어 있어요.', 'After repeated failures it opens the circuit and fails calls immediately, then probes with a trial request before closing again.', 'Prevents one slow dependency from exhausting threads and connections and taking everything down; built into Resilience4j, Envoy and service meshes.', sCB()),
    item('di-retry', '지수 백오프와 지터', 'Exponential backoff and jitter', '실패한 요청을 재시도할 때 간격을 1초, 2초, 4초처럼 두 배씩 늘리고, 무작위 값(지터)을 더해 재시도가 한꺼번에 몰리지 않게 해요.', '최대 재시도 횟수와 최대 대기 시간을 꼭 두세요. 멱등하지 않은 요청은 함부로 재시도하면 안 돼요. AWS SDK 등 대부분의 클라이언트에 내장돼 있어요.', 'Retry failed requests with doubling waits such as 1 s, 2 s, 4 s, plus random jitter so clients don’t retry in lockstep.', 'Always cap attempts and total wait, and never blindly retry non-idempotent requests; most SDKs, AWS included, build this in.', sRetry()),
    item('di-estimate', '용량 추정', 'Back-of-the-envelope estimation', '사용자 수에서 출발해 초당 요청, 피크, 저장 용량을 어림 계산해 필요한 규모를 잡아요.', '시스템 설계 면접과 실제 기획 모두에 써요. 하루 ≈ 10만 초, 피크 ≈ 평균의 2~3배처럼 외워 두면 빨라요.', 'Start from user counts and roughly derive requests per second, peaks and storage to size the system.', 'Used in system design interviews and real planning; shortcuts like “a day ≈ 100k seconds” and “peak ≈ 2–3× average” keep it quick.', sEstimate())
  ])
]);
window.UX[0].css += `
.di-m .in{font-family:var(--f-mono);font-size:.7em;font-weight:700}
.di-p .in{font-family:inherit;font-size:.72em;font-weight:700;line-height:1.25;text-align:center}
.di-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.di-l .in{font-size:.9em;color:var(--ink);font-weight:700}
.di-s .in{font-size:.62em;font-weight:600;color:var(--ink)}
.di-xs .in{font-size:.55em}
.di-xs2 .in{font-family:inherit;font-size:.62em}
.di-n{font-size:.8em;font-weight:600;opacity:.75}
.di-r .in{color:var(--danger);font-weight:800}
.di-g .in{color:var(--ok);font-weight:800}
.di-w .in{color:var(--warn);font-weight:800}
.di-x .in{color:var(--danger);font-weight:900;font-size:1.3em}
.di-big .in{font-size:1.2em;font-weight:900;color:var(--ink)}
.di-nsm .in{font-size:.6em}
.di-rf{z-index:3}
.di-rf .in{font-size:.6em;line-height:1.25;color:var(--ink);font-weight:700}`;
})();
