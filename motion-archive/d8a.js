(window.UX = window.UX || []).push({
  id: 's-style', short: '디자인 스타일', en: 'Design styles',
  title: '시대를 만든 디자인 스타일',
  sub: '같은 버튼도 스타일에 따라 전혀 다른 느낌이 나요. 각 스타일에는 등장한 이유와 치러야 할 대가가 있어요.',
  css: `
.st-skeu{background:radial-gradient(120% 90% at 30% 10%,#5b4636,#2c2018)}
.st-skeu .pn{position:relative;width:22em;height:14em;border-radius:1.2em;background:linear-gradient(180deg,#e9e9e9,#bdbdbd 48%,#a9a9a9 52%,#cfcfcf);box-shadow:0 .1em 0 #fff inset,0 -.15em 0 rgba(0,0,0,.25) inset,0 1.2em 2em -.6em rgba(0,0,0,.7);display:flex;align-items:center;justify-content:space-around;padding:0 1.6em;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 .1em,rgba(0,0,0,.04) .1em .25em),linear-gradient(180deg,#ececec,#c4c4c4)}
.st-skeu .kn{position:relative;width:7.4em;height:7.4em;border-radius:50%;background:conic-gradient(from 0deg,#f4f4f4,#9a9a9a,#efefef,#8c8c8c,#f4f4f4,#9a9a9a,#efefef,#8c8c8c,#f4f4f4);box-shadow:0 .5em 1em rgba(0,0,0,.5),0 0 0 .5em #8d8d8d,0 0 0 .6em #ddd;animation:skeu-k 4s ease-in-out infinite}
.st-skeu .kn::after{content:"";position:absolute;left:50%;top:.6em;width:.4em;height:1.6em;margin-left:-.2em;border-radius:.2em;background:#c0392b;box-shadow:0 0 .3em #ff6b5b}
.st-skeu .cl{display:flex;flex-direction:column;align-items:center;gap:.8em}
.st-skeu .led{width:1.6em;height:1.6em;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffb3a8,#e0261b 45%,#7a0c06);box-shadow:0 0 0 .2em #777,0 0 1.2em #ff3b2b;animation:skeu-l 1.2s ease-in-out infinite alternate}
.st-skeu .lb{font:700 .8em/1 Georgia,serif;letter-spacing:.15em;color:#4a4a4a;text-shadow:0 .08em 0 rgba(255,255,255,.8)}
.st-skeu .bt2{padding:.6em 1.2em;border-radius:.6em;font:700 .9em/1 Georgia,serif;color:#fff;text-shadow:0 -.06em 0 rgba(0,0,0,.4);background:linear-gradient(#ef6a5f,#c0392b);box-shadow:0 .12em 0 rgba(255,255,255,.5) inset,0 .3em 0 #7d1f16,0 .6em .8em rgba(0,0,0,.35);animation:skeu-b 4s infinite}
@keyframes skeu-k{0%,100%{transform:rotate(-120deg)}50%{transform:rotate(100deg)}}
@keyframes skeu-l{to{opacity:.55;box-shadow:0 0 0 .2em #777,0 0 .3em #ff3b2b}}
@keyframes skeu-b{0%,44%,56%,100%{transform:none;box-shadow:0 .12em 0 rgba(255,255,255,.5) inset,0 .3em 0 #7d1f16,0 .6em .8em rgba(0,0,0,.35)}48%,52%{transform:translateY(.25em);box-shadow:0 .12em 0 rgba(255,255,255,.3) inset,0 .05em 0 #7d1f16,0 .2em .3em rgba(0,0,0,.35)}}

.st-flat{background:#ECF0F1}
.st-flat .gr{display:grid;grid-template-columns:repeat(3,5.2em);gap:.7em}
.st-flat .gr span{height:5.2em;display:grid;place-items:center;color:#fff;font-size:1.8em;font-weight:700;font-family:var(--f-txt);animation:flat-k 4s cubic-bezier(.3,.7,.2,1) infinite backwards;animation-delay:calc(var(--i) * .08s);font-size:1em}
.st-flat .gr span b{font-size:1.9em;line-height:1}
.st-flat .w{grid-column:span 2;width:auto}
@keyframes flat-k{0%,6%{transform:rotateY(90deg)}18%,88%{transform:none}96%,100%{transform:rotateY(90deg)}}

.st-mat{background:#FAFAFA}
.st-mat .cd{position:relative;width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.7em;background:#fff;border-radius:.3em;box-shadow:0 .1em .3em rgba(0,0,0,.2),0 .1em .1em rgba(0,0,0,.14);animation:mat-e 4s infinite}
.st-mat .hd{height:5em;border-radius:.2em;background:#3F51B5}
.st-mat .t{font:500 1.05em/1.3 var(--f-txt);color:#212121}
.st-mat .s{height:.55em;width:70%;background:#E0E0E0;border-radius:.1em}
.st-mat .rb{position:relative;align-self:flex-end;overflow:hidden;padding:.55em 1.1em;border-radius:.2em;background:#FF4081;color:#fff;font:600 .85em/1 var(--f-txt);letter-spacing:.08em;box-shadow:0 .15em .3em rgba(0,0,0,.25)}
.st-mat .rb::after{content:"";position:absolute;left:50%;top:50%;width:1em;height:1em;margin:-.5em;border-radius:50%;background:rgba(255,255,255,.55);transform:scale(0);animation:mat-r 4s ease-out infinite}
.st-mat .fab{position:absolute;right:-1.2em;top:3.8em;width:2.8em;height:2.8em;border-radius:50%;background:#FF4081;color:#fff;display:grid;place-items:center;font:400 1.6em/1 var(--f-txt);width:1.75em;height:1.75em;box-shadow:0 .2em .4em rgba(0,0,0,.3)}
@keyframes mat-e{0%,40%{box-shadow:0 .1em .3em rgba(0,0,0,.2),0 .1em .1em rgba(0,0,0,.14);transform:none}50%,80%{box-shadow:0 .8em 1.6em rgba(0,0,0,.22),0 .3em .6em rgba(0,0,0,.18);transform:translateY(-.3em)}90%,100%{box-shadow:0 .1em .3em rgba(0,0,0,.2),0 .1em .1em rgba(0,0,0,.14);transform:none}}
@keyframes mat-r{0%,40%{transform:scale(0);opacity:1}60%{transform:scale(12);opacity:0}100%{transform:scale(12);opacity:0}}

.st-neu{background:#E0E5EC}
.st-neu .wr{display:flex;align-items:center;gap:2.4em}
.st-neu .b{width:7em;height:7em;border-radius:1.8em;background:#E0E5EC;display:grid;place-items:center;box-shadow:.6em .6em 1.2em #a3b1c6,-.6em -.6em 1.2em #ffffff;animation:neu-p 4s ease-in-out infinite}
.st-neu .b svg{width:2.4em;height:2.4em;fill:none;stroke:#6d7a8f;stroke-width:2;stroke-linecap:round;animation:neu-i 4s infinite}
.st-neu .cl{display:flex;flex-direction:column;gap:1.1em}
.st-neu .sl{width:9em;height:1.4em;border-radius:1em;background:#E0E5EC;box-shadow:inset .3em .3em .6em #a3b1c6,inset -.3em -.3em .6em #fff;position:relative}
.st-neu .sl i{position:absolute;left:.25em;top:.25em;bottom:.25em;border-radius:1em;background:linear-gradient(90deg,#8fa3ff,#6c7dff);animation:neu-s 4s ease-in-out infinite}
.st-neu .pl{width:9em;padding:.7em 0;text-align:center;border-radius:.9em;font:600 .9em/1 var(--f-txt);color:#6d7a8f;box-shadow:.3em .3em .6em #a3b1c6,-.3em -.3em .6em #fff}
@keyframes neu-p{0%,35%{box-shadow:.6em .6em 1.2em #a3b1c6,-.6em -.6em 1.2em #fff}45%,75%{box-shadow:inset .5em .5em 1em #a3b1c6,inset -.5em -.5em 1em #fff}85%,100%{box-shadow:.6em .6em 1.2em #a3b1c6,-.6em -.6em 1.2em #fff}}
@keyframes neu-i{0%,35%{stroke:#6d7a8f}45%,75%{stroke:#6c7dff}85%,100%{stroke:#6d7a8f}}
@keyframes neu-s{0%,100%{width:25%}50%{width:70%}}

.st-glass{background:#1b1440;overflow:hidden}
.st-glass .bl{position:absolute;border-radius:50%;filter:blur(.4em)}
.st-glass .b1{width:11em;height:11em;left:3em;top:2em;background:radial-gradient(circle at 30% 30%,#ff7ac6,#d1307e);animation:gl-a 6s ease-in-out infinite alternate}
.st-glass .b2{width:9em;height:9em;right:4em;bottom:1em;background:radial-gradient(circle at 30% 30%,#7cf0ff,#2f7bff);animation:gl-b 6s ease-in-out infinite alternate}
.st-glass .b3{width:5em;height:5em;right:10em;top:2.5em;background:radial-gradient(circle at 30% 30%,#ffe27a,#ff9b2f);animation:gl-a 5s ease-in-out infinite alternate-reverse}
.st-glass .cd{position:relative;width:18em;padding:1.5em;display:flex;flex-direction:column;gap:.7em;border-radius:1.4em;background:rgba(255,255,255,.14);border:.1em solid rgba(255,255,255,.4);box-shadow:0 1em 2em -1em rgba(0,0,0,.5);-webkit-backdrop-filter:blur(1em) saturate(1.4);backdrop-filter:blur(1em) saturate(1.4);color:#fff}
.st-glass .cd b{font:700 1.5em/1.2 var(--f-txt);letter-spacing:-.01em}
.st-glass .cd span{font:400 .85em/1.4 var(--f-txt);opacity:.8}
.st-glass .cd i{height:.55em;border-radius:1em;background:rgba(255,255,255,.45)}
@keyframes gl-a{to{transform:translate(4em,2em) scale(1.1)}}
@keyframes gl-b{to{transform:translate(-5em,-3em) scale(.9)}}

.st-liquid{overflow:hidden;background:#0d0f14}
.st-liquid .ph2{position:relative;width:12.5em;height:22em;border-radius:2em;overflow:hidden;border:.25em solid #222;background:#111}
.st-liquid .feed{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;gap:.5em;padding:.6em;animation:lq-s 8s linear infinite}
.st-liquid .feed span{height:5.4em;border-radius:1em;flex:none}
.st-liquid .f1{background:linear-gradient(135deg,#ff9a3c,#ff3d77)}.st-liquid .f2{background:linear-gradient(135deg,#2ee6a6,#1c7cff)}.st-liquid .f3{background:linear-gradient(135deg,#ffd23f,#43c6ff)}.st-liquid .f4{background:linear-gradient(135deg,#b06bff,#ff6bd6)}
.st-liquid .bar{position:absolute;left:.7em;right:.7em;bottom:.8em;height:3.4em;border-radius:2em;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;background:rgba(255,255,255,.12);-webkit-backdrop-filter:blur(.35em) saturate(1.9) brightness(1.08);backdrop-filter:blur(.35em) saturate(1.9) brightness(1.08);box-shadow:inset .1em .12em .1em rgba(255,255,255,.75),inset -.08em -.1em .12em rgba(255,255,255,.3),inset 0 0 1.2em rgba(255,255,255,.12),0 .6em 1.4em -.4em rgba(0,0,0,.6)}
.st-liquid .bar i{position:relative;justify-self:center;width:1.2em;height:1.2em;border-radius:.35em;border:.16em solid rgba(255,255,255,.9);z-index:1}
.st-liquid .dr{position:absolute;top:.35em;bottom:.35em;left:.35em;width:calc(33.3% - .3em);border-radius:2em;background:rgba(255,255,255,.22);box-shadow:inset .08em .1em .08em rgba(255,255,255,.8),inset 0 -.1em .2em rgba(255,255,255,.25);animation:lq-d 4s cubic-bezier(.5,0,.2,1.3) infinite}
@keyframes lq-s{to{transform:translateY(-23.6em)}}
@keyframes lq-d{0%,20%{transform:none;width:calc(33.3% - .3em)}28%{transform:translateX(.6em);width:calc(50% - .3em)}36%,62%{transform:translateX(3.53em);width:calc(33.3% - .3em)}70%{transform:translateX(1.6em);width:calc(50% - .3em)}78%,100%{transform:none;width:calc(33.3% - .3em)}}
`,
  items: [
    {
      id: 'st-skeu', k: '스큐어모피즘', e: 'Skeuomorphism',
      d: '가죽, 금속, 나무 같은 실제 물건의 질감과 입체감을 화면에 그대로 옮긴 스타일이에요.',
      u: '초기 아이폰(iOS 6까지)이 대표적이에요. 터치스크린이 낯설던 시절, 익숙한 물건처럼 보여서 어떻게 쓰는지 바로 알게 해줬어요. 지금은 무겁고 낡아 보일 수 있어 음악 장비 앱이나 게임처럼 손맛이 중요한 곳에 부분적으로 써요.',
      html: `<div class="pn"><div class="cl"><span class="kn"></span><span class="lb">VOLUME</span></div><div class="cl"><span class="led"></span><span class="bt2">REC</span><span class="lb">INPUT</span></div></div>`
    },
    {
      id: 'st-flat', k: '플랫 디자인', e: 'Flat design',
      d: '그림자, 질감, 그라데이션을 걷어내고 단색 면과 단순한 도형, 큰 글자로만 표현하는 스타일이에요.',
      u: '윈도우 8의 메트로 UI와 2013년 iOS 7이 대표적이에요. 가볍고 깔끔하지만 무엇을 누를 수 있는지 구분이 약해지는 문제가 있어서, 이후 살짝 그림자를 다시 더한 "플랫 2.0"과 머티리얼 디자인으로 이어졌어요.',
      html: `<div class="gr"><span class="w" style="--i:0;background:#E74C3C"><b>≡</b></span><span style="--i:1;background:#3498DB"><b>✉</b></span><span style="--i:2;background:#2ECC71"><b>✓</b></span><span style="--i:3;background:#F1C40F"><b>★</b></span><span style="--i:4;background:#9B59B6"><b>♪</b></span></div>`
    },
    {
      id: 'st-mat', k: '머티리얼 디자인', e: 'Material Design',
      d: '구글이 만든 디자인 언어로, 화면 요소를 높이가 다른 종이 장으로 보고 그림자로 앞뒤를 표현해요. 누르면 물결(ripple)이 퍼져요.',
      u: '2014년 처음 나왔고, 지금은 사용자 배경화면에서 색을 뽑아 쓰는 머티리얼 3(Material You)를 거쳐 표현력을 키운 머티리얼 3 익스프레시브로 이어지고 있어요. 안드로이드 앱을 만든다면 컴포넌트 이름과 동작의 기준이 돼요.',
      html: `<div class="cd"><span class="hd"></span><span class="fab">+</span><span class="t">머티리얼 카드</span><span class="s"></span><span class="rb">BUTTON</span></div>`
    },
    {
      id: 'st-neu', k: '뉴모피즘', e: 'Neumorphism',
      d: '배경과 같은 색의 요소에 밝은 그림자와 어두운 그림자를 함께 줘서, 표면이 부드럽게 솟거나 눌린 것처럼 보이게 해요.',
      u: '2019~2020년에 크게 유행했어요. 부드럽고 촉감이 느껴지지만, 배경과 요소의 명도 차이가 거의 없어서 버튼이 잘 안 보이고 접근성 대비 기준을 맞추기 어려워요. 실제 서비스에서는 포인트로만 써요.',
      html: `<div class="wr"><span class="b"><svg viewBox="0 0 24 24"><path d="M12 3v9M6.3 6.3a8 8 0 1 0 11.4 0"/></svg></span><div class="cl"><span class="sl"><i></i></span><span class="pl">음량</span></div></div>`
    },
    {
      id: 'st-glass', k: '글래스모피즘', e: 'Glassmorphism',
      d: '반투명한 유리판처럼 뒤 배경을 흐리게 비추는 카드에, 얇은 밝은 테두리를 더해 깊이감을 주는 스타일이에요.',
      u: '윈도우 11의 반투명 재질, macOS 사이드바처럼 화려한 배경 위에 떠 있는 패널에 잘 어울려요. 배경이 복잡하면 글자가 안 읽히니 흐림을 충분히 주고 대비를 꼭 확인하세요. 흐림 효과는 저사양 기기에서 무거울 수 있어요.',
      html: `<span class="bl b1"></span><span class="bl b2"></span><span class="bl b3"></span><div class="cd"><b>글래스 카드</b><span>뒤 배경이 흐리게 비쳐요</span><i style="width:80%"></i><i style="width:55%"></i></div>`
    },
    {
      id: 'st-liquid', k: '리퀴드 글래스', e: 'Liquid Glass',
      d: '애플이 2025년 iOS 26과 함께 발표한 디자인 재질이에요. 유리가 뒤 화면을 굴절시키고 빛을 반사하며, 누르거나 움직이면 액체처럼 늘어나고 합쳐져요.',
      u: '탭 바, 툴바, 버튼처럼 콘텐츠 위에 뜨는 조작 요소에 쓰고, 콘텐츠 자체에는 쓰지 않는 게 원칙이에요. 스크롤하면 탭 바가 작아지며 콘텐츠에 자리를 내줘요. 글래스모피즘보다 투명하고 움직임이 핵심이라 대비와 가독성 확인이 더 중요해요.',
      html: `<div class="ph2"><div class="feed"><span class="f1"></span><span class="f2"></span><span class="f3"></span><span class="f4"></span><span class="f1"></span><span class="f2"></span><span class="f3"></span><span class="f4"></span></div><div class="bar"><span class="dr"></span><i></i><i></i><i></i></div></div>`
    }
  ]
});
