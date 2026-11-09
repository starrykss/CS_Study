(() => {
const s = window.UX.find(x => x.id === 's-psy');
s.css += `
.y-loss .tk{position:relative;width:18em;padding:1.3em 1.5em;display:flex;flex-direction:column;gap:.5em;border-radius:1em;background:var(--ui);border:.14em dashed var(--accent)}
.y-loss .tk::before,.y-loss .tk::after{content:"";position:absolute;top:50%;width:1.4em;height:1.4em;margin-top:-.7em;border-radius:50%;background:var(--stage)}
.y-loss .tk::before{left:-.8em}.y-loss .tk::after{right:-.8em}
.y-loss .am{font-size:2.4em;font-weight:700;letter-spacing:-.02em;color:var(--accent)}
.y-loss .ms{font-size:.95em;font-weight:600;color:var(--danger);animation:loss-m 1s ease-in-out infinite alternate}
.y-loss .br{height:.5em;border-radius:1em;background:var(--line);overflow:hidden}
.y-loss .br i{display:block;height:100%;border-radius:1em;background:var(--danger);animation:loss-w 4s linear infinite}
@keyframes loss-m{to{opacity:.55}}
@keyframes loss-w{from{width:62%}to{width:8%}}

.y-dflt .pan{width:17em;padding:1.3em;display:flex;flex-direction:column;gap:.6em}
.y-dflt .op{display:flex;align-items:center;gap:.6em;padding:.55em .7em;border:.12em solid var(--rule);border-radius:.6em;font-size:.9em}
.y-dflt .op.on{border-color:var(--accent);background:var(--accent-soft)}
.y-dflt .op .r{width:1.5em;height:1.5em;box-shadow:inset 0 0 0 .3em var(--ui)}
.y-dflt .op.on .r{box-shadow:inset 0 0 0 .3em var(--accent-soft)}
.y-dflt .op em{margin-left:auto;font-style:normal;font-family:var(--f-mono);font-size:.8em;color:var(--accent)}
.y-dflt .bt{margin-top:.3em;animation:press 4s infinite;animation-delay:-.4s}
.y-dflt .cur{left:55%;top:78%;animation:dflt-c 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes dflt-c{0%,10%{transform:translate(3em,-6em)}36%,80%{transform:none}96%,100%{transform:translate(3em,-6em)}}

.y-peak .pan{width:22em;padding:1.2em 1.4em 1em}
.y-peak svg{display:block;width:100%;overflow:visible}
.y-peak .gd{stroke:var(--rule);stroke-width:.6}
.y-peak .pth{fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:100;animation:peak-d 4s cubic-bezier(.4,0,.2,1) infinite}
.y-peak .pk,.y-peak .en{animation:peak-o 4s infinite;transform-box:fill-box;transform-origin:center}
.y-peak .pk{fill:var(--warn)}.y-peak .en{fill:var(--accent);animation-delay:.9s;animation-fill-mode:backwards}
.y-peak text{font-family:var(--f-mono);font-size:7px;fill:var(--ink-2)}
.y-peak .tl{display:flex;justify-content:space-between;font-family:var(--f-mono);font-size:.75em;color:var(--ink-3);margin-top:.4em}
@keyframes peak-d{0%,4%{stroke-dashoffset:100}60%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}
@keyframes peak-o{0%,34%{opacity:0;transform:scale(0)}40%{opacity:1;transform:scale(1.6)}46%,90%{opacity:1;transform:none}100%{opacity:0}}

.y-vonr .row{display:flex;align-items:center;gap:.7em}
.y-vonr .pl{width:7em;padding:1em .8em;display:flex;flex-direction:column;gap:.5em;align-items:center;border-radius:.9em}
.y-vonr .pl b{font-size:1.25em;font-weight:700}
.y-vonr .pl .ln{width:80%}
.y-vonr .hi{border-color:var(--accent);padding-top:1.6em;animation:vonr-k 4s cubic-bezier(.2,.8,.2,1.3) infinite}
.y-vonr .hi .bt{font-size:.8em;padding:.3em .8em}
.y-vonr .rb{position:absolute;top:-.8em;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-ink);font-size:.75em;font-weight:700;padding:.2em .7em;border-radius:1em;white-space:nowrap}
@keyframes vonr-k{0%,14%{transform:none;box-shadow:none}24%,86%{transform:scale(1.1);box-shadow:0 .8em 1.6em -.8em color-mix(in srgb,var(--accent) 60%,transparent)}96%,100%{transform:none;box-shadow:none}}

.y-mill .wr{display:flex;flex-direction:column;align-items:center;gap:1.4em}
.y-mill .num{display:flex;font-family:var(--f-mono);font-size:2.4em;font-weight:500;font-variant-numeric:tabular-nums}
.y-mill .num span{display:inline-flex}
.y-mill .num .g::after{content:"-";display:inline-block;overflow:hidden;width:0;opacity:0;color:var(--accent);animation:mill-k 4s cubic-bezier(.4,0,.2,1) infinite}
.y-mill .cap2{display:flex;gap:1.6em;font-family:var(--f-mono);font-size:.85em;color:var(--ink-3)}
.y-mill .cap2 span{animation:mill-c 4s infinite}
@keyframes mill-k{0%,28%{width:0;opacity:0}40%,86%{width:.75em;opacity:1}96%,100%{width:0;opacity:0}}
@keyframes mill-c{0%,30%{opacity:.35}40%,86%{opacity:1;color:var(--accent)}96%,100%{opacity:.35}}

.y-doh .pan{width:10.6em;height:10.4em;padding:1.1em;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.9em}
.y-doh .bt{font-size:.9em;animation:press 4s infinite;animation-delay:-1.36s}
.y-doh .rs{position:relative;width:100%;height:3.4em}
.y-doh .rs>*{position:absolute;left:50%;top:50%}
.y-doh .ok{display:flex;align-items:center;gap:.4em;font-size:.9em;font-weight:600;color:var(--accent);white-space:nowrap;transform:translate(-50%,-50%);opacity:0}
.y-doh .ok i{width:1.5em;height:1.5em;border-radius:50%;background:var(--accent)}
.y-doh .f .ok{animation:doh-f 4s infinite}
.y-doh .s .ok{animation:doh-s 4s infinite}
.y-doh .spn{margin:-1.3em 0 0 -1.3em;opacity:0;animation:spin .8s linear infinite,doh-l 4s infinite}
@keyframes doh-f{0%,22%{opacity:0;transform:translate(-50%,-30%)}26%,88%{opacity:1;transform:translate(-50%,-50%)}96%,100%{opacity:0}}
@keyframes doh-s{0%,74%{opacity:0;transform:translate(-50%,-30%)}78%,88%{opacity:1;transform:translate(-50%,-50%)}96%,100%{opacity:0}}
@keyframes doh-l{0%,22%{opacity:0}24%,72%{opacity:1}74%,100%{opacity:0}}
`;
s.items.push(
  {
    id: 'y-loss', k: '손실 회피', e: 'Loss aversion',
    d: '같은 크기라도 얻는 기쁨보다 잃는 아픔을 더 크게 느껴요.',
    u: '"3,000원 받기"보다 "쿠폰이 오늘 사라져요"가 더 강하게 움직여요. 대신 실제로 사라지지 않는 혜택을 사라진다고 말하면 신뢰를 잃어요. 해지 화면에서 "그동안 모은 기록이 사라져요"처럼 사실을 알려주는 데 쓰세요.',
    html: `<div class="tk"><span class="am">3,000원</span><span class="ms">오늘 자정에 사라지는 쿠폰이에요</span><span class="br"><i></i></span></div>`
  },
  {
    id: 'y-dflt', k: '기본값 효과', e: 'Default effect',
    d: '사람들은 미리 골라져 있는 선택지를 바꾸지 않고 그대로 두는 경우가 많아요.',
    u: '대부분에게 가장 좋은 선택을 기본값으로 두면 결정이 쉬워져요. 하지만 유료 옵션이나 마케팅 수신 동의를 미리 체크해 두는 건 다크 패턴이고, 한국에서는 전자상거래법 규제 대상이에요.',
    html: `<div class="pan box"><span class="op"><span class="r"></span>월간 결제</span><span class="op on"><span class="r on"></span>연간 결제<em>추천</em></span><span class="op"><span class="r"></span>평생 이용권</span><span class="bt">다음</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
  },
  {
    id: 'y-peak', k: '피크엔드 법칙', e: 'Peak-end rule',
    d: '사람은 경험 전체의 평균이 아니라 가장 강렬했던 순간과 마지막 순간으로 그 경험을 기억해요.',
    u: '결제 완료, 가입 완료 같은 마지막 화면에 공을 들이고, 여정 중간에 기분 좋은 순간을 하나 만들어 두세요. 반대로 마지막이 해지 방해나 오류로 끝나면 앞의 좋은 경험도 묻혀요.',
    html: `<div class="pan box"><svg viewBox="0 0 200 90"><line class="gd" x1="0" y1="45" x2="200" y2="45"/><path class="pth" pathLength="100" d="M6 50 C26 58 40 74 56 68 S80 10 94 14 S118 58 136 54 S172 26 194 20"/><circle class="pk" cx="94" cy="14" r="5"/><circle class="en" cx="194" cy="20" r="5"/><text x="80" y="34">최고점</text><text x="170" y="40">마지막</text></svg><div class="tl"><span>가입</span><span>첫 사용</span><span>결제</span><span>완료</span></div></div>`
  },
  {
    id: 'y-vonr', k: '폰 레스토프 효과', e: 'Von Restorff effect',
    d: '비슷한 것들 사이에서 하나만 다르게 생기면 그것이 가장 눈에 띄고 기억에 남아요.',
    u: '요금제 중 추천안, 화면의 주요 버튼처럼 정말 중요한 하나에만 다른 색과 크기를 주세요. 여러 개를 동시에 튀게 만들면 효과가 사라져요. 색만으로 구분하지 말고 라벨도 함께 붙이세요.',
    html: `<div class="row"><div class="pl box"><span class="ln h" style="width:50%"></span><b>무료</b><span class="ln"></span></div><div class="pl box hi"><span class="rb">가장 많이 골라요</span><b>9,900원</b><span class="ln"></span><span class="bt">시작</span></div><div class="pl box"><span class="ln h" style="width:50%"></span><b>19,900원</b><span class="ln"></span></div></div>`
  },
  {
    id: 'y-mill', k: '밀러의 법칙', e: "Miller's law · Chunking",
    d: '사람이 한 번에 머릿속에 붙잡아 둘 수 있는 정보는 많지 않아서, 덩어리로 나누면 훨씬 쉽게 기억해요.',
    u: '전화번호, 카드 번호, 인증 코드는 3~4자리씩 끊어서 보여주세요. 긴 폼은 단계로 나누고, 메뉴는 성격별로 묶으세요. 숫자 "7개까지"를 규칙처럼 지키기보다 묶어서 보여주는 게 핵심이에요.',
    html: `<div class="wr"><div class="num"><span class="g">010</span><span class="g">1234</span><span>5678</span></div><div class="cap2"><span>3자리</span><span>4자리</span><span>4자리</span></div></div>`
  },
  {
    id: 'y-doh', k: '도허티 임계', e: 'Doherty threshold',
    d: '시스템이 0.4초 안에 반응하면 사람은 흐름이 끊기지 않고 계속 몰입해요.',
    u: '실제 처리에 시간이 걸린다면 누른 즉시 버튼 상태를 바꾸고, 스켈레톤이나 낙관적 UI로 먼저 반응하세요. 1초가 넘으면 진행 표시를, 10초가 넘으면 남은 시간이나 단계를 보여주세요.',
    html: `<div class="two">
<div class="col"><div class="pan box f"><span class="bt">불러오기</span><div class="rs"><span class="ok"><i></i>완료</span></div></div><span class="cap">0.4초 안에</span></div>
<span class="vs">vs</span>
<div class="col"><div class="pan box s"><span class="bt">불러오기</span><div class="rs"><span class="spn"></span><span class="ok"><i></i>완료</span></div></div><span class="cap">2초 이상</span></div>
</div>`
  }
);
})();
