(() => {
const X = window.IOSX;
X.css += `
.io-step .pan{width:19em;padding:1.4em;display:flex;flex-direction:column;gap:1.4em}
.io-step .rw{justify-content:space-between;font-size:.85em}
.io-step .st7{display:flex;align-items:center;border-radius:.6em;background:color-mix(in srgb,var(--ink-3) 15%,transparent);font-size:1.1em}
.io-step .st7 i{width:2.4em;height:1.7em;display:grid;place-items:center;font-style:normal}
.io-step .st7 i+i{border-left:.06em solid var(--line)}
.io-step .st7 .p2{animation:stsl-p 4s infinite}
.io-step .n4{position:relative;display:inline-grid;width:1.2em;font-weight:700;font-size:1.1em;text-align:right}
.io-step .n4 span{grid-area:1/1}
.io-step .n1{animation:stsl-1 4s steps(1) infinite}.io-step .n2{animation:stsl-2 4s steps(1) infinite}.io-step .n3{animation:stsl-3 4s steps(1) infinite}
.io-step .sl3{display:flex;align-items:center;gap:.6em;color:var(--ink-3);font-size:.8em}
.io-step .tr2{position:relative;flex:1;height:.3em;border-radius:1em;background:var(--line)}
.io-step .tr2 b{position:absolute;left:0;top:0;bottom:0;border-radius:1em;background:var(--accent);animation:stsl-w 4s cubic-bezier(.4,0,.2,1) infinite}
.io-step .tr2 i{position:absolute;top:50%;width:1.8em;height:1.8em;margin:-.9em 0 0 -.9em;border-radius:50%;background:#fff;box-shadow:0 .1em .4em rgba(0,0,0,.3);animation:stsl-t 4s cubic-bezier(.4,0,.2,1) infinite}

.io-pick .pan{width:20em;padding:1.1em;display:flex;flex-direction:column;gap:.8em}
.io-pick .whl{position:relative;height:8.2em;display:grid;grid-template-columns:1fr 1fr 1fr;overflow:hidden;font-size:.9em;font-variant-numeric:tabular-nums;-webkit-mask:linear-gradient(transparent,#000 30%,#000 70%,transparent);mask:linear-gradient(transparent,#000 30%,#000 70%,transparent)}
.io-pick .band{position:absolute;left:0;right:0;top:50%;height:1.8em;margin-top:-.9em;border-radius:.5em;background:color-mix(in srgb,var(--ink-3) 15%,transparent)}
.io-pick .cl{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:3.2em;animation:date-w 4s cubic-bezier(.3,.7,.2,1) infinite}
.io-pick .cl span{height:1.8em;line-height:1.8em}
.io-pick .c2{animation-delay:.2s;animation-fill-mode:backwards}.io-pick .c3{animation-delay:.4s;animation-fill-mode:backwards}
.io-pick .cmp{display:flex;align-items:center;justify-content:space-between;font-size:.8em;padding-top:.6em;border-top:.06em solid var(--rule)}
.io-pick .cmp b{padding:.3em .7em;border-radius:.5em;background:color-mix(in srgb,var(--ink-3) 15%,transparent);font-weight:500;color:var(--accent)}

.io-menu .pan{position:relative;width:20em;height:15em;padding:1.1em}
.io-menu .hd10{display:flex;justify-content:space-between;align-items:center}
.io-menu .hd10 b{font-size:1.2em}
.io-menu .mb{display:flex;align-items:center;gap:.3em;padding:.35em .8em;border-radius:1em;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent);font-size:.75em;font-weight:600}
.io-menu .ls5{display:flex;flex-direction:column;gap:.6em;margin-top:1em}
.io-menu .mn2{position:absolute;right:.9em;top:3.2em;width:10.5em;border-radius:.9em;background:color-mix(in srgb,var(--ui) 82%,transparent);-webkit-backdrop-filter:blur(.8em);backdrop-filter:blur(.8em);box-shadow:0 .6em 1.8em -.4em rgba(0,0,0,.35);overflow:hidden;font-size:.75em;transform-origin:100% 0;animation:men-m 4s cubic-bezier(.2,.9,.3,1.1) infinite}
.io-menu .mn2 span{display:flex;align-items:center;gap:.5em;padding:.6em .8em;border-bottom:.06em solid var(--rule)}
.io-menu .mn2 span:last-child{border:0}
.io-menu .mn2 i{width:.9em;font-style:normal;color:var(--ink);font-weight:700}
.io-menu .tap{left:82%;top:15%;animation-delay:-1.2s}

.io-alert .dm{animation:alt-d 4s infinite}
.io-alert .al2{position:absolute;left:50%;top:50%;width:8.6em;border-radius:1.1em;background:color-mix(in srgb,var(--ui) 92%,transparent);-webkit-backdrop-filter:blur(.8em);backdrop-filter:blur(.8em);text-align:center;overflow:hidden;z-index:3;animation:alt-i 4s cubic-bezier(.2,.8,.2,1) infinite}
.io-alert .al2 .tx{padding:1em .8em .8em;display:flex;flex-direction:column;gap:.3em}
.io-alert .al2 b{font-size:.85em}
.io-alert .al2 .tx span{font-size:.68em;color:var(--ink-2);line-height:1.4}
.io-alert .al2 .bs{display:grid;grid-template-columns:1fr 1fr;border-top:.06em solid var(--rule);font-size:.8em}
.io-alert .al2 .bs span{padding:.6em 0;color:var(--accent)}
.io-alert .al2 .bs span+span{border-left:.06em solid var(--rule);color:var(--danger);font-weight:600}

.io-act .dm{animation:alt-d 4s infinite}
.io-act .as{position:absolute;left:.5em;right:.5em;bottom:.8em;display:flex;flex-direction:column;gap:.45em;z-index:3;animation:mdsh-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.io-act .as div{border-radius:1em;overflow:hidden;background:color-mix(in srgb,var(--ui) 92%,transparent);-webkit-backdrop-filter:blur(.8em);backdrop-filter:blur(.8em);text-align:center}
.io-act .as p{margin:0;padding:.7em;font-size:.6em;color:var(--ink-3);border-bottom:.06em solid var(--rule)}
.io-act .as span{display:block;padding:.65em;font-size:.8em;color:var(--accent);border-bottom:.06em solid var(--rule)}
.io-act .as span:last-child{border:0}
.io-act .as .ds{color:var(--danger)}
.io-act .as .cn{font-weight:700}

.io-ctx .dm{-webkit-backdrop-filter:blur(.35em);backdrop-filter:blur(.35em);animation:long-d 4s infinite}
.io-ctx .gr3{display:grid;grid-template-columns:repeat(3,1fr);gap:.2em;margin:0 -1em}
.io-ctx .gr3 i{aspect-ratio:1;background:var(--accent-soft)}
.io-ctx .gr3 i:nth-child(3n+2){background:var(--warn-soft)}
.io-ctx .pv{position:absolute;left:1.4em;right:1.4em;top:4.2em;height:7em;border-radius:1em;background:linear-gradient(135deg,var(--warn-soft),var(--accent-soft));z-index:3;box-shadow:0 .8em 1.8em -.6em rgba(0,0,0,.45);opacity:0;animation:ctx-p 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.io-ctx .mn3{position:absolute;left:1.4em;width:7.4em;top:11.8em;border-radius:.9em;overflow:hidden;background:color-mix(in srgb,var(--ui) 90%,transparent);z-index:3;font-size:.72em;transform-origin:15% 0;animation:long-m 4s cubic-bezier(.2,.8,.2,1) infinite}
.io-ctx .mn3 span{display:flex;justify-content:space-between;padding:.6em .8em;border-bottom:.06em solid var(--rule)}
.io-ctx .mn3 span:last-child{border:0;color:var(--danger)}
.io-ctx .tap{left:50%;top:30%;animation:long-t 4s infinite}
@keyframes ctx-p{0%,28%{opacity:0;transform:scale(.4) translate(-30%,-40%)}36%,82%{opacity:1;transform:none}90%,100%{opacity:0;transform:scale(.6)}}

.io-list .scr{gap:.5em}
.io-list .hd2{font-size:.55em;color:var(--ink-3);padding:0 1.2em;margin-top:.3em}
.io-list .ft{font-size:.55em;color:var(--ink-3);padding:0 1.2em;line-height:1.4}
.io-list .hl3{animation:lst-h 4s infinite}
.io-list .tap{left:50%;top:35%;animation-delay:-.8s}
@keyframes lst-h{0%,26%{background:transparent}30%,40%{background:color-mix(in srgb,var(--ink-3) 18%,transparent)}46%,100%{background:transparent}}

.io-swipe .igrp{width:100%}
.io-swipe .row3{position:relative;height:3.1em;overflow:hidden;border-bottom:.06em solid var(--rule)}
.io-swipe .row3:last-child{border:0}
.io-swipe .act{position:absolute;right:0;top:0;bottom:0;display:flex}
.io-swipe .act span{width:3.2em;display:grid;place-items:center;color:#fff;font-size:.55em;font-weight:600}
.io-swipe .fr2{position:absolute;inset:0;display:flex;align-items:center;gap:.5em;padding:0 .7em;background:var(--ui)}
.io-swipe .fr2 .cl2{display:flex;flex-direction:column;gap:.3em;flex:1}
.io-swipe .sw2 .fr2{animation:isw-s 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-swipe .dr{left:75%;top:46%;animation:isw-f 5s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes isw-s{0%,12%{transform:none}30%,62%{transform:translateX(-5.8em)}74%,100%{transform:none}}
@keyframes isw-f{0%,8%{opacity:0;transform:none}12%{opacity:.28;transform:none}30%{opacity:.28;transform:translateX(-5.8em)}34%,100%{opacity:0;transform:translateX(-5.8em)}}

.io-edit .ed{color:var(--accent);font-size:.8em;display:grid;justify-items:end}
.io-edit .ed span{grid-area:1/1}
.io-edit .e1{animation:btln-1 5s steps(1) infinite;animation-delay:-1.4s}.io-edit .e2{opacity:0;font-weight:700;animation:btln-2 5s steps(1) infinite;animation-delay:-1.4s}
.io-edit .irow{position:relative}
.io-edit .mi2{width:0;height:1.4em;border-radius:50%;background:#FF3B30;flex:none;position:relative;overflow:hidden;animation:ied-m 5s cubic-bezier(.3,.7,.2,1) infinite}
.io-edit .mi2::after{content:"";position:absolute;left:25%;right:25%;top:45%;height:10%;background:#fff}
.io-edit .hd3{margin-left:auto;display:flex;flex-direction:column;gap:.2em;width:1.2em;opacity:0;animation:ied-h 5s infinite}
.io-edit .hd3 i{height:.12em;background:var(--ink-3)}
.io-edit .tap{left:84%;top:10%;animation-duration:5s;animation-delay:-1.6s}
@keyframes ied-m{0%,24%{width:0;margin-right:-.6em}34%,86%{width:1.4em;margin-right:0}96%,100%{width:0;margin-right:-.6em}}
@keyframes ied-h{0%,26%{opacity:0}36%,86%{opacity:1}96%,100%{opacity:0}}

.io-share .dm{animation:alt-d 5s infinite}
.io-share .ss{position:absolute;left:0;right:0;bottom:0;padding:.6em .8em 1.2em;display:flex;flex-direction:column;gap:.7em;background:var(--stage);border-radius:1.3em 1.3em 0 0;z-index:3;animation:ish-s2 5s cubic-bezier(.2,.8,.2,1) infinite}
.io-share .gr2{display:block;width:2.4em;height:.3em;border-radius:1em;background:var(--line);margin:0 auto}
.io-share .rw4{display:flex;justify-content:space-between}
.io-share .rw4 span{display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:.48em;color:var(--ink-2)}
.io-share .rw4 i{width:4.2em;height:4.2em;border-radius:50%;background:var(--accent-soft)}
.io-share .ap i{border-radius:1em}
.io-share .igrp .irow{font-size:.7em;padding:.5em .8em}
@keyframes ish-s2{0%,10%{transform:translateY(100%)}22%,84%{transform:none}94%,100%{transform:translateY(100%)}}
`;
const add = (o) => { X.items[o.id] = o; };
add({ id: 'io-step', k: '스테퍼와 슬라이더', e: 'Stepper · Slider',
  d: 'iOS 스테퍼는 −/+ 두 칸으로 나뉜 회색 버튼, 슬라이더는 파란 채움 막대와 흰 원형 손잡이로 이뤄져 있어요.',
  u: '스테퍼는 값이 바뀐 결과를 옆에 숫자로 함께 보여줘야 해요. 슬라이더 양쪽에는 최소·최대를 뜻하는 아이콘(작은 소리·큰 소리 등)을 두면 의미가 분명해져요.',
  html: `<div class="pan box"><span class="rw">연습 질문 수<span style="display:flex;align-items:center;gap:.8em"><span class="n4"><span class="n1">5</span><span class="n2">6</span><span class="n3">7</span></span><span class="st7"><i>−</i><i class="p2">+</i></span></span></span><span class="sl3">가<span class="tr2"><b></b><i></i></span><b style="font-size:1.4em;font-weight:500">가</b></span></div>` });
add({ id: 'io-pick', k: '피커와 날짜 선택', e: 'Picker · Date picker',
  d: '여러 값을 돌려서 고르는 휠 피커와, 날짜를 한 줄로 보여주다가 누르면 달력이 펼쳐지는 컴팩트 날짜 선택이 있어요.',
  u: '휠은 시간처럼 값이 연속될 때, 달력은 요일과 앞뒤 날짜가 중요할 때 맞아요. 폼 안에서는 컴팩트 스타일로 자리를 아끼고 눌렀을 때만 펼치세요.',
  html: `<div class="pan box"><div class="whl"><span class="band"></span><div class="cl"><span>오전</span><span>오전</span><span>오후</span><span>오후</span><span>오후</span></div><div class="cl c2"><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span></div><div class="cl c3"><span>00</span><span>15</span><span>30</span><span>45</span><span>00</span></div></div><div class="cmp">면접 날짜<b>2026. 11. 12.</b></div></div>` });
add({ id: 'io-menu', k: '풀다운 메뉴', e: 'Pull-down menu',
  d: '버튼을 누르면 그 자리에서 반투명한 메뉴가 펼쳐지고, 현재 선택된 항목에는 체크 표시가 붙어요.',
  u: '정렬·보기 방식처럼 그 화면에 관련된 선택지를 버튼 하나에 모을 때 써요. 메뉴는 짧게, 비슷한 항목끼리 구분선으로 묶고, 위험한 동작은 빨간색으로 맨 아래에 두세요.',
  html: `<div class="pan box"><div class="hd10"><b>기록</b><span class="mb">정렬 ⌄</span></div><div class="ls5"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div><div class="mn2"><span><i>✓</i>최신순</span><span><i></i>점수 높은순</span><span><i></i>직무별</span></div><span class="tap"></span></div>` });
add({ id: 'io-alert', k: '알림창', e: 'Alert',
  d: '흐름을 멈추고 꼭 알아야 할 내용이나 결정을 묻는 작은 창이에요. 가운데 정렬 제목과 설명, 아래쪽을 꽉 채운 버튼으로 이뤄져요.',
  u: '버튼은 2개가 가장 좋고, 취소는 왼쪽, 위험한 동작은 빨간색으로 표시하세요. 버튼 이름은 "확인"보다 "삭제"처럼 동작으로 쓰세요. 자주 띄우면 사람들은 읽지 않고 누르게 돼요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.4em">사진</span><span class="im" style="height:9em"></span></div><span class="dm"></span><div class="al2"><div class="tx"><b>이 사진을 삭제할까요?</b><span>최근 삭제된 항목에서 30일 동안 보관돼요.</span></div><div class="bs"><span>취소</span><span>삭제</span></div></div></div>` });
add({ id: 'io-act', k: '액션 시트', e: 'Action sheet',
  d: '사용자가 한 행동에 대해 몇 가지 선택지를 아래쪽에 모아 보여주는 시트예요. 취소 버튼은 따로 떨어져 맨 아래에 있어요.',
  u: '삭제 확인처럼 사용자가 시작한 동작의 선택지를 고를 때 써요. 위험한 선택지는 빨간색으로, 취소는 굵게 맨 아래에 두세요. iPad에서는 시트 대신 누른 버튼 옆에 팝오버로 떠요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.4em">메모</span><span class="ln" style="width:80%"></span><span class="ln" style="width:60%"></span><span class="ln" style="width:70%"></span></div><span class="dm"></span><div class="as"><div><p>이 메모를 어떻게 할까요?</p><span>복제</span><span>폴더로 이동</span><span class="ds">삭제</span></div><div><span class="cn">취소</span></div></div></div>` });
add({ id: 'io-ctx', k: '컨텍스트 메뉴', e: 'Context menu',
  d: '항목을 길게 누르면 뒤 화면이 흐려지고, 항목의 미리보기가 떠오르며 그 아래에 관련 동작 메뉴가 나타나요.',
  u: '자주 쓰는 동작의 지름길로 쓰고, 같은 동작을 다른 곳(버튼, 메뉴)에도 꼭 두세요. 미리보기를 누르면 그 항목으로 들어가게 하고, 메뉴는 4~6개 이내로 유지하세요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.4em">사진</span><div class="gr3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><span class="dm"></span><span class="pv"></span><div class="mn3"><span>공유 <b>↑</b></span><span>즐겨찾기 <b>♡</b></span><span>삭제 <b>⌫</b></span></div><span class="tap"></span></div>` });
add({ id: 'io-list', k: '인셋 그룹 목록', e: 'Inset grouped list',
  d: '설정 앱처럼 관련 항목을 둥근 묶음으로 나누고, 묶음 위에는 작은 제목, 아래에는 설명 문구를 다는 iOS의 대표적인 목록 형태예요.',
  u: '왼쪽 색 아이콘은 항목을 빨리 찾게 도와줘요. 다음 화면으로 이동하는 행에는 › 표시를, 바로 바뀌는 설정에는 스위치를 쓰세요. 행을 누르면 잠깐 회색으로 반응해야 해요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.5em">설정</span><span class="hd2">연습</span><div class="igrp"><span class="irow hl3"><i class="t4" style="background:#FF9500"></i>알림<span class="chv">›</span></span><span class="irow"><i class="t4" style="background:#34C759"></i>하루 목표<span class="chv" style="font-size:.9em">3회 ›</span></span><span class="irow"><i class="t4" style="background:#5856D6"></i>음성 인식<span class="isw on"><b></b></span></span></div><span class="ft">음성 인식을 켜면 답변을 글자로 바꿔 리포트에 보여줘요.</span></div><span class="tap"></span></div>` });
add({ id: 'io-swipe', k: '스와이프 동작', e: 'Swipe actions',
  d: '목록 행을 왼쪽으로 밀면 오른쪽 끝에 회색·주황·빨강 동작 버튼이 드러나요. 끝까지 밀면 첫 번째 동작이 바로 실행돼요.',
  u: '메일·메시지처럼 정리할 일이 많은 목록에 써요. 가장 흔한 동작을 맨 바깥에 두고, 삭제처럼 되돌리기 어려운 동작에는 실행 취소를 함께 제공하세요. 오른쪽으로 밀기(leading)에는 읽음 표시 같은 가벼운 동작을 둬요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.4em">받은 편지함</span><div class="igrp"><div class="row3"><div class="fr2"><span class="av"></span><span class="cl2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></div></div><div class="row3 sw2"><div class="act"><span style="background:#8E8E93">더 보기</span><span style="background:#FF9500">깃발</span><span style="background:#FF3B30">휴지통</span></div><div class="fr2"><span class="av"></span><span class="cl2"><span class="ln" style="width:65%"></span><span class="ln" style="width:50%"></span></span></div></div><div class="row3"><div class="fr2"><span class="av"></span><span class="cl2"><span class="ln" style="width:75%"></span><span class="ln" style="width:40%"></span></span></div></div></div></div><span class="tap dr"></span></div>` });
add({ id: 'io-edit', k: '편집 모드', e: 'Edit mode',
  d: '편집 버튼을 누르면 각 행 왼쪽에 빨간 빼기 버튼, 오른쪽에 순서를 바꾸는 손잡이가 나타나요. 버튼은 "완료"로 바뀌어요.',
  u: '여러 항목을 한꺼번에 지우거나 순서를 바꿀 때 써요. 편집 중에는 행을 눌러도 다른 화면으로 이동하지 않아야 해요. 끝나면 "완료"를 눌러 원래 상태로 돌아와요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="inb"><span></span><span></span><span class="ed"><span class="e1">편집</span><span class="e2">완료</span></span></span><span class="lt2" style="font-size:1.4em">즐겨찾기</span><div class="igrp"><span class="irow"><i class="mi2"></i>자기소개<span class="hd3"><i></i><i></i><i></i></span></span><span class="irow"><i class="mi2"></i>지원 동기<span class="hd3"><i></i><i></i><i></i></span></span><span class="irow"><i class="mi2"></i>협업 경험<span class="hd3"><i></i><i></i><i></i></span></span><span class="irow"><i class="mi2"></i>실패 경험<span class="hd3"><i></i><i></i><i></i></span></span></div></div><span class="tap"></span></div>` });
add({ id: 'io-share', k: '공유 시트', e: 'Share sheet',
  d: '공유 버튼을 누르면 아래에서 올라오는 시스템 화면이에요. 최근 대화 상대, 앱, 복사·저장 같은 동작이 차례로 나와요.',
  u: '공유는 직접 만들기보다 시스템 공유 시트를 쓰세요. 사용자가 이미 익숙하고, 설치된 모든 앱으로 보낼 수 있어요. 공유 아이콘은 위쪽 화살표가 있는 네모(□↑)가 iOS 표준이에요.',
  html: `<div class="ph ios-g"><div class="scr"><span class="lt2" style="font-size:1.4em">리포트</span><span class="im" style="height:7em"></span></div><span class="dm"></span><div class="ss"><i class="gr2"></i><div class="rw4"><span><i></i>지원</span><span><i style="background:var(--warn-soft)"></i>민준</span><span><i></i>서연</span><span><i style="background:var(--warn-soft)"></i>팀</span></div><div class="rw4 ap"><span><i style="background:#34C759"></i>메시지</span><span><i style="background:#007AFF"></i>메일</span><span><i style="background:#FEE500"></i>카톡</span><span><i style="background:var(--line)"></i>더 보기</span></div><div class="igrp"><span class="irow">복사<span class="chv">⧉</span></span><span class="irow">파일에 저장<span class="chv">▭</span></span></div></div></div>` });

/* assemble the iOS page */
const pool = {}; let poolCss = '';
(window.UX || []).forEach(s => { poolCss += s.css || ''; s.items.forEach(i => { pool[i.id] = i; }); });
const P = (id, o) => Object.assign({}, pool[id], o || {});
const I = (id) => X.items[id];
window.UX = [
  { id: 'i-found', short: '화면의 기본', en: 'Foundations', title: 'iOS 화면의 기본', sub: '애플 휴먼 인터페이스 가이드라인(HIG)이 말하는 화면의 바탕이에요. 안전 영역, 단위, 글자 크기, 재질을 먼저 이해하세요.', css: poolCss + X.css, items: [
    P('o-safe', { k: '안전 영역', d: '다이내믹 아일랜드, 상태 표시줄, 홈 인디케이터, 둥근 모서리에 가려지지 않는 영역이에요. 배경은 화면 끝까지, 글자와 버튼은 안전 영역 안에 둬요.', u: 'SwiftUI와 UIKit 모두 안전 영역을 기본으로 따르니, 배경만 의도적으로 넘어가게(ignoresSafeArea) 하세요. 하단 버튼은 홈 인디케이터 위로 충분히 띄워야 스와이프와 겹치지 않아요.' }),
    P('o-island', { u: '배달·운동·타이머처럼 진행 중인 상태는 라이브 액티비티로 잠금 화면과 다이내믹 아일랜드에 보여줄 수 있어요. 광고나 일회성 알림에는 쓰지 마세요. 작게 접힌 상태에서도 핵심 정보가 읽혀야 해요.' }),
    P('o-unit', { k: '포인트와 해상도', e: 'Points · @2x · @3x', d: 'iOS는 픽셀 대신 포인트(pt)로 크기를 정해요. 같은 44pt 버튼이 화면 밀도에 따라 88px(@2x), 132px(@3x)로 그려져요.', u: '디자인은 pt 기준으로 하고, 비트맵 이미지는 @2x·@3x로 내보내거나 SF Symbols·벡터를 쓰세요. 누를 수 있는 영역은 최소 44×44pt가 기준이에요.' }),
    I('io-type'),
    P('st-liquid', { u: 'iOS 26에서 탭 바, 툴바, 버튼, 시트에 적용됐고, iOS 27에서는 굴절을 다듬고 대비를 높였으며 사용자가 "완전히 투명함"부터 "색 입힘"까지 정도를 고르는 슬라이더가 생겼어요. 그래서 어떤 설정에서도 글자가 읽히는지 확인해야 해요.' }),
    P('i-thumb')
  ] },
  { id: 'i-nav', short: '내비게이션', en: 'Navigation', title: '화면 사이를 오가는 법', sub: '탭 바로 큰 영역을, 내비게이션 바와 푸시로 깊이를, 시트로 잠깐의 작업을 나눠요.', items: [I('io-tab'), I('io-nav'), I('io-push'), I('io-sheet'), I('io-search'), I('io-split')] },
  { id: 'i-ctrl', short: '컨트롤', en: 'Controls', title: '손끝으로 만지는 컨트롤', sub: '버튼, 스위치, 세그먼트, 피커, 메뉴처럼 iOS 사용자가 이미 손에 익힌 기본 컨트롤이에요.', items: [I('io-btn'), I('io-sw'), I('io-seg'), I('io-step'), I('io-pick'), I('io-menu')] },
  { id: 'i-present', short: '알림과 시트', en: 'Presentation', title: '알리고, 묻고, 떠오르는 화면', sub: '흐름을 멈추는 알림창부터, 손끝에 반응하는 햅틱, 앱 밖으로 나가는 위젯과 알림까지예요.', items: [
    I('io-alert'), I('io-act'), I('io-ctx'),
    P('o-hapt', { u: 'UIFeedbackGenerator나 SwiftUI의 sensoryFeedback으로 성공·경고·선택 변경 같은 정해진 진동을 쓰세요. 스위치, 피커처럼 시스템 컨트롤에는 이미 햅틱이 들어 있어요. 모든 탭마다 진동하면 금방 피곤해요.' }),
    P('r-push', { k: '알림', e: 'Notifications', u: '알림 권한은 처음 실행 때 바로 묻지 말고 필요한 순간에 이유와 함께 물으세요. iOS는 알림을 앱별로 묶고, 집중 모드에서는 시간 민감(Time Sensitive) 알림만 통과시킬 수 있어요. 구체적이고 그 사람에게만 해당하는 내용을 쓰세요.' }),
    P('dv-widget', { u: '위젯은 작게·중간·크게 크기마다 보여줄 정보를 다르게 설계하세요. iOS는 잠금 화면 위젯과 홈 화면 위젯이 따로 있고, 위젯 안에서 버튼을 눌러 간단한 동작을 할 수도 있어요.' })
  ] },
  { id: 'i-list', short: '목록과 콘텐츠', en: 'Lists & content', title: '목록을 다루는 법', sub: 'iOS 앱 화면의 대부분은 목록이에요. 정리하고, 지우고, 순서를 바꾸고, 공유하는 방식이 정해져 있어요.', items: [
    I('io-list'), I('io-swipe'),
    P('n-ptr', { u: 'iOS 목록(List·UITableView)에는 당겨서 새로고침이 기본으로 들어 있어요. 새로 들어온 항목은 잠깐 강조하고, 새로고침할 게 없으면 바로 돌아가게 하세요.' }),
    I('io-edit'), I('io-share'),
    P('f-emp', { u: 'iOS 17부터는 ContentUnavailableView로 빈 상태와 검색 결과 없음 화면을 쉽게 만들 수 있어요. 이유와 다음 행동 버튼을 함께 두세요.' })
  ] }
];
})();
