(() => {
const s = window.UX.find(x => x.id === 's-psy');
s.css += `
.y-decoy .row{display:flex;align-items:flex-end;gap:.7em}
.y-decoy .pl2{width:7em;padding:.9em .7em;display:flex;flex-direction:column;align-items:center;gap:.35em;border-radius:.9em;text-align:center}
.y-decoy .pl2 span{font-size:.75em;color:var(--ink-2)}
.y-decoy .pl2 b{font-size:1.15em;font-weight:700}
.y-decoy .pl2 em{font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.y-decoy .dc{animation:dcy-d 4.5s infinite;border-style:dashed}
.y-decoy .tg3{position:relative;animation:dcy-t 4.5s cubic-bezier(.2,.8,.2,1.3) infinite}
.y-decoy .tg3 .rb2{position:absolute;top:-.9em;left:50%;transform:translateX(-50%);padding:.15em .6em;border-radius:1em;background:var(--accent);color:var(--accent-ink);font-size:.7em;font-weight:700;white-space:nowrap;opacity:0;animation:lab-d 4.5s infinite}
@keyframes dcy-d{0%,14%{opacity:0;transform:translateY(.6em)}24%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes dcy-t{0%,34%{transform:none;border-color:var(--frame)}44%,90%{transform:scale(1.08);border-color:var(--accent)}100%{transform:none}}

.y-frame .wr{display:flex;flex-direction:column;align-items:center;gap:1em}
.y-frame .stk3{display:grid;text-align:center}
.y-frame .stk3>div{grid-area:1/1;display:flex;flex-direction:column;align-items:center;gap:.3em}
.y-frame .stk3 b{font-size:3em;font-weight:800;letter-spacing:-.03em;line-height:1}
.y-frame .stk3 span{font-size:.9em;color:var(--ink-2)}
.y-frame .f1{animation:wr-no 5s infinite}.y-frame .f1 b{color:var(--accent)}
.y-frame .f2{opacity:0;animation:wr-yes 5s infinite}.y-frame .f2 b{color:var(--danger)}
.y-frame .bar3{display:flex;width:18em;height:1em;border-radius:1em;overflow:hidden}
.y-frame .bar3 i{flex:9;background:var(--accent);animation:frm-a 5s infinite}
.y-frame .bar3 i+i{flex:1;background:var(--danger);animation:frm-b 5s infinite}
.y-frame .nt3{font-family:var(--f-mono);font-size:.75em;color:var(--ink-3)}
@keyframes frm-a{0%,40%{opacity:1}46%,94%{opacity:.25}100%{opacity:1}}
@keyframes frm-b{0%,40%{opacity:.25}46%,94%{opacity:1}100%{opacity:.25}}

.y-goal .pan{width:21em;padding:1.3em;display:flex;flex-direction:column;gap:.8em}
.y-goal .hd8{display:flex;justify-content:space-between;font-size:.9em}
.y-goal .hd8 b{font-weight:700}
.y-goal .hd8 span{font-family:var(--f-mono);color:var(--ink-3);font-size:.85em}
.y-goal .sp2{display:grid;grid-template-columns:repeat(5,1fr);gap:.5em;animation:goal-n 5s cubic-bezier(.7,0,1,.6) infinite}
@property --gp{syntax:'<number>';inherits:true;initial-value:2}
.y-goal .sp2 i{aspect-ratio:1;border-radius:50%;border:.15em dashed var(--frame);display:grid;place-items:center;font-style:normal;font-size:.8em;color:var(--ink-3)}
.y-goal .sp2 .f{border:0;background:var(--accent);color:var(--accent-ink)}
.y-goal .sp2 .g{position:relative}
.y-goal .sp2 .g::before{content:"★";position:absolute;inset:-.15em;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;opacity:clamp(0,(var(--gp) - var(--n)) * 4,1)}
.y-goal .rw2{font-size:.8em;color:var(--ink-2)}
@keyframes goal-n{0%,6%{--gp:2}80%,92%{--gp:10.3}100%{--gp:2}}

.y-aes .wr{display:flex;gap:1.2em}
.y-aes .pan{width:10.8em;height:12.4em;padding:1em;display:flex;flex-direction:column;gap:.55em}
.y-aes .ugly{border-radius:0;border-color:#888;box-shadow:none;background:#fff;color:#000;font-family:"Times New Roman",serif}
.y-aes .ugly .lb2{font-size:.8em;margin-left:.3em}
.y-aes .ugly .in3{height:1.8em;border:.1em solid #777;margin-right:1em}
.y-aes .ugly .in3:nth-of-type(2){margin-left:.6em;margin-right:0}
.y-aes .ugly .b3{align-self:flex-end;padding:.3em .6em;background:#ccc;border:.1em outset #999;font-size:.8em}
.y-aes .nice .lb2{font-size:.75em;font-weight:600;color:var(--ink-2)}
.y-aes .nice .in3{height:2em;border:.12em solid var(--frame);border-radius:.5em}
.y-aes .nice .b3{margin-top:auto;padding:.5em;border-radius:.6em;background:var(--accent);color:var(--accent-ink);text-align:center;font-size:.85em;font-weight:600}
.y-aes .str{display:flex;gap:.15em;color:var(--warn);font-size:1em;letter-spacing:.05em}
.y-aes .str span{animation:bdg-t 4s infinite}
.y-aes .str em{font-style:normal;color:var(--line)}

.y-tes .wr{position:relative;display:flex;align-items:center;gap:1.4em}
.y-tes .sd{display:flex;flex-direction:column;align-items:center;gap:.6em}
.y-tes .bx3{position:relative;width:8.4em;height:9.6em;border-radius:1em;border:.14em solid var(--frame);background:var(--ui);display:flex;flex-direction:column-reverse;align-items:center;gap:.3em;padding:.6em}
.y-tes .bk2{width:6.4em;height:1.6em;border-radius:.4em;background:var(--warn);opacity:.9}
.y-tes .mv2{position:absolute;left:1.1em;width:6.4em;height:1.6em;border-radius:.4em;background:var(--warn);opacity:.9;animation:tes-m 4s cubic-bezier(.4,0,.2,1) infinite backwards}
.y-tes .u2 .bx3 .bk2{animation:tes-o 4s steps(1) infinite backwards}
.y-tes .ar2{font-size:1.4em;color:var(--ink-3)}
.y-tes .lab2{font-family:var(--f-mono);font-size:.8em;color:var(--ink-2)}
@keyframes tes-o{0%{opacity:.9}30%{opacity:0}92%{opacity:.9}}
@keyframes tes-m{0%,24%{transform:translateX(0);opacity:0}25%{opacity:.9}50%,90%{transform:translateX(12.6em);opacity:.9}100%{opacity:0}}

.y-serial .wr{display:flex;align-items:flex-end;gap:1.6em}
.y-serial .ls3{display:flex;flex-direction:column;gap:.35em;font-size:.88em}
.y-serial .ls3 span{padding:.25em .6em;border-radius:.4em;animation:ser-k 4s infinite backwards}
.y-serial .ls3 .hi2{background:var(--accent-soft);font-weight:700}
.y-serial .cv2{width:9em;height:10em}
.y-serial .cv2 path{fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:100;animation:peak-d 4s cubic-bezier(.4,0,.2,1) infinite}
.y-serial .cv2 line{stroke:var(--rule)}
.y-serial .cv2 text{font-family:var(--f-mono);font-size:6px;fill:var(--ink-3)}
@keyframes ser-k{0%,6%{opacity:0;transform:translateX(-.4em)}14%,90%{opacity:1;transform:none}100%{opacity:0}}
`;
s.items.push(
  {
    id: 'y-decoy', k: '미끼 효과', e: 'Decoy effect',
    d: '별로 매력 없는 세 번째 선택지(미끼)를 끼워 넣으면, 그 옆의 선택지가 갑자기 훨씬 이득처럼 보여요.',
    u: '중간 요금제를 비싸게 두면 큰 요금제가 이득처럼 느껴져요. 요금제 설계에서 흔히 쓰이지만, 소비자를 헷갈리게 하려고 실제로 아무도 고르지 않을 상품을 만드는 건 신뢰를 잃는 지름길이에요.',
    html: `<div class="row"><div class="pl2 box"><span>베이직</span><b>9,900원</b><em>면접 5회</em></div><div class="pl2 box dc"><span>스탠다드</span><b>19,900원</b><em>면접 10회</em></div><div class="pl2 box tg3"><span class="rb2">이게 이득!</span><span>프로</span><b>21,900원</b><em>무제한</em></div></div>`
  },
  {
    id: 'y-frame', k: '프레이밍 효과', e: 'Framing effect',
    d: '같은 사실도 어떻게 표현하느냐에 따라 다르게 받아들여요. "성공률 90%"와 "실패율 10%"는 같은 말이지만 느낌이 완전히 달라요.',
    u: '긍정적인 틀로 쓰면 행동을 이끌기 좋아요. 다만 중요한 결정(의료, 금융, 해지 등)에서는 사용자가 판단할 수 있도록 양쪽을 모두 보여주세요. 틀을 바꿔 사실을 감추면 기만이에요.',
    html: `<div class="wr"><div class="stk3"><div class="f1"><b>90%</b><span>가 첫 연습 후 자신감이 올랐어요</span></div><div class="f2"><b>10%</b><span>는 첫 연습 후에도 변화가 없었어요</span></div></div><div class="bar3"><i></i><i></i></div><span class="nt3">같은 데이터, 다른 문장</span></div>`
  },
  {
    id: 'y-goal', k: '목표 기울기 효과', e: 'Goal-gradient effect',
    d: '목표에 가까워질수록 사람은 더 빠르게 움직여요. 도장 10개 중 8개를 모은 사람은 2개를 모은 사람보다 훨씬 빨리 나머지를 채워요.',
    u: '진행률을 눈에 보이게 하고, 시작할 때 도장 2개를 미리 찍어 주는 것처럼 출발점을 앞당기면(부여된 진행) 완료율이 올라가요. "마지막 1단계"처럼 끝이 가깝다는 걸 강조하세요.',
    html: `<div class="pan box"><div class="hd8"><b>연습 10회 채우면 리포트 무료</b><span>도장</span></div><div class="sp2"><i class="f">★</i><i class="f">★</i><i class="g" style="--n:2">3</i><i class="g" style="--n:3">4</i><i class="g" style="--n:4">5</i><i class="g" style="--n:5">6</i><i class="g" style="--n:6">7</i><i class="g" style="--n:7">8</i><i class="g" style="--n:8">9</i><i class="g" style="--n:9">10</i></div><span class="rw2">처음 2개는 가입 선물로 찍어 드렸어요</span></div>`
  },
  {
    id: 'y-aes', k: '미적 사용성 효과', e: 'Aesthetic-usability effect',
    d: '보기 좋은 디자인은 실제로 같은 기능이어도 더 쓰기 쉽다고 느껴지고, 작은 불편도 너그럽게 넘어가게 해요.',
    u: '첫인상이 신뢰를 만들어요. 하지만 예쁜 디자인이 사용성 문제를 가릴 수도 있어서, 사용성 테스트에서 "좋아요"라는 말보다 실제로 과제를 끝냈는지를 보세요.',
    html: `<div class="wr"><div class="col"><div class="pan box ugly"><span class="lb2">이름:</span><span class="in3"></span><span class="lb2">이메일 주소를 입력하세요:</span><span class="in3"></span><span class="b3">제출</span></div><span class="str"><span>★★</span><em>★★★</em></span></div><div class="col"><div class="pan box nice"><span class="lb2">이름</span><span class="in3"></span><span class="lb2">이메일</span><span class="in3"></span><span class="b3">가입하기</span></div><span class="str"><span>★★★★</span><em>★</em></span></div></div>`
  },
  {
    id: 'y-tes', k: '테슬러의 법칙', e: "Tesler's law · Conservation of complexity",
    d: '모든 일에는 없앨 수 없는 복잡함이 있어요. 그 복잡함을 사용자가 짊어질지, 시스템이 대신 짊어질지를 정하는 게 설계예요.',
    u: '주소를 칸마다 나눠 적게 하는 대신 검색 한 번으로 채우고, 카드사를 고르게 하는 대신 번호로 알아내는 식이에요. 개발이 힘들어지더라도 수많은 사용자가 매번 겪을 수고를 줄이는 쪽을 고르세요.',
    html: `<div class="wr"><div class="sd u2"><div class="bx3"><span class="bk2"></span><span class="bk2"></span><span class="bk2"></span><span class="bk2"></span></div><span class="lab2">사용자</span></div><span class="ar2">→</span><div class="sd"><div class="bx3"></div><span class="lab2">시스템</span></div><span class="mv2" style="bottom:2.24em;animation-delay:0s"></span><span class="mv2" style="bottom:4.14em;animation-delay:.1s"></span><span class="mv2" style="bottom:6.04em;animation-delay:.2s"></span><span class="mv2" style="bottom:7.94em;animation-delay:.3s"></span></div>`
  },
  {
    id: 'y-serial', k: '직렬 위치 효과', e: 'Serial position effect',
    d: '목록에서 사람들은 처음과 마지막 항목을 가장 잘 기억하고, 가운데 항목은 쉽게 잊어요.',
    u: '가장 중요한 메뉴는 탭 바의 양 끝에, 핵심 메시지는 글의 처음과 끝에 두세요. 길게 나열한 혜택 목록의 가운데에 핵심을 숨기면 아무도 기억하지 못해요.',
    html: `<div class="wr"><div class="ls3"><span class="hi2" style="animation-delay:0s">무료 체험 7일</span><span style="animation-delay:.08s">답변 녹화</span><span style="animation-delay:.16s">말 속도 분석</span><span style="animation-delay:.24s">시선 분석</span><span style="animation-delay:.32s">질문 은행</span><span class="hi2" style="animation-delay:.4s">언제든 해지</span></div><svg class="cv2" viewBox="0 0 60 70"><line x1="4" y1="62" x2="58" y2="62"/><path pathLength="100" d="M6 10 C14 30 20 50 30 52 S48 36 56 12"/><text x="4" y="69">처음</text><text x="44" y="69">끝</text></svg></div>`
  }
);
})();
