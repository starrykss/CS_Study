(window.UX = window.UX || []).push({
  id: 's-feedback', short: '알려주는 방법', en: 'Feedback',
  title: '시스템이 말을 거는 방법',
  sub: '같은 메시지라도 얼마나 급하고 중요한지에 따라 담는 그릇이 달라져요.',
  css: `
.f-bnr .bn{position:absolute;top:1.7em;left:.7em;right:.7em;z-index:2;display:flex;align-items:center;gap:.5em;padding:.6em .7em;border-radius:.6em;background:var(--warn-soft);border:.1em solid var(--warn);font-size:.82em;font-weight:500;white-space:nowrap;animation:bnr-b 4s cubic-bezier(.2,.8,.2,1) infinite}
.f-bnr .bn i{width:.9em;height:.9em;border-radius:50%;background:var(--warn);flex:none}
.f-bnr .bn span{flex:1}
.f-bnr .bn b{color:var(--ink-2);font-weight:400;font-size:1.2em;line-height:1}
.f-bnr .mv{animation:bnr-c 4s cubic-bezier(.2,.8,.2,1) infinite}
.f-bnr .tap{left:85%;top:14.5%;animation-delay:-2.88s}
@keyframes bnr-b{0%,12%{transform:translateY(-5em)}20%,78%{transform:none}86%,100%{transform:translateY(-5em)}}
@keyframes bnr-c{0%,12%{transform:none}20%,78%{transform:translateY(3em)}86%,100%{transform:none}}

.f-inl .pan{width:19em;padding:1.6em;display:flex;flex-direction:column;gap:.55em}
.f-inl .lb{font-size:.95em;font-weight:600;color:var(--ink-2)}
.f-inl .in{display:flex;align-items:center;height:3em;padding:0 .9em;border:.15em solid var(--frame);border-radius:.7em;font-family:var(--f-mono);font-size:1.1em;animation:inl-b 4s infinite,inl-s 4s infinite}
.f-inl .tx{display:inline-block;overflow:hidden;white-space:nowrap;max-width:0;animation:inl-t 4s steps(10,end) infinite}
.f-inl .er{display:flex;align-items:center;gap:.4em;color:var(--danger);font-size:.95em;font-weight:500;opacity:0;animation:inl-e 4s infinite}
.f-inl .er i{width:1.2em;height:1.2em;border-radius:50%;background:var(--danger);color:var(--danger-ink);font-style:normal;font-size:.85em;display:grid;place-items:center;font-weight:700}
@keyframes inl-t{0%,4%{max-width:0}30%,92%{max-width:6.6em}100%{max-width:0}}
@keyframes inl-b{0%,36%{border-color:var(--frame)}38%,88%{border-color:var(--danger)}94%,100%{border-color:var(--frame)}}
@keyframes inl-s{0%,38%{transform:none}40%{transform:translateX(-.5em)}42%{transform:translateX(.45em)}44%{transform:translateX(-.3em)}46%{transform:translateX(.15em)}48%,100%{transform:none}}
@keyframes inl-e{0%,38%{opacity:0;transform:translateY(-.3em)}44%,88%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}

.f-bdg .two{gap:3.4em}
.f-bdg .bi{width:5.6em;height:5.6em;display:grid;place-items:center}
.f-bdg .bi svg{width:2.8em;height:2.8em}
.f-bdg .bd{position:absolute;top:-.6em;right:-.6em;min-width:2em;height:2em;border-radius:1em;background:var(--danger);color:var(--danger-ink);font-size:1em;font-weight:700;border:.18em solid var(--stage);animation:bdg-p 4s infinite}
.f-bdg .bd span{position:absolute;inset:0;display:grid;place-items:center;line-height:1}
.f-bdg .s1{animation:bdg-1 4s steps(1) infinite}.f-bdg .s2{animation:bdg-2 4s steps(1) infinite}
.f-bdg .dt{min-width:0;width:1.3em;height:1.3em;top:-.35em;right:-.35em}
@keyframes bdg-p{0%,14%{transform:scale(0)}20%{transform:scale(1.2)}24%,48%{transform:scale(1)}52%{transform:scale(1.25)}56%,76%{transform:scale(1)}82%,100%{transform:scale(0)}}
@keyframes bdg-1{0%{opacity:1}50%{opacity:0}}
@keyframes bdg-2{0%{opacity:0}50%{opacity:1}}

.f-coach .row2{display:flex;flex-direction:column;gap:.35em;flex:1}
.f-coach .fab{position:absolute;right:1em;bottom:1.2em;width:3em;height:3em;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font-size:1.6em;line-height:1;font-weight:400;width:1.9em;height:1.9em}
.f-coach .sp{position:absolute;right:.45em;bottom:.65em;width:4.1em;height:4.1em;border-radius:50%;box-shadow:0 0 0 40em var(--dim);border:.15em solid rgba(255,255,255,.75);animation:coach-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.f-coach .bb{position:absolute;right:.7em;bottom:6em;width:8.8em;padding:.8em;display:flex;flex-direction:column;gap:.6em;animation:coach-b 4s cubic-bezier(.2,.8,.2,1) infinite}
.f-coach .bb::after{content:"";position:absolute;right:1.7em;bottom:-.42em;width:.8em;height:.8em;background:var(--ui);transform:rotate(45deg);border:solid var(--frame);border-width:0 .12em .12em 0}
.f-coach .bb .t{font-size:.92em;font-weight:600;line-height:1.35}
.f-coach .bb .rw{justify-content:space-between}
.f-coach .k{font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
.f-coach .bb .bt{font-size:.8em;padding:.3em .8em}
.f-coach .tap{left:74%;top:63%;animation-delay:-3.04s}
@keyframes coach-s{0%,14%{opacity:0;transform:scale(1.6)}24%,80%{opacity:1;transform:scale(1)}88%,100%{opacity:0;transform:scale(1)}}
@keyframes coach-b{0%,24%{opacity:0;transform:translateY(.6em)}32%,80%{opacity:1;transform:none}88%,100%{opacity:0;transform:none}}

.f-emp .es{display:flex;flex-direction:column;align-items:center;gap:.7em;margin-top:2em;animation:emp-e 4s infinite}
.f-emp .il{position:relative;width:5em;height:5em;border-radius:50%;background:var(--stage)}
.f-emp .il i{position:absolute;left:1.5em;top:1.1em;width:2em;height:2.6em;border-radius:.3em;background:var(--ui);border:.12em solid var(--frame);transform:rotate(-8deg);animation:emp-f 2s ease-in-out infinite alternate}
.f-emp .il i::before,.f-emp .il i::after{content:"";position:absolute;left:.35em;right:.35em;height:.22em;border-radius:.2em;background:var(--line);top:.6em}
.f-emp .il i::after{top:1.1em;right:.7em}
.f-emp .t{font-size:1em;font-weight:600}
.f-emp .es .bt{font-size:.9em;animation:press 4s infinite;animation-delay:-3.76s}
.f-emp .nw{position:absolute;top:4.3em;left:1em;right:1em;display:flex;flex-direction:column;gap:.5em;padding:.8em;opacity:0;animation:emp-n 4s cubic-bezier(.2,.8,.2,1) infinite}
.f-emp .tap{left:50%;top:76%;animation-delay:-3.76s}
@keyframes emp-e{0%,56%{opacity:1;transform:none}62%,94%{opacity:0;transform:scale(.96)}100%{opacity:1;transform:none}}
@keyframes emp-n{0%,60%{opacity:0;transform:translateY(-.6em)}68%,94%{opacity:1;transform:none}100%{opacity:0;transform:none}}
@keyframes emp-f{to{transform:rotate(-2deg) translateY(-.35em)}}

@property --pg{syntax:'<integer>';inherits:false;initial-value:0}
.f-prg .pan{width:20em;padding:1.5em;display:flex;flex-direction:column;gap:1em}
.f-prg .fi{width:2.6em;height:3.1em;border-radius:.4em;background:var(--accent-soft);position:relative;flex:none}
.f-prg .fi::after{content:"";position:absolute;left:.75em;top:1em;border:solid transparent;border-width:.55em 0 .55em .9em;border-left-color:var(--accent)}
.f-prg .mt{display:flex;flex-direction:column;gap:.15em;flex:1;min-width:0}
.f-prg .nm{font-size:1em;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.f-prg .pc{font-family:var(--f-mono);font-size:.9em;color:var(--ink-2);font-variant-numeric:tabular-nums}
.f-prg .pc b{font-weight:500;animation:prg-n 4s cubic-bezier(.4,0,.3,1) infinite;counter-reset:pg var(--pg)}
.f-prg .pc b::after{content:counter(pg)}
.f-prg .ok{width:1.9em;height:1.9em;border-radius:50%;background:var(--accent);color:var(--accent-ink);flex:none;position:relative;opacity:0;animation:prg-o 4s infinite}
.f-prg .ok::after{content:"";position:absolute;left:.66em;top:.38em;width:.45em;height:.85em;border:solid currentColor;border-width:0 .2em .2em 0;transform:rotate(45deg)}
.f-prg .br{height:.8em;border-radius:1em;background:var(--line);overflow:hidden}
.f-prg .br i{display:block;height:100%;width:0;border-radius:1em;background:var(--accent);animation:prg-w 4s cubic-bezier(.4,0,.3,1) infinite}
.f-prg .stp{display:flex;justify-content:space-between;font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
@keyframes prg-n{0%,8%{--pg:0}70%,92%{--pg:100}100%{--pg:0}}
@keyframes prg-w{0%,8%{width:0}70%,92%{width:100%}100%{width:0}}
@keyframes prg-o{0%,70%{opacity:0;transform:scale(.4)}76%,92%{opacity:1;transform:none}100%{opacity:0}}
`,
  items: [
    {
      id: 'f-bnr', k: '배너', e: 'Banner',
      d: '화면 위쪽에 자리 잡고, 사용자가 닫거나 문제가 풀릴 때까지 남아 있는 알림이에요.',
      u: '오프라인 상태, 결제 수단 만료, 점검 예정처럼 화면 전체에 영향을 주고 계속 알고 있어야 하는 정보에 쓰세요. 배너가 콘텐츠를 가리지 않고 밀어내야 놓친 내용이 없어요.',
      html: `<div class="ph"><div class="scr mv"><span class="ln h" style="width:55%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><div class="bn"><i></i><span>오프라인 상태예요</span><b>×</b></div><span class="tap"></span></div>`
    },
    {
      id: 'f-inl', k: '인라인 오류', e: 'Inline error',
      d: '문제가 생긴 입력란 바로 아래에 무엇이 틀렸는지와 고치는 방법을 보여줘요.',
      u: '폼 검증의 기본이에요. 제출 후 한꺼번에 알리기보다 입력을 마친 순간 알려주고, "형식이 올바르지 않아요"보다 "@를 넣어 주세요"처럼 고칠 방법을 쓰세요. 빨간색만으로 구분하지 말고 아이콘과 문구를 함께 두세요.',
      html: `<div class="pan box"><span class="lb">이메일</span><div class="in"><span class="tx">hello.mail</span><i class="ca"></i></div><span class="er"><i>!</i>@를 넣어 주세요</span></div>`
    },
    {
      id: 'f-bdg', k: '뱃지', e: 'Badge',
      d: '아이콘 모서리에 붙어 새 소식이나 개수를 알려주는 작은 표시예요.',
      u: '확인하지 않은 알림 수처럼 쌓이는 것에 쓰세요. 99를 넘으면 99+로 줄이고, 개수가 중요하지 않으면 숫자 없이 점 하나로 충분해요. 확인하면 바로 사라져야 다음 알림이 눈에 띄어요.',
      html: `<div class="two">
<div class="col"><div class="bi box"><svg class="ic" viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/></svg><b class="bd"><span class="s1">1</span><span class="s2">3</span></b></div><span class="cap">숫자</span></div>
<div class="col"><div class="bi box"><svg class="ic" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg><b class="bd dt"></b></div><span class="cap">점</span></div>
</div>`
    },
    {
      id: 'f-coach', k: '코치마크', e: 'Coach mark',
      d: '처음 쓰는 사람에게 화면 위로 반투명 막을 깔고, 특정 기능 하나를 짚어서 설명해요.',
      u: '새 기능 출시나 첫 실행 때 1~3개만 쓰세요. 단계가 길어지면 대부분 건너뛰니 몇 번째인지와 건너뛰기를 항상 보여주고, 다시 볼 수 있는 곳도 마련해 두세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:55%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:65%"></span><span class="ln" style="width:40%"></span></span></span></div><span class="fab">+</span><span class="sp"></span><div class="bb box"><span class="t">여기를 눌러 새 글을 써요</span><span class="rw"><span class="k">1 / 3</span><span class="bt">다음</span></span></div><span class="tap"></span></div>`
    },
    {
      id: 'f-emp', k: '빈 상태', e: 'Empty state',
      d: '보여줄 내용이 없을 때, 왜 비었는지와 지금 할 수 있는 첫 행동을 알려주는 화면이에요.',
      u: '"데이터 없음"으로 끝내지 말고 이유와 첫 행동 버튼(첫 메모 쓰기 등)을 함께 두세요. 검색 결과가 없을 때는 검색어를 바꿔 보라는 제안이나 비슷한 결과를 보여주세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:40%"></span><div class="es"><span class="il"><i></i></span><span class="t">아직 메모가 없어요</span><span class="ln" style="width:7em"></span><span class="bt">첫 메모 쓰기</span></div></div><div class="nw box"><span class="ln h" style="width:60%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><span class="tap"></span></div>`
    },
    {
      id: 'f-prg', k: '진행 표시', e: 'Progress indicator',
      d: '작업이 얼마나 남았는지 보여줘서 기다림을 견딜 만하게 만들어요.',
      u: '끝을 아는 작업(업로드, 단계형 폼)은 막대나 %처럼 남은 양이 보이는 방식을, 끝을 모르는 작업은 스피너처럼 계속 도는 방식을 쓰세요. 단계형 폼에서는 "2/4단계"를 함께 보여주면 중간에 그만두는 사람이 줄어요.',
      html: `<div class="pan box"><div class="rw"><span class="fi"></span><div class="mt"><span class="nm">면접연습_03.mp4</span><span class="pc">업로드 <b></b>%</span></div><span class="ok"></span></div><div class="br"><i></i></div><div class="stp"><span>48 MB</span><span>Wi-Fi</span></div></div>`
    }
  ]
});
