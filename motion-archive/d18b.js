(() => {
const s = window.UX.find(x => x.id === 's-data');
s.css += `
.dz-scat .cf svg{position:absolute;left:1.2em;right:1.2em;top:1.2em;bottom:2.2em;width:calc(100% - 2.4em);height:calc(100% - 3.4em);overflow:visible}
.dz-scat circle{fill:var(--accent);fill-opacity:.7;animation:dzs-k 4s cubic-bezier(.2,.8,.2,1.3) infinite backwards;transform-box:fill-box;transform-origin:center}
.dz-scat .tr{stroke:var(--danger);stroke-width:1;stroke-dasharray:100;stroke-linecap:round;animation:dzs-l 4s cubic-bezier(.4,0,.2,1) infinite}
.dz-scat .yl{position:absolute;left:.2em;top:50%;transform:rotate(-90deg) translateX(-50%);transform-origin:left top;font-family:var(--f-mono);font-size:.65em;color:var(--ink-3)}
@keyframes dzs-k{0%,4%{transform:scale(0)}14%,90%{transform:none}100%{transform:scale(0)}}
@keyframes dzs-l{0%,40%{stroke-dashoffset:100}66%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}

.dz-zero .cf{width:13em;height:13em}
.dz-zero .bars{gap:.6em}
.dz-zero .bad .bars i{animation:none;height:var(--h)}
.dz-zero .yv{position:absolute;left:.2em;font-family:var(--f-mono);font-size:.6em;color:var(--ink-3)}
.dz-zero .bad .cf .ax{background:var(--danger)}
.dz-zero .bk{position:absolute;left:.7em;bottom:1.9em;width:1.2em;height:.6em;border:solid var(--danger);border-width:.15em 0;transform:skewY(-20deg)}
.dz-zero .bars i b{display:block;text-align:center;font-family:var(--f-mono);font-size:.55em;color:var(--ink-2);transform:translateY(-1.6em)}

.dz-color .wr{display:flex;gap:1.6em}
.dz-color .cf{width:13em;height:12em}
.dz-color .bars{gap:.4em}
.dz-color .cat .bars i:nth-child(1){background:#0C9B72}.dz-color .cat .bars i:nth-child(2){background:#5B4BFF}.dz-color .cat .bars i:nth-child(3){background:#E8960B}.dz-color .cat .bars i:nth-child(4){background:#E1474C}
.dz-color .seq .bars i:nth-child(1){background:color-mix(in srgb,var(--accent) 25%,var(--ui))}.dz-color .seq .bars i:nth-child(2){background:color-mix(in srgb,var(--accent) 50%,var(--ui))}.dz-color .seq .bars i:nth-child(3){background:color-mix(in srgb,var(--accent) 75%,var(--ui))}.dz-color .seq .bars i:nth-child(4){background:var(--accent)}

.dz-tip .bars i{background:var(--line);animation:none;height:var(--h)}
.dz-tip .bars i.k{animation:dzt-b 6s steps(1) infinite;animation-delay:var(--d)}
.dz-tip .tt2{position:absolute;top:1.2em;transform:translateX(-50%);padding:.4em .7em;border-radius:.5em;background:var(--ink);color:var(--bg);font-size:.75em;white-space:nowrap;display:grid;animation:dzt-m 6s cubic-bezier(.4,0,.2,1) infinite;z-index:3}
.dz-tip .tt2 span{grid-area:1/1;opacity:0;animation:cyc3 6s steps(1) infinite}
.dz-tip .tt2 b{font-family:var(--f-mono)}
.dz-tip .cur{animation:dzt-c 6s cubic-bezier(.4,0,.2,1) infinite;left:0;top:7em}
@keyframes dzt-b{0%{background:var(--accent)}33.3%,100%{background:var(--line)}}
@keyframes dzt-m{0%,30%{left:4.5em}33.3%,63%{left:12.2em}66.6%,96%{left:17.4em}100%{left:4.5em}}
@keyframes dzt-c{0%,30%{transform:translateX(4.5em)}33.3%,63%{transform:translateX(12.2em)}66.6%,96%{transform:translateX(19.9em)}100%{transform:translateX(4.5em)}}

.dz-table .wr{display:flex;align-items:center;gap:1.2em}
.dz-table table{border-collapse:collapse;font-size:.8em;font-variant-numeric:tabular-nums}
.dz-table td,.dz-table th{padding:.45em .7em;border-bottom:.1em solid var(--rule);text-align:right}
.dz-table th{color:var(--ink-3);font-weight:500;font-size:.9em}
.dz-table td:first-child,.dz-table th:first-child{text-align:left}
.dz-table .tbx{padding:.6em}
.dz-table tr.hl td{background:var(--accent-soft);animation:dtb-h 4s infinite}
.dz-table .cf{width:12em;height:12em}
.dz-table .bars{gap:.5em}
@keyframes dtb-h{0%,30%{background:transparent}40%,90%{background:var(--accent-soft)}100%{background:transparent}}

.dz-focus .bars i{background:var(--line)}
.dz-focus .bars i.k{background:var(--accent)}
.dz-focus .an{position:absolute;left:18.9em;top:.6em;padding:.35em .6em;border-radius:.4em;background:var(--accent-soft);font-size:.72em;font-weight:600;white-space:nowrap;opacity:0;animation:dzf-a 4s infinite}
.dz-focus .an::after{content:"";position:absolute;left:1.4em;bottom:-.4em;border:solid transparent;border-width:.4em .4em 0;border-top-color:var(--accent-soft)}
@keyframes dzf-a{0%,30%{opacity:0;transform:translateY(.4em)}40%,90%{opacity:1;transform:none}100%{opacity:0}}
`;
s.items.push(
  {
    id: 'dz-scat', k: '산점도', e: 'Scatter plot',
    d: '두 가지 값의 관계를 점으로 찍어서, 함께 늘어나는지, 상관없는지, 튀는 값은 무엇인지 보여줘요.',
    u: '"연습 횟수가 많을수록 점수가 오를까?" 같은 질문에 맞아요. 추세선을 더하면 방향이 분명해지지만, 상관관계가 곧 원인은 아니라는 점을 기억하세요. 점이 많으면 투명도를 낮춰 겹친 곳이 보이게 하세요.',
    html: `<div class="cf box"><svg viewBox="0 0 100 60" preserveAspectRatio="none"><line class="tr" pathLength="100" x1="4" y1="54" x2="96" y2="10"/>${[[8,50],[14,46],[18,52],[24,40],[30,44],[34,36],[40,38],[46,30],[50,34],[56,26],[60,30],[66,22],[72,24],[76,16],[82,20],[88,12],[92,14],[20,24],[70,46]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.2" style="animation-delay:${i*.04}s"/>`).join('')}</svg><i class="ax"></i><div class="xl"><span>연습 횟수 →</span></div><span class="yl">점수 →</span></div>`
  },
  {
    id: 'dz-zero', k: '막대는 0부터', e: 'Start bars at zero',
    d: '막대 그래프의 세로축을 0이 아닌 중간에서 시작하면 작은 차이가 몇 배처럼 부풀려 보여요.',
    u: '막대 길이 자체가 값을 뜻하므로 축은 반드시 0부터 시작하세요. 작은 변화를 자세히 봐야 한다면 축을 자르는 대신 선 그래프를 쓰거나 변화량을 따로 보여주세요. 축을 잘랐다면 물결 표시로 알려야 해요.',
    html: `<div class="two">
<div class="col bad"><div class="cf box"><span class="yv" style="bottom:2.6em">90</span><span class="yv" style="top:1em">100</span><div class="bars"><i style="--h:20%"><b>92</b></i><i style="--h:80%"><b>98</b></i></div><i class="ax"></i><i class="bk"></i></div><span class="cap">90부터 · 과장됨</span></div>
<span class="vs">vs</span>
<div class="col"><div class="cf box"><span class="yv" style="bottom:2.6em">0</span><span class="yv" style="top:1em">100</span><div class="bars"><i style="--h:92%;--i:0"><b>92</b></i><i style="--h:98%;--i:1"><b>98</b></i></div><i class="ax"></i></div><span class="cap">0부터 · 정직함</span></div>
</div>`
  },
  {
    id: 'dz-color', k: '범주색 vs 연속색', e: 'Categorical vs Sequential color',
    d: '서로 다른 종류를 구분할 때는 서로 다른 색을, 많고 적음의 정도를 보여줄 때는 한 색의 진하기를 써요.',
    u: '범주색은 6~8개를 넘으면 구분이 안 되니 나머지는 "기타"로 묶으세요. 연속색은 옅을수록 적고 진할수록 많게. 중간값 기준으로 위아래가 갈리는 데이터(증감률 등)는 양쪽으로 다른 색을 쓰는 발산형 팔레트를 써요.',
    html: `<div class="wr"><div class="col cat"><div class="cf box"><div class="bars"><i style="--h:60%;--i:0"></i><i style="--h:85%;--i:1"></i><i style="--h:45%;--i:2"></i><i style="--h:70%;--i:3"></i></div><i class="ax"></i></div><span class="cap">범주 · 종류 구분</span></div><div class="col seq"><div class="cf box"><div class="bars"><i style="--h:25%;--i:0"></i><i style="--h:50%;--i:1"></i><i style="--h:75%;--i:2"></i><i style="--h:100%;--i:3"></i></div><i class="ax"></i></div><span class="cap">연속 · 많고 적음</span></div></div>`
  },
  {
    id: 'dz-tip', k: '차트 툴팁', e: 'Chart tooltip',
    d: '차트 위에 마우스를 올리거나 누르면 그 지점의 정확한 값과 날짜를 작은 상자로 보여줘요.',
    u: '차트는 흐름을, 툴팁은 정확한 값을 맡아요. 막대나 점 자체보다 넓은 영역에서 반응하게 해야 손가락으로도 쉽게 짚을 수 있어요. 툴팁이 손가락이나 커서에 가려지지 않는 위치에 뜨게 하세요.',
    html: `<div class="cf box"><div class="bars"><i class="k" style="--h:50%;--d:0s"></i><i style="--h:70%"></i><i class="k" style="--h:85%;--d:-4s"></i><i style="--h:60%"></i><i class="k" style="--h:75%;--d:-2s"></i></div><i class="ax"></i><div class="tt2"><span style="animation-delay:0s">9월 · <b>412회</b></span><span style="animation-delay:-4s">10월 · <b>698회</b></span><span style="animation-delay:-2s">11월 · <b>615회</b></span></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
  },
  {
    id: 'dz-table', k: '표 vs 차트', e: 'Table vs Chart',
    d: '정확한 값을 찾아 읽어야 하면 표, 흐름이나 차이를 한눈에 봐야 하면 차트가 맞아요.',
    u: '보고서에서는 둘을 함께 두는 경우가 많아요. 표의 숫자는 오른쪽 정렬, 자릿수가 맞는 글꼴(tabular)로 세로 비교가 쉽게 하세요. 차트로 보여줄 숫자가 3개 이하라면 큰 숫자 텍스트가 차트보다 빠르게 읽혀요.',
    html: `<div class="wr"><div class="col"><div class="tbx box"><table><tr><th>직무</th><th>지원</th><th>합격</th></tr><tr><td>디자인</td><td>412</td><td>38</td></tr><tr class="hl"><td>개발</td><td>698</td><td>61</td></tr><tr><td>기획</td><td>215</td><td>17</td></tr></table></div><span class="cap">표 · 정확한 값</span></div><div class="col"><div class="cf box"><div class="bars"><i style="--h:59%;--i:0"></i><i style="--h:100%;--i:1"></i><i style="--h:31%;--i:2"></i></div><i class="ax"></i></div><span class="cap">차트 · 차이</span></div></div>`
  },
  {
    id: 'dz-focus', k: '강조와 주석', e: 'Highlight & annotate',
    d: '모든 막대를 회색으로 두고 말하고 싶은 하나만 색을 칠한 뒤, 짧은 주석을 달면 차트가 결론을 말해줘요.',
    u: '"그래서 뭐?"에 답하는 차트를 만드세요. 차트 제목도 "월별 지원자 수"보다 "10월 지원자가 가장 많았어요"처럼 결론으로 쓰면 읽는 사람이 해석할 필요가 없어요.',
    html: `<div class="cf box"><div class="bars"><i style="--h:45%;--i:0"></i><i style="--h:55%;--i:1"></i><i style="--h:50%;--i:2"></i><i class="k" style="--h:84%;--i:3"></i><i style="--h:60%;--i:4"></i></div><i class="ax"></i><span class="an">채용 시즌 효과 +68%</span><div class="xl"><span>7월</span><span>8월</span><span>9월</span><span>10월</span><span>11월</span></div></div>`
  }
);
})();
