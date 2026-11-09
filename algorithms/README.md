# 알고리즘 · Algorithms

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/algorithms/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

정렬 알고리즘 8종을 실제로 돌려서 보여주고, 이진 탐색·투 포인터·분할 정복·동적 계획법·그리디·백트래킹, 그리고 BFS·DFS·다익스트라·위상 정렬·최소 신장 트리·A*까지 다뤄요.

Eight sorting algorithms run for real, plus binary search, two pointers, divide and conquer, dynamic programming, greedy, backtracking, BFS, DFS, Dijkstra, topological sort, minimum spanning trees and A*.

**3개 주제 · 24개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [실제로 돌려 보는 정렬 알고리즘 · Sorting algorithms, run for real](#al-sort) (8)
- [문제를 줄이는 기법들 · Techniques that shrink problems](#al-tech) (10)
- [연결을 따라가는 알고리즘 · Algorithms that follow connections](#al-graph) (6)

<a id="al-sort"></a>

## 실제로 돌려 보는 정렬 알고리즘 · Sorting algorithms, run for real

같은 숫자들을 정렬해도 방법에 따라 비교와 이동이 전혀 달라요. 주황은 비교, 빨강은 교환, 파랑은 기준(피벗), 초록은 제자리를 찾은 값이에요.  
*The same numbers sort very differently depending on the method. Orange compares, red swaps, blue marks the pivot and green means a value is in its final place.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **버블 정렬**<br><sub>Bubble sort</sub> | 이웃한 두 값을 비교해 큰 값을 뒤로 보내기를 반복해요. 한 바퀴마다 가장 큰 값이 끝으로 떠올라요.<br><sub>Repeatedly compares neighbours and moves the larger one back, so the largest value bubbles to the end each pass.</sub> | 원리를 배우기엔 좋지만 O(n²)라 실무에선 쓰지 않아요. 한 바퀴 동안 교환이 없으면 바로 끝내는 최적화가 가능해요.<br><sub>Good for learning but O(n²), so never used in practice. It can stop early when a pass makes no swaps.</sub> |
| **선택 정렬**<br><sub>Selection sort</sub> | 남은 값 중 가장 작은 것을 찾아 맨 앞과 바꾸기를 반복해요.<br><sub>Finds the smallest remaining value and swaps it to the front, over and over.</sub> | 교환 횟수가 최대 n-1번으로 적어서 쓰기 비용이 큰 메모리에서 의미가 있어요. 비교는 항상 O(n²)이에요.<br><sub>It makes at most n−1 swaps, which matters when writes are expensive, but always makes O(n²) comparisons.</sub> |
| **삽입 정렬**<br><sub>Insertion sort</sub> | 카드 정리하듯 다음 값을 집어 이미 정렬된 앞부분의 알맞은 자리에 끼워 넣어요.<br><sub>Like sorting cards in your hand: pick the next value and slide it into place in the sorted front part.</sub> | 거의 정렬된 데이터에서 O(n)에 가깝게 빨라서, 실무 정렬(팀소트 등)이 작은 구간에 이 방법을 섞어 써요.<br><sub>It approaches O(n) on nearly sorted data, which is why production sorts such as Timsort use it for small runs.</sub> |
| **병합 정렬**<br><sub>Merge sort</sub> | 배열을 반으로 나누고, 정렬된 두 부분을 하나로 합치기를 반복해요. 언제나 O(n log n)이에요.<br><sub>Splits the array in half and repeatedly merges sorted halves into one. Always O(n log n).</sub> | 안정 정렬이 필요하거나, 메모리에 다 안 들어가는 큰 파일을 정렬(외부 정렬)할 때 써요. 합칠 때 추가 공간이 필요해요.<br><sub>Use it when you need a stable sort or must sort files too big for memory (external sorting). Merging needs extra space.</sub> |
| **퀵 정렬**<br><sub>Quicksort</sub> | 기준값(피벗)을 정해 작은 값은 왼쪽, 큰 값은 오른쪽으로 나누고 양쪽을 다시 같은 방식으로 정렬해요.<br><sub>Pick a pivot, move smaller values left and larger ones right, then sort each side the same way.</sub> | 평균 O(n log n)에 메모리를 적게 써서 가장 많이 쓰여요. 이미 정렬된 데이터에서 피벗을 잘못 고르면 O(n²)이라 무작위나 중앙값 피벗을 써요.<br><sub>Average O(n log n) with little extra memory, so it is the most widely used. A bad pivot on sorted data gives O(n²), so pick a random or median pivot.</sub> |
| **힙 정렬**<br><sub>Heapsort</sub> | 배열을 최대 힙으로 만든 뒤, 맨 위의 최댓값을 끝으로 보내고 다시 힙을 정리하기를 반복해요.<br><sub>Builds a max-heap, then repeatedly moves the top (the maximum) to the end and restores the heap.</sub> | 최악에도 O(n log n), 추가 공간 O(1)이 보장돼요. 캐시 효율이 낮아 평균적으로는 퀵 정렬보다 느려요.<br><sub>Guarantees O(n log n) even in the worst case with O(1) extra space, but poor cache behaviour makes it slower than quicksort on average.</sub> |
| **기수 정렬**<br><sub>Radix sort</sub> | 비교하지 않고 일의 자리, 십의 자리처럼 자릿수별로 묶어 차례로 정렬해요. 각 단계는 안정 정렬이어야 해요.<br><sub>Sorts without comparisons by grouping on each digit in turn, ones then tens. Each pass must be stable.</sub> | 정해진 길이의 정수, 날짜, 문자열 키를 대량으로 정렬할 때 O(n log n)보다 빨라요.<br><sub>Beats O(n log n) for large volumes of fixed-length integers, dates or string keys.</sub> |
| **안정 정렬**<br><sub>Stable sort</sub> | 값이 같은 원소들이 정렬 후에도 원래 순서를 지키면 안정 정렬이에요.<br><sub>A sort is stable if equal elements keep their original order.</sub> | "날짜순으로 정렬한 다음 이름순으로 정렬"처럼 여러 기준을 차례로 적용할 때 꼭 필요해요. 병합·삽입·팀소트는 안정, 퀵·힙은 보통 불안정해요.<br><sub>Essential when sorting by several keys in turn, such as by date then by name. Merge, insertion and Timsort are stable; quick and heap sorts usually are not.</sub> |

<a id="al-tech"></a>

## 문제를 줄이는 기법들 · Techniques that shrink problems

코딩 테스트와 실무 최적화에 반복해서 나오는 생각의 틀이에요.  
*Patterns of thinking that recur in coding interviews and real optimization work.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **이진 탐색**<br><sub>Binary search</sub> | 정렬된 배열의 가운데와 비교해서 찾는 범위를 매번 절반으로 줄여요.<br><sub>Compares with the middle of a sorted array and halves the search range every time.</sub> | 정렬된 데이터 찾기뿐 아니라 "조건을 만족하는 최솟값"을 찾는 매개변수 탐색에도 써요. 경계 조건(lo ≤ hi, mid 계산)에서 실수가 많아요.<br><sub>Beyond lookups, it finds “the smallest value that satisfies a condition” (parametric search). Off-by-one errors in the bounds are common.</sub> |
| **투 포인터**<br><sub>Two pointers</sub> | 양쪽 끝에서 출발한 두 포인터를 조건에 따라 안쪽으로 움직여, 이중 반복 없이 답을 찾아요.<br><sub>Two pointers start at either end and move inward based on a condition, avoiding nested loops.</sub> | 정렬된 배열의 두 수의 합, 중복 제거, 회문 검사, 두 리스트 합치기에 써요.<br><sub>Used for two-sum on sorted arrays, deduplication, palindrome checks and merging two lists.</sub> |
| **슬라이딩 윈도우**<br><sub>Sliding window</sub> | 정해진 크기의 창을 한 칸씩 밀면서 빠지는 값과 들어오는 값만 반영해요.<br><sub>Slides a fixed-size window one step at a time, updating only for the value leaving and the value entering.</sub> | 최근 N분 요청 수, 연속 구간의 최대 합, 중복 없는 가장 긴 문자열에 써요. 레이트 리미터도 같은 원리예요.<br><sub>Used for requests in the last N minutes, maximum sums of runs and the longest substring without repeats. Rate limiters work the same way.</sub> |
| **누적 합**<br><sub>Prefix sums</sub> | 앞에서부터의 합을 미리 배열에 저장해 두면, 어떤 구간의 합도 뺄셈 한 번으로 구해요.<br><sub>Store running totals once, and any range sum becomes a single subtraction.</sub> | 기간별 매출 합계, 이미지의 영역 합(2차원 누적 합), 구간 쿼리가 많은 문제에 써요.<br><sub>Used for revenue over date ranges, 2D area sums in images and any problem with many range queries.</sub> |
| **재귀와 콜 스택**<br><sub>Recursion · Call stack</sub> | 함수가 자기 자신을 부르며 문제를 작게 쪼개요. 호출할 때마다 콜 스택에 쌓였다가 결과를 돌려주며 빠져요.<br><sub>A function calls itself on smaller pieces. Each call stacks up on the call stack and unwinds as results return.</sub> | 트리·폴더 순회, 분할 정복, 백트래킹의 기본이에요. 종료 조건이 꼭 있어야 하고, 너무 깊으면 반복문으로 바꾸세요.<br><sub>The basis of tree and folder traversal, divide and conquer and backtracking. It needs a base case; if it gets too deep, convert it to a loop.</sub> |
| **동적 계획법**<br><sub>Dynamic programming</sub> | 작은 문제의 답을 표에 저장해 두고, 큰 문제를 풀 때 다시 계산하지 않고 꺼내 써요.<br><sub>Store answers to small subproblems in a table and reuse them instead of recomputing when solving bigger ones.</sub> | 겹치는 부분 문제와 최적 부분 구조가 있을 때 써요. 경로 수, 배낭 문제, 편집 거리, 최장 증가 수열이 대표적이에요.<br><sub>Use it when subproblems overlap and optimal substructure holds: path counts, knapsack, edit distance, longest increasing subsequence.</sub> |
| **LCS · 편집 거리**<br><sub>Longest common subsequence</sub> | 두 문자열을 표로 놓고 칸마다 "여기까지의 최선"을 채워 공통 부분 수열을 구해요. 2차원 DP의 대표 예제예요.<br><sub>Lay two strings out as a table and fill each cell with the best result so far to find the longest common subsequence: the classic 2D DP.</sub> | git diff, 맞춤법 추천, DNA 비교가 같은 원리(LCS·편집 거리)예요.<br><sub>git diff, spelling suggestions and DNA comparison all rest on the same idea (LCS and edit distance).</sub> |
| **그리디**<br><sub>Greedy algorithm</sub> | 매 순간 가장 좋아 보이는 선택을 하고 되돌아보지 않아요. 빠르지만 항상 최적인 건 아니에요.<br><sub>Make the choice that looks best right now and never look back. Fast, but not always optimal.</sub> | 동전 거스름돈, 회의실 배정, 허프만 압축, 크루스칼·다익스트라가 그리디예요. 최적임을 증명하거나 반례를 확인하고 쓰세요.<br><sub>Making change, meeting-room scheduling, Huffman coding, Kruskal and Dijkstra are greedy. Prove optimality or check for counterexamples first.</sub> |
| **백트래킹**<br><sub>Backtracking</sub> | 하나씩 선택해 나가다가 조건을 어기면 바로 이전 선택으로 되돌아가 다른 길을 시도해요.<br><sub>Make choices one at a time, and the moment a constraint breaks, undo the last choice and try another path.</sub> | N-퀸, 스도쿠, 조합·순열 생성, 제약 만족 문제에 써요. 안 되는 가지를 일찍 잘라낼수록(가지치기) 빨라져요.<br><sub>Used for N-queens, sudoku, generating combinations and permutations, and constraint satisfaction. The earlier you prune dead branches, the faster it is.</sub> |
| **비트마스크**<br><sub>Bitmask</sub> | 정수의 각 비트를 "포함/미포함"으로 써서 부분집합을 숫자 하나로 표현해요.<br><sub>Use each bit of an integer as “in or out” to represent a subset with a single number.</sub> | 부분집합 전체 탐색, 방문 상태를 저장하는 DP(외판원 문제), 권한·옵션 플래그에 써요.<br><sub>Used to enumerate subsets, store visited states in DP (travelling salesman) and encode permission or option flags.</sub> |

<a id="al-graph"></a>

## 연결을 따라가는 알고리즘 · Algorithms that follow connections

지도, SNS, 의존성, 네트워크처럼 연결된 데이터를 다루는 방법이에요.  
*How to work with connected data such as maps, social networks, dependencies and networks.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **너비 우선 탐색**<br><sub>BFS · Breadth-first search</sub> | 시작점에서 가까운 정점부터 층층이 넓혀 가요. 큐를 써요.<br><sub>Expands layer by layer from the start, nearest vertices first, using a queue.</sub> | 가중치 없는 그래프의 최단 거리, 친구의 친구 찾기, 웹 크롤링, 미로 최단 경로에 써요.<br><sub>Finds shortest paths in unweighted graphs and is used for friends-of-friends, web crawling and maze solving.</sub> |
| **깊이 우선 탐색**<br><sub>DFS · Depth-first search</sub> | 한 방향으로 끝까지 들어갔다가 막히면 되돌아와 다른 길을 가요. 스택이나 재귀를 써요.<br><sub>Goes as deep as possible in one direction, then backs up and tries another, using a stack or recursion.</sub> | 연결 요소 찾기, 사이클 검사, 위상 정렬, 미로 생성, 백트래킹의 뼈대예요.<br><sub>The backbone of connected components, cycle detection, topological sort, maze generation and backtracking.</sub> |
| **다익스트라**<br><sub>Dijkstra’s algorithm</sub> | 아직 확정되지 않은 정점 중 가장 가까운 것을 확정하고, 그 이웃까지의 거리를 줄여 나가요.<br><sub>Repeatedly settles the closest unsettled vertex and relaxes the distances to its neighbours.</sub> | 내비게이션, 네트워크 라우팅(OSPF), 게임 길찾기의 기본이에요. 음수 가중치가 있으면 벨만-포드를 써요.<br><sub>The basis of navigation, network routing (OSPF) and game pathfinding. With negative weights, use Bellman-Ford.</sub> |
| **위상 정렬**<br><sub>Topological sort</sub> | "A 다음에 B" 같은 선후 관계를 모두 지키는 순서를 만들어요. 들어오는 간선이 없는 것부터 꺼내요.<br><sub>Produces an order that respects every “A before B” dependency by repeatedly taking nodes with no incoming edges.</sub> | 빌드 시스템, 패키지 설치 순서, 작업 스케줄링, 엑셀 수식 계산 순서에 써요. 사이클이 있으면 불가능해요.<br><sub>Used by build systems, package installers, job schedulers and spreadsheet recalculation. Impossible if there is a cycle.</sub> |
| **최소 신장 트리**<br><sub>Minimum spanning tree · Kruskal</sub> | 모든 정점을 가장 적은 비용으로 잇는 트리예요. 크루스칼은 가벼운 간선부터 사이클이 생기지 않는 것만 골라요.<br><sub>The cheapest tree that connects every vertex. Kruskal’s algorithm takes edges lightest first, skipping any that would form a cycle.</sub> | 통신망·전력망·도로 설계, 클러스터링에 써요. 사이클 확인에 유니온 파인드를 써요.<br><sub>Used to design telecom, power and road networks and for clustering. Union-find detects the cycles.</sub> |
| **A* 탐색**<br><sub>A* search</sub> | 지나온 거리에 목표까지의 추정 거리를 더한 값이 작은 칸부터 탐색해서, 목표 쪽으로 똑똑하게 나아가요.<br><sub>Explores cells with the lowest cost so far plus an estimate of the remaining distance, heading intelligently toward the goal.</sub> | 게임 캐릭터 이동, 로봇 경로 계획, 지도 길찾기에 써요. 추정값이 실제보다 크지 않아야 최단 경로가 보장돼요.<br><sub>Used for game character movement, robot path planning and map routing. The estimate must never exceed the true distance to guarantee the shortest path.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
