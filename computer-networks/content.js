(() => {
const { scene, node, edge, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C, seq } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});

/* ---------- layers ---------- */
function sOSI() {
  const S = scene({ id: 'nt-osi', steps: 8, per: .9 });
  const L = [['7 응용', '7 Application', 'HTTP · DNS · SMTP'], ['6 표현', '6 Presentation', ['암호화 · 인코딩', 'encryption · encoding']], ['5 세션', '5 Session', ['연결 유지', 'sessions']], ['4 전송', '4 Transport', 'TCP · UDP'], ['3 네트워크', '3 Network', 'IP · ICMP'], ['2 데이터 링크', '2 Data link', ['이더넷 · Wi-Fi · MAC', 'Ethernet · Wi-Fi · MAC']], ['1 물리', '1 Physical', ['케이블 · 전파 · 비트', 'cables · radio · bits']]];
  const y = i => 1.6 + i * 2.55, h = 2.2;
  text(S, 'ho', 2, .3, 'OSI', { cls: 'cz-t' }); text(S, 'ht', 12.6, .3, 'TCP/IP', { cls: 'cz-t' });
  L.forEach(([k, e, ex], i) => { cell(S, 'o' + i, 2, y(i), [k, e], { w: 9.6, h, cls: 'cz-c cz-sm' }); text(S, 'x' + i, 21.4, y(i) + .55, ex, { cls: 'cz-t cz-mono', s: hid() }); S.set('o' + i, i + 1, C.soft).set('x' + i, i + 1, { opacity: '1' }); if (i) S.set('o' + (i - 1), i + 1, C.idle); });
  const T = [[0, 3, ['응용', 'Application']], [3, 4, ['전송', 'Transport']], [4, 5, ['인터넷', 'Internet']], [5, 7, ['네트워크 접근', 'Link']]];
  T.forEach(([a, b, l], i) => { cell(S, 't' + i, 12.6, y(a), l, { w: 7.6, h: y(b - 1) + h - y(a), cls: 'cz-c cz-sm' }); for (let r = a; r < b; r++) { S.set('t' + i, r + 1, C.soft); if (r + 1 === b) S.set('t' + i, b + 1, C.idle); } });
  S.set('o6', 8, C.idle);
  S.cap(0, '네트워크 기능을 층으로 나눠 각자 맡은 일만 해요', 'Networking is split into layers, each with one job').cap(1, '위쪽은 앱이 쓰는 프로토콜', 'Top layers are the protocols apps speak')
    .cap(4, '전송 계층: 프로세스 사이의 연결 (포트)', 'Transport: process to process (ports)').cap(5, '네트워크 계층: 컴퓨터 사이의 길 찾기 (IP)', 'Network: host to host routing (IP)')
    .cap(6, '데이터 링크: 같은 네트워크 안의 전달 (MAC)', 'Link: delivery within one network (MAC)').cap(8, '실제 인터넷은 4계층 TCP/IP 모델로 동작해요', 'The real internet runs the 4-layer TCP/IP model');
  return S;
}
function sEncap() {
  const S = scene({ id: 'nt-encap', steps: 7, per: 1 });
  const y = 8.4, h = 3;
  const P = [['eth', 2.2, 4.4, ['이더넷', 'Ethernet'], C.cmp, 3], ['ip', 6.8, 4.2, 'IP', C.ok, 2], ['tcp', 11.2, 4.2, 'TCP', C.soft, 1], ['data', 15.6, 10, ['데이터 (HTTP)', 'Data (HTTP)'], {}, 0], ['fcs', 25.8, 3.6, 'FCS', C.cmp, 3]];
  P.forEach(([k, x, w, l, st, step]) => { cell(S, k, x, y, l, { w, h, cls: 'cz-c cz-sm', s: step ? Object.assign({ opacity: '0', transform: 'translateX(-1.2em)' }, st) : st }); if (step) S.set(k, step, { opacity: '1', transform: 'none' }); });
  const lab = (k, x, w, t, step) => { text(S, k, x, y + h + .5, t, { w, cls: 'cz-t cz-tc', s: hid() }); S.set(k, step, { opacity: '1' }); };
  lab('la', 15.6, 10, ['응용 계층', 'application'], 0); lab('lt', 11.2, 4.2, ['세그먼트', 'segment'], 1); lab('li', 6.8, 4.2, ['패킷', 'packet'], 2); lab('le', 2.2, 4.4, ['프레임', 'frame'], 3);
  S.set('la', 0, { opacity: '1' });
  text(S, 'pa', 2.2, 4.4, ['포트 번호', 'ports'], { w: 4.2, cls: 'cz-t cz-tc', s: hid() });
  ['eth', 'fcs'].forEach(k => S.set(k, 5, { opacity: '0' })); S.set('le', 5, { opacity: '0' });
  S.set('ip', 6, { opacity: '0' }).set('li', 6, { opacity: '0' });
  S.set('tcp', 7, { opacity: '0' }).set('lt', 7, { opacity: '0' });
  S.label('side', { cls: 'cz-t cz-tc os-lg', x: 6, y: 3.4, w: 20 }, [[0, ['보내는 쪽 ↓', 'Sender ↓']], [5, ['받는 쪽 ↑', 'Receiver ↑']]]);
  S.cap(0, '보낼 데이터에', 'Start with the data').cap(1, 'TCP 헤더 (포트·순서 번호)', 'add a TCP header (ports, sequence)').cap(2, 'IP 헤더 (출발·도착 IP)', 'an IP header (source and destination IP)')
    .cap(3, '이더넷 헤더 (MAC) + 오류 검사를 붙여 전송', 'and an Ethernet header (MAC) + checksum, then send')
    .cap(4, '각 계층은 자기 헤더만 읽고 써요', 'Each layer reads only its own header').cap(5, '받는 쪽은 아래 계층부터 하나씩 벗겨요', 'The receiver peels headers bottom-up').cap(7, '앱에는 데이터만 도착', 'The app gets just the data');
  return S;
}

/* ---------- link & internet ---------- */
function sMac() {
  const S = scene({ id: 'nt-mac', steps: 5, per: 1.2 });
  const H = { A: [4, 4], B: [28, 4], Cc: [4, 15.5], D: [28, 15.5] }, SW = [16, 9.7];
  Object.entries(H).forEach(([k, [x, y]], i) => { edge(S, 'e' + k, x, y, SW[0], SW[1]); node(S, 'h' + k, x, y, k === 'Cc' ? 'C' : k, { r: 1.5 }); text(S, 'pn' + k, x + (x < 16 ? 2 : -4.6), y - .4, [`포트 ${i + 1}`, `port ${i + 1}`], { cls: 'cz-t' }); });
  box(S, 'sw', SW[0] - 3.6, SW[1] - 1.7, 7.2, 3.4, ['스위치', 'Switch']);
  text(S, 'tt', 10.2, 14.4, ['MAC 테이블', 'MAC table'], { cls: 'cz-t' });
  cell(S, 'r0', 10.2, 15.8, ['A → 포트 1', 'A → port 1'], { w: 11.6, h: 1.9, cls: 'cz-c cz-sm', s: hid(C.soft) });
  cell(S, 'r1', 10.2, 18, ['B → 포트 2', 'B → port 2'], { w: 11.6, h: 1.9, cls: 'cz-c cz-sm', s: hid(C.soft) });
  const edgeP = (h) => [SW[0] + (h[0] - SW[0]) * .34, SW[1] + (h[1] - SW[1]) * .34];
  const mv = (k, from, to, st, lab, sty) => { dot(S, k, from[0], from[1], lab, { r: .8, s: hid(sty || C.cur) }); S.set(k, st, { opacity: '1' }).move(k, st, to[0] - .8, to[1] - .8).set(k, st + 1, { opacity: '0' }); };
  mv('f1', H.A, edgeP(H.A), 1, 'A→B');
  S.set('r0', 1, { opacity: '1' });
  mv('f2', edgeP(H.B), H.B, 2, '?', C.warn); mv('f3', edgeP(H.Cc), H.Cc, 2, '?', C.warn); mv('f4', edgeP(H.D), H.D, 2, '?', C.warn);
  mv('f5', H.B, edgeP(H.B), 3, 'B→A', C.ok); S.set('r1', 3, { opacity: '1' });
  mv('f6', edgeP(H.A), H.A, 4, 'B→A', C.ok);
  S.set('hA', 1, C.soft).set('hA', 2, C.idle).set('hB', 3, C.ok).set('hB', 4, C.idle).set('hA', 4, C.ok);
  S.cap(1, 'A가 B에게 보내면 스위치가 "A는 포트 1"을 기억해요', 'A sends to B; the switch learns A is on port 1').cap(2, 'B의 위치를 모르니 모든 포트로 보내요 (플러딩)', 'It does not know B yet, so it floods every port')
    .cap(3, 'B가 답하면 B의 포트도 배워요', 'B replies, so it learns B’s port too').cap(4, '이제 필요한 포트로만 전달해요', 'Now it forwards only to the right port').cap(5, '스위치는 MAC 주소로 같은 네트워크 안을 연결해요', 'Switches connect a local network by MAC address');
  return S;
}
function sARP() {
  const S = scene({ id: 'nt-arp', steps: 5, per: 1.3 });
  S.el('bus', { x: 3, y: 11.4, w: 26, h: .2, css: 'background:var(--ink-3);border-radius:1em' });
  const H = [['A', 4.5, '.2'], ['B', 12.5, '.3'], ['Cc', 20.5, '.4'], ['D', 28, '.5']];
  H.forEach(([k, x, ip]) => { S.el('v' + k, { x: x - .08, y: 7.8, w: .16, h: 3.6, css: 'background:var(--ink-3)' }); node(S, 'h' + k, x, 6.6, k === 'Cc' ? 'C' : k, { r: 1.5 }); text(S, 'ip' + k, x - 2.6, 3.4, '192.168.0' + ip, { w: 5.2, cls: 'cz-t cz-tc cz-mono' }); });
  pill(S, 'rq', 1.5, 13.4, ['누가 192.168.0.5예요? (전체에게)', 'Who has 192.168.0.5? (broadcast)'], { w: 16, h: 2, s: hid(C.cmp) });
  pill(S, 'rp', 14.5, 13.4, ['저예요 · MAC aa:bb:cc:dd:ee:05', 'Me · MAC aa:bb:cc:dd:ee:05'], { w: 16, h: 2, s: hid(C.ok) });
  S.set('rq', 1, { opacity: '1' }).set('hB', 1, C.cmp).set('hCc', 1, C.cmp).set('hD', 1, C.cmp).set('hA', 1, C.soft);
  S.set('hB', 2, { opacity: '.35', background: 'var(--ui)' }).set('hCc', 2, { opacity: '.35', background: 'var(--ui)' }).set('hD', 2, C.ok).set('rq', 2, { opacity: '.35' }).set('rp', 2, { opacity: '1' });
  cell(S, 'cache', 6, 17, ['ARP 캐시: 192.168.0.5 → aa:bb:cc:dd:ee:05', 'ARP cache: 192.168.0.5 → aa:bb:cc:dd:ee:05'], { w: 20, h: 2.2, cls: 'cz-c cz-sm', s: hid(C.soft) });
  S.set('cache', 3, { opacity: '1' });
  S.set('hB', 4, { opacity: '1' }).set('hCc', 4, { opacity: '1' });
  S.cap(0, 'IP는 알지만 실제로 보내려면 MAC 주소가 필요해요', 'Knowing the IP is not enough: frames need a MAC address').cap(1, '네트워크 전체에 물어보면', 'Ask everyone on the network')
    .cap(2, '해당 IP를 가진 기기만 대답해요', 'Only the owner of that IP replies').cap(3, '답을 캐시에 저장해 다음엔 묻지 않아요', 'The answer is cached for next time').cap(5, '다른 네트워크로 갈 땐 라우터(게이트웨이)의 MAC으로 보내요', 'For other networks, frames go to the gateway’s MAC');
  return S;
}
function sIP() {
  const S = scene({ id: 'nt-ip', steps: 5, per: 1.3 });
  const x = i => 7.6 + i * 5.6, rows = [['주소', 'address', ['192', '168', '10', '37'], 2.6], ['마스크 /24', 'mask /24', ['255', '255', '255', '0'], 6.6], ['네트워크', 'network', ['192', '168', '10', '0'], 10.6], ['다른 주소', 'other', ['192', '168', '11', '5'], 15.2]];
  rows.forEach(([k, e, v, y], r) => {
    text(S, 'l' + r, .9, y + .7, [k, e], { cls: 'cz-t', s: r ? hid() : {} });
    v.forEach((t, i) => cell(S, `c${r}_${i}`, x(i), y, t, { w: 4.8, h: 2.4, s: r ? hid(i < 3 && r < 3 ? C.soft : {}) : (i < 3 ? {} : {}) }));
    if (r) { S.set('l' + r, r === 3 ? 4 : r, { opacity: '1' }); v.forEach((_, i) => S.set(`c${r}_${i}`, r === 3 ? 4 : r, { opacity: '1' })); }
  });
  [0, 1, 2].forEach(i => S.set(`c0_${i}`, 1, C.soft)); S.set('c0_3', 1, C.cmp);
  text(S, 'and', 7.6, 9.4, ['AND 연산 → 네트워크 주소', 'AND → network address'], { cls: 'cz-t', s: hid() }); S.set('and', 2, { opacity: '1' });
  S.label('rng', { cls: 'cz-t cz-mono os-lg', x: 7.6, y: 13.4, w: 22 }, [[0, ''], [3, ['호스트 .1 ~ .254 (254대)', 'hosts .1 – .254 (254)']]]);
  S.set('c3_2', 4, C.bad).set('c2_2', 4, C.cmp);
  S.cap(0, 'IPv4 주소는 8비트씩 4칸, 총 32비트', 'An IPv4 address is 4 × 8 bits = 32 bits').cap(1, '/24 = 앞 24비트가 네트워크, 나머지가 호스트', '/24 = first 24 bits network, the rest host')
    .cap(2, '마스크와 AND 하면 네트워크 주소', 'AND with the mask gives the network').cap(3, '같은 네트워크 안의 기기 범위', 'The range of hosts in this network')
    .cap(4, '네트워크 부분이 다르면 라우터(게이트웨이)로 보내요', 'A different network part goes via the router').cap(5, 'IPv4가 부족해서 IPv6(128비트)와 NAT를 써요', 'IPv4 ran out, hence IPv6 (128 bits) and NAT');
  return S;
}
function sRoute() {
  const S = scene({ id: 'nt-route', steps: 7, per: 1.05 });
  const P = { A: [2.6, 10.5], R1: [9.4, 10.5], R2: [16, 4.6], R3: [16, 16.4], R4: [22.6, 10.5], B: [29.4, 10.5] };
  const E = [['A', 'R1'], ['R1', 'R2'], ['R1', 'R3'], ['R2', 'R4'], ['R3', 'R4'], ['R4', 'B']];
  E.forEach(([a, b]) => edge(S, 'e' + a + b, P[a][0], P[a][1], P[b][0], P[b][1]));
  Object.entries(P).forEach(([k, [x, y]]) => node(S, 'n' + k, x, y, k, { r: k.length > 1 ? 1.4 : 1.2, s: k.length > 1 ? {} : C.cmp }));
  pill(S, 'tb', 2.6, 13.6, 'B → R2', { w: 6.6, h: 1.8, s: hid(C.soft) });
  const go = (k, path, steps) => { dot(S, k, P[path[0]][0], P[path[0]][1] - 2.2, '', { r: .65, s: hid(C.cur) }); path.forEach((n, i) => { if (i) S.move(k, steps[i - 1], P[n][0] - .65, P[n][1] - 2.2 - .65); }); S.set(k, steps[0] - 1 || 1, { opacity: '1' }); };
  dot(S, 'p1', P.A[0], P.A[1] - 2.2, '', { r: .65, s: C.cur });
  ['R1', 'R2', 'R4', 'B'].forEach((n, i) => S.move('p1', i + 1, P[n][0] - .65, P[n][1] - 2.2 - .65));
  ['eAR1', 'eR1R2', 'eR2R4', 'eR4B'].forEach((e, i) => S.set(e, i + 1, { background: 'var(--accent)' }));
  S.set('tb', 1, { opacity: '1' }).set('tb', 2, { opacity: '0' });
  S.set('eR2R4', 5, { background: 'var(--danger)', opacity: '.5' }).set('nR2', 5, C.bad).set('p1', 5, { opacity: '0' });
  ['eAR1', 'eR1R2', 'eR4B'].forEach(e => S.set(e, 5, { background: 'var(--line)' }));
  dot(S, 'p2', P.A[0], P.A[1] - 2.2, '', { r: .65, s: hid(C.ok) });
  S.set('p2', 5, { opacity: '1' }).move('p2', 6, P.R3[0] - .65, P.R3[1] + 2.2 - .65).move('p2', 7, P.B[0] - .65, P.B[1] - 2.2 - .65);
  ['eAR1', 'eR1R3'].forEach(e => S.set(e, 6, { background: 'var(--ok)' })); ['eR3R4', 'eR4B'].forEach(e => S.set(e, 7, { background: 'var(--ok)' }));
  S.cap(1, '라우터는 목적지 IP를 보고 다음 홉만 정해요', 'Each router just picks the next hop for the destination IP').cap(3, '홉을 거치며 목적지까지', 'Hop by hop to the destination')
    .cap(5, '링크가 끊기면', 'When a link fails').cap(6, '라우팅 프로토콜이 우회 경로를 찾아요 (OSPF·BGP)', 'routing protocols find another way (OSPF, BGP)').cap(7, '인터넷에는 정해진 중앙 경로가 없어요', 'The internet has no fixed central route');
  return S;
}
function sNAT() {
  const S = scene({ id: 'nt-nat', steps: 5, per: 1.3 });
  box(S, 'lan', .8, 2, 9.4, 10.4, '', { css: 'background:transparent;box-shadow:none;border-style:dashed' });
  text(S, 'lt', 1.4, 2.3, ['사설망', 'Private LAN'], { cls: 'cz-t' });
  box(S, 'pc1', 1.6, 4.2, 7.8, 2.8, '192.168.0.2', { cls: 'cz-box cz-bx cz-mono' }); box(S, 'pc2', 1.6, 8.4, 7.8, 2.8, '192.168.0.3', { cls: 'cz-box cz-bx cz-mono' });
  box(S, 'rt', 12.4, 4.2, 7.4, 3.6, ['공유기 (NAT)', 'Router (NAT)']); text(S, 'rip', 12.4, 8.2, '203.0.113.7', { w: 7.4, cls: 'cz-t cz-tc cz-mono' });
  box(S, 'sv', 24, 4.2, 7, 3.6, ['서버', 'Server']);
  const pk = (k, x, l, st) => pill(S, k, x, 13.2, l, { w: 10.6, h: 1.8, cls: 'cz-pill cz-mono', s: hid(st) });
  pk('a', 1, 'src 192.168.0.2:5000', C.cur); pk('b', 10.8, 'src 203.0.113.7:40001', C.cmp); pk('c', 20.6, 'dst 203.0.113.7:40001', C.ok); pk('d', 10.8, 'dst 192.168.0.2:5000', C.ok);
  S.set('a', 1, { opacity: '1' }).move('a', 2, 10.8, 13.2).set('a', 2, { opacity: '0' });
  S.set('b', 2, { opacity: '1' }).move('b', 3, 20.6, 13.2).set('b', 3, { opacity: '0' });
  S.set('c', 3, { opacity: '1' }).move('c', 4, 10.8, 13.2).set('c', 4, { opacity: '0' });
  S.set('d', 4, { opacity: '1' }).move('d', 5, 1, 13.2);
  text(S, 'th', 6, 15.8, ['NAT 테이블', 'NAT table'], { cls: 'cz-t' });
  cell(S, 'row', 6, 17.2, '192.168.0.2:5000 ↔ 203.0.113.7:40001', { w: 20, h: 2.2, cls: 'cz-c cz-sm', s: hid(C.soft) });
  S.set('row', 2, { opacity: '1' }).set('row', 4, C.cmp).set('row', 5, C.soft).set('rt', 2, C.soft).set('rt', 3, C.idle).set('rt', 4, C.soft).set('rt', 5, C.idle).set('pc1', 5, C.ok);
  S.cap(1, '집 안 기기는 사설 IP라 인터넷에서 보이지 않아요', 'Home devices have private IPs, invisible on the internet').cap(2, '공유기가 출발 주소를 공인 IP:포트로 바꾸고 기록해요', 'The router rewrites the source to its public IP:port and records it')
    .cap(3, '서버는 공유기 주소만 알아요', 'The server only sees the router').cap(4, '응답이 오면 표를 보고', 'When the reply comes back')
    .cap(5, '원래 기기로 돌려줘요 · 공인 IP 하나로 여러 기기 사용', 'it goes to the right device · one public IP, many devices');
  return S;
}
function sDHCP() {
  return seq('nt-dhcp', [['새 기기', 'New device'], ['DHCP 서버', 'DHCP server']], [
    { f: 0, t: 1, l: ['DISCOVER: IP 주실 분? (전체에게)', 'DISCOVER: any IP? (broadcast)'], cap: ['네트워크에 막 연결돼 IP가 없어요', 'Just joined, no IP yet'] },
    { f: 1, t: 0, l: ['OFFER: 192.168.0.23 어때요?', 'OFFER: how about 192.168.0.23?'], cap: ['서버가 빈 주소를 제안', 'The server offers a free address'] },
    { f: 0, t: 1, l: ['REQUEST: 그걸로 할게요', 'REQUEST: I’ll take it'], cap: ['기기가 그 주소를 요청', 'The device requests it'] },
    { f: 1, t: 0, l: ['ACK: 24시간 임대 + 게이트웨이·DNS', 'ACK: 24 h lease + gateway, DNS'], cap: ['확정 · 게이트웨이와 DNS 주소도 함께 받아요', 'Confirmed, with gateway and DNS settings'] },
    { f: 0, t: 0, l: ['192.168.0.23 사용', 'using 192.168.0.23'], cap: ['임대 기간이 끝나기 전에 갱신해요', 'It renews before the lease expires'] }
  ], { aw: 8, per: 1.2, gap: 3 });
}

