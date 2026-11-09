# 데이터베이스 · Databases

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/databases/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

관계형 모델과 키, SQL JOIN, 인덱스와 B+트리, 정규화, 트랜잭션과 ACID, 격리 수준과 이상 현상, 락과 MVCC, 실행 계획과 N+1 문제, NoSQL, CAP, 복제와 샤딩까지 다뤄요.

The relational model and keys, SQL joins, indexes and B+ trees, normalization, transactions and ACID, isolation levels and anomalies, locking and MVCC, query plans and N+1, NoSQL, CAP, replication and sharding.

**5개 주제 · 18개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [데이터 모델과 설계 · Data models and design](#db-model) (3)
- [SQL 기본기 · SQL essentials](#db-sql) (3)
- [빠르게 찾는 법 · Finding things fast](#db-perf) (3)
- [트랜잭션과 동시성 · Transactions and concurrency](#db-trx) (5)
- [더 많은 데이터와 요청 · More data, more requests](#db-scale) (4)

<a id="db-model"></a>

## 데이터 모델과 설계 · Data models and design

데이터를 어떤 모양의 표로 나눠 담을지 정하는 단계예요.  
*Deciding how data is split into tables.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **테이블 · 키**<br><sub>Tables · Keys</sub> | 관계형 DB는 데이터를 테이블(행과 열)에 담고, 기본 키로 행을 구분하고, 외래 키로 다른 테이블의 행을 가리켜요.<br><sub>A relational database stores data in tables of rows and columns, identifies rows by primary keys and links tables through foreign keys.</sub> | 기본 키는 의미 없는 값(자동 증가, UUID)을 쓰는 게 안전해요. 외래 키 제약은 잘못된 참조를 DB 차원에서 막아 줘요.<br><sub>Prefer meaningless primary keys (auto-increment, UUID). Foreign key constraints stop bad references at the database level.</sub> |
| **정규화**<br><sub>Normalization</sub> | 같은 정보가 여러 곳에 반복되지 않도록 테이블을 쪼개는 과정이에요. 반복이 있으면 일부만 고쳐서 데이터가 어긋나요.<br><sub>Splitting tables so the same fact is not repeated; repetition lets copies drift apart when only some are updated.</sub> | 기본은 3정규형까지 맞추고, 조회가 너무 느린 곳만 일부러 합쳐요(역정규화). 이때는 동기화 책임이 생겨요.<br><sub>Aim for third normal form, then denormalize deliberately only where reads are too slow, accepting the job of keeping copies in sync.</sub> |
| **ER 모델 · 관계**<br><sub>ER model · Relationships</sub> | 엔티티(학생, 과목)와 관계(1:1, 1:N, N:M)를 그림으로 설계해요. N:M 관계는 연결 테이블로 풀어요.<br><sub>Model entities (students, courses) and relationships (1:1, 1:N, N:M) as a diagram; N:M becomes a join table.</sub> | 설계 리뷰 때 ERD를 그려 보면 빠진 관계나 중복을 일찍 찾아요. 연결 테이블에는 관계 자체의 속성(수강일, 성적)을 담아요.<br><sub>Drawing an ERD in design reviews catches missing or duplicate relations early. Join tables can hold attributes of the relationship itself.</sub> |

<a id="db-sql"></a>

## SQL 기본기 · SQL essentials

데이터를 꺼내고 합치고 요약하는 질의 언어예요.  
*The query language for fetching, combining and summarizing data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **SELECT 실행 순서**<br><sub>SELECT execution order</sub> | SQL은 SELECT부터 쓰지만 실제로는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT 순서로 실행돼요.<br><sub>SQL is written starting with SELECT, but it runs FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.</sub> | WHERE에서 SELECT의 별칭을 못 쓰는 이유, HAVING과 WHERE의 차이가 모두 이 순서로 설명돼요. 행을 일찍 줄일수록 빨라요.<br><sub>This order explains why WHERE cannot use SELECT aliases and how HAVING differs from WHERE. Filtering rows early is faster.</sub> |
| **조인**<br><sub>JOIN</sub> | 두 테이블에서 키가 같은 행끼리 짝지어 하나의 결과로 합쳐요. INNER는 짝이 있는 것만, LEFT는 왼쪽을 모두 남겨요.<br><sub>Combines two tables by pairing rows with matching keys. INNER keeps only matches; LEFT keeps every left row.</sub> | LEFT JOIN 뒤에 WHERE로 오른쪽 열을 거르면 INNER JOIN처럼 돼 버려요. 조인 키에는 인덱스를 꼭 거세요.<br><sub>Filtering right-side columns in WHERE after a LEFT JOIN silently turns it into an INNER JOIN. Always index join keys.</sub> |
| **GROUP BY · 집계**<br><sub>GROUP BY · Aggregates</sub> | 같은 값을 가진 행을 묶어 COUNT, SUM, AVG 같은 집계로 한 줄씩 요약해요. 묶은 뒤의 조건은 HAVING으로 걸러요.<br><sub>Groups rows with the same value and summarizes each group with aggregates like COUNT, SUM and AVG; HAVING filters groups.</sub> | 대시보드·리포트 쿼리의 대부분이 이것이에요. 큰 테이블에선 미리 집계한 테이블이나 머티리얼라이즈드 뷰를 써요.<br><sub>Most dashboard and report queries are this. On big tables, use pre-aggregated tables or materialized views.</sub> |

<a id="db-perf"></a>

## 빠르게 찾는 법 · Finding things fast

느린 쿼리의 대부분은 인덱스와 쿼리 패턴 문제예요.  
*Most slow queries come down to indexes and query patterns.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **인덱스 (B+트리)**<br><sub>Index · B+ tree</sub> | 인덱스는 컬럼 값을 정렬해 둔 트리라서, 전체를 읽지 않고 몇 단계 만에 원하는 행을 찾아요.<br><sub>An index is a sorted tree of column values, so the right row is found in a few steps instead of reading everything.</sub> | EXPLAIN으로 인덱스를 타는지 확인하세요. 인덱스는 쓰기를 느리게 하고 공간을 차지하니 자주 쓰는 조건에만 만들어요.<br><sub>Check with EXPLAIN that queries use it. Indexes slow writes and take space, so add them only for frequent conditions.</sub> |
| **복합 인덱스**<br><sub>Composite index</sub> | 여러 컬럼을 묶은 인덱스는 앞 컬럼 순서대로 정렬돼요. 그래서 앞 컬럼 없이 뒤 컬럼만으로는 인덱스를 쓰기 어려워요.<br><sub>A multi-column index is sorted by its first column, then the next, so it rarely helps a query on a later column alone.</sub> | (last, first) 인덱스는 last 조건, last+first 조건에 쓰이지만 first만으로는 못 써요. 컬럼 순서가 성능을 좌우해요.<br><sub>An index on (last, first) serves “last” and “last + first” queries, but not “first” alone. Column order decides performance.</sub> |
| **N+1 쿼리**<br><sub>N+1 queries</sub> | 목록을 1번 가져온 뒤, 항목마다 관련 데이터를 따로 조회해서 쿼리가 1+N번 나가는 문제예요.<br><sub>Fetching a list once and then querying related data separately for every item: 1 + N queries.</sub> | ORM의 지연 로딩에서 흔해요. 개발 땐 데이터가 적어 모르다가 운영에서 터져요. JOIN, IN 절, fetch join, DataLoader로 묶으세요.<br><sub>Common with ORM lazy loading; invisible with little dev data, painful in production. Batch with JOINs, IN clauses, fetch joins or DataLoader.</sub> |

<a id="db-trx"></a>

## 트랜잭션과 동시성 · Transactions and concurrency

여러 작업을 하나로 묶고, 동시에 일어나는 요청을 안전하게 처리해요.  
*Grouping work into one unit and handling concurrent requests safely.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **ACID**<br><sub>ACID</sub> | 트랜잭션은 원자성, 일관성, 격리성, 지속성을 보장해요. 돈·재고처럼 틀리면 안 되는 데이터의 기본이에요.<br><sub>Transactions guarantee atomicity, consistency, isolation and durability: the baseline for money, stock and anything that must be right.</sub> | 분산 시스템이나 NoSQL은 성능과 확장을 위해 일부를 완화하기도 해요(BASE). 무엇을 포기했는지 알고 써야 해요.<br><sub>Distributed stores and NoSQL may relax some of these (BASE) for scale. Know what was traded away.</sub> |
| **커밋과 롤백**<br><sub>Commit · Rollback</sub> | BEGIN으로 시작한 변경은 COMMIT해야 확정되고, 중간에 실패하면 ROLLBACK으로 모두 되돌려요.<br><sub>Changes after BEGIN become permanent only on COMMIT; if anything fails, ROLLBACK undoes them all.</sub> | 트랜잭션 안에서 외부 API 호출처럼 오래 걸리는 일을 하면 잠금이 길어져요. 트랜잭션은 짧게 유지하세요.<br><sub>Slow work inside a transaction, like external API calls, holds locks for long. Keep transactions short.</sub> |
| **격리 수준**<br><sub>Isolation levels</sub> | 동시에 실행되는 트랜잭션이 서로의 변경을 얼마나 볼 수 있는지 정하는 단계예요. 높을수록 안전하지만 느려요.<br><sub>How much concurrent transactions can see of each other’s changes; higher levels are safer but slower.</sub> | 재고 차감처럼 경합이 있는 곳은 SELECT … FOR UPDATE나 낙관적 락(버전 컬럼)을 함께 써요.<br><sub>For contended updates like stock counts, add SELECT … FOR UPDATE or optimistic locking with a version column.</sub> |
| **MVCC**<br><sub>MVCC · Multiversion concurrency</sub> | 값을 덮어쓰지 않고 새 버전을 만들어, 읽는 트랜잭션은 시작 시점의 스냅숏을 보게 해요. 읽기와 쓰기가 서로를 막지 않아요.<br><sub>Instead of overwriting, writes create new versions and readers see the snapshot from when they started, so reads and writes don’t block each other.</sub> | PostgreSQL, MySQL InnoDB, Oracle이 모두 써요. 오래 열린 트랜잭션은 옛 버전 정리를 막아 테이블이 부풀어요.<br><sub>PostgreSQL, InnoDB and Oracle all use it. A long-open transaction blocks cleanup of old versions and bloats tables.</sub> |
| **WAL · 로그 선행 기록**<br><sub>Write-ahead logging</sub> | 데이터 파일을 고치기 전에 변경 내용을 로그에 먼저 순서대로 기록해요. 서버가 죽어도 로그를 다시 실행해 복구해요.<br><sub>Every change is appended to a log before data files are touched; after a crash the log is replayed to recover.</sub> | 순차 쓰기라 빠르고, 복제·특정 시점 복구(PITR)·CDC도 이 로그를 써요. 디스크 fsync 설정이 지속성을 좌우해요.<br><sub>Sequential writes are fast, and replication, point-in-time recovery and CDC all reuse the log. fsync settings decide real durability.</sub> |

<a id="db-scale"></a>

## 더 많은 데이터와 요청 · More data, more requests

한 대로 감당이 안 될 때 쓰는 방법들이에요.  
*What to do when one machine is not enough.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **복제**<br><sub>Replication</sub> | 주 서버의 변경 로그를 복제본에 보내 같은 데이터를 유지해요. 읽기를 나누고, 장애 때 복제본을 승격해요.<br><sub>The primary streams its change log to replicas so they hold the same data; reads are spread out and a replica takes over on failure.</sub> | 비동기 복제는 지연이 있어서 방금 쓴 데이터를 복제본에서 못 읽을 수 있어요. 중요한 읽기는 주 서버로 보내세요.<br><sub>Asynchronous replication lags, so a replica may miss what you just wrote. Send critical reads to the primary.</sub> |
| **샤딩**<br><sub>Sharding</sub> | 데이터를 키 기준으로 나눠 여러 DB 서버에 나눠 담아요. 한 대의 용량과 쓰기 한계를 넘어설 수 있어요.<br><sub>Data is split by key across several database servers to go beyond one machine’s capacity and write limits.</sub> | 샤드 키를 잘못 고르면 한쪽에 몰려요(핫스팟). 샤드 간 조인이 어려워서 최후의 수단으로 쓰고, 먼저 복제·캐시·파티셔닝을 검토하세요.<br><sub>A bad shard key creates hotspots, and cross-shard joins are hard, so treat it as a last resort after replicas, caching and partitioning.</sub> |
| **NoSQL 종류**<br><sub>NoSQL families</sub> | 키-값, 문서, 와이드 컬럼, 그래프처럼 표가 아닌 모양으로 데이터를 저장하는 DB들이에요.<br><sub>Databases that store data in shapes other than tables: key-value, document, wide-column and graph.</sub> | 접근 패턴이 단순하고 규모가 크면 NoSQL이 유리하고, 관계와 트랜잭션이 중요하면 관계형이 유리해요. 둘을 함께 쓰는 경우가 많아요.<br><sub>NoSQL suits simple access patterns at large scale; relational suits rich relations and transactions. Many systems use both.</sub> |
| **캐시 (캐시 어사이드)**<br><sub>Caching · Cache-aside</sub> | 자주 읽는 데이터를 메모리 캐시(Redis 등)에 두고, 없을 때만 DB에서 읽어 채워요.<br><sub>Keep frequently read data in an in-memory cache such as Redis, and read from the database only on a miss.</sub> | 캐시 무효화가 가장 어려워요. TTL을 두고, 데이터가 바뀌면 캐시를 지우세요. 인기 키가 동시에 만료되면 DB가 몰려 죽는 캐시 스탬피드도 조심해요.<br><sub>Invalidation is the hard part: set TTLs and delete on change. Beware stampedes when a hot key expires and everyone hits the database.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
