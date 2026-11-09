# 정보 보안 · Security

> [!NOTE]
> [페이지 바로가기 · Open the atlas](https://starrykss.github.io/CS_Study/security/) · [← 통합 포털 · Portal](https://starrykss.github.io/CS_Study/) · [← 저장소 처음으로](../README.md)

대칭키·공개키 암호, 해시와 솔트, 디지털 서명과 인증서, XSS·SQL 인젝션·CSRF, 세션과 JWT, OAuth 2.0, 다중 인증, 최소 권한과 제로 트러스트, DDoS와 중간자 공격까지 다뤄요.

Symmetric and public-key cryptography, hashing and salts, digital signatures and certificates, XSS, SQL injection and CSRF, sessions and JWT, OAuth 2.0, multi-factor authentication, least privilege and zero trust, DDoS and man-in-the-middle attacks.

**4개 주제 · 22개 개념** — 모든 개념에 반복 재생되는 모션 예시가 있어요. 아래 표는 페이지 내용을 글로 옮긴 거예요.

## 목차 · Contents

- [암호 기술의 기초 · Cryptography basics](#sc-crypto) (7)
- [인증과 인가 · Authentication and authorization](#sc-auth) (6)
- [웹 공격과 방어 · Web attacks and defenses](#sc-web) (7)
- [운영 보안 · Operational security](#sc-ops) (2)

<a id="sc-crypto"></a>

## 암호 기술의 기초 · Cryptography basics

데이터를 숨기고, 바뀌지 않았음을 증명하고, 누가 보냈는지 확인하는 도구예요.  
*Tools to hide data, prove it hasn’t changed and confirm who sent it.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **해시 함수**<br><sub>Hash function</sub> | 어떤 데이터든 고정 길이의 값(다이제스트)으로 바꿔요. 같은 입력은 항상 같은 값, 조금만 달라도 전혀 다른 값이 나오고 거꾸로 되돌릴 수 없어요.<br><sub>Turns any data into a fixed-length digest: the same input always gives the same output, a tiny change gives a totally different one, and it can’t be reversed.</sub> | 파일 무결성 검사(체크섬), git 커밋 ID, 캐시 키, 비밀번호 저장에 써요. MD5·SHA-1은 충돌이 발견돼 보안 용도로 쓰지 마세요.<br><sub>Used for checksums, git commit ids, cache keys and password storage. MD5 and SHA-1 are broken for security use.</sub> |
| **대칭키 암호**<br><sub>Symmetric encryption</sub> | 암호화와 복호화에 같은 키를 써요. 빠르지만 양쪽이 같은 키를 미리 안전하게 나눠 가져야 해요.<br><sub>Uses the same key to encrypt and decrypt: fast, but both sides must already share the key securely.</sub> | AES가 표준이에요. 디스크·DB 암호화, HTTPS의 실제 데이터 암호화에 써요. 키 자체는 공개키 방식으로 교환해요.<br><sub>AES is the standard, used for disk and database encryption and for HTTPS bulk data; the key itself is exchanged with public-key methods.</sub> |
| **공개키 암호**<br><sub>Public-key cryptography</sub> | 공개키와 개인키 한 쌍을 써요. 공개키로 잠근 것은 짝이 되는 개인키로만 열 수 있어서, 키를 몰래 나눌 필요가 없어요.<br><sub>Uses a key pair: what the public key locks, only the matching private key opens, so no secret has to be shared in advance.</sub> | HTTPS, SSH, 이메일 암호화의 기반이에요. 개인키가 유출되면 끝이니 서버 키·SSH 키는 철저히 보관하세요.<br><sub>The basis of HTTPS, SSH and encrypted email. A leaked private key is game over, so guard server and SSH keys carefully.</sub> |
| **전자 서명**<br><sub>Digital signature</sub> | 개인키로 서명하고 공개키로 검증해요. 누가 썼는지(인증)와 내용이 바뀌지 않았음(무결성)을 함께 증명해요.<br><sub>Sign with the private key, verify with the public key: it proves both who wrote it and that it wasn’t altered.</sub> | 앱·패키지 코드 서명, JWT, 블록체인 거래, 인증서가 모두 서명을 써요.<br><sub>Code signing for apps and packages, JWTs, blockchain transactions and certificates all rely on signatures.</sub> |
| **키 교환 (디피-헬먼)**<br><sub>Key exchange · Diffie–Hellman</sub> | 서로 공개된 값만 주고받고도 양쪽이 같은 비밀 키를 만들어 내는 방법이에요. 도청자는 같은 키를 만들 수 없어요.<br><sub>Two sides exchange only public values yet end up with the same secret key; an eavesdropper can’t compute it.</sub> | TLS 1.3의 ECDHE가 이것이고, 세션마다 새 키를 만들어 나중에 키가 털려도 지난 통신은 안전해요(전방 비밀성).<br><sub>TLS 1.3 uses ECDHE with fresh keys per session, so a later key leak doesn’t expose past traffic (forward secrecy).</sub> |
| **인증서와 CA**<br><sub>Certificates · CA</sub> | 인증서는 "이 공개키는 이 도메인의 것"이라고 믿을 만한 기관(CA)이 서명한 문서예요. 브라우저는 내장된 루트 CA까지 서명이 이어지는지 확인해요.<br><sub>A certificate is a document signed by a trusted authority saying “this public key belongs to this domain”; browsers check the chain up to a built-in root.</sub> | 인증서 만료는 흔한 장애 원인이라 자동 갱신을 꼭 설정하세요. 중간 인증서를 빠뜨리면 일부 기기에서만 오류가 나요.<br><sub>Expiry is a common outage, so automate renewal. Forgetting the intermediate cert breaks only some devices.</sub> |
| **비밀번호 저장**<br><sub>Password storage</sub> | 비밀번호는 원문이 아니라 사용자마다 다른 솔트를 붙여 일부러 느린 해시(bcrypt, Argon2)로 저장해요.<br><sub>Store passwords not as text but as slow salted hashes (bcrypt, Argon2), with a different salt per user.</sub> | DB가 유출돼도 해독에 엄청난 시간이 들게 만드는 게 목표예요. 직접 암호 알고리즘을 만들지 말고 검증된 라이브러리를 쓰세요.<br><sub>The goal is that a leaked database still takes enormous effort to crack. Use vetted libraries; never invent crypto.</sub> |

<a id="sc-auth"></a>

## 인증과 인가 · Authentication and authorization

누구인지 확인하고, 무엇을 할 수 있는지 정해요.  
*Confirming who someone is and deciding what they may do.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **인증 vs 인가**<br><sub>Authentication vs authorization</sub> | 인증은 "누구인지" 확인하는 것이고, 인가는 확인된 사람이 "무엇을 할 수 있는지" 정하는 거예요.<br><sub>Authentication confirms who you are; authorization decides what you are allowed to do.</sub> | 로그인 안 됨은 401, 로그인했지만 권한 없음은 403이에요. 권한 검사는 화면이 아니라 반드시 서버에서 해야 해요.<br><sub>Not logged in is 401; logged in but not allowed is 403. Always enforce permissions on the server, not just the UI.</sub> |
| **세션 vs 토큰**<br><sub>Session vs token</sub> | 세션 방식은 서버가 로그인 정보를 저장하고 쿠키로 식별자만 줘요. 토큰 방식은 정보가 담긴 서명된 토큰을 줘서 서버가 저장하지 않아요.<br><sub>Sessions keep login state on the server and give the browser just an id cookie; tokens hand out signed data so the server stores nothing.</sub> | 웹은 HttpOnly 쿠키 세션이 단순하고 안전해요. 모바일·여러 서비스 간에는 토큰이 편하지만 취소가 어려워 만료를 짧게 둬요.<br><sub>For websites, HttpOnly cookie sessions are simple and safe. Tokens suit mobile and multi-service setups but are hard to revoke, so keep them short-lived.</sub> |
| **JWT**<br><sub>JWT · JSON Web Token</sub> | 헤더.페이로드.서명 세 부분으로 된 토큰이에요. 페이로드는 누구나 읽을 수 있고, 서명 덕분에 내용을 바꾸면 들켜요.<br><sub>A token in three parts, header.payload.signature. Anyone can read the payload, but the signature exposes any tampering.</sub> | 민감 정보를 넣지 말고, 알고리즘을 서버에서 고정하고, 만료(exp)를 꼭 확인하세요. localStorage 보관은 XSS에 취약해요.<br><sub>Keep secrets out of it, pin the algorithm server-side and always check expiry. Storing it in localStorage exposes it to XSS.</sub> |
| **OAuth 2.0 · 소셜 로그인**<br><sub>OAuth 2.0 · Social login</sub> | 비밀번호를 넘기지 않고, 다른 서비스(구글 등)가 발급한 토큰으로 정해진 범위의 권한만 위임받아요.<br><sub>Delegates limited access through a token issued by another service, such as Google, without ever sharing the password.</sub> | "구글로 로그인"은 OAuth 위의 OpenID Connect예요. 모바일·SPA는 PKCE를 꼭 쓰고, 리디렉트 URI를 정확히 등록하세요.<br><sub>“Sign in with Google” is OpenID Connect on top of OAuth. Use PKCE for mobile and SPAs and register exact redirect URIs.</sub> |
| **다중 인증 (MFA)**<br><sub>Multi-factor authentication</sub> | 비밀번호(아는 것)에 휴대폰 코드·보안 키(가진 것)나 지문(나 자신)을 더해 확인해요.<br><sub>Combines a password (something you know) with a phone code or key (something you have) or a fingerprint (something you are).</sub> | 비밀번호 유출 공격 대부분을 막아요. SMS보다 OTP 앱, 그보다 패스키·보안 키(FIDO2)가 피싱에 강해요.<br><sub>It stops most stolen-password attacks. OTP apps beat SMS, and passkeys or FIDO2 keys resist phishing best.</sub> |
| **권한 모델 (RBAC)**<br><sub>Role-based access control</sub> | 사용자에게 권한을 직접 주지 않고 역할(관리자, 편집자, 열람자)을 주고, 역할에 권한을 묶어요.<br><sub>Instead of granting permissions to people directly, assign roles (admin, editor, viewer) that carry permissions.</sub> | 필요한 최소한의 권한만 주는 최소 권한 원칙과 함께 써요. 조건이 복잡하면 속성 기반(ABAC)이나 정책 엔진을 써요.<br><sub>Pair it with least privilege. For complex conditions, use attribute-based control (ABAC) or a policy engine.</sub> |

<a id="sc-web"></a>

## 웹 공격과 방어 · Web attacks and defenses

실제로 가장 많이 당하는 공격들과 막는 방법이에요.  
*The attacks that actually happen most, and how to stop them.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **SQL 인젝션**<br><sub>SQL injection</sub> | 사용자 입력을 문자열로 이어 붙여 쿼리를 만들면, 입력에 섞인 SQL 코드가 그대로 실행돼요.<br><sub>When user input is concatenated into a query string, SQL inside the input gets executed.</sub> | Prepared Statement(파라미터 바인딩)로 입력을 항상 값으로만 다루세요. DB 계정 권한도 최소로 두세요.<br><sub>Use prepared statements (parameter binding) so input is always data, and give the database account minimal rights.</sub> |
| **XSS**<br><sub>XSS · Cross-site scripting</sub> | 공격자가 심은 스크립트가 다른 사용자의 브라우저에서 실행돼 쿠키·정보를 훔치거나 화면을 조작해요.<br><sub>A script planted by an attacker runs in other users’ browsers, stealing cookies or altering the page.</sub> | 출력 시 HTML 이스케이프, CSP 헤더, HttpOnly 쿠키로 막아요. 사용자 HTML을 허용해야 하면 DOMPurify 같은 정화 라이브러리를 쓰세요.<br><sub>Escape output, send a CSP header and use HttpOnly cookies. If you must allow user HTML, sanitize it with something like DOMPurify.</sub> |
| **CSRF**<br><sub>CSRF · Cross-site request forgery</sub> | 로그인된 사용자가 악성 사이트를 열면, 그 사이트가 사용자 몰래 다른 사이트로 요청을 보내고 브라우저가 쿠키를 자동으로 붙여요.<br><sub>A logged-in user visits an evil page that silently sends requests to another site, and the browser attaches cookies automatically.</sub> | 쿠키에 SameSite=Lax/Strict를 설정하고, 상태를 바꾸는 요청엔 CSRF 토큰을 확인하세요. GET으로 상태를 바꾸면 안 돼요.<br><sub>Set SameSite=Lax or Strict on cookies and check CSRF tokens on state-changing requests. Never change state with GET.</sub> |
| **CORS**<br><sub>CORS · Cross-origin resource sharing</sub> | 브라우저는 다른 출처(도메인·포트)의 응답을 기본으로 JS에 주지 않아요. 서버가 허용 헤더로 특정 출처를 허락해야 해요.<br><sub>Browsers withhold cross-origin responses from JavaScript by default; the server must allow specific origins with headers.</sub> | "CORS 오류"는 브라우저가 막은 것이라 서버 헤더를 고쳐야 해요. Allow-Origin: * 와 쿠키 인증을 함께 쓰면 안 돼요.<br><sub>A “CORS error” is the browser blocking, fixed by server headers. Never combine Allow-Origin: * with cookie credentials.</sub> |
| **중간자 공격**<br><sub>Man-in-the-middle</sub> | 통신 중간에 끼어든 공격자가 내용을 엿보거나 바꿔치기해요. 공용 와이파이가 대표적인 위험 지점이에요.<br><sub>An attacker sitting between two parties reads or alters their traffic; public Wi-Fi is the classic risk.</sub> | 모든 곳에 HTTPS를 쓰고 HSTS로 강제하세요. 앱에서는 인증서 검증을 끄는 코드를 절대 배포하지 마세요.<br><sub>Use HTTPS everywhere and enforce it with HSTS. Never ship app code that disables certificate verification.</sub> |
| **DDoS**<br><sub>DDoS · Distributed denial of service</sub> | 수많은 기기(봇넷)가 한꺼번에 요청을 보내 서버나 네트워크를 마비시켜요.<br><sub>Huge numbers of devices (a botnet) send traffic at once to knock a server or network offline.</sub> | CDN·WAF(클라우드플레어 등)로 흡수하고, 레이트 리밋과 오토스케일링을 함께 써요. 비싼 API에 캐시가 없으면 작은 공격에도 쓰러져요.<br><sub>Absorb it with a CDN or WAF (e.g. Cloudflare), plus rate limiting and autoscaling. Expensive uncached endpoints fall to small attacks.</sub> |
| **접근 제어 실패 (IDOR)**<br><sub>Broken access control · IDOR</sub> | 로그인만 확인하고 그 데이터의 주인인지 확인하지 않아서, URL의 ID만 바꾸면 남의 데이터가 보여요.<br><sub>The server checks that you are logged in but not that you own the data, so changing an ID in the URL reveals others’ records.</sub> | OWASP Top 10의 1위예요. 모든 API에서 서버가 소유권·권한을 확인하고, 테스트에 "다른 사용자로 접근" 케이스를 넣으세요.<br><sub>It is number one in the OWASP Top 10. Check ownership on every API and test “access as another user” cases.</sub> |

<a id="sc-ops"></a>

## 운영 보안 · Operational security

코드 밖에서 새는 구멍을 막아요.  
*Plugging the holes outside the code.*

| 개념 | 설명 | 실무 팁 |
| --- | --- | --- |
| **비밀 정보 관리**<br><sub>Secrets management</sub> | API 키·DB 비밀번호 같은 비밀은 코드에 넣지 않고 환경 변수나 비밀 관리 서비스에 둬요.<br><sub>Keep API keys and passwords out of code, in environment variables or a secret manager.</sub> | 공개 저장소에 올라간 키는 몇 분 안에 수집돼요. git-secrets·gitleaks로 커밋 전에 막고, 유출되면 즉시 폐기·교체하세요.<br><sub>Keys pushed to public repos are harvested within minutes. Block them pre-commit with tools like gitleaks, and rotate immediately if leaked.</sub> |
| **방화벽과 네트워크 분리**<br><sub>Firewalls · Network segmentation</sub> | 외부에는 꼭 필요한 포트만 열고, DB 같은 내부 시스템은 외부에서 직접 접근할 수 없는 영역에 둬요.<br><sub>Open only the ports that must be public and keep internal systems like databases in zones unreachable from outside.</sub> | 클라우드 보안 그룹에서 0.0.0.0/0으로 DB·SSH를 여는 실수가 흔해요. 관리 접속은 VPN이나 배스천을 거치게 하세요.<br><sub>Opening DB or SSH ports to 0.0.0.0/0 in security groups is a common mistake. Route admin access through a VPN or bastion.</sub> |

## 파일 · Files

| 파일 | 내용 |
| --- | --- |
| `index.html` | 과목 페이지 (주제 이동, 검색, 한/영 전환, 다크 모드, 상세 보기) |
| `content.js` | 이 과목의 개념 설명과 모션 장면 |

공통 엔진과 스타일은 [`../assets`](../assets)에 있어요.

---

Made by [@starrykss](https://github.com/starrykss)
