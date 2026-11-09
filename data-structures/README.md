# 자료구조 · Data structures

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/data-structures/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

배열과 연결 리스트부터 스택·큐·해시 테이블, 트리·힙·트라이, B+트리·유니온 파인드·LRU 캐시·블룸 필터까지. 넣고, 찾고, 지우는 과정을 그대로 보여줘요.

From arrays and linked lists to stacks, queues and hash tables, trees, heaps and tries, B+ trees, union-find, LRU caches and Bloom filters, showing exactly how data goes in, gets found and comes out.

**4개 주제 · 20개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [줄지어 담는 자료구조 · Structures that line data up](#ds-lin) (7)
- [키로 바로 찾는 해시 · Finding by key with hashing](#ds-hashing) (4)
- [나뭇가지처럼 뻗는 트리 · Trees that branch out](#ds-tree) (6)
- [관계를 담는 구조와 실무 자료구조 · Relationships and practical structures](#ds-graphs) (3)

<a id="ds-lin"></a>

## 줄지어 담는 자료구조 · Structures that line data up

데이터를 한 줄로 늘어놓는 구조예요. 어디서 넣고 빼느냐가 성능을 결정해요.  
*Structures that lay data out in a line. Where you add and remove decides the performance.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **배열**<br>Array | 같은 크기의 칸을 메모리에 붙여 놓은 구조예요. 번호만 알면 바로 꺼낼 수 있지만, 중간에 넣거나 빼면 뒤를 전부 밀어야 해요.<br><sub>Equal-size slots placed side by side in memory. Any index is reachable instantly, but inserting or deleting in the middle shifts everything after it.</sub> | 읽기가 대부분이고 크기가 거의 안 바뀌는 데이터에 써요. 캐시 친화적이라 실제 성능은 이론보다 더 좋은 경우가 많아요.<br><sub>Use it for read-heavy data whose size rarely changes. It is cache-friendly, so real performance is often better than the theory suggests.</sub> |
| **동적 배열**<br>Dynamic array · Amortized O(1) | 공간이 차면 두 배 크기의 새 배열을 만들고 옮겨 담아요. 가끔 느린 복사가 있어도 평균으로 보면 추가는 O(1)이에요.<br><sub>When full, it allocates an array twice as large and copies everything over. Despite the occasional slow copy, appends are O(1) on average.</sub> | 파이썬 list, 자바 ArrayList, 자바스크립트 Array가 이 구조예요. 넣을 개수를 미리 안다면 처음부터 크기를 잡아 복사를 줄이세요.<br><sub>Python lists, Java ArrayList and JavaScript arrays work this way. If you know the final size, reserve capacity up front to avoid copies.</sub> |
| **연결 리스트**<br>Linked list | 각 노드가 값과 다음 노드의 주소를 들고 있어요. 위치만 알면 화살표만 바꿔 O(1)에 넣고 빼지만, 찾으려면 처음부터 따라가야 해요.<br><sub>Each node holds a value and the address of the next node. Insertion and deletion are O(1) once you are there, but finding a position means walking from the head.</sub> | 앞뒤로 자주 넣고 빼는 큐, LRU 캐시, 운영체제의 작업 목록에 쓰여요. 노드가 흩어져 있어 순회는 배열보다 느려요.<br><sub>Used for queues, LRU caches and OS task lists with frequent insertions and removals. Nodes are scattered in memory, so traversal is slower than an array.</sub> |
| **스택**<br>Stack · LIFO | 마지막에 넣은 것이 가장 먼저 나오는 구조예요. 넣기(push)와 빼기(pop)가 모두 맨 위에서만 일어나요.<br><sub>The last item in is the first out. Push and pop both happen at the top.</sub> | 함수 호출(콜 스택), 실행 취소, 괄호 짝 맞추기, 브라우저 뒤로 가기, DFS가 모두 스택이에요.<br><sub>Function calls (the call stack), undo, bracket matching, the browser back button and DFS are all stacks.</sub> |
| **큐**<br>Queue · FIFO | 먼저 들어온 것이 먼저 나가는 줄 서기 구조예요. 뒤로 넣고(enqueue) 앞에서 빼요(dequeue).<br><sub>First in, first out, like a line of people. Enqueue at the back, dequeue at the front.</sub> | 작업 대기열, 메시지 큐, 프린터 출력, BFS에 써요. 배열로 만들면 앞에서 뺄 때 밀기가 생기니 원형 버퍼나 덱을 쓰세요.<br><sub>Used for job queues, message queues, print spooling and BFS. A plain array shifts on dequeue, so use a ring buffer or deque instead.</sub> |
| **원형 버퍼**<br>Ring buffer | 고정된 칸을 원처럼 이어서, 쓰는 위치와 읽는 위치가 계속 돌아가게 해요. 메모리를 새로 잡지 않고 끝없이 재사용해요.<br><sub>Fixed slots joined into a circle so the read and write positions keep wrapping around, reusing memory forever without new allocations.</sub> | 오디오·네트워크 스트림 버퍼, 최근 N개 로그, 생산자-소비자 큐처럼 크기가 정해진 흐름에 딱 맞아요.<br><sub>Perfect for fixed-size streams: audio and network buffers, the last N log lines and producer-consumer queues.</sub> |
| **자료구조 고르는 법**<br>Choosing a structure | 같은 데이터라도 무엇을 자주 하느냐에 따라 맞는 구조가 달라요. 접근, 찾기, 넣기·빼기 비용을 비교해 고르세요.<br><sub>The right structure depends on which operations you do most. Compare the cost of access, search and insert or delete.</sub> | 면접 단골 질문이자 실무 성능 문제의 대부분이에요. 가장 자주 하는 연산이 O(1)이나 O(log n)이 되는 구조를 고르세요.<br><sub>A classic interview topic and the root of most real performance issues. Pick the structure that makes your most frequent operation O(1) or O(log n).</sub> |

<a id="ds-hashing"></a>

## 키로 바로 찾는 해시 · Finding by key with hashing

키를 숫자로 바꿔 칸 번호로 쓰는 방법이에요. 충돌을 어떻게 처리하느냐가 핵심이에요.  
*Turning keys into numbers used as slot indexes. Handling collisions is the core problem.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **해시 테이블**<br>Hash table | 해시 함수가 키를 칸 번호로 바꿔 줘서, 찾기·넣기·빼기가 평균 O(1)이에요.<br><sub>A hash function turns a key into a slot index, so lookup, insert and delete are O(1) on average.</sub> | 딕셔너리, 맵, 집합, 캐시, 중복 제거 등 실무에서 가장 많이 쓰는 자료구조예요. 순서가 필요하면 정렬된 구조를 따로 쓰세요.<br><sub>Dictionaries, maps, sets, caches and deduplication: the most used structure in practice. If you need order, use a sorted structure alongside.</sub> |
| **충돌과 체이닝**<br>Collision · Chaining | 서로 다른 키가 같은 칸에 들어가는 걸 충돌이라고 해요. 체이닝은 그 칸에 리스트로 이어 붙여 해결해요.<br><sub>A collision is when different keys map to the same slot. Chaining solves it by linking entries into a list in that slot.</sub> | 자바 HashMap은 한 칸에 너무 많이 쌓이면 리스트를 트리로 바꿔요. 칸 대비 원소 비율(적재율)이 높아지면 칸을 늘려 다시 배치해요.<br><sub>Java’s HashMap even turns a long chain into a tree. When the load factor gets high, the table grows and rehashes.</sub> |
| **개방 주소법**<br>Open addressing · Linear probing | 충돌이 나면 정해진 규칙(다음 칸, 제곱 간격 등)으로 빈칸을 찾아 넣어요. 모든 데이터가 배열 안에 있어 캐시에 유리해요.<br><sub>On a collision, it searches for an empty slot by a fixed rule such as the next slot. Everything stays inside the array, which is cache-friendly.</sub> | 파이썬 dict, 고성능 해시맵이 이 방식이에요. 삭제할 때는 빈칸 대신 "삭제됨" 표시를 남겨야 탐색이 끊기지 않아요.<br><sub>Python dicts and high-performance hash maps use it. Deletions leave a tombstone instead of an empty slot so lookups don’t stop early.</sub> |
| **블룸 필터**<br>Bloom filter | 비트 배열과 해시 여러 개로 "확실히 없다" 또는 "있을 수도 있다"를 아주 적은 메모리로 답해요.<br><sub>A bit array plus several hashes answers “definitely not” or “maybe” using very little memory.</sub> | DB가 디스크를 읽기 전에 없는 키를 걸러내거나, 이미 본 URL·스팸을 빠르게 거를 때 써요. 거짓 양성은 있어도 거짓 음성은 없어요.<br><sub>Databases use it to skip disk reads for missing keys, and crawlers to skip seen URLs. It can give false positives but never false negatives.</sub> |

<a id="ds-tree"></a>

## 나뭇가지처럼 뻗는 트리 · Trees that branch out

부모와 자식으로 이어진 계층 구조예요. 높이를 낮게 유지하는 게 성능의 핵심이에요.  
*Hierarchies of parents and children. Keeping the height low is the key to performance.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **이진 탐색 트리**<br>Binary search tree | 왼쪽 자식은 작게, 오른쪽 자식은 크게 둬서 비교할 때마다 절반을 버리며 찾아요.<br><sub>Smaller keys go left and larger keys go right, so each comparison discards half the tree.</sub> | 정렬된 데이터를 자주 넣고 빼면서 찾아야 할 때 써요. 정렬된 순서로 넣으면 한쪽으로 치우쳐 O(n)이 되니 균형 트리를 쓰세요.<br><sub>Use it when you insert, delete and search sorted data often. Inserting already sorted data skews it to O(n), so use a balanced tree.</sub> |
| **트리 순회**<br>Tree traversal | 트리의 모든 노드를 정해진 순서로 방문해요. 전위(자신 먼저), 중위(가운데), 후위(자식 먼저), 레벨 순서(층별)가 있어요.<br><sub>Visiting every node in a set order: pre-order (self first), in-order (middle), post-order (children first) and level order.</sub> | 중위는 정렬 출력, 전위는 트리 복사·직렬화, 후위는 폴더 크기 계산이나 삭제, 레벨 순서는 최단 거리에 써요.<br><sub>In-order prints sorted data, pre-order copies or serializes a tree, post-order computes folder sizes or deletes, and level order finds shortest paths.</sub> |
| **균형 트리와 회전**<br>Balanced trees · Rotation | 한쪽으로 기운 트리를 회전으로 다시 세워 높이를 log n으로 유지해요. AVL 트리와 레드블랙 트리가 대표적이에요.<br><sub>Rotations straighten a lopsided tree so its height stays log n. AVL and red-black trees are the best-known.</sub> | 자바 TreeMap, C++ map, 리눅스 스케줄러가 레드블랙 트리를 써요. 직접 구현할 일은 드물지만 정렬된 맵이 왜 O(log n)인지 알려줘요.<br><sub>Java’s TreeMap, C++ std::map and the Linux scheduler use red-black trees. You rarely implement one, but it explains why sorted maps are O(log n).</sub> |
| **힙 · 우선순위 큐**<br>Heap · Priority queue | 부모가 항상 자식보다 작은(또는 큰) 완전 이진 트리예요. 맨 위에서 최솟값을 바로 꺼낼 수 있고, 배열 하나로 표현돼요.<br><sub>A complete binary tree where every parent is smaller (or larger) than its children. The minimum sits at the top, and the whole tree fits in one array.</sub> | 작업 스케줄러, 다익스트라, 상위 K개 고르기, 타이머 관리에 써요. 전체 정렬이 아니라 "가장 급한 것"만 필요할 때 좋아요.<br><sub>Used for schedulers, Dijkstra, top-K selection and timers, whenever you need the most urgent item rather than full order.</sub> |
| **트라이**<br>Trie · Prefix tree | 문자 하나가 한 단계가 되는 트리예요. 같은 접두사를 공유해서 접두사로 찾기가 아주 빨라요.<br><sub>A tree where each level is one character. Shared prefixes share nodes, so prefix lookups are very fast.</sub> | 검색어 자동 완성, 사전, IP 라우팅 테이블, 맞춤법 검사에 써요. 메모리를 많이 쓰니 압축 트라이(래딕스 트리)도 고려하세요.<br><sub>Used for autocomplete, dictionaries, IP routing tables and spell checking. It is memory-hungry, so consider a compressed radix tree.</sub> |
| **B-트리 · B+트리**<br>B-tree · B+ tree | 한 노드에 키를 여러 개 담아 자식이 많고 높이가 아주 낮은 트리예요. B+트리는 데이터를 리프에만 두고 리프끼리 연결해요.<br><sub>A tree whose nodes hold many keys, so it has many children and very little height. A B+ tree keeps data only in leaves and links the leaves together.</sub> | MySQL·PostgreSQL 인덱스, 파일 시스템의 기본 구조예요. 디스크를 몇 번만 읽고도 수억 건에서 찾을 수 있고, 범위 검색도 빨라요.<br><sub>The core of MySQL and PostgreSQL indexes and file systems. A few disk reads find one row among hundreds of millions, and range scans are fast.</sub> |

<a id="ds-graphs"></a>

## 관계를 담는 구조와 실무 자료구조 · Relationships and practical structures

서로 연결된 관계를 표현하는 법과, 실무에서 자주 만나는 조합형 자료구조예요.  
*How to represent connections, and composite structures you meet in real systems.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **그래프 표현**<br>Graph representation | 정점과 간선을 저장하는 두 방법이에요. 인접 행렬은 연결 여부를 O(1)로 확인하고, 인접 리스트는 공간을 적게 써요.<br><sub>Two ways to store vertices and edges. An adjacency matrix checks a connection in O(1); an adjacency list uses far less space.</sub> | SNS 친구 관계, 지도, 의존성처럼 대부분의 실제 그래프는 간선이 적어서 인접 리스트가 기본이에요.<br><sub>Most real graphs, such as social networks, maps and dependencies, are sparse, so adjacency lists are the default.</sub> |
| **유니온 파인드**<br>Union-find · Disjoint set | 원소들이 어느 그룹에 속하는지 대표 원소로 관리해요. 경로 압축과 랭크 합치기를 쓰면 거의 O(1)이에요.<br><sub>Tracks which group each element belongs to via a representative. With path compression and union by rank it is almost O(1).</sub> | 크루스칼 최소 신장 트리, 네트워크 연결 여부, 이미지의 영역 묶기, 친구 그룹 합치기에 써요.<br><sub>Used in Kruskal’s MST, network connectivity, image region labelling and merging friend groups.</sub> |
| **LRU 캐시**<br>LRU cache | 가장 오래 쓰지 않은 항목부터 내보내는 캐시예요. 해시맵으로 바로 찾고, 이중 연결 리스트로 사용 순서를 관리해요.<br><sub>A cache that evicts the least recently used item first. A hash map finds entries instantly; a doubly linked list keeps the usage order.</sub> | 면접 단골 구현 문제이자 브라우저 캐시, DB 버퍼, CDN의 기본 정책이에요. 자바 LinkedHashMap으로 쉽게 만들 수 있어요.<br><sub>A classic interview problem and the basic policy behind browser caches, database buffers and CDNs. Java’s LinkedHashMap builds one easily.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
