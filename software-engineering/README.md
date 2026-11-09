# 소프트웨어 공학 · Software engineering

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/software-engineering/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

폭포수·V 모델과 애자일, 스크럼·칸반, 요구사항 공학과 사용자 스토리, TDD·BDD, 테스트 피라미드와 테스트 더블, 뮤테이션·속성 기반·계약 테스트, 불안정한 테스트, UML과 유스케이스, C4 모델, ADR, DDD, 코드 리뷰, 시맨틱 버저닝, 기술 부채, DORA 지표까지 다뤄요.

Waterfall, the V-model and agile, Scrum and Kanban, requirements engineering and user stories, TDD and BDD, the test pyramid and test doubles, mutation, property-based and contract testing, flaky tests, UML and use cases, the C4 model, ADRs, DDD, code review, semantic versioning, technical debt and DORA metrics.

**4개 주제 · 30개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [개발 프로세스와 애자일 · Development process and agile](#se-proc) (8)
- [소프트웨어 테스트 · Software testing](#se-test) (10)
- [설계와 모델링 · Design and modeling](#se-model) (6)
- [협업과 품질 · Collaboration and quality](#se-team) (6)

<a id="se-proc"></a>

## 개발 프로세스와 애자일 · Development process and agile

팀이 일을 나누고 계획하고 피드백을 받는 방식이에요.  
*How teams split, plan and get feedback on work.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **폭포수 vs 반복형**<br><sub>Waterfall vs iterative</sub> | 폭포수는 요구사항→설계→구현→테스트→배포를 한 번씩 차례로 끝내고, 반복형은 작은 단위로 이 과정을 여러 번 돌며 자주 내보내요.<br><sub>Waterfall runs requirements, design, build, test and release once, in order; iterative development loops through them in small slices and ships often.</sub> | 요구가 바뀌기 쉬운 서비스는 반복형이 유리해요. 규제가 강하거나 하드웨어처럼 되돌리기 비싼 분야는 지금도 단계별 관리를 많이 써요.<br><sub>Products whose requirements shift favour iterative work; regulated or hardware projects, where changes are costly, still lean on phase gates.</sub> |
| **애자일 선언**<br><sub>The Agile Manifesto</sub> | 2001년 개발자들이 정리한 4가지 가치예요. 프로세스·문서·계약·계획보다 사람, 동작하는 소프트웨어, 고객 협력, 변화 대응을 더 중시해요.<br><sub>Four values written by developers in 2001: people, working software, customer collaboration and responding to change, valued over process, documents, contracts and plans.</sub> | 애자일은 특정 도구나 회의가 아니라 짧게 만들고 피드백 받아 고치는 태도예요. 스크럼·칸반·XP는 이를 실천하는 방법들이에요.<br><sub>Agile is not a tool or a meeting but a habit of building in short loops and adjusting from feedback; Scrum, Kanban and XP are ways to practise it.</sub> |
| **스크럼**<br><sub>Scrum</sub> | 1–4주 스프린트 단위로 백로그에서 일을 가져와 만들고, 매일 짧게 공유하고, 끝에 리뷰와 회고를 해요. PO·스크럼 마스터·개발자 세 역할이 있어요.<br><sub>Work is pulled from the backlog into 1–4 week sprints, synced in a short daily scrum, and closed with a review and a retrospective. Three roles: product owner, scrum master, developers.</sub> | 스프린트 중엔 목표를 바꾸지 않는 게 원칙이에요. 회고에서 나온 개선점을 다음 스프린트에 실제로 반영해야 의미가 있어요.<br><sub>Don’t change the sprint goal mid-sprint, and make sure retro actions actually land in the next sprint.</sub> |
| **칸반**<br><sub>Kanban</sub> | 일을 카드로 보드에 올리고 "진행 중" 칸의 개수(WIP)를 제한해서, 새로 시작하기보다 끝내는 데 집중하게 해요.<br><sub>Work items sit on a board as cards and the number in progress (WIP) is capped, so the team finishes before starting more.</sub> | 스프린트 없이 계속 흐르는 일(운영, 고객 지원, 유지보수)에 잘 맞아요. 리드 타임과 막힌 칸을 보면 병목이 보여요.<br><sub>Fits continuous work without sprints, like ops, support and maintenance; lead time and stuck columns reveal bottlenecks.</sub> |
| **사용자 스토리와 인수 조건**<br><sub>User stories and acceptance criteria</sub> | "누가, 무엇을, 왜"를 한 문장으로 쓰고, 완료를 판단할 구체적인 조건을 붙여요.<br><sub>State who wants what and why in one sentence, then attach concrete conditions that decide when it’s done.</sub> | 인수 조건이 모호하면 "다 됐다"의 기준이 사람마다 달라져요. 잘 쓴 조건은 그대로 테스트 케이스가 돼요.<br><sub>Vague criteria mean everyone has a different idea of done; good criteria become test cases directly.</sub> |
| **번다운 차트와 속도**<br><sub>Burndown and velocity</sub> | 스프린트 동안 남은 작업량이 줄어드는 모습을 그리고, 스프린트마다 끝낸 양(속도)으로 다음 계획을 세워요.<br><sub>Plot remaining work shrinking through the sprint, and use how much each sprint finished (velocity) to plan the next.</sub> | 속도는 팀 내부의 계획 도구예요. 팀끼리 비교하거나 성과 지표로 쓰면 포인트만 부풀려져요.<br><sub>Velocity is a team-internal planning tool; comparing teams or using it as a KPI just inflates the points.</sub> |
| **요구사항 공학**<br><sub>Requirements engineering</sub> | 무엇을 만들어야 하는지 이해관계자에게서 도출하고, 분석·명세·검증·관리하는 활동이에요.<br><sub>The work of eliciting what to build from stakeholders, then analyzing, specifying, validating and managing it.</sub> | 요구사항은 기능(무엇을 하나: 비밀번호 재설정)과 비기능(얼마나 잘 하나: 성능, 보안, 가용성 99.9%)으로 나눠요. “빠르게 로딩”처럼 모호한 요구는 “3G에서 첫 화면 p95 ≤ 2초”처럼 측정·검증 가능하게 다시 써요. MoSCoW(Must, Should, Could, Won’t)로 우선순위를 정하고, 요구사항과 테스트를 추적 매트릭스로 연결해요. 요구사항 오류는 초기에 잡을수록 싸요.<br><sub>Requirements split into functional ones (what it does: reset a password) and non-functional ones (how well: performance, security, 99.9% availability). Vague wishes like “loads fast” are rewritten to be measurable and testable, such as “first screen p95 ≤ 2 s on 3G”. MoSCoW (Must, Should, Could, Won’t) sets priorities, and a traceability matrix links requirements to tests. Requirement errors are cheapest to fix early.</sub> |
| **V 모델**<br><sub>The V-model</sub> | 폭포수의 각 설계 단계마다 그것을 검증할 테스트 단계를 짝지어 V자로 그린 개발 모델이에요.<br><sub>A development model that pairs each waterfall design phase with the test phase that verifies it, drawn as a V.</sub> | 왼쪽 팔은 요구사항 분석 → 시스템 설계 → 아키텍처 설계 → 모듈 설계로 내려가고, 바닥에서 코딩한 뒤 오른쪽 팔은 단위 → 통합 → 시스템 → 인수 테스트로 올라가요. 같은 높이끼리 짝이라 각 설계 단계에서 테스트 계획을 미리 세워요. 검증(제품을 올바르게 만들었나)과 확인(올바른 제품을 만들었나)을 구분하며, 자동차·의료·항공 같은 안전 분야에서 지금도 많이 써요.<br><sub>The left arm descends from requirements analysis through system, architecture and module design; coding sits at the bottom; the right arm climbs through unit, integration, system and acceptance testing. Each level pairs with its counterpart, so test plans are written during design. It distinguishes verification (built it right?) from validation (built the right thing?) and remains common in safety-critical fields such as automotive, medical and aerospace.</sub> |

<a id="se-test"></a>

## 소프트웨어 테스트 · Software testing

버그를 일찍, 싸게 찾는 방법이에요.  
*Ways to find bugs early and cheaply.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **테스트 피라미드**<br><sub>Test pyramid</sub> | 빠르고 싼 단위 테스트를 가장 많이, 통합 테스트는 적당히, 느린 E2E 테스트는 핵심 흐름만 두는 구조예요.<br><sub>Lots of fast, cheap unit tests, a moderate layer of integration tests, and slow end-to-end tests only for key flows.</sub> | E2E가 대부분이면 CI가 느리고 자주 깨져요. 실패 원인을 좁히기 쉬운 아래층을 두텁게 하세요.<br><sub>A suite made mostly of E2E tests makes CI slow and flaky; thicken the lower layers, where failures are easy to pinpoint.</sub> |
| **TDD (테스트 주도 개발)**<br><sub>TDD (test-driven development)</sub> | 실패하는 테스트를 먼저 쓰고(Red), 통과할 최소 코드를 쓰고(Green), 정리(Refactor)하는 짧은 사이클을 반복해요.<br><sub>Write a failing test (red), write the least code that passes (green), then clean up (refactor), in short repeated cycles.</sub> | 테스트하기 쉬운 구조가 자연스럽게 나와요. 요구가 분명한 로직(계산, 파서, 규칙)에서 특히 효과가 커요.<br><sub>It naturally yields testable designs and pays off most on well-defined logic like calculations, parsers and business rules.</sub> |
| **BDD (행동 주도 개발)**<br><sub>BDD (behaviour-driven development)</sub> | Given-When-Then 형식의 문장으로 기대하는 행동을 적고, 그 문장을 그대로 자동화 테스트로 실행해요.<br><sub>Describe expected behaviour as Given–When–Then sentences and run those sentences as automated tests.</sub> | 기획·QA·개발이 같은 문장을 보며 합의할 수 있어요. Cucumber, SpecFlow 같은 도구가 문장을 코드와 연결해요.<br><sub>Product, QA and developers agree on the same text; tools like Cucumber and SpecFlow bind the sentences to code.</sub> |
| **테스트 더블**<br><sub>Test doubles</sub> | 테스트할 때 실제 의존성(결제, 메일, DB) 대신 끼워 넣는 대역이에요. Stub·Mock·Fake·Spy로 나뉘어요.<br><sub>Stand-ins for real dependencies such as payments, email and databases during tests: stubs, mocks, fakes and spies.</sub> | Mock을 과하게 쓰면 구현 세부에 묶인 깨지기 쉬운 테스트가 돼요. 가능하면 결과(상태)를 검증하세요.<br><sub>Over-mocking ties tests to implementation details; verify outcomes and state where you can.</sub> |
| **코드 커버리지**<br><sub>Code coverage</sub> | 테스트가 코드의 몇 %를 실행했는지예요. 줄(라인) 기준과 분기(브랜치) 기준이 있어요.<br><sub>The share of code your tests execute, measured by lines or by branches.</sub> | 커버리지가 낮은 곳은 확실히 위험하지만, 높다고 안전한 건 아니에요. 숫자 목표보다 핵심 로직의 분기를 챙기세요.<br><sub>Low coverage flags real risk, but high coverage proves little; care about the branches in core logic, not the number.</sub> |
| **경계값 분석 · 동등 분할**<br><sub>Boundary values · equivalence partitions</sub> | 입력을 같은 결과를 내는 구간으로 나누고(동등 분할), 구간 경계의 바로 양쪽 값을 집중적으로 테스트해요.<br><sub>Group inputs into ranges that behave the same, then test values on both sides of each boundary.</sub> | > 와 >=, 0과 1, 빈 목록과 하나짜리 목록처럼 버그는 경계에 몰려요. 테스트 케이스 수는 줄이고 효과는 높여요.<br><sub>Bugs cluster at edges: > vs >=, zero vs one, empty vs single-item lists. Fewer test cases, more bugs caught.</sub> |
| **뮤테이션 테스트**<br><sub>Mutation testing</sub> | 코드를 일부러 조금씩 망가뜨린 “뮤턴트”를 만들어, 테스트가 그 버그를 잡는지 확인해 테스트의 품질을 재요.<br><sub>Measure test quality by planting small bugs (“mutants”) in the code and checking whether the tests catch them.</sub> | isAdult(age)는 age >= 18인데 테스트가 30과 5만 확인하면 커버리지는 100%지만 >=를 >로 바꾼 뮤턴트가 살아남아요. 18을 넣는 경계값 테스트를 추가하면 그 뮤턴트도 죽어 점수가 2/3에서 3/3이 돼요. 커버리지는 실행 여부만, 뮤테이션 점수는 검사의 강도를 알려줘요. PIT(Java), Stryker(JS·C#), mutmut(Python)이 있고, 느려서 핵심 모듈이나 변경분에만 돌려요.<br><sub>If isAdult(age) is age >= 18 and the tests only try 30 and 5, coverage is 100% yet a mutant changing >= to > survives. Adding a boundary test at 18 kills it, raising the score from 2/3 to 3/3. Coverage tells you what ran; mutation score tells you how hard the tests check. Tools include PIT (Java), Stryker (JS/C#) and mutmut (Python); since it is slow, run it on core modules or changed code.</sub> |
| **속성 기반 테스트**<br><sub>Property-based testing</sub> | 예시 입력 대신 “항상 성립해야 하는 성질”을 적으면, 도구가 무작위 입력을 대량으로 만들어 반례를 찾아 줘요.<br><sub>Instead of example inputs, state a property that must always hold and let a tool generate many random inputs to find a counterexample.</sub> | mySort의 예시 테스트 몇 개는 통과해도, “정렬해도 길이는 같다”는 성질을 적으면 37번째 무작위 입력에서 실패하고, 도구가 입력을 줄여 [0, 0]이라는 최소 반례를 보여 줘 중복이 사라지는 버그를 드러내요. 왕복(decode(encode(x)) = x), 불변량, 기준 구현과의 비교, 멱등성이 좋은 성질이에요. QuickCheck에서 시작해 Hypothesis, fast-check, jqwik이 있어요.<br><sub>A few example tests of mySort pass, but the property “sorting keeps the length” fails on random input #37, and shrinking reduces it to the minimal counterexample [0, 0], exposing a bug that drops duplicates. Good properties include round trips (decode(encode(x)) = x), invariants, comparison with a reference implementation and idempotence. It began with QuickCheck; Hypothesis, fast-check and jqwik followed.</sub> |
| **불안정한 테스트**<br><sub>Flaky tests</sub> | 코드가 그대로인데도 실행할 때마다 통과했다 실패했다 하는 테스트예요. 팀이 테스트를 믿지 못하게 만들어요.<br><sub>Tests that pass and fail on different runs while the code stays the same, eroding the team’s trust in the suite.</sub> | 원인은 대개 타이밍(비동기가 끝나기 전 검사), 실행 순서 의존(공유 상태), 시간·난수, 외부 네트워크예요. sleep 대신 조건을 기다리고, 상태를 매번 새로 만들고, 시계와 시드를 주입하고, 외부 서비스는 가짜로 바꿔 결정적으로 고쳐요. 바로 못 고치면 격리하고 불안정 비율을 추적하되, 무작정 재시도로 숨기면 “그냥 다시 돌려” 문화가 생겨 진짜 실패도 놓쳐요.<br><sub>Typical causes are timing (asserting before async work finishes), order dependence (shared state), time and randomness, and external networks. Make them deterministic: wait for conditions instead of sleeping, build fresh state each time, inject clocks and seeds, and fake external services. If a fix must wait, quarantine the test and track flake rates; hiding it with blind retries breeds a “just rerun it” culture that misses real failures.</sub> |
| **계약 테스트**<br><sub>Contract testing</sub> | 서비스 사이의 요청·응답 약속을 계약 파일로 남겨, 각 서비스를 따로 테스트하면서도 연결이 깨지지 않게 하는 방법이에요.<br><sub>Record the request/response promises between services as contracts so each service is tested alone without breaking the integration.</sub> | 소비자(웹 앱)의 테스트가 가짜 제공자를 상대로 돌며 “GET /users/1 → 200 { id, name }” 같은 기대를 계약(pact.json)으로 기록하고, 제공자는 자기 CI에서 그 계약을 재생해 실제 응답이 맞는지 검증해요. 제공자가 name을 fullName으로 바꾸면 배포 전에 실패하고 can-i-deploy가 막아요. 느리고 불안정한 E2E를 줄이며, Pact, Spring Cloud Contract가 대표 도구예요.<br><sub>The consumer’s tests run against a mock provider and record expectations such as “GET /users/1 → 200 { id, name }” in a contract (pact.json); the provider replays that contract in its own CI to verify its real responses. If the provider renames name to fullName, verification fails before deployment and can-i-deploy blocks the release. It reduces slow, flaky end-to-end tests; Pact and Spring Cloud Contract are typical tools.</sub> |

<a id="se-model"></a>

## 설계와 모델링 · Design and modeling

코드를 쓰기 전에 구조와 흐름, 도메인을 정리하는 도구예요.  
*Tools for shaping structure, flow and domain before code.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **UML 클래스 다이어그램**<br><sub>UML class diagrams</sub> | 클래스의 이름·속성·메서드와 클래스 사이의 관계(연관, 합성, 상속)를 그림으로 나타내요.<br><sub>Shows each class’s name, attributes and methods, plus how classes relate: association, composition and inheritance.</sub> | 설계 토론이나 문서화할 때 핵심 관계만 스케치하세요. 코드와 1:1로 모든 걸 그리면 금방 낡아요.<br><sub>Sketch only the key relationships for design talks and docs; diagrams that mirror every line of code go stale fast.</sub> |
| **UML 시퀀스 다이어그램**<br><sub>UML sequence diagrams</sub> | 참여자들이 시간 순서대로 주고받는 메시지를 위에서 아래로 그려요.<br><sub>Draws the messages participants exchange, in time order from top to bottom.</sub> | API 연동 설계, 인증 흐름 설명, 장애 원인 분석에 많이 써요. Mermaid 같은 텍스트 도구로 코드처럼 관리할 수 있어요.<br><sub>Handy for API integration design, auth flows and incident analysis; tools like Mermaid keep them in text alongside code.</sub> |
| **DDD · 바운디드 컨텍스트**<br><sub>DDD · bounded contexts</sub> | 같은 단어도 맥락마다 의미가 달라요. 도메인을 경계(컨텍스트)로 나누고 각자 자기 모델과 용어를 가져요.<br><sub>The same word means different things in different parts of a business. Split the domain into bounded contexts, each with its own model and vocabulary.</sub> | 거대한 공용 모델 하나가 모든 팀을 묶는 걸 막아줘요. 마이크로서비스 경계를 정할 때 출발점으로 많이 써요.<br><sub>Stops one giant shared model from coupling every team, and is a common starting point for drawing microservice boundaries.</sub> |
| **유스케이스 다이어그램**<br><sub>Use-case diagrams</sub> | 시스템 밖의 행위자(사람·외부 시스템)가 시스템으로 무엇을 하는지(유스케이스)를 보여 주는 UML 다이어그램이에요.<br><sub>A UML diagram showing what actors outside the system (people or external systems) do with it (use cases).</sub> | 고객은 상품 검색·주문·취소를, 관리자는 상품 관리를 하고, 외부 결제사는 결제하기와 연결돼요. 주문하면 결제가 항상 포함되므로 «include», 쿠폰 적용처럼 가끔 덧붙는 선택 흐름은 «extend»로 그려요. 시스템 경계를 그려 범위를 합의하고, 유스케이스마다 기본 흐름·대안 흐름·예외를 글로 적어 요구사항을 완성해요.<br><sub>Customers search, order and cancel; admins manage products; an external payment provider connects to Pay. Placing an order always includes paying, drawn as «include», while an optional flow like applying a coupon is «extend». The system boundary makes the scope explicit, and each use case is completed with a written main flow, alternatives and exceptions.</sub> |
| **C4 모델**<br><sub>The C4 model</sub> | 지도를 확대하듯 시스템 맥락 → 컨테이너 → 컴포넌트 → 코드 네 단계로 소프트웨어 아키텍처를 그리는 방법이에요.<br><sub>A way to draw software architecture like a zoomable map in four levels: context, containers, components and code.</sub> | 맥락 단계는 우리 시스템과 사용자·외부 시스템을, 컨테이너 단계는 웹·API·DB·큐 같은 배포 단위와 통신을, 컴포넌트 단계는 한 컨테이너 안의 주요 구성 요소를 보여 줘요. 코드 단계는 보통 생략하고 IDE에 맡겨요. 상자와 화살표에 이름·기술·역할을 적는 단순한 표기라 비개발자도 읽을 수 있고, Structurizr DSL이나 Mermaid로 다이어그램을 코드로 관리해요.<br><sub>The context level shows our system with its users and external systems; the container level shows deployable units such as web, API, database and queue and how they talk; the component level shows the major parts inside one container. The code level is usually skipped and left to the IDE. Its plain boxes and arrows labeled with name, technology and purpose are readable by non-developers, and tools like Structurizr DSL or Mermaid keep diagrams as code.</sub> |
| **아키텍처 결정 기록 (ADR)**<br><sub>Architecture decision records</sub> | 중요한 기술 결정 하나를 맥락·결정·결과로 짧게 적어, 나중의 팀이 “왜”를 알 수 있게 하는 문서예요.<br><sub>A short document recording one significant technical decision as context, decision and consequences, so future teams know the “why”.</sub> | “ADR-007: 이벤트 전달에 Kafka 사용”처럼 제목을 달고, 상태(승인됨), 맥락(여러 서비스가 이벤트를 재처리해야 함), 결정, 결과(장점과 운영 부담), 검토한 대안을 한 페이지 안에 적어요. 저장소에 마크다운으로 두고 PR로 리뷰하며, 결정이 바뀌면 기존 문서를 고치지 않고 새 ADR로 대체해 역사를 남겨요. 마이클 나이가드의 템플릿이 널리 쓰여요.<br><sub>Titled like “ADR-007: use Kafka for event delivery”, it lists the status (accepted), the context (several services must replay events), the decision, the consequences (benefits and operational cost) and the alternatives considered, all within a page. ADRs live as markdown in the repository and are reviewed via PRs; when a decision changes, a new ADR supersedes the old one instead of editing it. Michael Nygard’s template is widely used.</sub> |

<a id="se-team"></a>

## 협업과 품질 · Collaboration and quality

여럿이 함께 오래 유지할 수 있는 소프트웨어를 만드는 원칙이에요.  
*Principles for software many people can maintain for years.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **코드 리뷰와 PR**<br><sub>Code review and pull requests</sub> | 변경을 병합하기 전에 동료가 읽고 질문·제안하는 과정이에요. CI 검사와 승인을 거쳐 main에 들어가요.<br><sub>Before a change merges, teammates read it, ask questions and suggest fixes; it lands on main after CI checks and approval.</sub> | PR은 작게 나누고 "왜"를 설명하세요. 스타일은 린터에 맡기고 리뷰는 설계·버그·가독성에 집중해요.<br><sub>Keep PRs small and explain why; leave style to linters and spend review time on design, bugs and readability.</sub> |
| **시맨틱 버저닝**<br><sub>Semantic versioning</sub> | MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요. 호환이 깨지면 MAJOR, 기능 추가는 MINOR, 버그 수정은 PATCH를 올려요.<br><sub>MAJOR.MINOR.PATCH tells users what changed: bump MAJOR for breaking changes, MINOR for features, PATCH for fixes.</sub> | npm의 ^·~ 범위가 이 약속을 믿고 자동 업데이트해요. 라이브러리를 공개한다면 꼭 지켜야 해요. 0.x는 언제든 깨질 수 있다는 뜻이에요.<br><sub>npm’s ^ and ~ ranges trust this promise when auto-updating, so libraries must keep it; 0.x versions may break at any time.</sub> |
| **기술 부채**<br><sub>Technical debt</sub> | 지금 빨리 가려고 택한 임시방편이 나중에 이자처럼 개발 속도를 갉아먹는 현상이에요.<br><sub>Shortcuts taken to go fast now that later charge interest by slowing every change.</sub> | 빚 자체는 전략이 될 수 있지만 기록하고 갚아야 해요. 스프린트의 일정 비율을 정리 작업에 꾸준히 쓰는 팀이 많아요.<br><sub>Debt can be a valid strategy if it’s recorded and repaid; many teams reserve a fixed share of each sprint for cleanup.</sub> |
| **콘웨이의 법칙**<br><sub>Conway’s law</sub> | 시스템의 구조는 그것을 만드는 조직의 소통 구조를 닮아요.<br><sub>A system’s structure mirrors the communication structure of the organization that builds it.</sub> | 원하는 아키텍처가 있다면 팀 구성부터 맞추세요(역 콘웨이 전략). 마이크로서비스는 팀 자율성과 함께 갈 때 효과가 있어요.<br><sub>If you want a certain architecture, organize teams to match it first (inverse Conway); microservices pay off only with autonomous teams.</sub> |
| **브룩스의 법칙**<br><sub>Brooks’s law</sub> | 늦어진 프로젝트에 인력을 추가하면 더 늦어져요. 사람이 n명이면 소통 경로는 n(n−1)/2개로 늘어나요.<br><sub>Adding people to a late project makes it later; n people have n(n−1)/2 communication paths.</sub> | 일정이 밀리면 사람을 더하기보다 범위를 줄이세요. 팀을 작게 유지하고 경계를 분명히 하면 소통 비용이 줄어요.<br><sub>When you slip, cut scope rather than add people; small teams with clear boundaries keep communication cheap.</sub> |
| **DORA 지표**<br><sub>DORA metrics</sub> | 소프트웨어 전달 성과를 재는 네 가지 지표예요: 배포 빈도, 변경 리드 타임, 변경 실패율, 서비스 복구 시간.<br><sub>Four measures of software delivery performance: deployment frequency, lead time for changes, change failure rate and time to restore service.</sub> | 앞의 둘은 속도(얼마나 자주, 빨리 내보내나), 뒤의 둘은 안정성(얼마나 자주 깨지고, 빨리 고치나)을 재요. 『Accelerate』와 State of DevOps 보고서는 상위 팀이 하루 여러 번 배포하고 한 시간 안에 복구하는 등 하위 팀과 수백 배 차이가 나며, 속도와 안정성이 함께 좋아진다는 걸 보여 줬어요. 개인 평가가 아니라 팀 개선용이고, 목표로 삼으면 왜곡돼요(굿하트의 법칙).<br><sub>The first two measure speed (how often and how fast you ship); the last two measure stability (how often things break and how fast you recover). “Accelerate” and the State of DevOps reports showed top teams deploying many times a day and restoring within an hour, orders of magnitude ahead of low performers, with speed and stability improving together. They are for improving teams, not rating individuals, and get gamed once turned into targets (Goodhart’s law).</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
