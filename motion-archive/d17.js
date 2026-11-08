(window.UX = window.UX || []).push({
  id: 's-device', short: '기기별 화면', en: 'Beyond the phone',
  title: '휴대폰 밖의 화면들',
  sub: '태블릿, 폴더블, 워치, 위젯처럼 화면 크기와 쓰는 상황이 달라지면 같은 서비스도 다르게 보여줘야 해요.',
  css: `
.dv-ld .tb{position:relative;width:26em;height:16em;border-radius:1.2em;border:.3em solid var(--frame);background:var(--ui);display:grid;grid-template-columns:9em 1fr;overflow:hidden}
.dv-ld .ls{display:flex;flex-direction:column;gap:.3em;padding:.8em .6em;border-right:.1em solid var(--rule);position:relative}
.dv-ld .ls .rw{position:relative;padding:.4em;border-radius:.5em}
.dv-ld .ls .av{width:1.6em;height:1.6em}
.dv-ld .sel{position:absolute;left:.6em;right:.6em;top:.8em;height:2.4em;border-radius:.5em;background:var(--accent-soft);animation:ld-sel 6s cubic-bezier(.4,0,.2,1) infinite}
.dv-ld .dt{position:relative}
.dv-ld .dt>div{position:absolute;inset:0;padding:1em;display:flex;flex-direction:column;gap:.6em;opacity:0;animation:cyc3 6s steps(1) infinite}
.dv-ld .dt .im{height:5em}
@keyframes ld-sel{0%,30%{transform:none}33.3%,63%{transform:translateY(2.7em)}66.6%,96%{transform:translateY(5.4em)}100%{transform:none}}

.dv-fold .dv{position:relative;height:17em;width:9.4em;border-radius:1.2em;border:.3em solid var(--frame);background:var(--ui);overflow:hidden;animation:fld-w 5s cubic-bezier(.4,0,.2,1) infinite}
.dv-fold .hg{position:absolute;left:50%;top:0;bottom:0;width:.12em;background:var(--rule);opacity:0;animation:fld-h 5s infinite}
.dv-fold .gr{padding:.8em;display:grid;grid-template-columns:repeat(auto-fill,minmax(7.4em,1fr));gap:.6em}
.dv-fold .cd{display:flex;flex-direction:column;gap:.4em}
.dv-fold .cd .im{height:3.6em}
@keyframes fld-w{0%,20%{width:9.4em}40%,80%{width:18.4em}96%,100%{width:9.4em}}
@keyframes fld-h{0%,24%{opacity:0}40%,80%{opacity:1}92%,100%{opacity:0}}

.dv-watch .wt{position:relative;width:12em;height:14em;border-radius:3.2em;background:#0b0b0d;border:.5em solid #2a2d33;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:.4em;color:#fff;overflow:hidden}
.dv-watch .wt::after{content:"";position:absolute;right:-1.2em;top:4em;width:.8em;height:2.4em;border-radius:.3em;background:#2a2d33}
.dv-watch .tm{font-family:var(--f-mono);font-size:2.2em;font-weight:500;letter-spacing:-.02em}
.dv-watch .rg{width:5em;height:5em;border-radius:50%;background:conic-gradient(#2BC995 calc(var(--p) * 1%),#2a2d33 0);display:grid;place-items:center;animation:wt-r 4s cubic-bezier(.3,.7,.2,1) infinite}
.dv-watch .rg::after{content:"";width:3.8em;height:3.8em;border-radius:50%;background:#0b0b0d}
.dv-watch .nt{position:absolute;left:.6em;right:.6em;bottom:.6em;padding:.7em;border-radius:1.6em 1.6em 2.4em 2.4em;background:#1f2228;font-size:.8em;display:flex;flex-direction:column;gap:.2em;animation:wt-n 4s cubic-bezier(.2,.8,.2,1) infinite}
.dv-watch .nt b{color:#2BC995}
@property --p{syntax:'<number>';inherits:false;initial-value:0}
@keyframes wt-r{0%,6%{--p:0}50%,92%{--p:72}100%{--p:0}}
@keyframes wt-n{0%,50%{transform:translateY(120%)}58%,90%{transform:none}98%,100%{transform:translateY(120%)}}

.dv-widget .hs{position:relative;width:13em;height:20em;border-radius:1.8em;border:.14em solid var(--frame);overflow:hidden;padding:2em 1em;display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:2.4em;gap:.7em .5em;background:linear-gradient(160deg,#c9d8ff,#f6d1e3)}
.dv-widget .hs i{border-radius:.6em;background:rgba(255,255,255,.75)}
.dv-widget .wg{grid-column:span 4;grid-row:span 2;border-radius:1.1em;background:#fff;padding:.7em .9em;display:flex;flex-direction:column;justify-content:space-between;color:#15181c;box-shadow:0 .3em .8em -.4em rgba(0,0,0,.3)}
.dv-widget .wg span{font-size:.65em;color:#666}
.dv-widget .wg b{font-size:1.6em;font-weight:800;line-height:1;display:grid}
.dv-widget .wg b em{grid-area:1/1;font-style:normal}
.dv-widget .v1{animation:btln-1 4s steps(1) infinite}.dv-widget .v2{opacity:0;color:#0C9B72;animation:btln-2 4s steps(1) infinite}
.dv-widget .dots{display:flex;gap:.25em}
.dv-widget .dots i{width:.9em;height:.9em;border-radius:.25em;background:#0C9B72}
.dv-widget .dots .n{background:#ddd;animation:wg-d 4s steps(1) infinite}
@keyframes wg-d{0%{background:#ddd}44%{background:#0C9B72}92%{background:#ddd}}

.dv-land .dv{position:relative;width:10em;height:18em;border-radius:1.5em;border:.3em solid var(--frame);background:var(--ui);overflow:hidden;animation:lnd-r 5s cubic-bezier(.4,0,.2,1) infinite}
.dv-land .vd{position:absolute;left:.6em;right:.6em;top:2em;height:5.4em;border-radius:.6em;background:linear-gradient(135deg,#1c2b4a,#3b5b9a);display:grid;place-items:center;animation:lnd-v 5s cubic-bezier(.4,0,.2,1) infinite}
.dv-land .vd::after{content:"";border:solid transparent;border-width:.8em 0 .8em 1.3em;border-left-color:#fff;margin-left:.3em}
.dv-land .ls{position:absolute;left:.6em;right:.6em;top:8.2em;display:flex;flex-direction:column;gap:.6em;animation:lnd-l 5s infinite}
@keyframes lnd-r{0%,20%{transform:none}36%,80%{transform:rotate(-90deg)}96%,100%{transform:none}}
@keyframes lnd-v{0%,24%{left:.6em;right:.6em;top:2em;height:5.4em;border-radius:.6em}38%,80%{left:0;right:0;top:0;height:100%;border-radius:0}94%,100%{left:.6em;right:.6em;top:2em;height:5.4em;border-radius:.6em}}
@keyframes lnd-l{0%,24%{opacity:1}30%,86%{opacity:0}94%,100%{opacity:1}}

.dv-pip .ph{background:var(--ui)}
.dv-pip .vd{position:absolute;z-index:3;background:linear-gradient(135deg,#1c2b4a,#3b5b9a);box-shadow:0 .5em 1em -.4em rgba(0,0,0,.5);animation:pip-k 6s cubic-bezier(.4,0,.2,1) infinite}
.dv-pip .vd::after{content:"";position:absolute;left:50%;top:50%;margin:-.6em 0 0 -.4em;border:solid transparent;border-width:.6em 0 .6em 1em;border-left-color:#fff}
.dv-pip .scr{opacity:0;animation:pip-a 6s infinite}
.dv-pip .scr .bb{align-self:flex-start;padding:.5em .8em;border-radius:1em;background:var(--stage);font-size:.8em}
.dv-pip .scr .bb.me{align-self:flex-end;background:var(--accent);color:var(--accent-ink)}
@keyframes pip-k{0%,15%{left:0;top:0;width:100%;height:100%;border-radius:0}30%,55%{left:4.6em;top:12.4em;width:6.2em;height:3.6em;border-radius:.6em}65%,85%{left:.6em;top:2.2em;width:6.2em;height:3.6em;border-radius:.6em}100%{left:0;top:0;width:100%;height:100%;border-radius:0}}
@keyframes pip-a{0%,18%{opacity:0}28%,88%{opacity:1}96%,100%{opacity:0}}
`,
  items: [
    {
      id: 'dv-ld', k: '목록-상세 레이아웃', e: 'List-detail layout',
      d: '넓은 화면에서는 왼쪽에 목록, 오른쪽에 선택한 항목의 상세를 함께 보여줘요. 휴대폰에서는 두 화면이던 것이 한 화면이 돼요.',
      u: '메일, 메신저, 설정, 파일 앱의 기본 구조예요. 휴대폰 화면을 그냥 크게 늘리면 태블릿에서 텅 비어 보여요. 화면 너비가 바뀔 때 선택한 항목이 유지되도록 상태를 함께 설계하세요.',
      html: `<div class="tb"><div class="ls"><i class="sel"></i><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:45%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:55%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:40%"></span></span></div><div class="dt"><div style="animation-delay:0s"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span></div><div style="animation-delay:-4s"><span class="ln h" style="width:40%"></span><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:80%"></span></div><div style="animation-delay:-2s"><span class="ln h" style="width:60%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:70%"></span><span class="ln" style="width:75%"></span></div></div></div>`
    },
    {
      id: 'dv-fold', k: '폴더블', e: 'Foldables',
      d: '접으면 휴대폰, 펼치면 작은 태블릿이 되는 기기예요. 펼치는 순간 화면이 끊기지 않고 넓은 레이아웃으로 이어져야 해요.',
      u: '갤럭시 Z 폴드처럼 펼친 화면은 거의 정사각형이에요. 펼칠 때 보던 위치와 입력 중인 내용이 그대로 유지돼야 하고, 접히는 선 위에 중요한 버튼이나 글자를 두지 마세요.',
      html: `<div class="dv"><span class="hg"></span><div class="gr"><span class="cd"><span class="im"></span><span class="ln" style="width:80%"></span></span><span class="cd"><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:60%"></span></span><span class="cd"><span class="im" style="background:var(--warn-soft)"></span><span class="ln" style="width:70%"></span></span><span class="cd"><span class="im"></span><span class="ln" style="width:55%"></span></span></div></div>`
    },
    {
      id: 'dv-watch', k: '스마트워치', e: 'Smartwatch · Glanceable',
      d: '손목을 들어 2~3초 안에 확인하고 끝나는 화면이에요. 한 번에 정보 하나, 큰 글자, 최소한의 조작만 담아요.',
      u: '휴대폰 앱을 그대로 줄이면 안 돼요. 다음 일정, 진행률, 알림에 대한 짧은 응답처럼 손목에서 끝낼 수 있는 일만 고르세요. 어두운 배경이 배터리와 눈에 모두 좋아요.',
      html: `<div class="wt"><span class="rg" style="--p:0"></span><span class="tm">10:00</span><div class="nt"><b>모의면접 알림</b><span>10분 뒤 시작해요</span></div></div>`
    },
    {
      id: 'dv-widget', k: '홈 화면 위젯', e: 'Home screen widget',
      d: '앱을 열지 않아도 홈 화면에서 핵심 정보를 바로 보여주는 작은 창이에요. 누르면 해당 화면으로 바로 들어가요.',
      u: '연속 기록, 다음 일정, 오늘의 할 일처럼 자주 확인하는 정보 하나만 담으세요. 위젯은 실시간으로 갱신되지 않을 수 있으니 마지막 업데이트 시간을 고려하고, 크기별로 보여줄 정보를 다르게 설계하세요.',
      html: `<div class="hs"><div class="wg"><span>연속 연습</span><b><em class="v1">6일째</em><em class="v2">7일째</em></b><span class="dots"><i></i><i></i><i></i><i></i><i></i><i></i><i class="n"></i></span></div><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`
    },
    {
      id: 'dv-land', k: '가로 모드', e: 'Landscape orientation',
      d: '폰을 가로로 돌리면 영상은 전체 화면으로 커지고, 나머지 요소는 잠시 숨어요. 화면 방향에 따라 보여줄 것이 달라져요.',
      u: '영상, 사진, 게임, 차트는 가로 모드를 지원하세요. 폼이나 채팅에서 가로로 돌리면 키보드가 화면 대부분을 가리니 레이아웃을 꼭 확인하세요. 방향을 바꿔도 재생 위치와 입력 내용은 그대로여야 해요.',
      html: `<div class="dv"><span class="vd"></span><div class="ls"><span class="ln h" style="width:70%"></span><span class="ln" style="width:90%"></span><span class="rw"><span class="av"></span><span class="ln" style="width:50%"></span></span><span class="rw"><span class="av"></span><span class="ln" style="width:60%"></span></span></div></div>`
    },
    {
      id: 'dv-pip', k: '화면 속 화면', e: 'Picture-in-picture',
      d: '영상을 보다가 다른 앱으로 가면 영상이 작은 창으로 줄어 화면 구석에 떠 있어요. 끌어서 다른 구석으로 옮길 수도 있어요.',
      u: '영상 통화, 강의, 스트리밍처럼 보면서 다른 일을 하는 경우에 지원하세요. 작은 창은 화면 모서리에 붙고, 중요한 버튼을 가리면 쉽게 옮길 수 있어야 해요. 다시 누르면 원래 화면으로 돌아가요.',
      html: `<div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="bb">내일 면접 몇 시야?</span><span class="bb me">오전 10시!</span><span class="bb">화이팅!</span></div><span class="vd"></span></div>`
    }
  ]
});
