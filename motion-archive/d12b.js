(() => {
const s = window.UX.find(x => x.id === 's-usab');
s.css += `
.u-prev .pan{width:20em;padding:1.1em;display:flex;flex-direction:column;gap:.6em}
.u-prev .hd3{display:flex;gap:.5em;font-size:.75em}
.u-prev .hd3 span{flex:1;padding:.4em .6em;border-radius:.5em;border:.12em solid var(--frame);display:flex;flex-direction:column}
.u-prev .hd3 span b{font-size:1.15em}
.u-prev .hd3 .ci{border-color:var(--accent)}
.u-prev .hd3 .co b{opacity:0;animation:prv-o 4s infinite}
.u-prev .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:.2em;font-size:.72em;text-align:center;font-variant-numeric:tabular-nums}
.u-prev .cal span{line-height:2em;border-radius:50%}
.u-prev .cal .p{color:var(--ink-3);text-decoration:line-through;opacity:.5}
.u-prev .cal .s{background:var(--accent);color:var(--accent-ink)}
.u-prev .cal .r{background:var(--accent-soft);border-radius:0;animation:prv-r 4s infinite}
.u-prev .cal .e{animation:prv-e 4s infinite}
.u-prev .tap{left:50%;top:64%;animation-delay:-.72s}
@keyframes prv-o{0%,28%{opacity:0}34%,90%{opacity:1}100%{opacity:0}}
@keyframes prv-r{0%,28%{background:transparent}34%,90%{background:var(--accent-soft)}100%{background:transparent}}
@keyframes prv-e{0%,28%{background:transparent;color:var(--ink)}34%,90%{background:var(--accent);color:var(--accent-ink)}100%{background:transparent;color:var(--ink)}}

.u-short .ap{position:relative;width:24em;height:15em;border-radius:1em;border:.14em solid var(--frame);background:var(--ui);overflow:hidden;padding:1em;display:flex;flex-direction:column;gap:.6em}
.u-short .dm{animation:alt-d 4s infinite}
.u-short .pal{position:absolute;left:50%;top:1.8em;width:17em;margin-left:-8.5em;padding:.6em;display:flex;flex-direction:column;gap:.3em;z-index:3;animation:sh-p 4s cubic-bezier(.2,.8,.2,1) infinite}
.u-short .in{display:flex;align-items:center;height:2.2em;padding:0 .7em;border-radius:.5em;background:var(--stage);font-size:.85em}
.u-short .ty{display:inline-block;max-width:0;overflow:hidden;white-space:nowrap;animation:sh-t 4s steps(3,end) infinite}
.u-short .op{display:flex;justify-content:space-between;padding:.4em .7em;border-radius:.4em;font-size:.8em}
.u-short .op.k{background:var(--accent-soft)}
.u-short .op em{font-style:normal;font-family:var(--f-mono);color:var(--ink-3);font-size:.9em}
.u-short .op.x{animation:sh-x 4s infinite}
.u-short .key{position:absolute;right:1em;bottom:1em;display:flex;gap:.3em;z-index:4}
.u-short .key span{padding:.3em .6em;border-radius:.35em;border:.12em solid var(--frame);border-bottom-width:.3em;background:var(--ui);font-family:var(--f-mono);font-size:.85em;animation:sh-k 4s infinite}
@keyframes sh-p{0%,16%{opacity:0;transform:scale(.96)}22%,82%{opacity:1;transform:none}90%,100%{opacity:0}}
@keyframes sh-t{0%,26%{max-width:0}40%,82%{max-width:3em}90%,100%{max-width:0}}
@keyframes sh-x{0%,36%{max-height:3em;opacity:1}42%,100%{max-height:0;opacity:0;padding-block:0}}
@keyframes sh-k{0%,10%,22%,100%{transform:none;border-bottom-width:.3em}14%,18%{transform:translateY(.15em);border-bottom-width:.15em}}

.u-help .pan{position:relative;width:20em;padding:1.3em;display:flex;flex-direction:column;gap:.5em}
.u-help .lb{display:flex;align-items:center;gap:.4em;font-size:.85em;font-weight:600;color:var(--ink-2)}
.u-help .q{width:1.4em;height:1.4em;border-radius:50%;border:.14em solid var(--ink-3);display:grid;place-items:center;font-size:.8em;color:var(--ink-3)}
.u-help .in{height:2.4em;border:.14em solid var(--frame);border-radius:.6em}
.u-help .po{position:absolute;left:5.2em;top:3.6em;width:13em;padding:.7em .8em;font-size:.75em;line-height:1.5;z-index:2;transform-origin:0 0;animation:hlp-p 4s cubic-bezier(.2,.8,.2,1) infinite}
.u-help .po b{display:block;margin-bottom:.2em}
.u-help .tap{left:38%;top:21%;animation-delay:-.96s}
@keyframes hlp-p{0%,24%{opacity:0;transform:scale(.9)}30%,84%{opacity:1;transform:none}90%,100%{opacity:0}}

.u-postel .wr{display:flex;align-items:center;gap:1.2em}
.u-postel .ins{display:flex;flex-direction:column;gap:.5em}
.u-postel .ins span{padding:.5em .8em;border-radius:.5em;background:var(--ui);border:.12em solid var(--frame);font-family:var(--f-mono);font-size:.85em;white-space:nowrap;animation:pst-i 4s infinite backwards}
.u-postel .ins span:nth-child(2){animation-delay:.15s}.u-postel .ins span:nth-child(3){animation-delay:.3s}.u-postel .ins span:nth-child(4){animation-delay:.45s}
.u-postel .ar{font-size:1.4em;color:var(--accent)}
.u-postel .out{padding:.8em 1em;border-radius:.6em;background:var(--accent-soft);font-family:var(--f-mono);font-weight:500;animation:pst-o 4s infinite}
@keyframes pst-i{0%,4%{opacity:0;transform:translateX(-.5em)}12%,40%{opacity:1;transform:none}52%,90%{opacity:.35;transform:translateX(.5em)}100%{opacity:0}}
@keyframes pst-o{0%,44%{opacity:0;transform:scale(.9)}54%,90%{opacity:1;transform:none}100%{opacity:0}}

.u-cons .stk{position:relative;width:12em;height:20em}
.u-cons .ph{position:absolute;inset:0;width:100%;height:100%;animation:cns-k 6s cubic-bezier(.4,0,.2,1) infinite}
.u-cons .ph .bt{margin-top:auto;font-size:.9em}
.u-cons .ph:nth-child(2){animation-delay:-4s}.u-cons .ph:nth-child(3){animation-delay:-2s}
@keyframes cns-k{0%{transform:none;opacity:1;z-index:3}30%{transform:none;opacity:1}33.3%{transform:translateX(-2em) scale(.92);opacity:0}34%,96%{transform:translateX(2em) scale(.92);opacity:0}100%{transform:none;opacity:1}}

.u-aff .wr{display:flex;gap:1.6em}
.u-aff .pan{width:10.6em;height:11em;padding:1.1em;display:flex;flex-direction:column;justify-content:center;gap:.8em}
.u-aff .flat{font-size:.9em;color:var(--ink-2)}
.u-aff .lk{display:inline-flex;align-items:center;gap:.3em;font-size:.9em;font-weight:600;color:var(--accent)}
.u-aff .lk::after{content:"›";font-size:1.3em;line-height:1}
.u-aff .bt{font-size:.85em}
.u-aff .cur{animation:aff-c 4s cubic-bezier(.4,0,.2,1) infinite}
.u-aff .bad .cur{left:2.4em;top:6em;animation-name:aff-w}
.u-aff .good .cur{left:4em;top:7.6em}
@keyframes aff-w{0%,100%{transform:translate(0,0)}25%{transform:translate(4em,-2em)}50%{transform:translate(1em,-3.4em)}75%{transform:translate(5em,.4em)}}
@keyframes aff-c{0%,10%{transform:translate(4em,2em)}36%,86%{transform:none}100%{transform:translate(4em,2em)}}
`;
s.items.push(
  {
    id: 'u-prev', k: '오류 예방', e: 'Error prevention',
    d: '틀린 다음에 알려주는 것보다, 애초에 틀릴 수 없게 만드는 게 더 좋아요. 고를 수 없는 선택지는 미리 막아 두세요.',
    u: '닐슨 휴리스틱 5번이에요. 지난 날짜 막기, 재고보다 많은 수량 막기, 형식이 정해진 칸에 맞는 키보드 띄우기가 예시예요. 막을 때는 이유도 보여주세요. 중요한 결정 전에는 요약 화면으로 한 번 더 확인하게 하세요.',
    html: `<div class="pan box"><div class="hd3"><span class="ci">체크인<b>11.8 (일)</b></span><span class="co">체크아웃<b>11.11 (수)</b></span></div><div class="cal"><span class="p">1</span><span class="p">2</span><span class="p">3</span><span class="p">4</span><span class="p">5</span><span class="p">6</span><span class="p">7</span><span class="s">8</span><span class="r">9</span><span class="r">10</span><span class="e">11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span></div><span class="tap"></span></div>`
  },
  {
    id: 'u-short', k: '단축키와 명령 팔레트', e: 'Accelerators · Command palette',
    d: '처음 쓰는 사람에게는 메뉴를, 익숙한 사람에게는 단축키와 ⌘K 명령 팔레트 같은 지름길을 함께 제공해요.',
    u: '닐슨 휴리스틱 7번(유연성과 효율성)이에요. 지름길은 숨겨진 기능이라 메뉴 옆에 단축키를 적어 두면 자연스럽게 배워요. 자주 쓰는 동작부터 단축키를 정하고, 운영체제 기본 단축키와 겹치지 않게 하세요.',
    html: `<div class="ap"><span class="ln h" style="width:30%"></span><span class="ln" style="width:80%"></span><span class="ln" style="width:65%"></span><span class="ln" style="width:72%"></span><span class="dm"></span><div class="pal box"><span class="in"><span class="ty">면접 </span><i class="ca"></i></span><span class="op k">새 모의면접 시작<em>⌘N</em></span><span class="op">면접 기록 보기<em>⌘R</em></span><span class="op x">설정 열기<em>⌘,</em></span></div><div class="key"><span>⌘</span><span>K</span></div></div>`
  },
  {
    id: 'u-help', k: '상황별 도움말', e: 'Contextual help',
    d: '설명이 필요한 바로 그 자리에 작은 도움말을 둬요. 따로 도움말 페이지를 찾아가게 하지 않아요.',
    u: '닐슨 휴리스틱 10번(도움말과 문서)이에요. 낯선 용어, 입력 형식, 왜 이 정보가 필요한지를 ? 아이콘이나 입력란 아래 짧은 문장으로 알려주세요. 도움말이 너무 많이 필요하다면 화면 설계를 먼저 다시 보세요.',
    html: `<div class="pan box"><span class="lb">사업자 등록번호<span class="q">?</span></span><span class="in"></span><span class="ln" style="width:60%"></span><span class="ln" style="width:45%"></span><div class="po box"><b>왜 필요한가요?</b>세금계산서를 발행하려면 필요해요. 사업자등록증 오른쪽 위 10자리 숫자예요.</div><span class="tap"></span></div>`
  },
  {
    id: 'u-postel', k: '포스텔의 법칙', e: "Postel's law",
    d: '받아들일 때는 너그럽게, 내보낼 때는 엄격하게. 사용자가 어떤 형식으로 입력하든 받아들이고, 저장할 때 한 가지 형식으로 정리해요.',
    u: '전화번호에 띄어쓰기·하이픈·국가번호가 섞여도 받아들이세요. 앞뒤 공백은 조용히 지우고, 전각 숫자도 변환하세요. "형식이 올바르지 않습니다"로 돌려보내는 건 시스템이 해야 할 일을 사람에게 떠넘기는 거예요.',
    html: `<div class="wr"><div class="ins"><span>010 1234 5678</span><span>010-1234-5678</span><span>+82 10 1234 5678</span><span>01012345678 </span></div><span class="ar">→</span><span class="out">010-1234-5678</span></div>`
  },
  {
    id: 'u-cons', k: '일관성', e: 'Consistency & standards',
    d: '같은 동작은 어느 화면에서든 같은 모양, 같은 위치, 같은 이름이어야 해요. 한 번 배운 것을 다음 화면에서 다시 배우지 않게요.',
    u: '닐슨 휴리스틱 4번이에요. 다음 버튼이 어떤 화면에서는 위, 어떤 화면에서는 아래에 있으면 사람들은 매번 찾아야 해요. 디자인 시스템과 컴포넌트를 쓰는 가장 큰 이유가 이 일관성이에요.',
    html: `<div class="stk"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:85%"></span><span class="bt">다음</span></div></div><div class="ph"><div class="scr"><span class="ln h" style="width:60%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:70%"></span><span class="im" style="height:3em;background:var(--warn-soft)"></span><span class="bt">다음</span></div></div><div class="ph"><div class="scr"><span class="ln h" style="width:40%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="bt">완료</span></div></div></div>`
  },
  {
    id: 'u-aff', k: '어포던스와 기표', e: 'Affordance & signifiers',
    d: '버튼은 버튼처럼, 링크는 링크처럼 보여야 해요. 모양·색·화살표 같은 단서(기표)가 있어야 무엇을 누를 수 있는지 알아요.',
    u: '플랫 디자인 이후 버튼이 그냥 글자처럼 보이는 경우가 많아졌어요. 누를 수 있는 것에는 배경, 테두리, 링크 색, 화살표 중 하나 이상을 붙이세요. 반대로 누를 수 없는 것을 버튼처럼 꾸미면 헛되이 눌러 봐요.',
    html: `<div class="wr"><div class="col bad"><div class="pan box" style="position:relative"><span class="ln h" style="width:70%"></span><span class="flat">더보기</span><span class="flat">신청하기</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div><span class="cap">단서 없음</span></div><div class="col good"><div class="pan box" style="position:relative"><span class="ln h" style="width:70%"></span><span class="lk">더보기</span><span class="bt">신청하기</span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div><span class="cap">단서 있음</span></div></div>`
  }
);
})();
