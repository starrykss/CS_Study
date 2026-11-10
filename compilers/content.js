(() => {
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: o.html || '', cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'cp-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */

/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono cp-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono cp-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c cp-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- compiler helpers ---- */
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const nd = (S, k, x, y, w, label, color, st, o = {}) => box(S, k, x - w / 2, y - .8, w, 1.6, label, color, st, o);
const lnk = (S, k, a, b, st, o = {}) => seg(S, k, [a[0], a[1] + .8], [b[0], b[1] - .8], st, o.color || 'ink-3', .1, { off: o.off });
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off }); };
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.25;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 7, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh * (hi[0][2] || 1), 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s, n]) => { S.move(k + 'hl', s, x + .2, y + .25 + l * lh); if (n) S.set(k + 'hl', s, { height: (lh * n) + 'em' }); }); }
  lines.forEach((t, i) => { const L = Array.isArray(t) && typeof t[1] === 'number' ? t : [t, o.st || 0]; T(S, k + i, x + .5, y + .3 + i * lh, L[0], 'cz-mono cp-code ' + (L[2] || ''), L[1], { css: 'z-index:6', off: L[3] || o.off }); });
}
/* tree from nested spec: [label, color, children] laid out by leaf order */
function tree(S, k, spec, x0, y0, dx, dy, st, o = {}) {
  let leaf = 0; const place = (n, d) => { const [lab, col, kids = []] = n; let x; if (!kids.length) x = x0 + (leaf++) * dx; else { const xs = kids.map(c => place(c, d + 1)); x = (xs[0][0] + xs[xs.length - 1][0]) / 2; n.kx = xs; } n.x = x; n.y = y0 + d * dy; return [x, n.y]; };
  place(spec, 0); let id = 0;
  const draw = n => { const me = k + (id++), [lab, col, kids = []] = n, w = kids.length ? Math.max(o.w || 2.6, String(lab).length * .42 + .7) : (o.w || 2.6); nd(S, me, n.x, n.y, w, lab, col || 'line', st, { pct: o.pct || 30, off: o.off }); kids.forEach((c, j) => { lnk(S, me + 'e' + j, [n.x, n.y], [c.x, c.y], st, { off: o.off }); draw(c); }); };
  draw(spec);
}

