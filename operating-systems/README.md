# 운영체제 · Operating systems

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/operating-systems/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

프로세스와 스레드, 문맥 교환, 시스템 콜, CPU 스케줄링과 리눅스 CFS, 우선순위 역전, 경쟁 상태와 뮤텍스·세마포어, 교착 상태와 은행원 알고리즘, 식사하는 철학자, 가상 메모리와 다단계 페이지 테이블, TLB, 페이지 교체, 스래싱, 파일 시스템과 저널링, 인터럽트와 I/O, 컨테이너까지 다뤄요.

Processes and threads, context switches, system calls, CPU scheduling and Linux CFS, priority inversion, race conditions, mutexes and semaphores, deadlock and the banker’s algorithm, the dining philosophers, virtual memory and multilevel page tables, the TLB, page replacement, thrashing, file systems and journaling, interrupts and I/O, and containers.

**5개 주제 · 30개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [프로세스와 스레드 · Processes and threads](#os-proc) (6)
- [CPU 스케줄링 · CPU scheduling](#os-sched) (5)
- [동기화와 교착 상태 · Synchronization and deadlock](#os-sync) (7)
- [메모리 관리 · Memory management](#os-mem) (7)
- [파일, 입출력, 가상화 · Files, I/O and virtualization](#os-file) (5)

<a id="os-proc"></a>

## 프로세스와 스레드 · Processes and threads

운영체제가 프로그램을 실행하고 나누어 관리하는 단위예요.  
*The units an operating system uses to run and separate programs.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **프로세스 상태**<br><sub>Process states</sub> | 프로세스는 생성 → 준비 → 실행 → (대기) → 종료 상태를 오가요. 실행 중이던 프로세스도 시간이 다 되거나 I/O를 기다리면 CPU를 내놓아요.<br><sub>A process moves between new, ready, running, waiting and exit. A running process gives up the CPU when its time runs out or it waits for I/O.</sub> | 서버가 느릴 때 CPU를 쓰는 중(실행)인지, I/O를 기다리는 중(대기)인지 구분하는 것이 성능 분석의 첫걸음이에요. top의 R/S/D 상태가 이것이에요.<br><sub>When a server is slow, first tell whether it is busy computing (running) or waiting on I/O (blocked). The R/S/D states in top are exactly these.</sub> |
| **프로세스 vs 스레드**<br><sub>Process vs thread</sub> | 프로세스는 독립된 메모리를 가진 실행 단위이고, 스레드는 한 프로세스 안에서 메모리를 공유하며 따로 실행되는 흐름이에요.<br><sub>A process is an execution unit with its own memory; threads are separate flows of execution that share one process’s memory.</sub> | 스레드는 만들고 전환하기 가볍지만 공유 데이터 때문에 동기화 버그가 생겨요. 크롬이 탭마다 프로세스를 쓰는 건 한 탭이 죽어도 나머지를 지키기 위해서예요.<br><sub>Threads are cheap to create and switch but shared data invites synchronization bugs. Chrome uses a process per tab so one crash cannot take down the rest.</sub> |
| **메모리 구조**<br><sub>Process memory layout</sub> | 프로세스의 메모리는 코드, 데이터(전역 변수), 힙(동적 할당), 스택(함수 호출) 영역으로 나뉘어요.<br><sub>A process’s memory is split into code, data (globals), heap (dynamic allocation) and stack (function calls).</sub> | 재귀가 너무 깊으면 스택 오버플로, 할당한 힙을 안 풀면 메모리 누수가 생겨요. GC 언어도 힙을 관리하는 방식만 다를 뿐 구조는 같아요.<br><sub>Deep recursion overflows the stack; heap memory never freed leaks. Garbage-collected languages manage the heap differently but use the same layout.</sub> |
| **컨텍스트 스위칭**<br><sub>Context switch</sub> | CPU가 다른 프로세스로 넘어갈 때 지금 프로세스의 레지스터 상태를 PCB에 저장하고, 다음 프로세스의 상태를 불러와요.<br><sub>To switch to another process, the CPU saves the current registers to its PCB and loads the next process’s state.</sub> | 전환 자체는 일을 하지 않는 비용이라 스레드가 너무 많으면 오히려 느려져요. 스레드 풀 크기를 코어 수에 맞추는 이유예요.<br><sub>Switching does no useful work, so too many threads slow things down. That is why thread pools are sized to the core count.</sub> |
| **시스템 콜**<br><sub>System call</sub> | 앱이 파일·네트워크·메모리 같은 자원을 쓰려면 시스템 콜로 커널 모드에 들어가 운영체제에게 대신 해 달라고 요청해요.<br><sub>To use files, the network or memory, an app enters kernel mode through a system call and asks the OS to do it.</sub> | 모드 전환은 비싸서, 작은 read/write를 여러 번 하는 대신 버퍼에 모아 한 번에 해요. strace로 프로그램의 시스템 콜을 볼 수 있어요.<br><sub>Mode switches are expensive, so many small reads and writes are buffered into one. strace shows a program’s system calls.</sub> |
| **프로세스 간 통신**<br><sub>IPC</sub> | 프로세스는 메모리가 분리되어 있어서 파이프, 소켓, 메시지 큐, 공유 메모리 같은 방법으로 데이터를 주고받아요.<br><sub>Processes have separate memory, so they exchange data through pipes, sockets, message queues or shared memory.</sub> | 셸의 \| (파이프), 도커 컨테이너 간 소켓, Redis 같은 메시지 브로커가 모두 IPC의 확장이에요.<br><sub>The shell’s \| pipe, sockets between containers and message brokers like Redis all extend IPC.</sub> |

<a id="os-sched"></a>

## CPU 스케줄링 · CPU scheduling

CPU 하나를 여러 프로세스가 나눠 쓰는 순서를 정하는 방법이에요. 막대는 시간 축 위의 실행 구간이에요.  
*How processes take turns on the CPU. Bars show who runs when.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **FCFS와 SJF**<br><sub>FCFS vs SJF</sub> | FCFS는 먼저 온 순서대로, SJF는 실행 시간이 짧은 작업부터 처리해요.<br><sub>FCFS serves jobs in arrival order; SJF runs the shortest job first.</sub> | 긴 작업 하나가 앞을 막으면 모두가 기다리는 현상(호위 효과)은 API 서버의 느린 요청 하나가 큐 전체를 막는 것과 같아요. 느린 작업을 별도 큐로 분리하세요.<br><sub>One long job blocking everyone (the convoy effect) is the same as one slow request clogging an API queue. Put slow work in its own queue.</sub> |
| **라운드 로빈**<br><sub>Round robin</sub> | 모든 프로세스가 정해진 시간(타임 퀀텀)씩 돌아가며 CPU를 써요. 시간이 끝나면 준비 큐 맨 뒤로 가요.<br><sub>Each process gets the CPU for a fixed time slice (quantum) in turn, then goes to the back of the ready queue.</sub> | 응답 시간이 고르게 짧아 대화형 시스템에 맞아요. 퀀텀이 너무 작으면 전환 비용이 커지고, 너무 크면 FCFS와 같아져요.<br><sub>Response times are evenly short, which suits interactive systems. Too small a quantum adds switching cost; too large becomes FCFS.</sub> |
| **다단계 피드백 큐**<br><sub>Multilevel feedback queue</sub> | 우선순위가 다른 여러 큐를 두고, CPU를 오래 쓰는 작업은 아래 큐로 내리고 금방 양보하는 작업은 위에 남겨요.<br><sub>Several queues of different priority: jobs that use lots of CPU sink, while jobs that yield quickly stay on top.</sub> | 실행 시간을 몰라도 대화형 작업을 빠르게 처리해요. 리눅스 CFS, 윈도우 스케줄러가 비슷한 아이디어를 써요. 아래 큐의 기아는 주기적인 우선순위 상승으로 막아요.<br><sub>It keeps interactive work snappy without knowing job lengths. Linux CFS and the Windows scheduler use similar ideas; periodic boosts stop starvation.</sub> |
| **리눅스 CFS 스케줄러**<br><sub>The Linux CFS scheduler</sub> | 각 작업이 실제로 CPU를 쓴 시간(가상 실행 시간)을 재고, 가장 덜 실행된 작업부터 돌려 모두에게 공평하게 나눠 주는 스케줄러예요.<br><sub>A scheduler that tracks how much CPU each task has used (virtual runtime) and always runs the least-run task, sharing the CPU fairly.</sub> | 작업들은 vruntime 순으로 레드-블랙 트리에 정렬되고, 맨 왼쪽(가장 작은 vruntime) 작업이 실행돼요. 실행하면 vruntime이 늘어 오른쪽으로 가고 다음 작업이 앞으로 나와요. nice 값은 가중치가 되어 우선순위가 높을수록 vruntime이 천천히 늘고, 잠들었다 깬 대화형 작업은 작은 vruntime으로 들어와 곧바로 실행돼 반응성이 좋아요. 리눅스 6.6부터는 EEVDF가 CFS를 대체했어요.<br><sub>Tasks sit in a red-black tree ordered by vruntime, and the leftmost (smallest vruntime) runs. Running increases its vruntime, moving it right so the next task comes forward. Nice values become weights, so higher-priority tasks accumulate vruntime more slowly, and interactive tasks waking from sleep rejoin with a small vruntime and run promptly. Since Linux 6.6, EEVDF has replaced CFS.</sub> |
| **우선순위 역전**<br><sub>Priority inversion</sub> | 낮은 우선순위 작업이 쥔 락 때문에 높은 우선순위 작업이 기다리는 사이, 중간 작업이 끼어들어 높은 작업을 더 오래 막는 현상이에요.<br><sub>A high-priority task waiting on a lock held by a low-priority task gets delayed further when a medium task preempts the low one.</sub> | L이 락을 잡은 상태에서 H가 같은 락을 기다리는데, 락과 무관한 M이 L을 밀어내면 H는 M이 끝날 때까지 사실상 막혀요. 1997년 화성 탐사선 패스파인더가 이 문제로 계속 재부팅했고, 우선순위 상속을 원격으로 켜서 해결했어요. 우선순위 상속은 락을 쥔 동안 L에게 H의 우선순위를 빌려주고, 우선순위 상한 프로토콜은 락마다 상한을 정해요. 리눅스 rt\_mutex가 상속을 지원해요.<br><sub>L holds a lock that H needs; when M, which doesn’t need the lock, preempts L, H is effectively blocked until M finishes. In 1997 Mars Pathfinder kept rebooting from this until engineers remotely enabled priority inheritance. Inheritance lends H’s priority to L while it holds the lock; the priority ceiling protocol gives each lock a ceiling. Linux rt\_mutex supports inheritance.</sub> |

<a id="os-sync"></a>

## 동기화와 교착 상태 · Synchronization and deadlock

여러 스레드가 같은 데이터를 건드릴 때 생기는 문제와 해결 도구예요.  
*What goes wrong when threads share data, and the tools that fix it.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **경쟁 상태**<br><sub>Race condition</sub> | 두 스레드가 같은 값을 동시에 읽고 고치면 실행 순서에 따라 결과가 달라지고, 업데이트 하나가 사라질 수 있어요.<br><sub>When two threads read and modify the same value at once, the result depends on timing and an update can be lost.</sub> | count++도 읽기·더하기·쓰기 세 단계라 안전하지 않아요. 재고 차감, 좋아요 수 같은 곳에서 자주 터지고 재현이 어려워요. 원자적 연산이나 락을 쓰세요.<br><sub>Even count++ is read, add, write. It bites stock counters and like counts and is hard to reproduce. Use atomic operations or locks.</sub> |
| **뮤텍스**<br><sub>Mutex</sub> | 임계 구역에 한 번에 한 스레드만 들어가도록 잠금(lock)을 걸고, 끝나면 풀어요(unlock).<br><sub>A lock lets only one thread into the critical section at a time; it is released afterwards.</sub> | 잠금 구간은 최대한 짧게 하고 예외가 나도 반드시 풀리게 try-finally나 with 문을 쓰세요. 분산 환경에선 Redis 분산 락 등을 써요.<br><sub>Keep locked sections short and make sure they unlock even on errors (try/finally, with). Distributed systems use things like Redis locks.</sub> |
| **세마포어**<br><sub>Semaphore</sub> | 남은 자원 개수를 세는 카운터로, 정해진 수만큼만 동시에 들어갈 수 있게 해요. wait()로 줄이고 signal()로 늘려요.<br><sub>A counter of free resources that lets only a set number in at once: wait() decrements, signal() increments.</sub> | DB 커넥션 풀, 동시 다운로드 개수 제한, API 동시 호출 수 제한에 써요. 개수가 1이면 뮤텍스와 같아요.<br><sub>Used for DB connection pools and capping concurrent downloads or API calls. With a count of 1 it acts like a mutex.</sub> |
| **생산자-소비자**<br><sub>Producer–consumer</sub> | 한쪽은 버퍼에 데이터를 넣고 다른 쪽은 꺼내요. 버퍼가 가득 차면 생산자가, 비면 소비자가 기다려요.<br><sub>One side puts data into a buffer and the other takes it out; producers wait when it is full, consumers when it is empty.</sub> | 로그 수집, 작업 큐, 카프카 같은 메시지 큐가 모두 이 구조예요. 속도가 다른 두 시스템 사이에서 완충 역할을 해요.<br><sub>Log pipelines, job queues and message queues like Kafka all use this shape to buffer between systems running at different speeds.</sub> |
| **교착 상태**<br><sub>Deadlock</sub> | 둘 이상의 프로세스가 서로가 가진 자원을 기다리며 영원히 멈춘 상태예요. 상호 배제, 점유 대기, 비선점, 순환 대기가 모두 성립할 때 생겨요.<br><sub>Two or more processes wait forever for resources the others hold. It needs mutual exclusion, hold-and-wait, no preemption and circular wait.</sub> | DB 트랜잭션이 서로의 행을 잠그며 자주 생겨요. 잠그는 순서를 통일하고, 타임아웃을 두는 것이 실무 해법이에요.<br><sub>Common when database transactions lock each other’s rows. In practice: lock in a consistent order and use timeouts.</sub> |
| **은행원 알고리즘**<br><sub>The banker’s algorithm</sub> | 자원을 내줘도 모든 프로세스가 끝날 수 있는 순서(안전 순서)가 남는지 미리 확인해, 교착이 생길 수 있는 상태를 아예 피하는 방법이에요.<br><sub>Avoid deadlock by granting a request only if an order in which every process can finish (a safe sequence) still exists.</sub> | 자원 12개 중 P0, P1, P2가 각각 5, 2, 2개를 쓰고 최대 10, 4, 9개가 필요하면 Available은 3이에요. Need ≤ Available인 P1 → P0 → P2 순서로 끝내며 자원을 돌려받을 수 있으니 안전 상태예요. 이때 P2가 1개를 더 요청하면, 줬다고 가정하고 다시 확인해 P1 다음에 막히므로 불안전 → 거절해요. 최대 필요량을 미리 알아야 해서 범용 OS에선 드물고, 교착 대처는 예방·회피·탐지 후 회복·무시로 나뉘어요.<br><sub>With 12 units, where P0, P1 and P2 hold 5, 2 and 2 and may need up to 10, 4 and 9, Available is 3. Finishing P1 → P0 → P2, each with Need ≤ Available, reclaims everything, so the state is safe. If P2 then asks for one more, pretend to grant it and re-check: after P1 everyone is stuck, so the state is unsafe and the request waits. Needing maximum demands up front makes it rare in general-purpose OSes; deadlock strategies are prevention, avoidance, detection and recovery, or ignoring it.</sub> |
| **식사하는 철학자 문제**<br><sub>The dining philosophers</sub> | 원탁의 철학자 다섯 명이 사이사이 놓인 포크 다섯 개 중 양옆 두 개를 잡아야 식사할 수 있는, 교착과 기아를 보여 주는 고전 문제예요.<br><sub>Five philosophers around a table must each grab the two forks beside them to eat: the classic illustration of deadlock and starvation.</sub> | 모두 동시에 왼쪽 포크를 잡으면 전원이 오른쪽 포크를 기다리는 원형 대기로 교착이 생겨요. 한 명(P4)만 오른쪽부터 잡게 하면 원이 끊겨 누군가는 먹을 수 있어요. 자원에 번호를 매겨 작은 번호부터 잡기, 앉는 인원을 4명으로 제한하기(세마포어), 못 잡으면 내려놓고 재시도(라이브락 주의)도 해법이에요. 여러 락을 항상 같은 순서로 잡는 실무 규칙의 근거예요.<br><sub>If everyone grabs their left fork at once, all wait for the right one in a circular wait: deadlock. Making just one philosopher (P4) take the right fork first breaks the cycle so someone can eat. Other fixes are numbering resources and locking the lower number first, seating at most four at a time (a semaphore), or releasing and retrying (beware livelock). It underpins the rule of always acquiring multiple locks in one global order.</sub> |

<a id="os-mem"></a>

## 메모리 관리 · Memory management

한정된 물리 메모리를 여러 프로세스에게 안전하게 나눠 주는 방법이에요.  
*How limited physical memory is shared safely among processes.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **페이징과 가상 메모리**<br><sub>Paging · Virtual memory</sub> | 메모리를 같은 크기의 페이지로 나누고, 페이지 테이블로 가상 주소를 물리 주소로 바꿔요. 프로그램은 자기만의 넓은 메모리를 쓰는 것처럼 느껴요.<br><sub>Memory is cut into equal pages and a page table maps virtual addresses to physical ones, so each program sees its own large memory.</sub> | 프로세스끼리 메모리가 격리되고, 실제 메모리보다 큰 프로그램도 돌릴 수 있어요. 컨테이너 메모리 제한, OOM도 이 위에서 동작해요.<br><sub>It isolates processes and lets programs exceed physical RAM. Container memory limits and the OOM killer sit on top of it.</sub> |
| **TLB**<br><sub>TLB · Translation lookaside buffer</sub> | 최근에 쓴 주소 변환 결과를 저장해 두는 CPU 안의 작은 캐시예요. 히트하면 페이지 테이블을 읽지 않아도 돼요.<br><sub>A small cache inside the CPU holding recent address translations. On a hit the page table is not read at all.</sub> | 거대한 메모리를 쓰는 DB는 2MB 이상 큰 페이지(Huge Pages)를 써서 TLB 미스를 줄여요.<br><sub>Databases with huge memory use 2 MB+ huge pages to cut TLB misses.</sub> |
| **페이지 폴트**<br><sub>Page fault</sub> | 접근한 페이지가 메모리에 없으면 운영체제가 디스크에서 읽어와 빈 프레임에 올린 뒤 명령을 다시 실행해요.<br><sub>If a page is not in memory, the OS loads it from disk into a free frame and retries the instruction.</sub> | 메모리가 부족해 폴트가 계속 나면 일보다 디스크 교체만 하는 스래싱이 생겨요. 서버가 갑자기 느려지면 스왑 사용량을 확인하세요.<br><sub>With too little memory, constant faults cause thrashing: all swapping, no work. When a server suddenly slows, check swap usage.</sub> |
| **페이지 교체 (LRU)**<br><sub>Page replacement · LRU</sub> | 메모리가 꽉 찼을 때 어떤 페이지를 내보낼지 정해요. LRU는 가장 오랫동안 쓰이지 않은 페이지를 내보내요.<br><sub>Decides which page to evict when memory is full. LRU evicts the page unused for the longest time.</sub> | 최근에 쓴 것을 곧 다시 쓴다는 지역성 덕분에 잘 맞아요. 캐시 서버의 eviction 정책(LRU, LFU)도 같은 문제예요.<br><sub>It works because recently used data tends to be reused soon. Cache servers face the same choice in their eviction policies (LRU, LFU).</sub> |
| **단편화**<br><sub>Fragmentation</sub> | 메모리를 할당하고 해제하다 보면 작은 빈 공간이 흩어져, 합은 충분한데 큰 덩어리를 못 넣게 돼요(외부 단편화).<br><sub>Repeated allocation and freeing scatter small holes: enough free memory in total, but no single block big enough (external fragmentation).</sub> | 페이징은 고정 크기 조각을 써서 외부 단편화를 없애지만, 페이지 안의 남는 공간(내부 단편화)이 생겨요. 메모리 할당기(jemalloc 등)가 이 문제와 싸워요.<br><sub>Paging removes external fragmentation with fixed-size pieces but wastes space inside pages (internal fragmentation). Allocators like jemalloc fight this.</sub> |
| **다단계 페이지 테이블**<br><sub>Multilevel page tables</sub> | 가상 주소를 여러 인덱스로 나눠 단계별로 찾아가게 해, 실제로 쓰는 영역의 테이블만 만들어 메모리를 아끼는 구조예요.<br><sub>Splitting a virtual address into several indexes walked level by level, so tables exist only for regions actually in use.</sub> | 32비트·4 KB 페이지에서 한 단계 테이블은 2²⁰개 항목 × 4 B = 프로세스마다 4 MB이고 대부분 비어 있어요. 주소를 dir 10 · table 10 · offset 12비트로 나누면 바깥 테이블에서 안쪽 테이블을 찾고, 다시 프레임을 찾아 offset을 붙여 물리 주소를 만들어요. 안쪽 테이블은 필요할 때만 생기고, x86-64는 9·9·9·9·12비트의 4단계라 TLB 미스 때 메모리를 4번 읽어서 TLB와 huge page가 중요해요.<br><sub>With 32-bit addresses and 4 KB pages, a flat table holds 2²⁰ entries × 4 B = 4 MB per process, mostly empty. Splitting the address into dir 10 · table 10 · offset 12 bits, the outer table points to an inner table, which gives the frame, and the offset completes the physical address. Inner tables are created on demand; x86-64 uses four levels (9·9·9·9·12 bits), so a TLB miss costs four memory reads, which is why TLBs and huge pages matter.</sub> |
| **스래싱과 워킹 셋**<br><sub>Thrashing and the working set</sub> | 메모리가 모자라 페이지를 끝없이 내보내고 들여오느라 CPU가 실제 일을 거의 못 하는 상태가 스래싱이에요.<br><sub>Thrashing is when memory is so short that the system spends its time paging pages in and out instead of doing work.</sub> | 동시에 돌리는 프로세스를 늘리면 처음엔 CPU 사용률이 오르다가, 어느 순간 페이지 폴트 처리에 시간을 다 써 급락해요. 워킹 셋은 최근 Δ번 참조한 페이지 집합으로, 모든 프로세스의 워킹 셋 합이 실제 프레임보다 크면 스래싱이 일어나요. 프로세스를 줄이거나(스왑 아웃) 메모리를 늘리고, 페이지 폴트 빈도를 감시해 조절해요. 요즘은 cgroup 메모리 제한과 OOM killer가 개입해요.<br><sub>Adding processes raises CPU utilization at first, then it collapses as page-fault handling consumes all the time. The working set is the pages referenced in the last Δ references; when the sum of working sets exceeds physical frames, thrashing follows. Run fewer processes (swap some out), add memory, or control page-fault frequency. Today cgroup memory limits and the OOM killer step in.</sub> |

<a id="os-file"></a>

## 파일, 입출력, 가상화 · Files, I/O and virtualization

데이터를 저장하고 장치와 통신하고 환경을 격리하는 방법이에요.  
*How data is stored, devices are talked to and environments are isolated.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **파일 시스템과 inode**<br><sub>File system · inode</sub> | 유닉스 계열 파일 시스템은 파일의 정보와 데이터 블록 위치를 inode에 저장하고, 디렉터리는 이름과 inode 번호만 연결해요.<br><sub>Unix file systems keep a file’s metadata and block locations in an inode; directories only map names to inode numbers.</sub> | 디스크 공간이 남아도 inode가 바닥나면 파일을 못 만들어요(df -i). 하드 링크는 같은 inode를 가리키는 이름이고, 심볼릭 링크는 경로를 담은 파일이에요.<br><sub>You can run out of inodes with disk space left (df -i). A hard link is another name for the same inode; a symlink is a file holding a path.</sub> |
| **인터럽트**<br><sub>Interrupt</sub> | 장치가 CPU에 "일이 생겼다"고 신호를 보내면, CPU는 하던 일을 저장하고 핸들러를 실행한 뒤 돌아와요.<br><sub>A device signals the CPU that something happened; the CPU saves its work, runs a handler and returns.</sub> | 키보드, 네트워크 카드, 타이머가 모두 인터럽트를 써요. 타이머 인터럽트가 있어서 운영체제가 프로세스를 강제로 바꿀 수 있어요.<br><sub>Keyboards, network cards and timers all use interrupts. The timer interrupt is what lets the OS preempt processes.</sub> |
| **블로킹 vs 비동기 I/O**<br><sub>Blocking vs async I/O</sub> | 블로킹 I/O는 응답이 올 때까지 스레드가 멈추고, 비동기 I/O는 요청만 보내 두고 다른 일을 하다가 완료되면 처리해요.<br><sub>Blocking I/O halts the thread until the reply arrives; async I/O fires the request, does other work and handles completion later.</sub> | Node.js, Nginx, 파이썬 asyncio는 스레드 하나로 수만 개의 연결을 처리해요(epoll·kqueue). 대신 CPU를 오래 쓰는 작업이 끼면 전체가 멈춰요.<br><sub>Node.js, Nginx and Python asyncio serve tens of thousands of connections on one thread (epoll, kqueue), but one CPU-heavy task stalls them all.</sub> |
| **가상 머신 vs 컨테이너**<br><sub>VM vs container</sub> | VM은 하이퍼바이저 위에 운영체제를 통째로 올리고, 컨테이너는 호스트의 커널을 함께 쓰며 프로세스만 격리해요.<br><sub>A VM runs a whole OS on a hypervisor; a container shares the host kernel and only isolates processes.</sub> | 컨테이너는 수 초 안에 뜨고 가벼워서 배포 단위로 쓰여요(Docker, Kubernetes). 보안 격리가 더 필요하면 VM이나 gVisor 같은 샌드박스를 써요.<br><sub>Containers start in seconds and are light, so they are the unit of deployment (Docker, Kubernetes). For stronger isolation use VMs or sandboxes like gVisor.</sub> |
| **저널링 파일 시스템**<br><sub>Journaling file systems</sub> | 파일 시스템을 고치기 전에 바꿀 내용을 저널(로그)에 먼저 기록해, 전원이 나가도 일관성을 지키는 방법이에요.<br><sub>Recording intended changes in a journal (log) before touching the file system, so it stays consistent across power failures.</sub> | 파일 하나에 덧붙이는 데도 bitmap, inode, data 세 곳을 고쳐야 해서, 중간에 전원이 나가면 사용 중 표시만 된 블록 같은 불일치가 생겨요. 저널링은 TxB, 바꿀 내용, TxE(커밋)를 먼저 저널에 쓰고 커밋 후 실제 위치에 반영(체크포인트)해요. 재부팅하면 커밋된 트랜잭션만 다시 적용하고 끊긴 것은 버려, 디스크 전체를 훑는 fsck가 필요 없어요. ext4 기본 모드는 data=ordered이고, btrfs·ZFS는 복사 후 쓰기로 같은 문제를 풀어요.<br><sub>Even appending to a file updates three places, bitmap, inode and data, so a crash midway can leave inconsistencies such as a block marked used but owned by nothing. Journaling writes TxB, the changes and TxE (the commit) to the journal first, then applies them to their final locations (checkpointing). After a reboot, committed transactions are replayed and interrupted ones discarded, avoiding a full fsck scan. ext4 defaults to data=ordered, while btrfs and ZFS solve the same problem with copy-on-write.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
