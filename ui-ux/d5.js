(window.UX = window.UX || []).push({
  id: 's-pattern', short: '화면 패턴', en: 'Patterns',
  title: '매일 보는 화면 패턴',
  sub: '이름을 알면 회의가 짧아져요. 앱에서 매일 만지는 구조들이에요.',
  css: `
.n-tabbar .row2,.n-fab .row2,.n-ptr .row2,.n-swp .row2,.n-menu .row2{display:flex;flex-direction:column;gap:.35em;flex:1}
.n-tabbar .tb{position:absolute;left:0;right:0;bottom:0;height:3.6em;display:grid;grid-template-columns:repeat(4,1fr);place-items:center;border-top:.1em solid var(--rule);background:var(--ui)}
.n-tabbar .tb svg{position:relative;width:1.5em;height:1.5em}
.n-tabbar .pl{position:absolute;left:12.5%;top:.65em;width:2.6em;height:2.2em;margin-left:-1.3em;border-radius:1.1em;background:var(--accent-soft);animation:tb-p 4.5s cubic-bezier(.4,0,.2,1) infinite}
.n-tabbar .tap{top:92%;animation-duration:4.5s}
.n-tabbar .t1{left:62.5%;animation-delay:-1.24s}
.n-tabbar .t2{left:87.5%;animation-delay:-.04s}
.n-tabbar .t3{left:12.5%;animation-delay:-3.2s}
@keyframes tb-p{0%,18%{transform:none}24%,44%{transform:translateX(5.6em)}50%,74%{transform:translateX(8.4em)}80%,100%{transform:none}}

.n-menu .hdr{display:flex;align-items:center;justify-content:space-between;height:1.4em}
.n-menu .hb{display:flex;flex-direction:column;gap:.25em;width:1.3em}
.n-menu .hb i{height:.18em;border-radius:.1em;background:var(--ink)}
.n-menu .kb{display:flex;flex-direction:column;gap:.2em;align-items:center;width:1.3em}
.n-menu .kb i{width:.26em;height:.26em;border-radius:50%;background:var(--ink)}
.n-menu .dm{animation:men-d 4s infinite}
.n-menu .dr{position:absolute;left:0;top:0;bottom:0;width:72%;padding:2em 1em;display:flex;flex-direction:column;gap:.9em;background:var(--ui);border-right:.1em solid var(--rule);animation:men-r 4s cubic-bezier(.2,.8,.2,1) infinite}
.n-menu .dr .av{width:2.4em;height:2.4em;background:var(--accent-soft)}
.n-menu .mn{position:absolute;top:3.4em;right:.6em;width:5.4em;padding:.35em;display:flex;flex-direction:column;font-size:.85em;border-radius:.7em;transform-origin:100% 0;animation:men-m 4s cubic-bezier(.2,.8,.2,1) infinite}
.n-menu .mn span{padding:.35em .55em;border-radius:.4em}
.n-menu .mn .del{color:var(--danger)}
.n-menu .tap{top:15%;animation-delay:-1.2s}
.n-menu .tl{left:16%}.n-menu .tr{left:84%}
@keyframes men-d{0%,20%{opacity:0}28%,76%{opacity:1}84%,100%{opacity:0}}
@keyframes men-r{0%,20%{transform:translateX(-102%)}30%,76%{transform:none}86%,100%{transform:translateX(-102%)}}
@keyframes men-m{0%,20%{opacity:0;transform:scale(.6)}27%,76%{opacity:1;transform:none}82%,100%{opacity:0;transform:scale(.9)}}

.n-fab .dm{animation:fab-d 4s infinite}
.n-fab .fab{position:absolute;right:1em;bottom:1.2em;width:3.2em;height:3.2em;border-radius:50%;background:var(--accent);display:grid;place-items:center;box-shadow:0 .4em 1em -.4em rgba(0,0,0,.4);z-index:2}
.n-fab .fab b{position:relative;width:1.3em;height:1.3em;animation:fab-r 4s cubic-bezier(.3,.7,.2,1.2) infinite}
.n-fab .fab b::before,.n-fab .fab b::after{content:"";position:absolute;left:50%;top:50%;width:1.3em;height:.2em;margin:-.1em 0 0 -.65em;border-radius:.1em;background:var(--accent-ink)}
.n-fab .fab b::after{transform:rotate(90deg)}
.n-fab .sd{position:absolute;right:1.3em;bottom:5em;display:flex;flex-direction:column;align-items:flex-end;gap:.6em;z-index:2}
.n-fab .mi{display:flex;align-items:center;gap:.5em;animation:fab-m 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .06s)}
.n-fab .mi em{font-style:normal;font-size:.8em;font-weight:500;background:var(--ui);padding:.25em .6em;border-radius:.4em}
.n-fab .mi i{width:2.6em;height:2.6em;border-radius:50%;background:var(--ui);display:grid;place-items:center}
.n-fab .mi i::after{content:"";width:1em;height:1em;border-radius:.3em;background:var(--accent-soft);border:.15em solid var(--accent)}
.n-fab .tap{left:77%;top:86%}
.n-fab .t1{animation-delay:-1.12s}.n-fab .t2{animation-delay:-2.88s}
@keyframes fab-d{0%,20%{opacity:0}28%,76%{opacity:1}84%,100%{opacity:0}}
@keyframes fab-r{0%,20%{transform:none}28%,76%{transform:rotate(135deg)}84%,100%{transform:none}}
@keyframes fab-m{0%,20%{opacity:0;transform:translateY(1em) scale(.6)}30%,74%{opacity:1;transform:none}82%,100%{opacity:0;transform:translateY(1em) scale(.6)}}

.n-ptr .ld{position:absolute;top:2.2em;left:50%;margin-left:-1.3em;animation:ptr-l 4s infinite}
.n-ptr .mv{animation:ptr-c 4s cubic-bezier(.3,.7,.2,1) infinite}
.n-ptr .nw{border-radius:.6em;background:var(--accent-soft);padding:0 .5em;margin:0 -.5em;max-height:0;opacity:0;overflow:hidden;margin-bottom:-.7em;animation:ptr-n 4s cubic-bezier(.2,.8,.2,1) infinite}
.n-ptr .dr{left:50%;top:30%;animation:ptr-f 4s infinite}
@keyframes ptr-c{0%,10%{transform:none}30%{transform:translateY(4.8em)}36%,58%{transform:translateY(3.6em)}66%,100%{transform:none}}
@keyframes ptr-l{0%,12%{opacity:0;transform:scale(.4) rotate(0)}30%,58%{opacity:1;transform:scale(1) rotate(200deg)}64%,100%{opacity:0;transform:scale(.6) rotate(260deg)}}
@keyframes ptr-n{0%,62%{max-height:0;opacity:0;margin-bottom:-.7em;padding-block:0}70%,92%{max-height:3em;opacity:1;margin-bottom:0;padding-block:.5em}100%{max-height:0;opacity:0;margin-bottom:-.7em;padding-block:0}}
@keyframes ptr-f{0%,6%{opacity:0;transform:none}10%{opacity:.28;transform:none}30%{opacity:.28;transform:translateY(4.8em)}34%,100%{opacity:0;transform:translateY(4.8em)}}

.n-swp .it{position:relative;height:3.3em;flex:none;border-radius:.6em;overflow:hidden}
.n-swp .del{position:absolute;inset:0;display:flex;justify-content:flex-end;align-items:center;padding-right:.9em;background:var(--danger);color:var(--danger-ink);font-size:.85em;font-weight:600}
.n-swp .fr{position:absolute;inset:0;display:flex;align-items:center;gap:.6em;padding:0 .2em;background:var(--ui)}
.n-swp .sw .fr{animation:swp-k 4s cubic-bezier(.3,.7,.2,1) infinite}
.n-swp .dr{left:72%;top:42%;animation:swp-f 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes swp-k{0%,16%{transform:none}34%,70%{transform:translateX(-4.2em)}82%,100%{transform:none}}
@keyframes swp-f{0%,12%{opacity:0;transform:none}16%{opacity:.28;transform:none}34%{opacity:.28;transform:translateX(-4.2em)}38%,100%{opacity:0;transform:translateX(-4.2em)}}

.n-flt .pan{width:19em;padding:1.6em;display:flex;flex-direction:column;gap:1em}
.n-flt .fl{position:relative;height:3.7em;padding:0 .9em .5em;display:flex;align-items:flex-end;border:.15em solid var(--frame);border-radius:.7em}
.n-flt .lb{position:absolute;left:.9em;top:50%;transform:translateY(-50%);font-size:1.1em;color:var(--ink-3);white-space:nowrap}
.n-flt .f1{animation:flt-b 4s infinite}
.n-flt .f1 .lb{animation:flt-l 4s cubic-bezier(.3,.7,.2,1) infinite}
.n-flt .tx{display:inline-block;max-width:0;overflow:hidden;white-space:nowrap;font-family:var(--f-mono);font-size:1.05em;animation:flt-t 4s steps(11,end) infinite}
.n-flt .f1 .ca{animation:blink 1s steps(1) infinite,flt-c 4s steps(1) infinite}
.n-flt .cap{align-self:flex-start;margin-top:-.4em}
@keyframes flt-b{0%,16%{border-color:var(--frame)}22%,86%{border-color:var(--accent)}94%,100%{border-color:var(--frame)}}
@keyframes flt-l{0%,16%{top:50%;transform:translateY(-50%);font-size:1.1em;color:var(--ink-3)}24%,86%{top:.35em;transform:none;font-size:.8em;color:var(--accent)}94%,100%{top:50%;transform:translateY(-50%);font-size:1.1em;color:var(--ink-3)}}
@keyframes flt-t{0%,26%{max-width:0}56%,86%{max-width:6.6em}94%,100%{max-width:0}}
@keyframes flt-c{0%{visibility:hidden}18%{visibility:visible}88%{visibility:hidden}}
`,
  items: [
    {
      id: 'n-tabbar', k: '탭 바', e: 'Tab bar',
      d: '화면 아래에 3~5개의 주요 메뉴를 고정해 두고, 어디서든 한 번에 이동하게 해요.',
      u: '앱의 최상위 메뉴가 3~5개일 때 써요. 6개를 넘으면 "더보기"로 묶거나 구조를 다시 보세요. 지금 위치는 색 하나보다 배경·굵기·채운 아이콘처럼 모양으로도 같이 표시하세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:40%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="im" style="height:3em"></span></div><div class="tb"><span class="pl"></span><svg class="ic" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/></svg><svg class="ic" viewBox="0 0 24 24"><path d="M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16.5 16.5L21 21"/></svg><svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><svg class="ic" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 21c1-4 4-6 8-6s7 2 8 6"/></svg></div><span class="tap t1"></span><span class="tap t2"></span><span class="tap t3"></span></div>`
    },
    {
      id: 'n-menu', k: '햄버거 vs 케밥', e: 'Hamburger vs Kebab',
      d: '≡ 햄버거는 앱 전체 메뉴를 서랍처럼 열고, ⋮ 케밥은 지금 보고 있는 대상의 추가 동작을 모아요.',
      u: '햄버거는 앱 전체를 오가는 내비게이션, 케밥은 수정·공유·삭제 같은 그 자리의 메뉴예요. 둘을 바꿔 쓰면 사람들이 엉뚱한 곳에서 기능을 찾아요. 가로 점 세 개(…)는 미트볼이라고 불러요.',
      html: `<div class="two">
<div class="col"><div class="ph s"><div class="scr"><div class="hdr"><span class="hb"><i></i><i></i><i></i></span><span class="ln h" style="width:45%"></span><span style="width:1.3em"></span></div><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><span class="dm"></span><div class="dr"><span class="av"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span><span class="ln" style="width:75%"></span></div><span class="tap tl"></span></div><span class="cap">햄버거 · 전체 메뉴</span></div>
<span class="vs">vs</span>
<div class="col"><div class="ph s"><div class="scr"><div class="hdr"><span style="width:1.3em"></span><span class="ln h" style="width:45%"></span><span class="kb"><i></i><i></i><i></i></span></div><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><div class="mn box"><span>수정</span><span>공유</span><span class="del">삭제</span></div><span class="tap tr"></span></div><span class="cap">케밥 · 이 항목 메뉴</span></div>
</div>`
    },
    {
      id: 'n-fab', k: '플로팅 버튼', e: 'FAB · Floating action button',
      d: '화면 위에 떠 있는 둥근 버튼으로, 그 화면에서 가장 중요한 행동 하나를 담아요.',
      u: '"새 글 쓰기"처럼 화면마다 핵심 행동이 하나일 때만 써요. 누르면 2~3개의 하위 행동으로 펼쳐지는 방식은 스피드 다이얼이라고 해요. 목록 마지막 항목을 가리지 않게 아래 여백을 두세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:45%"></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:60%"></span><span class="ln" style="width:40%"></span></span></span></div><span class="dm"></span><div class="sd"><span class="mi" style="--i:2"><em>사진</em><i></i></span><span class="mi" style="--i:1"><em>음성</em><i></i></span><span class="mi" style="--i:0"><em>글</em><i></i></span></div><span class="fab"><b></b></span><span class="tap t1"></span><span class="tap t2"></span></div>`
    },
    {
      id: 'n-ptr', k: '당겨서 새로고침', e: 'Pull to refresh',
      d: '목록 맨 위에서 아래로 끌어당기면 새 내용을 불러와요.',
      u: '피드, 메일함처럼 최신순 목록에 써요. 당기는 동안 표시가 함께 커져야 조금만 더 당기면 된다는 걸 알 수 있고, 새로 들어온 항목은 잠깐 강조해 주면 좋아요.',
      html: `<div class="ph"><div class="ld"><span class="spn" style="animation:none;border-color:var(--line);border-top-color:var(--accent)"></span></div><div class="scr mv"><span class="ln h" style="width:45%"></span><span class="rw nw"><span class="av" style="background:var(--accent)"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:65%"></span><span class="ln" style="width:40%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:60%"></span><span class="ln" style="width:45%"></span></span></span></div><span class="tap dr"></span></div>`
    },
    {
      id: 'n-swp', k: '스와이프 액션', e: 'Swipe actions',
      d: '목록 항목을 옆으로 밀면 숨어 있던 삭제·보관 버튼이 드러나요.',
      u: '메일, 알림처럼 항목을 빠르게 정리하는 목록에 써요. 눈에 보이지 않는 기능이라서 같은 동작을 길게 누르기나 케밥 메뉴에도 꼭 함께 두세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:40%"></span><div class="it"><div class="fr"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></div></div><div class="it sw"><div class="del">삭제</div><div class="fr"><span class="av"></span><span class="row2"><span class="ln" style="width:75%"></span><span class="ln" style="width:45%"></span></span></div></div><div class="it"><div class="fr"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></div></div><div class="it"><div class="fr"><span class="av"></span><span class="row2"><span class="ln" style="width:65%"></span><span class="ln" style="width:40%"></span></span></div></div></div><span class="tap dr"></span></div>`
    },
    {
      id: 'n-flt', k: '플로팅 라벨', e: 'Floating label',
      d: '입력란 안의 안내 문구가 입력을 시작하면 위로 올라가 라벨로 남아요.',
      u: '자리가 좁은 폼에서 라벨과 안내 문구(플레이스홀더)를 하나로 합칠 때 써요. 플레이스홀더만 쓰면 입력하는 순간 사라져서 무엇을 적던 칸인지 잊어버려요.',
      html: `<div class="pan box"><div class="fl f1"><span class="lb">이메일</span><span class="tx">hi@play.app</span><i class="ca"></i></div><div class="fl"><span class="lb">비밀번호</span></div><span class="cap">입력 중 / 빈 칸</span></div>`
    }
  ]
});
