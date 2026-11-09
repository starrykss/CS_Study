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

window.UX = page([
  sec('nt-layer', '계층 모델', 'Layers', '네트워크 계층 모델', 'Network layer models',
    '복잡한 통신을 층으로 나눠 각 층이 한 가지 일만 하게 만들었어요.', 'Communication is split into layers so each does one job.', [
    item('nt-osi', 'OSI 7계층 · TCP/IP', 'OSI model · TCP/IP', '네트워크 기능을 물리 → 데이터 링크 → 네트워크 → 전송 → 세션 → 표현 → 응용 7개 층으로 나눈 참조 모델이에요. 실제 인터넷은 4계층 TCP/IP 모델로 동작해요.', '장애를 볼 때 "몇 계층 문제인가"로 좁혀 가요. 케이블(1), IP·라우팅(3), 포트·방화벽(4), 앱(7) 순서로 확인하면 빨라요. L4/L7 로드 밸런서라는 말도 여기서 나와요.', 'A reference model splitting networking into seven layers from physical up to application. The real internet runs the four-layer TCP/IP model.', 'When debugging, narrow it down by layer: cable (1), IP and routing (3), ports and firewalls (4), then the app (7). “L4/L7 load balancer” comes from here.', sOSI()),
    item('nt-encap', '캡슐화', 'Encapsulation', '데이터가 아래 계층으로 내려가며 TCP, IP, 이더넷 헤더가 차례로 붙고, 받는 쪽에서는 하나씩 벗겨져요.', '와이어샤크로 패킷을 열어 보면 이 헤더들이 층별로 보여요. 헤더만큼 오버헤드가 생겨서 MTU(보통 1500바이트)를 넘으면 쪼개져요.', 'As data goes down the stack it gains TCP, IP and Ethernet headers in turn; the receiver strips them one by one.', 'Open a packet in Wireshark and you see these headers layer by layer. Headers add overhead, and anything over the MTU (usually 1500 bytes) is fragmented.', sEncap())
  ]),
  sec('nt-inet', '링크·인터넷', 'Link & Internet', '주소와 길 찾기', 'Addresses and routing',
    '같은 네트워크 안에서는 MAC 주소로, 네트워크 사이에서는 IP 주소로 찾아가요.', 'MAC addresses work inside a network; IP addresses work between networks.', [
    item('nt-mac', 'MAC 주소와 스위치', 'MAC address · Switch', 'MAC 주소는 네트워크 카드마다 붙은 고유 주소예요. 스위치는 어떤 MAC이 어느 포트에 있는지 배워서 필요한 곳으로만 프레임을 보내요.', '같은 공유기·스위치에 연결된 기기끼리는 MAC으로 통신해요. 클라우드의 가상 네트워크(VPC)도 이 개념을 소프트웨어로 흉내 내요.', 'A MAC address is a unique ID burned into each network card. A switch learns which MAC sits on which port and forwards frames only there.', 'Devices on the same router or switch talk by MAC. Cloud virtual networks (VPCs) imitate the same idea in software.', sMac()),
    item('nt-arp', 'ARP', 'ARP', 'IP 주소는 아는데 MAC 주소를 모를 때, 네트워크 전체에 "이 IP 가진 분?" 하고 물어 MAC을 알아내요.', '다른 네트워크로 가는 패킷은 게이트웨이의 MAC으로 보내요. ARP 응답을 위조하는 ARP 스푸핑 공격이 있어서 공용 와이파이는 조심해야 해요.', 'When you know an IP but not its MAC, ARP asks the whole network “who has this IP?” and learns the MAC.', 'Packets for other networks go to the gateway’s MAC. Forged replies (ARP spoofing) are why public Wi-Fi needs care.', sARP()),
    item('nt-ip', 'IP 주소와 서브넷', 'IP address · Subnet', 'IPv4 주소는 32비트이고, /24 같은 서브넷 마스크로 앞부분은 네트워크, 뒷부분은 호스트를 나타내요.', '클라우드에서 VPC·서브넷을 만들 때 CIDR(10.0.0.0/16 등)을 정해요. 10.x, 172.16~31.x, 192.168.x는 사설 IP 대역이에요.', 'An IPv4 address is 32 bits; a mask like /24 says which leading bits are the network and which are the host.', 'You choose CIDR blocks (like 10.0.0.0/16) when creating cloud VPCs and subnets. 10.x, 172.16–31.x and 192.168.x are private ranges.', sIP()),
    item('nt-route', '라우팅', 'Routing', '라우터는 패킷의 목적지 IP를 보고 라우팅 테이블에서 다음으로 보낼 곳(다음 홉)을 골라요. 경로가 끊기면 다른 길로 돌아가요.', 'traceroute로 패킷이 거치는 라우터들을 볼 수 있어요. 회사 간·국가 간 경로는 BGP가 정하고, 잘못 설정되면 대규모 장애가 나요.', 'A router looks at the destination IP and picks the next hop from its routing table; if a path breaks, traffic goes around.', 'traceroute shows the routers on the path. Paths between networks are set by BGP, and BGP mistakes cause huge outages.', sRoute()),
    item('nt-nat', 'NAT', 'NAT · Network address translation', '공유기가 사설 IP 기기들의 출발 주소를 하나의 공인 IP와 포트로 바꿔 내보내고, 돌아오는 응답을 표를 보고 원래 기기에 돌려줘요.', '집 안 기기를 외부에서 바로 접속할 수 없는 이유예요. 서버를 열려면 포트 포워딩이 필요하고, P2P·화상통화는 NAT 통과 기술(STUN/TURN)을 써요.', 'The router rewrites private source addresses to one public IP and port, and maps replies back using a table.', 'This is why home devices are not reachable from outside: you need port forwarding, and P2P or video calls use NAT traversal (STUN/TURN).', sNAT()),
    item('nt-dhcp', 'DHCP', 'DHCP', '새 기기가 네트워크에 들어오면 DHCP 서버가 IP 주소, 게이트웨이, DNS 서버 주소를 자동으로 빌려줘요.', '와이파이에 연결만 하면 인터넷이 되는 이유예요. 서버처럼 주소가 바뀌면 안 되는 기기는 고정 IP나 예약(reservation)을 써요.', 'When a device joins, the DHCP server lends it an IP address plus gateway and DNS settings automatically.', 'It is why joining Wi-Fi “just works”. Servers that must keep their address use static IPs or reservations.', sDHCP())
  ]),
  sec('nt-trans', '전송 계층', 'Transport', 'TCP와 UDP', 'TCP and UDP',
    '프로그램과 프로그램 사이에서 데이터를 믿을 수 있게, 또는 빠르게 전달해요.', 'Moving data between programs, reliably or quickly.', [
    item('nt-hs', 'TCP 3-way 핸드셰이크', 'TCP three-way handshake', 'SYN → SYN+ACK → ACK 세 번의 메시지로 양쪽이 순서 번호를 맞추고 연결을 열어요.', '연결마다 왕복 1번이 더 들어서, 서버가 멀면 느려져요. Keep-Alive로 연결을 재사용하고, 커넥션 풀을 쓰는 이유예요.', 'Three messages, SYN, SYN+ACK and ACK, sync sequence numbers on both sides and open the connection.', 'Each connection costs an extra round trip, which hurts with distant servers. That is why keep-alive and connection pools reuse connections.', sHS()),
    item('nt-fin', '연결 종료 (4-way)', 'Connection teardown', '각자 FIN을 보내고 ACK를 받아 양방향을 따로 닫아요. 먼저 닫은 쪽은 TIME_WAIT 상태로 잠시 기다려요.', '짧은 연결을 너무 많이 만들면 TIME_WAIT가 쌓여 포트가 부족해져요. 연결 재사용이 해법이에요.', 'Each side sends FIN and gets an ACK, closing each direction separately; the closer waits briefly in TIME_WAIT.', 'Too many short-lived connections pile up TIME_WAIT and exhaust ports. Reuse connections instead.', sFin()),
    item('nt-udp', 'TCP vs UDP', 'TCP vs UDP', 'TCP는 순서와 도착을 보장하고 잃은 것은 다시 보내요. UDP는 확인 없이 보내서 빠르지만 잃거나 순서가 바뀔 수 있어요.', '웹·DB·파일은 TCP, 실시간 영상·게임·DNS는 UDP를 써요. 늦게 온 영상 프레임은 쓸모없어서 재전송보다 빠른 게 낫거든요.', 'TCP guarantees order and delivery and resends losses. UDP sends without checks: faster, but packets may be lost or reordered.', 'Web, databases and files use TCP; live video, games and DNS use UDP, because a late video frame is useless anyway.', sUDP()),
    item('nt-retx', '재전송', 'Retransmission', '보낸 데이터의 확인(ACK)이 정해진 시간 안에 오지 않으면 잃어버린 것으로 보고 다시 보내요.', '패킷 손실이 1%만 있어도 재전송 대기 때문에 속도가 크게 떨어져요. 모바일 망에서 지연이 튀는 원인 중 하나예요.', 'If no acknowledgement arrives in time, the data is presumed lost and sent again.', 'Even 1% packet loss slows throughput a lot because of retransmission waits; it is one reason mobile latency spikes.', sRetx()),
    item('nt-window', '슬라이딩 윈도우', 'Sliding window', 'ACK를 하나씩 기다리지 않고 정해진 개수(윈도우)만큼 연달아 보내고, 확인되는 만큼 창을 밀어요.', '받는 쪽이 감당할 수 있는 양만 보내는 흐름 제어에 써요. 멀고 빠른 회선에선 윈도우가 커야 대역폭을 다 써요.', 'Send a window of segments without waiting for each ACK, sliding the window forward as acks arrive.', 'It provides flow control, sending only what the receiver can take. Long, fast links need large windows to use their bandwidth.', sWin()),
    item('nt-cong', '혼잡 제어', 'Congestion control', '보내는 양(cwnd)을 처음엔 빠르게 늘리다가, 손실이 생기면 네트워크가 막힌 것으로 보고 크게 줄여요.', '모든 TCP가 이렇게 양보해서 인터넷이 마비되지 않아요. 구글의 BBR은 손실 대신 대역폭과 지연을 재서 더 빨라요.', 'The sender grows its window (cwnd) quickly at first, then cuts it sharply when loss signals congestion.', 'Because every TCP backs off like this, the internet does not collapse. Google’s BBR measures bandwidth and delay instead of loss.', sCong()),
    item('nt-port', '포트와 소켓', 'Port · Socket', 'IP 주소로 컴퓨터를 찾고, 포트 번호로 그 안의 프로그램을 찾아요. IP와 포트의 조합이 소켓 주소예요.', '22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL처럼 잘 알려진 포트가 있어요. "Address already in use" 오류는 그 포트를 이미 누가 쓰고 있다는 뜻이에요.', 'An IP address finds the computer; a port number finds the program inside it. Together they form a socket address.', 'Well-known ports: 22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL. “Address already in use” means something already holds the port.', sPort())
  ]),
  sec('nt-app', '응용 계층', 'Application', '웹을 움직이는 프로토콜', 'Protocols that run the web',
    '브라우저와 서버가 실제로 주고받는 대화예요.', 'The actual conversations between browsers and servers.', [
    item('nt-dns', 'DNS', 'DNS · Domain Name System', '도메인 이름을 IP 주소로 바꿔요. 리졸버가 루트 → TLD → 권한 서버 순서로 물어보고 답을 캐시해요.', 'DNS를 바꿔도 TTL 동안은 예전 주소가 남아 있어요. 배포 전에 TTL을 줄여 두세요. "It\'s always DNS"라는 말이 있을 만큼 장애 원인으로 흔해요.', 'Turns domain names into IP addresses. A resolver asks root, then TLD, then authoritative servers, and caches the answer.', 'After a DNS change, old answers live on until the TTL expires, so lower it before a migration. Outages are so often DNS that “it’s always DNS” is a saying.', sDNS()),
    item('nt-http', 'HTTP 요청과 응답', 'HTTP request · response', '클라이언트가 메서드, 경로, 헤더로 요청하면 서버가 상태 코드, 헤더, 본문으로 응답해요. 각 요청은 독립적이에요(무상태).', '개발자 도구 Network 탭이나 curl -v로 헤더를 직접 보면 캐시·인증·CORS 문제를 빨리 찾아요.', 'The client sends a method, path and headers; the server replies with a status code, headers and a body. Each request stands alone (stateless).', 'Reading headers in DevTools’ Network tab or with curl -v quickly reveals caching, auth and CORS problems.', sHTTP()),
    item('nt-tls', 'TLS 핸드셰이크', 'TLS handshake', 'HTTPS 연결 전에 암호 방식을 정하고, 서버 인증서를 검증하고, 양쪽이 같은 세션 키를 만들어요. 이후 모든 통신은 암호화돼요.', '인증서가 만료되면 사이트 전체가 막혀요. Let\'s Encrypt와 자동 갱신을 꼭 설정하세요. TLS 1.3은 왕복 1번으로 끝나 빨라요.', 'Before HTTPS traffic flows, both sides agree on ciphers, verify the server certificate and derive a shared session key.', 'An expired certificate takes the whole site down, so automate renewal (e.g. Let’s Encrypt). TLS 1.3 finishes in one round trip.', sTLS()),
    item('nt-http2', 'HTTP/1.1 · 2 · 3', 'HTTP/1.1 · 2 · 3', 'HTTP/1.1은 한 연결에서 응답을 차례로 받고, HTTP/2는 여러 요청을 한 연결에 섞어 보내며, HTTP/3은 UDP 기반 QUIC을 써요.', 'HTTP/2부터는 파일을 하나로 합치거나 도메인을 나누는 옛 최적화가 덜 필요해요. 대부분의 CDN이 HTTP/3을 지원해요.', 'HTTP/1.1 receives responses one by one per connection, HTTP/2 interleaves many on one connection, and HTTP/3 runs on QUIC over UDP.', 'With HTTP/2, old tricks like bundling files or sharding domains matter less. Most CDNs support HTTP/3.', sH2()),
    item('nt-ws', '웹소켓', 'WebSocket', 'HTTP로 시작한 연결을 업그레이드해서, 서버와 브라우저가 언제든 서로 메시지를 보낼 수 있는 양방향 통로로 써요.', '채팅, 실시간 알림, 협업 편집에 써요. 서버에서 보내기만 하면 SSE가 더 간단하고, 연결이 많으면 로드 밸런서 설정을 신경 써야 해요.', 'Upgrades an HTTP connection into a two-way channel where either side can send messages at any time.', 'Used for chat, live notifications and collaborative editing. For server-to-client only, SSE is simpler; many connections need load balancer care.', sWS()),
    item('nt-url', 'URL을 입력하면 생기는 일', 'What happens when you enter a URL', 'DNS 조회 → TCP 연결 → TLS 협상 → HTTP 요청 → 응답 수신 → 화면 렌더링 순서로 진행돼요.', '면접 단골 질문이자 성능 개선의 지도예요. 어느 구간이 긴지 워터폴로 보고 DNS 캐시, 연결 재사용, CDN, 압축으로 줄여요.', 'DNS lookup, TCP connect, TLS, HTTP request, response, then rendering.', 'A classic interview question and a map for performance work: find the long phase in the waterfall, then shorten it with DNS caching, connection reuse, CDNs and compression.', sURL())
  ])
]);
window.UX[0].css += '\n.os-lg .in{font-size:.9em;font-weight:700;color:var(--ink)}\n.nt-b .in{font-weight:800;color:var(--ink)}';
})();
