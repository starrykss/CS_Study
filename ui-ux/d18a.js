(window.UX = window.UX || []).push({
  id: 's-data', short: '데이터 시각화', en: 'Data visualization',
  title: '숫자를 그림으로 보여주는 법',
  sub: '어떤 차트를 고르느냐에 따라 같은 숫자가 다른 이야기를 해요. 먼저 "무엇을 보여주고 싶은지"를 정하고 차트를 고르세요.',
  css: `
.sc .cf{position:relative;width:22em;height:14em;padding:1.2em 1.2em 2.2em 1.2em}
.sc .cf .gx{position:absolute;left:1.2em;right:1.2em;height:.08em;background:var(--rule)}
.sc .cf .ax{position:absolute;left:1.2em;right:1.2em;bottom:2.2em;height:.12em;background:var(--ink-3)}
.sc .cf .xl{position:absolute;left:1.2em;right:1.2em;bottom:.6em;display:flex;justify-content:space-around;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.sc :where(.cf) .bars{position:absolute;left:1.2em;right:1.2em;top:1.2em;bottom:2.2em;display:flex;align-items:flex-end;justify-content:space-around;gap:.8em;padding:0 .6em}
.sc :where(.cf) .bars i{flex:1;height:var(--h);border-radius:.3em .3em 0 0;background:var(--accent);transform-origin:bottom;animation:dz-g 4s cubic-bezier(.3,.7,.2,1) infinite backwards;animation-delay:calc(var(--i,0) * .08s)}
@keyframes dz-g{0%,4%{transform:scaleY(0)}24%,90%{transform:none}100%{transform:scaleY(0)}}

.dz-line svg{position:absolute;left:1.2em;right:1.2em;top:1.2em;bottom:2.2em;width:calc(100% - 2.4em);height:calc(100% - 3.4em);overflow:visible}
.dz-line .ln2{fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;animation:peak-d 4s cubic-bezier(.4,0,.2,1) infinite}
.dz-line .ar{fill:var(--accent);opacity:.12;animation:dzl-a 4s infinite}
.dz-line .ed{fill:var(--accent);stroke:var(--ui);stroke-width:2;animation:peak-o 4s infinite;animation-delay:.9s;animation-fill-mode:backwards;transform-box:fill-box;transform-origin:center}
@keyframes dzl-a{0%,50%{opacity:0}66%,90%{opacity:.14}100%{opacity:0}}

@property --dg{syntax:'<number>';inherits:false;initial-value:0}
.dz-pie .wr{display:flex;align-items:center;gap:2em}
.dz-pie .dn{width:11em;height:11em;border-radius:50%;background:conic-gradient(var(--accent) 0 calc(var(--dg) * .46%),var(--warn) 0 calc(var(--dg) * .78%),#5B4BFF 0 calc(var(--dg) * .93%),var(--line) 0 calc(var(--dg) * 1%),transparent 0);display:grid;place-items:center;animation:dzp-k 4s cubic-bezier(.4,0,.2,1) infinite}
.dz-pie .dn::after{content:"";width:6.4em;height:6.4em;border-radius:50%;background:var(--stage)}
.dz-pie .lg{display:flex;flex-direction:column;gap:.6em;font-size:.85em}
.dz-pie .lg span{display:flex;align-items:center;gap:.5em}
.dz-pie .lg i{width:.9em;height:.9em;border-radius:.2em}
.dz-pie .lg b{font-family:var(--f-mono);font-weight:500;margin-left:auto;padding-left:1em}
@keyframes dzp-k{0%,4%{--dg:0}40%,90%{--dg:100}100%{--dg:0}}

.dz-stack .bars i{display:flex;flex-direction:column-reverse;background:none;border-radius:.3em .3em 0 0;overflow:hidden}
.dz-stack .bars b{display:block;height:var(--a);background:var(--accent)}
.dz-stack .bars b+b{height:var(--b);background:var(--warn)}
.dz-stack .bars b+b+b{height:var(--c);background:#5B4BFF}
.dz-stack .lg{position:absolute;right:1.2em;top:.3em;display:flex;gap:.8em;font-size:.7em;color:var(--ink-2)}
.dz-stack .lg span{display:flex;align-items:center;gap:.3em}
.dz-stack .lg i{width:.8em;height:.8em;border-radius:.2em}

.dz-kpi .wr{display:flex;gap:1em}
.dz-kpi .kp{width:11em;padding:1em 1.1em;display:flex;flex-direction:column;gap:.15em}
.dz-kpi .kp span{font-size:.75em;color:var(--ink-2)}
.dz-kpi .kp b{font-size:1.9em;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.dz-kpi .kp em{font-style:normal;font-family:var(--f-mono);font-size:.75em;font-weight:500}
.dz-kpi .up{color:var(--accent)}.dz-kpi .dn2{color:var(--danger)}
.dz-kpi svg{width:100%;height:2.4em;margin-top:.4em;overflow:visible}
.dz-kpi path{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;animation:peak-d 4s cubic-bezier(.4,0,.2,1) infinite}
.dz-kpi .up path{stroke:var(--accent)}.dz-kpi .dn2 path{stroke:var(--danger)}
.dz-kpi svg circle{animation:peak-o 4s .9s infinite backwards;transform-box:fill-box;transform-origin:center}

.dz-heat .wr{display:flex;flex-direction:column;gap:.6em}
.dz-heat .gr{display:grid;grid-template-columns:repeat(15,1.15em);grid-template-rows:repeat(7,1.15em);grid-auto-flow:column;gap:.25em}
.dz-heat .gr i{border-radius:.22em;background:var(--line);animation:dzh-k 4s infinite backwards;animation-delay:calc(var(--i) * .015s)}
.dz-heat .l1{--c:color-mix(in srgb,var(--accent) 30%,var(--line))}.dz-heat .l2{--c:color-mix(in srgb,var(--accent) 60%,var(--line))}.dz-heat .l3{--c:var(--accent)}
.dz-heat .sc2{display:flex;align-items:center;gap:.3em;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3);align-self:flex-end}
.dz-heat .sc2 i{width:1em;height:1em;border-radius:.2em}
@keyframes dzh-k{0%,6%{background:var(--line)}20%,90%{background:var(--c,var(--line))}100%{background:var(--line)}}
`,
  items: [
    {
      id: 'dz-bar', k: '막대 그래프', e: 'Bar chart',
      d: '항목끼리 크기를 비교할 때 가장 정확하고 빠르게 읽히는 차트예요. 사람 눈은 같은 기준선에서 시작한 길이를 가장 잘 비교해요.',
      u: '항목 이름이 길면 가로 막대가 읽기 편해요. 순위가 중요하면 큰 순서로 정렬하고, 색은 한 가지로 통일한 뒤 강조할 막대 하나만 다른 색을 쓰세요. 막대 위에 값을 직접 적으면 축을 따라 읽지 않아도 돼요.',
      html: `<div class="cf box"><i class="gx" style="top:4em"></i><i class="gx" style="top:7.4em"></i><div class="bars"><i style="--h:55%;--i:0"></i><i style="--h:80%;--i:1"></i><i style="--h:40%;--i:2"></i><i style="--h:95%;--i:3"></i><i style="--h:65%;--i:4"></i></div><i class="ax"></i><div class="xl"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span></div></div>`
    },
    {
      id: 'dz-line', k: '선 그래프', e: 'Line chart',
      d: '시간에 따라 값이 어떻게 변하는지, 흐름과 추세를 보여줄 때 써요.',
      u: 'x축은 시간, 간격은 일정하게. 선은 4~5개를 넘으면 엉켜서 읽을 수 없어요. 마지막 값에 점과 숫자를 찍어 "지금"을 강조하고, 범례 대신 선 끝에 이름을 직접 붙이면 눈이 덜 오가요.',
      html: `<div class="cf box"><i class="gx" style="top:4em"></i><i class="gx" style="top:7.4em"></i><svg viewBox="0 0 100 60" preserveAspectRatio="none"><path class="ar" d="M2 48 L18 40 L34 44 L50 28 L66 32 L82 16 L98 8 L98 60 L2 60Z"/><path class="ln2" pathLength="100" d="M2 48 L18 40 L34 44 L50 28 L66 32 L82 16 L98 8"/><circle class="ed" cx="98" cy="8" r="3"/></svg><i class="ax"></i><div class="xl"><span>5월</span><span>6월</span><span>7월</span><span>8월</span><span>9월</span><span>10월</span></div></div>`
    },
    {
      id: 'dz-pie', k: '파이·도넛 차트', e: 'Pie & donut chart',
      d: '전체를 100으로 봤을 때 각 부분이 얼마나 차지하는지 보여줘요. 조각이 적고 차이가 클 때만 잘 읽혀요.',
      u: '조각은 2~5개까지, 비슷한 크기의 조각을 비교해야 한다면 막대 그래프가 훨씬 정확해요. 도넛 가운데에는 총합이나 핵심 숫자를 넣으세요. 3D 파이는 앞쪽 조각을 크게 보이게 왜곡하니 쓰지 마세요.',
      html: `<div class="wr"><span class="dn"></span><div class="lg"><span><i style="background:var(--accent)"></i>디자인<b>46%</b></span><span><i style="background:var(--warn)"></i>개발<b>32%</b></span><span><i style="background:#5B4BFF"></i>기획<b>15%</b></span><span><i style="background:var(--line)"></i>기타<b>7%</b></span></div></div>`
    },
    {
      id: 'dz-stack', k: '누적 막대', e: 'Stacked bar chart',
      d: '막대 하나에 여러 항목을 쌓아서, 전체 크기와 구성 비율을 함께 보여줘요.',
      u: '가장 중요한 항목을 맨 아래(기준선)에 두세요. 기준선에 닿지 않은 위쪽 조각은 서로 비교하기 어려워요. 쌓는 항목은 3~4개 이하, 색은 확실히 구분되게 하세요.',
      html: `<div class="cf box"><div class="lg"><span><i style="background:var(--accent)"></i>신규</span><span><i style="background:var(--warn)"></i>재방문</span><span><i style="background:#5B4BFF"></i>유료</span></div><div class="bars"><i style="--h:60%;--i:0"><b style="--a:50%"></b><b style="--b:30%"></b><b style="--c:20%"></b></i><i style="--h:75%;--i:1"><b style="--a:45%"></b><b style="--b:35%"></b><b style="--c:20%"></b></i><i style="--h:68%;--i:2"><b style="--a:40%"></b><b style="--b:35%"></b><b style="--c:25%"></b></i><i style="--h:90%;--i:3"><b style="--a:38%"></b><b style="--b:34%"></b><b style="--c:28%"></b></i></div><i class="ax"></i><div class="xl"><span>1주</span><span>2주</span><span>3주</span><span>4주</span></div></div>`
    },
    {
      id: 'dz-kpi', k: 'KPI 카드 · 스파크라인', e: 'KPI card · Sparkline',
      d: '핵심 지표 하나를 큰 숫자로 보여주고, 지난 기간 대비 변화와 작은 추세선(스파크라인)을 곁들인 카드예요.',
      u: '대시보드 맨 위에 3~4개만 두세요. 숫자만 있으면 좋은지 나쁜지 모르니 비교 기준(전주 대비 ▲12%)을 꼭 붙이고, 내려가는 게 좋은 지표(이탈률 등)는 색의 의미를 반대로 맞추세요.',
      html: `<div class="wr"><div class="kp box up"><span>주간 연습 수</span><b>1,284</b><em>▲ 12% 전주 대비</em><svg viewBox="0 0 100 30"><path pathLength="100" d="M2 24 L16 20 L30 22 L44 14 L58 16 L72 9 L86 11 L98 4"/><circle cx="98" cy="4" r="3" fill="var(--accent)"/></svg></div><div class="kp box dn2"><span>중도 이탈률</span><b>18%</b><em>▲ 3%p 전주 대비</em><svg viewBox="0 0 100 30"><path pathLength="100" d="M2 22 L16 23 L30 18 L44 20 L58 14 L72 15 L86 10 L98 8"/><circle cx="98" cy="8" r="3" fill="var(--danger)"/></svg></div></div>`
    },
    {
      id: 'dz-heat', k: '히트맵', e: 'Heatmap',
      d: '칸마다 색의 진하기로 값의 크기를 보여줘요. 날짜별 활동이나 요일×시간대처럼 두 기준이 겹치는 패턴을 한눈에 찾을 수 있어요.',
      u: '한 가지 색의 진하기로 표현하고, 옅은 색부터 진한 색까지 범례를 꼭 붙이세요. 정확한 값은 마우스를 올리거나 눌렀을 때 보여주면 돼요. 빨강-초록 조합은 색약 사용자가 구분하기 어려워요.',
      html: `<div class="wr"><div class="gr">${Array.from({length:105},(_, i)=>{const v=[0,1,2,3,1,0,2,3,3,1,2,0,1,3,2][i%15]+((i*7)%5===0?1:0);const c=v>=3?'l3':v===2?'l2':v===1?'l1':'';return `<i class="${c}" style="--i:${i}"></i>`;}).join('')}</div><div class="sc2">적음 <i style="background:var(--line)"></i><i style="background:color-mix(in srgb,var(--accent) 30%,var(--line))"></i><i style="background:color-mix(in srgb,var(--accent) 60%,var(--line))"></i><i style="background:var(--accent)"></i> 많음</div></div>`
    }
  ]
});
