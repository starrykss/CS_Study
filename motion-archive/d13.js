(window.UX = window.UX || []).push({
  id: 's-dark', short: '다크 패턴', en: 'Dark patterns',
  title: '쓰면 안 되는 다크 패턴',
  sub: '사용자를 헷갈리게 해서 원치 않는 선택을 하게 만드는 설계예요. 한국은 2025년 2월부터 개정 전자상거래법으로 아래 6가지 유형을 규제해요.',
  css: `
.sc .law{position:absolute;right:1em;top:1em;padding:.25em .6em;border-radius:.4em;background:var(--danger-soft);color:var(--danger);font-family:var(--f-mono);font-size:.7em;font-weight:500;z-index:5}
.dp-drip .pan{width:18em;padding:1.3em 1.5em;display:flex;flex-direction:column;gap:.45em;font-variant-numeric:tabular-nums}
.dp-drip .rw{justify-content:space-between;font-size:.9em}
.dp-drip .rw span:last-child{font-family:var(--f-mono)}
.dp-drip .ad{color:var(--danger);animation:drip-a 4.5s cubic-bezier(.2,.8,.2,1) infinite backwards}
.dp-drip .a2{animation-delay:.5s}
.dp-drip .tt{margin-top:.4em;padding-top:.6em;border-top:.12em solid var(--rule);font-weight:700;font-size:1.05em}
.dp-drip .tt .v{display:grid;text-align:right}
.dp-drip .tt .v span{grid-area:1/1}
.dp-drip .v1{animation:drip-1 4.5s steps(1) infinite}.dp-drip .v2{opacity:0;color:var(--danger);animation:drip-2 4.5s steps(1) infinite}.dp-drip .v3{opacity:0;color:var(--danger);animation:drip-3 4.5s steps(1) infinite}
@keyframes drip-a{0%,22%{opacity:0;max-height:0;transform:translateX(-.8em)}30%,90%{opacity:1;max-height:2em;transform:none}100%{opacity:0;max-height:0}}
@keyframes drip-1{0%{opacity:1}30%{opacity:0}96%{opacity:1}}
@keyframes drip-2{0%{opacity:0}30%{opacity:1}41%{opacity:0}}
@keyframes drip-3{0%{opacity:0}41%{opacity:1}96%{opacity:0}}

.dp-pre .pan{width:19em;padding:1.3em;display:flex;flex-direction:column;gap:.8em}
.dp-pre .op{display:flex;align-items:flex-start;gap:.6em;font-size:.85em;line-height:1.4}
.dp-pre .op .x{width:1.6em;height:1.6em}
.dp-pre .op .x::after{left:.38em;top:.06em;width:.38em;height:.8em}
.dp-pre .op em{font-style:normal;color:var(--ink-3)}
.dp-pre .hl{margin:-.4em;padding:.4em;border-radius:.5em;animation:pre-h 4s infinite}
.dp-pre .bt{animation:press 4s infinite;animation-delay:-.32s}
.dp-pre .cur{left:60%;top:84%;animation:pre-c 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes pre-h{0%,50%{box-shadow:none}58%,90%{box-shadow:0 0 0 .18em var(--danger)}100%{box-shadow:none}}
@keyframes pre-c{0%,6%{transform:translate(2em,-7em)}38%,100%{transform:none}}

.dp-hier .pan{width:18em;padding:1.6em 1.4em;display:flex;flex-direction:column;align-items:center;gap:.8em;text-align:center}
.dp-hier b{font-size:1.15em;line-height:1.35}
.dp-hier .sub{font-size:.85em;color:var(--ink-2)}
.dp-hier .bt{align-self:stretch;font-size:1.05em;padding:.8em 0;animation:hier-p 2s ease-in-out infinite}
.dp-hier .q{font-size:.7em;color:var(--ink-3);position:relative}
.dp-hier .q::after{content:"";position:absolute;inset:-.5em -.8em;border-radius:.4em;border:.15em dashed var(--danger);opacity:0;animation:hier-q 4s infinite}
@keyframes hier-p{50%{transform:scale(1.03)}}
@keyframes hier-q{0%,40%{opacity:0}50%,90%{opacity:1}100%{opacity:0}}

.dp-block .wr{display:flex;flex-direction:column;gap:1.6em;width:27em}
.dp-block .row{display:grid;grid-template-columns:3.4em 1fr;align-items:center;gap:.8em}
.dp-block .lb{font-size:.9em;font-weight:600}
.dp-block .st{display:flex;align-items:center;gap:.35em}
.dp-block .st i{width:3.6em;height:4.4em;border-radius:.6em;border:.12em solid var(--frame);background:var(--ui);display:grid;place-items:center;font-style:normal;font-size:.7em;color:var(--ink-3);text-align:center;line-height:1.25;padding:.25em;flex:none;word-break:keep-all}
.dp-block .st b{width:.8em;height:.12em;background:var(--frame);flex:none}
.dp-block .go i{border-color:var(--accent);background:var(--accent-soft);color:var(--ink);animation:none}
.dp-block .q i{animation:blk-k 5s infinite backwards}
.dp-block .q i:nth-of-type(2){animation-delay:.6s}.dp-block .q i:nth-of-type(3){animation-delay:1.2s}.dp-block .q i:nth-of-type(4){animation-delay:1.8s}.dp-block .q i:nth-of-type(5){animation-delay:2.4s}
.dp-block .cnt{font-family:var(--f-mono);font-size:.75em;color:var(--danger);margin-left:.4em}
@keyframes blk-k{0%,6%{border-color:var(--frame);background:var(--ui)}12%,88%{border-color:var(--danger);background:var(--danger-soft);color:var(--ink)}96%,100%{border-color:var(--frame);background:var(--ui)}}

.dp-nag .dm{animation:nag-d 4.5s infinite}
.dp-nag .md{position:absolute;left:50%;top:50%;width:8.6em;padding:1em .9em .8em;display:flex;flex-direction:column;align-items:center;gap:.6em;text-align:center;font-size:.85em;border-radius:1em;animation:nag-m 4.5s cubic-bezier(.2,.9,.3,1.2) infinite}
.dp-nag .md b{font-size:1.05em}
.dp-nag .md .bt{align-self:stretch;font-size:.95em;padding:.4em 0}
.dp-nag .md .no{font-size:.85em;color:var(--ink-3)}
.dp-nag .ct{position:absolute;right:.8em;top:1.7em;font-family:var(--f-mono);font-size:.7em;color:var(--danger);display:grid;z-index:3}
.dp-nag .ct span{grid-area:1/1;opacity:0}
.dp-nag .c1{animation:nag-1 4.5s steps(1) infinite}.dp-nag .c2{animation:nag-2 4.5s steps(1) infinite}.dp-nag .c3{animation:nag-3 4.5s steps(1) infinite}
@keyframes nag-d{0%,4%,28%,38%,60%,70%,92%,100%{opacity:0}8%,24%,42%,56%,74%,88%{opacity:1}}
@keyframes nag-m{0%,4%,28%,38%,60%,70%,92%,100%{opacity:0;transform:translate(-50%,-50%) scale(.85)}8%,24%,42%,56%,74%,88%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes nag-1{0%{opacity:0}6%{opacity:1}36%{opacity:0}}
@keyframes nag-2{0%{opacity:0}40%{opacity:1}68%{opacity:0}}
@keyframes nag-3{0%{opacity:0}72%{opacity:1}96%{opacity:0}}

.dp-renew .pan{width:23em;padding:1.4em 1.5em 1.6em;display:flex;flex-direction:column;gap:1em}
.dp-renew .tl{position:relative;height:.5em;border-radius:1em;background:var(--line);margin:1.6em .6em .6em}
.dp-renew .tl b{position:absolute;left:0;top:0;bottom:0;border-radius:1em;background:var(--accent);animation:rnw-w 4.5s linear infinite}
.dp-renew .dt{position:absolute;top:50%;width:1em;height:1em;margin:-.5em;border-radius:50%;background:var(--ui);border:.18em solid var(--frame)}
.dp-renew .dt span{position:absolute;bottom:1.5em;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:.75em;color:var(--ink-2)}
.dp-renew .d3{border-color:var(--danger);animation:rnw-d 4.5s infinite}
.dp-renew .bell{position:absolute;left:58%;top:1.8em;font-size:.7em;color:var(--ink-3);text-decoration:line-through;white-space:nowrap}
.dp-renew .ch{align-self:center;display:flex;align-items:center;gap:.5em;padding:.5em 1em;border-radius:.6em;background:var(--danger-soft);color:var(--danger);font-weight:700;font-size:.95em;opacity:0;animation:rnw-c 4.5s cubic-bezier(.2,.8,.2,1.3) infinite}
@keyframes rnw-w{0%,4%{width:0}80%,100%{width:100%}}
@keyframes rnw-d{0%,78%{transform:none}84%{transform:scale(1.5)}90%,100%{transform:none}}
@keyframes rnw-c{0%,78%{opacity:0;transform:scale(.8)}84%,96%{opacity:1;transform:none}100%{opacity:0}}
`,
  items: [
    {
      id: 'dp-drip', k: '순차 공개 가격', e: 'Drip pricing',
      d: '처음에는 싼 가격만 보여주고, 결제 단계로 갈수록 수수료·배송비 같은 필수 비용을 하나씩 더해 최종 금액을 늦게 알려주는 방식이에요.',
      u: '첫 화면부터 꼭 내야 하는 금액을 포함한 총액을 보여주세요. 고객이 마지막에 놀라면 결제를 포기하고, 다시 오지 않아요. 한국 개정 전자상거래법의 규제 유형 중 하나예요.',
      html: `<span class="law">규제 대상</span><div class="pan box"><span class="rw"><span>상품 가격</span><span>9,900원</span></span><span class="rw ad"><span>서비스 수수료</span><span>+2,500원</span></span><span class="rw ad a2"><span>필수 포장비</span><span>+2,000원</span></span><span class="rw tt"><span>결제 금액</span><span class="v"><span class="v1">9,900원</span><span class="v2">12,400원</span><span class="v3">14,400원</span></span></span></div>`
    },
    {
      id: 'dp-pre', k: '사전 선택', e: 'Pre-selection',
      d: '유료 옵션이나 추가 상품을 미리 체크해 둬서, 사용자가 눈치채지 못하면 그대로 결제되게 만드는 방식이에요.',
      u: '추가 비용이 드는 선택지는 처음에 꺼진 상태로 두세요. 이전에 쓴 배송지를 미리 채우는 것처럼 사용자에게 도움이 되는 기본값은 괜찮아요. 기본값 효과를 사용자 손해 쪽으로 쓰면 다크 패턴이에요.',
      html: `<span class="law">규제 대상</span><div class="pan box"><span class="ln h" style="width:45%"></span><span class="op"><span class="x on"></span><span>상품 1개<br><em>29,000원</em></span></span><span class="op hl"><span class="x on"></span><span>여행자 보험 추가<br><em>+3,900원</em></span></span><span class="bt">32,900원 결제하기</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
    },
    {
      id: 'dp-hier', k: '잘못된 위계', e: 'False hierarchy',
      d: '해지·거절 같은 선택지는 작고 흐리게, 회사가 원하는 선택지만 크고 눈에 띄게 만들어 한쪽으로 몰아가는 방식이에요.',
      u: '두 선택지를 비슷한 크기와 무게로 보여주세요. "아니요, 혜택 필요 없어요"처럼 거절하는 사람을 부끄럽게 만드는 문구(컨펌셰이밍)도 피하세요. 구매·가입·해지 선택에서는 규제 대상이에요.',
      html: `<span class="law">규제 대상</span><div class="pan box"><b>정말 해지하시겠어요?<br>혜택이 모두 사라져요</b><span class="sub">이번 달 무료 쿠폰 3장</span><span class="bt">혜택 계속 받기</span><span class="q">그래도 해지할게요</span></div>`
    },
    {
      id: 'dp-block', k: '취소·탈퇴 방해', e: 'Obstruction · Roach motel',
      d: '가입은 한 번에 되는데 해지나 탈퇴는 여러 화면과 설문, 확인을 거치게 하거나 메뉴를 찾기 어렵게 숨기는 방식이에요.',
      u: '해지는 가입만큼 쉬워야 해요. 해지 이유를 묻는 건 괜찮지만 필수로 만들지 말고, 붙잡는 화면은 한 번이면 충분해요. 단계 수와 메뉴 위치가 규제 판단 기준이 될 수 있어요.',
      html: `<span class="law">규제 대상</span><div class="wr"><div class="row go"><span class="lb">가입</span><div class="st"><i>가입 완료</i></div></div><div class="row q"><span class="lb">해지</span><div class="st"><i>설정</i><b></b><i>정말요?</i><b></b><i>설문</i><b></b><i>혜택 안내</i><b></b><i>비밀번호</i><span class="cnt">5단계</span></div></div></div>`
    },
    {
      id: 'dp-nag', k: '반복 간섭', e: 'Nagging',
      d: '사용자가 이미 거절했는데도 같은 요청 팝업을 계속 띄워 결국 "예"를 누르게 만드는 방식이에요.',
      u: '거절한 요청은 기억하고, 다시 물어볼 때는 충분한 기간을 두세요. "다시 보지 않기" 선택지를 주는 것도 방법이에요. 알림 권한은 사용자가 그 기능을 쓰려는 순간에 이유와 함께 물어보는 게 가장 효과적이에요.',
      html: `<span class="law">규제 대상</span><div class="ph s"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div><span class="dm"></span><div class="md box"><b>알림을 켤까요?</b><span class="bt">켜기</span><span class="no">나중에</span></div><span class="ct"><span class="c1">1번째</span><span class="c2">2번째</span><span class="c3">3번째</span></span></div>`
    },
    {
      id: 'dp-renew', k: '숨은 갱신', e: 'Hidden renewal',
      d: '무료 체험이 끝나거나 가격이 오를 때 제대로 알리지 않고, 동의 없이 유료로 바꾸거나 오른 금액을 결제하는 방식이에요.',
      u: '무료 체험이 유료로 바뀌기 전, 그리고 정기 결제 금액이 오르기 전에 미리 알리고 동의를 받으세요. 개정 전자상거래법은 유료 전환·가격 인상 시 추가 동의와 사전 고지를 요구해요.',
      html: `<span class="law">규제 대상</span><div class="pan box"><div class="tl"><b></b><span class="dt" style="left:0"><span>무료 체험 시작</span></span><span class="dt" style="left:50%"><span>7일째</span></span><span class="bell">결제 예정 알림 없음</span><span class="dt d3" style="left:100%"><span>자동 결제</span></span></div><span class="ch">₩14,900 결제됐어요</span></div>`
    }
  ]
});
