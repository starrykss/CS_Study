# 디자인 패턴 · Design patterns

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/design-patterns/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

SOLID 원칙 5가지와 GoF 디자인 패턴 23가지(생성 5 · 구조 7 · 행동 11), 그리고 MVC·MVVM·의존성 주입 같은 아키텍처 패턴까지. 객체들이 주고받는 메시지를 움직임으로 보여줘요.

The five SOLID principles, all 23 Gang of Four patterns (5 creational, 7 structural, 11 behavioral) and architecture patterns such as MVC, MVVM and dependency injection, animated as messages between objects.

**5개 주제 · 33개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [SOLID 객체지향 설계 원칙 · SOLID design principles](#dp-solid) (5)
- [생성 패턴 · Creational patterns](#dp-create) (5)
- [구조 패턴 · Structural patterns](#dp-struct) (7)
- [행위 패턴 · Behavioral patterns](#dp-behav) (11)
- [아키텍처 패턴 · Architectural patterns](#dp-arch) (5)

<a id="dp-solid"></a>

## SOLID 객체지향 설계 원칙 · SOLID design principles

바뀌기 쉬운 코드를 만드는 다섯 가지 원칙이에요.  
*Five principles for code that is easy to change.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **단일 책임 원칙 (SRP)**<br><sub>Single responsibility</sub> | 클래스는 바뀌어야 할 이유가 하나여야 해요. 여러 일을 한 클래스에 몰면 한 가지 변경이 전체에 영향을 줘요.<br><sub>A class should have one reason to change; piling jobs into one class makes every change risky.</sub> | "그리고"가 들어가는 클래스 설명(저장하고 메일 보내고…)은 나눌 신호예요. 너무 잘게 쪼개 파일만 늘리는 것도 피하세요.<br><sub>If describing a class needs “and” (saves and emails and…), split it, but don’t shred code into needless files either.</sub> |
| **개방-폐쇄 원칙 (OCP)**<br><sub>Open–closed</sub> | 새 기능은 기존 코드를 고치지 않고 확장(새 클래스 추가)으로 넣을 수 있게 만들어요.<br><sub>New behaviour should be added by extension, such as a new class, without editing existing code.</sub> | 타입별 if/switch가 여러 곳에 반복되면 인터페이스와 다형성으로 바꿀 때예요. 플러그인 구조가 대표적이에요.<br><sub>When type-based if/switch blocks repeat across the code, move to interfaces and polymorphism. Plugin systems are the classic case.</sub> |
| **리스코프 치환 원칙 (LSP)**<br><sub>Liskov substitution</sub> | 자식 클래스는 부모 클래스를 대신 써도 프로그램이 똑같이 올바르게 동작해야 해요.<br><sub>A subclass must be usable anywhere its parent is, without breaking correctness.</sub> | "정사각형은 직사각형이다"처럼 현실의 is-a가 코드에선 깨질 수 있어요. 오버라이드에서 예외를 던지거나 조건을 바꾸면 위반이에요.<br><sub>A real-world is-a (“a square is a rectangle”) can break in code. Overrides that throw or change the rules violate it.</sub> |
| **인터페이스 분리 원칙 (ISP)**<br><sub>Interface segregation</sub> | 쓰지 않는 메서드에 의존하지 않도록 큰 인터페이스를 역할별로 작게 나눠요.<br><sub>Split fat interfaces by role so no class depends on methods it doesn’t use.</sub> | 구현 클래스에 "지원 안 함" 예외가 보이면 인터페이스가 너무 큰 거예요.<br><sub>If implementations throw “not supported”, the interface is too big.</sub> |
| **의존성 역전 원칙 (DIP)**<br><sub>Dependency inversion</sub> | 중요한 비즈니스 로직이 DB·외부 API 같은 세부 구현에 직접 의존하지 않고, 둘 다 인터페이스에 의존하게 해요.<br><sub>Core business logic should not depend directly on details like databases or APIs; both depend on an abstraction.</sub> | 테스트에서 가짜 구현으로 바꿔 끼울 수 있어요. DI(의존성 주입)는 이 원칙을 실현하는 도구예요.<br><sub>It lets tests swap in fakes. Dependency injection is the tool that makes it practical.</sub> |

<a id="dp-create"></a>

## 생성 패턴 · Creational patterns

객체를 어떻게 만들지를 감추고 유연하게 해요.  
*Hide and flex how objects are created.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **싱글톤**<br><sub>Singleton</sub> | 클래스의 인스턴스를 딱 하나만 만들고, 어디서든 그 하나를 쓰게 해요.<br><sub>Ensures a class has exactly one instance, shared everywhere.</sub> | 전역 상태가 되어 테스트와 동시성 문제를 만들기 쉬워요. 요즘은 DI 컨테이너가 싱글톤 범위로 관리하게 하는 걸 권해요.<br><sub>It becomes global state that complicates tests and concurrency; prefer letting a DI container manage singleton scope.</sub> |
| **팩토리 메서드**<br><sub>Factory method</sub> | 어떤 클래스의 객체를 만들지 결정하는 일을 별도 메서드(팩토리)에 맡겨요. 클라이언트는 구체 클래스를 몰라도 돼요.<br><sub>Delegates the choice of which class to instantiate to a factory method, so clients don’t know concrete classes.</sub> | 설정·입력값에 따라 다른 구현을 골라야 할 때 써요. 생성 로직이 여기저기 흩어지는 걸 막아요.<br><sub>Useful when config or input picks the implementation; it keeps creation logic from scattering.</sub> |
| **추상 팩토리**<br><sub>Abstract factory</sub> | 서로 어울리는 객체 묶음(가족)을 한 번에 만드는 팩토리예요. 팩토리를 바꾸면 묶음 전체가 바뀌어요.<br><sub>A factory that creates a whole family of matching objects; switching the factory switches the family.</sub> | 테마, OS별 UI 위젯, DB별 드라이버 묶음처럼 섞이면 안 되는 조합에 써요.<br><sub>Used for themes, per-OS widgets or per-database driver sets that must not be mixed.</sub> |
| **빌더**<br><sub>Builder</sub> | 선택 항목이 많은 복잡한 객체를 단계별로 조립하고, 마지막에 build()로 완성해요.<br><sub>Builds a complex object with many options step by step, finishing with build().</sub> | 생성자 인자가 많을 때 읽기 쉽고 실수가 줄어요. 불변 객체를 만들 때 특히 좋아요.<br><sub>Much clearer than long constructors and great for immutable objects.</sub> |
| **프로토타입**<br><sub>Prototype</sub> | 새로 만드는 대신 기존 객체를 복제(clone)해서 조금 고쳐 써요.<br><sub>Create new objects by cloning an existing one and tweaking it.</sub> | 생성 비용이 크거나 설정이 복잡한 객체에 유용해요. 얕은 복사와 깊은 복사의 차이를 꼭 확인하세요.<br><sub>Handy when construction is costly or configuration complex. Always check shallow versus deep copy.</sub> |

<a id="dp-struct"></a>

## 구조 패턴 · Structural patterns

클래스와 객체를 조합해 더 큰 구조를 만드는 방법이에요.  
*Ways to compose classes and objects into larger structures.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **어댑터**<br><sub>Adapter</sub> | 맞지 않는 인터페이스 사이에 변환기를 둬서 함께 동작하게 해요.<br><sub>A converter between incompatible interfaces so they can work together.</sub> | 외부 라이브러리·레거시 시스템 연동에 써요. 외부 API를 어댑터 뒤에 두면 교체도 쉬워져요.<br><sub>Used for third-party and legacy integration; hiding external APIs behind adapters also makes them replaceable.</sub> |
| **브리지**<br><sub>Bridge</sub> | 기능 계층과 구현 계층을 분리하고 "가지는" 관계로 연결해, 두 축이 따로 늘어날 수 있게 해요.<br><sub>Separates an abstraction from its implementation and links them by composition so each can vary independently.</sub> | 도형×색, 리모컨×기기처럼 조합이 폭발할 때 써요. 상속보다 조합을 선택하는 대표 예예요.<br><sub>Use it when combinations explode (shape × color, remote × device): a textbook case of composition over inheritance.</sub> |
| **컴포지트**<br><sub>Composite</sub> | 개별 객체와 객체 묶음을 같은 인터페이스로 다뤄 트리 구조를 재귀적으로 처리해요.<br><sub>Treats single objects and groups through the same interface, so trees are handled recursively.</sub> | 파일 시스템, UI 컴포넌트 트리, 조직도, 메뉴처럼 부분-전체 구조에 써요.<br><sub>Used for part–whole structures: file systems, UI component trees, org charts and menus.</sub> |
| **데코레이터**<br><sub>Decorator</sub> | 같은 인터페이스를 가진 객체로 감싸서 기존 객체에 기능을 덧붙여요. 여러 겹으로 감쌀 수 있어요.<br><sub>Wraps an object in another with the same interface to add behaviour; wrappers can be stacked.</sub> | 자바 I/O 스트림, 파이썬 @데코레이터, 웹 미들웨어가 같은 아이디어예요. 상속 없이 조합으로 확장해요.<br><sub>Java I/O streams, Python decorators and web middleware share the idea: extension by composition.</sub> |
| **파사드**<br><sub>Facade</sub> | 복잡한 하위 시스템 앞에 간단한 창구 하나를 둬서 쓰기 쉽게 해요.<br><sub>Puts one simple entry point in front of a complex subsystem.</sub> | 서비스 레이어나 SDK가 파사드 역할을 해요. 너무 커지면 모든 걸 아는 "신 객체"가 되니 조심하세요.<br><sub>Service layers and SDKs act as facades. Watch that it doesn’t grow into an all-knowing god object.</sub> |
| **플라이웨이트**<br><sub>Flyweight</sub> | 변하지 않는 무거운 데이터를 여러 객체가 공유하고, 객체마다 다른 값만 따로 가져서 메모리를 아껴요.<br><sub>Many objects share heavy immutable data and keep only their varying state, saving memory.</sub> | 게임의 나무·총알, 글꼴 글리프, 문자열 인터닝에 써요. 공유 데이터는 반드시 불변이어야 해요.<br><sub>Used for game trees and bullets, font glyphs and string interning. The shared part must be immutable.</sub> |
| **프록시**<br><sub>Proxy</sub> | 진짜 객체 앞에 같은 모양의 대리 객체를 둬서 지연 로딩, 캐싱, 접근 제어 같은 일을 대신해요.<br><sub>A stand-in with the same interface that adds lazy loading, caching or access control in front of the real object.</sub> | JPA·Hibernate의 지연 로딩 엔티티, Nginx 리버스 프록시, 자바스크립트 Proxy가 모두 이 패턴이에요.<br><sub>ORM lazy-loaded entities, reverse proxies like Nginx and JavaScript’s Proxy all follow it.</sub> |

<a id="dp-behav"></a>

## 행위 패턴 · Behavioral patterns

객체끼리 책임을 나누고 소통하는 방법이에요.  
*How objects divide responsibilities and communicate.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **책임 연쇄**<br><sub>Chain of responsibility</sub> | 요청을 처리기 사슬에 흘려보내고, 각 처리기는 처리하거나 다음으로 넘기거나 중단해요.<br><sub>Passes a request along a chain of handlers; each one handles it, forwards it or stops it.</sub> | 웹 프레임워크의 미들웨어·필터, DOM 이벤트 버블링이 대표 예예요. 순서가 결과를 바꾸니 주의하세요.<br><sub>Web middleware and filters and DOM event bubbling are classic examples. Order matters.</sub> |
| **커맨드**<br><sub>Command</sub> | 동작 자체를 객체로 만들어 실행·저장·취소·재실행할 수 있게 해요.<br><sub>Turns an action into an object that can be executed, stored, undone and redone.</sub> | 실행 취소/다시 실행, 작업 큐, 매크로 녹화, 트랜잭션 로그에 써요.<br><sub>Used for undo/redo, job queues, macro recording and transaction logs.</sub> |
| **이터레이터**<br><sub>Iterator</sub> | 컬렉션의 내부 구조를 드러내지 않고 원소를 하나씩 차례로 꺼내는 방법을 제공해요.<br><sub>Provides a way to visit elements one by one without exposing the collection’s structure.</sub> | for…of, 파이썬 제너레이터, 자바 스트림이 이 패턴이에요. 지연 평가로 큰 데이터도 조금씩 처리해요.<br><sub>for…of, Python generators and Java streams follow it, and lazy iteration handles huge data piece by piece.</sub> |
| **중재자**<br><sub>Mediator</sub> | 객체들이 서로 직접 소통하지 않고 중재자를 통해서만 이야기하게 해서 얽힘을 줄여요.<br><sub>Objects talk only through a mediator instead of to each other, cutting the tangle of links.</sub> | 채팅방 서버, 복잡한 폼 필드 간 연동, 항공 관제가 예예요. 중재자가 너무 커지지 않게 주의하세요.<br><sub>Chat servers, interdependent form fields and air traffic control are examples. Keep the mediator from bloating.</sub> |
| **메멘토**<br><sub>Memento</sub> | 객체의 상태를 캡슐화를 깨지 않고 스냅숏으로 저장했다가 나중에 그대로 되돌려요.<br><sub>Saves an object’s state as a snapshot, without breaking encapsulation, and restores it later.</sub> | 게임 세이브, 편집기 되돌리기, Redux DevTools의 시간 여행 디버깅이 같은 원리예요. 스냅숏이 많으면 메모리를 신경 쓰세요.<br><sub>Game saves, editor undo and time-travel debugging work like this. Many snapshots cost memory.</sub> |
| **옵저버**<br><sub>Observer</sub> | 한 객체의 상태가 바뀌면 그 객체를 구독한 모든 객체에게 자동으로 알려 줘요.<br><sub>When one object changes, every object subscribed to it is notified automatically.</sub> | 이벤트 리스너, RxJS, 반응형 UI 상태, 메시지 구독이 모두 이 패턴이에요. 구독 해제를 안 하면 메모리 누수가 생겨요.<br><sub>Event listeners, RxJS, reactive UI state and pub/sub messaging all use it. Forgetting to unsubscribe leaks memory.</sub> |
| **상태**<br><sub>State</sub> | 객체의 상태를 별도 객체로 만들어, 같은 메서드라도 현재 상태에 따라 다르게 동작하게 해요.<br><sub>Represents each state as its own object so the same method behaves differently in each state.</sub> | 주문(결제 대기→배송→완료), 문서 결재처럼 상태 전이가 있는 곳의 거대한 switch문을 없애요.<br><sub>It removes giant switch statements from workflows with state transitions, like orders or approvals.</sub> |
| **전략**<br><sub>Strategy</sub> | 같은 목적의 여러 알고리즘을 각각 객체로 만들어, 실행 중에 갈아끼울 수 있게 해요.<br><sub>Wraps interchangeable algorithms in objects so they can be swapped at runtime.</sub> | 정렬 기준, 할인 정책, 경로 탐색 방식, 결제 수단 선택에 써요. 함수를 값으로 넘기는 것도 전략 패턴이에요.<br><sub>Used for sort orders, discount rules, routing modes and payment choices. Passing a function as a value is the same idea.</sub> |
| **템플릿 메서드**<br><sub>Template method</sub> | 알고리즘의 순서(뼈대)는 부모 클래스가 정하고, 달라지는 단계만 자식 클래스가 구현해요.<br><sub>The parent class fixes the algorithm’s steps and subclasses implement only the parts that vary.</sub> | 프레임워크의 생명주기 훅(onCreate, setUp/tearDown)이 이 방식이에요. 상속을 강제하니 전략 패턴과 비교해 고르세요.<br><sub>Framework lifecycle hooks (onCreate, setUp/tearDown) work like this. It forces inheritance, so weigh it against Strategy.</sub> |
| **비지터**<br><sub>Visitor</sub> | 데이터 구조의 클래스는 그대로 두고, 그 구조를 도는 방문자 객체로 새로운 연산을 추가해요.<br><sub>Adds new operations as visitor objects that walk a structure, leaving the element classes untouched.</sub> | 컴파일러의 AST 처리, 린터·코드 변환기(Babel 플러그인)가 대표 예예요. 원소 종류가 자주 늘면 불리해요.<br><sub>Compiler AST passes, linters and code transformers (Babel plugins) are the classic users. It suits stable element types.</sub> |
| **인터프리터**<br><sub>Interpreter</sub> | 간단한 언어의 문법 규칙을 클래스로 표현하고, 문장을 트리로 만들어 재귀적으로 해석해요.<br><sub>Represents grammar rules of a small language as classes and evaluates sentences as trees, recursively.</sub> | 정규식, SQL·수식 파서, 템플릿 엔진, 규칙 엔진의 기초예요. 문법이 커지면 파서 생성기를 쓰세요.<br><sub>Underlies regex engines, SQL and expression parsers, template and rule engines. For big grammars use a parser generator.</sub> |

<a id="dp-arch"></a>

## 아키텍처 패턴 · Architectural patterns

애플리케이션 전체를 나누고 연결하는 큰 틀이에요.  
*The big shapes for splitting and connecting a whole application.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **MVC**<br><sub>MVC · Model–View–Controller</sub> | 화면(View), 데이터와 규칙(Model), 입력 처리(Controller)를 나눠 서로의 변경 영향을 줄여요.<br><sub>Splits the screen (View), data and rules (Model) and input handling (Controller) to limit how changes spread.</sub> | 대부분의 서버 웹 프레임워크가 이 구조예요. 컨트롤러에 로직이 몰리는 "뚱뚱한 컨트롤러"를 조심하세요.<br><sub>Most server-side web frameworks use it. Watch out for fat controllers that swallow all the logic.</sub> |
| **MVVM**<br><sub>MVVM · Model–View–ViewModel</sub> | 뷰모델의 상태와 화면을 데이터 바인딩으로 연결해, 값이 바뀌면 화면이 자동으로 따라오게 해요.<br><sub>Binds a view-model’s state to the screen so the UI updates automatically when values change.</sub> | Vue, SwiftUI, Jetpack Compose, WPF가 이 방식이에요. UI 로직을 뷰모델에서 테스트할 수 있어요.<br><sub>Vue, SwiftUI, Jetpack Compose and WPF work this way, and UI logic becomes testable in the view-model.</sub> |
| **의존성 주입 (DI)**<br><sub>Dependency injection</sub> | 객체가 필요한 의존 객체를 직접 만들지 않고 생성자 등을 통해 밖에서 받아요.<br><sub>Objects receive their dependencies from outside (e.g. through the constructor) instead of creating them.</sub> | 설정만으로 구현을 바꾸고, 테스트에서 가짜를 넣을 수 있어요. Spring, NestJS, Angular, Hilt가 컨테이너를 제공해요.<br><sub>Implementations can be swapped by configuration and faked in tests. Spring, NestJS, Angular and Hilt provide containers.</sub> |
| **레이어드·클린 아키텍처**<br><sub>Layered · Clean architecture</sub> | 핵심 비즈니스 규칙을 중심에 두고, UI·DB 같은 바깥 기술이 안쪽을 의존하게 해요. 안쪽은 바깥을 몰라요.<br><sub>Keeps business rules at the centre and makes outer technologies like UI and databases depend inward, never the reverse.</sub> | 프레임워크나 DB를 바꿔도 핵심 로직이 안전하고 테스트가 쉬워요. 작은 프로젝트에 과하게 적용하면 파일만 늘어나요.<br><sub>Frameworks and databases can change without touching the core, and tests get easy. Overkill for small projects.</sub> |
| **리포지토리**<br><sub>Repository</sub> | 데이터 저장·조회를 컬렉션처럼 다루는 인터페이스 뒤에 숨겨서, 도메인 코드가 저장 방식을 모르게 해요.<br><sub>Hides storage behind a collection-like interface so domain code never knows how data is stored.</sub> | Spring Data, Prisma, TypeORM이 자동으로 만들어 줘요. 쿼리 성능 문제는 숨겨질 뿐 사라지지 않으니 주의하세요.<br><sub>Spring Data, Prisma and TypeORM generate them. Query performance issues are hidden, not removed.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
