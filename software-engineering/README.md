# 소프트웨어 공학 · Software engineering

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/software-engineering/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

폭포수와 애자일, 스크럼·칸반·XP, 요구사항과 사용자 스토리, TDD·BDD·DDD, 테스트 피라미드와 테스트 종류, UML, 코드 리뷰, 버전 관리 전략, 추정과 품질 지표까지 다뤄요.

Waterfall and agile, Scrum, Kanban and XP, requirements and user stories, TDD, BDD and DDD, the test pyramid and kinds of tests, UML, code review, branching strategies, estimation and quality metrics.

**4개 주제 · 20개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [개발 프로세스와 애자일 · Development process and agile](#se-proc) (6)
- [소프트웨어 테스트 · Software testing](#se-test) (6)
- [설계와 모델링 · Design and modeling](#se-model) (3)
- [협업과 품질 · Collaboration and quality](#se-team) (5)

<a id="se-proc"></a>

## 개발 프로세스와 애자일 · Development process and agile

팀이 일을 나누고 계획하고 피드백을 받는 방식이에요.  
*How teams split, plan and get feedback on work.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **폭포수 vs 반복형**<br>Waterfall vs iterative | 폭포수는 요구사항→설계→구현→테스트→배포를 한 번씩 차례로 끝내고, 반복형은 작은 단위로 이 과정을 여러 번 돌며 자주 내보내요.<br><sub>Waterfall runs requirements, design, build, test and release once, in order; iterative development loops through them in small slices and ships often.</sub> | 요구가 바뀌기 쉬운 서비스는 반복형이 유리해요. 규제가 강하거나 하드웨어처럼 되돌리기 비싼 분야는 지금도 단계별 관리를 많이 써요.<br><sub>Products whose requirements shift favour iterative work; regulated or hardware projects, where changes are costly, still lean on phase gates.</sub> |
| **애자일 선언**<br>The Agile Manifesto | 2001년 개발자들이 정리한 4가지 가치예요. 프로세스·문서·계약·계획보다 사람, 동작하는 소프트웨어, 고객 협력, 변화 대응을 더 중시해요.<br><sub>Four values written by developers in 2001: people, working software, customer collaboration and responding to change, valued over process, documents, contracts and plans.</sub> | 애자일은 특정 도구나 회의가 아니라 짧게 만들고 피드백 받아 고치는 태도예요. 스크럼·칸반·XP는 이를 실천하는 방법들이에요.<br><sub>Agile is not a tool or a meeting but a habit of building in short loops and adjusting from feedback; Scrum, Kanban and XP are ways to practise it.</sub> |
| **스크럼**<br>Scrum | 1–4주 스프린트 단위로 백로그에서 일을 가져와 만들고, 매일 짧게 공유하고, 끝에 리뷰와 회고를 해요. PO·스크럼 마스터·개발자 세 역할이 있어요.<br><sub>Work is pulled from the backlog into 1–4 week sprints, synced in a short daily scrum, and closed with a review and a retrospective. Three roles: product owner, scrum master, developers.</sub> | 스프린트 중엔 목표를 바꾸지 않는 게 원칙이에요. 회고에서 나온 개선점을 다음 스프린트에 실제로 반영해야 의미가 있어요.<br><sub>Don’t change the sprint goal mid-sprint, and make sure retro actions actually land in the next sprint.</sub> |
| **칸반**<br>Kanban | 일을 카드로 보드에 올리고 "진행 중" 칸의 개수(WIP)를 제한해서, 새로 시작하기보다 끝내는 데 집중하게 해요.<br><sub>Work items sit on a board as cards and the number in progress (WIP) is capped, so the team finishes before starting more.</sub> | 스프린트 없이 계속 흐르는 일(운영, 고객 지원, 유지보수)에 잘 맞아요. 리드 타임과 막힌 칸을 보면 병목이 보여요.<br><sub>Fits continuous work without sprints, like ops, support and maintenance; lead time and stuck columns reveal bottlenecks.</sub> |
| **사용자 스토리와 인수 조건**<br>User stories and acceptance criteria | "누가, 무엇을, 왜"를 한 문장으로 쓰고, 완료를 판단할 구체적인 조건을 붙여요.<br><sub>State who wants what and why in one sentence, then attach concrete conditions that decide when it’s done.</sub> | 인수 조건이 모호하면 "다 됐다"의 기준이 사람마다 달라져요. 잘 쓴 조건은 그대로 테스트 케이스가 돼요.<br><sub>Vague criteria mean everyone has a different idea of done; good criteria become test cases directly.</sub> |
| **번다운 차트와 속도**<br>Burndown and velocity | 스프린트 동안 남은 작업량이 줄어드는 모습을 그리고, 스프린트마다 끝낸 양(속도)으로 다음 계획을 세워요.<br><sub>Plot remaining work shrinking through the sprint, and use how much each sprint finished (velocity) to plan the next.</sub> | 속도는 팀 내부의 계획 도구예요. 팀끼리 비교하거나 성과 지표로 쓰면 포인트만 부풀려져요.<br><sub>Velocity is a team-internal planning tool; comparing teams or using it as a KPI just inflates the points.</sub> |

<a id="se-test"></a>

## 소프트웨어 테스트 · Software testing

버그를 일찍, 싸게 찾는 방법이에요.  
*Ways to find bugs early and cheaply.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **테스트 피라미드**<br>Test pyramid | 빠르고 싼 단위 테스트를 가장 많이, 통합 테스트는 적당히, 느린 E2E 테스트는 핵심 흐름만 두는 구조예요.<br><sub>Lots of fast, cheap unit tests, a moderate layer of integration tests, and slow end-to-end tests only for key flows.</sub> | E2E가 대부분이면 CI가 느리고 자주 깨져요. 실패 원인을 좁히기 쉬운 아래층을 두텁게 하세요.<br><sub>A suite made mostly of E2E tests makes CI slow and flaky; thicken the lower layers, where failures are easy to pinpoint.</sub> |
| **TDD (테스트 주도 개발)**<br>TDD (test-driven development) | 실패하는 테스트를 먼저 쓰고(Red), 통과할 최소 코드를 쓰고(Green), 정리(Refactor)하는 짧은 사이클을 반복해요.<br><sub>Write a failing test (red), write the least code that passes (green), then clean up (refactor), in short repeated cycles.</sub> | 테스트하기 쉬운 구조가 자연스럽게 나와요. 요구가 분명한 로직(계산, 파서, 규칙)에서 특히 효과가 커요.<br><sub>It naturally yields testable designs and pays off most on well-defined logic like calculations, parsers and business rules.</sub> |
| **BDD (행동 주도 개발)**<br>BDD (behaviour-driven development) | Given-When-Then 형식의 문장으로 기대하는 행동을 적고, 그 문장을 그대로 자동화 테스트로 실행해요.<br><sub>Describe expected behaviour as Given–When–Then sentences and run those sentences as automated tests.</sub> | 기획·QA·개발이 같은 문장을 보며 합의할 수 있어요. Cucumber, SpecFlow 같은 도구가 문장을 코드와 연결해요.<br><sub>Product, QA and developers agree on the same text; tools like Cucumber and SpecFlow bind the sentences to code.</sub> |
| **테스트 더블**<br>Test doubles | 테스트할 때 실제 의존성(결제, 메일, DB) 대신 끼워 넣는 대역이에요. Stub·Mock·Fake·Spy로 나뉘어요.<br><sub>Stand-ins for real dependencies such as payments, email and databases during tests: stubs, mocks, fakes and spies.</sub> | Mock을 과하게 쓰면 구현 세부에 묶인 깨지기 쉬운 테스트가 돼요. 가능하면 결과(상태)를 검증하세요.<br><sub>Over-mocking ties tests to implementation details; verify outcomes and state where you can.</sub> |
| **코드 커버리지**<br>Code coverage | 테스트가 코드의 몇 %를 실행했는지예요. 줄(라인) 기준과 분기(브랜치) 기준이 있어요.<br><sub>The share of code your tests execute, measured by lines or by branches.</sub> | 커버리지가 낮은 곳은 확실히 위험하지만, 높다고 안전한 건 아니에요. 숫자 목표보다 핵심 로직의 분기를 챙기세요.<br><sub>Low coverage flags real risk, but high coverage proves little; care about the branches in core logic, not the number.</sub> |
| **경계값 분석 · 동등 분할**<br>Boundary values · equivalence partitions | 입력을 같은 결과를 내는 구간으로 나누고(동등 분할), 구간 경계의 바로 양쪽 값을 집중적으로 테스트해요.<br><sub>Group inputs into ranges that behave the same, then test values on both sides of each boundary.</sub> | > 와 >=, 0과 1, 빈 목록과 하나짜리 목록처럼 버그는 경계에 몰려요. 테스트 케이스 수는 줄이고 효과는 높여요.<br><sub>Bugs cluster at edges: > vs >=, zero vs one, empty vs single-item lists. Fewer test cases, more bugs caught.</sub> |

<a id="se-model"></a>

## 설계와 모델링 · Design and modeling

코드를 쓰기 전에 구조와 흐름, 도메인을 정리하는 도구예요.  
*Tools for shaping structure, flow and domain before code.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **UML 클래스 다이어그램**<br>UML class diagrams | 클래스의 이름·속성·메서드와 클래스 사이의 관계(연관, 합성, 상속)를 그림으로 나타내요.<br><sub>Shows each class’s name, attributes and methods, plus how classes relate: association, composition and inheritance.</sub> | 설계 토론이나 문서화할 때 핵심 관계만 스케치하세요. 코드와 1:1로 모든 걸 그리면 금방 낡아요.<br><sub>Sketch only the key relationships for design talks and docs; diagrams that mirror every line of code go stale fast.</sub> |
| **UML 시퀀스 다이어그램**<br>UML sequence diagrams | 참여자들이 시간 순서대로 주고받는 메시지를 위에서 아래로 그려요.<br><sub>Draws the messages participants exchange, in time order from top to bottom.</sub> | API 연동 설계, 인증 흐름 설명, 장애 원인 분석에 많이 써요. Mermaid 같은 텍스트 도구로 코드처럼 관리할 수 있어요.<br><sub>Handy for API integration design, auth flows and incident analysis; tools like Mermaid keep them in text alongside code.</sub> |
| **DDD · 바운디드 컨텍스트**<br>DDD · bounded contexts | 같은 단어도 맥락마다 의미가 달라요. 도메인을 경계(컨텍스트)로 나누고 각자 자기 모델과 용어를 가져요.<br><sub>The same word means different things in different parts of a business. Split the domain into bounded contexts, each with its own model and vocabulary.</sub> | 거대한 공용 모델 하나가 모든 팀을 묶는 걸 막아줘요. 마이크로서비스 경계를 정할 때 출발점으로 많이 써요.<br><sub>Stops one giant shared model from coupling every team, and is a common starting point for drawing microservice boundaries.</sub> |

<a id="se-team"></a>

## 협업과 품질 · Collaboration and quality

여럿이 함께 오래 유지할 수 있는 소프트웨어를 만드는 원칙이에요.  
*Principles for software many people can maintain for years.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **코드 리뷰와 PR**<br>Code review and pull requests | 변경을 병합하기 전에 동료가 읽고 질문·제안하는 과정이에요. CI 검사와 승인을 거쳐 main에 들어가요.<br><sub>Before a change merges, teammates read it, ask questions and suggest fixes; it lands on main after CI checks and approval.</sub> | PR은 작게 나누고 "왜"를 설명하세요. 스타일은 린터에 맡기고 리뷰는 설계·버그·가독성에 집중해요.<br><sub>Keep PRs small and explain why; leave style to linters and spend review time on design, bugs and readability.</sub> |
| **시맨틱 버저닝**<br>Semantic versioning | MAJOR.MINOR.PATCH 세 숫자로 변경의 성격을 알려요. 호환이 깨지면 MAJOR, 기능 추가는 MINOR, 버그 수정은 PATCH를 올려요.<br><sub>MAJOR.MINOR.PATCH tells users what changed: bump MAJOR for breaking changes, MINOR for features, PATCH for fixes.</sub> | npm의 ^·~ 범위가 이 약속을 믿고 자동 업데이트해요. 라이브러리를 공개한다면 꼭 지켜야 해요. 0.x는 언제든 깨질 수 있다는 뜻이에요.<br><sub>npm’s ^ and ~ ranges trust this promise when auto-updating, so libraries must keep it; 0.x versions may break at any time.</sub> |
| **기술 부채**<br>Technical debt | 지금 빨리 가려고 택한 임시방편이 나중에 이자처럼 개발 속도를 갉아먹는 현상이에요.<br><sub>Shortcuts taken to go fast now that later charge interest by slowing every change.</sub> | 빚 자체는 전략이 될 수 있지만 기록하고 갚아야 해요. 스프린트의 일정 비율을 정리 작업에 꾸준히 쓰는 팀이 많아요.<br><sub>Debt can be a valid strategy if it’s recorded and repaid; many teams reserve a fixed share of each sprint for cleanup.</sub> |
| **콘웨이의 법칙**<br>Conway’s law | 시스템의 구조는 그것을 만드는 조직의 소통 구조를 닮아요.<br><sub>A system’s structure mirrors the communication structure of the organization that builds it.</sub> | 원하는 아키텍처가 있다면 팀 구성부터 맞추세요(역 콘웨이 전략). 마이크로서비스는 팀 자율성과 함께 갈 때 효과가 있어요.<br><sub>If you want a certain architecture, organize teams to match it first (inverse Conway); microservices pay off only with autonomous teams.</sub> |
| **브룩스의 법칙**<br>Brooks’s law | 늦어진 프로젝트에 인력을 추가하면 더 늦어져요. 사람이 n명이면 소통 경로는 n(n−1)/2개로 늘어나요.<br><sub>Adding people to a late project makes it later; n people have n(n−1)/2 communication paths.</sub> | 일정이 밀리면 사람을 더하기보다 범위를 줄이세요. 팀을 작게 유지하고 경계를 분명히 하면 소통 비용이 줄어요.<br><sub>When you slip, cut scope rather than add people; small teams with clear boundaries keep communication cheap.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
