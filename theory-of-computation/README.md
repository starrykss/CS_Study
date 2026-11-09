# 계산 이론 · Theory of computation

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/theory-of-computation/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

빅오 표기법과 복잡도, 오토마타와 정규 표현식, 문맥 자유 문법, 튜링 머신, 정지 문제, P와 NP까지. 얼마나 빨리, 그리고 과연 풀 수 있는지를 따지는 이론이에요.

Big-O notation and complexity, automata and regular expressions, context-free grammars, Turing machines, the halting problem, P and NP: the theory of how fast, and whether, problems can be solved.

**3개 주제 · 11개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [오토마타와 형식 언어 · Automata and formal languages](#toc-auto) (6)
- [계산 가능성 · Computability](#toc-compute) (2)
- [계산 복잡도 · Computational complexity](#toc-cx) (3)

<a id="toc-auto"></a>

## 오토마타와 형식 언어 · Automata and formal languages

입력을 읽고 받아들일지 정하는 추상 기계예요. 정규식, 파서, 상태 관리의 이론적 바탕이에요.  
*Abstract machines that read input and decide whether to accept it; the theory behind regex, parsers and state management.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **DFA (결정적 유한 오토마타)**<br><sub>DFA · Deterministic finite automaton</sub> | 유한 개의 상태와 "이 상태에서 이 글자를 읽으면 저 상태로" 규칙만으로 입력을 판정하는 기계예요. 기억은 현재 상태 하나뿐이에요.<br><sub>A machine with finitely many states and “in this state, on this symbol, go there” rules; its only memory is the current state.</sub> | 주문·결제 상태, UI 상태(XState), 프로토콜 처리, 토크나이저를 상태 기계로 설계하면 불가능한 전이를 원천 차단해요.<br><sub>Modelling order flows, UI state (XState), protocols or tokenizers as state machines rules out impossible transitions.</sub> |
| **NFA와 부분집합 구성**<br><sub>NFA · Subset construction</sub> | 한 입력에 여러 갈래로 동시에 갈 수 있는 오토마타예요. 어느 한 갈래라도 받아들이면 받아들여요. 항상 같은 일을 하는 DFA로 바꿀 수 있어요.<br><sub>An automaton that can follow several branches at once and accepts if any branch does; every NFA has an equivalent DFA.</sub> | 정규식 엔진은 정규식을 NFA로 만들고, 필요하면 DFA로 바꿔 빠르게 실행해요(RE2, Rust regex).<br><sub>Regex engines compile patterns to NFAs and often to DFAs for speed (RE2, Rust regex).</sub> |
| **정규 표현식**<br><sub>Regular expressions</sub> | 정규식은 유한 오토마타로 바뀌어 실행돼요. 반복, 선택, 생략으로 문자열 패턴을 표현해요.<br><sub>A regex compiles into a finite automaton and describes string patterns with repetition, choice and optional parts.</sub> | 백트래킹 엔진에서 (a+)+ 같은 패턴은 지수 시간이 걸려 서비스를 멈출 수 있어요(ReDoS). 사용자 입력엔 타임아웃이나 안전한 엔진을 쓰세요.<br><sub>In backtracking engines, patterns like (a+)+ can take exponential time and stall services (ReDoS); use timeouts or safe engines for user input.</sub> |
| **푸시다운 오토마타**<br><sub>Pushdown automaton</sub> | 유한 오토마타에 스택을 하나 더한 기계예요. 괄호 짝 맞추기처럼 중첩 구조를 판정할 수 있어요.<br><sub>A finite automaton plus a stack, which lets it recognise nested structures like balanced brackets.</sub> | 프로그래밍 언어의 중첩된 블록·괄호를 파서가 처리하는 원리예요. 정규식으로 중첩 구조를 완벽히 다룰 수 없는 이유이기도 해요.<br><sub>It is how parsers handle nested blocks and brackets, and why regexes can’t fully handle nesting.</sub> |
| **촘스키 위계**<br><sub>Chomsky hierarchy</sub> | 언어(문자열 집합)를 정규 ⊂ 문맥 자유 ⊂ 문맥 의존 ⊂ 재귀 열거로 나누고, 각각을 처리하는 기계가 정해져 있어요.<br><sub>Languages nest as regular ⊂ context-free ⊂ context-sensitive ⊂ recursively enumerable, each with a matching machine.</sub> | 토큰은 정규식, 문법은 문맥 자유 파서로 나눠 처리하는 컴파일러 구조가 여기서 나와요.<br><sub>Compilers split work accordingly: regexes for tokens, context-free parsers for grammar.</sub> |
| **문맥 자유 문법과 파스 트리**<br><sub>Context-free grammar · Parse tree</sub> | "E → E + T"처럼 기호를 다른 기호들로 바꾸는 규칙으로 언어를 정의하고, 문장을 이 규칙으로 펼친 나무가 파스 트리예요.<br><sub>Rules such as “E → E + T” define a language; expanding a sentence by those rules gives its parse tree.</sub> | 연산자 우선순위와 결합 방향이 문법 구조로 정해져요. JSON·SQL·프로그래밍 언어 파서와 ANTLR 같은 도구가 이걸 써요.<br><sub>Operator precedence and associativity fall out of the grammar. JSON, SQL and language parsers and tools like ANTLR use this.</sub> |

<a id="toc-compute"></a>

## 계산 가능성 · Computability

컴퓨터가 원리적으로 풀 수 있는 것과 없는 것의 경계예요.  
*The line between what computers can and can’t solve in principle.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **튜링 기계**<br><sub>Turing machine</sub> | 무한한 테이프, 읽고 쓰는 헤드, 상태 규칙만으로 된 가상의 기계예요. 계산 가능한 모든 것을 할 수 있다고 여겨져요.<br><sub>An imaginary machine with an infinite tape, a read/write head and state rules, believed able to compute anything computable.</sub> | 어떤 언어가 "튜링 완전"하다는 건 이 기계만큼 계산할 수 있다는 뜻이에요. 엑셀 수식, CSS+HTML, 마인크래프트 회로도 튜링 완전해요.<br><sub>“Turing complete” means as powerful as this machine; even spreadsheet formulas and Minecraft redstone qualify.</sub> |
| **정지 문제**<br><sub>Halting problem</sub> | 임의의 프로그램이 멈출지 무한히 돌지 항상 정확히 판정하는 프로그램은 존재할 수 없어요. 자기 자신을 넣으면 모순이 생기거든요.<br><sub>No program can always correctly decide whether an arbitrary program halts; feeding it to itself produces a contradiction.</sub> | 완벽한 무한 루프 탐지기나 모든 버그를 찾는 정적 분석기가 불가능한 이유예요. 실제 도구는 근사와 타임아웃으로 타협해요.<br><sub>It is why perfect infinite-loop detectors or bug finders can’t exist; real tools settle for approximations and timeouts.</sub> |

<a id="toc-cx"></a>

## 계산 복잡도 · Computational complexity

문제를 풀 수 있는지보다 얼마나 빨리 풀 수 있는지를 다뤄요.  
*Not whether a problem can be solved, but how fast.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **빅오 표기법**<br><sub>Big-O notation</sub> | 입력 크기 n이 커질 때 시간이나 메모리가 얼마나 빨리 늘어나는지를 가장 큰 항으로 나타내요.<br><sub>Describes how fast time or memory grows with input size n, keeping only the dominant term.</sub> | n이 작으면 상수가 중요하지만, 데이터가 커지면 증가율이 모든 걸 결정해요. 10만 건에 O(n²)은 이미 위험해요.<br><sub>Constants matter for small n, but growth rate decides everything at scale; O(n²) on 100,000 items is already dangerous.</sub> |
| **P vs NP**<br><sub>P vs NP</sub> | P는 빨리 풀 수 있는 문제, NP는 답이 맞는지 빨리 확인할 수 있는 문제예요. 둘이 같은지는 아직 아무도 몰라요.<br><sub>P is problems solvable quickly; NP is problems whose answers can be checked quickly. Whether they are equal is unknown.</sub> | "NP-완전"이라는 말을 들으면 정확한 최적해 대신 근사·휴리스틱·제약 완화를 찾아야 한다는 신호예요.<br><sub>Hearing “NP-complete” is your cue to look for approximations, heuristics or relaxed constraints instead of exact optimums.</sub> |
| **외판원 문제와 근사**<br><sub>Travelling salesman · Heuristics</sub> | 모든 도시를 한 번씩 들르는 최단 경로를 찾는 NP-난해 문제예요. 경우의 수가 n!로 늘어서 큰 n은 정확히 풀 수 없어요.<br><sub>Finding the shortest route through every city is NP-hard; routes grow like n!, so large instances can’t be solved exactly.</sub> | 배달·물류·칩 배선은 그리디, 2-opt, 유전 알고리즘, OR-Tools 같은 솔버로 "충분히 좋은" 답을 찾아요.<br><sub>Delivery, logistics and chip wiring use greedy, 2-opt, genetic algorithms or solvers like OR-Tools for good-enough answers.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
