(window.UX = window.UX || []).push({
  id: 's-a11y', short: '접근성', en: 'Accessibility',
  title: '모두가 쓸 수 있게',
  sub: '접근성은 장애가 있는 사람만을 위한 게 아니에요. 햇빛 아래서, 한 손으로, 급하게 쓰는 모두를 위한 거예요.',
  css: `
.a-focus .pan{position:relative;width:20em;padding:1.6em;display:flex;flex-direction:column;gap:.8em}
.a-focus .in{height:2.6em;border:.14em solid var(--frame);border-radius:.6em}
.a-focus .rw{gap:.6em}
.a-focus .bt{flex:1}
.a-focus .ring{position:absolute;left:1.35em;top:1.35em;width:calc(100% - 2.7em);height:3.1em;border-radius:.85em;box-shadow:0 0 0 .22em var(--accent),0 0 0 .5em var(--accent-soft);animation:fc-k 4s cubic-bezier(.4,0,.2,1) infinite}
.a-focus .key{position:absolute;right:-1.2em;bottom:-1.4em;padding:.35em .8em;border-radius:.4em;border:.12em solid var(--frame);border-bottom-width:.3em;background:var(--ui);font-family:var(--f-mono);font-size:.85em;animation:fc-t 1.33s infinite}
@keyframes fc-k{0%,28%{top:1.35em;left:1.35em;width:calc(100% - 2.7em);height:3.1em}34%,61%{top:4.5em;left:1.35em;width:calc(50% - 1.6em);height:2.6em}67%,94%{top:4.5em;left:calc(50% + .25em);width:calc(50% - 1.6em);height:2.6em}100%{top:1.35em;left:1.35em;width:calc(100% - 2.7em);height:3.1em}}
@keyframes fc-t{0%,15%,30%,100%{transform:none;border-bottom-width:.3em}20%,25%{transform:translateY(.15em);border-bottom-width:.15em}}

.a-color .wr{display:flex;flex-direction:column;gap:1em;width:21em;animation:clr-g 4s infinite}
.a-color .row{display:flex;flex-direction:column;gap:.35em}
.a-color .in{height:2.4em;border:.16em solid var(--danger);border-radius:.6em;display:flex;align-items:center;padding:0 .8em;font-size:.9em;color:var(--ink-2)}
.a-color .ok{border-color:#2DA44E}
.a-color .ms{display:flex;align-items:center;gap:.4em;font-size:.82em;color:var(--danger);font-weight:500}
.a-color .ms i{width:1.2em;height:1.2em;border-radius:50%;background:var(--danger);color:var(--danger-ink);display:grid;place-items:center;font-style:normal;font-weight:700;font-size:.85em}
.a-color .tgl{font-family:var(--f-mono);font-size:.75em;color:var(--ink-3)}
@keyframes clr-g{0%,30%{filter:none}40%,86%{filter:grayscale(1)}96%,100%{filter:none}}

.a-sr .pan{position:relative;width:19em;padding:1.2em;display:flex;flex-direction:column;gap:.6em}
.a-sr .im{height:5em;display:grid;place-items:center;color:var(--accent);font-size:.8em}
.a-sr .bt{font-size:.9em}
.a-sr .fr{position:absolute;border-radius:.6em;box-shadow:0 0 0 .2em #000,0 0 0 .38em #fff;animation:sr-f 6s steps(1) infinite}
.a-sr .say{position:absolute;left:50%;bottom:-3.4em;transform:translateX(-50%);width:20em;height:2.4em;border-radius:.6em;background:#111;color:#fff;font-size:.85em;display:grid;place-items:center;white-space:nowrap}
.a-sr .say span{grid-area:1/1;opacity:0}
.a-sr .s1{animation:sr-1 6s steps(1) infinite}.a-sr .s2{animation:sr-2 6s steps(1) infinite}.a-sr .s3{animation:sr-3 6s steps(1) infinite}
.a-sr .wrap2{position:relative;margin-bottom:2.4em}
@keyframes sr-f{0%{left:1.1em;top:1.1em;width:calc(100% - 2.2em);height:5.2em}33.3%{left:1.1em;top:6.6em;width:calc(100% - 2.2em);height:1.2em}66.6%{left:1.1em;top:8.2em;width:calc(100% - 2.2em);height:2.4em}}
@keyframes sr-1{0%{opacity:1}33.3%{opacity:0}}
@keyframes sr-2{0%{opacity:0}33.3%{opacity:1}66.6%{opacity:0}}
@keyframes sr-3{0%{opacity:0}66.6%{opacity:1}}

.a-text .pan{width:17em;padding:1.2em;display:flex;flex-direction:column;gap:.5em;animation:tx-p 5s ease-in-out infinite}
.a-text .pan b{font-weight:700;line-height:1.3}
.a-text .pan span{color:var(--ink-2);line-height:1.4}
.a-text .bt{align-self:stretch;font-size:inherit;white-space:normal}
.a-text .tgl{position:absolute;right:.8em;top:.6em;display:grid;font-family:var(--f-mono);font-size:.7em;color:var(--accent)}
.a-text .tgl span{grid-area:1/1}
.a-text .t1{animation:btln-1 5s steps(1) infinite;animation-delay:-.45s}.a-text .t2{opacity:0;animation:btln-2 5s steps(1) infinite;animation-delay:-.45s}
@keyframes tx-p{0%,20%{font-size:.85em}50%,80%{font-size:1.25em}100%{font-size:.85em}}

.a-mot .wr{display:flex;gap:1.4em}
.a-mot .vp{position:relative;width:10.4em;height:12em;border-radius:1em;overflow:hidden;border:.12em solid var(--frame);background:var(--ui)}
.a-mot .vp>div{position:absolute;inset:0;padding:1em;display:flex;flex-direction:column;gap:.6em;background:var(--ui)}
.a-mot .vp .im{height:3.6em}
.a-mot .full .b{animation:mot-s 4s cubic-bezier(.3,.7,.2,1) infinite}
.a-mot .red .b{animation:mot-f 4s ease infinite}
.a-mot .b .im{background:var(--warn-soft)}
.a-mot .cap{text-align:center}
@keyframes mot-s{0%,20%{transform:translateX(100%) scale(.9)}40%,80%{transform:none}100%{transform:translateX(100%) scale(.9)}}
@keyframes mot-f{0%,20%{opacity:0}40%,80%{opacity:1}100%{opacity:0}}

.a-touch .pan{position:relative;width:20em;height:12em;display:flex;align-items:center;justify-content:space-around}
.a-touch .ic2{position:relative;width:2.4em;height:2.4em;display:grid;place-items:center}
.a-touch .ic2 svg{width:2.4em;height:2.4em}
.a-touch .hit{position:absolute;left:50%;top:50%;width:4.4em;height:4.4em;margin:-2.2em;border-radius:.6em;border:.12em dashed var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent);animation:tch-h 4s infinite}
.a-touch .sz{position:absolute;left:50%;top:calc(50% + 2.8em);transform:translateX(-50%);font-family:var(--f-mono);font-size:.75em;color:var(--accent);white-space:nowrap}
.a-touch .fg{position:absolute;width:3.2em;height:3.2em;margin:-1.6em;border-radius:50%;background:var(--ink);opacity:0;animation:tch-f 4s infinite}
.a-touch .f1{left:27%;top:42%}.a-touch .f2{left:77%;top:44%;animation-delay:-2s}
@keyframes tch-h{0%,20%{opacity:.35}30%,90%{opacity:1}}
@keyframes tch-f{0%,40%{opacity:0;transform:scale(.6)}45%{opacity:.25;transform:scale(1)}55%,100%{opacity:0;transform:scale(1.3)}}
`,
  items: [
    {
      id: 'a-focus', k: '포커스 표시', e: 'Focus indicator',
      d: '키보드 Tab으로 이동할 때 지금 어느 요소에 있는지 보여주는 테두리예요. 마우스 없이 쓰는 사람에게는 커서와 같아요.',
      u: '디자인이 지저분해 보인다고 포커스 테두리를 지우면 키보드·스위치 사용자는 길을 잃어요. 지우지 말고 브랜드 색으로 예쁘게 다시 디자인하세요. 이동 순서도 화면을 읽는 순서와 같아야 해요.',
      html: `<div class="pan box"><span class="in"></span><span class="rw"><span class="bt g">취소</span><span class="bt">저장</span></span><i class="ring"></i><span class="key">Tab ⇥</span></div>`
    },
    {
      id: 'a-color', k: '색에만 의존하지 않기', e: 'Don’t rely on color alone',
      d: '빨강·초록만으로 오류와 성공을 구분하면 색약 사용자나 흑백 화면에서는 차이가 사라져요. 아이콘과 문구를 함께 써야 해요.',
      u: '남성의 약 8%가 적록 색약이라고 알려져 있어요. 오류는 색 + 아이콘 + 설명 문구, 그래프는 색 + 패턴이나 라벨, 링크는 색 + 밑줄처럼 두 가지 이상의 단서를 주세요. 화면을 흑백으로 바꿔 보는 게 가장 쉬운 점검법이에요.',
      html: `<div class="wr"><div class="row"><span class="tgl">색만 사용</span><span class="in">hello.mail</span></div><div class="row"><span class="tgl">색 + 아이콘 + 문구</span><span class="in">hello.mail</span><span class="ms"><i>!</i>@를 넣어 주세요</span></div></div>`
    },
    {
      id: 'a-sr', k: '스크린 리더', e: 'Screen reader · Alt text',
      d: '화면을 볼 수 없는 사람은 스크린 리더(iOS VoiceOver, 안드로이드 TalkBack)가 읽어 주는 소리로 앱을 써요. 이미지와 버튼에 읽을 이름이 있어야 해요.',
      u: '이미지에는 내용을 설명하는 대체 텍스트를, 아이콘만 있는 버튼에는 "장바구니에 담기"처럼 동작 이름을 붙이세요. 장식용 이미지는 읽지 않게 숨기고, 제목 단계(h1, h2)를 지켜야 빠르게 건너뛸 수 있어요.',
      html: `<div class="wrap2"><div class="pan box"><span class="im">무선 이어폰 사진</span><span class="ln h" style="width:60%"></span><span class="bt">장바구니에 담기</span><i class="fr"></i></div><div class="say"><span class="s1">"이미지, 흰색 무선 이어폰"</span><span class="s2">"제목, 무선 이어폰 29,000원"</span><span class="s3">"버튼, 장바구니에 담기"</span></div></div>`
    },
    {
      id: 'a-text', k: '글자 크기 조절', e: 'Dynamic Type · Font scaling',
      d: '사용자가 기기 설정에서 글자를 키우면 앱의 글자도 함께 커지고, 레이아웃이 깨지지 않고 늘어나야 해요.',
      u: 'iOS는 Dynamic Type, 안드로이드는 sp 단위로 글자 크기 설정을 따라요. 높이를 고정한 버튼, 한 줄로 고정한 제목이 가장 먼저 깨져요. 200%까지 키워서 글자가 잘리거나 겹치지 않는지 확인하세요.',
      html: `<div class="pan box" style="position:relative"><span class="tgl"><span class="t1">기본 크기</span><span class="t2">크게</span></span><b>오늘의 면접 질문</b><span>지원 동기를 1분 안에 말해 주세요.</span><span class="bt">답변 녹음 시작</span></div>`
    },
    {
      id: 'a-mot', k: '동작 줄이기', e: 'Reduced motion',
      d: '어지럼이나 멀미를 느끼는 사람은 기기에서 "동작 줄이기"를 켜요. 이때 앱은 미끄러지고 확대되는 움직임을 부드러운 페이드로 바꿔야 해요.',
      u: '웹은 prefers-reduced-motion, iOS·안드로이드는 각각 시스템 설정 값으로 확인할 수 있어요. 움직임을 완전히 없애기보다 위치 이동·확대·패럴랙스만 빼고 투명도 변화로 대신하세요. 이 페이지도 그 설정을 따라요.',
      html: `<div class="wr"><div class="col full"><div class="vp"><div><span class="ln h" style="width:60%"></span><span class="im"></span><span class="ln" style="width:85%"></span></div><div class="b"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:70%"></span></div></div><span class="cap">기본</span></div><div class="col red"><div class="vp"><div><span class="ln h" style="width:60%"></span><span class="im"></span><span class="ln" style="width:85%"></span></div><div class="b"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:70%"></span></div></div><span class="cap">동작 줄이기</span></div></div>`
    },
    {
      id: 'a-touch', k: '터치 영역', e: 'Touch target',
      d: '아이콘이 작아도 실제로 눌리는 영역은 넉넉해야 해요. 눈에 보이는 크기와 누를 수 있는 크기는 달라도 돼요.',
      u: '최소 iOS 44×44pt, 안드로이드 48×48dp, 웹 접근성(WCAG 2.2)은 24×24px 이상이 기준이에요. 작은 아이콘에는 투명한 여백을 붙이고, 눌리는 영역끼리는 겹치지 않게 8px 이상 띄우세요.',
      html: `<div class="pan box"><span class="ic2"><span class="hit"></span><svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><span class="sz">보이는 24 · 눌리는 44</span></span><span class="ic2"><span class="hit"></span><svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg><span class="sz">보이는 24 · 눌리는 44</span></span><i class="fg f1"></i><i class="fg f2"></i></div>`
    }
  ]
});
