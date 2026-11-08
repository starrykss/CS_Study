(window.UX = window.UX || []).push({
  id: 's-method', short: 'UX 방법론', en: 'UX methods',
  title: '좋은 경험을 만드는 과정',
  sub: 'UX의 절반은 화면이 아니라 과정이에요. 사람을 관찰하고, 가설을 세우고, 작게 만들어 검증해요.',
  css: `
.me-fid .ph{animation:fid-p 6s infinite}
.me-fid .lv{position:absolute;inset:0;padding:1.9em 1em 1em;display:flex;flex-direction:column;gap:.6em;background:var(--ui)}
.me-fid .w .b{border:.12em dashed var(--ink-3);border-radius:.3em;background:none}
.me-fid .w .b.im{display:grid;place-items:center}
.me-fid .w .b.im::before,.me-fid .w .b.im::after{content:"";position:absolute;width:6em;height:.1em;background:var(--ink-3);transform:rotate(30deg)}
.me-fid .w .b.im::after{transform:rotate(-30deg)}
.me-fid .w .b.im{position:relative;overflow:hidden}
.me-fid .m{opacity:0;animation:fid-m 6s steps(1) infinite}
.me-fid .m .im{background:linear-gradient(135deg,var(--accent-soft),var(--accent))}
.me-fid .lb{position:absolute;left:50%;bottom:-2.2em;transform:translateX(-50%);display:grid;font-family:var(--f-mono);font-size:.85em;color:var(--ink-2);white-space:nowrap}
.me-fid .lb span{grid-area:1/1;text-align:center;opacity:0}
.me-fid .l1{animation:fid-1 6s steps(1) infinite}.me-fid .l2{animation:fid-2 6s steps(1) infinite}.me-fid .l3{animation:fid-3 6s steps(1) infinite}
.me-fid .tap{left:50%;top:88%;animation:tap 6s infinite;animation-delay:-4.08s}
.me-fid .wrap2{position:relative;margin-bottom:2em}
.me-fid .bt{margin-top:auto}
@keyframes fid-m{0%{opacity:0}33.3%{opacity:1}}
@keyframes fid-1{0%{opacity:1}33.3%{opacity:0}}
@keyframes fid-2{0%{opacity:0}33.3%{opacity:1}66.6%{opacity:0}}
@keyframes fid-3{0%{opacity:0}66.6%{opacity:1}}
@keyframes fid-p{0%,66%{transform:none}70%{transform:scale(.97)}74%,100%{transform:none}}

.me-ia svg{width:26em;overflow:visible}
.me-ia line{stroke:var(--frame);stroke-width:.8;stroke-dasharray:40;animation:ia-l 4s cubic-bezier(.4,0,.2,1) infinite backwards}
.me-ia rect{fill:var(--ui);stroke:var(--frame);stroke-width:.8;animation:ia-n 4s cubic-bezier(.2,.8,.2,1) infinite backwards;transform-box:fill-box;transform-origin:center}
.me-ia .r0{fill:var(--accent);stroke:var(--accent)}
.me-ia .r1{fill:var(--accent-soft);stroke:var(--accent)}
.me-ia text{font-family:var(--f-txt);font-size:5px;fill:var(--ink);text-anchor:middle;animation:ia-n 4s cubic-bezier(.2,.8,.2,1) infinite backwards;transform-box:fill-box;transform-origin:center}
.me-ia .t0{fill:var(--accent-ink);font-weight:700}
@keyframes ia-l{0%{stroke-dashoffset:40}20%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:40}}
@keyframes ia-n{0%{opacity:0;transform:scale(.6)}10%,90%{opacity:1;transform:none}100%{opacity:0}}

.me-jour .pan{width:25em;padding:1.2em 1.3em 1em}
.me-jour .stg{display:grid;grid-template-columns:repeat(4,1fr);font-size:.8em;font-weight:600;text-align:center;border-bottom:.1em solid var(--rule);padding-bottom:.4em}
.me-jour svg{display:block;width:100%;height:7em;overflow:visible;margin-top:.4em}
.me-jour .ax{stroke:var(--rule);stroke-dasharray:2 2}
.me-jour .cv{fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linecap:round;stroke-dasharray:100;animation:peak-d 4s cubic-bezier(.4,0,.2,1) infinite}
.me-jour .pain{fill:var(--danger);animation:jr-p 4s infinite;transform-box:fill-box;transform-origin:center}
.me-jour .pt{position:absolute;left:52%;top:62%;padding:.2em .55em;border-radius:.4em;background:var(--danger-soft);color:var(--danger);font-size:.72em;font-weight:600;opacity:0;animation:jr-t 4s infinite;white-space:nowrap}
.me-jour .face{display:grid;grid-template-columns:repeat(4,1fr);text-align:center;font-size:1.1em;margin-top:.2em}
@keyframes jr-p{0%,40%{opacity:0;transform:scale(0)}46%{opacity:1;transform:scale(1.8)}52%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes jr-t{0%,46%{opacity:0}54%,90%{opacity:1}100%{opacity:0}}

.me-ab .wr{display:flex;align-items:center;gap:1.4em}
.me-ab .src{display:flex;flex-direction:column;align-items:center;gap:.4em;font-family:var(--f-mono);font-size:.75em;color:var(--ink-3)}
.me-ab .src i{width:3.4em;height:3.4em;border-radius:50%;background:var(--stage);border:.15em solid var(--frame);display:grid;place-items:center;font-style:normal;font-size:1.3em}
.me-ab .flow{position:relative;width:4em;height:12em}
.me-ab .dt{position:absolute;left:0;top:50%;width:.7em;height:.7em;margin-top:-.35em;border-radius:50%;background:var(--ink-3);animation:ab-a 1.6s linear infinite}
.me-ab .dt.b{animation-name:ab-b}
.me-ab .vs2{display:flex;flex-direction:column;gap:1em}
.me-ab .v{display:grid;grid-template-columns:auto 6.4em 3em;align-items:center;gap:.6em}
.me-ab .v .mk{width:5.6em;padding:.6em;display:flex;flex-direction:column;gap:.35em;border-radius:.6em}
.me-ab .v .mk span:last-child{height:1.1em;border-radius:.3em}
.me-ab .va .mk span:last-child{background:var(--line)}
.me-ab .vb .mk span:last-child{background:var(--accent)}
.me-ab .br{height:1em;border-radius:.3em;background:var(--line);overflow:hidden}
.me-ab .br i{display:block;height:100%;transform-origin:left;animation:ab-g 4s cubic-bezier(.3,.7,.2,1) infinite}
.me-ab .va .br i{width:45%;background:var(--ink-3)}.me-ab .vb .br i{width:80%;background:var(--accent)}
.me-ab .pc{font-family:var(--f-mono);font-size:.8em;opacity:0;animation:jr-t 4s infinite}
.me-ab .vb .pc{color:var(--accent);font-weight:500}
@keyframes ab-a{0%{transform:none;opacity:0}15%{opacity:1}100%{transform:translate(4em,-3.4em);opacity:0}}
@keyframes ab-b{0%{transform:none;opacity:0}15%{opacity:1}100%{transform:translate(4em,3.4em);opacity:0}}
@keyframes ab-g{0%,20%{transform:scaleX(0)}60%,90%{transform:none}100%{transform:scaleX(0)}}

.me-test .wr{display:flex;flex-direction:column;align-items:center;gap:1.2em;width:24em}
.me-test .us{display:flex;gap:.8em}
.me-test .us i{width:2.8em;height:2.8em;border-radius:50%;background:var(--accent-soft);border:.15em solid var(--accent);animation:tst-u 6s cubic-bezier(.2,.8,.2,1.3) infinite backwards}
.me-test .us i:nth-child(2){animation-delay:.6s}.me-test .us i:nth-child(3){animation-delay:1.2s}.me-test .us i:nth-child(4){animation-delay:1.8s}.me-test .us i:nth-child(5){animation-delay:2.4s}
.me-test .br{position:relative;width:100%;height:1.6em;border-radius:.4em;background:var(--line);overflow:hidden}
.me-test .br b{position:absolute;left:0;top:0;bottom:0;background:var(--accent);animation:tst-w 6s steps(1) infinite}
.me-test .nm{display:flex;justify-content:space-between;width:100%;font-family:var(--f-mono);font-size:.8em;color:var(--ink-2)}
.me-test .pc{display:grid}.me-test .pc span{grid-area:1/1;opacity:0}
.me-test .p1{animation:tst-1 6s steps(1) infinite}.me-test .p2{animation:tst-2 6s steps(1) infinite}.me-test .p3{animation:tst-3 6s steps(1) infinite}.me-test .p4{animation:tst-4 6s steps(1) infinite}.me-test .p5{animation:tst-5 6s steps(1) infinite}
@keyframes tst-u{0%{opacity:0;transform:scale(.4)}5%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes tst-w{0%{width:31%}10%{width:52%}20%{width:67%}30%{width:77%}40%{width:84%}92%{width:0}}
@keyframes tst-1{0%{opacity:1}10%{opacity:0}}
@keyframes tst-2{0%{opacity:0}10%{opacity:1}20%{opacity:0}}
@keyframes tst-3{0%{opacity:0}20%{opacity:1}30%{opacity:0}}
@keyframes tst-4{0%{opacity:0}30%{opacity:1}40%{opacity:0}}
@keyframes tst-5{0%{opacity:0}40%{opacity:1}92%{opacity:0}}

.me-token .wr{display:flex;align-items:center;gap:1.6em}
.me-token .tk{display:flex;flex-direction:column;gap:.4em;padding:1em;border-radius:.8em;font-family:var(--f-mono);font-size:.8em}
.me-token .tk b{font-weight:500}
.me-token .sw{display:flex;align-items:center;gap:.5em}
.me-token .sw i{width:1.6em;height:1.6em;border-radius:.4em;animation:tok-c 4s steps(1) infinite}
.me-token .hx{display:grid}.me-token .hx span{grid-area:1/1}
.me-token .h1{animation:btln-1 4s steps(1) infinite;animation-delay:-.24s}.me-token .h2{opacity:0;animation:btln-2 4s steps(1) infinite;animation-delay:-.24s}
.me-token .cp{display:flex;flex-direction:column;gap:.8em;padding:1.2em;border-radius:.8em}
.me-token .cp .bt{animation:tok-b 4s steps(1) infinite}
.me-token .cp .tg{animation:tok-b 4s steps(1) infinite}
.me-token .cp .tg b{transform:translateX(2em)}
.me-token .lk{font-size:.9em;font-weight:600;text-decoration:underline;animation:tok-t 4s steps(1) infinite}
.me-token .ar{font-size:1.4em;color:var(--ink-3)}
@keyframes tok-c{0%{background:#0C9B72}40%{background:#5B4BFF}92%{background:#0C9B72}}
@keyframes tok-b{0%{background:#0C9B72}40%{background:#5B4BFF}92%{background:#0C9B72}}
@keyframes tok-t{0%{color:#0C9B72}40%{color:#5B4BFF}92%{color:#0C9B72}}
`,
  items: [
    {
      id: 'me-fid', k: '와이어프레임 → 목업 → 프로토타입', e: 'Wireframe · Mockup · Prototype',
      d: '와이어프레임은 배치만 잡은 뼈대, 목업은 색과 글자까지 입힌 완성 이미지, 프로토타입은 실제처럼 눌러 볼 수 있는 시안이에요.',
      u: '아이디어 단계에서는 빠르게 버릴 수 있는 와이어프레임으로, 보고나 브랜드 검토에는 목업으로, 사용성 테스트에는 프로토타입으로 시작하세요. 처음부터 완성도를 높이면 수정이 아까워서 틀린 방향을 고집하게 돼요.',
      html: `<div class="wrap2"><div class="ph s"><div class="lv w"><span class="ln b" style="width:50%;height:1em"></span><span class="b im" style="height:4.4em"></span><span class="ln b" style="width:90%"></span><span class="ln b" style="width:70%"></span><span class="b" style="margin-top:auto;height:2.2em"></span></div><div class="lv m"><span class="ln h" style="width:50%"></span><span class="im" style="height:4.4em"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="bt">시작하기</span></div><span class="tap"></span></div><div class="lb"><span class="l1">와이어프레임</span><span class="l2">목업</span><span class="l3">프로토타입 · 눌러 보기</span></div></div>`
    },
    {
      id: 'me-ia', k: '정보 구조', e: 'Information architecture',
      d: '서비스 안의 화면과 콘텐츠를 어떤 묶음과 단계로 나눌지 정한 지도예요. 메뉴와 내비게이션은 이 구조를 화면에 옮긴 결과예요.',
      u: '사용자가 직접 카드를 분류해 보게 하는 카드 소팅으로 사람들의 머릿속 분류를 확인하세요. 회사 조직도대로 메뉴를 나누면 사용자는 길을 잃어요. 깊이는 3단계 안쪽이 찾기 쉬워요.',
      html: `<svg viewBox="0 0 160 90"><line x1="80" y1="18" x2="30" y2="44" style="animation-delay:.2s"/><line x1="80" y1="18" x2="80" y2="44" style="animation-delay:.25s"/><line x1="80" y1="18" x2="130" y2="44" style="animation-delay:.3s"/><line x1="30" y1="52" x2="15" y2="74" style="animation-delay:.5s"/><line x1="30" y1="52" x2="45" y2="74" style="animation-delay:.55s"/><line x1="80" y1="52" x2="80" y2="74" style="animation-delay:.6s"/><line x1="130" y1="52" x2="115" y2="74" style="animation-delay:.65s"/><line x1="130" y1="52" x2="145" y2="74" style="animation-delay:.7s"/><rect class="r0" x="62" y="6" width="36" height="13" rx="3"/><text class="t0" x="80" y="14.5">홈</text><rect class="r1" x="12" y="40" width="36" height="13" rx="3" style="animation-delay:.3s"/><text x="30" y="48.5" style="animation-delay:.3s">면접 연습</text><rect class="r1" x="62" y="40" width="36" height="13" rx="3" style="animation-delay:.35s"/><text x="80" y="48.5" style="animation-delay:.35s">기록</text><rect class="r1" x="112" y="40" width="36" height="13" rx="3" style="animation-delay:.4s"/><text x="130" y="48.5" style="animation-delay:.4s">내 정보</text><rect x="2" y="72" width="27" height="11" rx="2" style="animation-delay:.6s"/><text x="15.5" y="79.5" style="animation-delay:.6s">직무별</text><rect x="32" y="72" width="27" height="11" rx="2" style="animation-delay:.65s"/><text x="45.5" y="79.5" style="animation-delay:.65s">AI 면접</text><rect x="66.5" y="72" width="27" height="11" rx="2" style="animation-delay:.7s"/><text x="80" y="79.5" style="animation-delay:.7s">리포트</text><rect x="101.5" y="72" width="27" height="11" rx="2" style="animation-delay:.75s"/><text x="115" y="79.5" style="animation-delay:.75s">이력서</text><rect x="131.5" y="72" width="27" height="11" rx="2" style="animation-delay:.8s"/><text x="145" y="79.5" style="animation-delay:.8s">설정</text></svg>`
    },
    {
      id: 'me-jour', k: '사용자 여정 지도', e: 'User journey map',
      d: '사용자가 서비스를 알게 되고, 가입하고, 쓰고, 결제하기까지 단계별로 무엇을 하고 어떤 기분인지 한 장에 그린 지도예요.',
      u: '실제 인터뷰와 데이터로 그려야 의미가 있어요. 감정이 가장 낮은 지점(페인 포인트)이 개선 1순위예요. 화면 단위가 아니라 사용자의 목표 단위로 단계를 나누세요.',
      html: `<div class="pan box" style="position:relative"><div class="stg"><span>알게 됨</span><span>가입</span><span>첫 연습</span><span>결제</span></div><svg viewBox="0 0 200 70" preserveAspectRatio="none"><line class="ax" x1="0" y1="35" x2="200" y2="35"/><path class="cv" pathLength="100" d="M12 28 C40 18 55 22 70 40 S100 62 112 56 S150 18 188 14"/><circle class="pain" cx="112" cy="56" r="4.5"/></svg><span class="pt">회원가입이 너무 길어요</span><div class="face"><span>🙂</span><span>😐</span><span>😣</span><span>😀</span></div></div>`
    },
    {
      id: 'me-ab', k: 'A/B 테스트', e: 'A/B testing',
      d: '사용자를 무작위로 두 그룹으로 나눠 서로 다른 버전을 보여주고, 어느 쪽이 목표 행동을 더 많이 만드는지 숫자로 비교해요.',
      u: '한 번에 하나만 바꾸고, 미리 정한 기간과 표본 수를 채운 뒤 판단하세요. 중간에 결과를 보고 멈추면 우연을 실력으로 착각하기 쉬워요. 숫자는 "무엇이" 나은지 알려주지만 "왜"는 인터뷰로 알아내야 해요.',
      html: `<div class="wr"><div class="src"><i></i>방문자</div><div class="flow"><i class="dt"></i><i class="dt b" style="animation-delay:-.4s"></i><i class="dt" style="animation-delay:-.8s"></i><i class="dt b" style="animation-delay:-1.2s"></i></div><div class="vs2"><div class="v va"><span class="cap">A</span><div><div class="br"><i></i></div></div><span class="pc">4.5%</span></div><div class="v vb"><span class="cap">B</span><div><div class="br"><i></i></div></div><span class="pc">8.0%</span></div></div></div>`
    },
    {
      id: 'me-test', k: '사용성 테스트', e: 'Usability testing',
      d: '실제 사용자에게 과제를 주고 화면을 쓰는 모습을 지켜보며 어디서 막히는지 찾는 방법이에요.',
      u: '제이콥 닐슨의 분석에 따르면 5명만 테스트해도 주요 문제의 약 85%를 찾을 수 있어요. 한 번에 많이 하기보다 5명씩 여러 번, 고치고 다시 테스트하세요. 도와주거나 설명하지 말고 생각을 소리 내어 말하게 하세요.',
      html: `<div class="wr"><div class="us"><i></i><i></i><i></i><i></i><i></i></div><div class="br"><b></b></div><div class="nm"><span>발견한 문제 비율</span><span class="pc"><span class="p1">1명 · 31%</span><span class="p2">2명 · 52%</span><span class="p3">3명 · 67%</span><span class="p4">4명 · 77%</span><span class="p5">5명 · 85%</span></span></div></div>`
    },
    {
      id: 'me-token', k: '디자인 토큰', e: 'Design system · Tokens',
      d: '색, 글자 크기, 간격 같은 디자인 결정에 이름을 붙여 한곳에서 관리하는 값이에요. 토큰 하나를 바꾸면 그 값을 쓰는 모든 컴포넌트가 함께 바뀌어요.',
      u: '"#0C9B72" 대신 "color.primary"처럼 의미로 이름을 붙이면 다크 모드나 리브랜딩 때 값만 바꾸면 돼요. 디자인 시스템은 토큰 → 컴포넌트 → 패턴 순으로 쌓고, 피그마와 코드가 같은 이름을 쓰게 맞추세요.',
      html: `<div class="wr"><div class="tk box"><b>color.primary</b><span class="sw"><i></i><span class="hx"><span class="h1">#0C9B72</span><span class="h2">#5B4BFF</span></span></span></div><span class="ar">→</span><div class="cp box"><span class="bt">저장하기</span><span class="tg"><b></b></span><span class="lk">자세히 보기</span></div></div>`
    }
  ]
});