/* ================= front end ================= */
function sLex() {
  const S = scene({ id: 'cp-lex', steps: 5, per: 1.4 });
  const src = 'let total = price * 2 + 10;', cw = 1.02, X = 2;
  src.split('').forEach((c, i) => box(S, 'c' + i, X + i * cw, 2.2, cw - .1, 1.6, c === ' ' ? '·' : c, 'line', 0, { pct: c === ' ' ? 8 : 22 }));
  const toks = [[0, 3, 'let', 'KEYWORD', 'warn', 2], [4, 9, 'total', 'IDENT', 'accent', 2], [10, 11, '=', 'ASSIGN', 'ink-3', 2], [12, 17, 'price', 'IDENT', 'accent', 3], [18, 19, '*', 'STAR', 'ink-3', 3], [20, 21, '2', 'NUMBER', 'ok', 3], [22, 23, '+', 'PLUS', 'ink-3', 3], [24, 26, '10', 'NUMBER', 'ok', 3], [26, 27, ';', 'SEMI', 'ink-3', 3]];
  toks.forEach(([a, b, , , c, st]) => { for (let i = a; i < b; i++) tsets(S, 'c' + i, [[st, c, 45]]); });
  toks.forEach(([, , t, ty, c, st], j) => { const x = 1 + (j % 5) * 6.1, y = 6.4 + Math.floor(j / 5) * 3.2; box(S, 't' + j, x, y, 5.7, 1.7, t, c, 4, { pct: 40 }); T(S, 'ty' + j, x, y + 1.85, ty, 'cz-tc cz-mono cp-xs', 4, { w: 5.7 }); });
  T(S, 'n1', 1, 4.4, ['문자를 하나씩 읽으며 의미 있는 덩어리(토큰)로 묶어요 · 공백과 주석은 버려요', 'read characters one by one and group them into meaningful chunks (tokens) · whitespace and comments are dropped'], 'cp-xs', 1);
  T(S, 'n4', 1, 13.6, ['파서는 이제 글자가 아니라 토큰 9개를 받아요 (각 토큰에 줄·열 위치도 기록)', 'the parser now receives nine tokens instead of characters (each with its line and column)'], 'cp-s', 4);
  T(S, 'n5', 1, 15.6, ['최장 일치: >=는 > 와 = 가 아니라 하나의 토큰 · iffy는 키워드 if가 아니라 식별자', 'longest match: >= is one token, not > then = · iffy is an identifier, not the keyword if'], 'cp-xs', 5);
  T(S, 'n6', 1, 16.9, ['닫히지 않은 문자열 같은 오류는 여기서 “3행 12열”처럼 위치와 함께 보고해요', 'errors such as an unterminated string are reported here with a position like “line 3, column 12”'], 'cp-xs', 5);
  S.cap(1, '컴파일러가 처음 보는 것은 그냥 문자의 줄이에요', 'At first the compiler sees only a row of characters')
    .cap(2, '렉서가 글자를 묶어 키워드·이름·기호로 나눠요', 'The lexer groups them into keywords, names and symbols')
    .cap(3, '숫자와 연산자도 각각 토큰이 돼요', 'Numbers and operators become tokens too')
    .cap(4, '결과는 종류가 붙은 토큰의 목록', 'The result is a list of typed tokens')
    .cap(5, '어휘 분석(렉싱): 컴파일의 첫 단계', 'Lexical analysis: the first stage of compiling');
  return S;
}
function sDfa() {
  const S = scene({ id: 'cp-dfa', steps: 5, per: 1.4 });
  const st = (k, x, y, l, acc, s, o) => { ring(S, k, x, y, 1.5, acc ? 'ok' : 'ink-3', s || 0, { w: acc ? .22 : .12, fill: 'var(--ui)', off: o }); T(S, k + 't', x - 1.5, y - .45, l, 'cz-tc cz-mono cp-xs', s || 0, { w: 3, off: o }); };
  st('s0', 4, 8, 'start'); st('s1', 13, 3.6, 'ID', 1); st('s2', 13, 8, 'NUM', 1); st('s3', 13, 12.4, '>', 1); st('s4', 21, 12.4, '>=', 1);
  ar(S, 'e1', [5.4, 7.3], [11.6, 4.2], 'ink-3', 0, { h: .1 }); T(S, 'e1l', 6.6, 4.6, ['글자', 'letter'], 'cp-xs'); ar(S, 'e2', [5.5, 8], [11.5, 8], 'ink-3', 0, { h: .1 }); T(S, 'e2l', 7.6, 7, ['숫자', 'digit'], 'cp-xs');
  ar(S, 'e3', [5.4, 8.7], [11.6, 11.8], 'ink-3', 0, { h: .1 }); T(S, 'e3l', 7.4, 10.8, "'>'", 'cz-mono cp-xs'); ar(S, 'e4', [14.5, 12.4], [19.5, 12.4], 'ink-3', 0, { h: .1 }); T(S, 'e4l', 16.4, 11.3, "'='", 'cz-mono cp-xs');
  T(S, 'l1', 15, 2.2, ['↺ 글자·숫자', '↺ letter or digit'], 'cp-xs'); T(S, 'l2', 15, 6.8, ['↺ 숫자', '↺ digit'], 'cp-xs');
  ring(S, 'h1', 4, 8, 1.8, 'accent', 2, { w: .2, off: 3 }); ring(S, 'h2', 13, 3.6, 1.8, 'accent', 2, { w: .2, off: 3 });
  T(S, 'r2', 23.4, 3, ['입력 "x1": start → ID → ID', 'input “x1”: start → ID → ID'], 'cp-xs', 2);
  ring(S, 'h3', 21, 12.4, 1.8, 'warn', 3, { w: .2, off: 4 }); T(S, 'r3', 23.4, 11.4, ['">=": 갈 수 있는 데까지', '“>=”: read as far as possible'], 'cp-xs cp-w', 3); T(S, 'r3b', 23.4, 12.6, ['→ 하나의 토큰', '→ a single token'], 'cp-xs cp-w', 3);
  T(S, 'r4', 23.4, 5.4, ['"if"·"iffy" 모두 ID까지 읽고', '“if” and “iffy” scan as ID'], 'cp-xs', 4);
  T(S, 'r4b', 23.4, 6.6, ['키워드 표에서 if만 키워드로', 'then a table flags if'], 'cp-xs cp-a', 4);
  T(S, 'n6', 1, 17.7, ['GCC·Clang·Go·Rust는 대부분 손으로 짠 렉서를 써요 (오류 메시지·속도)', 'GCC, Clang, Go and Rust mostly hand-write their lexers (errors, speed)'], 'cp-xs', 5);
  S.cap(1, '렉서는 상태와 전이로 된 유한 오토마타(DFA)예요', 'A lexer is a finite automaton (DFA) of states and transitions')
    .cap(2, '글자마다 화살표를 따라가고, 받아들이는 상태에서 토큰이 돼요', 'Each character follows an arrow; accepting states yield tokens')
    .cap(3, '갈 수 있는 한 가장 길게 읽어요 (최장 일치)', 'It reads as far as it can (longest match)')
    .cap(4, '키워드는 식별자로 읽은 뒤 표에서 구분해요', 'Keywords are scanned as identifiers, then looked up')
    .cap(5, '정규식에서 렉서를 자동으로 만들 수 있어요', 'Lexers can be generated from regular expressions');
  return S;
}
function sGrammar() {
  const S = scene({ id: 'cp-grammar', steps: 5, per: 1.4 });
  code(S, 'g', 1, 1.4, 14, ['expr   → expr + term   | term', 'term   → term * factor | factor', 'factor → NUM | ( expr )'], [[0, 2], [1, 3]]);
  const D = [['expr', 1], ['expr + term', 2], ['term + term', 2], ['factor + term', 2], ['2 + term', 2], ['2 + term * factor', 3], ['2 + factor * factor', 3], ['2 + 3 * factor', 3], ['2 + 3 * 4', 3]];
  T(S, 'dh', 20, 1.4, ['유도 (가장 왼쪽부터)', 'leftmost derivation'], 'cp-xs', 1);
  D.forEach(([d, st], i) => T(S, 'd' + i, 20, 2.8 + i * 1.35, (i ? '⇒ ' : '') + d, 'cz-mono cp-s' + (i === D.length - 1 ? ' cp-g' : ''), st));
  T(S, 'n1', 1, 6.4, ['규칙을 반복 적용해 문장을 만들어요', 'apply the rules repeatedly to build sentences'], 'cp-xs', 1);
  T(S, 'n4', 1, 15.6, ['*는 term 단계, +는 expr 단계 → *가 트리에서 더 깊이 들어가 먼저 계산돼요', '* lives at the term level and + at expr → * sits deeper in the tree and binds tighter'], 'cp-xs cp-a', 4, { off: 5 });
  T(S, 'n4b', 1, 16.9, ['expr → expr + term 처럼 왼쪽에 자기 자신 → 왼쪽 결합 (1 − 2 − 3 = (1 − 2) − 3)', 'expr on the left of its own rule → left-associative (1 − 2 − 3 = (1 − 2) − 3)'], 'cp-xs', 4, { off: 5 });
  T(S, 'n5', 1, 15.6, ['BNF·EBNF로 언어의 문법을 정확히 적어요 (JSON, SQL, 파이썬 명세)', 'BNF and EBNF pin syntax down exactly (the JSON, SQL and Python specs)'], 'cp-xs', 5);
  T(S, 'n5b', 1, 16.9, ['파서 생성기(ANTLR, yacc·bison)의 입력이기도 해요', 'they also feed parser generators (ANTLR, yacc/bison)'], 'cp-xs', 5);
  S.cap(1, '문맥 자유 문법은 기호를 바꿔 쓰는 규칙의 모음', 'A context-free grammar is a set of rewrite rules')
    .cap(2, '시작 기호에서 규칙을 하나씩 적용하면', 'Start from the start symbol and apply rules one at a time')
    .cap(3, '최종적으로 2 + 3 * 4가 만들어져요', 'until you reach 2 + 3 * 4')
    .cap(4, '규칙의 층이 연산자 우선순위와 결합 방향을 정해요', 'The layering of rules encodes precedence and associativity')
    .cap(5, '문법: 언어의 모양을 정의하는 명세', 'A grammar: the specification of a language’s shape');
  return S;
}
function sAmbig() {
  const S = scene({ id: 'cp-ambig', steps: 5, per: 1.4 });
  T(S, 'g', 1, 1.2, 'E → E + E | E * E | NUM', 'cz-mono cp-s'); T(S, 'in', 18, 1.2, ['입력: 1 + 2 * 3', 'input: 1 + 2 * 3'], 'cz-mono cp-s');
  tree(S, 'a', ['*', 'danger', [['+', 'danger', [['1'], ['2']]], ['3']]], 2.5, 4.4, 3.2, 3.2, 2);
  T(S, 'av', 1, 14.2, '(1 + 2) * 3 = 9', 'cz-mono cp-s cp-r', 2);
  tree(S, 'b', ['+', 'ok', [['1'], ['*', 'ok', [['2'], ['3']]]]], 19, 4.4, 3.2, 3.2, 3);
  T(S, 'bv', 17.6, 14.2, '1 + (2 * 3) = 7', 'cz-mono cp-s cp-g', 3);
  T(S, 'n4', 1, 16, ['한 입력에 트리가 둘 → 모호한 문법 · 우선순위 층을 나누거나', 'two trees for one input → ambiguous · layer the precedence'], 'cp-xs', 4);
  T(S, 'n4b', 1, 17.2, ['파서 생성기에 %left \'+\' %left \'*\' 처럼 선언해 해결', 'or declare %left \'+\' %left \'*\' to the parser generator'], 'cz-mono cp-xs', 4);
  T(S, 'n5', 1, 18.6, ['고전적 예: 매달린 else는 가장 가까운 if에 붙이기로 약속', 'the classic: a dangling else binds to the nearest if'], 'cp-xs', 5);
  S.cap(1, '규칙이 너무 단순하면', 'With rules this simple')
    .cap(2, '+를 먼저 묶는 트리도 만들어지고', 'one tree groups the + first')
    .cap(3, '*를 먼저 묶는 트리도 만들어져요', 'and another groups the * first')
    .cap(4, '뜻이 달라지므로 문법이나 규칙으로 하나를 골라야 해요', 'They mean different things, so the grammar must choose')
    .cap(5, '모호성: 문법 설계의 대표적 함정', 'Ambiguity: the classic pitfall of grammar design');
  return S;
}
function sRd() {
  const S = scene({ id: 'cp-rd', steps: 5, per: 1.4 });
  code(S, 'c', 1, 1.2, 15, ['expr():', '  n = term()', '  while tok == "+": next(); n = Add(n, term())', 'term():', '  n = factor()', '  while tok == "*": next(); n = Mul(n, factor())', 'factor():', '  return Num(next())'], [[6, 1, 2], [0, 2, 3], [3, 3, 3], [0, 4, 3]], { lh: 1.2 });
  const tk = ['2', '+', '3', '*', '4'];
  tk.forEach((t, i) => box(S, 'k' + i, 18 + i * 2.6, 1.2, 2.3, 1.7, t, 'line', 0, { pct: 25 }));
  pt(S, 'ptr', 19.15, 3.5, 1, C.badf, .3); S.move('ptr', 2, 18 + 2 * 2.6 + 1.15 - .3, 3.2); S.move('ptr', 3, 18 + 4 * 2.6 + 1.15 - .3, 3.2); S.move('ptr', 4, 18 + 5 * 2.6 + .2 - .3, 3.2);
  const stk = (k, items, st, off) => items.forEach((t, i) => box(S, k + i, 18, 15 - i * 1.9, 9, 1.6, t, i === items.length - 1 ? 'accent' : 'line', st, { pct: 30, off }));
  T(S, 'sh', 18, 16.9, ['호출 스택', 'call stack'], 'cp-xs');
  stk('s1', ['expr', 'term', 'factor → 2'], 1, 2); stk('s2', ['expr: 2 + …', 'term', 'factor → 3'], 2, 3); stk('s3', ['expr: 2 + …', 'term: 3 * …', 'factor → 4'], 3, 4);
  tree(S, 't', ['+', 'ok', [['2'], ['*', 'ok', [['3'], ['4']]]]], 21, 5.6, 2.8, 2.6, 4, { w: 2.2 });
  T(S, 'n5', 1, 12.4, ['문법 규칙 하나 = 함수 하나 · 우선순위가 호출 깊이로 자연스럽게 표현돼요', 'one grammar rule = one function · precedence falls out of call depth'], 'cp-xs', 5);
  T(S, 'n6', 1, 13.7, ['GCC·Clang·Go·Rust·V8 모두 손으로 짠 재귀 하강 파서', 'GCC, Clang, Go, Rust and V8 all use hand-written recursive descent'], 'cp-xs', 5);
  T(S, 'n7', 1, 15, ['왼쪽 재귀(expr → expr + …)는 무한 호출이라 while 반복으로 바꿔요', 'left recursion (expr → expr + …) would loop forever, so it becomes a while loop'], 'cp-xs cp-r', 5);
  S.cap(1, 'factor()가 숫자 2를 읽어요', 'factor() reads the number 2')
    .cap(2, '+를 보면 expr이 다시 term을 불러 오른쪽을 읽고', 'On +, expr calls term again for the right side')
    .cap(3, '*는 term 안에서 처리되어 더 깊이 묶여요', '* is handled inside term, so it binds deeper')
    .cap(4, '호출이 끝나면 우선순위가 맞는 트리가 완성', 'When the calls return, the tree has the right precedence')
    .cap(5, '재귀 하강 파서: 문법을 그대로 함수로', 'Recursive descent: the grammar written as functions');
  return S;
}
function sLr() {
  const S = scene({ id: 'cp-lr', steps: 5, per: 1.4 });
  const R = [['$', '1 + 2 * 3 $', 'shift'], ['$ 1', '+ 2 * 3 $', 'reduce F → num'], ['$ F', '+ 2 * 3 $', 'reduce T → F'], ['$ T', '+ 2 * 3 $', 'reduce E → T'], ['$ E', '+ 2 * 3 $', 'shift'], ['$ E +', '2 * 3 $', 'shift'], ['$ E + 2', '* 3 $', 'reduce …→ T'], ['$ E + T', '* 3 $', ['shift (*가 우선)', 'shift (* binds tighter)']], ['$ E + T *', '3 $', 'shift'], ['$ E + T * 3', '$', 'reduce T → T * F'], ['$ E + T', '$', 'reduce E → E + T'], ['$ E', '$', 'accept ✓']];
  T(S, 'h0', 1, 1.2, ['스택', 'stack'], 'cp-xs cp-a'); T(S, 'h1', 11, 1.2, ['남은 입력', 'remaining input'], 'cp-xs'); T(S, 'h2', 20, 1.2, ['동작', 'action'], 'cp-xs');
  R.forEach(([a, b, c], i) => { const st = i < 3 ? 1 : i < 6 ? 2 : i < 9 ? 3 : 4, red = (Array.isArray(c) ? c[1] : c).startsWith('reduce'); T(S, 'a' + i, 1, 2.5 + i * 1.3, a, 'cz-mono cp-s cp-a', st); T(S, 'b' + i, 11, 2.5 + i * 1.3, b, 'cz-mono cp-s', st);
    T(S, 'c' + i, 20, 2.5 + i * 1.3, c, 'cz-mono cp-s ' + (red ? 'cp-w' : i === 11 ? 'cp-g' : ''), st); });
  rect(S, 'hl', .6, 2.3 + 7 * 1.3, 30.8, 1.3, 'accent', 18, 3, { r: .2 });
  T(S, 'n5', 1, 18.4, ['파서 생성기(yacc·bison)가 문법에서 이 결정 표(LALR)를 만들어요', 'parser generators (yacc, bison) compute this decision table (LALR)'], 'cp-xs', 5);
  T(S, 'n5b', 1, 19.6, ['결정이 두 개면 shift/reduce 충돌 경고', 'two possible moves = a shift/reduce conflict warning'], 'cp-xs cp-r', 5);
  S.cap(1, '토큰을 스택에 올리고(shift) 규칙 오른쪽이 보이면 줄여요(reduce)', 'Push tokens (shift) and replace rule bodies with their heads (reduce)')
    .cap(2, '1은 F → T → E로 차례로 줄어들어요', '1 is reduced to F, then T, then E')
    .cap(3, '* 앞에선 E + T를 줄이지 않고 계속 쌓아요', 'Before *, it keeps shifting instead of reducing E + T')
    .cap(4, '곱셈을 먼저 줄이고 덧셈은 마지막에', 'The multiplication reduces first, the addition last')
    .cap(5, 'LR 파싱: 아래에서 위로 트리를 쌓는 방식', 'LR parsing builds the tree bottom-up');
  return S;
}
function sAst() {
  const S = scene({ id: 'cp-ast', steps: 5, per: 1.4 });
  T(S, 'src', 1, 1.2, 'x = (a + b) * 2;', 'cz-mono cp-s');
  tree(S, 'p', ['stmt', 'line', [['x'], ['='], ['expr', 'line', [['term', 'line', [['term', 'line', [['factor', 'line', [['('], ['expr', 'line', [['a'], ['+'], ['b']]], [')']]]]], ['*'], ['factor', 'line', [['2']]]]]]], [';']]], 1.4, 3, 1.9, 2.3, 1, { w: 1.6, pct: 18, off: 3 });
  T(S, 'pl', 1, 18.6, ['파스 트리: 문법 규칙이 전부 드러나요 (노드 20개)', 'parse tree: every grammar rule shows (20 nodes)'], 'cp-xs', 1, { off: 3 });
  tree(S, 'a', ['Assign', 'accent', [['x', 'line'], ['Mul', 'warn', [['Add', 'ok', [['a'], ['b']]], ['2']]]]], 20.4, 4, 3, 3, 2, { w: 2.4 });
  T(S, 'al', 1, 16.4, ['AST: 의미에 필요한 것만 (노드 7개) · 괄호는 사라지고 구조로 남아요', 'AST: only what matters for meaning (7 nodes) · parentheses vanish into the structure'], 'cp-s', 3);
  T(S, 'w', 1, 18, ['트리를 따라 내려가며 타입 검사·코드 생성 → 아래에서 위로 a + b를 먼저, 그다음 * 2', 'later passes walk the tree for type checking and code generation → a + b first, then * 2'], 'cp-xs', 4);
  T(S, 'u', 1, 19.3, ['Babel·ESLint·Prettier, 파이썬 ast 모듈, tree-sitter 모두 AST를 다뤄요 (astexplorer.net)', 'Babel, ESLint, Prettier, Python’s ast module and tree-sitter all work on ASTs (astexplorer.net)'], 'cp-xs', 5);
  S.cap(1, '파서는 먼저 문법을 그대로 따라 파스 트리를 만들어요', 'Parsing first yields a parse tree that mirrors the grammar')
    .cap(2, '필요 없는 중간 노드를 걷어 내면 AST', 'Strip the bookkeeping nodes and you get an AST')
    .cap(3, '괄호나 세미콜론은 트리 모양에 녹아들어요', 'Parentheses and semicolons melt into the tree’s shape')
    .cap(4, '이후 단계는 모두 AST를 순회하며 일해요', 'Every later stage walks the AST')
    .cap(5, '추상 구문 트리: 프로그램의 뼈대', 'The abstract syntax tree: a program’s skeleton');
  return S;
}
function sSymtab() {
  const S = scene({ id: 'cp-symtab', steps: 5, per: 1.4 });
  code(S, 'c', 1, 1.2, 14, ['int x = 1;', 'void f(int y) {', '  int x = 2;', '  { int z = x + y; }', '}', 'f(x);'], [[0, 1], [1, 2, 2], [3, 3], [3, 4], [5, 5]]);
  const sc = (k, x, y, w, h, t, rows, color, st, off) => { rect(S, k, x, y, w, h, color, 10, st, { r: .4, off }); T(S, k + 't', x + .4, y + .3, t, 'cp-xs', st, { off }); rows.forEach((r, i) => T(S, k + i, x + .6, y + 1.5 + i * 1.2, r, 'cz-mono cp-xs', st, { off })); };
  sc('g', 17, 1.2, 14, 4.4, ['전역 스코프', 'global scope'], ['x : int = 1', 'f : (int) → void'], 'accent', 1);
  sc('f', 17, 6.4, 14, 4.4, ['f의 스코프', 'scope of f'], [['y : int (매개변수)', 'y : int (parameter)'], 'x : int = 2'], 'warn', 2);
  sc('b', 17, 11.6, 14, 3.2, ['블록 스코프', 'block scope'], ['z : int'], 'ok', 3);
  ar(S, 'p1', [24, 6.3], [24, 5.7], 'ink-3', 2, { h: .12 }); ar(S, 'p2', [24, 11.5], [24, 10.9], 'ink-3', 3, { h: .12 });
  T(S, 'q', 1, 10.4, ['z = x + y 의 x는? 블록 → f 순으로 찾아 x = 2 (가림)', 'which x in z = x + y? search block → f, found x = 2 (shadowing)'], 'cp-xs cp-w', 3);
  rect(S, 'hx', 17.2, 8.9, 13.6, 1.1, 'warn', 30, 3, { r: .2, off: 4 });
  T(S, 'q2', 1, 11.8, ['블록을 나오면 그 표는 버려요 → z는 밖에서 안 보여요', 'leaving the block discards its table → z is invisible outside'], 'cp-xs', 4);
  T(S, 'q3', 1, 13.2, ['f(x)의 x는 전역 x = 1', 'the x in f(x) is the global x = 1'], 'cp-xs cp-a', 5);
  T(S, 'n5', 1, 16.4, ['“선언되지 않은 변수”, “이미 선언됨” 오류가 여기서 나와요', '“undeclared variable” and “already declared” errors come from here'], 'cp-xs', 5);
  T(S, 'n5b', 1, 17.6, ['이후 단계는 이름 대신 심볼 정보(타입, 저장 위치)를 써요', 'later stages use symbol info (type, storage) instead of names'], 'cp-xs', 5);
  T(S, 'n6', 1, 18.9, ['IDE의 정의로 이동·이름 바꾸기도 같은 표를 써요', 'IDE go-to-definition and rename use the same tables'], 'cp-xs', 5);
  S.cap(1, '이름이 선언되면 지금 스코프의 표에 기록해요', 'Each declaration is recorded in the current scope’s table')
    .cap(2, '함수에 들어가면 새 표를 바깥 표에 연결해요', 'Entering a function chains a new table to the outer one')
    .cap(3, '이름은 안쪽부터 바깥쪽으로 찾아요 (가장 가까운 선언)', 'Names are looked up innermost first (nearest declaration)')
    .cap(4, '스코프를 나오면 그 이름들은 사라져요', 'Leaving a scope drops its names')
    .cap(5, '심볼 테이블: 이름과 그 의미를 잇는 표', 'Symbol tables connect names to what they mean');
  return S;
}
function sTypes() {
  const S = scene({ id: 'cp-types', steps: 5, per: 1.4 });
  T(S, 'src', 1, 1.2, 'len(name) + 1', 'cz-mono cp-s');
  tree(S, 't', ['+', 'line', [['call len', 'line', [['name']]], ['1']]], 6, 4, 6, 3.4, 0, { w: 4.2 });
  const ty = (k, x, y, t, st, c) => T(S, k, x, y, t, 'cz-tc cz-mono cp-xs ' + (c || 'cp-a'), st, { w: 6 });
  ty('a1', 3, 11.9, 'string', 1); ty('a2', 9, 8.5, 'int', 1);
  T(S, 'b2', 0, 6.9, 'int', 'cz-tc cz-mono cp-xs cp-w', 2, { w: 3.6 });
  ty('c1', 6, 2, 'int ✓', 3, 'cp-g');
  T(S, 'r1', 15.6, 3, ['규칙: int + int → int', 'rule: int + int → int'], 'cz-mono cp-xs', 3); T(S, 'r2', 15.6, 4.3, ['f: A → B, x: A ⊢ f(x): B', 'f: A → B, x: A ⊢ f(x): B'], 'cz-mono cp-xs', 2);
  code(S, 'e', 15.6, 7, 15.4, ['let n: number = "42" * true;'], [], { st: 4 });
  T(S, 'e1', 15.6, 9.4, ['error: string * boolean 연산 없음', 'error: no * for string and boolean'], 'cz-mono cp-xs cp-r', 4); T(S, 'e2', 15.6, 10.7, ['  --> main.ts:3:17', '  --> main.ts:3:17'], 'cz-mono cp-xs', 4);
  T(S, 'n5', 1, 15.6, ['정적 타입 검사: 실행 전에 오류를 잡고, 코드 생성에 크기·레이아웃 정보를 줘요 (TypeScript, Java, Rust, Go)', 'static checking catches errors before running and tells code generation sizes and layouts (TypeScript, Java, Rust, Go)'], 'cp-xs', 5);
  T(S, 'n6', 1, 16.9, ['동적 타입 언어(파이썬, JS)는 같은 검사를 실행 중에 해요 · 그래서 mypy·TypeScript 같은 도구가 생겼어요', 'dynamic languages (Python, JS) do these checks at run time · hence tools such as mypy and TypeScript'], 'cp-xs', 5);
  S.cap(1, '잎부터 타입을 붙여요: name은 string, 1은 int', 'Type the leaves first: name is a string, 1 an int')
    .cap(2, '함수 타입 규칙으로 len(name)은 int', 'By the function rule, len(name) is an int')
    .cap(3, '덧셈 규칙에 맞으니 전체도 int', 'The addition rule fits, so the whole is an int')
    .cap(4, '규칙에 맞는 게 없으면 위치와 함께 오류', 'No rule fits? Report an error with its location')
    .cap(5, '타입 검사: 아래에서 위로 규칙 적용', 'Type checking applies rules bottom-up');
  return S;
}
function sInfer() {
  const S = scene({ id: 'cp-infer', steps: 5, per: 1.4 });
  code(S, 'c', 1, 1.2, 15, ['let add1 = x => x + 1', 'let id   = x => x', 'id(5);  id("hi");'], [[0, 1], [1, 4], [2, 5]]);
  T(S, 'h', 17.6, 1.2, ['제약 모으기 → 풀기(단일화)', 'collect constraints → solve (unify)'], 'cp-xs');
  const L = [['x : α', 1, ''], ['+ : int × int → int', 2, ''], ['α = int', 2, 'cp-w'], ['x + 1 : int', 3, ''], ['add1 : int → int', 3, 'cp-g'], ['id : ∀α. α → α', 4, 'cp-g'], ['id(5) : int · id("hi") : string', 5, 'cp-a']];
  L.forEach(([t, st, c], i) => T(S, 'l' + i, 17.6, 2.8 + i * 1.5, t, 'cz-mono cp-s ' + c, st));
  T(S, 'n2', 1, 6.4, ['모르는 타입은 변수 α로 두고, 쓰임새에서 등식을 모아요', 'unknown types start as variables α; uses add equations'], 'cp-xs', 2);
  T(S, 'n3', 1, 7.7, ['등식을 풀면 α = int → 타입을 안 써도 int → int', 'solving gives α = int → int → int with no annotations'], 'cp-xs', 3);
  T(S, 'n4', 1, 9, ['아무 제약도 없으면 일반화: 어떤 타입이든 받는 제네릭 함수', 'with no constraint left, generalize: a generic function for any type'], 'cp-xs cp-g', 4);
  T(S, 'n5', 1, 15, ['힌들리-밀너 타입 추론 (ML, OCaml, Haskell) · Rust·TypeScript·Kotlin·Swift는 지역 추론으로 타입 표기를 줄여요', 'Hindley–Milner inference (ML, OCaml, Haskell) · Rust, TypeScript, Kotlin and Swift use local inference to trim annotations'], 'cp-xs', 5);
  T(S, 'n6', 1, 16.3, ['let x = 5 를 쓰면 컴파일러가 int를 알아내는 것도 같은 원리', 'the same idea lets let x = 5 be inferred as int'], 'cp-xs', 5);
  S.cap(1, '타입이 안 적힌 x에 일단 미지수 α를 붙여요', 'Give the unannotated x an unknown type α')
    .cap(2, '+가 int를 요구하므로 α = int라는 제약이 생겨요', '+ demands ints, adding the constraint α = int')
    .cap(3, '풀면 add1의 타입이 int → int로 정해져요', 'Solving fixes add1 as int → int')
    .cap(4, '제약이 없으면 모든 타입에 쓸 수 있는 제네릭 타입', 'No constraints? It becomes generic over every type')
    .cap(5, '타입 추론: 적지 않아도 타입을 알아내요', 'Type inference: types without writing them');
  return S;
}

