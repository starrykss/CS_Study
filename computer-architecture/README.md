# 컴퓨터 구조 · Computer architecture

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/computer-architecture/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

폰 노이만 구조, 명령어 사이클, 레지스터와 ALU, 메모리 계층과 캐시, 파이프라인과 해저드, 분기 예측, 멀티코어와 캐시 일관성, 인터럽트, DMA, SIMD와 GPU까지 다뤄요.

The von Neumann architecture, the instruction cycle, registers and the ALU, the memory hierarchy and caches, pipelines and hazards, branch prediction, multicore and cache coherence, interrupts, DMA, SIMD and GPUs.

**4개 주제 · 19개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [컴퓨터가 수와 글자를 담는 방법 · How computers store numbers and text](#ar-data) (5)
- [CPU의 동작 · How the CPU works](#ar-cpu) (7)
- [메모리 계층과 캐시 · Memory hierarchy and caches](#ar-mem) (4)
- [입출력과 저장 장치 · I/O and storage](#ar-io) (3)

<a id="ar-data"></a>

## 컴퓨터가 수와 글자를 담는 방법 · How computers store numbers and text

모든 데이터는 결국 0과 1이에요. 그 약속을 알아야 이상한 버그가 이해돼요.  
*All data is 0s and 1s in the end; knowing the conventions explains strange bugs.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **2진수와 16진수**<br>Binary · Hexadecimal | 컴퓨터는 0과 1(비트)로 수를 표현해요. 자리마다 2배씩 커지고, 4비트를 16진수 한 글자로 줄여 써요.<br><sub>Computers write numbers in bits; each place is worth double the previous, and hex packs 4 bits into one digit.</sub> | 색상(#FF8800), 메모리 주소, 해시값, 파일 권한(chmod 755=2진 111 101 101)이 모두 이 표기예요.<br><sub>Colours (#FF8800), memory addresses, hashes and file modes (chmod 755 = 111 101 101) all use these notations.</sub> |
| **2의 보수**<br>Two’s complement | 음수는 비트를 뒤집고 1을 더해 표현해요. 덧셈 회로 하나로 뺄셈까지 처리할 수 있어요.<br><sub>Negative numbers are formed by inverting the bits and adding one, so a single adder handles subtraction.</sub> | 정수형은 범위를 넘으면 반대쪽 끝으로 넘어가요(오버플로). 32비트 int는 약 21억이 한계라 금액·ID엔 64비트를 쓰세요.<br><sub>Integers wrap around past their range (overflow). A 32-bit int tops out near 2.1 billion, so use 64-bit for money and ids.</sub> |
| **부동소수점**<br>Floating point | 실수를 부호·지수·가수로 나눠 저장하는 방식(IEEE 754)이에요. 0.1처럼 2진수로 딱 떨어지지 않는 수는 근사값이 돼요.<br><sub>Real numbers are stored as sign, exponent and fraction (IEEE 754); values like 0.1 that don’t terminate in binary are approximated.</sub> | 0.1 + 0.2 ≠ 0.3 이에요. 돈 계산은 정수(최소 단위)나 Decimal 타입을 쓰고, 실수 비교는 오차 범위로 하세요.<br><sub>0.1 + 0.2 ≠ 0.3. Do money in integer minor units or Decimal, and compare floats within a tolerance.</sub> |
| **엔디언**<br>Endianness | 여러 바이트로 된 값을 메모리에 큰 자리부터(빅 엔디언) 둘지, 작은 자리부터(리틀 엔디언) 둘지의 약속이에요.<br><sub>Whether a multi-byte value is stored most-significant byte first (big-endian) or least-significant first (little-endian).</sub> | 대부분의 CPU는 리틀 엔디언, 네트워크는 빅 엔디언이에요. 바이너리 파일·소켓 프로토콜을 파싱할 때 순서를 꼭 맞추세요.<br><sub>Most CPUs are little-endian; network protocols are big-endian. Match the order when parsing binary files or sockets.</sub> |
| **문자 인코딩 (UTF-8)**<br>Character encoding · UTF-8 | 모든 문자에 유니코드 번호를 붙이고, UTF-8은 이를 1~4바이트로 저장해요. 영문은 1바이트, 한글은 3바이트예요.<br><sub>Every character has a Unicode number, and UTF-8 stores it in 1–4 bytes: 1 for English letters, 3 for Korean syllables.</sub> | 글자가 깨지면(문자 깨짐) 저장과 읽기 인코딩이 다른 거예요. MySQL은 이모지 때문에 utf8이 아닌 utf8mb4를 써야 해요.<br><sub>Garbled text means writing and reading used different encodings. In MySQL use utf8mb4, not utf8, so emoji fit.</sub> |

<a id="ar-cpu"></a>

## CPU의 동작 · How the CPU works

명령어 하나가 실행되는 과정과 그것을 빠르게 만드는 기법들이에요.  
*How one instruction runs, and the tricks that make it fast.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **폰 노이만 구조**<br>Von Neumann architecture | 명령어와 데이터를 같은 메모리에 두고, CPU가 버스를 통해 하나씩 가져와 실행하는 구조예요. 오늘날 거의 모든 컴퓨터의 기본이에요.<br><sub>Instructions and data share one memory, and the CPU fetches them over a bus one at a time; nearly every computer works this way.</sub> | CPU는 빨라졌지만 메모리와 버스는 상대적으로 느려서 병목이 생겨요. 캐시·프리페치가 이 문제를 줄이기 위해 존재해요.<br><sub>CPUs got fast while memory and buses lagged, creating a bottleneck that caches and prefetching exist to hide.</sub> |
| **명령어 사이클**<br>Instruction cycle | CPU는 PC가 가리키는 명령어를 가져오고(인출), 해석하고(해독), 실행한 뒤 다음 명령으로 넘어가는 일을 반복해요.<br><sub>The CPU fetches the instruction PC points to, decodes it, executes it and moves to the next, over and over.</sub> | 3GHz CPU는 1초에 이 사이클을 30억 번 돌려요. 디버거의 "한 줄 실행"이 이 반복을 사람 속도로 보는 거예요.<br><sub>A 3 GHz CPU turns this loop three billion times a second; stepping in a debugger watches it at human speed.</sub> |
| **파이프라인**<br>Pipelining | 명령어 처리를 여러 단계로 나눠, 앞 명령이 다음 단계로 가면 바로 다음 명령을 시작해요. 동시에 여러 명령이 서로 다른 단계에 있어요.<br><sub>Instruction processing is split into stages so a new instruction starts as soon as the previous one moves on, with several in flight at once.</sub> | 명령 하나의 시간은 같지만 처리량이 크게 늘어요. 최신 CPU는 여기에 여러 명령을 동시에 내보내는 슈퍼스칼라, 순서를 바꾸는 비순차 실행까지 더해요.<br><sub>Latency per instruction is unchanged but throughput soars. Modern CPUs add superscalar issue and out-of-order execution on top.</sub> |
| **파이프라인 해저드**<br>Pipeline hazards | 다음 명령이 앞 명령의 결과를 필요로 하면 파이프라인이 기다려야 해요(데이터 해저드). 포워딩으로 결과를 지름길로 넘겨 줄여요.<br><sub>When an instruction needs the result of the one before, the pipeline must wait (a data hazard); forwarding passes the result via a shortcut.</sub> | 컴파일러가 명령 순서를 바꿔(스케줄링) 기다림을 줄여요. 의존성이 긴 계산 사슬은 병렬화가 어려운 이유이기도 해요.<br><sub>Compilers reorder instructions to hide stalls. Long dependency chains are also why some code resists parallelism.</sub> |
| **분기 예측**<br>Branch prediction | if문의 결과가 나오기 전에 CPU가 어느 쪽일지 예측해서 미리 실행해요. 틀리면 미리 한 일을 버리고 다시 해요.<br><sub>Before an if is resolved, the CPU guesses the outcome and runs ahead; a wrong guess means discarding that work.</sub> | 정렬된 데이터로 반복하면 예측이 잘 맞아 빨라져요(유명한 StackOverflow 질문). 스펙터 같은 보안 취약점도 이 추측 실행에서 나왔어요.<br><sub>Loops over sorted data run faster because predictions hit (a famous Stack Overflow question). Spectre-style attacks came from this speculation.</sub> |
| **CISC vs RISC**<br>CISC vs RISC | CISC(x86)는 복잡하고 길이가 다양한 명령어를, RISC(ARM, RISC-V)는 단순하고 길이가 같은 명령어를 써요.<br><sub>CISC (x86) uses complex, variable-length instructions; RISC (ARM, RISC-V) uses simple, fixed-length ones.</sub> | 애플 실리콘·스마트폰은 ARM, 대부분의 서버·PC는 x86이에요. 도커 이미지와 네이티브 라이브러리는 아키텍처(amd64/arm64)를 맞춰야 해요.<br><sub>Apple silicon and phones are ARM; most servers and PCs are x86. Docker images and native libraries must match the architecture (amd64/arm64).</sub> |
| **멀티코어와 암달의 법칙**<br>Multicore · Amdahl’s law | 코어를 늘려도 나눌 수 없는 순차 구간이 있으면 속도 향상에 한계가 있어요. 순차 비율이 20%면 최대 5배까지예요.<br><sub>Adding cores can only speed up the parallel part; with 20% serial work, the best possible speed-up is 5×.</sub> | 스레드를 늘리기 전에 락 경합·순차 처리 구간을 먼저 줄이세요. 서버는 요청 단위로 나눠 코어를 잘 활용해요.<br><sub>Before adding threads, cut lock contention and serial sections. Servers use cores well by splitting work per request.</sub> |

<a id="ar-mem"></a>

## 메모리 계층과 캐시 · Memory hierarchy and caches

빠른 메모리는 작고 비싸서 여러 층으로 나눠 써요.  
*Fast memory is small and expensive, so it comes in layers.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **메모리 계층 구조**<br>Memory hierarchy | 레지스터 → L1·L2·L3 캐시 → RAM → SSD → HDD 순으로 느려지고, 커지고, 싸져요.<br><sub>Registers, then L1/L2/L3 caches, RAM, SSD and HDD: each level is slower, larger and cheaper.</sub> | "L1 접근이 1초라면 RAM은 5분, SSD는 며칠"이라는 감각을 가지면 어디를 최적화할지 보여요.<br><sub>Think “if L1 took one second, RAM would take five minutes and SSD days” to see where optimization pays.</sub> |
| **캐시와 캐시 라인**<br>Cache · Cache lines | CPU는 메모리를 64바이트 묶음(캐시 라인)으로 가져와 캐시에 둬요. 한 번 미스가 나면 주변 데이터는 히트가 돼요.<br><sub>The CPU pulls memory in 64-byte chunks (cache lines), so after one miss the neighbouring data hits.</sub> | 배열이 링크드 리스트보다 실제로 훨씬 빠른 이유예요. 데이터를 연속으로 배치하는 게 알고리즘 복잡도만큼 중요해요.<br><sub>This is why arrays beat linked lists in practice; laying data out contiguously matters as much as big-O.</sub> |
| **지역성**<br>Locality | 최근 쓴 데이터를 곧 다시 쓰고(시간 지역성), 가까운 데이터를 이어서 쓰는(공간 지역성) 경향이에요. 캐시는 이걸 믿고 동작해요.<br><sub>Programs tend to reuse recent data (temporal locality) and touch nearby data next (spatial locality); caches bet on it.</sub> | 2차원 배열은 행 순서로 돌고, 구조체 배열(AoS)과 배열 구조체(SoA) 중 접근 패턴에 맞게 고르세요.<br><sub>Iterate 2D arrays row by row, and choose array-of-structs or struct-of-arrays to match your access pattern.</sub> |
| **거짓 공유**<br>False sharing | 서로 다른 코어가 다른 변수를 쓰는데, 두 변수가 같은 캐시 라인에 있어서 캐시가 계속 서로를 무효화하는 현상이에요.<br><sub>Cores writing different variables keep invalidating each other because those variables share one cache line.</sub> | 멀티스레드 카운터·큐가 이유 없이 느리면 의심하세요. 패딩이나 @Contended, 스레드별 카운터로 해결해요.<br><sub>Suspect it when multithreaded counters or queues are inexplicably slow; fix with padding, @Contended or per-thread counters.</sub> |

<a id="ar-io"></a>

## 입출력과 저장 장치 · I/O and storage

데이터를 옮기고 오래 보관하는 장치들이에요.  
*Devices that move and keep data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **DMA**<br>DMA · Direct memory access | 대량 데이터 전송을 CPU 대신 전용 컨트롤러가 메모리로 직접 옮기고, 끝나면 인터럽트로 알려요.<br><sub>A dedicated controller moves bulk data straight into memory instead of the CPU, raising an interrupt when done.</sub> | 덕분에 CPU는 디스크·네트워크 전송 중에도 다른 일을 해요. 제로 카피(sendfile) 같은 고성능 I/O 기법의 바탕이에요.<br><sub>The CPU keeps working during disk and network transfers; it underpins zero-copy I/O like sendfile.</sub> |
| **SSD vs HDD**<br>SSD vs HDD | HDD는 원판을 돌리고 헤드를 움직여 읽어서 흩어진 데이터에 느리고, SSD는 플래시 칩을 병렬로 읽어 수천 배 빨라요.<br><sub>HDDs spin platters and move a head, so scattered reads are slow; SSDs read flash chips in parallel and are thousands of times faster.</sub> | DB·서버 디스크는 SSD가 기본이에요. SSD는 쓰기 횟수에 수명이 있고, 클라우드 디스크는 IOPS 한도를 확인하세요.<br><sub>SSDs are the default for databases and servers. They wear with writes, and cloud disks have IOPS limits to check.</sub> |
| **CPU vs GPU**<br>CPU vs GPU | CPU는 복잡한 일을 빠르게 하는 큰 코어 몇 개, GPU는 같은 단순 계산을 대량으로 하는 작은 코어 수천 개예요.<br><sub>A CPU has a few big cores for complex work; a GPU has thousands of small ones for the same simple maths on lots of data.</sub> | 딥러닝의 행렬 곱, 그래픽, 영상 인코딩에 GPU를 써요. 데이터를 GPU로 옮기는 비용이 있어서 작은 작업은 오히려 손해예요.<br><sub>Deep learning’s matrix maths, graphics and video encoding run on GPUs. Copying data to the GPU costs time, so tiny jobs lose.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
