(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C, seq } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
const hide = (S, keys, st) => keys.forEach(k => S.set(k, st, { opacity: '0' }));
function fly(S, k, a, b, st, lab, sty, o = {}) {
  const r = o.r || .8;
  dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) });
  S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r);
  if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' });
  return S;
}
const chip = (S, k, x, y, w, t, st, o = {}) => cell(S, k, x, y, t, { w, h: o.h || 2, cls: 'cz-c wb-m' + (o.cls ? ' ' + o.cls : ''), s: st });

/* ---------- browser ---------- */
function sRender() {
  const S = scene({ id: 'wb-render', steps: 7, per: 1.1 });
  chip(S, 'html', 1, 2, 5, 'HTML', {}); chip(S, 'dom', 8.2, 2, 6, 'DOM', hid(C.soft)); arrow(S, 'a1', 6.2, 3, 8, 3, { s: hid() });
  chip(S, 'css', 1, 6, 5, 'CSS', {}); chip(S, 'cssom', 8.2, 6, 6, 'CSSOM', hid(C.soft)); arrow(S, 'a2', 6.2, 7, 8, 7, { s: hid() });
  chip(S, 'rt', 16.2, 4, 6.4, ['렌더 트리', 'Render tree'], hid(C.soft)); arrow(S, 'a3', 14.4, 3.4, 16, 4.6, { s: hid() }); arrow(S, 'a4', 14.4, 6.6, 16, 5.4, { s: hid() });
  const st2 = [['lay', 1, ['레이아웃', 'Layout'], 4], ['pnt', 8.6, ['페인트', 'Paint'], 5], ['cmp', 16.2, ['합성', 'Composite'], 6]];
  st2.forEach(([k, x, l, s], i) => { chip(S, k, x, 12, 6.4, l, hid(C.soft)); S.set(k, s, { opacity: '1' }); if (i) { arrow(S, 'b' + i, x - 1.2, 13, x - .2, 13, { s: hid() }); S.set('b' + i, s, { opacity: '1' }); } });
  arrow(S, 'a5', 19, 6.2, 5, 11.8, { s: hid() });
  show(S, ['dom', 'a1'], 1); show(S, ['cssom', 'a2'], 2); show(S, ['rt', 'a3', 'a4'], 3); show(S, ['a5'], 4);
  S.el('pv', { x: 24.4, y: 1.6, w: 6.8, h: 17.4, css: 'border-radius:.6em;border:.14em solid var(--line)', s: { background: 'var(--ui)' } });
  const W = [['w0', 25.2, 2.6, 5.2, 1.6, 'var(--accent)'], ['w1', 25.2, 5, 5.2, 5, 'var(--warn-soft)'], ['w2', 25.2, 10.8, 2.4, 3, 'var(--accent-soft)'], ['w3', 28, 10.8, 2.4, 3, 'var(--accent-soft)'], ['w4', 25.2, 14.6, 5.2, 3.4, 'var(--line)']];
  W.forEach(([k, x, y, w, h, bg]) => { S.el(k, { x, y, w, h, css: 'border-radius:.3em', s: { opacity: '0', background: 'transparent', 'border-color': 'var(--ink-3)', 'box-shadow': 'none' } }); S.set(k, 4, { opacity: '1' }); S.set(k, 5, { background: bg }); });
  W.forEach(([k]) => S.get(k).css += ';border:.1em dashed var(--ink-3)');
  S.set('w1', 6, { transform: 'translate(-.4em,-.4em)', 'box-shadow': '0 .4em 1em -.2em rgba(0,0,0,.35)' });
  S.cap(1, 'HTML을 읽어 DOM 트리를 만들고', 'HTML is parsed into the DOM tree').cap(2, 'CSS로 CSSOM을 만들어요', 'CSS becomes the CSSOM').cap(3, '둘을 합쳐 화면에 보일 것만 모아요', 'Combined into the render tree of visible nodes')
    .cap(4, '레이아웃: 위치와 크기를 계산', 'Layout computes positions and sizes').cap(5, '페인트: 색·글자를 픽셀로 칠하고', 'Paint fills in pixels').cap(6, '합성: 레이어를 GPU로 겹쳐 완성', 'Composite stacks layers on the GPU')
    .cap(7, 'JS로 DOM·스타일을 바꾸면 이 과정이 다시 돌아요', 'Changing DOM or styles reruns parts of this');
  return S;
}
function sReflow() {
  const S = scene({ id: 'wb-reflow', steps: 4, per: 1.5 });
  const ST = ['JS', 'Style', 'Layout', 'Paint', 'Composite'];
  const R = [['width: 300px', [1, 1, 1, 1, 1], C.bad], ['color: red', [1, 1, 0, 1, 1], C.cmp], ['transform: translateX()', [1, 1, 0, 0, 1], C.ok]];
  ST.forEach((t, j) => text(S, 'h' + j, 9.6 + j * 4.5, 1.6, t, { w: 4.2, cls: 'cz-t cz-tc' }));
  R.forEach(([p, on, st], i) => {
    const y = 3.6 + i * 5;
    chip(S, 'p' + i, .8, y, 8.4, p, hid(), { cls: 'wb-code' }); S.set('p' + i, i + 1, { opacity: '1' });
    on.forEach((v, j) => { chip(S, `c${i}_${j}`, 9.6 + j * 4.5, y, 4.2, '', { opacity: '.25' }); if (v) S.set(`c${i}_${j}`, i + 1, Object.assign({ opacity: '1' }, st)); else S.set(`c${i}_${j}`, i + 1, { opacity: '.25' }); });
  });
  S.cap(1, '크기·위치를 바꾸면 레이아웃부터 다시 (리플로우) · 가장 비싸요', 'Size or position changes redo layout (reflow): the most expensive').cap(2, '색만 바꾸면 다시 칠하기만 (리페인트)', 'Colour changes only repaint')
    .cap(3, 'transform·opacity는 합성만 · 애니메이션은 이걸로', 'transform and opacity only composite: animate these').cap(4, '읽기(offsetWidth)와 쓰기를 번갈아 하면 강제 리플로우가 반복돼요', 'Interleaving reads like offsetWidth with writes forces repeated reflows');
  return S;
}
function sLoop() {
  const S = scene({ id: 'wb-eventloop', steps: 7, per: 1.05 });
  const code = ["log('1')", "setTimeout(() => log('2'), 0)", "Promise.resolve().then(() => log('3'))", "log('4')"];
  code.forEach((t, i) => chip(S, 'l' + i, .8, 2 + i * 2.5, 13.6, t, {}, { cls: 'wb-code' }));
  box(S, 'stk', 15.4, 1.6, 7, 8.6, '', {}); text(S, 'stl', 15.8, 1.9, ['콜 스택', 'Call stack'], { cls: 'cz-t' });
  box(S, 'con', 24, 1.6, 7.2, 8.6, '', {}); text(S, 'cnl', 24.4, 1.9, ['콘솔', 'Console'], { cls: 'cz-t' });
  box(S, 'mq', 6, 12.4, 25.2, 2.8, '', {}); text(S, 'mql', .8, 13.3, ['마이크로태스크', 'Microtasks'], { cls: 'cz-t' });
  box(S, 'tq', 6, 16.4, 25.2, 2.8, '', {}); text(S, 'tql', .8, 17.3, ['태스크 큐', 'Task queue'], { cls: 'cz-t' });
  const sk = (k, t, st0, st1) => { chip(S, k, 16, 7.6, 5.8, t, hid(C.soft), { h: 1.8 }); S.set(k, st0, { opacity: '1' }).set(k, st1, { opacity: '0' }); };
  sk('s1', "log('1')", 1, 2); sk('s2', 'setTimeout', 2, 3); sk('s3', 'then', 3, 4); sk('s4', "log('4')", 4, 5); sk('s5', "log('3')", 5, 6); sk('s6', "log('2')", 6, 7);
  const out = (k, t, st, i) => { chip(S, k, 24.6, 3.4 + i * 1.6, 6, t, hid(C.ok), { h: 1.4 }); S.set(k, st, { opacity: '1' }); };
  out('o1', '1', 1, 0); out('o4', '4', 4, 1); out('o3', '3', 5, 2); out('o2', '2', 6, 3);
  chip(S, 't2', 6.6, 12.8, 6, '() => log(2)', hid(C.cmp), { h: 2 }); S.set('t2', 2, { opacity: '1' }).move('t2', 2, 6.6, 16.8).move('t2', 6, 16, 7.6).set('t2', 6, { opacity: '0' });
  chip(S, 'm3', 6.6, 12.8, 6, '() => log(3)', hid(C.soft), { h: 2 }); S.set('m3', 3, { opacity: '1' }).move('m3', 5, 16, 7.6).set('m3', 5, { opacity: '0' });
  [0, 1, 2, 3].forEach(i => S.set('l' + i, [1, 2, 3, 4][i], C.soft).set('l' + i, [2, 3, 4, 5][i], C.idle));
  S.cap(1, '동기 코드는 바로 실행', 'Synchronous code runs immediately').cap(2, 'setTimeout 콜백은 태스크 큐로', 'The setTimeout callback goes to the task queue').cap(3, 'Promise 콜백은 마이크로태스크 큐로', 'Promise callbacks go to the microtask queue')
    .cap(4, '스택이 빌 때까지 계속', 'Run until the stack is empty').cap(5, '그다음 마이크로태스크를 모두 먼저', 'then all microtasks first').cap(6, '마지막에 태스크 하나', 'then one task')
    .cap(7, '출력: 1 4 3 2 · 스택을 오래 잡으면 화면이 멈춰요', 'Output: 1 4 3 2 · a long task freezes the page');
  return S;
}
function sEvent() {
  const S = scene({ id: 'wb-event', steps: 7, per: .95 });
  S.el('win', { cls: 'cz-box', x: 2, y: 1.6, w: 19, h: 17.6 }); text(S, 'wl', 2.6, 2, 'window', { cls: 'cz-t cz-mono' });
  S.el('card', { cls: 'cz-box', x: 4.4, y: 4.6, w: 14.2, h: 12, css: 'z-index:1' }); text(S, 'cl', 5, 5, 'div.card', { cls: 'cz-t cz-mono', css: 'z-index:2' });
  S.el('btn', { cls: 'cz-box cz-bx', x: 7.6, y: 9, w: 7.8, h: 3.4, html: 'button', css: 'z-index:2' });
  const order = [['win', 1, C.soft], ['card', 2, C.soft], ['btn', 3, C.cur], ['btn', 4, C.ok], ['card', 5, C.ok], ['win', 6, C.ok]];
  order.forEach(([k, s, st], i) => { S.set(k, s, st); const nx = order[i + 1]; if (nx && nx[0] !== k) S.set(k, s + 1, C.idle); });
  S.set('btn', 5, C.idle).set('win', 7, C.idle);
  S.label('ph', { cls: 'cz-t wb-b', x: 22.4, y: 6, w: 9 }, [[0, ''], [1, ['① 캡처 ↓', '① capture ↓']], [3, ['② 타깃', '② target']], [4, ['③ 버블 ↑', '③ bubble ↑']], [7, '']]);
  text(S, 'n1', 22.4, 9.4, ['addEventListener는', 'listeners run in the'], { cls: 'cz-t' }); text(S, 'n2', 22.4, 10.8, ['기본이 버블 단계', 'bubble phase by default'], { cls: 'cz-t' });
  S.cap(1, '클릭 이벤트는 바깥에서 안으로 내려왔다가', 'A click travels down from the outside').cap(3, '클릭한 요소에 도착하고', 'reaches the clicked element').cap(4, '다시 바깥으로 올라가요', 'and bubbles back out')
    .cap(7, '부모 하나에 리스너를 다는 이벤트 위임 · stopPropagation으로 중단', 'Event delegation uses one parent listener · stopPropagation halts it');
  return S;
}
function sStorage() {
  const S = scene({ id: 'wb-storage', steps: 5, per: 1.3 });
  const H = [['', 6.4], [['용량', 'size'], 4.6], [['수명', 'lifetime'], 8.4], [['서버로 전송', 'sent to server'], 6.2], [['접근', 'access'], 5.6]];
  const R = [['Cookie', '4KB', ['만료일까지', 'until expiry'], ['매 요청 자동 ✓', 'every request ✓'], ['JS·서버', 'JS · server']], ['localStorage', '~5MB', ['지울 때까지', 'until cleared'], '✗', ['JS (동기)', 'JS (sync)']], ['sessionStorage', '~5MB', ['탭 닫으면 삭제', 'until tab closes'], '✗', ['JS (동기)', 'JS (sync)']], ['IndexedDB', ['수백 MB+', 'hundreds MB+'], ['지울 때까지', 'until cleared'], '✗', ['JS (비동기)', 'JS (async)']]];
  let x = .6; const xs = []; H.forEach(([t, w], j) => { xs.push(x); if (t) chip(S, 'h' + j, x, 1.6, w - .2, t, { background: 'var(--line)' }); x += w; });
  R.forEach((row, i) => { const y = 4.2 + i * 3.4; row.forEach((t, j) => { chip(S, `c${i}_${j}`, xs[j], y, H[j][1] - .2, t, hid(j ? {} : C.soft), { h: 2.8, cls: j ? 'wb-xs' : '' }); S.set(`c${i}_${j}`, i + 1, { opacity: '1' }); }); });
  S.set('c0_3', 1, C.cmp);
  S.cap(1, '쿠키: 작고 요청마다 서버로 가요 · 로그인 세션용', 'Cookies: tiny, sent with every request · for sessions').cap(2, 'localStorage: 문자열 키-값을 오래 보관', 'localStorage: long-lived string key–value')
    .cap(3, 'sessionStorage: 탭 하나 동안만', 'sessionStorage: one tab’s lifetime').cap(4, 'IndexedDB: 큰 구조화 데이터·오프라인 앱', 'IndexedDB: big structured data, offline apps')
    .cap(5, '토큰을 JS가 읽는 저장소에 두면 XSS에 털려요 · HttpOnly 쿠키 권장', 'Tokens readable by JS fall to XSS · prefer HttpOnly cookies');
  return S;
}