/* ================= middle: IR & optimization ================= */
function sTac() {
  const S = scene({ id: 'cp-tac', steps: 5, per: 1.4 });
  T(S, 'src', 1, 1.2, 'a = b * c + d * e', 'cz-mono cp-s');
  tree(S, 'n', ['=', 'line', [['a'], ['+', 'line', [['*', 'line', [['b'], ['c']]], ['*', 'line', [['d'], ['e']]]]]]], 2, 4, 2.9, 3, 0, { w: 2.2 });
  [[3, 1, 'accent'], [6, 2, 'warn'], [2, 3, 'ok'], [0, 4, 'danger']].forEach(([id, st, c]) => tsets(S, 'n' + id, [[st, c, 45]]));
  T(S, 'h', 17, 2.4, ['3주소 코드', 'three-address code'], 'cp-xs');
  code(S, 'c', 17, 3.6, 14, [['t1 = b * c', 1], ['t2 = d * e', 2], ['t3 = t1 + t2', 3], ['a  = t3', 4]], [[0, 1], [1, 2], [2, 3], [3, 4]]);
  T(S, 'n1', 1, 15.2, ['트리를 아래에서 위로 돌며 연산 하나마다 임시 변수 하나', 'walk the tree bottom-up, one temporary per operation'], 'cp-xs', 4);
  T(S, 'n1b', 1, 16.4, ['명령어는 “결과 = 피연산자 연산 피연산자” 꼴', 'every instruction is “result = operand op operand”'], 'cp-xs', 4);
  T(S, 'n2', 1, 17.6, ['기계어와 비슷하지만 레지스터 제한이 없고 CPU와 무관해 최적화하기 좋아요', 'close to machine code, yet CPU-neutral with unlimited temporaries'], 'cp-xs', 5);
  T(S, 'n2b', 1, 18.8, ['LLVM IR, JVM 바이트코드도 비슷한 중간 표현', 'LLVM IR and JVM bytecode are cousins'], 'cp-xs', 5);
  S.cap(1, '가장 깊은 b * c부터 임시 변수 t1에 담아요', 'Start with the deepest b * c, stored in temporary t1')
    .cap(2, 'd * e는 t2', 'd * e becomes t2')
    .cap(3, '두 결과를 더해 t3', 'Add the two results into t3')
    .cap(4, '마지막으로 a에 대입', 'Finally assign to a')
    .cap(5, '3주소 코드: 컴파일러 중간 표현의 기본형', 'Three-address code: the basic intermediate representation');
  return S;
}
function sCfg() {
  const S = scene({ id: 'cp-cfg', steps: 5, per: 1.4 });
  code(S, 'c', 1, 1.4, 13, ['i = 0', 's = 0', 'L1: if i >= n goto L2', 's = s + i', 'i = i + 1', 'goto L1', 'L2: return s'], []);
  [0, 2, 3, 6].forEach(i => rect(S, 'ld' + i, .4, 1.65 + i * 1.25, .4, 1.25, 'danger', 70, 1, { r: .1 }));
  T(S, 'ldl', 1, 11.2, ['빨간 표시 = 블록의 시작 (첫 줄, 점프 목적지, 점프 다음 줄)', 'red marks = block leaders (first line, jump targets, lines after jumps)'], 'cp-xs cp-r', 1);
  box(S, 'b1', 18, 1.4, 10, 2.6, ['B1: i = 0; s = 0', 'B1: i = 0; s = 0'], 'accent', 2); box(S, 'b2', 18, 5.6, 10, 1.8, 'B2: if i >= n', 'warn', 2);
  box(S, 'b3', 18, 9.2, 10, 3.2, ['B3: s += i; i += 1', 'B3: s += i; i += 1'], 'ok', 2); box(S, 'b4', 18, 14.2, 10, 1.8, 'B4: return s', 'ink-3', 2);
  ar(S, 'e1', [23, 4.1], [23, 5.5], 'ink-3', 3, { h: .12 }); ar(S, 'e2', [23, 7.5], [23, 9.1], 'ink-3', 3, { h: .12 }); T(S, 'e2l', 23.4, 7.8, 'false', 'cz-mono cp-xs', 3);
  elb(S, 'e3', [[18, 6.5], [16.4, 6.5], [16.4, 15.1], [17.9, 15.1]], 'ink-3', 3); T(S, 'e3l', 14.6, 12.4, 'true', 'cz-mono cp-xs', 3);
  elb(S, 'e4', [[28.1, 10.8], [30, 10.8], [30, 6.5], [28.2, 6.5]], 'danger', 4, { h: .16 }); T(S, 'e4l', 24.2, 12.7, ['되돌아가는 간선 = 반복문', 'back edge = a loop'], 'cp-xs cp-r', 4);
  T(S, 'n5', 1, 17.6, ['블록 안에서는 위에서 아래로만 실행 → 지역·전역 최적화의 기본 틀', 'code inside a block runs straight through → the frame for local and global optimization'], 'cp-xs', 5);
  T(S, 'n5b', 1, 18.9, ['반복문 찾기, 도달 불가능 코드 찾기에도 써요', 'also used to find loops and unreachable code'], 'cp-xs', 5);
  S.cap(1, '점프 목적지와 점프 다음 줄에서 코드를 끊어요', 'Cut the code at jump targets and after jumps')
    .cap(2, '끊긴 조각이 기본 블록: 중간에 들어오거나 나갈 수 없어요', 'Each piece is a basic block: no jumps in or out mid-way')
    .cap(3, '가능한 실행 흐름을 간선으로 이어요', 'Edges connect blocks along possible control flow')
    .cap(4, '뒤로 가는 간선이 반복문을 드러내요', 'A backward edge reveals a loop')
    .cap(5, '제어 흐름 그래프', 'The control-flow graph');
  return S;
}
function sSsa() {
  const S = scene({ id: 'cp-ssa', steps: 5, per: 1.4 });
  code(S, 'a', 1, 1.4, 12, ['x = 1', 'if (c) x = 2', 'else   x = 3', 'y = x + 1'], [[3, 3]]);
  T(S, 'q', 1, 7.2, ['y의 x는 어느 x?', 'which x does y use?'], 'cp-xs cp-r', 3);
  code(S, 'b', 15, 1.4, 16, [['x1 = 1', 2], ['if (c) x2 = 2', 2], ['else   x3 = 3', 2], ['x4 = φ(x2, x3)', 3, 'cp-w'], ['y1 = x4 + 1', 3]], [[3, 3]]);
  nd(S, 'k0', 23, 10.4, 5, 'x1 = 1', 'line', 2); nd(S, 'k1', 18.6, 13.4, 5, 'x2 = 2', 'accent', 2); nd(S, 'k2', 27.4, 13.4, 5, 'x3 = 3', 'warn', 2); nd(S, 'k3', 23, 16.4, 7, 'x4 = φ(x2, x3)', 'ok', 3);
  lnk(S, 'l0', [23, 10.4], [18.6, 13.4], 2); lnk(S, 'l1', [23, 10.4], [27.4, 13.4], 2); lnk(S, 'l2', [18.6, 13.4], [23, 16.4], 3); lnk(S, 'l3', [27.4, 13.4], [23, 16.4], 3);
  T(S, 'n2', 1, 9.4, ['대입할 때마다 새 이름(버전)을 붙여요', 'every assignment gets a fresh name (version)'], 'cp-xs', 2);
  T(S, 'n3', 1, 10.7, ['흐름이 합쳐지는 곳엔 φ: 온 길에 따라 값을 골라요', 'where paths merge, φ picks the value by the incoming edge'], 'cp-xs cp-w', 3);
  T(S, 'n4', 1, 12.4, ['모든 변수의 정의가 딱 한 곳 → “이 값은 어디서 왔나”가 바로 보여요', 'one definition per variable → origin is obvious'], 'cp-xs cp-g', 4);
  T(S, 'n4b', 1, 13.7, ['상수 전파·죽은 코드 제거·레지스터 할당이 쉬워져요', 'simpler constant propagation, DCE, regalloc'], 'cp-xs', 4);
  T(S, 'n5', 1, 18.6, ['LLVM IR, GCC의 GIMPLE, V8·HotSpot JIT 모두 SSA 기반 · 기계어로 갈 때 φ는 복사 명령으로 풀어요', 'LLVM IR, GCC’s GIMPLE and the V8 and HotSpot JITs are all SSA-based · φs become copies on the way to machine code'], 'cp-xs', 5);
  S.cap(1, '같은 변수 x에 여러 번 대입하는 코드', 'Code that assigns x several times')
    .cap(2, 'SSA는 대입마다 새 이름을 붙여요', 'SSA gives every assignment a new name')
    .cap(3, '갈래가 합쳐지는 곳에서 φ 함수가 값을 골라요', 'At a merge, a φ function chooses the value')
    .cap(4, '정의가 하나뿐이라 분석과 최적화가 쉬워요', 'With one definition each, analysis gets simple')
    .cap(5, '정적 단일 대입(SSA) 형식', 'Static single assignment form');
  return S;
}
function sFold() {
  const S = scene({ id: 'cp-fold', steps: 5, per: 1.4 });
  code(S, 'a', 1, 1.4, 14.4, ['const SECS = 60 * 60 * 24;', 'let t = SECS * 2;', 'if (DEBUG) log(t);', 'return t;'], [[0, 1], [1, 2], [2, 3], [3, 4]]);
  T(S, 'dbg', 1, 7.2, ['DEBUG = false 로 빌드', 'built with DEBUG = false'], 'cz-mono cp-xs', 3);
  code(S, 'b', 17, 1.4, 14, [['const SECS = 86400;', 1, 'cp-g'], ['let t = 172800;', 2, 'cp-g'], [['// if (false) 블록 삭제', '// if (false) block removed'], 3, 'cp-r'], ['return 172800;', 4, 'cp-g']]);
  T(S, 'n1', 1, 9.4, ['접기: 컴파일 시간에 값을 아는 식은 미리 계산', 'folding: compute expressions whose values are known at compile time'], 'cp-xs', 1);
  T(S, 'n2', 1, 10.7, ['전파: 상수인 변수를 쓰는 곳에 값을 직접 넣고 다시 접기', 'propagation: substitute known constants at their uses, then fold again'], 'cp-xs', 2);
  T(S, 'n3', 1, 12, ['조건이 항상 거짓이면 그 가지는 통째로 사라져요', 'a condition that is always false removes its whole branch'], 'cp-xs cp-r', 3);
  T(S, 'n4', 1, 13.3, ['최적화들이 서로를 부르며 반복돼요 (패스 반복)', 'optimizations feed each other, so passes repeat'], 'cp-xs', 4);
  T(S, 'n5', 1, 15.6, ['C++ constexpr, Rust const fn, 자바 static final 상수', 'C++ constexpr, Rust const fn, Java static final constants'], 'cz-mono cp-xs', 5);
  T(S, 'n5b', 1, 16.8, ['실수 연산은 반올림 규칙 때문에 마음대로 접지 않아요 (-ffast-math 제외)', 'floating point isn’t folded freely because of rounding (unless -ffast-math)'], 'cp-xs', 5);
  S.cap(1, '60 * 60 * 24는 실행 전에도 86400인 걸 알아요', '60 * 60 * 24 is known to be 86400 before running')
    .cap(2, '상수를 쓰는 곳에 퍼뜨려 다시 계산해요', 'Propagate the constant and fold again')
    .cap(3, '항상 거짓인 조건문은 지워져요', 'An always-false branch disappears')
    .cap(4, '실행할 땐 계산할 것이 거의 남지 않아요', 'Almost nothing is left to compute at run time')
    .cap(5, '상수 접기와 상수 전파', 'Constant folding and propagation');
  return S;
}
function sDce() {
  const S = scene({ id: 'cp-dce', steps: 5, per: 1.4 });
  const L = ['int f(int a) {', '  int b = a * 2;', [['  int c = a + 1;   // 아무도 안 씀', '  int c = a + 1;   // never read'], 0], '  return b;', [['  b = b + 1;       // return 뒤', '  b = b + 1;       // after return'], 0], '}'];
  code(S, 'a', 1, 1.4, 15, L, [], { off: 4 });
  rect(S, 'x2', 1.2, 1.65 + 2 * 1.25, 14.6, 1.25, 'danger', 30, 2, { r: .2, off: 4 }); rect(S, 'x4', 1.2, 1.65 + 4 * 1.25, 14.6, 1.25, 'danger', 30, 3, { r: .2, off: 4 });
  code(S, 'b', 1, 1.4, 15, ['int f(int a) {', '  int b = a * 2;', '  return b;', '}'], [], { st: 4 });
  T(S, 'n2', 17, 2, ['c는 계산만 하고 읽지 않아요 → 죽은 대입', 'c is computed but never read → a dead store'], 'cp-xs cp-r', 2);
  T(S, 'n3', 17, 3.6, ['return 뒤는 절대 실행 안 돼요 → 도달 불가능', 'nothing after return can run → unreachable'], 'cp-xs cp-r', 3);
  T(S, 'n4', 17, 5.2, ['둘 다 지워도 결과가 같아요', 'removing both changes nothing'], 'cp-xs cp-g', 4);
  T(S, 'n5', 1, 11.4, ['부작용이 있는 코드(함수 호출, 파일 쓰기, volatile)는 결과를 안 써도 지우면 안 돼요', 'code with side effects (calls, file writes, volatile) must stay even if its result is unused'], 'cp-xs', 5);
  T(S, 'n6', 1, 12.7, ['자바스크립트 번들러의 트리 셰이킹은 모듈 단위 죽은 코드 제거', 'tree shaking in JS bundlers is module-level dead code elimination'], 'cp-xs', 5);
  T(S, 'n6b', 1, 13.9, ['“unused variable” 경고도 같은 분석', '“unused variable” warnings come from the same analysis'], 'cp-xs', 5);
  T(S, 'n7', 1, 15.2, ['벤치마크가 너무 빠르면 측정할 코드가 통째로 지워졌을 수 있어요', 'an impossibly fast benchmark may have had its work removed'], 'cp-xs cp-w', 5);
  S.cap(1, '결과에 영향을 주지 않는 코드를 찾아요', 'Look for code that cannot affect the result')
    .cap(2, '아무도 읽지 않는 값의 계산은 죽은 코드', 'Computing a value nobody reads is dead code')
    .cap(3, '실행될 수 없는 코드도 마찬가지', 'So is code that can never run')
    .cap(4, '지우면 더 작고 빨라져요', 'Removing it makes the program smaller and faster')
    .cap(5, '죽은 코드 제거', 'Dead code elimination');
  return S;
}
function sCse() {
  const S = scene({ id: 'cp-cse', steps: 5, per: 1.4 });
  code(S, 'a', 1, 1.4, 13, ['a = b * c + g', 'd = b * c * e'], []);
  [0, 1].forEach(i => rect(S, 'h' + i, 1.75, 1.65 + i * 1.25, 3.9, 1.25, 'warn', 35, 1, { r: .2, off: 3 }));
  code(S, 'b', 17, 1.4, 13, [['t = b * c', 2, 'cp-w'], ['a = t + g', 2], ['d = t * e', 2]], []);
  ar(S, 'ar', [14.2, 2.6], [16.8, 2.6], 'ink-3', 2, { h: .14 });
  T(S, 'n1', 1, 6.4, ['같은 식 b * c가 두 번 계산돼요', 'the same b * c is computed twice'], 'cp-xs cp-w', 1);
  T(S, 'n2', 1, 7.7, ['한 번만 계산해 임시 변수에 두고 다시 써요 · 곱셈 2번 → 1번', 'compute it once into a temporary and reuse it · two multiplies → one'], 'cp-xs cp-g', 2);
  code(S, 'c', 1, 10, 13, ['a = b * c + g', 'b = b + 1', 'd = b * c * e'], [[1, 3]], { st: 3 });
  T(S, 'n3', 17, 10.4, ['사이에 b가 바뀌면 같은 식이 아니에요', 'if b changes in between, it is no longer the same'], 'cp-xs cp-r', 3);
  T(S, 'n3b', 17, 11.7, ['포인터가 같은 곳을 가리킬 수 있으면(별칭) 확신 못 해요', 'possible aliasing through pointers blocks it too'], 'cp-xs cp-r', 4);
  T(S, 'n5', 1, 15.6, ['SSA 위의 값 번호 매기기(GVN)로 함수 전체에서 같은 값을 찾아요', 'global value numbering (GVN) on SSA finds equal values across a function'], 'cp-xs', 5);
  T(S, 'n5b', 1, 16.8, ['레지스터가 부족하면 다시 계산하는 게 나을 때도 있어요', 'with scarce registers, recomputing can beat keeping a value'], 'cp-xs', 5);
  S.cap(1, '똑같은 계산이 반복되면', 'When the same computation repeats')
    .cap(2, '한 번 계산해 두고 재사용해요', 'compute it once and reuse it')
    .cap(3, '단, 그 사이 피연산자가 바뀌면 안 돼요', 'as long as no operand changes in between')
    .cap(4, '메모리 별칭 가능성도 막아요', 'Possible memory aliasing blocks it too')
    .cap(5, '공통 부분식 제거', 'Common subexpression elimination');
  return S;
}
function sLicm() {
  const S = scene({ id: 'cp-licm', steps: 5, per: 1.4 });
  code(S, 'a', 1, 1.4, 14, ['for (i = 0; i < n; i++)', '  a[i] = x * y + i * 4;'], []);
  rect(S, 'h1', 7.3, 1.65 + 1.25, 3.2, 1.25, 'warn', 35, 2, { r: .2 }); rect(S, 'h2', 11.2, 1.65 + 1.25, 2.8, 1.25, 'accent', 35, 3, { r: .2 });
  code(S, 'b', 17, 1.4, 14, [['t = x * y;', 2, 'cp-w'], ['p = 0;', 3, 'cp-a'], ['for (i = 0; i < n; i++) {', 2], ['  a[i] = t + p;', 2], ['  p += 4;', 3, 'cp-a'], ['}', 2]], []);
  T(S, 'n2', 1, 5.6, ['x * y는 반복 안에서 안 바뀌어요 → 밖으로 (루프 불변 코드 이동)', 'x * y never changes in the loop → hoist it out (LICM)'], 'cp-xs cp-w', 2);
  T(S, 'n3', 1, 6.9, ['i * 4는 매번 4씩 늘어요 → 곱셈 대신 덧셈 (강도 감소)', 'i * 4 grows by 4 each time → add instead of multiply'], 'cp-xs cp-a', 3);
  T(S, 'th', 1, 10.6, ['반복 한 번당', 'per iteration'], 'cp-xs', 4);
  T(S, 't1', 1, 11.9, ['전: 곱셈 2 + 덧셈 1', 'before: 2 multiplies + 1 add'], 'cz-mono cp-s cp-r', 4); T(S, 't2', 1, 13.3, ['후: 덧셈 2', 'after: 2 adds'], 'cz-mono cp-s cp-g', 4);
  T(S, 't3', 17, 11.9, ['n = 1,000,000이면 곱셈 200만 번 절약', 'with n = 1,000,000 that saves two million multiplies'], 'cp-xs', 4);
  T(S, 'n5', 1, 16, ['반복문 최적화는 효과가 커요: 펼치기(unrolling), 벡터화(SIMD로 4~16개씩), 반복문 합치기·나누기, 캐시를 위한 타일링', 'loop optimizations pay off the most: unrolling, vectorization (4–16 elements per SIMD op), fusion and fission, tiling for caches'], 'cp-xs', 5);
  S.cap(1, '반복문 안의 계산은 n번 실행돼요', 'Code inside a loop runs n times')
    .cap(2, '매번 같은 값은 반복문 밖으로 꺼내고', 'Move values that never change out of the loop')
    .cap(3, '규칙적으로 변하는 곱셈은 덧셈으로 바꿔요', 'Turn regularly growing multiplies into adds')
    .cap(4, '반복 횟수만큼 이득이 쌓여요', 'The savings multiply by the iteration count')
    .cap(5, '루프 불변 코드 이동과 강도 감소', 'Loop-invariant code motion and strength reduction');
  return S;
}
function sInline() {
  const S = scene({ id: 'cp-inline', steps: 5, per: 1.4 });
  code(S, 'a', 1, 1.4, 14.4, ['int sq(int x) { return x * x; }', 'y = sq(a + 1);', 'z = sq(3);'], [[1, 1], [2, 3]]);
  T(S, 'c1', 1, 6, ['호출 비용: 인자 준비, call/ret, 레지스터 저장 · 그리고 컴파일러가 함수 안을 못 봐요', 'call cost: argument setup, call/ret, saving registers · and the optimizer cannot see inside'], 'cp-xs', 1);
  code(S, 'b', 17, 1.4, 14, [['t = a + 1;', 2, 'cp-g'], ['y = t * t;', 2, 'cp-g'], ['z = 3 * 3;', 3], ['z = 9;', 3, 'cp-g']], []);
  T(S, 'n2', 17, 7.2, ['몸체를 호출 자리에 복사', 'copy the body into the call site'], 'cp-xs cp-g', 2);
  T(S, 'n3', 17, 8.5, ['인라인 후 상수 접기까지 → 계산 0번', 'inlining then folding → no work left'], 'cp-xs cp-g', 3);
  T(S, 'n4', 1, 11, ['대가: 코드가 커져 명령어 캐시를 더 써요', 'the price: bigger code and more instruction-cache pressure'], 'cp-xs cp-r', 4);
  T(S, 'n4b', 1, 12.2, ['작고 자주 불리는 함수 위주로 결정 (inline 키워드는 힌트)', 'heuristics favor small, hot functions (inline is only a hint)'], 'cp-xs', 4);
  T(S, 'n5', 1, 13.6, ['가상 호출은 대상을 알아야 인라인 가능 (탈가상화) · JIT은 실제 대상을 보고 인라인', 'virtual calls need devirtualization · JITs inline the targets they observe'], 'cp-xs', 5);
  T(S, 'n6', 1, 14.9, ['인라이닝은 다른 최적화의 문을 여는 “최적화의 어머니”', 'inlining is the mother of all optimizations: it unlocks the rest'], 'cp-xs cp-a', 5);
  S.cap(1, '작은 함수 호출에도 비용이 있어요', 'Even a tiny call has a cost')
    .cap(2, '함수 몸체를 부르는 자리에 펼쳐 넣으면', 'Paste the body where it is called')
    .cap(3, '상수 인자는 계산이 통째로 사라져요', 'and constant arguments fold away entirely')
    .cap(4, '대신 코드 크기가 늘어나니 골라서 해요', 'Code grows, so the compiler chooses carefully')
    .cap(5, '함수 인라이닝', 'Function inlining');
  return S;
}
function sLive() {
  const S = scene({ id: 'cp-live', steps: 5, per: 1.4 });
  const L = ['a = x + 1', 'b = a * 2', 'c = a + b', 'return c'], IN = ['{x}', '{a}', '{a, b}', '{c}'], Y = i => 2.4 + i * 2.6;
  L.forEach((l, i) => { box(S, 'l' + i, 1, Y(i), 8, 1.8, l, 'line', 0, { pct: 25 }); T(S, 'in' + i, 9.6, Y(i) + .4, IN[i], 'cz-mono cp-s cp-a', [4, 3, 3, 2][i] === 4 ? 3 : [4, 3, 3, 2][i]); });
  T(S, 'ih', 9.6, 1, ['여기서 살아 있음', 'live here'], 'cp-xs', 2);
  ar(S, 'up', [15.4, Y(3) + 1], [15.4, Y(0)], 'warn', 2, { h: .14 }); T(S, 'upl', 13.6, Y(3) + 2.2, ['거꾸로 계산', 'computed backwards'], 'cp-xs cp-w', 2);
  const V = [['x', -1, 0], ['a', 0, 2], ['b', 1, 2], ['c', 2, 3]];
  V.forEach(([v, a, b], j) => { const x = 19 + j * 3; T(S, 'v' + j, x, 1, v, 'cz-tc cz-mono cp-s', 4, { w: 2 }); rect(S, 'r' + j, x + .5, Y(Math.max(a, 0)) + (a < 0 ? -1 : .9), 1, Y(b) - Y(Math.max(a, 0)) + (a < 0 ? 1.9 : 0), ['ink-3', 'accent', 'warn', 'ok'][j], 55, 4, { r: .3 }); });
  T(S, 'n4', 19, 13.4, ['막대가 겹치는 변수는 같은 레지스터를', 'variables whose bars overlap can’t'], 'cp-xs', 4); T(S, 'n4b', 19, 14.6, ['못 써요 (a와 b) · c는 a 자리 재사용 가능', 'share a register (a, b) · c can reuse a’s'], 'cp-xs', 4);
  T(S, 'n5', 1, 13.4, ['in = use ∪ (out − def)', 'in = use ∪ (out − def)'], 'cz-mono cp-s', 5); T(S, 'n5b', 1, 14.8, ['반복문이 있으면 변화가 없을 때까지 반복(고정점)', 'with loops, iterate until nothing changes (a fixpoint)'], 'cp-xs', 5);
  T(S, 'n6', 1, 16.4, ['레지스터 할당, 죽은 코드 제거, “초기화하지 않은 변수” 경고가 모두 이 데이터 흐름 분석을 써요', 'register allocation, dead code removal and “uninitialized variable” warnings all rely on this dataflow analysis'], 'cp-xs', 5);
  S.cap(1, '변수가 “살아 있다” = 나중에 그 값을 읽을 일이 있다', 'A variable is live if its value will still be read')
    .cap(2, '끝에서부터 거꾸로: return이 c를 읽으니 c가 살아 있어요', 'Work backwards: return reads c, so c is live')
    .cap(3, '읽으면 살아나고, 대입되면 그 위로는 죽어요', 'A read makes a variable live; an assignment kills it above')
    .cap(4, '살아 있는 구간이 겹치면 레지스터를 따로 써야 해요', 'Overlapping live ranges need separate registers')
    .cap(5, '생존 분석: 대표적인 데이터 흐름 분석', 'Liveness: the classic dataflow analysis');
  return S;
}

