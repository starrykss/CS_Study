# 프로그래밍 언어 · Programming languages

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/programming-languages/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

렉싱·파싱·AST로 이어지는 컴파일 과정, 인터프리터와 JIT, 타입 시스템, 스코프와 클로저, 값과 참조, 가비지 컬렉션, 이벤트 루프와 비동기, 동시성 모델까지 다뤄요.

Compilation from lexing and parsing to the AST, interpreters and JIT, type systems, scope and closures, values and references, garbage collection, the event loop and async code, and concurrency models.

**4개 주제 · 15개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [코드가 실행되기까지 · From code to execution](#pl-impl) (2)
- [타입 시스템 · Type systems](#pl-types) (4)
- [메모리, 스코프, 클로저 · Memory, scope and closures](#pl-mem) (6)
- [비동기와 예외 처리 · Asynchrony and exceptions](#pl-conc) (3)

<a id="pl-impl"></a>

## 코드가 실행되기까지 · From code to execution

우리가 쓴 코드가 컴퓨터가 실행하는 형태로 바뀌는 과정이에요.  
*How the code we write becomes something a computer runs.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **컴파일 과정**<br>Compilation pipeline | 소스 코드는 토큰으로 쪼개지고(어휘 분석), 문법 트리(AST)가 되고(구문 분석), 최적화를 거쳐 기계어나 바이트코드가 돼요.<br><sub>Source is split into tokens (lexing), shaped into a syntax tree (parsing), optimized and emitted as machine code or bytecode.</sub> | 린터·포매터·번들러·코드 변환기가 모두 AST를 다뤄요. 에러 메시지의 "unexpected token"은 파싱 단계에서 났다는 뜻이에요.<br><sub>Linters, formatters, bundlers and codemods all work on ASTs; “unexpected token” means the parser gave up.</sub> |
| **컴파일러 · 인터프리터 · JIT**<br>Compiler · Interpreter · JIT | 컴파일러는 미리 전부 번역하고, 인터프리터는 읽으면서 바로 실행하고, JIT는 실행하면서 자주 쓰는 부분만 기계어로 바꿔요.<br><sub>A compiler translates everything up front, an interpreter runs as it reads, and a JIT compiles hot code while running.</sub> | V8·JVM이 JIT라서 처음엔 느리다가 빨라져요(워밍업). 서버리스의 콜드 스타트 문제도 여기서 생겨요.<br><sub>V8 and the JVM are JITs, so they start slower and speed up (warm-up); serverless cold starts come from this.</sub> |

<a id="pl-types"></a>

## 타입 시스템 · Type systems

값의 종류를 약속해서 실수를 미리 막는 장치예요.  
*Promises about kinds of values that catch mistakes early.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **정적 vs 동적 타입**<br>Static vs dynamic typing | 정적 타입은 실행 전에 타입을 검사하고, 동적 타입은 실행하면서 확인해요. 요즘 정적 언어는 타입 추론으로 덜 써도 돼요.<br><sub>Static typing checks types before running; dynamic typing checks while running. Modern static languages infer most types.</sub> | 큰 팀·긴 수명의 코드는 TypeScript·Kotlin 같은 정적 타입이 리팩터링과 자동 완성을 크게 도와요.<br><sub>For large teams and long-lived code, static types (TypeScript, Kotlin) make refactoring and autocomplete far better.</sub> |
| **암묵적 형 변환**<br>Implicit type coercion | 언어가 타입이 다른 값을 몰래 바꿔 계산하는 거예요. JS의 == 와 + 연산이 대표적이에요.<br><sub>The language silently converts values of different types to make an operation work; JS’s == and + are infamous.</sub> | 항상 ===를 쓰고, 숫자 변환은 Number()로 명시하세요. 폼 입력값은 항상 문자열로 들어와요.<br><sub>Always use ===, convert explicitly with Number(), and remember form inputs arrive as strings.</sub> |
| **제네릭**<br>Generics | 타입을 매개변수로 받아, 하나의 코드로 여러 타입을 안전하게 다뤄요.<br><sub>Take types as parameters so one piece of code safely handles many types.</sub> | List<T>, Promise<T>, API 응답 래퍼처럼 컨테이너를 만들 때 필수예요. any로 도망가지 말고 제네릭으로 타입을 이어 주세요.<br><sub>Essential for containers like List<T>, Promise<T> and API response wrappers; reach for generics instead of any.</sub> |
| **null 안전성**<br>Null safety | null일 수 있는 값을 타입으로 표시하고, ?. 같은 연산자로 안전하게 접근해요. 컴파일러가 null 체크 누락을 잡아 줘요.<br><sub>Mark values that may be null in their types and access them safely with operators like ?.; the compiler flags missing checks.</sub> | TypeScript strictNullChecks, Kotlin의 String?, Swift Optional을 켜 두세요. NullPointerException이 크게 줄어요.<br><sub>Turn on TypeScript strictNullChecks or use Kotlin String? and Swift Optional; null-pointer crashes drop sharply.</sub> |

<a id="pl-mem"></a>

## 메모리, 스코프, 클로저 · Memory, scope and closures

변수가 어디에 살고 언제 사라지는지에 대한 규칙이에요.  
*Rules for where variables live and when they disappear.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **스택과 힙**<br>Stack vs heap | 함수 호출마다 쌓이는 스택에는 지역 변수와 참조가, 힙에는 객체가 저장돼요. 스택은 자동으로 정리되고 힙은 GC나 직접 해제가 필요해요.<br><sub>Each call pushes a stack frame of locals and references; objects live on the heap. The stack cleans itself; the heap needs GC or manual freeing.</sub> | 재귀가 깊으면 스택이 넘치고, 힙 객체를 계속 붙잡으면 메모리 누수가 생겨요.<br><sub>Deep recursion overflows the stack; holding onto heap objects leaks memory.</sub> |
| **값 전달 vs 참조 전달**<br>Pass by value vs reference | 숫자 같은 원시값은 복사되어 전달되고, 객체·배열은 같은 객체를 가리키는 참조가 전달돼요.<br><sub>Primitives like numbers are copied; objects and arrays are passed as references to the same object.</sub> | 함수 안에서 인자로 받은 배열을 고치면 호출한 쪽도 바뀌어요. React 상태를 직접 수정하면 안 되는 이유예요.<br><sub>Mutating an array argument changes the caller’s array too, which is why React state must not be mutated.</sub> |
| **가비지 컬렉션**<br>Garbage collection | 루트(전역·스택)에서 닿을 수 있는 객체를 표시하고, 닿지 않는 객체를 자동으로 해제해요.<br><sub>Marks objects reachable from roots (globals, stack) and automatically frees the rest.</sub> | GC 멈춤이 응답 지연 튐의 원인이 되기도 해요. 큰 캐시·전역 맵·해제 안 한 리스너가 대표적인 누수예요.<br><sub>GC pauses can cause latency spikes. Big caches, global maps and forgotten listeners are classic leaks.</sub> |
| **참조 카운팅**<br>Reference counting | 객체마다 가리키는 곳의 수를 세서 0이 되면 바로 해제해요. 서로를 가리키는 순환은 0이 안 돼서 새요.<br><sub>Each object counts its references and is freed when the count reaches zero; cycles never reach zero and leak.</sub> | Swift(ARC)·Python·C++ shared_ptr이 이 방식이에요. 델리게이트·부모 참조는 weak로 두세요.<br><sub>Swift ARC, Python and C++ shared_ptr use it. Make delegate and parent references weak.</sub> |
| **스코프**<br>Scope | 변수를 찾을 수 있는 범위예요. 코드에 쓰인 위치로 정해지고, 안쪽에서 바깥쪽 순서로 찾아요.<br><sub>Where a variable can be seen, decided by where it is written and searched from inner to outer scopes.</sub> | let·const의 블록 스코프를 쓰고 var는 피하세요. 같은 이름을 안쪽에 다시 선언하면 바깥 변수가 가려져요(섀도잉).<br><sub>Prefer block-scoped let/const over var. Redeclaring a name inside hides the outer one (shadowing).</sub> |
| **클로저**<br>Closure | 함수가 만들어질 때의 주변 변수를 기억해서, 바깥 함수가 끝난 뒤에도 그 변수를 쓸 수 있어요.<br><sub>A function remembers the variables around it when created and can use them after the outer function has returned.</sub> | 비공개 상태, 콜백, React 훅이 클로저예요. 반복문 안의 비동기 콜백이 마지막 값만 보는 버그도 클로저 때문이에요.<br><sub>Private state, callbacks and React hooks are closures; so is the classic bug where loop callbacks all see the last value.</sub> |

<a id="pl-conc"></a>

## 비동기와 예외 처리 · Asynchrony and exceptions

기다리는 일과 실패하는 일을 다루는 방법이에요.  
*Handling work that waits and work that fails.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **콜백 → Promise → async/await**<br>Callbacks → Promises → async/await | 비동기 작업을 콜백으로 이으면 중첩이 깊어지고, Promise는 체인으로 펴고, async/await는 동기 코드처럼 읽히게 해요.<br><sub>Chaining async work with callbacks nests deeply; promises flatten it into chains; async/await reads like synchronous code.</sub> | await를 반복문에서 하나씩 쓰면 순차 실행돼 느려요. 독립적인 요청은 Promise.all로 동시에 보내고, 에러는 try/catch로 잡으세요.<br><sub>Awaiting in a loop runs requests one by one; send independent ones together with Promise.all and catch errors with try/catch.</sub> |
| **스레드 vs 코루틴**<br>Threads vs coroutines | 스레드는 OS가 강제로 번갈아 실행하는 무거운 실행 단위이고, 코루틴은 스스로 양보하며 번갈아 실행되는 가벼운 단위예요.<br><sub>Threads are heavy units the OS preempts; coroutines are light units that take turns by yielding voluntarily.</sub> | 동시 연결이 많은 서버는 코루틴(Go, Kotlin, Java 가상 스레드)으로 적은 자원에 많은 작업을 처리해요.<br><sub>Servers with many connections use coroutines (Go, Kotlin, Java virtual threads) to handle lots of work cheaply.</sub> |
| **예외 처리**<br>Exception handling | 예외가 던져지면 catch를 만날 때까지 호출 스택을 거슬러 올라가며 프레임을 정리해요(스택 되감기).<br><sub>A thrown exception unwinds the call stack, frame by frame, until a catch handles it.</sub> | 예외를 잡고 아무것도 안 하면 버그가 숨어요. 처리할 수 있는 곳에서 잡고, 나머지는 로깅 후 상위로 보내세요. finally로 자원을 정리하세요.<br><sub>Catching and ignoring hides bugs. Catch where you can act, log and rethrow otherwise, and clean up in finally.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
