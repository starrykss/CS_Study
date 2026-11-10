(() => {
const { scene, node, edge, cell, text, arrow, pill, item, sec, page, C, sortScene } = CZ;
CZ.tr({
"이웃한 두 값을 비교해서": "Compare two neighbours",
"앞이 더 크면 자리를 바꿔요": "Swap if the left one is bigger",
"한 바퀴 돌면 가장 큰 값이 맨 뒤로": "After one pass the largest value is at the end",
"끝 · 비교 횟수 O(n²)": "Done · O(n²) comparisons",
"남은 것 중 가장 작은 값을 찾아요": "Find the smallest of the rest",
"찾은 최솟값을 맨 앞과 바꿔요": "Swap that minimum to the front",
"교환은 적지만 비교는 항상 O(n²)": "Few swaps, but always O(n²) comparisons",
"다음 카드를 집어서": "Pick up the next card",
"정렬된 앞부분의 알맞은 자리에 끼워요": "and slide it into place in the sorted front",
"거의 정렬된 데이터에선 O(n)에 가까워요": "Close to O(n) on nearly sorted data",
"1개씩을 2개로 합치며 정렬": "Merge pairs of 1 into sorted 2s",
"2개씩을 4개로": "2s into 4s",
"4개씩을 8개로": "4s into 8",
"항상 O(n log n) · 합칠 때 추가 공간이 필요해요": "Always O(n log n) · merging needs extra space",
"마지막 값을 기준(피벗)으로 잡고": "Take the last value as the pivot",
"피벗보다 작으면 왼쪽으로 보내요": "Values smaller than the pivot go left",
"피벗이 제자리를 찾았어요 · 양쪽을 다시 같은 방법으로": "The pivot is in place · repeat on each side",
"평균 O(n log n) · 실무 정렬의 기본": "O(n log n) on average · the everyday sort",
"배열을 최대 힙으로 만들어요": "Turn the array into a max-heap",
"맨 위(최댓값)를 끝으로 보내고": "Move the top (the max) to the end",
"남은 힙을 다시 정리해요": "then repair the remaining heap",
"항상 O(n log n) · 추가 공간 O(1)": "Always O(n log n) · O(1) extra space",
"두 자리 수를 자릿수별로 정렬해요": "Sort two-digit numbers digit by digit",
"① 일의 자리 기준 (같으면 순서 유지)": "① By the ones digit (ties keep their order)",
"② 십의 자리 기준 → 전체가 정렬돼요": "② By the tens digit → fully sorted",
"비교 없이 O(d·n) · 숫자·문자열 키에 강해요": "No comparisons, O(d·n) · great for numeric keys",
"정렬된 배열에서 45를 찾아요": "Find 45 in a sorted array",
"23 < 45 → 오른쪽 절반만": "23 < 45 → keep the right half",
"56 > 45 → 왼쪽 절반만": "56 > 45 → keep the left half",
"38 < 45 → 오른쪽": "38 < 45 → go right",
"찾았어요 · 비교 4번 (11개 중)": "Found · 4 comparisons out of 11",
"한 번에 절반씩 버려서 O(log n) · 10억 개도 30번이면 끝": "Halving each time is O(log n) · 1 billion items in 30 steps",
"정렬된 배열에서 합이 15인 두 수 찾기": "Find two numbers that sum to 15",
"크면 R을 왼쪽으로": "Too big: move R left",
"작으면 L을 오른쪽으로": "Too small: move L right",
"아직 작아요": "Still too small",
"찾았어요": "Found it",
"이중 반복 O(n²) 대신 한 번 훑기 O(n)": "One pass, O(n), instead of nested loops, O(n²)",
"연속한 3칸의 합 중 최대 찾기": "Find the largest sum of 3 neighbours",
"한 칸 밀 때 빠지는 값을 빼고 들어오는 값만 더해요": "On each slide, subtract the leaving value, add the new one",
"최대 11": "Max is 11",
"매번 다시 더하지 않아서 O(n)": "No re-adding each time, so O(n)",
"P[i] = P[i-1] + A[i] · 앞에서부터 누적": "P[i] = P[i-1] + A[i] · a running total",
"A[2..5]의 합 = P[6] − P[2] = 23 − 4 = 19": "Sum of A[2..5] = P[6] − P[2] = 23 − 4 = 19",
"한 번 O(n)으로 만들어 두면 어떤 구간 합도 O(1)": "Build once in O(n), then any range sum is O(1)",
"← 1 반환": "← returns 1",
"← 2 반환": "← returns 2",
"← 6 반환": "← returns 6",
"함수를 부르면 호출 스택에 쌓여요": "Each call is pushed onto the call stack",
"종료 조건(fact(1))에서 더 내려가지 않아요": "The base case fact(1) stops the descent",
"위에서부터 결과를 돌려주며 빠져요": "Results return from the top as frames pop",
"종료 조건이 없으면 스택이 넘쳐요 (스택 오버플로)": "Without a base case the stack overflows",
"피보나치를 표에 차례로 채워요": "Fill the Fibonacci table in order",
"F[i] = F[i-1] + F[i-2] · 이미 구한 값을 다시 써요": "F[i] = F[i-1] + F[i-2] · reuse answers already found",
"그냥 재귀는 O(2ⁿ), 표를 쓰면 O(n) · 이것이 동적 계획법": "Plain recursion is O(2ⁿ), the table is O(n) · that is DP",
"작은 문제의 답을 저장해 큰 문제를 풀어요": "Store small answers to solve big problems",
"\"ABCD\"와 \"ACD\"의 가장 긴 공통 부분 수열": "Longest common subsequence of \"ABCD\" and \"ACD\"",
"글자가 같으면 대각선 + 1, 다르면 위·왼쪽 중 큰 값": "Match: diagonal + 1 · otherwise the larger of up and left",
"LCS 길이 3 (\"ACD\") · diff·버전 비교의 원리": "LCS length 3 (\"ACD\") · how diff works",
"남은 금액 760원": "760 left",
"남은 금액 260원": "260 left",
"남은 금액 160원": "160 left",
"남은 금액 60원": "60 left",
"남은 금액 10원": "10 left",
"0원 · 동전 5개": "0 · 5 coins",
"지금 쓸 수 있는 가장 큰 동전부터 골라요": "Always take the largest coin that fits",
"매 순간 최선을 고르면": "Taking the best choice each moment",
"1·3·4원 단위로 6원을 만들면 4+1+1, 최적은 3+3": "With coins 1, 3, 4, making 6 gives 4+1+1, but 3+3 is best",
"4×4 판에 서로 공격하지 않게 퀸 4개 놓기": "Place 4 queens on a 4×4 board, none attacking",
"한 줄씩 놓다가": "Place one row at a time",
"막히면 이전 선택을 되돌려요 (백트래킹)": "At a dead end, undo the last choice (backtrack)",
"해를 찾았어요": "Solution found",
"안 되는 가지는 일찍 잘라 탐색을 줄여요": "Pruning dead branches early saves work",
"3비트 숫자 하나가 부분집합 하나": "One 3-bit number = one subset",
"0부터 7까지 세면 모든 부분집합 2³개를 돌아요": "Counting 0 to 7 visits all 2³ subsets",
"포함 여부 확인 x &amp; (1&lt;&lt;i) · DP·권한 플래그에 써요": "Test with x &amp; (1&lt;&lt;i) · used in DP and permission flags",
"가까운 것부터 층층이 · 가중치 없는 최단 거리": "Layer by layer · shortest paths without weights",
"A에서 너비 우선 탐색 (큐 사용)": "Breadth-first search from A (a queue)",
"A에서 깊이 우선 탐색 · 끝까지 갔다가 되돌아와요": "Depth-first from A · go deep, then back up",
"A에서 모든 정점까지의 최단 거리": "Shortest distance from A to every vertex",
"가장 가까운 미확정 정점을 확정하고 이웃 거리를 줄여요": "Settle the closest vertex, then relax its neighbours",
"음수 가중치가 없을 때 O(E log V) · 지도 길찾기의 기본": "O(E log V) without negative weights · map routing",
"선수 과목이 있는 과목들을 들을 순서 정하기": "Order courses so prerequisites come first",
"들어오는 화살표가 없는 것부터 꺼내고, 그 화살표를 지워요": "Take a node with no incoming arrows, remove its arrows",
"사이클이 없는 그래프에서만 가능 · 빌드 순서·작업 스케줄링": "Only without cycles · build order, job scheduling",
"모든 점을 가장 싸게 잇기 (크루스칼)": "Connect every point as cheaply as possible (Kruskal)",
"가벼운 간선부터, 사이클만 피하면 최소 신장 트리 · 총 16": "Lightest edges first, skipping cycles · total 16",
"S에서 G까지 벽을 피해 가는 길": "A path from S to G around the walls",
"지나온 거리 + 남은 거리 추정값이 작은 칸부터 넓혀요": "Expand the cell with the lowest cost + estimate first",
"입력": "Input",
"안정": "Stable",
"불안정": "Unstable",
"같은 값 3이 두 개 있어요 (a가 먼저)": "There are two 3s (a comes first)",
"안정 정렬: 같은 값은 원래 순서 그대로 (a → b)": "Stable: equal values keep their order (a → b)",
"불안정 정렬: 같은 값의 순서가 바뀔 수 있어요": "Unstable: equal values may swap order",
"여러 기준으로 차례로 정렬할 때 안정성이 중요해요": "Stability matters when sorting by several keys"
});
const ln = (S, key, a, b, ra, rb, p) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return arrow(S, key, a[0] + dx * ra / L, a[1] + dy * ra / L, b[0] - dx * rb / L, b[1] - dy * rb / L, p); };

/* ---------- sorting traces (real algorithms) ---------- */
function mk(vals) {
  const ord = vals.map((_, i) => i), done = new Set(), T = [];
  const v = i => vals[i];
  const snap = (hi, cap, extra) => { const h = {}; (extra || []).forEach(([i, s]) => { h[i] = s; }); done.forEach(i => { h[i] = 'done'; }); Object.assign(h, hi || {}); T.push({ order: ord.slice(), hi: h, cap }); };
  const swap = (a, b) => { [ord[a], ord[b]] = [ord[b], ord[a]]; };
  return { ord, done, T, v, snap, swap, n: vals.length };
}
function bubble(vals) {
  const k = mk(vals), { ord, done, v, snap, swap, n } = k;
  for (let i = 0; i < n - 1; i++) {
    let sw = false;
    for (let j = 0; j < n - 1 - i; j++) {
      snap({ [ord[j]]: 'cmp', [ord[j + 1]]: 'cmp' }, i === 0 && j === 0 ? '이웃한 두 값을 비교해서' : null);
      if (v(ord[j]) > v(ord[j + 1])) { swap(j, j + 1); sw = true; snap({ [ord[j]]: 'swap', [ord[j + 1]]: 'swap' }, i === 0 && j === 0 ? '앞이 더 크면 자리를 바꿔요' : null); }
    }
    done.add(ord[n - 1 - i]);
    if (i === 0) k.T[k.T.length - 1].cap = '한 바퀴 돌면 가장 큰 값이 맨 뒤로';
    if (!sw) break;
  }
  ord.forEach(i => done.add(i)); snap({}, '끝 · 비교 횟수 O(n²)');
  return k.T;
}
function selection(vals) {
  const k = mk(vals), { ord, done, v, snap, swap, n } = k;
  for (let i = 0; i < n - 1; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) {
      snap({ [ord[m]]: 'piv', [ord[j]]: 'cmp' }, i === 0 && j === 1 ? '남은 것 중 가장 작은 값을 찾아요' : null);
      if (v(ord[j]) < v(ord[m])) m = j;
    }
    if (m !== i) { swap(i, m); snap({ [ord[i]]: 'swap', [ord[m]]: 'swap' }, i === 0 ? '찾은 최솟값을 맨 앞과 바꿔요' : null); }
    done.add(ord[i]);
  }
  ord.forEach(i => done.add(i)); snap({}, '교환은 적지만 비교는 항상 O(n²)');
  return k.T;
}
function insertion(vals) {
  const k = mk(vals), { ord, done, v, snap, swap, n } = k;
  const pre = i => ord.slice(0, i).map(b => [b, 'rng']);
  for (let i = 1; i < n; i++) {
    let j = i;
    snap({ [ord[j]]: 'piv' }, i === 1 ? '다음 카드를 집어서' : null, pre(i));
    while (j > 0 && v(ord[j - 1]) > v(ord[j])) {
      swap(j - 1, j); j--;
      snap({ [ord[j]]: 'piv' }, i === 1 ? '정렬된 앞부분의 알맞은 자리에 끼워요' : null, pre(i + 1));
    }
  }
  ord.forEach(i => done.add(i)); snap({}, '거의 정렬된 데이터에선 O(n)에 가까워요');
  return k.T;
}
function merge(vals) {
  const k = mk(vals), { ord, done, v, snap, n } = k;
  const capFor = { 1: '1개씩을 2개로 합치며 정렬', 2: '2개씩을 4개로', 4: '4개씩을 8개로' };
  for (let size = 1; size < n; size *= 2) {
    for (let lo = 0; lo < n - size; lo += 2 * size) {
      const hi = Math.min(lo + 2 * size, n);
      const rng = {}; ord.slice(lo, hi).forEach(b => { rng[b] = 'rng'; });
      snap(rng, lo === 0 ? capFor[size] : null);
      const merged = ord.slice(lo, hi).sort((a, b) => v(a) - v(b) || a - b);
      ord.splice(lo, hi - lo, ...merged);
      const c = {}; merged.forEach(b => { c[b] = 'cmp'; }); snap(c);
    }
  }
  ord.forEach(i => done.add(i)); snap({}, '항상 O(n log n) · 합칠 때 추가 공간이 필요해요');
  return k.T;
}
function quick(vals) {
  const k = mk(vals), { ord, done, v, snap, swap } = k;
  let first = true;
  const qs = (lo, hi) => {
    if (lo > hi) return;
    if (lo === hi) { done.add(ord[lo]); return; }
    const p = ord[hi]; let i = lo;
    const rng = () => { const r = {}; ord.slice(lo, hi + 1).forEach(b => { r[b] = 'rng'; }); return r; };
    snap(Object.assign(rng(), { [p]: 'piv' }), first ? '마지막 값을 기준(피벗)으로 잡고' : null);
    for (let j = lo; j < hi; j++) {
      snap(Object.assign(rng(), { [p]: 'piv', [ord[j]]: 'cmp' }), first && j === lo ? '피벗보다 작으면 왼쪽으로 보내요' : null);
      if (v(ord[j]) < v(p)) { if (i !== j) { swap(i, j); snap(Object.assign(rng(), { [p]: 'piv', [ord[i]]: 'swap', [ord[j]]: 'swap' })); } i++; }
    }
    swap(i, hi); done.add(p); snap(rng(), first ? '피벗이 제자리를 찾았어요 · 양쪽을 다시 같은 방법으로' : null);
    first = false;
    qs(lo, i - 1); qs(i + 1, hi);
  };
  qs(0, vals.length - 1);
  ord.forEach(i => done.add(i)); snap({}, '평균 O(n log n) · 실무 정렬의 기본');
  return k.T;
}
function heapsort(vals) {
  const k = mk(vals), { ord, done, v, snap, swap, n } = k;
  const sift = (i, m, cap) => {
    for (;;) {
      const l = 2 * i + 1, r = l + 1; let b = i;
      if (l < m && v(ord[l]) > v(ord[b])) b = l;
      if (r < m && v(ord[r]) > v(ord[b])) b = r;
      if (b === i) return;
      snap({ [ord[i]]: 'cmp', [ord[b]]: 'cmp' }, cap); cap = null;
      swap(i, b); snap({ [ord[i]]: 'swap', [ord[b]]: 'swap' });
      i = b;
    }
  };
  let c = '배열을 최대 힙으로 만들어요';
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { sift(i, n, c); c = null; }
  for (let end = n - 1; end > 0; end--) {
    swap(0, end); done.add(ord[end]); snap({ [ord[0]]: 'swap' }, end === n - 1 ? '맨 위(최댓값)를 끝으로 보내고' : null);
    sift(0, end, end === n - 1 ? '남은 힙을 다시 정리해요' : null);
  }
  ord.forEach(i => done.add(i)); snap({}, '항상 O(n log n) · 추가 공간 O(1)');
  return k.T;
}
function radix(vals) {
  const k = mk(vals), { ord, done, v, snap } = k;
  snap({}, '두 자리 수를 자릿수별로 정렬해요');
  const pass = (f, cap) => {
    const sorted = ord.slice().sort((a, b) => f(v(a)) - f(v(b)) || ord.indexOf(a) - ord.indexOf(b));
    const hi = {}; sorted.forEach(b => { hi[b] = f(v(b)) % 2 ? 'rng' : 'cmp'; });
    ord.splice(0, ord.length, ...sorted); snap(hi, cap);
  };
  pass(x => x % 10, '① 일의 자리 기준 (같으면 순서 유지)');
  pass(x => Math.floor(x / 10), '② 십의 자리 기준 → 전체가 정렬돼요');
  ord.forEach(i => done.add(i)); snap({}, '비교 없이 O(d·n) · 숫자·문자열 키에 강해요');
  return k.T;
}