/* ================= back end ================= */
function sIsel() {
  const S = scene({ id: 'cp-isel', steps: 5, per: 1.4 });
  T(S, 'src', 1, 1, ['t = p->count + 1    // count는 8바이트 위치', 't = p->count + 1    // count sits at offset 8'], 'cz-mono cp-s');
  tree(S, 'n', ['add', 'line', [['load', 'line', [['add', 'line', [['p (rdi)'], ['8']]]]], ['1']]], 3, 4, 4, 3.2, 0, { w: 3.4 });
  code(S, 'a', 17, 3, 14, [['mov rax, rdi', 2], ['add rax, 8', 2], ['mov rax, [rax]', 2], ['add rax, 1', 2]], [], { off: 3 });
  T(S, 'ah', 17, 1.8, ['노드마다 한 명령: 4개', 'one instruction per node: 4'], 'cp-xs cp-r', 2, { off: 3 });
  rect(S, 'tile1', .9, 5.8, 8.6, 9.4, 'warn', 10, 3, { r: .6, css: 'border:.16em dashed var(--warn);background:transparent' }); rect(S, 'tile2', 5.8, 2.6, 7.6, 6, 'accent', 6, 3, { r: .6, css: 'border:.16em dashed var(--accent);background:transparent' });
  code(S, 'b', 17, 3, 14, [['mov rax, [rdi + 8]', 3, 'cp-w'], ['add rax, 1', 3, 'cp-a']], [], { st: 3 });
  T(S, 'bh', 17, 1.8, ['주소 모드 [rdi + 8] 한 번에: 2개', 'one addressing mode [rdi + 8]: 2'], 'cp-xs cp-g', 3);
  T(S, 'n4', 17, 7.4, ['트리를 명령어 “타일”로 덮는 문제', 'cover the tree with instruction “tiles”'], 'cp-xs', 4); T(S, 'n4b', 17, 8.7, ['비용이 가장 작은 덮기를 골라요', 'pick the cheapest covering'], 'cp-xs', 4);
  T(S, 'n5', 1, 17, ['같은 IR도 CPU마다 고르는 명령이 달라요 (x86 lea, ARM 곱셈-덧셈)', 'the same IR maps to different instructions per CPU (x86 lea, ARM multiply-add)'], 'cp-xs', 5);
  T(S, 'n5b', 1, 18.2, ['LLVM SelectionDAG·GlobalISel, 명령 설명은 TableGen', 'LLVM SelectionDAG and GlobalISel, described in TableGen'], 'cp-xs', 5);
  S.cap(1, '중간 표현의 트리를 기계어로 바꿀 차례', 'Time to turn an IR tree into machine instructions')
    .cap(2, '노드마다 명령 하나씩 쓰면 길어져요', 'One instruction per node is long-winded')
    .cap(3, 'CPU가 한 번에 하는 여러 노드를 묶어요', 'Group nodes the CPU can handle in one instruction')
    .cap(4, '타일 고르기 문제로 풀어요', 'It becomes a tiling problem')
    .cap(5, '명령어 선택', 'Instruction selection');
  return S;
}
function sRegalloc() {
  const S = scene({ id: 'cp-regalloc', steps: 5, per: 1.4 });
  const V = [['a', 0, 4], ['b', 1, 2], ['c', 2, 6], ['d', 5, 8], ['e', 3, 7]], X = t => 2.4 + t * 1.45;
  const col3 = { a: 'accent', b: 'warn', c: 'ok', d: 'accent', e: 'warn' }, col2 = { a: 'accent', b: 'warn', c: 'danger', d: 'accent', e: 'warn' };
  hl(S, 'tx', X(0), X(8), 13.4, 'ink-3', 0, { w: .08 }); T(S, 'txl', X(0), 13.6, ['명령 순서 →', 'instruction order →'], 'cp-xs');
  V.forEach(([v, a, b], i) => { T(S, 'vn' + i, .8, 2.6 + i * 2.1, v, 'cz-mono cp-s'); rect(S, 'vr' + i, X(a), 2.4 + i * 2.1, X(b) - X(a), 1.4, 'line', 40, 0, { r: .4 }); tsets(S, 'vr' + i, [[3, col3[v] === 'ok' && false ? 'ok' : col3[v], 50], [4, col2[v], 50]]); });
  const P = { a: [21, 4], b: [27, 4], c: [24, 8.4], d: [29.4, 11.4], e: [19, 11.4] }, E = [['a', 'b'], ['a', 'c'], ['a', 'e'], ['b', 'c'], ['c', 'e'], ['c', 'd'], ['d', 'e']];
  E.forEach(([u, v], i) => { const [x1, y1] = P[u], [x2, y2] = P[v], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L * 1.15, uy = (y2 - y1) / L * 1.15; seg(S, 'ge' + i, [x1 + ux, y1 + uy], [x2 - ux, y2 - uy], 2, 'ink-3', .1); });
  Object.entries(P).forEach(([v, [x, y]]) => { ring(S, 'g' + v, x, y, 1.1, 'ink-3', 2, { w: .12, fill: 'var(--ui)' }); T(S, 'gt' + v, x - 1, y - .5, v, 'cz-tc cz-mono cp-s', 2, { w: 2 }); });
  Object.entries(P).forEach(([v, [x, y]]) => { ring(S, 'c3' + v, x, y, 1.1, col3[v], 3, { w: .3, off: 4 }); ring(S, 'c2' + v, x, y, 1.1, col2[v], 4, { w: .3 }); });
  T(S, 'l3', 17, 14, ['레지스터 3개: rax · rbx · rcx', '3 registers: rax · rbx · rcx'], 'cp-xs cp-g', 3, { off: 4 });
  T(S, 'l4', 17, 14, ['레지스터 2개면 c를 스택으로 (spill)', 'with 2 registers, c spills to the stack'], 'cp-xs cp-r', 4);
  T(S, 'l4b', 17, 15.3, ['c를 쓸 때마다 메모리 읽기·쓰기 추가', 'every use of c now costs a load or store'], 'cp-xs', 4);
  T(S, 'n2', 1, 15.4, ['동시에 살아 있는 변수끼리 선으로 이으면 간섭 그래프', 'join variables that are live at the same time: the interference graph'], 'cp-xs', 2);
  T(S, 'n3', 1, 16.7, ['이웃끼리 다른 색 = 다른 레지스터 (그래프 색칠)', 'neighbors get different colors = different registers (graph coloring)'], 'cp-xs', 3);
  T(S, 'n5', 1, 18.4, ['차이틴의 그래프 색칠, JIT의 선형 스캔, LLVM의 greedy 할당기', 'Chaitin’s graph coloring, JIT linear scan, LLVM’s greedy allocator'], 'cp-xs', 5);
  T(S, 'n5b', 1, 19.6, ['x86-64는 범용 레지스터 16개, ARM64는 31개', 'x86-64 has 16 general-purpose registers, ARM64 has 31'], 'cp-xs', 5);
  S.cap(1, '변수마다 살아 있는 구간이 있어요', 'Each variable has a live range')
    .cap(2, '겹치는 변수끼리 이으면 간섭 그래프', 'Connect the ones that overlap: an interference graph')
    .cap(3, '이웃과 다른 색을 칠하면 레지스터 3개로 충분', 'Color neighbors differently: three registers suffice')
    .cap(4, '레지스터가 모자라면 일부를 메모리로 내려요', 'With too few registers, some values spill to memory')
    .cap(5, '레지스터 할당', 'Register allocation');
  return S;
}
function sSched() {
  const S = scene({ id: 'cp-sched', steps: 5, per: 1.4 });
  code(S, 'c', 1, 1.2, 13, ['① load r1, [a]   (3 cycles)', '② add  r2, r1, 1', '③ load r3, [b]   (3 cycles)', '④ add  r4, r3, 2'], []);
  ar(S, 'd1', [13.6, 2.2], [13.6, 3.3], 'danger', 1, { h: .1 }); ar(S, 'd2', [13.6, 4.7], [13.6, 5.8], 'danger', 1, { h: .1 }); T(S, 'dl', 14.2, 3.2, ['의존', 'depends'], 'cp-xs cp-r', 1);
  const X = c => 5 + c * 2.9, row = (k, y, items, st) => items.forEach(([l, c, len, col], i) => box(S, k + i, X(c), y, len * 2.9 - .15, 1.7, l, col, st, { pct: col === 'danger' ? 20 : 40 }));
  for (let c = 0; c <= 8; c++) T(S, 'cy' + c, X(c) - .5, 8, String(c), 'cz-tc cz-mono cp-xs', 0, { w: 1 }); T(S, 'cyl', .8, 8, ['사이클', 'cycle'], 'cp-xs');
  T(S, 'r1l', .8, 9.6, ['원래 순서', 'original'], 'cp-xs', 2); row('a', 9.2, [['①', 0, 1, 'accent'], ['stall', 1, 2, 'danger'], ['②', 3, 1, 'accent'], ['③', 4, 1, 'warn'], ['stall', 5, 2, 'danger'], ['④', 7, 1, 'warn']], 2);
  T(S, 'r2l', .8, 12.2, ['재배치', 'reordered'], 'cp-xs cp-g', 3); row('b', 11.8, [['①', 0, 1, 'accent'], ['③', 1, 1, 'warn'], ['wait', 2, 1, 'danger'], ['②', 3, 1, 'accent'], ['④', 4, 1, 'warn']], 3);
  T(S, 't1', 1, 14.6, ['8사이클 → 5사이클 · 독립된 명령으로 기다리는 시간을 메워요', '8 cycles → 5 · independent work fills the waiting time'], 'cp-s cp-g', 4);
  T(S, 'n5', 1, 16.6, ['비순차 실행 CPU는 하드웨어가 일부를 대신하지만', 'out-of-order CPUs do part of this in hardware, but'], 'cp-xs', 5);
  T(S, 'n5b', 1, 17.8, ['순차 실행 코어(많은 ARM·임베디드), GPU, VLIW는 컴파일러 몫 · 리스트 스케줄링', 'in-order cores, GPUs and VLIW rely on the compiler · list scheduling'], 'cp-xs', 5);
  S.cap(1, '메모리 읽기는 결과가 나오기까지 몇 사이클이 걸려요', 'A memory load takes several cycles to produce its result')
    .cap(2, '바로 다음 명령이 그 값을 쓰면 파이프라인이 멈춰요', 'If the very next instruction needs it, the pipeline stalls')
    .cap(3, '독립된 load를 앞당기면 기다리는 동안 일을 해요', 'Hoisting the independent load keeps the pipeline busy')
    .cap(4, '같은 일을 더 적은 사이클에', 'Same work, fewer cycles')
    .cap(5, '명령어 스케줄링', 'Instruction scheduling');
  return S;
}
function sPeep() {
  const S = scene({ id: 'cp-peep', steps: 5, per: 1.4 });
  const P = [[['mov eax, 0'], ['xor eax, eax'], ['더 짧은 인코딩 (5→2바이트)', 'shorter (5 → 2 bytes)']], [['imul eax, eax, 8'], ['shl eax, 3'], ['곱셈 대신 시프트', 'shift, not multiply']], [['mov [rsp+8], eax', 'mov eax, [rsp+8]'], ['mov [rsp+8], eax'], ['저장한 값을 다시 읽지 않기', 'skip a redundant reload']], [['jmp L1', 'L1:'], ['L1:'], ['다음 줄로 가는 점프 삭제', 'drop a jump to the next line']]];
  P.forEach(([a, b, d], i) => { const y = 1.4 + i * 3.9, st = i + 1; code(S, 'a' + i, 1, y, 10, a, [], { st }); ar(S, 'ar' + i, [11.3, y + 1], [13.7, y + 1], 'ok', st, { h: .14 }); code(S, 'b' + i, 14, y, 8.6, b.map(l => [l, st, 'cp-g']), [], { st }); T(S, 'd' + i, 23.2, y + .5, d, 'cp-xs', st); });
  T(S, 'n5', 1, 17.4, ['작은 창을 미끄러뜨리며 패턴을 바꿔치기 · 거의 모든 컴파일러의 마지막 단계', 'slide a small window and swap patterns · near the end of almost every compiler'], 'cp-xs', 5);
  T(S, 'n6', 1, 18.7, ['Compiler Explorer(godbolt.org)에서 실제 출력을 바로 볼 수 있어요', 'see real compiler output on Compiler Explorer (godbolt.org)'], 'cp-xs cp-a', 5);
  S.cap(1, '0을 넣을 땐 xor가 더 짧고 빨라요', 'xor is a shorter, faster way to zero a register')
    .cap(2, '2의 거듭제곱 곱셈은 시프트로', 'Multiplying by a power of two becomes a shift')
    .cap(3, '저장 직후 같은 값을 읽는 건 지워요', 'A load right after the same store is removed')
    .cap(4, '다음 줄로 가는 점프도 필요 없어요', 'A jump to the next line is pointless')
    .cap(5, '핍홀 최적화: 작은 창으로 보는 마무리 손질', 'Peephole optimization: final touch-ups through a small window');
  return S;
}

