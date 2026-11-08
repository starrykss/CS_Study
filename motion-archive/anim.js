(() => {
/* Motion page: timing functions drawn as graphs + moving balls.
   Graph: viewBox -0.1 -0.25 1.2 1.5 on a 10em x 12.5em box, so 1 unit = 8.333em. */
const f3 = n => +n.toFixed(3);
const bez = (x1, y1, x2, y2) => ({
  tf: `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
  code: `cubic-bezier(${[x1, y1, x2, y2].map(v => String(v).replace(/^0\./, '.').replace(/^-0\./, '-.')).join(',')})`,
  d: `M0 1C${x1} ${f3(1 - y1)} ${x2} ${f3(1 - y2)} 1 0`,
  h: `M0 1L${x1} ${f3(1 - y1)}M1 0L${x2} ${f3(1 - y2)}`,
  cp: [[x1, f3(1 - y1)], [x2, f3(1 - y2)]]
});
const pathOf = pts => 'M' + pts.map(([x, y]) => `${f3(x)} ${f3(1 - y)}`).join('L');
const stepsPts = (n, pos) => {
  const lv = k => pos === 'end' ? k / n : pos === 'start' ? (k + 1) / n : pos === 'none' ? k / (n - 1) : (k + 1) / (n + 1);
  const p = [];
  for (let k = 0; k < n; k++) { p.push([k / n, lv(k)], [(k + 1) / n, lv(k)]); }
  p.push([1, 1]);
  return p;
};
const sample = (fn, n = 48) => Array.from({ length: n + 1 }, (_, i) => [i / n, fn(i / n)]);
const linStr = pts => `linear(${pts.map(([x, y], i) => i === 0 || i === pts.length - 1 ? f3(y) : `${f3(y)} ${f3(x * 100)}%`).join(', ')})`;
const bounce = t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375; return n * (t -= 2.625 / d) * t + .984375; };
const spring = (z, w) => t => { const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t)); };

function tfDemo({ tf, code, d, h, cp, note }) {
  const hd = h ? `<path class="hd" d="${h}"/>` + cp.map(([x, y]) => `<circle class="cpt" cx="${x}" cy="${y}" r=".028"/>`).join('') : '';
  return `<div class="tf" style="--tf:${tf}"><div class="gw"><svg viewBox="-0.1 -0.25 1.2 1.5"><rect class="sq" x="0" y="0" width="1" height="1"/><path class="rf" d="M0 1L1 0"/>${hd}<path class="cv" d="${d}"/></svg><span class="dx"><span class="dy"><i></i></span></span><span class="ax1">시간 →</span><span class="ax2">진행 →</span></div><div class="rt"><div class="tk"><i class="bl gh"></i><i class="bl"></i></div><div class="br"><i></i></div><span class="lgd"><i></i>이 곡선<i class="g"></i>linear</span><code>${code}</code>${note ? `<span class="nt">${note}</span>` : ''}</div></div>`;
}
const K = (name, b) => Object.assign(b, { code: name === b.code ? name : name });

const CSS = `
.tf{display:flex;align-items:center;gap:1.6em}
.tf .gw{position:relative;flex:none;width:10em;height:12.5em}
.tf svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.tf .sq{fill:var(--ui);stroke:var(--rule);stroke-width:.012}
.tf .rf{fill:none;stroke:var(--ink-3);opacity:.45;stroke-width:.012;stroke-dasharray:.03 .03}
.tf .hd{fill:none;stroke:var(--ink-3);stroke-width:.01}
.tf .cpt{fill:var(--ui);stroke:var(--ink-3);stroke-width:.012}
.tf .cv{fill:none;stroke:var(--accent);stroke-width:.032;stroke-linecap:round;stroke-linejoin:round}
.tf .dx{position:absolute;left:.833em;top:10.417em;animation:tf-x 3s linear infinite}
.tf .dy{display:block;animation:tf-y 3s infinite;animation-timing-function:var(--tf)}
.tf .dy i{display:block;width:1em;height:1em;margin:-.5em;border-radius:50%;background:var(--accent);box-shadow:0 0 0 .25em var(--accent-soft)}
.tf .ax1,.tf .ax2{position:absolute;font-size:.6em;color:var(--ink-3);white-space:nowrap}
.tf .ax1{left:1.4em;top:18.2em}
.tf .ax2{left:-.4em;top:16.6em;transform:rotate(-90deg);transform-origin:0 0}
.tf .rt{display:flex;flex-direction:column;gap:.85em;width:15em}
.tf .tk{position:relative;height:2.8em;border-radius:1.4em;background:var(--weak)}
.tf .bl{position:absolute;left:.3em;top:.3em;width:2.2em;height:2.2em;border-radius:50%;background:var(--accent);animation:tf-b 3s infinite;animation-timing-function:var(--tf)}
.tf .bl.gh{background:var(--ink-3);opacity:.28;animation-timing-function:linear}
.tf .br{height:.55em;border-radius:1em;background:var(--weak);overflow:hidden}
.tf .br i{display:block;height:100%;background:var(--accent);transform-origin:left;animation:tf-s 3s infinite;animation-timing-function:var(--tf)}
.tf .lgd{display:flex;align-items:center;gap:.45em;font-size:.68em;color:var(--ink-3)}
.tf .lgd i{width:.8em;height:.8em;border-radius:50%;background:var(--accent)}
.tf .lgd i.g{margin-left:.6em;background:var(--ink-3);opacity:.35}
.tf code{align-self:flex-start;font-family:var(--f-mono);font-size:.72em;color:var(--ink);background:var(--ui);border:.1em solid var(--rule);padding:.35em .6em;border-radius:.5em;white-space:nowrap}
.tf .nt{font-size:.66em;color:var(--ink-3);line-height:1.45}
@keyframes tf-x{0%{transform:none}66%,100%{transform:translateX(8.333em)}}
@keyframes tf-y{0%{transform:none}66%,100%{transform:translateY(-8.333em)}}
@keyframes tf-b{0%{transform:none}66%,100%{transform:translateX(12.2em)}}
@keyframes tf-s{0%{transform:scaleX(0)}66%,100%{transform:scaleX(1)}}

.mp{display:flex;flex-direction:column;gap:.9em;width:26em}
.mp .row{display:grid;grid-template-columns:7.4em 1fr;align-items:center;gap:.8em}
.mp .row>code{font-family:var(--f-mono);font-size:.74em;color:var(--ink-2);white-space:nowrap;text-align:right}
.mp .tk{position:relative;height:2.4em;border-radius:1.2em;background:var(--weak)}
.mp .bl{position:absolute;left:.3em;top:.3em;width:1.8em;height:1.8em;border-radius:50%;background:var(--accent)}
.mp .hint{font-size:.7em;color:var(--ink-3);text-align:center}

.pr-dur .b1{animation:pd-1 2.4s ease-out infinite}.pr-dur .b2{animation:pd-2 2.4s ease-out infinite}.pr-dur .b3{animation:pd-3 2.4s ease-out infinite}
@keyframes pd-1{0%{transform:none}8.3%,100%{transform:translateX(14em)}}
@keyframes pd-2{0%{transform:none}20.8%,100%{transform:translateX(14em)}}
@keyframes pd-3{0%{transform:none}41.7%,100%{transform:translateX(14em)}}

.pr-delay .ls{display:flex;flex-direction:column;gap:.5em;width:15em}
.pr-delay .ls>span{display:flex;align-items:center;gap:.7em;padding:.6em .8em;border-radius:.8em;background:var(--ui);border:.1em solid var(--rule);animation:pdl 3s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .12s)}
.pr-delay .ls .av{width:1.6em;height:1.6em}
.pr-delay .ls .ln{flex:1}
.pr-delay .ls code{font-family:var(--f-mono);font-size:.62em;color:var(--accent);white-space:nowrap}
@keyframes pdl{0%{opacity:0;transform:translateY(1em)}14%,80%{opacity:1;transform:none}92%,100%{opacity:0;transform:none}}

.pr-iter .b1{animation:pi-1 6s infinite}
.pr-iter .b2{animation:pi-3 6s infinite}
.pr-iter .b3{animation:pi-i 1s ease-in-out infinite}
.pr-iter .cn{position:absolute;right:.7em;top:50%;transform:translateY(-50%);font-family:var(--f-mono);font-size:.62em;color:var(--ink-3)}
@keyframes pi-1{0%{transform:none;animation-timing-function:ease-in-out}16.66%,100%{transform:translateX(14em)}}
@keyframes pi-3{0%{transform:none;animation-timing-function:ease-in-out}16.65%{transform:translateX(14em)}16.66%{transform:none;animation-timing-function:ease-in-out}33.32%{transform:translateX(14em)}33.33%{transform:none;animation-timing-function:ease-in-out}49.99%,100%{transform:translateX(14em)}}
@keyframes pi-i{from{transform:none}to{transform:translateX(14em)}}

.pr-dir .bl{animation:pdr 1.6s ease-in-out infinite}
.pr-dir .b2{animation-direction:reverse}.pr-dir .b3{animation-direction:alternate}.pr-dir .b4{animation-direction:alternate-reverse}
@keyframes pdr{from{transform:none}to{transform:translateX(14em)}}

.pr-fill .phs{position:relative;display:grid;grid-template-columns:25fr 35fr 40fr;height:1.6em;border-radius:.5em;overflow:hidden;font-size:.62em;font-weight:600;text-align:center;line-height:1.6em;margin-left:12.3em}
.pr-fill .phs span{background:var(--weak);color:var(--ink-3)}.pr-fill .phs span+span{border-left:.15em solid var(--ui)}
.pr-fill .phs span:nth-child(2){background:var(--accent-soft);color:var(--accent)}
.pr-fill .phs i{position:absolute;top:0;bottom:0;left:0;width:.25em;background:var(--ink);animation:pf-h 5s linear infinite}
.pr-fill .bl{background:var(--line);animation:5s linear infinite}
.pr-fill .f1{animation-name:pf-n}.pr-fill .f2{animation-name:pf-f}.pr-fill .f3{animation-name:pf-b}.pr-fill .f4{animation-name:pf-bo}
@keyframes pf-h{to{left:calc(100% - .25em)}}
@keyframes pf-n{0%,24.9%{transform:none;background:var(--line)}25%{transform:translateX(3em);background:var(--accent);animation-timing-function:ease-in-out}60%{transform:translateX(14em);background:var(--accent)}60.1%,100%{transform:none;background:var(--line)}}
@keyframes pf-f{0%,24.9%{transform:none;background:var(--line)}25%{transform:translateX(3em);background:var(--accent);animation-timing-function:ease-in-out}60%,100%{transform:translateX(14em);background:var(--accent)}}
@keyframes pf-b{0%,25%{transform:translateX(3em);background:var(--accent);animation-timing-function:ease-in-out}60%{transform:translateX(14em);background:var(--accent)}60.1%,100%{transform:none;background:var(--line)}}
@keyframes pf-bo{0%,25%{transform:translateX(3em);background:var(--accent);animation-timing-function:ease-in-out}60%,100%{transform:translateX(14em);background:var(--accent)}}

.pr-play .wr{display:flex;align-items:center;gap:2.4em}
.pr-play .sq2{width:6em;height:6em;border-radius:1.2em;background:var(--accent);animation:pp-r 6s linear infinite}
.pr-play .cl{display:flex;flex-direction:column;gap:1em;align-items:flex-start}
.pr-play .pb{position:relative;display:flex;align-items:center;gap:.5em;padding:.6em 1em;border-radius:.8em;background:var(--weak);font-size:.85em;font-weight:600;color:var(--weak-ink)}
.pr-play .pb svg{width:1.1em;height:1.1em;fill:currentColor}
.pr-play .sw{position:relative;width:1.1em;height:1.1em}
.pr-play .sw svg{position:absolute;inset:0}
.pr-play .sw2{display:inline-grid}.pr-play .sw2 b{grid-area:1/1;font-weight:600}
.pr-play .o1{animation:pp-1 6s infinite}.pr-play .o2{opacity:0;animation:pp-2 6s infinite}
.pr-play code{position:relative;font-family:var(--f-mono);font-size:.72em;color:var(--ink-2);height:1.4em;width:17em}
.pr-play code b{position:absolute;left:0;top:0;font-weight:500;white-space:nowrap}
.pr-play code em{font-style:normal;color:var(--accent)}
.pr-play .tap{left:50%;top:50%;animation-duration:6s}
.pr-play .t1{animation-delay:-.48s}.pr-play .t2{animation-delay:-4.68s}
@keyframes pp-r{0%{transform:none}40%,70%{transform:rotate(205.7deg)}100%{transform:rotate(360deg)}}
@keyframes pp-1{0%,39%{opacity:1}41%,69%{opacity:0}71%,100%{opacity:1}}
@keyframes pp-2{0%,39%{opacity:0}41%,69%{opacity:1}71%,100%{opacity:0}}

.pr-short .wr{display:flex;flex-direction:column;align-items:center;gap:1.3em}
.pr-short pre{margin:0;padding:.9em 1.1em;border-radius:.9em;background:#191F28;color:#E5E8EB;font-family:var(--f-mono);font-size:.6em;white-space:pre}
.pr-short pre span{border-radius:.3em;padding:.05em .1em;animation:ps-h 8s infinite;animation-delay:calc(var(--i) * 1s - 8s)}
.pr-short .ex{position:relative;width:24em;height:3.6em}
.pr-short .ex>div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:.3em;text-align:center;opacity:0;animation:ps-c 8s infinite;animation-delay:calc(var(--i) * 1s - 8s)}
.pr-short .ex b{font-family:var(--f-mono);font-size:.8em;color:var(--accent);font-weight:500}
.pr-short .ex span{font-size:.78em;color:var(--ink-2)}
@keyframes ps-h{0%,11.5%{background:#3182F6;color:#fff}12.5%,100%{background:transparent;color:inherit}}
@keyframes ps-c{0%,11%{opacity:1}12.5%,100%{opacity:0}}

.us{display:flex;gap:1.4em}
.us .cl{display:flex;flex-direction:column;align-items:center;gap:.7em}
.us .ph{width:10em;height:14em}
.us .scr{gap:.6em}
.us .ok{color:var(--ok)}.us .bad{color:var(--danger)}
.us .cap b{font-family:var(--f-mono);font-weight:500;font-size:.85em}
.us-enter .ts{position:absolute;left:.8em;right:.8em;bottom:1em;padding:.6em .7em;border-radius:.8em;background:var(--ink);color:var(--surface);font-size:.7em;font-weight:600;text-align:center;animation:ue 2.6s infinite}
.us-enter .a .ts{animation-timing-function:cubic-bezier(.2,.8,.2,1)}.us-enter .b .ts{animation-timing-function:ease-in}
@keyframes ue{0%{transform:translateY(160%);opacity:0}24%,80%{transform:none;opacity:1}92%,100%{transform:none;opacity:0}}
.us-exit .sh{position:absolute;left:0;right:0;bottom:0;height:7.5em;padding:1em;display:flex;flex-direction:column;gap:.6em;border-radius:1.2em 1.2em 0 0;background:var(--ui);box-shadow:0 -.3em 1.2em rgba(0,0,0,.15);animation:ux 2.6s infinite}
.us-exit .dm{animation:ux-d 2.6s infinite}
.us-exit .a .sh{animation-timing-function:cubic-bezier(.4,0,1,1)}.us-exit .b .sh{animation-timing-function:cubic-bezier(.16,1,.3,1)}
.us-exit .sh .bt{margin-top:auto;font-size:.7em;padding:.5em}
@keyframes ux{0%,30%{transform:none}54%,88%{transform:translateY(105%)}100%{transform:none}}
@keyframes ux-d{0%,30%{opacity:.6}54%,88%{opacity:0}100%{opacity:.6}}
.us-move .pan{position:relative;width:12em;height:12em;padding:.9em}
.us-move .sl{position:absolute;width:4.4em;height:4.4em;border-radius:.9em;border:.14em dashed var(--line)}
.us-move .s1{left:.9em;top:.9em}.us-move .s2{right:.9em;bottom:.9em}
.us-move .cd{position:absolute;left:.9em;top:.9em;width:4.4em;height:4.4em;border-radius:.9em;background:var(--accent);animation:um 3s infinite alternate}
.us-move .a .cd{animation-timing-function:ease-in-out}.us-move .b .cd{animation-timing-function:linear}
@keyframes um{0%,20%{transform:none}80%,100%{transform:translate(7.2em,7.2em)}}
.us-spin .sp{width:5em;height:5em;border-radius:50%;border:.55em solid var(--weak);border-top-color:var(--accent);animation:spin 1s infinite}
.us-spin .a .sp{animation-timing-function:linear}.us-spin .b .sp{animation-timing-function:ease-in-out}
.us-spin .cl{gap:1.2em;width:11em}
.us-size .tg{animation:tgT 2.6s infinite}
.us-size .tg b{animation:tgK 2.6s infinite}
.us-size .a .tg,.us-size .a .tg b{animation-timing-function:cubic-bezier(.2,.8,.2,1)}
.us-size .ph .sh{position:absolute;left:0;right:0;bottom:0;height:9em;padding:1em;display:flex;flex-direction:column;gap:.6em;border-radius:1.2em 1.2em 0 0;background:var(--ui);box-shadow:0 -.3em 1.2em rgba(0,0,0,.15);animation:us-s 2.6s cubic-bezier(.2,.8,.2,1) infinite}
.us-size .bx{display:grid;place-items:center;width:10em;height:14em}
@keyframes us-s{0%,20%{transform:translateY(105%)}36%,84%{transform:none}100%{transform:translateY(105%)}}
.us-trans .bt2{padding:.8em 1.6em;border-radius:.9em;background:var(--weak);color:var(--ink-2);font-weight:600;animation:ut-h 4s infinite}
.us-trans .cur{left:0;top:0;animation:ut-c 4s cubic-bezier(.4,0,.2,1) infinite}
.us-trans .bx{position:relative;display:grid;place-items:center;width:11em;height:8em}
.us-trans .pu{width:3.2em;height:3.2em;border-radius:50%;background:var(--accent);animation:ut-p 1.6s cubic-bezier(.4,0,.2,1) infinite}
.us-trans code{font-family:var(--f-mono);font-size:.68em;color:var(--ink-2);white-space:nowrap}
@keyframes ut-h{0%,24%{background:var(--weak);color:var(--ink-2);transform:none}30%,66%{background:var(--accent);color:var(--accent-ink);transform:translateY(-.2em)}72%,100%{background:var(--weak);color:var(--ink-2);transform:none}}
@keyframes ut-c{0%,10%{transform:translate(9em,7em)}26%,64%{transform:translate(5.6em,4.4em)}80%,100%{transform:translate(9em,7em)}}
@keyframes ut-p{0%{transform:scale(.6);box-shadow:0 0 0 0 var(--accent-soft)}50%{transform:scale(1);box-shadow:0 0 0 1.2em transparent}100%{transform:scale(.6);box-shadow:0 0 0 0 transparent}}
`;

const lin = (fn, n) => { const p = sample(fn, n); return { tf: linStr(p), d: pathOf(p) }; };
const B = {
  linear: { tf: 'linear', code: 'linear', d: 'M0 1L1 0' },
  ease: Object.assign(bez(.25, .1, .25, 1), { code: 'ease' }),
  in: Object.assign(bez(.42, 0, 1, 1), { code: 'ease-in' }),
  out: Object.assign(bez(0, 0, .58, 1), { code: 'ease-out' }),
  inout: Object.assign(bez(.42, 0, .58, 1), { code: 'ease-in-out' })
};
const st = (n, pos, code) => ({ tf: `steps(${n}, jump-${pos})`, code: code || `steps(${n}, jump-${pos})`, d: pathOf(stepsPts(n, pos)) });
const bounceL = lin(bounce, 60), springL = lin(spring(.45, 14), 60), softL = lin(spring(.78, 11), 48);

const CUR = `<span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span>`;
const row = (label, cls, extra = '') => `<div class="row"><code>${label}</code><div class="tk"><i class="bl ${cls}"></i>${extra}</div></div>`;

window.UX = [
  {
    id: 'm-kw', short: '기본 키워드', en: 'Keywords', shortEn: 'Keywords',
    title: '이름으로 부르는 다섯 가지 곡선', titleEn: 'The five named curves',
    sub: 'CSS가 이름으로 제공하는 곡선이에요. 가로축은 시간, 세로축은 진행도예요. 회색 점선과 흐린 공은 일정한 속도(linear)라서 비교 기준이 돼요.',
    subEn: 'The curves CSS gives you by name. The horizontal axis is time and the vertical axis is progress. The dashed line and faint ball move at a constant speed (linear) for comparison.',
    css: CSS,
    items: [
      { id: 'tf-linear', k: 'linear', e: 'Constant speed', d: '처음부터 끝까지 같은 속도로 움직여요. 그래프가 곧은 대각선이에요.', u: '회전하는 로딩, 진행 막대, 끝없이 흐르는 배경처럼 시간과 1:1로 맞아야 하는 움직임에 써요. 화면 요소가 들어오거나 옮겨 갈 때 쓰면 기계처럼 딱딱해 보여요.', de: 'Moves at the same speed from start to finish. The graph is a straight diagonal.', ue: 'Use it where motion must track time one to one: spinners, progress bars and endlessly flowing backgrounds. On elements entering or moving across the screen it looks mechanical.', html: tfDemo(B.linear) },
      { id: 'tf-ease', k: 'ease', e: 'The default', d: '빠르게 출발해 천천히 멈춰요. animation-timing-function을 적지 않으면 이 곡선이 쓰여요.', u: '호버 색 변화처럼 짧은 전환엔 무난해요. 다만 기본값이라 아무 의도가 없는 움직임이 되기 쉬우니, 등장·퇴장에는 ease-out이나 ease-in을 골라 주세요.', de: 'Starts quickly and settles slowly. It is what you get when animation-timing-function is not set.', ue: 'Fine for short changes such as hover colours. Because it is the default it often signals no decision at all, so pick ease-out or ease-in for entrances and exits.', html: tfDemo(B.ease) },
      { id: 'tf-in', k: 'ease-in', e: 'Accelerate', d: '천천히 출발해 점점 빨라지며 끝나요. 물체가 힘을 받아 떠나는 느낌이에요.', u: '화면 밖으로 사라지는 요소에 써요. 등장에 쓰면 처음 몇 프레임이 굼떠서 앱이 느리게 반응하는 것처럼 느껴져요.', de: 'Starts slowly and speeds up until it ends, like something gathering force as it leaves.', ue: 'Use it for elements leaving the screen. On entrances the sluggish first frames make the app feel slow to respond.', html: tfDemo(B.in) },
      { id: 'tf-out', k: 'ease-out', e: 'Decelerate', d: '빠르게 출발해 부드럽게 멈춰요. 누르자마자 반응하고 자연스럽게 자리를 잡아요.', u: '화면에 들어오는 요소, 사용자의 터치에 반응하는 움직임 대부분에 맞아요. 고민될 땐 이걸 먼저 써 보세요.', de: 'Starts fast and eases to a stop. It responds instantly and settles naturally.', ue: 'Right for most entrances and for motion that answers a touch. When in doubt, start here.', html: tfDemo(B.out) },
      { id: 'tf-inout', k: 'ease-in-out', e: 'Accelerate, then decelerate', d: '천천히 출발해 가운데서 가장 빠르고, 다시 천천히 멈춰요.', u: '시작과 끝이 모두 화면 안에 있는 움직임, 예를 들어 카드가 A에서 B로 자리를 옮기거나 슬라이드가 넘어갈 때 써요.', de: 'Starts slowly, is fastest in the middle and slows again at the end.', ue: 'Use it when both the start and end are on screen, such as a card moving from one slot to another or a slide advancing.', html: tfDemo(B.inout) }
    ]
  },
  {
    id: 'm-bez', short: 'cubic-bezier', en: 'Custom curves', shortEn: 'cubic-bezier',
    title: 'cubic-bezier로 직접 만든 곡선', titleEn: 'Curves you build with cubic-bezier',
    sub: '조절점 두 개(P1, P2)로 곡선을 만들어요. cubic-bezier(x1, y1, x2, y2)에서 x는 0~1 사이여야 하지만 y는 범위를 넘을 수 있어서, 목표를 지나쳤다 돌아오는 효과도 만들 수 있어요.',
    subEn: 'Two control points, P1 and P2, shape the curve. In cubic-bezier(x1, y1, x2, y2) the x values must stay between 0 and 1, but y can go beyond, which is how overshoot effects are made.',
    items: [
      { id: 'tf-sine', k: '사인 인아웃', e: 'In-out Sine', d: 'ease-in-out보다 가속과 감속이 더 완만해요. 끝부분까지 느긋하게 이어져요.', u: '숨 쉬듯 반복되는 배경, 은은하게 커졌다 작아지는 맥박 효과처럼 눈에 띄지 않아야 하는 움직임에 좋아요.', de: 'Gentler than ease-in-out at both ends, with an unhurried feel throughout.', ue: 'Good for motion that should stay in the background, such as breathing backgrounds or a soft pulse.', html: tfDemo(bez(.37, 0, .63, 1)) },
      { id: 'tf-quart', k: '쿼트 아웃', e: 'Out Quart', d: 'ease-out보다 출발이 훨씬 빠르고 감속 구간이 길어요. 즉시 반응하면서도 부드럽게 안착해요.', u: '모달, 드롭다운, 카드 등장처럼 "누르면 바로, 하지만 부드럽게"를 원할 때 실무에서 가장 많이 쓰는 곡선 중 하나예요.', de: 'Leaves much faster than ease-out and spends longer slowing down: instant, yet soft on arrival.', ue: 'One of the most used curves in practice for modals, dropdowns and cards that should appear immediately but land gently.', html: tfDemo(bez(.25, 1, .5, 1)) },
      { id: 'tf-expo', k: '엑스포 아웃', e: 'Out Expo', d: '거의 순간이동하듯 출발해서 아주 길게 멈춰요. 가장 극적인 감속 곡선이에요.', u: '큰 화면 전환, 페이지 등장처럼 무게감 있는 움직임에 어울려요. 작은 요소에 쓰면 끝이 질질 끄는 것처럼 보일 수 있어요.', de: 'Shoots off almost instantly and takes a long time to stop. The most dramatic deceleration.', ue: 'Suits weighty moves such as large screen transitions. On small elements the long tail can feel like dragging.', html: tfDemo(bez(.16, 1, .3, 1)) },
      { id: 'tf-backout', k: '백 아웃 (오버슛)', e: 'Out Back · Overshoot', d: '목표 지점을 살짝 지나쳤다가 되돌아와 멈춰요. y2가 1보다 커서 생기는 효과예요.', u: '좋아요 하트, 뱃지, 토글 손잡이처럼 작고 경쾌한 요소에 생기를 줘요. 큰 패널이나 텍스트에 쓰면 출렁여서 어지러워요.', de: 'Passes the target slightly and springs back. It comes from y2 being greater than 1.', ue: 'Adds life to small, playful elements such as a like heart, a badge or a toggle knob. On large panels or text the wobble is dizzying.', html: tfDemo(bez(.34, 1.56, .64, 1)) },
      { id: 'tf-backin', k: '백 인 (예비 동작)', e: 'In Back · Anticipation', d: '출발하기 전에 반대쪽으로 살짝 물러났다가 튀어 나가요. y1이 0보다 작아서 생겨요.', u: '버려지는 카드, 날아가는 알림처럼 "떠나는" 동작에 힘을 실어 줘요. 애니메이션 12원칙의 예비 동작(anticipation)과 같은 원리예요.', de: 'Pulls back slightly before launching forward, because y1 is below 0.', ue: 'Gives leaving motions, such as a discarded card or a dismissed notification, a sense of force. It is the anticipation principle from classic animation.', html: tfDemo(bez(.36, 0, .66, -.56)) },
      { id: 'tf-backio', k: '백 인아웃', e: 'In-out Back', d: '물러났다가 출발하고, 목표를 지나쳤다가 돌아와요. 양쪽 끝이 모두 튀어요.', u: '일러스트, 캐릭터, 온보딩 장식처럼 재미가 목적인 움직임에만 쓰세요. 버튼이나 목록 같은 기능 요소에는 과해요.', de: 'Pulls back before starting and overshoots before stopping, so both ends bounce.', ue: 'Keep it for playful motion such as illustrations, characters and onboarding flourishes. It is too much for functional UI like buttons and lists.', html: tfDemo(bez(.68, -.6, .32, 1.6)) },
      { id: 'tf-m3std', k: 'M3 스탠더드', e: 'Material 3 · Standard', d: '머티리얼 3의 기본 곡선이에요. 출발은 부드럽고 감속은 길게 이어져요.', u: '안드로이드 앱에서 작은 상태 변화나 화면 안에서 머무는 요소의 이동에 써요. 머티리얼 디자인 문서의 기본 추천값이에요.', de: 'Material 3’s standard curve: a soft start followed by a long deceleration.', ue: 'Used in Android apps for small state changes and for elements that stay on screen while moving. It is the default recommendation in Material Design.', html: tfDemo(bez(.2, 0, 0, 1)) },
      { id: 'tf-m3dec', k: 'M3 강조 감속', e: 'Material 3 · Emphasized decelerate', d: '아주 빠르게 들어와서 오래 감속해요. 머티리얼 3에서 화면에 들어오는 요소용 강조 곡선이에요.', u: '시트, 다이얼로그, 새 화면처럼 사용자의 주의를 끌며 등장하는 요소에 써요. 보통 400~500ms 정도로 길게 줘요.', de: 'Enters very fast and decelerates for a long time. Material 3’s emphasized curve for incoming elements.', ue: 'Use it for sheets, dialogs and new screens that should draw attention as they arrive, usually with a longer duration of around 400–500 ms.', html: tfDemo(bez(.05, .7, .1, 1)) },
      { id: 'tf-m3acc', k: 'M3 강조 가속', e: 'Material 3 · Emphasized accelerate', d: '처음엔 거의 움직이지 않다가 막판에 빠르게 빠져나가요. 화면에서 나가는 요소용이에요.', u: '닫히는 시트, 사라지는 다이얼로그에 써요. 나가는 움직임은 들어오는 움직임보다 짧게(150~200ms) 주는 게 좋아요.', de: 'Barely moves at first, then exits quickly. Meant for elements leaving the screen.', ue: 'Use it for closing sheets and dismissed dialogs. Exits should be shorter than entrances, around 150–200 ms.', html: tfDemo(bez(.3, 0, .8, .15)) }
    ]
  },
  {
    id: 'm-steps', short: 'steps()', en: 'Stepped motion', shortEn: 'steps()',
    title: 'steps(): 계단처럼 끊어서 움직이기', titleEn: 'steps(): moving in discrete jumps',
    sub: 'steps(개수, 위치)는 부드럽게 이어지는 대신 정해진 칸 수만큼 뚝뚝 끊어서 움직여요. 위치(jump-start, jump-end, jump-none, jump-both)는 언제 점프할지를 정해요.',
    subEn: 'steps(count, position) moves in a fixed number of jumps instead of a smooth line. The position keyword (jump-start, jump-end, jump-none, jump-both) decides when each jump happens.',
    items: [
      { id: 'st-end', k: 'steps(4, jump-end)', e: 'Jump at the end', d: '각 구간이 끝날 때 점프해요. 처음 값(0)에서 출발하고, 마지막 값(1)에는 애니메이션이 끝나는 순간에야 도착해요. steps(4)라고만 써도 이거예요.', u: '기본값이라 가장 흔해요. 끝 값이 잠깐도 안 보이는 게 문제라면 jump-none이나 fill-mode: forwards를 함께 쓰세요.', de: 'Jumps at the end of each interval. It starts at 0 and reaches 1 only as the animation ends. Plain steps(4) means this.', ue: 'The default and the most common. If the final value must actually be visible, use jump-none or add fill-mode: forwards.', html: tfDemo(st(4, 'end')) },
      { id: 'st-start', k: 'steps(4, jump-start)', e: 'Jump at the start', d: '시작하자마자 첫 칸으로 점프해요. 처음 값(0)은 보이지 않고 곧바로 1/4부터 보여요.', u: '누르는 즉시 변화가 보여야 하는 단계형 표시에 써요. 처음 상태를 보여 줘야 한다면 맞지 않아요.', de: 'Jumps to the first step immediately, so 0 is never shown; it starts at one quarter.', ue: 'Use it for stepped indicators that must change the instant you press. Not suitable when the initial state needs to be seen.', html: tfDemo(st(4, 'start')) },
      { id: 'st-none', k: 'steps(5, jump-none)', e: 'No jump at either end', d: '처음 값과 끝 값 모두에서 한 칸씩 머물러요. 5칸이면 0, 25%, 50%, 75%, 100%를 같은 시간씩 보여 줘요.', u: '별점 채우기, 단계 표시처럼 처음과 끝 상태가 모두 보여야 할 때 가장 직관적이에요.', de: 'Holds on both the first and the last value. Five steps show 0, 25, 50, 75 and 100 percent for equal time.', ue: 'The most intuitive choice when both the start and end states must be seen, as with filling a rating or a stepper.', html: tfDemo(st(5, 'none')) },
      { id: 'st-both', k: 'steps(3, jump-both)', e: 'Jump at both ends', d: '시작할 때도 끝날 때도 점프해요. 그래서 3칸인데 점프는 4번이고, 처음 값과 끝 값은 머무르지 않아요.', u: '잘 쓰이진 않지만, 처음과 끝을 건너뛰고 중간 단계만 보여 주고 싶을 때 써요.', de: 'Jumps at both the start and the end, so three steps make four jumps and neither end value is held.', ue: 'Rarely used, but handy when you want to show only the in-between stages.', html: tfDemo(st(3, 'both')) },
      { id: 'st-se', k: 'step-start · step-end', e: 'One-step shorthands', d: 'step-start는 steps(1, jump-start), step-end는 steps(1, jump-end)의 줄임말이에요. 중간 과정 없이 한 번에 바뀌어요.', u: '깜빡이는 커서, 켜짐·꺼짐 표시처럼 중간이 없어야 하는 변화에 써요. 커서 깜빡임은 보통 step-end로 만들어요.', de: 'step-start is short for steps(1, jump-start) and step-end for steps(1, jump-end). The value changes all at once.', ue: 'Use them for changes with no in-between, like a blinking caret or an on/off indicator. Caret blinks are usually step-end.', html: tfDemo(st(1, 'end', 'step-end')) },
      {
        id: 'st-type', k: '타자기 효과', e: 'Typewriter with steps()', d: '글자 수만큼 steps()를 주고 너비를 ch 단위로 늘리면 한 글자씩 찍히는 효과가 나와요.', u: '히어로 문구, 터미널 화면처럼 짧은 한 줄에 써요. 고정폭 글꼴이어야 정확히 맞고, 글자 수가 바뀌면 steps 수도 같이 바꿔야 해요.', de: 'Give steps() the number of characters and grow the width in ch units, and text appears one character at a time.', ue: 'Use it for a short single line such as a hero tagline or a terminal. It needs a monospaced font, and the step count must match the character count.',
        css: `.st-type .tw{display:flex;flex-direction:column;align-items:flex-start;gap:1.2em}
.st-type .ln3{font-family:var(--f-mono);font-size:1.25em;white-space:nowrap;overflow:hidden;border-right:.12em solid var(--accent);width:0}
.st-type .s1{animation:sty-w 4s steps(14) infinite,sty-c .8s step-end infinite}
.st-type .s2{color:var(--ink-3);animation:sty-w 4s linear infinite,sty-c .8s step-end infinite}
.st-type .lb{font-size:.7em;color:var(--ink-3);margin-bottom:-.9em}
.st-type code{font-family:var(--f-mono);font-size:.68em;color:var(--accent)}
@keyframes sty-w{0%,8%{width:0}60%,90%{width:14ch}100%{width:0}}
@keyframes sty-c{50%{border-color:transparent}}`,
        html: `<div class="tw"><span class="lb">steps(14)</span><span class="ln3 s1">npm run build:</span><span class="lb">linear</span><span class="ln3 s2">npm run build:</span><code>width: 0 → 14ch</code></div>`
      },
      {
        id: 'st-clock', k: '시계 초침', e: 'Ticking clock', d: '같은 회전이라도 steps(12)를 주면 째깍째깍 끊어서, linear를 주면 미끄러지듯 돌아요.', u: '카운트다운, 시계, 프레임 단위 스프라이트처럼 "한 칸씩"이 의미 있는 움직임에 steps를 써요.', de: 'The same rotation ticks with steps(12) and sweeps smoothly with linear.', ue: 'Use steps where each discrete tick means something: countdowns, clocks and frame-by-frame sprites.',
        css: `.st-clock .wr{display:flex;gap:3em}
.st-clock .cl{display:flex;flex-direction:column;align-items:center;gap:.8em}
.st-clock .fc{position:relative;width:8em;height:8em;border-radius:50%;background:var(--ui);border:.15em solid var(--rule);background-image:repeating-conic-gradient(from -1deg,var(--line) 0 2deg,transparent 2deg 30deg);}
.st-clock .fc::after{content:"";position:absolute;inset:.7em;border-radius:50%;background:var(--ui)}
.st-clock .hn{position:absolute;left:50%;top:50%;width:.22em;height:3.3em;margin:-3.3em 0 0 -.11em;border-radius:1em;background:var(--accent);transform-origin:50% 100%;z-index:1;animation:sc-r 6s infinite}
.st-clock .a .hn{animation-timing-function:steps(12)}.st-clock .b .hn{animation-timing-function:linear}
.st-clock .fc i{position:absolute;left:50%;top:50%;width:.6em;height:.6em;margin:-.3em;border-radius:50%;background:var(--accent);z-index:2}
.st-clock code{font-family:var(--f-mono);font-size:.72em;color:var(--ink-2)}
@keyframes sc-r{to{transform:rotate(360deg)}}`,
        html: `<div class="wr"><div class="cl a"><div class="fc"><span class="hn"></span><i></i></div><code>steps(12)</code></div><div class="cl b"><div class="fc"><span class="hn"></span><i></i></div><code>linear</code></div></div>`
      }
    ]
  },
  {
    id: 'm-lin', short: 'linear()', en: 'Springs & bounces', shortEn: 'linear()',
    title: 'linear()로 만드는 스프링과 바운스', titleEn: 'Springs and bounces with linear()',
    sub: 'linear()는 점을 여러 개 찍고 그 사이를 직선으로 잇는 함수예요. 점을 촘촘히 찍으면 cubic-bezier로는 못 만드는 여러 번 튀는 바운스와 출렁이는 스프링을 CSS만으로 만들 수 있어요.',
    subEn: 'linear() plots many points and joins them with straight lines. With enough points you can build multi-bounce and wobbly spring curves in pure CSS, which cubic-bezier cannot express.',
    items: [
      { id: 'ln-bounce', k: '바운스', e: 'Bounce', d: '목표에 부딪힌 뒤 점점 작게 몇 번 튀다가 멈춰요. 공이 바닥에 떨어지는 움직임이에요.', u: '게임 요소, 떨어지는 아이콘, 장난스러운 일러스트에 써요. 버튼이나 패널 같은 실용 UI에선 산만하니 피하세요.', de: 'Hits the target and bounces a few times, smaller each time, like a ball dropped on the floor.', ue: 'Use it for game elements, falling icons and playful illustrations. It is distracting on practical UI such as buttons and panels.', html: tfDemo(Object.assign({}, bounceL, { code: 'linear(0, …, 1)  · 61개 점', note: 'easeOutBounce를 61개 점으로 샘플링했어요' })) },
      { id: 'ln-spring', k: '스프링', e: 'Spring', d: '용수철처럼 목표를 지나쳐 몇 번 출렁이다 자리를 잡아요. iOS와 머티리얼 3 익스프레시브가 기본으로 쓰는 움직임이에요.', u: '드래그를 놓았을 때, 시트가 튕기듯 열릴 때처럼 손의 힘이 이어지는 느낌을 줘야 할 때 좋아요. 출렁임은 한두 번이면 충분해요.', de: 'Overshoots like a spring and wobbles a couple of times before settling. It is the default feel in iOS and Material 3 Expressive.', ue: 'Great when motion should carry the energy of the hand, such as releasing a drag or flinging a sheet open. One or two wobbles are enough.', html: tfDemo(Object.assign({}, springL, { code: 'linear(0, …, 1)  · 감쇠 0.45', note: '감쇠비 0.45인 스프링을 샘플링했어요' })) },
      { id: 'ln-soft', k: '부드러운 스프링', e: 'Gentle spring', d: '감쇠를 크게 하면 아주 살짝만 지나쳤다 돌아와요. 스프링의 자연스러움은 살리고 출렁임은 거의 없어요.', u: '모달, 카드, 페이지 전환처럼 크고 중요한 요소에 스프링 느낌을 주고 싶을 때 써요. 대부분의 UI에는 이 정도가 알맞아요.', de: 'With more damping it overshoots only a hair, keeping the natural feel of a spring without the wobble.', ue: 'Use it to give large, important elements such as modals, cards and page transitions a spring feel. This level suits most UI.', html: tfDemo(Object.assign({}, softL, { code: 'linear(0, …, 1)  · 감쇠 0.78', note: '감쇠비 0.78인 스프링을 샘플링했어요' })) },
      {
        id: 'ln-syntax', k: 'linear() 문법', e: 'How linear() works', d: 'linear(0, 0.7 30%, 1)처럼 진행도와 시점(%)을 짝지어 적어요. 시점을 비우면 앞뒤 점 사이에 고르게 놓여요.', u: '디자인 도구나 스프링 생성기에서 만든 곡선을 그대로 옮길 때 써요. 지원하지 않는 오래된 브라우저를 위해 cubic-bezier 대체값을 먼저 적어 두세요.', de: 'Pair each progress value with a point in time, as in linear(0, 0.7 30%, 1). Points without a percentage are spread evenly between their neighbours.', ue: 'Use it to paste curves from design tools or spring generators. Declare a cubic-bezier fallback first for older browsers.',
        html: tfDemo({ tf: 'linear(0, 0.7 30%, 1)', code: 'linear(0, 0.7 30%, 1)', d: 'M0 1L0.3 0.3L1 0', note: '30% 시점에 이미 70%까지 와요' })
      }
    ]
  },
  {
    id: 'm-prop', short: 'animation 속성', en: 'Properties', shortEn: 'Properties',
    title: '곡선 말고 함께 정하는 것들', titleEn: 'Everything else you set besides the curve',
    sub: '애니메이션은 곡선 하나로 끝나지 않아요. 얼마나 오래, 언제부터, 몇 번, 어느 방향으로, 끝난 뒤 어떤 모습으로 남을지를 함께 정해요.',
    subEn: 'A curve is only part of an animation. You also decide how long it runs, when it starts, how many times, in which direction and how it looks once finished.',
    items: [
      { id: 'pr-dur', k: 'animation-duration', e: 'Duration', d: '한 번 재생하는 데 걸리는 시간이에요. 같은 곡선이라도 시간이 다르면 성격이 완전히 달라져요.', u: '작은 요소는 100~200ms, 화면 일부를 덮는 요소는 250~350ms, 화면 전체 전환은 400~500ms 정도가 출발점이에요. 1초를 넘기면 대부분 답답해요.', de: 'How long one run takes. The same curve feels completely different at different durations.', ue: 'Start around 100–200 ms for small elements, 250–350 ms for things covering part of the screen and 400–500 ms for full-screen transitions. Beyond a second, most UI feels sluggish.', html: `<div class="mp">${row('0.2s', 'b1')}${row('0.5s', 'b2')}${row('1s', 'b3')}<span class="hint">세 공 모두 ease-out · 거리는 같아요</span></div>` },
      { id: 'pr-delay', k: 'animation-delay', e: 'Delay & stagger', d: '재생을 시작하기 전까지 기다리는 시간이에요. 목록 항목마다 조금씩 다르게 주면 차례로 등장해요.', u: '항목 간격은 30~80ms가 적당해요. 항목이 많으면 전체 대기 시간이 길어지니 앞의 몇 개만 차례로 보여 주세요. 음수를 주면 이미 진행된 지점부터 시작해요.', de: 'How long to wait before playing. Offsetting it slightly per list item makes them appear in sequence.', ue: 'Use 30–80 ms between items. With long lists the total wait grows, so stagger only the first few. A negative value starts the animation part-way through.', html: `<div class="pr-delay"><div class="ls">${[0, 1, 2, 3].map(i => `<span style="--i:${i}"><i class="av"></i><i class="ln" style="width:${[70, 55, 80, 60][i]}%"></i><code>${(i * .12).toFixed(2)}s</code></span>`).join('')}</div></div>` },
      { id: 'pr-iter', k: 'animation-iteration-count', e: 'Iteration count', d: '몇 번 반복할지 정해요. 숫자를 주면 그만큼, infinite를 주면 끝없이 반복해요. 2.5처럼 소수도 돼요.', u: '로딩처럼 끝을 모르는 상태만 infinite로 두세요. 주의를 끌기 위한 흔들림은 1~2번이면 충분하고, 계속 움직이면 오히려 무시당해요.', de: 'How many times to repeat. A number repeats that many times, infinite never stops, and fractions like 2.5 work too.', ue: 'Reserve infinite for states with no known end, like loading. An attention shake needs one or two runs; constant motion gets ignored.', html: `<div class="mp">${row('1', 'b1')}${row('3', 'b2')}${row('infinite', 'b3')}</div>` },
      { id: 'pr-dir', k: 'animation-direction', e: 'Direction', d: '재생 방향이에요. normal은 앞으로, reverse는 거꾸로, alternate는 앞뒤로 번갈아, alternate-reverse는 거꾸로부터 번갈아 재생해요.', u: '왕복하는 움직임은 키프레임을 두 번 쓰지 말고 alternate로 만드세요. reverse로 재생하면 곡선도 뒤집혀서 ease-in이 ease-out처럼 보여요.', de: 'Which way to play: normal goes forward, reverse backward, alternate back and forth, and alternate-reverse back and forth starting backward.', ue: 'Build back-and-forth motion with alternate instead of doubling your keyframes. In reverse the curve flips too, so ease-in looks like ease-out.', html: `<div class="mp pr-dir">${row('normal', 'b1')}${row('reverse', 'b2')}${row('alternate', 'b3')}${row('alt-reverse', 'b4')}</div>` },
      { id: 'pr-fill', k: 'animation-fill-mode', e: 'Fill mode', d: '재생 전 대기 시간과 재생이 끝난 뒤에 어떤 모습일지 정해요. forwards는 끝 모습을 유지, backwards는 대기 중에 첫 모습을 미리 적용, both는 둘 다예요.', u: '한 번만 재생하는 등장 애니메이션은 대부분 both가 맞아요. 안 그러면 대기 중엔 원래 자리에서 깜빡 보였다가, 끝나면 원래대로 튀어 돌아가요.', de: 'What the element looks like during the delay and after the run. forwards keeps the end state, backwards applies the first frame during the delay, both does both.', ue: 'Most one-shot entrance animations want both. Otherwise the element flashes in its resting place during the delay and snaps back when the run ends.', html: `<div class="mp pr-fill"><div class="phs"><span>delay</span><span>실행</span><span>끝난 뒤</span><i></i></div>${row('none', 'f1')}${row('forwards', 'f2')}${row('backwards', 'f3')}${row('both', 'f4')}</div>` },
      { id: 'pr-play', k: 'animation-play-state', e: 'Play state', d: 'running이면 재생, paused면 그 자리에서 멈춰요. 다시 running으로 바꾸면 멈춘 지점부터 이어져요.', u: '화면 밖으로 나간 애니메이션을 멈추거나, 사용자가 일시정지를 누를 때 써요. 이 페이지도 카드가 화면에 보일 때만 running으로 바꿔요.', de: 'running plays and paused freezes on the spot. Switching back to running resumes from where it stopped.', ue: 'Use it to pause animations that scroll off screen or when people press pause. This page sets cards to running only while they are visible.', html: `<div class="wr"><span class="sq2"></span><div class="cl"><span class="pb"><span class="sw"><svg class="o1" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg><svg class="o2" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg></span><span class="sw2"><b class="o1">일시정지</b><b class="o2">다시 재생</b></span><i class="tap t1"></i><i class="tap t2"></i></span><code><b class="o1">play-state: <em>running</em></b><b class="o2">play-state: <em>paused</em></b></code></div></div>` },
      { id: 'pr-short', k: 'animation 단축 속성', e: 'The shorthand', d: '여러 속성을 한 줄에 적을 수 있어요. 순서는 자유롭지만 시간 값은 첫 번째가 duration, 두 번째가 delay로 읽혀요.', u: '이름과 duration은 꼭 넣고, 나머지는 필요한 것만 적으세요. 여러 애니메이션은 쉼표로 이어 붙여요.', de: 'Several properties fit on one line. Order is flexible, except that the first time value is read as duration and the second as delay.', ue: 'Always include the name and duration, and add only the rest you need. Separate multiple animations with commas.', html: `<div class="wr"><pre>animation: ${[['slide', 0], ['0.8s', 1], ['ease-out', 2], ['0.2s', 3], ['infinite', 4], ['alternate', 5], ['both', 6], ['running', 7]].map(([t, i]) => `<span style="--i:${i}">${t}</span>`).join(' ')};</pre><div class="ex">${[['name', '실행할 @keyframes 이름'], ['duration', '첫 번째 시간 값 = 한 번 재생 시간'], ['timing-function', '속도 곡선'], ['delay', '두 번째 시간 값 = 시작 전 대기'], ['iteration-count', '반복 횟수'], ['direction', '재생 방향'], ['fill-mode', '재생 전후의 모습'], ['play-state', '재생 중인지 멈췄는지']].map(([b, s], i) => `<div style="--i:${i}"><b>${b}</b><span>${s}</span></div>`).join('')}</div></div>` }
    ]
  },
  {
    id: 'm-use', short: '실전 고르기', en: 'In practice', shortEn: 'In practice',
    title: '어디에 어떤 곡선을 쓸까', titleEn: 'Which curve where',
    sub: '같은 화면이라도 곡선과 시간을 바꾸면 빠르게도, 굼뜨게도, 어색하게도 느껴져요. 왼쪽이 권장, 오른쪽이 흔한 실수예요.',
    subEn: 'The same screen can feel quick, sluggish or awkward depending on curve and duration. The left side is recommended; the right side is a common mistake.',
    items: [
      { id: 'us-enter', k: '등장은 ease-out', e: 'Enter with ease-out', d: '들어오는 요소는 빠르게 출발해 천천히 멈춰야 반응이 빨라 보여요. ease-in으로 들어오면 처음이 굼떠서 늦게 뜬 것처럼 느껴져요.', u: '토스트, 드롭다운, 모달처럼 사용자의 행동에 대한 응답으로 나타나는 모든 요소에 감속 곡선을 쓰세요.', de: 'Incoming elements should start fast and slow down so the response feels immediate. Entering with ease-in feels late.', ue: 'Use a decelerating curve for anything that appears in response to an action: toasts, dropdowns, modals.', html: `<div class="us"><div class="cl a"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:80%"></span></div><span class="ts">저장했어요</span></div><span class="cap ok"><b>ease-out</b> · 바로 뜸</span></div><div class="cl b"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span><span class="ln" style="width:80%"></span></div><span class="ts">저장했어요</span></div><span class="cap bad"><b>ease-in</b> · 굼뜸</span></div></div>` },
      { id: 'us-exit', k: '퇴장은 ease-in', e: 'Exit with ease-in', d: '나가는 요소는 천천히 출발해 빠르게 사라져야 깔끔해요. ease-out으로 나가면 끝부분이 오래 남아 질질 끄는 것처럼 보여요.', u: '닫히는 시트, 사라지는 알림에 가속 곡선을 쓰고, 등장보다 짧게(약 70%) 주세요. 사용자는 이미 다음 일에 관심이 가 있어요.', de: 'Leaving elements should start slowly and disappear fast. Exiting with ease-out lingers at the end.', ue: 'Use an accelerating curve for closing sheets and dismissed notices, and make exits shorter than entrances, about 70 percent. People have already moved on.', html: `<div class="us"><div class="cl a"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="ln" style="width:80%"></span></div><div class="dm"></div><div class="sh"><span class="ln h" style="width:60%"></span><span class="ln" style="width:85%"></span><span class="bt">확인</span></div></div><span class="cap ok"><b>ease-in</b> · 깔끔</span></div><div class="cl b"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="ln" style="width:80%"></span></div><div class="dm"></div><div class="sh"><span class="ln h" style="width:60%"></span><span class="ln" style="width:85%"></span><span class="bt">확인</span></div></div><span class="cap bad"><b>ease-out</b> · 질질 끎</span></div></div>` },
      { id: 'us-move', k: '이동은 ease-in-out', e: 'Move with ease-in-out', d: '화면 안에서 자리를 옮기는 요소는 출발과 도착이 모두 보이니 양쪽 다 부드러워야 해요. linear로 옮기면 출발과 멈춤이 툭툭 끊겨요.', u: '정렬이 바뀐 카드, 순서를 바꾼 목록 항목, 탭 아래 밑줄의 이동에 써요.', de: 'An element moving within the screen is visible at both ends, so both should be smooth. With linear the start and stop feel abrupt.', ue: 'Use it for re-sorted cards, reordered list items and a tab underline sliding across.', html: `<div class="us us-m">${['a', 'b'].map(c => `<div class="cl ${c}"><div class="pan box"><i class="sl s1"></i><i class="sl s2"></i><span class="cd"></span></div><span class="cap ${c === 'a' ? 'ok' : 'bad'}"><b>${c === 'a' ? 'ease-in-out' : 'linear'}</b> · ${c === 'a' ? '자연스러움' : '딱딱함'}</span></div>`).join('')}</div>` },
      { id: 'us-spin', k: '회전은 linear', e: 'Spin with linear', d: '끝없이 도는 로딩은 일정한 속도여야 해요. ease 계열을 쓰면 한 바퀴마다 빨라졌다 느려져서 덜컹거려 보여요.', u: '스피너, 계속 흐르는 그라데이션, 무한 스크롤 띠처럼 반복이 이어지는 움직임엔 linear를 쓰세요.', de: 'An endlessly spinning loader needs constant speed. Any ease curve speeds up and slows down every turn, so it lurches.', ue: 'Use linear for continuous loops such as spinners, flowing gradients and marquee strips.', html: `<div class="us">${['a', 'b'].map(c => `<div class="cl ${c}"><span class="sp"></span><span class="cap ${c === 'a' ? 'ok' : 'bad'}"><b>${c === 'a' ? 'linear' : 'ease-in-out'}</b> · ${c === 'a' ? '매끄러움' : '덜컹거림'}</span></div>`).join('')}</div>` },
      { id: 'us-size', k: '크기에 맞춘 시간', e: 'Scale duration to size', d: '움직이는 거리가 짧고 요소가 작을수록 짧게, 크고 멀리 갈수록 길게 줘요. 같은 시간을 쓰면 작은 건 굼뜨고 큰 건 급해 보여요.', u: '토글·체크박스는 약 150ms, 바텀시트는 약 350ms에서 시작해 직접 눌러 보며 조절하세요.', de: 'Small elements travelling a short way get short durations; large elements travelling far get longer ones. One duration for all makes small things sluggish and big things rushed.', ue: 'Start around 150 ms for toggles and checkboxes and 350 ms for bottom sheets, then tune by trying them yourself.', html: `<div class="us"><div class="cl a"><div class="bx"><span class="tg"><b></b></span></div><span class="cap"><b>150ms</b> · 작은 토글</span></div><div class="cl b"><div class="ph"><div class="scr"><span class="ln h" style="width:50%"></span><span class="im"></span></div><div class="sh"><span class="ln h" style="width:60%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:70%"></span></div></div><span class="cap"><b>350ms</b> · 큰 시트</span></div></div>` },
      { id: 'us-trans', k: 'transition vs animation', e: 'Transition vs Animation', d: 'transition은 상태가 바뀔 때 A와 B 사이를 한 번 이어 줘요. animation은 @keyframes로 여러 단계를 정해 스스로 재생하고 반복할 수 있어요.', u: '호버, 선택, 열림·닫힘처럼 두 상태를 오가는 건 transition이 간단하고 중간에 되돌려도 자연스러워요. 로딩, 주의 끌기처럼 여러 단계나 반복이 필요하면 animation을 쓰세요.', de: 'A transition bridges A and B once when state changes. An animation defines several stages with @keyframes and can play and repeat on its own.', ue: 'For two-state changes such as hover, selection and open/close, transitions are simpler and reverse gracefully mid-way. Use animations for multi-step or looping motion such as loaders and attention cues.', html: `<div class="us"><div class="cl"><div class="bx"><span class="bt2">마우스를 올려요</span>${CUR}</div><code>transition: A ↔ B</code></div><div class="cl"><div class="bx"><span class="pu"></span></div><code>@keyframes 0% → 50% → 100%</code></div></div>` }
    ]
  }
];

/* item-level css */
window.UX.forEach(s => s.items.forEach(it => { if (it.css) { s.css = (s.css || '') + '\n' + it.css; } }));
})();