/* ---------- HTTP in practice ---------- */
function sStatus() {
  const S = scene({ id: 'wb-status', steps: 5, per: 1.3 });
  const G = [['2xx', ['성공', 'Success'], C.ok, [['200 OK', '200 OK'], ['201 생성됨', '201 Created'], ['204 본문 없음', '204 No Content']]], ['3xx', ['이동', 'Redirect'], C.soft, [['301 영구 이동', '301 Moved'], ['302 임시 이동', '302 Found'], ['304 변경 없음', '304 Not Modified']]],
    ['4xx', ['클라이언트 잘못', 'Client error'], C.cmp, [['400 잘못된 요청', '400 Bad Request'], ['401 인증 필요', '401 Unauthorized'], ['403 권한 없음', '403 Forbidden'], ['404 없음', '404 Not Found'], ['429 너무 많음', '429 Too Many']]], ['5xx', ['서버 잘못', 'Server error'], C.bad, [['500 서버 오류', '500 Internal'], ['502 게이트웨이', '502 Bad Gateway'], ['503 이용 불가', '503 Unavailable'], ['504 시간 초과', '504 Timeout']]]];
  G.forEach(([c, n, st, L], i) => { const x = .8 + i * 7.7; chip(S, 'g' + i, x, 1.6, 7.3, c, hid(st), { h: 2.4, cls: 'wb-big' }); text(S, 'gn' + i, x, 4.4, n, { w: 7.3, cls: 'cz-t cz-tc', s: hid() }); show(S, ['g' + i, 'gn' + i], i + 1); L.forEach((t, j) => { chip(S, `c${i}_${j}`, x, 6.2 + j * 2.4, 7.3, t, hid(), { h: 2, cls: 'wb-xs' }); S.set(`c${i}_${j}`, i + 1, { opacity: '1' }); }); });
  S.cap(1, '2xx: 잘 처리됐어요', '2xx: it worked').cap(2, '3xx: 다른 곳을 보세요 (또는 캐시 쓰세요)', '3xx: look elsewhere (or use your cache)').cap(3, '4xx: 요청한 쪽 문제', '4xx: the client’s fault')
    .cap(4, '5xx: 서버 쪽 문제 · 502/504는 프록시 뒤 서버가 죽었거나 느릴 때', '5xx: the server’s fault · 502/504 mean the upstream died or stalled').cap(5, '모든 에러를 200으로 보내지 마세요 · 모니터링이 눈이 멀어요', 'Don’t wrap errors in 200s: monitoring goes blind');
  return S;
}
function sMethods() {
  const S = scene({ id: 'wb-methods', steps: 6, per: 1.2 });
  const H = [[['메서드', 'Method'], 6], [['의미', 'Meaning'], 9], [['멱등', 'Idempotent'], 7], [['안전', 'Safe'], 7]];
  const R = [['GET', ['조회', 'read'], '✓', '✓'], ['POST', ['생성·처리', 'create'], '✗', '✗'], ['PUT', ['전체 교체', 'replace'], '✓', '✗'], ['PATCH', ['일부 수정', 'partial update'], '△', '✗'], ['DELETE', ['삭제', 'delete'], '✓', '✗']];
  let x = .8; const xs = []; H.forEach(([t, w], j) => { xs.push(x); chip(S, 'h' + j, x, 1.4, w - .2, t, { background: 'var(--line)' }); x += w; });
  R.forEach((row, i) => { const y = 4 + i * 2.7; row.forEach((t, j) => { chip(S, `c${i}_${j}`, xs[j], y, H[j][1] - .2, t, hid(j === 0 ? C.soft : j >= 2 ? (t === '✓' ? C.ok : t === '✗' ? C.bad : C.cmp) : {}), { h: 2.2 }); S.set(`c${i}_${j}`, i + 1, { opacity: '1' }); }); });
  text(S, 'n', .8, 17.8, ['멱등: 여러 번 보내도 결과가 같아요 · 안전: 서버 상태를 바꾸지 않아요', 'Idempotent: same result if repeated · Safe: changes nothing'], { cls: 'cz-t' });
  S.set('c1_0', 6, C.bad).set('c1_1', 6, C.bad);
  S.cap(1, 'GET은 읽기만 · 캐시·재시도 자유', 'GET only reads: cache and retry freely').cap(2, 'POST는 두 번 보내면 두 번 생겨요', 'POST twice creates twice').cap(3, 'PUT은 몇 번 보내도 같은 상태', 'PUT leaves the same state however often')
    .cap(6, '결제 같은 POST는 Idempotency-Key로 중복을 막아요', 'Guard POSTs like payments with an Idempotency-Key');
  return S;
}
function sCache() {
  return seq('wb-cache', [['브라우저', 'Browser'], ['서버', 'Server']], [
    { f: 0, t: 1, l: 'GET /app.js', cap: ['처음 요청하면', 'First request'] },
    { f: 1, t: 0, l: '200 · Cache-Control: max-age=60 · ETag "v1"', c: 'ok', cap: ['캐시 규칙과 버전 표시(ETag)를 함께 줘요', 'The response carries cache rules and an ETag'] },
    { f: 0, t: 0, l: ['60초 안: 디스크 캐시에서 (요청 없음)', 'within 60 s: from disk cache (no request)'], cap: ['유효 기간 안에는 네트워크를 안 써요', 'Within max-age, no network at all'] },
    { f: 0, t: 1, l: 'If-None-Match: "v1"', cap: ['만료 후엔 "바뀌었나요?"만 물어요', 'After expiry it just asks “changed?”'] },
    { f: 1, t: 0, l: ['304 Not Modified (본문 없음)', '304 Not Modified (no body)'], c: 'ok', cap: ['안 바뀌었으면 본문 없이 304', 'Unchanged: a bodyless 304'] },
    { f: 0, t: 0, l: ['app.3f2a.js + 1년 캐시', 'app.3f2a.js + 1-year cache'], cap: ['파일명에 해시를 넣으면 오래 캐시하고 배포 때 이름만 바꿔요', 'Hashed filenames allow long caching; deploys change the name'] }
  ], { aw: 8, per: 1.2, gap: 2.8 });
}
function sCDN() {
  const S = scene({ id: 'wb-cdn', steps: 6, per: 1.15 });
  const O = [16, 4], E = { tk: [27, 10, ['도쿄 엣지', 'Tokyo edge']], la: [5, 10, ['LA 엣지', 'LA edge']], fr: [16, 16, ['파리 엣지', 'Paris edge']] };
  box(S, 'org', O[0] - 4, O[1] - 1.6, 8, 3.2, ['원본 서버 (서울)', 'Origin (Seoul)'], { s: C.soft });
  Object.entries(E).forEach(([k, [x, y, l]]) => { edge(S, 'e' + k, O[0], O[1], x, y, { s: { opacity: '.5' } }); box(S, k, x - 3.6, y - 1.5, 7.2, 3, l, {}); });
  const U = { u1: [27, 15.6], u2: [29.6, 15.6], u3: [3, 15.6] };
  Object.entries(U).forEach(([k, [x, y]]) => dot(S, k, x, y, '', { r: .8, s: C.cur }));
  fly(S, 'q1', U.u1, [27, 11.6], 1, '', C.cur); S.set('tk', 1, C.bad);
  fly(S, 'q2', [25.6, 9], [17.4, 5], 2, '', C.warn); S.set('org', 2, C.cmp).set('org', 3, C.soft);
  fly(S, 'q3', [17.4, 5], [25.6, 9], 3, '', C.ok); S.set('tk', 3, C.ok);
  fly(S, 'q4', U.u2, [27.6, 11.6], 4, '', C.cur); S.set('tk', 4, C.okf);
  S.label('ms', { cls: 'cz-t wb-b', x: 21.4, y: 17.6, w: 10 }, [[0, ''], [1, ['미스 · 250ms', 'miss · 250 ms']], [4, ['히트 · 20ms', 'hit · 20 ms']]]);
  S.cap(1, '도쿄 사용자의 첫 요청은 가까운 엣지에 없어서', 'The first Tokyo request misses the nearby edge').cap(2, '서울 원본에서 가져와', 'so the edge fetches from the Seoul origin').cap(3, '엣지에 저장해요', 'and caches it')
    .cap(4, '근처 다음 사용자는 엣지에서 바로', 'The next nearby user is served from the edge').cap(6, '정적 파일·이미지·영상에 필수 · 원본 부하와 DDoS도 줄여요', 'Essential for static files and media · cuts origin load and absorbs DDoS');
  return S;
}
function sREST() {
  const S = scene({ id: 'wb-rest', steps: 7, per: 1.05 });
  const R = [['GET', '/users', ['목록', 'list'], C.ok], ['GET', '/users/7', ['한 명 조회', 'get one'], C.ok], ['POST', '/users', ['생성 → 201', 'create → 201'], C.soft], ['PATCH', '/users/7', ['일부 수정', 'update'], C.cmp], ['DELETE', '/users/7', ['삭제 → 204', 'delete → 204'], C.bad], ['GET', '/users/7/orders', ['7번의 주문들', 'user 7’s orders'], C.ok]];
  R.forEach(([m, p, d, st], i) => { const y = 1.6 + i * 2.75; chip(S, 'm' + i, 1, y, 5.6, m, hid(st), { h: 2.3 }); chip(S, 'p' + i, 7, y, 12, p, hid(), { h: 2.3, cls: 'wb-code' }); text(S, 'd' + i, 19.8, y + .6, d, { cls: 'cz-t', s: hid() }); show(S, ['m' + i, 'p' + i, 'd' + i], i + 1); });
  pill(S, 'bad', 1, 18.4, ['✗ POST /getUser · /deleteUser?id=7', '✗ POST /getUser · /deleteUser?id=7'], { w: 18, h: 1.9, cls: 'cz-pill cz-mono', s: hid(C.bad) }); S.set('bad', 7, { opacity: '1' });
  S.cap(1, 'URL은 자원(명사), 동작은 메서드(동사)', 'URLs name resources (nouns); methods are the verbs').cap(3, '만들기는 POST', 'Create with POST').cap(5, '지우기는 DELETE', 'Delete with DELETE').cap(6, '관계는 경로로 표현', 'Nest paths for relationships')
    .cap(7, 'URL에 동사를 넣지 말고, 알맞은 상태 코드로 답하세요', 'Keep verbs out of URLs and answer with proper status codes');
  return S;
}
function sGQL() {
  const S = scene({ id: 'wb-graphql', steps: 5, per: 1.3 });
  text(S, 'l1', 1, 1.4, 'REST', { cls: 'cz-t wb-b' }); text(S, 'l2', 1, 12, 'GraphQL', { cls: 'cz-t wb-b' });
  const R = ['/users/7', '/users/7/posts', '/users/7/followers'];
  R.forEach((p, i) => { chip(S, 'r' + i, 1, 3 + i * 2.4, 10, 'GET ' + p, hid(), { h: 2, cls: 'wb-code' }); S.el('rb' + i, { x: 12, y: 3.4 + i * 2.4, w: 17, h: 1.2, css: 'border-radius:.3em;transform-origin:0 50%', s: { background: 'var(--warn)', transform: 'scaleX(0)' } }); S.el('ru' + i, { x: 12, y: 3.4 + i * 2.4, w: 4, h: 1.2, css: 'border-radius:.3em;z-index:2', s: { background: 'var(--ok)', opacity: '0' } }); S.set('r' + i, i + 1, { opacity: '1' }).set('rb' + i, i + 1, { transform: 'none' }).set('ru' + i, 4, { opacity: '1' }); });
  text(S, 'rn', 12, 10.2, ['요청 3번 · 필요한 건 초록 부분뿐 (오버페칭)', '3 requests · only the green part is needed'], { cls: 'cz-t', s: hid() }); S.set('rn', 4, { opacity: '1' });
  chip(S, 'q', 1, 13.6, 14, '{ user(id:7){ name posts{title} } }', hid(C.soft), { h: 4.4, cls: 'wb-code' }); S.set('q', 4, { opacity: '1' });
  S.el('qb', { x: 16, y: 15.2, w: 6, h: 1.2, css: 'border-radius:.3em;transform-origin:0 50%', s: { background: 'var(--ok)', transform: 'scaleX(0)' } }); S.set('qb', 5, { transform: 'none' });
  text(S, 'qn', 16, 17, ['요청 1번 · 딱 필요한 만큼', '1 request · exactly what’s needed'], { cls: 'cz-t', s: hid() }); S.set('qn', 5, { opacity: '1' });
  S.cap(1, 'REST로 화면 하나를 그리려면', 'To draw one screen with REST').cap(3, '여러 번 요청해야 하고', 'you make several calls').cap(4, '안 쓰는 필드까지 받아요', 'and receive unused fields')
    .cap(5, 'GraphQL은 필요한 모양을 한 번에 요청해요 · 대신 캐싱·권한 설계가 더 어려워요', 'GraphQL asks for the exact shape in one go · but caching and auth get harder');
  return S;
}