/* ---------- search & paradigms ---------- */
function rowCells(S, vals, x0, y, W, G, pfx = 'c', idx = true) {
  vals.forEach((v, i) => { cell(S, pfx + i, x0 + i * (W + G), y, String(v), { w: W, h: W }); if (idx) text(S, pfx + 'i' + i, x0 + i * (W + G), y + W + .3, String(i), { w: W, cls: 'cz-t cz-tc' }); });
}
function sBsearch() {
  const vals = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91], W = 2.3, G = .3, x0 = (32 - 11 * 2.6 + .3) / 2, y = 8;
  const S = scene({ id: 'al-bsearch', steps: 5, per: 1.3 });
  rowCells(S, vals, x0, y, W, G);
  const px = i => x0 + i * (W + G) + W / 2 - 1.2;
  pill(S, 'L', px(0), y - 3.2, 'lo', { w: 2.4, h: 1.6, s: C.soft }); pill(S, 'R', px(10), y - 3.2, 'hi', { w: 2.4, h: 1.6, s: C.soft });
  pill(S, 'M', px(5), y + 4.2, 'mid', { w: 2.4, h: 1.6, s: Object.assign({ opacity: '0' }, C.cmp) });
  S.cap(0, '정렬된 배열에서 45를 찾아요');
  const st = [[5, 0, 10, '23 < 45 → 오른쪽 절반만'], [8, 6, 10, '56 > 45 → 왼쪽 절반만'], [6, 6, 7, '38 < 45 → 오른쪽'], [7, 7, 7, '찾았어요 · 비교 4번 (11개 중)']];
  st.forEach(([m, lo, hi, cap], k) => {
    const s = k + 1; S.set('M', s, { opacity: '1' }).move('M', s, px(m), y + 4.2).move('L', s, px(lo), y - 3.2).move('R', s, px(hi), y - 3.2).set('c' + m, s, k === 3 ? C.okf : C.cmp).cap(s, cap);
    if (k > 0) S.set('c' + st[k - 1][0], s, C.idle);
    vals.forEach((_, i) => { if (i < lo || i > hi) S.set('c' + i, s, { opacity: '.25' }); });
  });
  S.cap(5, '한 번에 절반씩 버려서 O(log n) · 10억 개도 30번이면 끝');
  return S;
}
function sTwo() {
  const vals = [1, 2, 4, 7, 11, 15], W = 3, G = .5, x0 = (32 - 6 * 3.5 + .5) / 2, y = 8.5;
  const S = scene({ id: 'al-twoptr', steps: 5, per: 1.3 });
  rowCells(S, vals, x0, y, W, G);
  const px = i => x0 + i * (W + G) + W / 2 - 1.3;
  pill(S, 'L', px(0), y - 3, 'L', { w: 2.6, h: 1.7, s: C.soft }); pill(S, 'R', px(5), y - 3, 'R', { w: 2.6, h: 1.7, s: C.soft });
  S.label('sum', { cls: 'cz-t cz-tc cz-mono al-big', x: 8, y: y + 5, w: 16 }, [[0, ''], [1, '1 + 15 = 16 > 15'], [2, '1 + 11 = 12 < 15'], [3, '2 + 11 = 13 < 15'], [4, '4 + 11 = 15 ✓']]);
  S.cap(0, '정렬된 배열에서 합이 15인 두 수 찾기');
  const P = [[0, 5, '크면 R을 왼쪽으로'], [0, 4, '작으면 L을 오른쪽으로'], [1, 4, '아직 작아요'], [2, 4, '찾았어요']];
  P.forEach(([l, r, cap], k) => { const s = k + 1; S.move('L', s, px(l), y - 3).move('R', s, px(r), y - 3).set('c' + l, s, k === 3 ? C.okf : C.cmp).set('c' + r, s, k === 3 ? C.okf : C.cmp).cap(s, cap); if (k > 0) { const [pl, pr] = P[k - 1]; if (pl !== l) S.set('c' + pl, s, { opacity: '.3' }); if (pr !== r) S.set('c' + pr, s, { opacity: '.3' }); } });
  S.cap(5, '이중 반복 O(n²) 대신 한 번 훑기 O(n)');
  return S;
}
function sWindow() {
  const vals = [2, 1, 5, 1, 3, 2, 6, 1], W = 2.6, G = .4, x0 = (32 - 8 * 3 + .4) / 2, y = 8.5;
  const S = scene({ id: 'al-window', steps: 6, per: 1.05 });
  rowCells(S, vals, x0, y, W, G);
  S.el('win', { x: x0 - .3, y: y - .3, w: 3 * (W + G) - G + .6, h: W + .6, css: 'border:.2em solid var(--accent);border-radius:.8em;z-index:3' });
  const sums = [8, 7, 9, 6, 11, 9];
  S.label('sum', { cls: 'cz-t cz-tc cz-mono al-big', x: 8, y: y + 5, w: 16 }, sums.map((s, i) => [i === 0 ? 0 : i, [`창의 합 = ${s}${s === 11 ? '  ← 최대' : ''}`, `window sum = ${s}${s === 11 ? '  ← max' : ''}`]]));
  for (let i = 1; i < 6; i++) S.move('win', i, x0 - .3 + i * (W + G), y - .3);
  S.cap(0, '연속한 3칸의 합 중 최대 찾기').cap(1, '한 칸 밀 때 빠지는 값을 빼고 들어오는 값만 더해요').cap(4, '최대 11').cap(5, '매번 다시 더하지 않아서 O(n)');
  return S;
}
function sPrefix() {
  const vals = [3, 1, 4, 1, 5, 9, 2], P = [0, 3, 4, 8, 9, 14, 23, 25], W = 2.5, G = .4, x0 = 5.5;
  const S = scene({ id: 'al-prefix', steps: 9, per: .85 });
  text(S, 'ta', 1.4, 5.5, 'A', { cls: 'cz-t cz-mono' }); text(S, 'tp', 1.4, 11.2, 'P', { cls: 'cz-t cz-mono' });
  vals.forEach((v, i) => cell(S, 'a' + i, x0 + (i + 1) * (W + G), 4.6, String(v), { w: W, h: W }));
  P.forEach((v, i) => { cell(S, 'p' + i, x0 + i * (W + G), 10.3, '', { w: W, h: W }); S.label('pv' + i, { cls: 'cz-t cz-tc cz-mono', x: x0 + i * (W + G), y: 10.9, w: W, css: 'z-index:3' }, i === 0 ? [[0, '0']] : [[0, ''], [i, String(v)]]); });
  for (let i = 1; i <= 7; i++) { S.set('p' + i, i, C.soft).set('a' + (i - 1), i, C.cmp); if (i > 1) S.set('a' + (i - 2), i, C.idle); }
  S.set('a6', 8, C.idle);
  S.cap(1, 'P[i] = P[i-1] + A[i] · 앞에서부터 누적');
  [2, 3, 4, 5].forEach(i => S.set('a' + i, 8, C.cur)); S.set('p6', 8, C.ok).set('p2', 8, C.bad).cap(8, 'A[2..5]의 합 = P[6] − P[2] = 23 − 4 = 19');
  S.cap(9, '한 번 O(n)으로 만들어 두면 어떤 구간 합도 O(1)');
  return S;
}
function sRecur() {
  const S = scene({ id: 'al-recur', steps: 7, per: 1 });
  const x = 9, w = 14, h = 2.6, base = 18.5;
  S.el('st', { x: x - .4, y: 5, w: w + .8, h: base - 5 + .4, css: 'border:.16em solid var(--ink-3);border-top:0;border-radius:0 0 .8em .8em' });
  const F = ['fact(3) = 3 × fact(2)', 'fact(2) = 2 × fact(1)', 'fact(1) = 1'];
  F.forEach((f, i) => cell(S, 'f' + i, x, base - (i + 1) * h, f, { w, h: h - .2, s: { opacity: '0' } }));
  [['← 1 반환', 4, 2], ['← 2 반환', 5, 1], ['← 6 반환', 6, 0]].forEach(([t, st, i], j) => { text(S, 'ret' + j, x + w + 1, base - (i + 1) * h + .75, t, { cls: 'cz-t cz-mono', s: { opacity: '0' } }); S.set('ret' + j, st, { opacity: '1' }).set('ret' + j, st + 1, { opacity: '0' }); });
  [0, 1, 2].forEach(i => S.set('f' + i, i + 1, Object.assign({ opacity: '1' }, i === 2 ? C.cur : C.soft)).set('f' + (i - 1 >= 0 ? i - 1 : 0), i + 1, i > 0 ? C.idle : {}));
  S.cap(1, '함수를 부르면 호출 스택에 쌓여요').cap(3, '종료 조건(fact(1))에서 더 내려가지 않아요');
  S.set('f2', 4, { opacity: '0' }).set('f1', 4, C.cur).cap(4, '위에서부터 결과를 돌려주며 빠져요');
  S.set('f1', 5, { opacity: '0' }).set('f0', 5, C.cur);
  S.set('f0', 6, C.okf).cap(6, 'fact(3) = 6');
  S.set('f0', 7, { opacity: '0' }).cap(7, '종료 조건이 없으면 스택이 넘쳐요 (스택 오버플로)');
  return S;
}
function sFib() {
  const F = [0, 1, 1, 2, 3, 5, 8, 13, 21], W = 2.6, G = .4, x0 = (32 - 9 * 3 + .4) / 2, y = 9;
  const S = scene({ id: 'al-dp', steps: 9, per: .8 });
  F.forEach((v, i) => { cell(S, 'f' + i, x0 + i * (W + G), y, '', { w: W, h: W }); text(S, 'i' + i, x0 + i * (W + G), y + W + .3, `F${i}`, { w: W, cls: 'cz-t cz-tc' }); S.label('v' + i, { cls: 'cz-t cz-tc cz-mono', x: x0 + i * (W + G), y: y + .65, w: W, css: 'z-index:3' }, i < 2 ? [[0, String(v)]] : [[0, ''], [i - 1, String(v)]]); });
  S.set('f0', 0, C.soft).set('f1', 0, C.soft);
  for (let i = 2; i <= 8; i++) { const s = i - 1; S.set('f' + i, s, C.soft).set('f' + (i - 1), s, C.cmp).set('f' + (i - 2), s, C.cmp); if (i > 2) S.set('f' + (i - 3), s, C.idle); }
  for (let i = 0; i <= 8; i++) S.set('f' + i, 8, C.ok);
  S.cap(0, '피보나치를 표에 차례로 채워요').cap(1, 'F[i] = F[i-1] + F[i-2] · 이미 구한 값을 다시 써요');
  S.cap(8, '그냥 재귀는 O(2ⁿ), 표를 쓰면 O(n) · 이것이 동적 계획법').cap(9, '작은 문제의 답을 저장해 큰 문제를 풀어요');
  return S;
}
function sLCS() {
  const X = 'ABCD', Y = 'ACD', cw = 2.6, x0 = 9, y0 = 4.2;
  const T = Array.from({ length: Y.length + 1 }, () => Array(X.length + 1).fill(0));
  for (let i = 1; i <= Y.length; i++) for (let j = 1; j <= X.length; j++) T[i][j] = Y[i - 1] === X[j - 1] ? T[i - 1][j - 1] + 1 : Math.max(T[i - 1][j], T[i][j - 1]);
  const S = scene({ id: 'al-lcs', steps: 13, per: .7 });
  X.split('').forEach((c, j) => text(S, 'hx' + j, x0 + (j + 1) * cw, y0 - 1.5, c, { w: cw - .2, cls: 'cz-t cz-tc cz-mono' }));
  Y.split('').forEach((c, i) => text(S, 'hy' + i, x0 - 1.6, y0 + (i + 1) * cw + .7, c, { cls: 'cz-t cz-mono' }));
  let st = 0;
  for (let i = 0; i <= Y.length; i++) for (let j = 0; j <= X.length; j++) {
    cell(S, `g${i}_${j}`, x0 + j * cw, y0 + i * cw, '', { w: cw - .2, h: cw - .2 });
    if (i === 0 || j === 0) S.label(`v${i}_${j}`, { cls: 'cz-t cz-tc cz-mono', x: x0 + j * cw, y: y0 + i * cw + .7, w: cw - .2, css: 'z-index:3' }, [[0, '0']]);
  }
  for (let i = 1; i <= Y.length; i++) for (let j = 1; j <= X.length; j++) {
    st++; const m = Y[i - 1] === X[j - 1];
    S.label(`v${i}_${j}`, { cls: 'cz-t cz-tc cz-mono', x: x0 + j * cw, y: y0 + i * cw + .7, w: cw - .2, css: 'z-index:3' }, [[0, ''], [st, String(T[i][j])]]);
    S.set(`g${i}_${j}`, st, m ? C.ok : C.soft);
    if (!m) S.set(`g${i}_${j}`, st + 1, C.idle);
  }
  S.cap(0, '"ABCD"와 "ACD"의 가장 긴 공통 부분 수열').cap(1, '글자가 같으면 대각선 + 1, 다르면 위·왼쪽 중 큰 값');
  S.cap(13, 'LCS 길이 3 ("ACD") · diff·버전 비교의 원리');
  return S;
}
function sGreedy() {
  const S = scene({ id: 'al-greedy', steps: 6, per: 1.1 });
  const coins = [['500', 0], ['100', 1], ['100', 2], ['50', 3], ['10', 4]];
  S.label('rem', { cls: 'cz-t cz-tc cz-mono al-big', x: 8, y: 4, w: 16 }, [[0, '남은 금액 760원'], [1, '남은 금액 260원'], [2, '남은 금액 160원'], [3, '남은 금액 60원'], [4, '남은 금액 10원'], [5, '0원 · 동전 5개']]);
  coins.forEach(([v, i]) => S.el('k' + i, { cls: 'cz-n', x: 5 + i * 4.6, y: 9, w: 3.8, h: 3.8, html: v, s: Object.assign({ opacity: '0', transform: 'translateY(-1.5em)' }, v === '500' ? C.warn : v === '100' ? C.soft : C.ok) }));
  coins.forEach(([v, i]) => S.set('k' + i, i + 1, { opacity: '1', transform: 'none' }));
  S.cap(1, '지금 쓸 수 있는 가장 큰 동전부터 골라요').cap(4, '매 순간 최선을 고르면');
  S.cap(6, '1·3·4원 단위로 6원을 만들면 4+1+1, 최적은 3+3');
  return S;
}
function sQueens() {
  const ev = [];
  const cols = [];
  const ok = (r, c) => cols.every((cc, rr) => cc !== c && Math.abs(cc - c) !== r - rr);
  const go = r => { if (r === 4) return true; for (let c = 0; c < 4; c++) if (ok(r, c)) { cols.push(c); ev.push(['p', r, c]); if (go(r + 1)) return true; cols.pop(); ev.push(['x', r, c]); } return false; };
  go(0);
  const S = scene({ id: 'al-queens', steps: ev.length + 1, per: .7 });
  const cs = 3.6, x0 = 16 - 2 * cs, y0 = 2.2;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) S.el(`b${r}${c}`, { x: x0 + c * cs, y: y0 + r * cs, w: cs, h: cs, css: `background:${(r + c) % 2 ? 'var(--line)' : 'var(--ui)'};` });
  const qs = {};
  ev.forEach(([t, r, c], k) => {
    const key = `q${r}${c}`;
    if (!qs[key]) { qs[key] = 1; S.el(key, { cls: 'cz-n', x: x0 + c * cs + .5, y: y0 + r * cs + .5, w: cs - 1, h: cs - 1, html: '♛', s: Object.assign({ opacity: '0' }, C.cur) }); }
    S.set(key, k + 1, t === 'p' ? Object.assign({ opacity: '1' }, C.cur) : Object.assign({ opacity: '0' }, C.bad));
  });
  S.cap(0, '4×4 판에 서로 공격하지 않게 퀸 4개 놓기').cap(1, '한 줄씩 놓다가').cap(3, '막히면 이전 선택을 되돌려요 (백트래킹)').cap(ev.length, '해를 찾았어요');
  Object.keys(qs).forEach(k => { const last = ev.filter(e => `q${e[1]}${e[2]}` === k).pop(); if (last[0] === 'p') S.set(k, ev.length + 1, C.okf); });
  S.cap(ev.length + 1, '안 되는 가지는 일찍 잘라 탐색을 줄여요');
  return S;
}
function sBitmask() {
  const S = scene({ id: 'al-bitmask', steps: 8, per: .85 });
  const items = ['A', 'B', 'C'];
  items.forEach((it, i) => node(S, 'n' + it, 9 + i * 7, 6, it, { r: 1.7 }));
  for (let b = 0; b < 3; b++) { cell(S, 'bit' + b, 11 + b * 3.4, 12, '', { w: 3, h: 3 }); text(S, 'bl' + b, 11 + b * 3.4, 15.4, ['2²', '2¹', '2⁰'][b], { w: 3, cls: 'cz-t cz-tc cz-mono' }); }
  for (let m = 0; m < 8; m++) {
    for (let b = 0; b < 3; b++) { const on = (m >> (2 - b)) & 1; if (m === 0) S.label('bv' + b, { cls: 'cz-t cz-tc cz-mono', x: 11 + b * 3.4, y: 12.85, w: 3, css: 'z-index:3' }, Array.from({ length: 8 }, (_, mm) => [mm, String((mm >> (2 - b)) & 1)])); S.set('bit' + b, m, on ? C.soft : C.idle); S.set('n' + items[b], m, on ? C.cur : C.idle); }
  }
  S.label('dec', { cls: 'cz-t cz-mono', x: 22, y: 12.85, w: 8 }, Array.from({ length: 8 }, (_, m) => [m, '= ' + m]));
  S.cap(0, '3비트 숫자 하나가 부분집합 하나').cap(3, '0부터 7까지 세면 모든 부분집합 2³개를 돌아요');
  S.cap(7, '포함 여부 확인 x &amp; (1&lt;&lt;i) · DP·권한 플래그에 써요');
  return S;
}