/* ---------- transport ---------- */
function sHS() {
  return seq('nt-hs', [['클라이언트', 'Client'], ['서버', 'Server']], [
    { f: 1, t: 1, l: 'LISTEN', cap: ['서버는 연결을 기다리는 중', 'The server is listening'] },
    { f: 0, t: 1, l: 'SYN  seq=100', cap: ['① 연결하고 싶어요 (내 번호는 100)', '① I want to connect (my number is 100)'] },
    { f: 1, t: 0, l: 'SYN + ACK  seq=300, ack=101', cap: ['② 좋아요, 101 받을 준비됨 (내 번호는 300)', '② OK, ready for 101 (mine is 300)'] },
    { f: 0, t: 1, l: 'ACK  ack=301', cap: ['③ 확인했어요 · 연결 성립', '③ Got it · connection established'] },
    { f: 0, t: 1, l: ['데이터 전송', 'data'], c: 'accent', cap: ['이제 데이터를 주고받아요 · 연결에만 1 RTT', 'Now data flows · setup costs 1 round trip'] }
  ], { aw: 8, per: 1.25, gap: 3 });
}
function sFin() {
  return seq('nt-fin', [['클라이언트', 'Client'], ['서버', 'Server']], [
    { f: 0, t: 1, l: 'FIN', cap: ['① 보낼 건 다 보냈어요', '① I’m done sending'] },
    { f: 1, t: 0, l: 'ACK', cap: ['② 알겠어요 (서버는 남은 데이터를 마저 보내요)', '② OK (the server may still send)'] },
    { f: 1, t: 0, l: 'FIN', cap: ['③ 저도 끝났어요', '③ I’m done too'] },
    { f: 0, t: 1, l: 'ACK', cap: ['④ 확인', '④ Acknowledged'] },
    { f: 0, t: 0, l: 'TIME_WAIT', cap: ['늦게 온 패킷을 위해 잠시 기다린 뒤 닫아요', 'Waits a little for stray packets, then closes'] }
  ], { aw: 8, per: 1.1, gap: 3 });
}
function sUDP() {
  const S = scene({ id: 'nt-udp', steps: 6, per: 1.15 });
  const lanes = [['tcp', 5.2, 'TCP'], ['udp', 14.2, 'UDP']];
  lanes.forEach(([k, y, l]) => { box(S, k + 's', 1, y - 1.6, 5, 3.2, ['보냄', 'Send']); box(S, k + 'r', 26, y - 1.6, 5, 3.2, ['받음', 'Recv']); text(S, k + 'l', 1, y - 3.3, l, { cls: 'cz-t' }); S.el(k + 'w', { x: 6, y: y - .06, w: 20, h: .12, css: 'background:var(--line)' }); });
  const send = (k, n, y, st, lost, retx) => {
    dot(S, k, 7.2, y, String(n), { r: .85, s: hid(retx ? C.warn : C.cur) });
    S.set(k, st, { opacity: '1' });
    if (lost) S.move(k, st + 1, 15 - .85, y - .85, Object.assign({ opacity: '0' }, C.badf));
    else S.move(k, st + 1, 24.5 - .85, y - .85).set(k, st + 2, { opacity: '0' });
  };
  send('t1', 1, 5.2, 1); send('t2', 2, 5.2, 2, 1); send('t3', 3, 5.2, 3); send('t4', 2, 5.2, 4, 0, 1);
  send('u1', 1, 14.2, 1); send('u2', 2, 14.2, 2, 1); send('u3', 3, 14.2, 3);
  S.label('tg', { cls: 'cz-t cz-mono os-lg', x: 20, y: 7.4, w: 11 }, [[0, ''], [2, ['받음: 1', 'got: 1']], [4, ['받음: 1 · (3 대기)', 'got: 1 · (3 held)']], [5, ['받음: 1 2 3 ✓', 'got: 1 2 3 ✓']]]);
  S.label('ug', { cls: 'cz-t cz-mono os-lg', x: 20, y: 16.4, w: 11 }, [[0, ''], [2, ['받음: 1', 'got: 1']], [4, ['받음: 1 3', 'got: 1 3']]]);
  S.cap(1, '두 프로토콜로 1, 2, 3을 보내요', 'Send 1, 2, 3 over each protocol').cap(3, '2번이 중간에 사라졌어요', 'Packet 2 is lost on the way')
    .cap(4, 'TCP는 다시 보내고 순서를 맞춰 줘요 (신뢰성)', 'TCP resends and restores order (reliable)').cap(5, 'UDP는 빠르지만 잃은 건 그대로 (영상·게임·DNS)', 'UDP is fast but loss stays lost (video, games, DNS)')
    .cap(6, 'HTTP/3(QUIC)는 UDP 위에 신뢰성을 직접 구현해요', 'HTTP/3 (QUIC) builds reliability on top of UDP');
  return S;
}
function sRetx() {
  return seq('nt-retx', [['보내는 쪽', 'Sender'], ['받는 쪽', 'Receiver']], [
    { f: 0, t: 1, l: 'seq 1', cap: ['1번을 보내면', 'Send segment 1'] },
    { f: 1, t: 0, l: 'ACK 2', cap: ['받았으니 2번을 달라고 답해요', 'The receiver asks for 2 next'] },
    { f: 0, t: 1, l: ['seq 2  ✗ 손실', 'seq 2  ✗ lost'], c: 'danger', cap: ['2번이 사라지면', 'If segment 2 is lost'] },
    { f: 0, t: 0, l: ['⏱ 타임아웃', '⏱ timeout'], cap: ['ACK가 안 와서 시간이 지나면', 'no ACK arrives before the timer'] },
    { f: 0, t: 1, l: ['seq 2 (재전송)', 'seq 2 (resend)'], c: 'warn', cap: ['다시 보내요', 'so it is sent again'] },
    { f: 1, t: 0, l: 'ACK 3', cap: ['이제 3번 차례 · 같은 ACK 3번이면 빠른 재전송', 'Now 3 · three duplicate ACKs trigger a fast resend'] }
  ], { aw: 8, per: 1.1 });
}
function sWin() {
  const S = scene({ id: 'nt-window', steps: 6, per: 1.15 });
  const W = 2.2, G = .3, x0 = (32 - 12 * 2.5 + .3) / 2, y = 8.6;
  for (let i = 0; i < 12; i++) cell(S, 'b' + i, x0 + i * (W + G), y, String(i + 1), { w: W, h: W });
  S.el('win', { x: x0 - .3, y: y - .35, w: 4 * (W + G) - G + .6, h: W + .7, css: 'border:.2em solid var(--accent);border-radius:.6em;z-index:3' });
  text(S, 'wl', x0, y - 2, ['윈도우 = 4', 'window = 4'], { cls: 'cz-t' });
  const st = (i, s, c) => S.set('b' + i, s, c);
  [0, 1, 2, 3].forEach(i => st(i, 1, C.cmp));
  [0, 1].forEach(i => st(i, 2, C.ok)); S.move('win', 2, x0 - .3 + 2 * (W + G), y - .35);
  [4, 5].forEach(i => st(i, 3, C.cmp));
  [2, 3, 4, 5].forEach(i => st(i, 4, C.ok)); S.move('win', 4, x0 - .3 + 6 * (W + G), y - .35);
  [6, 7, 8, 9].forEach(i => st(i, 5, C.cmp));
  const lg = [['', C.ok, ['확인됨', 'acked']], ['', C.cmp, ['보냄, 확인 대기', 'sent, unacked']], ['', C.idle, ['아직', 'not yet']]];
  lg.forEach(([, c, l], i) => { cell(S, 'k' + i, 4 + i * 8.6, 15, '', { w: 1.6, h: 1.6, s: c }); text(S, 'kl' + i, 6 + i * 8.6, 15.2, l, { cls: 'cz-t' }); });
  S.cap(1, 'ACK를 기다리지 않고 윈도우만큼 한꺼번에 보내요', 'Send a whole window without waiting for each ACK').cap(2, '앞쪽이 확인되면 윈도우가 밀려요', 'As the front is acked, the window slides')
    .cap(3, '새로 들어온 만큼 더 보내요', 'and new segments can go').cap(5, '받는 쪽 여유(rwnd)만큼만 보내는 것이 흐름 제어', 'Sending only what the receiver can take is flow control');
  return S;
}
function sCong() {
  const cw = [1, 2, 4, 8, 9, 10, 11, 12, 6, 7, 8, 9];
  const S = scene({ id: 'nt-cong', steps: cw.length + 1, per: .6 });
  const base = 17.5, u = .95, x0 = 5, bw = 1.6, g = .45;
  S.el('ax', { x: x0 - .4, y: base, w: cw.length * (bw + g) + .4, h: .12, css: 'background:var(--ink-3)' });
  S.el('ay', { x: x0 - .4, y: base - 12.5, w: .12, h: 12.5, css: 'background:var(--ink-3)' });
  text(S, 'yl', .8, 4.2, 'cwnd', { cls: 'cz-t cz-mono' }); text(S, 'xl', 24, base + .5, ['시간 (RTT) →', 'time (RTT) →'], { cls: 'cz-t' });
  S.el('th', { x: x0 - .4, y: base - 8 * u, w: cw.length * (bw + g) + .4, h: .1, css: 'border-top:.12em dashed var(--warn)' });
  text(S, 'tl', x0 + .2, base - 8 * u - 1.6, ['임계값', 'threshold'], { cls: 'cz-t' });
  cw.forEach((v, i) => {
    const h = v * u, st = i < 4 ? C.soft : i === 8 ? C.bad : C.cmp;
    S.el('b' + i, { cls: 'cz-c', x: x0 + i * (bw + g), y: base - h, w: bw, h, css: 'transform-origin:50% 100%;border-radius:.3em .3em 0 0', s: Object.assign({ transform: 'scaleY(0)' }, st) });
    S.set('b' + i, i + 1, { transform: 'none' });
  });
  text(S, 'lost', x0 + 7 * (bw + g) - .6, base - 12 * u - 1.7, ['손실!', 'loss!'], { cls: 'cz-t', s: hid() }); S.set('lost', 8, { opacity: '1' });
  S.cap(1, '처음엔 1개부터, ACK마다 두 배로 (슬로 스타트)', 'Start at 1 and double every RTT (slow start)').cap(5, '임계값을 넘으면 1씩 늘려요 (혼잡 회피)', 'Past the threshold, grow by 1 (congestion avoidance)')
    .cap(9, '손실이 나면 네트워크가 막힌 것 · 절반으로 줄여요', 'A loss signals congestion: cut in half').cap(10, '다시 천천히 늘려요 (AIMD)', 'Then grow slowly again (AIMD)').cap(13, '모두가 이렇게 해서 인터넷이 붕괴하지 않아요 (BBR 등도 있음)', 'Everyone backing off keeps the internet from collapsing');
  return S;
}
function sPort() {
  const S = scene({ id: 'nt-port', steps: 5, per: 1.2 });
  box(S, 'srv', 12.5, 1.6, 18.5, 18, '', { css: 'background:transparent' });
  text(S, 'sip', 13.2, 2, ['서버 10.0.0.5', 'Server 10.0.0.5'], { cls: 'cz-t cz-mono' });
  const P = [[':22', 'SSH'], [':80', 'HTTP'], [':443', 'HTTPS'], [':5432', 'PostgreSQL']];
  P.forEach(([p, n], i) => { const y = 4 + i * 3.9; cell(S, 'p' + i, 13.5, y, p, { w: 5, h: 2.8 }); box(S, 'a' + i, 22, y, 8, 2.8, n, { cls: 'cz-box cz-bx cz-sm' }); arrow(S, 'pa' + i, 18.7, y + 1.4, 21.8, y + 1.4); });
  const pk = (k, i, l, st, step) => { pill(S, k, .8, 8.6, l, { w: 9.4, h: 1.8, cls: 'cz-pill cz-mono', s: hid(C.cur) }); S.set(k, step, { opacity: '1' }).move(k, step + 1, 3.8, 4 + i * 3.9 + .5).set(k, step + 1, { opacity: '0' }).set('p' + i, step + 1, C.soft).set('a' + i, step + 1, C.soft).set('p' + i, step + 2, C.idle).set('a' + i, step + 2, C.idle); };
  pk('k1', 2, '10.0.0.5:443', 0, 0); pk('k2', 3, '10.0.0.5:5432', 0, 2);
  S.cap(0, 'IP로 컴퓨터를 찾고, 포트로 그 안의 프로그램을 찾아요', 'The IP finds the computer, the port finds the program').cap(1, ':443으로 온 건 웹 서버에게', 'Traffic to :443 goes to the web server')
    .cap(3, ':5432는 데이터베이스에게', ':5432 goes to the database').cap(5, '연결 하나 = (출발 IP·포트, 도착 IP·포트, 프로토콜)', 'A connection = (src IP:port, dst IP:port, protocol)');
  return S;
}

