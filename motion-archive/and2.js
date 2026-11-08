(() => {
const X = window.ANDX;
X.css += `
.an-chip .ls8{display:flex;flex-direction:column;gap:.7em;width:20em}
.an-chip .ls8 div{display:flex;align-items:center;justify-content:space-between}
.an-chip .ls8 em{font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.an-chip .cp3{display:inline-flex;align-items:center;gap:.45em;height:2.4em;padding:0 .9em;border-radius:.6em;border:.1em solid var(--line);font-size:.8em;font-weight:500;color:var(--ink-2)}
.an-chip .cp3 i{font-style:normal;color:var(--accent)}
.an-chip .ft2{animation:chp-f 4s steps(1) infinite}
.an-chip .ft2 i{max-width:0;overflow:hidden;animation:chp-c 4s steps(1) infinite}
.an-chip .ip2 b{width:1.6em;height:1.6em;border-radius:50%;background:var(--accent-soft);margin-left:-.5em}
@keyframes chp-f{0%{background:transparent;border-color:var(--line);color:var(--ink-2)}30%{background:var(--accent-soft);border-color:transparent;color:var(--ink)}90%{background:transparent;border-color:var(--line);color:var(--ink-2)}}
@keyframes chp-c{0%{max-width:0}30%{max-width:1.2em}90%{max-width:0}}

.an-sw .pan{width:20em;padding:1.2em 1.4em;display:flex;flex-direction:column;gap:1em}
.an-sw .row5{display:flex;align-items:center;justify-content:space-between;font-size:.85em}
.an-sw .ms2{position:relative;width:5.2em;height:3.2em;border-radius:2em;border:.2em solid var(--ink-3);background:var(--stage);flex:none}
.an-sw .ms2 b{position:absolute;top:50%;left:.65em;width:1.6em;height:1.6em;margin-top:-.8em;border-radius:50%;background:var(--ink-3)}
.an-sw .ms2.on{background:var(--accent);border-color:var(--accent)}
.an-sw .ms2.on b{left:auto;right:.35em;width:2.4em;height:2.4em;margin-top:-1.2em;background:var(--accent-ink)}
.an-sw .ms2.a{animation:sw-mb 4s infinite}.an-sw .ms2.a b{animation:sw-mk 4s cubic-bezier(.3,.7,.3,1) infinite;display:grid;place-items:center;color:transparent}
.an-sw .ms2.a b::after{content:"";width:.45em;height:.85em;border:solid currentColor;border-width:0 .18em .18em 0;transform:translateY(-.1em) rotate(45deg)}

.an-slider .pan{position:relative;width:21em;padding:2.6em 1.6em 1.6em;display:flex;flex-direction:column;gap:1em}
.an-slider .trk2{position:relative;height:1.6em}
.an-slider .trk2 .ac{position:absolute;left:0;top:0;bottom:0;border-radius:.8em .3em .3em .8em;background:var(--accent);animation:sld-a 4s cubic-bezier(.4,0,.2,1) infinite}
.an-slider .trk2 .ia{position:absolute;right:0;top:0;bottom:0;border-radius:.3em .8em .8em .3em;background:var(--accent-soft);animation:sld-i 4s cubic-bezier(.4,0,.2,1) infinite}
.an-slider .hd11{position:absolute;top:-.6em;bottom:-.6em;width:.35em;margin-left:-.175em;border-radius:1em;background:var(--accent);animation:sld-h 4s cubic-bezier(.4,0,.2,1) infinite}
.an-slider .vl{position:absolute;bottom:2.6em;width:3em;margin-left:-1.5em;padding:.4em 0;border-radius:1.5em;background:var(--ink);color:var(--bg);text-align:center;font-size:.75em;font-weight:500;display:grid;opacity:0;animation:sld-v 4s cubic-bezier(.4,0,.2,1) infinite}
.an-slider .vl span{grid-area:1/1}
.an-slider .v1{animation:btln-1 4s steps(1) infinite;animation-delay:-.6s}.an-slider .v2{opacity:0;animation:btln-2 4s steps(1) infinite;animation-delay:-.6s}
.an-slider .lb4{display:flex;justify-content:space-between;font-size:.75em;color:var(--ink-2)}
@keyframes sld-a{0%,14%{width:calc(30% - .5em)}46%,84%{width:calc(72% - .5em)}96%,100%{width:calc(30% - .5em)}}
@keyframes sld-i{0%,14%{width:calc(70% - .5em)}46%,84%{width:calc(28% - .5em)}96%,100%{width:calc(70% - .5em)}}
@keyframes sld-h{0%,14%{left:30%}46%,84%{left:72%}96%,100%{left:30%}}
@keyframes sld-v{0%,10%{opacity:0;left:30%}16%{opacity:1;left:30%}46%{opacity:1;left:72%}54%,100%{opacity:0;left:72%}}

.an-date .dm{animation:alt-d 4.5s infinite}
.an-date .dp{position:absolute;left:50%;top:50%;width:10.4em;padding:1em .8em .7em;border-radius:1.6em;background:var(--stage);z-index:3;display:flex;flex-direction:column;gap:.5em;animation:alt-i 4.5s cubic-bezier(.2,.8,.2,1) infinite}
.an-date .dp em{font-style:normal;font-size:.55em;color:var(--ink-2)}
.an-date .dp b{font-size:1.2em;font-weight:400;padding-bottom:.4em;border-bottom:.06em solid var(--line)}
.an-date .cal2{position:relative;display:grid;grid-template-columns:repeat(7,1fr);row-gap:.15em;font-size:.55em;text-align:center}
.an-date .cal2 span{position:relative;line-height:2em}
.an-date .sl4{position:absolute;left:0;top:0;width:calc(100% / 7);height:2em;display:grid;place-items:center;animation:adt-m 4.5s cubic-bezier(.4,0,.2,1) infinite}
.an-date .sl4::before{content:"";width:2em;height:2em;border-radius:50%;background:var(--accent)}
.an-date .bt3{display:flex;justify-content:flex-end;gap:1.2em;font-size:.65em;font-weight:500;color:var(--accent)}
@keyframes adt-m{0%,30%{transform:translate(0,2.15em)}42%,90%{transform:translate(400%,2.15em)}100%{transform:translate(0,2.15em)}}

.an-dlg .dm{animation:alt-d 4s infinite}
.an-dlg .dg{position:absolute;left:50%;top:50%;width:9.4em;padding:1.2em 1em .9em;border-radius:1.6em;background:var(--stage);z-index:3;display:flex;flex-direction:column;align-items:center;gap:.5em;text-align:center;animation:alt-a 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-dlg .dg i{width:1.4em;height:1.4em;border-radius:.3em;border:.2em solid var(--accent)}
.an-dlg .dg b{font-size:1em;font-weight:400}
.an-dlg .dg span{font-size:.62em;color:var(--ink-2);line-height:1.5;text-align:left}
.an-dlg .dg .bt3{align-self:stretch;display:flex;justify-content:flex-end;gap:1.3em;font-size:.68em;font-weight:500;color:var(--accent);margin-top:.4em}

.an-snack .fb2{position:absolute;right:1em;bottom:1.2em;width:3.4em;height:3.4em;border-radius:1em;background:var(--accent-soft);display:grid;place-items:center;font-size:1.1em;box-shadow:0 .3em .7em -.2em rgba(0,0,0,.3);animation:snk-f 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-snack .sn2{position:absolute;left:.7em;right:.7em;bottom:1.1em;display:flex;justify-content:space-between;align-items:center;padding:.85em 1em;border-radius:.4em;background:var(--ink);color:var(--bg);font-size:.72em;animation:tssn-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-snack .sn2 b{color:var(--inv-accent);font-weight:500}
@keyframes snk-f{0%,14%{transform:none}22%,72%{transform:translateY(-3.6em)}80%,100%{transform:none}}

.an-sheet .dm{animation:mdsh-d 4s infinite}
.an-sheet .bs2{position:absolute;left:0;right:0;bottom:0;padding:.6em 1em 1.4em;display:flex;flex-direction:column;gap:.2em;background:var(--stage);border-radius:1.6em 1.6em 0 0;z-index:3;animation:mdsh-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-sheet .bs2 .gr2{display:block;width:2.4em;height:.3em;border-radius:1em;background:var(--ink-3);margin:.2em auto .8em;opacity:.6}
.an-sheet .bs2 span{display:flex;align-items:center;gap:.8em;padding:.6em .3em;font-size:.75em}
.an-sheet .bs2 span i{width:1.3em;height:1.3em;border-radius:.3em;border:.18em solid var(--ink-2)}

.an-prog .pan{width:21em;padding:1.4em;display:flex;flex-direction:column;gap:1.2em}
.an-prog .row6{display:flex;flex-direction:column;gap:.45em}
.an-prog .row6 em{font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.an-prog .lin{display:flex;gap:.3em;height:.35em}
.an-prog .lin b{border-radius:1em;background:var(--accent);animation:prg-w2 4s cubic-bezier(.4,0,.2,1) infinite}
.an-prog .lin i{flex:1;border-radius:1em;background:var(--accent-soft)}
.an-prog .rw5{display:flex;align-items:center;gap:2em}
.an-prog .cir{width:3em;height:3em;border-radius:50%;border:.35em solid var(--accent-soft);border-top-color:var(--accent);animation:spin .9s linear infinite}
.an-prog .wv2{flex:1;height:1.2em;overflow:hidden}
.an-prog .wv2 svg{width:200%;height:100%;animation:prg-wv 1.2s linear infinite}
.an-prog .wv2 path{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round}
@keyframes prg-w2{0%,6%{width:0}70%,92%{width:75%}100%{width:0}}
@keyframes prg-wv{to{transform:translateX(-50%)}}

.an-badge .ph .scr{padding-bottom:5em}
.an-badge .bd2{position:absolute;top:.15em;left:55%;min-width:1.8em;height:1.8em;padding:0 .4em;border-radius:1em;background:var(--danger);color:#fff;font-size:.9em;font-weight:500;display:grid;place-items:center;animation:bdg-p 4s infinite;z-index:2}
.an-badge .bd2.dt3{min-width:0;width:1em;height:1em;padding:0;left:60%;top:.4em}
.an-badge .m3n span{position:relative}

.an-ripple .ls9{position:relative;width:20em;display:flex;flex-direction:column}
.an-ripple .it2{position:relative;overflow:hidden;display:flex;align-items:center;gap:.8em;padding:.9em 1em;color:var(--ink)}
.an-ripple .it2+.it2{border-top:.06em solid var(--rule)}
.an-ripple .it2 .ln{flex:1}
.an-ripple .it2 .rip{color:var(--ink)}
.an-ripple .tap{animation-delay:var(--d)}

.an-noti .ph{background:var(--stage)}
.an-noti .qs{display:grid;grid-template-columns:1fr 1fr;gap:.4em;margin-bottom:.4em}
.an-noti .qs span{height:2.6em;border-radius:1.3em;background:var(--ui);display:flex;align-items:center;gap:.5em;padding:0 .7em;font-size:.6em;font-weight:500}
.an-noti .qs span.on{background:var(--accent);color:var(--accent-ink)}
.an-noti .qs i{width:1.1em;height:1.1em;border-radius:50%;border:.2em solid currentColor}
.an-noti .nf{display:flex;flex-direction:column;gap:.35em;padding:.7em .8em;border-radius:1.1em;background:var(--ui);font-size:.62em}
.an-noti .nf b{font-weight:600}
.an-noti .nf em{font-style:normal;color:var(--ink-3);font-size:.9em}
.an-noti .nf .act2{display:flex;gap:.6em;max-height:0;overflow:hidden;animation:nf-x 4s cubic-bezier(.4,0,.2,1) infinite}
.an-noti .nf .act2 span{padding:.4em .9em;border-radius:1em;background:var(--accent-soft);font-weight:500}
.an-noti .shd{position:absolute;inset:0;padding:1.9em .8em 1em;display:flex;flex-direction:column;gap:.45em;animation:nf-d 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes nf-d{0%,8%{transform:translateY(-102%)}22%,90%{transform:none}100%{transform:translateY(-102%)}}
@keyframes nf-x{0%,40%{max-height:0}50%,86%{max-height:3em}96%,100%{max-height:0}}

.an-perm .dm{animation:alt-d 4s infinite}
.an-perm .pd{position:absolute;left:50%;top:50%;width:9.8em;padding:1.2em .9em .8em;border-radius:1.6em;background:var(--stage);z-index:3;display:flex;flex-direction:column;align-items:center;gap:.5em;text-align:center;animation:alt-a 4s cubic-bezier(.2,.8,.2,1) infinite}
.an-perm .pd i{width:1.6em;height:1.6em;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--accent)}
.an-perm .pd b{font-size:.72em;font-weight:500;line-height:1.45}
.an-perm .pd span{align-self:stretch;padding:.6em;border-radius:1.4em;background:var(--accent-soft);font-size:.6em;font-weight:500}
.an-perm .pd span.k{background:var(--accent);color:var(--accent-ink)}
.an-perm .pd .n5{background:none;color:var(--accent)}

.an-share .dm{animation:alt-d 5s infinite}
.an-share .ss2{position:absolute;left:0;right:0;bottom:0;padding:.6em .8em 1.2em;display:flex;flex-direction:column;gap:.7em;background:var(--stage);border-radius:1.6em 1.6em 0 0;z-index:3;animation:ish-s2 5s cubic-bezier(.2,.8,.2,1) infinite}
.an-share .gr2{display:block;width:2.4em;height:.3em;border-radius:1em;background:var(--ink-3);opacity:.6;margin:0 auto}
.an-share .pv3{display:flex;align-items:center;gap:.6em;padding:.5em;border-radius:.8em;background:var(--ui);font-size:.6em}
.an-share .pv3 i{width:3em;height:3em;border-radius:.5em;background:var(--accent-soft);flex:none}
.an-share .pv3 b{margin-left:auto;padding:.4em .8em;border-radius:1em;border:.1em solid var(--line);font-weight:500}
.an-share .rw6{display:flex;justify-content:space-between}
.an-share .rw6 span{display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:.48em;color:var(--ink-2)}
.an-share .rw6 i{width:4.2em;height:4.2em;border-radius:50%;background:var(--accent-soft)}
`;
const add = (o) => { X.items[o.id] = o; };
add({ id: 'an-chip', k: '칩 4종', e: 'Chips · Assist, Filter, Input, Suggestion',
  d: '칩은 작은 버튼이에요. 동작을 돕는 Assist, 조건을 거르는 Filter, 입력한 값을 보여주는 Input, 추천을 보여주는 Suggestion 네 가지가 있어요.',
  u: '필터 칩은 선택하면 체크 표시와 배경색이 생겨야 해요. 입력 칩에는 지우는 × 버튼을, 추천 칩에는 AI 답장 제안처럼 바로 넣을 수 있는 문장을 담아요. 칩 모서리는 8dp(Small)가 기본이에요.',
  html: `<div class="ls8"><div><span class="cp3"><i>＋</i>캘린더에 추가</span><em>Assist</em></div><div><span class="cp3 ft2"><i>✓</i>디자인 직무</span><em>Filter</em></div><div><span class="cp3 ip2"><b></b>김지원 ×</span><em>Input</em></div><div><span class="cp3">내일 오전 10시 어때요?</span><em>Suggestion</em></div></div>` });
add({ id: 'an-sw', k: '스위치', e: 'Switch',
  d: '꺼져 있을 때는 테두리와 작은 손잡이, 켜지면 색이 채워지고 손잡이가 커지며 체크 아이콘이 나타나는 머티리얼 3 스위치예요.',
  u: '누르는 즉시 적용되는 설정에만 써요. 손잡이 안 아이콘은 선택 사항이지만 색을 구분하기 어려운 사용자에게 켜짐 상태를 더 분명하게 알려줘요. 행 전체를 눌러도 스위치가 바뀌게 하세요.',
  html: `<div class="pan box"><div class="row5">연습 알림<span class="ms2 a"><b></b></span></div><div class="row5">주간 리포트<span class="ms2 on"><b></b></span></div><div class="row5">마케팅 수신<span class="ms2"><b></b></span></div></div>` });
add({ id: 'an-slider', k: '슬라이더', e: 'Slider',
  d: '두꺼운 트랙과 세로 막대 모양 손잡이로 값을 고르고, 끄는 동안 위에 현재 값이 말풍선으로 떠요.',
  u: '정확한 값이 필요하면 슬라이더 옆에 숫자 입력을 함께 두세요. 단계가 정해진 값(1~5점)이면 눈금이 있는 불연속 슬라이더를 쓰세요. 손잡이 주변 터치 영역은 48dp 이상이어야 해요.',
  html: `<div class="pan box"><div class="trk2"><span class="ac"></span><span class="ia"></span><span class="hd11"></span><span class="vl"><span class="v1">30</span><span class="v2">72</span></span></div><div class="lb4"><span>답변 속도</span><span>빠르게</span></div></div>` });
add({ id: 'an-date', k: '날짜 선택', e: 'Date picker',
  d: '화면 가운데 뜨는 모달 달력에서 날짜를 누르고, 오른쪽 아래 "확인"으로 확정해요. 위쪽에는 고른 날짜가 크게 보여요.',
  u: '먼 날짜(생년월일)는 연도 선택이나 직접 입력 모드로 바로 넘어갈 수 있게 하세요. 기간을 고를 때는 날짜 범위 선택기를 써요. 고를 수 없는 날은 흐리게 보여주세요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>면접 예약</b></span><span class="m3card"><span class="ln" style="width:70%"></span></span></div><span class="dm"></span><div class="dp"><em>날짜 선택</em><b>11월 12일 (목)</b><div class="cal2"><i class="sl4"></i><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span></div><div class="bt3"><span>취소</span><span>확인</span></div></div></div>` });
add({ id: 'an-dlg', k: '다이얼로그', e: 'Dialog',
  d: '모서리가 크게 둥근(28dp) 카드가 화면 가운데 떠요. 위쪽 아이콘은 선택, 제목과 설명 아래 오른쪽에 글자 버튼이 모여 있어요.',
  u: '확인 동작은 맨 오른쪽, 취소는 그 왼쪽이에요. 버튼 이름은 "확인"보다 "삭제"처럼 결과를 쓰세요. 내용이 길거나 입력이 많으면 다이얼로그 대신 전체 화면 다이얼로그나 새 화면을 쓰세요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>기록</b></span><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span></span></div><span class="dm"></span><div class="dg"><i></i><b>기록을 삭제할까요?</b><span>삭제한 연습 기록과 리포트는 되돌릴 수 없어요.</span><div class="bt3"><span>취소</span><span>삭제</span></div></div></div>` });
add({ id: 'an-snack', k: '스낵바', e: 'Snackbar',
  d: '화면 아래에 잠깐 떠서 방금 한 일의 결과를 알려주고, 실행취소 같은 동작 하나를 함께 줘요. FAB가 있으면 FAB가 위로 비켜나요.',
  u: '스낵바는 몇 초 뒤 사라지니 꼭 읽어야 하는 오류에는 쓰지 마세요. 동작 버튼은 하나만, 짧은 동사로. 하단 내비게이션 바가 있다면 그 위에 떠야 해요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b style="font-size:1.2em">메모</b></span><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span><span class="m3card"><span class="ln" style="width:80%"></span></span></div><span class="fb2">✎</span><div class="sn2"><span>메모 1개를 보관했어요</span><b>실행취소</b></div></div>` });
add({ id: 'an-sheet', k: '바텀 시트', e: 'Bottom sheet',
  d: '화면 아래에서 올라와 현재 화면과 관련된 선택지나 추가 정보를 보여줘요. 위쪽 손잡이로 끌어서 펼치거나 닫을 수 있어요.',
  u: '모달 바텀 시트는 뒤를 어둡게 덮고 선택을 마치면 닫혀요. 지도처럼 뒤 화면과 함께 써야 하면 덮지 않는 표준(standard) 바텀 시트를 쓰세요. 아래로 끌기와 뒤로 가기로 모두 닫혀야 해요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>리포트</b></span><span class="im" style="height:7em"></span><span class="ln" style="width:80%"></span></div><span class="dm"></span><div class="bs2"><i class="gr2"></i><span><i></i>PDF로 저장</span><span><i></i>링크 복사</span><span><i></i>코치에게 보내기</span><span><i></i>삭제</span></div></div>` });
add({ id: 'an-prog', k: '진행 표시기', e: 'Progress indicators',
  d: '끝을 아는 작업은 막대가 차오르는 선형 표시, 끝을 모르는 작업은 도는 원형 표시를 써요. 머티리얼 3 익스프레시브에서는 물결 모양 표시도 생겼어요.',
  u: '0.5초 안에 끝나는 작업에는 표시를 띄우지 마세요. 오히려 깜빡임처럼 보여요. 오래 걸리면 확정형(진행률)으로 바꾸고, 페이지 전체 로딩보다 바뀌는 영역에만 표시하세요.',
  html: `<div class="pan box"><div class="row6"><em>Linear · 확정형</em><div class="lin"><b></b><i></i></div></div><div class="row6"><em>Circular · 불확정형 / Wavy · 익스프레시브</em><div class="rw5"><span class="cir"></span><span class="wv2"><svg viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0 10 Q12.5 2 25 10 T50 10 T75 10 T100 10 T125 10 T150 10 T175 10 T200 10"/></svg></span></div></div></div>` });
add({ id: 'an-badge', k: '뱃지', e: 'Badge',
  d: '내비게이션 아이콘 위에 작은 점(새 소식 있음)이나 숫자(개수)를 붙여 알려줘요.',
  u: '숫자는 최대 4자리, 999를 넘으면 999+로 줄여요. 개수가 중요하지 않으면 작은 점 뱃지로 충분해요. 확인하면 바로 사라지게 하고, 스크린 리더에는 "읽지 않은 알림 3개"처럼 뜻을 읽어 주세요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b style="font-size:1.2em">홈</b></span><span class="m3card"><span class="ln" style="width:70%"></span><span class="ln" style="width:50%"></span></span></div><div class="m3n"><span class="on"><i></i>홈</span><span><i></i>연습<b class="bd2 dt3"></b></span><span><i></i>알림<b class="bd2">3</b></span><span><i></i>MY</span></div></div>` });
add({ id: 'an-ripple', k: '리플', e: 'Ripple · State layer',
  d: '누른 지점에서 물결이 퍼져 나가며 눌렸다는 걸 알려주는 머티리얼의 대표적인 터치 반응이에요. 마우스를 올리거나 포커스를 받으면 옅은 색 막(state layer)이 덮여요.',
  u: '누를 수 있는 모든 요소에 같은 반응을 주세요. 리플은 요소 모양 안에서만 퍼져야 하고, 색은 그 위 글자색을 옅게 쓴 것이에요. 직접 만든 커스텀 버튼에서 빠지기 쉬우니 확인하세요.',
  html: `<div class="ls9 box"><span class="it2"><span class="av"></span><span class="ln"></span><i class="rip" style="--x:30%;--y:50%;--d:0s"></i></span><span class="it2"><span class="av"></span><span class="ln"></span><i class="rip" style="--x:72%;--y:40%;--d:1.3s"></i></span><span class="it2"><span class="av"></span><span class="ln"></span><i class="rip" style="--x:50%;--y:60%;--d:2.6s"></i></span><span class="tap" style="left:30%;top:16%;--d:0s"></span><span class="tap" style="left:72%;top:47%;--d:1.3s"></span><span class="tap" style="left:50%;top:83%;--d:2.6s"></span></div>` });
add({ id: 'an-noti', k: '알림과 알림 채널', e: 'Notifications · Channels',
  d: '화면 위에서 끌어내린 알림창에 앱 알림이 쌓이고, 펼치면 답장·읽음 같은 동작 버튼이 나와요. 앱은 알림을 채널(종류)별로 나눠 보내요.',
  u: '안드로이드 8부터는 알림을 채널로 나눠야 하고, 사용자는 채널별로 끄거나 소리를 바꿀 수 있어요. "면접 알림", "마케팅"처럼 의미 있게 나누면 사용자가 전부 꺼 버리는 일을 막을 수 있어요. 안드로이드 13부터 알림 자체가 권한이 됐어요.',
  html: `<div class="ph"><div class="scr" style="background:var(--ui)"><span class="m3t"><b>홈</b></span><span class="im" style="height:7em"></span></div><div class="shd"><div class="qs"><span class="on"><i></i>Wi-Fi</span><span><i></i>방해 금지</span><span class="on"><i></i>블루투스</span><span><i></i>손전등</span></div><div class="nf"><b>면접연습 · 지금</b><span>내일 오전 10시 모의면접이 예약돼 있어요</span><div class="act2"><span>질문 보기</span><span>미루기</span></div></div><div class="nf"><b>메시지 · 5분 전</b><em>민준: 자료 보냈어!</em></div></div></div>` });
add({ id: 'an-perm', k: '권한 요청', e: 'Runtime permissions',
  d: '위치·카메라·알림처럼 민감한 기능은 앱이 쓰는 순간 시스템 대화상자로 사용자에게 허락을 받아요. 위치는 "앱 사용 중에만", "이번만" 같은 선택지가 있어요.',
  u: '권한이 왜 필요한지 먼저 앱 화면에서 설명한 뒤 시스템 창을 띄우세요. 거절해도 앱의 나머지 기능은 쓸 수 있어야 해요. 두 번 거절하면 시스템이 더 이상 묻지 않으니, 그다음에는 설정 화면으로 안내해야 해요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>면접장 찾기</b></span><span class="im" style="height:9em"></span></div><span class="dm"></span><div class="pd"><i></i><b>면접연습에서 기기 위치에 액세스하도록 허용할까요?</b><span class="k">앱 사용 중에만 허용</span><span>이번만 허용</span><span class="n5">허용 안함</span></div></div>` });
add({ id: 'an-share', k: '공유 시트', e: 'Sharesheet',
  d: '공유를 누르면 아래에서 올라오는 시스템 화면이에요. 위에는 보낼 내용 미리보기와 복사 버튼, 그 아래에 자주 보내는 사람과 앱이 나와요.',
  u: '직접 공유 화면을 만들기보다 시스템 공유 시트(Intent.createChooser)를 쓰세요. 보낼 내용의 제목과 미리보기 이미지를 함께 넘기면 받는 쪽에서도 알아보기 쉬워요. 공유 아이콘은 세 점이 선으로 이어진 모양이 안드로이드 표준이에요.',
  html: `<div class="ph"><div class="scr"><span class="m3t"><b>리포트</b></span><span class="im" style="height:7em"></span></div><span class="dm"></span><div class="ss2"><i class="gr2"></i><div class="pv3"><i></i>11월 8일 면접 리포트<b>복사</b></div><div class="rw6"><span><i></i>지원</span><span><i style="background:var(--warn-soft)"></i>민준</span><span><i></i>서연</span><span><i style="background:var(--warn-soft)"></i>팀방</span></div><div class="rw6"><span><i style="background:#FEE500;border-radius:1em"></i>카톡</span><span><i style="background:#EA4335;border-radius:1em"></i>Gmail</span><span><i style="background:#1A73E8;border-radius:1em"></i>Drive</span><span><i style="background:var(--line);border-radius:1em"></i>더보기</span></div></div></div>` });

/* assemble the Android page */
const pool = {}; let poolCss = '';
(window.UX || []).forEach(s => { poolCss += s.css || ''; s.items.forEach(i => { pool[i.id] = i; }); });
const P = (id, o) => Object.assign({}, pool[id], o || {});
const I = (id) => X.items[id];
window.UX = [
  { id: 'a-found', short: '머티리얼 3 기본', en: 'Foundations', title: '머티리얼 3의 기본', sub: '구글 머티리얼 디자인 3가 정한 색, 글자, 모양, 단위의 체계예요. 컴포넌트보다 먼저 이 토대를 맞춰야 화면이 일관돼요.', css: poolCss + X.css, items: [I('an-dyn'), I('an-type'), I('an-shape'), I('an-e2e'), I('an-unit'), I('an-expr')] },
  { id: 'a-nav', short: '내비게이션', en: 'Navigation', title: '화면 사이를 오가는 법', sub: '화면 크기와 목적지 수에 따라 내비게이션 바, 레일, 드로어를 고르고, 시스템 뒤로 가기와 자연스럽게 이어지게 해요.', items: [
    I('an-nbar'), I('an-tab'),
    P('n-rail', { u: '화면 너비가 600dp 이상(태블릿, 펼친 폴더블)이면 하단 내비게이션 바 대신 왼쪽 레일을 쓰는 게 머티리얼 권장이에요. 레일 위쪽에 FAB를 둘 수 있고, 목적지가 많으면 드로어로 펼쳐지게 하세요.' }),
    I('an-drawer'), I('an-back'), I('an-tabs')
  ] },
  { id: 'a-comp', short: '컴포넌트', en: 'Components', title: '자주 쓰는 컴포넌트', sub: '버튼, FAB, 칩, 스위치, 슬라이더, 날짜 선택처럼 머티리얼 3가 정의한 기본 부품이에요. Jetpack Compose의 Material3 라이브러리에 그대로 들어 있어요.', items: [I('an-btn'), I('an-fab'), I('an-chip'), I('an-sw'), I('an-slider'), I('an-date')] },
  { id: 'a-feed', short: '피드백', en: 'Feedback & dialogs', title: '알리고 반응하는 방법', sub: '대화상자, 스낵바, 바텀 시트처럼 사용자에게 말을 거는 방법과, 진행 표시·뱃지·리플처럼 상태를 보여주는 방법이에요.', items: [I('an-dlg'), I('an-snack'), I('an-sheet'), I('an-prog'), I('an-badge'), I('an-ripple')] },
  { id: 'a-sys', short: '시스템·큰 화면', en: 'System & large screens', title: '시스템과 큰 화면', sub: '알림, 권한, 위젯, 공유처럼 운영체제와 맞닿은 부분과, 폴더블·태블릿 같은 큰 화면 대응이에요.', items: [
    I('an-noti'), I('an-perm'),
    P('dv-widget', { u: '안드로이드 위젯은 사용자가 크기를 조절할 수 있어서, 작은 크기와 큰 크기에서 보여줄 정보를 나눠 설계하세요. 다이내믹 컬러를 따르게 하면 홈 화면과 잘 어울려요.' }),
    P('dv-fold', { u: '접었다 펼 때 앱이 다시 시작되지 않고 상태를 유지해야 해요. Jetpack WindowManager로 접힌 상태(반쯤 접힘, 펼침)와 경첩 위치를 알 수 있어서, 반쯤 접으면 위는 영상, 아래는 조작처럼 나눌 수 있어요.' }),
    P('dv-ld', { u: 'Compose의 ListDetailPaneScaffold 같은 적응형 레이아웃을 쓰면 화면 너비에 따라 한 칸·두 칸이 자동으로 바뀌어요. 너비 구간(compact 600dp 미만, medium, expanded 840dp 이상)을 기준으로 설계하세요.' }),
    I('an-share')
  ] }
];
})();
