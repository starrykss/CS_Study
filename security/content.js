(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, link, AR, item, sec, page, C, seq } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const show = (S, keys, st, extra) => keys.forEach(k => S.set(k, st, Object.assign({ opacity: '1' }, extra || {})));
function fly(S, k, a, b, st, lab, sty, o = {}) {
  const r = o.r || .8;
  dot(S, k, a[0], a[1], lab || '', { r, s: hid(sty || C.cur) });
  S.set(k, st, { opacity: '1' }).move(k, st, b[0] - r, b[1] - r);
  if (!o.keep && st + 1 <= S.n) S.set(k, st + 1, { opacity: '0' });
  return S;
}
const KEYG = { background: 'color-mix(in srgb,var(--ok) 20%,var(--ui))', color: 'var(--ink)', 'border-color': 'var(--ok)' };
const KEYR = { background: 'var(--danger-soft)', color: 'var(--danger)', 'border-color': 'var(--danger)' };
const key = (S, k, x, y, lab, st, o = {}) => pill(S, k, x, y, lab, { w: o.w || 5.6, h: 1.8, cls: 'cz-pill cz-mono', s: Object.assign({}, o.hide ? { opacity: '0' } : {}, st) });

/* ---------- cryptography ---------- */
function sHash() {
  const S = scene({ id: 'sc-hash', steps: 5, per: 1.3 });
  box(S, 'fn', 12, 6.6, 8, 4.6, ['해시 함수', 'Hash function'], { s: C.soft });
  S.label('in', { cls: 'cz-c sc-m', x: 1.2, y: 7.8, w: 8.4, h: 2.4 }, [[0, '"hello"'], [3, '"hellp"']]);
  arrow(S, 'a1', 9.8, 9, 11.8, 9); arrow(S, 'a2', 20.2, 9, 22.2, 9);
  S.label('out', { cls: 'cz-c sc-m', x: 22.4, y: 7.8, w: 8.6, h: 2.4 }, [[0, ''], [1, '2cf24dba…'], [3, ''], [4, 'f1a8c37e…']]);
  Object.assign(S.get('out~3').s, C.cmp);
  text(S, 'ln', 13, 12, ['항상 같은 길이 (SHA-256: 64자)', 'always the same length (64 hex)'], { cls: 'cz-t', s: hid() }); S.set('ln', 2, { opacity: '1' });
  arrow(S, 'back', 22, 14.6, 10, 14.6, { s: hid(AR.red) }); text(S, 'bx', 11, 15.4, ['결과로 입력을 되돌릴 수 없어요 ✗', 'cannot reverse the output ✗'], { cls: 'cz-t', s: hid() }); show(S, ['back', 'bx'], 5);
  S.cap(1, '어떤 입력이든 고정 길이의 지문이 나와요', 'Any input gives a fixed-length fingerprint').cap(3, '한 글자만 바꿔도', 'Change one letter')
    .cap(4, '결과가 완전히 달라져요 (눈사태 효과)', 'and the output changes completely (avalanche)').cap(5, '파일 무결성 확인, git 커밋 ID, 비밀번호 저장에 써요', 'Used for integrity checks, git commit ids and passwords');
  return S;
}
function sSym() {
  const S = scene({ id: 'sc-sym', steps: 5, per: 1.25 });
  box(S, 'al', 1, 3, 7, 3.4, 'Alice'); box(S, 'bo', 24, 3, 7, 3.4, 'Bob');
  key(S, 'k1', 1.7, 7.2, ['키 K', 'key K'], C.cmp); key(S, 'k2', 24.7, 7.2, ['키 K', 'key K'], C.cmp);
  text(S, 'same', 10, 7.4, ['같은 키를 미리 나눠 가져야 해요', 'both must already share the key'], { cls: 'cz-t' });
  const msg = (k, x, lab, st) => cell(S, k, x, 12, lab, { w: 7.6, h: 2.4, cls: 'cz-c sc-m', s: st });
  msg('m1', 1, '"hello"', {}); msg('m2', 1, '8f3a1c…', hid(C.cmp)); msg('m3', 23.4, '"hello"', hid(C.ok));
  S.set('m1', 1, { opacity: '0' }).set('m2', 1, { opacity: '1' }).set('k1', 1, C.warn);
  S.move('m2', 2, 12.2, 12); S.move('m2', 3, 23.4, 12).set('m2', 4, { opacity: '0' }).set('m3', 4, { opacity: '1' }).set('k2', 4, C.warn);
  text(S, 'eve', 11.2, 16.4, ['중간에선 의미 없는 값', 'gibberish in transit'], { cls: 'cz-t', s: hid() }); S.set('eve', 2, { opacity: '1' }).set('eve', 4, { opacity: '0' });
  S.cap(1, '키로 잠가(암호화) 보내고', 'Lock (encrypt) with the key').cap(3, '받는 쪽은', 'and the receiver').cap(4, '같은 키로 열어요 (복호화)', 'unlocks it with the same key')
    .cap(5, 'AES처럼 빠르지만, 키를 안전하게 전달하는 게 문제', 'Fast (e.g. AES), but how do you share the key safely?');
  return S;
}
function sPK() {
  const S = scene({ id: 'sc-pk', steps: 6, per: 1.2 });
  box(S, 'al', 1, 2.4, 7, 3.4, 'Alice'); box(S, 'bo', 24, 2.4, 7, 3.4, 'Bob'); box(S, 'ev', 12.5, 15.4, 7, 3.4, ['도청자 Eve', 'Eve (attacker)'], { s: C.bad });
  key(S, 'pub', 24.7, 6.6, ['공개키', 'public'], KEYG); key(S, 'prv', 24.7, 8.8, ['개인키', 'private'], KEYR);
  text(S, 'pn', 24.7, 11, ['개인키는 나만 보관', 'private never leaves'], { cls: 'cz-t', s: hid() }); S.set('pn', 1, { opacity: '1' });
  key(S, 'pubA', 24.7, 6.6, ['공개키', 'public'], KEYG, { hide: 1 }); S.set('pubA', 2, { opacity: '1' }).move('pubA', 2, 1.7, 6.6);
  cell(S, 'm', 1, 10.2, '"hi"', { w: 7, h: 2.4, cls: 'cz-c sc-m', s: hid() }); S.set('m', 3, { opacity: '1' });
  cell(S, 'c', 1, 10.2, '9x#2…', { w: 7, h: 2.4, cls: 'cz-c sc-m', s: hid(C.cmp) });
  S.set('m', 4, { opacity: '0' }).set('c', 4, { opacity: '1' }).move('c', 5, 24, 13.2);
  arrow(S, 'tap', 16, 13.6, 16, 15.2, { s: hid(AR.red) }); text(S, 'et', 20, 16.3, ['못 풀어요 ✗', 'can’t read ✗'], { cls: 'cz-t', s: hid() }); show(S, ['tap', 'et'], 5);
  S.label('bm', { cls: 'cz-t sc-b', x: 24, y: 16, w: 8 }, [[0, ''], [6, ['"hi" ✓', '"hi" ✓']]]);
  S.set('prv', 6, C.badf).set('c', 6, C.ok);
  S.cap(0, '키를 두 개 한 쌍으로 만들어요', 'Keys come in a pair').cap(1, '공개키는 누구에게나, 개인키는 나만', 'The public key is shared; the private key stays secret')
    .cap(2, 'Alice가 Bob의 공개키를 받아', 'Alice takes Bob’s public key').cap(4, '그 키로 암호화하면', 'and encrypts with it').cap(5, '중간에서 가로채도 풀 수 없고', 'Anyone intercepting can’t decrypt')
    .cap(6, 'Bob의 개인키로만 열려요 · RSA·ECC, HTTPS의 기반', 'Only Bob’s private key opens it · RSA, ECC, the basis of HTTPS');
  return S;
}
function sSign() {
  const S = scene({ id: 'sc-sign', steps: 6, per: 1.2 });
  box(S, 'al', 1, 2, 7, 3.2, 'Alice'); key(S, 'prv', 1.7, 5.8, ['개인키', 'private'], KEYR);
  box(S, 'bo', 24, 2, 7, 3.2, 'Bob'); key(S, 'pub', 24.7, 5.8, ['A의 공개키', 'A’s public'], KEYG, { w: 6.2 });
  S.label('doc', { cls: 'cz-c sc-m', x: 10.5, y: 9, w: 11, h: 3 }, [[0, ['"100만원 송금"', '"pay $100"']], [5, ['"900만원 송금"', '"pay $900"']]]);
  Object.assign(S.get('doc~1').s, C.bad);
  pill(S, 'sig', 11.5, 12.6, ['서명 7f3e…', 'signature 7f3e…'], { w: 9, h: 1.9, cls: 'cz-pill cz-mono', s: hid(KEYR) });
  S.set('prv', 1, C.badf).set('sig', 1, { opacity: '1' }).set('prv', 2, KEYR);
  S.label('v', { cls: 'cz-t sc-b', x: 10.5, y: 16.4, w: 14 }, [[0, ''], [3, ['검증 ✓ Alice가 쓴 게 맞아요', 'verified ✓ it’s from Alice']], [5, ''], [6, ['검증 실패 ✗ 변조됨', 'verification fails ✗ tampered']]]);
  S.set('pub', 3, C.okf).set('pub', 4, KEYG).set('pub', 6, C.badf);
  S.cap(1, '문서의 해시를 개인키로 서명해요', 'Sign the document’s hash with the private key').cap(2, '문서와 서명을 함께 보내면', 'Send the document with the signature')
    .cap(3, '공개키로 누가 썼는지 확인돼요', 'The public key proves who wrote it').cap(5, '중간에 내용이 바뀌면', 'If the content is altered…').cap(6, '서명이 맞지 않아 바로 들켜요 · 코드 서명, JWT, 블록체인', 'the signature no longer matches · code signing, JWT, blockchains');
  return S;
}
function sDH() {
  const S = scene({ id: 'sc-dh', steps: 5, per: 1.4 });
  const col = (k, x, y, c, st, lab) => { S.el(k, { x, y, w: 3.6, h: 3.6, css: `border-radius:50%;border:.14em solid rgba(0,0,0,.15);background:${c}`, s: st === 0 ? {} : { opacity: '0' } }); if (st) S.set(k, st, { opacity: '1' }); if (lab) text(S, k + 'l', x - 1.5, y + 3.9, lab, { w: 6.6, cls: 'cz-t cz-tc', s: st === 0 ? {} : hid() }); if (lab && st) S.set(k + 'l', st, { opacity: '1' }); };
  text(S, 'ta', 1.5, .8, 'Alice', { cls: 'cz-t sc-b' }); text(S, 'tb', 26, .8, 'Bob', { cls: 'cz-t sc-b' });
  col('pub', 14.2, 1.4, '#f2d14b', 0, ['공개 색', 'public']);
  col('as', 2, 3, '#e0503f', 0, ['A의 비밀', 'A secret']); col('bs', 26.4, 3, '#3f7fe0', 0, ['B의 비밀', 'B secret']);
  col('am', 2, 10, '#ea8f45', 1, ['섞은 색', 'mixed']); col('bm', 26.4, 10, '#8fb08d', 1, ['섞은 색', 'mixed']);
  S.move('am', 2, 26.4, 10).move('bm', 2, 2, 10); S.set('aml', 2, { opacity: '0' }).set('bml', 2, { opacity: '0' });
  text(S, 'ex', 9, 11.2, ['섞인 색만 공개적으로 교환', 'only mixtures are exchanged'], { cls: 'cz-t', s: hid() }); S.set('ex', 2, { opacity: '1' }).set('ex', 3, { opacity: '0' });
  col('af', 2, 15.6, '#8a5a3c', 3, ['같은 비밀 색!', 'same secret!']); col('bf', 26.4, 15.6, '#8a5a3c', 3, ['같은 비밀 색!', 'same secret!']);
  text(S, 'ev', 9.6, 17, ['도청자는 섞인 색만 봐서 못 만들어요', 'an eavesdropper can’t unmix'], { cls: 'cz-t', s: hid() }); S.set('ev', 4, { opacity: '1' });
  S.cap(0, '공개된 색 + 각자의 비밀 색', 'A public colour plus each side’s secret').cap(1, '각자 섞어서', 'Each mixes them').cap(2, '섞은 것만 교환해요', 'and they swap only the mixtures')
    .cap(3, '받은 것에 자기 비밀을 더하면 같은 색이 돼요', 'Adding their own secret gives both the same colour').cap(5, '키를 보내지 않고도 같은 키를 만드는 방법 · TLS의 ECDHE', 'A shared key without ever sending it · ECDHE in TLS');
  return S;
}
function sCert() {
  const S = scene({ id: 'sc-cert', steps: 5, per: 1.3 });
  const B = [['root', 3, ['루트 CA (브라우저에 내장)', 'Root CA (built into browser)']], ['mid', 9, ['중간 CA', 'Intermediate CA']], ['leaf', 15, ['example.com 인증서', 'example.com certificate']]];
  B.forEach(([k, y, l]) => box(S, k, 6, y, 20, 3.6, l));
  arrow(S, 'a1', 16, 6.8, 16, 8.8); arrow(S, 'a2', 16, 12.8, 16, 14.8);
  text(S, 's1', 17, 7.2, ['서명함', 'signs'], { cls: 'cz-t' }); text(S, 's2', 17, 13.2, ['서명함', 'signs'], { cls: 'cz-t' });
  S.set('leaf', 1, C.cmp).set('leaf', 2, C.ok).set('mid', 2, C.cmp).set('mid', 3, C.ok).set('root', 3, C.cmp).set('root', 4, C.ok);
  S.label('chk', { cls: 'cz-t', x: 1, y: 19.2, w: 30 }, [[0, ''], [1, ['도메인 이름·유효 기간 확인', 'check domain name and expiry']], [2, ['중간 CA의 서명이 맞는지', 'verify the intermediate’s signature']], [3, ['믿는 루트까지 이어지는지', 'chain up to a trusted root']], [4, ['신뢰 ✓ · 연결 진행', 'trusted ✓ · continue']]]);
  S.cap(0, '서버가 인증서 묶음(체인)을 보내요', 'The server sends its certificate chain').cap(1, '브라우저는 아래부터 차례로', 'The browser checks from the bottom up')
    .cap(3, '내장된 루트 CA까지 서명이 이어지면', 'If signatures lead to a built-in root').cap(4, '진짜 example.com이라고 믿어요', 'it trusts this is the real example.com').cap(5, '만료·도메인 불일치·사설 인증서면 경고가 떠요', 'Expired, mismatched or self-signed certs trigger warnings');
  return S;
}
function sPw() {
  const S = scene({ id: 'sc-pwhash', steps: 4, per: 1.5 });
  text(S, 'h', 1.2, 1.4, ['두 사용자가 같은 비밀번호 "qwerty"를 써요', 'Two users share the password "qwerty"'], { cls: 'cz-t' });
  const rows = [['plain', ['평문 저장', 'Plain text'], ['qwerty', 'qwerty'], C.bad, 1], ['md5', ['해시만 (MD5)', 'Hash only (MD5)'], ['d8578edf…', 'd8578edf…'], C.cmp, 2], ['bc', ['솔트 + bcrypt', 'Salt + bcrypt'], ['$2b$12$Xa9…', '$2b$12$Qm1…'], C.ok, 3]];
  rows.forEach(([k, l, [a, b], st, s], i) => {
    const y = 3.6 + i * 5.2;
    text(S, k + 'l', 1.2, y + .7, l, { cls: 'cz-t sc-b', s: hid() });
    cell(S, k + 'a', 10.4, y, a, { w: 10, h: 2, cls: 'cz-c sc-m', s: hid(st) }); cell(S, k + 'b', 10.4, y + 2.3, b, { w: 10, h: 2, cls: 'cz-c sc-m', s: hid(st) });
    show(S, [k + 'l', k + 'a', k + 'b'], s);
  });
  S.label('n1', { cls: 'cz-t', x: 21.2, y: 4.4, w: 10 }, [[0, ''], [1, ['DB 유출 = 즉시 노출', 'leak = exposed']]]);
  S.label('n2', { cls: 'cz-t', x: 21.2, y: 9.6, w: 10 }, [[0, ''], [2, ['같은 값 → 미리 계산한 표로 해독', 'same value → rainbow tables']]]);
  S.label('n3', { cls: 'cz-t', x: 21.2, y: 14.8, w: 10 }, [[0, ''], [3, ['값이 달라지고 일부러 느려요', 'unique and deliberately slow']]]);
  S.cap(1, '절대 그대로 저장하면 안 돼요', 'Never store passwords as they are').cap(2, '빠른 해시는 같은 비밀번호가 같은 값이 돼서 위험', 'Fast hashes give identical results: crackable')
    .cap(3, '사용자마다 다른 솔트 + 느린 해시', 'A per-user salt and a slow hash').cap(4, 'bcrypt·scrypt·Argon2를 쓰세요 · 직접 만들지 마세요', 'Use bcrypt, scrypt or Argon2; never roll your own');
  return S;
}

