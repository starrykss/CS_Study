(window.UX = window.UX || []).push({
  id: 's-os', short: 'iOS·안드로이드', en: 'iOS vs Android',
  title: 'iOS와 안드로이드는 이렇게 달라요',
  sub: '같은 기능도 플랫폼마다 생김새와 위치가 달라요. 사용자는 자기 폰의 방식에 이미 손이 익어 있어요.',
  css: `
.sc .ios{--os:#0A84FF}
.sc .and{--os:var(--accent)}
.o-back .pv,.o-back .cu{position:absolute;inset:0}
.o-back .pv{background:var(--stage)}
.o-back .pv .scr{background:var(--stage)}
.o-back .ios .pv{animation:back-p 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-back .ios .cu{box-shadow:-.4em 0 1em -.4em rgba(0,0,0,.3);animation:back-i 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-back .nb{font-size:.8em;color:var(--os);font-weight:500;margin-top:-.4em}
.o-back .and .cu{border-radius:0;overflow:hidden;animation:back-a 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-back .ar{position:absolute;left:-.2em;top:45%;width:2.4em;height:2.4em;border-radius:50%;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-size:.9em;font-weight:700;z-index:3;animation:back-r 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-back .dr{left:6%;top:50%;animation:back-f 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes back-i{0%,18%{transform:none}50%,62%{transform:translateX(70%)}72%,88%{transform:translateX(102%)}96%,100%{transform:none}}
@keyframes back-p{0%,18%{transform:translateX(-30%)}50%,62%{transform:translateX(-9%)}72%,88%{transform:none}96%,100%{transform:translateX(-30%)}}
@keyframes back-a{0%,18%{transform:none;border-radius:0;opacity:1}50%,62%{transform:translateX(.6em) scale(.86);border-radius:1.2em;opacity:1}72%,88%{transform:translateX(1.4em) scale(.8);border-radius:1.2em;opacity:0}96%,100%{transform:none;border-radius:0;opacity:1}}
@keyframes back-r{0%,20%{opacity:0;transform:translateX(-1.5em)}46%,60%{opacity:1;transform:translateX(.8em)}68%,100%{opacity:0;transform:translateX(.8em)}}
@keyframes back-f{0%,14%{opacity:0;transform:none}18%{opacity:.28;transform:none}50%,60%{opacity:.28;transform:translateX(4.6em)}66%,100%{opacity:0;transform:translateX(4.6em)}}

.o-title .mv{animation:ttl-s 4s cubic-bezier(.4,0,.2,1) infinite}
.o-title .lt{font-size:1.8em;font-weight:700;letter-spacing:-.02em;line-height:1.1}
.o-title .ios .lt{animation:ttl-l 4s cubic-bezier(.4,0,.2,1) infinite}
.o-title .bar{position:absolute;left:0;right:0;top:0;height:3em;padding:1.3em 1em 0;display:flex;align-items:center;gap:.6em;z-index:2;font-size:.95em;font-weight:600}
.o-title .ios .bar{justify-content:center;background:var(--ui);border-bottom:.1em solid transparent;animation:ttl-ib 4s cubic-bezier(.4,0,.2,1) infinite}
.o-title .ios .bar span{opacity:0;animation:ttl-is 4s cubic-bezier(.4,0,.2,1) infinite}
.o-title .and .bar{height:3.6em;background:var(--ui);animation:ttl-ab 4s cubic-bezier(.4,0,.2,1) infinite}
.o-title .and .bar i{display:flex;flex-direction:column;gap:.2em;width:1em}
.o-title .and .bar i::before,.o-title .and .bar i::after{content:"";height:.15em;border-radius:.1em;background:var(--ink)}
.o-title .and .scr{padding-top:4.2em}
.o-title .ios .scr{padding-top:3.2em}
@keyframes ttl-s{0%,20%{transform:none}46%,80%{transform:translateY(-4em)}96%,100%{transform:none}}
@keyframes ttl-l{0%,26%{opacity:1}40%,84%{opacity:0}94%,100%{opacity:1}}
@keyframes ttl-is{0%,32%{opacity:0}44%,80%{opacity:1}92%,100%{opacity:0}}
@keyframes ttl-ib{0%,32%{border-bottom-color:transparent}44%,80%{border-bottom-color:var(--rule)}92%,100%{border-bottom-color:transparent}}
@keyframes ttl-ab{0%,26%{background:var(--ui)}40%,80%{background:var(--accent-soft)}94%,100%{background:var(--ui)}}

.o-tabs .tb{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(3,1fr);padding:.5em .3em .9em;border-top:.1em solid var(--rule);background:var(--ui)}
.o-tabs .tb span{position:relative;display:flex;flex-direction:column;align-items:center;gap:.2em;font-size:.62em;color:var(--ink-3)}
.o-tabs .tb svg{position:relative;width:2.2em;height:2.2em;stroke:currentColor}
.o-tabs .ios .t0,.o-tabs .and .t0{animation:tabs-0 4s steps(1) infinite}
.o-tabs .ios .t1,.o-tabs .and .t1{animation:tabs-1 4s steps(1) infinite}
.o-tabs .and .tb{padding:.6em .3em 1em;background:var(--stage)}
.o-tabs .and .tb span{gap:.35em}
.o-tabs .pl{position:absolute;top:.45em;left:calc(.3em + (100% - .6em) / 6);width:3.4em;height:2.2em;margin-left:-1.7em;border-radius:1.1em;background:var(--accent-soft);animation:tabs-p 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes tabs-0{0%{color:var(--os)}40%{color:var(--ink-3)}90%{color:var(--os)}}
@keyframes tabs-1{0%{color:var(--ink-3)}40%{color:var(--os)}90%{color:var(--ink-3)}}
@keyframes tabs-p{0%,36%{transform:none;width:3.4em}40%{width:2.2em}44%,86%{transform:translateX(3.04em);width:3.4em}90%{width:2.2em}94%,100%{transform:none;width:3.4em}}

.o-alert .dm{animation:alt-d 4s infinite}
.o-alert .al{position:absolute;left:50%;top:50%;width:8em;background:var(--ui);z-index:2}
.o-alert .ios .al{border-radius:1em;text-align:center;overflow:hidden;animation:alt-i 4s cubic-bezier(.2,.8,.2,1) infinite}
.o-alert .ios .tx{padding:.9em .7em .7em;display:flex;flex-direction:column;gap:.3em;font-size:.8em}
.o-alert .ios .bs{display:grid;grid-template-columns:1fr 1fr;border-top:.1em solid var(--rule);font-size:.8em}
.o-alert .ios .bs span{padding:.55em 0;color:#0A84FF}
.o-alert .ios .bs span+span{border-left:.1em solid var(--rule);color:var(--danger);font-weight:600}
.o-alert .and .al{border-radius:1.3em;padding:1em .9em .8em;display:flex;flex-direction:column;gap:.4em;font-size:.8em;animation:alt-a 4s cubic-bezier(.2,.8,.2,1) infinite}
.o-alert .and .al b{font-size:1.15em}
.o-alert .and .bs{display:flex;justify-content:flex-end;gap:1.1em;margin-top:.5em;color:var(--accent);font-weight:600}
.o-alert .tx b,.o-alert .al b{font-weight:700}
.o-alert .tx span,.o-alert .and .al>span{color:var(--ink-2);font-size:.92em}
@keyframes alt-d{0%,16%{opacity:0}24%,82%{opacity:1}90%,100%{opacity:0}}
@keyframes alt-i{0%,16%{opacity:0;transform:translate(-50%,-50%) scale(1.15)}24%,82%{opacity:1;transform:translate(-50%,-50%) scale(1)}90%,100%{opacity:0;transform:translate(-50%,-50%) scale(1)}}
@keyframes alt-a{0%,16%{opacity:0;transform:translate(-50%,-50%) scale(.9)}24%,82%{opacity:1;transform:translate(-50%,-50%) scale(1)}90%,100%{opacity:0;transform:translate(-50%,-50%) scale(.95)}}

.o-switch .pan{width:10.6em;height:9em;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1em}
.o-switch .is{position:relative;width:5.1em;height:3.1em;border-radius:2em;background:var(--line);animation:sw-ib 4s infinite}
.o-switch .is b{position:absolute;top:.25em;left:.25em;width:2.6em;height:2.6em;border-radius:50%;background:var(--knob);box-shadow:0 .15em .4em rgba(0,0,0,.28);animation:sw-ik 4s cubic-bezier(.3,.7,.3,1) infinite}
.o-switch .ms{position:relative;width:5.2em;height:3.2em;border-radius:2em;border:.2em solid var(--ink-3);background:var(--stage);animation:sw-mb 4s infinite}
.o-switch .ms b{position:absolute;top:50%;left:.65em;width:1.6em;height:1.6em;margin-top:-.8em;border-radius:50%;background:var(--ink-3);display:grid;place-items:center;color:transparent;animation:sw-mk 4s cubic-bezier(.3,.7,.3,1) infinite}
.o-switch .ms b::after{content:"";width:.45em;height:.85em;border:solid currentColor;border-width:0 .18em .18em 0;transform:translateY(-.1em) rotate(45deg)}
@keyframes sw-ib{0%,22%{background:var(--line)}28%,82%{background:#34C759}88%,100%{background:var(--line)}}
@keyframes sw-ik{0%,22%{transform:none}28%,82%{transform:translateX(2em)}88%,100%{transform:none}}
@keyframes sw-mb{0%,22%{background:var(--stage);border-color:var(--ink-3)}28%,82%{background:var(--accent);border-color:var(--accent)}88%,100%{background:var(--stage);border-color:var(--ink-3)}}
@keyframes sw-mk{0%,22%{transform:none;width:1.6em;height:1.6em;margin-top:-.8em;background:var(--ink-3);color:transparent}28%,82%{transform:translateX(1.35em);width:2.4em;height:2.4em;margin-top:-1.2em;background:var(--accent-ink);color:var(--accent)}88%,100%{transform:none;width:1.6em;height:1.6em;margin-top:-.8em;background:var(--ink-3);color:transparent}}

.o-date .pan{width:11.4em;height:11.4em;padding:1em;display:flex;flex-direction:column;justify-content:center}
.o-date .wh{position:relative;height:8.4em;display:grid;grid-template-columns:1.2fr 1fr 1fr;overflow:hidden;font-size:.95em;font-variant-numeric:tabular-nums;-webkit-mask:linear-gradient(transparent,#000 30%,#000 70%,transparent);mask:linear-gradient(transparent,#000 30%,#000 70%,transparent)}
.o-date .band{position:absolute;left:0;right:0;top:50%;height:1.8em;margin-top:-.9em;border-radius:.5em;background:var(--stage)}
.o-date .cl{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:3.3em;animation:date-w 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-date .cl span{height:1.8em;line-height:1.8em}
.o-date .c2{animation-delay:.25s;animation-fill-mode:backwards}.o-date .c3{animation-delay:.5s;animation-fill-mode:backwards}
.o-date .hd{display:flex;justify-content:space-between;font-size:.8em;font-weight:700;margin-bottom:.5em}
.o-date .cal{position:relative;display:grid;grid-template-columns:repeat(7,1fr);row-gap:.25em;font-size:.68em;text-align:center;font-variant-numeric:tabular-nums}
.o-date .cal span{position:relative;line-height:1.9em}
.o-date .sel{position:absolute;left:0;top:0;width:calc(100% / 7);height:1.9em;display:grid;place-items:center}
.o-date .sel::before{content:"";width:1.9em;height:1.9em;border-radius:50%;background:var(--accent);animation:date-c 4s cubic-bezier(.3,.7,.2,1) infinite}
.o-date .sel{animation:date-m 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes date-w{0%,16%{transform:none}40%,84%{transform:translateY(-3.6em)}96%,100%{transform:none}}
@keyframes date-m{0%,20%{transform:translate(0,2.15em)}36%,84%{transform:translate(400%,6.45em)}96%,100%{transform:translate(0,2.15em)}}
@keyframes date-c{0%,30%{transform:scale(1)}34%{transform:scale(.7)}40%,100%{transform:scale(1)}}
`,
  items: [
    {
      id: 'o-back', k: '뒤로 가기', e: 'Back navigation',
      d: 'iOS는 화면 왼쪽 끝을 밀거나 왼쪽 위 ‹ 버튼으로, 안드로이드는 화면 양쪽 끝에서 안쪽으로 미는 시스템 제스처로 뒤로 가요.',
      u: 'iOS 앱에는 왼쪽 위 뒤로 버튼을 꼭 두세요. 안드로이드는 시스템 뒤로 가기가 있으니 화면 안에 따로 만들 필요는 적지만, 뒤로 갔을 때 어디로 가는지는 일관돼야 해요. 화면 왼쪽 끝에 가로 스와이프 기능을 두면 뒤로 가기 제스처와 부딪혀요.',
      html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="pv"><div class="scr"><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div></div><div class="cu"><div class="scr"><span class="nb">‹ 목록</span><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:65%"></span></div></div><span class="tap dr"></span></div><span class="cap">iOS</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="pv"><div class="scr"><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div></div><div class="cu"><div class="scr"><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:65%"></span></div></div><span class="ar">‹</span><span class="tap dr"></span></div><span class="cap">Android</span></div>
</div>`
    },
    {
      id: 'o-title', k: '큰 제목 vs 상단 앱 바', e: 'Large title vs Top app bar',
      d: 'iOS는 화면 위에 큰 제목을 두고 스크롤하면 가운데 작은 제목으로 줄어들고, 안드로이드는 왼쪽 정렬 제목의 앱 바가 스크롤하면 색이 살짝 바뀌어요.',
      u: 'iOS 큰 제목은 설정·메일처럼 목록이 시작되는 최상위 화면에 쓰고, 상세 화면은 작은 가운데 제목을 써요. 안드로이드 앱 바는 제목을 왼쪽에 두고, 스크롤 상태를 배경색이나 그림자로 알려줘요.',
      html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="bar"><span>설정</span></div><div class="scr mv"><span class="lt">설정</span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:65%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div></div><span class="cap">iOS</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="bar"><i></i><span>설정</span></div><div class="scr mv"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:65%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div></div><span class="cap">Android</span></div>
</div>`
    },
    {
      id: 'o-tabs', k: '탭 바 vs 내비게이션 바', e: 'Tab bar vs Navigation bar',
      d: '둘 다 화면 아래 주요 메뉴지만, iOS 탭 바는 아이콘 색으로 현재 위치를, 안드로이드 내비게이션 바는 아이콘 뒤의 알약 모양 표시로 현재 위치를 보여줘요.',
      u: 'iOS 탭 바와 안드로이드 내비게이션 바 모두 3~5개가 기준이에요. 같은 서비스라도 각 플랫폼 방식에 맞추면 사용자가 더 편하게 느껴요. 안드로이드 큰 화면에서는 왼쪽 세로 내비게이션 레일로 바뀌어요.',
      html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><div class="tb"><span class="t0"><svg class="ic" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/></svg>홈</span><span class="t1"><svg class="ic" viewBox="0 0 24 24"><path d="M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16.5 16.5L21 21"/></svg>검색</span><span><svg class="ic" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>MY</span></div></div><span class="cap">iOS</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><div class="tb"><i class="pl"></i><span class="t0"><svg class="ic" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/></svg>홈</span><span class="t1"><svg class="ic" viewBox="0 0 24 24"><path d="M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16.5 16.5L21 21"/></svg>검색</span><span><svg class="ic" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>MY</span></div></div><span class="cap">Android</span></div>
</div>`
    },
    {
      id: 'o-alert', k: '알림창 vs 다이얼로그', e: 'Alert vs Dialog',
      d: 'iOS 알림창은 가운데 정렬에 버튼이 아래를 꽉 채우고, 안드로이드 다이얼로그는 왼쪽 정렬에 글자 버튼이 오른쪽 아래에 모여요.',
      u: 'iOS는 취소를 왼쪽, 위험한 동작을 빨간색으로 표시해요. 안드로이드는 확인 동작을 맨 오른쪽에 둬요. 두 플랫폼 모두 버튼 이름은 "확인"보다 "삭제"처럼 실제 동작으로 쓰세요.',
      html: `<div class="two">
<div class="col ios"><div class="ph s"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><span class="dm"></span><div class="al"><div class="tx"><b>사진을 삭제할까요?</b><span>되돌릴 수 없어요.</span></div><div class="bs"><span>취소</span><span>삭제</span></div></div></div><span class="cap">iOS</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><span class="dm"></span><div class="al"><b>사진을 삭제할까요?</b><span>되돌릴 수 없어요.</span><div class="bs"><span>취소</span><span>삭제</span></div></div></div><span class="cap">Android</span></div>
</div>`
    },
    {
      id: 'o-switch', k: '스위치', e: 'Switch · iOS vs Material 3',
      d: 'iOS 스위치는 켜지면 초록색으로 채워지고, 머티리얼 3 스위치는 꺼질 땐 작은 손잡이와 테두리, 켜지면 손잡이가 커지며 체크 표시가 생겨요.',
      u: '두 스위치 모두 누르는 즉시 적용되는 설정에만 써요. 크로스 플랫폼 앱이라도 스위치처럼 손에 익은 기본 컨트롤은 각 플랫폼의 모양을 따르는 편이 자연스러워요.',
      html: `<div class="two">
<div class="col"><div class="pan box"><span class="is"><b></b></span></div><span class="cap">iOS</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="ms"><b></b></span></div><span class="cap">Material 3</span></div>
</div>`
    },
    {
      id: 'o-date', k: '날짜 선택', e: 'Date picker · Wheel vs Calendar',
      d: 'iOS는 돌려서 고르는 휠이나 달력 화면을, 안드로이드는 달력 그리드에서 날짜를 눌러 고르는 방식을 기본으로 써요.',
      u: '생년월일처럼 먼 날짜는 휠이나 직접 입력이 빠르고, 예약처럼 요일과 앞뒤 날짜가 중요하면 달력이 좋아요. 휠로 수십 년을 돌리게 만들지 마세요.',
      html: `<div class="two">
<div class="col"><div class="pan box"><div class="wh"><span class="band"></span><div class="cl"><span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span></div><div class="cl c2"><span>9월</span><span>10월</span><span>11월</span><span>12월</span><span>1월</span></div><div class="cl c3"><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div></div></div><span class="cap">iOS 휠</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><div class="hd"><span>2026년 11월</span><span>‹ ›</span></div><div class="cal"><i class="sel"></i><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div></div><span class="cap">Android 달력</span></div>
</div>`
    }
  ]
});
