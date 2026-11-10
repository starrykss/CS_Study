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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'wbx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono wbx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono wbx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c wbx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono wbx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c wbx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'wbx-s wbx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono wbx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono wbx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono wbx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono wbx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono wbx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'wbx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'wbx-xs', 5));


const CSSX = `
.wbx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.wbx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.wbx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.wbx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.wbx-r .in{color:var(--danger);font-weight:800}
.wbx-g .in{color:var(--ok);font-weight:800}
.wbx-a .in{color:var(--accent);font-weight:800}
.wbx-w .in{color:var(--warn);font-weight:800}
.wbx-c .in{font-size:.6em;font-weight:700}
.wbx-c2 .in{font-size:.5em;font-weight:700}
.wbx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.wbx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'wbx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= CSS ================= */
function sBox() {
  const S = scene({ id: 'wb-box', steps: 5, per: 1.6 });
  frame(S, 'mg', 1, 1, 14, 10, 'warn', 1, { dash: 1, w: .1, r: .2 }); T(S, 'mgl', 1.3, 1.1, 'margin', 'cz-mono wbx-tiny wbx-w', 1);
  rect(S, 'bd', 2.2, 2.2, 11.6, 7.6, 'ink-2', 70, 1, { r: .2 }); T(S, 'bdl', 2.4, 2.25, 'border', 'cz-mono wbx-tiny', 1, { css: 'color:var(--ui)' });
  rect(S, 'pd', 2.6, 2.7, 10.8, 6.7, 'accent', 22, 1, { r: .1 }); T(S, 'pdl', 2.9, 2.8, 'padding', 'cz-mono wbx-tiny wbx-a', 1);
  rect(S, 'ct', 4.4, 4.4, 7.2, 3.2, 'ok', 40, 1, { r: .1, html: 'content', cls: 'cz-c wbx-c2' });
  const bar = (k, y, parts, st, lbl, c) => { let x = 17; parts.forEach(([w, col, l], i) => { rect(S, `${k}${i}`, x, y, w - .04, 1.3, col, 40, st, { r: .05, html: l, cls: 'cz-c wbx-c2' }); x += w; }); T(S, k + 'l', 17, y - .9, lbl, 'cz-mono wbx-xs ' + c, st); };
  bar('cb', 2, [[.25, 'ink-2', ''], [1, 'accent', ''], [10, 'ok', '200'], [1, 'accent', ''], [.25, 'ink-2', '']], 2, ['content-box: width 200 → 실제 250px', 'content-box: width 200 → 250px wide'], 'wbx-r');
  bar('bb', 5, [[.25, 'ink-2', ''], [1, 'accent', ''], [7.5, 'ok', '150'], [1, 'accent', ''], [.25, 'ink-2', '']], 3, ['border-box: 테두리까지 200px', 'border-box: 200px including border'], 'wbx-g');
  T(S, 'bbc', 17, 6.7, '* { box-sizing: border-box; }', 'cz-mono wbx-xs wbx-g', 3);
  box2(S, 'ma', 17, 8.2, 10, 1.3, ['블록 A · margin-bottom 20px', 'block A · margin-bottom 20px'], 'line', 4, { pct: 40 }); box2(S, 'mb', 17, 11, 10, 1.3, ['블록 B · margin-top 30px', 'block B · margin-top 30px'], 'line', 4, { pct: 40 });
  seg(S, 'gp', [22, 9.55], [22, 10.95], 4, 'warn', .08); T(S, 'gpl', 22.4, 9.9, ['간격 30px (50 아님)', 'gap 30px (not 50)'], 'wbx-xs wbx-w', 4);
  stepT(S, 'k', 1, 12.8, [['모든 요소는 상자: 안쪽부터 content → padding → border → margin', 'every element is a box: content → padding → border → margin'], ['기본값 content-box: width는 내용만이라 padding·border가 더해져요', 'default content-box: width covers content only, so padding and border add on'], ['border-box: width에 padding·border까지 포함 → 계산이 쉬워요', 'border-box: width includes padding and border → easier math'], ['세로로 붙은 블록의 margin은 겹쳐서 큰 쪽만 남아요 (마진 상쇄)', 'vertical margins between blocks collapse to the larger one']], 'wbx-xs wbx-a');
  fin(S, 'z', 14.2, [['CSS 박스 모델: 크기와 간격의 기본 단위 · 개발자 도구의 박스 그림으로 바로 확인해요', 'the CSS box model is the basic unit of size and spacing · inspect it in DevTools', 'wbx-xs wbx-a'], ['요즘 CSS는 거의 다 border-box로 시작해요 · 간격은 margin보다 gap을 선호해요', 'modern CSS starts with border-box everywhere and prefers gap over margins']]);
  S.cap(1, '네 겹의 상자', 'Four nested layers').cap(2, 'content-box', 'content-box').cap(3, 'border-box', 'border-box').cap(4, '마진 상쇄', 'Margin collapsing').cap(5, 'CSS 박스 모델', 'The CSS box model');
  return S;
}
function sSpec() {
  const S = scene({ id: 'wb-specificity', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 15, ['p        { color: gray; }', '.note    { color: blue; }', '#intro   { color: green; }', ['<p id="intro" class="note">안녕</p>', '<p id="intro" class="note">Hello</p>']], [[3, 1], [2, 2]], { hoff: 3 });
  T(S, 'q', 1, 6.9, ['이 문단은 무슨 색일까?', 'what color is this paragraph?'], 'wbx-s wbx-a', 1);
  [['(0, 0, 1)', 'line'], ['(0, 1, 0)', 'accent'], ['(1, 0, 0)', 'ok']].forEach(([t, c], i) => { box2(S, 's' + i, 17, 1.1 + i * 1.3, 5, 1.1, t, c, 2, { pct: 35 }); });
  T(S, 'sl', 22.6, 1.2, ['(ID, 클래스, 태그) 개수', '(ID, class, tag) counts'], 'wbx-xs', 2); T(S, 'sw', 22.6, 3.8, ['← 가장 큼', '← highest'], 'wbx-xs wbx-g', 2);
  T(S, 'res', 17, 5.4, ['결과: 초록 ✓', 'result: green ✓'], 'wbx-s wbx-g', 2);
  [['!important', 'danger'], [['인라인 style', 'inline style'], 'warn'], ['#id', 'ok'], ['.class · :hover', 'accent'], [['태그 · ::before', 'tag · ::before'], 'line']].forEach(([t, c], i) => box2(S, 'o' + i, 1 + i * 6.1, 8.1, 5.9, 1.4, t, c, 3, { pct: 30 }));
  T(S, 'ot', 1, 9.8, ['왼쪽일수록 강해요 · 같으면 나중에 쓴 규칙이 이겨요', 'stronger to the left · on a tie, the later rule wins'], 'wbx-xs wbx-a', 3);
  T(S, 'k1', 1, 11, ['명시도 싸움을 피하려면: 클래스 위주(BEM), :where()로 0점 만들기, @layer로 순서 정하기', 'to avoid specificity wars: stick to classes (BEM), zero it with :where(), order with @layer'], 'wbx-xs', 4);
  T(S, 'k2', 1, 12, ['!important와 ID 선택자 남발은 나중에 덮어쓰기 어렵게 만들어요', 'overusing !important and ID selectors makes later overrides painful'], 'wbx-xs wbx-r', 4);
  fin(S, 'z', 13.4, [['캐스케이드: 중요도 → 출처 → 명시도 → 선언 순서로 이긴 규칙을 골라요', 'the cascade picks a winner by importance, origin, specificity, then source order', 'wbx-xs wbx-a'], ['명시도는 (ID 수, 클래스·속성·가상 클래스 수, 태그 수)를 앞에서부터 비교해요', 'specificity compares (IDs, classes/attributes/pseudo-classes, tags) from the left']]);
  S.cap(1, '세 규칙이 충돌', 'Three rules collide').cap(2, '명시도 계산', 'Compute specificity').cap(3, '강한 순서', 'Order of strength').cap(4, '명시도 관리 요령', 'Keeping specificity low').cap(5, '캐스케이드와 명시도', 'Cascade and specificity');
  return S;
}
function sFlex() {
  const S = scene({ id: 'wb-flex', steps: 5, per: 1.6 });
  frame(S, 'ct', 1, 1.6, 24, 6, 'ink-3', 0, { w: .1, r: .2 });
  ar(S, 'ma', [1, .9], [25, .9], 'accent', 1, { h: .08 }); T(S, 'mal', 25.4, .6, ['주축', 'main axis'], 'wbx-xs wbx-a', 1);
  ar(S, 'ca', [25.8, 1.6], [25.8, 7.6], 'warn', 1, { h: .08 }); T(S, 'cal', 26.3, 4.2, ['교차축', 'cross axis'], 'wbx-xs wbx-w', 1);
  const IT = [['A', 2], ['B', 3.4], ['C', 1.6]], X1 = [1.2, 4.8, 8.4], X2 = [1.2, 11.3, 21.4];
  IT.forEach(([l, h], i) => { box2(S, 'i' + l, X1[i], 1.8, 3.4, h, l, i === 1 ? 'ok' : 'accent', 0, { pct: 35 }); S.move('i' + l, 2, X2[i], 1.8); S.move('i' + l, 3, X2[i], 1.6 + (6 - h) / 2); });
  S.set('iB', 4, { opacity: '0' }); box2(S, 'iB2', 4.8, 2.9, 16.4, 3.4, ['B (flex: 1)', 'B (flex: 1)'], 'ok', 4, { pct: 35 });
  code(S, 'cd', 1, 8.6, 30, [['.box { display: flex; }              /* 한 줄로, 주축 → */', '.box { display: flex; }              /* one row, main axis → */'], ['  justify-content: space-between;    /* 주축 정렬 */', '  justify-content: space-between;    /* main-axis alignment */'], ['  align-items: center;               /* 교차축 정렬 */', '  align-items: center;               /* cross-axis alignment */'], ['.b { flex: 1; }                      /* 남는 공간을 차지 */', '.b { flex: 1; }                      /* take the free space */']], [[0, 1], [1, 2], [2, 3], [3, 4]], { hoff: 5 });
  fin(S, 'z', 14.6, [['Flexbox: 한 방향(행 또는 열)으로 늘어선 요소를 정렬하고 남는 공간을 나눠요', 'Flexbox lines items up in one direction (row or column) and shares out free space', 'wbx-xs wbx-a'], ['flex-direction: column이면 주축과 교차축이 바뀌어요 · 줄바꿈은 flex-wrap, 간격은 gap', 'flex-direction: column swaps the axes · flex-wrap wraps lines and gap sets spacing']]);
  S.cap(1, '한 줄로 늘어서기', 'Line up in a row').cap(2, '주축 정렬', 'Main-axis alignment').cap(3, '교차축 정렬', 'Cross-axis alignment').cap(4, '남는 공간 나누기', 'Share the free space').cap(5, 'Flexbox', 'Flexbox');
  return S;
}
function sGrid() {
  const S = scene({ id: 'wb-grid', steps: 5, per: 1.6 });
  frame(S, 'g', 1, 1.4, 18, 7, 'ink-3', 1, { w: .1, r: .1 });
  [5, 12].forEach((x, i) => seg(S, 'cv' + i, [x, 1.4], [x, 8.4], 1, 'ink-3', .06, { dash: 1 })); [2.8, 7].forEach((y, i) => seg(S, 'rh' + i, [1, y], [19, y], 1, 'ink-3', .06, { dash: 1 }));
  [['200px', 1, 4], ['1fr', 5, 7], ['1fr', 12, 7]].forEach(([l, x, w], i) => T(S, 'cw' + i, x, .5, l, 'cz-tc cz-mono wbx-xs wbx-a', 2, { w }));
  T(S, 'fr', 1, 8.9, ['1fr = 남은 공간을 나눈 한 몫 → 고정 200px를 빼고 반반', '1fr = one share of the leftover space → half each after the fixed 200px'], 'wbx-xs wbx-a', 2, { off: 3 });
  [['hd', 1, 1.4, 18, 1.4, 'header', 'accent'], ['sd', 1, 2.8, 4, 4.2, 'side', 'warn'], ['mn', 5, 2.8, 14, 4.2, 'main', 'ok'], ['ft', 1, 7, 18, 1.4, 'footer', 'accent']].forEach(([k, x, y, w, h, l, c]) => rect(S, k, x + .1, y + .1, w - .2, h - .2, c, 30, 3, { r: .15, html: l, cls: 'cz-c wbx-c2' }));
  T(S, 'ct', 21, 1.4, ['카드 목록은 폭에 따라 열 수가 바뀌어요', 'card lists reflow with the width'], 'wbx-xs wbx-a', 4);
  frame(S, 'cd', 21, 2.4, 10, 5.6, 'ink-3', 4, { w: .08, r: .2 }); for (let i = 0; i < 6; i++) box2(S, 'c' + i, 21.3 + (i % 3) * 3.2, 2.7 + Math.floor(i / 3) * 2.6, 3, 2.4, String(i + 1), 'accent', 4, { pct: 25 });
  code(S, 'cs', 1, 9.9, 30, ['grid-template-columns: 200px 1fr 1fr;', 'grid-template-areas: "head head head" "side main main" "foot foot foot";', 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));'], [[0, 2], [1, 3], [2, 4]], { st: 2, hoff: 5 });
  T(S, 'n1', 21, 8.3, ['Flex는 1차원, Grid는 2차원', 'Flex is 1D, Grid is 2D'], 'wbx-xs', 4);
  fin(S, 'z', 14.8, [['CSS Grid: 행과 열을 함께 정의해 2차원 레이아웃을 선언적으로 그려요', 'CSS Grid defines rows and columns together for declarative 2D layouts', 'wbx-xs wbx-a'], ['페이지 뼈대는 Grid, 그 안의 한 줄 정렬은 Flex를 쓰는 조합이 흔해요', 'a common combo: Grid for the page skeleton, Flex for alignment within rows']]);
  S.cap(1, '격자 선 긋기', 'Draw the grid lines').cap(2, 'fr 단위', 'The fr unit').cap(3, '영역 이름으로 배치', 'Place by area names').cap(4, '자동으로 채우기', 'Auto-fill').cap(5, 'CSS Grid', 'CSS Grid');
  return S;
}
function sResponsive() {
  const S = scene({ id: 'wb-responsive', steps: 5, per: 1.6 });
  code(S, 'vp', 1, .8, 30, ['<meta name="viewport" content="width=device-width, initial-scale=1">'], [], { st: 1 });
  T(S, 'vpn', 1, 3, ['이게 없으면 휴대폰이 980px 데스크톱 화면을 축소해서 보여줘요', 'without it, phones render a 980px desktop page shrunk down'], 'wbx-xs wbx-r', 1, { off: 2 });
  const dev = (k, x, w, h, cols, n, st, l) => { rect(S, k, x, 3.8, w, h, 'line', 30, st, { r: .5, css: 'border:.14em solid var(--ink-3)' }); T(S, k + 'l', x, 3.8 + h + .2, l, 'cz-tc wbx-tiny', st, { w }); const cw = (w - .6 - (cols - 1) * .3) / cols; for (let i = 0; i < n; i++) box2(S, `${k}c${i}`, x + .3 + (i % cols) * (cw + .3), 4.2 + Math.floor(i / cols) * 1.7, cw, 1.4, '', 'accent', st, { pct: 25 }); };
  dev('ph', 1, 5, 9, 1, 5, 2, ['휴대폰 · 1열', 'phone · 1 column']); dev('tb', 8, 9, 7.2, 2, 6, 3, ['태블릿 ≥ 768px · 2열', 'tablet ≥ 768px · 2 columns']); dev('dt', 19, 12, 5.6, 3, 6, 3, ['데스크톱 ≥ 1024px · 3열', 'desktop ≥ 1024px · 3 columns']);
  T(S, 'mf', 8, 3, ['모바일 우선: 기본 CSS는 작은 화면용', 'mobile first: base CSS targets small screens'], 'wbx-xs wbx-a', 2, { off: 3 });
  T(S, 'mq', 8, 3, '@media (min-width: 768px) { … }', 'cz-mono wbx-xs wbx-a', 3);
  T(S, 'fl', 1, 14.2, ['유동 단위 clamp(1rem, 2.5vw, 1.5rem) · 컨테이너 쿼리 · srcset 이미지', 'fluid clamp(1rem, 2.5vw, 1.5rem) · container queries · srcset images'], 'wbx-xs wbx-a', 4);
  fin(S, 'z', 15.4, [['반응형 웹: 한 코드가 화면 크기에 맞춰 배치·글자·이미지를 바꿔요', 'responsive design: one codebase adapts layout, type and images to the screen', 'wbx-xs wbx-a'], ['기기 이름이 아니라 내용이 깨지는 지점에 브레이크포인트를 둬요', 'set breakpoints where the content breaks, not by device names']]);
  S.cap(1, '뷰포트 메타 태그', 'The viewport meta tag').cap(2, '모바일 우선', 'Mobile first').cap(3, '미디어 쿼리로 넓히기', 'Widen with media queries').cap(4, '유동 단위와 이미지', 'Fluid units and images').cap(5, '반응형 웹', 'Responsive design');
  return S;
}

/* ================= front end ================= */
function sState() {
  const S = scene({ id: 'wb-state', steps: 5, per: 1.6 });
  const N = { app: [12.4, 1.6, 'App'], hd: [4, 4.4, 'Header'], mn: [20.8, 4.4, 'Main'], cb: [4, 7.2, 'CartBadge'], ls: [20.8, 7.2, 'ProductList'], cd: [20.8, 10, 'ProductCard'] }, E = [['app', 'hd'], ['app', 'mn'], ['hd', 'cb'], ['mn', 'ls'], ['ls', 'cd']];
  const c = k => [N[k][0] + 2.8, N[k][1] + .7];
  E.forEach(([a, b], i) => seg(S, 'e' + i, [c(a)[0], N[a][1] + 1.4], [c(b)[0], N[b][1]], 0, 'ink-3', .07));
  Object.entries(N).forEach(([k, [x, y, l]]) => box2(S, 'n' + k, x, y, 5.6, 1.4, l, 'line', 0, { pct: 40 }));
  tsets(S, 'ncb', [[1, 'warn', 40]]); tsets(S, 'ncd', [[1, 'warn', 40]]);
  T(S, 's1', 1, .3, ['장바구니 상태를 CartBadge와 ProductCard가 함께 써야 해요', 'CartBadge and ProductCard both need the cart state'], 'wbx-xs wbx-w', 1, { off: 2 });
  tsets(S, 'napp', [[2, 'accent', 35], [3, 'line', 40]]);
  [['app', 'mn'], ['mn', 'ls'], ['ls', 'cd'], ['app', 'hd'], ['hd', 'cb']].forEach(([a, b], i) => seg(S, 'pd' + i, [c(a)[0] + .25, N[a][1] + 1.4], [c(b)[0] + .25, N[b][1]], 2, 'danger', .14, { off: 3 }));
  T(S, 'pdl', 27, 5.8, ['props로', 'passed'], 'wbx-tiny wbx-r', 2, { off: 3 }); T(S, 'pdl2', 27, 6.5, ['계속 전달', 'down'], 'wbx-tiny wbx-r', 2, { off: 3 });
  T(S, 's2', 1, .3, ['prop drilling: 쓰지도 않는 Main, ProductList가 props를 넘겨 줘야 해요', 'prop drilling: Main and ProductList must pass props they never use'], 'wbx-xs wbx-r', 2, { off: 3 });
  box2(S, 'st', 1, 10, 8, 1.4, 'store { cart }', 'accent', 3, { pct: 35 });
  seg(S, 'sb', [6.8, 9.95], [6.8, 8.65], 3, 'ok', .1, { dash: 1 }); seg(S, 'sc', [9.05, 10.7], [20.75, 10.7], 3, 'ok', .1, { dash: 1 });
  T(S, 's3', 1, .3, ['전역 스토어(Context, Redux, Zustand): 필요한 컴포넌트만 직접 구독', 'a global store (Context, Redux, Zustand): only the components that need it subscribe'], 'wbx-xs wbx-g', 3);
  [['action', 'accent'], ['reducer', 'warn'], ['state', 'ok'], ['view', 'line']].forEach(([l, col], i) => { box2(S, 'f' + i, 1 + i * 6.4, 12.2, 5, 1.2, l, col, 4, { pct: 35 }); if (i < 3) ar(S, 'fa' + i, [6.1 + i * 6.4, 12.8], [7.3 + i * 6.4, 12.8], 'ink-3', 4, { h: .08 }); });
  T(S, 'fl', 26.2, 12.35, ['↺ 한 방향', '↺ one way'], 'wbx-xs wbx-a', 4);
  fin(S, 'z', 14.2, [['상태는 쓰는 곳 가까이 두고, 여러 곳이 쓰면 공통 조상이나 스토어로 올려요', 'keep state close to where it’s used; lift it to a common ancestor or a store when shared', 'wbx-xs wbx-a'], ['서버 데이터(캐시)는 React Query·SWR, 화면 상태는 스토어처럼 종류별로 나눠 관리해요', 'manage server data (cache) with React Query or SWR and UI state in a store, separately']]);
  S.cap(1, '멀리 떨어진 두 컴포넌트', 'Two distant components').cap(2, 'prop drilling', 'Prop drilling').cap(3, '전역 스토어 구독', 'Subscribe to a store').cap(4, '단방향 데이터 흐름', 'One-way data flow').cap(5, '프런트엔드 상태 관리', 'Front-end state management');
  return S;
}
function sWasm() {
  const S = scene({ id: 'wb-wasm', steps: 5, per: 1.6 });
  ['C / C++', 'Rust', 'Go'].forEach((l, i) => { box2(S, 'src' + i, 1, 1 + i * 1.6, 5, 1.3, l, 'line', 1, { pct: 40 }); seg(S, 'sl' + i, [6.05, 1.65 + i * 1.6], [8.95, 3.25], 1, 'ink-3', .07); });
  box2(S, 'cc', 9, 2.4, 6.4, 1.7, ['컴파일러 (LLVM 등)', 'compiler (LLVM, …)'], 'accent', 1, { pct: 30 }); ar(S, 'ca', [15.5, 3.25], [18.4, 3.25], 'ink-3', 1, { h: .08 });
  box2(S, 'wm', 18.5, 2.4, 5, 1.7, 'add.wasm', 'warn', 1, { pct: 40 }); T(S, 'wmn', 24, 2.3, ['작은 바이너리', 'compact binary'], 'wbx-xs', 1); T(S, 'wmn2', 24, 3.3, ['스택 VM 명령', 'stack-VM code'], 'wbx-xs', 1);
  code(S, 'js', 1, 5.6, 30, ['const { instance } = await WebAssembly.instantiateStreaming(fetch("add.wasm"));', 'instance.exports.add(2, 3);   // 5'], [], { st: 2 });
  T(S, 'mt', 1, 9, ['선형 메모리: 하나의 ArrayBuffer · 경계 밖은 접근 불가 (샌드박스)', 'linear memory: a single ArrayBuffer · nothing outside is reachable (sandboxed)'], 'wbx-xs wbx-a', 3);
  for (let i = 0; i < 16; i++) box2(S, 'm' + i, 1 + i * 1.9, 10, 1.75, 1.1, i === 5 ? '5' : '', i === 5 ? 'ok' : 'line', 3, { pct: 40 });
  T(S, 'mj', 1, 11.4, ['JS는 같은 버퍼를 Uint8Array로 읽어 결과를 주고받아요', 'JS reads the same buffer as a Uint8Array to exchange results'], 'wbx-xs', 3);
  T(S, 'u1', 1, 12.6, ['쓰임: Figma, Photoshop 웹, ffmpeg.wasm, 게임 엔진, 브라우저 속 SQLite', 'used by Figma, Photoshop on the web, ffmpeg.wasm, game engines, SQLite in the browser'], 'wbx-xs wbx-g', 4);
  T(S, 'u2', 1, 13.6, ['DOM은 직접 못 만져요 → UI는 JS, 무거운 계산은 Wasm으로 나눠요', 'it can’t touch the DOM directly → JS for UI, Wasm for heavy computation'], 'wbx-xs', 4);
  fin(S, 'z', 15, [['WebAssembly: 여러 언어를 브라우저에서 거의 네이티브 속도로 돌리는 안전한 바이너리 형식', 'WebAssembly runs many languages in the browser at near-native speed in a safe binary format', 'wbx-xs wbx-a'], ['WASI로 브라우저 밖(서버, 엣지, 플러그인)에서도 써요', 'with WASI it also runs outside the browser: servers, edge functions, plugins']]);
  S.cap(1, '여러 언어 → .wasm', 'Many languages → .wasm').cap(2, 'JS에서 불러 쓰기', 'Call it from JS').cap(3, '선형 메모리와 샌드박스', 'Linear memory and the sandbox').cap(4, '어디에 쓰나', 'Where it’s used').cap(5, 'WebAssembly', 'WebAssembly');
  return S;
}

/* ================= HTTP ================= */
function sRealtime() {
  const S = scene({ id: 'wb-realtime', steps: 5, per: 1.6 });
  const row = (k, y, title, st) => { T(S, k + 't', 1, y + .1, title, 'wbx-s wbx-a', st); hl(S, k + 'ln', 8, 31, y + .55, 'line', st, { w: .06 }); };
  row('p', .8, ['폴링', 'polling'], 1);
  [0, 1, 2, 3, 4, 5].forEach(i => box2(S, 'pr' + i, 8 + i * 3.9, .3, 3.4, 1.1, i === 3 ? 'data' : '∅', i === 3 ? 'ok' : 'line', 1, { pct: 40 }));
  T(S, 'pn', 8, 1.6, ['몇 초마다 “새 거 있어?” → 대부분 빈 응답, 지연 = 주기', 'ask “anything new?” every few seconds → mostly empty, latency = interval'], 'wbx-tiny', 1);
  row('l', 3.4, ['롱 폴링', 'long polling'], 2);
  rect(S, 'lh', 8, 3.4, 11, 1.1, 'accent', 20, 2, { r: .2, html: ['요청을 붙잡고 대기…', 'request held open…'], cls: 'cz-c wbx-c2' }); box2(S, 'ld', 19.2, 3.4, 2.6, 1.1, 'data', 'ok', 2, { pct: 40 }); rect(S, 'lh2', 22, 3.4, 9, 1.1, 'accent', 20, 2, { r: .2, html: ['다시 요청…', 'ask again…'], cls: 'cz-c wbx-c2' });
  T(S, 'ln2', 8, 4.7, ['이벤트가 생기면 바로 응답 → 다시 요청 · 낭비는 줄지만 연결이 자주 끊겨요', 'answer as soon as an event occurs, then re-ask · less waste, frequent reconnects'], 'wbx-tiny', 2);
  row('s', 6, 'SSE', 3);
  rect(S, 'sh', 8, 6, 23, 1.1, 'ok', 15, 3, { r: .2, html: 'text/event-stream', cls: 'cz-c wbx-c2' });
  [8.6, 11.6, 25.4, 28.4].forEach((x, i) => box2(S, 'se' + i, x, 6.1, 1.8, .9, '↓', 'ok', 3, { pct: 50 }));
  T(S, 'sn', 8, 7.3, ['HTTP 응답 하나를 열어 두고 서버 → 클라이언트로 이벤트를 흘려요 · 자동 재연결', 'one HTTP response stays open; the server streams events to the client · auto-reconnect'], 'wbx-tiny', 3);
  row('w', 8.6, ['웹소켓', 'WebSocket'], 4);
  rect(S, 'wh', 8, 8.6, 23, 1.1, 'warn', 15, 4, { r: .2, html: 'ws://', cls: 'cz-c wbx-c2' });
  [[8.6, '↑', 'accent'], [11.4, '↓', 'ok'], [14.2, '↓', 'ok'], [24.4, '↑', 'accent'], [27.4, '↓', 'ok']].forEach(([x, l, c], i) => box2(S, 'wv' + i, x, 8.7, 1.8, .9, l, c, 4, { pct: 50 }));
  T(S, 'wn', 8, 9.9, ['업그레이드 후 양방향 메시지 · 채팅, 게임, 협업 편집', 'after an upgrade, messages flow both ways · chat, games, collaborative editing'], 'wbx-tiny', 4);
  box2(S, 'k1', 1, 11.4, 9.6, 1.6, ['알림·피드: SSE', 'notifications/feeds: SSE'], 'ok', 4, { pct: 30 }); box2(S, 'k2', 11.2, 11.4, 9.6, 1.6, ['양방향·저지연: 웹소켓', 'two-way, low latency: WebSocket'], 'warn', 4, { pct: 30 }); box2(S, 'k3', 21.4, 11.4, 9.6, 1.6, ['드문 갱신: 폴링도 OK', 'rare updates: polling is fine'], 'line', 4, { pct: 40 });
  fin(S, 'z', 13.6, [['실시간 갱신 방법: 폴링 → 롱 폴링 → SSE(단방향 스트림) → 웹소켓(양방향)', 'ways to push updates: polling → long polling → SSE (one-way stream) → WebSocket (two-way)', 'wbx-xs wbx-a'], ['연결을 오래 붙잡는 방식은 로드 밸런서 타임아웃·서버 연결 수를 함께 설계해야 해요', 'long-lived connections require planning for load-balancer timeouts and server connection counts']]);
  S.cap(1, '폴링', 'Polling').cap(2, '롱 폴링', 'Long polling').cap(3, '서버 전송 이벤트', 'Server-sent events').cap(4, '웹소켓과 선택 기준', 'WebSocket, and how to choose').cap(5, '실시간 통신 방식', 'Real-time techniques');
  return S;
}

/* ================= performance ================= */
function sHints() {
  const S = scene({ id: 'wb-hints', steps: 5, per: 1.6 });
  const U = 2, X = t => 8 + t * U, row = i => 1.4 + i * 1.3;
  ['HTML', 'CSS', ['폰트', 'font'], ['히어로 이미지', 'hero image'], ['CDN 연결', 'CDN connect']].forEach((l, i) => T(S, 'rl' + i, 1, row(i) + .15, l, 'wbx-xs', i === 4 ? 2 : 0));
  const bar = (k, r, a, b, c, st, off, l) => rect(S, k, X(a), row(r), (b - a) * U - .06, 1, c, 40, st, { r: .15, off, html: l || '', cls: 'cz-c wbx-c2' });
  bar('b0', 0, 0, 2, 'accent', 0, 0); bar('b1', 1, 2, 5, 'warn', 0, 0, ['렌더 차단', 'render-blocking']);
  bar('f1c', 2, 5, 6, 'danger', 1, 2, ['연결', 'connect']); bar('f1', 2, 6, 8, 'ok', 1, 2); bar('i1', 3, 3, 9, 'ok', 1, 3);
  bar('pc', 4, .5, 1.5, 'danger', 2, 0, ''); bar('f2', 2, 5, 7, 'ok', 2, 3);
  bar('f3', 2, 2, 4, 'ok', 3, 0, 'preload'); bar('i3', 3, 2, 6, 'ok', 3, 0, 'preload');
  seg(S, 'lcp1', [X(9), 1], [X(9), 8], 1, 'danger', .1, { off: 3 }); T(S, 'lcp1l', X(9) - 1.6, .2, 'LCP 9', 'cz-mono wbx-xs wbx-r', 1, { off: 3 });
  seg(S, 'lcp2', [X(6), 1], [X(6), 8], 3, 'ok', .12); T(S, 'lcp2l', X(6) - 1.6, .2, 'LCP 6 ✓', 'cz-mono wbx-xs wbx-g', 3);
  T(S, 'n1', 1, 8.3, ['폰트는 CSS를 다 읽고 나서야 발견돼 늦게 시작해요', 'the font is only discovered after the CSS is parsed, so it starts late'], 'wbx-xs wbx-r', 1, { off: 2 });
  code(S, 'cd', 1, 9.2, 30, ['<link rel="preconnect" href="https://cdn.example.com">', '<link rel="preload" href="/font.woff2" as="font" crossorigin>', '<img src="hero.avif" fetchpriority="high">'], [[0, 2], [1, 3]], { hoff: 4 });
  T(S, 'p4', 1, 13.8, ['prefetch: 다음 페이지 자원을 한가할 때 · preload 남발은 정작 중요한 자원을 늦춰요', 'prefetch: fetch next-page assets when idle · overusing preload delays what really matters'], 'wbx-xs wbx-a', 4);
  fin(S, 'z', 15, [['리소스 힌트: 브라우저가 늦게 발견할 자원을 미리 알려 중요 렌더링 경로를 줄여요', 'resource hints tell the browser about late-discovered resources to shorten the critical path', 'wbx-xs wbx-a'], ['DevTools 네트워크 워터폴과 Lighthouse로 늦게 시작하는 요청을 찾아요', 'find late-starting requests in the DevTools network waterfall and Lighthouse']]);
  S.cap(1, '늦게 발견되는 자원', 'Late-discovered resources').cap(2, 'preconnect로 연결 미리', 'Connect early with preconnect').cap(3, 'preload로 먼저 받기', 'Fetch early with preload').cap(4, 'prefetch와 주의점', 'Prefetch and caveats').cap(5, '리소스 힌트', 'Resource hints');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'wbx-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono wbx-code ' + (o.cls || ''), st, { off }));
function sSse() {
  const S = scene({ id: 'wb-sse', steps: 5, per: 1.7 });
  rect(S, 'cbg', .6, .4, 14.6, 2.8, 'ink', 6, 0, { r: .4 });
  codeLines(S, 'c', 1.0, .6, ['const es = new EventSource("/events");', 'es.addEventListener("price", e =>', '  show(JSON.parse(e.data)));'], 0, 0, { lh: .8 });
  box2(S, 'br', .6, 4.4, 5.0, 1.6, ['브라우저', 'browser'], 'accent', 0, { pct: 24 }); box2(S, 'sv', 26.0, 4.4, 5.2, 1.6, ['서버', 'server'], 'ok', 0, { pct: 24 });
  ar(S, 'req', [5.6, 4.8], [26.0, 4.8], 'ink-2', 0, { h: .1 }); T(S, 'reql', 8.0, 3.7, 'GET /events   Accept: text/event-stream', 'cz-mono wbx-xs', 0);
  rect(S, 'pipe', 5.8, 5.4, 20.0, .4, 'ok', 30, 1, { r: .2 }); T(S, 'pipel', 8.0, 6.0, ['응답 하나를 끝내지 않고 열어 둔 채 계속 써요', 'one response kept open and written to continuously'], 'wbx-xs wbx-g', 1, { off: 3 });
  const EV = ['event: price', 'data: {"BTC": 97000}', 'id: 41', '', 'event: price', 'data: {"BTC": 97120}', 'id: 42', ''];
  rect(S, 'ebg', 17.0, .4, 14.2, 3.0, 'ink', 6, 2, { r: .4, off: 4 }); T(S, 'eh', 17.4, .5, 'text/event-stream', 'cz-mono wbx-xs wbx-a', 2, { off: 4 });
  codeLines(S, 'ev', 17.4, 1.3, ['event: price', 'data: {"BTC": 97000}', 'id: 42'], 2, 4, { lh: .7 });
  T(S, 'evn', 1, 7.4, ['한 이벤트 = event·data·id 줄 몇 개 + 빈 줄 · 텍스트만 보낼 수 있어요', 'one event = a few event, data and id lines plus a blank line · text only'], 'wbx-xs', 2, { off: 3 });
  for (let i = 0; i < 5; i++) pt(S, 'tk' + i, 9.0 + i * 3.4, 5.6, 2, C.cur, .22, { off: 3 });
  xm(S, 'drop', 15.8, 5.6, 3, { off: 4 }); T(S, 'rc0', 1, 7.4, ['연결이 끊기면 브라우저가 retry 뒤에 알아서 다시 연결', 'if the connection drops, the browser reconnects after retry ms'], 'wbx-xs wbx-a', 3, { off: 4 });
  codeLines(S, 'rc1', 1, 8.6, ['GET /events', 'Last-Event-ID: 42      → 서버는 43부터 이어서'].map((t, i) => i ? [t, 'Last-Event-ID: 42      → the server resumes at 43'] : t), 3, 4);
  const CMP = [['', 'SSE', ['웹소켓', 'WebSocket']], [['방향', 'direction'], ['서버 → 클라이언트', 'server → client'], ['양방향', 'both ways']], [['프로토콜', 'protocol'], ['그냥 HTTP (HTTP/2 다중화)', 'plain HTTP (HTTP/2 multiplexed)'], ['업그레이드 후 별도 프로토콜', 'a separate upgraded protocol']], [['데이터', 'data'], ['텍스트', 'text'], ['텍스트·이진', 'text and binary']], [['재연결', 'reconnect'], ['자동 + 이어 받기', 'automatic, with resume'], ['직접 구현', 'roll your own']]];
  CMP.forEach((r, i) => r.forEach((c, j) => T(S, `cm${i}${j}`, [1, 6.4, 18.8][j], 7.4 + i * 1.15, c, 'wbx-xs ' + (i === 0 ? 'wbx-a' : j === 1 ? 'wbx-g' : ''), 4)));
  notesSplit(S, 'k', 15.6, [['EventSource로 요청하면 서버는 응답을 끝내지 않고 열어 둔 채, 이벤트가 생길 때마다 이어서 써요', 'with EventSource, the server never finishes the response and keeps writing events into it'], ['형식은 단순한 텍스트 · event, data, id 줄 뒤에 빈 줄이 오면 이벤트 하나예요', 'the format is plain text: event, data and id lines followed by a blank line make one event'], ['끊기면 브라우저가 자동으로 다시 연결하며 마지막 id를 보내, 놓친 이벤트부터 이어 받아요', 'after a drop the browser reconnects automatically and sends the last id, so missed events resume'], ['한쪽 방향 알림이면 SSE가 더 단순해요 · 양방향·이진이 필요하면 웹소켓', 'for one-way updates SSE is simpler; two-way or binary traffic needs WebSockets']]);
  fin(S, 'z', 15.6, [['서버 전송 이벤트(SSE): HTTP 응답 하나로 서버가 클라이언트에게 이벤트를 계속 밀어 보내는 표준', 'server-sent events stream events from server to client over a single HTTP response', 'wbx-xs wbx-a'], ['알림, 실시간 피드, 진행률, LLM 응답 토큰 스트리밍에 많이 써요', 'common for notifications, live feeds, progress updates and streaming LLM tokens'], ['프록시가 응답을 모아 두지 않게(버퍼링 끔) 하고, HTTP/1.1은 도메인당 연결 6개 제한에 주의해요', 'disable proxy buffering, and mind HTTP/1.1’s limit of six connections per domain']]);
  S.cap(1, '열어 둔 응답 하나', 'One response, kept open').cap(2, '이벤트 형식', 'The event format').cap(3, '자동 재연결과 이어 받기', 'Reconnect and resume').cap(4, 'SSE와 웹소켓', 'SSE versus WebSockets').cap(5, '서버 전송 이벤트 (SSE)', 'Server-sent events (SSE)');
  return S;
}

function sCodeSplit() {
  const S = scene({ id: 'wb-split', steps: 5, per: 1.7 });
  const BX = 6.4, KB = 1 / 80, bar = (k, x, y, kb, c, l, st, off) => { rect(S, k, x, y, kb * KB, 1.3, c, 40, st, { r: .15, off }); T(S, k + 'l', x + .3, y + .15, l, 'cz-mono wbx-xs', st, { off }); };
  T(S, 'b0', 1, 1.2, 'main.js', 'cz-mono wbx-xs', 0, { off: 2 }); bar('m', BX, 1.0, 1800, 'danger', '1.8 MB', 0, 2);
  T(S, 'b0n', 1, 2.8, ['첫 화면도 1.8 MB를 받고 파싱해야 보여요 · 대부분은 아직 안 쓰는 코드', 'even the first screen downloads and parses 1.8 MB · most of it unused yet'], 'wbx-xs wbx-r', 1, { off: 2 });
  T(S, 'b1', 1, 1.2, 'main.js', 'cz-mono wbx-xs', 2); bar('m2', BX, 1.0, 300, 'ok', '300 KB', 2, 0);
  T(S, 'b2', 1, 2.8, 'admin.js', 'cz-mono wbx-xs', 2); bar('a', BX, 2.6, 900, 'line', ['900 KB · /admin에서만', '900 KB · only on /admin'], 2, 0);
  T(S, 'b3', 1, 4.4, 'chart.js', 'cz-mono wbx-xs', 2); bar('c', BX, 4.2, 600, 'line', ['600 KB · 차트를 열 때', '600 KB · when a chart opens'], 2, 0);
  rect(S, 'cbg', .6, 6.2, 18.0, 2.4, 'ink', 6, 2, { r: .4, off: 3 });
  codeLines(S, 'c', 1.0, 6.4, ['const Admin = lazy(() => import("./Admin"));', '<Route path="/admin" element={<Admin />} />'], 2, 3);
  T(S, 'v0', 1, 6.4, ['변하지 않는 라이브러리는 따로 · 파일 이름에 내용 해시', 'stable libraries in their own chunk · content hash in the file name'], 'wbx-xs wbx-a', 3, { off: 4 });
  [['vendor.8f3a1c.js', ['react 등 · 거의 안 바뀜 → 1년 캐시', 'react etc. · rarely changes → cached a year'], 'ok'], ['main.b72e90.js', ['우리 코드 · 배포마다 바뀜', 'our code · changes every deploy'], 'warn']].forEach(([a, b, c], i) => { cell(S, 'vc' + i, 1, 7.6 + i * 1.5, 7.6, 1.2, a, c, 24, 3, { off: 4 }); T(S, 'vt' + i, 9.0, 7.7 + i * 1.5, b, 'wbx-xs', 3, { off: 4 }); });
  T(S, 'p0', 1, 6.4, ['다음에 필요할 조각은 미리 받아 두기', 'fetch the next chunk ahead of time'], 'wbx-xs wbx-a', 4);
  codeLines(S, 'p1', 1, 7.6, ['<link rel="prefetch" href="/admin.4c1d.js">', 'onMouseEnter={() => import("./Admin")}'], 4, 0);
  T(S, 'p2', 1, 10.2, ['너무 잘게 쪼개면 요청이 늘고, 조각이 조각을 부르는 폭포가 생겨요', 'splitting too finely adds requests and chunk-after-chunk waterfalls'], 'wbx-xs wbx-w', 4);
  notesSplit(S, 'k', 15.6, [['한 덩어리 번들은 첫 화면에 필요 없는 관리자 페이지·차트 코드까지 모두 받아야 해요', 'a single bundle makes the first screen download admin and chart code it does not need'], ['동적 import()로 라우트·기능별 조각을 나누면, 필요할 때만 그 조각을 받아요', 'dynamic import() splits code by route or feature, so each chunk loads only when needed'], ['잘 안 바뀌는 라이브러리를 따로 떼고 파일 이름에 해시를 붙이면, 배포 뒤에도 캐시가 살아 있어요', 'separating stable libraries and hashing file names keeps them cached across deploys'], ['다음 조각은 prefetch나 마우스 올림에 미리 받고, 너무 잘게 쪼개지는 마세요', 'prefetch upcoming chunks or load them on hover, but do not split too finely']]);
  fin(S, 'z', 15.6, [['코드 스플리팅: 번들을 필요한 시점별 조각으로 나눠 첫 로딩에 꼭 필요한 코드만 받게 하기', 'code splitting breaks a bundle into chunks loaded when needed, so the first load carries only essential code', 'wbx-xs wbx-a'], ['Vite·webpack·Next.js가 import()를 보면 자동으로 조각을 만들어요', 'Vite, webpack and Next.js create chunks automatically wherever they see import()'], ['번들 분석기(rollup-plugin-visualizer 등)로 무엇이 큰지 먼저 확인하세요', 'check what is actually large first with a bundle analyzer such as rollup-plugin-visualizer']]);
  S.cap(1, '한 덩어리 번들', 'One big bundle').cap(2, '필요할 때 받는 조각', 'Chunks loaded on demand').cap(3, '캐시를 살리는 분리', 'Splitting for caching').cap(4, '미리 받기', 'Prefetching').cap(5, '코드 스플리팅', 'Code splitting');
  return S;
}

function sThrottle() {
  const S = scene({ id: 'wb-throttle', steps: 5, per: 1.7 });
  const X0 = 3.6, U = .0265, tx = ms => X0 + ms * U;
  T(S, 'r0', .6, 1.4, 'scroll', 'cz-mono wbx-xs', 0); hl(S, 'l0', X0, tx(1000), 2.0, 'ink-3', 0, { w: .06 });
  const evs = []; for (let t = 0; t <= 600; t += 16) evs.push(t); for (let t = 760; t <= 900; t += 16) evs.push(t);
  evs.forEach((t, i) => vl(S, 'ev' + i, tx(t), 1.4, 2.6, 'accent', 0, { w: .07 }));
  [0, 200, 400, 600, 800, 1000].forEach(t => T(S, 'tt' + t, tx(t) - 1, 2.8, t + 'ms', 'cz-tc cz-mono wbx-xs', 0, { w: 2 }));
  T(S, 'n0', .6, .1, ['스크롤 이벤트: 16 ms마다 · 무거운 처리를 매번 하면 버벅여요', 'scroll events every 16 ms · heavy work on each one janks'], 'wbx-xs wbx-r', 0);
  T(S, 'r1', .6, 4.6, 'throttle', 'cz-mono wbx-xs wbx-g', 2); hl(S, 'l1', X0, tx(1000), 5.2, 'ink-3', 2, { w: .06 });
  const th = []; let last = -1e9; evs.forEach(t => { if (t - last >= 100) { th.push(t); last = t; } });
  th.forEach((t, i) => vl(S, 'th' + i, tx(t), 4.5, 5.9, 'ok', 2, { w: .16 }));
  vl(S, 'trail', tx(900), 4.5, 5.9, 'warn', 3, { w: .16 }); T(S, 'trl', tx(900) - 6.3, 6.1, ['마지막 호출(trailing)', 'trailing call'], 'wbx-xs wbx-w', 3, { w: 6.0, css: 'text-align:right' });
  T(S, 'thn', .6, 6.4, ['100 ms에 최대 한 번 · 처음은 바로 실행', 'at most once per 100 ms · the first runs immediately'], 'wbx-xs wbx-g', 2, { off: 3 });
  T(S, 'r2', .6, 7.6, 'debounce', 'cz-mono wbx-xs wbx-a', 3); hl(S, 'l2', X0, tx(1000), 8.2, 'ink-3', 3, { w: .06 });
  [700, 1000].forEach((t, i) => vl(S, 'db' + i, tx(Math.min(t, 1000)), 7.5, 8.9, 'accent', 3, { w: .16 }));
  T(S, 'dbn', .6, 9.4, ['디바운스는 멈추고 100 ms 뒤에 한 번 · 계속 움직이는 동안엔 실행 안 돼요', 'debounce runs once 100 ms after things stop · nothing while it keeps moving'], 'wbx-xs', 3, { off: 4 });
  rect(S, 'cbg', .6, 9.2, 18.6, 4.4, 'ink', 6, 4, { r: .4 });
  codeLines(S, 'c', 1.0, 9.4, ['function throttle(fn, ms) {', '  let last = 0;', '  return (...a) => {', '    const now = Date.now();', '    if (now - last >= ms) { last = now; fn(...a); }', '  };', '}'], 4, 0, { lh: .6 });
  T(S, 'a0', 20.2, 9.4, ['함께 쓰면 좋은 것', 'worth combining with'], 'wbx-xs wbx-a', 4);
  ['requestAnimationFrame', '{ passive: true }', 'IntersectionObserver'].forEach((t, i) => T(S, 'a' + (i + 1), 20.2, 10.5 + i * 1.1, t, 'cz-mono wbx-xs', 4));
  notesSplit(S, 'k', 15.6, [['스크롤·리사이즈·마우스 이동은 1초에 수십 번 일어나요 · 매번 무거운 일을 하면 화면이 버벅여요', 'scroll, resize and mousemove fire dozens of times a second · heavy work on each causes jank'], ['스로틀은 정해진 간격(100 ms)에 최대 한 번만 실행해요 · 움직이는 동안에도 꾸준히 갱신돼요', 'throttle runs at most once per interval (100 ms), so updates keep flowing during movement'], ['마지막 상태를 놓치지 않게 끝에 한 번 더(trailing) · 디바운스는 멈춘 뒤에만 실행돼요', 'a trailing call catches the final state · debounce, by contrast, only fires after things stop'], ['구현은 마지막 실행 시각만 기억하면 돼요 · 화면 갱신이면 requestAnimationFrame이 더 자연스러워요', 'the implementation just remembers the last run time · for visual updates, requestAnimationFrame fits better']]);
  fin(S, 'z', 15.6, [['스로틀: 이벤트가 아무리 많아도 정해진 간격마다 최대 한 번만 함수를 실행하기', 'throttling runs a function at most once per interval, however many events arrive', 'wbx-xs wbx-a'], ['스크롤 위치·무한 스크롤 확인·드래그·게임 입력처럼 “계속 갱신”이 필요할 때 써요', 'use it where updates must keep flowing: scroll position, infinite-scroll checks, dragging, game input'], ['서버 쪽 레이트 리밋과는 별개 · 클라이언트 쪽 부하를 줄이는 기법이에요', 'it is separate from server-side rate limiting; it reduces client-side load']]);
  S.cap(1, '쏟아지는 이벤트', 'A flood of events').cap(2, '간격마다 한 번', 'Once per interval').cap(3, '마지막 호출과 디바운스', 'Trailing calls versus debounce').cap(4, '구현', 'Implementation').cap(5, '스로틀', 'Throttling');
  return S;
}

return { css: CSSX, secs: [
  sec('wb-css', 'CSS', 'CSS', 'CSS 레이아웃', 'CSS layout', '상자부터 그리드까지, 화면에 요소를 배치하는 규칙이에요.', 'The rules that place elements on screen, from boxes to grids.', [
    item('wb-box', 'CSS 박스 모델', 'The CSS box model', '모든 요소는 content → padding → border → margin 네 겹의 상자예요. box-sizing에 따라 width가 뜻하는 범위가 달라져요.', '기본값 content-box에서는 width: 200px에 padding 20px, border 5px가 더해져 실제 폭이 250px이 돼요. border-box로 바꾸면 테두리까지 200px라 계산이 쉬워서 요즘은 * { box-sizing: border-box }로 시작해요. 세로로 붙은 블록의 margin은 더해지지 않고 큰 쪽만 남는 마진 상쇄가 일어나요. 개발자 도구의 박스 그림으로 바로 확인할 수 있어요.', 'Every element is a box of four layers: content → padding → border → margin. box-sizing decides what width refers to.', 'Under the default content-box, width: 200px plus 20px padding and 5px border renders 250px wide. border-box counts padding and border inside the 200px, which is easier, so modern CSS starts with * { box-sizing: border-box }. Vertical margins between adjacent blocks collapse to the larger one instead of adding up. DevTools shows the box diagram for any element.', sBox()),
    item('wb-specificity', '캐스케이드와 명시도', 'Cascade and specificity', '같은 요소에 여러 CSS 규칙이 겹치면 중요도 → 출처 → 명시도 → 선언 순서로 이길 규칙을 골라요.', '명시도는 (ID 수, 클래스·속성·가상 클래스 수, 태그 수)를 앞에서부터 비교해요. p(0,0,1) < .note(0,1,0) < #intro(1,0,0)라 문단은 초록이 되고, 명시도가 같으면 나중에 쓴 규칙이 이겨요. 인라인 style과 !important는 그보다 강해서 남발하면 나중에 덮어쓰기 어려워요. 클래스 위주(BEM), :where()로 명시도 0 만들기, @layer로 계층 순서 정하기가 관리 요령이에요.', 'When several CSS rules target one element, the cascade picks a winner by importance, origin, specificity and then source order.', 'Specificity compares (IDs, classes/attributes/pseudo-classes, tags) from the left: p (0,0,1) < .note (0,1,0) < #intro (1,0,0), so the paragraph turns green, and on a tie the later rule wins. Inline styles and !important beat all of these, and overusing them makes later overrides painful. Stick to classes (BEM), zero specificity out with :where(), and order styles with @layer.', sSpec()),
    item('wb-flex', 'Flexbox', 'Flexbox', '요소를 한 방향(행 또는 열)으로 늘어놓고, 주축과 교차축을 따라 정렬하며 남는 공간을 나눠 주는 레이아웃이에요.', 'display: flex를 주면 자식들이 주축(기본은 가로)으로 늘어서요. justify-content는 주축 정렬(space-between 등), align-items는 교차축 정렬(center로 세로 가운데)을 맡고, flex: 1인 요소는 남는 공간을 차지해요. flex-direction: column이면 두 축이 바뀌고, flex-wrap으로 줄바꿈, gap으로 간격을 줘요. 내비게이션 바, 버튼 묶음, 카드 안 정렬처럼 1차원 배치에 써요.', 'A layout that lines items up in one direction (row or column), aligns them along main and cross axes and shares out free space.', 'With display: flex, children line up along the main axis (horizontal by default). justify-content aligns along the main axis (e.g. space-between), align-items along the cross axis (center for vertical centering), and an item with flex: 1 takes the free space. flex-direction: column swaps the axes, flex-wrap wraps lines and gap sets spacing. It suits one-dimensional layouts such as nav bars, button groups and alignment inside cards.', sFlex()),
    item('wb-grid', 'CSS Grid', 'CSS Grid', '행과 열을 함께 정의해 2차원 레이아웃을 선언적으로 그리는 CSS 기능이에요.', 'grid-template-columns: 200px 1fr 1fr은 고정 200px 뒤에 남은 공간을 1:1로 나눠요(fr = 남은 공간의 몫). grid-template-areas로 header, side, main, footer 같은 영역 이름을 지도처럼 그려 배치할 수 있고, repeat(auto-fill, minmax(150px, 1fr))는 화면 폭에 따라 열 수를 자동으로 바꿔 카드 목록을 반응형으로 만들어요. Flex는 1차원, Grid는 2차원이라 페이지 뼈대는 Grid, 줄 안 정렬은 Flex를 함께 써요.', 'A CSS feature that defines rows and columns together to lay out pages in two dimensions declaratively.', 'grid-template-columns: 200px 1fr 1fr fixes 200px and splits the rest 1:1 (fr = a share of leftover space). grid-template-areas draws named areas like header, side, main and footer as a map, and repeat(auto-fill, minmax(150px, 1fr)) changes the column count with the viewport for responsive card lists. Flex is one-dimensional and Grid two-dimensional, so a common combo is Grid for the page skeleton and Flex within rows.', sGrid()),
    item('wb-responsive', '반응형 웹', 'Responsive design', '하나의 코드가 화면 크기에 맞춰 레이아웃·글자·이미지를 바꾸도록 만드는 방법이에요.', '먼저 viewport 메타 태그가 있어야 휴대폰이 데스크톱 폭(980px)으로 축소해 보여 주지 않아요. 모바일 우선으로 기본 CSS를 작은 화면용으로 쓰고, @media (min-width: 768px) 같은 미디어 쿼리로 넓은 화면에서 2열, 3열로 늘려요. clamp()로 유동 글자 크기, 컨테이너 쿼리로 부품 단위 반응형, srcset으로 화면에 맞는 이미지를 줘요. 브레이크포인트는 기기 이름이 아니라 내용이 깨지는 지점에 둬요.', 'Making one codebase adapt its layout, type and images to the screen size.', 'First, the viewport meta tag stops phones from rendering a shrunken 980px desktop page. Write mobile-first base CSS for small screens, then widen to two or three columns with media queries like @media (min-width: 768px). clamp() gives fluid type, container queries make components responsive on their own, and srcset serves fitting images. Put breakpoints where the content breaks, not at device names.', sResponsive())
  ])
], add: {
  'wb-front': [
    item('wb-state', '프런트엔드 상태 관리', 'Front-end state management', '여러 컴포넌트가 같은 데이터를 써야 할 때 그 상태를 어디에 두고 어떻게 전달할지 정하는 일이에요.', '장바구니처럼 멀리 떨어진 CartBadge와 ProductCard가 함께 쓰는 상태를 App에 두면, 쓰지도 않는 중간 컴포넌트가 props를 계속 넘겨야 하는 prop drilling이 생겨요. Context, Redux, Zustand 같은 전역 스토어에 두면 필요한 컴포넌트만 직접 구독해요. 상태 변경은 action → reducer → 새 state → 화면으로 한 방향으로 흘러 추적이 쉬워요. 서버 데이터는 React Query·SWR, 화면 상태는 스토어로 종류별로 나눠 관리해요.', 'Deciding where shared state lives and how it reaches the components that need it.', 'If cart state used by distant CartBadge and ProductCard sits in App, intermediate components must pass props they never use: prop drilling. A global store such as Context, Redux or Zustand lets only the interested components subscribe. Changes flow one way, action → reducer → new state → view, which keeps them traceable. Manage server data with React Query or SWR and UI state in a store, separately.', sState()),
    item('wb-wasm', 'WebAssembly', 'WebAssembly', 'C, C++, Rust 같은 언어를 컴파일한 바이너리를 브라우저에서 거의 네이티브 속도로 안전하게 실행하는 형식이에요.', '컴파일러가 만든 .wasm 파일을 JS가 WebAssembly.instantiateStreaming으로 불러와 instance.exports.add(2, 3)처럼 호출해요. Wasm은 하나의 ArrayBuffer인 선형 메모리만 접근하는 샌드박스에서 돌고, JS는 같은 버퍼를 읽어 결과를 주고받아요. DOM은 직접 다루지 못해 UI는 JS, 무거운 계산은 Wasm으로 나누며, Figma, Photoshop 웹, ffmpeg.wasm이 대표 사례예요. WASI로 브라우저 밖에서도 써요.', 'A binary format that runs code compiled from languages like C, C++ and Rust in the browser, safely and at near-native speed.', 'JavaScript loads the compiled .wasm file with WebAssembly.instantiateStreaming and calls exports such as instance.exports.add(2, 3). Wasm runs in a sandbox that can only touch its linear memory, a single ArrayBuffer, which JS also reads to exchange results. It can’t manipulate the DOM directly, so JS handles UI and Wasm the heavy computation; Figma, Photoshop on the web and ffmpeg.wasm are well-known uses. With WASI it runs outside the browser too.', sWasm())
  ],
  'wb-http': [
    item('wb-realtime', '폴링 · SSE · 웹소켓', 'Polling, SSE and WebSockets', '서버의 새 소식을 클라이언트에 실시간으로 전하는 방법들이에요: 폴링, 롱 폴링, 서버 전송 이벤트(SSE), 웹소켓.', '폴링은 몇 초마다 물어봐서 단순하지만 대부분 빈 응답이고 지연이 주기만큼 생겨요. 롱 폴링은 이벤트가 생길 때까지 요청을 붙잡아 낭비를 줄여요. SSE는 HTTP 응답 하나를 열어 두고 서버가 이벤트를 흘려보내는 단방향 스트림으로 자동 재연결이 돼 알림·피드에 좋아요. 웹소켓은 업그레이드 후 양방향 메시지를 주고받아 채팅·게임·협업 편집에 써요. 긴 연결은 로드 밸런서 타임아웃과 연결 수를 함께 설계해야 해요.', 'Ways to deliver server updates to clients in real time: polling, long polling, server-sent events (SSE) and WebSockets.', 'Polling asks every few seconds: simple, but mostly empty responses and latency equal to the interval. Long polling holds a request open until an event arrives, cutting waste. SSE keeps one HTTP response open and streams events one way, with automatic reconnection, ideal for notifications and feeds. WebSockets upgrade the connection for two-way messages, used in chat, games and collaborative editing. Long-lived connections require planning for load-balancer timeouts and connection counts.', sRealtime())
  ],
  'wb-perf': [
    item('wb-hints', '리소스 힌트', 'Resource hints', 'preconnect, preload, prefetch로 브라우저가 늦게 발견할 자원을 미리 알려, 중요 렌더링 경로를 줄이는 방법이에요.', '폰트처럼 CSS를 다 읽고 나서야 발견되는 자원은 늦게 시작해 LCP를 늦춰요. preconnect는 CDN과의 DNS·TCP·TLS 연결을 미리 열고, preload는 꼭 필요한 폰트·히어로 이미지를 처음부터 받게 하며, fetchpriority="high"로 우선순위를 높여요. prefetch는 다음 페이지 자원을 한가할 때 받아 둬요. 다만 preload를 남발하면 정작 중요한 자원이 밀리니, 네트워크 워터폴과 Lighthouse로 확인하며 써요.', 'preconnect, preload and prefetch tell the browser about resources it would discover late, shortening the critical rendering path.', 'Resources like fonts are only discovered after the CSS is parsed, so they start late and delay LCP. preconnect opens the DNS, TCP and TLS connection to a CDN early, preload fetches essential fonts and hero images from the start, and fetchpriority="high" raises priority. prefetch grabs next-page assets when idle. Overusing preload pushes back what really matters, so verify with the network waterfall and Lighthouse.', sHints())
  ]
},
after: {
  'wb-realtime': [item('wb-sse', '서버 전송 이벤트 (SSE)', 'Server-sent events (SSE)', 'HTTP 응답 하나를 열어 둔 채 서버가 이벤트를 계속 써 보내는 표준이에요. 끊기면 브라우저가 자동으로 다시 연결해 이어 받아요.', '브라우저에서 new EventSource("/events")를 만들면 Accept: text/event-stream으로 요청이 가고, 서버는 응답을 끝내지 않은 채 이벤트가 생길 때마다 이어서 써요. 형식은 단순한 텍스트로, event: price, data: {"BTC": 97000}, id: 42 같은 줄 뒤에 빈 줄이 오면 이벤트 하나예요. 클라이언트는 addEventListener("price", …)로 받아요. 연결이 끊기면 브라우저가 retry로 정한 시간 뒤에 자동으로 다시 연결하면서 Last-Event-ID: 42 헤더를 보내, 서버는 43번부터 이어서 보낼 수 있어요. 웹소켓과 비교하면, SSE는 서버 → 클라이언트 한 방향이고 텍스트만 보낼 수 있지만, 그냥 HTTP라서 프록시와 방화벽을 잘 통과하고 HTTP/2에서는 연결 하나에 다중화되며 재연결과 이어 받기가 기본으로 들어 있어요. 웹소켓은 양방향·이진 데이터를 다루지만 재연결은 직접 구현해야 해요. 그래서 알림, 실시간 피드, 진행률 표시, LLM 응답 토큰 스트리밍처럼 서버가 일방적으로 밀어 주는 경우에는 SSE가 더 단순해요. 주의할 점은 프록시가 응답을 모아 두지 않게 버퍼링을 끄는 것(nginx의 X-Accel-Buffering: no)과, HTTP/1.1에서는 도메인당 동시 연결이 6개로 제한된다는 점이에요.', 'A standard in which the server keeps one HTTP response open and keeps writing events into it; after a drop the browser reconnects and resumes automatically.', 'Creating new EventSource("/events") in the browser sends a request with Accept: text/event-stream, and the server never finishes the response, writing each new event into it. The format is plain text: lines such as event: price, data: {"BTC": 97000} and id: 42 followed by a blank line make one event, received with addEventListener("price", …). If the connection drops, the browser reconnects automatically after the retry interval and sends a Last-Event-ID: 42 header so the server can resume from 43. Compared with WebSockets, SSE is one-way (server to client) and text only, but it is plain HTTP, so it passes proxies and firewalls easily, multiplexes over a single HTTP/2 connection and has reconnection and resumption built in; WebSockets handle two-way and binary data but leave reconnection to you. For server-driven updates such as notifications, live feeds, progress bars and streaming LLM tokens, SSE is the simpler choice. Watch out for proxies buffering responses (disable it, e.g. nginx’s X-Accel-Buffering: no) and for HTTP/1.1’s limit of six concurrent connections per domain.', sSse())],
  'wb-bundle': [item('wb-split', '코드 스플리팅', 'Code splitting', '번들을 필요한 시점별 조각으로 나눠, 첫 로딩에는 꼭 필요한 코드만 받고 나머지는 필요할 때 받게 해요.', '모든 코드를 main.js 하나(예: 1.8 MB)로 묶으면 첫 화면을 보여 주기 전에 관리자 페이지와 차트 라이브러리 코드까지 모두 내려받고 파싱해야 해요. 코드 스플리팅은 동적 import()가 나오는 지점에서 번들을 조각(chunk)으로 나눠요. const Admin = lazy(() => import("./Admin"))처럼 라우트별로 나누면 첫 로딩은 main.js 300 KB만, admin 조각 900 KB는 /admin에 들어갈 때, chart 조각 600 KB는 차트를 열 때 받아요. Vite, webpack, Next.js는 import()를 보면 자동으로 조각을 만들어요. 캐시도 함께 설계해요. react 같은 잘 안 바뀌는 라이브러리를 vendor 조각으로 떼고 파일 이름에 내용 해시(vendor.8f3a1c.js)를 붙이면, 우리 코드만 바뀐 배포에서도 vendor는 1년짜리 캐시가 그대로 살아 있어요. 다음에 필요할 조각은 <link rel="prefetch">나 링크에 마우스를 올렸을 때 import()로 미리 받아 두면 이동이 즉시 일어나요. 반대로 너무 잘게 쪼개면 요청 수가 늘고, 조각이 다른 조각을 불러오는 폭포(waterfall)가 생겨 오히려 느려져요. 무엇이 큰지는 번들 분석기로 먼저 확인하고, 트리 셰이킹으로 쓰지 않는 코드는 아예 빼요.', 'Splitting a bundle into chunks loaded when needed, so the first load carries only essential code.', 'Bundling everything into one main.js (say 1.8 MB) means the first screen must download and parse admin pages and chart libraries before anything appears. Code splitting cuts the bundle into chunks wherever a dynamic import() appears: splitting by route with const Admin = lazy(() => import("./Admin")) leaves the first load with a 300 KB main.js, while the 900 KB admin chunk arrives on entering /admin and the 600 KB chart chunk when a chart opens. Vite, webpack and Next.js create chunks automatically from import(). Plan caching too: putting rarely changing libraries such as react in a vendor chunk with a content hash in the name (vendor.8f3a1c.js) keeps its year-long cache valid across deploys that only touch our code. Chunks needed next can be fetched ahead with <link rel="prefetch"> or an import() on hover, making navigation instant. Splitting too finely backfires, adding requests and chunk-after-chunk waterfalls. Check what is actually large with a bundle analyzer first, and let tree shaking drop unused code entirely.', sCodeSplit())],
  'wb-debounce': [item('wb-throttle', '스로틀', 'Throttling', '이벤트가 아무리 쏟아져도 정해진 간격마다 최대 한 번만 함수를 실행해요. 움직이는 동안에도 꾸준히 갱신해야 할 때 써요.', '스크롤, 리사이즈, 마우스 이동 이벤트는 1초에 수십 번(약 16 ms마다) 일어나서, 매번 레이아웃을 읽거나 무거운 계산을 하면 화면이 버벅여요. 스로틀은 간격(예: 100 ms)을 정해 그 안에서는 최대 한 번만 실행해요. 첫 이벤트에서 바로 실행하고(leading), 이후로는 100 ms가 지나야 다음 실행을 허락해요. 이벤트가 멈춘 뒤의 마지막 상태를 놓치지 않도록 끝에 한 번 더 실행(trailing)하는 것이 보통이에요. 디바운스와의 차이가 핵심이에요. 디바운스는 이벤트가 멈추고 일정 시간이 지나야 한 번 실행되므로, 계속 스크롤하는 동안에는 한 번도 실행되지 않아요. 그래서 검색어 자동완성처럼 “다 입력한 뒤”에는 디바운스, 스크롤 위치 표시나 무한 스크롤 확인처럼 “움직이는 동안에도 꾸준히”에는 스로틀이 맞아요. 구현은 마지막 실행 시각을 기억해 now − last ≥ ms일 때만 실행하면 되고, trailing을 위해 타이머를 하나 더 둬요. 화면을 그리는 작업이라면 requestAnimationFrame으로 프레임마다 한 번 실행하는 것이 더 자연스럽고, 스크롤을 막지 않는 { passive: true } 리스너, 스크롤 계산 없이 요소가 보이는지 알려 주는 IntersectionObserver도 함께 고려해요. 서버 쪽 레이트 리밋과는 별개로 클라이언트 부하를 줄이는 기법이에요.', 'Run a function at most once per interval, however many events arrive; for updates that must keep flowing during movement.', 'Scroll, resize and mousemove events fire dozens of times a second (about every 16 ms), so reading layout or doing heavy work on each one causes jank. Throttling picks an interval, say 100 ms, and runs at most once within it: the first event runs immediately (leading), and the next run waits until 100 ms have passed, usually with one more trailing run so the final state after the events stop is not lost. The contrast with debouncing is the point: a debounce fires only after events stop for a while, so during continuous scrolling it never runs at all. Debounce suits “after typing finishes” cases such as autocomplete, while throttle suits “keep updating while moving” cases such as scroll indicators and infinite-scroll checks. The implementation remembers the last run time and runs only when now − last ≥ ms, plus a timer for the trailing call. For visual work, running once per frame with requestAnimationFrame is more natural, and { passive: true } listeners that never block scrolling and IntersectionObserver, which reports visibility without scroll math, are worth considering too. It is a client-side load reducer, separate from server-side rate limiting.', sThrottle())]
} };
})();

window.UX = page([
  sec('wb-browser', '브라우저', 'Browser', '브라우저 동작 원리', 'How browsers work',
    '코드가 화면이 되기까지 브라우저 안에서 일어나는 일이에요.', 'What happens inside the browser between code and pixels.', [
    item('wb-render', '렌더링 파이프라인', 'Rendering pipeline', 'HTML은 DOM, CSS는 CSSOM이 되고, 둘을 합친 렌더 트리로 레이아웃 → 페인트 → 합성을 거쳐 화면이 그려져요.', 'CSS는 렌더링을 막고(render-blocking), 동기 script는 파싱을 막아요. CSS는 위에, script는 defer로 두는 이유예요.', 'HTML becomes the DOM, CSS the CSSOM; together they form the render tree, which goes through layout, paint and composite.', 'CSS blocks rendering and synchronous scripts block parsing, which is why CSS goes first and scripts get defer.', sRender()),
    item('wb-reflow', '리플로우 vs 리페인트', 'Reflow vs repaint', '크기·위치를 바꾸면 레이아웃부터 다시 계산(리플로우)하고, 색만 바꾸면 다시 칠하기(리페인트)만 해요. transform·opacity는 합성만 해서 가장 싸요.', '애니메이션은 top/left 대신 transform을 쓰세요. 반복문에서 offsetHeight 읽기와 스타일 쓰기를 섞으면 매번 강제 리플로우가 일어나요.', 'Changing size or position recomputes layout (reflow); changing colour only repaints; transform and opacity only composite and are cheapest.', 'Animate with transform, not top/left. Mixing offsetHeight reads and style writes in a loop forces a reflow every time.', sReflow()),
    item('wb-eventloop', '이벤트 루프', 'Event loop', 'JS는 스레드 하나로 콜 스택을 실행하고, 스택이 비면 마이크로태스크(Promise)를 모두 처리한 뒤 태스크(setTimeout, 이벤트)를 하나씩 꺼내요.', '50ms 넘는 긴 작업은 화면을 멈추게 해요. 무거운 계산은 Web Worker로 보내거나 잘게 쪼개세요. 면접 단골 문제(출력 순서)도 이 규칙이에요.', 'JavaScript runs the call stack on one thread; when it empties, all microtasks (promises) run, then tasks (timers, events) one at a time.', 'Tasks over 50 ms freeze the page; move heavy work to a Web Worker or split it up. Interview “output order” puzzles follow these rules.', sLoop()),
    item('wb-event', '이벤트 전파', 'Event propagation', '이벤트는 바깥(window)에서 대상까지 내려가는 캡처 단계, 대상 단계, 다시 바깥으로 올라가는 버블 단계를 거쳐요.', '리스트 항목마다 리스너를 다는 대신 부모 하나에 달고 event.target으로 구분하는 이벤트 위임이 효율적이에요.', 'Events travel down from the window to the target (capture), hit the target, then bubble back up.', 'Event delegation, one listener on a parent using event.target, beats a listener on every list item.', sEvent()),
    item('wb-storage', '브라우저 저장소', 'Browser storage', '쿠키, localStorage, sessionStorage, IndexedDB는 용량·수명·서버 전송 여부가 달라요.', '로그인 토큰을 localStorage에 두면 XSS 한 번에 털려요. 민감한 값은 HttpOnly·Secure·SameSite 쿠키에 두세요.', 'Cookies, localStorage, sessionStorage and IndexedDB differ in size, lifetime and whether they are sent to the server.', 'A token in localStorage is one XSS away from theft. Keep sensitive values in HttpOnly, Secure, SameSite cookies.', sStorage())
  ].concat(XT.add['wb-browser'] || [])),
  sec('wb-http', 'HTTP 실무', 'HTTP', 'HTTP와 API 실무', 'HTTP and APIs in practice',
    '매일 쓰는 HTTP를 제대로 쓰는 법이에요.', 'Using the HTTP you touch every day properly.', [
    item('wb-status', '상태 코드', 'Status codes', '응답의 첫 숫자가 결과의 종류를 말해요. 2xx 성공, 3xx 이동, 4xx 클라이언트 잘못, 5xx 서버 잘못이에요.', '모니터링·재시도·캐시가 상태 코드로 동작해요. 429는 잠시 후 재시도, 5xx는 서버 알림을 보내는 식으로 처리하세요.', 'The first digit says what kind of result it is: 2xx success, 3xx redirect, 4xx client error, 5xx server error.', 'Monitoring, retries and caching all key off status codes: retry later on 429, alert on 5xx.', sStatus()),
    item('wb-methods', 'HTTP 메서드와 멱등성', 'Methods · Idempotency', 'GET은 조회, POST는 생성, PUT은 전체 교체, PATCH는 일부 수정, DELETE는 삭제예요. 같은 요청을 여러 번 보내도 결과가 같으면 멱등이에요.', '네트워크 오류 때 멱등한 요청은 안전하게 재시도할 수 있어요. 결제처럼 중요한 POST는 Idempotency-Key 헤더로 중복을 막아요.', 'GET reads, POST creates, PUT replaces, PATCH partly updates and DELETE removes. A request is idempotent if repeating it changes nothing further.', 'Idempotent requests can be retried safely after network errors. Protect critical POSTs like payments with an Idempotency-Key.', sMethods()),
    item('wb-cache', 'HTTP 캐시', 'HTTP caching', 'Cache-Control로 얼마나 캐시할지 정하고, 만료 후엔 ETag로 바뀌었는지만 물어 304로 본문 없이 응답받아요.', '빌드 파일명에 해시를 넣고 1년 캐시, HTML은 no-cache로 두는 게 정석이에요. 배포 후 "예전 화면이 보여요"의 원인 대부분이 캐시예요.', 'Cache-Control sets how long to cache; after expiry, an ETag check gets a bodyless 304 if nothing changed.', 'Hash build filenames and cache them for a year; serve HTML with no-cache. Most “I still see the old page” bugs are caching.', sCache()),
    item('wb-cdn', 'CDN', 'CDN · Content delivery network', '전 세계 엣지 서버에 콘텐츠를 복사해 두고, 사용자와 가까운 곳에서 응답해요.', '이미지·JS·영상은 기본으로 CDN에 두세요. 캐시 무효화(purge) 방법과 캐시 키(쿼리스트링·쿠키 포함 여부)를 확인하세요.', 'Copies content to edge servers worldwide and answers from the one nearest the user.', 'Serve images, JS and video from a CDN by default. Know how to purge and what goes into the cache key (query strings, cookies).', sCDN()),
    item('wb-rest', 'REST API 설계', 'REST API design', '자원은 URL(명사)로, 동작은 HTTP 메서드(동사)로 표현하고, 결과는 상태 코드로 알려요.', '복수형 명사, 일관된 에러 형식, 페이지네이션, 버전(/v1) 규칙을 팀에서 정해 두세요. OpenAPI로 문서를 자동화하면 좋아요.', 'Name resources with URLs (nouns), act on them with HTTP methods (verbs) and report results with status codes.', 'Agree on plural nouns, a consistent error format, pagination and versioning (/v1). Generate docs with OpenAPI.', sREST()),
    item('wb-graphql', 'GraphQL vs REST', 'GraphQL vs REST', 'GraphQL은 클라이언트가 필요한 데이터의 모양을 쿼리로 정해 한 번에 받아요. REST는 자원별 엔드포인트를 여러 번 호출해요.', '화면이 다양하고 데이터 관계가 복잡하면 GraphQL이 유리해요. 대신 HTTP 캐시가 어렵고 무거운 쿼리를 제한하는 장치가 필요해요.', 'With GraphQL the client describes the exact shape of data it needs and gets it in one request; REST calls several resource endpoints.', 'GraphQL shines with many screens and rich relations, but HTTP caching gets harder and you must limit expensive queries.', sGQL())
  ].concat(XT.add['wb-http'] || [])),
  sec('wb-front', '프런트엔드', 'Front end', '프런트엔드 렌더링', 'Front-end rendering',
    '화면을 언제, 어디서 그릴지에 대한 선택이에요.', 'Choices about when and where pages are rendered.', [
    item('wb-csr', 'CSR · SSR · SSG', 'CSR · SSR · SSG', 'CSR은 브라우저의 JS가 화면을 그리고, SSR은 요청마다 서버가 HTML을 만들고, SSG는 빌드 때 미리 만들어 둬요.', '로그인 뒤 대시보드는 CSR, 검색 노출이 중요한 페이지는 SSR/SSG가 유리해요. Next.js·Nuxt·Astro는 페이지마다 고를 수 있어요.', 'CSR renders in the browser with JS, SSR renders HTML on the server per request, SSG prebuilds HTML at build time.', 'Dashboards behind login suit CSR; pages that need search traffic suit SSR or SSG. Next.js, Nuxt and Astro let you choose per page.', sCSR()),
    item('wb-hydration', '하이드레이션', 'Hydration', '서버에서 받은 정적 HTML에 JS가 이벤트와 상태를 연결해 상호작용 가능한 앱으로 만드는 과정이에요.', '서버와 클라이언트 렌더 결과가 다르면 하이드레이션 오류가 나요(날짜·랜덤 값 주의). JS가 크면 보이는데 안 눌리는 시간이 길어져요.', 'JavaScript attaches events and state to server-rendered HTML, turning it into an interactive app.', 'Mismatched server and client output causes hydration errors (watch dates and random values). Big bundles lengthen the “visible but dead” window.', sHydr()),
    item('wb-vdom', '가상 DOM과 재조정', 'Virtual DOM · Reconciliation', '상태가 바뀌면 새 가상 DOM을 만들어 이전 것과 비교하고, 달라진 부분만 실제 DOM에 반영해요.', '리스트에는 안정적인 key를 주세요(인덱스 key는 순서가 바뀌면 버그). Svelte·Solid처럼 가상 DOM 없이 컴파일하는 방식도 있어요.', 'Each state change builds a new virtual DOM, diffs it against the old one and patches only the differences into the real DOM.', 'Give list items stable keys (index keys break on reorder). Svelte and Solid skip the virtual DOM by compiling instead.', sVDOM()),
    item('wb-spa', 'SPA와 라우팅', 'SPA · Client-side routing', '페이지를 이동할 때 서버에서 새 HTML을 받지 않고, JS가 본문만 바꾸고 history API로 주소를 바꿔요.', '새로고침 시 404가 나지 않게 서버가 모든 경로에 index.html을 주도록 설정하세요. 스크롤 위치·포커스 복원도 직접 챙겨야 해요.', 'Navigation swaps content with JavaScript and updates the URL through the history API instead of loading new HTML.', 'Configure the server to return index.html for every route so refreshes don’t 404, and handle scroll and focus restoration yourself.', sSPA()),
    item('wb-bundle', '번들링·코드 스플리팅', 'Bundling · Code splitting', '여러 모듈을 몇 개 파일로 묶고, 당장 필요 없는 코드는 따로 떼어 나중에 받고, 쓰지 않는 코드는 빼요(트리 셰이킹).', '라우트별 동적 import()가 가장 쉬운 스플리팅이에요. 큰 라이브러리는 필요한 함수만 import하세요.', 'Combines many modules into a few files, defers code not needed yet and drops unused code (tree shaking).', 'Dynamic import() per route is the easiest split. Import only the functions you need from big libraries.', sBundle()),
    item('wb-lazy', '지연 로딩', 'Lazy loading', '화면에 보일 때가 가까워져서야 이미지·컴포넌트를 불러와 첫 로딩을 가볍게 해요.', 'img에 loading="lazy"만 붙여도 돼요. 단, 첫 화면의 큰 이미지(LCP)는 지연 로딩하면 오히려 느려져요.', 'Loads images and components only as they approach the viewport, making the first load lighter.', 'Adding loading="lazy" to img is enough, but lazy-loading the main above-the-fold image (LCP) makes things slower.', sLazy()),
    item('wb-debounce', '디바운스와 스로틀', 'Debounce · Throttle', '디바운스는 이벤트가 멈춘 뒤 한 번만, 스로틀은 정해진 간격마다 최대 한 번만 실행해요.', '검색어 자동완성 API 호출은 디바운스, 스크롤·리사이즈 처리는 스로틀이 맞아요. 서버 쪽 레이트 리밋과는 별개예요.', 'Debounce runs once after events stop; throttle runs at most once per interval.', 'Debounce search-suggestion API calls; throttle scroll and resize handlers. Server-side rate limiting is a separate concern.', sDebounce())
  ].concat(XT.add['wb-front'] || [])),
  sec('wb-perf', '성능·접근성', 'Performance & a11y', '성능과 접근성', 'Performance and accessibility',
    '빠르고 누구나 쓸 수 있는 웹을 만드는 기준이에요.', 'Standards for a web that is fast and usable by everyone.', [
    item('wb-cwv', 'Core Web Vitals', 'Core Web Vitals', '구글이 정한 사용자 경험 지표로, LCP(로딩), INP(반응성), CLS(시각 안정성) 세 가지예요.', '랩 측정(Lighthouse)과 실사용자 측정(CrUX, RUM)이 다를 수 있어요. 실제 사용자 데이터를 기준으로 개선하세요.', 'Google’s user-experience metrics: LCP for loading, INP for responsiveness and CLS for visual stability.', 'Lab tools (Lighthouse) and field data (CrUX, RUM) can disagree; optimize against real-user data.', sCWV()),
    item('wb-a11y', '웹 접근성', 'Web accessibility', '시각·운동 장애가 있거나 키보드·스크린 리더를 쓰는 사람도 같은 정보와 기능을 쓸 수 있게 만드는 거예요.', 'div 대신 button·a 같은 시맨틱 태그, 이미지 alt, 4.5:1 명도 대비, 보이는 포커스 표시가 기본이에요. 공공·금융 서비스는 법적 의무예요.', 'Making the same information and functions usable by people with visual or motor impairments, keyboards or screen readers.', 'Use semantic tags (button, a) instead of divs, alt text, 4.5:1 contrast and visible focus. It is a legal requirement for many public and financial services.', sA11y()),
    item('wb-sw', '서비스 워커 · PWA', 'Service worker · PWA', '페이지와 네트워크 사이에서 요청을 가로채는 백그라운드 스크립트로, 캐시를 이용해 오프라인에서도 동작하게 해요.', '캐시 전략(캐시 우선, 네트워크 우선)을 자원마다 골라요. 업데이트가 안 되는 문제가 흔하니 버전 관리와 갱신 흐름을 꼭 설계하세요.', 'A background script that intercepts requests between the page and network, using a cache so the app works offline.', 'Pick a cache strategy (cache-first, network-first) per resource. Stale updates are a common trap, so design versioning and refresh flows.', sSW())
  ].concat(XT.add['wb-perf'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.wb-m .in{font-family:var(--f-mono);font-size:.64em;font-weight:600}
.wb-xs .in{font-size:.54em}
.wb-code{place-items:center start!important;padding-left:.6em}
.wb-code .in{font-family:var(--f-mono);font-size:.56em}
.wb-b .in{font-weight:800;color:var(--ink);font-size:.78em}
.wb-big .in{font-size:1.05em;font-weight:900}
.wb-big2 .in{font-size:1.6em;font-weight:900;color:var(--ink)}`;
})();
