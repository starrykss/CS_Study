(window.UX = window.UX || []).push({
  id: 's-psy', short: 'UX 심리학', en: 'UX psychology',
  title: '선택을 바꾸는 심리와 법칙',
  sub: '버튼 크기, 가격 표시, 숫자 하나가 사람의 선택을 바꿔요. 원리를 알고 쓰되, 속이는 데는 쓰지 마세요.',
  css: `
.y-fitts .pan{width:22em;height:15em}
.y-fitts .hd{position:absolute;left:1.6em;top:1.9em;width:7em}
.y-fitts .sm{position:absolute;right:1.6em;top:1.6em;width:1.6em;height:1.6em;border-radius:.4em;background:var(--line);display:grid;place-items:center;font-size:1em;line-height:1;color:var(--ink-2);animation:press 4s infinite;animation-delay:-.08s}
.y-fitts .big{position:absolute;left:1.6em;right:1.6em;bottom:1.6em;font-size:1.1em;padding:.75em 0;border-radius:.8em;animation:press 4s infinite;animation-delay:-2.96s}
.y-fitts .cur{left:50%;top:50%;animation:fit-c 4s cubic-bezier(.45,0,.25,1) infinite}
.y-fitts .lb{position:absolute;font-family:var(--f-mono);font-size:.8em;color:var(--ink-3)}
.y-fitts .l1{right:4.4em;top:2.2em}
.y-fitts .l2{left:2em;bottom:5.4em}
@keyframes fit-c{0%,8%{transform:translate(-2em,1em)}28%{transform:translate(9.4em,-4.6em)}34%{transform:translate(8em,-5.6em)}40%,52%{transform:translate(8.4em,-5em)}68%,86%{transform:translate(.6em,4.3em)}100%{transform:translate(-2em,1em)}}

.y-hick .pan{padding:1.2em;display:grid;gap:.5em;align-content:start}
.y-hick .p12{grid-template-columns:repeat(4,2em)}
.y-hick .p3{grid-template-columns:7em}
.y-hick .pan i{height:2em;border-radius:.45em;background:var(--line)}
.y-hick .rg{position:absolute;top:1.2em;left:1.2em;width:2em;height:2em;border-radius:.45em;box-shadow:0 0 0 .22em var(--accent);animation:hk-l 4.5s ease-in-out infinite}
.y-hick .p3 .rg{width:7em;top:3.7em;animation:hk-r 4.5s ease-in-out infinite}
.y-hick .p12 .pick{animation:hk-f 4.5s infinite}
.y-hick .p3 .pick{animation:hk-g 4.5s infinite}
@keyframes hk-l{0%{transform:none}12%{transform:translate(5em,2.5em)}24%{transform:translate(2.5em,5em)}36%{transform:translate(7.5em,0)}48%{transform:translate(0,2.5em)}60%{transform:translate(5em,5em)}72%,100%{transform:translate(2.5em,2.5em)}}
@keyframes hk-r{0%{transform:translateY(-2.5em)}12%,100%{transform:none}}
@keyframes hk-f{0%,74%{background:var(--line)}78%,96%{background:var(--accent)}100%{background:var(--line)}}
@keyframes hk-g{0%,14%{background:var(--line)}18%,96%{background:var(--accent)}100%{background:var(--line)}}

.y-anch .pan{width:16em;padding:1.5em 1.6em;display:flex;flex-direction:column;gap:.3em}
.y-anch .nm{font-size:1em;font-weight:600;color:var(--ink-2)}
.y-anch .was{position:relative;align-self:flex-start;font-size:1.4em;color:var(--ink-3);font-variant-numeric:tabular-nums;margin-top:.4em;animation:anc-w 4s infinite}
.y-anch .was::after{content:"";position:absolute;left:-.1em;top:52%;height:.12em;width:0;background:var(--ink-2);animation:anc-s 4s cubic-bezier(.4,0,.2,1) infinite}
.y-anch .now{display:flex;white-space:nowrap;align-items:baseline;gap:.45em;animation:anc-n 4s cubic-bezier(.2,.8,.2,1.2) infinite}
.y-anch .now b{color:var(--danger);font-size:1.4em;font-weight:700}
.y-anch .now strong{font-size:2.1em;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.y-anch .bt{margin-top:.7em}
@keyframes anc-w{0%,4%{opacity:0}10%,92%{opacity:1}100%{opacity:0}}
@keyframes anc-s{0%,20%{width:0}30%,92%{width:calc(100% + .2em)}100%{width:0}}
@keyframes anc-n{0%,32%{opacity:0;transform:translateY(.5em) scale(.95)}40%,92%{opacity:1;transform:none}100%{opacity:0;transform:none}}

.y-soc .pan{width:18em;padding:1.3em;display:flex;flex-direction:column;gap:.75em}
.y-soc .im{height:5.6em}
.y-soc .ttl{font-size:1.1em;font-weight:700}
.y-soc .avs{display:flex}
.y-soc .avs i{width:2em;height:2em;border-radius:50%;border:.18em solid var(--ui);margin-left:-.55em;animation:soc-a 4s cubic-bezier(.2,.8,.2,1.3) infinite backwards;animation-delay:calc(var(--i) * .12s)}
.y-soc .avs i:first-child{margin-left:0}
.y-soc .tx{font-size:.9em;color:var(--ink-2);animation:soc-t 4s infinite}
.y-soc .tx b{color:var(--ink)}
.y-soc .rv{display:flex;align-items:center;gap:.5em;font-size:.9em;color:var(--ink-3)}
.y-soc .stars{color:var(--warn);letter-spacing:.05em}
@keyframes soc-a{0%,8%{opacity:0;transform:translateX(-.8em) scale(.6)}20%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
@keyframes soc-t{0%,26%{opacity:0}36%,88%{opacity:1}96%,100%{opacity:0}}

.y-scar .pan{width:19em;padding:1.4em 1.5em;display:flex;flex-direction:column;gap:.9em}
.y-scar .hd{display:flex;align-items:center;justify-content:space-between;gap:.6em}
.y-scar .ttl{font-size:1em;font-weight:700}
.y-scar .chip{font-size:.75em;font-weight:600;padding:.25em .6em;border-radius:1em;background:var(--warn-soft);color:var(--ink);animation:scr-c 4s infinite}
.y-scar .seats{display:grid;grid-template-columns:repeat(5,1fr);gap:.45em}
.y-scar .seats i{height:2em;border-radius:.4em;background:var(--line)}
.y-scar .seats .f{background:var(--accent-soft);box-shadow:inset 0 0 0 .14em var(--accent)}
.y-scar .seats .g1{animation:scr-g 4s infinite}
.y-scar .seats .g2{animation:scr-g 4s infinite;animation-delay:.4s}
.y-scar .lft{font-size:1em;color:var(--ink-2)}
.y-scar .n{position:relative;display:inline-block;width:.8em;height:1.2em;vertical-align:-.25em;font-weight:700;color:var(--danger);font-size:1.3em}
.y-scar .n span{position:absolute;inset:0;text-align:center}
.y-scar .n1{animation:bdg-1x 4s steps(1) infinite}.y-scar .n2{animation:bdg-2x 4s steps(1) infinite}
@keyframes scr-g{0%,28%{background:var(--accent-soft);box-shadow:inset 0 0 0 .14em var(--accent);transform:none}31%{transform:scale(.85)}34%,94%{background:var(--line);box-shadow:none;transform:none}100%{background:var(--accent-soft);box-shadow:inset 0 0 0 .14em var(--accent)}}
@keyframes bdg-1x{0%{opacity:1}42%{opacity:0}96%{opacity:1}}
@keyframes bdg-2x{0%{opacity:0}42%{opacity:1}96%{opacity:0}}
@keyframes scr-c{0%,40%{transform:none}45%{transform:scale(1.15)}50%,100%{transform:none}}

@property --zg{syntax:'<integer>';inherits:false;initial-value:0}
.y-zeig .pan{width:18em;padding:1.4em 1.5em;display:flex;flex-direction:column;gap:.7em}
.y-zeig .hd{display:flex;align-items:baseline;justify-content:space-between}
.y-zeig .ttl{font-size:1em;font-weight:700}
.y-zeig .pc{font-family:var(--f-mono);font-size:1.2em;font-weight:500;color:var(--accent);font-variant-numeric:tabular-nums}
.y-zeig .pc i{font-style:normal;counter-reset:zg var(--zg);animation:zg-n 4s cubic-bezier(.3,.7,.2,1) infinite}
.y-zeig .pc i::after{content:counter(zg)}
.y-zeig .br{height:.7em;border-radius:1em;background:var(--line);overflow:hidden}
.y-zeig .br i{display:block;height:100%;width:0;border-radius:1em;background:var(--accent);animation:zg-w 4s cubic-bezier(.3,.7,.2,1) infinite}
.y-zeig .li{display:flex;align-items:center;gap:.6em;font-size:.9em}
.y-zeig .li .x{width:1.6em;height:1.6em;animation:zg-x 4s infinite backwards}
.y-zeig .li .x::after{left:.38em;top:.06em;width:.38em;height:.8em}
.y-zeig .a2 .x{animation-delay:.35s}.y-zeig .a3 .x{animation-delay:.7s}
.y-zeig .todo{margin:0 -.5em;padding:.3em .5em;border-radius:.5em;animation:zg-p 1.4s ease-in-out infinite alternate}
.y-zeig .todo em{margin-left:auto;font-style:normal;font-family:var(--f-mono);font-size:.85em;color:var(--warn);font-weight:500}
@keyframes zg-n{0%,6%{--zg:0}40%,90%{--zg:80}100%{--zg:0}}
@keyframes zg-w{0%,6%{width:0}40%,90%{width:80%}100%{width:0}}
@keyframes zg-x{0%,8%{background:transparent;border-color:var(--ink-3);color:transparent}14%,88%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}94%,100%{background:transparent;border-color:var(--ink-3);color:transparent}}
@keyframes zg-p{from{background:transparent}to{background:var(--warn-soft)}}
`,
  items: [
    {
      id: 'y-fitts', k: '피츠의 법칙', e: "Fitts's law",
      d: '누를 대상이 클수록, 가까울수록 더 빠르고 정확하게 누를 수 있어요.',
      u: '중요한 버튼은 크게, 엄지가 닿는 곳에 두세요. 터치 영역은 iOS 44×44pt, 안드로이드 48×48dp 이상이 기준이에요. 반대로 삭제처럼 실수하면 안 되는 버튼은 일부러 멀리 두기도 해요.',
      html: `<div class="pan box"><span class="ln h hd"></span><span class="sm">×</span><span class="lb l1">작고 멀다</span><span class="lb l2">크고 가깝다</span><span class="bt big">다음 단계로</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
    },
    {
      id: 'y-hick', k: '힉의 법칙', e: "Hick's law",
      d: '선택지가 많을수록 하나를 고르는 데 시간이 더 걸려요.',
      u: '한 화면의 선택지를 줄이고, 많을 때는 묶거나 추천을 먼저 보여주세요. 메뉴를 단계별로 나누는 것도 방법이에요. 너무 많으면 아예 고르지 않고 떠나는 선택 과부하로 이어져요.',
      html: `<div class="two">
<div class="col"><div class="pan box p12"><i></i><i></i><i></i><i></i><i></i><i class="pick"></i><i></i><i></i><i></i><i></i><i></i><i></i><span class="rg"></span></div><span class="cap">선택지 12개</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box p3"><i></i><i class="pick"></i><i></i><span class="rg"></span></div><span class="cap">선택지 3개</span></div>
</div>`
    },
    {
      id: 'y-anch', k: '앵커링', e: 'Anchoring',
      d: '처음 본 숫자가 기준점이 되어서 그다음 숫자를 판단하는 데 영향을 줘요.',
      u: '정가를 먼저 보여주면 할인가가 더 싸게 느껴지고, 비싼 요금제를 옆에 두면 가운데 요금제가 합리적으로 보여요. 실제로 판 적 없는 가격을 정가로 내세우면 기만 광고가 될 수 있어요.',
      html: `<div class="pan box"><span class="nm">무선 이어폰</span><span class="was">59,000원</span><span class="now"><b>51%</b><strong>29,000원</strong></span><span class="bt">구매하기</span></div>`
    },
    {
      id: 'y-soc', k: '사회적 증거', e: 'Social proof',
      d: '다른 사람들이 고른 것을 보면 더 믿음이 가고 따라 고르게 돼요.',
      u: '후기 수, 이용자 수, "OO님 외 12명이 좋아해요"처럼 실제 데이터로만 보여주세요. 숫자가 작을 때는 오히려 역효과가 나니, 그럴 땐 후기 한 줄을 보여주는 편이 나아요.',
      html: `<div class="pan box"><span class="im"></span><span class="ttl">모의면접 10회권</span><span class="rw"><span class="avs"><i style="--i:0;background:var(--accent)"></i><i style="--i:1;background:var(--warn)"></i><i style="--i:2;background:var(--ink-3)"></i></span><span class="tx"><b>1,204명</b>이 선택했어요</span></span><span class="rv"><span class="stars">★★★★★</span><span>후기 312</span></span></div>`
    },
    {
      id: 'y-scar', k: '희소성', e: 'Scarcity',
      d: '얼마 남지 않았다고 느끼면 더 갖고 싶어지고 결정을 서두르게 돼요.',
      u: '재고나 마감 시간이 정말 한정일 때만 쓰세요. 새로고침하면 다시 시작되는 가짜 타이머나 지어낸 재고 표시는 다크 패턴이고, 들키는 순간 신뢰를 잃어요.',
      html: `<div class="pan box"><div class="hd"><span class="ttl">11월 모의면접 좌석</span><span class="chip">마감 임박</span></div><div class="seats"><i></i><i></i><i></i><i></i><i></i><i class="f g1"></i><i class="f g2"></i><i class="f"></i><i class="f"></i><i class="f"></i></div><span class="lft">남은 좌석 <span class="n"><span class="n1">5</span><span class="n2">3</span></span>석</span></div>`
    },
    {
      id: 'y-zeig', k: '자이가르닉 효과', e: 'Zeigarnik effect',
      d: '끝내지 못한 일은 더 오래 기억에 남고, 마무리하고 싶은 마음이 생겨요.',
      u: '프로필 완성도 80%나 체크리스트처럼 조금만 더 하면 된다는 걸 보여주면 완료율이 올라가요. 진행 막대를 0%가 아닌 상태로 시작하는 것(부여된 진행 효과)도 비슷하게 작동해요.',
      html: `<div class="pan box"><div class="hd"><span class="ttl">프로필 완성도</span><span class="pc"><i></i>%</span></div><div class="br"><i></i></div><span class="li a1"><span class="x"></span>사진 올리기</span><span class="li a2"><span class="x"></span>자기소개</span><span class="li a3"><span class="x"></span>희망 직무</span><span class="li todo"><span class="x" style="animation:none"></span>포트폴리오<em>+20%</em></span></div>`
    }
  ]
});