/* ---------- front-end rendering ---------- */
function sCSR() {
  const S = scene({ id: 'wb-csr', steps: 6, per: 1.25 });
  const u = 3.9, x0 = 6.4;
  [['CSR', 3], ['SSR', 9.6], ['SSG', 16.2]].forEach(([l, y], i) => text(S, 'l' + i, .8, y + .7, l, { cls: 'cz-t wb-b' }));
  const blank = { background: 'transparent', 'border-style': 'dashed' };
  gantt(S, 'a', [[['빈 HTML', 'empty HTML'], 0, 1, blank, 1], [['JS 다운로드', 'JS download'], 1, 3.2, C.cmp, 1], [['렌더', 'render'], 3.2, 4.2, C.ok, 2]], x0, 3, u, 2.4);
  gantt(S, 'b', [[['서버 렌더', 'server render'], 0, 1.4, C.soft, 3], [['보임', 'visible'], 1.4, 2.2, C.ok, 3], [['하이드레이션', 'hydrate'], 2.2, 4.2, C.cmp, 4]], x0, 9.6, u, 2.4);
  gantt(S, 'c', [[['CDN', 'CDN'], 0, .5, C.soft, 5], [['보임', 'visible'], .5, 1.2, C.ok, 5], [['하이드레이션', 'hydrate'], 1.2, 3.2, C.cmp, 5]], x0, 16.2, u, 2.4);
  const mark = (k, t, y, st) => { S.el(k, { x: x0 + t * u - .08, y: y - .6, w: .16, h: 3.6, css: 'background:var(--ok)', s: hid() }); S.set(k, st, { opacity: '1' }); };
  mark('ma', 3.2, 3, 2); mark('mb', 1.4, 9.6, 3); mark('mc', .5, 16.2, 5);
  S.cap(1, 'CSR: 빈 HTML을 받고 JS가 다 그려요', 'CSR: an empty page that JavaScript fills in').cap(2, '첫 화면이 늦고 검색엔진에 불리', 'Slow first paint and weaker SEO')
    .cap(3, 'SSR: 서버가 HTML을 완성해서 줘요 · 바로 보여요', 'SSR: the server sends finished HTML · visible at once').cap(4, 'JS가 붙어야 클릭이 돼요', 'Clicks work after JS hydrates')
    .cap(5, 'SSG: 빌드 때 미리 만든 HTML을 CDN에서 · 가장 빨라요', 'SSG: HTML prebuilt at build time, served from a CDN · fastest').cap(6, 'Next.js·Nuxt는 페이지마다 섞어 써요 (ISR 등)', 'Next.js and Nuxt mix them per page (ISR and more)');
  return S;
}
function sHydr() {
  const S = scene({ id: 'wb-hydration', steps: 6, per: 1.15 });
  S.el('pg', { cls: 'cz-box', x: 2, y: 2, w: 16, h: 16 });
  text(S, 'ti', 3, 3, ['상품 페이지', 'Product page'], { cls: 'cz-t wb-b' });
  S.el('img', { x: 3, y: 5, w: 14, h: 5.6, css: 'border-radius:.4em', s: { background: 'var(--accent-soft)' } });
  S.label('btn', { cls: 'cz-pill', x: 3, y: 12, w: 9, h: 2.4, s: { background: 'var(--line)', color: 'var(--ink-2)' } }, [[0, ['담기 (0)', 'Add (0)']], [5, ['담기 (1)', 'Add (1)']]]);
  [1].forEach(i => Object.assign(S.get('btn~' + i).s, { background: 'var(--accent)', color: '#fff' }));
  S.el('btnOn', { cls: 'cz-pill', x: 3, y: 12, w: 9, h: 2.4, html: ['담기 (0)', 'Add (0)'], s: { opacity: '0', background: 'var(--accent)', color: '#fff' } }); S.set('btnOn', 4, { opacity: '1' }).set('btnOn', 5, { opacity: '0' });
  dot(S, 'tap', 7.5, 13.2, '', { r: 1, s: hid({ background: 'rgba(0,0,0,.25)', 'border-color': 'transparent' }) }); S.set('tap', 2, { opacity: '1' }).set('tap', 3, { opacity: '0' }).set('tap', 5, { opacity: '1' }).set('tap', 6, { opacity: '0' });
  text(S, 'nr', 3, 15.4, ['반응 없음…', 'nothing happens…'], { cls: 'cz-t', s: hid() }); S.set('nr', 2, { opacity: '1' }).set('nr', 3, { opacity: '0' });
  fly(S, 'js', [27, 4], [18.6, 10], 3, 'JS', C.warn, { r: 1.3 });
  S.label('st', { cls: 'cz-t wb-b', x: 20, y: 13, w: 11 }, [[0, ['서버에서 온 HTML', 'HTML from server']], [3, ['JS 도착 · 이벤트 연결', 'JS arrives · wiring events']], [4, ['인터랙티브 ✓', 'interactive ✓']]]);
  S.cap(0, '서버 HTML이라 바로 보이지만', 'Server HTML shows immediately, but').cap(2, '아직 JS가 없어 눌러도 반응이 없어요', 'without JS, taps do nothing yet').cap(3, 'JS가 도착해 같은 화면에 이벤트를 연결 (하이드레이션)', 'JS arrives and attaches handlers to the same markup (hydration)')
    .cap(5, '이제 동작해요', 'Now it works').cap(6, '이 공백을 줄이려고 부분·점진적 하이드레이션, 서버 컴포넌트가 나왔어요', 'Partial hydration and server components shrink this gap');
  return S;
}
function sVDOM() {
  const S = scene({ id: 'wb-vdom', steps: 5, per: 1.3 });
  const tree = (p, x0, st) => { const N = { r: [x0 + 5, 3, 'ul'], a: [x0 + 1.6, 9, 'li: A'], b: [x0 + 5, 9, 'li: B'], c: [x0 + 8.4, 9, 'li: C'] }; Object.entries(N).forEach(([k, [x, y, l]]) => { if (k !== 'r') edge(S, p + 'e' + k, N.r[0], N.r[1] + 1, x, y - 1, { s: st.opacity === '0' ? { opacity: '0' } : {} }); chip(S, p + k, x - 1.6, y - 1, 3.2, l, st, { h: 2, cls: 'wb-xs' }); }); };
  text(S, 't1', 1, .8, ['이전 가상 DOM', 'Old virtual DOM'], { cls: 'cz-t' }); tree('o', 1, {});
  text(S, 't2', 13, .8, ['새 가상 DOM', 'New virtual DOM'], { cls: 'cz-t', s: hid() }); tree('n', 13, hid());
  ['nr', 'na', 'nb', 'nc', 'nea', 'neb', 'nec'].forEach(k => { if (S.has(k)) S.set(k, 1, { opacity: '1' }); }); S.set('t2', 1, { opacity: '1' });
  S.label('nbx', { cls: 'cz-c wb-m wb-xs', x: 16.4, y: 8, w: 3.2, h: 2, css: 'z-index:3' }, [[0, ''], [1, 'li: B*']]);
  Object.assign(S.get('nbx~0').s, { opacity: '0' }); Object.assign(S.get('nbx~1').s, C.cmp);
  S.set('nbx~1', 2, C.bad);
  box(S, 'real', 25, 2, 6, 8.6, '', {}); text(S, 'rl', 25.4, 2.3, ['실제 DOM', 'Real DOM'], { cls: 'cz-t' });
  ['A', 'B', 'C'].forEach((l, i) => chip(S, 'd' + i, 25.6, 4 + i * 2.1, 4.8, 'li ' + l, {}, { h: 1.7, cls: 'wb-xs' }));
  arrow(S, 'pt', 20, 9, 25.4, 6.9, { s: hid(AR.red) }); S.set('pt', 3, { opacity: '1' }).set('d1', 3, C.cmp).set('d1', 4, C.ok);
  text(S, 'n', 1, 14.2, ['바뀐 li B 하나만 실제 DOM에 반영', 'only li B is patched in the real DOM'], { cls: 'cz-t wb-b', s: hid() }); S.set('n', 4, { opacity: '1' });
  S.cap(1, '상태가 바뀌면 새 가상 DOM을 만들고', 'State changes produce a new virtual DOM').cap(2, '이전 것과 비교(diff)해서', 'which is diffed against the old one').cap(3, '달라진 곳만', 'and only the difference')
    .cap(4, '실제 DOM에 적용해요 (재조정)', 'is applied to the real DOM (reconciliation)').cap(5, '리스트엔 key를 꼭 · 없으면 엉뚱한 항목이 재사용돼요', 'Always give list items keys, or the wrong ones get reused');
  return S;
}
function sSPA() {
  const S = scene({ id: 'wb-spa', steps: 6, per: 1.15 });
  S.el('frame', { cls: 'cz-box', x: 4, y: 1.4, w: 24, h: 17.4 });
  S.el('urlb', { x: 5, y: 2.2, w: 22, h: 2, css: 'border-radius:1em;border:.12em solid var(--line)' });
  S.label('url', { cls: 'cz-t cz-mono', x: 6, y: 2.6, w: 20 }, [[0, 'shop.com/'], [1, 'shop.com/item/7'], [3, 'shop.com/'], [4, 'shop.com/item/7']]);
  S.el('hdr', { x: 5, y: 5, w: 22, h: 2.2, css: 'border-radius:.4em', s: { background: 'var(--accent)' } });
  S.label('body', { cls: 'cz-box cz-bx', x: 5, y: 8, w: 22, h: 10 }, [[0, ['홈 화면', 'Home']], [1, ['상품 7 화면', 'Item 7']], [3, ['홈 화면', 'Home']], [4, ['상품 7 화면', 'Item 7']]]);
  S.el('flash', { x: 4.1, y: 1.5, w: 23.8, h: 17.2, css: 'border-radius:.8em;z-index:5', s: { background: '#ffffff', opacity: '0' } });
  S.set('flash', 1, { opacity: '1' }).set('flash', 2, { opacity: '0' });
  S.set('body~3', 4, { opacity: '1' });
  S.set('hdr', 4, { background: 'var(--accent)' });
  S.label('md', { cls: 'cz-t wb-b', x: 4, y: 19.2, w: 24 }, [[0, ['MPA: 링크마다 페이지 전체를 새로 받아요', 'MPA: every link reloads the whole page']], [3, ['SPA: JS가 본문만 바꾸고 주소는 history API로', 'SPA: JS swaps the body; URL via history API']]]);
  S.cap(1, '전통적인 방식은 화면이 깜빡이며 전체를 다시 그려요', 'Classic navigation flashes and redraws everything').cap(4, 'SPA는 헤더는 그대로, 본문만 바뀌어요', 'An SPA keeps the header and swaps just the content')
    .cap(6, '빠른 전환 대신 첫 로딩이 무겁고 SEO·뒤로가기 처리를 신경 써야 해요', 'Fast transitions, but a heavier first load and SEO/back-button care');
  return S;
}
function sBundle() {
  const S = scene({ id: 'wb-bundle', steps: 5, per: 1.3 });
  const F = [['app.js', 2], ['cart.js', 4.6], ['utils.js', 7.2], ['lodash (전체)', 9.8], ['chart.js', 12.4]];
  F.forEach(([n, y], i) => chip(S, 'f' + i, 1, y, 8, i === 3 ? ['lodash (전체)', 'lodash (all)'] : n, {}, { h: 2, cls: 'wb-xs' }));
  box(S, 'bd', 12, 5.4, 6.4, 5.6, ['번들러', 'Bundler'], { s: C.soft }); text(S, 'bdn', 12, 11.4, 'Vite · webpack', { w: 6.4, cls: 'cz-t cz-tc' });
  F.forEach(([, y], i) => { arrow(S, 'a' + i, 9.2, y + 1, 11.8, 8.2, { s: hid() }); S.set('a' + i, 1, { opacity: '1' }); });
  chip(S, 'main', 21.6, 3, 9.4, 'main.js 120KB', hid(C.ok), { h: 2.6 }); chip(S, 'lazy', 21.6, 7, 9.4, ['chart.chunk.js (필요할 때)', 'chart.chunk.js (on demand)'], hid(C.cmp), { h: 2.6, cls: 'wb-xs' });
  S.set('main', 2, { opacity: '1' }).set('lazy', 3, { opacity: '1' });
  S.set('f3', 4, { opacity: '.35' }); text(S, 'ts', 1, 15.2, ['트리 셰이킹: lodash에서 쓰는 함수만 남겨요', 'tree shaking keeps only the lodash functions you use'], { cls: 'cz-t', s: hid() }); S.set('ts', 4, { opacity: '1' });
  S.label('sz', { cls: 'cz-t wb-b', x: 21.6, y: 11, w: 10 }, [[0, ''], [2, '480KB'], [4, '120KB → 80KB']]);
  S.cap(1, '수많은 모듈 파일을 묶어서', 'Many module files are bundled').cap(2, '브라우저가 받기 좋게 합치고 압축해요', 'into a few compressed files for the browser').cap(3, '코드 스플리팅: 당장 안 쓰는 건 나중에 따로', 'Code splitting defers what isn’t needed yet')
    .cap(4, '쓰지 않는 코드는 아예 빼요', 'Unused code is dropped entirely').cap(5, '번들 분석기로 큰 의존성을 찾아 줄이세요', 'Use a bundle analyzer to find heavy dependencies');
  return S;
}
function sLazy() {
  const S = scene({ id: 'wb-lazy', steps: 5, per: 1.2 });
  const n = 7;
  for (let i = 0; i < n; i++) S.el('im' + i, { x: 4, y: 2 + i * 2.6, w: 14, h: 2.2, css: 'border-radius:.3em;border:.12em dashed var(--ink-3)', s: { background: 'transparent' } });
  S.el('vp', { x: 3.3, y: 1.3, w: 15.4, h: 6.6, css: 'border:.22em solid var(--accent);border-radius:.6em;z-index:3' });
  text(S, 'vl', 19.4, 1.8, ['화면에 보이는 영역', 'viewport'], { cls: 'cz-t' });
  const loaded = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 4 };
  Object.entries(loaded).forEach(([i, st]) => S.set('im' + i, st, { background: ['var(--accent-soft)', 'var(--warn-soft)', 'color-mix(in srgb,var(--ok) 25%,var(--ui))'][i % 3] }));
  for (let s = 1; s <= 4; s++) S.move('vp', s, 3.3, 1.3 + s * 2.6 * .95);
  S.label('cnt', { cls: 'cz-t wb-b', x: 19.4, y: 10, w: 12 }, [[0, ['로드: 2 / 7', 'loaded: 2 / 7']], [2, ['로드: 3 / 7', 'loaded: 3 / 7']], [3, ['로드: 4 / 7', 'loaded: 4 / 7']], [4, ['로드: 7 / 7', 'loaded: 7 / 7']]]);
  chip(S, 'code', 19.4, 14, 11.8, '<img loading="lazy">'.replace(/</g, '&lt;'), {}, { h: 2.2, cls: 'wb-code' });
  S.cap(0, '처음엔 보이는 이미지만 받아요', 'Only visible images load at first').cap(1, '스크롤해서 가까워지면', 'As you scroll near them').cap(3, '그때 받아요', 'they load').cap(5, '첫 로딩이 가벼워져요 · 첫 화면 이미지는 지연 로딩하지 마세요', 'A lighter first load · never lazy-load the hero image');
  return S;
}
function sDebounce() {
  const S = scene({ id: 'wb-debounce', steps: 6, per: 1.1 });
  const x0 = 8, u = 1;
  [['ev', 3, ['입력 이벤트', 'events']], ['db', 9, ['디바운스', 'debounce']], ['th', 15, ['스로틀', 'throttle']]].forEach(([k, y, l]) => { text(S, k + 'l', .8, y + .2, l, { cls: 'cz-t wb-b' }); S.el(k + 'ax', { x: x0, y: y + 1, w: 22, h: .1, css: 'background:var(--line)' }); });
  const ev = [0, 1, 2, 3, 4, 5, 10, 11, 12];
  ev.forEach((t, i) => { S.el('e' + i, { x: x0 + t * u * 1.5, y: 2.6, w: .5, h: 1.6, css: 'border-radius:.2em', s: { background: 'var(--accent)', opacity: '0' } }); S.set('e' + i, t < 6 ? 1 + Math.floor(t / 3) : 3, { opacity: '1' }); });
  const fire = (k, t, y, st) => { dot(S, k, x0 + t * u * 1.5, y + 1, '', { r: .7, s: hid(C.ok) }); S.set(k, st, { opacity: '1' }); };
  fire('d1', 7.5, 9, 4); fire('d2', 14.5, 9, 5);
  fire('t1', 0, 15, 1); fire('t2', 3, 15, 2); fire('t3', 10, 15, 3); fire('t4', 13, 15, 3);
  text(S, 'dn', x0, 11.4, ['멈추고 일정 시간 뒤 한 번', 'once, after a pause'], { cls: 'cz-t', s: hid() }); S.set('dn', 4, { opacity: '1' });
  text(S, 'tn', x0, 17.4, ['일정 간격마다 최대 한 번', 'at most once per interval'], { cls: 'cz-t', s: hid() }); S.set('tn', 2, { opacity: '1' });
  S.cap(1, '키 입력·스크롤은 초당 수십 번 일어나요', 'Typing and scrolling fire dozens of events a second').cap(2, '스로틀: 정해진 간격마다 최대 한 번 실행', 'Throttle: run at most once per interval')
    .cap(4, '디바운스: 입력이 멈춘 뒤에 한 번만', 'Debounce: run once after input stops').cap(6, '검색 자동완성은 디바운스, 스크롤 위치 계산은 스로틀', 'Autocomplete uses debounce; scroll handlers use throttle');
  return S;
}

