# 일반물리학 · General physics

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/general-physics/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

운동과 뉴턴 법칙, 에너지와 운동량, 회전, 진동·중력·유체, 파동, 열역학, 전기와 회로, 자기와 전자기 유도, 광학, 현대물리까지. 개념마다 공식과 수치 예제를 붙이고, 물체와 장이 실제로 움직이는 모습으로 보여줘요.

Motion and Newton’s laws, energy and momentum, rotation, oscillations, gravity and fluids, waves, thermodynamics, electricity and circuits, magnetism and induction, optics and modern physics. Every concept has formulas and a numerical example, shown with objects and fields actually moving.

**10개 주제 · 42개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [운동과 힘 · Motion and forces](#ph-mo) (5)
- [에너지와 운동량 · Energy and momentum](#ph-en) (4)
- [회전 운동 · Rotational motion](#ph-ro) (4)
- [진동, 중력, 유체 · Oscillations, gravity and fluids](#ph-os) (5)
- [파동과 소리 · Waves and sound](#ph-wv) (3)
- [열과 열역학 · Heat and thermodynamics](#ph-th) (3)
- [전기장과 회로 · Electric fields and circuits](#ph-el) (7)
- [자기와 전자기 유도 · Magnetism and induction](#ph-mg) (5)
- [빛과 광학 · Light and optics](#ph-op) (3)
- [현대물리 · Modern physics](#ph-md) (3)

<a id="ph-mo"></a>

## 운동과 힘 · Motion and forces

위치·속도·가속도로 운동을 기술하고, 뉴턴 법칙으로 그 원인을 설명해요.  
*Describe motion with position, velocity and acceleration, and explain it with Newton’s laws.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **등가속도 직선 운동**<br><sub>Uniform acceleration</sub> | 가속도가 일정하면 속도는 시간에 비례해 늘고, 위치는 시간의 제곱으로 변해요. v-t 그래프의 기울기는 가속도, 넓이는 변위예요.<br><sub>With constant acceleration, velocity grows linearly and position quadratically. The slope of v-t is acceleration; the area is displacement.</sub> | v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax. 예: 정지에서 a = 2 m/s² → 4초 뒤 v = 8 m/s, x = 16 m. 자유낙하는 a = g = 9.8 m/s²: 2초 동안 19.6 m 낙하. 평균속도 = (v₀ + v)/2.<br><sub>v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax. From rest at 2 m/s²: after 4 s, v = 8 m/s and x = 16 m. Free fall uses a = g = 9.8 m/s²: 19.6 m in 2 s. Average velocity = (v₀ + v)/2.</sub> |
| **포물체 운동**<br><sub>Projectile motion</sub> | 수평 방향은 등속, 연직 방향은 등가속(−g) 운동으로 나눠 따로 풀어요. 두 운동을 합치면 포물선이 돼요.<br><sub>Treat horizontal motion as constant velocity and vertical motion as constant acceleration −g; together they trace a parabola.</sub> | T = 2v₀sinθ/g, H = v₀²sin²θ/2g, R = v₀²sin2θ/g. 예: v₀ = 20 m/s, 45° → T = 2.9 s, H = 10.2 m, R = 40.8 m. 사거리는 45°에서 최대, θ와 90° − θ는 사거리가 같아요. 수평으로 던지면 낙하 시간은 높이로만 정해져요.<br><sub>T = 2v₀sinθ/g, H = v₀²sin²θ/2g, R = v₀²sin2θ/g. At 20 m/s and 45°: T = 2.9 s, H = 10.2 m, R = 40.8 m. Range peaks at 45°, and θ and 90° − θ land together. A horizontal launch falls for a time set only by height.</sub> |
| **등속 원운동**<br><sub>Uniform circular motion</sub> | 속력이 일정해도 방향이 계속 바뀌므로 중심을 향하는 가속도(구심가속도)가 있어요. 이를 만드는 알짜힘이 구심력이에요.<br><sub>Even at constant speed the direction changes, so there is a centripetal acceleration toward the center, produced by a net centripetal force.</sub> | a = v²/r = ω²r, F = mv²/r, v = rω, T = 2πr/v. 예: r = 2 m, v = 4 m/s, m = 0.5 kg → a = 8 m/s², F = 4 N. 연직 원운동 꼭대기에서 줄이 느슨해지지 않으려면 v ≥ √(gr).<br><sub>a = v²/r = ω²r, F = mv²/r, v = rω, T = 2πr/v. With r = 2 m, v = 4 m/s, m = 0.5 kg: a = 8 m/s², F = 4 N. In a vertical loop the string stays taut at the top only if v ≥ √(gr).</sub> |
| **뉴턴의 운동 법칙**<br><sub>Newton’s laws</sub> | 관성(제1법칙), ΣF = ma(제2법칙), 작용·반작용(제3법칙). 자유물체도를 그리고 축 방향으로 힘을 나눠 식을 세워요.<br><sub>Inertia (first law), ΣF = ma (second) and action–reaction (third). Draw a free-body diagram and resolve forces along axes.</sub> | 경사면(마찰 없음): a = g sinθ, N = mg cosθ. 예: 30°, 2 kg → a = 4.9 m/s². 도르래로 연결된 물체는 한 계로 보고 (m₁ + m₂)a = 알짜힘. 엘리베이터 위 겉보기 무게 N = m(g + a).<br><sub>Frictionless incline: a = g sinθ, N = mg cosθ; at 30° that is 4.9 m/s² for any mass. Blocks joined over a pulley: treat as one system, (m₁ + m₂)a = net force. Apparent weight in an elevator: N = m(g + a).</sub> |
| **마찰력**<br><sub>Friction</sub> | 정지마찰력은 미는 힘만큼 버티다 최대 μₛN에서 미끄러지기 시작하고, 운동마찰력은 μₖN으로 일정해요.<br><sub>Static friction matches the applied force up to μₛN; once sliding, kinetic friction is a constant μₖN.</sub> | fₛ ≤ μₛN, fₖ = μₖN, 보통 μₖ < μₛ. 예: 10 kg, μₛ = 0.5, μₖ = 0.3 → 49 N까지 정지, 움직이면 29.4 N. 경사면에서 미끄러지기 시작하는 각: tanθ = μₛ. 마찰력은 접촉 면적과 거의 무관해요.<br><sub>fₛ ≤ μₛN, fₖ = μₖN, usually μₖ < μₛ. For 10 kg with μₛ = 0.5, μₖ = 0.3: it holds to 49 N, then slides against 29.4 N. On a slope it starts slipping when tanθ = μₛ. Friction barely depends on contact area.</sub> |

<a id="ph-en"></a>

## 에너지와 운동량 · Energy and momentum

힘을 시간·거리로 쌓으면 보존되는 양이 나와요.  
*Accumulate force over distance or time and conserved quantities appear.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **일과 운동에너지**<br><sub>Work and kinetic energy</sub> | 힘이 한 일 W = Fd cosθ예요. 알짜힘이 한 일은 운동에너지 변화와 같아요 (일-운동에너지 정리).<br><sub>Work is W = Fd cosθ, and the net work equals the change in kinetic energy (work–energy theorem).</sub> | W = F·d = Fd cosθ, K = ½mv², W\_net = ΔK. 예: 10 N을 60°로 5 m → W = 25 J, 2 kg 정지 물체면 v = 5 m/s. 일률 P = W/t = Fv. 용수철이 한 일 ½kx², 수직항력·구심력은 일을 하지 않아요.<br><sub>W = F·d = Fd cosθ, K = ½mv², W\_net = ΔK. 10 N at 60° over 5 m does 25 J; a 2 kg block from rest reaches 5 m/s. Power P = W/t = Fv. A spring stores ½kx²; normal and centripetal forces do no work.</sub> |
| **역학적 에너지 보존**<br><sub>Conservation of mechanical energy</sub> | 보존력(중력, 탄성력)만 일하면 운동에너지와 퍼텐셜에너지의 합이 일정해요.<br><sub>If only conservative forces (gravity, springs) do work, kinetic plus potential energy stays constant.</sub> | K + U = 일정, U = mgh, 탄성 U = ½kx². 예: 5 m에서 놓으면 바닥 속력 √(2gh) = 9.9 m/s(질량 무관). 마찰이 있으면 W\_마찰 = ΔE(열로 손실). 진자, 롤러코스터, 용수철 문제에 그대로 써요.<br><sub>K + U = constant with U = mgh or ½kx². Dropped from 5 m the speed at the bottom is √(2gh) = 9.9 m/s, regardless of mass. Friction removes energy as heat: W\_friction = ΔE. Works for pendulums, roller coasters and springs.</sub> |
| **운동량과 충격량**<br><sub>Momentum and impulse</sub> | 운동량 p = mv. 힘을 시간에 대해 쌓은 충격량 J = FΔt가 운동량 변화와 같아요.<br><sub>Momentum p = mv; impulse J = FΔt, force accumulated over time, equals the change in momentum.</sub> | J = ∫F dt = Δp = m(v′ − v). 예: 0.5 kg 공이 10 m/s → −8 m/s로 튕기면 Δp = −9 N·s, 0.01초면 평균 힘 900 N. 같은 충격량이면 시간이 길수록 힘이 작아요(에어백, 무릎 굽혀 착지).<br><sub>J = ∫F dt = Δp = m(v′ − v). A 0.5 kg ball going from 10 m/s to −8 m/s has Δp = −9 N·s; over 0.01 s that is 900 N on average. The same impulse over a longer time means a smaller force: airbags, bending your knees.</sub> |
| **충돌과 운동량 보존**<br><sub>Collisions and momentum conservation</sub> | 외력이 없으면 충돌 전후 운동량의 합이 보존돼요. 운동에너지까지 보존되면 탄성 충돌이에요.<br><sub>With no external force, total momentum is the same before and after; if kinetic energy is also conserved the collision is elastic.</sub> | m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′. 예: 2 kg(3 m/s)가 정지한 1 kg와 탄성 충돌 → 1 m/s, 4 m/s · 붙으면 함께 2 m/s(3 J 손실). 반발계수 e = −(v₁′ − v₂′)/(v₁ − v₂): 탄성 1, 완전 비탄성 0. 질량중심 속도는 변하지 않아요.<br><sub>m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′. A 2 kg cart at 3 m/s hitting 1 kg at rest: elastic gives 1 and 4 m/s; sticking gives 2 m/s together and loses 3 J. Coefficient of restitution e = −(v₁′ − v₂′)/(v₁ − v₂): 1 elastic, 0 perfectly inelastic. The center-of-mass velocity never changes.</sub> |

<a id="ph-ro"></a>

## 회전 운동 · Rotational motion

직선 운동의 짝을 회전에서 찾아요: 토크, 관성 모멘트, 각운동량.  
*Rotational partners of linear motion: torque, moment of inertia, angular momentum.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **관성 모멘트와 τ = Iα**<br><sub>Moment of inertia and τ = Iα</sub> | 회전시키기 어려운 정도가 관성 모멘트 I = Σmr²예요. 질량이 회전축에서 멀수록 커요. τ = Iα가 회전의 뉴턴 제2법칙이에요.<br><sub>The moment of inertia I = Σmr² measures resistance to spinning; mass far from the axis counts more. τ = Iα is Newton’s second law for rotation.</sub> | 고리 MR², 원판·원기둥 ½MR², 구 ⅖MR², 막대(중심) ML²/12, 막대(끝) ML²/3. 평행축 정리 I = I\_cm + Md². 회전 운동학: ω = ω₀ + αt, θ = ω₀t + ½αt², v = rω, a\_t = rα. 회전 운동에너지 ½Iω².<br><sub>Hoop MR², disk ½MR², sphere ⅖MR², rod about center ML²/12, about an end ML²/3. Parallel-axis theorem I = I\_cm + Md². Kinematics: ω = ω₀ + αt, θ = ω₀t + ½αt², v = rω, a\_t = rα. Rotational energy ½Iω².</sub> |
| **토크와 정적 평형**<br><sub>Torque and static equilibrium</sub> | 토크 τ = rF sinθ는 회전시키는 능력이에요. 받침점에서 멀리, 수직으로 밀수록 커요. 정지해 있으려면 ΣF = 0, Στ = 0.<br><sub>Torque τ = rF sinθ measures turning effect: farther from the pivot and more perpendicular means more. Static equilibrium needs ΣF = 0 and Στ = 0.</sub> | 예: 3 kg가 2 m, 2 kg가 3 m에 있으면 6g = 6g로 평형 · 4 m로 옮기면 8g > 6g로 기울어요. 문제 풀이: 미지의 힘이 모인 점을 회전축으로 잡으면 식이 줄어요. 사다리, 들보, 지레 문제의 기본이에요.<br><sub>3 kg at 2 m balances 2 kg at 3 m (6g = 6g); move the 2 kg to 4 m and 8g > 6g tips it. Take torques about the point where unknown forces meet to eliminate them. The basis of ladder, beam and lever problems.</sub> |
| **각운동량 보존**<br><sub>Conservation of angular momentum</sub> | 각운동량 L = Iω(점입자는 r × p)이에요. 외부 토크가 없으면 L이 보존돼요.<br><sub>Angular momentum L = Iω (r × p for a particle) is conserved when there is no external torque.</sub> | τ = dL/dt. I₁ω₁ = I₂ω₂. 예: I = 4 → 1.6 kg·m²로 줄면 ω = 2 → 5 rad/s, 운동에너지는 8 J → 20 J(팔을 당기는 일). 행성은 태양 쪽에서 빨라지고(케플러 제2법칙), 회전하는 의자 실험도 같은 원리예요.<br><sub>τ = dL/dt and I₁ω₁ = I₂ω₂. Shrinking I from 4 to 1.6 kg·m² raises ω from 2 to 5 rad/s, and kinetic energy rises from 8 J to 20 J from the work of pulling in. Planets speed up near the Sun (Kepler’s second law) for the same reason.</sub> |
| **굴러가는 운동**<br><sub>Rolling motion</sub> | 미끄러지지 않고 구르면 v = Rω이고, 운동에너지가 병진 ½Mv²와 회전 ½Iω²로 나뉘어요.<br><sub>Rolling without slipping means v = Rω, and kinetic energy splits into translation ½Mv² and rotation ½Iω².</sub> | I = cMR²이면 a = g sinθ/(1 + c), v = √(2gh/(1 + c)). 높이 1 m: 구(c = ⅖) 3.74, 원판(½) 3.61, 고리(1) 3.13, 미끄럼 4.43 m/s. 질량과 반지름이 아니라 모양(c)이 순위를 정해요. 구르게 하는 정지마찰력은 일을 하지 않아요.<br><sub>With I = cMR²: a = g sinθ/(1 + c), v = √(2gh/(1 + c)). From 1 m: sphere (c = ⅖) 3.74, disk (½) 3.61, hoop (1) 3.13, sliding block 4.43 m/s. Shape, not mass or radius, sets the order. The static friction that makes it roll does no work.</sub> |

<a id="ph-os"></a>

## 진동, 중력, 유체 · Oscillations, gravity and fluids

되돌아오는 운동, 행성의 운동, 흐르는 물질의 법칙이에요.  
*Back-and-forth motion, planetary motion and the laws of flowing matter.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **단순 조화 운동**<br><sub>Simple harmonic motion</sub> | 복원력 F = −kx를 받으면 x = A cos(ωt + φ)로 진동해요. 주기는 진폭과 무관해요.<br><sub>A restoring force F = −kx gives oscillation x = A cos(ωt + φ); the period does not depend on amplitude.</sub> | ω = √(k/m), T = 2π√(m/k), v\_max = Aω, a\_max = Aω², E = ½kA² = ½mv² + ½kx². 예: k = 200 N/m, m = 2 kg → ω = 10 rad/s, T = 0.63 s. 평형점에서 속력 최대, 양 끝에서 가속도 최대.<br><sub>ω = √(k/m), T = 2π√(m/k), v\_max = Aω, a\_max = Aω², E = ½kA² = ½mv² + ½kx². With k = 200 N/m and m = 2 kg: ω = 10 rad/s, T = 0.63 s. Speed peaks at the center; acceleration peaks at the ends.</sub> |
| **단진자**<br><sub>Simple pendulum</sub> | 작은 각에서 복원력 −mg sinθ ≈ −mgθ라서 단순 조화 운동을 해요. 주기는 길이와 g로만 정해져요.<br><sub>At small angles the restoring force −mg sinθ ≈ −mgθ makes simple harmonic motion, with a period set only by length and g.</sub> | T = 2π√(L/g). 예: L = 1 m → 2.0 s, 0.25 m → 1.0 s. 질량과 진폭(작은 각)에 무관. 물리 진자 T = 2π√(I/mgd). 주기를 재면 g를 측정할 수 있어요. 달에서는 g가 1/6이라 주기가 √6배.<br><sub>T = 2π√(L/g): 1 m gives 2.0 s, 0.25 m gives 1.0 s, independent of mass and (small) amplitude. A physical pendulum has T = 2π√(I/mgd). Timing a pendulum measures g; on the Moon the period is √6 times longer.</sub> |
| **만유인력과 궤도 운동**<br><sub>Universal gravitation and orbits</sub> | 두 질량은 F = GMm/r²로 끌어당겨요. 위성은 만유인력이 구심력 역할을 해서 원궤도를 돌아요.<br><sub>Two masses attract with F = GMm/r²; for a satellite, gravity is the centripetal force of its orbit.</sub> | v = √(GM/r), T² = (4π²/GM)r³(케플러 제3법칙), g = GM/R² = 9.8 m/s², 탈출 속도 √(2GM/R) = 11.2 km/s, U = −GMm/r, 궤도 에너지 E = −GMm/2r. 정지궤도 위성은 r ≈ 42,000 km. 케플러 제2법칙 = 각운동량 보존.<br><sub>v = √(GM/r), T² = (4π²/GM)r³ (Kepler’s third law), g = GM/R² = 9.8 m/s², escape speed √(2GM/R) = 11.2 km/s, U = −GMm/r, orbital energy E = −GMm/2r. Geostationary orbits sit at r ≈ 42,000 km. Kepler’s second law is angular momentum conservation.</sub> |
| **압력과 부력**<br><sub>Pressure and buoyancy</sub> | 유체 압력은 깊이에 따라 p = p₀ + ρgh로 커져요. 그 차이 때문에 잠긴 물체는 밀어낸 유체의 무게만큼 부력을 받아요.<br><sub>Fluid pressure grows with depth, p = p₀ + ρgh; that difference pushes up on a submerged object with the weight of the displaced fluid.</sub> | F\_B = ρ\_유체 V\_잠김 g. 예: 2 L 블록 → 19.6 N, 1.5 kg(14.7 N)이라 떠서 75%만 잠겨요(잠긴 비율 = ρ물체/ρ유체). 파스칼 원리: 가한 압력은 모든 곳에 그대로 전달 → 유압기 F₁/A₁ = F₂/A₂. 1 atm ≈ 물 10 m.<br><sub>F\_B = ρ\_fluid V\_sub g. A 2 L block feels 19.6 N; at 1.5 kg (14.7 N) it floats 75% submerged (fraction = ρ\_object/ρ\_fluid). Pascal’s principle transmits pressure everywhere: hydraulics F₁/A₁ = F₂/A₂. 1 atm ≈ 10 m of water.</sub> |
| **연속 방정식과 베르누이 정리**<br><sub>Continuity and Bernoulli</sub> | 비압축성 유체는 Av가 일정해서 좁은 곳에서 빨라져요. 흐름을 따라 P + ½ρv² + ρgh가 일정해 빠른 곳의 압력이 낮아요.<br><sub>For an incompressible fluid Av is constant, so it speeds up where the pipe narrows; along a streamline P + ½ρv² + ρgh is constant, so faster flow has lower pressure.</sub> | 예: 단면적 ½ → 속력 2배, v = 2 → 4 m/s면 압력 차 ½ρ(v₂² − v₁²) = 6000 Pa. 토리첼리: 구멍에서 나오는 속력 √(2gh). 벤투리 관으로 유속 측정, 비행기 날개·분무기의 원리.<br><sub>Half the area doubles the speed; going from 2 to 4 m/s drops the pressure by ½ρ(v₂² − v₁²) = 6000 Pa. Torricelli: water leaves a hole at √(2gh). Venturi meters, wings and atomizers all use it.</sub> |

<a id="ph-wv"></a>

## 파동과 소리 · Waves and sound

에너지를 실어 나르는 진동의 전파예요.  
*Traveling oscillations that carry energy.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **진행파**<br><sub>Traveling waves</sub> | 매질은 제자리에서 진동하고 모양과 에너지만 이동해요. y = A sin(kx − ωt)로 쓰고 v = fλ예요.<br><sub>The medium oscillates in place while shape and energy travel: y = A sin(kx − ωt) with v = fλ.</sub> | k = 2π/λ, ω = 2πf = 2π/T, v = λ/T = fλ. 줄의 파동 속력 v = √(T/μ)(장력/선밀도). 예: 소리 v = 340 m/s, f = 170 Hz → λ = 2 m. 횡파(줄, 빛)와 종파(소리). 파동의 세기 ∝ 진폭².<br><sub>k = 2π/λ, ω = 2πf = 2π/T, v = λ/T = fλ. On a string v = √(T/μ) (tension over linear density). Sound at 340 m/s and 170 Hz has λ = 2 m. Transverse (strings, light) vs longitudinal (sound). Intensity ∝ amplitude².</sub> |
| **중첩과 정상파**<br><sub>Superposition and standing waves</sub> | 반대로 진행하는 두 파동이 겹치면 제자리에서 진동하는 정상파가 돼요. 마디는 항상 멈춰 있어요.<br><sub>Two waves traveling opposite ways add up to a standing wave that oscillates in place; nodes never move.</sub> | 양 끝 고정 줄: λₙ = 2L/n, fₙ = nv/2L (n = 1, 2, 3…). 예: L = 0.5 m, v = 200 m/s → 200, 400, 600 Hz. 한쪽 열린 관: fₙ = nv/4L (n 홀수). 맥놀이 진동수 = \|f₁ − f₂\|. 마디 간격 λ/2.<br><sub>String fixed at both ends: λₙ = 2L/n, fₙ = nv/2L (n = 1, 2, 3…); L = 0.5 m and v = 200 m/s give 200, 400, 600 Hz. A pipe closed at one end has fₙ = nv/4L for odd n. Beat frequency = \|f₁ − f₂\|. Nodes are λ/2 apart.</sub> |
| **도플러 효과**<br><sub>Doppler effect</sub> | 음원이나 관측자가 움직이면 듣는 진동수가 달라져요. 다가오면 높게, 멀어지면 낮게 들려요.<br><sub>Motion of the source or observer changes the heard frequency: higher when approaching, lower when receding.</sub> | f′ = f(v ± v₀)/(v ∓ vₛ) (가까워지는 쪽이 위 부호). 예: f = 500 Hz, vₛ = 34 m/s → 앞 556 Hz, 뒤 455 Hz. 음원이 소리보다 빠르면 충격파(소닉 붐). 빛은 적색편이(멀어짐)로 우주 팽창을 측정해요.<br><sub>f′ = f(v ± v₀)/(v ∓ vₛ), upper signs for approach. f = 500 Hz with vₛ = 34 m/s gives 556 Hz ahead and 455 Hz behind. A source faster than sound makes a shock wave (sonic boom). For light, redshift reveals cosmic expansion.</sub> |

<a id="ph-th"></a>

## 열과 열역학 · Heat and thermodynamics

분자의 운동과 에너지 보존, 그리고 열이 일로 바뀌는 한계예요.  
*Molecular motion, energy conservation, and the limits on turning heat into work.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **이상기체와 분자 운동론**<br><sub>Ideal gases and kinetic theory</sub> | PV = nRT. 압력은 분자들이 벽에 부딪히는 충격이고, 온도는 분자 평균 운동에너지의 척도예요.<br><sub>PV = nRT. Pressure is molecules striking the walls; temperature measures their average kinetic energy.</sub> | K̄ = (3/2)kT, v\_rms = √(3RT/M), 내부에너지(단원자) U = (3/2)nRT. 예: N₂(M = 0.028 kg/mol), 300 K → v\_rms ≈ 517 m/s. 보일(T 일정) PV 일정, 샤를(P 일정) V ∝ T. R = 8.31 J/mol·K. 비열·잠열: Q = mcΔT, Q = mL.<br><sub>K̄ = (3/2)kT, v\_rms = √(3RT/M), monatomic U = (3/2)nRT. N₂ (M = 0.028 kg/mol) at 300 K has v\_rms ≈ 517 m/s. Boyle (constant T): PV constant; Charles (constant P): V ∝ T. R = 8.31 J/mol·K. Heating: Q = mcΔT; phase change: Q = mL.</sub> |
| **열역학 제1법칙**<br><sub>First law of thermodynamics</sub> | ΔU = Q − W(받은 열 − 기체가 한 일). 기체가 한 일은 P-V 그래프 아래 넓이예요.<br><sub>ΔU = Q − W: heat added minus work done by the gas, where work is the area under the P-V curve.</sub> | 등압 W = PΔV(예: 2×10⁵ Pa, 1 → 3 L → 400 J) · 등적 W = 0 · 등온 ΔU = 0, W = nRT ln(V₂/V₁) · 단열 Q = 0, PV^γ 일정(γ = Cp/Cv, 단원자 5/3). 몰비열 Cp − Cv = R. 순환 과정은 ΔU = 0, 한 일 = 닫힌 곡선 넓이.<br><sub>Isobaric W = PΔV (2×10⁵ Pa from 1 to 3 L is 400 J); isochoric W = 0; isothermal ΔU = 0, W = nRT ln(V₂/V₁); adiabatic Q = 0, PV^γ constant (γ = Cp/Cv, 5/3 monatomic). Cp − Cv = R. A cycle has ΔU = 0 and net work = enclosed area.</sub> |
| **열기관, 카르노 순환, 엔트로피**<br><sub>Heat engines, Carnot and entropy</sub> | 열기관은 고온에서 열을 받아 일부를 일로 바꾸고 나머지를 저온에 버려요. 효율의 상한은 두 온도로 정해져요.<br><sub>An engine takes heat from a hot reservoir, turns part into work and dumps the rest; the two temperatures cap its efficiency.</sub> | e = W/Q\_H = 1 − Q\_C/Q\_H ≤ 1 − T\_C/T\_H(카르노). 예: 600 K, 300 K → 최대 50%. 냉동기 성능계수 K = Q\_C/W. 엔트로피 ΔS = Q/T(가역), 고립계의 엔트로피는 감소하지 않아요(제2법칙). 가역 카르노: Q\_H/T\_H = Q\_C/T\_C.<br><sub>e = W/Q\_H = 1 − Q\_C/Q\_H ≤ 1 − T\_C/T\_H (Carnot); 600 K and 300 K allow at most 50%. A refrigerator’s coefficient K = Q\_C/W. Entropy ΔS = Q/T for reversible heat; an isolated system’s entropy never decreases (second law). For a Carnot cycle Q\_H/T\_H = Q\_C/T\_C.</sub> |

<a id="ph-el"></a>

## 전기장과 회로 · Electric fields and circuits

전하 사이의 힘에서 시작해 전기장, 전위, 축전기, 회로까지예요.  
*From forces between charges to fields, potential, capacitors and circuits.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **쿨롱 법칙**<br><sub>Coulomb’s law</sub> | 두 점전하 사이의 힘 F = kq₁q₂/r²예요. 같은 부호는 밀고 다른 부호는 당기며, 거리의 제곱에 반비례해요.<br><sub>The force between point charges is F = kq₁q₂/r²: like signs repel, unlike attract, falling off with the square of distance.</sub> | k = 1/4πε₀ = 9.0×10⁹ N·m²/C². 예: 1 μC 두 개가 0.1 m → 0.9 N. 거리 2배 → ¼. 여러 전하는 힘을 벡터로 더해요(중첩). 전하는 보존되고 기본 전하 e = 1.6×10⁻¹⁹ C의 정수배.<br><sub>k = 1/4πε₀ = 9.0×10⁹ N·m²/C². Two 1 μC charges 0.1 m apart: 0.9 N. Double the distance, a quarter of the force. Add forces from several charges as vectors. Charge is conserved and quantized in e = 1.6×10⁻¹⁹ C.</sub> |
| **전기장과 전기력선**<br><sub>Electric field and field lines</sub> | 전기장 E = F/q는 단위 양전하가 받는 힘이에요. 전기력선은 +에서 나와 −로 들어가고, 촘촘할수록 장이 세요.<br><sub>The field E = F/q is the force per unit positive charge; lines leave + and end on −, crowding where the field is strong.</sub> | 점전하 E = kq/r², 쌍극자 전기장은 중첩으로 계산. 전하 q가 받는 힘 F = qE, 균일한 장에서 전자의 가속도 a = eE/m. 전기력선은 서로 교차하지 않고 도체 표면에 수직이에요.<br><sub>Point charge E = kq/r²; a dipole’s field follows by superposition. A charge feels F = qE, so an electron in a uniform field accelerates at eE/m. Lines never cross and meet conductors at right angles.</sub> |
| **가우스 법칙**<br><sub>Gauss’s law</sub> | 닫힌 면을 지나는 전기 선속은 그 안의 전하에만 비례해요: Φ = q\_enc/ε₀. 대칭이 있으면 전기장을 바로 구할 수 있어요.<br><sub>The electric flux through a closed surface depends only on the enclosed charge: Φ = q\_enc/ε₀. With symmetry it gives E immediately.</sub> | 구 대칭 E = kq/r², 무한 직선 E = λ/2πε₀r, 무한 평면 E = σ/2ε₀, 평행판 사이 σ/ε₀. 도체 내부 E = 0이고 전하는 표면에 모여요. 밖의 전하는 선속에 기여하지 않아요.<br><sub>Spherical E = kq/r², infinite line E = λ/2πε₀r, infinite plane E = σ/2ε₀, between parallel plates σ/ε₀. Inside a conductor E = 0 and charge sits on the surface. Charges outside contribute no net flux.</sub> |
| **전위와 등전위면**<br><sub>Electric potential</sub> | 전위 V는 단위 전하당 전기 퍼텐셜 에너지예요. 전하를 옮기는 일 W = qΔV이고, 전기장은 전위가 낮아지는 쪽을 가리켜요.<br><sub>Potential V is electric potential energy per unit charge; moving a charge takes W = qΔV, and E points toward lower potential.</sub> | 점전하 V = kq/r(스칼라라 그냥 더해요), E = −dV/dr, 균일한 장 ΔV = Ed. 예: 1 μC를 45 V → 90 V로 옮기면 45 μJ. 1 eV = 1.6×10⁻¹⁹ J. 등전위면을 따라 움직이면 일 0, 전기력선은 등전위면에 수직.<br><sub>Point charge V = kq/r, added as scalars; E = −dV/dr; a uniform field gives ΔV = Ed. Moving 1 μC from 45 V to 90 V takes 45 μJ. 1 eV = 1.6×10⁻¹⁹ J. No work along an equipotential, and field lines cross equipotentials at right angles.</sub> |
| **축전기**<br><sub>Capacitors</sub> | 두 도체판에 전하 ±Q를 저장하는 장치예요. Q = CV이고 평행판은 C = ε₀A/d예요.<br><sub>Two plates storing ±Q, with Q = CV; for parallel plates C = ε₀A/d.</sub> | 예: A = 0.01 m², d = 1 mm → C = 88.5 pF, 12 V면 Q = 1.06 nC. 유전체 C = κε₀A/d. 에너지 U = ½CV² = Q²/2C. 직렬 1/C = Σ1/Cᵢ(전하 같음), 병렬 C = ΣCᵢ(전압 같음). 전지를 떼고 간격을 바꾸면 Q가 일정해요.<br><sub>A = 0.01 m², d = 1 mm gives C = 88.5 pF and Q = 1.06 nC at 12 V. With a dielectric C = κε₀A/d. Energy U = ½CV² = Q²/2C. Series 1/C = Σ1/Cᵢ (same charge); parallel C = ΣCᵢ (same voltage). Disconnect the battery and Q stays fixed when the gap changes.</sub> |
| **옴의 법칙과 키르히호프 법칙**<br><sub>Ohm’s law and Kirchhoff’s rules</sub> | V = IR. 접합점에서 들어온 전류 = 나간 전류(KCL), 닫힌 고리를 돌면 전압 변화의 합 = 0(KVL)이에요.<br><sub>V = IR. Current into a junction equals current out (KCL), and voltage changes around any closed loop sum to zero (KVL).</sub> | 저항 R = ρL/A, 직렬 R = ΣRᵢ, 병렬 1/R = Σ1/Rᵢ. 예: 12 V, 2 Ω + (6 Ω ∥ 3 Ω) → 4 Ω, 3 A, 가지 전류 1 A·2 A. 전력 P = IV = I²R = V²/R. 전지의 단자 전압 V = ε − Ir(내부 저항).<br><sub>R = ρL/A; series R = ΣRᵢ, parallel 1/R = Σ1/Rᵢ. 12 V across 2 Ω + (6 Ω ∥ 3 Ω) = 4 Ω gives 3 A, splitting 1 A and 2 A. Power P = IV = I²R = V²/R. A battery’s terminal voltage is V = ε − Ir with internal resistance r.</sub> |
| **RC 회로**<br><sub>RC circuits</sub> | 저항과 축전기를 연결하면 전하와 전류가 시간 상수 τ = RC로 지수적으로 변해요.<br><sub>In a resistor–capacitor circuit, charge and current change exponentially with time constant τ = RC.</sub> | 충전 q = CV(1 − e^(−t/RC)), i = (V/R)e^(−t/RC); 방전 q = Qe^(−t/RC). t = τ에서 63% 충전, 전류 37%. 예: 10 kΩ, 100 μF → τ = 1 s, 5τ면 99%. 처음엔 축전기가 도선처럼, 충분히 뒤엔 끊긴 것처럼 행동해요. RL 회로는 τ = L/R.<br><sub>Charging q = CV(1 − e^(−t/RC)), i = (V/R)e^(−t/RC); discharging q = Qe^(−t/RC). At t = τ: 63% charged, current at 37%. 10 kΩ with 100 μF gives τ = 1 s; 99% after 5τ. A capacitor acts like a wire at first and an open gap later. RL circuits have τ = L/R.</sub> |

<a id="ph-mg"></a>

## 자기와 전자기 유도 · Magnetism and induction

움직이는 전하가 만드는 자기장, 변하는 자기장이 만드는 전류, 그리고 빛이에요.  
*Fields from moving charges, currents from changing fields, and light itself.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **자기력과 하전 입자**<br><sub>Magnetic force on charges</sub> | 자기장 속에서 움직이는 전하는 F = qv × B를 받아요. 힘이 속도에 수직이라 원운동을 해요.<br><sub>A charge moving through a magnetic field feels F = qv × B, perpendicular to v, so it circles.</sub> | r = mv/qB, T = 2πm/qB(속력과 무관 → 사이클로트론). 전류 도선 F = IL × B = BIL sinθ. 자기력은 일을 하지 않아 속력이 변하지 않아요. 전기장과 함께: 속도 선택기 v = E/B, 질량 분석기.<br><sub>r = mv/qB, T = 2πm/qB, independent of speed: the cyclotron. A current-carrying wire feels F = IL × B = BIL sinθ. Magnetic forces do no work, so speed never changes. With an electric field too: velocity selector v = E/B, mass spectrometer.</sub> |
| **전류가 만드는 자기장**<br><sub>Magnetic fields of currents</sub> | 전류 주위에는 원형 자기장이 생겨요(오른손 법칙). 앙페르 법칙 ∮B·dl = μ₀I\_enc로 대칭인 경우를 계산해요.<br><sub>Currents are circled by magnetic field lines (right-hand rule); Ampère’s law ∮B·dl = μ₀I\_enc handles symmetric cases.</sub> | 직선 도선 B = μ₀I/2πr(예: 10 A, 2 cm → 1×10⁻⁴ T), 원형 도선 중심 B = μ₀I/2R, 솔레노이드 B = μ₀nI. 비오-사바르 법칙 dB = (μ₀/4π)I dl × r̂/r². 평행 전류: 같은 방향 인력, F/L = μ₀I₁I₂/2πd. μ₀ = 4π×10⁻⁷.<br><sub>Straight wire B = μ₀I/2πr (10 A at 2 cm → 1×10⁻⁴ T); center of a loop B = μ₀I/2R; solenoid B = μ₀nI. Biot–Savart: dB = (μ₀/4π)I dl × r̂/r². Parallel currents attract: F/L = μ₀I₁I₂/2πd. μ₀ = 4π×10⁻⁷.</sub> |
| **패러데이 법칙과 렌츠 법칙**<br><sub>Faraday’s and Lenz’s laws</sub> | 코일을 지나는 자기 선속 Φ = BA cosθ가 변하면 유도 기전력이 생겨요. 유도 전류는 그 변화를 방해하는 방향이에요.<br><sub>When the flux Φ = BA cosθ through a coil changes, an emf is induced; the induced current opposes the change.</sub> | ε = −N dΦ/dt. 움직이는 도선 ε = BLv. 회전 코일(발전기) ε = NBAω sin ωt. 변압기 V₂/V₁ = N₂/N₁. 예: 100회 코일의 선속이 0.1초에 0.02 Wb 변하면 ε = 20 V. 렌츠 법칙은 에너지 보존의 결과예요.<br><sub>ε = −N dΦ/dt; a moving rod gives ε = BLv; a rotating coil (generator) ε = NBAω sin ωt; transformers V₂/V₁ = N₂/N₁. A 100-turn coil whose flux changes by 0.02 Wb in 0.1 s gives 20 V. Lenz’s law is energy conservation.</sub> |
| **인덕턴스와 LC 진동**<br><sub>Inductance and LC oscillation</sub> | 코일은 전류 변화를 방해하는 기전력 −L dI/dt를 만들어요. 축전기와 연결하면 전기·자기 에너지가 번갈아 진동해요.<br><sub>An inductor opposes changes in current with emf −L dI/dt; paired with a capacitor, energy swings between electric and magnetic forms.</sub> | U\_B = ½LI², U\_E = q²/2C, ω = 1/√(LC). 예: L = 10 mH, C = 1 μF → ω = 10⁴ rad/s, f ≈ 1.6 kHz. 솔레노이드 L = μ₀n²Al. RL 회로 τ = L/R. 교류: X\_L = ωL, X\_C = 1/ωC, 공진 ω₀ = 1/√(LC)에서 임피던스 최소.<br><sub>U\_B = ½LI², U\_E = q²/2C, ω = 1/√(LC); L = 10 mH and C = 1 μF give ω = 10⁴ rad/s, f ≈ 1.6 kHz. A solenoid has L = μ₀n²Al. RL circuits: τ = L/R. In AC, X\_L = ωL, X\_C = 1/ωC, and impedance is lowest at resonance ω₀ = 1/√(LC).</sub> |
| **맥스웰 방정식과 전자기파**<br><sub>Maxwell’s equations and EM waves</sub> | 변하는 전기장이 자기장을, 변하는 자기장이 전기장을 만들어 서로를 유지하며 퍼지는 것이 전자기파예요. 빛도 전자기파예요.<br><sub>A changing E makes B and a changing B makes E, so the pair sustains itself and travels: an electromagnetic wave. Light is one.</sub> | 맥스웰 방정식: 가우스(E), 가우스(B, 자기 홀극 없음), 패러데이, 앙페르-맥스웰(변위 전류). c = 1/√(μ₀ε₀) = 3.0×10⁸ m/s, E = cB, E ⟂ B ⟂ 진행 방향. 세기 ∝ E², 복사압 = I/c. 스펙트럼: 전파~감마선은 파장만 달라요.<br><sub>Maxwell’s equations: Gauss for E, Gauss for B (no monopoles), Faraday, and Ampère–Maxwell with displacement current. c = 1/√(μ₀ε₀) = 3.0×10⁸ m/s, E = cB, with E ⟂ B ⟂ direction. Intensity ∝ E²; radiation pressure = I/c. From radio to gamma rays only the wavelength differs.</sub> |

<a id="ph-op"></a>

## 빛과 광학 · Light and optics

빛의 반사·굴절로 상을 만들고, 간섭으로 파동성을 확인해요.  
*Reflection and refraction form images; interference reveals light’s wave nature.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **반사, 굴절, 전반사**<br><sub>Reflection, refraction, total reflection</sub> | 반사각 = 입사각, 굴절은 n₁ sinθ₁ = n₂ sinθ₂(스넬 법칙)를 따라요. 굴절률이 큰 곳에서 작은 곳으로 갈 때 임계각보다 크면 모두 반사돼요.<br><sub>The reflection angle equals the incidence angle; refraction obeys n₁ sinθ₁ = n₂ sinθ₂ (Snell). Going to a lower index beyond the critical angle, everything reflects.</sub> | n = c/v. 예: 공기→유리(1.5) 45° → 28.1°. 임계각 sinθc = n₂/n₁ = 1/1.5 → 41.8°. 굴절 시 진동수는 그대로, 파장·속력이 n배 줄어요. 광섬유, 다이아몬드의 반짝임, 프리즘 분산(색마다 n이 다름).<br><sub>n = c/v. Air to glass (1.5) at 45° bends to 28.1°. Critical angle sinθc = n₂/n₁ = 1/1.5 → 41.8°. Frequency stays the same; wavelength and speed drop by n. Optical fibers, diamond sparkle and prism dispersion (n varies with color).</sub> |
| **렌즈와 거울**<br><sub>Lenses and mirrors</sub> | 얇은 렌즈와 구면 거울은 1/f = 1/d\_o + 1/d\_i로 상의 위치를, m = −d\_i/d\_o로 배율을 정해요. 세 개의 대표 광선으로 작도해요.<br><sub>Thin lenses and spherical mirrors obey 1/f = 1/d\_o + 1/d\_i for image position and m = −d\_i/d\_o for magnification; three standard rays locate the image.</sub> | 예: f = 10 cm 볼록렌즈, d\_o = 30 cm → d\_i = 15 cm, m = −0.5(도립 축소 실상). 물체가 f 안쪽이면 정립 확대 허상(돋보기). 오목렌즈·볼록거울은 f < 0. 구면 거울 f = R/2. 굴절력 D = 1/f(디옵터).<br><sub>A 10 cm converging lens with the object at 30 cm images it at 15 cm, m = −0.5 (real, inverted, smaller). Inside f you get an upright, enlarged virtual image: a magnifier. Diverging lenses and convex mirrors have f < 0. Mirrors: f = R/2. Power D = 1/f in diopters.</sub> |
| **간섭과 회절**<br><sub>Interference and diffraction</sub> | 두 틈에서 나온 빛이 겹쳐 경로차가 파장의 정수배인 곳은 밝고, 반정수배인 곳은 어두워요. 빛이 파동이라는 증거예요.<br><sub>Light from two slits overlaps: bright where the path difference is a whole number of wavelengths, dark at half-integers. Proof that light is a wave.</sub> | 이중 슬릿: 밝은 무늬 d sinθ = mλ, 간격 Δy = λL/d(예: 600 nm, 0.2 mm, 1 m → 3 mm). 단일 슬릿 어두운 무늬 a sinθ = mλ. 회절격자 d sinθ = mλ로 분광. 얇은 막 간섭: 반사 시 위상 반전 고려(비눗방울, 반사 방지 코팅).<br><sub>Double slit: bright fringes at d sinθ = mλ, spacing Δy = λL/d (600 nm, 0.2 mm, 1 m → 3 mm). Single slit dark fringes at a sinθ = mλ. Gratings use d sinθ = mλ for spectroscopy. Thin films: account for phase flips on reflection (soap bubbles, anti-reflection coatings).</sub> |

<a id="ph-md"></a>

## 현대물리 · Modern physics

아주 빠른 것과 아주 작은 것의 물리예요.  
*The physics of the very fast and the very small.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **특수 상대성 이론**<br><sub>Special relativity</sub> | 모든 관성계에서 빛의 속력이 같다는 원리에서 움직이는 시계는 느리게 가고(시간 지연) 길이는 줄어들어요(길이 수축).<br><sub>Because light has the same speed in every inertial frame, moving clocks run slow (time dilation) and moving lengths shrink (length contraction).</sub> | γ = 1/√(1 − v²/c²), Δt = γΔt₀, L = L₀/γ. 예: v = 0.6c → γ = 1.25, 0.8c → 5/3. 뮤온이 지표까지 도달하는 이유. E = γmc², 정지 에너지 mc², E² = (pc)² + (mc²)². 동시성은 관찰자에 따라 달라요.<br><sub>γ = 1/√(1 − v²/c²), Δt = γΔt₀, L = L₀/γ; v = 0.6c gives γ = 1.25 and 0.8c gives 5/3, which is why cosmic-ray muons reach the ground. E = γmc², rest energy mc², E² = (pc)² + (mc²)². Simultaneity depends on the observer.</sub> |
| **광전 효과와 광자**<br><sub>Photoelectric effect and photons</sub> | 빛은 에너지 hf를 가진 광자 알갱이예요. 문턱 진동수보다 높아야 전자가 나오고, 세기는 전자 수만 바꿔요.<br><sub>Light comes in photons of energy hf. Electrons escape only above a threshold frequency; intensity changes only how many.</sub> | K\_max = hf − φ, f₀ = φ/h, 저지 전압 eV₀ = K\_max. h = 6.63×10⁻³⁴ J·s = 4.14×10⁻¹⁵ eV·s. 예: 나트륨 φ = 2.3 eV, 400 nm(3.1 eV) → 0.8 eV. 광자 운동량 p = h/λ, 콤프턴 산란 Δλ = (h/mc)(1 − cosθ).<br><sub>K\_max = hf − φ, f₀ = φ/h, stopping voltage eV₀ = K\_max. h = 6.63×10⁻³⁴ J·s = 4.14×10⁻¹⁵ eV·s. Sodium (φ = 2.3 eV) under 400 nm light (3.1 eV) gives 0.8 eV electrons. Photon momentum p = h/λ; Compton shift Δλ = (h/mc)(1 − cosθ).</sub> |
| **보어 모형과 물질파**<br><sub>Bohr model and matter waves</sub> | 수소 원자의 전자는 Eₙ = −13.6/n² eV의 준위에만 있고, 준위 사이를 옮길 때 차이만큼 빛을 내거나 흡수해요. 물질도 파장 λ = h/p를 가져요.<br><sub>Hydrogen’s electron sits only on levels Eₙ = −13.6/n² eV, emitting or absorbing the difference as light; matter also has a wavelength λ = h/p.</sub> | hf = E\_i − E\_f. 3→2: 1.89 eV, 656 nm(발머 Hα), 2→1: 10.2 eV(라이먼, 자외선), 이온화 13.6 eV. 궤도 조건 2πr = nλ. rₙ = n²a₀(a₀ = 0.053 nm). 100 V 전자 λ ≈ 0.123 nm → 전자 회절. 불확정성 Δx·Δp ≥ ħ/2.<br><sub>hf = E\_i − E\_f. 3→2: 1.89 eV, 656 nm (Balmer Hα); 2→1: 10.2 eV (Lyman, UV); ionization 13.6 eV. Orbit condition 2πr = nλ; rₙ = n²a₀ with a₀ = 0.053 nm. A 100 V electron has λ ≈ 0.123 nm, enough for electron diffraction. Uncertainty Δx·Δp ≥ ħ/2.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
