# 정보 이론 · Information theory

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/information-theory/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

정보량과 엔트로피, 상호정보량과 KL 발산에서 시작해 허프만·산술 부호화·LZ77·BWT 같은 무손실 압축, 표본화·양자화·DCT·지각 부호화 같은 손실 압축, 그리고 채널 용량과 패리티·해밍·CRC·리드-솔로몬 오류 정정까지. zip과 JPEG, Wi-Fi가 어떻게 동작하는지 그림으로 따라가요.

Information and entropy, mutual information and KL divergence; lossless compression with Huffman, arithmetic coding, LZ77 and the BWT; lossy coding with sampling, quantization, the DCT and perceptual models; then channel capacity and error correction with parity, Hamming, CRC and Reed–Solomon codes. Follow how zip, JPEG and Wi-Fi really work.

**4개 주제 · 25개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [정보와 엔트로피 · Information and entropy](#it-ent) (5)
- [무손실 압축 · Lossless compression](#it-comp) (8)
- [신호와 손실 압축 · Signals and lossy coding](#it-sig) (5)
- [채널과 오류 정정 · Channels and error correction](#it-ch) (7)

<a id="it-ent"></a>

## 정보와 엔트로피 · Information and entropy

정보를 비트로 재는 법과 불확실성의 크기예요.  
*Measuring information in bits and the size of uncertainty.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **정보량과 비트**<br><sub>Information and bits</sub> | 확률이 낮은 사건일수록 일어났을 때 얻는 정보가 커요. 확률 p인 사건의 정보량은 −log₂p 비트예요.<br><sub>Rarer events carry more information: an event of probability p carries −log₂p bits.</sub> | 예: 동전 1비트, 주사위 한 면 log₂6 ≈ 2.58비트, 1024개 중 하나 10비트. n개 중 하나를 고르려면 예/아니오 질문 ⌈log₂n⌉번(이진 탐색). 독립 사건의 정보량은 더해져요.<br><sub>A coin flip is 1 bit, a die face log₂6 ≈ 2.58 bits, one of 1024 options 10 bits. Picking one of n takes ⌈log₂n⌉ yes/no questions (binary search). Information from independent events adds.</sub> |
| **엔트로피**<br><sub>Entropy</sub> | 확률분포의 평균 정보량 H = −Σp log₂p예요. 불확실성의 크기이자 무손실 압축으로 줄일 수 있는 한계예요.<br><sub>The average information of a distribution, H = −Σp log₂p: its uncertainty and the floor for lossless compression.</sub> | 공정한 동전 1비트, p = 0.9면 0.47비트, 확정이면 0. 0 ≤ H ≤ log₂n(균등할 때 최대). 영어 텍스트는 글자당 약 1~1.5비트라 8비트 ASCII는 크게 압축돼요. 결정 트리의 분할 기준으로도 써요.<br><sub>A fair coin has 1 bit, p = 0.9 only 0.47, a certain outcome 0. 0 ≤ H ≤ log₂n, maximized by the uniform distribution. English carries about 1 to 1.5 bits per letter, so 8-bit ASCII compresses well. Decision trees split on it.</sub> |
| **조건부 엔트로피와 상호정보량**<br><sub>Conditional entropy and mutual information</sub> | Y를 알고 난 뒤 남은 X의 불확실성이 H(X\|Y), 줄어든 양이 상호정보량 I(X;Y)예요.<br><sub>H(X\|Y) is the uncertainty about X left after seeing Y; mutual information I(X;Y) is how much it dropped.</sub> | H(X,Y) = H(X) + H(Y\|X), I(X;Y) = H(X) − H(X\|Y) = H(X) + H(Y) − H(X,Y) ≥ 0. 독립이면 I = 0. 결정 트리의 정보 이득, 특징 선택, 통신 채널 분석에 써요.<br><sub>H(X,Y) = H(X) + H(Y\|X); I(X;Y) = H(X) − H(X\|Y) = H(X) + H(Y) − H(X,Y) ≥ 0, zero when independent. Used for decision-tree information gain, feature selection and channel analysis.</sub> |
| **교차 엔트로피와 KL 발산**<br><sub>Cross-entropy and KL divergence</sub> | 실제 분포 P를 모델 Q로 부호화할 때 평균 비트 수가 교차 엔트로피, 엔트로피보다 더 드는 양이 KL 발산이에요.<br><sub>Coding data from P with a model Q costs the cross-entropy; the excess over the entropy is the KL divergence.</sub> | H(P,Q) = −Σp log q, D(P‖Q) = Σp log(p/q) = H(P,Q) − H(P) ≥ 0. 예: P = (½, ¼, ¼), Q = (¼, ¼, ½) → 1.75 − 1.5 = 0.25비트. 비대칭이라 거리가 아니에요. 분류 모델의 손실, VAE, 지식 증류에 써요.<br><sub>H(P,Q) = −Σp log q, D(P‖Q) = Σp log(p/q) = H(P,Q) − H(P) ≥ 0. With P = (½, ¼, ¼) and Q = (¼, ¼, ½): 1.75 − 1.5 = 0.25 bits. It is asymmetric, so not a distance. Used as classifier loss, in VAEs and distillation.</sub> |
| **원천 부호화 정리**<br><sub>Source coding theorem</sub> | 어떤 무손실 부호든 기호당 평균 길이는 엔트로피보다 짧을 수 없고, 기호를 묶어서 부호화하면 엔트로피에 얼마든지 가까워질 수 있어요.<br><sub>No lossless code averages fewer bits per symbol than the entropy, and coding symbols in blocks gets as close as you like.</sub> | 예: p(A) = 0.9인 원천의 엔트로피는 0.469비트. 한 기호씩이면 1비트, 두 개씩 허프만이면 0.645, 세 개씩 0.533. 길이 n 블록이면 H ≤ L < H + 1/n. 산술 부호화는 블록 없이도 이 한계에 다가가요.<br><sub>A source with p(A) = 0.9 has entropy 0.469 bits. One symbol at a time costs 1 bit, Huffman on pairs 0.645, on triples 0.533. With blocks of n, H ≤ L < H + 1/n. Arithmetic coding approaches the bound without blocks.</sub> |

<a id="it-comp"></a>

## 무손실 압축 · Lossless compression

정보를 하나도 잃지 않고 크기를 줄이는 부호화예요.  
*Shrinking data without losing a single bit.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **접두 부호**<br><sub>Prefix codes</sub> | 어떤 부호어도 다른 부호어의 앞부분이 아니면, 구분 기호 없이 왼쪽부터 읽으며 바로 해독할 수 있어요. 이진 트리의 잎이 부호어예요.<br><sub>If no codeword is the start of another, a bit stream decodes left to right with no separators; codewords are leaves of a binary tree.</sub> | 예: A=0, B=10, C=110, D=111 → 0101100111 = A B C A D. 크래프트 부등식 Σ2^(−ℓᵢ) ≤ 1을 만족하면 그런 부호가 존재해요. 허프만·DEFLATE 모두 접두 부호예요.<br><sub>A=0, B=10, C=110, D=111: 0101100111 reads A B C A D. Kraft’s inequality Σ2^(−ℓᵢ) ≤ 1 says when such a code exists. Huffman and DEFLATE codes are prefix codes.</sub> |
| **허프만 부호화**<br><sub>Huffman coding</sub> | 가장 확률이 작은 두 기호를 반복해서 묶어 트리를 만들면, 자주 나오는 기호에 짧은 부호를 주는 최적의 접두 부호가 돼요.<br><sub>Repeatedly merge the two least likely symbols; the resulting tree is the optimal prefix code, giving frequent symbols short codes.</sub> | 예: A .4, B .3, C .2, D .1 → A 0, B 10, C 110, D 111, 평균 1.9비트(엔트로피 1.85, 고정 길이 2). 평균 길이는 H ≤ L < H + 1. 우선순위 큐로 O(n log n). JPEG, DEFLATE(zip, PNG), MP3에 들어가요.<br><sub>A .4, B .3, C .2, D .1 give A 0, B 10, C 110, D 111: 1.9 bits on average versus entropy 1.85 and fixed-length 2. H ≤ L < H + 1. A priority queue builds it in O(n log n). Inside JPEG, DEFLATE (zip, PNG) and MP3.</sub> |
| **산술 부호화**<br><sub>Arithmetic coding</sub> | 메시지 전체를 [0, 1) 안의 구간 하나로 바꿔요. 기호마다 현재 구간을 확률 비율로 나눠 해당 부분을 골라요.<br><sub>Turn the whole message into one sub-interval of [0, 1): each symbol narrows the current interval in proportion to its probability.</sub> | 예: A .6, B .3, C .1에서 "AB" → [0.36, 0.54), 폭 0.18 → 약 2.5비트. 기호당 정수 비트에 묶이지 않아 엔트로피에 거의 도달해요. 범위 부호화(range coding), ANS가 현대식 변형이에요(zstd, JPEG XL).<br><sub>With A .6, B .3, C .1, “AB” becomes [0.36, 0.54), width 0.18, about 2.5 bits. Not tied to whole bits per symbol, it nearly reaches the entropy. Range coding and ANS are modern variants (zstd, JPEG XL).</sub> |
| **런 길이 부호화**<br><sub>Run-length encoding</sub> | 같은 값이 연속으로 나오는 구간을 "개수 + 값"으로 바꿔요. 가장 단순한 무손실 압축이에요.<br><sub>Replace runs of the same value with count + value: the simplest lossless scheme.</sub> | 예: AAAABBBCCD → 4A3B2C1D. 반복이 없으면 오히려 커져요(ABCD → 1A1B1C1D). 팩스, 단색이 많은 이미지(BMP, TIFF), JPEG의 0 계수 압축, 다른 알고리즘의 전처리로 써요.<br><sub>AAAABBBCCD becomes 4A3B2C1D, but ABCD grows to 1A1B1C1D. Used in fax, flat-color images (BMP, TIFF), JPEG’s zero runs and as a preprocessing step.</sub> |
| **LZ77 사전 압축**<br><sub>LZ77 dictionary compression</sub> | 이미 지나온 데이터(슬라이딩 윈도)에서 같은 문자열을 찾아 "거리, 길이" 참조로 바꿔요. 사전을 따로 보내지 않아요.<br><sub>Find repeats in the recently seen data (a sliding window) and replace them with (distance, length) references; no dictionary is sent.</sub> | 예: abcabcabcx → a b c (3, 6) x. 복사 길이가 거리보다 길어도 돼요(자기 겹침). DEFLATE = LZ77 + 허프만(gzip, zip, PNG), LZW는 GIF, LZ4·zstd·brotli도 이 계열이에요.<br><sub>abcabcabcx becomes a b c (3, 6) x; a copy may overlap itself. DEFLATE = LZ77 + Huffman (gzip, zip, PNG); LZW is in GIF; LZ4, zstd and brotli belong to this family.</sub> |
| **버로우즈-휠러 변환**<br><sub>Burrows–Wheeler transform</sub> | 문자열의 모든 회전을 정렬해 마지막 열을 읽으면 같은 글자가 뭉쳐요. 정보는 그대로라 되돌릴 수 있고, 그 뒤의 압축이 훨씬 잘 돼요.<br><sub>Sort every rotation of a string and read the last column: equal letters cluster. Nothing is lost, so it reverses, and the result compresses much better.</sub> | 예: banana$ → annb$aa. 뒤따르는 문맥이 같은 글자끼리 모이기 때문이에요. bzip2 = BWT + MTF(앞으로 옮기기) + 허프만. 접미사 배열로 O(n)에 계산하고, 유전체 정렬 도구의 FM 인덱스(BWA, Bowtie)도 이 변환을 써요.<br><sub>banana$ becomes annb$aa, because characters followed by the same context end up adjacent. bzip2 = BWT + move-to-front + Huffman. Suffix arrays compute it in O(n), and the FM-index inside genome aligners (BWA, Bowtie) is built on it.</sub> |
| **델타 부호화와 가변 길이 정수**<br><sub>Delta encoding and varints</sub> | 비슷한 값이 이어지면 차이만 저장하고, 작은 수는 적은 바이트로 담는 가변 길이 정수로 써요.<br><sub>When values sit close together, store only the differences, and write small numbers in fewer bytes with variable-length integers.</sub> | 예: 1000, 1003, 1004, 1010 → 1000, +3, +1, +6. varint는 바이트마다 7비트를 담고 최상위 비트로 "다음 바이트 있음"을 표시해요: 300 → AC 02. 고정 int32로 16바이트인 값이 5바이트로. Protocol Buffers, SQLite, Git 팩 파일, 검색 엔진 역색인, Parquet 같은 열 지향 포맷에 써요.<br><sub>1000, 1003, 1004, 1010 become 1000, +3, +1, +6. A varint holds 7 bits per byte and uses the top bit for “more bytes follow”: 300 is AC 02. Sixteen bytes of fixed int32 shrink to five. Used by Protocol Buffers, SQLite, Git packfiles, search-engine posting lists and columnar formats like Parquet.</sub> |
| **압축의 한계**<br><sub>Limits of compression</sub> | 모든 입력을 줄이는 무손실 압축은 없어요. n비트 문자열은 2ⁿ개인데 더 짧은 문자열은 2ⁿ − 1개뿐이라 반드시 두 입력이 겹쳐요.<br><sub>No lossless compressor shrinks every input: there are 2ⁿ strings of n bits but only 2ⁿ − 1 shorter ones, so two inputs must collide.</sub> | 압축은 흔한 데이터를 짧게, 드문 데이터를 길게 만드는 맞바꿈이에요. 무작위·암호화 데이터나 이미 압축한 파일(zip, jpg, mp4)은 거의 줄지 않아요. 문자열을 출력하는 가장 짧은 프로그램의 길이를 콜모고로프 복잡도라 하는데, 일반적으로 계산할 수 없어요.<br><sub>Compression trades short codes for likely data against longer codes for unlikely data. Random or encrypted data and already-compressed files (zip, jpg, mp4) barely shrink. The length of the shortest program that prints a string is its Kolmogorov complexity, which is uncomputable in general.</sub> |

<a id="it-sig"></a>

## 신호와 손실 압축 · Signals and lossy coding

연속 신호를 디지털로 바꾸고, 사람이 못 느끼는 정보를 버려 크게 줄여요.  
*Digitizing signals, and shrinking them by dropping what people won’t notice.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **표본화 정리**<br><sub>Sampling theorem</sub> | 연속 신호를 최고 주파수의 2배보다 빠르게 표본화하면 표본만으로 원래 신호를 정확히 복원할 수 있어요.<br><sub>Sample faster than twice the highest frequency and the samples determine the signal exactly.</sub> | fs > 2·f\_max(나이퀴스트 주파수 fs/2). 부족하면 높은 주파수가 낮은 주파수로 둔갑해요(에일리어싱: 영상 속 바퀴가 거꾸로 도는 현상). CD 44.1 kHz는 가청 한계 20 kHz를 위한 값. 표본화 전 저역통과 필터로 막아요.<br><sub>fs > 2·f\_max (Nyquist frequency fs/2). Too slow and high frequencies masquerade as low ones: aliasing, like wagon wheels spinning backwards on film. CD audio uses 44.1 kHz for the 20 kHz hearing limit. An anti-aliasing low-pass filter runs first.</sub> |
| **양자화**<br><sub>Quantization</sub> | 연속적인 값을 정해진 단계 중 가장 가까운 것으로 반올림해요. 그 차이(양자화 오차)는 되돌릴 수 없어요.<br><sub>Round a continuous value to the nearest of a fixed set of levels; the difference, quantization error, is lost for good.</sub> | N비트 = 2ᴺ단계, SQNR ≈ 6.02N + 1.76 dB(1비트마다 +6 dB). CD 16비트 ≈ 98 dB. 손실 압축은 중요한 성분은 촘촘히, 덜 중요한 성분은 거칠게 양자화해요. 신경망 양자화(FP32 → INT8)도 같은 원리.<br><sub>N bits give 2ᴺ levels and SQNR ≈ 6.02N + 1.76 dB, +6 dB per bit; 16-bit CD audio reaches about 98 dB. Lossy codecs quantize important components finely and others coarsely. Neural-network quantization (FP32 → INT8) is the same idea.</sub> |
| **푸리에 급수와 스펙트럼**<br><sub>Fourier series and spectra</sub> | 주기 신호는 여러 주파수 사인파의 합으로 나타낼 수 있어요. 각 주파수 성분의 크기를 모은 것이 스펙트럼이에요.<br><sub>A periodic signal is a sum of sine waves at different frequencies; the sizes of those components form its spectrum.</sub> | 예: 사각파 = (4/π)(sin x + sin 3x/3 + sin 5x/5 + …). 불연속점 근처에는 항을 늘려도 약 9% 튀는 깁스 현상이 남아요. 고속 푸리에 변환(FFT)은 O(n log n). 이퀄라이저, 음성 인식, 이미지 필터, 무선 통신(OFDM)의 기본 도구예요.<br><sub>A square wave is (4/π)(sin x + sin 3x/3 + sin 5x/5 + …). Near the jumps a ~9% overshoot survives any number of terms (the Gibbs phenomenon). The fast Fourier transform runs in O(n log n) and underlies equalizers, speech recognition, image filters and OFDM radio.</sub> |
| **변환 부호화 (DCT)**<br><sub>Transform coding (DCT)</sub> | 신호를 주파수 성분으로 바꾸면 에너지가 소수의 저주파 계수에 몰려요. 작은 고주파 계수를 버리고 나머지만 저장해요.<br><sub>Converting to frequency components packs the energy into a few low-frequency coefficients; drop the small high-frequency ones and keep the rest.</sub> | DCT-II: Xₖ = Σxₙcos(π/N(n + ½)k). JPEG: 8×8 블록 DCT → 양자화 표로 나눔 → 지그재그 순서 + 런 길이 + 허프만. MP3·AAC는 MDCT, 영상(H.264)은 정수 DCT. 압축률이 높으면 블록 경계가 보여요(블로킹).<br><sub>DCT-II: Xₖ = Σxₙcos(π/N(n + ½)k). JPEG: 8×8 block DCT, divide by a quantization table, zigzag, run-length and Huffman. MP3 and AAC use the MDCT, H.264 an integer DCT. Push compression too far and blocks become visible.</sub> |
| **지각 부호화**<br><sub>Perceptual coding</sub> | 사람이 잘 느끼지 못하는 정보부터 버려요. 눈은 색보다 밝기에 민감하고, 귀는 큰 소리 옆의 작은 소리를 잘 듣지 못해요.<br><sub>Throw away what people barely perceive first: eyes care more about brightness than color, and ears miss quiet sounds next to loud ones.</sub> | 크로마 서브샘플링 4:2:0: 밝기(Y)는 픽셀마다, 색(Cb, Cr)은 2×2 블록마다 하나 → 데이터 절반. 오디오 코덱(MP3, AAC)은 심리음향 모델로 가려지는 주파수를 버려요. 같은 체감 품질에서 파일이 훨씬 작아져요.<br><sub>Chroma subsampling 4:2:0 keeps brightness (Y) for every pixel but one color sample (Cb, Cr) per 2×2 block, halving the data. Audio codecs (MP3, AAC) use a psychoacoustic model to drop masked frequencies. Files get far smaller at the same perceived quality.</sub> |

<a id="it-ch"></a>

## 채널과 오류 정정 · Channels and error correction

잡음 속에서도 정확히 전달하기 위해 일부러 덧붙이는 정보예요.  
*Deliberate redundancy that lets data survive noise.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **채널 용량과 섀넌 정리**<br><sub>Channel capacity and Shannon’s theorem</sub> | 잡음 있는 채널에도 넘을 수 없는 최대 전송률(용량)이 있고, 그보다 낮은 속도라면 오류를 원하는 만큼 줄일 수 있는 부호가 존재해요.<br><sub>Every noisy channel has a maximum rate, its capacity; below it, codes exist that make errors as rare as you like.</sub> | 이진 대칭 채널 C = 1 − H(p)(p = 0.11이면 약 0.5). 섀넌-하틀리 C = B log₂(1 + S/N): 3 kHz, 30 dB → 약 30 kbit/s. 5G·Wi-Fi의 LDPC, 터보 부호가 이 한계에 근접해요.<br><sub>Binary symmetric channel C = 1 − H(p), about 0.5 at p = 0.11. Shannon–Hartley C = B log₂(1 + S/N): 3 kHz at 30 dB gives about 30 kbit/s. LDPC and turbo codes in 5G and Wi-Fi come close to the limit.</sub> |
| **패리티 비트**<br><sub>Parity bits</sub> | 1의 개수를 짝수(또는 홀수)로 맞추는 비트 하나를 붙여요. 비트 하나가 뒤집히면 검출해요.<br><sub>One extra bit makes the count of 1s even (or odd), so any single flipped bit is detected.</sub> | 짝수 개의 오류는 못 잡고, 위치를 모르니 고치지 못해요(재전송 필요). 2차원 패리티(행·열)는 1비트 정정 가능. RAID 5는 디스크들의 XOR 패리티로 한 디스크를 복구해요.<br><sub>It misses an even number of errors and can’t locate the flip, so data must be resent. Two-dimensional (row and column) parity corrects one bit. RAID 5 rebuilds a lost disk from XOR parity.</sub> |
| **검사 숫자**<br><sub>Check digits</sub> | 번호 끝에 숫자 하나를 덧붙여 손으로 옮겨 적을 때의 실수를 잡아요. 대표적인 방법이 룬(Luhn) 알고리즘이에요.<br><sub>One extra digit at the end of a number catches mistakes made when copying it by hand; the Luhn algorithm is the best known.</sub> | 룬: 오른쪽부터 한 칸 걸러 2배(10 이상이면 두 자리 합), 모두 더해 10의 배수가 되도록 검사 숫자를 정해요. 예: 7992739871 → 합 67 → 검사 숫자 3. 한 자리 오류는 모두, 이웃 자리 바꿈은 09 ↔ 90만 빼고 잡아요. 카드 번호, IMEI. ISBN-13은 가중치 1·3, ISBN-10은 mod 11을 써요.<br><sub>Luhn: from the right, double every second digit (taking the digit sum if it reaches 10), add everything, and pick the check digit that makes the total a multiple of 10. 7992739871 sums to 67, so its check digit is 3. It catches every single-digit error and every adjacent swap except 09 ↔ 90. Card numbers and IMEI use it; ISBN-13 uses weights 1 and 3, ISBN-10 mod 11.</sub> |
| **해밍 부호**<br><sub>Hamming codes</sub> | 패리티 비트 여러 개가 서로 다른 비트 묶음을 검사하게 하면, 어느 검사가 실패했는지로 오류 위치를 알아내 고칠 수 있어요.<br><sub>Let several parity bits check overlapping groups; which checks fail pinpoints the error so it can be fixed.</sub> | 해밍(7,4): 데이터 4비트 + 패리티 3비트. 신드롬(실패한 검사들)이 오류 위치를 가리켜요. 해밍 거리 d면 ⌊(d − 1)/2⌋개 정정, d − 1개 검출(7,4는 d = 3). SECDED ECC 메모리, 더 강한 리드-솔로몬은 QR 코드·CD·SSD에.<br><sub>Hamming(7,4) adds 3 parity bits to 4 data bits; the syndrome of failed checks names the bad position. With distance d a code corrects ⌊(d − 1)/2⌋ errors and detects d − 1 (here d = 3). SECDED ECC memory; stronger Reed–Solomon codes protect QR codes, CDs and SSDs.</sub> |
| **순환 중복 검사 (CRC)**<br><sub>Cyclic redundancy check</sub> | 데이터를 다항식으로 보고 생성 다항식으로 나눈 나머지를 붙여 보내요. 받는 쪽에서 나눠 0이 아니면 오류예요.<br><sub>Treat data as a polynomial, divide by a generator and append the remainder; a nonzero remainder at the receiver means an error.</sub> | 덧셈 = XOR(자리올림 없음). 예: 11010011101100을 1011로 → 나머지 100. 차수 r이면 r비트 이하 버스트 오류를 모두 검출. 시프트 레지스터로 하드웨어 구현이 쉬워요. 이더넷·Wi-Fi CRC-32, ZIP·PNG. 의도적 변조는 못 막아요(해시·MAC 필요).<br><sub>Arithmetic is XOR with no carries: 11010011101100 divided by 1011 leaves 100. A degree-r generator catches every burst of r bits or fewer, and shift registers make it cheap in hardware. CRC-32 guards Ethernet, Wi-Fi, ZIP and PNG. It offers no protection against deliberate tampering; use a hash or MAC.</sub> |
| **리드-솔로몬 부호**<br><sub>Reed–Solomon codes</sub> | 데이터를 다항식의 값으로 보고 같은 다항식의 값을 여분으로 더 보내요. 도착한 값만으로 다항식을 되살려 잃어버린 값을 복구해요.<br><sub>Treat the data as values of a polynomial and send extra values of the same polynomial; whatever arrives is enough to rebuild it and restore what was lost.</sub> | k개 데이터 + 2t개 여분이면 오류 t개 또는 위치를 아는 소실 2t개를 복구해요. 실제로는 유한체 GF(2⁸)에서 바이트 단위로 계산해요. QR 코드(최대 30% 손상 복구), CD·DVD, RAID 6, 보이저 탐사선, 클라우드 저장소의 이레이저 코딩에 써요.<br><sub>k data symbols plus 2t extra ones correct t errors, or 2t erasures at known positions. Real codes work byte-wise over the finite field GF(2⁸). Used in QR codes (up to 30% damage), CDs and DVDs, RAID 6, the Voyager probes and erasure-coded cloud storage.</sub> |
| **인터리빙**<br><sub>Interleaving</sub> | 여러 부호어의 기호를 번갈아 섞어 보내요. 한꺼번에 터지는 연속 오류가 여러 부호어에 조금씩 흩어져 각각 고칠 수 있게 돼요.<br><sub>Send the symbols of several codewords in alternation, so a burst of errors spreads thinly across them and each stays correctable.</sub> | 예: A, B, C가 각각 오류 1개를 고칠 수 있을 때, 순서대로 보내면 길이 3의 버스트가 한 부호어를 망가뜨리지만 섞어 보내면 하나씩만 맞아요. CD의 CIRC(리드-솔로몬 두 겹 + 인터리빙)는 약 3,500비트 연속 오류를 복구해요. 무선 페이딩, 디스크 긁힘에 대비하는 방법이에요.<br><sub>If codewords A, B and C can each fix one error, a burst of three ruins one codeword when sent in order but hits each once when interleaved. The CD’s CIRC (two Reed–Solomon layers plus interleaving) repairs bursts of about 3,500 bits. It guards against radio fading and disc scratches.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
