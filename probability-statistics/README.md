# 확률·통계 · Probability & statistics

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/probability-statistics/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

조건부 확률과 베이즈 정리, 이항·포아송·지수·정규 분포, 큰 수의 법칙과 중심극한정리, 몬테카를로, 그리고 신뢰구간·가설검정·최대우도·회귀·A/B 테스트까지. 데이터를 다루는 개발자가 매일 쓰는 확률과 통계를 그림으로 정리했어요.

Conditional probability and Bayes, the binomial, Poisson, exponential and normal distributions, the law of large numbers and CLT, Monte Carlo, then confidence intervals, hypothesis tests, maximum likelihood, regression and A/B testing: the probability and statistics developers use with data every day.

**4개 주제 · 25개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [확률의 기초 · Probability basics](#pr-base) (5)
- [확률변수와 확률분포 · Random variables and distributions](#pr-rv) (9)
- [극한 정리와 시뮬레이션 · Limit theorems and simulation](#pr-lim) (4)
- [통계적 추론 · Statistical inference](#pr-inf) (7)

<a id="pr-base"></a>

## 확률의 기초 · Probability basics

사건, 조건부 확률, 독립, 그리고 베이즈 정리예요.  
*Events, conditional probability, independence and Bayes’ theorem.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **표본공간, 사건, 확률의 공리**<br><sub>Sample spaces, events and axioms</sub> | 시행의 모든 결과를 모은 집합이 표본공간이고, 그 부분집합이 사건이에요. 확률은 0 ≤ P ≤ 1, P(S) = 1, 배반 사건의 합은 확률의 합이라는 세 공리를 따라요.<br><sub>The sample space is every outcome; events are its subsets. Probability obeys three axioms: 0 ≤ P ≤ 1, P(S) = 1, and additivity for disjoint events.</sub> | P(A∪B) = P(A) + P(B) − P(A∩B). 예: P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2 → 0.7. 여사건 P(Aᶜ) = 1 − P(A). "적어도 하나"는 여사건으로: 주사위 4번 중 6이 한 번 이상 = 1 − (5/6)⁴ ≈ 0.52.<br><sub>P(A∪B) = P(A) + P(B) − P(A∩B): 0.5 + 0.4 − 0.2 = 0.7. Complement P(Aᶜ) = 1 − P(A). “At least one” via the complement: a six in four rolls has probability 1 − (5/6)⁴ ≈ 0.52.</sub> |
| **조건부 확률**<br><sub>Conditional probability</sub> | B가 일어났다는 정보가 있을 때 A의 확률이에요. 표본공간을 B로 줄여서 그 안에서 A의 비율을 봐요.<br><sub>The probability of A once you know B happened: shrink the sample space to B and take A’s share of it.</sub> | P(A\|B) = P(A∩B)/P(B), 곱셈 법칙 P(A∩B) = P(B)P(A\|B). 예: 두 주사위 합 ≥ 9(10가지)일 때 첫째가 6일 확률 = 4/10. P(A\|B) ≠ P(B\|A)에 주의 (검사 양성일 때 병 vs 병일 때 양성).<br><sub>P(A\|B) = P(A∩B)/P(B); multiplication rule P(A∩B) = P(B)P(A\|B). With two dice summing to at least 9 (10 outcomes), the first die is a six in 4 of them: 0.4. Beware P(A\|B) ≠ P(B\|A).</sub> |
| **독립 사건**<br><sub>Independent events</sub> | 한 사건이 일어나도 다른 사건의 확률이 변하지 않으면 독립이에요. 그때 P(A∩B) = P(A)P(B)예요.<br><sub>Independent means one event doesn’t change the other’s probability, so P(A∩B) = P(A)P(B).</sub> | ⟺ P(A\|B) = P(A). 예: 첫째 짝수(½)와 둘째 ≤ 2(⅓) → 겹침 6/36 = ½·⅓. 배반(동시에 못 일어남)과 독립은 다른 개념이고, 확률이 양수인 배반 사건은 종속이에요. 서로 독립인 n개 사건이 모두 일어날 확률 = 곱.<br><sub>Equivalently P(A\|B) = P(A). First die even (½) and second die ≤ 2 (⅓) overlap in 6/36 = ½·⅓. Disjoint is not the same as independent; disjoint events with positive probability are dependent. For independent events, all happening = product.</sub> |
| **확률 트리와 전확률 공식**<br><sub>Probability trees and total probability</sub> | 단계별 확률을 가지로 그리고 경로를 따라 곱해요. 같은 결과로 가는 경로를 더하면 전확률이에요.<br><sub>Draw each stage as branches and multiply along paths; add the paths that reach the same outcome for the total probability.</sub> | P(D) = Σ P(D\|Bᵢ)P(Bᵢ). 예: 기계 A 60%(불량 2%), B 40%(불량 5%) → P(불량) = 0.012 + 0.020 = 0.032. 거꾸로 P(B\|불량) = 0.020/0.032 = 0.625. Bᵢ들은 표본공간을 빠짐없이 겹치지 않게 나눠야 해요(분할).<br><sub>P(D) = Σ P(D\|Bᵢ)P(Bᵢ). Machine A makes 60% with 2% defects, B 40% with 5%: P(defect) = 0.012 + 0.020 = 0.032, and P(B \| defect) = 0.020/0.032 = 0.625. The Bᵢ must partition the sample space.</sub> |
| **베이즈 정리**<br><sub>Bayes’ theorem</sub> | 관측(증거)을 보고 원인의 확률을 갱신해요. 사후확률 ∝ 가능도 × 사전확률이에요.<br><sub>Update the probability of a cause after seeing evidence: posterior ∝ likelihood × prior.</sub> | P(H\|E) = P(E\|H)P(H) / P(E). 예: 유병률 1%, 민감도 99%, 위양성 5% → 양성일 때 실제 환자일 확률 ≈ 16.7%(유병률 10%면 68.8%). 스팸 필터(나이브 베이즈), 의료 진단, A/B 테스트의 베이지안 해석에 써요.<br><sub>P(H\|E) = P(E\|H)P(H) / P(E). With 1% prevalence, 99% sensitivity and 5% false positives, a positive test means only ≈16.7% chance of disease (68.8% at 10% prevalence). Used in naive Bayes spam filters, diagnosis and Bayesian A/B testing.</sub> |

<a id="pr-rv"></a>

## 확률변수와 확률분포 · Random variables and distributions

결과를 숫자로 바꾸고, 자주 쓰는 분포의 모양과 평균·분산을 익혀요.  
*Turn outcomes into numbers and learn the common distributions.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **확률변수와 확률질량함수**<br><sub>Random variables and the PMF</sub> | 표본공간의 각 결과에 숫자를 대응시킨 함수가 확률변수예요. 이산형이면 각 값의 확률 p(x) = P(X = x)를 나열해요.<br><sub>A random variable assigns a number to each outcome; for discrete ones the PMF lists p(x) = P(X = x).</sub> | 예: 두 주사위 합 P(X = x) = (6 − \|x − 7\|)/36, 7이 6/36으로 최대. 누적분포함수 F(x) = P(X ≤ x)는 비감소이고 0에서 1까지 올라가요. Σp(x) = 1.<br><sub>Sum of two dice: P(X = x) = (6 − \|x − 7\|)/36, peaking at 7 with 6/36. The CDF F(x) = P(X ≤ x) rises from 0 to 1 and never decreases. Σp(x) = 1.</sub> |
| **기댓값과 분산**<br><sub>Expectation and variance</sub> | 기댓값 E[X] = Σx·p(x)는 분포의 무게중심이고, 분산 Var X = E[(X − μ)²]은 퍼진 정도예요.<br><sub>E[X] = Σx·p(x) is the balance point; Var X = E[(X − μ)²] measures spread.</sub> | 주사위: E = 3.5, Var = E[X²] − μ² = 91/6 − 12.25 = 35/12, σ ≈ 1.71. E[aX + b] = aE[X] + b, Var(aX + b) = a²Var X. E[X + Y] = E[X] + E[Y]는 항상, Var(X + Y) = VarX + VarY는 독립일 때.<br><sub>A die has E = 3.5 and Var = E[X²] − μ² = 91/6 − 12.25 = 35/12, σ ≈ 1.71. E[aX + b] = aE[X] + b; Var(aX + b) = a²Var X. E[X + Y] = E[X] + E[Y] always; Var(X + Y) = VarX + VarY when independent.</sub> |
| **이항분포**<br><sub>Binomial distribution</sub> | 성공 확률 p인 독립 시행을 n번 할 때 성공 횟수의 분포예요. B(n, p)로 써요.<br><sub>The number of successes in n independent trials with success probability p: B(n, p).</sub> | P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ, E = np, Var = np(1 − p). 예: 동전 10번 중 앞면 3번 = 120/1024 ≈ 0.117. n이 크면 정규분포 N(np, np(1 − p))로 근사해요. 베르누이 분포는 n = 1인 경우.<br><sub>P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ, mean np, variance np(1 − p). Three heads in ten flips: 120/1024 ≈ 0.117. For large n it is approximately N(np, np(1 − p)). Bernoulli is the case n = 1.</sub> |
| **기하분포**<br><sub>Geometric distribution</sub> | 첫 성공이 나올 때까지의 시행 횟수예요. 매 단계 같은 비율 (1 − p)로 확률이 줄어요.<br><sub>The number of trials until the first success; each probability is (1 − p) times the previous one.</sub> | P(X = k) = (1 − p)ᵏ⁻¹p, E = 1/p, Var = (1 − p)/p². 예: 주사위로 6이 나올 때까지 평균 6번. 무기억성: P(X > m + n \| X > m) = P(X > n). 재시도 횟수, 첫 버그까지의 테스트 수.<br><sub>P(X = k) = (1 − p)ᵏ⁻¹p, mean 1/p, variance (1 − p)/p²: a six takes 6 rolls on average. Memoryless: P(X > m + n \| X > m) = P(X > n). Models retries until success.</sub> |
| **포아송 분포**<br><sub>Poisson distribution</sub> | 일정한 시간·공간에서 드물게, 독립적으로 일어나는 사건의 수예요. 평균 λ 하나로 정해져요.<br><sub>Counts of rare, independent events in a fixed interval, set by a single mean λ.</sub> | P(X = k) = e^(−λ)λᵏ/k!, E = Var = λ. 예: 시간당 평균 3건 → 정확히 3건 0.224, 0건 0.050. n 크고 p 작으면 B(n, p) ≈ Poisson(np). 서버 요청, 고장, 콜센터 트래픽 모델링.<br><sub>P(X = k) = e^(−λ)λᵏ/k!, mean = variance = λ. At 3 per hour: exactly 3 has probability 0.224, none 0.050. For large n and small p, B(n, p) ≈ Poisson(np). Models server requests, failures and call traffic.</sub> |
| **연속확률변수와 확률밀도함수**<br><sub>Continuous variables and densities</sub> | 연속형은 한 점의 확률이 0이고, 구간의 확률이 밀도 곡선 아래 넓이예요.<br><sub>For continuous variables single points have probability 0; probability is area under the density.</sub> | P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx = F(b) − F(a), f = F′, ∫f = 1, f ≥ 0(1보다 클 수도 있어요). 예: f(x) = x/2 (0 ≤ x ≤ 2) → P(1 ≤ X ≤ 2) = 3/4. E[X] = ∫x f(x)dx. 균등분포 U(a, b)는 f = 1/(b − a).<br><sub>P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx = F(b) − F(a), with f = F′, ∫f = 1 and f ≥ 0 (possibly above 1). For f(x) = x/2 on [0, 2], P(1 ≤ X ≤ 2) = 3/4. E[X] = ∫x f(x)dx. Uniform U(a, b) has f = 1/(b − a).</sub> |
| **지수분포**<br><sub>Exponential distribution</sub> | 포아송 과정에서 다음 사건까지 기다리는 시간의 분포예요. 연속 분포 중 유일하게 무기억성을 가져요.<br><sub>The waiting time between events of a Poisson process; the only memoryless continuous distribution.</sub> | f(x) = λe^(−λx), P(X > t) = e^(−λt), E = 1/λ, Var = 1/λ². 예: λ = 0.5/분 → 평균 2분, 3분 넘게 기다릴 확률 e^(−1.5) ≈ 0.22, 이미 2분 기다렸어도 같아요. 부품 수명, 패킷 도착 간격.<br><sub>f(x) = λe^(−λx), P(X > t) = e^(−λt), mean 1/λ, variance 1/λ². With λ = 0.5 per minute the mean wait is 2 minutes and waiting over 3 has probability e^(−1.5) ≈ 0.22, even after already waiting 2. Lifetimes, packet gaps.</sub> |
| **정규분포**<br><sub>Normal distribution</sub> | 평균 μ를 중심으로 대칭인 종 모양 분포예요. 표준화 Z = (X − μ)/σ로 하나의 표로 계산해요.<br><sub>A symmetric bell around μ; standardize with Z = (X − μ)/σ to use one table.</sub> | 68-95-99.7 규칙(±1σ, ±2σ, ±3σ). 예: IQ μ = 100, σ = 15에서 130은 z = 2로 상위 약 2.3%. 독립 정규변수의 합도 정규. 측정 오차, 키, 표본평균(중심극한정리) 등 어디서나 나와요.<br><sub>The 68-95-99.7 rule for ±1σ, ±2σ, ±3σ. With IQ μ = 100, σ = 15, a score of 130 is z = 2, about the top 2.3%. Sums of independent normals are normal. It appears in measurement error, heights and, through the CLT, sample means.</sub> |
| **공분산과 상관계수**<br><sub>Covariance and correlation</sub> | 두 변수가 함께 변하는 정도가 공분산, 이를 −1에서 1로 표준화한 것이 상관계수예요.<br><sub>Covariance measures how two variables move together; correlation scales it to between −1 and 1.</sub> | Cov(X, Y) = E[XY] − E[X]E[Y], r = Cov/(σₓσᵧ). 독립이면 Cov = 0이지만 역은 아니에요(y = x²). Var(X + Y) = VarX + VarY + 2Cov. r은 직선 관계만 재고, 상관은 인과가 아니에요.<br><sub>Cov(X, Y) = E[XY] − E[X]E[Y], r = Cov/(σₓσᵧ). Independence implies Cov = 0 but not conversely (y = x²). Var(X + Y) = VarX + VarY + 2Cov. r captures only linear relations, and correlation is not causation.</sub> |

<a id="pr-lim"></a>

## 극한 정리와 시뮬레이션 · Limit theorems and simulation

표본이 많아질 때 무슨 일이 일어나는지, 그리고 그것을 계산에 쓰는 법이에요.  
*What happens as samples grow, and how to compute with it.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **큰 수의 법칙**<br><sub>Law of large numbers</sub> | 같은 시행을 많이 반복하면 표본평균이 기댓값에 가까워져요.<br><sub>Repeat a trial many times and the sample mean approaches the expected value.</sub> | X̄ₙ → μ (n → ∞). 동전 앞면 비율이 0.5로 수렴. 오차 크기는 대략 σ/√n. 과거 결과를 "보정"하는 힘은 없고 희석될 뿐이에요(도박사의 오류). 보험료 산정, 카지노 수익의 근거.<br><sub>X̄ₙ → μ as n → ∞: the share of heads tends to 0.5. Typical error is about σ/√n. Past luck is diluted, never corrected (gambler’s fallacy). Why insurers and casinos can plan.</sub> |
| **중심극한정리**<br><sub>Central limit theorem</sub> | 독립이고 같은 분포를 따르는 변수를 많이 더하거나 평균 내면, 원래 분포와 상관없이 정규분포에 가까워져요.<br><sub>Add or average many i.i.d. variables and the result approaches a normal distribution, whatever the original shape.</sub> | X̄ ≈ N(μ, σ²/n), 합 ≈ N(nμ, nσ²). 예: 주사위 10개 합은 평균 35, 분산 29.2인 정규분포에 가까워요. 보통 n ≥ 30이면 충분(치우침이 크면 더). 신뢰구간과 가설검정의 바탕이에요.<br><sub>X̄ ≈ N(μ, σ²/n), sum ≈ N(nμ, nσ²). Ten dice sum to roughly normal with mean 35 and variance 29.2. Often n ≥ 30 suffices (more for heavy skew). It underpins confidence intervals and tests.</sub> |
| **마르코프·체비쇼프 부등식**<br><sub>Markov and Chebyshev inequalities</sub> | 분포를 몰라도 평균과 분산만으로 꼬리 확률의 상한을 줘요.<br><sub>Upper bounds on tail probabilities using only the mean and variance, for any distribution.</sub> | 마르코프: X ≥ 0이면 P(X ≥ a) ≤ E[X]/a. 체비쇼프: P(\|X − μ\| ≥ kσ) ≤ 1/k². 예: k = 2면 최대 25%(지수분포의 실제 값은 5%). 큰 수의 법칙 증명, 알고리즘 성능 분석에 써요.<br><sub>Markov: for X ≥ 0, P(X ≥ a) ≤ E[X]/a. Chebyshev: P(\|X − μ\| ≥ kσ) ≤ 1/k², so at most 25% for k = 2 (an exponential actually has 5%). Used to prove the law of large numbers and bound algorithm runtimes.</sub> |
| **몬테카를로 방법**<br><sub>Monte Carlo methods</sub> | 무작위 표본을 많이 뽑아 확률·적분·기댓값을 어림해요. 차원이 높아도 쓸 수 있어요.<br><sub>Estimate probabilities, integrals and expectations from many random samples; works in high dimensions too.</sub> | 예: 정사각형에 점을 찍어 사분원 안 비율 × 4 ≈ π. 오차 ∝ 1/√n이라 정확도 10배엔 표본 100배. 고차원 적분, 금융 위험(VaR), 렌더링(경로 추적), 게임 AI(MCTS), 베이지안 추론(MCMC).<br><sub>Random points in a square: 4 × (share inside the quarter circle) ≈ π. Error ∝ 1/√n, so 10× accuracy costs 100× samples. Used for high-dimensional integrals, financial risk, path-traced rendering, game AI (MCTS) and Bayesian inference (MCMC).</sub> |

<a id="pr-inf"></a>

## 통계적 추론 · Statistical inference

표본으로 모집단을 추정하고, 데이터로 주장을 검정해요.  
*Estimate populations from samples and test claims with data.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **표본분포와 표준오차**<br><sub>Sampling distributions and standard error</sub> | 표본평균도 확률변수예요. 그 분포는 μ를 중심으로 하고, 표준편차(표준오차)는 σ/√n이에요.<br><sub>The sample mean is itself random, centered on μ with spread σ/√n: the standard error.</sub> | SE = σ/√n (σ를 모르면 s/√n). 예: σ = 1, n = 4 → 0.5, n = 25 → 0.2. 정밀도를 2배로 하려면 표본 4배. 표본분산은 n − 1로 나눠야 불편추정량이에요.<br><sub>SE = σ/√n (s/√n when σ is unknown): σ = 1 gives 0.5 at n = 4 and 0.2 at n = 25. Doubling precision takes four times the data. Dividing the sample variance by n − 1 makes it unbiased.</sub> |
| **신뢰구간**<br><sub>Confidence intervals</sub> | 추정값에 오차 범위를 붙인 구간이에요. 95% 신뢰구간은 같은 방법을 반복하면 95%가 참값을 포함한다는 뜻이에요.<br><sub>An estimate with an error margin; a 95% interval comes from a method that captures the true value 95% of the time.</sub> | x̄ ± z·σ/√n (95%: z = 1.96, 99%: 2.58). 예: n = 100, x̄ = 52, s = 10 → 52 ± 1.96 = [50.0, 54.0]. σ를 모르고 n이 작으면 t분포(자유도 n − 1). 비율은 p̂ ± 1.96√(p̂(1 − p̂)/n).<br><sub>x̄ ± z·σ/√n (z = 1.96 for 95%, 2.58 for 99%). With n = 100, x̄ = 52, s = 10: 52 ± 1.96 = [50.0, 54.0]. Small samples with unknown σ use t with n − 1 degrees of freedom. Proportions: p̂ ± 1.96√(p̂(1 − p̂)/n).</sub> |
| **가설검정과 p-값**<br><sub>Hypothesis tests and p-values</sub> | 귀무가설 H₀가 참이라고 가정하고, 관측한 데이터가 그 아래서 얼마나 극단적인지(p-값)를 봐요. p-값이 유의수준 α보다 작으면 H₀를 기각해요.<br><sub>Assume H₀ and ask how extreme the data are under it (the p-value); reject H₀ if p is below the significance level α.</sub> | 예: 동전 100번 중 앞면 61번 → z = (61 − 50)/5 = 2.2, 양측 p ≈ 0.028 < 0.05 → 기각. p-값은 "H₀가 참일 확률"이 아니고, 효과의 크기도 말해주지 않아요. 단측/양측, z/t/χ² 검정.<br><sub>61 heads in 100 flips: z = (61 − 50)/5 = 2.2, two-sided p ≈ 0.028 < 0.05, so reject. A p-value is not the probability that H₀ is true and says nothing about effect size. One- vs two-sided; z, t and χ² tests.</sub> |
| **1종·2종 오류와 검정력**<br><sub>Type I/II errors and power</sub> | 참인 H₀를 기각하는 1종 오류(확률 α)와 거짓인 H₀를 놓치는 2종 오류(확률 β)가 있어요. 1 − β가 검정력이에요.<br><sub>A type I error rejects a true H₀ (probability α); a type II error misses a false one (β). Power is 1 − β.</sub> | 예: H₀: μ = 0, H₁: μ = 3(σ = 1), 단측 α = 0.05(기준 1.645) → β = Φ(1.645 − 3) ≈ 0.09, 검정력 ≈ 0.91. 기준을 옮기면 α와 β는 반대로 움직이고, 표본을 늘리면 둘 다 줄어요. 실험 전 검정력 분석으로 n을 정해요.<br><sub>H₀: μ = 0 vs H₁: μ = 3 (σ = 1), one-sided α = 0.05 (cutoff 1.645): β = Φ(1.645 − 3) ≈ 0.09, power ≈ 0.91. Moving the cutoff trades α for β; more data shrinks both. Power analysis sets n before an experiment.</sub> |
| **최대우도추정**<br><sub>Maximum likelihood estimation</sub> | 관측한 데이터가 나올 가능성(가능도)을 가장 크게 만드는 모수를 추정값으로 골라요.<br><sub>Choose the parameter that makes the observed data most likely.</sub> | 예: 10번 중 앞면 7번 → L(p) = p⁷(1 − p)³, d/dp ln L = 0 → p̂ = 0.7. 정규분포 μ̂ = x̄, σ̂² = Σ(x − x̄)²/n. 로그가능도의 음수가 머신러닝의 손실 함수(교차 엔트로피)예요.<br><sub>Seven heads in ten: L(p) = p⁷(1 − p)³ and d/dp ln L = 0 gives p̂ = 0.7. For a normal sample μ̂ = x̄ and σ̂² = Σ(x − x̄)²/n. The negative log-likelihood is machine learning’s loss (cross-entropy).</sub> |
| **회귀분석과 결정계수**<br><sub>Regression and R²</sub> | 최소제곱법으로 y = b₀ + b₁x를 맞추고, 설명된 변동의 비율 R²로 적합도를 봐요.<br><sub>Fit y = b₀ + b₁x by least squares and judge it by R², the share of variation explained.</sub> | b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s\_y/s\_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, 단순회귀에서 R² = r². 잔차 그림으로 선형성·등분산 가정을 확인하고, 범위 밖 외삽과 인과 해석은 조심해요.<br><sub>b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r·s\_y/s\_x, b₀ = ȳ − b₁x̄. R² = 1 − SSE/SST, which equals r² in simple regression. Check linearity and constant variance with residual plots; beware extrapolation and causal claims.</sub> |
| **A/B 테스트**<br><sub>A/B testing</sub> | 사용자를 무작위로 두 그룹에 나눠 한 가지만 바꾼 뒤, 지표 차이가 우연인지 통계적으로 판단해요.<br><sub>Randomly split users, change one thing, and test whether the metric difference is more than chance.</sub> | 예: A 100/2000 = 5%, B 130/2000 = 6.5% → 합동 p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041 → 5% 수준에서 유의. 표본 크기는 미리 정하고, 중간에 몰래 보고 멈추지 말고(peeking), 지표가 여럿이면 다중 비교를 보정해요.<br><sub>A converts 100/2000 = 5%, B 130/2000 = 6.5%: pooled p̂ = 0.0575, SE ≈ 0.0074, z ≈ 2.04, p ≈ 0.041, significant at 5%. Fix the sample size in advance, don’t peek and stop early, and correct for multiple metrics.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
