(window.UX = window.UX || []).push({
  id: 's-form', short: '폼 설계', en: 'Forms',
  title: '입력은 짧게, 실수는 적게',
  sub: '폼은 사용자가 가장 많이 포기하는 화면이에요. 칸 하나, 단어 하나가 완료율을 바꿔요.',
  css: `
.sc .fd2{display:flex;flex-direction:column;gap:.3em}
.sc .fd2 .lb{font-size:.75em;font-weight:600;color:var(--ink-2)}
.sc .fd2 .in{height:2.4em;display:flex;align-items:center;padding:0 .7em;border:.14em solid var(--frame);border-radius:.6em;font-size:.9em;background:var(--ui)}

.fm-step .ph .scr{padding-top:1.6em}
.fm-step .ind{display:flex;align-items:center;gap:.3em;margin-bottom:.4em}
.fm-step .ind i{width:1.5em;height:1.5em;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:.7em;font-weight:700;background:var(--line);color:var(--ink-2)}
.fm-step .ind b{flex:1;height:.15em;background:var(--line);position:relative;overflow:hidden}
.fm-step .ind b::after{content:"";position:absolute;inset:0;background:var(--accent);transform-origin:left;transform:scaleX(0)}
.fm-step .ind .s1{background:var(--accent);color:var(--accent-ink)}
.fm-step .ind .s2{animation:stp-a 6s steps(1) infinite}.fm-step .ind .s3{animation:stp-b 6s steps(1) infinite}
.fm-step .ind .b1::after{animation:stp-l1 6s ease infinite}.fm-step .ind .b2::after{animation:stp-l2 6s ease infinite}
.fm-step .win{position:relative;flex:1;overflow:hidden;margin:0 -1em}
.fm-step .tr{display:flex;width:300%;height:100%;animation:stp-t 6s cubic-bezier(.4,0,.2,1) infinite}
.fm-step .pg{width:33.333%;padding:0 1em;display:flex;flex-direction:column;gap:.6em}
.fm-step .pg .h{font-size:.9em;font-weight:700}
.fm-step .bt{font-size:.85em;margin-top:auto}
@keyframes stp-a{0%{background:var(--line);color:var(--ink-2)}33.3%{background:var(--accent);color:var(--accent-ink)}96%{background:var(--line);color:var(--ink-2)}}
@keyframes stp-b{0%{background:var(--line);color:var(--ink-2)}66.6%{background:var(--accent);color:var(--accent-ink)}96%{background:var(--line);color:var(--ink-2)}}
@keyframes stp-l1{0%,28%{transform:scaleX(0)}33%,94%{transform:none}100%{transform:scaleX(0)}}
@keyframes stp-l2{0%,61%{transform:scaleX(0)}66%,94%{transform:none}100%{transform:scaleX(0)}}
@keyframes stp-t{0%,28%{transform:none}33%,61%{transform:translateX(-33.333%)}66%,94%{transform:translateX(-66.666%)}100%{transform:none}}

.fm-col .pan{position:relative;width:11.4em;height:13em;padding:1em;display:grid;gap:.5em;align-content:start}
.fm-col .c2{grid-template-columns:1fr 1fr}
.fm-col .fd2 .in{height:1.8em}
.fm-col svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.fm-col path{fill:none;stroke:var(--danger);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;animation:scan-k 4s cubic-bezier(.4,0,.2,1) infinite}
.fm-col .c1 path{stroke:var(--accent)}

.fm-req .pan{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.8em}
.fm-req .lb em{font-style:normal;font-weight:400;color:var(--ink-3);margin-left:.3em;padding:.05em .4em;border-radius:.3em;animation:req-h 4s infinite}
@keyframes req-h{0%,30%{background:transparent}40%,80%{background:var(--warn-soft);color:var(--ink)}90%,100%{background:transparent}}

@property --pwn{syntax:'<integer>';inherits:true;initial-value:0}
.fm-live .pan{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.7em;animation:liv-n 5s linear infinite}
.fm-live .in{font-family:var(--f-mono);letter-spacing:.1em}
.fm-live .in span{display:inline-block;max-width:calc(var(--pwn) * .72em);overflow:hidden;white-space:nowrap}
.fm-live .rl{display:flex;flex-direction:column;gap:.4em;font-size:.82em}
.fm-live .rl span{display:flex;align-items:center;gap:.5em;color:var(--ink-3)}
.fm-live .rl i{width:1.3em;height:1.3em;border-radius:50%;border:.14em solid var(--frame);position:relative;flex:none}
.fm-live .rl i::after{content:"";position:absolute;left:.36em;top:.14em;width:.3em;height:.6em;border:solid transparent;border-width:0 .16em .16em 0;transform:rotate(45deg)}
.fm-live .r1{animation:liv-1 5s steps(1) infinite}.fm-live .r1 i{animation:liv-i1 5s steps(1) infinite}
.fm-live .r2{animation:liv-2 5s steps(1) infinite}.fm-live .r2 i{animation:liv-i2 5s steps(1) infinite}
.fm-live .r3{animation:liv-3 5s steps(1) infinite}.fm-live .r3 i{animation:liv-i3 5s steps(1) infinite}
@keyframes liv-n{0%,6%{--pwn:0}60%,90%{--pwn:11}100%{--pwn:0}}
@keyframes liv-1{0%{color:var(--ink-3)}45%{color:var(--accent)}94%{color:var(--ink-3)}}
@keyframes liv-i1{0%{background:transparent;border-color:var(--frame)}45%{background:var(--accent);border-color:var(--accent)}94%{background:transparent;border-color:var(--frame)}}
@keyframes liv-2{0%{color:var(--ink-3)}55%{color:var(--accent)}94%{color:var(--ink-3)}}
@keyframes liv-i2{0%{background:transparent;border-color:var(--frame)}55%{background:var(--accent);border-color:var(--accent)}94%{background:transparent;border-color:var(--frame)}}
@keyframes liv-3{0%{color:var(--ink-3)}60%{color:var(--accent)}94%{color:var(--ink-3)}}
@keyframes liv-i3{0%{background:transparent;border-color:var(--frame)}60%{background:var(--accent);border-color:var(--accent)}94%{background:transparent;border-color:var(--frame)}}
.fm-live .rl span i::after{border-color:var(--accent-ink)}

.fm-pw .pan{width:19em;padding:1.4em;display:flex;flex-direction:column;gap:.5em}
.fm-pw .in{justify-content:space-between;font-family:var(--f-mono)}
.fm-pw .v{display:grid}.fm-pw .v span{grid-area:1/1}
.fm-pw .d{letter-spacing:.15em;animation:btln-1 4s steps(1) infinite;animation-delay:-.24s}
.fm-pw .t{opacity:0;animation:btln-2 4s steps(1) infinite;animation-delay:-.24s}
.fm-pw .ey{position:relative;width:1.6em;height:1em;border:.14em solid var(--ink-2);border-radius:75% 15%;transform:rotate(45deg) scale(.8)}
.fm-pw .ey::after{content:"";position:absolute;left:50%;top:50%;width:.35em;height:.35em;margin:-.175em;border-radius:50%;background:var(--ink-2)}
.fm-pw .tap{left:84%;top:58%;animation-delay:-.48s}

.fm-kbd .ph .scr{gap:.8em}
.fm-kbd .fd2 .in{height:2em;font-size:.8em}
.fm-kbd .f2 .in{animation:kbd-f 4s infinite}
.fm-kbd .kb{position:absolute;left:0;right:0;bottom:0;padding:.5em .4em 1em;display:grid;grid-template-columns:repeat(3,1fr);gap:.3em;background:var(--stage);animation:kbd-k 4s cubic-bezier(.2,.8,.2,1) infinite}
.fm-kbd .kb span{height:1.8em;border-radius:.35em;background:var(--ui);display:grid;place-items:center;font-size:.8em;font-weight:500;box-shadow:0 .08em 0 var(--frame)}
.fm-kbd .tap{left:50%;top:47%;animation-delay:-1.12s}
@keyframes kbd-k{0%,24%{transform:translateY(102%)}32%,86%{transform:none}94%,100%{transform:translateY(102%)}}
@keyframes kbd-f{0%,24%{border-color:var(--frame)}28%,86%{border-color:var(--accent)}94%,100%{border-color:var(--frame)}}
`,
  items: [
    {
      id: 'fm-step', k: '단계형 폼', e: 'Multi-step form · Stepper',
      d: '긴 폼을 몇 단계로 나누고 위에 지금 몇 번째인지 보여줘요. 한 번에 보는 칸이 적어서 부담이 줄어요.',
      u: '단계는 3~5개가 적당하고, 각 단계에 제목을 붙여 무엇을 하는지 알려주세요. 이전 단계로 돌아가도 입력한 내용이 남아 있어야 해요. 단계가 하나뿐인 짧은 폼을 억지로 쪼개면 오히려 길어져요.',
      html: `<div class="ph"><div class="scr"><div class="ind"><i class="s1">1</i><b class="b1"></b><i class="s2">2</i><b class="b2"></b><i class="s3">3</i></div><div class="win"><div class="tr"><div class="pg"><span class="h">기본 정보</span><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2"><span class="lb">이메일</span><span class="in"></span></div><span class="bt">다음</span></div><div class="pg"><span class="h">희망 직무</span><div class="fd2"><span class="lb">직무</span><span class="in"></span></div><div class="fd2"><span class="lb">경력</span><span class="in"></span></div><span class="bt">다음</span></div><div class="pg"><span class="h">확인</span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="ln" style="width:80%"></span><span class="bt">제출하기</span></div></div></div></div></div>`
    },
    {
      id: 'fm-col', k: '한 열 레이아웃', e: 'Single-column form',
      d: '입력란을 위에서 아래로 한 줄로 쌓으면 시선이 한 방향으로만 움직여서, 두 열로 배치할 때보다 빨리 끝내고 빠뜨리는 칸도 적어요.',
      u: '모바일은 당연히 한 열, 데스크톱도 한 열이 기본이에요. 시/군/구, 생년월일처럼 원래 붙어 있는 짧은 칸만 한 줄에 나란히 두세요. 라벨은 입력란 위에 두면 가장 빨리 읽혀요.',
      html: `<div class="two">
<div class="col"><div class="pan box c2"><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2"><span class="lb">성별</span><span class="in"></span></div><div class="fd2"><span class="lb">이메일</span><span class="in"></span></div><div class="fd2"><span class="lb">전화</span><span class="in"></span></div><div class="fd2"><span class="lb">주소</span><span class="in"></span></div><div class="fd2"><span class="lb">직무</span><span class="in"></span></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="100" d="M25 22 L72 22 L25 50 L72 50 L25 78 L72 78"/></svg></div><span class="cap">두 열 · 지그재그</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box c1"><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2"><span class="lb">이메일</span><span class="in"></span></div><div class="fd2"><span class="lb">전화번호</span><span class="in"></span></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="100" d="M50 18 L50 82"/></svg></div><span class="cap">한 열 · 아래로</span></div>
</div>`
    },
    {
      id: 'fm-req', k: '필수·선택 표시', e: 'Required vs Optional',
      d: '대부분의 칸이 필수라면 별표(*)를 여기저기 붙이기보다, 몇 안 되는 선택 항목에만 "(선택)"이라고 적는 편이 깔끔하고 확실해요.',
      u: '별표의 의미를 모르는 사람도 많아요. 필수와 선택 중 개수가 적은 쪽을 글자로 표시하세요. 그리고 꼭 필요하지 않은 칸은 표시하기 전에 폼에서 빼는 게 먼저예요.',
      html: `<div class="pan box"><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2"><span class="lb">휴대폰 번호</span><span class="in"></span></div><div class="fd2"><span class="lb">추천인 코드<em>선택</em></span><span class="in"></span></div></div>`
    },
    {
      id: 'fm-live', k: '실시간 검증', e: 'Inline validation · Password rules',
      d: '입력하는 동안 조건을 하나씩 충족할 때마다 체크 표시가 켜져서, 제출 전에 무엇이 부족한지 알 수 있어요.',
      u: '비밀번호 규칙은 입력 전에 미리 보여주고, 만족하면 바로 초록으로 바꿔 주세요. 반대로 이메일처럼 입력 중에는 아직 틀린 게 당연한 칸은 입력을 마쳤을 때 검사해야 짜증 나지 않아요.',
      html: `<div class="pan box"><div class="fd2"><span class="lb">새 비밀번호</span><span class="in"><span>Interview7!</span><i class="ca"></i></span></div><div class="rl"><span class="r2"><i></i>숫자 포함</span><span class="r1"><i></i>8자 이상</span><span class="r3"><i></i>특수문자 포함</span></div></div>`
    },
    {
      id: 'fm-pw', k: '비밀번호 보기', e: 'Show password',
      d: '눈 모양 버튼을 누르면 가려진 비밀번호를 글자로 보여줘서, 오타를 확인하고 고칠 수 있어요.',
      u: '보기 버튼이 있으면 "비밀번호 확인" 칸을 따로 둘 필요가 줄어요. 모바일은 오타가 잦아서 특히 중요해요. 버튼에는 "비밀번호 보기"라는 이름을 붙여 스크린 리더에서도 알 수 있게 하세요.',
      html: `<div class="pan box"><div class="fd2"><span class="lb">비밀번호</span><span class="in"><span class="v"><span class="d">••••••••••</span><span class="t">Interview7!</span></span><span class="ey"></span></span></div><span class="ln" style="width:50%"></span><span class="tap"></span></div>`
    },
    {
      id: 'fm-kbd', k: '키보드 종류', e: 'Input type · Keyboard',
      d: '전화번호 칸에는 숫자 키패드, 이메일 칸에는 @가 있는 키보드처럼 입력 내용에 맞는 키보드를 띄워요.',
      u: '웹은 type="tel", "email", inputmode="numeric", 앱은 keyboardType으로 지정해요. 이 작은 설정 하나로 입력 시간이 확 줄어요. 카드 번호·인증 번호도 숫자 키패드를 띄우세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2 f2"><span class="lb">휴대폰 번호</span><span class="in"></span></div></div><div class="kb"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>＊</span><span>0</span><span>⌫</span></div><span class="tap"></span></div>`
    }
  ]
});
