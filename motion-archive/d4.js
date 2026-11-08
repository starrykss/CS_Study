(window.UX = window.UX || []).push({
  id: 's-trans', short: '화면 전환', en: 'Transitions',
  title: '화면이 넘어가는 방식',
  sub: '전환은 어디서 와서 어디로 가는지 알려주는 길 안내예요. 방향과 속도가 곧 정보예요.',
  css: `
.x-push .trk{position:absolute;top:0;left:0;height:100%;width:200%;display:flex;animation:push-k 4s cubic-bezier(.3,.7,.2,1) infinite}
.x-push .trk .scr{position:relative;inset:auto;width:50%;flex:none}
.x-push .row2,.x-stag .row2,.n-swp .row2{display:flex;flex-direction:column;gap:.35em;flex:1}
.x-push .bk{font-size:1.8em;line-height:.8;color:var(--ink-2);margin:-.2em 0 0 -.05em}
.x-push .im{height:7em}
.x-push .t1{left:50%;top:35%;animation-delay:-1.12s}
.x-push .t2{left:14%;top:10%;animation-delay:-3.2s}
@keyframes push-k{0%,22%{transform:none}32%,70%{transform:translateX(-50%)}80%,100%{transform:none}}

.x-modal .ph{background:var(--frame)}
.x-modal .a{transform-origin:50% 0;animation:mod-a 4s cubic-bezier(.3,.7,.2,1) infinite}
.x-modal .a .bt{margin-top:auto;font-size:.95em}
.x-modal .b{top:2.2em;border-radius:1.2em 1.2em 0 0;padding-top:1em;box-shadow:0 -.3em 1em -.4em rgba(0,0,0,.25);transform:translateY(102%);animation:mod-b 4s cubic-bezier(.3,.7,.2,1) infinite}
.x-modal .hdr{display:flex;justify-content:space-between;align-items:center;font-size:.85em;font-weight:600}
.x-modal .hdr span{color:var(--ink-2);font-weight:400}
.x-modal .hdr b{color:var(--accent)}
.x-modal .t1{left:50%;top:89%;animation-delay:-1.28s}
.x-modal .t2{left:18%;top:17%;animation-delay:-3.04s}
@keyframes mod-a{0%,18%{transform:none;border-radius:0}28%,76%{transform:translateY(1em) scale(.9);border-radius:1.2em}86%,100%{transform:none;border-radius:0}}
@keyframes mod-b{0%,18%{transform:translateY(102%)}28%,76%{transform:none}86%,100%{transform:translateY(102%)}}

.x-fade .scr{bottom:3.3em}
.x-fade .a{animation:fade-a 4s infinite}
.x-fade .b{display:grid;grid-template-columns:1fr 1fr;align-content:start;opacity:0;animation:fade-b 4s cubic-bezier(.2,.8,.2,1) infinite}
.x-fade .b .ln{grid-column:1/-1}
.x-fade .b .im{height:3.8em}
.x-fade .tb{position:absolute;left:0;right:0;bottom:0;height:3.3em;display:flex;justify-content:space-around;align-items:center;border-top:.1em solid var(--rule);background:var(--ui)}
.x-fade .tb i{width:1.3em;height:1.3em;border-radius:.35em;background:var(--line)}
.x-fade .ind{position:absolute;left:12.5%;bottom:.45em;width:1.4em;height:.28em;margin-left:-.7em;border-radius:1em;background:var(--accent);animation:fade-i 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes fade-a{0%,20%{opacity:1;transform:none}27%{opacity:0;transform:none}28%,80%{opacity:0;transform:scale(.92)}90%,100%{opacity:1;transform:none}}
@keyframes fade-b{0%,27%{opacity:0;transform:scale(.92)}38%,72%{opacity:1;transform:none}79%,100%{opacity:0;transform:none}}
@keyframes fade-i{0%,20%{transform:none}27%,74%{transform:translateX(2.875em)}81%,100%{transform:none}}

.x-cont .cd{display:flex;flex-direction:column;gap:.5em;padding:.6em;border-radius:1em;box-shadow:none}
.x-cont .cd .im{height:3.6em}
.x-cont .ex{position:absolute;display:flex;flex-direction:column;gap:.6em;padding:.6em;background:var(--ui);border:.12em solid var(--frame);overflow:hidden;opacity:0;animation:cont-k 4s cubic-bezier(.3,.7,.2,1) infinite}
.x-cont .ex .im{height:auto;flex:0 0 58%}
.x-cont .tap{left:50%;top:32%;animation-delay:-1.2s}
@keyframes cont-k{
  0%,19%{top:3.55em;left:1em;right:1em;bottom:10.5em;border-radius:1em;opacity:0}
  20%{top:3.55em;left:1em;right:1em;bottom:10.5em;border-radius:1em;opacity:1}
  34%,72%{top:0;left:0;right:0;bottom:0;border-radius:0;opacity:1}
  86%{top:3.55em;left:1em;right:1em;bottom:10.5em;border-radius:1em;opacity:1}
  87%,100%{top:3.55em;left:1em;right:1em;bottom:10.5em;border-radius:1em;opacity:0}}

.x-tab .tabs{position:relative;display:grid;grid-template-columns:repeat(3,1fr);border-bottom:.1em solid var(--rule);margin:0 -1em;padding:0 1em}
.x-tab .tabs b{text-align:center;font-size:.9em;font-weight:600;padding:.2em 0 .5em;color:var(--ink-2)}
.x-tab .ul{position:absolute;bottom:-.1em;left:1em;width:calc((100% - 2em) / 3);height:.22em;border-radius:1em;background:var(--accent);animation:tab-u 6s cubic-bezier(.4,0,.2,1) infinite}
.x-tab .win{flex:1;overflow:hidden;margin:0 -1em}
.x-tab .tr3{display:flex;width:300%;height:100%;animation:tab-t 6s cubic-bezier(.4,0,.2,1) infinite}
.x-tab .pn{width:33.3333%;padding:.2em 1em;display:flex;flex-direction:column;gap:.7em}
.x-tab .pn.g{display:grid;grid-template-columns:1fr 1fr;align-content:start}
.x-tab .pn.g .im{height:3.8em}
.x-tab .row2{display:flex;flex-direction:column;gap:.35em;flex:1}
@keyframes tab-u{0%,24%{transform:none}30%,57%{transform:translateX(100%)}63%,90%{transform:translateX(200%)}96%,100%{transform:none}}
@keyframes tab-t{0%,24%{transform:none}30%,57%{transform:translateX(-33.3333%)}63%,90%{transform:translateX(-66.6667%)}96%,100%{transform:none}}

.x-stag .rw{animation:sg-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .1s)}
.x-stag .scr{gap:1em}
@keyframes sg-k{0%,8%{opacity:0;transform:translateY(1em)}22%,84%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}
`,
  items: [
    {
      id: 'x-push', k: '푸시', e: 'Push',
      d: '새 화면이 옆에서 밀고 들어오고, 뒤로 가면 반대 방향으로 빠져요.',
      u: '목록에서 상세로 한 단계 깊이 들어갈 때의 기본 전환이에요. 방향이 곧 앞뒤 관계라서, 뒤로 가기인데 오른쪽에서 들어오는 식으로 바꾸면 길을 잃어요.',
      html: `<div class="ph"><div class="trk"><div class="scr"><span class="ln h" style="width:45%"></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:60%"></span><span class="ln" style="width:40%"></span></span></span></div><div class="scr"><span class="bk">‹</span><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div></div><span class="tap t1"></span><span class="tap t2"></span></div>`
    },
    {
      id: 'x-modal', k: '모달 등장', e: 'Modal presentation',
      d: '새 화면이 아래에서 올라와 덮고, 뒤 화면은 살짝 작아지며 물러나요.',
      u: '글쓰기나 결제처럼 하던 흐름과 별개인 작업을 잠깐 열 때 써요. 뒤 화면이 살짝 보이기 때문에 닫으면 원래 자리로 돌아간다는 걸 자연스럽게 알 수 있어요.',
      html: `<div class="ph"><div class="scr a"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="ln" style="width:80%"></span><span class="bt">글쓰기</span></div><div class="scr b"><div class="hdr"><span>취소</span>새 글<b>게시</b></div><span class="ln" style="width:85%"></span><span class="ln" style="width:65%"></span><span class="ln" style="width:75%"></span></div><span class="tap t1"></span><span class="tap t2"></span></div>`
    },
    {
      id: 'x-fade', k: '페이드 스루', e: 'Fade through',
      d: '이전 화면이 먼저 사라진 뒤 새 화면이 살짝 커지며 나타나요. 두 화면 사이에 위아래 관계가 없을 때 써요.',
      u: '하단 탭을 바꿀 때처럼 화면끼리 깊이나 방향의 연결이 없을 때 맞아요. 미끄러지는 전환을 쓰면 "안으로 들어갔다"는 잘못된 공간감을 줄 수 있어요.',
      html: `<div class="ph"><div class="scr a"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="im" style="height:3em"></span></div><div class="scr b"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="im"></span><span class="im"></span><span class="im"></span></div><div class="tb"><i></i><i></i><i></i><i></i><span class="ind"></span></div></div>`
    },
    {
      id: 'x-cont', k: '카드 확장', e: 'Container transform',
      d: '누른 카드가 그대로 커져서 상세 화면이 돼요. 무엇을 열었는지 시선이 끊기지 않아요.',
      u: '카드 목록에서 상세, 썸네일에서 전체 보기처럼 시작과 끝이 같은 대상일 때 써요. 닫을 때는 원래 카드 자리로 줄어들어야 위치를 잃지 않아요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:45%"></span><div class="cd box"><span class="im"></span><span class="ln" style="width:70%"></span></div><div class="cd box"><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:55%"></span></div></div><div class="ex"><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span></div><span class="tap"></span></div>`
    },
    {
      id: 'x-tab', k: '탭 전환', e: 'Tab switch',
      d: '밑줄 표시가 미끄러지고, 내용도 같은 방향으로 옆 칸으로 넘어가요.',
      u: '같은 높이의 콘텐츠를 오갈 때 써요. 밑줄과 내용이 같은 방향으로 움직여야 옆 칸으로 갔다는 공간감이 생기고, 손가락으로 옆으로 밀어서 넘길 수도 있게 하면 좋아요.',
      html: `<div class="ph"><div class="scr"><div class="tabs"><b>추천</b><b>인기</b><b>신규</b><i class="ul"></i></div><div class="win"><div class="tr3"><div class="pn"><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><div class="pn"><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:40%"></span></span></span><span class="rw"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></span></div><div class="pn g"><span class="im"></span><span class="im"></span><span class="im"></span><span class="im"></span></div></div></div></div></div>`
    },
    {
      id: 'x-stag', k: '순차 등장', e: 'Staggered list',
      d: '목록 항목이 위에서부터 조금씩 시간차를 두고 나타나요.',
      u: '화면 진입이나 검색 결과처럼 여러 항목이 한꺼번에 뜰 때 써요. 항목 사이 간격은 30~60ms, 처음 5~8개까지만 적용하고 나머지는 바로 보여주세요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:45%;animation:none"></span><span class="rw" style="--i:0"><span class="av"></span><span class="row2"><span class="ln" style="width:80%"></span><span class="ln" style="width:50%"></span></span></span><span class="rw" style="--i:1"><span class="av"></span><span class="row2"><span class="ln" style="width:70%"></span><span class="ln" style="width:45%"></span></span></span><span class="rw" style="--i:2"><span class="av"></span><span class="row2"><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></span></span><span class="rw" style="--i:3"><span class="av"></span><span class="row2"><span class="ln" style="width:60%"></span><span class="ln" style="width:40%"></span></span></span><span class="rw" style="--i:4"><span class="av"></span><span class="row2"><span class="ln" style="width:75%"></span><span class="ln" style="width:50%"></span></span></span></div></div>`
    }
  ]
});
