(() => {
const s = window.UX.find(x => x.id === 's-comp');
const CUR = `<span class="cur"><svg viewBox="0 0 18 24"><path d="M2 2v17l4.6-4.3 3 6.8 3-1.3-3-6.7H16z"/></svg></span>`;
const CK = `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
s.css += `
.cp-sheet .pg{position:relative;width:24em;height:14.5em;overflow:hidden}
.cp-sheet .hd3{display:flex;align-items:center;justify-content:space-between;padding:.9em 1em .7em}
.cp-sheet .hd3 b{font-size:.95em}
.cp-sheet .fb{display:flex;align-items:center;gap:.35em;padding:.35em .75em;border:.12em solid var(--frame);border-radius:.6em;font-size:.75em;font-weight:600;color:var(--ink-2)}
.cp-sheet .fb svg{width:1.1em;height:1.1em}
.cp-sheet .tr{display:grid;grid-template-columns:5em 1fr 4em;gap:.8em;align-items:center;padding:.62em 1em;border-top:.1em solid var(--rule)}
.cp-sheet .tr .ln{height:.55em}
.cp-sheet .dm{animation:sh-d 5s infinite}
.cp-sheet .sht{position:absolute;right:0;top:0;bottom:0;width:10.6em;padding:1em;display:flex;flex-direction:column;gap:.7em;background:var(--ui);border-left:.1em solid var(--rule);box-shadow:-.6em 0 1.6em -.6em rgba(0,0,0,.25);z-index:3;animation:sh-s 5s cubic-bezier(.2,.8,.2,1) infinite}
.cp-sheet .sht .t{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:.9em}
.cp-sheet .sht .t i{position:relative;width:.9em;height:.9em}
.cp-sheet .sht .t i::before,.cp-sheet .sht .t i::after{content:"";position:absolute;left:50%;top:0;width:.14em;height:100%;background:var(--ink-3);transform:rotate(45deg)}
.cp-sheet .sht .t i::after{transform:rotate(-45deg)}
.cp-sheet .sht .rw{gap:.5em;font-size:.78em}
.cp-sheet .sht .x{width:1.5em;height:1.5em;border-radius:.4em;border-width:.14em}
.cp-sheet .sht .x::after{left:.36em;top:.06em;width:.38em;height:.75em;border-width:0 .18em .18em 0}
.cp-sheet .x2{animation:shx-k 5s infinite}
.cp-sheet .sht .bt{margin-top:auto;font-size:.8em;padding:.6em}
.cp-sheet .sht .sm{font-size:.68em;font-weight:600;color:var(--ink-3);margin-top:.2em}
.cp-sheet .tap{animation-duration:5s}
.cp-sheet .t1{left:21.6em;top:1.45em;animation-delay:-1.5s}
.cp-sheet .t2{left:1.7em;top:5.25em;animation-delay:-.2s}
.cp-sheet .t3{left:50%;top:91%;animation-delay:-3.9s}
@keyframes sh-d{0%,19%{opacity:0}28%,70%{opacity:.6}80%,100%{opacity:0}}
@keyframes sh-s{0%,19%{transform:translateX(105%)}30%,70%{transform:none}82%,100%{transform:translateX(105%)}}
@keyframes shx-k{0%,43%{background:transparent;border-color:var(--ink-3);color:transparent}45%,90%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}95%,100%{background:transparent;border-color:var(--ink-3);color:transparent}}

.cp-cal .pan{width:16em;padding:1em 1em .9em;display:flex;flex-direction:column;gap:.5em}
.cp-cal .hd3{display:flex;align-items:center;justify-content:space-between;font-weight:700;font-size:.9em;padding:0 .3em}
.cp-cal .hd3 span{display:flex;gap:.9em;color:var(--ink-3);font-weight:500}
.cp-cal .wk,.cp-cal .gd{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}
.cp-cal .wk{font-size:.62em;color:var(--ink-3)}
.cp-cal .gd{position:relative;row-gap:.15em}
.cp-cal .gd span{position:relative;display:grid;place-items:center;height:1.95em;font-size:.72em;font-variant-numeric:tabular-nums}
.cp-cal .gd span b{position:relative;z-index:1;display:grid;place-items:center;width:2.4em;height:2.4em;border-radius:50%;font-weight:500}
.cp-cal .gd .su{color:var(--danger)}
.cp-cal .gd .td b::after{content:"";position:absolute;bottom:.25em;left:50%;width:.3em;height:.3em;margin-left:-.15em;border-radius:50%;background:var(--accent)}
.cp-cal .gd .s b{animation:cl-s 5s infinite}
.cp-cal .gd .e b{animation:cl-e 5s infinite}
.cp-cal .gd .m::before,.cp-cal .gd .s::before,.cp-cal .gd .e::before{content:"";position:absolute;top:50%;height:2.4em;margin-top:-1.2em;left:0;right:0;background:var(--accent-soft);opacity:0;animation:cl-m 5s infinite}
.cp-cal .gd .s::before{left:50%}.cp-cal .gd .e::before{right:50%}
.cp-cal .ft{position:relative;height:2.2em;border-top:.1em solid var(--rule)}
.cp-cal .ft span{position:absolute;inset:.5em 0 0;text-align:center;font-size:.75em;font-weight:600;white-space:nowrap}
.cp-cal .f1{color:var(--ink-3);animation:cl-1 5s infinite}.cp-cal .f2{opacity:0;animation:cl-2 5s infinite}.cp-cal .f3{opacity:0;color:var(--accent);animation:cl-3 5s infinite}
.cp-cal .tap{animation-duration:5s;width:2em;height:2em;margin:-1em 0 0 -1em}
.cp-cal .t1{left:35.7%;top:30%;animation-delay:-1.4s}
.cp-cal .t2{left:92.9%;top:30%;animation-delay:-4.9s}
@keyframes cl-s{0%,20%{background:transparent;color:inherit}22%,92%{background:var(--accent);color:var(--accent-ink)}96%,100%{background:transparent;color:inherit}}
@keyframes cl-e{0%,50%{background:transparent;color:inherit}52%,92%{background:var(--accent);color:var(--accent-ink)}96%,100%{background:transparent;color:inherit}}
@keyframes cl-m{0%,51%{opacity:0}56%,92%{opacity:1}96%,100%{opacity:0}}
@keyframes cl-1{0%,20%{opacity:1}22%,96%{opacity:0}98%,100%{opacity:1}}
@keyframes cl-2{0%,20%{opacity:0}22%,50%{opacity:1}52%,100%{opacity:0}}
@keyframes cl-3{0%,50%{opacity:0}52%,94%{opacity:1}97%,100%{opacity:0}}

.cp-dtable .pan{width:24em;padding:.4em 0 .2em;overflow:hidden}
.cp-dtable .tl{position:relative;height:2.6em}
.cp-dtable .tl>*{position:absolute;left:1em;right:1em;top:0;bottom:0;display:flex;align-items:center;gap:.8em;font-size:.82em}
.cp-dtable .tl .a{font-weight:700;animation:dt-a 5s infinite}
.cp-dtable .tl .b{opacity:0;animation:dt-b 5s infinite}
.cp-dtable .tl .b b{color:var(--accent)}
.cp-dtable .tl .b span{margin-left:auto;display:flex;gap:.4em}
.cp-dtable .tl .b em{font-style:normal;padding:.2em .6em;border-radius:.45em;background:var(--weak);color:var(--weak-ink);font-size:.9em;font-weight:600}
.cp-dtable .tl .b em+em{background:var(--danger-soft);color:var(--danger)}
.cp-dtable .tb2{position:relative}
.cp-dtable .rr2{position:relative;display:grid;grid-template-columns:2.2em 5.6em 4.4em 1fr;align-items:center;height:2.3em;padding:0 .8em;border-top:.1em solid var(--rule);background:var(--ui)}
.cp-dtable .rr2>span{font-size:.78em;white-space:nowrap}
.cp-dtable .h{background:var(--stage)}
.cp-dtable .h>span{font-size:.7em;font-weight:600;color:var(--ink-3)}
.cp-dtable .h .so{display:flex;align-items:center;gap:.25em;animation:cpdt-h 5s infinite}
.cp-dtable .h .so svg{width:1.1em;height:1.1em;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.cp-dtable .x{width:1.35em;height:1.35em;border-radius:.35em;border-width:.13em;border-color:var(--line)}
.cp-dtable .x::after{left:.32em;top:.05em;width:.34em;height:.68em;border-width:0 .16em .16em 0}
.cp-dtable .d{z-index:1;animation:dt-r 5s cubic-bezier(.3,.7,.2,1) infinite}
.cp-dtable .sel{animation:dt-r 5s cubic-bezier(.3,.7,.2,1) infinite,dt-bg 5s infinite}
.cp-dtable .sel .x{animation:dt-x 5s infinite}
.cp-dtable .sc2{font-family:var(--f-mono);font-variant-numeric:tabular-nums}
.cp-dtable .bd2{justify-self:start;padding:.15em .5em;border-radius:.4em;font-size:.68em!important;font-weight:600}
.cp-dtable .ok{background:#E3F8EE;color:#03A65F}.cp-dtable .bl{background:var(--accent-soft);color:var(--accent)}.cp-dtable .gr{background:var(--weak);color:var(--weak-ink)}
.cp-dtable .tap{animation-duration:5s}
.cp-dtable .t1{left:10.4em;top:1.15em;animation-delay:-1.15s}
.cp-dtable .t2{left:1.5em;top:3.45em;animation-delay:-4.75s}
@keyframes dt-r{0%,26%{transform:none}38%,92%{transform:translateY(calc(var(--d) * 2.3em))}100%{transform:none}}
@keyframes cpdt-h{0%,24%{color:var(--ink-3)}27%,92%{color:var(--accent)}96%,100%{color:var(--ink-3)}}
@keyframes dt-x{0%,57%{background:transparent;border-color:var(--line);color:transparent}59%,92%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}95%,100%{background:transparent;border-color:var(--line);color:transparent}}
@keyframes dt-bg{0%,57%{background:var(--ui)}59%,92%{background:var(--accent-soft)}95%,100%{background:var(--ui)}}
@keyframes dt-a{0%,57%{opacity:1}59%,93%{opacity:0}96%,100%{opacity:1}}
@keyframes dt-b{0%,57%{opacity:0;transform:translateY(.4em)}60%,92%{opacity:1;transform:none}95%,100%{opacity:0}}

.cp-item .pan{width:19em;padding:.5em}
.cp-item .li{position:relative;display:flex;align-items:center;gap:.8em;padding:.75em .75em;border-radius:.9em}
.cp-item .li.p{animation:it-p 4s infinite}
.cp-item .ico{flex:none;display:grid;place-items:center;width:2.6em;height:2.6em;border-radius:.8em;background:var(--accent-soft)}
.cp-item .ico svg{width:1.35em;height:1.35em;fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.cp-item .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:.1em}
.cp-item .tx b{font-size:.9em;font-weight:600}
.cp-item .tx em{font-style:normal;font-size:.72em;color:var(--ink-3)}
.cp-item .vl{font-size:.88em;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.cp-item .chv{flex:none;width:.5em;height:.5em;border:solid var(--ink-3);border-width:.15em .15em 0 0;transform:rotate(45deg);margin-right:.2em}
.cp-item .tap{left:50%;top:50%;animation-delay:-.32s}
@keyframes it-p{0%,44%{background:transparent;transform:none}48%,56%{background:var(--weak);transform:scale(.98)}68%,100%{background:transparent;transform:none}}

.cp-field .wr{position:relative;width:15em;margin-right:5.4em}
.cp-field .pan{padding:1.2em;display:flex;flex-direction:column;gap:.45em}
.cp-field .lb{display:flex;gap:.2em;font-size:.8em;font-weight:600;color:var(--ink-2)}
.cp-field .lb i{font-style:normal;color:var(--danger)}
.cp-field .in{position:relative;height:2.5em;border:.12em solid var(--frame);border-radius:.7em;font-size:.85em;animation:fd-b 6s infinite}
.cp-field .in span{position:absolute;left:.75em;top:50%;transform:translateY(-50%);white-space:nowrap}
.cp-field .in .ph3{color:var(--ink-3);animation:fd-p 6s infinite}
.cp-field .in .v{clip-path:inset(0 100% 0 0);animation:fd-v 6s steps(6) infinite}
.cp-field .hm{position:relative;height:1.3em;font-size:.72em}
.cp-field .hm span{position:absolute;left:0;top:0;white-space:nowrap}
.cp-field .h1{color:var(--ink-3);animation:fd-h1 6s infinite}
.cp-field .h2{display:flex;align-items:center;gap:.3em;color:var(--danger);opacity:0;animation:fd-h2 6s infinite}
.cp-field .h2::before{content:"!";display:grid;place-items:center;width:1.2em;height:1.2em;border-radius:50%;background:var(--danger);color:#fff;font-size:.8em;font-weight:700}
.cp-field .tg2{position:absolute;left:calc(100% + .7em);display:flex;align-items:center;gap:.4em;font-size:.7em;font-weight:600;color:var(--accent);white-space:nowrap;opacity:0;animation:fd-t 6s infinite;animation-delay:var(--dl)}
.cp-field .tg2::before{content:"";width:1.6em;height:.12em;background:currentColor}
.cp-field .tg2.er{color:var(--danger);animation-name:fd-te;animation-delay:0s}
@keyframes fd-t{0%,4%{opacity:0;transform:translateX(-.4em)}10%,42%{opacity:1;transform:none}48%,100%{opacity:0}}
@keyframes fd-te{0%,70%{opacity:0;transform:translateX(-.4em)}74%,92%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes fd-p{0%,50%{opacity:1}51%,96%{opacity:0}98%,100%{opacity:1}}
@keyframes fd-v{0%,51%{clip-path:inset(0 100% 0 0)}66%,96%{clip-path:inset(0 0 0 0)}97%,100%{clip-path:inset(0 100% 0 0)}}
@keyframes fd-b{0%,50%{border-color:var(--frame);box-shadow:none}52%,68%{border-color:var(--accent);box-shadow:0 0 0 .22em var(--accent-soft)}70%,94%{border-color:var(--danger);box-shadow:0 0 0 .22em var(--danger-soft)}97%,100%{border-color:var(--frame);box-shadow:none}}
@keyframes fd-h1{0%,69%{opacity:1}71%,95%{opacity:0}97%,100%{opacity:1}}
@keyframes fd-h2{0%,69%{opacity:0;transform:translateY(-.3em)}72%,95%{opacity:1;transform:none}97%,100%{opacity:0}}

.cp-alert .pan{width:19em;padding:1em;display:flex;flex-direction:column;gap:.55em}
.cp-alert .al{display:flex;gap:.6em;padding:.7em .8em;border-radius:.8em;background:var(--accent-soft);animation:al-in 5s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .25s)}
.cp-alert .al i{flex:none;display:grid;place-items:center;width:1.35em;height:1.35em;border-radius:50%;background:var(--accent);color:#fff;font-style:normal;font-size:.8em;font-weight:700;margin-top:.05em}
.cp-alert .al div{display:flex;flex-direction:column;gap:.15em;min-width:0}
.cp-alert .al b{font-size:.8em;font-weight:600}
.cp-alert .al span{font-size:.68em;color:var(--ink-2)}
.cp-alert .al u{text-decoration:none;font-weight:600;color:var(--warn)}
.cp-alert .wn{background:var(--warn-soft)}.cp-alert .wn i{background:var(--warn)}
.cp-alert .er{background:var(--danger-soft)}.cp-alert .er i{background:var(--danger)}
.cp-alert .ln.h{width:45%}
@keyframes al-in{0%,6%{opacity:0;transform:translateY(.5em)}16%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}

.cp-rtl .col{gap:.7em}
.cp-rtl .dsw{position:relative;width:9em;height:1.9em;border-radius:2em;background:var(--weak);font-size:.75em;font-weight:600}
.cp-rtl .dsw b{position:absolute;inset:0;display:grid;place-items:center;font-weight:600;white-space:nowrap}
.cp-rtl .dsw .a{animation:rt-a 5s infinite}.cp-rtl .dsw .b{opacity:0;color:var(--accent);animation:rt-b 5s infinite}
.cp-rtl .ly{position:absolute;inset:0;padding:2em .9em 1em;display:flex;flex-direction:column;gap:.7em;background:var(--ui)}
.cp-rtl .l1{animation:rt-a 5s infinite}.cp-rtl .l2{opacity:0;animation:rt-b 5s infinite}
.cp-rtl .top{display:flex;align-items:center;gap:.5em;margin-bottom:.3em}
.cp-rtl .bk{width:.6em;height:.6em;border:solid var(--ink);border-width:0 0 .16em .16em;transform:rotate(45deg);flex:none}
.cp-rtl .rr{display:flex;align-items:center;gap:.55em;padding:.35em 0}
.cp-rtl .rr i{flex:none;width:1.4em;height:1.4em;border-radius:.4em;background:var(--accent-soft)}
.cp-rtl .rr .ln{flex:1}
.cp-rtl .rr .chv{flex:none;width:.45em;height:.45em;border:solid var(--ink-3);border-width:.14em .14em 0 0;transform:rotate(45deg)}
.cp-rtl .l2 .top,.cp-rtl .l2 .rr{flex-direction:row-reverse}
.cp-rtl .l2 .bk{transform:rotate(-135deg)}
.cp-rtl .l2 .chv{transform:rotate(-135deg)}
.cp-rtl .l2 .im{transform:scaleX(-1)}
.cp-rtl .im{height:3.6em;background:linear-gradient(90deg,var(--accent) 0 30%,var(--accent-soft) 30%)}
@keyframes rt-a{0%,44%{opacity:1;transform:none}50%,94%{opacity:0;transform:translateX(-1em)}98%,100%{opacity:1;transform:none}}
@keyframes rt-b{0%,44%{opacity:0;transform:translateX(1em)}50%,92%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateX(1em)}}

.cp-msg .pan{position:relative;width:21em;padding:.7em;display:flex;flex-direction:column;gap:.2em}
.cp-msg .m{position:relative;display:flex;gap:.65em;padding:.6em .6em;border-radius:.8em}
.cp-msg .m2{animation:ms-h 5s infinite}
.cp-msg .m .av{width:2.2em;height:2.2em}
.cp-msg .m .p1{background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.9) 0 20%,transparent 21%),radial-gradient(ellipse 44% 34% at 50% 100%,rgba(255,255,255,.9) 0 98%,transparent 100%),#6FB6FF}
.cp-msg .m .p2{display:grid;place-items:center;background:#E3F8EE;color:#03A65F;font-size:.85em;font-weight:700}
.cp-msg .bd{display:flex;flex-direction:column;gap:.2em;min-width:0}
.cp-msg .nm{display:flex;align-items:baseline;gap:.4em;font-size:.78em;font-weight:700}
.cp-msg .nm em{font-style:normal;font-weight:400;font-size:.85em;color:var(--ink-3)}
.cp-msg .bd p{margin:0;font-size:.8em;color:var(--ink-2);line-height:1.45}
.cp-msg .rc{align-self:flex-start;display:flex;align-items:center;gap:.3em;margin-top:.2em;padding:.15em .5em;border-radius:1em;border:.1em solid var(--accent);background:var(--accent-soft);color:var(--accent);font-size:.68em;font-weight:600;transform-origin:0 50%;animation:ms-r 5s cubic-bezier(.2,.8,.2,1.4) infinite}
.cp-msg .rc svg,.cp-msg .ab svg{width:1.1em;height:1.1em}
.cp-msg .rc svg{fill:currentColor}
.cp-msg .ab{position:absolute;right:.6em;top:-1em;display:flex;gap:.1em;padding:.25em;font-size:.95em;border-radius:.7em;z-index:2;animation:ms-a 5s infinite}
.cp-msg .ab span{display:grid;place-items:center;width:1.9em;height:1.7em;border-radius:.45em}
.cp-msg .ab span:first-child{animation:ms-b 5s infinite}
.cp-msg .ab .ic{stroke-width:2}
.cp-msg .cur{left:0;top:0;animation:ms-c 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-msg .tap{left:15.7em;top:5.9em;animation-duration:5s;animation-delay:-4.65s}
@keyframes ms-h{0%,22%{background:transparent}26%,80%{background:var(--stage)}84%,100%{background:transparent}}
@keyframes ms-a{0%,22%{opacity:0;transform:translateY(.3em)}27%,80%{opacity:1;transform:none}84%,100%{opacity:0}}
@keyframes ms-b{0%,48%{background:transparent}52%,62%{background:var(--weak)}66%,100%{background:transparent}}
@keyframes ms-r{0%,56%{opacity:0;transform:scale(.5)}62%,92%{opacity:1;transform:none}97%,100%{opacity:0;transform:none}}
@keyframes ms-c{0%{transform:translate(24em,18em)}20%,26%{transform:translate(9em,9.5em)}46%,74%{transform:translate(15.6em,5.8em)}94%,100%{transform:translate(24em,18em)}}

.cp-bubble .pan{width:20em;padding:1em;display:flex;flex-direction:column;gap:.5em}
.cp-bubble .b{max-width:78%;padding:.55em .8em;border-radius:1.1em;font-size:.78em;line-height:1.45;animation:bu-in 6s cubic-bezier(.2,.8,.2,1.2) infinite backwards;animation-delay:calc(var(--i) * .35s)}
.cp-bubble .in{align-self:flex-start;background:var(--weak);color:var(--ink);border-bottom-left-radius:.35em;transform-origin:0 100%}
.cp-bubble .out{align-self:flex-end;background:var(--accent);color:var(--accent-ink);border-bottom-right-radius:.35em;transform-origin:100% 100%}
.cp-bubble .q{display:block;margin-bottom:.35em;padding:.2em .5em;border-left:.2em solid rgba(255,255,255,.6);background:rgba(255,255,255,.16);border-radius:.3em;font-size:.88em;opacity:.9}
.cp-bubble .sg{align-self:flex-end;display:flex;gap:.35em}
.cp-bubble .sg .b{max-width:none;background:transparent;border:.12em solid var(--accent);color:var(--accent);font-weight:600;padding:.4em .75em;transform-origin:50% 100%}
.cp-bubble .gh{align-self:flex-start;max-width:100%;background:transparent;padding:.2em .1em;color:var(--ink-2);transform-origin:0 50%}
.cp-bubble .lb3{display:flex;justify-content:center;gap:.8em;font-family:var(--f-mono);font-size:.6em;color:var(--ink-3);margin-top:.2em}
@keyframes bu-in{0%,4%{opacity:0;transform:scale(.7)}12%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}

.cp-mscroll .pan{position:relative;width:17em;height:16.5em;overflow:hidden}
.cp-mscroll .hd2{position:relative;z-index:2;display:flex;align-items:center;gap:.5em;height:2.6em;padding:0 1em;font-size:.85em;font-weight:700;background:var(--ui);border-bottom:.1em solid var(--rule)}
.cp-mscroll .hd2 .av{width:1.5em;height:1.5em;background:var(--accent-soft)}
.cp-mscroll .vw{position:absolute;left:0;right:0;top:2.6em;bottom:0;overflow:hidden}
.cp-mscroll .ct{padding:.6em .8em;display:flex;flex-direction:column;animation:mc-y 6s cubic-bezier(.3,.7,.2,1) infinite}
.cp-mscroll .ct>span{display:flex;height:2.6em;align-items:center}
.cp-mscroll .ct>span i{display:block;height:1.9em;border-radius:1em;background:var(--weak);width:var(--w)}
.cp-mscroll .ct .o{justify-content:flex-end}.cp-mscroll .ct .o i{background:var(--accent)}
.cp-mscroll .ct .n6 i{animation:mc-6 6s infinite}.cp-mscroll .ct .n7 i{animation:mc-7 6s infinite}
.cp-mscroll .pl{position:absolute;left:50%;bottom:.9em;z-index:2;display:flex;align-items:center;gap:.35em;padding:.4em .8em;border-radius:2em;background:var(--ink);color:var(--surface);font-size:.7em;font-weight:600;white-space:nowrap;box-shadow:0 .3em .8em rgba(0,0,0,.2);animation:mc-p 6s cubic-bezier(.2,.8,.2,1.2) infinite}
.cp-mscroll .pl::after{content:"";width:.45em;height:.45em;border:solid currentColor;border-width:0 .15em .15em 0;transform:translateY(-.15em) rotate(45deg)}
.cp-mscroll .tap{left:50%;top:90%;animation-duration:6s;animation-delay:-4.92s}
@keyframes mc-y{0%,12%{transform:translateY(-1.6em)}20%,30%{transform:translateY(-4.2em)}40%,64%{transform:translateY(0)}74%,94%{transform:translateY(-6.8em)}100%{transform:translateY(-1.6em)}}
@keyframes mc-6{0%,13%{opacity:0;transform:scale(.6)}18%,94%{opacity:1;transform:none}100%{opacity:0}}
@keyframes mc-7{0%,44%{opacity:0;transform:scale(.6)}49%,94%{opacity:1;transform:none}100%{opacity:0}}
@keyframes mc-p{0%,46%{opacity:0;transform:translate(-50%,.8em)}50%,66%{opacity:1;transform:translate(-50%,0)}70%,100%{opacity:0;transform:translate(-50%,0)}}

.cp-attach .pan{width:20em;padding:.9em;display:flex;flex-direction:column;gap:.7em}
.cp-attach .at{display:flex;gap:.55em}
.cp-attach .fc{position:relative;display:flex;align-items:center;gap:.55em;width:11.6em;padding:.55em;border:.1em solid var(--rule);border-radius:.8em;overflow:hidden;background:var(--ui)}
.cp-attach .fi{flex:none;display:grid;place-items:center;width:2.3em;height:2.3em;border-radius:.55em;background:var(--danger-soft);color:var(--danger);font-family:var(--f-mono);font-size:.62em;font-weight:700}
.cp-attach .fi{width:3.6em;height:3.6em}
.cp-attach .ft2{display:flex;flex-direction:column;gap:.15em;min-width:0}
.cp-attach .ft2 b{font-size:.72em;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cp-attach .mt{position:relative;height:1.2em;font-size:.62em;color:var(--ink-3)}
.cp-attach .mt span{position:absolute;left:0;top:0;white-space:nowrap}
.cp-attach .u1{background:linear-gradient(90deg,var(--ink-3) 0 35%,var(--line) 50%,var(--ink-3) 65% 100%) 0 0/300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shim 1.3s linear infinite,at-1 5s infinite}
.cp-attach .u2{opacity:0;animation:at-2 5s infinite}
.cp-attach .pb{position:absolute;left:0;bottom:0;height:.2em;background:var(--accent);animation:at-p 5s cubic-bezier(.4,0,.2,1) infinite}
.cp-attach .rm{position:absolute;right:.35em;top:.35em;width:1.3em;height:1.3em;border-radius:50%;background:var(--ink-2);opacity:0;animation:at-x 5s infinite}
.cp-attach .rm::before,.cp-attach .rm::after{content:"";position:absolute;left:50%;top:25%;width:.12em;height:50%;margin-left:-.06em;background:#fff;transform:rotate(45deg)}
.cp-attach .rm::after{transform:rotate(-45deg)}
.cp-attach .ig{position:relative;flex:none;width:4.8em;height:4.8em;border-radius:.8em;background:linear-gradient(160deg,#9AD9FF,#3182F6);overflow:hidden;animation:at-i 5s cubic-bezier(.2,.8,.2,1.3) infinite}
.cp-attach .ig .spn{position:absolute;left:50%;top:50%;width:1.8em;height:1.8em;margin:-.9em;border-width:.22em;border-color:rgba(255,255,255,.35);border-top-color:#fff;animation:spin .8s linear infinite,at-s 5s infinite}
.cp-attach .ib2{display:flex;align-items:center;gap:.6em;padding:.55em .55em .55em .9em;border-radius:1.2em;background:var(--weak)}
.cp-attach .ib2 span{flex:1;font-size:.75em;color:var(--ink-3)}
.cp-attach .ib2 svg{width:1.2em;height:1.2em}
.cp-attach .ib2 b{display:grid;place-items:center;width:1.9em;height:1.9em;border-radius:50%;background:var(--accent)}
.cp-attach .ib2 b::before{content:"";width:.5em;height:.5em;border:solid #fff;border-width:.15em 0 0 .15em;transform:translateY(.12em) rotate(45deg)}
@keyframes at-1{0%,40%{opacity:1}42%,100%{opacity:0}}
@keyframes at-2{0%,40%{opacity:0}42%,96%{opacity:1}99%,100%{opacity:0}}
@keyframes at-p{0%,4%{width:0;opacity:1}40%{width:100%;opacity:1}44%,100%{width:100%;opacity:0}}
@keyframes at-x{0%,68%{opacity:0;transform:scale(.6)}72%,92%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes at-i{0%,34%{opacity:0;transform:scale(.7)}42%,94%{opacity:1;transform:none}98%,100%{opacity:0}}
@keyframes at-s{0%,62%{opacity:1}66%,100%{opacity:0}}

.cp-marker .pan{width:20em;padding:1em;display:flex;flex-direction:column;gap:.7em}
.cp-marker .dv{display:flex;align-items:center;gap:.7em;font-size:.68em;color:var(--ink-3);font-weight:600}
.cp-marker .dv i{flex:1;height:.1em;background:var(--rule)}
.cp-marker .ub{align-self:flex-end;max-width:80%;padding:.5em .8em;border-radius:1.1em 1.1em .35em 1.1em;background:var(--accent);color:var(--accent-ink);font-size:.78em;animation:mk-u 6s cubic-bezier(.2,.8,.2,1.2) infinite;transform-origin:100% 100%}
.cp-marker .st{position:relative;height:2.1em;border-bottom:.1em solid var(--rule)}
.cp-marker .st>span{position:absolute;left:0;top:.2em;display:flex;align-items:center;gap:.5em;font-size:.75em;white-space:nowrap}
.cp-marker .s1{animation:mk-1 6s infinite}
.cp-marker .s1 .spn{width:1.2em;height:1.2em;border-width:.18em}
.cp-marker .s1 b{font-weight:500;background:linear-gradient(90deg,var(--ink-3) 0 35%,var(--line) 50%,var(--ink-3) 65% 100%) 0 0/300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shim 1.3s linear infinite}
.cp-marker .s2{opacity:0;color:var(--ink-2);animation:mk-2 6s infinite}
.cp-marker .s2 svg{width:1.2em;height:1.2em;fill:none;stroke:var(--ok);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.cp-marker .s2 em{font-style:normal;color:var(--ink-3);font-family:var(--f-mono);font-size:.9em}
.cp-marker .an{display:flex;flex-direction:column;gap:.45em}
.cp-marker .an .ln{animation:mk-a 6s cubic-bezier(.2,.8,.2,1) infinite backwards;animation-delay:calc(var(--i) * .12s)}
@keyframes mk-u{0%,4%{opacity:0;transform:scale(.7)}10%,92%{opacity:1;transform:none}97%,100%{opacity:0}}
@keyframes mk-1{0%,12%{opacity:0}16%,46%{opacity:1}49%,100%{opacity:0}}
@keyframes mk-2{0%,47%{opacity:0;transform:translateY(.3em)}51%,92%{opacity:1;transform:none}97%,100%{opacity:0}}
@keyframes mk-a{0%,52%{opacity:0;transform:translateY(.4em)}58%,92%{opacity:1;transform:none}97%,100%{opacity:0}}

.cp-trace .pan{width:20em;padding:1em 1.1em;display:flex;flex-direction:column}
.cp-trace .hd2{font-size:.85em;font-weight:700;margin-bottom:.4em}
.cp-trace .ro{position:relative;display:flex;align-items:center;gap:.6em;padding:.5em 0;font-size:.8em}
.cp-trace .si{position:relative;flex:none;width:1.35em;height:1.35em}
.cp-trace .si>*{position:absolute;inset:0}
.cp-trace .si svg{width:100%;height:100%;fill:none;stroke:var(--ok);stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round}
.cp-trace .si .pd{border-radius:50%;border:.14em dashed var(--line)}
.cp-trace .si .spn{width:100%;height:100%;border-width:.18em}
.cp-trace .tt{position:relative;flex:1;min-width:0;white-space:nowrap}
.cp-trace .ro em{font-style:normal;font-family:var(--f-mono);font-size:.82em;color:var(--ink-3)}
.cp-trace .wa{animation:tr-a 6s infinite}.cp-trace .spn.wa{animation:spin .8s linear infinite,tr-a 6s infinite}.cp-trace .spn.wd{animation:spin .8s linear infinite,tr-d 6s infinite}.cp-trace .spn.we{animation:spin .8s linear infinite,tr-e 6s infinite}.cp-trace .tt .sh.wa{animation:shim 1.3s linear infinite reverse,tr-a 6s infinite}.cp-trace .tt .sh.wd{animation:shim 1.3s linear infinite reverse,tr-d 6s infinite}.cp-trace .tt .sh.we{animation:shim 1.3s linear infinite reverse,tr-e 6s infinite}.cp-trace .wb{animation:tr-b 6s infinite}.cp-trace .wd{animation:tr-d 6s infinite}.cp-trace .we{animation:tr-e 6s infinite}.cp-trace .wf{animation:tr-f 6s infinite}
.cp-trace .pe{color:var(--ink-3)}
.cp-trace .r4 .tt{animation:tr-c4 6s infinite}.cp-trace .r5 .tt{animation:tr-c5 6s infinite}
.cp-trace .tt .sh{position:absolute;inset:0;background:linear-gradient(90deg,transparent 30%,var(--ui) 50%,transparent 70%) 0 0/300% 100%;opacity:.75;animation:shim 1.3s linear infinite reverse}
.cp-trace .cv{width:.42em;height:.42em;border:solid var(--ink-3);border-width:0 .14em .14em 0;transform:rotate(-45deg);animation:tr-r 6s cubic-bezier(.3,.7,.2,1) infinite;margin-right:.2em}
.cp-trace .ex{overflow:hidden;max-height:0;padding-left:1.95em;animation:tr-x 6s cubic-bezier(.3,.7,.2,1) infinite}
.cp-trace .ex div{display:flex;gap:.35em;padding:.1em 0 .5em}
.cp-trace .ex span{padding:.2em .5em;border-radius:.4em;background:var(--weak);font-size:.62em;color:var(--weak-ink);white-space:nowrap}
.cp-trace .tap{left:50%;top:50%;animation-duration:6s;animation-delay:-4.92s}
@keyframes tr-a{0%,29%{opacity:1}31%,100%{opacity:0}}
@keyframes tr-b{0%,29%{opacity:0}31%,100%{opacity:1}}
@keyframes tr-d{0%,29%{opacity:0}31%,59%{opacity:1}61%,100%{opacity:0}}
@keyframes tr-e{0%,59%{opacity:0}61%,100%{opacity:1}}
@keyframes tr-f{0%,59%{opacity:1}61%,100%{opacity:0}}
@keyframes tr-c4{0%,29%{color:var(--ink-3)}31%,100%{color:var(--ink)}}
@keyframes tr-c5{0%,59%{color:var(--ink-3)}61%,100%{color:var(--ink)}}
@keyframes tr-r{0%,66%{transform:rotate(-45deg)}74%,94%{transform:rotate(45deg)}100%{transform:rotate(-45deg)}}
@keyframes tr-x{0%,66%{max-height:0}76%,94%{max-height:2.2em}100%{max-height:0}}

.cp-quest .pan{width:18em;padding:1.1em;display:flex;flex-direction:column;gap:.7em}
.cp-quest .tp{display:flex;justify-content:space-between;align-items:center;font-size:.7em;font-weight:600;color:var(--ink-3)}
.cp-quest .tp .nn{position:relative;width:5em;height:1.3em}
.cp-quest .tp .nn b{position:absolute;left:0;top:0;font-weight:600;white-space:nowrap}
.cp-quest .tp .k1{animation:qs-1 6s infinite}.cp-quest .tp .k2{opacity:0;animation:qs-2 6s infinite}
.cp-quest .pr{height:.3em;border-radius:1em;background:var(--weak);overflow:hidden}
.cp-quest .pr i{display:block;height:100%;width:33%;border-radius:1em;background:var(--accent);animation:qs-p 6s cubic-bezier(.4,0,.2,1) infinite}
.cp-quest .bd{position:relative;height:10.6em;overflow:hidden}
.cp-quest .q{position:absolute;inset:0;display:flex;flex-direction:column;gap:.45em}
.cp-quest .q1{animation:qs-a 6s cubic-bezier(.4,0,.2,1) infinite}
.cp-quest .q2{opacity:0;animation:qs-b 6s cubic-bezier(.4,0,.2,1) infinite}
.cp-quest .q h4{margin:0 0 .3em;font-size:.95em;font-weight:700;line-height:1.35}
.cp-quest .q h4 em{font-style:normal;font-weight:500;font-size:.75em;color:var(--ink-3);margin-left:.3em}
.cp-quest .op{display:flex;align-items:center;gap:.55em;height:2.25em;padding:0 .75em;border:.12em solid var(--rule);border-radius:.7em;font-size:.78em}
.cp-quest .op .r,.cp-quest .op .x{width:1.35em;height:1.35em;border-width:.14em;border-color:var(--line)}
.cp-quest .op .x{border-radius:.35em}
.cp-quest .op .x::after{left:.32em;top:.05em;width:.34em;height:.68em;border-width:0 .16em .16em 0}
.cp-quest .s1{animation:qs-o1 6s infinite}.cp-quest .s1 .r{animation:qs-r 6s infinite}
.cp-quest .s2{animation:qs-o2 6s infinite}.cp-quest .s2 .x{animation:qs-x2 6s infinite}
.cp-quest .s3{animation:qs-o3 6s infinite}.cp-quest .s3 .x{animation:qs-x3 6s infinite}
.cp-quest .ftr{position:relative;display:flex;justify-content:space-between;align-items:center}
.cp-quest .ftr span{font-size:.75em;font-weight:600;color:var(--ink-3)}
.cp-quest .ftr .bt{font-size:.8em;padding:.5em 1.4em;animation:qs-n 6s infinite}
.cp-quest .tap{animation-duration:6s}
.cp-quest .t1{left:50%;top:5.5em;animation-delay:-1.68s}
.cp-quest .t2{left:84%;top:50%;animation-delay:-.24s}
.cp-quest .t3{left:50%;top:3.1em;animation-delay:-5.28s}
.cp-quest .t4{left:50%;top:8.3em;animation-delay:-4.68s}
@keyframes qs-a{0%,40%{opacity:1;transform:none}48%,96%{opacity:0;transform:translateX(-2em)}100%{opacity:1;transform:none}}
@keyframes qs-b{0%,42%{opacity:0;transform:translateX(2em)}50%,92%{opacity:1;transform:none}97%,100%{opacity:0;transform:none}}
@keyframes qs-1{0%,43%{opacity:1}46%,96%{opacity:0}99%,100%{opacity:1}}
@keyframes qs-2{0%,43%{opacity:0}46%,94%{opacity:1}97%,100%{opacity:0}}
@keyframes qs-p{0%,42%{width:33%}50%,94%{width:66%}100%{width:33%}}
@keyframes qs-o1{0%,20%{border-color:var(--rule);background:transparent}22%,100%{border-color:var(--accent);background:var(--accent-soft)}}
@keyframes qs-r{0%,20%{background:transparent;border-color:var(--line);box-shadow:inset 0 0 0 .38em var(--ui)}22%,100%{background:var(--accent);border-color:var(--accent);box-shadow:inset 0 0 0 .3em var(--accent-soft)}}
@keyframes qs-n{0%,21%{background:var(--weak);color:var(--ink-3)}23%,42%{background:var(--accent);color:var(--accent-ink)}46%,60%{background:var(--weak);color:var(--ink-3)}62%,94%{background:var(--accent);color:var(--accent-ink)}97%,100%{background:var(--weak);color:var(--ink-3)}}
@keyframes qs-o2{0%,60%{border-color:var(--rule);background:transparent}62%,94%{border-color:var(--accent);background:var(--accent-soft)}97%,100%{border-color:var(--rule);background:transparent}}
@keyframes qs-x2{0%,60%{background:transparent;border-color:var(--line);color:transparent}62%,94%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}97%,100%{background:transparent;border-color:var(--line);color:transparent}}
@keyframes qs-o3{0%,70%{border-color:var(--rule);background:transparent}72%,94%{border-color:var(--accent);background:var(--accent-soft)}97%,100%{border-color:var(--rule);background:transparent}}
@keyframes qs-x3{0%,70%{background:transparent;border-color:var(--line);color:transparent}72%,94%{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}97%,100%{background:transparent;border-color:var(--line);color:transparent}}

.cp-code .cb2{position:relative;width:21em;border-radius:1em;background:#191F28;color:#E5E8EB;box-shadow:0 .4em 1.4em -.6em rgba(0,0,0,.5)}
:root[data-theme="dark"] .cp-code .cb2{background:#101014}
.cp-code .hd4{display:flex;align-items:center;gap:.6em;padding:.6em .9em;border-bottom:.1em solid rgba(255,255,255,.1);font-size:.72em}
.cp-code .hd4 b{font-weight:600}
.cp-code .hd4 em{font-style:normal;padding:.1em .45em;border-radius:.35em;background:rgba(255,255,255,.1);color:#B0B8C1;font-family:var(--f-mono);font-size:.85em}
.cp-code .cp{position:relative;margin-left:auto;width:2em;height:2em;display:grid;place-items:center;border-radius:.5em}
.cp-code .cp svg{position:absolute;width:1.25em;height:1.25em;fill:none;stroke:#B0B8C1;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.cp-code .cp .k1{animation:cd-1 5s infinite}.cp-code .cp .k2{stroke:#4CD38C;opacity:0;animation:cd-2 5s infinite}
.cp-code .tip{position:absolute;right:-.3em;bottom:calc(100% + .5em);padding:.3em .6em;border-radius:.5em;background:#fff;color:#191F28;font-size:.9em;font-weight:600;white-space:nowrap;opacity:0;animation:cd-t 5s cubic-bezier(.2,.8,.2,1.3) infinite}
.cp-code pre{margin:0;padding:.8em 0;font-family:var(--f-mono);font-size:.78em;line-height:1.75}
.cp-code pre span{position:relative;display:block;padding:0 1em 0 3em;white-space:pre}
.cp-code pre span::before{content:attr(data-n);position:absolute;left:1em;width:1.2em;text-align:right;color:#6B7684}
.cp-code pre .hl{animation:cd-h 5s infinite}
.cp-code pre b,.cp-code pre i{font-weight:400;font-style:normal}
.cp-code .p{color:#FF8FA3}.cp-code .v{color:#64A8FF}.cp-code .s{color:#FFC94D}
.cp-code .tap{animation-duration:5s;left:50%;top:50%;animation-delay:-4.65s}
@keyframes cd-h{0%,14%{background:transparent;box-shadow:none}20%,90%{background:rgba(49,130,246,.22);box-shadow:inset .2em 0 0 #3182F6}96%,100%{background:transparent;box-shadow:none}}
@keyframes cd-1{0%,56%{opacity:1}58%,88%{opacity:0}92%,100%{opacity:1}}
@keyframes cd-2{0%,56%{opacity:0}58%,88%{opacity:1}92%,100%{opacity:0}}
@keyframes cd-t{0%,56%{opacity:0;transform:translateY(.3em) scale(.9)}60%,82%{opacity:1;transform:none}88%,100%{opacity:0;transform:none}}
`;
s.items.push(
  {
    id: 'cp-sheet', k: '사이드 시트', e: 'Sheet',
    d: '화면 옆(주로 오른쪽)에서 미끄러져 들어오는 패널이에요. 지금 보던 화면을 그대로 둔 채 필터나 상세 정보를 다뤄요.',
    u: '넓은 화면에서 필터, 편집 폼, 상세 보기처럼 본문을 참고하면서 해야 하는 작업에 써요. 휴대폰에서는 같은 역할을 바텀시트가 맡아요.',
    de: 'A panel that slides in from the side of the screen, usually the right. You work on filters or details while the page underneath stays put.',
    ue: 'Use it on wide screens for filters, edit forms and detail views that need the page as context. On phones a bottom sheet plays the same role.',
    html: `<div class="pg box"><div class="hd3"><b>지원자 목록</b><span class="fb"><svg class="ic" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>필터</span></div>${'<div class="tr"><span class="ln" style="width:80%"></span><span class="ln" style="width:60%"></span><span class="ln" style="width:70%"></span></div>'.repeat(4)}<div class="dm"></div><div class="sht"><div class="t">필터<i></i></div><span class="sm">직무</span><span class="rw"><span class="x on"></span>디자인</span><span class="rw"><span class="x x2"></span>개발</span><span class="rw"><span class="x"></span>기획</span><span class="bt">적용하기</span><i class="tap t2"></i><i class="tap t3"></i></div><i class="tap t1"></i></div>`
  },
  {
    id: 'cp-cal', k: '달력', e: 'Calendar',
    d: '한 달을 격자로 펼쳐 날짜를 고르게 해요. 시작일과 종료일을 차례로 누르면 그 사이가 기간으로 칠해져요.',
    u: '숙박, 예약, 휴가처럼 요일과 기간이 중요한 선택에 써요. 생일처럼 먼 과거의 날짜는 달력을 넘기기 번거로우니 직접 입력이나 휠이 더 빨라요.',
    de: 'Lays out a month as a grid for picking dates. Tap a start and an end date and the days in between fill in as a range.',
    ue: 'Use it when weekdays and ranges matter, as with stays, bookings and leave. For far-off dates such as birthdays, typing or a wheel is faster than paging through months.',
    html: (() => {
      let g = '';
      for (let i = 1; i <= 30; i++) {
        const cl = [i % 7 === 1 ? 'su' : '', i === 9 ? 'td' : '', i === 10 ? 's' : '', i === 14 ? 'e' : '', i > 10 && i < 14 ? 'm' : ''].filter(Boolean).join(' ');
        g += `<span class="${cl}"><b>${i}</b></span>`;
      }
      return `<div class="pan box"><div class="hd3">2026년 11월<span>‹ ›</span></div><div class="wk"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div><div class="gd">${g}<i class="tap t1"></i><i class="tap t2"></i></div><div class="ft"><span class="f1">날짜를 골라 주세요</span><span class="f2">11월 10일 (화) – 언제까지?</span><span class="f3">11월 10일 – 14일 · 4박</span></div></div>`;
    })()
  },
  {
    id: 'cp-dtable', k: '데이터 테이블', e: 'Data table',
    d: '많은 행을 정렬, 선택, 필터, 페이지 나누기와 함께 다루는 표예요. 머리글을 누르면 그 기준으로 다시 정렬돼요.',
    u: '관리 화면, 주문·회원 목록처럼 여러 기준으로 비교하고 한꺼번에 처리해야 할 때 써요. 행을 고르면 위쪽 도구 막대가 "1명 선택됨 · 삭제"처럼 일괄 작업으로 바뀌게 하세요.',
    de: 'A table for many rows with sorting, selection, filtering and pagination. Click a column header to re-sort by it.',
    ue: 'Use it in admin screens and order or member lists where people compare by several criteria and act in bulk. When rows are selected, turn the toolbar into bulk actions such as “1 selected · Delete”.',
    html: `<div class="pan box"><div class="tl"><span class="a">지원자 4명</span><span class="b"><b>1명 선택됨</b><span><em>내보내기</em><em>삭제</em></span></span></div><div class="tb2"><div class="rr2 h"><span class="x"></span><span>이름</span><span class="so">점수<svg viewBox="0 0 24 24"><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg></span><span>상태</span></div><div class="rr2 d" style="--d:2"><span class="x"></span><span>김하늘</span><span class="sc2">82</span><span class="bd2 ok">서류 합격</span></div><div class="rr2 sel" style="--d:-1;z-index:2"><span class="x"></span><span>이도윤</span><span class="sc2">95</span><span class="bd2 bl">면접 예정</span></div><div class="rr2 d" style="--d:1"><span class="x"></span><span>박서연</span><span class="sc2">74</span><span class="bd2 gr">검토 중</span></div><div class="rr2 d" style="--d:-2"><span class="x"></span><span>최민준</span><span class="sc2">88</span><span class="bd2 bl">면접 예정</span></div><i class="tap t1"></i><i class="tap t2"></i></div></div>`
  },
  {
    id: 'cp-item', k: '아이템 (리스트 행)', e: 'Item · List row',
    d: '왼쪽 아이콘, 가운데 두 줄 글, 오른쪽 값이나 화살표로 이뤄진 한 줄짜리 묶음이에요. 설정, 계좌, 메뉴 목록 대부분이 이 구조예요.',
    u: '같은 모양을 반복해 쌓기 때문에 목록이 길어도 읽기 쉬워요. 행 전체를 누를 수 있게 하고, 누를 때 배경이 살짝 바뀌는 피드백을 꼭 주세요.',
    de: 'One row made of a leading icon, two lines of text in the middle and a value or chevron at the end. Most settings, account and menu lists are built from it.',
    ue: 'Because every row has the same shape, long lists stay easy to scan. Make the whole row tappable and give it a pressed background.',
    html: `<div class="pan box"><div class="li"><span class="ico"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/></svg></span><span class="tx"><b>생활비 통장</b><em>입출금 통장</em></span><span class="vl">1,250,000원</span><i class="chv"></i></div><div class="li p"><span class="ico" style="background:#E3F8EE"><svg viewBox="0 0 24 24" style="stroke:#03A65F"><path d="M12 3v18M7 8h7a3 3 0 0 1 0 6H8"/></svg></span><span class="tx"><b>여행 적금</b><em>목표까지 63%</em></span><span class="vl">3,000,000원</span><i class="chv"></i><i class="tap"></i></div><div class="li"><span class="ico" style="background:var(--warn-soft)"><svg viewBox="0 0 24 24" style="stroke:var(--warn)"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 15h4"/></svg></span><span class="tx"><b>체크카드</b><em>이번 달 사용</em></span><span class="vl">412,300원</span><i class="chv"></i></div></div>`
  },
  {
    id: 'cp-field', k: '필드', e: 'Field',
    d: '라벨, 입력란, 도움말, 오류 메시지를 한 단위로 묶은 구조예요. 오류가 나면 도움말 자리에 같은 위치로 오류 문구가 들어와요.',
    u: '모든 입력란을 같은 필드 구조로 만들면 간격과 오류 표시가 화면 전체에서 일정해져요. 오류는 색만이 아니라 아이콘과 문장으로도 알려 주세요.',
    de: 'The unit that groups a label, an input, help text and an error message. When validation fails, the error takes the help text’s place.',
    ue: 'Build every input from the same field structure and spacing and error states stay consistent across the product. Signal errors with an icon and words, not colour alone.',
    html: `<div class="wr"><div class="pan box"><span class="lb">이메일<i>*</i></span><div class="in"><span class="ph3">name@example.com</span><span class="v">minji@</span></div><div class="hm"><span class="h1">로그인할 때 쓰는 주소예요</span><span class="h2">이메일 형식이 아니에요</span></div></div><span class="tg2" style="top:1.15em;--dl:0s">라벨</span><span class="tg2" style="top:3.05em;--dl:.2s">입력</span><span class="tg2" style="top:5.3em;--dl:.4s">도움말</span><span class="tg2 er" style="top:5.3em">오류</span></div>`
  },
  {
    id: 'cp-alert', k: '알림 상자', e: 'Alert · Callout',
    d: '내용 안에 고정으로 박혀 상태나 주의할 점을 알려 주는 상자예요. 저절로 사라지지 않아서 꼭 읽어야 할 정보에 맞아요.',
    u: '정보는 파랑, 주의는 주황, 오류는 빨강처럼 색과 아이콘을 짝지어 쓰세요. 잠깐 알리고 사라져도 되는 건 토스트, 계속 남아 있어야 하는 건 알림 상자예요.',
    de: 'A box embedded in the content that states a condition or caveat. It does not disappear on its own, so it suits information people must read.',
    ue: 'Pair colours with icons: blue for info, orange for warnings, red for errors. If the message can vanish after a moment, use a toast; if it must stay, use an alert.',
    html: `<div class="pan box"><span class="ln h"></span><div class="al" style="--i:0"><i>i</i><div><b>변경 사항은 내일부터 적용돼요</b><span>오늘 신청한 건은 기존 조건으로 처리돼요.</span></div></div><div class="al wn" style="--i:1"><i>!</i><div><b>결제 수단이 7일 뒤 만료돼요</b><span>끊기지 않게 <u>지금 바꾸기</u></span></div></div><div class="al er" style="--i:2"><i>×</i><div><b>저장하지 못했어요</b><span>네트워크를 확인하고 다시 시도해 주세요.</span></div></div></div>`
  },
  {
    id: 'cp-rtl', k: '글자 방향', e: 'Direction · RTL',
    d: '아랍어, 히브리어처럼 오른쪽에서 왼쪽으로 읽는 언어는 화면 배치도 거울처럼 뒤집혀요. 뒤로 가기 화살표와 목록의 화살표 방향도 바뀌어요.',
    u: '해외 진출을 고려한다면 margin-left 대신 margin-inline-start처럼 방향에 따라 바뀌는 속성으로 만들어 두세요. 시계, 재생 버튼, 로고처럼 뒤집으면 안 되는 것도 따로 정해 두세요.',
    de: 'Languages read right to left, such as Arabic and Hebrew, mirror the whole layout. The back arrow and list chevrons flip too.',
    ue: 'If you may localise later, build with logical properties such as margin-inline-start instead of margin-left. Also decide what must never flip, such as clocks, play buttons and logos.',
    html: `<div class="col"><div class="dsw"><b class="a">한국어 · LTR</b><b class="b">아랍어 · RTL</b></div><div class="ph s"><div class="ly l1"><div class="top"><i class="bk"></i><span class="ln h" style="width:45%"></span></div><span class="im"></span>${'<div class="rr"><i></i><span class="ln" style="width:60%;flex:none"></span><span style="flex:1"></span><i class="chv"></i></div>'.repeat(3)}</div><div class="ly l2"><div class="top"><i class="bk"></i><span class="ln h" style="width:45%"></span></div><span class="im"></span>${'<div class="rr"><i></i><span class="ln" style="width:60%;flex:none"></span><span style="flex:1"></span><i class="chv"></i></div>'.repeat(3)}</div></div></div>`
  },
  {
    id: 'cp-msg', k: '메시지', e: 'Message',
    d: '대화 한 줄을 프로필, 이름, 시간, 본문, 반응까지 묶은 단위예요. 마우스를 올리면 답장·반응·복사 같은 동작이 떠요.',
    u: '채팅, 댓글, AI 대화처럼 "누가 언제 무엇을 말했는지"가 중요한 곳에 써요. 동작 버튼은 평소엔 숨겼다가 필요할 때만 보여 주면 대화가 깔끔해요.',
    de: 'One line of conversation bundled with avatar, name, time, body and reactions. Hover it and actions such as reply, react and copy appear.',
    ue: 'Use it in chat, comments and AI conversations where who said what and when matters. Keeping the actions hidden until hover keeps the thread clean.',
    html: `<div class="pan box"><div class="m"><span class="av p1"></span><div class="bd"><span class="nm">지원<em>오후 3:10</em></span><p>포트폴리오 첫 장을 다시 봐 주실 수 있나요?</p></div></div><div class="m m2"><span class="av p2">멘</span><div class="bd"><span class="nm">멘토<em>오후 3:12</em></span><p>좋아요. 문제 정의가 훨씬 선명해졌어요.</p><span class="rc"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>1</span></div><div class="ab box"><span><svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></span><span><svg class="ic" viewBox="0 0 24 24"><path d="M10 8L5 13l5 5M5 13h9a5 5 0 0 0 5-5V6"/></svg></span><span><svg class="ic" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg></span></div></div></div>${CUR}<i class="tap"></i>`
  },
  {
    id: 'cp-bubble', k: '말풍선', e: 'Bubble',
    d: '메시지 본문을 감싸는 틀이에요. 받은 말은 왼쪽 회색, 보낸 말은 오른쪽 강조색이 기본이고, 테두리만 있는 선택지형과 틀 없는 형도 있어요.',
    u: '말풍선 모양만 보고도 누가 말했는지 알 수 있어야 해요. AI의 긴 답변은 틀 없이 문서처럼 두고, 짧은 대화나 추천 질문에만 말풍선을 씌우면 읽기 편해요.',
    de: 'The frame around a message body. Incoming text sits left in grey and outgoing text right in the accent colour; there are also outlined suggestion bubbles and frameless ones.',
    ue: 'The shape alone should tell people who is speaking. Leave long AI answers frameless like a document and save bubbles for short turns and suggested prompts.',
    html: `<div class="pan box"><span class="b in" style="--i:0">다음 주 면접 일정 알려 줄 수 있어요?</span><span class="b out" style="--i:1">화요일 오후 2시예요.</span><span class="b out" style="--i:2"><span class="q">면접 일정</span>준비물도 있나요?</span><span class="b gh" style="--i:3">신분증과 포트폴리오 출력본 1부를 챙겨 주세요.</span><div class="sg"><span class="b" style="--i:4">장소 알려 줘</span><span class="b" style="--i:4.4">복장도 궁금해</span></div></div>`
  },
  {
    id: 'cp-mscroll', k: '메시지 스크롤러', e: 'Message scroller',
    d: '새 메시지가 오면 맨 아래로 따라가고, 사용자가 위로 올려 읽는 중이면 위치를 지켜 줘요. 대신 "새 메시지" 버튼으로 알려 줘요.',
    u: '채팅, AI 답변 스트리밍처럼 내용이 계속 늘어나는 창에 꼭 필요해요. 예전 글을 읽는데 화면이 멋대로 맨 아래로 튀면 가장 답답해요.',
    de: 'Follows new messages to the bottom, but holds your place when you have scrolled up to read, and offers a “New messages” button instead.',
    ue: 'Essential for chat and streamed AI answers where content keeps growing. Nothing is more annoying than being yanked to the bottom while reading older messages.',
    html: `<div class="pan box"><div class="hd2"><span class="av"></span>면접 스터디</div><div class="vw"><div class="ct"><span><i style="--w:70%"></i></span><span class="o"><i style="--w:45%"></i></span><span><i style="--w:60%"></i></span><span><i style="--w:80%"></i></span><span class="o"><i style="--w:55%"></i></span><span class="n6"><i style="--w:65%"></i></span><span class="o n7"><i style="--w:50%"></i></span></div></div><span class="pl">새 메시지 1개</span><i class="tap"></i></div>`
  },
  {
    id: 'cp-attach', k: '첨부 파일', e: 'Attachment',
    d: '올린 파일이나 이미지를 미리보기, 이름, 크기, 업로드 상태와 함께 작은 카드로 보여줘요. 올리는 동안엔 반짝임과 진행 막대가 보여요.',
    u: '채팅 입력창, 게시글 작성, 문의 양식처럼 파일을 붙이는 곳에 써요. 실패하면 카드 안에 다시 시도 버튼을 두고, 빼기 버튼은 마우스를 올렸을 때 보여 주세요.',
    de: 'Shows an uploaded file or image as a small card with preview, name, size and upload status. While uploading it shimmers and shows a progress bar.',
    ue: 'Use it in chat composers, post editors and support forms. On failure, put a retry button inside the card, and reveal the remove button on hover.',
    html: `<div class="pan box"><div class="at"><div class="fc"><span class="fi">PDF</span><span class="ft2"><b>포트폴리오_최종.pdf</b><span class="mt"><span class="u1">올리는 중…</span><span class="u2">2.4MB · PDF</span></span></span><i class="pb"></i><i class="rm"></i></div><span class="ig"><span class="spn"></span></span></div><div class="ib2"><svg class="ic" viewBox="0 0 24 24"><path d="M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 17.2a1.7 1.7 0 0 1-2.4-2.4L15 7"/></svg><span>메시지를 입력하세요</span><b></b></div></div>`
  },
  {
    id: 'cp-marker', k: '대화 표시줄', e: 'Marker',
    d: '대화 흐름 사이에 들어가는 한 줄짜리 표시예요. "오늘" 같은 날짜 구분, "찾는 중…" 같은 진행 상태, "출처 6개를 읽었어요" 같은 메모를 보여줘요.',
    u: 'AI 대화에서 답이 나오기 전 무엇을 하고 있는지 알려 줄 때 특히 좋아요. 진행 중엔 반짝이는 글자로, 끝나면 체크와 걸린 시간으로 바꿔 주세요.',
    de: 'A single inline line inside a conversation: a date divider such as “Today”, a status such as “Searching…”, or a note such as “Read 6 sources”.',
    ue: 'Especially useful in AI chat to show what is happening before the answer arrives. Shimmer the text while in progress, then swap to a check and the time taken.',
    html: `<div class="pan box"><div class="dv"><i></i>오늘<i></i></div><span class="ub">이 회사 면접 후기 정리해 줘</span><div class="st"><span class="s1"><span class="spn"></span><b>후기를 찾는 중…</b></span><span class="s2">${CK.replace('<svg', '<svg')}출처 6개를 읽었어요<em>· 12초</em></span></div><div class="an"><span class="ln" style="width:90%;--i:0"></span><span class="ln" style="width:96%;--i:1"></span><span class="ln" style="width:70%;--i:2"></span></div></div>`
  },
  {
    id: 'cp-trace', k: '작업 단계 표시', e: 'Trace',
    d: 'AI 에이전트가 거친 단계를 한 줄씩 쌓아 보여줘요. 끝난 단계는 체크, 진행 중은 돌아가는 표시, 남은 단계는 흐린 점선으로 구분해요.',
    u: '검색, 도구 실행, 파일 수정처럼 시간이 걸리는 작업을 맡길 때 써요. 각 줄을 펼치면 어떤 출처를 봤는지, 무엇을 바꿨는지 확인할 수 있게 해 주세요.',
    de: 'Stacks the steps an AI agent takes, one line each. Finished steps get a check, the current one a spinner, and pending ones a faint dashed ring.',
    ue: 'Use it when people hand off long-running work such as searching, running tools or editing files. Let each line expand to show which sources were read or what changed.',
    html: `<div class="pan box"><span class="hd2">작업 과정</span><div class="ro"><span class="si">${CK}</span><span class="tt">질문 이해하기</span><em>1초</em></div><div class="ro"><span class="si">${CK}</span><span class="tt">웹 검색 · 출처 5개</span><em>8초</em><i class="cv"></i><i class="tap"></i></div><div class="ex"><div><span>채용 공고</span><span>기술 블로그</span><span>면접 후기 3</span></div></div><div class="ro"><span class="si"><span class="spn wa"></span><span class="wb">${CK}</span></span><span class="tt">회사 정보 정리<i class="sh wa"></i></span></div><div class="ro r4"><span class="si"><i class="pd wa"></i><span class="spn wd"></span><span class="we">${CK}</span></span><span class="tt">예상 질문 만들기<i class="sh wd"></i></span></div><div class="ro r5"><span class="si"><i class="pd wf"></i><span class="spn we"></span></span><span class="tt">답변 초안 검토<i class="sh we"></i></span></div></div>`
  },
  {
    id: 'cp-quest', k: '질문지', e: 'Questionnaire',
    d: '한 번에 질문 하나씩 보여 주고, 진행 막대와 "질문 1/3"으로 남은 양을 알려 주는 단계형 입력이에요. 하나만 고르기, 여러 개 고르기, 직접 쓰기를 섞을 수 있어요.',
    u: 'AI가 작업 전에 조건을 물을 때, 온보딩에서 취향을 받을 때 좋아요. 답을 고르기 전엔 "다음"을 흐리게 두고, 건너뛰기도 열어 두면 부담이 줄어요.',
    de: 'A step-by-step input that shows one question at a time with a progress bar and “Question 1 of 3”. It can mix single choice, multiple choice and free text.',
    ue: 'Good for an AI that needs requirements before starting, or for collecting preferences during onboarding. Keep Next dimmed until there is an answer, and allow Skip to lower the pressure.',
    html: `<div class="pan box"><div class="tp"><span class="nn"><b class="k1">질문 1 / 3</b><b class="k2">질문 2 / 3</b></span><span>건너뛸 수 있어요</span></div><div class="pr"><i></i></div><div class="bd"><div class="q q1"><h4>어떤 직무를 준비하고 있나요?</h4><span class="op"><i class="r"></i>디자인</span><span class="op s1"><i class="r"></i>개발</span><span class="op"><i class="r"></i>기획</span><i class="tap t1"></i></div><div class="q q2"><h4>무엇을 연습할까요?<em>여러 개</em></h4><span class="op s2"><i class="x"></i>기술 면접</span><span class="op"><i class="x"></i>인성 면접</span><span class="op s3"><i class="x"></i>과제 발표</span><i class="tap t3"></i><i class="tap t4"></i></div></div><div class="ftr"><span>이전</span><span class="bt">다음</span><i class="tap t2"></i></div></div>`
  },
  {
    id: 'cp-code', k: '코드 블록', e: 'Code block',
    d: '코드를 고정폭 글꼴, 줄 번호, 색 구분과 함께 보여주는 상자예요. 오른쪽 위 복사 버튼을 누르면 "복사됨"으로 바뀌어 결과를 알려 줘요.',
    u: '개발 문서, AI 답변, 설정 안내처럼 그대로 옮겨 써야 하는 글에 써요. 길면 가로 스크롤을 주되 줄바꿈으로 코드가 깨지지 않게 하고, 설명할 줄은 배경색으로 강조하세요.',
    de: 'Shows code in a monospaced font with line numbers and syntax colours. The copy button in the corner turns into “Copied” to confirm.',
    ue: 'Use it in developer docs, AI answers and setup guides where text must be copied exactly. Scroll long lines horizontally instead of wrapping, and highlight the line you are discussing.',
    html: `<div class="cb2"><div class="hd4"><b>button.css</b><em>CSS</em><span class="cp"><svg class="k1" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg><svg class="k2" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span class="tip">복사됨</span><i class="tap"></i></span></div><pre><span data-n="1"><b class="p">.button</b> {</span><span data-n="2">  <i class="v">padding</i>: <i class="s">12px 16px</i>;</span><span data-n="3" class="hl">  <i class="v">border-radius</i>: <i class="s">14px</i>;</span><span data-n="4">  <i class="v">background</i>: <i class="s">#3182F6</i>;</span><span data-n="5">}</span></pre></div>`
  }
);
})();
