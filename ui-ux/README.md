# Motion Archive

## UI/UX 도감

> [!NOTE] 
> [페이지 바로가기](https://starrykss.github.io/CS_Study/ui-ux/)

이름은 몰라도 보면 아는 UI·UX 개념을, 개념마다 직접 움직이는 예시와 함께 정리한 정적 웹사이트예요.
An animated field guide to UI/UX concepts. Every concept comes with a live CSS motion example.

## 페이지 · Pages

| 파일 | 내용 |
| --- | --- |
| `index.html` | 전체 도감 · 22개 분류, 253개 개념 (헷갈리는 짝꿍, 컴포넌트 사전, 폼, 디자인 스타일, 데이터 시각화, UX 라이팅, AI UX, 심리, 다크 패턴, 방법론 등) |
| `ios.html` | iOS UI·UX · Human Interface Guidelines 기반 30개 |
| `android.html` | Android UI·UX · Material Design 3 기반 30개 |
| `motion.html` | 애니메이션 · `animation-timing-function`(키워드, cubic-bezier, steps, linear() 스프링·바운스)과 animation 속성 38개 |
| `terms.html` | UI 용어 사전 · FAB, CTA, GNB·LNB·SNB, 딤, 히어로·KV, 폴드 등 42개 |

## 기능 · Features

- 한국어 / English 전환 (오른쪽 위 `EN` · `한` 버튼, 선택은 브라우저에 저장돼요)
- 라이트 / 다크 모드 전환
- 주제 선택 팝오버와 검색 (한글·영어 이름 모두 검색돼요)
- 카드를 누르면 크게 보기, 키보드 ← → 로 이동, Esc 로 닫기
- 화면에 보이는 카드만 재생하고, 기기의 '동작 줄이기' 설정을 따라요

## 실행 · Run

빌드 과정이 없는 순수 HTML·CSS·JS예요. `index.html`을 브라우저로 열면 돼요.

GitHub Pages로 공개하려면 저장소의 **Settings → Pages → Build and deployment**에서
Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 고르세요.

## 구조 · Structure

```
index.html  ios.html  android.html  motion.html  terms.html
ux.css            공통 스타일 (색 토큰, 라이트·다크 테마, 카드·대화상자)
app.js            렌더링, 주제 선택, 검색, 한/영 전환, 테마, 상세 보기
d*.js             전체 도감 분류별 데이터와 모션 CSS
ios1.js ios2.js   iOS 페이지 데이터
and1.js and2.js   Android 페이지 데이터
anim.js           애니메이션 페이지 데이터 (곡선 그래프를 코드로 생성)
terms.js          UI 용어 페이지 데이터
en*.js            영어 설명
```

각 데이터 파일은 `window.UX` 배열에 `{ id, title, sub, css, items: [{ id, k, e, d, u, html }] }` 형태로 분류를 추가해요.
`k`는 한글 이름, `e`는 영어 이름, `d`는 설명, `u`는 언제 쓰는지, `html`은 예시 마크업이에요.

## 참고 · Notes

- 예시 화면 속 글자는 한국어로 그려져 있어요. 영어 모드에서는 제목·설명·사용법이 영어로 바뀌어요.
- iOS·Android·법령 관련 내용은 작성 시점(2026년 11월)을 기준으로 정리했어요.

---

Made by [@starrykss](https://github.com/starrykss)
