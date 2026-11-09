(() => {
const s = window.UX.find(x => x.id === 's-visual');
s.css += `
.v-ctr .wr{display:flex;flex-direction:column;align-items:center;gap:1em}
.v-ctr .cd{width:18em;padding:1.4em 1.6em;border-radius:1em;background:#FFFFFF;border:.12em solid var(--frame);display:flex;flex-direction:column;gap:.4em;font-family:var(--f-txt)}
.v-ctr .cd b{font-size:1.5em;font-weight:700;animation:ctr-t 4s infinite}
.v-ctr .cd span{font-size:.95em;animation:ctr-t 4s infinite}
.v-ctr .rt{position:relative;height:1.8em;width:12em}
.v-ctr .rt span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:.5em;font-family:var(--f-mono);font-size:1.1em;font-weight:500}
.v-ctr .r1{color:var(--danger);animation:btln-1 4s steps(1) infinite;animation-delay:-3.76s}
.v-ctr .r2{color:var(--accent);opacity:0;animation:btln-2 4s steps(1) infinite;animation-delay:-3.76s}
@keyframes ctr-t{0%,38%{color:#B9C0C6}50%,90%{color:#2A3036}100%{color:#B9C0C6}}

.v-type .sc2{display:flex;align-items:flex-end;gap:1em}
.v-type .sc2 span{display:flex;flex-direction:column;align-items:center;gap:.5em;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3);animation:typ-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .1s)}
.v-type .sc2 b{font-family:var(--f-txt);font-weight:700;color:var(--ink);line-height:1;font-size:calc(var(--s) / .7)}
@keyframes typ-k{0%,6%{opacity:0;transform:translateY(.8em)}20%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}

.v-631 .wr{display:flex;align-items:center;gap:2em}
.v-631 .ui{width:11em;height:15em;border-radius:1.2em;background:#F3F1EC;padding:1em;display:flex;flex-direction:column;gap:.6em;border:.1em solid #ddd8cd}
.v-631 .ui .h{height:3.6em;border-radius:.7em;background:#2C3E66}
.v-631 .ui .l{height:.55em;border-radius:1em;background:#cfc9bc}
.v-631 .ui .k{height:2.4em;border-radius:.6em;background:#2C3E66;opacity:.85}
.v-631 .ui .a{margin-top:auto;height:2.2em;border-radius:.6em;background:#FF7A45}
.v-631 .bar{display:flex;flex-direction:column;gap:.6em;width:10em}
.v-631 .bar div{display:flex;align-items:center;gap:.6em;font-family:var(--f-mono);font-size:.8em;color:var(--ink-2)}
.v-631 .bar i{height:1.4em;border-radius:.3em;transform-origin:left;animation:c631-k 4s cubic-bezier(.3,.7,.2,1) infinite backwards}
.v-631 .bar div:nth-child(2) i{animation-delay:.15s}.v-631 .bar div:nth-child(3) i{animation-delay:.3s}
@keyframes c631-k{0%,8%{transform:scaleX(0)}26%,88%{transform:none}100%{transform:scaleX(0)}}

.v-scan .wr{display:flex;gap:1.6em}
.v-scan .pg{position:relative;width:11em;height:14em;padding:1em;display:flex;flex-direction:column;gap:.55em}
.v-scan .pg .im{height:3.6em}
.v-scan svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.v-scan path{fill:none;stroke:var(--danger);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;animation:scan-k 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes scan-k{0%,6%{stroke-dashoffset:100}60%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}

.v-resp .vp{width:12em;height:15em;padding:.8em;border-radius:.9em;background:var(--ui);border:.14em solid var(--frame);display:flex;flex-direction:column;gap:.6em;overflow:hidden;animation:resp-w 6s cubic-bezier(.6,0,.2,1) infinite}
.v-resp .gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(7em,1fr));gap:.5em}
.v-resp .gr span{height:4.2em;border-radius:.5em;background:var(--accent-soft)}
.v-resp .lb{font-family:var(--f-mono);font-size:.75em;color:var(--ink-3);display:grid}
.v-resp .lb span{grid-area:1/1;opacity:0}
.v-resp .l1{animation:resp-1 6s steps(1) infinite}.v-resp .l2{animation:resp-2 6s steps(1) infinite}.v-resp .l3{animation:resp-3 6s steps(1) infinite}
@keyframes resp-w{0%,22%{width:9em}33%,55%{width:17em}66%,88%{width:27em}100%{width:9em}}
@keyframes resp-1{0%{opacity:1}28%{opacity:0}94%{opacity:1}}
@keyframes resp-2{0%{opacity:0}28%{opacity:1}61%{opacity:0}}
@keyframes resp-3{0%{opacity:0}61%{opacity:1}94%{opacity:0}}

.v-rad .wr{display:flex;align-items:center;gap:2em}
.v-rad .o{width:10em;height:10em;padding:1.2em;border-radius:2.4em;background:var(--accent-soft);border:.12em solid var(--accent)}
.v-rad .i{width:100%;height:100%;background:var(--ui);border:.12em solid var(--frame)}
.v-rad .bad .i{border-radius:2.4em}
.v-rad .good .i{border-radius:1.2em}
.v-rad .cap{text-align:center}
.v-rad .bad .o{animation:rad-b 4s infinite}
@keyframes rad-b{0%,100%{box-shadow:none}40%,60%{box-shadow:0 0 0 .3em var(--danger-soft)}}
`;
s.items.push(
  {
    id: 'v-ctr', k: '명도 대비', e: 'Contrast · WCAG',
    d: '글자와 배경의 밝기 차이예요. 대비가 낮으면 햇빛 아래, 저시력 사용자, 저가 화면에서 글자가 사라져요.',
    u: '웹 접근성 기준(WCAG AA)은 본문 글자 4.5:1, 큰 글자(약 24px, 굵게 19px 이상)와 아이콘·입력란 테두리 3:1 이상이에요. 연한 회색 안내 문구가 가장 자주 걸려요. 디자인 툴의 대비 검사 플러그인으로 확인하세요.',
    html: `<div class="wr"><div class="cd"><b>오늘의 질문</b><span>자기소개를 1분 안에 해 주세요</span></div><div class="rt"><span class="r1">1.8 : 1 · 부족</span><span class="r2">13.3 : 1 · 통과</span></div></div>`
  },
  {
    id: 'v-type', k: '타이포 스케일', e: 'Type scale',
    d: '글자 크기를 아무렇게나 고르지 않고, 일정한 비율로 커지는 몇 단계만 정해 두고 쓰는 거예요.',
    u: '기본 본문 16px에서 1.2~1.25배씩 키우면 자연스러운 단계가 생겨요. 한 화면에 4~5단계면 충분해요. 한글은 영문보다 같은 크기에서 커 보이고 빽빽해서 줄 간격을 1.5~1.7로 넉넉히 주세요.',
    html: `<div class="sc2"><span style="--i:0;--s:1.2em"><b>가</b>12</span><span style="--i:1;--s:1.4em"><b>가</b>14</span><span style="--i:2;--s:1.6em"><b>가</b>16</span><span style="--i:3;--s:2em"><b>가</b>20</span><span style="--i:4;--s:2.5em"><b>가</b>25</span><span style="--i:5;--s:3.1em"><b>가</b>31</span><span style="--i:6;--s:3.9em"><b>가</b>39</span></div>`
  },
  {
    id: 'v-631', k: '60·30·10 색 규칙', e: '60-30-10 color rule',
    d: '화면의 60%는 바탕색, 30%는 보조색, 10%는 강조색으로 나누면 색이 많아도 정돈돼 보여요.',
    u: '인테리어에서 온 규칙이에요. 강조색 10%는 주요 버튼, 선택 상태, 알림처럼 꼭 눈에 띄어야 하는 곳에만 쓰세요. 강조색이 여기저기 퍼지면 정작 중요한 버튼이 묻혀요.',
    html: `<div class="wr"><div class="ui"><span class="h"></span><span class="l" style="width:80%"></span><span class="l" style="width:60%"></span><span class="k"></span><span class="l" style="width:70%"></span><span class="a"></span></div><div class="bar"><div><i style="width:6em;background:#F3F1EC;border:.1em solid #ddd8cd"></i>60</div><div><i style="width:3em;background:#2C3E66"></i>30</div><div><i style="width:1em;background:#FF7A45"></i>10</div></div></div>`
  },
  {
    id: 'v-scan', k: 'Z·F 패턴', e: 'Z-pattern · F-pattern',
    d: '사람은 화면을 정해진 길로 훑어봐요. 글이 적은 화면은 Z자로, 글이 많은 화면은 F자로 읽는 경향이 있어요.',
    u: '랜딩 페이지는 Z 경로의 끝(오른쪽 아래)에 행동 버튼을, 글이 많은 화면은 F 경로대로 각 문단의 첫 단어와 제목이 중요해요. 핵심 단어를 문장 앞에 두세요.',
    html: `<div class="wr"><div class="col"><div class="pg box"><span class="ln h" style="width:40%"></span><span class="im"></span><span class="ln" style="width:70%"></span><span class="bt" style="align-self:flex-end;margin-top:auto;font-size:.8em">시작</span><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="100" d="M12 10 L88 10 L14 88 L86 88"/></svg></div><span class="cap">Z · 랜딩</span></div><div class="col"><div class="pg box"><span class="ln h" style="width:80%"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:90%"></span><span class="ln h" style="width:55%"></span><span class="ln" style="width:92%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="100" d="M10 10 L88 10 L10 10 L10 36 L58 36 L10 36 L10 92"/></svg></div><span class="cap">F · 글 많은 화면</span></div></div>`
  },
  {
    id: 'v-resp', k: '반응형 레이아웃', e: 'Responsive breakpoints',
    d: '화면 너비에 따라 칸 수와 배치가 바뀌어서, 휴대폰부터 큰 모니터까지 하나의 화면으로 대응해요.',
    u: '보통 모바일(~600px), 태블릿(~1024px), 데스크톱 구간으로 나눠요. 기기 이름보다 내용이 깨지는 지점에서 나누는 게 원칙이고, 작은 화면부터 설계하면 핵심만 남기기 쉬워요.',
    html: `<div class="vp"><div class="lb"><span class="l1">모바일 · 1열</span><span class="l2">태블릿 · 2열</span><span class="l3">데스크톱 · 3열</span></div><div class="gr"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>`
  },
  {
    id: 'v-rad', k: '중첩 모서리 반경', e: 'Nested corner radius',
    d: '둥근 상자 안에 둥근 상자를 넣을 때, 안쪽 반경은 바깥 반경에서 여백을 뺀 값이어야 두 곡선이 나란해 보여요.',
    u: '바깥 24px, 여백 12px이면 안쪽은 12px이에요. 안팎을 같은 반경으로 두면 모서리 쪽 여백만 두꺼워 보여 어색해요. 카드 안 이미지, 버튼 안 아이콘 배경 모두 같은 공식이에요.',
    html: `<div class="wr"><div class="col bad"><div class="o"><div class="i"></div></div><span class="cap">안팎 같은 반경</span></div><div class="col good"><div class="o"><div class="i"></div></div><span class="cap">안쪽 = 바깥 − 여백</span></div></div>`
  }
);
})();