/* ---------- graph algorithms ---------- */
const GP = { A: [4, 9], B: [10, 4], C: [10, 14], D: [17, 4], E: [17, 14], F: [23, 9], G: [29, 9] };
const GE = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'C'], ['C', 'E'], ['D', 'F'], ['E', 'F'], ['F', 'G']];
const adj = (E) => { const a = {}; E.forEach(([x, y]) => { (a[x] = a[x] || []).push(y); (a[y] = a[y] || []).push(x); }); Object.values(a).forEach(l => l.sort()); return a; };
function drawG(S, P, E, w) {
  E.forEach(([a, b], i) => { edge(S, 'e' + a + b, P[a][0], P[a][1], P[b][0], P[b][1]); if (w) text(S, 'w' + a + b, (P[a][0] + P[b][0]) / 2 - .6, (P[a][1] + P[b][1]) / 2 - 1.1, String(w[i]), { cls: 'cz-t cz-mono', css: 'z-index:3' }); });
  Object.entries(P).forEach(([k, [x, y]]) => node(S, 'n' + k, x, y, k));
}
const ek = (E, a, b) => E.some(([x, y]) => x === a && y === b) ? 'e' + a + b : 'e' + b + a;
function sBFS() {
  const A = adj(GE), order = [], parent = {}, seen = new Set(['A']), q = ['A'], snaps = [];
  while (q.length) { const u = q.shift(); const added = []; A[u].forEach(v => { if (!seen.has(v)) { seen.add(v); q.push(v); parent[v] = u; added.push(v); } }); snaps.push([u, added, q.slice()]); }
  const S = scene({ id: 'al-bfs', steps: snaps.length + 1, per: 1 });
  drawG(S, GP, GE);
  snaps.forEach(([u, added, qq], k) => {
    const s = k + 1; S.set('n' + u, s, C.cur); if (k > 0) S.set('n' + snaps[k - 1][0], s, C.ok);
    added.forEach(v => S.set('n' + v, s, C.soft).set(ek(GE, u, v), s, { background: 'var(--accent)' }));
    S.cap(s, [`꺼낸 정점 ${u} · 큐 [${qq.join(', ')}]`, `Dequeued ${u} · queue [${qq.join(', ')}]`]);
  });
  S.set('n' + snaps[snaps.length - 1][0], snaps.length + 1, C.ok).cap(snaps.length + 1, '가까운 것부터 층층이 · 가중치 없는 최단 거리');
  S.cap(0, 'A에서 너비 우선 탐색 (큐 사용)');
  return S;
}
function sDFS() {
  const A = adj(GE), seen = new Set(), ev = [];
  const go = (u, p) => { seen.add(u); ev.push(['in', u, p]); A[u].forEach(v => { if (!seen.has(v)) go(v, u); }); ev.push(['out', u]); };
  go('A', null);
  const S = scene({ id: 'al-dfs', steps: ev.length, per: .6 });
  drawG(S, GP, GE);
  const stack = [];
  ev.forEach(([t, u, p], k) => {
    const s = k + 1;
    if (t === 'in') { stack.push(u); S.set('n' + u, s, C.cur); if (p) S.set('n' + p, s, C.soft).set(ek(GE, p, u), s, { background: 'var(--accent)' }); }
    else { stack.pop(); S.set('n' + u, s, C.ok); if (stack.length) S.set('n' + stack[stack.length - 1], s, C.cur); }
    S.cap(s, [`스택 [${stack.join(' → ')}]`, `Stack [${stack.join(' → ')}]`]);
  });
  S.cap(0, 'A에서 깊이 우선 탐색 · 끝까지 갔다가 되돌아와요');
  return S;
}
function sDijkstra() {
  const P = { A: [4, 10.5], B: [11.5, 4], C: [11.5, 17], D: [20.5, 4], E: [20.5, 17], F: [28, 10.5] };
  const E = [['A', 'B'], ['A', 'C'], ['C', 'B'], ['B', 'D'], ['C', 'E'], ['D', 'E'], ['D', 'F'], ['E', 'F']], W = [4, 2, 1, 5, 8, 3, 6, 2];
  const S = scene({ id: 'al-dijkstra', steps: 7, per: 1.3, capY: 21.9 });
  drawG(S, P, E, W);
  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity }, done = new Set(), labels = {};
  Object.keys(P).forEach(k => { labels[k] = [[0, k === 'A' ? '0' : '∞']]; });
  const steps = [];
  for (let s = 1; s <= 6; s++) {
    const u = Object.keys(dist).filter(k => !done.has(k)).sort((a, b) => dist[a] - dist[b])[0]; done.add(u);
    const upd = [];
    E.forEach(([a, b], i) => { [[a, b], [b, a]].forEach(([x, y]) => { if (x === u && !done.has(y) && dist[u] + W[i] < dist[y]) { dist[y] = dist[u] + W[i]; labels[y].push([s, String(dist[y])]); upd.push([y, ek(E, x, y)]); } }); });
    steps.push([u, upd]);
  }
  const off = { A: [-3.4, -.5], B: [-1.5, -2.6], D: [-1.5, -2.6], C: [-1.5, 1.4], E: [-1.5, 1.4], F: [.4, -.5] };
  Object.entries(labels).forEach(([k, l]) => S.label('d' + k, { cls: 'cz-t cz-tc cz-mono al-dist', x: P[k][0] + off[k][0], y: P[k][1] + off[k][1], w: 3 }, l));
  steps.forEach(([u, upd], k) => {
    const s = k + 1; S.set('n' + u, s, C.cur); if (k > 0) S.set('n' + steps[k - 1][0], s, C.okf);
    upd.forEach(([y, e]) => S.set('n' + y, s, C.soft).set(e, s, { background: 'var(--accent)' }));
  });
  S.set('n' + steps[5][0], 7, C.okf);
  S.cap(0, 'A에서 모든 정점까지의 최단 거리').cap(1, '가장 가까운 미확정 정점을 확정하고 이웃 거리를 줄여요').cap(7, '음수 가중치가 없을 때 O(E log V) · 지도 길찾기의 기본');
  return S;
}
function sTopo() {
  const P = { 'C1': [4, 6], 'C2': [4, 14], 'DS': [12, 6], 'OS': [12, 14], 'AL': [20, 6], 'NW': [20, 14], 'SD': [28, 10] };
  const L = { C1: ['기초', 'Intro'], C2: ['수학', 'Math'], DS: ['자료', 'DS'], OS: ['OS', 'OS'], AL: ['알고', 'Algo'], NW: ['네트', 'Net'], SD: ['설계', 'Design'] };
  const E = [['C1', 'DS'], ['C2', 'DS'], ['C1', 'OS'], ['DS', 'AL'], ['OS', 'NW'], ['AL', 'SD'], ['NW', 'SD']];
  const S = scene({ id: 'al-topo', steps: 8, per: 1 });
  E.forEach(([a, b]) => ln(S, 'e' + a + b, P[a], P[b], 1.4, 1.45));
  Object.entries(P).forEach(([k, [x, y]]) => node(S, 'n' + k, x, y, L[k], { r: 1.35 }));
  const indeg = {}; Object.keys(P).forEach(k => { indeg[k] = 0; }); E.forEach(([, b]) => indeg[b]++);
  const q = Object.keys(P).filter(k => !indeg[k]), out = [];
  while (q.length) { const u = q.shift(); out.push(u); E.filter(([a]) => a === u).forEach(([, b]) => { if (--indeg[b] === 0) q.push(b); }); }
  out.forEach((u, i) => {
    const s = i + 1; S.set('n' + u, s, C.okf); E.filter(([a]) => a === u).forEach(([a, b]) => S.set('e' + a + b, s, { opacity: '.15' }));
    cell(S, 'o' + i, 4.2 + i * 3.4, 18.4, L[u], { w: 3.1, h: 2, s: Object.assign({ opacity: '0' }, C.soft) }); S.set('o' + i, s, { opacity: '1' });
  });
  S.cap(0, '선수 과목이 있는 과목들을 들을 순서 정하기').cap(1, '들어오는 화살표가 없는 것부터 꺼내고, 그 화살표를 지워요');
  S.cap(8, '사이클이 없는 그래프에서만 가능 · 빌드 순서·작업 스케줄링');
  return S;
}
function sMST() {
  const P = { A: [5, 5], B: [16, 3.5], C: [27, 5], D: [5, 15], E: [16, 16.5], F: [27, 15] };
  const E = [['A', 'B', 3], ['B', 'C', 6], ['A', 'D', 2], ['B', 'E', 5], ['C', 'F', 7], ['D', 'E', 4], ['E', 'F', 1], ['A', 'E', 8], ['B', 'F', 9]];
  const sorted = E.slice().sort((a, b) => a[2] - b[2]);
  const par = {}; Object.keys(P).forEach(k => { par[k] = k; }); const f = x => par[x] === x ? x : (par[x] = f(par[x]));
  const ev = [];
  sorted.forEach(([a, b, w]) => { const ra = f(a), rb = f(b); if (ra !== rb) { par[ra] = rb; ev.push([a, b, w, 1]); } else ev.push([a, b, w, 0]); });
  const used = ev.slice(0, ev.findIndex((e, i) => ev.slice(0, i + 1).filter(x => x[3]).length === 5) + 1);
  const S = scene({ id: 'al-mst', steps: used.length + 1, per: .95 });
  drawG(S, P, E.map(([a, b]) => [a, b]), E.map(e => e[2]));
  used.forEach(([a, b, w, ok], k) => { const s = k + 1; S.set('e' + a + b, s, ok ? { background: 'var(--ok)' } : { background: 'var(--danger)' }); if (!ok) S.set('e' + a + b, s + 1, { background: 'var(--line)', opacity: '.25' }); if (ok) { S.set('n' + a, s, C.ok).set('n' + b, s, C.ok); } S.cap(s, ok ? [`가중치 ${w}: 연결 ✓`, `Weight ${w}: connect ✓`] : [`가중치 ${w}: 사이클이 생겨서 건너뛰기`, `Weight ${w}: would form a cycle, skip`]); });
  S.cap(0, '모든 점을 가장 싸게 잇기 (크루스칼)').cap(used.length + 1, '가벼운 간선부터, 사이클만 피하면 최소 신장 트리 · 총 16');
  return S;
}
function sAstar() {
  const Wd = 11, Hd = 7, walls = new Set(['4,1', '4,2', '4,3', '4,4', '4,5', '7,0', '7,1', '7,2', '7,3', '7,5', '7,6']);
  const st = [1, 3], gl = [9, 3], key = (x, y) => x + ',' + y;
  const h = (x, y) => Math.abs(x - gl[0]) + Math.abs(y - gl[1]);
  const open = [[h(...st), 0, st[0], st[1]]], g = { [key(...st)]: 0 }, came = {}, closed = [], cset = new Set();
  while (open.length) {
    open.sort((a, b) => a[0] - b[0] || b[1] - a[1]); const [, gc, x, y] = open.shift(); const k = key(x, y);
    if (cset.has(k)) continue; cset.add(k); closed.push(k);
    if (x === gl[0] && y === gl[1]) break;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const nx = x + dx, ny = y + dy, nk = key(nx, ny); if (nx < 0 || ny < 0 || nx >= Wd || ny >= Hd || walls.has(nk)) return; if (g[nk] == null || gc + 1 < g[nk]) { g[nk] = gc + 1; came[nk] = k; open.push([gc + 1 + h(nx, ny), gc + 1, nx, ny]); } });
  }
  const path = []; let c = key(...gl); while (c) { path.unshift(c); c = came[c]; }
  const chunk = 3, nexp = Math.ceil(closed.length / chunk);
  const S = scene({ id: 'al-astar', steps: nexp + 2, per: .65 });
  const cs = 2.5, x0 = 16 - Wd * cs / 2, y0 = 2;
  for (let y = 0; y < Hd; y++) for (let x = 0; x < Wd; x++) { const k = key(x, y); S.el('g' + x + '_' + y, { cls: 'cz-c', x: x0 + x * cs, y: y0 + y * cs, w: cs - .2, h: cs - .2, html: k === key(...st) ? 'S' : k === key(...gl) ? 'G' : '', s: walls.has(k) ? { background: 'var(--ink-2)', 'border-color': 'var(--ink-2)' } : k === key(...st) || k === key(...gl) ? C.warn : {} }); }
  closed.forEach((k, i) => { if (k !== key(...st) && k !== key(...gl)) S.set('g' + k.replace(',', '_'), Math.floor(i / chunk) + 1, C.soft); });
  path.forEach(k => { if (k !== key(...st) && k !== key(...gl)) S.set('g' + k.replace(',', '_'), nexp + 1, C.cur); });
  S.cap(0, 'S에서 G까지 벽을 피해 가는 길').cap(1, '지나온 거리 + 남은 거리 추정값이 작은 칸부터 넓혀요').cap(nexp + 1, [`찾은 최단 경로 ${path.length - 1}칸 · 목표 쪽으로만 탐색해서 빨라요`, `Shortest path: ${path.length - 1} steps · it searches toward the goal, so it is fast`]);
  return S;
}

