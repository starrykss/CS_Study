# 이산수학 · Discrete mathematics

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/discrete-math/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

명제 논리와 진리표, 집합과 관계, 함수, 수학적 귀납법, 경우의 수, 비둘기집 원리, 모듈러 연산과 확률, 그래프 이론까지. 코드에 그대로 나오는 수학만 골랐어요.

Propositional logic and truth tables, sets and relations, functions, induction, counting, the pigeonhole principle, modular arithmetic, probability and graph theory: the math that shows up directly in code.

**4개 주제 · 16개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [집합과 논리 · Sets and logic](#dm-sets) (4)
- [경우의 수와 확률 · Counting and probability](#dm-count) (4)
- [함수, 관계, 정수론 · Functions, relations and number theory](#dm-relnum) (4)
- [그래프 이론 · Graph theory](#dm-graphs) (4)

<a id="dm-sets"></a>

## 집합과 논리 · Sets and logic

조건문, 쿼리, 증명의 바탕이 되는 언어예요.  
*The language beneath conditions, queries and proofs.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **집합 연산**<br>Set operations | 합집합(∪), 교집합(∩), 차집합(−), 대칭차(△)로 두 집합을 조합해요.<br><sub>Combine two sets with union (∪), intersection (∩), difference (−) and symmetric difference (△).</sub> | SQL의 UNION·INTERSECT·EXCEPT, 언어의 Set 타입, 권한 계산(허용 − 차단)이 모두 집합 연산이에요.<br><sub>SQL’s UNION, INTERSECT and EXCEPT, Set types and permission maths (allowed − denied) are all set operations.</sub> |
| **명제와 함의**<br>Propositions · Implication | "p이면 q"는 p가 참인데 q가 거짓일 때만 거짓이에요. 대우(¬q → ¬p)와는 항상 진릿값이 같아요.<br><sub>“p implies q” is false only when p is true and q is false, and it always matches its contrapositive (¬q → ¬p).</sub> | 조건문 리팩터링, 테스트 케이스 설계, 요구사항 해석에서 "그 외의 경우"를 빠뜨리지 않게 해 줘요.<br><sub>It keeps you from missing “the other cases” when refactoring conditions, designing tests or reading requirements.</sub> |
| **한정자 (∀, ∃)**<br>Quantifiers (∀, ∃) | ∀는 "모든 원소가", ∃는 "적어도 하나가" 조건을 만족하는지 말해요. ∀는 반례 하나로, ∃는 예 하나로 결정돼요.<br><sub>∀ says every element satisfies a condition; ∃ says at least one does. One counterexample settles ∀, one example settles ∃.</sub> | 코드의 every/some, SQL의 ALL/EXISTS예요. "모든 X가 아니다"와 "X인 게 없다"를 헷갈리지 마세요.<br><sub>They are every/some in code and ALL/EXISTS in SQL. Don’t confuse “not all X” with “no X”.</sub> |
| **수학적 귀납법**<br>Mathematical induction | 첫 번째 경우가 참이고, k번째가 참이면 k+1번째도 참임을 보이면 모든 자연수에서 참이에요.<br><sub>If the first case holds and case k implies case k + 1, the statement holds for every natural number.</sub> | 재귀 함수의 정확성과 반복문 불변식 증명이 같은 구조예요. 종료 조건(기초)과 진행(귀납)을 함께 확인하세요.<br><sub>Proving recursion correct and reasoning with loop invariants follow the same shape: check the base case and the step.</sub> |

<a id="dm-count"></a>

## 경우의 수와 확률 · Counting and probability

가능성을 세고 불확실성을 다루는 도구예요.  
*Tools for counting possibilities and handling uncertainty.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **순열과 조합**<br>Permutations · Combinations | 순서를 따지면 순열(nPr), 순서를 무시하면 조합(nCr)이에요. 조합은 순열을 r!로 나눈 값이에요.<br><sub>Counting with order gives permutations (nPr); without order, combinations (nCr = nPr / r!).</sub> | 완전 탐색이 가능한 크기인지, 비밀번호 무차별 대입이 얼마나 걸리는지, 테스트 조합이 몇 개인지 계산해요.<br><sub>Use it to judge whether brute force is feasible, how strong a password is or how many test combinations exist.</sub> |
| **비둘기집 원리**<br>Pigeonhole principle | n개의 칸에 n+1개를 넣으면 적어도 한 칸에는 2개 이상이 들어가요.<br><sub>Put n + 1 items into n boxes and at least one box holds two.</sub> | 해시 충돌은 피할 수 없다는 근거예요. 23명만 모여도 생일이 같은 쌍이 있을 확률이 50%를 넘어요(생일 역설).<br><sub>It proves hash collisions are unavoidable. With just 23 people, a shared birthday is more likely than not (birthday paradox).</sub> |
| **이항계수와 파스칼의 삼각형**<br>Binomial coefficients · Pascal’s triangle | 각 수는 바로 위 두 수의 합이고, n번째 줄은 nC0 … nCn이에요.<br><sub>Each number is the sum of the two above it; row n lists nC0 … nCn.</sub> | nCk를 DP로 계산하는 방법이자, 격자 경로 수 세기 같은 문제의 기본이에요. 큰 수는 오버플로에 주의하세요.<br><sub>It is how you compute nCk with DP and the basis of grid-path counting; watch for overflow on big values.</sub> |
| **조건부 확률과 베이즈**<br>Conditional probability · Bayes | 어떤 일이 일어났다는 조건에서의 확률이에요. 드문 사건은 검사가 정확해도 양성의 대부분이 오탐일 수 있어요.<br><sub>Probability given that something has happened. For rare events, most positives can be false even with an accurate test.</sub> | 이상 탐지 알림이 거의 다 오탐인 이유, 스팸 필터, A/B 테스트 해석에 꼭 필요한 감각이에요.<br><sub>It explains why anomaly alerts are mostly false alarms and underpins spam filters and A/B test interpretation.</sub> |

<a id="dm-relnum"></a>

## 함수, 관계, 정수론 · Functions, relations and number theory

데이터를 짝짓고 나누는 규칙이에요.  
*Rules for pairing and partitioning data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **함수: 단사·전사·전단사**<br>Injective · Surjective · Bijective | 단사는 다른 입력이 다른 출력으로, 전사는 모든 출력이 어떤 입력에서, 전단사는 둘 다라서 거꾸로 되돌릴 수 있어요.<br><sub>Injective: different inputs give different outputs. Surjective: every output is hit. Bijective: both, so it can be inverted.</sub> | 해시는 단사가 아니라 충돌이 나고, 암호화·인코딩은 전단사라 복원돼요. ID 매핑 설계에도 써요.<br><sub>Hashes aren’t injective, so they collide; encryption and encodings are bijective, so they decode. Useful for designing ID mappings.</sub> |
| **동치 관계**<br>Equivalence relations | 반사·대칭·추이를 만족하는 관계는 원소들을 겹치지 않는 묶음(동치류)으로 나눠요.<br><sub>A reflexive, symmetric and transitive relation splits elements into non-overlapping classes.</sub> | id % N 샤딩, 대소문자 무시 비교, 같은 사람으로 묶는 중복 제거가 모두 동치류 만들기예요.<br><sub>Sharding by id % N, case-insensitive matching and deduplicating “the same person” all form equivalence classes.</sub> |
| **모듈러 연산**<br>Modular arithmetic | 나눈 나머지만 보는 연산이에요. 시계처럼 끝에 닿으면 처음으로 돌아가요.<br><sub>Arithmetic that keeps only remainders, wrapping around like a clock.</sub> | 해시 테이블 인덱스, 원형 버퍼, 요일 계산, RSA 암호가 모두 모듈러 연산이에요. 음수 나머지는 언어마다 다르니 조심하세요.<br><sub>Hash indexes, ring buffers, weekday maths and RSA use it. Negative remainders differ between languages.</sub> |
| **유클리드 호제법**<br>Euclidean algorithm | 두 수의 최대공약수를 큰 수를 작은 수로 나눈 나머지로 바꾸기를 반복해 빠르게 구해요.<br><sub>Finds the greatest common divisor by repeatedly replacing the larger number with the remainder.</sub> | 분수 약분, 화면 비율 계산, RSA 키 생성(확장 유클리드)에 써요. 반복 횟수가 O(log n)이라 아주 커도 빨라요.<br><sub>Used to reduce fractions, compute aspect ratios and generate RSA keys (extended Euclid). It runs in O(log n).</sub> |

<a id="dm-graphs"></a>

## 그래프 이론 · Graph theory

연결 구조를 수학적으로 다뤄요.  
*The mathematics of connections.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **그래프 기본 용어**<br>Graph basics | 정점과 간선으로 관계를 표현하고, 차수·경로·사이클·연결 같은 말로 구조를 설명해요.<br><sub>Vertices and edges model relations; degree, path, cycle and connectivity describe their structure.</sub> | 모든 그래프에서 차수의 합은 간선 수의 2배예요. 데이터를 그래프로 볼 수 있으면 BFS·최단 경로 같은 도구를 바로 쓸 수 있어요.<br><sub>In any graph the degrees sum to twice the edges. Seeing data as a graph unlocks tools like BFS and shortest paths.</sub> |
| **오일러 경로**<br>Euler path | 모든 간선을 정확히 한 번씩 지나는 경로예요. 홀수 차수인 정점이 0개나 2개일 때만 존재해요.<br><sub>A route that uses every edge exactly once; it exists only when 0 or 2 vertices have odd degree.</sub> | 쾨니히스베르크 다리 문제에서 그래프 이론이 시작됐어요. 우편 배달·도로 청소 경로 최적화에 써요.<br><sub>Graph theory began with the Königsberg bridges. It is used for mail delivery and street-sweeping routes.</sub> |
| **트리의 성질**<br>Properties of trees | 사이클 없이 모두 연결된 그래프로, 정점 n개면 간선은 항상 n−1개이고 두 점 사이 경로가 하나뿐이에요.<br><sub>A connected graph with no cycles: n vertices always have n − 1 edges and exactly one path between any two.</sub> | 간선을 더하면 사이클, 빼면 분리가 생겨요. 네트워크 스위치의 루프 방지(STP), 최소 신장 트리가 이 성질을 써요.<br><sub>Add an edge and you get a cycle; remove one and it splits. Spanning-tree protocol and minimum spanning trees rely on this.</sub> |
| **그래프 색칠**<br>Graph colouring | 이웃한 정점끼리 다른 색이 되도록 칠할 때 필요한 최소 색 수를 구하는 문제예요.<br><sub>Colour vertices so neighbours differ, using as few colours as possible.</sub> | 시험 시간표, 회의실 배정, 컴파일러 레지스터 할당, 주파수 배정이 모두 이 문제예요. 일반적으로 어렵지만 그리디로 꽤 잘 풀려요.<br><sub>Exam timetables, room booking, register allocation and frequency planning are all colouring; it is hard in general but greedy works well.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