/* ---------- authentication & authorization ---------- */
function sAuthn() {
  const S = scene({ id: 'sc-authn', steps: 5, per: 1.3 });
  box(S, 'g1', 9.5, 2.4, 6.4, 6, ['인증', 'Authentication'], { css: 'align-items:start;padding-top:.6em' }); text(S, 'g1q', 9.5, 5.6, ['누구세요?', 'who are you?'], { w: 6.4, cls: 'cz-t cz-tc' });
  box(S, 'g2', 20.5, 2.4, 6.4, 6, ['인가', 'Authorization'], { css: 'align-items:start;padding-top:.6em' }); text(S, 'g2q', 20.5, 5.6, ['뭘 할 수 있죠?', 'what may you do?'], { w: 6.4, cls: 'cz-t cz-tc' });
  dot(S, 'u', 3, 5.4, 'Kim', { r: 1.3, s: C.cur });
  S.move('u', 1, 12.7 - 1.3, 11.4 - 1.3).set('g1', 1, C.ok);
  S.move('u', 2, 23.7 - 1.3, 11.4 - 1.3).set('g2', 2, C.ok);
  pill(S, 'r1', 18, 14.4, ['게시글 읽기 ✓', 'read posts ✓'], { w: 11.4, h: 1.9, s: hid(C.ok) }); S.set('r1', 2, { opacity: '1' });
  pill(S, 'r2', 18, 16.8, ['관리자 페이지 ✗ 403', 'admin page ✗ 403'], { w: 11.4, h: 1.9, s: hid(C.bad) }); S.set('r2', 3, { opacity: '1' }).set('g2', 3, C.bad);
  pill(S, 'r0', 3.6, 14.4, ['로그인 안 함 → 401', 'not logged in → 401'], { w: 11, h: 1.9, s: hid(C.cmp) }); S.set('r0', 4, { opacity: '1' });
  S.cap(1, '인증: 신원을 확인해요 (비밀번호·지문·OTP)', 'Authentication proves identity (password, fingerprint, OTP)').cap(2, '인가: 그 사람이 할 수 있는 일을 정해요', 'Authorization decides what that person may do')
    .cap(3, '인증은 됐지만 권한이 없으면 403 Forbidden', 'Known but not allowed: 403 Forbidden').cap(4, '누군지 모르면 401 Unauthorized', 'Unknown: 401 Unauthorized').cap(5, '권한 검사는 반드시 서버에서', 'Always enforce permissions on the server');
  return S;
}
function sSession() {
  const S = scene({ id: 'sc-session', steps: 5, per: 1.35 });
  text(S, 'l1', 1, 1.4, ['세션 방식', 'Session'], { cls: 'cz-t sc-b' }); text(S, 'l2', 1, 11.4, ['토큰 방식 (JWT)', 'Token (JWT)'], { cls: 'cz-t sc-b' });
  box(S, 'b1', 1, 3, 8, 4.4, ['브라우저', 'Browser']); box(S, 's1', 23, 3, 8, 4.4, ['서버', 'Server']);
  key(S, 'ck', 1.6, 7.9, 'sid=abc', C.soft, { w: 6.8, hide: 1 });
  cell(S, 'store', 23, 7.9, 'abc → user 7', { w: 8, h: 2, cls: 'cz-c sc-m', s: hid(C.cmp) });
  S.set('store', 1, { opacity: '1' }).set('ck', 1, { opacity: '1' });
  fly(S, 'q1', [9.4, 5.2], [22.6, 5.2], 2, '', C.cur); S.set('store', 2, C.ok);
  box(S, 'b2', 1, 13, 8, 4.4, ['브라우저', 'Browser']); box(S, 's2', 23, 13, 8, 4.4, ['서버', 'Server']);
  key(S, 'jw', 1, 17.9, 'eyJhbGci…', C.soft, { w: 8, hide: 1 }); S.set('jw', 3, { opacity: '1' });
  fly(S, 'q2', [9.4, 15.2], [22.6, 15.2], 4, '', C.cur); S.set('s2', 4, C.ok);
  text(S, 'n2', 23, 17.9, ['서명만 확인 · 저장소 없음', 'just verify signature'], { cls: 'cz-t', s: hid() }); S.set('n2', 4, { opacity: '1' });
  S.cap(1, '세션: 서버가 로그인 정보를 저장하고 열쇠(쿠키)만 줘요', 'Session: the server stores login state and hands out a cookie').cap(2, '요청마다 서버 저장소를 조회', 'Each request looks up the store')
    .cap(3, '토큰: 정보를 담은 서명된 토큰을 줘요', 'Token: hand out a signed token carrying the data').cap(4, '서버는 서명만 확인 · 서버가 늘어도 공유 저장소가 필요 없어요', 'The server just checks the signature, no shared store')
    .cap(5, '대신 토큰은 발급 후 강제로 취소하기 어려워요 · 짧은 만료 + 리프레시 토큰', 'But tokens are hard to revoke: short expiry + refresh tokens');
  return S;
}
function sJWT() {
  const S = scene({ id: 'sc-jwt', steps: 5, per: 1.35 });
  const P = [['h', 1, 7, 'eyJhbGci', C.bad], ['p', 8.4, 11, 'eyJzdWIiOjd9', { background: 'var(--accent-soft)', color: 'var(--ink)', 'border-color': 'var(--accent)' }], ['s', 20.8, 10.2, 'SflKxwRJSMeK', C.ok]];
  P.forEach(([k, x, w, t, st], i) => { cell(S, k, x, 2.6, t, { w, h: 2.4, cls: 'cz-c sc-m', s: st }); if (i < 2) text(S, 'd' + i, x + w + .1, 2.8, '.', { cls: 'cz-t sc-b' }); });
  const L = [['h', 1, 7, ['헤더: 알고리즘', 'header: alg']], ['p', 8.4, 11, ['페이로드: 데이터', 'payload: claims']], ['s', 20.8, 10.2, ['서명', 'signature']]];
  L.forEach(([k, x, w, l]) => text(S, 'l' + k, x, 5.3, l, { w, cls: 'cz-t cz-tc' }));
  S.label('dec', { cls: 'cz-c sc-m', x: 8.4, y: 8.4, w: 11, h: 3.4 }, [[0, ''], [1, '{"sub":7,"role":"user"}'], [3, '{"sub":7,"role":"admin"}']]);
  Object.assign(S.get('dec~0').s, { opacity: '0' }); Object.assign(S.get('dec~2').s, C.bad);
  text(S, 'n1', 8.4, 12.3, ['Base64일 뿐 · 누구나 읽어요 (암호화 아님)', 'just Base64: anyone can read it'], { cls: 'cz-t', s: hid() }); S.set('n1', 2, { opacity: '1' }).set('n1', 3, { opacity: '0' });
  text(S, 'n3', 8.4, 12.3, ['공격자가 role을 바꾸면', 'an attacker edits the role'], { cls: 'cz-t', s: hid() }); S.set('n3', 3, { opacity: '1' });
  pill(S, 'v', 8.4, 15.6, ['서명 불일치 → 거부 ✗', 'signature mismatch → rejected ✗'], { w: 15, h: 2, s: hid(C.bad) }); S.set('v', 4, { opacity: '1' }).set('s', 4, C.badf);
  S.cap(0, 'JWT = 헤더.페이로드.서명', 'A JWT is header.payload.signature').cap(1, '가운데에 사용자 정보가 들어 있어요', 'The middle holds the user claims').cap(2, '비밀번호 같은 민감 정보는 넣지 마세요', 'Never put secrets like passwords in it')
    .cap(3, '내용을 바꾸면', 'Change the content').cap(4, '서버 키로 만든 서명과 맞지 않아 위조가 막혀요', 'and it no longer matches the server-key signature').cap(5, 'alg: none 허용, 약한 비밀키 같은 설정 실수를 조심하세요', 'Beware config mistakes like alg: none or weak secrets');
  return S;
}
function sOAuth() {
  return seq('sc-oauth', [['사용자', 'User'], ['우리 앱', 'Our app'], ['구글 로그인', 'Google auth'], ['구글 API', 'Google API']], [
    { f: 0, t: 1, l: ['구글로 로그인', 'Sign in with Google'], cap: ['사용자가 소셜 로그인을 누르면', 'The user clicks “Sign in with Google”'] },
    { f: 1, t: 2, l: ['구글로 보냄 (redirect)', 'redirect to Google'], cap: ['앱은 비밀번호를 받지 않고 구글로 보내요', 'The app never sees the password'] },
    { f: 0, t: 2, l: ['로그인 + 권한 동의', 'log in + consent'], cap: ['구글에서 로그인하고 권한에 동의', 'The user logs in at Google and consents'] },
    { f: 2, t: 1, l: ['인가 코드', 'auth code'], cap: ['일회용 코드를 앱에 돌려줘요', 'Google returns a one-time code'] },
    { f: 1, t: 2, l: ['코드 + 시크릿', 'code + secret'], cap: ['서버끼리 코드를 토큰으로 교환', 'Servers swap the code for a token'] },
    { f: 2, t: 1, l: 'access token', c: 'ok' },
    { f: 1, t: 3, l: ['토큰으로 요청', 'call with token'], c: 'accent', cap: ['허락된 범위(scope)만 접근해요 · 로그인 정보는 OIDC', 'Access only the granted scope · login identity comes via OIDC'] }
  ], { aw: 6.2, mx: 1.2, per: 1.1, gap: 2.4 });
}
function sMFA() {
  const S = scene({ id: 'sc-mfa', steps: 6, per: 1.15 });
  text(S, 'l1', 1, 1.6, ['사용자', 'User'], { cls: 'cz-t sc-b' }); text(S, 'l2', 1, 11.6, ['비밀번호를 훔친 공격자', 'Attacker with a stolen password'], { cls: 'cz-t sc-b' });
  const lane = (p, y, ok) => {
    cell(S, p + 'pw', 1, y, ['비밀번호 ✓', 'password ✓'], { w: 8.6, h: 2.6, cls: 'cz-c sc-m', s: hid(C.ok) });
    cell(S, p + 'otp', 11.6, y, ok ? '482 913 ✓' : ['코드 없음 ✗', 'no code ✗'], { w: 8.6, h: 2.6, cls: 'cz-c sc-m', s: hid(ok ? C.ok : C.bad) });
    pill(S, p + 'r', 22.4, y + .3, ok ? ['로그인 성공', 'signed in'] : ['차단', 'blocked'], { w: 8.6, h: 2, s: hid(ok ? C.okf : C.badf) });
    arrow(S, p + 'a1', 9.8, y + 1.3, 11.4, y + 1.3); arrow(S, p + 'a2', 20.4, y + 1.3, 22.2, y + 1.3);
  };
  lane('u', 3.4, 1); lane('x', 13.4, 0);
  S.set('upw', 1, { opacity: '1' }).set('uotp', 2, { opacity: '1' }).set('ur', 3, { opacity: '1' });
  S.set('xpw', 4, { opacity: '1' }).set('xotp', 5, { opacity: '1' }).set('xr', 6, { opacity: '1' });
  text(S, 'k1', 1, 6.4, ['아는 것', 'something you know'], { w: 8.6, cls: 'cz-t cz-tc' }); text(S, 'k2', 11.6, 6.4, ['가진 것 (휴대폰)', 'something you have'], { w: 8.6, cls: 'cz-t cz-tc' });
  S.cap(1, '비밀번호(아는 것)에', 'A password (something you know)').cap(2, '휴대폰 코드(가진 것)까지 확인', 'plus a phone code (something you have)')
    .cap(4, '비밀번호가 유출돼도', 'Even with a leaked password').cap(6, '두 번째 요소가 없으면 못 들어와요 · 패스키·보안 키가 가장 강해요', 'no second factor, no entry · passkeys and security keys are strongest');
  return S;
}
function sRBAC() {
  const S = scene({ id: 'sc-rbac', steps: 4, per: 1.5 });
  const U = [['Kim', 4], ['Lee', 10], ['Park', 16]], R = [['Admin', 4], ['Editor', 10], ['Viewer', 16]], P = [[['삭제', 'delete'], 4], [['수정', 'edit'], 10], [['읽기', 'read'], 16]];
  text(S, 'hu', 2, 1.2, ['사용자', 'Users'], { cls: 'cz-t' }); text(S, 'hr', 13, 1.2, ['역할', 'Roles'], { cls: 'cz-t' }); text(S, 'hp', 24, 1.2, ['권한', 'Permissions'], { cls: 'cz-t' });
  U.forEach(([n, y], i) => box(S, 'u' + i, 2, y - 1.3, 6, 2.6, n));
  R.forEach(([n, y], i) => box(S, 'r' + i, 13, y - 1.3, 6, 2.6, n, { cls: 'cz-box cz-bx cz-mono' }));
  P.forEach(([n, y], i) => box(S, 'p' + i, 24, y - 1.3, 6, 2.6, n));
  [[0, 0], [1, 1], [2, 2]].forEach(([u, r], i) => link(S, 'ur' + i, [8, U[u][1]], [13, R[r][1]], 0, .1, { s: { opacity: '.5' } }));
  const RP = [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2]];
  RP.forEach(([r, p], i) => link(S, 'rp' + i, [19, R[r][1]], [24, P[p][1]], 0, .1, { s: { opacity: '.35' } }));
  S.set('u1', 1, C.soft).set('ur1', 1, Object.assign({ opacity: '1' }, AR.acc)).set('r1', 2, C.soft);
  S.set('rp3', 2, Object.assign({ opacity: '1' }, AR.acc)).set('rp4', 2, Object.assign({ opacity: '1' }, AR.acc)).set('p1', 2, C.ok).set('p2', 2, C.ok).set('p0', 3, C.bad);
  S.cap(0, '사람에게 권한을 직접 주지 않고 역할을 줘요', 'Give people roles, not individual permissions').cap(1, 'Lee는 Editor', 'Lee is an Editor').cap(2, 'Editor는 수정·읽기 가능', 'Editors may edit and read')
    .cap(3, '삭제는 못 해요 · 필요한 최소 권한만 (최소 권한 원칙)', 'but not delete: least privilege').cap(4, '사람이 바뀌어도 역할만 바꾸면 돼요 · 더 세밀하면 ABAC', 'Staff changes become role changes · finer rules use ABAC');
  return S;
}

