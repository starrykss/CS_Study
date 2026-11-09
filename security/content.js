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
  text(S, 'pn', 24.7, 11, ['개인키는 절대 안 내보내요', 'private never leaves'], { cls: 'cz-t', s: hid() }); S.set('pn', 1, { opacity: '1' });
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
  ]),
  sec('sc-auth', '인증·인가', 'Auth', '인증과 인가', 'Authentication and authorization',
    '누구인지 확인하고, 무엇을 할 수 있는지 정해요.', 'Confirming who someone is and deciding what they may do.', [
    item('sc-authn', '인증 vs 인가', 'Authentication vs authorization', '인증은 "누구인지" 확인하는 것이고, 인가는 확인된 사람이 "무엇을 할 수 있는지" 정하는 거예요.', '로그인 안 됨은 401, 로그인했지만 권한 없음은 403이에요. 권한 검사는 화면이 아니라 반드시 서버에서 해야 해요.', 'Authentication confirms who you are; authorization decides what you are allowed to do.', 'Not logged in is 401; logged in but not allowed is 403. Always enforce permissions on the server, not just the UI.', sAuthn()),
    item('sc-session', '세션 vs 토큰', 'Session vs token', '세션 방식은 서버가 로그인 정보를 저장하고 쿠키로 식별자만 줘요. 토큰 방식은 정보가 담긴 서명된 토큰을 줘서 서버가 저장하지 않아요.', '웹은 HttpOnly 쿠키 세션이 단순하고 안전해요. 모바일·여러 서비스 간에는 토큰이 편하지만 취소가 어려워 만료를 짧게 둬요.', 'Sessions keep login state on the server and give the browser just an id cookie; tokens hand out signed data so the server stores nothing.', 'For websites, HttpOnly cookie sessions are simple and safe. Tokens suit mobile and multi-service setups but are hard to revoke, so keep them short-lived.', sSession()),
    item('sc-jwt', 'JWT', 'JWT · JSON Web Token', '헤더.페이로드.서명 세 부분으로 된 토큰이에요. 페이로드는 누구나 읽을 수 있고, 서명 덕분에 내용을 바꾸면 들켜요.', '민감 정보를 넣지 말고, 알고리즘을 서버에서 고정하고, 만료(exp)를 꼭 확인하세요. localStorage 보관은 XSS에 취약해요.', 'A token in three parts, header.payload.signature. Anyone can read the payload, but the signature exposes any tampering.', 'Keep secrets out of it, pin the algorithm server-side and always check expiry. Storing it in localStorage exposes it to XSS.', sJWT()),
    item('sc-oauth', 'OAuth 2.0 · 소셜 로그인', 'OAuth 2.0 · Social login', '비밀번호를 넘기지 않고, 다른 서비스(구글 등)가 발급한 토큰으로 정해진 범위의 권한만 위임받아요.', '"구글로 로그인"은 OAuth 위의 OpenID Connect예요. 모바일·SPA는 PKCE를 꼭 쓰고, 리디렉트 URI를 정확히 등록하세요.', 'Delegates limited access through a token issued by another service, such as Google, without ever sharing the password.', '“Sign in with Google” is OpenID Connect on top of OAuth. Use PKCE for mobile and SPAs and register exact redirect URIs.', sOAuth()),
    item('sc-mfa', '다중 인증 (MFA)', 'Multi-factor authentication', '비밀번호(아는 것)에 휴대폰 코드·보안 키(가진 것)나 지문(나 자신)을 더해 확인해요.', '비밀번호 유출 공격 대부분을 막아요. SMS보다 OTP 앱, 그보다 패스키·보안 키(FIDO2)가 피싱에 강해요.', 'Combines a password (something you know) with a phone code or key (something you have) or a fingerprint (something you are).', 'It stops most stolen-password attacks. OTP apps beat SMS, and passkeys or FIDO2 keys resist phishing best.', sMFA()),
    item('sc-rbac', '권한 모델 (RBAC)', 'Role-based access control', '사용자에게 권한을 직접 주지 않고 역할(관리자, 편집자, 열람자)을 주고, 역할에 권한을 묶어요.', '필요한 최소한의 권한만 주는 최소 권한 원칙과 함께 써요. 조건이 복잡하면 속성 기반(ABAC)이나 정책 엔진을 써요.', 'Instead of granting permissions to people directly, assign roles (admin, editor, viewer) that carry permissions.', 'Pair it with least privilege. For complex conditions, use attribute-based control (ABAC) or a policy engine.', sRBAC())
  ]),
  sec('sc-web', '웹 보안', 'Web security', '웹 공격과 방어', 'Web attacks and defenses',
    '실제로 가장 많이 당하는 공격들과 막는 방법이에요.', 'The attacks that actually happen most, and how to stop them.', [
    item('sc-sqli', 'SQL 인젝션', 'SQL injection', '사용자 입력을 문자열로 이어 붙여 쿼리를 만들면, 입력에 섞인 SQL 코드가 그대로 실행돼요.', 'Prepared Statement(파라미터 바인딩)로 입력을 항상 값으로만 다루세요. DB 계정 권한도 최소로 두세요.', 'When user input is concatenated into a query string, SQL inside the input gets executed.', 'Use prepared statements (parameter binding) so input is always data, and give the database account minimal rights.', sSQLi()),
    item('sc-xss', 'XSS', 'XSS · Cross-site scripting', '공격자가 심은 스크립트가 다른 사용자의 브라우저에서 실행돼 쿠키·정보를 훔치거나 화면을 조작해요.', '출력 시 HTML 이스케이프, CSP 헤더, HttpOnly 쿠키로 막아요. 사용자 HTML을 허용해야 하면 DOMPurify 같은 정화 라이브러리를 쓰세요.', 'A script planted by an attacker runs in other users’ browsers, stealing cookies or altering the page.', 'Escape output, send a CSP header and use HttpOnly cookies. If you must allow user HTML, sanitize it with something like DOMPurify.', sXSS()),
    item('sc-csrf', 'CSRF', 'CSRF · Cross-site request forgery', '로그인된 사용자가 악성 사이트를 열면, 그 사이트가 사용자 몰래 다른 사이트로 요청을 보내고 브라우저가 쿠키를 자동으로 붙여요.', '쿠키에 SameSite=Lax/Strict를 설정하고, 상태를 바꾸는 요청엔 CSRF 토큰을 확인하세요. GET으로 상태를 바꾸면 안 돼요.', 'A logged-in user visits an evil page that silently sends requests to another site, and the browser attaches cookies automatically.', 'Set SameSite=Lax or Strict on cookies and check CSRF tokens on state-changing requests. Never change state with GET.', sCSRF()),
    item('sc-cors', 'CORS', 'CORS · Cross-origin resource sharing', '브라우저는 다른 출처(도메인·포트)의 응답을 기본으로 JS에 주지 않아요. 서버가 허용 헤더로 특정 출처를 허락해야 해요.', '"CORS 오류"는 브라우저가 막은 것이라 서버 헤더를 고쳐야 해요. Allow-Origin: * 와 쿠키 인증을 함께 쓰면 안 돼요.', 'Browsers withhold cross-origin responses from JavaScript by default; the server must allow specific origins with headers.', 'A “CORS error” is the browser blocking, fixed by server headers. Never combine Allow-Origin: * with cookie credentials.', sCORS()),
    item('sc-mitm', '중간자 공격', 'Man-in-the-middle', '통신 중간에 끼어든 공격자가 내용을 엿보거나 바꿔치기해요. 공용 와이파이가 대표적인 위험 지점이에요.', '모든 곳에 HTTPS를 쓰고 HSTS로 강제하세요. 앱에서는 인증서 검증을 끄는 코드를 절대 배포하지 마세요.', 'An attacker sitting between two parties reads or alters their traffic; public Wi-Fi is the classic risk.', 'Use HTTPS everywhere and enforce it with HSTS. Never ship app code that disables certificate verification.', sMITM()),
    item('sc-ddos', 'DDoS', 'DDoS · Distributed denial of service', '수많은 기기(봇넷)가 한꺼번에 요청을 보내 서버나 네트워크를 마비시켜요.', 'CDN·WAF(클라우드플레어 등)로 흡수하고, 레이트 리밋과 오토스케일링을 함께 써요. 비싼 API에 캐시가 없으면 작은 공격에도 쓰러져요.', 'Huge numbers of devices (a botnet) send traffic at once to knock a server or network offline.', 'Absorb it with a CDN or WAF (e.g. Cloudflare), plus rate limiting and autoscaling. Expensive uncached endpoints fall to small attacks.', sDDoS()),
    item('sc-idor', '접근 제어 실패 (IDOR)', 'Broken access control · IDOR', '로그인만 확인하고 그 데이터의 주인인지 확인하지 않아서, URL의 ID만 바꾸면 남의 데이터가 보여요.', 'OWASP Top 10의 1위예요. 모든 API에서 서버가 소유권·권한을 확인하고, 테스트에 "다른 사용자로 접근" 케이스를 넣으세요.', 'The server checks that you are logged in but not that you own the data, so changing an ID in the URL reveals others’ records.', 'It is number one in the OWASP Top 10. Check ownership on every API and test “access as another user” cases.', sIDOR())
  ]),
  sec('sc-ops', '운영 보안', 'Operations', '운영 보안', 'Operational security',
    '코드 밖에서 새는 구멍을 막아요.', 'Plugging the holes outside the code.', [
    item('sc-secret', '비밀 정보 관리', 'Secrets management', 'API 키·DB 비밀번호 같은 비밀은 코드에 넣지 않고 환경 변수나 비밀 관리 서비스에 둬요.', '공개 저장소에 올라간 키는 몇 분 안에 수집돼요. git-secrets·gitleaks로 커밋 전에 막고, 유출되면 즉시 폐기·교체하세요.', 'Keep API keys and passwords out of code, in environment variables or a secret manager.', 'Keys pushed to public repos are harvested within minutes. Block them pre-commit with tools like gitleaks, and rotate immediately if leaked.', sSecret()),
    item('sc-fw', '방화벽과 네트워크 분리', 'Firewalls · Network segmentation', '외부에는 꼭 필요한 포트만 열고, DB 같은 내부 시스템은 외부에서 직접 접근할 수 없는 영역에 둬요.', '클라우드 보안 그룹에서 0.0.0.0/0으로 DB·SSH를 여는 실수가 흔해요. 관리 접속은 VPN이나 배스천을 거치게 하세요.', 'Open only the ports that must be public and keep internal systems like databases in zones unreachable from outside.', 'Opening DB or SSH ports to 0.0.0.0/0 in security groups is a common mistake. Route admin access through a VPN or bastion.', sFW())
  ])
]);
window.UX[0].css += `
.sc-m .in{font-family:var(--f-mono);font-size:.66em;font-weight:600}
.sc-xs .in{font-size:.52em}
.sc-b .in{font-weight:800;color:var(--ink);font-size:.8em}
.sc-code{place-items:center start!important;padding-left:.7em}
.sc-code .in{font-family:var(--f-mono);font-size:.6em;font-weight:600}`;
})();
