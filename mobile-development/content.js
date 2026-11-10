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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'mo-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono mo-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono mo-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c mo-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- mobile helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono mo-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c mo-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'mo-s mo-r', st, o);

/* ================= platforms & app structure ================= */
function sNative() {
  const S = scene({ id: 'mo-native', steps: 5, per: 1.5 });
  const X = i => 7.2 + i * 6.1, W = 5.7, CL = ['accent', 'ok', 'warn', 'ink-3'];
  const H = [['네이티브', 'Native'], 'Flutter', 'React Native', ['웹 · PWA', 'Web · PWA']];
  const R1 = ['Swift · Kotlin', 'Dart', 'JavaScript', 'HTML · JS'];
  const R2 = [['플랫폼 UI', 'platform UI'], ['자체 엔진이 그림', 'own renderer'], ['네이티브 뷰', 'native views'], ['브라우저 엔진', 'browser engine']];
  T(S, 'rl0', 1, 2.9, ['앱 코드', 'app code'], 'mo-xs'); T(S, 'rl1', 1, 6.2, ['UI 계층', 'UI layer'], 'mo-xs'); T(S, 'rl2', 1, 9.3, 'OS', 'mo-xs');
  H.forEach((h, i) => {
    T(S, 'h' + i, X(i), 1, h, 'cz-tc mo-s', i + 1, { w: W });
    box2(S, 'a' + i, X(i), 2.4, W, 1.9, R1[i], CL[i], i + 1);
    ar(S, 'x' + i, [X(i) + W / 2, 4.4], [X(i) + W / 2, 5.4], 'ink-3', i + 1, { h: .1 });
    box2(S, 'b' + i, X(i), 5.5, W, 2.3, R2[i], CL[i], i + 1, { pct: 20 });
    ar(S, 'y' + i, [X(i) + W / 2, 7.9], [X(i) + W / 2, 8.9], 'ink-3', i + 1, { h: .1 });
  });
  box2(S, 'os', X(0), 9, X(3) + W - X(0), 1.5, 'iOS · Android', 'ink-3', 0, { pct: 16 });
  const N = [
    [['플랫폼마다 따로 만들어요 (iOS는 Swift, Android는 Kotlin)', 'one codebase per platform (Swift for iOS, Kotlin for Android)'], ['두 번 개발하지만 새 OS 기능과 최고의 성능을 가장 먼저', 'twice the work, but first access to new OS features and top performance']],
    [['Dart 위젯을 엔진이 직접 픽셀로 그려요', 'the engine paints Dart widgets itself'], ['한 코드로 두 플랫폼에서 똑같은 모양 · OS 기본 위젯은 흉내 내요', 'one codebase, identical on both · OS widgets are imitated']],
    [['로직은 JavaScript, 화면은 진짜 네이티브 컴포넌트', 'logic in JavaScript, real native components on screen'], ['React를 아는 웹 개발자에게 익숙 · JSI로 네이티브 코드를 직접 호출', 'familiar to React developers · JSI calls native code directly']],
    [['설치 없이 URL로 열고 홈 화면에 추가할 수 있어요', 'opens from a URL and can be added to the home screen'], ['오프라인은 서비스 워커로 · 블루투스 같은 기기 기능은 제한적', 'service workers cache offline · device APIs like Bluetooth are limited']]
  ];
  N.forEach(([a, b], i) => { T(S, 'n' + i, 1, 11.8, a, 'mo-s', i + 1, { off: i + 2 }); T(S, 'm' + i, 1, 13.2, b, 'mo-xs', i + 1, { off: i + 2 }); });
  const RW = [['성능·자연스러움', 'performance'], ['코드 공유', 'code sharing'], ['기기 기능', 'device APIs']], V = [[3, 1, 3], [3, 3, 2], [2, 3, 2], [1, 3, 1]];
  RW.forEach((r, j) => { T(S, 'tr' + j, 1, 11.5 + j * 1.6, r, 'mo-xs', 5); V.forEach((v, i) => { for (let d = 0; d < 3; d++) pt(S, `v${i}_${j}_${d}`, X(i) + W / 2 + (d - 1) * .9, 11.95 + j * 1.6, 5, d < v[j] ? C.okf : C.idle, .3); }); });
  T(S, 'z1', 1, 16.6, ['정답은 없어요: 팀이 아는 언어, 필요한 기기 기능, 출시 속도로 골라요', 'no single winner: pick by team skills, device needs and time to market'], 'mo-xs mo-a', 5);
  T(S, 'z2', 1, 17.9, ['Flutter: Google Pay, BMW 앱 · React Native: Discord, 인스타그램 일부 화면', 'Flutter: Google Pay, the BMW app · React Native: Discord, parts of Instagram'], 'mo-xs', 5);
  S.cap(1, '네이티브는 플랫폼의 언어와 UI를 그대로 써요', 'Native apps use the platform’s own language and UI')
    .cap(2, 'Flutter는 화면을 직접 그려요', 'Flutter draws every pixel itself')
    .cap(3, 'React Native는 JS로 네이티브 뷰를 조종해요', 'React Native drives native views from JavaScript')
    .cap(4, '웹 앱은 브라우저 위에서 돌아요', 'Web apps run inside the browser')
    .cap(5, '네이티브와 크로스플랫폼', 'Native vs cross-platform');
  return S;
}
function sLife() {
  const S = scene({ id: 'mo-life', steps: 5, per: 1.5 });
  const B = [['Created', ['뷰 만들고 초기화', 'build views, init']], ['Started', ['화면에 보임', 'visible']], ['Resumed', ['맨 앞, 조작 가능', 'in front, interactive']], ['Paused', ['일부 가려짐', 'partly covered']], ['Stopped', ['화면에서 사라짐', 'off screen']], ['Destroyed', ['메모리에서 정리', 'released']]];
  const pos = i => { const r = Math.floor(i / 3), c = r ? 2 - i % 3 : i % 3; return [1 + c * 10.6, 2.4 + r * 7]; };
  const CL = ['ink-3', 'accent', 'ok', 'warn', 'danger', 'ink-3'];
  B.forEach(([k, d], i) => { const [x, y] = pos(i); box(S, 'b' + i, x, y, 8.4, 2.2, k, CL[i], 0, { pct: 26 }); T(S, 'd' + i, x, y + 2.5, d, 'cz-tc mo-xs', 0, { w: 8.4 }); });
  const A = { a0: [[9.5, 3.5], [11.5, 3.5], 'onStart', 8.9, 1.2, 'c'], a1: [[20.1, 3.5], [22.1, 3.5], 'onResume', 19.5, 1.2, 'c'], a2: [[24.6, 5.9], [24.6, 9.3], 'onPause', 21.5, 7.1], a3: [[28.4, 9.3], [28.4, 5.9], 'onResume', 28.8, 7.1],
    a4: [[22.1, 10.5], [20.1, 10.5], 'onStop', 19.5, 12, 'c'], a5: [[11.5, 10.5], [9.5, 10.5], 'onDestroy', 8.9, 12, 'c'], a6: [[15.8, 9.3], [15.8, 5.9], 'onRestart', 16.2, 7.1] };
  Object.entries(A).forEach(([k, [a, b, l, lx, ly, c]]) => { ar(S, k, a, b, 'ink-3', 0, { h: .12 }); T(S, 'l' + k, lx, ly, l, (c ? 'cz-tc ' : '') + 'cz-mono mo-xs mo-a', 0, c ? { w: 3.2 } : {}); });
  [['a0', 1, 2], ['a1', 1, 2], ['a2', 2, 3], ['a4', 3, 4], ['a6', 4, 5], ['a1', 4, 5], ['a5', 5, 0]].forEach(([k, s, o], j) => { const [a, b] = A[k]; ar(S, 'h' + j, a, b, 'accent', s, { h: .16, off: o }); });
  const P = [2, 3, 4, 2, 5].map(i => pos(i));
  frame(S, 'cur', P[0][0] - .3, P[0][1] - .3, 9, 2.8, 'accent', 1, { r: .5, w: .2 });
  P.slice(1).forEach(([x, y], i) => S.move('cur', i + 2, x - .3, y - .3));
  const N = [
    [['앱 아이콘 탭 → onCreate → onStart → onResume', 'tap the icon → onCreate → onStart → onResume'], ['여기서 초기화하고 화면을 그려요', 'set things up and draw the screen']],
    [['전화가 오거나 다이얼로그가 위를 덮으면 → onPause', 'a call or a dialog on top → onPause'], ['애니메이션·카메라 미리보기처럼 가벼운 것만 멈춰요', 'pause light things such as animations or a camera preview']],
    [['홈 버튼으로 나가면 → onStop', 'leave with the home button → onStop'], ['무거운 작업을 멈추고 상태를 저장해요', 'stop heavy work and save state']],
    [['다시 돌아오면 onRestart → onStart → onResume', 'come back: onRestart → onStart → onResume'], ['저장해 둔 상태로 이어서 보여 줘요', 'pick up from the saved state']],
    [['뒤로 가기로 닫거나 OS가 정리하면 → onDestroy', 'closed with back, or reclaimed by the OS → onDestroy'], ['프로세스째 정리되면 onDestroy도 안 불릴 수 있어요 → onStop에서 저장', 'if the whole process is killed, onDestroy may never run → save in onStop']]
  ];
  N.forEach(([a, b], i) => { T(S, 'n' + i, 1, 13.8, a, 'mo-s', i + 1, { off: i + 2 }); T(S, 'm' + i, 1, 15.2, b, 'mo-xs', i + 1, { off: i + 2 }); });
  T(S, 'z', 1, 16.5, ['iOS도 같은 개념: Active · Inactive · Background · Suspended', 'iOS has the same idea: active, inactive, background, suspended'], 'mo-xs mo-a', 5);
  S.cap(1, '앱을 열면 생성 → 시작 → 재개', 'Opening an app: create, start, resume')
    .cap(2, '다른 창이 덮으면 일시 정지', 'Covered by another window: paused')
    .cap(3, '홈으로 나가면 정지', 'Sent home: stopped')
    .cap(4, '돌아오면 다시 시작', 'Back again: restarted')
    .cap(5, '앱 생명주기', 'The app lifecycle');
  return S;
}
function sSandbox() {
  const S = scene({ id: 'mo-sandbox', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 1, 14, 14.4, 0);
  const A = [['메모', 'Notes'], ['게임', 'Game'], ['은행', 'Bank']], CL = ['accent', 'warn', 'ok'];
  A.forEach((a, i) => { const y = 2.2 + i * 4.2;
    frame(S, 'sb' + i, 1.8, y, 12.4, 3.6, CL[i], 1, { dash: 1, r: .5 });
    box(S, 'ap' + i, 2.4, y + .6, 4.8, 2.4, a, CL[i], 0, { pct: 40 });
    box2(S, 'dt' + i, 8, y + .6, 5.6, 2.4, ['전용 폴더', 'private files'], 'line', 0, { pct: 50 });
  });
  T(S, 'hwl', 25.4, 1, ['OS가 지키는 자원', 'guarded by the OS'], 'mo-xs');
  [['카메라', 'camera'], ['위치', 'location'], ['연락처', 'contacts']].forEach((h, i) => box2(S, 'hw' + i, 25.4, 2.2 + i * 2.6, 5.6, 2, h, 'ink-3', 0, { pct: 18 }));
  ar(S, 'st', [5.8, 7], [8, 6.1], 'danger', 2, { h: .12, dash: 1 }); xm(S, 'sx', 8.9, 5.95, 2);
  ar(S, 'rq', [14.4, 4.6], [19.6, 10], 'accent', 3, { h: .12 });
  rect(S, 'dlg', 16.4, 10.2, 14.6, 6.2, 'ui', 0, 3, { r: .6, css: 'border:.14em solid var(--line);box-shadow:0 .3em 1em rgba(0,0,0,.18)' });
  T(S, 'dq1', 17.2, 10.9, ['‘메모’에서 카메라에', 'Allow “Notes” to'], 'mo-s', 3); T(S, 'dq2', 17.2, 12.1, ['접근하려고 합니다', 'use the camera?'], 'mo-s', 3);
  box2(S, 'bn', 17.2, 14, 6.2, 1.8, ['허용 안 함', 'Don’t allow'], 'line', 3, { pct: 50 }); box2(S, 'by', 24, 14, 6.2, 1.8, ['앱 사용 중에만', 'While using'], 'accent', 3, { pct: 25 });
  tsets(S, 'by', [[4, 'accent', 60]]); pt(S, 'tap', 28.6, 15.2, 4, C.warn, .4, { off: 5 });
  ar(S, 'ok', [14.4, 3.3], [25.2, 3.2], 'ok', 4, { h: .14 }); tsets(S, 'hw0', [[4, 'ok', 40]]);
  const N = [
    [['앱마다 자기만의 폴더와 프로세스를 받아요', 'each app gets its own folder and process'], ['Android는 앱마다 다른 리눅스 사용자로 실행해요', 'Android runs each app as a separate Linux user']],
    [['다른 앱의 파일과 메모리는 읽을 수 없어요', 'other apps’ files and memory are off-limits'], ['공유는 OS가 허락한 통로로만 (공유 시트, 콘텐츠 제공자)', 'sharing goes through OS channels (share sheet, content providers)']],
    [['카메라·위치 같은 민감한 기능은 실행 중에 물어봐요', 'sensitive features like the camera ask at runtime'], ['쓸 권한은 앱 설정 파일(Manifest, Info.plist)에 미리 선언해요', 'the app declares them up front (Manifest, Info.plist)']],
    [['허용하면 OS가 그 앱에게만 카메라를 열어 줘요', 'once allowed, the OS opens the camera to that app alone'], ['사용자는 설정에서 언제든 다시 끌 수 있어요', 'the user can revoke it any time in Settings']],
    [['필요한 순간에 이유와 함께 요청하고, 거절돼도 앱이 동작하게', 'ask at the moment of need, explain why, keep working if denied'], ['범위도 좁혀요: 대략적 위치, 고른 사진만, 이번 한 번만', 'scopes shrink too: approximate location, chosen photos, just once']]
  ];
  N.forEach(([a, b], i) => { T(S, 'n' + i, 1, 17.4, a, 'mo-s', i + 1, { off: i + 2 }); T(S, 'm' + i, 1, 18.8, b, 'mo-xs', i + 1, { off: i + 2 }); });
  S.cap(1, '앱은 저마다 샌드박스 안에서 돌아요', 'Every app runs inside its own sandbox')
    .cap(2, '남의 상자는 열 수 없어요', 'No app can open another’s box')
    .cap(3, '민감한 기능은 사용자에게 물어봐요', 'Sensitive features ask the user')
    .cap(4, '허락한 만큼만 열려요', 'Access opens only as far as allowed')
    .cap(5, '샌드박스와 권한', 'Sandboxing and permissions');
  return S;
}
function sBuild() {
  const S = scene({ id: 'mo-build', steps: 5, per: 1.5 });
  const X = i => 1 + i * 5.15, L = [['소스 코드', 'source'], ['컴파일', 'compile'], ['패키징', 'package'], ['서명', 'sign'], ['스토어 심사', 'review'], ['사용자', 'users']];
  const SUB = ['Kotlin · Swift', 'DEX · ARM64', 'AAB · IPA', ['개발자 키', 'developer key'], ['정책·보안', 'policy check'], ['설치·업데이트', 'install']], ST = [1, 1, 1, 2, 4, 4], CL = ['ink-3', 'accent', 'accent', 'warn', 'ok', 'ok'];
  L.forEach((l, i) => { box2(S, 'p' + i, X(i), 1.6, 4.5, 2.2, l, CL[i], ST[i], { pct: 28 }); T(S, 's' + i, X(i), 4.1, SUB[i], 'cz-tc mo-xs', ST[i], { w: 4.5 }); if (i) ar(S, 'pa' + i, [X(i) - .62, 2.7], [X(i) - .04, 2.7], 'ink-3', ST[i], { h: .1 }); });
  const R = [[1, 'pk', ['앱 패키지', 'app package'], 'accent', 2], [9.4, 'hs', ['SHA-256 해시', 'SHA-256 hash'], 'ink-3', 2], [17.8, 'sg', ['개인키로 서명', 'sign: private key'], 'warn', 2]];
  R.forEach(([x, k, l, c, s]) => box2(S, k, x, 7.2, 6.4, 2.2, l, c, s, { pct: 28 }));
  ar(S, 'r1', [7.5, 8.3], [9.3, 8.3], 'ink-3', 2, { h: .1 }); ar(S, 'r2', [15.9, 8.3], [17.7, 8.3], 'ink-3', 2, { h: .1 });
  ar(S, 'r3', [24.3, 8.3], [25.1, 8.3], 'ok', 3, { h: .1 }); box2(S, 'vf', 25.2, 7.2, 5.8, 2.2, ['기기에서 검증 ✓', 'device verifies ✓'], 'ok', 3, { pct: 30 });
  box2(S, 'tp', 1, 10.6, 6.4, 2.2, ['변조된 패키지', 'tampered package'], 'danger', 3, { pct: 26 }); ar(S, 't1', [7.5, 11.7], [9.3, 11.7], 'danger', 3, { h: .1 });
  box2(S, 'th', 9.4, 10.6, 6.4, 2.2, ['해시가 달라짐', 'hash differs'], 'danger', 3, { pct: 26 }); ar(S, 't2', [15.9, 11.7], [17.7, 11.7], 'danger', 3, { h: .1, dash: 1 });
  box2(S, 'tv', 17.8, 10.6, 13.2, 2.2, ['서명과 안 맞음 → 설치 거부', 'signature mismatch → install refused'], 'danger', 3, { pct: 40 });
  [[1, ['① 컴파일러가 기기 CPU에서 돌 코드로 바꾸고 이미지·문자열과 함께 묶어요', '① compilers emit code for the device CPU, bundled with images and strings']],
   [2, ['② 패키지의 해시를 개발자의 개인키로 서명해요', '② the package’s hash is signed with the developer’s private key']],
   [3, ['③ 한 바이트만 바뀌어도 해시가 달라져 설치가 거부돼요', '③ change one byte and the hash no longer matches: install refused']],
   [4, ['④ 스토어가 정책과 악성 코드를 검사한 뒤 배포해요', '④ the store checks policy and malware before release']]].forEach(([s, t], i) => T(S, 'n' + i, 1, 14.2 + i * 1.2, t, 'mo-xs', s));
  T(S, 'z', 1, 19, ['업데이트는 같은 키로 서명하고 버전 번호를 올려야 설치돼요', 'updates must use the same key and a higher version number'], 'mo-xs mo-a', 5);
  S.cap(1, '코드를 기기용으로 컴파일하고 묶어요', 'Compile for the device and bundle it')
    .cap(2, '패키지에 디지털 서명을 붙여요', 'Attach a digital signature')
    .cap(3, '서명이 변조를 드러내요', 'The signature exposes tampering')
    .cap(4, '스토어 심사를 거쳐 사용자에게', 'Through store review to users')
    .cap(5, '빌드·서명·배포', 'Build, sign, ship');
  return S;
}
function sMain() {
  const S = scene({ id: 'mo-main', steps: 5, per: 1.5 });
  const X = k => 3.6 + k * 4.5, TL = ['0', '16.7', '33.3', '50', '66.7', '83.3', '100'];
  rect(S, 'ln0', 3.6, 3, 27, 2, 'line', 22, 0, { r: .2 }); rect(S, 'ln1', 3.6, 7, 27, 2, 'line', 22, 4, { r: .2 });
  T(S, 'la0', .4, 3.5, ['메인', 'main'], 'mo-xs'); T(S, 'la1', .4, 7.5, ['작업', 'worker'], 'mo-xs', 4);
  for (let k = 0; k <= 6; k++) { vl(S, 'v' + k, X(k), 2.4, 10.2, 'line', 0, { w: .08, dash: 1 }); T(S, 't' + k, X(k) - 1.5, 10.5, TL[k], 'cz-tc cz-mono mo-xs', 0, { w: 3 }); }
  T(S, 'ms', .4, 10.5, 'ms', 'cz-mono mo-xs');
  for (let k = 0; k < 6; k++) { rect(S, 'f' + k, X(k) + .15, 3.2, 2.2, 1.6, 'ok', 45, 1, { r: .15, off: k >= 1 && k <= 4 ? 2 : 0 }); if (k >= 1 && k <= 4) S.set('f' + k, 4, { opacity: '1' }); }
  T(S, 'h1', 3.6, .8, ['매 프레임: 입력 → 레이아웃 → 그리기를 16.7ms 안에', 'every frame: input → layout → draw, within 16.7 ms'], 'mo-xs mo-g', 1, { off: 2 });
  rect(S, 'hv', X(1) + .15, 3.2, X(4) + 2.2 - X(1) - .15, 1.6, 'danger', 45, 2, { r: .15, off: 4 });
  T(S, 'hvl', X(1) + .15, 3.55, ['이미지 디코딩 + JSON 파싱 · 80ms', 'decode image + parse JSON · 80 ms'], 'cz-tc mo-xs', 2, { w: X(4) + 2.2 - X(1) - .15, off: 4 });
  [2, 3, 4].forEach(k => xm(S, 'x' + k, X(k), 2.4, 2, { off: 4 }));
  T(S, 'h2', 3.6, .8, ['프레임 3개를 놓쳤어요 → 화면이 멈칫 (jank)', '3 frames missed → visible stutter (jank)'], 'mo-xs mo-r', 2, { off: 4 });
  rect(S, 'anr', 18, 12.2, 13, 3.4, 'ui', 0, 3, { r: .5, off: 4, css: 'border:.14em solid var(--line);box-shadow:0 .3em 1em rgba(0,0,0,.18)' });
  T(S, 'an1', 18.8, 12.7, ['앱이 응답하지 않습니다', 'App isn’t responding'], 'mo-s', 3, { off: 4 }); T(S, 'an2', 18.8, 14.2, ['기다리기 · 앱 닫기', 'Wait · Close app'], 'mo-xs mo-a', 3, { off: 4 });
  T(S, 'n3', 1, 12.4, ['입력에 5초 넘게 답이 없으면', 'no response to input for 5 s'], 'mo-s', 3, { off: 4 }); T(S, 'n3b', 1, 13.8, ['→ ANR 경고 (iOS는 워치독이 종료)', '→ ANR dialog (iOS: watchdog kill)'], 'mo-xs mo-r', 3, { off: 4 });
  rect(S, 'wk', X(1) + .15, 7.2, X(4) + 2.2 - X(1) - .15, 1.6, 'accent', 40, 4, { r: .15 });
  T(S, 'wkl', X(1) + .15, 7.55, ['이미지 디코딩 + JSON 파싱', 'decode image + parse JSON'], 'cz-tc mo-xs', 4, { w: X(4) + 2.2 - X(1) - .15 });
  ar(S, 'go', [X(1) + 1.2, 4.9], [X(1) + 1.2, 7.1], 'accent', 4, { h: .12 }); ar(S, 'bk', [X(4) + 2.6, 7.1], [X(5) + .9, 4.9], 'ok', 4, { h: .12 }); tsets(S, 'f5', [[4, 'accent', 50]]);
  T(S, 'n4', 1, 12.4, ['무거운 일은 작업 스레드로 → 메인은 매 프레임 제때', 'heavy work goes to a worker → main hits every frame'], 'mo-s mo-g', 4, { off: 5 }); T(S, 'n4b', 1, 13.8, ['결과만 메인으로 돌려보내 화면을 고쳐요', 'only the result hops back to update the UI'], 'mo-xs', 4, { off: 5 });
  [['120Hz 화면이면 예산은 8.3ms', 'at 120 Hz the budget is 8.3 ms', 'mo-s'], ['규칙: 네트워크·디스크·무거운 계산은 백그라운드에서', 'rule: network, disk and heavy computation run in the background', 'mo-xs'], ['UI는 메인 스레드에서만 고칠 수 있어요', 'only the main thread may touch the UI', 'mo-xs mo-a'], ['StrictMode(Android) · Main Thread Checker(Xcode)가 위반을 잡아 줘요', 'StrictMode (Android) and Main Thread Checker (Xcode) flag violations', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 12.4 + i * 1.4, [a, b], c, 5));
  S.cap(1, '메인 스레드가 매 프레임 화면을 그려요', 'The main thread draws every frame')
    .cap(2, '무거운 일이 끼면 프레임을 놓쳐요', 'Heavy work makes frames drop')
    .cap(3, '오래 막히면 응답 없음', 'Block too long and the app stops responding')
    .cap(4, '무거운 일은 다른 스레드로', 'Move heavy work to another thread')
    .cap(5, '메인(UI) 스레드와 프레임 예산', 'The main thread and the frame budget');
  return S;
}

/* ================= drawing the UI ================= */
function sLayout() {
  const S = scene({ id: 'mo-layout', steps: 5, per: 1.5 });
  box(S, 'rt', 5.6, 1.6, 5.2, 2, 'Column', 'accent', 0, { pct: 30 });
  const K = [['Header', 'warn'], ['Image', 'ok'], ['Text', 'ink-3']], CX = [3.2, 8.2, 13.2], SZ = ['360×56', '360×200', '360×80'], PY = ['y = 0', 'y = 56', 'y = 256'];
  K.forEach(([n, c], i) => { box(S, 'c' + i, CX[i] - 2.2, 7.4, 4.4, 2, n, c, 0, { pct: 30 }); const rx = 8.2 + (i - 1) * 1.2;
    ar(S, 'dn' + i, [rx - .3, 3.7], [CX[i] - .3, 7.3], 'accent', 1, { h: .1 }); ar(S, 'up' + i, [CX[i] + .3, 7.3], [rx + .3, 3.7], 'ok', 2, { h: .1 });
    T(S, 'sz' + i, CX[i] - 2.2, 9.6, SZ[i], 'cz-tc cz-mono mo-xs mo-g', 2, { w: 4.4 }); T(S, 'py' + i, CX[i] - 2.2, 10.7, PY[i], 'cz-tc cz-mono mo-xs mo-w', 3, { w: 4.4 }); });
  T(S, 'cs', 11.3, 1.7, 'w ≤ 360dp', 'cz-mono mo-xs mo-a', 1); T(S, 'cs2', 11.3, 2.8, ['제약 ↓', 'constraints ↓'], 'mo-xs mo-a', 1);
  phone(S, 'ph', 19, 1.2, 12, 15.4, 0);
  const s = 11 / 360, Y = [2, 2 + 56 * s, 2 + 256 * s], HH = [56 * s, 200 * s, 80 * s];
  K.forEach(([n, c], i) => { frame(S, 'o' + i, 19.5, Y[i], 11, HH[i], c, 3, { dash: 1, r: .15, w: .12 }); rect(S, 'fl' + i, 19.5, Y[i], 11, HH[i], c, 30, 4, { r: .15 }); });
  T(S, 'hd', 20.1, Y[0] + .4, ['☰  내 앱', '☰  My App'], 'mo-xs', 4); T(S, 'im', 19.5, Y[1] + HH[1] / 2 - .45, ['사진', 'photo'], 'cz-tc mo-s', 4, { w: 11 });
  rect(S, 'tx1', 20.1, Y[2] + .6, 9, .4, 'ink-3', 45, 4, { r: .2 }); rect(S, 'tx2', 20.1, Y[2] + 1.4, 6.4, .4, 'ink-3', 45, 4, { r: .2 });
  [[1, ['① 측정: 부모가 제약을 내려보내요', '① measure: constraints go down']], [2, ['② 크기: 자식이 크기를 올려보내요', '② size: children report sizes up']], [3, ['③ 배치: 부모가 위치를 정해요', '③ place: the parent sets positions']], [4, ['④ 그리기: 정해진 자리에 픽셀로', '④ draw: pixels at those spots']]]
    .forEach(([st, t], i) => T(S, 'n' + i, 1, 12.4 + i * 1.4, t, 'mo-s', st));
  T(S, 'z1', 1, 18, ['트리가 깊거나 자식을 여러 번 측정하면 프레임이 느려져요 → 평평하게', 'deep trees or repeated measuring slow frames down → keep it flat'], 'mo-xs', 5);
  T(S, 'z2', 1, 19.2, ['Flutter의 규칙: “제약은 내려가고, 크기는 올라오고, 위치는 부모가 정한다”', 'Flutter’s rule: “constraints go down, sizes go up, parents set position”'], 'mo-xs mo-a', 5);
  S.cap(1, '부모가 자식에게 쓸 수 있는 크기를 알려요', 'Parents tell children how much room they have')
    .cap(2, '자식은 자기 크기를 정해 알려요', 'Children pick their size and report it')
    .cap(3, '부모가 자식들의 위치를 정해요', 'The parent decides where each child goes')
    .cap(4, '그다음에야 픽셀로 그려요', 'Only then are pixels drawn')
    .cap(5, '측정 → 배치 → 그리기', 'Measure, lay out, draw');
  return S;
}
function sDecl() {
  const S = scene({ id: 'mo-decl', steps: 5, per: 1.5 });
  code(S, 'c', 1, 1.4, 15.6, ['@Composable', 'fun Counter() {', '  var n by remember { mutableStateOf(0) }', '  Button(onClick = { n++ }) {', ['    Text("$n번 눌렀어요")', '    Text("Taps: $n")'], '  }', '}'], [[3, 2], [2, 3], [4, 4]], { hoff: 5 });
  T(S, 'stl', 25, 1.9, ['← 상태', '← state'], 'mo-xs', 1);
  box(S, 'st0', 19, 1.4, 5.6, 2, 'n = 0', 'accent', 1, { pct: 30, off: 3 }); box(S, 'st1', 19, 1.4, 5.6, 2, 'n = 1', 'warn', 3, { pct: 40 });
  box(S, 'tc', 19, 4.6, 6, 1.8, 'Counter', 'line', 1, { pct: 45 }); box(S, 'tb', 20.4, 7.2, 6, 1.8, 'Button', 'line', 1, { pct: 45 }); box(S, 'tt', 21.8, 9.8, 6, 1.8, 'Text', 'line', 1, { pct: 45 });
  elb(S, 'e1', [[19.8, 6.4], [19.8, 8.1], [20.3, 8.1]], 'ink-3', 1); elb(S, 'e2', [[21.2, 9], [21.2, 10.7], [21.7, 10.7]], 'ink-3', 1);
  T(S, 'f', 26.4, 5, 'UI = f(state)', 'cz-mono mo-xs mo-a', 1, { off: 4 });
  tsets(S, 'tt', [[4, 'warn', 50]]); T(S, 'rc', 28.2, 10.1, ['다시 실행', 're-run'], 'mo-xs mo-w', 4);
  T(S, 'pvl', 19, 12.6, ['화면', 'screen'], 'mo-xs', 1);
  box2(S, 'pv0', 19, 13.6, 10, 2, ['0번 눌렀어요', 'Taps: 0'], 'accent', 1, { pct: 30, off: 4 }); box2(S, 'pv1', 19, 13.6, 10, 2, ['1번 눌렀어요', 'Taps: 1'], 'accent', 4, { pct: 30 });
  pt(S, 'tap', 26.6, 14.6, 2, C.warn, .45, { off: 3 }); ring(S, 'rip', 26.6, 14.6, 1.1, 'warn', 2, { off: 3, w: .1 });
  [[1, ['UI는 상태를 그리는 함수: 상태만 바꾸면 화면이 따라와요', 'UI is a function of state: change it and the screen follows'], 'mo-xs'], [2, ['버튼 탭 → onClick → n++', 'tap → onClick → n++'], 'mo-xs mo-w'], [3, ['n이 1로 바뀌면 프레임워크가 알아채요', 'when n becomes 1, the framework notices'], 'mo-xs'], [4, ['n을 읽는 Text만 다시 실행해 화면을 고쳐요', 'only Text, which reads n, re-runs and repaints'], 'mo-xs mo-g']]
    .forEach(([st, t, c], i) => T(S, 'n' + i, 1, 12 + i * 1.2, t, c, st));
  T(S, 'z1', 1, 17.6, ['명령형: 데이터가 바뀔 때마다 뷰를 찾아 직접 고침 → 하나 빠뜨리면 화면과 데이터가 어긋나요', 'imperative: find each view and patch it by hand → miss one and the screen drifts from the data'], 'mo-xs mo-r', 5);
  T(S, 'z2', 1, 18.8, ['SwiftUI · Jetpack Compose · Flutter · React가 모두 이 방식', 'SwiftUI, Jetpack Compose, Flutter and React all work this way'], 'mo-xs mo-a', 5);
  S.cap(1, '선언형 UI: 상태에서 화면을 그려요', 'Declarative UI: the screen is drawn from state')
    .cap(2, '사용자가 버튼을 눌러요', 'The user taps the button')
    .cap(3, '상태가 바뀌어요', 'The state changes')
    .cap(4, '그 상태를 읽는 부분만 다시 그려요', 'Only what reads that state is redrawn')
    .cap(5, '선언형 UI', 'Declarative UI');
  return S;
}
function sList() {
  const S = scene({ id: 'mo-list', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 1, 11, 16, 0);
  const Y = i => 2 + i * 2.2;
  for (let i = 0; i < 6; i++) { rect(S, 'r' + i, 1.6, Y(i), 9.8, 2, 'accent', 14, 0, { r: .3 }); T(S, 'l' + i, 2.3, Y(i) + .55, [`항목 ${i + 1}`, `item ${i + 1}`], 'mo-xs', 0, { off: i ? 0 : 3 });
    S.move('r' + i, 2, 1.6, Y(i) - 2.2); S.move('l' + i, 2, 2.3, Y(i) + .55 - 2.2); }
  S.set('r0', 2, { opacity: '.25' }); S.set('l0', 2, { opacity: '.25' });
  frame(S, 'gap', 1.6, Y(5), 9.8, 2, 'warn', 2, { dash: 1, r: .3, off: 3 }); T(S, 'gq', 1.6, Y(5) + .5, '?', 'cz-tc mo-s mo-w', 2, { w: 9.8, off: 3 });
  S.move('r0', 3, 1.6, Y(5)); S.set('r0', 3, { opacity: '1' }); tsets(S, 'r0', [[3, 'warn', 35]]);
  T(S, 'l6', 2.3, Y(5) + .55, ['항목 7 (재활용)', 'item 7 (recycled)'], 'mo-xs mo-w', 3);
  elb(S, 'rc', [[11.6, .8], [12.6, .8], [12.6, Y(5) + 1], [11.6, Y(5) + 1]], 'warn', 3, { off: 4 });
  T(S, 'h1', 14, 1.4, ['데이터 1,000개', '1,000 items of data'], 'mo-s'); T(S, 'h2', 14, 2.8, ['보이는 줄은 6개뿐', 'only 6 rows are visible'], 'mo-xs', 1);
  T(S, 'n2', 14, 4.6, ['스크롤: 맨 위 줄이 화면 밖으로', 'scroll: the top row leaves the screen'], 'mo-xs', 2);
  T(S, 'n3', 14, 5.9, ['그 뷰를 버리지 않고 아래로 옮겨', 'that view is not thrown away: it moves down'], 'mo-xs', 3);
  T(S, 'n3b', 14, 7.2, ['데이터만 바꿔 끼워요 (bind)', 'and gets new data bound to it'], 'mo-xs mo-w', 3);
  T(S, 'cd', 14, 8.6, 'onBindViewHolder(view, item 7)', 'cz-mono mo-xs', 3);
  T(S, 'm1', 14, 10.4, ['모두 만들면', 'create them all'], 'mo-xs', 4); rect(S, 'b1', 14, 11.4, 17, 1.2, 'danger', 40, 4, { r: .15 }); T(S, 'b1l', 14.4, 11.55, ['뷰 1,000개 · 메모리·생성 시간 폭발', '1,000 views · memory and setup explode'], 'mo-xs', 4);
  T(S, 'm2', 14, 13.2, ['재활용하면', 'recycle'], 'mo-xs', 4); rect(S, 'b2', 14, 14.2, .5, 1.2, 'ok', 60, 4, { r: .15 }); T(S, 'b2l', 14.9, 14.35, ['뷰 약 8개 · 화면 크기만큼만', 'about 8 views · bounded by the screen'], 'mo-xs mo-g', 4);
  T(S, 'z1', 1, 17.8, 'Android RecyclerView · Compose LazyColumn · iOS UICollectionView · Flutter ListView.builder', 'mo-xs mo-a', 5);
  T(S, 'z2', 1, 19, ['바인드 중엔 무거운 작업 금지 · 항목마다 고유 key를 주면 바뀐 줄만 갱신', 'keep binding cheap · stable keys let the list update only changed rows'], 'mo-xs', 5);
  S.cap(1, '긴 목록도 화면엔 몇 줄만 보여요', 'A long list shows only a few rows')
    .cap(2, '스크롤하면 맨 위 줄이 밖으로 나가요', 'Scrolling pushes the top row off screen')
    .cap(3, '나간 뷰를 아래에 다시 써요', 'That view is reused at the bottom')
    .cap(4, '뷰 개수가 화면 크기로 묶여요', 'The view count stays bounded by the screen')
    .cap(5, '리스트 뷰 재활용', 'List view recycling');
  return S;
}
function sDensity() {
  const S = scene({ id: 'mo-density', steps: 5, per: 1.5 });
  const X = [1, 11.4, 21.8], N = [4, 8, 12], D = ['160dpi · 1x', '320dpi · 2x', '480dpi · 3x'], PX = ['48dp = 48px', '48dp = 96px', '48dp = 144px'], W = 8.6, Y0 = 1.6;
  X.forEach((x, i) => { S.el('g' + i, { x, y: Y0, w: W, h: W, cls: 'mo-gs', css: `background-size:${r3(W / N[i])}em ${r3(W / N[i])}em;border:.1em solid var(--ink-3)`, s: hid() }); vis(S, 'g' + i, 1);
    rect(S, 'bt' + i, x + 2.15, Y0 + 2.15, 4.3, 4.3, 'accent', 35, 1, { r: .3, css: 'border:.1em solid var(--accent)' });
    T(S, 'd' + i, x, Y0 + W + .4, D[i], 'cz-tc cz-mono mo-xs', 1, { w: W }); T(S, 'p' + i, x, Y0 + W + 1.6, PX[i], 'cz-tc cz-mono mo-xs mo-a', 1, { w: W }); });
  S.set('bt2', 2, { opacity: '.2' }); S.set('bt2', 3, { opacity: '1' });
  rect(S, 'sm', X[2] + W / 2 - .72, Y0 + W / 2 - .72, 1.43, 1.43, 'danger', 60, 2, { r: .1, off: 3 });
  T(S, 'sml', X[2], Y0 + W + 2.8, ['48px로 정하면 1/3 크기', '48 px → a third the size'], 'cz-tc mo-xs mo-r', 2, { w: W, off: 3 });
  T(S, 'n1', 1, 14.1, ['같은 손가락 크기라도 화면마다 픽셀 수가 달라요', 'a fingertip covers a different number of pixels on each screen'], 'mo-xs', 1, { off: 2 });
  T(S, 'f', 1, 14, 'px = dp × (dpi ÷ 160)', 'cz-mono mo-s mo-a', 3);
  T(S, 'n3', 1, 15.4, ['밀도와 무관한 단위(Android dp, iOS pt)로 정하면 어느 화면에서나 같은 실제 크기', 'density-independent units (dp on Android, pt on iOS) keep the same physical size'], 'mo-xs', 3);
  T(S, 'n4', 1, 16.7, ['이미지는 1x·2x·3x 여러 벌이나 벡터로 · 글자는 sp로 사용자 글꼴 크기를 반영', 'ship 1x/2x/3x images or vectors · text in sp follows the user’s font size'], 'mo-xs', 4);
  T(S, 'n5', 1, 18, ['터치 영역은 최소 48dp(Android) · 44pt(iOS): 손가락 끝 크기', 'touch targets: at least 48 dp (Android) or 44 pt (iOS), about a fingertip'], 'mo-xs mo-g', 5);
  ring(S, 'fg', X[0] + W / 2, Y0 + W / 2, 2.5, 'warn', 5, { w: .16, dash: 1 });
  S.cap(1, '같은 크기 화면에 픽셀 수는 제각각', 'Same physical size, different pixel counts')
    .cap(2, 'px로 정하면 고밀도 화면에서 작아져요', 'Sizes in px shrink on dense screens')
    .cap(3, 'dp·pt로 정하면 실제 크기가 같아요', 'dp and pt keep the physical size')
    .cap(4, '이미지와 글자도 밀도에 맞춰요', 'Images and text adapt to density too')
    .cap(5, '화면 밀도와 단위', 'Screen density and units');
  return S;
}
function sGesture() {
  const S = scene({ id: 'mo-gesture', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 1, 11, 16, 0);
  const IY = i => 2.2 + i * 3, mv = (k, x, y, d3, d4) => { S.move(k, 3, x, y + d3); S.move(k, 4, x, y + d4); };
  for (let i = 0; i < 4; i++) { rect(S, 'it' + i, 1.7, IY(i), 9.6, 2.6, 'line', 35, 0, { r: .3 }); T(S, 'il' + i, 2.3, IY(i) + .8, [`항목 ${i + 1}`, `item ${i + 1}`], 'mo-xs'); mv('it' + i, 1.7, IY(i), 1.2, 2.4); mv('il' + i, 2.3, IY(i) + .8, 1.2, 2.4); }
  box2(S, 'btn', 7.4, IY(1) + .5, 3.4, 1.6, ['구매', 'Buy'], 'accent', 0, { pct: 30 }); mv('btn', 7.4, IY(1) + .5, 1.2, 2.4);
  tsets(S, 'btn', [[2, 'accent', 60], [3, 'danger', 30]]);
  pt(S, 'tp', 9.1, 6.5, 1, C.warn, .55, { off: 4 }); S.move('tp', 2, 9.1 - .55, 6.8 - .55); S.move('tp', 3, 9.1 - .55, 7.7 - .55);
  ar(S, 'vel', [6.4, 8.6], [6.4, 11.8], 'ok', 4, { h: .16, off: 5 }); T(S, 'vl', 6.8, 10, 'v', 'cz-mono mo-s mo-g', 4, { off: 5 });
  const TR = [['Window', 14, 1.6], ['List', 14, 4.2], [['항목 2', 'item 2'], 14, 6.8], [['구매 버튼', 'Buy button'], 14, 9.4]];
  TR.forEach(([l, x, y], i) => { box2(S, 'tn' + i, x, y, 6.2, 1.8, l, 'line', 0, { pct: 40 }); if (i) ar(S, 'ta' + i, [17.1, y - .75], [17.1, y - .05], 'ink-3', 0, { h: .1 }); tsets(S, 'tn' + i, [[1, 'accent', 30]]); });
  tsets(S, 'tn3', [[1, 'accent', 30], [3, 'danger', 35]]); tsets(S, 'tn1', [[1, 'accent', 30], [3, 'ok', 45]]);
  [[1, ['DOWN → 버튼', 'DOWN → button'], 'mo-xs mo-a'], [2, ['MOVE 3dp < 슬롭 8dp', 'MOVE 3dp < slop 8dp'], 'mo-xs'], [3, ['MOVE 20dp > 슬롭', 'MOVE 20dp > slop'], 'mo-xs'], [3, ['List가 가로챔 (intercept)', 'List intercepts'], 'mo-xs mo-g'], [3, ['버튼 ← CANCEL', 'button ← CANCEL'], 'mo-xs mo-r'], [4, ['UP + 속도 → 플링', 'UP + velocity → fling'], 'mo-xs mo-g']]
    .forEach(([st, t, c], j) => T(S, 'lg' + j, 21.6, 1.8 + j * 1.3, t, c, st));
  [[1, ['① 히트 테스트: 손가락 아래 가장 깊은 뷰를 찾아요', '① hit test: find the deepest view under the finger']], [2, ['터치 슬롭: 이만큼 움직이기 전엔 아직 탭일 수 있어요', 'touch slop: until it moves this far, it may still be a tap']], [3, ['스크롤로 판정되면 버튼의 누름은 취소돼요', 'once it is a scroll, the button press is cancelled']], [4, ['손을 떼도 속도만큼 미끄러지다 서서히 멈춰요', 'released with speed, it glides and slows down']]]
    .forEach(([st, t], i) => T(S, 'n' + i, 14, 11.8 + i * 1.3, t, 'mo-xs', st, { off: 5 }));
  [['제스처 인식기가 탭·길게 누르기·스와이프·핀치를 구분해요', 'recognizers sort taps, long presses, swipes, pinches', 'mo-xs'], ['부모가 가로챌지 정해서 스크롤 안의 버튼도 자연스럽게', 'parents may intercept → buttons inside scrollers work', 'mo-xs'], ['터치 영역은 최소 48dp / 44pt', 'touch targets: at least 48 dp / 44 pt', 'mo-xs mo-g']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 14, 11.8 + i * 1.3, [a, b], c, 5));
  S.cap(1, '손가락 아래의 뷰를 찾아요 (히트 테스트)', 'Find the view under the finger (hit testing)')
    .cap(2, '조금 움직여도 아직 탭 후보예요', 'A tiny move is still a possible tap')
    .cap(3, '많이 움직이면 스크롤로 바뀌어요', 'Move far enough and it becomes a scroll')
    .cap(4, '떼는 순간의 속도로 플링', 'Release speed turns into a fling')
    .cap(5, '터치와 제스처', 'Touch and gestures');
  return S;
}
function sAnim() {
  const S = scene({ id: 'mo-anim', steps: 5, per: 1.5 });
  const F = fr(0, 1, -.1, 1.3, 2, 14, 2.2, 13);
  hl(S, 'ax', 2, 14, F.Y(0), 'ink-3', 0, { w: .1 }); vl(S, 'ay', 2, 2.2, 13, 'ink-3', 0, { w: .1 }); hl(S, 'tg', 2, 14, F.Y(1), 'line', 0, { dash: 1, w: .08 });
  T(S, 'xl', 10.8, F.Y(0) + .3, ['시간 →', 'time →'], 'mo-xs'); T(S, 'yl', 2.3, 1.2, ['위치', 'position'], 'mo-xs'); T(S, 'gl', 14.2, F.Y(1) - .5, ['목표', 'target'], 'mo-xs');
  const E = [['linear', t => t, 'ink-3'], ['ease-out', t => 1 - (1 - t) ** 3, 'accent'], ['spring', t => 1 - Math.exp(-5 * t) * Math.cos(10 * t), 'warn']];
  E.forEach(([n, f, c], i) => { const st = i + 1, y = 3.6 + i * 4.4;
    pplot(S, 'c' + i, t => [F.X(t), F.Y(f(t))], 0, 1, { st, color: c, h: .12, n: 40 });
    T(S, 'tn' + i, 17, y - 1.6, n, 'cz-mono mo-xs', st); hl(S, 'tk' + i, 17, 30.6, y, 'line', st, { w: .08 }); vl(S, 'tt' + i, 28, y - .9, y + .9, 'ink-3', st, { w: .08, dash: 1 });
    for (let j = 0; j <= 12; j++) pt(S, `d${i}_${j}`, 17 + 11 * f(j / 12), y, st, { background: `var(--${c})`, 'border-color': `var(--${c})` }, .28); });
  [['linear: 일정한 속도 → 기계적으로 보여요', 'linear: constant speed looks mechanical'], ['ease-out: 빠르게 출발해 부드럽게 멈춰요 (화면에 들어올 때)', 'ease-out: quick start, gentle stop (great for entering)'], ['spring: 목표를 살짝 지나쳤다 돌아와요 (손을 뗀 뒤)', 'spring: overshoots a little and settles (great after a drag)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14.6, t, 'mo-s', i + 1, { off: i + 2 }));
  T(S, 'n4', 1, 14.6, ['점 하나 = 한 프레임(16.7ms) · 곡선이 매 프레임 위치를 정해요', 'one dot = one frame (16.7 ms) · the curve sets each position'], 'mo-s', 4);
  T(S, 'n4b', 1, 16, ['120Hz 화면이면 점이 두 배로 촘촘해져요', 'on a 120 Hz screen the dots are twice as dense'], 'mo-xs', 4);
  T(S, 'z1', 1, 17.3, ['레이아웃보다 transform·opacity를 움직이면 GPU 합성만으로 부드러워요', 'animate transform and opacity, not layout: the GPU compositor handles them'], 'mo-xs mo-g', 5);
  T(S, 'z2', 1, 18.6, ['스프링은 시간 대신 강성·감쇠로 정의 → 도중에 끊겨도 자연스럽게 이어져요', 'springs use stiffness and damping, not duration → interruptions stay smooth'], 'mo-xs', 5);
  S.cap(1, '애니메이션 = 시간에 따른 위치 곡선', 'An animation is position as a function of time')
    .cap(2, 'ease-out은 감속하며 도착해요', 'Ease-out decelerates into place')
    .cap(3, '스프링은 실제 물체처럼 튕겨요', 'A spring bounces like a real object')
    .cap(4, '매 프레임 곡선 값을 그려요', 'Each frame samples the curve')
    .cap(5, '애니메이션과 이징', 'Animation and easing');
  return S;
}
/* ================= state & architecture ================= */
function sState() {
  const S = scene({ id: 'mo-state', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 1.6, 9, 13.4, 0);
  box(S, 'vm', 13.4, 5, 7.2, 3.4, 'ViewModel', 'accent', 0, { pct: 28 }); box(S, 'rp', 24, 5, 7, 3.4, ['저장소', 'Repository'], 'ink-3', 0, { pct: 22 });
  ar(S, 'as', [13.3, 5.8], [10.2, 5.8], 'accent', 1, { h: .14 }); T(S, 'asl', 10.4, 4.6, 'state', 'cz-mono mo-xs mo-a', 1);
  ar(S, 'ae', [10.2, 7.6], [13.3, 7.6], 'warn', 2, { h: .14 }); T(S, 'ael', 10.4, 7.9, 'event', 'cz-mono mo-xs mo-w', 2);
  ar(S, 'af', [20.7, 5.8], [23.9, 5.8], 'ink-3', 3, { h: .12 }); T(S, 'afl', 21, 4.6, ['요청', 'fetch'], 'mo-xs', 3);
  ar(S, 'ad', [23.9, 7.6], [20.7, 7.6], 'ok', 4, { h: .12 }); T(S, 'adl', 21, 7.9, ['데이터', 'data'], 'mo-xs mo-g', 4);
  [['UiState(loading=false, items=[])', 1, 3], ['UiState(loading=true, items=[])', 3, 4], ['UiState(loading=false, items=[3])', 4, 0]].forEach(([t, s, o], i) => T(S, 'us' + i, 10, 9.4, t, 'cz-tc cz-mono mo-xs', s, { w: 14, off: o }));
  T(S, 'em', 1, 6.4, ['아직 항목 없음', 'no items yet'], 'cz-tc mo-xs', 1, { w: 9, off: 3 });
  box2(S, 'rf', 2.4, 12.4, 6.2, 1.8, ['새로고침', 'Refresh'], 'accent', 1, { pct: 30 }); pt(S, 'tap', 6.6, 13.3, 2, C.warn, .45, { off: 3 });
  ring(S, 'sp', 5.5, 7, 1.2, 'accent', 3, { off: 4, w: .2, css: 'border-right-color:transparent' });
  for (let i = 0; i < 3; i++) rect(S, 'li' + i, 1.8, 3.4 + i * 2.6, 7.4, 2.2, 'ok', 20, 4, { r: .3 });
  [['UI는 받은 상태를 그대로 그려요', 'the UI renders whatever state it is given'], ['사용자 동작은 이벤트로 올려 보내요', 'user actions go up as events'], ['뷰모델이 새 상태를 내보내요 → 로딩 표시', 'the ViewModel emits a new state → spinner'], ['데이터가 오면 다시 새 상태 → 목록 표시', 'data arrives → another state → list']]
    .forEach((t, i) => T(S, 'n' + i, 12, 11.4, t, 'mo-s', i + 1, { off: i + 2 }));
  [['상태는 한곳(뷰모델)에만 · UI는 그리기만 하고 바꾸는 건 이벤트로', 'state lives in one place (the ViewModel) · the UI only renders and sends events', 'mo-xs mo-a'], ['데이터가 한 방향으로만 흘러 버그를 추적하기 쉬워요', 'data flows one way, so bugs are easy to trace', 'mo-xs'], ['여러 위젯이 쓰는 상태는 공통 부모로 끌어올려요 (state hoisting)', 'state shared by several widgets is hoisted to a common parent', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 16.4 + i * 1.2, [a, b], c, 5));
  S.cap(1, '화면은 상태를 그린 결과예요', 'The screen is a rendering of state')
    .cap(2, '사용자 동작은 이벤트가 되어 올라가요', 'User actions travel up as events')
    .cap(3, '상태가 바뀌면 화면이 따라 바뀌어요', 'New state, new screen')
    .cap(4, '데이터도 상태를 거쳐 화면으로', 'Data reaches the screen through state')
    .cap(5, '단방향 데이터 흐름', 'Unidirectional data flow');
  return S;
}
function sMvvm() {
  const S = scene({ id: 'mo-mvvm', steps: 5, per: 1.5 });
  phone(S, 'p1', 2.6, 1.6, 6.4, 11.4, 0, { off: 3 }); T(S, 'p1l', 2.6, 2.4, 'Activity #1', 'cz-tc cz-mono mo-xs', 0, { w: 6.4, off: 3 });
  for (let i = 0; i < 3; i++) rect(S, 'r' + i, 3.3, 3.8 + i * 2.6, 5, 2.1, 'accent', 18, 0, { r: .3, off: 3 });
  ['p1', 'p1n', 'p1l', 'r0', 'r1', 'r2'].forEach(k => S.set(k, 2, { opacity: '.3' }));
  xm(S, 'x1', 5.8, 7.4, 2, { off: 3 }); T(S, 'rot', 10.6, 9.6, ['⟳ 회전', '⟳ rotate'], 'mo-s mo-w', 2, { off: 3 });
  phone(S, 'p2', 1, 3.6, 12, 6.4, 3); T(S, 'p2l', 1, 4.3, 'Activity #2', 'cz-tc cz-mono mo-xs', 3, { w: 12 });
  for (let i = 0; i < 3; i++) rect(S, 'q' + i, 1.7 + i * 3.6, 5.6, 3.2, 3.6, 'accent', 18, 3, { r: .3 });
  rect(S, 'vmp', 18, 2, 13, 7.4, 'accent', 10, 0, { r: .5, css: 'border:.14em solid var(--accent)' });
  T(S, 'vmt', 18.6, 2.5, 'ViewModel', 'cz-mono mo-s mo-a'); [['상품 120개', '120 products'], ['스크롤 위치 48', 'scroll position 48'], ['검색어 “신발”', 'query “shoes”']].forEach((t, i) => T(S, 'vm' + i, 18.8, 4.2 + i * 1.5, t, 'mo-xs'));
  ar(S, 'o1', [9.2, 5.2], [17.9, 5.2], 'ink-3', 1, { h: .12, off: 2, dash: 1 }); T(S, 'o1l', 10.4, 3.9, ['관찰', 'observe'], 'mo-xs', 1, { off: 2 });
  ar(S, 'o2', [13.2, 6.8], [17.9, 6.8], 'ok', 3, { h: .14 }); T(S, 'o2l', 13.4, 7.2, ['다시 구독', 're-subscribe'], 'mo-xs mo-g', 3);
  frame(S, 'bad', 18, 11, 13, 3.4, 'danger', 4, { dash: 1, r: .4 }); T(S, 'b1', 18.6, 11.4, ['Activity에 둔 데이터 → 사라짐', 'data kept in the Activity → lost'], 'mo-xs mo-r', 4); T(S, 'b2', 18.6, 12.8, ['→ 네트워크에서 다시 받아야 해요', '→ refetched from the network'], 'mo-xs', 4);
  [['화면(Activity)이 ViewModel의 데이터를 관찰해요', 'the screen (Activity) observes the ViewModel’s data'], ['회전하면 Activity는 파괴되고 새로 만들어져요', 'rotation destroys the Activity and builds a new one'], ['ViewModel은 그대로 → 새 화면이 같은 데이터를 바로 그려요', 'the ViewModel survives → the new screen redraws instantly'], ['데이터를 Activity에 뒀다면 회전할 때마다 다시 받아야 해요', 'data held in the Activity would be refetched on every rotation']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.6, t, 'mo-s', i + 1, { off: i + 2 }));
  [['ViewModel은 화면(View)을 참조하지 않아요 → 누수 없음, 테스트 쉬움', 'a ViewModel never references the View → no leaks, easy to test', 'mo-xs mo-a'], ['MVC → MVP → MVVM → MVI: 화면 로직을 화면 밖으로 꺼내는 방향으로 발전', 'MVC → MVP → MVVM → MVI: moving screen logic out of the screen', 'mo-xs'], ['프로세스째 정리될 때는 SavedStateHandle로 작은 값만 저장해요', 'for process death, save small values with SavedStateHandle', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 15.6 + i * 1.3, [a, b], c, 5));
  S.cap(1, 'ViewModel이 화면의 데이터를 들고 있어요', 'The ViewModel holds the screen’s data')
    .cap(2, '화면을 돌리면 Activity가 새로 만들어져요', 'Rotating rebuilds the Activity')
    .cap(3, 'ViewModel은 살아남아요', 'The ViewModel survives')
    .cap(4, '화면이 데이터를 쥐고 있었다면?', 'What if the screen held the data?')
    .cap(5, 'MVVM과 ViewModel', 'MVVM and the ViewModel');
  return S;
}
function sNav() {
  const S = scene({ id: 'mo-nav', steps: 5, per: 1.5 });
  T(S, 'hd', 2, 1.2, ['백 스택', 'back stack'], 'mo-s');
  hl(S, 'base', 1.4, 12.6, 16.5, 'ink-3', 0, { w: .12 });
  box(S, 'k0', 2, 14, 10, 2.2, 'Home', 'ink-3', 1, { pct: 25 });
  box(S, 'k1', 2, 11.4, 10, 2.2, ['목록', 'List'], 'accent', 2, { pct: 25, off: 4 });
  box(S, 'k2', 2, 8.8, 10, 2.2, ['상세', 'Detail'], 'accent', 2, { pct: 35, off: 3 });
  T(S, 'pu', 12.8, 9.4, 'push ↓', 'cz-mono mo-xs mo-a', 2, { off: 3 }); T(S, 'po', 12.8, 9.4, 'pop ↑', 'cz-mono mo-xs mo-r', 3, { off: 4 });
  box(S, 'k3', 2, 11.4, 10, 2.2, ['상세 #42', 'Detail #42'], 'warn', 4, { pct: 35 });
  T(S, 'dl', 2, 4.6, 'shop://product/42', 'cz-mono mo-xs mo-w', 4); ar(S, 'dla', [7, 5.8], [7, 11.2], 'warn', 4, { h: .14 });
  phone(S, 'ph', 19, 1.4, 10, 14.6, 0);
  [['Home', 1, 2], [['상세', 'Detail'], 2, 3], [['목록', 'List'], 3, 4], [['상세 #42', 'Detail #42'], 4, 5]].forEach(([t, s, o], i) => T(S, 'sc' + i, 19, 7.6, t, 'cz-tc mo-l', s, { w: 10, off: o }));
  T(S, 'bk', 19.8, 2.2, ['← 뒤로', '← Back'], 'mo-xs mo-a', 2); S.set('bk', 5, { opacity: '0' });
  [['탭 1', 'Tab 1'], ['탭 2', 'Tab 2'], ['탭 3', 'Tab 3']].forEach((t, i) => box2(S, 'tb' + i, 19.6 + i * 3, 13.8, 2.8, 1.6, t, i ? 'line' : 'accent', 5, { pct: i ? 40 : 30 }));
  T(S, 'sc4', 19, 7.6, 'Home', 'cz-tc mo-l', 5, { w: 10 });
  [['앱을 열면 첫 화면이 스택 맨 아래에 놓여요', 'the first screen sits at the bottom of the stack'], ['화면을 열 때마다 위에 쌓아요 (push)', 'every new screen is pushed on top'], ['뒤로 가기는 맨 위를 꺼내요 (pop)', 'back pops the top screen'], ['딥 링크로 바로 열어도 그 밑에 자연스러운 스택을 만들어 줘요', 'a deep link opens a screen directly and builds a sensible stack beneath it']]
    .forEach((t, i) => T(S, 'n' + i, 1, 17.6, t, 'mo-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17.6, ['탭마다 따로 스택을 두고, 화면 사이엔 ID 같은 작은 값만 넘겨요', 'each tab keeps its own stack · pass small values like IDs between screens'], 'mo-s', 5);
  T(S, 'z2', 1, 19, 'Android Navigation · iOS NavigationStack · Flutter Navigator (go_router)', 'mo-xs mo-a', 5);
  S.cap(1, '첫 화면이 스택에 들어가요', 'The first screen enters the stack')
    .cap(2, '화면을 열면 위에 쌓여요', 'Opening a screen pushes it')
    .cap(3, '뒤로 가면 맨 위가 빠져요', 'Back pops the top')
    .cap(4, '딥 링크는 스택을 만들어 줘요', 'Deep links build a stack for you')
    .cap(5, '내비게이션과 백 스택', 'Navigation and the back stack');
  return S;
}
function sAsync() {
  const S = scene({ id: 'mo-async', steps: 5, per: 1.5 });
  code(S, 'c', 1, 1.4, 16, ['suspend fun load() {', '  spinner.show()', ['  val user = api.getUser() // 대기', '  val user = api.getUser() // waits'], '  name.text = user.name', '  spinner.hide()', '}'], [[1, 1], [2, 2], [3, 3]], { hoff: 4 });
  code(S, 'k', 18, 1.4, 13, ['api.getUser { user ->', '  api.getPosts(user) { posts ->', '    api.getLikes(posts) { likes ->', '      show(likes)', '    }', '  }', '}'], [], { st: 4 });
  tsets(S, 'kbg', [[4, 'danger', 10]]);
  const X = ms => 4 + ms / 400 * 27;
  rect(S, 'ln0', 4, 12.2, 27, 1.8, 'line', 22, 0, { r: .2 }); rect(S, 'ln1', 4, 14.8, 27, 1.8, 'line', 22, 2, { r: .2 });
  T(S, 'la0', .4, 12.6, ['메인', 'main'], 'mo-xs'); T(S, 'la1', .4, 15.2, 'IO', 'cz-mono mo-xs', 2);
  rect(S, 'm1', X(0), 12.4, X(25) - X(0), 1.4, 'accent', 45, 1, { r: .15 });
  ar(S, 'go', [X(26), 13.9], [X(26), 14.9], 'ink-3', 2, { h: .1 }); rect(S, 'io', X(30), 15, X(330) - X(30), 1.4, 'warn', 40, 2, { r: .15 });
  T(S, 'iol', X(30), 15.25, ['getUser() · 네트워크 300ms', 'getUser() · network 300 ms'], 'cz-tc mo-xs', 2, { w: X(330) - X(30) });
  for (let k = 0; k < 9; k++) rect(S, 'fr' + k, X(40 + k * 33.3), 12.4, 1, 1.4, 'ok', 40, 2, { r: .12 });
  T(S, 'frl', X(40), 11.2, ['그동안 메인은 다른 프레임을 그려요', 'meanwhile main keeps drawing frames'], 'mo-xs mo-g', 2);
  ar(S, 'bk', [X(335), 14.9], [X(345), 13.9], 'ok', 3, { h: .1 }); rect(S, 'm2', X(345), 12.4, X(395) - X(345), 1.4, 'accent', 45, 3, { r: .15 });
  [['코루틴이 메인 스레드에서 시작해 로딩 표시를 켜요', 'the coroutine starts on main and shows the spinner'], ['네트워크를 기다리는 동안 스레드를 붙잡지 않고 비켜요 (중단)', 'while waiting on the network it suspends and frees the thread'], ['응답이 오면 멈춘 줄부터 메인에서 이어서 실행해요', 'when the reply arrives it resumes on main right where it stopped'], ['콜백으로 쓰면 단계마다 안쪽으로 파고들어요 (콜백 지옥)', 'with callbacks every step nests deeper (callback hell)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 17.6, t, 'mo-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17.6, ['화면이 닫히면 viewModelScope가 진행 중인 작업도 함께 취소해요', 'when the screen closes, viewModelScope cancels its work too'], 'mo-s', 5);
  T(S, 'z2', 1, 19, ['Kotlin 코루틴 · Swift async/await · Dart Future · JS async/await', 'Kotlin coroutines · Swift async/await · Dart futures · JS async/await'], 'mo-xs mo-a', 5);
  S.cap(1, '비동기 함수가 시작돼요', 'An async function starts')
    .cap(2, '기다리는 동안 스레드를 내줘요', 'It gives the thread back while it waits')
    .cap(3, '결과가 오면 이어서 실행', 'It resumes when the result arrives')
    .cap(4, '콜백보다 읽기 쉬워요', 'Easier to read than callbacks')
    .cap(5, '코루틴과 async/await', 'Coroutines and async/await');
  return S;
}
function sReactive() {
  const S = scene({ id: 'mo-reactive', steps: 5, per: 1.5 });
  const X = t => 4.4 + t * .0128, LY = [3, 8.4, 13];
  [['입력', 'input'], 'debounce', 'switchMap'].forEach((l, i) => { T(S, 'll' + i, .4, LY[i] - .45, l, 'cz-mono mo-xs', i === 0 ? 0 : i + 1); ar(S, 'la' + i, [4, LY[i]], [31, LY[i]], 'ink-3', i === 0 ? 0 : i + 1, { h: .08 }); });
  const K = [[100, 'k'], [250, 'ko'], [400, 'kot'], [1000, 'kotl'], [1150, 'kotli'], [1300, 'kotlin']];
  K.forEach(([t, l], i) => { pt(S, 'k' + i, X(t), LY[0], 1, C.cur, .42); T(S, 'kl' + i, X(t) - 1.2, LY[0] + .6, l, 'cz-tc cz-mono mo-tiny', 1, { w: 2.4 });
    const end = Math.min(t + 300, i < K.length - 1 ? K[i + 1][0] : 1e9), done = t + 300 <= end;
    rect(S, 'w' + i, X(t), 4.8, X(end) - X(t), .5, done ? 'ok' : 'warn', done ? 55 : 30, 2, { r: .1 });
    if (done) { vl(S, 'g' + i, X(t + 300), 5.3, LY[1] - .5, 'ok', 2, { w: .06, dash: 1 }); pt(S, 'e' + i, X(t + 300), LY[1], 2, C.okf, .42); T(S, 'el' + i, X(t + 300) - 1.5, LY[1] + .6, l, 'cz-tc cz-mono mo-xs mo-g', 2, { w: 3 }); } });
  T(S, 'wl', X(1300) + 4.4, 4.6, '300ms', 'cz-mono mo-tiny', 2);
  rect(S, 'q0', X(700), 12.5, X(1600) - X(700), 1, 'warn', 35, 3, { r: .15 }); T(S, 'q0l', X(700), 12.55, ['검색 “kot”', 'search “kot”'], 'cz-tc mo-xs', 3, { w: X(1600) - X(700) });
  xm(S, 'qx', X(1600), 13, 3); T(S, 'qxl', X(1600) - 3.2, 14, ['취소', 'cancel'], 'cz-tc mo-xs mo-r', 3, { w: 3 });
  rect(S, 'q1', X(1600), 12.5, X(2000) - X(1600), 1, 'accent', 40, 3, { r: .15 }); T(S, 'q1l', X(1600), 12.55, '“kotlin”', 'cz-tc mo-xs', 3, { w: X(2000) - X(1600) });
  ar(S, 'rs', [X(2000) - .4, 13.6], [X(2000) - .4, 14.9], 'ok', 4, { h: .12 }); box2(S, 'res', 23, 15, 7.8, 1.8, ['“kotlin” 결과 표시', 'show “kotlin” results'], 'ok', 4, { pct: 35 });
  [['글자를 칠 때마다 값이 흘러나와요 (스트림)', 'each keystroke emits a value (a stream)'], ['debounce: 300ms 조용해야 내보내요 → 요청 6번 대신 2번', 'debounce: emit after 300 ms of quiet → 2 requests, not 6'], ['switchMap: 새 값이 오면 이전 요청을 취소하고 새로 시작', 'switchMap: a new value cancels the old request'], ['늦게 온 옛 결과가 새 결과를 덮어쓰는 버그도 사라져요', 'no more stale results overwriting newer ones']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.2, t, 'mo-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17.8, ['스트림 = 시간에 따라 오는 값 · 연산자로 거르고(filter) 바꾸고(map) 합쳐요(combine)', 'streams are values over time · operators filter, map and combine them'], 'mo-xs', 5);
  T(S, 'z2', 1, 19, 'Kotlin Flow · Swift Combine · RxJava / RxSwift · Dart Stream', 'mo-xs mo-a', 5);
  S.cap(1, '입력이 시간에 따라 흐르는 값이 돼요', 'Input becomes values flowing over time')
    .cap(2, 'debounce로 잠깐 멈출 때만 보내요', 'Debounce waits for a pause')
    .cap(3, 'switchMap은 최신 요청만 남겨요', 'switchMap keeps only the latest request')
    .cap(4, '최신 결과만 화면에', 'Only the freshest result is shown')
    .cap(5, '반응형 스트림', 'Reactive streams');
  return S;
}

/* ================= data & network ================= */
function sStorage() {
  const S = scene({ id: 'mo-storage', steps: 5, per: 1.5 });
  const IT = ['darkMode = true', ['메시지 5만 개', '50,000 messages'], ['사진·동영상 3MB', '3 MB photo / video'], ['로그인 토큰', 'login token']];
  const ST = [[['키-값 저장소', 'key–value store'], 'DataStore · UserDefaults'], [['데이터베이스 (SQLite)', 'database (SQLite)'], 'Room · Core Data · SwiftData'], [['파일 시스템', 'file system'], ['앱 전용 폴더 · 캐시 폴더', 'app files · cache dir']], [['보안 저장소 (암호화)', 'secure storage (encrypted)'], 'Keystore · Keychain']];
  const WHY = [['작은 설정값', 'small setting'], ['많고, 검색해야', 'many, queried'], ['큰 바이너리', 'large binary'], ['비밀', 'secret']], CL = ['accent', 'ok', 'warn', 'danger'];
  IT.forEach((t, i) => { const y = 1.6 + i * 4.2, st = i + 1;
    box2(S, 'i' + i, 1, y, 9.4, 2.4, t, CL[i], 0, { pct: 22 });
    box(S, 's' + i, 17.4, y, 13.6, 2.4, ST[i][0], 'line', 0, { pct: 40 }); tsets(S, 's' + i, [[st, CL[i], 30]]);
    T(S, 'ss' + i, 17.4, y + 2.6, ST[i][1], 'cz-mono mo-xs', st);
    ar(S, 'a' + i, [10.6, y + 1.2], [17.2, y + 1.2], CL[i], st, { h: .14 }); T(S, 'w' + i, 11.2, y + .05, WHY[i], 'mo-xs', st); });
  T(S, 'z1', 1, 18.4, ['캐시 폴더는 공간이 부족하면 OS가 지울 수 있어요 · 앱을 지우면 모두 사라져요', 'the OS may clear the cache dir when space runs low · uninstalling wipes it all'], 'mo-xs', 5);
  T(S, 'z2', 1, 19.6, ['비밀번호·토큰을 일반 파일이나 설정값에 평문으로 두면 안 돼요', 'never keep passwords or tokens in plain files or preferences'], 'mo-xs mo-r', 5);
  S.cap(1, '작은 설정값은 키-값 저장소에', 'Small settings go in a key–value store')
    .cap(2, '많고 구조화된 데이터는 데이터베이스에', 'Lots of structured data goes in a database')
    .cap(3, '큰 파일은 파일 시스템에', 'Big files go in the file system')
    .cap(4, '비밀은 암호화된 보안 저장소에', 'Secrets go in encrypted secure storage')
    .cap(5, '로컬 저장소 고르기', 'Choosing local storage');
  return S;
}
function sOffline() {
  const S = scene({ id: 'mo-offline', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 2, 6.6, 10.4, 0);
  [['장보기', 'groceries'], ['회의 메모', 'meeting notes']].forEach((t, i) => box2(S, 'u' + i, 1.6, 3.4 + i * 2.4, 5.4, 2, t, 'line', 1, { pct: 40 }));
  box2(S, 'u2', 1.6, 8.2, 5.4, 2, ['새 메모 ✎', 'new memo ✎'], 'warn', 2, { pct: 40 });
  box(S, 'db', 10, 3, 6.4, 4.4, ['로컬 DB', 'local DB'], 'accent', 0, { pct: 26 }); T(S, 'dbs', 10, 7.7, ['진실의 원천', 'source of truth'], 'cz-tc mo-xs mo-a', 0, { w: 6.4 });
  box(S, 'sv', 25, 3, 6, 4.4, ['서버', 'server'], 'ink-3', 0, { pct: 22 });
  ar(S, 'ob', [9.9, 6.2], [7.8, 6.2], 'accent', 1, { h: .12 }); ar(S, 'wr', [7.8, 4.4], [9.9, 4.4], 'warn', 2, { h: .12 });
  ar(S, 'up', [16.6, 4.4], [24.9, 4.4], 'ink-3', 1, { h: .12 }); ar(S, 'dn', [24.9, 6.2], [16.6, 6.2], 'ink-3', 1, { h: .12 });
  [['온라인', 'online', 'mo-g', 1, 2], ['오프라인', 'offline', 'mo-r', 2, 4], ['다시 온라인', 'online again', 'mo-g', 4, 0]].forEach(([a, b, c, s, o], i) => T(S, 'ns' + i, 16.6, 2.6, [a, b], 'cz-tc mo-xs ' + c, s, { w: 8.3, off: o }));
  xm(S, 'nx', 20.8, 5.3, 2, { off: 4 }); ['up', 'dn'].forEach(k => { S.set(k, 2, { opacity: '.2' }); S.set(k, 4, { opacity: '1' }); });
  T(S, 'qh', 10, 9.4, ['보낼 대기열', 'outbox'], 'mo-xs', 2);
  box2(S, 'q0', 10, 10.6, 3, 1.6, ['+ 메모', '+ memo'], 'warn', 2, { pct: 35, off: 5 }); box2(S, 'q1', 13.4, 10.6, 3, 1.6, ['수정', 'edit'], 'warn', 3, { pct: 35, off: 5 });
  tsets(S, 'u1', [[3, 'warn', 30]]);
  elb(S, 'fl', [[16.6, 11.4], [28, 11.4], [28, 7.6]], 'ok', 4, { h: .14 }); T(S, 'fll', 18, 11.8, ['대기 2 → 0', '2 queued → 0'], 'mo-xs mo-g', 4);
  frame(S, 'cf', 17, 13, 14, 4, 'warn', 5, { r: .4 }); T(S, 'c1', 17.6, 13.4, ['다른 기기에서 같은 메모를 고쳤다면?', 'same memo edited on another device?'], 'mo-xs mo-w', 5);
  T(S, 'c2', 17.6, 14.6, ['마지막 쓰기 우선: 간단하지만 덮어써요', 'last write wins: simple, may overwrite'], 'mo-xs', 5); T(S, 'c3', 17.6, 15.8, ['필드별 병합 · CRDT: 함께 편집', 'field merge or CRDTs: co-editing'], 'mo-xs', 5);
  [['화면은 서버가 아니라 로컬 DB를 봐요 · 동기화는 뒤에서', 'the UI reads the local DB, not the server · sync runs behind it'], ['오프라인이어도 DB에 바로 쓰고 화면에 반영 · 변경은 대기열에', 'offline, writes still hit the DB and UI at once · changes queue up'], ['계속 고쳐도 앱은 멀쩡히 동작해요', 'the app keeps working as edits pile up'], ['연결되면 대기열을 순서대로 보내고 서버 결과를 DB에 반영', 'back online, the outbox drains in order and results land in the DB']]
    .forEach((t, i) => T(S, 'n' + i, 1, 17.8, t, 'mo-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17.8, ['오프라인 우선: 빠르고, 지하철에서도 써지는 앱', 'offline-first: fast, and usable on the subway'], 'mo-s', 5);
  T(S, 'z2', 1, 19.2, ['WorkManager 같은 작업 예약기가 연결될 때 다시 시도해요', 'a scheduler like WorkManager retries once a connection returns'], 'mo-xs', 5);
  S.cap(1, '앱은 로컬 DB를 기준으로 그려요', 'The app renders from its local database')
    .cap(2, '오프라인에서도 쓰기는 즉시', 'Writes land instantly even offline')
    .cap(3, '변경은 대기열에 쌓여요', 'Changes pile up in an outbox')
    .cap(4, '다시 연결되면 동기화', 'Reconnect and sync')
    .cap(5, '오프라인 우선과 동기화', 'Offline-first and sync');
  return S;
}
function sNet() {
  const S = scene({ id: 'mo-net', steps: 5, per: 1.5 });
  box(S, 'app', 1, 1.6, 5.4, 2, ['앱', 'app'], 'accent', 0, { pct: 28 }); box(S, 'srv', 25.6, 1.6, 5.4, 2, ['서버', 'server'], 'ink-3', 0, { pct: 22 });
  ar(S, 'rq', [6.6, 2.6], [25.4, 2.6], 'ink-3', 1, { h: .12, dash: 1 }); T(S, 'rql', 12.6, 1.2, 'GET /feed', 'cz-mono mo-xs', 1); xm(S, 'rqx', 16, 2.6, 1, { off: 3 });
  const X = t => 3 + t * 3.4, AT = [0, 1, 3, 7];
  hl(S, 'ax', 2.6, 30.6, 9, 'ink-3', 0, { w: .1 });
  AT.forEach((t, i) => { const st = i < 1 ? 1 : i < 3 ? 2 : 3, ok = i === 3;
    pt(S, 'at' + i, X(t), 9, st, ok ? C.okf : C.badf, .42); T(S, 'atl' + i, X(t) - 1.5, 9.7, t + 's', 'cz-tc cz-mono mo-xs', st, { w: 3 });
    T(S, 'atm' + i, X(t) - .4, 7, ok ? '✓' : '✗', 'mo-s ' + (ok ? 'mo-g' : 'mo-r'), st);
    if (i) { const p = AT[i - 1]; rect(S, 'wt' + i, X(p) + .5, 8.6, X(t) - X(p) - 1, .8, 'warn', 28, st, { r: .1 }); T(S, 'wtl' + i, X(p) + .5, 7.6, [`${t - p}초 대기`, `wait ${t - p} s`], 'cz-tc mo-xs mo-w', st, { w: X(t) - X(p) - 1 }); } });
  ar(S, 'rq2', [6.6, 3.4], [25.4, 3.4], 'ok', 3, { h: .12 }); T(S, 'rq2l', 12.6, 3.7, ['200 OK', '200 OK'], 'cz-mono mo-xs mo-g', 3, { off: 4 });
  [[1, 2, ['모바일 망은 지연이 크고 자주 끊겨요 (터널, 엘리베이터, 와이파이 ↔ LTE 전환)', 'mobile links are slow and flaky (tunnels, elevators, Wi-Fi ↔ LTE handoffs)'], 'mo-xs'],
   [2, 3, ['지수 백오프: 1초, 2초, 4초… 간격을 두 배씩 늘려요', 'exponential backoff: wait 1 s, 2 s, 4 s… doubling each time'], 'mo-xs mo-w'],
   [2, 4, ['무작위 지터를 더해 수많은 기기가 한꺼번에 몰리지 않게', 'add random jitter so devices don’t retry in lockstep'], 'mo-xs'],
   [3, 4, ['4번째 시도에 성공 · 사용자는 로딩 표시만 봤어요', 'the 4th try succeeds · the user only saw a spinner'], 'mo-xs mo-g']].forEach(([s, o, t, c], i) => T(S, 'n' + i, 1, [11.4, 11.4, 12.7, 11.4][i], t, c, s, { off: o }));
  T(S, 'c1', 1, 11.4, 'GET /feed   If-None-Match: "v7"', 'cz-mono mo-xs', 4); T(S, 'c2', 1, 12.7, ['← 304 Not Modified (본문 없음)', '← 304 Not Modified (no body)'], 'cz-mono mo-xs mo-g', 4);
  T(S, 'c3', 1, 14, ['안 바뀌었으면 본문 없이 304 → 데이터와 배터리를 아껴요', 'unchanged → 304 with no body → saves data and battery'], 'mo-xs', 4);
  [['타임아웃은 꼭 정하고, 자동 재시도는 안전한(멱등) 요청만', 'always set timeouts; auto-retry only idempotent requests', 'mo-xs mo-a'], ['gzip 압축 · 페이지 나누기 · 필요한 필드만 받아 데이터를 줄여요', 'shrink payloads: gzip, pagination, only the fields you need', 'mo-xs'], ['OkHttp · URLSession · Dio가 캐시와 연결 재사용을 처리해요', 'OkHttp, URLSession and Dio handle caching and connection reuse', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 16 + i * 1.3, [a, b], c, 5));
  S.cap(1, '모바일 네트워크는 자주 실패해요', 'Mobile networks fail often')
    .cap(2, '간격을 늘려 가며 다시 시도해요', 'Retry with growing gaps')
    .cap(3, '결국 성공', 'Eventually it succeeds')
    .cap(4, '안 바뀌었으면 304로 아껴요', 'Unchanged? A 304 saves the transfer')
    .cap(5, '네트워크 요청, 재시도, 캐시', 'Requests, retries and caching');
  return S;
}
function sImage() {
  const S = scene({ id: 'mo-image', steps: 5, per: 1.5 });
  const G = 'background:linear-gradient(160deg,#7fb2e5,#f4c27a)';
  rect(S, 'ph', 1, 1.6, 12, 9, 'accent', 30, 0, { r: .3, css: G }); T(S, 'phl', 1, 5.6, '4000 × 3000', 'cz-tc cz-mono mo-s', 0, { w: 12 });
  rect(S, 'vw', 14.4, 1.6, 3, 2.25, 'accent', 30, 0, { r: .15, css: G }); T(S, 'vwl', 13.6, 4.1, ['뷰 400×300', 'view 400×300'], 'cz-tc mo-xs', 0, { w: 4.6 });
  T(S, 'm1', 1, 11.3, ['원본 크기 그대로 디코딩', 'decode at full size'], 'mo-xs', 1); rect(S, 'b1', 1, 12.3, 16, 1.1, 'danger', 45, 1, { r: .15 }); T(S, 'b1l', 17.4, 12.35, '48 MB', 'cz-mono mo-xs mo-r', 1);
  T(S, 'm1b', 1, 13.7, '4000 × 3000 × 4 B = 48 MB', 'cz-mono mo-xs', 1);
  T(S, 'm2', 1, 15, ['보일 크기에 맞춰 1/8로 줄여 디코딩', 'downsample by 8 while decoding'], 'mo-xs mo-g', 2); rect(S, 'b2', 1, 16, .3, 1.1, 'ok', 70, 2, { r: .1 });
  T(S, 'b2l', 1.7, 16.05, '500 × 375 × 4 B ≈ 0.75 MB', 'cz-mono mo-xs mo-g', 2);
  const P = [['메모리 캐시 (LRU)', 'memory cache (LRU)', 'accent'], ['디스크 캐시', 'disk cache', 'warn'], ['네트워크', 'network', 'ink-3']];
  P.forEach(([a, b, c], i) => box2(S, 'p' + i, 20.6, 1.6 + i * 3.6, 10.4, 2.2, [a, b], c, 0, { pct: 24 }));
  [0, 1].forEach(i => { const y = 1.6 + i * 3.6; ar(S, 'ms' + i, [23.4, y + 2.3], [23.4, y + 3.5], 'danger', 3, { h: .1 }); T(S, 'msl' + i, 23.8, y + 2.45, 'miss', 'cz-mono mo-xs mo-r', 3);
    ar(S, 'sv' + i, [28.2, y + 3.5], [28.2, y + 2.3], 'ok', 3, { h: .1 }); T(S, 'svl' + i, 28.6, y + 2.45, ['저장', 'store'], 'mo-xs mo-g', 3); });
  T(S, 'f3', 20.6, 11.4, ['처음: 메모리 ✗ → 디스크 ✗ → 다운로드', '1st: memory ✗ → disk ✗ → download'], 'mo-xs', 3, { off: 4 });
  tsets(S, 'p0', [[4, 'ok', 45]]); T(S, 'f4', 20.6, 11.4, ['두 번째: 메모리에서 즉시 ✓', '2nd time: instant from memory ✓'], 'mo-xs mo-g', 4);
  ring(S, 'hit', 25.8, 2.7, 1.6, 'ok', 4, { w: .14 });
  T(S, 'z1', 1, 17.6, 'Android: Glide · Coil  /  iOS: Kingfisher · SDWebImage  /  Flutter: cached_network_image', 'mo-xs mo-a', 5);
  T(S, 'z2', 1, 18.8, ['리스트가 재활용되면 이전 요청을 취소해야 엉뚱한 사진이 안 떠요', 'cancel the old request when a row is recycled, or the wrong photo appears'], 'mo-xs mo-r', 5);
  S.cap(1, '큰 사진을 그대로 풀면 메모리가 터져요', 'Decoding a big photo at full size eats memory')
    .cap(2, '보일 크기로 줄여서 풀어요', 'Decode at the size it will be shown')
    .cap(3, '메모리 → 디스크 → 네트워크 순서로 찾아요', 'Look in memory, then disk, then the network')
    .cap(4, '다시 보면 메모리에서 즉시', 'Next time it comes straight from memory')
    .cap(5, '이미지 로딩과 캐시', 'Image loading and caching');
  return S;
}
function sPush() {
  const S = scene({ id: 'mo-push', steps: 5, per: 1.5 });
  phone(S, 'ph', 1, 1.6, 7.4, 13.4, 0);
  box(S, 'fcm', 11.6, 1.6, 8.8, 2.8, 'APNs / FCM', 'warn', 0, { pct: 26 }); T(S, 'fcs', 11.6, 4.7, ['애플·구글의 푸시 서버', 'Apple/Google push servers'], 'cz-tc mo-xs', 0, { w: 8.8 });
  box(S, 'srv', 24, 1.6, 7, 2.8, ['우리 서버', 'our server'], 'ink-3', 0, { pct: 22 });
  ar(S, 'rg', [8.6, 2.5], [11.4, 2.5], 'accent', 1, { h: .12 }); ar(S, 'tk', [11.4, 3.6], [8.6, 3.6], 'ok', 1, { h: .12 }); T(S, 'tkl', 1.6, 6, 'token: f3a9…', 'cz-mono mo-xs mo-g', 1, { off: 4 });
  elb(S, 'ts', [[8.6, 7.4], [30.2, 7.4], [30.2, 4.6]], 'accent', 2, { h: .12 }); T(S, 'tsl', 12, 7.8, ['토큰을 사용자와 묶어 저장', 'store the token with the user'], 'mo-xs mo-a', 2);
  T(S, 'ev', 23.4, 4.7, ['새 메시지 발생!', 'new message!'], 'cz-tc mo-xs mo-w', 3, { w: 5.8 }); ar(S, 'sp', [23.8, 3], [20.6, 3], 'warn', 3, { h: .14 });
  T(S, 'pl', 11.6, 9.4, '{ "token": "f3a9…", "title": "Mina", "body": "Lunch?" }', 'cz-mono mo-xs', 3);
  elb(S, 'dv', [[13, 4.6], [13, 5.6], [8.6, 5.6]], 'warn', 4, { h: .14 });
  rect(S, 'bn', 1.6, 2.4, 6.2, 2.6, 'ui', 0, 4, { r: .5, off: 5, css: 'border:.12em solid var(--line);box-shadow:0 .2em .6em rgba(0,0,0,.15)' });
  T(S, 'bn1', 2.1, 2.7, 'Mina', 'mo-s', 4, { off: 5 }); T(S, 'bn2', 2.1, 3.9, 'Lunch?', 'mo-xs', 4, { off: 5 });
  T(S, 'ch', 1, 2.6, 'Mina', 'cz-tc mo-s', 5, { w: 7.4 }); rect(S, 'cb1', 1.6, 4.4, 4.6, 1.6, 'line', 50, 5, { r: .6 }); T(S, 'cb1l', 2, 4.65, 'Lunch?', 'mo-xs', 5);
  rect(S, 'cb2', 3.6, 6.6, 4.2, 1.6, 'accent', 40, 5, { r: .6 }); T(S, 'cb2l', 4, 6.85, ['좋아!', 'Sure!'], 'mo-xs', 5);
  [['앱이 OS에 등록하면 푸시 서버가 기기 토큰을 발급해요', 'the app registers and the push service issues a device token'], ['앱은 토큰을 우리 서버에 보내 사용자와 묶어 둬요', 'the app sends the token to our server, tied to the user'], ['보낼 일이 생기면 서버가 토큰과 내용을 푸시 서버에 맡겨요', 'when something happens, our server hands token + message to the push service'], ['기기의 상시 연결로 전달 → 앱이 꺼져 있어도 OS가 알림을 띄워요', 'delivered over the always-on link → shown even if the app is closed']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.4, t, 'mo-s', i + 1, { off: i + 2 }));
  [['알림을 누르면 딥 링크로 해당 화면이 열려요', 'tapping it deep-links into the right screen', 'mo-s'], ['앱마다 연결을 따로 열지 않고 OS 연결 하나를 공유 → 배터리 절약', 'apps share one OS connection instead of keeping their own → saves battery', 'mo-xs mo-g'], ['알림 권한이 필요하고, 토큰은 바뀔 수 있어 갱신되면 다시 보내요', 'needs notification permission · tokens change, so resend on refresh', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 16.4 + i * 1.3, [a, b], c, 5));
  S.cap(1, '앱이 푸시 서버에서 토큰을 받아요', 'The app gets a token from the push service')
    .cap(2, '토큰을 우리 서버에 알려요', 'It hands the token to our server')
    .cap(3, '서버가 푸시 서버에 전달을 맡겨요', 'Our server asks the push service to deliver')
    .cap(4, 'OS가 알림을 띄워요', 'The OS shows the notification')
    .cap(5, '푸시 알림', 'Push notifications');
  return S;
}

/* ================= performance, quality & release ================= */
function sBattery() {
  const S = scene({ id: 'mo-battery', steps: 5, per: 1.5 });
  const X = t => 4 + t * .675, BA = 7, BB = 14.6, H = 4;
  const sg = (k, t0, t1, lv, base, st, off) => rect(S, k, X(t0), base - lv * H, X(t1) - X(t0), lv * H, lv > .9 ? 'danger' : lv > .3 ? 'warn' : 'line', lv > .3 ? 45 : 70, st, { r: .05, off });
  hl(S, 'ba', 3.6, 31, BA, 'ink-3', 0, { w: .1 }); hl(S, 'bb', 3.6, 31, BB, 'ink-3', 3, { w: .1 });
  T(S, 'la', .3, 4.4, ['흩어진 요청', 'scattered'], 'mo-xs'); T(S, 'lb', .3, 12, ['몰아서', 'batched'], 'mo-xs', 3);
  [0, 10, 20, 30, 40].forEach(t => T(S, 'tt' + t, X(t) - 1.5, BB + .3, t + (t === 40 ? ' s' : ''), 'cz-tc cz-mono mo-xs', 3, { w: 3 }));
  sg('a0', 0, 1, 1, BA, 1); sg('a0t', 1, 7, .6, BA, 1); sg('a0i', 7, 40, .1, BA, 1, 2);
  ar(S, 'r0', [X(0) + .1, 1.4], [X(0) + .1, 2.5], 'ink-3', 1, { h: .1 });
  T(S, 'a0l', X(7) + .4, 4.2, ['전송 1초, 꼬리 6초', '1 s of transfer, 6 s of tail'], 'mo-xs mo-w', 1, { off: 2 });
  [7, 14, 21].forEach((t, i) => { sg('a' + (i + 1), t, t + 1, 1, BA, 2); sg('a' + (i + 1) + 't', t + 1, t + 7, .6, BA, 2); ar(S, 'r' + (i + 1), [X(t) + .1, 1.4], [X(t) + .1, 2.5], 'ink-3', 2, { h: .1 }); });
  sg('a4i', 28, 40, .1, BA, 2); T(S, 'ae', X(29), 4.4, ['고전력 28초', '28 s at high power'], 'mo-xs mo-r', 2);
  sg('b0', 0, 2.5, 1, BB, 3); sg('b0t', 2.5, 8.5, .6, BB, 3); sg('b0i', 8.5, 40, .1, BB, 3);
  [0, .5, 1, 1.5].forEach((t, i) => ar(S, 'rb' + i, [X(t) + .1, 9], [X(t) + .1, 10.1], 'ink-3', 3, { h: .08 }));
  T(S, 'be', X(10), 12, ['고전력 8.5초', '8.5 s at high power'], 'mo-xs mo-g', 3);
  [['셀룰러 무선은 전송 뒤에도 몇 초간 고전력으로 대기해요 (꼬리)', 'the cellular radio stays in high power for seconds after a transfer (the tail)'], ['조금씩 자주 보내면 무선이 잠들 틈이 없어요', 'small, frequent requests never let the radio sleep'], ['모아서 한 번에 보내면 꼬리도 한 번', 'batch them and pay the tail once']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.6, t, 'mo-xs', i + 1, { off: i + 2 }));
  T(S, 'n4', 1, 16.6, ['OS가 도와요: WorkManager · BGTaskScheduler가 충전 중·와이파이일 때 몰아서 실행', 'the OS helps: WorkManager and BGTaskScheduler run deferred work on charge or Wi-Fi'], 'mo-xs mo-a', 4);
  T(S, 'n4b', 1, 17.8, ['잠자기(Doze)는 백그라운드 깨움을 정해진 창에 모아요', 'Doze groups background wake-ups into maintenance windows'], 'mo-xs', 4);
  T(S, 'z', 1, 19, ['화면·GPS·무선이 배터리의 큰손 · 위치는 필요한 정확도만', 'screen, GPS and radios drain the most · ask only for the location accuracy you need'], 'mo-xs mo-g', 5);
  S.cap(1, '요청 한 번에도 무선은 한참 깨어 있어요', 'One request keeps the radio awake for a while')
    .cap(2, '흩어진 요청은 무선을 계속 깨워요', 'Scattered requests keep it awake')
    .cap(3, '모아서 보내면 훨씬 짧아요', 'Batching shortens it a lot')
    .cap(4, 'OS가 일을 모아 실행해 줘요', 'The OS batches background work')
    .cap(5, '배터리와 백그라운드 작업', 'Battery and background work');
  return S;
}
function sMemory() {
  const S = scene({ id: 'mo-memory', steps: 5, per: 1.5 });
  T(S, 'ph', 1, 1.2, ['← 우선순위 높음', '← high priority'], 'mo-xs'); T(S, 'pl', 21.6, 1.2, ['낮음 (먼저 정리) →', 'low (killed first) →'], 'mo-xs');
  frame(S, 'bar', 1, 2.6, 30, 2.4, 'ink-3', 0, { r: .3, w: .12 });
  const SG = [['fg', 1, 8, ['지금 앱', 'foreground'], 'accent'], ['mu', 8, 12, ['음악', 'music'], 'ok'], ['mp', 12, 17, ['지도', 'maps'], 'ink-3'], ['gm', 17, 23, ['게임', 'game'], 'ink-3'], ['pt', 23, 28, ['사진', 'photos'], 'ink-3']];
  SG.forEach(([k, a, b, l, c]) => box2(S, k, a + .1, 2.75, b - a - .2, 2.1, l, c, 0, { pct: 28 }));
  T(S, 't0', 1, 5.3, ['보이는 앱', 'visible'], 'cz-tc mo-xs', 0, { w: 7 }); T(S, 't1', 8, 5.3, ['서비스', 'service'], 'cz-tc mo-xs', 0, { w: 4 }); T(S, 't2', 12, 5.3, ['캐시된 앱 (최근 사용 순)', 'cached apps (by last use)'], 'cz-tc mo-xs', 0, { w: 16 });
  frame(S, 'rq', 23, 6.6, 8, 2.2, 'danger', 2, { dash: 1, r: .3, off: 3 }); T(S, 'rql', 23, 7.2, ['카메라 +8 필요', 'camera needs +8'], 'cz-tc mo-xs mo-r', 2, { w: 8, off: 3 });
  S.set('pt', 3, { opacity: '.12' }); xm(S, 'ptx', 25.5, 3.7, 3, { off: 4 });
  rect(S, 'cam', 23.1, 2.75, 7.8, 2.1, 'accent', 40, 4, { r: .2, cls: 'cz-c mo-c2', html: ['카메라 +8', 'camera +8'] });
  [[1, 2, ['메모리는 앱들이 나눠 써요 · 백그라운드 앱도 캐시로 남아 빨리 돌아와요', 'apps share RAM · background apps stay cached for a quick return'], 'mo-xs'],
   [2, 3, ['카메라가 큰 메모리를 요청 · 남은 공간이 모자라요', 'the camera asks for a big chunk · not enough free space'], 'mo-xs mo-r'],
   [3, 4, ['가장 오래 안 쓴 캐시 앱부터 정리 (Android lmkd · iOS jetsam)', 'the least recently used cached app goes first (lmkd, jetsam)'], 'mo-xs']].forEach(([s, o, t, c], i) => T(S, 'n' + i, 1, 7.2, t, c, s, { off: o }));
  T(S, 'n3', 1, 7.2, ['정리돼도 사용자는 몰라야 해요 → 상태 저장·복원', 'users shouldn’t notice → save and restore state'], 'mo-xs', 4);
  const LK = [['gc', 1, 7, ['GC 루트 (static 필드)', 'GC root (static field)'], 'ink-3'], ['ls', 9.6, 5, 'Listener', 'warn'], ['ac', 16.2, 8.4, ['닫힌 화면 (Activity)', 'closed screen (Activity)'], 'danger'], ['bm', 26.2, 4.8, ['비트맵 20MB', 'bitmap 20 MB'], 'danger']];
  T(S, 'lkh', 1, 9.2, ['또 다른 문제: 메모리 누수', 'another problem: memory leaks'], 'mo-s', 4);
  LK.forEach(([k, x, w, l, c], i) => { box2(S, k, x, 10.6, w, 2.4, l, c, 4, { pct: 26 }); if (i) { const px = LK[i - 1][1] + LK[i - 1][2]; ar(S, k + 'a', [px + .1, 11.8], [x - .1, 11.8], 'ink-3', 4, { h: .12 }); } });
  T(S, 'lk', 1, 13.4, ['화면은 닫혔는데 정적 필드가 붙잡고 있어 GC가 못 치워요 → 누수', 'the screen is closed, but a static field still holds it → GC can’t free it: a leak'], 'mo-xs mo-r', 4);
  [['Android(Kotlin·Java)는 GC, iOS(Swift)는 ARC 참조 카운트 → 순환 참조는 weak로 끊어요', 'Android (Kotlin, Java) uses GC; iOS (Swift) uses ARC → break reference cycles with weak', 'mo-xs mo-a'], ['LeakCanary · Xcode Instruments로 찾고, 리스너는 onStop·deinit에서 해제', 'find leaks with LeakCanary or Instruments; unregister listeners in onStop or deinit', 'mo-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 15.2 + i * 1.3, [a, b], c, 5));
  S.cap(1, '메모리는 여러 앱이 나눠 써요', 'Apps share the device’s memory')
    .cap(2, '새 요청에 공간이 모자라요', 'A new request doesn’t fit')
    .cap(3, 'OS가 오래된 캐시 앱을 정리해요', 'The OS kills the oldest cached app')
    .cap(4, '닫힌 화면을 붙잡으면 누수', 'Holding a closed screen is a leak')
    .cap(5, '모바일 메모리 관리', 'Memory management on mobile');
  return S;
}
function sTest() {
  const S = scene({ id: 'mo-test', steps: 5, per: 1.5 });
  poly2(S, 'pb', [[3.35, 10.6], [12.65, 10.6], [15, 15], [1, 15]], tint('ok', 40), 1);
  poly2(S, 'pm', [[5.7, 6.1], [10.3, 6.1], [12.65, 10.5], [3.35, 10.5]], tint('accent', 40), 2);
  poly2(S, 'pt', [[8, 1.6], [10.3, 6], [5.7, 6]], tint('warn', 50), 3);
  T(S, 'lb', 1, 12.4, ['단위', 'unit'], 'cz-tc mo-s', 1, { w: 14 }); T(S, 'lm', 1, 7.9, ['통합', 'integration'], 'cz-tc mo-s', 2, { w: 14 }); T(S, 'lt', 1, 4.4, 'UI', 'cz-tc mo-s', 3, { w: 14 });
  [[1, 11.2, ['단위 테스트: 수천 개 · 몇 초', 'unit: thousands · seconds'], 'mo-s mo-g'], [1, 12.5, ['ViewModel·로직을 기기 없이 로컬에서', 'ViewModels and logic, no device needed'], 'mo-xs'],
   [2, 7, ['통합: 실제 DB·모의 서버와 함께', 'integration: real DB, mock server'], 'mo-s mo-a'], [2, 8.3, ['여러 부품이 잘 맞물리는지', 'do the parts fit together?'], 'mo-xs'],
   [3, 2.6, ['UI 테스트: 실제 화면을 탭하고 확인', 'UI: tap the real screen and check'], 'mo-s mo-w'], [3, 3.9, ['Espresso · XCUITest · 느리고 잘 깨져요', 'Espresso, XCUITest · slow and flaky'], 'mo-xs']]
    .forEach(([s, y, t, c], i) => T(S, 'd' + i, 16.4, y, t, c, s, { off: 4 }));
  const CO = [['소형', 'small'], ['대형', 'large'], ['폴더블', 'foldable'], ['태블릿', 'tablet']], CX = j => 20.2 + j * 2.7;
  CO.forEach((c, j) => T(S, 'ch' + j, CX(j), 1.6, c, 'cz-tc mo-xs', 4, { w: 2.5 }));
  [12, 13, 14, 15].forEach((v, i) => { T(S, 'rh' + i, 16.4, 3.25 + i * 2, 'Android ' + v, 'cz-mono mo-xs', 4);
    CO.forEach((c, j) => { const bad = (v === 13 && j === 2) || (v === 12 && j === 3); box2(S, `g${i}_${j}`, CX(j), 2.9 + i * 2, 2.5, 1.7, bad ? '✗' : '✓', bad ? 'danger' : 'ok', 4, { pct: bad ? 45 : 28 }); }); });
  T(S, 'gn', 16.4, 11.2, ['기기 × OS 조합은 수백 가지', 'hundreds of device × OS combos'], 'mo-xs', 4); T(S, 'gn2', 16.4, 12.5, ['→ 클라우드 기기 팜에서 병렬로', '→ run them in parallel on device farms'], 'mo-xs mo-a', 4);
  T(S, 'z1', 1, 16.4, ['아래가 넓은 피라미드: 빠르고 싼 테스트를 많이, 느린 UI 테스트는 핵심 흐름만', 'a pyramid: many fast cheap tests, slow UI tests only for key flows'], 'mo-xs mo-a', 5);
  T(S, 'z2', 1, 17.6, ['스크린샷 테스트로 UI가 몰래 바뀌는 걸 잡고, 베타(TestFlight·내부 테스트 트랙)로 실사용 확인', 'screenshot tests catch silent UI changes · betas (TestFlight, internal tracks) test real use'], 'mo-xs', 5);
  S.cap(1, '바닥: 빠른 단위 테스트를 많이', 'Base: lots of fast unit tests')
    .cap(2, '가운데: 부품을 엮는 통합 테스트', 'Middle: integration tests')
    .cap(3, '꼭대기: 느리지만 실제 같은 UI 테스트', 'Top: slow but realistic UI tests')
    .cap(4, '기기 파편화도 시험해야 해요', 'Device fragmentation needs testing too')
    .cap(5, '모바일 테스트 전략', 'A mobile testing strategy');
  return S;
}
function sRelease() {
  const S = scene({ id: 'mo-release', steps: 5, per: 1.5 });
  const D = i => [1.8 + (i % 10) * 1.25, 2.6 + Math.floor(i / 10) * 1.25];
  for (let i = 0; i < 100; i++) { const [x, y] = D(i); pt(S, 'u' + i, x, y, 0, C.idle, .38);
    if (i < 1) S.set('u' + i, 1, C.cur); else if (i < 20) S.set('u' + i, 2, C.cur);
    if (i === 3 || i === 11) { S.set('u' + i, 3, C.badf); S.set('u' + i, 4, C.cur); }
    S.set('u' + i, 5, C.okf); }
  [['1% · v2.3', 1, 2], ['20% · v2.3', 2, 3], [['20% · ⏸ 출시 중단', '20% · ⏸ halted'], 3, 5], ['100% · v2.3.1', 5, 0]].forEach(([t, s, o], i) => T(S, 'pc' + i, 1.4, .9, t, 'cz-mono mo-s ' + (i === 2 ? 'mo-r' : ''), s, { off: o }));
  const F = fr(0, 5, 96, 100, 17, 31, 2, 9.4);
  hl(S, 'cx', 17, 31, F.Y(96), 'ink-3', 0, { w: .1 }); vl(S, 'cy', 17, 2, 9.4, 'ink-3', 0, { w: .1 }); hl(S, 'c99', 17, 31, F.Y(99), 'line', 0, { w: .06, dash: 1 });
  [[100, '100%'], [98, '98%'], [96, '96%']].forEach(([v, l]) => T(S, 'cl' + v, 14.4, F.Y(v) - .45, l, 'cz-mono mo-xs', 0));
  T(S, 'ct', 17.4, 1, ['크래시 없는 사용자 비율', 'crash-free users'], 'mo-xs');
  const V = [99.8, 99.8, 99.7, 97.1, 99.6, 99.8];
  for (let k = 1; k <= 5; k++) { seg(S, 's' + k, [F.X(k - 1), F.Y(V[k - 1])], [F.X(k), F.Y(V[k])], k, k === 3 ? 'danger' : 'accent', .12); pt(S, 'v' + k, F.X(k), F.Y(V[k]), k, k === 3 ? C.badf : C.cur, .3); }
  pt(S, 'v0', F.X(0), F.Y(V[0]), 0, C.cur, .3);
  T(S, 'sp', 19.4, 10, ['특정 기기에서 크래시 급증', 'crash spike on one device model'], 'mo-xs mo-r', 3, { off: 4 });
  T(S, 'flh', 17, 11.6, ['원격 기능 플래그', 'remote feature flag'], 'mo-xs', 1);
  box2(S, 'fl0', 17, 12.6, 14, 1.8, ['새 결제 화면: 켜짐', 'new checkout: ON'], 'ok', 1, { pct: 30, off: 4 }); box2(S, 'fl1', 17, 12.6, 14, 1.8, ['새 결제 화면: 꺼짐', 'new checkout: OFF'], 'line', 4, { pct: 50 });
  [['새 버전 2.3을 사용자 1%에게만 먼저', 'ship 2.3 to just 1% of users first'], ['지표가 괜찮으면 5% → 20%로 넓혀요', 'healthy metrics? widen to 5%, then 20%'], ['크래시 없는 비율이 떨어지면 출시를 멈춰요 → 피해는 20%에서 끝', 'crash-free rate drops → halt the rollout; damage stops at 20%'], ['문제 기능을 원격 플래그로 끄면 새 빌드 없이 바로 회복', 'switch the faulty feature off remotely → instant recovery, no new build']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.6, t, 'mo-s', i + 1, { off: i + 2 }));
  [['고친 2.3.1을 다시 단계적으로 100%까지', 'roll the 2.3.1 fix out gradually to 100%', 'mo-s mo-g'], ['앱은 웹과 달리 즉시 롤백이 어려워요 → 단계적 출시 + 기능 플래그 + 크래시 리포트', 'unlike the web, apps can’t roll back instantly → staged rollouts, flags, crash reports', 'mo-xs'], ['Crashlytics · Sentry가 스택 트레이스를 기기·OS·버전별로 모아 줘요', 'Crashlytics and Sentry group stack traces by device, OS and version', 'mo-xs mo-a']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 15.6 + i * 1.3, [a, b], c, 5));
  S.cap(1, '먼저 1%에게만', 'Start with 1%')
    .cap(2, '괜찮으면 조금씩 넓혀요', 'Widen step by step')
    .cap(3, '문제가 보이면 멈춰요', 'Halt when trouble shows')
    .cap(4, '기능 플래그로 즉시 끄기', 'Kill it instantly with a feature flag')
    .cap(5, '단계적 출시와 모니터링', 'Staged rollout and monitoring');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'mox-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono mox-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono mox-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c mox-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono mox-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c mox-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'mox-s mox-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono mox-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono mox-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono mox-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono mox-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono mox-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'mox-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'mox-xs', 5));


const CSSX = `
.mox-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.mox-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.mox-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.mox-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.mox-r .in{color:var(--danger);font-weight:800}
.mox-g .in{color:var(--ok);font-weight:800}
.mox-a .in{color:var(--accent);font-weight:800}
.mox-w .in{color:var(--warn);font-weight:800}
.mox-c .in{font-size:.6em;font-weight:700}
.mox-c2 .in{font-size:.5em;font-weight:700}
.mox-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.mox-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'mox-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 5) }));
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));
const fixed = (S, k, x, y, w, h, bg, st, o = {}) => rect(S, k, x, y, w, h, 'ui', 0, st, { r: o.r ?? .3, css: `background:${bg}!important;${o.css || ''}`, off: o.off });

/* ================= platforms ================= */
function sStartup() {
  const S = scene({ id: 'mo-startup', steps: 5, per: 1.6 });
  const X = ms => 7.8 + ms * .016;
  [0, 400, 800, 1200].forEach(ms => { vl(S, 'g' + ms, X(ms), 1.4, 14.4, 'line', 0, { w: .06, dash: 1 }); T(S, 'gt' + ms, X(ms) - 1.6, .3, ms ? ms + ' ms' : '0', 'cz-tc cz-mono mox-xs', 0, { w: 3.2 }); });
  const row = (k, y, segs, st, lab, sub, labCls, end, endCls) => {
    T(S, k + 'l', 1, y + .05, lab, 'mox-s ' + (labCls || ''), st); T(S, k + 'sub', 1, y + .95, sub, 'mox-xs', st);
    segs.forEach(([a, b, l, c], i) => box2(S, k + i, X(a), y, X(b) - X(a), 1.6, l, c, st, { pct: c === 'ink-3' ? 22 : 34 }));
    T(S, k + 'e', X(segs[segs.length - 1][1]) + .4, y + .3, end, 'mox-s ' + endCls, st);
  };
  const PR = ['프로세스 생성', 'new process'], AC = ['화면 생성', 'Activity'], DR = ['그림', 'draw'];
  row('c', 1.8, [[0, 250, PR, 'ink-3'], [250, 850, ['Application 초기화 (SDK들)', 'Application init (SDKs)'], 'warn'], [850, 1100, AC, 'accent'], [1100, 1200, DR, 'ok']], 1, ['콜드 스타트', 'cold start'], ['프로세스부터', 'from scratch'], '', '1.2 s', 'mox-r');
  T(S, 'cn', X(250), 3.65, ['분석·광고·DB SDK를 시작할 때 한꺼번에 초기화', 'analytics, ads and DB SDKs all set up at launch'], 'mox-xs mox-w', 1);
  row('w', 5.4, [[0, 250, AC, 'accent'], [250, 350, DR, 'ok']], 2, ['웜 스타트', 'warm start'], ['프로세스는 살아 있음', 'process alive'], '', '0.35 s', 'mox-w');
  row('h', 8.4, [[0, 80, '', 'ok']], 3, ['핫 스타트', 'hot start'], ['화면도 메모리에', 'screen in memory'], '', '0.08 s', 'mox-g');
  row('f', 11.4, [[0, 250, PR, 'ink-3'], [250, 400, 'App', 'warn'], [400, 650, AC, 'accent'], [650, 750, DR, 'ok']], 4, ['개선한 콜드', 'cold, improved'], ['초기화 미루기', 'deferred init'], 'mox-a', '0.75 s ✓', 'mox-g');
  rect(S, 'bg', X(400), 13.25, X(1000) - X(400), 1.1, 'warn', 14, 4, { r: .2, css: 'border:.08em dashed var(--warn)' });
  T(S, 'bgl', X(400), 13.4, ['백그라운드 스레드: 급하지 않은 SDK 초기화', 'background: non-urgent SDK init'], 'cz-tc mox-xs', 4, { w: X(1000) - X(400) });
  stepT(S, 'k', 1, 15.6, [['콜드 스타트: 프로세스를 만들고, Application을 초기화하고, 첫 화면을 그려요', 'cold start: create the process, initialize the Application, draw the first screen'], ['웜 스타트: 프로세스는 살아 있고 화면(Activity)만 다시 만들어요', 'warm start: the process survives and only the screen (Activity) is rebuilt'], ['핫 스타트: 화면까지 메모리에 남아 있어 앞으로 가져오기만 해요', 'hot start: the screen is still in memory and just comes to the front'], ['급하지 않은 SDK 초기화를 미루거나 백그라운드로 옮기면 첫 화면이 빨라져요', 'deferring or backgrounding non-urgent SDK init gets the first frame out sooner']]);
  fin(S, 'z', 15.6, [['앱 시작 시간: 사용자가 가장 먼저 느끼는 성능 · 콜드 스타트를 기준으로 재요', 'startup time is the first performance users feel · measure the cold start', 'mox-xs mox-a'], ['지표: TTID(첫 프레임까지) · TTFD(내용이 다 그려질 때까지)', 'metrics: TTID (first frame) and TTFD (fully drawn)'], ['기준 프로필(Baseline Profile)로 시작 코드를 미리 컴파일해 두면 더 빨라요', 'Baseline Profiles precompile the startup path for an extra boost']]);
  S.cap(1, '콜드 스타트', 'Cold start').cap(2, '웜 스타트', 'Warm start').cap(3, '핫 스타트', 'Hot start').cap(4, '초기화 미루기', 'Defer initialization').cap(5, '앱 시작 시간', 'App startup time');
  return S;
}

/* ================= UI ================= */
function sA11y() {
  const S = scene({ id: 'mo-a11y', steps: 5, per: 1.7 });
  fixed(S, 'ph', 1.2, 1.0, 9.8, 14.0, '#fff', 0, { r: 1, css: 'border:.16em solid var(--ink-3)' }); rect(S, 'phn', 5.0, 1.3, 2.2, .28, 'ink-3', 55, 0, { r: .2 });
  fixed(S, 'bar', 1.6, 1.9, 9.0, 1.8, '#f1f3f5');
  T(S, 'tt', 2.1, 2.3, 'Shop', 'mox-s mox-ph', 0);
  fixed(S, 'icb', 8.9, 2.3, 1.0, 1.0, '#e3e7ec', 0, { r: .25 }); T(S, 'ic', 8.9, 2.32, '🔍', 'cz-tc mox-s mox-ph', 0, { w: 1.0 });
  fixed(S, 'card', 1.6, 4.3, 9.0, 4.4, '#fff', 0, { r: .4, css: 'border:.08em solid #dfe3e8' });
  fixed(S, 'img', 2.0, 4.7, 3.2, 3.2, 'linear-gradient(135deg,#9ec5ff,#d6e6ff)', 0);
  T(S, 'pn', 5.6, 4.75, 'Sneakers', 'mox-s mox-ph', 0); T(S, 'pp', 5.6, 5.85, '₩89,000', 'mox-xs mox-ph', 0);
  T(S, 'fs0', 5.6, 6.95, ['무료 배송', 'Free shipping'], 'mox-xs mox-low', 0, { off: 4 }); T(S, 'fs1', 5.6, 6.95, ['무료 배송', 'Free shipping'], 'mox-xs mox-dk', 4);
  fixed(S, 'btn', 1.6, 9.2, 9.0, 1.8, '#2f6fed', 0, { r: .4 }); T(S, 'btl', 1.6, 9.62, ['장바구니 담기', 'Add to cart'], 'cz-tc mox-xs mox-wt', 0, { w: 9.0 });
  fixed(S, 'r1', 1.6, 11.8, 9.0, .9, '#eef0f3'); fixed(S, 'r2', 1.6, 13.0, 6.0, .9, '#eef0f3');
  frame(S, 'f1', 8.65, 2.05, 1.5, 1.5, 'danger', 1, { off: 2, w: .14, r: .35 });
  frame(S, 'f2', 8.65, 2.05, 1.5, 1.5, 'ok', 2, { off: 3, w: .14, r: .35 });
  frame(S, 'h1', 8.9, 2.3, 1.0, 1.0, 'danger', 3, { off: 4, w: .1, r: .2, dash: 1 });
  frame(S, 'h2', 8.4, 1.8, 2.0, 2.0, 'ok', 3, { off: 4, w: .12, r: .4, dash: 1 });
  frame(S, 'f4', 5.35, 6.75, 4.9, 1.25, 'ok', 4, { off: 5, w: .12, r: .3 });
  T(S, 'srl', 12.4, .9, ['🔊 스크린 리더(TalkBack·VoiceOver)가 읽는 말', '🔊 what the screen reader (TalkBack, VoiceOver) says'], 'mox-xs', 1);
  rect(S, 'bub', 12.4, 2.0, 18.6, 2.0, 'ink-3', 12, 1, { r: .6 });
  T(S, 'b1', 13.0, 2.5, ['“버튼” … 무엇을 하는 버튼인지 몰라요 ✗', '“Button” … but what does it do? ✗'], 'mox-s mox-r', 1, { off: 2 });
  T(S, 'b2', 13.0, 2.5, ['“검색, 버튼” ✓', '“Search, button” ✓'], 'mox-s mox-g', 2);
  code(S, 'cd', 12.4, 4.8, 18.6, ['<ImageButton', '    android:src="@drawable/ic_search"', ''], [[2, 2]], { st: 1, lh: 1.2 });
  ver(S, 'cl', 12.9, 7.5, [[1, '    />'], [2, ['    android:contentDescription="검색" />', '    android:contentDescription="Search" />']]], 'cz-mono mox-code', 18);
  T(S, 'ios', 12.4, 9.4, ['iOS: searchButton.accessibilityLabel = "검색"', 'iOS: searchButton.accessibilityLabel = "Search"'], 'cz-mono mox-xs', 2);
  T(S, 'c1', 12.4, 11.0, ['① 라벨: 아이콘에도 읽어 줄 이름을 붙여요', '① labels: give every icon a spoken name'], 'mox-xs', 2);
  T(S, 'c2', 12.4, 12.2, ['② 터치 영역: 보이는 건 24dp, 누르는 곳은 48dp 이상', '② touch target: 24dp to see, 48dp or more to tap'], 'mox-xs', 3);
  T(S, 'c3', 12.4, 13.4, ['③ 글자 대비: 2.3 : 1 ✗ → 4.5 : 1 이상 ✓', '③ text contrast: 2.3 : 1 ✗ → 4.5 : 1 or more ✓'], 'mox-xs', 4);
  stepT(S, 'k', 1, 15.9, [['시각 장애인은 스크린 리더로 화면을 들어요 · 이름 없는 아이콘은 그냥 “버튼”', 'blind users hear the screen through a screen reader · an unnamed icon is just “button”'], ['아이콘에 설명(contentDescription, accessibilityLabel)을 붙이면 뜻이 전달돼요', 'a description (contentDescription, accessibilityLabel) carries the meaning'], ['손가락은 아이콘보다 커요 · 보이는 크기와 별개로 누르는 영역을 넉넉히', 'fingers are bigger than icons · make the hit area generous, whatever the visual size'], ['흐린 회색 글씨는 저시력이나 햇빛 아래에서 안 보여요 · 대비를 4.5 : 1 이상으로', 'pale grey text vanishes for low vision or in sunlight · keep contrast at 4.5 : 1 or more']]);
  fin(S, 'z', 15.9, [['접근성: 장애가 있어도, 한 손이 바빠도, 햇빛 아래서도 쓸 수 있게 만드는 일', 'accessibility: usable with a disability, with one busy hand, in bright sunlight', 'mox-xs mox-a'], ['글자 크기를 키워도(Dynamic Type, 글꼴 배율 200%) 깨지지 않는 레이아웃', 'layouts that survive larger text (Dynamic Type, 200% font scale)'], ['점검: Accessibility Scanner, Xcode Accessibility Inspector, 직접 스크린 리더 켜 보기', 'check with Accessibility Scanner, Xcode Accessibility Inspector, or the screen reader itself']]);
  S.cap(1, '스크린 리더로 듣기', 'Listening with a screen reader').cap(2, '이름 붙이기', 'Give it a name').cap(3, '터치 영역', 'Touch targets').cap(4, '색 대비', 'Color contrast').cap(5, '모바일 접근성', 'Mobile accessibility');
  return S;
}

/* ================= architecture ================= */
function sDeepLink() {
  const S = scene({ id: 'mo-deeplink', steps: 5, per: 1.6 });
  phone(S, 'p1', 1, 1.2, 7.6, 11.6, 0);
  T(S, 'p1t', 1, 2.1, ['메신저', 'Messenger'], 'cz-tc mox-xs', 0, { w: 7.6 });
  rect(S, 'bb', 1.6, 3.3, 6.4, 2.5, 'line', 45, 0, { r: .6 });
  T(S, 'u1', 2.0, 3.55, 'shop.example.com', 'cz-mono mox-xs mox-a', 0); T(S, 'u2', 2.0, 4.6, '/item/42', 'cz-mono mox-xs mox-a', 0);
  rect(S, 'rb', 3.0, 6.5, 5.0, 1.6, 'accent', 30, 0, { r: .6 }); T(S, 'rbl', 3.4, 6.75, ['이거 어때?', 'How about this?'], 'mox-xs', 0);
  ring(S, 'tap', 4.8, 4.55, .95, 'ok', 1, { w: .16, off: 2 });
  ar(S, 'a1', [8.8, 2.6], [10.2, 2.6], 'ink-3', 1, { h: .12 });
  box(S, 'os', 10.4, 1.4, 12.2, 2.4, ['OS: 이 주소를 맡은 앱이 있나?', 'OS: does an app own this URL?'], 'ink-3', 1, { pct: 18 });
  code(S, 'al', 10.4, 4.4, 12.2, ['GET /.well-known/assetlinks.json', '"package_name": "com.example.shop"', '"sha256_cert_…": ["14:6D:…"]'], [], { st: 2, lh: 1.2 });
  T(S, 'v1', 10.4, 8.9, ['앱 서명과 맞으면 → 검증된 앱 링크 ✓', 'signature matches → verified App Link ✓'], 'mox-xs mox-g', 2);
  T(S, 'v2', 10.4, 9.95, ['설치할 때 OS가 미리 받아 확인해 둬요', 'the OS fetches and checks this at install time'], 'mox-xs', 2);
  T(S, 'v3', 10.4, 11.0, ['iOS: apple-app-site-association → 유니버설 링크', 'iOS: apple-app-site-association'], 'mox-xs', 2);
  ar(S, 'a2', [22.8, 2.6], [23.4, 2.6], 'ok', 3, { h: .12 });
  phone(S, 'p2', 23.6, 1.2, 7.4, 11.6, 3);
  rect(S, 'ab', 24.1, 2.0, 6.4, 1.5, 'accent', 20, 3, { r: .3, off: 4 }); T(S, 'abl', 24.4, 2.3, ['← 상품', '← Item'], 'mox-xs', 3, { off: 4 });
  rect(S, 'im', 24.4, 4.0, 5.8, 3.4, 'accent', 30, 3, { r: .3, off: 4 });
  T(S, 'nm', 24.4, 7.7, 'Sneakers', 'mox-s', 3, { off: 4 }); T(S, 'pr', 24.4, 8.8, '₩89,000', 'mox-xs', 3, { off: 4 });
  T(S, 'bs', 23.6, 13.1, ['뒤로 → 홈', 'Back → Home'], 'cz-tc mox-xs mox-a', 3, { off: 4, w: 7.4 });
  T(S, 'rt', 10.4, 12.3, 'route /item/{id} → ItemScreen(id = 42)', 'cz-mono mox-xs mox-a', 3, { off: 4 });
  rect(S, 'wa', 24.1, 2.0, 6.4, 1.4, 'line', 50, 4, { r: .6 }); T(S, 'wal', 24.1, 2.3, '🔒 shop.example.com', 'cz-tc cz-mono mox-xs', 4, { w: 6.4 });
  rect(S, 'wi', 24.4, 4.0, 5.8, 3.4, 'ink-3', 20, 4, { r: .3 }); T(S, 'wn', 24.4, 7.7, 'Sneakers', 'mox-s', 4);
  rect(S, 'wb', 24.1, 9.6, 6.4, 1.8, 'warn', 30, 4, { r: .4 }); T(S, 'wbl', 24.1, 10.05, ['앱에서 열기', 'Open in app'], 'cz-tc mox-xs', 4, { w: 6.4 });
  T(S, 'nw', 10.4, 12.3, ['앱이 없으면 → 같은 주소의 웹 페이지가 열려요', 'no app → the same URL opens on the web'], 'mox-xs mox-w', 4);
  stepT(S, 'k', 1, 15.8, [['메신저에서 https 링크를 누르면 OS가 이 주소를 맡은 앱이 있는지 찾아요', 'tap an https link in a chat and the OS looks for an app that owns the address'], ['앱을 설치할 때 OS가 그 도메인의 파일을 받아, 정말 그 회사의 앱인지 서명으로 확인해 둬요', 'at install time the OS fetches a file from the domain and checks the app’s signature against it'], ['검증된 앱이 링크의 경로를 해석해 그 화면을 바로 열어요 · 뒤로 가면 홈', 'the verified app parses the path and opens that screen directly · Back goes Home'], ['앱이 없으면 같은 주소가 웹에서 열리고, 설치 뒤 첫 실행에 그 화면으로 이어 줄 수도 있어요', 'without the app the same URL opens on the web, and can resume there after install']]);
  fin(S, 'z', 15.8, [['딥 링크: 앱의 특정 화면으로 바로 들어가는 링크 · 앱 링크(Android)·유니버설 링크(iOS)', 'deep links open a specific screen in an app · App Links (Android), Universal Links (iOS)', 'mox-xs mox-a'], ['myapp:// 같은 사용자 정의 스킴은 검증이 없어 다른 앱이 가로챌 수 있어요 ✗', 'custom schemes like myapp:// are unverified, so another app can claim them ✗', 'mox-xs mox-r'], ['푸시·이메일·광고·QR에서 바로 그 화면으로 · 설치 후 이어 주면 디퍼드 딥 링크', 'used from push, email, ads and QR codes · resuming after install is a deferred deep link']]);
  S.cap(1, '링크를 누르면', 'Tapping a link').cap(2, '도메인이 앱을 보증해요', 'The domain vouches for the app').cap(3, '바로 그 화면으로', 'Straight to the screen').cap(4, '앱이 없으면 웹으로', 'No app? The web').cap(5, '딥 링크', 'Deep links');
  return S;
}

/* ================= data & network ================= */
function sAuth() {
  const S = scene({ id: 'mo-auth', steps: 5, per: 1.7 });
  box(S, 'ha', 2, 1.0, 6, 1.8, ['📱 앱', '📱 app'], 'accent', 0, { pct: 22 });
  box(S, 'hs', 13.5, 1.0, 7, 1.8, ['🔐 인증 서버', '🔐 auth server'], 'warn', 0, { pct: 22 });
  vl(S, 'la', 5, 2.9, 14.8, 'ink-3', 0, { dash: 1, w: .08 }); vl(S, 'ls', 17, 2.9, 14.8, 'ink-3', 0, { dash: 1, w: .08 });
  code(S, 'cv', .8, 3.3, 11.6, ['verifier  = "dBjftJeZ4CVP…"', 'challenge = SHA256(verifier)'], [], { st: 1, lh: 1.15 });
  ar(S, 'm1', [5.1, 7.6], [16.9, 7.6], 'accent', 2, { h: .12 });
  T(S, 'm1l', 5.6, 6.6, 'authorize?code_challenge=E9Mel…', 'cz-mono mox-xs mox-a', 2);
  T(S, 'm1s', 5.6, 7.9, ['시스템 브라우저로 열어요', 'in the system browser'], 'mox-xs', 2);
  hl(S, 'lgc', 17.1, 19.3, 7.5, 'warn', 2, { w: .08 });
  box(S, 'lg', 19.4, 6.6, 7.6, 1.8, ['🔑 사용자 로그인', '🔑 user signs in'], 'warn', 2, { pct: 28 });
  T(S, 'lgs', 19.4, 8.6, ['비밀번호는 앱이 못 봐요', 'the app never sees the password'], 'mox-xs', 2);
  ar(S, 'm2', [16.9, 10.8], [5.1, 10.8], 'ok', 3, { h: .12 });
  T(S, 'm2l', 5.6, 9.8, ['앱 링크로 복귀 · code=Splx…', 'back via App Link · code=Splx…'], 'mox-xs mox-g', 3);
  T(S, 'atk', 19.4, 10.0, ['😈 code를 가로챈 앱도 verifier가 없으면 못 써요', '😈 a stolen code is useless without the verifier'], 'mox-xs mox-r', 3, { w: 11.4 });
  ar(S, 'm3', [5.1, 12.8], [16.9, 12.8], 'accent', 4, { h: .12 });
  T(S, 'm3l', 5.6, 11.8, 'POST /token · code + verifier', 'cz-mono mox-xs mox-a', 4);
  T(S, 'chk', 19.4, 12.4, 'SHA256(verifier) = challenge ✓', 'cz-mono mox-xs mox-g', 4);
  ar(S, 'm4', [16.9, 14.6], [5.1, 14.6], 'ok', 4, { h: .12 });
  T(S, 'm4l', 5.6, 13.6, ['access 토큰 + refresh 토큰', 'access + refresh tokens'], 'mox-xs mox-g', 4);
  T(S, 's1', 19.4, 13.6, ['access: 메모리에 · 짧게 만료 (예: 15분)', 'access: in memory · short-lived (e.g. 15 min)'], 'mox-xs', 5);
  T(S, 's2', 19.4, 14.6, ['refresh: Keychain·Keystore에 암호화', 'refresh: encrypted in Keychain / Keystore'], 'mox-xs', 5);
  stepT(S, 'k', 1, 16.0, [['앱이 무작위 비밀 verifier를 만들고, 그 해시 challenge를 준비해요', 'the app makes a random secret (verifier) and its hash (challenge)'], ['시스템 브라우저로 로그인 페이지를 열고 challenge만 보내요 · 로그인은 인증 서버가 받아요', 'it opens the sign-in page in the system browser and sends only the challenge'], ['로그인이 끝나면 일회용 code를 들고 앱으로 돌아와요', 'after sign-in, a one-time code comes back to the app'], ['code와 verifier를 함께 내면, 서버가 해시를 맞춰 보고 토큰을 줘요', 'the app trades code + verifier; the server checks the hash and returns tokens']]);
  fin(S, 'z', 16.0, [['OAuth 2.0 + PKCE: 비밀 키를 숨길 수 없는 모바일 앱을 위한 로그인 흐름', 'OAuth 2.0 + PKCE: the sign-in flow for apps that cannot hide a secret', 'mox-xs mox-a'], ['API 요청엔 Authorization: Bearer <access> · 만료되면 refresh 토큰으로 새로 받아요', 'API calls carry Authorization: Bearer <access> · renew it with the refresh token'], ['앱 안 WebView 로그인은 피해요 · 앱이 비밀번호를 볼 수 있어서 구글 등이 막아요', 'avoid in-app WebView sign-in · the app could read the password, so Google blocks it']]);
  S.cap(1, 'verifier와 challenge', 'Verifier and challenge').cap(2, '브라우저에서 로그인', 'Sign in in the browser').cap(3, 'code를 들고 복귀', 'Back with a code').cap(4, 'code를 토큰으로', 'Trade the code for tokens').cap(5, '모바일 로그인 (OAuth + PKCE)', 'Mobile sign-in (OAuth + PKCE)');
  return S;
}

/* ================= performance & release ================= */
function sCrash() {
  const S = scene({ id: 'mo-crash', steps: 5, per: 1.6 });
  phone(S, 'ph', 1, 1.2, 7.4, 11.6, 0);
  rect(S, 'ab', 1.5, 2.0, 6.4, 1.5, 'accent', 18, 0, { r: .3 }); T(S, 'abl', 1.9, 2.3, ['장바구니', 'Cart'], 'mox-xs', 0);
  [4.0, 5.6, 7.2].forEach((y, i) => rect(S, 'it' + i, 1.5, y, 6.4, 1.3, 'line', 50, 0, { r: .3 }));
  rect(S, 'co', 1.5, 9.4, 6.4, 1.5, 'accent', 45, 0, { r: .4 }); T(S, 'col', 1.5, 9.75, ['결제하기', 'Checkout'], 'cz-tc mox-xs', 0, { w: 6.4 });
  ring(S, 'tap', 4.7, 10.15, .8, 'ok', 1, { w: .16, off: 2 });
  fixed(S, 'dim', 1.15, 1.35, 7.1, 11.3, 'rgba(0,0,0,.28)', 1, { r: .85, off: 2 });
  rect(S, 'dlg', 1.7, 4.4, 6.0, 3.8, 'ui', 0, 1, { r: .5, off: 2, css: 'border:.1em solid var(--line);box-shadow:0 .3em 1em rgba(0,0,0,.25)' });
  T(S, 'dl1', 2.1, 4.75, ['Shop이 계속 중지됨', 'Shop keeps stopping'], 'mox-xs', 1, { off: 2, w: 5.4 });
  T(S, 'dl2', 2.1, 6.95, ['앱 닫기', 'Close app'], 'mox-xs mox-a', 1, { off: 2 });
  T(S, 'rep', 1, 13.1, '💾 crash_0412.txt', 'cz-tc cz-mono mox-xs', 1, { w: 7.4, off: 3 });
  ar(S, 'up', [8.6, 3.3], [10.2, 3.3], 'accent', 2, { h: .12 });
  T(S, 'obt', 10.4, .2, ['다음 실행 때 서버로 올라온 스택', 'uploaded on the next launch'], 'mox-xs mox-a', 2);
  code(S, 'ob', 10.4, 1.2, 10.3, ['java.lang.NullPointerException', '  at a.b.c(SourceFile:3)', '  at a.b.d(SourceFile:1)'], [], { st: 2, lh: 1.2 });
  T(S, 'obr', 10.4, 5.7, ['이름이 줄여져 있어 읽을 수 없어요 ✗', 'obfuscated names, unreadable ✗'], 'mox-xs mox-r', 2);
  T(S, 'mpt', 22.2, .2, 'mapping.txt', 'cz-mono mox-xs mox-a', 3);
  code(S, 'mp', 22.2, 1.2, 8.8, ['CartViewModel -> a.b:', '  int total() -> c', '  void checkout() -> d'], [], { st: 3, lh: 1.2 });
  T(S, 'mps', 22.2, 5.7, ['빌드할 때 함께 업로드', 'uploaded with each build'], 'mox-xs', 3);
  ar(S, 'm1', [20.8, 3.3], [22.1, 3.3], 'ink-3', 3, { h: .1 });
  ar(S, 'd1', [15.5, 6.8], [15.5, 8.4], 'ok', 3, { h: .12 }); ar(S, 'd2', [26.6, 6.8], [26.6, 8.4], 'ok', 3, { h: .12 });
  code(S, 'rd', 10.4, 8.6, 20.6, ['java.lang.NullPointerException', '  at CartViewModel.total(CartViewModel.kt:87)', '  at CartViewModel.checkout(CartViewModel.kt:42)'], [[1, 3]], { st: 3, lh: 1.2 });
  box2(S, 'is', 10.4, 13.4, 10.3, 1.7, ['이슈 #1 · 3,410번 · 사용자 1,240명', 'issue #1 · 3,410× · 1,240 users'], 'danger', 4, { pct: 20 });
  box2(S, 'cf', 21.4, 13.4, 9.6, 1.7, ['크래시 없는 사용자 99.2%', 'crash-free users 99.2%'], 'ok', 4, { pct: 20 });
  stepT(S, 'k', 1, 15.8, [['앱이 죽는 순간, 크래시 핸들러가 스택 트레이스와 기기 정보를 파일로 남겨요', 'as the app dies, a crash handler writes the stack trace and device info to a file'], ['다음에 앱을 켜면 그 보고서를 크래시 수집 서버로 올려요', 'on the next launch the report is uploaded to the crash service'], ['릴리스 빌드는 이름이 줄여져 있어, 빌드 때 올린 매핑으로 원래 이름과 줄 번호를 되찾아요', 'release builds are obfuscated; the mapping uploaded at build time restores names and lines'], ['같은 스택은 한 이슈로 묶고, 몇 명이 겪는지 세어 우선순위를 정해요', 'identical stacks group into one issue, ranked by how many users hit it']]);
  fin(S, 'z', 15.8, [['크래시 리포팅: 사용자 기기에서 죽은 순간을 모아 읽을 수 있게 되돌려요', 'crash reporting gathers failures from users’ devices and makes them readable', 'mox-xs mox-a'], ['iOS·네이티브 코드는 dSYM 같은 심볼 파일로 주소를 함수 이름으로 바꿔요(심볼리케이션)', 'iOS and native code map addresses to names with symbol files such as dSYMs (symbolication)'], ['ANR(앱 응답 없음)도 함께 봐요 · Firebase Crashlytics, Sentry, Play Console', 'ANRs (app not responding) are tracked too · Firebase Crashlytics, Sentry, Play Console']]);
  S.cap(1, '앱이 죽는 순간', 'The moment of the crash').cap(2, '다음 실행 때 업로드', 'Uploaded on the next launch').cap(3, '매핑으로 이름 되찾기', 'Restore names with the mapping').cap(4, '이슈로 묶고 세기', 'Group and count').cap(5, '크래시 리포트', 'Crash reports');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'mox-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono mox-code ' + (o.cls || ''), st, { off }));
function sPerm() {
  const S = scene({ id: 'mo-perm', steps: 5, per: 1.7 });
  phone(S, 'ph', 1, .4, 9.0, 14.0, 0);
  T(S, 'ah', 1.6, 1.4, ['프로필 사진', 'profile photo'], 'cz-tc mox-s', 0, { w: 7.8 });
  ring(S, 'av', 5.5, 4.6, 1.6, 'ink-3', 0, { w: .12 });
  box2(S, 'btn', 2.2, 7.2, 6.6, 1.3, ['사진 찍기', 'take a photo'], 'accent', 0, { pct: 30 });
  rect(S, 'dim', 1.15, .55, 8.7, 13.7, 'ink', 30, 1, { r: .9, off: 2, css: 'z-index:3' });
  rect(S, 'dlg', 1.8, 4.0, 7.4, 6.4, 'ui', 0, 1, { r: .5, css: 'z-index:3;border:.12em solid var(--line);box-shadow:0 .3em 1em rgba(0,0,0,.2)', off: 2 });
  T(S, 'dt', 2.1, 4.3, ['카메라에 접근하도록', 'allow access to'], 'cz-tc mox-xs', 1, { w: 6.8, off: 2 }); T(S, 'dt2', 2.1, 5.2, ['허용할까요?', 'the camera?'], 'cz-tc mox-xs', 1, { w: 6.8, off: 2 });
  T(S, 'dr', 2.1, 6.4, ['“프로필 사진을 찍는 데 필요해요”', '“needed to take your profile photo”'], 'cz-tc mox-xs mox-a', 1, { w: 6.8, off: 2 });
  cell(S, 'dn', 2.2, 8.4, 3.2, 1.2, ['거부', 'deny'], 'line', 12, 1, { off: 2, css: 'z-index:4' }); cell(S, 'dy', 5.6, 8.4, 3.2, 1.2, ['허용', 'allow'], 'accent', 30, 1, { off: 2, css: 'z-index:4' });
  const R = 11.8;
  T(S, 'c0', R, .5, ['1. 선언', '1. declare'], 'mox-xs mox-a', 1, { off: 2 });
  codeLines(S, 'c1', R, 1.5, ['<uses-permission android:name=', '    "android.permission.CAMERA" />', 'NSCameraUsageDescription = "…"'], 1, 2, { lh: .85 });
  T(S, 'c2', R, 4.4, ['2. 필요한 순간에 요청', '2. ask at the moment of need'], 'mox-xs mox-a', 1, { off: 2 });
  codeLines(S, 'c3', R, 5.4, ['requestPermission(CAMERA)', 'AVCaptureDevice.requestAccess(.video)'], 1, 2, { lh: .85 });
  T(S, 'c4', R, 7.6, ['앱을 켜자마자 다 묻지 말고, 버튼을 누를 때', 'not all at launch; when the button is tapped'], 'mox-xs mox-g', 1, { off: 2 });
  const OUT = [[['허용', 'allowed'], ['카메라 열기', 'open the camera'], 'ok'], [['거부', 'denied'], ['갤러리에서 고르기로 대체', 'fall back to the gallery'], 'warn'], [['두 번 거부', 'denied twice'], ['다시 묻지 않음 → 설정 화면 안내', 'no more prompts → point to Settings'], 'danger']];
  OUT.forEach(([a, b, c], i) => { cell(S, 'o' + i, R, .8 + i * 2.0, 5.4, 1.4, a, c, 26, 2, { off: 3 }); T(S, 'ot' + i, R + 6.0, 1.05 + i * 2.0, b, 'mox-xs', 2, { off: 3 }); });
  T(S, 'o3', R, 7.0, ['거부해도 앱의 나머지는 계속 쓸 수 있어야 해요', 'the rest of the app must keep working after a denial'], 'mox-xs mox-g', 2, { off: 3 });
  T(S, 's0', R, .5, ['범위를 좁혀서 묻기', 'ask for narrower scopes'], 'mox-xs mox-a', 3, { off: 4 });
  [[['위치: 대략 / 정확', 'location: approximate / precise'], 'accent'], [['앱 사용 중에만 · 이번만', 'while using the app · only this time'], 'ok'], [['사진 선택기: 권한 없이 고른 사진만', 'photo picker: chosen photos, no permission'], 'warn']].forEach(([t, c], i) => cell(S, 'sc' + i, R, 1.6 + i * 1.7, 19.0, 1.3, t, c, 20, 3, { off: 4 }));
  T(S, 'r0', R, .5, ['권한은 언제든 바뀌어요', 'permissions can change at any time'], 'mox-xs mox-a', 4);
  T(S, 'r1', R, 1.6, ['사용자가 설정에서 철회 · 오래 안 쓴 앱은 OS가 자동 회수', 'users revoke them in Settings · the OS resets them for unused apps'], 'mox-xs', 4, { w: 19.2 });
  codeLines(S, 'r2', R, 3.0, ['if (checkSelfPermission(CAMERA) == GRANTED) …', 'AVCaptureDevice.authorizationStatus(for: .video)'], 4, 0);
  T(S, 'r3', R, 5.6, ['→ 쓰기 직전에 매번 확인해요', '→ check every time right before use'], 'mox-xs mox-g', 4);
  notesSplit(S, 'k', 15.6, [['민감한 기능은 앱 설정 파일에 선언하고, 실행 중 그 기능이 필요한 순간에 사용자에게 물어요', 'sensitive features are declared in the app’s manifest and requested at run time, at the moment they are needed'], ['허용·거부 모두 대비해요 · 거부하면 대체 경로를, 두 번 거부하면 설정 화면으로 안내해요', 'handle both answers: offer a fallback on denial and point to Settings after repeated denials'], ['필요한 만큼만 물어요 · 대략적 위치, 사용 중에만, 고른 사진만처럼 범위를 좁혀요', 'ask for no more than needed: approximate location, while-in-use, selected photos only'], ['허락은 언제든 철회되고 OS가 자동 회수하기도 해요 · 쓰기 직전에 매번 확인해요', 'grants can be revoked or auto-reset at any time, so check right before each use']]);
  fin(S, 'z', 15.6, [['런타임 권한: 설치할 때가 아니라 기능을 쓰는 순간에 사용자에게 허락을 받는 방식', 'runtime permissions ask the user at the moment a feature is used, not at install time', 'mox-xs mox-a'], ['왜 필요한지 맥락이 분명할수록 허용률이 높아요 · 설명 문구는 심사에서도 확인해요', 'clear context raises acceptance, and app review checks the usage descriptions too'], ['권한 없이 되는 대안(사진 선택기, 공유 시트)이 있으면 그쪽이 먼저예요', 'permission-free alternatives such as the photo picker or share sheet come first']]);
  S.cap(1, '필요한 순간에 묻기', 'Ask in the moment').cap(2, '허용과 거부', 'Allow and deny').cap(3, '좁은 범위', 'Narrow scopes').cap(4, '언제든 바뀌는 권한', 'Permissions change').cap(5, '런타임 권한', 'Runtime permissions');
  return S;
}

function sSign() {
  const S = scene({ id: 'mo-sign', steps: 5, per: 1.7 });
  box2(S, 'pkg', 1, 1.0, 6.0, 2.2, 'app.aab', 'line', 0, { pct: 18 });
  ar(S, 'h1', [7.0, 2.1], [9.4, 2.1], 'ink-2', 1, { h: .1 }); cell(S, 'hs', 9.4, 1.4, 6.4, 1.4, 'SHA-256: a3f9…', 'accent', 22, 1);
  ar(S, 'h2', [15.8, 2.1], [18.2, 2.1], 'ink-2', 1, { h: .1 }); box2(S, 'sk', 18.2, 1.0, 5.6, 2.2, ['개인키로 서명', 'sign with private key'], 'warn', 1, { pct: 26 });
  ar(S, 'h3', [23.8, 2.1], [25.6, 2.1], 'ink-2', 1, { h: .1 }); cell(S, 'sg', 25.6, 1.4, 5.6, 1.4, ['서명 + 인증서', 'signature + cert'], 'ok', 26, 1);
  T(S, 'n1', 1, 3.8, ['개인키는 개발자만, 공개키는 인증서에 담아 앱과 함께', 'only the developer holds the private key; the public key ships in the certificate'], 'mox-xs', 1, { off: 2 });
  const vr = (k, y, hsh, ok, st, off) => { box2(S, k + 'p', 1, y, 5.2, 1.6, ok ? 'app.aab' : ['변조된 app.aab', 'tampered app.aab'], ok ? 'line' : 'danger', st, { pct: ok ? 18 : 26, off }); ar(S, k + 'a', [6.2, y + .8], [7.6, y + .8], 'ink-2', st, { h: .1, off }); cell(S, k + 'h', 7.6, y + .2, 5.8, 1.2, 'SHA-256: ' + hsh, ok ? 'accent' : 'danger', 22, st, { off }); T(S, k + 'eq', 13.7, y + .3, ok ? '=' : '≠', 'cz-mono mox-s ' + (ok ? 'mox-g' : 'mox-r'), st, { off }); cell(S, k + 's', 14.8, y + .2, 10.8, 1.2, ['서명 + 공개키 → a3f9…', 'signature + public key → a3f9…'], 'ok', 18, st, { off }); T(S, k + 'r', 26.2, y + .35, ok ? ['설치 ✓', 'install ✓'] : ['거부 ✗', 'rejected ✗'], 'mox-xs ' + (ok ? 'mox-g' : 'mox-r'), st, { off }); };
  T(S, 'v0', 1, 4.0, ['기기에서 설치할 때', 'at install time on the device'], 'mox-xs mox-a', 2, { off: 3 });
  vr('va', 5.0, 'a3f9…', true, 2, 3); vr('vb', 7.2, '7c21…', false, 2, 3);
  T(S, 'u0', 1, 4.0, ['업데이트는 같은 키로 서명해야 설치돼요 · 앱의 정체 = 패키지 이름 + 서명 키', 'updates install only with the same signing key · app identity = package name + signing key'], 'mox-xs mox-a', 3, { off: 4 });
  box2(S, 'up', 1, 5.4, 7.4, 1.6, ['개발자: 업로드 키', 'developer: upload key'], 'warn', 3, { pct: 26, off: 4 }); ar(S, 'ua', [8.4, 6.2], [11.0, 6.2], 'ink-2', 3, { h: .1, off: 4 });
  box2(S, 'gp', 11.0, 5.4, 9.4, 1.6, ['Play: 확인 후 앱 서명 키로 재서명', 'Play: verify, re-sign with app key'], 'ok', 3, { pct: 24, off: 4 }); ar(S, 'ub', [20.4, 6.2], [23.0, 6.2], 'ink-2', 3, { h: .1, off: 4 });
  box2(S, 'us', 23.0, 5.4, 8.0, 1.6, ['사용자 기기', 'users’ devices'], 'line', 3, { pct: 16, off: 4 });
  T(S, 'u1', 1, 7.6, ['업로드 키를 잃어도 재설정 가능 · 앱 서명 키는 Google이 보관', 'a lost upload key can be reset; Google keeps the app signing key'], 'mox-xs mox-g', 3, { off: 4 });
  T(S, 'i0', 1, 4.0, ['iOS: Apple이 믿는 인증서 + 프로비저닝 프로파일', 'iOS: an Apple-trusted certificate + a provisioning profile'], 'mox-xs mox-a', 4);
  [[['App ID', 'App ID'], 'com.example.app'], [['권한(entitlements)', 'entitlements'], ['푸시, iCloud, 결제…', 'push, iCloud, payments…']], [['기기 목록 (개발용)', 'device list (dev builds)'], ['등록된 기기에서만 실행', 'runs only on registered devices']]].forEach(([a, b], i) => { cell(S, 'ip' + i, 1, 5.2 + i * 1.5, 8.0, 1.2, a, 'accent', 20, 4); T(S, 'ipt' + i, 9.6, 5.35 + i * 1.5, b, 'mox-xs', 4); });
  T(S, 'i1', 1, 9.8, ['App Store 배포본은 Apple이 다시 서명해 기기에 내려줘요', 'App Store builds are re-signed by Apple before reaching devices'], 'mox-xs mox-g', 4);
  notesSplit(S, 'k', 15.6, [['서명: 앱 파일의 해시를 개발자의 개인키로 서명하고, 공개키가 든 인증서를 함께 붙여요', 'signing hashes the app file, signs the hash with the developer’s private key and attaches a certificate holding the public key'], ['기기는 해시를 다시 계산해 서명과 비교해요 · 한 바이트만 바뀌어도 달라져 설치를 거부해요', 'the device recomputes the hash and checks it against the signature; a single changed byte means rejection'], ['업데이트는 같은 키여야 해요 · Play 앱 서명은 업로드 키와 실제 서명 키를 나눠 분실에 대비해요', 'updates need the same key · Play App Signing splits the upload key from the real signing key to survive loss'], ['iOS는 Apple 인증서와 프로비저닝 프로파일이 앱 ID, 권한, 실행 가능한 기기를 함께 정해요', 'on iOS, Apple certificates and provisioning profiles fix the app ID, entitlements and allowed devices']]);
  fin(S, 'z', 15.6, [['코드 서명: 누가 만들었는지와 변조되지 않았음을 전자 서명으로 증명하기', 'code signing proves with a digital signature who built the app and that it has not been altered', 'mox-xs mox-a'], ['서명 키는 비밀번호 관리자나 HSM·CI 비밀 저장소에 두고, 저장소에 절대 커밋하지 않아요', 'keep signing keys in a vault, HSM or CI secret store and never commit them'], ['데스크톱도 같아요 · Windows Authenticode, macOS 공증(notarization)', 'desktops do the same: Windows Authenticode and macOS notarization']]);
  S.cap(1, '해시를 개인키로 서명', 'Sign the hash').cap(2, '설치할 때 검증', 'Verify at install').cap(3, '업데이트와 키 관리', 'Updates and key management').cap(4, 'iOS 프로비저닝', 'iOS provisioning').cap(5, '코드 서명', 'Code signing');
  return S;
}

function sBgWork() {
  const S = scene({ id: 'mo-bg', steps: 5, per: 1.7 });
  T(S, 'h0', 1, .2, ['앱이 화면에서 사라지면', 'when the app leaves the screen'], 'mox-xs mox-a', 0);
  [[1, 12, ['포그라운드: 실행 중', 'foreground: running'], 'ok'], [13, 6, ['백그라운드: 몇 초', 'background: seconds'], 'warn'], [19.2, 11.8, ['일시 정지 · 스레드·타이머도 멈춤', 'suspended · threads and timers stop'], 'line']].forEach(([x, w, l, c], i) => cell(S, 'ph' + i, x, 1.4, w - .1, 1.4, l, c, 26, 0, { off: 2 }));
  S.set('h0', 2, { opacity: '0' });
  T(S, 'h1', 1, 3.2, ['그래서 백그라운드 일은 OS에 맡겨야 해요', 'so background work must be handed to the OS'], 'mox-xs mox-r', 1, { off: 2 });
  const RW = [[['종류', 'kind'], 'Android', 'iOS'], [['사용자가 아는 지속 작업', 'ongoing, user-visible'], ['포그라운드 서비스 + 알림', 'foreground service + notification'], ['백그라운드 모드 (오디오·위치)', 'background modes (audio, location)']], [['미뤄도 되는 작업', 'deferrable'], 'WorkManager', 'BGProcessingTask'], [['주기적 새로 고침', 'periodic refresh'], ['PeriodicWork (최소 15분)', 'PeriodicWork (≥ 15 min)'], 'BGAppRefreshTask'], [['큰 다운로드', 'large downloads'], 'DownloadManager', ['백그라운드 URLSession', 'background URLSession']]];
  RW.forEach((r, i) => r.forEach((c, j) => T(S, `rw${i}${j}`, [1, 10.0, 21.0][j], .6 + i * 1.3, c, (j ? 'cz-mono ' : '') + 'mox-xs ' + (i === 0 ? 'mox-a' : ''), 2, { off: 3 })));
  rect(S, 'cbg', .6, .4, 18.6, 5.0, 'ink', 6, 3, { r: .4, off: 4 });
  codeLines(S, 'wc', 1.0, .6, ['val req = OneTimeWorkRequestBuilder<SyncWorker>()', '  .setConstraints(Constraints(', '     requiredNetworkType = UNMETERED,', '     requiresCharging = true))', '  .build()', 'WorkManager.getInstance(ctx).enqueue(req)'], 3, 4, { lh: .75 });
  T(S, 'wn', 20.2, .8, ['조건이 맞을 때 OS가 실행', 'the OS runs it when conditions hold'], 'mox-xs mox-a', 3, { off: 4 });
  T(S, 'wn2', 20.2, 1.9, ['와이파이 + 충전 중', 'Wi-Fi + charging'], 'mox-xs', 3, { off: 4 }); T(S, 'wn3', 20.2, 3.0, ['→ 밤 2시에 한꺼번에', '→ all together at 2 a.m.'], 'mox-xs mox-g', 3, { off: 4 });
  T(S, 'wn4', 1, 6.0, ['앱이 종료되거나 재부팅돼도 예약이 유지되고, 실패하면 백오프로 재시도해요', 'the schedule survives app death and reboots, and failures retry with backoff'], 'mox-xs', 3, { off: 4 });
  phone(S, 'fp', 1, .4, 9.0, 7.6, 4);
  rect(S, 'nt', 1.6, 1.8, 7.8, 2.4, 'accent', 18, 4, { r: .4 }); T(S, 'ntt', 1.9, 1.95, ['운동 기록 중 · 3.2 km', 'workout tracking · 3.2 km'], 'mox-xs', 4); T(S, 'ntt2', 1.9, 3.0, '00:24:13', 'cz-mono mox-s', 4);
  T(S, 'fs0', 11.0, .8, ['포그라운드 서비스: 알림을 띄워 사용자가 알게', 'foreground service: a visible notification'], 'mox-xs mox-a', 4);
  T(S, 'fs1', 11.0, 1.9, ['음악, 내비게이션, 운동 기록, 통화', 'music, navigation, workouts, calls'], 'mox-xs', 4);
  T(S, 'fs2', 11.0, 3.0, ['Android 14+: 종류(type)를 선언해야 해요', 'Android 14+: a declared service type is required'], 'mox-xs mox-w', 4);
  T(S, 'fs3', 11.0, 4.6, ['정확한 시각에 기대지 마세요 · 주기 작업은 최소 15분, 시점은 OS가 정해요', 'do not rely on exact timing · periodic work is ≥ 15 min and the OS picks when'], 'mox-xs', 4, { w: 20.0 });
  notesSplit(S, 'k', 15.6, [['앱이 백그라운드로 가면 OS는 몇 초 안에 멈추거나 제한해요 · 그냥 만든 스레드와 타이머는 믿을 수 없어요', 'once the app is backgrounded the OS suspends or restricts it within seconds, so plain threads and timers cannot be trusted'], ['일의 종류에 맞는 OS API에 맡겨요 · 지속 작업, 미룰 수 있는 작업, 주기 작업, 큰 다운로드', 'hand each kind of work to the matching OS API: ongoing, deferrable, periodic or large downloads'], ['미뤄도 되는 일은 조건(와이파이, 충전)을 걸어 OS가 몰아서 실행하게 해요 · 배터리를 아껴요', 'deferrable work carries constraints (Wi-Fi, charging) so the OS can batch it and save battery'], ['사용자가 알아야 하는 지속 작업은 알림이 붙은 포그라운드 서비스로 해요', 'ongoing work the user should know about runs as a foreground service with a notification']]);
  fin(S, 'z', 15.6, [['백그라운드 작업: 앱이 화면에 없을 때 할 일을 OS의 스케줄러에 맡겨 실행하는 방식', 'background work hands tasks to the OS scheduler to run while the app is off screen', 'mox-xs mox-a'], ['OS는 배터리와 성능을 위해 실행 시점을 미루고 모아요 · 정확한 시각은 보장되지 않아요', 'the OS defers and batches work for battery and performance, so exact timing is never guaranteed'], ['서버가 할 수 있는 일(알림 발송, 정산)은 아예 서버에서 하는 게 안정적이에요', 'anything the server can do, such as sending notifications or settlements, is more reliable done there']]);
  S.cap(1, '백그라운드에서 멈추는 앱', 'Apps stop in the background').cap(2, '종류별 OS API', 'OS APIs by kind').cap(3, '조건을 건 미룬 작업', 'Deferred work with constraints').cap(4, '포그라운드 서비스', 'Foreground services').cap(5, '백그라운드 작업', 'Background work');
  return S;
}

return { css: CSSX + `
.mox-ph .in{color:#1f2328!important;text-shadow:none!important}
.mox-low .in{color:#aaaaaa!important;text-shadow:none!important}
.mox-dk .in{color:#767676!important;text-shadow:none!important}
.mox-wt .in{color:#fff!important;text-shadow:none!important}`, secs: [], add: {
  'mo-plat': [
    item('mo-startup', '앱 시작 시간', 'App startup time', '아이콘을 누른 뒤 첫 화면이 뜨기까지의 시간이에요. 프로세스부터 새로 만드는 콜드 스타트가 가장 느려요.', '콜드 스타트는 프로세스를 만들고(Android는 Zygote에서 포크), Application을 초기화하고, 첫 화면(Activity)을 만들어 그려요. 웜 스타트는 프로세스는 살아 있고 화면만 다시 만들며, 핫 스타트는 메모리에 남은 화면을 앞으로 가져오기만 해요. 시작이 느린 가장 흔한 원인은 분석·광고·DB 같은 SDK를 Application.onCreate에서 한꺼번에 초기화하는 거예요. 급하지 않은 초기화는 처음 쓸 때로 미루거나(지연 초기화) 백그라운드 스레드로 옮기고, 첫 화면에 꼭 필요한 일만 메인 스레드에서 해요. 첫 프레임까지(TTID)와 내용이 다 그려질 때까지(TTFD)를 재고, Android는 기준 프로필(Baseline Profile)로 시작 경로 코드를 미리 컴파일해 둘 수 있어요. Android vitals는 콜드 스타트 5초, 웜 2초, 핫 1.5초 이상을 과도하다고 봐요.', 'The time from tapping the icon to the first screen. A cold start, which builds the process from scratch, is the slowest.', 'A cold start creates the process (forked from Zygote on Android), initializes the Application and then builds and draws the first screen (Activity). A warm start finds the process alive and only rebuilds the screen; a hot start just brings a screen that is still in memory to the front. The most common cause of slow starts is initializing analytics, ads and database SDKs all at once in Application.onCreate. Defer what is not urgent until first use (lazy initialization) or move it to a background thread, and keep only what the first screen needs on the main thread. Measure time to initial display (TTID) and time to full display (TTFD); on Android, Baseline Profiles precompile the startup path. Android vitals treats cold starts of 5 s or more, warm starts of 2 s and hot starts of 1.5 s as excessive.', sStartup())
  ],
  'mo-ui': [
    item('mo-a11y', '모바일 접근성', 'Mobile accessibility', '장애가 있거나 상황이 불편해도 앱을 쓸 수 있게 만드는 일이에요. 화면을 읽어 주는 스크린 리더, 넉넉한 터치 영역, 충분한 색 대비가 기본이에요.', '시각 장애인은 TalkBack(Android)이나 VoiceOver(iOS) 같은 스크린 리더로 화면을 들으며 써요. 글자 없는 아이콘 버튼은 그냥 “버튼”으로 읽히므로 contentDescription이나 accessibilityLabel로 이름을 붙여야 해요(장식용 이미지는 읽지 않게 빼요). 손가락은 아이콘보다 커서, 아이콘이 24dp라도 누르는 영역은 48dp(iOS 44pt) 이상으로 잡아요. 흐린 회색 글씨는 저시력 사용자나 햇빛 아래에서 읽히지 않으니, 본문 글자와 배경의 대비를 4.5 : 1 이상(WCAG AA)으로 맞춰요. 시스템 글자 크기를 키워도(Android는 최대 200%) 레이아웃이 깨지지 않게 고정 높이를 피하고, 색만으로 의미를 전하지 않아요. Accessibility Scanner나 Xcode Accessibility Inspector로 점검하고, 직접 스크린 리더를 켜고 써 보는 게 가장 확실해요.', 'Making apps usable with a disability or in awkward situations. Screen-reader labels, generous touch targets and enough color contrast are the basics.', 'Blind users hear the screen through a screen reader such as TalkBack (Android) or VoiceOver (iOS). An icon button with no text is read as just “button”, so give it a name with contentDescription or accessibilityLabel (and hide purely decorative images). Fingers are bigger than icons: even a 24dp icon needs a hit area of at least 48dp (44pt on iOS). Pale grey text disappears for low-vision users and in sunlight, so keep body text at a contrast ratio of at least 4.5 : 1 against its background (WCAG AA). Layouts should survive large system font sizes (up to 200% on Android) without fixed heights, and color should never be the only way meaning is conveyed. Check with Accessibility Scanner or Xcode’s Accessibility Inspector, and best of all, turn on the screen reader and use the app yourself.', sA11y())
  ],
  'mo-arch': [
    item('mo-deeplink', '딥 링크와 앱 링크', 'Deep links and App Links', '링크 하나로 앱의 특정 화면을 바로 여는 방법이에요. 도메인이 앱을 보증하는 검증된 링크(앱 링크·유니버설 링크)를 써요.', 'https://shop.example.com/item/42 같은 링크를 누르면, OS는 이 도메인을 맡겠다고 등록한 앱이 있는지 찾아요. 아무 앱이나 도메인을 가로채지 못하게, 앱을 설치할 때 OS가 그 도메인의 /.well-known/assetlinks.json(Android)이나 apple-app-site-association(iOS) 파일을 받아 앱의 패키지 이름·서명과 맞는지 확인해 둬요. 검증된 앱은 링크의 경로(/item/{id})를 해석해 상품 화면을 바로 열고, 뒤로 가기를 누르면 홈으로 가도록 백 스택도 만들어 줘요. 앱이 없으면 같은 주소가 웹 페이지로 열리고, 설치 뒤 첫 실행에 그 화면으로 이어 주는 것을 디퍼드 딥 링크라고 해요. myapp:// 같은 사용자 정의 스킴은 검증이 없어 다른 앱이 같은 스킴을 등록해 가로챌 수 있어요. 푸시 알림, 이메일, 광고, QR 코드에서 앱의 정확한 화면으로 보낼 때 써요.', 'A link that opens a specific screen inside an app. Verified links (App Links, Universal Links) let the domain vouch for the app.', 'Tap a link such as https://shop.example.com/item/42 and the OS looks for an app that has registered for that domain. So that no app can hijack a domain, at install time the OS fetches /.well-known/assetlinks.json (Android) or apple-app-site-association (iOS) from the domain and checks it against the app’s package name and signing certificate. The verified app parses the path (/item/{id}), opens the product screen directly and builds a back stack so that Back leads Home. Without the app, the same URL opens as a web page; carrying the user to that screen on the first launch after install is called a deferred deep link. Custom schemes such as myapp:// are not verified, so another app can register the same scheme and intercept them. Deep links take users from push notifications, emails, ads and QR codes to exactly the right screen.', sDeepLink())
  ],
  'mo-data': [
    item('mo-auth', '모바일 로그인: OAuth와 PKCE', 'Mobile sign-in: OAuth and PKCE', '앱은 비밀 키를 안전하게 숨길 수 없어서, 로그인할 때마다 일회용 비밀(verifier)을 만들어 code를 가로채도 쓸 수 없게 해요.', '앱 파일은 누구나 내려받아 뜯어볼 수 있으니 클라이언트 비밀 키를 넣어 둘 수 없어요. PKCE(Proof Key for Code Exchange)는 로그인할 때마다 앱이 무작위 문자열 verifier를 만들고, 그 SHA-256 해시인 challenge만 인증 요청에 실어 보내요. 로그인은 앱 안의 WebView가 아니라 시스템 브라우저(Custom Tabs, ASWebAuthenticationSession)에서 하므로 앱은 비밀번호를 볼 수 없어요. 로그인이 끝나면 일회용 authorization code가 리디렉트로 앱에 돌아오고, 앱은 code와 verifier를 함께 /token에 보내요. 서버는 SHA256(verifier)가 처음 받은 challenge와 같은지 확인한 뒤 짧게 사는 access 토큰과 refresh 토큰을 줘요. 그래서 다른 앱이 리디렉트를 가로채 code를 얻어도 verifier가 없어 토큰으로 바꿀 수 없어요. access 토큰은 메모리에 두고 API 요청의 Authorization: Bearer 헤더에 실으며, refresh 토큰은 Keychain이나 Android Keystore로 암호화해 보관해요.', 'Apps cannot hide a client secret, so each sign-in creates a one-time secret (the verifier) that makes an intercepted code useless.', 'Anyone can download and unpack an app, so it cannot hold a client secret. With PKCE (Proof Key for Code Exchange) the app creates a random string, the verifier, for every sign-in and sends only its SHA-256 hash, the challenge, with the authorization request. Sign-in happens in the system browser (Custom Tabs, ASWebAuthenticationSession) rather than an in-app WebView, so the app never sees the password. Afterwards a one-time authorization code returns to the app by redirect, and the app sends the code together with the verifier to /token. The server checks that SHA256(verifier) matches the challenge it saw earlier, then returns a short-lived access token and a refresh token. An app that intercepts the redirect gets the code but not the verifier, so it cannot redeem it. Keep the access token in memory and send it as Authorization: Bearer on API calls; store the refresh token encrypted in the Keychain or Android Keystore.', sAuth())
  ],
  'mo-ops': [
    item('mo-crash', '크래시 리포트와 심볼리케이션', 'Crash reporting and symbolication', '사용자 기기에서 앱이 죽은 순간의 스택 트레이스를 모아, 빌드 때 남긴 매핑으로 원래 함수 이름과 줄 번호를 되찾아 보여 줘요.', '앱이 예외로 죽는 순간, 크래시 리포팅 SDK의 핸들러가 스택 트레이스와 기기·OS·앱 버전 정보를 파일로 남기고, 다음에 앱을 켤 때 서버로 올려요. 릴리스 빌드는 R8·ProGuard가 클래스와 메서드 이름을 a.b.c처럼 줄이고(난독화), iOS와 네이티브 코드는 메모리 주소만 남아서 그대로는 읽을 수 없어요. 그래서 빌드할 때 매핑 파일(mapping.txt)이나 디버그 심볼(dSYM)을 함께 올려 두고, 서버가 이것으로 원래 이름과 소스 줄 번호를 되찾아요(리트레이스·심볼리케이션). 같은 스택의 크래시는 하나의 이슈로 묶고, 몇 번·몇 명에게 일어났는지 세어 우선순위를 정해요. 크래시 없는 사용자 비율과 ANR(앱 응답 없음) 비율을 버전별로 보고, 새 버전에서 급증하면 단계적 출시를 멈춰요. Firebase Crashlytics, Sentry, Play Console·App Store Connect가 이 일을 해요.', 'Collecting stack traces from the moment an app dies on users’ devices, then restoring real function names and line numbers with the mapping saved at build time.', 'When an app dies from an exception, the crash SDK’s handler writes the stack trace plus device, OS and app version to a file and uploads it on the next launch. Release builds are shrunk by R8 or ProGuard, so classes and methods appear as a.b.c, and iOS and native code leave only memory addresses, which are unreadable as they are. The build therefore uploads its mapping file (mapping.txt) or debug symbols (dSYM), and the service uses them to restore original names and source lines (retracing, symbolication). Crashes with the same stack are grouped into one issue and counted by occurrences and users affected to set priorities. Crash-free users and ANR (app not responding) rates are tracked per version, and a spike in a new version halts the staged rollout. Firebase Crashlytics, Sentry, Play Console and App Store Connect do this work.', sCrash())
  ]
},
after: {
  'mo-sandbox': [item('mo-perm', '런타임 권한', 'Runtime permissions', '카메라·위치 같은 민감한 기능은 설치할 때가 아니라 실제로 쓰는 순간에 사용자에게 허락을 받아요. 거부와 철회까지 대비해야 해요.', '런타임 권한은 두 단계예요. 먼저 Android는 AndroidManifest.xml에 <uses-permission android:name="android.permission.CAMERA" />를, iOS는 Info.plist에 NSCameraUsageDescription(왜 필요한지 설명 문구)을 선언해요. 그리고 사용자가 “사진 찍기” 버튼을 누르는 것처럼 기능이 필요한 순간에 requestPermission(CAMERA)이나 AVCaptureDevice.requestAccess로 물어요. 앱을 켜자마자 모든 권한을 한꺼번에 물으면 맥락이 없어 거부율이 높아요. 결과는 모두 대비해요. 허용하면 카메라를 열고, 거부하면 갤러리에서 고르기 같은 대체 경로를 주고, Android에서 두 번 거부하면 더 이상 대화상자가 뜨지 않으니 설정 화면으로 안내해요. 거부해도 앱의 나머지 기능은 계속 쓸 수 있어야 해요. 필요한 만큼만 묻는 것도 중요해요. 위치는 대략과 정확을 나눠 묻고, “앱 사용 중에만”이나 “이번만 허용”으로 범위를 좁히며, 사진은 권한 없이 고른 사진만 받는 사진 선택기가 먼저예요. 권한은 사용자가 설정에서 언제든 철회할 수 있고, 오래 쓰지 않은 앱은 OS가 자동으로 회수하기도 해요. 그래서 checkSelfPermission이나 authorizationStatus로 쓰기 직전에 매번 확인해요. 설명 문구는 앱 심사에서도 확인하니 구체적으로 써요.', 'Sensitive features such as the camera or location are approved by the user at the moment they are used, not at install, and apps must handle denial and revocation.', 'Runtime permissions work in two stages. First declare them: Android lists <uses-permission android:name="android.permission.CAMERA" /> in AndroidManifest.xml, and iOS adds NSCameraUsageDescription (a reason string) to Info.plist. Then ask at the moment the feature is needed, for example when the user taps “take a photo”, with requestPermission(CAMERA) or AVCaptureDevice.requestAccess; asking for everything at launch lacks context and gets denied more. Handle every outcome: open the camera when allowed, offer a fallback such as picking from the gallery when denied, and after repeated denials on Android, when the dialog no longer appears, point the user to Settings; the rest of the app must keep working. Ask for no more than needed: approximate rather than precise location, “while using the app” or “only this time”, and the photo picker, which returns chosen photos without any permission, before full library access. Users can revoke permissions in Settings at any time, and the OS auto-resets them for apps left unused, so check with checkSelfPermission or authorizationStatus right before each use. App review reads the usage descriptions too, so make them specific.', sPerm())],
  'mo-build': [item('mo-sign', '코드 서명', 'Code signing', '앱 파일의 해시를 개발자의 개인키로 서명해, 누가 만들었는지와 변조되지 않았음을 증명해요. 업데이트는 같은 키로 서명해야 설치돼요.', '서명할 때는 앱 패키지(AAB, APK, IPA)의 내용을 SHA-256 같은 해시로 요약하고, 그 해시를 개발자만 가진 개인키로 서명한 뒤 공개키가 담긴 인증서와 함께 붙여요. 기기는 설치할 때 패키지의 해시를 다시 계산하고, 서명을 인증서의 공개키로 검증해 두 값이 같은지 확인해요. 한 바이트만 바뀌어도 해시가 완전히 달라져(a3f9… → 7c21…) 설치가 거부되므로, 중간에 악성 코드를 끼워 넣을 수 없어요. Android에서 앱의 정체는 패키지 이름과 서명 키의 조합이라, 업데이트는 반드시 같은 키로 서명해야 하고 키를 잃으면 예전에는 그 앱을 영영 업데이트할 수 없었어요. 그래서 Play 앱 서명은 키를 둘로 나눠요. 개발자는 업로드 키로 서명해 올리고, Google이 이를 확인한 뒤 자기가 보관하는 앱 서명 키로 다시 서명해 사용자에게 배포해요. 업로드 키는 잃어도 재설정할 수 있어요. iOS에서는 Apple이 발급한 인증서와 프로비저닝 프로파일이 필요해요. 프로파일은 App ID, 푸시·iCloud·결제 같은 권한(entitlements), 개발용 빌드를 실행할 수 있는 기기 목록을 묶어 두고, App Store 배포본은 Apple이 다시 서명해 기기에 내려줘요. 서명 키는 비밀 저장소나 HSM에 두고 저장소에 절대 커밋하지 않아요. 데스크톱의 Windows Authenticode와 macOS 공증(notarization)도 같은 원리예요.', 'Signing the hash of the app file with the developer’s private key proves who built it and that it is unaltered; updates install only with the same key.', 'Signing condenses the app package (AAB, APK or IPA) into a hash such as SHA-256, signs that hash with a private key only the developer holds, and attaches a certificate containing the public key. At install time the device recomputes the package hash and verifies the signature with the certificate’s public key, checking that they match. Changing a single byte changes the hash completely (a3f9… → 7c21…), so the install is rejected and no one can slip malicious code in along the way. On Android an app’s identity is its package name plus signing key, so updates must be signed with the same key, and losing the key once meant the app could never be updated again. Play App Signing therefore splits the keys: the developer signs uploads with an upload key, and Google verifies them and re-signs with the app signing key it keeps before distributing; a lost upload key can be reset. iOS requires an Apple-issued certificate and a provisioning profile, which binds the App ID, entitlements such as push, iCloud and payments, and the list of devices allowed to run development builds; App Store builds are re-signed by Apple before reaching devices. Keep signing keys in a secret store or HSM and never commit them. Windows Authenticode and macOS notarization work on the same principle.', sSign())],
  'mo-battery': [item('mo-bg', '백그라운드 작업', 'Background work', '앱이 화면에서 사라지면 OS가 곧 멈추거나 제한하므로, 그때 할 일은 일의 종류에 맞는 OS 스케줄러 API에 맡겨요.', '앱이 백그라운드로 가면 iOS는 몇 초 안에 앱을 일시 정지하고, Android도 잠자기(Doze)와 앱 대기 버킷으로 실행을 제한해요. 그래서 직접 만든 스레드나 타이머는 믿을 수 없고, 일의 종류에 맞는 OS API에 맡겨야 해요. 사용자가 알고 있는 지속 작업(음악 재생, 내비게이션, 운동 기록, 통화)은 Android의 포그라운드 서비스와 상시 알림, iOS의 백그라운드 모드(오디오, 위치)로 해요. Android 14부터는 포그라운드 서비스의 종류(type)를 선언해야 해요. 미뤄도 되는 작업(동기화, 로그 업로드, 백업)은 WorkManager나 BGProcessingTask에 맡기고, “와이파이에서만, 충전 중일 때만” 같은 조건을 걸면 OS가 다른 앱의 작업과 모아 밤 사이 한꺼번에 실행해 배터리를 아껴요. 예약은 앱이 종료되거나 기기가 재부팅돼도 유지되고, 실패하면 백오프로 다시 시도해요. 주기적 새로 고침은 PeriodicWorkRequest(최소 15분)나 BGAppRefreshTask를 쓰는데, 실제 실행 시점은 OS가 사용 패턴과 배터리를 보고 정해요. 큰 다운로드는 DownloadManager나 백그라운드 URLSession이 앱 대신 처리해요. 정확한 시각을 보장하는 알람은 Android 12부터 별도 권한이 필요하고, 조용한 푸시로 앱을 깨우는 횟수도 제한돼요. 서버가 할 수 있는 일은 아예 서버에서 하는 게 가장 안정적이에요.', 'Once an app leaves the screen the OS soon suspends or restricts it, so background tasks are handed to the OS scheduler API that matches the kind of work.', 'When an app goes to the background, iOS suspends it within seconds and Android restricts it through Doze and app standby buckets, so plain threads and timers cannot be trusted; work must go to the OS API that fits. Ongoing work the user knows about, such as music, navigation, workout tracking or calls, runs as an Android foreground service with a persistent notification or under iOS background modes (audio, location), and Android 14 requires declaring the foreground service type. Deferrable work such as syncing, uploading logs or backups goes to WorkManager or BGProcessingTask with constraints like “only on Wi-Fi, only while charging”, letting the OS batch it with other apps’ work overnight to save battery; schedules survive app death and reboots, and failures retry with backoff. Periodic refreshes use PeriodicWorkRequest (at least every 15 minutes) or BGAppRefreshTask, with the OS choosing the actual time from usage patterns and battery state, and large downloads are handled by DownloadManager or a background URLSession on the app’s behalf. Exact alarms need a separate permission from Android 12, and silent pushes that wake apps are rate-limited. Anything the server can do is most reliable done on the server.', sBgWork())]
} };
})();

window.UX = page([
  sec('mo-plat', '플랫폼과 구조', 'Platforms', '플랫폼과 앱 구조', 'Platforms and app structure',
    '앱이 어떻게 만들어지고, 실행되고, 서로 격리되는지예요.', 'How apps are built, run and kept apart.', [
    item('mo-native', '네이티브와 크로스플랫폼', 'Native and cross-platform', '네이티브 앱은 iOS는 Swift, Android는 Kotlin으로 따로 만들고, 크로스플랫폼은 한 코드로 두 플랫폼을 함께 만들어요.', 'Flutter는 Dart 위젯을 자체 엔진(Impeller)으로 직접 그려 어디서나 똑같이 보이고, React Native는 JavaScript 로직으로 진짜 네이티브 컴포넌트를 조종해요. Kotlin Multiplatform은 비즈니스 로직만 공유하고 UI는 각 플랫폼에 맡겨요. 웹 앱(PWA)은 설치 없이 열리지만 기기 기능 접근이 제한적이에요. 성능, 팀의 기술, 필요한 기기 기능, 출시 속도를 보고 골라요.', 'Native apps are built separately per platform (Swift for iOS, Kotlin for Android); cross-platform frameworks build both from one codebase.', 'Flutter paints Dart widgets with its own engine (Impeller), so it looks identical everywhere; React Native drives real native components from JavaScript. Kotlin Multiplatform shares business logic while each platform keeps its own UI. Web apps (PWAs) need no install but get limited device access. Choose by performance, team skills, device needs and time to market.', sNative()),
    item('mo-life', '앱 생명주기', 'App lifecycle', '앱 화면은 생성 → 시작 → 재개 → 일시 정지 → 정지 → 파괴 단계를 오가고, OS가 단계마다 콜백을 불러 줘요.', 'Android Activity는 onCreate, onStart, onResume, onPause, onStop, onDestroy를 받아요. 전화가 오면 일시 정지, 홈으로 나가면 정지, 메모리가 부족하면 OS가 프로세스를 통째로 정리할 수도 있어서 상태는 미리 저장해야 해요. 화면 회전 같은 구성 변경도 Activity를 새로 만들어요. iOS는 Active, Inactive, Background, Suspended 상태가 같은 역할을 해요.', 'A screen moves through created, started, resumed, paused, stopped and destroyed, and the OS calls back at each step.', 'An Android Activity receives onCreate, onStart, onResume, onPause, onStop and onDestroy. A phone call pauses it, going home stops it, and under memory pressure the OS may kill the whole process, so state must be saved ahead of time. Configuration changes such as rotation also recreate the Activity. On iOS the active, inactive, background and suspended states play the same role.', sLife()),
    item('mo-sandbox', '샌드박스와 권한', 'Sandboxing and permissions', '모바일 앱은 저마다 격리된 상자(샌드박스) 안에서 돌고, 카메라·위치 같은 민감한 기능은 사용자가 허락해야 쓸 수 있어요.', 'Android는 앱마다 다른 리눅스 사용자 ID와 전용 폴더를 주고, iOS도 앱 컨테이너 밖을 읽지 못하게 막아요. 권한은 Manifest나 Info.plist에 선언한 뒤 실행 중에 물어봐요(런타임 권한). 위치는 대략·정확, 사진은 고른 것만, “이번만 허용”처럼 범위를 좁힐 수 있고 사용자는 언제든 철회할 수 있어요. 다른 앱과의 공유는 공유 시트, 콘텐츠 제공자, 인텐트 같은 OS 통로로만 해요.', 'Every mobile app runs in an isolated sandbox, and sensitive features such as the camera or location need the user’s permission.', 'Android gives each app its own Linux user ID and private folder; iOS likewise blocks reads outside the app’s container. Permissions are declared in the Manifest or Info.plist and then requested at runtime. Scope can be narrowed (approximate location, selected photos, allow once) and the user can revoke access at any time. Sharing with other apps goes only through OS channels such as the share sheet, content providers and intents.', sSandbox()),
    item('mo-build', '빌드·서명·배포', 'Build, sign and ship', '소스 코드를 기기용으로 컴파일해 패키지(AAB, IPA)로 묶고, 개발자 키로 서명한 뒤 스토어 심사를 거쳐 배포해요.', 'Android는 Kotlin을 DEX 바이트코드로, iOS는 Swift를 ARM64 기계어로 컴파일해요. 서명은 누가 만들었는지와 변조되지 않았음을 증명해서 한 바이트만 바뀌어도 설치가 거부돼요. 업데이트는 같은 키로 서명하고 버전 번호를 올려야 하며, Play 앱 서명이나 Apple 인증서·프로비저닝 프로파일이 키를 관리해요. Fastlane, Xcode Cloud, GitHub Actions 같은 CI로 이 과정을 자동화해요.', 'Source is compiled for the device, bundled into a package (AAB, IPA), signed with the developer’s key and released through store review.', 'Android compiles Kotlin to DEX bytecode; iOS compiles Swift to ARM64 machine code. The signature proves who built the app and that it hasn’t been altered: change one byte and installation is refused. Updates must carry the same key and a higher version number, with Play App Signing or Apple certificates and provisioning profiles managing the keys. CI tools such as Fastlane, Xcode Cloud and GitHub Actions automate the pipeline.', sBuild()),
    item('mo-main', '메인 스레드와 프레임', 'Main thread and frames', '화면은 메인(UI) 스레드 하나가 그려요. 60Hz 화면이면 16.7ms 안에 한 프레임을 끝내야 버벅이지 않아요.', '네트워크, 디스크, 이미지 디코딩, 큰 JSON 파싱을 메인에서 하면 프레임을 놓쳐 화면이 멈칫해요(jank). 입력에 5초 넘게 응답하지 않으면 Android는 ANR 창을 띄우고, iOS는 오래 멈춘 앱을 워치독이 종료해요. 무거운 일은 백그라운드 스레드나 코루틴에서 하고 결과만 메인으로 보내 UI를 고쳐요. 120Hz 화면에서는 예산이 8.3ms로 줄어요.', 'A single main (UI) thread draws the screen; on a 60 Hz display each frame must finish within 16.7 ms to stay smooth.', 'Doing network, disk, image decoding or big JSON parsing on the main thread drops frames and causes visible stutter (jank). If input goes unanswered for five seconds Android shows an ANR dialog, and iOS’s watchdog terminates apps that hang too long. Heavy work belongs on background threads or coroutines, with only the result posted back to update the UI. At 120 Hz the budget shrinks to 8.3 ms.', sMain())
  ].concat(XT.add['mo-plat'] || [])),
  sec('mo-ui', '화면 그리기', 'Drawing the UI', '화면 그리기', 'Drawing the UI',
    '레이아웃부터 터치와 애니메이션까지, 화면이 만들어지는 과정이에요.', 'From layout to touch and animation: how a screen comes together.', [
    item('mo-layout', '레이아웃: 측정과 배치', 'Layout: measure and place', 'UI 트리는 부모가 제약을 내려보내고, 자식이 크기를 정해 올리고, 부모가 위치를 정한 뒤에야 그려져요.', 'Android View는 measure → layout → draw 순서로, Flutter는 “제약은 내려가고 크기는 올라오고 위치는 부모가 정한다”는 규칙으로, Compose는 자식을 한 번만 측정한다는 규칙으로 동작해요. 트리가 깊거나 자식을 여러 번 측정하면(중첩된 가중치, 내재 크기 계산) 프레임 시간이 늘어요. 그래서 평평한 레이아웃(ConstraintLayout)과 고정 크기 지정이 성능에 도움이 돼요. iOS는 Auto Layout이 제약식을 풀어 위치를 계산해요.', 'A UI tree is drawn only after parents pass constraints down, children report sizes up and parents assign positions.', 'Android Views go measure → layout → draw; Flutter’s rule is “constraints go down, sizes go up, parents set position”; Compose measures each child only once. Deep trees and repeated measuring (nested weights, intrinsic sizes) inflate frame time, so flat layouts such as ConstraintLayout and fixed sizes help performance. On iOS, Auto Layout solves a system of constraints to place views.', sLayout()),
    item('mo-decl', '선언형 UI', 'Declarative UI', '“상태가 이러면 화면은 이렇게”라고 적으면, 상태가 바뀔 때 프레임워크가 필요한 부분만 다시 그려 줘요.', 'UI = f(상태). Jetpack Compose는 재구성(recomposition), SwiftUI는 body 재평가, Flutter는 build 재호출로 바뀐 상태를 읽는 부분만 갱신해요. 명령형 방식은 데이터가 바뀔 때마다 뷰를 찾아 setText처럼 직접 고쳐야 해서 하나만 빠뜨려도 화면과 데이터가 어긋나요. 대신 상태를 어디에 두고 얼마나 자주 바꾸는지가 성능을 좌우해요.', 'You describe what the screen looks like for a given state, and when the state changes the framework redraws only what depends on it.', 'UI = f(state). Jetpack Compose recomposes, SwiftUI re-evaluates body and Flutter calls build again, touching only the parts that read the changed state. The imperative style finds views and patches them by hand (setText), and missing a single spot leaves the screen out of sync with the data. In exchange, where state lives and how often it changes now drives performance.', sDecl()),
    item('mo-list', '리스트 재활용', 'List recycling', '긴 목록도 화면에 보이는 몇 줄만 뷰로 만들고, 스크롤로 밖에 나간 뷰를 새 데이터로 다시 써요.', '천 개 항목에 뷰 천 개를 만들면 메모리와 생성 시간이 폭발해요. RecyclerView는 ViewHolder를 재사용하며 onBindViewHolder에서 데이터만 바꿔 끼우고, Compose LazyColumn, iOS UICollectionView, Flutter ListView.builder도 같은 원리예요. 바인드 중엔 무거운 작업을 피하고, 항목마다 고유 key를 주면 DiffUtil이나 diffable data source가 바뀐 줄만 갱신해요.', 'Even for a long list, only the visible rows get views; rows that scroll off are reused with new data.', 'A thousand items with a thousand views would explode memory and setup time. RecyclerView reuses ViewHolders and only rebinds data in onBindViewHolder; Compose LazyColumn, iOS UICollectionView and Flutter’s ListView.builder work the same way. Keep binding cheap, and give each item a stable key so DiffUtil or diffable data sources update only the rows that changed.', sList()),
    item('mo-density', '화면 밀도와 단위', 'Screen density and units', '화면마다 1인치에 든 픽셀 수(dpi)가 달라서, 크기는 픽셀 대신 밀도와 무관한 단위(dp, pt)로 정해요.', 'px = dp × (dpi ÷ 160). 48dp 버튼은 1x 화면에서 48px, 3x 화면에서 144px이지만 실제 크기는 같아요. 이미지는 1x·2x·3x 여러 벌이나 벡터로 넣고, 글자는 sp(Android)나 Dynamic Type(iOS)으로 사용자 글꼴 크기 설정을 따라요. 터치 영역은 최소 48dp(Android), 44pt(iOS)를 권장해요.', 'Screens pack different numbers of pixels per inch, so sizes are given in density-independent units (dp, pt) rather than pixels.', 'px = dp × (dpi ÷ 160): a 48 dp button is 48 px on a 1x screen and 144 px on a 3x screen, yet the same physical size. Images ship in 1x/2x/3x sets or as vectors, and text uses sp (Android) or Dynamic Type (iOS) to honor the user’s font size. Touch targets should be at least 48 dp on Android and 44 pt on iOS.', sDensity()),
    item('mo-gesture', '터치와 제스처', 'Touch and gestures', '손가락이 닿으면 히트 테스트로 그 아래의 뷰를 찾고, 움직임을 보고 탭인지 스크롤인지 판정해요.', '터치는 DOWN → MOVE → UP 이벤트로 오고, 터치 슬롭(약 8dp)보다 적게 움직이면 아직 탭 후보예요. 그 이상 움직이면 스크롤하는 부모가 이벤트를 가로채고(intercept) 버튼에는 CANCEL이 가요. 손을 뗄 때의 속도로 플링 애니메이션이 이어져요. GestureDetector, UIGestureRecognizer가 탭·길게 누르기·스와이프·핀치를 구분해 줘요.', 'When a finger lands, hit testing finds the view underneath, and the movement decides whether it is a tap or a scroll.', 'Touches arrive as DOWN, MOVE and UP events; moving less than the touch slop (about 8 dp) keeps it a possible tap. Beyond that, a scrolling parent intercepts the stream and the button receives CANCEL. The release velocity carries into a fling animation. GestureDetector and UIGestureRecognizer tell taps, long presses, swipes and pinches apart.', sGesture()),
    item('mo-anim', '애니메이션과 이징', 'Animation and easing', '애니메이션은 시간에 따른 값의 곡선이에요. 매 프레임 곡선에서 값을 읽어 위치·크기·투명도를 바꿔요.', 'linear는 기계적으로 보여서 보통 ease-out(들어올 때), ease-in(나갈 때), 스프링을 써요. 스프링은 시간이 아니라 강성·감쇠로 정의돼 손가락을 따라가다 놓았을 때 자연스럽고 도중에 끊겨도 이어져요. 레이아웃을 다시 계산하는 속성보다 transform과 opacity를 움직이면 GPU 합성만으로 처리돼 부드러워요. Compose의 animate*AsState, SwiftUI의 withAnimation, Lottie가 대표 도구예요.', 'An animation is a curve of values over time; each frame samples the curve to set position, size or opacity.', 'Linear motion looks mechanical, so interfaces favor ease-out for entering, ease-in for leaving, and springs. Springs are defined by stiffness and damping rather than duration, so they feel natural after a drag and stay smooth when interrupted. Animating transform and opacity lets the GPU compositor do the work instead of re-running layout. Compose’s animate*AsState, SwiftUI’s withAnimation and Lottie are common tools.', sAnim())
  ].concat(XT.add['mo-ui'] || [])),
  sec('mo-arch', '상태와 구조', 'State & architecture', '상태와 아키텍처', 'State and architecture',
    '데이터가 화면까지 흐르는 길을 정리하는 방법이에요.', 'Ways to organize how data reaches the screen.', [
    item('mo-state', '단방향 데이터 흐름', 'Unidirectional data flow', '상태는 한곳에서만 바꾸고, UI는 그 상태를 그리기만 하며 사용자 동작은 이벤트로 올려 보내요.', 'View → 이벤트 → ViewModel → 새 상태 → View로 데이터가 한 방향으로만 흘러 “누가 화면을 바꿨지?”를 쉽게 추적해요. 로딩·데이터·오류를 UiState 하나로 묶으면 화면이 불가능한 조합에 빠지지 않아요. 여러 위젯이 공유하는 상태는 공통 부모로 끌어올리고(state hoisting), 위젯은 상태를 받고 콜백을 내보내는 형태로 만들어요. Redux, MVI, TCA(The Composable Architecture)가 같은 생각이에요.', 'State changes in exactly one place, the UI only renders it, and user actions travel up as events.', 'Data flows one way (View → event → ViewModel → new state → View), so “who changed the screen?” is easy to answer. Bundling loading, data and error into a single UiState keeps the screen out of impossible combinations. State shared by several widgets is hoisted to a common parent, and widgets take state in and send callbacks out. Redux, MVI and The Composable Architecture share the same idea.', sState()),
    item('mo-mvvm', 'MVVM과 ViewModel', 'MVVM and the ViewModel', 'ViewModel이 화면의 데이터와 로직을 들고, 화면(View)은 그것을 관찰해 그리기만 해요.', 'Android ViewModel은 화면 회전 같은 구성 변경에도 살아남아 데이터를 다시 받지 않아요. ViewModel은 View를 참조하지 않으니 메모리 누수가 없고 기기 없이 단위 테스트할 수 있어요. 프로세스가 통째로 정리될 때를 대비해 작은 값은 SavedStateHandle에 저장해요. MVC → MVP → MVVM → MVI는 화면 로직을 화면 밖으로 꺼내는 방향으로 발전해 왔어요.', 'The ViewModel holds the screen’s data and logic; the View just observes it and draws.', 'An Android ViewModel survives configuration changes such as rotation, so data isn’t reloaded. Since it never references the View, it can’t leak it and can be unit-tested without a device. Small values go in SavedStateHandle to survive process death. MVC → MVP → MVVM → MVI has steadily moved screen logic out of the screen.', sMvvm()),
    item('mo-nav', '내비게이션과 백 스택', 'Navigation and the back stack', '화면을 열면 스택에 쌓고(push), 뒤로 가면 맨 위를 꺼내요(pop). 딥 링크로 열어도 자연스러운 스택을 만들어 줘요.', '“상품 목록 → 상세”처럼 쌓인 순서대로 뒤로 가기가 동작해요. 알림이나 링크(shop://product/42, 유니버설 링크·앱 링크)로 상세 화면을 바로 열면 그 밑에 홈을 깔아 뒤로 가기가 앱 밖으로 튀지 않게 해요. 하단 탭마다 별도 스택을 두고, 화면 사이엔 객체 대신 ID 같은 작은 값만 넘겨요. Android Navigation, iOS NavigationStack, Flutter go_router가 이 일을 해요.', 'Opening a screen pushes it onto a stack and back pops the top; deep links get a sensible stack built for them.', 'Back follows the order screens were stacked, such as list → detail. When a notification or link (shop://product/42, universal or app links) opens a detail screen directly, a home screen is placed beneath it so back doesn’t drop out of the app. Each bottom tab keeps its own stack, and screens pass small values such as IDs rather than whole objects. Android Navigation, iOS NavigationStack and Flutter’s go_router handle this.', sNav()),
    item('mo-async', '코루틴과 async/await', 'Coroutines and async/await', '기다리는 동안 스레드를 붙잡지 않고 잠시 멈췄다가, 결과가 오면 멈춘 곳부터 이어서 실행하는 비동기 코드예요.', 'suspend 함수나 await은 네트워크 응답을 기다리는 동안 메인 스레드를 비켜 줘서 화면은 계속 그려져요. 코드가 위에서 아래로 읽혀 콜백이 안쪽으로 파고드는 “콜백 지옥”이 없어요. 구조적 동시성 덕분에 화면이 닫히면 viewModelScope나 Task가 진행 중인 작업을 함께 취소해요. Dispatchers.IO 같은 디스패처로 어느 스레드에서 실행할지 정해요.', 'Async code that pauses without holding a thread while it waits, then resumes right where it left off when the result arrives.', 'A suspend function or await steps off the main thread while the network responds, so the screen keeps drawing. The code reads top to bottom, with no callbacks nesting ever deeper (“callback hell”). Structured concurrency lets viewModelScope or a Task cancel in-flight work when the screen closes. Dispatchers such as Dispatchers.IO choose which threads the work runs on.', sAsync()),
    item('mo-reactive', '반응형 스트림', 'Reactive streams', '시간에 따라 오는 값의 흐름(스트림)을 연산자로 거르고 바꾸고 합쳐서 처리해요.', '검색창 입력에 debounce(300ms)를 걸면 타이핑이 멈췄을 때만 요청하고, switchMap(flatMapLatest)은 새 입력이 오면 이전 요청을 취소해 늦게 온 옛 결과가 화면을 덮지 않게 해요. combine으로 여러 스트림을 합치고, distinctUntilChanged로 같은 값을 거를 수 있어요. Kotlin Flow, Swift Combine, RxJava·RxSwift, Dart Stream이 대표적이에요. 구독을 해제하지 않으면 누수가 생겨요.', 'Streams of values arriving over time are filtered, transformed and combined with operators.', 'Applying debounce(300 ms) to a search box fires a request only when typing pauses, and switchMap (flatMapLatest) cancels the previous request when new input arrives, so stale results never overwrite fresh ones. combine merges several streams and distinctUntilChanged drops repeats. Kotlin Flow, Swift Combine, RxJava/RxSwift and Dart Streams are the main libraries. Forgetting to unsubscribe causes leaks.', sReactive())
  ].concat(XT.add['mo-arch'] || [])),
  sec('mo-data', '데이터와 네트워크', 'Data & network', '데이터와 네트워크', 'Data and network',
    '기기 안에 저장하고, 불안정한 망에서 주고받는 법이에요.', 'Storing on the device and talking over unreliable networks.', [
    item('mo-storage', '로컬 저장소', 'Local storage', '저장할 데이터의 크기와 성격에 따라 키-값 저장소, 데이터베이스, 파일, 보안 저장소 중에서 골라요.', '작은 설정값은 DataStore·UserDefaults, 많고 검색해야 하는 데이터는 SQLite(Room, Core Data, SwiftData), 사진·동영상 같은 큰 파일은 앱 전용 폴더나 캐시 폴더에 둬요. 비밀번호와 토큰은 Android Keystore의 키로 암호화하거나 iOS Keychain에 넣어요. 캐시 폴더는 공간이 부족하면 OS가 지울 수 있고 앱을 지우면 모두 사라지니, 중요한 데이터는 서버에도 백업해요.', 'Depending on size and kind, data goes in a key–value store, a database, files or secure storage.', 'Small settings belong in DataStore or UserDefaults, large queryable data in SQLite (Room, Core Data, SwiftData), and big files such as photos and video in the app’s files or cache directory. Passwords and tokens are encrypted with an Android Keystore key or kept in the iOS Keychain. The OS may clear the cache directory when space runs low and uninstalling wipes everything, so important data should also live on a server.', sStorage()),
    item('mo-offline', '오프라인 우선과 동기화', 'Offline-first and sync', '화면은 로컬 DB를 기준으로 그리고, 서버와의 동기화는 뒤에서 처리해서 연결이 끊겨도 앱이 동작해요.', '쓰기는 먼저 로컬 DB에 반영해 화면이 즉시 바뀌고, 변경 사항은 대기열(outbox)에 쌓였다가 연결되면 순서대로 서버로 가요. 다른 기기에서 같은 데이터를 고쳤다면 마지막 쓰기 우선, 필드별 병합, CRDT 같은 규칙으로 충돌을 풀어요. WorkManager 같은 작업 예약기가 연결이 돌아오면 재시도해요. 지하철이나 비행기에서도 쓸 수 있고, 온라인에서도 기다림이 줄어요.', 'The screen renders from a local database and syncing with the server happens in the background, so the app works without a connection.', 'Writes land in the local database first so the screen updates instantly, and changes wait in an outbox until a connection returns and they are sent in order. If another device edited the same data, rules such as last-write-wins, field-level merges or CRDTs resolve the conflict. A scheduler like WorkManager retries once the network is back. The app works on the subway or a plane and feels faster online too.', sOffline()),
    item('mo-net', '네트워크 요청과 재시도', 'Requests and retries', '모바일 망은 자주 느려지고 끊겨요. 타임아웃, 간격을 늘려 가는 재시도, HTTP 캐시로 버텨요.', '실패하면 1초, 2초, 4초처럼 간격을 두 배씩 늘려 재시도하고(지수 백오프), 무작위 지터를 더해 수많은 기기가 한꺼번에 몰리지 않게 해요. 자동 재시도는 GET처럼 여러 번 보내도 안전한(멱등) 요청에만 해요. ETag와 If-None-Match로 바뀌지 않은 응답은 본문 없는 304로 받아 데이터와 배터리를 아껴요. gzip 압축, 페이지 나누기, 필요한 필드만 받기도 중요해요.', 'Mobile networks slow down and drop often; timeouts, retries with growing gaps and HTTP caching keep apps working.', 'Failed requests retry after 1, 2, 4 seconds and so on (exponential backoff), with random jitter so millions of devices don’t retry in lockstep. Only idempotent requests such as GET are retried automatically. ETag and If-None-Match turn unchanged responses into a bodiless 304, saving data and battery. gzip compression, pagination and fetching only the needed fields matter as well.', sNet()),
    item('mo-image', '이미지 로딩과 캐시', 'Image loading and caching', '사진은 보일 크기에 맞춰 줄여서 디코딩하고, 메모리 → 디스크 → 네트워크 순서로 찾아 다시 받지 않아요.', '4000×3000 사진을 그대로 풀면 픽셀당 4바이트로 48MB예요. 400×300 뷰에 맞춰 1/8로 줄여 디코딩하면 1MB도 안 돼요. 메모리 캐시는 LRU로 오래 안 쓴 것부터 버리고, 디스크 캐시는 앱을 다시 켜도 남아요. 리스트가 재활용되면 이전 요청을 취소해야 엉뚱한 사진이 뜨지 않아요. Glide, Coil, Kingfisher, SDWebImage가 이 일을 대신해요.', 'Photos are decoded at the size they will be shown and looked up in memory, then disk, then the network, so they aren’t downloaded twice.', 'A 4000×3000 photo decoded at full size takes 48 MB at 4 bytes per pixel; downsampled by 8 for a 400×300 view it is under 1 MB. The memory cache evicts least recently used images, while the disk cache survives restarts. When a list row is recycled, its old request must be cancelled or the wrong photo appears. Glide, Coil, Kingfisher and SDWebImage handle all of this.', sImage()),
    item('mo-push', '푸시 알림', 'Push notifications', '서버가 보낸 메시지를 애플(APNs)·구글(FCM)의 푸시 서버가 기기까지 전달해, 앱이 꺼져 있어도 알림이 떠요.', '앱은 OS에 등록해 기기 토큰을 받고, 그 토큰을 우리 서버에 보내 사용자와 묶어 둬요. 보낼 일이 생기면 서버가 토큰과 내용을 APNs·FCM에 보내고, 푸시 서버는 기기가 유지하는 상시 연결 하나로 전달해요. 앱마다 연결을 따로 열지 않으니 배터리가 절약돼요. 알림 권한이 필요하고, 토큰은 바뀔 수 있어 갱신되면 서버에 다시 알려야 해요.', 'Apple’s (APNs) and Google’s (FCM) push services deliver a server’s message to the device, so notifications appear even when the app is closed.', 'The app registers with the OS to get a device token and sends it to our server, tied to the user. When something happens, the server sends the token and message to APNs or FCM, which delivers it over the single always-on connection the device keeps. Because apps don’t each hold a connection open, battery is saved. Notification permission is required, and tokens can change, so refreshed tokens must be re-sent.', sPush())
  ].concat(XT.add['mo-data'] || [])),
  sec('mo-ops', '성능과 출시', 'Performance & release', '성능·품질·출시', 'Performance, quality and release',
    '배터리와 메모리를 아끼고, 테스트하고, 안전하게 내보내는 법이에요.', 'Saving battery and memory, then testing and shipping safely.', [
    item('mo-battery', '배터리와 백그라운드 작업', 'Battery and background work', '셀룰러 무선은 전송 후에도 몇 초간 고전력으로 남아서, 요청을 흩어 보내면 배터리가 빨리 닳아요.', '작은 요청을 자주 보내면 무선이 잠들 틈이 없어요. 요청을 모아 한 번에 보내고, 급하지 않은 일은 WorkManager(Android)나 BGTaskScheduler(iOS)에 맡기면 충전 중이나 와이파이일 때 실행돼요. Android 잠자기(Doze)와 iOS 백그라운드 제한은 깨움을 정해진 창으로 모아요. 화면, GPS, 무선이 가장 큰 소비원이라 위치는 필요한 정확도만 요청해요.', 'The cellular radio stays in high power for seconds after each transfer, so scattered requests drain the battery quickly.', 'Small, frequent requests never let the radio sleep. Batch requests together, and hand deferrable work to WorkManager (Android) or BGTaskScheduler (iOS) so it runs while charging or on Wi-Fi. Android’s Doze and iOS background limits fold wake-ups into maintenance windows. The screen, GPS and radios are the biggest consumers, so request only the location accuracy you need.', sBattery()),
    item('mo-memory', '모바일 메모리 관리', 'Mobile memory management', '메모리가 모자라면 OS가 우선순위가 낮은 백그라운드 앱부터 정리해요. 앱은 누수 없이 가볍게 써야 해요.', '보이는 앱 > 서비스 > 캐시된 앱 순으로 우선순위가 높고, 메모리가 부족하면 가장 오래 안 쓴 캐시 앱부터 Android lmkd나 iOS jetsam이 정리해요. 정리돼도 사용자가 눈치채지 못하게 상태를 저장·복원해요. 닫힌 화면을 정적 필드나 리스너가 붙잡으면 GC가 치우지 못하는 누수가 생겨요. Android는 GC, iOS(Swift)는 ARC 참조 카운트라서 순환 참조는 weak로 끊어요.', 'When memory runs short the OS kills low-priority background apps first, so apps must stay lean and leak-free.', 'Visible apps outrank services, which outrank cached apps; under pressure Android’s lmkd or iOS’s jetsam reclaims the least recently used cached app first. Save and restore state so a kill goes unnoticed. A closed screen held by a static field or listener can’t be collected: a leak. Android relies on garbage collection while Swift on iOS uses ARC reference counting, so cycles must be broken with weak references.', sMemory()),
    item('mo-test', '모바일 테스트', 'Mobile testing', '빠른 단위 테스트를 많이, 통합 테스트를 적당히, 느린 UI 테스트는 핵심 흐름만 두는 피라미드로 쌓아요.', '단위 테스트는 ViewModel과 로직을 기기 없이 몇 초 만에 돌리고, UI 테스트(Espresso, XCUITest, Compose 테스트)는 실제 화면을 탭해 확인하지만 느리고 잘 깨져요. 화면 크기, 폴더블, OS 버전 조합이 수백 가지라 Firebase Test Lab 같은 클라우드 기기 팜에서 병렬로 돌려요. 스크린샷 테스트로 UI 회귀를 잡고, TestFlight나 내부 테스트 트랙으로 실제 사용을 검증해요.', 'A pyramid: many fast unit tests, a moderate layer of integration tests and only a few slow UI tests for key flows.', 'Unit tests run ViewModels and logic in seconds without a device; UI tests (Espresso, XCUITest, Compose testing) tap the real screen but are slow and flaky. With hundreds of combinations of screen sizes, foldables and OS versions, teams run tests in parallel on cloud device farms such as Firebase Test Lab. Screenshot tests catch UI regressions, and TestFlight or internal testing tracks verify real-world use.', sTest()),
    item('mo-release', '단계적 출시와 모니터링', 'Staged rollout and monitoring', '새 버전을 일부 사용자에게만 먼저 내보내고, 크래시 지표를 보며 조금씩 넓혀요. 문제가 보이면 멈춰요.', '앱은 웹처럼 즉시 롤백할 수 없어서 1% → 5% → 20% → 100%로 넓혀 가며 크래시 없는 사용자 비율을 지켜봐요. Crashlytics, Sentry가 스택 트레이스를 기기·OS·버전별로 모아 원인을 찾게 해 줘요. 원격 기능 플래그로 문제 기능만 끄면 새 빌드 없이 바로 회복할 수 있어요. 고친 버전도 다시 단계적으로 배포해요.', 'New versions go to a small share of users first and widen as crash metrics stay healthy; trouble halts the rollout.', 'Apps can’t roll back instantly like the web, so releases widen from 1% to 5%, 20% and 100% while the crash-free rate is watched. Crashlytics and Sentry group stack traces by device, OS and version to pinpoint causes. A remote feature flag can switch off just the faulty feature for an instant recovery without a new build. The fix is then rolled out gradually as well.', sRelease())
  ].concat(XT.add['mo-ops'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.mo-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.mo-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.mo-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.mo-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.mo-r .in{color:var(--danger);font-weight:800}
.mo-g .in{color:var(--ok);font-weight:800}
.mo-a .in{color:var(--accent);font-weight:800}
.mo-w .in{color:var(--warn);font-weight:800}
.mo-c .in{font-size:.6em;font-weight:700}
.mo-c2 .in{font-size:.5em;font-weight:700}
.mo-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.mo-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