/* ---------- web attacks ---------- */
function sSQLi() {
  const S = scene({ id: 'sc-sqli', steps: 5, per: 1.4 });
  text(S, 't', 1, 1.2, ['코드: 문자열을 이어 붙여 쿼리를 만들어요', 'code: the query is built by string concatenation'], { cls: 'cz-t' });
  cell(S, 'tpl', 1, 2.6, `"SELECT * FROM users WHERE name = '" + input + "'"`, { w: 30, h: 2.2, cls: 'cz-c sc-code' });
  S.label('in', { cls: 'cz-c sc-m', x: 1, y: 6.2, w: 30, h: 2.2 }, [[0, ''], [1, "input = Kim"], [2, "input = ' OR '1'='1"], [4, "input = ' OR '1'='1"]]);
  Object.assign(S.get('in~0').s, { opacity: '0' }); Object.assign(S.get('in~2').s, C.bad);
  S.label('q', { cls: 'cz-c sc-code', x: 1, y: 9.8, w: 30, h: 2.2 }, [[0, ''], [1, "… WHERE name = 'Kim'"], [2, "… WHERE name = '' OR '1'='1'"], [4, ["… WHERE name = ?   ← 값은 따로 전달", "… WHERE name = ?   ← value sent separately"]]]);
  Object.assign(S.get('q~0').s, { opacity: '0' }); Object.assign(S.get('q~2').s, C.bad); Object.assign(S.get('q~3').s, C.ok);
  for (let i = 0; i < 4; i++) { cell(S, 'r' + i, 1 + i * 7.6, 13.8, ['user', 'user'].map(t => t + (i + 1)), { w: 7, h: 2.2, cls: 'cz-c sc-m', s: hid() }); }
  S.set('r0', 1, Object.assign({ opacity: '1' }, C.ok)).set('r0', 2, C.bad); [1, 2, 3].forEach(i => S.set('r' + i, 2, Object.assign({ opacity: '1' }, C.bad)));
  [0, 1, 2, 3].forEach(i => S.set('r' + i, 4, { opacity: '0' }));
  text(S, 'safe', 1, 14.2, ["\"' OR '1'='1\"이라는 이름을 그대로 찾아요 → 0건", "searches for the literal name → 0 rows"], { cls: 'cz-t', s: hid() }); S.set('safe', 4, { opacity: '1' });
  S.cap(1, '정상 입력이면 문제없지만', 'Normal input works fine').cap(2, '따옴표로 쿼리를 깨면 조건이 항상 참이 돼요', 'A quote breaks out and the condition is always true')
    .cap(3, '모든 사용자 정보가 유출돼요', 'Every user’s data leaks').cap(4, 'Prepared Statement: 입력을 코드가 아닌 값으로만 다뤄요', 'Prepared statements treat input as data, never code')
    .cap(5, 'ORM도 문자열로 쿼리를 조립하면 똑같이 위험해요', 'ORMs are just as vulnerable if you build raw strings');
  return S;
}
function sXSS() {
  const S = scene({ id: 'sc-xss', steps: 6, per: 1.2 });
  box(S, 'at', 1, 2, 7, 3.2, ['공격자', 'Attacker'], { s: C.bad }); box(S, 'site', 12, 2, 8, 9, '', {}); text(S, 'st', 12.6, 2.4, ['게시판', 'Board'], { cls: 'cz-t sc-b' }); box(S, 'vi', 24, 2, 7, 3.2, ['방문자', 'Visitor']);
  cell(S, 'cm', 12.6, 4.6, '&lt;script&gt;steal()&lt;/script&gt;', { w: 6.8, h: 2.4, cls: 'cz-c sc-m sc-xs', s: hid(C.bad) });
  fly(S, 'p', [8.4, 3.6], [12.4, 5.8], 1, '', C.badf); S.set('cm', 2, { opacity: '1' });
  fly(S, 'v', [20.4, 5.8], [23.6, 3.6], 3, '', C.cmp); S.set('vi', 3, C.bad);
  fly(S, 'ck', [27.5, 5.4], [4.5, 5.4], 4, 'cookie', C.badf, { r: 1.2 });
  S.set('cm', 5, C.ok);
  S.label('fx', { cls: 'cz-t', x: 1, y: 13, w: 30 }, [[0, ''], [5, ['출력 이스케이프 → 화면엔 &lt;script&gt; 글자로만 보여요', 'escape output → shown as harmless text']], [6, ['+ CSP 헤더 + HttpOnly 쿠키 (JS가 쿠키를 못 읽게)', '+ CSP header + HttpOnly cookies']]]);
  S.cap(1, '공격자가 스크립트가 든 댓글을 올려요', 'An attacker posts a comment containing a script').cap(3, '다른 사람이 그 페이지를 열면', 'When someone else opens the page')
    .cap(4, '그 사람 브라우저에서 스크립트가 실행돼 쿠키를 훔쳐요', 'the script runs in their browser and steals cookies').cap(5, '막는 법: 출력할 때 HTML로 해석되지 않게', 'Fix: never let output be parsed as HTML')
    .cap(6, 'React·Vue는 기본 이스케이프 · innerHTML·v-html은 조심', 'React and Vue escape by default; beware innerHTML and v-html');
  return S;
}
function sCSRF() {
  const S = scene({ id: 'sc-csrf', steps: 6, per: 1.2 });
  box(S, 'br', 1, 7.4, 8, 5, ['피해자 브라우저', 'Victim’s browser']); key(S, 'ck', 1.6, 13, ['bank 쿠키', 'bank cookie'], C.soft, { w: 6.8 });
  box(S, 'ev', 12.5, 1.4, 8, 3.8, ['악성 사이트', 'Evil site'], { s: C.bad }); box(S, 'bk', 24, 7.4, 7, 5, ['은행', 'Bank']);
  cell(S, 'form', 12.5, 5.8, ['숨은 송금 폼', 'hidden transfer form'], { w: 8, h: 2, cls: 'cz-c sc-m sc-xs', s: hid(C.bad) });
  fly(S, 'v', [9.4, 8.6], [12.3, 3.4], 1, '', C.cur); S.set('form', 2, { opacity: '1' });
  fly(S, 'req', [9.4, 10], [23.8, 10], 3, '', C.badf, { r: 1 }); S.set('ck', 3, C.cmp);
  text(S, 'rl', 11, 11, ['POST /transfer + 쿠키 자동 첨부', 'POST /transfer + cookie auto-attached'], { cls: 'cz-t', s: hid() }); S.set('rl', 3, { opacity: '1' }).set('rl', 5, { opacity: '0' });
  S.set('bk', 4, C.bad); text(S, 'bl', 24, 13, ['송금됨 ✗', 'money sent ✗'], { cls: 'cz-t', s: hid() }); S.set('bl', 4, { opacity: '1' }).set('bl', 5, { opacity: '0' });
  S.set('bk', 5, C.ok); S.label('fx', { cls: 'cz-t', x: 11, y: 15.6, w: 20 }, [[0, ''], [5, ['SameSite=Lax 쿠키 → 다른 사이트 요청엔 안 붙어요', 'SameSite=Lax: not sent cross-site']], [6, ['+ CSRF 토큰: 폼마다 예측 불가 값 확인', '+ CSRF token in every form']]]);
  S.cap(0, '은행에 로그인한 상태로', 'Logged in to the bank…').cap(1, '악성 사이트를 열면', 'the victim opens an evil page').cap(2, '페이지 안에 은행으로 가는 숨은 폼이 있어요', 'It hides a form that posts to the bank')
    .cap(3, '브라우저가 은행 쿠키를 자동으로 붙여 보내요', 'The browser attaches the bank cookie automatically').cap(4, '은행은 본인 요청으로 착각', 'The bank thinks it’s legitimate').cap(5, '쿠키 SameSite 설정과 CSRF 토큰으로 막아요', 'SameSite cookies and CSRF tokens stop it');
  return S;
}
function sCORS() {
  return seq('sc-cors', [['브라우저 (app.com)', 'Browser (app.com)'], 'api.com'], [
    { f: 0, t: 1, l: 'OPTIONS  Origin: app.com', cap: ['다른 출처로 요청하기 전에 먼저 물어봐요 (프리플라이트)', 'Before a cross-origin call, the browser asks first (preflight)'] },
    { f: 1, t: 0, l: 'Access-Control-Allow-Origin: app.com', c: 'ok', cap: ['서버가 app.com은 허용한다고 답하면', 'The server says app.com is allowed'] },
    { f: 0, t: 1, l: 'GET /data', cap: ['실제 요청을 보내요', 'then the real request goes out'] },
    { f: 1, t: 0, l: ['200 데이터', '200 data'], c: 'ok', cap: ['JS가 응답을 읽을 수 있어요', 'and JavaScript may read the response'] },
    { f: 0, t: 0, l: ['evil.com에서였다면 → 응답 차단', 'from evil.com → response blocked'], cap: ['허용 안 된 출처면 브라우저가 JS에 응답을 안 줘요', 'For other origins the browser withholds the response'] },
    { f: 0, t: 0, l: ['서버 간 호출엔 CORS 없음', 'no CORS between servers'], cap: ['CORS는 브라우저의 보호 장치 · 서버 보안을 대신하지 않아요', 'CORS protects browsers; it doesn’t secure your server'] }
  ], { aw: 9, per: 1.25, gap: 2.6 });
}
function sMITM() {
  const S = scene({ id: 'sc-mitm', steps: 5, per: 1.35 });
  box(S, 'a', 1, 3.6, 7, 3.4, ['나', 'You']); box(S, 'b', 24, 3.6, 7, 3.4, ['서버', 'Server']); box(S, 'e', 12.5, 11.6, 7, 3.4, ['공격자 (공용 Wi-Fi)', 'Attacker (public Wi-Fi)'], { s: C.bad });
  S.el('ln', { x: 8, y: 5.25, w: 16, h: .12, css: 'background:var(--ink-3)' });
  arrow(S, 'tap', 16, 5.6, 16, 11.4, { s: hid(AR.red) });
  S.label('pk', { cls: 'cz-pill cz-mono', x: 10, y: 2, w: 12, h: 2, s: C.cmp }, [[0, 'password=1234'], [3, '9f#Xk2!q…']]);
  Object.assign(S.get('pk~1').s, C.ok);
  S.label('eh', { cls: 'cz-t', x: 11.4, y: 15.6, w: 20 }, [[0, ''], [1, ['다 보여요: password=1234 ✗', 'reads everything: password=1234 ✗']], [3, ['의미 없는 암호문만 보여요 ✓', 'sees only ciphertext ✓']], [4, ['가짜 인증서 → 브라우저 경고', 'fake cert → browser warning']]]);
  S.set('tap', 1, { opacity: '1' }).set('e', 2, C.badf).set('e', 3, C.bad);
  S.cap(1, 'HTTP는 중간에서 그대로 읽혀요', 'Plain HTTP can be read in transit').cap(2, '바꿔치기도 가능해요', 'and even modified').cap(3, 'HTTPS로 암호화하면', 'With HTTPS encryption')
    .cap(4, '내용을 못 보고, 위장하면 인증서에서 걸려요', 'nothing is readable and impersonation fails the certificate').cap(5, 'HSTS로 항상 HTTPS만 쓰게 강제해요', 'HSTS forces HTTPS every time');
  return S;
}
function sDDoS() {
  const S = scene({ id: 'sc-ddos', steps: 5, per: 1.3 });
  box(S, 'sv', 25, 7.6, 6, 4.8, ['서버', 'Server']);
  S.el('bar', { x: 25, y: 13, w: 6, h: .8, css: 'border-radius:1em;transform-origin:0 50%', s: { background: 'var(--ok)', transform: 'scaleX(.25)' } });
  const pts = []; for (let i = 0; i < 14; i++) pts.push([1.5 + (i % 2) * 2.4, 2 + i * 1.3]);
  pts.forEach(([x, y], i) => { const bot = i % 3 !== 0; dot(S, 'u' + i, x, y, '', { r: .5, s: bot ? hid(C.badf) : C.cur }); if (bot) S.set('u' + i, 2, { opacity: '1' }); S.move('u' + i, bot ? 2 : 1, (bot ? 23.6 - (i % 3) * 1.1 : 24.4) - .5, (bot ? 6.4 + (i % 7) * 1.2 : 10) - .5); });
  S.set('bar', 2, { transform: 'scaleX(1)', background: 'var(--danger)' }).set('sv', 2, C.bad);
  box(S, 'cdn', 15, 3, 4.6, 14, ['CDN · WAF', 'CDN · WAF'], { s: hid(C.soft) });
  S.set('cdn', 3, { opacity: '1' });
  pts.forEach(([x, y], i) => { const bot = i % 3 !== 0; if (bot) S.move('u' + i, 4, 14.4 - .5, y - .5).set('u' + i, 4, { opacity: '.3' }); else S.move('u' + i, 4, 24.4 - .5, 10 - .5); });
  S.set('bar', 4, { transform: 'scaleX(.3)', background: 'var(--ok)' }).set('sv', 4, C.ok);
  S.cap(1, '평소에는 여유가 있어요', 'Normally there is plenty of headroom').cap(2, '수많은 봇이 한꺼번에 요청하면 서버가 마비돼요', 'A flood of bot requests overwhelms the server')
    .cap(3, '앞단에 CDN·WAF를 두면', 'Put a CDN or WAF in front').cap(4, '대량 트래픽을 흡수·차단하고 정상 요청만 통과', 'It absorbs and filters the flood, passing real users')
    .cap(5, '레이트 리밋·오토스케일링을 함께 써요', 'Combine with rate limiting and autoscaling');
  return S;
}
function sIDOR() {
  const S = scene({ id: 'sc-idor', steps: 5, per: 1.35 });
  S.el('bar', { x: 2, y: 2, w: 28, h: 2.4, css: 'border-radius:1.2em;border:.12em solid var(--line)', s: { background: 'var(--ui)' } });
  S.label('url', { cls: 'cz-t cz-mono sc-b', x: 3.2, y: 2.6, w: 26 }, [[0, 'shop.com/orders/1001'], [2, 'shop.com/orders/1002']]);
  S.label('pg', { cls: 'cz-box cz-bx', x: 6, y: 6.4, w: 20, h: 7.6 }, [[0, ''], [1, ['내 주문 · 김철수 · 서울시 …', 'My order · Kim · Seoul …']], [2, ['남의 주문 · 이영희 · 부산시 … ✗', 'Someone else’s · Lee · Busan … ✗']], [4, ['403 · 본인 주문만 볼 수 있어요', '403 · you can only view your orders']]]);
  Object.assign(S.get('pg~0').s, { opacity: '0' }); Object.assign(S.get('pg~2').s, C.bad); Object.assign(S.get('pg~3').s, C.ok);
  cell(S, 'fix', 6, 15.4, 'if (order.userId !== me.id) return 403', { w: 20, h: 2.2, cls: 'cz-c sc-code', s: hid(C.ok) }); S.set('fix', 3, { opacity: '1' });
  S.cap(1, '로그인해서 내 주문을 봐요', 'Logged in, viewing your order').cap(2, '주소의 숫자만 바꿨더니 남의 주문이 보여요', 'Changing the number shows someone else’s order')
    .cap(3, '로그인 여부만 보고 소유자를 확인하지 않았기 때문', 'The server checked login, not ownership').cap(4, '모든 요청에서 서버가 소유권을 확인해야 해요', 'Check ownership on every request, server-side')
    .cap(5, 'OWASP 1위 취약점 "접근 제어 실패" · 추측 어려운 ID도 도움', 'OWASP #1, broken access control · unguessable IDs help too');
  return S;
}