/* ---------- performance & accessibility ---------- */
function sCWV() {
  const S = scene({ id: 'wb-cwv', steps: 4, per: 1.5 });
  const M = [['LCP', ['가장 큰 콘텐츠 표시', 'largest content shown'], '≤ 2.5s', 2.1, ['히어로 이미지 최적화·프리로드', 'optimize & preload the hero']], ['INP', ['입력 후 반응', 'response to input'], '≤ 200ms', 1.4, ['긴 JS 작업 쪼개기', 'break up long JS tasks']], ['CLS', ['레이아웃 밀림', 'layout shift'], '≤ 0.1', 3.4, ['이미지 크기 지정·자리 확보', 'reserve space for media']]];
  M.forEach(([k, d, g, bad, fix], i) => {
    const x = .8 + i * 10.4;
    box(S, 'b' + i, x, 1.6, 9.8, 16.6, '', { s: hid() }); S.set('b' + i, i + 1, { opacity: '1' });
    text(S, 'k' + i, x + .6, 2.2, k, { cls: 'cz-t wb-big2', s: hid() }); text(S, 'd' + i, x + .6, 5.2, d, { cls: 'cz-t', s: hid() }); text(S, 'g' + i, x + .6, 6.8, ['좋음 ', 'good '].map(t => t + g), { cls: 'cz-t cz-mono', s: hid() });
    S.el('tr' + i, { x: x + .6, y: 9, w: 8.6, h: 1.2, css: 'border-radius:1em;background:linear-gradient(90deg,var(--ok) 0 40%,var(--warn) 40% 70%,var(--danger) 70%)', s: hid() });
    dot(S, 'p' + i, x + .6 + bad, 9.6, '', { r: .7, s: hid({ background: 'var(--ink)', 'border-color': 'var(--ui)' }) });
    text(S, 'f' + i, x + .6, 11.6, fix, { cls: 'cz-t', s: hid() });
    show(S, ['k' + i, 'd' + i, 'g' + i, 'tr' + i, 'p' + i, 'f' + i], i + 1);
  });
  S.cap(1, 'LCP: 주요 콘텐츠가 얼마나 빨리 보이나', 'LCP: how fast the main content appears').cap(2, 'INP: 클릭·입력에 얼마나 빨리 반응하나', 'INP: how quickly the page responds to input')
    .cap(3, 'CLS: 읽는 중에 화면이 얼마나 밀리나', 'CLS: how much the layout jumps around').cap(4, '구글 검색 순위에도 반영 · 실사용자 데이터(CrUX)로 측정', 'Used in Google ranking · measured on real users (CrUX)');
  return S;
}
function sA11y() {
  const S = scene({ id: 'wb-a11y', steps: 6, per: 1.1 });
  const E = [['a', 2, 2.4, 12, ['링크 &lt;a&gt;', 'link &lt;a&gt;']], ['in', 2, 6, 12, ['입력 &lt;input&gt;', 'input &lt;input&gt;']], ['dv', 2, 9.6, 12, ['&lt;div onclick&gt; 버튼', '&lt;div onclick&gt; button']], ['bt', 2, 13.2, 12, ['&lt;button&gt; 버튼', '&lt;button&gt; button']]];
  E.forEach(([k, x, y, w, l]) => chip(S, k, x, y, w, l, {}, { h: 2.6 }));
  const ring = { 'box-shadow': '0 0 0 .25em var(--accent)', 'border-color': 'var(--accent)' }, off = { 'box-shadow': 'none', 'border-color': 'var(--line)' };
  S.set('a', 1, ring).set('a', 2, off).set('in', 2, ring).set('in', 3, off).set('bt', 3, ring).set('bt', 4, off).set('dv', 3, C.bad);
  pill(S, 'tab', 16, 2.8, 'Tab ⇥', { w: 5, h: 2, cls: 'cz-pill cz-mono', s: hid(C.soft) }); S.set('tab', 1, { opacity: '1' }).set('tab', 4, { opacity: '0' });
  text(S, 'sk', 15, 10.2, ['키보드로는 건너뛰어요 ✗', 'skipped by the keyboard ✗'], { cls: 'cz-t', s: hid() }); S.set('sk', 3, { opacity: '1' });
  S.el('img', { x: 2, y: 16.8, w: 4, h: 2.6, css: 'border-radius:.3em', s: { background: 'var(--accent-soft)', opacity: '0' } }); S.set('img', 4, { opacity: '1' });
  S.label('sr', { cls: 'cz-t wb-b', x: 7, y: 17.3, w: 24 }, [[0, ''], [4, ['스크린 리더: "이미지" ✗', 'screen reader: “image” ✗']], [5, ['alt="빨간 운동화, 39,000원" ✓', 'alt="red sneakers, $39" ✓']]]);
  S.set('dv', 6, C.idle);
  S.cap(1, 'Tab 키로 이동하면', 'Moving with the Tab key').cap(3, 'div로 만든 버튼은 초점을 못 받아요', 'A div pretending to be a button never gets focus').cap(4, '대체 텍스트가 없으면', 'Without alt text')
    .cap(5, '그림의 의미를 전달할 수 없어요', 'the image means nothing to a screen reader').cap(6, '시맨틱 태그·alt·명도 대비·포커스 표시가 기본 · 법적 의무인 곳도 많아요', 'Semantic tags, alt text, contrast and focus rings · often a legal duty');
  return S;
}
function sSW() {
  const S = scene({ id: 'wb-sw', steps: 6, per: 1.15 });
  box(S, 'pg', 1, 8, 6.4, 3.6, ['웹 페이지', 'Page']);
  box(S, 'sw', 12.6, 8, 7, 3.6, 'Service Worker', { cls: 'cz-box cz-bx cz-mono', s: C.soft });
  box(S, 'net', 25, 2.8, 6.2, 3.6, ['네트워크', 'Network']); box(S, 'cc', 25, 13.2, 6.2, 3.6, ['캐시', 'Cache']);
  fly(S, 'r1', [7.6, 9.8], [12.4, 9.8], 1, '', C.cur);
  fly(S, 'r2', [19.8, 9], [24.8, 4.6], 2, '', C.cur); S.set('net', 2, C.ok).set('net', 3, C.idle);
  fly(S, 'r3', [19.8, 10.6], [24.8, 15], 3, '', C.ok); S.set('cc', 3, C.soft);
  S.set('net', 4, Object.assign({ opacity: '.35' }, C.bad)); text(S, 'off', 25, 1.2, ['오프라인 ✗', 'offline ✗'], { cls: 'cz-t', s: hid() }); S.set('off', 4, { opacity: '1' });
  fly(S, 'r4', [7.6, 9.8], [12.4, 9.8], 4, '', C.cur);
  fly(S, 'r5', [19.8, 10.6], [24.8, 15], 5, '', C.cur); S.set('cc', 5, C.ok);
  fly(S, 'r6', [12.4, 9.8], [7.6, 9.8], 6, '', C.ok); S.set('pg', 6, C.ok);
  S.cap(1, '요청이 서비스 워커를 거쳐요', 'Requests pass through the service worker').cap(2, '온라인이면 네트워크에서 받고', 'Online, it fetches from the network').cap(3, '캐시에도 저장', 'and stores a copy in the cache')
    .cap(4, '오프라인이 돼도', 'When offline').cap(5, '캐시에서 꺼내', 'it serves from the cache').cap(6, '페이지가 계속 열려요 · PWA, 푸시 알림의 기반', 'and the page still opens · the basis of PWAs and push');
  return S;
}

