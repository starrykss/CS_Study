# 인공지능·머신러닝 · AI & machine learning

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/ai-ml/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

지도·비지도·강화 학습과 Q-러닝, 선형 회귀와 경사 하강법, 결정 트리와 앙상블, 교차 검증, 과적합과 정규화·드롭아웃, 신경망과 역전파, 활성화 함수와 기울기 소실, CNN, 트랜스포머와 어텐션, 토큰과 임베딩, 벡터 검색과 RAG, 미세 조정과 LoRA, 도구를 쓰는 에이전트, 평가 지표까지 다뤄요.

Supervised, unsupervised and reinforcement learning with Q-learning; linear regression and gradient descent; decision trees and ensembles; cross-validation; overfitting, regularization and dropout; neural networks and backpropagation; activations and vanishing gradients; CNNs; transformers and attention; tokens and embeddings; vector search and RAG; fine-tuning and LoRA; tool-using agents; and evaluation metrics.

**4개 주제 · 30개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [머신러닝 기초 · Machine learning basics](#ai-basics) (9)
- [일반화와 평가 · Generalization and evaluation](#ai-eval) (6)
- [신경망과 딥러닝 · Neural networks and deep learning](#ai-deep) (5)
- [언어 모델과 LLM · Language models and LLMs](#ai-llm) (10)

<a id="ai-basics"></a>

## 머신러닝 기초 · Machine learning basics

데이터로부터 규칙을 배우는 기본 방식과 도구예요.  
*The core ways and tools for learning rules from data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **지도 · 비지도 · 강화 학습**<br><sub>Supervised, unsupervised, reinforcement</sub> | 정답이 있는 예시로 배우면 지도, 정답 없이 구조를 찾으면 비지도, 행동하고 보상을 받으며 배우면 강화 학습이에요.<br><sub>Learning from labelled examples is supervised, finding structure without labels is unsupervised, and learning by acting for rewards is reinforcement learning.</sub> | 대부분의 실무 문제(분류, 예측)는 지도 학습이에요. 라벨이 부족하면 자기지도 학습(LLM 사전학습)도 많이 써요.<br><sub>Most practical problems (classification, prediction) are supervised; when labels are scarce, self-supervised learning (as in LLM pretraining) is common.</sub> |
| **선형 회귀**<br><sub>Linear regression</sub> | 데이터를 가장 잘 설명하는 직선(y = ax + b)을 찾아요. 오차 제곱의 평균(MSE)이 가장 작은 직선이 답이에요.<br><sub>Find the straight line (y = ax + b) that best describes the data: the one with the smallest mean squared error.</sub> | 집값·수요 예측 같은 수치 예측의 기본선(baseline)이에요. 복잡한 모델을 쓰기 전에 꼭 먼저 비교해 보세요.<br><sub>The baseline for numeric predictions like prices and demand; always compare against it before reaching for complex models.</sub> |
| **경사 하강법**<br><sub>Gradient descent</sub> | 손실(오차)이 줄어드는 방향, 즉 기울기의 반대 방향으로 가중치를 조금씩 움직여 최솟값을 찾아요.<br><sub>Repeatedly nudge the weights against the gradient, the direction in which loss falls, until you reach a minimum.</sub> | 딥러닝 학습의 엔진이에요. 실제로는 데이터를 조금씩 나눠(미니배치) 쓰는 SGD, Adam 같은 변형을 써요.<br><sub>The engine of deep learning; in practice, mini-batch variants such as SGD and Adam are used.</sub> |
| **학습률**<br><sub>Learning rate</sub> | 경사 하강법에서 한 번에 움직이는 크기예요. 너무 작으면 느리고, 너무 크면 최솟값을 지나쳐 발산해요.<br><sub>The step size in gradient descent: too small is slow, too large overshoots and diverges.</sub> | 가장 먼저 튜닝하는 하이퍼파라미터예요. 처음엔 크게 시작해 점점 줄이는 스케줄(워밍업·코사인 감소)을 많이 써요.<br><sub>Usually the first hyperparameter to tune; schedules with warm-up and cosine decay are common.</sub> |
| **분류와 결정 경계**<br><sub>Classification and decision boundaries</sub> | 입력이 어느 종류(클래스)인지 예측해요. 모델은 특징 공간을 나누는 경계를 학습하고, 확률도 함께 내요.<br><sub>Predict which class an input belongs to; the model learns a boundary through feature space and outputs probabilities.</sub> | 스팸 필터, 사기 탐지, 이미지 분류가 모두 분류 문제예요. 로지스틱 회귀, 결정 트리, 그래디언트 부스팅(XGBoost)이 실무 단골이에요.<br><sub>Spam filters, fraud detection and image labelling are all classification; logistic regression, decision trees and gradient boosting (XGBoost) are workhorses.</sub> |
| **K-평균 군집화**<br><sub>K-means clustering</sub> | 중심 K개를 정하고, 점을 가장 가까운 중심에 배정한 뒤 중심을 평균으로 옮기는 과정을 반복해 데이터를 묶어요.<br><sub>Pick K centres, assign each point to the nearest one, move centres to the mean, and repeat to form groups.</sub> | 고객 세분화, 문서 묶기, 이미지 색 줄이기에 써요. K는 사람이 정하고(엘보 방법), 시작 위치에 따라 결과가 달라질 수 있어요.<br><sub>Used for customer segments, document grouping and colour reduction; you choose K (e.g. the elbow method) and results depend on the start.</sub> |
| **학습 · 검증 · 테스트 분리**<br><sub>Train, validation and test splits</sub> | 데이터를 학습용, 검증용(설정 고르기), 테스트용(최종 평가)으로 나눠 처음 보는 데이터에 대한 실력을 재요.<br><sub>Split data into training, validation (for choosing settings) and test (for the final grade) to measure performance on unseen data.</sub> | 테스트 데이터가 학습에 섞이는 데이터 누수를 조심하세요. 시간 순서가 있는 데이터는 무작위가 아니라 시간으로 나눠요.<br><sub>Watch for data leakage into training; split time-ordered data by time, not at random.</sub> |
| **결정 트리와 앙상블**<br><sub>Decision trees and ensembles</sub> | “x < 5인가?” 같은 예/아니오 질문을 이어 붙여 데이터를 나누는 모델이에요. 여러 나무를 모으면(앙상블) 훨씬 강해져요.<br><sub>A model that splits data with a chain of yes/no questions such as “x < 5?”; combining many trees (an ensemble) makes it far stronger.</sub> | 각 단계에서 불순도(Gini = 1 − Σp²)가 가장 많이 줄어드는 특성과 임계값으로 공간을 둘로 나누고, 순수해질 때까지 반복해요. 해석하기 쉽지만 너무 깊으면 과적합해요. 랜덤 포레스트는 서로 다른 표본과 특성으로 만든 나무들의 다수결, 그래디언트 부스팅(XGBoost, LightGBM)은 앞 나무들의 오차를 다음 나무가 고쳐 나가요. 표 형태 데이터에선 지금도 딥러닝보다 강한 경우가 많아요.<br><sub>At each step it splits on the feature and threshold that most reduce impurity (Gini = 1 − Σp²), repeating until leaves are pure. Trees are easy to read but overfit when too deep. Random forests take a majority vote over trees built on different samples and features, while gradient boosting (XGBoost, LightGBM) adds trees that fix the previous ones’ errors. On tabular data they still often beat deep learning.</sub> |
| **Q-러닝 (강화 학습)**<br><sub>Q-learning (reinforcement learning)</sub> | 정답 대신 보상을 받으며 시행착오로 “어떤 상태에서 무엇을 할지(정책)”를 배우는 강화 학습의 대표 알고리즘이에요.<br><sub>The classic reinforcement-learning algorithm: learn by trial and error from rewards, rather than labels, which action to take in each state (a policy).</sub> | 격자 세계에서 에이전트는 각 (상태, 행동)의 미래 보상 기대치 Q를 Q ← Q + α[r + γ·max Q(s′) − Q]로 갱신해요. 처음엔 함정에 빠지며 그 행동의 Q가 내려가고, 에피소드가 쌓이면 목표의 보상이 거꾸로 퍼져 목표로 향하는 정책이 생겨요. ε-탐욕으로 탐험과 활용을 섞고, 상태가 많으면 신경망으로 Q를 근사해요(DQN). 알파고, 로봇 제어, LLM의 RLHF가 강화 학습을 써요.<br><sub>In a grid world the agent updates the expected future reward Q of each (state, action) with Q ← Q + α[r + γ·max Q(s′) − Q]. Early on, falling into the pit lowers that action’s Q; over many episodes the goal’s reward propagates back and a policy pointing to the goal emerges. ε-greedy mixes exploration and exploitation, and with many states a neural network approximates Q (DQN). AlphaGo, robot control and RLHF for LLMs all use reinforcement learning.</sub> |

<a id="ai-eval"></a>

## 일반화와 평가 · Generalization and evaluation

처음 보는 데이터에서도 잘 맞히는지 확인하고 측정하는 방법이에요.  
*Checking and measuring how well a model handles unseen data.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **과적합 vs 과소적합**<br><sub>Overfitting vs underfitting</sub> | 너무 단순하면 패턴을 못 잡고(과소적합), 너무 복잡하면 잡음까지 외워 새 데이터에서 틀려요(과적합).<br><sub>Too simple misses the pattern (underfitting); too complex memorizes noise and fails on new data (overfitting).</sub> | 학습 점수만 높고 검증 점수가 낮으면 과적합이에요. 데이터를 늘리거나 모델을 단순하게, 정규화를 강하게 하세요.<br><sub>High training but low validation scores signal overfitting; add data, simplify the model or regularize more.</sub> |
| **학습 곡선과 조기 종료**<br><sub>Learning curves and early stopping</sub> | 에폭마다 학습·검증 손실을 그려 보면 과적합이 시작되는 지점이 보여요. 검증 손실이 가장 낮을 때 학습을 멈춰요.<br><sub>Plotting training and validation loss per epoch shows where overfitting begins; stop when validation loss is lowest.</sub> | 드롭아웃, 가중치 감소(L2), 데이터 증강도 과적합을 줄여요. 학습 곡선은 모든 실험에서 기본으로 확인하세요.<br><sub>Dropout, weight decay (L2) and data augmentation also curb overfitting; always check learning curves.</sub> |
| **혼동 행렬 · 정밀도 · 재현율**<br><sub>Confusion matrix, precision, recall</sub> | 예측과 실제를 2×2 표(TP·FP·FN·TN)로 정리하고, 정밀도(양성 판정의 정확도)와 재현율(실제 양성을 찾은 비율)을 계산해요.<br><sub>Tabulate predictions against reality (TP, FP, FN, TN), then compute precision (how right the positives are) and recall (how many real positives were found).</sub> | 양성이 드문 데이터에선 정확도가 속여요. 둘을 함께 보는 F1 점수와, 클래스별 지표를 확인하세요.<br><sub>Accuracy misleads when positives are rare; look at F1, which balances both, and at per-class metrics.</sub> |
| **임계값과 정밀도-재현율 트레이드오프**<br><sub>Thresholds and the precision–recall trade-off</sub> | 모델 점수를 양성으로 판정하는 기준선(임계값)을 올리면 정밀도가, 내리면 재현율이 올라가요.<br><sub>Raising the score threshold for a positive call boosts precision; lowering it boosts recall.</sub> | 오탐과 미탐 중 무엇이 더 비싼지로 임계값을 정하세요. PR 곡선과 ROC 곡선으로 전체 모양을 비교해요.<br><sub>Pick the threshold by which mistake costs more, false alarms or misses; compare models with PR and ROC curves.</sub> |
| **교차 검증**<br><sub>Cross-validation</sub> | 데이터를 k등분해 돌아가며 한 조각으로 검증하고 나머지로 학습해, 성능을 운에 덜 흔들리게 추정하는 방법이에요.<br><sub>Split the data into k folds and rotate which one is used for validation, giving a performance estimate less swayed by luck.</sub> | 검증 세트를 한 번만 떼면 어떤 데이터가 걸렸는지에 따라 점수가 흔들려요. 5-겹 교차 검증은 다섯 번 돌아가며 0.86, 0.81 … 같은 점수를 얻어 평균 0.84 ± 0.02처럼 보고, 하이퍼파라미터를 고르는 데 써요. 테스트 세트는 따로 떼어 마지막에 한 번만 봐요. 시계열은 섞지 말고 과거로 학습·미래로 검증하고, 정규화나 특성 선택도 학습 폴드 안에서만 해야 정보 누수가 없어요.<br><sub>With a single validation split, the score depends on which examples landed in it. Five-fold cross-validation rotates through five splits, reporting scores like 0.86, 0.81, … as a mean of 0.84 ± 0.02, and guides hyperparameter choice. The test set stays locked away until one final check. Time series must not be shuffled: train on the past and validate on the future, and fit scaling or feature selection inside training folds only to avoid leakage.</sub> |
| **정규화와 드롭아웃**<br><sub>Regularization and dropout</sub> | 모델이 훈련 데이터에 과하게 맞추지 못하도록 복잡도에 벌점을 주는 기법들이에요. L1·L2 벌점, 드롭아웃, 조기 종료가 대표적이에요.<br><sub>Techniques that penalize complexity so a model can’t over-fit its training data: L1/L2 penalties, dropout and early stopping are the staples.</sub> | 벌점이 없으면 모델이 잡음까지 따라가며 출렁여요. 손실에 λ·‖w‖²(L2, 릿지)를 더하면 큰 가중치가 억제돼 곡선이 부드러워지고, λ·‖w‖₁(L1, 라소)은 일부 가중치를 정확히 0으로 만들어 특성 선택 효과가 있어요. 드롭아웃은 학습 단계마다 뉴런 일부를 무작위로 꺼서 특정 뉴런에 기대지 못하게 하고, 추론 때는 모두 켜요. λ 같은 강도는 교차 검증으로 골라요.<br><sub>Without a penalty the model chases noise and wiggles. Adding λ·‖w‖² (L2, ridge) to the loss restrains large weights and smooths the fit, while λ·‖w‖₁ (L1, lasso) drives some weights exactly to zero, selecting features. Dropout randomly switches off some neurons at each training step so none can be relied on, with all of them active at inference. Choose strengths like λ by cross-validation.</sub> |

<a id="ai-deep"></a>

## 신경망과 딥러닝 · Neural networks and deep learning

뉴런을 층층이 쌓아 복잡한 패턴을 학습하는 방법이에요.  
*Stacking layers of neurons to learn complex patterns.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **인공 뉴런 (퍼셉트론)**<br><sub>Artificial neuron</sub> | 입력에 가중치를 곱해 더하고 편향을 더한 뒤 활성화 함수를 통과시켜 출력해요.<br><sub>Multiply inputs by weights, add them up with a bias, and pass the result through an activation function.</sub> | 활성화 함수는 ReLU가 가장 흔하고, 확률이 필요한 마지막 층엔 시그모이드·소프트맥스를 써요. 비선형 함수가 있어야 복잡한 패턴을 표현해요.<br><sub>ReLU is the most common activation, with sigmoid or softmax on output layers that need probabilities; non-linearity is what lets networks model complex patterns.</sub> |
| **신경망과 순전파**<br><sub>Neural networks and the forward pass</sub> | 뉴런을 여러 층으로 연결해 입력층 → 은닉층 → 출력층으로 값을 계산해 나가요.<br><sub>Neurons are wired in layers, and values are computed from the input layer through hidden layers to the output.</sub> | 층이 깊을수록 더 추상적인 특징을 배워요. 표 형식 데이터는 여전히 그래디언트 부스팅이 강한 경우가 많아요.<br><sub>Deeper layers learn more abstract features; on tabular data, gradient boosting often still wins.</sub> |
| **역전파**<br><sub>Backpropagation</sub> | 출력의 오차를 뒤에서부터 연쇄 법칙으로 나눠 각 가중치의 기울기를 구하고, 경사 하강법으로 가중치를 고쳐요.<br><sub>Propagate the output error backwards with the chain rule to get each weight’s gradient, then update weights with gradient descent.</sub> | PyTorch, JAX 같은 프레임워크가 자동 미분으로 대신 계산해요. 기울기가 너무 작아지거나 커지는 문제는 정규화 층·잔차 연결로 막아요.<br><sub>Frameworks like PyTorch and JAX do it with automatic differentiation; normalization layers and residual connections tame vanishing or exploding gradients.</sub> |
| **합성곱 신경망 (CNN)**<br><sub>Convolutional neural networks</sub> | 작은 필터를 이미지 위로 밀며 곱하고 더해, 경계·질감 같은 지역 패턴을 찾는 특징 맵을 만들어요.<br><sub>Slide small filters across an image, multiplying and summing, to build feature maps that detect local patterns such as edges and textures.</sub> | 이미지 분류, 물체 탐지, 의료 영상에 많이 써요. 요즘은 비전 트랜스포머(ViT)와 함께 쓰거나 비교해 골라요.<br><sub>Common in image classification, object detection and medical imaging; today often combined with or compared against vision transformers (ViT).</sub> |
| **활성화 함수와 기울기 소실**<br><sub>Activations and vanishing gradients</sub> | 활성화 함수는 뉴런에 비선형성을 줘요. 그런데 시그모이드처럼 기울기가 작으면, 역전파 때 층을 지날수록 기울기가 사라져 깊은 망이 학습되지 않아요.<br><sub>Activation functions give neurons non-linearity, but with small gradients like the sigmoid’s, backpropagated gradients fade layer by layer and deep networks stop learning.</sub> | 시그모이드의 기울기는 최대 0.25라서 층마다 곱해지면 앞쪽 층에는 거의 0이 도착해요(기울기 소실). ReLU = max(0, z)는 양수에서 기울기 1이라 크기가 유지돼 깊은 망을 학습할 수 있지만, 음수 입력만 받으면 죽은 ReLU가 돼요. 요즘 트랜스포머는 GELU·SiLU를 쓰고, 잔차 연결(x + f(x))이 기울기의 지름길이 되며, LayerNorm과 He 초기화도 함께 써요. 기울기 폭발은 클리핑으로 막아요.<br><sub>The sigmoid’s gradient peaks at 0.25, so multiplied across layers almost nothing reaches the early ones: vanishing gradients. ReLU = max(0, z) has gradient 1 for positive inputs, preserving magnitude so deep nets can train, though units that only see negatives die. Modern transformers use GELU or SiLU, residual connections (x + f(x)) give gradients a shortcut, and LayerNorm and He initialization help; exploding gradients are clipped.</sub> |

<a id="ai-llm"></a>

## 언어 모델과 LLM · Language models and LLMs

글을 숫자로 바꾸고, 문맥을 이해하고, 다음 말을 만들어 내는 방법이에요.  
*Turning text into numbers, modelling context, and generating what comes next.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **토큰화**<br><sub>Tokenization</sub> | 글을 모델이 다루는 작은 조각(토큰)으로 자르고 각 조각에 번호를 붙여요.<br><sub>Split text into small pieces (tokens) the model works with, and give each piece an ID.</sub> | 컨텍스트 창, API 요금, 응답 속도 모두 토큰 수로 계산돼요. 한국어는 같은 내용에 토큰이 더 드는 편이에요.<br><sub>Context windows, API pricing and speed are all measured in tokens; some languages need more tokens for the same content.</sub> |
| **임베딩**<br><sub>Embeddings</sub> | 단어나 문장을 의미를 담은 숫자 벡터로 바꿔요. 뜻이 비슷하면 벡터 공간에서 가까워요.<br><sub>Turn words or sentences into vectors of numbers that capture meaning; similar meanings land close together.</sub> | 의미 검색, 추천, 중복 탐지, 분류의 입력으로 써요. 같은 임베딩 모델로 만든 벡터끼리만 비교할 수 있어요.<br><sub>Used for semantic search, recommendations, duplicate detection and as classifier inputs; only compare vectors from the same embedding model.</sub> |
| **어텐션**<br><sub>Attention</sub> | 각 토큰이 다른 모든 토큰과의 관련도를 계산하고, 그 비율만큼 정보를 섞어 문맥을 반영한 표현을 만들어요.<br><sub>Each token scores its relevance to every other token and blends their information by those weights, producing a context-aware representation.</sub> | 트랜스포머의 핵심이에요. 계산량이 문장 길이의 제곱으로 늘어서 긴 컨텍스트에선 효율화 기법(FlashAttention 등)을 써요.<br><sub>The heart of the transformer; cost grows with the square of sequence length, so long contexts rely on optimizations like FlashAttention.</sub> |
| **트랜스포머**<br><sub>Transformer</sub> | 임베딩 위에 어텐션과 피드포워드 층으로 된 블록을 수십 층 쌓고, 마지막에 다음 토큰의 확률을 내요.<br><sub>Stack dozens of blocks of attention and feed-forward layers on top of embeddings, ending in a probability for each next token.</sub> | 현재 LLM, 번역, 음성 인식, 이미지 모델 대부분의 기본 구조예요. 2017년 논문 "Attention Is All You Need"에서 나왔어요.<br><sub>The backbone of today’s LLMs, translation, speech recognition and many image models, introduced in the 2017 paper “Attention Is All You Need”.</sub> |
| **다음 토큰 예측과 온도**<br><sub>Next-token prediction and temperature</sub> | LLM은 지금까지의 글을 보고 다음 토큰의 확률을 계산해 하나를 뽑고, 붙이고, 다시 예측하기를 반복해요.<br><sub>An LLM scores every possible next token, samples one, appends it and repeats.</sub> | 온도가 낮으면 일관되고, 높으면 다양하지만 엉뚱해져요. 코드·사실 답변은 낮게, 아이디어 내기는 높게 써요.<br><sub>Low temperature gives consistent output, high temperature varied but riskier output; use low for code and facts, higher for brainstorming.</sub> |
| **벡터 검색**<br><sub>Vector search</sub> | 문서를 임베딩 벡터로 저장해 두고, 질문 벡터와 가장 가까운 문서를 찾아요. 단어가 달라도 뜻으로 찾아요.<br><sub>Store documents as embedding vectors and find the ones closest to the question’s vector, matching meaning rather than exact words.</sub> | pgvector, FAISS, Pinecone 같은 도구가 근사 최근접 탐색(HNSW)으로 빠르게 찾아요. 키워드 검색(BM25)과 섞는 하이브리드 검색이 실무에서 강해요.<br><sub>Tools like pgvector, FAISS and Pinecone use approximate nearest-neighbour indexes (HNSW); hybrid search mixing in keyword search (BM25) works well in practice.</sub> |
| **RAG (검색 증강 생성)**<br><sub>RAG (retrieval-augmented generation)</sub> | 질문과 관련된 문서를 검색해 프롬프트에 함께 넣고, LLM이 그 문서에 근거해 답하게 해요.<br><sub>Retrieve documents relevant to the question, put them in the prompt, and have the LLM answer from them.</sub> | 재학습 없이 최신·사내 지식을 쓸 수 있고 출처를 보여 줄 수 있어요. 품질은 문서 쪼개기(청킹)와 검색 정확도에 크게 좌우돼요.<br><sub>Brings in fresh or private knowledge without retraining and enables citations; quality depends heavily on chunking and retrieval accuracy.</sub> |
| **LLM 학습 단계**<br><sub>How LLMs are trained</sub> | 방대한 글로 다음 토큰 예측을 배우는 사전학습, 지시를 따르게 하는 미세조정, 더 나은 답을 고르는 선호 학습을 거쳐요.<br><sub>Pretraining on vast text to predict the next token, instruction tuning to follow requests, and preference tuning to favour better answers.</sub> | 사전학습이 비용의 대부분이에요. 회사에서는 보통 처음부터 학습하지 않고 프롬프트, RAG, 미세조정 순서로 검토해요.<br><sub>Pretraining is most of the cost; companies usually try prompting, then RAG, then fine-tuning rather than training from scratch.</sub> |
| **미세 조정과 LoRA**<br><sub>Fine-tuning and LoRA</sub> | 사전 학습된 큰 모델을 내 작업에 맞게 추가 학습하는 게 미세 조정이에요. LoRA는 원래 가중치는 얼리고 작은 저랭크 행렬 두 개만 학습해 비용을 크게 줄여요.<br><sub>Fine-tuning further trains a pretrained model for your task; LoRA freezes the original weights and trains just two small low-rank matrices, slashing the cost.</sub> | 4096 × 4096 가중치 행렬 하나를 통째로 갱신하면 파라미터가 1,677만 개지만, LoRA는 W를 고정하고 ΔW = B·A(4096 × 8, 8 × 4096)만 학습해 65,536개(0.4%)면 돼요. 출력은 W·x + B·A·x이고, 추론 때는 ΔW를 W에 합쳐 속도 손해가 없어요. 작업마다 작은 어댑터만 바꿔 끼우고, QLoRA는 W를 4비트로 양자화해 더 아껴요. 새로운 지식은 RAG, 말투·형식은 미세 조정이 잘 맞아요.<br><sub>Updating a single 4096 × 4096 weight matrix means 16.7 million parameters, but LoRA freezes W and learns only ΔW = B·A (4096 × 8 and 8 × 4096): 65,536 parameters, 0.4%. The output is W·x + B·A·x, and at inference ΔW merges into W at no speed cost. Small adapters are swapped per task, and QLoRA saves more by quantizing W to 4 bits. New knowledge suits RAG; tone and format suit fine-tuning.</sub> |
| **LLM 에이전트와 도구 사용**<br><sub>LLM agents and tool use</sub> | LLM이 필요한 도구를 골라 호출하고, 결과를 보고 다음 행동을 정하는 일을 반복해 여러 단계의 작업을 해내는 구조예요.<br><sub>A setup where an LLM picks and calls tools, reads the results and decides the next action, repeating to complete multi-step tasks.</sub> | “서울 날씨 어때? 우산 챙길까?”라는 질문에 모델은 weather({"city": "Seoul"}) 같은 구조화된 호출(JSON)을 내고, 런타임이 실제로 실행해 {"rain\_prob": 0.8}을 돌려주면 그걸 읽고 답해요. 생각 → 호출 → 관찰을 끝날 때까지 반복해요. 도구 결과는 데이터일 뿐이라 그 안의 “지시”를 따르면 프롬프트 인젝션이 되니, 권한을 최소화하고 위험한 행동은 사람 승인을 받고, 단계 수를 제한하고 모든 호출을 기록해요.<br><sub>Asked “weather in Seoul? should I take an umbrella?”, the model emits a structured call (JSON) such as weather({"city": "Seoul"}); the runtime executes it and returns {"rain\_prob": 0.8}, which the model reads to answer. Think → call → observe repeats until done. Tool output is only data, and obeying “instructions” inside it is prompt injection, so keep privileges minimal, require human approval for risky actions, cap the number of steps and log every call.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