/* ---------- operations ---------- */
function sSecret() {
  const S = scene({ id: 'sc-secret', steps: 6, per: 1.15 });
  cell(S, 'code', 1, 2.4, 'API_KEY = "sk_live_51Hx…"', { w: 14, h: 2.4, cls: 'cz-c sc-code', s: C.bad });
  box(S, 'git', 1, 7.4, 6, 3, 'git commit'); box(S, 'gh', 13, 7.4, 7.6, 3, ['공개 저장소', 'public repo']); box(S, 'bot', 24.4, 7.4, 6.6, 3, ['스캐너 봇', 'scanner bot'], { s: C.bad });
  arrow(S, 'a1', 7.2, 8.9, 12.8, 8.9, { s: hid() }); arrow(S, 'a2', 20.8, 8.9, 24.2, 8.9, { s: hid(AR.red) });
  S.set('git', 1, C.cmp).set('a1', 2, { opacity: '1' }).set('gh', 2, C.cmp).set('a2', 3, { opacity: '1' });
  text(S, 'mn', 21, 11, ['몇 분 안에 수집돼요', 'harvested within minutes'], { cls: 'cz-t', s: hid() }); S.set('mn', 3, { opacity: '1' });
  pill(S, 'bill', 22, 13, ['요금 폭탄 · 데이터 유출', 'huge bill · data leak'], { w: 9, h: 1.9, s: hid(C.badf) }); S.set('bill', 4, { opacity: '1' });
  cell(S, 'fix1', 1, 15.4, 'API_KEY = process.env.API_KEY', { w: 15, h: 2.2, cls: 'cz-c sc-code', s: hid(C.ok) });
  cell(S, 'fix2', 17, 15.4, ['비밀 관리자 (Vault·AWS Secrets)', 'secret manager (Vault, AWS)'], { w: 14, h: 2.2, cls: 'cz-c sc-m', s: hid(C.ok) });
  S.set('fix1', 5, { opacity: '1' }).set('fix2', 5, { opacity: '1' });
  S.cap(0, '코드에 키를 그대로 넣고', 'A key hard-coded in source').cap(1, '커밋하고', 'gets committed').cap(2, '공개 저장소에 올리면', 'and pushed to a public repo')
    .cap(3, '자동 봇이 바로 찾아내요', 'Bots find it almost at once').cap(5, '환경 변수·비밀 관리 서비스로 분리하고', 'Keep it in env vars or a secret manager').cap(6, '유출되면 지우는 걸로 안 돼요 · 즉시 키를 폐기·교체', 'If leaked, deleting isn’t enough: revoke and rotate now');
  return S;
}
function sFW() {
  const S = scene({ id: 'sc-fw', steps: 5, per: 1.3 });
  box(S, 'inet', 1, 7.6, 6, 4.6, ['인터넷', 'Internet']);
  S.el('fw', { x: 9, y: 2, w: .6, h: 17, css: 'border-radius:.3em', s: { background: 'var(--warn)' } }); text(S, 'fwl', 7.4, .6, ['방화벽', 'firewall'], { cls: 'cz-t' });
  box(S, 'pub', 11.4, 2, 9, 17, '', { css: 'background:transparent;box-shadow:none;border-style:dashed' }); text(S, 'publ', 12, 2.4, ['공개 영역', 'public subnet'], { cls: 'cz-t' });
  box(S, 'web', 12.4, 8.4, 7, 3.4, ['웹 서버 :443', 'Web :443']);
  box(S, 'prv', 22.4, 2, 8.8, 17, '', { css: 'background:transparent;box-shadow:none;border-style:dashed' }); text(S, 'prvl', 23, 2.4, ['내부 영역', 'private subnet'], { cls: 'cz-t' });
  box(S, 'db', 23.4, 8.4, 7, 3.4, 'DB :5432');
  fly(S, 'ok1', [7.4, 9.9], [12.2, 9.9], 1, '443', C.ok, { r: 1 }); S.set('web', 1, C.ok).set('web', 2, C.idle);
  fly(S, 'ok2', [19.6, 10.1], [23.2, 10.1], 2, '5432', C.ok, { r: 1 }); S.set('db', 2, C.ok).set('db', 3, C.idle);
  dot(S, 'bad', 7.4, 15.6, '5432', { r: 1, s: hid(C.badf) }); S.set('bad', 3, { opacity: '1' }).move('bad', 4, 8.2 - 1, 15.6 - 1).set('fw', 4, { background: 'var(--danger)' });
  text(S, 'bx', 10.2, 16.6, ['밖에서 DB로 직접 ✗ 차단', 'direct to DB from outside ✗'], { cls: 'cz-t', s: hid() }); S.set('bx', 4, { opacity: '1' });
  S.cap(1, '밖에서는 웹 포트(443)만 허용', 'Only the web port (443) is open to the world').cap(2, 'DB는 웹 서버에서 오는 요청만 받아요', 'The DB accepts traffic only from the web servers')
    .cap(4, '인터넷에서 DB로 바로 가는 길은 막혀요', 'Direct paths from the internet to the DB are blocked').cap(5, '클라우드에선 보안 그룹·VPC로 설정해요 · 열린 포트는 최소로', 'In the cloud: security groups and VPCs · open as little as possible');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'scx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono scx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono scx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c scx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono scx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c scx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'scx-s scx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono scx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono scx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono scx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono scx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono scx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'scx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'scx-xs', 5));


const CSSX = `
.scx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.scx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.scx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.scx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.scx-r .in{color:var(--danger);font-weight:800}
.scx-g .in{color:var(--ok);font-weight:800}
.scx-a .in{color:var(--accent);font-weight:800}
.scx-w .in{color:var(--warn);font-weight:800}
.scx-c .in{font-size:.6em;font-weight:700}
.scx-c2 .in{font-size:.5em;font-weight:700}
.scx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.scx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'scx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= crypto ================= */
function sAesMode() {
  const S = scene({ id: 'sc-aesmode', steps: 5, per: 1.6 });
  const SH = ['..##....', '.####...', '######..', '.####...', '..##..##', '......##'], CW = .88;
  const rnd = (i, j) => ((i * 7 + j * 13 + i * j * 5) % 5);
  const PAL = ['accent', 'ok', 'warn', 'danger', 'ink-3'];
  const img = (k, x, st, f) => { for (let i = 0; i < 6; i++) for (let j = 0; j < 8; j++) { const [c, p] = f(SH[i][j] === '#', i, j); rect(S, `${k}${i}_${j}`, x + j * CW, 1.2 + i * CW, CW - .04, CW - .04, c, p, st, { r: .05 }); } };
  img('o', 1, 1, on => on ? ['ink-2', 70] : ['line', 40]); T(S, 'ol', 1, 6.7, ['원본 (블록 = 칸 하나)', 'original (block = one cell)'], 'scx-tiny', 1);
  img('e', 9.8, 2, on => on ? ['danger', 55] : ['warn', 35]); T(S, 'el', 9.8, 6.7, ['ECB: 무늬가 그대로 ✗', 'ECB: the pattern survives ✗'], 'scx-tiny scx-r', 2);
  img('c', 18.6, 3, (on, i, j) => [PAL[rnd(i, j)], 35 + rnd(j, i) * 8]); T(S, 'cl', 18.6, 6.7, ['CBC·CTR: 잡음처럼 ✓', 'CBC/CTR: looks like noise ✓'], 'scx-tiny scx-g', 3);
  const row = (k, y, lbl, items, st, cls) => { T(S, k + 'l', 1, y + .3, lbl, 'scx-xs ' + (cls || ''), st); items.forEach(([t, c], i) => box2(S, `${k}${i}`, 6.4 + i * 4.3, y, 4, 1.2, t, c, st, { pct: 35 })); };
  row('p', 7.8, ['평문 블록', 'plaintext'], [['P1', 'line'], ['P2', 'line'], ['P1', 'line'], ['P3', 'line']], 1);
  row('b', 9.3, 'ECB', [['C7', 'danger'], ['C2', 'warn'], ['C7', 'danger'], ['C5', 'warn']], 2, 'scx-r');
  row('d', 10.8, 'CBC', [['X1', 'ok'], ['X8', 'ok'], ['X3', 'ok'], ['X6', 'ok']], 3, 'scx-g');
  T(S, 'dn', 23.8, 10.95, ['IV와 앞 블록을 섞어 매번 달라요', 'mixed with the IV and previous block'], 'scx-tiny', 3);
  row('g', 12.3, 'GCM', [['X4', 'ok'], ['X9', 'ok'], ['X2', 'ok'], ['tag', 'accent']], 4, 'scx-a');
  T(S, 'gn', 23.8, 12.45, ['암호화 + 위변조 검출 태그', 'encryption + tamper-detecting tag'], 'scx-tiny scx-a', 4);
  fin(S, 'z', 14, [['같은 AES라도 운용 모드가 중요해요: ECB는 같은 평문 블록 → 같은 암호문이라 패턴이 새어 나가요', 'the mode matters as much as AES: ECB maps equal blocks to equal ciphertext and leaks patterns', 'scx-xs scx-a'], ['요즘 기본값은 AES-GCM이나 ChaCha20-Poly1305 같은 AEAD (암호화 + 인증)', 'today’s default is an AEAD such as AES-GCM or ChaCha20-Poly1305 (encryption + authentication)'], ['같은 키로 nonce(IV)를 두 번 쓰면 안전성이 무너져요 · 라이브러리의 고수준 API를 쓰세요', 'never reuse a nonce (IV) with the same key · prefer a library’s high-level API']]);
  S.cap(1, '블록 단위 암호화', 'Encrypting block by block').cap(2, 'ECB: 패턴 유출', 'ECB leaks patterns').cap(3, 'CBC·CTR: 연쇄로 섞기', 'CBC/CTR: chain and mix').cap(4, 'GCM: 인증까지', 'GCM adds authentication').cap(5, '블록 암호 운용 모드', 'Block cipher modes');
  return S;
}
function sHmac() {
  const S = scene({ id: 'sc-hmac', steps: 5, per: 1.6 });
  box2(S, 'm1', 1, 1.2, 6.4, 1.3, 'amount=100', 'line', 1, { pct: 40 }); ar(S, 'a1', [7.5, 1.85], [9.3, 1.85], 'ink-3', 1, { h: .08 }); box2(S, 'h1', 9.4, 1.2, 4.2, 1.3, 'SHA-256', 'accent', 1, { pct: 30 }); ar(S, 'a2', [13.7, 1.85], [15.5, 1.85], 'ink-3', 1, { h: .08 }); box2(S, 'd1', 15.6, 1.2, 4, 1.3, 'a3f…', 'ok', 1, { pct: 35 });
  box2(S, 'm2', 1, 2.9, 6.4, 1.3, 'amount=900', 'danger', 1, { pct: 30 }); ar(S, 'a3', [7.5, 3.55], [9.3, 3.55], 'ink-3', 1, { h: .08 }); box2(S, 'h2', 9.4, 2.9, 4.2, 1.3, 'SHA-256', 'accent', 1, { pct: 30 }); ar(S, 'a4', [13.7, 3.55], [15.5, 3.55], 'ink-3', 1, { h: .08 }); box2(S, 'd2', 15.6, 2.9, 4, 1.3, '7c1…', 'danger', 1, { pct: 30 });
  T(S, 't1', 20.4, 1.9, ['해시만 붙이면 공격자도', 'with a plain hash the attacker'], 'scx-xs scx-r', 1); T(S, 't1b', 20.4, 2.9, ['다시 계산해 위조해요', 'just recomputes it'], 'scx-xs scx-r', 1);
  box2(S, 'kh', 1, 5, 9.4, 1.3, 'H(key ‖ msg)', 'warn', 2, { pct: 30 }); T(S, 'kt', 11, 4.9, ['SHA-256 길이 확장 공격: 키 없이도', 'SHA-256 length extension: without the key,'], 'scx-xs scx-r', 2); T(S, 'kt2', 11, 5.9, ['H(key ‖ msg ‖ pad ‖ &admin=1)을 계산해요', 'compute H(key ‖ msg ‖ pad ‖ &admin=1)'], 'cz-mono scx-xs scx-r', 2);
  box2(S, 'in', 1, 7.4, 10.4, 1.4, 'H((K ⊕ ipad) ‖ m)', 'accent', 3, { pct: 25 }); ar(S, 'ia', [11.5, 8.1], [13.3, 8.1], 'ink-3', 3, { h: .08 }); box2(S, 'out', 13.4, 7.4, 11.2, 1.4, ['H((K ⊕ opad) ‖ 안쪽 값)', 'H((K ⊕ opad) ‖ inner)'], 'accent', 3, { pct: 35 }); ar(S, 'oa', [24.7, 8.1], [26.5, 8.1], 'ink-3', 3, { h: .08 }); box2(S, 'tag', 26.6, 7.4, 4.4, 1.4, 'tag', 'ok', 3, { pct: 40 });
  T(S, 'hn', 1, 9.1, ['HMAC: 키로 두 번 감싸 길이 확장을 막아요', 'HMAC wraps twice with the key, blocking length extension'], 'scx-xs scx-g', 3);
  code(S, 'cd', 1, 10.2, 30, ['const expected = hmacSha256(secret, rawBody);', ["if (!timingSafeEqual(expected, req.headers['x-signature'])) reject();   // 웹훅 검증", "if (!timingSafeEqual(expected, req.headers['x-signature'])) reject();   // webhook check"]], [], { st: 4 });
  fin(S, 'z', 13.6, [['MAC: 비밀 키를 아는 쪽만 만들 수 있는 체크섬 → 무결성 + 출처 인증', 'a MAC is a checksum only key holders can produce → integrity plus authenticity', 'scx-xs scx-a'], ['웹훅 서명(GitHub, Stripe), API 요청 서명(AWS SigV4), JWT HS256, 서명된 쿠키에 써요', 'used for webhook signatures (GitHub, Stripe), request signing (AWS SigV4), JWT HS256 and signed cookies'], ['전자 서명과 달리 양쪽이 같은 키를 가져서 “누가 만들었는지”를 제3자에게 증명하진 못해요', 'unlike signatures, both sides share the key, so it can’t prove authorship to a third party']]);
  S.cap(1, '해시만으로는 부족', 'A hash alone isn’t enough').cap(2, '키를 앞에 붙이면?', 'Prefixing the key?').cap(3, 'HMAC 구조', 'How HMAC is built').cap(4, '웹훅 검증', 'Verifying webhooks').cap(5, 'HMAC과 메시지 인증 코드', 'HMAC and MACs');
  return S;
}
function sRand() {
  const S = scene({ id: 'sc-rand', steps: 5, per: 1.6 });
  T(S, 'mt', 1, .3, ['Math.random() 출력 몇 개를 관찰하면…', 'observe a few Math.random() outputs…'], 'scx-xs scx-a', 1);
  ['0.1342', '0.7731', '0.4410'].forEach((v, i) => box2(S, 'o' + i, 1 + i * 4.2, 1.3, 3.9, 1.3, v, 'line', 1, { pct: 40 }));
  ar(S, 'oa', [13.7, 1.95], [15.5, 1.95], 'danger', 1, { h: .08 }); box2(S, 'stt', 15.6, 1.3, 5.6, 1.3, ['내부 상태 복원', 'recover the state'], 'danger', 1, { pct: 30 }); ar(S, 'sa', [21.3, 1.95], [23.1, 1.95], 'danger', 1, { h: .08 }); box2(S, 'pr', 23.2, 1.3, 7.8, 1.3, ['다음 값 0.9055 예측 ✓', 'predict next: 0.9055 ✓'], 'danger', 1, { pct: 40 });
  T(S, 'mn', 1, 2.9, ['일반 PRNG(xorshift128+ 등)는 빠르지만 예측 가능해요', 'ordinary PRNGs (xorshift128+, …) are fast but predictable'], 'scx-xs scx-r', 1);
  [['인터럽트 타이밍', 'interrupt timing'], ['디스크·네트워크 지터', 'disk/network jitter'], ['하드웨어 RNG (RDRAND)', 'hardware RNG (RDRAND)']].forEach((t, i) => { box2(S, 'en' + i, 1, 4.4 + i * 1.5, 8.4, 1.2, t, 'warn', 2, { pct: 30 }); seg(S, 'el' + i, [9.45, 5 + i * 1.5], [11.95, 6.5], 2, 'ink-3', .07); });
  box2(S, 'pool', 12, 5.7, 5.4, 1.6, ['엔트로피 풀', 'entropy pool'], 'warn', 2, { pct: 40 }); ar(S, 'pa', [17.5, 6.5], [19.3, 6.5], 'ink-3', 2, { h: .08 });
  box2(S, 'drbg', 19.4, 5.7, 5.8, 1.6, 'ChaCha20 DRBG', 'ok', 2, { pct: 35 }); ar(S, 'da', [25.3, 6.5], [27.1, 6.5], 'ink-3', 2, { h: .08 }); box2(S, 'out', 27.2, 5.7, 3.8, 1.6, ['출력', 'output'], 'ok', 2, { pct: 40 });
  T(S, 'cn', 12, 8, ['출력을 아무리 봐도 다음 값을 알 수 없어요 (CSPRNG)', 'no amount of output reveals the next value (CSPRNG)'], 'scx-xs scx-g', 2);
  code(S, 'bad', 1, 9.2, 14.6, ['token = Math.random()', '  .toString(36).slice(2);'], [], { st: 3 }); T(S, 'bx', 13.8, 9.35, '✗', 'scx-s scx-r', 3);
  code(S, 'good', 16.4, 9.2, 14.6, ['crypto.getRandomValues(buf);', ['# Python: secrets.token_urlsafe(32)', '# Python: secrets.token_urlsafe(32)']], [], { st: 3 }); T(S, 'gx', 29.9, 9.35, '✓', 'scx-s scx-g', 3);
  T(S, 's4', 1, 12.6, ['비밀 토큰은 128비트 이상 · 시간·PID로 시드 만들기 금지 · 비밀번호 재설정·세션 ID·API 키 모두 해당', 'tokens need 128+ bits · never seed from time or PIDs · covers reset links, session IDs, API keys'], 'scx-xs scx-a', 4);
  fin(S, 'z', 14, [['보안용 난수는 반드시 암호학적으로 안전한 생성기(CSPRNG)에서', 'security randomness must come from a cryptographically secure generator (CSPRNG)', 'scx-xs scx-a'], ['OS가 모은 엔트로피로 시드한 뒤 암호 알고리즘으로 늘려요 (/dev/urandom, getrandom())', 'the OS seeds it from collected entropy and stretches it with a cipher (/dev/urandom, getrandom())']]);
  S.cap(1, '예측 가능한 난수', 'Predictable randomness').cap(2, 'CSPRNG의 구조', 'How a CSPRNG works').cap(3, '코드에서는', 'In code').cap(4, '얼마나 길게', 'How long to make tokens').cap(5, '안전한 난수', 'Secure randomness');
  return S;
}
function sTiming() {
  const S = scene({ id: 'sc-timing', steps: 5, per: 1.6 });
  code(S, 'cd', 1, .8, 15, ['function eq(a, b) {', '  for (let i = 0; i < a.length; i++)', '    if (a[i] !== b[i]) return false;', '  return true;', '}'], [[2, 1]], { hoff: 4 });
  T(S, 'cn', 1, 8.2, ['첫 번째로 다른 글자에서 바로 돌아가요', 'it returns at the first mismatch'], 'scx-xs scx-r', 1);
  T(S, 'gt', 17, .3, ['비밀 토큰 c4e9…에 대해 첫 글자를 바꿔 가며 시간 측정', 'time guesses for the secret c4e9… by first character'], 'scx-tiny scx-a', 2);
  [['0000…', 6, 'line'], ['7000…', 6, 'line'], ['c000…', 8.6, 'danger'], ['f000…', 6, 'line']].forEach(([g, w, c], i) => { const y = 1.2 + i * 1.5; T(S, 'g' + i, 17, y + .2, g, 'cz-mono scx-xs', 2); rect(S, 'gb' + i, 21, y, w, 1.1, c, 40, 2, { r: .2 }); T(S, 'gv' + i, 21.2 + w, y + .2, w > 7 ? '52 µs' : '40 µs', 'cz-mono scx-tiny' + (w > 7 ? ' scx-r' : ''), 2); });
  T(S, 'k3', 17, 7.3, ['c가 맞으면 비교가 한 글자 더 진행 → 조금 느려요', 'a correct c makes the loop go one step further → slower'], 'scx-tiny scx-r', 2);
  ['c', 'c4', 'c4e', 'c4e9', '…'].forEach((t, i) => box2(S, 'p' + i, 1 + i * 4, 9, 3.6, 1.2, t, i < 4 ? 'danger' : 'line', 3, { pct: 30 }));
  T(S, 'pn', 21.4, 9.2, ['16ⁿ 대신 16 × n번 시도', '16 × n tries instead of 16ⁿ'], 'scx-xs scx-r', 3);
  code(S, 'fx', 1, 10.6, 30, ['let diff = 0;', 'for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);', ['return diff === 0;   // 실무에선 crypto.timingSafeEqual · hmac.compare_digest', 'return diff === 0;   // in practice: crypto.timingSafeEqual · hmac.compare_digest']], [], { st: 4 });
  fin(S, 'z', 15.4, [['타이밍 공격: 처리 시간 차이로 비밀을 한 조각씩 알아내요 → 비밀 비교는 상수 시간으로', 'timing attacks learn secrets piece by piece from time differences → compare secrets in constant time', 'scx-xs scx-a'], ['네트워크 잡음이 있어도 측정을 반복하면 통계로 드러나요 · 캐시 타이밍(Spectre), 전력 분석도 같은 계열의 부채널', 'noise averages out over many measurements · cache timing (Spectre) and power analysis are related side channels']]);
  S.cap(1, '조기 반환 비교', 'An early-exit comparison').cap(2, '시간 차이 측정', 'Measure the difference').cap(3, '한 글자씩 맞히기', 'Guess one character at a time').cap(4, '상수 시간 비교', 'Constant-time comparison').cap(5, '타이밍 공격', 'Timing attacks');
  return S;
}

/* ================= web ================= */
function sSsrf() {
  const S = scene({ id: 'sc-ssrf', steps: 5, per: 1.6 });
  frame(S, 'vpc', 8.6, 1, 22.4, 9.4, 'ink-3', 0, { dash: 1, w: .1 }); T(S, 'vpcl', 8.9, 1.1, ['클라우드 내부망 (VPC)', 'cloud private network (VPC)'], 'scx-tiny', 0);
  box2(S, 'u', 1, 4.6, 6, 1.6, ['사용자', 'user'], 'line', 0, { pct: 40 }); box2(S, 'sv', 10, 4.6, 7, 1.6, ['서버: 미리보기', 'server: preview'], 'accent', 0, { pct: 30 });
  box2(S, 'ext', 1, 1.2, 6, 1.6, 'cat.example', 'ok', 1, { pct: 30 });
  [['md', 2.2, ['메타데이터 169.254.169.254', 'metadata 169.254.169.254']], ['rd', 4.8, 'Redis 10.0.0.5:6379'], ['ad', 7.4, ['관리자 localhost:8080', 'admin localhost:8080']]].forEach(([k, y, l]) => box2(S, k, 21, y, 9.4, 1.5, l, 'warn', 0, { pct: 25 }));
  ar(S, 'r0', [7.1, 5.4], [9.9, 5.4], 'ink-3', 0, { h: .08 });
  T(S, 'q1', 1, 6.6, '?url=https://cat.example/a.jpg', 'cz-mono scx-tiny', 1, { off: 2 }); elb(S, 'f1', [[11.5, 4.5], [11.5, 2], [7.1, 2]], 'ok', 1, { h: .08, off: 2 });
  T(S, 'q2', 1, 6.6, '?url=http://169.254.169.254/latest/meta-data/iam/…', 'cz-mono scx-tiny scx-r', 2);
  elb(S, 'f2', [[17.1, 5], [19, 5], [19, 2.95], [20.9, 2.95]], 'danger', 2, { h: .1 }); tsets(S, 'md', [[2, 'danger', 35]]);
  T(S, 'k2', 1, 8, ['서버가 대신 접속해 IAM 임시 키를 그대로 돌려줘요', 'the server fetches it and hands back temporary IAM keys'], 'scx-xs scx-r', 2);
  elb(S, 'f3', [[17.1, 5.6], [20.9, 5.6]], 'danger', 3, { h: .1 }); elb(S, 'f4', [[17.1, 6.1], [19, 6.1], [19, 8.15], [20.9, 8.15]], 'danger', 3, { h: .1 }); tsets(S, 'rd', [[3, 'danger', 30]]); tsets(S, 'ad', [[3, 'danger', 30]]);
  T(S, 'k3', 1, 9.1, ['내부 서비스·관리자 페이지도 · 리다이렉트, DNS 리바인딩, 10진수 IP로 필터 우회', 'internal services and admin pages too · bypasses via redirects, DNS rebinding, decimal IPs'], 'scx-tiny scx-r', 3);
  [['허용 목록 호스트만', 'allowlisted hosts only'], ['DNS 해석 후 사설 IP 차단', 'block private IPs after DNS'], ['리다이렉트 끄기', 'disable redirects'], ['IMDSv2 (토큰 필요)', 'IMDSv2 (token required)'], ['이그레스 방화벽', 'egress firewall']].forEach((t, i) => box2(S, 'd' + i, 1 + i * 6.05, 10.9, 5.85, 1.5, t, 'ok', 4, { pct: 30 }));
  fin(S, 'z', 12.9, [['SSRF: 서버가 사용자 대신 URL을 요청하는 기능을 악용해 내부망에 접근해요', 'SSRF abuses a server-side URL fetch to reach the internal network', 'scx-xs scx-a'], ['2019년 Capital One 유출이 대표 사례 · OWASP Top 10에 들어 있어요', 'the 2019 Capital One breach is the classic case · it is in the OWASP Top 10'], ['미리보기, 웹훅, 이미지 가져오기, PDF 생성처럼 “URL을 받는 기능”이 모두 후보예요', 'link previews, webhooks, image fetchers and PDF renderers, anything that takes a URL, are candidates']]);
  S.cap(1, '정상: 외부 이미지 가져오기', 'Normal: fetch an external image').cap(2, '공격: 메타데이터 주소', 'Attack: the metadata address').cap(3, '내부 서비스까지', 'Internal services too').cap(4, '방어', 'Defenses').cap(5, 'SSRF', 'Server-side request forgery');
  return S;
}
function sPath() {
  const S = scene({ id: 'sc-path', steps: 5, per: 1.6 });
  const F = [['/', 1, 1.2], ['srv/', 2.6, 2.6], ['files/', 4.2, 4], ['report.pdf', 5.8, 5.4], ['etc/', 2.6, 6.8], ['passwd', 4.2, 8.2]], K = ['root', 'srv', 'files', 'rep', 'etc', 'pw'];
  F.forEach(([l, x, y], i) => box2(S, 'f' + K[i], x, y, 5, 1.1, l, i === 5 ? 'line' : 'accent', 0, { pct: i < 4 ? 25 : 40 }));
  [[1.6, 2.3, 2.6, 3.1], [3.2, 3.7, 4.2, 4.5], [4.8, 5.1, 5.8, 5.9], [1.6, 2.3, 6.8, 7.3], [3.2, 7.9, 4.2, 8.7]].forEach(([x1, y1, x2, y2], i) => { seg(S, 'tv' + i, [x1, y1], [x1, y2], 0, 'ink-3', .06); seg(S, 'th' + i, [x1, y2], [x2, y2], 0, 'ink-3', .06); });
  tsets(S, 'frep', [[1, 'ok', 40], [2, 'accent', 25]]);
  code(S, 'c1', 12, .8, 19, ['path.join("/srv/files", req.query.file)'], [], {});
  T(S, 'i1', 12, 3.1, 'file=report.pdf → /srv/files/report.pdf ✓', 'cz-mono scx-xs scx-g', 1, { off: 2 });
  T(S, 'i2', 12, 3.1, 'file=../../etc/passwd → /etc/passwd ✗', 'cz-mono scx-xs scx-r', 2);
  tsets(S, 'ffiles', [[2, 'warn', 40]]); tsets(S, 'fsrv', [[2, 'warn', 40]]); tsets(S, 'froot', [[2, 'warn', 40]]); tsets(S, 'fetc', [[2, 'warn', 40]]); tsets(S, 'fpw', [[2, 'danger', 40]]);
  T(S, 'up', 9.6, 4.1, ['.. 두 번 → 루트까지 올라감', 'two “..” climb to the root'], 'scx-tiny scx-r', 2, { off: 3 });
  code(S, 'c2', 12, 4.4, 19, ["exec('ping -c 1 ' + host)", 'host = "8.8.8.8; cat /etc/passwd"'], [], { st: 3 });
  T(S, 'i3', 12, 7.8, ['셸이 ; 뒤를 두 번째 명령으로 실행 (명령 주입)', 'the shell runs the part after ; as a second command'], 'scx-xs scx-r', 3);
  code(S, 'fx', 1, 9.8, 30, ['const p = path.resolve(BASE, name);  if (!p.startsWith(BASE + path.sep)) deny();', ["execFile('ping', ['-c', '1', host]);   // 셸 없이 인자 배열로", "execFile('ping', ['-c', '1', host]);   // no shell, argument array"]], [], { st: 4 });
  T(S, 'f4', 1, 13.2, ['가능하면 파일명 대신 ID로 받고, 입력은 허용 목록으로 검증 · 프로세스는 최소 권한으로', 'take IDs instead of file names where possible, validate against allowlists, run with least privilege'], 'scx-xs scx-a', 4);
  fin(S, 'z', 14.4, [['경로 조작과 명령 주입: 사용자 입력이 파일 경로나 셸 명령의 “구조”를 바꾸는 공격', 'path traversal and command injection: user input changes the structure of a path or shell command', 'scx-xs scx-a'], ['SQL 인젝션과 같은 뿌리 · 데이터와 명령을 섞지 말고 분리된 API(인자 배열, 정규화 + 검사)를 써요', 'same root as SQL injection · keep data and commands apart with separate APIs (argument arrays, normalize + check)']]);
  S.cap(1, '정상 경로', 'A normal path').cap(2, '../로 탈출', 'Escape with ../').cap(3, '셸 명령 주입', 'Shell command injection').cap(4, '방어 코드', 'Defensive code').cap(5, '경로 조작과 명령 주입', 'Path traversal and command injection');
  return S;
}

/* ================= ops ================= */
function sSupply() {
  const S = scene({ id: 'sc-supply', steps: 5, per: 1.6 });
  box2(S, 'app', 12.5, .8, 7, 1.4, ['내 앱', 'my app'], 'accent', 1, { pct: 35 });
  const D = ['react', 'express', 'lodash', 'axios', 'dotenv'];
  D.forEach((d, i) => { const x = 1 + i * 6.1; box2(S, 'd' + i, x, 3.2, 5.6, 1.2, d, 'line', 1, { pct: 40 }); seg(S, 'dl' + i, [16, 2.25], [x + 2.8, 3.15], 1, 'ink-3', .06); for (let j = 0; j < 4; j++) { const k = `t${i}_${j}`; box2(S, k, x + j * 1.45, 5.2, 1.25, .8, '', 'line', 1, { pct: 45 }); } });
  T(S, 'cnt', 1, 6.3, ['직접 의존 5개 → 전이 의존까지 수백~수천 개', '5 direct dependencies → hundreds or thousands transitively'], 'scx-xs scx-a', 1);
  tsets(S, 't1_2', [[2, 'danger', 50]]); tsets(S, 't3_0', [[2, 'danger', 50]]); tsets(S, 'd2', [[2, 'warn', 35]]);
  T(S, 'a1', 1, 7.4, ['계정 탈취된 메인테이너가 악성 버전 배포 (event-stream, ua-parser-js)', 'a hijacked maintainer publishes a malicious version (event-stream, ua-parser-js)'], 'scx-xs scx-r', 2);
  T(S, 'a2', 1, 8.4, ['이름 바꿔치기: reqeusts, lodahs · 설치 스크립트(postinstall)로 즉시 실행', 'typosquats like reqeusts or lodahs · postinstall scripts run immediately'], 'scx-xs scx-r', 2);
  box2(S, 'pv', 1, 9.8, 13.4, 1.4, ['사내 레지스트리: @corp/utils 1.2.0', 'private registry: @corp/utils 1.2.0'], 'ok', 3, { pct: 30 }); box2(S, 'pb', 17.6, 9.8, 13.4, 1.4, ['공개 레지스트리: 같은 이름 99.0.0', 'public registry: same name, 99.0.0'], 'danger', 3, { pct: 30 });
  T(S, 'dc', 1, 11.4, ['의존성 혼동: 설치 도구가 더 높은 버전인 공개 패키지를 골라 버려요', 'dependency confusion: the installer picks the public package with the higher version'], 'scx-xs scx-r', 3);
  [['락파일 + 무결성 해시', 'lockfile + integrity hashes'], ['npm ci · 스크립트 끄기', 'npm ci · no install scripts'], ['스코프·사설 레지스트리 고정', 'pin scopes to private registry'], ['SBOM · 서명된 출처(SLSA)', 'SBOM · signed provenance (SLSA)'], ['업데이트 검토 자동화', 'reviewed automated updates']].forEach((t, i) => box2(S, 'df' + i, 1 + i * 6.05, 12.6, 5.85, 1.5, t, 'ok', 4, { pct: 30 }));
  fin(S, 'z', 14.6, [['공급망 공격: 내가 쓴 코드가 아니라 내가 가져다 쓴 코드·도구를 노려요', 'supply-chain attacks target the code and tools you pull in, not the code you wrote', 'scx-xs scx-a'], ['SolarWinds(빌드 시스템), xz-utils(2024, 장기간 잠입한 메인테이너)처럼 피해가 넓게 퍼져요', 'SolarWinds (build system) and xz-utils (2024, a long-planted maintainer) show how widely it spreads']]);
  S.cap(1, '수많은 의존성', 'Countless dependencies').cap(2, '오염된 패키지', 'Poisoned packages').cap(3, '의존성 혼동', 'Dependency confusion').cap(4, '방어 수단', 'Defenses').cap(5, '공급망 공격', 'Supply-chain attacks');
  return S;
}
function sStride() {
  const S = scene({ id: 'sc-stride', steps: 5, per: 1.6 });
  box2(S, 'u', 1, 1.4, 5, 1.6, ['사용자', 'user'], 'line', 1, { pct: 40 }); rect(S, 'w', 9, 1.2, 5.6, 2, 'accent', 25, 1, { r: 1, html: ['웹 앱', 'web app'], cls: 'cz-c scx-c2' }); rect(S, 'a', 17.6, 1.2, 5.6, 2, 'accent', 25, 1, { r: 1, html: 'API', cls: 'cz-c scx-c2' });
  rect(S, 'db', 25.6, 1.4, 5.4, 1.6, 'warn', 25, 1, { r: .1, html: 'DB', cls: 'cz-c scx-c2', css: 'border-top:.14em solid var(--warn);border-bottom:.14em solid var(--warn)' });
  ar(S, 'e1', [6.1, 2.2], [8.9, 2.2], 'ink-3', 1, { h: .08 }); ar(S, 'e2', [14.7, 2.2], [17.5, 2.2], 'ink-3', 1, { h: .08 }); ar(S, 'e3', [23.3, 2.2], [25.5, 2.2], 'ink-3', 1, { h: .08 });
  seg(S, 'tb1', [7.5, .5], [7.5, 4], 1, 'danger', .08, { dash: 1 }); seg(S, 'tb2', [24.4, .5], [24.4, 4], 1, 'danger', .08, { dash: 1 }); T(S, 'tbl', 7.8, 3.4, ['신뢰 경계', 'trust boundary'], 'scx-tiny scx-r', 1);
  const ST = [['S', ['위장 → 인증', 'Spoofing → authentication']], ['T', ['변조 → 무결성', 'Tampering → integrity']], ['R', ['부인 → 감사 로그', 'Repudiation → audit logs']], ['I', ['정보 노출 → 기밀성', 'Info disclosure → confidentiality']], ['D', ['서비스 거부 → 가용성', 'Denial of service → availability']], ['E', ['권한 상승 → 인가', 'Elevation → authorization']]];
  ST.forEach(([l, t], i) => { const x = 1 + (i % 3) * 10.1, y = 4.8 + Math.floor(i / 3) * 1.7; box2(S, 'sl' + i, x, y, 1.6, 1.4, l, 'danger', 2, { pct: 35 }); box2(S, 'st' + i, x + 1.8, y, 8, 1.4, t, 'line', 2, { pct: 40 }); });
  [['S', 6.8, .3], ['T', 15.4, .3], ['I', 23.6, .3], ['D', 10.9, 3.4], ['E', 19.5, 3.4], ['R', 27.3, 3.2]].forEach(([l, x, y], i) => box2(S, 'tg' + i, x, y, 1.2, .9, l, 'danger', 3, { pct: 45 }));
  [['사용자→웹 S: 세션 탈취 → MFA, 짧은 세션', 'user→web S: stolen sessions → MFA, short sessions'], ['웹 D: 요청 폭주 → 속도 제한, CDN', 'web D: request floods → rate limits, CDN'], ['웹→API T: 요청 변조 → TLS, 서명', 'web→API T: tampering → TLS, signing'], ['API E: 남의 데이터 접근 → 객체 단위 인가 검사', 'API E: other users’ data → per-object authorization'], ['API→DB I: 유출 → 암호화, 최소 권한 계정', 'API→DB I: leaks → encryption, least-privilege accounts'], ['DB R: “내가 안 했다” → 변경 감사 로그', 'DB R: “I didn’t do it” → audit logs of changes']].forEach((t, i) => T(S, 'm' + i, 1 + (i % 2) * 15.3, 8.6 + Math.floor(i / 2) * 1, t, 'scx-tiny', 3));
  [['무엇을 만드나?', 'what are we building?'], ['무엇이 잘못될 수 있나?', 'what can go wrong?'], ['어떻게 대응하나?', 'what will we do about it?'], ['잘했나?', 'did we do a good job?']].forEach((t, i) => { box2(S, 'q' + i, 1 + i * 7.6, 12, 7.2, 1.4, t, 'accent', 4, { pct: 30 }); if (i < 3) ar(S, 'qa' + i, [8.25 + i * 7.6, 12.7], [8.55 + i * 7.6, 12.7], 'ink-3', 4, { h: .06 }); });
  fin(S, 'z', 14, [['위협 모델링: 설계 단계에서 데이터 흐름을 그리고 STRIDE로 “무엇이 잘못될까”를 체계적으로 찾아요', 'threat modeling draws the data flow at design time and uses STRIDE to find what can go wrong', 'scx-xs scx-a'], ['신뢰 경계를 넘는 화살표가 공격이 일어나는 곳 · 기능이 바뀔 때마다 다시 봐요', 'arrows crossing trust boundaries are where attacks happen · revisit whenever features change']]);
  S.cap(1, '데이터 흐름도', 'A data-flow diagram').cap(2, 'STRIDE 여섯 가지', 'The six STRIDE threats').cap(3, '흐름마다 위협과 대책', 'Threats and fixes per flow').cap(4, '네 가지 질문', 'Four questions').cap(5, '위협 모델링 (STRIDE)', 'Threat modeling (STRIDE)');
  return S;
}

return { css: CSSX, secs: [], add: {
  'sc-crypto': [
    item('sc-aesmode', '블록 암호 운용 모드', 'Block cipher modes', 'AES 같은 블록 암호는 16바이트씩만 암호화해요. 긴 데이터를 어떻게 이어 붙이느냐(운용 모드)에 따라 안전성이 크게 달라져요.', 'ECB는 블록을 따로따로 암호화해서 같은 평문 블록이 같은 암호문이 되고, 이미지의 무늬가 그대로 드러날 만큼 패턴이 새어 나가요. CBC는 IV와 앞 블록을, CTR은 카운터를 섞어 매번 다른 결과를 만들어요. 요즘 기본은 암호화와 위변조 검출 태그를 함께 주는 AEAD(AES-GCM, ChaCha20-Poly1305)이고, 같은 키로 nonce를 두 번 쓰면 안전성이 무너지니 라이브러리의 고수준 API를 써요.', 'Block ciphers like AES encrypt only 16 bytes at a time; how blocks are chained (the mode) decides how secure long data is.', 'ECB encrypts each block independently, so equal plaintext blocks become equal ciphertext and patterns leak, enough to keep an image’s outline visible. CBC mixes in an IV and the previous block, CTR a counter, so every block differs. Today’s default is an AEAD (AES-GCM, ChaCha20-Poly1305) that adds a tamper-detecting tag; reusing a nonce with the same key breaks security, so use a library’s high-level API.', sAesMode()),
    item('sc-hmac', 'HMAC과 메시지 인증 코드', 'HMAC and MACs', '비밀 키를 아는 쪽만 만들 수 있는 체크섬(MAC)으로, 메시지가 바뀌지 않았고 키를 가진 쪽이 보냈음을 확인해요.', '해시만 붙이면 공격자가 메시지를 고친 뒤 다시 계산하면 그만이에요. H(key ‖ msg)처럼 키를 앞에 붙여도 SHA-256은 길이 확장 공격으로 키 없이 뒤에 데이터를 덧붙인 값을 계산할 수 있어요. HMAC은 H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ m))으로 키를 두 번 감싸 이를 막아요. 웹훅 서명, AWS SigV4, JWT HS256에 쓰이고, 검증할 땐 상수 시간 비교를 해요.', 'A checksum only holders of a secret key can produce, proving a message is unchanged and came from a key holder.', 'A bare hash is useless: an attacker edits the message and recomputes it. Even H(key ‖ msg) fails with SHA-256, whose length-extension property lets an attacker append data and compute a valid value without the key. HMAC, H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ m)), wraps the key twice to block this. It signs webhooks, AWS SigV4 requests and JWT HS256 tokens, and verification should use a constant-time comparison.', sHmac()),
    item('sc-rand', '안전한 난수 (CSPRNG)', 'Secure randomness (CSPRNG)', '토큰·키·비밀번호 재설정 링크에 쓰는 난수는 출력을 아무리 봐도 다음 값을 알 수 없는 암호학적으로 안전한 생성기에서 만들어야 해요.', 'Math.random() 같은 일반 PRNG는 빠르지만 출력 몇 개로 내부 상태를 복원해 다음 값을 예측할 수 있어요. CSPRNG는 OS가 인터럽트 타이밍, 지터, 하드웨어 RNG에서 모은 엔트로피로 시드하고 ChaCha20 같은 암호 알고리즘으로 늘려요. crypto.getRandomValues, secrets.token_urlsafe, /dev/urandom을 쓰고, 비밀 토큰은 128비트 이상, 시간·PID로 시드를 만들지 말아요.', 'Random values for tokens, keys and password-reset links must come from a cryptographically secure generator whose next output can’t be predicted.', 'Ordinary PRNGs like Math.random() are fast, but a few outputs reveal their internal state and the next values. A CSPRNG is seeded by the OS from interrupt timing, jitter and hardware RNGs, then stretched with a cipher such as ChaCha20. Use crypto.getRandomValues, secrets.token_urlsafe or /dev/urandom, give secret tokens at least 128 bits, and never seed from the time or PIDs.', sRand()),
    item('sc-timing', '타이밍 공격', 'Timing attacks', '처리 시간의 미세한 차이로 비밀을 한 조각씩 알아내는 공격이에요. 비밀 값 비교는 상수 시간으로 해야 해요.', '첫 번째로 다른 글자에서 바로 false를 돌려주는 비교는, 첫 글자가 맞을 때 조금 더 오래 걸려요. 공격자는 측정을 반복해 한 글자씩 맞혀서, 16ⁿ번이 필요한 추측을 16 × n번으로 줄여요. 모든 글자를 끝까지 XOR로 비교하는 상수 시간 비교(crypto.timingSafeEqual, hmac.compare_digest)로 막아요. 캐시 타이밍(Spectre), 전력 분석도 같은 계열의 부채널 공격이에요.', 'An attack that learns secrets piece by piece from tiny differences in processing time; compare secret values in constant time.', 'A comparison that returns at the first mismatch takes slightly longer when the first character is right. Repeating measurements, an attacker guesses one character at a time, cutting 16ⁿ guesses to 16 × n. Constant-time comparison, XOR-ing every character to the end (crypto.timingSafeEqual, hmac.compare_digest), stops it. Cache timing (Spectre) and power analysis are related side channels.', sTiming())
  ],
  'sc-web': [
    item('sc-ssrf', 'SSRF', 'Server-side request forgery', '서버가 사용자 대신 URL을 요청하는 기능을 악용해, 밖에서는 닿을 수 없는 내부망 자원에 접근하는 공격이에요.', '링크 미리보기에 url=http://169.254.169.254/…를 넣으면 클라우드 서버가 메타데이터 서비스에 접속해 IAM 임시 키를 돌려줄 수 있어요(2019년 Capital One 유출). 내부 Redis, localhost 관리자 페이지도 노려지고, 리다이렉트·DNS 리바인딩·10진수 IP로 필터를 우회해요. 허용 목록, DNS 해석 후 사설 IP 차단, 리다이렉트 끄기, IMDSv2, 이그레스 방화벽으로 막아요.', 'An attack abusing a server-side URL fetch to reach internal resources that are unreachable from outside.', 'Feeding a link preview url=http://169.254.169.254/… can make a cloud server query its metadata service and return temporary IAM keys (the 2019 Capital One breach). Internal Redis instances and localhost admin pages are targets too, with filters bypassed via redirects, DNS rebinding or decimal IPs. Defend with allowlists, blocking private IPs after DNS resolution, disabling redirects, IMDSv2 and egress firewalls.', sSsrf()),
    item('sc-path', '경로 조작과 명령 주입', 'Path traversal and command injection', '사용자 입력이 파일 경로나 셸 명령의 구조를 바꿔, 의도하지 않은 파일을 읽거나 명령을 실행하게 만드는 공격이에요.', 'path.join("/srv/files", file)에 ../../etc/passwd를 넣으면 루트까지 올라가 시스템 파일을 읽어요. exec("ping " + host)에 "8.8.8.8; cat /etc/passwd"를 넣으면 셸이 ; 뒤를 두 번째 명령으로 실행해요. 경로는 resolve로 정규화한 뒤 기준 디렉터리 안인지 확인하고, 명령은 셸 없이 인자 배열(execFile)로 넘기며, 가능하면 파일명 대신 ID를 받고 최소 권한으로 실행해요.', 'Attacks where user input changes the structure of a file path or shell command, reading unintended files or running unintended commands.', 'Passing ../../etc/passwd into path.join("/srv/files", file) climbs to the root and reads system files. Passing "8.8.8.8; cat /etc/passwd" into exec("ping " + host) makes the shell run a second command after the semicolon. Normalize paths with resolve and check they stay under the base directory, pass commands as argument arrays without a shell (execFile), accept IDs instead of file names where possible and run with least privilege.', sPath())
  ],
  'sc-ops': [
    item('sc-supply', '공급망 공격', 'Supply-chain attacks', '내가 쓴 코드가 아니라 가져다 쓰는 패키지·빌드 도구를 오염시켜, 그걸 쓰는 모든 곳으로 퍼지는 공격이에요.', '직접 의존 몇 개가 전이 의존 수백~수천 개를 끌고 오고, 계정이 탈취된 메인테이너의 악성 버전(event-stream, ua-parser-js), 이름 바꿔치기, 설치 스크립트가 침투 경로가 돼요. 사내 패키지와 같은 이름의 높은 버전을 공개 레지스트리에 올리는 의존성 혼동도 있어요. 락파일과 무결성 해시, npm ci와 설치 스크립트 끄기, 스코프 고정, SBOM과 서명된 출처(SLSA), 검토된 자동 업데이트로 막아요.', 'Attacks that poison the packages and build tools you pull in rather than your own code, spreading to everyone who uses them.', 'A few direct dependencies drag in hundreds or thousands of transitive ones, and entry points include hijacked maintainers publishing malicious versions (event-stream, ua-parser-js), typosquats and install scripts. Dependency confusion publishes a higher-versioned package under an internal name on a public registry. Defend with lockfiles and integrity hashes, npm ci with install scripts disabled, pinned scopes, SBOMs, signed provenance (SLSA) and reviewed automated updates.', sSupply()),
    item('sc-stride', '위협 모델링 (STRIDE)', 'Threat modeling (STRIDE)', '설계 단계에서 데이터 흐름도를 그리고 STRIDE 여섯 가지 관점으로 “무엇이 잘못될 수 있나”를 체계적으로 찾는 방법이에요.', 'STRIDE는 위장(→ 인증), 변조(→ 무결성), 부인(→ 감사 로그), 정보 노출(→ 기밀성), 서비스 거부(→ 가용성), 권한 상승(→ 인가)이에요. 사용자 → 웹 → API → DB 흐름에서 신뢰 경계를 넘는 화살표마다 위협과 대책(MFA, 속도 제한, TLS·서명, 객체 단위 인가, 암호화, 감사 로그)을 붙여요. “무엇을 만드나, 무엇이 잘못될까, 어떻게 대응할까, 잘했나”의 네 질문을 기능이 바뀔 때마다 다시 던져요.', 'Drawing the data flow at design time and using STRIDE’s six lenses to find systematically what can go wrong.', 'STRIDE covers spoofing (→ authentication), tampering (→ integrity), repudiation (→ audit logs), information disclosure (→ confidentiality), denial of service (→ availability) and elevation of privilege (→ authorization). For a user → web → API → DB flow, each arrow crossing a trust boundary gets threats and mitigations: MFA, rate limits, TLS and signing, per-object authorization, encryption and audit logs. Ask the four questions (what are we building, what can go wrong, what will we do, did we do well) again whenever features change.', sStride())
  ]
} };
})();

window.UX = page([
  sec('sc-crypto', '암호', 'Cryptography', '암호 기술의 기초', 'Cryptography basics',
    '데이터를 숨기고, 바뀌지 않았음을 증명하고, 누가 보냈는지 확인하는 도구예요.', 'Tools to hide data, prove it hasn’t changed and confirm who sent it.', [
    item('sc-hash', '해시 함수', 'Hash function', '어떤 데이터든 고정 길이의 값(다이제스트)으로 바꿔요. 같은 입력은 항상 같은 값, 조금만 달라도 전혀 다른 값이 나오고 거꾸로 되돌릴 수 없어요.', '파일 무결성 검사(체크섬), git 커밋 ID, 캐시 키, 비밀번호 저장에 써요. MD5·SHA-1은 충돌이 발견돼 보안 용도로 쓰지 마세요.', 'Turns any data into a fixed-length digest: the same input always gives the same output, a tiny change gives a totally different one, and it can’t be reversed.', 'Used for checksums, git commit ids, cache keys and password storage. MD5 and SHA-1 are broken for security use.', sHash()),
    item('sc-sym', '대칭키 암호', 'Symmetric encryption', '암호화와 복호화에 같은 키를 써요. 빠르지만 양쪽이 같은 키를 미리 안전하게 나눠 가져야 해요.', 'AES가 표준이에요. 디스크·DB 암호화, HTTPS의 실제 데이터 암호화에 써요. 키 자체는 공개키 방식으로 교환해요.', 'Uses the same key to encrypt and decrypt: fast, but both sides must already share the key securely.', 'AES is the standard, used for disk and database encryption and for HTTPS bulk data; the key itself is exchanged with public-key methods.', sSym()),
    item('sc-pk', '공개키 암호', 'Public-key cryptography', '공개키와 개인키 한 쌍을 써요. 공개키로 잠근 것은 짝이 되는 개인키로만 열 수 있어서, 키를 몰래 나눌 필요가 없어요.', 'HTTPS, SSH, 이메일 암호화의 기반이에요. 개인키가 유출되면 끝이니 서버 키·SSH 키는 철저히 보관하세요.', 'Uses a key pair: what the public key locks, only the matching private key opens, so no secret has to be shared in advance.', 'The basis of HTTPS, SSH and encrypted email. A leaked private key is game over, so guard server and SSH keys carefully.', sPK()),
    item('sc-sign', '전자 서명', 'Digital signature', '개인키로 서명하고 공개키로 검증해요. 누가 썼는지(인증)와 내용이 바뀌지 않았음(무결성)을 함께 증명해요.', '앱·패키지 코드 서명, JWT, 블록체인 거래, 인증서가 모두 서명을 써요.', 'Sign with the private key, verify with the public key: it proves both who wrote it and that it wasn’t altered.', 'Code signing for apps and packages, JWTs, blockchain transactions and certificates all rely on signatures.', sSign()),
    item('sc-dh', '키 교환 (디피-헬먼)', 'Key exchange · Diffie–Hellman', '서로 공개된 값만 주고받고도 양쪽이 같은 비밀 키를 만들어 내는 방법이에요. 도청자는 같은 키를 만들 수 없어요.', 'TLS 1.3의 ECDHE가 이것이고, 세션마다 새 키를 만들어 나중에 키가 털려도 지난 통신은 안전해요(전방 비밀성).', 'Two sides exchange only public values yet end up with the same secret key; an eavesdropper can’t compute it.', 'TLS 1.3 uses ECDHE with fresh keys per session, so a later key leak doesn’t expose past traffic (forward secrecy).', sDH()),
    item('sc-cert', '인증서와 CA', 'Certificates · CA', '인증서는 "이 공개키는 이 도메인의 것"이라고 믿을 만한 기관(CA)이 서명한 문서예요. 브라우저는 내장된 루트 CA까지 서명이 이어지는지 확인해요.', '인증서 만료는 흔한 장애 원인이라 자동 갱신을 꼭 설정하세요. 중간 인증서를 빠뜨리면 일부 기기에서만 오류가 나요.', 'A certificate is a document signed by a trusted authority saying “this public key belongs to this domain”; browsers check the chain up to a built-in root.', 'Expiry is a common outage, so automate renewal. Forgetting the intermediate cert breaks only some devices.', sCert()),
    item('sc-pwhash', '비밀번호 저장', 'Password storage', '비밀번호는 원문이 아니라 사용자마다 다른 솔트를 붙여 일부러 느린 해시(bcrypt, Argon2)로 저장해요.', 'DB가 유출돼도 해독에 엄청난 시간이 들게 만드는 게 목표예요. 직접 암호 알고리즘을 만들지 말고 검증된 라이브러리를 쓰세요.', 'Store passwords not as text but as slow salted hashes (bcrypt, Argon2), with a different salt per user.', 'The goal is that a leaked database still takes enormous effort to crack. Use vetted libraries; never invent crypto.', sPw())
  ].concat(XT.add['sc-crypto'] || [])),
  sec('sc-auth', '인증·인가', 'Auth', '인증과 인가', 'Authentication and authorization',
    '누구인지 확인하고, 무엇을 할 수 있는지 정해요.', 'Confirming who someone is and deciding what they may do.', [
    item('sc-authn', '인증 vs 인가', 'Authentication vs authorization', '인증은 "누구인지" 확인하는 것이고, 인가는 확인된 사람이 "무엇을 할 수 있는지" 정하는 거예요.', '로그인 안 됨은 401, 로그인했지만 권한 없음은 403이에요. 권한 검사는 화면이 아니라 반드시 서버에서 해야 해요.', 'Authentication confirms who you are; authorization decides what you are allowed to do.', 'Not logged in is 401; logged in but not allowed is 403. Always enforce permissions on the server, not just the UI.', sAuthn()),
    item('sc-session', '세션 vs 토큰', 'Session vs token', '세션 방식은 서버가 로그인 정보를 저장하고 쿠키로 식별자만 줘요. 토큰 방식은 정보가 담긴 서명된 토큰을 줘서 서버가 저장하지 않아요.', '웹은 HttpOnly 쿠키 세션이 단순하고 안전해요. 모바일·여러 서비스 간에는 토큰이 편하지만 취소가 어려워 만료를 짧게 둬요.', 'Sessions keep login state on the server and give the browser just an id cookie; tokens hand out signed data so the server stores nothing.', 'For websites, HttpOnly cookie sessions are simple and safe. Tokens suit mobile and multi-service setups but are hard to revoke, so keep them short-lived.', sSession()),
    item('sc-jwt', 'JWT', 'JWT · JSON Web Token', '헤더.페이로드.서명 세 부분으로 된 토큰이에요. 페이로드는 누구나 읽을 수 있고, 서명 덕분에 내용을 바꾸면 들켜요.', '민감 정보를 넣지 말고, 알고리즘을 서버에서 고정하고, 만료(exp)를 꼭 확인하세요. localStorage 보관은 XSS에 취약해요.', 'A token in three parts, header.payload.signature. Anyone can read the payload, but the signature exposes any tampering.', 'Keep secrets out of it, pin the algorithm server-side and always check expiry. Storing it in localStorage exposes it to XSS.', sJWT()),
    item('sc-oauth', 'OAuth 2.0 · 소셜 로그인', 'OAuth 2.0 · Social login', '비밀번호를 넘기지 않고, 다른 서비스(구글 등)가 발급한 토큰으로 정해진 범위의 권한만 위임받아요.', '"구글로 로그인"은 OAuth 위의 OpenID Connect예요. 모바일·SPA는 PKCE를 꼭 쓰고, 리디렉트 URI를 정확히 등록하세요.', 'Delegates limited access through a token issued by another service, such as Google, without ever sharing the password.', '“Sign in with Google” is OpenID Connect on top of OAuth. Use PKCE for mobile and SPAs and register exact redirect URIs.', sOAuth()),
    item('sc-mfa', '다중 인증 (MFA)', 'Multi-factor authentication', '비밀번호(아는 것)에 휴대폰 코드·보안 키(가진 것)나 지문(나 자신)을 더해 확인해요.', '비밀번호 유출 공격 대부분을 막아요. SMS보다 OTP 앱, 그보다 패스키·보안 키(FIDO2)가 피싱에 강해요.', 'Combines a password (something you know) with a phone code or key (something you have) or a fingerprint (something you are).', 'It stops most stolen-password attacks. OTP apps beat SMS, and passkeys or FIDO2 keys resist phishing best.', sMFA()),
    item('sc-rbac', '권한 모델 (RBAC)', 'Role-based access control', '사용자에게 권한을 직접 주지 않고 역할(관리자, 편집자, 열람자)을 주고, 역할에 권한을 묶어요.', '필요한 최소한의 권한만 주는 최소 권한 원칙과 함께 써요. 조건이 복잡하면 속성 기반(ABAC)이나 정책 엔진을 써요.', 'Instead of granting permissions to people directly, assign roles (admin, editor, viewer) that carry permissions.', 'Pair it with least privilege. For complex conditions, use attribute-based control (ABAC) or a policy engine.', sRBAC())
  ].concat(XT.add['sc-auth'] || [])),
  sec('sc-web', '웹 보안', 'Web security', '웹 공격과 방어', 'Web attacks and defenses',
    '실제로 가장 많이 당하는 공격들과 막는 방법이에요.', 'The attacks that actually happen most, and how to stop them.', [
    item('sc-sqli', 'SQL 인젝션', 'SQL injection', '사용자 입력을 문자열로 이어 붙여 쿼리를 만들면, 입력에 섞인 SQL 코드가 그대로 실행돼요.', 'Prepared Statement(파라미터 바인딩)로 입력을 항상 값으로만 다루세요. DB 계정 권한도 최소로 두세요.', 'When user input is concatenated into a query string, SQL inside the input gets executed.', 'Use prepared statements (parameter binding) so input is always data, and give the database account minimal rights.', sSQLi()),
    item('sc-xss', 'XSS', 'XSS · Cross-site scripting', '공격자가 심은 스크립트가 다른 사용자의 브라우저에서 실행돼 쿠키·정보를 훔치거나 화면을 조작해요.', '출력 시 HTML 이스케이프, CSP 헤더, HttpOnly 쿠키로 막아요. 사용자 HTML을 허용해야 하면 DOMPurify 같은 정화 라이브러리를 쓰세요.', 'A script planted by an attacker runs in other users’ browsers, stealing cookies or altering the page.', 'Escape output, send a CSP header and use HttpOnly cookies. If you must allow user HTML, sanitize it with something like DOMPurify.', sXSS()),
    item('sc-csrf', 'CSRF', 'CSRF · Cross-site request forgery', '로그인된 사용자가 악성 사이트를 열면, 그 사이트가 사용자 몰래 다른 사이트로 요청을 보내고 브라우저가 쿠키를 자동으로 붙여요.', '쿠키에 SameSite=Lax/Strict를 설정하고, 상태를 바꾸는 요청엔 CSRF 토큰을 확인하세요. GET으로 상태를 바꾸면 안 돼요.', 'A logged-in user visits an evil page that silently sends requests to another site, and the browser attaches cookies automatically.', 'Set SameSite=Lax or Strict on cookies and check CSRF tokens on state-changing requests. Never change state with GET.', sCSRF()),
    item('sc-cors', 'CORS', 'CORS · Cross-origin resource sharing', '브라우저는 다른 출처(도메인·포트)의 응답을 기본으로 JS에 주지 않아요. 서버가 허용 헤더로 특정 출처를 허락해야 해요.', '"CORS 오류"는 브라우저가 막은 것이라 서버 헤더를 고쳐야 해요. Allow-Origin: * 와 쿠키 인증을 함께 쓰면 안 돼요.', 'Browsers withhold cross-origin responses from JavaScript by default; the server must allow specific origins with headers.', 'A “CORS error” is the browser blocking, fixed by server headers. Never combine Allow-Origin: * with cookie credentials.', sCORS()),
    item('sc-mitm', '중간자 공격', 'Man-in-the-middle', '통신 중간에 끼어든 공격자가 내용을 엿보거나 바꿔치기해요. 공용 와이파이가 대표적인 위험 지점이에요.', '모든 곳에 HTTPS를 쓰고 HSTS로 강제하세요. 앱에서는 인증서 검증을 끄는 코드를 절대 배포하지 마세요.', 'An attacker sitting between two parties reads or alters their traffic; public Wi-Fi is the classic risk.', 'Use HTTPS everywhere and enforce it with HSTS. Never ship app code that disables certificate verification.', sMITM()),
    item('sc-ddos', 'DDoS', 'DDoS · Distributed denial of service', '수많은 기기(봇넷)가 한꺼번에 요청을 보내 서버나 네트워크를 마비시켜요.', 'CDN·WAF(클라우드플레어 등)로 흡수하고, 레이트 리밋과 오토스케일링을 함께 써요. 비싼 API에 캐시가 없으면 작은 공격에도 쓰러져요.', 'Huge numbers of devices (a botnet) send traffic at once to knock a server or network offline.', 'Absorb it with a CDN or WAF (e.g. Cloudflare), plus rate limiting and autoscaling. Expensive uncached endpoints fall to small attacks.', sDDoS()),
    item('sc-idor', '접근 제어 실패 (IDOR)', 'Broken access control · IDOR', '로그인만 확인하고 그 데이터의 주인인지 확인하지 않아서, URL의 ID만 바꾸면 남의 데이터가 보여요.', 'OWASP Top 10의 1위예요. 모든 API에서 서버가 소유권·권한을 확인하고, 테스트에 "다른 사용자로 접근" 케이스를 넣으세요.', 'The server checks that you are logged in but not that you own the data, so changing an ID in the URL reveals others’ records.', 'It is number one in the OWASP Top 10. Check ownership on every API and test “access as another user” cases.', sIDOR())
  ].concat(XT.add['sc-web'] || [])),
  sec('sc-ops', '운영 보안', 'Operations', '운영 보안', 'Operational security',
    '코드 밖에서 새는 구멍을 막아요.', 'Plugging the holes outside the code.', [
    item('sc-secret', '비밀 정보 관리', 'Secrets management', 'API 키·DB 비밀번호 같은 비밀은 코드에 넣지 않고 환경 변수나 비밀 관리 서비스에 둬요.', '공개 저장소에 올라간 키는 몇 분 안에 수집돼요. git-secrets·gitleaks로 커밋 전에 막고, 유출되면 즉시 폐기·교체하세요.', 'Keep API keys and passwords out of code, in environment variables or a secret manager.', 'Keys pushed to public repos are harvested within minutes. Block them pre-commit with tools like gitleaks, and rotate immediately if leaked.', sSecret()),
    item('sc-fw', '방화벽과 네트워크 분리', 'Firewalls · Network segmentation', '외부에는 꼭 필요한 포트만 열고, DB 같은 내부 시스템은 외부에서 직접 접근할 수 없는 영역에 둬요.', '클라우드 보안 그룹에서 0.0.0.0/0으로 DB·SSH를 여는 실수가 흔해요. 관리 접속은 VPN이나 배스천을 거치게 하세요.', 'Open only the ports that must be public and keep internal systems like databases in zones unreachable from outside.', 'Opening DB or SSH ports to 0.0.0.0/0 in security groups is a common mistake. Route admin access through a VPN or bastion.', sFW())
  ].concat(XT.add['sc-ops'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.sc-m .in{font-family:var(--f-mono);font-size:.66em;font-weight:600}
.sc-xs .in{font-size:.52em}
.sc-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.sc-code{place-items:center start!important;padding-left:.7em}
.sc-code .in{font-family:var(--f-mono);font-size:.6em;font-weight:600}`;
})();
