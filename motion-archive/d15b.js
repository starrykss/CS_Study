(() => {
const s = window.UX.find(x => x.id === 's-state');
s.css += `
.i-drag .ls{position:relative;width:18em;height:14.4em}
.i-drag .it{position:absolute;left:0;right:0;height:3em;display:flex;align-items:center;gap:.7em;padding:0 .9em;border-radius:.7em;background:var(--ui);border:.1em solid var(--rule);font-size:.95em}
.i-drag .it b{margin-left:auto;display:flex;flex-direction:column;gap:.2em}
.i-drag .it b::before,.i-drag .it b::after{content:"";width:1em;height:.14em;background:var(--ink-3);border-radius:.1em}
.i-drag .a{top:0}.i-drag .b{top:3.8em;z-index:2;animation:drg-b 4s cubic-bezier(.4,0,.2,1) infinite}.i-drag .c{top:7.6em;animation:drg-u 4s cubic-bezier(.4,0,.2,1) infinite}.i-drag .d{top:11.4em;animation:drg-u 4s .12s cubic-bezier(.4,0,.2,1) infinite backwards}
@keyframes drg-b{0%,14%{transform:none;box-shadow:none}20%{transform:scale(1.04);box-shadow:0 .8em 1.6em -.6em rgba(0,0,0,.35)}50%,64%{transform:translateY(7.6em) scale(1.04);box-shadow:0 .8em 1.6em -.6em rgba(0,0,0,.35)}70%,90%{transform:translateY(7.6em);box-shadow:none}100%{transform:none}}
@keyframes drg-u{0%,26%{transform:none}42%,90%{transform:translateY(-3.8em)}100%{transform:none}}

.i-sticky .vw{position:relative;width:12em;height:20em;border-radius:1.6em;overflow:hidden;border:.14em solid var(--frame);background:var(--ui)}
.i-sticky .ct{position:absolute;left:0;right:0;top:0;padding:0 1em;display:flex;flex-direction:column;gap:.6em;animation:stk-s 5s linear infinite}
.i-sticky .hd{flex:none;height:2em;margin:0 -1em;padding:0 1em;display:flex;align-items:center;font-size:.8em;font-weight:700;background:var(--stage)}
.i-sticky .pin{position:absolute;left:0;right:0;top:0;z-index:2;height:2em;padding:0 1em;display:flex;align-items:center;font-size:.8em;font-weight:700;background:var(--stage);box-shadow:0 .3em .6em -.4em rgba(0,0,0,.3);display:grid;align-items:center}
.i-sticky .pin span{grid-area:1/1;opacity:0}
.i-sticky .p1{animation:stk-1 5s steps(1) infinite}.i-sticky .p2{animation:stk-2 5s steps(1) infinite}
@keyframes stk-s{to{transform:translateY(-16em)}}
@keyframes stk-1{0%{opacity:1}76%{opacity:0}}
@keyframes stk-2{0%{opacity:0}76%{opacity:1}}

.i-dism .ph{background:var(--frame)}
.i-dism .sh{position:absolute;left:0;right:0;top:2.6em;bottom:0;padding:.7em 1em;display:flex;flex-direction:column;gap:.7em;background:var(--ui);border-radius:1.4em 1.4em 0 0;animation:dsm-k 4s cubic-bezier(.3,.7,.2,1) infinite}
.i-dism .hd{display:block;width:2.6em;height:.35em;border-radius:1em;background:var(--line);margin:0 auto .3em}
.i-dism .dr{left:50%;top:22%;animation:dsm-f 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes dsm-k{0%,10%{transform:translateY(102%)}22%,32%{transform:none}52%{transform:translateY(40%)}64%,88%{transform:translateY(102%)}100%{transform:translateY(102%)}}
@keyframes dsm-f{0%,30%{opacity:0;transform:none}34%{opacity:.28;transform:none}52%{opacity:.28;transform:translateY(7em)}56%,100%{opacity:0;transform:translateY(7em)}}

.i-over .mv{animation:ovr-i 3s cubic-bezier(.3,.7,.2,1) infinite}
.i-over .and .mv{transform-origin:50% 0;animation-name:ovr-a}
.i-over .dr{left:50%;top:28%;animation:ovr-f 3s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes ovr-i{0%,14%{transform:none}40%{transform:translateY(3em);animation-timing-function:cubic-bezier(.3,1.5,.5,1)}60%,100%{transform:none}}
@keyframes ovr-a{0%,14%{transform:none}40%{transform:scaleY(1.12)}56%,100%{transform:none}}
@keyframes ovr-f{0%,10%{opacity:0;transform:none}14%{opacity:.28;transform:none}40%{opacity:.28;transform:translateY(3em)}44%,100%{opacity:0;transform:translateY(3em)}}

.i-thumb .ph{background:var(--ui)}
.i-thumb .zn{position:absolute;border-radius:50%;opacity:0;animation:thm-z 4s infinite backwards}
.i-thumb .z1{left:-60%;top:-10%;width:220%;height:150%;background:color-mix(in srgb,var(--danger) 22%,transparent);animation-delay:.4s}
.i-thumb .z2{left:-30%;top:32%;width:170%;height:110%;background:color-mix(in srgb,var(--warn) 30%,transparent);animation-delay:.2s}
.i-thumb .z3{left:-5%;top:58%;width:120%;height:70%;background:color-mix(in srgb,var(--accent) 35%,transparent)}
.i-thumb .lb{position:absolute;font-family:var(--f-mono);font-size:.7em;font-weight:500;color:var(--ink);z-index:2;opacity:0;animation:thm-z 4s .6s infinite backwards}
.i-thumb .tap{left:55%;top:84%;animation-delay:-.8s}
@keyframes thm-z{0%{opacity:0}14%,88%{opacity:1}100%{opacity:0}}

.i-press .ls{display:flex;flex-direction:column;gap:.5em;width:10.4em}
.i-press .it{display:flex;align-items:center;gap:.5em;padding:.6em;border-radius:.7em;background:var(--ui);border:.1em solid var(--rule)}
.i-press .it .ln{flex:1}
.i-press .on .it.p{animation:prs-k 2s infinite}
.i-press .tap{left:50%;top:50%;animation-duration:2s}
.i-press .ar{position:relative}
@keyframes prs-k{0%,40%,70%,100%{transform:none;background:var(--ui)}46%,62%{transform:scale(.96);background:var(--stage)}}
`;
s.items.push(
  {
    id: 'i-drag', k: '드래그 앤 드롭', e: 'Drag and drop',
    d: '항목을 길게 누르거나 손잡이를 잡고 끌어서 순서를 바꾸거나 다른 곳으로 옮기는 동작이에요.',
    u: '잡은 항목은 살짝 커지고 그림자가 생겨 떠오른 느낌을 줘야 하고, 다른 항목은 비켜나며 들어갈 자리를 보여줘야 해요. 손잡이(≡) 아이콘으로 끌 수 있다는 걸 알리고, 키보드 사용자를 위한 "위로/아래로 이동" 버튼도 함께 두세요.',
    html: `<div class="ls"><span class="it a"><span class="av"></span><span class="ln" style="width:5em"></span><b></b></span><span class="it b"><span class="av" style="background:var(--accent)"></span><span class="ln" style="width:6em"></span><b></b></span><span class="it c"><span class="av"></span><span class="ln" style="width:4em"></span><b></b></span><span class="it d"><span class="av"></span><span class="ln" style="width:5.5em"></span><b></b></span></div>`
  },
  {
    id: 'i-sticky', k: '스티키 헤더', e: 'Sticky header',
    d: '스크롤해도 섹션 제목이 화면 위에 붙어 있다가, 다음 섹션 제목이 올라오면 자리를 넘겨줘요. 지금 어디쯤인지 계속 알 수 있어요.',
    u: '연락처의 ㄱ·ㄴ·ㄷ, 날짜별 거래 내역처럼 긴 목록을 묶음으로 나눌 때 좋아요. 고정되는 영역이 너무 두꺼우면 작은 화면에서 볼 공간이 줄어드니 한 줄로 얇게 만드세요.',
    html: `<div class="vw"><div class="ct"><span class="hd">11월 8일</span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span><span class="hd">11월 7일</span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:65%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span></div><div class="pin"><span class="p1">11월 8일</span><span class="p2">11월 7일</span></div></div>`
  },
  {
    id: 'i-dism', k: '끌어서 닫기', e: 'Swipe to dismiss',
    d: '위로 올라온 시트나 전체 화면 사진을 아래로 끌어내리면 닫혀요. 일정 거리를 넘기면 닫히고, 덜 끌면 제자리로 돌아가요.',
    u: '시트 위쪽의 손잡이 막대가 끌 수 있다는 신호예요. 시트 안에 스크롤 목록이 있으면 목록이 맨 위일 때만 시트가 끌려야 해요. 입력 중인 내용이 있으면 닫기 전에 저장할지 물어보세요.',
    html: `<div class="ph"><div class="sh"><i class="hd"></i><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div><span class="tap dr"></span></div>`
  },
  {
    id: 'i-over', k: '오버스크롤', e: 'Overscroll · Bounce vs Stretch',
    d: '목록 끝에서 더 당기면 iOS는 고무줄처럼 늘어났다 튕겨 돌아오고, 안드로이드는 화면이 살짝 늘어나는 효과로 끝에 닿았다고 알려줘요.',
    u: '"더 이상 내용이 없어요"를 말없이 알려주는 피드백이에요. 웹뷰나 크로스 플랫폼 앱에서 이 효과가 빠지면 화면이 딱딱하게 느껴져요. 당겨서 새로고침과 같은 제스처라서 함께 설계해야 해요.',
    html: `<div class="two">
<div class="col"><div class="ph s"><div class="scr mv"><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><span class="tap dr"></span></div><span class="cap">iOS · 튕김</span></div>
<span class="vs">vs</span>
<div class="col and"><div class="ph s"><div class="scr mv"><span class="ln h" style="width:50%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><span class="tap dr"></span></div><span class="cap">Android · 늘어남</span></div>
</div>`
  },
  {
    id: 'i-thumb', k: '엄지 영역', e: 'Thumb zone',
    d: '한 손으로 폰을 쥐었을 때 엄지가 편하게 닿는 곳은 화면 아래 가운데예요. 위쪽 모서리는 손을 고쳐 잡아야 닿아요.',
    u: '자주 누르는 버튼, 주요 행동, 탭 바는 아래쪽 초록 영역에 두세요. 삭제처럼 실수로 누르면 안 되는 버튼은 일부러 닿기 어려운 곳에 둘 수 있어요. 화면이 커질수록 위쪽 메뉴는 점점 불편해져요.',
    html: `<div class="ph"><span class="zn z1"></span><span class="zn z2"></span><span class="zn z3"></span><span class="lb" style="left:8%;top:10%">어려움</span><span class="lb" style="left:8%;top:44%">보통</span><span class="lb" style="left:36%;top:72%">편함</span><span class="tap"></span></div>`
  },
  {
    id: 'i-press', k: '눌림 피드백', e: 'Press feedback',
    d: '손가락이 닿는 순간 버튼이나 항목이 살짝 작아지거나 어두워져서, 눌렸다는 걸 바로 알려줘요.',
    u: '반응이 0.1초 안에 와야 "눌렸다"고 느껴요. 실제 처리는 그 뒤에 해도 괜찮아요. 눌림 표시가 없으면 사람들은 반응이 없다고 생각하고 다시 눌러요. 안드로이드는 물결(ripple), iOS는 어두워지거나 작아지는 방식이 흔해요.',
    html: `<div class="two">
<div class="col"><div class="ls ar"><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it p"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="tap"></span></div><span class="cap">반응 없음</span></div>
<span class="vs">vs</span>
<div class="col on"><div class="ls ar"><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it p"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="tap"></span></div><span class="cap">눌림 표시</span></div>
</div>`
  }
);
})();
