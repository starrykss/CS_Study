(() => {
const s = window.UX.find(x => x.id === 's-method');
s.css += `
.me-pers .pan{width:23em;padding:1.2em;display:grid;grid-template-columns:auto 1fr;gap:.6em 1em}
.me-pers .av{width:4.4em;height:4.4em;background:linear-gradient(135deg,var(--accent-soft),var(--accent));grid-row:span 2}
.me-pers .nm2{display:flex;flex-direction:column;justify-content:center;gap:.15em}
.me-pers .nm2 b{font-size:1.1em}
.me-pers .nm2 span{font-size:.75em;color:var(--ink-2)}
.me-pers .qt{font-size:.8em;font-style:italic;color:var(--ink-2);border-left:.2em solid var(--accent);padding-left:.6em}
.me-pers .grp{grid-column:1/-1;display:flex;flex-direction:column;gap:.35em}
.me-pers .grp em{font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.me-pers .grp div{display:flex;flex-wrap:wrap;gap:.35em}
.me-pers .grp span{padding:.25em .6em;border-radius:.4em;font-size:.75em;animation:ser-k 4s infinite backwards}
.me-pers .gl span{background:var(--accent-soft)}
.me-pers .pn span{background:var(--danger-soft)}

.me-fun .wr{display:flex;flex-direction:column;gap:.45em;width:23em}
.me-fun .st6{display:grid;grid-template-columns:5em 1fr 3em;align-items:center;gap:.6em;font-size:.85em}
.me-fun .st6 span:first-child{color:var(--ink-2)}
.me-fun .st6 b{font-family:var(--f-mono);font-weight:500;text-align:right}
.me-fun .bw{display:flex;justify-content:center}
.me-fun .bw i{height:2em;width:var(--w);border-radius:.3em;background:var(--accent);transform-origin:center;animation:fun-g 4s cubic-bezier(.3,.7,.2,1) infinite backwards;animation-delay:var(--d)}
.me-fun .drop{display:grid;grid-template-columns:5em 1fr 3em;gap:.6em;font-size:.7em;color:var(--danger);font-weight:600;opacity:0;animation:lab-d 4s infinite}
.me-fun .drop span{grid-column:2;text-align:center}
.me-fun .bad2 .bw i{background:var(--danger)}
@keyframes fun-g{0%,6%{transform:scaleX(0)}20%,90%{transform:none}100%{transform:scaleX(0)}}

.me-coh .wr{display:flex;flex-direction:column;gap:.3em;font-size:.8em;font-variant-numeric:tabular-nums}
.me-coh .rw3{display:grid;grid-template-columns:4.4em repeat(5,3.2em);gap:.25em;align-items:center}
.me-coh .rw3 b{font-weight:500;color:var(--ink-2);font-size:.9em}
.me-coh .rw3 i{height:2.2em;border-radius:.3em;display:grid;place-items:center;font-style:normal;font-family:var(--f-mono);font-size:.85em;background:color-mix(in srgb,var(--accent) calc(var(--v) * 1%),var(--ui));color:var(--ink);animation:ser-k 4s infinite backwards;animation-delay:calc(var(--c) * .08s)}
.me-coh .rw3 i.e{background:none}
.me-coh .hd9{color:var(--ink-3);font-family:var(--f-mono);font-size:.8em}
.me-coh .hd9 span{text-align:center}

.me-nps .wr{display:flex;flex-direction:column;align-items:center;gap:1em}
.me-nps .sc4{display:flex;gap:.25em}
.me-nps .sc4 span{position:relative;width:2em;height:2em;border-radius:.4em;display:grid;place-items:center;font-family:var(--f-mono);font-size:.8em;font-weight:500}
.me-nps .d{background:var(--danger-soft)}.me-nps .p{background:var(--warn-soft)}.me-nps .pr{background:var(--accent-soft)}
.me-nps .lg2{display:flex;justify-content:space-between;width:100%;font-size:.7em;color:var(--ink-2)}
.me-nps .eq{display:flex;align-items:baseline;gap:.4em;font-size:.9em}
.me-nps .eq b{font-size:2.2em;font-weight:800;color:var(--accent);animation:bdg-t 4s infinite}
.me-nps .eq em{font-style:normal;font-family:var(--f-mono);font-size:.8em;color:var(--ink-2)}
.me-nps .dot{position:absolute;left:50%;width:.6em;height:.6em;margin-left:-.3em;border-radius:50%;background:var(--ink-2);top:-1.4em;opacity:0;animation:nps-d 4s cubic-bezier(.5,0,.8,.4) infinite backwards}
@keyframes nps-d{0%,4%{opacity:0;transform:translateY(-1.4em)}10%{opacity:1}18%,88%{opacity:1;transform:none}96%,100%{opacity:0}}

.me-jtbd .pan{width:24em;padding:1.4em;display:flex;flex-direction:column;gap:.7em}
.me-jtbd .ln4{display:flex;align-items:baseline;gap:.6em;font-size:.95em;line-height:1.45;animation:ser-k 5s infinite backwards}
.me-jtbd .ln4 em{flex:none;width:4.2em;font-style:normal;font-family:var(--f-mono);font-size:.7em;color:var(--ink-3)}
.me-jtbd .ln4 b{font-weight:600}
.me-jtbd .ln4:nth-child(2){animation-delay:.4s}.me-jtbd .ln4:nth-child(3){animation-delay:.8s}
.me-jtbd .ln4 mark{background:linear-gradient(var(--accent-soft),var(--accent-soft)) 0 90%/100% 45% no-repeat;color:inherit}
`;
s.items.push(
  {
    id: 'me-int', k: '사용자 인터뷰', e: 'User interviews',
    d: '사용자 한 명과 마주 앉아 과거의 실제 경험을 묻고 듣는 방법이에요. 숫자가 알려주지 않는 "왜"를 알 수 있어요.',
    u: '"이 기능 쓰실 것 같아요?"처럼 미래나 의견을 묻지 말고 "지난번에는 어떻게 하셨어요?"처럼 실제 행동을 물어보세요. 답을 유도하지 말고, 침묵을 견디고, "왜요?"를 한 번 더 물어보세요. 5~8명이면 반복되는 패턴이 보이기 시작해요.',
    html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 유도 질문</span><span class="yes">✓ 좋은 질문</span></div><div class="stk2 msg"><span class="no">"AI 모의면접 기능 있으면 쓰실 거죠? 편리할 것 같지 않으세요?"</span><span class="yes">"<b>지난번 면접을 준비할 때</b> 어떻게 하셨어요? 가장 막막했던 순간은 언제였어요?"</span></div></div>`
  },
  {
    id: 'me-pers', k: '페르소나', e: 'Persona',
    d: '인터뷰와 데이터에서 찾은 대표적인 사용자 유형을 한 사람처럼 정리한 카드예요. 팀이 "누구를 위해" 만드는지 같은 그림을 보게 해요.',
    u: '나이·취미 같은 인구 정보보다 목표, 상황, 불편이 핵심이에요. 상상으로 만든 페르소나는 팀의 편견만 강화해요. 실제 인터뷰 근거를 붙이고, 2~3개 이상 만들지 마세요.',
    html: `<div class="pan box"><span class="av"></span><div class="nm2"><b>지원 · 혼자 준비하는 신입</b><span>27세 · 신입 프로덕트 디자이너 지원</span></div><span class="qt">"혼자 연습하면 뭐가 문제인지 모르겠어요"</span><div class="grp gl"><em>목표</em><div><span style="animation-delay:.1s">말하는 습관 고치기</span><span style="animation-delay:.2s">예상 질문 대비</span></div></div><div class="grp pn"><em>불편</em><div><span style="animation-delay:.3s">피드백 받을 사람이 없음</span><span style="animation-delay:.4s">스터디 시간 맞추기 어려움</span></div></div></div>`
  },
  {
    id: 'me-fun', k: '퍼널 분석', e: 'Funnel analysis',
    d: '방문부터 결제까지 단계별로 몇 명이 남는지 보고, 가장 많이 빠져나가는 구간을 찾아요.',
    u: '가장 큰 이탈 구간 하나부터 고치세요. 숫자는 "어디서" 떠나는지 알려주고, "왜" 떠나는지는 그 구간의 녹화나 인터뷰로 알아내야 해요. 단계 정의를 바꾸면 이전 수치와 비교할 수 없으니 주의하세요.',
    html: `<div class="wr"><div class="st6"><span>방문</span><span class="bw"><i style="--w:100%;--d:0s"></i></span><b>100%</b></div><div class="st6"><span>회원가입</span><span class="bw"><i style="--w:42%;--d:.1s"></i></span><b>42%</b></div><div class="st6 bad2"><span>첫 면접</span><span class="bw"><i style="--w:23%;--d:.2s"></i></span><b>23%</b></div><div class="drop"><span>▼ 가입 후 절반 가까이 첫 면접 전에 이탈</span></div><div class="st6"><span>결제</span><span class="bw"><i style="--w:6%;--d:.3s"></i></span><b>6%</b></div></div>`
  },
  {
    id: 'me-coh', k: '리텐션 코호트', e: 'Retention cohort',
    d: '같은 주에 가입한 사람들을 한 묶음(코호트)으로 보고, 시간이 지나며 몇 %가 계속 돌아오는지 표로 비교해요.',
    u: '전체 사용자 수가 늘어도 리텐션이 떨어지고 있을 수 있어요. 아래로 갈수록(최근 가입자) 숫자가 좋아지면 개선이 효과가 있는 거예요. 곡선이 어느 지점에서 평평해지는지가 서비스가 자리 잡았는지 보여줘요.',
    html: `<div class="wr"><div class="rw3 hd9"><span></span><span>1주</span><span>2주</span><span>3주</span><span>4주</span><span>5주</span></div><div class="rw3"><b>10월 1주</b><i style="--v:72;--c:0">72</i><i style="--v:41;--c:1">41</i><i style="--v:30;--c:2">30</i><i style="--v:26;--c:3">26</i><i style="--v:25;--c:4">25</i></div><div class="rw3"><b>10월 2주</b><i style="--v:75;--c:1">75</i><i style="--v:45;--c:2">45</i><i style="--v:34;--c:3">34</i><i style="--v:31;--c:4">31</i><i class="e"></i></div><div class="rw3"><b>10월 3주</b><i style="--v:78;--c:2">78</i><i style="--v:52;--c:3">52</i><i style="--v:41;--c:4">41</i><i class="e"></i><i class="e"></i></div><div class="rw3"><b>10월 4주</b><i style="--v:81;--c:3">81</i><i style="--v:58;--c:4">58</i><i class="e"></i><i class="e"></i><i class="e"></i></div></div>`
  },
  {
    id: 'me-nps', k: 'NPS', e: 'Net Promoter Score',
    d: '"이 서비스를 친구에게 추천할 가능성은 0~10점 중 몇 점인가요?"라고 묻고, 9~10점(추천) 비율에서 0~6점(비추천) 비율을 뺀 점수예요.',
    u: '−100부터 100까지 나와요. 점수 하나보다 "왜 그 점수를 줬나요?"라는 후속 질문의 답이 훨씬 쓸모 있어요. 같은 시점·같은 방식으로 반복 측정해야 비교할 수 있어요.',
    html: `<div class="wr"><div class="sc4">${[0,1,2,3,4,5,6,7,8,9,10].map(n=>{const c=n<=6?'d':n<=8?'p':'pr';const k=[1,0,0,1,0,1,1,2,1,3,2][n];return `<span class="${c}">${n}${Array.from({length:k},(_, j)=>`<i class="dot" style="top:${-1.4-j*.8}em;animation-delay:${(n*.05+j*.1).toFixed(2)}s"></i>`).join('')}</span>`;}).join('')}</div><div class="lg2"><span>비추천 0–6</span><span>중립 7–8</span><span>추천 9–10</span></div><div class="eq"><em>추천 42% − 비추천 33% =</em><b>+9</b></div></div>`
  },
  {
    id: 'me-jtbd', k: 'JTBD', e: 'Jobs to be done',
    d: '사람들은 제품을 "사는" 게 아니라, 어떤 상황에서 해결하고 싶은 일을 위해 제품을 "고용"한다고 보는 관점이에요.',
    u: '"~할 때, ~하고 싶다, 그래서 ~하려고" 형식으로 써 보세요. 경쟁 상대가 비슷한 앱이 아니라 친구에게 부탁하기, 거울 보고 연습하기일 수도 있다는 걸 알게 돼요. 기능 아이디어보다 상황과 동기를 먼저 모으세요.',
    html: `<div class="pan box"><span class="ln4"><em>상황</em><span><b>면접을 사흘 앞두고</b> 혼자 준비할 때</span></span><span class="ln4"><em>동기</em><span>내 답변이 <mark>어떻게 들리는지 객관적으로</mark> 알고 싶다</span></span><span class="ln4"><em>기대 결과</em><span>그래서 실전에서 <b>당황하지 않고 말하려고</b></span></span></div>`
  }
);
})();
