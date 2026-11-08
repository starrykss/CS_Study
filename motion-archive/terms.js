(() => {
/* UI glossary page: every term points at its part on an app or web mock. */
const ICON = {
  bell: '<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9H4z"/></svg>',
  srch: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
};
const cls = (k, o) => (o.hl === k ? ' hl' : '');
const lines = (ws, h = '') => ws.map(w => `<i class="ln${h}" style="width:${w}%"></i>`).join('');

function app(o) {
  const H = k => cls(k, o);
  const sb = `<div class="sb${H('sb')}"><b>9:41</b><span class="sic"><i></i><i></i><i></i><em></em></span></div>`;
  const hi = `<i class="hi${H('hi')}"></i>`;
  let body = '';
  if (o.v === 'detail') {
    body = `<div class="ab${H('ab')}"><span class="ic2">${ICON.back}</span><b class="tt2">연습 상세</b><span class="ic2">${ICON.more}</span></div>
<div class="dt"><i class="pic"></i>${lines([75], ' h')}${lines([90, 60])}<b class="pr">월 9,900원</b></div>
<div class="cta${H('cta')}">지금 시작하기</div>`;
  } else if (o.v === 'web') {
    body = `<div class="ab${H('ab')}"><span class="ic2">${ICON.back}</span><b class="tt2">이벤트</b><span class="ic2">${ICON.more}</span></div>
<div class="wv${H('wv')}"><i class="im2"></i>${lines([80], ' h')}${lines([95, 85, 60])}<span class="wb2">응모하기</span></div>
<div class="tb"><span class="on">${ICON.home}<em>홈</em></span><span>${ICON.srch}<em>검색</em></span><span>${ICON.chat}<em>메시지</em></span><span>${ICON.user}<em>내 정보</em></span></div>`;
  } else {
    body = `<div class="ab${H('ab')}"><b class="tl2">홈</b><span class="ic2 bl${H('bdg')}">${ICON.bell}<i class="bdg"></i></span><span class="ic2 ib3${H('ib')}">${ICON.user}</span></div>
<div class="srch${H('srch')}">${ICON.srch}<span class="phd${H('phd')}">어떤 면접을 준비하나요?</span></div>
<div class="chs${H('chs')}"><span class="on">전체</span><span>디자인</span><span>개발</span><span>기획</span></div>
<div class="bn${H('bn')}"><b>첫 모의 면접 무료</b><span>지금 바로 연습해 보세요</span><div class="dots${H('dots')}"><i class="on"></i><i></i><i></i></div></div>
<div class="shd"><b>추천 연습</b><em>더보기</em></div>
<div class="cell c1${H('cell')}"><i class="th${H('th')}"></i><span>${lines([80], ' h')}${lines([55])}</span><i class="chv"></i></div>
<div class="cell c2"><i class="th" style="background:#FFE2C2"></i><span>${lines([70], ' h')}${lines([45])}</span><i class="chv"></i></div>
<div class="fab${H('fab')}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>
<div class="tb${H('tb')}"><span class="on">${ICON.home}<em>홈</em></span><span>${ICON.srch}<em>검색</em></span><span>${ICON.chat}<em>메시지</em></span><span>${ICON.user}<em>내 정보</em></span></div>`;
  }
  const OV = {
    toast: `<div class="toast${H('toast')}">연습 기록을 저장했어요</div>`,
    dim: `<div class="dm2${H('dim')}"></div>`,
    sheet: `<div class="dm2"></div><div class="sht${H('sheet')}"><i class="grab${H('grab')}"></i><b>정렬</b><span class="op on">최신순</span><span class="op">인기순</span><span class="op">난이도순</span></div>`,
    action: `<div class="dm2"></div><div class="act${H('act')}"><div class="ag"><span class="t">이 기록을 어떻게 할까요?</span><span>공유하기</span><span class="del">삭제</span></div><div class="ag c"><span>취소</span></div></div>`,
    dialog: `<div class="dm2"></div><div class="dlg2${H('dlg')}"><b>연습을 그만둘까요?</b><span>지금까지 답변은 저장돼요</span><div><em class="g">계속하기</em><em>그만두기</em></div></div>`,
    drawer: `<div class="dm2"></div><div class="drw${H('drw')}"><span class="pf"><i></i>${lines([70], ' h')}</span><span class="on">${ICON.home}홈</span><span>${ICON.chat}메시지</span><span>${ICON.user}내 정보</span><span>${ICON.more}설정</span></div>`,
    coach: `<div class="coach"><div class="hole"></div><div class="cm${H('coach')}">새 연습은 여기서 시작해요<em>1/3 · 다음</em></div></div>`,
    splash: `<div class="spl${H('spl')}"><i class="lg2"></i><b>면접연습</b></div>`,
    inapp: `<div class="dm2"></div><div class="iam${H('iam')}"><i class="ig2"></i><b>11월 한정 50% 할인</b><span>지금 구독하면 첫 달 반값</span><div><em>오늘 하루 보지 않기</em><em>닫기</em></div></div>`
  };
  const ov = o.ov ? OV[o.ov] : '';
  return `<div class="tm${o.ov ? ' ov-' + o.ov : ''}"><div class="ph am">${sb}${body}${ov}${hi}</div><div class="lc"><div class="lb" style="--y:${o.y}em"><b>${o.t}</b><span>${o.f}</span></div></div></div>`;
}

function web(o) {
  const H = k => cls(k, o);
  const chrome = `<div class="bw"><i></i><i></i><i></i><span class="tab"><i class="fav${H('fav')}"></i>면접연습 · 홈</span><span class="url">interview.example.com</span></div>`;
  const gnb = `<div class="gnb${H('gnb')}"><i class="lg3"></i><span class="mn2"><em class="on">서비스</em><em>요금</em><em>고객 사례</em><em>블로그</em></span><span class="rt2"><em>로그인</em><b>시작하기</b></span></div>`;
  let page = '';
  if (o.v === 'docs') {
    page = `${gnb}<div class="cols"><div class="lnb${H('lnb')}"><b>고객센터</b><em class="on">자주 묻는 질문</em><em>결제·환불</em><em>계정</em><em>문의하기</em></div><div class="doc"><span class="crumb${H('crumb')}">홈 › 고객센터 › 자주 묻는 질문</span>${lines([50], ' h')}${lines([95, 88, 92, 70, 85, 60])}</div></div>`;
  } else if (o.v === 'admin') {
    page = `<div class="cols adm"><div class="snb${H('snb')}"><i class="lg3"></i><em class="on">${ICON.home}대시보드</em><em>${ICON.user}회원</em><em>${ICON.chat}문의</em><em>${ICON.more}설정</em></div><div class="doc"><div class="kp"><i></i><i></i><i></i></div>${lines([92, 80, 88, 74])}</div></div>`;
  } else {
    page = `${o.tbn ? `<div class="tbn${H('tbn')}">신규 가입하면 첫 달 무료 →<i>×</i></div>` : ''}${gnb}
<div class="hero${H('hero')}"><div class="hx">${lines([80], ' h')}${lines([60], ' h')}<span class="hs">${lines([90, 70])}</span><b class="hcta${H('hcta')}">무료로 시작하기</b></div><i class="kv"></i></div>
<div class="g3${H('g3')}"><span class="cd${H('cd')}"></span><span class="cd"></span><span class="cd"></span>${o.cols ? '<div class="colov"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="gut"><i></i><i></i></div>' : ''}</div>
<div class="g3 b"><span class="cd"></span><span class="cd"></span><span class="cd"></span></div>
<div class="fnb${H('fnb')}"><div><b></b>${lines([70, 50, 60])}</div><div><b></b>${lines([60, 75, 45])}</div><div><b></b>${lines([55, 65])}</div><p>${lines([85, 60])}</p></div>`;
  }
  const extra = (o.top ? `<div class="top2${H('top')}">↑<em>TOP</em></div>` : '') + (o.fold ? `<div class="fold${H('fold')}"><em>폴드 · 첫 화면의 끝</em></div>` : '');
  return `<div class="tw2${o.scroll ? ' sc2' : ''}"><div class="wb">${chrome}<div class="pg2"><div class="pc">${page}</div>${extra}</div></div><div class="wl"><b>${o.t}</b><span>${o.f}</span></div></div>`;
}

const CSS = `
.tm{display:flex;align-items:center;gap:1.5em}
.tm .ph{width:11.5em;height:20.5em;flex:none}
.am>*{position:absolute}
.am *{--an:none}
.am .ln{display:block;height:.42em;border-radius:.3em;background:var(--line)}
.am .ln.h{height:.55em;background:var(--ink);opacity:.75}
.am svg{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.am .sb{left:0;right:0;top:0;height:1.7em;display:flex;align-items:center;justify-content:space-between;padding:0 1.1em}
.am .sb b{font-size:.58em;font-weight:700}
.am .sic{display:flex;align-items:flex-end;gap:.12em}
.am .sic i{width:.18em;background:var(--ink);border-radius:.05em}
.am .sic i:nth-child(1){height:.3em}.am .sic i:nth-child(2){height:.45em}.am .sic i:nth-child(3){height:.6em}
.am .sic em{width:1em;height:.5em;margin-left:.25em;border-radius:.15em;border:.08em solid var(--ink);background:linear-gradient(90deg,var(--ink) 70%,transparent 70%) content-box;padding:.06em}
.am .ab{left:0;right:0;top:1.7em;height:2.3em;display:flex;align-items:center;gap:.5em;padding:0 .8em}
.am .tl2{flex:1;font-size:.95em;font-weight:800}
.am .tt2{flex:1;text-align:center;font-size:.72em;font-weight:700}
.am .ic2{position:relative;display:grid;place-items:center;width:1.6em;height:1.6em;border-radius:50%;color:var(--ink-2)}
.am .ic2 svg{width:1.15em;height:1.15em}
.am .bdg{position:absolute;right:.2em;top:.15em;width:.5em;height:.5em;border-radius:50%;background:var(--danger);border:.1em solid var(--ui)}
.am .srch{left:.8em;right:.8em;top:4.2em;height:1.8em;display:flex;align-items:center;gap:.4em;padding:0 .6em;border-radius:.6em;background:var(--weak);color:var(--ink-3)}
.am .srch svg{width:.9em;height:.9em;flex:none}
.am .phd{font-size:.56em;white-space:nowrap}
.am .chs{left:.8em;top:6.3em;display:flex;gap:.3em}
.am .chs span{padding:.3em .6em;border-radius:1em;border:.08em solid var(--rule);font-size:.52em;font-weight:600;color:var(--ink-2);white-space:nowrap}
.am .chs .on{background:var(--ink);color:var(--surface);border-color:var(--ink)}
.am .bn{left:.8em;right:.8em;top:8.1em;height:3.4em;padding:.6em .7em;border-radius:.8em;background:linear-gradient(120deg,var(--accent),#7AB6FF);color:#fff;display:flex;flex-direction:column;gap:.15em}
.am .bn b{font-size:.62em}.am .bn span{font-size:.48em;opacity:.85}
.am .dots{position:absolute;left:50%;bottom:.35em;display:flex;gap:.25em;transform:translateX(-50%);padding:.12em .2em;border-radius:1em}
.am .dots i{width:.3em;height:.3em;border-radius:50%;background:rgba(255,255,255,.5)}
.am .dots .on{width:.75em;border-radius:1em;background:#fff}
.am .shd{left:.8em;right:.8em;top:11.9em;display:flex;justify-content:space-between;align-items:baseline}
.am .shd b{font-size:.62em}.am .shd em{font-style:normal;font-size:.5em;color:var(--ink-3)}
.am .cell{left:.5em;right:.5em;height:2.1em;display:flex;align-items:center;gap:.5em;padding:0 .3em;border-radius:.5em}
.am .c1{top:13.1em}.am .c2{top:15.3em}
.am .cell>span{flex:1;display:flex;flex-direction:column;gap:.3em}
.am .th{flex:none;width:1.7em;height:1.7em;border-radius:.45em;background:var(--accent-soft)}
.am .chv{width:.35em;height:.35em;border:solid var(--ink-3);border-width:.1em .1em 0 0;transform:rotate(45deg);margin-right:.2em}
.am .fab{right:.8em;bottom:3.6em;width:2.5em;height:2.5em;border-radius:.8em;display:grid;place-items:center;background:var(--accent);color:#fff;box-shadow:0 .3em .8em rgba(0,0,0,.25);z-index:2}
.am .fab svg{width:1.2em;height:1.2em;stroke-width:2.4}
.am .tb{left:0;right:0;bottom:.7em;height:2.5em;display:flex;justify-content:space-around;align-items:center;background:var(--ui);border-top:.08em solid var(--rule);z-index:1}
.am .tb span{display:flex;flex-direction:column;align-items:center;gap:.1em;color:var(--ink-3)}
.am .tb .on{color:var(--ink)}
.am .tb svg{width:1em;height:1em}
.am .tb em{font-style:normal;font-size:.42em;font-weight:600}
.am .hi{left:50%;bottom:.28em;width:4em;height:.26em;margin-left:-2em;border-radius:1em;background:var(--ink);z-index:6}
.am .dt{left:.8em;right:.8em;top:4.2em;display:flex;flex-direction:column;gap:.45em}
.am .pic{display:block;height:6.2em;border-radius:.8em;background:linear-gradient(135deg,var(--accent-soft),#CFE3FF)}
.am .pr{font-size:.78em;font-weight:800;margin-top:.2em}
.am .cta{left:.8em;right:.8em;bottom:1em;height:2.3em;display:grid;place-items:center;border-radius:.75em;background:var(--accent);color:#fff;font-size:.68em;font-weight:700;z-index:3}
.am .cta{font-size:1em}.am .cta{font-weight:700}
.am .cta::after{content:"";position:absolute;left:-.8em;right:-.8em;bottom:100%;height:1.2em;background:linear-gradient(transparent,var(--ui));pointer-events:none}
.am .wv{left:.6em;right:.6em;top:4.2em;bottom:3.6em;display:flex;flex-direction:column;gap:.45em;padding:.6em;border-radius:.6em;background:var(--stage)}
.am .im2{display:block;height:4.6em;border-radius:.5em;background:linear-gradient(135deg,#FFD7C2,#FF9E7A)}
.am .wb2{margin-top:auto;align-self:stretch;text-align:center;padding:.45em;border-radius:.5em;background:#FF7A45;color:#fff;font-size:.58em;font-weight:700}
.am .toast{left:50%;bottom:7em;padding:.55em .9em;border-radius:2em;background:var(--ink);color:var(--surface);font-size:.56em;font-weight:600;white-space:nowrap;z-index:4;animation:tg-ts 4s cubic-bezier(.2,.8,.2,1) infinite}
.am .dm2{inset:0;background:var(--dim);z-index:4;animation:tg-dm 4s infinite}
.am .sht{left:0;right:0;bottom:0;height:8.4em;padding:.5em .9em;display:flex;flex-direction:column;gap:.35em;border-radius:1.2em 1.2em 0 0;background:var(--ui);z-index:5;animation:tg-sh 4s cubic-bezier(.2,.8,.2,1) infinite}
.am .grab{align-self:center;width:2.2em;height:.28em;border-radius:1em;background:var(--line);margin-bottom:.3em}
.am .sht b{font-size:.68em;margin-bottom:.2em}
.am .op{display:flex;align-items:center;height:1.7em;padding:0 .6em;border-radius:.5em;font-size:.58em}
.am .op.on{background:var(--accent-soft);color:var(--accent);font-weight:700}
.am .act{left:.5em;right:.5em;bottom:1em;display:flex;flex-direction:column;gap:.35em;z-index:5;animation:tg-sh 4s cubic-bezier(.2,.8,.2,1) infinite}
.am .ag{display:flex;flex-direction:column;border-radius:.8em;background:var(--ui);overflow:hidden}
.am .ag span{padding:.65em;text-align:center;font-size:.6em;color:#0A84FF;border-top:.08em solid var(--rule)}
.am .ag span:first-child{border-top:0}
.am .ag .t{font-size:.48em;color:var(--ink-3)}.am .ag .del{color:var(--danger)}
.am .ag.c span{font-weight:700}
.am .dlg2{left:1.2em;right:1.2em;top:50%;padding:1em .9em .8em;display:flex;flex-direction:column;gap:.35em;border-radius:1em;background:var(--ui);z-index:5;animation:tg-dl 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.am .dlg2 b{font-size:.7em}.am .dlg2 span{font-size:.52em;color:var(--ink-3)}
.am .dlg2 div{display:flex;gap:.3em;margin-top:.5em}
.am .dlg2 em{flex:1;padding:.55em 0;border-radius:.55em;background:var(--accent);color:#fff;font-style:normal;font-size:.56em;font-weight:700;text-align:center}
.am .dlg2 em.g{background:var(--weak);color:var(--weak-ink)}
.am .drw{left:0;top:0;bottom:0;width:7.8em;padding:2.2em .8em;display:flex;flex-direction:column;gap:.3em;background:var(--ui);z-index:5;animation:tg-dr 4s cubic-bezier(.2,.8,.2,1) infinite}
.am .drw span{display:flex;align-items:center;gap:.45em;padding:.45em .5em;border-radius:.5em;font-size:.58em;font-weight:600;color:var(--ink-2)}
.am .drw span svg{width:1.4em;height:1.4em}
.am .drw .on{background:var(--accent-soft);color:var(--accent)}
.am .drw .pf{flex-direction:column;align-items:flex-start;padding:0 .5em 1em;margin-bottom:.4em;border-bottom:.15em solid var(--rule);border-radius:0;font-size:1em}
.am .drw .pf i:first-child{width:2em;height:2em;border-radius:50%;background:#FFD7C2}
.am .coach{inset:0;z-index:5;animation:tg-dm2 4s infinite}
.am .hole{position:absolute;right:.5em;bottom:3.3em;width:3.1em;height:3.1em;border-radius:50%;box-shadow:0 0 0 30em var(--dim)}
.am .cm{position:absolute;right:.6em;bottom:6.8em;width:7.4em;padding:.6em .7em;border-radius:.8em;background:var(--ui);font-size:.68em;font-weight:700;line-height:1.4;display:flex;flex-direction:column;gap:.3em}
.am .cm em{font-style:normal;font-weight:600;color:var(--accent);font-size:.85em}
.am .cm::after{content:"";position:absolute;right:1.1em;top:100%;border:.45em solid transparent;border-top-color:var(--ui)}
.am .spl{inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6em;background:var(--accent);color:#fff;z-index:5;animation:tg-sp 4s infinite}
.am .lg2{width:3em;height:3em;border-radius:.9em;background:#fff;box-shadow:inset 0 0 0 .7em var(--accent),inset 0 0 0 1.1em #fff}
.am .spl b{font-size:.8em}
.am .iam{left:1em;right:1em;top:50%;display:flex;flex-direction:column;border-radius:1em;background:var(--ui);overflow:hidden;z-index:5;animation:tg-dl 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.am .ig2{display:block;height:5em;background:linear-gradient(135deg,#FF8A65,#FFC94D)}
.am .iam b{font-size:.68em;padding:.7em .8em .1em}
.am .iam span{font-size:.5em;color:var(--ink-3);padding:0 1em .8em}
.am .iam div{display:flex;justify-content:space-between;padding:.55em .8em;border-top:.08em solid var(--rule)}
.am .iam em{font-style:normal;font-size:.48em;color:var(--ink-3)}
.am .iam em+em{color:var(--ink);font-weight:700}
.tm .hl,.tw2 .hl{outline:.16em solid var(--accent);outline-offset:-.08em;animation:tg-hl 2s ease-out infinite;z-index:7}
.tm.ov-toast .hl,.tm.ov-sheet .hl,.tm.ov-action .hl,.tm.ov-dialog .hl,.tm.ov-drawer .hl,.tm.ov-inapp .hl,.tm.ov-splash .hl,.tm.ov-dim .hl{animation-name:tg-hl,var(--an);animation-duration:2s,4s;animation-timing-function:ease-out,cubic-bezier(.2,.8,.2,1);animation-iteration-count:infinite}
.am .toast{--an:tg-ts}.am .sht,.am .act{--an:tg-sh}.am .dlg2,.am .iam{--an:tg-dl}.am .drw{--an:tg-dr}.am .spl{--an:tg-sp}.am .dm2{--an:tg-dm}
.am .dm2.hl{outline-offset:-.25em}
.am .grab.hl{outline-offset:.15em}
.tm .lc{position:relative;flex:none;width:12em;height:20.5em}
.tm .lb{position:absolute;left:0;top:var(--y);display:flex;flex-direction:column;gap:.2em;max-width:12em;padding:.65em .85em;border-radius:.9em;background:var(--ui);border:.12em solid var(--accent);box-shadow:0 .4em 1.2em -.4em rgba(0,27,55,.25);animation:tg-lb 4s cubic-bezier(.2,.8,.2,1) infinite}
.tm .lb::before{content:"";position:absolute;right:100%;top:50%;width:1.5em;height:.12em;background:var(--accent)}
.tm .lb::after{content:"";position:absolute;right:calc(100% + 1.25em);top:50%;width:.5em;height:.5em;margin-top:-.19em;border-radius:50%;background:var(--accent)}
.tm .lb b,.tw2 .wl b{font-size:1.2em;font-weight:800;color:var(--accent);line-height:1.25;white-space:nowrap}
.tm .lb span,.tw2 .wl span{font-size:.68em;color:var(--ink-2);line-height:1.4}
@keyframes tg-hl{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 45%,transparent)}70%,100%{box-shadow:0 0 0 .7em transparent}}
@keyframes tg-lb{0%,6%{opacity:0;transform:translate(-.6em,-50%)}16%,92%{opacity:1;transform:translateY(-50%)}100%{opacity:0;transform:translateY(-50%)}}
@keyframes tg-ts{0%,8%{opacity:0;transform:translate(-50%,.8em)}18%,88%{opacity:1;transform:translate(-50%,0)}96%,100%{opacity:0;transform:translate(-50%,0)}}
@keyframes tg-dm{0%,6%{opacity:0}16%,88%{opacity:1}96%,100%{opacity:0}}
@keyframes tg-dm2{0%,6%{opacity:0}16%,88%{opacity:1}96%,100%{opacity:0}}
@keyframes tg-sh{0%,6%{transform:translateY(105%)}18%,88%{transform:none}98%,100%{transform:translateY(105%)}}
@keyframes tg-dl{0%,6%{opacity:0;transform:translateY(-50%) scale(.9)}16%,88%{opacity:1;transform:translateY(-50%)}96%,100%{opacity:0;transform:translateY(-50%)}}
@keyframes tg-dr{0%,6%{transform:translateX(-102%)}18%,88%{transform:none}98%,100%{transform:translateX(-102%)}}
@keyframes tg-sp{0%,4%{opacity:0}12%,88%{opacity:1}96%,100%{opacity:0}}

.tw2{display:flex;flex-direction:column;align-items:center;gap:1em}
.tw2 .wb{position:relative;width:27em;height:15.5em;border-radius:1em;background:var(--ui);border:.12em solid var(--frame);overflow:hidden;box-shadow:0 .5em 1.5em -.8em rgba(0,0,0,.3)}
.tw2 .ln{display:block;height:.4em;border-radius:.3em;background:var(--line)}
.tw2 .ln.h{height:.65em;background:var(--ink);opacity:.8}
.tw2 svg{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.tw2 .bw{position:relative;height:2em;display:flex;align-items:center;gap:.3em;padding:0 .7em;background:var(--weak);border-bottom:.08em solid var(--rule);z-index:3}
.tw2 .bw>i{width:.45em;height:.45em;border-radius:50%;background:var(--line)}
.tw2 .tab{display:flex;align-items:center;gap:.35em;margin-left:.6em;padding:.3em .6em;border-radius:.45em .45em 0 0;background:var(--ui);font-size:.58em;font-weight:600;white-space:nowrap;align-self:flex-end}
.tw2 .fav{width:1.3em;height:1.3em;border-radius:.3em;background:var(--accent)}
.tw2 .fav.hl{outline-offset:.2em}
.tw2 .url{margin-left:auto;padding:.3em .8em;border-radius:1em;background:var(--ui);font-size:.48em;color:var(--ink-3);font-family:var(--f-mono)}
.tw2 .pg2{position:absolute;left:0;right:0;top:2em;bottom:0;overflow:hidden}
.tw2 .pc{position:relative}
.tw2.sc2 .pc{animation:tg-sc 5s cubic-bezier(.4,0,.2,1) infinite}
.tw2 .tbn{display:flex;align-items:center;justify-content:center;gap:.6em;height:1.25em;background:var(--ink);color:var(--surface);font-size:.5em;font-weight:600}
.tw2 .tbn{height:2.4em}
.tw2 .tbn i{font-style:normal;opacity:.6}
.tw2 .gnb{display:flex;align-items:center;gap:1em;height:2.3em;padding:0 1em;border-bottom:.08em solid var(--rule);background:var(--ui)}
.tw2 .lg3{width:1.2em;height:1.2em;border-radius:.35em;background:var(--accent);flex:none}
.tw2 .mn2{display:flex;gap:1.2em}
.tw2 .mn2 em,.tw2 .rt2 em{font-style:normal;font-size:.52em;font-weight:600;color:var(--ink-2);white-space:nowrap}
.tw2 .mn2 .on{color:var(--accent)}
.tw2 .rt2{margin-left:auto;display:flex;align-items:center;gap:.7em}
.tw2 .rt2 b{padding:.4em .7em;border-radius:.45em;background:var(--accent);color:#fff;font-size:.5em}
.tw2 .hero{display:flex;align-items:center;gap:1em;height:7em;padding:0 1.6em;background:var(--stage)}
.tw2 .hx{flex:1;display:flex;flex-direction:column;gap:.4em}
.tw2 .hs{display:flex;flex-direction:column;gap:.3em;margin:.3em 0 .5em}
.tw2 .hcta{align-self:flex-start;padding:.55em 1em;border-radius:.5em;background:var(--accent);color:#fff;font-size:.55em}
.tw2 .kv{width:8em;height:5.2em;border-radius:1em;background:radial-gradient(circle at 30% 30%,#9AD9FF,transparent 60%),linear-gradient(135deg,var(--accent),#7C6CF0)}
.tw2 .g3{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:.9em;padding:.9em 1.6em 0}
.tw2 .cd{height:3.6em;border-radius:.6em;background:var(--weak)}
.tw2 .g3.b{padding-bottom:.9em}
.tw2 .colov{position:absolute;left:1.6em;right:1.6em;top:0;bottom:-6em;display:grid;grid-template-columns:repeat(6,1fr);gap:.9em;pointer-events:none;animation:tg-co 4s infinite}
.tw2 .colov i{background:rgba(240,68,82,.12)}
.tw2 .gut{position:absolute;left:1.6em;right:1.6em;top:.9em;height:3.6em;display:grid;grid-template-columns:1fr .9em 1fr .9em 1fr;pointer-events:none}
.tw2 .gut i{grid-row:1;background:repeating-linear-gradient(45deg,var(--accent) 0 .12em,transparent .12em .35em);opacity:.8;animation:tg-gu 4s infinite}
.tw2 .gut i:nth-child(1){grid-column:2}.tw2 .gut i:nth-child(2){grid-column:4}
.tw2 .fnb{display:grid;grid-template-columns:repeat(3,1fr);gap:.4em 1em;padding:1em 1.6em;background:var(--weak)}
.tw2 .fnb div{display:flex;flex-direction:column;gap:.3em}
.tw2 .fnb b{display:block;width:40%;height:.5em;border-radius:.3em;background:var(--ink-3);margin-bottom:.15em}
.tw2 .fnb p{grid-column:1/-1;display:flex;flex-direction:column;gap:.3em;margin:.4em 0 0;padding-top:.6em;border-top:.08em solid var(--line)}
.tw2 .cols{display:flex;height:11.2em}
.tw2 .lnb{width:6.5em;flex:none;display:flex;flex-direction:column;gap:.15em;padding:.9em .6em;border-right:.08em solid var(--rule)}
.tw2 .lnb b{font-size:.6em;margin:0 .4em .4em}
.tw2 .lnb em{font-style:normal;font-size:.5em;padding:.45em .6em;border-radius:.4em;color:var(--ink-2)}
.tw2 .lnb .on{background:var(--accent-soft);color:var(--accent);font-weight:700}
.tw2 .doc{flex:1;display:flex;flex-direction:column;gap:.45em;padding:.9em 1.2em}
.tw2 .crumb{font-size:.48em;color:var(--ink-3);white-space:nowrap;align-self:flex-start;padding:.1em .2em;border-radius:.3em}
.tw2 .adm{height:13.5em}
.tw2 .snb{width:5.6em;flex:none;display:flex;flex-direction:column;gap:.2em;padding:.8em .5em;background:#191F28;color:#B0B8C1}
.tw2 .snb .lg3{margin:0 .3em .7em}
.tw2 .snb em{display:flex;align-items:center;gap:.4em;font-style:normal;font-size:.5em;padding:.5em .6em;border-radius:.4em;white-space:nowrap}
.tw2 .snb svg{width:1.3em;height:1.3em}
.tw2 .snb .on{background:rgba(255,255,255,.12);color:#fff}
.tw2 .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:.6em;margin-bottom:.4em}
.tw2 .kp i{height:3em;border-radius:.6em;background:var(--weak)}
.tw2 .top2{position:absolute;right:.9em;bottom:.9em;width:2.2em;height:2.2em;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--ui);border:.08em solid var(--rule);box-shadow:0 .2em .6em rgba(0,0,0,.18);font-size:.8em;font-weight:700;line-height:1;animation:tg-tp 5s infinite}
.tw2 .top2 em{font-style:normal;font-size:.5em}
.tw2 .fold{position:absolute;left:0;right:0;bottom:0;height:.14em;background:repeating-linear-gradient(90deg,var(--danger) 0 .5em,transparent .5em .9em);outline:0;animation:none}
.tw2 .fold em{position:absolute;right:.6em;bottom:.4em;padding:.25em .55em;border-radius:.4em;background:var(--danger);color:#fff;font-style:normal;font-size:.5em;font-weight:700}
.tw2 .wl{display:flex;flex-direction:column;align-items:center;gap:.15em;text-align:center;animation:tg-wl 4s cubic-bezier(.2,.8,.2,1) infinite}
@keyframes tg-wl{0%,6%{opacity:0;transform:translateY(.4em)}16%,92%{opacity:1;transform:none}100%{opacity:0}}
@keyframes tg-sc{0%,20%{transform:none}50%,90%{transform:translateY(var(--sy,-10.9em))}100%{transform:none}}
@keyframes tg-tp{0%,30%{opacity:0;transform:scale(.6)}40%,88%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes tg-co{0%,10%{opacity:0}20%,90%{opacity:1}100%{opacity:0}}
@keyframes tg-gu{0%,30%{opacity:0}40%,90%{opacity:.8}100%{opacity:0}}
`;

const sec = (id, short, shortEn, title, titleEn, sub, subEn, items, css = '') => ({ id, short, en: shortEn, shortEn, title, titleEn, sub, subEn, css, items });
const T = (id, k, e, d, u, de, ue, html, css) => ({ id, k, e, d, u, de, ue, html, css });

window.UX = [
  sec('g-app', '앱 화면 부위', 'App anatomy', '앱 화면의 부위별 이름', 'Naming the parts of an app screen',
    '매일 보는 앱 홈 화면을 위에서부터 아래로 나눠 이름을 붙였어요. 파란 테두리가 가리키는 곳이 그 이름이에요.',
    'A typical app home screen, named part by part from top to bottom. The blue outline marks the part being named.', [
    T('g-sb', '상태 표시줄', 'Status bar', '화면 맨 위에 시간, 신호, 배터리를 보여 주는 줄이에요. 앱이 아니라 운영체제가 그려요.', '앱 디자인에서는 이 높이만큼 비워 두고 시작해요. 배경색을 앱 바와 맞추거나, 사진 위에서는 글자색을 흰색으로 바꿔 읽히게 하세요.', 'The strip at the very top showing time, signal and battery. The operating system draws it, not your app.', 'Leave its height empty when you lay out a screen. Match its background to the app bar, or switch it to white text over photos so it stays legible.', app({ hl: 'sb', y: .9, t: '상태 표시줄', f: 'Status bar' })),
    T('g-ab', '앱 바 · 헤더', 'App bar · Header', '상태 표시줄 바로 아래, 화면 제목과 뒤로 가기, 주요 아이콘이 놓이는 띠예요. iOS는 내비게이션 바, 안드로이드는 톱 앱 바라고 불러요.', '"헤더", "상단 바", "타이틀 바"도 같은 곳을 가리킬 때가 많아요. 아이콘은 오른쪽에 두세 개까지만 두고, 나머지는 더보기(⋯) 안으로 넣으세요.', 'The band just below the status bar holding the title, back button and key icons. iOS calls it the navigation bar, Android the top app bar.', 'People also say header, top bar or title bar for the same place. Keep at most two or three icons on the right and tuck the rest behind a ⋯ menu.', app({ hl: 'ab', y: 2.9, t: '앱 바', f: 'App bar · Top bar · Header' })),
    T('g-tb', '탭 바 · 하단 내비게이션', 'Tab bar · Bottom navigation', '화면 아래에 3~5개의 주요 메뉴를 아이콘과 이름으로 늘어놓은 막대예요. 회사에 따라 "하단 GNB", "BNB"라고도 불러요.', '앱의 가장 중요한 목적지만 올리고, 탭을 눌렀을 때 화면이 넘어가는 대신 바로 바뀌게 하세요. 지금 있는 탭은 색과 굵기로 확실히 표시해요.', 'The bar along the bottom with three to five main destinations as icons and labels. Some teams call it the bottom GNB or BNB.', 'Put only the app’s most important destinations here, switch screens in place rather than pushing, and mark the current tab clearly with colour and weight.', app({ hl: 'tb', y: 18.3, t: '탭 바', f: 'Tab bar · Bottom navigation · BNB' })),
    T('g-hi', '홈 인디케이터', 'Home indicator', '아이폰 화면 맨 아래의 짧은 가로 막대예요. 위로 쓸어 올리면 홈으로 가요. 안드로이드의 제스처 핸들도 같은 역할이에요.', '이 막대 주변은 시스템 제스처 영역이라 버튼을 두면 잘못 눌려요. 하단 CTA나 탭 바는 이 영역(안전 영역) 위에 올려 두세요.', 'The short bar at the bottom edge of an iPhone. Swipe it up to go home. Android’s gesture handle does the same job.', 'This area belongs to system gestures, so buttons placed here get mis-tapped. Sit bottom CTAs and tab bars above it, inside the safe area.', app({ hl: 'hi', y: 19.9, t: '홈 인디케이터', f: 'Home indicator · Gesture handle' })),
    T('g-srch', '검색창 · 서치 바', 'Search bar', '돋보기 아이콘과 안내 문구가 들어 있는 입력란이에요. 누르면 검색 화면으로 넘어가거나 그 자리에서 키보드가 올라와요.', '찾기가 핵심인 앱은 첫 화면 위쪽에 크게 두세요. 안내 문구에 "상품명, 브랜드"처럼 무엇으로 찾을 수 있는지 예를 적어 주면 좋아요.', 'An input with a magnifier and a hint. Tapping it either opens a search screen or raises the keyboard in place.', 'If finding things is the core of your app, make it large near the top of the home screen. Use the hint to say what can be searched, for example product or brand.', app({ hl: 'srch', y: 5.1, t: '검색창', f: 'Search bar · Search field' })),
    T('g-ph', '플레이스홀더', 'Placeholder', '입력란이 비어 있을 때 흐린 글자로 보이는 안내 문구예요. 글자를 입력하는 순간 사라져요.', '사라지는 글이라 라벨 대신 쓰면 안 돼요. 입력 중에는 무엇을 적는 칸인지 알 수 없게 되니까요. "예: name@example.com"처럼 예시를 보여 줄 때 써요.', 'The faint hint text shown while an input is empty. It disappears the moment you type.', 'Because it vanishes, never use it instead of a label; people lose track of what the field is for. Use it for an example such as “e.g. name@example.com”.', app({ hl: 'phd', y: 5.1, t: '플레이스홀더', f: 'Placeholder · Hint text' })),
    T('g-chip', '칩', 'Chip', '짧은 글자를 둥근 테두리에 담은 작은 버튼이에요. 필터, 카테고리, 선택한 조건을 보여 줘요.', '가로로 여러 개 늘어놓고 스크롤하게 하는 경우가 많아요. 선택된 칩은 채운 색, 아닌 칩은 테두리만 두어 상태를 구분하세요.', 'A small rounded button holding a short label. It shows filters, categories or chosen conditions.', 'Chips often sit in a horizontally scrolling row. Fill the selected ones and outline the rest so the state is obvious.', app({ hl: 'chs', y: 7.0, t: '칩', f: 'Chip · Filter chip' })),
    T('g-bn', '배너', 'Banner', '화면 한쪽을 차지하는 홍보·안내용 영역이에요. 여러 장이 옆으로 넘어가면 캐러셀 배너, 상단에 얇게 깔리면 띠배너라고 불러요.', '배너는 사람들이 광고로 여겨 건너뛰는 경향이 있어요(배너 맹시). 중요한 기능 안내는 배너보다 화면 흐름 안에 넣는 게 더 잘 보여요.', 'An area used for promotions or announcements. Several that swipe sideways make a carousel banner; a thin one across the top is a strip banner.', 'People tend to skip anything that looks like an ad, known as banner blindness. Important guidance works better inside the flow of the screen.', app({ hl: 'bn', y: 9.8, t: '배너', f: 'Banner · Carousel banner' })),
    T('g-dots', '페이지 인디케이터', 'Page indicator', '배너나 온보딩이 몇 장인지, 지금 몇 번째인지 점으로 보여줘요. "닷", "페이지 닷"이라고도 불러요.', '장 수가 많으면 점 대신 "2/8"처럼 숫자로 보여 주세요. 점은 너무 작아서 직접 누르는 버튼으로 쓰면 안 돼요.', 'Dots showing how many slides a banner or onboarding has and which one you are on. Also called page dots.', 'With many slides, show a count like “2/8” instead. The dots are too small to act as buttons.', app({ hl: 'dots', y: 10.9, t: '페이지 인디케이터', f: 'Page indicator · Page dots' })),
    T('g-cell', '셀 · 리스트 아이템', 'Cell · List item', '목록을 이루는 한 줄이에요. iOS에서는 셀(cell), 안드로이드에서는 리스트 아이템이라고 불러요. 썸네일, 제목, 설명, 화살표로 이뤄져요.', '한 줄 전체를 눌러지게 만들고, 높이는 손가락으로 누르기 충분하게(44pt·48dp 이상) 잡아요. 오른쪽 화살표(›)는 "누르면 다음 화면으로 간다"는 뜻이에요.', 'One row in a list. iOS calls it a cell, Android a list item. It is made of a thumbnail, title, description and chevron.', 'Make the whole row tappable and tall enough for a finger, at least 44 pt or 48 dp. The chevron promises that tapping goes to another screen.', app({ hl: 'cell', y: 14.2, t: '셀', f: 'Cell · List item · Row' })),
    T('g-th', '썸네일', 'Thumbnail', '큰 이미지를 작게 줄여 미리 보여 주는 그림이에요. 목록에서 무엇인지 빨리 알아보게 해요.', '같은 목록 안에서는 비율과 크기를 통일하세요. 이미지가 없을 때 보여 줄 기본 그림과, 불러오는 동안의 자리 표시도 미리 정해 두세요.', 'A small preview of a larger image that helps people recognise items in a list at a glance.', 'Keep the ratio and size consistent within a list. Decide on a fallback image and a loading placeholder up front.', app({ hl: 'th', y: 14.2, t: '썸네일', f: 'Thumbnail' })),
    T('g-badge', '뱃지 · 닷', 'Badge · Dot', '아이콘 모서리에 붙는 빨간 점이나 숫자예요. 새 알림, 안 읽은 메시지가 있다는 걸 알려줘요.', '숫자가 중요하면 숫자 뱃지, "뭔가 새로 있다"만 알리면 작은 점(닷)을 써요. 99개가 넘으면 "99+"로 줄이고, 확인하면 바로 지워 주세요.', 'The red dot or number on an icon’s corner, signalling new notifications or unread messages.', 'Use a number when the count matters and a plain dot when “something new” is enough. Cap it at “99+” and clear it as soon as it has been seen.', app({ hl: 'bdg', y: 2.9, t: '뱃지', f: 'Badge · Notification dot' }))
  ], CSS),
  sec('g-float', '떠 있는 것들', 'Overlays', '화면 위에 떠 있는 것들', 'Things that float above the screen',
    '본문 위에 겹쳐 나타나는 버튼, 패널, 알림의 이름이에요. 비슷해 보여도 나타나는 방식과 막는 정도가 달라요.',
    'Names for buttons, panels and messages that appear on top of the content. They look alike but differ in how they appear and how much they block.', [
    T('g-fab', 'FAB', 'Floating Action Button', '화면 오른쪽 아래에 떠 있는 둥근 버튼이에요. 그 화면에서 가장 자주 하는 한 가지 행동(새 글 쓰기 등)을 맡아요.', '한 화면에 하나만 두세요. 목록을 스크롤해도 따라다니니 마지막 항목을 가리지 않게 아래 여백을 넉넉히 주세요. iOS 앱에서는 덜 쓰는 패턴이에요.', 'A round button floating at the bottom right that handles the single most common action on a screen, such as writing a new post.', 'Use only one per screen. It follows the scroll, so add bottom padding to keep it from covering the last item. It is less common in iOS apps.', app({ hl: 'fab', y: 15.4, t: 'FAB', f: 'Floating Action Button · 플로팅 버튼' })),
    T('g-cta', 'CTA', 'Call To Action', '사용자가 해 주길 바라는 핵심 행동을 담은 버튼이에요. 화면 아래에 꽉 차게 고정된 것을 "하단 CTA", "바텀 CTA"라고 불러요.', '한 화면의 CTA는 하나가 가장 강해요. "확인"보다 "지금 시작하기"처럼 결과가 보이는 동사로 쓰고, 스크롤해도 사라지지 않게 고정하는 경우가 많아요.', 'The button for the key action you want people to take. A full-width one pinned to the bottom is called a bottom CTA.', 'One CTA per screen is strongest. Label it with a verb that shows the outcome, such as “Start now” rather than “OK”, and pin it so it survives scrolling.', app({ v: 'detail', hl: 'cta', y: 18.4, t: 'CTA', f: 'Call To Action · 하단 CTA' })),
    T('g-sheet', '바텀 시트', 'Bottom sheet', '화면 아래에서 올라오는 패널이에요. 뒤 화면을 살짝 보이게 둔 채 선택지나 추가 정보를 보여줘요.', '정렬, 공유, 옵션 선택처럼 지금 화면과 이어진 짧은 작업에 써요. 아래로 끌어 내려 닫을 수 있어야 하고, 내용이 길면 전체 화면으로 펼쳐지게 하세요.', 'A panel that slides up from the bottom, showing options or details while the screen behind stays partly visible.', 'Use it for short tasks tied to the current screen, such as sorting, sharing or picking options. It should close with a downward drag and expand to full screen when content is long.', app({ ov: 'sheet', hl: 'sheet', y: 16.2, t: '바텀 시트', f: 'Bottom sheet · 하프 모달' })),
    T('g-grab', '그래버 · 핸들', 'Grabber · Drag handle', '바텀 시트 맨 위의 짧은 가로 막대예요. "끌어서 올리거나 내릴 수 있다"는 신호예요.', '끌어서 크기를 바꿀 수 있는 시트에만 달아요. 끌 수 없는 시트에 달면 잘못된 약속이 돼요.', 'The short bar at the top of a bottom sheet, signalling that it can be dragged up or down.', 'Add it only to sheets that really resize or dismiss by dragging; on a fixed sheet it makes a false promise.', app({ ov: 'sheet', hl: 'grab', y: 12.4, t: '그래버', f: 'Grabber · Drag handle' })),
    T('g-act', '액션 시트', 'Action sheet', '아래에서 올라오는 선택지 묶음이에요. iOS에서 자주 보이고, 맨 아래에 "취소"가 따로 떨어져 있어요.', '지금 한 행동에 대한 2~5개의 선택지에 써요. 삭제처럼 되돌릴 수 없는 항목은 빨간색으로 구분하세요.', 'A set of choices rising from the bottom, common on iOS, with Cancel set apart at the end.', 'Use it for two to five choices about the action just taken. Show destructive items such as Delete in red.', app({ ov: 'action', hl: 'act', y: 15.6, t: '액션 시트', f: 'Action sheet' })),
    T('g-dim', '딤 · 스크림', 'Dim · Scrim', '팝업이나 시트 뒤에 깔리는 반투명한 어두운 막이에요. 한국 실무에서는 "딤", 머티리얼에서는 "스크림"이라고 불러요.', '뒤 화면을 누를 수 없다는 신호예요. 딤을 누르면 닫히게 할지 미리 정하고, 중요한 확인 창이라면 딤을 눌러도 닫히지 않게 하세요.', 'The translucent dark layer behind a popup or sheet. Korean teams call it dim; Material calls it a scrim.', 'It signals that the screen behind is blocked. Decide whether tapping it closes the overlay, and for important confirmations, keep it from closing.', app({ ov: 'dim', hl: 'dim', y: 8, t: '딤', f: 'Dim · Scrim · Overlay' })),
    T('g-pop', '팝업 · 다이얼로그', 'Popup · Dialog', '화면 가운데 떠서 답을 받을 때까지 다른 행동을 막는 작은 창이에요. 한국 실무에서는 흔히 "팝업"이라고 불러요.', '되돌리기 어려운 행동의 확인이나 꼭 알아야 할 정보에만 써요. 버튼 문구는 "확인/취소" 대신 "그만두기/계속하기"처럼 결과를 적어 주세요.', 'A small window in the centre that blocks everything else until you answer. Korean teams commonly just call it a popup.', 'Reserve it for confirming hard-to-undo actions or must-know information. Label buttons with outcomes such as “Quit” and “Keep going” instead of OK and Cancel.', app({ ov: 'dialog', hl: 'dlg', y: 10.1, t: '팝업', f: 'Popup · Dialog · Modal' })),
    T('g-toast', '토스트', 'Toast', '화면 아래쪽에 잠깐 떴다가 저절로 사라지는 짧은 메시지예요. 누를 필요가 없어요.', '"저장했어요"처럼 방금 한 행동의 결과를 가볍게 알릴 때 써요. 실행 취소 같은 버튼이 필요하면 스낵바를, 꼭 읽어야 하면 팝업을 쓰세요.', 'A short message that appears near the bottom and disappears on its own. No tap needed.', 'Use it to lightly confirm the result of what someone just did, like “Saved”. If an action such as Undo is needed, use a snackbar; if it must be read, use a dialog.', app({ ov: 'toast', hl: 'toast', y: 15.9, t: '토스트', f: 'Toast message' })),
    T('g-drw', '드로어', 'Drawer · Side menu', '햄버거 버튼(≡)을 누르면 옆에서 밀려 나오는 메뉴 패널이에요. "사이드 메뉴", "내비게이션 드로어"라고도 해요.', '자주 안 쓰는 메뉴를 숨겨 두기 좋지만, 숨긴 메뉴는 잘 안 눌려요. 핵심 메뉴는 탭 바에 두고 드로어엔 설정, 고객센터 같은 보조 메뉴를 넣으세요.', 'A menu panel that slides in from the side when you tap the hamburger (≡). Also called a side menu or navigation drawer.', 'Good for tucking away rarely used items, but hidden items get used less. Keep core destinations in the tab bar and put secondary items such as settings and help in the drawer.', app({ ov: 'drawer', hl: 'drw', y: 10.1, t: '드로어', f: 'Drawer · Side menu' })),
    T('g-coach', '코치마크', 'Coach mark', '화면을 어둡게 덮고 특정 버튼만 밝게 비추며 "여기를 눌러 보세요"라고 알려 주는 안내예요.', '처음 한 번만, 정말 새로운 기능에만 보여 주세요. 세 장 이상 이어지면 대부분 건너뛰어요. 언제든 닫을 수 있게 해 주세요.', 'A guide that darkens the screen, spotlights one button and says “tap here”.', 'Show it once, and only for something genuinely new. People skip after the third step, so keep it short and always closable.', app({ ov: 'coach', hl: 'coach', y: 13.4, t: '코치마크', f: 'Coach mark · Spotlight' })),
    T('g-spl', '스플래시', 'Splash screen', '앱을 켤 때 잠깐 보이는 로고 화면이에요. 앱이 준비되는 동안 빈 화면 대신 보여줘요.', '꾸미는 화면이 아니라 기다리는 화면이에요. 1초 안팎으로 짧게 두고, 광고나 긴 애니메이션으로 사용자를 붙잡지 마세요.', 'The logo screen shown briefly while an app launches, instead of a blank screen.', 'It is a waiting screen, not a showcase. Keep it around a second and never hold people there with ads or long animations.', app({ ov: 'splash', hl: 'spl', y: 10.1, t: '스플래시', f: 'Splash screen · Launch screen' })),
    T('g-iam', '인앱 메시지', 'In-app message', '앱 안에서 이벤트, 공지, 할인을 알리려고 띄우는 홍보용 팝업이에요. "오늘 하루 보지 않기"가 붙어 있는 경우가 많아요.', '앱을 켜자마자 띄우면 하려던 일을 방해해요. 같은 사람에게 너무 자주 보이지 않게 빈도를 제한하고, 닫기 버튼을 크고 분명하게 두세요.', 'A promotional popup inside the app for events, notices or discounts, often with a “Don’t show again today” option.', 'Showing it the moment the app opens interrupts what people came to do. Cap how often each person sees it and make the close button large and clear.', app({ ov: 'inapp', hl: 'iam', y: 10.1, t: '인앱 메시지', f: 'In-app message · Promo popup' }))
  ]),
  sec('g-web', '웹 페이지 부위', 'Web anatomy', '웹 페이지의 부위별 이름', 'Naming the parts of a web page',
    'GNB, LNB, FNB처럼 한국 웹 실무에서 쓰는 약어가 많아요. 회사마다 조금씩 다르게 쓰기도 하니, 팀에서 같은 뜻으로 쓰는지 한 번 맞춰 두세요.',
    'Korean web teams use many acronyms such as GNB, LNB and FNB. Usage varies a little between companies, so agree on meanings within your team.', [
    T('g-gnb', 'GNB', 'Global Navigation Bar', '사이트의 모든 페이지 맨 위에 똑같이 붙는 주 메뉴예요. 로고, 큰 메뉴, 로그인 버튼이 들어가요.', '어느 페이지에서든 같은 자리, 같은 순서로 보여야 길을 잃지 않아요. 메뉴는 5~7개 이내로, 지금 있는 메뉴는 색으로 표시하세요.', 'The main menu at the top of every page of a site: logo, top-level sections and sign-in.', 'It must sit in the same place and order on every page so people never get lost. Keep it to five to seven items and highlight the current one.', web({ hl: 'gnb', t: 'GNB', f: 'Global Navigation Bar · 전역 메뉴' })),
    T('g-lnb', 'LNB', 'Local Navigation Bar', '지금 들어온 큰 메뉴 안의 하위 메뉴예요. 보통 왼쪽에 세로로 놓이고, 섹션마다 내용이 달라요.', 'GNB에서 "고객센터"를 누르면 LNB에 "자주 묻는 질문, 결제, 계정"이 보이는 식이에요. 지금 위치를 색으로 표시하고, 브레드크럼과 함께 쓰면 더 좋아요.', 'The sub-menu inside the section you are in, usually a vertical list on the left that changes from section to section.', 'Click Help in the GNB and the LNB lists FAQ, Billing and Account. Mark the current page, and pair it with breadcrumbs for extra clarity.', web({ v: 'docs', hl: 'lnb', t: 'LNB', f: 'Local Navigation Bar · 지역 메뉴' })),
    T('g-snb', 'SNB', 'Side Navigation Bar', '화면 옆에 세로로 붙은 메뉴 막대예요. 관리자 화면처럼 사이트 전체 메뉴를 왼쪽에 두는 형태를 부를 때 많이 써요.', 'LNB와 섞어 쓰는 팀도 많아요. 관리 도구처럼 메뉴가 많고 오래 쓰는 화면에 어울리고, 아이콘만 남기고 접을 수 있게 하면 공간을 아낄 수 있어요.', 'A vertical menu bar fixed to the side of the screen, often used for the whole menu of an admin console.', 'Many teams use it interchangeably with LNB. It suits tools with many sections and long sessions; letting it collapse to icons saves space.', web({ v: 'admin', hl: 'snb', t: 'SNB', f: 'Side Navigation Bar · 사이드 메뉴' })),
    T('g-crumb', '브레드크럼', 'Breadcrumb', '"홈 › 고객센터 › 자주 묻는 질문"처럼 지금 위치를 경로로 보여 주는 한 줄이에요.', '단계가 깊은 사이트에서 위 단계로 한 번에 돌아가게 해 줘요. 앞쪽 항목은 링크로, 마지막(현재 페이지)은 링크 없이 두세요.', 'A single line such as “Home › Help › FAQ” that shows where you are as a path.', 'On deep sites it lets people jump up a level in one click. Link the earlier items and leave the last, the current page, unlinked.', web({ v: 'docs', hl: 'crumb', t: '브레드크럼', f: 'Breadcrumb · 경로 표시' })),
    T('g-hero', '히어로 · KV', 'Hero · Key Visual', '첫 화면에 크게 자리 잡은 대표 영역이에요. 핵심 문구, 대표 이미지(KV), CTA 버튼이 함께 들어가요.', '방문자가 3초 안에 "무엇을 하는 곳인지" 알게 하는 자리예요. 문구는 한 문장, 버튼은 하나로 좁히세요. KV는 Key Visual의 줄임말이에요.', 'The large lead area on the first screen, combining the main headline, a key visual (KV) and a CTA.', 'Its job is to tell visitors what this is within three seconds. Narrow it to one sentence and one button. KV stands for key visual.', web({ hl: 'hero', t: '히어로 · KV', f: 'Hero section · Key Visual' })),
    T('g-fold', '폴드', 'Above the fold', '스크롤하지 않아도 보이는 첫 화면의 끝선이에요. 그 위를 "폴드 위(above the fold)"라고 불러요. 신문을 접었을 때 보이는 윗부분에서 온 말이에요.', '핵심 메시지와 CTA는 폴드 위에 두세요. 다만 사람들은 스크롤을 잘 하니, 폴드 바로 아래에 내용이 이어진다는 단서(잘린 카드 등)를 보여 주면 더 좋아요.', 'The line where the first screen ends without scrolling. Everything above it is “above the fold”, a term from the top half of a folded newspaper.', 'Put the key message and CTA above it. People do scroll, though, so hint that content continues just below, for example with a partly visible card.', web({ fold: 1, hl: 'fold', t: '폴드', f: 'Above the fold · 첫 화면' })),
    T('g-tbn', '띠배너', 'Top strip banner', '사이트 맨 위에 얇은 띠처럼 깔리는 공지·이벤트 배너예요. 닫기(×)가 붙어 있는 경우가 많아요.', '배송 지연, 이벤트처럼 모두에게 짧게 알릴 내용에 써요. 한 번 닫으면 다시 뜨지 않게 기억해 주세요.', 'A thin strip across the top of a site announcing news or promotions, usually with a close button.', 'Use it for short messages meant for everyone, such as shipping delays or events. Once closed, remember it and keep it closed.', web({ tbn: 1, hl: 'tbn', t: '띠배너', f: 'Top banner · Announcement bar' })),
    T('g-fnb', 'FNB · 푸터', 'Footer', '페이지 맨 아래의 영역이에요. 회사 정보, 약관, 고객센터, 사이트맵 링크가 모여 있어요. FNB(Footer Navigation Bar)라고도 해요.', '사람들은 찾는 게 없을 때 푸터로 내려와요. 고객센터·환불 규정처럼 자주 찾는 링크와 법적으로 필요한 정보를 빠짐없이 넣으세요.', 'The bottom area of a page with company details, terms, support and sitemap links. Also called FNB, footer navigation bar.', 'People scroll to the footer when they cannot find something. Include frequently sought links such as support and refunds, plus any legally required details.', web({ scroll: 1, hl: 'fnb', t: 'FNB · 푸터', f: 'Footer · Footer Navigation Bar' })),
    T('g-top', '탑 버튼', 'Back to top', '긴 페이지를 내려가면 오른쪽 아래에 나타나서, 누르면 맨 위로 올려 주는 버튼이에요.', '스크롤이 충분히 내려갔을 때만 보여 주세요. 채팅 상담 버튼, 플로팅 CTA와 겹치지 않게 자리를 정해 두세요.', 'A button that appears at the bottom right on long pages and scrolls back to the top.', 'Show it only after a decent amount of scrolling, and place it so it never collides with chat or floating CTA buttons.', web({ scroll: 1, top: 1, hl: 'top', t: '탑 버튼', f: 'Back to top · Scroll to top' })),
    T('g-gut', '컬럼 · 거터', 'Columns · Gutter', '화면을 세로 칸(컬럼)으로 나눈 격자에서, 칸과 칸 사이의 빈 간격을 거터라고 불러요.', '카드와 이미지를 컬럼에 맞춰 놓으면 정돈돼 보여요. 데스크톱은 12컬럼, 태블릿 8, 모바일 4컬럼이 흔하고, 거터는 16~24px 정도가 일반적이에요.', 'A grid divides the page into vertical columns; the empty space between columns is the gutter.', 'Aligning cards and images to columns makes layouts look orderly. Twelve columns on desktop, eight on tablet and four on mobile are common, with 16–24 px gutters.', web({ cols: 1, hl: 'g3', t: '컬럼 · 거터', f: 'Columns · Gutter · Grid' })),
    T('g-fav', '파비콘', 'Favicon', '브라우저 탭과 즐겨찾기에 보이는 아주 작은 사이트 아이콘이에요.', '16px에서도 알아볼 수 있게 로고를 단순하게 다듬어 넣으세요. 탭을 여러 개 열어 둔 사람은 글자보다 파비콘으로 탭을 찾아요.', 'The tiny site icon in browser tabs and bookmarks.', 'Simplify your logo so it still reads at 16 px. People with many tabs open find yours by its favicon, not its title.', web({ hl: 'fav', t: '파비콘', f: 'Favicon · Site icon' }))
  ]),
  sec('g-talk', '회의 용어', 'Jargon', '회의에서 자주 듣는 말', 'Words you hear in meetings',
    '화면의 한 부분은 아니지만 기획·디자인·개발이 함께 일할 때 자주 오가는 말이에요.',
    'Not screen parts as such, but words that fly around whenever product, design and engineering work together.', [
    T('g-uiux', 'UI vs UX', 'User interface vs User experience', 'UI는 화면에 보이는 버튼, 글자, 색 같은 "접점"이고, UX는 서비스를 알게 되고 쓰고 다시 오기까지의 "경험 전체"예요.', '"UI가 예쁘다"는 화면 이야기, "UX가 좋다"는 원하는 일을 쉽게 끝냈다는 이야기예요. 예쁜 화면도 흐름이 막히면 UX는 나빠요.', 'UI is the touchpoint you see: buttons, text, colour. UX is the whole experience, from discovering a service to using it and coming back.', '“Nice UI” is about the screen; “good UX” means people got their job done easily. A beautiful screen still makes bad UX if the flow is blocked.',
      `<div class="uiux"><div class="col"><div class="ph s"><div class="scr"><span class="ln h" style="width:55%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="bt">시작하기</span></div></div><span class="cap">UI · 화면</span></div><div class="col"><div class="jr"><svg viewBox="0 0 200 90"><path class="jl" d="M10 60 C40 20 60 20 80 45 S120 85 140 50 S180 15 190 25"/></svg><span style="left:2%;top:58%">알게 됨</span><span style="left:30%;top:14%">가입</span><span style="left:58%;top:84%">결제 오류</span><span style="left:84%;top:10%">재방문</span></div><span class="cap">UX · 경험 전체</span></div></div>`,
      `.g-uiux .uiux{display:flex;align-items:center;gap:1.6em}
.g-uiux .ph.s{width:8.5em;height:14.6em}
.g-uiux .jr{position:relative;width:14em;height:8em;border-radius:1em;background:var(--ui);border:.1em solid var(--rule)}
.g-uiux .jr svg{position:absolute;inset:.6em;width:calc(100% - 1.2em);height:calc(100% - 1.2em);overflow:visible}
.g-uiux .jl{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-dasharray:260;animation:ux-j 4s cubic-bezier(.4,0,.2,1) infinite}
.g-uiux .jr span{position:absolute;font-size:.55em;font-weight:700;color:var(--ink-2);white-space:nowrap;animation:ux-t 4s infinite}
.g-uiux .ph{animation:tg-hl 2s ease-out infinite;outline:.16em solid var(--accent)}
@keyframes ux-j{0%{stroke-dashoffset:260}60%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:260}}
@keyframes ux-t{0%,20%{opacity:0}40%,92%{opacity:1}100%{opacity:0}}`),
    T('g-btnh', '버튼 위계', 'Button hierarchy', '같은 버튼이라도 채운(Filled), 연한(Weak·Tonal), 테두리(Outline), 글자만(Ghost·Text) 순서로 강조가 약해져요.', '한 화면에서 가장 중요한 행동 하나만 채운 버튼으로 두고, 나머지는 한 단계씩 약하게 내리세요. "고스트 버튼 써 주세요"는 테두리도 배경도 없는 글자 버튼을 말해요.', 'Buttons step down in emphasis from Filled to Weak (tonal) to Outline to Ghost (text only).', 'Give only the single most important action a filled button and step the others down. “Use a ghost button” means a text-only button with no fill or border.',
      `<div class="bh">${[['bt', 'Filled', '채움'], ['bt w', 'Weak · Tonal', '연한 색'], ['bt o', 'Outline', '테두리'], ['bt gh', 'Ghost · Text', '글자만']].map(([c, e, k], i) => `<div class="r2" style="--i:${i}"><span class="${c}">확인</span><b>${e}</b><em>${k}</em></div>`).join('')}</div>`,
      `.g-btnh .bh{display:flex;flex-direction:column;gap:.9em}
.g-btnh .r2{display:grid;grid-template-columns:7em 8em 4em;align-items:center;gap:1em;padding:.3em .6em;border-radius:.8em;animation:bh-k 6s infinite;animation-delay:calc(var(--i) * 1.5s - 6s)}
.g-btnh .r2 .bt{text-align:center;font-size:.95em}
.g-btnh .bt.o{background:transparent;color:var(--accent);box-shadow:inset 0 0 0 .12em var(--accent)}
.g-btnh .bt.gh{background:transparent;color:var(--accent)}
.g-btnh .r2 b{font-family:var(--f-mono);font-size:.78em;font-weight:500;color:var(--ink)}
.g-btnh .r2 em{font-style:normal;font-size:.75em;color:var(--ink-3)}
@keyframes bh-k{0%,22%{background:var(--ui);box-shadow:0 0 0 .14em var(--accent)}25%,100%{background:transparent;box-shadow:none}}`),
    T('g-elev', '엘리베이션 · z-index', 'Elevation · z-index', '화면 요소가 얼마나 위에 떠 있는지를 말해요. 디자인에서는 그림자 깊이(엘리베이션), 코드에서는 겹치는 순서(z-index)로 표현해요.', '"이거 z-index 문제예요"는 위에 있어야 할 게 아래에 깔렸다는 뜻이에요. 배경 < 카드 < FAB < 시트 < 다이얼로그 < 토스트처럼 층의 순서를 팀에서 미리 정해 두세요.', 'How high an element floats above the page: shadow depth in design (elevation) and stacking order in code (z-index).', '“It’s a z-index issue” means something that should be on top is underneath. Agree a layer order as a team, such as page < card < FAB < sheet < dialog < toast.',
      `<div class="el">${[['배경 페이지', 'l0', 0], ['카드', 'l1', 1], ['FAB', 'l2', 10], ['바텀 시트', 'l3', 100], ['다이얼로그', 'l4', 1000], ['토스트', 'l5', 2000]].map(([k, c, z], i) => `<span class="ly ${c}" style="--i:${i}"><em>${k}</em><b>z ${z}</b></span>`).join('')}</div>`,
      `.g-elev .el{position:relative;width:21em;height:16em}
.g-elev .ly{position:absolute;left:0;bottom:0;width:12.5em;height:5.4em;display:flex;align-items:flex-end;justify-content:space-between;padding:.6em .8em;border-radius:1em;background:var(--ui);border:.1em solid var(--rule);box-shadow:0 calc(.15em + var(--i) * .12em) calc(.4em + var(--i) * .3em) rgba(0,27,55,calc(.06 + var(--i) * .03));animation:el-u 4.5s cubic-bezier(.3,.7,.2,1) infinite}
.g-elev .ly em{font-style:normal;font-size:.78em;font-weight:700;color:var(--ink)}
.g-elev .ly b{font-family:var(--f-mono);font-size:.62em;font-weight:500;color:var(--ink-3)}
.g-elev .l0{background:var(--stage)}
.g-elev .l2 em::before{content:"";display:inline-block;width:1em;height:1em;margin-right:.35em;vertical-align:-.15em;border-radius:.3em;background:var(--accent)}
.g-elev .l3{border-top:.2em solid var(--line)}
.g-elev .l4{border-color:var(--accent)}
.g-elev .l5{background:var(--ink);border-color:var(--ink)}.g-elev .l5 em,.g-elev .l5 b{color:var(--surface)}
@keyframes el-u{0%,12%{transform:translate(calc(var(--i) * .25em),calc(var(--i) * -.25em))}45%,88%{transform:translate(calc(var(--i) * 1.6em),calc(var(--i) * -1.9em))}100%{transform:translate(calc(var(--i) * .25em),calc(var(--i) * -.25em))}}`),
    T('g-vp', '뷰포트', 'Viewport', '지금 화면에 실제로 보이는 영역이에요. 페이지 전체가 아무리 길어도 사용자는 뷰포트만큼만 봐요.', '반응형 디자인의 기준이 되는 폭이에요. "뷰포트 안에 CTA가 들어와야 해요"는 스크롤 없이 버튼이 보여야 한다는 뜻이에요.', 'The area actually visible on screen right now. However long the page is, people only see a viewport’s worth.', 'Its width is what responsive layouts respond to. “The CTA must be in the viewport” means the button should be visible without scrolling.',
      `<div class="vp2"><div class="lp">${'<i class="ln h" style="width:60%"></i><i class="im"></i><i class="ln" style="width:90%"></i><i class="ln" style="width:75%"></i>'.repeat(4)}</div><div class="fr"><em>뷰포트</em></div></div>`,
      `.g-vp .vp2{position:relative;width:12em;height:22em}
.g-vp .lp{position:absolute;left:.6em;right:.6em;top:0;display:flex;flex-direction:column;gap:.6em;padding:.8em;border-radius:.8em;background:var(--ui);opacity:.45;animation:vp-s 6s cubic-bezier(.4,0,.2,1) infinite}
.g-vp .lp .im{height:4em}
.g-vp .fr{position:absolute;left:0;right:0;top:5em;height:11em;border-radius:1.2em;border:.22em solid var(--accent);box-shadow:0 0 0 30em color-mix(in srgb,var(--stage) 55%,transparent);background:transparent;z-index:2}
.g-vp .fr em{position:absolute;left:.6em;top:-1.8em;padding:.2em .6em;border-radius:.5em;background:var(--accent);color:#fff;font-style:normal;font-size:.7em;font-weight:700}
@keyframes vp-s{0%,10%{transform:translateY(4em)}50%,60%{transform:translateY(-14em)}100%{transform:translateY(4em)}}`),
    T('g-micro', '마이크로카피', 'Microcopy', '버튼 이름, 입력란 안내, 오류 문구처럼 화면 곳곳의 아주 짧은 글이에요. 짧지만 사용자가 다음 행동을 결정하는 데 큰 영향을 줘요.', '"마이크로카피 다듬어 주세요"는 이런 짧은 글들을 더 쉽고 분명하게 고쳐 달라는 뜻이에요. 같은 대상은 같은 단어로, 행동은 동사로 쓰세요.', 'The tiny bits of text all over a screen: button labels, field hints, error messages. Short, yet they shape what people do next.', '“Polish the microcopy” means rewrite these snippets to be simpler and clearer. Use the same word for the same thing and verbs for actions.',
      `<div class="mc box"><span class="lb2 m" style="--i:0">이메일</span><span class="in2"><em class="m" style="--i:1">name@example.com</em></span><span class="hp2 m" style="--i:2">로그인할 때 쓰는 주소예요</span><span class="bt m" style="--i:3">인증 메일 받기</span><span class="ft2 m" style="--i:4">메일이 안 오나요? 스팸함을 확인해 주세요</span></div>`,
      `.g-micro .mc{width:17em;padding:1.2em;display:flex;flex-direction:column;gap:.5em}
.g-micro .lb2{font-size:.8em;font-weight:700;color:var(--ink-2)}
.g-micro .in2{height:2.4em;display:flex;align-items:center;padding:0 .7em;border:.12em solid var(--frame);border-radius:.7em}
.g-micro .in2 em{font-style:normal;font-size:.82em;color:var(--ink-3)}
.g-micro .hp2,.g-micro .ft2{font-size:.68em;color:var(--ink-3)}
.g-micro .bt{text-align:center;margin-top:.4em}
.g-micro .ft2{text-align:center}
.g-micro .m{border-radius:.3em;animation:mc-k 5s infinite;animation-delay:calc(var(--i) * 1s - 5s)}
@keyframes mc-k{0%,18%{outline:.14em solid var(--accent);outline-offset:.15em}20%,100%{outline:.14em solid transparent;outline-offset:.15em}}`),
    T('g-deep', '딥링크', 'Deep link', '앱의 첫 화면이 아니라 특정 화면(상품, 게시글)으로 바로 열어 주는 링크예요.', '푸시 알림, 광고, 공유 링크를 누른 사람을 홈 화면에 떨어뜨리면 다시 찾아가야 해요. 링크가 가리킨 그 화면으로 곧장 보내 주세요. 앱이 없으면 스토어나 웹으로 보내는 것도 정해 두세요.', 'A link that opens a specific screen in an app, such as a product or a post, rather than the home screen.', 'Dropping people from a push, ad or shared link onto the home screen makes them search again. Send them straight to the screen the link promised, and decide where to go when the app is not installed.',
      `<div class="dl"><div class="ph s m1"><div class="scr"><span class="msg">면접 질문 모음 보러 가기<b>app.link/q/2031</b></span></div><i class="tap"></i></div><span class="ar">→</span><div class="ph s m2"><div class="scr"><span class="ln h" style="width:60%"></span><span class="im" style="height:5em"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="bt">이 질문 연습하기</span></div><em class="tg3">질문 #2031 화면</em></div></div>`,
      `.g-deep .dl{display:flex;align-items:center;gap:1.2em}
.g-deep .ph.s{width:9.6em;height:16.6em}
.g-deep .msg{align-self:flex-start;display:flex;flex-direction:column;gap:.25em;margin-top:2em;padding:.6em .7em;border-radius:.9em .9em .9em .3em;background:var(--weak);font-size:.66em;font-weight:600}
.g-deep .m2 .bt{font-size:.62em;padding:.6em .4em}
.g-deep .msg b{color:var(--accent);font-weight:500;text-decoration:underline}
.g-deep .m1 .tap{left:45%;top:28%;animation-delay:-1.2s}
.g-deep .ar{font-size:1.6em;color:var(--ink-3);animation:dl-a 4s infinite}
.g-deep .m2{animation:dl-s 4s cubic-bezier(.2,.8,.2,1) infinite}
.g-deep .m2 .scr{padding-top:1.4em}
.g-deep .tg3{position:absolute;left:50%;bottom:.6em;transform:translateX(-50%);padding:.2em .5em;border-radius:.4em;background:var(--accent);color:#fff;font-style:normal;font-size:.55em;font-weight:700;white-space:nowrap;z-index:3}
@keyframes dl-a{0%,20%{opacity:.2;transform:none}30%,90%{opacity:1;transform:translateX(.2em)}100%{opacity:.2}}
@keyframes dl-s{0%,22%{opacity:0;transform:scale(.92)}32%,90%{opacity:1;transform:none}98%,100%{opacity:0}}`),
    T('g-wv', '웹뷰', 'WebView', '앱 안에서 웹 페이지를 띄워 보여 주는 영역이에요. 겉은 앱(상단 바, 탭 바)인데 안의 내용은 웹으로 만들어져 있어요.', '이벤트, 약관, 자주 바뀌는 화면을 앱 업데이트 없이 고칠 수 있어서 많이 써요. 대신 앱과 글꼴·버튼 모양이 달라 보이기 쉬우니 스타일을 맞추고, 뒤로 가기가 자연스럽게 동작하는지 꼭 확인하세요.', 'A region inside an app that displays a web page. The frame is native (app bar, tab bar) while the content inside is built with web tech.', 'Popular for events, terms and frequently changing screens because they can be updated without an app release. Match fonts and buttons to the app, and make sure Back behaves naturally.',
      app({ v: 'web', hl: 'wv', y: 10.4, t: '웹뷰', f: 'WebView · 앱 속 웹 페이지' }))
  ])
];
window.UX.forEach(s => s.items.forEach(it => { if (it.css) s.css = (s.css || '') + '\n' + it.css; }));
})();
