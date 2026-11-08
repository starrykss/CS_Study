(() => {
const s = window.UX.find(x => x.id === 's-pair');
s.css += `
.p-tbsg .pan,.p-stsl .pan,.p-btln .pan,.p-chbg .pan,.p-cdls .pan,.p-ddcb .pan{position:relative;width:11.2em;height:12.4em;padding:1.1em;display:flex;flex-direction:column;gap:.8em}
.p-tbsg .tb3{position:relative;display:grid;grid-template-columns:1fr 1fr;border-bottom:.1em solid var(--rule);font-size:.9em;font-weight:600;text-align:center}
.p-tbsg .tb3 b{padding-bottom:.4em}
.p-tbsg .ul{position:absolute;left:0;bottom:-.1em;width:50%;height:.2em;border-radius:1em;background:var(--accent);animation:tbsg-x 4s cubic-bezier(.4,0,.2,1) infinite}
.p-tbsg .vw{position:relative;flex:1}
.p-tbsg .vw>div{position:absolute;inset:0;display:flex;flex-direction:column;gap:.6em}
.p-tbsg .vw .im{height:3.6em}
.p-tbsg .v1{animation:tbsg-a 4s infinite}.p-tbsg .v2{opacity:0;animation:tbsg-b 4s infinite}
.p-tbsg .sg{position:relative;display:grid;grid-template-columns:1fr 1fr;padding:.2em;border-radius:.7em;background:var(--stage);font-size:.85em;font-weight:600;text-align:center}
.p-tbsg .sg b{position:relative;padding:.25em 0}
.p-tbsg .th{position:absolute;top:.2em;bottom:.2em;left:.2em;width:calc(50% - .2em);border-radius:.55em;background:var(--ui);box-shadow:0 .1em .3em rgba(0,0,0,.18);animation:tbsg-x 4s cubic-bezier(.4,0,.2,1) infinite}
.p-tbsg .bars{flex:1;display:flex;align-items:flex-end;gap:.4em}
.p-tbsg .bars span{flex:1;border-radius:.3em .3em 0 0;background:var(--accent);height:var(--a);animation:tbsg-h 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes tbsg-x{0%,26%{transform:none}34%,78%{transform:translateX(100%)}86%,100%{transform:none}}
@keyframes tbsg-a{0%,26%{opacity:1}32%,80%{opacity:0}86%,100%{opacity:1}}
@keyframes tbsg-b{0%,28%{opacity:0;transform:translateX(1em)}34%,78%{opacity:1;transform:none}84%,100%{opacity:0;transform:none}}
@keyframes tbsg-h{0%,26%{height:var(--a)}34%,78%{height:var(--b)}86%,100%{height:var(--a)}}

.p-stsl .pan{align-items:center;justify-content:center}
.p-stsl .sp{display:flex;align-items:center;gap:.7em}
.p-stsl .sp i{width:2.4em;height:2.4em;border-radius:50%;border:.14em solid var(--frame);display:grid;place-items:center;font-style:normal;font-size:1.1em;color:var(--ink-2)}
.p-stsl .sp .pl{animation:stsl-p 4s infinite}
.p-stsl .nb{position:relative;width:1.6em;height:1.6em;font-size:1.6em;font-weight:700;font-variant-numeric:tabular-nums}
.p-stsl .nb span{position:absolute;inset:0;text-align:center}
.p-stsl .n1{animation:stsl-1 4s steps(1) infinite}.p-stsl .n2{animation:stsl-2 4s steps(1) infinite}.p-stsl .n3{animation:stsl-3 4s steps(1) infinite}
.p-stsl .sl{position:relative;width:8.6em;height:.5em;border-radius:1em;background:var(--line)}
.p-stsl .sl b{position:absolute;left:0;top:0;bottom:0;border-radius:1em;background:var(--accent);animation:stsl-w 4s cubic-bezier(.4,0,.2,1) infinite}
.p-stsl .sl i{position:absolute;top:50%;width:1.7em;height:1.7em;margin:-.85em 0 0 -.85em;border-radius:50%;background:var(--knob);box-shadow:0 .1em .4em rgba(0,0,0,.3);animation:stsl-t 4s cubic-bezier(.4,0,.2,1) infinite}
.p-stsl .lab{display:flex;justify-content:space-between;width:8.6em;font-family:var(--f-mono);font-size:.75em;color:var(--ink-3)}
@keyframes stsl-p{0%,22%{transform:none}26%{transform:scale(.85)}30%,52%{transform:none}56%{transform:scale(.85)}60%,100%{transform:none}}
@keyframes stsl-1{0%{opacity:1}26%{opacity:0}90%{opacity:1}}
@keyframes stsl-2{0%{opacity:0}26%{opacity:1}56%{opacity:0}}
@keyframes stsl-3{0%{opacity:0}56%{opacity:1}90%{opacity:0}}
@keyframes stsl-w{0%,12%{width:20%}48%,80%{width:75%}96%,100%{width:20%}}
@keyframes stsl-t{0%,12%{left:20%}48%,80%{left:75%}96%,100%{left:20%}}

.p-btln .pan{justify-content:center}
.p-btln .bt{display:grid;font-size:.95em;animation:press 4s infinite;animation-delay:-.72s}
.p-btln .bt span{grid-area:1/1}
.p-btln .b1{animation:btln-1 4s steps(1) infinite}.p-btln .b2{opacity:0;animation:btln-2 4s steps(1) infinite}
.p-btln .lk{display:inline-flex;align-items:center;gap:.3em;align-self:flex-start;color:var(--accent);font-size:.95em;font-weight:600;text-decoration:underline;text-decoration-thickness:.1em;text-underline-offset:.25em}
.p-btln .lk i{font-style:normal;animation:btln-a 4s ease-in-out infinite}
.p-btln .cur{left:4.6em;top:7.8em;animation:btln-c 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes btln-1{0%{opacity:1}44%{opacity:0}92%{opacity:1}}
@keyframes btln-2{0%{opacity:0}44%{opacity:1}92%{opacity:0}}
@keyframes btln-a{0%,30%{transform:none}38%,70%{transform:translateX(.35em)}78%,100%{transform:none}}
@keyframes btln-c{0%,10%{transform:translate(4em,3em)}30%,70%{transform:none}90%,100%{transform:translate(4em,3em)}}

.p-chbg .cps{display:flex;flex-wrap:wrap;gap:.45em}
.p-chbg .cp{display:inline-flex;align-items:center;padding:.3em .75em;border:.12em solid var(--frame);border-radius:2em;font-size:.82em;font-weight:500;color:var(--ink-2);background:var(--ui)}
.p-chbg .c2{animation:chbg-s 4s infinite}.p-chbg .c4{animation:chbg-s 4s .9s infinite backwards}
.p-chbg .cd{position:relative;display:flex;flex-direction:column;gap:.5em}
.p-chbg .cd .im{height:5.2em}
.p-chbg .bg{position:absolute;left:.5em;top:.5em;padding:.15em .5em;border-radius:.35em;background:var(--danger);color:var(--danger-ink);font-size:.7em;font-weight:700;letter-spacing:.04em}
.p-chbg .bg2{left:auto;right:.5em;background:var(--ink);color:var(--bg)}
@keyframes chbg-s{0%,18%{background:var(--ui);border-color:var(--frame);color:var(--ink-2)}24%,86%{background:var(--accent-soft);border-color:var(--accent);color:var(--ink)}92%,100%{background:var(--ui);border-color:var(--frame);color:var(--ink-2)}}

.p-cdls .gr{display:grid;grid-template-columns:1fr 1fr;gap:.5em}
.p-cdls .gr>span{display:flex;flex-direction:column;gap:.35em;padding:.35em;border-radius:.6em;border:.1em solid var(--rule)}
.p-cdls .gr .im{height:2.9em;border-radius:.45em}
.p-cdls .lst{display:flex;flex-direction:column;gap:.55em}
.p-cdls .lst .rw{padding-bottom:.55em;border-bottom:.1em solid var(--rule)}
.p-cdls .lst .av{border-radius:.4em}
.p-cdls .gr>span,.p-cdls .lst .rw{animation:cdls-k 4s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .1s)}
@keyframes cdls-k{0%,6%{opacity:0;transform:translateY(.8em)}20%,86%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}

.p-ddcb .fd{position:relative;display:flex;align-items:center;justify-content:space-between;height:2.4em;padding:0 .7em;border:.14em solid var(--frame);border-radius:.6em;font-size:.88em}
.p-ddcb .fd::after{content:"";width:.45em;height:.45em;border:solid var(--ink-2);border-width:0 .14em .14em 0;transform:translateY(-.15em) rotate(45deg)}
.p-ddcb .vl{display:grid}.p-ddcb .vl span{grid-area:1/1}
.p-ddcb .v1{color:var(--ink-3);animation:btln-1 4s steps(1) infinite;animation-delay:-3.92s}
.p-ddcb .v2{opacity:0;font-weight:600;animation:btln-2 4s steps(1) infinite;animation-delay:-3.92s}
.p-ddcb .ls{position:absolute;left:1.1em;right:1.1em;top:4.2em;padding:.3em;display:flex;flex-direction:column;font-size:.85em;transform-origin:50% 0;animation:ddcb-o 4s cubic-bezier(.2,.8,.2,1) infinite}
.p-ddcb .ls span{position:relative;padding:.35em .55em;border-radius:.4em}
.p-ddcb .ls .hl{background:var(--accent-soft);animation:ddcb-h 4s infinite}
.p-ddcb .ls mark{background:none;color:var(--accent);font-weight:700}
.p-ddcb .tap{left:50%;top:56%;animation-delay:-.16s}
.p-ddcb .ty{display:inline-block;max-width:0;overflow:hidden;white-space:nowrap;animation:ddcb-t 4s steps(2,end) infinite}
.p-ddcb .in{justify-content:flex-start;border-color:var(--accent)}
.p-ddcb .in::after{display:none}
.p-ddcb .ls2{animation:ddcb-s 4s cubic-bezier(.2,.8,.2,1) infinite}
@keyframes ddcb-o{0%,18%{opacity:0;transform:scaleY(.8)}24%,52%{opacity:1;transform:none}58%,100%{opacity:0;transform:scaleY(.9)}}
@keyframes ddcb-h{0%,30%{transform:translateY(-100%)}38%,100%{transform:none}}
@keyframes ddcb-t{0%,10%{max-width:0}34%,88%{max-width:2.2em}96%,100%{max-width:0}}
@keyframes ddcb-s{0%,22%{opacity:0;transform:translateY(-.4em)}30%,86%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}
`;
s.items.push(
  {
    id: 'p-tbsg', k: '탭 vs 세그먼트 컨트롤', e: 'Tabs vs Segmented control',
    d: '탭은 서로 다른 화면을 오가고, 세그먼트 컨트롤은 같은 데이터를 다른 방식으로 보여줘요.',
    u: '"소개 / 후기"처럼 내용 자체가 다르면 탭, "주간 / 월간"처럼 같은 그래프의 기준만 바꾸면 세그먼트 컨트롤. 세그먼트는 2~5개, 짧은 단어로만 쓰세요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><div class="tb3"><b>소개</b><b>후기</b><i class="ul"></i></div><div class="vw"><div class="v1"><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><div class="v2"><span class="rw"><span class="av"></span><span class="ln" style="width:65%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:70%"></span></span></div></div></div><span class="cap">탭 · 다른 내용</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><div class="sg"><i class="th"></i><b>주간</b><b>월간</b></div><div class="bars"><span style="--a:40%;--b:70%"></span><span style="--a:65%;--b:45%"></span><span style="--a:30%;--b:90%"></span><span style="--a:80%;--b:60%"></span><span style="--a:55%;--b:100%"></span></div></div><span class="cap">세그먼트 · 같은 데이터</span></div>
</div>`
  },
  {
    id: 'p-stsl', k: '스테퍼 vs 슬라이더', e: 'Stepper vs Slider',
    d: '스테퍼는 정확한 숫자를 하나씩 올리고 내리고, 슬라이더는 넓은 범위에서 대략의 값을 빠르게 골라요.',
    u: '수량·인원처럼 작은 정수는 스테퍼, 음량·밝기·가격 범위처럼 정확도보다 감이 중요한 값은 슬라이더. 슬라이더로 정확한 숫자를 맞추게 하면 손이 떨려서 답답해요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><div class="sp"><i>−</i><span class="nb"><span class="n1">1</span><span class="n2">2</span><span class="n3">3</span></span><i class="pl">+</i></div></div><span class="cap">스테퍼 · 정확한 수</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><div class="sl"><b></b><i></i></div><div class="lab"><span>0</span><span>100</span></div></div><span class="cap">슬라이더 · 대략의 값</span></div>
</div>`
  },
  {
    id: 'p-btln', k: '버튼 vs 링크', e: 'Button vs Link',
    d: '버튼은 무언가를 실행하고, 링크는 다른 곳으로 이동해요.',
    u: '저장·전송·삭제처럼 상태를 바꾸면 버튼, 다른 페이지나 문서로 가면 링크. 링크를 버튼처럼 꾸미거나 버튼을 밑줄 텍스트로 만들면 누르기 전에 무슨 일이 생길지 예상하기 어려워요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="bt"><span class="b1">저장하기</span><span class="b2">✓ 저장됨</span></span></div><span class="cap">버튼 · 실행</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span><span class="lk">자세히 보기 <i>→</i></span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div><span class="cap">링크 · 이동</span></div>
</div>`
  },
  {
    id: 'p-chbg', k: '칩 vs 뱃지', e: 'Chip vs Badge',
    d: '칩은 눌러서 고르거나 거르는 작은 버튼이고, 뱃지는 상태를 알려주기만 하는 표시예요.',
    u: '검색 필터, 관심 태그 선택은 칩. "NEW", "D-3", "품절"처럼 읽기만 하는 정보는 뱃지. 뱃지를 칩처럼 테두리와 그림자로 꾸미면 눌러 보는 사람이 생겨요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><span class="ln h" style="width:60%"></span><div class="cps"><span class="cp">전체</span><span class="cp c2">디자인</span><span class="cp">개발</span><span class="cp c4">면접</span><span class="cp">기획</span></div></div><span class="cap">칩 · 누른다</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><div class="cd"><span class="im"></span><span class="bg">NEW</span><span class="bg bg2">D-3</span><span class="ln h" style="width:70%"></span><span class="ln" style="width:50%"></span></div></div><span class="cap">뱃지 · 본다</span></div>
</div>`
  },
  {
    id: 'p-cdls', k: '카드 vs 리스트', e: 'Card vs List',
    d: '카드는 사진과 함께 하나씩 훑어보기 좋고, 리스트는 같은 항목을 위아래로 빠르게 비교하기 좋아요.',
    u: '상품·콘텐츠처럼 이미지가 결정에 중요하면 카드, 메일·설정·거래 내역처럼 글자 정보를 비교하면 리스트. 한 화면에 들어가는 개수는 리스트가 훨씬 많아요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><div class="gr"><span style="--i:0"><span class="im"></span><span class="ln" style="width:80%"></span></span><span style="--i:1"><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:60%"></span></span><span style="--i:2"><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:70%"></span></span><span style="--i:3"><span class="im"></span><span class="ln" style="width:55%"></span></span></div></div><span class="cap">카드 · 훑어보기</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><div class="lst"><span class="rw" style="--i:0"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw" style="--i:1"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw" style="--i:2"><span class="av"></span><span class="ln" style="width:70%"></span></span><span class="rw" style="--i:3"><span class="av"></span><span class="ln" style="width:50%"></span></span></div></div><span class="cap">리스트 · 비교하기</span></div>
</div>`
  },
  {
    id: 'p-ddcb', k: '드롭다운 vs 콤보박스', e: 'Dropdown vs Combobox',
    d: '드롭다운은 펼쳐진 목록에서 고르기만 하고, 콤보박스는 글자를 입력하면 맞는 항목을 추려 보여줘요.',
    u: '선택지가 5~15개 정도면 드롭다운, 학교·회사·주소처럼 수십 개를 넘으면 입력해서 거르는 콤보박스(자동 완성). 선택지가 2~4개뿐이면 라디오 버튼이 한눈에 더 잘 보여요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><span class="fd"><span class="vl"><span class="v1">직무 선택</span><span class="v2">디자이너</span></span></span><div class="ls box"><span class="hl" style="position:absolute;left:.3em;right:.3em;top:2.3em;height:2em;padding:0"></span><span>개발자</span><span>디자이너</span><span>기획자</span><span>마케터</span></div><span class="tap"></span></div><span class="cap">드롭다운 · 고르기</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box"><span class="fd in"><span class="ty">디자</span><i class="ca"></i></span><div class="ls box ls2" style="animation-name:ddcb-s"><span><mark>디자</mark>이너</span><span>UX <mark>디자</mark>이너</span><span>제품 <mark>디자</mark>인</span></div></div><span class="cap">콤보박스 · 치면서 고르기</span></div>
</div>`
  }
);
})();
