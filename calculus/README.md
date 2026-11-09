# 미적분학 · Calculus

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/calculus/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

극한과 연속에서 시작해 미분과 응용, 적분 기법, 급수와 테일러 전개, 편미분과 중적분, 그리고 선적분·면적분과 그린·발산·스토크스 정리까지. 공식마다 풀이 예제를 붙이고, 그 공식이 왜 성립하는지 그림으로 움직여 보여줘요.

From limits and continuity through derivatives, integration techniques, series and Taylor expansions, partial derivatives and multiple integrals, to line and surface integrals and the theorems of Green, Gauss and Stokes. Each formula comes with a worked example and a moving picture of why it holds.

**6개 주제 · 42개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [극한과 연속 · Limits and continuity](#ca-lim) (5)
- [미분과 응용 · Derivatives and applications](#ca-diff) (9)
- [적분과 응용 · Integrals and applications](#ca-int) (8)
- [수열과 급수 · Sequences and series](#ca-ser) (4)
- [다변수 미적분 · Multivariable calculus](#ca-multi) (7)
- [벡터해석 · Vector calculus](#ca-vec) (9)

<a id="ca-lim"></a>

## 극한과 연속 · Limits and continuity

미적분학의 모든 정의가 극한 위에 서 있어요.  
*Every definition in calculus rests on limits.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **극한**<br><sub>Limit</sub> | x가 a에 한없이 가까워질 때 f(x)가 한없이 가까워지는 값이에요. 그 점에서 함수값이 없어도 극한은 있을 수 있어요.<br><sub>The value f(x) approaches as x approaches a; it can exist even where f(a) is undefined.</sub> | 0/0 꼴은 인수분해·유리화로 약분해요. 예: lim(x→1) (x²−1)/(x−1) = lim(x→1)(x+1) = 2. 극한 법칙: 합·곱·몫의 극한은 극한의 합·곱·몫 (분모 극한 ≠ 0).<br><sub>Cancel 0/0 forms by factoring or rationalizing: lim(x→1) (x²−1)/(x−1) = lim(x→1) (x+1) = 2. Limits of sums, products and quotients are the sums, products and quotients of limits (nonzero denominator).</sub> |
| **한쪽 극한과 연속**<br><sub>One-sided limits and continuity</sub> | 왼쪽·오른쪽에서 다가갈 때의 극한이 각각 있어요. 둘이 같아야 극한이 존재하고, 그 값이 f(a)와 같아야 연속이에요.<br><sub>Limits from the left and the right exist separately; the limit exists only if they agree, and f is continuous at a if it also equals f(a).</sub> | 연속 조건 3가지: f(a) 정의, lim f(x) 존재, 둘이 같음. 불연속 종류: 제거 가능(구멍), 점프, 무한. 구간별 함수는 경계에서 양쪽 극한을 따로 계산해요.<br><sub>Three conditions: f(a) defined, the limit exists, and they are equal. Discontinuities are removable (holes), jumps or infinite. For piecewise functions compute both sides at each breakpoint.</sub> |
| **ε-δ 정의**<br><sub>Epsilon–delta definition</sub> | "한없이 가까워진다"를 엄밀하게 쓴 정의예요. 어떤 ε > 0에 대해서도 0 < \|x − a\| < δ이면 \|f(x) − L\| < ε가 되는 δ가 있으면 lim f(x) = L이에요.<br><sub>The rigorous form of “arbitrarily close”: lim f(x) = L if for every ε > 0 there is a δ with 0 < \|x − a\| < δ ⇒ \|f(x) − L\| < ε.</sub> | 증명 요령: \|f(x) − L\|을 \|x − a\|로 묶어 δ를 ε로 표현해요. 예: f(x) = x/2 + 1, L = 2일 때 \|f(x) − 2\| = \|x − 2\|/2 < ε → δ = 2ε.<br><sub>Proof recipe: bound \|f(x) − L\| by a multiple of \|x − a\| and solve for δ. For f(x) = x/2 + 1, \|f(x) − 2\| = \|x − 2\|/2 < ε gives δ = 2ε.</sub> |
| **조임 정리**<br><sub>Squeeze theorem</sub> | g(x) ≤ f(x) ≤ h(x)이고 g, h의 극한이 같은 L이면 f의 극한도 L이에요.<br><sub>If g ≤ f ≤ h near a and g, h share the limit L, then f has limit L too.</sub> | 대표 결과: lim(x→0) sin x / x = 1, lim(x→0) (1 − cos x)/x = 0, lim x·sin(1/x) = 0. 진동하는 항은 −1 ≤ sin ≤ 1로 묶어요.<br><sub>Key results: lim(x→0) sin x / x = 1, lim(x→0) (1 − cos x)/x = 0, lim x·sin(1/x) = 0. Bound oscillating parts with −1 ≤ sin ≤ 1.</sub> |
| **중간값 정리**<br><sub>Intermediate value theorem</sub> | 닫힌 구간에서 연속인 함수는 양 끝값 사이의 모든 값을 반드시 한 번 이상 지나요.<br><sub>A function continuous on [a, b] takes every value between f(a) and f(b).</sub> | f(a)·f(b) < 0이면 (a, b)에 근이 있어요. 예: f(x) = x³ − x − 1은 f(1) = −1, f(2) = 5라서 1과 2 사이에 근이 있어요. 최대·최소 정리와 짝으로 나와요.<br><sub>If f(a)·f(b) < 0 there is a root in (a, b): x³ − x − 1 has f(1) = −1 and f(2) = 5, so a root lies between. Often paired with the extreme value theorem.</sub> |

<a id="ca-diff"></a>

## 미분과 응용 · Derivatives and applications

순간 변화율을 구하고 그래프의 모양과 최적값을 알아내요.  
*Instantaneous rates of change, curve shapes and optimization.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **미분계수와 도함수**<br><sub>The derivative</sub> | 할선의 기울기에서 h → 0으로 보낸 극한, 즉 접선의 기울기예요. f′(a) = lim(h→0) (f(a + h) − f(a))/h.<br><sub>The limit of secant slopes as h → 0: the tangent’s slope. f′(a) = lim(h→0) (f(a + h) − f(a))/h.</sub> | 기본 공식: (xⁿ)′ = nxⁿ⁻¹, (eˣ)′ = eˣ, (ln x)′ = 1/x, (sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec²x. 미분 가능하면 연속이지만 역은 아니에요 (\|x\|는 0에서 미분 불가).<br><sub>Core rules: (xⁿ)′ = nxⁿ⁻¹, (eˣ)′ = eˣ, (ln x)′ = 1/x, (sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec²x. Differentiable implies continuous, not conversely (\|x\| at 0).</sub> |
| **곱과 몫의 미분**<br><sub>Product and quotient rules</sub> | (fg)′ = f′g + fg′. 곱을 직사각형 넓이로 보면 두 변이 늘 때 늘어나는 넓이가 바로 이 두 항이에요.<br><sub>(fg)′ = f′g + fg′: viewing fg as a rectangle, these are the two strips added when each side grows.</sub> | (f/g)′ = (f′g − fg′)/g². 예: (x² sin x)′ = 2x sin x + x² cos x, (tan x)′ = (sin x/cos x)′ = sec²x. 세 개의 곱은 (fgh)′ = f′gh + fg′h + fgh′.<br><sub>(f/g)′ = (f′g − fg′)/g². e.g. (x² sin x)′ = 2x sin x + x² cos x; (tan x)′ = sec²x. For three factors, (fgh)′ = f′gh + fg′h + fgh′.</sub> |
| **연쇄 법칙**<br><sub>Chain rule</sub> | 합성함수 y = f(g(x))의 도함수는 dy/dx = f′(g(x))·g′(x), 즉 각 단계 변화율의 곱이에요.<br><sub>For y = f(g(x)), dy/dx = f′(g(x))·g′(x): the product of each stage’s rate.</sub> | 예: ((3x + 1)²)′ = 6(3x + 1), (sin x²)′ = 2x cos x², (e^(−x²))′ = −2x e^(−x²). 역함수 미분: (f⁻¹)′(y) = 1/f′(x). 신경망 역전파가 연쇄 법칙이에요.<br><sub>e.g. ((3x + 1)²)′ = 6(3x + 1), (sin x²)′ = 2x cos x², (e^(−x²))′ = −2x e^(−x²). Inverse functions: (f⁻¹)′(y) = 1/f′(x). Backpropagation is the chain rule.</sub> |
| **음함수 미분**<br><sub>Implicit differentiation</sub> | y를 x로 풀지 않고, 식 전체를 x로 미분하면서 y가 들어간 항은 연쇄 법칙으로 y′를 붙여요.<br><sub>Differentiate the whole equation in x without solving for y, attaching y′ to y terms via the chain rule.</sub> | 예: x² + y² = 25 → 2x + 2yy′ = 0 → y′ = −x/y. 로그 미분: y = xˣ → ln y = x ln x → y′/y = ln x + 1 → y′ = xˣ(ln x + 1).<br><sub>x² + y² = 25 → 2x + 2yy′ = 0 → y′ = −x/y. Logarithmic differentiation: y = xˣ → ln y = x ln x → y′ = xˣ(ln x + 1).</sub> |
| **관련 변화율**<br><sub>Related rates</sub> | 여러 양이 관계식으로 묶여 있을 때, 관계식을 시간 t로 미분해 한 양의 변화율로 다른 양의 변화율을 구해요.<br><sub>When quantities are linked by an equation, differentiate it in time to get one rate from another.</sub> | 풀이 순서: 그림 → 변수 정의 → 관계식 → t로 미분 → 그 순간 값 대입(미분 후에!). 예: 5 m 사다리, x = 3에서 dx/dt = 1이면 dy/dt = −3/4 m/s.<br><sub>Steps: sketch, name variables, write the relation, differentiate in t, then substitute values (after differentiating). 5 m ladder with x = 3, dx/dt = 1 gives dy/dt = −3/4 m/s.</sub> |
| **극값과 증감**<br><sub>Extrema and monotonicity</sub> | f′ > 0이면 증가, f′ < 0이면 감소해요. f′ = 0이거나 정의되지 않는 임계점에서 부호가 바뀌면 극값이에요.<br><sub>f′ > 0 means increasing, f′ < 0 decreasing; a sign change at a critical point (f′ = 0 or undefined) marks an extremum.</sub> | 예: f = x³ − 3x, f′ = 3(x − 1)(x + 1) → x = −1 극대 2, x = 1 극소 −2. 닫힌 구간 최댓값·최솟값은 임계점과 양 끝점 값을 모두 비교해요.<br><sub>f = x³ − 3x, f′ = 3(x − 1)(x + 1): local max 2 at x = −1, local min −2 at x = 1. On a closed interval compare critical points and endpoints.</sub> |
| **오목·볼록과 변곡점**<br><sub>Concavity and inflection</sub> | f″ > 0이면 아래로 볼록(기울기 증가), f″ < 0이면 위로 볼록이에요. f″의 부호가 바뀌는 점이 변곡점이에요.<br><sub>f″ > 0 means concave up (slope increasing), f″ < 0 concave down; an inflection point is where f″ changes sign.</sub> | 2계도함수 판정: f′(c) = 0이고 f″(c) < 0이면 극대, > 0이면 극소, = 0이면 판정 불가. 그래프 개형은 정의역 → 절편 → 점근선 → 증감 → 오목 순서로 그려요.<br><sub>Second-derivative test: f′(c) = 0 with f″(c) < 0 is a max, > 0 a min, = 0 inconclusive. Sketch graphs via domain, intercepts, asymptotes, monotonicity, then concavity.</sub> |
| **평균값 정리**<br><sub>Mean value theorem</sub> | [a, b]에서 연속, (a, b)에서 미분 가능하면 f′(c) = (f(b) − f(a))/(b − a)인 c가 있어요. f(a) = f(b)인 경우가 롤의 정리예요.<br><sub>If f is continuous on [a, b] and differentiable inside, some c has f′(c) = (f(b) − f(a))/(b − a); Rolle’s theorem is the case f(a) = f(b).</sub> | 예: f = √x, [0, 4]에서 평균 기울기 1/2 = 1/(2√c) → c = 1. 따름 정리: f′ = 0이면 상수, f′ = g′이면 f − g는 상수. 부등식 증명에 자주 써요.<br><sub>f = √x on [0, 4]: average slope 1/2 = 1/(2√c) gives c = 1. Corollaries: f′ = 0 means constant; f′ = g′ means f − g is constant. Handy for proving inequalities.</sub> |
| **로피탈 정리**<br><sub>L’Hôpital’s rule</sub> | 0/0 또는 ∞/∞ 꼴의 극한은 분자·분모를 각각 미분한 극한과 같아요 (그 극한이 존재할 때).<br><sub>For 0/0 or ∞/∞ forms, the limit equals the limit of the ratio of derivatives, when that exists.</sub> | 예: lim sin x/x = lim cos x/1 = 1, lim ln x/x = lim (1/x)/1 = 0. 0·∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰은 몫이나 ln으로 바꾼 뒤 적용해요. 예: lim(1 + 1/x)ˣ = e.<br><sub>lim sin x/x = lim cos x = 1; lim ln x/x = 0. Turn 0·∞, ∞ − ∞, 1^∞, 0⁰ and ∞⁰ into quotients or take logs first: lim (1 + 1/x)ˣ = e.</sub> |

<a id="ca-int"></a>

## 적분과 응용 · Integrals and applications

쌓인 양을 구하는 방법과 대표적인 적분 기법이에요.  
*Accumulation, and the main integration techniques.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **리만 합과 정적분**<br><sub>Riemann sums</sub> | 구간을 잘게 나눠 직사각형 넓이를 더하고, 칸 수를 무한히 늘린 극한이 정적분이에요.<br><sub>Add up rectangle areas over a fine partition; the limit as the pieces shrink is the definite integral.</sub> | ∫ₐᵇ f dx = lim Σ f(xᵢ\*)Δx, Δx = (b − a)/n. 성질: 선형성, 구간 덧셈, f ≤ g이면 ∫f ≤ ∫g. 극한을 정적분으로 바꾸는 문제: lim (1/n)Σ(k/n)² = ∫₀¹ x² dx = 1/3.<br><sub>∫ₐᵇ f dx = lim Σ f(xᵢ\*)Δx with Δx = (b − a)/n. Linear, additive over intervals, monotone. Recognise sums as integrals: lim (1/n)Σ(k/n)² = ∫₀¹ x² dx = 1/3.</sub> |
| **미적분학의 기본 정리**<br><sub>Fundamental theorem of calculus</sub> | 쌓인 넓이 A(x) = ∫ₐˣ f(t)dt를 미분하면 f(x)예요. 그래서 정적분은 원시함수 F의 차 F(b) − F(a)로 계산해요.<br><sub>The accumulated area A(x) = ∫ₐˣ f(t)dt has derivative f(x), so ∫ₐᵇ f = F(b) − F(a) for any antiderivative F.</sub> | 응용: d/dx ∫ₐ^g(x) f(t) dt = f(g(x))·g′(x). 예: d/dx ∫₀^(x²) cos t dt = 2x cos x². 정적분 ∫₁² 2x dx = [x²]₁² = 3.<br><sub>With a variable limit: d/dx ∫ₐ^g(x) f(t) dt = f(g(x))·g′(x); e.g. d/dx ∫₀^(x²) cos t dt = 2x cos x². ∫₁² 2x dx = [x²]₁² = 3.</sub> |
| **치환적분**<br><sub>Substitution</sub> | 안쪽 함수 u = g(x)와 그 도함수 g′(x)dx가 함께 있으면 u로 바꿔 쉬운 적분으로 만들어요.<br><sub>When an inner function u = g(x) appears with its derivative g′(x)dx, switch to u for an easier integral.</sub> | ∫f(g(x))g′(x)dx = ∫f(u)du. 예: ∫2x cos x² dx = sin x² + C, ∫x/(x² + 1) dx = ½ln(x² + 1) + C. 정적분은 적분 구간도 u 값으로 바꿔요. 삼각치환: √(a² − x²)엔 x = a sin θ.<br><sub>∫f(g(x))g′(x)dx = ∫f(u)du. ∫2x cos x² dx = sin x² + C; ∫x/(x² + 1) dx = ½ln(x² + 1) + C. Convert the limits for definite integrals. Trig substitution: x = a sin θ for √(a² − x²).</sub> |
| **부분적분**<br><sub>Integration by parts</sub> | 곱의 미분을 거꾸로 쓴 공식 ∫u dv = uv − ∫v du예요. 미분하면 단순해지는 쪽을 u로 잡아요.<br><sub>The product rule run backwards: ∫u dv = uv − ∫v du; choose u to simplify under differentiation.</sub> | u 고르는 순서 LIATE: 로그 → 역삼각 → 다항 → 삼각 → 지수. 예: ∫x eˣ dx = x eˣ − eˣ + C, ∫ln x dx = x ln x − x + C, ∫eˣ sin x dx는 두 번 적용해 원래 식으로 풀어요. 표 방법(tabular)도 유용.<br><sub>Pick u by LIATE: logs, inverse trig, algebraic, trig, exponential. ∫x eˣ dx = x eˣ − eˣ + C; ∫ln x dx = x ln x − x + C; ∫eˣ sin x dx loops back to itself after two passes. Tabular integration helps.</sub> |
| **부분분수 분해**<br><sub>Partial fractions</sub> | 유리함수를 간단한 분수들의 합으로 나눠 각각을 ln이나 arctan으로 적분해요.<br><sub>Split a rational function into simple fractions that integrate to logs or arctangents.</sub> | 분자 차수 ≥ 분모 차수면 먼저 나눗셈. 꼴: 1차 인수 → A/(x − a), 중복 → A/(x − a) + B/(x − a)², 기약 2차 → (Ax + B)/(x² + px + q). 예: ∫1/(x² − 1)dx = ½ln\|(x − 1)/(x + 1)\| + C, ∫1/(x² + 1)dx = arctan x + C.<br><sub>Divide first if the numerator’s degree is not lower. Forms: A/(x − a); repeated factors add B/(x − a)²; irreducible quadratics take (Ax + B)/(x² + px + q). ∫1/(x² − 1)dx = ½ln\|(x − 1)/(x + 1)\| + C; ∫1/(x² + 1)dx = arctan x + C.</sub> |
| **이상적분**<br><sub>Improper integrals</sub> | 구간이 무한하거나 함수가 발산하는 점이 있는 적분이에요. 유한한 값으로 바꾼 뒤 극한을 취해 수렴·발산을 판정해요.<br><sub>Integrals over infinite intervals or through blow-ups: integrate to a finite bound, then take the limit.</sub> | ∫₁^∞ 1/xᵖ dx는 p > 1이면 1/(p − 1)로 수렴, p ≤ 1이면 발산. ∫₀¹ 1/xᵖ dx는 p < 1이면 수렴. 비교 판정: 0 ≤ f ≤ g이고 ∫g 수렴이면 ∫f 수렴. ∫₀^∞ e^(−x) dx = 1.<br><sub>∫₁^∞ 1/xᵖ dx converges to 1/(p − 1) iff p > 1; ∫₀¹ 1/xᵖ dx converges iff p < 1. Comparison: 0 ≤ f ≤ g with ∫g finite gives ∫f finite. ∫₀^∞ e^(−x) dx = 1.</sub> |
| **회전체 부피**<br><sub>Volumes of revolution</sub> | 영역을 축 둘레로 돌린 입체의 부피를 얇은 원판(또는 원통 껍질)을 쌓아 구해요.<br><sub>Build a solid of revolution from thin disks (or cylindrical shells) and add their volumes.</sub> | 원판법 V = π∫ f(x)² dx, 와셔법 V = π∫ (R² − r²) dx, 원통껍질법 V = 2π∫ x f(x) dx (y축 회전). 예: y = √x, 0 ≤ x ≤ 4를 x축 회전 → 8π. 단면적을 아는 입체는 V = ∫A(x)dx.<br><sub>Disks V = π∫ f(x)² dx, washers V = π∫ (R² − r²) dx, shells V = 2π∫ x f(x) dx (about the y-axis). y = √x on [0, 4] about the x-axis gives 8π. Known cross-sections: V = ∫A(x)dx.</sub> |
| **극좌표와 넓이**<br><sub>Polar coordinates and area</sub> | 점을 원점까지의 거리 r과 각 θ로 나타내요. 넓이는 얇은 부채꼴 ½r²dθ를 더해서 구해요.<br><sub>Locate points by distance r and angle θ; area adds thin wedges ½r²dθ.</sub> | x = r cos θ, y = r sin θ, r² = x² + y². 넓이 A = ½∫ r² dθ, 곡선 길이 L = ∫√(r² + (dr/dθ)²) dθ. 예: 심장형 r = 1 + cos θ의 넓이는 3π/2. 매개곡선 길이 L = ∫√(x′² + y′²) dt.<br><sub>x = r cos θ, y = r sin θ, r² = x² + y². Area ½∫ r² dθ; length ∫√(r² + (dr/dθ)²) dθ. The cardioid r = 1 + cos θ has area 3π/2. Parametric length ∫√(x′² + y′²) dt.</sub> |

<a id="ca-ser"></a>

## 수열과 급수 · Sequences and series

무한히 많은 항의 합이 언제 유한한지, 함수를 다항식으로 어떻게 펼치는지예요.  
*When infinite sums are finite, and how functions unfold into polynomials.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **등비급수**<br><sub>Geometric series</sub> | 공비 r인 등비수열의 합 a + ar + ar² + …은 \|r\| < 1이면 a/(1 − r)로 수렴하고, 아니면 발산해요.<br><sub>a + ar + ar² + … converges to a/(1 − r) when \|r\| < 1 and diverges otherwise.</sub> | 부분합 Sₙ = a(1 − rⁿ)/(1 − r). 예: Σ(1/2)ⁿ (n ≥ 1) = 1, 0.999… = 1, Σ(−1/3)ⁿ (n ≥ 0) = 3/4. 망원급수 Σ 1/(n(n + 1)) = Σ(1/n − 1/(n + 1)) = 1도 함께 알아 두세요.<br><sub>Partial sums Sₙ = a(1 − rⁿ)/(1 − r). Σ(1/2)ⁿ from n = 1 is 1; 0.999… = 1; Σ(−1/3)ⁿ from 0 is 3/4. Telescoping: Σ 1/(n(n + 1)) = 1.</sub> |
| **수렴 판정법**<br><sub>Convergence tests</sub> | 급수의 수렴 여부를 직접 합하지 않고 판정하는 방법들이에요. 먼저 aₙ → 0인지(발산 판정) 확인해요.<br><sub>Ways to decide convergence without summing. First check aₙ → 0 (the divergence test).</sub> | 비교·극한비교, 비 판정(\|aₙ₊₁/aₙ\| → L), 근 판정(ⁿ√\|aₙ\| → L): L < 1 수렴, L > 1 발산, L = 1 불명. 적분 판정, p급수(p > 1 수렴), 교대급수(\|aₙ\| 감소 → 0이면 수렴). 절대수렴이면 수렴.<br><sub>Comparison and limit comparison; ratio \|aₙ₊₁/aₙ\| → L and root ⁿ√\|aₙ\| → L (L < 1 converges, > 1 diverges, = 1 unknown); integral test; p-series (p > 1); alternating series (\|aₙ\| decreasing to 0). Absolute convergence implies convergence.</sub> |
| **거듭제곱급수**<br><sub>Power series</sub> | Σ cₙ(x − a)ⁿ 꼴의 급수예요. 중심 a에서 반지름 R 안에서는 수렴하고 밖에서는 발산해요.<br><sub>A series Σ cₙ(x − a)ⁿ; it converges within radius R of the centre and diverges beyond.</sub> | R은 비 판정으로: lim\|cₙ₊₁/cₙ\|·\|x − a\| < 1. 끝점은 따로 확인. 반경 안에서 항별 미분·적분 가능: 1/(1 − x) = Σxⁿ → 1/(1 − x)² = Σnxⁿ⁻¹, −ln(1 − x) = Σxⁿ/n, arctan x = Σ(−1)ⁿx²ⁿ⁺¹/(2n + 1).<br><sub>Find R with the ratio test, then test the endpoints separately. Inside, differentiate or integrate term by term: from 1/(1 − x) = Σxⁿ get 1/(1 − x)² = Σnxⁿ⁻¹, −ln(1 − x) = Σxⁿ/n, arctan x = Σ(−1)ⁿx²ⁿ⁺¹/(2n + 1).</sub> |
| **테일러 급수**<br><sub>Taylor series</sub> | 한 점에서의 도함수 값만으로 함수를 다항식의 무한합으로 펼쳐요. f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!.<br><sub>Expand a function into an infinite polynomial from its derivatives at one point: f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!.</sub> | 매클로린: eˣ = Σxⁿ/n!, sin x = x − x³/3! + x⁵/5! − …, cos x = 1 − x²/2! + x⁴/4! − …, ln(1 + x) = x − x²/2 + x³/3 − …, (1 + x)ᵏ = Σ(k choose n)xⁿ. 오차는 라그랑주 나머지 f⁽ⁿ⁺¹⁾(c)xⁿ⁺¹/(n + 1)!.<br><sub>Maclaurin: eˣ = Σxⁿ/n!, sin x = x − x³/3! + …, cos x = 1 − x²/2! + …, ln(1 + x) = x − x²/2 + …, (1 + x)ᵏ = Σ(k choose n)xⁿ. Error bound: Lagrange remainder f⁽ⁿ⁺¹⁾(c)xⁿ⁺¹/(n + 1)!.</sub> |

<a id="ca-multi"></a>

## 다변수 미적분 · Multivariable calculus

변수가 여럿인 함수의 미분과 적분이에요.  
*Differentiation and integration with several variables.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **편미분**<br><sub>Partial derivatives</sub> | 다른 변수를 상수로 고정하고 한 변수로만 미분해요. 곡면을 한 방향으로 자른 단면의 기울기예요.<br><sub>Hold the other variables fixed and differentiate in one: the slope of a slice through the surface.</sub> | 예: f = x²y + sin y → fₓ = 2xy, f\_y = x² + cos y. 혼합편미분 fₓᵧ = fᵧₓ (연속이면). 전미분 df = fₓdx + fᵧdy, 다변수 연쇄 법칙 dz/dt = fₓ·dx/dt + fᵧ·dy/dt. 접평면 z − z₀ = fₓ(x − x₀) + fᵧ(y − y₀).<br><sub>f = x²y + sin y gives fₓ = 2xy, f\_y = x² + cos y. Mixed partials agree when continuous. Total differential df = fₓdx + fᵧdy; chain rule dz/dt = fₓ·dx/dt + fᵧ·dy/dt; tangent plane z − z₀ = fₓ(x − x₀) + fᵧ(y − y₀).</sub> |
| **그래디언트와 방향도함수**<br><sub>Gradient and directional derivative</sub> | ∇f = (fₓ, fᵧ, f\_z)는 가장 가파르게 증가하는 방향이고 등고선(등위면)에 수직이에요.<br><sub>∇f = (fₓ, fᵧ, f\_z) points in the direction of steepest increase and is perpendicular to level curves.</sub> | 방향도함수 Dᵤf = ∇f·u (u는 단위벡터), 최댓값 \|∇f\|. 예: f = x² + 2y², (1, 1)에서 ∇f = (2, 4), u = (0.6, 0.8)이면 4.4. 등위면 F = c의 법선은 ∇F → 접평면 ∇F·(r − r₀) = 0.<br><sub>Directional derivative Dᵤf = ∇f·u for unit u, maximized at \|∇f\|. f = x² + 2y² at (1, 1): ∇f = (2, 4); with u = (0.6, 0.8), Dᵤf = 4.4. The normal to F = c is ∇F, giving the tangent plane ∇F·(r − r₀) = 0.</sub> |
| **다변수 극값과 안장점**<br><sub>Extrema and saddle points</sub> | ∇f = 0인 임계점을 2계 판정 D = fₓₓfᵧᵧ − fₓᵧ²로 극소·극대·안장점으로 나눠요.<br><sub>Classify critical points (∇f = 0) with D = fₓₓfᵧᵧ − fₓᵧ²: minimum, maximum or saddle.</sub> | D > 0, fₓₓ > 0 → 극소 · D > 0, fₓₓ < 0 → 극대 · D < 0 → 안장점 · D = 0 → 판정 불가. 예: f = x² − y²는 원점이 안장점. 닫힌 유계 영역의 최댓값·최솟값은 내부 임계점과 경계를 함께 비교해요.<br><sub>D > 0 and fₓₓ > 0: min; D > 0 and fₓₓ < 0: max; D < 0: saddle; D = 0: inconclusive. f = x² − y² has a saddle at the origin. On closed bounded regions compare interior critical points with the boundary.</sub> |
| **라그랑주 승수법**<br><sub>Lagrange multipliers</sub> | 조건 g = c 위에서 f의 최대·최소는 등고선이 조건 곡선에 접하는 곳, 즉 ∇f = λ∇g인 점에서 생겨요.<br><sub>Optima of f on g = c occur where a level curve of f touches the constraint: ∇f = λ∇g.</sub> | 연립: ∇f = λ∇g, g = c. 예: x + y = 4에서 xy 최대 → (y, x) = λ(1, 1) → x = y = 2, 최댓값 4. 조건이 둘이면 ∇f = λ∇g + μ∇h. 경제학 효용 최대화, ML의 제약 최적화(SVM)의 바탕이에요.<br><sub>Solve ∇f = λ∇g with g = c. Maximizing xy on x + y = 4: (y, x) = λ(1, 1) so x = y = 2, max 4. With two constraints, ∇f = λ∇g + μ∇h. Underlies utility maximization and constrained ML (SVMs).</sub> |
| **이중적분**<br><sub>Double integrals</sub> | 영역을 작은 칸으로 나눠 높이 × 넓이를 더한 극한이에요. 한 변수씩 차례로 적분(반복적분)해서 계산해요.<br><sub>The limit of height × area sums over small cells, computed as iterated single integrals.</sub> | 푸비니: 직사각형 영역이면 순서 교환 가능. 일반 영역은 경계를 함수로: ∫ₐᵇ∫\_(g₁(x))^(g₂(x)) f dy dx. 순서를 바꾸면 쉬워지는 문제(예: ∫₀¹∫ₓ¹ e^(y²) dy dx)가 단골이에요. 넓이 = ∬1 dA, 평균값 = (1/A)∬f dA.<br><sub>Fubini lets you swap the order on rectangles; general regions use variable limits ∫ₐᵇ∫\_(g₁(x))^(g₂(x)) f dy dx. Classic trick: swap the order of ∫₀¹∫ₓ¹ e^(y²) dy dx. Area = ∬1 dA; average = (1/A)∬f dA.</sub> |
| **극좌표 이중적분**<br><sub>Double integrals in polar form</sub> | 원·부채꼴 영역은 극좌표로 바꾸면 쉬워요. 넓이 요소가 dA = r dr dθ가 돼요.<br><sub>Circular regions become simple in polar form, with area element dA = r dr dθ.</sub> | 예: ∬\_(x² + y² ≤ 1) (x² + y²) dA = ∫₀²π∫₀¹ r²·r dr dθ = π/2. 가우스 적분: ∬e^(−(x² + y²))dA = π → ∫e^(−x²)dx = √π. 3차원은 원통좌표 dV = r dr dθ dz, 구면좌표 dV = ρ² sin φ dρ dφ dθ.<br><sub>∬ over the unit disk of (x² + y²) dA = ∫₀²π∫₀¹ r³ dr dθ = π/2. Gaussian: ∬e^(−(x² + y²))dA = π, so ∫e^(−x²)dx = √π. In 3D: cylindrical dV = r dr dθ dz, spherical dV = ρ² sin φ dρ dφ dθ.</sub> |
| **변수변환과 야코비안**<br><sub>Change of variables and the Jacobian</sub> | 변수를 바꾸면 작은 넓이(부피)가 늘거나 줄어요. 그 배율이 야코비안 행렬식 \|∂(x, y)/∂(u, v)\|예요.<br><sub>Changing variables stretches small areas (volumes); the stretch factor is the Jacobian determinant \|∂(x, y)/∂(u, v)\|.</sub> | ∬f dx dy = ∬f \|J\| du dv. 예: x = 2u + v, y = u + 2v → \|J\| = 3. 극좌표 \|J\| = r, 구면좌표 \|J\| = ρ² sin φ. 영역 모양을 단순하게 만드는 변환(예: u = x + y, v = x − y)을 고르는 게 요령이에요.<br><sub>∬f dx dy = ∬f \|J\| du dv. x = 2u + v, y = u + 2v has \|J\| = 3; polar \|J\| = r; spherical \|J\| = ρ² sin φ. Choose maps that straighten the region, such as u = x + y, v = x − y.</sub> |

<a id="ca-vec"></a>

## 벡터해석 · Vector calculus

곡선·곡면 위의 적분과 그린·발산·스토크스 정리예요.  
*Integrals along curves and surfaces, and the theorems of Green, Gauss and Stokes.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **공간곡선과 곡률**<br><sub>Space curves and curvature</sub> | 매개변수 곡선 r(t)의 도함수 r′(t)는 속도(접선 방향), r″(t)는 가속도예요. 곡률은 곡선이 휘는 정도예요.<br><sub>For a curve r(t), r′(t) is velocity (along the tangent) and r″(t) acceleration; curvature measures bending.</sub> | 속력 \|r′\|, 호의 길이 L = ∫\|r′(t)\|dt, 단위접선 T = r′/\|r′\|, 곡률 κ = \|r′ × r″\|/\|r′\|³ (평면곡선 y = f(x): κ = \|f″\|/(1 + f′²)^(3/2)). 가속도 = 접선 성분 + 법선 성분(κ·속력²).<br><sub>Speed \|r′\|; arc length L = ∫\|r′(t)\|dt; unit tangent T = r′/\|r′\|; curvature κ = \|r′ × r″\|/\|r′\|³ (for y = f(x): κ = \|f″\|/(1 + f′²)^(3/2)). Acceleration splits into tangential and normal (κ·speed²) parts.</sub> |
| **벡터장**<br><sub>Vector fields</sub> | 공간의 각 점에 벡터를 대응시킨 함수 F(x, y, z)예요. 바람, 유체의 흐름, 전기장·중력장이 벡터장이에요.<br><sub>A vector attached to every point: F(x, y, z). Wind, fluid flow, electric and gravitational fields are vector fields.</sub> | 그래디언트장 ∇f는 대표적인 벡터장이에요. 흐름선(적분곡선)은 r′(t) = F(r(t))를 만족해요. 예: F = (−y, x)의 흐름선은 원점 중심의 원.<br><sub>Gradient fields ∇f are the classic example. Flow lines satisfy r′(t) = F(r(t)); for F = (−y, x) they are circles about the origin.</sub> |
| **선적분**<br><sub>Line integrals</sub> | 곡선을 따라 벡터장의 접선 성분을 적분한 값으로, 힘이 한 일을 나타내요. W = ∫\_C F·dr.<br><sub>Integrate the tangential component of a field along a curve: the work done, W = ∫\_C F·dr.</sub> | r(t)로 매개화: ∫\_C F·dr = ∫ₐᵇ F(r(t))·r′(t) dt. 예: F = (y, x), r(t) = (t, t²)이면 ∫₀¹ 3t² dt = 1. 스칼라 선적분 ∫\_C f ds = ∫ f(r(t))\|r′(t)\| dt는 곡선 질량 등에 써요.<br><sub>Parametrize: ∫\_C F·dr = ∫ₐᵇ F(r(t))·r′(t) dt. F = (y, x) along r(t) = (t, t²) gives ∫₀¹ 3t² dt = 1. Scalar line integrals ∫\_C f ds = ∫ f(r(t))\|r′(t)\| dt give, for example, a wire’s mass.</sub> |
| **보존장과 퍼텐셜**<br><sub>Conservative fields</sub> | F = ∇φ인 장에서는 선적분이 경로와 무관하고 φ(B) − φ(A)만으로 정해져요. 닫힌 경로에서는 0이에요.<br><sub>If F = ∇φ, line integrals depend only on the endpoints, φ(B) − φ(A), and vanish on closed loops.</sub> | 판정(단순연결 영역): 2차원 ∂Q/∂x = ∂P/∂y, 3차원 ∇ × F = 0. 퍼텐셜 찾기: φₓ = P를 x로 적분한 뒤 y 의존 항을 맞춰요. 예: F = (y, x) → φ = xy.<br><sub>Test on simply connected regions: ∂Q/∂x = ∂P/∂y in 2D, ∇ × F = 0 in 3D. Find φ by integrating φₓ = P in x and fixing the y-dependent term; F = (y, x) has φ = xy.</sub> |
| **발산과 회전**<br><sub>Divergence and curl</sub> | 발산 ∇·F는 한 점에서 퍼져 나가는 정도, 회전 ∇×F는 그 점 주변을 휘감아 도는 정도예요.<br><sub>Divergence ∇·F measures spreading out at a point; curl ∇×F measures swirling around it.</sub> | div F = Pₓ + Q\_y + R\_z, curl F = (R\_y − Q\_z, P\_z − Rₓ, Qₓ − P\_y). 항등식: ∇·(∇×F) = 0, ∇×(∇f) = 0, ∇·∇f = ∇²f (라플라시안). 예: F = (x, y) → div 2, F = (−y, x) → curl 2.<br><sub>div F = Pₓ + Q\_y + R\_z; curl F = (R\_y − Q\_z, P\_z − Rₓ, Qₓ − P\_y). Identities: div curl F = 0, curl ∇f = 0, div ∇f = ∇²f (Laplacian). F = (x, y) has div 2; F = (−y, x) has curl 2.</sub> |
| **그린 정리**<br><sub>Green’s theorem</sub> | 평면 영역 D의 경계 C를 반시계 방향으로 도는 선적분은 D 안의 회전(Qₓ − P\_y)의 이중적분과 같아요.<br><sub>The counterclockwise line integral around the boundary of D equals the double integral of Qₓ − P\_y over D.</sub> | ∮\_C P dx + Q dy = ∬\_D (∂Q/∂x − ∂P/∂y) dA. 넓이 A = ½∮(x dy − y dx). 예: 단위원에서 F = (−y, x)이면 ∬2 dA = 2π. 구멍 있는 영역은 안쪽 경계를 시계 방향으로 더해요.<br><sub>∮\_C P dx + Q dy = ∬\_D (∂Q/∂x − ∂P/∂y) dA; area A = ½∮(x dy − y dx). For F = (−y, x) on the unit disk, ∬2 dA = 2π. For regions with holes, add the inner boundary clockwise.</sub> |
| **면적분과 플럭스**<br><sub>Surface integrals and flux</sub> | 곡면을 지나가는 흐름의 양이에요. 벡터장의 법선 성분 F·n을 곡면 위에서 적분해요.<br><sub>The amount of flow through a surface: integrate the normal component F·n over it.</sub> | 곡면 r(u, v): dS = \|r\_u × r\_v\| du dv, 플럭스 ∬F·n dS = ∬F·(r\_u × r\_v) du dv. 그래프 z = g(x, y)는 dS = √(1 + gₓ² + g\_y²) dA. 방향(법선 방향)을 먼저 정해요.<br><sub>For r(u, v): dS = \|r\_u × r\_v\| du dv and flux ∬F·n dS = ∬F·(r\_u × r\_v) du dv. For z = g(x, y), dS = √(1 + gₓ² + g\_y²) dA. Fix the orientation (normal direction) first.</sub> |
| **발산 정리**<br><sub>Divergence theorem</sub> | 닫힌 곡면을 빠져나가는 전체 플럭스는 그 안의 발산을 모두 더한 것과 같아요.<br><sub>The total flux out of a closed surface equals the total divergence inside it.</sub> | ∯\_S F·n dS = ∭\_V ∇·F dV. 예: F = (x, y, z), 반지름 R 구 → 3·(4/3)πR³ = 4πR³. 전자기학의 가우스 법칙과 연속 방정식의 수학적 바탕이에요.<br><sub>∯\_S F·n dS = ∭\_V ∇·F dV. For F = (x, y, z) and a sphere of radius R: 3·(4/3)πR³ = 4πR³. The maths behind Gauss’s law and the continuity equation.</sub> |
| **스토크스 정리**<br><sub>Stokes’ theorem</sub> | 곡면 S의 경계 C를 도는 선적분은 S 위에서 회전 ∇×F의 플럭스와 같아요. 그린 정리를 3차원으로 넓힌 거예요.<br><sub>The circulation around the boundary C equals the flux of ∇×F through S: Green’s theorem in 3D.</sub> | ∮\_C F·dr = ∬\_S (∇×F)·n dS. 경계 방향은 오른손 법칙(법선 방향에 엄지). 같은 경계를 가진 더 쉬운 곡면(평면 원판 등)으로 바꿔 계산하는 게 요령이에요.<br><sub>∮\_C F·dr = ∬\_S (∇×F)·n dS, with C oriented by the right-hand rule. Swap S for any easier surface with the same boundary, such as a flat disk.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