/* stable sort demo */
function sStable() {
  const S = scene({ id: 'al-stable', steps: 3, per: 1.8 });
  const inp = [['3', 'a'], ['1', ''], ['3', 'b'], ['2', ''], ['1', '′']], W = 3.6, G = .5, x0 = (32 - 5 * 4.1 + .5) / 2;
  const tag = (v, t) => `${v}<sub style="font-size:.6em;margin-left:.1em">${t}</sub>`;
  text(S, 't0', 1.2, 3.4, '입력', { cls: 'cz-t' }); text(S, 't1', 1.2, 9.4, '안정', { cls: 'cz-t', s: { opacity: '0' } }); text(S, 't2', 1.2, 15.4, '불안정', { cls: 'cz-t', s: { opacity: '0' } });
  inp.forEach(([v, t], i) => cell(S, 'i' + i, x0 + i * (W + G), 2.6, tag(v, t), { w: W, h: 2.4, s: v === '3' ? C.soft : {} }));
  const st = [['1', ''], ['1', '′'], ['2', ''], ['3', 'a'], ['3', 'b']], un = [['1', '′'], ['1', ''], ['2', ''], ['3', 'b'], ['3', 'a']];
  st.forEach(([v, t], i) => cell(S, 's' + i, x0 + i * (W + G), 8.6, tag(v, t), { w: W, h: 2.4, s: Object.assign({ opacity: '0' }, v === '3' ? C.ok : {}) }));
  un.forEach(([v, t], i) => cell(S, 'u' + i, x0 + i * (W + G), 14.6, tag(v, t), { w: W, h: 2.4, s: Object.assign({ opacity: '0' }, v === '3' ? C.bad : {}) }));
  st.forEach((_, i) => S.set('s' + i, 1, { opacity: '1' })); S.set('t1', 1, { opacity: '1' });
  un.forEach((_, i) => S.set('u' + i, 2, { opacity: '1' })); S.set('t2', 2, { opacity: '1' });
  S.cap(0, '같은 값 3이 두 개 있어요 (a가 먼저)').cap(1, '안정 정렬: 같은 값은 원래 순서 그대로 (a → b)').cap(2, '불안정 정렬: 같은 값의 순서가 바뀔 수 있어요').cap(3, '여러 기준으로 차례로 정렬할 때 안정성이 중요해요');
  return S;
}

