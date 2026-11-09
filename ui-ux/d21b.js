(() => {
const s = window.UX.find(x => x.id === 's-retain');
s.css += `
.r-onb .ph .scr{align-items:center;justify-content:center;text-align:center}
.r-onb .tour{position:absolute;inset:0;display:flex;width:300%;animation:onb-t 6s cubic-bezier(.4,0,.2,1) infinite}
.r-onb .tour>div{width:33.333%;padding:2.2em 1em 1em;display:flex;flex-direction:column;align-items:center;gap:.6em}
.r-onb .tour .im{width:100%;height:6em}
.r-onb .skip{position:absolute;right:.8em;top:1.4em;font-size:.7em;color:var(--ink-3);z-index:2}
.r-onb .dts{position:absolute;left:0;right:0;bottom:1.4em;display:flex;justify-content:center;gap:.3em;z-index:2}
.r-onb .dts i{width:.45em;height:.45em;border-radius:50%;background:var(--line)}
.r-onb .dts i:nth-child(1){animation:onb-d1 6s steps(1) infinite}.r-onb .dts i:nth-child(2){animation:onb-d2 6s steps(1) infinite}.r-onb .dts i:nth-child(3){animation:onb-d3 6s steps(1) infinite}
.r-onb .live .scr{justify-content:flex-start;text-align:left;align-items:stretch}
.r-onb .live .q{font-size:.85em;font-weight:700}
.r-onb .live .rec{align-self:center;margin-top:auto;width:3.4em;height:3.4em;border-radius:50%;background:var(--danger);box-shadow:0 0 0 0 color-mix(in srgb,var(--danger) 45%,transparent);animation:onb-r 1.6s ease-out infinite}
.r-onb .live .hint{align-self:center;padding:.3em .7em;border-radius:.5em;background:var(--ink);color:var(--bg);font-size:.7em;margin-bottom:.4em}
@keyframes onb-t{0%,28%{transform:none}33.3%,61%{transform:translateX(-33.333%)}66.6%,94%{transform:translateX(-66.666%)}100%{transform:none}}
@keyframes onb-d1{0%{background:var(--accent)}33.3%{background:var(--line)}}
@keyframes onb-d2{0%{background:var(--line)}33.3%{background:var(--accent)}66.6%{background:var(--line)}}
@keyframes onb-d3{0%{background:var(--line)}66.6%{background:var(--accent)}}
@keyframes onb-r{to{box-shadow:0 0 0 1em transparent}}

.r-check .pan{width:20em;padding:1.3em;display:flex;flex-direction:column;gap:.7em}
.r-check .hd6{display:flex;justify-content:space-between;align-items:baseline}
.r-check .hd6 b{font-size:1em}
.r-check .hd6 span{font-family:var(--f-mono);font-size:.8em;color:var(--accent)}
.r-check .br{height:.5em;border-radius:1em;background:var(--line);overflow:hidden}
.r-check .br i{display:block;height:100%;width:66%;border-radius:1em;background:var(--accent);animation:chk-w 4s cubic-bezier(.4,0,.2,1) infinite}
.r-check .li{display:flex;align-items:center;gap:.6em;font-size:.88em}
.r-check .li .x{width:1.5em;height:1.5em}
.r-check .li .x::after{left:.36em;top:.06em;width:.36em;height:.75em}
.r-check .dn5{color:var(--ink-3);text-decoration:line-through}
.r-check .nx{padding:.5em .6em;margin:0 -.6em;border-radius:.6em;background:var(--accent-soft)}
.r-check .nx .x{animation:xOn 4s infinite;animation-delay:-.4s}
.r-check .nx em{margin-left:auto;font-style:normal;font-size:.8em;color:var(--accent);font-weight:600}
@keyframes chk-w{0%,24%{width:66%}36%,84%{width:100%}96%,100%{width:66%}}

.r-perm .ph .scr{align-items:center;justify-content:center;text-align:center;gap:.7em}
.r-perm .bl2{width:3.6em;height:3.6em;border-radius:50%;background:var(--accent-soft);display:grid;place-items:center}
.r-perm .bl2 svg{width:1.8em;height:1.8em;fill:none;stroke:var(--accent);stroke-width:2}
.r-perm .scr b{font-size:.95em}
.r-perm .scr .sm2{font-size:.72em;color:var(--ink-2);line-height:1.5}
.r-perm .scr .bt{align-self:stretch;font-size:.82em}
.r-perm .scr .lt{font-size:.72em;color:var(--ink-3)}
.r-perm .dm{animation:alt-d 4s infinite;animation-delay:-3.04s}
.r-perm .sys{position:absolute;left:50%;top:50%;width:10.5em;border-radius:1em;background:var(--ui);text-align:center;overflow:hidden;font-size:.75em;z-index:3;animation:alt-i 4s cubic-bezier(.2,.8,.2,1) infinite;animation-delay:-3.04s;border:.1em solid var(--rule)}
.r-perm .sys p{padding:.8em .6em;margin:0;font-weight:600}
.r-perm .sys div{display:grid;grid-template-columns:1fr 1fr;border-top:.1em solid var(--rule)}
.r-perm .sys span{padding:.55em 0;color:#0A84FF;white-space:nowrap}
.r-perm .sys span+span{border-left:.1em solid var(--rule);font-weight:600}
.r-perm .tap{left:50%;top:69%;animation-delay:-.32s}

.r-push .ls2{position:relative;width:13em;height:21em;border-radius:2em;overflow:hidden;border:.14em solid var(--frame);background:linear-gradient(170deg,#2b3a67,#6b4f8f 60%,#c27a8e)}
.r-push .ck{position:absolute;left:0;right:0;top:2.6em;text-align:center;color:#fff;font-size:3em;font-weight:300;letter-spacing:-.03em;line-height:1}
.r-push .dt2{position:absolute;left:0;right:0;top:1.6em;text-align:center;color:rgba(255,255,255,.85);font-size:.75em}
.r-push .nt2{position:absolute;left:.6em;right:.6em;top:9.4em;padding:.7em .8em;border-radius:1em;background:rgba(255,255,255,.82);color:#15181c;display:flex;gap:.6em;font-size:.72em;line-height:1.4;box-shadow:0 .4em 1em -.4em rgba(0,0,0,.4);animation:psh-k 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.r-push .nt2 i{flex:none;width:2.6em;height:2.6em;border-radius:.6em;background:#0C9B72}
.r-push .nt2 b{display:block}
.r-push .nt2 span{color:#444}
.r-push .n2{top:14.2em;opacity:.0;animation:psh-k 4s .4s cubic-bezier(.2,.8,.2,1.2) infinite backwards}
@keyframes psh-k{0%,10%{opacity:0;transform:translateY(-1.4em) scale(.95)}20%,88%{opacity:1;transform:none}96%,100%{opacity:0}}

.r-inv .pan{width:20em;padding:1.4em;display:flex;flex-direction:column;gap:.8em;align-items:center;text-align:center}
.r-inv .gift{width:3.6em;height:3.2em;position:relative;border-radius:.3em;background:var(--accent);animation:inv-g 2s ease-in-out infinite}
.r-inv .gift::before{content:"";position:absolute;left:-.3em;right:-.3em;top:-.3em;height:1em;border-radius:.3em;background:var(--accent);filter:brightness(1.15)}
.r-inv .gift::after{content:"";position:absolute;left:50%;top:-.3em;bottom:0;width:.6em;margin-left:-.3em;background:var(--warn)}
.r-inv b{font-size:1.05em;line-height:1.4}
.r-inv .cd2{display:flex;align-items:center;justify-content:space-between;gap:.6em;align-self:stretch;padding:.5em .5em .5em .9em;border-radius:.7em;border:.14em dashed var(--frame);font-family:var(--f-mono)}
.r-inv .cp2{display:grid;font-family:var(--f-txt);font-size:.8em}
.r-inv .cp2 span{grid-area:1/1;padding:.35em .8em;border-radius:.5em;background:var(--ink);color:var(--bg);white-space:nowrap;text-align:center}
.r-inv .q1{animation:btln-1 4s steps(1) infinite;animation-delay:-.2s}.r-inv .q2{opacity:0;background:var(--accent)!important;color:var(--accent-ink)!important;animation:btln-2 4s steps(1) infinite;animation-delay:-.2s}
.r-inv .tap{left:82%;top:79%;animation-delay:-.32s}
@keyframes inv-g{50%{transform:translateY(-.3em) rotate(-4deg)}}

.r-rep .pan{width:21em;padding:1.3em;display:flex;flex-direction:column;gap:.8em}
.r-rep .hd7{display:flex;justify-content:space-between;align-items:baseline}
.r-rep .hd7 b{font-size:1.05em}
.r-rep .hd7 span{font-family:var(--f-mono);font-size:.75em;color:var(--ink-3)}
.r-rep .st4{display:grid;grid-template-columns:repeat(3,1fr);gap:.5em}
.r-rep .st4 div{padding:.6em;border-radius:.6em;background:var(--stage);display:flex;flex-direction:column;gap:.1em}
.r-rep .st4 span{font-size:.7em;color:var(--ink-2)}
.r-rep .st4 b{font-size:1.3em;font-variant-numeric:tabular-nums}
.r-rep .st4 em{font-style:normal;font-family:var(--f-mono);font-size:.68em;color:var(--accent);opacity:0;animation:lab-d 4s infinite}
.r-rep .bars2{display:flex;align-items:flex-end;gap:.35em;height:3.4em}
.r-rep .bars2 i{flex:1;height:var(--h);border-radius:.25em .25em 0 0;background:var(--line);transform-origin:bottom;animation:dz-g 4s cubic-bezier(.3,.7,.2,1) infinite backwards;animation-delay:calc(var(--i) * .06s)}
.r-rep .bars2 i:last-child{background:var(--accent)}
`;
s.items.push(
  {
    id: 'r-onb', k: '온보딩: 설명보다 체험', e: 'Onboarding · Show, don’t tell',
    d: '기능 설명 슬라이드를 넘기게 하기보다, 첫 화면에서 바로 핵심 기능을 한 번 써 보게 하는 편이 훨씬 잘 기억되고 이탈도 적어요.',
    u: '소개 슬라이드는 대부분 건너뛰어요. 꼭 쓴다면 3장 이하, 건너뛰기를 항상 보이게 두세요. 가입 전에 체험부터 시키고, 가치를 느낀 다음에 가입을 요청하면 가입률이 올라가는 경우가 많아요.',
    html: `<div class="two">
<div class="col"><div class="ph s"><span class="skip">건너뛰기</span><div class="tour"><div><span class="im"></span><span class="ln h" style="width:70%"></span><span class="ln" style="width:85%"></span></div><div><span class="im" style="background:var(--warn-soft)"></span><span class="ln h" style="width:60%"></span><span class="ln" style="width:80%"></span></div><div><span class="im"></span><span class="ln h" style="width:65%"></span><span class="ln" style="width:75%"></span></div></div><div class="dts"><i></i><i></i><i></i></div></div><span class="cap">설명 슬라이드</span></div>
<span class="vs">vs</span>
<div class="col live"><div class="ph s"><div class="scr"><span class="q">Q. 1분 안에 자기소개를 해 보세요</span><span class="ln" style="width:80%"></span><span class="hint">눌러서 바로 시작</span><span class="rec"></span></div></div><span class="cap">바로 해 보기</span></div>
</div>`
  },
  {
    id: 'r-check', k: '온보딩 체크리스트', e: 'Onboarding checklist',
    d: '처음 해야 할 일 3~5개를 체크리스트로 보여주고, 하나씩 끝낼 때마다 진행률이 차요. 다음에 할 일이 분명해져요.',
    u: '첫 항목은 이미 끝난 상태(가입 완료 등)로 시작하면 진행 막대가 0이 아니어서 끝까지 해 볼 마음이 생겨요. 모두 끝내면 체크리스트를 치우고 작은 축하를 보여주세요.',
    html: `<div class="pan box"><div class="hd6"><b>시작하기</b><span>2 / 3</span></div><div class="br"><i></i></div><span class="li dn5"><span class="x on"></span>회원가입</span><span class="li dn5"><span class="x on"></span>희망 직무 고르기</span><span class="li nx"><span class="x"></span>첫 모의면접 해 보기<em>3분</em></span></div>`
  },
  {
    id: 'r-perm', k: '권한 요청 타이밍', e: 'Permission priming',
    d: '앱을 켜자마자 알림·위치 권한을 묻지 말고, 그 기능이 필요한 순간에 먼저 이유를 설명한 뒤 시스템 권한 창을 띄워요.',
    u: 'iOS의 시스템 권한 창은 한 번 거절하면 앱에서 다시 띄울 수 없고, 설정에서 직접 켜야 해요. 그래서 우리 화면에서 먼저 이유를 설명하고 "괜찮아요"라고 한 사람에게만 시스템 창을 띄우는 게 좋아요.',
    html: `<div class="ph"><div class="scr"><span class="bl2"><svg viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/></svg></span><b>면접 10분 전에 알려드릴까요?</b><span class="sm2">예약한 모의면접을 놓치지 않게 딱 한 번 알림을 보내요.</span><span class="bt">알림 받기</span><span class="lt">나중에</span></div><span class="dm"></span><div class="sys"><p>"면접연습"에서 알림을 보내고자 합니다</p><div><span>허용 안 함</span><span>허용</span></div></div><span class="tap"></span></div>`
  },
  {
    id: 'r-push', k: '푸시 알림', e: 'Push notifications',
    d: '앱 밖에서 사용자를 다시 불러오는 가장 강력한 수단이에요. 그래서 가장 쉽게 꺼지기도 해요.',
    u: '"새 소식이 있어요"보다 "목요일 10시 면접 예약이 내일이에요"처럼 그 사람에게만 해당하는 구체적인 내용을 쓰세요. 광고성 알림은 정보통신망법상 사전 동의를 받아야 하고, 야간(21시~08시)에는 별도 동의가 필요해요. 너무 자주 보내면 앱이 통째로 지워져요.',
    html: `<div class="ls2"><span class="dt2">11월 8일 일요일</span><span class="ck">9:41</span><div class="nt2"><i></i><div><b>면접연습 · 지금</b><span>내일 오전 10시 UX 디자이너 모의면접이 예약돼 있어요. 질문 미리 보기 ›</span></div></div><div class="nt2 n2"><i style="background:#5B4BFF"></i><div><b>면접연습 · 주간 리포트</b><span>이번 주 답변 속도가 12% 빨라졌어요.</span></div></div></div>`
  },
  {
    id: 'r-inv', k: '친구 초대', e: 'Referral',
    d: '사용자가 친구를 초대하면 두 사람 모두에게 혜택을 주는 방식이에요. 초대 코드나 링크를 한 번에 복사하거나 공유할 수 있어야 해요.',
    u: '"친구도 나도"처럼 양쪽 혜택을 앞세우면 부담이 줄어요. 초대 링크를 누른 친구가 바로 혜택이 적용된 상태로 가입하게 만드세요. 서비스에 만족한 순간(좋은 결과를 받은 직후 등)에 초대를 제안하면 효과가 커요.',
    html: `<div class="pan box"><span class="gift"></span><b>친구를 초대하면<br>둘 다 모의면접 3회 무료</b><div class="cd2">PLAY-7K2Q<span class="cp2"><span class="q1">복사</span><span class="q2">복사했어요</span></span></div><span class="tap"></span></div>`
  },
  {
    id: 'r-rep', k: '주간 리포트', e: 'Progress recap',
    d: '일주일 동안의 활동과 성장을 숫자와 그래프로 정리해 보여줘요. 내가 얼마나 나아졌는지 보이면 계속할 이유가 생겨요.',
    u: '다른 사람과의 비교보다 지난주의 나와 비교하는 게 대부분의 사람에게 더 동기가 돼요. 좋은 변화를 먼저 보여주고, 아쉬운 점은 다음 행동 제안과 함께 짧게 덧붙이세요.',
    html: `<div class="pan box"><div class="hd7"><b>이번 주 연습 리포트</b><span>11.2 – 11.8</span></div><div class="st4"><div><span>연습</span><b>7회</b><em>▲ 2회</em></div><div><span>답변 시간</span><b>58초</b><em>▼ 9초</em></div><div><span>자신감</span><b>4.2</b><em>▲ 0.6</em></div></div><div class="bars2"><i style="--h:40%;--i:0"></i><i style="--h:55%;--i:1"></i><i style="--h:30%;--i:2"></i><i style="--h:70%;--i:3"></i><i style="--h:60%;--i:4"></i><i style="--h:85%;--i:5"></i><i style="--h:100%;--i:6"></i></div></div>`
  }
);
})();
