# 디지털 논리 · Digital logic

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/digital-logic/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

2진수·16진수, 2의 보수, 부동소수점, 문자 인코딩, 비트 연산, 논리 게이트와 가산기, 멀티플렉서, 플립플롭과 클록까지. CPU를 이루는 가장 작은 부품들이에요.

Binary and hex, two’s complement, floating point, character encodings, bitwise operations, logic gates and adders, multiplexers, flip-flops and clocks: the smallest parts a CPU is built from.

**3개 주제 · 14개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [논리 게이트와 불 대수 · Logic gates and Boolean algebra](#lg-gates) (5)
- [조합 회로 · Combinational circuits](#lg-comb) (5)
- [순차 회로와 기억 · Sequential circuits and memory](#lg-seq) (4)

<a id="lg-gates"></a>

## 논리 게이트와 불 대수 · Logic gates and Boolean algebra

모든 디지털 회로는 0과 1을 다루는 작은 게이트로 만들어져요. 파란 선은 1, 회색 선은 0이에요.  
*Every digital circuit is built from tiny gates on 0s and 1s. Blue wires carry 1, grey wires 0.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **AND · OR · NOT**<br>AND · OR · NOT | AND는 입력이 모두 1일 때, OR는 하나라도 1일 때 1을 내고, NOT은 값을 뒤집어요.<br><sub>AND outputs 1 only if all inputs are 1, OR if any is, and NOT flips the value.</sub> | 코드의 &&, \|\|, ! 과 같아요. 조건문을 단순하게 만들 때 이 규칙을 그대로 써요.<br><sub>They are the same as &&, \|\| and ! in code, and the same rules simplify conditions.</sub> |
| **XOR · NAND · NOR**<br>XOR · NAND · NOR | XOR는 두 입력이 다를 때 1, NAND·NOR는 AND·OR의 결과를 뒤집은 거예요. 진리표로 모든 경우를 정리해요.<br><sub>XOR is 1 when inputs differ; NAND and NOR invert AND and OR. A truth table lists every case.</sub> | XOR는 덧셈의 합, 패리티 검사, 간단한 암호화, 두 값 교환 트릭에 쓰여요.<br><sub>XOR is the sum bit of addition and appears in parity checks, simple ciphers and swap tricks.</sub> |
| **NAND의 완전성**<br>NAND universality | NAND 게이트 하나만 있으면 NOT, AND, OR, 결국 모든 회로를 만들 수 있어요.<br><sub>With NAND alone you can build NOT, AND, OR and therefore any circuit.</sub> | 실제 칩은 만들기 쉬운 NAND·NOR 셀을 많이 써요. "NAND to Tetris" 강의가 바로 이걸로 컴퓨터를 만들어요.<br><sub>Real chips lean on easy-to-make NAND and NOR cells; the “NAND to Tetris” course builds a whole computer this way.</sub> |
| **드모르간 법칙**<br>De Morgan’s laws | NOT(A AND B) = NOT A OR NOT B, NOT(A OR B) = NOT A AND NOT B. 부정이 안으로 들어가면 AND와 OR가 바뀌어요.<br><sub>NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B: pushing a negation inside swaps AND and OR.</sub> | 복잡하게 중첩된 부정 조건문을 읽기 쉽게 바꾸거나, SQL WHERE 조건을 정리할 때 바로 써요.<br><sub>Use it to untangle nested negated conditions in code or SQL WHERE clauses.</sub> |
| **카르노 맵**<br>Karnaugh map | 진리표를 격자로 펼쳐 인접한 1끼리 크게 묶어서 논리식을 가장 간단하게 줄이는 방법이에요.<br><sub>Lay the truth table out as a grid and group adjacent 1s as large as possible to get the simplest expression.</sub> | 게이트 수가 줄면 칩이 작고 빨라져요. 요즘은 합성 도구가 자동으로 하지만 조건 단순화 감각을 기르는 데 좋아요.<br><sub>Fewer gates mean smaller, faster chips. Tools automate it now, but it trains your feel for simplifying conditions.</sub> |

<a id="lg-comb"></a>

## 조합 회로 · Combinational circuits

현재 입력만으로 출력이 정해지는 회로예요.  
*Circuits whose output depends only on the current inputs.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **반가산기**<br>Half adder | 1비트 두 개를 더해 합(XOR)과 올림(AND)을 내요.<br><sub>Adds two single bits, producing a sum (XOR) and a carry (AND).</sub> | 컴퓨터의 모든 산술은 이 작은 회로에서 시작해요.<br><sub>All computer arithmetic grows from this little circuit.</sub> |
| **전가산기**<br>Full adder | 두 비트와 아랫자리에서 올라온 올림까지 세 비트를 더해 합과 올림을 내요. 반가산기 두 개와 OR로 만들어요.<br><sub>Adds two bits plus the carry from the previous column, built from two half adders and an OR.</sub> | 전가산기를 이어 붙이면 몇 비트든 더하는 가산기가 되고, 2의 보수와 합치면 뺄셈도 해요. ALU의 핵심 부품이에요.<br><sub>Chain full adders for any width; with two’s complement they also subtract. It is the heart of the ALU.</sub> |
| **리플 캐리 가산기**<br>Ripple-carry adder | 전가산기를 일렬로 이어 여러 비트를 더해요. 올림이 아랫자리부터 차례로 전달돼서 비트 수만큼 지연돼요.<br><sub>Full adders chained in a row add multi-bit numbers, but the carry ripples through one stage at a time.</sub> | 실제 CPU는 올림을 미리 계산하는 캐리 룩어헤드 가산기로 지연을 줄여요. 회로 깊이가 클럭 속도를 정해요.<br><sub>Real CPUs use carry-lookahead adders to cut the delay; circuit depth limits clock speed.</sub> |
| **멀티플렉서**<br>Multiplexer | 선택 신호에 따라 여러 입력 중 하나를 출력으로 보내는 전자 스위치예요.<br><sub>An electronic switch that forwards one of several inputs, chosen by select lines.</sub> | CPU에서 ALU 입력을 레지스터 중 하나로 고르는 등 데이터 경로 곳곳에 있어요. 코드의 switch문과 같은 역할이에요.<br><sub>It appears throughout CPU datapaths, such as choosing which register feeds the ALU; it is a hardware switch statement.</sub> |
| **디코더**<br>Decoder | n비트 입력을 받아 2ⁿ개의 출력 중 정확히 하나만 켜요.<br><sub>Takes an n-bit input and turns on exactly one of 2ⁿ outputs.</sub> | 메모리 주소로 어느 칩·행을 쓸지 고르고, 명령어의 종류를 해석하는 데 써요.<br><sub>It selects memory chips or rows from an address and decodes instruction types.</sub> |

<a id="lg-seq"></a>

## 순차 회로와 기억 · Sequential circuits and memory

되먹임과 클럭으로 이전 상태를 기억하는 회로예요.  
*Circuits that remember using feedback and a clock.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **SR 래치**<br>SR latch | 두 NOR 게이트의 출력을 서로의 입력으로 되먹이면, 입력을 떼도 값을 유지하는 1비트 기억 장치가 돼요.<br><sub>Cross-feeding two NOR gates creates a one-bit memory that holds its value after the inputs are released.</sub> | 되먹임이 기억을 만들어요. CPU 캐시(SRAM)는 이런 래치 수십억 개로 이뤄져 있어요.<br><sub>Feedback creates memory; CPU caches (SRAM) are billions of such cells.</sub> |
| **D 플립플롭**<br>D flip-flop | 클럭이 올라가는 순간에만 입력 D를 저장하고, 그 외엔 값을 유지해요.<br><sub>Captures input D only at the rising clock edge and holds it otherwise.</sub> | 모든 레지스터와 상태 기계가 클럭에 맞춰 동시에 바뀌게 해 주는 부품이에요. 클럭 속도(GHz)가 바로 이 박자예요.<br><sub>It makes registers and state machines change in lockstep; the clock speed in GHz is this beat.</sub> |
| **카운터**<br>Counter | 플립플롭을 이어 클럭마다 값이 1씩 올라가게 만든 회로예요.<br><sub>Flip-flops chained so the value goes up by one every clock tick.</sub> | 타이머, 프로그램 카운터(PC), 주파수 분주기에 써요. 범위를 넘으면 0으로 돌아가는 것도 정수 오버플로와 같아요.<br><sub>Used for timers, the program counter and frequency dividers; wrapping to zero is the same as integer overflow.</sub> |
| **시프트 레지스터**<br>Shift register | 클럭마다 저장된 비트들을 한 칸씩 옮겨요. 직렬 데이터를 병렬로(또는 반대로) 바꿀 수 있어요.<br><sub>Moves its stored bits one place on every clock, converting serial data to parallel or back.</sub> | USB·SPI 같은 직렬 통신에 써요. 소프트웨어의 비트 시프트(<<, >>)가 2배·절반 연산인 이유도 같아요.<br><sub>Used in serial links like USB and SPI; it is also why software bit shifts (<<, >>) multiply or divide by two.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
