(window.UX = window.UX || []).push({
  id: 's-visual', short: '비주얼 원칙', en: 'Layout & visual',
  title: '보기 좋은 화면의 원칙',
  sub: '감각처럼 보여도 대부분은 규칙이에요. 간격, 정렬, 대비, 위계만 지켜도 화면이 정돈돼요.',
  css: `
.v-grid .pan{position:relative;width:20em;height:14em;background-color:var(--ui);background-image:linear-gradient(color-mix(in srgb,var(--accent) 22%,transparent) .05em,transparent .05em),linear-gradient(90deg,color-mix(in srgb,var(--accent) 22%,transparent) .05em,transparent .05em);background-size:.8em .8em;background-position:-.06em -.06em}
.v-grid .el{position:absolute;left:1.6em;top:1.6em;width:9.6em;padding:1.6em;display:flex;flex-direction:column;gap:.8em;border-radius:.8em;background:var(--accent-soft);border:.1em solid var(--accent);animation:grid-s 4s cubic-bezier(.3,.7,.2,1.3) infinite}
.v-grid .el2{left:12.8em;top:1.6em;width:5.6em;height:4em;padding:0;animation-delay:.2s;animation-fill-mode:backwards;animation-name:grid-s2}
.v-grid .ms{position:absolute;font-family:var(--f-mono);font-size:.75em;color:var(--accent);font-weight:500;opacity:0;animation:grid-m 4s infinite}
.v-grid .m1{left:2.5em;top:.4em}.v-grid .m2{left:.3em;top:3.4em}
@keyframes grid-s{0%,16%{transform:translate(.45em,.3em)}30%,90%{transform:none}100%{transform:translate(.45em,.3em)}}
@keyframes grid-s2{0%,16%{transform:translate(-.3em,.55em)}30%,90%{transform:none}100%{transform:translate(-.3em,.55em)}}
@keyframes grid-m{0%,30%{opacity:0}38%,88%{opacity:1}96%,100%{opacity:0}}

.v-hier .pan{width:20em;padding:1.6em 1.8em;display:flex;flex-direction:column;align-items:flex-start;gap:.5em}
.v-hier .a,.v-hier .b,.v-hier .c{font-size:1em;font-weight:400;color:var(--ink-2);line-height:1.3}
.v-hier .a{animation:hier-a 4s cubic-bezier(.3,.7,.2,1) infinite}
.v-hier .b{animation:hier-b 4s cubic-bezier(.3,.7,.2,1) infinite}
.v-hier .c{animation:hier-c 4s cubic-bezier(.3,.7,.2,1) infinite}
.v-hier .bt{font-size:.9em;margin-top:.5em;animation:hier-d 4s infinite}
@keyframes hier-a{0%,18%{font-size:1em;font-weight:400;color:var(--ink-2)}34%,88%{font-size:2em;font-weight:700;color:var(--ink)}100%{font-size:1em;font-weight:400;color:var(--ink-2)}}
@keyframes hier-b{0%,18%{font-size:1em;color:var(--ink-2)}34%,88%{font-size:1.15em;color:var(--ink)}100%{font-size:1em;color:var(--ink-2)}}
@keyframes hier-c{0%,18%{font-size:1em;color:var(--ink-2)}34%,88%{font-size:.85em;color:var(--ink-3)}100%{font-size:1em;color:var(--ink-2)}}
@keyframes hier-d{0%,18%{background:var(--line);color:var(--ink-2)}34%,88%{background:var(--accent);color:var(--accent-ink)}100%{background:var(--line);color:var(--ink-2)}}

.v-prox .gr{display:grid;grid-template-columns:repeat(3,auto);row-gap:1em;animation:prox-r 4s cubic-bezier(.4,0,.2,1) infinite}
.v-prox .gr span{display:flex;gap:1em;animation:prox-c 4s cubic-bezier(.4,0,.2,1) infinite}
.v-prox .gr span:not(:nth-child(3n+1)){margin-left:1em;animation:prox-g 4s cubic-bezier(.4,0,.2,1) infinite}
.v-prox i{width:1.8em;height:1.8em;border-radius:50%;background:var(--ink-2)}
@keyframes prox-c{0%,18%,94%,100%{gap:1em}36%,80%{gap:.3em}}
@keyframes prox-g{0%,18%,94%,100%{margin-left:1em}36%,80%{margin-left:2.4em}}
@keyframes prox-r{0%,100%{row-gap:1em}}

.v-sim .gr{display:grid;grid-template-columns:repeat(6,2.2em);gap:.9em}
.v-sim i{width:2.2em;height:2.2em;border-radius:50%;background:var(--line)}
.v-sim .s{animation:sim-k 4s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes sim-k{0%,18%{background:var(--line);border-radius:50%}32%,86%{background:var(--accent);border-radius:.45em}96%,100%{background:var(--line);border-radius:50%}}

.v-align .pan{position:relative;width:19em;padding:1.6em 1.8em;display:flex;flex-direction:column;gap:.7em}
.v-align .pan>*{animation:al-k 4s cubic-bezier(.3,.7,.2,1.2) infinite}
.v-align .a1{--o:.9em}.v-align .a2{--o:-.5em}.v-align .a3{--o:1.6em}.v-align .a4{--o:.4em}
.v-align .gd{position:absolute;left:1.8em;top:.6em;bottom:.6em;width:.12em;background:var(--danger);opacity:0;animation:al-g 4s infinite}
.v-align .bt{align-self:flex-start;font-size:.9em}
@keyframes al-k{0%,18%{transform:translateX(var(--o,0))}32%,88%{transform:none}100%{transform:translateX(var(--o,0))}}
@keyframes al-g{0%,24%{opacity:0;transform:scaleY(0)}34%,82%{opacity:1;transform:none}92%,100%{opacity:0}}

.v-space .pan{width:19em;display:flex;flex-direction:column;animation:sp-p 4s cubic-bezier(.4,0,.2,1) infinite}
.v-space .pan .im{height:4em;border-radius:.4em}
.v-space .pan>*{animation:sp-m 4s cubic-bezier(.4,0,.2,1) infinite}
.v-space .pan .bt{align-self:flex-start;font-size:.85em;padding:.35em .9em}
@keyframes sp-p{0%,18%{padding:.3em}36%,84%{padding:1.4em}100%{padding:.3em}}
@keyframes sp-m{0%,18%{margin-bottom:.15em}36%,84%{margin-bottom:.8em}100%{margin-bottom:.15em}}
`,
  items: [
    {
      id: 'v-grid', k: '8pt 그리드', e: '8-point grid',
      d: '여백과 크기를 8의 배수(8, 16, 24, 32…)로만 정해서, 어디서든 간격이 일정하게 맞아떨어지게 해요.',
      u: '디자이너와 개발자가 "16 띄워 주세요"처럼 같은 숫자로 말할 수 있고, 대부분의 화면 크기가 8로 나눠떨어져 반쪽 픽셀이 생기지 않아요. 아이콘·글자 줄 간격처럼 세밀한 곳은 4의 배수를 함께 써요.',
      html: `<div class="pan box"><div class="el"><span class="ln h" style="width:70%"></span><span class="ln" style="width:100%"></span><span class="ln" style="width:60%"></span></div><div class="el el2"></div><span class="ms m1">16</span><span class="ms m2">16</span></div>`
    },
    {
      id: 'v-hier', k: '시각적 위계', e: 'Visual hierarchy',
      d: '크기, 굵기, 색으로 중요한 것부터 순서대로 읽히게 만드는 거예요. 모든 게 같으면 아무것도 먼저 보이지 않아요.',
      u: '한 화면에서 가장 먼저 봐야 할 것 하나, 다음 둘, 나머지로 3단계 정도만 나누세요. 강조 수단은 크기 → 굵기 → 색 순으로 아껴 쓰고, 주요 버튼은 화면에 하나만 꽉 찬 색으로 두세요.',
      html: `<div class="pan box"><span class="a">모의면접 결과</span><span class="b">답변 속도가 안정적이었어요</span><span class="c">2026.11.08 · 12분 · 질문 8개</span><span class="bt">다시 보기</span></div>`
    },
    {
      id: 'v-prox', k: '근접성', e: 'Gestalt · Proximity',
      d: '가까이 있는 것들은 같은 묶음으로 보여요. 선이나 상자 없이 간격만으로도 그룹을 만들 수 있어요.',
      u: '라벨은 설명하는 입력란에 붙이고, 다른 그룹과는 확실히 띄우세요. 묶음 안 간격은 좁게, 묶음 사이 간격은 그 두 배 이상으로 두면 구분선이 필요 없어져요.',
      html: `<div class="gr"><span><i></i><i></i><i></i></span><span><i></i><i></i><i></i></span><span><i></i><i></i><i></i></span><span><i></i><i></i><i></i></span><span><i></i><i></i><i></i></span><span><i></i><i></i><i></i></span></div>`
    },
    {
      id: 'v-sim', k: '유사성', e: 'Gestalt · Similarity',
      d: '색, 모양, 크기가 같은 것들은 떨어져 있어도 같은 종류로 보여요.',
      u: '누를 수 있는 것은 모두 같은 색, 같은 모양으로 맞추세요. 링크 색을 장식용 글자에도 쓰면 사람들이 눌러 보게 되고, 반대로 버튼 모양이 제각각이면 어떤 게 버튼인지 헷갈려요.',
      html: `<div class="gr"><i></i><i class="s"></i><i></i><i></i><i class="s"></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i><i></i><i></i><i></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i></div>`
    },
    {
      id: 'v-align', k: '정렬', e: 'Alignment',
      d: '요소들의 가장자리를 보이지 않는 같은 선에 맞추면, 따로 꾸미지 않아도 화면이 정돈돼 보여요.',
      u: '한글 본문은 왼쪽 정렬이 기본이에요. 가운데 정렬은 짧은 제목이나 빈 상태 화면에만 쓰세요. 아이콘이 있는 목록은 아이콘이 아니라 글자 시작점을 기준으로 맞추는 게 자연스러워요.',
      html: `<div class="pan box"><i class="gd"></i><span class="ln h a1" style="width:60%"></span><span class="ln a2" style="width:85%"></span><span class="ln a3" style="width:70%"></span><span class="bt a4">확인</span></div>`
    },
    {
      id: 'v-space', k: '여백', e: 'White space',
      d: '아무것도 없는 공간도 디자인이에요. 충분한 여백은 내용을 읽기 쉽게 하고 고급스러운 인상을 줘요.',
      u: '정보를 더 넣고 싶을 때 여백부터 줄이지 마세요. 줄 간격은 글자 크기의 1.5배 안팎, 카드 안쪽 여백은 최소 16px이 기준이에요. 여백이 부족하면 내용을 줄이거나 화면을 나누세요.',
      html: `<div class="pan box"><span class="im"></span><span class="ln h" style="width:65%"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:75%"></span><span class="bt">자세히</span></div>`
    }
  ]
});
