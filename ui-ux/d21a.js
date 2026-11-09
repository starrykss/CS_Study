(window.UX = window.UX || []).push({
  id: 's-retain', short: '리텐션', en: 'Retention & engagement',
  title: '다시 오고 싶게 만드는 장치',
  sub: '첫 경험을 매끄럽게 만들고, 작은 성취를 쌓아 습관이 되게 해요. 단, 사용자의 시간과 주의를 존중하는 선은 지켜야 해요.',
  css: `
.r-streak .pan{width:20em;padding:1.4em;display:flex;flex-direction:column;align-items:center;gap:.8em}
.r-streak .fl{position:relative;width:3.6em;height:4.4em;animation:stk-f 1.2s ease-in-out infinite alternate}
.r-streak .fl::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#FFC24D,#FF6B3D);clip-path:polygon(50% 0,72% 28%,86% 22%,92% 55%,80% 85%,50% 100%,20% 85%,8% 55%,18% 30%,30% 40%)}
.r-streak .fl::after{content:"";position:absolute;left:30%;right:30%;top:45%;bottom:8%;background:#FFE7A8;clip-path:polygon(50% 0,80% 45%,70% 85%,50% 100%,30% 85%,20% 45%)}
.r-streak .ct{display:grid;font-size:2em;font-weight:800;line-height:1}
.r-streak .ct span{grid-area:1/1;text-align:center}
.r-streak .c1{animation:btln-1 4s steps(1) infinite}.r-streak .c2{opacity:0;color:#FF6B3D;animation:btln-2 4s steps(1) infinite}
.r-streak .ct2{font-size:.8em;color:var(--ink-2);margin-top:-.4em}
.r-streak .wk{display:flex;gap:.45em}
.r-streak .wk span{display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:.65em;color:var(--ink-3)}
.r-streak .wk i{width:2.2em;height:2.2em;border-radius:50%;background:#FF6B3D}
.r-streak .wk .t i{background:var(--line);animation:stk-t 4s steps(1) infinite}
@keyframes stk-f{to{transform:scale(1.06) rotate(-2deg)}}
@keyframes stk-t{0%{background:var(--line)}44%{background:#FF6B3D;transform:scale(1.15)}48%{transform:none}92%{background:var(--line)}}

.r-xp .pan{width:20em;padding:1.4em;display:flex;flex-direction:column;gap:.7em}
.r-xp .hd5{display:flex;align-items:center;justify-content:space-between}
.r-xp .lv{display:grid;font-weight:800;font-size:1.3em}
.r-xp .lv span{grid-area:1/1}
.r-xp .l1{animation:btln-1 4s steps(1) infinite;animation-delay:-.4s}.r-xp .l2{opacity:0;color:#5B4BFF;animation:btln-2 4s steps(1) infinite,xp-pop 4s infinite;animation-delay:-.4s,0s}
.r-xp .xp{font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
.r-xp .br{height:1em;border-radius:1em;background:var(--line);overflow:hidden}
.r-xp .br i{display:block;height:100%;border-radius:1em;background:linear-gradient(90deg,#5B4BFF,#9C8CFF);animation:xp-w 4s cubic-bezier(.4,0,.2,1) infinite}
.r-xp .gain{align-self:flex-end;font-family:var(--f-mono);font-weight:600;color:#5B4BFF;animation:xp-g 4s infinite}
@keyframes xp-w{0%,10%{width:70%}34%{width:100%}36%{width:0}56%,90%{width:30%}100%{width:70%}}
@keyframes xp-g{0%,8%{opacity:0;transform:translateY(.6em)}16%,30%{opacity:1;transform:none}40%,100%{opacity:0;transform:translateY(-.6em)}}
@keyframes xp-pop{0%,34%{transform:none}38%{transform:scale(1.35)}44%,100%{transform:none}}

.r-badge .wr{display:flex;flex-direction:column;align-items:center;gap:.9em}
.r-badge .md{position:relative;width:7em;height:7em;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFE59A,#E8A50B 60%,#B97800);display:grid;place-items:center;overflow:hidden;box-shadow:0 0 0 .4em #FFF1C7,0 .8em 1.6em -.6em rgba(0,0,0,.4);animation:bdg-m 4s cubic-bezier(.2,.8,.2,1.4) infinite}
.r-badge .md b{font-size:2.4em;color:#fff;text-shadow:0 .08em 0 rgba(0,0,0,.2)}
.r-badge .md::after{content:"";position:absolute;top:-50%;bottom:-50%;width:2em;background:rgba(255,255,255,.55);transform:rotate(25deg) translateX(-8em);animation:bdg-sh 4s infinite}
.r-badge .t{font-size:1.1em;font-weight:700;animation:bdg-t 4s infinite}
.r-badge .s{font-size:.8em;color:var(--ink-2);animation:bdg-t 4s infinite}
@keyframes bdg-m{0%,8%{transform:scale(0) rotate(-30deg)}24%,90%{transform:none}100%{transform:scale(0)}}
@keyframes bdg-sh{0%,30%{transform:rotate(25deg) translateX(-8em)}50%,100%{transform:rotate(25deg) translateX(8em)}}
@keyframes bdg-t{0%,18%{opacity:0;transform:translateY(.4em)}28%,90%{opacity:1;transform:none}100%{opacity:0}}

.r-conf .wr{position:relative;display:flex;flex-direction:column;align-items:center;gap:.4em}
.r-conf .wr b{font-size:1.6em;font-weight:800;animation:bdg-t 4s infinite}
.r-conf .wr span{font-size:.85em;color:var(--ink-2);animation:bdg-t 4s infinite}
.r-conf .cf2{position:absolute;left:50%;top:50%;width:.6em;height:.9em;border-radius:.1em;opacity:0;animation:cf-b 4s cubic-bezier(.2,.8,.4,1) infinite;animation-delay:calc(var(--i) * .01s)}
@keyframes cf-b{0%,10%{opacity:0;transform:translate(0,0) rotate(0)}14%{opacity:1}60%{opacity:1}80%,100%{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--r))}}

@property --a1{syntax:'<number>';inherits:false;initial-value:0}
.r-ring .wr{display:flex;align-items:center;gap:1.6em}
.r-ring .rg{position:relative;width:10em;height:10em}
.r-ring .rg i{position:absolute;border-radius:50%;display:grid;place-items:center;animation:rg-f 4s cubic-bezier(.3,.7,.2,1) infinite backwards}
.r-ring .rg i::after{content:"";border-radius:50%;background:var(--stage)}
.r-ring .o1{inset:0;background:conic-gradient(#FF4F7B calc(var(--a1) * var(--t1) * 1%),color-mix(in srgb,#FF4F7B 20%,transparent) 0)}
.r-ring .o1::after{width:8em;height:8em}
.r-ring .o2{inset:1.1em;background:conic-gradient(#2BC995 calc(var(--a1) * var(--t2) * 1%),color-mix(in srgb,#2BC995 20%,transparent) 0);animation-delay:.15s}
.r-ring .o2::after{width:5.8em;height:5.8em}
.r-ring .o3{inset:2.2em;background:conic-gradient(#3BA7FF calc(var(--a1) * var(--t3) * 1%),color-mix(in srgb,#3BA7FF 20%,transparent) 0);animation-delay:.3s}
.r-ring .o3::after{width:3.6em;height:3.6em}
.r-ring .lg{display:flex;flex-direction:column;gap:.5em;font-size:.85em}
.r-ring .lg span{display:flex;align-items:center;gap:.5em}
.r-ring .lg i{width:.8em;height:.8em;border-radius:50%}
.r-ring .lg b{font-family:var(--f-mono);font-weight:500;margin-left:auto;padding-left:.8em}
@keyframes rg-f{0%,6%{--a1:0}50%,90%{--a1:1}100%{--a1:0}}

.r-board .pan{width:20em;padding:.8em;display:flex;flex-direction:column;gap:.25em}
.r-board .ls{position:relative;height:13.6em}
.r-board .it{position:absolute;left:0;right:0;height:2.5em;display:flex;align-items:center;gap:.6em;padding:0 .7em;border-radius:.6em;font-size:.9em}
.r-board .it em{font-style:normal;font-family:var(--f-mono);width:1.2em;color:var(--ink-3)}
.r-board .it .ln{flex:1}
.r-board .it b{font-family:var(--f-mono);font-weight:500;font-size:.85em}
.r-board .me{background:var(--accent-soft);z-index:2;animation:brd-m 4s cubic-bezier(.4,0,.2,1) infinite}
.r-board .dn4{animation:brd-d 4s cubic-bezier(.4,0,.2,1) infinite}
.r-board .rk{display:grid}.r-board .rk span{grid-area:1/1}
.r-board .k1{animation:btln-1 4s steps(1) infinite}.r-board .k2{opacity:0;animation:btln-2 4s steps(1) infinite}
@keyframes brd-m{0%,26%{transform:none;box-shadow:none}36%{box-shadow:0 .6em 1.2em -.6em rgba(0,0,0,.35)}44%,90%{transform:translateY(-5.6em);box-shadow:none}100%{transform:none}}
@keyframes brd-d{0%,26%{transform:none}44%,90%{transform:translateY(2.8em)}100%{transform:none}}
`,
  items: [
    {
      id: 'r-streak', k: '연속 기록', e: 'Streak',
      d: '며칠 연속으로 사용했는지 숫자와 불꽃 같은 상징으로 보여줘서, 기록을 끊고 싶지 않은 마음을 만들어요.',
      u: '듀오링고가 대표적이에요. 기준(하루 1회 등)은 낮게 잡고, 하루 빠졌을 때 쓸 수 있는 "스트릭 보호" 같은 장치를 두면 한 번 끊겼다고 포기하는 일을 줄일 수 있어요. 기록이 부담과 죄책감이 되지 않게 조심하세요.',
      html: `<div class="pan box"><span class="fl"></span><span class="ct"><span class="c1">6</span><span class="c2">7</span></span><span class="ct2">일 연속 연습 중</span><div class="wk"><span><i></i>월</span><span><i></i>화</span><span><i></i>수</span><span><i></i>목</span><span><i></i>금</span><span><i></i>토</span><span class="t"><i></i>일</span></div></div>`
    },
    {
      id: 'r-xp', k: '레벨과 경험치', e: 'Levels & XP',
      d: '행동할 때마다 경험치가 쌓이고, 막대가 가득 차면 레벨이 올라요. 진행이 눈에 보여 다음 행동의 동기가 돼요.',
      u: '초반 레벨은 빨리 오르게 해서 성취감을 주고, 뒤로 갈수록 천천히 오르게 설계하는 게 일반적이에요. 레벨이 실제 혜택이나 의미(예: 연습 난이도)와 연결될 때 더 오래 동기가 유지돼요.',
      html: `<div class="pan box"><div class="hd5"><span class="lv"><span class="l1">Lv.3</span><span class="l2">Lv.4</span></span><span class="xp">다음 레벨까지</span></div><div class="br"><i></i></div><span class="gain">+120 XP</span></div>`
    },
    {
      id: 'r-badge', k: '뱃지 획득', e: 'Achievement badge',
      d: '의미 있는 순간(첫 완료, 10회 달성)에 기념 뱃지를 주고, 받는 순간을 작은 애니메이션으로 축하해요.',
      u: '뱃지는 수집 욕구를 자극하지만, 의미 없는 뱃지가 너무 많으면 가치가 떨어져요. 처음 몇 개는 쉽게 받게 해서 시스템을 알게 하고, 다음 뱃지까지 얼마나 남았는지 보여주세요.',
      html: `<div class="wr"><span class="md"><b>1</b></span><span class="t">첫 모의면접 완료!</span><span class="s">10회 완료 뱃지까지 9회 남았어요</span></div>`
    },
    {
      id: 'r-conf', k: '축하 효과', e: 'Celebration · Confetti',
      d: '목표를 이뤘을 때 색종이가 터지는 것처럼 짧고 화려한 효과로 기쁨을 함께 나눠요. 피크엔드 법칙의 "피크"를 만드는 장치예요.',
      u: '정말 의미 있는 순간에만 쓰세요. 매번 터지면 금방 시시해져요. 1~2초 안에 끝나고 다음 행동을 막지 않아야 해요. 동작 줄이기 설정에서는 정적인 축하 화면으로 바꿔 주세요.',
      html: `<div class="wr">${Array.from({length:24},(_, i)=>{const a=i/24*6.283;const d=7+(i%3)*2.2;const c=['#FF4F7B','#2BC995','#3BA7FF','#FFC24D','#9C8CFF'][i%5];return `<i class="cf2" style="--i:${i};--x:${(Math.cos(a)*d*1.4).toFixed(1)}em;--y:${(Math.sin(a)*d*.9+3).toFixed(1)}em;--r:${i*47}deg;background:${c}"></i>`;}).join('')}<b>목표 달성!</b><span>이번 주 모의면접 5회를 채웠어요</span></div>`
    },
    {
      id: 'r-ring', k: '일일 목표 링', e: 'Daily goal rings',
      d: '오늘의 목표 몇 가지를 원형 고리로 보여주고, 채울수록 고리가 닫혀요. "조금만 더 하면 닫힌다"는 마음이 행동을 이끌어요.',
      u: '애플 활동 링처럼 목표가 2~3개일 때 좋아요. 목표치는 사용자가 직접 정하거나 조정할 수 있어야 해요. 자이가르닉 효과와 같은 원리라서, 거의 다 찬 상태를 보여주는 순간이 가장 강하게 작동해요.',
      html: `<div class="wr"><div class="rg"><i class="o1" style="--t1:90"></i><i class="o2" style="--t2:65"></i><i class="o3" style="--t3:100"></i></div><div class="lg"><span><i style="background:#FF4F7B"></i>답변 연습<b>9/10</b></span><span><i style="background:#2BC995"></i>피드백 읽기<b>2/3</b></span><span><i style="background:#3BA7FF"></i>오늘 접속<b>1/1</b></span></div></div>`
    },
    {
      id: 'r-board', k: '리더보드', e: 'Leaderboard',
      d: '다른 사람과 순위를 비교해 경쟁심을 자극해요. 내 순위가 올라가는 순간을 보여주면 강한 동기가 돼요.',
      u: '전체 순위는 상위 몇 명만 즐거워요. 비슷한 실력끼리 묶은 리그나 친구끼리의 순위, 지난주의 나와 비교하는 방식이 더 많은 사람을 움직여요. 경쟁이 불편한 사람을 위해 숨기기 옵션도 두세요.',
      html: `<div class="pan box"><div class="ls"><span class="it" style="top:0"><em>1</em><span class="av"></span><span class="ln"></span><b>2,140</b></span><span class="it" style="top:2.8em"><em>2</em><span class="av"></span><span class="ln"></span><b>1,980</b></span><span class="it dn4" style="top:5.6em"><em>3</em><span class="av"></span><span class="ln"></span><b>1,720</b></span><span class="it dn4" style="top:8.4em"><em>4</em><span class="av"></span><span class="ln"></span><b>1,650</b></span><span class="it me" style="top:11.2em"><em class="rk"><span class="k1">5</span><span class="k2">3</span></em><span class="av" style="background:var(--accent)"></span><span class="ln"></span><b>1,790</b></span></div></div>`
    }
  ]
});