/* ================= real-world toolchains ================= */
function sLlvm() {
  const S = scene({ id: 'cp-llvm', steps: 5, per: 1.4 });
  [['C/C++ → Clang', 'accent'], ['Rust → rustc', 'warn'], ['Swift → swiftc', 'danger'], ['Zig · Julia …', 'line']].forEach(([t, c], i) => { box(S, 'f' + i, 1, 1.6 + i * 2.6, 8.4, 2, t, c, 1, { pct: 30 }); ar(S, 'fa' + i, [9.5, 2.6 + i * 2.6], [11.4, 6.2], 'ink-3', 1, { h: .1 }); });
  box(S, 'ir', 11.6, 4.6, 8.4, 3.2, 'LLVM IR', 'ok', 1, { pct: 40 });
  code(S, 'irc', 1, 12.9, 14, ['define i32 @add1(i32 %x) {', '  %r = add i32 %x, 1', '  ret i32 %r', '}'], [], { st: 2 });
  T(S, 'irl', 1, 11.85, ['SSA 형식의 공통 중간 표현', 'a shared SSA intermediate form'], 'cp-xs', 2);
  ['mem2reg (→ SSA)', 'inline', 'GVN', 'LICM', 'loop-vectorize'].forEach((p, i) => box(S, 'p' + i, 11.6, 9 + i * 1.9 - 0, 8.4, 1.6, p, 'ok', 3, { pct: 22 }));
  T(S, 'pl', 11.6, 18.6, ['-O2: 수십 개의 패스를 차례로', '-O2 runs dozens of passes'], 'cp-xs cp-g', 3);
  [['x86-64', 'accent'], ['ARM64', 'warn'], ['RISC-V', 'ok'], ['WebAssembly', 'danger']].forEach(([t, c], i) => { box(S, 'b' + i, 23.6, 1.6 + i * 2.6, 7.4, 2, t, c, 4, { pct: 30 }); ar(S, 'ba' + i, [20.1, 6.2], [23.5, 2.6 + i * 2.6], 'ink-3', 4, { h: .1 }); });
  T(S, 'mn', 23.6, 12.4, ['언어 M개 × CPU N개', 'M languages × N CPUs'], 'cp-xs', 4); T(S, 'mn2', 23.6, 13.7, ['→ M × N 대신 M + N', '→ M + N instead of M × N'], 'cp-xs cp-g', 4);
  T(S, 'n5', 23.6, 15.6, ['GCC(GIMPLE·RTL),', 'GCC (GIMPLE, RTL),'], 'cp-xs', 5); T(S, 'n5b', 23.6, 16.8, ['Cranelift, MLIR도', 'Cranelift and MLIR'], 'cp-xs', 5); T(S, 'n5c', 23.6, 18, ['같은 구조예요', 'share this shape'], 'cp-xs', 5);
  S.cap(1, '언어마다 앞단(프론트엔드)이 LLVM IR을 만들어요', 'Each language’s front end emits LLVM IR')
    .cap(2, 'IR은 CPU와 무관한 SSA 형식의 어셈블리 같은 언어', 'IR is a CPU-neutral, SSA-form assembly-like language')
    .cap(3, '최적화 패스들이 IR을 고쳐 나가요', 'Optimization passes rewrite the IR')
    .cap(4, '뒷단(백엔드)이 CPU마다 기계어를 만들어요', 'Back ends generate machine code per CPU')
    .cap(5, 'LLVM: 현대 컴파일러의 공용 인프라', 'LLVM: the shared infrastructure of modern compilers');
  return S;
}
function sJit() {
  const S = scene({ id: 'cp-jit', steps: 5, per: 1.4 });
  code(S, 'src', 1, 1.2, 14, ['function getX(o) { return o.x; }', 'for (…) getX({x: 1, y: 2});'], []);
  box(S, 'i', 1, 5.6, 8.6, 2.4, ['인터프리터', 'interpreter'], 'line', 0, { pct: 30 }); T(S, 'il', 1, 8.2, ['실행하며 타입 기록', 'runs and records types'], 'cp-xs', 1);
  T(S, 'fb', 1, 9.4, ['o의 모양 = S1 (1000번)', 'shape of o = S1 (1000×)'], 'cz-mono cp-xs cp-a', 1);
  box(S, 'o', 12, 5.6, 9.6, 2.4, ['최적화 컴파일러', 'optimizing compiler'], 'ok', 2); ar(S, 'io', [9.7, 6.8], [11.9, 6.8], 'ok', 2, { h: .14 }); T(S, 'iol', 9.4, 4.6, ['뜨거워지면', 'once hot'], 'cp-xs cp-g', 2);
  code(S, 'mc', 12, 9.2, 14, [['cmp [o].shape, S1', 2], [['jne deopt   // 다른 모양이면 탈출', 'jne deopt   // bail out on another shape'], 2], ['mov eax, [o + 12]   ; o.x', 2], ['ret', 2]], [[2, 2]], { st: 2 });
  T(S, 'mcl', 12, 14.8, ['가정을 확인하고 바로 오프셋으로 읽기 (인라인 캐시)', 'check the assumption, then read the field at a fixed offset (inline cache)'], 'cp-xs', 2);
  box(S, 'd', 23.6, 5.6, 7.4, 2.4, ['{y: 2, x: 1} → 모양 S2', '{y: 2, x: 1} → shape S2'], 'danger', 3, { pct: 30 });
  elb(S, 'dp', [[23.5, 7.4], [22, 7.4], [22, 9], [8.6, 9], [8.6, 8.1]], 'danger', 3, { h: .14 }); T(S, 'dpl', 16, 3.6, ['가정 깨짐 → 탈최적화', 'assumption broken → deoptimize'], 'cp-xs cp-r', 3);
  T(S, 'n4', 1, 11.4, ['다시 기록해 두 모양을 함께 처리하도록 재최적화', 'record again and reoptimize for both shapes'], 'cp-xs', 4);
  T(S, 'n5', 1, 16.6, ['V8: Ignition → Sparkplug → Maglev → TurboFan · 자바 HotSpot: 인터프리터 → C1 → C2 · PyPy, LuaJIT', 'V8: Ignition → Sparkplug → Maglev → TurboFan · Java HotSpot: interpreter → C1 → C2 · PyPy, LuaJIT'], 'cz-mono cp-xs', 5);
  T(S, 'n6', 1, 18, ['성능 팁: 객체의 필드를 같은 순서로 만들어 모양을 일정하게 유지하세요', 'performance tip: create objects with the same fields in the same order so their shapes stay uniform'], 'cp-xs cp-g', 5);
  S.cap(1, 'JIT은 먼저 인터프리터로 돌리며 실제 타입을 관찰해요', 'A JIT first interprets, watching the real types')
    .cap(2, '자주 쓰이면 관찰한 가정으로 빠른 기계어를 만들고', 'Hot code is compiled to fast machine code under those assumptions')
    .cap(3, '가정이 깨지면 인터프리터로 되돌아가요 (탈최적화)', 'If an assumption breaks, it falls back to the interpreter')
    .cap(4, '새 정보로 다시 최적화해요', 'Then reoptimizes with the new information')
    .cap(5, '투기적 최적화와 인라인 캐시', 'Speculative optimization and inline caches');
  return S;
}

