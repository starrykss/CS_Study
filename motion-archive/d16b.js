(() => {
const s = window.UX.find(x => x.id === 's-form');
s.css += `
@property --mkn{syntax:'<integer>';inherits:true;initial-value:0}
.fm-mask .wr{display:flex;flex-direction:column;align-items:center;gap:1.2em}
.fm-mask .in2{display:flex;align-items:center;height:3.4em;min-width:17em;padding:0 1em;border:.16em solid var(--accent);border-radius:.7em;background:var(--ui);font-family:var(--f-mono);font-size:1.3em;animation:msk-n 4.5s linear infinite}
.fm-mask .in2 span{display:inline-block;overflow:hidden;white-space:nowrap;max-width:clamp(0em,(var(--mkn) - var(--i)) * 2em,1em)}
.fm-mask .in2 .h{color:var(--accent);font-weight:500}
.fm-mask .raw{font-family:var(--f-mono);font-size:.85em;color:var(--ink-3)}
@keyframes msk-n{0%,6%{--mkn:0}64%,90%{--mkn:13}100%{--mkn:0}}

.fm-otp .wr{display:flex;flex-direction:column;align-items:center;gap:1.1em}
.fm-otp .bx{display:flex;gap:.5em}
.fm-otp .bx span{position:relative;width:2.8em;height:3.4em;border-radius:.6em;border:.15em solid var(--frame);background:var(--ui);display:grid;place-items:center;font-family:var(--f-mono);font-size:1.4em;font-weight:500;font-size:1em}
.fm-otp .bx b{font-size:1.5em;opacity:0;animation:otp-d 4s infinite backwards;animation-delay:calc(var(--i) * .12s)}
.fm-otp .bx span{animation:otp-b 4s infinite backwards;animation-delay:calc(var(--i) * .12s)}
.fm-otp .sg{display:flex;align-items:center;gap:.5em;padding:.5em 1em;border-radius:2em;background:var(--stage);font-size:.85em;animation:otp-s 4s infinite}
.fm-otp .sg b{font-family:var(--f-mono)}
.fm-otp .ok{display:flex;align-items:center;gap:.4em;font-size:.95em;font-weight:600;color:var(--accent);opacity:0;animation:otp-o 4s infinite}
.fm-otp .tap{left:50%;top:56%;animation-delay:-1.24s}
@keyframes otp-d{0%,19.9%{opacity:0}20%,89.9%{opacity:1}90%,100%{opacity:0}}
@keyframes otp-b{0%,19.9%{border-color:var(--frame)}20%,89.9%{border-color:var(--accent)}90%,100%{border-color:var(--frame)}}
@keyframes otp-s{0%,22%{opacity:1}26%,100%{opacity:0}}
@keyframes otp-o{0%,46%{opacity:0;transform:translateY(.3em)}52%,92%{opacity:1;transform:none}100%{opacity:0}}

.fm-terms .pan{width:19em;padding:1.2em;display:flex;flex-direction:column;gap:.55em}
.fm-terms .all{display:flex;align-items:center;gap:.6em;padding:.6em;border-radius:.6em;background:var(--stage);font-weight:700;font-size:.95em}
.fm-terms .op{display:flex;align-items:center;gap:.6em;font-size:.8em;padding-left:.6em}
.fm-terms .op em{font-style:normal;color:var(--ink-3)}
.fm-terms .op u{margin-left:auto;color:var(--ink-3);text-decoration:none;font-size:1.1em}
.fm-terms .x{width:1.5em;height:1.5em;animation:xOn 4s infinite}
.fm-terms .x::after{left:.36em;top:.06em;width:.36em;height:.75em}
.fm-terms .op .x{width:1.3em;height:1.3em}
.fm-terms .op .x::after{left:.3em;top:.04em;width:.3em;height:.65em}
.fm-terms .bt{margin-top:.4em;font-size:.9em;animation:trm-b 4s infinite}
.fm-terms .tap{left:13%;top:18%;animation-delay:-.96s}
@keyframes trm-b{0%,20%{background:var(--line);color:var(--ink-3)}26%,84%{background:var(--accent);color:var(--accent-ink)}90%,100%{background:var(--line);color:var(--ink-3)}}

.fm-cta .ph .scr{gap:.8em}
.fm-cta .fd2 .in{height:2em;font-size:.8em}
.fm-cta .ft{position:absolute;left:0;right:0;bottom:0;animation:cta-m 4s cubic-bezier(.2,.8,.2,1) infinite}
.fm-cta .ft .bt{display:block;margin:0 .8em .9em;font-size:.9em}
.fm-cta .kb{height:7.6em;margin-bottom:-7.6em;padding:.5em .3em;display:grid;grid-template-columns:repeat(10,1fr);gap:.2em;align-content:start;background:var(--stage)}
.fm-cta .kb span{height:1.6em;border-radius:.25em;background:var(--ui)}
.fm-cta .kb .w{grid-column:span 6}
.fm-cta .ft .bt{animation:cta-b 4s cubic-bezier(.2,.8,.2,1) infinite}
@keyframes cta-m{0%,22%{transform:none}32%,84%{transform:translateY(-7.6em)}94%,100%{transform:none}}
@keyframes cta-b{0%,22%{margin:0 .8em .9em;border-radius:.7em}32%,84%{margin:0 0 0;border-radius:0}94%,100%{margin:0 .8em .9em;border-radius:.7em}}

.fm-auto .ph .scr{gap:.7em}
.fm-auto .fd2 .in{height:2em;font-size:.8em}
.fm-auto .fd2 .in span{opacity:0;animation:aut-f 4s infinite}
.fm-auto .f1 .in{border-color:var(--accent)}
.fm-auto .bar{position:absolute;left:0;right:0;bottom:0;padding:.6em .6em 1.2em;background:var(--stage);display:flex;flex-direction:column;gap:.45em;animation:aut-k 4s cubic-bezier(.2,.8,.2,1) infinite}
.fm-auto .sg{display:flex;align-items:center;gap:.5em;padding:.5em .7em;border-radius:.6em;background:var(--ui);font-size:.75em}
.fm-auto .sg i{width:1.6em;height:1.6em;border-radius:50%;background:var(--accent-soft);flex:none}
.fm-auto .sg span{color:var(--ink-3)}
.fm-auto .kk{height:4.2em;border-radius:.4em;background:repeating-linear-gradient(90deg,var(--ui) 0 1.6em,transparent 1.6em 1.8em)}
.fm-auto .tap{left:50%;top:67%;animation-delay:-.4s}
@keyframes aut-f{0%,40%{opacity:0;background:transparent}46%,88%{opacity:1}96%,100%{opacity:0}}
@keyframes aut-k{0%,42%{transform:none}52%,88%{transform:translateY(102%)}96%,100%{transform:none}}

.fm-label .wr{display:flex;gap:1.1em}
.fm-label .pan{width:9em;height:10.5em;padding:.9em;display:flex;flex-direction:column;justify-content:center;gap:.6em}
.fm-label .pan .in{height:2.1em;font-size:.8em;color:var(--ink-3)}
.fm-label .lf{display:grid;grid-template-columns:2.6em 1fr;align-items:center;gap:.4em}
.fm-label .lf .lb{text-align:right}
.fm-label .ph2 .in span{animation:lbl-p 4s infinite}
.fm-label .ph2 .in{animation:lbl-b 4s infinite}
.fm-label .top{outline:.18em solid var(--accent);outline-offset:.3em;border-radius:.6em;animation:lbl-g 4s infinite}
@keyframes lbl-p{0%,30%{opacity:1}36%,86%{opacity:0}92%,100%{opacity:1}}
@keyframes lbl-b{0%,30%{border-color:var(--frame)}36%,86%{border-color:var(--accent)}92%,100%{border-color:var(--frame)}}
@keyframes lbl-g{0%,40%{outline-color:transparent}50%,90%{outline-color:var(--accent)}100%{outline-color:transparent}}
`;
s.items.push(
  {
    id: 'fm-mask', k: '입력 마스크', e: 'Input mask · Auto format',
    d: '사용자는 숫자만 입력하고, 하이픈이나 쉼표 같은 형식은 화면이 알아서 끼워 넣어요.',
    u: '전화번호, 카드 번호, 사업자 번호, 금액(1,000 단위 쉼표)에 쓰세요. 사용자가 하이픈을 직접 넣어도 받아들이고, 붙여넣기도 지원해야 해요. 칸을 여러 개로 쪼개면 붙여넣기와 수정이 불편해져요.',
    html: `<div class="wr"><div class="in2"><span style="--i:0">0</span><span style="--i:1">1</span><span style="--i:2">0</span><span class="h" style="--i:3">-</span><span style="--i:3">1</span><span style="--i:4">2</span><span style="--i:5">3</span><span style="--i:6">4</span><span class="h" style="--i:7">-</span><span style="--i:7">5</span><span style="--i:8">6</span><span style="--i:9">7</span><span style="--i:10">8</span><i class="ca"></i></div><span class="raw">입력한 것: 01012345678</span></div>`
  },
  {
    id: 'fm-otp', k: '인증번호 입력', e: 'One-time code',
    d: '문자로 받은 인증번호를 칸에 넣는 화면이에요. 키보드 위 추천으로 한 번에 채우고, 다 채우면 자동으로 확인해요.',
    u: '웹은 autocomplete="one-time-code", 안드로이드는 SMS Retriever로 문자 속 번호를 자동으로 가져올 수 있어요. 칸이 나뉘어 있어도 붙여넣기는 한 번에 되게 하고, 남은 시간과 재전송 버튼을 함께 보여주세요.',
    html: `<div class="wr"><span class="ln h" style="width:9em"></span><div class="bx"><span style="--i:0"><b>4</b></span><span style="--i:1"><b>8</b></span><span style="--i:2"><b>2</b></span><span style="--i:3"><b>0</b></span><span style="--i:4"><b>1</b></span><span style="--i:5"><b>7</b></span></div><span class="sg">메시지에서 <b>482017</b></span><span class="ok">✓ 인증됐어요</span><span class="tap"></span></div>`
  },
  {
    id: 'fm-terms', k: '약관 전체 동의', e: 'Terms · Select all',
    d: '여러 약관을 "전체 동의" 하나로 한 번에 체크하고, 필수와 선택을 구분해서 보여줘요. 한국 서비스 가입 화면의 기본 구성이에요.',
    u: '필수와 선택 항목을 글자로 분명히 나누고, 선택 항목(마케팅 수신 등)은 동의하지 않아도 가입할 수 있어야 해요. 각 약관은 ›를 눌러 내용을 볼 수 있게 하세요. 필수 항목을 모두 체크해야 버튼이 활성화되는 게 보통이에요.',
    html: `<div class="pan box"><span class="all"><span class="x"></span>전체 동의</span><span class="op"><span class="x"></span><em>[필수]</em> 서비스 이용약관<u>›</u></span><span class="op"><span class="x"></span><em>[필수]</em> 개인정보 수집·이용<u>›</u></span><span class="op"><span class="x"></span><em>[선택]</em> 마케팅 정보 수신<u>›</u></span><span class="bt">동의하고 가입하기</span><span class="tap"></span></div>`
  },
  {
    id: 'fm-cta', k: '하단 고정 버튼', e: 'Sticky CTA above keyboard',
    d: '다음·확인 버튼을 화면 아래에 고정하고, 키보드가 올라오면 버튼도 키보드 바로 위로 따라 올라와요.',
    u: '키보드에 가려 버튼을 찾으려고 키보드를 내리는 일이 없어져요. 키보드 위에서는 양옆 여백 없이 꽉 차게 바꾸는 경우가 많아요. iOS의 안전 영역, 안드로이드의 키보드 높이 변화를 모두 처리해야 해요.',
    html: `<div class="ph"><div class="scr"><span class="ln h" style="width:60%"></span><span class="ln" style="width:80%"></span><div class="fd2"><span class="lb">이메일</span><span class="in" style="border-color:var(--accent)"></span></div></div><div class="ft"><span class="bt">다음</span><div class="kb"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class="w"></span><span></span><span></span></div></div></div>`
  },
  {
    id: 'fm-auto', k: '자동 채우기', e: 'Autofill',
    d: '기기에 저장된 이름, 전화번호, 주소, 카드 정보를 키보드 위 추천을 눌러 한 번에 채워요.',
    u: '입력란에 autocomplete 속성(name, tel, email, street-address 등)을 정확히 붙이면 브라우저와 OS가 알아서 채워 줘요. 라벨을 엉뚱하게 붙이거나 입력란을 쪼개면 자동 채우기가 작동하지 않아요.',
    html: `<div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><div class="fd2 f1"><span class="lb">이름</span><span class="in"><span>김지원</span></span></div><div class="fd2"><span class="lb">휴대폰</span><span class="in"><span>010-1234-5678</span></span></div><div class="fd2"><span class="lb">이메일</span><span class="in"><span>jiwon@mail.com</span></span></div></div><div class="bar"><span class="sg"><i></i>김지원 <span>· 010-1234-…</span></span><span class="kk"></span></div><span class="tap"></span></div>`
  },
  {
    id: 'fm-label', k: '라벨 위치', e: 'Label placement',
    d: '라벨은 입력란 위에 두는 게 가장 빨리 읽혀요. 왼쪽 라벨은 넓은 화면에서만, 안내 문구만 있는 칸은 입력하는 순간 무엇을 적던 칸인지 사라져요.',
    u: '모바일은 위 라벨이 기본이에요. 왼쪽 라벨은 글자 길이가 들쭉날쭉해 정렬이 어렵고, 번역하면 더 길어져요. 안내 문구(플레이스홀더)는 예시용으로만 쓰고 라벨을 대신하지 마세요.',
    html: `<div class="wr"><div class="col"><div class="pan box top"><div class="fd2"><span class="lb">이름</span><span class="in"></span></div><div class="fd2"><span class="lb">이메일</span><span class="in"></span></div></div><span class="cap">위 라벨</span></div><div class="col"><div class="pan box"><div class="fd2 lf"><span class="lb">이름</span><span class="in"></span></div><div class="fd2 lf"><span class="lb">이메일</span><span class="in"></span></div></div><span class="cap">왼쪽 라벨</span></div><div class="col"><div class="pan box ph2"><div class="fd2"><span class="in"><span>이름</span></span></div><div class="fd2"><span class="in"><span>이메일</span></span></div></div><span class="cap">안내 문구만</span></div></div>`
  }
);
})();
