# 선형대수학 · Linear algebra

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/linear-algebra/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

연립방정식과 가우스 소거법, 역행렬과 LU 분해에서 시작해 행렬식, 벡터 공간과 기저·차원, 선형변환, 고윳값과 대각화, 내적과 직교 사영·최소제곱, 이차형식과 특이값 분해까지. 공식마다 풀이 예제를 붙이고, 격자가 실제로 변하는 모습을 보여줘요.

From linear systems, Gaussian elimination, inverses and LU through determinants, vector spaces, bases and dimension, linear maps, eigenvalues and diagonalization, inner products, projections and least squares, to quadratic forms and the SVD. Each formula comes with a worked example, and you watch the grid actually transform.

**7개 주제 · 36개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [연립방정식과 행렬 · Linear systems and matrices](#la-eq) (7)
- [행렬식 · Determinants](#la-dt) (4)
- [벡터 공간 · Vector spaces](#la-vs) (8)
- [선형변환 · Linear transformations](#la-tr) (4)
- [고윳값과 고유벡터 · Eigenvalues and eigenvectors](#la-ev) (6)
- [내적과 직교성 · Inner products and orthogonality](#la-or) (5)
- [이차형식과 특이값 분해 · Quadratic forms and SVD](#la-qf) (2)

<a id="la-eq"></a>

## 연립방정식과 행렬 · Linear systems and matrices

소거법으로 방정식을 풀고, 그 과정을 행렬로 기록해요.  
*Solve systems by elimination and record the steps as matrices.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **연립일차방정식과 해**<br><sub>Linear systems and solutions</sub> | Ax = b 꼴의 연립일차방정식이에요. 변수가 두 개면 직선 두 개의 교점을 찾는 문제이고, 해는 0개·1개·무수히 많음 중 하나예요.<br><sub>A system Ax = b. With two unknowns it is two lines meeting; there are always 0, 1 or infinitely many solutions.</sub> | 해가 있을 조건: rank A = rank [A \| b]. 해가 하나뿐이려면 여기에 rank A = 변수 개수. 예: x + y = 4, x − y = 0 → (2, 2) 하나 · x + y = 4, x + y = 2 → 해 없음 · x + y = 4, 2x + 2y = 8 → 무수히 많음. 동차계 Ax = 0은 항상 x = 0을 해로 가져요.<br><sub>Consistent iff rank A = rank [A \| b]; unique iff in addition rank A equals the number of unknowns. x + y = 4, x − y = 0 → one solution (2, 2); x + y = 4, x + y = 2 → none; x + y = 4, 2x + 2y = 8 → infinitely many. A homogeneous system Ax = 0 always has x = 0.</sub> |
| **가우스 소거법**<br><sub>Gaussian elimination</sub> | 첨가행렬 [A \| b]에 기본 행 연산(교환, 상수배, 다른 행의 배수 더하기)을 해서 행사다리꼴로 만든 뒤 아래에서부터 대입해요.<br><sub>Apply elementary row operations (swap, scale, add a multiple of another row) to [A \| b] until it is in echelon form, then back-substitute.</sub> | 예: x + y + z = 6, 2x + y − z = 1, x − y + 2z = 5 → R₂ − 2R₁, R₃ − R₁, R₃ − 2R₂ → 7z = 21 → (x, y, z) = (1, 2, 3). 행 연산은 해를 바꾸지 않아요. 계산량은 약 ⅔n³번이에요.<br><sub>x + y + z = 6, 2x + y − z = 1, x − y + 2z = 5: R₂ − 2R₁, R₃ − R₁, R₃ − 2R₂ give 7z = 21, so (x, y, z) = (1, 2, 3). Row operations never change the solution set. Cost is about ⅔n³ operations.</sub> |
| **기약 행사다리꼴과 자유변수**<br><sub>Reduced echelon form and free variables</sub> | 각 행의 첫 0 아닌 성분(피벗)이 1이고 피벗 열의 나머지가 모두 0인 꼴(RREF)이에요. 피벗이 없는 열의 변수는 자유변수가 돼요.<br><sub>Every pivot is 1 and is the only nonzero entry in its column. Variables in columns without a pivot are free.</sub> | 예: [1 2 0 1 \| 3; 0 0 1 2 \| 1] → x₂ = s, x₄ = t로 두면 x = (3, 0, 1, 0) + s(−2, 1, 0, 0) + t(−1, 0, −2, 1). 일반해 = 특수해 + 동차해(영공간). RREF는 행렬마다 하나로 정해져요.<br><sub>[1 2 0 1 \| 3; 0 0 1 2 \| 1] with x₂ = s, x₄ = t gives x = (3, 0, 1, 0) + s(−2, 1, 0, 0) + t(−1, 0, −2, 1). General solution = particular solution + null space. Each matrix has exactly one RREF.</sub> |
| **행렬 곱셈**<br><sub>Matrix multiplication</sub> | AB의 (i, j) 성분은 A의 i행과 B의 j열의 내적이에요. (m×n)(n×p) = m×p로, 가운데 크기가 같아야 곱할 수 있어요.<br><sub>Entry (i, j) of AB is the dot product of row i of A with column j of B. (m×n)(n×p) = m×p, so the inner sizes must match.</sub> | 예: [1 2 0; −1 3 1]·[2 1; 0 −1; 4 2] = [2 −1; 2 −2]. 결합법칙 (AB)C = A(BC)와 분배법칙은 성립하지만 AB ≠ BA가 보통이고, AB = 0이어도 A, B가 0이 아닐 수 있어요. AB의 각 열 = A × (B의 열).<br><sub>[1 2 0; −1 3 1]·[2 1; 0 −1; 4 2] = [2 −1; 2 −2]. Associative and distributive, but usually AB ≠ BA, and AB = 0 is possible with A, B nonzero. Each column of AB is A times a column of B.</sub> |
| **역행렬**<br><sub>Inverse matrix</sub> | AA⁻¹ = A⁻¹A = I인 행렬이에요. [A \| I]에 가우스-조던 소거를 해서 [I \| A⁻¹]을 얻어요. det A ≠ 0일 때만 있어요.<br><sub>The matrix with AA⁻¹ = A⁻¹A = I. Row-reduce [A \| I] to [I \| A⁻¹]; it exists only when det A ≠ 0.</sub> | 2×2: [a b; c d]⁻¹ = 1/(ad − bc)·[d −b; −c a]. 예: [2 1; 5 3]⁻¹ = [3 −1; −5 2]. 성질: (AB)⁻¹ = B⁻¹A⁻¹, (Aᵀ)⁻¹ = (A⁻¹)ᵀ. 가역행렬 정리: 가역 ⟺ det ≠ 0 ⟺ rank n ⟺ Ax = 0의 해가 0뿐 ⟺ 0이 고윳값이 아님.<br><sub>2×2: [a b; c d]⁻¹ = 1/(ad − bc)·[d −b; −c a]; e.g. [2 1; 5 3]⁻¹ = [3 −1; −5 2]. (AB)⁻¹ = B⁻¹A⁻¹ and (Aᵀ)⁻¹ = (A⁻¹)ᵀ. Invertible ⟺ det ≠ 0 ⟺ rank n ⟺ Ax = 0 has only x = 0 ⟺ 0 is not an eigenvalue.</sub> |
| **LU 분해**<br><sub>LU factorization</sub> | 소거 과정을 기록해 A = LU로 나눠요. U는 소거 결과인 위삼각행렬, L은 소거에 쓴 배수를 담은 아래삼각행렬이에요.<br><sub>Record elimination as A = LU: U is the upper-triangular result and L, lower triangular, stores the multipliers used.</sub> | 예: [2 1 1; 4 3 3; 8 7 9] = [1 0 0; 2 1 0; 4 3 1]·[2 1 1; 0 1 1; 0 0 2]. Ax = b는 Ly = b(전진 대입), Ux = y(후진 대입)로 풀어요. b만 바뀌는 문제를 여러 번 풀 때 빨라요. 기본행렬 E를 곱하는 것 = 행 연산 하나.<br><sub>[2 1 1; 4 3 3; 8 7 9] = [1 0 0; 2 1 0; 4 3 1]·[2 1 1; 0 1 1; 0 0 2]. Solve Ax = b by Ly = b (forward) then Ux = y (back). Fast when b changes but A does not. Multiplying by an elementary matrix E is one row operation.</sub> |
| **전치와 대칭행렬**<br><sub>Transpose and symmetric matrices</sub> | Aᵀ는 행과 열을 바꾼 행렬로, 주대각선을 기준으로 뒤집은 모양이에요. Aᵀ = A이면 대칭행렬이에요.<br><sub>Aᵀ swaps rows and columns, mirroring A across its main diagonal. If Aᵀ = A, A is symmetric.</sub> | (Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ, (AB)ᵀ = BᵀAᵀ(순서 반대). AᵀA와 AAᵀ는 항상 대칭이에요. 내적은 x·y = xᵀy로 쓸 수 있어요. Aᵀ = −A이면 반대칭(대각 성분 0).<br><sub>(Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ and (AB)ᵀ = BᵀAᵀ (order reversed). AᵀA and AAᵀ are always symmetric. The dot product is x·y = xᵀy. Aᵀ = −A means skew-symmetric (zero diagonal).</sub> |

<a id="la-dt"></a>

## 행렬식 · Determinants

정사각행렬을 숫자 하나로 요약해요. 넓이·부피가 몇 배가 되는지예요.  
*One number per square matrix: how much it scales area or volume.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **행렬식의 의미**<br><sub>What a determinant means</sub> | det A는 A가 넓이(3차원이면 부피)를 몇 배로 만드는지예요. 음수면 방향이 뒤집히고, 0이면 한 차원이 찌그러져 역행렬이 없어요.<br><sub>det A is the factor by which A scales area (volume in 3D). Negative means orientation flips; zero means a dimension collapses and A has no inverse.</sub> | 2×2: det [a b; c d] = ad − bc. 예: [3 1; 1 2] → 5배, [1 2; 2 1] → −3(뒤집힘), [1 ½; 2 1] → 0. 두 벡터가 만드는 평행사변형 넓이 = \|det [u v]\|, 세 벡터의 평행육면체 부피 = \|det [u v w]\|.<br><sub>2×2: det [a b; c d] = ad − bc. [3 1; 1 2] scales by 5, [1 2; 2 1] by −3 (flipped), [1 ½; 2 1] by 0. The parallelogram spanned by u, v has area \|det [u v]\|; three vectors give volume \|det [u v w]\|.</sub> |
| **여인수 전개**<br><sub>Cofactor expansion</sub> | 한 행(또는 열)을 따라 성분 × 여인수를 더해 행렬식을 구해요. 여인수 Cᵢⱼ = (−1)ⁱ⁺ʲ × (i행과 j열을 지운 소행렬식)이에요.<br><sub>Sum entry × cofactor along any row or column. The cofactor Cᵢⱼ = (−1)ⁱ⁺ʲ times the minor left after deleting row i and column j.</sub> | 예: det [1 2 3; 0 1 4; 5 6 0] = 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = 1. 0이 많은 행·열을 고르면 계산이 줄어요. 3×3은 사루스 법칙도 가능하고, 삼각행렬은 대각 성분의 곱이에요.<br><sub>det [1 2 3; 0 1 4; 5 6 0] = 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = 1. Expand along the row or column with the most zeros. For 3×3, Sarrus’ rule also works; a triangular matrix’s determinant is the product of its diagonal.</sub> |
| **행렬식의 성질**<br><sub>Properties of determinants</sub> | 행 교환은 부호를 바꾸고, 한 행을 k배하면 행렬식도 k배, 한 행의 배수를 다른 행에 더하면 그대로예요. 그래서 소거로 삼각행렬을 만들어 계산할 수 있어요.<br><sub>Swapping rows flips the sign, scaling a row by k scales det by k, and adding a multiple of one row to another changes nothing, so elimination to triangular form computes it.</sub> | det(AB) = det A·det B, det Aᵀ = det A, det A⁻¹ = 1/det A, det(kA) = kⁿ det A (n×n). 두 행이 같거나 한 행이 0이면 det = 0. 주의: det(A + B) ≠ det A + det B.<br><sub>det(AB) = det A·det B, det Aᵀ = det A, det A⁻¹ = 1/det A, det(kA) = kⁿ det A for n×n. Two equal rows or a zero row give det = 0. Beware: det(A + B) ≠ det A + det B.</sub> |
| **크래머 공식과 수반행렬**<br><sub>Cramer’s rule and the adjugate</sub> | det A ≠ 0이면 xᵢ = det Aᵢ / det A로 해를 바로 써요. Aᵢ는 A의 i번째 열을 b로 바꾼 행렬이에요.<br><sub>If det A ≠ 0, each unknown is xᵢ = det Aᵢ / det A, where Aᵢ is A with column i replaced by b.</sub> | 예: 2x + y = 5, x + 3y = 5 → det A = 5, det A₁ = 10, det A₂ = 5 → (x, y) = (2, 1). 역행렬 공식 A⁻¹ = adj A / det A (adj A = 여인수 행렬의 전치). 이론에는 좋지만 큰 n에서는 소거법이 훨씬 빨라요.<br><sub>2x + y = 5, x + 3y = 5: det A = 5, det A₁ = 10, det A₂ = 5, so (x, y) = (2, 1). Likewise A⁻¹ = adj A / det A, with adj A the transposed cofactor matrix. Elegant in theory; elimination is far faster for large n.</sub> |

<a id="la-vs"></a>

## 벡터 공간 · Vector spaces

일차결합, 독립, 기저와 차원, 그리고 행렬이 만드는 부분공간이에요.  
*Linear combinations, independence, bases and dimension, and the subspaces a matrix creates.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **벡터와 일차결합**<br><sub>Vectors and linear combinations</sub> | 벡터에 스칼라를 곱해 더한 c₁v₁ + c₂v₂ + … + cₖvₖ가 일차결합이에요. 화살표를 꼬리에 머리를 이어 붙이는 것과 같아요.<br><sub>Scale vectors and add them: c₁v₁ + … + cₖvₖ. Geometrically, chain the arrows head to tail.</sub> | 예: u = (2, 1), w = (−1, 1)이면 u + 2w = (0, 3). 반대로 "b가 일차결합인가?"는 [u w]c = b를 푸는 문제예요. Ax는 A의 열들의 일차결합이에요: Ax = x₁a₁ + … + xₙaₙ.<br><sub>With u = (2, 1) and w = (−1, 1), u + 2w = (0, 3). Asking whether b is a combination means solving [u w]c = b. Ax is a combination of A’s columns: Ax = x₁a₁ + … + xₙaₙ.</sub> |
| **생성 (span)**<br><sub>Span</sub> | 벡터들의 모든 일차결합의 집합이에요. 벡터 하나는 직선, 평행하지 않은 두 개는 평면을 생성해요.<br><sub>The set of all linear combinations. One vector spans a line; two non-parallel vectors span a plane.</sub> | 평행한 벡터를 더해도 span은 커지지 않아요. R³에서 세 벡터가 공간 전체를 생성 ⟺ det [v₁ v₂ v₃] ≠ 0. span은 항상 원점을 지나는 부분공간이에요. Ax = b가 모든 b에 대해 풀림 ⟺ A의 열이 Rᵐ을 생성.<br><sub>Adding a parallel vector does not enlarge the span. Three vectors span R³ iff det [v₁ v₂ v₃] ≠ 0. A span is always a subspace through the origin. Ax = b is solvable for every b iff A’s columns span Rᵐ.</sub> |
| **일차독립과 종속**<br><sub>Linear independence</sub> | c₁v₁ + … + cₖvₖ = 0을 만드는 방법이 모든 cᵢ = 0뿐이면 일차독립, 아니면 종속이에요. 종속이면 어떤 벡터가 나머지의 일차결합이에요.<br><sub>Independent if c₁v₁ + … + cₖvₖ = 0 forces every cᵢ = 0; otherwise dependent, and some vector is a combination of the others.</sub> | 판정: [v₁ … vₖ]c = 0을 소거 → 자유변수가 없으면 독립. 정사각이면 det ≠ 0 ⟺ 독립. 예: (1, 0), (1, 2), (3, 4)는 v₁ + 2v₂ − v₃ = 0이라 종속. Rⁿ에서 n개보다 많은 벡터는 항상 종속이고, 0벡터가 있어도 종속이에요.<br><sub>Row-reduce [v₁ … vₖ]c = 0: no free variables means independent; for square matrices, det ≠ 0. (1, 0), (1, 2), (3, 4) are dependent since v₁ + 2v₂ − v₃ = 0. More than n vectors in Rⁿ, or any set containing 0, is dependent.</sub> |
| **벡터 공간과 부분공간**<br><sub>Vector spaces and subspaces</sub> | 덧셈과 스칼라배가 정의되고 8가지 공리를 만족하는 집합이 벡터 공간이에요. 그 안에서 0을 포함하고 덧셈·스칼라배에 닫힌 부분집합이 부분공간이에요.<br><sub>A set with addition and scalar multiplication obeying eight axioms is a vector space; a subset containing 0 and closed under both operations is a subspace.</sub> | R²의 부분공간: {0}, 원점을 지나는 직선, R² 전체. y = x/2 + 2처럼 원점을 안 지나면 아니에요. 다항식 공간 Pₙ, 행렬 공간 Mₘₓₙ, 연속함수 공간도 벡터 공간이에요. Ax = 0의 해집합은 부분공간, Ax = b(b ≠ 0)는 아니에요.<br><sub>Subspaces of R²: {0}, lines through the origin, and R² itself; y = x/2 + 2 is not one. Polynomials Pₙ, matrices Mₘₓₙ and continuous functions are vector spaces too. Solutions of Ax = 0 form a subspace; solutions of Ax = b with b ≠ 0 do not.</sub> |
| **기저, 차원, 좌표**<br><sub>Basis, dimension and coordinates</sub> | 공간을 생성하면서 일차독립인 벡터 집합이 기저예요. 기저 벡터의 개수가 차원이고, 기저에 대한 계수가 좌표예요.<br><sub>An independent set that spans the space is a basis; the number of vectors is the dimension, and the coefficients are coordinates.</sub> | 예: B = {(2, 1), (1, 2)}에서 v = (4, 5) = 1·b₁ + 2·b₂ → [v]\_B = (1, 2). 좌표변환: v = P\_B[v]\_B, P\_B = [b₁ b₂]. dim Rⁿ = n, dim Pₙ = n + 1, dim Mₘₓₙ = mn. n차원에서 독립인 벡터 n개는 자동으로 기저예요.<br><sub>With B = {(2, 1), (1, 2)}, v = (4, 5) = 1·b₁ + 2·b₂, so [v]\_B = (1, 2). Change of coordinates: v = P\_B[v]\_B with P\_B = [b₁ b₂]. dim Rⁿ = n, dim Pₙ = n + 1, dim Mₘₓₙ = mn. Any n independent vectors in an n-dimensional space form a basis.</sub> |
| **영공간과 열공간**<br><sub>Null space and column space</sub> | 영공간 Nul A는 Ax = 0의 해 전체, 열공간 Col A는 A의 열들이 생성하는 공간(= 가능한 모든 Ax)이에요.<br><sub>Nul A is every solution of Ax = 0; Col A is the span of A’s columns, i.e. every possible Ax.</sub> | 예: A = [1 2; 2 4] → Col A = span{(1, 2)}, Nul A = span{(−2, 1)}. Ax = b는 b ∈ Col A일 때만 풀려요. 기저 구하기: Col A는 원래 A의 피벗 열, Nul A는 RREF에서 자유변수마다 벡터 하나, 행공간 Row A는 RREF의 0이 아닌 행.<br><sub>A = [1 2; 2 4]: Col A = span{(1, 2)}, Nul A = span{(−2, 1)}. Ax = b is solvable iff b ∈ Col A. Bases: pivot columns of the original A for Col A; one vector per free variable for Nul A; nonzero rows of the RREF for Row A.</sub> |
| **계수와 차원 정리**<br><sub>Rank and the rank–nullity theorem</sub> | rank A = 피벗 개수 = dim Col A = dim Row A예요. 열 개수 n = rank + nullity(영공간의 차원)가 항상 성립해요.<br><sub>rank A = number of pivots = dim Col A = dim Row A, and the number of columns n = rank + nullity (dimension of the null space).</sub> | 예: 3×5 RREF에 피벗 3개 → rank 3, nullity 2, 3 + 2 = 5. rank A = rank Aᵀ. rank(AB) ≤ min(rank A, rank B). n×n에서 rank = n ⟺ 가역. 선형변환으로 쓰면 dim V = dim ker T + dim Im T예요.<br><sub>A 3×5 RREF with 3 pivots has rank 3 and nullity 2: 3 + 2 = 5. rank A = rank Aᵀ; rank(AB) ≤ min(rank A, rank B); an n×n matrix is invertible iff its rank is n. For maps: dim V = dim ker T + dim Im T.</sub> |
| **네 가지 기본 부분공간**<br><sub>The four fundamental subspaces</sub> | m×n 행렬 A는 Rⁿ에 행공간과 영공간, Rᵐ에 열공간과 좌영공간을 만들어요. 같은 공간 안의 두 부분공간은 서로 직교해요.<br><sub>An m×n matrix creates the row space and null space in Rⁿ and the column space and left null space in Rᵐ; the pairs in the same space are orthogonal.</sub> | 차원: 행공간 r, 영공간 n − r, 열공간 r, 좌영공간 m − r. Row A ⟂ Nul A, Col A ⟂ Nul Aᵀ. 모든 x = xᵣ + xₙ로 나뉘고 Ax = Axᵣ. A는 행공간과 열공간을 일대일로 이어요. 사영·최소제곱의 기본 그림이에요.<br><sub>Dimensions r, n − r, r and m − r. Row A ⟂ Nul A and Col A ⟂ Nul Aᵀ. Every x splits as xᵣ + xₙ with Ax = Axᵣ, and A maps the row space one-to-one onto the column space. The big picture behind projections and least squares.</sub> |

<a id="la-tr"></a>

## 선형변환 · Linear transformations

행렬은 평면과 공간을 옮기는 함수예요.  
*A matrix is a function that moves the plane or space.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **선형변환과 표준행렬**<br><sub>Linear maps and their matrices</sub> | T(u + v) = T(u) + T(v), T(cv) = cT(v)를 만족하는 변환이에요. Rⁿ → Rᵐ 선형변환은 모두 행렬 곱 T(x) = Ax로 쓸 수 있어요.<br><sub>A map with T(u + v) = T(u) + T(v) and T(cv) = cT(v). Every linear map Rⁿ → Rᵐ is multiplication by a matrix, T(x) = Ax.</sub> | 표준행렬의 열 = 표준기저의 상: A = [T(e₁) … T(eₙ)]. 예: T(e₁) = (2, 1), T(e₂) = (1, 1)이면 A = [2 1; 1 1], T(1, 2) = (4, 3). 원점은 고정되고 직선은 직선으로, 평행한 격자는 평행·등간격으로 옮겨져요.<br><sub>The columns of the standard matrix are the images of the basis vectors: A = [T(e₁) … T(eₙ)]. With T(e₁) = (2, 1), T(e₂) = (1, 1), A = [2 1; 1 1] and T(1, 2) = (4, 3). The origin stays put; lines stay lines and the grid stays parallel and evenly spaced.</sub> |
| **회전·반사·전단·투영**<br><sub>Rotation, reflection, shear, projection</sub> | 평면의 대표적인 선형변환을 행렬로 나타내요. 열 두 개만 보면 î와 ĵ가 어디로 가는지 바로 알 수 있어요.<br><sub>The standard linear maps of the plane as matrices; the two columns tell you where î and ĵ land.</sub> | 회전 R(θ) = [cos θ −sin θ; sin θ cos θ], x축 반사 [1 0; 0 −1], y = x 반사 [0 1; 1 0], 전단 [1 k; 0 1], x축 투영 [1 0; 0 0], 확대 [k 0; 0 k]. 회전 det = 1, 반사 det = −1, 투영 det = 0(역행렬 없음).<br><sub>Rotation R(θ) = [cos θ −sin θ; sin θ cos θ]; reflection in the x-axis [1 0; 0 −1], in y = x [0 1; 1 0]; shear [1 k; 0 1]; projection onto the x-axis [1 0; 0 0]; scaling [k 0; 0 k]. Rotations have det 1, reflections −1, projections 0 (not invertible).</sub> |
| **합성과 행렬 곱의 순서**<br><sub>Composition and order</sub> | 변환을 차례로 적용하면 행렬을 곱한 것과 같아요. B 다음 A를 적용하면 AB이고, 오른쪽 행렬이 먼저 작용해요.<br><sub>Applying maps in turn multiplies their matrices: B then A is AB, and the rightmost matrix acts first.</sub> | 예: 회전 R = [0 −1; 1 0], 전단 S = [1 1; 0 1] → SR = [1 −1; 1 0], RS = [0 −1; 1 1]로 결과가 달라요. (AB)⁻¹ = B⁻¹A⁻¹(양말 신고 신발 신은 걸 벗듯 역순). 회전끼리는 R(α)R(β) = R(α + β)라 순서와 무관해요.<br><sub>Rotation R = [0 −1; 1 0] and shear S = [1 1; 0 1]: SR = [1 −1; 1 0] but RS = [0 −1; 1 1]. (AB)⁻¹ = B⁻¹A⁻¹ (undo in reverse, like shoes and socks). Rotations commute: R(α)R(β) = R(α + β).</sub> |
| **핵과 상, 단사와 전사**<br><sub>Kernel, image, one-to-one and onto</sub> | 핵 ker T는 0으로 가는 벡터 전체, 상 Im T는 실제로 도달하는 벡터 전체예요. 행렬이면 각각 영공간과 열공간이에요.<br><sub>The kernel is everything sent to 0; the image is everything actually reached. For a matrix these are the null space and column space.</sub> | 차원 정리 dim V = dim ker T + dim Im T. 단사 ⟺ ker T = {0} ⟺ A의 열이 독립. 전사 ⟺ Im T = W ⟺ A의 열이 Rᵐ 생성. 둘 다면 동형사상(역변환 존재). 차원이 같은 공간끼리는 단사 ⟺ 전사.<br><sub>dim V = dim ker T + dim Im T. One-to-one ⟺ ker T = {0} ⟺ independent columns; onto ⟺ Im T = W ⟺ columns span Rᵐ; both means an isomorphism with an inverse. Between spaces of equal dimension, one-to-one ⟺ onto.</sub> |

<a id="la-ev"></a>

## 고윳값과 고유벡터 · Eigenvalues and eigenvectors

변환해도 방향이 그대로인 벡터와, 그것으로 행렬을 단순하게 만드는 법이에요.  
*Vectors that keep their direction, and how they simplify a matrix.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **고윳값과 고유벡터**<br><sub>Eigenvalues and eigenvectors</sub> | Av = λv를 만족하는 0이 아닌 벡터 v가 고유벡터, λ가 고윳값이에요. 변환 후에도 같은 직선 위에 남고 길이만 λ배가 돼요.<br><sub>A nonzero v with Av = λv is an eigenvector with eigenvalue λ: after the map it stays on its own line, just scaled by λ.</sub> | 예: A = [2 1; 1 2] → (1, 1)은 3배, (1, −1)은 그대로(λ = 1). 고윳값 0 ⟺ 비가역. 삼각행렬의 고윳값 = 대각 성분. Aᵏ의 고윳값 = λᵏ, A⁻¹의 고윳값 = 1/λ. 같은 λ의 고유벡터와 0을 모으면 고유공간이에요.<br><sub>A = [2 1; 1 2] triples (1, 1) and leaves (1, −1) unchanged (λ = 1). λ = 0 ⟺ A is singular. Triangular matrices have their diagonal as eigenvalues. Aᵏ has eigenvalues λᵏ and A⁻¹ has 1/λ. Eigenvectors for one λ plus 0 form its eigenspace.</sub> |
| **특성방정식**<br><sub>Characteristic equation</sub> | Av = λv ⟺ (A − λI)v = 0에 0 아닌 해가 있음 ⟺ det(A − λI) = 0이에요. 이 다항식의 근이 고윳값이에요.<br><sub>Av = λv has a nonzero solution exactly when det(A − λI) = 0; the roots of this polynomial are the eigenvalues.</sub> | 예: A = [2 1; 1 2] → (2 − λ)² − 1 = λ² − 4λ + 3 = 0 → λ = 1, 3. λ = 3: (A − 3I)v = 0 → v = (1, 1). 2×2는 λ² − (tr A)λ + det A = 0. 고윳값의 합 = tr A, 곱 = det A. 대수적 중복도 ≥ 기하적 중복도.<br><sub>A = [2 1; 1 2]: (2 − λ)² − 1 = λ² − 4λ + 3 = 0 gives λ = 1, 3; for λ = 3, (A − 3I)v = 0 gives v = (1, 1). For 2×2, λ² − (tr A)λ + det A = 0. The eigenvalues sum to tr A and multiply to det A. Algebraic multiplicity ≥ geometric multiplicity.</sub> |
| **대각화**<br><sub>Diagonalization</sub> | 고유벡터를 열로 모은 P와 고윳값을 대각에 둔 D로 A = PDP⁻¹이라 써요. 고유벡터 좌표계에서 보면 A는 축 방향으로 늘이기만 해요.<br><sub>Put eigenvectors in P and eigenvalues on the diagonal of D: A = PDP⁻¹. In eigenvector coordinates A just stretches along the axes.</sub> | 조건: 일차독립인 고유벡터 n개(서로 다른 고윳값 n개면 충분). 활용: Aᵏ = PDᵏP⁻¹. 예: A = [2 1; 1 2] = P diag(3, 1) P⁻¹, P = [1 −1; 1 1] → A¹⁰ = P diag(3¹⁰, 1) P⁻¹. B = P⁻¹AP이면 A와 B는 닮음(고윳값·행렬식·대각합이 같음).<br><sub>Needs n independent eigenvectors (n distinct eigenvalues suffice). Then Aᵏ = PDᵏP⁻¹: A = [2 1; 1 2] = P diag(3, 1) P⁻¹ with P = [1 −1; 1 1], so A¹⁰ = P diag(3¹⁰, 1) P⁻¹. A and B = P⁻¹AP are similar: same eigenvalues, determinant and trace.</sub> |
| **거듭제곱과 마르코프 연쇄**<br><sub>Powers and Markov chains</sub> | 확률 벡터에 전이행렬을 반복해서 곱하면 고윳값 1의 고유벡터(정상상태)로 수렴해요. 나머지 고윳값의 크기가 수렴 속도를 정해요.<br><sub>Multiplying a probability vector by a transition matrix again and again converges to the eigenvector for λ = 1, the steady state; the other eigenvalues set the speed.</sub> | 예: M = [0.9 0.2; 0.1 0.8], x₀ = (0, 1) → x₁ = (0.2, 0.8) → … → (2/3, 1/3). 고윳값이 1, 0.7이라 오차가 0.7ᵏ로 줄어요. 정상상태는 (M − I)q = 0을 풀고 성분 합을 1로 맞춰요. 웹페이지 순위(PageRank)도 같은 원리예요.<br><sub>M = [0.9 0.2; 0.1 0.8], x₀ = (0, 1): x₁ = (0.2, 0.8), …, → (2/3, 1/3). With λ = 1 and 0.7 the error shrinks like 0.7ᵏ. Solve (M − I)q = 0 and scale q to sum to 1. PageRank works the same way.</sub> |
| **대칭행렬과 직교대각화**<br><sub>Symmetric matrices and the spectral theorem</sub> | 실대칭행렬은 고윳값이 모두 실수이고, 서로 다른 고윳값의 고유벡터가 직교해요. 그래서 직교행렬 Q로 A = QΛQᵀ처럼 대각화돼요.<br><sub>A real symmetric matrix has real eigenvalues and orthogonal eigenvectors for distinct eigenvalues, so it diagonalizes with an orthogonal matrix: A = QΛQᵀ.</sub> | 예: A = [3 1; 1 3] → λ = 4, 2, 고유벡터 (1, 1), (1, −1)이 수직. 단위원은 축이 고유벡터 방향인 타원이 돼요. 스펙트럼 분해 A = λ₁q₁q₁ᵀ + λ₂q₂q₂ᵀ. 공분산 행렬, 이차형식, PCA의 바탕이에요.<br><sub>A = [3 1; 1 3] has λ = 4, 2 with perpendicular eigenvectors (1, 1) and (1, −1); the unit circle becomes an ellipse with those axes. Spectral decomposition: A = λ₁q₁q₁ᵀ + λ₂q₂q₂ᵀ. The basis of covariance matrices, quadratic forms and PCA.</sub> |
| **복소 고윳값**<br><sub>Complex eigenvalues</sub> | 실행렬의 고윳값이 a ± bi로 나오면 실수 고유벡터가 없어요. 이 행렬은 회전과 확대·축소를 합친 변환이에요.<br><sub>When a real matrix has eigenvalues a ± bi there is no real eigenvector; the map rotates and scales at once.</sub> | [a −b; b a] = r[cos θ −sin θ; sin θ cos θ], r = √(a² + b²) = \|λ\|, θ = arg λ. 예: [0.9 −0.3; 0.3 0.9] → λ = 0.9 ± 0.3i, \|λ\| ≈ 0.95라 18.4°씩 돌며 안쪽으로 감겨요. \|λ\| > 1이면 바깥으로 발산, \|λ\| = 1이면 원을 그려요.<br><sub>[a −b; b a] = r[cos θ −sin θ; sin θ cos θ] with r = √(a² + b²) = \|λ\| and θ = arg λ. [0.9 −0.3; 0.3 0.9] has λ = 0.9 ± 0.3i and \|λ\| ≈ 0.95, so points spiral inward 18.4° per step; \|λ\| > 1 spirals outward and \|λ\| = 1 circles.</sub> |

<a id="la-or"></a>

## 내적과 직교성 · Inner products and orthogonality

길이와 각도, 사영, 정규직교기저, 최소제곱법이에요.  
*Length and angle, projections, orthonormal bases and least squares.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **내적, 길이, 각도**<br><sub>Dot product, length and angle</sub> | a·b = a₁b₁ + … + aₙbₙ = \|a\|\|b\|cos θ예요. 길이는 \|a\| = √(a·a)이고, 내적이 0이면 두 벡터는 직교해요.<br><sub>a·b = a₁b₁ + … + aₙbₙ = \|a\|\|b\|cos θ. Length is \|a\| = √(a·a), and a zero dot product means the vectors are orthogonal.</sub> | 예: a = (3, 4), b = (4, 0) → a·b = 12, \|a\| = 5, \|b\| = 4, cos θ = 0.6. 코시-슈바르츠 \|a·b\| ≤ \|a\|\|b\|, 삼각부등식 \|a + b\| ≤ \|a\| + \|b\|. 단위벡터 a/\|a\|. 일반 내적공간에서는 ⟨f, g⟩ = ∫fg dx 같은 내적도 써요.<br><sub>a = (3, 4), b = (4, 0): a·b = 12, \|a\| = 5, \|b\| = 4, cos θ = 0.6. Cauchy–Schwarz \|a·b\| ≤ \|a\|\|b\|; triangle inequality \|a + b\| ≤ \|a\| + \|b\|; unit vector a/\|a\|. General inner product spaces use products like ⟨f, g⟩ = ∫fg dx.</sub> |
| **직교 사영**<br><sub>Orthogonal projection</sub> | b를 직선(부분공간) 위의 가장 가까운 점 p로 내려요. 오차 e = b − p가 그 공간에 수직이 되는 점이 p예요.<br><sub>Drop b to the nearest point p on a line or subspace; p is where the error e = b − p is perpendicular to that space.</sub> | 직선: p = (b·u / u·u)u, 사영행렬 P = uuᵀ/uᵀu. 예: u = (2, 1), b = (2, 4) → p = (3.2, 1.6), e = (−1.2, 2.4) ⟂ u. 부분공간 Col A: p = A(AᵀA)⁻¹Aᵀb. 정규직교기저면 p = (b·q₁)q₁ + … . P² = P, Pᵀ = P.<br><sub>Onto a line: p = (b·u / u·u)u with P = uuᵀ/uᵀu; u = (2, 1), b = (2, 4) give p = (3.2, 1.6) and e = (−1.2, 2.4) ⟂ u. Onto Col A: p = A(AᵀA)⁻¹Aᵀb; with an orthonormal basis, p = (b·q₁)q₁ + … . P² = P and Pᵀ = P.</sub> |
| **그람-슈미트와 QR 분해**<br><sub>Gram–Schmidt and QR</sub> | 독립인 벡터들에서 앞 벡터 방향 성분을 차례로 빼고 길이를 1로 맞춰 정규직교기저를 만들어요. 이 과정을 행렬로 쓴 것이 A = QR이에요.<br><sub>From independent vectors, subtract the components along earlier ones and normalize, giving an orthonormal basis; recorded as A = QR.</sub> | u₁ = v₁, u₂ = v₂ − (v₂·u₁ / u₁·u₁)u₁, … 후 eᵢ = uᵢ/\|uᵢ\|. 예: v₁ = (3, 1), v₂ = (2, 2) → u₂ = (−0.4, 1.2). Q = [e₁ e₂](QᵀQ = I), R = QᵀA는 위삼각행렬. 최소제곱은 Rx̂ = Qᵀb로 안정적으로 풀어요.<br><sub>u₁ = v₁, u₂ = v₂ − (v₂·u₁ / u₁·u₁)u₁, …, then eᵢ = uᵢ/\|uᵢ\|. v₁ = (3, 1), v₂ = (2, 2) give u₂ = (−0.4, 1.2). Q = [e₁ e₂] with QᵀQ = I, and R = QᵀA is upper triangular. Least squares becomes the stable Rx̂ = Qᵀb.</sub> |
| **최소제곱법**<br><sub>Least squares</sub> | Ax = b의 해가 없을 때 \|Ax − b\|²을 최소로 하는 x̂를 구해요. 정규방정식 AᵀAx̂ = Aᵀb를 풀면 돼요.<br><sub>When Ax = b has no solution, find x̂ minimizing \|Ax − b\|² by solving the normal equations AᵀAx̂ = Aᵀb.</sub> | 예: 점 (0, 1), (1, 2), (2, 2), (3, 4)에 y = c₀ + c₁x 맞추기 → AᵀA = [4 6; 6 14], Aᵀb = (9, 18) → y = 0.9 + 0.9x(오차² 합 0.7). 기하적으로 Ax̂는 b를 Col A에 사영한 점이고 잔차는 Col A에 수직이에요. 선형회귀의 원리예요.<br><sub>Fitting y = c₀ + c₁x to (0, 1), (1, 2), (2, 2), (3, 4): AᵀA = [4 6; 6 14], Aᵀb = (9, 18), so y = 0.9 + 0.9x with squared error 0.7. Geometrically Ax̂ is the projection of b onto Col A and the residual is perpendicular to it. This is linear regression.</sub> |
| **직교행렬**<br><sub>Orthogonal matrices</sub> | 열벡터들이 정규직교인 정사각행렬이에요. QᵀQ = I라서 Q⁻¹ = Qᵀ이고, 길이와 각도를 그대로 지켜요.<br><sub>A square matrix with orthonormal columns: QᵀQ = I, so Q⁻¹ = Qᵀ, and it preserves lengths and angles.</sub> | \|Qx\| = \|x\|, Qx·Qy = x·y, det Q = ±1(회전 +1, 반사 −1). 예: R(30°), y = x 반사 [0 1; 1 0]. 전단 [1 1; 0 1]은 직교행렬이 아니라 원을 타원으로 바꿔요. 직교행렬끼리의 곱도 직교행렬이고, 수치 계산에서 오차를 키우지 않아요.<br><sub>\|Qx\| = \|x\|, Qx·Qy = x·y and det Q = ±1 (rotations +1, reflections −1): R(30°) and the reflection [0 1; 1 0] qualify; the shear [1 1; 0 1] does not and turns circles into ellipses. Products of orthogonal matrices are orthogonal, and they don’t amplify rounding error.</sub> |

<a id="la-qf"></a>

## 이차형식과 특이값 분해 · Quadratic forms and SVD

대칭행렬이 그리는 곡선과, 모든 행렬을 회전·늘이기·회전으로 쪼개는 법이에요.  
*The curves symmetric matrices draw, and splitting any matrix into rotate, stretch, rotate.*

| 개념 | 설명 | 공식과 예제 · Formula & example |
| --- | --- | --- |
| **이차형식과 양정치**<br><sub>Quadratic forms and definiteness</sub> | Q(x) = xᵀAx(A는 대칭)가 이차형식이에요. 고유벡터 방향(주축)으로 좌표를 바꾸면 교차항이 사라져 λ₁y₁² + λ₂y₂²가 돼요.<br><sub>Q(x) = xᵀAx with A symmetric. Rotating to the eigenvector axes (principal axes) removes the cross term: λ₁y₁² + λ₂y₂².</sub> | 예: 5x² + 4xy + 2y² → A = [5 2; 2 2], λ = 6, 1 → 6y₁² + y₂², 등위선은 타원. x² + 4xy + y²은 λ = 3, −1이라 쌍곡선. 양정치 ⟺ 모든 λ > 0 ⟺ 선행 주소행렬식이 모두 양수(5 > 0, det = 6 > 0). 다변수 극값의 2계 판정과 같은 원리예요.<br><sub>5x² + 4xy + 2y² has A = [5 2; 2 2] with λ = 6, 1, giving 6y₁² + y₂² and elliptical level curves; x² + 4xy + y² has λ = 3, −1 and hyperbolas. Positive definite ⟺ all λ > 0 ⟺ all leading principal minors positive (5 > 0, det = 6 > 0). Same idea as the second-derivative test.</sub> |
| **특이값 분해 (SVD)**<br><sub>Singular value decomposition</sub> | 모든 행렬은 A = UΣVᵀ로, 회전(Vᵀ) → 축 방향 늘이기(Σ) → 회전(U)으로 쪼갤 수 있어요. 단위원은 반지름이 특이값인 타원이 돼요.<br><sub>Every matrix factors as A = UΣVᵀ: rotate (Vᵀ), stretch along the axes (Σ), rotate (U). The unit circle becomes an ellipse whose semi-axes are the singular values.</sub> | σᵢ = √(AᵀA의 고윳값), V의 열 = AᵀA의 고유벡터, uᵢ = Avᵢ/σᵢ. 예: A = [3 0; 4 5] → σ = 3√5, √5. rank = 0 아닌 σ의 개수. 큰 σ k개만 남기면 최선의 rank-k 근사라 이미지 압축, PCA, 추천 시스템에 써요.<br><sub>σᵢ = √(eigenvalues of AᵀA), V’s columns are eigenvectors of AᵀA, and uᵢ = Avᵢ/σᵢ. A = [3 0; 4 5] has σ = 3√5 and √5. Rank = number of nonzero σ. Keeping the k largest gives the best rank-k approximation, used in image compression, PCA and recommenders.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
