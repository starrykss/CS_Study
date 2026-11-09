window.IOSX = { css: '', items: {} };
(() => {
const X = window.IOSX;
X.css += `
.sc .inb{display:flex;align-items:center;justify-content:space-between;height:1.6em;font-size:.8em;margin-top:-.3em;flex:none}
.sc .inb .a2{color:var(--accent)}
.sc .inb b{font-weight:600}
.sc .lt2{font-size:1.85em;font-weight:800;letter-spacing:-.02em;line-height:1.15;flex:none}
.sc .igrp{display:flex;flex-direction:column;border-radius:.8em;background:var(--ui);overflow:hidden;flex:none}
.sc .irow{display:flex;align-items:center;gap:.6em;padding:.55em .75em;font-size:.75em;border-bottom:.08em solid var(--rule)}
.sc .irow:last-child{border-bottom:0}
.sc .irow .t4{width:1.8em;height:1.8em;border-radius:.45em;flex:none}
.sc .chv{margin-left:auto;color:var(--ink-3);font-size:1.3em;line-height:1}
.sc .isw{position:relative;width:3.2em;height:1.95em;border-radius:1em;background:var(--line);flex:none;margin-left:auto}
.sc .isw b{position:absolute;top:.15em;left:.15em;width:1.65em;height:1.65em;border-radius:50%;background:#fff;box-shadow:0 .1em .3em rgba(0,0,0,.25)}
.sc .isw.on{background:#34C759}.sc .isw.on b{transform:translateX(1.25em)}
.sc .ios-g{background:var(--stage)}
.sc .ios-g .scr{background:var(--stage)}
@keyframes isw-t{0%,20%{background:var(--line)}26%,84%{background:#34C759}90%,100%{background:var(--line)}}
@keyframes isw-k{0%,20%{transform:none}26%,84%{transform:translateX(1.25em)}90%,100%{transform:none}}

.io-type .scr{gap:.6em}
.io-type .dyn{display:flex;flex-direction:column;gap:.5em;animation:dyn-k 6s steps(1) infinite}
.io-type .dyn b{font-size:1.1em;font-weight:700;line-height:1.25}
.io-type .dyn span{font-size:.8em;line-height:1.45;color:var(--ink-2)}
.io-type .lb3{display:grid;position:absolute;left:50%;bottom:1em;transform:translateX(-50%);z-index:2}
.io-type .lb3 span{grid-area:1/1;opacity:0;padding:.3em .8em;border-radius:1em;background:var(--ink);color:var(--bg);font-size:.65em;font-weight:600;white-space:nowrap;animation:cyc3 6s steps(1) infinite}
@keyframes dyn-k{0%{font-size:.8em}33.3%{font-size:1em}66.6%{font-size:1.4em}}

.io-tab .scr{padding-bottom:4em}
.io-tab .mv{display:flex;flex-direction:column;gap:.6em;animation:iot-s 5s cubic-bezier(.4,0,.2,1) infinite}
.io-tab .gb{position:absolute;left:.6em;bottom:.8em;height:3em;width:calc(100% - 1.2em);border-radius:1.6em;display:grid;grid-template-columns:repeat(4,1fr);align-items:center;background:color-mix(in srgb,var(--ui) 55%,transparent);-webkit-backdrop-filter:blur(.4em) saturate(1.6);backdrop-filter:blur(.4em) saturate(1.6);box-shadow:inset .06em .08em .08em rgba(255,255,255,.7),0 .4em 1em -.4em rgba(0,0,0,.35);overflow:hidden;animation:iot-b 5s cubic-bezier(.4,0,.2,1) infinite}
.io-tab .gb span{display:flex;flex-direction:column;align-items:center;gap:.1em;font-size:.5em;color:var(--ink-2);white-space:nowrap}
.io-tab .gb span i{width:2.2em;height:2.2em;border-radius:.6em;border:.25em solid currentColor}
.io-tab .gb .on{color:var(--accent)}
.io-tab .gb span:not(.on){animation:iot-o 5s infinite}
.io-tab .sr2{position:absolute;right:.6em;bottom:.8em;width:3em;height:3em;border-radius:50%;background:color-mix(in srgb,var(--ui) 55%,transparent);-webkit-backdrop-filter:blur(.4em);backdrop-filter:blur(.4em);box-shadow:inset .06em .08em .08em rgba(255,255,255,.7),0 .4em 1em -.4em rgba(0,0,0,.35);display:grid;place-items:center;opacity:0;animation:iot-r 5s infinite}
.io-tab .sr2::before{content:"";width:.9em;height:.9em;border:.16em solid var(--ink-2);border-radius:50%}
@keyframes iot-s{0%,15%{transform:none}45%,80%{transform:translateY(-6em)}95%,100%{transform:none}}
@keyframes iot-b{0%,20%{width:calc(100% - 1.2em)}40%,80%{width:3em}95%,100%{width:calc(100% - 1.2em)}}
@keyframes iot-o{0%,20%{opacity:1}30%,85%{opacity:0}95%,100%{opacity:1}}
@keyframes iot-r{0%,32%{opacity:0;transform:scale(.6)}42%,80%{opacity:1;transform:none}90%,100%{opacity:0}}

.io-nav .bar4{position:absolute;left:0;right:0;top:0;height:3.2em;padding:1.4em 1em 0;display:flex;align-items:center;justify-content:space-between;font-size:.8em;z-index:2;background:var(--stage);animation:ion-b 4s cubic-bezier(.4,0,.2,1) infinite}
.io-nav .bar4 b{opacity:0;font-weight:600;animation:ion-t 4s cubic-bezier(.4,0,.2,1) infinite}
.io-nav .bar4 .a2{color:var(--accent)}
.io-nav .scr{padding-top:3em}
.io-nav .mv{display:flex;flex-direction:column;gap:.7em;animation:ion-s 4s cubic-bezier(.4,0,.2,1) infinite}
.io-nav .lt2{animation:ion-l 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes ion-s{0%,18%{transform:none}46%,80%{transform:translateY(-4.2em)}96%,100%{transform:none}}
@keyframes ion-l{0%,24%{opacity:1}40%,84%{opacity:0}94%,100%{opacity:1}}
@keyframes ion-t{0%,30%{opacity:0}44%,80%{opacity:1}92%,100%{opacity:0}}
@keyframes ion-b{0%,30%{box-shadow:none}44%,80%{box-shadow:0 .06em 0 var(--rule)}92%,100%{box-shadow:none}}

.io-push .trk{position:absolute;inset:0;display:flex;width:200%;animation:iop-k 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-push .trk>div{position:relative;width:50%;padding:1.9em .8em 1em;display:flex;flex-direction:column;gap:.6em;background:var(--stage)}
.io-push .trk>div+div{box-shadow:-.4em 0 1em -.5em rgba(0,0,0,.3)}
.io-push .t1{left:50%;top:39%;animation-delay:-1.32s}
.io-push .dr{left:5%;top:50%;animation:iop-f 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-push .im{height:5em}
@keyframes iop-k{0%,24%{transform:none}34%,56%{transform:translateX(-50%)}82%,100%{transform:none}}
@keyframes iop-f{0%,58%{opacity:0;transform:none}61%{opacity:.28;transform:none}80%{opacity:.28;transform:translateX(7em)}84%,100%{opacity:0;transform:translateX(7em)}}

.io-sheet .ph{background:#000}
.io-sheet .bg2{position:absolute;inset:0;padding:1.9em 1em;display:flex;flex-direction:column;gap:.6em;background:var(--stage);transform-origin:50% 0;animation:ish-b 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-sheet .sh2{position:absolute;left:0;right:0;bottom:0;height:calc(100% - 2.4em);padding:.6em 1em;display:flex;flex-direction:column;gap:.6em;background:var(--ui);border-radius:1.4em 1.4em 0 0;box-shadow:0 -.3em 1em -.4em rgba(0,0,0,.3);animation:ish-s 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-sheet .gr2{display:block;width:2.4em;height:.3em;border-radius:1em;background:var(--line);margin:0 auto .2em}
.io-sheet .dr{left:50%;top:52%;animation:ish-f 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-sheet .lbl2{position:absolute;right:.6em;top:2.2em;display:grid;font-size:.6em;z-index:3}
.io-sheet .lbl2 span{grid-area:1/1;padding:.2em .6em;border-radius:1em;background:var(--ink);color:var(--bg);opacity:0}
.io-sheet .m1{animation:ish-1 5s steps(1) infinite}.io-sheet .m2{animation:ish-2 5s steps(1) infinite}
@keyframes ish-s{0%,8%{transform:translateY(100%)}20%,36%{transform:translateY(48%)}56%,80%{transform:none}92%,100%{transform:translateY(100%)}}
@keyframes ish-b{0%,36%{transform:none;border-radius:0}56%,80%{transform:scale(.92) translateY(.5em);border-radius:1.2em}92%,100%{transform:none;border-radius:0}}
@keyframes ish-f{0%,36%{opacity:0;transform:none}40%{opacity:.28;transform:none}56%{opacity:.28;transform:translateY(-8em)}60%,100%{opacity:0;transform:translateY(-8em)}}
@keyframes ish-1{0%{opacity:0}20%{opacity:1}50%{opacity:0}}
@keyframes ish-2{0%{opacity:0}56%{opacity:1}88%{opacity:0}}

.io-search .scr{gap:.6em}
.io-search .lt2{animation:ise-l 5s cubic-bezier(.4,0,.2,1) infinite}
.io-search .sf{display:flex;align-items:center;gap:.5em}
.io-search .sf span{flex:1;display:flex;align-items:center;gap:.4em;height:2.1em;padding:0 .7em;border-radius:.7em;background:color-mix(in srgb,var(--ink-3) 15%,transparent);font-size:.75em;color:var(--ink-3)}
.io-search .sf span::before{content:"";width:.8em;height:.8em;border:.14em solid currentColor;border-radius:50%}
.io-search .sf b{font-size:.75em;font-weight:400;color:var(--accent);max-width:0;overflow:hidden;white-space:nowrap;animation:ise-c 5s cubic-bezier(.4,0,.2,1) infinite}
.io-search .rc{display:flex;flex-direction:column;gap:.5em;font-size:.72em;opacity:0;animation:ise-r 5s infinite}
.io-search .rc em{font-style:normal;font-weight:700;color:var(--ink)}
.io-search .rc span{color:var(--accent)}
.io-search .wr2{display:flex;flex-direction:column;gap:.6em;animation:ise-m 5s cubic-bezier(.4,0,.2,1) infinite}
.io-search .kb2{position:absolute;left:0;right:0;bottom:0;height:7em;background:var(--stage);border-top:.06em solid var(--rule);background-image:repeating-linear-gradient(90deg,var(--ui) 0 .9em,transparent .9em 1.05em);background-size:100% 1.6em;background-position:.3em .5em;animation:kbd-k 5s cubic-bezier(.2,.8,.2,1) infinite}
.io-search .tap{left:45%;top:24%;animation-duration:5s;animation-delay:-1.4s}
@keyframes ise-l{0%,24%{opacity:1;max-height:2.2em}34%,86%{opacity:0;max-height:0}96%,100%{opacity:1;max-height:2.2em}}
@keyframes ise-c{0%,24%{max-width:0}34%,86%{max-width:3em}96%,100%{max-width:0}}
@keyframes ise-r{0%,34%{opacity:0}42%,86%{opacity:1}94%,100%{opacity:0}}
@keyframes ise-m{0%,100%{transform:none}}

.io-split .tb5{position:relative;width:27em;height:17em;border-radius:1.2em;border:.3em solid var(--frame);background:var(--stage);display:flex;overflow:hidden}
.io-split .sb{flex:none;width:6.6em;padding:1em .5em;display:flex;flex-direction:column;gap:.35em;background:var(--ui);border-right:.06em solid var(--rule);overflow:hidden;animation:isp-w 5s cubic-bezier(.4,0,.2,1) infinite}
.io-split .sb span{display:flex;align-items:center;gap:.4em;padding:.35em .45em;border-radius:.5em;font-size:.65em;white-space:nowrap}
.io-split .sb span i{width:1.1em;height:1.1em;border-radius:.3em;border:.18em solid var(--accent);flex:none}
.io-split .sb .on{background:var(--accent);color:#fff}.io-split .sb .on i{border-color:#fff}
.io-split .ls4{flex:none;width:8em;padding:1em .5em;display:flex;flex-direction:column;gap:.45em;border-right:.06em solid var(--rule)}
.io-split .ls4 .rw{padding:.3em;border-radius:.4em}
.io-split .ls4 .rw:first-child{background:var(--accent-soft)}
.io-split .ls4 .av{width:1.4em;height:1.4em}
.io-split .dt3{flex:1;padding:1em;display:flex;flex-direction:column;gap:.5em;min-width:0}
.io-split .dt3 .im{height:5em}
@keyframes isp-w{0%,30%{width:6.6em;padding-inline:.5em}42%,80%{width:0;padding-inline:0}92%,100%{width:6.6em;padding-inline:.5em}}

.io-btn .wr{display:flex;flex-direction:column;gap:.55em;width:15em;padding:1.2em;border-radius:1.2em;background:linear-gradient(135deg,#ffd5b8,#ffb3cf 50%,#c3c7ff)}
.io-btn .b4{display:flex;align-items:center;justify-content:space-between;padding:.6em 1em;border-radius:2em;font-size:.85em;font-weight:600;animation:press 5s infinite;animation-delay:calc(var(--i) * .5s - 2.4s)}
.io-btn .b4 em{font-style:normal;font-weight:400;font-size:.8em;opacity:.7}
.io-btn .f{background:#007AFF;color:#fff}
.io-btn .tn{background:rgba(0,122,255,.15);color:#0062cc}
.io-btn .gy{background:rgba(120,120,128,.18);color:#0062cc}
.io-btn .pl3{background:none;color:#0062cc}
.io-btn .gl{background:rgba(255,255,255,.35);color:#1c1c1e;-webkit-backdrop-filter:blur(.4em) saturate(1.6);backdrop-filter:blur(.4em) saturate(1.6);box-shadow:inset .06em .08em .08em rgba(255,255,255,.9),0 .3em .8em -.3em rgba(0,0,0,.25)}

.io-sw .igrp{width:17em}
.io-sw .isw.a{animation:isw-t 4s infinite}.io-sw .isw.a b{animation:isw-k 4s cubic-bezier(.3,.7,.3,1) infinite}
.io-sw .ck2{margin-left:auto;color:var(--accent);font-weight:700;opacity:0}
.io-sw .c1{animation:btln-1 4s steps(1) infinite;opacity:1}.io-sw .c2{animation:btln-2 4s steps(1) infinite}
.io-sw .hd2{font-size:.6em;color:var(--ink-3);padding:0 1.2em .3em;letter-spacing:.02em}
.io-sw .wr{display:flex;flex-direction:column;gap:.2em}

.io-seg .pan{width:20em;padding:1.1em;display:flex;flex-direction:column;gap:.9em}
.io-seg .sg2{position:relative;display:grid;grid-template-columns:repeat(3,1fr);padding:.15em;border-radius:.6em;background:color-mix(in srgb,var(--ink-3) 18%,transparent);font-size:.75em;font-weight:500;text-align:center}
.io-seg .sg2 span{position:relative;padding:.3em 0}
.io-seg .th2{position:absolute;top:.15em;bottom:.15em;left:.15em;width:calc((100% - .3em) / 3);border-radius:.5em;background:var(--ui);box-shadow:0 .1em .3em rgba(0,0,0,.15);animation:seg-m 6s cubic-bezier(.4,0,.2,1) infinite}
.io-seg .bars{position:relative;display:flex;align-items:flex-end;gap:.35em;height:6em}
.io-seg .bars i{flex:1;border-radius:.25em .25em 0 0;background:var(--accent);height:var(--a);animation:seg-h 6s cubic-bezier(.4,0,.2,1) infinite}
@keyframes seg-m{0%,28%{transform:none}33.3%,61%{transform:translateX(100%)}66.6%,94%{transform:translateX(200%)}100%{transform:none}}
@keyframes seg-h{0%,28%{height:var(--a)}33.3%,61%{height:var(--b)}66.6%,94%{height:var(--c)}100%{height:var(--a)}}
`;
const add = (o) => { X.items[o.id] = o; };
add({ id: 'io-type', k: '다이내믹 타입', e: 'Dynamic Type',
  d: '사용자가 설정에서 고른 글자 크기에 맞춰 앱의 글자가 함께 커지고 작아지는 iOS의 글자 크기 체계예요.',
  u: 'Large Title, Title, Headline, Body, Caption 같은 텍스트 스타일을 쓰면 크기 조절이 자동으로 따라와요. 손쉬운 사용 크기(AX1~AX5)까지 키우면 가로 배치를 세로로 바꾸는 등 레이아웃도 함께 바뀌어야 해요. 본문 기본 크기는 17pt예요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="inb"><span class="a2">‹ 뒤로</span><b>공지</b><span></span></span><div class="dyn"><b>면접 일정이 바뀌었어요</b><span>11월 12일 오전 10시로 변경됐어요. 준비 자료는 아래에서 확인할 수 있어요.</span></div></div><span class="lb3"><span style="animation-delay:0s">작게</span><span style="animation-delay:-4s">기본 (Large)</span><span style="animation-delay:-2s">손쉬운 사용 크게</span></span></div>` });
add({ id: 'io-tab', k: '탭 바', e: 'Tab bar',
  d: '화면 아래에서 앱의 주요 영역을 오가는 막대예요. iOS 26부터는 리퀴드 글래스로 콘텐츠 위에 떠 있고, 스크롤하면 작게 줄어들어 콘텐츠에 자리를 내줘요.',
  u: '탭은 3~5개, 각 탭은 앱의 큰 영역을 뜻해야 해요. 탭 바는 어느 화면에서든 보이게 두고, 탭을 누르면 그 탭의 마지막 위치로 돌아가는 게 기본이에요. 검색은 탭 바 오른쪽의 별도 버튼으로 분리되기도 해요.',
  html: `<div class="ph ios-g"><div class="scr"><div class="mv"><span class="lt2">홈</span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:75%"></span><span class="im"></span></div></div><div class="gb"><span class="on"><i></i>홈</span><span><i></i>연습</span><span><i></i>기록</span><span><i></i>MY</span></div><span class="sr2"></span></div>` });
add({ id: 'io-nav', k: '내비게이션 바와 큰 제목', e: 'Navigation bar · Large title',
  d: '화면 위쪽에 제목과 뒤로 가기·주요 버튼을 두는 막대예요. 목록의 시작 화면은 큰 제목으로 시작하고, 스크롤하면 가운데 작은 제목으로 줄어들어요.',
  u: '뒤로 버튼에는 이전 화면의 제목을 쓰는 게 iOS 관습이에요. 오른쪽에는 편집·추가처럼 그 화면의 주요 행동 1~2개만 두세요. 상세 화면은 큰 제목 없이 작은 제목을 쓰는 경우가 많아요.',
  html: `<div class="ph ios-g"><div class="bar4"><span class="a2">‹ 홈</span><b>설정</b><span class="a2">편집</span></div><div class="scr"><div class="mv"><span class="lt2">설정</span><div class="igrp"><span class="irow"><i class="t4" style="background:#FF9500"></i>알림<span class="chv">›</span></span><span class="irow"><i class="t4" style="background:#34C759"></i>연습 목표<span class="chv">›</span></span><span class="irow"><i class="t4" style="background:#007AFF"></i>계정<span class="chv">›</span></span></div><div class="igrp"><span class="irow"><i class="t4" style="background:#AF52DE"></i>테마<span class="chv">›</span></span><span class="irow"><i class="t4" style="background:#8E8E93"></i>정보<span class="chv">›</span></span></div></div></div></div>` });
add({ id: 'io-push', k: '계층 이동과 뒤로 스와이프', e: 'Push navigation · Edge swipe',
  d: '목록에서 항목을 누르면 새 화면이 오른쪽에서 밀려 들어오고, 화면 왼쪽 끝을 오른쪽으로 밀면 손가락을 따라 이전 화면으로 돌아가요.',
  u: '뒤로 스와이프는 iOS 사용자가 가장 많이 쓰는 제스처 중 하나예요. 화면 안에 가로 스와이프 기능(캐러셀 등)을 왼쪽 끝까지 붙여 두면 뒤로 가기와 충돌해요. 커스텀 전환을 만들어도 이 제스처는 꼭 살려 두세요.',
  html: `<div class="ph"><div class="trk"><div><span class="lt2" style="font-size:1.5em">메모</span><div class="igrp"><span class="irow">면접 준비 체크리스트<span class="chv">›</span></span><span class="irow">자기소개 초안<span class="chv">›</span></span><span class="irow">회사 조사<span class="chv">›</span></span></div></div><div><span class="inb"><span class="a2">‹ 메모</span><span></span><span></span></span><span class="ln h" style="width:70%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span></div></div><span class="tap t1"></span><span class="tap dr"></span></div>` });
add({ id: 'io-sheet', k: '시트와 높이 단계', e: 'Sheet · Detents',
  d: '아래에서 올라오는 카드 형태의 화면이에요. 화면 절반(medium)에 멈췄다가, 위로 끌면 거의 전체(large)로 커지고 뒤 화면은 살짝 작아지며 물러나요.',
  u: '지도 위 장소 정보, 공유, 필터처럼 뒤 화면을 보면서 하는 작업에 맞아요. 위쪽 손잡이(grabber)로 끌 수 있다는 걸 알리고, 아래로 끌어서 닫을 수 있게 하세요. 입력 중인 내용이 있으면 닫기 전에 확인하세요.',
  html: `<div class="ph"><div class="bg2"><span class="lt2" style="font-size:1.4em">지도</span><span class="im" style="height:8em"></span></div><div class="sh2"><i class="gr2"></i><span class="ln h" style="width:55%"></span><span class="ln" style="width:85%"></span><span class="im" style="height:3.4em"></span><span class="ln" style="width:70%"></span><span class="ln" style="width:80%"></span></div><span class="lbl2"><span class="m1">medium</span><span class="m2">large</span></span><span class="tap dr"></span></div>` });
add({ id: 'io-search', k: '검색', e: 'Search field',
  d: '내비게이션 바 아래에 검색창을 두고, 누르면 큰 제목이 사라지며 검색창이 위로 올라가고 오른쪽에 취소 버튼과 최근 검색이 나타나요.',
  u: '검색창에는 무엇을 검색할 수 있는지 안내 문구를 넣으세요. 입력하는 동안 결과를 바로 보여주고, 최근 검색과 추천을 비어 있는 상태에서 먼저 보여주면 좋아요. iOS 26에서는 탭 바 옆이나 화면 아래쪽에 검색을 두는 방식도 쓰여요.',
  html: `<div class="ph ios-g"><div class="scr"><div class="wr2"><span class="lt2">검색</span><div class="sf"><span>질문, 회사, 직무</span><b>취소</b></div><div class="rc"><em>최근 검색</em><span>UX 디자이너 면접</span><span>1분 자기소개</span><span>포트폴리오 질문</span></div></div></div><div class="kb2"></div><span class="tap"></span></div>` });
add({ id: 'io-split', k: '사이드바와 분할 화면 (iPad)', e: 'Sidebar · Split view',
  d: 'iPad처럼 넓은 화면에서는 왼쪽 사이드바, 가운데 목록, 오른쪽 상세를 나란히 보여주고, 사이드바를 접어 내용을 넓게 볼 수 있어요.',
  u: '아이폰의 탭 바 구조를 iPad에서는 사이드바로 바꿔 보여주는 경우가 많아요. 화면 너비가 바뀌어도(분할 화면, 창 크기 조절) 선택 상태가 유지돼야 해요. 사이드바 항목도 아이콘과 이름을 함께 쓰세요.',
  html: `<div class="tb5"><div class="sb"><span class="on"><i></i>전체 기록</span><span><i></i>즐겨찾기</span><span><i></i>디자인</span><span><i></i>개발</span></div><div class="ls4"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><div class="dt3"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div></div>` });
add({ id: 'io-btn', k: '버튼 스타일', e: 'Button styles',
  d: 'iOS 버튼은 채움(Filled), 틴트(Tinted), 회색(Gray), 글자(Plain) 스타일이 있고, iOS 26부터는 리퀴드 글래스 버튼도 생겼어요. 중요도에 따라 골라 써요.',
  u: '화면의 가장 중요한 행동 하나만 채움 버튼으로, 보조 행동은 틴트나 회색, 덜 중요한 건 글자 버튼으로 두세요. 글래스 버튼은 사진이나 지도처럼 콘텐츠 위에 뜨는 조작에 어울려요. 버튼 높이는 최소 44pt를 지키세요.',
  html: `<div class="wr"><span class="b4 f" style="--i:0">시작하기<em>Filled</em></span><span class="b4 tn" style="--i:1">저장<em>Tinted</em></span><span class="b4 gy" style="--i:2">나중에<em>Gray</em></span><span class="b4 pl3" style="--i:3">건너뛰기<em>Plain</em></span><span class="b4 gl" style="--i:4">공유<em>Glass</em></span></div>` });
add({ id: 'io-sw', k: '스위치와 체크 표시', e: 'Toggle · Checkmark list',
  d: '켜고 끄는 설정은 초록 스위치로, 여러 선택지 중 하나를 고를 때는 목록 오른쪽의 파란 체크 표시로 보여줘요.',
  u: 'iOS에는 라디오 버튼이 없어요. 하나만 고르는 선택은 체크 표시 목록이나 메뉴, 세그먼트 컨트롤로 표현해요. 스위치는 누르는 즉시 적용되는 설정에만 쓰고, 스위치 아래에 설명 문구(footer)를 달아 결과를 알려주세요.',
  html: `<div class="wr"><div class="igrp" style="width:17em"><span class="irow">연습 알림<span class="isw a"><b></b></span></span><span class="irow">주간 리포트<span class="isw on"><b></b></span></span></div><span class="hd2">알림 시간</span><div class="igrp" style="width:17em"><span class="irow">오전 9시<span class="ck2 c1">✓</span></span><span class="irow">오후 8시<span class="ck2 c2">✓</span></span></div></div>` });
add({ id: 'io-seg', k: '세그먼트 컨트롤', e: 'Segmented control',
  d: '두세 가지 보기 방식을 나란히 두고 하나를 고르는 컨트롤이에요. 흰 손잡이가 미끄러지며 선택이 바뀌어요.',
  u: '같은 콘텐츠를 다르게 보여줄 때(일·주·월) 써요. 다른 화면으로 이동하는 데 쓰면 탭 바와 헷갈려요. 항목은 5개 이하, 글자 길이를 비슷하게 맞추세요.',
  html: `<div class="pan box"><div class="sg2"><i class="th2"></i><span>일</span><span>주</span><span>월</span></div><div class="bars"><i style="--a:40%;--b:60%;--c:80%"></i><i style="--a:70%;--b:45%;--c:65%"></i><i style="--a:30%;--b:85%;--c:55%"></i><i style="--a:55%;--b:50%;--c:90%"></i><i style="--a:80%;--b:70%;--c:60%"></i><i style="--a:45%;--b:95%;--c:75%"></i></div></div>` });
})();
