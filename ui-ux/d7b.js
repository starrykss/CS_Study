(() => {
const s = window.UX.find(x => x.id === 's-os');
s.css += `
.o-act .nv{display:flex;align-items:center;justify-content:space-between;font-size:.9em;font-weight:700;margin-top:-.3em}
.o-act .nv b{font-size:1.5em;font-weight:400;color:#0A84FF;line-height:1}
.o-act .fab{position:absolute;right:.9em;bottom:1em;width:2.8em;height:2.8em;border-radius:.9em;background:var(--accent-soft);color:var(--ink);display:grid;place-items:center;font-size:1.4em;font-weight:400;line-height:1;width:1.9em;height:1.9em;border-radius:.6em;box-shadow:0 .2em .5em -.2em rgba(0,0,0,.4);animation:press 4s infinite;animation-delay:-.4s}
.o-act .ios .tap{left:86%;top:13%;animation-delay:-.4s}
.o-act .and .tap{left:76%;top:83%;animation-delay:-.4s}

.o-long .it{display:flex;align-items:center;gap:.5em;padding:.45em .3em;border-radius:.6em;background:var(--ui);position:relative}
.o-long .it .ln{flex:1}
.o-long .ios .dm{backdrop-filter:blur(.3em);-webkit-backdrop-filter:blur(.3em);animation:long-d 4s infinite}
.o-long .lf{position:absolute;left:1em;right:1em;top:7.05em;z-index:3;box-shadow:0 .6em 1.4em -.4em rgba(0,0,0,.4);opacity:0;animation:long-l 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.o-long .mn{position:absolute;left:1em;width:6.4em;top:10.3em;z-index:3;display:flex;flex-direction:column;border-radius:.8em;overflow:hidden;transform-origin:20% 0;animation:long-m 4s cubic-bezier(.2,.8,.2,1) infinite}
.o-long .mn span{font-size:.8em;padding:.45em .7em;border-bottom:.1em solid var(--rule)}
.o-long .mn .del{color:var(--danger);border:0}
.o-long .ios .tap{left:50%;top:48%;animation:long-t 4s infinite}
.o-long .cab{position:absolute;left:0;right:0;top:0;height:3.2em;padding:1.3em 1em 0;display:flex;align-items:center;gap:.5em;font-size:.82em;font-weight:600;background:var(--accent-soft);z-index:2;opacity:0;animation:long-c 4s infinite}
.o-long .cab i{margin-left:auto;width:1em;height:1.1em;border:.14em solid var(--ink);border-top-width:.3em;border-radius:0 0 .2em .2em}
.o-long .and .it .x{width:0;border-width:0;overflow:hidden;animation:long-x 4s infinite}
.o-long .and .it.s{animation:long-s 4s infinite}
.o-long .and .it.s .x{animation:long-x 4s infinite,long-xs 4s infinite}
.o-long .and .tap{left:50%;top:48%;animation:long-t 4s infinite}
@keyframes long-t{0%,10%{opacity:0;transform:scale(.5)}14%{opacity:.18;transform:scale(.8)}28%{opacity:.3;transform:scale(1.3)}32%,100%{opacity:0;transform:scale(1.5)}}
@keyframes long-d{0%,28%{opacity:0}34%,82%{opacity:1}90%,100%{opacity:0}}
@keyframes long-l{0%,28%{opacity:0;transform:none}34%,82%{opacity:1;transform:scale(1.05)}90%,100%{opacity:0;transform:none}}
@keyframes long-m{0%,30%{opacity:0;transform:scale(.6)}38%,82%{opacity:1;transform:none}90%,100%{opacity:0;transform:scale(.9)}}
@keyframes long-c{0%,28%{opacity:0}34%,82%{opacity:1}90%,100%{opacity:0}}
@keyframes long-x{0%,28%{width:0;border-width:0}34%,82%{width:1.4em;border-width:.16em}90%,100%{width:0;border-width:0}}
@keyframes long-xs{0%,28%{background:transparent;border-color:var(--ink-3);color:transparent}32%,82%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}90%,100%{background:transparent;color:transparent}}
@keyframes long-s{0%,28%{background:var(--ui)}32%,82%{background:var(--accent-soft)}90%,100%{background:var(--ui)}}

.o-unit .wr{display:flex;align-items:center;gap:2.2em}
.o-unit .sq{position:relative;width:8.8em;height:8.8em;border-radius:1.2em;background-color:var(--accent-soft);border:.14em solid var(--accent);background-image:linear-gradient(var(--line) .06em,transparent .06em),linear-gradient(90deg,var(--line) .06em,transparent .06em);animation:unit-g 6s steps(1) infinite}
.o-unit .sq b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--f-mono);font-size:1.4em;font-weight:500;color:var(--accent)}
.o-unit .ls{display:flex;flex-direction:column;gap:.7em;font-family:var(--f-mono);font-size:.95em;font-variant-numeric:tabular-nums}
.o-unit .ls span{color:var(--ink-3)}
.o-unit .l1{animation:unit-1 6s steps(1) infinite}.o-unit .l2{animation:unit-2 6s steps(1) infinite}.o-unit .l3{animation:unit-3 6s steps(1) infinite}
.o-unit .ls em{font-style:normal;font-family:var(--f-txt);font-size:.85em;color:var(--ink-2);margin-top:.4em;line-height:1.5}
@keyframes unit-g{0%{background-size:100% 100%,100% 100%}33.3%{background-size:50% 50%,50% 50%}66.6%{background-size:33.33% 33.33%,33.33% 33.33%}}
@keyframes unit-1{0%{color:var(--ink)}33.3%{color:var(--ink-3)}}
@keyframes unit-2{0%{color:var(--ink-3)}33.3%{color:var(--ink)}66.6%{color:var(--ink-3)}}
@keyframes unit-3{0%{color:var(--ink-3)}66.6%{color:var(--ink)}}

.o-safe .isl{position:absolute;left:50%;top:.6em;width:3.6em;height:1.1em;margin-left:-1.8em;border-radius:1em;background:#000;z-index:4}
.o-safe .hi{position:absolute;left:50%;bottom:.5em;width:4em;height:.3em;margin-left:-2em;border-radius:1em;background:var(--ink);z-index:4}
.o-safe .zn{position:absolute;left:0;right:0;z-index:3;background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--danger) 30%,transparent) 0 .35em,transparent .35em .7em);border:0 dashed var(--danger);display:grid;place-items:center;font-family:var(--f-mono);font-size:.65em;color:var(--danger);opacity:0;animation:safe-z 4s infinite}
.o-safe .zt{top:0;height:2.6em;border-bottom-width:.12em}
.o-safe .zb{bottom:0;height:1.8em;border-top-width:.12em}
.o-safe .scr{padding-top:3.1em}
.o-safe .scr .im{animation:safe-c 4s infinite}
@keyframes safe-z{0%,16%{opacity:0}26%,80%{opacity:1}90%,100%{opacity:0}}
@keyframes safe-c{0%,16%{box-shadow:none}26%,80%{box-shadow:0 0 0 .15em var(--accent)}90%,100%{box-shadow:none}}

.o-island .ph{background:var(--stage)}
.o-island .il{position:absolute;left:50%;top:.6em;height:1.4em;width:4.4em;transform:translateX(-50%);border-radius:1em;background:#000;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 .5em;overflow:hidden;z-index:3;animation:isl-k 5s cubic-bezier(.3,.8,.2,1.1) infinite}
.o-island .il .dt{width:.7em;height:.7em;border-radius:50%;background:#34C759;flex:none;animation:isl-o 5s infinite}
.o-island .il .tm{font-family:var(--f-mono);font-size:.65em;color:#FF9F0A;animation:isl-o 5s infinite}
.o-island .ex{position:absolute;inset:.9em 1em;display:flex;flex-direction:column;gap:.5em;opacity:0;animation:isl-e 5s infinite}
.o-island .ex .rw{justify-content:space-between;font-size:.75em}
.o-island .ex b{font-size:1.25em}
.o-island .ex .pg{height:.35em;border-radius:1em;background:rgba(255,255,255,.25);overflow:hidden}
.o-island .ex .pg i{display:block;height:100%;width:60%;background:#34C759;border-radius:1em}
.o-island .ex span{color:rgba(255,255,255,.7)}
@keyframes isl-k{0%,20%{width:4.4em;height:1.4em;top:.6em;border-radius:1em}32%,66%{width:10.6em;height:5.2em;top:.5em;border-radius:1.8em}78%,100%{width:4.4em;height:1.4em;top:.6em;border-radius:1em}}
@keyframes isl-o{0%,20%{opacity:1}26%,72%{opacity:0}80%,100%{opacity:1}}
@keyframes isl-e{0%,28%{opacity:0}36%,62%{opacity:1}70%,100%{opacity:0}}

.o-hapt .ph{animation:hapt-s 4s infinite}
.o-hapt .scr{justify-content:center;align-items:center;gap:1.2em}
.o-hapt .tg{animation:tgT 4s infinite;transform:scale(1.3)}
.o-hapt .tg b{animation:tgK 4s cubic-bezier(.3,.7,.3,1) infinite}
.o-hapt .wv{position:absolute;top:50%;width:1.6em;height:5em;margin-top:-2.5em;border:.18em solid var(--accent);border-color:transparent var(--accent) transparent transparent;border-radius:50%;opacity:0;animation:hapt-w 4s infinite}
.o-hapt .w1{right:-3em}.o-hapt .w2{right:-4em;animation-delay:.08s;animation-fill-mode:backwards}
.o-hapt .w3{left:-3em;transform:scaleX(-1);animation-name:hapt-w2}.o-hapt .w4{left:-4em;transform:scaleX(-1);animation-name:hapt-w2;animation-delay:.08s;animation-fill-mode:backwards}
.o-hapt .wrap2{position:relative}
.o-hapt .lb{font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
@keyframes hapt-s{0%,22%,32%,100%{transform:none}24%{transform:translateX(-.15em)}26%{transform:translateX(.15em)}28%{transform:translateX(-.1em)}30%{transform:translateX(.08em)}}
@keyframes hapt-w{0%,22%{opacity:0;transform:none}26%{opacity:1}36%,100%{opacity:0;transform:translateX(.8em)}}
@keyframes hapt-w2{0%,22%{opacity:0;transform:scaleX(-1)}26%{opacity:1}36%,100%{opacity:0;transform:scaleX(-1) translateX(.8em)}}
`;
s.items.push(
  {
    id: 'o-act', k: '주요 행동 위치', e: 'Primary action placement',
    d: 'iOS는 새로 만들기 같은 주요 행동을 화면 위 오른쪽 버튼에, 안드로이드는 오른쪽 아래 떠 있는 버튼(FAB)에 두는 경우가 많아요.',
    u: '플랫폼 관습을 따르되 자주 쓰는 행동일수록 엄지가 닿는 아래쪽이 편해요. iOS에서도 하단 툴바에 두는 경우가 있으니, 사용 빈도와 한 손 조작을 함께 고려하세요.',
    html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="scr"><div class="nv"><span>메모</span><b>+</b></div><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><span class="tap"></span></div><span class="cap">iOS · 오른쪽 위</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="scr"><div class="nv"><span>메모</span></div><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><span class="fab">+</span><span class="tap"></span></div><span class="cap">Android · FAB</span></div>
</div>`
  },
  {
    id: 'o-long', k: '길게 누르기', e: 'Long press · Context menu vs Selection',
    d: 'iOS는 길게 누르면 항목이 떠오르고 뒤가 흐려지며 메뉴가 나오고, 안드로이드는 길게 누르면 여러 개를 고르는 선택 모드로 들어가는 경우가 많아요.',
    u: '길게 누르기는 눈에 보이지 않는 기능이라 꼭 다른 길(케밥 메뉴, 편집 버튼)도 함께 만드세요. 안드로이드 선택 모드에서는 상단 바가 "1개 선택됨"과 동작 버튼으로 바뀌어야 상태를 알 수 있어요.',
    html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="scr"><span class="ln h" style="width:45%"></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span></div><span class="dm"></span><span class="it lf"><span class="av"></span><span class="ln"></span></span><div class="mn box"><span>복사</span><span>공유</span><span class="del">삭제</span></div><span class="tap"></span></div><span class="cap">iOS · 메뉴</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="cab">1개 선택됨<i></i></div><div class="scr"><span class="ln h" style="width:45%"></span><span class="it"><span class="x"></span><span class="av"></span><span class="ln"></span></span><span class="it s"><span class="x"></span><span class="av"></span><span class="ln"></span></span><span class="it"><span class="x"></span><span class="av"></span><span class="ln"></span></span><span class="it"><span class="x"></span><span class="av"></span><span class="ln"></span></span></div><span class="tap"></span></div><span class="cap">Android · 선택 모드</span></div>
</div>`
  },
  {
    id: 'o-unit', k: 'pt와 dp', e: 'Points vs Density-independent pixels',
    d: 'iOS의 pt와 안드로이드의 dp는 화면 밀도와 상관없이 같은 크기로 보이게 하는 논리 단위예요. 실제 픽셀 수는 기기에 따라 2배, 3배로 늘어나요.',
    u: '디자인은 pt·dp 기준으로 하고, 이미지는 @2x·@3x(iOS)나 xhdpi·xxhdpi(안드로이드)로 내보내세요. 최소 터치 영역은 iOS 44pt, 안드로이드 48dp예요. 안드로이드 글자 크기는 사용자 설정에 따라 커지는 sp 단위를 써요.',
    html: `<div class="wr"><div class="sq"><b>44pt</b></div><div class="ls"><span class="l1">@1x · 44px</span><span class="l2">@2x · 88px</span><span class="l3">@3x · 132px</span><em>안드로이드는 48dp</em></div></div>`
  },
  {
    id: 'o-safe', k: '안전 영역', e: 'Safe area · Edge-to-edge',
    d: '노치, 다이내믹 아일랜드, 홈 인디케이터, 둥근 모서리에 가려지지 않는 영역이에요. 배경은 화면 끝까지, 글자와 버튼은 안전 영역 안에 둬요.',
    u: 'iOS는 safe area, 안드로이드는 window insets로 이 여백을 알려줘요. 최근 안드로이드는 앱이 화면 끝까지 그리는 엣지 투 엣지가 기본이라, 하단 버튼이 제스처 막대에 겹치지 않는지 꼭 확인하세요.',
    html: `<div class="ph"><span class="isl"></span><span class="zn zt">상태 표시줄</span><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span><span class="ln" style="width:75%"></span><span class="bt" style="margin-top:auto;margin-bottom:.9em">결제하기</span></div><span class="zn zb">홈 인디케이터</span><span class="hi"></span></div>`
  },
  {
    id: 'o-island', k: '다이내믹 아일랜드', e: 'Dynamic Island · Live Activity',
    d: '아이폰 화면 위 카메라 구멍 주변의 검은 영역이 늘어나며 타이머, 배달, 통화 같은 진행 중인 정보를 보여줘요.',
    u: '배달·택시·운동처럼 몇 분~몇 시간 이어지는 상태에 써요. 광고나 단발성 알림에 쓰면 안 돼요. 안드로이드에서는 진행 상황을 보여주는 상단 알림으로 비슷한 역할을 해요.',
    html: `<div class="ph"><div class="il"><span class="dt"></span><span class="tm">12분</span><div class="ex"><span class="rw"><b>배달 중</b><span>12분 남음</span></span><span class="pg"><i></i></span><span class="rw"><span>가게 출발</span><span>도착</span></span></div></div><div class="scr" style="background:none;padding-top:3em"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span></div></div>`
  },
  {
    id: 'o-hapt', k: '햅틱 피드백', e: 'Haptic feedback',
    d: '스위치를 켜거나 결제가 끝나는 순간 짧은 진동으로 손끝에 반응을 전해요.',
    u: '완료·오류·선택 변경처럼 의미 있는 순간에만 짧게 쓰세요. 모든 탭마다 진동하면 금방 피곤해요. iOS와 안드로이드 모두 성공·경고·가벼운 탭처럼 미리 정해진 진동 종류가 있으니 그걸 쓰는 게 좋아요.',
    html: `<div class="wrap2"><div class="ph s"><div class="scr"><span class="tg"><b></b></span><span class="lb">무음 모드</span></div></div><i class="wv w1"></i><i class="wv w2"></i><i class="wv w3"></i><i class="wv w4"></i></div>`
  }
);
})();
