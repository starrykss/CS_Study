# DevOps·클라우드 · DevOps & cloud

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/devops-cloud/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

Git 브랜치·머지·리베이스와 bisect·되돌리기, CI/CD 파이프라인, GitOps, 12-Factor App, 인프라 코드, 기능 플래그, 컨테이너 이미지와 쿠버네티스, 오토스케일링, 서비스 메시, 블루그린·카나리 배포, 로그·메트릭·트레이스, SLO와 알림 설계, 카오스 엔지니어링, 장애 대응까지 다뤄요.

Git branches, merges, rebases, bisect and undo; CI/CD pipelines, GitOps, the Twelve-Factor App, infrastructure as code and feature flags; container images, Kubernetes, autoscaling and service meshes; blue-green and canary releases; logs, metrics and traces, SLOs and alert design, chaos engineering and incident response.

**5개 주제 · 30개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [Git과 버전 관리 · Git and version control](#op-git) (7)
- [CI/CD와 인프라 · CI/CD and infrastructure](#op-delivery) (7)
- [컨테이너와 쿠버네티스 · Containers and Kubernetes](#op-k8s-sec) (6)
- [배포 전략 · Release strategies](#op-release) (3)
- [관측성과 운영 · Observability and operations](#op-obs) (7)

<a id="op-git"></a>

## Git과 버전 관리 · Git and version control

변경 이력을 남기고, 갈라서 작업하고, 다시 합치는 방법이에요.  
*Recording history, branching off and merging back.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **커밋과 스테이징**<br><sub>Commits and staging</sub> | 고친 파일 중 이번에 묶을 것만 스테이징(add)하고, 그 묶음을 하나의 스냅샷으로 커밋해요.<br><sub>Stage (add) just the changes you want to group, then commit them as one snapshot.</sub> | 한 커밋엔 한 가지 의도만 담으세요. git add -p로 파일 일부만 골라 담을 수 있어요. 메시지는 무엇을, 왜 바꿨는지.<br><sub>Keep one intent per commit; git add -p stages parts of a file. Messages should say what changed and why.</sub> |
| **브랜치와 머지**<br><sub>Branches and merges</sub> | 브랜치는 커밋을 가리키는 이름표예요. 따로 작업한 갈래를 머지하면 두 히스토리가 합쳐져요.<br><sub>A branch is a movable label on a commit; merging joins two lines of history.</sub> | main은 항상 배포 가능하게 두고, 작업은 짧게 사는 브랜치에서 하세요. 갈라진 적이 없으면 fast-forward로 이름표만 옮겨요.<br><sub>Keep main always deployable and work on short-lived branches; if main hasn’t moved, git simply fast-forwards.</sub> |
| **리베이스**<br><sub>Rebase</sub> | 내 브랜치의 커밋들을 다른 브랜치의 최신 커밋 뒤에 다시 적용해 히스토리를 한 줄로 만들어요.<br><sub>Replays your branch’s commits on top of another branch’s latest commit, producing a straight history.</sub> | 커밋 해시가 바뀌므로 이미 공유한 브랜치에는 쓰지 마세요. 내 로컬 브랜치를 최신 main에 맞출 때 유용해요.<br><sub>It rewrites commit hashes, so never rebase shared branches; great for updating your own branch onto the latest main.</sub> |
| **머지 충돌**<br><sub>Merge conflicts</sub> | 두 브랜치가 같은 부분을 다르게 바꾸면 git이 자동으로 합치지 못하고 충돌 표시를 남겨요.<br><sub>When two branches change the same lines differently, git can’t merge automatically and leaves conflict markers.</sub> | 표시(<<<<<<<, =======, >>>>>>>)를 지우고 올바른 결과를 직접 정한 뒤 커밋해요. 자주 머지할수록 충돌이 작아요.<br><sub>Remove the markers, decide the correct result yourself, then commit; merging often keeps conflicts small.</sub> |
| **브랜치 전략**<br><sub>Branching strategies</sub> | Git Flow는 main·develop·release 등 오래 사는 브랜치를 역할별로 두고, 트렁크 기반은 main 하나에 짧은 브랜치를 자주 합쳐요.<br><sub>Git Flow keeps long-lived branches per role (main, develop, release); trunk-based development merges short branches into one main frequently.</sub> | 여러 버전을 동시에 유지하는 제품은 Git Flow가, 매일 배포하는 웹 서비스는 트렁크 기반 + 기능 플래그가 잘 맞아요.<br><sub>Products maintaining several versions suit Git Flow; web services deploying daily suit trunk-based plus feature flags.</sub> |
| **git bisect**<br><sub>git bisect</sub> | 잘 되던 커밋과 망가진 커밋 사이를 이진 탐색해, 버그를 들여온 커밋을 찾아 주는 Git 기능이에요.<br><sub>A Git feature that binary-searches between a known-good and a known-bad commit to find the one that introduced a bug.</sub> | c1은 좋고 c16은 나쁘면 가운데 c8을 시험하고, 결과에 따라 남은 범위를 반씩 좁혀 4번 만에 범인 c11을 찾아요. 커밋 1,000개도 약 10번이면 끝나고(log₂ n), git bisect run에 테스트 스크립트를 주면 완전히 자동으로 돌아요. 작은 커밋을 자주 남겨야 찾아낸 커밋도 작아서 원인이 바로 보여요.<br><sub>With c1 good and c16 bad, test the middle c8 and halve the remaining range on each result, pinning the culprit c11 in four tests. Even 1,000 commits take about 10 tests (log₂ n), and git bisect run with a test script automates the whole search. Small, frequent commits keep the culprit small so the cause is obvious.</sub> |
| **Git에서 되돌리기**<br><sub>Undoing things in Git</sub> | 이미 공유한 커밋은 revert로 “취소 커밋”을 새로 만들고, 내 로컬 커밋은 reset으로 브랜치 포인터를 옮겨요. 실수해도 reflog로 되살려요.<br><sub>Undo shared commits with revert, which adds an undo commit; move a local branch pointer with reset; and recover mistakes with the reflog.</sub> | revert는 D를 취소하는 D′를 추가해 히스토리를 그대로 두므로 공유 브랜치에 안전해요. reset --hard C는 main을 C로 옮겨 D가 사라진 것처럼 보이는데, 이미 푸시했다면 다른 사람의 히스토리와 꼬여요. 실수로 지웠어도 reflog에 HEAD가 지나간 자리가 약 90일간 남아 git reset --hard HEAD@{1}로 복구할 수 있어요. 파일 하나는 git restore, 마지막 커밋 수정은 --amend를 써요.<br><sub>revert adds D′ undoing D while keeping history intact, so it is safe on shared branches. reset --hard C moves main back to C and D seems to vanish, which tangles others’ history if it was already pushed. Even then, the reflog keeps where HEAD has been for about 90 days, so git reset --hard HEAD@{1} brings it back. Use git restore for a single file and --amend for the last commit.</sub> |

<a id="op-delivery"></a>

## CI/CD와 인프라 · CI/CD and infrastructure

코드를 자동으로 검증하고 안전하게 내보내는 파이프라인이에요.  
*Pipelines that verify code automatically and ship it safely.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **지속적 통합 (CI)**<br><sub>Continuous integration</sub> | 푸시할 때마다 빌드·테스트·린트·보안 검사를 자동으로 돌려, 깨진 코드가 main에 들어오지 못하게 해요.<br><sub>Every push runs build, tests, lint and security checks automatically so broken code never reaches main.</sub> | GitHub Actions, GitLab CI, Jenkins가 대표적이에요. 파이프라인은 10분 안쪽으로 빠르게, 실패하면 머지를 막도록 설정하세요.<br><sub>GitHub Actions, GitLab CI and Jenkins are common; keep pipelines under about 10 minutes and make failures block merges.</sub> |
| **지속적 전달·배포 (CD)**<br><sub>Continuous delivery and deployment</sub> | 검증된 결과물을 개발 → 스테이징 → 프로덕션으로 옮겨요. 마지막 승인을 사람이 하면 전달, 자동이면 배포예요.<br><sub>Verified artifacts move from dev to staging to production; a human final approval is delivery, fully automatic is deployment.</sub> | 환경마다 다시 빌드하지 말고 같은 이미지를 설정만 바꿔 쓰세요. 배포가 잦을수록 한 번의 위험은 작아져요.<br><sub>Build once and promote the same image with different config; frequent releases make each one less risky.</sub> |
| **코드형 인프라 (IaC)**<br><sub>Infrastructure as code</sub> | 서버·네트워크·DB 같은 인프라를 코드로 선언하고, 도구가 실제 상태와 비교해 차이만큼 만들거나 고쳐요.<br><sub>Declare servers, networks and databases in code; the tool compares it with reality and applies just the difference.</sub> | Terraform, Pulumi, CloudFormation이 대표적이에요. 콘솔에서 손으로 바꾸면 코드와 어긋나는 드리프트가 생기니 피하세요.<br><sub>Terraform, Pulumi and CloudFormation are typical; avoid manual console edits, which cause drift from the code.</sub> |
| **기능 플래그**<br><sub>Feature flags</sub> | 코드는 배포해 두고, 기능을 켤지 말지와 대상 비율을 설정으로 바꿔요. 배포와 출시를 분리해요.<br><sub>Ship the code dark and toggle who sees a feature through configuration, separating deploy from release.</sub> | 점진 출시, A/B 테스트, 장애 시 킬 스위치로 써요. LaunchDarkly, Unleash 등이 있고, 다 쓴 플래그는 꼭 코드에서 지우세요.<br><sub>Use them for gradual rollouts, A/B tests and kill switches (LaunchDarkly, Unleash); remove stale flags from the code.</sub> |
| **IaaS · PaaS · SaaS**<br><sub>IaaS · PaaS · SaaS</sub> | 클라우드가 어디까지 관리해 주는지에 따라 나뉘어요. IaaS는 가상 서버, PaaS는 코드 실행 환경, SaaS는 완성된 서비스예요.<br><sub>Cloud models differ by how much the provider runs: IaaS gives virtual machines, PaaS a place to run code, SaaS finished software.</sub> | 직접 관리할수록 자유도가 높고 운영 부담도 커요. 서버리스(Lambda)는 PaaS보다 한 단계 더 맡기는 형태예요.<br><sub>More control means more operational work; serverless functions (Lambda) hand off even more than PaaS.</sub> |
| **GitOps**<br><sub>GitOps</sub> | Git에 둔 원하는 상태를 클러스터 안의 컨트롤러가 스스로 당겨 와 맞추는 배포 방식이에요. 모든 변경은 PR로, 롤백은 git revert로 해요.<br><sub>A deployment approach where a controller inside the cluster pulls the desired state from Git and converges to it; changes go through PRs and rollbacks are git reverts.</sub> | 개발자가 replicas를 2에서 3으로 바꾸는 PR을 병합하면, Argo CD 같은 컨트롤러가 Git과 실제 상태를 비교해 파드를 3개로 맞춰요. 누가 kubectl로 손수 5개로 바꿔도 Git 기준으로 되돌리는 자가 치유가 일어나요. CI가 클러스터 권한을 가질 필요가 없고 모든 변경이 Git 이력과 리뷰로 남아요. Argo CD와 Flux가 대표 도구예요.<br><sub>When a developer merges a PR changing replicas from 2 to 3, a controller such as Argo CD diffs Git against the live state and scales to three pods. If someone hand-edits it to five with kubectl, the controller self-heals back to what Git says. CI needs no cluster credentials, and every change stays in Git history and review. Argo CD and Flux are the main tools.</sub> |
| **12-Factor App**<br><sub>The Twelve-Factor App</sub> | 클라우드에서 쉽게 배포·확장·운영할 수 있는 앱을 만들기 위한 12가지 설계 원칙이에요 (Heroku, 2011).<br><sub>Twelve design principles for apps that deploy, scale and operate easily in the cloud (Heroku, 2011).</sub> | 핵심은 빌드(코드 → 이미지)·릴리스(이미지 + 설정)·실행의 분리로, 같은 이미지를 스테이징과 운영에 그대로 올리고 설정만 환경 변수로 바꿔요. DB 주소·비밀번호를 코드에 박지 않고 DATABASE\_URL처럼 주입하며, 백엔드 서비스는 갈아 끼울 수 있는 부착물로 다뤄요. 프로세스는 무상태로 두고 상태는 DB·캐시에, 로그는 stdout으로 흘려보내고, 언제 죽여도 빠르게 다시 뜨게 만들어 컨테이너·쿠버네티스와 잘 맞아요.<br><sub>The heart is separating build (code → image), release (image + config) and run, so one image is promoted to staging and production with only environment variables changing. Database addresses and passwords are injected, e.g. DATABASE\_URL, rather than hard-coded, and backing services are swappable attached resources. Processes stay stateless with state in databases and caches, logs stream to stdout, and instances start and stop fast, a natural fit for containers and Kubernetes.</sub> |

<a id="op-k8s-sec"></a>

## 컨테이너와 쿠버네티스 · Containers and Kubernetes

어디서나 똑같이 실행되는 패키지와, 그걸 여러 대에서 굴리는 방법이에요.  
*Packages that run the same everywhere, and running them across many machines.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **컨테이너 이미지와 레이어**<br><sub>Container images and layers</sub> | Dockerfile의 명령마다 레이어가 쌓여 이미지가 돼요. 바뀌지 않은 레이어는 캐시로 재사용해요.<br><sub>Each Dockerfile instruction adds a layer to the image, and unchanged layers are reused from cache.</sub> | 의존성 설치를 소스 복사보다 먼저 두면 빌드가 빨라요. 작은 베이스 이미지(alpine, distroless)와 멀티 스테이지 빌드로 크기를 줄여요.<br><sub>Install dependencies before copying source for faster builds; slim base images and multi-stage builds cut size.</sub> |
| **쿠버네티스**<br><sub>Kubernetes</sub> | 원하는 상태(파드 몇 개, 어떤 이미지)를 선언하면 컨트롤 플레인이 노드에 배치하고, 어긋나면 계속 되돌려요.<br><sub>Declare the desired state (how many pods, which image) and the control plane schedules them and keeps reconciling.</sub> | 파드가 죽거나 노드가 사라져도 자동으로 복구해요. 작은 서비스라면 관리형(EKS, GKE)이나 더 단순한 PaaS도 고려하세요.<br><sub>It heals dead pods and lost nodes automatically; for small services, consider managed clusters (EKS, GKE) or a simpler PaaS.</sub> |
| **오토스케일링**<br><sub>Autoscaling</sub> | CPU·요청 수 같은 지표가 목표를 넘으면 파드를 늘리고, 줄면 다시 줄여요(HPA).<br><sub>When a metric such as CPU or request rate exceeds its target, pods are added, and removed again as it drops (HPA).</sub> | 최소·최대 개수를 꼭 정하세요. 너무 자주 오르내리지 않게 안정화 시간을 둬요. 노드가 부족하면 클러스터 오토스케일러가 노드를 추가해요.<br><sub>Always set minimum and maximum counts and a stabilization window; the cluster autoscaler adds nodes when they run out.</sub> |
| **서비스와 인그레스**<br><sub>Services and Ingress</sub> | 서비스는 계속 바뀌는 파드들에 고정된 이름과 내부 로드 밸런싱을 주고, 인그레스는 외부 요청을 경로별로 서비스에 나눠 줘요.<br><sub>A Service gives ever-changing pods a stable name and internal load balancing; an Ingress routes outside requests to services by path.</sub> | 서비스끼리는 http://서비스이름 으로 불러요. 인그레스에서 TLS 인증서와 도메인·경로 라우팅을 관리해요.<br><sub>Services call each other by name (http://service-name); TLS certificates and host/path routing live in the Ingress.</sub> |
| **헬스 체크 (프로브)**<br><sub>Health probes</sub> | readiness는 트래픽을 받을 준비가 됐는지, liveness는 프로세스가 살아 있는지 확인해요. 실패하면 트래픽을 빼거나 재시작해요.<br><sub>Readiness checks whether a pod can take traffic; liveness checks whether it’s still alive. Failures remove traffic or trigger a restart.</sub> | readiness에 DB 같은 외부 의존을 넣으면 DB 장애 때 전부 빠질 수 있어요. 느린 앱은 startup 프로브로 시작 시간을 따로 줘요.<br><sub>Putting external dependencies like the DB in readiness can pull every pod at once; give slow apps a separate startup probe.</sub> |
| **서비스 메시**<br><sub>Service mesh</sub> | 서비스 사이 통신에 필요한 보안·신뢰성·관측 기능을 각 파드 옆의 사이드카 프록시로 뽑아내, 앱 코드를 바꾸지 않고 제공하는 인프라 계층이에요.<br><sub>An infrastructure layer that moves inter-service security, reliability and observability into sidecar proxies beside each pod, without changing app code.</sub> | 서비스끼리 직접 호출하면 재시도, TLS, 타임아웃을 언어마다 라이브러리로 다시 구현해야 해요. 서비스 메시는 모든 트래픽이 Envoy 같은 사이드카를 거치게 하고, Istio·Linkerd의 컨트롤 플레인이 mTLS, 재시도·타임아웃, 서킷 브레이커, 90/10 트래픽 분할, 메트릭·트레이스를 설정해요. 대신 홉마다 지연이 늘고 구성 요소가 많아져서, 서비스가 많고 언어가 섞였을 때 효과가 커요. 사이드카 없는 eBPF·ambient 방식도 나왔어요.<br><sub>When services call each other directly, retries, TLS and timeouts get reimplemented per language. A mesh routes all traffic through sidecars such as Envoy, and a control plane like Istio or Linkerd configures mTLS, retries and timeouts, circuit breaking, 90/10 traffic splits and metrics and traces. It adds a little latency per hop and more moving parts, so it pays off with many services in mixed languages; sidecar-less eBPF and ambient modes have also appeared.</sub> |

<a id="op-release"></a>

## 배포 전략 · Release strategies

새 버전을 사용자에게 안전하게 내보내는 방법이에요.  
*Ways to put a new version in front of users safely.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **롤링 업데이트**<br><sub>Rolling update</sub> | 파드를 하나씩 새 버전으로 교체해 중단 없이 배포해요.<br><sub>Replaces pods with the new version one at a time, with no downtime.</sub> | 쿠버네티스 기본 방식이에요. 중간엔 두 버전이 함께 돌아서 API와 DB 스키마가 양쪽과 호환돼야 해요.<br><sub>The Kubernetes default; both versions run together mid-rollout, so APIs and schemas must work with both.</sub> |
| **블루그린 배포**<br><sub>Blue-green deployment</sub> | 운영 환경(blue) 옆에 같은 환경(green)을 만들어 새 버전을 올리고, 검증 후 트래픽을 한 번에 전환해요.<br><sub>Run an identical green environment beside live blue, deploy there, verify, then switch all traffic at once.</sub> | 롤백이 라우터 전환 한 번이라 빨라요. 대신 인프라가 두 배 필요하고, DB 마이그레이션은 양쪽과 호환되게 해야 해요.<br><sub>Rollback is one router flip, but you need double infrastructure and backward-compatible database migrations.</sub> |
| **카나리 배포**<br><sub>Canary release</sub> | 새 버전에 트래픽 일부(예: 5%)만 보내 지표를 비교하고, 괜찮으면 비율을 점점 늘려요.<br><sub>Send a small share of traffic (say 5%) to the new version, compare metrics, then increase the share step by step.</sub> | 문제가 생겨도 일부 사용자만 영향을 받아요. 비교할 지표(오류율, 지연)를 미리 정하고 자동 롤백을 걸어 두세요(Argo Rollouts, Flagger).<br><sub>Problems only reach a few users; define the metrics (error rate, latency) up front and automate rollback (Argo Rollouts, Flagger).</sub> |

<a id="op-obs"></a>

## 관측성과 운영 · Observability and operations

시스템이 지금 어떤 상태인지 알고, 문제가 생기면 빨리 고치는 방법이에요.  
*Knowing what a system is doing, and fixing it fast when it misbehaves.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **로그 · 메트릭 · 트레이스**<br><sub>Logs, metrics, traces</sub> | 로그는 개별 사건 기록, 메트릭은 숫자 추세, 트레이스는 한 요청이 거쳐 간 경로와 시간이에요.<br><sub>Logs record individual events, metrics track numeric trends, and traces show one request’s path and timing.</sub> | 로그는 JSON 같은 구조화된 형식으로 남기세요. 메트릭으로 알림을 걸고, 트레이스로 위치를 찾고, 로그로 원인을 봐요.<br><sub>Write structured (JSON) logs; alert on metrics, locate with traces and explain with logs.</sub> |
| **분산 트레이싱**<br><sub>Distributed tracing</sub> | 요청에 trace ID를 붙여 서비스마다 전달하고, 각 구간(span)의 시간을 모아 폭포수 그림으로 보여 줘요.<br><sub>A trace ID travels with each request across services, and the timing of every span is collected into a waterfall view.</sub> | OpenTelemetry로 수집해 Jaeger, Tempo, Datadog 등으로 봐요. trace ID를 로그에도 남기면 바로 이어서 찾을 수 있어요.<br><sub>Collect with OpenTelemetry and view in Jaeger, Tempo or Datadog; logging the trace ID ties logs to traces.</sub> |
| **지연 백분위수 (p50 · p99)**<br><sub>Latency percentiles (p50 · p99)</sub> | 응답 시간을 정렬했을 때 50%, 99% 위치의 값이에요. 평균은 느린 꼬리를 가려요.<br><sub>The values at the 50th and 99th positions of sorted response times; averages hide the slow tail.</sub> | 목표와 알림은 p95·p99로 잡아요. 페이지 하나가 요청 수십 개를 부르면 대부분의 사용자가 p99를 겪어요.<br><sub>Set targets and alerts on p95/p99; when a page makes dozens of calls, most users hit the p99.</sub> |
| **SLI · SLO · 에러 예산**<br><sub>SLI, SLO and error budgets</sub> | SLI는 사용자 경험을 재는 지표, SLO는 그 목표치, 에러 예산은 목표가 허용하는 실패량이에요.<br><sub>An SLI measures user experience, an SLO is its target, and the error budget is the failure the target allows.</sub> | 예산이 남으면 과감하게 출시하고, 바닥나면 안정화를 우선해요. 99.9%는 한 달에 약 43분, 99.99%는 약 4분이에요.<br><sub>Ship boldly while budget remains and prioritize reliability when it runs out; 99.9% is about 43 minutes a month, 99.99% about 4.</sub> |
| **장애 대응과 회고**<br><sub>Incident response and postmortems</sub> | 감지 → 분류·선언 → 완화 → 복구 → 회고 순서로 움직여요. 원인 분석보다 피해를 먼저 멈춰요.<br><sub>Move through detect, triage, mitigate, resolve and review; stop the damage before hunting for root cause.</sub> | 대응 책임자와 소통 채널을 정해 두세요. 회고는 비난 없이(blameless) 시스템과 절차를 고치는 데 집중해요.<br><sub>Name an incident lead and a comms channel up front; run blameless postmortems that fix systems and processes.</sub> |
| **카오스 엔지니어링**<br><sub>Chaos engineering</sub> | 운영 환경과 비슷한 곳에 일부러 작은 장애를 일으켜, 진짜 장애가 나기 전에 시스템의 약점을 찾는 실험이에요.<br><sub>Deliberately injecting small failures into production-like systems to find weaknesses before real outages do.</sub> | 먼저 정상 상태(p99 지연, 오류율)를 정의하고 “인스턴스 하나가 죽어도 SLO 안”이라는 가설을 세운 뒤, 폭발 반경을 작게 해 인스턴스를 강제 종료해요. 지연이 급등하면 느린 헬스 체크나 재시도 부재 같은 약점이 드러난 것이니 고치고 다시 실험해요. 넷플릭스 Chaos Monkey에서 시작해 지연 주입, 가용 영역 장애, 의존성 차단으로 넓어졌고, 게임 데이와 자동화로 반복해요.<br><sub>Define the steady state (p99 latency, error rate), hypothesize that losing one instance stays within the SLO, then kill an instance with a small blast radius. A latency spike exposes weaknesses such as slow health checks or missing retries, which you fix and test again. It began with Netflix’s Chaos Monkey and grew to latency injection, zone outages and dependency failures, repeated through game days and automation.</sub> |
| **알림 설계**<br><sub>Alert design</sub> | 사람을 깨우는 알림은 드물고, 사용자 영향과 직결되고, 받는 즉시 할 일이 분명해야 해요. 그렇지 않으면 알림 피로로 진짜 알림을 놓쳐요.<br><sub>Alerts that wake people should be rare, tied to user impact and immediately actionable; otherwise alert fatigue buries the real ones.</sub> | CPU 82%, 디스크 70% 같은 원인 지표로 호출하면 대부분 행동할 게 없어 무시되고 결국 결제 오류 급증 같은 진짜 신호도 묻혀요. 사용자 영향(증상)으로만 호출하고, 급하지 않은 것은 티켓, 원인 지표는 대시보드로 보내요. SLO 에러 예산 소진율로 1시간 창에서 14배면 호출, 6시간 창에서 6배면 티켓처럼 다중 창 알림을 쓰면 노이즈는 줄고 큰 장애는 빨리 잡아요. 알림마다 담당자, 심각도, 런북 링크가 있어야 해요.<br><sub>Paging on causes like CPU at 82% or disk at 70% mostly produces nothing to do, so people ignore pages and miss real signals such as a spike in checkout errors. Page only on symptoms (user impact), send non-urgent issues to tickets and causes to dashboards. Multi-window SLO burn-rate alerts, e.g. page at 14× over one hour and ticket at 6× over six hours, cut noise while catching big incidents fast. Every alert needs an owner, a severity and a runbook link.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
