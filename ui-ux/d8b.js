(() => {
const s = window.UX.find(x => x.id === 's-style');
s.css += `
.st-clay{background:#EADCF8}
.st-clay .wr{display:flex;align-items:center;gap:1.6em}
.st-clay .cl{width:8em;height:8em;border-radius:2.4em;display:grid;place-items:center;box-shadow:.7em .9em 1.4em rgba(80,40,120,.28),inset -.5em -.6em 1em rgba(0,0,0,.14),inset .5em .5em .8em rgba(255,255,255,.75);animation:clay-f 3s ease-in-out infinite alternate}
.st-clay .c1{background:#FFB8D2}.st-clay .c2{background:#A9E4FF;animation-delay:-1.5s;width:6.6em;height:6.6em;border-radius:2em}
.st-clay .cl b{width:3em;height:3em;border-radius:50%;background:#fff;box-shadow:inset -.25em -.3em .5em rgba(0,0,0,.12),.2em .3em .6em rgba(0,0,0,.12)}
.st-clay .c2 b{width:2.4em;height:2.4em;border-radius:.8em;background:#FFE58F}
@keyframes clay-f{to{transform:translateY(-.8em) rotate(-3deg)}}

.st-brut{background:#FFF4D6}
.st-brut .cd{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.8em;background:#fff;border:.25em solid #000;box-shadow:.55em .55em 0 #000;font-family:var(--f-txt);color:#000}
.st-brut .tag{align-self:flex-start;padding:.15em .6em;background:#FF6B9A;border:.18em solid #000;font-weight:800;font-size:.8em}
.st-brut b{font-size:1.7em;font-weight:900;line-height:1.1;letter-spacing:-.02em}
.st-brut .bt3{align-self:flex-start;padding:.55em 1.2em;background:#FFD23F;border:.22em solid #000;box-shadow:.35em .35em 0 #000;font-weight:800;animation:brut-p 4s infinite}
@keyframes brut-p{0%,44%,58%,100%{transform:none;box-shadow:.35em .35em 0 #000}48%,54%{transform:translate(.35em,.35em);box-shadow:0 0 0 #000}}

.st-bento .gr{display:grid;grid-template-columns:repeat(4,4.6em);grid-auto-rows:4.6em;gap:.6em}
.st-bento .gr span{border-radius:1em;background:var(--ui);border:.1em solid var(--rule);padding:.6em;display:flex;flex-direction:column;justify-content:flex-end;gap:.25em;animation:bento-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .08s)}
.st-bento .a{grid-column:span 2;grid-row:span 2;background:var(--ink)!important;color:var(--bg)}
.st-bento .a b{font-size:2.4em;font-weight:800;line-height:1;letter-spacing:-.03em}
.st-bento .a em{font-style:normal;font-size:.8em;opacity:.7}
.st-bento .b{grid-column:span 2;background:var(--accent-soft)!important}
.st-bento .c{background:var(--warn-soft)!important}
.st-bento .gr .ln{width:70%}
@keyframes bento-k{0%,6%{opacity:0;transform:scale(.85)}20%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:scale(.95)}}

.st-dark .wr{position:relative;width:20em;height:13em}
.st-dark .th{position:absolute;inset:0;border-radius:1.2em;padding:1.2em;display:flex;flex-direction:column;gap:.7em;font-family:var(--f-txt)}
.st-dark .lt{background:#F4F5F7;color:#15181c;border:.1em solid #dfe3e8}
.st-dark .dk{background:#121418;color:#E6E8EB;border:.1em solid #2a2e35;animation:dark-k 5s ease-in-out infinite}
.st-dark .th .cd{padding:.8em;border-radius:.8em;display:flex;flex-direction:column;gap:.45em}
.st-dark .lt .cd{background:#fff;box-shadow:0 .3em .8em -.3em rgba(0,0,0,.18)}
.st-dark .dk .cd{background:#1E2127}
.st-dark .th i{height:.55em;border-radius:1em;background:currentColor;opacity:.25}
.st-dark .th b{font-size:1em}
.st-dark .th .ac{align-self:flex-start;padding:.35em .9em;border-radius:.6em;font-size:.8em;font-weight:600}
.st-dark .lt .ac{background:#0C9B72;color:#fff}.st-dark .dk .ac{background:#2BC995;color:#04231A}
.st-dark .ico{position:absolute;right:1em;top:1em;font-size:1.2em}
@keyframes dark-k{0%,30%{clip-path:circle(0% at 92% 10%)}50%,80%{clip-path:circle(150% at 92% 10%)}100%{clip-path:circle(0% at 92% 10%)}}

.st-aurora{background:#0b0b1a;overflow:hidden}
.st-aurora .bl{position:absolute;width:16em;height:16em;border-radius:50%;filter:blur(2.4em);opacity:.85;mix-blend-mode:screen}
.st-aurora .b1{background:#7b5cff;left:-2em;top:-4em;animation:au-a 7s ease-in-out infinite alternate}
.st-aurora .b2{background:#00d4c8;right:-3em;top:2em;animation:au-b 8s ease-in-out infinite alternate}
.st-aurora .b3{background:#ff4fa3;left:8em;bottom:-8em;animation:au-c 6s ease-in-out infinite alternate}
.st-aurora .tx{position:relative;text-align:center;color:#fff;font-family:var(--f-txt)}
.st-aurora .tx b{display:block;font-size:2.6em;font-weight:800;letter-spacing:-.03em;line-height:1.1}
.st-aurora .tx span{font-size:.95em;opacity:.75}
@keyframes au-a{to{transform:translate(9em,5em) scale(1.2)}}
@keyframes au-b{to{transform:translate(-8em,4em) scale(.8)}}
@keyframes au-c{to{transform:translate(-6em,-7em) scale(1.1)}}

.st-swiss{background:#F2F0EB}
.st-swiss .pg{position:relative;width:22em;height:16em;font-family:var(--f-txt);color:#111}
.st-swiss .gl{position:absolute;top:0;bottom:0;width:.06em;background:#c9c4b8;transform-origin:top;animation:sw-g 4s cubic-bezier(.4,0,.2,1) infinite}
.st-swiss .ci{position:absolute;right:1em;top:.8em;width:6.4em;height:6.4em;border-radius:50%;background:#E3271B;animation:sw-c 4s cubic-bezier(.2,.8,.2,1) infinite}
.st-swiss .hl{position:absolute;left:0;bottom:.5em;font-size:3.6em;font-weight:800;line-height:.95;letter-spacing:-.04em;animation:sw-t 4s cubic-bezier(.2,.8,.2,1) infinite}
.st-swiss .meta{position:absolute;left:0;bottom:.2em;display:flex;gap:2.2em;font-family:var(--f-mono);font-size:.75em;animation:sw-t 4s .15s cubic-bezier(.2,.8,.2,1) infinite backwards}
@keyframes sw-g{0%,4%{transform:scaleY(0)}20%,90%{transform:none}100%{transform:scaleY(0)}}
@keyframes sw-c{0%,14%{transform:scale(0)}30%,90%{transform:none}100%{transform:scale(0)}}
@keyframes sw-t{0%,24%{opacity:0;transform:translateX(-1em)}38%,90%{opacity:1;transform:none}100%{opacity:0}}
`;
s.items.push(
  {
    id: 'st-clay', k: '클레이모피즘', e: 'Claymorphism',
    d: '찰흙으로 빚은 것처럼 통통하고 둥근 3D 느낌에, 파스텔 색과 안팎의 부드러운 그림자를 쓰는 스타일이에요.',
    u: '어린이 서비스, 금융 앱의 친근한 일러스트, 3D 아이콘처럼 귀엽고 다정한 인상이 필요한 곳에 어울려요. 글자가 많은 화면이나 정보 밀도가 높은 업무 도구에는 과해요.',
    html: `<div class="wr"><span class="cl c1"><b></b></span><span class="cl c2"><b></b></span></div>`
  },
  {
    id: 'st-brut', k: '네오 브루탈리즘', e: 'Neo-brutalism',
    d: '두꺼운 검은 테두리, 번지지 않는 진한 그림자, 원색 배경으로 일부러 거칠고 날것처럼 보이게 하는 스타일이에요.',
    u: 'Gumroad, Figma의 일부 마케팅 페이지처럼 개성을 강하게 드러내야 하는 브랜드에 잘 맞아요. 버튼을 누르면 그림자 쪽으로 쏙 들어가는 반응이 특징이에요. 오래 쓰는 업무 화면에서는 눈이 피로할 수 있어요.',
    html: `<div class="cd"><span class="tag">NEW</span><b>날것 그대로의<br>디자인</b><span class="bt3">시작하기 →</span></div>`
  },
  {
    id: 'st-bento', k: '벤토 그리드', e: 'Bento grid',
    d: '도시락 칸처럼 크기가 다른 둥근 타일들을 격자에 맞춰 배치해, 여러 정보를 한 화면에 정리해 보여주는 레이아웃이에요.',
    u: '애플 제품 소개 슬라이드에서 널리 퍼졌어요. 기능 소개, 대시보드, 포트폴리오에 좋아요. 가장 중요한 하나를 큰 칸에 두고 나머지를 작게 배치해야 위계가 생겨요. 칸마다 다른 스타일을 쓰면 산만해져요.',
    html: `<div class="gr"><span class="a" style="--i:0"><b>98%</b><em>면접 완료율</em></span><span class="b" style="--i:1"><span class="ln"></span></span><span class="c" style="--i:2"><span class="ln"></span></span><span style="--i:3"><span class="ln"></span></span><span style="--i:4;grid-column:span 2"><span class="ln"></span></span><span style="--i:5;grid-column:span 2" class="c"><span class="ln"></span></span></div>`
  },
  {
    id: 'st-dark', k: '다크 모드', e: 'Dark mode',
    d: '어두운 배경에 밝은 글자를 쓰는 테마예요. 단순히 색을 뒤집는 게 아니라, 위로 올라온 면일수록 조금씩 밝게 만들어 깊이를 표현해요.',
    u: '완전한 검정(#000)보다 아주 어두운 회색이 눈이 편하고 그림자 대신 밝기로 층을 나눌 수 있어요. 강조색은 채도를 살짝 낮추거나 밝게 조정해야 번지지 않아요. 시스템 설정을 따르는 것을 기본으로 하세요.',
    html: `<div class="wr"><div class="th lt"><span class="ico">☀</span><b>오늘의 연습</b><div class="cd"><i style="width:80%"></i><i style="width:55%"></i></div><span class="ac">시작</span></div><div class="th dk"><span class="ico">☾</span><b>오늘의 연습</b><div class="cd"><i style="width:80%"></i><i style="width:55%"></i></div><span class="ac">시작</span></div></div>`
  },
  {
    id: 'st-aurora', k: '오로라 그라데이션', e: 'Aurora · Mesh gradient',
    d: '여러 색이 크게 번지며 천천히 움직이는 배경으로, 단색보다 깊고 생동감 있는 분위기를 만들어요.',
    u: 'AI·테크 서비스 랜딩 페이지와 앱 첫 화면에서 많이 써요. 배경은 화려해도 글자는 단순하게, 그라데이션 위 글자 대비를 꼭 확인하세요. 계속 움직이는 배경은 동작 줄이기 설정에서 멈춰야 해요.',
    html: `<span class="bl b1"></span><span class="bl b2"></span><span class="bl b3"></span><div class="tx"><b>Hello, AI</b><span>오로라 그라데이션</span></div>`
  },
  {
    id: 'st-swiss', k: '스위스 스타일', e: 'Swiss style · International Typographic',
    d: '엄격한 격자, 큰 산세리프 글자, 비대칭 배치, 절제된 색으로 정보를 명료하게 전달하는 1950년대 스위스에서 시작된 스타일이에요.',
    u: '지금 웹 디자인의 그리드와 타이포그래피 원칙 대부분이 여기서 왔어요. 장식 없이 글자 크기와 여백만으로 위계를 만들 때 참고하세요. 포스터, 브랜드 사이트, 에디토리얼 페이지에 잘 어울려요.',
    html: `<div class="pg"><i class="gl" style="left:0"></i><i class="gl" style="left:33.3%"></i><i class="gl" style="left:66.6%"></i><span class="ci"></span><span class="hl">Grid<br>Type</span><div class="meta"><span>01 / Layout</span><span>1950s</span></div></div>`
  }
);
})();
