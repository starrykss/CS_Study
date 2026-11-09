(window.UX = window.UX || []).push({
  id: 's-pair', short: '헷갈리는 짝꿍', en: 'Look-alikes',
  title: '닮았지만 쓰임이 다른 짝꿍',
  sub: '생김새는 비슷해도 언제 쓰는지가 달라요. 나란히 놓고 움직임으로 차이를 확인하세요.',
  css: `
.p-tgck .pan,.p-rdck .pan{width:10.8em;height:10.4em;padding:1.3em 1.2em;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1em}
.p-tgck .tg{animation:tgT 4s infinite}
.p-tgck .tg b{animation:tgK 4s cubic-bezier(.3,.7,.3,1) infinite}
.p-tgck .lm{display:flex;align-items:center;gap:.45em;font-family:var(--f-mono);font-size:.85em;color:var(--ink-3)}
.p-tgck .lm i{width:1.15em;height:1.15em;border-radius:50%;background:var(--line)}
.p-tgck .a i{animation:tgck-a 4s infinite}
.p-tgck .b i{animation:tgck-b 4s infinite}
.p-tgck .x{animation:xOn 4s infinite}
.p-tgck .bt{font-size:.9em;padding:.35em 1em;animation:press 4s infinite}
@keyframes tgck-a{0%,20%{background:var(--line);box-shadow:none}26%,84%{background:var(--warn);box-shadow:0 0 0 .4em var(--warn-soft)}90%,100%{background:var(--line);box-shadow:none}}
@keyframes tgck-b{0%,48%{background:var(--line);box-shadow:none}52%,84%{background:var(--warn);box-shadow:0 0 0 .4em var(--warn-soft)}90%,100%{background:var(--line);box-shadow:none}}

.p-rdck .pan{align-items:stretch}
.p-rdck .r{animation:rdck-r 4.5s infinite;--rm:-.5s}
.p-rdck .r2{animation-delay:1.5s;--rm:-2s}.p-rdck .r3{animation-delay:3s;--rm:-2s}
.p-rdck .x{animation:xOn 4.5s infinite}
.p-rdck .x2{animation-delay:.9s}.p-rdck .x3{animation-delay:1.8s}
@keyframes rdck-r{0%,30%{background:var(--accent);border-color:var(--accent)}33%,97%{background:transparent;border-color:var(--ink-3)}100%{background:var(--accent);border-color:var(--accent)}}

.p-mdsh .dm{animation:mdsh-d 4s infinite}
.p-mdsh .md{position:absolute;left:50%;top:50%;width:8em;padding:1em .9em .9em;display:flex;flex-direction:column;gap:.55em;border-radius:1em;animation:mdsh-m 4s cubic-bezier(.2,.9,.3,1.15) infinite}
.p-mdsh .md .rw{gap:.4em;margin-top:.35em}
.p-mdsh .md .bt{flex:1;font-size:.8em;padding:.4em 0;border-radius:.5em}
.p-mdsh .sh{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;gap:.75em;padding:.6em 1em 1.4em;background:var(--ui);border-radius:1.2em 1.2em 0 0;animation:mdsh-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.p-mdsh .hd{display:block;width:2.6em;height:.35em;border-radius:1em;background:var(--line);margin:0 auto .2em}
.p-mdsh .sh .av{width:1.5em;height:1.5em}
@keyframes mdsh-d{0%,18%{opacity:0}26%,80%{opacity:1}88%,100%{opacity:0}}
@keyframes mdsh-m{0%,18%{opacity:0;transform:translate(-50%,-50%) scale(.85)}26%,80%{opacity:1;transform:translate(-50%,-50%) scale(1)}86%,100%{opacity:0;transform:translate(-50%,-50%) scale(.96)}}
@keyframes mdsh-s{0%,18%{transform:translateY(105%)}28%,80%{transform:none}90%,100%{transform:translateY(105%)}}

.p-tssn .ts{position:absolute;left:50%;bottom:2.2em;background:var(--ink);color:var(--bg);font-size:.9em;font-weight:500;padding:.5em 1em;border-radius:2em;white-space:nowrap;animation:tssn-t 4s cubic-bezier(.2,.8,.2,1) infinite}
.p-tssn .sn{position:absolute;left:.6em;right:.6em;bottom:.9em;display:flex;justify-content:space-between;align-items:center;gap:.5em;background:var(--ink);color:var(--bg);font-size:.8em;padding:.7em .8em;border-radius:.6em;white-space:nowrap;animation:tssn-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.p-tssn .sn b{color:var(--inv-accent);font-weight:600}
.p-tssn .tap{left:77%;top:88%;animation-delay:-3.28s}
@keyframes tssn-t{0%,14%{opacity:0;transform:translate(-50%,.8em)}22%,58%{opacity:1;transform:translate(-50%,0)}68%,100%{opacity:0;transform:translate(-50%,0)}}
@keyframes tssn-s{0%,14%{transform:translateY(160%)}22%,72%{transform:none}80%,100%{transform:translateY(160%)}}

.p-ttpo .pan{width:11.5em;height:12.5em}
.p-ttpo .ib2{position:absolute;left:50%;top:64%;width:3em;height:3em;margin:-1.5em 0 0 -1.5em;border-radius:.8em;background:var(--stage);display:grid;place-items:center}
.p-ttpo .ib2 svg{width:1.6em;height:1.6em}
.p-ttpo .tt{position:absolute;left:50%;top:64%;background:var(--ink);color:var(--bg);font-size:.9em;font-weight:500;padding:.35em .75em;border-radius:.45em;white-space:nowrap;opacity:0;animation:ttpo-t 4s infinite}
.p-ttpo .tt::after{content:"";position:absolute;left:50%;bottom:-.3em;width:.6em;height:.6em;margin-left:-.3em;background:inherit;transform:rotate(45deg)}
.p-ttpo .cur{left:50%;top:64%;animation:ttpo-c 4s cubic-bezier(.4,0,.2,1) infinite}
.p-ttpo .fb{position:absolute;top:1.3em;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:.35em;font-size:.95em;font-weight:500;padding:.35em .9em;border:.12em solid var(--frame);border-radius:2em;white-space:nowrap}
.p-ttpo .fb::after{content:"";width:.45em;height:.45em;border:solid var(--ink-2);border-width:0 .14em .14em 0;transform:translateY(-.15em) rotate(45deg)}
.p-ttpo .po{position:absolute;top:4.1em;left:50%;width:8.6em;padding:.8em;display:flex;flex-direction:column;gap:.55em;font-size:.85em;transform-origin:50% 0;animation:ttpo-p 4s cubic-bezier(.2,.8,.2,1) infinite}
.p-ttpo .po .bt{font-size:.95em;padding:.35em 0}
.p-ttpo .t1{left:50%;top:19%;animation-delay:-.96s}
.p-ttpo .t2{left:50%;top:80%;animation-delay:-3.12s}
@keyframes ttpo-c{0%,6%{transform:translate(4em,3em)}26%,76%{transform:translate(.1em,.2em)}94%,100%{transform:translate(4em,3em)}}
@keyframes ttpo-t{0%,30%{opacity:0;transform:translate(-50%,-3.4em)}36%,74%{opacity:1;transform:translate(-50%,-3.8em)}80%,100%{opacity:0;transform:translate(-50%,-3.8em)}}
@keyframes ttpo-p{0%,24%{opacity:0;transform:translate(-50%,-.4em) scale(.94)}30%,74%{opacity:1;transform:translate(-50%,0) scale(1)}80%,100%{opacity:0;transform:translate(-50%,-.4em) scale(.96)}}

.p-spsk .c{align-items:center;justify-content:center}
.p-spsk .rl{animation:spsk-r 4s infinite}
.p-spsk .rl .av{background:var(--accent)}
@keyframes spsk-r{0%,58%{opacity:0}66%,92%{opacity:1}98%,100%{opacity:0}}
`,
  items: [
    {
      id: 'p-tgck', k: '토글 vs 체크박스', e: 'Toggle vs Checkbox',
      d: '토글은 누르는 순간 바로 적용되고, 체크박스는 저장이나 다음 버튼을 눌러야 반영돼요.',
      u: '와이파이·알림처럼 켜고 끄는 설정은 토글, 약관 동의나 여러 항목 선택처럼 제출 단계가 있으면 체크박스를 쓰세요. 토글을 눌렀는데 저장 버튼까지 눌러야 한다면 사용자는 헷갈려요.',
      html: `<div class="two">
<div class="col"><div class="pan box"><span class="tg"><b></b></span><span class="lm a"><i></i>적용</span></div><span class="cap">토글</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="rw"><span class="x"></span><span class="ln" style="width:4em"></span></span><span class="bt">저장</span><span class="lm b"><i></i>적용</span></div><span class="cap">체크박스</span></div>
</div>`
    },
    {
      id: 'p-rdck', k: '라디오 vs 체크박스', e: 'Radio vs Checkbox',
      d: '라디오는 여러 개 중 하나만, 체크박스는 여러 개를 동시에 고를 수 있어요.',
      u: '배송 방법처럼 답이 하나뿐이면 라디오, 관심 분야처럼 여러 개 골라도 되면 체크박스. 라디오는 처음부터 하나가 선택된 상태로 두는 게 일반적이에요.',
      html: `<div class="two">
<div class="col"><div class="pan box"><span class="rw"><span class="r"></span><span class="ln" style="width:5em"></span></span><span class="rw"><span class="r r2"></span><span class="ln" style="width:4em"></span></span><span class="rw"><span class="r r3"></span><span class="ln" style="width:5.4em"></span></span></div><span class="cap">라디오 · 하나만</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="rw"><span class="x"></span><span class="ln" style="width:5em"></span></span><span class="rw"><span class="x x2"></span><span class="ln" style="width:4em"></span></span><span class="rw"><span class="x x3"></span><span class="ln" style="width:5.4em"></span></span></div><span class="cap">체크박스 · 여럿</span></div>
</div>`
    },
    {
      id: 'p-mdsh', k: '모달 vs 바텀시트', e: 'Modal vs Bottom sheet',
      d: '모달은 화면 가운데서 흐름을 멈추고 답을 요구하고, 바텀시트는 아래에서 올라와 지금 화면을 유지한 채 선택지를 보여줘요.',
      u: '삭제 확인처럼 꼭 답해야 하는 결정은 모달, 공유·정렬·옵션 선택처럼 가볍고 엄지로 누르기 쉬워야 하면 바텀시트가 맞아요.',
      html: `<div class="two">
<div class="col"><div class="ph s"><div class="scr"><span class="ln h" style="width:60%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><span class="dm"></span><div class="md box"><span class="ln h" style="width:70%"></span><span class="ln" style="width:100%"></span><span class="rw"><span class="bt g">취소</span><span class="bt">삭제</span></span></div></div><span class="cap">모달</span></div>
<span class="vs">vs</span>
<div class="col"><div class="ph s"><div class="scr"><span class="ln h" style="width:60%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><span class="dm"></span><div class="sh"><i class="hd"></i><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div></div><span class="cap">바텀시트</span></div>
</div>`
    },
    {
      id: 'p-tssn', k: '토스트 vs 스낵바', e: 'Toast vs Snackbar',
      d: '토스트는 짧게 알리고 사라지는 메시지, 스낵바는 되돌리기 같은 행동 버튼이 하나 붙어 있어요.',
      u: '"복사했어요"처럼 확인만 하면 되면 토스트, "삭제했어요 · 되돌리기"처럼 되돌릴 기회를 줘야 하면 스낵바. 둘 다 몇 초 뒤 사라지니 꼭 읽어야 하는 오류에는 쓰지 마세요.',
      html: `<div class="two">
<div class="col"><div class="ph s"><div class="scr"><span class="ln h" style="width:55%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span></div><span class="ts">복사했어요</span></div><span class="cap">토스트</span></div>
<span class="vs">vs</span>
<div class="col"><div class="ph s"><div class="scr"><span class="ln h" style="width:55%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span></div><div class="sn"><span>삭제했어요</span><b>되돌리기</b></div><span class="tap"></span></div><span class="cap">스낵바</span></div>
</div>`
    },
    {
      id: 'p-ttpo', k: '툴팁 vs 팝오버', e: 'Tooltip vs Popover',
      d: '툴팁은 마우스를 올리면 뜨는 한 줄 설명이고, 팝오버는 눌러야 열리며 버튼이나 입력 같은 조작할 내용을 담아요.',
      u: '아이콘 버튼의 이름은 툴팁, 필터·간단한 설정·미리보기처럼 손을 대야 하는 내용은 팝오버. 모바일에는 마우스 올리기가 없으니 툴팁에 꼭 필요한 정보를 숨기지 마세요.',
      html: `<div class="two">
<div class="col"><div class="pan box"><span class="ib2"><svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg></span><span class="tt">삭제</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div><span class="cap">툴팁 · 올리면</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="fb">필터</span><div class="po box"><span class="rw"><span class="x on"></span><span class="ln" style="width:4em"></span></span><span class="rw"><span class="x"></span><span class="ln" style="width:3em"></span></span><span class="bt">적용</span></div><span class="tap t1"></span><span class="tap t2"></span></div><span class="cap">팝오버 · 누르면</span></div>
</div>`
    },
    {
      id: 'p-spsk', k: '스피너 vs 스켈레톤', e: 'Spinner vs Skeleton',
      d: '스피너는 기다리는 중이라는 것만 알려주고, 스켈레톤은 곧 나타날 화면의 뼈대를 먼저 보여줘요.',
      u: '모양을 미리 알 수 있는 목록·카드 로딩은 스켈레톤이 더 빠르게 느껴져요. 결제 처리처럼 결과 모양을 모르는 짧은 작업에는 스피너가 낫습니다.',
      html: `<div class="two">
<div class="col"><div class="ph s"><div class="scr c"><span class="spn"></span></div><div class="scr rl"><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:80%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span></div></div><span class="cap">스피너</span></div>
<span class="vs">vs</span>
<div class="col"><div class="ph s"><div class="scr"><span class="im sk"></span><span class="ln sk" style="width:70%"></span><span class="ln sk" style="width:95%"></span><span class="ln sk" style="width:80%"></span><span class="rw"><span class="av sk"></span><span class="ln sk" style="width:50%"></span></span></div><div class="scr rl"><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:80%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span></div></div><span class="cap">스켈레톤</span></div>
</div>`
    }
  ]
});
