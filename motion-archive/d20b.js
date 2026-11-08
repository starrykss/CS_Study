(() => {
const s = window.UX.find(x => x.id === 's-ai');
s.css += `
.ai-fb .bub{display:flex;flex-direction:column;gap:.45em}
.ai-fb .acts{display:flex;gap:.5em;margin:.3em 0 0 2.5em}
.ai-fb .acts i{width:2em;height:2em;border-radius:.5em;display:grid;place-items:center;border:.1em solid var(--rule);background:var(--ui)}
.ai-fb .acts svg{width:1.1em;height:1.1em;fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ai-fb .acts .dn3{animation:fb-d 4.5s infinite}
.ai-fb .acts .dn3 svg{animation:fb-s 4.5s infinite}
.ai-fb .form{margin-left:2.5em;padding:.7em .8em;display:flex;flex-direction:column;gap:.5em;font-size:.8em;transform-origin:0 0;animation:fb-f 4.5s cubic-bezier(.2,.8,.2,1) infinite}
.ai-fb .form b{font-weight:600}
.ai-fb .form .cps{display:flex;flex-wrap:wrap;gap:.35em}
.ai-fb .form .cps span{padding:.25em .6em;border-radius:1em;border:.1em solid var(--frame);font-size:.9em}
.ai-fb .form .cps .k{animation:chbg-s 4.5s infinite;animation-delay:-.6s}
.ai-fb .tap{left:6em;top:5.1em;animation-duration:4.5s;animation-delay:-1.26s}
@keyframes fb-d{0%,20%{background:var(--ui)}24%,90%{background:var(--danger-soft);border-color:var(--danger)}96%,100%{background:var(--ui)}}
@keyframes fb-s{0%,20%{stroke:var(--ink-2)}24%,90%{stroke:var(--danger)}96%,100%{stroke:var(--ink-2)}}
@keyframes fb-f{0%,24%{opacity:0;transform:scale(.92);max-height:0}32%,90%{opacity:1;transform:none;max-height:8em}96%,100%{opacity:0;max-height:0}}

.ai-voice .wr{display:flex;flex-direction:column;align-items:center;gap:1.2em;width:22em}
.ai-voice .tx{min-height:3em;text-align:center;font-size:1em;line-height:1.5}
.ai-voice .tx span{opacity:clamp(0,var(--sn) - var(--i),1)}
.ai-voice .wv{display:flex;align-items:center;gap:.25em;height:3em;animation:str-n 5s linear infinite}
.ai-voice .wv i{width:.35em;border-radius:1em;background:var(--accent);height:.5em;animation:vc-b .9s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.13s)}
.ai-voice .mic{position:relative;width:4.2em;height:4.2em;border-radius:50%;background:var(--danger);display:grid;place-items:center}
.ai-voice .mic::before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--danger);opacity:.35;animation:vc-p 1.4s ease-out infinite}
.ai-voice .mic svg{position:relative;width:1.8em;height:1.8em;fill:none;stroke:var(--danger-ink);stroke-width:2;stroke-linecap:round}
.ai-voice .txw{animation:str-n 5s linear infinite}
@keyframes vc-b{from{height:.5em}to{height:var(--h)}}
@keyframes vc-p{to{transform:scale(1.7);opacity:0}}

.ai-label .card2{width:22em;padding:1.2em 1.3em;display:flex;flex-direction:column;gap:.6em}
.ai-label .tg2{align-self:flex-start;display:flex;align-items:center;gap:.4em;padding:.25em .65em;border-radius:1em;font-size:.75em;font-weight:600;color:#5B4BFF;background:color-mix(in srgb,#5B4BFF 14%,transparent);animation:lab-g 4s infinite}
.ai-label .tg2 i{width:.9em;height:.9em;background:conic-gradient(from 45deg,#5B4BFF,#2BC995,#E8960B,#5B4BFF);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)}
.ai-label .card2 b{font-size:1.1em}
.ai-label .ds2{font-size:.72em;color:var(--ink-3);border-top:.1em solid var(--rule);padding-top:.6em;animation:lab-d 4s infinite}
.ai-label .img{position:relative;height:5.4em;border-radius:.6em;background:linear-gradient(135deg,#c9d8ff,#f6d1e3)}
.ai-label .wm{position:absolute;right:.5em;bottom:.4em;padding:.15em .45em;border-radius:.3em;background:rgba(0,0,0,.55);color:#fff;font-size:.6em;font-family:var(--f-mono);animation:lab-d 4s infinite}
@keyframes lab-g{0%,10%{opacity:0;transform:translateY(-.3em)}18%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes lab-d{0%,30%{opacity:0}40%,90%{opacity:1}100%{opacity:0}}

.ai-conf .bub mark{background:none;color:inherit;text-decoration:underline wavy var(--warn);text-decoration-thickness:.1em;text-underline-offset:.25em;animation:cf-m 4s infinite}
.ai-conf .nt{display:flex;align-items:center;gap:.4em;margin:.4em 0 0 2.5em;padding:.45em .7em;border-radius:.5em;background:var(--warn-soft);font-size:.75em;opacity:0;animation:cf-n 4s infinite}
.ai-conf .nt b{color:var(--ink)}
@keyframes cf-m{0%,26%{text-decoration-color:transparent}34%,90%{text-decoration-color:var(--warn)}100%{text-decoration-color:transparent}}
@keyframes cf-n{0%,36%{opacity:0;transform:translateY(-.3em)}44%,90%{opacity:1;transform:none}100%{opacity:0}}

.ai-hand .ag{display:flex;gap:.5em;align-items:flex-start;opacity:0;animation:hd-a 5s cubic-bezier(.2,.8,.2,1) infinite}
.ai-hand .ag>i{flex:none;width:2em;height:2em;border-radius:50%;background:var(--warn-soft);border:.15em solid var(--warn)}
.ai-hand .ag .bub{border-color:var(--warn)}
.ai-hand .sys{align-self:center;font-size:.72em;color:var(--ink-3);opacity:0;animation:hd-s 5s infinite}
.ai-hand .hb{margin-left:2.5em;align-self:flex-start;padding:.4em .9em;border-radius:2em;border:.12em solid var(--accent);color:var(--accent);font-size:.8em;font-weight:600;animation:press 5s infinite;animation-delay:-1.1s}
.ai-hand .tap{left:6em;top:5.1em;animation-duration:5s;animation-delay:-1.1s}
@keyframes hd-s{0%,34%{opacity:0}40%,92%{opacity:1}100%{opacity:0}}
@keyframes hd-a{0%,46%{opacity:0;transform:translateY(.6em)}54%,92%{opacity:1;transform:none}100%{opacity:0}}

.ai-agent .pan{width:22em;padding:1.2em 1.3em;display:flex;flex-direction:column;gap:.6em}
.ai-agent .hd4{display:flex;justify-content:space-between;font-size:.9em;font-weight:700}
.ai-agent .hd4 em{font-style:normal;font-family:var(--f-mono);font-size:.8em;color:var(--ink-3);font-weight:400}
.ai-agent .st3{display:flex;align-items:center;gap:.6em;font-size:.85em}
.ai-agent .ic3{position:relative;width:1.5em;height:1.5em;flex:none}
.ai-agent .ic3 .spn{position:absolute;inset:0;width:auto;height:auto;border-width:.18em;opacity:0}
.ai-agent .ic3 b{position:absolute;inset:0;border-radius:50%;background:var(--accent);opacity:0}
.ai-agent .ic3 b::after{content:"";position:absolute;left:.5em;top:.28em;width:.35em;height:.7em;border:solid var(--accent-ink);border-width:0 .16em .16em 0;transform:rotate(45deg)}
.ai-agent .ic3 u{position:absolute;inset:0;border-radius:50%;border:.15em solid var(--line)}
.ai-agent .s1 .spn{animation:spin .8s linear infinite,ag-w1 6s steps(1) infinite}.ai-agent .s1 b{animation:ag-d1 6s steps(1) infinite}
.ai-agent .s2 .spn{animation:spin .8s linear infinite,ag-w2 6s steps(1) infinite}.ai-agent .s2 b{animation:ag-d2 6s steps(1) infinite}
.ai-agent .s3 .ic3 u{border-color:var(--warn);animation:ag-a 6s steps(1) infinite}
.ai-agent .ok3{align-self:flex-end;display:flex;gap:.4em;opacity:0;animation:ag-o 6s steps(1) infinite}
.ai-agent .ok3 .bt{font-size:.8em;padding:.35em .9em}
@keyframes ag-w1{0%{opacity:1}25%{opacity:0}}
@keyframes ag-d1{0%{opacity:0}25%{opacity:1}96%{opacity:0}}
@keyframes ag-w2{0%{opacity:0}25%{opacity:1}50%{opacity:0}}
@keyframes ag-d2{0%{opacity:0}50%{opacity:1}96%{opacity:0}}
@keyframes ag-a{0%{background:transparent}50%{background:var(--warn)}96%{background:transparent}}
@keyframes ag-o{0%{opacity:0}50%{opacity:1}96%{opacity:0}}
`;
s.items.push(
  {
    id: 'ai-fb', k: '답변 피드백', e: 'Thumbs up / down feedback',
    d: '답변마다 좋아요·싫어요 버튼을 두고, 싫어요를 누르면 무엇이 아쉬웠는지 짧게 고를 수 있게 해요.',
    u: '피드백은 한 번의 탭으로 끝나야 많이 모여요. 이유를 묻는 단계는 선택 사항으로 두고 칩으로 고르게 하세요. 피드백을 남기면 "알려주셔서 고마워요"처럼 반영됐다는 신호를 주세요.',
    html: `<div class="cht" style="position:relative"><div class="a"><i></i><div class="bub"><span class="ln" style="width:92%"></span><span class="ln" style="width:78%"></span></div></div><div class="acts"><i><svg viewBox="0 0 24 24"><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2 2v4h6a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 17.6 21H7"/></svg></i><i class="dn3"><svg viewBox="0 0 24 24"><path d="M7 13V4H4v9zM7 13l4 7a2 2 0 0 0 2-2v-4h6a2 2 0 0 0 2-2.3l-1.4-7A2 2 0 0 0 17.6 3H7"/></svg></i><i><svg viewBox="0 0 24 24"><path d="M9 9h10v10H9zM5 15V5h10"/></svg></i></div><div class="form box"><b>어떤 점이 아쉬웠나요?</b><div class="cps"><span>사실과 달라요</span><span class="k">너무 길어요</span><span>말투가 어색해요</span></div></div><span class="tap"></span></div>`
  },
  {
    id: 'ai-voice', k: '음성 입력', e: 'Voice input',
    d: '마이크 버튼을 누르고 말하면, 소리 크기에 맞춰 파형이 움직이고 말한 내용이 실시간으로 글자가 돼요.',
    u: '듣고 있다는 신호(파형, 빨간 점)가 확실해야 사람들이 안심하고 말해요. 인식된 글자는 보내기 전에 고칠 수 있게 하고, 조용한 곳이 아니어도 쓸 수 있도록 텍스트 입력도 함께 두세요. 마이크 권한은 버튼을 처음 누를 때 물어보세요.',
    html: `<div class="wr"><div class="tx txw">${'저는 사용자의 불편을 데이터로 찾아내는 디자이너입니다'.split(' ').map((w,i)=>`<span style="--i:${i*2+2}">${w} </span>`).join('')}</div><div class="wv">${[1.4,2.2,3,2.4,1.6,2.8,2,1.2,2.6,3,1.8,2.2,1.4].map((h,i)=>`<i style="--h:${h}em;--i:${i}"></i>`).join('')}</div><span class="mic"><svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span></div>`
  },
  {
    id: 'ai-label', k: 'AI 생성 표시', e: 'AI disclosure',
    d: 'AI가 만든 답변, 이미지, 요약에는 그렇다는 표시를 붙이고, 틀릴 수 있다는 안내를 함께 둬요.',
    u: '한국은 2026년 1월 22일 시행된 AI 기본법에 따라 생성형 AI 서비스라는 사실을 미리 알리고, 서비스 밖으로 내보내는 결과물에는 AI 생성 표시를 하도록 했어요(1년 이상 계도기간). 법과 별개로, 표시가 분명할수록 사용자는 결과를 알맞게 믿고 검토해요.',
    html: `<div class="card2 box"><span class="tg2"><i></i>AI가 만든 피드백</span><b>답변 속도가 안정적이었어요</b><div class="img"><span class="wm">AI 생성</span></div><span class="ds2">AI는 실수할 수 있어요. 중요한 내용은 직접 확인해 주세요.</span></div>`
  },
  {
    id: 'ai-conf', k: '불확실성 표시', e: 'Communicating uncertainty',
    d: 'AI가 확신하지 못하는 부분은 표시하고, 사용자가 직접 확인하도록 안내해요. 모든 답을 같은 자신감으로 말하면 틀린 답도 믿게 돼요.',
    u: '숫자·날짜·사람 이름·법률처럼 틀리면 곤란한 정보에 특히 필요해요. "확인이 필요해요" 표시와 함께 출처나 확인할 곳을 알려주세요. 확신도를 퍼센트 숫자로 보여주는 건 오히려 오해를 부르기 쉬워요.',
    html: `<div class="cht"><div class="a"><i></i><div class="bub">이 회사의 면접은 보통 3단계예요. 다만 <mark>최종 면접 일정은 매년 달라서</mark> 올해 일정은 공고를 확인해야 해요.</div></div><span class="nt">⚠ <b>확인이 필요한 내용</b>이 있어요 · 채용 공고 보기</span></div>`
  },
  {
    id: 'ai-hand', k: '사람에게 넘기기', e: 'Human handoff',
    d: 'AI가 해결하지 못하거나 사용자가 원하면, 대화 내용을 그대로 이어받아 사람 상담사에게 연결해요.',
    u: '"상담사 연결"을 숨기거나 몇 번이나 거절하게 만들면 다크 패턴이 돼요. 넘길 때는 앞의 대화를 상담사가 볼 수 있게 해서 같은 설명을 반복하지 않게 하고, 예상 대기 시간을 알려주세요.',
    html: `<div class="cht" style="position:relative"><div class="a"><i></i><div class="bub">환불 규정은 이렇게 돼요. 더 자세한 상담이 필요하면 상담사를 연결해 드릴게요.</div></div><span class="hb">상담사 연결하기</span><span class="sys">상담사 박서연 님이 대화에 들어왔어요 · 이전 대화를 확인했어요</span><div class="ag"><i></i><div class="bub">안녕하세요! 앞 내용 확인했어요. 결제 내역부터 같이 볼게요.</div></div><span class="tap"></span></div>`
  },
  {
    id: 'ai-agent', k: '에이전트 진행 상황', e: 'Agent progress · Approval',
    d: 'AI가 여러 단계를 스스로 처리할 때 지금 어느 단계인지 보여주고, 결제·전송처럼 되돌리기 어려운 일은 실행 전에 사용자 승인을 받아요.',
    u: '단계 목록, 현재 진행 중인 일, 끝난 일을 구분해서 보여주세요. 오래 걸리면 다른 일을 해도 되고 끝나면 알려준다고 안내하세요. 돈이 나가거나 다른 사람에게 보내는 일은 반드시 멈추고 확인을 받아야 해요.',
    html: `<div class="pan box"><div class="hd4">면접 일정 잡기<em>3단계</em></div><span class="st3 s1"><span class="ic3"><u></u><span class="spn"></span><b></b></span>내 캘린더에서 빈 시간 찾기</span><span class="st3 s2"><span class="ic3"><u></u><span class="spn"></span><b></b></span>담당자 메일 초안 쓰기</span><span class="st3 s3"><span class="ic3"><u></u></span>메일 보내기 · 승인이 필요해요</span><div class="ok3"><span class="bt g">수정</span><span class="bt">승인하고 보내기</span></div></div>`
  }
);
})();
