# 컴퓨터 네트워크 · Computer networks

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/computer-networks/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

OSI 7계층과 캡슐화, IP 주소와 서브넷, DNS, TCP 핸드셰이크·흐름 제어·혼잡 제어, UDP, HTTP/1.1·2·3, TLS, NAT, 라우팅, 로드 밸런서, CDN, 웹소켓까지 다뤄요.

The OSI model and encapsulation, IP addresses and subnets, DNS, TCP handshakes, flow and congestion control, UDP, HTTP/1.1, 2 and 3, TLS, NAT, routing, load balancers, CDNs and WebSockets.

**4개 주제 · 21개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [네트워크 계층 모델 · Network layer models](#nt-layer) (2)
- [주소와 길 찾기 · Addresses and routing](#nt-inet) (6)
- [TCP와 UDP · TCP and UDP](#nt-trans) (7)
- [웹을 움직이는 프로토콜 · Protocols that run the web](#nt-app) (6)

<a id="nt-layer"></a>

## 네트워크 계층 모델 · Network layer models

복잡한 통신을 층으로 나눠 각 층이 한 가지 일만 하게 만들었어요.  
*Communication is split into layers so each does one job.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **OSI 7계층 · TCP/IP**<br>OSI model · TCP/IP | 네트워크 기능을 물리 → 데이터 링크 → 네트워크 → 전송 → 세션 → 표현 → 응용 7개 층으로 나눈 참조 모델이에요. 실제 인터넷은 4계층 TCP/IP 모델로 동작해요.<br><sub>A reference model splitting networking into seven layers from physical up to application. The real internet runs the four-layer TCP/IP model.</sub> | 장애를 볼 때 "몇 계층 문제인가"로 좁혀 가요. 케이블(1), IP·라우팅(3), 포트·방화벽(4), 앱(7) 순서로 확인하면 빨라요. L4/L7 로드 밸런서라는 말도 여기서 나와요.<br><sub>When debugging, narrow it down by layer: cable (1), IP and routing (3), ports and firewalls (4), then the app (7). “L4/L7 load balancer” comes from here.</sub> |
| **캡슐화**<br>Encapsulation | 데이터가 아래 계층으로 내려가며 TCP, IP, 이더넷 헤더가 차례로 붙고, 받는 쪽에서는 하나씩 벗겨져요.<br><sub>As data goes down the stack it gains TCP, IP and Ethernet headers in turn; the receiver strips them one by one.</sub> | 와이어샤크로 패킷을 열어 보면 이 헤더들이 층별로 보여요. 헤더만큼 오버헤드가 생겨서 MTU(보통 1500바이트)를 넘으면 쪼개져요.<br><sub>Open a packet in Wireshark and you see these headers layer by layer. Headers add overhead, and anything over the MTU (usually 1500 bytes) is fragmented.</sub> |

<a id="nt-inet"></a>

## 주소와 길 찾기 · Addresses and routing

같은 네트워크 안에서는 MAC 주소로, 네트워크 사이에서는 IP 주소로 찾아가요.  
*MAC addresses work inside a network; IP addresses work between networks.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **MAC 주소와 스위치**<br>MAC address · Switch | MAC 주소는 네트워크 카드마다 붙은 고유 주소예요. 스위치는 어떤 MAC이 어느 포트에 있는지 배워서 필요한 곳으로만 프레임을 보내요.<br><sub>A MAC address is a unique ID burned into each network card. A switch learns which MAC sits on which port and forwards frames only there.</sub> | 같은 공유기·스위치에 연결된 기기끼리는 MAC으로 통신해요. 클라우드의 가상 네트워크(VPC)도 이 개념을 소프트웨어로 흉내 내요.<br><sub>Devices on the same router or switch talk by MAC. Cloud virtual networks (VPCs) imitate the same idea in software.</sub> |
| **ARP**<br>ARP | IP 주소는 아는데 MAC 주소를 모를 때, 네트워크 전체에 "이 IP 가진 분?" 하고 물어 MAC을 알아내요.<br><sub>When you know an IP but not its MAC, ARP asks the whole network “who has this IP?” and learns the MAC.</sub> | 다른 네트워크로 가는 패킷은 게이트웨이의 MAC으로 보내요. ARP 응답을 위조하는 ARP 스푸핑 공격이 있어서 공용 와이파이는 조심해야 해요.<br><sub>Packets for other networks go to the gateway’s MAC. Forged replies (ARP spoofing) are why public Wi-Fi needs care.</sub> |
| **IP 주소와 서브넷**<br>IP address · Subnet | IPv4 주소는 32비트이고, /24 같은 서브넷 마스크로 앞부분은 네트워크, 뒷부분은 호스트를 나타내요.<br><sub>An IPv4 address is 32 bits; a mask like /24 says which leading bits are the network and which are the host.</sub> | 클라우드에서 VPC·서브넷을 만들 때 CIDR(10.0.0.0/16 등)을 정해요. 10.x, 172.16~31.x, 192.168.x는 사설 IP 대역이에요.<br><sub>You choose CIDR blocks (like 10.0.0.0/16) when creating cloud VPCs and subnets. 10.x, 172.16–31.x and 192.168.x are private ranges.</sub> |
| **라우팅**<br>Routing | 라우터는 패킷의 목적지 IP를 보고 라우팅 테이블에서 다음으로 보낼 곳(다음 홉)을 골라요. 경로가 끊기면 다른 길로 돌아가요.<br><sub>A router looks at the destination IP and picks the next hop from its routing table; if a path breaks, traffic goes around.</sub> | traceroute로 패킷이 거치는 라우터들을 볼 수 있어요. 회사 간·국가 간 경로는 BGP가 정하고, 잘못 설정되면 대규모 장애가 나요.<br><sub>traceroute shows the routers on the path. Paths between networks are set by BGP, and BGP mistakes cause huge outages.</sub> |
| **NAT**<br>NAT · Network address translation | 공유기가 사설 IP 기기들의 출발 주소를 하나의 공인 IP와 포트로 바꿔 내보내고, 돌아오는 응답을 표를 보고 원래 기기에 돌려줘요.<br><sub>The router rewrites private source addresses to one public IP and port, and maps replies back using a table.</sub> | 집 안 기기를 외부에서 바로 접속할 수 없는 이유예요. 서버를 열려면 포트 포워딩이 필요하고, P2P·화상통화는 NAT 통과 기술(STUN/TURN)을 써요.<br><sub>This is why home devices are not reachable from outside: you need port forwarding, and P2P or video calls use NAT traversal (STUN/TURN).</sub> |
| **DHCP**<br>DHCP | 새 기기가 네트워크에 들어오면 DHCP 서버가 IP 주소, 게이트웨이, DNS 서버 주소를 자동으로 빌려줘요.<br><sub>When a device joins, the DHCP server lends it an IP address plus gateway and DNS settings automatically.</sub> | 와이파이에 연결만 하면 인터넷이 되는 이유예요. 서버처럼 주소가 바뀌면 안 되는 기기는 고정 IP나 예약(reservation)을 써요.<br><sub>It is why joining Wi-Fi “just works”. Servers that must keep their address use static IPs or reservations.</sub> |

<a id="nt-trans"></a>

## TCP와 UDP · TCP and UDP

프로그램과 프로그램 사이에서 데이터를 믿을 수 있게, 또는 빠르게 전달해요.  
*Moving data between programs, reliably or quickly.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **TCP 3-way 핸드셰이크**<br>TCP three-way handshake | SYN → SYN+ACK → ACK 세 번의 메시지로 양쪽이 순서 번호를 맞추고 연결을 열어요.<br><sub>Three messages, SYN, SYN+ACK and ACK, sync sequence numbers on both sides and open the connection.</sub> | 연결마다 왕복 1번이 더 들어서, 서버가 멀면 느려져요. Keep-Alive로 연결을 재사용하고, 커넥션 풀을 쓰는 이유예요.<br><sub>Each connection costs an extra round trip, which hurts with distant servers. That is why keep-alive and connection pools reuse connections.</sub> |
| **연결 종료 (4-way)**<br>Connection teardown | 각자 FIN을 보내고 ACK를 받아 양방향을 따로 닫아요. 먼저 닫은 쪽은 TIME_WAIT 상태로 잠시 기다려요.<br><sub>Each side sends FIN and gets an ACK, closing each direction separately; the closer waits briefly in TIME_WAIT.</sub> | 짧은 연결을 너무 많이 만들면 TIME_WAIT가 쌓여 포트가 부족해져요. 연결 재사용이 해법이에요.<br><sub>Too many short-lived connections pile up TIME_WAIT and exhaust ports. Reuse connections instead.</sub> |
| **TCP vs UDP**<br>TCP vs UDP | TCP는 순서와 도착을 보장하고 잃은 것은 다시 보내요. UDP는 확인 없이 보내서 빠르지만 잃거나 순서가 바뀔 수 있어요.<br><sub>TCP guarantees order and delivery and resends losses. UDP sends without checks: faster, but packets may be lost or reordered.</sub> | 웹·DB·파일은 TCP, 실시간 영상·게임·DNS는 UDP를 써요. 늦게 온 영상 프레임은 쓸모없어서 재전송보다 빠른 게 낫거든요.<br><sub>Web, databases and files use TCP; live video, games and DNS use UDP, because a late video frame is useless anyway.</sub> |
| **재전송**<br>Retransmission | 보낸 데이터의 확인(ACK)이 정해진 시간 안에 오지 않으면 잃어버린 것으로 보고 다시 보내요.<br><sub>If no acknowledgement arrives in time, the data is presumed lost and sent again.</sub> | 패킷 손실이 1%만 있어도 재전송 대기 때문에 속도가 크게 떨어져요. 모바일 망에서 지연이 튀는 원인 중 하나예요.<br><sub>Even 1% packet loss slows throughput a lot because of retransmission waits; it is one reason mobile latency spikes.</sub> |
| **슬라이딩 윈도우**<br>Sliding window | ACK를 하나씩 기다리지 않고 정해진 개수(윈도우)만큼 연달아 보내고, 확인되는 만큼 창을 밀어요.<br><sub>Send a window of segments without waiting for each ACK, sliding the window forward as acks arrive.</sub> | 받는 쪽이 감당할 수 있는 양만 보내는 흐름 제어에 써요. 멀고 빠른 회선에선 윈도우가 커야 대역폭을 다 써요.<br><sub>It provides flow control, sending only what the receiver can take. Long, fast links need large windows to use their bandwidth.</sub> |
| **혼잡 제어**<br>Congestion control | 보내는 양(cwnd)을 처음엔 빠르게 늘리다가, 손실이 생기면 네트워크가 막힌 것으로 보고 크게 줄여요.<br><sub>The sender grows its window (cwnd) quickly at first, then cuts it sharply when loss signals congestion.</sub> | 모든 TCP가 이렇게 양보해서 인터넷이 마비되지 않아요. 구글의 BBR은 손실 대신 대역폭과 지연을 재서 더 빨라요.<br><sub>Because every TCP backs off like this, the internet does not collapse. Google’s BBR measures bandwidth and delay instead of loss.</sub> |
| **포트와 소켓**<br>Port · Socket | IP 주소로 컴퓨터를 찾고, 포트 번호로 그 안의 프로그램을 찾아요. IP와 포트의 조합이 소켓 주소예요.<br><sub>An IP address finds the computer; a port number finds the program inside it. Together they form a socket address.</sub> | 22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL처럼 잘 알려진 포트가 있어요. "Address already in use" 오류는 그 포트를 이미 누가 쓰고 있다는 뜻이에요.<br><sub>Well-known ports: 22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL. “Address already in use” means something already holds the port.</sub> |

<a id="nt-app"></a>

## 웹을 움직이는 프로토콜 · Protocols that run the web

브라우저와 서버가 실제로 주고받는 대화예요.  
*The actual conversations between browsers and servers.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **DNS**<br>DNS · Domain Name System | 도메인 이름을 IP 주소로 바꿔요. 리졸버가 루트 → TLD → 권한 서버 순서로 물어보고 답을 캐시해요.<br><sub>Turns domain names into IP addresses. A resolver asks root, then TLD, then authoritative servers, and caches the answer.</sub> | DNS를 바꿔도 TTL 동안은 예전 주소가 남아 있어요. 배포 전에 TTL을 줄여 두세요. "It's always DNS"라는 말이 있을 만큼 장애 원인으로 흔해요.<br><sub>After a DNS change, old answers live on until the TTL expires, so lower it before a migration. Outages are so often DNS that “it’s always DNS” is a saying.</sub> |
| **HTTP 요청과 응답**<br>HTTP request · response | 클라이언트가 메서드, 경로, 헤더로 요청하면 서버가 상태 코드, 헤더, 본문으로 응답해요. 각 요청은 독립적이에요(무상태).<br><sub>The client sends a method, path and headers; the server replies with a status code, headers and a body. Each request stands alone (stateless).</sub> | 개발자 도구 Network 탭이나 curl -v로 헤더를 직접 보면 캐시·인증·CORS 문제를 빨리 찾아요.<br><sub>Reading headers in DevTools’ Network tab or with curl -v quickly reveals caching, auth and CORS problems.</sub> |
| **TLS 핸드셰이크**<br>TLS handshake | HTTPS 연결 전에 암호 방식을 정하고, 서버 인증서를 검증하고, 양쪽이 같은 세션 키를 만들어요. 이후 모든 통신은 암호화돼요.<br><sub>Before HTTPS traffic flows, both sides agree on ciphers, verify the server certificate and derive a shared session key.</sub> | 인증서가 만료되면 사이트 전체가 막혀요. Let's Encrypt와 자동 갱신을 꼭 설정하세요. TLS 1.3은 왕복 1번으로 끝나 빨라요.<br><sub>An expired certificate takes the whole site down, so automate renewal (e.g. Let’s Encrypt). TLS 1.3 finishes in one round trip.</sub> |
| **HTTP/1.1 · 2 · 3**<br>HTTP/1.1 · 2 · 3 | HTTP/1.1은 한 연결에서 응답을 차례로 받고, HTTP/2는 여러 요청을 한 연결에 섞어 보내며, HTTP/3은 UDP 기반 QUIC을 써요.<br><sub>HTTP/1.1 receives responses one by one per connection, HTTP/2 interleaves many on one connection, and HTTP/3 runs on QUIC over UDP.</sub> | HTTP/2부터는 파일을 하나로 합치거나 도메인을 나누는 옛 최적화가 덜 필요해요. 대부분의 CDN이 HTTP/3을 지원해요.<br><sub>With HTTP/2, old tricks like bundling files or sharding domains matter less. Most CDNs support HTTP/3.</sub> |
| **웹소켓**<br>WebSocket | HTTP로 시작한 연결을 업그레이드해서, 서버와 브라우저가 언제든 서로 메시지를 보낼 수 있는 양방향 통로로 써요.<br><sub>Upgrades an HTTP connection into a two-way channel where either side can send messages at any time.</sub> | 채팅, 실시간 알림, 협업 편집에 써요. 서버에서 보내기만 하면 SSE가 더 간단하고, 연결이 많으면 로드 밸런서 설정을 신경 써야 해요.<br><sub>Used for chat, live notifications and collaborative editing. For server-to-client only, SSE is simpler; many connections need load balancer care.</sub> |
| **URL을 입력하면 생기는 일**<br>What happens when you enter a URL | DNS 조회 → TCP 연결 → TLS 협상 → HTTP 요청 → 응답 수신 → 화면 렌더링 순서로 진행돼요.<br><sub>DNS lookup, TCP connect, TLS, HTTP request, response, then rendering.</sub> | 면접 단골 질문이자 성능 개선의 지도예요. 어느 구간이 긴지 워터폴로 보고 DNS 캐시, 연결 재사용, CDN, 압축으로 줄여요.<br><sub>A classic interview question and a map for performance work: find the long phase in the waterfall, then shorten it with DNS caching, connection reuse, CDNs and compression.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
