# 분산 시스템·시스템 설계 · Distributed systems & design

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/distributed-systems/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

수평·수직 확장, 캐싱 전략, 메시지 큐와 Pub/Sub, 레이트 리미팅, 일관된 해싱, Raft 합의, 멱등성과 재시도, 서킷 브레이커, API 게이트웨이, REST·GraphQL·gRPC, 이벤트 소싱과 사가까지 다뤄요.

Horizontal and vertical scaling, caching strategies, message queues and pub/sub, rate limiting, consistent hashing, Raft consensus, idempotency and retries, circuit breakers, API gateways, REST, GraphQL and gRPC, event sourcing and sagas.

**4개 주제 · 24개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [확장과 부하 분산 · Scaling and load](#di-scaling) (6)
- [비동기와 메시징 · Async and messaging](#di-messaging) (5)
- [일관성과 합의 · Consistency and consensus](#di-consensus) (6)
- [아키텍처와 장애 대응 · Architecture and resilience](#di-arch) (7)

<a id="di-scaling"></a>

## 확장과 부하 분산 · Scaling and load

사용자가 늘어도 느려지지 않게 서버와 데이터를 나누는 방법이에요.  
*Ways to split servers and data so growth doesn’t mean slowdowns.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **수직 vs 수평 확장**<br><sub>Scale up vs scale out</sub> | 수직 확장은 서버를 더 크게, 수평 확장은 같은 서버를 여러 대로 늘려요.<br><sub>Scaling up buys a bigger machine; scaling out adds more of the same machine.</sub> | 수직은 간단하지만 한계와 단일 장애점이 있어요. 웹 서버는 수평으로, DB는 수직부터 시작해 읽기 복제·샤딩으로 넘어가는 경우가 많아요.<br><sub>Up is simple but has a ceiling and a single point of failure. Web tiers usually scale out; databases often scale up first, then add replicas and shards.</sub> |
| **로드 밸런싱**<br><sub>Load balancing</sub> | 여러 서버 앞에서 요청을 나눠 주는 장치예요. 라운드 로빈, 최소 연결, 해시 같은 방식으로 고르고 죽은 서버는 빼요.<br><sub>A component in front of servers that spreads requests using round robin, least connections or hashing, and drops unhealthy servers.</sub> | L4(TCP)와 L7(HTTP 경로·헤더 기반)이 있어요. Nginx, HAProxy, AWS ALB/NLB가 대표적이고, 헬스 체크 경로를 꼭 만들어 두세요.<br><sub>Comes in L4 (TCP) and L7 (HTTP path/header) flavours, e.g. Nginx, HAProxy, AWS ALB/NLB; always expose a health-check endpoint.</sub> |
| **무상태 서버**<br><sub>Stateless servers</sub> | 세션 같은 상태를 서버 메모리에 두지 않고 공유 저장소로 빼서, 어느 서버가 받아도 같은 결과를 내게 해요.<br><sub>Keep state such as sessions out of server memory and in a shared store, so any server can handle any request.</sub> | 스티키 세션은 임시방편이에요. 세션은 Redis나 토큰(JWT)으로, 업로드 파일은 S3 같은 오브젝트 스토리지로 옮기세요.<br><sub>Sticky sessions are a stopgap; move sessions to Redis or tokens (JWT) and uploads to object storage such as S3.</sub> |
| **일관된 해싱**<br><sub>Consistent hashing</sub> | 서버와 키를 같은 해시 링 위에 놓고, 키는 시계 방향으로 처음 만나는 서버에 저장해요. 서버가 늘거나 줄어도 일부 키만 옮겨가요.<br><sub>Servers and keys share one hash ring; each key lives on the next server clockwise, so adding or removing a server moves only a few keys.</sub> | 분산 캐시(Memcached 클라이언트), DynamoDB·Cassandra 파티셔닝에 써요. 서버마다 가상 노드를 여러 개 두면 부하가 고르게 퍼져요.<br><sub>Used by distributed caches and by DynamoDB and Cassandra partitioning; virtual nodes per server even out the load.</sub> |
| **캐시 스탬피드**<br><sub>Cache stampede</sub> | 인기 있는 캐시 항목이 만료되는 순간 수많은 요청이 한꺼번에 DB로 몰려 장애를 일으키는 현상이에요.<br><sub>When a hot cache entry expires, a flood of requests hits the database at once and can take it down.</sub> | 갱신 락(하나만 다시 계산), 만료 전 미리 갱신, TTL에 무작위 값 더하기로 막아요. 이전 값을 잠깐 내주는(stale-while-revalidate) 방식도 좋아요.<br><sub>Prevent it with a rebuild lock, early refresh, randomized TTLs, or serving stale data while revalidating.</sub> |
| **레이트 리밋**<br><sub>Rate limiting</sub> | 일정 시간 동안 받을 수 있는 요청 수를 제한해요. 토큰 버킷은 토큰이 일정 속도로 차고, 요청마다 하나씩 써요.<br><sub>Caps how many requests are accepted per time window; in a token bucket, tokens refill at a steady rate and each request spends one.</sub> | 로그인 시도, 공개 API, 비싼 작업을 보호해요. 사용자·IP·API 키별로 걸고, 초과하면 429와 Retry-After 헤더를 돌려줘요.<br><sub>Protects logins, public APIs and costly endpoints; limit per user, IP or API key and answer 429 with a Retry-After header.</sub> |

<a id="di-messaging"></a>

## 비동기와 메시징 · Async and messaging

서비스들이 서로 기다리지 않고 메시지와 이벤트로 일하는 방식이에요.  
*How services work through messages and events instead of waiting on each other.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **메시지 큐**<br><sub>Message queues</sub> | 생산자가 메시지를 큐에 넣으면 소비자(워커)가 자기 속도로 꺼내 처리해요. 둘은 서로를 기다리지 않아요.<br><sub>Producers drop messages on a queue and consumers (workers) take them at their own pace; neither waits for the other.</sub> | 이메일 발송, 이미지 변환, 결제 후처리처럼 오래 걸리는 일을 뒤로 빼요. RabbitMQ, SQS가 대표적이고 실패 메시지는 DLQ로 보내요.<br><sub>Push slow work like emails, image processing and post-payment tasks to the background; RabbitMQ and SQS are common, with failed messages parked in a DLQ.</sub> |
| **Pub/Sub · 이벤트 스트리밍**<br><sub>Pub/sub and event streaming</sub> | 이벤트를 토픽에 발행하면 여러 구독자가 각자 받아요. Kafka는 이벤트를 로그로 보관하고 구독자마다 읽은 위치(오프셋)를 따로 관리해요.<br><sub>Publish an event to a topic and many subscribers each receive it; Kafka keeps events as a log and tracks each subscriber’s offset separately.</sub> | 주문 이벤트 하나로 이메일·분석·재고가 각자 반응해요. 보관된 로그를 다시 읽어 재처리하거나 새 서비스를 붙일 수 있어요.<br><sub>One order event can drive email, analytics and inventory independently, and the retained log can be replayed for reprocessing or new consumers.</sub> |
| **멱등성과 재시도**<br><sub>Idempotency and retries</sub> | 같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같도록 만드는 성질이에요. 요청마다 고유 키를 붙여 중복을 걸러요.<br><sub>An operation is idempotent if doing it twice has the same effect as doing it once; a unique key per request lets the server drop duplicates.</sub> | 결제·주문 API는 Idempotency-Key 헤더를 받으세요(Stripe 방식). 메시지 소비자도 같은 메시지가 두 번 올 수 있다고 가정하고 처리해요.<br><sub>Payment and order APIs should accept an Idempotency-Key header (as Stripe does); message consumers must assume duplicates.</sub> |
| **사가 패턴**<br><sub>Saga pattern</sub> | 여러 서비스에 걸친 작업을 단계별 로컬 트랜잭션으로 나누고, 중간에 실패하면 앞 단계를 되돌리는 보상 작업을 실행해요.<br><sub>A cross-service operation is split into local transactions; if one fails, compensating actions undo the earlier steps.</sub> | 서비스마다 DB가 따로인 마이크로서비스에서 분산 트랜잭션 대신 써요. 보상 작업도 멱등하게 만들어야 해요.<br><sub>The usual replacement for distributed transactions when each microservice owns its database; compensations must be idempotent too.</sub> |
| **이벤트 소싱**<br><sub>Event sourcing</sub> | 현재 값만 저장하는 대신 일어난 모든 사건(이벤트)을 순서대로 저장하고, 상태는 이벤트를 재생해서 계산해요.<br><sub>Instead of storing only the current value, store every event in order and compute state by replaying them.</sub> | 금융 원장, 감사 기록이 중요한 도메인에 맞아요. 스키마 변경과 재생 비용이 커서 모든 곳에 쓰기보단 필요한 곳에만 써요.<br><sub>Fits ledgers and audit-heavy domains; schema evolution and replay cost make it a targeted tool rather than a default.</sub> |

<a id="di-consensus"></a>

## 일관성과 합의 · Consistency and consensus

여러 대의 컴퓨터가 같은 데이터에 대해 의견을 맞추는 방법이에요.  
*How many machines agree on the same data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **CAP 정리**<br><sub>CAP theorem</sub> | 네트워크 분할(P)이 생기면 일관성(C)과 가용성(A) 중 하나를 포기해야 해요.<br><sub>During a network partition (P), a system must give up either consistency (C) or availability (A).</sub> | 분할은 피할 수 없으니 "장애 때 무엇을 택할까"의 문제예요. 은행 잔액은 CP, 좋아요 수나 피드는 AP가 자연스러워요. 평소의 지연까지 따지는 PACELC도 있어요.<br><sub>Partitions happen, so the real question is what to sacrifice when they do: balances lean CP, likes and feeds lean AP; PACELC adds the everyday latency trade-off.</sub> |
| **강한 일관성 vs 최종 일관성**<br><sub>Strong vs eventual consistency</sub> | 강한 일관성은 쓰기 직후 누가 읽어도 새 값을 보장하고, 최종 일관성은 잠시 옛 값이 보일 수 있지만 결국 같아져요.<br><sub>Strong consistency guarantees every read after a write sees it; eventual consistency may briefly show old data but converges.</sub> | 복제 지연 때문에 "방금 바꿨는데 안 바뀌었어요" 버그가 생겨요. 내가 쓴 데이터는 리더에서 읽는 read-your-writes로 많이 해결해요.<br><sub>Replica lag causes “I just changed it but it didn’t change” bugs; read-your-writes (reading your own data from the leader) fixes most of them.</sub> |
| **쿼럼 (N · W · R)**<br><sub>Quorums (N · W · R)</sub> | 복제본 N개 중 W개에 쓰고 R개에서 읽을 때 W + R > N이면 읽는 집합과 쓰는 집합이 반드시 겹쳐 최신 값을 볼 수 있어요.<br><sub>With N replicas, writing to W and reading from R guarantees an overlap, and so the latest value, when W + R > N.</sub> | Cassandra, DynamoDB에서 일관성 수준을 이 값으로 조절해요. 흔한 설정은 N=3, W=2, R=2예요.<br><sub>Cassandra and DynamoDB expose consistency levels this way; N=3, W=2, R=2 is a common setup.</sub> |
| **Raft 합의 알고리즘**<br><sub>Raft consensus</sub> | 노드들이 리더를 선출하고, 리더가 로그를 팔로워에게 복제해 과반이 저장하면 확정해요. 리더가 죽으면 새로 선거해요.<br><sub>Nodes elect a leader; the leader replicates its log to followers and commits an entry once a majority stores it, holding a new election if it dies.</sub> | etcd(쿠버네티스), Consul, CockroachDB, Kafka KRaft가 Raft를 써요. 과반이 필요해서 노드는 3·5대처럼 홀수로 둬요.<br><sub>Used by etcd (Kubernetes), Consul, CockroachDB and Kafka KRaft; clusters use odd sizes like 3 or 5 because a majority is required.</sub> |
| **2단계 커밋 (2PC)**<br><sub>Two-phase commit</sub> | 코디네이터가 모든 참여자에게 준비를 묻고(1단계), 모두 YES면 커밋, 하나라도 NO면 전부 롤백해요(2단계).<br><sub>A coordinator asks every participant to prepare (phase 1), then commits if all vote yes or rolls everyone back if any vote no (phase 2).</sub> | 하나의 DB 안이나 XA 트랜잭션에서 쓰여요. 코디네이터 장애 때 참여자가 잠긴 채 멈출 수 있어 마이크로서비스에선 사가를 선호해요.<br><sub>Used inside databases and XA transactions; a failed coordinator can leave participants blocked, so microservices prefer sagas.</sub> |
| **논리 시계 (램포트)**<br><sub>Logical clocks (Lamport)</sub> | 서버마다 시계가 어긋나므로, 이벤트마다 카운터를 올리고 메시지를 받으면 max(내 값, 받은 값) + 1로 맞춰 원인-결과 순서를 표현해요.<br><sub>Since machine clocks drift, each process bumps a counter per event and, on receiving a message, sets it to max(local, received) + 1, so causes get smaller numbers than effects.</sub> | 분산 로그 정렬, 충돌 해결의 기초예요. 동시 발생까지 구분하려면 벡터 클록, 실제 시간과 섞으려면 HLC(하이브리드 논리 시계)를 써요.<br><sub>The basis for ordering distributed logs and resolving conflicts; vector clocks detect concurrency and hybrid logical clocks mix in wall time.</sub> |

<a id="di-arch"></a>

## 아키텍처와 장애 대응 · Architecture and resilience

서비스를 나누고 연결하고, 일부가 고장 나도 전체가 버티게 만드는 설계예요.  
*Designs for splitting and connecting services, and for surviving partial failures.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **모놀리스 vs 마이크로서비스**<br><sub>Monolith vs microservices</sub> | 모놀리스는 하나로 빌드·배포하고, 마이크로서비스는 기능별로 나눠 각자 DB와 배포 주기를 가져요.<br><sub>A monolith is built and deployed as one unit; microservices split by capability, each with its own database and release cycle.</sub> | 마이크로서비스는 팀이 독립적으로 움직일 때 효과가 있어요. 작은 팀이라면 경계를 잘 나눈 모듈러 모놀리스가 대부분 더 나아요.<br><sub>Microservices pay off when teams need to move independently; small teams are usually better served by a well-structured modular monolith.</sub> |
| **API 게이트웨이**<br><sub>API gateway</sub> | 외부 요청이 들어오는 단일 입구예요. 인증, 레이트 리밋, 라우팅, 응답 합치기, 로깅 같은 공통 기능을 한곳에서 처리해요.<br><sub>A single entry point for outside traffic that handles cross-cutting concerns: auth, rate limiting, routing, aggregation and logging.</sub> | Kong, AWS API Gateway, Nginx가 대표적이에요. 화면별로 맞춘 게이트웨이(BFF)를 따로 두기도 해요. 비즈니스 로직은 넣지 마세요.<br><sub>Kong, AWS API Gateway and Nginx are common; some teams add a backend-for-frontend per client. Keep business logic out of it.</sub> |
| **REST · GraphQL · gRPC**<br><sub>REST · GraphQL · gRPC</sub> | REST는 자원(URL)마다 요청하고, GraphQL은 필요한 필드를 쿼리 하나로, gRPC는 스키마로 정한 함수를 바이너리로 호출해요.<br><sub>REST requests one resource URL at a time, GraphQL fetches exactly the needed fields in one query, and gRPC calls schema-defined functions over a binary protocol.</sub> | 공개 API는 REST가 무난하고, 화면이 다양한 앱은 GraphQL, 내부 서비스 간 고성능 통신은 gRPC가 잘 맞아요.<br><sub>REST suits public APIs, GraphQL suits apps with many varied screens, and gRPC suits fast service-to-service calls.</sub> |
| **CQRS**<br><sub>CQRS</sub> | 쓰기(명령)와 읽기(조회)를 서로 다른 모델과 저장소로 나눠요. 쓰기 쪽 변경이 이벤트로 읽기 쪽 뷰를 갱신해요.<br><sub>Separates writes (commands) and reads (queries) into different models and stores, with write-side events updating read-side views.</sub> | 읽기가 압도적으로 많거나 화면용 집계가 복잡할 때 유용해요. 읽기 모델이 잠깐 늦을 수 있다는 걸 화면에서 감안해야 해요.<br><sub>Useful when reads dominate or screen-specific aggregates are complex; the UI must tolerate a briefly stale read model.</sub> |
| **서킷 브레이커**<br><sub>Circuit breaker</sub> | 하위 서비스가 계속 실패하면 회로를 열어 호출을 즉시 실패시키고, 잠시 뒤 시험 요청으로 회복을 확인해요.<br><sub>After repeated failures it opens the circuit and fails calls immediately, then probes with a trial request before closing again.</sub> | 느린 서비스 하나가 스레드·커넥션을 다 잡아먹어 전체가 죽는 연쇄 장애를 막아요. Resilience4j, Envoy, 서비스 메시에 들어 있어요.<br><sub>Prevents one slow dependency from exhausting threads and connections and taking everything down; built into Resilience4j, Envoy and service meshes.</sub> |
| **지수 백오프와 지터**<br><sub>Exponential backoff and jitter</sub> | 실패한 요청을 재시도할 때 간격을 1초, 2초, 4초처럼 두 배씩 늘리고, 무작위 값(지터)을 더해 재시도가 한꺼번에 몰리지 않게 해요.<br><sub>Retry failed requests with doubling waits such as 1 s, 2 s, 4 s, plus random jitter so clients don’t retry in lockstep.</sub> | 최대 재시도 횟수와 최대 대기 시간을 꼭 두세요. 멱등하지 않은 요청은 함부로 재시도하면 안 돼요. AWS SDK 등 대부분의 클라이언트에 내장돼 있어요.<br><sub>Always cap attempts and total wait, and never blindly retry non-idempotent requests; most SDKs, AWS included, build this in.</sub> |
| **용량 추정**<br><sub>Back-of-the-envelope estimation</sub> | 사용자 수에서 출발해 초당 요청, 피크, 저장 용량을 어림 계산해 필요한 규모를 잡아요.<br><sub>Start from user counts and roughly derive requests per second, peaks and storage to size the system.</sub> | 시스템 설계 면접과 실제 기획 모두에 써요. 하루 ≈ 10만 초, 피크 ≈ 평균의 2~3배처럼 외워 두면 빨라요.<br><sub>Used in system design interviews and real planning; shortcuts like “a day ≈ 100k seconds” and “peak ≈ 2–3× average” keep it quick.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
