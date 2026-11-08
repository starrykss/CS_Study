(window.UX = window.UX || []).push({
  id: 's-state', short: '상태·제스처', en: 'States & gestures',
  title: '누르고, 끌고, 꼬집는 순간들',
  sub: '같은 버튼도 상황마다 다른 얼굴을 가져요. 상태와 제스처를 빠짐없이 설계해야 화면이 살아 있어요.',
  css: `
@keyframes cyc3{0%{opacity:1}33.33%,100%{opacity:0}}
@keyframes cyc4{0%{opacity:1}25%,100%{opacity:0}}
@keyframes cyc6{0%{opacity:1}16.66%,100%{opacity:0}}
.sc .stk{display:grid;place-items:center}
.sc .stk>*{grid-area:1/1}

.i-states .wr{display:flex;flex-direction:column;align-items:center;gap:1.4em}
.i-states .stk>*{opacity:0;animation:cyc6 6s steps(1) infinite}
.i-states .b{min-width:11em;font-size:1.3em;padding:.7em 1.4em;border-radius:.8em}
.i-states .hv{filter:brightness(.88)}
.i-states .pr{filter:brightness(.75);transform:scale(.95)}
.i-states .fc{box-shadow:0 0 0 .18em var(--bg),0 0 0 .36em var(--ink)}
.i-states .ds{background:var(--line);color:var(--ink-3)}
.i-states .ld{display:grid;place-items:center;color:transparent}
.i-states .ld i{position:absolute;width:1.2em;height:1.2em;border-radius:50%;border:.18em solid color-mix(in srgb,var(--accent-ink) 35%,transparent);border-top-color:var(--accent-ink);animation:spin .8s linear infinite}
.i-states .lbs span{font-family:var(--f-mono);font-size:.95em;color:var(--ink-2)}
.i-states .cur{left:62%;top:44%;animation:sts-c 6s steps(1) infinite}
@keyframes sts-c{0%{opacity:0}16.66%,50%{opacity:1}50.01%,100%{opacity:0}}

.i-load .b{position:relative;display:grid;place-items:center;height:3.4em;width:16em;border-radius:1.7em;background:var(--accent);color:var(--accent-ink);font-size:1.1em;font-weight:600;overflow:hidden;animation:ld-w 4s cubic-bezier(.4,0,.2,1) infinite}
.i-load .b>*{grid-area:1/1}
.i-load .t{animation:ld-t 4s infinite}
.i-load .spn{width:1.7em;height:1.7em;border-color:color-mix(in srgb,var(--accent-ink) 35%,transparent);border-top-color:var(--accent-ink);opacity:0;animation:spin .8s linear infinite,ld-s 4s infinite}
.i-load .ok{width:.7em;height:1.3em;border:solid var(--accent-ink);border-width:0 .22em .22em 0;transform:translateY(-.15em) rotate(45deg);opacity:0;animation:ld-o 4s infinite}
.i-load .tap{left:50%;top:50%;animation-delay:-1.36s}
@keyframes ld-w{0%,16%{width:16em}24%,82%{width:3.4em}90%,100%{width:16em}}
@keyframes ld-t{0%,16%{opacity:1}20%,86%{opacity:0}92%,100%{opacity:1}}
@keyframes ld-s{0%,22%{opacity:0}26%,58%{opacity:1}62%,100%{opacity:0}}
@keyframes ld-o{0%,60%{opacity:0;transform:translateY(-.15em) rotate(45deg) scale(.4)}66%,82%{opacity:1;transform:translateY(-.15em) rotate(45deg)}86%,100%{opacity:0}}

.i-dis .pan{position:relative;width:11em;height:12em;padding:1.1em;display:flex;flex-direction:column;gap:.5em}
.i-dis .lb{font-size:.8em;color:var(--ink-2)}
.i-dis .in{height:2.4em;border:.14em solid var(--frame);border-radius:.6em}
.i-dis .bt{margin-top:auto;font-size:.9em}
.i-dis .off .bt{background:var(--line);color:var(--ink-3);animation:dis-s 4s infinite}
.i-dis .on .in{animation:dis-b 4s infinite}
.i-dis .hint{font-size:.72em;color:var(--danger);font-weight:500;opacity:0;animation:dis-h 4s infinite}
.i-dis .tap{left:50%;top:85%;animation-delay:-.8s}
@keyframes dis-s{0%,28%,44%,100%{transform:none}31%{transform:translateX(-.2em)}34%{transform:translateX(.2em)}37%{transform:translateX(-.1em)}}
@keyframes dis-b{0%,30%{border-color:var(--frame)}34%,86%{border-color:var(--danger)}94%,100%{border-color:var(--frame)}}
@keyframes dis-h{0%,30%{opacity:0}36%,86%{opacity:1}94%,100%{opacity:0}}

.i-hover .pan{position:relative;width:20em;padding:.8em;display:flex;flex-direction:column;gap:.3em}
.i-hover .rw{padding:.6em .7em;border-radius:.6em;animation:hov-r 3s steps(1) infinite backwards}
.i-hover .rw .ln{flex:1}
.i-hover .rw:nth-child(2){animation-delay:-2s}.i-hover .rw:nth-child(3){animation-delay:-1s}
.i-hover .rw i{font-style:normal;color:var(--ink-3);font-size:.9em;opacity:0;animation:hov-a 3s steps(1) infinite backwards;animation-delay:inherit}
.i-hover .cur{left:60%;top:16%;animation:hov-c 3s cubic-bezier(.4,0,.2,1) infinite}
@keyframes hov-r{0%{background:var(--stage)}33.3%,100%{background:transparent}}
@keyframes hov-a{0%{opacity:1}33.3%,100%{opacity:0}}
@keyframes hov-c{0%,28%{transform:translateY(0)}33%,61%{transform:translateY(3.4em)}66%,94%{transform:translateY(6.8em)}100%{transform:translateY(0)}}

.i-dtap .ph{background:#000}
.i-dtap .ph .im{position:absolute;inset:3em 0 4em;height:auto;border-radius:0;background:linear-gradient(135deg,#ffb36b,#ff5e8a 55%,#7a5cff)}
.i-dtap .hrt{position:absolute;left:50%;top:45%;width:5em;height:5em;margin:-2.5em;fill:#fff;opacity:0;animation:dt-h 4s cubic-bezier(.2,.8,.2,1.4) infinite;filter:drop-shadow(0 .2em .6em rgba(0,0,0,.3))}
.i-dtap .sm{position:absolute;left:1em;bottom:1.4em;width:1.6em;height:1.6em;fill:none;stroke:#fff;stroke-width:2;animation:dt-s 4s infinite}
.i-dtap .t1{left:50%;top:45%;animation-delay:-.8s}.i-dtap .t2{left:50%;top:45%;animation-delay:-.52s}
@keyframes dt-h{0%,29%{opacity:0;transform:scale(.2)}34%{opacity:1;transform:scale(1.15)}38%,60%{opacity:1;transform:none}70%,100%{opacity:0;transform:scale(1.2) translateY(-1em)}}
@keyframes dt-s{0%,30%{fill:none;stroke:#fff}34%,92%{fill:#ff3d5a;stroke:#ff3d5a}100%{fill:none;stroke:#fff}}

.i-pinch .vp{position:relative;width:20em;height:15em;border-radius:1em;overflow:hidden;border:.14em solid var(--frame);background:var(--ui)}
.i-pinch .mp{position:absolute;inset:0;background-color:var(--accent-soft);background-image:linear-gradient(var(--ui) .25em,transparent .25em),linear-gradient(90deg,var(--ui) .25em,transparent .25em);background-size:3em 3em;transform-origin:50% 50%;animation:pin-s 4s cubic-bezier(.4,0,.2,1) infinite}
.i-pinch .mp i{position:absolute;left:46%;top:44%;width:1.4em;height:1.4em;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--danger)}
.i-pinch .f{position:absolute;width:2.6em;height:2.6em;margin:-1.3em;border-radius:50%;background:var(--ink);opacity:0;animation:pin-a 4s cubic-bezier(.4,0,.2,1) infinite}
.i-pinch .f2{animation-name:pin-b}
@keyframes pin-s{0%,16%{transform:none}46%,78%{transform:scale(2)}94%,100%{transform:none}}
@keyframes pin-a{0%,10%{left:42%;top:42%;opacity:0}16%{left:42%;top:42%;opacity:.25}46%{left:22%;top:22%;opacity:.25}52%,100%{left:22%;top:22%;opacity:0}}
@keyframes pin-b{0%,10%{left:58%;top:58%;opacity:0}16%{left:58%;top:58%;opacity:.25}46%{left:78%;top:78%;opacity:.25}52%,100%{left:78%;top:78%;opacity:0}}
`,
  items: [
    {
      id: 'i-states', k: '버튼의 6가지 상태', e: 'Interactive states',
      d: '버튼 하나도 기본, 마우스 올림, 눌림, 키보드 포커스, 비활성, 로딩 상태를 각각 디자인해야 해요.',
      u: '시안에는 기본 상태만 있고 나머지는 개발자가 알아서 만드는 경우가 많아요. 상태표를 함께 넘기세요. 모바일에는 호버가 없으니 눌림 상태가 더 중요하고, 로딩 중에는 같은 버튼을 다시 누르지 못하게 막아야 해요.',
      html: `<div class="wr"><div class="stk"><span class="bt b" style="animation-delay:0s">저장하기</span><span class="bt b hv" style="animation-delay:-5s">저장하기</span><span class="bt b pr" style="animation-delay:-4s">저장하기</span><span class="bt b fc" style="animation-delay:-3s">저장하기</span><span class="bt b ds" style="animation-delay:-2s">저장하기</span><span class="bt b ld" style="animation-delay:-1s">저장하기<i></i></span></div><div class="stk lbs"><span style="animation-delay:0s">1 · 기본 default</span><span style="animation-delay:-5s">2 · 호버 hover</span><span style="animation-delay:-4s">3 · 눌림 pressed</span><span style="animation-delay:-3s">4 · 포커스 focus</span><span style="animation-delay:-2s">5 · 비활성 disabled</span><span style="animation-delay:-1s">6 · 로딩 loading</span></div></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span>`
    },
    {
      id: 'i-load', k: '로딩 버튼', e: 'Loading button',
      d: '누른 버튼이 그 자리에서 로딩 표시로 바뀌고, 끝나면 완료 표시를 보여줘요. 눈이 버튼에서 떠나지 않아도 결과를 알 수 있어요.',
      u: '결제·전송처럼 몇 초 걸리는 동작에 써요. 로딩 중에는 버튼을 비활성으로 만들어 중복 결제를 막으세요. 버튼 너비가 갑자기 바뀌면 주변이 흔들리니 크기를 고정하거나 부드럽게 바꾸세요.',
      html: `<div class="b"><span class="t">32,900원 결제하기</span><span class="spn"></span><span class="ok"></span></div><span class="tap"></span>`
    },
    {
      id: 'i-dis', k: '비활성 버튼 vs 안내', e: 'Disabled vs Explained',
      d: '비활성 버튼은 왜 못 누르는지 알려주지 않아요. 누를 수 있게 두고, 눌렀을 때 무엇이 빠졌는지 짚어주는 방식이 더 친절할 때가 많아요.',
      u: '필수 입력이 하나뿐인 짧은 폼은 비활성 버튼도 괜찮아요. 입력란이 여러 개라면 버튼을 살려 두고 빠진 칸을 표시하세요. 비활성 버튼은 대비가 낮아 저시력 사용자가 아예 못 보기도 해요.',
      html: `<div class="two">
<div class="col off"><div class="pan box"><span class="lb">이름</span><span class="in"></span><span class="bt">다음</span><span class="tap"></span></div><span class="cap">비활성 · 이유 모름</span></div>
<span class="vs">vs</span>
<div class="col on"><div class="pan box"><span class="lb">이름</span><span class="in"></span><span class="hint">이름을 입력해 주세요</span><span class="bt">다음</span><span class="tap"></span></div><span class="cap">누르면 안내</span></div>
</div>`
    },
    {
      id: 'i-hover', k: '호버 상태', e: 'Hover state',
      d: '마우스를 올렸을 때 배경이나 화살표가 나타나 "이건 누를 수 있어요"라고 미리 알려줘요. 웹과 데스크톱에서만 있는 상태예요.',
      u: '호버에만 중요한 기능(삭제 버튼 등)을 숨기면 터치 기기에서는 영영 못 찾아요. 호버는 보조 신호로 쓰고, 누를 수 있다는 건 기본 상태에서도 보이게 하세요.',
      html: `<div class="pan box"><span class="rw"><span class="av"></span><span class="ln"></span><i>›</i></span><span class="rw"><span class="av"></span><span class="ln"></span><i>›</i></span><span class="rw"><span class="av"></span><span class="ln"></span><i>›</i></span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
    },
    {
      id: 'i-dtap', k: '더블탭', e: 'Double tap',
      d: '빠르게 두 번 누르는 제스처예요. 사진 좋아요, 지도·이미지 확대처럼 자주 쓰는 동작의 지름길로 써요.',
      u: '더블탭은 숨겨진 지름길이라 같은 기능의 버튼이 화면에 꼭 있어야 해요. 한 번 누르기와 두 번 누르기가 다른 동작이면 첫 탭에 약간의 지연이 생기니 주의하세요.',
      html: `<div class="ph"><span class="im"></span><svg class="hrt" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><svg class="sm" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><span class="tap t1"></span><span class="tap t2"></span></div>`
    },
    {
      id: 'i-pinch', k: '핀치 줌', e: 'Pinch to zoom',
      d: '두 손가락을 벌리거나 모아서 사진·지도·문서를 확대하고 축소하는 제스처예요.',
      u: '사진과 지도에서는 꼭 지원하세요. 손가락 사이의 지점을 중심으로 커져야 자연스러워요. 웹 페이지에서 확대를 막으면(user-scalable=no) 저시력 사용자가 글을 못 읽으니 막지 마세요.',
      html: `<div class="vp"><div class="mp"><i></i></div><i class="f f1"></i><i class="f f2"></i></div>`
    }
  ]
});
