# DevOps·클라우드 · DevOps & cloud

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/devops-cloud/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

Git 브랜치·머지·리베이스, CI/CD 파이프라인, 컨테이너와 VM, 쿠버네티스와 오토스케일링, 블루그린·카나리 배포, 기능 플래그, 인프라 코드, 로그·메트릭·트레이스, SLO와 장애 대응까지 다뤄요.

Git branches, merges and rebases, CI/CD pipelines, containers and VMs, Kubernetes and autoscaling, blue-green and canary releases, feature flags, infrastructure as code, logs, metrics and traces, SLOs and incident response.

**5개 주제 · 23개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [Git과 버전 관리 · Git and version control](#op-git) (5)
- [CI/CD와 인프라 · CI/CD and infrastructure](#op-delivery) (5)
- [컨테이너와 쿠버네티스 · Containers and Kubernetes](#op-k8s-sec) (5)
- [배포 전략 · Release strategies](#op-release) (3)
- [관측성과 운영 · Observability and operations](#op-obs) (5)

<a id="op-git"></a>

## Git과 버전 관리 · Git and version control

변경 이력을 남기고, 갈라서 작업하고, 다시 합치는 방법이에요.  
*Recording history, branching off and merging back.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **커밋과 스테이징**<br>Commits and staging | 고친 파일 중 이번에 묶을 것만 스테이징(add)하고, 그 묶음을 하나의 스냅샷으로 커밋해요.<br><sub>Stage (add) just the changes you want to group, then commit them as one snapshot.</sub> | 한 커밋엔 한 가지 의도만 담으세요. git add -p로 파일 일부만 골라 담을 수 있어요. 메시지는 무엇을, 왜 바꿨는지.<br><sub>Keep one intent per commit; git add -p stages parts of a file. Messages should say what changed and why.</sub> |
| **브랜치와 머지**<br>Branches and merges | 브랜치는 커밋을 가리키는 이름표예요. 따로 작업한 갈래를 머지하면 두 히스토리가 합쳐져요.<br><sub>A branch is a movable label on a commit; merging joins two lines of history.</sub> | main은 항상 배포 가능하게 두고, 작업은 짧게 사는 브랜치에서 하세요. 갈라진 적이 없으면 fast-forward로 이름표만 옮겨요.<br><sub>Keep main always deployable and work on short-lived branches; if main hasn’t moved, git simply fast-forwards.</sub> |
| **리베이스**<br>Rebase | 내 브랜치의 커밋들을 다른 브랜치의 최신 커밋 뒤에 다시 적용해 히스토리를 한 줄로 만들어요.<br><sub>Replays your branch’s commits on top of another branch’s latest commit, producing a straight history.</sub> | 커밋 해시가 바뀌므로 이미 공유한 브랜치에는 쓰지 마세요. 내 로컬 브랜치를 최신 main에 맞출 때 유용해요.<br><sub>It rewrites commit hashes, so never rebase shared branches; great for updating your own branch onto the latest main.</sub> |
| **머지 충돌**<br>Merge conflicts | 두 브랜치가 같은 부분을 다르게 바꾸면 git이 자동으로 합치지 못하고 충돌 표시를 남겨요.<br><sub>When two branches change the same lines differently, git can’t merge automatically and leaves conflict markers.</sub> | 표시(<<<<<<<, =======, >>>>>>>)를 지우고 올바른 결과를 직접 정한 뒤 커밋해요. 자주 머지할수록 충돌이 작아요.<br><sub>Remove the markers, decide the correct result yourself, then commit; merging often keeps conflicts small.</sub> |
| **브랜치 전략**<br>Branching strategies | Git Flow는 main·develop·release 등 오래 사는 브랜치를 역할별로 두고, 트렁크 기반은 main 하나에 짧은 브랜치를 자주 합쳐요.<br><sub>Git Flow keeps long-lived branches per role (main, develop, release); trunk-based development merges short branches into one main frequently.</sub> | 여러 버전을 동시에 유지하는 제품은 Git Flow가, 매일 배포하는 웹 서비스는 트렁크 기반 + 기능 플래그가 잘 맞아요.<br><sub>Products maintaining several versions suit Git Flow; web services deploying daily suit trunk-based plus feature flags.</sub> |

<a id="op-delivery"></a>

## CI/CD와 인프라 · CI/CD and infrastructure

코드를 자동으로 검증하고 안전하게 내보내는 파이프라인이에요.  
*Pipelines that verify code automatically and ship it safely.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **지속적 통합 (CI)**<br>Continuous integration | 푸시할 때마다 빌드·테스트·린트·보안 검사를 자동으로 돌려, 깨진 코드가 main에 들어오지 못하게 해요.<br><sub>Every push runs build, tests, lint and security checks automatically so broken code never reaches main.</sub> | GitHub Actions, GitLab CI, Jenkins가 대표적이에요. 파이프라인은 10분 안쪽으로 빠르게, 실패하면 머지를 막도록 설정하세요.<br><sub>GitHub Actions, GitLab CI and Jenkins are common; keep pipelines under about 10 minutes and make failures block merges.</sub> |
| **지속적 전달·배포 (CD)**<br>Continuous delivery and deployment | 검증된 결과물을 개발 → 스테이징 → 프로덕션으로 옮겨요. 마지막 승인을 사람이 하면 전달, 자동이면 배포예요.<br><sub>Verified artifacts move from dev to staging to production; a human final approval is delivery, fully automatic is deployment.</sub> | 환경마다 다시 빌드하지 말고 같은 이미지를 설정만 바꿔 쓰세요. 배포가 잦을수록 한 번의 위험은 작아져요.<br><sub>Build once and promote the same image with different config; frequent releases make each one less risky.</sub> |
| **코드형 인프라 (IaC)**<br>Infrastructure as code | 서버·네트워크·DB 같은 인프라를 코드로 선언하고, 도구가 실제 상태와 비교해 차이만큼 만들거나 고쳐요.<br><sub>Declare servers, networks and databases in code; the tool compares it with reality and applies just the difference.</sub> | Terraform, Pulumi, CloudFormation이 대표적이에요. 콘솔에서 손으로 바꾸면 코드와 어긋나는 드리프트가 생기니 피하세요.<br><sub>Terraform, Pulumi and CloudFormation are typical; avoid manual console edits, which cause drift from the code.</sub> |
| **기능 플래그**<br>Feature flags | 코드는 배포해 두고, 기능을 켤지 말지와 대상 비율을 설정으로 바꿔요. 배포와 출시를 분리해요.<br><sub>Ship the code dark and toggle who sees a feature through configuration, separating deploy from release.</sub> | 점진 출시, A/B 테스트, 장애 시 킬 스위치로 써요. LaunchDarkly, Unleash 등이 있고, 다 쓴 플래그는 꼭 코드에서 지우세요.<br><sub>Use them for gradual rollouts, A/B tests and kill switches (LaunchDarkly, Unleash); remove stale flags from the code.</sub> |
| **IaaS · PaaS · SaaS**<br>IaaS · PaaS · SaaS | 클라우드가 어디까지 관리해 주는지에 따라 나뉘어요. IaaS는 가상 서버, PaaS는 코드 실행 환경, SaaS는 완성된 서비스예요.<br><sub>Cloud models differ by how much the provider runs: IaaS gives virtual machines, PaaS a place to run code, SaaS finished software.</sub> | 직접 관리할수록 자유도가 높고 운영 부담도 커요. 서버리스(Lambda)는 PaaS보다 한 단계 더 맡기는 형태예요.<br><sub>More control means more operational work; serverless functions (Lambda) hand off even more than PaaS.</sub> |

<a id="op-k8s-sec"></a>

## 컨테이너와 쿠버네티스 · Containers and Kubernetes

어디서나 똑같이 실행되는 패키지와, 그걸 여러 대에서 굴리는 방법이에요.  
*Packages that run the same everywhere, and running them across many machines.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **컨테이너 이미지와 레이어**<br>Container images and layers | Dockerfile의 명령마다 레이어가 쌓여 이미지가 돼요. 바뀌지 않은 레이어는 캐시로 재사용해요.<br><sub>Each Dockerfile instruction adds a layer to the image, and unchanged layers are reused from cache.</sub> | 의존성 설치를 소스 복사보다 먼저 두면 빌드가 빨라요. 작은 베이스 이미지(alpine, distroless)와 멀티 스테이지 빌드로 크기를 줄여요.<br><sub>Install dependencies before copying source for faster builds; slim base images and multi-stage builds cut size.</sub> |
| **쿠버네티스**<br>Kubernetes | 원하는 상태(파드 몇 개, 어떤 이미지)를 선언하면 컨트롤 플레인이 노드에 배치하고, 어긋나면 계속 되돌려요.<br><sub>Declare the desired state (how many pods, which image) and the control plane schedules them and keeps reconciling.</sub> | 파드가 죽거나 노드가 사라져도 자동으로 복구해요. 작은 서비스라면 관리형(EKS, GKE)이나 더 단순한 PaaS도 고려하세요.<br><sub>It heals dead pods and lost nodes automatically; for small services, consider managed clusters (EKS, GKE) or a simpler PaaS.</sub> |
| **오토스케일링**<br>Autoscaling | CPU·요청 수 같은 지표가 목표를 넘으면 파드를 늘리고, 줄면 다시 줄여요(HPA).<br><sub>When a metric such as CPU or request rate exceeds its target, pods are added, and removed again as it drops (HPA).</sub> | 최소·최대 개수를 꼭 정하세요. 너무 자주 오르내리지 않게 안정화 시간을 둬요. 노드가 부족하면 클러스터 오토스케일러가 노드를 추가해요.<br><sub>Always set minimum and maximum counts and a stabilization window; the cluster autoscaler adds nodes when they run out.</sub> |
| **서비스와 인그레스**<br>Services and Ingress | 서비스는 계속 바뀌는 파드들에 고정된 이름과 내부 로드 밸런싱을 주고, 인그레스는 외부 요청을 경로별로 서비스에 나눠 줘요.<br><sub>A Service gives ever-changing pods a stable name and internal load balancing; an Ingress routes outside requests to services by path.</sub> | 서비스끼리는 http://서비스이름 으로 불러요. 인그레스에서 TLS 인증서와 도메인·경로 라우팅을 관리해요.<br><sub>Services call each other by name (http://service-name); TLS certificates and host/path routing live in the Ingress.</sub> |
| **헬스 체크 (프로브)**<br>Health probes | readiness는 트래픽을 받을 준비가 됐는지, liveness는 프로세스가 살아 있는지 확인해요. 실패하면 트래픽을 빼거나 재시작해요.<br><sub>Readiness checks whether a pod can take traffic; liveness checks whether it’s still alive. Failures remove traffic or trigger a restart.</sub> | readiness에 DB 같은 외부 의존을 넣으면 DB 장애 때 전부 빠질 수 있어요. 느린 앱은 startup 프로브로 시작 시간을 따로 줘요.<br><sub>Putting external dependencies like the DB in readiness can pull every pod at once; give slow apps a separate startup probe.</sub> |

<a id="op-release"></a>

## 배포 전략 · Release strategies

새 버전을 사용자에게 안전하게 내보내는 방법이에요.  
*Ways to put a new version in front of users safely.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **롤링 업데이트**<br>Rolling update | 파드를 하나씩 새 버전으로 교체해 중단 없이 배포해요.<br><sub>Replaces pods with the new version one at a time, with no downtime.</sub> | 쿠버네티스 기본 방식이에요. 중간엔 두 버전이 함께 돌아서 API와 DB 스키마가 양쪽과 호환돼야 해요.<br><sub>The Kubernetes default; both versions run together mid-rollout, so APIs and schemas must work with both.</sub> |
| **블루그린 배포**<br>Blue-green deployment | 운영 환경(blue) 옆에 같은 환경(green)을 만들어 새 버전을 올리고, 검증 후 트래픽을 한 번에 전환해요.<br><sub>Run an identical green environment beside live blue, deploy there, verify, then switch all traffic at once.</sub> | 롤백이 라우터 전환 한 번이라 빨라요. 대신 인프라가 두 배 필요하고, DB 마이그레이션은 양쪽과 호환되게 해야 해요.<br><sub>Rollback is one router flip, but you need double infrastructure and backward-compatible database migrations.</sub> |
| **카나리 배포**<br>Canary release | 새 버전에 트래픽 일부(예: 5%)만 보내 지표를 비교하고, 괜찮으면 비율을 점점 늘려요.<br><sub>Send a small share of traffic (say 5%) to the new version, compare metrics, then increase the share step by step.</sub> | 문제가 생겨도 일부 사용자만 영향을 받아요. 비교할 지표(오류율, 지연)를 미리 정하고 자동 롤백을 걸어 두세요(Argo Rollouts, Flagger).<br><sub>Problems only reach a few users; define the metrics (error rate, latency) up front and automate rollback (Argo Rollouts, Flagger).</sub> |

<a id="op-obs"></a>

## 관측성과 운영 · Observability and operations

시스템이 지금 어떤 상태인지 알고, 문제가 생기면 빨리 고치는 방법이에요.  
*Knowing what a system is doing, and fixing it fast when it misbehaves.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **로그 · 메트릭 · 트레이스**<br>Logs, metrics, traces | 로그는 개별 사건 기록, 메트릭은 숫자 추세, 트레이스는 한 요청이 거쳐 간 경로와 시간이에요.<br><sub>Logs record individual events, metrics track numeric trends, and traces show one request’s path and timing.</sub> | 로그는 JSON 같은 구조화된 형식으로 남기세요. 메트릭으로 알림을 걸고, 트레이스로 위치를 찾고, 로그로 원인을 봐요.<br><sub>Write structured (JSON) logs; alert on metrics, locate with traces and explain with logs.</sub> |
| **분산 트레이싱**<br>Distributed tracing | 요청에 trace ID를 붙여 서비스마다 전달하고, 각 구간(span)의 시간을 모아 폭포수 그림으로 보여 줘요.<br><sub>A trace ID travels with each request across services, and the timing of every span is collected into a waterfall view.</sub> | OpenTelemetry로 수집해 Jaeger, Tempo, Datadog 등으로 봐요. trace ID를 로그에도 남기면 바로 이어서 찾을 수 있어요.<br><sub>Collect with OpenTelemetry and view in Jaeger, Tempo or Datadog; logging the trace ID ties logs to traces.</sub> |
| **지연 백분위수 (p50 · p99)**<br>Latency percentiles (p50 · p99) | 응답 시간을 정렬했을 때 50%, 99% 위치의 값이에요. 평균은 느린 꼬리를 가려요.<br><sub>The values at the 50th and 99th positions of sorted response times; averages hide the slow tail.</sub> | 목표와 알림은 p95·p99로 잡아요. 페이지 하나가 요청 수십 개를 부르면 대부분의 사용자가 p99를 겪어요.<br><sub>Set targets and alerts on p95/p99; when a page makes dozens of calls, most users hit the p99.</sub> |
| **SLI · SLO · 에러 예산**<br>SLI, SLO and error budgets | SLI는 사용자 경험을 재는 지표, SLO는 그 목표치, 에러 예산은 목표가 허용하는 실패량이에요.<br><sub>An SLI measures user experience, an SLO is its target, and the error budget is the failure the target allows.</sub> | 예산이 남으면 과감하게 출시하고, 바닥나면 안정화를 우선해요. 99.9%는 한 달에 약 43분, 99.99%는 약 4분이에요.<br><sub>Ship boldly while budget remains and prioritize reliability when it runs out; 99.9% is about 43 minutes a month, 99.99% about 4.</sub> |
| **장애 대응과 회고**<br>Incident response and postmortems | 감지 → 분류·선언 → 완화 → 복구 → 회고 순서로 움직여요. 원인 분석보다 피해를 먼저 멈춰요.<br><sub>Move through detect, triage, mitigate, resolve and review; stop the damage before hunting for root cause.</sub> | 대응 책임자와 소통 채널을 정해 두세요. 회고는 비난 없이(blameless) 시스템과 절차를 고치는 데 집중해요.<br><sub>Name an incident lead and a comms channel up front; run blameless postmortems that fix systems and processes.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
