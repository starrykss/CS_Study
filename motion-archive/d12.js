(window.UX = window.UX || []).push({
  id: 's-usab', short: '사용성 원칙', en: 'Usability heuristics',
  title: '쓰기 쉬운 화면의 원칙',
  sub: '제이콥 닐슨의 10가지 사용성 휴리스틱을 비롯해, 오래 검증된 원칙들이에요. 화면을 검토할 때 체크리스트로 쓰세요.',
  css: `
.u-stat .ph{display:flex;flex-direction:column}
.u-stat .scr{justify-content:flex-end;gap:.5em;padding-bottom:1.4em}
.u-stat .bb{align-self:flex-end;max-width:80%;padding:.55em .8em;border-radius:1em 1em .3em 1em;background:var(--accent);color:var(--accent-ink);font-size:.85em}
.u-stat .bb.o{align-self:flex-start;background:var(--stage);color:var(--ink);border-radius:1em 1em 1em .3em}
.u-stat .st{align-self:flex-end;display:grid;font-family:var(--f-mono);font-size:.68em;color:var(--ink-3)}
.u-stat .st span{grid-area:1/1;opacity:0;text-align:right}
.u-stat .m{animation:stt-m 4s cubic-bezier(.2,.8,.2,1) infinite}
.u-stat .s1{animation:stt-1 4s steps(1) infinite}.u-stat .s2{animation:stt-2 4s steps(1) infinite}.u-stat .s3{animation:stt-3 4s steps(1) infinite;color:var(--accent)}
@keyframes stt-m{0%,8%{opacity:0;transform:translateY(.6em)}14%,92%{opacity:1;transform:none}100%{opacity:0}}
@keyframes stt-1{0%{opacity:0}10%{opacity:1}32%{opacity:0}}
@keyframes stt-2{0%{opacity:0}32%{opacity:1}58%{opacity:0}}
@keyframes stt-3{0%{opacity:0}58%{opacity:1}94%{opacity:0}}

.u-undo .it{display:flex;align-items:center;gap:.6em;padding:.5em .2em;border-bottom:.1em solid var(--rule)}
.u-undo .it .ln{flex:1}
.u-undo .gone{overflow:hidden;animation:und-g 4s cubic-bezier(.4,0,.2,1) infinite}
.u-undo .sn{position:absolute;left:.6em;right:.6em;bottom:.9em;display:flex;justify-content:space-between;padding:.7em .8em;border-radius:.6em;background:var(--ink);color:var(--bg);font-size:.8em;animation:und-s 4s cubic-bezier(.2,.8,.2,1) infinite}
@keyframes und-s{0%,18%{transform:translateY(160%)}24%,56%{transform:none}62%,100%{transform:translateY(160%)}}
.u-undo .sn b{color:var(--inv-accent)}
.u-undo .tap{left:80%;top:89%;animation-delay:-3.76s}
@keyframes und-g{0%,10%{max-height:3em;opacity:1;transform:none;padding-block:.5em}20%{opacity:0;transform:translateX(-100%)}26%,54%{max-height:0;opacity:0;padding-block:0;transform:translateX(-100%)}62%{max-height:3em;padding-block:.5em;opacity:0;transform:none}70%,100%{max-height:3em;opacity:1;transform:none;padding-block:.5em}}

.u-rec .pan{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.7em}
.u-rec .in{display:flex;align-items:center;gap:.5em;height:2.6em;padding:0 .8em;border-radius:1.4em;border:.14em solid var(--frame);color:var(--ink-3);font-size:.9em;animation:rec-b 4s infinite}
.u-rec .in::before{content:"";width:.8em;height:.8em;border:.15em solid currentColor;border-radius:50%}
.u-rec .ls{display:flex;flex-direction:column;gap:.5em;font-size:.85em;animation:rec-l 4s cubic-bezier(.2,.8,.2,1) infinite}
.u-rec .ls b{font-family:var(--f-mono);font-size:.8em;color:var(--ink-3);font-weight:400}
.u-rec .ls span{display:flex;align-items:center;gap:.5em}
.u-rec .ls span::before{content:"↺";color:var(--ink-3)}
.u-rec .ch{display:flex;gap:.4em;flex-wrap:wrap}
.u-rec .ch i{font-style:normal;padding:.2em .6em;border-radius:1em;background:var(--accent-soft);font-size:.9em}
@keyframes rec-b{0%,14%{border-color:var(--frame)}20%,88%{border-color:var(--accent)}96%,100%{border-color:var(--frame)}}
@keyframes rec-l{0%,16%{opacity:0;transform:translateY(-.4em)}24%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}

.u-prog .pan{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.7em}
.u-prog .op{display:flex;align-items:center;justify-content:space-between;font-size:.9em}
.u-prog .tg{animation:none;background:var(--accent)}
.u-prog .tg b{transform:translateX(2em)}
.u-prog .sc3 .tg{background:var(--line)}.u-prog .sc3 .tg b{transform:none}
.u-prog .adv{display:flex;align-items:center;gap:.4em;color:var(--accent);font-size:.85em;font-weight:600}
.u-prog .adv i{width:.45em;height:.45em;border:solid currentColor;border-width:0 .14em .14em 0;transform:rotate(45deg);animation:prg-c 4s infinite}
.u-prog .more{display:flex;flex-direction:column;gap:.7em;overflow:hidden;animation:prg-x 4s cubic-bezier(.4,0,.2,1) infinite}
.u-prog .tap{left:22%;animation-delay:-1s}
@keyframes prg-x{0%,24%{max-height:0;opacity:0}36%,82%{max-height:8em;opacity:1}94%,100%{max-height:0;opacity:0}}
@keyframes prg-c{0%,24%{transform:rotate(45deg)}32%,84%{transform:rotate(225deg)}92%,100%{transform:rotate(45deg)}}

.u-opt .row{display:flex;flex-direction:column;gap:.7em;width:22em}
.u-opt .ln2{display:grid;grid-template-columns:6em 1fr;align-items:center;gap:.8em}
.u-opt .lb{font-family:var(--f-mono);font-size:.8em;color:var(--ink-2);text-align:right}
.u-opt .bx{display:flex;align-items:center;gap:.6em;height:3.2em;padding:0 .9em;border-radius:.8em;background:var(--ui);border:.1em solid var(--rule)}
.u-opt .bx svg{width:1.8em;height:1.8em;stroke:var(--ink-3);stroke-width:1.8;fill:var(--ui);transition:none}
.u-opt .bx em{font-style:normal;font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
.u-opt .a svg{animation:opt-a 4s infinite}
.u-opt .b svg{animation:opt-b 4s infinite}
.u-opt .b .spn{width:1.6em;height:1.6em;border-width:.22em;opacity:0;animation:spin .8s linear infinite,opt-s 4s infinite}
.u-opt .tap{left:calc(6.8em + 1.8em);animation-delay:-1.28s}
.u-opt .t1{top:1.6em}.u-opt .t2{top:5.5em}
.u-opt .wr{position:relative}
@keyframes opt-a{0%,16%{fill:var(--ui);stroke:var(--ink-3)}17%,92%{fill:var(--danger);stroke:var(--danger)}100%{fill:var(--ui)}}
@keyframes opt-b{0%,58%{fill:var(--ui);stroke:var(--ink-3)}60%,92%{fill:var(--danger);stroke:var(--danger)}100%{fill:var(--ui)}}
@keyframes opt-s{0%,17%{opacity:0}19%,57%{opacity:1}59%,100%{opacity:0}}

.u-jakob .pg{position:relative;width:24em;height:14em;padding:1em;display:flex;flex-direction:column;gap:.8em}
.u-jakob .nv{display:flex;align-items:center;gap:.8em;height:2.2em}
.u-jakob .lg{width:3.4em;height:1.4em;border-radius:.4em;background:var(--ink);animation:jk-a 4s cubic-bezier(.3,.7,.2,1.2) infinite}
.u-jakob .sr{flex:1;height:1.8em;border-radius:1em;border:.12em solid var(--frame);animation:jk-b 4s cubic-bezier(.3,.7,.2,1.2) infinite}
.u-jakob .ct{width:1.8em;height:1.8em;border-radius:.4em;border:.15em solid var(--ink);position:relative;animation:jk-c 4s cubic-bezier(.3,.7,.2,1.2) infinite}
.u-jakob .ct::after{content:"2";position:absolute;right:-.6em;top:-.6em;width:1.2em;height:1.2em;border-radius:50%;background:var(--danger);color:var(--danger-ink);font-size:.7em;display:grid;place-items:center;font-weight:700}
.u-jakob .bd{display:grid;grid-template-columns:repeat(3,1fr);gap:.6em;flex:1}
.u-jakob .bd span{border-radius:.6em;background:var(--accent-soft)}
.u-jakob .tgl{position:absolute;font-family:var(--f-mono);font-size:.7em;color:var(--accent);opacity:0;animation:jk-t 4s infinite}
@keyframes jk-a{0%,10%{transform:translate(14em,8em) rotate(-20deg);opacity:0}30%,88%{transform:none;opacity:1}100%{opacity:0}}
@keyframes jk-b{0%,16%{transform:translateY(9em) scaleX(.4);opacity:0}36%,88%{transform:none;opacity:1}100%{opacity:0}}
@keyframes jk-c{0%,22%{transform:translate(-16em,8em) rotate(25deg);opacity:0}42%,88%{transform:none;opacity:1}100%{opacity:0}}
@keyframes jk-t{0%,46%{opacity:0}54%,88%{opacity:1}96%,100%{opacity:0}}
`,
  items: [
    {
      id: 'u-stat', k: '시스템 상태 보여주기', e: 'Visibility of system status',
      d: '지금 무슨 일이 일어나고 있는지 항상 알려줘야 해요. 보내는 중인지, 보냈는지, 읽었는지 알면 사람들은 기다릴 수 있어요.',
      u: '닐슨 휴리스틱 1번이에요. 버튼을 누르면 즉시 상태를 바꾸고, 진행 중·완료·실패를 구분해서 보여주세요. 아무 반응이 없으면 사람들은 같은 버튼을 여러 번 눌러요.',
      html: `<div class="ph s"><div class="scr"><span class="bb o">면접 결과 언제 나와요?</span><span class="bb m">오늘 저녁 7시예요</span><span class="st"><span class="s1">보내는 중…</span><span class="s2">보냄</span><span class="s3">읽음 ✓✓</span></span></div></div>`
    },
    {
      id: 'u-undo', k: '되돌리기', e: 'User control · Undo',
      d: '실수는 반드시 일어나요. "정말 삭제할까요?"를 묻기보다 일단 실행하고 바로 되돌릴 수 있게 하는 편이 대부분 더 빠르고 안전해요.',
      u: '닐슨 휴리스틱 3번(사용자 통제와 자유), 5번(오류 예방)과 연결돼요. 되돌릴 수 있는 동작은 확인 창 대신 되돌리기를, 정말 되돌릴 수 없는 결제·영구 삭제만 확인 창을 쓰세요. 확인 창이 너무 많으면 읽지 않고 누르게 돼요.',
      html: `<div class="ph s"><div class="scr"><span class="ln h" style="width:45%"></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it gone"><span class="av" style="background:var(--accent)"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span><span class="it"><span class="av"></span><span class="ln"></span></span></div><div class="sn"><span>삭제했어요</span><b>되돌리기</b></div><span class="tap"></span></div>`
    },
    {
      id: 'u-rec', k: '기억보다 알아보기', e: 'Recognition rather than recall',
      d: '사람에게 기억해서 입력하게 하지 말고, 보고 고를 수 있게 보여주세요. 고르는 건 떠올리는 것보다 훨씬 쉬워요.',
      u: '닐슨 휴리스틱 6번이에요. 최근 검색어, 자주 쓰는 항목, 자동 완성, 이전에 입력한 주소처럼 이미 알고 있는 정보를 먼저 꺼내 주세요. 아이콘만 있는 메뉴보다 아이콘 + 글자가 알아보기 쉬워요.',
      html: `<div class="pan box"><span class="in">검색</span><div class="ls"><b>최근 검색</b><span>UX 디자이너 면접 질문</span><span>포트폴리오 리뷰</span><div class="ch"><i>자기소개</i><i>지원 동기</i><i>협업 경험</i></div></div></div>`
    },
    {
      id: 'u-prog', k: '점진적 공개', e: 'Progressive disclosure',
      d: '처음에는 꼭 필요한 것만 보여주고, 자세한 옵션은 원하는 사람만 펼쳐 보게 하는 방식이에요.',
      u: '대부분이 쓰는 설정 2~3개만 바로 보여주고 나머지는 "고급 설정"이나 다음 단계로 숨기세요. 숨긴 곳은 찾기 쉬운 이름이어야 하고, 두 단계 이상 깊이 숨기면 아무도 못 찾아요.',
      html: `<div class="pan box"><span class="op">알림 받기<span class="tg"><b></b></span></span><span class="op">소리<span class="tg"><b></b></span></span><span class="adv">고급 설정 <i></i></span><div class="more"><span class="op sc3">야간 방해 금지<span class="tg"><b></b></span></span><span class="op sc3">요약 알림<span class="tg"><b></b></span></span></div><span class="tap" style="top:75%"></span></div>`
    },
    {
      id: 'u-opt', k: '낙관적 UI', e: 'Optimistic UI',
      d: '서버 응답을 기다리지 않고 성공했다고 가정해 화면을 먼저 바꾸고, 실패하면 그때 되돌리는 방식이에요.',
      u: '좋아요, 메시지 보내기, 할 일 체크처럼 거의 항상 성공하는 가벼운 동작에 써요. 실패하면 조용히 되돌리지 말고 "전송 실패 · 다시 시도"처럼 꼭 알려주세요. 결제처럼 실패하면 곤란한 동작에는 쓰지 마세요.',
      html: `<div class="wr"><div class="row"><div class="ln2 a"><span class="lb">낙관적</span><span class="bx"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><em>바로 반영</em></span></div><div class="ln2 b"><span class="lb">기다리기</span><span class="bx"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><span class="spn"></span><em>응답 후 반영</em></span></div></div><span class="tap t1"></span><span class="tap t2"></span></div>`
    },
    {
      id: 'u-jakob', k: '제이콥의 법칙', e: "Jakob's law",
      d: '사용자는 대부분의 시간을 다른 서비스에서 보내요. 그래서 내 서비스도 이미 익숙한 다른 서비스처럼 작동하길 기대해요.',
      u: '로고는 왼쪽 위(누르면 홈), 검색은 위쪽, 장바구니와 프로필은 오른쪽 위처럼 관습적인 자리를 지키세요. 새로운 방식을 쓰고 싶다면 그만큼 확실히 나아야 하고, 처음 쓸 때 안내가 필요해요.',
      html: `<div class="pg box"><div class="nv"><span class="lg"></span><span class="sr"></span><span class="ct"></span></div><div class="bd"><span></span><span></span><span></span></div><span class="tgl" style="left:1em;top:3.4em">로고 → 홈</span><span class="tgl" style="right:1em;top:3.4em">장바구니</span></div>`
    }
  ]
});
