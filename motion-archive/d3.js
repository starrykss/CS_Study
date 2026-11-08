(window.UX = window.UX || []).push({
  id: 's-text', short: '글자 모션', en: 'Text motion',
  title: '글자가 나타나는 방식',
  sub: '같은 문장도 등장하는 방식에 따라 말투가 바뀌어요. 짧고, 의미가 있을 때만 쓰세요.',
  css: `
@property --tyn{syntax:'<integer>';inherits:true;initial-value:0}
.t-type .bu{display:flex;align-items:flex-end;gap:.8em}
.t-type .av{width:3em;height:3em;background:var(--accent-soft);position:relative}
.t-type .av::after{content:"";position:absolute;left:.85em;top:.85em;width:1.3em;height:1.3em;border-radius:50%;background:var(--accent)}
.t-type .msg{padding:.9em 1.3em;border-radius:1.4em 1.4em 1.4em .3em}
.t-type .ty{display:flex;align-items:center;font-size:3em;font-weight:700;letter-spacing:-.02em;line-height:1.2;animation:ty-n 4.5s linear infinite}
.t-type .ty span{display:inline-block;overflow:hidden;white-space:nowrap;max-width:clamp(0em,(var(--tyn) - var(--i)) * 2em,2em)}
.t-type .who{font-family:var(--f-mono);font-size:.85em;color:var(--ink-3);margin:0 0 .4em .3em}
@keyframes ty-n{0%,6%{--tyn:0}40%,80%{--tyn:5}96%,100%{--tyn:0}}

.t-fade .fu{display:flex;flex-direction:column;align-items:flex-start;gap:.7em;width:22em}
.t-fade .fu>*{animation:fu-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards}
.t-fade .e1{font-family:var(--f-mono);font-size:1em;color:var(--accent);letter-spacing:.08em}
.t-fade .e2{font-size:2.6em;font-weight:700;line-height:1.2;letter-spacing:-.02em;animation-delay:.12s}
.t-fade .e3{animation-delay:.24s}.t-fade .e4{animation-delay:.32s}
@keyframes fu-k{0%,8%{opacity:0;transform:translateY(1.2em)}24%,86%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}

.t-stag .st{display:flex;font-size:3.4em;font-weight:700;letter-spacing:-.02em}
.t-stag .st span{display:inline-block;animation:stg-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .08s)}
.t-stag .st .sp{width:.3em}
@keyframes stg-k{0%,6%{opacity:0;transform:translateY(.6em) rotate(8deg)}22%,84%{opacity:1;transform:none}94%,100%{opacity:0;transform:translateY(-.3em)}}

@property --cu{syntax:'<integer>';inherits:false;initial-value:0}
.t-count .pan{width:20em;padding:1.6em 1.8em;display:flex;flex-direction:column;gap:.2em}
.t-count .lb{font-size:1em;color:var(--ink-2);font-weight:500}
.t-count .num{display:flex;align-items:baseline;gap:.2em;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.t-count .num i{font-style:normal;font-size:4.6em;line-height:1.1;letter-spacing:-.03em;counter-reset:cu var(--cu);animation:cu-k 4s cubic-bezier(.15,.7,.2,1) infinite}
.t-count .num i::after{content:counter(cu)}
.t-count .num em{font-style:normal;font-size:1.6em;color:var(--ink)}
.t-count .bars{display:flex;align-items:flex-end;gap:.4em;height:3em;margin-top:.6em}
.t-count .bars span{flex:1;border-radius:.25em .25em 0 0;background:var(--accent-soft);height:var(--h);transform-origin:bottom;animation:cu-b 4s cubic-bezier(.15,.7,.2,1) infinite}
.t-count .bars span:last-child{background:var(--accent)}
@keyframes cu-k{0%,6%{--cu:0}50%,90%{--cu:864}100%{--cu:0}}
@keyframes cu-b{0%,6%{transform:scaleY(0)}50%,90%{transform:none}100%{transform:scaleY(0)}}

.t-mark .mk{display:flex;flex-direction:column;gap:.3em;align-items:flex-start}
.t-mark .mk span{font-size:1.5em;color:var(--ink-2);font-weight:500}
.t-mark .mk b{font-size:3.2em;font-weight:700;letter-spacing:-.02em;line-height:1.25}
.t-mark mark{color:inherit;background:linear-gradient(var(--warn-soft),var(--warn-soft)) 0 88%/0% 48% no-repeat;animation:mk-k 4s cubic-bezier(.3,.6,.2,1) infinite}
@keyframes mk-k{0%,12%{background-size:0% 48%}34%,86%{background-size:100% 48%}94%,100%{background-size:0% 48%;background-position:100% 88%}}

.t-rot .rt{display:flex;align-items:baseline;gap:.35em;font-size:2.8em;font-weight:700;letter-spacing:-.02em}
.t-rot .win{display:inline-block;height:1.3em;overflow:hidden;line-height:1.3;vertical-align:bottom;position:relative;top:.06em}
.t-rot .tr{display:flex;flex-direction:column;animation:rt-k 6s cubic-bezier(.7,0,.2,1) infinite}
.t-rot .tr b{height:1.3em;color:var(--accent);white-space:nowrap}
@keyframes rt-k{0%,26%{transform:none}33%,59%{transform:translateY(-1.3em)}66%,92%{transform:translateY(-2.6em)}100%{transform:translateY(-3.9em)}}
`,
  items: [
    {
      id: 't-type', k: '타이핑', e: 'Typewriter',
      d: '글자를 한 자씩 찍어 나가서, 누군가 지금 말하고 있다는 느낌을 줘요.',
      u: '챗봇 답변이나 온보딩 인사처럼 누군가 말을 거는 장면에 어울려요. 긴 문단에 쓰면 읽는 속도를 막으니 한두 문장까지만, 다 읽은 사람은 건너뛸 수 있게 하세요.',
      html: `<div><p class="who">면접관</p><div class="bu"><span class="av"></span><div class="msg box"><div class="ty"><span style="--i:0">반</span><span style="--i:1">가</span><span style="--i:2">워</span><span style="--i:3">요</span><span style="--i:4">!</span><i class="ca"></i></div></div></div></div>`
    },
    {
      id: 't-fade', k: '페이드 업', e: 'Fade up',
      d: '아래에서 살짝 떠오르며 나타나, 눈에 거슬리지 않게 시선을 끌어요.',
      u: '가장 무난한 등장 효과예요. 이동 거리는 8~16px, 시간은 200~400ms 정도로 짧게 잡고, 제목 → 본문 순으로 약간씩 늦추면 읽는 순서가 생겨요.',
      html: `<div class="fu"><span class="e1">DESIGN TIP</span><b class="e2">여백도 디자인이에요</b><span class="ln e3" style="width:18em"></span><span class="ln e4" style="width:12em"></span></div>`
    },
    {
      id: 't-stag', k: '글자 순차 등장', e: 'Letter stagger',
      d: '글자마다 조금씩 시간차를 두고 떠올라서 문장에 리듬이 생겨요.',
      u: '랜딩 페이지 헤드라인, 축하 화면처럼 짧은 한 줄을 강조할 때만. 버튼이나 본문에 쓰면 읽기가 느려지고, 글자당 간격은 30~80ms 정도가 적당해요.',
      html: `<div class="st"><span style="--i:0">하</span><span style="--i:1">나</span><span style="--i:2">씩</span><span class="sp" style="--i:3"></span><span style="--i:4">나</span><span style="--i:5">와</span><span style="--i:6">요</span></div>`
    },
    {
      id: 't-count', k: '카운트 업', e: 'Count up',
      d: '숫자가 0부터 목표값까지 빠르게 올라가며 크기를 실감 나게 해요.',
      u: '대시보드 핵심 지표나 누적 사용자 수처럼 많다는 걸 느끼게 할 때. 처음엔 빠르고 끝에서 느려지게 하면 자연스러워요. 실시간으로 자주 바뀌는 숫자에 매번 쓰면 산만해요.',
      html: `<div class="pan box"><span class="lb">이번 주 모의면접</span><span class="num"><i></i><em>회</em></span><span class="bars"><span style="--h:30%"></span><span style="--h:45%"></span><span style="--h:38%"></span><span style="--h:62%"></span><span style="--h:55%"></span><span style="--h:80%"></span><span style="--h:100%"></span></span></div>`
    },
    {
      id: 't-mark', k: '하이라이트', e: 'Highlight',
      d: '형광펜으로 긋듯 배경색이 지나가며 문장 속 핵심 단어를 짚어줘요.',
      u: '문장 안에서 한 단어만 강조할 때 쓰세요. 한 화면에 여러 개 쓰면 아무것도 강조되지 않아요. 글자색만 바꾸는 것보다 눈에 잘 띄고, 링크와 헷갈리지도 않아요.',
      html: `<div class="mk"><span>면접 답변은</span><b><mark>핵심만</mark> 짧게</b></div>`
    },
    {
      id: 't-rot', k: '단어 교체', e: 'Word rotate',
      d: '문장은 그대로 두고 한 자리의 단어만 바꿔 가며 여러 메시지를 한 줄로 보여줘요.',
      u: '"OO을 위한 앱"처럼 히어로 문구에서 대상만 바꿔 보여줄 때. 바뀌는 단어의 길이가 크게 다르면 줄 전체가 흔들리니 글자 수를 비슷하게 맞추세요.',
      html: `<div class="rt"><span>오늘은</span><span class="win"><span class="tr"><b>디자인</b><b>코딩</b><b>면접</b><b>디자인</b></span></span><span>연습</span></div>`
    }
  ]
});
