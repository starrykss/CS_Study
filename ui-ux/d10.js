(window.UX = window.UX || []).push({
  id: 's-motion', short: '모션 원칙', en: 'Motion principles',
  title: '움직임에도 문법이 있어요',
  sub: '같은 거리를 움직여도 속도 곡선과 시간에 따라 무겁게도, 가볍게도 느껴져요.',
  css: `
.m-ease .tr,.m-dur .tr,.m-spr .tr{display:flex;flex-direction:column;gap:1.3em;width:24em}
.m-ease .row,.m-dur .row,.m-spr .row{display:grid;grid-template-columns:6.4em 1fr;align-items:center;gap:.8em}
.m-ease .lb,.m-dur .lb,.m-spr .lb{font-family:var(--f-mono);font-size:.85em;color:var(--ink-2);text-align:right}
.m-ease .rl,.m-dur .rl,.m-spr .rl{position:relative;height:2.4em;border-radius:1.2em;background:var(--ui);border:.1em solid var(--rule)}
.m-ease .ba,.m-dur .ba,.m-spr .ba{position:absolute;left:.3em;top:.3em;width:1.8em;height:1.8em;border-radius:50%;background:var(--accent)}
.m-ease .e1 .ba{animation:ease-k 2.4s linear infinite;background:var(--ink-3)}
.m-ease .e2 .ba{animation:ease-k 2.4s cubic-bezier(.55,0,1,.45) infinite;background:var(--warn)}
.m-ease .e3 .ba{animation:ease-k 2.4s cubic-bezier(0,.55,.45,1) infinite}
@keyframes ease-k{0%,8%{left:.3em}70%,100%{left:calc(100% - 2.1em)}}

.m-io .stg{position:relative;width:24em;height:12em;overflow:hidden;border-radius:1em;border:.1em dashed var(--frame)}
.m-io .cd{position:absolute;left:50%;top:50%;width:11em;margin:-3.4em 0 0 -5.5em;padding:1em;display:flex;flex-direction:column;gap:.6em;animation:io-k 4s infinite}
.m-io .tgl{position:absolute;bottom:.6em;font-family:var(--f-mono);font-size:.8em;color:var(--ink-2);opacity:0}
.m-io .t1{left:.8em;animation:io-1 4s infinite}.m-io .t2{right:.8em;animation:io-2 4s infinite}
@keyframes io-k{0%{transform:translateX(16em);animation-timing-function:cubic-bezier(0,.55,.45,1)}25%,60%{transform:none;animation-timing-function:cubic-bezier(.55,0,1,.45)}78%,100%{transform:translateX(-17em)}}
@keyframes io-1{0%,24%{opacity:1}30%,100%{opacity:0}}
@keyframes io-2{0%,58%{opacity:0}62%,80%{opacity:1}86%,100%{opacity:0}}

.m-spr .s1 .ba{animation:spr-a 2.6s cubic-bezier(.4,0,.2,1) infinite}
.m-spr .s2 .ba{animation:spr-b 2.6s infinite}
@keyframes spr-a{0%,10%{left:.3em}45%,100%{left:calc(100% - 2.1em)}}
@keyframes spr-b{0%,10%{left:.3em;animation-timing-function:cubic-bezier(.3,0,.6,1)}30%{left:calc(100% - 1.2em);animation-timing-function:ease-in-out}38%{left:calc(100% - 2.6em);animation-timing-function:ease-in-out}45%{left:calc(100% - 1.9em)}50%,100%{left:calc(100% - 2.1em)}}

.m-dur .d1 .ba{animation:dur-1 4s cubic-bezier(.2,.8,.2,1) infinite}
.m-dur .d2 .ba{animation:dur-2 4s cubic-bezier(.2,.8,.2,1) infinite}
.m-dur .d3 .ba{animation:dur-3 4s cubic-bezier(.2,.8,.2,1) infinite;background:var(--danger)}
@keyframes dur-1{0%,10%{left:.3em}13.75%,60%{left:calc(100% - 2.1em)}63.75%,100%{left:.3em}}
@keyframes dur-2{0%,10%{left:.3em}17.5%,60%{left:calc(100% - 2.1em)}67.5%,100%{left:.3em}}
@keyframes dur-3{0%,10%{left:.3em}40%,60%{left:calc(100% - 2.1em)}90%,100%{left:.3em}}

.m-heart .wr{display:flex;align-items:center;gap:1em;padding:1.2em 1.8em}
.m-heart .hb{position:relative;width:4em;height:4em;display:grid;place-items:center}
.m-heart .hb svg{width:3.4em;height:3.4em;fill:var(--ui);stroke:var(--ink-3);stroke-width:1.8;animation:hrt-k 4s infinite}
.m-heart .rg{position:absolute;inset:.2em;border-radius:50%;border:.25em solid var(--danger);opacity:0;animation:hrt-r 4s infinite}
.m-heart .pt{position:absolute;left:50%;top:50%;width:.55em;height:.55em;margin:-.275em;border-radius:50%;opacity:0;animation:hrt-p 4s cubic-bezier(.2,.8,.2,1) infinite;--r:0deg}
.m-heart .ct{position:relative;height:1.5em;width:2.4em;overflow:hidden;font-size:1.6em;font-weight:700;font-variant-numeric:tabular-nums}
.m-heart .ct span{display:flex;flex-direction:column;animation:hrt-c 4s cubic-bezier(.3,.7,.2,1.3) infinite}
.m-heart .ct b{height:1.5em;line-height:1.5em}
.m-heart .tap{left:3.8em;top:50%}
@keyframes hrt-k{0%,46%{fill:var(--ui);stroke:var(--ink-3);transform:none}50%{fill:var(--danger);stroke:var(--danger);transform:scale(.7)}58%{transform:scale(1.25)}64%,90%{fill:var(--danger);stroke:var(--danger);transform:none}96%,100%{fill:var(--ui);stroke:var(--ink-3)}}
@keyframes hrt-r{0%,49%{opacity:0;transform:scale(.3)}52%{opacity:1}62%,100%{opacity:0;transform:scale(1.4)}}
@keyframes hrt-p{0%,52%{opacity:0;transform:rotate(var(--r)) translateY(0)}56%{opacity:1}68%,100%{opacity:0;transform:rotate(var(--r)) translateY(-2.8em)}}
@keyframes hrt-c{0%,50%{transform:none}58%,92%{transform:translateY(-1.5em)}100%{transform:none}}

.m-para .vw{position:relative;width:13em;height:19em;border-radius:1.6em;overflow:hidden;border:.14em solid var(--frame);background:linear-gradient(#bfe3ff,#ffe6c7)}
.m-para .ly{position:absolute;left:0;right:0}
.m-para .sun{left:60%;right:auto;top:2em;width:3.4em;height:3.4em;border-radius:50%;background:#ffb547;animation:par-a 6s ease-in-out infinite}
.m-para .mt{top:6em;height:16em;background:linear-gradient(135deg,transparent 40%,#7aa7c7 40.5%) 0 0/50% 100% repeat-x,linear-gradient(225deg,transparent 40%,#7aa7c7 40.5%) 100% 0/50% 100% repeat-x;animation:par-b 6s ease-in-out infinite}
.m-para .hl{top:10.5em;height:16em;border-radius:50% 50% 0 0/2.4em 2.4em 0 0;background:#4f9d74;animation:par-c 6s ease-in-out infinite}
.m-para .fg{top:13.2em;padding:0 1em;display:flex;flex-direction:column;gap:.6em;animation:par-d 6s ease-in-out infinite}
.m-para .fg span{height:3.2em;border-radius:.8em;background:var(--ui);box-shadow:0 .3em .8em -.4em rgba(0,0,0,.35)}
@keyframes par-a{0%,100%{transform:none}50%{transform:translateY(-1em)}}
@keyframes par-b{0%,100%{transform:none}50%{transform:translateY(-2.5em)}}
@keyframes par-c{0%,100%{transform:none}50%{transform:translateY(-5em)}}
@keyframes par-d{0%,100%{transform:none}50%{transform:translateY(-10em)}}
`,
  items: [
    {
      id: 'm-ease', k: '이징 곡선', e: 'Easing · Linear vs Ease',
      d: '움직임의 속도 변화예요. 일정한 속도(linear)는 기계처럼, 점점 느려지는(ease-out) 움직임은 자연스럽게 느껴져요.',
      u: '현실의 물체는 갑자기 출발하거나 멈추지 않아요. 화면 안 움직임은 대부분 ease-out이나 ease-in-out을 쓰고, linear는 로딩 스피너나 색이 바뀌는 효과처럼 위치가 아닌 것에만 쓰세요.',
      html: `<div class="tr"><div class="row e1"><span class="lb">linear</span><span class="rl"><i class="ba"></i></span></div><div class="row e2"><span class="lb">ease-in</span><span class="rl"><i class="ba"></i></span></div><div class="row e3"><span class="lb">ease-out</span><span class="rl"><i class="ba"></i></span></div></div>`
    },
    {
      id: 'm-io', k: '들어올 땐 감속, 나갈 땐 가속', e: 'Enter decelerate · Exit accelerate',
      d: '화면에 들어오는 요소는 빠르게 왔다가 천천히 멈추고(ease-out), 나가는 요소는 천천히 출발해서 빠르게 사라져요(ease-in).',
      u: '들어오는 것은 눈이 따라가며 읽어야 하니 끝을 부드럽게, 나가는 것은 볼 필요가 없으니 빨리 치워 주세요. 나가는 애니메이션은 들어오는 것보다 조금 짧게 잡는 게 보통이에요.',
      html: `<div class="stg"><div class="cd box"><span class="ln h" style="width:60%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><span class="tgl t1">들어올 때 ease-out</span><span class="tgl t2">나갈 때 ease-in</span></div>`
    },
    {
      id: 'm-spr', k: '스프링', e: 'Spring animation',
      d: '용수철처럼 목표를 살짝 지나쳤다가 되돌아오며 멈추는 움직임이에요. 손으로 던진 것처럼 살아 있는 느낌을 줘요.',
      u: 'iOS와 최신 머티리얼은 기본 움직임에 스프링을 써요. 시간 대신 탄성과 감쇠로 정의해서, 사용자가 드래그하다 놓은 속도를 이어받을 수 있는 게 장점이에요. 튕김이 크면 장난스러워 보이니 업무 화면에서는 약하게 쓰세요.',
      html: `<div class="tr"><div class="row s1"><span class="lb">ease-out</span><span class="rl"><i class="ba"></i></span></div><div class="row s2"><span class="lb">spring</span><span class="rl"><i class="ba"></i></span></div></div>`
    },
    {
      id: 'm-dur', k: '지속 시간', e: 'Duration',
      d: '움직임은 짧을수록 빠르고 가볍게, 길수록 무겁고 느리게 느껴져요. 너무 길면 기다리는 시간이 돼요.',
      u: '버튼·토글 같은 작은 변화는 100~200ms, 화면 전환이나 큰 패널은 250~400ms가 기준이에요. 500ms가 넘으면 대부분 답답하게 느껴요. 자주 반복되는 동작일수록 더 짧게 잡으세요.',
      html: `<div class="tr"><div class="row d1"><span class="lb">150ms</span><span class="rl"><i class="ba"></i></span></div><div class="row d2"><span class="lb">300ms</span><span class="rl"><i class="ba"></i></span></div><div class="row d3"><span class="lb">1200ms</span><span class="rl"><i class="ba"></i></span></div></div>`
    },
    {
      id: 'm-heart', k: '마이크로 인터랙션', e: 'Micro-interaction',
      d: '좋아요 하트처럼 작은 동작 하나에 붙는 짧은 반응이에요. 눌렀다는 확신과 소소한 즐거움을 줘요.',
      u: '트리거(누름) → 규칙 → 피드백(모양·색·숫자 변화) → 반복 시의 변화를 함께 설계하세요. 하루에 수십 번 누르는 버튼은 화려함보다 빠르기가 먼저예요. 상태 변화(빈 하트 → 꽉 찬 하트)가 애니메이션 없이도 분명해야 해요.',
      html: `<div class="wr box"><span class="hb"><i class="rg"></i><i class="pt" style="--r:0deg;background:var(--danger)"></i><i class="pt" style="--r:60deg;background:var(--warn)"></i><i class="pt" style="--r:120deg;background:var(--accent)"></i><i class="pt" style="--r:180deg;background:var(--danger)"></i><i class="pt" style="--r:240deg;background:var(--warn)"></i><i class="pt" style="--r:300deg;background:var(--accent)"></i><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></span><span class="ct"><span><b>127</b><b>128</b></span></span><span class="tap"></span></div>`
    },
    {
      id: 'm-para', k: '패럴랙스', e: 'Parallax scrolling',
      d: '스크롤할 때 멀리 있는 층은 느리게, 가까운 층은 빠르게 움직여서 화면에 깊이가 생겨요.',
      u: '브랜드 소개, 스토리텔링 페이지의 첫 화면에 효과적이에요. 과하면 멀미를 일으킬 수 있으니 동작 줄이기 설정에서는 끄고, 글을 읽는 영역에는 쓰지 마세요.',
      html: `<div class="vw"><span class="ly sun"></span><span class="ly mt"></span><span class="ly hl"></span><div class="ly fg"><span></span><span></span><span></span><span></span></div></div>`
    }
  ]
});
