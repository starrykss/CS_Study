(window.UX = window.UX || []).push({
  id: 's-comp', short: '컴포넌트 사전', en: 'Components',
  shortEn: 'Components', titleEn: 'A glossary of UI components',
  subEn: 'The building blocks that design systems such as shadcn/ui ship with. Each one shows what it looks like and how it behaves.',
  title: '이름을 알면 쓰기 쉬운 컴포넌트',
  sub: 'shadcn/ui 같은 디자인 시스템이 기본으로 갖추고 있는 부품들이에요. 생김새와 움직임을 함께 봐 두면 기획서에 이름으로 부를 수 있어요.',
  css: `
.cp-avatar .two{gap:3.2em}
.cp-avatar .avs{display:flex;padding-left:.9em}
.cp-avatar .avs>span{position:relative;width:3.6em;height:3.6em;margin-left:-.9em;border-radius:50%;border:.22em solid var(--stage);display:grid;place-items:center;font-weight:700;overflow:hidden;animation:cav-in 4s cubic-bezier(.2,.8,.2,1.3) infinite backwards;animation-delay:calc(var(--i) * .12s)}
.cp-avatar .pf{background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.9) 0 20%,transparent 21%),radial-gradient(ellipse 44% 34% at 50% 100%,rgba(255,255,255,.9) 0 98%,transparent 100%),var(--c)}
.cp-avatar .in1{background:var(--accent-soft);color:var(--accent)}
.cp-avatar .in2{background:#E3F8EE;color:#03A65F}
.cp-avatar .mo{background:var(--weak);color:var(--weak-ink);font-size:.9em}
.cp-avatar .one{position:relative;width:6.4em;height:6.4em}
.cp-avatar .one>span{position:absolute;inset:0;border-radius:50%}
.cp-avatar .one .pf{--c:#FF9E7A;animation:cav-p 5s infinite}
.cp-avatar .one .ini{display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);font-size:2.2em;font-weight:700;animation:cav-i 5s infinite}
.cp-avatar .one .ini{inset:0}
.cp-avatar .dot{position:absolute;right:.25em;bottom:.25em;width:1.3em;height:1.3em;border-radius:50%;background:var(--ok);border:.22em solid var(--stage);animation:cav-d 5s cubic-bezier(.2,.8,.2,1.4) infinite}
.cp-avatar .lbs{position:relative;height:1.4em;width:9em}
.cp-avatar .lbs .cap{position:absolute;left:0;right:0;text-align:center}
.cp-avatar .l1{animation:cav-l1 5s infinite}.cp-avatar .l2{animation:cav-l2 5s infinite}.cp-avatar .l3{animation:cav-l3 5s infinite}
@keyframes cav-in{0%,6%{opacity:0;transform:translateX(-.6em) scale(.8)}18%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
@keyframes cav-p{0%,24%{opacity:0}28%,56%{opacity:1}60%,100%{opacity:0}}
@keyframes cav-i{0%,58%{opacity:0;transform:scale(.9)}62%,92%{opacity:1;transform:none}97%,100%{opacity:0}}
@keyframes cav-d{0%,26%{transform:scale(0)}32%,92%{transform:none}97%,100%{transform:scale(0)}}
@keyframes cav-l1{0%,24%{opacity:1}27%,96%{opacity:0}99%,100%{opacity:1}}
@keyframes cav-l2{0%,25%{opacity:0}28%,56%{opacity:1}59%,100%{opacity:0}}
@keyframes cav-l3{0%,57%{opacity:0}60%,94%{opacity:1}97%,100%{opacity:0}}

.cp-aspect .two{align-items:flex-start;gap:1em}
.cp-aspect .fh{width:12em;height:6.75em}
.cp-aspect .fr{position:relative;width:12em;animation:asp-w 4s cubic-bezier(.4,0,.2,1) infinite}
.cp-aspect .pic{border-radius:.8em;background:radial-gradient(ellipse 12% 21.33% at 70% 35%,#FFC94D 0 97%,transparent 100%),linear-gradient(172deg,transparent 60%,#2BC995 60.5%),linear-gradient(#7DB8FF,#D9ECFF)}
.cp-aspect .a .pic{height:6.75em}
.cp-aspect .b .pic{aspect-ratio:16/9}
.cp-aspect .tag{position:absolute;right:.4em;bottom:.4em;padding:.1em .4em;border-radius:.35em;background:rgba(0,0,0,.45);color:#fff;font-family:var(--f-mono);font-size:.62em}
.cp-aspect .cap{margin-top:.2em}
@keyframes asp-w{0%,15%{width:12em}45%,65%{width:6.4em}92%,100%{width:12em}}

.cp-sep .pan{width:15em;padding:1.4em 1.3em 1.1em;display:flex;flex-direction:column;gap:.8em}
.cp-sep .or{display:flex;align-items:center;gap:.7em;font-size:.8em;color:var(--ink-3)}
.cp-sep .or i{flex:1;height:.12em;background:var(--rule);animation:sep-h 4s cubic-bezier(.4,0,.2,1) infinite}
.cp-sep .or i:first-child{transform-origin:right}.cp-sep .or i:last-child{transform-origin:left}
.cp-sep .ft{display:flex;align-items:center;justify-content:center;gap:.6em;margin-top:.4em;font-size:.68em;color:var(--ink-3);white-space:nowrap}
.cp-sep .ft i{width:.12em;height:1em;background:var(--line);animation:sep-v 4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes sep-h{0%,10%{transform:scaleX(0)}30%,88%{transform:none}100%{transform:scaleX(0)}}
@keyframes sep-v{0%,28%{transform:scaleY(0)}42%,88%{transform:none}100%{transform:scaleY(0)}}

.cp-kbd .col{gap:1.1em}
.cp-kbd .ln2{display:flex;align-items:center;gap:.35em;font-size:1.05em;color:var(--ink-2);white-space:nowrap}
.cp-kbd kbd{display:inline-grid;place-items:center;min-width:2.1em;height:2.1em;padding:0 .45em;border:.1em solid var(--line);border-bottom-width:.3em;border-radius:.45em;background:var(--ui);font-family:var(--f-mono);font-size:.9em;font-weight:500;color:var(--ink);animation:kbd-p 4s infinite}
.cp-kbd .ln2 kbd+kbd{animation-delay:.08s}
.cp-kbd .pal{width:17em;padding:.55em;display:flex;flex-direction:column;gap:.25em;transform-origin:50% 0;animation:kbd-o 4s cubic-bezier(.2,.8,.2,1) infinite}
.cp-kbd .sr2{display:flex;align-items:center;gap:.5em;padding:.45em .6em .6em;border-bottom:.1em solid var(--rule);font-size:.85em;color:var(--ink-3)}
.cp-kbd .sr2 svg{width:1.1em;height:1.1em}
.cp-kbd .it{display:flex;justify-content:space-between;align-items:center;padding:.4em .6em;border-radius:.55em;font-size:.82em}
.cp-kbd .it.on{background:var(--weak)}
.cp-kbd .it kbd{animation:none;min-width:1.7em;height:1.7em;font-size:.78em;border-bottom-width:.2em;color:var(--ink-3)}
@keyframes kbd-p{0%,22%{transform:none;border-bottom-width:.3em}25%,32%{transform:translateY(.16em);border-bottom-width:.12em}36%,100%{transform:none;border-bottom-width:.3em}}
@keyframes kbd-o{0%,30%{opacity:0;transform:translateY(-.4em) scale(.97)}38%,86%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}

@property --ta{syntax:'<integer>';inherits:false;initial-value:0}
.cp-textarea .pan{width:17em;padding:1.2em;display:flex;flex-direction:column;gap:.5em}
.cp-textarea .lb{font-size:.82em;font-weight:600;color:var(--ink-2)}
.cp-textarea .ta{position:relative;display:flex;flex-direction:column;padding:.65em .8em;border:.12em solid var(--accent);border-radius:.8em;min-height:3.9em;font-size:.85em;line-height:1.5;box-shadow:0 0 0 .22em var(--accent-soft)}
.cp-textarea .ph2{position:absolute;left:.8em;top:.65em;color:var(--ink-3);animation:ta-p 6s infinite}
.cp-textarea .l{display:block;overflow:hidden;white-space:nowrap;max-height:0}
.cp-textarea .l1{animation:ta-1 6s linear infinite}.cp-textarea .l2{animation:ta-2 6s linear infinite}.cp-textarea .l3{animation:ta-3 6s linear infinite}
.cp-textarea .cnt{align-self:flex-end;font-family:var(--f-mono);font-size:.72em;color:var(--ink-3);counter-reset:n var(--ta);animation:ta-c 6s linear infinite}
.cp-textarea .cnt::before{content:counter(n) " / 200"}
.cp-textarea .hint{font-size:.7em;color:var(--ink-3)}
@keyframes ta-p{0%,7%{opacity:1}9%,94%{opacity:0}97%,100%{opacity:1}}
@keyframes ta-1{0%,8%{max-height:0;clip-path:inset(0 100% 0 0)}9%{max-height:1.5em;clip-path:inset(0 100% 0 0)}30%,90%{max-height:1.5em;clip-path:inset(0 0 0 0);opacity:1}93%,100%{max-height:0;clip-path:inset(0 0 0 0);opacity:0}}
@keyframes ta-2{0%,30%{max-height:0;clip-path:inset(0 100% 0 0)}31%{max-height:1.5em;clip-path:inset(0 100% 0 0)}51%,90%{max-height:1.5em;clip-path:inset(0 0 0 0);opacity:1}93%,100%{max-height:0;clip-path:inset(0 0 0 0);opacity:0}}
@keyframes ta-3{0%,51%{max-height:0;clip-path:inset(0 100% 0 0)}52%{max-height:1.5em;clip-path:inset(0 100% 0 0)}72%,90%{max-height:1.5em;clip-path:inset(0 0 0 0);opacity:1}93%,100%{max-height:0;clip-path:inset(0 0 0 0);opacity:0}}
@keyframes ta-c{0%,8%{--ta:0}30%{--ta:16}31%{--ta:17}51%{--ta:30}52%{--ta:31}72%,90%{--ta:44}93%,100%{--ta:0}}

.cp-nselect .scr{gap:.55em;padding-top:2.4em}
.cp-nselect .lb{font-size:.72em;font-weight:600;color:var(--ink-2)}
.cp-nselect .fd{position:relative;height:2.5em;border:.12em solid var(--frame);border-radius:.7em;font-size:.8em}
.cp-nselect .fd span{position:absolute;left:.75em;top:50%;transform:translateY(-50%);white-space:nowrap}
.cp-nselect .fd .v1{color:var(--ink-3);animation:ns-v1 5s infinite}
.cp-nselect .fd .v2{opacity:0;font-weight:600;animation:ns-v2 5s infinite}
.cp-nselect .fd::after{content:"";position:absolute;right:.85em;top:.75em;width:.45em;height:.45em;border:solid var(--ink-3);border-width:0 .14em .14em 0;transform:rotate(45deg)}
.cp-nselect .dm{animation:ns-d 5s infinite}
.cp-nselect .wh{position:absolute;left:0;right:0;bottom:0;background:var(--weak);z-index:2;animation:ns-w 5s cubic-bezier(.2,.8,.2,1) infinite}
.cp-nselect .tb{display:flex;justify-content:flex-end;padding:.45em .8em;font-size:.72em;font-weight:600;color:#0A84FF;background:var(--ui);border-bottom:.1em solid var(--rule)}
.cp-nselect .wl{position:relative;height:6.4em;overflow:hidden}
.cp-nselect .band{position:absolute;left:.5em;right:.5em;top:50%;height:1.53em;margin-top:-.765em;border-radius:.45em;background:var(--ui)}
.cp-nselect .opts{position:absolute;left:0;right:0;top:50%;margin-top:-.9em;display:flex;flex-direction:column;align-items:center;font-size:.85em;animation:ns-o 5s cubic-bezier(.3,.7,.2,1) infinite}
.cp-nselect .opts span{height:1.8em;line-height:1.8em;color:var(--ink-2)}
.cp-nselect .cap{white-space:nowrap}
.cp-nselect .tap{animation-duration:5s}
.cp-nselect .t1{left:50%;top:27%;animation-delay:-1.3s}
.cp-nselect .t2{left:86%;top:56%;animation-delay:-4.1s}
@keyframes ns-v1{0%,69%{opacity:1}70%,96%{opacity:0}97%,100%{opacity:1}}
@keyframes ns-v2{0%,69%{opacity:0}70%,96%{opacity:1}97%,100%{opacity:0}}
@keyframes ns-d{0%,22%{opacity:0}30%,66%{opacity:1}74%,100%{opacity:0}}
@keyframes ns-w{0%,23%{transform:translateY(100%)}32%,66%{transform:none}76%,100%{transform:translateY(100%)}}
@keyframes ns-o{0%,40%{transform:none}54%,100%{transform:translateY(-1.8em)}}

.cp-inputgrp .pan{width:17.5em;padding:1.2em;display:flex;flex-direction:column;gap:.75em}
.cp-inputgrp .ig{display:flex;align-items:stretch;height:2.5em;border:.12em solid var(--frame);border-radius:.75em;overflow:hidden;font-size:.82em;background:var(--ui)}
.cp-inputgrp .ad{display:flex;align-items:center;padding:0 .7em;background:var(--weak);color:var(--ink-3);white-space:nowrap;flex:none}
.cp-inputgrp .ad svg{width:1.1em;height:1.1em}
.cp-inputgrp .ad.p{background:transparent;padding-right:0}
.cp-inputgrp .in{flex:1;display:flex;align-items:center;padding:0 .7em;min-width:0;white-space:nowrap;overflow:hidden}
.cp-inputgrp .bb{position:relative;display:flex;align-items:center;justify-content:center;width:4.4em;flex:none;border-left:.12em solid var(--frame);font-weight:600;color:var(--accent)}
.cp-inputgrp .bb span{position:absolute;white-space:nowrap}
.cp-inputgrp .c1{animation:ig-1 4s infinite}.cp-inputgrp .c2{color:var(--ok);opacity:0;animation:ig-2 4s infinite}
.cp-inputgrp .g2{animation:ig-f 4s infinite}
.cp-inputgrp .g2 .in{color:var(--ink)}
.cp-inputgrp .unit{font-weight:600;color:var(--ink-2)}
.cp-inputgrp .cur{left:0;top:0;animation:ig-c 4s cubic-bezier(.4,0,.2,1) infinite}
.cp-inputgrp .tap{left:21.7em;top:9.15em;animation-delay:-3.72s}
@keyframes ig-1{0%,55%{opacity:1}57%,92%{opacity:0}95%,100%{opacity:1}}
@keyframes ig-2{0%,55%{opacity:0}57%,92%{opacity:1}95%,100%{opacity:0}}
@keyframes ig-f{0%,8%{border-color:var(--frame);box-shadow:none}12%,36%{border-color:var(--accent);box-shadow:0 0 0 .25em var(--accent-soft)}42%,100%{border-color:var(--frame);box-shadow:none}}
@keyframes ig-c{0%,30%{transform:translate(26em,19em)}48%,80%{transform:translate(21.5em,9em)}96%,100%{transform:translate(26em,19em)}}

.cp-btngrp .col{gap:2.2em}
.cp-btngrp .w{position:relative}
.cp-btngrp .bg{display:inline-flex;border:.12em solid var(--frame);border-radius:.8em;overflow:hidden;background:var(--ui)}
.cp-btngrp .bg>span{position:relative;display:flex;align-items:center;padding:.6em .95em;font-size:.88em;font-weight:600;color:var(--ink-2);white-space:nowrap}
.cp-btngrp .bg>span+span{border-left:.12em solid var(--frame)}
.cp-btngrp .num{width:4.2em;justify-content:center;font-family:var(--f-mono);font-weight:500!important;color:var(--ink)!important}
.cp-btngrp .num b{position:absolute;font-weight:500}
.cp-btngrp .n1{animation:bg-1 5s infinite}.cp-btngrp .n2{opacity:0;animation:bg-2 5s infinite}
.cp-btngrp .sp{display:inline-flex;border-radius:.8em;overflow:hidden}
.cp-btngrp .sp span{display:flex;align-items:center;background:var(--accent);color:var(--accent-ink);padding:.6em 1em;font-size:.88em;font-weight:600;white-space:nowrap}
.cp-btngrp .sp span+span{border-left:.1em solid rgba(255,255,255,.4);padding:.6em .75em}
.cp-btngrp .sp span+span::after{content:"";width:.45em;height:.45em;border:solid currentColor;border-width:0 .15em .15em 0;transform:translateY(-.15em) rotate(45deg)}
.cp-btngrp .mn{position:absolute;right:0;top:calc(100% + .4em);width:10.5em;padding:.4em;display:flex;flex-direction:column;font-size:.8em;transform-origin:100% 0;z-index:3;animation:bg-m 5s cubic-bezier(.2,.8,.2,1) infinite}
.cp-btngrp .mn span{padding:.45em .6em;border-radius:.5em;white-space:nowrap}
.cp-btngrp .mn span:first-child{background:var(--weak)}
.cp-btngrp .tap{animation-duration:5s}
.cp-btngrp .t1{left:88%;top:50%;animation-delay:-1.15s}
.cp-btngrp .t2{left:88%;top:50%;animation-delay:-4.65s}
@keyframes bg-1{0%,26%{opacity:1;transform:none}30%,94%{opacity:0;transform:translateY(-.6em)}98%,100%{opacity:1;transform:none}}
@keyframes bg-2{0%,26%{opacity:0;transform:translateY(.6em)}30%,94%{opacity:1;transform:none}98%,100%{opacity:0}}
@keyframes bg-m{0%,57%{opacity:0;transform:scale(.95)}62%,88%{opacity:1;transform:none}94%,100%{opacity:0;transform:none}}

.cp-toggle .pan{width:17em;padding:1em 1.2em 1.3em;display:flex;flex-direction:column;gap:1em}
.cp-toggle .tb{position:relative;display:flex;gap:.3em;padding-bottom:.8em;border-bottom:.1em solid var(--rule)}
.cp-toggle .tb span{display:grid;place-items:center;width:2.4em;height:2.4em;border-radius:.6em;font-family:Georgia,"Times New Roman",serif;font-size:1em;color:var(--ink-2)}
.cp-toggle .b1{font-weight:700;animation:tg-b 5s infinite}
.cp-toggle .b2{font-style:italic;animation:tg-i 5s infinite}
.cp-toggle .b3{text-decoration:underline}
.cp-toggle .tx{font-size:1.15em;line-height:1.4}
.cp-toggle .tx>span{display:inline-block;animation:tg-s 5s infinite}
.cp-toggle .tx b{font-weight:400;animation:tg-w 5s infinite}
.cp-toggle .ar{display:flex;align-items:center;font-family:var(--f-mono);font-size:.68em;color:var(--ink-3)}
.cp-toggle .ar>span{display:inline-grid}
.cp-toggle .ar i{grid-area:1/1}
.cp-toggle .ar i{font-style:normal;color:var(--accent)}
.cp-toggle .ar .x1{animation:tg-x1 5s infinite}.cp-toggle .ar .x2{opacity:0;animation:tg-x2 5s infinite}
.cp-toggle .tap{animation-duration:5s}
.cp-toggle .t1{left:1.2em;top:1.2em;animation-delay:-1.4s}
.cp-toggle .t2{left:3.9em;top:1.2em;animation-delay:-.15s}
.cp-toggle .t3{left:1.2em;top:1.2em;animation-delay:-3.7s}
@keyframes tg-b{0%,20%{background:transparent;color:var(--ink-2)}22%,74%{background:var(--accent-soft);color:var(--accent)}76%,100%{background:transparent;color:var(--ink-2)}}
@keyframes tg-i{0%,45%{background:transparent;color:var(--ink-2)}47%,94%{background:var(--accent-soft);color:var(--accent)}97%,100%{background:transparent;color:var(--ink-2)}}
@keyframes tg-w{0%,20%{font-weight:400}22%,74%{font-weight:700}76%,100%{font-weight:400}}
@keyframes tg-s{0%,45%{transform:none}48%,94%{transform:skewX(-11deg)}97%,100%{transform:none}}
@keyframes tg-x1{0%,20%{opacity:1}22%,74%{opacity:0}76%,100%{opacity:1}}
@keyframes tg-x2{0%,20%{opacity:0}22%,74%{opacity:1}76%,100%{opacity:0}}

@property --tk{syntax:'<number>';inherits:true;initial-value:0}
.cp-tgrp .pan{width:17em;padding:1.2em;display:flex;flex-direction:column;gap:1.1em;animation:tk-k 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-tgrp .seg{position:relative;display:grid;grid-template-columns:repeat(3,1fr);width:9.6em;padding:.25em;border-radius:.75em;background:var(--weak)}
.cp-tgrp .pill{position:absolute;top:.25em;bottom:.25em;left:.25em;width:calc((100% - .5em) / 3);border-radius:.55em;background:var(--ui);box-shadow:0 .1em .35em rgba(0,0,0,.14);transform:translateX(calc(var(--tk) * 100%))}
.cp-tgrp .seg span{position:relative;display:grid;place-items:center;height:2.1em}
.cp-tgrp .seg svg{width:1.3em;height:1.3em}
.cp-tgrp .tx{display:flex;flex-direction:column;gap:.55em;width:14.6em}
.cp-tgrp .tx .ln{width:var(--w);transform:translateX(calc((14.6em - var(--w)) * var(--tk) / 2))}
.cp-tgrp .tx .ln.h{background:var(--ink)}
.cp-tgrp .tap{animation-duration:5s}
.cp-tgrp .t1{left:50%;top:50%;animation-delay:-1.15s}
.cp-tgrp .t2{left:83%;top:50%;animation-delay:-4.65s}
@keyframes tk-k{0%,22%{--tk:0}30%,50%{--tk:1}60%,86%{--tk:2}96%,100%{--tk:0}}

.cp-coll .pan{width:16em;padding:1.1em 1.2em;display:flex;flex-direction:column}
.cp-coll .hd2{font-weight:700;font-size:.95em;margin-bottom:.4em}
.cp-coll .rw{gap:.55em;padding:.42em 0;font-size:.82em}
.cp-coll .rw svg{width:1.15em;height:1.15em;flex:none;fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.cp-coll .more{overflow:hidden;max-height:0;animation:co-h 5s cubic-bezier(.3,.7,.2,1) infinite}
.cp-coll .tgl{position:relative;display:flex;align-items:center;justify-content:center;gap:.4em;margin-top:.5em;padding:.55em;border-radius:.6em;background:var(--weak);font-size:.8em;font-weight:600;color:var(--weak-ink)}
.cp-coll .tgl .tl{position:relative;width:5.4em;height:1.3em}
.cp-coll .tgl .tl b{position:absolute;inset:0;text-align:center;font-weight:600}
.cp-coll .o1{animation:co-1 5s infinite}.cp-coll .o2{opacity:0;animation:co-2 5s infinite}
.cp-coll .tgl i{width:.45em;height:.45em;border:solid currentColor;border-width:0 .15em .15em 0;transform:translateY(-.15em) rotate(45deg);animation:co-r 5s cubic-bezier(.3,.7,.2,1) infinite}
.cp-coll .tap{animation-duration:5s}
.cp-coll .t1{left:50%;top:50%;animation-delay:-1.15s}
.cp-coll .t2{left:50%;top:50%;animation-delay:-3.9s}
@keyframes co-h{0%,25%{max-height:0}38%,70%{max-height:6.2em}82%,100%{max-height:0}}
@keyframes co-1{0%,26%{opacity:1}29%,71%{opacity:0}74%,100%{opacity:1}}
@keyframes co-2{0%,26%{opacity:0}29%,71%{opacity:1}74%,100%{opacity:0}}
@keyframes co-r{0%,25%{transform:translateY(-.15em) rotate(45deg)}33%,70%{transform:translateY(.15em) rotate(225deg)}78%,100%{transform:translateY(-.15em) rotate(45deg)}}

.cp-hover .pan{width:20em;padding:1.1em 1.2em;display:flex;gap:.7em;align-items:flex-start;transform:translateY(-4.6em)}
.cp-hover .pan .av{width:2.2em;height:2.2em;background:#FFD7C2}
.cp-hover .tx{font-size:.88em;line-height:1.55;color:var(--ink-2)}
.cp-hover .lkw{position:relative;display:inline-block}
.cp-hover .lk{color:var(--accent);font-weight:600;animation:hv-u 5s infinite}
.cp-hover .hc{position:absolute;left:-1.6em;top:calc(100% + .5em);width:14em;padding:1em;display:flex;flex-direction:column;gap:.5em;text-align:left;color:var(--ink);font-size:.95em;line-height:1.4;transform-origin:20% 0;z-index:3;animation:hv-c 5s cubic-bezier(.2,.8,.2,1) infinite}
.cp-hover .hc .rw{gap:.6em}
.cp-hover .hc .av{width:2.6em;height:2.6em;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.9) 0 20%,transparent 21%),radial-gradient(ellipse 44% 34% at 50% 100%,rgba(255,255,255,.9) 0 98%,transparent 100%),#FF9E7A}
.cp-hover .hc b{display:block;font-size:.95em}
.cp-hover .hc em{font-style:normal;font-size:.78em;color:var(--ink-3)}
.cp-hover .hc .hp{display:block;font-size:.8em;color:var(--ink-2)}
.cp-hover .hc .bt{font-size:.8em;padding:.45em}
.cp-hover .cur{left:50%;top:60%;animation:hv-m 5s cubic-bezier(.4,0,.2,1) infinite}
@keyframes hv-u{0%,16%{text-decoration:none}18%,78%{text-decoration:underline}80%,100%{text-decoration:none}}
@keyframes hv-c{0%,30%{opacity:0;transform:translateY(-.3em) scale(.96)}36%,78%{opacity:1;transform:none}84%,100%{opacity:0;transform:none}}
@keyframes hv-m{0%,4%{transform:translate(7em,7em)}16%,76%{transform:none}92%,100%{transform:translate(9em,3em)}}

.cp-menubar .win{position:relative;width:23em;height:14em;overflow:visible}
.cp-menubar .tb{display:flex;gap:.35em;padding:.55em .7em;border-bottom:.1em solid var(--rule)}
.cp-menubar .tb i{width:.6em;height:.6em;border-radius:50%;background:var(--line)}
.cp-menubar .mb{display:flex;padding:0 .4em;height:1.9em;align-items:center;border-bottom:.1em solid var(--rule)}
.cp-menubar .mb span{width:3em;text-align:center;font-size:.85em;line-height:1.7;border-radius:.4em}
.cp-menubar .mb .m1{animation:mb-a1 5s infinite}.cp-menubar .mb .m2{animation:mb-a2 5s infinite}
.cp-menubar .bd{padding:1em;display:flex;flex-direction:column;gap:.6em}
.cp-menubar .dd{position:absolute;top:3.55em;width:10.5em;padding:.35em;display:flex;flex-direction:column;font-size:.82em;z-index:3}
.cp-menubar .dd span{display:flex;justify-content:space-between;padding:.42em .55em;border-radius:.45em;white-space:nowrap}
.cp-menubar .dd em{font-style:normal;font-family:var(--f-mono);color:var(--ink-3);font-size:.9em}
.cp-menubar .dd hr{border:0;height:.1em;background:var(--rule);margin:.25em .3em}
.cp-menubar .d1{left:.5em;animation:mb-d1 5s infinite}
.cp-menubar .d2{left:3.4em;animation:mb-d2 5s infinite}
.cp-menubar .d2 .hi{animation:mb-h 5s infinite}
.cp-menubar .cur{left:0;top:0;animation:mb-c 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-menubar .tap{left:1.9em;top:2.7em;animation-duration:5s;animation-delay:-1.8s}
@keyframes mb-a1{0%,12%{background:transparent}14%,47%{background:var(--weak)}49%,100%{background:transparent}}
@keyframes mb-a2{0%,48%{background:transparent}50%,88%{background:var(--weak)}92%,100%{background:transparent}}
@keyframes mb-d1{0%,12%{opacity:0;transform:translateY(-.3em)}15%,47%{opacity:1;transform:none}49%,100%{opacity:0;transform:none}}
@keyframes mb-d2{0%,48%{opacity:0}50%,88%{opacity:1}92%,100%{opacity:0}}
@keyframes mb-h{0%,68%{background:transparent;color:var(--ink)}72%,88%{background:var(--accent);color:var(--accent-ink)}92%,100%{background:transparent;color:var(--ink)}}
@keyframes mb-c{0%{transform:translate(15em,11em)}10%,42%{transform:translate(1.6em,2.5em)}50%,60%{transform:translate(4.6em,2.5em)}70%,88%{transform:translate(5.4em,6.3em)}100%{transform:translate(15em,11em)}}

.cp-navmenu .site{position:relative;width:24em;height:15em;overflow:visible}
.cp-navmenu .hd3{display:flex;align-items:center;height:2.8em;padding:0 .9em;border-bottom:.1em solid var(--rule)}
.cp-navmenu .lg{width:1.4em;height:1.4em;border-radius:.4em;background:var(--accent);margin-right:.7em}
.cp-navmenu .nv{display:flex;font-size:.78em}
.cp-navmenu .nv span{display:flex;align-items:center;justify-content:center;gap:.3em;padding:.35em 0;border-radius:.45em;white-space:nowrap}
.cp-navmenu .nv .a{width:4.4em}.cp-navmenu .nv .b{width:3.4em}.cp-navmenu .nv .c{width:5.8em}
.cp-navmenu .nv i{width:.4em;height:.4em;border:solid var(--ink-3);border-width:0 .14em .14em 0;transform:translateY(-.1em) rotate(45deg)}
.cp-navmenu .nv .a{animation:nm-a 5s infinite}.cp-navmenu .nv .c{animation:nm-b 5s infinite}
.cp-navmenu .hd3 .bt{margin-left:auto;font-size:.72em;padding:.4em .8em}
.cp-navmenu .pg{padding:1.2em;display:flex;flex-direction:column;gap:.6em}
.cp-navmenu .vp{position:absolute;top:3.1em;overflow:hidden;z-index:3;animation:nm-v 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-navmenu .p1,.cp-navmenu .p2{position:absolute;left:0;top:0;padding:.8em}
.cp-navmenu .p1{width:16em;display:grid;grid-template-columns:1fr 1fr;gap:.7em;animation:nm-1 5s infinite}
.cp-navmenu .p1 div{display:flex;gap:.45em;align-items:flex-start}
.cp-navmenu .p1 i{flex:none;width:1.5em;height:1.5em;border-radius:.45em;background:var(--accent-soft)}
.cp-navmenu .p1 b{display:block;font-size:.7em}
.cp-navmenu .p1 em{display:block;font-style:normal;font-size:.58em;color:var(--ink-3);line-height:1.35}
.cp-navmenu .p2{width:10em;display:flex;flex-direction:column;gap:.55em;opacity:0;animation:nm-2 5s infinite}
.cp-navmenu .p2 span{display:flex;align-items:center;gap:.45em;font-size:.68em;font-weight:600}
.cp-navmenu .p2 span::before{content:"";width:1.6em;height:1.6em;border-radius:50%;background:var(--weak);flex:none}
.cp-navmenu .cur{left:0;top:0;animation:nm-c 5s cubic-bezier(.4,0,.2,1) infinite}
@keyframes nm-a{0%,14%{background:transparent}18%,48%{background:var(--weak)}52%,100%{background:transparent}}
@keyframes nm-b{0%,50%{background:transparent}54%,82%{background:var(--weak)}86%,100%{background:transparent}}
@keyframes nm-v{0%,14%{opacity:0;left:1.8em;width:16em;height:7.4em;transform:translateY(-.3em)}20%,46%{opacity:1;left:1.8em;width:16em;height:7.4em;transform:none}56%,82%{opacity:1;left:8.4em;width:10em;height:6.2em;transform:none}88%,100%{opacity:0;left:8.4em;width:10em;height:6.2em;transform:none}}
@keyframes nm-1{0%,46%{opacity:1}52%,100%{opacity:0}}
@keyframes nm-2{0%,48%{opacity:0}55%,88%{opacity:1}94%,100%{opacity:0}}
@keyframes nm-c{0%{transform:translate(20em,12em)}12%,44%{transform:translate(3.4em,1.5em)}54%,80%{transform:translate(9.9em,1.5em)}94%,100%{transform:translate(21em,12em)}}

.cp-scroll .pan{position:relative;width:14em;height:16.5em;overflow:hidden}
.cp-scroll .hd2{position:relative;z-index:2;height:2.7em;display:flex;align-items:center;padding:0 1em;font-weight:700;font-size:.95em;background:var(--ui)}
.cp-scroll .hd2::after{content:"";position:absolute;left:0;right:0;top:100%;height:.8em;background:linear-gradient(rgba(0,27,55,.14),transparent);opacity:0;animation:sc-s 5s infinite}
.cp-scroll .vw{position:absolute;left:0;right:0;top:2.7em;bottom:0;overflow:hidden}
.cp-scroll .ct{padding:.2em 1em;display:flex;flex-direction:column;animation:sc-y 5s cubic-bezier(.3,.7,.2,1) infinite}
.cp-scroll .ct .rw{gap:.6em;padding:.5em 0;border-bottom:.1em solid var(--rule)}
.cp-scroll .ct .rw>div{flex:1;display:flex;flex-direction:column;gap:.35em}
.cp-scroll .ct .av{width:1.8em;height:1.8em}
.cp-scroll .ct .ln{height:.5em}
.cp-scroll .th{position:absolute;right:.25em;top:.3em;width:.38em;height:7em;border-radius:1em;background:var(--ink-3);opacity:0;animation:sc-t 5s cubic-bezier(.3,.7,.2,1) infinite}
@keyframes sc-y{0%,14%{transform:none}38%,62%{transform:translateY(-9.5em)}84%,100%{transform:none}}
@keyframes sc-t{0%,12%{opacity:0;transform:none}16%{opacity:.55;transform:none}38%{opacity:.55;transform:translateY(6.3em)}46%,58%{opacity:0;transform:translateY(6.3em)}64%{opacity:.55;transform:translateY(6.3em)}84%{opacity:.55;transform:none}92%,100%{opacity:0;transform:none}}
@keyframes sc-s{0%,16%{opacity:0}26%,72%{opacity:1}82%,100%{opacity:0}}

.cp-resize .win{display:flex;width:24em;height:13.5em;overflow:hidden}
.cp-resize .lp{flex:none;width:8em;padding:1em .9em;display:flex;flex-direction:column;gap:.5em;background:var(--stage);animation:rs-w 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-resize .lp span{display:flex;align-items:center;gap:.45em;min-width:0}
.cp-resize .lp span i{flex:none;width:1.1em;height:1.1em;border-radius:.3em;background:var(--line)}
.cp-resize .lp span .ln{flex:1;min-width:0}
.cp-resize .lp span:first-child{padding:.3em;margin:-.3em;border-radius:.45em;background:var(--accent-soft)}
.cp-resize .lp span:first-child i{background:var(--accent)}
.cp-resize .hd{position:relative;flex:none;width:.12em;background:var(--rule);animation:rs-h 5s infinite}
.cp-resize .hd b{position:absolute;left:50%;top:50%;width:.9em;height:2.2em;margin:-1.1em 0 0 -.45em;border-radius:.45em;border:.1em solid var(--line);background:var(--ui) radial-gradient(circle,var(--ink-3) 0 .08em,transparent .09em) 0 0/.45em .45em;z-index:2}
.cp-resize .rp{flex:1;min-width:0;padding:1em;display:flex;flex-direction:column;gap:.6em}
.cp-resize .rp .im{height:4.2em}
.cp-resize .rz{position:absolute;left:-.9em;top:52%;width:1.8em;height:1.8em;z-index:4;animation:rs-c 5s infinite}
.cp-resize .rz svg{width:100%;height:100%;fill:none;stroke:var(--ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 .08em var(--ui)) drop-shadow(0 0 .08em var(--ui))}
@keyframes rs-w{0%,15%{width:8em}40%,52%{width:13em}76%,88%{width:5.4em}100%{width:8em}}
@keyframes rs-h{0%,10%{background:var(--rule)}14%,90%{background:var(--accent)}96%,100%{background:var(--rule)}}
@keyframes rs-c{0%,8%{opacity:0}12%,92%{opacity:1}97%,100%{opacity:0}}
`,
  items: [
    {
      id: 'cp-avatar', k: '아바타', e: 'Avatar',
      d: '사람이나 팀을 작은 원형 이미지로 보여줘요. 사진을 불러오는 동안엔 자리만 잡아 두고, 사진이 없으면 이니셜로 대신해요.',
      u: '댓글 작성자, 담당자, 참여자처럼 "누구"를 빠르게 알아보게 할 때 써요. 여러 명이면 겹쳐 놓고 "+3"으로 나머지 수만 보여 주세요.',
      de: 'A small round image that stands for a person or team. While the photo loads it holds the space, and without a photo it falls back to initials.',
      ue: 'Use it to show who wrote a comment, who owns a task or who is in a room. For a group, overlap them and summarise the rest as “+3”.',
      html: `<div class="two"><div class="col"><div class="avs"><span class="pf" style="--i:0;--c:#FF9E7A"></span><span class="in1" style="--i:1">김</span><span class="pf" style="--i:2;--c:#6FB6FF"></span><span class="in2" style="--i:3">이</span><span class="mo" style="--i:4">+3</span></div><span class="cap">겹친 아바타 그룹</span></div><div class="col"><div class="one"><span class="sk"></span><span class="pf"></span><span class="ini">민</span><i class="dot"></i></div><div class="lbs"><span class="cap l1">불러오는 중</span><span class="cap l2">사진</span><span class="cap l3">사진이 없으면 이니셜</span></div></div></div>`
    },
    {
      id: 'cp-aspect', k: '비율 고정', e: 'Aspect ratio',
      d: '화면 폭이 바뀌어도 가로세로 비율(16:9, 1:1 등)을 지켜서 영상이나 사진이 찌그러지지 않게 해요.',
      u: '썸네일, 영상 플레이어, 지도, 상품 이미지처럼 비율이 중요한 영역에 걸어 두세요. 이미지가 늦게 떠도 자리가 미리 잡혀 화면이 덜컹거리지 않아요.',
      de: 'Keeps a box at a fixed width-to-height ratio such as 16:9 or 1:1 as the screen resizes, so photos and video never get squashed.',
      ue: 'Apply it to thumbnails, video players, maps and product images. Because the space is reserved up front, the layout does not jump when the image arrives late.',
      html: `<div class="two"><div class="col a"><div class="fh"><div class="fr"><div class="pic"></div></div></div><span class="cap">높이 고정 · 찌그러짐</span></div><div class="col b"><div class="fh"><div class="fr"><div class="pic"></div><span class="tag">16:9</span></div></div><span class="cap">비율 고정 · 그대로</span></div></div>`
    },
    {
      id: 'cp-sep', k: '구분선', e: 'Separator',
      d: '내용 사이를 가로나 세로로 얇게 나누는 선이에요. 가운데에 "또는" 같은 글자를 넣어 선택지를 가르기도 해요.',
      u: '간격만으로 묶음이 잘 안 보일 때 보조로 써요. 선이 많아지면 화면이 표처럼 딱딱해지니, 먼저 여백으로 나눠 보고 부족할 때만 더하세요.',
      de: 'A thin horizontal or vertical line that splits content. A label such as “or” in the middle can divide two alternatives.',
      ue: 'Use it when spacing alone does not separate groups clearly. Too many lines make a screen feel like a spreadsheet, so try whitespace first.',
      html: `<div class="pan box"><span class="bt">간편 로그인</span><div class="or"><i></i><span>또는</span><i></i></div><span class="bt g">이메일로 계속하기</span><div class="ft"><span>이용약관</span><i></i><span>개인정보처리방침</span><i></i><span>고객센터</span></div></div>`
    },
    {
      id: 'cp-kbd', k: '키 표시', e: 'Kbd',
      d: '눌러야 할 키보드 키를 실제 키캡처럼 그려서 보여줘요. 글로 "커맨드 케이"라고 쓰는 것보다 한눈에 알아봐요.',
      u: '단축키 안내, 메뉴 항목 옆 단축키, 도움말 문서에 써요. 운영체제에 따라 ⌘와 Ctrl처럼 표기를 바꿔 보여 주세요.',
      de: 'Draws a keyboard key the way it looks on a real keycap. People recognise it faster than the words “Command K”.',
      ue: 'Use it in shortcut hints, next to menu items and in help pages. Swap the symbols per platform, for example ⌘ on Mac and Ctrl on Windows.',
      html: `<div class="col"><div class="ln2"><kbd>⌘</kbd><kbd>K</kbd><span>로 어디서든 검색</span></div><div class="pal box"><div class="sr2"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>무엇을 찾을까요?</div><div class="it on"><span>새 연습 시작</span><kbd>N</kbd></div><div class="it"><span>지난 기록 보기</span><kbd>R</kbd></div></div></div>`
    },
    {
      id: 'cp-textarea', k: '여러 줄 입력', e: 'Textarea',
      d: '여러 줄의 긴 글을 받는 입력란이에요. 쓰는 만큼 높이가 늘어나고, 글자 수 제한이 있으면 아래에 남은 양을 보여줘요.',
      u: '자기소개, 문의 내용, 리뷰처럼 한 줄로 끝나지 않는 답을 받을 때 써요. 처음 높이는 예상 분량에 맞추고, 제한이 있다면 숫자로 미리 알려 주세요.',
      de: 'An input for longer, multi-line text. It grows as you type, and when there is a limit it shows how much is used.',
      ue: 'Use it for bios, support requests and reviews. Size the empty box to the expected length and show the limit as a number before people hit it.',
      html: `<div class="pan box"><span class="lb">자기소개</span><div class="ta"><span class="ph2">어떤 경험을 했는지 알려 주세요</span><span class="l l1">3년 차 프로덕트 디자이너예요.</span><span class="l l2">송금 흐름을 다시 설계해서</span><span class="l l3">완료율을 18% 높였어요.</span></div><span class="cnt"></span></div>`
    },
    {
      id: 'cp-nselect', k: '기본 선택 상자', e: 'Native select',
      d: '브라우저와 운영체제가 기본으로 주는 선택 상자예요. 휴대폰에서는 휠이나 목록 같은 OS 선택기가 열려요.',
      u: '선택지가 단순한 글자 목록이면 직접 만든 드롭다운보다 이게 나아요. 접근성과 키보드 조작, 모바일 화면이 공짜로 따라와요. 검색이나 아이콘이 필요할 때만 커스텀을 쓰세요.',
      de: 'The select box the browser and operating system provide. On a phone it opens the OS picker, such as a wheel or a list.',
      ue: 'For a plain list of text options it beats a custom dropdown: accessibility, keyboard support and the mobile picker come for free. Go custom only when you need search or icons.',
      html: `<div class="col"><div class="ph s"><div class="scr"><span class="lb">지원 직무</span><div class="fd"><span class="v1">선택해 주세요</span><span class="v2">개발</span></div><span class="ln" style="width:80%"></span><span class="ln" style="width:55%"></span></div><div class="dm"></div><div class="wh"><div class="tb">완료</div><div class="wl"><i class="band"></i><div class="opts"><span>디자인</span><span>개발</span><span>기획</span><span>데이터</span><span>마케팅</span></div></div></div><i class="tap t1"></i><i class="tap t2"></i></div><span class="cap">OS 기본 선택기가 열려요</span></div>`
    },
    {
      id: 'cp-inputgrp', k: '입력 그룹', e: 'Input group',
      d: '입력란 앞뒤에 아이콘, 단위, 버튼을 붙여 하나의 덩어리로 묶어요. 포커스를 받으면 묶음 전체에 테두리가 생겨요.',
      u: '"https://" 같은 고정 앞부분, "원" 같은 단위, 복사·검색 버튼처럼 입력과 떼어 놓을 수 없는 것을 붙일 때 써요. 고정된 부분은 사용자가 지우거나 다시 입력하지 않게 해 주세요.',
      de: 'Attaches icons, units or buttons to the front or back of an input so they read as one control. On focus, the whole group gets the ring.',
      ue: 'Use it for a fixed prefix such as “https://”, a unit such as “KRW”, or a copy or search button. People should never have to type or delete the fixed part.',
      html: `<div class="pan box"><div class="ig"><span class="ad">https://</span><span class="in">my-portfolio.site</span><span class="bb"><span class="c1">복사</span><span class="c2">복사됨 ✓</span></span></div><div class="ig g2"><span class="ad p"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></span><span class="in">디자인 시스템</span></div><div class="ig"><span class="in">50,000</span><span class="ad unit">원</span></div></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span><i class="tap"></i>`
    },
    {
      id: 'cp-btngrp', k: '버튼 그룹', e: 'Button group',
      d: '관련 있는 버튼 여러 개를 테두리를 공유하게 붙여 하나처럼 보여줘요. 주 버튼에 화살표를 붙인 분할 버튼도 여기에 속해요.',
      u: '이전·다음처럼 짝을 이루는 동작, 저장과 "다른 이름으로 저장"처럼 기본 동작과 변형을 묶을 때 써요. 서로 관계없는 버튼을 붙이면 오히려 헷갈려요.',
      de: 'Joins related buttons so they share borders and read as one unit. A split button, a main action with an attached arrow, belongs here too.',
      ue: 'Use it for paired actions such as previous and next, or a default action with its variants such as Save and Save as. Gluing unrelated buttons together only confuses.',
      html: `<div class="col"><div class="w"><div class="bg"><span>‹ 이전</span><span class="num"><b class="n1">1 / 3</b><b class="n2">2 / 3</b></span><span>다음 ›</span></div><i class="tap t1"></i></div><div class="w"><div class="sp"><span>저장하기</span><span></span></div><div class="mn box"><span>다른 이름으로 저장</span><span>템플릿으로 저장</span></div><i class="tap t2"></i></div></div>`
    },
    {
      id: 'cp-toggle', k: '토글 버튼', e: 'Toggle',
      d: '누를 때마다 켜짐과 꺼짐을 오가며 눌린 상태를 유지하는 버튼이에요. 글꼴 굵게·기울임 버튼이 대표적이에요.',
      u: '스위치는 설정을 바꾸고, 토글 버튼은 지금 보고 있는 내용의 서식이나 보기 방식을 바꿔요. 눌린 상태가 색으로 확실히 보여야 하고, 화면 낭독기에는 aria-pressed로 알려 주세요.',
      de: 'A button that flips between on and off each time you press it and stays pressed. Bold and italic buttons in an editor are the classic case.',
      ue: 'A switch changes a setting; a toggle button changes the formatting or view of what you are looking at. Make the pressed state obvious and expose it to screen readers with aria-pressed.',
      html: `<div class="pan box"><div class="tb"><span class="b1">B</span><span class="b2">I</span><span class="b3">U</span><i class="tap t1"></i><i class="tap t2"></i><i class="tap t3"></i></div><div class="tx"><span><b>토글은 눌린 상태를 기억해요</b></span></div><div class="ar">aria-pressed=<span><i class="x1">"false"</i><i class="x2">"true"</i></span></div></div>`
    },
    {
      id: 'cp-tgrp', k: '토글 그룹', e: 'Toggle group',
      d: '토글 버튼 여러 개를 한 줄로 묶어 그중 하나(또는 여러 개)를 고르게 해요. 정렬 방식, 보기 방식 선택에 자주 보여요.',
      u: '선택지가 2~5개이고 아이콘만으로 뜻이 통할 때 좋아요. 아이콘만 쓴다면 툴팁이나 접근성 라벨로 이름을 꼭 붙여 주세요.',
      de: 'Lines up several toggle buttons so you can pick one, or several, of them. Common for text alignment and view modes.',
      ue: 'Works best with two to five options whose icons speak for themselves. If you use icons alone, give each one a name through a tooltip or an accessible label.',
      html: `<div class="pan box"><div class="seg"><i class="pill"></i><span><svg class="ic" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h13"/></svg></span><span><svg class="ic" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M5.5 18h13"/></svg></span><span><svg class="ic" viewBox="0 0 24 24"><path d="M4 6h16M10 12h10M7 18h13"/></svg></span><i class="tap t1"></i><i class="tap t2"></i></div><div class="tx"><span class="ln h" style="--w:8em"></span><span class="ln" style="--w:14.6em"></span><span class="ln" style="--w:11em"></span><span class="ln" style="--w:12.8em"></span><span class="ln" style="--w:6.5em"></span></div></div>`
    },
    {
      id: 'cp-coll', k: '접기·펼치기', e: 'Collapsible',
      d: '한 영역의 일부만 보여 주고 "더 보기"를 누르면 나머지를 펼쳐요. 아코디언과 달리 한 덩어리만 접었다 폈다 해요.',
      u: '혜택 목록, 상품 설명, 긴 약관 요약처럼 처음엔 핵심만 보여도 되는 곳에 써요. 접힌 양을 "3개 더 보기"처럼 숫자로 알려 주면 눌러 볼지 판단하기 쉬워요.',
      de: 'Shows part of a block and reveals the rest when you press “Show more”. Unlike an accordion, it opens and closes a single region.',
      ue: 'Use it for perk lists, product details or long summaries where the essentials are enough at first. Saying how much is hidden, as in “3 more”, helps people decide whether to open it.',
      html: `<div class="pan box"><span class="hd2">포함된 혜택</span><span class="rw"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>모의 면접 무제한</span><span class="rw"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>답변 분석 리포트</span><div class="more"><span class="rw"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>직무별 질문 2,000개</span><span class="rw"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>현직자 피드백 1회</span><span class="rw"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>이력서 첨삭 템플릿</span></div><div class="tgl"><span class="tl"><b class="o1">3개 더 보기</b><b class="o2">접기</b></span><i></i><i class="tap t1"></i><i class="tap t2"></i></div></div>`
    },
    {
      id: 'cp-hover', k: '호버 카드', e: 'Hover card',
      d: '링크나 이름에 마우스를 잠시 올리면 미리보기 카드가 떠요. 페이지를 옮기지 않고 정보를 살짝 확인할 수 있어요.',
      u: '사용자 프로필, 링크 미리보기, 용어 설명처럼 "누르기 전에 궁금한 것"에 써요. 마우스가 스쳐 지나갈 때 뜨지 않도록 약간 늦게 띄우고, 터치 화면에서는 탭으로 대신 열어야 해요.',
      de: 'Rest the pointer on a link or a name and a preview card appears, so you can check details without leaving the page.',
      ue: 'Use it for profiles, link previews and definitions, the things people wonder about before clicking. Add a short delay so it does not flash when the pointer passes by, and provide a tap alternative on touch screens.',
      html: `<div class="pan box"><span class="av"></span><div class="tx"><span class="lkw"><span class="lk">@minji.design</span><span class="hc box"><span class="rw"><span class="av"></span><span><b>김민지</b><em>@minji.design</em></span></span><span class="hp">프로덕트 디자이너 · 팔로워 1.2천</span><span class="bt">팔로우</span></span><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></span> 님이 회원님의 포트폴리오에 댓글을 남겼어요.</div></div>`
    },
    {
      id: 'cp-menubar', k: '메뉴 바', e: 'Menubar',
      d: '데스크톱 앱 위쪽에 "파일·편집·보기"처럼 늘어선 메뉴예요. 하나를 열면 옆 메뉴로 마우스만 옮겨도 바로 바뀌어요.',
      u: '기능이 많은 편집기, 관리 도구 같은 데스크톱 화면에 써요. 각 항목 옆에 단축키를 같이 적어 두면 익숙한 사용자가 점점 메뉴 없이 쓰게 돼요.',
      de: 'The row of menus such as File, Edit and View along the top of a desktop app. Once one is open, moving the pointer to its neighbour switches menus without another click.',
      ue: 'Use it in feature-rich desktop tools such as editors and admin consoles. Listing the shortcut next to each item gradually teaches regulars to skip the menu.',
      html: `<div class="win box"><div class="tb"><i></i><i></i><i></i></div><div class="mb"><span class="m1">파일</span><span class="m2">편집</span><span>보기</span><span>도움말</span></div><div class="bd"><span class="ln h" style="width:40%"></span><span class="ln" style="width:90%"></span><span class="ln" style="width:75%"></span><span class="ln" style="width:82%"></span></div><div class="dd d1 box"><span>새 문서<em>⌘N</em></span><span>열기…<em>⌘O</em></span><hr><span>내보내기<em>›</em></span></div><div class="dd d2 box"><span>실행 취소<em>⌘Z</em></span><span class="hi">다시 실행<em>⇧⌘Z</em></span><span>복사<em>⌘C</em></span></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span><i class="tap"></i></div>`
    },
    {
      id: 'cp-navmenu', k: '내비게이션 메뉴', e: 'Navigation menu',
      d: '웹사이트 상단 메뉴에 마우스를 올리면 넓은 패널이 펼쳐져 하위 링크를 설명과 함께 보여줘요. 메가 메뉴라고도 불러요.',
      u: '하위 페이지가 많은 회사·서비스 사이트에 써요. 메뉴를 옮겨 다닐 때 패널이 닫혔다 열리지 않고 크기만 바뀌며 이어지게 하면 훨씬 부드러워요.',
      de: 'Hover a top-level link on a website and a wide panel opens with sub-pages and short descriptions. Also known as a mega menu.',
      ue: 'Use it on marketing or product sites with many sub-pages. When moving between items, let the panel morph in size instead of closing and reopening.',
      html: `<div class="site box"><div class="hd3"><i class="lg"></i><div class="nv"><span class="a">제품<i></i></span><span class="b">요금</span><span class="c">고객 사례<i></i></span></div><span class="bt">시작하기</span></div><div class="pg"><span class="ln h" style="width:55%"></span><span class="ln" style="width:85%"></span><span class="ln" style="width:70%"></span><span class="im" style="height:3.6em"></span></div><div class="vp box"><div class="p1"><div><i></i><span><b>모의 면접</b><em>AI 면접관과 실전처럼</em></span></div><div><i></i><span><b>답변 분석</b><em>말 속도와 표현 점검</em></span></div><div><i></i><span><b>질문 은행</b><em>직무별 기출 2,000개</em></span></div><div><i></i><span><b>팀 플랜</b><em>부트캠프·학교용</em></span></div></div><div class="p2"><span>디자인 부트캠프</span><span>대학 취업센터</span><span>스타트업 채용팀</span></div></div><span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span></div>`
    },
    {
      id: 'cp-scroll', k: '스크롤 영역', e: 'Scroll area',
      d: '정해진 크기 안에서만 내용이 스크롤되는 영역이에요. 스크롤바를 얇게 그리고, 스크롤할 때만 잠깐 보여줘요.',
      u: '사이드바, 드롭다운 목록, 채팅창처럼 화면 일부만 따로 움직여야 할 때 써요. 위에 그림자를 깔아 "아래로 더 있다, 위로 지나왔다"를 알려 주세요. 스크롤 안에 스크롤을 겹치는 건 피하세요.',
      de: 'A fixed-size region whose content scrolls on its own. The scrollbar is drawn thin and only shows briefly while scrolling.',
      ue: 'Use it for sidebars, dropdown lists and chat panes that scroll independently. An edge shadow tells people there is more above or below. Avoid nesting one scroll area inside another.',
      html: `<div class="pan box"><div class="hd2">알림</div><div class="vw"><div class="ct">${'<span class="rw"><span class="av"></span><div><span class="ln" style="width:85%"></span><span class="ln" style="width:55%"></span></div></span>'.repeat(9)}</div></div><i class="th"></i></div>`
    },
    {
      id: 'cp-resize', k: '크기 조절 패널', e: 'Resizable',
      d: '두 영역 사이의 손잡이를 끌어 너비를 직접 나눠요. 목록은 좁게, 본문은 넓게처럼 사용자가 원하는 배분으로 바꿀 수 있어요.',
      u: '메일, 코드 편집기, 관리 화면처럼 오래 쓰는 데스크톱 도구에 어울려요. 최소·최대 폭을 정해 한쪽이 사라지지 않게 하고, 바꾼 크기는 다음 방문 때도 기억해 주세요.',
      de: 'Drag the handle between two panes to split the width yourself, for example a narrow list and a wide reading pane.',
      ue: 'Fits desktop tools people use for hours, such as mail, code editors and dashboards. Set minimum and maximum widths so a pane never vanishes, and remember the size for next time.',
      html: `<div class="win box"><div class="lp"><span><i></i><span class="ln" style="width:70%"></span></span><span><i></i><span class="ln" style="width:55%"></span></span><span><i></i><span class="ln" style="width:80%"></span></span><span><i></i><span class="ln" style="width:45%"></span></span><span><i></i><span class="ln" style="width:65%"></span></span></div><div class="hd"><b></b><span class="rz"><svg viewBox="0 0 24 24"><path d="M7 7l-5 5 5 5M17 7l5 5-5 5M2 12h20"/></svg></span></div><div class="rp"><span class="ln h" style="width:60%"></span><span class="im"></span><span class="ln" style="width:95%"></span><span class="ln" style="width:80%"></span><span class="ln" style="width:88%"></span></div></div>`
    }
  ]
});
