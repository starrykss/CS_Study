(window.UX = window.UX || []).push({
  id: 's-ai', short: 'AI UX', en: 'AI UX',
  title: 'AI와 함께 쓰는 화면',
  sub: '생성형 AI는 결과가 매번 다르고, 틀릴 수도 있고, 시간이 걸려요. 그래서 기다림, 신뢰, 통제를 새롭게 설계해야 해요.',
  css: `
.sc .cht{display:flex;flex-direction:column;gap:.6em;width:22em}
.sc .cht .u{align-self:flex-end;max-width:80%;padding:.6em .9em;border-radius:1.1em 1.1em .3em 1.1em;background:var(--accent);color:var(--accent-ink);font-size:.85em}
.sc .cht .a{display:flex;gap:.5em;align-items:flex-start}
.sc .cht .a>i{flex:none;width:2em;height:2em;border-radius:50%;background:conic-gradient(from 45deg,#5B4BFF,#2BC995,#E8960B,#5B4BFF);position:relative}
.sc .cht .a>i::after{content:"";position:absolute;inset:.35em;border-radius:50%;background:var(--stage)}
.sc .cht .bub{flex:1;padding:.7em .9em;border-radius:.3em 1.1em 1.1em 1.1em;background:var(--ui);border:.1em solid var(--rule);font-size:.85em;line-height:1.55;min-width:0}

@property --sn{syntax:'<integer>';inherits:true;initial-value:0}
.ai-stream .bub{animation:str-n 5s linear infinite}
.ai-stream .bub span{opacity:clamp(0,var(--sn) - var(--i),1)}
.ai-stream .cur2{display:inline-block;width:.55em;height:.55em;border-radius:50%;background:var(--accent);margin-left:.2em;vertical-align:middle;animation:blink .6s steps(1) infinite}
@keyframes str-n{0%,8%{--sn:0}70%,92%{--sn:17}100%{--sn:0}}

.ai-think .lbl{position:relative;display:grid;font-weight:600;font-size:.9em}
.ai-think .lbl span{grid-area:1/1;opacity:0;animation:cyc3 6s steps(1) infinite;background:linear-gradient(90deg,var(--ink-3) 0 35%,var(--ink) 50%,var(--ink-3) 65% 100%) 0 0/300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent}
.ai-think .lbl span{animation:cyc3 6s steps(1) infinite,shim 1.6s linear infinite}
.ai-think .dots{display:flex;gap:.3em;margin-top:.5em}
.ai-think .dots i{width:.5em;height:.5em;border-radius:50%;background:var(--ink-3);animation:thk-d 1.2s ease-in-out infinite}
.ai-think .dots i:nth-child(2){animation-delay:.15s}.ai-think .dots i:nth-child(3){animation-delay:.3s}
.ai-think .stp{display:flex;flex-direction:column;gap:.3em;margin-top:.6em;font-size:.8em;color:var(--ink-2)}
.ai-think .stp span{display:flex;align-items:center;gap:.4em;opacity:.3}
.ai-think .stp span::before{content:"✓";color:var(--accent);font-weight:700}
.ai-think .stp span:nth-child(1){animation:thk-1 6s steps(1) infinite}.ai-think .stp span:nth-child(2){animation:thk-2 6s steps(1) infinite}
@keyframes thk-d{0%,100%{transform:none;opacity:.4}40%{transform:translateY(-.3em);opacity:1}}
@keyframes thk-1{0%{opacity:.3}33.3%{opacity:1}}
@keyframes thk-2{0%{opacity:.3}66.6%{opacity:1}}

.ai-chips .wr{display:flex;flex-direction:column;gap:.7em;width:22em}
.ai-chips .hi{font-size:1.1em;font-weight:700;animation:chp-h 4s infinite}
.ai-chips .cps{display:flex;flex-direction:column;gap:.45em;animation:chp-h 4s infinite}
.ai-chips .cps span{align-self:flex-start;padding:.5em .9em;border-radius:1.2em;border:.12em solid var(--frame);background:var(--ui);font-size:.85em}
.ai-chips .cps .k{animation:chp-k 4s infinite}
.ai-chips .u{opacity:0;animation:chp-u 4s cubic-bezier(.2,.8,.2,1) infinite;align-self:flex-end;margin-top:-6em}
.ai-chips .tap{left:34%;top:54%;animation-delay:-.72s}
@keyframes chp-h{0%,32%{opacity:1}40%,92%{opacity:0}100%{opacity:1}}
@keyframes chp-k{0%,26%{background:var(--ui)}30%,36%{background:var(--accent-soft);border-color:var(--accent)}}
@keyframes chp-u{0%,38%{opacity:0;transform:translateY(2em)}48%,90%{opacity:1;transform:none}98%,100%{opacity:0}}

.ai-src sup{display:inline-grid;place-items:center;min-width:1.4em;height:1.4em;padding:0 .3em;border-radius:.4em;background:var(--accent-soft);color:var(--accent);font-family:var(--f-mono);font-size:.65em;font-weight:600;vertical-align:.3em}
.ai-src .s1{animation:src-h 4s infinite}
.ai-src .bub{position:relative}
.ai-src .srcc{position:absolute;left:3em;top:3.4em;width:14em;padding:.7em .8em;display:flex;flex-direction:column;gap:.25em;font-size:.8em;z-index:3;opacity:0;animation:src-c 4s cubic-bezier(.2,.8,.2,1) infinite}
.ai-src .srcc em{font-style:normal;font-family:var(--f-mono);font-size:.85em;color:var(--ink-3)}
.ai-src .sl{display:flex;gap:.4em;margin-top:.5em}
.ai-src .sl span{display:flex;align-items:center;gap:.3em;padding:.25em .55em;border-radius:.4em;background:var(--stage);font-size:.75em}
.ai-src .sl i{width:.8em;height:.8em;border-radius:.2em;background:var(--accent)}
.ai-src .cur{left:12em;top:6em;animation:src-m 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes src-h{0%,30%{background:var(--accent-soft)}36%,84%{background:var(--accent);color:var(--accent-ink)}90%,100%{background:var(--accent-soft)}}
@keyframes src-c{0%,32%{opacity:0;transform:translateY(.4em)}38%,84%{opacity:1;transform:none}90%,100%{opacity:0}}
@keyframes src-m{0%,8%{transform:translate(5em,4em)}30%,86%{transform:none}100%{transform:translate(5em,4em)}}

.ai-stop .bub{display:flex;flex-direction:column;gap:.45em}
.ai-stop .bub .ln{animation:stp-w 5s linear infinite backwards;max-width:var(--w);width:0}
.ai-stop .bub .ln:nth-child(2){animation-delay:.35s}.ai-stop .bub .ln:nth-child(3){animation-delay:.7s}
.ai-stop .ctl{align-self:center;display:grid;margin-top:.4em}
.ai-stop .ctl span{grid-area:1/1;padding:.45em 1em;border-radius:2em;border:.12em solid var(--frame);background:var(--ui);font-size:.8em;font-weight:600;white-space:nowrap;text-align:center}
.ai-stop .c1{animation:btln-1 5s steps(1) infinite}
.ai-stop .c2{opacity:0;color:var(--accent);animation:btln-2 5s steps(1) infinite}
.ai-stop .note{align-self:center;font-size:.72em;color:var(--ink-3);opacity:0;animation:btln-2 5s steps(1) infinite}
.ai-stop .tap{left:50%;top:57%;animation-duration:5s;animation-delay:-.3s}
@keyframes stp-w{0%{width:0}40%,92%{width:100%}100%{width:0}}

.ai-regen .bub{position:relative;display:grid}
.ai-regen .bub>div{grid-area:1/1;display:flex;flex-direction:column;gap:.45em}
.ai-regen .v1{animation:rg-1 5s infinite}
.ai-regen .sk2{opacity:0;animation:rg-s 5s infinite}
.ai-regen .v2{opacity:0;animation:rg-2 5s infinite}
.ai-regen .v2 .ln{background:var(--accent-soft)}
.ai-regen .tb2{display:flex;align-items:center;gap:.8em;margin:.4em 0 0 2.5em;font-size:.75em;color:var(--ink-2)}
.ai-regen .tb2 b{font-weight:600;color:var(--ink)}
.ai-regen .pg2{display:grid;font-family:var(--f-mono)}
.ai-regen .pg2 span{grid-area:1/1}
.ai-regen .p1{animation:btln-1 5s steps(1) infinite;animation-delay:-.6s}.ai-regen .p2{opacity:0;animation:btln-2 5s steps(1) infinite;animation-delay:-.6s}
.ai-regen .tap{left:21em;top:0;animation-duration:5s;animation-delay:-1.2s}
@keyframes rg-1{0%,22%{opacity:1}26%,96%{opacity:0}100%{opacity:1}}
@keyframes rg-s{0%,24%{opacity:0}28%,46%{opacity:1}50%,100%{opacity:0}}
@keyframes rg-2{0%,46%{opacity:0}52%,94%{opacity:1}100%{opacity:0}}
`,
  items: [
    {
      id: 'ai-stream', k: '스트리밍 응답', e: 'Streaming response',
      d: 'AI의 답변을 다 만들 때까지 기다리지 않고, 만들어지는 대로 글자를 흘려서 보여줘요. 첫 글자가 빨리 보이면 기다림이 짧게 느껴져요.',
      u: '글이 계속 길어지는 동안 화면이 저절로 아래로 내려가면 읽던 위치를 잃어요. 사용자가 위로 스크롤하면 자동 스크롤을 멈추고, 끝으로 돌아가는 버튼을 보여주세요. 표나 코드처럼 형식이 있는 내용은 모양이 깨졌다 붙었다 하지 않게 다듬으세요.',
      html: `<div class="cht"><span class="u">자기소개 첫 문장 추천해 줘</span><div class="a"><i></i><div class="bub">${'사용자 경험을 숫자로 증명해 온 3년 차 프로덕트 디자이너 김지원입니다. 최근에는 가입 단계를 줄여 전환율을 18% 높였어요.'.split(' ').map((w,i)=>`<span style="--i:${i}">${w} </span>`).join('')}<i class="cur2"></i></div></div></div>`
    },
    {
      id: 'ai-think', k: '생각 중 표시', e: 'Thinking indicator',
      d: '답이 나오기 전 몇 초 동안, AI가 지금 무엇을 하고 있는지 단계별로 보여줘서 멈춘 게 아니라는 걸 알려줘요.',
      u: '"생각하는 중…" 하나보다 "질문 이해 → 자료 찾기 → 답변 정리"처럼 진행 단계를 보여주면 기다림이 덜 지루해요. 자세한 추론 과정은 접어 두고 원하는 사람만 펼쳐 보게 하세요.',
      html: `<div class="cht"><span class="u">이 회사 면접 질문 예상해 줘</span><div class="a"><i></i><div class="bub"><div class="lbl"><span style="animation-delay:0s,0s">질문을 이해하는 중</span><span style="animation-delay:-4s,0s">채용 공고를 읽는 중</span><span style="animation-delay:-2s,0s">예상 질문을 정리하는 중</span></div><div class="stp"><span>질문 이해</span><span>공고 분석</span><span>질문 정리</span></div></div></div></div>`
    },
    {
      id: 'ai-chips', k: '추천 질문', e: 'Prompt suggestions',
      d: '빈 입력창 앞에서 무엇을 물어야 할지 모르는 사람에게, 바로 눌러 볼 수 있는 질문 예시를 칩으로 보여줘요.',
      u: '"무엇이든 물어보세요"만 두면 첫 질문을 떠올리기 어려워요. 서비스가 잘하는 일을 보여주는 구체적인 질문 3~4개를 두세요. 대화 중간에도 다음에 물어볼 만한 질문을 제안하면 대화가 이어져요.',
      html: `<div class="wr"><span class="hi">무엇을 연습해 볼까요?</span><div class="cps"><span>1분 자기소개 피드백 받기</span><span class="k">지원 동기 예상 질문 만들기</span><span>내 답변 말투 다듬기</span></div><div class="cht" style="width:auto"><span class="u">지원 동기 예상 질문 만들기</span></div><span class="tap"></span></div>`
    },
    {
      id: 'ai-src', k: '출처 표시', e: 'Citations',
      d: '답변 속 주장 옆에 번호를 달고, 누르거나 마우스를 올리면 어떤 자료에서 가져왔는지 보여줘요.',
      u: '사람들이 AI 답변을 믿을지 판단하는 가장 확실한 근거예요. 출처는 원문으로 바로 갈 수 있어야 하고, 출처가 없는 내용은 없다는 걸 숨기지 마세요. 번호가 문장 흐름을 너무 끊지 않게 작게 두세요.',
      html: `<div class="cht"><div class="a"><i></i><div class="bub">이 회사는 올해 디자인 팀을 두 배로 늘렸어요<sup class="s1">1</sup>. 면접은 과제 발표를 포함해 3단계예요<sup>2</sup>.<div class="sl"><span><i></i>채용 공고</span><span><i style="background:var(--warn)"></i>기술 블로그</span></div><div class="srcc box"><b>2026 디자인 팀 채용 공고</b><em>careers.example.com</em></div></div></div></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span>`
    },
    {
      id: 'ai-stop', k: '생성 멈추기', e: 'Stop generating',
      d: 'AI가 답을 만드는 도중에도 사용자가 언제든 멈출 수 있게 버튼을 줘요. 원하는 방향이 아니면 끝까지 기다릴 필요가 없어요.',
      u: '멈추기 버튼은 답변이 만들어지는 동안 전송 버튼 자리에 두는 경우가 많아요. 멈춘 뒤에도 그때까지 나온 내용은 남기고, 이어서 쓰거나 질문을 고쳐 다시 보낼 수 있게 하세요.',
      html: `<div class="cht"><div class="a"><i></i><div class="bub"><span class="ln" style="--w:95%"></span><span class="ln" style="--w:88%"></span><span class="ln" style="--w:35%"></span></div></div><div class="ctl"><span class="c1">■ 멈추기</span><span class="c2">↻ 이어서 쓰기</span></div><span class="note">응답을 멈췄어요</span><span class="tap"></span></div>`
    },
    {
      id: 'ai-regen', k: '다시 생성', e: 'Regenerate · Versions',
      d: '마음에 들지 않는 답을 다시 만들게 하고, 이전 답과 새 답을 1/2, 2/2처럼 넘겨 보며 비교하게 해요.',
      u: '다시 생성해도 이전 답이 사라지지 않아야 해요. 사람들은 앞의 답이 더 나았다는 걸 나중에 깨닫곤 해요. "더 짧게", "더 공손하게"처럼 방향을 고를 수 있으면 막연히 다시 누르는 것보다 원하는 결과에 빨리 닿아요.',
      html: `<div class="cht" style="position:relative"><div class="a"><i></i><div class="bub"><div class="v1"><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span><span class="ln" style="width:82%"></span></div><div class="sk2"><span class="ln sk" style="width:90%"></span><span class="ln sk" style="width:70%"></span><span class="ln sk" style="width:80%"></span></div><div class="v2"><span class="ln" style="width:85%"></span><span class="ln" style="width:92%"></span><span class="ln" style="width:60%"></span></div></div></div><div class="tb2"><span class="pg2"><span class="p1">‹ 1/1</span><span class="p2">‹ 2/2</span></span><b>↻ 다시 생성</b><span>더 짧게</span><span>더 공손하게</span></div><span class="tap" style="left:7.8em;top:5.3em"></span></div>`
    }
  ]
});