window.UX = page([
  sec('wb-browser', '브라우저', 'Browser', '브라우저 동작 원리', 'How browsers work',
    '코드가 화면이 되기까지 브라우저 안에서 일어나는 일이에요.', 'What happens inside the browser between code and pixels.', [
    item('wb-render', '렌더링 파이프라인', 'Rendering pipeline', 'HTML은 DOM, CSS는 CSSOM이 되고, 둘을 합친 렌더 트리로 레이아웃 → 페인트 → 합성을 거쳐 화면이 그려져요.', 'CSS는 렌더링을 막고(render-blocking), 동기 script는 파싱을 막아요. CSS는 위에, script는 defer로 두는 이유예요.', 'HTML becomes the DOM, CSS the CSSOM; together they form the render tree, which goes through layout, paint and composite.', 'CSS blocks rendering and synchronous scripts block parsing, which is why CSS goes first and scripts get defer.', sRender()),
    item('wb-reflow', '리플로우 vs 리페인트', 'Reflow vs repaint', '크기·위치를 바꾸면 레이아웃부터 다시 계산(리플로우)하고, 색만 바꾸면 다시 칠하기(리페인트)만 해요. transform·opacity는 합성만 해서 가장 싸요.', '애니메이션은 top/left 대신 transform을 쓰세요. 반복문에서 offsetHeight 읽기와 스타일 쓰기를 섞으면 매번 강제 리플로우가 일어나요.', 'Changing size or position recomputes layout (reflow); changing colour only repaints; transform and opacity only composite and are cheapest.', 'Animate with transform, not top/left. Mixing offsetHeight reads and style writes in a loop forces a reflow every time.', sReflow()),
    item('wb-eventloop', '이벤트 루프', 'Event loop', 'JS는 스레드 하나로 콜 스택을 실행하고, 스택이 비면 마이크로태스크(Promise)를 모두 처리한 뒤 태스크(setTimeout, 이벤트)를 하나씩 꺼내요.', '50ms 넘는 긴 작업은 화면을 멈추게 해요. 무거운 계산은 Web Worker로 보내거나 잘게 쪼개세요. 면접 단골 문제(출력 순서)도 이 규칙이에요.', 'JavaScript runs the call stack on one thread; when it empties, all microtasks (promises) run, then tasks (timers, events) one at a time.', 'Tasks over 50 ms freeze the page; move heavy work to a Web Worker or split it up. Interview “output order” puzzles follow these rules.', sLoop()),
    item('wb-event', '이벤트 전파', 'Event propagation', '이벤트는 바깥(window)에서 대상까지 내려가는 캡처 단계, 대상 단계, 다시 바깥으로 올라가는 버블 단계를 거쳐요.', '리스트 항목마다 리스너를 다는 대신 부모 하나에 달고 event.target으로 구분하는 이벤트 위임이 효율적이에요.', 'Events travel down from the window to the target (capture), hit the target, then bubble back up.', 'Event delegation, one listener on a parent using event.target, beats a listener on every list item.', sEvent()),
    item('wb-storage', '브라우저 저장소', 'Browser storage', '쿠키, localStorage, sessionStorage, IndexedDB는 용량·수명·서버 전송 여부가 달라요.', '로그인 토큰을 localStorage에 두면 XSS 한 번에 털려요. 민감한 값은 HttpOnly·Secure·SameSite 쿠키에 두세요.', 'Cookies, localStorage, sessionStorage and IndexedDB differ in size, lifetime and whether they are sent to the server.', 'A token in localStorage is one XSS away from theft. Keep sensitive values in HttpOnly, Secure, SameSite cookies.', sStorage())
  ]),
  sec('wb-http', 'HTTP 실무', 'HTTP', 'HTTP와 API 실무', 'HTTP and APIs in practice',
    '매일 쓰는 HTTP를 제대로 쓰는 법이에요.', 'Using the HTTP you touch every day properly.', [
    item('wb-status', '상태 코드', 'Status codes', '응답의 첫 숫자가 결과의 종류를 말해요. 2xx 성공, 3xx 이동, 4xx 클라이언트 잘못, 5xx 서버 잘못이에요.', '모니터링·재시도·캐시가 상태 코드로 동작해요. 429는 잠시 후 재시도, 5xx는 서버 알림을 보내는 식으로 처리하세요.', 'The first digit says what kind of result it is: 2xx success, 3xx redirect, 4xx client error, 5xx server error.', 'Monitoring, retries and caching all key off status codes: retry later on 429, alert on 5xx.', sStatus()),
    item('wb-methods', 'HTTP 메서드와 멱등성', 'Methods · Idempotency', 'GET은 조회, POST는 생성, PUT은 전체 교체, PATCH는 일부 수정, DELETE는 삭제예요. 같은 요청을 여러 번 보내도 결과가 같으면 멱등이에요.', '네트워크 오류 때 멱등한 요청은 안전하게 재시도할 수 있어요. 결제처럼 중요한 POST는 Idempotency-Key 헤더로 중복을 막아요.', 'GET reads, POST creates, PUT replaces, PATCH partly updates and DELETE removes. A request is idempotent if repeating it changes nothing further.', 'Idempotent requests can be retried safely after network errors. Protect critical POSTs like payments with an Idempotency-Key.', sMethods()),
    item('wb-cache', 'HTTP 캐시', 'HTTP caching', 'Cache-Control로 얼마나 캐시할지 정하고, 만료 후엔 ETag로 바뀌었는지만 물어 304로 본문 없이 응답받아요.', '빌드 파일명에 해시를 넣고 1년 캐시, HTML은 no-cache로 두는 게 정석이에요. 배포 후 "예전 화면이 보여요"의 원인 대부분이 캐시예요.', 'Cache-Control sets how long to cache; after expiry, an ETag check gets a bodyless 304 if nothing changed.', 'Hash build filenames and cache them for a year; serve HTML with no-cache. Most “I still see the old page” bugs are caching.', sCache()),
    item('wb-cdn', 'CDN', 'CDN · Content delivery network', '전 세계 엣지 서버에 콘텐츠를 복사해 두고, 사용자와 가까운 곳에서 응답해요.', '이미지·JS·영상은 기본으로 CDN에 두세요. 캐시 무효화(purge) 방법과 캐시 키(쿼리스트링·쿠키 포함 여부)를 확인하세요.', 'Copies content to edge servers worldwide and answers from the one nearest the user.', 'Serve images, JS and video from a CDN by default. Know how to purge and what goes into the cache key (query strings, cookies).', sCDN()),
    item('wb-rest', 'REST API 설계', 'REST API design', '자원은 URL(명사)로, 동작은 HTTP 메서드(동사)로 표현하고, 결과는 상태 코드로 알려요.', '복수형 명사, 일관된 에러 형식, 페이지네이션, 버전(/v1) 규칙을 팀에서 정해 두세요. OpenAPI로 문서를 자동화하면 좋아요.', 'Name resources with URLs (nouns), act on them with HTTP methods (verbs) and report results with status codes.', 'Agree on plural nouns, a consistent error format, pagination and versioning (/v1). Generate docs with OpenAPI.', sREST()),
    item('wb-graphql', 'GraphQL vs REST', 'GraphQL vs REST', 'GraphQL은 클라이언트가 필요한 데이터의 모양을 쿼리로 정해 한 번에 받아요. REST는 자원별 엔드포인트를 여러 번 호출해요.', '화면이 다양하고 데이터 관계가 복잡하면 GraphQL이 유리해요. 대신 HTTP 캐시가 어렵고 무거운 쿼리를 제한하는 장치가 필요해요.', 'With GraphQL the client describes the exact shape of data it needs and gets it in one request; REST calls several resource endpoints.', 'GraphQL shines with many screens and rich relations, but HTTP caching gets harder and you must limit expensive queries.', sGQL())
  ]),
  sec('wb-front', '프런트엔드', 'Front end', '프런트엔드 렌더링', 'Front-end rendering',
    '화면을 언제, 어디서 그릴지에 대한 선택이에요.', 'Choices about when and where pages are rendered.', [
    item('wb-csr', 'CSR · SSR · SSG', 'CSR · SSR · SSG', 'CSR은 브라우저의 JS가 화면을 그리고, SSR은 요청마다 서버가 HTML을 만들고, SSG는 빌드 때 미리 만들어 둬요.', '로그인 뒤 대시보드는 CSR, 검색 노출이 중요한 페이지는 SSR/SSG가 유리해요. Next.js·Nuxt·Astro는 페이지마다 고를 수 있어요.', 'CSR renders in the browser with JS, SSR renders HTML on the server per request, SSG prebuilds HTML at build time.', 'Dashboards behind login suit CSR; pages that need search traffic suit SSR or SSG. Next.js, Nuxt and Astro let you choose per page.', sCSR()),
    item('wb-hydration', '하이드레이션', 'Hydration', '서버에서 받은 정적 HTML에 JS가 이벤트와 상태를 연결해 상호작용 가능한 앱으로 만드는 과정이에요.', '서버와 클라이언트 렌더 결과가 다르면 하이드레이션 오류가 나요(날짜·랜덤 값 주의). JS가 크면 보이는데 안 눌리는 시간이 길어져요.', 'JavaScript attaches events and state to server-rendered HTML, turning it into an interactive app.', 'Mismatched server and client output causes hydration errors (watch dates and random values). Big bundles lengthen the “visible but dead” window.', sHydr()),
    item('wb-vdom', '가상 DOM과 재조정', 'Virtual DOM · Reconciliation', '상태가 바뀌면 새 가상 DOM을 만들어 이전 것과 비교하고, 달라진 부분만 실제 DOM에 반영해요.', '리스트에는 안정적인 key를 주세요(인덱스 key는 순서가 바뀌면 버그). Svelte·Solid처럼 가상 DOM 없이 컴파일하는 방식도 있어요.', 'Each state change builds a new virtual DOM, diffs it against the old one and patches only the differences into the real DOM.', 'Give list items stable keys (index keys break on reorder). Svelte and Solid skip the virtual DOM by compiling instead.', sVDOM()),
    item('wb-spa', 'SPA와 라우팅', 'SPA · Client-side routing', '페이지를 이동할 때 서버에서 새 HTML을 받지 않고, JS가 본문만 바꾸고 history API로 주소를 바꿔요.', '새로고침 시 404가 나지 않게 서버가 모든 경로에 index.html을 주도록 설정하세요. 스크롤 위치·포커스 복원도 직접 챙겨야 해요.', 'Navigation swaps content with JavaScript and updates the URL through the history API instead of loading new HTML.', 'Configure the server to return index.html for every route so refreshes don’t 404, and handle scroll and focus restoration yourself.', sSPA()),
    item('wb-bundle', '번들링·코드 스플리팅', 'Bundling · Code splitting', '여러 모듈을 몇 개 파일로 묶고, 당장 필요 없는 코드는 따로 떼어 나중에 받고, 쓰지 않는 코드는 빼요(트리 셰이킹).', '라우트별 동적 import()가 가장 쉬운 스플리팅이에요. 큰 라이브러리는 필요한 함수만 import하세요.', 'Combines many modules into a few files, defers code not needed yet and drops unused code (tree shaking).', 'Dynamic import() per route is the easiest split. Import only the functions you need from big libraries.', sBundle()),
    item('wb-lazy', '지연 로딩', 'Lazy loading', '화면에 보일 때가 가까워져서야 이미지·컴포넌트를 불러와 첫 로딩을 가볍게 해요.', 'img에 loading="lazy"만 붙여도 돼요. 단, 첫 화면의 큰 이미지(LCP)는 지연 로딩하면 오히려 느려져요.', 'Loads images and components only as they approach the viewport, making the first load lighter.', 'Adding loading="lazy" to img is enough, but lazy-loading the main above-the-fold image (LCP) makes things slower.', sLazy()),
    item('wb-debounce', '디바운스와 스로틀', 'Debounce · Throttle', '디바운스는 이벤트가 멈춘 뒤 한 번만, 스로틀은 정해진 간격마다 최대 한 번만 실행해요.', '검색어 자동완성 API 호출은 디바운스, 스크롤·리사이즈 처리는 스로틀이 맞아요. 서버 쪽 레이트 리밋과는 별개예요.', 'Debounce runs once after events stop; throttle runs at most once per interval.', 'Debounce search-suggestion API calls; throttle scroll and resize handlers. Server-side rate limiting is a separate concern.', sDebounce())
  ]),
  sec('wb-perf', '성능·접근성', 'Performance & a11y', '성능과 접근성', 'Performance and accessibility',
    '빠르고 누구나 쓸 수 있는 웹을 만드는 기준이에요.', 'Standards for a web that is fast and usable by everyone.', [
    item('wb-cwv', 'Core Web Vitals', 'Core Web Vitals', '구글이 정한 사용자 경험 지표로, LCP(로딩), INP(반응성), CLS(시각 안정성) 세 가지예요.', '랩 측정(Lighthouse)과 실사용자 측정(CrUX, RUM)이 다를 수 있어요. 실제 사용자 데이터를 기준으로 개선하세요.', 'Google’s user-experience metrics: LCP for loading, INP for responsiveness and CLS for visual stability.', 'Lab tools (Lighthouse) and field data (CrUX, RUM) can disagree; optimize against real-user data.', sCWV()),
    item('wb-a11y', '웹 접근성', 'Web accessibility', '시각·운동 장애가 있거나 키보드·스크린 리더를 쓰는 사람도 같은 정보와 기능을 쓸 수 있게 만드는 거예요.', 'div 대신 button·a 같은 시맨틱 태그, 이미지 alt, 4.5:1 명도 대비, 보이는 포커스 표시가 기본이에요. 공공·금융 서비스는 법적 의무예요.', 'Making the same information and functions usable by people with visual or motor impairments, keyboards or screen readers.', 'Use semantic tags (button, a) instead of divs, alt text, 4.5:1 contrast and visible focus. It is a legal requirement for many public and financial services.', sA11y()),
    item('wb-sw', '서비스 워커 · PWA', 'Service worker · PWA', '페이지와 네트워크 사이에서 요청을 가로채는 백그라운드 스크립트로, 캐시를 이용해 오프라인에서도 동작하게 해요.', '캐시 전략(캐시 우선, 네트워크 우선)을 자원마다 골라요. 업데이트가 안 되는 문제가 흔하니 버전 관리와 갱신 흐름을 꼭 설계하세요.', 'A background script that intercepts requests between the page and network, using a cache so the app works offline.', 'Pick a cache strategy (cache-first, network-first) per resource. Stale updates are a common trap, so design versioning and refresh flows.', sSW())
  ])
]);
window.UX[0].css += `
.wb-m .in{font-family:var(--f-mono);font-size:.64em;font-weight:600}
.wb-xs .in{font-size:.54em}
.wb-code{place-items:center start!important;padding-left:.6em}
.wb-code .in{font-family:var(--f-mono);font-size:.56em}
.wb-b .in{font-weight:800;color:var(--ink);font-size:.78em}
.wb-big .in{font-size:1.05em;font-weight:900}
.wb-big2 .in{font-size:1.6em;font-weight:900;color:var(--ink)}`;
})();
