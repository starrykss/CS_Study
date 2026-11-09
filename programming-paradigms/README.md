# 프로그래밍 패러다임·방법론 · Paradigms & practices

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/programming-paradigms/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

절차적·객체지향·함수형·선언적·반응형 프로그래밍, 캡슐화·상속·다형성, 순수 함수와 불변성, 클린 코드와 리팩터링, DRY·KISS·YAGNI, 코드 스멜과 기술 부채까지 다뤄요.

Procedural, object-oriented, functional, declarative and reactive programming, encapsulation, inheritance and polymorphism, pure functions and immutability, clean code and refactoring, DRY, KISS, YAGNI, code smells and technical debt.

**2개 주제 · 17개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [프로그래밍 패러다임 · Programming paradigms](#pa-paradigm) (10)
- [클린 코드와 리팩터링 · Clean code and refactoring](#pa-clean) (7)

<a id="pa-paradigm"></a>

## 프로그래밍 패러다임 · Programming paradigms

문제를 코드로 표현하는 서로 다른 사고방식이에요. 실무에선 여러 패러다임을 섞어 써요.  
*Different ways of expressing problems in code; real projects mix them.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **명령형 vs 선언형**<br>Imperative vs declarative | 명령형은 "어떻게" 할지 단계별로 지시하고, 선언형은 "무엇을" 원하는지 설명해요.<br><sub>Imperative code says how, step by step; declarative code says what you want.</sub> | SQL, HTML, CSS, React JSX, map/filter가 선언형이에요. 읽기 쉽고 실수가 적지만 내부 동작(성능)은 알고 써야 해요.<br><sub>SQL, HTML, CSS, JSX and map/filter are declarative: easier to read, but know what they do under the hood.</sub> |
| **객체지향 4대 특성**<br>Four pillars of OOP | 캡슐화, 상속, 다형성, 추상화로 데이터와 동작을 객체 단위로 묶어 복잡도를 다뤄요.<br><sub>Encapsulation, inheritance, polymorphism and abstraction bundle data and behaviour into objects to manage complexity.</sub> | Java·C#·Kotlin·Swift 생태계의 기본이에요. 클래스 계층을 깊게 만들기보다 작은 객체를 조합하는 쪽이 유지보수가 쉬워요.<br><sub>The backbone of Java, C#, Kotlin and Swift codebases; composing small objects usually beats deep class hierarchies.</sub> |
| **캡슐화**<br>Encapsulation | 객체의 데이터를 숨기고 정해진 메서드로만 바꾸게 해서, 규칙(불변식)을 한곳에서 지켜요.<br><sub>Hide an object’s data and change it only through methods, so its rules (invariants) are enforced in one place.</sub> | getter/setter를 기계적으로 다 만드는 건 캡슐화가 아니에요. "잔액은 음수가 될 수 없다" 같은 규칙을 객체 안에 두세요.<br><sub>Auto-generating getters and setters for everything isn’t encapsulation; keep rules like “balance can’t go negative” inside.</sub> |
| **다형성**<br>Polymorphism | 같은 메서드 호출이 객체의 실제 타입에 따라 다르게 동작해요.<br><sub>The same method call behaves differently depending on the object’s actual type.</sub> | 타입별 if/switch를 다형성으로 바꾸면 새 타입을 추가해도 기존 코드를 안 고쳐도 돼요(OCP).<br><sub>Replacing type-based if/switch with polymorphism lets you add types without editing existing code (open–closed).</sub> |
| **상속보다 합성**<br>Composition over inheritance | 상속은 부모의 모든 것을 물려받아 강하게 묶이고, 합성은 필요한 기능을 가진 객체를 조립해요.<br><sub>Inheritance binds a child tightly to everything in its parent; composition assembles objects that provide the needed abilities.</sub> | 상속은 진짜 "is-a" 관계이고 깊이가 얕을 때만 쓰세요. 대부분은 인터페이스 + 합성이 변경에 강해요.<br><sub>Inherit only for genuine, shallow is-a relationships; interfaces plus composition handle change better.</sub> |
| **순수 함수**<br>Pure functions | 같은 입력엔 항상 같은 출력을 내고, 바깥 상태를 읽거나 바꾸지 않는(부수 효과 없는) 함수예요.<br><sub>A function that always returns the same output for the same input and has no side effects.</sub> | 테스트·캐싱·병렬 처리가 쉬워요. DB·네트워크 같은 부수 효과는 프로그램의 가장자리로 몰고 핵심 로직은 순수하게 두세요.<br><sub>Easy to test, cache and parallelize. Push side effects like DB and network calls to the edges and keep core logic pure.</sub> |
| **불변성**<br>Immutability | 값을 직접 고치지 않고, 바뀐 새 값을 만들어요. 원본은 그대로 남아요.<br><sub>Instead of changing a value in place, create a new one with the change; the original stays intact.</sub> | React·Redux는 참조 비교로 변경을 감지해서 불변 업데이트가 필수예요. 멀티스레드에서도 공유 데이터 버그를 없애 줘요.<br><sub>React and Redux detect changes by reference, so immutable updates are required; it also removes shared-data bugs in threads.</sub> |
| **고차 함수 · map/filter/reduce**<br>Higher-order functions | 함수를 인자로 받거나 함수를 돌려주는 함수예요. map·filter·reduce로 데이터 변환을 파이프라인처럼 이어요.<br><sub>Functions that take or return functions; map, filter and reduce chain data transformations like a pipeline.</sub> | 반복문보다 의도가 잘 드러나요. 다만 큰 데이터에서 단계마다 배열을 새로 만드니 성능이 중요하면 측정하세요.<br><sub>Intent reads more clearly than loops, but each step allocates a new array, so measure on large data.</sub> |
| **함수 합성**<br>Function composition | 작은 함수들을 이어서 새로운 함수를 만들어요. 앞 함수의 출력이 다음 함수의 입력이 돼요.<br><sub>Join small functions into a new one, where each output feeds the next input.</sub> | 유닉스 파이프(cat \| grep \| sort)와 같은 생각이에요. 미들웨어 체인, 데이터 정제 파이프라인에 써요.<br><sub>Same idea as Unix pipes (cat \| grep \| sort); used for middleware chains and data-cleaning pipelines.</sub> |
| **반응형 프로그래밍**<br>Reactive programming | 이벤트·데이터를 시간에 따라 흐르는 스트림으로 보고, 연산자로 거르고 합치고 변환해요.<br><sub>Treat events and data as streams over time and filter, merge and transform them with operators.</sub> | 자동 완성, 실시간 대시보드, 드래그 처리처럼 비동기 이벤트가 얽힌 곳에 강해요(RxJS, Kotlin Flow). 과하게 쓰면 디버깅이 어려워요.<br><sub>Shines with tangled async events like autocomplete, live dashboards and drag handling (RxJS, Kotlin Flow); overuse hurts debugging.</sub> |

<a id="pa-clean"></a>

## 클린 코드와 리팩터링 · Clean code and refactoring

다른 사람(미래의 나 포함)이 읽고 고치기 쉬운 코드를 만드는 습관이에요.  
*Habits for code that others, including future you, can read and change.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **의미 있는 이름**<br>Meaningful names | 변수·함수 이름에 의도와 단위를 담아 주석 없이도 읽히게 해요.<br><sub>Put intent and units into names so code reads without comments.</sub> | 축약어·한 글자 이름은 반복문 인덱스 정도만 허용하세요. boolean은 is·has·can으로, 함수는 동사로 시작해요.<br><sub>Allow one-letter names only for loop indexes. Start booleans with is/has/can and functions with verbs.</sub> |
| **작은 함수**<br>Small functions | 함수는 한 가지 일만, 한 수준의 추상화로 짧게 써요. 긴 함수는 의미 있는 이름의 작은 함수들로 나눠요.<br><sub>Functions should do one thing at one level of abstraction; split long ones into well-named smaller ones.</sub> | 함수 이름이 "그리고"로 길어지면 나눌 때예요. 작게 나누면 테스트와 재사용이 쉬워져요.<br><sub>If a function name needs “and”, split it; small pieces are easier to test and reuse.</sub> |
| **DRY · KISS · YAGNI**<br>DRY · KISS · YAGNI | 같은 지식은 한 곳에(DRY), 최대한 단순하게(KISS), 지금 필요 없는 건 만들지 않기(YAGNI).<br><sub>Keep each piece of knowledge in one place (DRY), keep things simple (KISS) and don’t build what you don’t need yet (YAGNI).</sub> | 세 번째 중복이 보일 때 추출하세요(Rule of Three). 우연히 비슷한 코드를 억지로 합치면 오히려 결합이 생겨요.<br><sub>Extract on the third repetition (rule of three); merging merely similar code creates coupling.</sub> |
| **조기 반환 (가드 절)**<br>Guard clauses | 예외 상황을 함수 앞쪽에서 먼저 처리하고 반환해서, 핵심 로직의 들여쓰기를 얕게 만들어요.<br><sub>Handle edge cases at the top and return early so the main logic stays shallow.</sub> | "화살표 모양" 코드가 보이면 조건을 뒤집어 일찍 반환하세요. 에러 처리 경로도 한눈에 보여요.<br><sub>When you see arrow-shaped code, invert the conditions and return early; error paths become obvious.</sub> |
| **리팩터링**<br>Refactoring | 외부 동작은 바꾸지 않고 내부 구조를 개선하는 작업이에요. 작은 단계로 나눠 매번 테스트로 확인해요.<br><sub>Improving internal structure without changing external behaviour, in small steps verified by tests.</sub> | 기능 추가와 리팩터링을 같은 커밋에 섞지 마세요. IDE의 자동 리팩터링(이름 변경, 추출)을 쓰면 실수가 줄어요.<br><sub>Keep refactors and features in separate commits, and use IDE automated refactorings to avoid mistakes.</sub> |
| **코드 스멜**<br>Code smells | 긴 함수, 거대한 클래스, 중복, 긴 매개변수 목록처럼 당장 버그는 아니지만 문제가 생길 징후예요.<br><sub>Long methods, god classes, duplication and long parameter lists: not bugs yet, but signs of trouble.</sub> | 스멜마다 대응하는 리팩터링이 정리되어 있어요(마틴 파울러, 『리팩터링』). 리뷰에서 공통 어휘로 쓰세요.<br><sub>Each smell has a matching refactoring (Martin Fowler’s Refactoring); use them as shared review vocabulary.</sub> |
| **결합도와 응집도**<br>Coupling · Cohesion | 모듈 사이의 의존(결합)은 약하게, 모듈 안의 관련성(응집)은 강하게 만들어야 변경이 퍼지지 않아요.<br><sub>Keep dependencies between modules loose and relatedness within modules strong, so changes don’t spread.</sub> | "이걸 고치려면 파일 몇 개를 건드려야 하나?"가 결합도의 체감 지표예요. 기능 단위로 폴더를 나누면 응집이 높아져요.<br><sub>“How many files must I touch for this change?” is coupling you can feel; feature-based folders raise cohesion.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