/* ---------- application ---------- */
function sDNS() {
  return seq('nt-dns', [['브라우저', 'Browser'], ['리졸버', 'Resolver'], ['루트', 'Root'], ['.com', '.com TLD'], ['권한 서버', 'Authority']], [
    { f: 0, t: 1, l: 'example.com?', cap: ['example.com의 IP를 물어보면', 'Ask for example.com’s IP'] },
    { f: 1, t: 2, l: '?', cap: ['리졸버가 루트 서버부터 물어요', 'The resolver starts at a root server'] },
    { f: 2, t: 1, l: ['.com 서버로', 'ask .com'] },
    { f: 1, t: 3, l: '?', cap: ['.com 서버에게', 'then the .com server'] },
    { f: 3, t: 1, l: ['ns1.example로', 'ask ns1.example'] },
    { f: 1, t: 4, l: '?', cap: ['도메인의 권한 서버에게', 'then the domain’s authority'] },
    { f: 4, t: 1, l: '93.184.216.34' },
    { f: 1, t: 0, l: ['93.184.216.34 (TTL 동안 캐시)', '93.184.216.34 (cached for TTL)'], c: 'ok', cap: ['답을 캐시해 다음엔 바로 답해요', 'The answer is cached for next time'] }
  ], { aw: 5.2, mx: 1, per: .95, gap: 1.95 });
}
function sHTTP() {
  const S = scene({ id: 'nt-http', steps: 7, per: 1 });
  box(S, 'rq', 1, 2, 14.4, 10.6, '', { css: 'background:transparent' }); box(S, 'rs', 16.6, 9, 14.4, 10.6, '', { css: 'background:transparent' });
  text(S, 'qh', 1.6, .6, ['요청', 'Request'], { cls: 'cz-t' }); text(S, 'sh', 17.2, 7.6, ['응답', 'Response'], { cls: 'cz-t' });
  const ln = (k, x, y, t, step, cls) => { text(S, k, x, y, t, { cls: 'cz-t cz-mono ' + (cls || ''), s: hid() }); S.set(k, step, { opacity: '1' }); };
  ln('q1', 1.8, 3, 'GET /users/7 HTTP/1.1', 1, 'nt-b'); ln('q2', 1.8, 5, 'Host: api.example.com', 2); ln('q3', 1.8, 6.6, 'Accept: application/json', 2); ln('q4', 1.8, 8.2, 'Authorization: Bearer …', 2);
  ln('q5', 1.8, 10.4, ['(GET은 본문 없음)', '(GET has no body)'], 3);
  ln('s1', 17.4, 10, 'HTTP/1.1 200 OK', 4, 'nt-b'); ln('s2', 17.4, 12, 'Content-Type: application/json', 5); ln('s3', 17.4, 13.6, 'Cache-Control: max-age=60', 5);
  ln('s4', 17.4, 16, '{"id":7,"name":"Kim"}', 6, 'nt-b');
  arrow(S, 'ar', 13, 13.6, 16.2, 13.6, { s: hid() }); S.set('ar', 4, { opacity: '1' });
  S.cap(1, '요청 줄: 메서드 + 경로 + 버전', 'Request line: method + path + version').cap(2, '헤더: 부가 정보 (호스트, 형식, 인증)', 'Headers: host, format, auth').cap(4, '상태 줄: 200은 성공', 'Status line: 200 means success')
    .cap(5, '응답 헤더: 형식, 캐시 규칙', 'Response headers: type, caching').cap(6, '본문: 실제 데이터', 'Body: the actual data').cap(7, 'HTTP는 상태가 없어요 · 로그인 유지는 쿠키·토큰으로', 'HTTP is stateless · logins use cookies or tokens');
  return S;
}
function sTLS() {
  return seq('nt-tls', [['클라이언트', 'Client'], ['서버', 'Server']], [
    { f: 0, t: 1, l: ['ClientHello · 지원 암호 + 키 조각', 'ClientHello · ciphers + key share'], cap: ['① 쓸 수 있는 암호 방식과 키 재료를 보내요', '① Offer ciphers and key material'] },
    { f: 1, t: 0, l: ['ServerHello · 키 조각 + 인증서', 'ServerHello · key share + certificate'], cap: ['② 서버가 고르고 인증서를 보내요', '② The server chooses and sends its certificate'] },
    { f: 0, t: 0, l: ['인증서 검증 (CA 서명)', 'verify cert (CA signature)'], cap: ['③ 믿을 만한 기관이 서명했는지 확인', '③ Check it is signed by a trusted CA'] },
    { f: 0, t: 0, l: ['같은 세션 키 계산 (ECDHE)', 'derive session key (ECDHE)'], cap: ['④ 양쪽이 키를 보내지 않고도 같은 키를 만들어요', '④ Both derive the same key without sending it'] },
    { f: 0, t: 1, l: 'Finished', cap: ['⑤ TLS 1.3은 1 RTT로 끝나요', '⑤ TLS 1.3 needs one round trip'] },
    { f: 0, t: 1, l: ['암호화된 HTTP ✓', 'encrypted HTTP ✓'], c: 'ok', cap: ['이제 중간에서 엿보거나 바꿀 수 없어요', 'Now nobody in between can read or alter it'] }
  ], { aw: 8, per: 1.2 });
}
function sH2() {
  const S = scene({ id: 'nt-http2', steps: 5, per: 1.3 });
  const u = 1.9, x0 = 7.4;
  text(S, 'l1', .8, 4.6, 'HTTP/1.1', { cls: 'cz-t cz-mono' }); text(S, 'l2', .8, 12.6, 'HTTP/2', { cls: 'cz-t cz-mono' });
  const A = C.soft, B = C.cmp, D = C.ok;
  gantt(S, 'a', [['a.css', 0, 4, A, 1], ['b.js', 4, 8, B, 2], ['c.png', 8, 12, D, 3]], x0, 3.8, u, 2.6, { ticks: [0, 4, 8, 12] });
  const fr = []; for (let i = 0; i < 12; i++) { const s = ['a', 'b', 'c'][i % 3]; fr.push(['', i * .5, i * .5 + .5, { a: A, b: B, c: D }[s], 4]); }
  gantt(S, 'b', fr, x0, 11.8, u, 2.6, { ticks: [0, 6] });
  text(S, 'n2', x0, 15.5, ['한 연결에서 세 요청의 조각(프레임)을 섞어 보내요', 'Frames of all three share one connection'], { cls: 'cz-t', s: hid() }); S.set('n2', 4, { opacity: '1' });
  S.cap(1, 'HTTP/1.1: 한 연결에서 응답을 차례로 기다려요', 'HTTP/1.1: responses come one after another').cap(3, '앞이 느리면 뒤가 다 밀려요 (HOL 블로킹)', 'A slow one delays the rest (head-of-line blocking)')
    .cap(4, 'HTTP/2: 스트림을 섞어 동시에 (멀티플렉싱)', 'HTTP/2: streams are interleaved (multiplexing)').cap(5, 'HTTP/3는 QUIC(UDP)로 패킷 손실의 막힘까지 없앴어요', 'HTTP/3 over QUIC also removes loss-induced stalls');
  return S;
}
function sWS() {
  return seq('nt-ws', [['브라우저', 'Browser'], ['서버', 'Server']], [
    { f: 0, t: 1, l: 'GET /chat  Upgrade: websocket', cap: ['HTTP로 시작해서 업그레이드를 요청', 'Start as HTTP and ask to upgrade'] },
    { f: 1, t: 0, l: '101 Switching Protocols', cap: ['같은 연결을 웹소켓으로 전환', 'The same connection becomes a WebSocket'] },
    { f: 0, t: 1, l: ['"안녕하세요"', '"hello"'], c: 'accent', cap: ['이제 양방향 메시지', 'Messages now flow both ways'] },
    { f: 1, t: 0, l: ['새 메시지 도착', 'new message'], c: 'ok', cap: ['서버가 먼저 보낼 수 있어요 (푸시)', 'The server can push first'] },
    { f: 1, t: 0, l: ['상대가 입력 중…', 'typing…'], c: 'ok', cap: ['채팅·주식 시세·게임에 써요 · 단방향이면 SSE도 충분', 'Chat, tickers, games · SSE is enough for one-way'] }
  ], { aw: 8, per: 1.2, gap: 3 });
}
function sURL() {
  const S = scene({ id: 'nt-url', steps: 7, per: 1.05 });
  const R = [['DNS 조회', 'DNS lookup', 0, 2, C.cmp], ['TCP 연결', 'TCP connect', 2, 4, C.ok], ['TLS 협상', 'TLS', 4, 7, C.bad], ['요청 → 첫 바이트', 'Request → TTFB', 7, 10.5, C.soft], ['다운로드', 'Download', 10.5, 12.5, C.cur], ['파싱·렌더링', 'Parse & render', 12.5, 15, C.idle]];
  const u = 1.3, x0 = 11.2;
  text(S, 'url', 1, .9, 'https://example.com', { cls: 'cz-t cz-mono os-lg' });
  R.forEach(([k, e, a, b, st], i) => { const y = 3.4 + i * 2.75; text(S, 'l' + i, 1, y + .55, [k, e], { cls: 'cz-t', s: hid() }); S.el('g' + i, { cls: 'cz-c', x: x0 + a * u, y, w: (b - a) * u, h: 2, css: 'transform-origin:0 50%;border-radius:.3em', s: Object.assign({ transform: 'scaleX(0)' }, st) }); S.set('g' + i, i + 1, { transform: 'none' }).set('l' + i, i + 1, { opacity: '1' }); });
  S.cap(0, '주소창에 URL을 치면', 'You type a URL').cap(1, '① 도메인을 IP로 바꾸고', '① Turn the name into an IP').cap(2, '② 서버와 TCP 연결 (3-way)', '② Open a TCP connection (3-way)')
    .cap(3, '③ TLS로 암호화 협상', '③ Negotiate encryption (TLS)').cap(4, '④ HTTP 요청을 보내고 첫 응답을 기다려요', '④ Send the request, wait for the first byte').cap(5, '⑤ HTML을 받고', '⑤ Receive the HTML')
    .cap(6, '⑥ 해석해서 화면을 그려요', '⑥ Parse it and paint the page').cap(7, '개발자 도구 Network 탭의 워터폴이 바로 이것', 'This is the waterfall in DevTools’ Network tab');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'ntx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono ntx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono ntx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c ntx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono ntx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c ntx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'ntx-s ntx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono ntx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono ntx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono ntx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono ntx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono ntx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'ntx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'ntx-xs', 5));


const CSSX = `
.ntx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.ntx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.ntx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.ntx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.ntx-r .in{color:var(--danger);font-weight:800}
.ntx-g .in{color:var(--ok);font-weight:800}
.ntx-a .in{color:var(--accent);font-weight:800}
.ntx-w .in{color:var(--warn);font-weight:800}
.ntx-c .in{font-size:.6em;font-weight:700}
.ntx-c2 .in{font-size:.5em;font-weight:700}
.ntx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.ntx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'ntx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));
const gs = (S, k, a, b, st, color, h, r, o) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L * r, uy = dy / L * r; seg(S, k, [a[0] + ux, a[1] + uy], [b[0] - ux, b[1] - uy], st, color, h, o || {}); };
const mid = (a, b, t = .5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/* ================= layers ================= */
function sSwitching() {
  const S = scene({ id: 'nt-switching', steps: 5, per: 1.6 });
  const N = { A: [2, 5.6], S1: [8, 5.6], S2: [14, 2.4], S3: [14, 8.8], S4: [20, 5.6], B: [26, 5.6] }, E = [['A', 'S1'], ['S1', 'S2'], ['S1', 'S3'], ['S2', 'S4'], ['S3', 'S4'], ['S4', 'B'], ['S2', 'S3']];
  E.forEach(([a, b], i) => gs(S, 'e' + i, N[a], N[b], 0, 'ink-3', .1, 1));
  [['A', 'S1'], ['S1', 'S2'], ['S2', 'S4'], ['S4', 'B']].forEach(([a, b], i) => gs(S, 'c' + i, N[a], N[b], 2, 'accent', .3, 1, { off: 3 }));
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, k.length === 1 ? 'ok' : 'accent', 0, { r: 1, pct: 25 }));
  T(S, 'cl', 15.6, 1.2, ['통화 내내 이 길을 독점', 'reserved for the whole call'], 'ntx-xs ntx-a', 2, { off: 3 });
  [['1', ['S1', 'S2'], .5, 'ok'], ['2', ['S1', 'S3'], .5, 'ok'], ['3', ['S2', 'S4'], .55, 'ok'], ['x', ['S1', 'S2'], .25, 'line'], ['y', ['S3', 'S4'], .5, 'line'], ['z', ['S2', 'S4'], .3, 'line']].forEach(([l, [a, b], t, c], i) => { const [x, y] = mid(N[a], N[b], t); box2(S, 'p' + i, x - .6, y - .55, 1.2, 1.1, l, c, 3, { pct: 45 }); });
  T(S, 'pl', 15.6, 10.2, ['1·2·3 = 내 패킷 · x·y·z = 남의 패킷 (같은 회선을 나눠 써요)', '1·2·3 = mine · x·y·z = others (links are shared)'], 'ntx-xs', 3);
  box2(S, 'k1', 1, 12.4, 14.6, 1.5, ['회선 교환 (전화): 대역 보장 · 지연 일정 · 놀면 낭비', 'circuit (phone): guaranteed rate · steady delay · idle waste'], 'accent', 4, { pct: 25 });
  box2(S, 'k2', 16.4, 12.4, 14.6, 1.5, ['패킷 교환 (인터넷): 효율적 · 지연 변동 · 순서 바뀜', 'packet (internet): efficient · variable delay · reordering'], 'ok', 4, { pct: 30 });
  stepT(S, 'k', 1, 11, [['A에서 B까지 가는 길은 여러 개예요', 'there are several routes from A to B'], ['회선 교환: 먼저 길을 예약하고, 끝날 때까지 그 대역을 혼자 써요', 'circuit switching: reserve a path first and keep its capacity until hang-up'], ['패킷 교환: 잘게 나눈 패킷이 각자 길을 찾아가고, 회선은 모두가 나눠 써요', 'packet switching: chopped-up packets route independently over shared links']], 'ntx-xs ntx-a');
  fin(S, 'z', 14.4, [['인터넷은 패킷 교환: 터지는 트래픽을 통계적으로 섞어 회선을 알뜰하게 써요', 'the internet is packet switched: statistical multiplexing absorbs bursty traffic efficiently', 'ntx-xs ntx-a'], ['순서가 바뀌거나 잃어버린 패킷은 TCP가 재정렬·재전송으로 메워요', 'TCP reorders and retransmits to cover for reordering and loss']]);
  S.cap(1, '여러 갈래의 길', 'Many routes').cap(2, '회선 교환: 길을 예약', 'Circuit switching: reserve a path').cap(3, '패킷 교환: 나눠 보내기', 'Packet switching: split and share').cap(4, '둘의 비교', 'Comparison').cap(5, '회선 교환 vs 패킷 교환', 'Circuit vs packet switching');
  return S;
}

/* ================= internet ================= */
function sIcmp() {
  const S = scene({ id: 'nt-icmp', steps: 5, per: 1.6 });
  const X = [2.5, 9, 16, 23, 29];
  box2(S, 'me', .8, 3, 3.4, 1.6, ['나', 'me'], 'accent', 0, { pct: 30 }); box2(S, 'sv', 27.2, 3, 3.6, 1.6, ['서버', 'server'], 'ok', 0, { pct: 30 });
  ['R1', 'R2', 'R3'].forEach((r, i) => stt(S, 'r' + i, X[i + 1], 3.8, r, 'ink-3', 0, { r: .9, pct: 20 }));
  [[4.2, 8.1], [9.9, 15.1], [16.9, 22.1], [23.9, 27.1]].forEach(([a, b], i) => hl(S, 'l' + i, a, b, 3.8, 'ink-3', 0, { w: .08 }));
  ar(S, 'p1', [4.3, 1.2], [27, 1.2], 'accent', 1, { h: .08, off: 2 }); ar(S, 'p2', [27, 2.1], [4.3, 2.1], 'ok', 1, { h: .08, off: 2 });
  T(S, 'pt', 8, .2, ['ping: Echo Request → Echo Reply · 왕복 23 ms', 'ping: Echo Request → Echo Reply · RTT 23 ms'], 'cz-mono ntx-xs ntx-a', 1, { off: 2 });
  const R = [[1, 9, 'R1 · 1.2 ms', 2], [2, 16, 'R2 · 8.4 ms', 3], [3, 23, 'R3 · 15.1 ms', 3], [4, 29, ['서버 도착 ✓ · 23.0 ms', 'reached ✓ · 23.0 ms'], 4]];
  R.forEach(([ttl, x, t, st], i) => { const y = 6 + i * 1.4; T(S, 'tl' + i, .8, y - .3, 'TTL=' + ttl, 'cz-mono ntx-tiny', st); hl(S, 'ta' + i, 3.6, x - (i < 3 ? 1 : 1.9), y, i < 3 ? 'warn' : 'ok', st, { w: .1 }); if (i < 3) { xm(S, 'tx' + i, x - .6, y + .1, st); T(S, 'tt' + i, x + .3, y - .3, t, 'cz-mono ntx-tiny ntx-r', st); } else T(S, 'tt' + i, 18, y + .3, t, 'cz-mono ntx-tiny ntx-g', st); });
  stepT(S, 'k', 1, 11.8, [['ping: ICMP 에코 요청을 보내고 응답까지의 왕복 시간(RTT)을 재요', 'ping sends an ICMP echo request and times the round trip (RTT)'], ['traceroute: TTL=1로 보내면 첫 라우터가 TTL을 0으로 만들고 “시간 초과”를 돌려줘요', 'traceroute: with TTL=1 the first router drops it to 0 and replies “time exceeded”'], ['TTL을 하나씩 늘리면 다음 라우터들이 차례로 정체를 드러내요', 'raise TTL step by step and each next router reveals itself'], ['목적지에 닿으면 응답이 와요 · ICMP를 막는 라우터는 * * *로 보여요', 'the destination finally answers · routers that block ICMP show up as * * *']], 'ntx-xs ntx-a');
  fin(S, 'z', 13.4, [['ICMP: IP의 제어·오류 메시지 프로토콜 (에코, 시간 초과, 목적지 도달 불가, 너무 큼)', 'ICMP is IP’s control and error protocol: echo, time exceeded, unreachable, too big', 'ntx-xs ntx-a'], ['TTL은 패킷이 영원히 떠도는 걸 막는 수명 · 라우터를 지날 때마다 1씩 줄어요', 'TTL is a lifetime that stops packets looping forever; each router decrements it'], ['ICMP를 통째로 막으면 경로 MTU 탐색이 깨져 이상한 장애가 나요', 'blocking all ICMP breaks path MTU discovery and causes strange outages']]);
  S.cap(1, 'ping: 왕복 시간', 'ping: round-trip time').cap(2, 'TTL=1: 첫 라우터', 'TTL=1: the first router').cap(3, 'TTL을 늘려 가며', 'Raise the TTL').cap(4, '목적지 도착', 'Reach the destination').cap(5, 'ICMP, ping, traceroute', 'ICMP, ping and traceroute');
  return S;
}
function sIpv6() {
  const S = scene({ id: 'nt-ipv6', steps: 5, per: 1.6 });
  T(S, 'v4', 1, .3, ['IPv4: 32비트 ≈ 43억 개 (2011년 IANA 고갈)', 'IPv4: 32 bits ≈ 4.3 billion (IANA ran out in 2011)'], 'ntx-xs ntx-r', 1); rect(S, 'b4', 1, 1.3, 7.5, 1, 'danger', 35, 1, { r: .2 });
  T(S, 'v6', 1, 2.6, ['IPv6: 128비트 ≈ 3.4 × 10³⁸ 개', 'IPv6: 128 bits ≈ 3.4 × 10³⁸'], 'ntx-xs ntx-g', 1); rect(S, 'b6', 1, 3.6, 30, 1, 'ok', 35, 1, { r: .2 });
  code(S, 'a1', 1, 5.2, 30, ['2001:0db8:0000:0000:0000:ff00:0042:8329', '2001:db8:0:0:0:ff00:42:8329        ← 앞쪽 0 생략'.replace('← 앞쪽 0 생략', ''), '2001:db8::ff00:42:8329'], [], { st: 2 });
  T(S, 'ar1', 17, 6.8, ['← 각 묶음 앞의 0 생략', '← drop leading zeros'], 'ntx-xs ntx-a', 2); T(S, 'ar2', 17, 8.1, ['← 연속된 0 묶음은 :: (한 번만)', '← one run of zero groups → ::'], 'ntx-xs ntx-a', 2);
  box2(S, 'pf', 1, 9.8, 15, 1.4, ['네트워크 접두사 /64 (라우팅)', 'network prefix /64 (routing)'], 'accent', 3, { pct: 30 }); box2(S, 'if', 16, 9.8, 15, 1.4, ['인터페이스 ID 64비트 (기기)', 'interface ID, 64 bits (device)'], 'warn', 3, { pct: 30 });
  T(S, 'sl', 1, 11.5, ['SLAAC: 라우터가 접두사를 알려 주면 기기가 스스로 주소를 만들어요', 'SLAAC: the router advertises the prefix; devices build their own addresses'], 'ntx-xs', 3);
  T(S, 'n1', 1, 12.6, ['NAT 없이 모든 기기가 전역 주소 → 그래도 방화벽은 필요해요', 'no NAT needed: every device gets a global address → firewalls still matter'], 'ntx-xs ntx-w', 4);
  T(S, 'n2', 1, 13.6, ['헤더 단순화(체크섬 없음, 라우터는 단편화 안 함) · 듀얼 스택으로 IPv4와 공존', 'a simpler header (no checksum, no router fragmentation) · dual stack alongside IPv4'], 'ntx-xs', 4);
  fin(S, 'z', 15, [['IPv6: 주소 고갈을 끝낸 128비트 주소 체계 · 16비트씩 8묶음을 16진수로 적어요', 'IPv6 ends address exhaustion with 128-bit addresses, written as 8 hex groups of 16 bits', 'ntx-xs ntx-a'], ['::1은 루프백, fe80::/10은 링크 로컬, 2000::/3이 전역 유니캐스트예요', '::1 is loopback, fe80::/10 link-local and 2000::/3 global unicast']]);
  S.cap(1, '주소가 모자라요', 'Running out of addresses').cap(2, '주소 줄여 쓰기', 'Shortening addresses').cap(3, '접두사와 인터페이스 ID', 'Prefix and interface ID').cap(4, 'NAT 없는 세상', 'A world without NAT').cap(5, 'IPv6', 'IPv6');
  return S;
}
function sLsdv() {
  const S = scene({ id: 'nt-lsdv', steps: 5, per: 1.6 });
  const N = { A: [2.5, 5], B: [8, 1.8], C: [8, 8.2], D: [13.5, 5] }, E = [['A', 'B', 1], ['B', 'C', 2], ['A', 'C', 5], ['C', 'D', 1], ['B', 'D', 4]];
  E.forEach(([a, b, w], i) => { gs(S, 'e' + i, N[a], N[b], 0, 'ink-3', .1, 1); const [x, y] = mid(N[a], N[b]); T(S, 'w' + i, x - .1, y - .75, String(w), 'cz-mono ntx-xs ntx-w', 0); });
  [['A', 'B'], ['B', 'C'], ['C', 'D']].forEach(([a, b], i) => gs(S, 'sp' + i, N[a], N[b], 3, 'ok', .26, 1));
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, 'accent', 0, { r: 1, pct: 25 }));
  T(S, 'dt', 16, .2, ['거리 벡터 (RIP): A의 라우팅 표', 'distance vector (RIP): A’s table'], 'ntx-xs ntx-a', 2);
  const TB = [[['', ''], 'B', 'C', 'D'], [['처음 (이웃만)', 'start (neighbors)'], '1', '5', '∞'], [['B의 벡터 받음', 'after B’s vector'], '1', '3', '5'], [['C의 벡터 받음', 'after C’s vector'], '1', '3', '4']];
  TB.forEach((r, i) => r.forEach((v, j) => box2(S, `t${i}_${j}`, 16 + (j ? 6.2 + (j - 1) * 2.9 : 0), 1.1 + i * 1.3, j ? 2.8 : 6.1, 1.18, v, i === 0 ? 'accent' : 'line', 2, { pct: i ? 40 : 30 })));
  tsets(S, 't2_2', [[2, 'ok', 45]]); tsets(S, 't2_3', [[2, 'ok', 45]]); tsets(S, 't3_3', [[2, 'ok', 45]]);
  T(S, 'lt', 16, 6.6, ['링크 상태 (OSPF): 모두가 전체 지도를 가져요', 'link state (OSPF): everyone holds the whole map'], 'ntx-xs ntx-g', 3);
  T(S, 'l2', 16, 7.6, ['A의 다익스트라: B 1 · C 3 · D 4 (같은 답)', 'A’s Dijkstra: B 1 · C 3 · D 4 (same answer)'], 'cz-mono ntx-xs', 3);
  ['A', 'B', 'C', 'D'].forEach((k, i) => box2(S, 'lsa' + i, N[k][0] - 1.3, N[k][1] + 1.15, 2.6, .9, 'LSA', 'warn', 3, { pct: 40 }));
  box2(S, 'k1', 1, 10.4, 14.8, 1.6, ['거리 벡터: 이웃에게 표만 · 단순 · 수렴 느림(무한 카운트)', 'DV: tables to neighbors · simple · slow (count to infinity)'], 'accent', 4, { pct: 25 });
  box2(S, 'k2', 16.2, 10.4, 14.8, 1.6, ['링크 상태: 전체에 링크 정보 · 빠른 수렴 · 메모리·CPU', 'LS: links flooded to all · fast convergence · more memory/CPU'], 'ok', 4, { pct: 30 });
  stepT(S, 'k', 1, 12.4, [['라우터 4개와 링크 비용', 'four routers and link costs'], ['거리 벡터: 이웃이 알려 준 거리 + 링크 비용으로 표를 고쳐 가요 (벨만-포드)', 'distance vector: update with neighbor distance + link cost (Bellman–Ford)'], ['링크 상태: 각자 자기 링크 정보(LSA)를 모두에게 뿌리고, 지도를 만들어 다익스트라', 'link state: flood your own links (LSAs) to all, build the map, run Dijkstra']], 'ntx-xs ntx-a');
  fin(S, 'z', 13.6, [['라우팅 알고리즘: 표를 주고받는 거리 벡터(RIP) vs 지도를 공유하는 링크 상태(OSPF, IS-IS)', 'routing algorithms: distance vector trades tables (RIP); link state shares the map (OSPF, IS-IS)', 'ntx-xs ntx-a'], ['조직 사이(인터넷 전체)는 경로 자체를 주고받는 경로 벡터, BGP가 맡아요', 'between organizations, BGP, a path-vector protocol, exchanges whole paths']]);
  S.cap(1, '라우터와 링크 비용', 'Routers and link costs').cap(2, '거리 벡터: 이웃의 표로', 'Distance vector: via neighbors’ tables').cap(3, '링크 상태: 전체 지도로', 'Link state: via the full map').cap(4, '비교', 'Comparison').cap(5, '거리 벡터 vs 링크 상태', 'Distance vector vs link state');
  return S;
}
function sVlan() {
  const S = scene({ id: 'nt-vlan', steps: 5, per: 1.6 });
  box2(S, 'sw', 3, 2.6, 16, 2, ['스위치 1', 'switch 1'], 'line', 0, { pct: 40 });
  for (let i = 0; i < 8; i++) { const x = 3.4 + i * 1.95, c = i < 4 ? 'accent' : 'warn'; box2(S, 'po' + i, x, 4.7, 1.6, .7, '', 'line', 0, { pct: 50 }); tsets(S, 'po' + i, [[2, c, 50]]); box2(S, 'h' + i, x - .2, 7.6, 2, 1.4, 'PC' + i, 'line', 0, { pct: 40 }); tsets(S, 'h' + i, [[2, c, 30]]); seg(S, 'hl' + i, [x + .8, 5.45], [x + .8, 7.55], 0, 'ink-3', .07); seg(S, 'bc' + i, [x + .8, 5.45], [x + .8, 7.55], 1, i ? 'danger' : 'accent', .16, { off: 2 }); if (i && i < 4) seg(S, 'bv' + i, [x + .8, 5.45], [x + .8, 7.55], 2, 'accent', .16, { off: 4 }); }
  T(S, 'b1', 1, .4, ['PC0의 브로드캐스트(ARP)가 8대 모두에게 퍼져요', 'PC0’s broadcast (ARP) reaches all eight'], 'ntx-xs ntx-r', 1, { off: 2 });
  T(S, 'b2', 1, .4, ['VLAN 10(파랑)·20(주황)은 다른 방송 영역', 'VLAN 10 (blue) and 20 (orange): separate domains'], 'ntx-xs ntx-a', 2); T(S, 'b3', 1, 1.4, ['→ PC1~3만 받아요', '→ only PC1–3 hear it'], 'ntx-xs ntx-a', 2);
  box2(S, 'sw2', 24, 2.6, 7, 2, ['스위치 2', 'switch 2'], 'line', 3, { pct: 40 });
  hl(S, 'tr', 19.1, 23.9, 3.6, 'ink-2', 3, { w: .22 }); T(S, 'trl', 19.4, 4.4, ['트렁크', 'trunk'], 'ntx-tiny', 3);
  box2(S, 'tg1', 19.6, 1.1, 4, .9, 'VID 10 | …', 'accent', 3, { pct: 40 }); box2(S, 'tg2', 24.2, .2, 4, .9, 'VID 20 | …', 'warn', 3, { pct: 40 });
  T(S, 'tgl', 19.4, 5.0, ['802.1Q 태그로 여러 VLAN을 한 선에', '802.1Q tags: many VLANs, one link'], 'ntx-tiny', 3);
  box2(S, 'rt', 24, 7.4, 7, 1.6, ['라우터 (L3)', 'router (L3)'], 'ok', 4, { pct: 35 }); seg(S, 'rtl', [27.5, 4.65], [27.5, 7.35], 4, 'ok', .12);
  T(S, 'rtt', 20.4, 9.4, ['VLAN 10 ↔ 20 통신은 라우터를 거쳐요', 'VLAN 10 ↔ 20 traffic goes through a router'], 'ntx-xs ntx-g', 4);
  stepT(S, 'k', 1, 10.8, [['한 스위치에 연결된 모두가 하나의 방송 영역이에요', 'everything on one switch shares a single broadcast domain'], ['포트마다 VLAN 번호를 정하면 스위치 하나를 여러 개처럼 나눠 써요', 'assigning VLAN IDs per port splits one switch into several'], ['트렁크 포트는 태그를 붙여 여러 VLAN을 다른 스위치로 넘겨요', 'trunk ports tag frames to carry several VLANs to another switch'], ['서로 다른 VLAN끼리는 라우터(또는 L3 스위치)가 이어 줘요', 'a router (or L3 switch) connects different VLANs']], 'ntx-xs ntx-a');
  fin(S, 'z', 12.4, [['VLAN: 물리 배선은 그대로 두고 논리적으로 네트워크를 나눠요 (방송 줄이기, 보안 분리)', 'VLANs split networks logically without rewiring: less broadcast traffic, security separation', 'ntx-xs ntx-a'], ['사무실의 직원망·게스트망·IP 전화망 분리, 데이터센터의 테넌트 분리에 써요', 'used to separate staff, guest and VoIP networks, and tenants in data centers'], ['클라우드 VPC와 서브넷, VXLAN이 같은 생각을 더 크게 확장했어요', 'cloud VPCs, subnets and VXLAN scale the same idea up']]);
  S.cap(1, '모두가 한 방송 영역', 'One big broadcast domain').cap(2, 'VLAN으로 나누기', 'Split with VLANs').cap(3, '트렁크와 태그', 'Trunks and tags').cap(4, 'VLAN 사이는 라우터로', 'Routers between VLANs').cap(5, 'VLAN', 'VLANs');
  return S;
}
function sMtu() {
  const S = scene({ id: 'nt-mtu', steps: 5, per: 1.6 });
  const K = .0065;
  rect(S, 'pk', 1, 1.3, 4000 * K, 1.4, 'accent', 25, 1, { r: .2, html: ['IP 패킷 4000 B', 'IP packet 4000 B'], cls: 'cz-c ntx-c2' }); rect(S, 'pkh', 1, 1.3, .7, 1.4, 'warn', 55, 1, { r: .2 });
  frame(S, 'mt', .9, 3.2, 1500 * K + .2, 1.6, 'danger', 1, { dash: 1, w: .1 }); T(S, 'mtl', 1 + 1500 * K + .6, 3.55, ['다음 링크 MTU = 1500 B (이더넷)', 'next link MTU = 1500 B (Ethernet)'], 'ntx-xs ntx-r', 1);
  const F = [[1500, 0, 1, 1], [1500, 185, 1, 11.2], [1040, 370, 0, 21.4]];
  F.forEach(([sz, off, mf, x], i) => { rect(S, 'f' + i, x, 5.6, sz * K, 1.4, 'ok', 25, 2, { r: .2, html: sz + ' B', cls: 'cz-c ntx-c2' }); rect(S, 'fh' + i, x, 5.6, .7, 1.4, 'warn', 55, 2, { r: .2 }); T(S, 'fl' + i, x, 7.2, `offset ${off} · MF=${mf}`, 'cz-mono ntx-tiny', 2); });
  T(S, 'fn', 1, 8.1, ['데이터를 1480 B씩 나누고 각 조각에 IP 헤더(20 B) · offset은 8바이트 단위', 'data split into 1480 B pieces, each with a 20 B IP header · offsets count 8-byte units'], 'ntx-xs', 2);
  xm(S, 'lost', 19.6, 6.4, 3); T(S, 'ln', 1, 9.3, ['재조립은 목적지에서만 · 조각 하나만 잃어도 패킷 전체를 다시 보내야 해요', 'reassembly happens only at the destination · lose one fragment and the whole packet is resent'], 'ntx-xs ntx-r', 3);
  code(S, 'pm', 1, 10.6, 30, [['보낸 쪽 → 라우터: DF=1, 4000 B', 'sender → router: DF=1, 4000 B'], ['라우터 → 보낸 쪽: ICMP “너무 큼, MTU 1500”', 'router → sender: ICMP “too big, MTU 1500”'], ['보낸 쪽: 1500 B로 줄여 다시 전송 (경로 MTU 탐색)', 'sender: resend at 1500 B (path MTU discovery)']], [], { st: 4 });
  fin(S, 'z', 15.4, [['MTU: 한 링크가 한 번에 실을 수 있는 최대 크기 · 넘으면 쪼개거나(IPv4) 거절해요(IPv6, DF)', 'MTU is the largest frame a link carries; bigger packets get fragmented (IPv4) or refused (IPv6, DF)', 'ntx-xs ntx-a'], ['TCP는 MSS(보통 1460 B)로 처음부터 맞춰 보내 단편화를 피해요 · VPN·터널은 MTU를 줄여요', 'TCP sizes segments to the MSS (typically 1460 B) to avoid fragmentation · VPNs and tunnels shrink the MTU']]);
  S.cap(1, '패킷이 너무 커요', 'The packet is too big').cap(2, '조각으로 나누기', 'Split into fragments').cap(3, '재조립과 손실', 'Reassembly and loss').cap(4, '경로 MTU 탐색', 'Path MTU discovery').cap(5, 'MTU와 단편화', 'MTU and fragmentation');
  return S;
}

/* ================= transport ================= */
function sDelay() {
  const S = scene({ id: 'nt-delay', steps: 5, per: 1.6 });
  [['처리', 'proc', 1.6, 'line'], ['큐잉', 'queue', 4, 'warn'], ['전송', 'trans', 3, 'accent'], ['전파', 'prop', 10, 'ok']].reduce((x, [k, e, w, c], i) => { rect(S, 'd' + i, x, 1.3, w - .08, 1.4, c, 35, 1, { r: .2, html: [k, e], cls: 'cz-c ntx-c2' }); return x + w; }, 1);
  T(S, 'dt', 1, .3, ['패킷 하나의 지연 = 처리 + 큐잉 + 전송 + 전파', 'one packet’s delay = processing + queuing + transmission + propagation'], 'ntx-xs ntx-a', 1);
  T(S, 'f1', 21, 1.2, 'd_trans = L / R', 'cz-mono ntx-xs ntx-a', 1); T(S, 'f2', 21, 2.2, ['d_prop = 거리 / 속도', 'd_prop = distance / speed'], 'cz-mono ntx-xs ntx-g', 1);
  T(S, 'e1', 1, 3.6, ['전송: 1500 B ÷ 100 Mbps = 0.12 ms (요금소에서 차를 내보내는 시간)', 'transmission: 1500 B ÷ 100 Mbps = 0.12 ms (pushing cars through the toll booth)'], 'cz-mono ntx-xs ntx-a', 2);
  T(S, 'e2', 1, 4.6, ['전파: 서울→뉴욕 11,000 km ÷ 2×10⁸ m/s ≈ 55 ms (고속도로를 달리는 시간)', 'propagation: Seoul→NYC 11,000 km ÷ 2×10⁸ m/s ≈ 55 ms (driving the highway)'], 'cz-mono ntx-xs ntx-g', 2);
  T(S, 'e3', 1, 5.6, ['대역폭을 늘려도 빛의 속도는 못 넘어요 → CDN으로 거리를 줄여요', 'more bandwidth can’t beat light speed → CDNs shrink the distance'], 'ntx-xs', 2);
  box2(S, 'rq', 1, 7.2, 4, 2, ['라우터', 'router'], 'line', 3, { pct: 40 });
  for (let i = 0; i < 8; i++) { box2(S, 'q' + i, 5.4 + i * 1.3, 7.6, 1.15, 1.2, '', 'line', 3, { pct: 45 }); tsets(S, 'q' + i, [[3, i < 6 ? 'warn' : 'line', i < 6 ? 45 : 45], [4, 'warn', 45]]); }
  ar(S, 'qin', [20.6, 8.2], [16, 8.2], 'danger', 3, { h: .1 }); xm(S, 'qx', 21.6, 8.4, 4); T(S, 'qt', 22.2, 7.5, ['도착 > 처리 → 큐가 참', 'arrivals > service: queue fills'], 'ntx-xs ntx-w', 3); T(S, 'qt2', 22.2, 8.5, ['가득 차면 버려요', 'full → drop'], 'ntx-xs ntx-r', 4);
  rect(S, 'pipe', 1, 10.4, 22, 1.6, 'accent', 18, 4, { r: .8, css: 'border:.1em solid var(--accent)', html: ['1 Gbps × 100 ms = 12.5 MB가 “선 위에” 떠 있어요', '1 Gbps × 100 ms = 12.5 MB “in flight” on the wire'], cls: 'cz-c ntx-c2' });
  T(S, 'bdp', 23.6, 10.6, ['BDP = 대역폭 × RTT', 'BDP = bandwidth × RTT'], 'cz-mono ntx-xs ntx-a', 4); T(S, 'bdp2', 23.6, 11.6, ['윈도우 ≥ BDP여야 꽉 차요', 'window ≥ BDP to fill it'], 'ntx-xs', 4);
  fin(S, 'z', 13, [['전송 지연은 대역폭이, 전파 지연은 거리가 정해요 · 큐잉 지연은 혼잡에 따라 출렁여요', 'bandwidth sets transmission delay, distance sets propagation, and congestion makes queuing swing', 'ntx-xs ntx-a'], ['버퍼가 너무 크면 큐가 늘 차서 지연만 커져요 (버퍼블로트) → AQM, BBR', 'oversized buffers stay full and only add latency (bufferbloat) → AQM, BBR'], ['멀고 빠른 회선(긴 BDP)은 TCP 윈도우 스케일링이 있어야 대역폭을 다 써요', 'long fat networks (large BDP) need TCP window scaling to use their bandwidth']]);
  S.cap(1, '지연의 네 요소', 'Four parts of delay').cap(2, '전송 vs 전파', 'Transmission vs propagation').cap(3, '큐잉 지연', 'Queuing delay').cap(4, '대역폭-지연 곱 (BDP)', 'Bandwidth-delay product').cap(5, '네트워크 지연', 'Network delay');
  return S;
}

/* ================= application ================= */
function sProxy() {
  const S = scene({ id: 'nt-proxy', steps: 5, per: 1.6 });
  frame(S, 'fn', .6, .4, 15, 5.4, 'accent', 1, { dash: 1, w: .1 }); T(S, 'fnl', .9, .5, ['회사 네트워크', 'company network'], 'ntx-tiny ntx-a', 1);
  ['PC 1', 'PC 2', 'PC 3'].forEach((l, i) => { box2(S, 'c' + i, 1, 1.4 + i * 1.4, 4, 1.15, l, 'line', 1, { pct: 40 }); seg(S, 'cl' + i, [5.05, 1.95 + i * 1.4], [8.95, 3.35], 1, 'ink-3', .07); });
  box2(S, 'fp', 9, 2.4, 5.8, 1.9, ['포워드 프록시', 'forward proxy'], 'accent', 1, { pct: 35 }); ar(S, 'fa', [14.9, 3.35], [19.9, 3.35], 'ink-3', 1, { h: .08 });
  box2(S, 'net', 20, 2.4, 6.6, 1.9, ['인터넷 사이트', 'websites'], 'line', 1, { pct: 40 });
  T(S, 'ft', 20, 4.6, ['클라이언트를 숨기고, 접속을 거르고, 캐시해요', 'hides clients, filters and caches'], 'ntx-tiny', 1);
  frame(S, 'rn', 8.6, 6.2, 22.4, 5.6, 'ok', 2, { dash: 1, w: .1 }); T(S, 'rnl', 8.9, 6.3, ['데이터센터', 'data center'], 'ntx-tiny ntx-g', 2);
  box2(S, 'ic', 1, 8.1, 5, 1.9, ['사용자들', 'users'], 'line', 2, { pct: 40 }); ar(S, 'ra', [6.1, 9.05], [9.4, 9.05], 'ink-3', 2, { h: .08 });
  box2(S, 'rp', 9.5, 8.1, 6.4, 1.9, ['리버스 프록시', 'reverse proxy'], 'ok', 2, { pct: 35 });
  ['app 1', 'app 2', 'app 3'].forEach((l, i) => { box2(S, 'sv' + i, 21, 7 + i * 1.5, 6, 1.2, l, 'line', 2, { pct: 40 }); seg(S, 'sl' + i, [16, 9.05], [20.95, 7.6 + i * 1.5], 2, 'ink-3', .07); });
  T(S, 'rt', 21, 11.1, ['서버를 숨기고 앞에서 받아 줘요', 'hides and fronts the servers'], 'ntx-tiny', 2);
  [['TLS 종료', 'TLS termination'], ['로드 밸런싱', 'load balancing'], ['캐시', 'caching'], ['압축', 'compression'], ['/api → 서비스', '/api → service'], ['WAF·속도 제한', 'WAF · rate limits']].forEach((t, i) => box2(S, 'f' + i, 1 + i * 5.05, 12.4, 4.85, 1.3, t, 'ok', 3, { pct: 30 }));
  T(S, 'h1', 1, 14.1, ['원래 IP는 X-Forwarded-For, 원래 호스트는 Host 헤더로 넘겨요 · API 게이트웨이도 리버스 프록시', 'the client IP travels in X-Forwarded-For and the host in Host · an API gateway is a reverse proxy too'], 'ntx-xs ntx-a', 4);
  fin(S, 'z', 15.4, [['포워드 프록시는 클라이언트 편, 리버스 프록시는 서버 편에서 대신 요청을 받아 전달해요', 'a forward proxy acts for clients; a reverse proxy acts for servers', 'ntx-xs ntx-a'], ['Nginx, HAProxy, Envoy, Cloudflare가 대표적인 리버스 프록시예요', 'Nginx, HAProxy, Envoy and Cloudflare are common reverse proxies']]);
  S.cap(1, '포워드 프록시', 'Forward proxy').cap(2, '리버스 프록시', 'Reverse proxy').cap(3, '리버스 프록시가 하는 일', 'What a reverse proxy does').cap(4, '원래 정보 전달', 'Passing on the original details').cap(5, '포워드 vs 리버스 프록시', 'Forward vs reverse proxies');
  return S;
}
function sEmail() {
  const S = scene({ id: 'nt-email', steps: 5, per: 1.6 });
  box2(S, 'ac', 1, 1.6, 5, 1.8, ['앨리스 메일 앱', 'Alice’s client'], 'accent', 1, { pct: 30 });
  box2(S, 'am', 9, 1.6, 6, 1.8, ['a.com 메일 서버', 'a.com mail server'], 'accent', 1, { pct: 20 });
  ar(S, 'a1', [6.1, 2.5], [8.9, 2.5], 'accent', 1, { h: .08 }); T(S, 'a1l', 5.9, 3.6, 'SMTP 587', 'cz-mono ntx-tiny ntx-a', 1);
  box2(S, 'dns', 9, 5.6, 6, 1.5, ['DNS: b.com의 MX?', 'DNS: MX for b.com?'], 'warn', 2, { pct: 30 }); seg(S, 'dq', [12, 3.45], [12, 5.55], 2, 'warn', .08, { dash: 1 });
  T(S, 'mx', 9.2, 7.3, 'MX 10 mail.b.com', 'cz-mono ntx-tiny ntx-w', 2);
  box2(S, 'bm', 19, 1.6, 6, 1.8, ['b.com 메일 서버', 'b.com mail server'], 'ok', 2, { pct: 20 }); ar(S, 'a2', [15.1, 2.5], [18.9, 2.5], 'ok', 2, { h: .08 }); T(S, 'a2l', 15.3, 1.1, 'SMTP 25', 'cz-mono ntx-tiny ntx-g', 2);
  box2(S, 'mb', 19, 4.6, 6, 1.4, ['밥의 메일함', 'Bob’s mailbox'], 'ok', 3, { pct: 30 }); seg(S, 'mbl', [22, 3.45], [22, 4.55], 3, 'ok', .08);
  box2(S, 'bc', 27, 1.6, 4, 1.8, ['밥의 앱', 'Bob’s app'], 'accent', 3, { pct: 30 }); ar(S, 'a3', [25.1, 2.5], [26.9, 2.5], 'accent', 3, { h: .08 }); T(S, 'a3l', 25.2, 3.6, 'IMAP 993', 'cz-mono ntx-tiny ntx-a', 3);
  T(S, 'im', 19, 6.4, ['IMAP: 서버에 두고 여러 기기 동기화', 'IMAP: kept on the server, synced'], 'ntx-tiny', 3); T(S, 'im2', 19, 7.2, ['POP3: 내려받고 지움', 'POP3: download and delete'], 'ntx-tiny', 3);
  [['SPF ✓', ['보낸 IP가 a.com 허용 목록에', 'sender IP is on a.com’s allow list']], ['DKIM ✓', ['헤더 서명을 DNS 공개키로 검증', 'header signature checked with a DNS public key']], ['DMARC ✓', ['실패하면 어떻게 할지 a.com의 정책', 'a.com’s policy for failures']]].forEach(([k, d], i) => { box2(S, 'v' + i, 1, 8 + i * 1.5, 4.2, 1.2, k, 'ok', 4, { pct: 40 }); T(S, 'vd' + i, 5.6, 8.25 + i * 1.5, d, 'ntx-xs', 4); });
  stepT(S, 'k', 1, 12.8, [['앱이 내 메일 서버에 SMTP(587, 인증)로 제출해요', 'the app submits to its own mail server over SMTP (587, authenticated)'], ['내 서버가 DNS에서 받는 쪽의 MX 레코드를 찾아 SMTP(25)로 전달해요', 'the server looks up the recipient’s MX record and relays over SMTP (25)'], ['받는 서버가 메일함에 저장 · 밥은 IMAP으로 가져와 읽어요', 'the receiving server stores it; Bob reads it via IMAP'], ['받는 서버는 SPF·DKIM·DMARC로 사칭 메일을 걸러요', 'the receiving server filters spoofing with SPF, DKIM and DMARC']], 'ntx-xs ntx-a');
  fin(S, 'z', 14.2, [['이메일: 보내기는 SMTP, 받아 읽기는 IMAP/POP3, 길 찾기는 DNS MX', 'email: SMTP sends, IMAP/POP3 read, DNS MX records route', 'ntx-xs ntx-a'], ['SMTP는 원래 인증이 없어 발신자를 위조할 수 있었어요 → SPF·DKIM·DMARC가 뒤늦게 붙었어요', 'SMTP originally had no authentication, so senders could be forged → SPF, DKIM and DMARC were bolted on']]);
  S.cap(1, '메일 제출', 'Submitting mail').cap(2, 'MX 찾아 전달', 'Find the MX and relay').cap(3, '저장하고 읽기', 'Store and read').cap(4, '사칭 막기', 'Stopping spoofing').cap(5, '이메일의 흐름', 'How email flows');
  return S;
}

return { css: CSSX, secs: [], add: {
  'nt-layer': [
    item('nt-switching', '회선 교환 vs 패킷 교환', 'Circuit vs packet switching', '회선 교환은 통신 전에 길을 예약해 끝날 때까지 혼자 쓰고, 패킷 교환은 데이터를 잘게 나눠 각자 공유된 길로 보내요. 인터넷은 패킷 교환이에요.', '전화망 같은 회선 교환은 대역이 보장되고 지연이 일정하지만, 말이 없는 동안에도 회선을 차지해 낭비가 생겨요. 패킷 교환은 여러 사용자의 패킷이 같은 링크를 나눠 쓰는 통계적 다중화로 훨씬 효율적이지만, 지연이 변하고 순서가 바뀌거나 손실이 생길 수 있어요. 그 빈틈은 TCP가 재정렬과 재전송으로 메워요.', 'Circuit switching reserves a path for the whole conversation; packet switching chops data into packets that travel independently over shared links. The internet is packet switched.', 'A circuit-switched phone network guarantees capacity and steady delay but holds the line even during silence. Packet switching shares links among many users through statistical multiplexing, which is far more efficient, at the cost of variable delay, reordering and loss. TCP covers those gaps with reordering and retransmission.', sSwitching())
  ],
  'nt-inet': [
    item('nt-icmp', 'ICMP · ping · traceroute', 'ICMP, ping and traceroute', 'ICMP는 IP의 제어·오류 메시지예요. ping은 에코 요청으로 왕복 시간을 재고, traceroute는 TTL을 1씩 늘려 경로의 라우터를 하나씩 드러내요.', 'TTL은 라우터를 지날 때마다 1씩 줄고, 0이 되면 그 라우터가 패킷을 버리며 ICMP “시간 초과”를 돌려줘요. traceroute는 TTL=1, 2, 3…으로 보내 각 홉의 주소와 지연을 알아내고, 목적지에 닿으면 응답을 받아요. ICMP를 막는 라우터는 * * *로 보여요. ICMP를 통째로 막으면 경로 MTU 탐색이 깨져 이상한 장애가 나니 주의해요.', 'ICMP carries IP’s control and error messages. ping times round trips with echo requests, and traceroute reveals each router on the path by raising the TTL one step at a time.', 'Each router decrements the TTL; when it hits zero, the router drops the packet and returns an ICMP “time exceeded”. traceroute sends TTL = 1, 2, 3, … to learn each hop’s address and delay until the destination answers, while routers that block ICMP appear as * * *. Blocking ICMP entirely breaks path MTU discovery and causes puzzling outages.', sIcmp()),
    item('nt-ipv6', 'IPv6', 'IPv6', '128비트 주소로 IPv4 주소 고갈을 끝낸 차세대 IP예요. 2001:db8::ff00:42:8329처럼 16진수 8묶음으로 적어요.', 'IPv4는 약 43억 개라 2011년 IANA 풀이 바닥났지만, IPv6는 약 3.4 × 10³⁸개예요. 각 묶음 앞의 0은 생략하고, 연속된 0 묶음은 ::로 한 번만 줄여 써요. 보통 앞 64비트는 네트워크 접두사, 뒤 64비트는 인터페이스 ID이고, SLAAC로 기기가 스스로 주소를 만들어요. NAT 없이 모든 기기가 전역 주소를 갖지만 방화벽은 여전히 필요하고, 듀얼 스택으로 IPv4와 함께 쓰여요.', 'The next-generation IP that ends IPv4 exhaustion with 128-bit addresses, written as eight hex groups such as 2001:db8::ff00:42:8329.', 'IPv4 offers about 4.3 billion addresses and IANA’s pool ran dry in 2011; IPv6 offers about 3.4 × 10³⁸. Leading zeros in each group are dropped and one run of zero groups collapses to ::. Typically the first 64 bits are the network prefix and the last 64 the interface ID, and SLAAC lets devices build their own addresses. Every device can have a global address without NAT, though firewalls still matter, and dual stack keeps IPv4 running alongside.', sIpv6()),
    item('nt-lsdv', '거리 벡터 vs 링크 상태 라우팅', 'Distance-vector vs link-state routing', '라우터가 경로를 계산하는 두 방식이에요. 이웃과 거리 표를 주고받거나(RIP), 링크 정보를 모두에게 뿌려 전체 지도로 계산해요(OSPF).', '거리 벡터는 이웃이 알려 준 거리에 링크 비용을 더해 표를 고쳐 가는 벨만-포드 방식이라 단순하지만 수렴이 느리고 무한 카운트 문제가 있어요(split horizon으로 완화). 링크 상태는 각 라우터가 자기 링크 정보(LSA)를 전체에 퍼뜨리고, 모두가 같은 지도에서 다익스트라로 최단 경로를 구해 빠르게 수렴하지만 메모리와 CPU를 더 써요. 조직 사이의 경로는 경로 벡터 프로토콜인 BGP가 맡아요.', 'Two ways routers compute paths: trade distance tables with neighbors (RIP) or flood link information so everyone computes on the full map (OSPF).', 'Distance vector updates its table from neighbors’ distances plus link costs (Bellman–Ford): simple, but slow to converge and prone to count-to-infinity, eased by split horizon. Link state has every router flood its own links (LSAs) so all build the same map and run Dijkstra, converging fast at the cost of memory and CPU. Between organizations, BGP, a path-vector protocol, takes over.', sLsdv()),
    item('nt-vlan', 'VLAN', 'VLANs', '물리 배선은 그대로 두고, 스위치 포트에 번호를 매겨 하나의 네트워크를 논리적으로 여러 개로 나누는 기술이에요.', '한 스위치의 모든 기기는 하나의 방송 영역이라 ARP 같은 브로드캐스트가 전부에게 퍼지지만, 포트를 VLAN 10과 20으로 나누면 서로 다른 방송 영역이 돼요. 트렁크 포트는 802.1Q 태그(VID)를 붙여 여러 VLAN을 한 선으로 다른 스위치에 넘기고, 다른 VLAN끼리는 라우터나 L3 스위치를 거쳐야 통신해요. 직원망·게스트망 분리, 데이터센터 테넌트 분리에 쓰이고, 클라우드 VPC와 VXLAN이 같은 생각을 확장했어요.', 'Logically splitting one physical network into several by numbering switch ports, without rewiring.', 'Every device on a switch shares one broadcast domain, so broadcasts like ARP reach everyone; assigning ports to VLAN 10 and 20 creates separate domains. Trunk ports add 802.1Q tags (VIDs) to carry many VLANs over one link to another switch, and traffic between VLANs must pass through a router or L3 switch. VLANs separate staff and guest networks or data-center tenants, and cloud VPCs and VXLAN scale the idea up.', sVlan()),
    item('nt-mtu', 'MTU와 단편화', 'MTU and fragmentation', 'MTU는 한 링크가 한 번에 실을 수 있는 최대 크기예요(이더넷 1500 B). 더 큰 IP 패킷은 쪼개거나(IPv4), 거절하고 알려 줘요(IPv6, DF).', '4000 B 패킷이 MTU 1500 링크를 만나면 1480 B씩 데이터를 나눠 각 조각에 IP 헤더를 붙이고, offset(8바이트 단위)과 MF 플래그로 위치를 표시해요. 재조립은 목적지에서만 하며, 조각 하나만 잃어도 패킷 전체를 다시 보내야 해 비효율적이에요. 그래서 DF를 켜고 ICMP “너무 큼”을 받아 크기를 줄이는 경로 MTU 탐색을 쓰고, TCP는 MSS(보통 1460 B)로 맞춰 보내요. VPN·터널은 MTU를 줄이니 MSS 클램핑이 필요해요.', 'The MTU is the largest frame a link can carry (1500 B on Ethernet); bigger IP packets are fragmented (IPv4) or refused with a notice (IPv6, DF).', 'When a 4000 B packet meets a 1500 B MTU link, its data is cut into 1480 B pieces, each with its own IP header, marked with an offset (in 8-byte units) and the MF flag. Only the destination reassembles, and losing one fragment means resending the whole packet. Hence path MTU discovery: set DF, receive ICMP “too big” and shrink, while TCP sizes segments to the MSS (typically 1460 B). VPNs and tunnels lower the MTU, so MSS clamping is needed.', sMtu())
  ],
  'nt-trans': [
    item('nt-delay', '네트워크 지연과 BDP', 'Network delay and BDP', '패킷 하나의 지연은 처리 + 큐잉 + 전송 + 전파 지연의 합이에요. 대역폭 × 왕복 시간(BDP)은 “선 위에 떠 있는 데이터 양”이에요.', '전송 지연은 패킷 크기 ÷ 대역폭(1500 B ÷ 100 Mbps = 0.12 ms), 전파 지연은 거리 ÷ 신호 속도(서울→뉴욕 약 55 ms)라 먼 거리에선 전파가 압도적이고, 그래서 CDN으로 거리를 줄여요. 큐잉 지연은 혼잡에 따라 출렁이고, 버퍼가 너무 크면 늘 차서 지연만 커지는 버퍼블로트가 생겨요. 1 Gbps × 100 ms면 12.5 MB가 날아다니므로, TCP 윈도우가 BDP보다 작으면 대역폭을 다 쓰지 못해요.', 'A packet’s delay is processing + queuing + transmission + propagation; bandwidth × round-trip time (the BDP) is how much data is “in flight” on the wire.', 'Transmission delay is size ÷ bandwidth (1500 B ÷ 100 Mbps = 0.12 ms), propagation is distance ÷ signal speed (about 55 ms Seoul to New York), so propagation dominates over long distances, which is why CDNs move content closer. Queuing delay swings with congestion, and oversized buffers that stay full cause bufferbloat. At 1 Gbps × 100 ms, 12.5 MB is in flight, so a TCP window smaller than the BDP can’t fill the pipe.', sDelay())
  ],
  'nt-app': [
    item('nt-proxy', '포워드 vs 리버스 프록시', 'Forward vs reverse proxies', '프록시는 요청을 대신 받아 전달하는 중간자예요. 포워드 프록시는 클라이언트 편, 리버스 프록시는 서버 편에 서요.', '포워드 프록시는 회사망 같은 곳에서 클라이언트를 숨기고, 접속을 거르고, 캐시해요. 리버스 프록시는 서버 앞에서 요청을 받아 TLS 종료, 로드 밸런싱, 캐시, 압축, 경로별 라우팅(/api → 서비스), WAF·속도 제한을 해 줘요. 원래 클라이언트 IP는 X-Forwarded-For, 원래 호스트는 Host 헤더로 넘겨요. Nginx, HAProxy, Envoy, Cloudflare가 대표적이고, API 게이트웨이도 리버스 프록시의 일종이에요.', 'A proxy is a middleman that receives and forwards requests; a forward proxy acts for clients and a reverse proxy for servers.', 'A forward proxy, as in a company network, hides clients, filters access and caches. A reverse proxy fronts the servers, handling TLS termination, load balancing, caching, compression, path routing (/api → service), WAF rules and rate limits. The original client IP travels in X-Forwarded-For and the host in the Host header. Nginx, HAProxy, Envoy and Cloudflare are common, and an API gateway is a kind of reverse proxy.', sProxy()),
    item('nt-email', '이메일: SMTP · IMAP · SPF', 'Email: SMTP, IMAP and SPF', '보내기는 SMTP, 받아 읽기는 IMAP/POP3, 받는 서버 찾기는 DNS의 MX 레코드가 맡고, SPF·DKIM·DMARC로 사칭 메일을 걸러요.', '앱은 SMTP(587, 인증)로 내 메일 서버에 제출하고, 서버는 받는 도메인의 MX 레코드를 찾아 SMTP(25)로 전달해요. 받는 서버가 메일함에 저장하면 IMAP(서버에 두고 여러 기기 동기화)이나 POP3(내려받고 삭제)로 읽어요. SMTP는 원래 인증이 없어 발신자를 위조할 수 있었기에, SPF(허용된 발송 IP), DKIM(헤더 전자 서명), DMARC(실패 시 정책)가 DNS 레코드로 추가되었어요.', 'SMTP sends, IMAP/POP3 read, DNS MX records find the receiving server, and SPF, DKIM and DMARC filter spoofed mail.', 'The app submits mail to its own server over SMTP (587, authenticated), and the server looks up the recipient domain’s MX record and relays over SMTP (25). The receiving server stores it in a mailbox, read via IMAP (kept on the server, synced across devices) or POP3 (downloaded and deleted). SMTP originally lacked authentication, so senders could be forged; SPF (allowed sending IPs), DKIM (header signatures) and DMARC (failure policy) were added as DNS records.', sEmail())
  ]
} };
})();

window.UX = page([
  sec('nt-layer', '계층 모델', 'Layers', '네트워크 계층 모델', 'Network layer models',
    '복잡한 통신을 층으로 나눠 각 층이 한 가지 일만 하게 만들었어요.', 'Communication is split into layers so each does one job.', [
    item('nt-osi', 'OSI 7계층 · TCP/IP', 'OSI model · TCP/IP', '네트워크 기능을 물리 → 데이터 링크 → 네트워크 → 전송 → 세션 → 표현 → 응용 7개 층으로 나눈 참조 모델이에요. 실제 인터넷은 4계층 TCP/IP 모델로 동작해요.', '장애를 볼 때 "몇 계층 문제인가"로 좁혀 가요. 케이블(1), IP·라우팅(3), 포트·방화벽(4), 앱(7) 순서로 확인하면 빨라요. L4/L7 로드 밸런서라는 말도 여기서 나와요.', 'A reference model splitting networking into seven layers from physical up to application. The real internet runs the four-layer TCP/IP model.', 'When debugging, narrow it down by layer: cable (1), IP and routing (3), ports and firewalls (4), then the app (7). “L4/L7 load balancer” comes from here.', sOSI()),
    item('nt-encap', '캡슐화', 'Encapsulation', '데이터가 아래 계층으로 내려가며 TCP, IP, 이더넷 헤더가 차례로 붙고, 받는 쪽에서는 하나씩 벗겨져요.', '와이어샤크로 패킷을 열어 보면 이 헤더들이 층별로 보여요. 헤더만큼 오버헤드가 생겨서 MTU(보통 1500바이트)를 넘으면 쪼개져요.', 'As data goes down the stack it gains TCP, IP and Ethernet headers in turn; the receiver strips them one by one.', 'Open a packet in Wireshark and you see these headers layer by layer. Headers add overhead, and anything over the MTU (usually 1500 bytes) is fragmented.', sEncap())
  ].concat(XT.add['nt-layer'] || [])),
  sec('nt-inet', '링크·인터넷', 'Link & Internet', '주소와 길 찾기', 'Addresses and routing',
    '같은 네트워크 안에서는 MAC 주소로, 네트워크 사이에서는 IP 주소로 찾아가요.', 'MAC addresses work inside a network; IP addresses work between networks.', [
    item('nt-mac', 'MAC 주소와 스위치', 'MAC address · Switch', 'MAC 주소는 네트워크 카드마다 붙은 고유 주소예요. 스위치는 어떤 MAC이 어느 포트에 있는지 배워서 필요한 곳으로만 프레임을 보내요.', '같은 공유기·스위치에 연결된 기기끼리는 MAC으로 통신해요. 클라우드의 가상 네트워크(VPC)도 이 개념을 소프트웨어로 흉내 내요.', 'A MAC address is a unique ID burned into each network card. A switch learns which MAC sits on which port and forwards frames only there.', 'Devices on the same router or switch talk by MAC. Cloud virtual networks (VPCs) imitate the same idea in software.', sMac()),
    item('nt-arp', 'ARP', 'ARP', 'IP 주소는 아는데 MAC 주소를 모를 때, 네트워크 전체에 "이 IP 가진 분?" 하고 물어 MAC을 알아내요.', '다른 네트워크로 가는 패킷은 게이트웨이의 MAC으로 보내요. ARP 응답을 위조하는 ARP 스푸핑 공격이 있어서 공용 와이파이는 조심해야 해요.', 'When you know an IP but not its MAC, ARP asks the whole network “who has this IP?” and learns the MAC.', 'Packets for other networks go to the gateway’s MAC. Forged replies (ARP spoofing) are why public Wi-Fi needs care.', sARP()),
    item('nt-ip', 'IP 주소와 서브넷', 'IP address · Subnet', 'IPv4 주소는 32비트이고, /24 같은 서브넷 마스크로 앞부분은 네트워크, 뒷부분은 호스트를 나타내요.', '클라우드에서 VPC·서브넷을 만들 때 CIDR(10.0.0.0/16 등)을 정해요. 10.x, 172.16~31.x, 192.168.x는 사설 IP 대역이에요.', 'An IPv4 address is 32 bits; a mask like /24 says which leading bits are the network and which are the host.', 'You choose CIDR blocks (like 10.0.0.0/16) when creating cloud VPCs and subnets. 10.x, 172.16–31.x and 192.168.x are private ranges.', sIP()),
    item('nt-route', '라우팅', 'Routing', '라우터는 패킷의 목적지 IP를 보고 라우팅 테이블에서 다음으로 보낼 곳(다음 홉)을 골라요. 경로가 끊기면 다른 길로 돌아가요.', 'traceroute로 패킷이 거치는 라우터들을 볼 수 있어요. 회사 간·국가 간 경로는 BGP가 정하고, 잘못 설정되면 대규모 장애가 나요.', 'A router looks at the destination IP and picks the next hop from its routing table; if a path breaks, traffic goes around.', 'traceroute shows the routers on the path. Paths between networks are set by BGP, and BGP mistakes cause huge outages.', sRoute()),
    item('nt-nat', 'NAT', 'NAT · Network address translation', '공유기가 사설 IP 기기들의 출발 주소를 하나의 공인 IP와 포트로 바꿔 내보내고, 돌아오는 응답을 표를 보고 원래 기기에 돌려줘요.', '집 안 기기를 외부에서 바로 접속할 수 없는 이유예요. 서버를 열려면 포트 포워딩이 필요하고, P2P·화상통화는 NAT 통과 기술(STUN/TURN)을 써요.', 'The router rewrites private source addresses to one public IP and port, and maps replies back using a table.', 'This is why home devices are not reachable from outside: you need port forwarding, and P2P or video calls use NAT traversal (STUN/TURN).', sNAT()),
    item('nt-dhcp', 'DHCP', 'DHCP', '새 기기가 네트워크에 들어오면 DHCP 서버가 IP 주소, 게이트웨이, DNS 서버 주소를 자동으로 빌려줘요.', '와이파이에 연결만 하면 인터넷이 되는 이유예요. 서버처럼 주소가 바뀌면 안 되는 기기는 고정 IP나 예약(reservation)을 써요.', 'When a device joins, the DHCP server lends it an IP address plus gateway and DNS settings automatically.', 'It is why joining Wi-Fi “just works”. Servers that must keep their address use static IPs or reservations.', sDHCP())
  ].concat(XT.add['nt-inet'] || [])),
  sec('nt-trans', '전송 계층', 'Transport', 'TCP와 UDP', 'TCP and UDP',
    '프로그램과 프로그램 사이에서 데이터를 믿을 수 있게, 또는 빠르게 전달해요.', 'Moving data between programs, reliably or quickly.', [
    item('nt-hs', 'TCP 3-way 핸드셰이크', 'TCP three-way handshake', 'SYN → SYN+ACK → ACK 세 번의 메시지로 양쪽이 순서 번호를 맞추고 연결을 열어요.', '연결마다 왕복 1번이 더 들어서, 서버가 멀면 느려져요. Keep-Alive로 연결을 재사용하고, 커넥션 풀을 쓰는 이유예요.', 'Three messages, SYN, SYN+ACK and ACK, sync sequence numbers on both sides and open the connection.', 'Each connection costs an extra round trip, which hurts with distant servers. That is why keep-alive and connection pools reuse connections.', sHS()),
    item('nt-fin', '연결 종료 (4-way)', 'Connection teardown', '각자 FIN을 보내고 ACK를 받아 양방향을 따로 닫아요. 먼저 닫은 쪽은 TIME_WAIT 상태로 잠시 기다려요.', '짧은 연결을 너무 많이 만들면 TIME_WAIT가 쌓여 포트가 부족해져요. 연결 재사용이 해법이에요.', 'Each side sends FIN and gets an ACK, closing each direction separately; the closer waits briefly in TIME_WAIT.', 'Too many short-lived connections pile up TIME_WAIT and exhaust ports. Reuse connections instead.', sFin()),
    item('nt-udp', 'TCP vs UDP', 'TCP vs UDP', 'TCP는 순서와 도착을 보장하고 잃은 것은 다시 보내요. UDP는 확인 없이 보내서 빠르지만 잃거나 순서가 바뀔 수 있어요.', '웹·DB·파일은 TCP, 실시간 영상·게임·DNS는 UDP를 써요. 늦게 온 영상 프레임은 쓸모없어서 재전송보다 빠른 게 낫거든요.', 'TCP guarantees order and delivery and resends losses. UDP sends without checks: faster, but packets may be lost or reordered.', 'Web, databases and files use TCP; live video, games and DNS use UDP, because a late video frame is useless anyway.', sUDP()),
    item('nt-retx', '재전송', 'Retransmission', '보낸 데이터의 확인(ACK)이 정해진 시간 안에 오지 않으면 잃어버린 것으로 보고 다시 보내요.', '패킷 손실이 1%만 있어도 재전송 대기 때문에 속도가 크게 떨어져요. 모바일 망에서 지연이 튀는 원인 중 하나예요.', 'If no acknowledgement arrives in time, the data is presumed lost and sent again.', 'Even 1% packet loss slows throughput a lot because of retransmission waits; it is one reason mobile latency spikes.', sRetx()),
    item('nt-window', '슬라이딩 윈도우', 'Sliding window', 'ACK를 하나씩 기다리지 않고 정해진 개수(윈도우)만큼 연달아 보내고, 확인되는 만큼 창을 밀어요.', '받는 쪽이 감당할 수 있는 양만 보내는 흐름 제어에 써요. 멀고 빠른 회선에선 윈도우가 커야 대역폭을 다 써요.', 'Send a window of segments without waiting for each ACK, sliding the window forward as acks arrive.', 'It provides flow control, sending only what the receiver can take. Long, fast links need large windows to use their bandwidth.', sWin()),
    item('nt-cong', '혼잡 제어', 'Congestion control', '보내는 양(cwnd)을 처음엔 빠르게 늘리다가, 손실이 생기면 네트워크가 막힌 것으로 보고 크게 줄여요.', '모든 TCP가 이렇게 양보해서 인터넷이 마비되지 않아요. 구글의 BBR은 손실 대신 대역폭과 지연을 재서 더 빨라요.', 'The sender grows its window (cwnd) quickly at first, then cuts it sharply when loss signals congestion.', 'Because every TCP backs off like this, the internet does not collapse. Google’s BBR measures bandwidth and delay instead of loss.', sCong()),
    item('nt-port', '포트와 소켓', 'Port · Socket', 'IP 주소로 컴퓨터를 찾고, 포트 번호로 그 안의 프로그램을 찾아요. IP와 포트의 조합이 소켓 주소예요.', '22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL처럼 잘 알려진 포트가 있어요. "Address already in use" 오류는 그 포트를 이미 누가 쓰고 있다는 뜻이에요.', 'An IP address finds the computer; a port number finds the program inside it. Together they form a socket address.', 'Well-known ports: 22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL. “Address already in use” means something already holds the port.', sPort())
  ].concat(XT.add['nt-trans'] || [])),
  sec('nt-app', '응용 계층', 'Application', '웹을 움직이는 프로토콜', 'Protocols that run the web',
    '브라우저와 서버가 실제로 주고받는 대화예요.', 'The actual conversations between browsers and servers.', [
    item('nt-dns', 'DNS', 'DNS · Domain Name System', '도메인 이름을 IP 주소로 바꿔요. 리졸버가 루트 → TLD → 권한 서버 순서로 물어보고 답을 캐시해요.', 'DNS를 바꿔도 TTL 동안은 예전 주소가 남아 있어요. 배포 전에 TTL을 줄여 두세요. "It\'s always DNS"라는 말이 있을 만큼 장애 원인으로 흔해요.', 'Turns domain names into IP addresses. A resolver asks root, then TLD, then authoritative servers, and caches the answer.', 'After a DNS change, old answers live on until the TTL expires, so lower it before a migration. Outages are so often DNS that “it’s always DNS” is a saying.', sDNS()),
    item('nt-http', 'HTTP 요청과 응답', 'HTTP request · response', '클라이언트가 메서드, 경로, 헤더로 요청하면 서버가 상태 코드, 헤더, 본문으로 응답해요. 각 요청은 독립적이에요(무상태).', '개발자 도구 Network 탭이나 curl -v로 헤더를 직접 보면 캐시·인증·CORS 문제를 빨리 찾아요.', 'The client sends a method, path and headers; the server replies with a status code, headers and a body. Each request stands alone (stateless).', 'Reading headers in DevTools’ Network tab or with curl -v quickly reveals caching, auth and CORS problems.', sHTTP()),
    item('nt-tls', 'TLS 핸드셰이크', 'TLS handshake', 'HTTPS 연결 전에 암호 방식을 정하고, 서버 인증서를 검증하고, 양쪽이 같은 세션 키를 만들어요. 이후 모든 통신은 암호화돼요.', '인증서가 만료되면 사이트 전체가 막혀요. Let\'s Encrypt와 자동 갱신을 꼭 설정하세요. TLS 1.3은 왕복 1번으로 끝나 빨라요.', 'Before HTTPS traffic flows, both sides agree on ciphers, verify the server certificate and derive a shared session key.', 'An expired certificate takes the whole site down, so automate renewal (e.g. Let’s Encrypt). TLS 1.3 finishes in one round trip.', sTLS()),
    item('nt-http2', 'HTTP/1.1 · 2 · 3', 'HTTP/1.1 · 2 · 3', 'HTTP/1.1은 한 연결에서 응답을 차례로 받고, HTTP/2는 여러 요청을 한 연결에 섞어 보내며, HTTP/3은 UDP 기반 QUIC을 써요.', 'HTTP/2부터는 파일을 하나로 합치거나 도메인을 나누는 옛 최적화가 덜 필요해요. 대부분의 CDN이 HTTP/3을 지원해요.', 'HTTP/1.1 receives responses one by one per connection, HTTP/2 interleaves many on one connection, and HTTP/3 runs on QUIC over UDP.', 'With HTTP/2, old tricks like bundling files or sharding domains matter less. Most CDNs support HTTP/3.', sH2()),
    item('nt-ws', '웹소켓', 'WebSocket', 'HTTP로 시작한 연결을 업그레이드해서, 서버와 브라우저가 언제든 서로 메시지를 보낼 수 있는 양방향 통로로 써요.', '채팅, 실시간 알림, 협업 편집에 써요. 서버에서 보내기만 하면 SSE가 더 간단하고, 연결이 많으면 로드 밸런서 설정을 신경 써야 해요.', 'Upgrades an HTTP connection into a two-way channel where either side can send messages at any time.', 'Used for chat, live notifications and collaborative editing. For server-to-client only, SSE is simpler; many connections need load balancer care.', sWS()),
    item('nt-url', 'URL을 입력하면 생기는 일', 'What happens when you enter a URL', 'DNS 조회 → TCP 연결 → TLS 협상 → HTTP 요청 → 응답 수신 → 화면 렌더링 순서로 진행돼요.', '면접 단골 질문이자 성능 개선의 지도예요. 어느 구간이 긴지 워터폴로 보고 DNS 캐시, 연결 재사용, CDN, 압축으로 줄여요.', 'DNS lookup, TCP connect, TLS, HTTP request, response, then rendering.', 'A classic interview question and a map for performance work: find the long phase in the waterfall, then shorten it with DNS caching, connection reuse, CDNs and compression.', sURL())
  ].concat(XT.add['nt-app'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += '\n.os-lg .in{font-size:.9em;font-weight:700;color:var(--ink)}\n.nt-b .in{font-weight:800;color:var(--ink)}';
})();
