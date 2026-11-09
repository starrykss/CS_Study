(() => {
const s = window.UX.find(x => x.id === 's-pattern');
s.css += `
.n-page .pan{position:relative;width:11em;height:13em;padding:1em;display:flex;flex-direction:column;gap:.55em;overflow:hidden}
.n-page .pg{display:flex;align-self:center;gap:.3em;margin-top:auto;font-size:.72em}
.n-page .pg span{position:relative;width:1.5em;height:1.5em;border-radius:.4em;display:grid;place-items:center;font-family:var(--f-mono);color:var(--ink-2)}
.n-page .pg .cur2{position:absolute;left:0;top:0;width:1.5em;height:1.5em;border-radius:.4em;background:var(--accent);animation:pg-m 4s steps(1) infinite}
.n-page .pg{position:relative}
.n-page .ls{display:flex;flex-direction:column;gap:.55em;animation:pg-f 4s steps(1) infinite}
.n-page .inf .ls{animation:inf-s 4s cubic-bezier(.4,0,.2,1) infinite}
.n-page .inf .spn{align-self:center;width:1.6em;height:1.6em;border-width:.2em;flex:none}
@keyframes pg-m{0%{transform:none}33.3%{transform:translateX(1.8em)}66.6%{transform:translateX(3.6em)}}
@keyframes pg-f{0%,32%{opacity:1}33%{opacity:.2}34%,65%{opacity:1}66%{opacity:.2}67%,100%{opacity:1}}
@keyframes inf-s{0%,25%{transform:none}35%,60%{transform:translateY(-5em)}70%,100%{transform:translateY(-10em)}}

.n-crumb .pan{width:25em;padding:1.4em;display:flex;flex-direction:column;gap:1em}
.n-crumb .cr{display:flex;align-items:center;gap:.4em;font-size:.95em;white-space:nowrap}
.n-crumb .cr span{color:var(--accent);text-decoration:underline;text-underline-offset:.2em;animation:crm-k 4s infinite backwards}
.n-crumb .cr i{font-style:normal;color:var(--ink-3);animation:crm-k 4s infinite backwards}
.n-crumb .cr b{color:var(--ink);font-weight:600;animation:crm-k 4s infinite backwards}
.n-crumb .cr .d1{animation-delay:.15s}.n-crumb .cr .d2{animation-delay:.3s}.n-crumb .cr .d3{animation-delay:.45s}
.n-crumb .h{font-size:1.5em;font-weight:700}
.n-crumb .cur{left:4.2em;top:1.9em;animation:crm-c 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes crm-k{0%,4%{opacity:0;transform:translateX(-.4em)}12%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes crm-c{0%,30%{transform:translate(6em,4em);opacity:0}36%{opacity:1}56%,86%{transform:none;opacity:1}96%,100%{opacity:0}}

.n-rail .ap{position:relative;width:24em;height:15em;border-radius:1em;overflow:hidden;border:.14em solid var(--frame);background:var(--ui);display:flex}
.n-rail .rl{flex:none;width:4.2em;padding:1em .7em;display:flex;flex-direction:column;gap:.6em;background:var(--stage);overflow:hidden;animation:rail-w 4s cubic-bezier(.4,0,.2,1) infinite}
.n-rail .rl span{display:flex;align-items:center;gap:.6em;height:2.4em;padding:0 .65em;border-radius:1.2em;white-space:nowrap;font-size:.85em}
.n-rail .rl span.on{background:var(--accent-soft)}
.n-rail .rl i{width:1.3em;height:1.3em;border-radius:.35em;border:.15em solid var(--ink-2);flex:none}
.n-rail .rl em{font-style:normal;opacity:0;animation:rail-t 4s infinite}
.n-rail .mn{flex:1;padding:1em;display:grid;grid-template-columns:repeat(auto-fill,minmax(5em,1fr));gap:.6em;align-content:start}
.n-rail .mn span{height:4em;border-radius:.6em;background:var(--accent-soft)}
@keyframes rail-w{0%,25%{width:4.2em}38%,80%{width:10em}92%,100%{width:4.2em}}
@keyframes rail-t{0%,30%{opacity:0}40%,78%{opacity:1}86%,100%{opacity:0}}

.n-filter .pan{position:relative;width:19em;padding:1.1em;display:flex;flex-direction:column;gap:.7em}
.n-filter .ch{display:flex;gap:.4em}
.n-filter .ch span{padding:.25em .7em;border-radius:1em;border:.12em solid var(--frame);font-size:.75em;white-space:nowrap}
.n-filter .ch .s{animation:chbg-s 4s infinite}
.n-filter .ls{position:relative;height:10em}
.n-filter .it{position:absolute;left:0;right:0;height:2.2em;display:flex;align-items:center;gap:.6em}
.n-filter .it i{height:1.4em;border-radius:.3em;background:var(--accent-soft)}
.n-filter .it b{font-family:var(--f-mono);font-size:.75em;font-weight:500;margin-left:auto}
.n-filter .a{top:0;animation:flt-a 4s cubic-bezier(.4,0,.2,1) infinite}.n-filter .b{top:2.6em;animation:fls-b 4s cubic-bezier(.4,0,.2,1) infinite}.n-filter .c{top:5.2em;animation:fls-c 4s cubic-bezier(.4,0,.2,1) infinite}.n-filter .d{top:7.8em;animation:flt-d 4s cubic-bezier(.4,0,.2,1) infinite}
.n-filter .tap{left:38%;top:13%;animation-delay:-.96s}
@keyframes flt-a{0%,26%{transform:none}38%,84%{transform:translateY(7.8em)}94%,100%{transform:none}}
@keyframes fls-b{0%,100%{transform:none}}
@keyframes fls-c{0%,26%{transform:none}38%,84%{transform:translateY(0)}94%,100%{transform:none}}
@keyframes flt-d{0%,26%{transform:none}38%,84%{transform:translateY(-7.8em)}94%,100%{transform:none}}

.n-car .vw{width:22em;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:1em}
.n-car .tr{display:flex;gap:.8em;width:100%;padding-left:2.5em;animation:car-k 6s cubic-bezier(.4,0,.2,1) infinite}
.n-car .tr span{flex:none;width:16em;height:10em;border-radius:1em;display:flex;align-items:flex-end;padding:1em;color:#fff;font-weight:700;font-size:1em}
.n-car .dt{display:flex;gap:.4em}
.n-car .dt i{height:.55em;width:.55em;border-radius:1em;background:var(--line)}
.n-car .dt .k{position:absolute}
.n-car .dt{position:relative}
.n-car .dt b{position:absolute;left:0;top:0;width:.55em;height:.55em;border-radius:1em;background:var(--accent);animation:car-d 6s cubic-bezier(.4,0,.2,1) infinite}
@keyframes car-k{0%,26%{transform:none}33%,59%{transform:translateX(-16.8em)}66%,92%{transform:translateX(-33.6em)}100%{transform:none}}
@keyframes car-d{0%,26%{transform:none}33%,59%{transform:translateX(.95em)}66%,92%{transform:translateX(1.9em)}100%{transform:none}}

.n-acc .pan{width:20em;padding:.4em 1.1em;display:flex;flex-direction:column}
.n-acc .q{display:flex;flex-direction:column;border-bottom:.1em solid var(--rule)}
.n-acc .q:last-child{border:0}
.n-acc .hd2{display:flex;align-items:center;justify-content:space-between;padding:.8em 0;font-size:.9em;font-weight:600}
.n-acc .hd2 i{width:.5em;height:.5em;border:solid var(--ink-2);border-width:0 .15em .15em 0;transform:translateY(-.15em) rotate(45deg)}
.n-acc .op .hd2 i{animation:acc-i 4s cubic-bezier(.4,0,.2,1) infinite}
.n-acc .an{max-height:0;overflow:hidden;font-size:.8em;color:var(--ink-2);line-height:1.5;animation:acc-o 4s cubic-bezier(.4,0,.2,1) infinite}
.n-acc .tap{left:88%;top:45%;animation-delay:-.96s}
@keyframes acc-i{0%,24%{transform:translateY(-.15em) rotate(45deg)}34%,84%{transform:translateY(.1em) rotate(225deg)}94%,100%{transform:translateY(-.15em) rotate(45deg)}}
@keyframes acc-o{0%,24%{max-height:0;padding-bottom:0}36%,84%{max-height:6em;padding-bottom:.8em}96%,100%{max-height:0;padding-bottom:0}}
`;
s.items.push(
  {
    id: 'n-page', k: '페이지네이션 vs 무한 스크롤', e: 'Pagination vs Infinite scroll',
    d: '페이지네이션은 번호를 눌러 정해진 묶음씩 넘기고, 무한 스크롤은 끝에 닿으면 다음 내용을 자동으로 불러와요.',
    u: '검색 결과, 상품 비교처럼 위치를 기억하고 돌아와야 하면 페이지네이션, 피드처럼 가볍게 훑는 콘텐츠는 무한 스크롤. 무한 스크롤 아래에 푸터를 두면 영영 못 닿아요. 중간 방식으로 "더보기" 버튼도 있어요.',
    html: `<div class="two">
<div class="col"><div class="pan box"><div class="ls"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div><div class="pg"><i class="cur2"></i><span>1</span><span>2</span><span>3</span><span>4</span><span>›</span></div></div><span class="cap">페이지네이션</span></div>
<span class="vs">vs</span>
<div class="col inf"><div class="pan box"><div class="ls"><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="spn"></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:65%"></span></span><span class="spn"></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span></div></div><span class="cap">무한 스크롤</span></div>
</div>`
  },
  {
    id: 'n-crumb', k: '브레드크럼', e: 'Breadcrumbs',
    d: '"홈 › 채용 › 디자인"처럼 지금 페이지까지 온 경로를 한 줄로 보여주고, 중간 단계를 눌러 바로 올라갈 수 있게 해요.',
    u: '카테고리가 3단계 이상인 쇼핑몰, 문서, 관리자 화면에서 쓰세요. 현재 페이지는 링크가 아닌 굵은 글자로 끝내요. 모바일에서는 공간이 좁아 "‹ 디자인"처럼 바로 윗단계 하나만 보여주는 경우가 많아요.',
    html: `<div class="pan box"><div class="cr"><span>홈</span><i class="d1">›</i><span class="d1">채용</span><i class="d2">›</i><span class="d2">디자인</span><i class="d3">›</i><b class="d3">UX 디자이너</b></div><span class="h">UX 디자이너 채용</span><span class="ln" style="width:80%"></span><span class="ln" style="width:60%"></span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
  },
  {
    id: 'n-rail', k: '내비게이션 레일·사이드바', e: 'Navigation rail · Sidebar',
    d: '태블릿과 데스크톱처럼 넓은 화면에서는 하단 탭 대신 왼쪽 세로 메뉴를 써요. 아이콘만 있는 좁은 레일과 글자까지 펼친 사이드바가 있어요.',
    u: '메뉴가 5개 이하면 레일, 더 많거나 하위 메뉴가 있으면 사이드바가 맞아요. 접고 펼치는 버튼을 두면 화면을 넓게 쓰고 싶은 사람도 배려할 수 있어요. 휴대폰으로 줄어들면 하단 탭이나 서랍으로 바뀌어야 해요.',
    html: `<div class="ap"><div class="rl"><span class="on"><i></i><em>홈</em></span><span><i></i><em>면접 연습</em></span><span><i></i><em>기록</em></span><span><i></i><em>설정</em></span></div><div class="mn"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>`
  },
  {
    id: 'n-filter', k: '필터와 정렬', e: 'Filter & Sort',
    d: '필터는 조건에 맞는 것만 남기고, 정렬은 남은 것의 순서를 바꿔요. 둘을 구분해서 보여줘야 결과를 이해하기 쉬워요.',
    u: '자주 쓰는 필터는 칩으로 바로 보이게, 나머지는 필터 화면으로 모으세요. 적용된 필터 개수를 표시하고, 결과가 0개가 되기 전에 미리 숫자를 보여주면 좋아요. 정렬 기준은 지금 무엇인지 항상 보여야 해요.',
    html: `<div class="pan box"><div class="ch"><span>추천순</span><span class="s">가격 낮은순</span><span>최신순</span></div><div class="ls"><span class="it a"><i style="width:5em"></i><b>39,000</b></span><span class="it b"><i style="width:3em"></i><b>12,000</b></span><span class="it c"><i style="width:4em"></i><b>24,000</b></span><span class="it d"><i style="width:2em"></i><b>8,000</b></span></div><span class="tap"></span></div>`
  },
  {
    id: 'n-car', k: '캐러셀', e: 'Carousel',
    d: '카드 여러 장을 가로로 넘겨 보는 영역이에요. 옆 카드가 살짝 보이면 넘길 수 있다는 걸 자연스럽게 알려줘요.',
    u: '자동으로 넘어가는 배너 캐러셀은 대부분 첫 장 말고는 보지 않아요. 중요한 정보를 두 번째 장 뒤에 숨기지 마세요. 자동 재생을 쓴다면 멈춤 버튼을 두고, 몇 번째인지 점이나 숫자로 보여주세요.',
    html: `<div class="vw"><div class="tr"><span style="background:linear-gradient(135deg,#0C9B72,#2BC995)">AI 모의면접</span><span style="background:linear-gradient(135deg,#5B4BFF,#9C8CFF)">포트폴리오 리뷰</span><span style="background:linear-gradient(135deg,#E8960B,#FFC24D)">면접 리포트</span></div><div class="dt"><i></i><i></i><i></i><b></b></div></div>`
  },
  {
    id: 'n-acc', k: '아코디언', e: 'Accordion',
    d: '제목만 쌓아 두고, 누른 항목만 아래로 펼쳐 내용을 보여주는 목록이에요. 긴 내용을 한 화면에 정리할 수 있어요.',
    u: 'FAQ, 설정 상세, 모바일의 긴 상품 정보에 잘 맞아요. 펼칠 수 있다는 걸 화살표로 알리고, 제목 줄 전체를 누를 수 있게 하세요. 모든 내용을 꼭 읽어야 하는 화면이라면 접지 말고 펼쳐 두는 게 나아요.',
    html: `<div class="pan box"><div class="q"><span class="hd2">면접은 몇 분 걸려요?<i></i></span></div><div class="q op"><span class="hd2">결과는 언제 나와요?<i></i></span><span class="an">답변이 끝나면 1분 안에 리포트가 만들어져요. 기록 탭에서 다시 볼 수 있어요.</span></div><div class="q"><span class="hd2">무료로 쓸 수 있어요?<i></i></span></div><span class="tap"></span></div>`
  }
);
})();
