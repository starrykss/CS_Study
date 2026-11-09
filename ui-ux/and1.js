window.ANDX = { css: '', items: {} };
(() => {
const X = window.ANDX;
X.css += `
.sc .m3n{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(4,1fr);padding:.6em .2em 1.1em;background:var(--stage)}
.sc .m3n span{position:relative;display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:.55em;color:var(--ink-2)}
.sc .m3n span i{position:relative;width:5.4em;height:3.2em;border-radius:1.6em;display:grid;place-items:center}
.sc .m3n span i::after{content:"";width:2em;height:2em;border-radius:.5em;border:.3em solid currentColor}
.sc .m3n .on{color:var(--ink);font-weight:700}
.sc .m3n .on i{background:var(--accent-soft)}
.sc .m3t{display:flex;align-items:center;gap:.7em;height:2.4em;font-size:.95em;flex:none}
.sc .m3t .mi{width:1.1em;display:flex;flex-direction:column;gap:.2em}
.sc .m3t .mi::before,.sc .m3t .mi::after{content:"";height:.14em;border-radius:.1em;background:var(--ink)}
.sc .m3t b{font-weight:500}
.sc .m3card{border-radius:.8em;background:var(--stage);padding:.7em;display:flex;flex-direction:column;gap:.45em}
.sc .rip{position:absolute;left:var(--x,50%);top:var(--y,50%);width:1em;height:1em;margin:-.5em;border-radius:50%;background:currentColor;opacity:0;pointer-events:none;animation:m3-rip 4s ease-out infinite;animation-delay:var(--d,0s)}
@keyframes m3-rip{0%,46%{opacity:0;transform:scale(0)}48%{opacity:.22;transform:scale(1)}62%{opacity:.16;transform:scale(14)}70%,100%{opacity:0;transform:scale(16)}}

.an-dyn .wr{display:flex;align-items:center;gap:1.4em;animation:dyn-p 6s steps(1) infinite}
.an-dyn .wp{width:7em;height:12em;border-radius:1.2em;background:linear-gradient(160deg,var(--pk),var(--pc));box-shadow:0 .5em 1.2em -.6em rgba(0,0,0,.4)}
.an-dyn .ui3{width:11em;padding:1em;border-radius:1.2em;background:var(--pb);display:flex;flex-direction:column;gap:.6em;color:#1D1B20}
.an-dyn .ui3 .tb6{height:2em;border-radius:1em;background:var(--pk)}
.an-dyn .ui3 .bt2{height:2.2em;border-radius:1.1em;background:var(--pc);color:#fff;display:grid;place-items:center;font-size:.8em;font-weight:500}
.an-dyn .ui3 .ln{background:color-mix(in srgb,var(--pc) 30%,transparent)}
.an-dyn .ui3 .fb{align-self:flex-end;width:2.8em;height:2.8em;border-radius:.9em;background:var(--pk);display:grid;place-items:center;font-size:1.2em;color:var(--pc)}
.an-dyn .ar3{font-size:1.4em;color:var(--ink-3)}
@keyframes dyn-p{0%{--pc:#6750A4;--pk:#EADDFF;--pb:#FEF7FF}33.3%{--pc:#386A20;--pk:#B8F397;--pb:#F8FBF0}66.6%{--pc:#9C4146;--pk:#FFDAD8;--pb:#FFF8F7}}

.an-type .ls6{display:flex;flex-direction:column;gap:.55em;width:24em}
.an-type .ls6 div{display:flex;align-items:baseline;justify-content:space-between;gap:1em;animation:ser-k 4s infinite backwards;animation-delay:calc(var(--i) * .1s)}
.an-type .ls6 b{font-family:"Roboto","Noto Sans KR",sans-serif;font-weight:400;line-height:1.1;white-space:nowrap}
.an-type .ls6 em{font-style:normal;font-family:var(--f-mono);font-size:.72em;color:var(--ink-3);white-space:nowrap}

.an-shape .gr4{display:grid;grid-template-columns:repeat(4,5em);gap:1em 1.2em}
.an-shape .gr4 span{display:flex;flex-direction:column;align-items:center;gap:.35em;font-family:var(--f-mono);font-size:.7em;color:var(--ink-2)}
.an-shape .gr4 i{width:6em;height:6em;background:var(--accent-soft);border:.18em solid var(--accent);border-radius:var(--r);animation:shp-k 7s steps(1) infinite;animation-delay:calc(var(--i) * -1s + 7s)}
@keyframes shp-k{0%{background:var(--accent);transform:scale(1.08)}14.28%,100%{background:var(--accent-soft);transform:none}}

.an-e2e .ph{background:linear-gradient(180deg,#7F67BE,#EADDFF 45%,var(--ui) 46%)}
.an-e2e .stb{position:absolute;left:0;right:0;top:0;height:1.9em;display:flex;justify-content:space-between;align-items:center;padding:0 1.1em;font-size:.6em;color:#fff;font-weight:500;z-index:2}
.an-e2e .gbar{position:absolute;left:50%;bottom:.5em;width:4.4em;height:.3em;margin-left:-2.2em;border-radius:1em;background:var(--ink);z-index:2}
.an-e2e .ins{position:absolute;left:0;right:0;z-index:3;background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--danger) 35%,transparent) 0 .3em,transparent .3em .6em);opacity:0;animation:safe-z 4s infinite}
.an-e2e .i1{top:0;height:1.9em}.an-e2e .i2{bottom:0;height:1.5em}
.an-e2e .ct2{position:absolute;left:1em;right:1em;top:2.6em;display:flex;flex-direction:column;gap:.5em;color:#fff}
.an-e2e .ct2 b{font-size:1.3em}
.an-e2e .bt{position:absolute;left:1em;right:1em;bottom:2em;border-radius:1.4em;animation:e2e-b 4s cubic-bezier(.4,0,.2,1) infinite}
.an-e2e .lst{position:absolute;left:1em;right:1em;top:10.4em;display:flex;flex-direction:column;gap:.6em}
@keyframes e2e-b{0%,20%{bottom:.6em}30%,84%{bottom:2em}94%,100%{bottom:.6em}}

.an-unit .pan{width:22em;padding:1.3em;display:flex;flex-direction:column;gap:.9em}
.an-unit .row4{display:flex;align-items:center;justify-content:space-between;gap:1em;min-height:2.6em}
.an-unit .row4 em{font-style:normal;font-family:var(--f-mono);font-size:.72em;color:var(--ink-3);flex:none}
.an-unit .sp3{font-size:1em;font-weight:500;animation:spk 6s steps(1) infinite}
.an-unit .dp3{font-size:1em;font-weight:500}
.an-unit .sc5{display:grid;font-family:var(--f-mono);font-size:.75em;color:var(--accent)}
.an-unit .sc5 span{grid-area:1/1;opacity:0;animation:cyc3 6s steps(1) infinite}
.an-unit .tt3{display:flex;align-items:center;gap:.8em;font-size:.8em;color:var(--ink-2)}
.an-unit .tt3 i{width:4.8em;height:4.8em;border-radius:.6em;border:.14em dashed var(--accent);background:color-mix(in srgb,var(--accent) 10%,transparent);display:grid;place-items:center}
.an-unit .tt3 i::after{content:"";width:2.4em;height:2.4em;border-radius:50%;background:var(--accent)}
@keyframes spk{0%{font-size:1em}33.3%{font-size:1.3em}66.6%{font-size:2em}}

.an-expr .wr{display:flex;flex-direction:column;align-items:center;gap:1.6em}
.an-expr .grp2{display:flex;gap:.3em}
.an-expr .grp2 span{height:3em;padding:0 1.2em;display:grid;place-items:center;background:var(--accent-soft);color:var(--ink);font-size:.85em;font-weight:500;border-radius:1.5em .5em .5em 1.5em}
.an-expr .grp2 span:nth-child(2){border-radius:.5em;animation:exp-b 3s cubic-bezier(.3,1.6,.5,1) infinite}
.an-expr .grp2 span:nth-child(3){border-radius:.5em 1.5em 1.5em .5em}
.an-expr .lo{width:5em;height:5em;background:var(--accent);animation:exp-l 3s cubic-bezier(.5,0,.3,1.4) infinite}
@keyframes exp-b{0%,30%{padding:0 1.2em;border-radius:.5em;background:var(--accent-soft);color:var(--ink)}40%,80%{padding:0 2em;border-radius:1.5em;background:var(--accent);color:var(--accent-ink)}90%,100%{padding:0 1.2em;border-radius:.5em;background:var(--accent-soft);color:var(--ink)}}
@keyframes exp-l{0%{border-radius:50%;transform:rotate(0)}25%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%;transform:rotate(90deg)}50%{border-radius:.8em;transform:rotate(180deg) scale(.85)}75%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:rotate(270deg)}100%{border-radius:50%;transform:rotate(360deg)}}

.an-nbar .scr{padding-bottom:5em}
.an-nbar .m3n span i{transition:none}
.an-nbar .m3n .s0 i{animation:nbr-a 6s steps(1) infinite}.an-nbar .m3n .s2 i{animation:nbr-b 6s steps(1) infinite}
.an-nbar .m3n .s0{animation:nbr-ta 6s steps(1) infinite}.an-nbar .m3n .s2{animation:nbr-tb 6s steps(1) infinite}
.an-nbar .pill{position:absolute;top:.6em;left:12.5%;width:3em;height:1.76em;margin-left:-1.5em;border-radius:1em;background:var(--accent-soft);animation:nbr-p 6s cubic-bezier(.3,.7,.2,1) infinite}
.an-nbar .m3n span{z-index:1}
.an-nbar .m3n span i{background:none!important}
@keyframes nbr-p{0%,46%{transform:translateX(0) scaleX(1)}48%{transform:translateX(0) scaleX(.2)}50%{transform:translateX(5.4em) scaleX(.2)}56%,96%{transform:translateX(5.4em) scaleX(1)}98%{transform:translateX(5.4em) scaleX(.2)}99%{transform:translateX(0) scaleX(.2)}100%{transform:none}}
@keyframes nbr-ta{0%{color:var(--ink);font-weight:700}50%{color:var(--ink-2);font-weight:400}}
@keyframes nbr-tb{0%{color:var(--ink-2);font-weight:400}50%{color:var(--ink);font-weight:700}}
.an-nbar .tap{left:62.5%;top:93%;animation-duration:6s;animation-delay:.12s}

.an-tab .bar5{position:absolute;left:0;right:0;top:0;padding:1.5em 1em .5em;z-index:2;background:var(--ui);animation:atb-b 4s cubic-bezier(.4,0,.2,1) infinite}
.an-tab .bar5 .m3t b{opacity:0;animation:ion-t 4s cubic-bezier(.4,0,.2,1) infinite}
.an-tab .big{font-size:1.7em;font-weight:400;line-height:1.2;padding:.2em 0 .3em;overflow:hidden;animation:atb-l 4s cubic-bezier(.4,0,.2,1) infinite}
.an-tab .scr{padding-top:7.4em}
.an-tab .mv{display:flex;flex-direction:column;gap:.6em;animation:ion-s 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes atb-b{0%,30%{background:var(--ui)}44%,80%{background:var(--stage)}92%,100%{background:var(--ui)}}
@keyframes atb-l{0%,24%{max-height:2.4em;opacity:1}40%,84%{max-height:0;opacity:0;padding:0}94%,100%{max-height:2.4em;opacity:1}}

.an-drawer .dm{animation:men-d 4s infinite}
.an-drawer .dw{position:absolute;left:0;top:0;bottom:0;width:80%;padding:2em .7em 1em;display:flex;flex-direction:column;gap:.15em;background:var(--stage);border-radius:0 1.4em 1.4em 0;z-index:3;animation:men-r 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-drawer .dw b{font-size:.75em;font-weight:500;padding:.3em 1em .6em;color:var(--ink-2)}
.an-drawer .dw span{display:flex;align-items:center;gap:.7em;padding:.7em 1em;border-radius:2em;font-size:.72em;font-weight:500;color:var(--ink-2)}
.an-drawer .dw span i{width:1.3em;height:1.3em;border-radius:.3em;border:.18em solid currentColor}
.an-drawer .dw .on{background:var(--accent-soft);color:var(--ink)}
.an-drawer .tap{left:12%;top:12%;animation-delay:-1.2s}

.an-back .pv2,.an-back .cu2{position:absolute;inset:0;padding:1.9em 1em 1em;display:flex;flex-direction:column;gap:.6em}
.an-back .pv2{background:var(--stage)}
.an-back .cu2{background:var(--ui);animation:back-a 4s cubic-bezier(.3,.7,.2,1) infinite;overflow:hidden}
.an-back .ar{position:absolute;left:-.2em;top:45%;width:2.4em;height:2.4em;border-radius:50%;background:var(--accent-soft);color:var(--ink);display:grid;place-items:center;font-weight:700;z-index:3;animation:back-r 4s cubic-bezier(.3,.7,.2,1) infinite}
.an-back .dr{left:6%;top:50%;animation:back-f 4s cubic-bezier(.3,.7,.2,1) infinite}
.an-back .cu2 .im{height:6em}

.an-tabs .tbs{position:relative;display:grid;grid-template-columns:repeat(3,1fr);margin:0 -1em;border-bottom:.08em solid var(--rule);font-size:.75em;font-weight:500;text-align:center;flex:none}
.an-tabs .tbs span{padding:.7em 0;color:var(--ink-2)}
.an-tabs .ind{position:absolute;bottom:-.08em;left:calc(100% / 6);width:2.6em;height:.3em;margin-left:-1.3em;border-radius:.3em .3em 0 0;background:var(--accent);animation:atb-i 6s cubic-bezier(.4,0,.2,1) infinite}
.an-tabs .win{flex:1;overflow:hidden;margin:0 -1em}
.an-tabs .tr3{display:flex;width:300%;height:100%;animation:tab-t 6s cubic-bezier(.4,0,.2,1) infinite}
.an-tabs .pn{width:33.333%;padding:.6em 1em;display:flex;flex-direction:column;gap:.6em}
@keyframes atb-i{0%,24%{transform:none}30%,57%{transform:translateX(3.15em)}63%,90%{transform:translateX(6.3em)}96%,100%{transform:none}}

.an-btn .ls7{display:flex;flex-direction:column;gap:.55em;width:17em}
.an-btn .ls7 div{display:flex;align-items:center;justify-content:space-between;gap:1em}
.an-btn .ls7 em{font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.an-btn .b5{position:relative;overflow:hidden;min-width:7.6em;height:2.6em;padding:0 1.2em;border-radius:1.3em;display:grid;place-items:center;font-size:.8em;font-weight:500}
.an-btn .fl{background:var(--accent);color:var(--accent-ink)}
.an-btn .tn2{background:var(--accent-soft);color:var(--ink)}
.an-btn .el{background:var(--ui);color:var(--accent);box-shadow:0 .1em .3em rgba(0,0,0,.2)}
.an-btn .ol{border:.1em solid var(--ink-3);color:var(--accent)}
.an-btn .tx2{color:var(--accent)}

.an-fab .scr{gap:.6em}
.an-fab .mv{display:flex;flex-direction:column;gap:.6em;animation:fab-s 5s cubic-bezier(.4,0,.2,1) infinite}
.an-fab .xf{position:absolute;right:1em;bottom:1.2em;height:3.4em;width:8.4em;padding:0 1em;border-radius:1em;background:var(--accent-soft);color:var(--ink);display:flex;align-items:center;gap:.6em;overflow:hidden;white-space:nowrap;box-shadow:0 .3em .7em -.2em rgba(0,0,0,.3);font-size:.85em;font-weight:500;animation:fab-x 5s cubic-bezier(.4,0,.2,1) infinite}
.an-fab .xf i{flex:none;font-style:normal;font-size:1.4em;width:1.2em;text-align:center}
@keyframes fab-s{0%,10%{transform:none}35%,55%{transform:translateY(-6em)}80%,100%{transform:translateY(-2em)}}
@keyframes fab-x{0%,14%{width:8.4em}30%,58%{width:3.4em}72%,100%{width:8.4em}}
`;
const add = (o) => { X.items[o.id] = o; };
add({ id: 'an-dyn', k: '다이내믹 컬러', e: 'Dynamic color · Material You',
  d: '사용자가 고른 배경화면에서 색을 뽑아 앱의 버튼, 바, 카드 색까지 자동으로 맞추는 머티리얼 3의 색 체계예요.',
  u: '앱 색을 직접 고정하기보다 primary, secondary, surface 같은 역할(색 토큰)로 지정하면 다이내믹 컬러를 켰을 때 자연스럽게 바뀌어요. 브랜드 색이 꼭 지켜져야 하는 로고나 핵심 요소만 고정하고, 대비가 충분한지 여러 배경화면으로 확인하세요.',
  html: `<div class="wr"><span class="wp"></span><span class="ar3">→</span><div class="ui3"><span class="tb6"></span><span class="ln" style="width:80%"></span><span class="ln" style="width:60%"></span><span class="bt2">시작하기</span><span class="fb">+</span></div></div>` });
add({ id: 'an-type', k: '타입 스케일', e: 'Type scale',
  d: '머티리얼 3는 Display, Headline, Title, Body, Label 다섯 역할을 각각 Large·Medium·Small 세 크기로 나눠, 모두 15단계의 글자 스타일을 정해 둬요.',
  u: '글자 크기를 숫자로 정하지 말고 역할로 고르세요. 기본 글꼴은 Roboto지만 한글은 시스템 글꼴(Noto Sans CJK 등)로 대체돼요. 글자 크기 단위는 사용자 설정에 따라 커지는 sp를 쓰세요.',
  html: `<div class="ls6"><div style="--i:0"><b style="font-size:3.4em">가나 Aa</b><em>Display L · 57sp</em></div><div style="--i:1"><b style="font-size:2em">가나다 Aa</b><em>Headline M · 28sp</em></div><div style="--i:2"><b style="font-size:1.55em">가나다라 Aa</b><em>Title L · 22sp</em></div><div style="--i:3"><b style="font-size:1.12em">가나다라마바 Aa</b><em>Body L · 16sp</em></div><div style="--i:4"><b style="font-size:.85em;font-weight:500">가나다라마바사 Aa</b><em>Label M · 12sp</em></div></div>` });
add({ id: 'an-shape', k: '모양 체계', e: 'Shape scale',
  d: '모서리 둥글기를 None부터 Full까지 단계로 정해 두고, 컴포넌트마다 정해진 단계를 써요. 작은 요소는 덜 둥글게, 큰 요소는 더 둥글게 가는 게 기본이에요.',
  u: '칩은 Small(8dp), 카드는 Medium(12dp), 다이얼로그는 Extra Large(28dp), 버튼은 Full처럼 역할에 따라 고르세요. 머티리얼 3 익스프레시브에서는 누르거나 선택할 때 모양이 바뀌는 표현도 더해졌어요.',
  html: `<div class="gr4"><span><i style="--r:0;--i:0"></i>None 0</span><span><i style="--r:.4em;--i:1"></i>XS 4</span><span><i style="--r:.8em;--i:2"></i>S 8</span><span><i style="--r:1.2em;--i:3"></i>M 12</span><span><i style="--r:1.6em;--i:4"></i>L 16</span><span><i style="--r:2.8em;--i:5"></i>XL 28</span><span><i style="--r:50%;--i:6"></i>Full</span></div>` });
add({ id: 'an-e2e', k: '엣지 투 엣지', e: 'Edge-to-edge · Window insets',
  d: '앱이 상태 표시줄과 하단 제스처 막대 뒤까지 화면 끝까지 그리는 방식이에요. 최신 안드로이드에서는 이것이 기본이에요.',
  u: '배경은 끝까지 그리되 글자와 버튼은 window insets만큼 안쪽으로 띄워야 해요. 특히 하단 고정 버튼이 제스처 막대와 겹치지 않는지, 가로 모드와 카메라 구멍(display cutout)에서도 확인하세요.',
  html: `<div class="ph"><span class="stb"><span>9:41</span><span>▾ ▮</span></span><span class="ins i1"></span><div class="ct2"><b>오늘의 연습</b><span style="font-size:.8em">배경이 상태 표시줄 뒤까지 이어져요</span></div><div class="lst"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span></div><span class="bt">면접 시작</span><span class="ins i2"></span><span class="gbar"></span></div>` });
add({ id: 'an-unit', k: 'dp와 sp', e: 'Density-independent pixels · Scalable pixels',
  d: '크기와 간격은 dp, 글자 크기는 sp로 정해요. sp는 사용자가 설정에서 글꼴 크기를 키우면 함께 커지고, dp는 그대로예요.',
  u: '글자에 dp를 쓰면 저시력 사용자가 글꼴을 키워도 앱 글자가 그대로라 읽을 수 없어요. 안드로이드 14부터는 글꼴 크기를 200%까지 키울 수 있어서, 글자가 커져도 잘리지 않게 높이를 고정하지 마세요. 터치 영역은 최소 48dp예요.',
  html: `<div class="pan box"><div class="row4"><span class="sp3">sp 글자</span><em>글꼴 크기를 따라감</em></div><div class="row4"><span class="dp3">dp 글자</span><em>그대로</em></div><div class="row4"><span class="tt3"><i></i>48 × 48dp</span><span class="sc5"><span style="animation-delay:0s">글꼴 100%</span><span style="animation-delay:-4s">글꼴 130%</span><span style="animation-delay:-2s">글꼴 200%</span></span></div></div>` });
add({ id: 'an-expr', k: '머티리얼 3 익스프레시브', e: 'Material 3 Expressive',
  d: '2025년 구글이 발표한 머티리얼 3의 확장판이에요. 더 풍부한 색과 모양, 누를 때 모양이 바뀌는 버튼, 탄성 있는 스프링 움직임으로 감정과 개성을 더해요.',
  u: '픽셀 기기에 먼저 적용됐고, 안드로이드 17부터 다른 제조사 기기로도 넓어지고 있어요. 버튼 그룹, 모양이 변하는 로딩 표시, 플로팅 툴바 같은 새 컴포넌트가 생겼어요. 표현이 풍부해진 만큼 중요한 순간에만 강조를 쓰는 절제가 필요해요.',
  html: `<div class="wr"><div class="grp2"><span>일</span><span>주</span><span>월</span></div><span class="lo"></span></div>` });
add({ id: 'an-nbar', k: '내비게이션 바', e: 'Navigation bar',
  d: '화면 아래에서 3~5개의 주요 목적지를 오가는 막대예요. 선택된 항목은 아이콘 뒤에 알약 모양 표시가 생기며 펼쳐져요.',
  u: '목적지가 3~5개일 때 써요. 아이콘과 라벨을 함께 두고, 화면이 넓어지면(태블릿, 펼친 폴더블) 내비게이션 레일로 바꾸세요. 하단 제스처 막대와 겹치지 않게 inset을 지켜야 해요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b style="font-size:1.2em">홈</b></span><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span><span class="ln" style="width:40%"></span></span></div><div class="m3n"><i class="pill"></i><span class="s0"><i></i>홈</span><span><i></i>연습</span><span class="s2"><i></i>기록</span><span><i></i>MY</span></div><span class="tap"></span></div>` });
add({ id: 'an-tab', k: '상단 앱 바', e: 'Top app bar',
  d: '화면 위에 제목과 내비게이션 아이콘, 동작 버튼을 두는 막대예요. 큰 제목(Large)으로 시작했다가 스크롤하면 작은 막대로 줄어들고 배경색이 바뀌어요.',
  u: '최상위 화면은 큰 제목, 상세 화면은 작은 제목을 쓰는 게 일반적이에요. 스크롤하면 표면 색이 한 단계 진해져 내용과 구분돼요. 오른쪽 동작 버튼은 1~3개까지만 두고 나머지는 ⋮ 메뉴로 모으세요.',
  html: `<div class="ph"><div class="bar5"><span class="m3t"><i class="mi"></i><b>기록</b></span><div class="big">기록</div></div><div class="scr"><div class="mv"><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span><span class="ln" style="width:40%"></span></span><span class="m3card"><span class="ln" style="width:65%"></span><span class="ln" style="width:55%"></span></span><span class="m3card"><span class="ln" style="width:75%"></span><span class="ln" style="width:45%"></span></span></div></div></div>` });
add({ id: 'an-drawer', k: '내비게이션 드로어', e: 'Navigation drawer',
  d: '왼쪽에서 서랍처럼 열리는 메뉴예요. 목적지가 많거나 계정 전환처럼 자주 쓰지 않는 메뉴를 담을 때 써요.',
  u: '자주 쓰는 3~5개 목적지는 내비게이션 바로 꺼내 두고, 드로어에는 나머지를 담으세요. 선택된 항목은 알약 모양 배경으로 표시하고, 바깥(스크림)을 누르거나 뒤로 가기로 닫혀야 해요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><i class="mi"></i><b>홈</b></span><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span><span class="ln" style="width:40%"></span></span></div><span class="dm"></span><div class="dw"><b>면접연습</b><span class="on"><i></i>홈</span><span><i></i>모의면접</span><span><i></i>리포트</span><span><i></i>즐겨찾기</span><span><i></i>설정</span></div><span class="tap"></span></div>` });
add({ id: 'an-back', k: '예측형 뒤로 가기', e: 'Predictive back',
  d: '화면 가장자리에서 안쪽으로 밀기 시작하면, 손을 떼기 전에 현재 화면이 작아지며 뒤에 어떤 화면이 나올지 미리 보여줘요.',
  u: '안드로이드 13에서 처음 도입됐고, 안드로이드 16을 대상으로 하는 앱에서는 기본으로 켜져요. 예전 방식(onBackPressed)으로 뒤로 가기를 가로채면 미리보기가 깨지니 새 API(OnBackPressedCallback)로 바꾸세요. 손을 떼지 않고 되돌리면 원래 화면에 그대로 남아야 해요.',
  html: `<div class="ph"><div class="pv2"><span class="m3t"><b>모의면접</b></span><span class="m3card"><span class="ln" style="width:70%"></span></span><span class="m3card"><span class="ln" style="width:60%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span></span></div><div class="cu2"><span class="m3t"><b>질문 3</b></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span></div><span class="ar">‹</span><span class="tap dr"></span></div>` });
add({ id: 'an-tabs', k: '탭', e: 'Tabs · Primary',
  d: '같은 단계의 콘텐츠 묶음을 상단에서 나눠 보여줘요. 선택된 탭 아래에 위쪽이 둥근 막대 표시가 붙고, 옆으로 밀어서도 넘길 수 있어요.',
  u: '기본(Primary) 탭은 앱 바 아래 주요 묶음에, 보조(Secondary) 탭은 콘텐츠 안의 하위 묶음에 써요. 탭이 많으면 가로 스크롤 탭으로 바꾸고, 탭 이름은 짧게 쓰세요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>리포트</b></span><div class="tbs"><span>전체</span><span>답변</span><span>말투</span><i class="ind"></i></div><div class="win"><div class="tr3"><div class="pn"><span class="m3card"><span class="ln" style="width:80%"></span><span class="ln" style="width:60%"></span></span><span class="im" style="height:4em"></span></div><div class="pn"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div><div class="pn"><span class="im" style="height:6em;background:var(--warn-soft)"></span><span class="ln" style="width:70%"></span></div></div></div></div></div>` });
add({ id: 'an-btn', k: '버튼 5종', e: 'Common buttons',
  d: '머티리얼 3 버튼은 강조 정도에 따라 Filled, Tonal, Elevated, Outlined, Text 다섯 가지예요. 누르면 물결(ripple)이 퍼져요.',
  u: '한 화면의 가장 중요한 행동은 Filled 하나만, 그다음은 Tonal이나 Outlined, 가장 가벼운 행동은 Text를 쓰세요. Elevated는 배경과 구분이 필요할 때만 써요. 높이는 40dp지만 터치 영역은 48dp를 확보하세요.',
  html: `<div class="ls7"><div><span class="b5 fl">저장<i class="rip" style="--d:0s"></i></span><em>Filled</em></div><div><span class="b5 tn2">다음<i class="rip" style="--d:.5s"></i></span><em>Tonal</em></div><div><span class="b5 el">미리보기<i class="rip" style="--d:1s"></i></span><em>Elevated</em></div><div><span class="b5 ol">취소<i class="rip" style="--d:1.5s"></i></span><em>Outlined</em></div><div><span class="b5 tx2">건너뛰기<i class="rip" style="--d:2s"></i></span><em>Text</em></div></div>` });
add({ id: 'an-fab', k: 'FAB와 확장 FAB', e: 'FAB · Extended FAB',
  d: '화면의 가장 중요한 행동 하나를 떠 있는 버튼으로 둬요. 글자가 붙은 확장 FAB는 스크롤을 내리면 아이콘만 남게 줄어들고, 올리면 다시 펼쳐져요.',
  u: '한 화면에 FAB는 하나만 두세요. 확장 FAB는 행동이 아이콘만으로 분명하지 않을 때 써요. 머티리얼 3에서 FAB는 둥근 사각형(16dp)이고, 색은 primary container가 기본이에요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b style="font-size:1.2em">메모</b></span><div class="mv"><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span><span class="ln" style="width:40%"></span></span><span class="m3card"><span class="ln" style="width:65%"></span><span class="ln" style="width:55%"></span></span><span class="m3card"><span class="ln" style="width:75%"></span><span class="ln" style="width:45%"></span></span><span class="m3card"><span class="ln" style="width:60%"></span><span class="ln" style="width:50%"></span></span></div></div><span class="xf"><i>✎</i>새 메모</span></div>` });
})();