const XT = (() => {
const ex = t => Array.isArray(t) ? t.map(ex) : (typeof t === 'string' ? t.replace(/</g, '&lt;') : t);
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { t = ex(t); const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'cpx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */


/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono cpx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono cpx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c cpx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono cpx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c cpx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'cpx-s cpx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono cpx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono cpx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono cpx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono cpx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono cpx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'cpx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'cpx-xs', 5));


const CSSX = `
.cpx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.cpx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.cpx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.cpx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.cpx-r .in{color:var(--danger);font-weight:800}
.cpx-g .in{color:var(--ok);font-weight:800}
.cpx-a .in{color:var(--accent);font-weight:800}
.cpx-w .in{color:var(--warn);font-weight:800}
.cpx-c .in{font-size:.6em;font-weight:700}
.cpx-c2 .in{font-size:.5em;font-weight:700}
.cpx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.cpx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'cpx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));

/* ================= front end ================= */
function sFirstFollow() {
  const S = scene({ id: 'cp-firstfollow', steps: 5, per: 1.6 });
  code(S, 'g', 1, 1.0, 11.4, ["E  → T E'", "E' → + T E' | ε", "T  → F T'", "T' → * F T' | ε", 'F  → ( E ) | id'], [], {});
  const NT = ["E", "E'", "T", "T'", "F"], FI = ['( id', '+ ε', '( id', '* ε', '( id'], FO = [') $', ') $', '+ ) $', '+ ) $', '* + ) $'];
  T(S, 'hfi', 15.6, .3, 'FIRST', 'cz-tc cz-mono cpx-xs cpx-a', 2, { w: 6.6 }); T(S, 'hfo', 22.6, .3, 'FOLLOW', 'cz-tc cz-mono cpx-xs cpx-w', 3, { w: 8.4 });
  NT.forEach((n, r) => { const y = 1.2 + r * 1.2; box2(S, 'n' + r, 13.2, y, 2.2, 1.0, n, 'ink-3', 1, { pct: 12 }); box2(S, 'fi' + r, 15.6, y, 6.6, 1.0, '{ ' + FI[r] + ' }', 'accent', 2, { pct: 20 }); box2(S, 'fo' + r, 22.6, y, 8.4, 1.0, '{ ' + FO[r] + ' }', 'warn', 3, { pct: 22 }); });
  const TOK = ['id', '+', '*', '(', ')', '$'], CX = j => 3.6 + j * 4.55, RY = r => 9.5 + r * 1.1;
  TOK.forEach((t, j) => T(S, 'tk' + j, CX(j), 8.45, t, 'cz-tc cz-mono cpx-xs cpx-a', 4, { w: 4.35 }));
  const M = [["TE'", '', '', "TE'", '', ''], ['', "+TE'", '', '', 'ε', 'ε'], ["FT'", '', '', "FT'", '', ''], ['', 'ε', "*FT'", '', 'ε', 'ε'], ['id', '', '', '(E)', '', '']];
  M.forEach((row, r) => { box2(S, 'mn' + r, 1, RY(r), 2.4, .95, NT[r], 'ink-3', 4, { pct: 12 }); row.forEach((v, j) => box2(S, `m${r}_${j}`, CX(j), RY(r), 4.35, .95, v, v ? 'ok' : 'line', 4, { pct: v ? 22 : 8 })); });
  tsets(S, 'm0_0', [[4, 'ok', 55], [5, 'ok', 22]]);
  stepT(S, 'k', 1, 15.3, [['왼쪽 재귀를 없앤 식 문법이에요 · E′, T′는 “더 이어지거나 끝(ε)”을 뜻해요', 'an expression grammar without left recursion · E′ and T′ mean “more, or stop (ε)”'], ['FIRST: 그 기호로 시작할 수 있는 첫 토큰들 · E, T, F는 모두 ( 또는 id로 시작', 'FIRST: tokens that can start each symbol · E, T and F all start with ( or id'], ['FOLLOW: 그 기호 바로 뒤에 올 수 있는 토큰 · ε 규칙을 언제 고를지 알려 줘요', 'FOLLOW: tokens that can come right after · it tells when to pick an ε rule'], ['LL(1) 표: 칸마다 규칙이 하나뿐 → 다음 토큰 하나만 보고 결정 (E와 id → TE′)', 'the LL(1) table: one rule per cell → one lookahead token decides (E with id → TE′)']]);
  fin(S, 'z', 16.7, [['FIRST·FOLLOW로 만든 표가 충돌 없이 채워지면 그 문법은 LL(1)이에요', 'if the table built from FIRST and FOLLOW has no conflicts, the grammar is LL(1)', 'cpx-xs cpx-a'], ['한 칸에 규칙이 둘이면 문법을 고치거나(좌인수분해·왼쪽 재귀 제거) LR 파서를 써요', 'two rules in a cell means rewriting the grammar (left factoring, removing left recursion) or using LR']]);
  S.cap(1, 'LL(1)용 문법', 'A grammar for LL(1)').cap(2, 'FIRST 집합', 'FIRST sets').cap(3, 'FOLLOW 집합', 'FOLLOW sets').cap(4, 'LL(1) 파싱 표', 'The LL(1) parse table').cap(5, 'FIRST·FOLLOW와 LL(1)', 'FIRST, FOLLOW and LL(1)');
  return S;
}
function sErrRec() {
  const S = scene({ id: 'cp-errrec', steps: 5, per: 1.6 });
  code(S, 'src', 1, 1.0, 13, ['1  let x = (1 + 2;', '2  let y = x * 3', '3  print(y)'], [[0, 1], [1, 2]], { hoff: 3 });
  rect(S, 'msg', 15, 1.0, 16, 4.0, 'ink', 5, 1, { r: .4 });
  ver(S, 'm0', 15.5, 1.3, [[1, "error: expected ')'  (1:15)"]], 'cz-mono cpx-xs cpx-r');
  T(S, 'm1a', 15.5, 2.4, ['빌드 중단 → 고치고 다시…', 'build stopped → fix and retry…'], 'cpx-xs', 1, { off: 2 });
  T(S, 'm1b', 15.5, 2.4, "error: expected ';'  (2:14)", 'cz-mono cpx-xs cpx-r', 2);
  ver(S, 'm2', 15.5, 3.6, [[2, ['오류 2개를 한 번에', '2 errors in one run']]], 'cpx-xs cpx-g');
  const TK = ['let', 'x', '=', '(', '1', '+', '2', ';', 'let', 'y', '=', 'x', '*', '3', 'print'], TX = i => 1 + i * 2.0;
  TK.forEach((t, i) => box2(S, 't' + i, TX(i), 7.0, 1.8, 1.1, t, 'line', 1, { pct: 20 }));
  tsets(S, 't7', [[1, 'danger', 40]]); tsets(S, 't14', [[2, 'danger', 40]]);
  tsets(S, 't8', [[2, 'ok', 35], [3, 'line', 20]]);
  T(S, 'e1', TX(7) - .6, 8.25, "▲ ')' ?", 'cz-mono cpx-tiny cpx-r', 1); T(S, 'e2', TX(14) - .9, 8.25, "▲ ';' ?", 'cz-mono cpx-tiny cpx-r', 2);
  elb(S, 'sync', [[TX(7) + .9, 6.95], [TX(7) + .9, 6.2], [TX(8) + .9, 6.2], [TX(8) + .9, 6.95]], 'ok', 2, { h: .08, off: 3 });
  T(S, 'syncl', TX(8) + 1.4, 5.85, ['여기서 다시 시작', 'resume here'], 'cpx-tiny cpx-g', 2, { off: 3 });
  box2(S, 'ins', TX(6) + 1.0, 5.75, 1.8, 1.1, ')', 'ok', 3, { pct: 40, css: 'border-style:dashed' });
  T(S, 'insl', TX(6) - 3.6, 6.0, ['있다고 치고 계속', 'assume it'], 'cpx-tiny cpx-g', 3, { off: 4 });
  code(S, 'dg', 1, 9.1, 21, ["error: expected ')'", ' --> main.x:1:15', '  |', '1 | let x = (1 + 2;', "  |         -     ^ expected ')'", "  |         unclosed '('", "help: add ')' before ';'"], [], { st: 4, lh: .95 });
  stepT(S, 'k', 1, 16.5, [['첫 오류에서 멈추면 하나 고치고, 다시 빌드하고, 또 하나… 반복이에요', 'stopping at the first error means fix one, rebuild, find the next… over and over'], ['패닉 모드: 오류가 나면 ;나 다음 문장 키워드까지 건너뛰고 다시 시작해요', 'panic mode: on an error, skip to a synchronizing token (; or the next statement) and resume'], ['구 수준 복구: 빠진 )를 있었던 것처럼 끼워 넣어 엉뚱한 연쇄 오류를 막아요', 'phrase-level recovery: pretend the missing ) was there to avoid a cascade of bogus errors'], ['좋은 진단: 줄:열 위치, 밑줄과 이유, 고치는 방법까지 · Rust·Elm·Clang 스타일', 'good diagnostics: line:column, underline and reason, plus a fix · Rust, Elm and Clang style']]);
  fin(S, 'z', 17.9, [['오류 복구: 한 번 컴파일할 때 진짜 오류는 최대한 많이, 가짜 오류는 없이 보고하는 기술', 'error recovery reports as many real errors as possible per compile, with no bogus ones', 'cpx-xs cpx-a'], ['IDE는 고치는 중인 코드도 계속 파싱해야 해서 특히 중요해요 (tree-sitter, Roslyn)', 'IDEs parse half-written code constantly, so it matters even more (tree-sitter, Roslyn)']]);
  S.cap(1, '첫 오류에서 멈추면', 'Stopping at the first error').cap(2, '건너뛰고 다시 시작', 'Skip and resume').cap(3, '빠진 토큰 끼워 넣기', 'Insert the missing token').cap(4, '읽기 좋은 진단', 'Readable diagnostics').cap(5, '구문 오류 복구', 'Syntax error recovery');
  return S;
}

/* ================= middle ================= */
function sEscape() {
  const S = scene({ id: 'cp-escape', steps: 5, per: 1.6 });
  code(S, 'a', 1, 1.0, 15.6, ['func dist(x, y float64) float64 {', '    p := &Point{x, y}', '    return math.Sqrt(p.x*p.x + p.y*p.y)', '}'], [[1, 2]], { hoff: 3, lh: 1.2 });
  code(S, 'b', 1, 7.6, 15.6, ['func newPoint(x, y float64) *Point {', '    return &Point{x, y}', '}'], [[1, 3]], { hoff: 4, lh: 1.2 });
  T(S, 'ma', 1, 6.55, ['p는 함수 밖으로 안 나가요 → 스택에', 'p never leaves the function → stack'], 'cpx-xs cpx-g', 2);
  T(S, 'mb', 1, 12.0, ['포인터를 반환하니 밖으로 나가요(탈출) → 힙에', 'the pointer is returned, so it escapes → heap'], 'cpx-xs cpx-r', 3);
  T(S, 'sl', 18, .2, ['스택', 'stack'], 'cpx-xs cpx-a', 0); T(S, 'hl', 25.2, .2, ['힙', 'heap'], 'cpx-xs cpx-w', 0);
  rect(S, 'heap', 25.2, 1.0, 5.8, 10.8, 'warn', 8, 0, { r: .4 });
  rect(S, 'fa', 18, 1.0, 6.4, 4.4, 'accent', 8, 0, { r: .3 }); T(S, 'fal', 18.3, 1.1, 'dist()', 'cz-mono cpx-tiny', 0);
  rect(S, 'fb', 18, 7.6, 6.4, 3.2, 'accent', 8, 3, { r: .3 }); T(S, 'fbl', 18.3, 7.7, 'newPoint()', 'cz-mono cpx-tiny', 3);
  [1.6, 3.2, 4.8].forEach((y, i) => box2(S, 'ho' + i, 25.7, y, 4.8, 1.1, 'Point', 'warn', 1, { pct: 30, off: 2 }));
  T(S, 'gc', 25.5, 6.3, ['GC가 치워야 해요', 'the GC must clean up'], 'cpx-tiny cpx-r', 1, { off: 2 });
  box2(S, 'sp', 18.4, 2.2, 5.6, 1.2, 'Point{x, y}', 'ok', 2, { pct: 35, off: 4 });
  box2(S, 'rg', 18.4, 2.2, 5.6, 1.2, ['x, y → 레지스터', 'x, y → registers'], 'ok', 4, { pct: 35 });
  box2(S, 'rv', 18.4, 8.6, 5.6, 1.1, 'ret = 0xc000', 'accent', 3, { pct: 25 });
  box2(S, 'hp', 25.7, 8.6, 4.8, 1.1, 'Point', 'danger', 3, { pct: 30 });
  ar(S, 'rva', [24.05, 9.15], [25.65, 9.15], 'danger', 3, { h: .08 });
  code(S, 'gm', 1, 13.0, 21, ['$ go build -gcflags=-m', './p.go:2: &Point{...} does not escape', './p.go:6: &Point{...} escapes to heap'], [], { st: 4, lh: 1.0 });
  stepT(S, 'k', 1, 16.8, [['객체를 힙에 만들면 할당 비용이 들고, 나중에 GC가 치워야 해요', 'heap objects cost an allocation and later work for the GC'], ['p는 반환되지도, 전역에 저장되지도, 다른 스레드로 가지도 않아요 → 스택이면 충분', 'p is never returned, stored globally or shared → the stack is enough'], ['반환된 포인터는 함수가 끝나도 살아 있어야 해서 “탈출” → 힙에 할당', 'a returned pointer must outlive the call, so it escapes → heap allocation'], ['더 나아가 객체를 필드로 쪼개 레지스터에 두면 할당 자체가 사라져요 (스칼라 치환)', 'going further, splitting it into fields in registers removes the allocation (scalar replacement)']]);
  fin(S, 'z', 18.2, [['탈출 분석: 포인터가 어디까지 흘러가는지 따져, 밖으로 안 나가는 객체를 스택·레지스터에 둬요', 'escape analysis keeps objects whose pointers never leave on the stack or in registers', 'cpx-xs cpx-a'], ['Go(-gcflags=-m로 확인), 자바 HotSpot, .NET이 GC 부담을 줄이려고 써요', 'Go (check with -gcflags=-m), Java HotSpot and .NET use it to cut GC pressure']]);
  S.cap(1, '힙 할당의 비용', 'The cost of heap allocation').cap(2, '탈출하지 않으면 스택', 'No escape, stack').cap(3, '탈출하면 힙', 'Escapes, heap').cap(4, '스칼라 치환', 'Scalar replacement').cap(5, '탈출 분석', 'Escape analysis');
  return S;
}
function sVectorize() {
  const S = scene({ id: 'cp-vectorize', steps: 5, per: 1.6 });
  T(S, 'loop', 1, .25, 'for (i = 0; i < 16; i++)  c[i] = a[i] + b[i];', 'cz-mono cpx-xs cpx-a', 0);
  const X = i => 3.4 + i * 1.7, ROWS = [['a', 1.6, i => String(i)], ['b', 2.9, () => '10'], ['c', 4.6, i => String(i + 10)]];
  ROWS.forEach(([n, y, f], r) => { T(S, 'rl' + r, 1.4, y + .15, n, 'cz-mono cpx-s', 0); for (let i = 0; i < 16; i++) { if (r < 2) box2(S, `v${r}_${i}`, X(i), y, 1.55, 1.0, f(i), r ? 'warn' : 'accent', 0, { pct: 18 }); else box2(S, `v${r}_${i}`, X(i), y, 1.55, 1.0, f(i), 'ok', i < 4 ? 1 : 2, { pct: 30 }); } });
  T(S, 'plus', 1.4, 3.85, '+', 'cz-mono cpx-s', 0); hl(S, 'eq', 3.3, 30.6, 4.3, 'ink-3', 0, { w: .06 });
  frame(S, 'f0', X(0) - .1, 1.45, 1.75, 4.3, 'accent', 1, { w: .1, off: 2 });
  frame(S, 'f1', X(0) - .1, 1.45, 8 * 1.7 - .05, 4.3, 'accent', 2, { w: .12 }); frame(S, 'f2', X(8) - .1, 1.45, 8 * 1.7 - .05, 4.3, 'warn', 2, { w: .12 });
  ver(S, 'ins', 1, 6.3, [[1, ['addss: 한 번에 1개 → 16번', 'addss: one at a time → 16 times']], [2, ['vaddps ymm: 한 번에 8개 → 2번', 'vaddps ymm: 8 at a time → twice']]], 'cz-mono cpx-xs cpx-a');
  T(S, 'f1l', X(0), 5.75, ['1번째 vaddps', '1st vaddps'], 'cz-tc cpx-tiny cpx-a', 2, { w: 8 * 1.7 }); T(S, 'f2l', X(8), 5.75, ['2번째 vaddps', '2nd vaddps'], 'cz-tc cpx-tiny cpx-w', 2, { w: 8 * 1.7 });
  [['✗ c[i] = c[i-1] + a[i]   앞 결과가 있어야 다음 계산 (의존성)', '✗ c[i] = c[i-1] + a[i]   each step needs the previous result'], ['✗ a와 c가 겹칠 수 있으면 불가 → restrict로 겹치지 않음을 약속', '✗ not if a and c might overlap → promise otherwise with restrict'], ['n이 8의 배수가 아니면 남은 원소는 스칼라로 마무리 (또는 마스크)', 'when n isn’t a multiple of 8, a scalar tail (or masking) finishes up']].forEach((t, i) => T(S, 'c' + i, 1, 7.6 + i * 1.05, t, 'cz-mono cpx-xs' + (i < 2 ? ' cpx-r' : ''), 3));
  T(S, 'flag', 1, 11.0, 'gcc -O3 -march=native -fopt-info-vec   →   loop vectorized using 32 byte vectors', 'cz-mono cpx-xs cpx-g', 4);
  stepT(S, 'k', 1, 12.4, [['기본 코드는 덧셈 명령 하나에 원소 하나씩, 16번 반복해요', 'plain code adds one element per instruction, 16 times'], ['AVX2 레지스터(256비트)는 float 8개를 한 번에 더해요 → 16번이 2번으로', 'an AVX2 register (256 bits) adds 8 floats at once → 16 steps become 2'], ['반복끼리 의존이 없고 배열이 겹치지 않을 때만 안전하게 벡터화돼요', 'it is only safe when iterations are independent and the arrays don’t overlap'], ['-O3와 -march=native로 켜고, 컴파일러 보고서로 됐는지 확인해요', 'enable it with -O3 and -march=native, then confirm in the compiler’s report']]);
  fin(S, 'z', 13.8, [['자동 벡터화: 컴파일러가 반복문을 SIMD 명령으로 바꿔 여러 값을 한 번에 처리해요', 'auto-vectorization turns loops into SIMD instructions that process several values at once', 'cpx-xs cpx-a'], ['이미지·오디오 처리, 행렬 연산, 문자열 검색(memchr)이 몇 배씩 빨라지는 비결이에요', 'it is why image and audio code, matrix math and string search (memchr) run several times faster']]);
  S.cap(1, '하나씩 더하기', 'One at a time').cap(2, '8개씩 한 번에', 'Eight at once').cap(3, '벡터화의 조건', 'When it is allowed').cap(4, '켜고 확인하기', 'Turning it on and checking').cap(5, '자동 벡터화', 'Auto-vectorization');
  return S;
}

/* ================= real compilers ================= */
function sPgo() {
  const S = scene({ id: 'cp-pgo', steps: 5, per: 1.6 });
  const B = { A: [4, 1.0, 6, 'A: parse()'], B: [.8, 4.4, 5.4, 'B: error'], C: [8.6, 4.4, 5.4, 'C: compute'], D: [4, 7.8, 6, 'D: return'] };
  Object.entries(B).forEach(([k, [x, y, w, t]]) => box2(S, 'b' + k, x, y, w, 1.2, t, k === 'B' ? 'danger' : 'accent', 0, { pct: 22 }));
  tsets(S, 'bB', [[3, 'ink-3', 15]]);
  const E = [['AB', [5.4, 2.25], [3.5, 4.35], 'ink-3'], ['AC', [8.6, 2.25], [11.3, 4.35], 'ink-3'], ['BD', [3.5, 5.65], [5.4, 7.75], 'ink-3'], ['CD', [11.3, 5.65], [8.6, 7.75], 'ink-3']];
  E.forEach(([k, a, b, c]) => ar(S, 'e' + k, a, b, c, 0, { h: .1 }));
  ['AC', 'CD'].forEach(k => S.set('e' + k, 3, { background: cv('ok'), 'border-color': cv('ok') }));
  ver(S, 'lab', 1.6, 2.9, [[1, '50%?'], [2, '12']], 'cz-mono cpx-xs cpx-r'); ver(S, 'lac', 10.6, 2.9, [[1, '50%?'], [2, '98,800']], 'cz-mono cpx-xs cpx-g');
  T(S, 'bf', 16, .9, ['배치 (전)', 'layout (before)'], 'cpx-xs', 0);
  ['A', 'B', 'C', 'D'].forEach((k, i) => box2(S, 'o' + k, 16 + i * 3.6, 1.7, 3.4, 1.1, k, k === 'B' ? 'danger' : 'accent', 0, { pct: 22 }));
  T(S, 'af', 16, 3.5, ['배치 (후)', 'layout (after)'], 'cpx-xs cpx-g', 3);
  ['A', 'C', 'D'].forEach((k, i) => box2(S, 'n' + k, 16 + i * 3.6, 4.3, 3.4, 1.1, k, 'ok', 3, { pct: 30 }));
  box2(S, 'nB', 27.6, 4.3, 3.4, 1.1, 'B', 'ink-3', 3, { pct: 15 }); T(S, 'cold', 27.6, 5.55, ['차가운 영역', 'cold section'], 'cz-tc cpx-tiny', 3, { w: 3.4 });
  T(S, 'inl', 16, 6.6, ['C 안의 뜨거운 호출 → 인라인', 'hot call inside C → inlined'], 'cpx-xs cpx-g', 3);
  [['① 계측해서 빌드', '① build with counters'], ['② 실제 작업으로 실행', '② run real work'], ['③ 프로필 넣고 다시 빌드', '③ rebuild with profile']].forEach((t, i) => { box2(S, 'p' + i, 1 + i * 10.3, 9.6, 9.5, 1.2, t, i === 2 ? 'ok' : 'warn', 2, { pct: 25 }); if (i) ar(S, 'pa' + i, [i * 10.3 + .55, 10.2], [i * 10.3 + .95, 10.2], 'ink-3', 2, { h: .08 }); });
  T(S, 'cmd', 1, 11.2, 'clang -fprofile-generate → ./app → llvm-profdata merge → clang -fprofile-use', 'cz-mono cpx-xs', 2);
  stepT(S, 'k', 1, 12.6, [['프로필이 없으면 컴파일러는 어느 쪽 분기가 자주 실행될지 짐작만 해요', 'without a profile the compiler can only guess which branch runs more often'], ['계측 빌드로 실제 작업을 돌려 간선마다 실행 횟수를 모아요', 'run an instrumented build on real work to count how often each edge is taken'], ['자주 가는 길(A→C→D)은 붙여 배치하고 드문 B는 멀리 · 뜨거운 호출은 인라인', 'lay the hot path (A→C→D) out together, push rare B away and inline hot calls'], ['보통 10~20% 빨라져요 · AutoFDO는 운영 서버의 샘플링 프로필(perf)을 그대로 써요', 'usually 10–20% faster · AutoFDO uses sampled profiles (perf) from production instead']]);
  fin(S, 'z', 14.0, [['PGO: 실제 실행 통계를 컴파일러에 알려 줘서 추측 대신 데이터로 최적화하게 해요', 'PGO feeds real execution statistics to the compiler so it optimizes from data, not guesses', 'cpx-xs cpx-a'], ['크롬, 파이어폭스, 클랭 자신, Go 1.21+ 빌드가 PGO로 성능을 끌어올려요', 'Chrome, Firefox, Clang itself and Go 1.21+ builds use PGO for speed']]);
  S.cap(1, '짐작하는 컴파일러', 'A compiler that guesses').cap(2, '실행 횟수 모으기', 'Collecting counts').cap(3, '프로필로 다시 배치', 'Re-laying out with the profile').cap(4, '얼마나 빨라지나', 'How much faster').cap(5, '프로필 기반 최적화', 'Profile-guided optimization');
  return S;
}

return { css: CSSX, secs: [], add: {
  'cp-front': [
    item('cp-firstfollow', 'FIRST·FOLLOW와 LL(1) 파싱 표', 'FIRST, FOLLOW and LL(1) parse tables', '하향식 파서가 다음 토큰 하나만 보고 규칙을 고를 수 있게, 문법에서 FIRST·FOLLOW 집합을 구해 파싱 표를 만들어요.', 'E → T E′, E′ → + T E′ | ε 처럼 왼쪽 재귀를 없앤 문법에서, FIRST는 각 기호로 시작할 수 있는 첫 토큰들(E, T, F는 { (, id })이고 FOLLOW는 그 기호 바로 뒤에 올 수 있는 토큰들(E′는 { ), $ })이에요. 표 M[A, a]에는 a ∈ FIRST(α)인 규칙 A → α를 넣고, α가 ε을 만들 수 있으면 FOLLOW(A)의 토큰 칸에도 넣어요. 모든 칸에 규칙이 하나 이하면 LL(1) 문법이라 스택과 표만으로 결정적으로 파싱해요. 한 칸에 두 규칙이 들어가면 좌인수분해나 왼쪽 재귀 제거로 문법을 고치거나 LR 파서를 써요.', 'To let a top-down parser choose a rule from a single lookahead token, compute FIRST and FOLLOW sets from the grammar and build a parse table.', 'In a grammar without left recursion such as E → T E′, E′ → + T E′ | ε, FIRST is the set of tokens that can start each symbol (E, T and F give { (, id }) and FOLLOW the tokens that can appear right after it (E′ gives { ), $ }). The table M[A, a] gets rule A → α wherever a ∈ FIRST(α), and, if α can derive ε, in the columns of FOLLOW(A) too. If no cell holds more than one rule the grammar is LL(1), and a stack plus the table parse it deterministically. A cell with two rules means left-factoring or removing left recursion, or switching to an LR parser.', sFirstFollow()),
    item('cp-errrec', '구문 오류 복구와 진단', 'Syntax error recovery and diagnostics', '좋은 컴파일러는 첫 오류에서 멈추지 않고 다시 파싱을 이어 가 진짜 오류를 한 번에 최대한 많이 보고해요. 메시지도 위치와 고칠 방법까지 알려 줘요.', '첫 오류에서 멈추면 하나 고치고 다시 빌드하는 일을 반복해야 해요. 패닉 모드 복구는 오류가 나면 ;나 다음 문장 키워드 같은 동기화 토큰까지 건너뛰고 다시 시작해, let x = (1 + 2;의 빠진 )와 다음 줄의 빠진 ;를 한 번에 보고해요. 구 수준 복구는 빠진 )를 있었던 것처럼 끼워 넣고 계속해서 엉뚱한 연쇄 오류를 막고, AST에는 오류 노드를 남겨요. 좋은 진단은 줄:열 위치, 문제 지점 밑줄과 이유, 짝이 맞지 않는 여는 괄호, 고치는 방법(help)까지 보여 줘요(Rust, Elm, Clang). IDE는 작성 중인 코드를 계속 파싱하므로 복구가 특히 중요해요.', 'Good compilers don’t stop at the first error; they recover and keep parsing to report as many real errors as possible, with messages that show where and how to fix them.', 'Stopping at the first error forces a fix-rebuild loop. Panic-mode recovery skips to a synchronizing token such as ; or the next statement keyword and resumes, so the missing ) in let x = (1 + 2; and the missing ; on the next line are reported together. Phrase-level recovery inserts the missing ) as if it were there, avoiding a cascade of bogus errors and leaving an error node in the AST. Good diagnostics show line:column, underline the spot with a reason, point at the unclosed bracket and suggest a fix (Rust, Elm, Clang). IDEs reparse half-written code constantly, so recovery matters even more there.', sErrRec())
  ],
  'cp-mid': [
    item('cp-escape', '탈출 분석', 'Escape analysis', '포인터가 함수 밖으로 “탈출”하는지 분석해서, 탈출하지 않는 객체는 힙 대신 스택이나 레지스터에 둬요. 할당과 GC 부담이 줄어요.', 'p := &Point{x, y}로 만든 객체의 포인터가 반환되지도, 전역 변수에 저장되지도, 다른 고루틴·스레드로 넘어가지도 않으면 함수가 끝날 때 함께 사라져도 되므로 스택에 할당해요. 반대로 return &Point{x, y}처럼 포인터를 돌려주면 함수가 끝나도 살아 있어야 해서 탈출로 보고 힙에 할당해요. 한 걸음 더 나아가 객체를 필드로 쪼개 레지스터에 두면 할당 자체가 사라지는데, 이를 스칼라 치환이라고 해요. Go는 go build -gcflags=-m으로 결과를 보여 주고, 자바 HotSpot과 .NET도 GC 부담을 줄이려고 써요.', 'Escape analysis checks whether a pointer can leave its function; objects that don’t escape go on the stack or in registers instead of the heap, saving allocations and GC work.', 'If the pointer from p := &Point{x, y} is never returned, stored in a global or passed to another goroutine or thread, the object can die with the function, so it is allocated on the stack. If the pointer is returned, as in return &Point{x, y}, it must outlive the call, so it escapes and is allocated on the heap. Going further, splitting the object into its fields held in registers removes the allocation entirely, which is called scalar replacement. Go reports the decisions with go build -gcflags=-m, and Java HotSpot and .NET use the same analysis to reduce GC pressure.', sEscape()),
    item('cp-vectorize', '자동 벡터화 (SIMD)', 'Auto-vectorization (SIMD)', '컴파일러가 반복문을 SIMD 명령으로 바꿔, 레지스터 하나에 담긴 값 여러 개를 명령 하나로 동시에 처리하게 해요.', 'c[i] = a[i] + b[i]를 그대로 컴파일하면 덧셈 명령 하나가 원소 하나를 처리해 16번 반복해요. AVX2의 256비트 레지스터에는 float 8개가 들어가므로 vaddps 한 번에 8개를 더해 2번이면 끝나요. 이렇게 하려면 반복끼리 의존이 없어야 하고(c[i] = c[i-1] + a[i]는 불가), 배열이 서로 겹치지 않아야 해요(C에서는 restrict로 약속). n이 8의 배수가 아니면 남은 원소는 스칼라 반복이나 마스크로 처리해요. -O3와 -march=native로 켜고 -fopt-info-vec 보고서나 어셈블리로 확인해요.', 'The compiler turns a loop into SIMD instructions so that one instruction processes several values packed into a register at once.', 'Compiled as-is, c[i] = a[i] + b[i] adds one element per instruction, 16 times. An AVX2 256-bit register holds 8 floats, so one vaddps adds 8 at once and two are enough. This requires iterations to be independent (c[i] = c[i-1] + a[i] cannot be vectorized) and the arrays not to overlap (promised with restrict in C). When n isn’t a multiple of 8, a scalar tail loop or masking handles the rest. Enable it with -O3 and -march=native, and confirm with the -fopt-info-vec report or the assembly.', sVectorize())
  ],
  'cp-real': [
    item('cp-pgo', '프로필 기반 최적화 (PGO)', 'Profile-guided optimization (PGO)', '프로그램을 실제처럼 실행해 모은 통계(어느 분기·함수가 자주 쓰이는지)를 컴파일러에 알려 줘서, 추측 대신 데이터로 최적화하게 해요.', '프로필이 없으면 컴파일러는 if (err) 같은 분기가 얼마나 자주 실행될지 짐작해야 해요. PGO는 먼저 계측 코드를 넣어 빌드하고(-fprofile-generate), 대표적인 작업으로 실행해 간선·함수별 실행 횟수를 모은 뒤, 그 프로필로 다시 빌드해요(-fprofile-use). 그러면 자주 가는 경로를 메모리에 붙여 배치하고 드문 오류 처리 코드는 차가운 영역으로 보내며, 뜨거운 호출은 인라인하고 레지스터 할당도 뜨거운 코드에 집중해요. 보통 10~20% 빨라지고, AutoFDO는 계측 없이 운영 서버의 perf 샘플링 프로필을 써요. 크롬, 파이어폭스, 클랭 자신, Go 1.21 이상이 PGO를 써요.', 'PGO feeds statistics gathered from realistic runs, such as which branches and functions are hot, back to the compiler so it optimizes from data rather than guesses.', 'Without a profile the compiler has to guess how often a branch such as if (err) is taken. PGO first builds with instrumentation (-fprofile-generate), runs a representative workload to count executions per edge and function, then rebuilds with that profile (-fprofile-use). The hot path is laid out contiguously while rare error handling moves to a cold section, hot calls are inlined and register allocation focuses on hot code. Gains of 10–20% are typical, and AutoFDO skips instrumentation by using perf sampling profiles from production. Chrome, Firefox, Clang itself and Go 1.21+ use PGO.', sPgo())
  ]
} };
})();

window.UX = page([
  sec('cp-front', '앞단: 읽고 이해하기', 'Front end', '앞단: 읽고 이해하기', 'Front end: reading and understanding',
    '소스 코드를 토큰과 트리로 바꾸고 의미를 검사해요.', 'Turning source into tokens and trees, then checking meaning.', [
    item('cp-lex', '어휘 분석 (렉서)', 'Lexical analysis', '렉서는 문자의 흐름을 키워드·이름·숫자·연산자 같은 토큰으로 묶어요. 공백과 주석은 여기서 사라져요.', '예: let total = price * 2 + 10; → let, total, =, price, *, 2, +, 10, ; (토큰 9개). 각 토큰에 줄·열 위치를 기록해 오류 메시지에 써요. 가능한 한 길게 읽는 최장 일치로 >=를 하나로, iffy를 식별자로 인식해요.', 'The lexer groups a stream of characters into tokens such as keywords, names, numbers and operators; whitespace and comments vanish here.', 'let total = price * 2 + 10; becomes nine tokens: let, total, =, price, *, 2, +, 10, ;. Each carries its line and column for error messages. The longest-match rule reads >= as one token and iffy as an identifier.', sLex()),
    item('cp-dfa', '렉서와 유한 오토마타', 'Lexers as automata', '렉서는 상태와 전이로 된 유한 오토마타(DFA)예요. 글자마다 전이를 따라가고 받아들이는 상태에서 토큰이 정해져요.', '키워드는 일단 식별자로 읽은 뒤 키워드 표에서 구분해요. 정규식으로 토큰 규칙을 쓰면 lex·flex·re2c가 정규식 → NFA → DFA로 렉서를 생성해요. 실제 대형 컴파일러(GCC, Clang, Go, Rust)는 오류 메시지와 속도를 위해 손으로 짠 렉서가 많아요.', 'A lexer is a finite automaton (DFA): each character follows a transition, and accepting states decide the token.', 'Keywords are scanned as identifiers and then looked up in a keyword table. Write token rules as regular expressions and lex, flex or re2c generate the lexer via regex → NFA → DFA. Production compilers (GCC, Clang, Go, Rust) often hand-write theirs for better errors and speed.', sDfa()),
    item('cp-grammar', '문맥 자유 문법', 'Context-free grammars', '문법은 기호를 바꿔 쓰는 규칙 모음으로 언어의 모양을 정확히 정의해요. 규칙의 층이 연산자 우선순위와 결합 방향을 정해요.', 'expr → expr + term | term, term → term * factor | factor, factor → NUM | ( expr ). *가 더 깊은 층에 있어 먼저 묶이고, 왼쪽 재귀는 왼쪽 결합을 뜻해요. BNF·EBNF로 JSON·SQL·파이썬 문법이 명세되고, ANTLR·yacc·bison 같은 파서 생성기의 입력이 돼요.', 'A grammar is a set of rewrite rules that pins down a language’s shape. Its layering encodes operator precedence and associativity.', 'expr → expr + term | term, term → term * factor | factor, factor → NUM | ( expr ). * sits in a deeper layer so it binds tighter, and left recursion means left associativity. BNF and EBNF specify JSON, SQL and Python, and feed parser generators such as ANTLR, yacc and bison.', sGrammar()),
    item('cp-ambig', '모호한 문법', 'Ambiguous grammars', '한 입력에 파스 트리가 둘 이상 나오면 모호한 문법이에요. 1 + 2 * 3이 9가 될 수도 7이 될 수도 있어요.', 'E → E + E | E * E 같은 문법은 우선순위를 정하지 않아요. 우선순위별로 규칙 층을 나누거나, 파서 생성기에 %left·%right로 우선순위와 결합을 선언해 해결해요. 고전적 예: 매달린 else는 가장 가까운 if에 붙이기로 약속해요.', 'A grammar is ambiguous when one input has two parse trees: 1 + 2 * 3 could mean 9 or 7.', 'Rules such as E → E + E | E * E leave precedence open. Fix it by layering rules by precedence, or by declaring %left and %right precedence to the parser generator. The classic case is the dangling else, resolved by attaching it to the nearest if.', sAmbig()),
    item('cp-rd', '재귀 하강 파서', 'Recursive descent parsing', '문법 규칙 하나를 함수 하나로 옮겨 서로 부르게 하는 파서예요. 연산자 우선순위가 호출 깊이로 자연스럽게 표현돼요.', 'expr()는 term()을, term()은 factor()를 불러요. 왼쪽 재귀는 무한 호출이 되므로 while 반복으로 바꿔요. 오류 메시지를 다루기 쉬워 GCC·Clang·Go·Rust·V8 모두 손으로 짠 재귀 하강 파서를 써요. 연산자가 많으면 프랫(Pratt) 파싱으로 우선순위 표를 써요.', 'Write each grammar rule as a function and let them call one another; precedence falls out of the call depth.', 'expr() calls term(), which calls factor(). Left recursion would recurse forever, so it becomes a while loop. Because it makes error handling easy, GCC, Clang, Go, Rust and V8 all use hand-written recursive descent; with many operators, Pratt parsing drives it from a precedence table.', sRd()),
    item('cp-lr', 'LR 파싱 (시프트-리듀스)', 'LR (shift-reduce) parsing', '토큰을 스택에 쌓다가(shift) 규칙의 오른쪽이 보이면 왼쪽 기호로 줄여(reduce) 아래에서 위로 트리를 만들어요.', '1 + 2 * 3에서 * 앞에서는 E + T를 줄이지 않고 계속 쌓아 곱셈을 먼저 묶어요. 언제 shift하고 reduce할지는 문법에서 계산한 표(LR(1)·LALR)가 정해요. yacc·bison이 이 표를 생성하고, 결정이 둘이면 shift/reduce 충돌을 경고해요.', 'Push tokens onto a stack (shift) and, when a rule’s right side appears, replace it with its head (reduce), building the tree bottom-up.', 'For 1 + 2 * 3 it keeps shifting before * instead of reducing E + T, so the multiplication groups first. A table computed from the grammar (LR(1) or LALR) decides each move; yacc and bison generate it and warn about shift/reduce conflicts when two moves are possible.', sLr()),
    item('cp-ast', '추상 구문 트리 (AST)', 'Abstract syntax trees', '파스 트리에서 의미에 필요 없는 노드를 걷어 낸 간결한 트리예요. 이후의 모든 단계가 AST를 순회하며 일해요.', 'x = (a + b) * 2;는 파스 트리로 20개 노드지만 AST는 Assign(x, Mul(Add(a, b), 2))의 7개. 괄호·세미콜론은 트리 모양에 녹아들어요. Babel·ESLint·Prettier, 파이썬 ast 모듈, tree-sitter가 AST를 다루고, astexplorer.net에서 직접 볼 수 있어요.', 'A compact tree with the parse tree’s bookkeeping nodes removed. Every later stage walks the AST.', 'x = (a + b) * 2; takes 20 parse-tree nodes but only seven AST nodes: Assign(x, Mul(Add(a, b), 2)). Parentheses and semicolons melt into the shape. Babel, ESLint, Prettier, Python’s ast module and tree-sitter all work on ASTs; try astexplorer.net.', sAst()),
    item('cp-symtab', '심볼 테이블과 스코프', 'Symbol tables and scopes', '선언된 이름과 그 정보(타입, 위치)를 스코프별 표에 기록해요. 이름은 가장 안쪽 스코프부터 바깥으로 찾아요.', '함수·블록마다 새 표를 바깥 표에 연결해요. 안쪽 선언이 바깥 이름을 가리고(shadowing), 스코프를 나오면 그 이름들은 사라져요. “선언되지 않은 변수”, “중복 선언” 오류가 여기서 나오고, IDE의 정의로 이동·이름 바꾸기도 같은 정보를 써요.', 'Each declared name and its information (type, location) is recorded in a per-scope table, and lookups search from the innermost scope outward.', 'Every function or block chains a new table to its parent. Inner declarations shadow outer names, and leaving a scope drops its entries. “Undeclared variable” and “duplicate declaration” errors come from here, and IDE go-to-definition and rename rely on the same data.', sSymtab()),
    item('cp-types', '타입 검사', 'Type checking', '트리의 잎부터 타입을 붙이고 규칙(int + int → int 같은)을 적용해 전체 타입을 구해요. 맞는 규칙이 없으면 위치와 함께 오류를 내요.', 'len(name) + 1: name은 string, len은 string → int이므로 len(name)은 int, 1은 int, 덧셈 결과도 int. 정적 타입 언어(TypeScript, Java, Rust, Go)는 실행 전에 오류를 잡고 코드 생성에 크기·레이아웃 정보를 줘요. 동적 타입 언어는 같은 검사를 실행 중에 해요.', 'Type the leaves, then apply rules such as int + int → int up the tree. If no rule fits, report an error with its location.', 'In len(name) + 1, name is a string and len is string → int, so len(name) is an int, 1 is an int and the sum is an int. Statically typed languages (TypeScript, Java, Rust, Go) catch errors before running and tell code generation sizes and layouts; dynamic languages check the same things at run time.', sTypes()),
    item('cp-infer', '타입 추론', 'Type inference', '타입을 적지 않아도 쓰임새에서 제약을 모아 풀어 타입을 알아내요. 제약이 남지 않으면 제네릭 타입이 돼요.', 'x => x + 1: x에 α를 붙이고 +가 int를 요구하니 α = int → int → int. x => x는 ∀α. α → α. 힌들리-밀너 추론(ML, OCaml, Haskell)이 대표적이고, Rust·TypeScript·Kotlin·Swift는 지역 추론으로 let x = 5 같은 곳의 표기를 줄여요.', 'Infer types from how values are used, collecting and solving constraints without annotations; whatever stays unconstrained becomes generic.', 'For x => x + 1, give x a type α; + demands ints, so α = int and the function is int → int. x => x is ∀α. α → α. Hindley–Milner inference (ML, OCaml, Haskell) is the classic; Rust, TypeScript, Kotlin and Swift use local inference to drop annotations like those in let x = 5.', sInfer())
  ].concat(XT.add['cp-front'] || [])),
  sec('cp-mid', '중간 표현과 최적화', 'IR & optimization', '중간 표현과 최적화', 'Intermediate representation and optimization',
    'CPU와 무관한 형태로 바꿔 더 빠르고 작게 다듬어요.', 'A CPU-neutral form where code is made faster and smaller.', [
    item('cp-tac', '3주소 코드', 'Three-address code', '각 명령이 “결과 = 피연산자 연산 피연산자” 꼴인 중간 표현이에요. 트리를 아래에서 위로 돌며 연산마다 임시 변수를 만들어요.', 'a = b * c + d * e → t1 = b * c; t2 = d * e; t3 = t1 + t2; a = t3. 기계어와 가깝지만 레지스터 수 제한이 없고 CPU와 무관해 최적화하기 좋아요. LLVM IR, JVM 바이트코드, 파이썬 바이트코드도 비슷한 중간 표현이에요.', 'An intermediate form where every instruction is “result = operand op operand”, built by walking the tree bottom-up with one temporary per operation.', 'a = b * c + d * e becomes t1 = b * c; t2 = d * e; t3 = t1 + t2; a = t3. Close to machine code but CPU-neutral with unlimited temporaries, it is easy to optimize. LLVM IR, JVM bytecode and Python bytecode are relatives.', sTac()),
    item('cp-cfg', '기본 블록과 제어 흐름 그래프', 'Basic blocks and control-flow graphs', '중간에 들어오거나 나가는 점프가 없는 코드 덩어리(기본 블록)를 노드로, 가능한 실행 흐름을 간선으로 그린 그래프예요.', '점프 목적지와 점프 바로 다음 줄에서 블록을 끊어요. 뒤로 가는 간선이 반복문을 드러내요. 블록 안(지역) 최적화와 그래프 전체(전역) 최적화, 도달 불가능 코드 찾기, 지배자(dominator) 분석의 기본 틀이에요.', 'A graph whose nodes are straight-line chunks of code (basic blocks) with no jumps in or out mid-way, and whose edges are possible control flow.', 'Blocks are cut at jump targets and right after jumps. A backward edge reveals a loop. It frames local (per-block) and global (whole-graph) optimization, unreachable-code detection and dominator analysis.', sCfg()),
    item('cp-ssa', 'SSA 형식', 'SSA form', '모든 변수가 딱 한 번만 대입되도록 이름에 버전을 붙인 형식이에요. 흐름이 합쳐지는 곳에는 φ 함수가 값을 골라요.', 'x = 1; if (c) x = 2 else x = 3; y = x + 1 → x1, x2, x3, x4 = φ(x2, x3), y1 = x4 + 1. 정의가 하나뿐이라 값의 출처가 바로 보여 상수 전파·죽은 코드 제거·레지스터 할당이 쉬워져요. LLVM IR, GCC GIMPLE, V8·HotSpot JIT 모두 SSA 기반이에요.', 'A form where every variable is assigned exactly once by versioning names; where paths merge, a φ function chooses the value.', 'x = 1; if (c) x = 2 else x = 3; y = x + 1 becomes x1, x2, x3, x4 = φ(x2, x3), y1 = x4 + 1. With one definition each, a value’s origin is obvious, easing constant propagation, dead code elimination and register allocation. LLVM IR, GCC’s GIMPLE and the V8 and HotSpot JITs are SSA-based.', sSsa()),
    item('cp-fold', '상수 접기와 전파', 'Constant folding and propagation', '컴파일할 때 값을 아는 식은 미리 계산하고(접기), 상수인 변수를 쓰는 곳에 값을 넣어(전파) 다시 접어요.', 'const SECS = 60 * 60 * 24 → 86400, t = SECS * 2 → 172800, if (DEBUG)에서 DEBUG가 false면 가지 전체 삭제. 최적화들이 서로를 부르며 반복돼요. C++ constexpr, Rust const fn이 이를 언어 차원에서 보장해요. 실수 연산은 반올림 규칙 때문에 함부로 접지 않아요.', 'Compute expressions whose values are known at compile time (folding) and substitute known constants at their uses (propagation), then fold again.', 'const SECS = 60 * 60 * 24 becomes 86400 and t = SECS * 2 becomes 172800; with DEBUG false, an if (DEBUG) branch disappears. Optimizations feed each other, so passes repeat. C++ constexpr and Rust const fn guarantee this at language level. Floating point isn’t folded freely because of rounding rules.', sFold()),
    item('cp-dce', '죽은 코드 제거', 'Dead code elimination', '결과에 영향을 주지 않는 코드(아무도 읽지 않는 계산, 실행될 수 없는 코드)를 지워요.', '생존 분석으로 읽히지 않는 대입을, 제어 흐름 그래프로 도달 불가능한 블록을 찾아요. 부작용이 있는 코드(함수 호출, 입출력, volatile)는 지우면 안 돼요. JS 번들러의 트리 셰이킹은 모듈 단위의 죽은 코드 제거. 벤치마크 코드가 통째로 지워지는 함정도 여기서 생겨요.', 'Remove code that cannot affect the result: computations nobody reads and code that can never run.', 'Liveness finds assignments that are never read; the control-flow graph finds unreachable blocks. Code with side effects (calls, I/O, volatile) must stay. Tree shaking in JavaScript bundlers is module-level dead code elimination, and it is also why naive benchmarks sometimes get optimized away entirely.', sDce()),
    item('cp-cse', '공통 부분식 제거', 'Common subexpression elimination', '같은 식이 여러 번 계산되면 한 번만 계산해 임시 변수에 두고 다시 써요.', 'a = b * c + g; d = b * c * e → t = b * c; a = t + g; d = t * e. 사이에 피연산자가 바뀌거나, 포인터 별칭으로 메모리가 바뀌었을 수 있으면 할 수 없어요. SSA 위의 전역 값 번호 매기기(GVN)가 함수 전체로 일반화해요. 레지스터가 부족하면 다시 계산이 나을 때도 있어요.', 'When the same expression is computed more than once, compute it once into a temporary and reuse it.', 'a = b * c + g; d = b * c * e becomes t = b * c; a = t + g; d = t * e. It is blocked if an operand changes in between or memory might change through aliasing pointers. Global value numbering (GVN) on SSA generalizes it across a function; with scarce registers, recomputing can win.', sCse()),
    item('cp-licm', '루프 최적화', 'Loop optimizations', '반복문 안에서 매번 같은 계산은 밖으로 꺼내고(루프 불변 코드 이동), 규칙적으로 변하는 곱셈은 덧셈으로 바꿔요(강도 감소).', 'a[i] = x * y + i * 4 → 반복문 앞에서 t = x * y, 안에서는 p += 4. 반복 횟수만큼 이득이 쌓여 효과가 가장 큰 최적화 영역이에요. 이 밖에 반복문 펼치기, SIMD 벡터화(4~16개씩), 합치기·나누기, 캐시를 위한 타일링이 있어요.', 'Hoist computations that never change out of the loop (loop-invariant code motion) and turn regularly growing multiplies into adds (strength reduction).', 'a[i] = x * y + i * 4 becomes t = x * y before the loop and p += 4 inside. Savings multiply by the iteration count, making loops the richest target. Others include unrolling, SIMD vectorization (4–16 elements at a time), fusion, fission and cache tiling.', sLicm()),
    item('cp-inline', '함수 인라이닝', 'Function inlining', '함수 호출 자리에 함수 몸체를 펼쳐 넣어 호출 비용을 없애고, 다른 최적화가 함수 안까지 보게 해요.', 'sq(a + 1) → t = a + 1; t * t, sq(3) → 9(인라인 후 상수 접기). 대가는 코드 크기 증가와 명령어 캐시 부담이라, 작고 자주 불리는 함수 위주로 휴리스틱이 정해요(inline 키워드는 힌트). 가상 호출은 탈가상화가 필요하고, JIT은 실제로 불리는 대상을 보고 인라인해요.', 'Paste a function’s body into its call site to remove call overhead and let other optimizations see inside.', 'sq(a + 1) becomes t = a + 1; t * t, and sq(3) folds to 9 after inlining. The cost is code growth and instruction-cache pressure, so heuristics favor small, hot functions (the inline keyword is just a hint). Virtual calls need devirtualization first; JITs inline the targets they actually observe.', sInline()),
    item('cp-live', '생존 분석', 'Liveness analysis', '각 지점에서 나중에 값이 읽힐 변수(살아 있는 변수)를 거꾸로 계산하는 데이터 흐름 분석이에요.', 'in = use ∪ (out − def)를 끝에서부터 계산하고, 반복문이 있으면 변화가 없을 때까지 반복해요(고정점). 살아 있는 구간이 겹치는 변수는 같은 레지스터를 못 써요. 레지스터 할당, 죽은 코드 제거, 초기화하지 않은 변수 경고가 이 분석을 써요.', 'A backward dataflow analysis that finds, at each point, which variables will still be read later (are live).', 'Compute in = use ∪ (out − def) from the end, iterating to a fixpoint when loops exist. Variables with overlapping live ranges cannot share a register. Register allocation, dead code removal and uninitialized-variable warnings all build on it.', sLive())
  ].concat(XT.add['cp-mid'] || [])),
  sec('cp-back', '뒷단: 기계어로', 'Back end', '뒷단: 기계어로', 'Back end: down to machine code',
    '중간 표현을 실제 CPU 명령으로 바꾸고 다듬어요.', 'Turning IR into real CPU instructions and polishing them.', [
    item('cp-isel', '명령어 선택', 'Instruction selection', '중간 표현의 트리를 CPU 명령 “타일”로 덮어 기계어로 바꿔요. 여러 노드를 한 번에 처리하는 명령을 고르면 코드가 짧아져요.', 'load(add(p, 8)) + 1 → x86의 주소 모드로 mov rax, [rdi + 8]; add rax, 1 두 줄. 비용이 가장 작은 덮기를 동적 계획법이나 최대 먹기로 찾아요. CPU마다 고르는 명령이 달라요(x86 lea, ARM 곱셈-덧셈). LLVM SelectionDAG·GlobalISel, 명령 설명은 TableGen.', 'Cover the IR tree with CPU instruction “tiles” to produce machine code; instructions that handle several nodes at once make it shorter.', 'load(add(p, 8)) + 1 becomes two x86 instructions via an addressing mode: mov rax, [rdi + 8]; add rax, 1. The cheapest covering is found by dynamic programming or maximal munch. Choices differ per CPU (x86 lea, ARM multiply-add). LLVM uses SelectionDAG or GlobalISel with TableGen descriptions.', sIsel()),
    item('cp-regalloc', '레지스터 할당', 'Register allocation', '무한한 임시 변수를 몇 개 안 되는 실제 레지스터에 배정해요. 동시에 살아 있는 변수끼리 다른 레지스터를 쓰도록 그래프를 색칠해요.', '간섭 그래프에서 이웃끼리 다른 색 = 다른 레지스터. 색이 모자라면 일부를 스택으로 내려(spill) 메모리 읽기·쓰기가 늘어요. 차이틴의 그래프 색칠, JIT이 쓰는 빠른 선형 스캔, LLVM greedy 할당기. x86-64는 범용 레지스터 16개, ARM64는 31개.', 'Map unlimited temporaries onto a handful of real registers, coloring a graph so that variables live at the same time get different registers.', 'In the interference graph, neighbors get different colors, meaning different registers. With too few colors, some values spill to the stack, adding memory traffic. Approaches: Chaitin’s graph coloring, the fast linear scan used by JITs, LLVM’s greedy allocator. x86-64 has 16 general-purpose registers; ARM64 has 31.', sRegalloc()),
    item('cp-sched', '명령어 스케줄링', 'Instruction scheduling', '결과가 늦게 나오는 명령(메모리 읽기 등) 뒤에 독립된 명령을 끼워 넣어 파이프라인이 멈추는 시간을 줄여요.', '예: load 두 개를 앞당겨 겹치면 8사이클 → 5사이클. 비순차 실행 CPU는 하드웨어가 일부를 대신하지만, 순차 실행 코어(많은 ARM·임베디드), GPU, VLIW에서는 컴파일러가 중요해요. 의존성 그래프 위의 리스트 스케줄링이 기본이에요.', 'Fill the wait after slow instructions (such as memory loads) with independent work so the pipeline stalls less.', 'Overlapping two loads turns 8 cycles into 5. Out-of-order CPUs partly do this in hardware, but in-order cores (many ARM and embedded chips), GPUs and VLIW designs depend on the compiler. List scheduling over a dependency graph is the standard method.', sSched()),
    item('cp-peep', '핍홀 최적화', 'Peephole optimization', '몇 줄짜리 창을 기계어 위로 미끄러뜨리며 알려진 비효율 패턴을 더 나은 것으로 바꿔요.', 'mov eax, 0 → xor eax, eax(더 짧음), imul ×8 → shl 3, 저장 직후 같은 값 다시 읽기 삭제, 다음 줄로 가는 jmp 삭제. 단순하지만 효과적이라 거의 모든 컴파일러의 마지막 단계에 있어요. Compiler Explorer(godbolt.org)에서 실제 출력을 확인해 보세요.', 'Slide a small window over the machine code and replace known inefficient patterns with better ones.', 'mov eax, 0 becomes xor eax, eax (shorter), multiplying by 8 becomes shl 3, a reload right after a store goes away, and a jmp to the next line is dropped. Simple but effective, it runs near the end of almost every compiler. See real output on Compiler Explorer (godbolt.org).', sPeep())
  ].concat(XT.add['cp-back'] || [])),
  sec('cp-real', '실제 컴파일러', 'Real-world compilers', '실제 컴파일러', 'Real-world compilers',
    '오늘날의 컴파일러 인프라와 JIT이에요.', 'Today’s compiler infrastructure and JITs.', [
    item('cp-llvm', 'LLVM 구조', 'The LLVM architecture', '언어마다 앞단이 공통 중간 표현(LLVM IR)을 만들고, 공용 최적화 패스와 CPU별 뒷단이 나머지를 맡는 구조예요.', 'Clang(C/C++), rustc, Swift, Zig, Julia가 LLVM IR을 만들고, -O2에서 mem2reg·inline·GVN·LICM·벡터화 등 수십 개 패스를 거쳐 x86-64·ARM64·RISC-V·WebAssembly로 내려가요. 언어 M개 × CPU N개를 M + N개 구현으로 줄여요. GCC(GIMPLE·RTL), Cranelift, MLIR도 비슷한 구조예요.', 'Each language’s front end emits a shared intermediate form (LLVM IR); common optimization passes and per-CPU back ends do the rest.', 'Clang (C/C++), rustc, Swift, Zig and Julia emit LLVM IR; at -O2 it passes through dozens of passes (mem2reg, inline, GVN, LICM, vectorization) before reaching x86-64, ARM64, RISC-V or WebAssembly. M languages × N CPUs need only M + N implementations. GCC (GIMPLE, RTL), Cranelift and MLIR share the shape.', sLlvm()),
    item('cp-jit', 'JIT과 투기적 최적화', 'JITs and speculative optimization', 'JIT은 실행하며 관찰한 타입·모양을 “가정”으로 삼아 빠른 기계어를 만들고, 가정이 깨지면 인터프리터로 되돌아가요(탈최적화).', '인라인 캐시: 객체 모양(hidden class)이 S1인지 확인하고 고정 오프셋에서 필드를 읽어요. 다른 모양이 오면 탈최적화 후 다시 최적화. V8: Ignition → Sparkplug → Maglev → TurboFan, 자바 HotSpot: 인터프리터 → C1 → C2, PyPy, LuaJIT. 객체 필드를 같은 순서로 만들면 빨라져요.', 'A JIT compiles fast machine code under assumptions about the types and shapes it has observed, falling back to the interpreter when an assumption breaks (deoptimization).', 'An inline cache checks that an object has hidden class S1 and reads the field at a fixed offset; a different shape triggers deoptimization and later reoptimization. V8 runs Ignition → Sparkplug → Maglev → TurboFan; Java HotSpot runs interpreter → C1 → C2; PyPy and LuaJIT work similarly. Creating objects with fields in a consistent order keeps them fast.', sJit())
  ].concat(XT.add['cp-real'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += `
.cp-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.cp-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.cp-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.cp-r .in{color:var(--danger);font-weight:800}
.cp-g .in{color:var(--ok);font-weight:800}
.cp-a .in{color:var(--accent);font-weight:800}
.cp-w .in{color:var(--warn);font-weight:800}
.cp-c .in{font-size:.6em;font-weight:700}
.cp-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.cp-code.cp-g .in{color:var(--ok)}.cp-code.cp-r .in{color:var(--danger)}.cp-code.cp-w .in{color:var(--warn)}.cp-code.cp-a .in{color:var(--accent)}
.cp-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
