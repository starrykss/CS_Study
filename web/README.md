# 웹 기술 · Web technology

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/web/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

렌더링 파이프라인, 리플로우와 리페인트, 이벤트 루프, 쿠키와 스토리지, HTTP 메서드와 캐싱, REST·GraphQL, 폴링·SSE·웹소켓, CSR·SSR·SSG, 하이드레이션, 상태 관리, WebAssembly, CSS 박스 모델·명시도·Flexbox·Grid·반응형, 코어 웹 바이탈, 리소스 힌트, 접근성, 서비스 워커까지 다뤄요.

The rendering pipeline, reflow and repaint, the event loop, cookies and storage, HTTP methods and caching, REST and GraphQL, polling, SSE and WebSockets, CSR, SSR and SSG, hydration, state management, WebAssembly, the CSS box model, specificity, Flexbox, Grid and responsive design, Core Web Vitals, resource hints, accessibility and service workers.

**5개 주제 · 30개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [브라우저 동작 원리 · How browsers work](#wb-browser) (5)
- [HTTP와 API 실무 · HTTP and APIs in practice](#wb-http) (7)
- [프런트엔드 렌더링 · Front-end rendering](#wb-front) (9)
- [성능과 접근성 · Performance and accessibility](#wb-perf) (4)
- [CSS 레이아웃 · CSS layout](#wb-css) (5)

<a id="wb-browser"></a>

## 브라우저 동작 원리 · How browsers work

코드가 화면이 되기까지 브라우저 안에서 일어나는 일이에요.  
*What happens inside the browser between code and pixels.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **렌더링 파이프라인**<br><sub>Rendering pipeline</sub> | HTML은 DOM, CSS는 CSSOM이 되고, 둘을 합친 렌더 트리로 레이아웃 → 페인트 → 합성을 거쳐 화면이 그려져요.<br><sub>HTML becomes the DOM, CSS the CSSOM; together they form the render tree, which goes through layout, paint and composite.</sub> | CSS는 렌더링을 막고(render-blocking), 동기 script는 파싱을 막아요. CSS는 위에, script는 defer로 두는 이유예요.<br><sub>CSS blocks rendering and synchronous scripts block parsing, which is why CSS goes first and scripts get defer.</sub> |
| **리플로우 vs 리페인트**<br><sub>Reflow vs repaint</sub> | 크기·위치를 바꾸면 레이아웃부터 다시 계산(리플로우)하고, 색만 바꾸면 다시 칠하기(리페인트)만 해요. transform·opacity는 합성만 해서 가장 싸요.<br><sub>Changing size or position recomputes layout (reflow); changing colour only repaints; transform and opacity only composite and are cheapest.</sub> | 애니메이션은 top/left 대신 transform을 쓰세요. 반복문에서 offsetHeight 읽기와 스타일 쓰기를 섞으면 매번 강제 리플로우가 일어나요.<br><sub>Animate with transform, not top/left. Mixing offsetHeight reads and style writes in a loop forces a reflow every time.</sub> |
| **이벤트 루프**<br><sub>Event loop</sub> | JS는 스레드 하나로 콜 스택을 실행하고, 스택이 비면 마이크로태스크(Promise)를 모두 처리한 뒤 태스크(setTimeout, 이벤트)를 하나씩 꺼내요.<br><sub>JavaScript runs the call stack on one thread; when it empties, all microtasks (promises) run, then tasks (timers, events) one at a time.</sub> | 50ms 넘는 긴 작업은 화면을 멈추게 해요. 무거운 계산은 Web Worker로 보내거나 잘게 쪼개세요. 면접 단골 문제(출력 순서)도 이 규칙이에요.<br><sub>Tasks over 50 ms freeze the page; move heavy work to a Web Worker or split it up. Interview “output order” puzzles follow these rules.</sub> |
| **이벤트 전파**<br><sub>Event propagation</sub> | 이벤트는 바깥(window)에서 대상까지 내려가는 캡처 단계, 대상 단계, 다시 바깥으로 올라가는 버블 단계를 거쳐요.<br><sub>Events travel down from the window to the target (capture), hit the target, then bubble back up.</sub> | 리스트 항목마다 리스너를 다는 대신 부모 하나에 달고 event.target으로 구분하는 이벤트 위임이 효율적이에요.<br><sub>Event delegation, one listener on a parent using event.target, beats a listener on every list item.</sub> |
| **브라우저 저장소**<br><sub>Browser storage</sub> | 쿠키, localStorage, sessionStorage, IndexedDB는 용량·수명·서버 전송 여부가 달라요.<br><sub>Cookies, localStorage, sessionStorage and IndexedDB differ in size, lifetime and whether they are sent to the server.</sub> | 로그인 토큰을 localStorage에 두면 XSS 한 번에 털려요. 민감한 값은 HttpOnly·Secure·SameSite 쿠키에 두세요.<br><sub>A token in localStorage is one XSS away from theft. Keep sensitive values in HttpOnly, Secure, SameSite cookies.</sub> |

<a id="wb-http"></a>

## HTTP와 API 실무 · HTTP and APIs in practice

매일 쓰는 HTTP를 제대로 쓰는 법이에요.  
*Using the HTTP you touch every day properly.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **상태 코드**<br><sub>Status codes</sub> | 응답의 첫 숫자가 결과의 종류를 말해요. 2xx 성공, 3xx 이동, 4xx 클라이언트 잘못, 5xx 서버 잘못이에요.<br><sub>The first digit says what kind of result it is: 2xx success, 3xx redirect, 4xx client error, 5xx server error.</sub> | 모니터링·재시도·캐시가 상태 코드로 동작해요. 429는 잠시 후 재시도, 5xx는 서버 알림을 보내는 식으로 처리하세요.<br><sub>Monitoring, retries and caching all key off status codes: retry later on 429, alert on 5xx.</sub> |
| **HTTP 메서드와 멱등성**<br><sub>Methods · Idempotency</sub> | GET은 조회, POST는 생성, PUT은 전체 교체, PATCH는 일부 수정, DELETE는 삭제예요. 같은 요청을 여러 번 보내도 결과가 같으면 멱등이에요.<br><sub>GET reads, POST creates, PUT replaces, PATCH partly updates and DELETE removes. A request is idempotent if repeating it changes nothing further.</sub> | 네트워크 오류 때 멱등한 요청은 안전하게 재시도할 수 있어요. 결제처럼 중요한 POST는 Idempotency-Key 헤더로 중복을 막아요.<br><sub>Idempotent requests can be retried safely after network errors. Protect critical POSTs like payments with an Idempotency-Key.</sub> |
| **HTTP 캐시**<br><sub>HTTP caching</sub> | Cache-Control로 얼마나 캐시할지 정하고, 만료 후엔 ETag로 바뀌었는지만 물어 304로 본문 없이 응답받아요.<br><sub>Cache-Control sets how long to cache; after expiry, an ETag check gets a bodyless 304 if nothing changed.</sub> | 빌드 파일명에 해시를 넣고 1년 캐시, HTML은 no-cache로 두는 게 정석이에요. 배포 후 "예전 화면이 보여요"의 원인 대부분이 캐시예요.<br><sub>Hash build filenames and cache them for a year; serve HTML with no-cache. Most “I still see the old page” bugs are caching.</sub> |
| **CDN**<br><sub>CDN · Content delivery network</sub> | 전 세계 엣지 서버에 콘텐츠를 복사해 두고, 사용자와 가까운 곳에서 응답해요.<br><sub>Copies content to edge servers worldwide and answers from the one nearest the user.</sub> | 이미지·JS·영상은 기본으로 CDN에 두세요. 캐시 무효화(purge) 방법과 캐시 키(쿼리스트링·쿠키 포함 여부)를 확인하세요.<br><sub>Serve images, JS and video from a CDN by default. Know how to purge and what goes into the cache key (query strings, cookies).</sub> |
| **REST API 설계**<br><sub>REST API design</sub> | 자원은 URL(명사)로, 동작은 HTTP 메서드(동사)로 표현하고, 결과는 상태 코드로 알려요.<br><sub>Name resources with URLs (nouns), act on them with HTTP methods (verbs) and report results with status codes.</sub> | 복수형 명사, 일관된 에러 형식, 페이지네이션, 버전(/v1) 규칙을 팀에서 정해 두세요. OpenAPI로 문서를 자동화하면 좋아요.<br><sub>Agree on plural nouns, a consistent error format, pagination and versioning (/v1). Generate docs with OpenAPI.</sub> |
| **GraphQL vs REST**<br><sub>GraphQL vs REST</sub> | GraphQL은 클라이언트가 필요한 데이터의 모양을 쿼리로 정해 한 번에 받아요. REST는 자원별 엔드포인트를 여러 번 호출해요.<br><sub>With GraphQL the client describes the exact shape of data it needs and gets it in one request; REST calls several resource endpoints.</sub> | 화면이 다양하고 데이터 관계가 복잡하면 GraphQL이 유리해요. 대신 HTTP 캐시가 어렵고 무거운 쿼리를 제한하는 장치가 필요해요.<br><sub>GraphQL shines with many screens and rich relations, but HTTP caching gets harder and you must limit expensive queries.</sub> |
| **폴링 · SSE · 웹소켓**<br><sub>Polling, SSE and WebSockets</sub> | 서버의 새 소식을 클라이언트에 실시간으로 전하는 방법들이에요: 폴링, 롱 폴링, 서버 전송 이벤트(SSE), 웹소켓.<br><sub>Ways to deliver server updates to clients in real time: polling, long polling, server-sent events (SSE) and WebSockets.</sub> | 폴링은 몇 초마다 물어봐서 단순하지만 대부분 빈 응답이고 지연이 주기만큼 생겨요. 롱 폴링은 이벤트가 생길 때까지 요청을 붙잡아 낭비를 줄여요. SSE는 HTTP 응답 하나를 열어 두고 서버가 이벤트를 흘려보내는 단방향 스트림으로 자동 재연결이 돼 알림·피드에 좋아요. 웹소켓은 업그레이드 후 양방향 메시지를 주고받아 채팅·게임·협업 편집에 써요. 긴 연결은 로드 밸런서 타임아웃과 연결 수를 함께 설계해야 해요.<br><sub>Polling asks every few seconds: simple, but mostly empty responses and latency equal to the interval. Long polling holds a request open until an event arrives, cutting waste. SSE keeps one HTTP response open and streams events one way, with automatic reconnection, ideal for notifications and feeds. WebSockets upgrade the connection for two-way messages, used in chat, games and collaborative editing. Long-lived connections require planning for load-balancer timeouts and connection counts.</sub> |

<a id="wb-front"></a>

## 프런트엔드 렌더링 · Front-end rendering

화면을 언제, 어디서 그릴지에 대한 선택이에요.  
*Choices about when and where pages are rendered.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **CSR · SSR · SSG**<br><sub>CSR · SSR · SSG</sub> | CSR은 브라우저의 JS가 화면을 그리고, SSR은 요청마다 서버가 HTML을 만들고, SSG는 빌드 때 미리 만들어 둬요.<br><sub>CSR renders in the browser with JS, SSR renders HTML on the server per request, SSG prebuilds HTML at build time.</sub> | 로그인 뒤 대시보드는 CSR, 검색 노출이 중요한 페이지는 SSR/SSG가 유리해요. Next.js·Nuxt·Astro는 페이지마다 고를 수 있어요.<br><sub>Dashboards behind login suit CSR; pages that need search traffic suit SSR or SSG. Next.js, Nuxt and Astro let you choose per page.</sub> |
| **하이드레이션**<br><sub>Hydration</sub> | 서버에서 받은 정적 HTML에 JS가 이벤트와 상태를 연결해 상호작용 가능한 앱으로 만드는 과정이에요.<br><sub>JavaScript attaches events and state to server-rendered HTML, turning it into an interactive app.</sub> | 서버와 클라이언트 렌더 결과가 다르면 하이드레이션 오류가 나요(날짜·랜덤 값 주의). JS가 크면 보이는데 안 눌리는 시간이 길어져요.<br><sub>Mismatched server and client output causes hydration errors (watch dates and random values). Big bundles lengthen the “visible but dead” window.</sub> |
| **가상 DOM과 재조정**<br><sub>Virtual DOM · Reconciliation</sub> | 상태가 바뀌면 새 가상 DOM을 만들어 이전 것과 비교하고, 달라진 부분만 실제 DOM에 반영해요.<br><sub>Each state change builds a new virtual DOM, diffs it against the old one and patches only the differences into the real DOM.</sub> | 리스트에는 안정적인 key를 주세요(인덱스 key는 순서가 바뀌면 버그). Svelte·Solid처럼 가상 DOM 없이 컴파일하는 방식도 있어요.<br><sub>Give list items stable keys (index keys break on reorder). Svelte and Solid skip the virtual DOM by compiling instead.</sub> |
| **SPA와 라우팅**<br><sub>SPA · Client-side routing</sub> | 페이지를 이동할 때 서버에서 새 HTML을 받지 않고, JS가 본문만 바꾸고 history API로 주소를 바꿔요.<br><sub>Navigation swaps content with JavaScript and updates the URL through the history API instead of loading new HTML.</sub> | 새로고침 시 404가 나지 않게 서버가 모든 경로에 index.html을 주도록 설정하세요. 스크롤 위치·포커스 복원도 직접 챙겨야 해요.<br><sub>Configure the server to return index.html for every route so refreshes don’t 404, and handle scroll and focus restoration yourself.</sub> |
| **번들링·코드 스플리팅**<br><sub>Bundling · Code splitting</sub> | 여러 모듈을 몇 개 파일로 묶고, 당장 필요 없는 코드는 따로 떼어 나중에 받고, 쓰지 않는 코드는 빼요(트리 셰이킹).<br><sub>Combines many modules into a few files, defers code not needed yet and drops unused code (tree shaking).</sub> | 라우트별 동적 import()가 가장 쉬운 스플리팅이에요. 큰 라이브러리는 필요한 함수만 import하세요.<br><sub>Dynamic import() per route is the easiest split. Import only the functions you need from big libraries.</sub> |
| **지연 로딩**<br><sub>Lazy loading</sub> | 화면에 보일 때가 가까워져서야 이미지·컴포넌트를 불러와 첫 로딩을 가볍게 해요.<br><sub>Loads images and components only as they approach the viewport, making the first load lighter.</sub> | img에 loading="lazy"만 붙여도 돼요. 단, 첫 화면의 큰 이미지(LCP)는 지연 로딩하면 오히려 느려져요.<br><sub>Adding loading="lazy" to img is enough, but lazy-loading the main above-the-fold image (LCP) makes things slower.</sub> |
| **디바운스와 스로틀**<br><sub>Debounce · Throttle</sub> | 디바운스는 이벤트가 멈춘 뒤 한 번만, 스로틀은 정해진 간격마다 최대 한 번만 실행해요.<br><sub>Debounce runs once after events stop; throttle runs at most once per interval.</sub> | 검색어 자동완성 API 호출은 디바운스, 스크롤·리사이즈 처리는 스로틀이 맞아요. 서버 쪽 레이트 리밋과는 별개예요.<br><sub>Debounce search-suggestion API calls; throttle scroll and resize handlers. Server-side rate limiting is a separate concern.</sub> |
| **프런트엔드 상태 관리**<br><sub>Front-end state management</sub> | 여러 컴포넌트가 같은 데이터를 써야 할 때 그 상태를 어디에 두고 어떻게 전달할지 정하는 일이에요.<br><sub>Deciding where shared state lives and how it reaches the components that need it.</sub> | 장바구니처럼 멀리 떨어진 CartBadge와 ProductCard가 함께 쓰는 상태를 App에 두면, 쓰지도 않는 중간 컴포넌트가 props를 계속 넘겨야 하는 prop drilling이 생겨요. Context, Redux, Zustand 같은 전역 스토어에 두면 필요한 컴포넌트만 직접 구독해요. 상태 변경은 action → reducer → 새 state → 화면으로 한 방향으로 흘러 추적이 쉬워요. 서버 데이터는 React Query·SWR, 화면 상태는 스토어로 종류별로 나눠 관리해요.<br><sub>If cart state used by distant CartBadge and ProductCard sits in App, intermediate components must pass props they never use: prop drilling. A global store such as Context, Redux or Zustand lets only the interested components subscribe. Changes flow one way, action → reducer → new state → view, which keeps them traceable. Manage server data with React Query or SWR and UI state in a store, separately.</sub> |
| **WebAssembly**<br><sub>WebAssembly</sub> | C, C++, Rust 같은 언어를 컴파일한 바이너리를 브라우저에서 거의 네이티브 속도로 안전하게 실행하는 형식이에요.<br><sub>A binary format that runs code compiled from languages like C, C++ and Rust in the browser, safely and at near-native speed.</sub> | 컴파일러가 만든 .wasm 파일을 JS가 WebAssembly.instantiateStreaming으로 불러와 instance.exports.add(2, 3)처럼 호출해요. Wasm은 하나의 ArrayBuffer인 선형 메모리만 접근하는 샌드박스에서 돌고, JS는 같은 버퍼를 읽어 결과를 주고받아요. DOM은 직접 다루지 못해 UI는 JS, 무거운 계산은 Wasm으로 나누며, Figma, Photoshop 웹, ffmpeg.wasm이 대표 사례예요. WASI로 브라우저 밖에서도 써요.<br><sub>JavaScript loads the compiled .wasm file with WebAssembly.instantiateStreaming and calls exports such as instance.exports.add(2, 3). Wasm runs in a sandbox that can only touch its linear memory, a single ArrayBuffer, which JS also reads to exchange results. It can’t manipulate the DOM directly, so JS handles UI and Wasm the heavy computation; Figma, Photoshop on the web and ffmpeg.wasm are well-known uses. With WASI it runs outside the browser too.</sub> |

<a id="wb-perf"></a>

## 성능과 접근성 · Performance and accessibility

빠르고 누구나 쓸 수 있는 웹을 만드는 기준이에요.  
*Standards for a web that is fast and usable by everyone.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **Core Web Vitals**<br><sub>Core Web Vitals</sub> | 구글이 정한 사용자 경험 지표로, LCP(로딩), INP(반응성), CLS(시각 안정성) 세 가지예요.<br><sub>Google’s user-experience metrics: LCP for loading, INP for responsiveness and CLS for visual stability.</sub> | 랩 측정(Lighthouse)과 실사용자 측정(CrUX, RUM)이 다를 수 있어요. 실제 사용자 데이터를 기준으로 개선하세요.<br><sub>Lab tools (Lighthouse) and field data (CrUX, RUM) can disagree; optimize against real-user data.</sub> |
| **웹 접근성**<br><sub>Web accessibility</sub> | 시각·운동 장애가 있거나 키보드·스크린 리더를 쓰는 사람도 같은 정보와 기능을 쓸 수 있게 만드는 거예요.<br><sub>Making the same information and functions usable by people with visual or motor impairments, keyboards or screen readers.</sub> | div 대신 button·a 같은 시맨틱 태그, 이미지 alt, 4.5:1 명도 대비, 보이는 포커스 표시가 기본이에요. 공공·금융 서비스는 법적 의무예요.<br><sub>Use semantic tags (button, a) instead of divs, alt text, 4.5:1 contrast and visible focus. It is a legal requirement for many public and financial services.</sub> |
| **서비스 워커 · PWA**<br><sub>Service worker · PWA</sub> | 페이지와 네트워크 사이에서 요청을 가로채는 백그라운드 스크립트로, 캐시를 이용해 오프라인에서도 동작하게 해요.<br><sub>A background script that intercepts requests between the page and network, using a cache so the app works offline.</sub> | 캐시 전략(캐시 우선, 네트워크 우선)을 자원마다 골라요. 업데이트가 안 되는 문제가 흔하니 버전 관리와 갱신 흐름을 꼭 설계하세요.<br><sub>Pick a cache strategy (cache-first, network-first) per resource. Stale updates are a common trap, so design versioning and refresh flows.</sub> |
| **리소스 힌트**<br><sub>Resource hints</sub> | preconnect, preload, prefetch로 브라우저가 늦게 발견할 자원을 미리 알려, 중요 렌더링 경로를 줄이는 방법이에요.<br><sub>preconnect, preload and prefetch tell the browser about resources it would discover late, shortening the critical rendering path.</sub> | 폰트처럼 CSS를 다 읽고 나서야 발견되는 자원은 늦게 시작해 LCP를 늦춰요. preconnect는 CDN과의 DNS·TCP·TLS 연결을 미리 열고, preload는 꼭 필요한 폰트·히어로 이미지를 처음부터 받게 하며, fetchpriority="high"로 우선순위를 높여요. prefetch는 다음 페이지 자원을 한가할 때 받아 둬요. 다만 preload를 남발하면 정작 중요한 자원이 밀리니, 네트워크 워터폴과 Lighthouse로 확인하며 써요.<br><sub>Resources like fonts are only discovered after the CSS is parsed, so they start late and delay LCP. preconnect opens the DNS, TCP and TLS connection to a CDN early, preload fetches essential fonts and hero images from the start, and fetchpriority="high" raises priority. prefetch grabs next-page assets when idle. Overusing preload pushes back what really matters, so verify with the network waterfall and Lighthouse.</sub> |

<a id="wb-css"></a>

## CSS 레이아웃 · CSS layout

상자부터 그리드까지, 화면에 요소를 배치하는 규칙이에요.  
*The rules that place elements on screen, from boxes to grids.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **CSS 박스 모델**<br><sub>The CSS box model</sub> | 모든 요소는 content → padding → border → margin 네 겹의 상자예요. box-sizing에 따라 width가 뜻하는 범위가 달라져요.<br><sub>Every element is a box of four layers: content → padding → border → margin. box-sizing decides what width refers to.</sub> | 기본값 content-box에서는 width: 200px에 padding 20px, border 5px가 더해져 실제 폭이 250px이 돼요. border-box로 바꾸면 테두리까지 200px라 계산이 쉬워서 요즘은 \* { box-sizing: border-box }로 시작해요. 세로로 붙은 블록의 margin은 더해지지 않고 큰 쪽만 남는 마진 상쇄가 일어나요. 개발자 도구의 박스 그림으로 바로 확인할 수 있어요.<br><sub>Under the default content-box, width: 200px plus 20px padding and 5px border renders 250px wide. border-box counts padding and border inside the 200px, which is easier, so modern CSS starts with \* { box-sizing: border-box }. Vertical margins between adjacent blocks collapse to the larger one instead of adding up. DevTools shows the box diagram for any element.</sub> |
| **캐스케이드와 명시도**<br><sub>Cascade and specificity</sub> | 같은 요소에 여러 CSS 규칙이 겹치면 중요도 → 출처 → 명시도 → 선언 순서로 이길 규칙을 골라요.<br><sub>When several CSS rules target one element, the cascade picks a winner by importance, origin, specificity and then source order.</sub> | 명시도는 (ID 수, 클래스·속성·가상 클래스 수, 태그 수)를 앞에서부터 비교해요. p(0,0,1) < .note(0,1,0) < #intro(1,0,0)라 문단은 초록이 되고, 명시도가 같으면 나중에 쓴 규칙이 이겨요. 인라인 style과 !important는 그보다 강해서 남발하면 나중에 덮어쓰기 어려워요. 클래스 위주(BEM), :where()로 명시도 0 만들기, @layer로 계층 순서 정하기가 관리 요령이에요.<br><sub>Specificity compares (IDs, classes/attributes/pseudo-classes, tags) from the left: p (0,0,1) < .note (0,1,0) < #intro (1,0,0), so the paragraph turns green, and on a tie the later rule wins. Inline styles and !important beat all of these, and overusing them makes later overrides painful. Stick to classes (BEM), zero specificity out with :where(), and order styles with @layer.</sub> |
| **Flexbox**<br><sub>Flexbox</sub> | 요소를 한 방향(행 또는 열)으로 늘어놓고, 주축과 교차축을 따라 정렬하며 남는 공간을 나눠 주는 레이아웃이에요.<br><sub>A layout that lines items up in one direction (row or column), aligns them along main and cross axes and shares out free space.</sub> | display: flex를 주면 자식들이 주축(기본은 가로)으로 늘어서요. justify-content는 주축 정렬(space-between 등), align-items는 교차축 정렬(center로 세로 가운데)을 맡고, flex: 1인 요소는 남는 공간을 차지해요. flex-direction: column이면 두 축이 바뀌고, flex-wrap으로 줄바꿈, gap으로 간격을 줘요. 내비게이션 바, 버튼 묶음, 카드 안 정렬처럼 1차원 배치에 써요.<br><sub>With display: flex, children line up along the main axis (horizontal by default). justify-content aligns along the main axis (e.g. space-between), align-items along the cross axis (center for vertical centering), and an item with flex: 1 takes the free space. flex-direction: column swaps the axes, flex-wrap wraps lines and gap sets spacing. It suits one-dimensional layouts such as nav bars, button groups and alignment inside cards.</sub> |
| **CSS Grid**<br><sub>CSS Grid</sub> | 행과 열을 함께 정의해 2차원 레이아웃을 선언적으로 그리는 CSS 기능이에요.<br><sub>A CSS feature that defines rows and columns together to lay out pages in two dimensions declaratively.</sub> | grid-template-columns: 200px 1fr 1fr은 고정 200px 뒤에 남은 공간을 1:1로 나눠요(fr = 남은 공간의 몫). grid-template-areas로 header, side, main, footer 같은 영역 이름을 지도처럼 그려 배치할 수 있고, repeat(auto-fill, minmax(150px, 1fr))는 화면 폭에 따라 열 수를 자동으로 바꿔 카드 목록을 반응형으로 만들어요. Flex는 1차원, Grid는 2차원이라 페이지 뼈대는 Grid, 줄 안 정렬은 Flex를 함께 써요.<br><sub>grid-template-columns: 200px 1fr 1fr fixes 200px and splits the rest 1:1 (fr = a share of leftover space). grid-template-areas draws named areas like header, side, main and footer as a map, and repeat(auto-fill, minmax(150px, 1fr)) changes the column count with the viewport for responsive card lists. Flex is one-dimensional and Grid two-dimensional, so a common combo is Grid for the page skeleton and Flex within rows.</sub> |
| **반응형 웹**<br><sub>Responsive design</sub> | 하나의 코드가 화면 크기에 맞춰 레이아웃·글자·이미지를 바꾸도록 만드는 방법이에요.<br><sub>Making one codebase adapt its layout, type and images to the screen size.</sub> | 먼저 viewport 메타 태그가 있어야 휴대폰이 데스크톱 폭(980px)으로 축소해 보여 주지 않아요. 모바일 우선으로 기본 CSS를 작은 화면용으로 쓰고, @media (min-width: 768px) 같은 미디어 쿼리로 넓은 화면에서 2열, 3열로 늘려요. clamp()로 유동 글자 크기, 컨테이너 쿼리로 부품 단위 반응형, srcset으로 화면에 맞는 이미지를 줘요. 브레이크포인트는 기기 이름이 아니라 내용이 깨지는 지점에 둬요.<br><sub>First, the viewport meta tag stops phones from rendering a shrunken 980px desktop page. Write mobile-first base CSS for small screens, then widen to two or three columns with media queries like @media (min-width: 768px). clamp() gives fluid type, container queries make components responsive on their own, and srcset serves fitting images. Put breakpoints where the content breaks, not at device names.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
