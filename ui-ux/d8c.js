(() => {
const s = window.UX.find(x => x.id === 's-style');
const heart = ['011000110','111101111','111111111','111111111','011111110','001111100','000111000','000010000'].join('');
s.css += `
.st-mini{background:#F7F6F3}
.st-mini .pg{width:24em;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:2em;font-family:var(--f-txt);color:#1a1a1a}
.st-mini .ob{height:13em;border-radius:.4em;background:linear-gradient(180deg,#ebe8e1,#dcd7cc);display:grid;place-items:center;animation:mini-o 5s ease-in-out infinite}
.st-mini .ob i{width:4.4em;height:7em;border-radius:2.2em;background:linear-gradient(160deg,#fbfaf7,#d9d4c9);box-shadow:0 1em 1.6em -1em rgba(0,0,0,.35)}
.st-mini .tx{display:flex;flex-direction:column;gap:.7em}
.st-mini .tx span{font-size:.65em;letter-spacing:.2em;color:#888}
.st-mini .tx b{font-weight:300;font-size:1.6em;line-height:1.2;letter-spacing:-.01em}
.st-mini .tx u{text-decoration:none;font-size:.75em;border-bottom:.08em solid #1a1a1a;align-self:flex-start;padding-bottom:.15em}
@keyframes mini-o{50%{transform:translateY(-.4em)}}

.st-y2k{background:radial-gradient(circle at 30% 20%,#e9d7ff,#b8e2ff 45%,#ffd1f0 90%)}
.st-y2k .bb{position:relative;display:inline-block;padding:1.2em 2.2em;border-radius:3em;background:linear-gradient(180deg,#ffffff 0%,#d8dde6 35%,#9aa3b5 50%,#e9edf4 70%,#bfc6d4 100%);box-shadow:inset 0 .2em .3em #fff,inset 0 -.3em .5em rgba(0,0,0,.25),0 .6em 1.2em -.4em rgba(80,60,140,.5);font-family:var(--f-txt);font-weight:900;font-size:1.8em;letter-spacing:-.02em;color:#3a3f8f;font-style:italic;text-shadow:0 .06em 0 #fff}
.st-y2k .st5{position:absolute;width:1.6em;height:1.6em;background:#fff;clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);animation:y2k-s 1.8s ease-in-out infinite;filter:drop-shadow(0 0 .3em #fff)}
.st-y2k .holo{position:absolute;inset:-.4em;border-radius:3.4em;background:conic-gradient(from var(--hg),#ff9de2,#9de7ff,#c3ff9d,#ffe59d,#ff9de2);z-index:-1;filter:blur(.2em);animation:y2k-h 3s linear infinite}
@property --hg{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes y2k-s{50%{transform:scale(.4) rotate(45deg);opacity:.6}}
@keyframes y2k-h{to{--hg:360deg}}

.st-iso{background:#EEF1F6}
.st-iso .iso{width:26em;height:19.5em;overflow:visible}
.st-iso .pl{fill:#DCE2EC}
.st-iso .cb{animation:iso-d 4s cubic-bezier(.3,.7,.2,1.15) infinite backwards;animation-delay:calc(var(--i) * .12s)}
@keyframes iso-d{0%,4%{transform:translateY(-90px);opacity:0}18%,86%{transform:none;opacity:1}96%,100%{transform:none;opacity:0}}

.st-grain{background:linear-gradient(135deg,#ff8a4c,#c2185b 50%,#311b92)}
.st-grain::after{content:"";position:absolute;inset:0;opacity:.45;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grn-k .4s steps(2) infinite}
.st-grain .tx2{position:relative;z-index:1;color:#fff;text-align:center;font-family:var(--f-dis)}
.st-grain .tx2 b{display:block;font-size:3em;font-weight:800;line-height:1;letter-spacing:-.03em}
.st-grain .tx2 span{font-family:var(--f-mono);font-size:.75em;letter-spacing:.2em;opacity:.85}
@keyframes grn-k{50%{background-position:40px 60px}}

.st-kin{background:#111;overflow:hidden}
.st-kin .rows{display:flex;flex-direction:column;gap:.1em;font-family:var(--f-txt);font-weight:900;font-size:3.2em;line-height:1;letter-spacing:-.04em;white-space:nowrap;transform:rotate(-6deg)}
.st-kin .rows span{display:block;color:#fff;animation:kin-a 6s linear infinite}
.st-kin .rows span:nth-child(2){color:transparent;-webkit-text-stroke:.03em #C6FF3D;animation-name:kin-b}
.st-kin .rows span:nth-child(3){color:#C6FF3D;animation-duration:4s}
@keyframes kin-a{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes kin-b{from{transform:translateX(-50%)}to{transform:translateX(0)}}

.st-pixel{background:#1b1f3a}
.st-pixel .wr{display:flex;flex-direction:column;align-items:center;gap:1.4em;font-family:var(--f-mono)}
.st-pixel .ht{display:grid;grid-template-columns:repeat(9,.9em);grid-auto-rows:.9em;animation:px-b .8s steps(2) infinite}
.st-pixel .ht i{background:transparent}
.st-pixel .ht i.on{background:#ff4f7b;box-shadow:inset -.15em -.15em 0 #c2185b}
.st-pixel .ps{color:#FFE14D;font-size:1.3em;font-weight:500;letter-spacing:.15em;animation:blink 1s steps(1) infinite}
.st-pixel .bx2{display:flex;gap:.3em}
.st-pixel .bx2 i{width:1.3em;height:1.3em;background:#3BA7FF;box-shadow:inset -.2em -.2em 0 #1d5fa0,inset .2em .2em 0 #9fd6ff;animation:px-c 1.6s steps(1) infinite;animation-delay:calc(var(--i) * .2s)}
@keyframes px-b{50%{transform:translateY(-.45em)}}
@keyframes px-c{0%{opacity:1}50%{opacity:.25}}
`;
s.items.push(
  {
    id: 'st-mini', k: '미니멀리즘', e: 'Minimalism',
    d: '꼭 필요한 요소만 남기고 넓은 여백과 절제된 글자로 내용 자체를 돋보이게 하는 스타일이에요.',
    u: '덜어내는 게 핵심이라 무엇을 남길지 고르는 판단이 가장 어려워요. 장식을 빼는 만큼 글자 크기·간격·정렬 같은 기본기가 그대로 드러나요. 기능까지 숨겨 버리면 미니멀이 아니라 불친절이 돼요.',
    html: `<div class="pg"><div class="ob"><i></i></div><div class="tx"><span>OBJECT 01</span><b>덜어낼수록<br>선명해져요</b><u>자세히 보기</u></div></div>`
  },
  {
    id: 'st-y2k', k: 'Y2K', e: 'Y2K aesthetic',
    d: '2000년 전후의 디지털 낙관주의를 담은 스타일이에요. 크롬 금속, 무지갯빛 홀로그램, 반짝이, 말랑한 버블 모양이 특징이에요.',
    u: 'Z세대를 겨냥한 패션·음악·이벤트 페이지에서 다시 유행했어요. 강한 개성을 위한 포인트로 쓰고, 정보가 많은 화면에서는 가독성이 떨어지니 버튼과 본문은 단순하게 두세요.',
    html: `<div style="position:relative;isolation:isolate"><span class="holo"></span><span class="bb">CYBER 2000</span><i class="st5" style="left:-1.6em;top:-1.4em"></i><i class="st5" style="right:-1.2em;bottom:-1.2em;animation-delay:.6s"></i><i class="st5" style="right:3em;top:-2em;width:1em;height:1em;animation-delay:1.1s"></i></div>`
  },
  {
    id: 'st-iso', k: '아이소메트릭', e: 'Isometric',
    d: '물체를 비스듬히 위에서 내려다본 각도로, 원근 없이 평행하게 그리는 3D 표현이에요. 구조나 흐름을 입체적으로 설명할 때 좋아요.',
    u: '제품 구조, 데이터 흐름, 서비스 생태계 일러스트에 많이 써요. 모든 선이 같은 각도(보통 30°)를 따라야 어색하지 않아요. 아이콘 세트와 일러스트의 각도를 통일하세요.',
    html: `<svg class="iso" viewBox="0 0 320 240"><polygon class="pl" points="160.0,52.0 277.8,120.0 160.0,188.0 42.2,120.0"/><g transform="translate(160.0 62.0)"><g class="cb" style="--i:0"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#7C6CF0"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#5B4BD6"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#B7AAFF"/></g></g><g transform="translate(160.0 22.0)"><g class="cb" style="--i:1"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#7C6CF0"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#5B4BD6"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#B7AAFF"/></g></g><g transform="translate(194.6 82.0)"><g class="cb" style="--i:2"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#4D8DF7"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#2F6FE0"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#A9CBFF"/></g></g><g transform="translate(125.4 82.0)"><g class="cb" style="--i:3"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#2BC995"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#18A07A"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#8EF0CF"/></g></g><g transform="translate(194.6 122.0)"><g class="cb" style="--i:4"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#F6A23C"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#D9821C"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#FFD08A"/></g></g><g transform="translate(125.4 122.0)"><g class="cb" style="--i:5"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#4D8DF7"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#2F6FE0"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#A9CBFF"/></g></g><g transform="translate(160.0 142.0)"><g class="cb" style="--i:6"><polygon points="-34.6,20.0 0.0,40.0 0.0,80.0 -34.6,60.0" fill="#2BC995"/><polygon points="34.6,20.0 0.0,40.0 0.0,80.0 34.6,60.0" fill="#18A07A"/><polygon points="0.0,0.0 34.6,20.0 0.0,40.0 -34.6,20.0" fill="#8EF0CF"/></g></g></svg>`
  },
  {
    id: 'st-grain', k: '그레인 텍스처', e: 'Grain · Noise texture',
    d: '매끈한 그라데이션 위에 필름 사진 같은 미세한 잡음(노이즈)을 얹어 따뜻하고 손맛 있는 질감을 더하는 스타일이에요.',
    u: '그라데이션의 띠 무늬(밴딩)를 감추는 효과도 있어요. 노이즈는 은은하게, 글자 뒤에는 약하게 두세요. 큰 이미지 파일로 넣기보다 작은 패턴을 반복하거나 SVG 필터로 만들면 가벼워요.',
    html: `<div class="tx2"><b>Warm<br>Noise</b><span>FILM GRAIN 35MM</span></div>`
  },
  {
    id: 'st-kin', k: '키네틱 타이포그래피', e: 'Kinetic typography',
    d: '글자 자체가 움직이고 흐르고 늘어나면서 메시지를 전달하는 스타일이에요. 글자가 그림이자 애니메이션이 돼요.',
    u: '브랜드 캠페인, 이벤트 랜딩, 모션 영상 인트로에서 강렬한 첫인상을 줘요. 움직이는 글자는 읽기 어려우니 핵심 단어 몇 개에만 쓰고, 동작 줄이기 설정에서는 멈춰야 해요.',
    html: `<div class="rows"><span>PRACTICE PRACTICE PRACTICE PRACTICE&nbsp;</span><span>INTERVIEW INTERVIEW INTERVIEW INTERVIEW&nbsp;</span><span>CONFIDENCE CONFIDENCE CONFIDENCE CONFIDENCE&nbsp;</span></div>`
  },
  {
    id: 'st-pixel', k: '픽셀 레트로', e: 'Pixel · 8-bit',
    d: '초기 게임기처럼 큼직한 네모 픽셀과 제한된 색, 뚝뚝 끊기는 움직임으로 향수를 불러일으키는 스타일이에요.',
    u: '게이미피케이션 요소, 이벤트, 개발자 대상 서비스에서 재미를 줄 때 잘 맞아요. 움직임도 부드럽게 보간하지 말고 steps()처럼 끊어서 줘야 진짜 픽셀 느낌이 나요.',
    html: `<div class="wr"><div class="ht">${heart.split('').map(c=>`<i class="${c==='1'?'on':''}"></i>`).join('')}</div><span class="ps">PRESS START</span><div class="bx2"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div></div>`
  }
);
})();