const XT = (() => {
const ex = t => Array.isArray(t) ? t.map(ex) : (typeof t === 'string' ? t.replace(/</g, '&lt;') : t);
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { t = ex(t); const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'alx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */


/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono alx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono alx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c alx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono alx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c alx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'alx-s alx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono alx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono alx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono alx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono alx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono alx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'alx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'alx-xs', 5));


const CSSX = `
.alx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.alx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.alx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.alx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.alx-r .in{color:var(--danger);font-weight:800}
.alx-g .in{color:var(--ok);font-weight:800}
.alx-a .in{color:var(--accent);font-weight:800}
.alx-w .in{color:var(--warn);font-weight:800}
.alx-c .in{font-size:.6em;font-weight:700}
.alx-c2 .in{font-size:.5em;font-weight:700}
.alx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.alx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'alx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const ga = (S, k, a, b, color, st, r, o = {}) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; ar(S, k, [a[0] + ux * r, a[1] + uy * r], [b[0] - ux * r, b[1] - uy * r], color, st, Object.assign({ h: .1 }, o)); };
const mid = (a, b, ld) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [(a[0] + b[0]) / 2 - dy / L * ld, (a[1] + b[1]) / 2 + dx / L * ld]; };
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));
const acol = (S, k, st, color) => S.set(k, st, { background: cv(color), 'border-color': cv(color) });

/* ================= divide and conquer ================= */
function sMaster() {
  const S = scene({ id: 'al-master', steps: 5, per: 1.6 });
  T(S, 'rec', 1, .2, 'T(n) = 2·T(n/2) + n', 'cz-mono alx-s alx-a', 0);
  T(S, 'recd', 11.4, .35, ['병합 정렬: 반으로 나눠 두 번 풀고, 합치는 데 n', 'merge sort: two half-size calls, n to merge'], 'alx-xs', 0);
  const LV = [[1, 'n', 4], [2, 'n/2', 4], [4, 'n/4', 3.6], [8, 'n/8', 1.9]], ys = [1.8, 3.6, 5.4, 7.2], WT = 18;
  const SUM = ['n', '2 × n/2 = n', '4 × n/4 = n', '8 × n/8 = n'];
  LV.forEach(([cnt, lab, w], l) => {
    const slot = WT / cnt;
    for (let j = 0; j < cnt; j++) {
      const cx = 1 + slot * (j + .5);
      box2(S, `b${l}_${j}`, cx - w / 2, ys[l], w, 1.1, lab, l ? 'accent' : 'warn', l ? 2 : 1, { pct: 30 });
      if (l) { const pcx = 1 + (WT / (cnt / 2)) * (Math.floor(j / 2) + .5); seg(S, `e${l}_${j}`, [pcx, ys[l - 1] + 1.1], [cx, ys[l]], 2, 'ink-3', .06); }
    }
    T(S, 's' + l, 20.4, ys[l] + .2, (l ? '' : '= ') + SUM[l], 'cz-mono alx-xs alx-g', 2);
  });
  T(S, 'lf', 1, 8.9, '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1', 'cz-tc cz-mono alx-xs', 3, { w: 18 });
  T(S, 'lfs', 20.4, 8.9, 'n × 1 = n', 'cz-mono alx-xs alx-g', 3);
  seg(S, 'br', [25.6, 1.9], [25.6, 9.8], 3, 'ink-3', .08);
  T(S, 'brl', 26.2, 5.3, ['log₂n 층', 'log₂n levels'], 'alx-xs alx-a', 3);
  T(S, 'tot', 1, 10.5, ['층마다 n × 층 수 log₂n  →  T(n) = Θ(n log n)', 'n per level × log₂n levels  →  T(n) = Θ(n log n)'], 'alx-xs alx-g', 3);
  T(S, 'mt', 1, 11.9, ['일반형 T(n) = a·T(n/b) + f(n): f(n)을 n^(log_b a)와 비교해요', 'general form T(n) = a·T(n/b) + f(n): compare f(n) with n^(log_b a)'], 'alx-xs alx-a', 4);
  [[['f가 작음: 리프가 지배', 'f smaller: leaves win'], 'warn', '8·T(n/2) + n²  →  Θ(n³)', ['단순 분할 행렬 곱셈', 'naive split matrix multiply']],
   [['f와 같음: 층마다 같음', 'f equal: same each level'], 'accent', '2·T(n/2) + n  →  Θ(n log n)', ['병합 정렬 (이진 탐색은 Θ(log n))', 'merge sort (binary search: Θ(log n))']],
   [['f가 큼: 뿌리가 지배', 'f larger: root wins'], 'danger', '2·T(n/2) + n²  →  Θ(n²)', ['합치는 비용이 전부', 'the combine step dominates']]].forEach(([lab, c, ex2, note], i) => {
    box2(S, 'mc' + i, 1, 13.0 + i * 1.15, 8.2, .95, lab, c, 4, { pct: 30 });
    T(S, 'mx' + i, 9.8, 13.1 + i * 1.15, ex2, 'cz-mono alx-xs', 4);
    T(S, 'mn' + i, 21.4, 13.17 + i * 1.15, note, 'alx-tiny', 4);
  });
  fin(S, 'z', 16.6, [['분할 정복: 쪼개고(divide) → 각각 풀고(conquer) → 합치기(combine)', 'divide and conquer: split → solve each part → combine', 'alx-xs alx-a'], ['재귀 트리에서 층별 비용을 더하면 점화식의 답이 보여요', 'summing the recursion tree level by level solves the recurrence'], ['마스터 정리는 a·T(n/b) + f(n) 꼴을 세 경우로 바로 풀어 줘요', 'the master theorem solves a·T(n/b) + f(n) in three cases']]);
  S.cap(1, '병합 정렬의 점화식', 'The merge sort recurrence').cap(2, '재귀 트리: 층마다 n', 'Recursion tree: n per level').cap(3, 'log n 층 × n', 'log n levels × n').cap(4, '마스터 정리의 세 경우', 'The three cases of the master theorem').cap(5, '분할 정복과 마스터 정리', 'Divide and conquer and the master theorem');
  return S;
}

/* ================= DP / strings ================= */
function sKnap() {
  const S = scene({ id: 'al-knapsack', steps: 5, per: 1.6 });
  T(S, 'bag', 1, .3, ['🎒 가방 용량 W = 5', '🎒 capacity W = 5'], 'alx-xs alx-a', 0);
  const IT = [['A', 1, 6], ['B', 2, 10], ['C', 3, 12]];
  IT.forEach(([n, w, v], i) => box2(S, 'it' + i, 1, 1.5 + i * 1.4, 8.4, 1.15, `${n}  w=${w}  v=${v}`, 'line', 0, { pct: 30 }));
  tsets(S, 'it0', [[1, 'ok', 35], [2, 'line', 30]]); tsets(S, 'it1', [[1, 'ok', 35], [2, 'line', 30], [4, 'ok', 35], [5, 'line', 30]]); tsets(S, 'it2', [[1, 'danger', 30], [2, 'line', 30], [4, 'ok', 35], [5, 'line', 30]]);
  const CX = c => 15.6 + c * 2.55, RY = r => 2.7 + r * 1.3;
  T(S, 'hw', 11, 1.45, 'c →', 'cz-tc cz-mono alx-xs', 2, { w: 4.2 });
  for (let c = 0; c < 6; c++) T(S, 'hc' + c, CX(c), 1.45, String(c), 'cz-tc cz-mono alx-xs', 2, { w: 2.35 });
  const RL = ['∅', 'A (1, 6)', 'B (2, 10)', 'C (3, 12)'], DP = [[0, 0, 0, 0, 0, 0], [0, 6, 6, 6, 6, 6], [0, 6, 10, 16, 16, 16], [0, 6, 10, 16, 18, 22]];
  DP.forEach((row, r) => { box2(S, 'rl' + r, 11, RY(r), 4.2, 1.1, RL[r], 'ink-3', r < 3 ? 2 : 3, { pct: 12 }); row.forEach((v, c) => box2(S, `c${r}_${c}`, CX(c), RY(r), 2.35, 1.1, String(v), 'line', r < 3 ? 2 : 3, { pct: 22 })); });
  tsets(S, 'c3_5', [[3, 'ok', 50], [4, 'accent', 40], [5, 'line', 22]]); tsets(S, 'c2_5', [[3, 'warn', 40], [4, 'line', 22]]); tsets(S, 'c2_2', [[3, 'warn', 40], [4, 'accent', 40], [5, 'line', 22]]); tsets(S, 'c1_0', [[4, 'accent', 40], [5, 'line', 22]]);
  T(S, 'f3', 11, 8.1, 'dp[C][5] = max(16, 10 + 12) = 22', 'cz-mono alx-xs alx-g', 3, { off: 4 });
  T(S, 'f4', 11, 8.1, ['결과: B + C = 22 (무게 5)', 'result: B + C = 22 (weight 5)'], 'alx-xs alx-g', 4);
  stepT(S, 'k', 1, 9.4, [['가치/무게가 큰 순(탐욕): A·B를 넣으면 16, 남은 칸 2엔 C가 안 들어가요 ✗', 'greedy by value/weight: A and B give 16, and C won’t fit in the 2 left ✗'], ['dp[i][c] = i번째 물건까지 써서 용량 c로 얻는 최대 가치', 'dp[i][c] = best value using items up to i with capacity c'], ['안 넣기 dp[i−1][c] vs 넣기 dp[i−1][c−w] + v 중 큰 값', 'skip: dp[i−1][c] vs take: dp[i−1][c−w] + v, whichever is larger'], ['거꾸로 따라가기: 바로 위 칸과 값이 다르면 그 물건을 넣은 것', 'trace back: a cell that differs from the one above means that item was taken']]);
  fin(S, 'z', 10.8, [['0/1 배낭: 물건을 쪼갤 수 없을 때 DP로 O(n·W)에 풀어요', '0/1 knapsack: with indivisible items, DP solves it in O(n·W)', 'alx-xs alx-a'], ['W는 입력의 “숫자 크기”라 의사 다항 시간이에요 · 일반적으로는 NP-난해', 'W is a numeric value, so this is pseudo-polynomial · the problem is NP-hard in general'], ['쪼갤 수 있으면(분할 배낭) 가치/무게 순 탐욕이 최적이에요', 'if items can be split (fractional knapsack), greedy by value/weight is optimal']]);
  S.cap(1, '탐욕은 실패해요', 'Greedy fails').cap(2, 'DP 표 채우기', 'Filling the DP table').cap(3, '넣을까, 말까', 'Take it or leave it').cap(4, '무엇을 넣었나 되짚기', 'Tracing back the choice').cap(5, '0/1 배낭 문제', 'The 0/1 knapsack problem');
  return S;
}
function sKmp() {
  const S = scene({ id: 'al-kmp', steps: 5, per: 1.6 });
  const TX = 'ABABABCAB', P = 'ABABC', CW = 2.2, X = i => 1 + i * CW;
  [...TX].forEach((c, i) => { box2(S, 't' + i, X(i), 1.2, 2, 1.2, c, 'line', 0, { pct: 22 }); T(S, 'ti' + i, X(i), 2.45, String(i), 'cz-tc cz-mono alx-tiny', 0, { w: 2 }); });
  T(S, 'ptr', X(4), .05, 'i ▼', 'cz-tc cz-mono alx-xs alx-a', 1, { w: 2 }); S.move('ptr', 2, X(1), .05); S.move('ptr', 4, X(6), .05);
  [...P].forEach((c, j) => { box2(S, 'p' + j, X(j), 3.3, 2, 1.2, c, 'accent', 0, { pct: 18 }); S.move('p' + j, 4, X(2 + j), 3.3); });
  const tc = (k, list) => tsets(S, k, list);
  for (let j = 0; j < 4; j++) { tc('p' + j, [[1, 'ok', 40], [2, 'accent', 18], [4, j < 2 ? 'accent' : 'ok', j < 2 ? 30 : 40]]); tc('t' + j, [[1, 'ok', 35], [2, 'line', 22]]); }
  tc('p4', [[1, 'danger', 35], [2, 'accent', 18], [4, 'ok', 40]]); tc('t4', [[1, 'danger', 30], [2, 'line', 22], [4, 'ok', 35]]);
  [5, 6].forEach(i => tc('t' + i, [[4, 'ok', 35]])); tc('t2', [[4, 'accent', 25]]); tc('t3', [[4, 'accent', 25]]);
  [...P].forEach((c, j) => box2(S, 'g' + j, X(1 + j), 5.0, 2, 1.2, c, j ? 'line' : 'danger', 2, { pct: j ? 8 : 30, off: 3, css: 'border-style:dashed' }));
  T(S, 'gl', X(6) + .4, 5.2, ['처음부터 다시…', 'start over…'], 'alx-xs alx-r', 2, { off: 3 });
  T(S, 'found', X(2), 5.0, ['위치 2에서 찾았어요 ✓', 'found at index 2 ✓'], 'alx-xs alx-g', 4);
  box2(S, 'pP', 22, 1.2, 1.6, 1.15, 'P', 'ink-3', 3, { pct: 12 }); box2(S, 'pPi', 22, 2.55, 1.6, 1.15, 'π', 'ink-3', 3, { pct: 12 });
  const PI = [0, 0, 1, 2, 0];
  [...P].forEach((c, j) => { box2(S, 'q' + j, 23.8 + j * 1.5, 1.2, 1.35, 1.15, c, 'line', 3, { pct: 22 }); box2(S, 'r' + j, 23.8 + j * 1.5, 2.55, 1.35, 1.15, String(PI[j]), j === 3 ? 'ok' : 'line', 3, { pct: j === 3 ? 45 : 22 }); });
  tsets(S, 'q0', [[3, 'accent', 40]]); tsets(S, 'q1', [[3, 'accent', 40]]); tsets(S, 'q2', [[3, 'warn', 40]]); tsets(S, 'q3', [[3, 'warn', 40]]);
  T(S, 'qn', 22, 3.95, ['AB…AB: 접두사 = 접미사', 'AB…AB: prefix = suffix'], 'alx-tiny', 3);
  stepT(S, 'k', 1, 7.0, [['앞의 4글자가 맞다가 5번째에서 어긋났어요 (A ≠ C)', 'the first 4 characters match, then the 5th differs (A ≠ C)'], ['단순한 방법: 한 칸 밀고 처음부터 다시 비교 → 최악 O(n·m)', 'naive: shift by one and compare from scratch → worst case O(n·m)'], ['실패 함수 π: 이미 맞은 ABAB의 접두사 AB = 접미사 AB → 2글자는 다시 볼 필요 없음', 'failure function π: in the matched ABAB, prefix AB = suffix AB → 2 characters need no recheck'], ['KMP: 패턴을 π[3] = 2에 맞춰 밀고 i는 4부터 그대로 계속 → 발견', 'KMP: slide the pattern to π[3] = 2 and keep going from i = 4 → found']]);
  fin(S, 'z', 8.4, [['KMP: 텍스트 포인터가 절대 뒤로 가지 않아 O(n + m)에 찾아요', 'KMP never moves the text pointer backward, so it runs in O(n + m)', 'alx-xs alx-a'], ['π는 패턴만 보고 미리 계산 · 어긋나면 π를 따라 패턴만 점프해요', 'π is precomputed from the pattern alone; on a mismatch only the pattern jumps'], ['라빈-카프(롤링 해시), 보이어-무어(뒤에서부터 비교)도 자주 쓰는 문자열 검색이에요', 'Rabin–Karp (rolling hash) and Boyer–Moore (compare from the end) are other common choices']]);
  S.cap(1, '어긋난 순간', 'The mismatch').cap(2, '단순한 방법의 낭비', 'What the naive way wastes').cap(3, '실패 함수 π', 'The failure function π').cap(4, '뒤로 가지 않고 점프', 'Jump without going back').cap(5, 'KMP 문자열 검색', 'KMP string search');
  return S;
}

/* ================= graphs ================= */
function sBellman() {
  const S = scene({ id: 'al-bellman', steps: 5, per: 1.6 });
  const N = { S: [2.5, 5.2], A: [9, 1.8], B: [9, 8.6], C: [15.5, 5.2] }, R = 1.1;
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, k === 'S' ? 'accent' : 'line', 0, { r: R, pct: k === 'S' ? 25 : 14 }));
  ['A', 'B', 'C'].forEach(k => tsets(S, 'n' + k, [[4, 'danger', 22], [5, 'line', 14]]));
  const E = [['SA', 'S', 'A', '4', -.6], ['SB', 'S', 'B', '5', .6], ['BA', 'B', 'A', '−3', 1.2], ['AC', 'A', 'C', '2', -.6]];
  E.forEach(([k, a, b, w, ld]) => { ga(S, 'e' + k, N[a], N[b], k === 'BA' ? 'danger' : 'ink-3', 0, R); const [mx, my] = mid(N[a], N[b], ld); T(S, 'w' + k, mx - 1.5, my - .45, w, 'cz-tc cz-mono alx-xs' + (k === 'BA' ? ' alx-r' : ''), 0, { w: 3 }); });
  ga(S, 'eCB', N.C, N.B, 'danger', 4, R, { dash: 1, off: 5 }); const [cx, cy] = mid(N.C, N.B, -.7); T(S, 'wCB', cx - 1.5, cy - .45, '−8', 'cz-tc cz-mono alx-xs alx-r', 4, { w: 3, off: 5 });
  const CX = j => 22.6 + j * 2.2, RY = r => 2.5 + r * 1.3;
  ['S', 'A', 'B', 'C'].forEach((h, j) => T(S, 'h' + j, CX(j), 1.25, h, 'cz-tc cz-mono alx-xs', 1, { w: 2 }));
  const ROWS = [[['다익스트라', 'Dijkstra'], ['0', '4', '5', '6'], 1, [3, 'danger']], [['1회차', 'round 1'], ['0', '2', '5', '6'], 2, [1, 'ok']], [['2회차', 'round 2'], ['0', '2', '5', '4'], 3, [3, 'ok']], [['3회차', 'round 3'], ['0', '2', '5', '4'], 3, null]];
  ROWS.forEach(([lab, vals, st, hi], r) => { box2(S, 'rl' + r, 18, RY(r), 4.4, 1.1, lab, 'ink-3', st, { pct: 12 }); vals.forEach((v, j) => box2(S, `c${r}_${j}`, CX(j), RY(r), 2, 1.1, v, hi && hi[0] === j ? hi[1] : 'line', st, { pct: hi && hi[0] === j ? 35 : 22 })); });
  T(S, 'r3n', 18, 7.7, ['3회차: 변화 없음 → 일찍 종료', 'round 3: no change → stop early'], 'alx-xs alx-g', 3);
  stepT(S, 'k', 1, 10.4, [['다익스트라: A를 4로 먼저 확정 → B→A(−3)로 2가 되는 걸 놓쳐 C = 6 ✗', 'Dijkstra finalizes A at 4 too early, misses 2 via B→A (−3) and gets C = 6 ✗'], ['벨만-포드: 모든 간선을 한 번씩 완화하는 일을 V − 1번 반복해요', 'Bellman–Ford relaxes every edge, V − 1 rounds in a row'], ['2회차에 A의 개선이 C로 전파돼 C = 4 · 3회차엔 변화가 없어요', 'round 2 carries A’s improvement on to C = 4 · round 3 changes nothing'], ['C→B(−8)를 더하면 B→A→C→B의 합이 −9인 음수 사이클', 'add C→B (−8) and B→A→C→B sums to −9: a negative cycle']], 'alx-xs', 5);
  T(S, 'k4b', 1, 11.5, ['V번째 회차에도 값이 줄어들면 “최단 경로 없음”을 알아내요', 'if round V still improves something, no shortest path exists'], 'alx-xs alx-r', 4, { off: 5 });
  fin(S, 'z', 10.4, [['벨만-포드: 음수 간선이 있어도 되고 음수 사이클도 찾아내는 최단 경로 알고리즘, O(V·E)', 'Bellman–Ford handles negative edges and detects negative cycles, in O(V·E)', 'alx-xs alx-a'], ['다익스트라는 더 빠르지만 (O(E log V)) 음수 간선이 없어야 해요', 'Dijkstra is faster (O(E log V)) but needs non-negative edges'], ['거리 벡터 라우팅(RIP)이 같은 아이디어로 동작해요', 'distance-vector routing (RIP) works on the same idea']]);
  S.cap(1, '음수 간선과 다익스트라', 'A negative edge breaks Dijkstra').cap(2, '모든 간선 완화', 'Relax every edge').cap(3, '개선이 전파돼요', 'Improvements propagate').cap(4, '음수 사이클 감지', 'Detecting a negative cycle').cap(5, '벨만-포드', 'Bellman–Ford');
  return S;
}
function sFloyd() {
  const S = scene({ id: 'al-floyd', steps: 5, per: 1.6 });
  const N = { 1: [2.5, 2.2], 2: [11, 2.2], 3: [11, 9], 4: [2.5, 9] }, R = 1.05;
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, 'line', 0, { r: R }));
  tsets(S, 'n1', [[2, 'accent', 35], [3, 'line', 14]]); tsets(S, 'n2', [[3, 'accent', 35], [4, 'line', 14]]);
  [['12', '3', -.6], ['13', '8', .6], ['23', '2', -.6], ['34', '1', -.6], ['41', '2', -.6]].forEach(([k, w, ld]) => { const a = N[k[0]], b = N[k[1]]; ga(S, 'e' + k, a, b, 'ink-3', 0, R); const [mx, my] = mid(a, b, ld); T(S, 'w' + k, mx - 1.5, my - .45, w, 'cz-tc cz-mono alx-xs', 0, { w: 3 }); });
  const CX = j => 16.8 + j * 3.4, RY = i => 2.4 + i * 1.45;
  [1, 2, 3, 4].forEach((h, j) => { T(S, 'hc' + j, CX(j), 1.2, String(h), 'cz-tc cz-mono alx-xs alx-a', 0, { w: 3.2 }); T(S, 'hr' + j, 15, RY(j) + .2, String(h), 'cz-tc cz-mono alx-xs alx-a', 0, { w: 1.6 }); });
  const D0 = [['0', '3', '8', '∞'], ['∞', '0', '2', '∞'], ['∞', '∞', '0', '1'], ['2', '∞', '∞', '0']];
  const CH = { '4_2': [[2, '5']], '4_3': [[2, '10'], [3, '7']], '1_3': [[3, '5']], '1_4': [[4, '6']], '2_4': [[4, '3']], '2_1': [[4, '5']], '3_1': [[4, '3']], '3_2': [[4, '6']] };
  D0.forEach((row, i) => row.forEach((v, j) => {
    const k = `${i + 1}_${j + 1}`, ch = CH[k] || [];
    box2(S, 'm' + k, CX(j), RY(i), 3.2, 1.25, '', i === j ? 'ink-3' : 'line', 0, { pct: i === j ? 10 : 22 });
    const tl = []; ch.forEach(([s]) => { tl.push([s, 'warn', 45]); tl.push([s + 1, 'line', 22]); }); if (tl.length) tsets(S, 'm' + k, tl);
    ver(S, 'v' + k + '_', CX(j), RY(i) + .2, [[0, v], ...ch], 'cz-tc cz-mono alx-xs', 3.2);
  }));
  frame(S, 'fr1', 16.65, RY(0) - .12, 13.8, 1.5, 'accent', 2, { w: .1, off: 3 }); frame(S, 'fc1', CX(0) - .12, 2.28, 3.44, 5.9, 'accent', 2, { w: .1, off: 3 });
  frame(S, 'fr2', 16.65, RY(1) - .12, 13.8, 1.5, 'accent', 3, { w: .1, off: 4 }); frame(S, 'fc2', CX(1) - .12, 2.28, 3.44, 5.9, 'accent', 3, { w: .1, off: 4 });
  ver(S, 'kl', 15, 8.4, [[1, ['D⁰: 간선 하나로 가는 거리', 'D⁰: one-edge distances']], [2, ['k = 1: 정점 1을 거쳐 가면?', 'k = 1: via vertex 1?']], [3, ['k = 2: 정점 2를 거쳐 가면?', 'k = 2: via vertex 2?']], [4, ['k = 3, 4까지 끝: 완성', 'k = 3 and 4 done: complete']]], 'alx-xs alx-a');
  code(S, 'cd', 15, 9.7, 16.6, [['for k in V:      # 경유 정점', 'for k in V:      # via vertex'], '  for i in V:', '    for j in V:', '      D[i][j] = min(D[i][j], D[i][k] + D[k][j])'], [], { st: 1 });
  stepT(S, 's', 1, 16.0, [['처음엔 간선 하나로 바로 가는 거리 (없으면 ∞)', 'start with direct edge lengths (∞ if none)'], ['4→1→2 = 2 + 3 = 5, 4→1→3 = 2 + 8 = 10 으로 갱신', 'update 4→1→2 = 2 + 3 = 5 and 4→1→3 = 2 + 8 = 10'], ['1→2→3 = 5 < 8, 4→2→3 = 7 < 10 으로 더 짧아져요', '1→2→3 = 5 < 8 and 4→2→3 = 7 < 10 get shorter'], ['k = 3, 4에서 남은 칸이 채워져 모든 쌍의 최단 거리가 완성돼요', 'k = 3 and 4 fill the rest: every pair now has its shortest distance']]);
  fin(S, 'z', 17.3, [['플로이드-워셜: 경유 정점을 하나씩 허용하며 모든 쌍의 최단 거리를 구하는 DP', 'Floyd–Warshall: a DP that allows one more via-vertex per round to get all-pairs shortest paths', 'alx-xs alx-a'], ['세 겹 반복이라 O(V³) · 음수 간선 OK · 대각선이 음수가 되면 음수 사이클', 'three nested loops, O(V³) · negative edges OK · a negative diagonal means a negative cycle']]);
  S.cap(1, '거리 행렬 D⁰', 'The distance matrix D⁰').cap(2, '정점 1을 거쳐 가기', 'Going through vertex 1').cap(3, '정점 2를 거쳐 가기', 'Going through vertex 2').cap(4, '모든 쌍 완성', 'All pairs done').cap(5, '플로이드-워셜', 'Floyd–Warshall');
  return S;
}
function sFlow() {
  const S = scene({ id: 'al-flow', steps: 5, per: 1.6 });
  const N = { s: [2.5, 5.5], a: [10, 1.9], b: [10, 9.1], t: [17.5, 5.5] }, R = 1.1;
  Object.entries(N).forEach(([k, [x, y]]) => stt(S, 'n' + k, x, y, k, k === 's' || k === 't' ? 'accent' : 'line', 0, { r: R, pct: k === 's' || k === 't' ? 25 : 14 }));
  const E = { sa: ['s', 'a', -.7], sb: ['s', 'b', .7], ab: ['a', 'b', .8], at: ['a', 't', -.7], bt: ['b', 't', .7] };
  const FL = { sa: [[0, '0/2'], [2, '2/2']], sb: [[0, '0/2'], [3, '2/2']], ab: [[0, '0/2'], [2, '2/2'], [3, '0/2']], at: [[0, '0/2'], [3, '2/2']], bt: [[0, '0/2'], [2, '2/2']] };
  Object.entries(E).forEach(([k, [a, b, ld]]) => { ga(S, 'e' + k, N[a], N[b], 'ink-3', 0, R); const [mx, my] = mid(N[a], N[b], ld); ver(S, 'f' + k + '_', mx - 1.5, my - .45, FL[k], 'cz-tc cz-mono alx-xs', 3); });
  ['sa', 'ab', 'bt'].forEach(k => acol(S, 'e' + k, 2, 'warn'));
  acol(S, 'esa', 3, 'accent'); acol(S, 'ebt', 3, 'accent'); acol(S, 'eab', 3, 'ink-3'); acol(S, 'esb', 3, 'ok'); acol(S, 'eat', 3, 'ok');
  acol(S, 'esb', 4, 'accent'); acol(S, 'eat', 4, 'accent');
  ar(S, 'rv', [10.75, 8.3], [10.75, 2.7], 'ok', 3, { h: .1, dash: 1, off: 4 }); T(S, 'rvl', 11.2, 5.1, ['역방향 2', 'reverse 2'], 'alx-tiny alx-g', 3, { off: 4 });
  seg(S, 'cutl', [6.3, .6], [6.3, 10.6], 4, 'danger', .08, { dash: 1, off: 5 }); T(S, 'cutt', 4.6, 10.7, ['컷', 'cut'], 'alx-tiny alx-r', 4, { off: 5 });
  T(S, 'p1', 21, 1.4, ['경로 1: s→a→b→t  +2', 'path 1: s→a→b→t  +2'], 'cz-mono alx-xs alx-w', 2);
  T(S, 'p2', 21, 2.7, ['경로 2: s→b→a→t  +2', 'path 2: s→b→a→t  +2'], 'cz-mono alx-xs alx-g', 3);
  ver(S, 'tot', 21, 4.2, [[2, ['총 유량 2', 'total flow 2']], [3, ['총 유량 4', 'total flow 4']]], 'alx-s alx-a');
  T(S, 'cutv', 21, 5.8, ['최소 컷 = 2 + 2 = 4', 'min cut = 2 + 2 = 4'], 'alx-xs alx-r', 4);
  stepT(S, 'k', 1, 11.8, [['s에서 t로 최대 몇 단위를 흘릴 수 있을까요? (간선 숫자 = 흐름/용량)', 'how much can flow from s to t? (edge labels are flow/capacity)'], ['아무 경로나 골라 병목만큼 흘려요: s→a→b→t로 2 · 이제 더 갈 길이 없어 보여요', 'push the bottleneck along a path: 2 via s→a→b→t · now no path seems left'], ['잔여 그래프엔 보낸 만큼 되돌리는 역방향 간선이 있어요 → s→b→a→t로 2 더', 'the residual graph has reverse edges that undo flow → 2 more via s→b→a→t'], ['a→b의 흐름은 상쇄돼 0 · 총 4 = s를 잘라 내는 최소 컷 용량', 'a→b cancels to 0 · the total of 4 equals the min cut around s']]);
  fin(S, 'z', 13.2, [['포드-풀커슨: 잔여 그래프에 증가 경로가 없을 때까지 흘려 보내면 최대 유량', 'Ford–Fulkerson: push along augmenting paths in the residual graph until none remain', 'alx-xs alx-a'], ['최대 유량 = 최소 컷 · BFS로 가장 짧은 증가 경로를 고르면 에드몬드-카프 O(V·E²)', 'max flow = min cut · picking the shortest augmenting path by BFS gives Edmonds–Karp, O(V·E²)'], ['이분 매칭, 작업 배정, 이미지 분할, 네트워크 용량 계산에 쓰여요', 'used for bipartite matching, assignment, image segmentation and network capacity']]);
  S.cap(1, '용량이 있는 네트워크', 'A network with capacities').cap(2, '첫 번째 증가 경로', 'The first augmenting path').cap(3, '역방향 간선으로 되돌리기', 'Undoing flow with a reverse edge').cap(4, '최대 유량 = 최소 컷', 'Max flow = min cut').cap(5, '최대 유량', 'Maximum flow');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'alx-xs', i + 1, { off: i + 2 }));
function sEdit() {
  const S = scene({ id: 'al-edit', steps: 5, per: 1.7 });
  const A = 'kitten', B = 'sitting', m = A.length, n = B.length, D = [...Array(m + 1)].map((_, i) => [...Array(n + 1)].map((_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
  const CW = 1.55, CH = 1.12, X0 = 3.2, Y0 = 2.0, cx = j => X0 + j * CW, cy = i => Y0 + i * CH;
  ['', ...B].forEach((c, j) => T(S, 'hb' + j, cx(j), Y0 - 1.1, c || 'ε', 'cz-tc cz-mono alx-s', 0, { w: CW }));
  ['', ...A].forEach((c, i) => T(S, 'ha' + i, X0 - 1.5, cy(i) + .1, c || 'ε', 'cz-tc cz-mono alx-s', 0, { w: 1.2 }));
  const path = []; { let i = m, j = n; path.push([i, j]); while (i > 0 || j > 0) { const c = D[i][j]; if (i && j && D[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1) === c) { i--; j--; } else if (i && D[i - 1][j] + 1 === c) i--; else j--; path.push([i, j]); } }
  const onP = (i, j) => path.some(([a, b]) => a === i && b === j);
  for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) { const st = (i === 0 || j === 0) ? 1 : 3; cell(S, `c${i}_${j}`, cx(j), cy(i), CW - .08, CH - .08, String(D[i][j]), 'line', 14, st); if (onP(i, j)) tsets(S, `c${i}_${j}`, [[4, 'warn', 45]]); }
  const hi = [1, 1];
  cell(S, 'hx', cx(hi[1]), cy(hi[0]), CW - .08, CH - .08, '?', 'accent', 40, 2, { off: 3 });
  [[hi[0] - 1, hi[1] - 1, 'ok'], [hi[0] - 1, hi[1], 'warn'], [hi[0], hi[1] - 1, 'danger']].forEach(([i, j, c], q) => frame(S, 'nb' + q, cx(j) - .04, cy(i) - .04, CW, CH, c, 2, { off: 3, w: .12, r: .2 }));
  const R = 16.4;
  T(S, 'r0', R, .6, ['kitten → sitting, 최소 몇 번 고칠까', 'kitten → sitting in how few edits?'], 'alx-xs', 1);
  T(S, 'r1', R, 1.8, ['첫 행·열: 빈 문자열에서 하나씩 넣기·지우기', 'first row and column: inserts or deletes from empty'], 'alx-xs', 1, { w: 14.4 });
  T(S, 'r2', R, 3.6, 'D[i][j] = min(', 'cz-mono alx-xs', 2);
  T(S, 'r3', R + .6, 4.6, ['D[i−1][j−1] + (다르면 1)  교체', 'D[i−1][j−1] + (a≠b)  substitute'], 'cz-mono alx-xs alx-g', 2);
  T(S, 'r4', R + .6, 5.6, ['D[i−1][j] + 1  삭제', 'D[i−1][j] + 1  delete'], 'cz-mono alx-xs alx-w', 2);
  T(S, 'r5', R + .6, 6.6, ['D[i][j−1] + 1 )  삽입', 'D[i][j−1] + 1 )  insert'], 'cz-mono alx-xs alx-r', 2);
  T(S, 'r6', R, 8.2, [`오른쪽 아래 = 편집 거리 ${D[m][n]}`, `bottom-right = edit distance ${D[m][n]}`], 'alx-s alx-a', 3);
  T(S, 'r7', R, 9.8, ['되짚기: k→s 교체, e→i 교체, g 삽입', 'trace back: k→s, e→i, insert g'], 'alx-xs alx-w', 4);
  T(S, 'r8', R, 11.0, 'kitten → sitten → sittin → sitting', 'cz-mono alx-xs', 4);
  notesSplit(S, 'k', 15.6, [['편집 거리: 한 글자 삽입·삭제·교체를 최소 몇 번 해야 같아지는지 · 첫 행과 열은 빈 문자열과의 거리', 'edit distance counts the fewest single-character inserts, deletes and substitutions · the first row and column compare with the empty string'], ['각 칸은 왼쪽 위(교체), 위(삭제), 왼쪽(삽입)에서 오는 세 값 중 최솟값이에요', 'each cell takes the cheapest of three neighbours: diagonal (substitute), above (delete), left (insert)'], [`표를 다 채우면 오른쪽 아래 칸이 답 · kitten과 sitting은 ${D[m][n]}이에요`, `fill the table and the bottom-right cell is the answer · ${D[m][n]} for kitten and sitting`], ['답 칸에서 거꾸로 따라가면 실제 편집 과정이 나와요', 'tracing back from the answer recovers the actual edits']]);
  fin(S, 'z', 15.6, [['레벤슈타인 거리: O(mn) 동적 계획법 · 행 두 줄만 있으면 메모리 O(n)', 'Levenshtein distance: O(mn) dynamic programming · two rows suffice for O(n) memory', 'alx-xs alx-a'], ['맞춤법 추천, 퍼지 검색, 중복 데이터 정리, 음성 인식 평가(WER)에 써요', 'used in spelling suggestions, fuzzy search, record deduplication and speech-recognition scoring (WER)'], ['DNA 정렬의 니들먼-분쉬도 같은 표에 점수만 다르게 매겨요', 'DNA alignment (Needleman–Wunsch) fills the same table with different scores']]);
  S.cap(1, '빈 문자열에서 시작', 'Start from the empty string').cap(2, '세 가지 편집 중 최소', 'The cheapest of three edits').cap(3, '표 채우기', 'Fill the table').cap(4, '되짚어 편집 과정 찾기', 'Trace back the edits').cap(5, '편집 거리', 'Edit distance');
  return S;
}

function sPrim() {
  const S = scene({ id: 'al-prim', steps: 5, per: 1.7 });
  const N = { A: [3.2, 3.6], B: [10.2, 2.0], C: [17.2, 3.6], D: [3.2, 11.2], E: [10.2, 8.4], F: [17.2, 11.2] };
  const E = [['A', 'B', 4], ['A', 'D', 3], ['B', 'E', 2], ['B', 'C', 7], ['C', 'E', 5], ['C', 'F', 6], ['D', 'E', 1], ['E', 'F', 8], ['D', 'F', 9]];
  const key = (a, b) => [a, b].sort().join('');
  const pick = ['AD', 'DE', 'BE', 'CE', 'CF'], ST = { AD: 2, DE: 3, BE: 3, CE: 4, CF: 4 };
  E.forEach(([a, b, w]) => { const k = key(a, b), p = N[a], q = N[b]; seg(S, 'e' + k, p, q, 0, 'line', .1);
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = -(q[1] - p[1]) / L, uy = (q[0] - p[0]) / L;
    T(S, 'w' + k, mx - ux * .95 - .6, my - uy * .95 - .55, String(w), 'cz-tc cz-mono alx-s', 0, { w: 1.2 });
    if (ST[k]) { seg(S, 'p' + k, p, q, ST[k], 'ok', .24); T(S, 'o' + k, mx + ux * 1.0 - .6, my + uy * 1.0 - .55, '①②③④⑤'[pick.indexOf(k)], 'cz-tc alx-s alx-g', ST[k], { w: 1.2 }); } });
  Object.entries(N).forEach(([k, [x, y]]) => { stt(S, 'n' + k, x, y, k, 'line', 0, { r: .95 }); tsets(S, 'n' + k, [[k === 'A' ? 1 : ({ D: 2, E: 3, B: 3, C: 4, F: 4 })[k], 'ok', 40]]); });
  seg(S, 'fAB', N.A, N.B, 2, 'warn', .1, { dash: 1, off: 3 }); seg(S, 'fAD', N.A, N.D, 2, 'warn', .1, { dash: 1, off: 3 });
  const R = 20.4;
  T(S, 'r1', R, 1.0, ['A에서 시작', 'start at A'], 'alx-xs alx-g', 1);
  T(S, 'r2', R, 2.2, ['트리와 바깥을 잇는 간선 중 가장 가벼운 것', 'take the lightest edge leaving the tree'], 'alx-xs', 2, { w: 10.4 });
  T(S, 'r3', R, 4.0, ['후보: A–B 4, A–D 3 → A–D', 'candidates: A–B 4, A–D 3 → A–D'], 'cz-mono alx-xs alx-w', 2, { off: 3, w: 10.6 });
  T(S, 'r4', R, 4.0, ['D–E 1, 그다음 B–E 2', 'D–E 1, then B–E 2'], 'cz-mono alx-xs alx-w', 3, { off: 4 });
  T(S, 'r5', R, 4.0, ['C–E 5, C–F 6으로 완성', 'C–E 5 and C–F 6 finish it'], 'cz-mono alx-xs alx-w', 4);
  T(S, 'r6', R, 6.0, ['합계 3 + 1 + 2 + 5 + 6 = 17', 'total 3 + 1 + 2 + 5 + 6 = 17'], 'cz-mono alx-s alx-g', 4);
  T(S, 'r7', R, 7.4, ['크루스칼도 같은 17 (방법만 달라요)', 'Kruskal also gets 17 (a different route)'], 'alx-xs', 4, { w: 10.6 });
  notesSplit(S, 'k', 15.6, [['프림 알고리즘은 한 정점에서 시작해 트리를 한 정점씩 키워요', 'Prim’s algorithm grows the tree one vertex at a time from a starting vertex'], ['트리 안과 밖을 잇는 간선(점선) 중 가장 가벼운 것을 골라 그 정점을 붙여요', 'among edges joining the tree to the outside (dashed), it adds the lightest and its vertex'], ['새 정점이 붙으면 그 정점의 간선들이 후보에 들어와요 · D–E 1, B–E 2', 'each new vertex adds its edges to the candidates · D–E 1, then B–E 2'], ['모든 정점이 붙으면 최소 신장 트리 완성 · 가중치 합 17', 'once every vertex is in, the minimum spanning tree is done · total weight 17']]);
  fin(S, 'z', 15.6, [['프림: 트리에서 뻗는 가장 싼 간선을 반복해서 붙이는 그리디', 'Prim’s algorithm greedily adds the cheapest edge leaving the tree', 'alx-xs alx-a'], ['우선순위 큐(힙)로 O(E log V) · 간선이 빽빽한 그래프는 배열로 O(V²)', 'O(E log V) with a priority queue (heap) · O(V²) with an array on dense graphs'], ['다익스트라와 거의 같은 꼴 · 크루스칼은 간선 정렬과 유니온 파인드를 써요', 'nearly the same code as Dijkstra · Kruskal sorts edges and uses union–find instead']]);
  S.cap(1, '한 정점에서 시작', 'Start from one vertex').cap(2, '가장 가벼운 바깥 간선', 'The lightest outgoing edge').cap(3, '트리를 키워 가기', 'Grow the tree').cap(4, '완성: 최소 신장 트리', 'Done: the minimum spanning tree').cap(5, '프림 알고리즘', 'Prim’s algorithm');
  return S;
}

return { css: CSSX, secs: [], add: {
  'al-tech': [
    item('al-master', '분할 정복과 마스터 정리', 'Divide and conquer and the master theorem', '문제를 작은 문제로 쪼개 풀고 합치는 분할 정복의 실행 시간은 T(n) = a·T(n/b) + f(n) 꼴 점화식으로 나타나요. 재귀 트리나 마스터 정리로 풀어요.', '병합 정렬은 T(n) = 2T(n/2) + n이에요. 재귀 트리를 그리면 층마다 합치는 비용이 n이고 층이 log₂n개라 Θ(n log n)이 돼요. 일반형에선 f(n)을 n^(log_b a)와 비교해, f가 작으면 리프가 지배(8T(n/2)+n² → Θ(n³)), 같으면 층마다 같아 log가 붙고(병합 정렬, 이진 탐색 Θ(log n)), 크면 뿌리가 지배(2T(n/2)+n² → Θ(n²))해요. 카라츠바 곱셈, 슈트라센 행렬 곱셈, 가장 가까운 점 쌍도 이 틀로 분석해요.', 'Divide and conquer splits a problem into smaller ones, solves them and combines the results; its running time is a recurrence T(n) = a·T(n/b) + f(n), solved with a recursion tree or the master theorem.', 'Merge sort is T(n) = 2T(n/2) + n. In its recursion tree each level costs n to merge and there are log₂n levels, giving Θ(n log n). In general you compare f(n) with n^(log_b a): if f is smaller the leaves dominate (8T(n/2) + n² → Θ(n³)); if equal, every level costs the same and a log factor appears (merge sort, or Θ(log n) for binary search); if larger the root dominates (2T(n/2) + n² → Θ(n²)). Karatsuba multiplication, Strassen’s matrix multiply and closest pair are analysed the same way.', sMaster()),
    item('al-knapsack', '0/1 배낭 문제', 'The 0/1 knapsack problem', '무게 제한이 있는 가방에 가치의 합이 최대가 되도록 물건을 고르는 문제예요. 물건을 쪼갤 수 없으면 탐욕으로는 안 되고 DP로 풀어요.', '용량 5에 A(무게 1, 가치 6), B(2, 10), C(3, 12)가 있을 때 가치/무게 순 탐욕은 A·B로 16에서 멈추지만, 정답은 B·C로 22예요. dp[i][c]를 “i번째 물건까지, 용량 c로 얻는 최대 가치”로 두고 dp[i][c] = max(dp[i−1][c], dp[i−1][c−w] + v)로 표를 채워요. 표를 거꾸로 따라가며 위 칸과 값이 다른 행의 물건을 고르면 선택이 복원돼요. 시간은 O(n·W)지만 W가 숫자 크기라 의사 다항 시간이고, 문제 자체는 NP-난해예요. 쪼갤 수 있는 분할 배낭은 탐욕이 최적이에요.', 'Pick items for a weight-limited bag so their total value is as large as possible; when items can’t be split, greedy fails and dynamic programming is needed.', 'With capacity 5 and items A (weight 1, value 6), B (2, 10) and C (3, 12), greedy by value per weight stops at A + B = 16, but the best is B + C = 22. Define dp[i][c] as the best value using items up to i with capacity c and fill the table with dp[i][c] = max(dp[i−1][c], dp[i−1][c−w] + v). Walking back up the table, a row whose value differs from the row above marks a chosen item. The time is O(n·W), pseudo-polynomial because W is a numeric value, and the problem is NP-hard in general. The fractional version, where items can be split, is solved optimally by greedy.', sKnap()),
    item('al-kmp', 'KMP 문자열 검색', 'KMP string search', '긴 텍스트에서 패턴을 찾을 때, 어긋나도 텍스트를 뒤로 되돌아가지 않도록 패턴의 “실패 함수”를 미리 계산하는 알고리즘이에요.', '단순한 방법은 어긋날 때마다 패턴을 한 칸 밀고 처음부터 다시 비교해 최악 O(n·m)이 걸려요. KMP는 패턴의 각 접두부에서 “접두사이면서 접미사인 가장 긴 길이” π를 미리 구해 둬요. ABABC에서 ABAB까지 맞고 어긋나면 π[3] = 2이므로, 이미 맞은 AB를 그대로 살린 채 패턴만 밀고 텍스트 포인터는 그 자리에서 계속 비교해요. 그래서 O(n + m)이에요. 라빈-카프는 롤링 해시로, 보이어-무어는 뒤에서부터 비교하며 크게 건너뛰어요.', 'An algorithm for finding a pattern in long text that precomputes the pattern’s failure function so the text pointer never moves backward after a mismatch.', 'The naive approach shifts the pattern by one after each mismatch and compares from scratch, costing O(n·m) in the worst case. KMP precomputes π, the length of the longest prefix of each pattern prefix that is also its suffix. If ABAB of ABABC matches and the next character fails, π[3] = 2, so the pattern slides while keeping the already-matched AB, and comparison continues at the same text position. That makes it O(n + m). Rabin–Karp uses a rolling hash instead, and Boyer–Moore compares from the end to skip ahead.', sKmp())
  ],
  'al-graph': [
    item('al-bellman', '벨만-포드와 음수 간선', 'Bellman–Ford and negative edges', '음수 가중치 간선이 있어도 최단 거리를 구하고, 음수 사이클까지 찾아내는 알고리즘이에요. 다익스트라가 틀리는 경우를 해결해요.', '다익스트라는 가장 가까운 정점을 한 번 확정하면 다시 보지 않아서, 나중에 음수 간선(B→A = −3)으로 더 짧아지는 경로를 놓쳐요. 벨만-포드는 모든 간선을 한 번씩 완화하는 일을 V − 1번 반복해요. 최단 경로는 간선이 최대 V − 1개이므로 충분하고, 변화가 없는 회차가 오면 일찍 끝내요. V번째 회차에도 값이 줄어들면 음수 사이클이 있어 최단 경로가 정의되지 않아요. 시간은 O(V·E)이고, 거리 벡터 라우팅(RIP)이 같은 원리예요.', 'A shortest-path algorithm that works with negative edge weights and detects negative cycles, covering the cases where Dijkstra goes wrong.', 'Dijkstra never revisits a vertex once it finalizes it, so it misses a route that a negative edge (B→A = −3) makes shorter later. Bellman–Ford relaxes every edge once per round, for V − 1 rounds; a shortest path has at most V − 1 edges, so that is enough, and a round with no change lets it stop early. If round V still improves a distance, a negative cycle exists and shortest paths are undefined. It runs in O(V·E), and distance-vector routing (RIP) uses the same idea.', sBellman()),
    item('al-floyd', '플로이드-워셜', 'Floyd–Warshall', '모든 정점 쌍 사이의 최단 거리를 한 번에 구하는 DP예요. “k번 정점까지 거쳐 가도 된다”는 조건을 하나씩 넓혀 가요.', '처음엔 간선 하나로 가는 거리(없으면 ∞)로 행렬을 채우고, k = 1, 2, …마다 모든 (i, j)에 대해 D[i][j] = min(D[i][j], D[i][k] + D[k][j])로 갱신해요. 예를 들어 k = 2에서 1→2→3 = 5가 직접 간선 8보다 짧아 바뀌어요. 세 겹 반복이라 O(V³)이고 코드가 아주 짧아요. 음수 간선도 되고, 끝난 뒤 대각선 D[i][i]가 음수면 음수 사이클이에요. 정점이 적고 모든 쌍이 필요할 때 좋아요.', 'A dynamic program that computes shortest distances between every pair of vertices at once, widening the set of allowed intermediate vertices one at a time.', 'Start with a matrix of direct edge lengths (∞ where there is none), then for k = 1, 2, … update every (i, j) with D[i][j] = min(D[i][j], D[i][k] + D[k][j]). At k = 2, for example, 1→2→3 = 5 beats the direct edge of 8. Three nested loops make it O(V³) with very short code. Negative edges are fine, and a negative diagonal entry D[i][i] at the end reveals a negative cycle. It suits graphs with few vertices when all pairs are needed.', sFloyd()),
    item('al-flow', '최대 유량', 'Maximum flow', '용량이 있는 네트워크에서 출발점 s부터 도착점 t까지 최대 얼마나 흘려보낼 수 있는지 구하는 문제예요. 포드-풀커슨 방법으로 풀어요.', '경로를 하나 골라 병목 용량만큼 흘리는 일을 반복해요. 그런데 s→a→b→t로 2를 먼저 보내면 더 갈 길이 없어 보여 2에서 멈춰요. 잔여 그래프에는 보낸 만큼 되돌릴 수 있는 역방향 간선(b→a)이 생기므로, s→b→a→t로 2를 더 보내 총 4가 돼요(a→b 흐름은 상쇄). 최대 유량은 s와 t를 가르는 최소 컷의 용량과 같아요. BFS로 가장 짧은 증가 경로를 고르면 에드몬드-카프, O(V·E²)이에요. 이분 매칭과 작업 배정에 쓰여요.', 'Find how much can be pushed from a source s to a sink t through a network whose edges have capacities, using the Ford–Fulkerson method.', 'Repeatedly pick a path and push its bottleneck capacity. Sending 2 along s→a→b→t first seems to leave no path, stuck at 2. But the residual graph gains a reverse edge (b→a) that can undo flow, so s→b→a→t carries 2 more for a total of 4, cancelling the flow on a→b. The maximum flow equals the capacity of the minimum cut separating s from t. Choosing the shortest augmenting path by BFS gives Edmonds–Karp, O(V·E²). It powers bipartite matching and assignment problems.', sFlow())
  ]
},
after: {
  'al-lcs': [item('al-edit', '편집 거리', 'Edit distance', '한 문자열을 다른 문자열로 바꾸는 데 필요한 한 글자 삽입·삭제·교체의 최소 횟수예요. 2차원 표를 채우는 동적 계획법으로 구해요.', '레벤슈타인 거리 D[i][j]는 A의 앞 i글자를 B의 앞 j글자로 바꾸는 최소 편집 횟수예요. 빈 문자열에서 시작하면 첫 행과 열은 0, 1, 2, …(삽입이나 삭제만)이고, 나머지 칸은 D[i−1][j−1] + (글자가 다르면 1)(교체), D[i−1][j] + 1(삭제), D[i][j−1] + 1(삽입) 중 최솟값이에요. kitten과 sitting의 표를 채우면 오른쪽 아래가 3이고, 그 칸에서 어느 방향으로 왔는지 거꾸로 따라가면 k→s 교체, e→i 교체, 끝에 g 삽입이라는 실제 편집 과정이 나와요. 시간은 O(mn)이고, 바로 위 행만 있으면 되므로 메모리는 O(n)으로 줄일 수 있어요. 맞춤법 검사의 추천 단어, 검색어 오타 보정(퍼지 검색), 중복 고객 데이터 정리, 음성 인식의 단어 오류율(WER) 평가에 쓰여요. git diff가 쓰는 LCS는 교체가 없는 특수한 경우이고, DNA 서열 정렬의 니들먼-분쉬 알고리즘은 같은 표에 일치·불일치·간격마다 다른 점수를 매겨요.', 'The fewest single-character insertions, deletions and substitutions needed to turn one string into another, computed by filling a 2-D table with dynamic programming.', 'The Levenshtein distance D[i][j] is the minimum number of edits turning A’s first i characters into B’s first j. Starting from the empty string, the first row and column read 0, 1, 2, … (only inserts or deletes), and every other cell is the minimum of D[i−1][j−1] + (1 if the characters differ) for a substitution, D[i−1][j] + 1 for a deletion and D[i][j−1] + 1 for an insertion. Filling the table for kitten and sitting gives 3 in the bottom-right cell, and tracing back which neighbour each value came from recovers the edits: k→s, e→i and a final inserted g. It takes O(mn) time, and since only the previous row is needed, O(n) memory. It powers spelling suggestions, typo-tolerant (fuzzy) search, deduplication of customer records and the word error rate (WER) used to score speech recognition. The LCS behind git diff is the special case without substitutions, and the Needleman–Wunsch algorithm for DNA alignment fills the same table with different scores for matches, mismatches and gaps.', sEdit())],
  'al-mst': [item('al-prim', '프림 알고리즘', 'Prim’s algorithm', '한 정점에서 시작해, 지금까지 만든 트리와 바깥을 잇는 간선 중 가장 가벼운 것을 계속 붙여 최소 신장 트리를 만들어요.', '프림 알고리즘은 임의의 정점 하나로 트리를 시작하고, 트리 안의 정점과 밖의 정점을 잇는 간선 중 가중치가 가장 작은 것을 골라 그 바깥 정점을 트리에 붙이기를 정점이 다 찰 때까지 반복해요. 예시 그래프에서 A로 시작하면 A–D(3), D–E(1), B–E(2), C–E(5), C–F(6) 순으로 붙어 가중치 합 17인 최소 신장 트리가 돼요. 컷 성질(어떤 분할을 가로지르는 가장 가벼운 간선은 어떤 최소 신장 트리에 반드시 포함)이 이 욕심쟁이 선택이 옳다는 근거예요. 후보 간선을 우선순위 큐(이진 힙)로 관리하면 O(E log V)이고, 간선이 빽빽한 그래프는 인접 행렬과 배열로 O(V²)이 더 빨라요. 다익스트라 알고리즘과 코드가 거의 같지만, 다익스트라는 시작점부터의 거리를, 프림은 트리까지의 간선 하나의 무게를 비교해요. 간선을 가중치 순으로 정렬해 사이클이 안 생기는 것만 고르는 크루스칼도 같은 합 17을 찾으며, 크루스칼은 간선이 적은 그래프에서 유리해요. 통신망·전력망 설계, 클러스터링, 미로 생성에 쓰여요.', 'Starting from one vertex, repeatedly add the lightest edge joining the tree to the outside, building a minimum spanning tree.', 'Prim’s algorithm starts a tree at any vertex and keeps adding the lightest edge between a vertex inside the tree and one outside, until every vertex is in. Starting from A in the example, it adds A–D (3), D–E (1), B–E (2), C–E (5) and C–F (6), a minimum spanning tree of total weight 17. The cut property, that the lightest edge crossing any partition belongs to some minimum spanning tree, justifies each greedy choice. Keeping candidate edges in a priority queue (a binary heap) gives O(E log V), and on dense graphs an adjacency matrix with a plain array gives a faster O(V²). The code is almost identical to Dijkstra’s, except that Dijkstra compares distances from the start while Prim compares the weight of a single edge to the tree. Kruskal, which sorts edges and keeps those that form no cycle, finds the same total of 17 and suits sparse graphs. MSTs are used to design communication and power networks, for clustering and to generate mazes.', sPrim())]
} };
})();

window.UX = page([
  sec('al-sort', '정렬', 'Sorting', '실제로 돌려 보는 정렬 알고리즘', 'Sorting algorithms, run for real',
    '같은 숫자들을 정렬해도 방법에 따라 비교와 이동이 전혀 달라요. 주황은 비교, 빨강은 교환, 파랑은 기준(피벗), 초록은 제자리를 찾은 값이에요.', 'The same numbers sort very differently depending on the method. Orange compares, red swaps, blue marks the pivot and green means a value is in its final place.', [
    item('al-bubble', '버블 정렬', 'Bubble sort', '이웃한 두 값을 비교해 큰 값을 뒤로 보내기를 반복해요. 한 바퀴마다 가장 큰 값이 끝으로 떠올라요.', '원리를 배우기엔 좋지만 O(n²)라 실무에선 쓰지 않아요. 한 바퀴 동안 교환이 없으면 바로 끝내는 최적화가 가능해요.', 'Repeatedly compares neighbours and moves the larger one back, so the largest value bubbles to the end each pass.', 'Good for learning but O(n²), so never used in practice. It can stop early when a pass makes no swaps.', sortScene('al-bubble', [5, 2, 8, 1, 9, 3], bubble([5, 2, 8, 1, 9, 3]), { per: .45 })),
    item('al-select', '선택 정렬', 'Selection sort', '남은 값 중 가장 작은 것을 찾아 맨 앞과 바꾸기를 반복해요.', '교환 횟수가 최대 n-1번으로 적어서 쓰기 비용이 큰 메모리에서 의미가 있어요. 비교는 항상 O(n²)이에요.', 'Finds the smallest remaining value and swaps it to the front, over and over.', 'It makes at most n−1 swaps, which matters when writes are expensive, but always makes O(n²) comparisons.', sortScene('al-select', [5, 2, 8, 1, 9, 3], selection([5, 2, 8, 1, 9, 3]), { per: .4 })),
    item('al-insert', '삽입 정렬', 'Insertion sort', '카드 정리하듯 다음 값을 집어 이미 정렬된 앞부분의 알맞은 자리에 끼워 넣어요.', '거의 정렬된 데이터에서 O(n)에 가깝게 빨라서, 실무 정렬(팀소트 등)이 작은 구간에 이 방법을 섞어 써요.', 'Like sorting cards in your hand: pick the next value and slide it into place in the sorted front part.', 'It approaches O(n) on nearly sorted data, which is why production sorts such as Timsort use it for small runs.', sortScene('al-insert', [5, 2, 8, 1, 9, 3], insertion([5, 2, 8, 1, 9, 3]), { per: .5 })),
    item('al-merge', '병합 정렬', 'Merge sort', '배열을 반으로 나누고, 정렬된 두 부분을 하나로 합치기를 반복해요. 언제나 O(n log n)이에요.', '안정 정렬이 필요하거나, 메모리에 다 안 들어가는 큰 파일을 정렬(외부 정렬)할 때 써요. 합칠 때 추가 공간이 필요해요.', 'Splits the array in half and repeatedly merges sorted halves into one. Always O(n log n).', 'Use it when you need a stable sort or must sort files too big for memory (external sorting). Merging needs extra space.', sortScene('al-merge', [6, 3, 8, 1, 7, 2, 5, 4], merge([6, 3, 8, 1, 7, 2, 5, 4]), { per: .8, w: 2.4, g: .45 })),
    item('al-quick', '퀵 정렬', 'Quicksort', '기준값(피벗)을 정해 작은 값은 왼쪽, 큰 값은 오른쪽으로 나누고 양쪽을 다시 같은 방식으로 정렬해요.', '평균 O(n log n)에 메모리를 적게 써서 가장 많이 쓰여요. 이미 정렬된 데이터에서 피벗을 잘못 고르면 O(n²)이라 무작위나 중앙값 피벗을 써요.', 'Pick a pivot, move smaller values left and larger ones right, then sort each side the same way.', 'Average O(n log n) with little extra memory, so it is the most widely used. A bad pivot on sorted data gives O(n²), so pick a random or median pivot.', sortScene('al-quick', [6, 3, 8, 1, 7, 2, 5], quick([6, 3, 8, 1, 7, 2, 5]), { per: .5, w: 2.6, g: .5 })),
    item('al-heapsort', '힙 정렬', 'Heapsort', '배열을 최대 힙으로 만든 뒤, 맨 위의 최댓값을 끝으로 보내고 다시 힙을 정리하기를 반복해요.', '최악에도 O(n log n), 추가 공간 O(1)이 보장돼요. 캐시 효율이 낮아 평균적으로는 퀵 정렬보다 느려요.', 'Builds a max-heap, then repeatedly moves the top (the maximum) to the end and restores the heap.', 'Guarantees O(n log n) even in the worst case with O(1) extra space, but poor cache behaviour makes it slower than quicksort on average.', sortScene('al-heapsort', [4, 9, 2, 7, 5, 8], heapsort([4, 9, 2, 7, 5, 8]), { per: .45 })),
    item('al-radix', '기수 정렬', 'Radix sort', '비교하지 않고 일의 자리, 십의 자리처럼 자릿수별로 묶어 차례로 정렬해요. 각 단계는 안정 정렬이어야 해요.', '정해진 길이의 정수, 날짜, 문자열 키를 대량으로 정렬할 때 O(n log n)보다 빨라요.', 'Sorts without comparisons by grouping on each digit in turn, ones then tens. Each pass must be stable.', 'Beats O(n log n) for large volumes of fixed-length integers, dates or string keys.', sortScene('al-radix', [53, 27, 91, 18, 72, 35, 64, 40], radix([53, 27, 91, 18, 72, 35, 64, 40]), { per: 1.8, w: 2.4, g: .45 })),
    item('al-stable', '안정 정렬', 'Stable sort', '값이 같은 원소들이 정렬 후에도 원래 순서를 지키면 안정 정렬이에요.', '"날짜순으로 정렬한 다음 이름순으로 정렬"처럼 여러 기준을 차례로 적용할 때 꼭 필요해요. 병합·삽입·팀소트는 안정, 퀵·힙은 보통 불안정해요.', 'A sort is stable if equal elements keep their original order.', 'Essential when sorting by several keys in turn, such as by date then by name. Merge, insertion and Timsort are stable; quick and heap sorts usually are not.', sStable())
  ].concat(XT.add['al-sort'] || [])),
  sec('al-tech', '탐색·기법', 'Techniques', '문제를 줄이는 기법들', 'Techniques that shrink problems',
    '코딩 테스트와 실무 최적화에 반복해서 나오는 생각의 틀이에요.', 'Patterns of thinking that recur in coding interviews and real optimization work.', [
    item('al-bsearch', '이진 탐색', 'Binary search', '정렬된 배열의 가운데와 비교해서 찾는 범위를 매번 절반으로 줄여요.', '정렬된 데이터 찾기뿐 아니라 "조건을 만족하는 최솟값"을 찾는 매개변수 탐색에도 써요. 경계 조건(lo ≤ hi, mid 계산)에서 실수가 많아요.', 'Compares with the middle of a sorted array and halves the search range every time.', 'Beyond lookups, it finds “the smallest value that satisfies a condition” (parametric search). Off-by-one errors in the bounds are common.', sBsearch()),
    item('al-twoptr', '투 포인터', 'Two pointers', '양쪽 끝에서 출발한 두 포인터를 조건에 따라 안쪽으로 움직여, 이중 반복 없이 답을 찾아요.', '정렬된 배열의 두 수의 합, 중복 제거, 회문 검사, 두 리스트 합치기에 써요.', 'Two pointers start at either end and move inward based on a condition, avoiding nested loops.', 'Used for two-sum on sorted arrays, deduplication, palindrome checks and merging two lists.', sTwo()),
    item('al-window', '슬라이딩 윈도우', 'Sliding window', '정해진 크기의 창을 한 칸씩 밀면서 빠지는 값과 들어오는 값만 반영해요.', '최근 N분 요청 수, 연속 구간의 최대 합, 중복 없는 가장 긴 문자열에 써요. 레이트 리미터도 같은 원리예요.', 'Slides a fixed-size window one step at a time, updating only for the value leaving and the value entering.', 'Used for requests in the last N minutes, maximum sums of runs and the longest substring without repeats. Rate limiters work the same way.', sWindow()),
    item('al-prefix', '누적 합', 'Prefix sums', '앞에서부터의 합을 미리 배열에 저장해 두면, 어떤 구간의 합도 뺄셈 한 번으로 구해요.', '기간별 매출 합계, 이미지의 영역 합(2차원 누적 합), 구간 쿼리가 많은 문제에 써요.', 'Store running totals once, and any range sum becomes a single subtraction.', 'Used for revenue over date ranges, 2D area sums in images and any problem with many range queries.', sPrefix()),
    item('al-recur', '재귀와 콜 스택', 'Recursion · Call stack', '함수가 자기 자신을 부르며 문제를 작게 쪼개요. 호출할 때마다 콜 스택에 쌓였다가 결과를 돌려주며 빠져요.', '트리·폴더 순회, 분할 정복, 백트래킹의 기본이에요. 종료 조건이 꼭 있어야 하고, 너무 깊으면 반복문으로 바꾸세요.', 'A function calls itself on smaller pieces. Each call stacks up on the call stack and unwinds as results return.', 'The basis of tree and folder traversal, divide and conquer and backtracking. It needs a base case; if it gets too deep, convert it to a loop.', sRecur()),
    item('al-dp', '동적 계획법', 'Dynamic programming', '작은 문제의 답을 표에 저장해 두고, 큰 문제를 풀 때 다시 계산하지 않고 꺼내 써요.', '겹치는 부분 문제와 최적 부분 구조가 있을 때 써요. 경로 수, 배낭 문제, 편집 거리, 최장 증가 수열이 대표적이에요.', 'Store answers to small subproblems in a table and reuse them instead of recomputing when solving bigger ones.', 'Use it when subproblems overlap and optimal substructure holds: path counts, knapsack, edit distance, longest increasing subsequence.', sFib()),
    item('al-lcs', 'LCS · 편집 거리', 'Longest common subsequence', '두 문자열을 표로 놓고 칸마다 "여기까지의 최선"을 채워 공통 부분 수열을 구해요. 2차원 DP의 대표 예제예요.', 'git diff, 맞춤법 추천, DNA 비교가 같은 원리(LCS·편집 거리)예요.', 'Lay two strings out as a table and fill each cell with the best result so far to find the longest common subsequence: the classic 2D DP.', 'git diff, spelling suggestions and DNA comparison all rest on the same idea (LCS and edit distance).', sLCS()),
    item('al-greedy', '그리디', 'Greedy algorithm', '매 순간 가장 좋아 보이는 선택을 하고 되돌아보지 않아요. 빠르지만 항상 최적인 건 아니에요.', '동전 거스름돈, 회의실 배정, 허프만 압축, 크루스칼·다익스트라가 그리디예요. 최적임을 증명하거나 반례를 확인하고 쓰세요.', 'Make the choice that looks best right now and never look back. Fast, but not always optimal.', 'Making change, meeting-room scheduling, Huffman coding, Kruskal and Dijkstra are greedy. Prove optimality or check for counterexamples first.', sGreedy()),
    item('al-queens', '백트래킹', 'Backtracking', '하나씩 선택해 나가다가 조건을 어기면 바로 이전 선택으로 되돌아가 다른 길을 시도해요.', 'N-퀸, 스도쿠, 조합·순열 생성, 제약 만족 문제에 써요. 안 되는 가지를 일찍 잘라낼수록(가지치기) 빨라져요.', 'Make choices one at a time, and the moment a constraint breaks, undo the last choice and try another path.', 'Used for N-queens, sudoku, generating combinations and permutations, and constraint satisfaction. The earlier you prune dead branches, the faster it is.', sQueens()),
    item('al-bitmask', '비트마스크', 'Bitmask', '정수의 각 비트를 "포함/미포함"으로 써서 부분집합을 숫자 하나로 표현해요.', '부분집합 전체 탐색, 방문 상태를 저장하는 DP(외판원 문제), 권한·옵션 플래그에 써요.', 'Use each bit of an integer as “in or out” to represent a subset with a single number.', 'Used to enumerate subsets, store visited states in DP (travelling salesman) and encode permission or option flags.', sBitmask())
  ].concat(XT.add['al-tech'] || [])),
  sec('al-graph', '그래프 알고리즘', 'Graph algorithms', '연결을 따라가는 알고리즘', 'Algorithms that follow connections',
    '지도, SNS, 의존성, 네트워크처럼 연결된 데이터를 다루는 방법이에요.', 'How to work with connected data such as maps, social networks, dependencies and networks.', [
    item('al-bfs', '너비 우선 탐색', 'BFS · Breadth-first search', '시작점에서 가까운 정점부터 층층이 넓혀 가요. 큐를 써요.', '가중치 없는 그래프의 최단 거리, 친구의 친구 찾기, 웹 크롤링, 미로 최단 경로에 써요.', 'Expands layer by layer from the start, nearest vertices first, using a queue.', 'Finds shortest paths in unweighted graphs and is used for friends-of-friends, web crawling and maze solving.', sBFS()),
    item('al-dfs', '깊이 우선 탐색', 'DFS · Depth-first search', '한 방향으로 끝까지 들어갔다가 막히면 되돌아와 다른 길을 가요. 스택이나 재귀를 써요.', '연결 요소 찾기, 사이클 검사, 위상 정렬, 미로 생성, 백트래킹의 뼈대예요.', 'Goes as deep as possible in one direction, then backs up and tries another, using a stack or recursion.', 'The backbone of connected components, cycle detection, topological sort, maze generation and backtracking.', sDFS()),
    item('al-dijkstra', '다익스트라', 'Dijkstra’s algorithm', '아직 확정되지 않은 정점 중 가장 가까운 것을 확정하고, 그 이웃까지의 거리를 줄여 나가요.', '내비게이션, 네트워크 라우팅(OSPF), 게임 길찾기의 기본이에요. 음수 가중치가 있으면 벨만-포드를 써요.', 'Repeatedly settles the closest unsettled vertex and relaxes the distances to its neighbours.', 'The basis of navigation, network routing (OSPF) and game pathfinding. With negative weights, use Bellman-Ford.', sDijkstra()),
    item('al-topo', '위상 정렬', 'Topological sort', '"A 다음에 B" 같은 선후 관계를 모두 지키는 순서를 만들어요. 들어오는 간선이 없는 것부터 꺼내요.', '빌드 시스템, 패키지 설치 순서, 작업 스케줄링, 엑셀 수식 계산 순서에 써요. 사이클이 있으면 불가능해요.', 'Produces an order that respects every “A before B” dependency by repeatedly taking nodes with no incoming edges.', 'Used by build systems, package installers, job schedulers and spreadsheet recalculation. Impossible if there is a cycle.', sTopo()),
    item('al-mst', '최소 신장 트리', 'Minimum spanning tree · Kruskal', '모든 정점을 가장 적은 비용으로 잇는 트리예요. 크루스칼은 가벼운 간선부터 사이클이 생기지 않는 것만 골라요.', '통신망·전력망·도로 설계, 클러스터링에 써요. 사이클 확인에 유니온 파인드를 써요.', 'The cheapest tree that connects every vertex. Kruskal’s algorithm takes edges lightest first, skipping any that would form a cycle.', 'Used to design telecom, power and road networks and for clustering. Union-find detects the cycles.', sMST()),
    item('al-astar', 'A* 탐색', 'A* search', '지나온 거리에 목표까지의 추정 거리를 더한 값이 작은 칸부터 탐색해서, 목표 쪽으로 똑똑하게 나아가요.', '게임 캐릭터 이동, 로봇 경로 계획, 지도 길찾기에 써요. 추정값이 실제보다 크지 않아야 최단 경로가 보장돼요.', 'Explores cells with the lowest cost so far plus an estimate of the remaining distance, heading intelligently toward the goal.', 'Used for game character movement, robot path planning and map routing. The estimate must never exceed the true distance to guarantee the shortest path.', sAstar())
  ].concat(XT.add['al-graph'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += '\n.al-big .in{font-size:.95em;font-weight:700;color:var(--ink)}\n.al-dist .in{font-weight:700;color:var(--accent);font-size:.8em}';
})();
